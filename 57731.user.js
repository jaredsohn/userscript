// ==UserScript==
// @name           bobo@toto for Blogger by Yana
// @namespace      http://alittletaleofyna.blogspot.com/
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
buttons += emoticonButton("suke", "http://emo.huhiho.com/set/bobototo/95.gif");
buttons += emoticonButton("marah", "http://emo.huhiho.com/set/bobototo/94.gif");
buttons += emoticonButton("matrix", "http://emo.huhiho.com/set/bobototo/93.gif");
buttons += emoticonButton("sing", "http://emo.huhiho.com/set/bobototo/92.gif");
buttons += emoticonButton("smile", "http://emo.huhiho.com/set/bobototo/91.gif");
buttons += emoticonButton("demam", "http://emo.huhiho.com/set/bobototo/90.gif");
buttons += emoticonButton("madrunner", "http://emo.huhiho.com/set/bobototo/89.gif");
buttons += emoticonButton("boboluv", "http://emo.huhiho.com/set/bobototo/88.gif");
buttons += emoticonButton("menball", "http://emo.huhiho.com/set/bobototo/87.giff");
buttons += emoticonButton("pinkluv", "http://emo.huhiho.com/set/bobototo/84.gif");
buttons += emoticonButton("tired", "http://emo.huhiho.com/set/bobototo/83.gif");
buttons += emoticonButton("damn me", "http://emo.huhiho.com/set/bobototo/81.gif");
buttons += emoticonButton("shy", "http://emo.huhiho.com/set/bobototo/78.gif");
buttons += emoticonButton("sad", "http://emo.huhiho.com/set/bobototo/75.gif");
buttons += emoticonButton("hi", "http://emo.huhiho.com/set/bobototo/74.gif");
buttons += emoticonButton("mouthshut", "http://emo.huhiho.com/set/bobototo/73.gif");
buttons += emoticonButton("eatrunner", "http://emo.huhiho.com/set/bobototo/72.gif");
buttons += emoticonButton("swimming", "http://emo.huhiho.com/set/bobototo/71.gif");
buttons += emoticonButton("cry", "http://emo.huhiho.com/set/bobototo/70.gif");
buttons += emoticonButton("countrose", "http://emo.huhiho.com/set/bobototo/64.gif");
buttons += emoticonButton("arghh!", "http://emo.huhiho.com/set/bobototo/63.gif");
buttons += emoticonButton("wek", "http://emo.huhiho.com/set/bobototo/62.gif");
buttons += emoticonButton("baby", "http://emo.huhiho.com/set/bobototo/61.gif");
buttons += emoticonButton("circus", "http://emo.huhiho.com/set/bobototo/60.gif");
buttons += emoticonButton("bye", "http://emo.huhiho.com/set/bobototo/58.gif");
buttons += emoticonButton("mmuah", "http://emo.huhiho.com/set/bobototo/57.gif");
buttons += emoticonButton("addict", "http://emo.huhiho.com/set/bobototo/56.gif");
buttons += emoticonButton("kelip2", "http://emo.huhiho.com/set/bobototo/55.gif");
buttons += emoticonButton("ulat", "http://emo.huhiho.com/set/bobototo/53.gif");
buttons += emoticonButton("kilat", "http://emo.huhiho.com/set/bobototo/52.gif");
buttons += emoticonButton("die", "http://emo.huhiho.com/set/bobototo/50.gif");
buttons += emoticonButton("legball", "http://emo.huhiho.com/set/bobototo/48.gif");
buttons += emoticonButton("hantu", "http://emo.huhiho.com/set/bobototo/44.gif");
buttons += emoticonButton("drum", "http://emo.huhiho.com/set/bobototo/43.gif");
buttons += emoticonButton("luvu", "http://emo.huhiho.com/set/bobototo/42.gif");
buttons += emoticonButton("=)", "http://emo.huhiho.com/set/bobototo/41.gif");
buttons += emoticonButton("sleep", "http://emo.huhiho.com/set/bobototo/37.gif");
buttons += emoticonButton("kiss", "http://emo.huhiho.com/set/bobototo/36.gif");
buttons += emoticonButton("golek2", "http://emo.huhiho.com/set/bobototo/34.gif");
buttons += emoticonButton("dush2", "http://emo.huhiho.com/set/bobototo/31.gif");
buttons += emoticonButton("dieyou", "http://emo.huhiho.com/set/bobototo/30.gif");
buttons += emoticonButton("pee", "http://emo.huhiho.com/set/bobototo/27.gif");
buttons += emoticonButton("hingus", "http://emo.huhiho.com/set/bobototo/25.gif");
buttons += emoticonButton("flykiss", "http://emo.huhiho.com/set/bobototo/22.gif");
buttons += emoticonButton("eat2", "http://emo.huhiho.com/set/bobototo/21.gif");
buttons += emoticonButton("down", "http://emo.huhiho.com/set/bobototo/20.gif");
buttons += emoticonButton("dush3", "http://emo.huhiho.com/set/bobototo/16.gif");
buttons += emoticonButton("dush4", "http://emo.huhiho.com/set/bobototo/15.gif");
buttons += emoticonButton("lidah", "http://emo.huhiho.com/set/bobototo/13.gif");
buttons += emoticonButton("uwaa", "http://emo.huhiho.com/set/bobototo/11.gif");
buttons += emoticonButton("muntah", "http://emo.huhiho.com/set/bobototo/10.gif");
buttons += emoticonButton("ptui", "http://emo.huhiho.com/set/bobototo/9.gif");
buttons += emoticonButton("kempis", "http://emo.huhiho.com/set/bobototo/5.gif");
buttons += emoticonButton("shock", "http://emo.huhiho.com/set/bobototo/3.gif");
buttons += emoticonButton("mad", "http://emo.huhiho.com/set/bobototo/1.gif");
buttons += emoticonButton("dance", "http://emo.huhiho.com/set/bobototo/23.gif");
buttons += emoticonButton("ballet", "http://emo.huhiho.com/set/bobototo/19.gif");
buttons += emoticonButton("fly", "http://emo.huhiho.com/set/bobototo/7.gif");
buttons += emoticonButton("sailormoon", "http://emo.huhiho.com/set/bobototo/59.gif");
buttons += emoticonButton("jerk", "http://emo.huhiho.com/set/bobototo/38.gif");
buttons += emoticonButton("fall", "http://emo.huhiho.com/set/bobototo/51.gif");

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