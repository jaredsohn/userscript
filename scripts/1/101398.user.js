// ==UserScript==
// @name              animatedHQ tidy up
// @namespace   http://userscripts.org/users/304720
// @description    cleans up the HQ series of websites such as familyguyhq and americandadhq, removes their adverts and shoutbox
// @include           http://www.familyguyhq.com/
// @include           http://www.familyguyhq.com/*
// @include           http://www.americandadhq.com/
// @include           http://www.americandadhq.com/*
// @include           http://www.theclevelandshowhq.com/
// @include           http://www.theclevelandshowhq.com/*
// @include           http://www.southparka.com/
// @include           http://www.southparka.com/*
// @include           http://www.drawntogetherx.com/
// @include           http://www.drawntogetherx.com/*
// @include           http://www.futuramahq.com/
// @include           http://www.futuramahq.com/*
// ==/UserScript==


// REMOVING ADVERTS \\
//remove the adverts at the top & bottom of the page.
document.getElementById("bottom_ads").style.display = "none";
document.getElementById("mid_ads").innerHTML = "";

//remove adverts from the side of the page.
document.getElementById("side").getElementsByTagName('div')[1].style.display = "none";
document.getElementById("side").getElementsByTagName('div')[2].style.display = "none";
document.getElementById("side").getElementsByTagName('div')[3].style.display = "none";

//remvove all the other adverts on the page
var ilength = document.getElementById("content").getElementsByTagName('iframe').length;
for (i=0;i<ilength;i++) {
document.getElementById("content").getElementsByTagName('iframe')[i].style.display = "none";
}

//fixes
if (document.getElementById("menu").getElementsByTagName('li')[1].getElementsByTagName('a')[0].firstChild.nodeValue == "The Cleveland Show Episodes"||"Futurama Episodes") {
document.getElementById("side").getElementsByTagName('h1')[0].style.display = "none";
}

// PAGE TWEAKS \\
//remove the shoutbox from the side of the page.
document.getElementById("shout").innerHTML = "";
document.getElementById("side").getElementsByTagName('div')[10].style.display = "none";
document.getElementById("side").getElementsByTagName('a')[13].innerHTML = "";