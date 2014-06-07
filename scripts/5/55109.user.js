// ==UserScript==
// @name           TravianerBar v0.8 beta
// @namespace      http://
// @description    Dieses Skript Basiert auf dem Skript TravianerBar von Flying Finger (http://userscripts.org/scripts/show/30224) und wurde von entchen66 bearbeitet. Benutze mein verbessertes Skript um die das Leben in Travian leichter zu machen ;)
// @version        0.8b
// @include        http://www.travianer.de/*
// @include        http://travianer.de/*
// ==/UserScript==

function toggleAddOn() {
	if ($('interfaceDivAddOn').style.display == 'none') {
		$('interfaceDivAddOn').style.display = 'block';
	} else {
		$('interfaceDivAddOn').style.display = 'none';
	}
}

function addElem(elem, html, attributes, style, parent){
	var aElem = document.createElement(elem);
	if (html) aElem.innerHTML = html;
	if (attributes)	for (a in attributes) aElem.setAttribute(a, attributes[a]);
	if (style) for (a in style) aElem.style[a] = style[a];
	if (!parent) parent = $tags('body')[0];
		else parent = (typeof(parent) == 'string') ? $(parent) : parent;
	if (!parent) return false;
	parent.appendChild(aElem);
	return aElem;
}

function $tags(tag){
	return document.getElementsByTagName(tag);
}

function $(id){
	return document.getElementById(id);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'a.info{ '+
'position:relative;'+ 
'z-index:1; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info:hover{'+
'z-index:2;'+
'}'+ 
'a.info span{'+
'display: none;'+
'}'+ 
'a.info:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://travian.dyndns.info/npc.png);'+
'top:10px; left:200px;'+
'width:603px; height:361px; '+
'}')



var menuinner = '<img style="position: absolute; top: 6px; left: 10px; z-index: 98;" src="img/icons/supporticon_rules.gif" width="17px" height="17px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Zusatzfunktionen ein-/ausblenden\');" id="addOnMinimizer"/>'+
'<div style="display: none; position: absolute; padding: 2px; top: 2px; left: 5px; width: 200px; height: auto; z-index: 1; background: url(img/chatbg.jpg); text-size: 11px; color: rgb(114, 57, 0); text-align: left;" id="interfaceDivAddOn">'+
'<div id="TitleName" class="chatHeader" style="width: 194px;">TravianerBar v0.8b</div>'+
'<b>Gehe zu:</b><br/>'+
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;">eigenes Haus</a> | '+
'<a onclick="xajax_click(6174, 5168, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Gildenhäuser</a> | '+
'<a onclick="xajax_click(7022, 4905, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Senkel</a> | '+
'<a onclick="xajax_click(7590, 5223, 7542, 5322, \'fight<<\', BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr); return false;">Arena</a> | '+
'<a onclick="xajax_click(4328, 7003, 4349, 7038, \'bank<<\', BGlocation, BGlocationOwner, -2, 0, 0, 0); return false; ">Bank</a> | '+
'<a onclick="xajax_click(5898, 5313, 6015, 5414, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Gildenlager</a> | '+
'<a onclick="xajax_click(8626, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Sumpf</a> | '+
'<a onclick="xajax_click(6886, 5311, 6808, 5133, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Händler</a> | '+
'<a onclick="xajax_click(9421, 4417, 9329, 4707, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Lumpik</a> | '+
'<a onclick="xajax_click(10413, 6880, 10315, 6985, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Eulalie</a> | '+
'<a onclick="xajax_click(8196, 4751, 7876, 4781, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Matricia</a><br/>'+
'<hr>'+
//
//
     '<b>Freunde:</b><br/>'+
     //
     'Hier ist Platz für eure Freunde... Wie ihr hier eure freunde einfügen könnt seht ihr im Source Code ;)<br>'+
     //
     //Also damit ihr eure Freunde hier dazutun könnt, müsst ihr einfach das hier nehmen und in eine neue Zeile kopieren: '<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, 772508, 0); return false;">entchen66</a><br/>'+
     //
     //Dir Zeile darf nicht mit // beginnen sonst klappt es nicht...
     //Ok also weiter... wenn ihr in der rangliste nach eurem Freund sucht müsst ihr ihn makirten und wenn ihr firefox benutzt rechtsklicken und Auswahl-Quelltext anzeigen machen.......
     //Solltet ihr das geschafft haben, wird der nähste schritt leicht. also in der Spalte die ihr vorhin kopiert habt steht ja eine nummer (772508). Dort fügt ihr die Nummer eures Freundes aus dem Quelltext und ändert auch den Namen.
     '<hr>'+
//
//
'<b>NPC-Kämpfer:</b><br/>'+
'<a onclick="xajax_click(6271, 5260, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC1</a> | '+
'<a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC2</a> | '+
'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC3</a> | '+
'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC4</a> | '+
'<a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC5</a> | '+
'<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC6</a> | '+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC7</a> | '+
'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC8</a> | '+
'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC9</a> | '+
'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC10</a><br/>'+
'<hr>'+
'<b>Markt:</b><br/>'+
'<a class=info href="http://www.pflock.de/travianer/npc/alle.txt">NPC-Preise<span></span></a><br/>'+
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;">öffne Markt</a>'+
'<hr>'+
//
//
     '<b>Tränke:</b><br/>'+
     '<img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionA2.gif" width="20" border="0" height="20"><sup><b>-->Lebenspunkte</b></sup><br/>'+
     '<img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionB2.gif" width="20" border="0" height="20"><sup><b>-->Angriffswert</b></sup><br/>'+
     '<img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionC2.gif" width="20" border="0" height="20"><sup><b>-->Geschicklichkeit</b></sup><br/>'+
     '<img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionD2.gif" width="20" border="0" height="20"><sup><b>-->Rüstungswert</b></sup><br/>'+
     '<hr>'+
//
//
     '<b>Pilze:</b><br/>'+
//Menü1
//Menü2
//Menü3
//Menü4
     '<hr>'+
//
//
'<b>Nützliche Links:</b><br/>'+
'<a href="http://www.travianerwiki.de">TravianerWiki</a>'+
'</div>';

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}