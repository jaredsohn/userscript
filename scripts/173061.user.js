// ==UserScript==
// @name           Quebec design
// @version        2.1
// @namespace      localhost
// @author         papa2009
// @description    Quebec design everywhere
// @match          http://*.e-sim.org/*
// @grant       none
// ==/UserScript==

var body = document.body;
var container = document.getElementById('container');
var container_info = document.getElementsByClassName('columns column-margin-both column-margin-vertical foundation-style canvaback foundation-shadow foundation-radius');
var shortcut = document.getElementsByClassName('smallHeaderSecond');
var shortcut_image = document.getElementsByClassName('button foundation-center foundation-style-group');
var hr = document.getElementsByTagName('hr');
var red_icon = document.getElementsByClassName('smallhelp button-group-notification icon-error2');
var daily_task = document.getElementsByClassName('animBreath2 button foundation-center foundation-style-group');
var time = document.getElementsByClassName('foundation-style panel callout');
var search = document.getElementById('searchForm');
var food_button = document.getElementById('eatButton');
var gift_button = document.getElementById('useGiftButton');
var medkit_button = document.getElementById('medkitButton');
var text = document.getElementsByClassName('smallHeaderSecond');
var text2 = document.getElementById('userName');
var text3 = document.getElementsByClassName('smallHeader plateHeader');
var text4 = document.getElementsByClassName('panelPlate foundation-style');
var label = document.getElementById('numero5');
var battle = document.getElementsByClassName('whiteBox');
var copyright = document.getElementsByClassName('foundation-style columns canvaback column-margin-both column-margin-vertical foundation-radius foundation-shadow');
var selectable = document.getElementById('selectable');
var selectable2 = document.getElementById('selectable2');
var child = selectable.firstChild;
var food_q1 = child.nextSibling;
var sibling = food_q1.nextSibling;
var food_q2 = sibling.nextSibling;
var sibling2 = food_q2.nextSibling;
var food_q3 = sibling2.nextSibling;
var sibling3 = food_q3.nextSibling;
var food_q4 = sibling3.nextSibling;
var sibling4 = food_q4.nextSibling;
var food_q5 = sibling4.nextSibling;
var g_child = selectable2.firstChild;
var gift_q1 = g_child.nextSibling;
var g_sibling = gift_q1.nextSibling;
var gift_q2 = g_sibling.nextSibling;
var g_sibling2 = gift_q2.nextSibling;
var gift_q3 = g_sibling2.nextSibling;
var g_sibling3 = gift_q3.nextSibling;
var gift_q4 = g_sibling3.nextSibling;
var g_sibling4 = gift_q4.nextSibling;
var gift_q5 = g_sibling4.nextSibling;
var fight_button = document.getElementsByClassName('fightButton');

body.setAttribute('id', 'bestBody');
body.setAttribute('style', 'background: url("http://tinyurl.com/lnu9y5n") no-repeat fixed 0% 0% / cover  transparent; padding-top: 45px');
container.setAttribute('class', 'foundation-style row foundation-radius');
container.setAttribute('style', 'background-color: rgba(255, 255, 255, 0.3);');
container_info[0].setAttribute('style', 'background: none repeat scroll 0 0 #F2F2F2; color: #000000; text-shadow: none;');
container_info[0].setAttribute('class', 'columns column-margin-both column-margin-vertical foundation-style foundation-shadow foundation-radius');
shortcut[0].setAttribute('style', 'color: #000000 !important; text-shadow: none;');
time[0].setAttribute('style', 'background: none repeat scroll 0 0 #00878B;');
food_button.setAttribute('style', 'height: 25px; padding: 3px 5px 5px;');
gift_button.setAttribute('style', 'height: 25px; padding: 3px 5px 5px;');
text2.setAttribute('style', 'color: #000000 !important; text-shadow: none;');
text3[0].setAttribute('class', 'smallHeader');
text3[0].setAttribute('class', 'smallHeader');
text3[0].setAttribute('class', 'smallHeader');
text4[0].setAttribute('style', 'font-size: 0.8125em !important;');
text4[0].setAttribute('class', 'foundation-style');
label.setAttribute('style', 'color: #F2F2F2 !important; text-shadow: none;');
copyright[0].setAttribute('style', 'background: none repeat scroll 0 0 #F2F2F2; color: #000000; text-shadow: none;');
copyright[0].setAttribute('class', 'columns column-margin-both column-margin-vertical foundation-style foundation-shadow foundation-radius');
selectable.setAttribute('style', 'height: 38px;');
selectable2.setAttribute('style', 'height: 38px;');
food_q1.setAttribute('style', 'height: 35px;');
food_q2.setAttribute('style', 'height: 35px;');
food_q3.setAttribute('style', 'height: 35px;');
food_q4.setAttribute('style', 'height: 35px;');
food_q5.setAttribute('style', 'height: 35px;');
gift_q1.setAttribute('style', 'height: 35px;');
gift_q2.setAttribute('style', 'height: 35px;');
gift_q3.setAttribute('style', 'height: 35px;');
gift_q4.setAttribute('style', 'height: 35px;');
gift_q5.setAttribute('style', 'height: 35px;');
search.setAttribute('style', 'border-top-right-radius: 0px; border-bottom-right-radius: 0px;');

if(battle[0])
{
    battle[0].setAttribute('style', 'background: none repeat scroll 0 0 #F2F2F2; color: #000000; text-shadow: none; width: 100%;');
    battle[1].setAttribute('style', 'background: none repeat scroll 0 0 #F2F2F2; color: #000000; text-shadow: none; height: 550px;');
    shortcut[0].setAttribute('style', 'display: none;');
    shortcut_image[0].setAttribute('style', 'display: none;');
    hr[0].setAttribute('style', 'display: none;');
    
    if(text[1])
    {
        daily_task[0].setAttribute('style', 'display: none;');
        text[1].setAttribute('style', 'display: none;');
        red_icon[0].setAttribute('style', 'display: none;');
    }
    
    if(fight_button[3])
    {
    }
    else if(fight_button[0])
    {
        fight_button[0].setAttribute('style', 'font-size: 15px !important;');
        fight_button[1].setAttribute('style', 'font-size: 15px !important;');
    }
}
else
{
    if(text[1])
    {
        text[1].setAttribute('style', 'color: #000000 !important; text-shadow: none;');
        red_icon[0].setAttribute('style', 'display: none;');
    }
} 

if(medkit_button)
{
    medkit_button.setAttribute('style', 'height: 25px; padding: 3px 5px 5px;');
}