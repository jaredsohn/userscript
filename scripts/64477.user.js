// Modified by Eun Sara Hyun (http://frankymuffins.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor
// ==UserScript==
// @name           Chirol White Smiley
// @namespace      http://frankymuffins.blogspot.com/)
// @description    Emoticons in Blogger Only by Eun Dear Diary.com (64full)
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
        	buttons += emoticonButton(":Tired:", "http://i37.tinypic.com/ih8hsl.jpg ");
        buttons += emoticonButton(":Xmas:", "http://i35.tinypic.com/2gvkf8x.jpg ");
        buttons += emoticonButton(":Skipping :", "http://i33.tinypic.com/am5ueq.jpg ");
        buttons += emoticonButton(":Snata :", "http://i36.tinypic.com/axil2r.jpg ");
        buttons += emoticonButton(":so hot :", "http://i33.tinypic.com/34zm7ba.jpg ");
        buttons += emoticonButton(":love u all :", "http://i33.tinypic.com/67s7qp.jpg ");
        buttons += emoticonButton(":write :", "http://i33.tinypic.com/f9fmet.jpg ");
        buttons += emoticonButton(":thinking :", "http://i33.tinypic.com/30j5su9.jpg ");
        buttons += emoticonButton(":lov u :", "http://i36.tinypic.com/1621b8h.jpg ");
        buttons += emoticonButton(":drawing :", "http://i36.tinypic.com/2a7cx9u.jpg");
        buttons += emoticonButton(":dance :", "http://i34.tinypic.com/2mrtm3q.jpg ");
        buttons += emoticonButton(":sing :", "http://i38.tinypic.com/2qtbay0.jpg ");
        buttons += emoticonButton(":nod :", "http://i33.tinypic.com/1z6xk69.jpg ");
        buttons += emoticonButton(":wave :", "http://i35.tinypic.com/kdle9z.jpg ");
        buttons += emoticonButton(":boy and girl swim :", "http://i36.tinypic.com/ezltp5.jpg ");
        buttons += emoticonButton(":insane about love :", "http://i38.tinypic.com/4ujsi8.jpg ");
        buttons += emoticonButton(":boy swims :", "http://i35.tinypic.com/2195aa0.jpg ");
        buttons += emoticonButton(":winking eye :", "http://i36.tinypic.com/j8mhwo.jpg");
        buttons += emoticonButton(":xx :", "http://i35.tinypic.com/2uf3erd.jpg");
        buttons += emoticonButton(":birthday :", "http://i33.tinypic.com/a9pbax.jpg");
buttons += emoticonButton(":sayapergidulu :", "http://i33.tinypic.com/2l9qwr9.jpg");
buttons += emoticonButton(":good :", "http://i34.tinypic.com/27zdu7t.jpg");
buttons += emoticonButton(":yahoo :", "http://i38.tinypic.com/2u4kf39.jpg");
buttons += emoticonButton(":ngantuknye :", "http://i36.tinypic.com/t7g484.jpg");
buttons += emoticonButton(":smile :", "http://i35.tinypic.com/2r78vt1.jpg");
buttons += emoticonButton(":yeah :", "http://i38.tinypic.com/x1zxae.jpg");
buttons += emoticonButton(":batuk :", "http://i38.tinypic.com/168iqdy.jpg");
buttons += emoticonButton(":alamak :", "http://i38.tinypic.com/2zs0lk8.jpg");
buttons += emoticonButton(":hehe :", "http://i38.tinypic.com/68dh5i.jpg");
        buttons += emoticonButton(":mana2 :", "http://i37.tinypic.com/27xos9j.jpg");
buttons += emoticonButton(":siup lilin :", "http://i35.tinypic.com/2rhrxoj.jpg");
buttons += emoticonButton(":nak panas :", "http://i33.tinypic.com/21zjtc.jpg");
buttons += emoticonButton(":ohw :", "http://i33.tinypic.com/25hcnk5.jpg");
buttons += emoticonButton(":oik :", "http://i38.tinypic.com/rtiy55.jpg");
buttons += emoticonButton(":pening :", "http://i34.tinypic.com/1fw80l.jpg");
buttons += emoticonButton(":should :", "http://i34.tinypic.com/wkixxc.jpg");
buttons += emoticonButton(":my fault :", "http://i34.tinypic.com/fu1ds6.jpg");
buttons += emoticonButton(":up n down :", "http://i38.tinypic.com/11mbakz.jpg");
        buttons += emoticonButton(":laugh :", "http://i33.tinypic.com/20pvnvb.jpg");
buttons += emoticonButton(":tundukgelak:", "http://i36.tinypic.com/124irlt.jpg");
buttons += emoticonButton(":hee :", "http://i37.tinypic.com/96cn0p.jpg");
buttons += emoticonButton(":love you :", "http://i36.tinypic.com/k2fnfc.jpg");
buttons += emoticonButton(":shame :", "http://i33.tinypic.com/5v3bzb.jpg");
buttons += emoticonButton(":smile2 :", "http://i33.tinypic.com/a31tz5.jpg");
buttons += emoticonButton(":peace :", "http://i36.tinypic.com/103y64w.jpg");
buttons += emoticonButton(":loceng :", "http://i38.tinypic.com/ztcjn8.jpg");
buttons += emoticonButton(":horee :", "http://i35.tinypic.com/34fci0x.jpg");
buttons += emoticonButton(":bom :", "http://i34.tinypic.com/20zts9f.jpg");
buttons += emoticonButton(":geram :", "http://i35.tinypic.com/xn96wi.jpg");
buttons += emoticonButton(":bunga api :", "http://i34.tinypic.com/e6ydrl.jpg");
buttons += emoticonButton(":lala :", "http://i36.tinypic.com/301it1t.jpg");
buttons += emoticonButton(":gelak :", "http://i34.tinypic.com/t6rpte.jpg");
buttons += emoticonButton(":what :", "http://i33.tinypic.com/2zzn7mp.jpg");
buttons += emoticonButton(":aigoo :", "http://i34.tinypic.com/29vsbk.jpg");
buttons += emoticonButton(":yoyo :", "http://i37.tinypic.com/33p8oy1.jpg");
buttons += emoticonButton(":sleepy :", "http://i38.tinypic.com/2rr145j.jpg");
buttons += emoticonButton(":aja-aja :", "http://i33.tinypic.com/1499mic.jpg");
buttons += emoticonButton(":cry :", "http://i33.tinypic.com/2r6d6wz.jpg");
buttons += emoticonButton(":arasoo :", "http://i36.tinypic.com/34erj7o.jpg");
buttons += emoticonButton(":pening2:", "http://i35.tinypic.com/6iskqw.jpg");
buttons += emoticonButton(":asleep :", "http://i36.tinypic.com/30kykw4.jpg");
buttons += emoticonButton(":birthday2 :", "http://i33.tinypic.com/w17i80.jpg");
buttons += emoticonButton(":stand :", "http://i35.tinypic.com/20jfmt5.jpg");
buttons += emoticonButton(":mabuk :", "http://i35.tinypic.com/20hkbah.jpg");
buttons += emoticonButton(":show :", "http://i34.tinypic.com/qohnv5.jpg");
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