// ==UserScript==
// @name           Connexion Neuf Wifi
// @namespace      neufcon
// @description    Ce script connecte l'utilisateur automatiquement au réseau Neuf Wifi dès sa première connexion et à chaque rappel du réseau
// @include        https://hotspot.neuf.fr/*
// ==/UserScript==

/*******************/
/**Début du script**/
/*******************/

var connect = function(){
	if(location.href.substr(54,6) == 'alread' || location.href.substr(54,6) == 'succes'){//Connexion réussie ou utilisateur déja connecté.
		if(history.length >= 2){
			history.go(-2);
		}
	}
	else if(location.href.substr(54,6) == 'failed'){//Connexion échouée on boucle tant qu'on a pas de connexion valide.
		if(confirm("Votre connexion a échouée. Voulez vous changer vos identifiants? (Il est possible que vos identifiants soient corrects et qu'un problème technique affecte le réseau Neuf Wifi)")){
			GM_setValue('neufwifi_login', window.prompt("Merci de renseigner votre login"));
			GM_setValue('neufwifi_pwd', window.prompt("Merci de renseigner votre mot de passe"));
		}
		else{
			window.location.replace("https://hotspot.neuf.fr/indexEncryptingChilli.php?res=notyet");
		}
	}
	else{//On commence une connexion.
		if(GM_getValue('neufwifi_login', '') && GM_getValue('neufwifi_pwd', '') && GM_getValue('neufwifi_cgu', '')){
			document.getElementById("login").value = GM_getValue('neufwifi_login', '');
			document.getElementById("password").value = GM_getValue('neufwifi_pwd', '');
			document.getElementById("conditions").checked = "checked";
			document.getElementById("save").checked = "checked";

			unsafeWindow.validForm()
			document.getElementsByName("connect")[0].submit();
		}
		else{
			alert('Impossible de vous connecter sans vos informations personnelles ou si vous n\'acceptez pas les termes et conditions du service NeufWifi.');
		}
	}
};

window.setTimeout(connect, 500);