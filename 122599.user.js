// ==UserScript==
// @name          Sexe JVC
// @namespace     lol
// @description   Mettre les filles en rose et les mecs en bleu :hap:
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

function trim (str) 
{
	return str.replace(/^\s*/g, '').replace(/\s*$/g, '');
}

var imgs = document.getElementsByClassName('pseudo');
//Récup les pseudos et les parcoure
for (i=0; i<imgs.length; i++)
{
	var psd=trim(imgs[i].textContent).toLowerCase();
	var sex=localStorage.getItem(psd);
    //Si déjà stocké, récup la valeur
	if(sex==null)
	{//Sinon, requete
		xmlhttp=new XMLHttpRequest();
		var url="http://www.jeuxvideo.com/profil/"+psd+".html";
		xmlhttp.open("GET",url,false);
		xmlhttp.send();
		var xmlDoc=xmlhttp.responseText; 
		var pos=xmlDoc.match("sexe_f");
		if(pos==null)
		{
			sex="m";
		}
		else
		{
			sex="f";
		}
		localStorage.setItem(psd,sex);
        //stocke
	}
	if(sex=='m')
	{
		imgs[i].style.color='#09f';
	}
	else //Met la couleur
	{
		imgs[i].style.color = '#f39';
	}
	
}
var modo = document.getElementsByClassName('pseudo topic_mod');
for (i=0; i<modo.length; i++)
{
	modo[i].style.color='#D00'; //Remet les modos en rouge
}

