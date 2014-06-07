// ==UserScript==
// @name           Webshot Image Leecher
// @namespace      Gatsu
// @description    Permet d'afficher directement le lien de l'image sans passer par le flash (qui empêche de leecher)
// @include        http://community.webshots.com/photo/fullsize/*
// ==/UserScript==



function getFlashVars(flash) {
	var allFv = flash.getAttribute('flashvars').split('&');
	var vars = {};
	allFv.forEach(function(fv) {
		var split = fv.split('=');
		vars[split[0]] = split[1];
	})
	return vars;
};


function insertStylesAndRemoveScripts() {
	var head = document.getElementsByTagName('head')[0];
	var scripts = head.getElementsByTagName('script');
	while(scripts.length>0) 
		head.removeChild(scripts[0]);
	var style = head.getElementsByTagName('style');
	while(style.length>0) 
		head.removeChild(style[0]);
	var st = document.createElement('style');
	st.type='text/css';
	st.innerHTML = [
		'html {overflow:auto;}',
		'body {background:#ccc}'
	].join('');
	head.appendChild(st);
}

function main() {
	insertStylesAndRemoveScripts();
	var fla = document.getElementById('fullsizeimageloader');
	var source = getFlashVars(fla).source;
	document.body.innerHTML = [
		'<strong>url de l\'image : </strong><input type="text" style="width:400px; border:1px solid #000; padding:1px;" value="', source, '" />',
		'<br />',
		'<a href="', source, '">Lien vers l\'image</a>',
		'<br />',
		'<strong>Image :</strong><span id="dimensions"></span>, le clic droit fonctionne.<br />',
		'<img src="', source ,'" width="99%" id="theImage" onload="document.getElementById(\'dimensions\').innerHTML = \'(\' + this.naturalWidth + \'x\' + this.naturalHeight + \')\'" />'
	].join('');
	
}

main();