// ==UserScript==
// @name          Minha foto no perfil
// @namespace     by DECO
// @description   Script Criado Por Comunidade Mundo Hacker
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==


// -------------------------- INÍCIO DO SCRIPT : CUIDADO SE FOR MEXER ! ------------------------------------------ //


  if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='http://lh6.ggpht.com/DecoLuis17/SA6Qo8sQASI/AAAAAAAAAOQ/Dwtovttm_p0/Massa%21.JPG'>";
  }


// ---------------------------------------- FIM DO SCRIPT -------------------------------------------------------- /