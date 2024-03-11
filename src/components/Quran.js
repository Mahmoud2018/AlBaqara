import React, { useState, useContext } from "react";
import { QData } from "./QData";
import ReactAudioPlayer from "react-audio-player";
import { TafseerData } from "./TafseerData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Athkar from "./Athkar";
import { Qurra } from "./Qurra";
import { DataContext } from "../contexts/DataContext";
import { Ayat } from "./Tabel";
import { ayanumbers } from "./Tabel";

import { Darkmode } from "../App";
import { useTheme } from "@mui/material/styles";

import {
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import QuranAudioPlayer from "./QuranAudioPlayer";
let statofDisplsy = JSON.parse(localStorage.getItem("statofDisplsy"));
let statofselect = JSON.parse(localStorage.getItem("statofselect"));
let statofQurra = JSON.parse(localStorage.getItem("statofQurra"));
function Quran() {
  const [selectedItem, setSelectedItem] = useState(
    statofselect === null ? 0 : statofselect
  );
  const [displayQuran, setDisplayQuran] = useState(
    statofDisplsy === null ? 1 : statofDisplsy
  );

  const [quraa, setquraa] = useState(
    statofQurra === null ? "https://server7.mp3quran.net/s_gmd/" : statofQurra
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = useTheme();
  let ms;
  theme.palette.mode === "dark" ? (ms = "Light") : (ms = "Dark");
  // console.log(displayQuran);
  // console.log(selectedItem);

  function suralistOpene() {
    setDisplayQuran(1);
    localStorage.setItem("statofDisplsy", JSON.stringify(1));
  }

  function getSlicedQData(ayanumbers) {
    return ayanumbers.map(({ id, num1, num2 }) => {
      return {
        id: id,
        data: QData.slice(num1 - 1, num2),
      };
    });
  }

  const slicedQData = getSlicedQData(ayanumbers);

  const ShowQuran = (itemId) => {
    const selected = slicedQData.find((item) => item.id === itemId);
    setSelectedItem(selected);
    setDisplayQuran(2);
    localStorage.setItem("statofDisplsy", JSON.stringify(2));
    localStorage.setItem("statofselect", JSON.stringify(selected));
  };

  function addLeadingZeros(number, length) {
    const numberString = String(number);
    const zerosToAdd = length - numberString.length;

    if (zerosToAdd <= 0) {
      return numberString;
    }

    const zeros = "0".repeat(zerosToAdd);
    return zeros + numberString;
  }

  const result = addLeadingZeros(selectedItem.id, 3);

  const AudioUrl = `${quraa}${result}.mp3`;

  const handleChange = (event) => {
    setquraa(event.target.value);
    localStorage.setItem("statofQurra", JSON.stringify(event.target.value));
  };

  return (
    <>
      <div style={{ marginBottom: "5px" }}></div>
      <Button
        style={{ fontSize: 10 }}
        variant="outlined"
        startIcon={<MenuBookIcon style={{ marginLeft: 10 }} />}
        onClick={suralistOpene}
      >
        القرآن
      </Button>

      <Button
        style={{ width: 20, height: 35, fontSize: 10 }}
        variant="outlined"
      >
        <Darkmode />
      </Button>
      {/*
      {displayQuran === 2 ? (
        <>
          <ReactAudioPlayer
            // style={{ marginTop: 2 }}
            src={AudioUrl}
            autoPlay={false}
            controls
            volume={1.0}
            loop={false}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        </>
      ) : null} */}

      <List aria-label="surahs">
        {displayQuran === 1 ? (
          <Typography
            className="titel-text"
            style={{
              color: "white",
              fontFamily: "kitab",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            ﴿ فهرس الآيات ﴾
          </Typography>
        ) : null}

        {displayQuran === 2 ? (
          <>
            {/* <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
              <InputLabel id="demo-simple-select-label">
                المزيد من القرآء
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={quraa}
                label="Age"
                onChange={handleChange}
              >
                {Qurra.map((data) => {
                  return (
                    <MenuItem key={data.id} value={data.server}>
                      <Typography
                        variant="string"
                        style={{
                          fontFamily: "kitab",
                          fontSize: 20,
                        }}
                        key={data.id}
                      >
                        {data.name + "  "}
                        <span
                          key={data.id}
                          style={{
                            color: "#fbc02d",
                            fontSize: 12,
                          }}
                        >
                          {"  " + data.rwaia}
                        </span>
                      </Typography>{" "}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl> */}
            <Typography
              className="titel-text"
              style={{
                color: "white",
                fontFamily: "kitab",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              ﴿ ⁠بسم الله الرحمن الرحيم ﴾
            </Typography>
          </>
        ) : null}

        <CardContent
          sx={{
            border: 3,
            borderColor: "primary.main",
          }}
          container="true"
          spacing={2}
          style={{
            justifyContent: "center",
            padding: "5px",
            height: "78vh",
            borderRadius: "20px",
            overflow: "scroll",
          }}
        >
          {displayQuran === 1
            ? Ayat.map((data) => (
                <ListItem disablePadding key={data.id}>
                  <ListItemButton
                    key={data.id}
                    style={{
                      display: "flex",
                      textAlign: "center",
                      alignItems: "baseline",
                    }}
                    onClick={() => ShowQuran(data.id)}
                  >
                    <Typography
                      key={data.id}
                      className="suraname"
                      style={{
                        fontFamily: "kitab",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 10,
                      }}
                    >
                      ﴿من الآیة ﴾
                    </Typography>
                    <Typography
                      style={{ fontFamily: "kitab", fontSize: 20 }}
                      align="right"
                    >
                      {data.aya}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))
            : null}
          {displayQuran === 2 ? (
            <>
              <Typography
                variant="string"
                style={{
                  fontFamily: "kitab",
                  fontSize: 20,
                }}
              >
                {selectedItem.data.map((arItem) => (
                  <Typography
                    variant="string"
                    style={{
                      fontFamily: "othmani",
                      fontSize: 22,
                      // fontWeight: "600",
                    }}
                    key={arItem.id}
                  >
                    {arItem.ar}
                    <span
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        fontFamily: "kitab",
                        fontSize: 20,
                      }}
                      className="suranumber"
                    >
                      ﴿{arItem.id}﴾
                    </span>
                  </Typography>
                ))}
              </Typography>
            </>
          ) : null}
        </CardContent>
      </List>
    </>
  );
}

export default Quran;
