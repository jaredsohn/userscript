// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for- 
blogger.html)
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
	buttons += emoticonButton(":heheh:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2iviihk.jpg")
	buttons += emoticonButton(":ugh:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/grrr.jpg")
	buttons += emoticonButton(":right..:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/duh.jpg")
	buttons += emoticonButton(":oo:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/oo.jpg")
	buttons += emoticonButton(":wow:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/131.gif")
	buttons += emoticonButton(":innocent:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies%202/emo10.gif");
	buttons += emoticonButton(":grr:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies%202/emo11.gif");
	buttons += emoticonButton(":cry:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies%202/emo9.gif");
	buttons += emoticonButton(":star:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Pailin%20Smilies/misc-14.jpg");
	buttons += emoticonButton(":camera:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Pailin%20Smilies/misc-15.jpg");
	buttons += emoticonButton(":headache:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Pailin%20Smilies/misc-4.jpg");
	buttons += emoticonButton(":sweat:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Pailin%20Smilies/misc-7.jpg");
	buttons += emoticonButton(":ahaha:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/happy2.jpg");
	buttons += emoticonButton(":cool:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2lnxv2d.jpg");
	buttons += emoticonButton(":tsk:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies%202/emo12.gif");
	buttons += emoticonButton(":waa?:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies%202/emo8.gif");
	buttons += emoticonButton(":love:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies%202/emo14.gif");
	buttons += emoticonButton(":!:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Pailin%20Smilies/misc-6.jpg");
	buttons += emoticonButton(":woosh:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Pailin%20Smilies/misc-8.jpg");
	buttons += emoticonButton(":?:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Pailin%20Smilies/misc-2.jpg");
	buttons += emoticonButton(":lovelove:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/Animation101.gif");
	buttons += emoticonButton(":mail:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/054.gif");
	buttons += emoticonButton(":diary:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/ic-49.gif");
	buttons += emoticonButton(":tv:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/emo21.gif");
	buttons += emoticonButton(":notready:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/2ikr62w.jpg");
    buttons += emoticonButton(":rainbow:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/086.gif");
	buttons += emoticonButton(":thumbsup:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/thumb.gif");
	buttons += emoticonButton(":poop:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/052.gif");
    buttons += emoticonButton(":ready:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small% 
20Icons/122.gif");
	buttons += emoticonButton(":wave:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/116.gif");
	buttons += emoticonButton(":ghost:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/ghost.gif");
    buttons += emoticonButton(":panda:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small% 
20Icons/panda.gif");
    buttons += emoticonButton(":what?!:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/noo.jpg");
	buttons += emoticonButton(":blur:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/huh.jpg");
	buttons += emoticonButton(":whoop:",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/happy.jpg");
    buttons += emoticonButton(":huhu:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii% 
20Smilies/cry.jpg");
	buttons += emoticonButton(":sohappy:(",  
"http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/391.jpg");
    
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "'  
onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup=''  
onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById 
(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body 
[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name +  
"\\\" />\";})();ButtonMouseDown(this);'><img width=\"15\" height=\"15\" src='" + url + "' alt='" + name + "'  
border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\"  
class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);
