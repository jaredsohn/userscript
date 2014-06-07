// ==UserScript==
// @name           cute emoticons
// @namespace      http://areenthemonster.blogspot.com
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
                     
        buttons += emoticonButton("emoticon01", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/pic004demoji_14162091decoojp.gif");
buttons += emoticonButton("emoticon02", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/pic009demoji_11848475decoojp.gif");
buttons += emoticonButton("emoticon03", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/pic004demoji_47307decoojp.gif");
  buttons += emoticonButton("emoticon04", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic005demoji_18140524decoojp-1.gif");
buttons += emoticonButton("emoticon05", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/fv-new03.png");
buttons += emoticonButton("emoticon06", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/01.gif");
buttons += emoticonButton("emoticon08", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic007demoji_18018293decoojp-1.gif");
buttons += emoticonButton("emoticon09", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic009demoji_15652834decoojp-1.gif");
 buttons += emoticonButton("emoticon10", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic003demoji_12716074decoojp-1.gif");
buttons += emoticonButton("emoticon11", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic001demoji_305285decoojp-1.gif");
buttons += emoticonButton("emoticon12", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic004demoji_19044100decoojp-1.gif");
 buttons += emoticonButton("emoticon13", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic003demoji_431243decoojp-1.gif");
buttons += emoticonButton("emoticon14", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic000demoji_18565266decoojp-1.gif");
buttons += emoticonButton("emoticon15", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic004demoji_16901246decoojp-1.gif");
buttons += emoticonButton("emoticon16", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic008demoji_13728279decoojp-1.gif");
buttons += emoticonButton("emoticon17", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic008demoji_14102164decoojp-1.gif");
buttons += emoticonButton("emoticon18", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic008demoji_15701325decoojp-1.gif");
buttons += emoticonButton("emoticon19", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic008demoji_17405357decoojp-1.gif");
buttons += emoticonButton("emoticon20", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic010demoji_15825155decoojp-1.gif");
buttons += emoticonButton("emoticon21", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic009demoji_12386811decoojp-1.gif");
buttons += emoticonButton("emoticon22", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic011demoji_406458decoojp-1.gif");
buttons += emoticonButton("emoticon23", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic011demoji_673530decoojp-1.gif");
buttons += emoticonButton("emoticon24", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic010demoji_17145056decoojp-1.gif");
buttons += emoticonButton("emoticon25", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic010demoji_12930648decoojp-1.gif");
buttons += emoticonButton("emoticon26", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic012demoji_416972decoojp-1.gif");
buttons += emoticonButton("emoticon27", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic011demoji_15889022decoojp-1.gif");
buttons += emoticonButton("emoticon28", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic013demoji_16539880decoojp-1.gif");
buttons += emoticonButton("emoticon29", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic013demoji_15480984decoojp-1.gif");
buttons += emoticonButton("emoticon30", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic014demoji_14485061decoojp-2.gif");
buttons += emoticonButton("emoticon31", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic015demoji_655215decoojp-2.gif");
buttons += emoticonButton("emoticon32", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic015demoji_11996376decoojp-2.gif");
buttons += emoticonButton("emoticon33", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic014demoji_666399decoojp-2.gif"); 
buttons += emoticonButton("emoticon34", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic014demoji_14457613decoojp-2.gif");
buttons += emoticonButton("emoticon35", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/945496ura7oa5cpr.gif");
buttons += emoticonButton("emoticon36", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic014demoji_14952575decoojp-2.gif");     
buttons += emoticonButton("emoticon37", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic015demoji_13092321decoojp-2.gif");
buttons += emoticonButton("emoticon38", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/1867949zpnuvtmy7y.gif"); 
buttons += emoticonButton("emoticon39", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/comment.png");
buttons += emoticonButton("emoticon40", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/945498rit22omlcb.gif");
buttons += emoticonButton("emoticon41", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic014demoji_9439554decoojp-2.gif"); 
buttons += emoticonButton("emoticon42", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/rosey.png");
buttons += emoticonButton("emoticon43", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/799172uz6pzuh6ge.gif"); 
buttons += emoticonButton("emoticon44", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/wave.gif");
buttons += emoticonButton("emoticon45", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/2234726ry2tbzm4wm.gif"); 
buttons += emoticonButton("emoticon46", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic019demoji_15686193decoojp-2.gif");
buttons += emoticonButton("emoticon47", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic019demoji_17714269decoojp-2.gif"); 
buttons += emoticonButton("emoticon48", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic019demoji_16892713decoojp-2.gif");
buttons += emoticonButton("emoticon49", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/487276u39qaohhu4.png"); 
buttons += emoticonButton("emoticon50", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/2311893psuselzdxp.gif");
buttons += emoticonButton("emoticon51", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/574522sixw97tk3d.gif"); 
buttons += emoticonButton("emoticon52", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/wave.gif");
buttons += emoticonButton("emoticon53", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/702299i6b3gu1drw.gif"); 
buttons += emoticonButton("emoticon54", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/442960qk4wjtzztt.gif");
buttons += emoticonButton("emoticon55", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/tenki8.gif"); 
buttons += emoticonButton("emoticon56", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic018demoji_14145100decoojp-1.gif");
buttons += emoticonButton("emoticon57", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic018demoji_16709583decoojp-2.gif"); 
buttons += emoticonButton("emoticon58", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic018demoji_13829990decoojp-2.gif"); 
buttons += emoticonButton("emoticon59", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic017demoji_890224decoojp-2.gif");
buttons += emoticonButton("emoticon60", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic019demoji_14776540decoojp-2.gif"); 
buttons += emoticonButton("emoticon61", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic018demoji_17169318decoojp-2.gif");
buttons += emoticonButton("emoticon62", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic016demoji_14172461decoojp-2.gif"); 
buttons += emoticonButton("emoticon63", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic016demoji_339787decoojp-2.gif");
buttons += emoticonButton("emoticon64", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic016demoji_14672756decoojp-2.gif"); 
buttons += emoticonButton("emoticon65", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic017demoji_16060317decoojp-2.gif");
buttons += emoticonButton("emoticon66", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic016demoji_369894decoojp-2.gif"); 
buttons += emoticonButton("emoticon67", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic017demoji_17449173decoojp-2.gif");
buttons += emoticonButton("emoticon68", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic019demoji_11993130decoojp-2.gif"); 
buttons += emoticonButton("emoticon69", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic014demoji_14485061decoojp-2.gif");
buttons += emoticonButton("emoticon70", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic015demoji_13851438decoojp-2.gif"); 
buttons += emoticonButton("emoticon71", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic014demoji_405405decoojp-2.gif");
buttons += emoticonButton("emoticon72", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic015demoji_14906306decoojp-2.gif"); 
buttons += emoticonButton("emoticon73", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic015demoji_15865712decoojp-2.gif");
buttons += emoticonButton("emoticon74", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic011demoji_14200463decoojp-1.gif"); 
buttons += emoticonButton("emoticon75", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic012demoji_416972decoojp-1.gif");
buttons += emoticonButton("emoticon76", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic006demoji_13717984decoojp-1.gif"); 
buttons += emoticonButton("emoticon77", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic006demoji_15145136decoojp-1.gif");
buttons += emoticonButton("emoticon78", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic008demoji_13728279decoojp-1.gif"); 
buttons += emoticonButton("emoticon79", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic008demoji_16050140decoojp-1.gif");
buttons += emoticonButton("emoticon80", "http://i1124.photobucket.com/albums/l579/Nurul_Azreen/icon/pic008demoji_15701325decoojp-1.gif"); 

    buttons += separator();
    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);