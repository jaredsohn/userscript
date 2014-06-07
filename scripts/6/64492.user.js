// Modified by Eun Sara Hyun (http://deardiaryeunsarahyun.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Pinky Japanese Smiley
// @namespace      http://deardiaryeunsarahyun.blogspot.com/
// @description    Emoticons in Blogger Only by Eun Dear Diary.com (45)
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton(":drink:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities01.gif");
	buttons += emoticonButton(":reading:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities02.gif");
	buttons += emoticonButton(":bowling:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities03.gif");
	buttons += emoticonButton(":pompom:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities04.gif");
	buttons += emoticonButton(":tapau:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities05.gif");
	buttons += emoticonButton(":call:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities06.gif");
	buttons += emoticonButton(":drive:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities07.gif");
	buttons += emoticonButton(":jemurtilam:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities08.gif");
	buttons += emoticonButton(":ballon:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities09.gif");
	buttons += emoticonButton(":sirampokok:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities10.gif");
	buttons += emoticonButton(":bicycle:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities11.gif");
	buttons += emoticonButton(":tapau2:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities12.gif");
	buttons += emoticonButton(":writing:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities13.gif");
	buttons += emoticonButton(":camera:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities14.gif");
	buttons += emoticonButton(":hippie:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities15.gif");
	buttons += emoticonButton(":hippie2:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities16.gif");
	buttons += emoticonButton(":laptingkap:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities17.gif");
	buttons += emoticonButton(":lipstik:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities18.gif");
	buttons += emoticonButton(":cat:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities19.gif");
	buttons += emoticonButton(":jual:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities20.gif");
	buttons += emoticonButton(":makan:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities21.gif");
	buttons += emoticonButton(":mandi:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities22.gif");
	buttons += emoticonButton(":buatkek:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities23.gif");
	buttons += emoticonButton(":mercun1:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities24.gif");
	buttons += emoticonButton(":mercun2:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities25.gif");
	buttons += emoticonButton(":serves:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities26.gif");
	buttons += emoticonButton(":laptop:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities27.gif");
	buttons += emoticonButton(":piano:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities28.gif");
	buttons += emoticonButton(":vacation1:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities29.gif");
	buttons += emoticonButton(":vacation2:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities30.gif");
	buttons += emoticonButton(":cool:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities31.gif");
	buttons += emoticonButton(":sidaibaju:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities33.gif");
	buttons += emoticonButton(":jahitbaju:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities34.gif");
	buttons += emoticonButton(":crosstich:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities35.gif");
	buttons += emoticonButton(":vacuum:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities36.gif");
	buttons += emoticonButton(":makan:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities37.gif");
	buttons += emoticonButton(":badminton:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities38.gif");
	buttons += emoticonButton(":nyanyi:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities39.gif");
	buttons += emoticonButton(":violin:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities40.gif");
	buttons += emoticonButton(":belimakanan:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities41.gif");
	buttons += emoticonButton(":serveair:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities42.gif");
	buttons += emoticonButton(":cucirumah:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities43.gif");
	buttons += emoticonButton(":ironbaju:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities44.gif");
	buttons += emoticonButton(":kaitbaju:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities45.gif");
	buttons += emoticonButton(":naikmoto:", "http://i215.photobucket.com/albums/cc133/muniiera/icon/kao_licca-activities46.gif");
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