import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Home from './Home';
import Detail from './Detail';
import Constants from './const';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#01579b',
    },
    secondary: {
      main: '#f50057',
    },
  },
});
theme.typography.h2 = {
  ...theme.typography.h2,
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
};

const useStyles = makeStyles(() => ({
  headerText: {
    color: 'white',
    margin: theme.spacing(1, 1.5),
  }
}));

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar />

        <Switch>
          <Route path="/expression" exact component={Home} />
          {
            Constants.ROUTES.map((route, idx) => (
              <Route path={route.link} key={idx} exact component={route.component} />
            ))
          }
          <Route path="/expression/study/:id" component={Detail} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <Link href="/expression" style={{display: "flex"}}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <HomeIcon style={{color: "white"}}/>
          </IconButton>
          <Hidden only="xs">
            <Typography variant="h6" color="textPrimary" noWrap
              className={classes.headerText}>{Constants.TITLE}</Typography>
          </Hidden>
        </Link>

        <nav style={{marginLeft: "auto", display: "flex"}}>
          {
            Constants.ROUTES.map((route, idx) => (
              <Link variant="button" color="textSecondary" href={route.link} className={classes.headerText} key={idx}>
                {route.title}
              </Link>
            ))
          }
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default App;
