// Based on the original code from miss.mika (http://chrispy-cookies.blogspot.com/) 
// Modified by yourtruly (ur blog url) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           smilies
// @namespace      http://www.url.com/
// @description    You can use emoticons in Blogger. 
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	

buttons += emoticonButton(":1:", "http://dl5.glitter-graphics.net/pub/1823/1823115n976m8o78w.gif");
buttons += emoticonButton(":2:", "http://dl2.glitter-graphics.net/pub/1823/1823122mb0ge1migw.gif");
buttons += emoticonButton(":3:", "http://dl6.glitter-graphics.net/pub/1823/1823116jxrlmkctu7.gif");
buttons += emoticonButton(":4:", "http://dl8.glitter-graphics.net/pub/1823/1823118tkxa77gu7d.gif");
buttons += emoticonButton(":5:", "http://dl7.glitter-graphics.net/pub/1823/1823117cktsy37cji.gif");
buttons += emoticonButton(":6:", "http://dl10.glitter-graphics.net/pub/1823/1823120ezr0etjfvx.gif");
buttons += emoticonButton(":7:", "http://dl4.glitter-graphics.net/pub/1823/1823114rpugzspo0z.gif");
buttons += emoticonButton(":8:", "http://dl9.glitter-graphics.net/pub/1823/1823119wmna28tq6p.gif");
buttons += emoticonButton(":9:", "http://dl.glitter-graphics.net/pub/1823/1823121mlp8xgt1ek.gif");
buttons += emoticonButton(":10:", "http://dl.glitter-graphics.net/pub/2230/2230441w7qwndytfx.gif");
buttons += emoticonButton(":11:", "http://dl6.glitter-graphics.net/pub/2230/2230456u5lzpcdgm0.gif");
buttons += emoticonButton(":12:", "http://dl8.glitter-graphics.net/pub/2230/2230458ffnb0e7qky.gif");
buttons += emoticonButton(":13:", "http://dl3.glitter-graphics.net/pub/2230/2230433k8zt3hm54h.gif");
buttons += emoticonButton(":14:", "http://dl5.glitter-graphics.net/pub/2230/2230425x55tk3drvo.gif");
buttons += emoticonButton(":15:", "http://dl2.glitter-graphics.net/pub/2230/2230422ezvofndnne.gif");
buttons += emoticonButton(":16:", "http://dl.glitter-graphics.net/pub/2230/2230421g0cp9r3tvz.gif");
buttons += emoticonButton(":17:", "http://dl.glitter-graphics.net/pub/2230/2230391i151gus0br.gif");
buttons += emoticonButton(":18:", "http://dl8.glitter-graphics.net/pub/2230/2230438n5n7e3ldev.gif");
buttons += emoticonButton(":19:", "http://dl5.glitter-graphics.net/pub/2230/2230465vyxnrhvntj.gif");
buttons += emoticonButton(":20:", "http://dl7.glitter-graphics.net/pub/2230/2230387udbbey46ew.gif");
buttons += emoticonButton(":21:", "http://dl.glitter-graphics.net/pub/2230/2230431snxifkimba.gif");
buttons += emoticonButton(":22:", "http://dl8.glitter-graphics.net/pub/2230/2230468nlnz68axat.gif");
buttons += emoticonButton(":23:", "http://dl9.glitter-graphics.net/pub/2230/2230449atuwtku9jc.gif");
buttons += emoticonButton(":24:", "http://dl3.glitter-graphics.net/pub/2230/2230383xqd4ss1t15.gif");
buttons += emoticonButton(":25:", "http://dl4.glitter-graphics.net/pub/2230/2230454gmx8gb7rss.gif");
buttons += emoticonButton(":27:", "http://dl6.glitter-graphics.net/pub/2230/2230436l2hzuzmqod.gif");
buttons += emoticonButton(":28:", "http://dl7.glitter-graphics.net/pub/2112/2112577h7ec1qm8mm.gif");
buttons += emoticonButton(":29:", "http://dl5.glitter-graphics.net/pub/2112/2112575r9ihq4vmhd.gif");
buttons += emoticonButton(":30:", "http://dl3.glitter-graphics.net/pub/2112/2112573yawfy8exen.gif");
buttons += emoticonButton(":31:", "http://dl8.glitter-graphics.net/pub/2230/2230448c2z10ujqd3.gif");
buttons += emoticonButton(":32:", "http://dl3.glitter-graphics.net/pub/2228/2228253wfxcdj1hj1.gif");
buttons += emoticonButton(":33:", "http://dl6.glitter-graphics.net/pub/2084/2084516lotocpu0fa.gif");
buttons += emoticonButton(":34:", "http://dl2.glitter-graphics.net/pub/2617/2617372pgrsy5telp.gif");
buttons += emoticonButton(":35:", "http://dl9.glitter-graphics.net/pub/1823/1823139giuazu2ga4.gif");
buttons += emoticonButton(":36:", "http://dl6.glitter-graphics.net/pub/2359/2359996dixblen4rf.gif");
buttons += emoticonButton(":37:", "http://dl10.glitter-graphics.net/pub/1528/1528960vmqvpw4jt3.gif");
buttons += emoticonButton(":38:", "http://dl9.glitter-graphics.net/pub/1328/1328329h5cmi3di50.gif");
+buttons += emoticonButton(":39:", "http://i923.photobucket.com/albums/ad77/Chapter-s/angry-2.png");
+buttons += emoticonButton(":40:", "http://i923.photobucket.com/albums/ad77/Chapter-s/beadyeyed.png");
+buttons += emoticonButton(":41:", "http://i923.photobucket.com/albums/ad77/Chapter-s/cry-1.png");
+buttons += emoticonButton(":42:", "http://i923.photobucket.com/albums/ad77/Chapter-s/happy.png");
+buttons += emoticonButton(":43:", "http://i923.photobucket.com/albums/ad77/Chapter-s/laughing.png");
+buttons += emoticonButton(":44:", "http://i923.photobucket.com/albums/ad77/Chapter-s/love.png");
+buttons += emoticonButton(":45:", "http://i923.photobucket.com/albums/ad77/Chapter-s/sad.png");
+buttons += emoticonButton(":46:", "http://i923.photobucket.com/albums/ad77/Chapter-s/singing.png");
+buttons += emoticonButton(":47:", "http://i923.photobucket.com/albums/ad77/Chapter-s/smile-1.png"); 


	
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