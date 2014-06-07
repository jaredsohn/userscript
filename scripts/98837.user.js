// Modified by Agung X-Zeg Indraguna (http://agung-indraguna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// Onion Head 
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Onion Head Smiley
// @namespace      http://agung-indraguna.blogspot.com
// @description    Emoticons in Blogger Only by FrankyMuffins 
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
        buttons += emoticonButton(":91:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/91.gif");
	buttons += emoticonButton(":90:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/90.gif");
        buttons += emoticonButton(":89:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/89.gif");
	buttons += emoticonButton(":88:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/88.gif");
	buttons += emoticonButton(":87:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/87.gif");
	buttons += emoticonButton(":86:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/86.gif");
	buttons += emoticonButton(":85:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/85.gif");
	buttons += emoticonButton(":84:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/84.gif");
	buttons += emoticonButton(":83:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/83.gif");
	buttons += emoticonButton(":82:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/82.gif");
	buttons += emoticonButton(":81:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/81.gif");
	buttons += emoticonButton(":80:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/80.gif");
	buttons += emoticonButton(":79:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/79.gif");
	buttons += emoticonButton(":78:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/78.gif");
	buttons += emoticonButton(":77:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/77.gif");
        buttons += emoticonButton(":76:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/76.gif");
	buttons += emoticonButton(":75:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/75.gif");
        buttons += emoticonButton(":74:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/74.gif");
        buttons += emoticonButton(":73:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/73.gif");
        buttons += emoticonButton(":72:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/72.gif");
        buttons += emoticonButton(":71:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/71.gif");
	buttons += emoticonButton(":70:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/70.gif");
        buttons += emoticonButton(":69:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/69.gif");
	buttons += emoticonButton(":68:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/68.gif");
	buttons += emoticonButton(":67:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/67.gif");
        buttons += emoticonButton(":66:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/66.gif");
	buttons += emoticonButton(":65:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/65.gif");
	buttons += emoticonButton(":64:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/64.gif");
	buttons += emoticonButton(":63:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/63.gif");
	buttons += emoticonButton(":62:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/62.gif");
        buttons += emoticonButton(":61:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/61.gif");
        buttons += emoticonButton(":60:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/60.gif");
        buttons += emoticonButton(":59:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/59.gif");
        buttons += emoticonButton(":58:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/58.gif");
	buttons += emoticonButton(":55:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/57.gif");
	buttons += emoticonButton(":56:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/56.gif");
	buttons += emoticonButton(":55:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/55.gif");
        buttons += emoticonButton(":54:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/54.gif");
	buttons += emoticonButton(":53:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/53.gif");
	buttons += emoticonButton(":52:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/52.gif");
        buttons += emoticonButton(":51:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/51.gif");
	buttons += emoticonButton(":50:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/50.gif");
	buttons += emoticonButton(":49:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/49.gif");
        buttons += emoticonButton(":48:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/48.gif");
	buttons += emoticonButton(":47:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/47.gif");
	buttons += emoticonButton(":46:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/46.gif");
	buttons += emoticonButton(":45:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/45.gif");
        buttons += emoticonButton(":44:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/44.gif");
	buttons += emoticonButton(":43:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/43.gif");
	buttons += emoticonButton(":42:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/42.gif");
	buttons += emoticonButton(":41:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/41.gif");
	buttons += emoticonButton(":40:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/40.gif");
	buttons += emoticonButton(":39:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/39.gif");
        buttons += emoticonButton(":38:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/38.gif");
	buttons += emoticonButton(":37:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/37.gif");
	buttons += emoticonButton(":36:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/36.gif");
	buttons += emoticonButton(":35:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/35.gif");
        buttons += emoticonButton(":34:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/34.gif");
	buttons += emoticonButton(":33:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/33.gif");
        buttons += emoticonButton(":32:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/32.gif");
	buttons += emoticonButton(":31:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/31.gif");
        buttons += emoticonButton(":30:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/30.gif");
	buttons += emoticonButton(":29:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/29.gif");
        buttons += emoticonButton(":28:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/28.gif");
	buttons += emoticonButton(":27:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/27.gif");
        buttons += emoticonButton(":26:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/26.gif");
	buttons += emoticonButton(":25:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/25.gif");
        buttons += emoticonButton(":24:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/24.gif");
	buttons += emoticonButton(":23:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/23.gif");
	buttons += emoticonButton(":22:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/22.gif");
	buttons += emoticonButton(":21:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/21.gif");
        buttons += emoticonButton(":20:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/20.gif");
	buttons += emoticonButton(":19:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/19.gif");
        buttons += emoticonButton(":18:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/18.gif");
	buttons += emoticonButton(":17:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/17.gif");
        buttons += emoticonButton(":16:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/16.gif");
	buttons += emoticonButton(":15:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/15.gif");
	buttons += emoticonButton(":14:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/14.gif");
        buttons += emoticonButton(":13:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/13.gif");
        buttons += emoticonButton(":12:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/12.gif");
	buttons += emoticonButton(":11:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/11.gif");
        buttons += emoticonButton(":10:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/10.gif");
	buttons += emoticonButton(":09:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/9.gif");
        buttons += emoticonButton(":08:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/8.gif");
        buttons += emoticonButton(":07:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/7.gif");
	buttons += emoticonButton(":06:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/6.gif");
	buttons += emoticonButton(":05:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/5.gif");
        buttons += emoticonButton(":04:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/4.gif");
	buttons += emoticonButton(":03:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/3.gif");
        buttons += emoticonButton(":02:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/2.gif");
	buttons += emoticonButton(":01:", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/1.gif");

   
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