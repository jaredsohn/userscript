// ==UserScript==
// @name           MaxFleet
// @author         KamaZz
// @include        http://*.ogame.*/game/index.php?page=shipyard
// @include        http://*.ogame.*/game/index.php?page=defense
// ==/UserScript==

var c, d = Array(21);
d[0] = [202, 2E3, 2E3, 0, 5E3];
d[1] = [203, 6E3, 6E3, 0, 25E3];
d[2] = [204, 3E3, 1E3, 0, 50];
d[3] = [205, 6E3, 4E3, 0, 100];
d[4] = [206, 2E4, 7E3, 2E3, 800];
d[5] = [207, 45E3, 15E3, 0, 1500];
d[6] = [208, 1E4, 2E4, 1E4, 7500];
d[7] = [209, 1E4, 6E3, 2E3, 2E4];
d[8] = [210, 0, 1E3, 0, 5];
d[9] = [211, 5E4, 25E3, 15E3, 500];
d[10] = [212, 0, 2E3, 500];
d[11] = [213, 6E4, 5E4, 15E3, 2E3];
d[12] = [214, 5E6, 4E6, 1E6, 1E6];
d[13] = [215, 3E4, 4E4, 15E3, 750];
d[14] = [401, 2E3, 0, 0];
d[15] = [402, 1500, 500, 0];
d[16] = [403, 6E3, 2E3, 0];
d[17] = [404, 2E4, 15E3, 2E3];
d[18] = [405, 2E3, 6E3, 0];
d[19] = [406, 5E4, 5E4, 3E4];
d[20] = [502, 8E3, 0, 2E3];
d[21] = [503, 12500, 2500, 1E4];
for(c = 0;c < 21;c++) {
  try {
    document.getElementById("details" + d[c][0]).addEventListener("click", function(a) {
      return function() {
        i(a)
      }
    }(c), false)
  }catch(n) {
  }
}
function i(a) {
  var g = o(a), h = setInterval(function() {
    try {
      document.getElementById("costs").getElementsByClassName("enter")[0].innerHTML += "[<a onclick=\"document.forms['form'].menge.value = " + g + ';" href="#" class="tipsStandard" id="maxlink">max. ' + g + '</a>]<br /><font id="roominess"></font><br />';
      document.getElementById("action").getElementsByClassName("time")[0].innerHTML += '[<span id="newtime"></span>]';
      document.getElementById("number").addEventListener("keyup", function() {
        p(a)
      }, false);
      document.getElementById("maxlink").addEventListener("click", function() {
        p(a)
      }, false);
      clearInterval(h)
    }catch(e) {
    }
  }, 500)
}
function p(a) {
  var g = document.getElementById("number").value, h = document.getElementById("newtime"), e, b;
  b = document.getElementById("action").getElementsByClassName("time")[0].innerHTML;
  if(b.match(/(?:(\d+)[\u0447|h]\s)?(\d+)[\u043c|m]\s(\d+)/i)) {
    b = b.match(/(?:(\d+)[\u0447|h]\s)?(\d+)[\u043c|m]\s(\d+)/i);
    var f = b[1] == "" || b[1] == null ? b[2] * 60 + Number(b[3]) : b[1] * 3600 + b[2] * 60 + Number(b[3])
  }else {
    if(b.match(/(\d+)[\u0441|c]/i)) {
      b = b.match(/(\d+)[\u0441|c]/i);
      f = b[1]
    }else {
      if(b.match(/(\d+)[\u0434|d]\s(\d+)[\u0447|h]\s(\d+)[\u043c|m]/i)) {
        b = b.match(/(\d+)[\u0434|d]\s(\d+)[\u0447|h]\s(\d+)[\u043c|m]/i);
        f = b[1] * 86400 + b[2] * 3600 + b[3] * 60
      }
    }
  }
  b = f;
  b = b == 0 ? b = 0 : b * g;
  f = Math.floor(b / 86400);
  var k = Math.floor(b / 3600) - f * 24, l = Math.floor(b / 60) - f * 24 * 60 - k * 60, m = Math.floor(b - f * 24 * 60 * 60 - k * 60 * 60 - l * 60);
  if(b >= 864E4) {
    e = "~" + f + "d"
  }else {
    if(b >= 86400) {
      e = f + "d " + k + "h " + l + "m "
    }else {
      if(b >= 3600 && b < 86400) {
        e = k + "h " + l + "m " + m + "s"
      }else {
        if(b >= 60 && b < 3600) {
          e = l + "m " + m + "s"
        }else {
          if(b >= 1 && b < 60) {
            e = m + "s"
          }
        }
      }
    }
  }
  h.innerHTML = e;
  h = 0;
  var j;
  e = "";
  b = 0;
  f = d[a][4] * g;
  try {
    document.getElementById("roominess").innerHTML = "(" + q(f) + ")";
    for(c = 0;c < 3;c++) {
      switch(c) {
        case 0:
          j = r("metal");
          break;
        case 1:
          j = r("crystal");
          break;
        case 2:
          j = r("deuterium")
      }
      b += j
    }
    e = b > f ? "red" : "green";
    document.getElementById("roominess").color = e
  }catch(s) {
  }
  for(c = 1;c < 4;c++) {
    d[a][c] == 0 && c++;
    switch(c) {
      case 1:
        j = r("metal");
        break;
      case 2:
        j = r("crystal");
        break;
      case 3:
        j = r("deuterium")
    }
    f = d[a][c] * g;
    b = j - f;
    e = b < 1 ? "red" : "green";
    document.getElementById("costs").getElementsByClassName("cost")[h].innerHTML = q(f) + '<br /><font color="' + e + '">' + q(b) + "</font>";
    h++
  }
}
function q(a) {
  a += "";
  if(a.match(/\-/)) {
    var g = "-"
  }
  a = a.match(/(\d+)/)[1].length <= 6 ? a.match(/(\d+)?(\d{3})$/) : a.match(/(\d+)?(\d{3})(\d{3})$/);
  a[1] = a[1] ? a[1] = a[1] : a[1] = 0;
  a[2] = a[2] ? "." + a[2] : a[2] = "";
  a[3] = a[3] ? "." + a[3] : a[3] = "";
  return g ? g + a[1] + a[2] + a[3] : a[1] + a[2] + a[3]
}
function r(a) {
  a = document.getElementById("resources_" + a).innerHTML;
  a = a.split(".");
  a = a[2] ? a[0] + a[1] + a[2] : a[0] + a[1];
  return a = parseInt(a)
}
function o(a) {
  var g = r("metal") / d[a][1], h = r("crystal") / d[a][2];
  a = r("deuterium") / d[a][3];
  var e = g;
  if(g > h) {
    e = h
  }
  if(h > a && g > a) {
    e = a
  }
  return parseInt(e)
}
;