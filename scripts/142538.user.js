// ==UserScript==
// @name           menu
// @description    pirates menu

// @include  *piratesglory.com/*
// ==/UserScript==
    
var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
   if(theImages[i].src.indexOf('http://s2.piratesglory.com/images/menu/menu_en.gif') != -1) theImages[i].src = 'http://img6.imageshack.us/img6/1425/menupl.png';
}

var words = {
	"Fleet Name" : "Nazwa Floty",
	"Total Ships" : "Statków",
	"Danger Rating" : "Współczynnik Niebezpieczeństwa",
	"Current Port" : "Obecny Port",
"The higher the danger rating of a fleet," : "Im wyższy współczynnik niebezpieczeństwa floty,",
"the higher your fleet will appear in other players attack list." : "tym wyżej będzie umiejscowiona twoja flota w menu ataku innego gracza.",
"A fleet with danger up to 2 will never appear in the attack list of another player." : "Flota ze wszpółczynnikiem do 2 nigdy nie będzie na liście ataku u innych.",
"Danger Table" : "Współczynnik",
"+1 for each port movement" : "+1 za każdy ruch do portu",
"+6 for each attack" : "+6 za każdy atak",
"-18 for each defend" : "-18 za każdą obronę",
"-1 per hour" ; "-1 na godzinę"
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