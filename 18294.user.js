// ==UserScript==
// @name           JHunz's KOL Mall Store Trimmer
// @namespace      hunsley@gmail.com
// @description    Removes all items from mall stores that are priced over a certain configurable amount, or at 100 meat.
// @include        *kingdomofloathing.com/mallstore.php*
// @include        http://127.0.0.1:60*/mallstore.php*
// @include        *kingdomofloathing.com/account.php*
// @include        http://127.0.0.1:60*/account.php*
// ==/UserScript==

maxprice = GM_getValue('max',999999998);
minprice = GM_getValue('min',101);
if (window.location.pathname == "/mallstore.php") {
	var node,textnodes;

	textnodes = document.evaluate("//text()",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0;i<textnodes.snapshotLength;i++) {
		node = textnodes.snapshotItem(i);
		s = node.data;
		if (s.match("^.* Meat$")) {
			price = parseInt(s.replace(/[^0-9]/g,''));
			if ((price < minprice) || (price > maxprice)) {
				node.parentNode.parentNode.parentNode.removeChild(node.parentNode.parentNode);
			}
		}
	}
}

//Account page - create an element to let the user set their min/max prices
if (window.location.pathname == "/account.php") {
	//title bar
	var titleBar = document.createElement('div');
	with (titleBar) {
		appendChild(document.createTextNode('Mall Store Trimmer'));
		style.padding = "1px 0 1px 0";
		style.textAlign = "center";
		style.color = "white";
		style.backgroundColor = "blue";
		style.fontWeight = "bold";
	}

	//create form
	var optionsForm = document.createElement('form');
	optionsForm.style.textAlign = 'center';

	//create text input for min price
	var textInput1 = document.createElement('input');
	with(textInput1) {
		setAttribute("type","text");
		setAttribute("value",minprice);
		setAttribute("name","minprice");
		style.width='15%';
	}
	//create text input for max price
	var textInput2 = document.createElement('input');
	with(textInput2) {
		setAttribute("type","text");
		setAttribute("value",maxprice);
		setAttribute("name","maxprice");
		style.width='15%';
	}

	//create button to save price levels
	var saveButton = document.createElement('input');
	with (saveButton) {
		setAttribute("class","button");
		setAttribute("type","button");
		setAttribute("value","Save");
		addEventListener('click',function(event) {
			minprice = parseInt(textInput1.value);
			if ((minprice < 100) || (minprice > 999999998)) {
				minprice = 101;
				textInput1.value = minprice;
			}
			maxprice = parseInt(textInput2.value);
			if ((maxprice > 999999998) || (maxprice < 100)) {
				maxprice = 999999998;
				textInput2.value = maxprice;
			}
			GM_setValue('min',minprice);
			GM_setValue('max',maxprice);
		},false);
	}

	//add stuff to form
	with(optionsForm) {
		appendChild(document.createTextNode('Min price '));
		appendChild(textInput1);
		appendChild(document.createTextNode(' Max price '));
		appendChild(textInput2);
		appendChild(saveButton);
	}

	wrapper = document.createElement('div');
	with(wrapper) {
		style.width = '95%';
		style.border = 'thin solid blue';
		appendChild(titleBar);
		appendChild(optionsForm);
	}

	var loc = document.getElementsByTagName('center')[2];
	if(loc.lastChild.textContent.indexOf("This account will") != 0)var loc = document.getElementsByTagName('center')[3];
	loc.insertBefore(wrapper,loc.lastChild);
}

