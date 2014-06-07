// ==UserScript==
// @name           Replace MRA Text On Webpages
// @description    Replaces MRA text on websites. Now supports wildcards in search queries. Won't replace text in certain tags like links and code blocks
// @include        http://*
// @include        https://*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      JoeSimmons, DaveGreig
// @version        1.0.0
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"im*o" : "in my honest opinion",
///////////////////////////////////////////////////////
"kino'ed":"groped",
"Kino'ed":"Groped",
"Kinoing":"Groping",
"kinoing":"groping",
"kino":"grope",
"Kino":"Grope",
"neg":"belittle",
"negged":" belittled",
"Neg":"Belittle",
"alpha":"rapist",
"beta":"failed rapist",
"lmr":"said no",
"LMR":"said NO",
"cockblock":"stop me from raping",
"Cockblock":"Stop me from raping",
"k-close":"cry",
"K-Close":"cry",
"Kiss Close":"cry",
"kiss close":"cry",
"F-Close":"cry in the shower",
"Fuck-Close":"cry in the shower",
"F-close":"cry in the shower",
"Number Close":"strike out",
"number close":"strike out",
"f-close":"cry in the shower",
"slut":"woman",
"sluts":"women",
"PUA":"nerd rapist",
"PUAs":"nerd rapists",
"PUAing":"attempted rape",
"AFC":"normal",
"Average Frustrated Chump":"normal",
"average frustrated chump":"normal",
"The Game":"How To Rape",
"Neil Strauss":"Neil 'Rape Apologist' Strauss",
"Ross Jefferies":"Alan Alda",
"Tyler Durden":"Phil Donohue",
"Mystery":"Yanni",
"sarged":"molested",
"sarge":"molest",
"SARGE":"Molest",
"Sarge":"Molest",
"sarging":"molesting",
"Sarging":"Molesting",
"peacocking":"freakshowing",
"Peacocking":"Freakshowing",
"peacock":"freakshow",
"Peacock":"freakshow",
"HB":"KC",
"HB10":"KC10",
"HB9":"KC9",
"HB8":"KC8",
"HB7":"KC7",
"HB6":"KC6",
"HB5":"KC5",
"HB4":"KC4",
"HB3":"KC3",
"HB2":"KC2",
"HB1":"KC1",
"Hot Babe":"Konami Code",
"hot babe":"Konami code",
"AMOG":"Rapist-in-Chief",
"DHV":"desperate bragging",
"SNL":"John Belushi",
"Social Proof":"badly needed validation",
"social proof":"badly needed validation",
"IOI":"delusion",
"ASD":"anti-rape defense",
"bitch-shield":"rape-shield",
"Bitch-shield":"Rape-shield",
"Bitch-Shield":"Rape-Shield",
"EV":"Creeping",
"Flake":"Hard to Rape",
"flakey":"hard to rape",
"FR":"Letter to Penthouse Forum",
"Field Report":"Letter to Penthouse Forum",
"field report":"letter to Penthouse Forum",
"AA":"Rape Nerves",
"Approach Anxiety":"Rape Nerves",
"approach anxiety":"rape nerves",
"Chump":"decent human being",
"chump":"decent human being"


};

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
return (",code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'g'));
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