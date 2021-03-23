import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import settings from 'settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const visualTooltip = "How far each boid can see."
const numberTooltip = "How many boids are simulated."
const speedTooltip = "How fast a boid can go."
const cohesionTooltip = "Makes boids move towards other boids."
const alignmentTooltip = "Makes boids move in the same direction as other boids."
const separationTooltip = "Makes boids avoid crashing into each other."

function ControlPanel(props: any) {
    return (
        <Card className="fill-height">
            <CardContent className="fill-height">
                <Box className="fill-height" display="flex" flexDirection="column">
                    <Typography variant="h6" gutterBottom>Control Panel</Typography>
                    <Box px={2} flexGrow={1} display="flex" flexDirection="column" justifyContent="space-around">
                        <div>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="inline-flex">
                                    <Typography display="inline" gutterBottom>Number of Boids</Typography>
                                    <Box ml={1}>
                                        <Tooltip title={numberTooltip} placement="top">
                                            <HelpOutlineIcon fontSize="small"></HelpOutlineIcon>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Typography gutterBottom>{props.numberOfBoids}</Typography>
                            </Box>
                            <Slider value={props.numberOfBoids}
                                onChange={(event, newValue) => props.setNumberOfBoids(newValue)}
                                min={settings.minNumberOfBoids}
                                max={settings.maxNumberOfBoids}
                            ></Slider>
                        </div>
                        <div>
                            <Box display="flex" justifyContent="space-between">
                                <Box display="inline-flex">
                                    <Typography display="inline" gutterBottom>Visual Range</Typography>
                                    <Box ml={1}>
                                        <Tooltip title={visualTooltip} placement="top">
                                            <HelpOutlineIcon fontSize="small"></HelpOutlineIcon>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Typography gutterBottom>{props.visualRange}</Typography>
                            </Box>
                            <Slider value={props.visualRange}
                                onChange={(event, newValue) => props.setVisualRange(newValue)}
                                min={settings.minVisualRange}
                                max={settings.maxVisualRange}
                            ></Slider>
                        </div>
                        <div>
                            <Box display="flex" justifyContent="space-between">
                                <Box display="inline-flex">
                                    <Typography display="inline" gutterBottom>Speed Limit</Typography>
                                    <Box ml={1}>
                                        <Tooltip title={speedTooltip} placement="top">
                                            <HelpOutlineIcon fontSize="small"></HelpOutlineIcon>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Typography gutterBottom>{props.speedLimit}</Typography>
                            </Box>
                            <Slider value={props.speedLimit}
                                onChange={(event, newValue) => props.setSpeedLimit(newValue)}
                                min={settings.minSpeedLimit}
                                max={settings.maxSpeedLimit}
                            ></Slider>
                        </div>
                        <div>
                            <Box display="flex" justifyContent="space-between">
                                <Box display="inline-flex">
                                    <Typography display="inline" gutterBottom>Separation</Typography>
                                    <Box ml={1}>
                                        <Tooltip title={separationTooltip} placement="top">
                                            <HelpOutlineIcon fontSize="small"></HelpOutlineIcon>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Typography gutterBottom>{props.separation}</Typography>
                            </Box>
                            <Slider value={props.separation}
                                onChange={(event, newValue) => props.setSeparation(newValue)}
                                min={settings.minSeparation}
                                max={settings.maxSeparation}
                            ></Slider>
                        </div>
                        <div>
                            <Box display="flex" justifyContent="space-between">
                                <Box display="inline-flex">
                                    <Typography display="inline" gutterBottom>Alignment</Typography>
                                    <Box ml={1}>
                                        <Tooltip title={alignmentTooltip} placement="top">
                                            <HelpOutlineIcon fontSize="small"></HelpOutlineIcon>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Typography gutterBottom>{props.alignment}</Typography>
                            </Box>
                            <Slider value={props.alignment}
                                onChange={(event, newValue) => props.setAlignment(newValue)}
                                min={settings.minAlignment}
                                max={settings.maxAlignment}
                            ></Slider>
                        </div>
                        <div>
                            <Box display="flex" justifyContent="space-between">

                                <Box display="inline-flex">
                                    <Typography display="inline" gutterBottom>Cohesion</Typography>
                                    <Box ml={1}>
                                        <Tooltip title={cohesionTooltip} placement="top">
                                            <HelpOutlineIcon fontSize="small"></HelpOutlineIcon>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Typography gutterBottom>{props.cohesion}</Typography>
                            </Box>
                            <Slider value={props.cohesion}
                                onChange={(event, newValue) => props.setCohesion(newValue)}
                                min={settings.minCohesion}
                                max={settings.maxCohesion}
                            ></Slider>
                        </div>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ControlPanel;