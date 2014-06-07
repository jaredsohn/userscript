// ==UserScript==
// @name           Disable Magento Overlay Frame
// @description    Disables the useless iframe that magentocommerce.com overlays every page with
// @namespace      https://cloudbro.net/Scripts 
// @author         nicka101 (http://userscripts.org/users/nicka101) 
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//(optional) may be used by browsers to display an about link
// @homepage       https://cloudbro.net/Scripts/About
// @version        1.3
// @include        http://*
// @history        1.3 Installed domready from https://github.com/ded/domready
// @history        1.2 Turns out Artiom is stupid and didn't fix shit
// @history        1.1 Artiom fixed my script
// @history        1.0 first version
// ==/UserScript==

/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})

domready(function() {
	var overlay = document.getElementById('OverlayIframe');
	if (overlay) {
		console.log(overlay);
		overlay.parentNode.remove(overlay);
	}
});