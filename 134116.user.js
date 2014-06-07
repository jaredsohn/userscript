var fileMETA = <><![CDATA[
// ==UserScript==
// @name         Test
// @namespace    http://userscripts.org/scripts/source/134116.user.js
// @description  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
// @version      1.0 Erste Version
// ==/UserScript==
]]></>.toString();

//Version-History
// @version      1.0 Erste Version

//Edit the Script ID (necessary for Auto-Updater)
var scriptid = '134116';

//jQuery
GM_xmlhttpRequest({method:'GET',url:unescape('http://greasemonkey.website.org/jquery.min.js'),onload:function(jquery){start(jquery.responseText)}});

//Script
function start(jquery){
	//jQuery Initialisierung
	eval(jquery);
	
	//Updater
	var ver = $.trim(fileMETA.split('@version')[1]).split(' ')[0];
	function updater(){GM_xmlhttpRequest({method:'GET',url:unescape('http://greasemonkey.website.org/gm-updater-2.1.2.php?id='+scriptid+'&version='+ver),onload:function(update){eval(update.responseText);}})}window.setInterval(updater, 5*60*1000);
	updater();
	
	//////////////////
	//Script
	//////////////////
	
	
	
	//////////////////
	//Script
	//////////////////
};