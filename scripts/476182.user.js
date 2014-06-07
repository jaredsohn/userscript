//
// ==UserScript==
// @name          distribution_stats
// @description   Distribution of stats
// @include       http://www.heroeswm.ru/home.php
// @include       http://178.248.235.15/home.php

// ==/UserScript==

var xmlHttp = false;
var host = location.host;
var rst = 0;

points = document.body.innerHTML.split("<b>+</b>")[4].split(":</b>")[1];
points = points.substr(0, points.indexOf("<"));

as = document.getElementsByTagName("a");
counter_stat_begin = 0;
counter_stat_end = 0;
tbl = false;
stats_names = ["attack", "defence", "power", "knowledge"];
urls = [];
stats = [];
counts_url = 0;
inc_all = true;
var tbl = false;

for(id_a in as) {
	a = as[id_a].href;
	if (a && a.indexOf("increase") > -1) {
		if (! tbl) {
			tbl = as[id_a].parentNode.parentNode.parentNode;
			inner = "<tr align=center><td colspan=4><table width=100%><tr>";
			inner += "<td style='background-color:#F5F3EA;cursor:pointer;border-radius:4px;border:1px solid #5D413A;padding:3' id=all_a>Всё в <img width=16 title='Нападение' src='http://dcdn.heroeswm.ru/i/s_attack.gif'></td>";
			inner += "<td style='background-color:#F5F3EA;cursor:pointer;border-radius:4px;border:1px solid #5D413A;padding:3' id=all_d>Всё в <img width=16 title='Защита' src='http://dcdn.heroeswm.ru/i/s_defence.gif'></td>";
			inner += "<td style='background-color:#F5F3EA;cursor:pointer;border-radius:4px;border:1px solid #5D413A;padding:3' id=all_p>Всё в <img width=16 title='Сила магии' src='http://dcdn.heroeswm.ru/i/s_power.gif'></td>";
			inner += "</tr></table></td></tr>";
			inner += "<tr><td colspan=4><div id=progress_stats style='border-radius:4px;padding:3px;font-size:10px;background-color:#592C08;color:white'>Прогресс...</div></td></tr>";
//			inner += "<tr><td id=log_stats colspan=4></td></tr>";
			tbl.innerHTML += inner;
		}
		document.getElementById('all_a').onclick = increase_all_a;
		document.getElementById('all_d').onclick = increase_all_d;
		document.getElementById('all_p').onclick = increase_all_p;
		as[id_a].href = "javascript:void(0);";
		stat = a.substr(a.indexOf("=") + 1);
		if (stat == "attack")
			as[id_a].onclick = increase_a;
		else if (stat == "defence")
			as[id_a].onclick = increase_d;
		else if (stat == "power")
			as[id_a].onclick = increase_p;
		else if (stat == "knowledge")
			as[id_a].onclick = increase_k;
	}
}


function startAjax() {
    /*@cc_on @*/
    /*@if (@_jscript_version >= 5)
    try {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e2) {
            xmlHttp = false;
        }
    }
    @end @*/
    if (!xmlHttp && typeof XMLHttpRequest != 'undefined')
        xmlHttp = new XMLHttpRequest();
}

function send(url, afterSend) {
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = afterSend;
    xmlHttp.send(null);
}

function afterSend() {
    rst = xmlHttp.readyState;
    if (xmlHttp.readyState==4) {
        if (xmlHttp.status == 200) {
			counter_stat_end++;
			document.getElementById("progress_stats").style.width = counter_stat_end*100/points + "%";
			document.getElementById("progress_stats").innerHTML = "<b>" + counter_stat_end + "/" + points + "</b>";
			if (counter_stat_end == points)
				location.href = "http://" + host + "/home.php";

            console.log(stats[counter_stat_end-1]);
            n = tbl.rows[stats[counter_stat_end-1]].cells[2].innerHTML;
            n = n.substr(n.indexOf("+") + 1);
            n = n.substr(0, n.indexOf("<"));
            tbl.rows[stats[counter_stat_end-1]].cells[2].innerHTML = "<b style='color:red'>&nbsp;+" + (n/1 + 1) + "</b>";
            m = tbl.rows[4].cells[0].innerHTML;
            m = m.substr(m.lastIndexOf(" ") + 1);
            console.log("m = '" + m + "'");
            tbl.rows[4].cells[0].innerHTML = "<b>Свободных очков от навыка:</b> " + (m/1 - 1);
			rst = 0;
        }
    }
}

function increase_a() {
	increase(0);
}
function increase_d() {
	increase(1);
}
function increase_p() {
	increase(2);
}
function increase_k() {
	increase(3);
}
function increase(stat) {
	url = "http://" + host + "/home.php?increase=" + stats_names[stat];
	if (counter_stat_begin < points) {
	    stats[counter_stat_begin] = stat;
		urls[counter_stat_begin++] = url;
    }
    //alert(n);
}
function increase_all_a() {
    increaseAll(0)
}
function increase_all_d() {
    increaseAll(1)
}
function increase_all_p() {
    increaseAll(2)
}
function increaseAll(stat) {
    if (inc_all)
        for (i = counter_stat_begin; i < points; i++) {
            stats[i] = stat;
            urls[i] = "http://" + host + "/home.php?increase=" + stats_names[stat];
        }
    inc_all = false;
}

function cicle() {
	if (counter_stat_end < urls.length && rst == 0) {
		send(urls[counter_stat_end], afterSend);
		rst = 777;
	}
	if (points > 0)
		setTimeout(cicle, 200);
}

startAjax();
cicle();

