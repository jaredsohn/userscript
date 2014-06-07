// ==UserScript==
// @name          Lectio-Login
// @author        Jonas Hansen
// @version       2.0.1
// @namespace     http://www.meinertz.org/
// @description   Lader Firefox udfylde login-felterne og logge dig ind på Lectio automatisk
// @include       https://www.lectio.dk/lectio/*/login.aspx*
// ==/UserScript==

function $(id) { return document.getElementById(id); } // hjælper med let at vælge objekter på siden
// de vigtige objekter
var username = $('m_Content_username2');  // brugernavn feltet
var password = $('m_Content_password2');  // password fetet
var submitbtn = $('m_Content_submitbtn'); // submit knappen

// skift teksten på login-knappen hvis der ikke i forvejen findes login-oplysninger og udskift funktionene når man trykker med den hjemmelavede til at gemme oplysningerne
if (GM_getValue('username', false)) {
    username.value = GM_getValue('username');
    password.value = GM_getValue('password');
    submitbtn.click();
} else {
    submitbtn.value = 'Gem oplysninger og log ind';
    submitbtn.addEventListener("click", saveInformation, true);
}

// Gem brugernavn og kodeord
function saveInformation() {
    GM_setValue('username', username.value);
    GM_setValue('password', password.value);
}