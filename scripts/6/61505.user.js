// ==UserScript==
// @name           TravianerHelp
// @namespace      http://
// @description    Travianer Help - Benutze das Skript um dein Leben im Travianer leichter zu machen ;)
// @version        1.5b
// @include        http://www.travianer.de/game.php*
// @include        http://travianer.de/game.php*
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
        if (attributes)        for (a in attributes) aElem.setAttribute(a, attributes[a]);
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


var menuinner = '<img style="position: absolute; top: 2px; left: 10px; z-index: 98;" src="img/icons/supporticon_rules.gif" width="17px" height="17px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Zusatzfunktionen ein-/ausblenden\');" id="addOnMinimizer"/>'+
'<div style="display: none; position: absolute; padding: 0px; top: 0px; left: 0px; width: 200px; height: 380; z-index: 1; background: url(/img/window_middle.gif); text-size: 6px; color: rgb(114, 57, 0); text-align: left;" id="interfaceDivAddOn">'+
'<br/>&nbsp;&nbsp;&nbsp;<b>Gehe zu:</b><br/>'+
'&nbsp;&nbsp;&nbsp;<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;"><img src="/img/icons/Icon_editor.gif" title="Eigenheim" border="0"></a> '+
'<a onclick="xajax_click(5660, 5460, 5670, 5470, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/icons/Icon_guild.gif" title="Gilde" border="0"></a> '+
'<a onclick="xajax_click(6810, 5000, 6820, 5010, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/icons/Icon_social2.gif" title="Dorf" border="0"></a> '+
'<a onclick="xajax_click(7590, 5223, 7542, 5322, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="/img/icons/Icon_fight.gif" title="Arena" border="0"></a> '+
'<a onclick="xajax_click(6886, 5311, 6808, 5133, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/icons/Icon_friendtree.gif" title="Markt" border="0"></a> '+
'<a onclick="xajax_click(8626, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/icons/Icon_trade.gif" title="Moor" border="0"></a><br/>'+

'<hr width="75%">'+
'&nbsp;&nbsp;&nbsp;<b>NPC-Charaktere:</b><br/>'+
'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(7022, 4905, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/senkel/Senkel_r_clean_b.gif" title="Senkel" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(9421, 4417, 9329, 4707, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Lumpik/Lumpik_r_stand.gif" title="Lumpik" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(10413, 6880, 10315, 6985, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Eulalie/Eulalie_r_stand.gif" title="Eulalie" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(8196, 4751, 7876, 4781, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/matricia/Matricia_r_stand.gif" title="Matricia" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(4650, 7010, 4660, 7020, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/pilou/Pilou_r_stand.gif" title="Pilou" border="0" width="35" height="35"></a><br/>'+

'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(6540, 5720, 6550, 5730, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/catwoman/Catwoman_r_stand.gif" title="Felida" border="0"></a>'+
'<a onclick="xajax_click(5050, 6500, 5060, 6510, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Stan_r_stand.gif" title="Stan" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(8880, 7550, 8890, 7560, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/riddles/Enigma_r_stand.gif" title="Enigma" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(8340, 7500, 8350, 7510, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Vendor_r_stand.gif" title="Gaia" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(7170, 4800, 7180, 4810, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/magistrate/Magistrate2_r_stand.gif" title="Finanzamt" border="0" width="35" height="35"></a><br/>'+

'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(4328, 7003, 4349, 7038, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/Banker_r_stand.gif" title="Bank" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(5070, 6950, 5080, 6960, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/riddles/Troja_r_stand.gif" title="Troja" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(5700, 4500, 5710, 4510, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/buildings/9,10_house.gif" title="Labyrinth" border="0" width="45" height="35"></a><br/>'+
'<hr width="75%">'+
'&nbsp;&nbsp;&nbsp;<b>NPC-Kämpfer:</b><br/>'+
'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(6271, 5260, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter4/Fighter4_stand_r.gif" title="Bei den GildenhÃ¤usern in der NÃ¤he der KrÃ¤uter" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter3/Fighter3_stand_r.gif" title="Der StockkÃ¤mpfer steht bei der HÃ¤user-Rangliste, in der NÃ¤he von Tonkarius Ruine" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter2/Fighter2_stand_l.gif" title="Die Hexe befindet sich nÃ¶rdlich der Arena" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter1/Fighter1_stand_r.gif" title="Den Ninja findet ihr an der Grenze zum Germanenlager" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter11/Fighter11_stand_r.gif" title="Le Schurke steht momentan im Moor" border="0" width="35" height="35"></a><br/>'+
'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter5/Fighter5_stand_r.gif" title="In der NÃ¤he der Taverne bei Karamix, dort wo in der 2. Generation Isolde mit ihrer Schafherde wohnt" border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter9/Fighter9_stand_r.gif" title="Piccolo / Son Gohan wartet bei der 2. Eisenschmelze auf euch." border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter8/Fighter8_stand_r.gif" title="Cloud Strife findet ihr in der NÃ¤he des 2. Getreidefelds." border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter10/Fighter10_stand_r.gif" title="Ryu aus StreetFighter findet ihr in der NÃ¤he von Livius Haus." border="0" width="35" height="35"></a>'+
'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter7/Fighter7_stand_r.gif" title="An der 2. Ziegelbrennerei befindet sich Ryo Hazuki aus Shenmue." border="0" width="35" height="35"></a><br/>'+
'<hr width="75%">'+
'&nbsp;&nbsp;&nbsp;<b>Katzen:</b><br/>'+
'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(6620, 6160, 6630, 6170, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">01</a> | '+
'<a onclick="xajax_click(5740, 5850, 5750, 5860, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">02</a> | '+
'<a onclick="xajax_click(7600, 4900, 7610, 4910, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">03</a> | '+
'<a onclick="xajax_click(8550, 5340, 8560, 5350, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">04</a> | '+
'<a onclick="xajax_click(7700, 6500, 7710, 6510, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">05</a><br/>'+
'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(8930, 6650, 8940, 6660, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">06</a> | '+
'<a onclick="xajax_click(9350, 5910, 9360, 5920, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">07</a> | '+
'<a onclick="xajax_click(5100, 6170, 5110, 6180, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">08</a> | '+
'<a onclick="xajax_click(4600, 6490, 4610, 6500, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">09</a> | '+
'<a onclick="xajax_click(4720, 7400, 4730, 7410, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">10</a><br/>'+
'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(5360, 7310, 5370, 7320, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">11</a> | '+
'<a onclick="xajax_click(4300, 5710, 4310, 5720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">12</a> | '+
'<a onclick="xajax_click(5550, 4900, 5560, 4910, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">13</a> | '+
'<a onclick="xajax_click(5480, 4560, 5490, 4570, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">14</a> | '+
'<a onclick="xajax_click(8880, 4440, 8890, 4450, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">15</a><br/>'+
'&nbsp;&nbsp;&nbsp;<a onclick="xajax_click(9950, 4440, 9960, 4450, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">16</a> | '+
'<a onclick="xajax_click(9630, 5230, 9640, 5240, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">17</a> | '+
'<a onclick="xajax_click(8040, 7710, 8050, 7720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">18</a> | '+
'<a onclick="xajax_click(9310, 7380, 9320, 7390, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">19</a> | '+
'<a onclick="xajax_click(10200, 7070, 10210, 7080, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">20</a><br/>'+

'<hr width="75%">'+
'</div>';

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}