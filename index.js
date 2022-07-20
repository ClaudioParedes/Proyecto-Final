const express = require('express');
const exphbs  = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const { default: axios } = require('axios');
require('dotenv').config();

const app = express();

// SERVIDOR
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use("/axios", express.static(__dirname + "/node_modules/axios/dist"));
app.use(expressFileUpload({
  limits: 5000000,
  abortOnLimit: true,
  responseOnLimit:'Excede 5 MegaBytes Permitidos',
  createParentPath: true
}));

app.engine("hbs", exphbs.engine({
  extname: '.hbs',
  defaultLayout: "main",
  layoutsDir: (__dirname + "/views/layouts"),
  partialsDir: (__dirname + "/views/components"),
})
);

app.set("view engine", "hbs");

//API
app.use("/api", require("./routes/api"));

//VIEWS
app.use("/", require("./routes/views"));

// axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")