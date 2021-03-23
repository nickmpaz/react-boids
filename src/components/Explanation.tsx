import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const about: string = "Boids is an artificial life model, developed by Craig Reynolds in 1986, which simulates the flocking behaviour of birds. This flocking behavior emerges by moving each boid (bird-oid object) according to a few simple rules, which you can control below. This implementation of Boids was created with React.";
const learnMore: string = "https://en.wikipedia.org/wiki/Boids"

function Explanation() {
    return (
        <Card >
            <CardContent >
                <Typography variant="h6" gutterBottom>About</Typography>
                {about}
            </CardContent>
            <CardActions>
                <Box width="100%" display="flex" justifyContent="end">
                    <Button href={learnMore} color="primary" size="small">Learn More</Button>
                </Box>
            </CardActions>
        </Card>
    )
}

export default Explanation;