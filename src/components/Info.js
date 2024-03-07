import * as React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2),
  borderRadius: "10px",
  textAlign: "start",
  // fontFamily: "BakbakOne",
  color: theme.palette.text.secondary,
}));

export default function Info() {
  return (
    <Grid
      container="true"
      spacing={2}
      style={{
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // flexDirection: "column",
      }}
    >
      <Item item="true" xs={1}>
        <Typography variant="string" style={{ fontSize: 12 }}>
          تعليمات مهمة إلكمال المشوار:
          <br />
          <br />
          ● التوكل على الله وإخالص النية
          <br />
          <br />
          ● قراءة الأية المراد حفظها بتدبر وفهم ٢٠ مرة نظرا،ً مع النظر لبداية
          الأيةالقادمة حتى ترتبط الأيات مع بعضها
          <br />
          <br />
          ● قراءة الأية ١٠ مرات غيباً وستكون قد حفظت الأية وتنتقل للتي بعدها
          بنفس الطريقة
          <br />
          <br />
          ● هذه الطريقة تستغرق ساعة واحدة فقط لحفظ صفحة واحدة يوميا،ً فيجب علينا
          استقطاع هذه الساعة من وقتنا لحفظ هذه السورة وخالل ٥٤ يوماً نكون قد
          أنهينا حفظها بأجود ما يكون
          <br />
          <br />● هذه التعليمات والطرق كانوا أئمة الحرم يحفظون منها فهي مجربة
          ونافعة بحول اللهم لمن كانت عنده العزيمة القوية والهمة العالية لحفظها
        </Typography>
      </Item>
    </Grid>
  );
}
