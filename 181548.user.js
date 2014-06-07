// ==UserScript==
// @name       Switch Character Easily
// @namespace  popmundo / 1020058
// @version    1.0
// @description Character switch on selection. | Karakter seçiminde otomatik olarak geçiş yapar.
// @match      http://*.popmundo.com/*
// @copyright  2013, gcd
// ==/UserScript==

function degistir() {
document.getElementById("ctl00_ucCharacterBar_btnChangeCharacter").click();}
document.getElementById("ctl00_ucCharacterBar_ddlCurrentCharacter").addEventListener("change", degistir, true);
document.getElementById("ctl00_ucCharacterBar_btnChangeCharacter").style.display="none";