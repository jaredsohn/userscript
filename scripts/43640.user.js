// ==UserScript==
// @name           Megatokyo Navigation
// @namespace      aleksandr.pasechnik.com
// @description    Enables arrow key navigation
// @include        http://*megatokyo.com/strip*
// ==/UserScript==

function keyDown(e)
{
  var KeyID = e.keyCode;
  switch(KeyID)
  {
    case 39:
      var allNext = document.evaluate(
        "//li[@class='next']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
      for (var i=0; i<allNext.snapshotLength; i++)
      {
        thisNext = allNext.snapshotItem(i);
        var a = thisNext.innerHTML;
        var start = a.indexOf('href="./')+'href="./'.length
        var end = a.indexOf('">')
        window.location.href = 'http://www.megatokyo.com/'+a.slice(start,end);
        break;
      }
      break;
    case 37:
      var allPrev = document.evaluate(
        "//li[@class='prev']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
      for(var i=0; i<allPrev.snapshotLength; i++)
      {
        var thisPrev = allPrev.snapshotItem(i);
        var a = thisPrev.innerHTML;
        var start = a.indexOf('href="./')+'href="./'.length
        var end = a.indexOf('">')
        window.location.href = 'http://www.megatokyo.com/'+a.slice(start,end);
        break;
      }
      break;
  }
}

window.addEventListener("keydown", keyDown, true);