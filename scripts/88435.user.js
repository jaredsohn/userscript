// ==UserScript==
// @name           Moodle_Autologin
// @description    connexion automatique (sous condition d'avoir enregistré ses identifiants et mots de passe)
// @namespace      https://userscripts.org/scripts/show/88435
// @include        http://moodle.univ-lille1.fr/
// @include        http://moodle.univ-lille1.fr/login/index.php
// @include        https://sso-cas.univ-lille1.fr/login?service*
// ==/UserScript==

function xpath(expr) {
    return document.evaluate(expr, document, null, XPathResult.ANY_TYPE, null);
}
// Renvoyer si pas loggué
if (xpath("//a[contains(@href,'/login/index.php')]").iterateNext() ||
// POUR LES "AUTRES UTILISATEURS" CHANGER : =CAS PAR =NOCAS
    xpath("//a[contains(@href,'authCAS=CAS')]").iterateNext())
{
    location.href = "https://sso-cas.univ-lille1.fr/login?service=http%3A%2F%2Fmoodle.univ-lille1.fr%2Flogin%2Findex.php%3FauthCAS%3DCAS";
}

   var form = document.getElementsByTagName('form')[0];

   var uid = form.elements.namedItem('username');
   var pw = form.elements.namedItem('password');

function doSignIn() {
  if(uid.value.length && pw.value.length) {
     form.submit();
  }
}

window.addEventListener("load", doSignIn, false);