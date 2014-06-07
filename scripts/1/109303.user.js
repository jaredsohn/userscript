// Based on the original emoticonsforblogger by Kuribo
// Modified by (http://sc4you.blogspot.com) 

// FEATURES
// Works only in Compose Modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Yahoo! Icon for Blogger
// @namespace      http://sc4you.blogspot.com
// @description    You can use Yahoo emoticons in Blogger.
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
	buttons += emoticonButton("pokpok", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif");
	buttons += emoticonButton("callme", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif");
	buttons += emoticonButton("adacall", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif");
	buttons += emoticonButton("tension", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif");
	buttons += emoticonButton("babai", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif");
	buttons += emoticonButton("around", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif");
	buttons += emoticonButton("tanduk", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif");
	buttons += emoticonButton("busuk", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif");
	buttons += emoticonButton("diam", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif");
	buttons += emoticonButton("merajuk", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif");
	buttons += emoticonButton("gile", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif");
	buttons += emoticonButton("celebrate", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif");
	buttons += emoticonButton("ngantuk", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif");
	buttons += emoticonButton("lapar", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif");
	buttons += emoticonButton("fikir", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif");
	buttons += emoticonButton("adus", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif");
	buttons += emoticonButton("gigitjari", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif");
	buttons += emoticonButton("blur", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif");
	buttons += emoticonButton("pinokio", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif");
	buttons += emoticonButton("sigh", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif");
        buttons += emoticonButton("topi", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif");
	buttons += emoticonButton("men", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif");
	buttons += emoticonButton("women", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif");
	buttons += emoticonButton("malu", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif");
	buttons += emoticonButton("doa", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif");
	buttons += emoticonButton("duit", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif");
	buttons += emoticonButton("siul", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif");
	buttons += emoticonButton("encem", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif");
	buttons += emoticonButton("tumbuk", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif");
	buttons += emoticonButton("peace", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif");
	buttons += emoticonButton("menari", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif");
	buttons += emoticonButton("marisini", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif");
	buttons += emoticonButton("ihikhik", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif");
	buttons += emoticonButton("banyakckp", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif");
	buttons += emoticonButton("sembah", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif");
	buttons += emoticonButton("gatai", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif");
	buttons += emoticonButton("star", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif");
	buttons += emoticonButton("men2", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif");
	buttons += emoticonButton("minum", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif");
	buttons += emoticonButton("ros", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif");
	buttons += emoticonButton("ayam", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif");
	buttons += emoticonButton("angkatkening", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif");
	buttons += emoticonButton("peluk", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif");
	buttons += emoticonButton("gelakguling", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif");
	buttons += emoticonButton("surprised", "http://wolverinex02.googlepages.com/icon_surprised.gif");
	buttons += emoticonButton("setan", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif");
	buttons += emoticonButton("putuscinte", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif");
	buttons += emoticonButton("senyum", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif");
	buttons += emoticonButton("nangih", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif");
	buttons += emoticonButton("cium", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif");
	buttons += emoticonButton("xpasti", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif");
	buttons += emoticonButton("sedih", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif");
	buttons += emoticonButton("senyumkenyit", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif");
	buttons += emoticonButton("kenyit", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif");
	buttons += emoticonButton("sengihnampakgigi", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif");
	buttons += emoticonButton("soal", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif");
	buttons += emoticonButton("love", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif");
	buttons += emoticonButton("penat", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif");
	buttons += emoticonButton("gigil", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif");
	buttons += emoticonButton("rindu", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif");
	buttons += emoticonButton("ketukmeje", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif");
	buttons += emoticonButton("takbole", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif");
	buttons += emoticonButton("marah", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif");
	buttons += emoticonButton("hah", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif");
	buttons += emoticonButton("jelir", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif");
	buttons += emoticonButton("tepuktangan", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif");
	buttons += emoticonButton("garupale", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif");
	buttons += emoticonButton("bising", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif");


	
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