// ==UserScript==
// @name           Usuwacz gwiazdy
// @namespace      fotka.pl
// @description    Usuwa ikonkę gwiazdy na fotce - zmiana widoczna dla wszysctkich
// @include        http://www.fotka.pl/konto_gwiazda.php
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){


  $('html body div#siteContainer div#strona div.html div div.buy_color:first').before('<div class="buy_color">Jeśli nie chcesz gwiazdy użyj tego przycisku aby usunąć to paskudctwo ze swojego loginu.<br><input type="button" style="float:right;margin-top:3px;" onclick="gwiazda=\'1\';color = kolory_gwiazd[1];$(\'#kolor_loginu\').val(color);zmienKolor();$(\'#gwiazda_aktualna\').hide();" value="Usuń logo gwiazdy" class="button"><br><br><br></div>');


});