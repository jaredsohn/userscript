// From my own initiative, so I made this script
// Created by Bramasta (http://t3-blogger.co.cc) 

// READ FIRST
// Works only in Compose mode on Blogger
// Works only in Old Post Editor on Blogger
// Add the emoticons at the end of the text
// If the image was not showed, it means the image hosting is down

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Monkey and Yahoo! Smiley for Blogger
// @namespace      http://t3-blogger.co.cc
// @description    You can use Monkey and Yahoo! emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("angel", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif");
	buttons += emoticonButton("nerd", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif");
	buttons += emoticonButton("stop", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif");
	buttons += emoticonButton("callme", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif");
	buttons += emoticonButton("oncall", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif");
	buttons += emoticonButton("despair", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif");
	buttons += emoticonButton("bye", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif");
	buttons += emoticonButton("around", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif");
	buttons += emoticonButton("luzer", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif");
	buttons += emoticonButton("rotten", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif");
	buttons += emoticonButton("silent", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif");
	buttons += emoticonButton("sulk", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif");
	buttons += emoticonButton("absurd", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif");
	buttons += emoticonButton("celebrate", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif");
	buttons += emoticonButton("slumber", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif");
	buttons += emoticonButton("hungry", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif");
	buttons += emoticonButton("think", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif");
	buttons += emoticonButton("oh...", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif");
	buttons += emoticonButton("bitefinger", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif");
	buttons += emoticonButton("blur", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif");
	buttons += emoticonButton("liar", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif");
	buttons += emoticonButton("sigh", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif");
        buttons += emoticonButton("hat", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif");
	buttons += emoticonButton("men", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif");
	buttons += emoticonButton("women", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif");
	buttons += emoticonButton("shame", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif");
	buttons += emoticonButton("pray", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif");
	buttons += emoticonButton("money", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif");
	buttons += emoticonButton("whistle", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif");
	buttons += emoticonButton("cool", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif");
	buttons += emoticonButton("battered", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif");
	buttons += emoticonButton("peace", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif");
	buttons += emoticonButton("dance", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif");
	buttons += emoticonButton("come on", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif");
	buttons += emoticonButton("ihikhik", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif");
	buttons += emoticonButton("talkative", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif");
	buttons += emoticonButton("obeisance", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif");
	buttons += emoticonButton("gatai", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif");
	buttons += emoticonButton("star", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif");
	buttons += emoticonButton("men2", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif");
	buttons += emoticonButton("drink", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif");
	buttons += emoticonButton("ros", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif");
	buttons += emoticonButton("chicken", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif");
	buttons += emoticonButton("angkatkening", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif");
	buttons += emoticonButton("hug", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif");
	buttons += emoticonButton("laugh", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif");
	buttons += emoticonButton("surprised", "http://wolverinex02.googlepages.com/icon_surprised.gif");
	buttons += emoticonButton("devil", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif");
	buttons += emoticonButton("breakup", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif");
	buttons += emoticonButton("smile", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif");
	buttons += emoticonButton("cry", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif");
	buttons += emoticonButton("kiss", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif");
	buttons += emoticonButton("noaffect", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif");
	buttons += emoticonButton("sad", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif");
	buttons += emoticonButton("senyumkenyit", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif");
	buttons += emoticonButton("kenyit", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif");
	buttons += emoticonButton("bigsmile", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif");
	buttons += emoticonButton("hmmm", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif");
	buttons += emoticonButton("love", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif");
	buttons += emoticonButton("tired", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif");
	buttons += emoticonButton("fear", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif");
	buttons += emoticonButton("longing", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif");
	buttons += emoticonButton("waiting", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif");
	buttons += emoticonButton("no", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif");
	buttons += emoticonButton("angry", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif");
	buttons += emoticonButton("hah", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif");
	buttons += emoticonButton("jelir", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif");
	buttons += emoticonButton("applause", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif");
	buttons += emoticonButton("confused", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif");
	buttons += emoticonButton("loud", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m129.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m004.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m022.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m019.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m066.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m137.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m149.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m207.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m159.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m161.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m172.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m155.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m087.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m027.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m171.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m173.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m177.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m054.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m121.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m146.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m011.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m131.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m145.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m052.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m136.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m018.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m059.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m009.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m126.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m115.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m073.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m139.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m182.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m036.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m046.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m090.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m102.gif");
	buttons += emoticonButton("Monkey", "http://laymark.com/i/m/m148.gif");
	buttons += emoticonButton("Monkey", "http://www.laymark.com/i/m/m135.gif");

	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);