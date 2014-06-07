// ==UserScript==
// @name           Quick actions to my other villages
// @namespace      http://userscripts.org/users/72477
// @description    Adds icons to quickly eg. send resources to other villages in village list
// @version        0.2

// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js

// ==/UserScript==

var lightModEnabled = true; // Only attack and send resource buttons.

var imageEmbed = new Array();
imageEmbed["globe"] = "data:image/gif;base64,R0lGODlhDAANAPcAAAAAAAVrEwB0CgB4DQB7DQByHwplPQF+MRZlNxJwOQdcRAZYagRkTwFuTRhiUAFjditgawM/pQBHmxVHlx9UgwFApwNGqABGrQJJrwBQtQBUuwBevBJCpxREqRdFqxdWsgFrpQB1tAF4uitcgShOtCJXtjdXpDddvjhXuDtdvTxltQBcwgBrzQFuzQ1oxxxsxRV41EFdiUdemkRerVxsk1lsmkZxvgGCNiSoLDSxLgGGQQGETAGJWQyTcB6beD6NdSWkfky/LEK3RljFNWfNRWzPQ2LKU2/QVHTTan7YdQGAjQiHjw2Xgx6KnQKIoQiEohyilTazjQGJyQKD3AaS2AGG7QmY5BKe+xehxzSd6DCw+meBkHqJmHKQmHaIqnmGo06Qz0mj3kq+/nam2nbNrGfL13rU1JyisqOotKistqW6va6yuYir1pWnwY3YkIjcq4LStZDhkZPhpJ3mpJzlrqTpoqTjtpvV0p3K66rL0qHZ0KLH5qfjzabow7XwxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAA0AAAifAP8J/McHDpk7AwfaeSMnyRAgWfAMdINkjh86RqBMaZLnnx4hReLU6VMGi5MDP/6F8RGEyBEzYqzwIJBADYwnOHJE0XJFyo0CBrq4aLGkBxMqVZQMCOBgy4sVLETo2BECBAMEELiAwaBhQwMBDzJYGBEDzZ4PFS4sUCAhAgcTNASOKdGBwgQPJFDIWDOQjQ0VJ1LMqJEmocA2Xr6cSRgQADs=";

function xy2id(x, y) {
return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}

function addButtons() {

var villages = document.getElementById("vlist").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
for (vn in villages)
{ 
  var getTds = villages[vn].getElementsByTagName("td");
  var getIt = getTds[1].getElementsByTagName("a")[0].getAttribute("href");
  getA = getIt.match(/\?newdid=(.*)/);
  if (getA == null) {
  alert("Error occurred");
  break;
  }
  getA = getA[1].split("&");
  
  var coords = getTds[2].getElementsByTagName("div");
  var coordsi = new Array();
  coordsi[0] = coords[0].textContent;
  coordsi[2] = coords[2].textContent;
  
  var myVid = xy2id(coordsi[0].replace("(", ""), coordsi[2].replace(")", ""));
  var myCid = getA[0];
  
  var newTD = document.createElement("td");
  newTD.innerHTML = "<a href='a2b.php?z=" + myVid + "'><img class='iReport iReport2' src='img/x.gif'/></a> ";
  newTD.innerHTML += "<a href='build.php?z=" + myVid + "&gid=17'><img class='r4' src='img/x.gif'/></a> ";
  if (lightModEnabled == false) {
  newTD.innerHTML += "<a href='karte.php?z=" + myVid + "'><img src='" + imageEmbed["globe"] + "'/></a> ";
  newTD.innerHTML += "<a href='build.php?newdid=" + myCid + "&gid=19'><img class='unit u11' src='img/x.gif'/></a> ";
  newTD.innerHTML += "<a href='build.php?newdid=" + myCid + "&gid=17'><img class='r1' src='img/x.gif'/></a> ";
  
  newTD.innerHTML += "Village id: " + myVid + " ";
  newTD.innerHTML += "Building id: " + myCid;
  }
  villages[vn].appendChild(newTD);
}
}
if (lightModEnabled == false) {
addButtons(); // Executes button adding instantly
}
else {
window.addEventListener("load", addButtons, true); // Executes button adding after page has loaded (makes sure its executed after resource from other villages- script
}