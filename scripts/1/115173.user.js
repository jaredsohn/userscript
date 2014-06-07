// ==UserScript==
// @name           Zevera Auto Text
// @namespace      Changes all text to "Zevera text".
// @description    Changes all text to "Zevera text".
// @include        *    
// ==/UserScript==

//MODIFIED FOR ZEVERA

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',

///////////////////////////////////////////////////////
"megaupload.com":"zevera.com/getFiles.aspx?ourl=megaupload.com",
"rapidshare.com":"zevera.com/getFiles.aspx?ourl=rapidshare.com",
"badongo.com":"zevera.com/getFiles.aspx?ourl=badongo.com",
"depositfiles.com":"zevera.com/getFiles.aspx?ourl=depositfiles.com",
"bitshare.com":"zevera.com/getFiles.aspx?ourl=bitshare.com",
"fileserve.com":"zevera.com/getFiles.aspx?ourl=fileserve.com",
"mediafire.com":"zevera.com/getFiles.aspx?ourl=mediafire.com",
"oron.com":"zevera.com/getFiles.aspx?ourl=oron.com",
"easy-share.com":"zevera.com/getFiles.aspx?ourl=easy-share.com",
"filefactory.com":"zevera.com/getFiles.aspx?ourl=filefactory.com",
"freakshare.com":"zevera.com/getFiles.aspx?ourl=freakshare.com",
"hotfile.com":"zevera.com/getFiles.aspx?ourl=hotfile.com",
"netload.in":"zevera.com/getFiles.aspx?ourl=netload.in",
"2shared.com":"zevera.com/getFiles.aspx?ourl=2shared.com",
"4shared.com":"zevera.com/getFiles.aspx?ourl=4shared.com",
"uploading.com":"zevera.com/getFiles.aspx?ourl=uploading.com",
"megaporn.com":"zevera.com/getFiles.aspx?ourl=megaporn.com",
"wupload.com":"zevera.com/getFiles.aspx?ourl=wupload.com",
"uploadstation.com":"zevera.com/getFiles.aspx?ourl=uploadstation.com",
"megashare.com":"zevera.com/getFiles.aspx?ourl=megashare.com",
"megashares.com":"zevera.com/getFiles.aspx?ourl=megashares.com",
"kickload.com":"zevera.com/getFiles.aspx?ourl=kickload.com",
"filesonic.com":"zevera.com/getFiles.aspx?ourl=filesonic.com"};




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