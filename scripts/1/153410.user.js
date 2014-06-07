/*/////////////////////////////////////////////////
| _ \ __| __| |/ // __((/ __| _ \_ _| _ \|_   _| 
|   / _|| _|  ' < \__ \| (__|   /| ||  _/  | |   
|_|_\___|___|_|\_\|___/ \___|_|_\___|_|    |_| 
/////////////////////////////////////////////////*/
// ==UserScript==
// @name UploadHero Link Checker | Reek
// @namespace https://userscripts.org/scripts/show/153410
// @description	UploadHero Link Checker
// @downloadURL http://userscripts.org/scripts/source/153410.user.js
// @updateURL   http://userscripts.org/scripts/source/153410.meta.js
// @author Reek | http://reeksite.com/
// @version	v1.1
// @license	GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @icon http://i.imgur.com/04Cod.png
// @include *
// ==/UserScript==
/*===================================================
	Variables
===================================================*/

  var unavailable = "http://i.imgur.com/sNm0k.png";
  var alive = "http://i.imgur.com/mE83t.png";
  var dead = "http://i.imgur.com/swKnZ.png";
  var load = "http://i.imgur.com/LURvG.gif";

  
/*===================================================
	Check link
===================================================*/
function check(url,e) {

GM_xmlhttpRequest({
  method: "GET",
  timeout: "10000", // 10s
  url: url,
  headers: {
  "User-Agent": "Mozilla/5.0",
  'Accept': 'text/xml',
  'Referer': ""           
  },
  onload: function(response) {
  var res = response.responseText;
  
  // Dead
  if(/men_file_lost\.jpg/gi.test(res)) {
  
    e.setAttribute('style', 'color:red; text-decoration:line-through;');    
	
	// On crée l'element
    eStatus = document.createElement('img');
    eStatus.setAttribute('src', dead);
    eStatus.setAttribute('alt', 'dead');
    e.parentNode.insertBefore(eStatus,e);
  
  }
  // Alive
  else {
    e.setAttribute('style', 'color:green;');    
	
	// On crée l'element
    eStatus = document.createElement('img');
    eStatus.setAttribute('src', alive);
    eStatus.setAttribute('alt', 'alive');
    e.parentNode.insertBefore(eStatus,e);
  }

  }, // fin onload
  ontimeout: function() {
    e.setAttribute('style', 'color:orange;');    
	
	// On crée l'element
    eStatus = document.createElement('img');
    eStatus.setAttribute('src', unavailable);
    eStatus.setAttribute('alt', 'unavailable');
    e.parentNode.insertBefore(eStatus,e);
  }
});
} // fin function 


/*========================================================
	Run
========================================================*/
  
  // Links
  var files = document.evaluate("//a[contains(@href,'uploadhero.com/dl/') or contains(@href,'uploadhero.co/dl/')]",
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  // Files Name
  for (var i = 0; i < files.snapshotLength; i++) {
    var e = files.snapshotItem(i);
	var url = e.href;
	    unsafeWindow.console.log(e);  // debug
	    unsafeWindow.console.log(url);  // debug
	check(url,e);

  } // fin for

  

  





