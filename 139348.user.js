// ==UserScript==
// @name        9GAG Fast AWESOMEINATOR!
// @namespace   awesomize
// @description Makes every single 9GAG image funny again! Guaranteed, or money back!
// @include     http://9gag.com/fast*
// @version     11111one(lim (x→0) ((sin x)/x))
// ==/UserScript==

function awesomize(entry) {

  // Shortcuts
  var style = document.styleSheets[2]
  var rules = style.cssRules
  var a = entry.firstElementChild.firstElementChild.firstElementChild.children[2]
  var img = a.firstElementChild
  // var comments = 

  // Awesomeinator
  a.appendChild(document.createElement("br"))
  var awesome = document.createElement("img")
    awesome.id = "AWESOME"
    awesome.src = "http://cdn.memegenerator.net/instances/400x/24010868.jpg"
    awesome.width = img.width
    awesome.alt = "Ancient Aliens Guy: “Retards”"
    style.insertRule("#AWESOME { margin: -46px 0 45px -1px; padding-top: 5px; background: #000 }", rules.length)
  a.appendChild(awesome)
  img.addEventListener("load", function (e) { awesome.width = img.width },false)

  // Herp derp derp
  // Cumming soon!

}
document.getElementById("block-content").addEventListener("DOMNodeInserted", function(e) {
  var node = e.target
  if (node.nodeType == node.ELEMENT_NODE && node.nodeName == "DIV" && node.className == "fast-flip-item")
    awesomize(node)
}, false)