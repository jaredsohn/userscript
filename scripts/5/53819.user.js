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
	buttons += emoticonButton("cheh", "http://img11.imageshack.us/img11/9273/1775465296.jpg");
	buttons += emoticonButton("putt", "http://img237.imageshack.us/img237/723/1775465297.jpg");
	buttons += emoticonButton("pyes", "http://img110.imageshack.us/img110/6192/1775465298.jpg");
	buttons += emoticonButton("disburden", "http://img193.imageshack.us/img193/2112/1775465299.jpg");
	buttons += emoticonButton("puhh", "http://img512.imageshack.us/img512/3022/1775465300.jpg");
	buttons += emoticonButton("lalalala", "http://img43.imageshack.us/i/1775465294.jpg/");
	buttons += emoticonButton("ermmm", "http://img190.imageshack.us/i/1775465293.jpg/");
	buttons += emoticonButton("stomachache", "http://img352.imageshack.us/i/1775465292.jpg/");
	buttons += emoticonButton("sleepyzz", "http://img139.imageshack.us/i/1775465291.jpg/");
	buttons += emoticonButton("wakkaka", "http://img352.imageshack.us/i/1775465290.jpg/");
	buttons += emoticonButton("gaigai", "http://img27.imageshack.us/i/1775465301.jpg/");
	buttons += emoticonButton("nonono", "http://img139.imageshack.us/i/1775465316.jpg/");
	buttons += emoticonButton("coppyy", "http://img187.imageshack.us/i/1775465315.jpg/");
	buttons += emoticonButton("hungrryy", "http://img383.imageshack.us/i/1775465289.jpg/");
	buttons += emoticonButton("salivadrop", "http://img80.imageshack.us/i/1775465314.jpg/");
	buttons += emoticonButton("agogodance", "http://img139.imageshack.us/i/1775465313.jpg/");
	buttons += emoticonButton("agogodance01", "http://img404.imageshack.us/i/1775465312.jpg/");
	buttons += emoticonButton("agogodance02", "http://img404.imageshack.us/i/1775465311.jpg/");
	buttons += emoticonButton("arlu", "http://img80.imageshack.us/i/1775465310.jpg/");
	buttons += emoticonButton("wuhudance", "http://img33.imageshack.us/i/1775465308.jpg/");
	buttons += emoticonButton("omggg", "http://img11.imageshack.us/i/1775465305.jpg/");
	buttons += emoticonButton("killl", "http://img33.imageshack.us/i/1775465304.jpg/");
	buttons += emoticonButton("chammm", "http://img204.imageshack.us/i/1775465303.jpg/");
	buttons += emoticonButton("chehh", "http://img43.imageshack.us/i/1775465302.jpg/");
	buttons += emoticonButton("arghhh", "http://img193.imageshack.us/i/1775465319.jpg/");
	buttons += emoticonButton("readnews", "http://img12.imageshack.us/i/1775465324.jpg/");
	buttons += emoticonButton("cryy", "http://img148.imageshack.us/i/1775465325.jpg/");
	buttons += emoticonButton("heyy", "http://img188.imageshack.us/i/1775465326.jpg/");
	buttons += emoticonButton("argh01", "http://img12.imageshack.us/i/1775465327.jpg/");
	buttons += emoticonButton("dididi", "http://img188.imageshack.us/i/1775465328.jpg/");
	buttons += emoticonButton("ngek", "http://img513.imageshack.us/i/1775465329.jpg/");
	buttons += emoticonButton("chuan", "http://img182.imageshack.us/i/1775465330.jpg/");
	buttons += emoticonButton("tititi", "http://img198.imageshack.us/i/1775465331.jpg/");
	buttons += emoticonButton("lalalaaa", "http://img198.imageshack.us/i/1775465332.jpg/");
	buttons += emoticonButton("taaalaa", "http://img50.imageshack.us/i/1775465333.jpg/");
	buttons += emoticonButton("ccry", "http://img297.imageshack.us/i/1775465362.jpg/");
	buttons += emoticonButton("vblod", "http://img193.imageshack.us/i/1775465361.jpg/");
	buttons += emoticonButton("angrry", "http://img521.imageshack.us/i/1775465360.jpg/");
	buttons += emoticonButton("sshhyy", "http://img521.imageshack.us/i/1775465360.jpg/");
	buttons += emoticonButton("ookk", "http://img509.imageshack.us/i/1775465358.jpg/");
	buttons += emoticonButton("la01", "http://img213.imageshack.us/i/1775465357.jpg/");
	buttons += emoticonButton("huuu", "http://img213.imageshack.us/i/1775465356.jpg/");
	buttons += emoticonButton("blingg", "http://img509.imageshack.us/i/1775465355.jpg/");
	buttons += emoticonButton("niceflower", "http://img521.imageshack.us/i/1775465354.jpg/");
	buttons += emoticonButton("knockk", "http://img513.imageshack.us/i/1775465353.jpg/");
	buttons += emoticonButton("jehhk", "http://img513.imageshack.us/i/1775465352.jpg/");
	buttons += emoticonButton("lvlup", "http://img80.imageshack.us/i/1775465351.jpg/");
	buttons += emoticonButton("bbath", "http://img212.imageshack.us/i/1775465350.jpg/");
	buttons += emoticonButton("shockk", "http://img513.imageshack.us/i/1775465348.jpg/");
	buttons += emoticonButton("bloodnose", "http://img529.imageshack.us/i/1775465347.jpg/");
	buttons += emoticonButton("angell", "http://img80.imageshack.us/i/1775465346.jpg/");
	buttons += emoticonButton("ngekkk", "http://img513.imageshack.us/i/1775465344.jpg/");
	buttons += emoticonButton("cubitt", "http://img329.imageshack.us/i/1775465343.jpg/");
	buttons += emoticonButton("cubit01", "http://img80.imageshack.us/i/1775465342.jpg/");
	buttons += emoticonButton("shoo", "http://img513.imageshack.us/i/1775465341.jpg/");
	buttons += emoticonButton("oold", "http://img95.imageshack.us/i/1775465340.jpg/");
	buttons += emoticonButton("speechless", "http://img329.imageshack.us/i/1775465339.jpg/");
	buttons += emoticonButton("scarry", "http://img95.imageshack.us/i/1775465338.jpg/");
	buttons += emoticonButton("salivadrop", "http://img80.imageshack.us/i/1775465337.jpg/");
	buttons += emoticonButton("muacksss", "http://img56.imageshack.us/i/1775465336.jpg/");
	buttons += emoticonButton("aiyakkk", "http://img56.imageshack.us/i/1775465335.jpg/");
	buttons += emoticonButton("dance01", "http://img248.imageshack.us/i/1775465334.jpg/");
	
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