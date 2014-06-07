
// Based on the original smilies by bibi1004 (http://www.bibi1004.com/)
// Modified by miss.mika (http://chrispy-cookies.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Bibi
// @namespace      http://www.bibi1004.com/
// @description    You can use emoticons in Blogger. by chrispy-cookies.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton(":kilig:", "http://i41.tinypic.com/24y95y9.jpg");
buttons += emoticonButton(":eyes:", "http://i40.tinypic.com/97o3fq.jpg");
buttons += emoticonButton(":pikit:", "http://i42.tinypic.com/1z175kw.jpg");
buttons += emoticonButton(":smile:", "http://i39.tinypic.com/hwzt39.jpg");
buttons += emoticonButton(":cry:", "http://i44.tinypic.com/vsdi85.jpg");
buttons += emoticonButton(":mulat:", "http://i43.tinypic.com/no8xz6.jpg");
buttons += emoticonButton(":galit:", "http://i43.tinypic.com/2e24jra.jpg");
buttons += emoticonButton(":gulat:", "http://i42.tinypic.com/30kq63q.jpg");
buttons += emoticonButton(":hehe:", "http://i39.tinypic.com/iqeb95.jpg");
buttons += emoticonButton(":err:", "http://i41.tinypic.com/149oa9y.jpg");
buttons += emoticonButton(":luv:", "http://i40.tinypic.com/21cxgd5.jpg");
buttons += emoticonButton(":inis:", "http://i43.tinypic.com/8wgvpg.jpg");
buttons += emoticonButton(":wow:", "http://i44.tinypic.com/jptyjl.jpg");
buttons += emoticonButton(":nice:", "http://i42.tinypic.com/sq30wj.jpg");
buttons += emoticonButton(":ooh:", "http://i43.tinypic.com/inwoxu.jpg");
buttons += emoticonButton(":hmp:", "http://i39.tinypic.com/2ijni9e.jpg");
buttons += emoticonButton(":grin:", "http://i39.tinypic.com/a2rt4h.jpg");
buttons += emoticonButton(":teary:", "http://i41.tinypic.com/9708hy.jpg");
buttons += emoticonButton(":simangot:", "http://i40.tinypic.com/11vk4qp.jpg");
buttons += emoticonButton(":kiss:", "http://i41.tinypic.com/2usitdt.jpg");
buttons += emoticonButton(":belat:", "http://i44.tinypic.com/2hncbo6.jpg");
buttons += emoticonButton(":wink:", "http://i43.tinypic.com/2quhws2.jpg");
buttons += emoticonButton(":wew:", "http://i43.tinypic.com/2hydikm.jpg");
buttons += emoticonButton(":serious:", ""http://i43.tinypic.com/mu7vbs.jpg);
buttons += emoticonButton(":chu:", "http://i39.tinypic.com/2ui8bw1.jpg");
buttons += emoticonButton(":drool:", "http://i40.tinypic.com/htw4rl.jpg");
	
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