// Based on the original emoticonsforblogger by MSN 
// Modified by Rose Harissa (http://roseharissa.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           MSN Icon for Blogger
// @namespace      http://roseharissa.blogspot.com
// @description    MSN emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("pompom", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/pompom.gif");
	buttons += emoticonButton("ketuk", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/007.gif");
	buttons += emoticonButton("kenyit", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft012.gif");
	buttons += emoticonButton("jelir", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft011.gif");
	buttons += emoticonButton("sengih", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft010.gif");
	buttons += emoticonButton("senyum", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft009.gif");
	buttons += emoticonButton("terkejut", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft008.gif");
	buttons += emoticonButton("marah", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft007.gif");
	buttons += emoticonButton("masam", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft006.gif");
	buttons += emoticonButton("taksyok", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft005.gif");
	buttons += emoticonButton("nangis", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft004.gif");
	buttons += emoticonButton("spek", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft003.gif");
	buttons += emoticonButton("pukau", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft002.gif");
	buttons += emoticonButton("malu", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/dft001.gif");
	buttons += emoticonButton("peace", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/048.gif");
	buttons += emoticonButton("salam", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/047.gif");
	buttons += emoticonButton("takbest", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/046.gif");
	buttons += emoticonButton("best", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/045.gif");
	buttons += emoticonButton("cinta pecah", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/044.gif");
	buttons += emoticonButton("cinta", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/043.gif");
	buttons += emoticonButton("taik", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/042.gif");
	buttons += emoticonButton("terharu", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/041.gif");
	buttons += emoticonButton("tido", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/039.gif");
	buttons += emoticonButton("bye", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/038.gif");
	buttons += emoticonButton("tengkorak", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/037.gif");
	buttons += emoticonButton("itam", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/036.gif");
	buttons += emoticonButton("tensen", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/035.gif");
	buttons += emoticonButton("tensen2", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/034.gif");
	buttons += emoticonButton("syyh", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/033.gif");
	buttons += emoticonButton("tertanya", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/032.gif");
	buttons += emoticonButton("bebel", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/031.gif");
	buttons += emoticonButton("geram", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/030.gif");
	buttons += emoticonButton("terpana", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/029.gif");
	buttons += emoticonButton("otai", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/028.gif");
	buttons += emoticonButton("ketawa", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/027.gif");
	buttons += emoticonButton("panik", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/026.gif");
	buttons += emoticonButton("ngantuk", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/025.gif");
	buttons += emoticonButton("jilat", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/024.gif");
	buttons += emoticonButton("tak koser", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/023.gif");
	buttons += emoticonButton("fikir", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/022.gif");
	buttons += emoticonButton("blushing", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/021.gif");
	buttons += emoticonButton("muntah", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/020.gif");
	buttons += emoticonButton("bengang", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/019.gif");
	buttons += emoticonButton("nganga", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/018.gif");
	buttons += emoticonButton("samseng", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/017.gif");
	buttons += emoticonButton("taksuka", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/016.gif");
	buttons += emoticonButton("wink", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/015.gif");
	buttons += emoticonButton("bunuh", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/014.gif");
	buttons += emoticonButton("gelabah", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/013.gif");
	buttons += emoticonButton("melalak", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/012.gif");
	buttons += emoticonButton("terkekeh", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/011.gif");
	buttons += emoticonButton("sadap", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/010.gif");
	buttons += emoticonButton("malu-malu", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/009.gif");
	buttons += emoticonButton("eksen", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/008.gif");
	buttons += emoticonButton("berpeluh", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/006.gif");
	buttons += emoticonButton("lucu", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/005.gif");
	buttons += emoticonButton("tergoda", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/004.gif");
	buttons += emoticonButton("kelip", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/003.gif");
	buttons += emoticonButton("bimbang", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/002.gif");
	buttons += emoticonButton("terlongo", "http://www.fileden.com/files/2008/2/16/1761624/My%20Documents/001.gif");


	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' + img size='80%' + border='0'></span>\n";
} 

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);