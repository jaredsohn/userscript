// ==UserScript==
// @name           OGame Redesign MaxFleet [Mod]
// @author         KamaZz
// @include        http://*.ogame.*/game/index.php?page=shipyard&session=*
// @include        http://*.ogame.*/game/index.php?page=defense&session=*
// ==/UserScript==

var c, f = Array(21);
f[0] = Array(202, 2E3, 2E3, 0);
f[1] = Array(203, 6E3, 6E3, 0);
f[2] = Array(204, 3E3, 1E3, 0);
f[3] = Array(205, 6E3, 4E3, 0);
f[4] = Array(206, 2E4, 7E3, 2E3);
f[5] = Array(207, 45E3, 15E3, 0);
f[6] = Array(208, 1E4, 2E4, 1E4);
f[7] = Array(209, 1E4, 6E3, 2E3);
f[8] = Array(210, 0, 1E3, 0);
f[9] = Array(211, 5E4, 25E3, 15E3);
f[10] = Array(212, 0, 2E3, 500);
f[11] = Array(213, 6E4, 5E4, 15E3);
f[12] = Array(214, 5E6, 4E6, 1E6);
f[13] = Array(215, 3E4, 4E4, 15E3);
f[14] = Array(401, 2E3, 0, 0);
f[15] = Array(402, 1500, 500, 0);
f[16] = Array(403, 6E3, 2E3, 0);
f[17] = Array(404, 2E4, 15E3, 2E3);
f[18] = Array(405, 2E3, 6E3, 0);
f[19] = Array(406, 5E4, 5E4, 3E4);
f[20] = Array(502, 8E3, 0, 2E3);
f[21] = Array(503, 12500, 2500, 1E4);
for(c = 0;c < 21;c++) {
  try {
    document.getElementById("details" + f[c][0]).addEventListener("click", function(a) {
      return function() {
        i(a)
      }
    }(c), false)
  }catch(n) {
  }
}
function i(a) {
  var e = o(a), g = setInterval(function() {
    try {
      document.getElementById("costs").getElementsByClassName("enter")[0].innerHTML += "<a onclick=\"document.forms['form'].menge.value = " + e + ';" href="#" class="tipsStandard" id="maxlink">Max ' + e + "</a><br />";
      document.getElementById("action").getElementsByClassName("time")[0].innerHTML += '<span id="newtime"></span>';
      document.getElementById("number").addEventListener("keyup", function() {
        p(a)
      }, false);
      document.getElementById("maxlink").addEventListener("click", function() {
        p(a)
      }, false);
      clearInterval(g)
    }catch(d) {
    }
  }, 500)
}
function p(a) {
  var e = document.getElementById("number").value, g = document.getElementById("newtime"), d, b;
  b = document.getElementById("action").getElementsByClassName("time")[0].innerHTML;
  if(b.match(/(?:(\d+)[\u0447|h]\s)?(\d+)[\u043c|m]\s(\d+)/i)) {
    b = b.match(/(?:(\d+)[\u0447|h]\s)?(\d+)[\u043c|m]\s(\d+)/i);
    var h = b[1] == "" || b[1] == null ? b[2] * 60 + Number(b[3]) : b[1] * 3600 + b[2] * 60 + Number(b[3])
  }else {
    if(b.match(/(\d+)[\u0441|c]/i)) {
      b = b.match(/(\d+)[\u0441|c]/i);
      h = b[1]
    }else {
      if(b.match(/(\d+)[\u0434|d]\s(\d+)[\u0447|h]\s(\d+)[\u043c|m]/i)) {
        b = b.match(/(\d+)[\u0434|d]\s(\d+)[\u0447|h]\s(\d+)[\u043c|m]/i);
        h = b[1] * 86400 + b[2] * 3600 + b[3] * 60
      }
    }
  }
  b = h;
  b = b == 0 ? b = 0 : b * e;
  h = Math.floor(b / 86400);
  var j = Math.floor(b / 3600) - h * 24, k = Math.floor(b / 60) - h * 24 * 60 - j * 60, m = Math.floor(b - h * 24 * 60 * 60 - j * 60 * 60 - k * 60);
  if(b >= 864E4) {
    d = "~" + h + "d"
  }else {
    if(b >= 86400) {
      d = h + "d " + j + "h " + k + "m "
    }else {
      if(b >= 3600 && b < 86400) {
        d = j + "h " + k + "m " + m + "s"
      }else {
        if(b >= 60 && b < 3600) {
          d = k + "m " + m + "s"
        }else {
          if(b >= 1 && b < 60) {
            d = m + "s"
          }
        }
      }
    }
  }
  g.innerHTML = "[" + d + "]";
  g = 0;
  var l;
  for(c = 1;c < 4;c++) {
    f[a][c] == 0 && c++;
    switch(c) {
      case 1:
        l = q("metal");
        break;
      case 2:
        l = q("crystal");
        break;
      case 3:
        l = q("deuterium");
        break
    }
    b = f[a][c] * e;
    d = l - b;
    h = d < 1 ? "red" : "green";
    document.getElementById("costs").getElementsByClassName("cost")[g].innerHTML = r(b) + '<br /><font color="' + h + '">' + r(d) + "</font>";
    g++
  }
}
function r(a) {
  a += "";
  if(a.match(/\-/)) {
    var e = "-"
  }
  a = a.match(/(\d+)/)[1].length <= 6 ? a.match(/(\d+)?(\d{3})$/) : a.match(/(\d+)?(\d{3})(\d{3})$/);
  a[1] = a[1] ? a[1] = a[1] : a[1] = 0;
  a[2] = a[2] ? "." + a[2] : a[2] = "";
  a[3] = a[3] ? "." + a[3] : a[3] = "";
  return e ? e + a[1] + a[2] + a[3] : a[1] + a[2] + a[3]
}
function q(a) {
  a = document.getElementById("resources_" + a).innerHTML;
  a = a.split(".");
  a = a[2] ? a[0] + a[1] + a[2] : a[0] + a[1];
  return a = parseInt(a)
}
function o(a) {
  var e = q("metal"), g = q("crystal"), d = q("deuterium");
  e = e / f[a][1];
  g = g / f[a][2];
  a = d / f[a][3];
  d = e;
  if(e > g) {
    d = g
  }
  if(g > a && e > a) {
    d = a
  }
  return parseInt(d)
}
;