// ==UserScript==
// @name IQ_AutoLogin
// @namespace iq
// @description Lycos IQ Autologin
// @include http://iq.lycos.de/*
// @include http://*cosmiq.de/*
var email_conf = GM_getValue('email');
var password_conf = GM_getValue('password');

var login_form = document.getElementsByName('hp_login_form')[0];
var email_form = document.getElementById('membername');
var password_form = document.getElementById('password');

GM_registerMenuCommand('Account-Informationen festlegen', setYourLogin);
GM_registerMenuCommand('Account-Informationen zurÃ¼cksetzen', clearYourLogin);


function setYourLogin()
{
var email_prompt = prompt('Bitte gib deinen Lycos-IQ Benutzernamen ein:', (email_conf ? email_conf : ''));
if(email_prompt)
{
GM_setValue('email', email_prompt);

var password_prompt = prompt('Bitte gib dein Lycos IQ Passwort ein:');
if(password_prompt)
GM_setValue('password', password_prompt);
}
}

function clearYourLogin()
{
GM_setValue('email', '');
GM_setValue('password', '');

alert('Deine Daten wurden wieder gelÃ¶scht!');
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
