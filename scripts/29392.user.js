// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by si tukang nyampah (http://benerantongsampah.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           tuzki emoticon for blogger
// @namespace      http://benerantongsampah.blogspot.com
// @description    onion head only
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
 
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	        buttons += emoticonButton("1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_001.gif" );
		buttons += emoticonButton("2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_002.gif" );
		buttons += emoticonButton("3",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_003.gif" );
		buttons += emoticonButton("4",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_004.gif" );
		buttons += emoticonButton("5",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_005.gif" );
		buttons += emoticonButton("6",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_006.gif" );
		buttons += emoticonButton("7",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_007.gif" );
		buttons += emoticonButton("8",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_008.gif" );
		buttons += emoticonButton("9",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_009.gif" );
		buttons += emoticonButton("10",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_010.gif" );
		buttons += emoticonButton("11",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_011.gif" );
		buttons += emoticonButton("12",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_012.gif" );
		buttons += emoticonButton("13",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_013.gif" );
		buttons += emoticonButton("14",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_014.gif" );
		buttons += emoticonButton("15",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_015.gif" );
		buttons += emoticonButton("16",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_016.gif" );
		buttons += emoticonButton("17",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_017.gif" );
		buttons += emoticonButton("18",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_018.gif" );
		buttons += emoticonButton("19",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_019.gif" );
		buttons += emoticonButton("20",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_020.gif" );
		buttons += emoticonButton("21",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_021.gif" );
		buttons += emoticonButton("22",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_022.gif" );
		buttons += emoticonButton("23",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_023.gif" );
		buttons += emoticonButton("24",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_024.gif" );
		buttons += emoticonButton("25",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_025.gif" );
		buttons += emoticonButton("26",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_026.gif" );
		buttons += emoticonButton("27",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_027.gif" );
		buttons += emoticonButton("28",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_028.gif" );
		buttons += emoticonButton("29",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_029.gif" );
		buttons += emoticonButton("30",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_030.gif" );
		buttons += emoticonButton("31",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_031.gif" );
		buttons += emoticonButton("32",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_032.gif" );
		buttons += emoticonButton("33",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_033.gif" );
		buttons += emoticonButton("34",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_034.gif" );
		buttons += emoticonButton("35",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_035.gif" );
		buttons += emoticonButton("36",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_036.gif" );
		buttons += emoticonButton("37",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_037.gif" );
		buttons += emoticonButton("38",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_038.gif" );
		buttons += emoticonButton("39",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/tosky/tuzki_039.gif" );
			
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


