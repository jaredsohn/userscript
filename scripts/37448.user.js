// ==UserScript==
// @name            Kwick: Auto-Login
// @description     Dieses Script fragt nach deinen Login Daten, speichert sie auf DEINEM Computer und benutzt sie, wenn du Kwick ansurfst.
// @include         http://*kwick.de*
// Auto-Login

var user_conf = GM_getValue('user');
var password_conf = GM_getValue('password');

GM_registerMenuCommand('Account-Informationen festlegen', setYourLogin);
GM_registerMenuCommand('Account-Informationen entfernen', clearYourLogin);

if(!user_conf) {
	alert("Hey! Du hast leider noch keine Account-Infos gespeichert!");
	setYourLogin();
	location.reload();
} else {
	if(document.getElementById('hku') || document.getElementById('kwick_username')) {
        if(document.getElementById('hku')&&document.getElementById('hkp')){
        document.getElementById('hku').value = user_conf;
        document.getElementById('hkp').value = password_conf;
        //document.getElementById('hsl').checked = true;
        }
        if(document.getElementById('kwick_username')&&document.getElementById('kwick_passwor+d')){
        document.getElementById('kwick_username').value = user_conf;
        document.getElementById('kwick_passwor+d').value = password_conf;
        //document.getElementById('save_login').checked = true;
        }
       document.getElementById('loginBtn').click();
	}
}

function setYourLogin()
{
	var user_prompt = prompt('Gebe bitte deinen Usernamen ein:', (user_conf ? user_conf : ''));
	if(user_prompt)
	{
		GM_setValue('user', user_prompt);
	
		var password_prompt = prompt('Nun gebe bitte dein Passwort ein:');
		if(password_prompt)
			GM_setValue('password', password_prompt);
	}
}

function clearYourLogin()
{
	GM_setValue('user', '');
	GM_setValue('password', '');
	
	alert('Deine Daten wurden erfolgreich entfernt!');
}
// ==/UserScript==