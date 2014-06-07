// ==UserScript==
// @name           ZeroSec.ws Newzbin Search
// @namespace      userscripts.org/scripts/show/65603
// @description    Adds Newzbin search to ZeroSec.ws
// @include        http://*zerosec.ws*
//
// @version 1.50
//
// @history 1.50 Added search support for Newzbin posts (removes Ninjavideo links)
// @history 1.01 Added support for nzbindex.com (used by some zerosec editors)
// @history 1.00 Initial Release

// ==/UserScript==
(function() {
    var replacements, regex, key, linknodes, link, linkUri, linkText, i, s;
    replacements = {
         "https*://.*binsearch\\.info/\\?adv_age=": "http://v3.newzbin.com/search/query/?area=-1&fpn=f&searchaction=Go&areadone=-1&q=",
		 "https*://.*binsearch\\.info/.*\\?q=": "http://v3.newzbin.com/search/query/?area=-1&fpn=f&searchaction=Go&areadone=-1&q=",
		 "https*://.*nzbindex\\.com/.*\\?q=": "http://v3.newzbin.com/search/query/?area=-1&fpn=f&searchaction=Go&areadone=-1&q=",
		 ".*newzleech\\.com/.*q=": "http://v3.newzbin.com/search/query/?area=-1&fpn=f&searchaction=Go&areadone=-1&q=",
		 "http.*google\\.com/search\\?q=site%3Aninjavideo.net\\+inurl:video\\+": "http://v3.newzbin.com/search/query/?area=-1&fpn=p&searchaction=Go&areadone=-1&q=",
		 "&mode=usenet&adv=": ""};
    regex = {};
    for (key in replacements) {
        regex[key] = new RegExp(key, 'g');
    }

    linknodes = document.evaluate(
        "//a",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

for (var i = 0; i < linknodes.snapshotLength; i++) {
   link = linknodes.snapshotItem(i);
   s = link.href;

        for (key in replacements) {
            s = s.replace(regex[key], replacements[key]);
        }
        link.href = s;

}
})();

var words = {
'Usenet Search' : 'Newzbin (raw)',
'Usenet Download' : 'Newzbin (raw)',
'Usenet' : 'Newzbin (raw)',
'NinjaVideo' : 'Newzbin (posts)',
};

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
var ok = true;
var badTags = new Array('pre','blockquote','code','input','button','textarea');
for each(var badTag in badTags) if(tag==badTag) ok=false;
return ok;
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}

var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0; x<regexs.length; x++) text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
}