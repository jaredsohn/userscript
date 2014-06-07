// ==UserScript==
// @name        IBM Infocenter Cleanup
// @namespace   http://carey.geek.nz/code/userscripts/
// @description Clean up IBM Information Centers
// @include     http://publib.boulder.ibm.com/infocenter/*
// ==/UserScript==

// Copyright Â© 2006 Carey Evans.
//
// Permission to use, copy, modify, and distribute this software and its
// documentation for any purpose and without fee is hereby granted,
// provided that the above copyright notice appear in all copies and
// that both that copyright notice and this permission notice appear in
// supporting documentation.

(function(){
 var fs = document.getElementById("indexFrameset");
 if (fs) fs.rows = fs.rows.replace(/^[0-9]+/, "0");
 fs = document.getElementById("contentFrameset");
 if (fs) fs.style.background = "white";
 var root = document.getElementById("root");
 if (root) root.parentNode.style.background = "white";
})();
