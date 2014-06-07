// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by pikakitty (http://tinkerbell-cafe.blogspot.com/) 
// Credits to (rinku726.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Pikakitty for Blogger
// @namespace      http://tinkerbell-cafe.blogspot.com/
// @description    BIBI1004 EMOTICONS.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("1", "http://img231.imageshack.us/img231/2796/bibi1004024.jpg");
	buttons += emoticonButton("2", "http://img594.imageshack.us/img594/9795/bibi1004023.jpg");
	buttons += emoticonButton("3", "http://img232.imageshack.us/img232/8345/bibi1004022.jpg");
	buttons += emoticonButton("4", "http://img231.imageshack.us/img231/3856/bibi1004021.jpg");
	buttons += emoticonButton("5", "http://img641.imageshack.us/img641/3158/bibi1004020.jpg");
	buttons += emoticonButton("6", "http://img9.imageshack.us/img9/8490/bibi1004019.jpg");
	buttons += emoticonButton("7", "http://img34.imageshack.us/img34/5847/bibi1004018.jpg");
	buttons += emoticonButton("8", "http://img600.imageshack.us/img600/3629/bibi1004017.jpg");
	buttons += emoticonButton("9", "http://img713.imageshack.us/img713/4540/bibi1004016.jpg");
	buttons += emoticonButton("10", "http://img836.imageshack.us/img836/5663/bibi1004015.jpg");
	buttons += emoticonButton("11", "http://img707.imageshack.us/img707/8052/bibi1004014.jpg");
	buttons += emoticonButton("12", "http://img809.imageshack.us/img809/9082/bibi1004013.jpg");
	buttons += emoticonButton("13", "http://img801.imageshack.us/img801/7287/bibi1004012r.jpg");
	buttons += emoticonButton("14", "http://img84.imageshack.us/img84/3007/bibi1004011w.jpg");
	buttons += emoticonButton("15", "http://img864.imageshack.us/img864/7148/bibi1004010.jpg");
	buttons += emoticonButton("16", "http://img143.imageshack.us/img143/6586/bibi1004009.jpg");
	buttons += emoticonButton("17", "http://img88.imageshack.us/img88/3306/bibi1004008.jpg");
	buttons += emoticonButton("18", "http://img691.imageshack.us/img691/6029/bibi1004007.jpg");
	buttons += emoticonButton("19", "http://img543.imageshack.us/img543/7176/bibi1004006.jpg");
	buttons += emoticonButton("20", "http://img135.imageshack.us/img135/8273/bibi1004005x.jpg");
	buttons += emoticonButton("21", "http://img834.imageshack.us/img834/1677/bibi1004004.jpg");
	buttons += emoticonButton("22", "http://img15.imageshack.us/img15/3778/bibi1004003.jpg");
	buttons += emoticonButton("23", "http://img827.imageshack.us/img827/9105/bibi1004002.jpg");
	buttons += emoticonButton("24", "http://img638.imageshack.us/img638/8838/bibi1004001m.jpg");
	buttons += emoticonButton("25", "http://img695.imageshack.us/img695/7782/131t.gif");
	buttons += emoticonButton("26", "http://img33.imageshack.us/img33/884/121dg.gif");
	buttons += emoticonButton("27", "http://img862.imageshack.us/img862/7532/104z.gif");
	buttons += emoticonButton("28", "http://img39.imageshack.us/img39/2083/090c.gif");
	buttons += emoticonButton("29", "http://img838.imageshack.us/img838/7148/088m.gif");
	buttons += emoticonButton("30", "http://img825.imageshack.us/img825/7800/086n.gif");
	buttons += emoticonButton("31", "http://img805.imageshack.us/img805/946/073.gif");
	buttons += emoticonButton("32", "http://img163.imageshack.us/img163/2021/072u.gif");
	buttons += emoticonButton("33", "http://img542.imageshack.us/img542/7613/067k.gif");
	buttons += emoticonButton("34", "http://img571.imageshack.us/img571/6990/060h.gif");
	buttons += emoticonButton("35", "http://img221.imageshack.us/img221/1809/059xiyir.gif");
	buttons += emoticonButton("36", "http://img853.imageshack.us/img853/761/053o.gif");
	buttons += emoticonButton("37", "http://img545.imageshack.us/img545/4931/050d.gif");
	buttons += emoticonButton("38", "http://img812.imageshack.us/img812/6952/048r.gif");
	buttons += emoticonButton("39", "http://img801.imageshack.us/img801/8946/041b.gif");
	buttons += emoticonButton("40", "http://img862.imageshack.us/img862/15/037f.gif");
	buttons += emoticonButton("41", "http://img607.imageshack.us/img607/8153/029f.gif");
	buttons += emoticonButton("42", "http://img695.imageshack.us/img695/470/025kl.gif");
	buttons += emoticonButton("43", "http://img690.imageshack.us/img690/7886/023bh.gif");
	buttons += emoticonButton("44", "http://img863.imageshack.us/img863/4493/019b.gif");
	buttons += emoticonButton("45", "http://img26.imageshack.us/img26/9893/009um.gif");
	buttons += emoticonButton("46", "http://img705.imageshack.us/img705/4499/007go.gif");
	buttons += emoticonButton("47", "http://img823.imageshack.us/img823/222/006c.gif");
	buttons += emoticonButton("48", "http://img706.imageshack.us/img706/665/003pq.gif");
				
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);