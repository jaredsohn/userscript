// The West Fullscreen skin
// version 0.4.3 beta
// Copyright (C) 2009 The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West Fullscreen skin
// @namespace      www.the-west.sk
// @description    Fullscreen skin for the west
// @include        http://*.the-west.*/game.php*
// @include        http://zz1w1.tw.innogames.net/game.php*
// ==/UserScript==


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


addGlobalStyle('body {padding:0;}');
addGlobalStyle('#map_wrapper {top:130px; left:-50px; right:-50px; bottom:0px; margin-bottom:-100px; position:absolute; width:auto; height:auto; overflow:hidden;}');
addGlobalStyle('#map {width:100%; height:100%;}');
addGlobalStyle('#map_mover {width:100%; height:100%; z-index:5;}');
addGlobalStyle('#fade_div {width:100%; height:100%;}');
addGlobalStyle('#map_arrows {width:100%; height:100%; position:absolute; z-index:8px; display:none;}');
addGlobalStyle('#map_place {top:0px; left:0px; right:0px; bottom:-130px; padding:0; margin:0; position:absolute; width:auto; height:auto;"}');
addGlobalStyle('#main_container {width:100%; position:absolute; height:100%; margin:0; top:0; left:0; background:none; padding:0; overflow:hidden; z-index:auto;}');
addGlobalStyle('#footer {width:100%; position:absolute; margin:0; top:100px; left:0; z-index:5;}');
addGlobalStyle('#footer_menu_left {z-index:6;}');
addGlobalStyle('#footer_menu_right {z-index:6;}');
addGlobalStyle('#head_container {width:100%; padding:0px;  background:none;}');
addGlobalStyle('#head_background {width:100%; background-position:top center; background-repeat:repeat-x; margin:0; position:absolute; height:100px; z-index:4;}');
addGlobalStyle('#border_cap {display:none;}');
addGlobalStyle('#abdorments {display:none;}');
addGlobalStyle('#left_menu {left:0;}');
addGlobalStyle('#right_menu {right:0;}');
addGlobalStyle('#menus {z-index:12;}');
addGlobalStyle('#map_scroll_bottom {left:50%; margin-left:-10px; bottom:0px; top:auto; z-index:7; position:absolute;}');
addGlobalStyle('#map_scroll_top {left:50%; margin-left:-10px; top:130px; z-index:7; position:absolute;}');
addGlobalStyle('#map_scroll_left {left:0; top:200px; z-index:7; position:absolute;}');
addGlobalStyle('#map_scroll_right {right:0; top:200px; z-index:7; position:absolute;}');
addGlobalStyle('#footer_menu_left {z-index:6;}');
addGlobalStyle('#current_task {height:auto;}');
addGlobalStyle('#window_bar {z-index:6; width:auto; bottom:0px; left:0px; margin:0px; height:auto;}');
addGlobalStyle('#forum_list {margin-top:10px;}');
addGlobalStyle('#scroll_to_fort_list{top: 40px !important; left: 130px !important;}');
addGlobalStyle('#chatwindow, .chatwindow_topfade{width:100%;background:url(../images/main/footer.png)}');
addGlobalStyle('#footer_menu_left{width:auto !important; position:absolute;top:0px !important;}');
addGlobalStyle('.bottomleftcurve, .bottomrightcurve{display:none;');
/*addGlobalStyle('#footer{display:none;');*/

var footer = $('footer');
var ntf=footer.getNext();
ntf.setStyles({
'left':'0px',
'marginLeft':'0px',
'top':'90px',
'width':'100%',
'height':'auto'
});
//footer.style.position = 'absolute';

$('footer_menu_right').removeClass('bottomrightcurve');
$('footer_menu_left').removeClass('bottomleftcurve');

$('footer_menu_left').setStyles({
'left':'130px',
'top':'0px',
'position':'absolute'
});
$('footer_menu_right').setStyles({
'left':'',
'right':'130px',
'position':'absolute'
});

var footer_server_time = document.getElementById('footer_server_time');
footer_server_time.style.position = 'absolute';
footer_server_time.style.top = '70px';
footer_server_time.style.left = '50%';
footer_server_time.style.color = 'black';
footer_server_time.style.width = '200px';
footer_server_time.style.textAlign = 'center';
footer_server_time.style.zIndex = '10';
footer_server_time.style.margin = '0 0 0 -100px';

/*var footercontainer=$('footer').getNext();
footercontainer.style.left='';
footercontainer.style.top='';
$$('.bottomleftcurve')[0].style.display='none';
$$('.bottomrightcurve')[0].style.display='none';*/


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


/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_62', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_62', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=62&version=0.4.3';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();