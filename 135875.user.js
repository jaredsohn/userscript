// ==UserScript==
// @name        bog
// @namespace   BOG
// @description bokeome promotion check
// @include     http://2.pro.tok2.com/~reflection/league*/vote.cgi*
// @include     http://2.pro.tok2.com/%7Ereflection/league*/vote.cgi*
// @version     1
// ==/UserScript==





//----------------------------色の設定----------------------------

bg1 = "#ff99ff"; // 赤
bg2 = "#99cc00"; // 緑
bg3 = "#66ccff"; // 青

//----------------------------------------------------------------





bg = new Array(bg1, bg2, bg3);function getRankTable() {var ranking = "<a href='#ranking' style='color:#ffff00;'>[順位表]</a>";var top = "<a href='#top' style='color:#ffff00;'>[↑]</a>";for(var i=0; i<document.getElementsByTagName("table").length; i++) {var table = document.getElementsByTagName("table").item(i);var tbody = table.getElementsByTagName("tbody").item(0);var tr = tbody.getElementsByTagName("tr").item(0);var td = tr.getElementsByTagName("td").item(0);if(i == 0) {table.id = "top";td.childNodes[0].innerHTML += "　" + ranking;}if(td.innerHTML.match("人が投票した時点での順位")) {table.id = "ranking";td.innerHTML += "　" + top;return i;}}}function getLeague() {var url = location.href;if(url.match(/(league)(\d)/)) {return RegExp.$2;} else {return 1;}}function checkPromotion(rtn, league) {var aff = new Array();var r = 1;var t = 1;var table = document.getElementsByTagName("table").item(rtn);var tbody = table.getElementsByTagName("tbody").item(0);if(league == 4) {var p = 1;var s = 10;} else if(league == 1) {var p = 10;var s = 20;} else if(league == 0) {var p = Math.floor((tbody.getElementsByTagName("tr").length - 2) * 0.4);var s = p;} else {var p = 5;var s = 15;}for(var i=2; i<tbody.getElementsByTagName("tr").length; i++) {var tr = tbody.getElementsByTagName("tr").item(i);var point = tr.getElementsByTagName("td").item(1).childNodes[0].innerHTML;var name = tr.getElementsByTagName("td").item(5).childNodes[0].innerHTML;if(aff.length == 0) {aff.push(name);tr.style.backgroundColor = bg[0];var prev = point;} else {for(var j=0; j<aff.length; j++) {if(name == aff[j]) {break;}if(j == aff.length-1) {aff.push(name);if(point == prev) {t++;} else {r += t;t = 1;}if(r <= p) {tr.style.backgroundColor = bg[0];} else if(r <= s) {tr.style.backgroundColor = bg[1];} else {tr.style.backgroundColor = bg[2];}prev = point;}}}}}(function(){var rtn = getRankTable();var league = getLeague();checkPromotion(rtn, league);})();