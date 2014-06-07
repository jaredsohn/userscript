// ==UserScript==
// @name           CSFD - autologin
// @namespace      http://adder.com/
// @include        http://www.csfd.cz/*
// ==/UserScript==

var login="";
var password="";

function alSaveSettings(){
	f=document.getElementById("autoLogSettings");
	GM_setValue("userName",f.elements[0].value);
	GM_setValue("userPassword",f.elements[1].value);
	s=document.getElementById("settingsDIV");
	s.parentNode.removeChild(s);
}

function autoLoginSettings(){
	document.body.innerHTML+='<div id="settingsDIV" style="position:fixed;left:'+(document.body.clientWidth-400)/2+';top:'+(document.body.clientHeight-150)/2+';width:400;height:150;background-color:#FFFFFF;border-style:solid;border-width:1;border-color:#000000"><center><h1>[CSFD - autologin] Nastavení</h1><form id="autoLogSettings"><table><tr align="center"><td><b>Login:</b></td><td><input type="text" id="login" name="login" style="width: 150px" size="10"/></td></tr><tr align="center"><td><b>Password:</b></td><td><input type="password" name="password" style="width: 150px" size="10"/></td></tr><tr align="center"><td colspan="2"><input type="button" value="Uložit" id="alSaveButton"/></td></tr></table></form></center></div>'
	document.getElementById("alSaveButton").addEventListener("click",alSaveSettings,false);
}

function Load(){
	if(GM_getValue("userName")==undefined){
		autoLoginSettings();
	}
	else{
		login=GM_getValue("userName");
		password=GM_getValue("userPassword");	
	
		h=document.getElementsByTagName("div");
		for(i=0;i<h.length;i++) if(h[i].getAttribute("class")=="hlavicka"){
			h=h[i];
			break;
		}
	
		if(h.innerHTML.indexOf("/prihlaseni.php")>-1 || h.innerHTML.indexOf("Přihlásit")>-1){
			document.body.innerHTML+='<iframe id="loginFrame" style="display:none" src="/prihlaseni.php" width=800 height=600></iframe>';
			document.getElementById("loginFrame").addEventListener("load",autoLogin,false);
		}
	}	
}

function autoLogin(){
	f=document.getElementById("loginFrame").contentDocument.forms[1];
	r=0;
	for(i=0;i<f.elements.length;i++) if(f.elements[i].getAttribute("name")=="referer"){ r=i; break; }
	ref=f.elements[r].value;
	document.body.innerHTML+='<form action="/prihlaseni.php" method="post" id="autoLog"><input type="hidden" name="login" value="'+login+'"/><input type="hidden" name="password" value="'+password+'"/> <input type="hidden" name="referer" value="'+ref+'"/></form>';
	document.getElementById("autoLog").submit();
}

GM_registerMenuCommand("[CSFD - autologin] Nastavení",autoLoginSettings);

window.addEventListener('load',Load,false);
