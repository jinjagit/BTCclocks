// ------------------------------- Clock stuff ----------------------------------

const clockTick = () => {
  const now = getTime();
  const delta = (now - lastUpdate) / FRAME_DURATION;
  lastUpdate = now;

  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();

  // Update BTC stuff
  if (s == 55) {
    getPrice("https://api.coindesk.com/v1/bpi/currentprice.json");
  } else if (s == 0) {
    calcPercent();
    priceText.innerHTML = '$' + usdString;
  }
  if (m == 0 && s == 50) {
    getPrice("https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday");
  }

  if (h < 10) { h = "0" + h; }
  if (m < 10) { m = "0" + m; }
  if (s < 10) { s = "0" + s; }

  var h2 = h - 4; // Offset (hours) from local time
  if (h2 < 0) { h2 = 24 + h2; }
  else if (h2 < 10) {h2 = "0" + h2; }

  time1.innerHTML = `${h}:${m}`;
  secs1.innerHTML = `:${s}`;
  time2.innerHTML = `${h2}:${m}`;
  secs2.innerHTML = `:${s}`;
};

const startClock = () => {
  lastUpdate = getTime();
  runClock = setInterval(function() { clockTick(); }, 1000);
};

// ------------------------------- BTC stuff ----------------------------------

const calcPercent = () => {
  percent = (((price / closePrice) - 1) * 100).toFixed(2);
  percentText.innerHTML = `${percent}%`;
  if (percent >= 0) { percentText.style.color = 'rgb(0, 148, 0)'; }
  else { percentText.style.color = 'rgb(148, 0, 0)'; }
};

// adapted from: https://medium.com/@ssaurel/create-a-bitcoin-price-index-watcher-in-html5-f441b1e05cd1

const getPrice = (url) => {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4  &&  this.status == 200) {
      var json = JSON.parse(this.responseText);
      parse(json);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

const parse = (json) => {
  if (json["bpi"]["USD"] != undefined) {
    usdString = json["bpi"]["USD"]["rate"].split('.')[0];
    //var gbpValue = "&pound;" + json["bpi"]["GBP"]["rate"];
    //var euroValue = "&euro;" + json["bpi"]["EUR"]["rate"];

    price = parseInt(usdString.replace(',',''));
  } else {
    var obj = json["bpi"];

    for (var key in obj) {
      closePrice = (parseInt(obj[key]));
    }
  }
};

// ----------------------------------------------------------------------------

const FRAME_DURATION = 1000;
const getTime = typeof performance === 'function' ? performance.now : Date.now;
let lastUpdate = getTime();
let time1 = document.getElementById('time1');
let secs1 = document.getElementById('secs1');
let time2 = document.getElementById('time2');
let secs2 = document.getElementById('secs2');
let priceText = document.getElementById('priceText');
let percentText = document.getElementById('percentText');
let closePrice = 0;
let price = 0;
let usdString = '$----';
let percent = '--%'

startClock();
getPrice("https://api.coindesk.com/v1/bpi/currentprice.json");
getPrice("https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday");
setTimeout(function() {
  calcPercent();
  priceText.innerHTML = '$' + usdString;
}, 1000);
