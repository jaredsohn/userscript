// ==UserScript==
// @name		bb28/jandown/mimima/onlyff popup blocker
// @description		block popup window from mimima
// @author		Gea-Suan Lin
// @version		0.5 (December 7, 2009)
// @include		http://www*.bb28.info/dio/download.php*
// @include		http://www*.jandown.com/link.php*
// @include		http://www*.jandown.info/link.php*
// @include		http://www*.mimima.com/link.php*
// @include		http://www*.onlyff.com/link.php*
// ==/UserScript==

(function(){
    var f = document.getElementsByTagName('form');
    if (f) {
        f[0].setAttribute('onSubmit', '');
    }
})();