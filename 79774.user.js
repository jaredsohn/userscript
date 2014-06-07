// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by rohman (http://rohman-freeblogtemplate.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           more-smilies
// @namespace      http://kangrohman.googlepages.com/
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
buttons += emoticonButton(":ko:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/KO.gif");
	buttons += emoticonButton(":ko:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/KO.gif");
	buttons += emoticonButton(":adem:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/adem.gif");
	buttons += emoticonButton(":boom:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/boom_boom.gif");
	buttons += emoticonButton(":busex:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/busex_wakaka.gif");
	buttons += emoticonButton(":burexxx:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/busexxx.gif");
	buttons += emoticonButton(":byeeeeee:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/bye.gif");
	buttons += emoticonButton(":cattttt:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/cat_soldiers.gif");
	buttons += emoticonButton(":ceksound:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/cek_son_cek_son.gif");
	buttons += emoticonButton(":wkaakaaaa:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/cloud_ngeDJ_wkaaka.gif");
	buttons += emoticonButton(":ctar:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/ctar.hardkor.gif");
	buttons += emoticonButton(":cui:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/cui.gif");
	buttons += emoticonButton(":dracoola:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/dracoola_jr.gif");
	buttons += emoticonButton(":mandibusa:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/mandi_busa.gif");
	buttons += emoticonButton(":tangisbahagia:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/nangis_bahagia.gif");
	buttons += emoticonButton(":ngnatuk:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/ngantuk.gif");
	buttons += emoticonButton(":ngupil:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/ngupil.gif");
	buttons += emoticonButton(":njangnyanyi:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/njang_ini_nyanyi.gif");
	buttons += emoticonButton(":innocent:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/innocent.gif");
	buttons += emoticonButton(":hulahula:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/hula_hula.gif");
	buttons += emoticonButton(":scream:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/sok_kyut.gif");
	buttons += emoticonButton(":muntah:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/muntah.gif");
	buttons += emoticonButton(":toel2:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/toel2.gif");
	buttons += emoticonButton(":wkakakaaaa:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/wakaka.gif");
	buttons += emoticonButton(":wtf:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/wtf.gif");
        buttons += emoticonButton(":cumi:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/mata_cumi.gif");
	buttons += emoticonButton(":makan:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/makan_ayam_panggang.gif");
	buttons += emoticonButton(":minum:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/tentara_elite.gif");
        buttons += emoticonButton(":eheh:", "http://sidekick.mysinablog.com/resserver.php?resource=193302-knife.gif");
	buttons += emoticonButton(":jepit:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/sling_sling.gif");
	buttons += emoticonButton(":airmata:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/slow_motion_kejar_sheilla_wakaka.gif");
        buttons += emoticonButton(":pembunuh:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/pembunuh_sadis.gif");
        buttons += emoticonButton(":sentil:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/hipnotize.gif");
	buttons += emoticonButton(":hoeekszz:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/hoeekzz.gif");
	buttons += emoticonButton(":gitar:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/gitaran_dolo_agh.gif");
        buttons += emoticonButton(":ngintipaa:", "http://mega.xtremenitro.org/bigpaopaobing/smiley/awas_ngintip_waka.gif");
	buttons += emoticonButton(":awaskon:(", "http://mega.xtremenitro.org/bigpaopaobing/smiley/awas_kon_waakaka.gif");
        buttons += emoticonButton(":wala:", "http://sidekick.mysinablog.com/resserver.php?resource=187072-jolin.gif");
	buttons += emoticonButton(":lamagawa:", "http://sidekick.mysinablog.com/resserver.php?resource=193310-woodfish.gif");
		buttons += emoticonButton(":hilo:", "http://sidekick.mysinablog.com/resserver.php?resource=201122-faint.gif");
	buttons += emoticonButton(":bringiton:", "http://blogimage.roodo.com/onion_club/233cd70a.gif");
	buttons += emoticonButton(":ahaha:", "http://blogimage.roodo.com/onion_club/70bff581.gif");
	buttons += emoticonButton(":inis:", "http://blogimage.roodo.com/onion_club/54bd3bbb.gif");
	buttons += emoticonButton(":ha?:", "http://blogimage.roodo.com/onion_club/efb50fe2.gif");
	buttons += emoticonButton(":devilishgrin:", "http://sidekick.mysinablog.com/resserver.php?resource=193318-evil.gif");
	buttons += emoticonButton(":puppyeyes:", "http://sidekick.mysinablog.com/resserver.php?resource=193309-wong.gif");
	buttons += emoticonButton(":sigh:", "http://blogimage.roodo.com/onion_club/1b38f9e2.gif");
	buttons += emoticonButton(":astig:", "http://sidekick.mysinablog.com/resserver.php?resource=193303-lonely.gif");
        buttons += emoticonButton(":hi:", "http://blogimage.roodo.com/onion_club/3473749b.gif");
	buttons += emoticonButton(":wave:", "http://blogimage.roodo.com/onion_club/967339c1.gif");
	buttons += emoticonButton(":inlove:", "http://sidekick.mysinablog.com/resserver.php?resource=193305-praise.gif");
        buttons += emoticonButton(":eheh:", "http://sidekick.mysinablog.com/resserver.php?resource=193302-knife.gif");
	buttons += emoticonButton(":yawn:", "http://sidekick.mysinablog.com/resserver.php?resource=193317-dontcare.gif");
        buttons += emoticonButton(":argh:", "http://sidekick.mysinablog.com/resserver.php?resource=193308-speechless.gif");
        buttons += emoticonButton(":please:", "http://sidekick.mysinablog.com/resserver.php?resource=193306-silly.gif");
	buttons += emoticonButton(":okay:", "http://blogimage.roodo.com/onion_club/d5f02ecd.gif");
 	buttons += emoticonButton(":siga:", "http://sidekick.mysinablog.com/resserver.php?resource=193307-smoking.gif");
        buttons += emoticonButton(":waaah:", "http://sidekick.mysinablog.com/resserver.php?resource=187073-omg.gif");

	
    
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
