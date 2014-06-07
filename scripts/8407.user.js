// ==UserScript==
// @name           CNN Clean
// @namespace      Smiths
// @grant	       GM_getValue
// @grant	       GM_log
// @grant   	   GM_setValue
// @grant		   GM_addStyle
// @grant  		   GM_xmlhttpRequest
// @grant  		   GM_registerMenuCommand
// @grant		   GM_addStyle
// @grant		   GM_log
// @include        *.cnn.com/*
// ==/UserScript==

function cleanup(){
	allH1s = document.evaluate('//h1', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allH1s.snapshotLength; i++) {
		thisLink = allH1s.snapshotItem(i);
		aonly = thisLink.innerHTML;
		link = document.createElement('a');
		link.setAttribute("style","font-size:14pt;font-weight:bold;padding:10px;");
		link.innerHTML = aonly;
		thisLink.parentNode.replaceChild(link, thisLink);
	}
	var p = document.querySelectorAll('p[class*="cnn_storypgraphtxt"]');
	for (var a=0;a<p.length;a++)
		if (p[a].innerHTML.substr(0,3).indexOf("<a ") > -1)
			p[a].parentNode.removeChild(p[a]);
	var allLinks, thisLink, textonly, linktext, link;
	allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if (thisLink.href.search(/hlntv\.com\/video\//) != -1 || thisLink.href.search(/ireport\.cnn/) != -1 || thisLink.href.search(/video\/data\//) != -1 || thisLink.href.search(/video\/\?\//) != -1 || thisLink.href.search(/video\/.*?#/) != -1 || (thisLink.href.search('cnnLive') != -1) && (thisLink.innerHTML.indexOf('img') != 1)){
			textonly = thisLink.innerHTML.replace(/<.*?>/g,'');
			link = document.createElement('i');
			linktext = document.createTextNode(textonly);
			link.appendChild(linktext);
			thisLink.parentNode.replaceChild(link, thisLink);
		}
		if (thisLink.href.search(/\/showbiz\//) != -1 && thisLink.parentNode != null){
			thisLink.parentNode.removeChild(thisLink);
		}
	}
}
//god I hate all these sections that make CNN unreadable.
var remove = ['cnn_zitemodule','cnn_hpinthenewscntr','cnn_pmtvmodule','ads.cnn.com','cnn_adcntr','cnnSocialContext'];
if(unsafeWindow.top == unsafeWindow.self) //no run on iframes
{
	document.addEventListener('DOMNodeInserted',function(e){
		window.setTimeout(function(){
			for (var j=0;j<remove.length;j++)
			{
				var removeDivs = document.evaluate('//*[contains(@id, "'+remove[j]+'") or contains(@class, "'+remove[j]+'") or contains(@src, "'+remove[j]+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i = 0; i < removeDivs.snapshotLength; i++) 
					removeDivs.snapshotItem(i).parentNode.removeChild(removeDivs.snapshotItem(i));
			}
		}, 250);}
	, false);
	setTimeout(cleanup,250);
}


