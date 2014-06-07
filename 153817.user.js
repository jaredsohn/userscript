// ==UserScript==
// @name       memelike.net Like Remover
// @namespace  http://bensoft.de/
// @version    1.1
// @description  Entfernt die Like-Verpflichtung auf memelike.net
// @match      http://memelike.net/pictures.php*
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// @copyright  2012+, bensoft.de
// ==/UserScript==
$('#fblikeapp').remove();
$('#img > img').removeClass('deface');