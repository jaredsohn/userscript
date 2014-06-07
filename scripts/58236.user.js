// ==UserScript==
// @name           GLB Open Build Scout v2
// @description    checks a page to find open builds on any player links
// @include        http://goallineblitz.com/game/*
// @exclude        http://goallineblitz.com/game/home.pl
// @exclude        http://goallineblitz.com/game/team_item_fund.pl*
// @exclude        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// ==/UserScript==

// change this text to change the message that is added
// beside the links to players of open builds
var OPEN_TEXT = " *OPEN*"

////////////////////////////////////
function doTheBullDance() {
  var results = evaluateXPath(document, "//a[contains(@href,'/game/player.pl')]");
  var playerId;
  for (var i in results) {
    playerId = results[i].href.split('player_id=')[1];
    checkBuild(playerId, results[i]);
  }
}

function checkBuild(pid, node) {
  GM_xmlhttpRequest({
      method: "GET",
      url: "http://goallineblitz.com/game/player.pl?player_id="+pid,
      headers: {
        "User-Agent": "Mozilla/5.0",            // Recommend using navigator.userAgent when possible
        "Accept": "text/xml"
      },
      onload: function(response) {
        if (response.responseText.split('div id=\"player_stats').length > 1) {
          // flag it as open
          var newFlagNode = document.createTextNode(OPEN_TEXT);  
          node.appendChild(newFlagNode);
        }
      }
  });
}

doTheBullDance();


// Evaluate an XPath expression aExpression against a given DOM node
// or Document object (aNode), returning the results as an array
// thanks wanderingstan at morethanwarm dot mail dot com for the
// initial work.
function evaluateXPath(aNode, aExpr) {
  var xpe = new XPathEvaluator();
  var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
    aNode.documentElement : aNode.ownerDocument.documentElement);
  var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
  var found = [];
  var res;
  while (res = result.iterateNext())
    found.push(res);
  return found;
}

