import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const DetailCard = ({ data, onDeleteUser }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        width="200px"
        height="300px"
        image={data.picture.large}
        alt={data.name.first}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${data.name.title} ${data.name.first} ${data.name.last}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onDeleteUser(data.email)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default DetailCard;
