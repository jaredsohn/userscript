// ==UserScript==
// @name           MoFeatures
// @namespace      
// @author         Hacksore
// @description    Stuff for facepunch
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include        http://*.facepunch.com*
// @include        http://*.facepunch.com/*



// ==/UserScript==

var urlraw = document.location.href;
var url = urlraw.substr(36);


var pageraw = document.getElementById("breadcrumb").innerHTML.substr(215);
var page = pageraw.substr(0,9);

var postbit = document.getElementsByTagName("div");
var nav = document.getElementById("navbarlinks");
nav.innerHTML="<div class=navbarlink><a href=http://www.facepunch.com/forums/383-Minecraft><img alt=Minecraft Forum src=http://mcskinsearch.com/ul/images/1299040160.png title=Minecraft Forum>Minecraft Forum </a></div><div class=navbarlink><a href=http://www.facepunch.com/forums/353-Web-Development><img alt=WebDev Forum src=http://cdn.fpcontent.net/fp/ratings/programming_king.png title=WebDev Forum>WebDev Forum </a></div>"+nav.innerHTML+"&nbsp;";

var steam = document.getElementsByTagName("a");
for(i=0;i<steam.length;i++){
	if(steam[i].href.substr(29)=="http://steamcommunity.com/id/"){
		username = steam[i].href.substr(30,steam.length);
}
for(i=0;i<postbit.length;i++){

if (postbit[i].id=="userdata"){

var mcskin = "<br><img style='padding:5px;' onerror='this.src=http://www.mcskinsearch.com/img/no.png' src='http://hacksore.x10.mx/2d.php?username="+username+"'  /></a>";

postbit[i].innerHTML=postbit[i].innerHTML+"<br><br><br><br><br>"+mcskin;	


}
}


var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"Artistic" : "Autistic",

///////////////////////////////////////////////////////
"":""};


if(page=="Minecraft" || url=="Minecraft" ){

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



var img = document.getElementsByTagName("img");


for(i=0;i<img.length;i++){
	
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/palette.png"){
		img[i].src="http://mcskinsearch.com/ul/images/1299040160.png";
		img[i].alt="Autistic";
	}
	
	
}
	
}
