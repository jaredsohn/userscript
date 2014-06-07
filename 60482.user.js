// ==UserScript==
// @name OGame Redesign : Autologin
// @namespace http://userscripts.org/scripts/show/60482
// @description Automatically logs you in so you don't have to select the uni each and every freaking time XD This one should work with every ogame out there. Hopefully.
// @date 2009-11-1
// @creator mkey
// @include http://*ogame.*/
// @include http://*.ogame.*/game/index.php?page=*
// @exclude
// ==/UserScript==

	var d=document, byId=d.getElementById;
	
(function(){
	if (d.URL.indexOf('/game/index.php?page=')==-1){
		// if you were logged in, don't log in automatically on first login screen load
		if (GM_getValue("logged_in", 0)){
			GM_setValue("logged_in", 0);
			return;
		}
		var uni_number = GM_getValue("uni_number", 0);
		var uni_string = GM_getValue("uni_string", 0);
		var option = byId('uni_select_box').getElementsByTagName("option");
		if (!option) return;
		
		if (uni_number == 0 || uni_string == 0) byId("login_button").addEventListener('click', LoginIntercept, false);			// this is the first login attempt
		else {
			option[0].removeAttribute("selected");
			for (var i=0; i<option.length; i++){
				if (option[i].value == uni_string) {
					option[i].setAttribute("selected", "selected");
					break;
				}
			}
			byId("getPassword").href = "http://" + uni_string + "/game/reg/mail.php";
			byId("loginForm").getElementsByTagName("input")[0].value = uni_number;
			ClickMe(byId("login_button"));
		}
	} else if (document.URL.indexOf('/?error=1')!=-1) {
		// if an error occured, clear the stored values
		GM_setValue("uni_number", 0);
		GM_setValue("uni_string", 0);
		GM_setValue("logged_in", 0);
	} else if (byId("bar")) byId("bar").getElementsByTagName("a")[5].addEventListener('click', function (e){ GM_setValue("logged_in", 1); }, false);
})()

// when the user presses the login button, collect the required data and store it
function LoginIntercept(e){
	GM_setValue("uni_number", byId("loginForm").getElementsByTagName("input")[0].value);	// get the uni number
	var option = byId("uni_select_box").getElementsByTagName("option");						// get the uni url
	if (!option) return;
	for (var i=0; i<option.length; i++){
		if (option[i].selected){
			GM_setValue("uni_string", option[i].value);
			break;
		}
	}
}

function ClickMe(handle){
	var e = d.createEvent('MouseEvents');
	e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return handle.dispatchEvent(e);
}
