// ==UserScript==
// @name                  New Super Traviani links
// @namespace             http://
// @description           Aggiunge una barra nella parte sinistra dello schermo molto utile
// @author                XxcoralloxX
// @version               7.3.6
// @copyright             2011-2012 XxcoralloxX All Rights Reserved
// @email                 travianicorallo@gmail.com
// @include               http://www.traviani.it/game.php*
// @include               http://traviani.it/game.php*
// @include               http://www.travianer.de/game.php*
// @include               http://travianer.de/game.php*
// @include               http://travians.com/game.php*
// @include               http://www.travians.com/game.php*
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

function GetLastVersion(){
   AJAX_GET('http://userscripts.org/scripts/source/64914.user.js',function(req){
      var v=req.responseText.split('[VERSION]')[1];
      v=v.split('[/VERSION]')[0];
      if(parseInt(v)>_cur_version){
         var det=req.responseText.split('[DETAILS]')[1];
         det=det.split('[/DETAILS]')[0];
         alert("New version! "+v+" Details: "+det);
      }e
                                                         });
}


//ICONA + TITOLO
var menuinner = '<img style="position: absolute; top: -20px; left: -8px; z-index: 40;"  src="http://img41.imageshack.us/img41/757/schweinh.gif" width="45px" height="45px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Apri/chiudi\');" id="addOnMinimizer" onclick="collapseChatGroup(15); collapseChatGroup(14); collapseChatGroup(13); collapseChatGroup(12); collapseChatGroup(11); collapseChatGroup(10); collapseChatGroup(9); collapseChatGroup(8); collapseChatGroup(7); collapseChatGroup(6); "onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Inverte le Sezioni Aperte/Chiuse\');" />'+


//SFONDO BARRA
'<div style="display: none; position: absolute; padding: 0px; top: 0px; left: 5px; width: 220px; height: auto; z-index: 1; background: url(img/chatbg.jpg); text-size: 11px; color: white; text-align: center; font-size: 12px;" id="interfaceDivAddOn">'+
'<div id="TitleName" class="chatHeader" style="width: 214; background: url(/img/hihaholz.gif); border: 1px solid black;"><b>Super Traviani Links </b></div>'+
//CHIUDE TT LE SEZIONI
'<img id="chatGroupButton20" src="/img/close.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="if(document.getElementById(\'chatGroupDiv15\').style.display==\'none\'){document.getElementById(\'chatGroupDiv15\').style.display=\'block\';document.getElementById(\'chatGroupDiv14\').style.display=\'block\';document.getElementById(\'chatGroupDiv13\').style.display=\'block\';document.getElementById(\'chatGroupDiv12\').style.display=\'block\';document.getElementById(\'chatGroupDiv11\').style.display=\'block\';document.getElementById(\'chatGroupDiv10\').style.display=\'block\';document.getElementById(\'chatGroupDiv9\').style.display=\'block\';document.getElementById(\'chatGroupDiv8\').style.display=\'block\';document.getElementById(\'chatGroupDiv7\').style.display=\'block\';}else{document.getElementById(\'chatGroupDiv15\').style.display=\'none\';document.getElementById(\'chatGroupDiv14\').style.display=\'none\';document.getElementById(\'chatGroupDiv13\').style.display=\'none\';document.getElementById(\'chatGroupDiv12\').style.display=\'none\';document.getElementById(\'chatGroupDiv11\').style.display=\'none\';document.getElementById(\'chatGroupDiv10\').style.display=\'none\';document.getElementById(\'chatGroupDiv9\').style.display=\'none\';document.getElementById(\'chatGroupDiv8\').style.display=\'none\';document.getElementById(\'chatGroupDiv7\').style.display=\'none\';}"  onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Inverte le Sezioni Aperte/Chiuse\');"/>'+

//Destinazioni
'<div onclick="collapseChatGroup(15);" id="TitleName" class="chatHeader" style="cursor: pointer; auto; border: 1px solid black; background: url(/img/hihaholz.gif);"><b>Destinazioni</b></div>'+
'<img id="chatGroupButton15" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(15);"/>'+
'<div id="chatGroupDiv15" style="display: block; text-align: centre; cursor: pointer; solid aqua;">'+
'<form id="offerform" name="offerform" style="color: white; font-size: 12px; border: 2px solid red;">'+

//SUPER VELOCITA
'<a onclick="javascript:void(movementInterval=1); return false;"><img src="img/ani/germane_dogmask_right.gif" style=" width="29" border="0" height="29" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Super Velocit&agrave;.\');"</a>'+
//CASA
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;"><img src="/img/achievements/Icon_hausundhof2b.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Propria Casa\');"</a>'+
//I TEMPLARI
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -3, 0, -3460, 0); return false;"><img src="/img/tavern/food0.gif" style="cursor: pointer;" width="25"  height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'I Templari\');"</a>'+
//ARENA
'<a onclick="xajax_click(7573, 5296, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/achievements/Icon_kampf2b.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Arena\');"</a>'+
//MERCATO
'<a onclick="xajax_click(6886, 5311, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/icons/chaticon_ress1.gif" style=" width="62" border="0" height="15" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Mercato\');"</a>'+
//CERCARE ERBE
'<a onclick="xajax_click(6090, 5120, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/ani/gallier_flower_a.gif" style=" width="38" border="0" height="50" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Raccolta erbe\');"</a>'+
//CERCARE FUNGHI
'<a onclick="xajax_click(7507, 4600, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/ani/germane_mushroom_a.gif" style=" width="38" border="0" height="41" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Raccolta Funghi\');"</a>'+
//MATRICIA
'<a onclick="xajax_click(8196, 4751, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/matricia/Matricia_l_stand.gif" style=" width="30" border="0" height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Matricia\');"</a>'+
//KARAMIX
'<a onclick="xajax_click(7615, 5705, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/karamix/Karamix_r_stand2.gif" style=" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Karamix\');"</a>'+
//TOMBO AL PONTE PER LA GALLIA
'<a onclick="xajax_click(5560, 6124, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Tombo_stand.gif" style=" width="34" border="0" height="51" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Tombo\');"</a>'+
//PIUL (FUNGHI)
'<a onclick="xajax_click(4686, 6947, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/pilou/Pilou_l_stand.gif" style="width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Piul\');"</a>'+
//JOLAISUS
'<a onclick="xajax_click(7950, 6980, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Jolaisus/Jolaisus_r_stand.gif" style=" width="25" border="0" height="38" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Jolaisus\');"</a>'+
//BRUGHIERA-ROSA
'<a onclick="xajax_click(6312, 5592, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Heiderose/Heiderose_r_stand.gif" style=" width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Brughiera-Rosa\');"</a>'+
//LORENA
'<a onclick="xajax_click(9260, 6471, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Lorena/Lorena_r_stand.gif" width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lorena\');"</a>'+
//AURORA
'<a onclick="xajax_click(7200, 6720, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/sieglinde/Sieglinde_l_stand.gif" style=" width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Aurora\');"</a>'+
//PENEPALUS
'<a onclick="xajax_click(8038, 5344, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Penpalus/Penpalus_l_stand.gif" style=" width="38" border="0" height="51" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Penepalus\');"</a>'+
//UFFICIO DELLE IMPOSTE
'<a onclick="xajax_click(7178, 4790, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/magistrate/Magistrate2_l_stand.gif" style=" width="34" border="0" height="46" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Ufficio delle imposte\');"</a>'+
//FABRO DI PRECISIONE
'<a onclick="xajax_click(7575, 5376, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="http://img442.imageshack.us/img442/2632/smithrstand.gif" style=" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Fabro di precisone\');"</a>'+
//Eilix
'<a onclick="xajax_click(209, 274, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Eilix/eilix_r_look.gif" style=" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Eilix\');"</a>'+
//TIZIO BLAK JAK
'<a onclick="xajax_click(7932, 5202, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Blackjack_l_cards.gif" style=" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Blak Jak\');"</a>'+
//PALUDE (TESORI)
'<a onclick="xajax_click(8575, 5506, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_gold.gif" style=" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Palude\');"</a>'+
//BANCA
'<a onclick="xajax_click(4328, 7003, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/sell.gif" width="40" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Banca\');"</a>'+
//PROPRIA GILDA
'<a onclick="xajax_click(5631, 5444, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/misc/11,10_palace.gif" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Propia Gilda\');"</a>'+
//ZONO TEUTONICA (CONFINE)
'<a onclick="xajax_click(9421, 4417, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/ani/germane_stand.gif" style=" width="34" border="0" height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine Zona teutonica\');"</a>'+
//MARE ROMANO (CONFINE)
'<a onclick="xajax_click(10413, 6880, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/ani/roemer_stand.gif" style=" width="34" border="0" height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine mare romano\');"</a>'+
//ZONA GALLICA (CONFINE)
'<a onclick="xajax_click(5560, 6124, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/ani/gallier_stand.gif" style=" width="34" border="0" height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine zona gallica\');"</a>'+
//ZONA PROIBITA
'<a onclick="xajax_click(4391, 4774, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="http://img163.imageshack.us/img163/9472/cellarportal2a.gif" style=" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Zona proibita\');"</a>'+
//GAJA
'<a onclick="xajax_click(8185, 7430, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Vendor_r_stand.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Gaja\');"</a>'+
//ENIGMA
'<a onclick="xajax_click(8881, 7494, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/riddles/Enigma_l_stand.gif" width="30" border="0" height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Enigma\');"</a>'+
//FELIDA
'<a onclick="xajax_click(6434, 5652, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/catwoman/Catwoman_l_stand.gif" width="23" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Felida\');"</a>'+
//TROJA
'<a onclick="xajax_click(5070, 7003, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/riddles/Troja_l_stand.gif" width="25" border="0" height="32" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Troja\');"</a>'+
//EULALIE
'<a onclick="xajax_click(10413, 6880, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Eulalie/Eulalie_l_stand.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Eulalie\');"</a>'+
//LABIRINTO
'<a onclick="xajax_click(5564, 4438, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/buildings/9,10_house.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Labirinto\');"</a>'+
//Edelweiï¿½
'<a onclick="xajax_click(7561, 4955, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/edelweiss/Babydruid_r_meditation.gif" style=" width="15"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Edelweiï¿½\');"</a>'+
//Felix
'<a onclick="xajax_click(7688, 5459, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Felix_r_stand.gif" style=" width="38"  height="46" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Felix\');"</a>'+
//Tonk
'<a onclick="xajax_click(6807, 5657, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/tonk/Tonk_r_stand.gif" style=" width="38"  height="46" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Tonk\');"</a>'+

'<br>'+



'</form>'+
'</div>'+


//NPG
'<div onclick="collapseChatGroup(14);" id="TitleName" class="chatHeader" style="cursor: pointer; auto; border: 1px solid black; background: url(/img/hihaholz.gif); color: white;"><b>NPG</b></div>'+
'<img id="chatGroupButton14" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(14);"/>'+
'<div id="chatGroupDiv14" style="display: none;">'+

'<form style="color: white; font-size: 12px; border: 2px solid Black;">'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713258-60\',\'\'); return false;"><img src="/img/icons/complaint.gif"onmouseout=" hideToolTip();" onmouseover="showToolTipText(\'NPG\');"</a>'+ 
'<br/>'+
'<a onclick="xajax_click(7606, 5332, curX[0], curY[0], 0, \'fight<go<-39#-39#-39#-39\', 0, 0, 0, 0, -1, 0, 0); return false; "><img src="http://img704.imageshack.us/img704/2917/combattentig.gif" style=" position: relative; left: -10px; top: -0" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Combattere contro il prossimo NPG\');"</a>'+
'<br>'+
'<a onclick="xajax_click(6271, 5260, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter4/Fighter4_stand_l.gif" width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Cartello gilde\');"</a>'+
'<a onclick="xajax_click(7005, 4521, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter3/Fighter3_stand_l.gif" width="26" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Cartello Case\');"</a>'+
'<a onclick="xajax_click(7716, 4366, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter2/Fighter2_stand_r.gif" width="38" border="0" height="46" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Vicino a matricia\');" '+
'<a onclick="xajax_click(8648, 4975, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter1/Fighter1_stand_l.gif" width="26" border="0" height="39" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Al ponte per la teutonica\');"</a>'+
'<a onclick="xajax_click(8657, 4914, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter11/Fighter11_stand_l.gif" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Alla palude\');"</a>'+
'<a onclick="xajax_click(8033, 5563, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter5/Fighter5_stand_l.gif"  width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Vicino Karamix\');"</a>'+
'<a onclick="xajax_click(7731, 6151, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter9/Fighter9_stand_l.gif"  width="26" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Al 2° punto d estrazione del ferro\');"</a>'+
'<a onclick="xajax_click(7040, 6533, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter8/Fighter8_stand_l.gif" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Vicino ad Aurora\');"</a>'+
'<a onclick="xajax_click(6321, 7308, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter10/Fighter10_stand_l.gif" width="26" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Vicino al tempio\');"</a>'+
'<a onclick="xajax_click(6295, 6483, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter7/Fighter7_stand_l.gif" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Al 2° punto di estrazione mattoni\');"></a>'+
'</form>'+
'</div>'+


//TAVERNE
'<div onclick="collapseChatGroup(13);" id="TitleName" class="chatHeader" style="cursor: pointer; auto; border: 1px solid black; background: url(/img/hihaholz.gif);"><b>Taverne</b></div>'+
'<img id="chatGroupButton13" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(13);"/>'+
'<div id="chatGroupDiv13" style="display: none;">'+
'<form style="color: white; font-size: 12px; border: 2px solid Silver;">'+

//TAVERNA di STAN
'<a onclick="xajax_click(5058, 6550, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Stan_l_stand.gif" style=" position: relative; top: -1px;" width="26" border="0" height="39" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna di Stan\');"</a>'+
//TAVERNA SENKEL
'<a onclick="xajax_click(6966, 4899, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/senkel/Senkel_l_clean_b.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna di Senkel\');"</a>'+
//TAVERNA ALA FRONTIERA TEUTONICA
'<a onclick="xajax_click(8724, 5195, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Innkeeper3_l_clean_c.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna alla frontiera Teutonica\');"</a>'+
//TAVERNA VICINO A KARAMIX
'<a onclick="xajax_click(7615, 5705, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Innkeeper2_l_clean_b.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna vicino a Karamix\');"</a>'+
'<br/>'+
//TAVERNA ALLA FRONTIERA GALLICA
'<a onclick="xajax_click(6165, 6018, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Innkeeper4_r_stand.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna alla frontiera Gallica\');"</a>'+
//TAVERNA VICINO ALLE ROVINE DI TORRE
'<a onclick="xajax_click(6893, 7105, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Innkeeper1_r_stand.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna vicino alle rovine della torre\');"</a>'+
//TAVERNA ROMANA
'<a onclick="xajax_click(9978, 7262, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Hula_l_stand.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna Romana\');"></a>'+
'</form>'+
'</div>'+


//LINK UTII
'<div onclick="collapseChatGroup(12);" id="TitleName" class="chatHeader" style="cursor: pointer; auto; border: 1px solid black; background: url(/img/hihaholz.gif);"><b>LINK UTILI</b></div>'+
'<img id="chatGroupButton12" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(12);"/>'+
'<div id="chatGroupDiv12" style="display: none;">'+
'<form style="color: white; font-size: 12px; border: 2px solid Orange;">'+


//BLOG
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713258-8\',\'\'); return false;"><img src="/img/icons/Icon_mail.gif" width="18" border="0" height="18" width="20" border="0" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Link Utili\');"</a>'+
//DIARIO
'<a onclick="xajax_showModule(\'questlog\',\'\',\'\'); return false;" <img src="/img/icons/Icon_questlog.gif" "width="20" border="0" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Diario delle Quest\');"</a>'+
//LISTA AMICI
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;"><img src="/img/icons/Icon_friendtree.gif" width="20" border="0" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lista degli Amici\');"</a>'+
//ELENCO RISTORANTI
'<a onclick="xajax_showModule(\'misc\',\'restaurants\',\'0\'); return false;"><img src="/img/icons/Icon_Restaurant.gif" width="20" border="0" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Elenco Ristoranti\');"</a>'+
//Ruota a distanza
'<a onclick="xajax_scriptCall(\'showDialog\',\'485\',\'1#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;"><img src="/img/bg/objects/wheelOfFortune.gif" style=" position: relative; top: -3px; left: 1px" width="18" height="24" onmouseover="showToolTipText(\'Ruota a distanza\');"</a>'+
//BLOG 2
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'726996-199\',\'\'); return false;"><img src="img/weapons/potionB2.gif" width="27" border="0" height="27" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pozioni\');"</a>'+
//BLOG 3
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'718571-388\',\'\'); return false;"><img src="http://img6.imageshack.us/img6/7895/paginegialle.gif" width="34" border="0" height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Grafiche\');"</a>'+
//BLOG 4
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713258-3\',\'\'); return false;"><img src="http://img524.imageshack.us/img524/7911/rattansingolo.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Categoria Letti \');"</a>'+
'<br/>'+
//QUEST 1
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-59\',\'\'); return false;"><img src="/img/icons/generation_1.gif" width="25" border="0" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Quest I Generazione\');"</a>'+
//QUEST 2
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-205\',\'\'); return false;"><img src="/img/icons/generation_2.gif" width="25" border="0" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Quest II Generazione\');"</a>'+
//QUEST 3
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'721045-266\',\'\'); return false;"><img src="/img/icons/generation_3.gif" width="25" border="0" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Quest III Generazione\');"</a>'+
//appunti
'<a class="menuItem" href="" onclick="xajax_showModule(\'mail\',\'notes\',0); return false;">Appunti</a>'+
'<br>'+
'<a onclick="xajax_miniGameInterface(\'turnslow\',2098625, \'updateTable\');">Girare piano</a>'+
'<br>'+
'<a onclick="xajax_miniGameInterface(\'turnmedium\',2098625, \'updateTable\')">girare rapidamente</a>'+
'<br>'+
'<a onclick="xajax_miniGameInterface(\'turnfast\',2098625, \'updateTable\')">girare forte</a>'+
'<br>'+
//MAPPA COMPLETA 
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-60\',\'\'); return false;"><img src="http:/img/bg/12,12.jpg" width="35" border="0" height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Mappa Completa\');"></a>'+
'</form>'+
'</div>'+


//BINGO
'<div onclick="collapseChatGroup(11);" id="TitleName" class="chatHeader" style="cursor: pointer; auto; border: 1px solid black;  background: url(/img/hihaholz.gif);"><b>Bingo</b></div>'+
'<img id="chatGroupButton11" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(11);"/>'+
'<div id="chatGroupDiv11" style="display: none;">'+
'<form style="color: white; font-size: 12px; border: 2px solid White;">'+
//INFORMAZIONI
'<img src="/img/icons/icon_tutorial.gif" width="25" height="25" style="position: relatie; left: 180px; top: 100px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\' Eccovi il gioco del bingo cliccate su Avere una scheda del bingo per averne una verificate nell inventario ogni giorno fate una partita a sudokiss e alla scelta delle dame e controllate se viene cancellata una casella se e cosi e uno dei vostri giorni fortunati quando tutte le caselle saranno cancellate cliccate su BINGO e avrete un premio \');"</a>'+
'<br>'+
//AVERE SCHEDA BINGO
'<a onclick="xajax_scriptCall(\'showDialog\',472,\'3#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "><img src="http://img691.imageshack.us/img691/7962/inventorybingo.gif" style=" position: relative; top: -1px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Avere una scheda del bingo\');"'+
//in caso di bingo
'<a onclick="xajax_scriptCall(\'showDialog\',472,\'7#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;"><img src="http://img72.imageshack.us/img72/9580/minitrofeo.png" style=" position: relative; top: -1px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'In caso di bingo\');"'+
//SUDOKISS
'<a onclick="xajax_scriptCall(\'showDialog\',473,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;"><img src="img/bg/objects/people/riddles/Knobeline_r_stand.gif" width="29" border="0" height="42"  style=" position: relative; top: -1px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Giocare a sudokiss\');"'+ 
//LA SCELTA DELLE DAME
'<a onclick="xajax_scriptCall(\'showDialog\',475,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;"> <img src="img/bg/objects/people/riddles/Knifflik_l_stand.gif" width="34" border="0" height="46"  style=" position: relative; top: -1px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Giocare alla scelta delle dame\');"></a>'+ 
'</form>'+
'</div>'+

//OFFERTE AL MERCATO
'<div onclick="collapseChatGroup(10);" id="TitleName" class="chatHeader" style="cursor: pointer; auto; border: 1px solid black; background: url(/img/hihaholz.gif);"><b>Mercato</b></div>'+

'<img id="chatGroupButton10" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(10);"/>'+
'<div id="chatGroupDiv10" style="display: none; ">'+
'<form id="offerform" name="offerform" style="text-align: left; color: black; border: 2px solid blue; ">'+ 



//RICEVITORE
'<b>Ricevitore :</b>'+
'<input  type="text" size="15" value="" style="position: relative; left: 4px;"  name="dest"  autocomplete="off" onkeyup="autocomp.key(this, arguments[0]);" autocomplete="off"/>'+
'<br>'+

//QUANTITA
'<b>Quantità :</b>'+
'<input id="offerAmountSelector" type="text" size="4" style="position: relative; left: 14px;" onkeyup="calculateTax(document.getElementById(\'offerAmountSelector\').value*document.getElementById(\'offerMultipleSelector\').value);" name="amount"/>'+
'<br>'+

//MERCE
'<b>Merce :</b>'+
'<select name="restype" style="font-size: 12px; position: relative; left: 31px;"><option value="9">Ferro</option><option value="1">Legna</option><option value="2">Argilla</option><option value="3">Minerali</option><option value="4">Grano</option><option value="5">Farina</option><option value="6">Carbone</option><option value="7">Assi</option><option value="8">Mattoni</option><option value="10">Pane</option></select>'+
'<br>'+

//(X)
'<b>(X) : </b>'+
'<input name="multiple" style="font-size: 12px; position: relative; left: 44px;" type="text" value="" size="2"/>'+
'<br>'+

//PREZZO
'<b>Prezzo :</b>'+ 
'<input  style="font-size: 12px; position: relative; left: 26px;" type="text" size="4" name="price"/>'+
'<br>'+
// submit
//OK
'<input id="submitofferform" style="position: relative; top: 1px; left: 164px;" type="image" src="/img/ok.gif"/>'+

//INFORMAZIONI
'<img src="/img/icons/icon_tutorial.gif" width="18" height="18" style="position: relative; left: 130px; top: -61px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Per NEGOZIARE con un giocatore potete farlo ovunque voi siate, basta inserire il Nick. Per mettere merci sul mercato per tutti (senza RICEVITORE) dovete essere vicini al mercato. In (X) potete inserire la quantità che volete (^.^), nn siete più vincolati da (x1)(x25)(x100) ecc. Se avete 1230 Assi e volete metterli acquistabili 1 ad 1 basterà mettere 1 in Qantità e 1230 in X (meglio di così nn sono riuscito a fare)!!!\');"</a>'+

//OFFERTE MERCATO
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;"><img src="/img/icons/chaticon_ress2.gif" style="position: relative; left: 94px; top: -46px" width="52" border="0" height="12" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Visualizza Offerte del Mercato\');"</a>'+

//PROPRIE OFFERTE
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'20<0<0\'); return false;"><img src="/img/icons/Icon_social2.gif" style="position: relative; left: 60px; top: -25px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Proprie Offerte\');"</a>'+

//VAI AL MERCATO
'<a onclick="xajax_click(6886, 5311, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/icons/chaticon_ress1.gif" style="position: relative; left: 24px; top: -83px" width="52" border="0" height="12" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Vai al Mercato\');" </a>'+
'</a>'+
'</a>'+
'</form>'+
'</div>'+

//1° PUNTI DI ESTRAZIONE
'<div onclick="collapseChatGroup(9);" id="TitleName" class="chatHeader" style="cursor: pointer; auto; border: 1px solid black; background: url(/img/hihaholz.gif);"><b>1° punti di estrazione</b></div>'+
'<img id="chatGroupButton9" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(9);"/>'+
'<div id="chatGroupDiv9" style="display: none; border: 2px solid Green; ">'+
'<form id="offerform" name="offerform" style="text-align: left; color: black; border: 1px solid green;" onsubmit="javascript:xajax_formSubmit(\'trade\',xajax.getFormValues(\'offerform\'));" action="javascript:void(null);" method="post" style="color: black; font-size: 12px; border: 1px solid green;">'+
'<input type="hidden" value="offer" name="action"/>'+

//LEGNO
'<a onclick="xajax_click(6451, 4552, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_wood.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'legno\');"</a>'+
//ARGILLA
'<a onclick="xajax_click(6558, 4300, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_clay.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'argilla\');"</a>'+
//MINERALE
'<a onclick="xajax_click(6079, 4578, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_ore.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'minerale\');"</a>'+
//GRANO
'<a onclick="xajax_click(6294, 4472, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_corn.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'grano\');"</a>'+
//FARINA
'<a onclick="xajax_click(6918, 4755, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_flour.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'farina\');"</a>'+
'<br>'+
//CARBONE
'<a onclick="xajax_click(6690, 4924, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_coal.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'carbone\');"</a>'+
//ASSI
'<a onclick="xajax_click(7026, 4726, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_board.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'assi\');"</a>'+
//MATTONI
'<a onclick="xajax_click(6827, 4862, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_brick.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'mattoni\');"</a>'+
//FERRO
'<a onclick="xajax_click(7091, 5031, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_iron.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'ferro\');"</a>'+
//PANE
'<a onclick="xajax_click(6959, 4972, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_bread.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'pane\');"</a>'+

'</a>'+
'</a>'+
'<br>'+
'</form>'+
'</div>'+

//2° PUNTI DI ESTRAZIONE
'<div onclick="collapseChatGroup(8);" id="TitleName" class="chatHeader" style="cursor: pointer; auto; border: 1px solid black; background: url(/img/hihaholz.gif);"><b>2° punti di estrazione</b></div>'+
'<img id="chatGroupButton8" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(8);"/>'+
'<div id="chatGroupDiv8" style="display: none; text-align: left; cursor: pointer; solid aqua;">'+
'<form id="offerform" name="offerform" style="color: white; font-size: 12px; border: 2px solid red;">'+

//LEGNO
'<a onclick="xajax_click(8446, 6354, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_wood.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'legno\');"</a>'+
//ARGILLA
'<a onclick="xajax_click(9600, 5460, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_clay.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'argilla\');"</a>'+
//MINERALE
'<a onclick="xajax_click(6906, 7252, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_ore.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'minerale\');"</a>'+
//GRANO
'<a onclick="xajax_click(7348, 6394, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_corn.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'grano\');"</a>'+
//FARINA
'<a onclick="xajax_click(6735, 5973, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_flour.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'farina\');"</a>'+
'<br>'+
//CARBONE
'<a onclick="xajax_click(9380, 6126, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_coal.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'carbone\');"</a>'+
//ASSI
'<a onclick="xajax_click(6239, 6981, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_board.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'assi\');"</a>'+
//MATTONI
'<a onclick="xajax_click(6317, 6595, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_brick.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'mattoni\');"</a>'+
//FERRO
'<a onclick="xajax_click(7579, 6071, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_iron.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'ferro\');"</a>'+
//PANE
'<a onclick="xajax_click(6239, 6981, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_bread.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'pane\');"</a>'+
'</a>'+

'</form>'+
'</div>'+
//Messaggi
'<div onclick="collapseChatGroup(6);" id="TitleName" class="chatHeader" style="cursor: pointer; auto; border: 1px solid black; background: url(/img/hihaholz.gif);"><b>Mesaggi</b></div>'+
'<img id="chatGroupButton6" src="/img/up.gif" style="float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(6);"/>'+
'<div id="chatGroupDiv6" style="display: none; text-align: left; cursor: pointer; solid aqua;">'+


'<td class="folders">'+
'<select id="deleteFolderSelector" class="dropdown">'+
'<option selected="selected" value="">Selezionare</option>'+
'<option value="inbox">Messaggi in arrivo</option>'+
'<option value="outbox">Messaggi inviati</option>'+
'<option value="reports">Rapporti</option>'+
'</select>'+
'<input type="image" src="/img/lang/it/ok.gif" onclick="var val = document.getElementById(\'deleteFolderSelector\').value; if (val) xajax_scriptCall(\'deleteFolder\',val,\'\',\'\')">'+
'</td>'+
'</form>'+
'</div>'+


'<hr>'+
'<form style="color: white; font-size: 12px; border: 2px solid blue;">'+
'BY <a onclick="xajax_showModule(\'profile\',\'player\',\'727824\',\'\'); return false;"><i>XxcoralloxX</i></a>'+
'</form>'+

'<img src="img/bg/objects/misc/quest.gif"  width="18" border="0" height="34" style="position: absolute; left: 250px; top: 730px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\' ATTENZIONE <br/>  Nelle seconde aree di produzione la produzzione di risorse è del 10% maggiore \');"></a>'+
'<a href="http://userscripts.org/scripts/source/64914.user.js" target="_blank"><img style="position: absolute; top: 725px; left: 820px; z-index: 40;" src="img/icons/levelup.gif" width="45" border="0" height="45" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Aggiornamento script\');"></a>'+
'<img src="img/bg/objects/misc/quest.gif" width="18" height="34" style="position: absolute; left: 800px; top: 125px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\' Per informazioni contattare <br/>  travianicorallo@gmail.com \');"</a>'+


//BARRA PICCOLA
'<div id="TitleName" class="chatHeader" style="position: absolute; top: 725px; left: 405px; width: 280px; height: 20px; border: 2px solid green; background: url(http://www.pumaautomotive.com/uploads/tbl_prd/200812230538_blu_scuro.jpg); text-size: 11px; color: rgb(114, 57, 0); text-align: right;" id="interfaceDivAddOn">'+
'<img id="chatGroupButton7" src="/img/up.gif" style="float: right; position: relative; top: 5px; left: 20px;"onclick="collapseChatGroup(7);"/>'+ 
'<div id="chatGroupDiv7" style="display: none;">'+
//POZIONI A DISTANZA
'<a onclick="xajax_scriptCall(\'showDialog\',108,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;"><img src="/img/weapons/potionB2.gif" style=" position: absolute; top: -3px; left: 1px" width="24" height="24" onmouseover="showToolTipText(\'Pozioni a distanza\');"</a>'+
//PAGARE IMPOSTE A DISTANZA
'<a onclick="xajax_scriptCall(\'showDialog\',55,\'1#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "><img src="../img/icons/Icon_trade.gif"  style=" position: absolute; top: 1px; left: 26px"onmouseover="showToolTipText(\'Pagare le Tasse\');"</a>'+
//CUCINARE PESCI A DISTANZA
'<a onclick="xajax_scriptCall(\'showDialog\',226,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "><img src="/img/items/inventory_cookedfish.gif" style=" position: absolute; top: -3px; left: 45px" width="26"  height="26" onmouseover="showToolTipText(\'Cucinare pesci a distanza\');"</a>'+
//CUCINARE FUNGHI A DISTANZA
'<a onclick="xajax_scriptCall(\'showDialog\',178,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "><img src="/img/items/inventory_mushroomragout1.gif" style=" position: absolute; top: -3px; left: 70px"  width="26"  height="26" onmouseover="showToolTipText(\'Cucinare Funghi a distanza\');"</a>'+
//COMPRARE CARTA PREGIATA
'<a onclick="xajax_scriptCall(\'showDialog\',478,\'8#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "><img src="/img/backgrounds/mail_wood1_th.gif" style=" position: absolute; top: -2px; left: 98px"  width="22" border="0" height="22" onmouseover="showToolTipText(\'Comprare carta pregiata a distanza\');"</a>'+
//COMPRARE CORONE D'ONORE
'<a onclick="xajax_scriptCall(\'showDialog\',479,\'9#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "><img src="http://www.iagi.info/ARALDICA/gentilizia/reali/prussia.gif" style=" position: absolute; top: -3px; left: 121px" width="22" border="0" height="22" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Comprare corone onore\');"</a>'+
//SITTER
'<a onclick="xajax_showModule(\'settings\',\'account\',\'\'); return false;"><img src="/img/icons/Icon_settings.gif" style=" position: absolute; top: 1px; left: 146px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Immettere il Sitter\');"</a>'+
//DONAZIONE ALLA GILDA
'<a onclick="xajax_showModule(\'guild\',\'transfer\',0); return false;"><img src="/img/icons/Icon_guild.gif" style=" position: absolute; top: 1px; left: 168px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Donare alla Gilda\');"</a>'+
//LISTA AMICI
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;"><img src="/img/icons/Icon_friendtree.gif" style="cursor: pointer;  position: absolute; top: 1px; left: 190px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lista degli Amici\');"</a>'+
//MINIGIOCHI
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;"><a onclick="xajax_showModule(\'miniGame\',\'list\',\'-5\')" return false;"><img src="/img/icons/Icon_minigame.gif" style="cursor: pointer; position: absolute; top: 1px; left: 212px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Sommario giochi\');"</a>'+
//ATTREZZI
'<a onclick="xajax_showModule(\'tooltrader\',\'\',1); return false;"><img src="/img/icons/Icon_tools.gif" style=" position: absolute; top: 1px; left: 234px" width="20" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Comprare Attrezzi\');"</a>'+
//SELEZIONA MESS
'<input id="s10" type="checkbox" onclick="selectAll(\'mailform\');" name="s10" style="cursor: pointer; position: absolute; top: 1px; left: 256px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Seleziona tutti i mess per cancellarli\');"</a>'+ 



'</div>'+
'</div>'+

'</div>';

var menu = addElem('div', menuinner);
var elem = $('gameDiv');


if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}

'</div>';

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}