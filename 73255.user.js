// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           BabydollSmilies
// @namespace      http://nurinadlina.blogspot.com/
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
                      
	buttons += emoticonButton("emoticon01", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/ththunder.gif");
buttons += emoticonButton("emoticon02", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thth0.gif");
buttons += emoticonButton("emoticon03", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thtae.gif");
buttons += emoticonButton("emoticon04", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thswirl-1.gif");
buttons += emoticonButton("emoticon05", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thsplash001.gif");
buttons += emoticonButton("emoticon06", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thrrete.gif");
buttons += emoticonButton("emoticon07", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/throckon.png");
buttons += emoticonButton("emoticon08", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thright.gif");
buttons += emoticonButton("emoticon09", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thpffft.gif");
buttons += emoticonButton("emoticon10", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thooh.gif");
buttons += emoticonButton("emoticon11", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thmn013d_choa4860123.gif");
buttons += emoticonButton("emoticon12", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thokoru.gif");
buttons += emoticonButton("emoticon13", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th1530_meltycandy_choa4860123.gif");
buttons += emoticonButton("emoticon14", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th1523_meltycandy_choa4860123.gif");
buttons += emoticonButton("emoticon15", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th1521_meltycandy_choa4860123.gif");
buttons += emoticonButton("emoticon16", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th1234613308-545198-1.gif");
buttons += emoticonButton("emoticon17", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thkamot.gif");
buttons += emoticonButton("emoticon18", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thj63.gif");
buttons += emoticonButton("emoticon19", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thj22.gif");
buttons += emoticonButton("emoticon20", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thi_0716.gif");
buttons += emoticonButton("emoticon21","http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thhellokitty001.gif");
   buttons += emoticonButton("emoticon22", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thhehe3.gif");
   buttons += emoticonButton("emoticon23", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thhappymickey.gif");
   buttons += emoticonButton("emoticon24", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thhappy.gif");
   buttons += emoticonButton("emoticon25", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thhand7.gif");
   buttons += emoticonButton("emoticon26", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thhand1.gif");
   buttons += emoticonButton("emoticon27", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thgirl8.gif");
   buttons += emoticonButton("emoticon28", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thghgd.gif");
   buttons += emoticonButton("emoticon29", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thf56e5ed0a85998a55f6a023cb16b7b03.gif");
   buttons += emoticonButton("emoticon30", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thery.gif");
   buttons += emoticonButton("emoticon31", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thef7f5bd68b038708281dcfab2085d228.gif");
   buttons += emoticonButton("emoticon32", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/the666fdde98c8b84be05811c8efcc0ec9.gif");
   buttons += emoticonButton("emoticon33", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thdropdeadasleep.gif");
   buttons += emoticonButton("emoticon34", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thcar2.gif");
   buttons += emoticonButton("emoticon35", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thcamera3.gif");
   buttons += emoticonButton("emoticon36", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thcamera.gif");        
buttons += emoticonButton("emoticon37", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thbook_choa4860123.gif");   
buttons += emoticonButton("emoticon38", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thboo.gif"); buttons += emoticonButton("emoticon39", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/thb1178223b3aa85ca321d9dfcbd4d7e37_.gif"); 
buttons += emoticonButton("emoticon40", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th4.gif");   
buttons += emoticonButton("emoticon41", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th286ca78ba41aec6f61a1f60743eba687.gif");   
buttons += emoticonButton("emoticon42", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th213.gif");   buttons += emoticonButton("emoticon43", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th2.gif");   buttons += emoticonButton("emoticon45", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th1708.gif");   buttons += emoticonButton("emoticon46", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th1554.gif");   buttons += emoticonButton("emoticon47", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th1549.gif");  
buttons += emoticonButton("emoticon48", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th11.gif");   buttons += emoticonButton("emoticon49", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/newmickey07efrg.gif");   
buttons += emoticonButton("emoticon50", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/27.gif");   buttons += emoticonButton("emoticon51", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/1239487637-869199.gif");    
buttons += emoticonButton("emoticon52", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/1239232352-150927.gif");
buttons += emoticonButton("emoticon51", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/1239180421-706513.gif");
buttons += emoticonButton("emoticon53", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/1239152226-628248.gif");
buttons += emoticonButton("emoticon54", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/1238736618-983278.gif");
buttons += emoticonButton("emoticon55", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/1234270543-421768.gif");
buttons += emoticonButton("emoticon56", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/1234956266-739161.gif");
buttons += emoticonButton("emoticon57", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/02A0940.gif");
buttons += emoticonButton("emoticon58", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/02A0933.gif");
buttons += emoticonButton("emoticon59", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/02A0930.gif");
buttons += emoticonButton("emoticon60", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/02A0928.gif");
buttons += emoticonButton("emoticon61", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/02A0918.gif");
buttons += emoticonButton("emoticon62", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/028_000054.gif");
buttons += emoticonButton("emoticon63", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/005_000197.gif");
buttons += emoticonButton("emoticon64", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/005_000201.gif");
buttons += emoticonButton("emoticon65", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/005_000194.gif");
buttons += emoticonButton("emoticon67", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th1238454992-316012.gif");
buttons += emoticonButton("emoticon68", "http://i569.photobucket.com/albums/ss139/newryn/babydollsmilies/th1541_meltycandy_choa4860123.gif");




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