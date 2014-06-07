/*
 Isohunt Download Linker

 Version 0.03
 (C) 2007-2008 Joel Thornton / joelpt - Licensed under the GPL v2 or later
               <userscripts@joelpt.net>

 Adds a [DL] direct torrent download link to each torrent search result on Isohunt (normally accessed via the "Download .torrent" link in the torrent's slide-open frame)

 Changelog: 
	0.01 - initial version
	0.02 - updated to match new isohunt html; row-clicking now works properly
        0.03 - now works on https connections as well
	
*/

// ==UserScript==
// @name          Isohunt Download Linker
// @namespace     http://joelpt.net
// @description   Adds a [DL] direct torrent download link to each torrent search result on Isohunt (normally accessed via the "Download .torrent" link in the torrent's slide-open frame)
// @include       http://isohunt.com/torrents/*
// @include       https://isohunt.com/torrents/*
// ==/UserScript==

(function()
{
	links = getElementsByClassName(document.getElementById('serps'), "tr", "hlRow");

	var oRegExp = new RegExp("(link.+)\.href");
	var oRegExpLink = new RegExp("/torrent_details/([^\?]+)");
	
	for (i=0; i<links.length; i++) {
	  link = links[i];
  	onclickurl = '';
  	
  	try {
  		for (j=0; j<link.attributes.length; j++) {
  			attr = link.attributes[j];
  			if (attr.name == 'onclick') {
  				matches = oRegExp.exec(attr.value);
  				if (matches.length == 2) { // correct matching onclick attribute
  					// get link id
  					linkid = matches[1];

  					// get torrent summary link url
  					summaryUrl = document.getElementById(linkid).href;
  					
  					// build target url
  					matchesLink = oRegExpLink.exec(summaryUrl);
  					targetUrl = "http://isohunt.com/download/" + matchesLink[1] + ".torrent";
  					
  					target = link.childNodes[2];
  					target.innerHTML = 
  						'<span style="float:left"><a href="' + targetUrl + '">[DL]</a>&nbsp;</span>' + 
  						'<div onclick="' + attr.value + '">' + target.innerHTML + '</div>';
  					
  					// attr.value = ''; // disable normal onclick function (not needed in v0.2)
  					
  					target.style.cursor = 'pointer'; // show pointer (hand) cursor on hover of containing td
  					
  				}
  				
  			}
  		}
  	}
  	catch(e) {}
  	
  }


	/*
		getElementsByClassName() from http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
		Written by Jonathan Snook, http://www.snook.ca/jonathan
		Add-ons by Robert Nyman, http://www.robertnyman.com
	*/
	
	function getElementsByClassName(oElm, strTagName, strClassName){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/-/g, "\-");
		var oRegExp = new RegExp("(^|\s)" + strClassName + "(\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
			oElement = arrElements[i];
			if(oRegExp.test(oElement.className)){
				arrReturnElements.push(oElement);
			}
		}
		return (arrReturnElements)
	}


})();

