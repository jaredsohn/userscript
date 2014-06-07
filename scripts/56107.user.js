// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 
// Modified again by Eiffel (http://eiffel38.blogspot.com)

// FEATURES
// Works only in Compose modes
// Add the cards icons at the end of the text

// TODO
// modify the script to insert the card icon directly after the cursor

// ==UserScript==
// @name           Cards Icon for Blogger
// @namespace      http://www.kuribo.info/
// @description    You can use card icons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "";
		
		buttons += emoticonButton("2s" , "http://membres.lycos.fr/eiffel38/cards/2s.png");
		buttons += emoticonButton("3s" , "http://membres.lycos.fr/eiffel38/cards/3s.png");
		buttons += emoticonButton("4s" , "http://membres.lycos.fr/eiffel38/cards/4s.png");
		buttons += emoticonButton("5s" , "http://membres.lycos.fr/eiffel38/cards/5s.png");
		buttons += emoticonButton("6s" , "http://membres.lycos.fr/eiffel38/cards/6s.png");
		buttons += emoticonButton("7s" , "http://membres.lycos.fr/eiffel38/cards/7s.png");
		buttons += emoticonButton("8s" , "http://membres.lycos.fr/eiffel38/cards/8s.png");
		buttons += emoticonButton("9s" , "http://membres.lycos.fr/eiffel38/cards/9s.png");
		buttons += emoticonButton("ts" , "http://membres.lycos.fr/eiffel38/cards/ts.png");
		buttons += emoticonButton("js" , "http://membres.lycos.fr/eiffel38/cards/js.png");
		buttons += emoticonButton("qs" , "http://membres.lycos.fr/eiffel38/cards/qs.png");
		buttons += emoticonButton("ks" , "http://membres.lycos.fr/eiffel38/cards/ks.png");
		buttons += emoticonButton("as" , "http://membres.lycos.fr/eiffel38/cards/as.png");
		buttons += emoticonButton("ks" , "http://membres.lycos.fr/eiffel38/cards/xs.png");

    buttons += separator();

		buttons += emoticonButton("2h" , "http://membres.lycos.fr/eiffel38/cards/2h.png");
		buttons += emoticonButton("3h" , "http://membres.lycos.fr/eiffel38/cards/3h.png");
		buttons += emoticonButton("4h" , "http://membres.lycos.fr/eiffel38/cards/4h.png");
		buttons += emoticonButton("5h" , "http://membres.lycos.fr/eiffel38/cards/5h.png");
		buttons += emoticonButton("6h" , "http://membres.lycos.fr/eiffel38/cards/6h.png");
		buttons += emoticonButton("7h" , "http://membres.lycos.fr/eiffel38/cards/7h.png");
		buttons += emoticonButton("8h" , "http://membres.lycos.fr/eiffel38/cards/8h.png");
		buttons += emoticonButton("9h" , "http://membres.lycos.fr/eiffel38/cards/9h.png");
		buttons += emoticonButton("th" , "http://membres.lycos.fr/eiffel38/cards/th.png");
		buttons += emoticonButton("jh" , "http://membres.lycos.fr/eiffel38/cards/jh.png");
		buttons += emoticonButton("qh" , "http://membres.lycos.fr/eiffel38/cards/qh.png");
		buttons += emoticonButton("kh" , "http://membres.lycos.fr/eiffel38/cards/kh.png");
		buttons += emoticonButton("ah" , "http://membres.lycos.fr/eiffel38/cards/ah.png");
		buttons += emoticonButton("kh" , "http://membres.lycos.fr/eiffel38/cards/xh.png");

    buttons += separator();

		buttons += emoticonButton("2c" , "http://membres.lycos.fr/eiffel38/cards/2c.png");
		buttons += emoticonButton("3c" , "http://membres.lycos.fr/eiffel38/cards/3c.png");
		buttons += emoticonButton("4c" , "http://membres.lycos.fr/eiffel38/cards/4c.png");
		buttons += emoticonButton("5c" , "http://membres.lycos.fr/eiffel38/cards/5c.png");
		buttons += emoticonButton("6c" , "http://membres.lycos.fr/eiffel38/cards/6c.png");
		buttons += emoticonButton("7c" , "http://membres.lycos.fr/eiffel38/cards/7c.png");
		buttons += emoticonButton("8c" , "http://membres.lycos.fr/eiffel38/cards/8c.png");
		buttons += emoticonButton("9c" , "http://membres.lycos.fr/eiffel38/cards/9c.png");
		buttons += emoticonButton("tc" , "http://membres.lycos.fr/eiffel38/cards/tc.png");
		buttons += emoticonButton("jc" , "http://membres.lycos.fr/eiffel38/cards/jc.png");
		buttons += emoticonButton("qc" , "http://membres.lycos.fr/eiffel38/cards/qc.png");
		buttons += emoticonButton("kc" , "http://membres.lycos.fr/eiffel38/cards/kc.png");
		buttons += emoticonButton("ac" , "http://membres.lycos.fr/eiffel38/cards/ac.png");
		buttons += emoticonButton("kc" , "http://membres.lycos.fr/eiffel38/cards/xc.png");

    buttons += separator();

		buttons += emoticonButton("2d" , "http://membres.lycos.fr/eiffel38/cards/2d.png");
		buttons += emoticonButton("3d" , "http://membres.lycos.fr/eiffel38/cards/3d.png");
		buttons += emoticonButton("4d" , "http://membres.lycos.fr/eiffel38/cards/4d.png");
		buttons += emoticonButton("5d" , "http://membres.lycos.fr/eiffel38/cards/5d.png");
		buttons += emoticonButton("6d" , "http://membres.lycos.fr/eiffel38/cards/6d.png");
		buttons += emoticonButton("7d" , "http://membres.lycos.fr/eiffel38/cards/7d.png");
		buttons += emoticonButton("8d" , "http://membres.lycos.fr/eiffel38/cards/8d.png");
		buttons += emoticonButton("9d" , "http://membres.lycos.fr/eiffel38/cards/9d.png");
		buttons += emoticonButton("td" , "http://membres.lycos.fr/eiffel38/cards/td.png");
		buttons += emoticonButton("jd" , "http://membres.lycos.fr/eiffel38/cards/jd.png");
		buttons += emoticonButton("qd" , "http://membres.lycos.fr/eiffel38/cards/qd.png");
		buttons += emoticonButton("kd" , "http://membres.lycos.fr/eiffel38/cards/kd.png");
		buttons += emoticonButton("ad" , "http://membres.lycos.fr/eiffel38/cards/ad.png");
		buttons += emoticonButton("kd" , "http://membres.lycos.fr/eiffel38/cards/xd.png");

    buttons += separator();

		buttons += emoticonButton("2x" , "http://membres.lycos.fr/eiffel38/cards/2x.png");
		buttons += emoticonButton("3x" , "http://membres.lycos.fr/eiffel38/cards/3x.png");
		buttons += emoticonButton("4x" , "http://membres.lycos.fr/eiffel38/cards/4x.png");
		buttons += emoticonButton("5x" , "http://membres.lycos.fr/eiffel38/cards/5x.png");
		buttons += emoticonButton("6x" , "http://membres.lycos.fr/eiffel38/cards/6x.png");
		buttons += emoticonButton("7x" , "http://membres.lycos.fr/eiffel38/cards/7x.png");
		buttons += emoticonButton("8x" , "http://membres.lycos.fr/eiffel38/cards/8x.png");
		buttons += emoticonButton("9x" , "http://membres.lycos.fr/eiffel38/cards/9x.png");
		buttons += emoticonButton("tx" , "http://membres.lycos.fr/eiffel38/cards/tx.png");
		buttons += emoticonButton("jx" , "http://membres.lycos.fr/eiffel38/cards/jx.png");
		buttons += emoticonButton("qx" , "http://membres.lycos.fr/eiffel38/cards/qx.png");
		buttons += emoticonButton("kx" , "http://membres.lycos.fr/eiffel38/cards/kx.png");
		buttons += emoticonButton("ax" , "http://membres.lycos.fr/eiffel38/cards/ax.png");
		buttons += emoticonButton("kx" , "http://membres.lycos.fr/eiffel38/cards/xx.png");

    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"20\\\" height=\\\"14\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div><div style=\"clear: both; display: block;\"></div>\n";
}

setemoticons("formatbar");

 }, false);