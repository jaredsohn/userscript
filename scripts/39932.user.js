// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/)
// Wolverine script modified by CataCC (http://locdedatcucapul.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Smooochies.
// @namespace      http://locdedatcucapul.blogspot.com/2007/11/script-pentru-inserarea-de-emoticoane.html/
// @description    Random emoticons for blog.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// @include	   *
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/cookie.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/cried.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/cry-4.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/emo.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/emoboy.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/female.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/fish-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/flan.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/flower.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/girl.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/good.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/hi.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/i-heart-you.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/kappamakisushi.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/kiss.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/lemon.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/lightbulb.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/linkme.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/lipstick.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/lol-2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/lollypop.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/love-2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/male.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/milk.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/movie.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/mushroom.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/music.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/myblog.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/mysite.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/neutral.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/ninja.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/onigiri.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/pancake.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/pencil.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/pewp.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/punkgirl.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/roesushi.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/salmonsushi.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/shocked-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/shout.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/skateboard.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/snowflake.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/snowman.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/stamp.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/stamp-m.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/strawberrymilk.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/sun.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/tamagosushi.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/thanks.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/watermelon.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/wtf-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/you.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/yourock.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/angry-4.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/confused-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/cry-3.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/dance.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/dizzy-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/glare.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/happy-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/lol-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/sweat.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/wave.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/angry-3.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/biggrin.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/boiling.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/confused.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/cry-2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/dead-2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/devil.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/dizzy.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/duh.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/fish.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/flip.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/frown-2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/getsad.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/grr-2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/heartbeat.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/lol.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/look.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/mixedup.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/mmm.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/no.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/nod.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/puzzled.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/rain.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/rofl.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/roll.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/sad-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/shocked.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/sleepy.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/smile-2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/speak.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/spin.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/stressed.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/study.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/sweatdrop.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/tongue.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/wink-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/woot-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/worried.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/brokenheart.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/heart-2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/030E364545557C4C244CAF80E7AFE538.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/04280F52979E8106F5CC80FD223AF58C.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/35D3280FC8259F2DF4BD75B440D3AA02.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/3BEC85C582DB577504091E0514C48249.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/5275DD6E18D81404D803344A7874F063.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/5D64C54CFEDA32E7F5F126C6B90D93DE.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/76D98E50BB7A981CE77F6D792EEA60EB.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/7D43275BD19881594A3C87F4222CA4C9.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/804979C877D93DE3C2E3482619C1227B.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/82A2721CDA06E07ECB00D70AD1C921DE.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/95B3938FC03132386FC55C4191D0DE77.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/A5BEBE2A84197BF4821C434DA21FD2AD.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/AAD31490B0107989D686224D9E1FDCDE.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/B78544608EEB95BE6EDD464CADE7B69E.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/C262BA0F358BDC63913949A510873BC1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/CFD7A347B98BADBE8912D9D1563DD2FE.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/D1E3A85EA9F40989B558CC37DEA5D227.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/E1A9838C4835E73C54DD6AFED8E06B4D.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/E9C45F526D1FD65F62D8492B6B0EEA9A.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/F45560F4A9454F08481B06A466A1C57D.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/angry-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/blush-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/bummed-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/cry-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/dead-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/eh-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/frown-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/grawr-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/grin-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/grr-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/heart-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/hehe-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/love-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/meh-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/smile-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/smile2-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/smile3-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/sneaky-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/tongue1-1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/tongue2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/wink.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/wtf.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/yawn.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/angry.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/blush.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/bummed.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/cry.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/dead.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/eh.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/frown.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/grawr.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/grin.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/grr.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/heart.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/hehe.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/love.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/meh.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/smile.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/smile2.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/smile3.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/sneaky.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/tongue1.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/AddEmoticons1271.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/AddEmoticons1272.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/AddEmoticons1273.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/AddEmoticons1274.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/AddEmoticons1275.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/AddEmoticons1276.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/AddEmoticons1277.gif");
	buttons += emoticonButton("ymps", "http://i68.photobucket.com/albums/i32/yvetskie/Emoticons/AddEmoticons1278.gif");


    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\"  />\";})();ButtonMouseDown(this);'><img src='" + url + "' ></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);