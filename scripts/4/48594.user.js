// ==UserScript==
// @name           Itasa Homepage Download Links
// @description    Inserisce i link per i download dei sottotitoli sotto alle immagini di presentazione.
// @version        1.2.1
// @namespace      http://userscripts.org/scripts/show/48594
// @downloadurl    http://userscripts.org/scripts/source/48594.user.js
// @include        http://www.italiansubs.net/
// @include        http://www.italiansubs.net/index.php
// ==/UserScript==

/****************************
Itasa Homepage Download Links
Last update: September 16, 2009
Copyleft 2009, Tibi Diego
http://userscripts.org/users/ceres

Released under a Creative Commons License
http://creativecommons.org/licenses/by-nc-sa/2.5/

*****************************/

//----------------
var GM_Debug = 0;
//----------------

var smallWidth = 200;
var currDiv;
var	linksHTML = '';	
var	lastlink = '';

var loader_html = "<img src='data:image/png;base64,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' width='10' border='0' />";

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}
if(!GM_Debug) {
   var GM_log = function(){};
}

function insertBox(divTarget, i)
{
	var divBox = document.createElement('div');
	divBox.id = 'divBox' + i;
	divBox.style.width = smallWidth + 'px';
	divLink = document.createElement('a');
	divLink.addEventListener('click',getContent, false);
	divLink.href = 'javascript:void(0);';
	divLink.innerHTML = '<b>Get Links</b>';
	divBox.appendChild(divLink);
	divBox.setAttribute('name','empty');
	divBox.title = divTarget.getElementsByTagName('a')[0].href;
	divTarget.appendChild(divBox);
}

//allDivs = document.evaluate("//table[@class='contentpaneopen']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//allDivs = document.evaluate("//table[@class='contentpaneopen']/tbody/tr/td/center",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
allDivs = document.evaluate("//div[@class='singola']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    insertBox(thisDiv, i);
}

function getContent(e)
{
	divBox = e.target.parentNode.parentNode;
	GM_log(divBox.id);
	if (divBox.getAttribute('name') == 'empty')
	{
		divBox.innerHTML = loader_html;
		getLinks(divBox);
		divBox.setAttribute('name','filled');
	}

}

function getLinks(div)
{
	var req = new XMLHttpRequest();
	req.open("GET", div.title, true);
	req.onreadystatechange = function (aEvt) {
	  if (req.readyState == 4) {
	     if(req.status == 200)
	      insertLinks(req.responseText, div);
	     else
	      GM_log("Error loading page\n");
	  }};
	req.send(null);
}
function insertLinks(source, div)
{
	regRS = new RegExp(/href="\/index.php\?option=com_remository[^"]+\.zip"/g);
	pinks = source.match(regRS);
	if (pinks)
	{
		div.innerHTML = "";		
		for (var j=0;j<pinks.length;j++)
		{
			link = pinks[j].substring(6,(pinks[j].length - 1));
			GM_log(link);
			sr="hdtv.gif";

			hd_true = link.match(/720p/);
			if(hd_true) sr="720p.gif";

			fullhd_true = link.match(/1080p/);
			if(fullhd_true) sr="1080p.gif";

			dvdrip_true = link.match(/dvdrip/);
			if(dvdrip_true) sr="dvdrip.gif";

			//Al momento non voglio gestire le stagioni complete...
			complete_season = link.match(/complet/);
			if (!complete_season) 
			{
				linksHTML = ' <a href="'+link+'"><img title="'+link+'" src="http://www.italiansubs.net/images/'+sr+'" border=0 /></a>';
				div.innerHTML += linksHTML;
			}
		}
	}
	regNO = new RegExp(/http:\/\/www.italiansubs.net\/varie\/faiillogin.png/);
	nodl = source.match(regNO);
	if (nodl)
	{
		div.innerHTML = "Devi (ri)loggarti";
	}
	
	div.addEventListener('click',getContent, false);
	return linksHTML;
}

GM_addStyle('#divBox {display:inline;}');