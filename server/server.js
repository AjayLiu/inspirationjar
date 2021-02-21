const express = require("express")
const app = express()
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");

//force https
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}


//middleware
app.use(cors())
app.use(express.json())


// app.use(express.static(path.join(__dirname, "client/out")));
app.use(express.static(path.join(__dirname, "../client/out")));

//Routes//
const routes = require('./routes');
app.use('/', routes);

app.listen(PORT, ()=> {
    console.log(`server has started on port ${PORT}`)
})