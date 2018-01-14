const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const os = require('os');

const PORT = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`)
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.use((request, response, next) => {
  const logEntry = `${new Date().toString()}: ${request.method} - ${request.url}`;
  console.log(logEntry);
  fs.appendFile(`${__dirname}/server.log`, `${logEntry}${os.EOL}`, (error) => {
    if(error)
      console.log(error);
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Bello!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (request, response) => {
  response.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Booboo'
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});

module.exports = app;