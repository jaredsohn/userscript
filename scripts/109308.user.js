// Based on the original emoticonsforblogger by Kuribo
// Modified by (http://sc4you.blogspot.com) 

// FEATURES
// Works only in Compose Modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kaskus Icon for blogger
// @namespace      http://sc4you.blogspot.com
// @description    You can use Kaskus emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton(":ilovekaskus:", "http://www.kaskus.us/images/smilies/s_sm_ilovekaskus.gif");
	buttons += emoticonButton(":iluvindo:", "http://www.kaskus.us/images/smilies/I-Luv-Indonesia.gif");
	buttons += emoticonButton(":kiss:", "http://www.kaskus.us/images/smilies/cewek.gif");
	buttons += emoticonButton(":maho:", "http://www.kaskus.us/images/smilies/s_sm_maho.gif");
	buttons += emoticonButton(":najis:", "http://www.kaskus.us/images/smilies/najis.gif");
	buttons += emoticonButton(":nosara:", "http://www.kaskus.us/images/smilies/nosara.gif");
	buttons += emoticonButton(":marah:", "http://www.kaskus.us/images/smilies/marah.gif");
	buttons += emoticonButton(":duka:", "http://www.kaskus.us/images/smilies/berduka.gif");
	buttons += emoticonButton(":malu:", "http://www.kaskus.us/images/smilies/malu.gif");
	buttons += emoticonButton(":ngakak:", "http://www.kaskus.us/images/smilies/ngakak.gif");
	buttons += emoticonButton(":repost:", "http://www.kaskus.us/images/smilies/s_sm_repost1.gif");
	buttons += emoticonButton(":repost2:", "http://www.kaskus.us/images/smilies/s_sm_repost2.gif");
	buttons += emoticonButton(":s_up2:", "http://www.kaskus.us/images/smilies/sundul.gif");
	buttons += emoticonButton(":cendolbig:", "http://www.kaskus.us/images/smilies/s_big_cendol.gif");
	buttons += emoticonButton(":bata_big:", "http://www.kaskus.us/images/smilies/s_big_batamerah.gif");
	buttons += emoticonButton(":recsel", "http://www.kaskus.us/images/smilies/recseller.gif");
	buttons += emoticonButton(":takut:", "http://www.kaskus.us/images/smilies/takut.gif");
	buttons += emoticonButton(":ngacir:", "http://www.kaskus.us/images/smilies/ngacir2.gif");
	buttons += emoticonButton(":berjabat:", "http://www.kaskus.us/images/smilies/shakehand2.gif");
	buttons += emoticonButton(":bingung:", "http://www.kaskus.us/images/smilies/bingung.gif");
	buttons += emoticonButton(":cekpm:", "http://www.kaskus.us/images/smilies/cekpm.gif");
	buttons += emoticonButton(":capede:", "http://www.kaskus.us/images/smilies/capede.gif");
	buttons += emoticonButton(":palu:", "http://www.kaskus.us/images/smilies/hammer.gif");
	buttons += emoticonButton(":peluk:", "http://www.kaskus.us/images/smilies/peluk.gif");
	buttons += emoticonButton(":cendoltoast:", "http://www.kaskus.us/images/smilies/toastcendol.gif");
	buttons += emoticonButton(":hoax:", "http://www.kaskus.us/images/smilies/hoax.gif");
	buttons += emoticonButton(":cystg:", "http://www.kaskus.us/images/smilies/cystg.gif");
	buttons += emoticonButton(":dp:", "http://www.kaskus.us/images/smilies/dp.gif");
	buttons += emoticonButton(":selamat:", "http://www.kaskus.us/images/smilies/selamat.gif");
	buttons += emoticonButton(":thumbup:", "http://www.kaskus.us/images/smilies/jempol1.gif");
	buttons += emoticonButton(":thumbup2:", "http://www.kaskus.us/images/smilies/jempol2.gif");
	buttons += emoticonButton(":jrb:", "http://www.kaskus.us/images/smilies/fd_1.gif");
	buttons += emoticonButton(":kaskus_bgt:", "http://www.kaskus.us/images/smilies/fd_4.gif");
	buttons += emoticonButton(":kts:", "http://www.kaskus.us/images/smilies/fd_6.gif");
	buttons += emoticonButton(":sundul:", "http://www.kaskus.us/images/smilies/fd_5.gif");
	buttons += emoticonButton(":kacau_thread:", "http://www.kaskus.us/images/smilies/fd_8.gif");
	buttons += emoticonButton(":cape_de:", "http://www.kaskus.us/images/smilies/fd_2.gif");
	buttons += emoticonButton(":kaskus___:", "http://www.kaskus.us/images/smilies/sumbangan/kaskuslove.gif");
	    
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);