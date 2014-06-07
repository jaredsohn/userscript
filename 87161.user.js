// ==UserScript==
// @name           TraviansBar
// @namespace      http://
// @description    Based on the TravianerBarPlusPlus from Sulla (http://userscripts.org/scripts/show/36743). Adds a nice toolbar to the Travians or Travianer game.
// @version        20100330a
// @include        http://www.travianer.ae/game.php*
// @include        http://travianer.ae/game.php*
// @include        http://master.travianer.ae/game.php*
// @include        http://www.travians.ae/game.php*
// @include        http://travians.ae/game.php*
// @include        http://master.travians.ae/game.php*




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
'width:623px; height:361px; '+
'}')



var menuinner = '<img style="position: absolute; top: 6px; left: 10px; z-index: 98;" src="img/icons/supporticon_rules.gif" width="17px" height="17px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Open Tool / Close\');" id="addOnMinimizer"/>'+
'<div style="display: none; position: absolute; padding: 2px; top: 2px; left: 5px; width: 200px; height: auto; z-index: 1; background: url(img/chatbg.jpg); text-size: 11px; color: rgb(114, 57, 0); text-align: left;" id="interfaceDivAddOn">'+
'<div id="TitleName" class="chatHeader" style="width: 194px;">TraviansBar</div>'+
'<b>:اذهب الى</b><br/>'+
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;">مـنـزلـي</a> | '+
'<a onclick="xajax_click(6174, 5168, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">مـنـازل الـتـحـالـفـات</a> | '+
'<a onclick="xajax_click(5898, 5313, 6015, 5414, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">سـاحـة الـتـحـالـف</a> | '+
'<a onclick="xajax_click(7022, 4905, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">سـيـنـكـل</a> | '+
'<a onclick="xajax_click(7590, 5223, 7542, 5322, \'fight<<\', BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr); return false;">الـقـتـال</a> | '+
'<a onclick="xajax_click(4328, 7003, 4349, 7038, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">الـبـنـك</a> | '+
'<a onclick="xajax_click(6886, 5311, 6808, 5133, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">الـسـوق</a> | '+
'<a onclick="xajax_click(5028, 6503, 5049, 6538, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">ستان</a> | '+
'<a onclick="xajax_click(9421, 4417, 9329, 4707, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">لومبيك</a> | '+
'<a onclick="xajax_click(10413, 6880, 10315, 6985, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">اويلالي</a> | '+
'<a onclick="xajax_click(8196, 4751, 7876, 4781, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">ماتريشا</a><br/>'+
'<a onclick="xajax_click(9721, 4417, 9729, 4707, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">بـلاد الـجـرمـان</a> | '+
'<a onclick="xajax_click(5028, 5703, 5049, 5738, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">الـمـنـطـقـة الـمـحـرمـة</a><br/>'+
'<hr>'+
'<b>:مواقع العمل</b><br/>'+
'<a onclick="xajax_click(5928, 4603, 5949, 4638, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">منجم المعدن-1</a> | '+
'<a onclick="xajax_click(9528, 5503, 9549, 5538, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">حافر الطين-2</a> | '+
'<a onclick="xajax_click(9528, 6003, 9549, 6038, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">صانع الفحم-2</a> | '+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">منتج الحديد -2</a><br/>'+
'<hr>'+
'<b>:اخرى</b><br/>'+
'<a onclick="xajax_click(6586, 5811, 6508, 5633, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">زهـرة بـريـة</a> | '+
'<a onclick="xajax_click(9913, 7120, 9815, 7195, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">بـيـع الجـرع</a> | '+
'<a onclick="xajax_click(8903, 7550, 8945, 7655, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">يـوري</a> | '+
'<a onclick="xajax_click(8203, 7350, 8245, 7455, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">بـلاد الـرومـان</a> | '+
'<a onclick="xajax_click(5028, 7003, 5049, 7038, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">بـلاد الـغـال</a> | '+
'<a onclick="xajax_click(5728, 4603, 5749, 4638, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">المـنـطـقـه المحـرمـه</a><br/> '+
'<hr>'+
'<b>مناطق</b><br/>'+
'<a onclick="xajax_click(6271, 5260, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">التحالف</a> | '+
'<a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">الخربة</a> | '+
'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">جمع الفطر</a> | '+
'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">حدود الجرمان</a> | '+
'<a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">الكنز</a> | '+
'<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">ايسولده</a> | '+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">الحداد الثاني</a> | '+
'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">سيجلندي</a> | '+
'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">النجار الثاني</a> | '+
'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; ">الطوب الثاني</a><br/>'+
'<hr>'+
'<b>:السوق</b><br/>'+
'<a class=info href="http://www.pflock.de/travianer/npc/alle.txt">NPC-Preise<span></span></a><br/>'+
//'<div id="npc"><a href="http://www.pflock.de/travianer/npc/alle.txt">NPC-Preise</a></div><br/>'+
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;">فـتـح نـافـذة الـسـوق</a>'+
'<hr>'+
// Für die Einlagerung
//'<b>Einlagerung:</b><br/>'+
//'Sozialpunkte <img src="../img/res/social.gif"><br/>' +
//'Primär <img src="../img/res/wood.gif"><img src="../img/res/clay.gif"><img src="../img/res/ore.gif"><img src="../img/res/corn.gif">'+
//'Sekundär <img src="../img/res/flour.gif"><br/><img src="../img/res/coal.gif"><img src="../img/res/board.gif"><img src="../img/res/brick.gif"><img src="../img/res/iron.gif"><img src="../img/res/bread.gif"></b>'+
//'<hr>'+
'<b>:جـرعـات</b><br/>'+
'تـنـيـن+تـنـيـن = احـمـر(حياة)<br/>'+
'تـنـيـن+غـزال = اصـفـر(ضـرر)<br/>'+
'غـزال+تـنـيـن = سـمـاوي(نقاط)<br/>'+
'غـزال+غـزال = بـنـفـسـجـي(دفاع)<br/>'+
'<hr>'+
'<b>:روابط</b><br/>'+

'<a href="http://www.travianer.ae/vbb/forum.php">مـنـتـدى تـريـفـيـانـر </a>'+
'</div>';

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}