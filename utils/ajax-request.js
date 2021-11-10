const https = require("https");

function ajaxRequest(url, data, err) {
  https.get(url, (res) => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", (data) => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      if (body) {
        data(body);
      } else {
        err({ status: 500, error: "Could not fetch data" });
      }
    });
  });
}

module.exports = { ajaxRequest };
