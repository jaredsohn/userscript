// ==UserScript==
// @name        Optimisation Graphique
// @namespace   Dystiopia Online
// @version     0.21b
// @author      Chewbaka
// @updateURL      http://userscripts.org/scripts/source/456026.meta.js
// @downloadURL    https://userscripts.org/scripts/source/456026.user.js
// @include     http://dystopiaonline.fr/game/*
// ==/UserScript==

////////////////////////////// VARIABLE ///////////////////////////
	var element = document.getElementById("IA"); // Bannière
	var Menu = document.createElement("div"); // Div Bouton
	var Progressbar = document.createElement("style"); // Style progressbar
	var newURL = window.location.search;  // URL page
	
///////////////////////////// Paramétrage ///////////////////////
Progressbar.innerHTML = '.ui-progressbar-value {\r\n'+ // CSS ProgressBar
						'background-image: url("http://i.imgur.com/4eEOUoz.jpg");\r\n'+
						'background-position: left top;\r\n'+
						'border-color: #000000;\r\n'+
						'}';

Menu.className = 'section parent_section clearfix col3 wrap'; // Nom classe bouton script
Menu.innerHTML = '<div class="article clearfix no_margin"><div class="section clearfix col6 home_callout career"><div class="container">'+ // Création bouton script
					'<a href="game.php?page=overview&option=script" class="home_page_promo_link">'+
						'<div class="title_block dark_hatch_container"><div class="content">'+
							'<blockquote>Option Script</blockquote>'+
						'</div><div class="bg"><div class="left_chrome"></div><div class="top_right_chrome"></div><div class="bottom_right_chrome"></div></div></div><div class="hover"></div>'+
					'</a></div></div></div>';
					
///////////////////////////// MAIN /////////////////////////////
if(newURL.split("&")[1]=="option=script") // Page script
{
	var Option = document.createElement("div"); // Div Option script
	var Homepage = document.getElementsByClassName("container"); // Récup containt page principale
	
	element.parentNode.removeChild(element); // Suppression Bannière
	document.getElementById("leftmenu").insertBefore( Menu, document.getElementById("leftmenu").firstChild ); // Ajout bouton script
	Homepage[Homepage.length-1].parentNode.removeChild(Homepage[Homepage.length-1]);
	Option.className = 'container';
	Option.innerHTML ='<h2 class="clearfix"><div class="icon"></div><div>Option du Script</div></h2><div class="news_articles"></br><div class="news_article"><div class="article_content">'+
		'<div class="title_block dark_hatch_container" style="height: 45px;"><table style="width:100%; left: 0px; margin-top: -5px;"><tr><td class="transparent" style="box-shadow: 0px 0px 0px 0px">'+
		'<div class="titlebulding"><a href="#" onclick="return Dialog.info(1)">Synthétiseur d\'Alliage</a>(Niveau 13)</div></td><td class="transparent" style="box-shadow: 0px 0px 0px 0px">'+
		'<div class="buttonbulding"><button class="button red" type="submit">Améliorer 14(Temps: 01h 10m 03s )</button></div></td></tr></table></div>'+
		'<div class="text_block" style="min-height: 182px;"><div class="secondary_content"><table style="width:100%; border:0px;"><tr style="border-spacing:1px;">'+
		'<td class="transparent" rowspan="2" style="width:15%; border:none; box-shadow: 0px 0px 0px 0px;"><a href="#" onclick="return Dialog.info(1)">'+
		'<img src="./styles/theme/gow/gebaeude/1.png" alt="Synthétiseur d\'Alliage" style="border: 5px solid #000; border-radius: 5px; width: 25%; position: absolute; margin-top: 0%; top: 47px; max-height: 168px; max-width: 297px; left: 5px;">'+
		'</a></td></tr><tr><td class="transparent" style="border:0px; box-shadow: 0px 0px 0px 0px;"><table style="width:100%">'+
		'<tr><td class="transparent left" style="width:100%;text-align:center;box-shadow: 0px 0px 0px 0px;"><p><b>Produit de l\'Alliage</b><br>Principal fournisseur de matières premières pour la construction des structures porteuses des bâtiments et des vaisseaux.'+
		'<center><table style="width: 50%;"><tr><td class="transparent" style="box-shadow: 0px 0px 0px 0px;"><table style="border-collapse: separate; text-align:center; width: 100%;">'+
		'<tr><td class="transparent" style="box-shadow: 0px 0px 0px 0px"><table><tr class="transparent" style="height:33px; box-shadow: 0px 0px 0px 0px"><td style="box-shadow: 0px 0px 0px 0px" class="transparent"></td></tr><tr><td>Prix:</td></tr><tr><td>Il vous manque:</td></tr></table></td>'+
		'<td class="transparent" style="box-shadow: 0px 0px 0px 0px; width: auto;"><table><tr><td class="transparent" style="box-shadow: 0px 0px 0px 0px;">'+
		'<a class="top-tip" data-tips="Alliage"><img src="./styles/theme/gow/images/901.gif" style="height:30px;" alt=""></a></td></tr><tr><td>'+
		'<span style="color:red">11.677</span></td></tr><tr><td><span style="font-weight:700">2.879</span></td></tr></table></td>'+
		'<td class="transparent" style="box-shadow: 0px 0px 0px 0px; width: auto;"><table><tr><td class="transparent" style="box-shadow: 0px 0px 0px 0px;">'+
		'<a class="top-tip" data-tips="Quartz"><img src="./styles/theme/gow/images/902.gif" style="height:30px;" alt=""></a></td>'+
		'</tr><tr><td><span style="color:lime">2.919</span></td></tr><tr><td><span style="font-weight:700">0</span></td></tr></table>'+
		'</td></tr></table></td><td class="transparent" style="width: 35%; text-align: right; box-shadow: 0px 0px 0px 0px;">'+
		'<a class="tooltip_sticky" data-tooltip-content=\'<table><tr><td class="transparent" style="text-align: right;"><table style="width:100%"><tr class="transparent" style="box-shadow: 0px 0px 0px 0px">'+
		'<td class="transparent" style="width:100%; box-shadow: 0px 0px 0px 0px"><center><table style="width:300px"><tr><th colspan="2">Prix de la destruction:</th></tr><tr><td>Alliage</td><td><span style="color:lime">5.839</span></td></tr><tr><td>Quartz</td><td><span style="color:lime">1.460</span></td></tr><tr><td>Temps</td><td>00h 35m 01s </td></tr>'+
		'<tr><td class="transparent" style="box-shadow: 0px 0px 0px 0px;" colspan="2"><form action="game.php?page=buildings" method="post" class="build_form"><input type="hidden" name="cmd" value="destroy"><input type="hidden" name="building" value="1"><button type="submit" class="build_submit onlist button red">Démolir</button></form></td></tr></table></center></td></tr></table></td></tr></table>\'>'+
		'<span style="text-align: center;"><span style="font-family: Websymbol; font-size: 30px; color: white; text-align: center; margin-right: 10px;" >&#0092;</span></br>Démolir</span>'+
		'</a></td></tr></table></center></td></tr></table></td></tr></table></div></div></div></div>';
	document.getElementById("home_news_section").insertBefore( Option, document.getElementById("home_news_section").firstChild );
}
else if(newURL=="?page=buddyList") // Amis
{
	element.parentNode.removeChild(element);
	document.getElementById("leftmenu").insertBefore( Menu, document.getElementById("leftmenu").firstChild );
	var tableauTR = document.getElementsByClassName("secondary_content")[0].childNodes[1].childNodes[1].childNodes; // Recup TR
	
	for (var i=4; i<=tableauTR.length; i++)
	{
		var tableauTD = tableauTR[i].childNodes[9]; // Recup TD
		var ID = tableauTR[i].childNodes[1].childNodes[1].getAttribute("onclick").split("(")[1].split(")")[0]; // Recup Id joueur
		
		var message = document.createElement('a');
		var image = document.createElement('img');
		message.setAttribute('onclick', 'return Dialog.PM('+ID+')');
		message.setAttribute('href', '#');
		image.setAttribute('title', 'Nouveau Message');
		image.setAttribute('style', 'margin-right:4px;');
		image.setAttribute('src', './styles/theme/6/img/m.gif');
		tableauTD.insertBefore( message, tableauTD.firstChild ).appendChild(image);
		i++;
	}
}
else
{
element.parentNode.removeChild(element); // Suppression Bannière
document.getElementById("leftmenu").insertBefore( Menu, document.getElementById("leftmenu").firstChild ); // Ajout bouton script
document.getElementsByTagName('head')[0].appendChild(Progressbar); // ajout Style progressbar
}