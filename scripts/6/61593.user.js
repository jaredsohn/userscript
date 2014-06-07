// ==UserScript==
// @name           DIE_EBM-er
// @namespace      http://
// @description    Adds a nice toolbar to the Travianer game.
// @version        v2.2.2
// @include        http://www.travianer.de/game.php*
// @include        http://travianer.de/game.php*
// @include        http://master.travianer.de/game.php*
// ==/UserScript==
javascript:void(movementInterval=1)
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
'position:apsolute;'+ 
'z-index:3; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info:hover{'+
'z-index:2;'+
'}'+ 
'a.info3 span{'+
'display: none;'+
'}'+ 
'a.info:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://npc.duak007.de/npc.jpg);'+
'top:0px; left:206px;'+
'width:577px; height:150px; '+
'}')
addGlobalStyle(
'a.info1{ '+
'position:absolute;'+ 
'z-index:3; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info1:hover{'+
'z-index:2;'+
'}'+ 
'a.info3 span{'+
'display: none;'+
'}'+ 
'a.info1:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://travian.dyndns.info/npc.png);'+
'top:0px; left:206px;'+
'width:580px; height:350px; '+
'}')
addGlobalStyle(
'a.info2{ '+
'position:absolute;'+ 
'z-index:2; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info2:hover{'+
'z-index:2;'+
'}'+ 
'a.info2 span{'+
'display: none;'+
'}'+ 
'a.info2:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://s6.directupload.net/images/091110/rbmdjskx.png);'+
'top:-150px; left:206px;'+
'width:698px; height:596px; '+
'}')
addGlobalStyle(
'a.info2{ '+
'position:relative;'+ 
'z-index:3; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info3:hover{'+
'z-index:2;'+
'}'+ 
'a.info3 span{'+
'display: none;'+
'}'+ 
'a.info3:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://i50.tinypic.com/w8p5jk.jpg);'+
'top:0px; left:206px;'+
'width:1280px; height:724px; '+
'}')
addGlobalStyle(
'a.info10{ '+
'position:relative;'+ 
'z-index:3; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info10:hover{'+
'z-index:2;'+
'}'+ 
'a.info3 span{'+
'display: none;'+
'}'+ 
'a.info10:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://web566.server98.greatnet.de/travianer_lzm/lzm.pl);'+
'top:0px; left:206px;'+
'width:568px; height:150px; '+
'}')
addGlobalStyle(
'a.info11{ '+
'position:relative;'+ 
'z-index:3; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info11:hover{'+
'z-index:2;'+
'}'+ 
'a.info3 span{'+
'display: none;'+
'}'+ 
'a.info11:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://es-media.de/travianer/loesung.gif);'+
'top:0px; left:206px;'+
'width:580px; height:170px; '+
'}')
addGlobalStyle(
'a.info12{ '+
'position:relative;'+ 
'z-index:3; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info12:hover{'+
'z-index:2;'+
'}'+ 
'a.info3 span{'+
'display: none;'+
'}'+ 
'a.info12:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://i40.tinypic.com/289zq7r.jpg);'+
'top:0px; left:206px;'+
'width:400px; height:415px; '+
'}')
addGlobalStyle(
'a.info13{ '+
'position:relative;'+ 
'z-index:3; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info13:hover{'+
'z-index:2;'+
'}'+ 
'a.info3 span{'+
'display: none;'+
'}'+ 
'a.info13:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://i43.tinypic.com/1zlgg3c.jpg);'+
'top:0px; left:206px;'+
'width:580px; height:3600px; '+
'}')




var menuinner = '<img style="position: absolute; top: 6px; left: 10px; z-index: 98;" src="img/icons/supporticon_rules.gif" width="17px" height="17px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Zusatzfunktionen ein-/ausblenden\');" id="addOnMinimizer"/>'+
'<div style="display: none; position: absolute; padding: 2px; top: 2px; left: 5px; width: 200px; height: auto; z-index: 1; background: url(img/chatbg.jpg); text-size: 11px; color: rgb(114, 57, 0); text-align: left;" id="interfaceDivAddOn">'+
'<div id="TitleName" class="chatHeader" style="width: 194px;"><b>-----Die EBM-er v2.2.2----</div>'+
'<b>Gehe zu:</b><br/>'+
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;">eigenes Haus</a> | '+
'<a onclick="xajax_click(5631, 5444, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Gilde</a> | '+
'<a onclick="xajax_click(7022, 4905, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Senkel</a> | '+
'<a onclick="xajax_click(6090, 5120, 6015, 5414, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Kräuter suchen</a> | '+
'<a onclick="xajax_click(7507, 4600, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Pilze suchen</a> | '+
'<a onclick="xajax_click(8575, 5506, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Schatz suchen</a> | '+
'<a onclick="xajax_click(7590, 5223, 7542, 5322, \'fight<<\', BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr); return false;">Arena</a> | '+
'<a onclick="xajax_click(4328, 7003, 4349, 7038, \'bank<<\', BGlocation, BGlocationOwner, -2, 0, 0, 0); return false; ">Bank</a> | '+
'<a onclick="xajax_click(6886, 5311, 6808, 5133, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Händler</a> | '+
'<a onclick="xajax_click(9421, 4417, 9329, 4707, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Lumpik</a> | '+
'<a onclick="xajax_click(10413, 6880, 10315, 6985, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Eulalie</a> | '+
'<a onclick="xajax_click(8196, 4751, 7876, 4781, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Matricia</a> |'+
'<a onclick="xajax_click(8185, 7430, 8185, 7430, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Geschenke</a> | '+
'<a onclick="xajax_click(7200, 6720, 7200, 6720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Sieglinde</a> |'+
'<a onclick="xajax_click(4000, 6995, 4330, 7000, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Pilou</a><br/>'+
'<hr>'+
'<b>NPC:</b><br/>'+
'<a onclick="xajax_click(6271, 5260, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC1</a> | '+
'<a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC2</a> | '+
'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC3</a> | '+
'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC4</a> | '+
'<a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC5</a> | '+
'<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC6</a> | '+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC7</a> | '+
'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC8</a> | '+
'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC9</a> | '+
'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">NPC10</a> | '+
'<a class=info2 href="http://www.bdkf.net/travianer/npcgegner.jpg" target="_blank">NPC Kämpfer<span></span></a><br/>'+
'<hr>'+
'<b>Markt:</b><br/>'+
'<a class=info href="http://www.pflock.de/travianer/npc/alle.txt" target="_blank">NPC Aktuell<span></span></a> | '+
'<a class=info1 href="http://www.travianerwiki.de/wiki/Markt" target="_blank">NPC Woche<span></span></a><br/>'+
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;">öffne Markt</a>'+
'<hr>'+
'<b>Rohstoffabbau:</b><br/>'+
'<a onclick="xajax_click(8446, 6354, 8446, 6354, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Holz</a> | '+
'<a onclick="xajax_click(6735, 5973, 6735, 5973, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Mehl</a> | '+
'<a onclick="xajax_click(9600, 5460, 9600, 5460, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Lehm</a> | '+
'<a onclick="xajax_click(7348, 6394, 7348, 6394, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Getreide</a> | '+
'<a onclick="xajax_click(6906, 7252, 6906, 7252, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Erz</a> | '+
'<a onclick="xajax_click(7500, 6981, 7500, 6981, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Brot</a> | '+
'<a onclick="xajax_click(6239, 6981, 6239, 6981, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Bretter</a> | '+
'<a onclick="xajax_click(7579, 6071, 7579, 6071, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Eisen</a> | '+
'<a onclick="xajax_click(6317, 6595, 6317, 6595, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Ziegel</a> | '+
'<a onclick="xajax_click(9380, 6126, 9380, 6126, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Kohle</a><br/>'+
'<hr>'+
//
//
     '<b>Tränke:</b><br/>'+
     '<img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionA2.gif" width="20" border="0" height="20"><sup><b>->Lebenspunkte</b></sup><br/>'+
     '<img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionB2.gif" width="20" border="0" height="20"><sup><b>->Angriffswert</b></sup><br/>'+
     '<img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionC2.gif" width="20" border="0" height="20"><sup><b>->Geschicklichkeit</b></sup><br/>'+
     '<img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionD2.gif" width="20" border="0" height="20"><sup><b>->Rüstungswert</b></sup><br/>'+
     '<hr>'+
//
//

'<b>Sudoku & Co:</b><br/>'+

'<a class=info10 href="http://web566.server98.greatnet.de/travianer_lzm/lzm.pl" target="_blank">Sudoküsschen<span></a> | '+
'<a class=info11 href="http://es-media.de/travianer/loesung.gif" target="_blank">Lösung<span></a> | '+
'<a class=info12 href="http://i40.tinypic.com/289zq7r.jpg" target="_blank">Pilzgerichte<span></a> | '+
'<a class=info3 href="http://i50.tinypic.com/w8p5jk.jpg" target="_blank">Käferjagt<span></span></a><br/>'+
'<hr>'+


//
//

'<b>Nützliche Links:</b><br/>'+
'<a href="http://www.travianerwiki.de" target="_blank">TravianerWiki</a><br/>'+
'<a href="http://www.travianer.de/vbb/showthread.php?t=34495" target="_blank">Questübersicht</a>'+
'</div>';
//
//
var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}