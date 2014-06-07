// ==UserScript==
// @name           tf2rshowrep
// @namespace      Jeremy Geels
// @description    Shows your rep below your avatar.
// @include        *tf2r.com*
// ==/UserScript==

var xmlhttp = new XMLHttpRequest();

var avElm = document.getElementById("avatar").getElementsByTagName("a")[0];
var link = avElm.href;

var st = avElm.innerHTML;

readpageR();

function readpageR()
{
	var t=setTimeout(readpageR,5000);

	xmlhttp.onreadystatechange = returnRep;

	xmlhttp.open("GET", link);
	xmlhttp.send(null);
}

function returnRep()
{
	if ( xmlhttp.readyState == 4 )
	{
		var a = xmlhttp.responseText.search("upvb")+40;
        var pos = xmlhttp.responseText.substring(a, a+15).split(" ")[1];
		
		a = xmlhttp.responseText.search("downvb")+40;
        var neg = xmlhttp.responseText.substring(a, a+15).split(" ")[1];
		
		avElm.innerHTML = st + "<font size='1'><font color='#00FF00'>"+pos+"</font> / <font color='#FF0000'>"+neg+"</font></font>";
    }
}