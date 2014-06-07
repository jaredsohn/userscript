// ==UserScript==
// @name           bobo@nini for Blogger by Yana
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
buttons += emoticonButton("bobo1", "http://emo.huhiho.com/set/bobinini/148.gif");
buttons += emoticonButton("emotikon02", "http://emo.huhiho.com/set/bobinini/85.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/31.gif");
buttons += emoticonButton("emotikon04", "http://emo.huhiho.com/set/bobinini/28.gif");
buttons += emoticonButton("emotikon05", "http://emo.huhiho.com/set/bobinini/38.gif");
buttons += emoticonButton("emotikon06", "http://emo.huhiho.com/set/bobinini/157.gif");
buttons += emoticonButton("emotikon07", "http://emo.huhiho.com/set/bobinini/154.gif");
buttons += emoticonButton("emotikon08", "http://emo.huhiho.com/set/bobinini/150.gif");
buttons += emoticonButton("emotikon09", "http://emo.huhiho.com/set/bobinini/146.gif");
buttons += emoticonButton("emotikon10", "http://emo.huhiho.com/set/bobinini/126.gif");
buttons += emoticonButton("emotikon1", "http://emo.huhiho.com/set/bobinini/123.gif");
buttons += emoticonButton("emotikon2", "http://emo.huhiho.com/set/bobinini/95.gif");
buttons += emoticonButton("emotikon3", "http://emo.huhiho.com/set/bobinini/82.gif");
buttons += emoticonButton("emotikon4", "http://emo.huhiho.com/set/bobinini/64.gif");
buttons += emoticonButton("emotikon5", "http://emo.huhiho.com/set/bobinini/63.gif");
buttons += emoticonButton("emotikon6", "http://emo.huhiho.com/set/bobinini/32.gif");
buttons += emoticonButton("emotikon7", "http://emo.huhiho.com/set/bobinini/6.gif");
buttons += emoticonButton("emotikon8", "http://emo.huhiho.com/set/bobinini/158.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/42.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/29.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/125.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/105.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/122.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/103.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/91.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/86.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/73.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/68.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/41.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/36.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/25.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/17.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/140.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/3.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/2.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/100.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/99.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/49.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/153.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/90.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/84.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/13.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/134.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/135.gif");
buttons += emoticonButton("emotikon03", "http://emo.huhiho.com/set/bobinini/144.gif");
buttons += emoticonButton("ultraman", "http://emo.huhiho.com/set/bobinini/10.gif");
buttons += emoticonButton("kelawar", "http://emo.huhiho.com/set/bobinini/20.gif");
buttons += emoticonButton("polis", "http://emo.huhiho.com/set/bobinini/12.gif");
buttons += emoticonButton("gusti", "http://emo.huhiho.com/set/bobinini/81.gif");
buttons += emoticonButton("tiupbelon", "http://emo.huhiho.com/set/bobinini/93.gif");
buttons += emoticonButton("mandi", "http://emo.huhiho.com/set/bobinini/101.gif");
buttons += emoticonButton("swimming", "http://emo.huhiho.com/set/bobinini/72.gif");

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