var metadata=<> 
// ==UserScript==
// @name           Generäle Highscore
// @namespace      http://userscripts.org/scripts/show/94459
// @include        http://s*.ikariam.com/index.php*
// @exclude        http://support*.ikariam.*/*
// @author         Karandaras (http://userscripts.org/users/265255)
// @require        http://userscripts.org/scripts/source/94511.user.js
// @version        1.0
// @updater:script http://userscripts.org/scripts/source/94459.user.js
// @updater:delay  86400000
// ==/UserScript==
</>.toString();

var languages = {
	de: {
		"army": "Generäle",
	}
};

var href = document.location.href;
var lang = getLanguage(href);

// Update-Check
var update = new Updater(metadata,lang);
update.update();

var language = languages[lang];
if(language == null)
	language = languages['de'];

function getLanguage(href) {
	var language = href.replace(/........\d+.(\w+).*/,"$1");
	return language ;
}

var info = document.getElementById('information');
if(info) {
	var lis = info.getElementsByTagName('li');
	for(var i=0; i<lis.length; i++) {
		if(lis[i].getAttribute('class') == 'owner')
			lis[i].innerHTML += "<a href='index.php?view=highscore&highscoreType=army_score_main&searchUser="+lis[i].innerHTML.substring(lis[i].innerHTML.lastIndexOf(">")+1)+"' target=highscore><img src='data:image/gif;base64,R0lGODlhEAAQAMoAAP///wAAAICAgICAAP//AMDAwAAAAAAAACH5BAEAAAAALAAAAAAQABAAAANFCLrcGiK4F5UgtYWCXxGZB0pito3aF0Gos7EQOcGhNsTx7RIDCA4E2SIQ4BGBRI3gFiwGejLI4EasTjNTnW36SM68k3ACADs%3D' style='float:right' title='"+language["army"]+"'></a>";
	}
}
