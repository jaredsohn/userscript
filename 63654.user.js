// ==UserScript==
// @name           TravianiBar PlusPlus (ita)
// @namespace      http://
// @description    Aggiunge una barra nella parte sinistra dello schermo molto utile
// @version        20090926a
// @include        http://www.traviani.it/game.php*
// @include        http://traviani.it/game.php*
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
'background-image: url(http://npc.duak007.de/npc.jpg);'+
'top:10px; left:200px;'+
'width:573px; height:150px; '+
'}')
addGlobalStyle(
'a.info1{ '+
'position:relative;'+ 
'z-index:1; '+
'color:#000;'+
'text-decoration:none;'+
'}'+ 
'a.info1:hover{'+
'z-index:2;'+
'}'+ 
'a.info1 span{'+
'display: none;'+
'}'+ 
'a.info1:hover span{'+ 
'display:block;'+
'position:absolute;'+ 
'background-image: url(http://travian.dyndns.info/npc.png);'+
'top:10px; left:200px;'+
'width:577px; height:349px; '+
'}')



var menuinner = '<img style="position: absolute; top: 6px; left: 10px; z-index: 98;" src="img/icons/supporticon_rules.gif" width="17px" height="17px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Apri/chiudi\');" id="addOnMinimizer"/>'+
'<div style="display: none; position: absolute; padding: 2px; top: 2px; left: 5px; width: 200px; height: auto; z-index: 1; background: url(img/chatbg.jpg); text-size: 11px; color: rgb(114, 57, 0); text-align: left;" id="interfaceDivAddOn">'+
'<div id="TitleName" class="chatHeader" style="width: 194px;">Traviani Bar PlusPlus</div>'+
'<b>Movimento:</b> <a onclick="javascript:void(movementInterval=1); return false;">Velocità++</a><br/>'+
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;">Casa mia</a> | '+
'<a onclick="xajax_click(5631, 5444, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Propia gilda</a> | '+
'<a onclick="xajax_click(7022, 4905, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Taverna di Senkel</a> | '+
'<a onclick="xajax_click(6090, 5120, 6015, 5414, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Cartello gilde</a> | '+
'<a onclick="xajax_click(7507, 4600, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Cercare funghi</a> | '+
'<a onclick="xajax_click(8575, 5506, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Palude</a> | '+
'<a onclick="xajax_click(7590, 5223, 7542, 5322, \'fight<<\', BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr); return false;">Arena</a> | '+
'<a onclick="xajax_click(4328, 7003, 4349, 7038, \'bank<<\', BGlocation, BGlocationOwner, -2, 0, 0, 0); return false; ">Banca</a> | '+
'<a onclick="xajax_click(6886, 5311, 6808, 5133, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Mercato</a> | '+
'<a onclick="xajax_click(9421, 4417, 9329, 4707, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">-</a> | '+
'<a onclick="xajax_click(10413, 6880, 10315, 6985, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">-</a> | '+
'<a onclick="xajax_click(8196, 4751, 7876, 4781, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Matricia</a> | '+
'<a onclick="xajax_click(8185, 7430, 8185, 7430, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">-</a> | '+
'<a onclick="xajax_click(7200, 6720, 7200, 6720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Aurora</a> | '+
'<a onclick="xajax_click(7575, 5647, 7575, 5647, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Karamix</a> | '+
'<a onclick="xajax_click(7910, 6870, 7910, 6870, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Vigneto</a><br/>'+
'<hr>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713258-60\',\'\'); return false;"><b>NPG:</b></a><br/>'+
'<a onclick="xajax_click(6271, 5260, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter4/Fighter4_stand_l.gif" width="26.25" border="0" height="37.5"></a> | '+
'<a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter3/Fighter3_stand_l.gif" width="23.25" border="0" height="37.5"></a> | '+
'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter2/Fighter2_stand_l.gif" width="33.75" border="0" height="41.25"></a> | '+
'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter1/Fighter1_stand_l.gif" width="23.25" border="0" height="35.25"></a> | '+
'<a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter11/Fighter11_stand_l.gif" width="37.5" border="0" height="37.5"></a> | '+
'<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter5/Fighter5_stand_l.gif" width="37.5" border="0" height="37.5"></a> | '+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter9/Fighter9_stand_l.gif" width="23.25" border="0" height="37.5"></a> | '+
'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter8/Fighter8_stand_l.gif" width="37.5" border="0" height="37.5"></a> | '+
'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter10/Fighter10_stand_l.gif" width="23.25" border="0" height="37.5"></a> | '+
'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter7/Fighter7_stand_l.gif" width="37.5" border="0" height="37.5"></a><br/>'+
'<hr>'+
'<b>Finestre utili:</b><br/>'+
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;">Offerte del mercato</a> | '+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-80\',\'\'); return false;">Raccolta di blog utili</a> | '+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-59\',\'\'); return false;">Quest 1° gen</a> | '+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-205\',\'\'); return false;">Quest 2° gen</a> | '+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-60\',\'\'); return false;">Mappa sblocata</a>'+
'<hr>'+
'<b>2° punti di estrazione:</b><br/>'+
'<a onclick="xajax_click(8446, 6354, 8446, 6354, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Legno</a> | '+
'<a onclick="xajax_click(9600, 5460, 9600, 5460, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Argilla</a> | '+
'<a onclick="xajax_click(6906, 7252, 6906, 7252, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Minerale</a> | '+
'<a onclick="xajax_click(7348, 6394, 7348, 6394, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Grano</a> | '+
'<a onclick="xajax_click(6735, 5973, 6735, 5973, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Farina</a> | '+
'<a onclick="xajax_click(9380, 6126, 9380, 6126, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Carbone</a> | '+
'<a onclick="xajax_click(6317, 6595, 6317, 6595, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Mattoni</a> | '+
'<a onclick="xajax_click(7579, 6071, 7579, 6071, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Ferro</a> | '+
'<a onclick="xajax_click(6239, 6981, 6239, 6981, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Assi</a><br/>'+
'<hr>'+
     '<a onclick="xajax_showModule(\'blogs\',\'comments\',\'723460-161\',\'\'); return false;"><b>Pozioni:</b></a><br/>'+
     '<img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionA2.gif" width="20" border="0" height="20"><sup><b>-->Cura</b></sup><br/>'+
     '<img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionB2.gif" width="20" border="0" height="20"><sup><b>-->Forza</b></sup><br/>'+
     '<img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs1.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionC2.gif" width="20" border="0" height="20"><sup><b>-->Agilità</b></sup><br/>'+
     '<img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs2.gif" width="20" border="0" height="20"><sup><b>=</b></sup><img src="img/weapons/potionD2.gif" width="20" border="0" height="20"><sup><b>-->Difesa</b></sup><br/>'+
     '<hr>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-158\',\'\'); return false;"><b>Emoticon del forum:</b></a><br/>'+
'<img src="/vbb/images/smilies/confused.gif" width="15" border="0" height="20"><sup><b>--> :confused: | </b></sup><img src="/vbb/images/smilies/rolleyes.gif" width="15" border="0" height="15"><sup><b>--> :rolleyes:</b></sup><br/>'+
'<img src="/vbb/images/smilies/smile.gif" width="15" border="0" height="15"><sup><b>--> :)  | </b></sup><img src="/vbb/images/smilies/frown.gif" width="15" border="0" height="15"><sup><b>--> :( | </b></sup><img src="/vbb/images/smilies/biggrin.gif" width="15" border="0" height="15"><sup><b>--> :D</b></sup><br/>'+
'<img src="/vbb/images/smilies/wink.gif" width="15" border="0" height="15"><sup><b>--> ;) | </b></sup><img src="/vbb/images/smilies/tongue.gif" width="15" border="0" height="15"><sup><b>--> :p</b></sup> | </b></sup><img src="/vbb/images/smilies/eek.gif" width="15" border="0" height="15"><sup><b>--> :eek:</b></sup><br/>'+
'<hr>'+
'<b>Links:</b><br/>'+
'<a href="http://www.travianerwiki.de" target="_blank">TravianerWiki</a><br/> '+
'<a href="http://traviantrucchi.altervista.org" target="_blank">Travian Trucchi</a><br/> '+
'<hr>'+
'Creato da <a onclick="xajax_showModule(\'profile\',\'player\',\'731687\',\'\'); return false;"><i>Leonardo I</i></a>'+
'</div>';

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}