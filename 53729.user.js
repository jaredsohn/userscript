// ==UserScript==
// @name           what.cd: upload: tag dotter
// @namespace      http://what.cd
// @description    adds dots to your tags
// @include        https://ssl.what.cd/upload.php*
// @include        http://*what.cd/upload.php*
// ==/UserScript==

var tag = document.getElementById('tags');
tag.addEventListener('blur', function() {
	tag.value = tag.value.replace(/\b\s\b/g,'.');
}, false);