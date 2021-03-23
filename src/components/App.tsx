import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ControlPanel from "components/ControlPanel";
import Boids from "components/Boids";
import Explanation from "components/Explanation";
import { useState } from 'react';
import settings from "settings"



function App() {
  const [numberOfBoids, setNumberOfBoids] = useState(settings.defaultNumberOfBoids);
  const [visualRange, setVisualRange] = useState(settings.defaultVisualRange);
  const [speedLimit, setSpeedLimit] = useState(settings.defaultSpeedLimit);
  const [separation, setSeparation] = useState(settings.defaultSeparation);
  const [alignment, setAlignment] = useState(settings.defaultAlignment);
  const [cohesion, setCohesion] = useState(settings.defaultCohesion);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6">
            Boids
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense"></Toolbar>
      <Box flexGrow={1} mt={2}>
        <Container maxWidth="xl" className="fill-height">
          <Grid container spacing={2} className="fill-height">
            <Grid item xs={3}>
              <Box className="fill-height" display="flex" flexDirection="column">
                <Box mb={2}>
                  <Explanation></Explanation>
                </Box>
                <Box flexGrow={1}>
                  <ControlPanel
                    numberOfBoids={numberOfBoids}
                    setNumberOfBoids={setNumberOfBoids}
                    visualRange={visualRange}
                    setVisualRange={setVisualRange}
                    speedLimit={speedLimit}
                    setSpeedLimit={setSpeedLimit}
                    separation={separation}
                    setSeparation={setSeparation}
                    alignment={alignment}
                    setAlignment={setAlignment}
                    cohesion={cohesion}
                    setCohesion={setCohesion}
                  ></ControlPanel>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Boids
                numberOfBoids={numberOfBoids}
                visualRange={visualRange}
                speedLimit={speedLimit}
                separation={separation}
                alignment={alignment}
                cohesion={cohesion}
              ></Boids>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box >
  );
}

export default App;
