import React, { useState, useEffect, useContext, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { green } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import DarkMode from "./Darkmode";
import Portfolio from "./Portfolio";
import Slide from "@mui/material/Slide";
import Info from "./Info";
import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Tabel } from "./Tabel";

// import Prayertime from "./Prayertimes";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// ICONS
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";

// Components
import { DataContext } from "../contexts/DataContext";

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Sound IMPORTS

import done from "../Sounds/done2.mp3";
import notdone from "../Sounds/notdone.mp3";
import bell from "../Sounds/bell.mp3";
import add from "../Sounds/add.mp3";
import reset from "../Sounds/reset.mp3";

// Get data score from local storage
let statoftask = JSON.parse(localStorage.getItem("statoftask"));
let statofNavgatin = JSON.parse(localStorage.getItem("statofNavgatin"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const STORAGE_KEY = "completeTask";

const AlBaqara = ({ theme }) => {
  // Create a Howl instance for the sound effect
  const Done = new Audio(done);
  const Notdone = new Audio(notdone);
  const Add = new Audio(add);
  const Bell = new Audio(bell);
  const resets = new Audio(reset);

  const [tasks, setTasks] = useState(Tabel);
  const [displayedtasksType, setDisplayedtasksType] = useState(
    statoftask === null ? "dataTable" : statoftask
  );

  const [display, setDisplay] = useState(
    statofNavgatin === null ? 0 : statofNavgatin
  );

  const { showHideToast } = useContext(DataContext);
  const [modelTitel, setmodelTitel] = useState([]);
  const [modelContent, setmodelContent] = useState([]);
  const [modelstate, setmodelstate] = useState(false);
  const [infomodel, setinfomodel] = useState(false);
  const [delet, setdelet] = useState(0);

  useEffect(() => {
    const savedOptions = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedOptions) {
      setTasks(savedOptions);
    }
  }, []);

  const handleSelectChange = (event, taskId) => {
    const { value } = event.target;
    const updatedData = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, selectedOption: value };
      }
      return task;
    });

    setTasks(updatedData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };

  /* Get data from localStorage */
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("completeTask"));
    if (storageTodos === null) {
      // Use === for comparison, not =
    } else {
      setTasks(storageTodos);
    }
  }, []);

  /* Delete score Model */
  function DeletscoreOpene() {
    setdelet(1);
    setmodelstate(true);
    setmodelTitel(" البدء من جديد!!");
    setmodelContent(
      "هل أنت متأكد من حذف  و اعادة ضبط جميع الخيارات والبدء من جديد!؟"
    );
  }
  /*=== Delete score Model ===*/

  function ModelClose() {
    setmodelstate(false);
    setinfomodel(false);
  }

  /* info Model */
  function infoOpene() {
    setinfomodel(true);
  }

  // Function to play the sound effect
  const playSound = (effect) => {
    effect.loop = false;
    effect.play();
  };

  // Change tasks to completed
  const completeTask = (taskId) => {
    // Ensure tasks is initialized and not null
    if (tasks === null) {
      tasks = []; // Initialize tasks as an empty array if it's null
    }
    const updatedTasks = tasks.map((obj) => {
      if (obj.id === taskId) {
        const newIsCompleted = !obj.isCompleted;

        setTasks((prevTasks) => {
          const updatedRows = prevTasks.map((prevObj) =>
            prevObj.id === taskId
              ? { ...prevObj, isCompleted: newIsCompleted }
              : prevObj
          );
          localStorage.setItem("completeTask", JSON.stringify(updatedRows));

          return updatedRows;
        });
        if (newIsCompleted) {
          showHideToast("الحمد لله..اللهم تقبل يارب", "success"); // Call function when isCompleted becomes true
          playSound(Done);
        } else {
          showHideToast("لا تجعل الشيطان يلهيك", "error");
          playSound(Notdone);
        }
      }

      return obj;
    });
  };

  // filter all non completed tasks

  const completed = useMemo(() => {
    return tasks.filter((t) => {
      return t.isCompleted;
    });
  }, [tasks]);

  const notCompleted = useMemo(() => {
    return tasks.filter((t) => {
      return !t.isCompleted;
    });
  }, [tasks]);

  // Show data for each slide in the Header
  function changeDisplayedType(e) {
    setDisplayedtasksType(e.target.value);
    localStorage.setItem("statoftask", JSON.stringify(e.target.value));
  }

  // Condition for each slide in the Header
  let Alltasks = [];
  if (tasks !== null) {
    switch (displayedtasksType) {
      case "completed":
        Alltasks = completed;
        break;
      case "non-completed":
        Alltasks = notCompleted;
        break;
      case "dataTable":
        Alltasks = tasks;
        break;
      default:
        Alltasks = [];
    }
  }

  const homePage = (
    <CardContent
      container="true"
      key={1}
      spacing={2}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Container
        direction="row"
        style={{
          // marginTop: 30,
          // marginBottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "column",
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <DarkMode />
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // flexDirection: "column",
            }}
          >
            <IconButton
              onClick={infoOpene}
              color="primary"
              aria-label="add to shopping cart"
            >
              <Typography
                style={{
                  // fontFamily: "kitab",
                  fontWeight: "bold",
                  fontSize: 10,
                  // marginLeft: 10,
                }}
              >
                شرح طريفة الحفظ
              </Typography>

              <InfoIcon fontSize="large" />
            </IconButton>
            <Button
              style={{ marginTop: 10, fontSize: 10 }}
              size="small"
              onClick={DeletscoreOpene}
              variant="contained"
              color="error"
            >
              البدء من جديد Reset
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography
              style={{
                // fontFamily: "kitab",
                fontWeight: "bold",
                fontSize: 25,
                // marginLeft: 10,
              }}
            >
              حفظ سورة البقرة في 50 يوم
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </CardContent>
  );

  const tabs = (
    <>
      <ToggleButtonGroup
        key={2}
        style={{ direction: "ltr", marginTop: "0px" }}
        value={displayedtasksType}
        exclusive
        color="primary"
        onChange={changeDisplayedType}
        aria-label="text alignment"
        size="small"
      >
        <ToggleButton value="non-completed">غير منجز</ToggleButton>
        <ToggleButton value="completed">المنجز</ToggleButton>
        <ToggleButton value="dataTable"> جدول الحفظ</ToggleButton>
      </ToggleButtonGroup>

      <Card
        key={3}
        sx={{
          minWidth: 380,
        }}
      >
        <Card
          container="true"
          // className="todoCard"
          sx={{
            background: "#8e24aa",
            // color: "white",
            marginTop: 1,
            padding: "10px",
            fontFamily: "BakbakOne",
            fontWeight: "bold",
          }}
        >
          <Grid container="true" spacing={2}>
            <Grid
              xs={2}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              color="#fff"
            >
              <Typography
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                الأيام
              </Typography>
            </Grid>

            <Grid
              xs={3}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              color="#fff"
            >
              <Typography
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                الآيات
              </Typography>
            </Grid>

            <Grid
              xs={4}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              color="#fff"
            >
              <Typography
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                اختبر نفسك
              </Typography>
            </Grid>

            <Grid
              xs={3}
              display="flex"
              textAlign="start"
              justifyContent="start"
              alignItems="start"
              color="#fff"
            >
              <Typography
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                المنجز
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Card>
    </>
  );

  const Lists = (
    <Card
      key={3}
      style={{
        // marginTop: 0,
        maxHeight: "55vh",
        // maxWidth: "60.5vh",
        // background: "green",
        overflow: "scroll",
      }}
      sx={{
        minWidth: 380,
      }}
    >
      {Alltasks.map((task) => (
        <Card
          key={task.id}
          container="true"
          className="todoCard"
          sx={{
            background: theme.palette.mode === "dark" ? "#212121" : "#212121",
            // color: "white",
            marginTop: 1,
          }}
        >
          <Grid container="true" spacing={2}>
            <Grid
              xs={3}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              color="#fff"
            >
              <Typography style={{ fontSize: 15 }}>{task.titel}</Typography>
            </Grid>

            <Grid
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* num    */}
              <Stack direction="row" container="true" spacing={1}>
                <Chip
                  label={task.num}
                  style={{
                    // background: "#fbc02d",
                    color: "white",
                    fontSize: task.num === "مراجعة السابق" ? "15px" : "20px",
                    fontFamily: "BakbakOne",
                    fontWeight: "bold",
                  }}
                />
              </Stack>

              {/* == num  ==  */}
            </Grid>

            <Grid
              xs={6}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              color="#fff"
            >
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel
                    style={{ color: "white" }}
                    id={`select-label-${task.id}`}
                  >
                    اختبر نفسك
                  </InputLabel>
                  <Select
                    style={{
                      color:
                        task.selectedOption === "good" ? "green" : "#e53935",
                    }}
                    labelId={`select-label-${task.id}`}
                    id={`select-${task.id}`}
                    value={task.selectedOption || ""}
                    onChange={(e) => handleSelectChange(e, task.id)}
                  >
                    <MenuItem style={{ color: "green" }} value="good">
                      {task.good}
                    </MenuItem>
                    <MenuItem style={{ color: "#e53935" }} value="bad">
                      {task.bad}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* CHECK ICON BUTTON */}
              <IconButton
                onClick={() => completeTask(task.id)}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "white",
                  // border: "solid #8bc34a 3px",
                }}
              >
                {task.isCompleted ? (
                  <CheckCircleIcon sx={{ color: green[500], fontSize: 30 }} />
                ) : task.counter ? null : (
                  <Brightness1OutlinedIcon sx={{ fontSize: 30 }} />
                )}
              </IconButton>
              {/*== CHECK ICON BUTTON ==*/}
            </Grid>
          </Grid>
        </Card>
      ))}
    </Card>
  );

  function refreshPage() {
    window.location.reload(false);
  }

  function ResetMyScores() {
    setmodelstate(false);

    localStorage.removeItem("completeTask");
    playSound(resets);
    refreshPage();
  }
  // console.log(display);

  let ms;
  theme.palette.mode === "dark" ? (ms = "prayericonD") : (ms = "prayericonW");

  return (
    <Card
      style={{
        width: 450,
        // background: "green",
        height: "100vh",
        borderRadius: "20px",
      }}
      sx={{ minWidth: 250 }}
    >
      {/* ==== FILTER BUTTON ==== */}
      {display === 0 ? (
        [homePage, tabs, Lists]
      ) : display === 1 ? (
        <Portfolio />
      ) : null}

      {/* info DIALOG */}
      <Dialog
        className="Dialog"
        // maxWidth="md"
        // onClose={AthkarClose}
        style={{ direction: "rtl" }}
        open={modelstate}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{modelTitel}</DialogTitle>
        <DialogContent dividers>
          <DialogContent style={{ padding: 0 }}>
            <DialogContentText
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              id="alert-dialog-slide-description"
            >
              <Grid>
                <Grid item="true" xs={8}>
                  <Typography style={{ fontSize: 15 }}>
                    {modelContent}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </DialogContent>

        <DialogActions style={{ direction: "ltr" }}>
          {delet === 1 ? (
            <Button color="error" variant="contained" onClick={ResetMyScores}>
              نعم
            </Button>
          ) : null}

          <Button variant="contained" onClick={ModelClose}>
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
      {/* === info DIALOG === */}

      {/* info DIALOG */}
      <Dialog
        // maxWidth="md"
        className="Dialog"
        // onClose={infoModelClose}
        style={{ direction: "rtl" }}
        open={infomodel}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle> شرح طريفة الحفظ </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Info />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ModelClose}>إغلاق</Button>
        </DialogActions>
      </Dialog>
      {/* === info DIALOG === */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={display}
          onChange={(event, newValue) => {
            setDisplay(newValue);
            localStorage.setItem("statofNavgatin", JSON.stringify(newValue));
          }}
        >
          <BottomNavigationAction
            label="  جدول الحفظ"
            icon={<MenuBookIcon />}
          />
          <BottomNavigationAction label="عن المطور" icon={<InfoIcon />} />
        </BottomNavigation>
      </Paper>
    </Card>
  );
};

export default AlBaqara;
