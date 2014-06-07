// ==UserScript==
// @name            TW Buildings Shortcut Icons by TVE
// @namespace       www.the-west.de
// @include         http://*.the-west.*
// @include         http://zz1w1.tw.innogames.net/game.php*
// @exclude         http://www.the-west.*
// @exclude         http://forum.the-west.*
// @author          Buddy Hill, darkyndy, xawy, TVE
// ==/UserScript==

// The West Buildings Shortcut Icons
// version 0.3 beta
// Copyright (C) 2009 The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// Initial author: Buddy Hill(http://userscripts.org/users/110945)
//
// Script adapted to v1.23 game version by darkyndy
//
// xawy:
//       - adjusted shortcuts position
//       - added background and border for shortcuts
//       - added Multilingual User Interface
//       - change shortcuts bar opacity when homeless
//
//       - 2010.01.21 - In version 1.25 the element with ID="curtain" is removed resulting script errors,
//                      fixed it by using element with ID="left_top"
//
//       - this is the same as previous: http://userscripts.org/scripts/show/62454 with icons centered under the header title
// --------------------------------------------------------------------

document.getElementById('head_title').style.display = "none";

//  #region functions
    function addFooterIcon(mylink, idname)
    {
        footer_menu_left_more = document.getElementById('footer_menu_left_more');
        if (!footer_menu_left_more) { return; }
        var iconlink = document.createElement('a');
        iconlink.setAttribute('href', mylink);
        iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
        footer_menu_left_more.appendChild(iconlink);
    }

    function setToolTip(strObjectName, strToolTipText)
    {
        var insertBeforeElement = document.getElementById('left_top');
        var newScriptElement = document.createElement('script');
        newScriptElement.setAttribute('type', 'text/javascript');
        var myScript = "window.addEvent('domready', function(){ $('" + strObjectName + "').addMousePopup(new MousePopup('" + strToolTipText + "')); });";
        newScriptElement.innerHTML = myScript;
        insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
    }

    function addGlobalStyle(css)
    {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {return;}
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function setOpacity(object, opacity)
    {
        var insertBeforeElement = document.getElementById('left_top');
        var newScriptElement = document.createElement('script');
        newScriptElement.setAttribute('type', 'text/javascript');
        var myScript = "window.addEvent('domready', function(){$('" + object + "').setOpacity(" + opacity + "); });";
        newScriptElement.innerHTML = myScript;
        insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
    }

    var $=unsafeWindow.$;

//  #endregion

try {
    var footer_menu_left = document.getElementById('menus');

var xTop = 50;

    if (footer_menu_left)
    {
        toolbarContainer = document.createElement('div');
        toolbarContainer.setAttribute('id', 'toolbarContainer');
        toolbarContainer.setAttribute('style', 'left: 0px; top: ' + xTop + 'px; width: 100%; height: 39px; position: absolute;');
        footer_menu_left.parentNode.insertBefore(toolbarContainer, footer_menu_left.nextSibling);

        center = document.createElement('center');

        footer_menu_left_more = document.createElement('div');
        footer_menu_left_more.setAttribute('id', 'footer_menu_left_more');
        footer_menu_left_more.setAttribute('style', 'background-position: 0px 0px; padding-top: -40px; padding-left: 1px; width: 484px; height: 37px;');

        center.appendChild(footer_menu_left_more);
        toolbarContainer.appendChild(center);

        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_sheriff\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_sheriff');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_market\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_market');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'fingerboard\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_fingerboard');
        addFooterIcon('javascript:AjaxWindow.show(\'profile\',{char_id:Character.playerId},Character.playerId);','footer_profile');


        var values = unsafeWindow.AjaxWindow.possibleValues;

        setToolTip('footer_building_gunsmith',  '<b>Büchsenmacher</b>');
        setToolTip('footer_building_tailor',    '<b>Schneider</b>');
        setToolTip('footer_building_general',   '<b>Gemischtwarenhändler</b>');
        setToolTip('footer_building_hotel',     '<b>Hotel</b>');
        setToolTip('footer_building_bank',      '<b>Bank</b>');
        setToolTip('footer_building_church',    '<b>Kirche</b>');
        setToolTip('footer_building_mortician', '<b>Bestatter</b>');
        setToolTip('footer_building_cityhall',  '<b>Stadthalle</b>');
        setToolTip('footer_building_saloon',    '<b>Saloon</b>');
        setToolTip('footer_building_sheriff',    '<b>Sheriff</b>');
        setToolTip('footer_building_market',    '<b>Markt</b>');
        setToolTip('footer_fingerboard',    '<b>Wegweiser</b>');
        setToolTip('footer_profile',    '<b>Profil</b>');
    }

    var imgIcons = 'http://malo.redio.de/scripte/TW_Buildings_Shortcut_Icons.png';

    addGlobalStyle('#abdorment_middle {display:none;}');
    addGlobalStyle('#footer_menu_left_more #footer_building_gunsmith, #footer_menu_left_more #footer_building_tailor,#footer_menu_left_more #footer_building_general,#footer_menu_left_more #footer_building_hotel,#footer_menu_left_more #footer_building_bank,#footer_menu_left_more #footer_building_church,#footer_menu_left_more #footer_building_mortician ,#footer_menu_left_more #footer_building_cityhall,#footer_menu_left_more #footer_building_saloon,#footer_menu_left_more #footer_building_sheriff,#footer_menu_left_more #footer_building_market,#footer_menu_left_more #footer_fingerboard,#footer_menu_left_more #footer_profile {background-image:url(' + imgIcons + '); width:37px; height:37px;}');

    addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
    addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
    addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
    addGlobalStyle('#footer_building_mortician {background-position:-148px 0;}');
    addGlobalStyle('#footer_building_bank {background-position:-185px 0;}');
    addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
    addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
    addGlobalStyle('#footer_building_cityhall {background-position:-296px 0;}');
    addGlobalStyle('#footer_building_sheriff {background-position:-333px 0;}');
    addGlobalStyle('#footer_building_market {background-position:-370px 0;}');
    addGlobalStyle('#footer_fingerboard {background-position:-407px 0;}');
    addGlobalStyle('#footer_profile {background-position:-444px 0;}');
} catch (err) { }
  
/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_123', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_123', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=123&version=1.2';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();