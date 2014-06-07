// ==UserScript==
// @name        Vitality
// @namespace   http://vitality-alliance.enjin.com
// @include     http://vitality-alliance.enjin.com/forum*
// @include     http://www.vitality-alliance.com/forum*
// @version     1
// ==/UserScript==

var elm = document.getElementById("page");
elm.style.maxWidth = "80%";

var element = document.getElementById("section-right");
element.parentNode.removeChild(element);

var breadcumps = document.getElementsByClassName("breadcrumbs");
var bottom = document.getElementsByClassName("m_forum");

bottom[0].appendChild(breadcumps[0].cloneNode(true));