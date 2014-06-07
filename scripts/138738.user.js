// ==UserScript==
// @id             youversion-parallel-drag@dt.in.th
// @name           YouVersion - Draggable Paragraphs in Parallel Mode
// @version        1.0
// @namespace      dt.in.th
// @author         the DtTvB
// @description    Allows you to drag the paragraphs in parallel mode to align them.
// @include        http://www.youversion.com/bible/*
// @run-at         document-start
// ==/UserScript==

(function() {

document.addEventListener('mousedown', mousedown, true)
document.addEventListener('mousemove', mousemove, true)
document.addEventListener('mouseup', mouseup, true)
var target, last
function mousedown(e) {
  var c = e.target
    , t
    , pass = false
  if (!document.documentElement.classList.contains('parallel_mode')) return
  while (c) {
    if (c.hasAttribute && c.hasAttribute('data-reference')) pass = true
    if (!t) {
      if (c.nodeName == 'P' || c.nodeName == 'H2') {
        t = c
      }
    }
    c = c.parentNode
  }
  if (!pass) return
  target = t
  last = e.pageY
}
function mousemove(e) {
  if (!target) return
  var delta = e.pageY - last
  target.style.paddingTop = (parseInt(target.style.paddingTop, 10) || 0) + delta + 'px'
  last = e.pageY
}
function mouseup() {
  if (!target) return
  target = null
}

})()

