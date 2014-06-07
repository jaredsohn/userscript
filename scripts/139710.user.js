// ==UserScript==
// @name        KG - show subtitles on browse page
// @namespace   KG
// @include     http*://*karagarga.net/browse.php*
// @include     http*://*karagarga.net/history.php*
// @include     http*://*karagarga.net/bookmarks.php*
// @grant	 GM_xmlhttpRequest
// @version     1.3
// ==/UserScript==

var subStart = 'Subtitles</td><td valign="top" align=left colspan=2>included:';
var subStart2 = 'Unknown if subtitles included<br />';
var subEnd = '</td></tr>\n<tr><td class="heading" valign="top" align="right">Source';


// don't run in iframes
if (!window.frameElement) {
        var links = document.links;
        for (i=0; i < links.length; i++) {
        	var h = links[i].href + "";
        	if (h.indexOf('/details.php?') != -1 && h.indexOf('#') == -1 && h.indexOf('filelist=') == -1 && h.indexOf('tocomm=') == -1) {
        		checkSubs(links[i]);
        	}
        }
        
        if (window.location.href.indexOf('bookmarks.php') != -1) {
        	var t = document.getElementById('browse');
        	t.style.fontWeight = 'normal';
        }
        
}  // end iframe check

function checkSubs(link) {
	var loadMe = link.href.replace("details.php", "detailsshort.php");

	 GM_xmlhttpRequest({
  method: "GET",
  url: loadMe,
  onload: function(response) {
   
   var code = response.responseText;
   var url = response.finalUrl;  
   
   if (code.indexOf(subStart) != -1) {
   	var ref = subStart;
   } else {
   	var ref = subStart2;
   }
   
   var code2 = code.substr(code.indexOf(ref));
   var end = code2.indexOf(subEnd);
   var subText = code2.slice(ref.length, end);
   
   if (subText != "") {
	subText = subText.replace('Links to subtitles (not in torrent):', '');
	   link.parentNode.innerHTML += "<br><span style='font-size: 80%;'>Subs:" + subText + "</span>";
       }  
   }
 });
}