import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import Constants from './const';

class Home extends Component {
  render() {
    return (
      <main>
        <Container>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>{Constants.TITLE}</Typography>

          <Grid container spacing={4}>
            {
              Constants.ROUTES.map((card) => (
                <Grid item key={card.title} xs={12} sm={6} md={4}>
                  <Link href={card.link}>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">{card.title}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </main>
    );
  }
}

export default Home;
