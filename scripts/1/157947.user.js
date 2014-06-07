// ==UserScript==
// @name           Refresh auto
// @namespace      Orandin
// @description    Permet de recharger la page toutes les 10 minutes afin de garder la session active
// @include        http://www.lesroyaumes.com/EcranPrincipal.php?l=0
// @include        http://www.lesroyaumes.com/EcranPrincipal.php?l=25
// ==/UserScript==

setInterval("window.location.reload()", 600000);
