// ==UserScript==
// @name        CSFD autologin
// @namespace   mkonecny
// @include     http://www.csfd.cz/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// ==/UserScript==

var username="";
var password="";

function alSaveSettings(){
	f=document.getElementById("autoLogSettings");
	GM_setValue("userName",f.elements[0].value);
	GM_setValue("userPassword",f.elements[1].value);
	s=document.getElementById("settingsDIV");
	s.parentNode.removeChild(s);
}

function autoLoginSettings() {
	document.body.innerHTML='<div id="settingsDIV" style="width:100%;height:125px;text-align:center;"><div style="position:absolute;left:50%;margin-left:-200px;width:400px;height:120px;background-color:#fff;border:1px solid #000;"><center><h1>[CSFD - autologin] Nastavení</h1><form id="autoLogSettings"><table style="margin-left:30px;"><tr align="center"><td><b>Login:</b></td><td><input type="text" id="login" name="login" style="width: 150px" size="10"/></td></tr><tr align="center"><td><b>Password:</b></td><td><input type="password" name="password" style="width: 150px" size="10"/></td></tr><tr align="center"><td colspan="2"><input type="button" value="Uložit" id="alSaveButton"/></td></tr></table></form></center></div></div>'+document.body.innerHTML;
	document.getElementById("alSaveButton").addEventListener("click",alSaveSettings,false);
}

function Load() {
	if(GM_getValue("userName")==undefined){
		autoLoginSettings();
	}
	else{
		username=GM_getValue("userName");
		password=GM_getValue("userPassword");	
	
		h=document.getElementsByTagName("div");
		for (i=0;i<h.length;i++) {
		  if(h[i].getAttribute("id")=="user-menu"){
			h=h[i];
			break;
		  }
		}
	
		if(h.innerHTML.indexOf("Přihlásit")>-1) {  // když je v user-menu přítomen text "Přihlásit", znamená to, že není přihlášený
        	referer=window.location.href; // __REFERER__ - na kterou stranku se ma pak vratit
        	document.body.innerHTML+='<form action="https://www.csfd.cz/prihlaseni/prihlaseni/?do=form-submit" method="post" id="autoLog"><input type="hidden" name="username" value="'+username+'"/><input type="hidden" name="password" value="'+password+'"/><input type="hidden" name="permanent"> <input type="hidden" name="__REFERER__" value="'+referer+'"/></form>';
        	document.getElementById("autoLog").submit();
		}
	}	
}

GM_registerMenuCommand("ČSFD autologin - nastavení",autoLoginSettings);

window.addEventListener('load',Load,false);
