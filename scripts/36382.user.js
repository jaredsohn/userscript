// ==UserScript==
// @name           Greasemungo Custom Menu Items
// @namespace      kenmooda@gmail.com
// @description    Popmundo: Example of custom menu items
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Custom Menu Items
//    Copyright (C) 2008  Tommi Rautava
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////

const FIRST_MENU_XPATH = '//table[@class="menu"][1]';
const LAST_MENU_XPATH = '//table[@class="menu"][last()]';

////////////////////////////////////////////////////////////////////////////////

function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


/**
 * @input pRow	0 = the first menu item, 1 = the second menu item, -1 = the last menu item
 */
function createMenuLink(pMenu, pRow, pLinkUrl, pLinkText) {
	var a1 = document.createElement('a');
	a1.href = pLinkUrl;
	a1.appendChild(document.createTextNode(pLinkText));
	
	var td1 = document.createElement('td');
	td1.appendChild(a1);
	
	var tr1 = document.createElement('tr');
	tr1.appendChild(td1);
	

	if (pMenu.rows.length) {
		var targetNode;
		var parentNode = pMenu.rows.item(0).parentNode;

		if (pRow >= 0) {
			targetNode = pMenu.rows.item(pRow);
		}
		else {
			pRow = pMenu.rows.length + pRow;
			targetNode = pMenu.rows.item(pRow).nextSibling;
		}

		parentNode.insertBefore(tr1, targetNode);
	} else {
		pMenu.appendChild(tr1);
	}
}


function createMenuTable(pMenuTitle, pIsBefore, pMenu) {
	var headerIconImg = document.createElement('img');
	headerIconImg.width = 32;
	headerIconImg.Height = 34;
	headerIconImg.src = 'graphics/Default/Icons/Icon_Character.gif';
	
	var headerIconTd = document.createElement('td');
	headerIconTd.setAttribute('width', 32);
	headerIconTd.setAttribute('height', 34);
	headerIconTd.appendChild(headerIconImg);
	
	var headerTextDiv = document.createElement('div');
	headerTextDiv.className = 'DarkColumnHeader';
	headerTextDiv.appendChild(document.createTextNode(pMenuTitle));
	
	var headerTextTd = document.createElement('td');
	headerTextTd.setAttribute('width', 197);
	headerTextTd.setAttribute('valign', 'top');
	headerTextTd.setAttribute('height', 34);
	headerTextTd.appendChild(headerTextDiv);
	
	var headerTr = document.createElement('tr');
	headerTr.appendChild(headerIconTd);
	headerTr.appendChild(headerTextTd);
	
	var menuHeader = document.createElement('table');
	menuHeader.setAttribute('width', 229);
	menuHeader.setAttribute('cellspacing', 0);
	menuHeader.setAttribute('cellpadding', 0);
	menuHeader.setAttribute('border', 0);
	menuHeader.appendChild(headerTr);
	
	var menuContent = document.createElement('table');
	menuContent.className = 'menu';
	menuContent.setAttribute('width', 229);
	menuContent.setAttribute('cellspacing', 0);
	menuContent.setAttribute('cellpadding', 0);
	menuContent.setAttribute('border', 0);
	
	if (pIsBefore) {
		pMenu.parentNode.insertBefore(document.createElement('br'), pMenu.nextSibling);
		pMenu.parentNode.insertBefore(menuHeader, pMenu);
		pMenu.parentNode.insertBefore(menuContent, pMenu);
	} else {
		pMenu.parentNode.insertBefore(menuContent, pMenu.nextSibling);
		pMenu.parentNode.insertBefore(menuHeader, pMenu.nextSibling);
		pMenu.parentNode.insertBefore(document.createElement('br'), pMenu.nextSibling);
	}

	return menuContent;
}

	
var pMenu = xpathNode(FIRST_MENU_XPATH);
if (pMenu) {
	//createMenuLink(pMenu, -1, "", "");
}

var menu2 = xpathNode(LAST_MENU_XPATH);
if (menu2) {
	var myMenu = createMenuTable('Firmy', false, menu2);
	createMenuLink(myMenu, 0, "Company.asp?action=ViewCompany&CompanyID=18144", "Happy Warsaw Foundation");
	createMenuLink(myMenu, 1, "Company.asp?action=ViewCompany&CompanyID=14680", "Digital Company");
}

//EOF