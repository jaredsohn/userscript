// ==UserScript==
// @name           What.CD Hide "do not upload"-list
// @author		   dewey
// @namespace      dnu
// @include        http://what.cd/upload.php*
// @include        https://ssl.what.cd/upload.php*
// ==/UserScript==

var child = document.getElementById('dnu_header');
child.parentNode.style.display = "none";