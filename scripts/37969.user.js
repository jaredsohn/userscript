// ==UserScript==
// @name	neopets.com - Shop Wizard neoPricing
// @namespace	cgibinux
// @description	Computes the best price of an item and submits it to neoPricing - automates a price quest
// @include	http://neopets.com/market.phtml*
// @include	http://*.neopets.com/market.phtml*
// @include	http://neopricing.info/app/index.php*
// @include	http://*.neopricing.info/app/index.php*
// @version	2008.12.18
// @homepage	http://www.geocities.com/grease/
// ==/UserScript==

// Changes 2008.12.04	Fixed problem "Upload now or lose best price"\nNow submits prices via a POST instead of GET\nFixed autoupdate 
// Changes 2008.12.18	Added iPricing support

var contentElem = userTableElem = zzShopDisabled = false;
var priceUrl = "http://neopricing.info/app/index.php";
var priceUrl2 = "http://improveneo.com/dev/submitprice.php";

checkForUpdate({
	file: 'http://www.geocities.com/cgibinux/grease/neopricing_sw.user.js',
	name: 'neopets.com - Shop Wizard neoPricing',
	namespace: 'cgibinux',
	version: '2008.12.18'
}, 7);

function checkForUpdate(script,days){	// 1.2.2	// Modified from Original: http://gm.wesley.eti.br/gm_default.js
 	GM_registerMenuCommand("["+script.name+"] Check for Updates",function(){
 		checkForUpdate(script,0);
 	});
	if (days == undefined)
		days = GM_getValue('nextCheck', 14);
	var currentDate = new Date().valueOf();
	var lastCheck = new Date(parseInt(GM_getValue('lastCheck',"0"),10));
	lastCheck.setHours(0,0,0,0);
	var oldversion = parseInt(script.version.replace(/\./g,''),10);
	if (days >= 0 && lastCheck.valueOf()+Math.max(days,0)*86400000 < currentDate){
		GM_setValue('lastCheck',""+currentDate);
		GM_xmlhttpRequest({
			url: script.file + "?src" + Math.random(),
			method: "get",
			onload: function(e){
				var name = e.responseText.match(/^\/\/ @name\s+(.*?)$/m)[1];
				var namespace = e.responseText.match(/^\/\/ @namespace\s+(.*?)$/m)[1];
				var version = e.responseText.match(/^\/\/ @version\s+(.*?)$/m)[1];
				var changeArr = e.responseText.match(/^\/\/ Changes\s+(.*?)\s+(.*?)$/mg);
				var newversion = parseInt(version.replace(/\./g,''),10);
				changes = "";
				for(a in changeArr){	// go thru list of changes
					arr = changeArr[a].match(/^\/\/ Changes\s+(.*?)\s+(.*?)$/m);
					if (parseInt(arr[1].replace(/\./g,''),10) > oldversion)	// add what was changed since current version
						changes += arr[1] + ":\t" + arr[2].replace(/\\n/, "\n\t\t\t") + "\n\n";
				}
				if (newversion > oldversion){
					if (confirm('There is a new version of ' + script.name +
								'\n\nYour Version:\t\t' + script.version +
								'\nNew Version:\t\t' + version +
								(changes != "" ? "\n\nChanges:\n" + changes : "") +
								(script.name != name || script.namespace != namespace ? '\n\nName and/or namespace has changed.\nYou should uninstall the current version manually.' : '') +
								'\n\nInstall the lastest version now?'))
						GM_openInTab(script.file);
					else if (confirm('Would you like to be reminded tomorrow?'))
						GM_setValue('lastCheck',"" + (currentDate - 518400000)); // 6*24*60*60*1000;
					else{
						var nc = GM_getValue('nextCheck',7);
						alert((nc >= 0 ? 'You will be reminded again in '+nc+' day(s)' : 'You won\'t be reminded again.' ));
					}
				}
				else if (!days)
					alert("You are using the lastest version.\n\nInstalled version:\t"+script.version+"\nPublic version:\t\t"+version);
			},
			onerror: function(e){
				alert("Error:\t" + e.status + " " + e.statusText + "\nUrl:\t\t" + e.finalUrl);
			}
		});
	}
}

function isSpecialSearch(id){
	var specialSearch = new Array();
	for(a = 0;a < 5;a++)
		specialSearch[a] = new Object();
	
	// Setup item names				en English									nl Nordic									pt Portugese								de	German						fr French							it Italian								es Spanish								ch Chinese			zh Chinese Mandarin		ja Japanese					ko Korean
	specialSearch[0].name = new Array("Piece of a treasure map - Piece ",		"Deel van een schatkaart - ",				"Peda�o do mapa de um tesouro - ",			"Teil einer Schatzkarte - ",	"Morceau de Carte au Tr�sor - ",	"Frammento di Mappa del Tesoro - ",		"Trozo de mapa del tesoro - ",			"&#34255;&#23453;&#22270; - ",			"&#34255;&#23542;&#22294; - ",				"&#23453;&#12398;&#22320;&#22259;(1&#12500;&#12540;&#12473;) - ",			"&#48372;&#47932;&#51648;&#46020; &#51312;&#44033; - ");
	specialSearch[1].name = new Array("Spooky Treasure Map - Piece ",			"Spookachtige Schatkaart - ",				"Mapa de Tesouro Fantasmag�rico - ",		"Gruselige Schatzkarte - ",		"Carte au Tr�sor Terrifiante - ",	"Mappa del Tesoro Spettrale - ",		"Mapa del tesoro espeluznante - ",		"&#35809;&#24322;&#34255;&#23453;&#22270; - ",			"&#35437;&#30064;&#34255;&#23542;&#22294; - ",				"&#12422;&#12358;&#12428;&#12356;&#12398;&#23453;&#12398;&#22320;&#22259;(1&#12500;&#12540;&#12473;) - ",		"&#50976;&#47161;&#51032; &#49714; &#48372;&#47932;&#51648;&#46020;(&#54620;&#51312;&#44033;) - ");
	specialSearch[2].name = new Array("Secret Laboratory Map - Piece ",			"Geheime Laboratoriumkaart - ",				"Mapa de Laborat�rio Secreto - ",			"Geheimlabor - Karte - ",		"Carte du Laboratoire Secret - ",	"Mappa del Laboratorio Segreto - ",		"Mapa del laboratorio secreto - ",		"&#31070;&#31192;&#23454;&#39564;&#23460;&#22320;&#22270; - ",		"&#31070;&#31192;&#23526;&#39511;&#23460;&#22320;&#22294; - ",			"&#12471;&#12540;&#12463;&#12524;&#12483;&#12488;&#12539;&#12521;&#12508;&#12398;&#22320;&#22259;(1&#12500;&#12540;&#12473;) - ",	"&#48708;&#48128;&#49892;&#54744;&#49892;&#47196; &#44032;&#45716; &#51648;&#46020;(&#54620;&#51312;&#44033;) - ");
	specialSearch[3].name = new Array("Space Map - Piece ",						"Ruimtekaart - ",							"Mapa Espacial - ",							"Weltraumkarte - ",				"Carte de l'espace - ",				"Mappa dello Spazio - ",				"Mapa del espacio - ",					"&#31354;&#38388;&#32467;&#26500;&#22270; - ",			"&#31354;&#38291;&#32080;&#27083;&#22294; - ",				"&#12473;&#12506;&#12540;&#12473;&#12510;&#12483;&#12503;(1&#12500;&#12540;&#12473;) - ",			"&#50864;&#51452;&#51648;&#46020;(&#54620;&#51312;&#44033;) - ");
	specialSearch[4].name = new Array("Petpet Laboratory Map - Piece ",			"Petpet Laboratorium Kaart - ",				"Mapa do Laborat�rio de Petpets - ",		"Petpet - Laborkarte - ",		"Carte Laboratoire Petpet - ",		"Mappa del Laboratorio dei Petpet - ",	"Mapa del laboratorio de Petpets - ",	"&#23456;&#29289;&#29609;&#20276;&#23454;&#39564;&#23460;&#22320;&#22270; - ",		"S&#23541;&#29289;&#29609;&#20276;&#23526;&#39511;&#23460;&#22320;&#22294; - ",		"&#12506;&#12483;&#12488;&#12506;&#12483;&#12488;&#12539;&#12521;&#12508;&#12398;&#22320;&#22259; - ",			"&#54187;&#54187; &#49892;&#54744;&#49892; &#51648;&#46020; - ");
	// Setup item ids					1		2		3		4		5		6		7		8		9
	specialSearch[0].ids = new Array(	186,	187,	188,	189,	190,	191,	192,	193,	194);	// Treasure map
	specialSearch[1].ids = new Array(	8262,	8263,	8264,	8265,	8266,	8267,	8268,	8269,	8270);	// Spooky
	specialSearch[2].ids = new Array(	8442,	8443,	8444,	8445,	8446,	8447,	8448,	8449,	8450);	// Secret Lab
	specialSearch[3].ids = new Array(	8482,	8483,	8484,	8485,	8486,	8487,	8488,	8489,	8490);	// Space
	specialSearch[4].ids = new Array(	29274,	29275,	29276,	29277,	29278,	29279,	29280,	29281,	29282);	// Petpet
	for(a in specialSearch){
		for(b in specialSearch[a].ids){
			if(specialSearch[a].ids[b] == id){
				return Array(specialSearch[a], parseInt(b)); 
			}
		}
	}
	return Array(null, 0);	// not a special search
}

function getItemKey(id){	// Gets item key, should return 0 unless the id matches a special search
	var special = isSpecialSearch(id)
	if(special[0] != null)
		return special[1];
	return 0;
}

function getSpecialName(id){
	var special = isSpecialSearch(id)
	if(special[0] != null){
		n = special[0].name[langid] + (special[1] + 1);
		return n;
	}
	return null;
}

function getLang(){		// sets the lang and langid of the page 
	var forms = document.forms.length;
	if(forms > 1){
		var zlang = document.forms[forms - 1].elements.namedItem("lang")
		if(zlang){
			lang = zlang.value;
			langid = zlang.selectedIndex;
		}
	}
}

function reset(){
	items = new Array();
}

function hasChanged(){
	if(itemName != prevItemName){
		for(key in items){
			if(!items[key])
				continue;
			if(items && items[key] && items[key].pages){
				if(items[key].pages >= 10 || items[key].shops.length >= 100){
					contentElem.innerHTML += "<div style='border: 2px solid black'>Previous Search for &quot;<i>" + prevItemName + "</i>&quot;, <b>Upload now or lose the best price</b><br><br>" + getItemInfo(prevItemName, key, false) + "</div>";
				}
			}
			reset();
		}
		for(key in items){
			if(!items[key])
				continue;
			if(items[key].pages >= 10 || items[key].shops.length >= 100){
				elem = document.getElementById('uploadPriceButton' + key);
				if(elem)
					elem.addEventListener("click", sendPrice);
			}
		}
	}
}

function sendPrice(e){
	key = parseInt(this.id.replace("uploadPriceButton", ""));
	var item = eval(unescape(this.name));
	sendPriceElem = this;
	GM_xmlhttpRequest({
		method: "POST",
		url: priceUrl,
		data: "v=1&action=setprice&return=OK&key=" + key + "&name=" + escape(item.name) + "&neoitemid=" + item.id + "&price=" + item.avgPrice + "&user=" + user + "&lang=" + lang, 
		headers:{
			"Accept":"text/plain,text/html",
			"Content-Type":"application/x-www-form-urlencoded"
		},
		onload:function(details) {
			if(details.responseText.indexOf("OK") == 0){
				resetHistory(e, key, "The item's price was updated, the price faerie is pleased");
				sendPriceElem.style.display = "none";
			}
			else if(details.responseText.indexOf("ERR - You already updated") == 0){
				alert("Warning: You might have double posted, move onto another item to price");
				sendPriceElem.style.display = "none";
			}
			else
				alert("Warning: The price might not have been updated, " + details.responseText);
		},
		onerror:function(details) {
			alert("Error: The price was not updated, " + details.responseText);
			sendPriceElem.style.display = "none";
		}
	});
	GM_xmlhttpRequest({
		method: "GET",
		url: priceUrl2 + "?rare=false&price=" + item.avgPrice + "&name=" + escape(item.name) + "&id=" + item.id + "lang=" + lang + "&src=greasemonkey",
		headers:{
			"Accept":"text/plain,text/html",
		},
		onload:function(details) {
			if(details.responseText.indexOf("<div id='response' style='color:green'>Price Received!</div>") == 0){
			}
			else{
			}
		},
		onerror:function(details) {
			alert("Error: The price was not updated, " + details.responseText);
			sendPriceElem.style.display = "none";
		}
	});
}

function getItemInfo(iname, key, refresh){
	special = getSpecialName(items[key].id);
	str = "";
	if(special != null){
		str = special + "<br>";
		iname = special;
	}
	if(items[key].shops == undefined)
		return '';
	str += "Shops: " + items[key].shops.length + ", Average Low Price: <span style='-moz-user-select: all'>" + items[key].avgPrice + "</span>np";
	minSearches = 10;
	minShops = 100;
	if(items[key].pages >= minSearches || items[key].shops.length >= minShops){
		var obj = eval(uneval(items[key]));	// trying to make a copy of this object
		obj.shops = obj.shops.length;
		obj.name = iname;
		json = uneval(obj);
		if(items[key].shops.length == 0)
			str += ' <input id="uploadPriceButton' + key + '" type="button" name="' + escape(json) + '" value="Give up">';
		else
			str += ' <input id="uploadPriceButton' + key + '" type="button" name="' + escape(json) + '" value="Update neoPrice">';
	}
	else if(refresh){
		str += "<br><strong>You need to <a href='javascript:document.location.reload()'>refresh</a> " + (minSearches - items[key].pages) + " more time"
		if(minSearches - items[key].pages > 1)
			str += "s";
		str += ", or get " + (minShops - items[key].shops.length) + " more shop";
		if(minShops - items[key].shops.length > 1)
			str += "s";
		str += "</strong>";
	}
	return str;
}

function showThisItem(){
	originalHTML = userTableElem.innerHTML;
	userTableElem.innerHTML = "";
	for(key in items){
		if(!items[key])
			continue;
		contentElem.innerHTML += "<div style='border: 2px solid black'>" + getItemInfo(itemName, key, true) + "</div>"
		userTableElem.innerHTML += generateItemsTable(key);
	}
	userTableElem.innerHTML += '<tr><td align="center"><input id="ResetHistory1" type="button" value="Erase History"><input id="RestoreOriginal1" type="button" value="Restore"></td></tr>';
	// done adding to the page, can attach events now
	document.getElementById("ResetHistory1").addEventListener("click", resetHistory, false);
	document.getElementById("RestoreOriginal1").addEventListener("click", restoreOriginal, false);
	for(key in items){	// 2nd loop to add events
		if(!items[key])
			continue;
		elem = document.getElementById('uploadPriceButton' + key);
		if(elem){
			elem.addEventListener("click", sendPrice, true);
		}
	}
}

function isRandomEvent(){
	var elems = document.evaluate("id('content')/table/tbody/tr/td[2]/table[1]/tbody/tr[2]/td[1]/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var elem = elems.snapshotItem(0);
	if(elem != null && elem.width == 80 && elem.height == 80)
		return true;
	return false;
}

function getItemName(){	// gets the item name and finds where to put the userTableElem
	if(isRandomEvent())
		var t = 2;
	else
		var t = 1;
	// Get Item Name and contentElem		
	var table = document.evaluate("id('content')/table/tbody/tr/td[2]/table[" + t + "]/tbody/tr/td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var tableElem = table.snapshotItem(1);
	if(tableElem){
		var name = document.evaluate("b/span", tableElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var nameElem = name.snapshotItem(0);
		itemName = nameElem.innerHTML;
		contentElem = tableElem;
	}
	else
		alert("Couldn't find the wizard header thing");
		
	// Get Wizard Results Table		
	table = document.evaluate("id('content')/table/tbody/tr/td[2]/table[" + (t + 1)+ "]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	tableElem = table.snapshotItem(0);
	if(tableElem)
		userTableElem = tableElem;
	else{
		table = document.evaluate("id('content')/table/tbody/tr/td[2]/div[2]/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	// nothing was found
		tableElem = table.snapshotItem(0);
		if(tableElem){
			table = document.createElement("TABLE");
			tableElem.insertBefore(table, null);
			userTableElem = table; 
		}
		else{
			alert("Couldn't find the wizard search results");
		}
	}
	return;
}


function getPagePrices(){
	var inputs = document.evaluate('tbody/tr', userTableElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var elem = inputs.snapshotItem(3)
	var a = 1;
	var neoItemID = 0;
	var key = 0;
	var found = false;
	while(true){
		elem = inputs.snapshotItem(a)
		if(elem == null)
			break;
		found = true;
		item = new Array();
		if(neoItemID == 0){
			var link = elem.childNodes.item(0).childNodes.item(0).href;
			pos = link.match(/buy_obj_info_id=(.*?)&/);
			neoItemID = pos[1];
			key = getItemKey(neoItemID);
			if(!items[key] || items[key].id != neoItemID){
				items[key] = new Object;
				items[key].id = neoItemID;
				items[key].shops = new Array();
				items[key].pages = 0;
			}
		}
		item[0] = parseInt(elem.childNodes.item(3).childNodes.item(0).innerHTML.replace(" NP", "").replace(",", "").replace(".", ""));
		item[1] = parseInt(elem.childNodes.item(2).innerHTML);
		item[2] = elem.childNodes.item(0).childNodes.item(0).childNodes.item(0).innerHTML;
		itemLen = 0;
		if(items[key].shops)
			itemLen = items[key].shops.length;
		ok = true;
		for(z = 0;z < itemLen;z++){
			if(items[key].shops[z][2] == item[2]){
				items[key].shops[z][0] = item[0];	// update their price if it's changed
				ok = false;
				break;
			}
		}
		if(ok && items[key].shops)
			items[key].shops.push(item);
		a++;
	}
	if(!found && items[key] == undefined){
		items[key] = new Object;
		items[key].id = 0;
		items[key].shops = new Array();
		items[key].pages = 0;
	}
	items[key].pages++;
}

function priceSort(a, b){
	return (a[0] - b[0]); 
}

function generateItemsTable(key){
	if(items[key].shops == undefined)
		return '';
	if(items[key].shops.length == 0){
		return "<tr><td style='border: 2px solid black;padding: 10px'>The item has not been found yet!?!</td></tr>";
	}
	html = "<tr><td align=\"center\">";
	special = getSpecialName(items[key].id);
	if(special != null)
		html += special + "<br>";

	html += "<table cellspacing=\"0\" cellpadding=\"3\" border=\"0\"><thead><tr><th class=\"contentModuleHeaderAlt\">Shop Owner</th><th class=\"contentModuleHeaderAlt\">Stock</th><th class=\"contentModuleHeaderAlt\" style=\"text-align:right\">Price</th><th style='width: 16px'></th></tr></thead><tbody";
	mid = Math.round(items[key].shops.length * 0.25);
	if(mid > 9)
		html += " style='height: 160px;overflow: auto'";
	html += ">";
	for(a = 0;a < items[key].shops.length;a++){
		prefix = ">";
		if(items[key].shops[a][0] <= items[key].tooLow)
			prefix = " style=\"text-decoration: line-through\">";
		html += "<tr><td><a href=\"http://www.neopets.com/browseshop.phtml?owner=" + items[key].shops[a][2] + "&buy_obj_info_id=" + items[key].id + "&buy_cost_neopoints=" + items[key].shops[a][0] + "\">" + items[key].shops[a][2] + "</a></td><td align='right'>" + items[key].shops[a][1] + "</td><td align='right'" + prefix + items[key].shops[a][0] + " NP</td></tr>";
	}
	html += "</tbody></table></td></tr>";
	return html;
}

function getLowest(){
	for(key in items){
		if(!items[key])
			continue;
		lowest = new Array();
		items[key].avgPrice = qty = div = 0;
		if(items[key].shops == undefined || items[key].shops.length == 0)
			continue;
		items[key].shops.sort(priceSort);
		idx = Math.round(items[key].shops.length * 0.25);
		items[key].midPrice = items[key].shops[idx][0];
		items[key].tooLow = Math.floor(items[key].midPrice / 1.8);
		prevPrice = items[key].shops[0][0];
		for(a = b = 0, c = 4;a < 3;b++){
			if(b >= items[key].shops.length){
				prevPrice = price;
				if(prevPrice > items[key].tooLow){
					lowest.push(prevPrice);
					items[key].avgPrice += prevPrice * qty * c; 
					div += qty * c;
					a++;
					c--;
					qty = 0;
				}
				break;
			}
			price = items[key].shops[b][0];
			if(price != prevPrice){
				if(prevPrice > items[key].tooLow){
					lowest.push(prevPrice);
					items[key].avgPrice += prevPrice * qty * c; 
					div += qty * c;
					a++;
					c--;
					qty = 0;
				}
			}
			prevPrice = price;
			qty += items[key].shops[b][1];
		}
		if(div > 0)
			items[key].avgPrice = Math.floor(items[key].avgPrice / div);
	}
}

function isShopWizardForm(){
	ok = false;
	for(form = 0;form < document.forms.length;form++){
		for(element = 0;element < document.forms[form].elements.length;element++){
			if(document.forms[form].elements[element]){
				field = document.forms[form].elements[element];
				field.disabled = false;
				if(field.name == 'table' && field.value == 'shop')
					field.checked = true;
				if(field.name == 'criteria')
					field.value = "exact";
				if(field.name == 'min_price')
					field.value = "0";
				if(field.name == 'max_price'){
					field.value = "99999";
					ok = true;
				}
			}
		}
		if(ok)
			return true;
	}
	return false;
}

function isShopWizardResults(){
	for(form = 0;form < document.forms.length;form++){
		if(document.forms[form].action.indexOf("market.phtml") != -1){
			for(element = 0;element < document.forms[form].elements.length;element++){
				if(document.forms[form].elements[element]){
					field = document.forms[form].elements[element];
					if(field.name == 'type' && field.type == 'hidden' && field.value == 'wizard')
						return true;
				}
			}
		}
	}
	return false;
}

function getNextItem(){
	GM_xmlhttpRequest({
		method: "POST",
		url: priceUrl,
		data: "v=1&action=next&return=OK&user=" + user + "&lang=" + lang,
		headers:{
			"Accept":"text/plain,text/xml",
			"Content-Type":"application/x-www-form-urlencoded"
		},
		onload:function(details) {
		nextItem = details.responseText;
//			if(prevNextItem == prevItemName && nextItem != prevNextItem){
// 			if(nextItem != prevNextItem){
// 				GM_setValue("pages", 0);
// 				GM_setValue("items", uneval(new Array()));
// 			}
			showNextItem();
		}
	});
}

function resetHistory(e, key, msg){
	if(key == undefined)
		reset();
	else
		items[key] = new Array();
	GM_setValue("items", uneval(items));
	if(msg == undefined)
		msg = "The search history was erased";
	userTableElem.innerHTML = '<tr><td align="center">' + msg + '</td></tr>';
	userTableElem.innerHTML += '<tr><td align="center"><input id="RestoreOriginal1" type="button" value="Restore"></td></tr>';
	// done adding to the page, can attach events now
	document.getElementById("RestoreOriginal1").addEventListener("click", restoreOriginal, false);
}

function restoreOriginal(){
	userTableElem.innerHTML = originalHTML;
}

function useNextItem(elem){
	zzShopDisabled = !zzShopDisabled;
	for(form = 0;form < document.forms.length;form++){
		for(element = 0;element < document.forms[form].elements.length;element++){
			if(document.forms[form].elements[element]){
				field = document.forms[form].elements[element];
				if(field.name == 'shopwizard'){
					if(zzShopDisabled)
						field.value = nextItem;
					else
						field.value = "";
					field.focus();
				}
				if(field.name == 'table' && field.value == 'shop')
					field.checked = true;
				if(field.name == 'criteria')
					field.value = "exact";
				if(field.name == 'min_price')
					field.value = "0";
				if(field.name == 'max_price'){
					field.value = "99999";
					return;
				}
			}
		}
	}
}

function showNextItem(){
	GM_setValue("nextItem", nextItem);
	var inputs = document.evaluate("id('content')/table/tbody/tr/td[2]/div[2]/table/tbody/tr[2]/td/div/table/tbody/tr/td[2]/form/table/tbody", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var tbody = inputs.snapshotItem(0);
	var inputs = document.evaluate("id('content')/table/tbody/tr/td[2]/div[2]/table/tbody/tr[2]/td/div/table/tbody/tr/td[2]/form/table/tbody/tr[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var tr = inputs.snapshotItem(0);
	var newtr = document.createElement("TR");
	tbody.insertBefore(newtr, tr);
	newtr.innerHTML = "<td style='background-color: #efefef'><b>Price Quest</b></td><td id='zzUseNextItem0001'>" + nextItem + "</td>";
	document.getElementById("zzUseNextItem0001").addEventListener("click", useNextItem, false);
}

function generateUser(){	// Generate username which is a random 10 letters of gibberish
	var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	var pass = "";
	for(var x = 0;x < 10;x++){
		var i = Math.floor(Math.random() * 62);
		pass += chars.charAt(i);
	}
	return pass;
}

var user = GM_getValue("user", "");
//var prevNextItem = GM_getValue("nextItem", "");
var prevItemName = GM_getValue("itemName", 0);
getLang();
if(user == ""){
	user = generateUser();
	GM_setValue("user", user);
}
if(isShopWizardForm())
	getNextItem();
else if(isShopWizardResults()){
	items = new Array();
	items = eval(GM_getValue("items", new Array()));
	getItemName();
	hasChanged();
	getPagePrices();
	getLowest();
	showThisItem();
	GM_setValue("items", uneval(items));
	GM_setValue("itemName", itemName);
}
else if(document.location.hostname.indexOf("neopricing.info") != -1){
	var div = document.createElement("DIV");	// Put greasemonkey username on the page where it can be found
	div.id = "GM_iPricing";
	div.title = user;
	document.body.insertBefore(div, null);
}
