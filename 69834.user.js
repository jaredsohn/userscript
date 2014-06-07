// ==UserScript==
// @name           City Toolbar
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

var HOSTELS = {
	  8:   221845, // Amsterdam, Melanie Wellmann
	 35:  1108601, // Ankara, Inn of Sudan Cikmis Balik
	 58:  2508464, // Baku, Alev Serif
	  9:  1842904, // Barcelona, Tabatha Amor
	 36:   284018, // Belgrade, Janne Kauppi
	  7:   511738, // Berlin, Sirpa Virjonen
	 33:  1286689, // Brussels, Nicolaas Burggraaf
	 46:   774751, // Bucharest, Ian Secker
	 42:   916214, // Budapest, Alessandra Zamperini
	 17:   229221, // Buenos Aires, Ricky Hadley
	 22:   229197, // Copenhagen, Wes Toland
	 29:   198413, // Dubrovnik, Dave Faust
	 27:  2006076, // Glasgow, Ester Bassi
	 19:   163848, // Helsinki, Ramon Dalenberg
	 30:   329100, // Istanbul, Inn of Sudan cikmis balik
	 47:  2251314, // Izmir, Hanna Savinainen
	 55:  2366752, // Jakarta, Pekka Ruonela
	 51:  1846674, // Johannesburg, Patrik Paulsson
	 56:  2435050, // Kiev, Anatoliy Novikov
	  5:    65576, // London, Anki Ankie Schiefer
	 14:   337811, // Los Angeles, Hartmut Hake
	 24:  2141439, // Madrid, Eva Doherty
	 54:  2265871, // Manila, Christian Munerati
	 10:  1429829, // Melbourne, Cristina Salvatierra
	 32:   225203, // Mexico City, Atte Näränen
	 52:  1888162, // Milan, Enrica Marchetti
	 38:   368112, // Montreal, Arianna Roma
	 18:  1627383, // Moscow, Trevor Martin
	 11:  1083022, // Nashville, Marquita Thorn
	  6:  2276432, // New York, Greta Mariani
	 20:   176219, // Paris, Valéry Faye
	 31:  2063969, // Porto, Jozien van Maanen
	 25:   229458, // Rio de Janeiro, Achmed Witte
	 23:   209433, // Rome, Nílton Francisco Damerau
	 21:   230771, // São Paulo, Achmed Witte
	 49:  1963080, // Sarajevo, Viviana Remedios
	 50:  1357639, // Seattle, Kenya King
	 45:   675717, // Shanghai, Mason Bolger
	 39:  2444409, // Singapore, Allan Brooks
	 53:  1962951, // Sofia, Pekka Ruonela
	  1:   184452, // Stockholm, Peter McGinnes
	 34:   271290, // Tallinn, Annette Cuffe
	 16:   229736, // Toronto, Pascaline Foulquier
	 26:   988565, // Tromsø, Alva Larsson
	 28:  1743451, // Vilnius, Patrik Paulsson
	 48:   848436 // Warsaw, Stephen Vohmann

};

var DOCTOR = {
	 8:   221845, 
	 35:  1108601, 
	 58:  2508464, 
	  9:  1842904, 
	 36:   284018, 
	  7:   511738, 
	 33:  1286689, 
	 46:   774751, 
	 42:   916214, 
	 17:   229221, 
	 22:   229197, 
	 29:   198413, 
	 27:  2006076, 
	 19:   163848, 
	 30:   329100, 
	 47:  2251314, 
	 55:  2366752, 
	 51:  1846674, 
	 56:  2435050, 
	  5:    65576, 
	 14:   337811, 
	 24:  2141439, 
	 54:  2265871, 
	 10:  1429829, 
	 32:   225203, 
	 52:  1888162, 
	 38:   368112, 
	 18:  1627383, 
	 11:  1083022, 
	  6:  2276432, 
	 20:   176219, 
	 31:  2063969, 
	 25:   229458, 
	 23:   209433, 
	 21:   230771, 
	 49:  1963080, 
	 50:  1357639, 
	 45:   675717, 
	 39:  2444409,
	 53:  1962951,
	  1:   184452, 
	 34:   271290, 
	 16:   229736, 
	 26:   988565, 
	 28:  1743451, 
	 48:   848436 
};

var FIRE = {
	 8:   221845, 
	 35:  1108601, 
	 58:  2508464, 
	  9:  1842904, 
	 36:   284018, 
	  7:   511738, 
	 33:  1286689, 
	 46:   774751, 
	 42:   916214, 
	 17:   229221, 
	 22:   229197, 
	 29:   198413, 
	 27:  2006076, 
	 19:   163848, 
	 30:   329100, 
	 47:  2251314, 
	 55:  2366752, 
	 51:  1846674, 
	 56:  2435050, 
	  5:    65576, 
	 14:   337811, 
	 24:  2141439, 
	 54:  2265871, 
	 10:  1429829, 
	 32:   225203, 
	 52:  1888162, 
	 38:   368112, 
	 18:  1627383, 
	 11:  1083022, 
	  6:  2276432, 
	 20:   176219, 
	 31:  2063969, 
	 25:   229458, 
	 23:   209433, 
	 21:   230771, 
	 49:  1963080, 
	 50:  1357639, 
	 45:   675717, 
	 39:  2444409,
	 53:  1962951,
	  1:   184452, 
	 34:   271290, 
	 16:   229736, 
	 26:   988565, 
	 28:  1743451, 
	 48:   848436 
};
	
var TRADE = {
	 8:   221845, 
	 35:  1108601, 
	 58:  2508464, 
	  9:  1842904, 
	 36:   284018, 
	  7:   511738, 
	 33:  1286689, 
	 46:   774751, 
	 42:   916214, 
	 17:   229221, 
	 22:   229197, 
	 29:   198413, 
	 27:  2006076, 
	 19:   163848, 
	 30:   329100, 
	 47:  2251314, 
	 55:  2366752, 
	 51:  1846674, 
	 56:  2435050, 
	  5:    65576, 
	 14:   337811, 
	 24:  2141439, 
	 54:  2265871, 
	 10:  1429829, 
	 32:   225203, 
	 52:  1888162, 
	 38:   368112, 
	 18:  1627383, 
	 11:  1083022, 
	  6:  2276432, 
	 20:   176219, 
	 31:  2063969, 
	 25:   229458, 
	 23:   209433, 
	 21:   230771, 
	 49:  1963080, 
	 50:  1357639, 
	 45:   675717, 
	 39:  2444409,
	 53:  1962951,
	  1:   184452, 
	 34:   271290, 
	 16:   229736, 
	 26:   988565, 
	 28:  1743451, 
	 48:   848436 
};

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
	headerIconImg.src = 'graphics/default/Icons/Icon_VIP.gif';
	
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

var citylink = document.evaluate("//a[contains(@href, 'City.asp?action=online&CityID=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
var city_id = citylink.snapshotItem(0).href.match( /CityID=(\d+)/ )[1];

var pMenu = xpathNode(FIRST_MENU_XPATH);
if (pMenu) {
	//createMenuLink(pMenu, -1, "", "");
}

var menu2 = xpathNode(LAST_MENU_XPATH);
if (menu2) {
	var myMenu = createMenuTable('City Toolbar', false, menu2);
	createMenuLink(myMenu, 0, "cn.asp?action=view&threadid="+TRADE[city_id]+, "Trade Thread");
	createMenuLink(myMenu, 1, "cn.asp?action=view&threadid="+DOCTOR[city_id]+, "Sick People - Doctor Requests");
	createMenuLink(myMenu, 2, "cn.asp?action=view&threadid="+FIRE[city_id]+, "Locale on Fire - Firefighter Requests");
	createMenuLink(myMenu, 3, "Locale.asp?action=view&LocaleID="+HOSTELS[city_id]+, "Local Youth Hostel");
}

//EOF