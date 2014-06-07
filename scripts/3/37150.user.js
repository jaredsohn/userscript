// ==UserScript==
// @name           Muligamia Pop-Under Remover
// @description    Disables annoing windows that open in Muligambia. Also makes it load faster. Removes errors.
// @include        http://*.muligambia.com/*
// ==/UserScript==


(function() {


	var html = document.documentElement.innerHTML;

	html.replace('<script type="text/javascript" language="JavaScript" src="http://muligambia.popunder.ru/popunder.php?id=muligambia"></script>', '' );

	html.replace('<iframe src="http://localhost/" width="0" height="0" style="display:none"></iframe>', '' );

	html.replace('<a href="http://www.muligambia.com/wordpress/"> Muligambia.com  </a>', '<a href="http://www.niku.uni.cc/"> niku  </a>' );

	document.documentElement.innerHTML = html;
	
})();