// ==UserScript==
// @name        Map Maker +
// @description 
// @namespace	Yashkin Kot
// @include		http://*google.com/mapmaker*
// @include		http://*google.com.ua/mapmaker*
// @include		https://*google.com/mapmaker*
// @include		https://*google.com.ua/mapmaker*
// @version		1.10
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant		none
// ==/UserScript==
//http://userscripts.org/scripts/source/163747.user.js

	var cs=document.createElement('link');
	cs.href="https://sites.google.com/site/gmmtesting2013/files/style.css";
        cs.type="text/css"
        cs.rel="stylesheet";
	document.getElementsByTagName('head')[0].appendChild(cs);


//$("#topbar").remove();
$(".message-bar-container").css('top','80px');
$(".message-bar-container").css('z-index','999');
$("#kd-browse-line-features").text("Лінійні об'єкти");
$(".release-announcement").css('display','block');
$("#help-menubutton").parent().css('display','block');
var forumLink = '<li class="goog-menuitem" role="menuitem" style="-webkit-user-select: none; " id=":19"><div class="goog-menuitem-content" style="-webkit-user-select: none; "><a target="_blank" href="https://groups.google.com/forum/#!forum/mapmaker-ukraine" style="-webkit-user-select: none; "><b>Український форум</b></a></div></li><li class="goog-menuitem" role="menuitem" style="-webkit-user-select: none; " id=":19"><div class="goog-menuitem-content" style="-webkit-user-select: none; "><a target="_blank" href="https://plus.google.com/communities/100914615034753676064" style="-webkit-user-select: none; "><b>Спільнота в Google+</b</a></div></li>';
$("#gw-labs-link").next().css('display','none').after(forumLink);


var help_link = '<li class="goog-menuitem" id="gw-nav-bar-help_uk"><div class="goog-menuitem-content"> <a href="https://sites.google.com/site/mapmakerukraine/guide" target="_blank"> <div class="item-icon"> <img src="/mapmaker/mapfiles/transparent.png" class="SPRITE_help_icon"> </div> <span>Керівництво користувача</span> </a> </div></li>';
$("#guidedhelp-navbar").after(help_link);


var help_button = '<ul id="menu"><li><div id="help_button" class="pointer_cursor goog-inline-block hasMaxWidth jfk-button jfk-button-standard kd-toolbar-last-button" style="position:relative;padding-right: 20px;" >Довідка</div><div style="position: absolute;top: 16px;left: 42px;font-size: 11px;font-weight: bold;color: red;">new</div><div class="goog-inline-block goog-flat-menu-button-dropdown" style="margin: 0 10px 0 0">&nbsp;</div>';
help_button = help_button +'<div class="dropdown_1"><div class="goog-inline-block goog-flat-menu-button-dropdown" style="left: 5px;top: 14px;">&nbsp;</div><div dir="ltr" style="padding-left: 15px;position: absolute;"><a href="http://goo.gl/qWbCj"  target="_blanck">Посібник картрграфа</a></div><ul>';
// Розділ 1. Огляд Map Maker
help_button = help_button +'<li id="about"><div style="200px"><a href="http://goo.gl/qWbCj"  target="_blanck">1. Огляд Map Maker</a></div><div class="info1"><a href="http://goo.gl/xRMtE"  target="_blanck">Галерея Map Maker</a> <br /><a href="http://goo.gl/dxpAM"  target="_blanck">Країни та регіони, доступні для картографування</a> <br /><a href="http://goo.gl/sDCy5"  target="_blanck">Системні вимоги</a> <br /><a href="http://goo.gl/bqoJP"  target="_blanck">Що нового</a> <br /><a href="http://goo.gl/EFQD0"  target="_blanck">Що таке Google Map Maker?</a> </div></li>';
// Розділ 2. Дороги, залізниці, річки
help_button = help_button +'<li id="lines"><div><a href="http://goo.gl/Elr5Z"  target="_blanck">2. Дороги, залізниці, річки</a></div><div class="info2"><a href="http://goo.gl/TtJfh"  target="_blanck">2.1. Автодороги</a><div  style="padding-left:25px"><a href="http://goo.gl/LfCKL"  target="_blanck">2.1.1. Створення дороги</a> <a href="http://goo.gl/8iZq6"  target="_blanck">2.1.6. Назви доріг, вулиць, магістралей</a> <a href="http://goo.gl/ykRgs"  target="_blanck"><br />2.1.7. Атрибути дороги</a> <br /><a href="http://goo.gl/1ZmLP"  target="_blanck">2.1.8. Класифікація доріг, пріоритети</a> </div><a href="http://goo.gl/1ZmLP"   target="_blanck">2.3. Залізниці</a><div style="padding-left:25px">  <a href="http://goo.gl/bNQ7t"  target="_blanck" >2.3.1. Українські залізничні системи</a> <a href="http://goo.gl/JwXdf"  target="_blanck"><br />2.3.2. Позначення залізниць на карті</a> <a href="http://goo.gl/Ytbif"  target="_blanck"><br />2.3.3. Атрибути залізниць</a> <br /><a href="http://goo.gl/8i6cR"  target="_blanck">2.3.4. Залізничний переїзд та залізничний міст</a></div><a href="http://goo.gl/dKMxG" target="_blanck">2.5. Перетин</a><div style="padding-left:25px"><a href="http://goo.gl/wibd0" target="_blanck" target="_blanck">2.5.1. Редагування перетинів</a></br><a href="http://goo.gl/2Uo3L" target="_blanck">2.5.2. Редагування заборони поворотів</a></br><a href="http://goo.gl/T8Ldq" target="_blanck">2.5.3. Редагування дорожніх знаків</a></br><a href="http://goo.gl/K9vqv" target="_blanck">2.5.4. Видалення перетинів</a></br><a href="" target="_blanck"></a></br><a href="http://goo.gl/67n6w" target="_blanck">2.5.5. Основні помилки та варіанти вирішення</a></br> </div></div></li>';
// Розділ 3. Будівлі
help_button = help_button +'<li id="building"><div ><a href="http://goo.gl/tv6gS" target="_blanck">3. Будівлі</a></div><div class="info3">  <a href="http://goo.gl/7NhNZ" target="_blanck">3.1. Створення контуру будівлі</a> <a href="http://goo.gl/W6sqE" target="_blanck"><br />3.2. Редагування будівлі</a> <br /><a href="http://goo.gl/DQ3MV" target="_blanck">3.3. Типи будівель</a> <a href="http://goo.gl/3axXl" target="_blanck"><br />3.4. Адреса будівлі</a> <a href="http://goo.gl/y3ugN" target="_blanck"><br />3.5. Атрибути будівлі</a> <a href="http://goo.gl/bGZhL" target="_blanck"><br />3.6. Будівлі 2.5D</a> <br /><a href="http://goo.gl/pJi5I" target="_blanck">3.7. Номер будинку на карті. Об`єкт «Address»</a> <a href="http://goo.gl/86lIQ" target="_blanck"><br />3.8. Основні помилки</a></div></li>';
// Розділ 4. Території
help_button = help_button +'<li id="boundary"><div><a href="http://goo.gl/O9VQT"  target="_blanck">4. Території</a></div><div class="info4">Довідка ще не написана</div></li>';
// Розділ 5. Місця, бізнес-обєкти
help_button = help_button +'<li id="places"><div><a href="http://goo.gl/yU4B5"  target="_blanck">5. Місця, бізнес-обєкти</a></div><div class="info5"><a href="http://goo.gl/bx3xH" target="_blanck">Місця</a> <a href="http://goo.gl/IadbK" target="_blanck"><br />Навчальні заклади</a>  </div></li>';
// Розділ 6. Маршрути
help_button = help_button +'<li class=""><div><a href="http://goo.gl/ocBKN"  target="_blanck">6. Маршрути</a></div><div class="info4">Довідка ще не написана</div></li>';
// Розділ 7. Модерація та затвердження
help_button = help_button +'<li><div><a href="http://goo.gl/kOhnN" target="_blanck">7. Модерація та затвердження</a></div><div class="info7">  <a href="http://goo.gl/c07ac" target="_blanck">Поради рецензетам</a> <a href="http://goo.gl/SjN3v" target="_blanck"><br />Шаблони рецензій</a></div></li>';
// Розділ 8. Словник
help_button = help_button +'<li class=""><div><a href="http://goo.gl/TAzsr"  target="_blanck">8. Словник</a>,<br></div></li><li><div style="font-size: 11px;font-weight: bold;color: red;">new</div>22.06.2013 Поправив лінки, поповнив меню розділом <a href="http://goo.gl/dKMxG" target="_blanck">2.5. Перетин</a></li></ul></li>   </div></li> </ul> ';
$("#settings-menubutton").before(help_button);


// ==Активація Enter на синю кнопку ==
// name        Map Maker - Enter clicks blue button
// description Pressing Enter key clicks the last blue (submit/save/next) button visible on the page
// namespace	bozar
$(document).bind("keydown", bindHotkey2);
function bindHotkey2(e){  
    if(e.keyCode == 13){      
        e.preventDefault();
        var b = $(".kd-button-submit:visible");           
        //console.log(b.length + " buttons found. clicking last!");
        b.last().click();     
    }
}

// ==Активація Delete для видалення точок дороги ==
// name        Map Maker "delete point" hotkey
// description Allows quick removal of selected point in the line or shape. Just right click the point and press DELETE. 
// namespace	bozar
// menu item search routine
$("#map").bind("contextmenu",function(e){
	var intervalID;
	var found = false;
	intervalID = setInterval(function(){
	// console.log("timeout elapsed");
	if(found) return;
		var item = $(".menuitem[cad='src:gw-contextmenu-findfeature']").parent().children().first();
		if(item.length == 1){
			found = true;
			// console.log("menu item found");
			$(document).bind("keydown", bindHotkey);
			// console.log("hotkey bound");
			clearInterval(intervalID);
		}
	}, 50);
});
// console.log("mouse event bound");

// handler for the delete key
function bindHotkey(e){
	// console.log("key pressed: " + e.keyCode);
	if(e.keyCode == 46){
		$(".menuitem[cad='src:gw-contextmenu-findfeature']").parent().children().first().click();
		// console.log("target clicked");
	}
	$(document).unbind("keydown", bindHotkey);
	// console.log("hotkey unbound");
}
   
// ==Активація Space key  ==
$(document).keypress(keypress);

function keypress(e){
    //console.log(e.charCode);
    if(e.charCode == 32){    	
        var type = document.activeElement.nodeName;        
        if(type == "BODY"){                      
            if( $("#maptypenormal:visible").length == 1 ){
                $("#maptypenormal").click();                
            }else if( $("#maptypehybrid:visible").length == 1 ){
                $("#maptypehybrid").click();                
            }
        }        
    }    
}