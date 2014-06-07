// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Agung X-Zeg Indraguna (http://3gp-mobilemovie.com) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Onion Head Emoticons for Blogger
// @namespace      http://3gp-mobilemovie.com
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
	buttons += emoticonButton("001", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/118.gif");
	buttons += emoticonButton("002", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/117.gif");
	buttons += emoticonButton("003", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/116.gif");
	buttons += emoticonButton("004", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/98.gif");
	buttons += emoticonButton("005", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/115.gif");
	buttons += emoticonButton("006", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/114.gif");
	buttons += emoticonButton("007", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/113.gif");
	buttons += emoticonButton("008", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/112.gif");
	buttons += emoticonButton("009", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/111.gif");
	buttons += emoticonButton("010", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/110.gif");
	buttons += emoticonButton("011", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/109.gif");
	buttons += emoticonButton("012", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/108.gif");
	buttons += emoticonButton("013", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/107.gif");
	buttons += emoticonButton("014", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/106.gif");
	buttons += emoticonButton("015", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/105.gif");
	buttons += emoticonButton("016", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/104.gif");
	buttons += emoticonButton("017", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/103.gif");
	buttons += emoticonButton("018", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/102.gif");
	buttons += emoticonButton("019", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/101.gif");
	buttons += emoticonButton("020", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/100.gif");
	buttons += emoticonButton("021", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/99.gif");
	buttons += emoticonButton("022", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/97.gif");
        buttons += emoticonButton("023", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/96.gif");
        buttons += emoticonButton("024", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/95.gif");
        buttons += emoticonButton("025", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/94.gif");
        buttons += emoticonButton("026", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/93.gif");
        buttons += emoticonButton("027", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/92.gif");
        buttons += emoticonButton("028", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/91.gif");
        buttons += emoticonButton("029", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/90.gif");
        buttons += emoticonButton("030", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/89.gif");
        buttons += emoticonButton("031", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/88.gif");
        buttons += emoticonButton("032", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/87.gif");
        buttons += emoticonButton("033", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/86.gif");
        buttons += emoticonButton("034", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/85.gif");
        buttons += emoticonButton("035", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/84.gif");
        buttons += emoticonButton("036", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/83.gif");
        buttons += emoticonButton("037", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/82.gif");
        buttons += emoticonButton("038", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/81.gif");
        buttons += emoticonButton("039", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/80.gif");
        buttons += emoticonButton("040", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/79.gif");
        buttons += emoticonButton("041", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/78.gif");
        buttons += emoticonButton("042", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/77.gif");
        buttons += emoticonButton("043", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/76.gif");
        buttons += emoticonButton("044", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/75.gif");
        buttons += emoticonButton("045", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/74.gif");
        buttons += emoticonButton("046", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/73.gif");
        buttons += emoticonButton("047", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/72.gif");
        buttons += emoticonButton("048", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/71.gif");
        buttons += emoticonButton("049", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/70.gif");
        buttons += emoticonButton("050", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/69.gif");
        buttons += emoticonButton("051", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/68.gif");
        buttons += emoticonButton("052", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/67.gif");
        buttons += emoticonButton("053", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/66.gif");
        buttons += emoticonButton("054", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/65.gif");
        buttons += emoticonButton("055", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/64.gif");
        buttons += emoticonButton("056", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/63.gif");
        buttons += emoticonButton("057", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/62.gif");
        buttons += emoticonButton("058", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/61.gif");
        buttons += emoticonButton("059", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/60.gif");
        buttons += emoticonButton("060", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/59.gif");
        buttons += emoticonButton("061", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/58.gif");
        buttons += emoticonButton("062", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/57.gif");
        buttons += emoticonButton("063", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/56.gif");
        buttons += emoticonButton("064", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/55.gif");
        buttons += emoticonButton("065", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/54.gif");
        buttons += emoticonButton("066", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/53.gif");
        buttons += emoticonButton("067", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/52.gif");
        buttons += emoticonButton("068", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/51.gif");
        buttons += emoticonButton("069", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/50.gif");
        buttons += emoticonButton("070", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/49.gif");
        buttons += emoticonButton("071", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/48.gif");
        buttons += emoticonButton("072", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/47.gif");
        buttons += emoticonButton("073", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/46.gif");
        buttons += emoticonButton("074", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/45.gif");
        buttons += emoticonButton("075", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/44.gif");
        buttons += emoticonButton("076", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/43.gif");
        buttons += emoticonButton("077", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/42.gif");
        buttons += emoticonButton("078", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/41.gif");
        buttons += emoticonButton("079", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/40.gif");
        buttons += emoticonButton("080", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/39.gif");
        buttons += emoticonButton("081", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/38.gif");
        buttons += emoticonButton("082", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/37.gif");
        buttons += emoticonButton("083", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/36.gif");
        buttons += emoticonButton("084", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/35.gif");
        buttons += emoticonButton("085", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/34.gif");
        buttons += emoticonButton("086", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/33.gif");
        buttons += emoticonButton("087", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/32.gif");
        buttons += emoticonButton("088", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/31.gif");
        buttons += emoticonButton("089", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/30.gif");
        buttons += emoticonButton("090", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/29.gif");
        buttons += emoticonButton("091", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/28.gif");
        buttons += emoticonButton("092", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/27.gif");
        buttons += emoticonButton("093", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/26.gif");
        buttons += emoticonButton("094", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/25.gif");
        buttons += emoticonButton("095", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/24.gif");
        buttons += emoticonButton("096", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/23.gif");
        buttons += emoticonButton("097", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/22.gif");
        buttons += emoticonButton("098", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/21.gif");
        buttons += emoticonButton("099", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/20.gif");
        buttons += emoticonButton("100", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/19.gif");
        buttons += emoticonButton("101", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/18.gif");
        buttons += emoticonButton("102", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/17.gif");
        buttons += emoticonButton("103", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/16.gif");
        buttons += emoticonButton("104", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/15.gif");
        buttons += emoticonButton("105", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/14.gif");
        buttons += emoticonButton("106", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/13.gif");
        buttons += emoticonButton("107", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/12.gif");
        buttons += emoticonButton("108", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/11.gif");
        buttons += emoticonButton("109", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/10.gif");
        buttons += emoticonButton("110", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/9.gif");
        buttons += emoticonButton("111", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/8.gif");
        buttons += emoticonButton("112", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/7.gif");
        buttons += emoticonButton("113", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/6.gif");
        buttons += emoticonButton("114", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/5.gif");
        buttons += emoticonButton("115", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/4.gif");
        buttons += emoticonButton("116", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/3.gif");
        buttons += emoticonButton("117", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/2.gif");
        buttons += emoticonButton("118", "http://i1227.photobucket.com/albums/ee427/Indraguna2/Onion%20Head/1.gif");


	
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