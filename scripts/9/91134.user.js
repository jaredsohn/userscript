// ==UserScript==
// @name           Gart v2
// @namespace      GLB
// @include        http://goallineblitz.com/*
// @include        https://goallineblitz.com/*
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"uo&#305;so&#1503;dx&#477; &#305;&#1503;&#592;&#613" : "uoısoןdxǝ ıןɐɥ",
"uo&#305;so&#1503;dx&#477" : "uoısoןdxǝ",
"Moose Jaw Roughriders" : "Moose, No Hobo",
"Brooklyn Breast Milk" : "I Love Big Breasteses",
"Crouching African Hidden Elephants" : "2000 Called.  It Said You Need a New Name",
"NBA Jam Arcade" : "Guilty by Association to a Complete Retard",
"Lincoln Navigators" : "Might Finally Win WL...Or Not",
"Saigon Whores" : "Saigon Hookers Inc.",
"Chocolate Blaze" : "The Team Owned by a Complete Retard +10",
"Cobra Kai" : "LOL Cobra Cry!",
"Alpine__" : "Alpine No Underlines",
"Black Sea Sunami" : "Black Sea Tsunami",
"The Osaka Buckeyes" : "The Osucka Buckeyes",
"Royal Blue Drunken Smurfs of Funkalicious Labatt" : "Smurfs",
"Djibouti Arms Dealing Doomsday Yodelers" : "D.A.D.D.Y.",
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