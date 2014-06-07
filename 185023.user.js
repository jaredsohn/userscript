// ==UserScript==
// @name        Pretome Login
// @description Logs in your Pretome.info user automatically
// @include     /^https?\:\/\/(www\.)?pretome\.info/
// @version     1.0
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @updateURL   https://userscripts.org/scripts/source/185023.meta.js
// @downloadURL https://userscripts.org/scripts/source/185023.user.js
// ==/UserScript==

if (!$('#txthint').length)
	return;

console.log('Pretome login site detected');
$('body').prepend(
	'<style type="text/css">' +
		'.body_table { opacity: 0.4; }' + 
		'div#header { margin-top: 150px; margin-bottom: -100px; }' + 
	'</style>' + 
	'<div id="header"><h1 id="loginStatus"/></div>'
);

function login()
{
	var cred = jQuery.parseJSON(GM_getValue('cred'));
	$('#loginStatus').html('Logging in ' + cred.user + ', please wait...');

	var returnto = window.location.href.match(/.*\&returnto\=([^\&]*)/i)[1];
	$('#txthint').html(
		'<form method=POST action=takelogin.php id="loginform">' + 
			'<input type=hidden name="returnto" value="' + returnto + '"/>' + 
			'<input type=hidden name="login_pin" value="' + cred.pin + '"/>' +
			'Username:<br/>' + 
			'<input type=text name=username class=login value="' + cred.user + '"/><br/>' + 
			'Password:<br/>' + 
			'<input type=password name=password class=login value="' + cred.pw + '"/><br/>' + 
			'<input type=submit name=login value=Login class=btn/>' + 
		'</form>');

	$('form#loginform').submit();
}

function enterCreds()
{
	$('#loginStatus').html('Please enter your login credentials:');
	$('div#header').append(
		'<form>' +
			'<input type="text" name="pin" placeholder="PIN"/>' +
			'<input type="text" name="user" placeholder="Username"/> ' +
			'<input type="password" name="pw" placeholder="Password"/>' +
			'<input type="submit" value="Save! (in Browser Settings)"/>' +
		'</form>');
	$('div#header form').submit(saveCreds);
}

function saveCreds(e)
{
	e.preventDefault();
	var cred = {};
	$('div#header form :input[type!=submit]').each(function() {
		cred[$(this).attr('name')] = $(this).val();
	});
	GM_setValue('cred', JSON.stringify(cred));
	console.log('Saved credentials, logging in.');
	$('div#header form').remove();
	login();
}

if (/Username or password incorrect/i.test($('body').html()))
{
	GM_deleteValue('cred');
	console.log('Login unsuccessful, deleted credentials.');
}

if (!GM_getValue('cred'))
	enterCreds();
else
	login();