// ==UserScript==
// @name           Minecraft Subforum Stuff
// @namespace      
// @author         Hacksore, edited by the great Inacio and then helped by Hacksore again
// @description    Fun thingies for us aspies
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include        http://*.facepunch.com*
// @include        http://*.facepunch.com/*



// ==/UserScript==
var img = document.getElementsByTagName("img");
var pageraw = document.getElementById("breadcrumb").innerHTML.substr(215);
var page = pageraw.substr(0,9);
var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"Artistic" : "Autistic",
///////////////////////////////////////////////////////
"":""};


if(page=="Minecraft"){

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

var postbit = document.getElementsByTagName("div");
var nav = document.getElementById("navbarlinks");
nav.innerHTML="<div class=navbarlink><a href=http://www.facepunch.com/forums/383-Minecraft><img alt=Asperger's Fun Corner src=http://mcskinsearch.com/ul/images/1299040160.png title=Minecraft Forum>Asperger's Fun Corner </a></div>"+nav.innerHTML+"&nbsp;";



for(i=0;i<img.length;i++){
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/palette.png"){
		img[i].src="http://mcskinsearch.com/ul/images/1299040160.png";
			img[i].title="Autistic";
	}

	
}
}