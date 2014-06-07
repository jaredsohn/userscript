// ==UserScript==
// @name           Utopia - Space Optimization
// @namespace      utopia-game.com
// @description    Removes some of the content, that is not necessary for the game.
// @include        http://utopia-game.com/wol/game/throne
// ==/UserScript==


function doXpath(query) {
	var result = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return result;
} // doXpath()

var css = <><![CDATA[
table#resource-bar { width: 700px; border: 0px; }
div.middle-box { width: 820px; align: 'center'; }
div.container { margin: 2px auto; }
]]></>.toString();

GM_addStyle(css);


var headerStr = "/html/body/div[1]/div[1]/div[1]";

var header    = doXpath (headerStr).snapshotItem (0);

if (header != null) {
  header.style.display = 'none';
}

var throneStats = document.getElementById ("throne-statistics");

if (throneStats != null) {
  throneStats.style.width = '650px'
  
  var center_node = document.createElement ("CENTER");
  throneStats.parentNode.insertBefore(center_node, throneStats);
  throneStats.parentNode.removeChild(throneStats);
  center_node.appendChild(throneStats);
}
