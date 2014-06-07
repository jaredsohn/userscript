// ==UserScript==
// @name		 VN-Zoom Clear View

// @version	1
// @description		 VN-Zoom Clear View
// @include			http://www.vn-zoom.com/*
// ==/UserScript==

(function(a){a.getElementById("pagetitle").parentNode.style.marginRight=null;var a=a.getElementById("footer").parentNode,b=a.childNodes;a.removeChild(b[b.length-6])})(document);