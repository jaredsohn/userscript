// ==UserScript==
// @name           Important Forum Threads - Sofia
// @namespace      dr.funstein@gmail.com	
// @description    Popmundo: Important Forum Post Links In City Page.
// @include        http://www*.popmundo.com/Common/City.asp*
// ==/UserScript==


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
	headerIconImg.src = 'graphics/Default/Icons/Icon_Artist.gif';
	
	var headerIconTd = document.createElement('td');
	headerIconTd.setAttribute('width', 32);
	headerIconTd.setAttribute('height', 34);
	headerIconTd.appendChild(headerIconImg);
	
	var headerTextDiv = document.createElement('div');
	headerTextDiv.className = 'DarkColumnHeader';
	headerTextDiv.appendChild(document.createTextNode(pMenuTitle));
	
	var headerTextTd = document.createElement('td');
	headerTextTd.setAttribute('width', 213);
	headerTextTd.setAttribute('valign', 'top');
	headerTextTd.setAttribute('height', 34);
	headerTextTd.appendChild(headerTextDiv);
	
	var headerTr = document.createElement('tr');
	headerTr.appendChild(headerIconTd);
	headerTr.appendChild(headerTextTd);
	
	var menuHeader = document.createElement('table');
	menuHeader.setAttribute('width', 245);
	menuHeader.setAttribute('cellspacing', 0);
	menuHeader.setAttribute('cellpadding', 0);
	menuHeader.setAttribute('border', 0);
	menuHeader.appendChild(headerTr);
	
	var menuContent = document.createElement('table');
	menuContent.className = 'menu';
	menuContent.setAttribute('width', 245);
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
	var myMenu = createMenuTable('Important Forum Posts Sofia', false, menu2);
	createMenuLink(myMenu, 0, "cn.asp?action=view&threadid=1080624&number=1", "Object Trading");
	createMenuLink(myMenu, 1, "cn.asp?action=view&threadid=1076537&number=1", "Sick People - Doctor Requests");
	createMenuLink(myMenu, 2, "cn.asp?action=view&threadid=1078664&number=1", "Locale on Fire - Firefighter Requests");
}

//EOF