// ==UserScript==
// @name           Utopia - Add Menu Links
// @namespace      utopia-game.com
// @description    Adds some links to the menu of the game Utopia.
// @include        http://utopia-game.com/wol/*
// ==/UserScript==

var doLog                 = 0;		// 1 ... logging; 0 or everything else ... no loggin

//*******___***************************/
function log (str) {
  if (doLog != null && doLog == 1)
  {
    console.log (str) ;
  }
}

function insertAfter(new_node, existing_node) {
	// if the existing node has a following sibling, insert the current
	// node before it. otherwise appending it to the parent node
	// will correctly place it just after the existing node.
	if (existing_node.nextSibling) {
		// there is a next sibling. insert before it using the mutual
		// parent's insertBefore() method.
		existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
	} else {
		// there is no next sibling. append to the end of the parent's
		// node list.
		existing_node.parentNode.appendChild(new_node);
	}
} // insertAfter()


// Add our custom styles
var css = <><![CDATA[
div.middle-box { min-height: 550px; }
]]></>.toString();

GM_addStyle(css);

function doXpath(query) {
	var result = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return result;
} // doXpath()


// {{{ Inserts after the Throne link a link to the Council
var throneLinkStr = "/html/body/div[1]/div[1]/div[2]/div/ul[1]/li[1]";

var throneLink = doXpath (throneLinkStr).snapshotItem (0);

if (throneLink != null) {
  var stateLink  = document.createElement("li");
  var link       = document.createElement("a");
  
  link.href      = "/wol/game/council_state";
  link.innerHTML = "Council";
  stateLink.appendChild (link);
   
  insertAfter (stateLink, throneLink);
}
  // }}}

// {{{ Redirects the news link to the kingdom news instead of the province news
var newsLinkStr = "/html/body/div[1]/div[1]/div[2]/div/ul[1]/li[4]/a";

var newsLink = doXpath (newsLinkStr).snapshotItem (0);

if (newsLink != null) {
  log ("newslink");
  newsLink.href = "/wol/game/kingdom_news";
  log ("newslink");
}
// }}}


// {{{ Inserts after the Self Spells link a link for Offensive Magic
var magicLinkStr = "/html/body/div[1]/div[1]/div[2]/div/ul[3]/li[1]";

var magicLink = doXpath (magicLinkStr).snapshotItem (0);

var link      = magicLink.firstChild;

link.innerHTML = "Self Spells";

if (magicLink != null) {
  var offMagicLink  = document.createElement("li");
  var link       = document.createElement("a");
  
  link.href      = "/wol/game/sorcery";
  link.innerHTML = "Sorcery";
  offMagicLink.appendChild (link);
  
  insertAfter (offMagicLink, magicLink);
}
// }}}
  
// {{{ Removes Mystic Tabs (Self Spells / Combat Spells) on the Mystic pages
var mysticTabsStr      = "/html/body/div[1]/div[1]/div[3]/div[1]";
var linkDescriptionStr = "/html/body/div[1]/div[1]/div[3]/div[1]/ul/li[1]/a/span";

log ("mystictab");

var mysticTab       = doXpath (mysticTabsStr).snapshotItem (0);
var linkDescription = doXpath (linkDescriptionStr).snapshotItem (0);

//log ("mystictab: '" + linkDescription.innerHTML + "'");

if (mysticTab != null && linkDescription != null && linkDescription.innerHTML == ("Self&nbsp;Spells")) {
  log ("mystictab");
  mysticTab.style.display = 'none';
  log ("mystictab");
  
  var mysticTableStr = "/html/body/div[1]/div[1]/div[3]/div[2]";
  
  var mysticTable    = doXpath (mysticTableStr).snapshotItem (0);  
  
  if (mysticTable != null) {
    log ("mystictable");
    
    mysticTable.style.border = '0px';
  }
}
// }}}
