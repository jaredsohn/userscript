// ==UserScript==
// @name          Redirect Me!
// @namespace     Kafke
// @description   Redirects searches that are urls
// @include       http://*.google.*/*
// @include       http://*.yahoo.*/*
// @include       http://*.bing.*/*
// @include       http://*.altavista.com/*
// @include       http://*.cuil.com/*
// @include       http://*.yebol.com/*
// @include       http://*.search.com/*
// ==/UserScript==

function findval(text, type)
{
tagtype=type+"=";
var start=0;
var end=0;
	for(i=0; i<text.length; i+=1)
	{
		if(text.substr(i,tagtype.length)==tagtype)
		{
			start=i+tagtype.length;
			i+=tagtype.length;
		}
	}
	for(i = start-1; i<=text.length; i+=1)
	{
		if( (text.substr(i,1)=="&" || i==text.length) && start!=0)
		{
			end=i;
			return text.substr(start,end-start);
		}
	}
	return "None";
}

//Google, Bing, Altavista, Ask, Cuil, Search -- Start
var text = findval(location.href, "?q");
if(text=="None")
{
text = findval(location.href, "&q");
}

//Yahoo
if(text=="None"){ text = findval(location.href, "&p"); }if(text=="None"){ text = findval(location.href, "?p"); }

//Yebol
if(text=="None"){ text = findval(location.href, "&key"); }if(text=="None"){ text = findval(location.href, "?key"); }

text=text.toLowerCase();


//Extensions Array
var suf = new Array();
suf.push('.com', '.net', '.gov', '.org', '.co.uk', '.jp', '.tk', '.biz', '.ly', '.au', '.fr', '.de', '.ca', '.it', '.ru');

suf.push('.arpa', '.edu', '.firm', '.int', '.mil', '.mobi', '.nato', '.nom', '.web', '.ac');


//Parse and Redirect
for(i=0; i<suf.length; i+=1)
{
if(text.match(suf[i]))
{

if(text.match("http%3a%2f%2f"))
{
	text=text.replace("http%3a%2f%2f", "");
}

text=text.replace(/%2f/g, "/")
text=text.replace("+", " ")

location.href="http://"+text; 

}

}