// Modified by Eun Sara Hyun (http://deardiaryeunsarahyun.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Talk Face Smiley 
// @namespace      http://deardiaryeunsarahyun.blogspot.com/
// @description    Emoticons in Blogger Only by Eun Dear Diary.com (34)
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton(":sweat:", "http://i650.photobucket.com/albums/uu223/phimworld/sweat.png");
	buttons += emoticonButton(":slobber:", "http://i650.photobucket.com/albums/uu223/phimworld/slobber.png");
	buttons += emoticonButton(":shout:", "http://i650.photobucket.com/albums/uu223/phimworld/shout.png");
	buttons += emoticonButton(":pretiiness:", "http://i650.photobucket.com/albums/uu223/phimworld/prettiness.png");
	buttons += emoticonButton(":love:", "http://i650.photobucket.com/albums/uu223/phimworld/love.png");
	buttons += emoticonButton(":miow:", "http://i650.photobucket.com/albums/uu223/phimworld/miao.png");
	buttons += emoticonButton(":grimace:", "http://i650.photobucket.com/albums/uu223/phimworld/grimace.png");
	buttons += emoticonButton(":fire:", "http://i650.photobucket.com/albums/uu223/phimworld/fire.png");
	buttons += emoticonButton(":cry:", "http://i650.photobucket.com/albums/uu223/phimworld/cry.png");
	buttons += emoticonButton(":cool:", "http://i650.photobucket.com/albums/uu223/phimworld/cool.png");
	buttons += emoticonButton(":confuse:", "http://i650.photobucket.com/albums/uu223/phimworld/confused.png");
	buttons += emoticonButton(":burn:", "http://i650.photobucket.com/albums/uu223/phimworld/burn.png");
	buttons += emoticonButton(":anger:", "http://i650.photobucket.com/albums/uu223/phimworld/anger.png");
        buttons += emoticonButton("emo1", "http://www.addemoticons.com/emoticon/3d/AddEmoticons0011.gif");
        buttons += emoticonButton("emo2", "http://www.addemoticons.com/emoticon/3d/AddEmoticons0012.gif");
        buttons += emoticonButton("emo3", "http://www.addemoticons.com/emoticon/3d/AddEmoticons0013.gif");
        buttons += emoticonButton("emo4", "http://www.addemoticons.com/emoticon/3d/AddEmoticons0014.gif");
        buttons += emoticonButton("emo5", "http://www.addemoticons.com/emoticon/3d/AddEmoticons0015.gif");
        buttons += emoticonButton("emo6", "http://www.addemoticons.com/emoticon/3d/AddEmoticons0016.gif");
        buttons += emoticonButton("emo7", "http://www.addemoticons.com/emoticon/3d/AddEmoticons0017.gif");
        buttons += emoticonButton("emo8", "http://www.addemoticons.com/emoticon/3d/AddEmoticons0018.gif");
        buttons += emoticonButton("emo9", "http://www.addemoticons.com/emoticon/3d/AddEmoticons0019.gif");
        buttons += emoticonButton("emo10", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00110.gif");
        buttons += emoticonButton("emo11", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00111.gif");
        buttons += emoticonButton("emo12", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00112.gif");
        buttons += emoticonButton("emo13", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00113.gif");
        buttons += emoticonButton("emo14", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00114.gif");
        buttons += emoticonButton("emo15", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00115.gif");
        buttons += emoticonButton("emo16", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00116.gif");
        buttons += emoticonButton("emo17", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00117.gif");
        buttons += emoticonButton("emo18", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00118.gif");
        buttons += emoticonButton("emo19", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00118.gif");
        buttons += emoticonButton("emo20", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00119.gif");
        buttons += emoticonButton("emo21", "http://www.addemoticons.com/emoticon/3d/AddEmoticons00120.gif");
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