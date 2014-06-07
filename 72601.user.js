// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by andianka (http://waitwhosaidthat.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Asteeg Smileys
// @namespace      http://andianka.googlepages.com/
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
	buttons += emoticonButton(":no:", "http://sidekick.mysinablog.com/resserver.php?resource=187097-%E5%B4%A9%E6%BD%B0.gif");
	buttons += emoticonButton(":sick:", "http://sidekick.mysinablog.com/resserver.php?resource=187104-%E6%84%9F%E5%86%92.gif");
	buttons += emoticonButton(":tired:", "http://sidekick.mysinablog.com/resserver.php?resource=187082-%E6%89%93%E7%9E%8C%E7%9D%A1.gif");
	buttons += emoticonButton(":wala:", "http://sidekick.mysinablog.com/resserver.php?resource=187072-jolin.gif");
	buttons += emoticonButton(":sleep:", "http://sidekick.mysinablog.com/resserver.php?resource=187084-%E5%A5%BD%E5%A4%A2.gif");
	buttons += emoticonButton(":whatever:", "http://sidekick.mysinablog.com/resserver.php?resource=187115-%E7%BF%BB%E6%A1%8C.gif");
	buttons += emoticonButton(":angry:", "http://sidekick.mysinablog.com/resserver.php?resource=187085-%E7%8B%82%E6%9A%B4.gif");
	buttons += emoticonButton(":woodfish:", "http://sidekick.mysinablog.com/resserver.php?resource=193310-woodfish.gif");
	buttons += emoticonButton(":dream:", "http://sidekick.mysinablog.com/resserver.php?resource=187079-%E5%A4%B1%E9%AD%82.gif");
	buttons += emoticonButton(":scold:", "http://sidekick.mysinablog.com/resserver.php?resource=187116-%E9%A9%9A.gif");
	buttons += emoticonButton(":faint:", "http://sidekick.mysinablog.com/resserver.php?resource=201122-faint.gif");
	buttons += emoticonButton(":bringiton:", "http://blogimage.roodo.com/onion_club/233cd70a.gif");
	buttons += emoticonButton(":ahaha:", "http://blogimage.roodo.com/onion_club/70bff581.gif");
	buttons += emoticonButton(":inis:", "http://blogimage.roodo.com/onion_club/54bd3bbb.gif");
	buttons += emoticonButton(":tsk:", "http://sidekick.mysinablog.com/resserver.php?resource=187087-%E6%98%8F.gif");
	buttons += emoticonButton(":ha:", "http://blogimage.roodo.com/onion_club/efb50fe2.gif");
	buttons += emoticonButton(":blush:", "http://sidekick.mysinablog.com/resserver.php?resource=187114-%E8%87%89%E7%B4%85%E7%B4%85.gif");
	buttons += emoticonButton(":evilgrin:", "http://sidekick.mysinablog.com/resserver.php?resource=193318-evil.gif");
	buttons += emoticonButton(":puppyeyes:", "http://sidekick.mysinablog.com/resserver.php?resource=193309-wong.gif");
	buttons += emoticonButton(":sweaty:", "http://sidekick.mysinablog.com/resserver.php?resource=187113-%E6%93%A6%E6%B1%97.gif");
	buttons += emoticonButton(":scream:", "http://sidekick.mysinablog.com/resserver.php?resource=187110-%E5%98%B2%E7%AC%91.gif");
	buttons += emoticonButton(":sigh:", "http://blogimage.roodo.com/onion_club/1b38f9e2.gif");
	buttons += emoticonButton(":alone:", "http://sidekick.mysinablog.com/resserver.php?resource=187107-%E8%90%BD%E5%AF%9E.gif");
	buttons += emoticonButton(":sorry:", "http://sidekick.mysinablog.com/resserver.php?resource=187108-%E8%B7%AA%E6%8B%9C%E7%A6%AEnew.gif");
	buttons += emoticonButton(":lonely:", "http://sidekick.mysinablog.com/resserver.php?resource=193303-lonely.gif");
    buttons += emoticonButton(":hi:", "http://blogimage.roodo.com/onion_club/3473749b.gif");
	buttons += emoticonButton(":wave:", "http://blogimage.roodo.com/onion_club/967339c1.gif");
	buttons += emoticonButton(":inlove:", "http://sidekick.mysinablog.com/resserver.php?resource=193305-praise.gif");
    buttons += emoticonButton(":eheh:", "http://sidekick.mysinablog.com/resserver.php?resource=193302-knife.gif");
	buttons += emoticonButton(":lala:", "http://sidekick.mysinablog.com/resserver.php?resource=187078-%E6%B0%B4%E8%8D%89%E8%88%9E.gif");
	buttons += emoticonButton(":yawn:", "http://sidekick.mysinablog.com/resserver.php?resource=193317-dontcare.gif");
    buttons += emoticonButton(":argh:", "http://sidekick.mysinablog.com/resserver.php?resource=193308-speechless.gif");
    buttons += emoticonButton(":please:", "http://sidekick.mysinablog.com/resserver.php?resource=193306-silly.gif");
	buttons += emoticonButton(":okay:", "http://blogimage.roodo.com/onion_club/d5f02ecd.gif");
	buttons += emoticonButton(":siga:", "http://sidekick.mysinablog.com/resserver.php?resource=193307-smoking.gif");
    buttons += emoticonButton(":wah:", "http://sidekick.mysinablog.com/resserver.php?resource=187073-omg.gif");
	buttons += emoticonButton("T.T", "http://sidekick.mysinablog.com/resserver.php?resource=187076-%E4%B8%8D%E8%A6%81%E5%95%8A.gif");
    
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"15\" height=\"15\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);