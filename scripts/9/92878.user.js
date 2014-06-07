// ==UserScript==
// @namespace		http://www.wolfiesden.com/greasemonkey/
// @name			Curse Just Download
// @description		Bypasses the authentication crap and puts a straight download link on the download page
// @include			http://wow.curse.com/downloads/wow-addons/details/*
// ==/UserScript==

var Download = document.getElementById("manualDownload").innerHTML;
var Start = Download.indexOf('FlashVars="url=', 0)
if (Start>0){
	Start += 15
	var End = Download.indexOf('&fileId=', Start)
	if (End>0){
		var NewURL = Download.substr(Start,(End-Start));
		var NewButton = '<a class="button button-pop" href="' + NewURL + '"><span>fast download</span></a><br><br>'

		// Puta background on the DIV
		GM_addStyle("#flashMessage { float: left; background: #FDD6AF; }");
		GM_addStyle("#flashMessage li { padding-top: 15px; background: #F7F7F7; }");

		// Write a delay script to put the real link in a download button
		var scriptElement = document.createElement('script');
		scriptElement.type = 'text/javascript';
		scriptElement.innerHTML =  'window.setTimeout("document.getElementById(\'flashMessage\').innerHTML=\\"<br><a class=\'button button-pop\' href=\'' + NewURL + '\'><span>FAST DOWNLOAD</span></a><p><b>Choose this option to skip all the BS and just download the file.<b><br><br><li><div class=dashx>&nbsp;</div></li>\\";",500);';
		document.getElementsByTagName("head")[0].appendChild(scriptElement);
	}
}

