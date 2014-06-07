// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
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
	buttons += emoticonButton("wink", "http://img18.imageshack.us/img18/7673/winking0071.gif");
	buttons += emoticonButton("wink01", "http://img18.imageshack.us/img18/5919/winking0001.gif");
	buttons += emoticonButton("scared", "http://img5.imageshack.us/img5/7205/scared0015.gif");
	buttons += emoticonButton("sad01", "http://img17.imageshack.us/img17/7056/sad0094.gif");
	buttons += emoticonButton("sad02", "http://img23.imageshack.us/img23/6118/sad0093.gif");
	buttons += emoticonButton("msn", "http://img10.imageshack.us/img10/9528/msn28.gif");
	buttons += emoticonButton("msn01", "http://img9.imageshack.us/img9/7711/msn14.gif");
	buttons += emoticonButton("slp", "http://img18.imageshack.us/img18/7152/indifferent0024.gif");
	buttons += emoticonButton("cool", "http://img23.imageshack.us/img23/7793/cool0045.gif");
	buttons += emoticonButton("confusd", "http://img15.imageshack.us/img15/41/confused0036.gif");
	buttons += emoticonButton("mad", "http://img24.imageshack.us/img24/5012/mad0219.gif");
	buttons += emoticonButton("swt", "http://img14.imageshack.us/img14/6997/ashamed0006.gif");
	buttons += emoticonButton("neutral", "http://img4.imageshack.us/img4/4865/indifferent0014.gif");
	buttons += emoticonButton("question", "http://img18.imageshack.us/img18/4949/msn17.gif");
	buttons += emoticonButton("swt01", "http://img10.imageshack.us/img10/7359/ashamed0004.gif");
	buttons += emoticonButton("shy", "http://img8.imageshack.us/img8/3189/ashamed0001.gif");
	buttons += emoticonButton("sad", "http://img8.imageshack.us/img8/4425/sad0140.gif");
	buttons += emoticonButton("twisted", "http://img21.imageshack.us/img21/1020/evilgrin0032.gif");
	buttons += emoticonButton("lovehate", "http://www.emotasia.com/wp-content/uploads/grey-dust-emoticons-large-1.gif");
	buttons += emoticonButton("yay", "http://www.emotasia.com/wp-content/uploads/grey-dust-emoticons-large-3.gif");
	buttons += emoticonButton("angry", "http://www.emotasia.com/wp-content/uploads/grey-dust-emoticons-large-7.gif");
	buttons += emoticonButton("cry", "http://www.emotasia.com/wp-content/uploads/grey-dust-emoticons-large-13.gif");
	buttons += emoticonButton("heartbreak", "http://www.emotasia.com/wp-content/uploads/grey-dust-emoticons-large-14.gif");
	buttons += emoticonButton("wow", "http://www.emotasia.com/wp-content/uploads/egg-01.gif");
	buttons += emoticonButton("no", "http://www.emotasia.com/wp-content/uploads/egg-09.gif");
	buttons += emoticonButton("walking", "http://www.emotasia.com/wp-content/uploads/egg-10.gif");
	buttons += emoticonButton("ahhh", "http://www.emotasia.com/wp-content/uploads/grey-dust-emoticons-large-2.gif");
	buttons += emoticonButton("hee", "http://www.emotasia.com/wp-content/uploads/cute-animated-japanese-kitten-grey-1.gif");
	buttons += emoticonButton("huh", "http://www.emotasia.com/wp-content/uploads/cute-animated-japanese-kitten-grey-10.gif");
	buttons += emoticonButton("sing", "http://www.emotasia.com/wp-content/uploads/132.gif");
	buttons += emoticonButton("!?", "http://www.emotasia.com/wp-content/uploads/162.gif");
	buttons += emoticonButton("emo", "http://www.emotasia.com/wp-content/uploads/th_kitty23-03.gif");
	buttons += emoticonButton("err", "http://www.emotasia.com/wp-conten/uploads/64.gif");
	buttons += emoticonButton("sorry", "http://www.emotasia.com/wp-content/uploads/baby-bottle-top-emoticon-7.gif");
	buttons += emoticonButton("runaway", "http://www.emotasia.com/wp-content/uploads/baby-bottle-top-emoticon-1.gif");
	buttons += emoticonButton("dog1", "http://www.emotasia.com/wp-content/uploads/222740626.gif");
	buttons += emoticonButton("fatpanda", "http://www.emotasia.com/wp-content/uploads/furball-panda-emoticon-11.gif");
	buttons += emoticonButton("evilgrin", "http://www.emotasia.com/wp-content/uploads/black-devil-red-horns-emoticon.gif");
	buttons += emoticonButton("delicious", "http://www.emotasia.com/wp-content/uploads/totally-naughty-panda-emoticon-11.gif");

	
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);