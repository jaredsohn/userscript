// ==UserScript==
// @name           SiGClan to PiGClan
// @namespace      http://userscripts.org/users/23652
// @include      *sigclan.com*
// @include      *sigclan.com*
// @include      *pigclan.tk*
// @include      *vimeo.com*
// @include      *gametracker.com*
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// ==/UserScript==

var words = {
"SiG" : "PiG",
"Dogma" : "Fagma",
"Rallen" : "Scottish Fucker",
"Rick Steele" : "Shit Steele",
"Do YOU have what it takes ?" : "DINNR IS THE BEST MUDDAFUKKA!",
"£0" : "NOTHING  YOU SHIT  HEADS!  LOOOOOL",
"to shout" : "to BE GAY! LOOOOOL!",
"Specialist Infantry Group" : "Prostitutinal Inaccurate Gays",
"":""};
var html = document.body.innerHTML;

String.prototype.prepareRegex = function() {
	return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

// Function to decide whether a parent tag will have its text replaced or not
function isOkTag(tag) {
	return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
}

// Convert the "words" JSON object to an Array
var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
	if(word != "") {
		regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
		replacements.push(words[word]);
	}
}

// Do the replacement
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) {
		for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
	}
}

document.title = 'PiG Clan'