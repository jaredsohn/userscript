// ==UserScript==
// @name           Nemexia Bar
// @description  Помощник в игре
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

var menuinner = '<img style="position: fixed; top: 6px; left: 6px; z-index: 98;" src="http://clip2net.com/clip/m70843/1300734094-clip-2kb.jpg" width="15px" height="15px" onmouseout="UnTip();"onmouseover="Tip(\'Premium\');" onclick="toggleHotLinks();" id="menuIcon"/>'+
'<div id="showMenuBack" style="position: fixed; padding: 2px; top: 4px; left: 4px; width: 100px; height: auto; z-index: 97; background: url(http://game.nemexia.bg/img/trans.png); //text-size: 11px; color: rgb(1, 1, 1); text-align: left;">'+
'<div id="TitleName" class="chatHeader" style="color:white;">        Бонус меню</div>'+
'<hr>'+

//'<a href="javascript:void(0)" onclick="$(\'#ship_1_12\').val(1);">Sp Conf</a><br/>'+
//'<a href="javascript:void(0)" onclick="$(\'#ship_2_12\').val(1);">Sp Tert</a><br/>'+
//'<a href="javascript:void(0)" onclick="$(\'#ship_3_12\').val(1);">Sp Noxy</a><br/>'+
//'<a href="fleets.php?c1=10&amp;c2=67&amp;c3=23" class="sendFleet" title="Send"></a><br/>'+

//'<a href="javascript:void(0)" style="display: inline-block; text-decoration:none;"  onclick="document.location = \'fleets.php?c1=20&c2=51&c3=2\'" class="sendFleet"> </a>'+

//'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-001.png" onclick="return showRecycleLocations();">'+

'<a href="javascript:void(0)" style="display: inline-block; text-decoration:none;" onmouseout="UnTip();"onmouseover="Tip(\'Полеты \');" onclick="document.location = \'fleets.php?c1=20&c2=51&c3=2\'" class="sendFleet"> </a>'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-001.png" onmouseout="UnTip();"onmouseover="Tip(\'Отправить 1 шпиона\');" onclick="$(\'#ship_1_12\').val(1); document.getElementById(\'mission\').value=2">'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-001.png" onmouseout="UnTip();"onmouseover="Tip(\'Продолжить\');" onclick="shipsCheck();" type="button">'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://remivorud.com/nmx/Send-Icon-001.png" onmouseout="UnTip();"onmouseover="Tip(\'Отправить шпиона\');" onclick="$(this).attr(\'disabled\', \'disabled\');SendFleet();" type="button"><br/>'+
 
  //otpravka transporta
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://clip2net.com/clip/m70843/1300909741-clip-1kb.jpg" onmouseout="UnTip();"onmouseover="Tip(\'Отправить 20 транспортников\');" onclick="$(\'#ship_1_1\').val(20); document.getElementById(\'mission\').value=3">'+

'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://laveraddominicana.files.wordpress.com/2008/12/30-de-diciembre-del-08.png" onmouseout="UnTip();"onmouseover="Tip(\'Отправить 30 транспортников\');" onclick="$(\'#ship_1_1\').val(30); document.getElementById(\'mission\').value=3">'+

'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://www.routemarkers.com/states/US_40.gif" onmouseout="UnTip();"onmouseover="Tip(\'Отправить 40 транспортников\');" onclick="$(\'#ship_1_1\').val(40); document.getElementById(\'mission\').value=3">'+

'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="22px" height="22px"  src="http://www.dot.state.oh.us/districts/D10/newsreleases/PublishingImages/600px-US_50_svg.png" onmouseout="UnTip();"onmouseover="Tip(\'Отправить 50 транспортников\');" onclick="$(\'#ship_1_1\').val(50); document.getElementById(\'mission\').value=3">'+

'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="90px" height="11px"  src="http://clip2net.com/clip/m70843/1300910299-clip-103b.png" onmouseout="UnTip();"onmouseover="Tip(\'by StoUp\');" onclick="$(\'#ship\').val(0); document.getElementById(\'mission\').value=0">'+

'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="90px" height="28px"  src="http://clip2net.com/clip/m70843/1300898884-clip-1kb.png" onmouseout="UnTip();"onmouseover="Tip(\'Продолжить\');" onclick="shipsCheck();" type="button">'+
'<img style="position: relative; top: 9px; left: 6px; z-index: 118;" width="90px" height="33px"  src="http://clip2net.com/clip/m70843/1300898434-clip-1kb.png" onmouseout="UnTip();"onmouseover="Tip(\'Отправить\');" onclick="$(this).attr(\'disabled\', \'disabled\');SendFleet();" type="button"><br/>'+

//'<a href="javascript:void(0)" onclick="document.getElementById(\'mission\').value=2" class="right">000</a>'+
//'<a href="javascript:void(0)" style="text-decoration:none;"  onclick="$(\'#ship_1_12\').val(1);"><img src="http://remivorud.com/nmx/Send-Icon-001.png" width="15px" height="15px"  onmouseout="UnTip();"onmouseover="Tip(\'\');"></a><br/>'+

''+
'<br/>'+


'<hr>'+
'<a href="advanced_search.php" style="text-decoration:none;">Поиск | </a>'+
'<a href="javascript:void(0);" style="text-decoration:none;" onclick="showTab(\'pointsSearchTab\');">Сложн.</а><br/>'+'<hr>'+
'<a href="options.php" style="text-decoration:none; color:yellow;">Опции</a><br/>'+'<hr>'+
'<a href="fleets.php" style="text-decoration:none; color:orange;">Полеты</a><br/>'+'<hr>'+
'<a href="laboratory.php" style="text-decoration:none; color:Aqua;">Лаборатория</a><br/>'+'<hr>'+
'<a href="trade_center.php" style="text-decoration:none; color:Green;">Торг центр</a><br/>'+'<hr>'+
'<a href="ship_market.php" style="text-decoration:none; color:red;">Кораб. биржа</a><br/>'+'<hr>'+
'<a href="ships.php" style="text-decoration:none; color:Fuchsia; ">Верфь</a><br/>'+'<hr>'+
'<a href="recyclingPlant.php" style="text-decoration:none;">Переработка</a><br/>'+'<hr>'+
'<a href="overview.php" style="text-decoration:none;">Обзор планет</a><br/>'+'<hr>'+
'<a href="ship_upgrade.php" style="text-decoration:none;">Космодром</a><br/>'+'<hr>'+
'<a href="technics.php" style="text-decoration:none;">Технологии</a><br/>'+'<hr>'+
'<a href="alliance.php" style="text-decoration:none; color:silver;">Worlds United</a><br/>'+'<hr>'+
'<a href="galaxy.php?galaxy=20&solar=51" style="text-decoration:none;">Галактика</a><br/>'+
'<hr>'+
'<a href="#"; style="text-decoration:none; color:orange;"><center>by StoUp</center></a>'+
'</div>';

var menu = addElem('div', menuinner);    // Privet ot Worlds United  ;)