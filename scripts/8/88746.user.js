// ==UserScript==
// @name           buxmatrix
// @namespace      http://www.cool-bux.co.cc
// @include        *bux-matrix.com/view.php*
// @include        *bux-matrix.com/surf.php*
// ==/UserScript==


var ref = document.referrer;
var uri = document.URL;
var forms;
var ifr;
var i;

if (uri.search('view.php') >= 0)

{

ifr = document.getElementsByTagName('iframe');

for(i=0;i<ifr.length;i++)
{
	ifr[i].src = "http://www.google.com";
}

}
if (uri.search('surf.php') >= 0)
{

forms = document.getElementsByTagName('form');

i = 0;
viewads();

}

function viewads()
{

	if(i < forms.length)
	{
		forms[i].submit();
		i++;
		window.setTimeout(viewads,40000);
	}
	else
	{
		alert("All Done!! Visit cool-Bux.co.cc to support.");
	}
}