// ==UserScript==
// @name         Poradnik West Script
// @version      0.1
// @description  Skrypt do strony "Poradnik West"
// @author       Matplk
// @website      http://poradnikwest.wordpress.com
// @include	http://*.the-west.*/game.php*
// @include	http://*.tw.innogames.*/game.php*
// ==/UserScript==

PWS_inject = function(){
	if(document.getElementById('PWS_js')) return;
	var PWSjs = document.createElement('script');
	PWSjs.setAttribute('type', 'text/javascript');
	PWSjs.setAttribute('language', 'javascript'); 
	PWSjs.setAttribute('id', 'TWDBQI_js');
	PWSjs.innerHTML = "var _PWS_int = setInterval("+(function(){

/* injected script starts */
/**************************/

	if(!TheWestApi.version) return; else clearInterval(_TWDBQI_int);
	jQuery('#footer_minimap_icon').parent().after('<'
+'img alt="Poradnik West Script" id="PWS" style="position:absolute;left:2'+(TheWestApi.version>=1.35?7:3)+'5px;top:1px;cursor:pointer" title="<'
+'b>Launch PoradnikWest.wordpress.com Import<'+'/b>" onclick="wman.open(\'pws nominimize noreload\').addTab(\'Please wait...\');jQuery.getScript(\'http://tw-db.info/cache/js/sDoImport_eng.js\');"'
+'src="data:image/png;base64,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" /'+'>');

/**************************/
/*  injected script ends  */

	}).toString()+", 100); ";
	document.getElementsByTagName('body')[0].appendChild(TWDBQIjs);
};

if ((location.href.indexOf(".the-west.") != -1 || location.href.indexOf(".tw.innogames.") != -1) && location.href.indexOf("game.php") != -1) TWDBQI_inject();