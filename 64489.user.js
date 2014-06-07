// Modified by Eun Sara Hyun (http://frankymuffins.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// Onion Head 
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Onion Head Smiley
// @namespace      http://frankymuffins.blogspot.com/
// @description    Emoticons in Blogger Only by FrankyMuffins 
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
        buttons += emoticonButton(":hi:", "http://blogimage.roodo.com/onion_club/3473749b.gif");
	buttons += emoticonButton(":wave:", "http://blogimage.roodo.com/onion_club/967339c1.gif");
        buttons += emoticonButton(":Smile:(", "http://www.cute-factor.com/images/smilies/onion/th_059_.gif");
	buttons += emoticonButton(":takot:", "http://sidekick.mysinablog.com/resserver.php?resource=187079-%E5%A4%B1%E9%AD%82.gif");
	buttons += emoticonButton(":galit:", "http://sidekick.mysinablog.com/resserver.php?resource=187116-%E9%A9%9A.gif");
	buttons += emoticonButton(":bring it on:", "http://blogimage.roodo.com/onion_club/233cd70a.gif");
	buttons += emoticonButton(":blush:", "http://sidekick.mysinablog.com/resserver.php?resource=187114-%E8%87%89%E7%B4%85%E7%B4%85.gif");
	buttons += emoticonButton(":devilishgrin:", "http://www.cute-factor.com/images/smilies/onion/07baa27a.gif");
	buttons += emoticonButton(":puppyeyes:", "http://sidekick.mysinablog.com/resserver.php?resource=193309-wong.gif");
	buttons += emoticonButton(":sweaty:", "http://sidekick.mysinablog.com/resserver.php?resource=187113-%E6%93%A6%E6%B1%97.gif");
	buttons += emoticonButton(":sigh:", "http://blogimage.roodo.com/onion_club/1b38f9e2.gif");
	buttons += emoticonButton(":anongnangyari:", "http://sidekick.mysinablog.com/resserver.php?resource=187107-%E8%90%BD%E5%AF%9E.gif");
	buttons += emoticonButton(":sorry:", "http://sidekick.mysinablog.com/resserver.php?resource=187108-%E8%B7%AA%E6%8B%9C%E7%A6%AEnew.gif");
	buttons += emoticonButton(":astig:", "http://sidekick.mysinablog.com/resserver.php?resource=193303-lonely.gif");
	buttons += emoticonButton(":inlove:", "http://sidekick.mysinablog.com/resserver.php?resource=193305-praise.gif");
        buttons += emoticonButton(":eheh:", "http://sidekick.mysinablog.com/resserver.php?resource=193302-knife.gif");
	buttons += emoticonButton(":woooh:", "http://sidekick.mysinablog.com/resserver.php?resource=187078-%E6%B0%B4%E8%8D%89%E8%88%9E.gif");
        buttons += emoticonButton(":please:", "http://sidekick.mysinablog.com/resserver.php?resource=193306-silly.gif");
        buttons += emoticonButton(":Fan giler:(", "http://www.cute-factor.com/images/smilies/onion/6f428754.gif");
        buttons += emoticonButton(":Teruja:(", "http://www.cute-factor.com/images/smilies/onion/af48944b.gif");
        buttons += emoticonButton(":Kagum:(", "http://www.cute-factor.com/images/smilies/onion/074.gif");
	buttons += emoticonButton(":yawn:", "http://sidekick.mysinablog.com/resserver.php?resource=193317-dontcare.gif");
        buttons += emoticonButton(":argh:", "http://sidekick.mysinablog.com/resserver.php?resource=193308-speechless.gif");
	buttons += emoticonButton(":okay:", "http://blogimage.roodo.com/onion_club/d5f02ecd.gif");
	buttons += emoticonButton(":siga:", "http://sidekick.mysinablog.com/resserver.php?resource=193307-smoking.gif");
        buttons += emoticonButton(":waaah:", "http://sidekick.mysinablog.com/resserver.php?resource=187073-omg.gif");
	buttons += emoticonButton(":help me:(", "http://sidekick.mysinablog.com/resserver.php?resource=187076-%E4%B8%8D%E8%A6%81%E5%95%8A.gif");buttons += emoticonButton(":shouted:", "http://sidekick.mysinablog.com/resserver.php?resource=187097-%E5%B4%A9%E6%BD%B0.gif");
	buttons += emoticonButton(":antok:", "http://sidekick.mysinablog.com/resserver.php?resource=187082-%E6%89%93%E7%9E%8C%E7%9D%A1.gif");
	buttons += emoticonButton(":wala:", "http://sidekick.mysinablog.com/resserver.php?resource=187072-jolin.gif");
	buttons += emoticonButton(":sleep:", "http://sidekick.mysinablog.com/resserver.php?resource=187084-%E5%A5%BD%E5%A4%A2.gif");
        buttons += emoticonButton(":Panas:(", "http://www.cute-factor.com/images/smilies/onion/th_083_v2.gif");
        buttons += emoticonButton(":Hot!:(", "http://www.cute-factor.com/images/smilies/onion/64caf316.gif");
        buttons += emoticonButton(":Panasbaram:(", "http://www.cute-factor.com/images/smilies/onion/215ad82f.gif");
        buttons += emoticonButton(":nanging:(", "http://www.cute-factor.com/images/smilies/onion/punchp1.gif");
	buttons += emoticonButton(":Mengamok:", "http://sidekick.mysinablog.com/resserver.php?resource=187115-%E7%BF%BB%E6%A1%8C.gif");
	buttons += emoticonButton(":nang!:", "http://sidekick.mysinablog.com/resserver.php?resource=187085-%E7%8B%82%E6%9A%B4.gif");
	buttons += emoticonButton(":perhatian:(", "http://www.cute-factor.com/images/smilies/onion/037.gif");
        buttons += emoticonButton(":takutseram:(", "http://www.cute-factor.com/images/smilies/onion/th_009_v2.gif");
	buttons += emoticonButton(":malu:(", "http://www.cute-factor.com/images/smilies/onion/048.gif");
	buttons += emoticonButton(":syakwasangka:(", "http://www.cute-factor.com/images/smilies/onion/044.gif");
        buttons += emoticonButton(":masalah Revolusi:(", "http://www.cute-factor.com/images/smilies/onion/5a6157d0.gif");
	buttons += emoticonButton(":Muntah:(", "http://www.cute-factor.com/images/smilies/onion/d79df121.gif");
	buttons += emoticonButton(":Uaakk:(", "http://www.cute-factor.com/images/smilies/onion/cfed93e2.gif");
        buttons += emoticonButton(":betol2:(", "http://www.cute-factor.com/images/smilies/onion/860e2a45.gif");
	buttons += emoticonButton(":damn:(", "http://www.cute-factor.com/images/smilies/onion/th_116_.gif");
	buttons += emoticonButton(":bersiul:(", "http://www.cute-factor.com/images/smilies/onion/015.gif");
	buttons += emoticonButton(":stress:(", "http://www.cute-factor.com/images/smilies/onion/th_085_.gif");
        buttons += emoticonButton(":Im Dead:(", "http://www.cute-factor.com/images/smilies/onion/485c3a61.gif");
	buttons += emoticonButton(":matila aku!:(", "http://www.cute-factor.com/images/smilies/onion/th_110_.gif");
	buttons += emoticonButton(":ouhm:(", "http://www.cute-factor.com/images/smilies/onion/098eb4a5.gif");
	buttons += emoticonButton(":adoi:(", "http://www.cute-factor.com/images/smilies/onion/th_015_orz-v2.gif");
	buttons += emoticonButton(":adui:", "http://sidekick.mysinablog.com/resserver.php?resource=187087-%E6%98%8F.gif");
	buttons += emoticonButton(":aduhai:(", "http://www.cute-factor.com/images/smilies/onion/th_118_.gif");
        buttons += emoticonButton(":puhkk:(", "http://www.cute-factor.com/images/smilies/onion/th_089_02.gif");
	buttons += emoticonButton(":Aigoo!:(", "http://www.cute-factor.com/images/smilies/onion/4519626a.gif");
	buttons += emoticonButton(":oh,tdk!:(", "http://www.cute-factor.com/images/smilies/onion/8c460310.gif");
	buttons += emoticonButton(":bermati2an:(", "http://www.cute-factor.com/images/smilies/onion/th_087_.gif");
        buttons += emoticonButton(":demam:(", "http://www.cute-factor.com/images/smilies/onion/5e565bcb.gif");
	buttons += emoticonButton(":Mati,ko!:(", "http://www.cute-factor.com/images/smilies/onion/63d4808b.gif");
        buttons += emoticonButton(":Bersemangat:(", "http://www.cute-factor.com/images/smilies/onion/punch.gif");
	buttons += emoticonButton(":perfect:(", "http://www.cute-factor.com/images/smilies/onion/th_113_.gif");
        buttons += emoticonButton(":success:(", "http://www.cute-factor.com/images/smilies/onion/th_103_.gif");
	buttons += emoticonButton(":Focus:(", "http://www.cute-factor.com/images/smilies/onion/th_096_K.gif");
        buttons += emoticonButton(":....:(", "http://www.cute-factor.com/images/smilies/onion/7f5341cc.gif")
	buttons += emoticonButton(":Sukoselok:(", "http://www.cute-factor.com/images/smilies/onion/071.gif");
        buttons += emoticonButton(":Sejukbeku:(", "http://www.cute-factor.com/images/smilies/onion/afd371da.gif");
	buttons += emoticonButton(":Hampa:(", "http://www.cute-factor.com/images/smilies/onion/c8908497.gif");
        buttons += emoticonButton(":brona:(", "http://www.cute-factor.com/images/smilies/onion/kiddy.gif");
	buttons += emoticonButton(":uuuu~:(", "http://www.cute-factor.com/images/smilies/onion/th_109_.gif");
	buttons += emoticonButton(":Very sad:(", "http://www.cute-factor.com/images/smilies/onion/33c4b951.gif");
	buttons += emoticonButton(":Wuuuh:(", "http://www.cute-factor.com/images/smilies/onion/064.gif");
        buttons += emoticonButton(":wuuu:(", "http://www.cute-factor.com/images/smilies/onion/016.gif");
	buttons += emoticonButton(":Wuaa!:(", "http://www.cute-factor.com/images/smilies/onion/4fd9f2d3.gif");
        buttons += emoticonButton(":Oh my god:(", "http://www.cute-factor.com/images/smilies/onion/th_104_.gif");
	buttons += emoticonButton(":Arkk:(", "http://www.cute-factor.com/images/smilies/onion/th_001_-v2.gif");
        buttons += emoticonButton(":kIEYA!:(", "http://www.cute-factor.com/images/smilies/onion/punchp2.gif");
	buttons += emoticonButton(":penunbok:(", "http://www.cute-factor.com/images/smilies/onion/047352f3.gif");
	buttons += emoticonButton(":Oikk:(", "http://www.cute-factor.com/images/smilies/onion/3c68bb64.gif");
        buttons += emoticonButton(":Ambik nih!:(", "http://www.cute-factor.com/images/smilies/onion/bikep2.gif");
        buttons += emoticonButton(":Hidung Tinggi:(", "http://www.cute-factor.com/images/smilies/onion/th_114_.gif");
	buttons += emoticonButton(":O,O..:(", "http://www.cute-factor.com/images/smilies/onion/th_093.gif");
        buttons += emoticonButton(":Berangan cool:(", "http://www.cute-factor.com/images/smilies/onion/th_099_.gif");
	buttons += emoticonButton(":comfort:(", "http://www.cute-factor.com/images/smilies/onion/th_095_.gif");
        buttons += emoticonButton(":wol!:(", "http://www.cute-factor.com/images/smilies/onion/b6b25dc6.gif");
        buttons += emoticonButton(":Sokong:(", "http://www.cute-factor.com/images/smilies/onion/th_101_.gif");
	buttons += emoticonButton(":Ishh!:(", "http://www.cute-factor.com/images/smilies/onion/th_081_.gif");
	buttons += emoticonButton(":cukup!:(", "http://www.cute-factor.com/images/smilies/onion/87a4e689.gif");
        buttons += emoticonButton(":Alone:(", "http://www.cute-factor.com/images/smilies/onion/189bbdde.gif");
	buttons += emoticonButton(":Ole,ole,ole..:(", "http://www.cute-factor.com/images/smilies/onion/th_100_.gif");
        buttons += emoticonButton(":Ahh~:(", "http://www.cute-factor.com/images/smilies/onion/f529a952.gif");
	buttons += emoticonButton(":Tidakk!!:(", "http://www.cute-factor.com/images/smilies/onion/th_107_.gif");
        buttons += emoticonButton(":Senyap2:(", "http://www.cute-factor.com/images/smilies/onion/th_105_.gif");
	buttons += emoticonButton(":ha?:", "http://blogimage.roodo.com/onion_club/efb50fe2.gif");
	buttons += emoticonButton(":eek?:(", "http://www.cute-factor.com/images/smilies/onion/077.gif");
	buttons += emoticonButton(":laugh:", "http://blogimage.roodo.com/onion_club/70bff581.gif");
	buttons += emoticonButton(":inis:", "http://blogimage.roodo.com/onion_club/54bd3bbb.gif");
	buttons += emoticonButton(":bahak2:", "http://sidekick.mysinablog.com/resserver.php?resource=187110-%E5%98%B2%E7%AC%91.gif");
	buttons += emoticonButton(":hahaha:(", "http://www.cute-factor.com/images/smilies/onion/073.gif");
        buttons += emoticonButton(":hehehe:(", "http://www.cute-factor.com/images/smilies/onion/cd08785a.gif");
	buttons += emoticonButton(":Angel:(", "http://www.cute-factor.com/images/smilies/onion/th_091_-3.gif");
	buttons += emoticonButton(":Wow!!:(", "http://www.cute-factor.com/images/smilies/onion/beautifu2.gif");
        buttons += emoticonButton(":pUSHPUSH:(", "http://www.cute-factor.com/images/smilies/onion/bikep1.gif");
        buttons += emoticonButton(":Lolz:(", "http://www.cute-factor.com/images/smilies/onion/th_117_.gif");
	buttons += emoticonButton(":Alamak:(", "http://www.cute-factor.com/images/smilies/onion/52b44be5.gif");
        buttons += emoticonButton(":Stranger:(", "http://www.cute-factor.com/images/smilies/onion/th_111_.gif");
        buttons += emoticonButton(":Cool:(", "http://www.cute-factor.com/images/smilies/onion/014.gif");
	buttons += emoticonButton(":ole,ole,uu!:(", "http://www.cute-factor.com/images/smilies/onion/063.gif");
        buttons += emoticonButton(":hek2:(", "http://www.cute-factor.com/images/smilies/onion/th_102_.gif");
        buttons += emoticonButton(":Kiss:(", "http://www.cute-factor.com/images/smilies/onion/th_106_.gif");
	buttons += emoticonButton(":Pening:(", "http://www.cute-factor.com/images/smilies/onion/5c745924.gif");
	buttons += emoticonButton(":Lekas2!:(", "http://www.cute-factor.com/images/smilies/onion/th_094_01.gif");
        buttons += emoticonButton(":Opps:(", "http://www.cute-factor.com/images/smilies/onion/070.gif");
	buttons += emoticonButton(":Learn:(", "http://www.cute-factor.com/images/smilies/onion/one.gif");
        buttons += emoticonButton(":Dont want anymore:(", "http://www.cute-factor.com/images/smilies/onion/d33561e9.gif");
	buttons += emoticonButton(":Full:(", "http://www.cute-factor.com/images/smilies/onion/8f337f1c.gif");
        buttons += emoticonButton(":Bath:(", "http://www.cute-factor.com/images/smilies/onion/th_098_.gif");
	buttons += emoticonButton(":help me!:(", "http://www.cute-factor.com/images/smilies/onion/th_108_.gif");
        buttons += emoticonButton(":heh?:(", "http://www.cute-factor.com/images/smilies/onion/3eb4e7b3.gif");
        buttons += emoticonButton(":False!:(", "http://www.cute-factor.com/images/smilies/onion/9bbc76d5.gif");
	buttons += emoticonButton(":Wet:(", "http://www.cute-factor.com/images/smilies/onion/087.gif");
        buttons += emoticonButton(":X:(", "http://www.cute-factor.com/images/smilies/onion/075.gif");
	buttons += emoticonButton(":Very Good:(", "http://www.cute-factor.com/images/smilies/onion/088.gif");
        buttons += emoticonButton(":Puik2:(", "http://www.cute-factor.com/images/smilies/onion/e0765523.gif");
        buttons += emoticonButton(":Hapibeday:(", "http://www.cute-factor.com/images/smilies/onion/th_091_.gif");
        buttons += emoticonButton(":Oishie:(", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/anigif-2.gif");

   
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