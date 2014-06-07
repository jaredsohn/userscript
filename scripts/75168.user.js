// ==UserScript==
// @name           Nemexia Bar
// @description  Помощник за играта
// @author          axllrose
// @include        http://*.nemexia.*
// ==/UserScript==

    function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
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

var menuinner = '<img style="position: fixed; top: 6px; left: 6px; z-index: 98;" src="http://remivorud.com/nemexia/premium.png" width="15px" height="15px" onmouseout="UnTip();"onmouseover="Tip(\'Бонус меню\');" onclick="toggleHotLinks();" id="menuIcon"/>'+
'<div id="showMenuBack" style="position: fixed; padding: 2px; top: 4px; left: 4px; width: 100px; height: auto; z-index: 97; background: url(http://game.nemexia.bg/img/trans.png); //text-size: 11px; color: rgb(1, 1, 1); text-align: left;">'+
'<div id="TitleName" class="chatHeader" style="color:white;">        Bonus menu</div>'+
'<hr>'+
//'<div id="ChatContent" class="chatContent" style="color:white;"><b>Отвори:</b><br/>'+
//'<a href="advanced_search.php" style="text-decoration:none;">Търсене | </a>'+
//'<a href="javascript:void(0);" style="text-decoration:none;" onclick="showTab(\'pointsSearchTab\');">Точки</а><br/>'+
//'<a href="ship_market.php" style="text-decoration:none;">Пазар Кораби</a><br/>'+
//'<a href="recyclingPlant.php" style="text-decoration:none;">Дестилатор</a><br/>'+
//'<a href="trade_center.php" style="text-decoration:none;">Пазар</a><br/>'+
//'<a href="ships.php" style="text-decoration:none;">Кораби</a><br/>'+
//'<a href="fleets.php" onclick="$(\'#fleetTable\').slideUp();loadMyShips();showTab(\'TabSimulator\');">Калкулатор</a><br/>'+
//'<a href="overview.php" style="text-decoration:none;">Преглед</a><br/>'+
//'<a href="laboratory.php" style="text-decoration:none;">Науки</a><br/>'+
//'<a href="playerInfo.php?player_id=6670" style="text-decoration:none;">Полети</a><br/>'+
//'<a href="factory.php" style="text-decoration:none;">Роботи</a><br/>'+
//'<a href="ship_upgrade.php" style="text-decoration:none;">Ъпгрейди</a><br/>'+
//'<a href="teamInfo.php?planet_id=21509" style="text-decoration:none;">U.S.G.</a><br/>'+
//'<a href="teamInfo.php?planet_id=21357" style="text-decoration:none;">GALACTICA</a><br/>'+
//'<a href="javascript:void(0);" style="text-decoration:none;" onclick="document.location = \'vip.php?tabId=adventuresTab\'">Междузвездни пътешествия</a><br/>'+


//'<a href="javascript:void(0)" onclick="$(\'#ship_1_12\').val(1);">Sp Conf</a><br/>'+
//'<a href="javascript:void(0)" onclick="$(\'#ship_2_12\').val(1);">Sp Tert</a><br/>'+
//'<a href="javascript:void(0)" onclick="$(\'#ship_3_12\').val(1);">Sp Noxy</a><br/>'+
//'<a href="fleets.php?c1=10&amp;c2=67&amp;c3=23" class="sendFleet" title="Send"></a><br/>'+

//'<a href="javascript:void(0)" style="display: inline-block; text-decoration:none;" onclick="document.location = \'fleets.php?c1=10&amp;c2=67&amp;c3=23\'" class="sendFleet"> </a>'+

//'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-001.png" onclick="return showRecycleLocations();">'+

'<a href="javascript:void(0)" style="display: inline-block; text-decoration:none;" onclick="document.location = \'fleets.php?c1=10&amp;c2=67&amp;c3=23\'" class="sendFleet"> </a>'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-001.png" onmouseout="UnTip();"onmouseover="Tip(\'Изпрати Сонда\');" onclick="$(\'#ship_1_12\').val(1); document.getElementById(\'mission\').value=2">'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-001.png" onclick="shipsCheck();" type="button">'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-001.png" onclick="$(this).attr(\'disabled\', \'disabled\');SendFleet();" type="button"><br/>'+

'<a href="javascript:void(0)" style="display: inline-block; text-decoration:none;" onclick="document.location = \'fleets.php?c1=10&amp;c2=67&amp;c3=23\'" class="sendFleet"> </a>'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-002.png" onmouseout="UnTip();"onmouseover="Tip(\'Изпрати Сонда\');" onclick="$(\'#ship_2_12\').val(1); document.getElementById(\'mission\').value=2">'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-002.png" onclick="shipsCheck();" type="button">'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-002.png" onclick="$(this).attr(\'disabled\', \'disabled\');SendFleet();" type="button"><br/>'+

'<a href="javascript:void(0)" style="display: inline-block; text-decoration:none;" onclick="document.location = \'fleets.php?c1=10&amp;c2=67&amp;c3=23\'" class="sendFleet"> </a>'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-003.png" onmouseout="UnTip();"onmouseover="Tip(\'Изпрати Сонда\');" onclick="$(\'#ship_3_12\').val(1); document.getElementById(\'mission\').value=2">'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-003.png" onclick="shipsCheck();" type="button">'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-003.png" onclick="$(this).attr(\'disabled\', \'disabled\');SendFleet();" type="button"><br/>'+

//'<a href="javascript:void(0)" onclick="document.getElementById(\'mission\').value=2" class="right">000</a>'+
//'<a href="javascript:void(0)" style="text-decoration:none;"  onclick="$(\'#ship_1_12\').val(1);"><img src="http://remivorud.com/nmx/Send-Icon-001.png" width="15px" height="15px"  onmouseout="UnTip();"onmouseover="Tip(\'Изпрати 1 Сонда\');"></a><br/>'+

''+
'<br/>'+


'<hr>'+
// onclick="document.location = 'vip.php?tabId=adventuresTab'">Междузвездни пътешествия</a>
//'<a href="advanced_search.php" style="text-decoration:none;">Търсене</a><br/>'+'<hr>'+
'<a href="#"; style="text-decoration:none; color:orange;"><center>автор: axllrose</center></a>'
'</div>';

var menu = addElem('div', menuinner);