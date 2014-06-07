// ==UserScript==
// @name            THE WEST RO - Buton WESTATS
// @description    Langa butonul Logout adauga un buton pt WestStats
// @include          http://ro*.the-west.*/game.php*
// ==/UserScript==


var button = document.createElement('a');
button.innerHTML = '<img id="button_unten" alt="" src="http://img543.imageshack.us/img543/9769/milehelp.png" />';
document.getElementById('footer_menu_right').insertBefore(button, document.getElementById('footer_menu_right').firstChild);
button.href = "http://tw-db.info/index.php?lang=ro#";
button.target="_blank";