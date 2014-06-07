// ==UserScript==
// @name          4glue
// @description   glue check-in
// @version	  3.0
// @author	  thefamousnomo
// @match         http://*.channel4.com/programmes/*/4od
// @match         http://*.bbc.co.uk/iplayer/episode/*
// @match         http://*.itv.com/itvplayer/video/?Filter=*
// @match         http://*.channel5.com/shows/*/episodes/*
// @match	  http://player.stv.tv/programmes/*
// @match	  http://video.uktv.co.uk/dave/*/*/*
// ==/UserScript==

(function()
{
var scrGlue= document.createElement('script');
scrGlue.type= 'text/javascript';
scrGlue.src= 'http://widgets.getglue.com/checkin.js';
document.body.insertBefore(scrGlue, document.body.firstChild);
var strProg = document.title.toLowerCase();
var strStyle = "left";
if ( (document.location.href).indexOf("iplayer") != -1 ) strProg = strProg.match(/-\s([a-z][^:]*)/)[1];
if ( (document.location.href).indexOf("channel4") != -1 || (document.location.href).indexOf("player.stv.tv") != -1 ) strProg = strProg.substr(0, strProg.search(' - '));
if ( (document.location.href).indexOf("itvplayer") != -1 ) strProg = document.getElementsByTagName("h1")[0].firstChild.data.toLowerCase();
if ( (document.location.href).indexOf("channel5") != -1 ) {
strStyle = "right";
strProg = strProg.match(/\|\s([a-z][^\|:]*)/i)[1];
strProg = strProg.replace(/\s+$/, '');
}
if ( (document.location.href).indexOf("uktv.co.uk/dave") != -1 ) {
strStyle = "right";
strProg = document.getElementsByClassName("title-large")[0].textContent.toLowerCase();
strProg = strProg.replace(/\s+$/, '');
}
var origProg = strProg;
if ( location.hash ) { // override
strProg = location.hash.replace(/^#/, '');
strProg = strProg.replace(/_/g, ' ');
origProg = strProg;
strProg = strProg.replace(/\b(and|the|a)\b/g, '');
strProg = strProg.replace(/(&|,|'|!|\:|\;|\/)/g, '');
strProg = strProg.replace(/\s/g, '_');
strProg = strProg.replace(/^_/, '');
} else { // end override
strProg = strProg.replace(/(&|,|'|!|\:|\;|\/)/g, '');
strProg = strProg.replace(/\b(and|the|a)\b/g, '');
strProg = strProg.replace(/^\s*/, '');
strProg = strProg.replace(/\s+/g, '_');
}
var nodeDiv = document.createElement('div');
nodeDiv.setAttribute('style', strStyle + ' :2px; top:' + screen.height/3 + 'px; position:fixed; z-index: 5000;');
var nodeLink = document.createElement('a');
nodeLink.setAttribute('href', 'http://getglue.com/tv_shows/' + strProg);
nodeLink.setAttribute('class', 'glue-checkin-widget');
nodeLink.setAttribute('data-type', "vertical");
nodeLink.appendChild(document.createTextNode(origProg));
document.body.insertBefore(nodeDiv, document.body.firstChild);
nodeDiv.appendChild(nodeLink);
})()