// ==UserScript==
// @name Feedly Enhancer
// @namespace http://userscripts.org/users/515061
// @description Enhances the left pane in feedly.
// @include    	http://feedly.com/*
// @include    	https://feedly.com/*
// @include   http://www.feedly.com/*
// @include    	https://www.feedly.com/*
// @include   http://cloud.feedly.com/*
// @include        https://cloud.feedly.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @downloadURL https://userscripts.org/scripts/source/166388.user.js
// @updateURL   https://userscripts.org/scripts/source/166388.meta.js
// @version    	2.3.2
// @run-at     document-end
// @require https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @license    	Creative Commons; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @license    	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


//If you like this script, please consider donating with bitcoin: 1GqUwzoKxNjjYwh3vEMTn5hZv4PdimTb6S


var DEBUG_MODE = false;
//Icons
var PLUS_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QARABEAERSEuVjAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QoZFikCtzaE4AAAAC5JREFUGNNj/P//PwMycHV1/c/AwMCwe/duRmRxJgYiAfUVMrq4uPynrolDwNcArKQP11nqnLEAAAAASUVORK5CYII=";
var PLUS_ICON_WHITE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QARABEAERSEuVjAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QoZFikhFVH1kgAAACZJREFUGNNj/P//PwMagAkwIgsyMRAJqK+QBclNuNxKuomMg9zXALlGBxS2xqKSAAAAAElFTkSuQmCC";
var MINUS_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QARABEAERSEuVjAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QoZFio7wx5fKwAAACBJREFUGNNj/P//PwMxgImBSEB9hYwuLi7/qWviEPA1AGtMB9fkJpPZAAAAAElFTkSuQmCC";
var MINUS_ICON_WHITE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QARABEAERSEuVjAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QoZFioeiBqLbAAAACFJREFUGNNj/P//PwMxgImBSEB9hSwMDAz/qW4i4yD3NQDKAwQVbLpxVAAAAABJRU5ErkJggg==";
var EMPTY_BOX_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA7SURBVChTjcrBBgAhFEDRPv19biIjkkQmcfe3sz4p3tz3G942vGV40/CG4XXDa4b3GV41vGJ42fBcxAEQD6Fn/Be+lQAAAABJRU5ErkJggg==";
var TICK_BOX_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADYSURBVChTjZExDkRAFIZ3N04gm0yncwJxAWSaadyCUiIRnVqhEYUCJ1C5gTuoVA6gVFHYP3kTGmS/YubN/768mWTepmn6vv96pG1bBZJt2zK4Yl1XrB86fG/Ytk3X9dO7JMsyz/OovvWSJOn7Hisdrz20MSwIAsMwKDm9OI6rqkIxDAOkMAwty6IWUGhL07QoChR4e9M0mqYJIaglqet6mqZlWfBkVVUpdBwHCbHvO5zz3iiK8jwnlXNO4YG8FzDGXNed57nrOhQyPcDMcRwx/AE4f/1vWZY/73B1PzG6eAwAAAAASUVORK5CYII=";
var QUICK_MENU_TICK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QQZDwUBu8mYagAAAQlJREFUKM+dkcFKw0AURc9kIWQMaCNVUDH9EHeCfyLuIqgboei2tbgIYtHYFqX+kpVA0279gdiJk8m40GqVouB7y3fh3XuusPw+Dv8VXESNMwDs3G1FPRvb+olFzPPQilbCGhNSxvU5gvPID2vAE2Ny1wF42Lnbm56bUSUMsAwYGuVeKQf627rvxe0DgEZUCQNKBgzNq9dWIO53TW9tY4FHo4/0pn8cYElIjfauFYDousXLEqtMeMahiiAhLfXijXp/KSyXssyWWcdggITUahmrqSdhgaY0mc8WhoSR1fJWfWX6iHkqi6xKwchq2VGzoT85HMoyU0XhdfLvVGZA7cvCdPOf2MRfdb8BjCZ5yPlGomUAAAAASUVORK5CYII=";
var QUICK_MENU_CROSS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QQZDwUbRqthEAAAAZBJREFUKM9VkU9IFGEYxn+fX6mndHPAU0qwSgfpYs2MKIpnT3UQorun2YIVcfESEsSCCCM72DGwi9RJL7tqWATToaSLYOC/QBCiVVFsQd355u2wY0vP7cfD+8LzPOoLNY2nZ3f5pzo1AGR11m/byfrX9n8UEuLMj8uKjInjh4Q4BU9WxBNnPiREfWai0Of1sU8XJTbn0A+8IfZI84mNYCaj7HTbzlP2AEU3a9xkiG0AunnDaadeOFm2DuzbGCLK2NxhiwhDxAeOgvyiWgWmCu3ePRTQgCCAsEU5eJUB/YSY4eKyVbFbMETJ9Q/KwctMTMwNk6RppVqvgVscmZqjR4l5UejxHA6JMBgMgsuF+y41WIrRo0z7Pc96+ZY8N8REHPKQK/e9NVhU9++27o+wQQzALxTtScUOS5x1av90LfXTbUIw/OY8uPx6ZTcjGL5zFkwt6scMlNatqt3IMX+CXGaguG5V7SaOOX+d8wT9CKG/+DFVcS/nJp9LjayKfRFMeoKg3ibB8h25g3rMfDqXzP0XyuiqqoIv4z4AAAAASUVORK5CYII=";
var PERSONALISE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QoZFg07GdvtTgAAAq5JREFUaN7tms9rE0EUx7/fmaRStLRSBYm2By+FgljwJKUQNgXNHyB6KeLJm3jw4qEoiCBoT/4BHnqJKFLwEDQ7e0kugtBWEHuzCqLUaluh3Ww1+7zkYrG6SZpmN8z3uMx7s595b978YAArKyurNoqtOhgdHU1nMpkRERmI0l5EaiKymUqltnzfX69UKquxBXQcZ4JkgWSmWR8isglgCcAbkl4Yhi89z1uJAyBzudwyyeG9HHERqQF4RnLGdd1XHQOcnJwcAvCxneklIo8A3DDGfG/Wh2qh88G2FwjyCoCFbDY7su+A+1YFySGtdblZyNgD1iGPaq0fZ7PZA43apto8h34AKO+Y8/0kDwPIABhoAPK01vomgNv7UmRyudwYyfn/AC4aY8Z269txnDGS10lORfyXbySHS6XSVhJSVDzPmzfGXAZwEcCvCDaDtVrtQuLmoOu6TwDciZiquUQWmXQ6fU9Eoqx3E4kELBaL2ySfRojg8cQuE2EYvo0S7MQCKqU+77nPmEVQdzUgyWMRmlWTvFU7G2F39D6RgOPj44cAnIvQ9HVs9qKNqLe39xqA/ghp7CUugo7jTIjIrQjpGVSr1bnERLB+YXUVwH0APRFMZiuVynpsAEn2OY5zfse3gyJyhOQZknkAJyK685VSd2N1HgRwUilV/At4M76mS6XSclee6AEUXNed6dYri8La2tpUs8apGINVRWTaGPOga7Zq9aUgBFAgeapVuNhEUERCkgsiMqeUmm2mmHQKcB3Aiz9ZZBvAFsmvYRh+UkotBUGw2Oj6FgtAEflgjLnU0TMmulwW0AJaQAtoAS2gBbSAFrD7AOsPdv4pkrXEAm5sbLwTkecAfu4yACsAHnYasOXHePl8vsf3/SGtdV8YhkprvR0EwWq5XP4CKysrq27XbybG9Qm1rU5oAAAAAElFTkSuQmCC";
var PERSONALISE_ICON_WHITE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QoZFiUuKVunDwAAAntJREFUaN7tmrFr00EUx9/7XX81GEMTURE13UInUXEQh0wO6h8gOCj+A+Li5CAGRHDQyb0gXWp1KDjp4NK1lFr4oRCIqVAMGqSkP5vmLve+Lh1qQLk2ifn9wn3H473jPnfv7t07jsjLy8triOJ+O4iiKCyVSjPMnHd0sQB+AdjWWm/mcrlmYmfHGFMWkQ30IRGJRWRZRGattbfiOD6RCLhKpcIiso4BS0S6IrJgjLk0UsB2u13EkCUis61W6+hIALXW5/EfJCJfO53OzEHHGST+FGQuhmG4dFDIxAPuQh4Pw/BVvV4/tF/fiWEODECLiJZ60tIUERWI6NQ+Ugsx87np6ekHRFRJzB4UkdV/ncJa6wsi8lJExHE/NhuNxuFUAP6R+a29ISLGBdJaeyd1e1Ap9RrAY8dQvZLKQ6ZWqz0F8NPBtJxKwFKppInojYPp6dSmCQCRQ4iGac6D3wbdYdIA1bgDnnQI453UAjLzZQezL6kEbDabR4joqoPpcioBC4XCPWaecgjRD6kDNMaUmfmRA1xna2trMTWAURSF1tq7Sqn3zDzp4DKXz+c3E1MuEVGu2+1e62nLMvMxZr5IRNeZ+YzjJaCttX4ydk8We6qI+2Nb0QOYV0o9H0tAAPMrKyu3D+o/kWCwHQAPlVLPxumqRgAEwLwx5my/cIlZQQBCRKsAFo0xc5lMpj6ovof9qrZJRO/2NhGRJqJtIvoBYAPA5ziOP+43vyVlBdeDILg5yuhIRZrwgB7QA3pAD+gBPaAH9IAesEd2QDbJBFxbW/sE4C0A85dS6TuAF6MG7PszXrVanSwWi8UgCHK7E6aNMc1sNtsgLy8vr3HXb4AObUdl0esWAAAAAElFTkSuQmCC";
var NEXT_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB90KFw4CAN2inV4AAAETSURBVDjL7dS9SoNBEIXhZ0IiWIh4C/Za6i2kSG2KtEHFMjfiJeR2tJMkEBCUWERBwd/Gbm1GiRrjXxrBgcPHzp7zst8ybJRSzLMq5lx/BBgRtYhY+ikkIpYiova8XsQ+DrFeSvEdYT2z+8nSRh8DHGDzG7DNzAyS0a4kdQFVrKAbEY0v/GYD3cxUk7EoF7s4mVAf2zNOtp2eycwuqpOmHYxwljpFawqslXvPvhF2XvbfmDtpOMcYF2giUs3sjdMzQucVY8oJ9nCMK1zmdys12TvG3rv8B3dURw+3uMZN6jp7PdSnZmdc/AaO8ID71EPCPhytz+ZsFUM8poZYnZWJz56viFjOEYG1UsrdTP//e/jregIcTE6PnTzkPAAAAABJRU5ErkJggg==";
var PREV_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB90KFw06K2THZrwAAAD/SURBVDjL7dM7SgNRGMXxXxzwUaZ2A1ZpFQvtXEVsAoKIpWDlHrIFSxfgDqx9IioYsDAiCAZTaFRQmzMgGB9Ryxw4zPDd8/2Z+907DPWJxuJ/0SRO4sm/wqZwjF58nNqvNIP9gLpxD7uYHhS2gAPc4zbP9+8HyfxIDZyhg5t8WSPuptZJpvEdbBUtXMXXWEQRL6ZWrrfS80EFlnGOi/gU9T7ZetbK3Hl6ixI0jiWs4zW+QxObfYCHeEANo6hgDo84KrCCtRQqmdMGtr4YzR4uMZsL/4x5PI0EBC9oZybbPzi87WTb6VWyJrK9nWxjUNXS2wyLzKL6hz+qGsZQ/6A3n4hKDE31z3YAAAAASUVORK5CYII=";

var LEFT_PANE_INCREASE_PIXELS = 70;
var closedGroups = [];
var removeMoreSources = false;
var removeBlankSpace = false;
var toDisplayHiddenCount = false;
var toIncreaseLeftPane = false;
var toDisplayPrevNextButtons = false;
var feedlyTabsObserver = null;
var groupObserver = null;
var leftPaneMinimizeObserver = null;
var feedlyTabsHolderObserver = null;
var feedlyCenterObserver = null;


function debug(message) {
    if (DEBUG_MODE) {
        console.debug('Feedly Enhancer' + ': ' + message);
    }
}

function capitalizeFirstLetter(s){
    return s[0].toUpperCase() + s.slice(1);
}

function addCssStyle(css){
    if (typeof GM_addStyle !== "undefined") {
        GM_addStyle(css);
    } else {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
}





function toggleSetting(id){
    if(GM_getValue(id, false) == true) GM_setValue(id, false);
    else GM_setValue(id, true);
    $('#menuHolder').triggerHandler(id, [GM_getValue(id, false)]);
}



//Add mouseover titles + fix button
function fixTabs(){
    //Add tooltip to tab icons
    $('#mytab_icon').attr('title', capitalizeFirstLetter($('#mytab_label').text()));
    $('#savedtab_icon').attr('title', capitalizeFirstLetter($('#savedtab_label').text()));
    var organizeTabIcon = $('#organizetab_label').prev();
    organizeTabIcon.addClass('fePersonaliseIcon');
    organizeTabIcon.attr('title', capitalizeFirstLetter($('#organizetab_label').text()));
    organizeTabIcon.attr('data-uri', $('#organizetab_label').attr('data-uri'));
    organizeTabIcon.attr('src',PERSONALISE_ICON);
}





function buildMenu(){
    var menuTop = $('<div/>', {'id': 'menuTop'}).css('display', 'inline');
    var menuBottom = $('<div/>', {'id': 'menuBottom'});
    var menuImg = $('<img/>', { 'id': 'menuImg', 'src': PLUS_ICON, 'class':'feMenuBox', 'align': 'right' }).click(function(){
        $('#extraMenu').toggle(250,function(){
            if($('#extraMenu').is(':visible')) {
                if($('#feedlyCenter').hasClass('light')){
                    $('#menuImg').attr('src', MINUS_ICON);
                }else{
                    $('#menuImg').attr('src', MINUS_ICON_WHITE);
                }
            }
            else{
                if($('#feedlyCenter').hasClass('light')){
                    $('#menuImg').attr('src', PLUS_ICON);
                }else{
                    $('#menuImg').attr('src', PLUS_ICON_WHITE);
                }
            }
        });
    });
    var extraMenu = $('<div/>', {'id': 'extraMenu'}).css('display', 'block').hide();
    var menuHolder = $('<div/>', { 'id': 'menuHolder'}).css('line-height', '17px');
    var quickMenu = $('<div/>', { 'id': 'quickMenu'}).css('display', 'inline');
    menuBottom.append(extraMenu);
    menuTop.append(quickMenu).append(menuImg);
    menuHolder.append(menuTop).append(menuBottom).prependTo('#feedlyTabs');
    
    
}



function getNewExtraMenuRow(id, description){
    var rowId = id + 'Row';
    var row = $('<div/>', {'id': rowId}).append($('<img/>', {'src':EMPTY_BOX_ICON, 'class':'feMenuItemBox'}).click(function(){
        toggleSetting(id);
    })).append(description);
    $('#menuHolder').on(id, function(e, value){
        if(value)  $('#'+rowId + ' img.feMenuItemBox').attr('src',TICK_BOX_ICON);
        else $('#'+rowId + ' img.feMenuItemBox').attr('src',EMPTY_BOX_ICON);
    });
    return row;
}

function getNewQuickMenuButton(id, description){
    var quickId = id + 'Quick';
    var button = $('<img/>', {'id': quickId, 'src':QUICK_MENU_CROSS, 'title':description, 'class':'feQuickMenuButton', 'align': 'right'}).click(function(){
        toggleSetting(id);
    });
    $('#menuHolder').on(id, function(e, value){
        if(value)  $('#'+quickId).attr('src',QUICK_MENU_TICK);
        else $('#'+quickId).attr('src',QUICK_MENU_CROSS);
    });
    return button;
}


function addMenuElement(id, description, addToQuickMenu, functionToCall){
    var extraMenu = $('#extraMenu');
    var quickMenu = $('#quickMenu');
    extraMenu.append(getNewExtraMenuRow(id, description));
    if(addToQuickMenu) quickMenu.prepend(getNewQuickMenuButton(id, description));
    $('#menuHolder').on(id, function(e, value){
        functionToCall(value);
    });
    $('#menuHolder').triggerHandler(id, [GM_getValue(id, false)]);
}


function addMenuRows(){
    addMenuElement('showQuickMenu', 'Show Quick Menu', false, showQuickMenu);
    addMenuElement('setRemoveMoreSourcesButtons', 'Remove More Sources Buttons', true, setRemoveMoreSourcesButtons);
    addMenuElement('setRemoveBlankSpacesBetweenGroups', 'Compact Groups', false, setRemoveBlankSpacesBetweenGroups);
    addMenuElement('compactTopLeftPane', 'Compact Top Of Left Pane', true, compactTopLeftPane);
    addMenuElement('removeAllTab', 'Remove The All Group', true, removeAllTab);
    addMenuElement('increaseLeftPane', 'Increase Width Of Left Pane', false, increaseLeftPane);
    addMenuElement('displayHiddenCount', 'Display Hidden Source Count Next To Group', false, displayHiddenCount);
    addMenuElement('expandAllGroupsOnLoad', 'Expand All Groups On Load', false, expandAllGroupsOnLoad);
    addMenuElement('addPrevNextButtons', 'Add Navigation Buttons To Title Bar', false, addPrevNextButtons);
}


/////////////////////////////////////
//////////CSS
//////////////////////////////////////


function addFECssStyles(){
    addCssStyle(
        ".floatingBarShow { display: block !important; }" +
        ".feedlyPageHeaderMarginTop { margin-top: 12px !important; margin-bottom: 19px !important;}" +
        
        ".feMenuBox { cursor: pointer; width: 10px; height: 10px; margin-top:10px; opacity:0.3; }" +
        ".feMenuBox:hover { opacity:0.7; }" +
        
        ".feMenuItemBox { cursor: pointer; width: 10px; heigh: 10px; margin-top:4px; margin-right:10px; opacity:0.5; }" +
        ".feMenuItemBox:hover { opacity:0.8; }" +
        
        ".feQuickMenuButton { cursor: pointer; width: 11px; heigh: 11px; margin-top:10px; opacity:0.5; }" +
        ".feQuickMenuButton:hover { opacity:0.8; }" +
        
        ".fePersonaliseIcon { width: 18px !important; height: 18px !important; margin-top:5px; margin-right: 6px;}" + 
        
        ".feHideElement { display: none !important; }" + 
        ".feInlineBlock { display: inline-block !important; }" +
        ".feRemoveHeight{ height: 0px !important; }" + 
        ".feTabParents { margin: 0 0 0 0 !important;line-height: 15px; }" + 
        ".feOrganizetabIconFix { vertical-align: top; margin-left: 5px;}" +
        ".feNavSelectorHolder{height:30px !important;}" +
        ".feNavSelector{padding-bottom:0px; padding-top: 0px;}" +
        ".feMarginTopMinus5{margin-top: -5px;}"
        
        
    );
}



function addLeftPaneCssStyles(){
    var feedlyPageWidth = $('#feedlyPage').width() - LEFT_PANE_INCREASE_PIXELS;
    var feedlyTabsWidth = $('#feedlyTabs').width() + LEFT_PANE_INCREASE_PIXELS;
    var feedlyTabsHolderWidth;
    var mainBarMarginLeft;
    if($('#box').hasClass('wide')){ //left bar maximized
        feedlyTabsHolderWidth = $('#feedlyTabsHolder').width() + LEFT_PANE_INCREASE_PIXELS;
        mainBarMarginLeft = parseInt($('#mainBar').css('margin-left'), 10) + LEFT_PANE_INCREASE_PIXELS;
    }else{
        mainBarMarginLeft = parseInt($('#mainBar').css('margin-left'), 10) + LEFT_PANE_INCREASE_PIXELS + 174;
        if($('#feedlyTabsHolder').hasClass('picturePicture')){ //Tab bar shown
            feedlyTabsHolderWidth = $('#feedlyTabsHolder').width() + LEFT_PANE_INCREASE_PIXELS;
        }else{
            feedlyTabsHolderWidth =  $('#feedlyTabsHolder').width() + LEFT_PANE_INCREASE_PIXELS + 174;
        }
    }
    var styles = '.feFeedlyTabsHolder{width:' + feedlyTabsHolderWidth + 'px !important;}' +
        '.feFeedlyTabs{width:' + feedlyTabsWidth + 'px !important;}' +
        '.feMainBar{margin-left:' + mainBarMarginLeft + 'px !important;}' +
        '.feFeedlyPage{width:' + feedlyPageWidth + 'px !important;}';
    addCssStyle(styles);
}

////////////////////////////////



function showQuickMenu(toShow){
    if(toShow) $('#quickMenu').show();
    else $('#quickMenu').hide();
}


function setRemoveMoreSourcesButtons(toRemove){
    removeMoreSources = toRemove
    $('#feedlyTabs').find('div .list').each(function(){
        removeMoreSourcesFromGroup($(this));
    });
}

function removeMoreSourcesFromGroup(group){
    group.find('.moreHandle').each(function(){
        if(removeMoreSources) $(this).addClass('feHideElement');
        else $(this).removeClass('feHideElement');
    });
}



function setRemoveBlankSpacesBetweenGroups(toRemove){
    removeBlankSpace = toRemove;
    $('#feedlyTabs').find('div .list').each(function(){
        removeBlankSpaceFromGroup($(this));
    });
}

function removeBlankSpaceFromGroup(list){
    if(list.children().size() > 0 ) {
        if(removeBlankSpace) list.children().last().addClass('feRemoveHeight');
        else list.children().last().removeClass('feRemoveHeight');
    }
}





function compactTopLeftPane(toCompact){
    $('#organizetab').addClass('feOrganizetabIconFix');
    if(toCompact){
        $('#navSelector_my').addClass('feNavSelector');
        $('#navSelector_store').addClass('feNavSelector');
        $('#navSelectorHolder').addClass('feNavSelectorHolder');
        $('#mytab').parent().addClass('feTabParents');
        $('#mytab_label').addClass('feHideElement');
        $('#savedtab_label').addClass('feHideElement');
        $('#addtab_icon').next().addClass('feHideElement');
        $('#exploretab_label').addClass('feHideElement');
        $('#organizetab_label').addClass('feHideElement');
        $('#mytab').addClass('feInlineBlock');
        $('#savedtab').addClass('feInlineBlock');
        $('#exploretab').addClass('feInlineBlock');
        $('#organizetab').addClass('feInlineBlock');
        $('#latesttab').parent().addClass('feMarginTopMinus5');
    }else{
        $('#navSelector_my').removeClass('feNavSelector');
        $('#navSelector_store').removeClass('feNavSelector');
        $('#navSelectorHolder').removeClass('feNavSelectorHolder');
        $('#mytab').parent().removeClass('feTabParents');
        $('#mytab_label').removeClass('feHideElement');
        $('#savedtab_label').removeClass('feHideElement');
        $('#addtab_icon').next().removeClass('feHideElement');
        $('#exploretab_label').removeClass('feHideElement');
        $('#organizetab_label').removeClass('feHideElement');
        $('#mytab').removeClass('feInlineBlock');
        $('#savedtab').removeClass('feInlineBlock');
        $('#exploretab').removeClass('feInlineBlock');
        $('#organizetab').removeClass('feInlineBlock');
        $('#latesttab').parent().removeClass('feMarginTopMinus5');
    }
}




function removeAllTab(toRemove){
    if(toRemove) $('#latesttab_header').hide();
    else $('#latesttab_header').show();
}




function increaseLeftPane(toIncrease){
    toIncreaseLeftPane = toIncrease;
    modifyLeftPaneWidth();
}

function modifyLeftPaneWidth(){
    var leftPaneminimized = true;
    if($('#box').hasClass('wide')) leftPaneminimized = false;
    if(toIncreaseLeftPane){
        $('#feedlyTabsHolder').addClass('feFeedlyTabsHolder');
        $('#feedlyTabs').addClass('feFeedlyTabs');
        if(leftPaneminimized){
            $('#mainBar').removeClass('feMainBar');
            $('#feedlyPage').removeClass('feFeedlyPage');
        }else{
            $('#mainBar').addClass('feMainBar');
            $('#feedlyPage').addClass('feFeedlyPage');
        }
    }else{
        $('#feedlyTabsHolder').removeClass('feFeedlyTabsHolder feFeedlyTabsHolder');
        $('#feedlyTabs').removeClass('feFeedlyTabs feFeedlyTabs');
        $('#mainBar').removeClass('feMainBar');
        $('#feedlyPage').removeClass('feFeedlyPage');
    }
}


function displayHiddenCount(toDisplay){
    toDisplayHiddenCount = toDisplay;
    $('.moreHandle').each(function(){
        updateHiddenCount($(this));
    });
}

function updateHiddenCount(moreHandle){
    var id = moreHandle.parent().attr('id');
    var labelId = $('#'+id.slice(0, id.lastIndexOf("_") + 1) + 'label');
    if(toDisplayHiddenCount){
        var numberOfExtraSources = moreHandle.text().replace(/(^\d+)(.+$)/i,'$1');
        if(labelId.attr('data-hiddencount') == 'true'){
            //Change value
            var text = labelId.text().slice(labelId.text().indexOf(')') + 2); //Removes previous value from label
            labelId.text('(' + numberOfExtraSources + ') ' + text);
        }else{
            //Add value
            labelId.attr('data-hiddencount', 'true');
            labelId.text('(' + numberOfExtraSources + ') ' + labelId.text());
        }
    }else{
        //Remove value if it exists
        if(labelId.attr('data-hiddencount') == 'true'){
            labelId.removeAttr('data-hiddencount');
            var text = labelId.text().slice(labelId.text().indexOf(')') + 2);
            labelId.text(text);
        }
    }
}


function expandAllGroupsOnLoad(toExpand){
    setTimeout(function(){
        if(toExpand){
            $('.icon.handle').each(function(){
                var expanded = true;
                if($('#'+$(this)[0].id).parent().next().height() == 0) expanded = false;
                if(!expanded && closedGroups.indexOf($(this)[0].id) < 0){
                    $(this).click();
                }
            });
        }
    },200);
}


function addPrevNextButtons(toAdd){
    if(toAdd){
        $("#nextPrevHolderFloating .feNextButton").show();
        $("#nextPrevHolderFloating .fePrevButton").show();
        $("#nextPrevHolderPageHeader .feNextButton").show();
        $("#nextPrevHolderPageHeader .fePrevButton").show();
        $('#feedlyPageHeader').addClass('feedlyPageHeaderMarginTop');
    }else{
        $("#nextPrevHolderFloating .feNextButton").hide();
        $("#nextPrevHolderFloating .fePrevButton").hide();
        $("#nextPrevHolderPageHeader .feNextButton").hide();
        $("#nextPrevHolderPageHeader .fePrevButton").hide();
        $('#feedlyPageHeader').removeClass('feedlyPageHeaderMarginTop');
    }
    
}





function addPageActions(){
    var nextPrevHolder = $('<div/>', {'data-page-action':''}).css('float', 'right');
    
    var nextButton = $('<img/>', {'src':NEXT_ICON, 'title':'Next Item', 'class':'feNextButton pageAction requiresLogin', 
                                  'width':'18', 'height':'18', 'data-page-action':'', 'onclick':'javascript:void(keyboardSimulator(106));'}).css('display', 'inline');
    
    var prevButton = $('<img/>', {'src':PREV_ICON,  'title':'Previous Item', 'class':'fePrevButton pageAction requiresLogin', 
                                  'width':'18', 'height':'18', 'data-page-action':'', 'onclick':'javascript:void(keyboardSimulator(107));'}).css('display', 'inline');
    
    nextPrevHolder.append(prevButton).append(nextButton);
    $("#floatingBar .pageActionBar").after(nextPrevHolder.css('padding-right', '212px').css('padding-top', '4px').attr('id', 'nextPrevHolderFloating'));
    $("#feedlyPageHeader .pageActionBar").after(nextPrevHolder.clone().css('padding-right', '30px').css('padding-top', '4px').attr('id', 'nextPrevHolderPageHeader'));
    $("#nextPrevHolderFloating .feNextButton").css('padding-left', '0px');
    $("#nextPrevHolderFloating .fePrevButton").css('padding-right', '0px');
}



function injectKeyboardSimulationScript(){
    var keyboardSimulator = document.createElement("script");
    keyboardSimulator.setAttribute("type", "application/javascript");
    keyboardSimulator.textContent = function keyboardSimulator(keyCode){
        var e = document.createEvent('KeyboardEvent');
        // Chrome Hacks
        Object.defineProperty(e, 'keyCode', {
            get : function() {
                return this.keyCodeVal;
            }
        });
        Object.defineProperty(e, 'charCode', {
            get : function() {
                return this.keyCodeVal;
            }
        });  
        Object.defineProperty(e, 'which', {
            get : function() {
                return this.keyCodeVal;
            }
        });   
        Object.defineProperty(e, 'metaKey', {
            get : function() {
                return false;
            }
        }); 
        
        if (e.initKeyboardEvent) {
            e.initKeyboardEvent("keypress", true, true, document.defaultView, false, false, false, false, keyCode, keyCode);
        } else {
            e.initKeyEvent("keypress", true, true, document.defaultView, false, false, false, false, keyCode, 0);
        }
        e.keyCodeVal = keyCode;
        document.getElementById('feedlyPart0').dispatchEvent(e);
    };
    
    document.body.appendChild(keyboardSimulator);
}


function updateIconColours(){
    if($('#feedlyCenter').hasClass('light')){
        $('#organizetab_label').prev().attr('src',PERSONALISE_ICON);
        if($('#extraMenu').is(':visible')) {
            $('#menuImg').attr('src', MINUS_ICON);
        }else{
            $('#menuImg').attr('src', PLUS_ICON);
        }
    }
    if($('#feedlyCenter').hasClass('dark')){
        $('#organizetab_label').prev().attr('src',PERSONALISE_ICON_WHITE);
        if($('#extraMenu').is(':visible')) {
            $('#menuImg').attr('src', MINUS_ICON_WHITE);
        }else{
            $('#menuImg').attr('src', PLUS_ICON_WHITE);
        }
    }
}

////////////////////////////////
///// Observer
////////////////////////////////


function initFeedlyTabsObserver(){
    if (feedlyTabsObserver == null && $('#feedlyTabs').length > 0) {
        feedlyTabsObserver = new MutationObserver(function(mutations) {
            var menuHolderRemoved = false;
            mutations.forEach(function(mutation) {
                if (mutation.type == "childList"){
                    if(mutation.removedNodes.length > 0){
                        for(var i = 0; i < mutation.removedNodes.length; i++){
                            if(mutation.removedNodes[i].id == 'menuHolder') menuHolderRemoved = true;
                        }
                    }
                }
            });
            if(menuHolderRemoved) {
                debug('Menu removed - adding menu');
                initializeMenu();
            }
        }).observe(document.getElementById("feedlyTabs"), { childList: true});
    }
}


function initGroupObserver(){
    if (groupObserver == null && $('#feedlyTabs').length > 0) {
        groupObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type == "childList" && mutation.addedNodes.length > 0){
                    if(mutation.target.id.match('_tab_sources')) {
                        debug('group list added - ' + mutation.target.id);
                        removeMoreSourcesFromGroup($('#'+mutation.target.id));
                        removeBlankSpaceFromGroup($('#'+mutation.target.id));
                        $('#'+mutation.target.id).find('.moreHandle').each(function(){updateHiddenCount($(this));});
                    }
                }
            });
        }).observe(document.getElementById("feedlyTabs"), { attributes: true, subtree: true, childList: true});
    }
}


function initLeftPaneMinimizeObserver(){
    if (leftPaneMinimizeObserver == null && $('#feedlyTabs').length > 0) {
        leftPaneMinimizeObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.attributeName == 'class' && mutation.oldValue.match('home')){
                    modifyLeftPaneWidth();
                }
            });
        }).observe(document.getElementById("box"), { attributes: true, attributeOldValue:true});
    }
    
    if (feedlyTabsHolderObserver == null && $('#feedlyTabs').length > 0) {
        feedlyTabsHolderObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.attributeName == 'class'){
                    //check if the class in feedlyTabsHolder has been removed
                    if($('#feedlyTabs').hasClass('feFeedlyTabs') && !$('#feedlyTabsHolder').hasClass('feFeedlyTabsHolder')) $('#feedlyTabsHolder').addClass('feFeedlyTabsHolder');
                }
            });
        }).observe(document.getElementById("feedlyTabsHolder"), { attributes: true});
    }
}


function initFeedlyCenterObserver(){
    if (feedlyCenterObserver == null && $('#feedlyTabs').length > 0) {
        feedlyCenterObserver= new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.attributeName == 'class'){
                    if(mutation.target.id == "feedlyCenter") updateIconColours();
                }
            });
        }).observe(document.getElementById("feedlyCenter"), { attributes: true, attributeOldValue:true});                     
    }
}


function initializeMenu(){
    if($('#nextPrevHolderFloating').length == 0) addPageActions();
    buildMenu();
    addMenuRows();
    fixTabs();
}


function main(count){
    if ($("#savedtab").length > 0 ) {
        addFECssStyles();
        addLeftPaneCssStyles();
        injectKeyboardSimulationScript();
        initializeMenu();
        initFeedlyTabsObserver();
        initGroupObserver();
        initLeftPaneMinimizeObserver();
        initFeedlyCenterObserver();
        updateIconColours();
        addCssStyle("#feedlytabs {top: 0px !important;}"); 
        setTimeout(function(){ //Fix for a bug that sometimes occurs
            updateIconColours();
        }, 1000);
    }else{
        if(count <= 80) {
            debug('element not found, waiting 1s');
            setTimeout(function(){
                main(count+1);
            }, 1000);
        }
    }
}



$(document).ready(function() {
    main(1);
});
