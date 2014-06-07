// ==UserScript==
// @name           Utopia - Change Kingdom with Cursor
// @namespace      utopia-game.com
// @include        http://utopia-game.com/wol/game/kingdom_details
// ==/UserScript==


var doLog                 = 0;		// 1 ... logging; 0 or everything else ... no loggin
var loadingAlready 	  = 0;

//*******___***************************/
function log (str) {
  if (doLog != null && doLog == 1)
  {
    console.log (str) ;
  }
}

function doXpath(query) {
	var result = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return result;
} // doXpath()

function handleArrowKeys(evt) {
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt) {
        log ("event: " + evt.keyCode);
        switch (evt.which) {
            case 37:			// left
                goToPrevious();
                break;    
            case 39:			// right
                goToNext();
                break;    
         }
    }
}

function goToPrevious () {
  var location = "/html/body/div[1]/div[1]/div[3]/form/table/tbody/tr[2]/td/div/a[1]";
  
  goToLocation (location);
}

function goToNext () {
  var location = "/html/body/div[1]/div[1]/div[3]/form/table/tbody/tr[2]/td/div/a[2]";

  goToLocation (location);
}

function goToLocation (location) {
  var locationLink = doXpath (location).snapshotItem (0);
  
  if (locationLink != null && loadingAlready == 0) {
    loadingAlready = 1;
    log ("location: " + locationLink.href);
    log ("loadingAlready: " + loadingAlready);
    window.location.href = locationLink.href;
    cursor:wait;
  }
  else if (locationLink == null) {
    console.log ("location could not be found! (script: change_kingdom)");
  }
}

document.addEventListener("keyup", handleArrowKeys, true);