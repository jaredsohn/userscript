// ==UserScript==
// @name OGame Redesign : Autologin for mx.ogame.org
// @namespace http://userscripts.org/scripts/show/60634
// @description Automatically logs you in so you don't have to select the uni each and every freaking time XD For mx.ogame.org.
// @date 2009-10-27
// @creator mkey
// @include http://mx.ogame.org/
// @include http://*.mx.ogame.org/game/index.php?page=*
// @exclude
// ==/UserScript==

(function(){
	var uni_number;
	var uni_string;
	var option;
	
	if (document.location.href.indexOf('mx.ogame.org/game/index.php?page=') == -1){
		// if you were logged in, don't log in automatically on first load of log in screen
		if (GM_getValue("logged_in", 0)){
			GM_setValue("logged_in", 0);
			return;
		}
		uni_number = GM_getValue("uni_number", 0);
		uni_string = GM_getValue("uni_string", 0);
		option = document.getElementById("uni_select_box").getElementsByTagName("option");
		if (!option) return;
		
		if (uni_number == 0 || uni_string == 0){
			// this is the first login attempt
			document.getElementById("login_button").addEventListener('click', LoginIntercept, false);
		} else {
			// go here for all the other situations
			option[0].removeAttribute("selected");
			for (var i=0; i<option.length; i++){
				if (option[i].getAttribute("value") == uni_string) {
					option[i].setAttribute("selected", "selected");
					break;
				}
			}
			document.getElementById("getPassword").setAttribute("href", "http://" + uni_string + "/game/reg/mail.php");
			document.getElementById("loginForm").getElementsByTagName("input")[0].setAttribute("value", uni_number);
			document.getElementById("login_button").click();
		}
	} else {
		if (document.getElementById("bar")) document.getElementById("bar").getElementsByTagName("a")[5].addEventListener('click', LogoutIntercept, false);
	}
})()

// when the user presses the login button, collect the required data and store it
function LoginIntercept(evt){
	var uni_number;
	var uni_string;
	
	// get the uni number
	uni_number = document.getElementById("loginForm").getElementsByTagName("input")[0].getAttribute("value");
	
	// build the uni string
	if (uni_number<44) uni_string = "uni" + String(uni_number) + ".mx.ogame.org";
	else if (uni_number == 101) uni_string = "andromeda.mx.ogame.org"
	// for future compatibility
	else if (uni_number == 102) uni_string = "barym..mx.ogame.org";
	else if (uni_number == 103) uni_string = "capella.mx.ogame.org";
	else if (uni_number == 104) uni_string = "draco.mx.ogame.org";
	else return;	// error, new uni has been added
	
	GM_setValue("uni_number", uni_number);
	GM_setValue("uni_string", uni_string);
}

// for loging out
function LogoutIntercept(evt){
	GM_setValue("logged_in", 1);
}