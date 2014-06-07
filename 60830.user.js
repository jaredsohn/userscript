// ==UserScript==
// @name           Google Siempre!
// @namespace      Juampi_Mix
// @description    Agrega un icono flotante de google, en la esquina superior. Para buscar a a travez de google desde cualquier pagina.
// @include        http://*
// @include        https://*
// @exclude        http://www.google.com/*
// @exclude        https://www.google.com.*/*
// @exclude        http://*.google.com.*/*
// @exclude        http://images.google.com.*/*
// @exclude        http://images.google.com/*
// @exclude        http://blogsearch.google.com.*/*
// @exclude        http://blogsearch.google.com./
// @exclude        http://translate.google.com.*/*
// @version        1.0.4
// @require        http://userscripts.org/scripts/source/60663.user.js
 
// ==/UserScript==

window.addEventListener('load', initPageJian, false);
function initPageJian(){
	var googleSearchFormJian = document.createElement('form');
	googleSearchFormJian.action = "http://www.google.com.ar/search";
	googleSearchFormJian.target = "_blank";
	var googleSearchSubmitJian = document.createElement('input');
	googleSearchSubmitJian.type = "submit";
	googleSearchSubmitJian.style.display = 'none';	
	var googleSearchBoxJian = document.createElement('input');
	googleSearchBoxJian.name = 'q';
	googleSearchBoxJian.type = 'text';
	googleSearchBoxJian.style.color = 'white';
	googleSearchBoxJian.style.background = 'black';
	googleSearchBoxJian.style.display = '';
	googleSearchBoxJian.style.position = "fixed";
        googleSearchBoxJian.style.zIndex = "999";
	googleSearchBoxJian.style.top = "1px";
	googleSearchBoxJian.style.left = "20px";
	var googleSearchImgJian = document.createElement('img');
        googleSearchImgJian.style.position = "fixed";
        googleSearchImgJian.style.zIndex = "999";
        googleSearchImgJian.style.width = "21px";
        googleSearchImgJian.style.height = "21px";
	googleSearchImgJian.style.top = "2px";
	googleSearchImgJian.style.left = "2px";
	googleSearchImgJian.src = "http://www.graficost.com/images/googlefav1.png";
	googleSearchImgJian.addEventListener('mouseover', function(){
	googleSearchBoxJian.style.display = '';
	googleSearchBoxJian.select();
	}, false);
	googleSearchBoxJian.addEventListener('blur', function(){
	this.style.display = 'none';
	},false);
	document.getElementsByTagName('body')[0].appendChild(googleSearchFormJian);
	googleSearchFormJian.appendChild(googleSearchSubmitJian);
	googleSearchFormJian.appendChild(googleSearchBoxJian);
	document.getElementsByTagName('body')[0].appendChild(googleSearchImgJian);
}



ScriptUpdater.check(60830, '1.0.4');
ScriptUpdater.forceNotice(60830, '1.0.4');
ScriptUpdater.forceCheck(60830, '1.0.4');
function handleReturnedVersion(v) {
}
ScriptUpdater.check(60830, "1.0.4", handleReturnedVersion);