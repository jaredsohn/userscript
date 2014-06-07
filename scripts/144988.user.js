// ==UserScript==
// @name        supremacy1914.de votebot
// @namespace   de.supremacy1914.votebot
// @include     http://www.supremacy1914.de/index.php?id=156&L=1
// @include     http://www.kostenlose-browsergames.de/*
// @include     http://www.xtremetop100.com/*
// @include     http://www.gamesites200.com/*
// @include     http://mmorpg.top100arena.com/*
// @include     http://browsermmorpg.com/*
// @include     http://www.browsergamer.de/*
// @include     http://www.oglabs.de/*
// @include     http://rpg.najlepsze.net/*
// @include     http://mmorpg.toplista.pl/*
// @include     http://rpgtextowe.topka.pl/*
// @include     http://www.bbogd.com/*
// @include     http://topg.org/*
// @include     http://browsermmorpg.net/*
// @include     http://www.topgamesites.net/*
// @include     http://www.gamessphere.de/*
// @include     http://www.omgspider.com/*
// @include     http://mgpoll.com/*
// @include     http://topofgames.com/*
// @include     http://www.top100arena.com/*
// @include     http://bgs.gdynamite.de/*
// @include     http://www.gtop100.com/*
// @version     3
// @require http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

var mywindow = (typeof (unsafeWindow) === 'undefined') ? window : unsafeWindow;
var $ = $jq = jQuery.noConflict();
mywindow.$jq = mywindow.jQuery = $jq;
mywindow.alert=function(){return false;}
try {
	$jq(document).ready(function () {
		if (window.location.host == "www.supremacy1914.de"){
			window.setInterval("$jq('[id^=sg_voted_] a:last').click()", 20*1000)
		} else {
			window.setTimeout('window.close()',15*1000)
		} 
	});
	
} catch(e){
	console.error(e)
}
