// ==UserScript==
// @name	   lalala
// @namespace	   aiwts
// @version	1.0.1
// @include		http://trophymanager.com/players/*
// @include		http://*.trophymanager.com/players/*
// @exclude		http://trophymanager.com/players
// @exclude		http://*.trophymanager.com/players
// @exclude		http://trophymanager.com/players/
// @exclude		http://*.trophymanager.com/players/
// @exclude		http://trophymanager.com/players/#*
// @exclude		http://*.trophymanager.com/players/#*
// ==/UserScript==

var pageHead = document.getElementsByTagName('head')[0];

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = 'var hiddenSkills = document.getElementById("hidden_skill_table").getElementsByTagName("td"); for (var i = 0; i < hiddenSkills.length; i++) { var frac = hiddenSkills[i].getAttribute("tooltip"); if (frac != null) { frac = frac.substring(frac.indexOf("g>")+2); frac = frac.substring(0, frac.indexOf("/")); if (frac.length == 1) { hiddenSkills[i].innerHTML += "&nbsp;&nbsp;"; } hiddenSkills[i].innerHTML += "&nbsp;" + frac;}}';
pageHead.appendChild(script);