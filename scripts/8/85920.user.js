// ==UserScript==
// ======By======
// ====DjMPK=====
// @name          Best Kere.ws
// @description   Gibt die NZB direkt ohne umweg ueber myFiles.info by DjMPK
// @include       http://*kere.ws/*
// @include       http://kere.ws/*
// ==/UserScript==
var url1,url2;
url1 = ['http://myfilez.info/index.php?m=display&'];
url2 = ['myfilez.info/download.php?' ]; 
var a, links;
var tmp="a";
var p,q;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    a = links[i];
    for(var j=0;j<url1.length; j++)
	{
	tmp = a.href+"" ;
	if(tmp.indexOf(url1[j]) != -1)
	{
	p=tmp.indexOf(url1[j]) ;
	q="http://";
	q = q + url2[j] + tmp.substring(p+url1[j].length,tmp.length);
	a.href=q ;
	}
	}
    }