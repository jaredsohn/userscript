// ==UserScript==
// @name           Transporter x500
// @namespace      ikariam
// @include        http://s10.ikariam.fr/index.php?view=transport&destinationCityId=*
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

(function() {
$("#slider_wood_min").attr('href','#');
$("#slider_wood_min").click(function(){$("#textfield_wood").value("500");});
}());