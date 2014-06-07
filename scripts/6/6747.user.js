// ==UserScript==
// @name           simple-search-yahoo
// @namespace      http://www.readbarbi.blogspot.com
// @description    remove ads from yahoo search and add links to google and msn for the same search result
// @include        http://search.yahoo.*
// ==/UserScript==

// this script removes ads and tips from the yahoo search result page.
// it looks very simple adn only the results and the search query box is available.
// to compare results between search engines, users can use links provided in the page to 
// view results for the same query in google and msn


var newdiv = document.createElement('DIV');
var newele = document.createElement('a');
var breakline = document.createElement('br');
var breakline2 = document.createElement('br');
newdiv.setAttribute('align','center');
newtext = document.createTextNode("Google search results for : "+document.getElementById('yschsp').value);
newele.appendChild(newtext);
var googlelink = "http://www.google.co.in/search?hl=en&q="+document.getElementById('yschsp').value;
newele.setAttribute('href',googlelink);
space = document.createElement('p');
newdiv.appendChild(space);
newdiv.appendChild(newele);
var msn = document.createElement('a');
var msn_link = document.createTextNode("try msn for : "+document.getElementById('yschsp').value);
msn.appendChild(msn_link);
var msn_link_url ;
msn_link_url = "http://search.live.com/results.aspx?q="+document.getElementById('yschsp').value;
msn.setAttribute('href',msn_link_url);
space = document.createElement('p');
newdiv.appendChild(space);
newdiv.appendChild(msn);
newdiv.appendChild(breakline);
newdiv.appendChild(breakline2);
var also = document.getElementById('yschalso');
if (also)
{
	also.id = "yschgoogle";
	also.parentNode.replaceChild(newdiv,also);
}
var also2 = document.getElementById('yschalso');
if (also2)
{
also2.parentNode.removeChild(also2);
}
var info = document.getElementById('yschinfo');
if (info)
{
info.parentNode.removeChild(info);
}
var spons = document.getElementById('yschsec');
if (spons)
{
spons.parentNode.removeChild(spons);
}
var srch = document.getElementById('yschssbx');
if (srch)
{
srch.parentNode.removeChild(srch);
}
var ads = document.getElementById('yschpri').getElementsByTagName('div');
for(i=0;i<ads.length;i++)
{
if(ads[i].className == 'yschbbox')
ads[i].parentNode.removeChild(ads[i]);
}
var header = document.getElementById('yschtg');
if (header)
{
header.parentNode.removeChild(header);
}
var header1 = document.getElementById('ygunav');
if (header1)
{
header1.parentNode.removeChild(header1);
}
var footer0 = document.getElementById('yschansdd');
if (footer0)
{
footer0.parentNode.removeChild(footer0);
}

var footer = document.getElementsByTagName('div')

for(i=0;i<footer.length;i++)
{
 	if(footer[i].id == 'yschft' || footer[i].id == 'yschtools' )
        footer[i].parentNode.removeChild(footer[i]);
	if (i==7)
	{ 
      footer[i].parentNode.removeChild(footer[i]);
	}
}

var footerlast = document.getElementsByTagName('p');
for (i=0;i<footerlast.length ;i++ )
{
if (footerlast[i].className == 'yschftad')
{
  footerlast[i].parentNode.removeChild(footerlast[i]);
}
}

