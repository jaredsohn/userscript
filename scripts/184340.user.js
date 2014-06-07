// include - 只針對這部分的網站
// match      http://*/* - 作用於所有網站
// ==UserScript==
// @name           Getchu unBlocker
// @namespace      http://userscripts.org/users/184340
// @description    使用210.155.150.152可以正常访问GETCHU
// @include        http://210.155.150.152/*
// @include        http://www.getchu.com/*
// @exclude        http://userscripts.org/scripts/review/184340
// @copyright      MAYBREATH
// @version        1.3
// @license        BSD
// @require        BSD
// @run-at         document-start
// ==/UserScript==

var domainnames = ['www.getchu.com'];  //array of domain names of blocked sites
var ipaddresses = ['210.155.150.152'];	//array of IP addresses of blocked sites

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	for (var j = 0; j < domainnames.length; j++) {
		if (thisLink.href.match(domainnames[j])) {
			thisLink.href = thisLink.href.replace(domainnames[j], ipaddresses[j]);
		}
	}
}

var domainname = 'www.getchu';  //domain name of blocked site
var ipaddress = '210.155.150.152';	//IP address of blocked site


var allImgs, thisImg;
allImgs = document.evaluate(
    '//img',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImgs.snapshotLength; i++) {
    thisImg = allImgs.snapshotItem(i);
    if (thisImg.src.match(domainname)) {
		thisImg.src = thisImg.src.replace(domainname, ipaddress);
}
}




var words = {
    ///////////////////////////////////////////////////////

    
    // Syntax: 'Search word' : 'Replace word',
  

    "http://www.getchu.com" : "http://210.155.150.152",
   
    
    
    ///////////////////////////////////////////////////////
    "":""};


//======================================================================================


//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
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
