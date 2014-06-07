// ==UserScript==
// @name           	Bleach Central Arrow Keys
// @namespace     Bleach Central [Arrow Key Fix]
// @description    Makes it so that you can use the arrow keys when reading manga.
// @include        	http://www.bleachcentral.com/manga.php?s=*
// @include        	http://www.narutocentral.com/manga.php?s=*
// @include        	http://bleachcentral.com/manga.php?s=*
// @include        	http://narutocentral.com/manga.php?s=*
//@author		Tubutas
// ==/UserScript==

//This is really sensitive at its current stage >______<
document.addEventListener('keydown',kpressed_others,false);
function kpressed_others(e){
	var series=document.location.href.substring(document.location.href.indexOf('?s=')+3,document.location.href.indexOf('&c='));
	var chapter=document.location.href.substring(document.location.href.indexOf('&c=')+3,document.location.href.indexOf('&p='));
	var page=parseInt(document.location.href.substring(document.location.href.indexOf('&p=')+3));
	if(!parseInt(chapter))chapter=document.location.href.substring(document.location.href.indexOf('&c=')+3);
	if(!page)page=1;
	if (e.keyCode == 39)window.setTimeout("changePage('"+series+"', '"+chapter+"', '"+(page+1)+"')", 0);
	if (e.keyCode == 37)window.setTimeout("changePage('"+series+"', '"+chapter+"', '"+(page-1)+"')", 0);
	else return
}