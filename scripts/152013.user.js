// ==UserScript==
// @name           Omerta Bagis Göstergesi
// @author         Proud
// @namespace      gen.tr
// @description    Oyunu kolaylastiran bir bagisci banneri
// @include        http://*.barafranca.*/game.php
// @include        http://barafranca.*/game.php
// ==/UserScript==

var DB = {
  timers: {crime: 0, car: 0, flight: 0, bullet: 0},
  status: {position: '#0', points: '0', cash: '$0', bullets: '0'},
  progbars: {rp: 0, life: 0, bs: 0, bgs: 0},
  loadStatus: {lastStatus: 0, lastPage: rand(6, 12)}
};

//topbanner frame load
window.frames[0].addEventListener("DOMContentLoaded", function () {
  //banner frame load
  var mid = bannerGet();
  mid.addEventListener("DOMContentLoaded", function () {
    //it's not d+
    if (!mid.timers) {
      window.document.getElementsByTagName("frame")[2].addEventListener("load", function () {
        DB.loadStatus.lastPage = rand(10, 20);
        var main = window.frames[2];
        if (main.location.pathname+main.location.search == '/BeO/webroot/index.php?module=Launchpad') {
          var div = main.document.getElementById("smsdivcontainer");
          var divChanged = function () {
            if (String(div.innerHTML).length > 1000) {
              div.removeEventListener("DOMSubtreeModified", divChanged, true);
              unsafeWindow.setTimeout(function () { statusParse(div.innerHTML); }, 100);
            }
          }
          div.addEventListener("DOMSubtreeModified", divChanged, true);
        }
      }, true);
      bannerUpdate();
      timersStart();
    }
  }, false);
}, false);

function bannerGet() {
  return window.frames[0].frames[1].wrappedJSObject;
}

function bannerGetTable(mid) {
  return mid.document.getElementsByTagName("tbody")[1];
}

function bannerLoad(mid) {
  bannerParse(mid);
  bannerGetTable(mid).innerHTML = '<tr>\n\
<td align="left" class="name" valign="top" nowrap="nowrap"><b>P</b>ozisyon:</td>\n\
<td nowrap="nowrap" align="right" id="position"></td>\n\
<td nowrap="nowrap" align="left" class="name"><a href="./BeO/webroot/index.php?module=Crimes" target="main"><b>S</b>uc:</a></td>\n\
<td nowrap="nowrap" align="right" id="crime" width="40"> </td>\n\
<td nowrap="nowrap" align="left" class="name"><b>R</b>ank ilerlemesi:</td>\n\
<td nowrap="nowrap" align="right"><dl class="progress"><dd><span id="pg_rp"> </span></dd><dt id="rp"></dt></dl></td>\n\
</tr>\n\
<tr>\n\
<td nowrap="nowrap" align="left" class="name"><b>P</b>uanlar:</td>\n\
<td nowrap="nowrap" align="right" id="points"></td>\n\
<td nowrap="nowrap" align="left" class="name"><a href="./BeO/webroot/index.php?module=Cars" target="main"><b>A</b>rac calma:</a></td>\n\
<td nowrap="nowrap" align="right" id="car" width="40"> </td>\n\
<td nowrap="nowrap" align="left" class="name"><b>S</b>aglik:</td>\n\
<td nowrap="nowrap" align="right"><dl class="progress"><dd><span id="pg_life"> </span></dd><dt id="life"></dt></dl></td>\n\
</tr>\n\
<tr>\n\
<td nowrap="nowrap" align="left" class="name"><b>P</b>ara:</td>\n\
<td nowrap="nowrap" align="right"><a href="./bank.php" target="main" id="cash"></a></td>\n\
<td nowrap="nowrap" align="left" class="name"><a href="./BeO/webroot/index.php?module=Travel" target="main"><b>S</b>eyahat:</a></td>\n\
<td nowrap="nowrap" align="right" id="flight" width="40"> </td>\n\
<td nowrap="nowrap" align="left" class="name"><b>H</b>apis becerisi:</td>\n\
<td nowrap="nowrap" align="right"><dl class="progress"><dd><span id="pg_bs"> </dd><dt id="bs"></dt></dl></td>\n\
</tr>\n\
<tr>\n\
<td nowrap="nowrap" align="left" class="name"><b>M</b>ermiler:</td>\n\
<td nowrap="nowrap" align="right" id="bullets"></td>\n\
<td nowrap="nowrap" align="left" class="name"><a href="./bullets2.php" target="main"><b>M</b>ermiler (al):</a></td>\n\
\n\
<td nowrap="nowrap" align="right" id="bullet" width="40"> </td>\n\
<td nowrap="nowrap" align="left" class="name"><b>Y</b>aris becerisi:</td>\n\
<td nowrap="nowrap" align="right"><dl class="progress"><dd><span id="pg_bgs"> </span></dd><dt id="bgs"></dt></dl></td>\n\
</tr>';
  mid.timers = DB.timers;
}

function bannerParse(mid) {
  var x = bannerGetTable(mid).getElementsByTagName('td');
  DB.status.position = x[1].innerHTML;
	DB.status.points = x[4].innerHTML;
}

function bannerUpdate(mid) {
  if (mid == undefined) mid = bannerGet();
  if (!mid.timers) bannerLoad(mid);
  for (var i in DB.timers) mid.document.getElementById(i).innerHTML = DB.timers[i] <= 0 ? 'Simdi' : DB.timers[i] + 'S';
  for (var i in DB.status) mid.document.getElementById(i).innerHTML = DB.status[i];
  for (var i in DB.progbars) {
    mid.document.getElementById(i).innerHTML = DB.progbars[i]+"%";
    mid.document.getElementById('pg_'+i).style.width = DB.progbars[i];
  }
}

function rand(min, max) { 
  return Math.round(Math.random() * (max - min) + min);
}

function statusLoad() {
  DB.loadStatus.lastStatus = Infinity;
  GM_xmlhttpRequest({
    method: "GET",
    url: "/information.php",
    onload: function(response) {
      var body = window.document.createElement("body");
      body.innerHTML = response.responseText;
      statusParse(body.innerHTML);
      delete(body);
    }
  });
}

function statusParse(str) {
  DB.loadStatus.lastStatus = rand(50, 70);
  //timers
  var timers = {}
  var regs = str.match(/Timer\("[^"]+"\);[\r\n\s]+oTimer.setTime\(\d+\);/g);
  for (var i in regs) {
    var regs2 = regs[i].match(/Timer\("([^"]+)"\);[\r\n\s]+oTimer.setTime\((\d+)\);/);
    timers[regs2[1]] = regs2[2];
  }
  if (timers['nc']) DB.timers.crime = timers['nc'];
  if (timers['nca']) DB.timers.car = timers['nca'];
  if (timers['nf']) DB.timers.flight = timers['nf'];
  if (timers['nbd']) DB.timers.bullet = timers['nbd'];
  //cash
  if (regs = str.match('<td>\\\$ ?(.*)<')) DB.status.cash = '$'+regs[1]
  //progress bars
  if (regs = str.match(/>([\d\.]+)%</g)) {
    DB.progbars.rp = regs[0].replace(/[^\d\.]/g, '');
    DB.progbars.life = regs[1].replace(/[^\d\.]/g, '');
    DB.progbars.bs = regs[2].replace(/[^\d\.]/g, '');
    DB.progbars.bgs = regs[3].replace(/[^\d\.]/g, '');
  }
  //bullets
  var regs = str.match(/<tbody(?:[^](?!tbody))+.+<\/tbody>/img);
  if (regs && regs[8]) {
    var regs = regs[8].match(/<tr([^](?!(<\/tr>)))*.<\/tr>/img);
    if (regs && regs[3]) {
      var regs = regs[3].match(/<td(?:[^](?!td))+.+<\/td>/img);
      if (regs) DB.status.bullets = regs[1].replace(/[^\d,]+/g, '');
      // else alert("3");
    }
    // else alert("2");
  }
  // else alert("1");
  bannerUpdate();
}

function timersStart() {
  unsafeWindow.setInterval(timersUpdate, 1000);
}

function timersUpdate() {
  bannerUpdate();
  for (var i in DB.timers) DB.timers[i]--;
  if (--DB.loadStatus.lastStatus <= 0 && --DB.loadStatus.lastPage == 0) statusLoad();
}