// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Jan Di (http://momoiro-box.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kaomoji
// @namespace      http://nanarabu.blogspot.com
// @description    Cute Icons for Blogger by nanarabu.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";


buttons += emoticonButton(":a:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_ya.jpg");
buttons += emoticonButton(":b:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_wufwink.gif");
buttons += emoticonButton(":c:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_wipe.jpg");
buttons += emoticonButton(":d:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_winki.jpg");
buttons += emoticonButton(":e:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_wink.jpg");
buttons += emoticonButton(":f:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_wai2.jpg");
buttons += emoticonButton(":g:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_wai.jpg");
buttons += emoticonButton(":h:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_updown.jpg");
buttons += emoticonButton(":i:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_tear.jpg");
buttons += emoticonButton(":j:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_swsmile.gif");
buttons += emoticonButton(":k:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_sw3.gif");
buttons += emoticonButton(":l:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_sw2.jpg");
buttons += emoticonButton(":m:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_stare.jpg");
buttons += emoticonButton(":n:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_smcb.jpg");
buttons += emoticonButton(":o:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_smb.jpg");
buttons += emoticonButton(":p:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_sing.gif");
buttons += emoticonButton(":q:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_shock2.gif");
buttons += emoticonButton(":r:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_shock1.jpg");
buttons += emoticonButton(":s:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_sh2.jpg");
buttons += emoticonButton(":t:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_sh.jpg");
buttons += emoticonButton(":u:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_ran2.jpg");
buttons += emoticonButton(":v:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_ran.jpg");
buttons += emoticonButton(":w:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_puff3.jpg");
buttons += emoticonButton(":x:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_puff2.jpg");
buttons += emoticonButton(":y:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_puff.jpg");
buttons += emoticonButton(":z:", 
"http://i724.photobucket.com/albums/ww242/heart_nana28/niko_po2.jpg");
buttons += emoticonButton(":a1:", 
"http://i724.photobucket.com/albums/ww242/heart_nana28/niko_po1.jpg");
buttons += emoticonButton(":a2:", 
"http://i724.photobucket.com/albums/ww242/heart_nana28/niko_pat.jpg");
buttons += emoticonButton(":a3:", 
"http://i724.photobucket.com/albums/ww242/heart_nana28/niko_osb.jpg");
buttons += emoticonButton(":1:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_o.jpg");
buttons += emoticonButton(":2:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_nosb.jpg");
buttons += emoticonButton(":3:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_mad2.jpg");
buttons += emoticonButton(":4:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_mad.jpg");
buttons += emoticonButton(":5:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_kyaha.jpg");
buttons += emoticonButton(":6:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_hsb.jpg");
buttons += emoticonButton(":7:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_hazu.jpg");
buttons += emoticonButton(":8:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_hapb.jpg");
buttons += emoticonButton(":9:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_hap.jpg");
buttons += emoticonButton(":10:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_h3.jpg");
buttons += emoticonButton(":11:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_h2.jpg");
buttons += emoticonButton(":12:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_h1.jpg");
buttons += emoticonButton(":13:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_goodies.jpg");
buttons += emoticonButton(":14:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_gdwink.jpg");
buttons += emoticonButton(":15:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_excite3.jpg");
buttons += emoticonButton(":16:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_excite2.jpg");
buttons += emoticonButton(":17:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_excite1.jpg");
buttons += emoticonButton(":18:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_ehe.jpg");
buttons += emoticonButton(":19:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_eh.jpg");
buttons += emoticonButton(":20:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_dead.jpg");
buttons += emoticonButton(":21:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_cryol.jpg");
buttons += emoticonButton(":22:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_cry.jpg");
buttons += emoticonButton(":23:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_crazy.jpg");
buttons += emoticonButton(":24:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_confuse.jpg");
buttons += emoticonButton(":25:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_con2.jpg");
buttons += emoticonButton(":26:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_con.jpg");
buttons += emoticonButton(":27:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_cochi.jpg");
buttons += emoticonButton(":29:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_clap.jpg");
buttons += emoticonButton(":30:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_chu.jpg");
buttons += emoticonButton(":31:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_bsb.jpg");
buttons += emoticonButton(":32:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_bigsm.jpg");
buttons += emoticonButton(":33:", "http://i724.photobucket.com/albums/ww242/heart_nana28/niko_ahee.jpg");
buttons += emoticonButton(":34:", "http://i724.photobucket.com/albums/ww242/heart_nana28/MsgPlus_Img4802.png");
buttons += emoticonButton(":35:", "http://i724.photobucket.com/albums/ww242/heart_nana28/MsgPlus_Img0928.png");
buttons += emoticonButton(":36:", "http://i724.photobucket.com/albums/ww242/heart_nana28/MsgPlus_Img0328.png");
buttons += emoticonButton(":37:", "http://i724.photobucket.com/albums/ww242/heart_nana28/HI.gif");
buttons += emoticonButton(":38:", "http://i724.photobucket.com/albums/ww242/heart_nana28/ha.gif");
buttons += emoticonButton(":39:", "http://i724.photobucket.com/albums/ww242/heart_nana28/cell.gif");



	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);