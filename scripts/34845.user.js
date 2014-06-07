// ==UserScript==
// @name           Lycos (iQ) Forum Autologin II
// @namespace      Lycos iQ
// @description    Trägt Benutzernamen und Passwort in die dafür vorgesehenen Eingabemasken ein und meldet dich an
// @include        http://forum.lycos.de/fd/252/LYCOS+iQ.html
// @include        http://forum.lycos.de/*

var email_conf = GM_getValue('email');
var password_conf = GM_getValue('password');

var login_form = document.forms[1];
var email_form = document.getElementById('navbar_username');
var password_form = document.getElementsByName('password')[0];


GM_registerMenuCommand('Account-Informationen festlegen', setYourLogin);
GM_registerMenuCommand('Account-Informationen zuruecksetzen', clearYourLogin);


function setYourLogin()
{
var email_prompt = prompt('Bitte gib deinen Lycos Forum Benutzernamen ein:', (email_conf ? email_conf : ''));
if(email_prompt)
{
GM_setValue('email', email_prompt);

var password_prompt = prompt('Bitte gib dein Lycos Forum Passwort ein:');
if(password_prompt)
GM_setValue('password', password_prompt);
}
}

function clearYourLogin()
{
GM_setValue('email', '');
GM_setValue('password', '');

alert('Deine Daten wurden wieder geloescht!');
}

function init(){
if(email_form){
if(!email_conf) {
alert("Du hast noch keine Login-Informationen gespeichert!");
setYourLogin();
location.reload();
} else {
if (document.URL.indexOf('lsu_err_msg')<0) {
email_form.value = email_conf;
password_form.value = password_conf;
login_form.submit();
}
}
}
}

init();

// ==/UserScript==





// ==/UserScript==