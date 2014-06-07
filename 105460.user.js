// ==UserScript==
// @name            BernankeVoice
// @namespace       fredludd@gmail.com,2011-06-24:b#v1
// @include         *
// @description     A Bernanke re-vocalizer: replaces "Bernanke said" with "Bernanke whimpered", "Bernanke giggled", etc.
// @description     Inspired by Harry Hutton -- http://chasemeladies.blogspot.com/2011/06/bernanke-generator.html
// ==/UserScript==

function adjust() {
  var tgtName = "Bernanke";
  var noise = ["whimpered","snarled","chortled","yelped","sneered","tittered","roared","guffawed","sobbed","whined","lied",
              "complained","griped","groused","snapped","chuckled","sqealed","cried","scoffed","jeered","sniffled",
              "snickered","giggled","laughed","howled","snapped","blurted","shouted","wailed","blubbered","moaned"];
  var articu = tgtName+" said";
  var nodes=document.evaluate("/html/body//*/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for(var j=0; j<nodes.snapshotLength; j++) {
    var tnode = nodes.snapshotItem(j);
    var newnoise = noise[Math.floor(Math.random()*noise.length)];
    tnode.nodeValue = tnode.nodeValue.replace(articu+".",tgtName+" "+newnoise+".");
    tnode.nodeValue = tnode.nodeValue.replace(articu+" ",tgtName+" "+newnoise+" that ");
  }
}

window.onload = adjust();

//bernankevoice.user.js
