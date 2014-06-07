// The West Fullscreen with Added GUI Buttons
// version 1.00 BETA
// Copyright (C) 2010 Peter Ward (x.peter.ward.x@gmail.com)
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
// Modified by Dariusz Szyndler (Darius II) & JohnCooper
// Translated by JohnCooper
// Version Beta
//
// --------------------------------------------------------------------

// ==UserScript==
// @name			The-West Full Ekran (procrafter)
// @namespace		www.the-west.org
// @description		Oyun ekranını büyütür, ayrıca şehir binalarına daha kolay erişim için tuşlar ekler.
// @include			http://*.the-west.*/game.php*
// @version                     1.00 Beta
// ==/UserScript==

function getMoCheckVersion() {
	return "1.10";
}

function getAuthor() {
	var hrefStr = '';
	switch(window.location.hostname.substr(0,window.location.hostname.search(/\./))) {
		case 'tr1':
			hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:38340},\'38340\');';
			win_op = '';
			break;
		default:
			hrefStr = 'http://userscripts.org/users/202825';
			win_op = 'target=\'_blank\'';
	}
	return '&nbsp;Çeviren: <a href=\"' + hrefStr + '\" style=\"color:black\"' + win_op + '>JohnCooper</a>';
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var $=unsafeWindow.$;
var $$=unsafeWindow.$$;

var enable_weststats = false;
var enable_westinsider = false;
var enable_westcalc = false;
var enable_fortsmaps = false;
var enable_westforts = true;

var ac_world = window.location.hostname.substr(0,window.location.hostname.search(/\./));



/***** Mapy fortów *****/
if ( enable_fortsmaps ) {
	var fortsmaps_link = document.createElement("div");
	fortsmaps_link.id = "fortsmaps_link";
	fortsmaps_link.innerHTML = "<a id=\"TWF_fortsmaps_link\" href=\"http://student.agh.edu.pl/~mkrupa/dallas_live/maps.html\" onClick=\"\" target=\"_blank\"></a>";
}

/***** Statystyki bitew *****/
if ( enable_westforts ) {
	var westforts_link = document.createElement("div");
	westforts_link.id = "westforts_link";
	westforts_link.innerHTML = "<a id=\"TWF_westforts_link\" href=\"http://www.westforts.com/"+ac_world+"/battles\" onClick=\"\" target=\"_blank\"></a>";
}

/***** New buttons *****/
var menu_settings = document.getElementById('menu_settings');
if (menu_settings) {
	if ( enable_fortsmaps ) {
		menu_settings.parentNode.insertBefore(fortsmaps_link, menu_settings.nextSibling);
	}
	if ( enable_westforts ) {
		menu_settings.parentNode.insertBefore(westforts_link, menu_settings.nextSibling);
	}
};


// GUI Hacks
addGlobalStyle('body {padding:0; width:100%; height:100%; overflow:hidden;}');
addGlobalStyle('#fade_div {width:100%; height:100%;}');
addGlobalStyle('#main_container {width:100%; position:absolute; height:100%; margin:0; top:0; left:0; background:none; padding:0; z-index:auto;}');
addGlobalStyle('#footer {width:100%; position:absolute; margin:0; top:0px; left:0; z-index:5;}');
addGlobalStyle('#footer_menu_left {z-index:6;}');
addGlobalStyle('#footer_menu_right {z-index:6;}');
addGlobalStyle('#head_container {width:100%; padding:0px; background:none;}');
addGlobalStyle('#head_background {width:100%; position:absolute; height:auto; z-index:4; background:transparent;}');
addGlobalStyle('#border_cap { position:absolute; background:transparent; left:50%; width:400px; margin-left:-200px; height:27px; z-index:6; padding:0; top:11px; font-size:1px; display:none; }');
addGlobalStyle('#abdorments {display:none;}');
addGlobalStyle('#left_menu {left:-20px; top:-15px; z-index:13; background:transparent;}');
addGlobalStyle('#right_menu {right:-20px; top:-15px; z-index:13; background:transparent;}');
addGlobalStyle('#menus {z-index:12;}');
addGlobalStyle('#map_scroll_bottom {left:50%; margin-left:-10px; bottom:0px; top:auto; z-index:7; position:absolute;}');
addGlobalStyle('#map_scroll_top {left:50%; margin-left:-10px; top:0px; z-index:7; position:absolute;}'); // top:130;
addGlobalStyle('#map_scroll_left {left:0; top:0px; z-index:7; position:absolute;}');
addGlobalStyle('#map_scroll_right {right:0; top:0px; z-index:7; position:absolute;}');
addGlobalStyle('#window_bar {z-index:6; width:auto; bottom:0px; left:0px; margin:0px; height:100%; position:absolute;}');
addGlobalStyle('#forum_list {margin-top:10px;}');
addGlobalStyle('.bottomleftcurve, .bottomrightcurve{display:none; top: 0px; height:0px;');
addGlobalStyle('#shadow_left_top, #shadow_right_top,#shadow_right_wing,#shadow_left_wing,#shadow_right_wing_bottom,#shadow_left_wing_bottom,#shadow_left_corner,#shadow_right_corner { background:transparent; position:absolute; }');
addGlobalStyle('#shadow_left_side,#shadow_right_side { background:transparent; position:absolute; top:0px; width:110px; height:1px; }');
addGlobalStyle('#shadow_top,#shadow_bottom { background:transparent; position:absolute; width:100%; height:27px; top:0; left:0; }');
addGlobalStyle('#shadow_bottom { width:100%; height:5px; top:5px; background-position:bottom; left:0; }');
addGlobalStyle('#head_title { width:264px; height:57px; position:absolute; left:50%; margin-left:-13/2px; background:transparent;}');
addGlobalStyle('#abdorment_left { display:none; }');
addGlobalStyle('#abdorment_middle { display:none; }');
addGlobalStyle('#abdorment_right { display:none; }');
addGlobalStyle('#windows #window_inventory { position:absolute; top:15px; }');
addGlobalStyle('.window { position:absolute; top:15px; }');
//addGlobalStyle('#window_forum { position:absolute; top:15px; }');
addGlobalStyle('#main_sizer { padding-top:0px; }');



// Map positioning
addGlobalStyle('#main_container_border_left { position:absolute; margin:0; bottom: 0px; left:0px; padding:0; height:0px; background:transparent;}');
addGlobalStyle('#main_container_border_right { position:absolute; margin:0; bottom: 0px; left:0px; padding:0; height:0px; background:transparent;}');
addGlobalStyle('#main_container_position { position:absolute; width:100%; z-index:1; top:0px; left:0px; bottom:0px; height:100%;}');
addGlobalStyle('#main_container { position:relative; text-align:left; background-repeat:repeat-x; padding-top:0px; bottom:0px; top:0px; margin-left:0px; margin-right:0px;  }');
addGlobalStyle('#head_container { text-align:left; padding-top:0px; z-index:5; background:none;}');
addGlobalStyle('#map_border_bottom { position:absolute; width:100%; height:11px; z-index: 47; font-size:1px; margin-left: 0px; margin-top: 0px; left:0px; top:5px; }');
//addGlobalStyle('#map_border_bottom_sizer { display:none!important; }');
addGlobalStyle('#map_border_bottom_sizer { position:absolute; width:200px; z-index:15 ; height:11px; font-size:1px; left:50%; margin-left:-100px; bottom:0px; margin-top:-132px; }'); // z-index:48;
addGlobalStyle('#map_wrapper {top:0px; left:-50px; right:-50px; bottom:-25px; margin-bottom:100%; position:absolute; width:auto; height:auto; }');
addGlobalStyle('#map {width:100%; height:100%; top:0px; bottom:-80px; right:20px;}');
addGlobalStyle('#map_mover {width:100%; height:100%; z-index:5;}');
addGlobalStyle('#map_arrows {width:100%; height:100%; position:absolute; z-index:2; display:none;}'); // z-index:8;
addGlobalStyle('#map_place {top:0px; left:0px; right:0px; bottom:0px; padding:0; margin:0; position:absolute; width:auto; height:auto;}');
addGlobalStyle('#level_box {top:56px;}');
addGlobalStyle('#health_bar, #energy_bar, #experience_bar {margin-left:-2px;}');
addGlobalStyle('#health_bar {top:22px;}');
addGlobalStyle('#energy_bar {top:40px;}');
addGlobalStyle('#experience_bar {top:58px;}');


// Player / Job Information
addGlobalStyle('#workbar_left { position:absolute; left:125px; top:70px; background:transparent; display:block; }');
addGlobalStyle('#workbar_right { position:absolute; right:125px; top:70px; background:transparent; display:block; margin-top:0px; }');
//addGlobalStyle('#workbar_right { display:none; }');
addGlobalStyle('#wb_task_0, #wb_task_1, #wb_task_2, #wb_task_3, #wb_task_4, #wb_task_5, #wb_task_6, #wb_task_7 { float:right; background:transparent; margin-left:-100px; margin-top:30px; width:170px; }');
addGlobalStyle('#wb_task_4, #wb_task_5, #wb_task_6, #wb_task_7 { margin-left:0px; margin-right:5px; }');
addGlobalStyle('.wb_taskbar { height:75px; width:auto; }');
addGlobalStyle('.workbar_top { height:75px!important; padding-left:auto; background:transparent; }');
addGlobalStyle('.wb_taskbar wb_premium .workbar_top { height:75px; padding-left:auto; background:transparent; }');
addGlobalStyle('#workbar_right.wb_premium .workbar_top { background:transparent; height:75px; }');
addGlobalStyle('.wb_premium { margin-top:0px!important; margin-right:0px; }');
	//addGlobalStyle('#avatar { position:absolute; margin-left: -2px; margin-right: -50px; margin-top: -2px; margin-bottom: -2px; width:175px; left:70px; top:3px; height:90px; font-size:13px; font-weight:bold; cursor: default; background-color:#cbb784 !important; border:1px solid #000000; }');
addGlobalStyle('#avatar { position:absolute; margin-left: -2px; margin-right: -50px; margin-top: -2px; margin-bottom: -2px; width:200px; left:70px; top:3px; height:89px; font-size:13px; font-weight:bold; cursor: default; }');
addGlobalStyle('#character_info { position:relative; margin: 2px 65px 0 55px; z-index:20; opacity:0.7; filter:alpha(opacity=70);}');
addGlobalStyle('#wb_buy_pa { display:none; }');
addGlobalStyle('#workbar_right .workbar_top { background:transparent; }');
addGlobalStyle('#current_task_box { height:auto; opacity:0.8; filter:alpha(opacity=80); z-index:5; top:5px;}');
addGlobalStyle('#current_task_box_text a { color: yellow; ');
//addGlobalStyle('#task_time, #cash, #deposit { right:188px; }');



// Chat Window
addGlobalStyle('#chatwindow { position:relative; height:10px; overflow:hidden; margin-left:6px; margin-right:6px; margin-top:-120px; bottom:0px; z-index:15; }');
//addGlobalStyle('#chatwindow_handlegrip { position:absolute; z-index:0; height:100%; width:100%; }');
//addGlobalStyle('#chatwindow_clientarea { height:100px!important; }');
//addGlobalStyle('#chatwindow_contactsarea { height:100px!important; }');


// Fort Select Window
addGlobalStyle('#scroll_to_fort_list{top: 180px !important; left: 162px !important; z-index:55;}');
addGlobalStyle('#scroll_to_fort_list * { margin: 0; padding: 0; background-color:#cbb784; }');
addGlobalStyle('#scroll_to_fort_list ul li.fort_list_head { border-bottom: 1px solid #000000; background-color:#cbb784; }');
addGlobalStyle('#scroll_to_fort_list ul li { width: 142px; margin: 1px 4px; background-color:#cbb784; }');
addGlobalStyle('#scroll_to_fort_list ul li.fort_list_spacer { width: 150px; margin: 6px 0 4px 0; background-color:#cbb784; }');


// Minimap Fix
addGlobalStyle('#minimap_container { z-index:60; left:30px!important; }');


// Server Time / Game Info buttons Fix
addGlobalStyle('.main_footnote { float:right; position:relative; background:url(/images/main/bottom_slide_repeatx.png) repeat-x bottom; height:14px; margin-right:6px; margin-left:6px; top: 12px; cursor:default; }');


// Server Time / Game Info buttons Fix
addGlobalStyle('.main_footnote { float:right; position:relative; background:url(/images/main/bottom_slide_repeatx.png) repeat-x bottom; height:14px; margin-right:6px; margin-left:6px; top: 12px; cursor:default; }');

// Forum
//addGlobalStyle('#window_forum { top:15px }');

// inne okna
addGlobalStyle('#addressbook { margin-left:-30px; }');
addGlobalStyle('#window_tw_help_notepad, #window_tw_help_edit_note, #window_tw_help_notepad_note { left:140px; }');

// mapki fortów
addGlobalStyle('#fortsmaps_link { background:url(data:image/png;base64,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); }');

// staty fortów
addGlobalStyle('#westforts_link { background:url(http://i649.photobucket.com/albums/uu217/JohnCooperED/wars.png); }');




var footer = $('footer');
var ntf=footer.getNext();
ntf.setStyles({
'left':'0px',
'marginLeft':'0px',
'top':'0px',
'width':'100%',
'height':'auto',
'marginTop':'-50px'
});


$('footer_menu_right').removeClass('bottomrightcurve');
$('footer_menu_left').removeClass('bottomleftcurve');

$('footer_menu_left').setStyles({
'margin-top':'-8px',
'padding-top':'0px',
'left':'35px',
'right':'',
'position':'absolute',
'z-index':'50'
});
$('footer_menu_right').setStyles({
'margin-top':'-8px',
'padding-top':'0px',
'left':'',
'right':'35px',
'position':'absolute',
'z-index':'50'
});

$('footer_menu_left').removeClass('homeless');


// ~~~~~~~~~~~~~~
// Left Footer buttons
// ~~~~~~~~~~~~~~
addGlobalStyle('#footer_menu_left{position:absolute;width:auto !important; z-index:49;}');
addGlobalStyle('#footer_menu_left #footer_building_gunsmith, #footer_menu_left #footer_building_tailor,#footer_menu_left #footer_building_general,#footer_menu_left #footer_building_hotel,#footer_menu_left #footer_building_bank,#footer_menu_left #footer_building_church,#footer_menu_left #footer_building_mortician ,#footer_menu_left #footer_building_cityhall,#footer_menu_left #footer_building_saloon,#footer_menu_left #footer_trader_saloon { z-index:100; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXMAAABKCAYAAABJuLRDAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMDcvMTCp/qD/AAAgAElEQVR4nOy9eZRcd3Xv+znzqbmqq3qe1WqpNcuyZGzZBpvBNg4ETLhcE/IChMwEEpK8wLvAvSQ3Ibl5C0LygEcGxjDFYBtjGxtjG8+2ZNmyNbRaQ89zd83Tmc+5f1RLtvDUmgLJ9W8tLVWvVXXqc757//b5DXv/SgiCgDNpt3z9Y0GxKlE1BUzDoVrKoyoSAOFw4/+WFPzaB78gnNGFz6G9yvQq039mpl80nleZXrnNzx5WKoX6lqX5kacWl8vkSxVCsszC/DyFcglEiUg4TFtbK6lUClXRP9eU6viypMqTl1x+dRU4s8AMCKsN5l/5wseDkt3EwvwS2UKRxYV5KvklbKsKgKpFiTW1ENcsYrEMoViCTNRn40CEd3zgMxdEvFeZXmX6z8z0i8bzKtMqmnFYfGY4u358dGQ4X5Up5IrkijkW5meoV4rUqyUs00SSVHRNQ1ZkFEWhOdNGW1sb7S06SjR5o6JpD77rXb+5yBkE9VcM5ieFmhwf5cFH9pJbngUgEYvR1Z4hqnsAVE2JYqlMPl9G1XWaUk20dHQRT6bpbxbYsEbjV37z78+LcK8yvcr0n5npF43nVabVtLp04IkH+w8NHzheC5Is5So88+wxRoaHyWUXCZwaqahMKhVFlSVcJ8CwPcplg0rNIhqN0d3bSbolQUdbG/3drbS197xnoL/5rl2X/3JhNQQvGcxv+frHgpmszOyiwz333sfU+HE2b9zAm163naH1fXR3xAFw3Hrjf9vAdS3yyxWOnFhgz/5pFgo28ZCM1r+dfqXCRRs0fvfPvnLWor3K9CrTf2amXzSeV5lW3eQf3/p3jumlODE+z08ff4ZH9jxFZW6WTWszXL17B7sv2sXQQA+JTAxFFfECqHsSozN57rrjdr57893UHI+ujlaamntobV/DxnXNNDdHvtjd0/u/3vWu9029EsSLBvNbvvwnwWS5g4cf/CkPPvgwPf2DfOgD17Jr52ZkWadcXsCzbAQEXN+AABzHwvPsU9fwXIuRY/M88Pg8kwsl0ukmUsk42wYzZ/UkfJXp/DN5gUngBy/J9OATC0zMF/+P1+nfg+kXjedVplU35e7vfdau+y08+uQBbrrlDrIzY+zcPMh1l1/MjW97AwOD3WAEWIGArylIkoyqqRANQzQDOPz9X/41f/GXX8SzXFq7e5DTnei6zJreDi7dsYbXXPGGG67Y/Ya7AOulQF4QzG/58p8Eh2bi3HfPXRwaPsL73n0d73vvDchKiHJpDrtexzCKAPi+iyAECDTuXRAEgiDAD8DzfCRJwvcsHt97gof2LqKE4+i6zs71IbYMta1atNUyDY87FCwFBBnXdZGDOt0piIcC4knt58L0i6hTg8lDlCREQQQCBAFAxPcDXM9DEkU81+SxPUf/D9fpwjP9ovGcKxMrTEEAjuuBKOI6Jnv3nuCRfUuokQShUOg/vN0A4d5b/s7P1WPcfc+j/Ou/3Uxb2OPTn/hT3vOr78Ip5xk+foxS2UAWZLRonFAmjRaOoCsqiuChadC0ZjuFqQP8zTs/wJNPHibcHcNrbqIsJqm6Gh09nVz/pt288ard79yweffNLwnz/GB++zf+n2D/uH5KrP/xiQ9xzesvwaiVsN0qVrVKrVbA9xtrUULjCgiAIDx3HUEQEQQRPwACF0nWODw8wR0PLZ16z+t3JRnoaee//u7Li7Zapr1HVT77D19CDSdQ9DCO4+DaNoMDvVzU4dLeHGL3a7f9uzL9YuhUxnYrp5gA6pU6pZlpprIGrijT1ZFm8/YtzJ84ztJ8lpIr0dXTQXdXCte1OTw8/nPRaaoEPYmGTnOWSLv2n892L89TwarWqFVXeIRV8vgukvKLp5EvKux/+gQ/fmwJRVEQBOHnznQuvnTXv306qAsd3H3PA/zLl7/Ouu403/zMJ9l1zdVUi0WKFYuJ+SKVQp2opKCHZLRkhHAygaqECWkqghOQaMsg4HDr7/0JD/7r95E2d2AkNCqeTE6IcaLk0dvbwTWXbuStb3n75Zt3XLEXcH+WR3z+H+PLEs/sf/I0sYqFPMePTzE9OkvdKJ8SC1a2WQMBPxDwfJEgaNx7EPj4vtt4h6DguRabhtq5/nWDpz772EGT+eUc//alP3zZHdgXY6pXS5i1EkfGZL76ozk+d/MSX77pXhzLwnctRAQkoKWjGyW9lmeLbRxciHDHnc8yOVG6oExOvY5h/uLoZBuV05gEUSafLSHLcYp5g4mZCpMTy3ieTDFfYnEux559xxgZHkWQQvjez0ene/e4fOK/fYW//sIT3HxfgeHDLrP1C+tPz2cKgFIdxhfgqeE6dz88xS33jPOtHx7hu3ccZWTq/NjupXmKOHUDwyjjB41ATgB+AIEPvi/gegK+v6Jd4ON7LkHgg/jz9W/HC7A9/wX+LfoOl+zo5e1v2oTQmAr+h+1zx564J7Fkxvjp/sN847s305eJ843/9+PsuuIi5g4+w7G9T7I8OUlHPMymgS46u1qIJBNIWhg8H6deoF4pYLsGpVwBSVJJXHUF480JHjkxx/DEHNmJ46xrE7j6ym3M52y++8NHGRk58ChefeOLMUmf+tSnAPiHz3wiGJvM88Mf3sH73n0d73zHtZj1EmNjM4xMO4yNT2OUlkg1JRDFF7sUDYc7OXo4KakggiARBD5tzQqaaDE+Z2KU81RqHq0Zjckj939q4443//nPXu6lmByrxk/25vnGXc9QFprwxTDlxQnsegVVjyCrGpoepWfjLvBs9EQbhpRhpiIwPl2gND9PLBwhFAnR3iydNybTrmBZNVzHOelOP3edTLt8GpMoSBSzeUoL8xyfr2I5HpocMLCun+zCPK4Yoeb4KILPuqF+PNe+AEwvr9O+Y3D3nT9CVxU0RSabXWZubo7vfvcean4zW9c3nXemQrnAoSOTPH1ojv3DCzx9eJHh48uMTiyzuFyibgRYnkAgKHieyLGxeY6MFunqSxFWzs52q9LIbWgU+D5WvU45W8C08xSW8hQXqihKgKTIiKK44lMBjfHohfCl1fm3IDYoggCW84tY1TJqKIYoyqeYVNFi4j9wn7vjzu+b2WKV//+bN+EuLfH/ffxDXP3anYwcP4Eoh4hGolSXllgYHaecywMQDkeJRZoI6REUSUESFRwUCsUK9VqZljVdZE2HE2PTBKJMqr2F3/mt97C1p5ul6Tyj85MQ+AS1sd9bv+XKFzDJJ1+Uc1nuu/d+1g1086s3/hK+Z2FbdWTKONUCelMreTtg3zMzrO1NkM7EXihYILxQzsBHkmV8X8ELYMvmPibnZ5maqjI+MctAt46mqi+q/0sxzVVauOmBR+ka2IqIi2nUSKRbMWtFJEVD0cJ0Dm5HUTXsegU9HMW2DSQ9SdmLsW8xhyBMsU1op7U9fV6YDLOEYxk4jsUr5u7/O+nUYDJxHPMUUxD4SFoIUl2848Zf4o4f/oAAEd8LCLQoG3ftIAgfZn5yBNuyEEXhAjC9tE414LZbf0QkFCIeizO4bg2W45HP59m0YZDhwwcRf7n3vDLVjCKzc1lGxkvUTR9BCKOHG9Pxxv0HEAScDABBEKCHQrhewK13HKe1uYlrX9+OeoZMZ6SRAL6fZ/zQE3RsGGJ6bC/HH9S4/C19dGzcjBSLc3L47nsmkqIB599utmOtaPHSTQgEZKFRpOMXZgk9+gyLzX3or9lKoqkdAoGtm/uYnJthevo/Xp/b99Nb2lzb47FHniB/7AS/f8P1XHXZDkZOHEdWQqiCiGkYCKKC7XtMjR2jduQgeihKprWVjsFNNHf2oKkqmqqhqDqmUScVT/AHf/xHXHv9NWTzZfo2rSFjlPnh575IS3WR7euaue+++2hvCrNu88N9Q1uvnHg+lwjw1c/9bjA9X2FufpF3v/vtaLqOaVaxzRqRsMpAh4CTm6BYLLNstvL0MZfDw/PUavZpN/n8qc1z/8D3fESx8UzUNZVLt8VIpRoPg5FjC5Qq1RdMaV6O6ZZ7nyTW1AmehW2ZmLXSqSCuamFae9eTae/DMqqEE5nGlC4ICIXDJJNNuGKUkQWXctnEtt3zwmSbq3Sqf0edGkzmaUy+7yEqKp6o0NW/Dj0cRVYUivkckqxhWQaC2KC0bed5TMK/i07//OUnCQJo6+ymo7efP/jge/nUJz5IJpNBkmRc2zrvOpm1OqbloYUihMIxwuEIoVCIUEhH13XCoRDhSJhQOISuqei6hqIoKLJELBajUKryte8c4t49pVUznalGgiASjneTbA9TzE1SzOUYmVhE0MZRQiH8QFzxIxFEDQLxAvjSmfv33KSN8toCgrUf489vJf/wPczPzaCpCpdtj//H63N+Vjox+tT8/PIiDz2yjzWtzbz7jVdQzU3henU0RadSKrG8sMjM3Cz5fBZcG9l38eoFchNHmHz6IY7tuY/De+5jdN+DFI8+jTF6hBNPPEp2/gS97SnesGsjG7sS/OPnvsQ/fftunnrmIJrjkoimODo6yZFn7hv/2XuUAZarCQ4cfIR1A91cur27MW0xDSyrih84NLck0XWFickcSxUbOZJhrhaQPZynK+3R09OMogjPifYzzfN9EEQEQcDzfFpaE6zrSzI7X2JmsUouXyERi3LrVz8c3PD+fxBeiWlsoYwWTlGvlRAlGccyiaY7EEWJWnGZWLod13UQggBFCyOKUiM7w3MQRYlwOEwlH2JusUJLaxJVlc+ZyXWfc6rxRTgykuXgwYOYlo8XCIiSiCQ29tZFKSAeVkknQ6RiGpu3bqSr9fzr9HymU04dgO+BoqhkF6fRNZXAcXE9n7aOfqKJFiYmphAECdtykEQfBAlBAM8LaG1Lnnemk+2ux6rk83k2b9lKa1sbGzeliMfC1GoGXiARCCKxRBLH91HOo06WbWA7PoloGE0D1284chB4jawMP8DzvMZ6NeD7ECASCCKBECBrEoqgcuTEDJdfmiS0Cqaz1cj33cYsygfT9UDwECXtgvU5xzQwzSqWYyLy/GWKl29eEDCZr3DFDdfxujc/wvShf+Iby7+D+p2nad58gsWLhvDXrGNtT+KC+NKLtfMRm6bHxgZsEhw4tI98NssNv3w1TbpIpZRFbW3FMS3KhRKLy8ssLizhLRVJStDdmiHRFIdAoFYpUH5qAtt1WbQcnsxmKVQNSo5LpCPNwNoBrth1MaZd4uEHH8MNKRzIOsw+eZTB7duYnZllbGqZ277+keBt7/27UyaRb/nynwRzSwazizlufPtVaKEollHFduu4rkMQNNLW4okI69epxGazTC3O4YvNWFKasbzH1PwCnc0iawZakeUXUYzGiFAQhFMbH20tEdLNGY4fy7MwlyfdFCMeTQONFKSXYjqRbcf2lnELCyAIRFKtJJs7kTUdSZKwaiXwfYxynnCimVAsju+4eJ6DazgYtQqKoiKoceazMwxU6sQTkXNicl2HvQcd7v7xvSzmq5QrVSRZJqSp6JpKSBeRBQl5ZbPBMn0mcnkOjFjYtodw5z7SCY2tG3q4aFMPm7d0I0vnptNJ2z3X/Rqv/UAgHE2x6aKLOfjsUzS3dbA8O065VCXdHkcUoFatYjsuCBqS5K4ENeHUCObcmV687dmzl0wmw+W7L+KNV+2kVKkBMDm1RDrdTKGYZ2Exy1wVumPnx59c18FfCdYEEomoTs10qdRtAt8noPEA9HwRLxDwvQDDtPA8F8f1CFY23UzDQFdEdN+HV2BarUauY+J7DuDjuxayGgECXNfCcUDj9EyNC9XnXM9ZVRB3PJ+a7eJ4LpZR4Td/67PooSYAuje/jp0f/iQDHRnW9sX5xo3vJ1ZcJNF/+QXxpTNpZ6LTvkduPVooyJwYn6MpHOGirgxFawlPVkjbCqZdIru0xLJpkmnpIqhCbXEMMSpgizax9j7EkE6lkCXiOTSnm4i0NhMrGyyMjOMVLERE5ESMsYNTeL5ExfPZfOlFXH3ttVSWF7njzkMcn8ixtqf/tPuQS5UatfwYAFs2r8O2ag0H8gP84PTsF01X6O5tI56osJgrM51TQY5iq+1MlgOWn62gawqdHToxHSLh5z77s8JHoyrpqM2MFFCs2hRLDolkIx/+5ZieeOoAmhamXl5A1CIrI10JTY/g2xZta7YQTTYjSTIIIpKsYDkVzFqR2eMHECWFrsFteEhUag7lUo229jSCcHZMd903xbdvupVcySCTSdLVGueioVbiMZ1ETCeViBCJaKiqjCJLKyNjn1KlzuJymbnFMvPLZZbydX665wRPD09zyUgXr79iE61tibPW6TnbndRdaCxT+BKyqlOvldm8dSc3ffdbOK6LFm4iFE5y7MgBjFqZWCLJzNQcawfbEYRGzq7vN3J1z9p2R1wKhSo93VGGOl7YqeZmZunt6iCVCCNJEk3JRiXf4NpOTNuiVMpyZOQYonj+/Kmhk4Dn+/i+h+/5+I6FYbrUDGuluKqxAel7Hp7nIQo+xUIRVdNJpJKncpl15XSul2TyrFe0m+85PHjzTZQqHoHjUi0aJJttXN9nYFsfAEvA2OFl1NgeRFFAFITGOSSZQURResHS9tloJPgBQeC+ZDB3/YC67WBaNolonHQmTpMuEQ/3MLb/q2zcfRkQA7Zw7dv+YuVTP+Hh++GqN9cJbZTPiMlzLTQtQrypk2STiCCUmF+oE1IkMm3tQI25fQdZXjpItVokv1ggLkCrIJAe2k70ktcyP1Pg4NFhLNtiaHAjrTGF44cex/VMkh2XvrxONY/x8VlyyznaU1GaIiqmWwMhgWe41MpF5ucXqOs6a9d1s5wvYuY14t39qMkESrIZxzZROjrwSlWEdBvJTDNypUZcDiN4HqKmszw1z6OPH8KqVSjaHtdvH+LPPvYxbvraP3H/Tx9gamqWmrvhNFvIharEct4jrKr0dGi4joXrGjhO/UU3OmRZIJ2Jk0i4xCNVDo7naOvOUMgLyLEYWgTue2yRhG6xe0eapqbIaZ8/6eyKqNHZluLQyBxVU8LzTCzD5vZvfiR4OaYTSy6hZARL0RBE5VRKlihKhKIJZFVvDEY9F8+1CHwPz7XxXZdKdo5AVmjq6MP1XequQN2wsC0bTVfOmOkzX7yHm2+7g6Z0hk1r29g42MrQYDtNqSiaKqPrKooiIUmNaRwCz03b/SYG+h0Mw8YwHIqVOuNTy+w7MM19T4xSqlpc+9ohmtOps9LpOdsJK6MOEVWPkS8USLf1Iys6jz34YxACNE2nXCjS1buW1s4+dP1uZiZOkC/XefbZowysaSGeCJ+17ZYdg2y+zm233d1Y67Qs1m3YiOPB+399G3GgDIiihG3bfPd7d/L0gWP8zvvfgSAIKIrMjm3ruO0HdyEJApp2/vyJ4GTBVLAS0H0EUcT3GwE7HImgqAqiJKIoMpoqIwkBc7PzSLKCKMmczA+UJHFVTHU79Ip2CwKPcj6PEPEIJQKS3QICIoHvY1TztHaned/7HRy7ysF9D+LZUK9AYRjWbYdL3vUb6JHMedPoZ1sAzJRqqAjsuniI9Vt3o2oykFkJ3kcY2fsYP/7encRiGruvawVaKEx+lQ///m/wTWDrEZHQG/TVM9km/eYkqWvfhqa/FoA6ozw0fAdRNWDbpU2AhvZwjsWv3kvQCsadMAWUgI2fS7F9yxtYu0XjK8OfZjqQ+cgNfwVA07Fd3P6POZIfu/RldVJDXRRyI3hGleb2JjRFQPLBtE3KpSKFXJ7luTksUaM0uB5bFYglM8jxVsYLWZaPTxByAroTCeKtKY6PzzLy+EECHeL49Ld1YGSL5CwH0XTRJJkINpJbJ6xHWDu4jv7+Po6OjuKS4PZvfiR46681llrket2jUKqRTseRFR3TKK7kYvovm+kjKzJtbTEq5QWicejpgX37AmamKkiyzOFjo0hywJU7JSIR7VQFlig2sgFOLseoWpS66WOYLqZlY5s+L8fUlIpjCQL1WgU1LOJ5LpKsEPg+jlVHEAUULdxIz/J9XMdEFEQkSSaSTFOrlvE9Dz2cwCzIVGs2juOh6coZMz306B7au9aQiMj0dabYvL6T7p4Muq6cmrYJPzOkCQIBRBCDAFkWCUc0BAE6/RT9vc0MdDfzowcO88i+UZKxMLsvOjudTtpOlCREUSMIJCQlSd+6tVSrJsuL8wSSRkiVAYlKtcKzTz7M2qGtzC8sI0bbEas5svkcsaUS8UQEYeVhdKY6hQKfH3z/aRLxKOm+bhzHpVyrIgoKH//4Tex6zWvYtq2XWDxCrV4lkUwRDocRBIH5xTzfv/ku2ltSjBw9TlMmTVp6LpCfqz8RNKoDJQEE38P1fEShkRUSCocIhUKIooBAQL1u4FgW+VwW3/fRNA3f9TiZOihL8qqY6oa6ij4noBk+owc8KmWQIyAqkOmFVHsZALMGsgqaDqEoaAmFgw86SI/Brv/inbNGnu9RNCxk30eRnstHztZM8AM64jHe8rohxM5fAWaBSSAPOATLywxdsoOhS9YDLbjL3+HOH+8jnkrwe7/33+mv/wXHxwN2SGfAZBaJ+Bba5MOwfggq9/CjHzzL2OgwFiI7h8J09/82x1JPsv4tGofvsMjEQShDdCeE17+ZO771zzx18FG+9q0n2XbNOnBuBeUGao59akXy5XQqVyvYlk1E17hs2zrSMQ3TKOHKMXJll2KhhFe28A2D0tgUKVUgX8xz/70PUMWlp7UJzfGpGSZt6UESmkbSF4imkqRVlaikMTs/TSys0dudYViXSSgi9ZrJ0cMHsE2bVDKFYRrMzy8RafWfi8knX0QVD8c2AHBdG8/zX/HsRVmW6OzKMHzwGMm+dSSTAsW8zcZNGURxA7PLWfYcrNCeyCOLLi3tPaSSAa7XuHIyoZy6lmU51A0bx3tuaefFmC5rm2cqH2DLOaq2g+s0Iwo2tXIOURQRZe3UQEIQRERJwTGqGJUCtlFHUSNEU+3Iska1OkW9Xse2HVxPO2MmLxCQA5+K4TI6V2PLJh9JFF80kAdBo4zYdT18H2RZRJZFRKGRlyuJEIlodLQ38eYrN7KcLXHo6Azre1MkU5FVM73QdiLzc4vYrooeFUikZNau28Qll7+RsWMHeHbfwyzMzmC5HgcPPEO5VCBb9oiv3cS+J75Fc9iDrujKPZy0nXBGOv3rLSeYm54ilYzT17sGw3LRdY18Po8qCex74jGWl5dQFQUQcGyLocEeAKZnljgyfJzhQw6Li0tcfc11p/ngc0xn508BIAoCkgR+4IPXWHY5abPA90klY0xMTFGtGURjMXw/IB5PIACGUUeSZDzXJRyKr4ppNXaTZJXBK0BSGgP/5VEwK2DOAB0wPwE/OQLraKydO4CIgwVoCU4bTZ+LRkuTBzmaq7OmbwOZkIoiwJahPnZc8ZGVTzwLHAPagQGqkw/j+AGp/tcCAyvvWWJ8vkhrPMTsoc9z4uvL+CPQ3dHYYF49k8CybXHwpk+w2HGcaKKLbdu6WZRUHF3lsQNzqA/8Fje8/79Tak8ip+/i2f33E2vT0Dd+gIphseWiAT76g1tgBn456vFv/3IzQvAdHvqjAwz8xjWvqFO+UMS0HRAV8oU6T+w9QGdfB00dSbL5Zcp1A0WFiAlLB48jtUcJCx4oIYYGBkmEBQqzMxRLJaYXZhB0mY6eVjKZNC2xGGatQnMpTqlUZmR0jLpt0ZpUsQoV9j/5BPV6tXFsriSTz+VxMtIpTtl2nnuCB0GwUh31whHlS7V4XGPbRWt55pljVMR+0s0Z9j0xSoDI2sFBjj/zGPlIQCYZJpHqJAie+3JfSLzgeq7n8XJM/b0JmptMumLtHByrMWZWUNQ0rttY33SMGpKiEgQBnmPj2jWqhUWK2TmqpWVENUK1sEAyohLzsni+huu4Z8UkilJj1ON7LOfK/HTPGJIk0tmeJBxWkSURQRRwXI9cvsb4dIGlbBXXC+huj7FpsI1IREUSRAI/wHU8anWLmcUiHiKRkIYsS2el0/ObZdos52uUR2fYtPViQqEwrmOzvLTIxPg4iUwHsl0nl8uxf/+zyOEk7d292IGKZeZRVe3U9zRacEZMoyeO4dkmrhvBsFy6e6Mszwds29pKbnGOwTX9zMzNECAgyzKWZTI02AvA/meGqRkGsiRQMQx2X95y2neelnZ5ljoJK8U2nu/iO42MJwEI/MZ7p6dnmJ2dR5YVNFWhp7udWt2kXqtj1Kooqk7guSiKsiqm1dlNYGDXh1lzsYfv21SyIwBMDv+UY6ONKtB+YPc2aBsC24DZZ8AxIJYCUXwuE+FsNRIFkRbFomniUWYLz7L+1/4bO6/+U2Cawokvc2JykWQszOC2foLyUZZzFZriMerlCvff9nV6e9qJRHSG9z3N1J7PM/p5gSckiUdEhXVawB9eHJwx06TSQrsNu+MKvPMvAVC33s/1772B4W+Uuf3xzwDd/PDRx/i/Pnwfh7/7UWJRma3rurj/kad55599nuFoD/3v7GHr9muQ8Pj2b3yLQ4MdvPHK5worX4rJsn0CBGzH5ciRYdR2nabWDKVCEbOao2x4mEGZjKCyOLdINjvD5QOdbNqyESXTRK1WoLQkUy9XsSomqeY2ys4CnmkTGUwRLFt0J1MMT05w/MgUJU+gIyIz0BLj4kt3MTU1zVNPP4Pr+Hhu4xylk+2UxS0hgeuaKzu6DfFWKohfsYXCIps29XNiyqaOwmVXDpDPwdz0Ama9RDjdQm9/B62tUiPIeiKuC/W6hxaUsIQE5skBSyAB3ksyxeMRQiEdRZGomiLjozYEIIoK+B6OZSCIjbVFq1amXs1RKyxjGzXCkSRtSYlOjpMRRZKDTaRSUWRFOiumkC7jESAIIgEC41NZbi6btGQSpFM60bCKLMFSvsbicpViuU69biMIcDCkUSnVGBpsR9cVylWT0Yks+w/PcGx8Cduy2bm5m2QyTq565jo933aSpJBIRhpLTdE45VKO7PI8Hb2DHBr9Nm/YdSOP3/41JJBMye4AACAASURBVLcMvoviSeiRCOAT+D5aKNQ4PMk/O9t94o/fyB999Ju06TqqKhMAWkTAsqGjp5eZiQl6ujo4NjaOLEuEwxHi8SjFYoXHHt+D63kYtksm00Ln8zbVgXP2p5Px0w8CPNcnwEWUgpUA4mPbLobZCPDtrWkG1vZz5MhxKpUqC/PzSLJMOBojGomc+lWbV2RaZZ8TRRlEGQmNpo5dAJQKi9SfHca2GiPyUBx2XP8HCJJK/boZAt9FkiNoK+vl56qR5Qc0dTjohQJ7//r/ZnZqlLe990Ok1n6AXWvBmv4mpeksiY4MWtXk8IlpynWXtuYoYwcfZerub7HnO3B/SEUZyLB9cy+/25pisrTMqOcyEIhnxOQg0NN6GRSfPXV/N/3he5j4QZkP/uNvc2KpQqRN4Ot//QcATE8eYu2GXXz9lrs5mPfZd2cNthzh03/4u7z9hiv5wXdu5fvAh3dvRFYVbOfldQqHdQRJQpMktq1J8q7XD7CQLXDk2AyyEKJm2lRqBqIr4okS1fllnK4WmvvaUZoSyNMex/N17KpLQk+R0lPMVmYZq84RNIeI+A5e4KIqIrGITMkwCasaHek4fR0t5LJlECQsxyKejENQP6WDrCoSqUSEuekpyoUK8VQM13VfqcjrBS2eUEhFLZxCiakxnb51GpVyM3lZJpUM0bemFQDHFcF1Tk2jKrYEVNHVOLbd6FqvxCQrEpmWJJujA/x4eA8hQUBRNQRRJBxJAo18XFnVkGUFWZZRVR1NFhjsVdi2voWOzjShkIrv+wQoZ8WUSoQoGwKu4+K6Lo4bsJgtkS8ZiJKE5zaqUzVNQxRlXK8RIAAMs85t9x7iwX3jaJpK3bApleuYpoOuimwe6GRoTSuhiArVs9MJVjYVPZ9jY3PoqoxpOSzMTTE3P0dHVz9yOEm0qZWx2RLpkEVzVALfIbCqeLYJurCy3hCcte0C1+WS3VcwMTpKsVgiEtOJxmB23qC5pQlFVjlwaD+aquJ5HqVSlT/440+RaUpi23UEUSKXy3H5lVe8wO/Ohz8JooDjOFi2TSAIyCtLYp7vo4oC4UgEWRLYuGkdjzz2FIXsMm3t7USiMQyjhiwKmKZJSJVWxaSqZ9/nfM/CqjeWXnwaI/QgCJBEmWiy70U/cy4amZ7YWHkKQXc3lL77Jb5x7F/49b+aAtrRun8NDZPssW8xny1h1w1yJx5g79cfYHgf3JaIsHl3D++6ZD1r+1vJpGNIoohhQb1ah8AD/Jdlmp+Zfo7JcXgivpXXj/0jP/5kgt+7ucxHf/0aaqV5HuEJrn3/O6kvwrdzOQ5/6Y/41Md+xM73Fdn3tcfgdZ2wE/7Ha9rQZYGnHjmAmHsagLBnrUqn1tY2ZPkwihKmVgZjOY/ug2+4LFVymK6LYftUrCKKqBFDQTYDgnIRz7WZPTKBlG6ha3CArBtQcgzSl+5gQ+8aKk6JkcceRFzKYSGg6RqKZKHICqVymT2PPc5s1sCwXTwEYokI8LxgnknaiGoIwxOYns+xKRXjZE7ymbZwOCDpSVieyeE9S+SO7iNXzBG7dB2iCL4rrox4XBynMY2aXcyxY0tjeqOqDW9eLVMynMOyHDy38egUBRFBlIAASVCQZAVFCxOKJAkCH9kr0dcdY81AG6GQgiCIeI6A4wcEjn3GTJfv6GH/0RzLuRp1wyUWUulpixEOq3h+QL5UJ1cA06Ex6gtOblYICKLYGKWLIok4REMSzfEEsbBGSyZGd2eGvq4EfsA56SSKAobp8IO7HkEUZW7/yV6aknHiiTj9vZ2k00nSLS20tLUiVKdxHJtNQ530JwJ6WkKIK1Nd3xXOyXY3Xt/FR//nU5hGjfnZeURRxHY9bNsioqvMzi7Q1pzGsmxUVcEwLI6PTqCHdJaXl5Flmbdf29lQr3EkHp5zbkwndWoMQhu55l7grCyvNB5gQRBQKZfp7WrlyacOUswX2LRpiGrNQFZkelt68PyAarWGrsmr8vGmc+hzAmDUABF8AYRA5sXWRM+XRg4yTh6IgKBBoh/qIy5f+UAHV773rxh87ZuYHTnA2PBx5g/+L478DTwt6Yy0tTN0XQcf2bGWocEOdE05jUkUAiK6SLnqvCKTFYhMzWXZvMJkKAm+OJnmg1/L8cVB+J2P/RiAK7gU62uzbLwuQiac4OvH9wMwpXgQh4/v7uKt1/8+R57cy+iBe7j9s6N8N6Ty5kuH6B/qXRmzvLxOkbBMWNeRwjoT+WVmpz3WrO1m47oww8cmOT5WwvRlDNsHK4sUjuEnYhQW5xidncaOtHHJu99JtLuV/FIeDwFJ0akbAl41QbhzDcW8wdT0OEvFOjU7wEYiVzF4eO9+ZD3O5OQMTek0VnWukQ+70uSWdApJKSPrcUbHl9i0se+MR+UnWyKhUSxVEY08lUMPsTiTJUimEeXGmrCiCfi2h2lAxVBYzFaoVeuEwzIQEA6pKJLMmTB5yDhmDVNR0PQwnmOB0BiRKqpO4EYIPAffc9ADh6ZkBF1vHEzk+wGKJp4105WXrWPtmjLDxxbIF6q0ZWL09bbQlAwjSQK1us3cQoHH988yMVddKb4B3/fxA59Na1vYMNhGX0+GSFiFIEASRRKJMFpIxzUdFgv+OeokoCoyTakUpu1hWA7L+SpjkwuMjJzg+re9HT8IKBYKZDQR1/FoaWsnpksM9HawODtFQICsCXiWv6KTymI2d8ZMv/37b+NvPv0Ndmzfju0YRKMx8stLEPgUCwV6u9txHPdUZockyhA0dvI3bduBzsr6tiCcs+2er5MAKEpjJuX4Ar7n47mNAGnbLr7nUq3WcCybjo42KpUauXwZ1/WZn1+kvb0NRVHQdHVVPn4ufc4PPCwDtBCYooikhREE6bT3nBeNNjSYTL2NB/IDWPUoV7UvEFcWCbWCPAv7bvo4xycmWHjwnzn2FRhvSVLe3cu2zb28tb+V5kwC+WS65skDwIIGk2c37mM1TKIa48TYIps39Z/SqePqX+Or0fu5/o5huOUD8I4v871/+S1u2Anfu+sHwBv50X1/w3/57EP86H1v5+jOTWDlGMjEadp1Cev++DY2b+jmr95zFYNr2hsFh7b7ijoJ1jKpdBt+aBIkhUQ4gSDUScai7Fo3wPTcEfaOZ0mFNXYO9pMIRRiZmyMUBiGdZuj1V5Mrm9z3rTtRM02EI3GWJmf4yW0309rTxy9dezVKV5YTMzMYCARY+K5LR1s/a7Zs4/hMluFjJ9h92Vaa4iqK9LwN0Hd84DPCjx95T5BON3Fiskq1XEYP6Y3zfs+4CQheHVVwUT0bWRGQFKlRKhsEiJ6F5ynUHQvUDFNTTxGJholIdTStkQkgy7BapkMLHbjeEVzHwjKqOFYdPA8lHG2U8EsS4ONYBqKi4tbBtGyCwENAxA8ChHNgSiYjhMI6rc1x6nULTVeJRDR0vXE4T+BDZ2eGzrYk9z46yrMji1huo9pMUxUG+1u49OIBmtJhJAkIJFw/QBY9TFum7lTPWSdBEBHERhm8WK3R29vD3OwsIT2NY5axzDqWUcO2TAI1QNNklhbm2L9vD6KsYpp2o2DINX9Gp31nzDSQhn/+zK/zZ395J/FomOXlLO3tjaMXNE1Z2agLcF0XURSRJAnDMBAEibbWVOPHBoTgvNjuZ3WKRTUkKaBm2siShOdLjSU438e2LfL5AoVCEd9vzCai0Tie57F+/VoM0wHTpKUjwF8FUxC4NEU1zqrPBQG2Baq28pMzgYrwvGNMz5tGlQZTKp4gesO1tCUiTMwuU5/cS7NwnNBah7lvwW1f+GdGNYXo5YNc/8btrF3ThqqcXgYe4CMIjRM7XT/A8yw8V6a2SqZCU4qx6dN1UhSN5t1vZn+LxrVf+Qo/uvUrvOub8I+f3AS8EYDr33AZW3W4+NJBMskwf/tHf0jx6dtIFODN3Rne/aHraW5K4Hir12lg6LrM3iM3ZyPRFOVsjbGaSajkYdgl4q1rkWJRjhZnyRgBv/Xb17D94q3c9A+f5fixWXZds5FwKMWzP/opN33+X6hFVbp61tIihYjMzxGJRCjklvB9B0/VCYUjaI5JRBUxAx9JUZhbWMZxbXp62pAk6bSKexGguz1GPKKyULAZObGAKCmsbuvz9KbrCp19XcgB+JaFj0DdDbAth8BrpF7ZZgXL1phddDh8bJz+nl5QQoR0GV1TUfWGY66G6alnDhMKx/E9F8+xkRUdSdVxHQfHMjBrZcxaBVGUUdQQNdNnYbmKbbmAD75zzkyKIpFMRenoTJNOx04FcmicsKmqIr19rbz1jRv4lWs2sGltEyEVolpAJhUhkQwjSSKiICCKPkJw7kzP1ykgQAg8sovzaJpOsVhCECUESSISUtky0Ex/zKW/PUosohOLRtA0hdmZacaOjSAKFtGIcl6Z/vYTv8RrLruMdLqZg4cOYtkWqVQTQSCs/HhAY1QsSRJLS0usHVzHgf3P8IVvHlpZiDg/tns+UyIWRhIDfM/Bcb3G7GmlNN9xPLLZPLKiEApHSMTjRGMRBgZ6UVSNat1AliR0YfVMZ93nAnDsxvkxjh/gWN4LPnY+NUqHVdqTUQRBoL+rhfCONzEaugzHDuG1wB1hjf7rLua3f/0NbFzf9YJADiupn4KA8Hwmq4p9HuzmDFzFLRcN8E/fElAUCfF/HobP9QPf46mbbuUJE773qfdy4JZP8sWfwF/fk+aR1Bt595++g+am2Bnr1NwRqzQ3hejuaCevxXmkaiJIadpiCcqU6etOcP3GDq7buZmuzlbWbF/P5uuvIecLTByZYe7oBD2pCO+/9grevn09O5o0rhjs5IZrr6e7uRXJ9lg2fY4tLGCVTCRPpGTbHJwYZTK7xONPPEZLc4KEFuBa1VM6wUow3zgQQVJ04iGZPftzGLUqz6sROKMWCUHxyDOUTBfLA8l3KVUMfA9cx8N1wbZ9jh87TK1apyUZoKsQCmlEIyFOVjOthmliNkcknkIPxwl8n3q9jGlUCDwHx7awahUc2yBYWRMVtDjzWYN63cLzBUA870wv1gQBWlpT7Lyolxuu2cy7rtvMpdu6COkyzx2aH+AHF4ApCEg2pdF1BcO0EQSBcEhnenqGSCRCT3cPvl0nFZGIRTQcxyG7vMjIs3sI3DK7dm4gFFLPu05veo3OR37zEt5+w69w7Ngo4XAEQZSBxul/oqTiuT6lcoVkMkIslmD48GE+/YUnLohO0YjKhsFObMvAcR1c12uU8Ac+8WSKumFSKhVwXZdorHGqXrlcZXZuAVGAarWGfAZMZ+tLQeAQioGiQjEIqOcNgsD7mfecP1+Sn8cUALGQRt+2SxgLBlEVgbX9bbztuouJx0J4fvCCYxZejMlzPLzzZDdBEFGG3s67v/RevvqZX8X/4Gu486sLBLvexa03/gMdbSn23d7K8ANr+LMPvZW//eSNvOWaHaRbEmelU2f/Rfa6njDdXU2ENIUlI8KDcyKPzYk8OVyiavns2NTHlsEu8s/u5elvf49EqosFRePBx/dgWhZaR4r0UDeXvXY3l7xuN+2XbKJ50wY838E0TOquRjZbplytkq1ZzBRKpDItTI7NcPDAfnq7OtAVn0hYP6UTrKQmvuMDnxEOHPmvgVOLUCjVuP/hEa6/ZuuK+c48quclFTMUwzdKVF2Jet0CBGqGRdXUmJxe4MEHH+biDR0koyqaphAOqYR1/dQ1VsMUCSnkajVi0TBaJIZl1qkUlohEkyh6GD2SQIwmEASoV4oIYuMMDtcLYCWI1gz7vDK9VBMEiMZCRGMhMpkUtZqF53moauM3OBvrieefyfMcVDng2tdtYWK6xNjkLHXTPTXyTCTiKIHF0PpB5ucXKDsGg+v62LatH00LkEXwPIea4VA11fOu03WXRXn66bVYptlIKeVU8gyGadHc0oZj1kCQ6ezsZGJinOHZ3axvPf+26+uKsba/lUMjc0haDN8HwfOQZZnO7h6WlxaoVSpYlomuaYQiETRVxfVcNg0NIAOlVTKdtS/5dfQq5Jcbf1ZzzqnDvk62C+VLrLxSZBG1dx3m8BShioovNs4Kd3wf7SWeSBeSSRQlorEWiEEy04518UV8r5Kl95dl/jaTJpmMvAjR2TO1rd8Z7px7oL6xLcH0mME9lSrTR4YRvQAlouNJArokcgk+2+NRCmvXsufoBMHUItdVy2hNGZ6ZzLKmP0VbZxt1z8E0q8iyzczUcUan6yg1j0DTmc9X2L5tDbsvvZxP//3Xieo6G9Z2oKucxgTPyzPfMtTG7EIBiDA8FZDeN81lu7rx/AD/1Ol7q8tw2XTZxXSWTQ4fHGUpV0GVRTzXp25p1A2Xex7YTyaVoL01hR5p/CpHIhblHR/4zGlf8EpMW9bEeXLUxDSrqH6oka/lufi+h2ObBH7jgCCr3lgbto0yoaiMJMn4vottuuedaTU6hSMK4chzu9CB3wjmwYVg8h18z2TXRRu55vWtFApF5uYXGJ2Yw6xVeOiB+0m1dGLUDIr5ApoiEo8KqErjp9M8z1thUi+oTrZt43uNikBVVXEch0qlwpr+fkzbwXEcCoUCV7/+Kta3XjjbvfY1PYxPLVE2bVwXHKdRDg/QlG6cnBfRFdrbW1k32MKGDn/Fdt4ZM52NLzX3vJaSdTtzQkCbLBFKhFZmNBfGl5qenGL3JY2MHS8IIIBAEBFjrRzfsZMr3RCaIkMQNAL5i2TWXFD/fhGdND2OpseJNL8ApZHLv1IzcbZMr9l1vbF8fA/u9s0sLpUIPImujm6WJsawy1XkMJiixIijssYp0l1+mmSomSd7urj5roe4sj2Ns1zghDvBeG4JsW6j1E0k22V0foZn8wGZdDssTNPX38xbb7yROx/aw9TUFDfe+Es0p1QSMf0FOp3ygl/5zb8XlvO/Edzz2BI4Nk+O1PGFIq+5KI4iibie35iSCOIrhvShTb0YdZN0KsbUTIGeziTVuo1pKtx211PMzS/y+t1DqKqEpikkEwrx6AvPZH4lpl1rFWJiiZFsmJyjYNsiviDiizKSrCPJMo5ZRMYhFvaIRKGvNYosBtimS7lqnXemM9Gp4Vw+vuvh+42p5/lmUleODJidmSGXrZBubmbjhg1s2rSJfG6Z4aPjIErMTo5RKuQZHGhDFD08171gTM/XqRiI1Kq1xq+lrxxYJcsyxWJxJeOoxtTkEgHQ3tHBDVelL7jt3nLtTr5/+14kTcN1HUIhheZ0mt6eDtathZPjvCDw8c7BdmfjS4nm9Xzobx0WJ59AEiN0DFyCJGuneM63L+07ahCIK0yiiOsH+IFPRzxMx0XbG/YSnxu1/6zPX1j/jqFI0iv2uUZqZmNvoVHgF5wz01t+9c+Vpc9/1Bnaup6x47PEUhsYbG1l5n+39+ZRcl33fefn7a/2qq7qfQHQjcZGkSApgaZISRElU6IVr7FH8h57JpOZTGaOY1ty7JlkJsfjM/ZEjp1kzvGxFdnxWBrFEk05ihYrpmiRWgjuC3Zia/S+1L6/elvNH9X3obrRDXSDDbBF4Z6Dg0ajuutT3/u7v3vv7/e79518nZbUQI7pFFpwsdbiA6kxfuUH7ufTisu3TkyxNDXFg2mZjJunWktTcEOEPBtTcrmYhVx0GCnSZm9M5gd/7FFOnF/gs49/iR997BEO7R/AtVc2ZJLWx7j+4Hf+aftbz56j5iiYpsnB0RDHjmZI94RxXB/PbyNJymqSaoNZuN2pRrAdF9dxaTk+jmtQq7t86W9e5tSZszxw/12MZBTMSIjBgSSDfT388j/7401932ZMqWSIarXJSq7OzHKLhbxPuaUiyRqqImHqMhpN4lqTZEymJxkmFjVBlnE985Yw7Tad3vMDe9E1nWe+eZxSxUHXTXp6UvT0pAiFTJayBXLZHKVikdHhXsYn+kikIji2fUv7TujU8Nv83h8+vXpK0UPTNOLxOFempjjyjnfwD3/yME98fZbXXnuVf/yPP0hSvfVMnt/m/OU84XCETCZGeN2Tw3a6775XbOmWMKUVzOhtYGq3acOWdcoMDBCLSDdm+r2Pt0+cnWdmoUg0FCVSLzN/8iTl3DItFUKKzM8cOsjPvf9dXDZDfOpShVezNQ56RY7JOZKqhB1PYmk+UwtVnp1XqPePct/BEX7wngFeO3mez3/p6xw4sI8f+sAxQmqd3p7YhkzXpJ73DStUjmT45vFpnEaFN+ij5LjctafBvmEFVVNwXQdZ7jwjEUkKaqc9z8f32jiOS73RpC1HsfwYl6cLPPvNJ7k0t8JDR8cYWDWqdE+KnmSERGzjmNaNmZrsG1YYHkrSk7SZqDapVJu0nBa6pqLrGoZhYuhxZFnCarVw22Es51Yy7S6dLMXi/kMm733/e1leyjI7M0+5nCWfX0ZWFBRZQlPg4MEhhgZ6CEVClIrVNUzHn/4GF2eXefjePfTvsE6GpvAv/pf3UZVlTpyQmJ6eZm5uDqvV4pFHJmk7Dj/yvgwfeNd7aKNRtW9P302MpVb7zlu9x/3W9d33gi2da/dStB3esXctkyTLnfvcZRlugskIm7tyzBmavCWm8QGHcsGkVJaZWp4mGUty+EM/THV6misXT7GYX+L4/Ax3LwwwFIrwY5cXyei9nB06xPMRjaHaCiPuAtg1VkoOwxPj3Pe+BxhOpfna177Ct48/yz13TXLsvv1IbpV4MrQp0zUrc+g84ePcpVleeC3P9FKZ4eEhQqbO8GAfQ30xehNldFVF06TVwwk+rtOp4bYcH8dxsNsD2I0yr5yZ45lnvk0mleCew4Mko3pgVAN9EXp7YvzkP/p3N4xI3GG6OaaRkWHCIYO9Y8PsGcnQm2iiawaa3qnrdh2LlmVRr1dpthxs276GqT/TwzsO9pOIaLdNp6YD3vdR3+02njtMW2f66z/7ePvMpRyzKzanzl7GsjUOHzpC1FDJz1/CW57jcCTMgXoFc+YS7X0TvLz3fr5rjhHTTQ75i/QrFlrfJH46zeWps/zd176BJNm8/+8doz+lo8oOfRnzukwbOnOAJz79K+3ZxTwvvJ7l7OU8rlWhf3gvqWSceDLNcNJHkkBuV9H1Nj4p2m3I1WSa1TIzM1O88MppAA5MjHJgNI6uX93m9SSjWxbrDtObZxoY2UcqGSfZ08tIavVBCn4FRXXx2knafpt8wHSFF145hSRJHJgYZXIkjqZJ3xc6vZVMu43nDtPWmf76z361XW5o5Ms6z73yOpem55H1GCN7xunrSZFwmyStInp1hUTYxIkPMa1mIBYmrll4LY/TF2Z4/cTr1JtlxkaGuf+ufaRTBiHTIRkL3ZBpU2cuRMsWqiyt1Dl99goXFz0apRUAEhEDR0tgyha6EcVu1ag1bMrVzjHYSDTModEkg/0pdF0BLcRAb4hQyGCwr4dELHJNNnYr7Q7TzTM1y1lkWSYe1rHVOKZsoekRHLtOrWFTqlRo1JvXMLVV8/tKp7eSabfx3GHaevvin/5qu1z3KFUlzl2e5+S5GXxfpVRqkkyECKXCIEPErqIpKi09SbXeILcwTT5bIJWMMr5vjNHBDIahkU5I6Lq8ZabrOvMO4K+3G5ZFrlCmVHbIF4rkKxLzi+VAJNGiYZ1kIk7U9EhGO1kjMxLCMDSikSjJhEamJ0EiFudHfvF3ty3WHaadYVpYqgRMov/faqbdqNNbxbTbeO4wbY+p2WqRLVSwbJ1IrI98sc7xl17kjUtT2H4bFQ/fcXE8BV3VmBgZ4j0Pv5Oh4V6WF2dp1ItEQuFtM93QmYv2xKd/pV2ptShXazSaNs1m56G3rZZzzT3Npg6GoREyVUIhg3BIJxGLEo8a29q63GG6w/T9zLTbeO4w7W6mLTtz0cRsWKs3V59naGPbEp5nAaAoJrreuWXMNHSikRCRsMJP/PK/3zGh7jDdQiYDIiEdQ9eIRsJEwvJbz7QbdbqNTLuN5w7T7mTatjMX7ct/8Vttx7FptOo4a08ToykQ0g10U15zd8CtbneY3jyTrkqEDBNNl/iRn/+DXcG0G3V6K5h2G88dpt3FdFPO/MnH/3nbdmQcb/UhxXYLWe4wqGrnb1OHH/rZ2+cM7jDdYXo7M+02njtM12+L86e1arFxt+u5P7sw/dKv5wtVHEdnaXGRYqUMskIkHGZgoJ9UKoUhVUn1Hr1b0dXpBx5+pMZNXFu7LWf+1c/9Vtv2dZpNq1O32WzgtCx8zwHoXAlrmGiKj6YZKJqOqbZJxlQe/dgnb4l4d5juML2dmXYbzx2mG7Tmafm1M7mD5VrrHyzMXv6dpZUGK/kcS4tzNKolGrUyLctCUXRMw0DVVDRNozczwODgIP29BpmkQ1MZGfzoR//RMttw6lty5kKoWq3K0nIW26oi4aFpKpGw2alZpjMT2rZDy3aRZQ1dD2GGo2i6QcyEZEzh0Y/9/o4Id4fpDtPbmWktT46WVUPCR9fkVR5plcdb5XGQZRVDD2OEY2i6+bbXaHcxNZQTzz2zb3Yh92ChVv7MzJLFa6+f59yZM+Rzy7SdOqmoSioVRVcVXKdN0/aoVJpU6y2i0Rije4ZJ9yUYGhhg7+gAkyMy/WP39hx7+EeLWyG4rjN/8vF/3q5bMg3LZ2FhnkatQCoZY2Cgj3g8TjjceVS6uCBJXKvaarWoVqvk8wWaLR9V0ZFjGWKyQzqh8CO/ePNZ4ztMd5jezkzdPPMLizSqRVKpGIMDGeLx2BZ48lgtB1U1UKIZIrL/ttNoFzKpr7341I8vL8w8fur8Et88/hrfef5lqgvz3LU/wyMP3c9D9x3j0MQYiUwMTZfx2tDwFC7NFfibr3yZv3zi69Qdj5Ghfnp6x+gfHOfIgV4mx1RivQf2fPSjvzRzI4hNnfmTn/9Eu+aEWV5aYnlpjlgsxMEDE6TT6c7DeG07EEr8juDpLKut3W5TqVTIZvPUGi66EUHXdXrixk3NhHeY7jC9nZm6eZaWlojFwhw6MHaTPFnqjRa6EUHTI28b1qL+IQAAIABJREFUjXYhk/bct5/8+ZWlxT975vlTfOGLXyE3d5l3vWOSxx5+Jz/9Yx9kYnIUmm1abQnf0FAUFd3QIRqGaAZw+He/87v89u/8EV7LpX90DDU9jGmqjO8Z4sH7J7jvUJIP/OgnTFafFrhR29CZP/n5T7SLDZ3F+VnK5RwT46NMTEwEQnmeh+u6gSjSRncYrz7ZXJI6TwfP5XJkc2UkJYSiqGQSKqlEaMuibZWpVqvhum7wvu12G8MwUBQFXdffEqbdqFM303qu9UzZbPaOTreY6SrPHMVSkcmJYSYm9r1pnlwuh6yYSEqITEJ7yzSCjkPN5/MdjdQw6vd+v0mvv/CN//bixalPf+Xrz/KZzz/BQNjj//oXH+fnfvajOJUCZy6cp1xpokoqRjROKJPGCEcwNR1N8jAM6Bm/l+LMCX7vp/47XnzxNOHRGF5vDxU5Sc01GBob5iOPPsR9Ewrv+aFf3ZTpGmf+1OO/2c7XlFWxshy95wiDg4N4nhcI5brumsdDbSSY+L54nSRJlMtlFpfy+OiAxGBGJxYJ8+Gfub5oW2Uql8ucOXMGVVWD+7F93ycWixGJRDBNk/7+/tvKtBt1gs5VoI1GA8vq1LuGw2F6enqoVqs0m0183yccDhOJRPB9/y3TqdVqYRhGwKyuPsH27dR3V3k6jvy+owcZHOzfMZ6lpSXaaPjoDGaMt1QjgEKhwNJKEWQT6Xu4344/+/Vj2aXFF778tWf49J/+vxwYTfPZf/MvOfahR6iVSpSqLa4slqgWG0QVDTOkYiQjhJMJdC1MyNCRnDaJgQwSDn/9T36dZz7zVyjvGKKZMKh6KnkpxsWyx549Q3zo3Yd48O4Mj/z4/6oB7nqea57xVLUkCvkc5XIuEMu2bcrlMrVaDW/1aTDdTcx0G32/++tEIsHgQBqZzhGolaJHs9Xiv/6nj183C7sRk+i4er3O3NwcV65cYWpqqvNE9a73DYVC6LqOZVk0Gg3m5uao1+u3lEkY127SqZtJkiQsywpWM41Gg1qtRrvdxrZtms0muVyOcrkcGP1boVMul+PVV1/l3LlzLC4uUi6XcRzntukEnQmk2WxSKpVYWlpifn6emZkZZmdnqdfrO9J3gqdYKnHf0UMMDvZvy5bWM6znGRgYQMJBxr5t9t3Ntf516XSakaFelO/hMXf+ub9NXJmd/1d/++IZ/uIvn2BvJs5ffPJ/49h77mPh5Gucf+FFstPTDMXD3DUxwvBIH5FkAsUIg+fjNIo0qkVst0k5X0RRdBLvfw9TvQm+c3GBM1cWyF25wIEBiUfee5TFvM1ffuk5is0kz/7NJ52NmNY48//8md9qV+stlpfmmBgfDcSq1WrU63UKhQLFYvEaYbbahGi9mQQSDk7LIluwsB2HJz+/sWibMXmeRzab5dKlS1iWFczAnbuMO6EDVVWJx+NIkoRhGIETW15eZnFxkWazueNMmxnVW6lT5z5nb83garfbWJZFq9VaMyDa7c5j2wzDuOZnbqdOlUqFhYUFTNPE931KpRLZbJaXX36Z2dnZW8Jk2zaFQoHl5eXAac/Pz7O8vEyxWKTV6jy3Vbz38vIyMzMzwW7nZpgEz9LSEpPjQwwO9m2qUbvdDiaXVqtFvV6nWq3iOM6aePBGtpTJdFZ/bqt2W+xbjEdhZ5ZlvWW2tJW2XabLM7MfW5ib/8h/+uJ/Rm42+N1f+x+49+6DnDpxhpavkukbwCsVmHrxeaZee4XyyiI6EkkjQcxMETGT6GoYB53lbInpqWkOv+9BHvy5j6H29OFKEcLDe/jpj/4Ev/i+e3lgKE2tXuS/fvM4xYq7IdOah1M4LYvFhXkS8RD79u2j3W4HRuK6bhBzLhQKRKPRYPu7XpSNtjbdMexUKoVl2VSrLWrVOvWIEjxncX3bjMlxHBYXF4lGo0CnRMswDFzXRZblzu2A8TiyLAfbc9/3g/CLWJ1DZ/W+E0zdRnUjw7pdOm3GpCgKqqqyb9++Nc5RlmXS6TSKolCr1fB9/7YxdWszMzODqqpIkkQ8Hg8qEZLJJKVSibGxsR1nEjsU4bC7QzobcSqKQrvdZm5uDtM0GRgYCPi3ytThWSQRC7NvfM91NRIcpVKJeDxOpVKhUCgwODgY2Lpovu8H/77KY1GrNahVa7fVvh3HoVKpoGkaiUQCwzACpmazRa1mf0+NuZe++cWB5Xz+N5/9znMUzl/kf/qJj/D+d9/PuYsXULUQuiRjNZtIsobte8xcPk/97EnMUJRMfz9Dk3fROzyGoesYuoGmm1jNBql4gv/51/4ZH/7Ih8gVKuy9a5xMs8J/+bd/RF9tmXsP9PLUU08xlAnz4L2Zaz5HQPnVz/5qu950sJo19u3bg6IowcynqiqhUKjz4ILVJEO5XKZcLq9ZlXSLttGf7tVzMhnHMDpvXy43cVz3mi3N9Zjm5+fR9c7tZ77vB05cUTriRyIRQqEQnueh63rQYYqiBKv0RqOB67qB4b9Zpq0a1e3UaSMm8R6SJBGNRgPNbNtGluXAmQltbwdTd7t48SLtdjuI2R86dIijR49immbwwIGdZhJ2ICY5kXfp/rv7+0IzSZLQNA3btpmamiKbzW6ZSfA0Gk3Gx0e3pJGmaZimSavVCsrs4OrEst6G1mqURNdVJMm7rfZdr9eJx+O4rsvly5fJ5XI0Gg1kWSaVSnxvjTk/p6wUsz88uzi/71vfeYnx/l5+5gffQy0/g+s1MDSTarlMdmmZuYV5CoUcuDaq7+I1iuSvnGX6lW9x/vmnOP38U1x66RlKb7xC89JZLj73XXKLF9kzmOKDx45wZCTBn/zbP+ZTn/s6L792EsNxSURTnLswje2p1+gUOHPL1SkW8sRjIdLp9JrtOXRWr4lEInCMqqriOA6lUolqtbrpNm+9iMKphkIhYrEwsqLSaDpYLQfX83jyC1cBr8fUbDZRFCXYYvq+j67rhMNhVFXFMIxg0IuZtXsGFiv1ZrMZJE3eLFO3UTWbTZaXlzl79iynT5/m1KlTnD59mjNnznD27FnOnj3LxYsXmZmZYXFxMUhE7rRO11v9yrIc6ChWOqFQKHCawJrfIZjC4fAtYQJYWVmh1WqRSqWIRqMMDg6iaVrQR8J57rRO4mtN09A0LXDcYpfXHTbo/ltMisLhC+e6FaYOT4FELEw6ndyyRqKvunfOW6na6PDEUBSJRtPelkZisttuKMOyLEZGRrjnnns4cuQIhmGwtLRENpsln8+vLihCt8SWttq2Y0uzly9PlCq13zhx6hyFXI4P/sDd9Jgy1XIOXddxrBblYpnlbJblxWUqlxcwVwrs1w3u7+/jnt4BeutlWi8fp/ztp5j68hP87f/zSb7w+/8nn/m93+bP//Xv8NXPfprpV7/Dib/5It9+5lnckMaJnMtLL77BQF8/83PzXJ7O4bdZo5MKnXKfhuXRsJrs2zOAoiiBYN0dqOs6iqKsqYKQJIlWq0Wz2cQ0TWKx2KYZZCGcaIZhYJotyhWbZqOFaWjomsKNmET8zbbtgMswjGDgiQnIcRx0XUdV1aDDxMAVg7DZbBKJRIJV/s0y+b5PsVhkfn6eVquF4zjBIBd/ussAPc8L4tW+7zMzM4Ou6ySTSVKpFMlkMnjtm2HazJFrmkY6naZQKBAKhWg0GjiOQygUAljjPLsdmTD4nWYSLZvNYpomfX19DAwMBAnPer2OYRhBglb07U7Y0/qaZDF5rI/Ddjty8X/dn8fzvGu25JsxCZ661WJ8bHONur/uXpis351cr12rkU6pbG1Lo+2sfIU2ruty6NAhFKXz+5PJJPv37ycSiRCNRnnuueeC8K1p6jtuS9ttW7GlEydPkM2WJi9OLdATjnDfSIZSawVP1UjbGpZdJreyQtayyPSN0K5BffkyclTClm1ig3uRQybVYo6I59Cb7iHS30us0mTp3BResYWMjJqIcfnkDJ6vUPV83vHgfTzy4Q9TzS7zla+e4o1LBSbG9qC2r0ZGVKDztOpW5xhsMpm87oynKArRaBRd14OtniRJwTa9WCwiyzKhUChYrXSL1W18mqahaz6KBLbjY9s+mt5xxNdjyufzKIoSVGQAgeNst9tEo1E0TQsckSRJwVa6Wq0iSRKxWAzgmnKmm2FaXFzkypUrtFotTNMkFAqRTCZR1c69C2JCEZON0MJxHCzLotlsBsnIbDZLqVQilUrR399PKBS6aZ02asIZi1xCT08Ply9fxvf9gLdUKuG6LpqmUa/XA626dzY3y1Qul2m1WkEIZX1rNBpr+k9MsrFYDM/zcByHcrm8o/bUbZ/df4TNiP/rfg0QhKW6c0frnfmmTD64rc4qPpmKb8ozOzuL4ziBvYgJLJFIAJ0JpFKpBDtmYE0ocSONVFVFkdtv2pa6OcUiSSysxM4mn8+TyWQCbfbs2RNwZ7NZBgcHCYfD2+o3EQ4zDCPQQ/iCUChEu93JKzSbTWzbptVqBWMvFouRSqVoNBqUSiV83ycej6PrelDcEQ6HN+23fD7/wampafLZPIOpKD0RHcutg5TAa7rUKyUWF5domCb7D4ySLZSwCgbx0X3oyQRashfHttCGhvDKNaT0AMlML2q1TlwNI3kesmGSnVnku8dP0apXKdkeH7n3EL/xm7/JF/78U/zdN5/myvQcLfcIEoWgHzrO3JWwWm0URSYcDgcrjs1CJ6I6RBhGtVolHA5j23YQU8xmsyiKQk9Pz4aJUvF7wuEQpZKF60n4bQ/f9Xnqrz7Rvh5To9FA1/Vrtr8i/NPtMEUCT8ziYvIRnS5WEJ7nBavn7TCdO3eO6elpDMMgkUgQj8eJxWLBTqE7trp+AABEIpHAQG3bDqqGstksruvS39+PaZo3pdN6rcVAt22bcDiMLMssLS0F32+1WkSjUcLhcJAAFRO0mMBvtu9c16XVajEzMxMM/GQyie/7jI+PI8ty0Fee53HlyhWKxSKTk5OBI+jp6QmStRslym7Wntb3S7fjFjYt3q877NJoNNA0bUOdb8Tk+gpWq40qK0TC5qY8YsJY76Bd1yUcDjM+Po7neeRyueD7tVqNRCLB2NjYmsXUVZ4w5XL1pjXqbq1W50BiJpMhlUqtqSYTh4RmZmbQNI2hoSEkSaJarXL8+HFqtRq1Wo1UKrXlfhM2kslkAu1FtZNI3gOduvHFRVRVJZfLBeP70KFDpFIpUqkUKysruK7LPffcA3RCo1NTU4yPj2/ab4am/lExX8Jr1ugd7MHQJBQfLNuiUi5RzBfILizQkg3KkwexdYlYMoMa72eqmCN74Qohp81oIkG8P8WFqXnOHT9J24Q4PvsGhmjmSuRbDrLlYigqEWwUt0HYjLB/8gD79u3ljUuXaHgxdHI89VefaH/wpz4pqQCu28a2XUxDC1Zs6w17oyZmQrFiCIfDFIvFIMQg6pQzmUxgVN0rhWCAKBqu18bzfDzfx/fa12USk4PjOGuqVETHAoFjFo5SGFh3/FXE/buTX9tlWl5eJhKJoKoq4XCYeDxOJBIJeG50aEHEaKGTl4hEIkQiEZaWlsjlckE45GZ0Wh/XFZonEomgxE3saDp24JLL5UgkEjSbTVRVDZywqqprnPnN9N309DSaphGNRoM4LMBrr71Gb28vqVQq6B+xmxGDbHp6mlAoRLlcxjTNgHkn7Gm9jXf/zu4QmdBIhMja7XawG+zWZStMritj2y6GoSHJyqY84sCW67pdi41wMAZEaEeW5WA1nMvl8H2fsbGxTTVSFHlLGokJYr0ti92CYRgMDAyscf6C23Ec0ul0pyxytSxYFC4cPnwYWZbXlhVvod9EQYawT8dxmJmZCXZriUQi2LX09vaysrISjC+x0Lp8+TKFQoELFy7Q19cXVLt1J/4367diqYrdsomYBu8+eoB0zMBqlnHVGPmKS6lYxqu08JtNypdnSOkShVKBv/vG09RwGevvwXB86k2LgfQkCcMg6UtEU0nSuk5UMZhfnCUWNtgzmuGMqZLQZBp1izdOn8C2bFLJFE2rycLCCrHhjk6wrjRRlqXgA201HiWMq1QqdbZLq+GXRCIRdGCxWAy2geIQT3dYQzTP83FdD799dSWwEVMkEsGyrDUZfGE8IuTTzSeM3nGcwPjFyl6EWbo/73aYxM+IE5Xdse7NklLdidnu14rJJhQK0d/fj2VZlMvla1bFW9WpuzUajWACE7uI3t5eKpUK+XyeRqOB7/sUCoWgaikWi5HNZlFVdU1I5GZ0mp6eDnZUsVgscE5iC5zNZteEzcT2V7CXy+Vg6zw0NLShrttl6tZJ6L/ZAkbTtOCqCJGAFe8lcjDdi4obMYmhp8ntTftNkiR6enoCG6nX63ieh2VZmKZJvV6nWCwGJZzd7yvyRJtrJOL8N7bver1Os9lcE/4Sh5EEt1gwybIcHKaKRqNrds6i/0ulEvPz89Tr9WCHvJ1+c1032A3ruk4qlQomrEKhwMrKCvv376dYLGKaJrlcJzkpKmp6enq4cOFCsBO9ePEiAKdOnWJkZOS6/VYolrBsB2SNQrHBcy+cYHjvED1DSXKFLJVGE02HiAUrJy+gDEYJSx5oIQ5NTJIISxTn5yiVy8wuzSGZKkNj/WQyafpiMax6ld5ynHK5wrlLl2nYLfqTOq1ilVdffI5Go9a5NldRKeQLuP1yoJPa6YzNT0dtpWmaRiqVoljs3NQoBITObCgMTtf1a5JWGzW/3b4uk0hY6rpOtVoNyhLFqqDbSQpDE7Ezx3GC+H73buFG1TibMXVPHJZlsbKyEkxaYpCJgS4OeohVXSgUIh6PB68THKJaB1izxd+uTmteu/r+juOQSqWCidCyLKrVanA4x7Is8vl8sNMQ8dDu0NXN6FSpVAJn5bpuMCGL+udYLEaj0QAIVmDCmRcKBcR9O67r0tvbu6XPfDM6dYfmxL+FQ2s0GoHDEuExUU0lVuRb1mmVp83a6pj1LZPJkMlkgr4CKJVK1Go1oGMfPT09RKPRIH7ueV7gdHdCI5F0LJfL7Nu3j8HBwaBP6/V6UD8udiyapuE4DrOzs8GuVYQO5+bmcBwneF1/f/9NMYm81+DgINDJqTz99NPMz8/z2GOPIUkSS0tLHDlyJFgkJRIJlpeXee655/B9n4GBgWDX+8orr6CqahDf36y17BZtJGzH5ezZM+iDJj39GcrFElYtT6XpYbUrZCSd5YVlcrk5Hp4Y5q67j6BleqjXi5RXVBqVGq2qRap3gIqzhGfZRCZTtLMtRpMpzkxf4cLZGcqexFBEZaIvxjsfPMbMzCwvv/IaruPjue1AJ1i3MgdpjSFvp6mqSjKZDGblvr6+IAbsui6GYRCLxTBNM+gU4bhkbHx0POFP2xIEd7Jfy6RpWhASEUYmOlj8XjGoxIAT9fFiUhHhBZH8EINxu0zrHW29Xmd+fj5YNQhH3Wq1sCwrCOuI93cch3g8Hnxdq9XWlHumUqlOyZPjbFunNT27mkzsrou2LItIJEKlUiGdTq85PCRWd6KtX3FuV6e77rqLl19+eU0oSxzgikQi1Ot1IpFIkKAW4SfbtllZWQkmFdM0r4lTv1l7Wv97xCpPOA7xe8UkHY/HKZVKOI4ThKpE/qjbHq7LtNp8dHzfQ5I2nrC7d27iWlfbtimVSgGTqqpBPFqEP0TYZTONRNuKRiKc4jgOb7zxBvV6nYmJCeLxOPF4PFi5h0IhZFmmUqngui6maVIsFlleXmZhYQHHcTAMg97eXkKh0JpTodvtt0gkElSzAbz66qssLy/zzne+k0ajwec+9zmOHTsGEOQQpqamaDabLC0tEQ6Hue+++xgbG2NqaopGo8Hk5GSwKNys38LhMJKiYCgKR8eTfPQDEyzlipw9P4cqhahbNtV6E9mV8WSF2mIWZ6SP3r2DaD0J1FmPC4UGds0lYaZImSnmq/Ncri3Q7g0R8R28touuycQiKuWmRVg3GErH2TvURz5XAUmh5bSIJ+NAfVWnVWcuyxK6rtJsuDiOs6aOdztNDECxAo3FYkHoQ9f1YKu+tkZWwvUkwEGRNXxfxPauzyTLcjCwC4VC8D3BIYywO2Ely3IQs00kEkGirzvhtV0mXdeD2KL4eZFFFytysbLtdhDCgBcWFjo3261OTOL6TnGCtVMXrOA47k3pBAQc1Wo1eJ9ms0mj0QhWTpqm0Wg0gq+7k1/rTxbebN/19vYGSVXh/ERJqyzLQSWUSDy+8MILwXkB6CTbNlrJ7YQ9dffVRiEXsdIViTPLsoLdl/iZ7h3MjZgET6Nex3VsVM3Y8pjrdsjrP0N3OG5zjcDz2rTbW9Oo2w7C4TALCwuUy2Xuv/9+JEkKxnWlUsGyLDzPo1qtMjc3F+TQkskkvb29wclxobcoPd1uv4nd9uuvv87FixeZnJzkF37hF2g2mzz99NO0Wi3K5TKnTp3i5ZdfZs+ePUxPT5NMJolGo4yMjCDLMisrK2smhRv1W3//AKp6Gk0LU69AM1vA9MFvuqxU81iuS9P2qbZKaLJBDA3VatOulPBcm/mzV1DSfYxMTpBz25SdJukH7+fwnnGqTplzzz6DvJKnhYRhGmhKC03VKFcqPP/sceZzTZq2i4dEIhXF9xsBuwpg6j6SrOL5nfikSCDcTFMUJRA8n89TrVZptVr09fVd48w6RtKmbrVIp5Krndf5/60yddedwtpkn/haOHHRIpFI4CS7K12uGu7WmdLpdFBuJ1b+3ZOE2FJ2v4doImwAV2v4o9EoqqquVrCEuxJLN6+TcDRzc3NIksTCwgK6rqNpWlB5EwqFCIVCQf5AHLsOhUJrklpvpu9GRkY4ceIEnucFIQvhKBRFCWKo3VUt1Wp1TRmqiJd3h9F20p66V+bdzbZtIpEIuVwuuFZAhPdE3NdxnGsSopsxGYKnDY1Gk3hi44qvjZrQZiuv21gjn0azRSqV2LJG3ddkiFX1c889x/j4eJB7KZfLFAoFpqeng3BmMpkknU6TSCSuCX9CZ0ffWcBcv9/8tkS9XieZTAafrVAocO7cOYaGhoKKlFAoxPLyMn19fWiaFpzIFdUsIyMjjIyMUCgUKBQKQUlxf39/ENa7Xr+lYgZh00QJm1wpZJmf9RjfP8qRA2HOnJ/mwuUylq/StH1o5VDCMfxEjOLyApfmZ7EjAzzwMz9FdLSfwkoBDwlFM2k0JbxagvDwOKVCk5nZKVZKDep2GxuFfLXJt194FdWMMz09R086jSEVAp1AOHNDR5IdJMWkWq2SSCS2vSoXTcTLRPyuXq+viU2LbYwoT7MsF9dxUVUZaKOqCrIkYxrKtphEdYSobhEdLsq6umOhwnGKyeXNMPX29hKLxahUKkGdeXfCUqyCC4UC9Xr9mlisKGcUJ1cFt1i5ijjkm9VJlLaJz9hqtajValQqFUZHR4PVsAh9iHMC0Wg0iGWLifPq4a3tMx04cICTJ08GJ/nETk68v7hyV/RNdxWJSAZ2a7iT9iR2BeJ9uycx4ax9v3M1sJikRWJPlHqKMNKNmK6OOZ1qtU48kdzymBMhJxH66q62Ee16GnVyJ+0tayTLcjD5ikOBuq5j2zbT09NUq1Wy2SwLCwuBsx8cHCQaja45TSx4hNbb6jfZoFarkUxe1am3tzc4C7G4uMjg4CDnz5+nt7eXxx57DEVRmJubY2ZmhnvuuYexsbGg/xRF4YUXXiCZTHLw4MHgc92ISXGXSaUH8EPToGgkwgkkqUEyFuXYgQlmF87ywlSOVNjgXZP7SIQinFtYIBQGKZ3m0AceIV+xeOr/+yp6podwJM7K9BxPfukJ+sf28vc//AjaSI6Lc3M0kWjTwnddhgb2MX73US7M5Thz/iIPvfseUlEVVfWRV0N0MsCjH/ukZGgyhhGiXm8EoZGbbd0xx42OQ1+NayvUag1UTUWV3OB5fbK8dSZx86HoBNu2g8mke/Uitonidd0D580wGYZBNBqlr6+PwcFBMpkM0Wg0WOlGIhHS6TTDw8PBqkI4B+Ese3p6SCQSxGKxoM67+96ZndAJruYaEokEiqIE4Q2hldBLURSazWZw3Hp9tUXH2co3xWSaJseOHQsS19VqNfid3XH57glZ5BjWO4adtieR3xCr17W7NT84JCduK+yekIWNm6a5JSZoY2gypqFTrTm4jr2tMbfRTk+062skU6vVUTR9yxqJGvG9e/cGn098VnGT5ZUrVwiFQuzdu5f9+/cHcfFulvUT8Xb6Td+g38TZg3Q6zeLiIs8//zzf/e53GRoaCmxpaGgIwzBIp9P09fUxNzfH6dOnOX/+PMlkksOHDwcr8q0whfQ2oWj09Ug0RcWPcLluUS+Xqc3NY5g6SizKG6UWF/MW9z3yIf7BP/0nlNo2F87P0xMbIRxKce7bz/KF3/0D/uT/+G0e//d/zNmvPEVkcYFIPksxv0LDd/B0k1A4Qk9YI6LLWG0fRdNYWMriuDaTE8PouhboBF13s0RCGpqq0mz5VCqVm3bmiqJsGBvvPk0mVnZNy6NYqRGLREFWUBQZRZaRVx9WuxWmQqEQlGEJY12fzBShDLGytCwrcBY7wSRKHUX9b7dTEv8v7hkZHh4OEp7dp9i6T7IKrp3UCQjKOUWMUCTP4vE4hmEEuwPh9Ov1OpVKBSDQeKeYjh49SiaTCZJkvu9fcyhJ/C2qXQqFApcuXQpes9P21J1rWe8shTMXiUWRH4rFYkGJa3esfStMHR6Fht3e9phbP9ls1tZrZFkWpXKdWCS2ZY00TQvq2iORSLAoabfbQZK6r6+PiYmJYGJb39avzney38SuaGpqClmWmZmZ4fLly3iex+zsLM1mk1OnTjE7O8vc3FyQ6D906FDwubbKJMkeg0PpL48ODVIw4nynZiEpaQZiCSpU2Dua4CNHhnjsXe9gZLif8XsP8o6PfIi8L3Hl7BwLb1xhLBXhlz/8Hn783oPc32PwnslhfuLDH2G0tx/F9shaPueXlmiVLRRPpmzbnLxyiencCsd2n7McAAALw0lEQVSfe5a+3gSjfSFsq7xGp0D1ZExFkhVURadYLAfGeTNNUZRg5SUGg/i6O1NcLtdwHRdTB0UGVZFRVYUP/tQnpa0yidKo7oMv3e8lYsDdOwVxJ0r3QN1Jps1aKBSip6eH4eFhRkZG6OnpWeP4u9tOM4kTqWKVrapqEAIToQ1x6EQMenG8WVyJu9NMvb29TE5OsmfPHsrl8pp66e7dnTiUpmkaxWKRs2fP3hKdVFUNSuzWr3pFotu27cCJAWsqWkQyb6tMgkdXJHKFJp67tR1xu90OKmdEIvB6bQ1PpYbjtN9UvymKQiqVChZPsViM4eHhIFe2lbbTthSLxbjvvvt44IEHGBoaYnp6mhdffJGXXnopiKMXCgWOHDnC0aNHGRoaCirrtsP0gZ/8v6WD+/c+OzbSQ8jQWGlGeGZB5tkFmRfPlKm1fO6/ay93T45QeP0FXvnc4yRSIyxpBs8cfx6r1cIYSpE+NMq73/cQD/y9hxh84C567zqM5ztYTYuGa5DLVajUauTqLeaKZVKZPqYvz3HyxKtM7hslZnoosrRGp8CZP/qxT0qpqLR66MdneXl5S52yWROOU4gkVsdi5mvULRaXVkgnw+iajLIqltrl3LbCJE4pilI/IChDFCtPUZO+UZXCrWC6XtM0jUgkQiqVIpPJBOVc3brtNJNwjIODg8RisaCKQLyXWBF3rkjVg0qa0dFRRkdHg5K4W6WTyDts1ESJm1h9RiKR4Bj4rWAKh8NEo9EgPt4dQxeVP+JOHfEaYVPiwNhWma7yqNi2x/JSdlON1ven7/vBWQQxwWz0ujUaNRosLuboSUbfdL+JMs31J2S3wr6GaYf6rXsHkU6nGRkZIZFIMDk5yb333svk5CRjY2P09vZeU/GzXaZkb+LpvXv6/suRgQR+ReFvL9f41196hf/4lbN85m/P8effOMl/+MozfPkvn+TlP/lLjn/uizx/7grH35iiUqvQUlRem86x1FTQUgNYkkbJaqCqNnMzF7h09gJa3UM3TLLNNkOT4zz04MN89YmvEDVN3ntsP4rsX6PTmkLUVCJEvdkCTKq1Fvl8Piiq325CNJPJkEgkKBaLQSWC2Ma4rsf8UhHT0AmbBoqqoKmdrdSjH/vkGqu4EZNIPoqyMDH4xHsJB959/7EoM1sbitk5pq00sQoWTfzcrWISK2zxGEDxIAbXdVlaWsI0zeDovpgE199xc6t1EtVAcDVB5jhOcMmWCHWIy5luFVNvb29w2rI7dg8E23JFUVavAo4FYcWb0ekqj0qp3kbfgi2JA0JCr80OCK0PNS4s5jCM8I71m3jOgQhzdOu0vt1q+17fusOYm7WbZfqBYx9p+lbzD1ul6o8ur5RpewojQ6OsXLmMXamhhsGSFc45OuNOidHKKyRDvbw4NsITf/Mt3juYxskWueheYSq/gtyw0RoWiu1yaXGO1wttMulBWJpl775efuSnf5qvfut5ZmZm+KV/+GMM9YdQ5fY1Oq0Jbj36sd+XMqlIpxQInWKpTj6fX1NVsNWWSCRIJpP09/eTyWSCCgDP85mdy9NoNEklwsiKhKLI6LocXHu5HaZ4PB6U0a2/1ErEq7vLoES5n0h0dVbxO8t0M01s8W4lU3cMPJlMMjraefyW+H9RAy52MbeDCQicTXfpanccut1uU6vVgtruwcHBW840PDwc7PbE5BaJRBgYGGD//v2Mj48zMDAQhKhuVqduHoB8ySGfL17XlkzT5J577uHAgQNMTk6yf//+Na+9lsdjbn6ZesPZUY3EAaBMJrNpuHBzpts/5roXem+W6d3v/cnvDO/d9z/eff9hYtEQew4d5uEfeDf7w2EGJRiJ6dQicLHZ4lC0l1956H7e//BRvrVY4PFnX6JemEJfPEtj5gozS0UWimVyDZeLWciFhsmnBumf3MPP/tIvcOL8Ap99/Et84NGHePiBcdq+vSGTtNGs9td//mvtpZUyrg+a4hGLGqRSqTUPfLiRgN1CXY1fe8zO5SmWyvSmU4RNCUVVCId0QqbB3//5P9z0l27GJE5HiucMdic3RTJUfN19Ha1wEreCabfplMlkEDckivpfwzCCCVDoJm5TFAc7ROz4VvWd0Mn3fc6ePRsMNNFXohRt7969zM/Pk8/nOXDgQBC/v9V9V6vV1lT93Mq+u8rTcSCJqLL6FJ43a0suc/MrFIo1etM9u9O+DQlF22VMpoQZCqGpXJfpD/7Nb//3586+8amL03mioSiRepn5kycp55ZpqRBSZH7m0EF+7v3v4rIZ4lOXKryarXHQK3JMzpFUJex4EkvzmVqo8uy8Qr1/lPsOjvCD9wzw2snzfP5LX+fQoQl+8aceoicmI0vOhkzqRoDRsEw6abK4UqPlQhsH1ysSi17dUolYYXfrnvmEIXWcJlTrNsuLK1TrTfp6ooRWjco0DAxdRdc2RNkyk6gkETuA7sqW7hX71TK79i1n2i06tSmSSsYYGBig2WxSr9eDu2pEGErscsSpRvF/gmllcYXKLdTp8OHDtNude6jr9XoQ5hgYGMD3ffr7+0mn06t96N+WvotEImsSsrey77p5fBfKmDhejXjUuklbalOrN1lazFKt2/T1xN629n2rmBRZuiHTr/36//6nn/3jX/tUrVbj9PQ0yViSwx/6YarT01y5eIrF/BLH52e4e2GAoVCEH7u8SEbv5ezQIZ6PaAzVVhhxF8CusVJyGJ4Y5773PcBwKs3XvvYVvn38Wd559CA/+tj9RPQWtDUMQ9uQacOVOXSe8FGu1skWWtSaDtGwgaq0CYd1QubVhOL6o94izthZHXcGXqHYYHFpBdPQSSVWkwqrHRgyVUxD49GP/f4N90p3mG6WyURTfaLREJGwGSQ5NyrhFF+vZwqZBqlECE19O+v01jKt54mEQ6iKRCSsETJVdF3bAk/nhr9iqcbiYhbDMN9WGu1GplPfelw9efZ558VTK7zw6nksW+PwoSNEDZX8/CW85TkOR8IcqFcwZy7R3jfBy3vv57vmGDHd5JC/SL9iofVN4qfTXJ46y9997RtIks0PfvBB3nmkF02tY2jadZk2deYd0T7erjdbZAsWpWqLtmcTCkcwdAVdVwkZVw9AXD0QIGE7Pq7jUas1yOZLACRiEeIRvROHWt3mGbq25Q68w7QTTFFMXcYwNEKmuMpAJI47P9dh8qnVO0wSEBdMMt8nOr11TJv1m65r6LpK2OiwrOVZ7TfXo1atk82XAeltq9HuZCpoTz3xx/alOZcnv/Uil6bnkfUYI3vG6etJkXCbJK0ienWFRNjEiQ8xrWYgFiauWXgtj9MXZnj9xOvUm2XGRoZ57P33MLEnQdurYRrKDZmu68yFaFbLoWm5FEs1Ks02nt0pidJUBV/WUXGRFQ3fc3A8H9txOsdgNZVEpJMVlhUJZIWQqaIqMiHTQNeuzVpvpd1hejNMFpK0yiRpKJKHLKv4vovj+tiOjet6aGqHKRTSUWSJ9vedTm8d027jucO05ab83RP/0i3V4fSFZZ598QzFsk+p1CSZCBFKhUGGiF1FU1RaepJqvUFuYZp8tkAqGWVy/17edXScob4wug6mzpaZbujMO6J9ou16Hi3bwbZ9rFaLliPRaNiBSKJpSuc0pKq00bXVq07VzgkqTdXQdRlD19A1nQ/+N793c6Ufd5h2hmnVgYtrRncF027U6S1g2m08d5i23r7xhd9o266H5cg07CQXp1Y4/tKLvHFpCttvo+LhOy6Op6CrGhMjQ7zn4Xdy1117wCng2BUUWdo205acuWhPfv7jbdvxcFwX1/VwPR9P/Fl3oliRO4+mUhQ5OD2lqSq6pmxrO3WH6Q7T9zPTbuO5w7R7mbblzK9CdmZD1/VWn2fo4fudh54CyJKCLK/eMiavnp5SZR796M4JdYfpVjKBqsqrTCqqKu0Cpt2o0+1j2m08d5h2H9NNOXPRnnr8N9u+7+H6Luue7oQsgSoryIoU3B1wO9odpjfPpKwelpFldg3TbtTprWDabTx3mHYP0/8Pht5QokD70psAAAAASUVORK5CYII=);}');
addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
addGlobalStyle('#footer_building_mortician {background-position:-148px 0;}');
addGlobalStyle('#footer_building_bank {background-position:-185px 0;}');
addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
addGlobalStyle('#footer_building_cityhall {background-position:-296px 0;}');
addGlobalStyle('#footer_trader_saloon {background-position:-333px 0;z-index:50}');
addGlobalStyle('.homeless #footer_building_gunsmith {background-position:0px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_tailor {background-position:-37px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_general {background-position:-74px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_saloon {background-position:-111px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_mortician {background-position:-148px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_bank {background-position:-185px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_church {background-position:-222px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_hotel {background-position:-259px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_cityhall {background-position:-296px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_trader_saloon {background-position:-333px 0;}');

//addGlobalStyle('#footer_menu_left #footer_trader_saloon {z-index:50; background-image:url(\'../images/itemtrader/haendler_btn.jpg\'); cursor:pointer; height:37px; position:absolute; width:37px;}');

function addFooterIcon(mylink,idname) {
    var head, style;
    footer_menu_left = document.getElementById('footer_menu_left').childNodes[1];
    if (!footer_menu_left) {return;}
    var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
    footer_menu_left.appendChild(iconlink);
	if ($('menu_townforum').className == 'inactive_menu') {
		footer_menu_left.setAttribute('class', 'homeless');
	}
}

addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon');
addFooterIcon('javascript:AjaxWindow.show(\'item_trader\');','footer_trader_saloon');

function addFooterAuthor(mylink,idname) {
    var head, style;
    main_container = document.getElementById('main_container').childNodes[13];
    if (!main_container) {return;}
    var mainfootnoteautor = document.createElement('div');
	mainfootnoteautor.setAttribute('class','main_footnote_autor');
	mainfootnoteautor.setAttribute('style','background:url("/images/main/bottom_slide_repeatx.png") repeat-x scroll center bottom transparent; cursor:default; float:left; height:14px; margin-left:6px; margin-right:6px; position:relative; top:12px;');
	mainfootnoteautor.innerHTML = "<div class=\"main_footnote_left\"></div><div class=\"main_footnote_right\"></div><div id=\"main_footnote_autor\">"+getAuthor()+"&nbsp;&nbsp;&nbsp;Version: "+getMoCheckVersion()+"</div>";
    main_container.appendChild(mainfootnoteautor);
//    main_footnotes.appendChild(mainfootnoteleft);
//    var mainfootnoteright = document.createElement('div');
//	mainfootnoteright.setAttribute('class','main_footnote_right');
//	mainfootnoteright.innerHTML = "";
//    main_footnotes.appendChild(mainfootnoteright);
//    var iconlink = document.createElement('a');
//	iconlink.setAttribute('href',mylink);
//	iconlink.innerHTML = "Autor";
//    main_footnotes.appendChild(iconlink);
}

addFooterAuthor();

function addEndDiv(code) {
    var bodyx, enddiv;
    bodyx = document.getElementsByTagName('body')[0];
    if (!bodyx) {return;}
    enddiv = document.createElement('script');
    enddiv.type = 'text/javascript';
    enddiv.innerHTML = code;
    bodyx.appendChild(enddiv);
}

addEndDiv('WMap.initialize();');