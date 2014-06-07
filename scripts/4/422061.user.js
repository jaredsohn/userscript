// ==UserScript==
// @name		MagnoVideo New Online reproductor
// @version		1.0
// @description	Puedes ver los videos sin limite de tiempo sin propaganda y con un mejor reproductor...
// @match		http://www.magnovideo.com/?v=*
// @copyright	2014 Yoangelrt
// @icon		http://www.magnovideo.com/templates_mv/images/favicon.ico
// ==/UserScript==


var fg= location.href.replace('http://www.magnovideo.com/?v=','');if(confirm("¿Quiere ver "+document.title+" con un mejor reproductor?\n Titulo: "+document.title+"\n URL: "+location.href+"\n ID: "+fg))document.location.href="http://www.vipelis.com/rep1/?id="+fg;
