// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Naruto Emoticons for Blogger
// @namespace      http://wolverinex02.googlepages.com
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("byebye", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-22.gif");
	buttons += emoticonButton("seisei", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-11.gif");
	buttons += emoticonButton("fox1", "http://www.anikaos.com/041-msn_red_fox_smilies/fox_emoticons/fox_emoticons-01.gif");
	buttons += emoticonButton("ohoh", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-05.gif");
	buttons += emoticonButton("langue", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-01.gif");
	buttons += emoticonButton("fox2", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-03.gif");
	buttons += emoticonButton("heinhein", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-15.gif");
	buttons += emoticonButton("opsops", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-09.gif");
	buttons += emoticonButton("nohappy", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-13.gif");
	buttons += emoticonButton("fukyou", "http://www.anikaos.com/041-msn_red_fox_smilies/pyong_raposa_fox/pyong_raposa_fox-33.gif");
	buttons += emoticonButton("sniffsniff", "http://www.anikaos.com/041-msn_red_fox_smilies/fox_emoticons/fox_emoticons-17.gif");
	buttons += emoticonButton("ninjaninja", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-21.gif");
	buttons += emoticonButton("looklook", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-04.gif");
	buttons += emoticonButton("affaff", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-06.gif");
	buttons += emoticonButton("lollol", "http://www.anikaos.com/041-msn_red_fox_smilies/msn_red_fox_smilies-17.gif");
	buttons += emoticonButton("ecaeca", "http://www.anikaos.com/041-msn_red_fox_smilies/smilies_msn_zorrito/smilies_msn_zorrito-24.gif");
	buttons += emoticonButton("notquitedead", "http://img410.imageshack.us/img410/4417/1123671913mgw5.gif");
	buttons += emoticonButton("yupii", "http://img484.imageshack.us/img484/9489/3526emomessbrasilkm5.gif");
	buttons += emoticonButton("pandadead", "http://img159.imageshack.us/img159/6588/3496emomessbrasilnz2.gif");
	buttons += emoticonButton("barradog", "http://img410.imageshack.us/img410/9255/barra8pr6.gif");
	buttons += emoticonButton("bjimbjim", "http://img159.imageshack.us/img159/5794/msnmcombr02103mf5.gif");
	buttons += emoticonButton("thedeath", "http://img159.imageshack.us/img159/7472/imessengervariadossmiliap5.gif");
	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"50\\\" height=\\\"50\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);