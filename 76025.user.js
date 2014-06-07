// ==UserScript==
// @name           Auto Advice Control
// @namespace      http://userscripts.org/scripts/show/76025
// @description    Auto aggiornatore 
// @include        http://*.ikariam.*/*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

var ver = "0.2";
var url = top.location.href;
var sec = 1; // Indicare in secondi il tempo di aggiornamento

ScriptUpdater.check(76025, ver);

function ajaxRequest(){
	if(url.split("?")[1] == "action=loginAvatar&function=login"){
		top.location.href = url.split("?")[0]+"?view=city&id="+document.getElementById("advDiplomacy").innerHTML.split("&")[2].split("=")[1].split('"')[0];
	} else {
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			headers: {
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "application/atom+xml,application/xml,text/xml",
				"Cookie": document.cookie
			},
			onload: function(response){
				var adviceNew = response.responseText;
				var adviceOld = document.getElementById("advisors");
				adviceOld.innerHTML = adviceNew.split('<div id="advisors">')[1].split("</div>")[0];
			}
		});
	}
	setTimeout(function(){ajaxRequest();}, sec+"000");
}

ajaxRequest();