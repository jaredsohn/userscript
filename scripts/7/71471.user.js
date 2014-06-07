// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http:///) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger Onion 3.0
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by 
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/dead.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/dead1.png");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/10i9natjpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/2.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/25s8vtfjpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/2621mzajpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/29e6fcnjpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/2zgg9pkjpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/f4gydcjpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/t97fxujpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th1zptr1y.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th23l1ilz.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th2z9cjrl.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th313hsbc.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th35i67gm.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thadi62x.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thdo8jh0.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/the16ptw.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thfbjrl5.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/zyaxj9jpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/054gif.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/125gif.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th021gif.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th027gif.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th030gif.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th059gif.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/019.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/022.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/020.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/023.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/024.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/025.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/026.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/029.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/033.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/034.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/035.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/036.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/037.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/038.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/041.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/043.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/044.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/045.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/046.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/047.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/048.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/049.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/050.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/051.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/052.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/053.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/055.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/057.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/058.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/060.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/061.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/062.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/063.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/064.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/065.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/066.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/067.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/069.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/070.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/071.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/072.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/074.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/075.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/077.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/079.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/080.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/086.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/087.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/088.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/089.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/090.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/091.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/092.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/094.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/095.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th096gif.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/097.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/098.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/099.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/101.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/102.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/104.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/108.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/111.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/116.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/118.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/119.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/120.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/121.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/122.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/127.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/128.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/133.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th10jpg.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th70jpg.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th78jpg.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/inqsdk.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th1.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th131.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th22b6zb.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th2i0947kjpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th27xnn0k.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th2iviihk.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th2lnxv2d.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th88jpg.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th2z9cjrljpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th391.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th50-1.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th541.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thAnimation11.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thAnimation80.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thCopyofangry.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thCopyofeew.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thCopyofeyebag.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thCopyofeyebag2.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thCopyofeyelashes.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thcatsno.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thcry.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thcrying.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thdizzy.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thduh.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/the16ptwjpg.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thfire.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thgrrr.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th60jpg.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thhappy.jpg");
buttons += emoticonButton("", "hhttp://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thhappy2.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thheeheehee.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thhi.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thhuh.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th53jpg.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thkapalkilay.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thkiss.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th71jpg.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th64jpg.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thkissy.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thkissy.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thlove.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thnice.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thnoo.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thnosebleed.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thnosebleed2.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thoo.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thooh.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thsad.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thshy.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thshy2.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thshy3.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thshygry.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thspark.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thtear.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thtongue.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thtsk.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thuhmm.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thwaa.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thwaah.jpg");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/thAnimation5gif.gif");
buttons += emoticonButton("", "http://i603.photobucket.com/albums/tt120/g-umdroptears/BiBi%20Official/th65jpg.jpg");

	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);