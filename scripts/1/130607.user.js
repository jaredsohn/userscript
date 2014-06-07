// ==UserScript==
// @name			Userscripts.org Stats Tracker
// @version			v4
// @namespace		marnick.leau@skynet.be
// @description		Tracks and reports about the statistics of your scripts.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/faziri.png
// @include			http://userscripts.org/home/scripts
// @grant			GM_setValue
// @grant			GM_getValue
// ==/UserScript==

var scripts = {};
var oldscripts = JSON.parse(GM_getValue("scripts",JSON.stringify(scripts)));

var scriptrows = document.getElementById('main').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
var script,id,posts,fans,installs,nposts,nfans,ninstalls;
var stats = "";
for (var sr = 1;sr < scriptrows.length;sr++) {
	script = {};
	script.id = scriptrows[sr].id.replace("scripts-","");
	script.posts = scriptrows[sr].getElementsByClassName('inv lp')[2].innerHTML;
	script.fans = scriptrows[sr].getElementsByClassName('inv lp')[3].innerHTML;
	script.installs = scriptrows[sr].getElementsByClassName('inv lp')[4].innerHTML;
	
	if (oldscripts[script.id] === undefined) {
		oldscripts[script.id] = script;
	}
	
	for (var i in script) {
		if (i !== "id" && script[i] - oldscripts[script.id][i] !== 0) {
			if (stats.indexOf("<noscript>" + script.id + "</noscript>") === -1) {
				stats += "<br><noscript>" + script.id + "</noscript>" + scriptrows[sr].getElementsByTagName('a')[0].innerHTML + ":";
			}
			stats += "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + (script[i] - oldscripts[script.id][i]) + " new " + i;
		}
	}
	
	scripts[script.id] = script;
}

GM_setValue("scripts",JSON.stringify(scripts));

if (stats === "") {
	stats = "No changes to any stats!";
}

var ul = document.getElementsByTagName('ul')[2];
var statsbox = ul.getElementsByTagName('li')[0].cloneNode(false);
statsbox.innerHTML = "<span style=\"font-size: x-small; text-align: right;\">" + stats + "</span>";
ul.appendChild(statsbox);