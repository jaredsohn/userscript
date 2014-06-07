// ==UserScript==
// @author Serpiko
// @name Darkpirates MenuPlus
// @description - VersiĂłn en EspaĂąol, mejorada.
// @include       http://s*.darkpirates.es/*
// @include       http://s*.darkpirates.cz/*
// @include       http://s*.hu.darkpirates.com/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//

// ************** nastavenĂ­ *************

/*
 * pĹ�Ă­klad:
 *             adresy = new Array('Meg++', 'index.php?mod=labor&lab=1&reiter=1&rez=3',
 *                                         'Que++', 'http://s1.hu.darkpirates.com/game/index.php?mod=labor&lab=1&reiter=1&rez=6');
 *						 'Warium++', 'index.php?mod=labor&lab=1&reiter=1&rez=12',
 *						'Crisolita++', 'index.php?mod=labor&lab=1&reiter=1&rez=15'
 *						'Niciltar++', 'index.php?mod=labor&lab=1&reiter=1&rez=18'
*/
adresy = new Array(	'Megatan++', 'index.php?mod=labor&lab=1&reiter=1&rez=3',
				'Querell++', 'index.php?mod=labor&lab=1&reiter=1&rez=6', 
				'Warium++', 'index.php?mod=labor&lab=1&reiter=1&rez=12',
				'Florisar++', 'index.php?mod=labor&lab=1&reiter=1&rez=9',
 				'Crisolita++', 'index.php?mod=labor&lab=1&reiter=1&rez=15',
				'Niciltar++', 'index.php?mod=labor&lab=1&reiter=1&rez=18',
 				'Hipolio++', 'index.php?mod=labor&lab=1&reiter=1&rez=21');



// ************** zakladni veci **************

// Adresa
var url = window.location.href;

// Hledani
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;			// Constant that gives back the first element by XPath
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constant that gives back a list of elements by XPath
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constant that it gives back a iterator of elements by XPath

/**
 * It makes a search in the document using XPath
 * 
 * Params:
 *	xpath Expression of search
 *	xpres Type of search
 *
 * Returns:
 *	Reference to an element result of XPath
 */
function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

// ****************  menu plus  *****************

var target = find("//div[@id='navi-rand']", XPFirst);

var map_style = document.createElement("style");

var map_menuplus = document.createElement("div");

att = document.createAttribute('style');
att.value = 'position: relative;';

map_menuplus.setAttributeNode(att.cloneNode(true));

z = ' z-index: 3;';
pr = 'position: relative; ';
pa = 'position: absolute; ';

fbila = ' color: #8CA4AE;';
fmodra = ' color: #1B99DF;';
fzelena = ' color: #1BDF23;';
ffialova = ' color: #9E1BDF; font-weight: bold;';

poz = 'background-color: transparent; ';

style = 'a.mplus_z{color: #8CA4AE;} a:hover.mplus_z{color: #1BDF23;}';
style += 'a.mplus_m{color: #8CA4AE;} a:hover.mplus_m{color: #1B99DF;}';

map_style.innerHTML = style;

menuplus = '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#">Menü Plusz</a></li></ul></div>';
menuplus += '<div id="heimatwelten"><ul>';
menuplus += '<li><a href="index.php?mod=shop" class="mplus_z">Kereskedés</a></li>';
menuplus += '<li><a href="index.php?mod=auction" class="mplus_m">Aukció</a></li>';
menuplus += '<li><a href="index.php?mod=market&reiter=5" class="mplus_z">Feketepiac</a></li>';
menuplus += '<li><a href="index.php?mod=laborshop" class="mplus_m">Labor</a></il>';
menuplus += '<li><a href="index.php?mod=packages&reiter=5" class="mplus_m">Erőd Raktár</a></li>';
menuplus += '<li><a href="index.php?mod=job" class="mplus_m">Munka</a></li>';
menuplus += '<li><a href="index.php?mod=training" class="mplus_m">Gyakorlás</a></li>';

menuplus += '<form name="formfindenemy" action="index.php?mod=adventure" method="POST"><input type="hidden" name="mission[3]" value="2"></form>';
menuplus += '<script>function findenemy() { self.document.forms.formfindenemy.submit() }</script>';
menuplus += '<li><a href="javascript:findenemy();" class="mplus_m">Csata</a></li>';

menuplus += '</div></ul>';

// *********** vlastni menu ***********

menuplus += '<div id="klammer-rechts"><ul><li style="position:relative"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#">Fúziók</a></li></ul></div>';
menuplus += '<div id="navcontainer2"><ul>';
for(i=0;i<adresy.length;i=i+2){
	if(adresy[i+1] != "" && adresy[i] != "") {
		menuplus += '<li><a href="';
		menuplus += adresy[i+1];
		menuplus += '" class="mplus_z">';
		menuplus += adresy[i];
		menuplus += '</a></li>';
	}
}
menuplus += '</div></ul>';

map_menuplus.innerHTML = menuplus;

target.appendChild(map_style);
target.appendChild(map_menuplus);
