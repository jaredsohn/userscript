// ==UserScript==
// @name           Logout weiterleitung
// @namespace      http://userscripts.org/scripts/show/16474
// @description    Leitet die "Logout erfolgreich" auf den Index um, sodass man diese stressende Werbeseite nicht mehr sehen muss.
// @include        http://www.die-staemme.de/logout.php
// ==/UserScript==

(function(){
    
    window.location.href = "http://www.die-staemme.de";

})();