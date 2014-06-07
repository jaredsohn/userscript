// Based on the original emoticonsforblogger by Hawan Putra (http://www.hawanputrablogs.co.cc/)
// Modified by hawan (http://www.hawanputrablogs.co.cc/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           hawan kaskus emoticon bloggerr
// @namespace      http://hawanputrablogs.co.cc
// @description    Emoticon Kaskus for Blogger
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
 
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	        buttons += emoticonButton(":Juara:",  "http://img202.imageshack.us/img202/4846/kompinterjuara1.gif" );
		buttons += emoticonButton(":Bata:",  "http://img72.imageshack.us/img72/398/kompinterbatamerah.gif" );
		buttons += emoticonButton(":Cendol:",  "http://img687.imageshack.us/img687/1351/kompintercendol.gif" );
		buttons += emoticonButton(":IloveIndonesia:",  "http://img94.imageshack.us/img94/4219/kompinterlovindo.gif" );
		buttons += emoticonButton(":Marah:",  "http://img8.imageshack.us/img8/3483/kompintermarah.gif" );
		buttons += emoticonButton(":MaluMalu:",  "http://img693.imageshack.us/img693/7193/kompinterkecewa.gif" );
		buttons += emoticonButton(":ampun:",  "http://img693.imageshack.us/img693/7193/kompinterkecewa.gif" );
		buttons += emoticonButton(":Gobajay:",  "http://img171.imageshack.us/img171/4809/kompinterngacir2.gif" );
		buttons += emoticonButton("9",  "http://img412.imageshack.us/img412/3662/kompintersempurna.gif" );
		buttons += emoticonButton("10",  "http://img291.imageshack.us/img291/6651/kompinterbingung.gif" );
		buttons += emoticonButton("11",  "http://img709.imageshack.us/img709/2609/kompinterngakak.gif" );
		buttons += emoticonButton("12",  "http://img641.imageshack.us/img641/3540/kompintertakut.gif" );
		buttons += emoticonButton("13",  "http://img514.imageshack.us/img514/7169/kompinterterimahkasi.gif" );
		buttons += emoticonButton("14",  "http://img169.imageshack.us/img169/5500/kompinteralay.gif" );
		buttons += emoticonButton("15",  "http://img28.imageshack.us/img28/4954/kompintertkp.gif" );
		buttons += emoticonButton("16",  "http://img138.imageshack.us/img138/3621/kompinternosara.gif" );
		buttons += emoticonButton("17",  "http://img202.imageshack.us/img202/8307/kompinterliat.gif" );
		buttons += emoticonButton("18",  "http://img693.imageshack.us/img693/8240/kompintersundul.gif" );
		buttons += emoticonButton("19",  "http://static.kaskus.co.id/images/smilies/s_sm_maho.gif" );
		buttons += emoticonButton("20",  "http://static.kaskus.co.id/images/smilies/cystg.gif" );
		buttons += emoticonButton("21",  "http://static.kaskus.co.id/images/smilies/hoax.gif" );
		buttons += emoticonButton("22",  "http://static.kaskus.co.id/images/smilies/kaskus_radio.gif" );
		buttons += emoticonButton("23",  "http://static.kaskus.co.id/images/smilies/games.gif" );
		buttons += emoticonButton("24",  "http://static.kaskus.co.id/images/smilies/cool2.gif" );
		buttons += emoticonButton("25",  "http://static.kaskus.co.id/images/smilies/bingung.gif" );
		buttons += emoticonButton("26",  "http://static.kaskus.co.id/images/smilies/fd_6.gif" );
		buttons += emoticonButton("27",  "http://static.kaskus.co.id/images/smilies/fd_1.gif" );
		buttons += emoticonButton("28",  "http://static.kaskus.co.id/images/smilies/fd_5.gif" );
		buttons += emoticonButton("29",  "http://static.kaskus.co.id/images/smilies/fd_2.gif" );
		buttons += emoticonButton("30",  "http://static.kaskus.co.id/images/smilies/bola.gif" );
		buttons += emoticonButton("31",  "http://static.kaskus.co.id/images/smilies/traveller.gif" );
		buttons += emoticonButton("32",  "http://static.kaskus.co.id/images/smilies/request.gif" );
		buttons += emoticonButton("33",  "http://static.kaskus.co.id/images/smilies/recseller.gif" );
		buttons += emoticonButton("34",  "http://static.kaskus.co.id/images/smilies/berduka.gif" );
		buttons += emoticonButton("35",  "http://static.kaskus.co.id/images/smilies/cekpm.gif" );
		buttons += emoticonButton("36",  "http://static.kaskus.co.id/images/smilies/angel1.gif" );
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);
