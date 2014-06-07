// ==UserScript==
// @name          Nexus Clash Alchemy Recipe Sorter
// @namespace	  http://www.quasimorto.com
// @description	  Tweaks for the alchemy recipe pane.
// @include		  http://nexusclash.com/*
// @include		  http://www.nexusclash.com/*
// ==/UserScript==

GM_addStyle("tr.recipe-complete                           { background-color: #dddddd; }");
GM_addStyle("tr.recipe-partial                            { background-color: #bbbbbb; }");
GM_addStyle("tr.recipe-empty                              { background-color: #999999; color: #ffffff; }");
GM_addStyle("span.component-rare                          { color: #990000; }");
GM_addStyle("span.component-uncommon                      { color: #000099; }");
GM_addStyle("span.component-common                        { }");
GM_addStyle("span.component-undefined                     { font-style: italic; }");
GM_addStyle("span.component-fixed                         { font-style: italic; }");
GM_addStyle("span.immutable                               { font-weight: bold; }");
GM_addStyle("tr.recipe-complete .match-safe               { background-color: #ffcc66; }");
GM_addStyle("tr.recipe-complete .match-inventory          { background-color: #bbffbb; }");
GM_addStyle("tr.recipe-complete.completionlevel-inventory { background-color: #bbffbb; }");
GM_addStyle("tr.recipe-complete.completionlevel-safe      { background-color: #ffcc66; }");
GM_addStyle("option.safeitem-rare                         { background-color: #cc6666; color: #ffffff; }");
GM_addStyle("option.safeitem-uncommon                     { background-color: #6666cc; color: #ffffff; }");
GM_addStyle("option.safeitem-common                       { background-color: #999999; color: #ffffff; }");
GM_addStyle("tr.recipe-partial form                       { display: none; }");
GM_addStyle("td.recipename                                { width: 99px; }");
GM_addStyle("td.recipelist                                { width: 170px; }");
GM_addStyle("td.summarycell                               { width: 26px; }");
GM_addStyle("td.summarycell.summary-empty                 { background-color: #777777; }");

//TODO: Add transmutation indicators, per saulres.
//TODO: Add "grab item from safe" button.

emulateGM();
var character = parseCharacterInfo();
if (character) {
	var panes = document.evaluate(
		"//tbody[tr/td/div[@class='panetitle']='Recipe Tracker']/tr[last()]/td", 
		document, 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (panes.snapshotLength == 1) {
		var recipePane = panes.snapshotItem(0);
		var components = getComponentDictionary();
		var shortNames = getShortNames();
		var fixedComponents = getFixedComponents();
		var safeItems = parseSafeItems();
		var inventoryItems = parseInventoryItems();
		parseRecipes(character, recipePane);
		setToggleListeners();
	} else if (panes.snapshotLength > 1) {
		GM_log("AlchemySorter: ERROR: Too many pane matches.");
	}
}

/**********************************************************/

function parseRecipes(character, recipePane) {
	var complete = new Array();
	var partial = new Array();
	var empty = new Array();
	
	var recipes = recipePane.innerHTML.split("<br>");
	for (var i = 0; i < recipes.length; i++) {
		if (recipes[i] == "") { 
			continue;
		}
		if (recipes[i].match(/,/)) {
			if (recipes[i].match(/incomplete$/)) {
				partial.push(formatRecipe(recipes[i], "recipe-partial"));
			} else {
				complete.push(formatRecipe(recipes[i], "recipe-complete"));
			}
		} else {
			empty.push(formatRecipe(recipes[i], "recipe-empty"));
		}
	}
	var html = "";
	html += "<table>";
	for (var i = 0; i < complete.length; i++) { html += complete[i]; }
	for (var i = 0; i < partial.length; i++)  { html += partial[i]; }
	for (var i = 0; i < empty.length; i++)    { html += empty[i]; }
	html += "</table>";
	recipePane.innerHTML = html;
}

/**********************************************************/

function formatRecipe(recipe, rowClass) {
	var empty = (rowClass == "recipe-empty");
	var partial = (rowClass == "recipe-partial");
	recipe = recipe.replace(/,? *(in)?complete$/, "");
	var recipeMatch = recipe.match(/^.*<b>(Potion of .+)<\/b> *(.*)$/);
	var completionLevel = "inventory";
	var componentString = "";
	var buttonHtml = "";
	var potionName = "";
	var componentCount = 0;
	var inventoryCount = 0;
	var safeCount = 0;
	if (recipeMatch) {
		potionName = recipeMatch[1];
		var componentList = recipeMatch[2];
		if (componentList) {
			var recipeComponents = componentList.split(", ");
			for (var i = 0; i < recipeComponents.length; i++) {
				var count = parseInt(recipeComponents[i].match(/\(x(\d+)\)/)[1]);
				var component = recipeComponents[i].replace(/ \(x\d+\)$/, "");
				var cssClass = "component-" + components[character.Class][component];
				componentCount += count;
				if (inventoryItems[component]) {
					inventoryCount += count;
					cssClass += " match-inventory";
				} else if (safeItems[component] && safeItems[component]["count"] >= count) {
					safeCount += count;
					cssClass += " match-safe";
					if (completionLevel == "inventory") {
						completionLevel = "safe";
					}
				} else {
					if (safeItems[component]) {
						safeCount += safeItems[component]["count"];
					}
					completionLevel = "short";
				}
				recipeComponents[i] = recipeComponents[i].replace(/ \(x1\)$/, "");
				recipeComponents[i] = recipeComponents[i].replace(/ /g, "&nbsp;");

				componentString += "<span class='" + cssClass + "'>" + recipeComponents[i] + "</span><br/>";
			}
			if (completionLevel == "inventory") {
				buttonHtml = '<form name="alchemyknown" action="modules.php?name=Game&amp;op=alchemy" method="POST"><input type="hidden" name="potion" value="' + potionName + '"/><input type="submit" value="brew"/></form>';
			}
		}
	}
	
	potionName = potionName.replace(/^Potion of (.+)$/, "$1");
	var fullDisplay = "table-row";
	var summaryDisplay = "none";
	if (GM_getValue(character.Id + "-toggle-" + potionName) == "summary") {
		fullDisplay = "none";
		summaryDisplay = "table-row";
	}
	
	var shortName = potionName;
	if (shortNames[potionName]) {
		shortName = shortNames[potionName];
	}
	if (empty) {
		componentString = "[<span class='component-fixed'>" + fixedComponents[potionName] + "</span>]";
	}
	if (partial && !componentString.match(fixedComponents[potionName].replace(/ /g, "&nbsp;"))) {
		var cssClass = "component-" + components[character.Class][fixedComponents[potionName]];
		componentString = "[<span class='" + cssClass + " component-fixed'>" + fixedComponents[potionName] + "</span>]<br/>" + componentString;
	}
	rowClass += " completionlevel-" + completionLevel;
	recipe = recipe.replace(/^.*<b>Potion of (.+)<\/b>.*$/, "<tr id='recipe-$1-full' class='" + rowClass + "' style='display:" + fullDisplay + "'><td valign='top' class='recipename'><a class='toggleLink' id='toggle-" + potionName + "-full'><img src='/images/g/inf/close.gif'/></a> $1 " + buttonHtml + "</td><td colspan='6' class='recipelist'>" + componentString + "</td></tr>");
	recipe += "<tr id='recipe-" + potionName + "-summary' class='" + rowClass + "' style='display:" + summaryDisplay + "'>";
	recipe += "<td valign='top' class='recipename'><a class='toggleLink' id='toggle-" + potionName + "-summary'><img src='http://nexusclash.com/images/g/inf/open.gif'/></a> " + shortName + "</td>";

	if (partial) {
		for (var i = 0; i < componentCount; i++) {
			recipe += "<td class='summarycell'></td>";
		}
		for (var i = 0; i < 6 - componentCount; i++) {
			recipe += "<td class='summarycell summary-empty'></td>";
		}
	} else if (empty) {
			recipe += "<td colspan='6' class='recipelist'></td>";
	} else {
		for (var i = 0; i < inventoryCount; i++) {
			recipe += "<td class='summarycell match-inventory'></td>";
		}
		for (var i = 0; i < safeCount; i++) {
			recipe += "<td class='summarycell match-safe'></td>";
		}
		for (var i = 0; i < 6 - inventoryCount - safeCount; i++) {
			recipe += "<td class='summarycell'></td>";
		}
	}
	recipe += "</tr>";

	return recipe;
}

/**********************************************************/

function parseSafeItems() {
	var items = new Array();

	var safe = document.evaluate(
		"//form[@name='footlockergrab']", 
		document, 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var j = 0; j < safe.snapshotLength; j++) {
		var safeType = safe.snapshotItem(j).getAttribute("action").match(/op=([^"]*)/)[1];
		var safeOptions = document.evaluate(
			".//option", 
			safe.snapshotItem(j), 
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
		for (var i = 0; i < safeOptions.snapshotLength; i++) {
			var componentMatch = safeOptions.snapshotItem(i).innerHTML.match(/(.+) \((\d+)\)$/);
			var componentId = safeOptions.snapshotItem(i).value;
			var component = componentMatch[1];
			var count     = componentMatch[2];
			if (components[character.Class][component]) {
				safeOptions.snapshotItem(i).className = "safeitem-" + components[character.Class][component];
			}
			if (items[component]) {
				items[component]["count"] += parseInt(count);
				items[component][safeType] = componentId;
			} else {
				items[component] = new Object;
				items[component]["count"] = parseInt(count);
				items[component][safeType] = componentId;
			}
		}
	}
	
	var alchemyItems = document.evaluate(
		"//form[@name='alchemyresearch' or @name='alchemytransmute']/select[@name='itemid']/option", 
		document, 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var i = 0; i < alchemyItems.snapshotLength; i++) {
		if (components[character.Class][alchemyItems.snapshotItem(i).innerHTML]) {
			alchemyItems.snapshotItem(i).className = "safeitem-" + components[character.Class][alchemyItems.snapshotItem(i).innerHTML];
		}
	}
	
	return items;
}

/**********************************************************/

function parseInventoryItems() {
	var items = new Array();
	var safeOptions = document.evaluate(
		"//form[@name='safestock' or @name='alchemyresearch']/select[@name='item' or @name='itemid']/option", 
		document, 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var i = 0; i < safeOptions.snapshotLength; i++) {
		var component = safeOptions.snapshotItem(i).innerHTML;
		if (components[character.Class][component]) {
			safeOptions.snapshotItem(i).className = "safeitem-" + components[character.Class][component];
		}
		items[component] = 1;
	}
	return items;
}

/**********************************************************/

function parseCharacterInfo() {
	var character;
	var characterInfo = document.evaluate(
		"//div[@id='CharacterInfo']//tr[1]/td[2]", 
		document, 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (characterInfo.snapshotLength == 1){
		character = new Object;
		var characterMatch = characterInfo.snapshotItem(0).innerHTML.match(/^Level (\d+) (.+)$/);
		character.Level = characterMatch[1];
		character.Class = characterMatch[2];
		var characterLink = document.evaluate(
			"//div[@id='CharacterInfo']//tr[1]/td[1]//a", 
			document, 
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
		character.Id = characterLink.snapshotItem(0).href.match(/id=(\d+)$/)[1];
	}	
	return character;
}

/**********************************************************/

function setToggle(characterId, recipe, toggleState) {
	GM_setValue(characterId + "-toggle-" + recipe, toggleState);
	var summary = document.getElementById("recipe-" + recipe + "-summary");
	var full = document.getElementById("recipe-" + recipe + "-full");
	if (toggleState == "summary") {
		full.style.display = "none";
		summary.style.display = "table-row";
	} else {
		full.style.display = "table-row";
		summary.style.display = "none";
	}
}

/**********************************************************/

function setToggleListeners() {
	var toggleLinks = document.evaluate(
		"//a[@class='toggleLink']", 
		document, 
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var i = 0; i < toggleLinks.snapshotLength; i++) {
		var link = toggleLinks.snapshotItem(i);
		setToggleListener(link);
	}
}

/**********************************************************/

function setToggleListener(link) {
	var linkMatch = link.id.match(/toggle-(.+)-(full|summary)/);
	var potion = linkMatch[1];
	var toggleType = linkMatch[2];
	link.addEventListener("click", function(){ setToggle(character.Id, potion, (toggleType == "full") ? "summary" : "full") }, false);   
}

/**********************************************************/

function emulateGM() {
	//*** GM_* functionality for Chrome
	//*** http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
		this.GM_getValue=function (key,def) {
			return localStorage[key] || def;
		};
		this.GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
		this.GM_deleteValue=function (key) {
			return delete localStorage[key];
		};
	}
}

/**********************************************************/

function getComponentDictionary() {
	var components = new Array();
	components["Defiler"] = new Array();
	components["Shepherd"] = new Array();
	components["Sorcerer"] = new Array();

	components["Defiler"]["Bag of Industrial Plastic"] = "rare";
	components["Defiler"]["Batch of Leather"] = "rare";
	components["Defiler"]["Batch of Mushrooms"] = "uncommon";
	components["Defiler"]["Blood Ice"] = "common immutable";
	components["Defiler"]["Bottle of Holy Water"] = "uncommon";
	components["Defiler"]["Bottle of Paradise Water"] = "uncommon";
	components["Defiler"]["Bunch of Daisies"] = "uncommon";
	components["Defiler"]["Bunch of Lilies"] = "rare";
	components["Defiler"]["Bunch of Paradise Lilies"] = "rare";
	components["Defiler"]["Chunk of Brass"] = "uncommon";
	components["Defiler"]["Chunk of Iron"] = "uncommon";
	components["Defiler"]["Chunk of Ivory"] = "rare";
	components["Defiler"]["Chunk of Onyx"] = "rare";
	components["Defiler"]["Chunk of Steel"] = "common";
	components["Defiler"]["Chunk of Stygian Iron"] = "common";
	components["Defiler"]["Femur"] = "common";
	components["Defiler"]["Gold Ingot"] = "uncommon";
	components["Defiler"]["Handful of Grave Dirt"] = "uncommon";
	components["Defiler"]["Humerus"] = "common";
	components["Defiler"]["Lead Brick"] = "common";
	components["Defiler"]["Patch of Lichen"] = "common";
	components["Defiler"]["Patch of Moss"] = "uncommon";
	components["Defiler"]["Piece of Stygian Coal"] = "common";
	components["Defiler"]["Piece of Wood"] = "common";
	components["Defiler"]["Rose"] = "uncommon";
	components["Defiler"]["Silver Ingot"] = "uncommon";
	components["Defiler"]["Skull"] = "common";
	components["Defiler"]["Small Bottle of Gunpowder"] = "rare";
	components["Defiler"]["Soul Ice"] = "common immutable";
	components["Defiler"]["Spool of Copper Wire"] = "rare";
	components["Defiler"]["Sprig of Nightshade"] = "rare";
	components["Defiler"]["Stygian Bone Leech"] = "common";
	components["Defiler"]["Healing Herb"] = "rare";
	components["Shepherd"]["Bag of Industrial Plastic"] = "rare";
	components["Shepherd"]["Batch of Leather"] = "rare";
	components["Shepherd"]["Batch of Mushrooms"] = "uncommon";
	components["Shepherd"]["Blood Ice"] = "rare immutable";
	components["Shepherd"]["Bottle of Holy Water"] = "common";
	components["Shepherd"]["Bottle of Paradise Water"] = "common";
	components["Shepherd"]["Bunch of Daisies"] = "uncommon";
	components["Shepherd"]["Bunch of Lilies"] = "rare";
	components["Shepherd"]["Bunch of Paradise Lilies"] = "common";
	components["Shepherd"]["Chunk of Brass"] = "uncommon";
	components["Shepherd"]["Chunk of Iron"] = "rare";
	components["Shepherd"]["Chunk of Ivory"] = "uncommon";
	components["Shepherd"]["Chunk of Onyx"] = "rare";
	components["Shepherd"]["Chunk of Steel"] = "common";
	components["Shepherd"]["Chunk of Stygian Iron"] = "uncommon";
	components["Shepherd"]["Femur"] = "common";
	components["Shepherd"]["Gold Ingot"] = "common";
	components["Shepherd"]["Handful of Grave Dirt"] = "common";
	components["Shepherd"]["Humerus"] = "common";
	components["Shepherd"]["Lead Brick"] = "uncommon";
	components["Shepherd"]["Patch of Lichen"] = "uncommon";
	components["Shepherd"]["Patch of Moss"] = "uncommon";
	components["Shepherd"]["Piece of Stygian Coal"] = "uncommon";
	components["Shepherd"]["Piece of Wood"] = "common";
	components["Shepherd"]["Rose"] = "common";
	components["Shepherd"]["Silver Ingot"] = "uncommon";
	components["Shepherd"]["Skull"] = "common";
	components["Shepherd"]["Small Bottle of Gunpowder"] = "rare";
	components["Shepherd"]["Soul Ice"] = "rare immutable";
	components["Shepherd"]["Spool of Copper Wire"] = "rare";
	components["Shepherd"]["Sprig of Nightshade"] = "rare";
	components["Shepherd"]["Stygian Bone Leech"] = "uncommon";
	components["Shepherd"]["Healing Herb"] = "common";
	components["Sorcerer"]["Bag of Industrial Plastic"] = "rare";
	components["Sorcerer"]["Batch of Leather"] = "rare";
	components["Sorcerer"]["Batch of Mushrooms"] = "uncommon";
	components["Sorcerer"]["Blood Ice"] = "uncommon immutable";
	components["Sorcerer"]["Bottle of Holy Water"] = "common";
	components["Sorcerer"]["Bottle of Paradise Water"] = "common";
	components["Sorcerer"]["Bunch of Daisies"] = "uncommon";
	components["Sorcerer"]["Bunch of Lilies"] = "rare";
	components["Sorcerer"]["Bunch of Paradise Lilies"] = "uncommon";
	components["Sorcerer"]["Chunk of Brass"] = "uncommon";
	components["Sorcerer"]["Chunk of Iron"] = "rare";
	components["Sorcerer"]["Chunk of Ivory"] = "uncommon";
	components["Sorcerer"]["Chunk of Onyx"] = "rare";
	components["Sorcerer"]["Chunk of Steel"] = "common";
	components["Sorcerer"]["Chunk of Stygian Iron"] = "common";
	components["Sorcerer"]["Femur"] = "common";
	components["Sorcerer"]["Gold Ingot"] = "rare";
	components["Sorcerer"]["Handful of Grave Dirt"] = "common";
	components["Sorcerer"]["Humerus"] = "common";
	components["Sorcerer"]["Lead Brick"] = "uncommon";
	components["Sorcerer"]["Patch of Lichen"] = "uncommon";
	components["Sorcerer"]["Patch of Moss"] = "uncommon";
	components["Sorcerer"]["Piece of Stygian Coal"] = "common";
	components["Sorcerer"]["Piece of Wood"] = "common";
	components["Sorcerer"]["Rose"] = "common";
	components["Sorcerer"]["Silver Ingot"] = "uncommon";
	components["Sorcerer"]["Skull"] = "common";
	components["Sorcerer"]["Small Bottle of Gunpowder"] = "rare";
	components["Sorcerer"]["Soul Ice"] = "uncommon immutable";
	components["Sorcerer"]["Spool of Copper Wire"] = "rare";
	components["Sorcerer"]["Sprig of Nightshade"] = "rare";
	components["Sorcerer"]["Stygian Bone Leech"] = "common";
	components["Sorcerer"]["Healing Herb"] = "uncommon";

	components["Conduit"] = components["Sorcerer"];
	components["Lich"] = components["Sorcerer"];
	components["Wizard"] = components["Sorcerer"];

	components["Corruptor"] = components["Defiler"];
	components["Dark Oppressor"] = components["Defiler"];
	components["Wyrm Master"] = components["Defiler"];

	components["Advocate"] = components["Shepherd"];
	components["Archon"] = components["Shepherd"];
	components["Lightspeaker"] = components["Shepherd"];

	return components;
}


/**********************************************************/

function getShortNames() {
	var shortNames = new Array();
	shortNames["Acid Affinity"] = "Acid Affin";
	shortNames["Cold Affinity"] = "Cold Affin";
	shortNames["Combat Clarity"] = "C Clarity";
	shortNames["Death Affinity"] = "Death Affin";
	shortNames["Electricity Affinity"] = "Elec Affin";
	shortNames["Fire Affinity"] = "Fire Affin";
	shortNames["Extended Invisibility"] = "Ext Invis";
	shortNames["Greater Invulnerability"] = "Gr Invul";
	shortNames["Holy Affinity"] = "Holy Affin";
	shortNames["Invulnerability"] = "Invul";
	shortNames["Lesser Invulnerability"] = "Less Invul";
	shortNames["Magic Recovery"] = "Magic Rec";
	shortNames["Planar Protection"] = "Planar Prot";
	shortNames["Regeneration"] = "Regen";
	shortNames["Unholy Affinity"] = "Unholy Aff";
	shortNames["Water-Breathing"] = "Water Br";	
	return shortNames;
}

/**********************************************************/

function getFixedComponents() {
	var fixedComponents = new Array();
	fixedComponents["Extended Invisibility"] = "Small Bottle of Gunpowder";
	fixedComponents["Magic Recovery"] = "Chunk of Onyx";
	fixedComponents["Greater Invulnerability"] = "Chunk of Iron";
	fixedComponents["Combat Clarity"] = "Gold Ingot";
	fixedComponents["Death Affinity"] = "Sprig of Nightshade";
	fixedComponents["Strength"] = "Bag of Industrial Plastic";
	fixedComponents["Electricity Affinity"] = "Spool of Copper Wire";
	fixedComponents["Flying"] = "Silver Ingot";
	fixedComponents["Regeneration"] = "Stygian Bone Leech";
	fixedComponents["Lesser Invulnerability"] = "Batch of Leather";
	fixedComponents["Water-Breathing"] = "Bunch of Lilies";
	fixedComponents["Acid Affinity"] = "Patch of Lichen";
	fixedComponents["Holy Affinity"] = "Bunch of Paradise Lilies";
	fixedComponents["Invisibility"] = "Batch of Mushrooms";
	fixedComponents["Unholy Affinity"] = "Blood Ice";
	fixedComponents["Invulnerability"] = "Lead Brick";
	fixedComponents["Cold Affinity"] = "Soul Ice";
	fixedComponents["Healing"] = "Skull";
	fixedComponents["Planar Protection"] = "Handful of Grave Dirt";
	fixedComponents["Fire Affinity"] = "Chunk of Brass";
	return fixedComponents;
}