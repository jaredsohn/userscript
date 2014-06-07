// ==UserScript==
// @name       Sadistic - Usuwacz reklam
// @namespace  http://hl2.boo.pl
// @version    1.0
// @description  Usuwa reklamy na strone sadistic.pl i pozwala używać CpasLocka w komentarzach.
// @include   *sadistic.pl*
// @copyright  2013+, Maciej Kuśnierz
// @require			http://code.jquery.com/jquery-2.0.2.min.js
// ==/UserScript==
$(document).ready(function() {
    $("article.images[style]").hide();
    unsafeWindow.capLock = function(event) { return true; };
});