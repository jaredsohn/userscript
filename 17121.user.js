// ==UserScript==
// @name           Imagefap pop-under remover
// @description    Disables annoing window that opens after clicking anywhere on page.
// @include        http://*.imagefap.com/*
// @include        http://imagefap.com/*
// ==/UserScript==


(function() {


	

	var html = document.documentElement.innerHTML;

	html.replace('<script type="text/javascript" language="JavaScript" src="http://eas.apm.emediate.eu/eas?cu=3973;cre=mu;js=y;target=_blank"></script>', '' );

	document.documentElement.innerHTML = html;
	
})();