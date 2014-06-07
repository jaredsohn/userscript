// ==UserScript==
// @name			rmdown/maxp2p/bb28/jandown/mimima/downp2p/onlyff popup blocker
// @namespace		http://userscripts.org/scripts/show/177174
// @description		block popup window from mimima,maxp2p,rmdown,downp2p
// @updateURL		https://userscripts.org/scripts/source/177174.meta.js
// @downloadURL		https://userscripts.org/scripts/source/177174.user.js
// @author			me
// @include		http://*bb28.info/dio/download.php*
// @include		http://*jandown.com/link.php*
// @include		http://*jandown.info/link.php*
// @include		http://*mimima.com/link.php*
// @include		http://*onlyff.com/link.php*
// @include		http://*maxp2p.com/link.php*
// @include		http://*rmdown.com/link.php*
// @include		http://*downp2p.com/link.php*
// @version			2014.4.6
// ==/UserScript==


(function(){
    var f = document.getElementsByTagName('form');
    if (f) {
        f[0].setAttribute('onSubmit', '');
    }
    if (typeof(setpos)=="function") {
        document.getElementsByTagName('input')[document.getElementsByTagName('input').length-1].onclick=null
    }
})();