// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/)
// Wolverine script modified by CataCC (http://locdedatcucapul.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://locdedatcucapul.blogspot.com/2007/11/script-pentru-inserarea-de-emoticoane.html/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// @include	   *
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("happy", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif");
	buttons += emoticonButton("sad", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif");
	buttons += emoticonButton("wink", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif");
	buttons += emoticonButton("biggrin", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif");
	buttons += emoticonButton("eyelash", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif");
	buttons += emoticonButton("bighug", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif");
	buttons += emoticonButton("confused", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif");
	buttons += emoticonButton("love", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif");
	buttons += emoticonButton("blush", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif");
	buttons += emoticonButton("tongue", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif");
	buttons += emoticonButton("kiss", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif");
	buttons += emoticonButton("brokenheart", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif");
	buttons += emoticonButton("surprise", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif");
	buttons += emoticonButton("angry", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif");
	buttons += emoticonButton("smug", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif");
	buttons += emoticonButton("cool", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif");
	buttons += emoticonButton("worried", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif");
	buttons += emoticonButton("whew", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif");
	buttons += emoticonButton("devil", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif");
	buttons += emoticonButton("cry", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif");
	buttons += emoticonButton("laugh", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif");
	buttons += emoticonButton("straight", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif");
	buttons += emoticonButton("eyebrown", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif");
	buttons += emoticonButton("rotfl", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif");
	buttons += emoticonButton("angel", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif");
	buttons += emoticonButton("nerd", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif");
	buttons += emoticonButton("talkhand", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif");
	buttons += emoticonButton("callme", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif");
	buttons += emoticonButton("onthephone", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif");
	buttons += emoticonButton("atwitshand", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif");
	buttons += emoticonButton("wave", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif");
	buttons += emoticonButton("timeout", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/104.gif");
	buttons += emoticonButton("daydream", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif");
	buttons += emoticonButton("sleep", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif");
	buttons += emoticonButton("rollingeyes", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif");
	buttons += emoticonButton("loser", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif");
	buttons += emoticonButton("sick", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif");
	buttons += emoticonButton("shhh", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif");
	buttons += emoticonButton("notalk", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif");
	buttons += emoticonButton("clown", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif");
	buttons += emoticonButton("silly", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif");
	buttons += emoticonButton("party", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif");
	buttons += emoticonButton("yawn", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif");
	buttons += emoticonButton("drool", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif");
	buttons += emoticonButton("think", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif");
	buttons += emoticonButton("doh", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif");
	buttons += emoticonButton("applause", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif");
	buttons += emoticonButton("nailbyte", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif");
	buttons += emoticonButton("hypno", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif");
	buttons += emoticonButton("liar", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif");
	buttons += emoticonButton("wait", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif");
	buttons += emoticonButton("sigh", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif");
	buttons += emoticonButton("phbbbt", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif");
	buttons += emoticonButton("cowboy", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif");

	buttons += separator();
	buttons += separator();

// Hidden emoticons
	buttons += emoticonButton("puppyeyes", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/108.gif");
	buttons += emoticonButton("donno", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif");
	buttons += emoticonButton("notlisten", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif");
	buttons += emoticonButton("pig", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif");
	buttons += emoticonButton("cow", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif");
	buttons += emoticonButton("monkey", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif");
	buttons += emoticonButton("chicken", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif");
	buttons += emoticonButton("rose", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif");
	buttons += emoticonButton("goodluck", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif");
	buttons += emoticonButton("USAflag", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif");
	buttons += emoticonButton("pumpkin", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif");
	buttons += emoticonButton("coffee", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif");
	buttons += emoticonButton("idea", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif");
	buttons += emoticonButton("skull", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif");
	buttons += emoticonButton("greenbug", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif");
	buttons += emoticonButton("alien", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif");
	buttons += emoticonButton("frustrated", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif");
	buttons += emoticonButton("pray", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif");
	buttons += emoticonButton("moneyeyes", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif");
	buttons += emoticonButton("whistle", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif");
	buttons += emoticonButton("beatup", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif");
	buttons += emoticonButton("victorysign", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif");
	buttons += emoticonButton("shameonyou", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif");
	buttons += emoticonButton("dance", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif");
	buttons += emoticonButton("bringit", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif");
	buttons += emoticonButton("heehee", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif");
	buttons += emoticonButton("chatter", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif");
	buttons += emoticonButton("notworthy", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif");
	buttons += emoticonButton("ohgoon", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif");
	buttons += emoticonButton("star", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif");
	buttons += emoticonButton("hiro", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif");
	buttons += emoticonButton("billy", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif");
	buttons += emoticonButton("april", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif");
	buttons += emoticonButton("yinyang", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"auto\\\" height=\\\"auto\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);