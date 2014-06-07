// ==UserScript==
// @name           Login everywhere
// @namespace      ru.ryotsuke
// @include        http://diary.ru/*
// @include        http://www.diary.ru/*
// @include        http://*.diary.ru/*
// ==/UserScript==

if(document.title=='Error') {
	var divs = document.getElementsByTagName("a");
	var divslen = divs.length;
	ready=true;
	for(var i = 0; i < divslen && ready; i++) { 
		if(divs[i].href=='javascript:history.back()') {
			ifrm = document.createElement("DIV"); 
			ifrm.innerHTML='<form action="http://diary.ru/login.php" method="post"><table width="100%" cellpadding="0"><tr><td><input name="user_login" class="text" id="usrlog" type="text" style="width:200px;"> <input name="user_pass" class="text" id="usrpass" type="password" style="width:200px;"></td></tr><tr><td style="text-align: right;" width="200px"><input style="width:100px;" class="submit" value="Войти >" type="submit"></td></tr></table></form>';
			ifrm.style.width = 410+"px"; 
			ifrm.style.height = 200+"px";
			ifrm.style.display = "block";
			ifrm.id = "loginFrame";
			
			divs[i].parentNode.parentNode.appendChild(ifrm);
		}
	}
}