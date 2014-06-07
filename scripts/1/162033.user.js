// ==UserScript==

// @name          zPag Short Links Elongator

// @namespace     DevelopmentSimplyPut(developmentsimplyput.blogspot.com)

// @description   Elongates zPag Links to their direct links

// @include       *

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js

// ==/UserScript==

String.prototype.ReplaceAll = function(stringToFind,stringToReplace)
{
    var temp = this;
    var index = temp.indexOf(stringToFind);

	while(index != -1)
	{
		temp = temp.replace(stringToFind,stringToReplace);
		index = temp.indexOf(stringToFind);
	}
	return temp;
};

Array.prototype.unique = function () 
{
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}

function Run(Urls)
{
	if(Urls.length>0)
	{
		for(i=0;i<Urls.length;i++)
			GetDirectLink(Urls[i]);
	}
}

function GetDirectLink(str)
{
	GM_xmlhttpRequest
	({
		method: "GET",
		url: str,
		headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type': 'application/x-www-form-urlencoded'},
		onload:function(result)
		{
			var link=result.responseText.split('window.location = ')[1].split(';')[0].replace('"','').replace('"','');
			(document.getElementsByTagName("body"))[0].innerHTML=(document.getElementsByTagName("body"))[0].innerHTML.ReplaceAll(str,link);
		}
	});
}

$(document).ready(function(){
	var DirectUrls=new Array();
	var Urls=new Array();
	var UrlsPattern=/http:\/\/zpag\.es\/(?:\w*)/g;
	Urls=(document.getElementsByTagName("body"))[0].innerHTML.match(UrlsPattern);
	Urls=Urls.unique();
	Run(Urls);
});

