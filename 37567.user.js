
// ==UserScript==
// @name          Netvibes Sub Tabs
// @author        iguane39
// @namespace     http://iguane39.wordpress.com
// @description   Script to display sub tabs on Netvibes
// @include       http://www.netvibes.com/privatepage/*
// @version 0.3.6
// @date 2011-02-24
// Copyright (c) 2008, Sebastien PESME-CANSAR
// Released under the GNU GPL 3 
// http://www.gnu.org/licenses/gpl.html
// ==/UserScript==
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Netvibes Sub Tabs", and click Uninstall. Refresh the page.
//
// How it works
//   - The link between tab and sub tab is in the specific character '/',
//   - If you want to have one tab named 'informations' and several subtabs
//     named 'politics', 'international' and 'business', named your existing
//     tabs like this :
//        - informations/politics,
//        - informations/international,
//        - informations/business
//
// --------------------------------------------------------------------
//


// @description Add the css to the global css on Netvibes.
// @param css  css to add to the global style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// @description modify the css on Netvibes with new definitions for the sub tabs 'divSubTabs'
// TODO - iguane39 - 2008.11.25 Get the existing 'divTabs' css definition of the user and apply it for 'divSubTabs'.
function modifyCSS() {
    addGlobalStyle('#divSubTabs ul li {' +
                        '-x-system-font:none;' +
                        'font-family:Arial,sans-serif;' +
                        'font-size:100%;' +
                        'font-size-adjust:none;' +
                        'font-stretch:normal;' +
                        'font-style:normal;' +
                        'font-variant:normal;' +
                        'font-weight:bold;' +
                        'line-height:16px;' +
                    '}' +
                    '.editContent {' +
                        'font-family:Tahoma,Verdana,Arial,Helvetica,"Bitstream Vera Sans",sans-serif;' +
                    '}' +
                    '#divSubTabs {' +
                        'margin:0;' +
                        'padding:0 10px;' +
                    '}' +
                    '#divSubTabs:after {' +
                        'clear:both;' +
                        'content:".";' +
                        'display:block;' +
                        'height:0;' +
                        'visibility:hidden;' +
                    '}' +
                    ':first-child + html #divSubTabs {' +
                    '}' +
                    '* html #divSubTabs {' +
                        'height:1%;' +
                    '}' +
                    '#divSubTabs ul {' +
                        'margin:0;' +
                        'padding:0;' +
                    '}' +
                    '#divSubTabs a {' +
                        'white-space:nowrap;' +
                    '}' +
                    '#divSubTabs .unread, .result {' +
                        'margin-left:4px;' +
                    '}' +
                    '#divSubTabs .nounread {' +
                        'margin-left:0;' +
                    '}' +
                    '#divSubTabs ul li {' +
                        'background:#F4F4F4 none repeat scroll 0 0;' +
                        'border-color:#CCCCCC #CCCCCC #B9D1F0;' +
                        'border-style:solid;' +
                        'border-width:1px;' +
                        'color:#6A6A6A;' +
                        'cursor:pointer;' +
                        'float:left;' +
                        'list-style-type:none;' +
                        'margin:0 2px -1px 0;' +
                        'padding:3px 8px 5px;' +
                        'white-space:nowrap;' +
                    '}' +
                    '#divSubTabs ul li.selected {' +
                        'background:#ECF3FC none repeat scroll 0 0;' +
                        'border-color:#B9D1F0 #B9D1F0 #ECF3FC;' +
                        'border-style:solid;' +
                        'border-width:1px;' +
                        'color:#1C60B7;' +
                    '}' +
                    '#divSubTabs ul li.dndTarget {' +
                        'border-left-color:#FF0000;' +
                        'border-right-color:#FF0000;' +
                        'border-top-color:#FF0000;' +
                    '}' +
                    '#divSubTabs ul li.msg {' +
                        'background-color:#FF9999;' +
                        'color:#1C60B7;' +
                    '}' +
                    '#divSubTabs ul li.hasmsgs {' +
                        'background-color:#EEEEEE;' +
                    '}' +
                    '#divSubTabs ul li.shared {' +
                        'border-left-color:#99CC99;' +
                        'border-right-color:#009900;' +
                        'border-top-color:#99CC99;' +
                    '}' +
                    '* html #divSubTabs  ul li, * html #divSubTabs ul li.selected {' +
                        'background-position:left 3px;' +
                    '}' +
                    '#divSubTabs ul li input {' +
                        'margin:0 0 -4px;' +
                        'padding:1px;' +
                    '}' +
                    '#divSubTabs ul li img.icon {' +
                        'display:inline;' +
                        'height:16px;' +
                        'margin:3px 0 -4px;' +
                        'padding:0 3px 0 0;' +
                        'vertical-align:baseline;' +
                    '}' +
                    '#divSubTabs ul li img.meta {' +
                        'display:inline;' +
                    '}' +
                    '#divSubTabs ul li img.spacer {' +
                        'padding:0 4px 4px 5px;' +
                    '}' +
                    '#divSubTabs ul li img.close {' +
                        'height:7px;' +
                        'margin-bottom:4px;' +
                        'margin-left:8px;' +
                        'padding:0;' +
                    '}' +
                    '#divSubTabs ul li img.options {' +
                        'height:7px;' +
                        'margin:0 0 -6px -7px;' +
                        'padding:0;' +
                    '}' +
                    '#divSubTabs ul li:hover {' +
                        'color:#333333;' +
                    '}' +
                    '#divSubTabs ul li#tabGhost {' +
                        'background:transparent none repeat scroll 0 0;' +
                        'border:1px dashed #FF6600;' +
                        'display:none;' +
                        'padding-left:0;' +
                        'padding-right:0;' +
                    '}' +
                    '#divSubTabs ul li#tabGhost img {' +
                        'display:inline;' +
                        'padding:0;' +
                    '}');
}

// @description Create each new tab instead of the existing tabs.
// @param title the name of the new tab to create
// @param subTabList the sub tab list which will be displayed on click.
function createTab(title, subTabList) {
    spanTabName = document.createElement('span');
    spanTabName.setAttribute('class', 'tabName');
    spanTabName.setAttribute('title', title);
    spanTabName.addEventListener('click', function() {
                                                // Manage the click on the new tabs.
                                                divSubTabs = document.getElementById('divSubTabs');
                                                oldSubUl = divSubTabs.firstChild;
                                                if (oldSubUl) {
                                                    divSubTabs.removeChild(oldSubUl);
                                                }
                                                ul = document.createElement('ul');
                                                for (var i=0;i<subTabList[title].length;i++) {
                                                    ul.appendChild(subTabList[title][i]);
                                                }
                                                divSubTabs.appendChild(ul);
                                                tabId = divSubTabs.firstChild.firstChild.getAttribute('id');
                                                id = tabId.substring(3, tabId.length);
                                                // TODO - iguane39 - 2008.11.25 : Manage the click simulation to display the first subtab of the tab list.
                                                // If someone has an idea, propose me something.
                                                //unsafeWindow.dataObj.id = id;
                                                //unsafeWindow.tabOnClick('tabOptions') ;
                                                    }, true);
    spanTabName.textContent = title;
    span = document.createElement('span');
    span.setAttribute('class', 'innerTab');
    span.appendChild(spanTabName);
    li = document.createElement('li');
    li.appendChild(span);
    return li;
}

// @description Create the tab list
// @param tabList the tab list
// @param subTabList the sub tab to display when clicked.
function createTabList(tabList, subTabList) {
    ul = document.createElement('ul');
    for (var i=0;i<tabList.length;i++) {
        currentLi = createTab(tabList[i], subTabList);
		ul.appendChild(currentLi);
    }
    return ul;
}

// @description Insert the tab name list in place of the existing tab list
// @param tab the 'divTabs' element.
// @param tabNameList the tab name list to insert
// @param subTabList the list of subtab list which will be displayed on click.
function insertTabNameList(tab, tabNameList, subTabList) {
    ul = createTabList(tabNameList, subTabList);
    insertInTabs(tab, ul)
}

// @description Create and insert the 'divSubTabs' element to display the sub tabs on Netvibes.
// @param divParent the parent of the 'divTabs' element.
// @param divTabs the existing divTabs containing the existing tabs.
function createAndInsertSubTabs(divParent, divTabs) {
    divSubTabs = document.createElement('div');
    divSubTabs.setAttribute('id', 'divSubTabs');
    divParent.insertBefore(divSubTabs, divTabs.nextSibling);
    return divSubTabs;
}

// @description Insert the tab list instead of the existing tab list.
// @param divTabs the 'divTabs' element.
// @param ul the table which replace the content of the 'divTabs' element.
function insertInTabs(divTabs, ul) {
	divTabs.insertBefore(ul, divTabs.firstChild);
	oldUl = divTabs.childNodes[2];
	while (oldUl.childNodes.length >= 1)
		oldUl.removeChild(oldUl.firstChild);
	divTabs.removeChild(oldUl);	
}

function modifyOriginalTab(currentTab) {
	currentTab.setAttribute('style','');
	currentTab.setAttribute('posx','');
	currentTab.setAttribute('posy','');
	return currentTab;
}

// @description Obtain the original tab name list
function getOriginalTabNameList() {
    divTabs = document.getElementById('divTabs');
    liDivTabsList = divTabs.getElementsByTagName('li');
    originalTabNameList = new Array(liDivTabsList.length);
    for (var i=0;i<liDivTabsList.length;i++) {
        currentLi = liDivTabsList[i];
        currentTitle = currentLi.firstChild.childNodes[1].getAttribute('title');
        originalTabNameList[i] = currentTitle;
        originalTabList.push(currentLi);
    }
    return originalTabNameList;
}

// @description Test if the tab list already contains the value.
// @param tab the tab list
// @param the value to test.
function contains(tab, value) {
    for (var i=0;i<tab.length;i++) {
        if (tab[i]==value) {
            return true;
        }
    }
    return false;
}

// @description Get The Sub Tab Name without tab's name.
// @param subTabName The original sub tab name containing tab's name + / + subtab's name.
function getSubTabName(subTabName) {
	currentIndex = subTabName.search("/");
	result = subTabName.substring(currentIndex+1);
	return result;
}

// @description Obtain the new tab name list instead of the original.
// @param originalTabNameList the existing tab name list on Netvibes.
// @param originalTabList the existing tab list of element on Netvibes.
// @param subTabList a list of list of sub tab element.
function getTabNameList(originalTabNameList, originalTabList, subTabList) {
    var tabNameList = new Array();
    for (var i=0;i<originalTabNameList.length;i++) {
        currentTabName = originalTabNameList[i];
        lastIndex = currentTabName.search("/");
        if (lastIndex!=-1) {
            tabName = currentTabName.substring(0, lastIndex);
        }
        else {
            tabName = currentTabName;
        }
        if (!contains(tabNameList, tabName)) {
            tabNameList.push(tabName);
            subTabList[tabName] = new Array();
        }
		originalTabList[i].firstChild.childNodes[1].setAttribute('title', getSubTabName(originalTabList[i].firstChild.childNodes[1].textContent));
		originalTabList[i].firstChild.childNodes[1].textContent = getSubTabName(originalTabList[i].firstChild.childNodes[1].textContent);
        subTabList[tabName].push(originalTabList[i]);
    }
    return tabNameList;
}

function removeOldTabList(divTabs) {
	GM_log('remove old tabs list');
	oldUl = divTabs.childNodes[1];
	while (oldUl.childNodes.length >= 1)
		oldUl.removeChild(oldUl.firstChild);
	divTabs.removeChild(oldUl);
}

GM_log('start');
var divTabs, divSubTabs;
var subTabList = new Array();
var originalTabList = new Array();
divTabs = document.getElementById('divTabs');
if (divTabs) {
    divParent = divTabs.parentNode;
    // We get the original tab name list from Netvibes
    originalTabNameList = getOriginalTabNameList(originalTabList);
    // We create a principal tab name list
    tabNameList = getTabNameList(originalTabNameList, originalTabList, subTabList);
    // We create and insert an empty subtab list
    divSubTabs = createAndInsertSubTabs(divParent, divTabs);
    // We insert the principal tab name list in divTab
    insertTabNameList(divTabs, tabNameList, subTabList);
	// We delete old tabs list
	removeOldTabList(divTabs);
}
modifyCSS();