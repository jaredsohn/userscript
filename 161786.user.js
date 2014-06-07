// ==UserScript==
// @name           WCA Zulu Clock (AMPM)
// @namespace  http://www.facebook.com/profile.php?id=100002657060862
// @version    0.1
// @description  modified a scrip by DrNick & xxTOBYxx for purpose of seeing zulu time on most web pages so we can coordinate attacks on War Commander. 
// @originally based on a script called Super Clock at http://userscripts.org/scripts/source/137093
// @copyright  2013, Bryan Ironman, WCA Secretary
// @include        https://mail.google.com/*
// @include        https://plus.google.com/*
// @include        http://www.facebook.com/*
// @include        https://twitter.com/*
// @include        https://mail.opera.com/m/#!/Inbox
// @include        https://www.google.com/*
// @include        http://www.bing.com/*
// @include        http://search.mywebsearch.com/mywebsearch/*
// @include        http://home.mywebsearch.com/*
// @include        http://www.altavista.com/*
// @include        http://us.yhs4.search.yahoo.com/yhs/*
// @include        http://forum.yugiohcardmaker.net/*
// @include        http://www.yugiohcardmaker.net/
// @include        http://www.pokecharms.com/*
// @include        http://www.pokestadium.com/pokemon/trainercard/*
// @include        http://maps.google.com/*
// @include        http://translate.google.com/*
// @include        http://books.google.com/*
// @include        http://www.mozilla.org/en-US/*
// @include        http://userscripts.org/users/*
// @include        http://duckduckgo.com/*
// @include        http://www.king.com/*
// @include        http://search.yahoo.com/*
// @include        http://software.emule.com/*
// @include        http://eu.ask.com/*
// @include        http://espn.go.com/*
// @include        http://apps.facebook.com/* 
// @include        http://userscripts.org/scripts/show/*
// @include        http://userscripts.org/*
// @include        http://www.greasespot.net/*
// @include        http://wiki.greasespot.net/*
// @include        http://en.wikipedia.org/wiki/*
// @include        http://forum.tampermonkey.net/*
// @include        http://www.answers.com/*
// @include        http://wiki.answers.com/*
// @include        http://www.wwe.com/*
// @include        http://www.addictinggames.com/*
// @include        http://armorgames.com/*
// @include        http://www.sheppardsoftware.com/*
// @include        http://us.mg204.mail.yahoo.com/*
// @include        http://www.wikipedia.org/*
// @include        http://www.1channel.ch/*
// @include        http://postimage.org/*
// @include        https://en.gravatar.com/*
// @include        http://bl149w.blu149.mail.live.com/mail/*
// @include        http://i.maxthon.com/*
// @include        http://start.palemoon.org/* 
// @include        http://www.palemoon.org/*
// @include        http://search.babylon.com/*
// @include        http://www.ask.com/*
// @include        http://www.maxthon.com/*
// @include        http://www.kongregate.com/*
// @include        http://www.facebook.com/search/*
// @include        https://www.facebook.com/*
// @include        http://kixeye.com/*
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// ==/UserScript==

if (window.top != window.self) return;

var box = document.createElement("div");
box.setAttribute("style", "bottom: 0; color:#fa7d0f; font-family:sans-serif; font-size:14pt; left:0; line-height:20px; position:fixed; text-align:center; z-index:999;");

document.body.appendChild(box);

function tick()
{
	var d = new Date();
	var h = d.getUTCHours();
	var m = zero_pad(d.getUTCMinutes());
	
	if (h >= 12) ampm = "PM"
	if (h < 12) ampm = "AM"
	if (h > 12) h = h - "12"
	
	box.innerHTML = h + ":" + m + " " + ampm;
}

/* Add a leading zero if required. */
function zero_pad(number) {
    if (number >= 0 && number < 10) {
        return "0" + number;
    }
    return number;
}

tick();
setInterval(tick, 5000);