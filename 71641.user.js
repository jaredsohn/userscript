// ==UserScript==
// @name           wykop poleca :P
// @include        http://*.wykop.pl/
// @include        http://wykop.pl/
// ==/UserScript==

$= unsafeWindow.jQuery;
 $(unsafeWindow.document).ready(function() {
	$('li.recommends"').each(function(index) {
	$(this).parent().parent().parent().hide();
  });

 });
