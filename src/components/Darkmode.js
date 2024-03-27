import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { Darkmode } from "../App";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // marginLeft: theme.spacing(1),
  borderRadius: "10px",
  textAlign: "center",
  // fontFamily: "BakbakOne",
  color: theme.palette.text.secondary,
}));

// console.log(theme);

export default function DarkMode() {
  const theme = useTheme();
  let ms;
  theme.palette.mode === "dark" ? (ms = "الضوء الفاتح") : (ms = "الضوء الليلي");

  return (
    <Grid container="true" spacing={2} style={{ fontWeight: "bold" }}>
      <Item
        item="true"
        xs={1}
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Darkmode />
        <Typography
          color="primary"
          style={{ fontFamily: "BakbakOne", fontWeight: 600, fontSize: 12 }}
        >
          {ms}
        </Typography>
      </Item>
    </Grid>
  );
}
