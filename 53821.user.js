// Based on the original emoticonsforblogger by Wolverinex02 (http://wolverinex02.blogspot.com/)
// Modified by sinstar (http://star1107.blogspot.com) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blospot
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
	buttons += emoticonButton("crysob", "http://emo.huhiho.com/set/bobototo/70.gif");
	buttons += emoticonButton("crycf", "http://emo.huhiho.com/set/bobototo/64.gif");
	buttons += emoticonButton("lovebek", "http://emo.huhiho.com/set/bobototo/84.gif");
	buttons += emoticonButton("sadd", "http://emo.huhiho.com/set/bobototo/75.gif");
	buttons += emoticonButton("cry02", "http://emo.huhiho.com/set/bobototo/11.gif");
	buttons += emoticonButton("plysand", "http://emo.huhiho.com/set/cuterabbit/10.gif");
	buttons += emoticonButton("cry03", "http://emo.huhiho.com/set/cuterabbit/139.gif");
	buttons += emoticonButton("czz", "http://emo.huhiho.com/set/cuterabbit/137.gif");
	buttons += emoticonButton("ckisss", "http://emo.huhiho.com/set/cuterabbit/133.gif");
	buttons += emoticonButton("sobsobs", "http://emo.huhiho.com/set/cuterabbit/129.gif");
	buttons += emoticonButton("loveee", "http://emo.huhiho.com/set/cuterabbit/108.gif");
	buttons += emoticonButton("laalaaa", "http://emo.huhiho.com/set/cuterabbit/57.gif");
	buttons += emoticonButton("kisskisss", "http://emo.huhiho.com/set/cuterabbit/38.gif");
	buttons += emoticonButton("rabitpig", "http://emo.huhiho.com/set/cuterabbit/5.gif");
	buttons += emoticonButton("yeeee", "http://emo.huhiho.com/set/cuterabbit/24.gif");
	buttons += emoticonButton("cry04", "http://emo.huhiho.com/set/cuterabbit/3.gif");
	buttons += emoticonButton("lerrr", "http://emo.huhiho.com/set/cuterabbit/88.gif");
	buttons += emoticonButton("weeeiii", "http://emo.huhiho.com/set/cuterabbit/12.gif");
	buttons += emoticonButton("xxmass", "http://emo.huhiho.com/set/cuterabbit/138.gif");
	buttons += emoticonButton("winkkk", "http://emo.huhiho.com/set/cuterabbit/14.gif");

	buttons += emoticonButton("muacksss", "http://emo.huhiho.com/set/cuterabbit/118.gif");

	buttons += emoticonButton("loveee", "http://emo.huhiho.com/set/cuterabbit/41.gif");
	buttons += emoticonButton("korekkk", "http://emo.huhiho.com/set/cuterabbit/36.gif");

	buttons += emoticonButton("ccuppp", "http://emo.huhiho.com/set/cuterabbit/43.gif");

	buttons += emoticonButton("muackss02", "http://emo.huhiho.com/set/cuterabbit/112.gif");

	buttons += emoticonButton("arghhh02", "http://emo.huhiho.com/set/cuterabbit/90.gif");

	buttons += emoticonButton("wahhaa", "http://emo.huhiho.com/set/cuterabbit/39.gif");
	buttons += emoticonButton("yehee", "http://emo.huhiho.com/set/cuterabbit/80.gif");
	buttons += emoticonButton("pigdogfren", "http://emo.huhiho.com/set/cuterabbit/70.gif");
	buttons += emoticonButton("whispyy", "http://emo.huhiho.com/set/littlegirls/68.gif");
	buttons += emoticonButton("nooooo", "http://emo.huhiho.com/set/littlegirls/75.gif");
	buttons += emoticonButton("byee", "http://emo.huhiho.com/set/littlegirls/24.gif");
	buttons += emoticonButton("muackssss", "http://emo.huhiho.com/set/littlegirls/7.gif");
	buttons += emoticonButton("honglonglong", "http://emo.huhiho.com/set/littlegirls/46.gif");

	buttons += emoticonButton("wahhahahahah05", "http://emo.huhiho.com/set/littlegirls/18.gif");
	buttons += emoticonButton("danccee", "http://emo.huhiho.com/set/beybeyfamily/132.gif");
	buttons += emoticonButton("singg", "http://emo.huhiho.com/set/beybey/9.gif");
	buttons += emoticonButton("knitt", "http://emo.huhiho.com/set/beybey/109.gif");
	buttons += emoticonButton("toucchh", "http://emo.huhiho.com/set/beybey/41.gif");
	buttons += emoticonButton("overweighth", "http://emo.huhiho.com/set/beybey/21.gif");
	buttons += emoticonButton("how05", "http://emo.huhiho.com/set/heyhey/111.gif");
	buttons += emoticonButton("pooor05", "http://emo.huhiho.com/set/heyhey/59.gif");
	buttons += emoticonButton("10x", "http://emo.huhiho.com/set/heyhey/58.gif");
	buttons += emoticonButton("sweating", "http://emo.huhiho.com/set/meemo/21.gif");
	buttons += emoticonButton("speechlesss", "http://emo.huhiho.com/set/meemo/27.gif");
	buttons += emoticonButton("claphandd", "http://emo.huhiho.com/set/meemo/24.gif");
	buttons += emoticonButton("alibababa", "http://emo.huhiho.com/set/meemo/25.gif");
	buttons += emoticonButton("bye88", "http://emo.huhiho.com/set/bobototo/58.gif");
	buttons += emoticonButton("sweating01", "http://emo.huhiho.com/set/littlekitty/10.gif");
	buttons += emoticonButton("jiong", "http://emo.huhiho.com/set/littlekitty/8.gif");
	buttons += emoticonButton("jfish", "http://emo.huhiho.com/set/redfox/5.gif");
	buttons += emoticonButton("yea", "http://emo.huhiho.com/set/milkbox/40.gif");
	buttons += emoticonButton("shyyy", "http://emo.huhiho.com/set/milkbox/51.gif");
	buttons += emoticonButton("shockk", "http://emo.huhiho.com/set/milkbottle/8.gif");
	buttons += emoticonButton("yeee", "http://emo.huhiho.com/set/crab/7.gif");
	buttons += emoticonButton("swttt", "http://emo.huhiho.com/set/beybey/76.gif");

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