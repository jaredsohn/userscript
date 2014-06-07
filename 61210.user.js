// ==UserScript==
// @name           Random Link Title Fetcher
// @namespace      pendevin
// @description    Fetches the title of a random link every time "Random Link" is clicked. 
// @include	http://boards.endoftheinter.net/*
// @include	http://links.endoftheinter.net/*
// @include	http://endoftheinter.net/*
// @include	https://boards.endoftheinter.net/*
// @include	https://links.endoftheinter.net/*
// @include	https://endoftheinter.net/*
// @include	http://archives.endoftheinter.net/*
// @include	https://archives.endoftheinter.net/*
// ==/UserScript==

var as=document.getElementsByTagName("a");

var XHR = {};

XHR.createDoc = function (r, callback) {
  var doc = document.implementation.createDocument('','',null);
  var html = document.createElement('html');
  html.innerHTML = r.responseText;
  doc.appendChild(html);
  r.doc = doc;
  callback(r);
}

// adds an extra 'doc' property to the response object that contains
// the document element of the response
XHR.get = function (url, callback) {
  GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': navigator.userAgent,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onload: function (r) { XHR.createDoc(r, callback) }
    });
}

function getRandomLink(e)
{
	e.preventDefault();
	XHR.get('http://links.endoftheinter.net/linkme.php?l=random',function(r){
		var loc=r.doc.getElementsByTagName("a");
		for(i in loc)
		{
			if(loc[i].href.match(/^linkme\.php\?l=[0-9]+/)&&loc[i].innerHTML.match(/^LL[0-9a-f]+/))
			{
				loc=loc[i].href;
				break;
			}
		}
		var h2=r.doc.getElementsByTagName("h1")[0].innerHTML;
		document.getElementById("random_link").innerHTML="<a href='"+loc+"'><b>"+h2+"</b></a>";
	});
}

var ran=document.createElement("span");
ran.id="random_link";
ran.setAttribute('style','position:absolute;right:1em;top:7em;font-size:20;');
document.body.appendChild(ran);
for (var i=0; i<as.length; i++)
{
	if (as[i].innerHTML=="Random link")
	{
		document.domain = 'endoftheinter.net';
		as[i].addEventListener("click",getRandomLink,false);
	}
}