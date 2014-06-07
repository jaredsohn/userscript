// ==UserScript==
// @name           Google -- rgb to hex
// @namespace      googlergbtohex
// @description    Converts RGB to hex values if entered in the Google search bar.
// @version        3
// @include        *://www.google.*/*
// ==/UserScript==
//
//
// Email me here with questions, comments, job opportunities, and cash offers:
// rgbtohex@flyingsoft.phatcode.net
// Or:
// https://www.gittip.com/agamemnus/
//
// New: version 3 should work on the current Google website as of 10/25/2013.


if (typeof addEvent != 'function') {
 var addEvent = function(o, t, f, l) {
  var d = 'addEventListener', n = 'on' + t
  if (o[d] && !l) return o[d](t, f, false)
  if (!o._evts) o._evts = {}
  if (!o._evts[t]) {
   o._evts[t] = {}
   if (o[n]) addEvent(o, t, o[n], l)
   o[n] = new Function('e',
    'var r = true, o = this, a = o._evts["' + t + '"], i; for (i in a) {' +
    'o._f = a[i]; if (o._f._i) r = o._f(e||window.event) != false && r;' +
    '} o._f = null; return r')
  }
  if (!f._i) f._i = addEvent._i++
  o._evts[t][f._i] = f
  if (t != 'unload') addEvent(window, 'unload', function() {removeEvent(o, t, f, l)})
 }
 addEvent._i = 1
 var removeEvent = function(o, t, f, l) {
  var d = 'removeEventListener'
  if (o[d] && !l) return o[d](t, f, false)
  if (o._evts && o._evts[t] && f._i) delete o._evts[t][f._i]
 }
}

function rgb (r, g, b) {return ubyteToHex (r) + ubyteToHex (g) + ubyteToHex (b);}

function ubyteToHex (n) {
 // Error checking:
 // if (n == null) return "00";
 // n=parseInt(n);
 // if (n==0 || isNaN(n)) return "00";
 // n = Math.max (0,n);
 // n = Math.min (b, 255);
 // n = Math.round(N);
 return "0123456789ABCDEF".charAt ((n - n % 16) / 16) + "0123456789ABCDEF".charAt (n % 16)
}

function testForHexQuery () {
 var curhref = decodeURI(window.location.href)
 var initial_search_string = "q=rgb"
 var i = curhref.indexOf(initial_search_string); if (i == -1) return
 var last_parens_position = curhref.indexOf(")", i)
 var start_position = i + initial_search_string.length
 var rgbString = curhref.substr(start_position + 1, last_parens_position - start_position - 1)
 var rgbArray =  rgbString.split ("%2C")
 alert("Hex value: #" + rgb(rgbArray[0], rgbArray[1], rgbArray[2]) )
}

testForHexQuery ()

addEvent (window, 'hashchange', function () {
 testForHexQuery ()
})