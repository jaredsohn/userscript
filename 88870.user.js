// Based on the original emoticonsforblogger by babydoll (http://babydoll.nu/archives/tag/smilies)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           cute-smilies
// @namespace      
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


buttons += emoticonButton(":001:","http://img21.imageshack.us/img21/1270/9a52b9af0626b1282ce8b74.gif");
buttons += emoticonButton(":002:","http://img842.imageshack.us/img842/4955/72343985.gif");
buttons += emoticonButton(":003:","http://img188.imageshack.us/img188/3412/001wl.gif");
buttons += emoticonButton(":004:","http://img179.imageshack.us/img179/2238/14295553.gif");
buttons += emoticonButton(":005:","http://img3.imageshack.us/img3/6748/47689176.gif");
buttons += emoticonButton(":006:","http://img442.imageshack.us/img442/2470/35475632.gif");
buttons += emoticonButton(":007:","http://img179.imageshack.us/img179/3295/93012381.gif");
buttons += emoticonButton(":008:","http://img4.imageshack.us/img4/7307/532c18a0f974924221492c8.gif");
buttons += emoticonButton(":009:","http://img28.imageshack.us/img28/84/51f7dc3c8447c7497d693ee.gif");
buttons += emoticonButton(":010:","http://img541.imageshack.us/img541/8316/85866144.gif");
buttons += emoticonButton(":011:","http://img594.imageshack.us/img594/4813/74791160.gif");
buttons += emoticonButton(":012:","http://img3.imageshack.us/img3/3738/105vy.gif");
buttons += emoticonButton(":013:","http://img513.imageshack.us/img513/5539/00283b8b89cd848c6431d1d.gif");
buttons += emoticonButton(":014:","http://img821.imageshack.us/img821/1230/80919.gif");
buttons += emoticonButton(":015:","http://img25.imageshack.us/img25/6697/348891.gif");
buttons += emoticonButton(":016:","http://img222.imageshack.us/img222/255/201009181524246.gif");
buttons += emoticonButton(":017:","http://img801.imageshack.us/img801/1391/201010141555158.gif");
buttons += emoticonButton(":018:","http://img41.imageshack.us/img41/2972/14081212093550p906idoco.gif");
buttons += emoticonButton(":019:","http://img190.imageshack.us/img190/847/cc94aad76cd66c7fa7015ac.gif");
buttons += emoticonButton(":020:","http://img176.imageshack.us/img176/9546/celebrategoodtimes.gif");
buttons += emoticonButton(":021:","http://img264.imageshack.us/img264/1103/cfaha2.gif");
buttons += emoticonButton(":022:","http://img12.imageshack.us/img12/6485/crapl.gif");
buttons += emoticonButton(":023:","http://img714.imageshack.us/img714/2816/crycrycry.gif");
buttons += emoticonButton(":024:","http://img819.imageshack.us/img819/3193/dropdeadasleep.gif");
buttons += emoticonButton(":025:","http://img139.imageshack.us/img139/1861/fa6c816e5d390a3c1411325.gif");
buttons += emoticonButton(":026:","http://img295.imageshack.us/img295/4028/girl1.gif");
buttons += emoticonButton(":027:","http://img819.imageshack.us/img819/1968/hungryh.gif");
buttons += emoticonButton(":028:","http://img576.imageshack.us/img576/41/kissyface.gif");
buttons += emoticonButton(":029:","http://img249.imageshack.us/img249/6103/kissyheart.gif");
buttons += emoticonButton(":030:","http://img594.imageshack.us/img594/981/oopsk.gif");
buttons += emoticonButton(":031:","http://img823.imageshack.us/img823/1240/oro.gif");
buttons += emoticonButton(":032:","http://img3.imageshack.us/img3/1538/piggyy.gif");
buttons += emoticonButton(":033:","http://img51.imageshack.us/img51/8398/presentb.gif");
buttons += emoticonButton(":034:","http://img200.imageshack.us/img200/1278/skipping.gif");
buttons += emoticonButton(":035:","http://img232.imageshack.us/img232/8973/stressball.gif");    
buttons += emoticonButton(":036:","http://img547.imageshack.us/img547/1879/iconworries2.gif");
buttons += emoticonButton(":037:","http://img109.imageshack.us/img109/6909/supercry.gif");
buttons += emoticonButton(":038:","http://img28.imageshack.us/img28/8817/iconcloud.gif");
buttons += emoticonButton(":039:","http://img220.imageshack.us/img220/1562/iconrainy.gif");
buttons += emoticonButton(":040:","http://img530.imageshack.us/img530/7377/iconhearts2.gif")
buttons += emoticonButton(":041:","http://img220.imageshack.us/img220/9052/t0020002000200020103143.gif");
buttons += emoticonButton(":042:","http://img215.imageshack.us/img215/954/worry1.gif");
buttons += emoticonButton(":043:","http://img200.imageshack.us/img200/346/beardanceb.gif");
buttons += emoticonButton(":044:","http://img831.imageshack.us/img831/2936/biggrine.gif");
buttons += emoticonButton(":045:","http://img530.imageshack.us/img530/5194/heartwakuu.gif");
buttons += emoticonButton(":046:","http://img838.imageshack.us/img838/9803/iiface.gif");
buttons += emoticonButton(":047:","http://img708.imageshack.us/img708/7995/kumatan.gif");
buttons += emoticonButton(":048:","http://img844.imageshack.us/img844/2714/lightbulb.gif");
buttons += emoticonButton(":049:","http://img169.imageshack.us/img169/8504/38316556.gif");
buttons += emoticonButton(":050:","http://img443.imageshack.us/img443/439/12858418.gif");
buttons += emoticonButton(":051:","http://img838.imageshack.us/img838/5377/27369152.gif");
buttons += emoticonButton(":052:","http://img80.imageshack.us/img80/4953/worry.gif");
buttons += emoticonButton(":053:","http://img594.imageshack.us/img594/3705/totoro.gif");
	

	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"20\\\" height=\\\"20\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);