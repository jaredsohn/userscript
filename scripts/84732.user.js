/* (C) Copyright 2011 David Fichtmueller. Licensed under the MIT License
 *
 * based on "GMaps OpenStreetMap Link":
 *(C) Copyright 2010 Basique. Licensed under the MIT License
 *
 * based on "Google Maps Show Coords Link" : 
 * (C) Copyright 2006-2010 James Inge.  Licensed under the MIT License
 */

// ==UserScript==
// @name        Google Maps Geocaching Link
// @namespace   davidfichtmueller.de
// @description Creates a link on Google Maps to view the map on geocaching.com
// @include     http://maps.google.tld/*
// @include     https://maps.google.tld/*
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @version     0.6
// ==/UserScript==
	   
var openInWindow = GM_getValue('openInWindow',false);
	if(openInWindow){
		GM_registerMenuCommand("GMaps: open GC URL in same window", setOpenInWindow);
	}else{
		GM_registerMenuCommand("GMaps: open GC URL in new window", setOpenInWindow);
	}
	
	
GM_registerMenuCommand("GMaps: Set GC URL", set_url);

var url = (GM_getValue('url','http://www.geocaching.com/map/default.aspx?lat=<lat>&lng=<lon>&zm=<zoom>&mt=m'));

function set_url() {
    url = prompt('URL', url);
    GM_setValue('url', url);
}

function setOpenInWindow() {
	openInWindow = GM_getValue('openInWindow',false);
	GM_setValue('openInWindow',!openInWindow);
	location.reload();
}

(function() {
    function addGCLink() {
        var targets = document.evaluate("//div[contains(@class,'header-buttons kd-buttonbar')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (targets.snapshotLength == 1) {
        	var linkSnippets = new Array();
        	if(openInWindow){
        		linkSnippets[0]="window.open(";
        		linkSnippets[1]=")";
        	}else{
        		linkSnippets[0]="document.location = ";
        		linkSnippets[1]="";
        	}
			
		if(targets.snapshotItem(0).getElementsByTagName('a').length>2){
			if(targets.snapshotItem(0).style.width){
				targets.snapshotItem(0).style.width = (parseInt(targets.snapshotItem(0).style.width)+34)+"px";
			}else{
				targets.snapshotItem(0).style.width = "150px";
			}
			targets.snapshotItem(0).style.paddingRight = "5px";
			targets.snapshotItem(0).parentNode.firstElementChild.style.paddingLeft = "5px";
		}
		document.getElementById("panelarrow2").style.background="none";
        	targets.snapshotItem(0).firstElementChild.className = "kd-button permalink-button mid small"
            var js = "javascript: void(url = gApplication.getPageUrl()); if( url.search('&ll=') != -1 ) { coords = url.slice(url.search('&ll=')+4); coords = coords.slice(0,coords.search('&')); lat = coords.slice(0,coords.indexOf(',')); long=coords.slice(coords.indexOf(',')+1); zoom = url.slice(url.search('&z=')+3); url='" + url + "'; "+linkSnippets[0]+"url.replace('&lt;lat&gt;', lat).replace('&lt;lon&gt;', long).replace('&lt;zoom&gt;', zoom)"+linkSnippets[1]+"; return false;} else {alert('No coordinates available.\\nPlease move map a little and try again.');} ";
            var icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DA%08%1C%0B%2F%3A%8D%8B81%00%00%02%E8IDAT8%CB-%93%5Bk%9CU%18F%D7%BB%BF%FD%1D%26s%B0N'%8DN%A3SA%03FE%A98%60%C5%03%1E)%01ozW%08((%BD%0A%F8%0BD%0AJQo%0D%E8%8D%A0%DE%8Axa%15%A5*m%23Z%1A(ZK%A5%0DJ%8DA%5B3%DFL%E3d%BE%D3%DE%AF%17%C9%1FX%2Cx%D6%23%D7%AF%D5t%7B%0C%ED%FD%13N%7F%DDf%E1%C8%90%DF.%D4%B9%E7%EE-%24%FE%85Tg%E9%7F%B9H%3D%9C%C2%3ACe%14%01%02%11%00%CCtw%C2%FB%CB%0D%D6%AE%DE%C2%0F%2B%96w%DE%E8%10%B7s%A4%02%95%9Cr%E2%09.%15Db%C9c%0F%5EQU%BC%EA%0E%20%FD%B7No%1E%8E%BD%D4%E0%CC%F9%98%3B%E6'%1C%E8x*%01%8C'*%95%EB%C7%BFc%FC%EA%0A%EET%8A%84%06%00%05%3C%60%9AI%C6%B1%97S%9E%7CA%09%9C%E7%C4%EB%D3%5C%BAb%09B0%5Ep%CD%90%99%8F%0FS%3D%D7%25%92%0CU%C0%EC%12%00k%8C%90%95%15%1F.%B7%F8%7Dc%8D%CDM%CB%FC%DC~%CE%9E%FD%93%07%1Fq%88S%3CB%ED%E8%9DP%85%24%AE%60k5%25%7C%B4IPMa%10%E1%C7s-%9A%9D%82F%B3%A27%3Da%F5%E7%BF%C8%AB%02%A3B%25%1E%1F%2B6%2F%A1%82%C17%1B%94%EF%5DF%5C%02%BE%C4%88%2FY_%BB%89%F17%01%C5%7B%98%9B%CD%E8%DF%0F%CE%3B%02%85%C9v%C1%C8e%8C%5D%0A%CF%DC%CA%60k%C8xe%9DT%C7%88%2BO%EA%8D%7Fj%FCzUx%FA%F1%9C%CA)%D6%09e%90a%CC!%9C%EE%E1%CC%E0%3C%89L%B1%B3%9F%C7_%18%E1n%AFQ%EB%D4%90%8Bi%AAI%E6%F1%C3u%8A%99%1E%E0%F0%12%A18%E6%EA5%22c%D0%D1%154h%60%7C%81JH)J%80bU%11%3E%F8T%C9%07t%97%96%D8x%FB%5D%D8%D3%05)%A1%AC%F8%E9%C8%02%0FOy%B2O%FA%D4%A3%18l%04%A6%802%04%022%97cL%1CCg%96d%AE%C7%EC%F7%DFb%1A%09%24!%D8%06%26%D8Q%AE%855%3E%BB%9Cp%DF%9BC%0E%9E(%B8%F7%AD%01%C7OM%B0%8D%0EV%A5%22r9%7F%BFx%14%D3%8AQ%E71b%F1%E1%7F%A0%1E%8FE%9D%A1%D7%8D%D8%1C*q%5C%B2%BC8%C3%C2%03!E%A9X%C4Px%A1x%E8%20%A8b%8A%11%7BO%9F%E3%C6%F3O%11%04%16%91%0A%03t%1B%CA%5D%FB%22%3E%7F%ED6%DA%D1%84%A2%88%10)%D8%E9%12%C0%7B%10%A1%B9z%91%CE%C9%8Fh%2F%BDBx%ED%0F%8Cf%A8%09%D8%5B%B7%2C%F6c%A6mF%E0k%20%15%EAc%2C%BB%A7%40%15%BCg%F4%D8!%B6%FB%7D%F8%EA%0B%AAV%1D%88%C9LD%C3%94%A4%CE%22I%C4vn%B0d%18%A3%98%40%04Q%10%B3%2B%A3%82%8AR%3E%7B%18%D7%DA%07x%AC%E6%A8Kx%E2%80%85R%09%C8%08%5DHE%C4%FF%9F%BBV%5C%5E%DA%A4%CF%00%00%00%00IEND%AEB%60%82";
            targets.snapshotItem(0).innerHTML =
            "<a class=\"kd-button permalink-button right small\" href=\"#\" onclick=\"" + js + "\"><img class=\"bar-icon\" width=\"16px\" height=\"16px\" alt=\"Geocaching.org Icon\" src=\"" + icon + "\"/></a>"+targets.snapshotItem(0).innerHTML;
        }
    }
    addGCLink();
})();