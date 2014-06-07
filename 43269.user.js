// ==UserScript==
// @name           Re-examiner
// @namespace      http://www.defhoboz.biz/
// @description    Cut all the excess crap out of site
// @include        http://www.examiner.com/*
// @include        http://examiner.com/*
// ==/UserScript==
//  /html/body/div    
//  /html/body/div[2]/div[2]
//  //*[@id="clamshell"]
//  /html/body/div[3]/div[2]/div[3]/div/div
//  /html/body/div[3]/div[2]/div[3]/div[3]/div
var snapshotToArray = function(snapshot){var ar = new Array();for (var i = 0; i < snapshot.snapshotLength; i++) {ar.push(snapshot.snapshotItem(i));} return ar; }
var $x = function(xpath, node){ if (!node) node = document;	var result = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); return snapshotToArray(result); }

// Erase!
var erasable = new Array(
  "//*[@class='headerbg']",
  "//*[@id='body_content']/div[1]",
  "//*[@class='examiners_rightcol']",
  "//*[@id='clamshell']"
)
for(var s in erasable) {
  try {
    $x(erasable[s],document)[0].style.display="none"
  } catch (e) {}
}

// Rearrange!
try { $x("//*[@class='examiners_main_content']",document)[0].style.width="950px"; } catch(e) {}