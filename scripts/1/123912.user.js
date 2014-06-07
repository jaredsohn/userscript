// FEATURES SCRIPTS
// Works only in Compose modes
// Add the emoticons at the end of the text
//
// Follow these steps :
// Open your Mozilla Firefox browser anda install an add-on called GreaseMonkey
// Once you have installed Grease Monkey, restart your browser . . .
// Now you need to install this JavaScript to appear in your blogger editor.
//
// Sign in your blogger account and go to Settings > Layout > Edit HTML >
// Click Expand Widgets
// > and search for ]]></b:skin>
//
// Copy (Ctrl+C) and paste (Ctrl+V) the code below just above/before ]]></b:skin> :
//
// img.emoticon {
// padding: 0;
// margin: 0;
// border: 0;
// } 
//
// Save you template………Done!
// sign into your blogger account using blogger.com and not draft.blogger.com
//
// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Blogger Smileys
// @namespace      http://www.egcom9191.co.cc/
// @description    You can use this emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {

function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {
    var buttons = "<br />";
	
	buttons += emoticonButton(":sign:", "http://photoserver.ws/images/X73u4eb5807ec6a87.jpg");	
	buttons += emoticonButton(":onani:", "http://photoserver.ws/images/I0Eu4f1e684c1a3fe.gif");	
	buttons += emoticonButton(":theman:", "http://photoserver.ws/images/ZP4Z4f1e6757386ac.gif");	
	buttons += emoticonButton(":war:", "http://photoserver.ws/images/WF3t4f1e67c23ee5c.gif");	
	buttons += emoticonButton(":wuek:", "http://photoserver.ws/images/UtJi4f1e67c24cd6f.gif");	
	buttons += emoticonButton(":yes:", "http://photoserver.ws/images/1y4a4f1e67c25a0a7.gif");	
	buttons += emoticonButton(":thank:", "http://photoserver.ws/images/xtRx4f1e67917ca50.gif");	
	buttons += emoticonButton(":smile:", "http://photoserver.ws/images/opdK4f1e67916e379.gif");	
	buttons += emoticonButton(":sleep:", "http://photoserver.ws/images/cAny4f1e679160863.gif");	
	buttons += emoticonButton(":shock:", "http://photoserver.ws/images/kmCX4f1e67915299e.gif");	
	
	buttons += emoticonButton(":ngaceng:", "http://photoserver.ws/images/Opk74f1e684bb8dbf.gif");	
	buttons += emoticonButton(":roll:", "http://photoserver.ws/images/zcO84f1e67572b753.gif");	
	buttons += emoticonButton(":phew:", "http://photoserver.ws/images/Gd8r4f1e67361d00c.gif");	
	buttons += emoticonButton(":heran:", "http://photoserver.ws/images/YoDp4f1e6736418ef.gif");	
	buttons += emoticonButton(":jilat:", "http://photoserver.ws/images/zzfT4f1e670b11a76.gif");	
	buttons += emoticonButton(":penggal:", "http://photoserver.ws/images/XIKo4f1e670a59dc2.gif");	
	buttons += emoticonButton(":bored:", "http://photoserver.ws/images/DEy44f1e65eedad49.gif");	
	buttons += emoticonButton(":nyerah:", "http://photoserver.ws/images/rvIl4f1e670a3fb14.gif");	
	buttons += emoticonButton(":pray:", "http://photoserver.ws/images/x10Q4f1e67363459a.gif");	
	buttons += emoticonButton(":rape:", "http://photoserver.ws/images/iISH4f1e67364f7e8.gif");
	
	buttons += emoticonButton(":muntah:", "http://photoserver.ws/images/LTxn4f1e66eb1d213.gif");	
	buttons += emoticonButton(":maki:", "http://photoserver.ws/images/uL6x4f1e66eb0fae4.gif");	
        buttons += emoticonButton(":love:", "http://photoserver.ws/images/nhkR4f1e66eb023bc.gif");	
	buttons += emoticonButton(":looser:", "http://photoserver.ws/images/fhzV4f1e66eadc428.gif");	
	buttons += emoticonButton(":evil:", "http://photoserver.ws/images/XF3h4f1e66c4125b6.gif");	
        buttons += emoticonButton(":break:", "http://photoserver.ws/images/kQTs4f1e65ef1590a.gif");	
        buttons += emoticonButton(":hehe:", "http://photoserver.ws/images/EsgA4f1e66c42f7b6.gif");	
	buttons += emoticonButton(":bingung:", "http://photoserver.ws/images/tgNq4f1e65b1695d9.gif");	
        buttons += emoticonButton(":aduh:", "http://photoserver.ws/images/yJdA4f1e6642aa0f0.gif");	
	buttons += emoticonButton(":fuck:", "http://photoserver.ws/images/K4SI4f1e6642c4b73.gif");

        buttons += emoticonButton(":curiga:", "http://photoserver.ws/images/0imB4f1e661f0625b.gif");
	buttons += emoticonButton(":cold:", "http://photoserver.ws/images/tWmn4f1e661f42c80.gif");
	buttons += emoticonButton(":donald:", "http://photoserver.ws/images/cOYT4f1e661f5d25e.gif");
	buttons += emoticonButton(":cries:", "http://photoserver.ws/images/GhUm4f1e65ef24f22.gif");
	buttons += emoticonButton(":bravo:", "http://photoserver.ws/images/9AGk4f1e65ef06ac2.gif");
	buttons += emoticonButton(":aloo:", "http://photoserver.ws/images/MF8I4f1e65b0e39d1.gif");
	buttons += emoticonButton(":wakaka:", "http://photoserver.ws/images/KKqX4f1e65b158c1d.gif");
	buttons += emoticonButton(":down-1:", "http://photoserver.ws/images/tSjN4f1e6642977be.png");
	buttons += emoticonButton(":down-2:", "http://photoserver.ws/images/T5In4f1e661f6a594.gif");
	buttons += emoticonButton(":flag:", "http://photoserver.ws/images/6lzg4f1e6642b7c13.gif");
	
	buttons += emoticonButton(":silat:", "http://photoserver.ws/images/KjOc4f1e684bf1317.gif");
	buttons += emoticonButton(":throw:", "http://photoserver.ws/images/H5484f1e67c23077c.gif");
	buttons += emoticonButton(":read:", "http://photoserver.ws/images/CapH4f1e67571d85a.gif");
	buttons += emoticonButton(":angry:", "http://photoserver.ws/images/Qiic4f1e65b131180.gif");
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