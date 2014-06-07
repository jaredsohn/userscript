// ==UserScript==
// @name          Google Logo Rotate
// @namespace     Kafke
// @description   Rotates through google logos
// @include       *
// ==/UserScript==

/*
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
*/

function findtag(tagtype, text)
{
var start=0;
var end=0;
	for(i = 0; i<text.length; i+=1)
	{
		if(text.substr(i,tagtype.length+1)=="<"+tagtype)
		{
			start=i;
		}
		if(text.substr(i,1)==">" && text.substr(start,tagtype.length+1)=="<"+tagtype)
		{
			end=i;
			return text.substr(start,end-start+1);
		}
	}
	return "None";
}
function findsrc(text)
{
tagtype="src=";
var start=0;
var end=0;
	for(i = 0; i<text.length; i+=1)
	{
		if(text.substr(i,tagtype.length+1)==tagtype+"\"")
		{
			start=i+5;
			i+=5;
		}
		if(text.substr(i,1)=="\"")
		{
			end=i;
			return text.substr(start,end-start);
		}
	}
	return "None";
}

if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else // Internet Explorer 5/6
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET","http://www.google.com/logos/logos.xml",false);
xhttp.send("");
xmlDoc=xhttp.responseXML; 

var x=xmlDoc.getElementsByTagName("description");

var number = Math.floor(Math.random()*x.length)+1;
if(number >= x.length)
{
number=x.length-1;
}

var newimg = x[number].childNodes[0].nodeValue;

var imgtag = findtag("img", newimg);

var imgtagsrc = findsrc(imgtag);
document.getElementById('logo').removeAttribute('height');
document.getElementById('logo').removeAttribute('width');
document.getElementById('logo').src = imgtagsrc;