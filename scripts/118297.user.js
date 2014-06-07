// ==UserScript==
// @name           EuroGamer skin v 0.1 
// @namespace      http://eurogamer.it/*
// @description    Interfaccia grafica a tonalità grigio per EuroGamer
// @include        http://www.eurogamer.it/*
// @author         PuPs (original code by demonbl@ck)
// ==/UserScript==

//======J4GIFS-LIKE PAGE STYLE

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

  
var hideSocialNetworkIntegration = true; //cambiare in true per nascondere l'integrazione con fb/g+/twitter-coso
var resizePostArea = false; //cambiare in true per attivare, rovina un po' il layout
var modifyButtons = true; //cambia i pulsanti. questo elimina gli sprite tipo la freccetta e cazzi vari.



if(window.location.toString().indexOf('forum')!=-1)
{
//===== sfondo pagina 
	document.body.style.background="#6C6C6C";
	
	addGlobalStyle('li.sticky {background-color: #444 !important;}');
	addGlobalStyle('li.sticky,li.sticky div.details h2 a,li.sticky div.details span,li.sticky div.details span a { color: #ddd !important;}');
	addGlobalStyle('li.thread:hover { background-color: #aaa !important;}');
	addGlobalStyle('li.row0,li.row1 { border: 3px solid #333 !important;}');
	addGlobalStyle('li.thread:hover { background-color: #aaa !important; color: #000 !important;}');
	addGlobalStyle('li.post {word-wrap: break-word !important; border:3px solid #333 !important;}');
	addGlobalStyle('li.pager {border:3px solid #333 !important;}');
if(resizePostArea)
{
	addGlobalStyle('div.post { width: 730px !important; position: relative !important; top:-150px !important;}');	
	addGlobalStyle('span.timestamp {width: 100px !important;}');
	addGlobalStyle('div.poster div { position: relative !important; left: -75px !important; top: 80px !important;}');	
	addGlobalStyle('div.post ul { position: relative !important; top: 190px !important;}');
}
	addGlobalStyle('.content { background-color: #6c6c6c !important;} ');
	addGlobalStyle('#content { background-image: none !important; background-color: #6c6c6c !important;} ');

	addGlobalStyle('.row0 { background-color: #888 !important;} ');
  	addGlobalStyle('.row1 { background-color: #999 !important;} ');     
  	//addGlobalStyle('div.post { background-color: #A0A0A0 !important; color: #000000 !important; font-family: Arial,Verdana,Times New Roman; } ');
	addGlobalStyle('blockquote { background-color: #888888 !important; border: 5px solid #666 !important;}');

	
  	addGlobalStyle('div.poster { margin-right: none !important;}');
  	
	addGlobalStyle('div.post a, div.post a:visited { color: #6600cc !important; font-weight: bold !important;}');

	addGlobalStyle('#sidebar,#sidebar li, #sidebar li ul li, #sidebar li.category a {color: #000000 !important; background-color:#6c6c6c !important; background-image: none !important; text-shadow:none !important;} ');

if(modifyButtons){
	addGlobalStyle('a.tool,input[type=submit] { color: #000 !important; text-shadow: none !important; background-color: #888 !important; border: 0px solid #333 !important; background-image: none !important; margin: none !important; padding: none !important;}'); 
	addGlobalStyle('a.tool:hover,input[type=submit]:hover {background-color: #aaa !important;}');
}
	addGlobalStyle('#new, li.favourites a, li.groups a, li.created a, li.posted a, li.moderators a, li.all a {color: #000000 !important; background-color:#888 !important; background-image: none !important; text-shadow:none !important; border: 0px solid #333 !important;} ');
	addGlobalStyle('#new:hover, li.favourites a:hover, li.groups a:hover, li.created a:hover, li.posted a:hover, li.moderators a:hover, li.all a:hover {color: #000000 !important; background-color:#aaa !important; background-image: none !important; text-shadow:none !important; border: 0px solid #333 !important;} ');

	addGlobalStyle('ul.selector { border: none !important;} ');

	addGlobalStyle('div.post ul li a {color: #000000 !important;} ');
	addGlobalStyle('a.tool {color: #000000 !important;} ');
	addGlobalStyle('span.first-and-last a {color: #000000 !important;} ');

  	addGlobalStyle('li.post { background: #A0A0A0 !important; color: #000000 !important; font-family: Arial,Verdana,Times New Roman; border-bottom: 0px solid #333 !important;} '); 
  	
	if(hideSocialNetworkIntegration)
	{
		addGlobalStyle('li.social {display: none !important;} ');
	}

	addGlobalStyle('p.signature {color: #000000 !important; border-top: 2px solid #333 !important; margin-top:20px !important;} ');
	addGlobalStyle('span.details { color: #000000 !important;} ');
	addGlobalStyle('div.poster div a,div.poster div span a { color: #000000 !important;} ');   
	addGlobalStyle('li.thread a{ color: #000000 !important;} ');
	addGlobalStyle('a.back-link {display:none !important;}');

}