// ==UserScript==

// @name          Add to Mendeley from google scholar

// @namespace     http://www.example.com

// @description   Adds Mendeley link to google scholar results

// @include       http://scholar.google.com/*

// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==




var linkContainers = jQuery(".gs_rt");

for (i=0; i<linkContainers.length; i++)

{

var url=linkContainers[i].getElementsByTagName("a")[0].getAttribute("href");
var mendeleyURL='http://www.mendeley.com/import/bookmarklet/?url='+url;
var mendeleyLinkHTML='<a target="_blank" href="'+mendeleyURL+'"> [Mendeley]</a>';
$(mendeleyLinkHTML).appendTo(linkContainers[i].getElementsByTagName("a")[0]);


}