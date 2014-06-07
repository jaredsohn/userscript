// ==UserScript==
// @name        bq
// @namespace   BQ
// @description boke quest auto sum
// @include     http://general.mods.jp/cgi-bin/bokequest/vote.cgi?*
// @version     1.0.5
// ==/UserScript==



//------------------勝敗数表示(0:しない / 1:する)-----------------

wl = 1;

//----------------------------------------------------------------



//--------------------色の設定（デフォルト色）--------------------

bg1 = "#ff99ff"; // チーム背景色1（赤）
bg2 = "#66ccff"; // チーム背景色2（青）
bg3 = "#99cc00"; // チーム背景色3（緑）
bg4 = "#ffff99"; // チーム背景色4（黄）
txt = "#000000"; // 名前、チーム名（黒）

//----------------------------------------------------------------





bg = new Array(bg1, bg2, bg3, bg4);function getRankTable() {var url = location.href;if(url.match(/(\d+)(\D*)$/)) {var prev = RegExp.leftContext + String(Number(RegExp.$1) - 1);var next = RegExp.leftContext + String(Number(RegExp.$1) + 1);}var ranking = "<a href='#ranking' style='color:#ffff00;'>[順位表]</a>";var top = "<a href='#top' style='color:#ffff00;'>[↑]</a>";var tprev = "<a href='" + prev + "' style='color:#ffff00;'>[←]</a>";var tnext = "<a href='" + next + "' style='color:#ffff00;'>[→]</a>";var rprev = "<a href='" + prev + "#ranking' style='color:#ffff00;'>[←]</a>";var rnext = "<a href='" + next + "#ranking' style='color:#ffff00;'>[→]</a>";for(var i=0; i<document.getElementsByTagName("table").length; i++) {var table = document.getElementsByTagName("table").item(i);var tbody = table.getElementsByTagName("tbody").item(0);var tr = tbody.getElementsByTagName("tr").item(0);var td = tr.getElementsByTagName("td").item(0);if(i == 0) {table.id = "top";td.innerHTML += "　" + tprev + "　" + ranking + "　" + tnext;}if(td.innerHTML.match("途中経過")) {table.id = "ranking";td.innerHTML += "　" + rprev + "　" + top + "　" + rnext;return i;}}}function getMember() {var rep = document.getElementsByTagName("table").item(0).getElementsByTagName("tr").item(3).getElementsByTagName("td").item(0).childNodes[0].childNodes[0].innerHTML;rep = rep.replace(/(<br>)+/g,"\n");if(wl) {rep = rep.replace(/(^[☆★♪]| ）|はお休みです。)/mg,"");} else {rep = rep.replace(/(^[☆★♪].勝.敗　| ）|はお休みです。)/mg,"");}rep = rep.replace(/（ /g,"、");rep = rep.replace("コパン君ＪＰ","コパン君、JP");rep = rep.replace("牛肉かしらSABAI","牛肉かしら、SABAI");rep = rep.replace("きらめき⇔アプローチ　～太陽のマーチ～","きらめき⇔アプローチ");rep = rep.replace("ときめき⇔アプローチ　～月のセレナーデ～","ときめき⇔アプローチ");rep = rep.replace("田端KORO","田端ＫＯＲＯ");rep = rep.replace("アド街見ました","チームミミック代行");rep = rep.replace("髏々宮カルタ","天枷美春");rep = rep.replace("十五万","十五万石");rep = rep.replace("ヒヨコの生き甲斐 ","ヒヨコの生き甲斐");var team = new Array();var member = new Array();var i = 0;team = rep.split("\n");while(team[i]) {member[i] = new Array();member[i] = team[i].split("、");i++;}return member;}function getPoint(rtn, member) {var tpoint = new Array(0, 0, 0, 0);var table = document.getElementsByTagName("table").item(rtn);var tbody = table.getElementsByTagName("tbody").item(0);var tr = tbody.getElementsByTagName("tr");for(var i = 2; i <= 17; i++) {td = tr.item(i).getElementsByTagName("td");var pt = td.item(1).childNodes[0].innerHTML;pt = parseInt(pt);var name = td.item(2).childNodes[0];if(name.innerHTML.substr(0, 3) == " <a") {name = name.childNodes[1].innerHTML;} else {name = name.innerHTML;name = name.slice(1);}for(var j = 0; j < 4; j++) {for(var k = 1; k < 5; k++) {if(name == member[j][k]) {tpoint[j] += pt;td.item(0).style.backgroundColor = bg[j];td.item(1).style.backgroundColor = bg[j];td.item(2).style.backgroundColor = bg[j];td.item(2).style.color = txt;break;}}if(k < 5) {break;}}}var head = new Array("チーム合計", "チーム名");for(i = 0; i < 5; i++) {row = table.insertRow(-1);if(!i || i == 1 || i == 3) {row.style.borderTop = "solid 3px black";}if(!i) {row.className = "TR2";row.style.fontSize = 12;for(j = 0; j < 2; j++) {var center = document.createElement("center");cell = row.insertCell(-1);if(!j) {cell.colSpan = 2;}center.innerHTML = head[j];cell.appendChild(center);}} else {for(j = 0; j < 2; j++) {var center = document.createElement("center");cell = row.insertCell(-1);if(!j) {cell.colSpan = 2;center.innerHTML = tpoint[i-1];if(i % 2) {if(tpoint[i-1] < tpoint[i]) {center.className = "NUMBER2";} else {center.className = "NUMBER1";}} else {if(tpoint[i-1] < tpoint[i-2]) {center.className = "NUMBER2";} else {center.className = "NUMBER1";}}} else {center.innerHTML = member[i-1][0];cell.style.color = txt;if(i % 2) {if(tpoint[i-1] >= tpoint[i]) {center.className = "CELL5";}} else {if(tpoint[i-1] >= tpoint[i-2]) {center.className = "CELL5";}}}cell.style.backgroundColor = bg[i-1];cell.appendChild(center);}}}}(function(){var rtn = getRankTable();var member = getMember();getPoint(rtn, member);})();
