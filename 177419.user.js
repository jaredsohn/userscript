// ==UserScript==
// @name           medievalica pl
// @description    medievalica

// @include  *mediaevalia.com/*
// @include  http://www.mediaevalia.com/index.php?do=playerslist:0:3:0:50
// @include  *mediaevalia.com/index.php*
// ==/UserScript==



var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
   if(theImages[i].src.indexOf('http://www.mediaevalia.com/images/townmap/turnu1.png') != -1) theImages[i].src = 'http://imageshack.us/a/img42/3983/5izr.png';
   if(theImages[i].src.indexOf('http://imageshack.us/a/img42/3983/5izr.png') != -1) theImages[i].setAttribute('title','Wieża Piekarzy');
   
}

var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
   if(theImages[i].src.indexOf('http://www.mediaevalia.com/images/townmap/turnu2.png') != -1) theImages[i].src = 'http://img835.imageshack.us/img835/329/2wur.png';
   if(theImages[i].src.indexOf('http://img835.imageshack.us/img835/329/2wur.png') != -1) theImages[i].setAttribute('title','Wieża Tkaczy');
}

var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
   if(theImages[i].src.indexOf('http://www.mediaevalia.com/images/townmap/turnul.png') != -1) theImages[i].src = 'http://img33.imageshack.us/img33/6199/8cl6.png';
   if(theImages[i].src.indexOf('http://img33.imageshack.us/img33/6199/8cl6.png') != -1) theImages[i].setAttribute('title','Wieża Rzemieślników');
}

var words = {
	"Town Hall" : "Ratusz",
    "Fishery" : "Rybak",
    "Home" : "Dom",
    "Tutorial" : "Samouczek",
    "Poland" : "Polska",
    "Options" : "Opcje",
    "Help" : "Pomoc",
    "Players" : "Gracze",
    "Krakow" : "Kraków",
    "Bakers Tower" : "Wieża Piekarzy",
    "Craftsmen Tower" : "Wieża Rzemieślników",
    "Weavers Tower" : "Wieża Tkaczy",
    "Character name" : "Imię Postaci",
    "Town" : "Miasto",
    "Weavers Guild" : "Gildia Tkaczy",
    "Craftsmen Guild" : "Gildia Rzemieślników",
    "Bakers Guild" : "Gildia Piekarzy",
    "Guild/Ordin" : "Przynależność",
    "In Miasto" : "W Mieście",
    
"":"" };

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