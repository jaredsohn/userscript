// ==UserScript==
// @name           bbcode=> zcode
// @namespace      Snaquekiller
// @include        http://www.siteduzero.com/
// ==/UserScript==

function changer()
{
	var text = document.getElementById('text1').value;

	text = text.replace(/\[url\]/g,'<lien>'); 
	text = text.replace(/\[URL\]/g,'<lien>'); 
	text = text.replace(/\[url='/g,'<lien url="'); 
	text = text.replace(/\[URL='/g,'<lien url="'); 
	text = text.replace(/\[\/url\]/g,'</lien>');
	text = text.replace(/\[\/URL\]/g,'</lien>');
	text = text.replace(/\[size=8\]/g,'<taille valeur="ttpetit">'); 
	text = text.replace(/\[size=10\]/g,'<taille valeur="tpetit">'); 
	text = text.replace(/\[size=12\]/g,'<taille valeur="petit">'); 
	text = text.replace(/\[size=14\]/g,'<taille valeur="gros">'); 
	text = text.replace(/\[size=18\]/g,'<taille valeur="tgros">'); 
	text = text.replace(/\[size=24\]/g,'<taille valeur="ttgros">'); 
	text = text.replace(/\[size=22\]/g,'<taille valeur="ttgros">'); 
	text = text.replace(/\[\/size\]/g,'</taille>');
	text = text.replace(/\[b\]/g,'<gras>'); 
	text = text.replace(/\[\/b\]/g,'</gras>');
	text = text.replace(/\[u\]/g,'<souligne>'); 
	text = text.replace(/\[\/u\]/g,'</souligne>');
	text = text.replace(/\[i\]/g,'<italique>'); 
	text = text.replace(/\[\/i\]/g,'</italique>');
	text = text.replace(/\[s\]/g,'<barre>'); 
	text = text.replace(/\[\/s\]/g,'</barre>');
	text = text.replace(/\[color=#00ff00\]/g,'<couleur nom="vertf">');
	text = text.replace(/\[color=#ff6600\]/g,'<couleur nom="orange">');
	text = text.replace(/\[color=#009900\]/g,'<couleur nom="vertf">');
	text = text.replace(/\[color=#5050ff\]/g,'<couleur nom="bleu">');
	text = text.replace(/\[\/color\]/g,'</couleur>');
	text = text.replace(/\[code\]/g,'<code type="javascript">');
	text = text.replace(/\[\/code\]/g,'</code>');
	text = text.replace(/\[img\]/g,'<image>');
	text = text.replace(/\[IMG\]/g,'<image>');
	text = text.replace(/\[\/IMG\]/g,'</image>');
	text = text.replace(/\[\/img\]/g,'</image>');
	text = text.replace(/\[spoiler\]/g,'<secret>');
	text = text.replace(/\[\/spoiler\]/g,'</secret>');
	text = text.replace(/\[align=justify\]/g,'<position valeur="justifier">');
	text = text.replace(/\[align=right\]/g,'<position valeur="gauche">');
	text = text.replace(/\[align=left\]/g,'<position valeur="gauche">');
	text = text.replace(/\[align=center\]/g,'<position valeur="centre">');
	text = text.replace(/\[\/align\]/g,'</position>');
	text = text.replace(/\[list\]/g,'<liste>');
	text = text.replace(/\[\*\]/g,'<puce>');
	text = text.replace(/\[\/list\]/g,'</liste>');
	text = text.replace(/\[quote='/g,'<citation nom="');
	text = text.replace(/\[quote\]/g,'<citation>');
	text = text.replace(/',.*\]/g,'">');
	text = text.replace(/\[\/quote\]/g,'</citation>');
	text = text.replace(/\[color=#ff0000\]/g,'<couleur nom="rouge">');
	text = text.replace(/'\]/g,'">'); 

	document.getElementById('text1').value = text;
}
if(document.getElementsByClassName("boutons_zform")[0])
{
		var newElm = document.createElement('div');
		var buttonSubmit = document.createElement('input');
			buttonSubmit.type = 'button';
			buttonSubmit.value = 'Test';
			buttonSubmit.style.border = '1px solid #001133';
			buttonSubmit.style.backgroundColor = '#114466';
			buttonSubmit.style.color = 'red';
			buttonSubmit.addEventListener("click", (function(){changer();}), false);
			newElm.appendChild(buttonSubmit);
			document.getElementsByClassName("boutons_zform")[0].appendChild(newElm);
}			
			