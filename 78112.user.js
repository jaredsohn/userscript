// ==UserScript==
// @name           my 4chan anti RATE ME spam
// @namespace      ee
// @description    removes spam in RATE ME threads
// Author: ee
// @include        *4chan.org*
// @include        http://img.4chan.org/*
// @include        http://zip.4chan.org/*
// @include        http://cgi.4chan.org/*
// @include        http://orz.4chan.org/*
// @include        http://boards.4chan.org/*
// @license        Copyright (c) 2010 ee
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("blockquote");
	for (i = 0; i < posts.length; i++)
	{
		if (          
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=0EOc6y3Wd6U") != -1 || 
posts[i].innerHTML.indexOf("BEHOLD!") != -1 ||
posts[i].innerHTML.indexOf("destroying /b/") != -1 ||
posts[i].innerHTML.indexOf("0/10") != -1 ||
posts[i].innerHTML.indexOf("over 9000 over 9000 over 9000") != -1 ||
posts[i].innerHTML.indexOf("FUCKING CANCER") != -1 ||
posts[i].innerHTML.indexOf("CANCER") != -1 ||
posts[i].innerHTML.indexOf("Cancer") != -1 ||
posts[i].innerHTML.indexOf("?? all you") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("　 /＼　") != -1 ||
posts[i].innerHTML.indexOf("SAGETHISCANCER/b/ISNOTFUCKINGFACEBOOK") != -1 ||
posts[i].innerHTML.indexOf("█▀▀░█▀█░") != -1 ||
posts[i].innerHTML.indexOf("𝔀") != -1 ||
posts[i].innerHTML.indexOf("𝛍") != -1 ||
posts[i].innerHTML.indexOf("Ace Wars allows users") != -1 || 
posts[i].innerHTML.indexOf("FUCKING SOCIAL NETWORK") != -1 || 
posts[i].innerHTML.indexOf("CANCER CANCER CANCER CANCER") != -1)
		{
			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
			i = i - 1;
		}
		if (posts[i].innerHTML.indexOf("&gt;&gt;") != -1)
		{
			if(posts[i].innerHTML.length == 44 || posts[i].innerHTML.length == 43)
			{
				posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
				i = i - 1;
			}
		}
  		if(posts[i].innerHTML == "Recently upgraded to windows 7, got Q") //
  		{
    			posts[i].innerHTML = "<span style='color:#ff0000>I am a huge spamming faggot!</span>";
		}
	}
})()		


//



var regexp=/61 KB, 270x366/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/16 KB, 500x100/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/978 KB, 222x172/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/2 KB, 48x48/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/3 KB, 48x48/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/29 KB, 524x440/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/44 KB, 440x528/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/16 KB, 359x358/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/20 KB, 359x346/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/40 KB, 400x500/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/26 KB, 440x528/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/21 KB, 383x326/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/22 KB, 312x312/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/35 KB, 185x233/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/26 KB, 415x445/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/21 KB, 185x233/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/34 KB, 299x330/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/24 KB, 104x126/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/55 KB, 262x320/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/24 KB, 104x126/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/29 KB, 262x320/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/43 KB, 400x50/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/39 KB, 415x445/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/27 KB, 440x528/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/47 KB, 524x440/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/24 KB, 256x256/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/42 KB, 400x400/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/26 KB, 312x312/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/40 KB, 524x440/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/36 KB, 262x320/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/61 KB, 262x320/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/27 KB, 262x320/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/32 KB, 299x330/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/30 KB, 450x403/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/219 KB, 707x707/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/28 KB, 415x445/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/5 KB, 185x233/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/2 KB, 101x126/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/25 KB, 350x240/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/120 KB, 800x600/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/130 KB, 800x600/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/111 KB, 800x570/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/131 KB, 800x600/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/132 KB, 800x600/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/20 KB, 350x262/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/3 KB, 104x126/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/1.99 MB, 245x201/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/188 KB, 800x798/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/91 KB, 600x554/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/111 KB, 410x274/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/1.34 MB, 150x113/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/117 KB, 353x438/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/10 KB, 194x252/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/1.14 MB, 260x146/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/17 KB, 384x288/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/9 KB, 219x222/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/128 KB, 347x403/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/16 KB, 347x354/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/105 KB, 763x1016/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/75 KB, 588x970/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/284 KB, 640x480/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/48 KB, 500x339/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/24 KB, 200x300/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/145 KB, 465x454/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/27 KB, 398x481/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/57 KB, 623x405/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/180 KB, 452x700/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/34 KB, 808x602/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/143 KB, 960x720/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/73 KB, 600x675/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/127 KB, 375x500/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/120 KB, 608x456/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/40 KB, 216x216/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/339 KB, 500x388/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/67 KB, 480x640/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/82 KB, 316x317/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/32 KB, 639x418/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/45 KB, 637x504/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/65 KB, 370x351/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/56 KB, 312x312/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/68 KB, 400x400/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/21 KB, 355x400/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/33 KB, 290x595/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/15 KB, 398x400/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/91 KB, 288x396/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/75 KB, 600x400/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/89 KB, 640x480/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/99 KB, 600x400/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/21 KB, 350x379/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/47 KB, 448x423/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/52 KB, 534x473/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/185 KB, 480x640/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/47 KB, 480x594/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/31 KB, 800x600/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/77 KB, 800x598/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/106 KB, 800x600/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/1.45 MB, 269x219/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/44 KB, 251x193/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/10 KB, 251x193/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/64 KB, 500x375/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/73 KB, 480x640/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/60 KB, 640x512/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/81 KB, 750x600/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/117 KB, 670x714/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/40 KB, 474x52/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/28 KB, 400x323/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/72 KB, 640x480/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/64 KB, 640x435/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/32 KB, 403x623/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/45 KB, 508x421/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/11 KB, 500x385/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/33 KB, 216x216/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/129 KB, 764x493/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/78 KB, 200x300/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/288 KB, 394x384/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/539 KB, 737x474/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/223 KB, 500x597/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/154 KB, 500x451/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/307 KB, 1800x1656/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/114 KB, 800x600/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/114 KB, 500x666/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/103 KB, 768x802/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/357 KB, 1024x819/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/102 KB, 602x452/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/66 KB, 586x719/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/148 KB, 533x588/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/181 KB, 480x510/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/64 KB, 728x561/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/157 KB, 980x687/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/161 KB, 1024x768/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/36 KB, 550x413/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/8 KB, 251x193/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/74 KB, 477x353/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/85 KB, 500x375/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/509 KB, 971x728/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/72 KB, 600x641/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/25 KB, 200x300/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/91 KB, 600x450/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/24 KB, 400x299/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/74 KB, 402x553/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/45 KB, 354x480/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/27 KB, 465x308/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/118 KB, 600x800/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/41 KB, 425x283/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/7 KB, 150x148/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/94 KB, 450x552/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/19 KB, 392x262/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/91 KB, 600x450/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/4 KB, 126x112/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/10 KB, 216x216/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/83 KB, 479x599/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/83 KB, 480x640/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/74 KB, 800x554/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/60 KB, 386x567/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/48 KB, 400x300/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/25 KB, 440x423/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/84 KB, 549x613/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}


var regexp=/299 KB, 1280x1024/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/405 KB, 1280x960/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/146 KB, 534x366/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

//



CheckScriptForUpdate = {
              // 
 id: '78112', // 
 days: 1,     // 
 
 // 
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('There is a new update to '+this.xname+' . Do you want to update? Please give a positive review if you like it.')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Are you sure you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();


document.getElementsByName("email", "input")[0].value = "noko";