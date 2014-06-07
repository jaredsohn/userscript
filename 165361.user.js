// ==UserScript==
// @name           Technion Moodle autologin
// @description    Automatically follow the login link and send the login form when you are not logged in to Moodle.
// @include        http://moodle.technion.ac.il/*
// @include        https://moodle.technion.ac.il/*
// @include        http://phstudy.technion.ac.il/phmoodle/
// @version        1.1
// @author         sguy
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @grant          none
// @run-at         document-end
// ==/UserScript==
/*This script is lightly based on http://userscripts.org/scripts/show/162748*/
/* Changelog:
    1.0 - First relese; ignore session timeout errors
    1.1 - Add support to phmoodle by preventing endless recursion.
*/

var not_logged_text = "You are not logged in";
var not_logged_text_he = "אתה לא מחובר";
var guest_text = "You are currently using guest access";
var guest_text_he = "אתם משתמשים כרגע בגישת אורחים";
var timeout_text = "Your session has timed out";
var timeout_text_he = "לא הייתם פעילים במערכת מזה זמן רב";

function is_login_page (){
    return (document.location.pathname.indexOf('/login/') > -1);
}

function follow_link (){
	var logininfos = document.getElementsByClassName('logininfo');
	if (logininfos.length > 0) {
		var logininfo = logininfos[0];

		if (	logininfo.innerHTML.indexOf(guest_text) > -1
			|| logininfo.innerHTML.indexOf(guest_text_he) > -1
			|| logininfo.innerHTML.indexOf(not_logged_text) > -1
			|| logininfo.innerHTML.indexOf(not_logged_text_he) > -1
		) {
			var login_link = logininfo.getElementsByTagName('a');
			if (login_link && (login_link.length>0) && 
                (!is_login_page())){ /*prevent recursive clicking the link*/
				login_link[0].click();
			}
		}
	}
}

function no_login_errors(){
	/*
    Check that the login form doesn't contain errors (e.g. wrong password) to prevent endless loop.
    We check for any error in the page by searching for the 'loginerrors' class */
	login_errors = document.getElementsByClassName('loginerrors');
	if ( login_errors.length == 0
	|| (login_errors[0].innerHTML.indexOf(timeout_text) > -1) /* ignore session timeout errors */
    || (login_errors[0].innerHTML.indexOf(timeout_text_he) > -1) ) {
        return true;
    }
	return false;
}

function send_form (){
	if (is_login_page()){
		if (	(document.getElementById('password').value.length > 0) 
			&& (document.getElementById('username').value.length > 0) /*send if the username&password was autofilled*/
			&& no_login_errors()
		){
			document.getElementById('login').submit();
		}
	}
}

window.addEventListener ("load",follow_link , false);
window.addEventListener ("load",send_form , false);