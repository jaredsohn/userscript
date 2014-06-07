// ==UserScript==
// @name		 vOz Clear View

// @version	1
// @description		 vOz Clear View
// @include			http://vozforums.com/*
// ==/UserScript==

(function(a){a.getElementById("pagetitle").parentNode.style.marginRight=null;var a=a.getElementById("footer").parentNode,b=a.childNodes;a.removeChild(b[b.length-6])})(document);