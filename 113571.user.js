(function() {

// ==UserScript==
// @name          Remove Google Plus launch bling
// @namespace     http://bleeter.net
// @icon          
// @description   Kill Google's tapdancing blue arrow & other bling for Plus going public
// @copyright     2011, Peter Lawler & Jerome Leclanche.
// @license       Public Domain
// @version       0.0.3
//
// @include   http://www.google.*
//
// ==/UserScript==


var e = document.getElementById("hplogoi")
if (e) { e.style.display = "none" }

var f = document.getElementById("prm")
if (f) { f.style.display = "none" }

})();