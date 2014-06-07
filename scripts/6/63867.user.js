// ==UserScript==
// @name           Travians Bar
// @namespace  http://
// @description   Българска версия на Travians Bar
// @include        http://www.travianer.de/game.php*
// @include        http://travianer.de/game.php*
// @include        http://www.travianer.de/game.php?code=&refurl=
// @include        http://www.travians.com/game.php*
// @include        http://travians.com/game.php*
// @include        http://www.travians.com/game.php?code=&refurl=
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

//rgb(114, 57, 0)
//
var menuinner = '<img style="position: absolute; top: 6px; left: 6px; z-index: 98;" src="http://img8.imageshack.us/img8/56/infoicon.png" width="21px" height="21px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Отвори/Затвори \');" id="addOnMinimizer"/>'+
'<div style="display: none; position: absolute; padding: 2px; top: 4px; left: 4px; width: 200px; height: auto; z-index: 1; background: url(http://remivorud.com/imgPack/transparatnce.png); text-size: 11px; color: rgb(1, 1, 1); text-align: left;" id="interfaceDivAddOn">'+
'<div id="TitleName" class="chatHeader"  style="width: 194px;">Травианс Бар</div>'+
//'<b>Травиан бар</b><br/>'+
'<b>Иди до:</b><br/>'+
//'<а onclick="xajax_scriptCall(quest, 1, beam, 0); return false;">REFRESH</a><br/>'+
//'<а onclick="xajax_click(BGlocation, BGlocationRoom, BGlocationOwner, 0,0,0, 0);">refresh</a><br/>'+
//'<a on
//'<a href="http://travians.com/modules/game/game.server.php?xajax=scriptCall&xajaxargs[]=quest&xajaxargs[]=1&xajaxargs[]=beam&xajaxargs[]=0&xajaxr=1242331086711">refresh</a>'+
//'|<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;"> House </a>|'+
'|<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, 29207, 0); closeUserMenu(); return false;"> House </a>|'+
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -3, 0, -20586, 0); return false; "> TBD </a>|'+
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -3, 0, -952, 0); return false; "> HOO </a>|'+
'<a onclick="xajax_click(5898, 5313, 6015, 5414, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "> GW </a>|<br/>'+
'|<a onclick="xajax_click(7590, 5223, 7542, 5322, \'fight<<\', BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr); return false;"> Арена </a>|'+
'<a onclick="xajax_click(6886, 5311, 6808, 5133, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "> Мегдан </a>|'+
'<a onclick="xajax_click(7022, 4905, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "> Селото </a>|<br/>'+
'|<a onclick="xajax_click(4328, 7003, 4349, 7038, BGlocation, BGlocationOwner, -2, 0, 0, 0); return false; "> Банката </a>'+
'|<a onclick="xajax_click(8196, 4751, 7876, 4781, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "> Матриция </a> | '+
'<hr>'+
'<b>Полезни:</b><br/>'+
'|<a onclick="changeRoom(11); return false;"><span id="channelName12"> S1 </span></a>'+
'|<a onclick="changeRoom(12); return false;"><span id="channelName12"> S2 </span></a>'+
'|<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;"> Пазар </a>'+
'|<a onclick="xajax_scriptCall(\'showDialog\',226,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;"> Риба </a> | <br/>'+
//'|<a onclick="xajax_scriptCall(\'showDialog\',348,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "> Банка </a>'+
'|<a onclick="xajax_scriptCall(\'showDialog\',108,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "> Отвари </a>'+
'|<a onclick="xajax_scriptCall(\'showDialog\',178,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "> Гъби </a>'+
//'|<a onclick="xajax_showModule(\'guild\',\'buildstorage\',71858); return false; "> Склад </a>'+
//'|<a onclick="xajax_showModule(\'blogs\',\'comments\',\'106832-2079\'); return false;"> Състезание </a>'+
//'|<a onclick="xajax_showModule(\'guild\',\'buildartifacts\',20586); return false;"> Артефакти </a>|'+
//'|<a onclick="xajax_scriptCall(\'showDialog\',40,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "> Ястия </a>|<br/>'+
//'<a onclick="xajax_showModule(\'misc\',\'treasuremap\',0); return false;">Карта </a>  | '+
//'<a onclick="xajax_showModule(\'bank\',\'select\', \'treasureMap\');  return false;">Карта купи </a> <br/>'+
'<hr>'+
'<img src="http://img2.imageshack.us/img2/3037/refresh.png" width="15px" height="15px"> <a onclick="xajax_scriptCall(\'quest\',1, \'beam\',0,\'1242331086711\'); return false;"><b>Refresh</b></a>'+
//'<img src="http://img2.imageshack.us/img2/3037/refresh.png" width="15px" height="15px"> <a onclick="closeFunction(); xajax_scriptCall(\'showDialog\', 180, \'13#0\', 0); return false;"><b>R2</b></a>'+
' <img src="http://img11.imageshack.us/img11/7905/forumicon.png" width="15px" height="15px"> <a onclick="xajax_showForum(\'\',-2,-1,-1,0)">Forum</a><br/>'+
'<img src="../img/icons/Icon_friendtree.gif" width="15px" height="15px"> <a onclick="xajax_showModule(\'friendtree\',\'buddylist\',0); return false;">Friend list</a>'+
' <img src="../img/icons/Icon_trade.gif" width="15px" height="15px"> <a onclick="xajax_scriptCall(\'showDialog\',55,\'1#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "> Pay Taxes </a><br/>'+
'<hr>'+
'<b>NPCs:</b><br/>'+
'| <a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">01</a> | '+
'<a onclick="xajax_click(6271, 5260, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">02</a> | '+
'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">03</a> | '+
'<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">04</a> | '+
'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">05</a> | <br/>'+
'| <a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">06</a> | '+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">07</a> | '+
'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">08</a> | '+
'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">09</a> | '+
'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">10</a> |<br/>'+
'<hr>'+
//'<b>Ресурси:</b><br/>'+
//'Основни: <img src="../img/res/wood.gif"><img src="../img/res/clay.gif"><img src="../img/res/ore.gif"><img src="../img/res/corn.gif">'+
//'Вторични: <img src="../img/res/flour.gif"><img src="../img/res/coal.gif"><img src="../img/res/board.gif"><img src="../img/res/brick.gif"><img src="../img/res/iron.gif"><img src="../img/res/bread.gif"></b>'+
//'<hr>'+
//'<b>Легенда:</b><br/>'+
//'OH = Own House<br/>'+
//'GH = Guild House<br/>'+
//'GW = Guild Warehouse<br/>'+
//'<hr>'+
//'<b>Пазар:</b><br/>'+
//'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;">Player Market </a><br/>'+
//'<a class=info href="http://www.pflock.de/travianer/npc/alle.txt">NPC Цени (задръж)<span></span></a><br/>'+
//'<hr>'+
'<b>Връзки:</b><br/>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-961\'); return false;">Gen 1 WT + Notes</a><br/>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-963\'); return false;">Gen 2 Walkthrough</a><br/>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-964\'); return false;">Gen 3 Walkthrough</a><br/>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-842\'); return false;">Полезни блогове</a><br/>'+
'<a onclick="xajax_showModule(\'guild\',\'memberlist\',20586); return false;">TBD List</a><br/>'+
'<a onclick="xajax_showModule(\'club\',\'memberlist\',1075); return false;">UMO Club</a><br/>'+
'<a href="https://creator.zoho.com/ine1976/travians_furniture/#Page:Home", target=blank">Мебелен каталог</a>'+
//'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-966\'); return false;">БЛОГ</a><br/>'+
//'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-966\'); return false;">БЛОГ</a><br/>'+
//'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-966\'); return false;">БЛОГ</a><br/>'+
//'<a href="http://www.travianerwiki.de">TravianerWiki</a>'+
'<hr>'+
'<b>TLC:</b><br/>'+
'<a onclick="xajax_showForum(\'\',40068,1878,-1,0); return false;">Bulgarian</a><br/>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-2494\'); return false;">Index</a><br/>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-2495\'); return false;">Екрана/Screen</a><br/>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-2496\'); return false;">Играта - How to</a><br/>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-2497\'); return false;">BG G1 WT</a><br/>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'29207-2498\'); return false;">Битки, Оръжия</a><br/>'+
'<hr>'+
'<b>Last update: 17.09.09</b><br/>'+
'<b>Автор: <a href="" onclick="userMenu(\'axllrose\',29207); return false;"><u>axllrose</u></a></b><br/>'+
'<hr>'+
'</div>';

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}