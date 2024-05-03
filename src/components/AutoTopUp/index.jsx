import React, { useState } from "react";
import { Slider, Switch, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    margin: "auto",
    padding: theme.spacing(6),
    borderRadius: theme.shape.borderRadius,
  },
  section: {
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8a2be2",
    color: "#fff",
    border: "2px solid #8a2be2",
    borderRadius: 20,
    marginTop: theme.spacing(4),
    padding: "14px",
  },
  slider: {
    "& .MuiSlider-rail": {
      backgroundColor: "#ced4da",
      height: 9,
      borderRadius: 8,
    },
    "& .MuiSlider-track": {
      backgroundColor: "#8a2be2",
      height: 9,
      borderRadius: 8,
    },
    "& .MuiSlider-thumb": {
      backgroundColor: "#fff",
      width: 16,
      height: 16,
      marginTop: -4,
      marginLeft: -8,
      border: "2px solid #8a2be2",
    },
    "& .MuiSlider-markLabel": {
      textAlign: "left",
      whiteSpace: "nowrap",
      transform: "translateX(-10%)",
    },
    "& .MuiSlider-markLabel[data-index='5']": {
      transform: "translateX(-50%)",
    },
  },
}));

const AutoTopUp = () => {
  const classes = useStyles();
  const [autoTopUp, setAutoTopUp] = useState(true);
  const [creditValue, setCreditValue] = useState(1200);

  const handleSliderChange = (event, newValue) => {
    setCreditValue(newValue);
  };

  const handleAutoTopUpToggle = () => {
    setAutoTopUp(!autoTopUp);
  };

  const handleConfirmAutoPurchase = () => {
    console.log(`Selected credit amount: ${creditValue}`);
  };

  const marks = [
    { value: 500, label: "5$<br />500 credits" },
    { value: 1500, label: "10$<br />1200 credits" },
    { value: 2500, label: "15$<br />1700 credits" },
    { value: 3500, label: "20$<br />2500 credits" },
    { value: 4500, label: "25$<br />3900 credits" },
    { value: 5500, label: "30$<br />5000 credits" },
  ];

  const numberOfMarks = marks.length;
  const maxCreditValue = marks[numberOfMarks - 1].value;
  const minCreditValue = marks[0].value;
  const totalRange = maxCreditValue - minCreditValue;
  const step = totalRange / (numberOfMarks - 1);

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark w-100">
      <div className={classes.root}>
        {" "}
        {/* Apply the makeStyles root class */}
        <div className="card p-5 shadow-lg rounded-lg">
          <div className="d-flex align-items-center justify-content-between">
            <Typography
              variant="h5"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Setup Auto Top-Up
              <Switch
                checked={autoTopUp}
                onChange={handleAutoTopUpToggle}
                color="primary"
              />
            </Typography>
          </div>
          <Typography
            className="mb-4 text-secondary"
            variant="h6"
            gutterBottom
            style={{ fontSize: "18px" }}
          >
            Once the credit goes below a minimum threshold of{" "}
            <span className="text-primary">50</span>, we will auto-purchase{" "}
            <span className="text-primary">1200</span> credits and add them to
            your account. <u style={{ fontWeight: "bold" }}>Learn more</u>
          </Typography>
          {autoTopUp && (
            <div className="mb-3">
              <Slider
                value={creditValue}
                onChange={handleSliderChange}
                step={step}
                marks={marks.map((mark) => ({
                  ...mark,
                  label: (
                    <Typography variant="body2" gutterBottom>
                      <span style={{ fontWeight: "bold" }}>
                        {mark.label.split("<br />")[0]}
                      </span>
                      <br />
                      <span>{mark.label.split("<br />")[1]}</span>
                    </Typography>
                  ),
                }))}
                min={minCreditValue}
                max={maxCreditValue}
                valueLabelDisplay="off"
                className={classes.slider}
              />
            </div>
          )}
          <div>
            {autoTopUp && (
              <Button
                variant="contained"
                className={`${classes.button} mt-4`}
                onClick={handleConfirmAutoPurchase}
              >
                Confirm auto-purchase
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoTopUp;
