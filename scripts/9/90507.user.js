// ==UserScript==
// @name           Play & Download All ZooTube Videos by DemianGod (Including Premium Links!!!)
// @namespace      petsex.com
// @include        http://*www.petsex.com/*
// ==/UserScript==

unsafeWindow.pop = function(url){newwin=window.open(url,'vid','height=509,width=640,location=1,resizable=1');};

var il = document.evaluate('//div[contains(@class,"aVideo")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var i = il.iterateNext();
var vids = new Array();
while (i) {
ni = il.iterateNext(); vids.push(i); i = ni;
}

for (var i = 0; i < vids.length; i++)
{
    var curVid = vids[i];
	var imgtag = curVid.getElementsByTagName('img');
    var imSrc = imgtag[0].getAttribute('src').replace(/^http:\/\/[^\/]+\/(.+)\/([^\/]+)\/[^\/]+$/,"http://83.221.152.21/$1/$2/$2.flv");
    var newA = document.createElement('a');
	var newS = document.createElement('br');
	var newB = document.createElement('a');
	var temphref = 'http://www.petsex.com/swf/player.swf?styleURL=/swf/player-style-a.css&content_video=';
	var temphref2 = '&detectFlash=8';
	var link = temphref + imSrc + temphref2;
    newA.href= "javascript:pop('"+link+"')";
    newA.appendChild(document.createTextNode("Play By DemianGod"));
    curVid.appendChild(newA); 
	newS.appendChild(document.createTextNode("br"));
	curVid.appendChild(newS); 
	newB.href = imSrc;
    newB.appendChild(document.createTextNode("Download By DemianGod"));
    curVid.appendChild(newB); 
