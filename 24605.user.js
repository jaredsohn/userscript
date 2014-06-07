// ==UserScript==
// @name           Fark New Stories
// @namespace      http://www.fark.com
// @description    Marks new stories since the last time you looked at the fark main page.
// @include        http://www.fark.com/
// @include        http://www.fark.com/geek/
// @include        http://www.fark.com/business/
// @include        http://www.fark.com/sports/
// @include        http://www.fark.com/showbiz/
// @include        http://www.fark.com/politics/
// @include        http://www.fark.com/video/
// @include        http://www.fark.com/LinkVote.html
// @include        http://www.blender.com/fark/
// ==/UserScript==

function removeSpecial(foo) {
    return foo.replace(/[^a-zA-Z0-9]+/g,'');
}

function getElementsByClassName (className) {
  var all = document.all ? document.all :
    document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}

// Get the last viewed headline
var lastHeadline = GM_getValue("lastHeadline" + location.href, "It's not news, it's fark.com!");

// Get all stories currently on the main page....
var allHeadlines = getElementsByClassName("headline", document);

GM_log("Last headline: [" + lastHeadline + "]");

// Loop through all headlines, embolden the new ones.
for(i=0; (i < allHeadlines.length) && (removeSpecial(allHeadlines[i].innerHTML) != lastHeadline); i++){
	  GM_log("Headline: ["+ removeSpecial(allHeadlines[i].innerHTML) +"] is new.");
    allHeadlines[i].style.fontWeight = 'bold';
    allHeadlines[i].style.color = 'green';
}

// Set lastHeadline for next time
var newStr = removeSpecial(allHeadlines[0].innerHTML);
GM_setValue("lastHeadline" + location.href, newStr);