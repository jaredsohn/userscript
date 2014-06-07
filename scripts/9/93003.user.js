// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Numbers
// @namespace      http://dieyna-afieyna.blogspot.com/
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
                      
	buttons += emoticonButton("1", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/1.gif");
buttons += emoticonButton("1e0eb8950ea22eb58c043d7b6238939a", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/1e0eb8950ea22eb58c043d7b6238939a.gif");
buttons += emoticonButton("2", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/2.gif");
buttons += emoticonButton("3", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/3.gif");
buttons += emoticonButton("4", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/4.gif");
buttons += emoticonButton("4b5fbfda470b94ce413638d9b844d384", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/4b5fbfda470b94ce413638d9b844d384.gif");
buttons += emoticonButton("5", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/5.gif");
buttons += emoticonButton("5d6aeee1616b03df739f60030db4aa9f", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/5d6aeee1616b03df739f60030db4aa9f.gif");
buttons += emoticonButton("6", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/6.gif");
buttons += emoticonButton("7", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/7.gif");
buttons += emoticonButton("8", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/8.gif");
buttons += emoticonButton("9", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/9.gif");
buttons += emoticonButton("20e46b0d052dce749fb7dbfe0ba12cc3", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/20e46b0d052dce749fb7dbfe0ba12cc3.gif");
buttons += emoticonButton("9599f8fc00f63e21dce2ae3667181d19", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/9599f8fc00f63e21dce2ae3667181d19.gif");
buttons += emoticonButton("863287d81fb051ea1973530885a469fa", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/863287d81fb051ea1973530885a469fa.gif");
buttons += emoticonButton("4199061f501eca26b90b5269a52bb4f5", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/4199061f501eca26b90b5269a52bb4f5.gif");
buttons += emoticonButton("a9017f2016d43e92886505be6e13ce91", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/a9017f2016d43e92886505be6e13ce91.gif");
buttons += emoticonButton("b24d2d4df87e15282ddae0015c37cb08", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/b24d2d4df87e15282ddae0015c37cb08.gif");
buttons += emoticonButton("d408702d44383ed4394ce8a19356b435", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/d408702d44383ed4394ce8a19356b435.gif");
buttons += emoticonButton("db095bfd", "http://i226.photobucket.com/albums/dd294/addina94/Numbers/db095bfd.gif");

        
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

