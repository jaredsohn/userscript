// ==UserScript==
// @name           ICA-banken autologin
// @namespace      http://henrik.nyh.se
// @description    Logs in automatically to ICA-banken. Simply add a bookmark to https://www.icabanken.se/Secure/Login/LoginPw.aspx?JSEnabled=1&Pnr=NUM#simple where NUM is your full "personnummer", e.g. 8310151234. The first time you visit that URL, you will be prompted for your PIN code. The code will then be used to log you in automatically whenever you visit the bookmarked URL. You can change the stored PIN through a command in the Greasemonkey menu when at ICA's site. Please note that your PIN will be blocked if you get it wrong three times in a row, so don't play around too much (I did :p).
// @include        http://www.ica.se/*
// @include        http://icabanken.ica.se/*
// @include        https://icabanken.ica.se/*
// @include        https://www.icabanken.se/*
// ==/UserScript==

GM_registerMenuCommand("ICA-banken: Ändra sparad PIN", setPin);

var $ = unsafeWindow.jQuery;

var form = $('form.login-simple');

var pin = GM_getValue('PIN');
if (form && !pin) {
  pin = setPin();
  if (!pin) return;
}


setTimeout(logIn, 1000);

function logIn() {
  $('#PasswordSimple, #PasswordNormal').val(pin);
  $('#sel-simple').click();
  $('input[name=JSEnabled]').val("1");

  // Note that we need to click this button explicitly, not just form.submit(),
  // for the log-in to be allowed.
  $('#LoginSimplifiedButton').click();
}

function setPin() {

	var pin = prompt(
		"Skriv in din PIN-kod nedan och tryck 'OK'.\n\nDu kan redigera den när som helst via Greasemonkey-menyn.",
		GM_getValue('PIN', "1234"),
		"ICA-banken autologin: Ange PIN-kod"
	);

	if (pin != null)
		GM_setValue('PIN', pin);

	return pin;
}
