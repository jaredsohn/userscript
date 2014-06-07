// ==UserScript==
// @name           CSM: Autologin
// @namespace      http://userscripts.org/users/26666
// @description    CSManager autologin
// @include        http://www*.cs-manager.com/
// @include        http://www*.cs-manager.com/?status=bad_login*
// @version        0.2
// ==/UserScript==

// This function adds javascript to the page so it will be executed in page context
function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

// Set the timeout (in ms)
var timer = 1000;

// Find username and password input
var un = document.getElementById('login_username');
var pw = document.getElementById('login_password');

// Wait until the page is fully loaded
window.addEventListener( 'load', function( e ) {
	function csmLogin() {
		un.focus(); // Let the firefox pass username/email
		pw.focus();  // and password to the form
			if(un.value.length && pw.value.length) { // If conditions are met - log in using csm function
				embedFunction("secureLogin()");
			} else {
				window.setTimeout(csmLogin, timer); // If conditions aren't met - wait and try again
			}
		}
// Run the script
	csmLogin();
},false);