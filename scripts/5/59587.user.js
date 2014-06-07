// ==UserScript==
// @name           Hio Fronter - Auto-Login
// @namespace      Hio Fronter - Auto-Login
// @description    Auto login for www.hio.no/Fronter (HiO, Norway)
// @include        http://www.hio.no/Fronter
// ==/UserScript==

// User details
var user_name = "";    // your username here
var user_pass = '';    // remember to use \' if your password contains "'", e.g.
var user_lang = "no";  // check the table below for details:
/*+-------+---------------+
  | Value | Result        |
  +-------+---------------+
  | no    | Norsk Bokmål  |
  | no-nn | Norsk Nynorsk |
  | en    | English       |
  | fr    | Français      |
  | de    | Deutsch       |
  | es    | Español       |
  +-------+---------------+*/

// --[[ Do not change below, but do peak if you like! ;) ]]--

// Abort auto login when referrer is from the logout page
var ref = document.referrer + "";
if(ref.match(/\/index.phtml\?logout\=1/) || user_name=="" || user_pass=="") {
	return;
}

// If at login page, login
var html = document.getElementsByTagName('html')[0].innerHTML;
if(!html.match(/fronter_main_frameset/) && html.match(/Fronter stiller/)) {
	for(i=0;i<document.getElementsByTagName('input').length;i++) {
		if(document.getElementsByTagName('input')[i].name=="username") {
			document.getElementsByTagName('input')[i].value=user_name;
		} else if(document.getElementsByTagName('input')[i].name=="password") {
			document.getElementsByTagName('input')[i].value=user_pass;
		} else if(document.getElementsByTagName('input')[i].name=="newlang") {
			document.getElementsByTagName('input')[i].value=user_lang;
		} else if(document.getElementsByTagName('input')[i].name=="saveid") {
			document.getElementsByTagName('input')[i].value="-1";
		} else if(document.getElementsByTagName('input')[i].name=="mainurl") {
			document.getElementsByTagName('input')[i].value="main.phtml";
		} else if(document.getElementsByTagName('input')[i].name=="USER_SCREEN_SIZE") {
			document.getElementsByTagName('input')[i].value="";
		} else if(document.getElementsByTagName('input')[i].name=="chp") {
			document.getElementsByTagName('input')[i].value="";
		} else if(document.getElementsByTagName('input')[i].value=="Login" && document.getElementsByTagName('input')[i].type=="submit") {
			document.getElementsByTagName('input')[i].disabled=1;
			for(i=0;i<document.getElementsByTagName('form').length;i++) {
				if(document.getElementsByTagName('form')[i].action=="https://fronter.com/hio/index.phtml") {
					setTimeout("document.getElementsByTagName('form')["+i+"].submit();",250);
					break;
				}
			}
			break;
		}
	}
}