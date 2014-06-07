// ==UserScript==
// @name          Quick Drving - Mafia Corruption
// @namespace     Fugazi
// @description   Changes the monorail link to drive in user profiles for free travel (license required)
// @include       http://*mafiacorruption.com/viewuser.php*
// @include       http://*mafiacorruption.com/search.php*
// ==/UserScript==
var url1,url2;
url1 = ['www.mafiacorruption.com/monorail.php'];
url2 = ['www.mafiacorruption.com/drive.php']; 
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
