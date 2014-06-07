// ==UserScript==
// @name            Remember Delicious Login Info
// @description     Remember Delicious Login Info
// @include         https://secure.delicious.com/login*
// ==/UserScript==

var keys = ['username', 'password'];
var lf = document.getElementById('login-form');

function prompt_to_input(key) {
    val = window.prompt(key + ' ?', '');
    GM_setValue(key, val);
}

function login() {
    for (var i=0; i<keys.length; i++) {
	if (!GM_getValue(keys[i]))
	    prompt_to_input(keys[i]);

	document.getElementById(keys[i]).value = GM_getValue(keys[i]);
    }
    document.getElementById('rememberme').checked = 'checked';
    lf.submit();
}
    
if (lf.getElementsByTagName('h5'))
    for (var i=0; i<keys.length; i++)
	prompt_to_input(keys[i]);

login();
