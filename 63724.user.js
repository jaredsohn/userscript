// autor: eskey (sgk) -> http://sgk74exp.blox.pl (2008-12-22)
// wersja: 1.6

// ==UserScript==
// @name           blox.komentarze.linki
// @namespace      http://sgk74exp.blox.pl
// @description    dodaje permalinki do kolejnych komentarzy na blogach blox.pl (oraz je numeruje, wystarczy najechac myszka nad wstawiona ikonke)
// @include        http://*.blox.pl/20*/*/*
// ==/UserScript==

function $(d){	return document.getElementById(d);}

function addGlobalStyle(css) {									//funkcja dla kompatybilnosci z Opera, ktora nie obsluguje GM_addStyle()
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

(function () {
	var docURL = document.location.href.split('#',1);			//zeby nie zagniezdzac kotwic przy URLu wywolanym z kotwica (czyli z permalinkiem do komentarza)
	var j = 0;
	addGlobalStyle('.InfoKomentarzPermalink {float: right !important;} .InfoKomentarzPermalink a {font-weight: bold; color: #ccc; text-decoration: none;} .InfoKomentarzPermalink a:hover {text-decoration: underline;} .InfoKomentarzPermalink a img {border: 0 !important;}');	
		
	if ($('SkomentujListaKomentarzy')) {
		var allComms = $('SkomentujListaKomentarzy').getElementsByTagName('div');	
		for (i=0; i<allComms.length; i++)
		{
			if ( allComms[i].className.match(/(^|\s)Infopar(\s|$)/) || allComms[i].className.match(/(^|\s)Infoniepar(\s|$)/)) {			
				j++;
				var newTxt = document.createTextNode('' + j + '');
				var newDiv = document.createElement('div');
				newDiv.className = 'InfoKomentarzPermalink';
				var newLnk = document.createElement('a');
				newLnk.href = docURL +'#' + allComms[i].id;	//id bloku div o klasie Info[nie]par jest kotwica do konkretnego komentarza
				newLnk.title = 'link do komentarza nr '+j;
				var newImg = document.createElement('img');	//mala ikonka, zagniezdzona, w formacie base64
				newImg.src = "data:image/gif;base64,R0lGODlhCQAJAJEDAJSUlKurq/b29v///yH5BAEAAAMALAAAAAAJAAkAAAIXXI5hwi3XQIORQYDxC07uanGOZSTHUAAAOw==";
				newImg.height = 9;
				newImg.width = 9;
				newImg.vspace = 0;
				newImg.hspace = 0;
				newLnk.appendChild(newImg);
				newDiv.appendChild(newLnk);
				allComms[i].insertBefore(newDiv, allComms[i].firstChild);
			}
		}
	}
})();