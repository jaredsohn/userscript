// ==UserScript==
// @name           magyarorszag.hu dokumentumfeltolto e-mail ertesites kivalaszto
// @namespace        (Ertesites kuldese:   Ugyfelkapus e-mail postafiok)
// @description    A magyarorszag.hu egyszerusitett dokumentumfeltoltojeben automatikusan bejeloli az ugyfelkapus e-mail postafiokot.
// @include        http*://www.magyarorszag.hu/allampolgar/szolgaltatasok/feltoltes*
// ==/UserScript==


(function() {
  document.getElementById('kozmunotification2').checked = true;
 })();