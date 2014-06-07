// ==UserScript==
// @name           butt leegue
// @namespace      GLB
// @include        http://goallineblitz.com/*
// @include        https://goallineblitz.com/*
// @svc:version    [0.7.0]
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"World League" : "butt leegue",
"Death Valley Fightin' Tigers" : "death valley fightin butts",
"Queen City Black Cats" : "queen city black butts",
"Black Hand Gods of War" : "black hand gods of butt",
"A Team of Ice and Fire" : "a butt of ice and fire",
"The New York Empire" : "the new york butt",
"Black Sea Squall" : "black sea butt",
"Honolulu Hurricane Wife Carriers" : "honolulu hurricane butt carriers",
"Machu Picchu Hidden Dragons" : "machu picchu hidden butts",
"Moose Jaw Roughriders" : "moose jaw buttriders",
"Korb Destroyers" : "butt destroyers",
"C-Town MF'n Hood" : "c town mfn butts",
"Jebediah's Oblong Ball Club" : "jebediahs oblong butt club",
"Lincoln Navigators" : "linkin buttgators",
"Alpine" : "buttpine",
"Chocolate Blaze" : "chocolate butt",
"Djibouti Arms Dealing Doomsday Yodelers" : "djibouti butt dealing doomsday yodelers",
"Canton Immortals" : "canton buttmortals",
"Sofia Spiders" : "butt spiders",
"Eastern European Alliance" : "eastern european alliance",
"Devonport Devils" : "buttport devils",
"All The King's Men" : "all the kings butts",
"Dallas Longhorns" : "dallas butthorns",
"Chicago Hedgehogs" : "chicago butthogs",
"Krungthep Garudas" : "buttthep garudas",
"East St Louis Tire Fires" : "butt tire fires",
"The African Predators" : "the african butts",
"Mayan Prophecy" : "butt prophecy",
"Odessa Mojo" : "butt mojo",
"Providence Radicals" : "butt radicals",
"So Cal BDC" : "so cal butts",
"Finhali Demotied" : "halifax buttplosion",
"Buda Pests" : "butt pests",
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