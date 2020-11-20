import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([200, 400]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
   
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Amount range
      </Typography>
      <Slider
      min={0}
      max={10000}
      step={100}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
