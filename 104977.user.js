// ==UserScript==
// @name           TRUESLATIONS - ROBLOX
// @namespace      truroblox
// @description    True translations of roblox
// @include        http://roblox.com/*
// @exclude        http://blog.roblox.com
// @exclude        http://*.roblox.com/Forum/*
// ==/UserScript==



var words = {

///////////////////////////////////////////////////////

// Syntax: 'Search word' : 'Replace word',
"ROBLOX" : "Dumbfuck",
"Catalog" : "HATS",
"Games" : "FREE MODELED SHITS",
"News" : "HAT NEWZ",
"Scary" : "Werehogs",
"Sports" : "fat pplz",
"Adventure" : "SONIC UNLEASHED",
"Sports" : "fat pplz",
"Parents" : "Mom and Dad",
"People" : "Idiots",
"Forum" : "Pervs",
"Contests" : "Not worth it!",
"Builders Club" : "N00B CLUB",
"ROBUX" : "PIXEL SPERM",
"Tickets" : "PIXEL EGGS",
"friend requests" : "haters",
"new messages" : "hatemail",
"Play & Vote" : "OMG VOET MEEE PLZ U GET +10 RAYTINZ",
"Rules" : "Break these rules. :)",
"Leaders":"Ch34t3rz!",
"Two player":"THREESOME",
"Survive":"Have HARD BUTTSEX WITH",
"Zombie":"Zombie (NOTE: NOT LEFT 4 DEAD)",
"Obby":"sexual experience",
"Escape the":"Let's have sex at",
"Excape the":"Let's have sex at",
"Robloxia":"Chun-nan",
"Sword Fight":"Penis Stab",
"Sword Fighting":"Penis Stabbing",
"Account Deleted":"WHY THE FUCK!!!!",
"app*":"www.",
"SONICTHEHEDGEHOGXX":"Dumbass Belieber",
"MaKKAPAKKA3":"MAKKAPAKKA3 THE EPIC GUY",
"FoobyZeeky":"FOOBYZEEKY THE EPIC GUY",
"Jazman111":"JARAD THE FURRY",
"Escape from":"Rape all the girls at",

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