// ==UserScript==
// @name          Hattrick Login
// @author        Andy Damevin
// @namespace     http://www.trax2web.com/
// @description   This script fills in your Username and Password field on login site (you have to edit this script in order to use your own username and password).
// @include       http://*hattrick.org*
// ==/UserScript==

//EDIT HERE
login = "editlogin";
pass = "editpass";
//////


function init()
{
	var log = document.getElementsByName('loginname')[0];
	if(log != null)
	log.value = login;
	var passw = document.getElementsByName('password')[0];
	if(passw != null)
	passw.value = pass; 
}

init();