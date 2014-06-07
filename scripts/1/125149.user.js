// ==UserScript==
// @name          Infos CDV+ jeuxvideo.com
// @namespace     [France77]
// @description   Script permettant l'affichage d'informations sur les Cartes De Visites des forumeurs de jeuxvideo.com directement depuis la page du topic ou la liste des sujets.
// @include        http://www.jeuxvideo.com/forums/*
// @include					http://www.jeuxvideo.com/messages-prives/*
// ==/UserScript==


function trim (str) 
{
	return str.replace(/^\s*/g, '').replace(/\s*$/g, '');
}


var tag="";
if(document.URL.indexOf("boite-reception.php")>0)
	tag="exp";
else
	tag="pseudo";
//var imgs = getElementsByClass(document,'pseudo','*');
var imgs = document.getElementsByClassName(tag);
//Récupération sur le serveur JVC des pseudos et leurs informations
for (i=0; i<imgs.length; i++)
{
	var psd=trim(imgs[i].textContent).toLowerCase();
	var sex=localStorage.getItem(psd);
	var age=localStorage.getItem(psd+"°ans");
	var jours=localStorage.getItem(psd+"°jouro");
	var posts=localStorage.getItem(psd+"°posts");

	{
		//Requête de récupération
		xmlhttp=new XMLHttpRequest();
		var url="http://www.jeuxvideo.com/profil/"+psd+".html";
		xmlhttp.open("GET",url,false);
		/*if (xmlhttp.overrideMimeType)
			xmlhttp.overrideMimeType('text/xml');*/
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
		if(xmlDoc.indexOf("<p class=\"banni\">")<0)
		{
			try{
			xmlDoc=xmlDoc.replace(/ccoeurs">Coups de c&oelig;ur<\/a><\/li>/g,"ccoeurs\"></li>");
			
			tmp = (new DOMParser()).parseFromString(xmlDoc, 'text/xml');     
			var tmp2=tmp.getElementById("pt_infos");
			if(tmp2==null) break;
			parse=tmp2.textContent.match(/\d+/g);
			localStorage.setItem(psd+"°ans",parse[0]);
			age=parse[0];
			jours="";
			for (j=1; j<parse.length-3; j++)
			{
				jours=jours+parse[j]+"";
			}
			
			localStorage.setItem(psd+"°jouro",jours);
			
			tmppost=tmp.getElementById("pt_nbpost");
			if(tmppost==null) break;
			parse=tmppost.textContent.match(/\d+/g);
			strp="";
			for (j=0; j<parse.length; j++)
			{
				strp=strp+parse[j]+"";
			}
			localStorage.setItem(psd+"°posts",strp);
			posts=strp;
			}catch(err){alert(err);}
		}
		else {age="BANNI"; jours="" ; posts="";}
	}
	if(sex=='m')
	{
		imgs[i].style.color='#09f';
	}
	else 
	//Application de la couleur en fonction du sexe indiqué sur la CDV
	{
		imgs[i].style.color = '#f39';
	}
	if(document.URL.indexOf("forums/1-")>0 || document.URL.indexOf("/message.php?idd=")>0 )
	{
		fs=document.createElement("span");
		fs.setAttribute("style", "color:gray");

		if(sex=='m') sx="";
		else sx="";
		var theText = document.createTextNode(sx+" "+age+" ans - "+jours+" jours - "+posts+" posts");
		fs.appendChild(theText);
		imgs[i].appendChild(fs);
		//imgs[i].lastChild.setAttribute("style", "color:red");
		//imgs[i].lastChild.nodeValue =  " ("+age+" ans) . . . "+jours+" jours  . . . "+posts+" posts";
	}
	
}
var modo = getElementsByClass(document,'pseudo topic_mod','*');
for (i=0; i<modo.length; i++)
{
	modo[i].style.color='#D00'; 
	//Remet les modos en rouge afin de garder la distinction
}
