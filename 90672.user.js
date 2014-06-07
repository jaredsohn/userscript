// ==UserScript==
// @name           Gamespot new releases torrent search
// @namespace      gts
// @include        http://www.gamespot.com/newthisweek.html*
// @version        3
// ==/UserScript==

var gts = function () {
  var ta = document.createElement("a")
    ta.href = "http://torrentz.eu/search?f="
    ta.title = "Search at torrentz.eu for “"
    ta.appendChild(document.createTextNode(" "))
    var i = document.createElement("img")
      i.src = "http://torrentz.eu/favicon.ico"
      i.style.width = "16px"
      i.style.height = "16px"
    ta.appendChild(i)

  var as = document.evaluate("/html/body/div/div[2]/div/div[3]/div/div/div/div/div/div/div/div/div[2]/div/div/ul/li[*]/div/div/h3/a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
  for (var n=0; n < as.snapshotLength; n++ ) {
    var a = as.snapshotItem(n)
    var ta_ = ta.cloneNode(true)
    var q = a.firstChild.data.trim().replace(/[^\w\s]/g,"","")
    ta_.href += encodeURIComponent(q)
    ta_.title += q+"”"
    a.parentNode.appendChild(ta_)
  }
}
gts()