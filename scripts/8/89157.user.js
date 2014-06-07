// ==UserScript==
// @name           Password Secured Facebook Status Updater(BEST)
// @namespace      http://localhost
// @description    Asks user to enter their password before updating their facebook status.
// @include        http://www.facebook.com/*
// ==/UserScript==

function doSomething(){


	if (GM_getValue("prompt",1)==1){


		function pass() {

			if (p.value==GM_getValue("z")) {
				var splash = document.getElementById("splash");
				splash.parentNode.removeChild(splash);
				c.style.display='block';
				GM_setValue("prompt",0);
			}else{
				alert("Wrong");
			}
		}

			
		var divTag = document.createElement("div");
		divTag.innerHTML = '<div id="splash" style="height: 100%; width: 100%;"><img style="position: fixed; top: 0pt; left: 0pt; width: 100%; height:4400px; z-index: 9000;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlPNpTNmawAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC"> ' +
		'<div align="center"><form name="gotcha"><table border="2" cellspacing="0" style="position: fixed; top: 200pt; left: 400pt; width: 25%; height: 20px; z-index: 9001;"><tbody><tr valign="top" height="10" bgcolor="#222222" align="center"><font size="2"><input type="password" id="derp" name="hurp" style="width: 70%; margin-top: 4px; margin-bottom: 4px;"><br><font xmlns="http://www.w3.org/1999/xhtml"><input type="reset" value="Submit" id="passsub"></font></font></tr></tbody></table></form><script>document.gotcha.hurp.focus();</script></div></div>';
		document.body.insertBefore(divTag, document.body.firstChild);
		c.style.display='none';
		var p = document.getElementById("derp");
		var s = document.getElementById("passsub");
		s.addEventListener("click", pass, false);
		p.focus();
	}


}

function prefs(){
	var outerdivTag = document.createElement("div");
	outerdivTag.innerHTML = '<div id="newpassdiv" align="center"><form name="setpass"><table border="2" cellspacing="0" style="position: fixed; top: 200pt; left: 400pt; width: 25%; height: 20px; z-index: 8000;"><tbody><tr valign="top" height="10" bgcolor="#222222" align="center"><font size="2"><input type="text" id="newpass" name="newpass" style="width: 70%; margin-top: 4px; margin-bottom: 4px;"><br><font xmlns="http://www.w3.org/1999/xhtml"><input type="button" value="Sumbit" id="newpasssub"><input type="button" id="cancel" value="Cancel"></font></font></tr></tbody></table></form></div></div>';
	document.body.insertBefore(outerdivTag, document.body.firstChild);

	function newpass(){
		var n = document.getElementById("newpass").value;
		if (n!=""){
			GM_setValue("z",n);
			newpassdiv.parentNode.removeChild(newpassdiv);
		}else{
			alert("Input a password");
		}
	}

	function cancelpass(){
		newpassdiv.parentNode.removeChild(newpassdiv);
	}


	var d = document.getElementById("newpasssub");
	var f = document.getElementById("cancel");
	var newpassdiv = document.getElementById("newpassdiv");
	d.addEventListener("click",newpass, false);
	f.addEventListener("click",cancelpass, false);

}

GM_registerMenuCommand("FB status lock-Set Pass", prefs);

var v = document.getElementById("pagelet_composer").firstChild.firstChild.id;
var w = document.getElementById(v+"_input");
if (location.href.match('facebook\.com/[a-zA-Z0-9/\?\.=#!]*(ref=home)?')){
var c = document.getElementById("pagelet_composer");
}else{
var c = document.getElementById("feedwall_with_composer").firstChild;
}

w.addEventListener('mousedown', doSomething, false);

GM_setValue("prompt",1);