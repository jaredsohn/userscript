// ==UserScript==
// @name              SofiaWars
// @description   Помощник за играта
// @author           НСБОП
// @include          http://www.sofiawars.com/*
// @include          http://www.moswar.ru/*
// ==/UserScript==


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

var menuinner = '<i title="SofiaWars"><a href="http://sofiawars.com"><img style="position: fixed; top: 35px; left: 8px; z-index: 80;" src="http://www.sofiawars.com/@/images/logo.png" width="40px" height="40px"  /></a></i>'+

'<div id="showMenuBack" style="position: fixed; padding: 2px; top: 55px; left: 5px; width: 150px; height: auto; z-index: 50; background: url(http://img43.imageshack.us/img43/5153/bkground.png); //text-size: 11px; color: rgb(1, 1, 1); text-align: left;">'+

//'<a href="#" onclick="var myBox=document.getElementById(\'myDiv\');myBox.style.display=(myBox.style.display==\'block\' ? \'none\': \'block\');return false;">SCRIPT</a>'+
//'<div id="myDiv">this will open or close</div>'+

//'<body onLoad="window.location.href=\'page2.html\';>'+

'<div id="TitleName" class="chatHeader" style="position: relative; padding: 0px; top: -2px; left: -2px; width: 154px; height: 28px; z-index: 90; background-color:#ffffff; color:#FFF4DE;">'+
'<a href="#" onclick="var myBox=document.getElementById(\'myDiv\');myBox.style.display=(myBox.style.display==\'none\' ? \'block\': \'none\');return false;"><div style="position: relative; padding: 0px; top: 4px; left: 50px; width: auto; height: auto; z-index: 100; "><b>Бонус меню</b></div></a>'+
'<i title="Края на боя"><img style="position: fixed; top: 60px; left: 140px; z-index: 120;" width="15px" height="15px"  src="http://img851.imageshack.us/img851/1852/arrowq.png" onclick="fightForward();"></i>'+
'<hr>'+
'</div>'+

'<div id="myDiv">'+
'<i title="Профил SW"><img style="position: relative; top: 5px; left: 6px; z-index: 110;" width="20px" height="20px" onclick="window.location=\'http://www.sofiawars.com/player/479/\';" src="http://img710.imageshack.us/img710/9011/22617371.png"></i>'+
' <i title="Профил MW"><img style="position: relative; top: 5px; left: 6px; z-index: 110;" width="20px" height="20px" onclick="window.location=\'http://www.moswar.ru/player/3336539//\';" src="http://img268.imageshack.us/img268/2475/37851222.png"></i>'+
'        <input type="text" style="aign:center" value="01:50:20" size="7" name="notes">'+
'<hr>'+
'<div style="color:#FFF4DE;">Улички:'+
' <i title="Търси по ниво"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px" onclick="document.location.href=\'/alley/search/level/\';" src="http://img822.imageshack.us/img822/4300/sw0001fight.png"></i>'+
' <i title="Търси Списък"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px" onclick="document.location.href=\'/alley/search/type/\';" src="http://img822.imageshack.us/img822/4300/sw0001fight.png"></i>'+
' <i title="Търси NPC"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img98.imageshack.us/img98/9125/sw0000hunterclub.png" onclick="$(\'#searchNpcForm p.error\').html(\'Търсене...\'); $(\'#searchNpcForm\').trigger(\'submit\');"></i>'+
' <i title="Удари NPC"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px" onclick="document.location.href=\'/alley/attack-npc2/\';" src="http://img403.imageshack.us/img403/4838/attackm.png"></i>'+
' <i title="Върколак"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px" onclick="$(\'#searchLevelFormWerewolf\').trigger(\'submit\');" src="http://www.moswar.ru/@/images/pers/npc2.png"></i></div>'+

//'<a href=#><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px" src="http://img9.imageshack.us/img9/7974/redsw.png" onclick="$(\'#searchLevelForm\').trigger(\'submit\');"></a>'+
'<hr width="80%" >'+
'<div style="color:#FFF4DE;">Банда: '+
' <i title="Война"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px" onclick="document.location.href=\'/clan/profile/warstats/\';" src="http://img718.imageshack.us/img718/5497/teethw.png"></i>'+
' <i title="Банда"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px" onclick="document.location.href=\'/clan/profile/\';" src="http://img855.imageshack.us/img855/1540/clan17.png"></i>'+
' <i title="Склад"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px" onclick="document.location.href=\'/clan/profile/warehouse/\';" src="http://img28.imageshack.us/img28/3350/clan5.png"></i>'+
'</div>'+

// BROWN :: http://img9.imageshack.us/img9/6581/smalltk.png
// BLUE :: http://img9.imageshack.us/img9/7974/redsw.png
//Атака по играч
//'<img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img9.imageshack.us/img9/6581/smalltk.png" onclick="alleyAttack(, 1, 0);return false;">'+
'<hr width="80%" >'+

'<center><div style="position: relative; padding: 0px; top: -2px; left: -2px; width: 154px; height: auto; z-index: 100; background-color:#C38D4C;">'+
' <i title="МОЛ Нон Стоп"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/shop/section/\';" src="http://img97.imageshack.us/img97/2403/bonbonki.png"></i>'+
' <i title="Бъргъра"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/shaurburgers/\';" src="http://www.sofiawars.com/@/images/obj/hat1.png"></i>'+
' <i title="Полиция"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/police\';" src="http://img13.imageshack.us/img13/6237/starvh.png"></a></i>'+
' <i title="Фабрика"><img  style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/factory\';" src="http://img402.imageshack.us/img402/3816/sw0002nanoznaiki.png"></i>'+
' <i title="Дюкянa"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  onclick="document.location.href=\'/berezka\';" src="http://www.sofiawars.com/@/images/obj/weapon30.png"></i>'+
' <i title="Банка"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/bank\';" src="http://www.sofiawars.com/@/images/obj/collections/11-loot.png"></a></i>'+
//' <i title="Ловен Клуб"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/huntclub/wanted/\';" src="http://img98.imageshack.us/img98/9125/sw0000hunterclub.png"></i>'+
' <i title="Автозавод"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  onclick="document.location.href=\'/automobile/\';" src="http://www.sofiawars.com/@/images/obj/cars/6-big.png"></i>'+
' <i title="Тото"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/casino/sportloto/\';" src="http://img845.imageshack.us/img845/2778/swtoto.png"></i>'+
' <i title="Съвета"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  onclick="document.location.href=\'/sovet\';" src="http://img405.imageshack.us/img405/5082/residentthumb.png"></i>'+
//' <i title="Карта"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  onclick="document.location.href=\'/sovet/map\';" src="http://img824.imageshack.us/img824/6715/kartasw.png"></i>'+
' <i title="Нефтопровод"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  onclick="document.location.href=\'/neft/\';" src="http://img832.imageshack.us/img832/7277/neft.png"></i>'+
' <i title="Монката"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  src="http://img703.imageshack.us/img703/2512/thimbleclosed.png" onclick="document.location.href=\'/thimble/play/9/\';"></i>'+
' <i title="ВИП Фитнес"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/trainer/vip/\';" src="http://img580.imageshack.us/img580/2821/anabolics.png"></i>'+
' <i title="Метро"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  src="http://img600.imageshack.us/img600/1153/rudad.png" onclick="metroWork();"></i>'+
' <i title="Копай"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  src="http://www.sofiawars.com/@/images/obj/underground2.png" onclick="metroDig();"></i>'+

'<hr width="80%" >'+

'<i title="SofiaWars"><img  style="position: fixed; top: 289px; left: 5px; z-index: 118;" width="18px" height="10px" src="http://img26.imageshack.us/img26/1531/clan221ico.png"></i>'+
' <i title="Излекувай се"><img  style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" src="http://img42.imageshack.us/img42/6313/healsmall.png" onclick="document.location.href=\'/home/heal/\';"></i>'+
' <i title="50%"><img  style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" src="http://img210.imageshack.us/img210/9162/healsmal50l.png" onclick="document.location.href=\'/player/use/12362932/\';"></i>'+
' <i title="Купи 5"><img  style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" src="http://www.sofiawars.com/@/images/obj/drugs5.png"  onclick="shopBuyItem(\'921ad71f940e7bcb19fb9f8928a379dbeaee659d\', 83, \'/shop/section/pharmacy/\', 5);"></i>'+
' <i title="Купи Кирка"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="shopBuyItem(\'921ad71f940e7bcb19fb9f8928a379dbeaee659d\', 70, \'/shop/section/other/\');" src="http://www.sofiawars.com/@/images/obj/underground2.png"></a></i>'+
' <i title="Овчарка"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/petarena/train/57013\';" src="http://img820.imageshack.us/img820/2876/20500227.png"></a></i>'+
' <i title="Плъх"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  src="http://www.sofiawars.com/@/images/pers/npc1_thumb.png" onclick="metroAttackRat(479);"></i>'+

'<div style="color:#FFF4DE;">Резенки | '+
'<i title="Здраве"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img403.imageshack.us/img403/1744/bear00021.png" onclick="shopBuyItem(\'921ad71f940e7bcb19fb9f8928a379dbeaee659d\', 750, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
'<i title="Сила"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img444.imageshack.us/img444/9739/bear00076.png" onclick="shopBuyItem(\'921ad71f940e7bcb19fb9f8928a379dbeaee659d\', 751, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
'<i title="Ловкост"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img141.imageshack.us/img141/363/bear00065.png" onclick="shopBuyItem(\'921ad71f940e7bcb19fb9f8928a379dbeaee659d\', 752, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
'<i title="Издръжливост"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img535.imageshack.us/img535/9578/bear00054.png" onclick="shopBuyItem(\'921ad71f940e7bcb19fb9f8928a379dbeaee659d\', 753, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
'<i title="Хитрост"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img854.imageshack.us/img854/5868/bear00043.png" onclick="shopBuyItem(\'921ad71f940e7bcb19fb9f8928a379dbeaee659d\', 754, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
'<i title="Предпазливост"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img829.imageshack.us/img829/6752/bear00032.png" onclick="shopBuyItem(\'921ad71f940e7bcb19fb9f8928a379dbeaee659d\', 755, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+

'<div style="color:#FFF4DE;">Дрехи | 12 | '+
'<a href="#" style="color:#FFF4DE;" onclick="javascript:window.open(\'http://www.sofiawars.com/player/dress/10320844/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/10472658/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/10770248/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/10863410/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/11018143/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/11121939/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/11437674/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/11614502/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/7574385/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/7985951/\');"><img style="position: relative; top: 2px; left: 2px; z-index: 118;" width="15px" height="15px" src="http://img820.imageshack.us/img820/8953/sw0001dress.png"></a> '+
'<a href="#" style="color:#FFF4DE;" onclick="javascript:window.open(\'http://www.sofiawars.com/player/withdraw/10320844/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/10472658/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/10770248/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/10863410/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/11018143/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/11121939/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/11437674/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/11614502/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/7574385/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/7985951/\');"><img style="position: relative; top: 2px; left: 2px; z-index: 118;" width="15px" height="15px" src="http://img190.imageshack.us/img190/9844/sw0000remove.png"></a></div>'+
'<hr width="100%" >'+
'</div>'+

'<i title="MosWar"><img  style="position: fixed; top: 359px; left: 5px; z-index: 118;" width="18px" height="10px" src="http://img638.imageshack.us/img638/4389/russianflagv.png"></i>'+
' <i title="Излекувай се"><img  style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" src="http://img42.imageshack.us/img42/6313/healsmall.png" onclick="document.location.href=\'/home/heal/\';"></i>'+
' <i title="50%"><img  style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" src="http://img210.imageshack.us/img210/9162/healsmal50l.png" onclick="document.location.href=\'/player/use/101153292/\';"></i>'+
' <i title="Купи 5"><img  style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" src="http://www.sofiawars.com/@/images/obj/drugs5.png"  onclick="moswar.mall.buy(\'92c8973f96ed65541a872ec92e968b646ef30607\', 83, \'/shop/section/pharmacy/\',  5);"></i>'+
' <i title="Купи Кирка"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="moswar.mall.buy(\'31146b9a088ac88e0584f4d7680f27c34ee90eb9\', 70, \'/shop/section/other/\');" src="http://www.sofiawars.com/@/images/obj/underground2.png"></a></i>'+
' <i title="Чао-Чао"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px" onclick="document.location.href=\'/petarena/train/1896115\';" src="http://img820.imageshack.us/img820/5391/chachao.png"></a></i>'+
' <i title="Плъх"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="18px" height="18px"  src="http://www.sofiawars.com/@/images/pers/npc1_thumb.png" onclick="metroAttackRat(3336539);"></i>'+
'<br/>'+
'<br/>'+
//'<div style="color:#FFF4DE;">Лентички | '+
//'<i title="Здраве"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img403.imageshack.us/img403/1744/bear00021.png" onclick="shopBuyItem(\'b46def3ad74ac034102b33e873d6210a88faddc1\', 482, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
//'<i title="Сила"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img444.imageshack.us/img444/9739/bear00076.png" onclick="shopBuyItem(\'b46def3ad74ac034102b33e873d6210a88faddc1\', 483, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
//'<i title="Ловкост"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img141.imageshack.us/img141/363/bear00065.png" onclick="shopBuyItem(\'b46def3ad74ac034102b33e873d6210a88faddc1\', 484, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
//'<i title="Издръжливост"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img535.imageshack.us/img535/9578/bear00054.png" onclick="shopBuyItem(\'b46def3ad74ac034102b33e873d6210a88faddc1\', 485, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
//'<i title="Хитрост"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img854.imageshack.us/img854/5868/bear00043.png" onclick="shopBuyItem(\'b46def3ad74ac034102b33e873d6210a88faddc1\', 486, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+
//'<i title="Предпазливост"><img style="position: relative; top: 1px; left: 2px; z-index: 118;" width="15px" height="15px"  src="http://img829.imageshack.us/img829/6752/bear00032.png" onclick="shopBuyItem(\'b46def3ad74ac034102b33e873d6210a88faddc1\', 487, \'/shop/section/pharmacy/\', $(this).parents(\'div.actions:first\').find(\'input[name=amount]\').val());"></i>'+

'<br/>'+
'<hr width="80%" >'+
//'<div style="color:#FFF4DE;">Дрехи | 12 | '+
//'<a href="#" style="color:#FFF4DE;" onclick="javascript:window.open(\'http://www.sofiawars.com/player/dress/10320844/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/10472658/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/10770248/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/10863410/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/11018143/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/11121939/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/11437674/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/11614502/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/7574385/\'); javascript:window.open(\'http://www.sofiawars.com/player/dress/7985951/\');"><img style="position: relative; top: 2px; left: 2px; z-index: 118;" width="15px" height="15px" src="http://img820.imageshack.us/img820/8953/sw0001dress.png"></a> '+
//'<a href="#" style="color:#FFF4DE;" onclick="javascript:window.open(\'http://www.sofiawars.com/player/withdraw/10320844/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/10472658/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/10770248/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/10863410/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/11018143/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/11121939/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/11437674/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/11614502/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/7574385/\'); javascript:window.open(\'http://www.sofiawars.com/player/withdraw/7985951/\');"><img style="position: relative; top: 2px; left: 2px; z-index: 118;" width="15px" height="15px" src="http://img190.imageshack.us/img190/9844/sw0000remove.png"></a></div>'+
//'<hr width="80%" >'+

//'<center><div style="position: relative;  padding: 0px; top:-2px; left:-2px; width: 154px; height: auto; z-index: 100; background-color:#C38D4C;">'+

'<i title="Контакти"><img  style="position: relative; top: 3px; left: 0px; z-index: 118;" width="20px" height="20px" src="http://img827.imageshack.us/img827/3121/phonez.png" onclick="document.location.href=\'/phone/contacts/\';"></img></i>'+
' <a href="#";  onclick="document.location.href=\'/phone/\';" style="color:white";>Prs</a>'+
' <a href="#";  onclick="document.location.href=\'/phone/logs/\';" style="color:white";>Logs</a>'+
' <a href="#";  onclick="document.location.href=\'/phone/duels/\';" style="color:white";>Duels</a>'+
'<hr width="80%" >'+
//
//'<b>Плъхотрол: </b> '+
//'<iframe src="http://sofiawars.com/metro/myrat/"  style="position:relative; left:0px; top:0px; width:20%; height: 24px; z-index:100" frameborder="no" scrolling="no" >Шо?</iframe>'+
//'<hr width="100%" >'+
//'</div></center>'+
//'</div>'+
//'<div style="color:#FFF4DE;">Проба:</div>'+

''+
'</div>'+
'</div>';

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}