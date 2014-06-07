// ==UserScript==
// @name           TW SmallInventPics
// @description Macht The West individuell
// @author Knight
// @namespace      http://twknight.tw.funpic.de/tw/inventar/twsmallinventpic.js
// @include        http://*.the-west.*/*
// ==/UserScript==

/*
TW SmallInventPics
*/
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Smaller buttons
addGlobalStyle('#bag {padding-right: 5px; width: 337px;}'); 
addGlobalStyle('#bag .bag_item, .own_inv .bag_item, .trader_inv .bag_item {background-image: url("http://twknight.tw.funpic.de/tw/inventar/images/bag.png"); height: 35px !important; width: 35px;}');
addGlobalStyle('#bag .bag_item img, .own_inv img, .trader_inv img {height: 35px!important; width: 35px;}'); 
addGlobalStyle('#bag .bag_item_count, .own_inv .bag_item_count {background: none !important; left: 2px; bottom: 5px; height: 10px !important; width: 20px !important; overflow: visible;}');
addGlobalStyle('#bag .bag_item_count p, .own_inv .bag_item_count p {font-size: 10px; margin: 0px !important;}'); 
addGlobalStyle('#bag .wear_yield_highlight, .own_inv .wear_yield_highlight {background-image: url("http://twknight.tw.funpic.de/tw/inventar/images/bag_highlight.png");}');
addGlobalStyle('.own_inv .bag_item_count {bottom: 15px !important; background: none !important;}');
addGlobalStyle('#window_inventory_content table {margin-left: 4px;}');
addGlobalStyle('.trader_inv .bag_item {margin-bottom: 18px;}');
addGlobalStyle('.price {font-size: 0.677em;}');
addGlobalStyle('.window_content .trader_inv {width: 310px;}');

//distances increased in inventory
addGlobalStyle('#window_inventory {height: 594px; width: 885px;}');
addGlobalStyle('#window_inventory .window_borders {background-image: url("http://twknight.tw.funpic.de/tw/inventar/images/borders_window_large.png"); height: 594px; width: 885px;}');
addGlobalStyle('#window_inventory_title {width: 885px;}');
addGlobalStyle('#window_inventory_content {height: 546px; width: 855px;}');
addGlobalStyle('tr .shadow_content #bag {width: 497px; height: 446px;}');

//Distances increased in shops
addGlobalStyle('div[id *= "window_building_tailor_"], div[id *= "window_building_gunsmith_"], div[id *= "window_building_general_"] {height: 594px; width: 885px; top: 75px;}');
addGlobalStyle('.window_borders .window_content {top: 26px;}');
addGlobalStyle('div[id *= "window_building_tailor_"] .window_borders, div[id *= "window_building_gunsmith_"] .window_borders, div[id *= "window_building_general_"] .window_borders {background-image: url("http://twknight.tw.funpic.de/tw/inventar/images/borders_window_large.png"); height: 594px; width: 885px;}');
addGlobalStyle('div[id *= "window_building_tailor_"] .shadow_content .trader_inv, div[id *= "window_building_gunsmith_"] .shadow_content .trader_inv, div[id *= "window_building_general_"] .shadow_content .trader_inv {height: 400px; width: 330px;}');
addGlobalStyle('div[id *= "window_building_tailor_"] .window_title, div[id *= "window_building_gunsmith_"] .window_title, div[id *= "window_building_general_"] .window_title {width: 885px;}');
addGlobalStyle('div[id *= "window_building_tailor_"] .shadow_content .own_inv, div[id *= "window_building_gunsmith_"] .shadow_content .own_inv, div[id *= "window_building_general_"] .shadow_content .own_inv {height: 500px; width: 470px;}');

//distances increased in raw material warehouse
addGlobalStyle('div[id *= "window_fort_building_storage_"] {height: 594px; width: 885px; top: 75px;}');
addGlobalStyle('div[id *= "window_fort_building_storage_"] .window_borders {background-image: url("http://twknight.tw.funpic.de/tw/inventar/images/borders_window_large.png"); height: 594px; width: 885px}');
addGlobalStyle('.shadow_content .storage_inv {height: 450px !important;}');
addGlobalStyle('div[id *= "window_fort_building_storage_"] #storage_tab_storage div[style = "position: absolute; right: 10px;"] {right: 40px !important;}');
addGlobalStyle('div[id *= "window_fort_building_storage_"] .shadow_content .own_inv {width: 480px; height: 452px !important;}');
addGlobalStyle('div[id *= "window_fort_building_storage_"] div[style = "width: 695px; height: 33px; margin-top: 5px; position: absolute; bottom: 5px;"] {bottom: 63px !important;}');
addGlobalStyle('div[id *= "window_fort_building_storage_"] div[style = "width: 695px; height: 33px; margin-top: 5px; position: absolute; bottom: 5px;"] input[style = "text-align: right;"] {position: relative; bottom: -1px;}');
addGlobalStyle('div[id *= "window_fort_building_storage_"] div[style = "width: 695px; height: 33px; margin-top: 5px; position: absolute; bottom: 5px;"] span[style = "padding: 0pt 3px;"] a {position: relative; bottom: -1px;}');
addGlobalStyle('div[id *= "window_fort_building_storage_"] .window_title {width: 885px;}');