// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Ledo
// @description    Force redirect of main Centeron page to the By Host Group > Details page
// @include        http://www.ledo.hr/v4/hr/aktualno/novi_bubi/novi_bubi.asp
// ==/UserScript==

(function() {
    window.location.href = 'javascript:chkFormu();';2
})();