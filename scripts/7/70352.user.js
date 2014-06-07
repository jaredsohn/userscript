// ==UserScript==
// @name           ToolBar_Travianer
// @namespace      Travi ToolBar II
// @description    ToolBar für Travianer mit sehr vielen Funktionen, FL öffnen, Katze finden, NPC´s jagen uvm...
// @version        2010d (2010_03_07)
// @include        http://travianer.de/game.php*
// @include        http://www.travianer.de/game.php*
// @include        http://master.travianer.de/game.php*
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
'background-image: url(http://npc.duak007.de/npc.jpg);'+
'top:-40px; left:130px;'+
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
'background-image: url(http://web566.server98.greatnet.de/travianer_lzm/lzm.pl);'+
'top:-90px; left:130px;'+
'width:574px; height:150px; '+
'}')

var menuinner = '<img style="position: absolute; top: 6px; left: 224px; z-index: 98;" src="img/icons/supporticon_rules.gif" width="25px" height="25px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Zusatzfunktionen ein-/ausblenden\');" id="addOnMinimizer"/>'+
'<div style="display: none; position: absolute; padding: 2px; top: 2px; left: 1px; width: 130px; height: auto; z-index: 1; background: url(img/window_middle.gif); text-size: 11px; color: rgb(114, 57, 0); text-align: left;" id="interfaceDivAddOn">'+
'<div id="TitleName" class="chatHeader" style="width: 194px;"><u><b>Travi Toolbar II</u></b></div>'+
'<hr>'+
'<b>Gehe zu:</b><br/>'+

'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;"><img src="/img/achievements/Icon_hausundhof2b.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Eigenes Haus\');"</a>'+
'<a onclick="xajax_click(5631, 5444, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/icons/Icon_guild.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'zur Gilde\');"</a>'+
'<a onclick="xajax_click(8575, 5506, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_gold.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Schatz suchen\');"</a>'+
'<a onclick="xajax_click(7590, 5223, 7542, 5322, \'fight<<\', BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr); return false;"><img src="/img/icons/interface_left_top_0.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Arena\');"</a>'+
'<a onclick="xajax_click(6886, 5311, 6808, 5133, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/icons/interface_left_top_3.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Markt\');"</a>'+
'<br/>'+
'<a onclick="xajax_click(6838, 4995, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/travel7.gif" width="36" border="0" height="36" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Dorf\');"</a>'+
'<a onclick="xajax_click(4328, 7003, 4349, 7038, \'bank<<\', BGlocation, BGlocationOwner, -2, 0, 0, 0); return false; "><img src="/img/sell.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'zur Bank\');"</a>'+
'<a onclick="xajax_click(5564, 4438, 6808, 5133, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/buildings/9,10_house.gif" width="36" border="0" height="36" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Labyrinth\');"</a>'+
'<a onclick="xajax_click(6434, 5652, 10315, 6985, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/catwoman/Catwoman_l_stand.gif" width="30" border="0" height="32" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Felida\');"</a>'+
'<br/>'+
'<a onclick="xajax_click(10413, 6880, 10315, 6985, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/eulalie/Eulalie_l_stand.gif" width="36" border="0" height="36" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Eulalie\');"</a>'+
'<a onclick="xajax_click(8185, 7430, 8185, 7430, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/Vendor_r_stand.gif" width="36" border="0" height="36" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Gaja(Geschenke)\');"</a>'+
'<a onclick="xajax_click(8881, 7494, 9329, 4707, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/riddles/Enigma_l_stand.gif" width="36" border="0" height="36" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Enigma(Bingo)\');"</a>'+
'<a onclick="xajax_click(5070, 7003, 7876, 4781, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/riddles/Troja_l_stand.gif" width="36" border="0" height="36" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Troja(Münze)\');"</a>'+
'<hr>'+
'<b>NPC:</b><br/>'+
'<a onclick="xajax_click(6271, 5260, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter4/Fighter4_stand_l.gif"  width="26" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei der Gilde\');"</a>'+
'<a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter3/Fighter3_stand_l.gif"  width="22" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei den Häusern\');"</a>'+
'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter2/Fighter2_stand_r.gif" width="31" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'über der Arena\');"</a>'+
'<a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter11/Fighter11_stand_l.gif" width="35" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'LeShurke\');"</a>'+
'<br/>'+
'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter1/Fighter1_stand_l.gif"  width="25" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'an der Germ.Grenze\');"</a>'+
'<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter5/Fighter5_stand_l.gif" width="40" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei Isolde\');"</a>'+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter9/Fighter9_stand_l.gif" width="22" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei der 2. Schmiede\');"</a>'+
'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter8/Fighter8_stand_l.gif"  width="40" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei Sieglinde\');"</a>'+
'<br/>'+
'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter10/Fighter10_stand_l.gif" width="22" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei der 2. Schreinerei\');"</a>'+
'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter7/Fighter7_stand_l.gif" width="40" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei der 2. Ziegelei\');"</a>'+



//'<a onclick="xajax_click(6271, 5260, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter4/Fighter4_stand_l.gif" style=" position: relative; left: 0px;" width="26" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei der Gilde\');"</a>'+
//'<a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter3/Fighter3_stand_l.gif" style=" position: relative; top: -1px; left: -3px" width="22" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei den Häusern\');"</a>'+
//'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter2/Fighter2_stand_r.gif" style=" position: relative; top: 1px; left: -3px" width="31" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'über der Arena\');"</a>'+
//'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter1/Fighter1_stand_l.gif" style=" position: relative; top: -1px; left: -6px" width="25" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'an der Germ.Grenze\');"</a>'+
//'<a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter11/Fighter11_stand_l.gif" style=" position: relative; top: 1px; left: -13px" width="35" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'LeShurke\');"</a>'+
'<br/>'+
//'<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter5/Fighter5_stand_l.gif" style=" position: relative; left: -9px;" width="40" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei Isolde\');"</a>'+
//'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter9/Fighter9_stand_l.gif" style=" position: relative; top: -2px; left: -15px;" top: -3"; width="22" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei der 2. Schmiede\');"</a>'+
//'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter8/Fighter8_stand_l.gif" style=" position: relative; left: -22px; top: -3"; width="40" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei der 2. Ziegelei\');"</a>'+
//'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter10/Fighter10_stand_l.gif" style=" position: relative; top: -2px; left: -28px;" top: -3" width="22" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei der 2. Schreinerei\');"</a>'+
//'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter7/Fighter7_stand_l.gif" style=" position: relative; left: -33px; top:0" width="40" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'bei Sieglinde\');"</a>'+


'<hr>'+
'<b>Essen/Baden:</b><br/>'+
'<a onclick="closeFunction(); xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, 432610, 0); return false;" href="">Castle King</a><br>'+
'<a onclick="xajax_showModule(\'friendtree\',\'\',\'260101#1\'); return false;" href="">FA_</a>'+
'<a onclick="closeFunction(); xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, 260101, 0); return false;" href="">Asterix17(HC)</a><br>'+
'<a onclick="xajax_showModule(\'friendtree\',\'\',\'388827#1\'); return false;" href="">FA_</a>'+
'<a onclick="closeFunction(); xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, 388827, 0); return false;" href="">Toyota76(CC)</a><br>'+
'<a onclick="xajax_showModule(\'friendtree\',\'\',\'85817#1\'); return false;" href="">FA_</a>'+
'<a onclick="closeFunction(); xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, 85817, 0); return false;" href="">hobbs(HC)</a><br>'+
'<a onclick="xajax_showModule(\'friendtree\',\'\',\'530712#1\'); return false;" href="">FA_</a>'+
'<a onclick="closeFunction(); xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, 530712, 0); return false;" href="">Tchoni(HC)</a><br>'+
'<a onclick="xajax_showModule(\'friendtree\',\'\',\'212034#1\'); return false;" href="">FA_</a>'+
'<a onclick="closeFunction(); xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, 212034, 0); return false;" href="">lotusbluete(HC)</a><br>'+
'<a onclick="xajax_showModule(\'friendtree\',\'\',\'277309#1\'); return false;" href="">FA_</a>'+
'<a onclick="closeFunction(); xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, 277309, 0); return false;" href="">kotzgurke(HC)</a><br>'+
'<hr>'+
'<b>Markt:</b><br/>'+
'<a class=info "onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;">Preise/Markt<span></span></a><br/>'+

//'<a href="http://www.pflock.de/travianer/npc/index.htm" target="_blank">NPC+Höchstpreis</a><br/>'+
//'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;">öffne Markt</a>'+

'<hr>'+
'<b>Lösungen:</b><br/>'+
'<a class=info1 href="http://travianer.alexxela.de/index.php" target="_blank">tägliche Aufgaben<span></span></a><br/>'+
'<hr>'+
'<b>Katzen:</b><br/>'+
'<a onclick="xajax_click(6620, 6160, 6630, 6170, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">2. Mühle</a><br/>'+
'<a onclick="xajax_click(5740, 5850, 5750, 5860, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">zum Verb.Gebiet</a><br/>'+
'<a onclick="xajax_click(7600, 4900, 7610, 4910, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">über der Arena</a><br/>'+
'<a onclick="xajax_click(8550, 5340, 8560, 5350, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">beim Mohr</a><br/>'+
'<a onclick="xajax_click(7700, 6500, 7710, 6510, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Sommerfrische</a><br/>'+
'<a onclick="xajax_click(8930, 6650, 8940, 6660, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Lorenas Haus</a><br/>'+
'<a onclick="xajax_click(9350, 5910, 9360, 5920, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">2. Lehmgrube</a><br/>'+
'<a onclick="xajax_click(5100, 6170, 5110, 6180, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">über Stan</a><br/>'+
'<a onclick="xajax_click(4600, 6490, 4610, 6500, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">links von Stan</a><br/>'+
'<a onclick="xajax_click(4720, 7400, 4730, 7410, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Feilchenfeld</a><br/>'+
'<a onclick="xajax_click(5360, 7310, 5370, 7320, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">rechts vom ^^</a><br/>'+
'<a onclick="xajax_click(4300, 5710, 4310, 5720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">VG Schleuder</a><br/>'+
'<a onclick="xajax_click(5550, 4900, 5560, 4910, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">VG Portal</a><br/>'+
'<a onclick="xajax_click(5480, 4560, 5490, 4570, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">VG Labyrinth</a><br/>'+
'<a onclick="xajax_click(8880, 4440, 8890, 4450, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">links von Lumpik</a><br/>'+
'<a onclick="xajax_click(9950, 4440, 9960, 4450, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">rechts von Lumpik</a><br/>'+
'<a onclick="xajax_click(9630, 5230, 9640, 5240, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">unter Lumpik</a><br/>'+
'<a onclick="xajax_click(8040, 7710, 8050, 7720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">unter Gaia</a><br/>'+
'<a onclick="xajax_click(9310, 7380, 9320, 7390, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">Steg Römerlager</a><br/>'+
'<a onclick="xajax_click(10200, 7070, 10210, 7080, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">über Taverne RL</a><br/>'+
'<hr>'+
'<b>Rohstoffabbau:</b><br/>'+
'<a onclick="xajax_click(8446, 6354, 8446, 6354, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_wood.gif" width="25" border="0" height="25"></a>  '+
'<a onclick="xajax_click(9600, 5460, 9600, 5460, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_clay.gif" width="25" border="0" height="25"></a>  '+
'<a onclick="xajax_click(6906, 7252, 6906, 7252, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_ore.gif" width="25" border="0" height="25"></a>  '+
'<a onclick="xajax_click(7348, 6394, 7348, 6394, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_corn.gif" width="25" border="0" height="25"></a><br>  '+
'<a onclick="xajax_click(6735, 5973, 6735, 5973, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_flour.gif" width="25" border="0" height="25"></a>  '+
'<a onclick="xajax_click(9380, 6126, 9380, 6126, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_coal.gif" width="25" border="0" height="25"></a> '+
'<a onclick="xajax_click(6239, 6981, 6239, 6981, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_board.gif" width="25" border="0" height="25"></a>  '+
'<a onclick="xajax_click(6317, 6595, 6317, 6595, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_brick.gif" width="25" border="0" height="25"></a><br>  '+
'<a onclick="xajax_click(7579, 6071, 7579, 6071, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_iron.gif" width="25" border="0" height="25"></a>  '+
'<a onclick="xajax_click(7520, 6885, 7520, 6885, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_bread.gif" width="25" border="0" height="25"></a><br>  '+

'<hr>'+
'<b>Nützliche Links:</b><br/>'+
'<a href="javascript:void(movementInterval=1)" target="_self">Rennen (off=F5)</a><br> '+
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;">FL öffnen</a><br> '+
'<a onclick="xajax_showModule(\'settings\',\'account\',\'\'); return false;">Sitter eintragen</a><br>'+
'<a onclick="xajax_showModule(\'guild\',\'transfer\',0); return false;">Einlagern</a><br> '+
'<a href="http://www.travianerwiki.de" target="_blank">TravianerWiki</a><br>'+
'<a href="http://drop.io/qj5ou1o" target="_blank">Schatzraster</a><br>'+
'...............<br>'+
'</div>';
var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}

