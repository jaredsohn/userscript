/*
 New Isohunt Download Linker

 V0.01

 Adds a Download Image to each torrent search result on Isohunt (normally accessed via the "Download" link in the torrent's slide-open frame)
	
*/

// ==UserScript==
// @name          New Isohunt Download Linker (based on Isohunt Download Linker)
// @namespace     http://dnsresolver.net
// @description   Adds a Download Image to each torrent search result on Isohunt (normally accessed via the "Download" link in the torrent's slide-open frame)
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
  						'<span style="float:left"><a href="' + targetUrl + '"><img src=http://isohunt.com/img/dl-trans.gif></a>&nbsp;</span>' + 
  						'<div onclick="' + attr.value + '">' + target.innerHTML + '</div>';
  					
  					target.style.cursor = 'pointer'; // show pointer (hand) cursor on hover of containing td
  					
  				}
  				
  			}
  		}
  	}
  	catch(e) {}
  	
  }
	
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

