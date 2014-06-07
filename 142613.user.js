// Ini adalah hasil karya yg tinggal copas oleh @shofieu
// Terima kasih buat freesmileys.org yg udah mau dicopasin... wkwkwkwk

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Tuzki
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
                     
        buttons += emoticonButton("00", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-001.gif");
buttons += emoticonButton("01", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-002.gif");
buttons += emoticonButton("02", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-003.gif");
buttons += emoticonButton("03", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-004.gif");
buttons += emoticonButton("04", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-005.gif");
buttons += emoticonButton("05", "http://dhimaskasep.files.wordpress.com/2009/08/at_your_service1.gif");
buttons += emoticonButton("06", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-007.gif");
buttons += emoticonButton("07", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-008.gif");
buttons += emoticonButton("08", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-009.gif");
buttons += emoticonButton("09", "http://dhimaskasep.files.wordpress.com/2009/08/bugers1.gif");
buttons += emoticonButton("10", "http://dhimaskasep.files.wordpress.com/2009/08/crawling1.gif");
buttons += emoticonButton("11", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-012.gif");
buttons += emoticonButton("12", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-013.gif");
buttons += emoticonButton("13", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-014.gif");
buttons += emoticonButton("14", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-015.gif");
buttons += emoticonButton("15", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-016.gif");
buttons += emoticonButton("16", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-017.gif");
buttons += emoticonButton("17", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-018.gif");
buttons += emoticonButton("18", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-019.gif");
buttons += emoticonButton("19", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-020.gif");
buttons += emoticonButton("20", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-021.gif");
buttons += emoticonButton("21", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-022.gif");
buttons += emoticonButton("22", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-023.gif");
buttons += emoticonButton("23", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-024.gif");
buttons += emoticonButton("24", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-025.gif");
buttons += emoticonButton("25", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-026.gif");
buttons += emoticonButton("26", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-027.gif");
buttons += emoticonButton("27", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-028.gif");
buttons += emoticonButton("28", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-029.gif");
buttons += emoticonButton("29", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-030.gif");
buttons += emoticonButton("30", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-031.gif");
buttons += emoticonButton("31", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-032.gif");
buttons += emoticonButton("32", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-033.gif");
buttons += emoticonButton("33", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-043.gif");
buttons += emoticonButton("34", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-035.gif");
buttons += emoticonButton("35", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-036.gif");
buttons += emoticonButton("36", "http://dhimaskasep.files.wordpress.com/2009/08/tuzki_patpat_dance1.gif");
buttons += emoticonButton("37", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-038.gif");
buttons += emoticonButton("38", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-039.gif");
buttons += emoticonButton("39", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-040.gif");
buttons += emoticonButton("40", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-041.gif");
buttons += emoticonButton("41", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-042.gif");
buttons += emoticonButton("42", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-034.gif");
buttons += emoticonButton("43", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-044.gif");
buttons += emoticonButton("44", "http://dhimaskasep.files.wordpress.com/2009/08/trapped1.gif");
buttons += emoticonButton("45", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-046.gif");
buttons += emoticonButton("46", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-047.gif");
buttons += emoticonButton("47", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-048.gif");
buttons += emoticonButton("48", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-049.gif");
buttons += emoticonButton("49", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-050.gif");
buttons += emoticonButton("50", "http://dhimaskasep.files.wordpress.com/2009/08/nightmare1.gif");
buttons += emoticonButton("51", "http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-052.gif");
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

