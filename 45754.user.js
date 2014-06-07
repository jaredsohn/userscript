//-----------------------------------------------------------------------//
// Choco-milk-1 Smileys
// Trisya Aleesa Version
// Visit my blog at http://trisyaaleesasweetden.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : Unknown Sorry..

// ==UserScript==
// @name           choco-milk-1 Smileys (trisyaaleesasweetden.blogspot.com)
// ==/UserScript==

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

window.addEventListener("load", function(e) {

function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton(":choco-milk-1:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-1.gif");
	buttons += emoticonButton(":choco-milk-2:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-2.gif");
	buttons += emoticonButton(":choco-milk-3:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-3.gif");
	buttons += emoticonButton(":choco-milk-4:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-4.gif");
	buttons += emoticonButton(":choco-milk-5:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-5.gif");
	buttons += emoticonButton(":choco-milk-6:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-6.gif");
	buttons += emoticonButton(":choco-milk-7:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-7.gif");
	buttons += emoticonButton(":choco-milk-8:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-8.gif");
	buttons += emoticonButton(":choco-milk-9:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-9.gif");
	buttons += emoticonButton(":choco-milk-10:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-10.gif");
	buttons += emoticonButton(":choco-milk-11:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-11.gif");
	buttons += emoticonButton(":choco-milk-12:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-12.gif");
	buttons += emoticonButton(":choco-milk-13:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-13.gif");
	buttons += emoticonButton(":choco-milk-14:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-14.gif");
	buttons += emoticonButton(":choco-milk-15:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-15.gif");
	buttons += emoticonButton(":choco-milk-16:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-16.gif");
	buttons += emoticonButton(":choco-milk-17:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-17.gif");
	buttons += emoticonButton(":choco-milk-18:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-18.gif");
	buttons += emoticonButton(":choco-milk-19:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-19.gif");
	buttons += emoticonButton(":choco-milk-20:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-20.gif");
	buttons += emoticonButton(":choco-milk-21:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-21.gif");
	buttons += emoticonButton(":choco-milk-22:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-22.gif");
	buttons += emoticonButton(":choco-milk-23:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-23.gif");
	buttons += emoticonButton(":choco-milk-24:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-24.gif");
	buttons += emoticonButton(":choco-milk-25:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-25.gif");
	buttons += emoticonButton(":choco-milk-26:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-26.gif");
	buttons += emoticonButton(":choco-milk-27:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-27.gif");
	buttons += emoticonButton(":choco-milk-28:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-28.gif");
	buttons += emoticonButton(":choco-milk-29:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-29.gif");
	buttons += emoticonButton(":choco-milk-30:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-30.gif");
	buttons += emoticonButton(":choco-milk-31:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-31.gif");
	buttons += emoticonButton(":choco-milk-32:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-32.gif");
	buttons += emoticonButton(":choco-milk-33:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-33.gif");
	buttons += emoticonButton(":choco-milk-34:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-34.gif");
	buttons += emoticonButton(":choco-milk-35:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-35.gif");
	buttons += emoticonButton(":choco-milk-36:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-36.gif");
	buttons += emoticonButton(":choco-milk-37:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-37.gif");
	buttons += emoticonButton(":choco-milk-38:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-38.gif");
	buttons += emoticonButton(":choco-milk-39:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-39.gif");
	buttons += emoticonButton(":choco-milk-40:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-40.gif");
	buttons += emoticonButton(":choco-milk-41:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-41.gif");
	buttons += emoticonButton(":choco-milk-42:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-42.gif");
	buttons += emoticonButton(":choco-milk-43:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-43.gif");
	buttons += emoticonButton(":choco-milk-44:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-44.gif");
	buttons += emoticonButton(":choco-milk-45:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-45.gif");
	buttons += emoticonButton(":choco-milk-46:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-46.gif");
	buttons += emoticonButton(":choco-milk-47:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-47.gif");
	buttons += emoticonButton(":choco-milk-48:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-48.gif");
	buttons += emoticonButton(":choco-milk-49:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-49.gif");
	buttons += emoticonButton(":choco-milk-50:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-50.gif");
	buttons += emoticonButton(":choco-milk-51:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-51.gif");
	buttons += emoticonButton(":choco-milk-52:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-52.gif");
	buttons += emoticonButton(":choco-milk-53:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-53.gif");
	buttons += emoticonButton(":choco-milk-54:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-54.gif");
	buttons += emoticonButton(":choco-milk-55:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-55.gif");
	buttons += emoticonButton(":choco-milk-56:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-56.gif");
	buttons += emoticonButton(":choco-milk-57:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-57.gif");
	buttons += emoticonButton(":choco-milk-58:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-58.gif");
	buttons += emoticonButton(":choco-milk-59:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-59.gif");
	buttons += emoticonButton(":choco-milk-60:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-60.gif");
	buttons += emoticonButton(":choco-milk-61:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-61.gif");
	buttons += emoticonButton(":choco-milk-62:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-62.gif");
	buttons += emoticonButton(":choco-milk-63:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-63.gif");
	buttons += emoticonButton(":choco-milk-64:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-64.gif");
	buttons += emoticonButton(":choco-milk-65:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-65.gif");
	buttons += emoticonButton(":choco-milk-66:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-66.gif");
	buttons += emoticonButton(":choco-milk-67:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-67.gif");
	buttons += emoticonButton(":choco-milk-68:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-68.gif");
	buttons += emoticonButton(":choco-milk-69:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-69.gif");
	buttons += emoticonButton(":choco-milk-70:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-70.gif");
	buttons += emoticonButton(":choco-milk-71:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-71.gif");
	buttons += emoticonButton(":choco-milk-72:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-72.gif");
	buttons += emoticonButton(":choco-milk-73:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-73.gif");
	buttons += emoticonButton(":choco-milk-74:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-74.gif");
	buttons += emoticonButton(":choco-milk-75:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-75.gif");
	buttons += emoticonButton(":choco-milk-76:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-76.gif");
	buttons += emoticonButton(":choco-milk-77:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-77.gif");
	buttons += emoticonButton(":choco-milk-78:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-78.gif");
	buttons += emoticonButton(":choco-milk-79:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-79.gif");
	buttons += emoticonButton(":choco-milk-80:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-80.gif");
	buttons += emoticonButton(":choco-milk-81:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-81.gif");
	buttons += emoticonButton(":choco-milk-82:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-82.gif");
	buttons += emoticonButton(":choco-milk-83:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-83.gif");
	buttons += emoticonButton(":choco-milk-84:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-84.gif");
	buttons += emoticonButton(":choco-milk-85:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-85.gif");
	buttons += emoticonButton(":choco-milk-86:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-86.gif");
	buttons += emoticonButton(":choco-milk-87:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-87.gif");
	buttons += emoticonButton(":choco-milk-88:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-88.gif");
	buttons += emoticonButton(":choco-milk-89:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-89.gif");
	buttons += emoticonButton(":choco-milk-90:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-90.gif");
	buttons += emoticonButton(":choco-milk-91:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-91.gif");
	buttons += emoticonButton(":choco-milk-92:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-92.gif");
	buttons += emoticonButton(":choco-milk-93:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-93.gif");
	buttons += emoticonButton(":choco-milk-94:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-94.gif");
	buttons += emoticonButton(":choco-milk-95:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-95.gif");
	buttons += emoticonButton(":choco-milk-96:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-96.gif");
	buttons += emoticonButton(":choco-milk-97:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-97.gif");
	buttons += emoticonButton(":choco-milk-98:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-98.gif");
	buttons += emoticonButton(":choco-milk-99:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-99.gif");
	buttons += emoticonButton(":choco-milk-100:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-100.gif");
	buttons += emoticonButton(":choco-milk-101:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-101.gif");
	buttons += emoticonButton(":choco-milk-102:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-102.gif");
	buttons += emoticonButton(":choco-milk-103:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-103.gif");
	buttons += emoticonButton(":choco-milk-104:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-104.gif");
	buttons += emoticonButton(":choco-milk-105:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-105.gif");
	buttons += emoticonButton(":choco-milk-106:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-106.gif");
	buttons += emoticonButton(":choco-milk-107:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-107.gif");
	buttons += emoticonButton(":choco-milk-108:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-108.gif");
	buttons += emoticonButton(":choco-milk-109:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-109.gif");
	buttons += emoticonButton(":choco-milk-110:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-110.gif");
	buttons += emoticonButton(":choco-milk-111:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-111.gif");
	buttons += emoticonButton(":choco-milk-112:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-112.gif");
	buttons += emoticonButton(":choco-milk-113:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-113.gif");
	buttons += emoticonButton(":choco-milk-114:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-114.gif");
	buttons += emoticonButton(":choco-milk-115:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-115.gif");
	buttons += emoticonButton(":choco-milk-116:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-116.gif");
	buttons += emoticonButton(":choco-milk-117:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-117.gif");
	buttons += emoticonButton(":choco-milk-118:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-118.gif");
	buttons += emoticonButton(":choco-milk-119:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-119.gif");
	buttons += emoticonButton(":choco-milk-120:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-120.gif");
	buttons += emoticonButton(":choco-milk-121:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-121.gif");
	buttons += emoticonButton(":choco-milk-122:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-122.gif");
	buttons += emoticonButton(":choco-milk-123:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-123.gif");
	buttons += emoticonButton(":choco-milk-124:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-124.gif");
	buttons += emoticonButton(":choco-milk-125:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-125.gif");
	buttons += emoticonButton(":choco-milk-126:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-126.gif");
	buttons += emoticonButton(":choco-milk-127:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-127.gif");
	buttons += emoticonButton(":choco-milk-128:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-128.gif");
	buttons += emoticonButton(":choco-milk-129:", "http://i682.photobucket.com/albums/vv181/trisya_aleesa2/choco-milk-129.gif");
	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);

    
