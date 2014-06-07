// ==UserScript==
// @name           Etisalat Deviantart Fix
// @namespace      http://haden-pereira.blogspot.com
// @description    Fix Etisalat blocking stylesheets and images from deviantart.net
// @include        *.deviantart.com/*
// ==/UserScript==




var links = document.evaluate("//*[contains(@href,'deviantart.net')]", document, null, 6, null);
for(var i=links.snapshotLength-1; i>=0; i--) {
links.snapshotItem(i).href = links.snapshotItem(i).href.replace(".net",".com");

}

for (i=0; i < document.images.length; i++)
{
document.images[i].src = document.images[i].src.replace(".net",".com");
}


