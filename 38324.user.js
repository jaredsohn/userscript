// ==UserScript==
// @name           JvEasyLog
// @namespace       
// @description    Facilite la connexion sur jeuxvideo.com
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

function main() {
	var contenu = "";
	contenu = "<a onclick='document.getElementById(\"add\").style.top = (document.getElementById(\"add\").style.top == \"22px\") ? \"-200px\" : \"22px\";' rel='nofollow' style='cursor: pointer;'>Se Connecter</a>";
	
	var tr = "";
	tr = "<tr><td id='add' colspan=2 style='z-index: 1; position: absolute; top: -200px; width: 181px;'>";
	tr += "<form method='post' action='http://www.jeuxvideo.com/cgi-bin/admin/moncompte.cgi' target='captcha'>";
	tr += "<table cellspacing=0 cellpadding=0 style='width: 100%;'>";
	tr += "<tr><td style='padding-left: 15px;'>";
	tr += "<label for='pseudo'>Votre pseudo :</label>";
	tr += "<input id='pseudo' name='pseudo' type='text' tabindex='1' maxlength='15' value='' />";
	tr += "</td></tr>";
	tr += "<tr><td style='padding-left: 15px;'>";
	tr += "<label for='pass'>Votre mot de passe :</label>";
	tr += "<input id='new_pass' name='pass' type='password' tabindex='2' maxlength='12' />";
	tr += "<a href='http://www.jeuxvideo.com/cgi-bin/admin/passperdu_reseau.cgi' onclick=\"window.open('','popup','width=550,height=250,scrollbars=yes,status=no')\" target='popup'>Mot de passe oublié ?</a>";
	tr += "</td></tr>";
	tr += "<tr><td style='padding-left: 15px;'>";
	tr += "<input id='bool_log' name='bool_log' type='checkbox' tabindex='3' /><label for='bool_log'> Retenir pseudo et mdp</label>";
	tr += "</td></tr>";
	tr += "<tr><td style='padding-left: 15px;'>";
	tr += "<input src='http://www.noelshack.com/uploads/valid077083.gif' type='image' onclick=\"window.open('','captcha','width=550,height=280,screenX=300,screenY=200,scrollbars=no,status=no')\" />";
	tr += "<input name='oper' value='32' type='hidden' />";
	tr += "</td></tr>";
	tr += "</table>";
	tr += "</form>";
	tr += "</td></tr>";
	//
	if (document.getElementById("connect").getElementsByTagName("a")[0].innerHTML == "Se Connecter") {
		document.getElementById("connect").innerHTML = contenu;
		document.getElementById("connexion").innerHTML += tr;
	}

	if (window.location.href == "http://www.jeuxvideo.com/cgi-bin/admin/moncompte.cgi" && window.name == "captcha") {
		if (document.getElementById("col1").getElementsByTagName("strong")[0].innerHTML == "Vous êtes connecté.") {
			window.close();
			window.opener.location.reload();
		} else {
			window.scroll(130,195);
			document.getElementById("code").focus();
		}
	}
	
}

main();