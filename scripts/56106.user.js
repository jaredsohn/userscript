// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 
// Modified by Eiffel (http://eiffel38.blogspot.com)

// FEATURES
// Works only in Compose modes
// Add the Fish and Shark Poker icons at the end of the text

// TODO
// modify the script to insert the card icon directly after the cursor

// ==UserScript==
// @name           Fish and Shark Poker Icon for Blogger
// @namespace      http://www.kuribo.info/
// @description    You can use Fish Poker icons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "";

		buttons += emoticonButton("fish biggrin" , "http://membres.lycos.fr/eiffel38/fish-biggrin.gif",19,17);
		buttons += emoticonButton("fish confused" , "http://membres.lycos.fr/eiffel38/fish-confused.gif",24,17);
		buttons += emoticonButton("fish cool" , "http://membres.lycos.fr/eiffel38/fish-cool.gif",20,17);
		buttons += emoticonButton("fish cry" , "http://membres.lycos.fr/eiffel38/fish-cry.gif",22,17);
		buttons += emoticonButton("fish frown" , "http://membres.lycos.fr/eiffel38/fish-frown.gif",19,17);
		buttons += emoticonButton("fish grin" , "http://membres.lycos.fr/eiffel38/fish-grin.gif",19,17);
		buttons += emoticonButton("fish love" , "http://membres.lycos.fr/eiffel38/fish-love.gif",30,17);
		buttons += emoticonButton("fish mad" , "http://membres.lycos.fr/eiffel38/fish-mad.gif",19,17);
		buttons += emoticonButton("fish o" , "http://membres.lycos.fr/eiffel38/fish-o.gif",19,17);
		buttons += emoticonButton("fish p" , "http://membres.lycos.fr/eiffel38/fish-p.gif",19,17);
		buttons += emoticonButton("fish pleased" , "http://membres.lycos.fr/eiffel38/fish-pleased.gif",19,17);
		buttons += emoticonButton("fish rolleyes" , "http://membres.lycos.fr/eiffel38/fish-rolleyes.gif",19,17);
		buttons += emoticonButton("fish smile" , "http://membres.lycos.fr/eiffel38/fish-smile.gif",19,17);
		buttons += emoticonButton("fish thumbsup" , "http://membres.lycos.fr/eiffel38/fish-thumbsup.gif",27,17);
		buttons += emoticonButton("fish tongue" , "http://membres.lycos.fr/eiffel38/fish-tongue.gif",19,17);
		buttons += emoticonButton("fish ugly" , "http://membres.lycos.fr/eiffel38/fish-ugly.gif",19,17);
		buttons += emoticonButton("fish wink" , "http://membres.lycos.fr/eiffel38/fish-wink.gif",19,17);
		buttons += emoticonButton("fish zZz" , "http://membres.lycos.fr/eiffel38/fish-zZz.gif",24,17);
		buttons += emoticonButton("fish eek" , "http://membres.lycos.fr/eiffel38/fish-eek.gif",19,17);

    buttons += separator();

		buttons += emoticonButton("shark biggrin" , "http://membres.lycos.fr/eiffel38/shark-biggrin.gif",23,18);
		buttons += emoticonButton("shark confused" , "http://membres.lycos.fr/eiffel38/shark-confused.gif",23,18);
		buttons += emoticonButton("shark cool" , "http://membres.lycos.fr/eiffel38/shark-cool.gif",23,18);
		buttons += emoticonButton("shark cry" , "http://membres.lycos.fr/eiffel38/shark-cry.gif",23,18);
		buttons += emoticonButton("shark frown" , "http://membres.lycos.fr/eiffel38/shark-frown.gif",23,18);
		buttons += emoticonButton("shark grin" , "http://membres.lycos.fr/eiffel38/shark-grin.gif",23,18);
		buttons += emoticonButton("shark love" , "http://membres.lycos.fr/eiffel38/shark-love.gif",28,18);
		buttons += emoticonButton("shark mad" , "http://membres.lycos.fr/eiffel38/shark-mad.gif",23,18);
		buttons += emoticonButton("shark o" , "http://membres.lycos.fr/eiffel38/shark-o.gif",23,18);
		buttons += emoticonButton("shark p" , "http://membres.lycos.fr/eiffel38/shark-p.gif",23,18);
		buttons += emoticonButton("shark pleased" , "http://membres.lycos.fr/eiffel38/shark-pleased.gif",23,18);
		buttons += emoticonButton("shark rolleyes" , "http://membres.lycos.fr/eiffel38/shark-rolleyes.gif",23,18);
		buttons += emoticonButton("shark smile" , "http://membres.lycos.fr/eiffel38/shark-smile.gif",23,18);
		buttons += emoticonButton("shark thumbsup" , "http://membres.lycos.fr/eiffel38/shark-thumbsup.gif",32,18);
		buttons += emoticonButton("shark tongue" , "http://membres.lycos.fr/eiffel38/shark-tongue.gif",23,18);
		buttons += emoticonButton("shark ugly" , "http://membres.lycos.fr/eiffel38/shark-ugly.gif",23,18);
		buttons += emoticonButton("shark wink" , "http://membres.lycos.fr/eiffel38/shark-wink.gif",23,18);
		buttons += emoticonButton("shark zZz" , "http://membres.lycos.fr/eiffel38/shark-zZz.gif",26,18);
		buttons += emoticonButton("shark evil" , "http://membres.lycos.fr/eiffel38/shark-evil.gif",23,18);
		

    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url, width, height) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\""+width+"\\\" height=\\\""+height+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div><div style=\"clear: both; display: block;\"></div>\n";
}

setemoticons("formatbar");

 }, false);