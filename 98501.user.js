// ==UserScript==
// @name           Google Maps Maximizer Mod
// @version        .1
// @description    Google maps hide top panel. Modified by Rob
// @include        http://maps.google.*
// @include        http://www.google.com/maps*
// @include        http://google.com/maps*
// ==/UserScript==
// Originally attributed to SaWey, BlindWanderer
// heavily modified
var img_show;
var img_hide;
var hidden = GM_getValue("start_visible", false);
var div_header = document.getElementById("header");
var div_top = document.getElementById('gb');
if(div_header) {
	var idiv = div_finder_1();//find the div with 'Print|Send|Link'
	if(idiv) {
		img_hide = document.createElement("img");
		img_hide.src = 'data:image/gif;base64,R0lGODlhBwAIAIABAGeEx////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAAHAAgAAAINjGEJq8h80ElRhufsKgA7';
		img_hide.style.display = "none";
		img_hide.style.cursor='pointer';
		img_hide.addEventListener('click', clicker, false);
		img_show = document.createElement("img");
		img_show.src = 'data:image/gif;base64,R0lGODlhBwAIAIABAGeEx////yH5BAEKAAEALAAAAAAHAAgAAAIMBIIWqtm44GNnvgQLADs=';
		img_show.style.display="none";
		img_show.style.cursor='pointer';
		img_show.addEventListener('click', clicker, false);
		var spacer = document.createElement('span');
		spacer.id = 'spacer_span';
		spacer.innerHTML = ' | ';
		idiv.insertBefore(spacer,   idiv.firstChild);
		idiv.insertBefore(img_hide, idiv.firstChild);
		idiv.insertBefore(img_show, idiv.firstChild);
		clicker();
	}
}
function clicker() {
	var dispA, dispB;
	if(hidden==true){dispA='';dispB='none';}else{dispA='none';dispB='';}
	div_header.style.display = dispA;
	div_top.style.display = dispA;
	img_hide.style.display=dispA;
	img_show.style.display=dispB;
	GM_setValue("start_visible", hidden)
	hidden = !hidden;
	window.setTimeout("resizeApp()", 1);//hack around resizeApp scope
}
function div_finder_1() {//find the div with 'Print|Send|Link'
	arr = get_divs(document);
	for(var i=0; i < arr.length; i++) {
		if (arr.item(i).innerHTML == null) {}
		else if (arr.item(i).innerHTML.indexOf('jsaction="link.show"') <= 0) {}
		else if (get_divs(arr.item(i)).length==0) return arr.item(i);
	}
}
function get_divs(obj){return obj.getElementsByTagName('div')}