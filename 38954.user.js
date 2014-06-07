// ==UserScript==
// @name           Fast random profile viewer for humanpets.com
// @namespace      http://pemberton.dnsdojo.com
// @include        http://humanpets.com/home.php
// ==/UserScript==
var logo = document.createElement("div");
logo.innerHTML = '<div id="pleaseKillMe"> ' +
'<script type="text/javascript"> ' +
'function forEver() { ' +
'doSubmit(\'searchForm\', \'http://humanpets.com/flash.php?flashIndex=1\', \'profileBox\', flipHeadMenu); ' +
't = setTimeout("forEver()", 200); ' +
'} ' +
'window.addEventListener(\'DOMNodeInserted\', ' +
'function(e) { ' +
'var m = /Max 3000 pts\\/day of profile viewing reached/; ' +
'if(m.test(e.target.innerHTML)) { ' +
'window.location = "http://humanpets.com/invite.php";' +
'} ' +
'}, ' +
'true); ' +
'</script> ' +
'</div>';
document.body.insertBefore(logo, document.body.firstChild);

window.addEventListener('DOMNodeInserted',
	function(e) {
		var m = /doSubmit\('searchForm', 'http:\/\/humanpets.com\/flash.php\?flashIndex=1', 'profileBox', flipHeadMenu\);/;
		var n = "forEver();";
		if(m.test(e.target.innerHTML)) {
			oldText = e.target.innerHTML;
			var newText = oldText.replace(m, n);
			e.target.innerHTML = newText;
		}
	},
	true);
