// ==UserScript==
// @name British ROBLOX
// @author celliott1997
// @description British coversions for ROBLOX, script is a descendant of the TRUESLATIONS FOR ROBLOX script.
// @include *://*.roblox.com/*
// @exclude http://blog.roblox.com
// @exclude http://*.roblox.com/Forum/*
// @exclude http://wiki.roblox.com/*
// @version 1.3
// @namespace http://www.roblox.com/user.aspx?username=glosgreen2
// @icon http://icons.iconarchive.com/icons/martz90/circle-addon2/256/google-translate-icon.png
// ==/UserScript==

var words = {
// Syntax: 'Search word' : 'Replace word',
  // Uppercase
  "Pants":"Trousers",
  "Catalog":"Catalogue",
  "Blond":"Blonde",
  "Favorite":"Favourite",
  "Color":"Colour",
  "Aluminum":"Aluminium",
  "Potato Chips":"Crisps",
  "Jewelry":"Jewellery",
  "Armor":"Armour",
  "Sidewalk":"Pavement",
  "Sandbox":"Sandpit",
  "Teeter Totter":"Seesaw",
  "Sweater":"Jumper",
  "Sneakers":"Trainers",
  "Eraser":"Rubber",
  "Erase":"Delete",
  "Drug Store":"Chemist",
  "Neighbor":"Neighbour",

  // Lowercase
  "pants":"trousers",
  "catalog":"catalogue",
  "blond":"blonde",
  "favorite":"favourite",
  "color":"colour",
  "aluminum":"aluminium",
  "potato chips":"crisps",
  "jewelry":"jewellery",
  "armor":"armour",
  "sidewalk":"pavement",
  "sandbox":"sandpit",
  "teeter totter":"seesaw",
  "sweater":"jumper",
  "sneakers":"trainers",
  "eraser":"rubber",
  "erase":"delete",
  "drug store":"chemist",
  "neighbor":"neighbour",

  // Sentence case (for more than one word)
  "Drug store":"Chemist",

"":""};

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()

String.prototype.prepareRegex = function() {
  return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
  return(",pre,blockquote,code,input,button,textarea,title".indexOf(","+tag) == -1);
}

var regexs = new Array(),
replacements = new Array();

for(var word in words) {
  if(word != "") {
    regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
    replacements.push(words[word]);
  }
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";

for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
if(isOkTag(this_text.parentNode.tagName.toLowerCase()) &&(text=this_text.textContent)) {
  for(var x=0,l=regexs.length; x<l; x++) {
    text = text.replace(regexs[x], replacements[x]);
    this_text.textContent = text;}
  }
}