import React, { useState, useEffect, useRef, useLayoutEffect, SetStateAction, MutableRefObject } from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Boid from './Boid';
import settings from 'settings'

const useStyles = makeStyles({
    boidContainer: {
        position: "relative",
    },
});

export type BoidsProps = {
    numberOfBoids: number,
    visualRange: number,
    speedLimit: number,
    separation: number,
    alignment: number,
    cohesion: number,
}

export type Boid = {
    x: number,
    y: number,
    x_velocity: number,
    y_velocity: number,
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function createRandomBoids(num: number, x_max: number, y_max: number) {
    let boids: Array<Boid> = []
    for (let i = 0; i < num; i++) {

        let boid: Boid = {
            x: getRandomInt(0, x_max),
            y: getRandomInt(0, y_max),
            x_velocity: getRandomInt(-10, 10),
            y_velocity: getRandomInt(-10, 10),
        };
        boids.push(boid);

    }
    return boids;
}

function useElementSize(ref: MutableRefObject<HTMLDivElement>): [number, number] {
    const [size, setSize] = useState<[number, number]>([ref.current.clientHeight, ref.current.clientWidth]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([ref.current.clientHeight, ref.current.clientWidth]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function updateBoids(boids: Array<Boid>, visualRange: number, speedLimit: number, cohesion: number, separation: number, alignment: number, maxX: number, maxY: number): Array<Boid> {
    const newBoids: Array<Boid> = []
    boids.forEach((boid, i) => {
        const [v1_x, v1_y] = rule1(boids, i, cohesion, visualRange);
        const [v2_x, v2_y] = rule2(boids, i, separation);
        const [v3_x, v3_y] = rule3(boids, i, alignment, visualRange);
        const [v4_x, v4_y] = rule4(boids, i, maxX, maxY);
        boid.x_velocity += v1_x + v2_x + v3_x + v4_x
        boid.y_velocity += v1_y + v2_y + v3_y + v4_y
        boid.x_velocity = applySpeedLimit(boid.x_velocity, speedLimit)
        boid.y_velocity = applySpeedLimit(boid.y_velocity, speedLimit)
        boid.x += boid.x_velocity
        boid.y += boid.y_velocity
        newBoids.push({
            x: boid.x,
            x_velocity: boid.x_velocity,
            y: boid.y,
            y_velocity: boid.y_velocity
        })
    })
    return newBoids

}

function rule1(boids: Array<Boid>, i: number, cohesion: number, visualRange: number): [number, number] {
    let x_sum: number = 0;
    let y_sum: number = 0;
    let num_neighbors = 0;
    boids.forEach((boid, j) => {
        if (i == j) {
            return;
        }
        if (distanceBetween(boids[i], boid) > visualRange) {
            return;
        }
        num_neighbors++;
        x_sum += boid.x;
        y_sum += boid.y;
    })
    let x_v = 0;
    let y_v = 0;
    if (num_neighbors) {
        const x_avg = x_sum / num_neighbors
        const y_avg = y_sum / num_neighbors
        x_v = (x_avg - boids[i].x) / cohesion
        y_v = (y_avg - boids[i].y) / cohesion
    }
    return [x_v, y_v]
}

function rule2(boids: Array<Boid>, i: number, separation: number): [number, number] {
    const minDistance = 20;
    let v_x = 0
    let v_y = 0
    boids.forEach((boid, j) => {
        if (i == j) {
            return
        }
        if (distanceBetween(boids[i], boid) > minDistance) {
            return;
        }
        v_x -= (boid.x - boids[i].x) / separation
        v_y -= (boid.y - boids[i].y) / separation
    })
    return [v_x, v_y]
}

function rule3(boids: Array<Boid>, i: number, alignment: number, visualRange: number): [number, number] {
    let x_sum = 0;
    let y_sum = 0;
    let num_neighbors = 0;
    boids.forEach((boid, j) => {
        if (i == j) {
            return;
        }
        if (distanceBetween(boids[i], boid) > visualRange) {
            return;
        }
        num_neighbors++;
        x_sum += boid.x_velocity;
        y_sum += boid.y_velocity;
    })
    let x_v = 0;
    let y_v = 0;
    if (num_neighbors) {
        let x_avg = x_sum / num_neighbors
        let y_avg = y_sum / num_neighbors
        x_v = (x_avg - boids[i].x_velocity) / alignment
        y_v = (y_avg - boids[i].y_velocity) / alignment
    }
    return [x_v, y_v]
}
function rule4(boids: Array<Boid>, i: number, max_x: number, max_y: number) {
    const margin = 200
    const turnFactor = 5
    let x_v = 0
    let y_v = 0
    if (boids[i].x < margin) {
        x_v += turnFactor
    } else if (boids[i].x > max_x - margin) {
        x_v -= turnFactor
    }
    if (boids[i].y < margin) {
        y_v += turnFactor
    } else if (boids[i].y > max_y - margin) {
        y_v -= turnFactor
    }
    return [x_v, y_v]
}
function applySpeedLimit(v: number, speedLimit: number) {
    if (v > speedLimit) {
        return speedLimit
    }
    if (v < - speedLimit) {
        return - speedLimit
    }
    return v
}

function distanceBetween(boidA: Boid, boidB: Boid): number {
    return Math.sqrt(Math.pow(boidA.x - boidB.x, 2) + Math.pow(boidA.y - boidB.y, 2))
}

function Boids(props: BoidsProps) {
    const classes = useStyles();
    const ref = useRef(document.createElement("div"))
    const [elementHeight, elementWidth] = useElementSize(ref);
    const { numberOfBoids, visualRange, speedLimit, separation, alignment, cohesion } = props;
    const [boids, setBoids] = useState<Array<Boid>>(createRandomBoids(numberOfBoids, elementWidth, elementHeight));


    useEffect(() => {
        setBoids(createRandomBoids(numberOfBoids, elementWidth, elementHeight));
    }, [numberOfBoids, visualRange, speedLimit, cohesion, separation, alignment, elementWidth, elementHeight]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newBoids = updateBoids(boids, visualRange, speedLimit, cohesion, separation, alignment, elementWidth, elementHeight);
            setBoids(newBoids);
        }, 1000 / 20);

        return () => {
            clearInterval(interval);
        };

    }, [boids, visualRange, speedLimit, cohesion, separation, alignment, elementHeight, elementWidth]);

    return (
        <Card ref={ref} className={`fill-height ${classes.boidContainer}`}>
            {boids.map((boid, i) => { return <Boid key={i} boid={boid} x={boid.x}></Boid> })}
        </Card>
    )
}

export default Boids;