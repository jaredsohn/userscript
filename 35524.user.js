// ==UserScript==
// @name			neopets.com Faerie Quest Helper
// @namespace		http://userscripts.org/scripts/show/35524
// @description		Gathers the lowest 3 prices spanning multiple pages to help you become the ultimate faerie quest helper
// @include			http://www.neopets.com/market.phtml*
// @include			http://*.neopets.com/market.phtml*
// @version			beta
// ==/UserScript==

function reset(){
	items = new Array();
	pages = 0;
}

function showThisItem(){
	if(usertableElem){
		originalHTML = usertableElem.innerHTML;
		usertableElem.innerHTML = generateItemsTable();
		document.getElementById("ResetHistory1").addEventListener("click", resetHistory, false);
		document.getElementById("RestoreOriginal1").addEventListener("click", restoreOriginal, false);
	}
}

function getItemName(){
	inputs = document.evaluate('id(\'content\')/table/tbody/tr/td[2]/table[1]/tbody/tr/td[2]/b/span', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	inputs2 = document.evaluate('id(\'content\')/table/tbody/tr/td[2]/table[2]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	 
	elem = inputs.snapshotItem(0);
	if(!elem){	// must be a random event
		inputs = document.evaluate('id(\'content\')/table/tbody/tr/td[2]/table[2]/tbody/tr/td[2]/b/span', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		inputs2 = document.evaluate('id(\'content\')/table/tbody/tr/td[2]/table[3]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		elem = inputs.snapshotItem(0);
	}
	elem2 = inputs2.snapshotItem(0);
	if(!elem){	// Unknown
		alert("Couldn't get the item name on the page");
	}
	else{
		contentElem = elem.parentNode.parentNode;
		usertableElem = elem2;
		itemName = elem.innerHTML;
		if(prevItemName != itemName)
			reset(); 
	}
}

function getPagePrices(){
	inputs = document.evaluate('//html/body/div/div[3]/table/tbody/tr/td[2]/table[2]/tbody/tr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	elem = inputs.snapshotItem(3)
	pages++;
	a = 1;
	while(true){
		elem = inputs.snapshotItem(a)
		if(elem == null)
			break;
		item = new Array();
		link = elem.childNodes.item(0).childNodes.item(0).href;
		pos = link.indexOf("&buy_cost_neopoints");
		link = link.substr(0,pos);
		pos = link.indexOf("buy_obj_info_id=") + 16;
		neoItemID = link.substr(pos);
		item[0] = parseInt(elem.childNodes.item(3).childNodes.item(0).innerHTML.replace(" NP", "").replace(",", ""));
		item[1] = parseInt(elem.childNodes.item(2).innerHTML);
		item[2] = elem.childNodes.item(0).childNodes.item(0).childNodes.item(0).innerHTML;
		itemLen = items.length;
		ok = true;
		for(z = 0;z < itemLen;z++){	// search the list of items for existing entry
			if(items[z][2] == item[2]){
				items[z][0] = item[0];	// update their price if it's changed
				ok = false;
				break;
			} 
		}
		if(ok)	// doesn't exist, add it
			items.push(item);
		a++;
	}
	items.sort(priceSort);
}

function priceSort(a, b){
	return (a[0] - b[0]); 
}

function resetHistory(){
	reset();
	GM_setValue("items", uneval(items));
	GM_setValue("pages", pages);
	usertableElem.innerHTML = generateItemsTable();
	document.getElementById("ResetHistory1").style.display = "none";
	document.getElementById("RestoreOriginal1").addEventListener("click", restoreOriginal, false);
}

function restoreOriginal(){
	usertableElem.innerHTML = originalHTML;
}

function generateItemsTable(){
	html = '<tr><td align="left">';
	txt = new Array();
	txt[0] = itemName + ":<br>";
	txt[1] = itemName + ":<br>";
	txt[2] = itemName + ":<br>";
	if(items.length == 0)
		for(a in txt)
			txt[a] += "Sorry, but I couldn't find &quot;" + itemName + "&quot;";
	else{
		for(a = 0;a < items.length;a++){
			if(a >= 3)
				break;
			prefix = ">";
			link = "http://www.neopets.com/browseshop.phtml?owner=" + items[a][2] + "&buy_obj_info_id=" + neoItemID + "&buy_cost_neopoints=" + items[a][0];
			txt[0] += "<a href=\"" + link + "\">" + items[a][2] + "</a> " + items[a][1] + " " + items[a][0] + " NP<br>";
			txt[1] += "<a href=\"" + link + "\">" + items[a][2] + "</a> (" + items[a][1] + " at " + items[a][0] + " NP)<br>";
			txt[2] += "" + link + "<br>";
			
		}
	}
	if(pages == 1)
		s1 = ""
	else
		s1 = "es";
		
	if(items.length == 1)
		s2 = ""
	else
		s2 = "s";

	for(a in txt)
		html += '<div style="-moz-user-select: all">' + txt[a] + '</div><hr/>';
	html += pages + " search" + s1 + ', ' + items.length + " shop" + s2 + '<input id="ResetHistory1" type="button" value="Reset"><input id="RestoreOriginal1" type="button" value="Restore"></td></tr>';
	return html;
}

function isShopWizardForm(){
	ok = false;
	for(form = 0;form < document.forms.length;form++){
		for(element = 0;element < document.forms[form].elements.length;element++){
			if(document.forms[form].elements[element]){
				field = document.forms[form].elements[element];
				if(field.name == 'table' && field.value == 'shop')
					document.forms[form].elements[element].checked = true;
				if(field.name == 'criteria')
					document.forms[form].elements[element].value = "exact";
				if(field.name == 'min_price')
					document.forms[form].elements[element].value = "0";
				if(field.name == 'max_price'){
					document.forms[form].elements[element].value = "99999";
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
	inputs = document.evaluate('id("content")/table/tbody/tr/td[2]/b', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	elem = inputs.snapshotItem(0);
	if(elem && elem.innerHTML == "Shop Wizard")
		return true;
	return false;
}

prevItemName = GM_getValue("itemName", 0);
neoItemId = 0;

if(isShopWizardForm()){
}
else if(isShopWizardResults()){
	items = new Array();
	items = eval(GM_getValue("items", new Array()));
	pages = GM_getValue("pages", 0);
	getItemName();
	getPagePrices();
	showThisItem();
	GM_setValue("items", uneval(items));
	GM_setValue("pages", pages);
	GM_setValue("itemName", itemName);
}
