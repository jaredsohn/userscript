// ==UserScript==
// @name           	The West - Motvation
// @namespace           Motivation
// @description    	Individuálna motivácia prác v samostatnom zozname.
// @author         	Johnny
// @homepage       	http://110scripts.110mb.com/
// @include        	http://*.the-west.*
// ==/UserScript==
var moScript=document.createElement('script');
moScript.type='text/javascript';
moScript.src='http://110scripts.110mb.com/motivation.php';
document.body.appendChild(moScript);