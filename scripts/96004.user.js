// ==UserScript==
// @name           Fhu Forum Fapados Tweaks
// @namespace      http://freeforum.n4.hu/feliratok/
// @description    Funkcionalis atalakitasok az fhu forumhoz. Nem csak occso, de jobb is.
// @include        http://freeforum.n4.hu/feliratok/*
// @author         priv_sec
// @version        0.1A
// ==/UserScript==

/* BEALLITASOK */
var st=[
"igen",			//0. "Jelentes a moderatornak" link eltavolitasa (igen/nem)
"igen",			//1. Lablec eltavolitasa (igen/nem)
"igen",			//2. "Ugras" mezo eltavolitasa (igen/nem)
"igen",			//3. "Gyors valasz" mezo fixalva az ablak sarkaba/szelere, hogy gorgeteskor is vegig lathato legyen (igen/nem) 
"jobbalso",		//4. "Gyors valasz" mezo pozicioja az ablakban - a kepernyo sarkaiban, felso vagy also szelen
				//   (balalso/jobbalso/balfelso/jobbfelso/alulkozep/felulkozep)
"igen",			//5. A bongeszo fejleceben a cim moge illessze be a "SuperSubtitles"-t (igen/nem)
"igen",			//6. Legyen kedvencek ikon (igen/nem)
"igen"			//7. A teljes fejlec legyen elrejtheto (igen/nem)
];
/* BEALLITASOK VEGE */


// 'jelentes a moderatornak' kiszed
if (st[0] == "igen") {
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//div[@class='smalltext reportlinks']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		// do something with thisDiv
		thisDiv.parentNode.removeChild(thisDiv);
	}
}


// also-felso csik tartalom felett elrejt
if (st[1] == "igen")
	document.getElementsByTagName("body")[0].style.padding = 0;


// lablec elrejt
if (st[1] == "igen" && document.getElementById("footer_section") != null)
	document.getElementById("footer_section").setAttribute("style", "display:none");

	
// 'ugras' mezo elrejt
if (st[2] == "igen" && document.getElementById("display_jump_to") != null) {
		document.getElementById("display_jump_to").setAttribute("style", "display:none");
}


// 'gyors valasz' mezo fix pozicio, jobb also sarokba
if (st[3] == "igen" && document.getElementById('quickreplybox') != null) {
	if (st[4] == "felulkozep")
		var ps = "top:0px;left:0px;width:100%";
	else if (st[4] == "alulkozep")
		var ps = "bottom:0px;left:0px;width:100%";
	else if (st[4] == "balalso")
		var ps = "bottom:0px;left:0px";
	else if (st[4] == "balfelso")
		var ps = "top:0px;left:0px";
	else if (st[4] == "jobbfelso")
		var ps = "top:0px;right:0px";
	else
		var ps = "bottom:0px;right:0px";
	var b = document.getElementById('quickreplybox');
	b.setAttribute("style", "position:fixed;" + ps)
	// 'gyors valasz' kattinthato felso csik
	var allDivs, thisDiv;
	var p = b;
	allDivs = document.evaluate(
		"//div[@class='cat_bar']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		if (thisDiv.parentNode == p) {
		thisDiv.setAttribute('onclick','javascript:oQuickReply.swap();');
		storeme = thisDiv;
		}
	}
	// a linkekbol kiszedjuk, hogy ne zavarjon be
	storeme.getElementsByTagName('a')[0].setAttribute('href','javascript:');
	storeme.getElementsByTagName('a')[1].setAttribute('href','javascript:');
}


if (st[5] == "igen") {
	// cim moge " - SuperSubtitles"
	var title = document.title;
	document.title = title + " - SuperSubtitles";
}


if (st[6] == "igen") {
	// kedvencek ikon
	var headID = document.getElementsByTagName("head")[0];         
	var favIco = document.createElement('link');
	favIco.type = 'image/x-icon';
	favIco.rel = 'shortcut icon';
	favIco.href = 'data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAA9PT3%' +
	'2BPT09%2Fz09Pf89PT3%2FPT09%2Fz09Pf89PT3%2FPT09%2Fz09Pf89PT3%2FPT09%2Fz09Pf89PT3%2FPT09%2Fz09Pf89PT3%2FPz8%2F%2FkBAQP9AQED%2F' +
	'QEBA%2F0BAQP9TU1P%2FXl1e%2F11dXv9dXV3%2FXV1e%2F11dXf9ISEj%2FQEBA%2F0BAQP9AQED%2FQEBA%2F0FBQf5BQUH%2FQUFB%2F0JCQv%2BMjIz%2FwsL' +
	'C%2F87Ozv%2FPzs%2F%2Fzs7O%2F87Ozv%2Bfn5%2F%2FYWFh%2F0tLS%2F9GRkb%2FQkJC%2F0JCQv9CQkL%2BQ0ND%2F0NDQ%2F9hYWH%2F2tva%2F%2Fv%2B%2' +
	'FP%2F7%2Ffv%2F%2B%2F37%2F%2Fr9%2B%2F%2F9%2Fv3%2F1tbW%2F6qqqv%2BQkJD%2Fd3d3%2F0VFRf9ERET%2FRERE%2FkVFRf9FRUX%2Fjo6O%2F%2F3%2B%' +
	'2Ff%2F7%2Fvz%2F%2Bv37%2F%2Fr9%2B%2F%2F6%2Ffv%2F%2FP78%2F%2F3%2B%2FP%2F29vX%2F%2Ff39%2F4iIiP9HR0f%2FRUVF%2F0VFRf5GRkb%2FRkZG%2' +
	'F5OTk%2F%2F9%2F%2F3%2F%2B%2F78%2F%2Fr9%2B%2F%2F6%2Ffv%2F%2Bv37%2F%2Fv9%2B%2F%2F7%2Ffv%2F%2FP78%2F%2Fr8%2Bv90dXX%2FR0dH%2F0dHR' +
	'%2F9GRkb%2BR0dH%2F2FhYf%2FFxcX%2F%2FP78%2F%2Fr%2B%2FP%2F6%2Ffv%2F%2Bv37%2F%2Fr9%2B%2F%2F6%2Ffv%2F%2B%2F78%2F%2BDh4P%2Fe3t7%2Fa' +
	'Gho%2F1tbW%2F9SUlL%2FSUlJ%2FoSEhP%2Fn5%2Bf%2Furq6%2F%2F3%2B%2FP%2F7%2Fvz%2F%2Bv37%2F%2Fr9%2B%2F%2F6%2Ffv%2F%2B%2F78%2F%2Fv%2B%' +
	'2FP%2Fv8O%2F%2Fzc3N%2F7a2tv%2BNjY3%2Fbm5u%2F3BwcP7ExMT%2Fqamp%2F8jIyP%2F9%2Fvz%2F%2B%2F78%2F%2Fr9%2B%2F%2F6%2Ffv%2F%2Bv37%2F%2F' +
	'r9%2B%2F%2F6%2Ffv%2F19jX%2F3V1df9OTk7%2F5eXl%2F7a2tv%2Bjo6P%2Bi4uL%2F4aGhv%2F8%2Fv3%2F%2B%2F78%2F%2Fv%2B%2FP%2F7%2Fvz%2F%2Bv37%' +
	'2F%2Fr9%2B%2F%2F7%2Fvz%2F%2B%2F78%2F%2Fj6%2Bf%2BRkZH%2Fu7u7%2F6Wlpf%2BOjo7%2FtLS0%2Ft%2Ff3%2F%2B3t7f%2F2dva%2F%2Fz%2B%2Ff%2F8%' +
	'2Fv3%2F%2FP78%2F%2Fz%2B%2Ff%2F8%2Fv3%2F%2B%2F79%2F%2Fv%2B%2FP%2Fu7%2B7%2Fzs7O%2F%2Brq6v90dHT%2FdHR0%2F4SEhP66urr%2FUFBQ%2F5ubm%' +
	'2F%2Brq6v%2FoqKi%2F8rKyv96enr%2FfX59%2F%2Bnp6f%2Fp6en%2F1dXV%2F7Ozs%2F%2Fe3t7%2F0NDQ%2F6ioqP9KSkr%2BZGRk%2F7e3t%2F%2FMzMz%2FxcX' +
	'F%2F7a2tv9MTEz%2FQkJC%2F0FBQf%2FJycn%2FYmJi%2F1dXV%2F%2B1tbX%2FfHx8%2F0tLS%2F%2FY2Nj%2FPz8%2F%2Fj8%2FP%2F8%2BPj7%2FVlZW%2F09PT%' +
	'2F89PT3%2FPz8%2F%2Fz8%2FP%2F8%2FPz%2F%2FYmJi%2F6urq%2F9UVFT%2FxMTE%2F3p6ev%2Bnp6f%2Ftra2%2Fzw8PP47Ozv%2FOzs7%2Fzs7O%2F87Ozv%2FOzs' +
	'7%2Fzs7O%2F87Ozv%2FOzs7%2Fzs7O%2F9WVlb%2Fra2t%2F9XV1f%2FCwsL%2FhYWF%2Fzw8PP84ODj%2BODg4%2Fjg4OP44ODj%2BODg4%2Fjg4OP44ODj%2BODg4' +
	'%2Fjg4OP44ODj%2BOTk5%2FklJSf5VVVX%2BSUlJ%2Fjg4OP44ODj%2BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
	'AAAAAAAAAAAA%3D';
	headID.appendChild(favIco);
}


if (st[7] == "igen") {
	// elrejtheto fejlec 
	var header = document.getElementById('header');
	var d = document.createElement('div');
	d.id = "header_collapse";
	d.style.backgroundColor = "#CCC";
	d.style.width = "100%";
	d.innerHTML = '<a href="#" id="href_hideHeader"' +
	'onclick="document.getElementById(\'header\').setAttribute(\'style\',\'display:none\');' +
	'document.getElementById(\'header_collapse\').setAttribute(\'style\',\'background:#CCC\');' +
	'document.getElementById(\'href_showHeader\').setAttribute(\'style\',\'display:inline;padding:10px; color:#fff; font-weight:bold;\');' +
	'document.getElementById(\'href_hideHeader\').setAttribute(\'style\',\'display:none\');"' +
	'style="margin:10px; color:#fff; font-weight:bold">Elrejt&eacute;s</a>' + 
	'<a href="#" id="href_showHeader" onclick="' +
	'document.getElementById(\'header\').setAttribute(\'style\',\'display:normal\');' +
	'document.getElementById(\'header_collapse\').setAttribute(\'style\',\'background:none; margin:0px 0 0px 10px;\');' +
	'document.getElementById(\'href_hideHeader\').setAttribute(\'style\',\'display:inline;padding:0 5px 0 5px  ; color:#fff; font-weight:bold;background:#000\');' +
	'document.getElementById(\'href_showHeader\').setAttribute(\'style\',\'display:none\');"' +
	'style="margin:10px; color:#fff; font-weight:bold">Megjelen&iacute;t&eacute;s</a>';
	header.parentNode.insertBefore(d,header);
	document.getElementById('header').setAttribute('style','display:none');
	document.getElementById('header_collapse').setAttribute('style','background:#CCC');
	document.getElementById('href_hideHeader').setAttribute('style','display:none');
}