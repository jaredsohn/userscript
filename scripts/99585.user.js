// ==UserScript==
// @name           AA Game Card description
// @namespace      none
// @description    Shows what cards do underneath names, while playing.
// @include        http://www*.kingdomofloathing.com/aagame.php*
// @include:	   http://127.0.0.1:*/aagame.php*
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"Alchemist" : "Alchemist 1-5/5 (Common)",
"Guard" : "Guard 1-2/6 (Common)",
"Halberder" : "Halberder 4/4 (Common)",
"Mad Bomber" : "Mad Bomber 2/1 (Common) Special Attack: Deal 1 damage to all units (friendly and enemy)",
"Ninja" : "Ninja 8/1 (Common)",
"Nurse" : "Nurse 1/3 (Common) End of Round: Heal all adjacent friendly units by 1 HP. ",
"Page" : "Page 1/4 (Common) Special: The friendly card in front of her gets +1 Attack power for base attacks. ",
"Shieldman" : "Shieldman 1/4 (Common) Special: Any damage to the friendly card in front of her is reduced by 1, minimum of 1.",
"Shieldmaiden" : "Shieldmaiden 1/4 (Common) Special: Any damage to the friendly card in front of her is reduced by 1, minimum of 1.",
"Spearsman" : "Spearsman 3/5 (Common)",
"Swordsman" : "Swordsman 2-4/5 (Common) ",
"Wallman" : "Wallman 1/8 (Common)",
"Bowman" : "Bowman 1/4 (Uncommon) Special: Deal 3 damage to the enemy in Rank 2 ",
"Cleric" : "Cleric 1/1 (Uncommon) End of Round: Heal rearmost wounded friendly unit by 1-2. ",
"Coward" : "coward 2/3 (Uncommon) Special: Always runs behind cards placed after him. ",
"Hammerman" : "Hammerman 0/5 (Uncommon) Special Attack: Deals half of the opponent's max HP (round up). ",
"Horseman" : "Horseman 2/5 (Uncommon) Special: Moves up one rank when first placed.",
"Lanceman" : "Lanceman 2/3 (Uncommon) Special Attack: Deal 1 damage to Rank 2 and 3 enemies.",
"Dervish" : "Dervish 2/5 (Rare) Special Attack: Deal 0-3 damage to enemy in Rank 2 and the friendly card behind him.",
"Martyr" : "Martyr 1/3 (Rare) Special: Any damage done to the friendly card in front of Martyr is done to Martyr instead.",
"Sniper" : "Sniper 1/1 (Rare) Every Round: Deal 1-2 damage to rearmost enemy card.",
///////////////////////////////////////////////////////
"":""};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}