import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// http://www.red3d.com/cwr/boids/
const about: string = "Boids is an artificial life model, developed by Craig Reynolds in 1986, which simulates the flocking behaviour of birds. The flocking behavior emerges by moving each boid (bird-oid object) according to a few simple rules, which you can control below. This implementation of Boids was created with React.";

function Explanation() {
    return (
        <Card >
            <CardContent >
                <Typography variant="h6" gutterBottom>About</Typography>
                {about}
            </CardContent>
        </Card>
    )
}

export default Explanation;