const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => {
  axios.get('https://www.google.com')
    .then(response => {
      const $ = cheerio.load(response.data);
      const links = $('a').map((i, link) => $(link).attr('href')).get();
      res.send(`
      <!DOCTYPE html>
<html>
  <head>
    <title>List of Links</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f1f1f1;
        width: 85%;
        margin: 0 auto;
      }
      h1 {
        text-align: center;
        margin-top: 30px;
        color: #333;
        text-shadow: 1px 1px #fff;
      }
      table {
        margin: 0 auto;
        border-collapse: collapse;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
      }
      td {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #ccc;
      }
      td:last-child {
        border-bottom: none;
      }
      a {
        color: #1e90ff;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      a:hover {
        color: #fff;
        background-color: #1e90ff;
      }
    </style>
  </head>
  <body>
    <h1>List of Links</h1>
    <table>
      <tbody>
        ${links
          .map(
            (link) =>
              `<tr><td><a href="${link}">${link}</a></td></tr>`
          )
          .join("\n")}
      </tbody>
    </table>
  </body>
</html>
    `);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
