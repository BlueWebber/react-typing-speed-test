import { Paper, Typography, Box } from "@mui/material";

const SpeedData = ({ title, children }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Paper
        sx={{
          width: 60,
          height: 60,
          backgroundImage: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 0.1,
          borderRadius: 4,
        }}
        elevation={2}
      >
        <Typography variant="h4" component="label" sx={{ opacity: 0.9 }}>
          {children}
        </Typography>
      </Paper>
      <Typography variant="body2" sx={{ opacity: 0.75 }}>
        {title}
      </Typography>
    </Box>
  );
};

export default SpeedData;
