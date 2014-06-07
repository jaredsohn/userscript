// ==UserScript==
// @name            FeedlyTool mini Remove ADs
// @version         0.0.1
// @author          kik0220
// @namespace       https://sites.google.com/site/feedlytool/
// @description     This is the edition that was limited to ads remove feature Chrome extension of "FeedlyTool".
// @description:ja  Chrome拡張「FeedlyTool」の広告削除機能に限定したものです。
// @icon            http://feedlytool.kk22.jp/icon.png
// @match           http://feedly.com/*
// @match           https://feedly.com/*
// @exclude         http://feedly.com/#welcome
// @exclude         https://feedly.com/#welcome
// @copyright       2013+, kik0220
// ==/UserScript==

var adsKeyword = new RegExp("(PR\\s*[:：]|AD\\s*[:：]|[［\\[]\\s*PR\\s*[\\]］])", "i");
main();

function main(){
  document.body.addEventListener("DOMNodeInserted", function (e){
    var entry = e.target;
    try {
      if (entry.className.indexOf('u0Entry') > -1) {
        var title = entry.getElementsByClassName('title')[0];
        if(title) {
          adsRemove(entry);
        }
      }
    } catch (e2) {}
  }, false);
}

function adsRemove(entry){
  var title = '';
  try {
    title = entry.attributes.getNamedItem('data-title').value;
    if (!title.toUpperCase().match(adsKeyword)) {
      return;
    }
  } catch(e) {
    return;
  }
  var tool = entry.getElementsByClassName('condensedTools')[0];
  var close;
  if (tool !== undefined) {
    close = tool.childNodes[tool.childNodes.length - 2];
  } else {
    close = entry.getElementsByClassName('viewerIcon highlightableIcon')[0];
  }
  try{
    close.click();
  } catch(e) {}
}
