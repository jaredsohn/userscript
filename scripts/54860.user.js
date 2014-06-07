// ==UserScript==
// @name          Test2
// @fullname      Test
// @author        Mates
// @include       http://*travian*
// ==/UserScript==


var s = readCookie('s');
if (s == '1') {
      var l = readCookie('l');
      var pocet_vesnic = readCookie('pocet_vesnic');
      if (l == pocet_vesnic) {var n = '0'; l = '0'; createCookie('l',l,7);}
      else {l++; createCookie('l',l,7);}

      var vesnice = new Array();
      var i = 0;
      for (i=0;i<=pocet_vesnic;i++) {
      vesnice[i] = readCookie('vesnice'+i);
      }

      random_time = new Array("2500", "2700", "2850", "3000", "3115", "3350", "3520", "3970", "4170", "4340", "4520", "4790", "5030");
      x = Math.round(Math.random()*12);
      var t = window.setTimeout(redirect, random_time[x]);
 }

function redirect() {
if (n == '1') {window.location.href = vesnice[pocet_vesnic-1];}
else {window.location.href = vesnice[l-1]; if (l == pocet_vesnic) {var n = '0'; l = '0'; createCookie('l',l,7);}}
}

var vlist = document.getElementById('vlist');
var link_td = vlist.getElementsByClassName("link");
var link = new Array();

var vl = document.getElementById('vlist').innerHTML;
var nazev = new Array();
var pattern = />([^<]*)<\/a>/gi;
var c = 0;
while ( _match =pattern.exec(vl)){nazev[c] = _match[1]; c++;   }


var table = "<table><tr><td><a id='start' href='#'>Start</a></td><td><a id='stop' href='#'>Stop</td></tr><tr><td colspan='2'><a id='vynechat' href='#'>Přidat do seznamu <input class='text' type='text' name='vynechat'></td></tr></table>";

var side_info = document.getElementById('side_info').innerHTML;
document.getElementById('side_info').innerHTML = side_info + table;

document.getElementById('start').addEventListener("click", start, true);
document.getElementById('stop').addEventListener("click", stop, true);
document.getElementById('vynechat').addEventListener("click", stop, true);

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function stop() {
       eraseCookie('s');
       }

function start() {
       var pocet_vesnic = link_td.length;
       createCookie('pocet_vesnic',pocet_vesnic,7);
       createCookie('s','1',7);
       createCookie('l','0',7);
       for (var a = 0; a < link_td.length; a++) {
               var link = link_td[a].getElementsByTagName("a");
               createCookie('vesnice'+a,link[0],7);
       }
       var vesnice0 = readCookie('vesnice0');
       window.location.href = vesnice0;
}



