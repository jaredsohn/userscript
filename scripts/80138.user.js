// ==UserScript==
// @name           galaxyClock
// @namespace      Sylver
// @description    Affiche l'heure à laquelle à été chargée la galaxie.
// @include		   http://*.ogame.*/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=showmessage*
// @exclude        http://*.ogame.*/game/index.php?page=combatreport*
// @exclude        http://*.ogame.*/game/index.php?page=eventList*
// @exclude        http://*.ogame.*/game/index.php?page=notices*
// @grant 			none
// ==/UserScript==
var country = location.href.split('ogame.')[1].split('/')[0];

if(document.getElementById('officers'))
{
	//*******************************************************
	//
	// PERSONNALISATION
	//
	//********************************************************
	var couleur = true;
	var color='#FF5000'; // Couleur en Héxadécimal
	var gras =false ; //Texte en gras
	var italique =true ; // Texte en italique
	var size = '1'; // Maximum 4 ( occupe 2 lignes au lieu d'une à partir de 3)
	var setImg=true; // Affiche un petit icone d'horloge à côté du texte

	//*******************************************************
	// CONFIGURATION
	//*******************************************************
	var param=''; // Attributs de la balise font
	if (couleur) // application de la couleur
	{
		param = param +'color='+color;
	}
	param = param + ' size = '+size; // Application de la taille
	var b=''; // balise <b>
	var b2=''; //balise </b>
	var i='';  // balise <i>
	var i2='';  // balise </i>
	var img=''; // balise <img ... />
	if (gras) // si gras activé
	{
		b='<b>';
		b2='</b>';
	}
	if (italique) // si italique activée
	{
		i='<i>';
		i2='</i>';
	}
	if (setImg) // Si image activée
	{
		img='<img SRC="http://img828.imageshack.us/img828/1604/clock10.png" /> ';
	}
		
		
	var page =location.href.split('?page=')[1].split('&')[0]; // recuperation du type de la page

	function serveurTimer() // Pour galaxie
	{
		var table = document.getElementById('galaxyheadbg2').getElementsByTagName('th')[1];
		if (!table || table.getAttribute("done14111") == "done") return;
		table.setAttribute("done14111","done");

		var heureDep=document.getElementsByClassName("OGameClock")[0].getElementsByTagName('span')[0].innerHTML; // récupération de l'heure du serveur
		var hdep=(heureDep[0])+heureDep[1]; // récupération des heures
		var mdep=(heureDep[3])+heureDep[4]; // récupération des minutes
		var sdep=heureDep[6]+heureDep[7]; // récupération des secondes

		var code =document.getElementById('officers').innerHTML ;
		code=code.split('<span id="gClock"')[0];

		if (country == 'fr')
		{
			document.getElementById('officers').innerHTML= code + '<span id="gClock"><br>'+img + '<font '+param+'>'+ b + i + 'Page charg&eacute;e &agrave; ' + hdep + ':' + mdep + ':' + sdep + '. '+ i2 + b2 +'</font>';
		}
		else
		{
			document.getElementById('officers').innerHTML= code + '<span id="gClock"><br>'+img + '<font '+param+'>'+ b + i + 'Page loaded at ' + hdep + ':' + mdep + ':' + sdep + '. '+ i2 + b2 +'</font>';
		}
		// Affiche l'element
	}

	function displayClock() // Pour
	{

		var heureDep=document.getElementsByClassName("OGameClock")[0].getElementsByTagName('span')[0].innerHTML; // récupération de l'heure du serveur
		var hdep=(heureDep[0])+heureDep[1]; // récupération des heures
		var mdep=(heureDep[3])+heureDep[4]; // récupération des minutes
		var sdep=heureDep[6]+heureDep[7]; // récupération des secondes

		if (country == 'fr')
		{
			document.getElementById('officers').innerHTML+='<span id="gClock"><br>'+img+'<font '+param+'>'+ b + i + 'Page charg&eacute;e &agrave; ' + hdep + ':' + mdep + ':' + sdep + '. '+ i2 + b2 +'</font></span>';
		}
		else
		{
			document.getElementById('officers').innerHTML+='<span id="gClock"><br>'+img+'<font '+param+'>'+ b + i + 'Page loaded at ' + hdep + ':' + mdep + ':' + sdep + '. '+ i2 + b2 +'</font>';
		}
		// Affiche l'element
	}


	// Page galaxie
	if (page == 'galaxy')
	{
		setInterval(serveurTimer, 1000); 
	}
	else
	{
		displayClock();
	}
}