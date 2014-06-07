// Modified by Eun Sara Hyun (http://frankymuffins.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Aminegif Smiley
// @namespace      http://frankymuffins.blogspot.com/
// @description    Emoticons in Blogger Only by Eun Dear Diary.com (50+)
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
        buttons += emoticonButton(":Happy :", "http://www.addemoticons.com/gif/a/addemoticons1.gif ");
        buttons += emoticonButton(":love :", "http://www.addemoticons.com/gif/a/addemoticons2.gif ");
        	buttons += emoticonButton(":shy :", "http://www.addemoticons.com/gif/a/addemoticons3.gif ");
        buttons += emoticonButton(":speed :", "http://www.addemoticons.com/gif/a/addemoticons4.gif ");
        buttons += emoticonButton(":fabulous :", "http://www.addemoticons.com/gif/a/addemoticons6.gif ");
        buttons += emoticonButton(":heavenlove :", "http://www.addemoticons.com/gif/a/addemoticons7.gif ");
        buttons += emoticonButton(":princess:", "http://www.addemoticons.com/gif/a/addemoticons8.gif ");
        buttons += emoticonButton(":prine :", "http://www.addemoticons.com/gif/a/addemoticons9.gif ");
        	buttons += emoticonButton(":boy :", "http://www.addemoticons.com/gif/a/addemoticons11.gif ");
        buttons += emoticonButton(":girl :", "http://www.addemoticons.com/gif/a/addemoticons12.gif ");
        buttons += emoticonButton(":drinkleft :", "http://www.addemoticons.com/gif/a/addemoticons13.gif ");
        buttons += emoticonButton(":drinkright :", "http://www.addemoticons.com/gif/a/addemoticons14.gif ");
        buttons += emoticonButton(":bajukorea :", "http://www.addemoticons.com/gif/a/addemoticons15.gif ");
        buttons += emoticonButton(":banyakduit :", "http://www.addemoticons.com/gif/a/addemoticons23.gif ");
        	buttons += emoticonButton(":keretamewah :", "http://www.addemoticons.com/gif/a/addemoticons25.gif");
        buttons += emoticonButton(":orangsalji :", " http://www.addemoticons.com/gif/a/addemoticons29.gif");
        buttons += emoticonButton(":queen :", "http://www.addemoticons.com/gif/a/addemoticons30.gif ");
        buttons += emoticonButton(":boyu :", "http://www.addemoticons.com/gif/a/addemoticons41.gif ");
        buttons += emoticonButton(":beoul :", "http://www.addemoticons.com/gif/a/addemoticons44.gif ");
        buttons += emoticonButton(":banyakhadiah :", "http://www.addemoticons.com/gif/a/addemoticons48.gif ");
        	buttons += emoticonButton(":boyskater :", "http://www.addemoticons.com/gif/a/addemoticons51.gif ");
        buttons += emoticonButton(":girlskater :", "http://www.addemoticons.com/gif/a/addemoticons52.gif ");
        buttons += emoticonButton(":sejuk :", "http://www.addemoticons.com/gif/a/addemoticons57.gif ");
        buttons += emoticonButton(":window :", " http://www.addemoticons.com/gif/a/addemoticons62.gif");
        buttons += emoticonButton(":romantic1 :", "http://www.addemoticons.com/gif/a/addemoticons71.gif ");
        buttons += emoticonButton(":romantic2 :", "http://www.addemoticons.com/gif/a/addemoticons72.gif ");
        	buttons += emoticonButton(":lovebear :", "http://www.addemoticons.com/gif/a/addemoticons73.gif ");
        buttons += emoticonButton(":makelaugh :", "http://www.addemoticons.com/gif/a/addemoticons75.gif ");
        buttons += emoticonButton(":sanagatsejuk :", "http://www.addemoticons.com/gif/a/addemoticons91.gif ");
        buttons += emoticonButton(":meet :", " http://www.addemoticons.com/gif/a/addemoticons96.gif");
        buttons += emoticonButton(":tv and books :", "http://www.addemoticons.com/gif/a/addemoticons100.gif ");
        buttons += emoticonButton(": sejukk:", "http://www.addemoticons.com/gif/a/addemoticons102.gif ");    
        	buttons += emoticonButton(":mandi :", "http://www.addemoticons.com/gif/a/addemoticons103.gif ");
        buttons += emoticonButton(":juru :", "http://www.addemoticons.com/gif/a/addemoticons107.gif ");
        buttons += emoticonButton(":w-inds :", "http://www.addemoticons.com/gif/a/addemoticons115.gif ");
        buttons += emoticonButton(": readbook:", " http://www.addemoticons.com/gif/a/addemoticons116.gif");
        buttons += emoticonButton(":sleepy :", "http://www.addemoticons.com/gif/a/addemoticons119.gif ");
        buttons += emoticonButton(":wave :", "http://www.addemoticons.com/gif/a/addemoticons120.gif "); 
        	buttons += emoticonButton(":sediamakanan :", "http://www.addemoticons.com/gif/a/addemoticons127.gif ");
        buttons += emoticonButton(":perutbucik :", " http://www.addemoticons.com/gif/a/addemoticons152.gif");
        buttons += emoticonButton(":aigoo :", "http://www.addemoticons.com/gif/a/addemoticons154.gif ");
        buttons += emoticonButton(":read :", " http://www.addemoticons.com/gif/a/addemoticons162.gif");
        buttons += emoticonButton(":coolboys :", "http://www.addemoticons.com/gif/a/addemoticons166.gif ");
        buttons += emoticonButton(":biscut :", "http://www.addemoticons.com/gif/a/addemoticons169.gif ");
        	buttons += emoticonButton(":song :", " http://www.addemoticons.com/gif/a/addemoticons183.gif");
        buttons += emoticonButton(":camera :", "http://www.addemoticons.com/gif/a/addemoticons184.gif ");
        buttons += emoticonButton(": syecomel:", "http://www.addemoticons.com/gif/a/addemoticons189.gif ");
        buttons += emoticonButton(":latihan :", "http://www.addemoticons.com/gif/a/addemoticons190.gif ");
        buttons += emoticonButton(":makan ais-krim :", "http://www.addemoticons.com/gif/a/addemoticons222.gif ");
        buttons += emoticonButton(":wow :", "http://www.addemoticons.com/gif/a/addemoticons257.gif ");
        	buttons += emoticonButton(":talk :", "http://www.addemoticons.com/gif/a/addemoticons265.gif ");
        buttons += emoticonButton(":best :", "http://www.addemoticons.com/gif/a/addemoticons271.gif ");
        buttons += emoticonButton(":selam :", "http://www.addemoticons.com/gif/a/addemoticons260.gif ");
        buttons += emoticonButton(": sad:", "http://www.addemoticons.com/gif/a/addemoticons300.gif ");
        buttons += emoticonButton(": dance:", "http://www.addemoticons.com/gif/a/addemoticons324.gif ");
        buttons += emoticonButton(":studyhard :", " http://www.addemoticons.com/gif/a/addemoticons404.gif");
        	buttons += emoticonButton(":dance2 :", "http://www.addemoticons.com/gif/a/addemoticons440.gif ");
        buttons += emoticonButton(":iuji :", "http://www.addemoticons.com/gif/a/addemoticons444.gif ");
        buttons += emoticonButton(":jahit :", " http://www.addemoticons.com/gif/a/addemoticons482.gif");
        buttons += emoticonButton(":sing :", "http://www.addemoticons.com/gif/a/addemoticons522.gif ");
        buttons += emoticonButton(":hotdrink :", "http://www.addemoticons.com/gif/a/addemoticons569.gif ");
        	buttons += emoticonButton(": getballon:", "http://www.addemoticons.com/gif/a/addemoticons578.gif ");
        buttons += emoticonButton(":bye :", "http://www.addemoticons.com/gif/a/addemoticons596.gif ");
        buttons += emoticonButton(":cuteye :", "http://www.addemoticons.com/gif/a/addemoticons601.gif ");
        buttons += emoticonButton(":learn2 :", " http://www.addemoticons.com/gif/a/addemoticons630.gif");
        buttons += emoticonButton(":cry :", "http://www.addemoticons.com/gif/a/addemoticons646.gif ");
        buttons += emoticonButton(":costom :", "http://www.addemoticons.com/gif/a/addemoticons724.gif ");
        buttons += emoticonButton(":skating :", " http://www.addemoticons.com/gif/a/addemoticons849.gif");
        buttons += emoticonButton(":violin :", "http://www.addemoticons.com/gif/a/addemoticons943.gif ");
        buttons += emoticonButton(":saranghae :", "http://www.addemoticons.com/gif/a/addemoticons953.gif ");
        buttons += emoticonButton(": jual icecream:", "http://www.addemoticons.com/gif/a/addemoticons941.gif ");
        buttons += emoticonButton(": makan:", "http://www.addemoticons.com/gif/a/addemoticons992.gif ");
        buttons += emoticonButton(":sibuk :", " http://www.addemoticons.com/gif/a/addemoticons979.gif");
        buttons += emoticonButton(":hujan :", "http://www.addemoticons.com/gif/a/addemoticons1076.gif ");
        buttons += emoticonButton(":surf :", " http://www.addemoticons.com/gif/a/addemoticons1371.gif");
        buttons += emoticonButton(":ice cream :", "http://www.addemoticons.com/gif/a/addemoticons1388.gif ");
        buttons += emoticonButton(":sleepy2 :", " http://www.addemoticons.com/gif/a/addemoticons1536.gif");
        buttons += emoticonButton(":Oishie:(", "http://i805.photobucket.com/albums/yy336/Sarahyun_bucket/anigif-2.gif");








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