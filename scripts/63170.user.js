// ==UserScript==
// @name          Aruba-Login
// @author        Atnas, tak til Jonas Hansen
// @version       2.0.1
// @description   Lader Firefox udfylde login-felterne og logge dig ind på Arubanetworks automatisk
// @include       https://securelogin.arubanetworks.com/cgi-bin/login*
// ==/UserScript==

function $(id) { return document.getElementById(id); } // hjælper med let at vælge objekter på siden
// de vigtige objekter
var username = $('user');  // brugernavn feltet
var password = $('password');  // password fetet
var submitbtn = document.getElementsByName('Login')[0]; // submit knappen

// skift teksten på login-knappen hvis der ikke i forvejen findes login-oplysninger og udskift funktionene når man trykker med den hjemmelavede til at gemme oplysningerne
if (GM_getValue('username', false)) {
    username.value = GM_getValue('username');
    password.value = GM_getValue('password');
    submitbtn.click();
} else {
    submitbtn.value = 'Gem informationer og log ind';
    submitbtn.addEventListener("click", saveInformation, true);
}

// Gem brugernavn og kodeord
function saveInformation() {
    GM_setValue('username', username.value);
    GM_setValue('password', password.value);
}