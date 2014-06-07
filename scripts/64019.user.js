// ==UserScript==
// @name           BARRA per TURK
// @namespace      http://
// @description    Aggiunge una barra nella parte sinistra dello schermo molto utile
// @version        20100416a
// @include        http://www.traviani.it/game.php*
// @include        http://traviani.it/game.php*
// ==/UserScript==

//ARCHIVIO
//<div class="active"><a onclick="xajax_showModule('mail','archive',0); return false;" href="" class="menuItem">Archivio</a></div>

//APPUNTI
//<div class="active"><a class="menuItem" href="" onclick="xajax_showModule('mail','notes',0); return false;">Appunti</a></div>

/*SETTAGGI VARI in STYLE="...."

** Cursore a MANINA al passaggio sopra un link **
style="display: inline; cursor: pointer; margin-left: 0.3em; margin-right: -15px;"> CURSORE A MANINA AL PASSAGGIO

color: [colore];			TESTO nel COLORE
	Black = 	NERO 		Green = 	VERDE SCURO
	Silver = 	ARGENTO 	Lime = 		VERDE CHIARO
	Gray = 		GRIGIO 		Olive = 	VERDE MILITARE
	White = 	BIANCO 		Yellow = 	GIALLO
	Maroon = 	MARRONE 	Navy = 		BLU SCURO
	Red = 		ROSSO 		Blue = 		BLU CHIARO
	Purple = 	PORPORA 	Teal = 		CARTA DA ZUCCERO
	Fuchsia = 	FUCSIA		Aqua = 		AZZURRO

width: 220px; height: auto;	LARGHEZZA E HALTEZZA IMMAGINI (si può mettere anche XX%)
z-index: 98;				ORDINE SOVRAPPOSIZIONE (il n° maggiore sopra gli altri)	
font-size: 12px;			GRANDEZZA FONT
text-align: center;			POSIZIONE DELLA SCRITTA SULLA RIGA: left; center; right;
position: relative; 		POSIZIONE DELL'IMMAGINE [ABSOLUTE, RELATIVE]
border: 1px solid black;	BORDO INTORNO ALL'IMMAGINE/TESTO
left: 0px; right: 0px; top: 0px; 	SPOSTA L'IMMAGINE ORIZZONTALMENTE, VERTICALMENTE

** TIPI DI CARATTERI **
    <I>,</I>: 						ITALIC
    <B>,</B>: 						GRASSETTO
    <BIG>,</BIG>: 					GRANDE
    <SMALL>,</SMALL>: 				PICCOLO
    <STRIKE>,<S>,</STRIKE>,</S>:	Testo con la linea a metà
    <U>,</U>: 						SOTTOLINEATO

**BORDO COLORATO intorno alla SEZIONE {è un FORM}
'<form style="color: black; font-size: 12px; border: 1px solid red;">'+
'</form>'+

** NOTE CON CURSORE **
'<div style="overflow: auto; height: 70px; width: 100%;">'+
'</div>'+

*/


/******** VISUALIZZA IMMAGINE AL PASSAGGIO
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
'background-image: url(URL DELLA IMMAGINE);'+
'top:0px; left:190px;'+
'width:100px; height:100px; '+
'}')

'<a class=info1 href="URL DELLA IMMAGINE" "EVENTO" <span></span></a></div>'+
*/

/********** MENU ***********
'<img id="chatGroupButton10" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(10);"/>'+
'<div id="chatGroupDiv10" style="display: block;">'+

'</div>'+

*/

// document.getElementById("toolTipDivParent").style.visibility = "hidden"; // Toglie i suggerimenti al passaggio del mouse


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
'background-image: url(http://imgcash2.imageshack.us/img96/5561/avatarxh.jpg);'+ //url di dove è hostata l'immagine
'top:0px; left:190px;'+// valori di quanto deve spostarsi rispetto il link attivo
'width:100px; height:100px; '+ // grandezza della foto
'}')


//COMBATTI CON IL PROSSIMO NPC
/*var fastNPC = document.createElement('div');
fastNPC.innerHTML = '<a style="color: #FFFFFF" onclick="xajax_click(7606, 5332, 7610, 5334, \'fight<go<-39#-39#-39#-39\', 0, 0, 0, 0, -1, 0, 0); return false;"><img src="/img/bg/objects/people/fighter/fighter4/Fighter4_stand_l.gif" width="26"  height="37">';
fastNPC.style.display = 'block';
fastNPC.style.position = 'absolute';
fastNPC.style.top = 110;
fastNPC.style.left = 110;
document.body.appendChild(fastNPC);
*/

//ICONA + TITOLO
var menuinner = '<img style="position: absolute; top: 57px; left: 10px; z-index: 98;" src="/img/icons/vote1.gif" width="16px" height="16px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Apri/chiudi\');" id="addOnMinimizer"; collapseChatGroup(11); collapseChatGroup(12); collapseChatGroup(13); collapseChatGroup(14); collapseChatGroup(15); collapseChatGroup(16); collapseChatGroup(17); collapseChatGroup(18); collapseChatGroup(19); collapseChatGroup(20); collapseChatGroup(21); collapseChatGroup(22); collapseChatGroup(23);>'+

//SFONDO BARRA

'<div style="display: none; position: absolute; padding: 2px; top: 53px; left: 5px; width: 220px; height: auto; z-index: 1; background: url(http://remivorud.com/imgPack/transparatnce.png); text-size: 11px; color: black; text-align: center; font-size: 12px;" id="interfaceDivAddOn">'+
 
'<div  style="width: 270; background: url(/img/hihaholz.gif);"><b>Traviani Bar by Turk</b></div>'+
'<a href="javascript:void(movementInterval=1)" target="_self"><img src="img/ani/germane_dogmask_right.gif" style=" position: absolute; top:  0px; left: 25px; " width="20" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Super Velocità. F5 per velocità normale\');"</a>'+

/**CHIUDE TT LE SEZIONI**/
'<img id="chatGroupButton10" src="/img/close.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(11); collapseChatGroup(12); collapseChatGroup(13); collapseChatGroup(14);    collapseChatGroup(15); collapseChatGroup(16); collapseChatGroup(17); collapseChatGroup(18); collapseChatGroup(19); collapseChatGroup(20); collapseChatGroup(21); collapseChatGroup(22); collapseChatGroup(210);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Inverte le Sezioni Aperte/Chiuse\');"/>'+

/**MOVIMENTO**/

'<div onclick="collapseChatGroup(11);"  style="width: auto; background: url(/img/hihaholz.gif);"><b>Movimento</b></div>'+

'<img id="chatGroupButton11" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(11);"/>'+
'<div id="chatGroupDiv11" style="display: block; text-align: centre; cursor: pointer;">'+

//CASA
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;"><img src="/img/achievements/Icon_hausundhof2b.gif" style="cursor: pointer;" width="25"  height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Propria Casa\');"</a>'+
//I TEMPLARI
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -3, 0, -3460, 0); return false;"><img src="/img/tavern/food0.gif" style="cursor: pointer;" width="25"  height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'I Templari\');"</a>'+
//TAVERNA SENKEL
'<a onclick="xajax_click(7022, 4905, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/achievements/Icon_games2b.gif" style="cursor: pointer;" width="25"  height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna di Senkel\');"</a>'+
//ARENA
'<a onclick="xajax_click(7590, 5223, 7542, 5322, \'fight<<\', BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr); return false;"><img src="/img/achievements/Icon_kampf2b.gif" style="cursor: pointer;" width="25"  height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Arena\');"</a>'+
//MERCATO
'<a onclick="xajax_click(6900, 5211, 6900, 5211, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/icons/chaticon_ress1.gif" style="position: relative; top: -2px;cursor: pointer;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Vai al Mercato\');" </a>'+
'<br>'+
//CARTELLO GILDA
'<a onclick="xajax_click(6120, 5120, 6120, 5120, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/ani/gallier_flower_a.gif" style=" position: relative; cursor: pointer; left: -0px" width="31"  height="41" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Raccolta Erbe\');" </a>'+
//CERCARE FUNGHI
'<a onclick="xajax_click(7507, 4600, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="/img/ani/germane_mushroom_a.gif" style=" position: relative; cursor: pointer; top: -2px; left: -5px" width="31"  height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Cercare Funghi\');"</a>'+
//MATRICIA
'<a onclick="xajax_click(8196, 4751, 7876, 4781, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/matricia/Matricia_l_stand.gif" style=" position: relative; cursor: pointer; top: -8px; left: -10px;" width="30"  height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Matricia\');"</a>'+
//KARAMIX
'<a onclick="xajax_click(7615, 5705, 7200, 6720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/karamix/Karamix_r_stand2.gif" style=" position: relative; cursor: pointer; top: -7px; left: -18px;" width="35"  height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Karamix\');" </a>'+
//PILU
'<a onclick="xajax_click(4687, 6947, 4687, 6047, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/pilou/Pilou_l_stand.gif" style=" position: relative; cursor: pointer; top: -6px; left: -18px;" width="24"  height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'PILU\');"</a>'+
//JOLAISUS
'<a onclick="xajax_click(7950, 6980, 7950, 6980, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Jolaisus/Jolaisus_r_stand.gif" style=" position: relative; cursor: pointer; top: -7px; left: -18px;" width="21"  height="31.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Jolaisus\');"</a>'+
//BRUGHIERA-ROSA
'<a onclick="xajax_click(6312, 5592, 6312, 5592, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Heiderose/Heiderose_r_stand.gif" style=" position: relative; cursor: pointer; top: -6px; left: -18px;" width="24"  height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Brughiera-Rosa\');"</a>'+
//LORENA
'<a onclick="xajax_click(9260, 6471, 9260, 6471, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Lorena/Lorena_r_stand.gif" style=" position: relative; cursor: pointer; top: -6px; left: -20px;" width="24"  height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lorena\');"</a>'+
//ISOLDE
'<a onclick="xajax_click(8176, 5733, 8176, 5733,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Isolde/Isolde_l_stand.gif" style=" position: relative; cursor: pointer; left: -4px; "width="24"  height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Isolde\');"</a>'+
//PALUDE (TESORI)
'<a onclick="xajax_click(8575, 5506, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/ani/germane_rubble.gif" style="position: relative; cursor: pointer; top: -0px; left: -5px" width="28"  height="36"  onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Ricerca Tesori\');"</a>'+
//BANCA
'<a onclick="xajax_click(4328, 7003, 4349, 7038, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/sell.gif" style="position: relative; cursor: pointer; top: 0px;" width="30"  height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Banca\');"</a>'+
//PROPRIA GILDA
'<a onclick="xajax_click(5631, 5444, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/misc/11,10_palace.gif" style=" position: relative; cursor: pointer; left: 0px; " width="35"  height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Propria Gilda\');"</a>'+
//ZONA PROIBITA curX[0]=5169; curY[0]=5601;
'<a onclick="xajax_click(5169, 5601, 5169, 5601, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="http://img402.imageshack.us/img402/1784/tempiozonaproib.gif" style=" position: relative; cursor: pointer; left: 0px; " width="35"  height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Zona Proibita\');"</a>'+
'<hr>'+
//TAVERNA di STAN
'<a onclick="xajax_click(5058, 6550, 7200, 6720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Stan_l_stand.gif" style=" position: relative; cursor: pointer; top: -3px;" width="26"  height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna di Stan: MARTEDI caffè,il GIOVEDI oggetti\');"'+
//TAVERNA SENKEL
'<a onclick="xajax_click(7022, 4905, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/senkel/Senkel_l_clean_b.gif" style=" position: relative; cursor: pointer; top: -1px;" width="26"  height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna di Senkel\');"'+
//TAVERNA ALLA FRONTIERA TEUTONICA
'<a onclick="xajax_click(8724, 5195, 8724, 5195, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Innkeeper/Innkeeper3_l_clean_c.gif" style=" position: relative; cursor: pointer; top: -1px;" width="26"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna alla frontiera teutonica\');"'+
//TAVERNA VICINO A KARAMIX
'<a onclick="xajax_click(7615, 5705, 7200, 6720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Innkeeper/Innkeeper2_l_clean_b.gif" style=" position: relative; cursor: pointer; top: -1px;" width="26"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna Vicino a karamix\');"'+
//TAVERNA ALLA FRONTIERA GALLICA
'<a onclick="xajax_click(6165, 6018, 6165, 6018, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Innkeeper/Innkeeper4_r_stand.gif" style=" position: relative; cursor: pointer;top: -1px;" width="26"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna Vicino alla zona gallica\');"'+
//TAVERNA VICINO ALLE ROVINE DI TORRE
'<a onclick="xajax_click(6893, 7105, 6893, 7105, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Innkeeper/Innkeeper1_r_stand.gif" style=" position: relative; cursor: pointer;top: -1px;" width="26"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna Vicino alle rovine di torre\');"'+
//TAVERNA ROMANA
'<a onclick="xajax_click(9978, 7262, 9978, 7262, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Innkeeper/Hula_l_stand.gif" style=" position: relative; cursor: pointer; top: -1px;" width="22"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna Romana\');"'+
'<hr>'+

//MINERALE
'<a onclick="xajax_click(6906, 7252, 6906, 7252, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/miner_r_working.gif" width="42"  height="32" style=" position: relative; left: -8px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Estrai Minerale dal 2° punto\');"></a>  '+
//CARBONE
'<a onclick="xajax_click(9343, 6162, 9343, 6162, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/charburner_l_working.gif" width="57"  height="31" style=" position: relative; left: -5px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Estrai Carbone dal 2° punto\');"></a>  '+
//LEGNA
'<a onclick="xajax_click(8566, 6478, 8566, 6478, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/ani/germane_wood_c.gif" width="67"  height="55"onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taglia legna al 2° punto\');"></a>  '+

'<hr>'+
//ZONA TEUTONICA (CONFINE)
'<a onclick="xajax_click(9421, 4417, 9329, 4707,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="http://img15.imageshack.us/img15/3217/germanestandk.gif" style="position: relative; left: -1px" width="33"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine zona teutonica\');"'+
//MARE ROMANO (CONFINE)
'<a onclick="xajax_click(10413, 6880, 10315, 6985,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="http://img15.imageshack.us/img15/4227/roemerstand.gif" style="position: relative; left: -1px" width="33"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine mare romano\');"'+
//ZONA GALLICA (CONFINE)
'<a onclick="xajax_click(5560, 6124, 5560, 6124,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="http://img15.imageshack.us/img15/9766/gallierstand.gif" style="position: relative; left: -1px" width="33"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine zona gallica \');"'+
//EULALIE
'<a onclick="xajax_click(10413, 6880, 10315, 6985, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/Eulalie/Eulalie_l_stand.gif" style="position: relative; cursor: pointer; top: -2px;" width="30"  height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Eulalie\');"</a>'+
//Enigma
'<a onclick="xajax_click(8880, 7550, 8890, 7560, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/riddles/Enigma_r_stand.gif" width="26" height="37" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Enigma\');"></a>'+
//GAIA
'<a onclick="xajax_click(8340, 7500, 8350, 7510, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Vendor_r_stand.gif" width="26" height="37" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Gaia \');"></a> '+
//TROJA
'<a onclick="xajax_click(5070, 6950, 5080, 6960, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/riddles/Troja_r_stand.gif"   width="35" height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Troja\');"></a>'+
//Shaurik
'<a onclick="xajax_click(5070, 6950, 5080, 6960, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Shaurik/shaurik_l_stand.gif" title="Troja"  width="35" height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Shaurik\');"></a>'+

//LABIRINTO
'<a onclick="xajax_click(5700, 4500, 5710, 4510, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/buildings/9,10_house.gif" title="Labyrinth"  width="31.5" height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Labiritno\');"></a><br/>'+

'<hr>'+
//PESCARE
'<a onclick="xajax_click(8614, 5320, 8614, 5320, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/ani/germane_fishing1_b.gif" style=" position: relative; cursor: pointer; top: 2px; left: -10px" width="35"  height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pescare\');"</a>'+
//AURORA
'<a onclick="xajax_click(7200, 6720, 7200, 6720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="/img/bg/objects/people/sieglinde/Sieglinde_l_stand.gif" style="position: relative; cursor: pointer; left: -6px" width="24"  height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Aurora\');"</a>'+
//SHAURIK curX[0]=10810; curY[0]=4958;
'<a onclick="xajax_click(10810, 4958, 10810, 4958, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Shaurik/Shaurik_l_stand.gif" style="position: relative; cursor: pointer; left: -6px" width="26"  height="37" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Shaurik\');"</a>'+
//LUMPIK curX[0]=9418; curY[0]=4427; 
'<a onclick="xajax_click(9418, 4427, 9418, 4427, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Lumpik/Lumpik_l_stand.gif" style="position: relative; cursor: pointer; left: -6px" width="30"  height="37" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lumpik\');"</a>'+

'</div>'+

/**NPG**/

'<div onclick="collapseChatGroup(12);"  style="font-size: 12px; cursor: pointer; auto; background: url(/img/hihaholz.gif); "><b>NPG</b></a><br/></div>'+
'<img id="chatGroupButton12" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(12);"/>'+
'<div id="chatGroupDiv12" style="display: block;">'+

//COMBATTI CON IL PROSSIMO NPC IN ARENA
'<a onclick="xajax_click(7606, 5332, 7610, 5334, \'fight<go<-39#-39#-39#-39\', 0, 0, 0, 0, -1, 0, 0); return false; "><img src="http://img704.imageshack.us/img704/2917/combattentig.gif" style=" position: relative; left: -10px; top: -0" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Combatti con il prossimo NPC\');"</a>'+
'<br>'+
'<a onclick="xajax_click(6103, 5355, 6103, 5355, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter4/Fighter4_stand_l.gif" width="26"  height="37" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Cartello Gilde\');"</a>'+
'<a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter3/Fighter3_stand_l.gif" style=" position: relative; top: -1px;" width="23"  height="37" onmouseover="showToolTipText(\'Cartello Case\');"</a>'+
'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter2/Fighter2_stand_r.gif" style=" position: relative; top: 1px; left: -3px" width="33"  height="41" onmouseover="showToolTipText(\'Vicino a Matrica\');"</a>'+
'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter1/Fighter1_stand_l.gif" style=" position: relative; top: -1px; left: -6px" width="23"  height="35" onmouseover="showToolTipText(\'Al ponte per la Teutonia\');"</a>'+
'<a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter11/Fighter11_stand_l.gif" style=" position: relative; top: 1px; left: -13px" width="37"  height="37" onmouseover="showToolTipText(\'Alla Palude\');" </a>'+
'<br/>'+
'<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter5/Fighter5_stand_l.gif" style=" position: relative; left: 5px;" width="37"  height="37" onmouseover="showToolTipText(\'A dx di Karamix\');" </a>'+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter9/Fighter9_stand_l.gif" style=" position: relative; top: -2px; left: 0px;"; width="23"  height="37" onmouseover="showToolTipText(\'Al 2° punto di estrazione del Ferro\');"</a>'+
'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter8/Fighter8_stand_l.gif" style=" position: relative; left: -5px; top: -3"; width="37"  height="37" onmouseover="showToolTipText(\'Vicino ad Aurora\');"</a> '+
'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter10/Fighter10_stand_l.gif" style=" position: relative; top: -2px; left: -15px;" width="27"  height="37" onmouseover="showToolTipText(\'Vicino al Tempio\');" '+
'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter7/Fighter7_stand_l.gif" style=" position: relative; left: -22px; top: -3" width="37"  height="37" onmouseover="showToolTipText(\'Al 2° punto di estrazione dei Mattoni\');"</a>'+

'</form>'+
'</div>'+

/**FINESTRE UTILI**/
'<div onclick="collapseChatGroup(15)";  style="cursor: pointer; background: url(/img/hihaholz.gif);"><b>Finestre Utili</b></div>'+
'<img id="chatGroupButton15" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(15);"/>'+
'<div id="chatGroupDiv15" style="display: block;">'+

	//BLOG
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-80\',\'\'); return false;"><img src="/img/icons/Icon_mail.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Blog Utili\');"'+
	//LISTA AMICI
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;"><img src="/img/icons/Icon_friendtree.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lista degli Amici\');"</a>'+
	//PAGA TASSE
'<a onclick="xajax_scriptCall(\'showDialog\',55,\'1#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="../img/icons/Icon_trade.gif"; onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pagare le Tasse\')";</a>"'+
	//SOMMARIO GIOCHI
'<a onclick="xajax_showModule(\'miniGame\',\'list\',\'-5\')" return false;"><img src="/img/icons/Icon_minigame.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Sommario giochi\');"</a>'+
	//SITTER
'<a onclick="xajax_showModule(\'settings\',\'account\',\'\'); return false;" <img src="/img/icons/Icon_settings.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Immettere il Sitter\');"'+
	//ATTREZZI
'<a onclick="xajax_showModule(\'tooltrader\',\'\',3); return false;" <img src="/img/icons/Icon_tools.gif" width="20" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Comprare Attrezzi\');"</a>'+
	//SELEZIONA TT I MESSAGGI
'<input id="s10" type="checkbox" onclick="selectAll(\'mailform\');" name="s10" style="cursor: pointer; position: relative; top: -4px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Seleziona tutti i mess per cancellarli\');"'+
	//CUCIANRE FUNGHI
'<a onclick="xajax_scriptCall(\'showDialog\',178,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href=""<img src="img/items/inventory_mushroom2.gif" width="20"  height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Cucinare Funghi\');"'+
	//POZIONI
'<a onclick="xajax_scriptCall(\'showDialog\',108,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href=""<img src="/img/items/inventory_herbs2.gif" width="20"  height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Fare Pozioni\');"'+
	//CUCINARE PESCI
'<a onclick="xajax_scriptCall(\'showDialog\',226,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" <img src="img/items/inventory_fish.gif" width="20"  height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Cucinare i Pesci\');"</a>'+

'</div>'+

/**GILDA**/

'<div onclick="collapseChatGroup(16)";  style="cursor: pointer; background: url(/img/hihaholz.gif);"><b>°º¤ SURV ¤º°</b></div>'+
'<img id="chatGroupButton16" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(16);"/>'+
'<div id="chatGroupDiv16" style="display: block;">'+

	//FORUM GILDA
'<a onclick="xajax_showForum(\'\',44,-1,-1,0); return false;" <img src="/img/forum/pin.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Forum della Gilda\');"</a>'+
	//MEMBRI GILDA
'<a onclick="xajax_showModule(\'guild\',\'memberlist\',44); return false;" <img src="/img/icons/Icon_profile.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lista membri Gilda\');"</a>'+
	//MESTIERI MEMBRI
'<a onclick="xajax_showModule(\'guild\',\'attributes\',0); return false;" <img src="/img/icons/Icon_tools.gif" width="18" height="18" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Mestieri Membri Gilda\');"</a>'+
	//TORNEI
'<a onclick="xajax_showModule(\'tournament\',\'\',0); return false;" <img src="/img/icons/tournament.gif" width="20" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Tornei\');"</a>'+
	//CHAT GILDA
'<a class="link" onclick="xajax_joinClubChat(3460,\'public\'); return false;"<img src="/img/new.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Chat de I TEMPLARI\');"><img src="/img/icons/Icon_guild.gif" width="15" height="15" style="position: relative; left: -10px; top: 0px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Chat de I TEMPLARI\');"</a>'+

'<br>'+

'<a onclick="xajax_showModule(\'guild\',\'transfer\',0); return false;" <img src="/img/icons/Icon_guild.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Donare alla Gilda\');"'+
'<a style="font-size: 12px; border: 3px solid Blak; color: black; text-align: center;">'+
'<b> DONAZIONI: <img src="/img/res/social.gif"> 2100 <img src="/img/res/social.gif"></b></a>'+

'<div style="overflow: auto; height: 70px; width: 100%;">'+

'<form style="font-size: 12px; border: 3px solid lime; color: black;">'+
'<b>LIVELLO  <10<br>'+
'100 della propria risorsa'+
'<br>'+
'5 <img src="img/res/bread.gif"> <img src="img/res/iron.gif">'+
'<br>'+
'<br>'+
'</form>'+
 
'<form style="font-size: 12px; border: 3px solid aqua; color: black;">'+
'LIVELLO  11 - 22<br>'+
'100 <img src="img/res/wood.gif"> <img src="img/res/clay.gif"> <img src="img/res/corn.gif"> <img src="img/res/ore.gif"><br>'+
'200 <img src="img/res/flour.gif"> <img src="img/res/board.gif"> <img src="img/res/brick.gif"> <img src="img/res/coal.gif"><br>'+
' 25 <img src="img/res/bread.gif"> <img src="img/res/iron.gif">'+
'</form>'+

'<form style="font-size: 12px; border: 3px solid purple; color: black;">'+
'LIVELLO  23 - 35'+
'<br>'+
'150 <img src="img/res/wood.gif"> <img src="img/res/clay.gif"> <img src="img/res/corn.gif"> <img src="img/res/ore.gif"><br>'+
'300 <img src="img/res/flour.gif"> <img src="img/res/board.gif"> <img src="img/res/brick.gif"> <img src="img/res/coal.gif"><br>'+
' 50 <img src="img/res/bread.gif"> <img src="img/res/iron.gif">'+
'</form>'+
 
'<form style="font-size: 12px; border: 3px solid red; color: black;">'+
'LIVELLO  >35'+
'<br>'+
'200 <img src="img/res/wood.gif"> <img src="img/res/clay.gif"> <img src="img/res/corn.gif"> <img src="img/res/ore.gif"><br>'+
'400 <img src="img/res/flour.gif"> <img src="img/res/board.gif"> <img src="img/res/brick.gif"> <img src="img/res/coal.gif"><br>'+
' 75 <img src="img/res/bread.gif"> <img src="img/res/iron.gif">'+
'</form>'+
'</div>'+
'</div>'+

/**OFFERTE AL MERCATO**/
'<div onclick="collapseChatGroup(17);"  style="cursor: pointer; background: url(/img/hihaholz.gif);"><b>Mercato</b></div>'+
'<img id="chatGroupButton17" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(17);"/>'+
'<div id="chatGroupDiv17" style="display: block;">'+

'<form id="offerform" name="offerform" style="text-align: left; color: black; " onsubmit="javascript:xajax_formSubmit(\'trade\',xajax.getFormValues(\'offerform\'));" action="javascript:void(null);" method="post" style="color: black; font-size: 12px; border: 1px solid red;">'+
'<input type="hidden" value="offer" name="action"/>'+
	//RICEVITORE
'<b>Ricevitore :</b>'+
'<input  type="text" size="15" value="" style="position: relative; left: 4px;"  name="dest"  autocomplete="off" onkeyup="autocomp.key(this, arguments[0]);" autocomplete="off"/>'+
'<br>'+
	//MERCE
'<b>Merce :</b>'+
'<select name="restype" style="font-size: 12px; position: relative; left: 31px;"><option value="1">Legna</option><option value="2">Argilla</option><option value="3">Minerali</option><option value="4">Grano</option><option value="5">Farina</option><option value="6">Carbone</option><option value="7">Assi</option><option value="8">Mattoni</option><option value="9">Ferro</option><option value="10">Pane</option></select>'+
'<br>'+
	//QUANTITA
'<b>Quantità :</b>'+
'<input id="offerAmountSelector" type="text" size="4" style="position: relative; left: 14px;" onkeyup="calculateTax(document.getElementById(\'offerAmountSelector\').value*document.getElementById(\'offerMultipleSelector\').value);" name="amount"/>'+
'<br>'+
	//(X)
'<b>(X) : </b>'+
'<input name="multiple" style="font-size: 12px; position: relative; left: 44px;" type="text" value="" size="2"/>'+
'<br>'+
	//PREZZO
'<b>Prezzo :</b>'+ 
'<input style="font-size: 12px; position: relative; left: 26px;" type="text" size="4" name="price"/>'+
'<br>'+
	//OK
'<input style="position: relative; top: 1px; left: 164px;" type="image" src="/img/ok.gif"/>'+
//INFORMAZIONI
'<img src="/img/icons/icon_tutorial.gif" width="18" height="18" style="position: relative; left: 130px; top: -61px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Per NEGOZIARE con un giocatore potete farlo ovunque voi siate, basta inserire il Nick. Per mettere merci sul mercato per tutti (senza RICEVITORE) dovete essere vicini al mercato. In (X) potete inserire la quantità che volete (^.^), nn siete più vincolati da (x1)(x25)(x100) ecc. Se avete 1230 Assi e volete metterli acquistabili 1 ad 1 basterà mettere 1 in Qantità e 1230 in X (meglio di così nn sono riuscito a fare LA SCHEDA ORIGINALE NON FUNZIONA)!!!\');"</a>'+
//OFFERTE MERCATO
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;"><img src="/img/icons/chaticon_ress2.gif" style="position: relative; left: 94px; top: -46px" width="52" border="0" height="12" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Visualizza Offerte del Mercato\');"</a>'+
//PROPRIE OFFERTE
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'20<0<0\'); return false;"><img src="/img/icons/Icon_social2.gif" style="position: relative; left: 60px; top: -25px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Proprie Offerte\');"</a>'+
//VAI AL MERCATO
'<a onclick="xajax_click(6900, 5211, 6900, 5211, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/icons/chaticon_ress1.gif" style="position: relative; left: 24px; top: -83px" width="52" border="0" height="12" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Vai al Mercato\');" </a>'+
//VISUALIZZA OFFERTE DEL LEGNO
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'1<0<0\'); return false;"><img src="img/res/wood.gif" style="position: relative; left: -50px; top: -46px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Offerte LEGNO\');"</a>'+

'</form>'+
'</div>'+

/**QUEST**/

'<div onclick="collapseChatGroup(18);" style="cursor: pointer; background: url(/img/hihaholz.gif);">Quest</font></div>'+
'<img id="chatGroupButton18" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(18);"/>'+
'<div id="chatGroupDiv18" style="display: block;">'+
//DIARIO
'<a onclick="xajax_showModule(\'questlog\',\'\',\'\'); return false;" <img src="/img/icons/Icon_questlog.gif" style="position: realative; top: 0px; left:0px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Diario delle Quest\');"</a>'+
//QUEST 1
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-59\',\'\'); return false;"><img style="position: relative; top: 0px; left: 0px; z-index: 40;" src="/img/icons/generation_1.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Quest I Generazione\');"></a>'+
//QUEST 2
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-205\',\'\'); return false;"><img style="position: relative; top: 0px; left: 0px; z-index: 40;" src="/img/icons/generation_2.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Quest II Generazione\');"></a>'+
//QUEST 3
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'721045-266\'); return false;"><img style="position: relative; top: 0px; left: px; z-index: 40;" src="/img/icons/generation_3.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Quest III Generazione\');"></a>'+

'</div>'+

/**FUNGHI**/

'<div onclick="collapseChatGroup(19);" style="cursor: pointer; background: url(/img/hihaholz.gif);">Funghi</div>'+
'<img id="chatGroupButton19" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px; text-align: left; color: black;" onclick="collapseChatGroup(19);"/>'+
'<div id="chatGroupDiv19" style="display: block;">'+
'<a style="text-color: black;"'+
//RAGU
'<img src="img/items/inventory_mushroom2.gif" width="20"  height="20"><sup><b>+</b></sup><img src="img/items/inventory_mushroom2.gif" width="20"  height="20"><sup><b>+</b></sup><img src="img/items/inventory_mushroom2.gif" width="20"  height="20"><sup><b>=</b></sup><img src="img/items/inventory_mushroomragout1.gif" width="20"  height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Ragù di Funghi\');"><img src="http://img211.imageshack.us/img211/9313/barraragu.gif" style=" position: relative; top: -5px;"/>'+
'<br>'+
//OMELETTE
'<img src="img/items/inventory_mushroom3.gif" width="20"  height="20"><sup><b>+</b></sup><img src="img/items/inventory_mushroom2.gif" width="20"  height="20"><sup><b>+</b></sup><img src="img/items/inventory_mushroom2.gif" width="20"  height="20"><sup><b>=</b></sup><img src="img/items/inventory_mushroomomelette1.gif" width="20"  height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Omlette di Funghi\');"><img src="http://img208.imageshack.us/img208/6503/barraomelette.gif" style=" position: relative; top: -5px;"/>'+
'<br>'+
//STUFATO
'<img src="img/items/inventory_mushroom3.gif" width="20"  height="20"><sup><b>+</b></sup><img src="img/items/inventory_mushroom3.gif" width="20"  height="20"><sup><b>+</b></sup><img src="img/items/inventory_mushroom2.gif" width="20"  height="20"><sup><b>=</b></sup><img src="img/items/inventory_mushroomstew1.gif"width="20"  height="20"onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Stufato di Funghi\');"><img src="http://img269.imageshack.us/img269/920/barrastufato.gif" style=" position: relative; top: -5px;"/>'+
'<br>'+
//FUNGHI AL FORNO
'<img src="img/items/inventory_mushroom3.gif" width="20"  height="20"><sup><b>+</b></sup><img src="img/items/inventory_mushroom3.gif" width="20"  height="20"><sup><b>+</b></sup><img src="img/items/inventory_mushroom3.gif" width="20"  height="20"><sup><b>=</b></sup><img src="img/items/inventory_mushroomcasserole1.gif" width="20"  height="20"onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Funghi al Forno\');"><img src="http://img93.imageshack.us/img93/598/barraforno.gif" style=" position: relative; top: -5px;"></a>'+

'</div>'+

/**POZIONI <img src="http://i33.tinypic.com/ohn0wp.jpg"/>**/

'<div onclick="collapseChatGroup(20);" style="cursor: pointer; background: url(/img/hihaholz.gif);"><b>Pozioni</b></a><br/></div>'+
'<img id="chatGroupButton20" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px; text-align: left;" onclick="collapseChatGroup(20);"/>'+

'<div id="chatGroupDiv20" style="display: block;">'+
'<a style="text-color: black;"'+
'<img src="/img/items/inventory_herbs1.gif" width="20"  height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs1.gif" width="20"  height="20"><sup><b>=</b></sup><img src="img/weapons/potionA2.gif" width="20"  height="20"><sup><b>-->Punti Vita</b></sup><br/>'+
'<img src="/img/items/inventory_herbs1.gif" width="20"  height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs2.gif" width="20"  height="20"><sup><b>=</b></sup><img src="img/weapons/potionB2.gif" width="20"  height="20"><sup><b>-->Forza</b></sup><br/>'+
'<img src="/img/items/inventory_herbs2.gif" width="20"  height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs1.gif" width="20"  height="20"><sup><b>=</b></sup><img src="img/weapons/potionC2.gif" width="20"  height="20"><sup><b>-->Agilità</b></sup><br/>'+
'<img src="/img/items/inventory_herbs2.gif" width="20"  height="20"><sup><b>+</b></sup><img src="/img/items/inventory_herbs2.gif" width="20"  height="20"><sup><b>=</b></sup><img src="img/weapons/potionD2.gif" width="20"  height="20"><sup><b>-->Difesa</b></sup>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'726996-199\',\'\'); return false;"><img src="img/weapons/potionB2.gif" style=" position: relative; left: -130px; top: -91px" width="18"   height="18" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pozioni\');"</a>'+
'</form>'+
'</div>'+

/**LINK**/
'<div onclick="collapseChatGroup(21);"  style="cursor: pointer; background: url(/img/hihaholz.gif);">Link</div>'+
'<img id="chatGroupButton21" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(21);"/>'+
'<div id="chatGroupDiv21" style="display: block;">'+

'<b><a href="http://translate.google.it/translate?js=y&prev=_t&hl=it&ie=UTF-8&layout=1&eotf=1&u=http%3A%2F%2Fwww.travianerwiki.de%2Fwiki%2FHauptseite&sl=de&tl=it" target="_blank">TravianerWiki</a><br/> '+
'<a href="http://www.traviantrucchi.org/it/viewforum.php?f=55&sid=01abcde0cab685cf30a4f085cf090bcf" target="_blank">Travian Trucchi</a><br/> '+
'<a href="http://userscripts.org/scripts/show/64019" target="_blank">Aggiornamenti alla BARRA</a>'+

'</div>'+

//ATTRIBUTI
'<div onclick="collapseChatGroup(210);"  style="cursor: pointer; background: url(/img/hihaholz.gif);">CLUB ORO</div>'+
'<img id="chatGroupButton210" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(210);"/>'+
'<div id="chatGroupDiv210" style="display: block;">'+
'<b>'+

//ARCHIVIO
'<a onclick="xajax_showModule(\'mail\',\'archive\',0); return false;" href="" class="menuItem">Archivio</a>'+

//APPUNTI
'<a class="menuItem" href="" onclick="xajax_showModule(\'mail\',\'notes\',0); return false;">Appunti</a>'+
'<hr>'+

/*/CAVERNA RAPIDA
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'4#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Casa Propria</a><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'5#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Campo Gilda</a><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Arena</a><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'12#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Frontiera Germanica</a><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'13#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Frontiera Gallica</a><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'14#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Frontiera Romana</a><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'15#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Covo dei Briganti</a><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'16#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Campo Gallico</a><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'17#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Zona Proibita</a><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',37,\'18#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;" href="">Campo Germanico</a><br>'+
*/


'</div>'+

'<div  onclick="xajax_showModule(\'profile\',\'player\',\'734255\',\'\'); return false;" style="cursor: pointer; color: black; width: auto; hight: auto; background: url(/img/hihaholz.gif); left: -12px;"><a class=info1 href="http://imgcash2.imageshack.us/img96/5561/avatarxh.jpg"<i><b>Creata da TURK</i></b><span></span></a></div>'+

'</form>'+
'</div>'+

/** BARRA FISSA in BASSO **/
'<div  style="position: relative; top: -44px; left: 380px; width: 200px; hight: 18px; border: 0.5px solid green; background: url(http://remivorud.com/imgPack/transparatnce.png); z-index: 96; text-align: center;">'+
'<div>'+

//NEGOZIARE
'<a onclick="xajax_showModule(\'trade\',\'offers\',\'THEGAll\'); return false;" <img src="/img/icons/Icon_trade.gif" style="cursor: pointer; position: relative; top: top: 0px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Negoziare\');"</a>'+
//LISTA AMICI
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;"><img src="/img/icons/Icon_friendtree.gif" style="cursor: pointer; position: relative; top: 0px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lista degli Amici\');"</a>'+
//MINIGIOCHI
'<a onclick="xajax_showModule(\'miniGame\',\'list\',\'-5\')"; return false;"><img src="/img/icons/Icon_minigame.gif" style="cursor: pointer; position: relative; top: 0px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Sommario giochi\');"</a>'+
//SELEZIONA MESS
'<input id="s10" type="checkbox" onclick="selectAll(\'mailform\');" name="s10" style="cursor: pointer; position: relative; top: -4px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Seleziona tutti i mess per cancellarli\');"</a>'+
//TERME Cheyenne
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 3, 722575, 0); return false;" ondblclick="userMenu(\'Cheyenne\',\'722575\'); return false;"><img src="img/icons/Icon_social.gif" style="cursor: pointer; position: relative; top: 0px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Clik normale: Vai da CHEYENNE, DoppioClick: Vai da CHEYENNE e apre menu Profilo per chiedere amicizia\');return false;"></a>'+
//TERME BIRDLVR
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 3, 722944, 0); return false;" ondblclick="userMenu(\'birdlvr\',722944); return false;"><img src="img/icons/Icon_social.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Clik normale: Vai da BIRDLVR, DoppioClick: Vai da BIRDLVR e apre menu Profilo per chiedere amicizia\');return false;"></a>'+
'<br>'+

'</div>'+
'</div>'+



'</div>';

var menu = addElem('div', menuinner);
var elem = $('gameDiv');


if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}

//img/bg/house/furniture/82_africa/Library_400a.gif

/*//2°PUNTI DI ESTRAZIONE
'<div  style="width: 214px;">2° Punto di Estrazione</div>'+
'<br/>'+
//LEGNO
'<a onclick="xajax_click(8446, 6354, 8446, 6354, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_wood.gif" width="25"  height="25"></a>  '+
//ARGILLA
'<a onclick="xajax_click(9600, 5460, 9600, 5460, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_clay.gif" width="25"  height="25"></a>  '+
//MINERALE
'<a onclick="xajax_click(6906, 7252, 6906, 7252, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_ore.gif" width="25"  height="25"></a>  '+
//GRANO
'<a onclick="xajax_click(7348, 6394, 7348, 6394, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_corn.gif" width="25"  height="25"></a>  '+
//FARINA
'<a onclick="xajax_click(6735, 5973, 6735, 5973, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_flour.gif" width="25"  height="25"></a>  '+
'<br>'+
//CARBONE
'<a onclick="xajax_click(9380, 6126, 9380, 6126, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_coal.gif" width="25"  height="25"></a> '+
//ASSI
'<a onclick="xajax_click(6239, 6981, 6239, 6981, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_board.gif" width="25"  height="25"></a>  '+
//MATTONI
'<a onclick="xajax_click(6317, 6595, 6317, 6595, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_brick.gif" width="25"  height="25"></a>  '+
//FERRO
'<a onclick="xajax_click(7579, 6071, 7579, 6071, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_iron.gif" width="25"  height="25"></a>  '+
//PANE
'<a onclick="xajax_click(6239, 6981, 6239, 6981, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_bread.gif" width="25"  height="25"></a>  '+
*/

/*
//GILDE
'<a class="link" onclick="xajax_joinClubChat(3460,\'private\'); return false;">Chat PRIVATA Gilda</a><br/>'+	
'<a class="link" onclick="xajax_showModule(\'guild\',\'show\',3460); return false;">GILDA / CLUB</a><br/>'+
'<a class="link" onclick="xajax_showForum(\'\',3460,-1,-1,0); return false;">Forum Gilda</a><br/>'+
*/
/*
//VARI PERSONAGGI
'<a onclick="xajax_click(10413, 6880, 10315, 6985, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Eulalie</a> | '+
'<a onclick="xajax_click(6540, 5720, 6550, 5730, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/catwoman/Catwoman_r_stand.gif" title="Felida" ></a>'+
'<a onclick="xajax_click(8880, 7550, 8890, 7560, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/riddles/Enigma_r_stand.gif" title="Enigma"  width="35" height="35"></a>'+
'<a onclick="xajax_click(8340, 7500, 8350, 7510, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Vendor_r_stand.gif" title="Gaia"  width="35" height="35"></a>'+
'<a onclick="xajax_click(7170, 4800, 7180, 4810, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/magistrate/Magistrate2_r_stand.gif" title="Finanzamt"  width="35" height="35"></a><br/>'+
'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(4328, 7003, 4349, 7038, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Banker_r_stand.gif" title="Bank"  width="35" height="35"></a>'+
'<a onclick="xajax_click(5070, 6950, 5080, 6960, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/riddles/Troja_r_stand.gif" title="Troja"  width="35" height="35"></a>'+
'<a onclick="xajax_click(5700, 4500, 5710, 4510, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/buildings/9,10_house.gif" title="Labyrinth"  width="31.5" height="35"></a><br/>'+
'<a onclick="xajax_click(6874, 5668, 6016, 5163, BGlocation, BGlocationOwner, 1, 0, 0, 0); return false; ">Tonk</a><br/> | '+
'<a onclick="xajax_click(8626, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Swamp</a> | '+
//FERRO
'<a onclick="xajax_click(7579, 6071, 7579, 6071, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/blacksmith_r_working_b.gif" width="42"  height="32" style=" position: relative; left: -5px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Estrai Ferro dal 2° punto\');"></a>  '+
*/

/*
//ZONA TEUTONICA (CONFINE)
'<a onclick="xajax_click(9421, 4417, 9329, 4707,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="http://img15.imageshack.us/img15/3217/germanestandk.gif" style="position: relative; left: -1px" width="40"  height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine zona teutonica Sconsigliato \');"'+
//MARE ROMANO (CONFINE)
'<a onclick="xajax_click(10413, 6880, 10315, 6985,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="http://img15.imageshack.us/img15/4227/roemerstand.gif" style="position: relative; left: -1px" width="40"  height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine mare romano Sconsigliato \');"'+
//ZONA GALLICA (CONFINE)
'<a onclick="xajax_click(5560, 6124, 5560, 6124,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="http://img15.imageshack.us/img15/9766/gallierstand.gif" style="position: relative; left: -1px" width="40"  height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine zona gallica \');"'+
*/
