// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Yuki22 (http://www.google.com) 

// FEATURES
// Works only in Compose modes
// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Yuki22 (http://www.google.com) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           yuki22
// @namespace      http://www.google.com
// @description    You can use emoticons in Blogger by yuki22
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";


buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/tomii1004.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny15.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny14.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny13.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny11.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny10.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny8.jpg");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny2.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/f6811a57964a5c3d715bbc4.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/ecb5c5b2d9ae8fbde73855c.jpg");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/eb57132ae31d7729c8c39c2.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/e9813bf9df4fb52aea6cfd5.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/e84df091c4b7f98ffcd88d7.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/e03ab468ddfd82a5a054423.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/df81837de83ebf46e48222c.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/deb4bf244cdcd2da48eb17b.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/d835a15ea19f781163d3cff.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/d3dc4bb8e526ce8fe8d4269.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/c5270c8c14302095f040a3a.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/b8824d699850a49be43315a.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/b86a291345625b7d6c7506a.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/b8ba7e7a6199cea61e299d0.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/a2011efcd99f289f9741837.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/12370005085272261.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1249623092944125.gif");
buttons += emoticonButton("", 
"http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1245168427687973.gif");
buttons += emoticonButton(":", 
"http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1243930907356461.gif");
buttons += emoticonButton("", 
"http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1243906234122893.gif");
buttons += emoticonButton("", 
"http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1239487637869199.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1237951325438913.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/94534070.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/93310850.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/70023128.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/68439660.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/62852534.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/58534277.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/57891970.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/45156668e92f520800fc4cc.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/41218931.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/38935790.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/22512743.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/16055996.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/200276abee0aec6753441a9.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/96594ffc035c76bff6a4898.jpg");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/07817ce6b1d594e38112600.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1478e4649d82b79153b6e74.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/853f7271cbc899107bec928.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/221l.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/131m.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/88ee8929e54dc909a8df9ca.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/78f556d840aaf7542d342af.jpg");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/60f93fae4d4bdd69fd46334.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/45fe8c2af243bfe3f04b77e.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/17d19075ee2cff490bdbaba.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/12e3899d27f64321a18f77a.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/9ecb0f7b963c467274e4ff1.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/9b79c6a3f79115882c04d1f.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/8e91274087d84c6321fe41c.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/8e46e3b341837280b7b255e.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/8d1ae199762dd6610c614e6.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/6c15ea68fdb705f5f8d7e6a.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/6bfd4609f05b1897a5c0fdd.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/4cf12e2ed118b29e1f70c3b.jpg");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/04f49d5cb17767006e3c3e7.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/3fa4a6a2fe0e0218e8da7df.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/3b7b1e1c98e3c49ef2f3717.jpg");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/3ae99c2e3a2edf84fdb99c0.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/2d0090edf60260eb7447321.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/0d610d5a228bbc9fcfab3c5.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/c2f5660b6cb4e371a3c9081642c08a7a.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/bcQeRe_220.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/20090623d10.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/20090623a07.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/16289adf4cff61c7bb313bbecdc7b2bc.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/69pele.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/60.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/40.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/15.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/13.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/8b94bbb4ef4df0252491bb20086676c0.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/7e20295a62f65cd55ce10181d2653b55.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/05.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/02.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/20090623d05.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1243813492-111884.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny9.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny6.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny4.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/funny3.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/ffd0492329ce1f53b7d32595c2501a21.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/16289adf4cff61c7bb313bbecdc7b2bc-1.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/22.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/6bfd4609f05b1897a5c0fdd3c23b5a48.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/162090c6542e46a5469acd5ae5959048.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/16937240232a1acd36cb1be1b7822566.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/d44ddafbbd5449fd73fb56987783e032.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/fccbbc6646a5527703817ac0068ce5ef.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/d75b4bd1cf8cd95b619066447e85046f.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/d8caef5a81b142c530d5c6e6e9be9a8e.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/caf983e50b1d4bf05ab9e524e71f0c52.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/c62a32ea25c460b22a6770b520d291ed.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/c7dcbf7ea5610b8c0c6cc95c05bd18bf.jpg");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/c6d8f41c0d90aef6a47a66a11f1d820a.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/bf4ea44dcb2c46d11f75b8cedcc6db67.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/a7eb076916157a16b270fa533945f94b.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/047049786472da2e3e1344824429cc69.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/739674347a8ef576f45d9a226cb4db8f1.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/94286558e53915a20e8a9b83495764c6.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/64018562ba0483602633db413dd54f5d.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/45063da000b732502e409093e79f48a6.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/8157bf9166bf653054a0e5e3d0013981.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/3540d1ec37edba74259d8242c12a0d9b.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/3483a9310b249a94e53137a44fcb25bc.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/485e6197e3af808b5dbce2472ebaeb02.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/453e94dbe03050378986da10a2bbb2de.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/444d12b463eb8ab843ecd3b1153e6c92.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/52add8f09feb5ae9f7aa4b4a69de09d0.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/61be9c3971f4c6956c0c85b4a8399da8.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/50a27d54c6f41a719cd6558b74a82015.jpg");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/9ef5b169d81f1d5484dbbb48d96f637c.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/7a9fcaaa81750e286f6c583365c73b30.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/4c29148dc51ba6c551ef471117af761a.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/3fa4a6a2fe0e0218e8da7df44c6dbe52.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/3bf152b54044885cb282f74cfb6eac71.jpg");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1f47909c2f320c99ab3f9077d5806447.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1e032ebfb717c976c2da708fb57d2bb6.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1c5e4a2515fdac228de7faf40b410ad0.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/1b0243ad079a85dc56fea6eced4de453.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/up10.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/right10.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/left10.gif");
buttons += emoticonButton("", "http://i1121.photobucket.com/albums/l509/witchomiyuki/emotion_smilies/down10.gif");



	
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