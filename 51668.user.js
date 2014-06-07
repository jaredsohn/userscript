// ==UserScript==
// @name           TPB Highlight most seeders for TV Shows
// @namespace      macmanus
// @description    If you go to a season's episodes on TPB, for each episode, this script will highlight the one with the most seeders. It will also add a textbox containing links to the torrent files with the most seeders for each episode, making it easy to copy paste to your favourite torrent client.
// @include        http://thepiratebay.org/tv/*
// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

function evaluateShort(xpathExpr, sourceElem) {
 return document.evaluate(
    xpathExpr,
    sourceElem,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
}

var rows = evaluateShort("//table[@id='searchResult']//tr", document);
GM_log(rows.snapshotLength);
var episodeRegex = new RegExp(/s[0-9][0-9]e[0-9][0-9]/i);
var episodes = {};
var episodeNames = new Array();
for(var i = 0; i < rows.snapshotLength; i++) {
  var torName = evaluateShort("./td[2]/a", rows.snapshotItem(i)).snapshotItem(0);
  if (torName != null) {
    var torEpisode = episodeRegex.exec(torName);
    if (episodes[("" + torEpisode).toLowerCase()] == null) {
GM_log(("" + torEpisode).toLowerCase());
       episodes[("" + torEpisode).toLowerCase()] = rows.snapshotItem(i);
       episodeNames.push(("" + torEpisode).toLowerCase());
    } else {
       // compare
       var currSeeders = parseInt(evaluateShort("./td[last()-1]", rows.snapshotItem(i)).snapshotItem(0).innerHTML);
       var highestSeeders = parseInt(evaluateShort("./td[last()-1]", episodes[("" + torEpisode).toLowerCase()]).snapshotItem(0).innerHTML);
       if (currSeeders > highestSeeders) {
         episodes[("" + torEpisode).toLowerCase()] = rows.snapshotItem(i);
       }
    }
  }
}
if (episodeNames.length > 0) {
  var resDiv = document.createElement("div");
  resDiv.style.textAlign = "center";
  var resTextArea = document.createElement("textarea");
  resTextArea.cols = 140;
  resTextArea.rows = episodeNames.length;
  resTextArea.value = "";
  resDiv.appendChild(document.createTextNode("The torrent files with the most seeders for each episode:"));
  resDiv.appendChild(document.createElement("br"));
  resDiv.appendChild(resTextArea);

  var targetElem = evaluateShort("/html/body/h2", document).snapshotItem(0);
  targetElem.appendChild(resDiv);

  for(var j = 0; j < episodeNames.length; j++) {
    episodes[episodeNames[j]].style.background = "#ff5500";
    resTextArea.value = resTextArea.value + (j != 0 ? "\n" : "") + evaluateShort("./td/a[img/@class = 'dl']", episodes[episodeNames[j]]).snapshotItem(0).href;
  }
}