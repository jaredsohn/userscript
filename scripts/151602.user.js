// ==UserScript==
// @name OGame: Cargos necessary
// @namespace http://userscripts.org/users/36331
// @description OGame: Number of cargos necessary to transport all resources
// @version 5.0.1
// @include http://*.worldogame.ru.*/game.php?page=overview*
// ==/UserScript==


function ref_resh(){
document.location.href=window.location.href;
}
setInterval('ref_resh()', '5000');

