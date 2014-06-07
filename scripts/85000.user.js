// ==UserScript==
// @name          Quick assembly and welding in Twilight Heroes V2
// @namespace     http://www.lclerget.com
// @description   updated version to retrieve lists from the THWiki
// @include       http://*twilightheroes.com/assemble.php
// @include       http://*twilightheroes.com/weld.php
// ==/UserScript==

function Item(quantity, index) {
    this.quantity = quantity;
    this.index = index;
}
function Inventory() {
    this.items = new Array();
}
Inventory.prototype = {
    addItem: function(item, quantity, index) {
	this.items[item] = new Item(quantity, index);
    },
    gotItems: function(item1, item2) {
	if (!item1 || !item2) return false;
	if (item1 == item2) {
	    if (this.items[item1] && 
		this.items[item1].quantity > 1)
		return true;	    
	} else
	    if (this.items[item1] && this.items[item2])
		return true;
	return false;
    }
}
function Recipe(name, item1, item2) {
    this.name = name;
    this.item1 = item1;
    this.item2 = item2;
}
function Recipes(Inv, label) {
    this.Inv = Inv;
    this.group = new Array();
    this.recipes = new Array();
    this.labels = new Array();
    this.hasLabel = new Array();
    for (l in label) {
	this.labels.push(label[l]);
	this.hasLabel[label[l]]=true;
    }
}
Recipes.prototype = {
    menu: null,
    updatebutton: null,
    add: function(name, items, sep) {
	if (!items && !items[0]) return;
	items[1] = items[1]||items[0];
	sep = sep||'recipes';
	if (!this.hasLabel[sep]) {
	    this.labels.push(sep);
	    this.hasLabel[sep]=true;
	}
	if (this.Inv.gotItems(items[0], items[1])) {
	    var recipe = new Recipe(name,items[0],items[1]);
	    this.recipes[name] = recipe;
	    if (!this.group[sep])
		this.group[sep] = new Array();
	    this.group[sep].push(recipe);
	}
    },
    insert: function() {
	if (this.recipes.size < 1) return;
	var oldForm = document.getElementsByTagName('form')[0];
	if (!oldForm) return;
	var myHeader = document.createTextNode('Quick list:');
	oldForm.parentNode.insertBefore(myHeader, oldForm);
	var myForm = document.createElement('form');
	myHeader.parentNode.insertBefore(myForm, myHeader.nextSibling);
//Add button to update lists
	this.updatebutton = document.createElement('button');
	this.updatebutton.innerHTML = 'Update Quick List';
	myForm.appendChild(this.updatebutton);
	this.updatebutton.addEventListener('click', updateRec, true);
	this.menu = document.createElement('select');
	myForm.appendChild(this.menu);
	// Add recipes to drop-down menu
	for (var l in this.labels) {
	    var s = this.labels[l];
	    if (!this.group[s])
		continue;
	    myOption = document.createElement('option');
	    myOption.innerHTML = '-- '+s+' --';
	    this.menu.appendChild(myOption);
	    for (var r in this.group[s]) {
		var rec = this.group[s][r];
		myOption = document.createElement('option');
		myOption.innerHTML = rec.name;
		this.menu.appendChild(myOption);
	    }
	}
	this.menu.addEventListener('change', updateForm, true);
    }
}
function updateForm() {
    var menu = Rec.menu;
    if (!menu) return;
    var value = menu.options[menu.options.selectedIndex].innerHTML;
    if (!value) return;
    var recipe = Rec.recipes[value];
    if (!recipe) return;	
    var item1 = Inv.items[recipe.item1];
    var item2 = Inv.items[recipe.item2];
    if (!item1 || !item2) return;
    var selects = document.getElementsByTagName('select');
    selects[1].selectedIndex = item1.index;
    selects[2].selectedIndex = item2.index;
}

function updateRec() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://th.blandsauce.com/wiki/Assembly_Items",
		onload: function(response) {
			var assemblyCount;
			var matches = response.responseText.match(/<td>(.)*\n<p>\+(.)*\n<\/p>\n<\/td><td> <a href="(.)*?">(.)*?<\/a>\n<\/td><td> <a href="(.)*?">(.)*?<\/a>/gi);
			assemblyCount = matches.length;
			GM_setValue("THAssemblyCount", assemblyCount);
			for (var i = 0; i < assemblyCount; i++) {
				var itemNames = matches[i].replace(/<(.)*?>/gim,"").split(/\n/);
				itemNames[0] = itemNames[0].replace(/^(\s)*/,"");
				itemNames[0] = itemNames[0].replace(/(\s)*$/,"");
				GM_setValue("THAssemblyItem" + i + "a", itemNames[0]);
				itemNames[1] = itemNames[1].replace(/^\+(\s)*/,"");
				itemNames[1] = itemNames[1].replace(/(\s)*$/,"");
				GM_setValue("THAssemblyItem" + i + "b", itemNames[1]);
				itemNames[3] = itemNames[3].replace(/^(\s)*/,"");
				itemNames[3] = itemNames[3].replace(/(\s)*$/,"");
				GM_setValue("THAssemblyResult" + i, itemNames[3]);
				itemNames[4] = itemNames[4].replace(/^(\s)*/,"");
				itemNames[4] = itemNames[4].replace(/(\s)*$/,"");
				GM_setValue("THAssemblyCategory" + i, itemNames[4]);
			}
		}
	});
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://th.blandsauce.com/wiki/Welding_Items",
		onload: function(response) {
			var assemblyCount;
			var matches = response.responseText.match(/<td>(.)*\n<p>\+(.)*\n<\/p>\n<\/td><td> <a href="(.)*?">(.)*?<\/a>\n<\/td><td> <a href="(.)*?">(.)*?<\/a>/gi);
			assemblyCount = matches.length;
			GM_setValue("THWeldCount", assemblyCount);
			for (var i = 0; i < assemblyCount; i++) {
				var itemNames = matches[i].replace(/<(.)*?>/gim,"").split(/\n/);
				itemNames[0] = itemNames[0].replace(/^(\s)*/,"");
				itemNames[0] = itemNames[0].replace(/(\s)*$/,"");
				GM_setValue("THWeldItem" + i + "a", itemNames[0]);
				itemNames[1] = itemNames[1].replace(/^\+(\s)*/,"");
				itemNames[1] = itemNames[1].replace(/(\s)*$/,"");
				GM_setValue("THWeldItem" + i + "b", itemNames[1]);
				itemNames[3] = itemNames[3].replace(/^(\s)*/,"");
				itemNames[3] = itemNames[3].replace(/(\s)*$/,"");
				GM_setValue("THWeldResult" + i, itemNames[3]);
				itemNames[4] = itemNames[4].replace(/^(\s)*/,"");
				itemNames[4] = itemNames[4].replace(/(\s)*$/,"");
				GM_setValue("THWeldCategory" + i, itemNames[4]);
			}
		}
	});
}

function populate(Inv) {
    var items = document.getElementsByTagName('select')[1];
    if (!items) return;
    for (var i = 0; i < items.options.length; i++) {
	if (items.options[i] && items.options[i].text) {
	    var matches = items.options[i].innerHTML.match(/(.+?)(?:\s\((\d+)\))?$/);
	    var currentItem = matches[1];
	    var currentNum = matches[2]||1;
	    Inv.addItem(currentItem, currentNum, i);
	}
    }
}
// Initialize objects
Inv = new Inventory();
// New categories
Rec = new Recipes(Inv,['accessory','boots','full-body suit','gloves','helmet',
	'melee','misc','offhand','pants','potions','ranged','software','shirt','transportation','talismans']);
// Populate recipe menu
populate(Inv);

if (document.location.pathname == "/assemble.php") {
    for (var i = 0; i < GM_getValue("THAssemblyCount",-1); i++)
    {
		Rec.add(GM_getValue("THAssemblyResult" + i),
			[GM_getValue("THAssemblyItem" + i + "a"),
			GM_getValue("THAssemblyItem" + i + "b")],
			GM_getValue("THAssemblyCategory" + i));
    }  
} else if (document.location.pathname == "/weld.php") {
	for (var i = 0; i < GM_getValue("THWeldCount",-1); i++)
	{
		Rec.add(GM_getValue("THWeldResult" + i),
			[GM_getValue("THWeldItem" + i + "a"),
			GM_getValue("THWeldItem" + i + "b")],
			GM_getValue("THWeldCategory" + i));
	}
}
// Insert into menu
Rec.insert();
