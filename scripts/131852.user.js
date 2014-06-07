// ==UserScript==
// @name       Something Awful Forum Beautifier
// @namespace  http://www.gocomics.com/marmaduke
// @version    0.1
// @description  a faster, more vibrant forums experience
// @match      http://forums.somethingawful.com/*
// @copyright  2012+, You
// ==/UserScript==

var navbar, newElement;
navbar = document.getElementById('copyright');
if (navbar) {
    newElement = document.createElement('div');
    navbar.innerHTML = '<div><img src="http://i.imgur.com/WTe7d.png"></div>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}
// This section:
// @copyright      JoeSimmons
// @namespace      http://userscripts.org/users/23652

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"kewpuh" : "heavyset, elephantine piece of shit",
"when i dip you dip we dip" : "when i suck you fuck we're gay together",
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

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://fi.somethingawful.com/images/title-kewpuhh.gif") {
         ilist[i].src = "http://i.imgur.com/hl1tH.jpg";
    }
}