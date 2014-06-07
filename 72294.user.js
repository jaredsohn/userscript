// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           japanese Emoticons for Blogger
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger. by Blogger-Emoticon.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br/>";
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/kirakira3-p.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/mobile-pink.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/n-asease.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/n-bikkuri.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/n-heart.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/onpu.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/onpu4.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/star3.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/tenki-ame.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/2cwpr2s.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/tenki-kaminari.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/tenki-hare.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/246.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/401.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/1861.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/40386.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/99174.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/1823139giuazu2ga4.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/bikkuri.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/022gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/2ef9053203bc08dbaf7846511708b9fa.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/32.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/1706.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/cdee119d66755828fbb299e70630b23b.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/pinkarrow.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/pinksparkLe.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/heartcurL.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/08464b115216c8f4566c9bc9eff2f322.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/pinkypetaL-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/15.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/46eb2489d084345dea4d2593bbc131cb.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/fd8e8432293a7499157d32c651c8d688.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/emo16gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/emo16gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/29yktnbjpggif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/21omr6jpggif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/119gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/118gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/ejpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/creambunny_mp3gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/creambunny_cupgif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/020gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/15-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/10i9natjpggif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/13-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/34ecfbajpggif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/i_1009gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/e_search-1gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/emo20gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thmisc-6jpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/041gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/12-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/22.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/14-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/gjpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/heart3bgif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/misc-17jpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Photobucket.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/071-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/045-2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/063-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/065-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/066.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/070-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/074-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/075-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/087-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/086-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/085-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/090-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/121-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/019.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/058-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/080.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/094-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/095-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/099.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/060.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/135.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/134.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/088.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/104.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/107.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/115.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/023-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/038.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/026.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/034.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/043.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/046.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/047.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/049.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/055.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/057-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/051.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/036-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/133.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/054.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/12-2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/064.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/106.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/th2damuf9.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/dizzzzzy.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/pictoworld_name_jp_38.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/point-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/themo17.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/themo19.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thf5f449323c63efbea5f32984d4840173.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thmisc-4.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thmisc-28.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thmisc-30.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thwave.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/20090623c10.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/1231456430-220881.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/z2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/z1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/a27.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/a124.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/a153.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/x43.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/hi.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/tsk.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/r9lfsp.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/inqsdk.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/jaier5.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/fd8y06.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/grrr.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/huh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/35jebgp.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/duh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/eg3k7o.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-12-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/x28.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/aous1u.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Animation39.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Animation16.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/a55.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/2qxrith.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/1zlr5ad.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/x61.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/x45-1.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/x38.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/x29.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/x31.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/x34.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thsad-1.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thshygry.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/x27.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/hihi.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/themo8.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/themo12-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/themoticon-9.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/th200fzue.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/themo12.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thadp9uv.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/th27xnn0k.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/th2igf70z.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/sob.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/th2i0947k.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/50-1.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-4.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-8.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-6.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-4.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/2lnxv2d.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/131.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-12.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-9.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-9-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-7.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Untitled-2.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/th2ikr62wjpg-1.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/emo11gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/shy.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Animation31gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/emo10gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/Animation22gif.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/70jpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/9-2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/11.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/mad.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/86jpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/50jpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/thadi62xjpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/6-3.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/57jpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/blogger%20emoticons/10jpg.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/4.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/7.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/24.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/30-2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/30-2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/6111.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/ba042.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/ba041.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/cake.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i50.photobucket.com/albums/f333/sarahkawaii/loading1.gif");
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
