import React, {useState} from 'react'
import { Grid, Card, CardContent, Typography, Button, Divider} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  body: {
    height: '100vh',
    overflow: 'auto',
    padding: '2rem 1rem'
  },
  row: {
    padding: '1rem 0',
    width: '100%'
  },
  movieTitle: {
    fontWeight: '400'
  },
  movieYear: {
    fontWeight: '100',
    fontStyle: "italic"
  },
  alternateContent: {
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
  }
}))

function MovieRow(props) {
    const classes = useStyles()
    const [enabled, setEnabled] = useState(true)
    const movieInNominatedList = props.nominationList.includes(props.movie)

    function addMovieToNominationList() {
      setEnabled(false)
      props.addMovieToNominationList(props.movie)
    }

    return (
      <Grid container className={classes.row}>
        <Grid item xs={6}>
          <Typography variant="h4" className={classes.movieTitle}>
            {props.movie.Title}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h4" className={classes.movieYear}>
            {props.movie.Year}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button color="primary"
                id="nominateMovieButton"
                variant={movieInNominatedList ?  "disabled" : "outlined"}
                onClick={addMovieToNominationList}>Nominate movie</Button>
        </Grid>
        <Divider />
      </Grid>
    )
}

export default function MoviesList(props) {
  let searchResult = props.searchResult
  const classes = useStyles()

  return (
    <Grid container className={classes.body}>
        {searchResult ? searchResult.map(function(movie, position) {
          return <MovieRow movie={movie}
                           key={position}
                           addMovieToNominationList={props.addMovieToNominationList}
                           nominationList={props.nominationList}/>
        }):
        <Grid container className={classes.alternateContent}>
          <Typography variant="h4" style={{margin: '0 0 1rem 0'}}><b>Pro tip 1:</b> Don't worry about saving your nomination list. It'll be ready waiting for you when you come back!</Typography>
          <Typography variant="h4"><b>Pro tip 2:</b> Hitting the "I'm feeling lucky" button will load a random movie from IMDB's top 100 list!</Typography>
        </Grid>}
    </Grid>
  )
}
