// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Nia (http://michaela-nathania.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Onion Head Emoticon
// @namespace      http://michaela-nathania.blogspot.com
// @description    You can use emoticons in Blogger by michaela-nathania.blogspot.com. Follow my blog for the notification of new script
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";

buttons += emoticonButton("admire-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/admire-onion-head-emoticon.gif");
buttons += emoticonButton("admire2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/admire2-onion-head-emoticon.gif");
buttons += emoticonButton("ahaaah-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/ahaaah-onion-head-emoticon.gif");
buttons += emoticonButton("angel1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/angel1-onion-head-emoticon.gif");
buttons += emoticonButton("angel2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/angel2-onion-head-emoticon.gif");
buttons += emoticonButton("bad-atmosphere-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/bad-atmosphere-onion-head-emoticon.gif");
buttons += emoticonButton("beaten-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/beaten-onion-head-emoticon.gif");
buttons += emoticonButton("beg-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/beg-onion-head-emoticon.gif");
buttons += emoticonButton("big-eye-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/big-eye-onion-head-emoticon.gif");
buttons += emoticonButton("bike-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/bike-onion-head-emoticon.gif");
buttons += emoticonButton("bird-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/bird-onion-head-emoticon.gif");
buttons += emoticonButton("bled1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/bled1-onion-head-emoticon.gif");
buttons += emoticonButton("bled2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/bled2-onion-head-emoticon.gif");
buttons += emoticonButton("bleeding-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/bleeding-onion-head-emoticon.gif");
buttons += emoticonButton("blocked-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/blocked-onion-head-emoticon.gif");
buttons += emoticonButton("bsod-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/bsod-onion-head-emoticon.gif");
buttons += emoticonButton("bye1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/bye1-onion-head-emoticon.gif");
buttons += emoticonButton("bye2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/bye2-onion-head-emoticon.gif");
buttons += emoticonButton("cheer1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/cheer1-onion-head-emoticon.gif");
buttons += emoticonButton("cheer2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/cheer2-onion-head-emoticon.gif");
buttons += emoticonButton("cheer3-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/cheer3-onion-head-emoticon.gif");
buttons += emoticonButton("confused-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/confused-onion-head-emoticon.gif");
buttons += emoticonButton("congrats-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/congrats-onion-head-emoticon.gif");
buttons += emoticonButton("cool-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/cool-onion-head-emoticon.gif");
buttons += emoticonButton("cruch-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/cruch-onion-head-emoticon.gif");
buttons += emoticonButton("crying1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/crying1-onion-head-emoticon.gif");
buttons += emoticonButton("crying2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/crying2-onion-head-emoticon.gif");
buttons += emoticonButton("crying3-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/crying3-onion-head-emoticon.gif");
buttons += emoticonButton("cute1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/cute1-onion-head-emoticon.gif");
buttons += emoticonButton("cute2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/cute2-onion-head-emoticon.gif");
buttons += emoticonButton("dead-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/dead-onion-head-emoticon.gif");
buttons += emoticonButton("depressed1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/depressed1-onion-head-emoticon.gif");
buttons += emoticonButton("depressed2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/depressed2-onion-head-emoticon.gif");
buttons += emoticonButton("desperate1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/desperate1-onion-head-emoticon.gif");
buttons += emoticonButton("desperate2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/desperate2-onion-head-emoticon.gif");
buttons += emoticonButton("dong-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/dong-onion-head-emoticon.gif");
buttons += emoticonButton("dreaming-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/dreaming-onion-head-emoticon.gif");
buttons += emoticonButton("dying-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/dying-onion-head-emoticon.gif");
buttons += emoticonButton("eaten-alive-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/eaten-alive-onion-head-emoticon.gif");
buttons += emoticonButton("eating-me-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/eating-me-onion-head-emoticon.gif");
buttons += emoticonButton("embarrassed1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/embarrassed1-onion-head-emoticon.gif");
buttons += emoticonButton("embarrassed2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/embarrassed2-onion-head-emoticon.gif");
buttons += emoticonButton("embarrassed3-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/embarrassed3-onion-head-emoticon.gif");
buttons += emoticonButton("embarrassed4-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/embarrassed4-onion-head-emoticon.gif");
buttons += emoticonButton("evil-smile-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/evil-smile-onion-head-emoticon.gif");
buttons += emoticonButton("expulsion-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/expulsion-onion-head-emoticon.gif");
buttons += emoticonButton("falling-asleep-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/falling-asleep-onion-head-emoticon.gif");
buttons += emoticonButton("freezing-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/freezing-onion-head-emoticon.gif");
buttons += emoticonButton("frozen-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/frozen-onion-head-emoticon.gif");
buttons += emoticonButton("full-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/full-onion-head-emoticon.gif");
buttons += emoticonButton("ghost-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/ghost-onion-head-emoticon.gif");
buttons += emoticonButton("good-job-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/good-job-onion-head-emoticon.gif");
buttons += emoticonButton("good-luck-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/good-luck-onion-head-emoticon.gif");
buttons += emoticonButton("happy-birth-day1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/happy-birth-day1-onion-head-emoticon.gif");
buttons += emoticonButton("happy-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/happy-onion-head-emoticon.gif");
buttons += emoticonButton("hate-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/hate-onion-head-emoticon.gif");
buttons += emoticonButton("hehe-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/hehe-onion-head-emoticon.gif");
buttons += emoticonButton("hell-yes-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/hell-yes-onion-head-emoticon.gif");
buttons += emoticonButton("help-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/help-onion-head-emoticon.gif");
buttons += emoticonButton("hi-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/hi-onion-head-emoticon.gif");
buttons += emoticonButton("hot1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/hot1-onion-head-emoticon.gif");
buttons += emoticonButton("hot2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/hot2-onion-head-emoticon.gif");
buttons += emoticonButton("hypnosis-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/hypnosis-onion-head-emoticon.gif");
buttons += emoticonButton("ill-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/ill-onion-head-emoticon.gif");
buttons += emoticonButton("info-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/info-onion-head-emoticon.gif");
buttons += emoticonButton("innocent-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/innocent-onion-head-emoticon.gif");
buttons += emoticonButton("kick-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/kick-onion-head-emoticon.gif");
buttons += emoticonButton("kicked1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/kicked1-onion-head-emoticon.gif");
buttons += emoticonButton("kicked2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/kicked2-onion-head-emoticon.gif");
buttons += emoticonButton("lie-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/lie-onion-head-emoticon.gif");
buttons += emoticonButton("lol1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/lol1-onion-head-emoticon.gif");
buttons += emoticonButton("lol2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/lol2-onion-head-emoticon.gif");
buttons += emoticonButton("lonely-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/lonely-onion-head-emoticon.gif");
buttons += emoticonButton("love-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/love-onion-head-emoticon.gif");
buttons += emoticonButton("meh-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/meh-onion-head-emoticon.gif");
buttons += emoticonButton("nonono-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/nonono-onion-head-emoticon.gif");
buttons += emoticonButton("noooo-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/noooo-onion-head-emoticon.gif");
buttons += emoticonButton("not-listening-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/not-listening-onion-head-emoticon.gif");
buttons += emoticonButton("objection-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/objection-onion-head-emoticon.gif");
buttons += emoticonButton("oh-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/oh-onion-head-emoticon.gif");
buttons += emoticonButton("payup-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/payup-onion-head-emoticon.gif");
buttons += emoticonButton("pff1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/pff1-onion-head-emoticon.gif");
buttons += emoticonButton("pff2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/pff2-onion-head-emoticon.gif");
buttons += emoticonButton("pointing-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/pointing-onion-head-emoticon.gif");
buttons += emoticonButton("pretty-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/pretty-onion-head-emoticon.gif");
buttons += emoticonButton("punch-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/punch-onion-head-emoticon.gif");
buttons += emoticonButton("push-up-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/push-up-onion-head-emoticon.gif");
buttons += emoticonButton("relax1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/relax1-onion-head-emoticon.gif");
buttons += emoticonButton("relax2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/relax2-onion-head-emoticon.gif");
buttons += emoticonButton("robot-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/robot-onion-head-emoticon.gif");
buttons += emoticonButton("running-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/running-onion-head-emoticon.gif");
buttons += emoticonButton("scared-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/scared-onion-head-emoticon.gif");
buttons += emoticonButton("scary-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/scary-onion-head-emoticon.gif");
buttons += emoticonButton("serenade-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/serenade-onion-head-emoticon.gif");
buttons += emoticonButton("shock1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/shock1-onion-head-emoticon.gif");
buttons += emoticonButton("shock2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/shock2-onion-head-emoticon.gif");
buttons += emoticonButton("shy-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/shy-onion-head-emoticon.gif");
buttons += emoticonButton("sigh-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/sigh-onion-head-emoticon.gif");
buttons += emoticonButton("silence-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/silence-onion-head-emoticon.gif");
buttons += emoticonButton("sleeping-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/sleeping-onion-head-emoticon.gif");
buttons += emoticonButton("smoking1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/smoking1-onion-head-emoticon.gif");
buttons += emoticonButton("smoking2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/smoking2-onion-head-emoticon.gif");
buttons += emoticonButton("spa-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/spa-onion-head-emoticon.gif");
buttons += emoticonButton("starving-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/starving-onion-head-emoticon.gif");
buttons += emoticonButton("steal-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/steal-onion-head-emoticon.gif");
buttons += emoticonButton("stoned-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/stoned-onion-head-emoticon.gif");
buttons += emoticonButton("stress-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/stress-onion-head-emoticon.gif");
buttons += emoticonButton("studying-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/studying-onion-head-emoticon.gif");
buttons += emoticonButton("super-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/super-onion-head-emoticon.gif");
buttons += emoticonButton("super-onion-head-emoticon_002", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/super-onion-head-emoticon_002.gif");
buttons += emoticonButton("super-sayan-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/super-sayan-onion-head-emoticon.gif");
buttons += emoticonButton("sweating-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/sweating-onion-head-emoticon.gif");
buttons += emoticonButton("sweetdrop-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/sweetdrop-onion-head-emoticon.gif");
buttons += emoticonButton("tar-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/tar-onion-head-emoticon.gif");
buttons += emoticonButton("uhuhuh-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/uhuhuh-onion-head-emoticon.gif");
buttons += emoticonButton("victory-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/victory-onion-head-emoticon.gif");
buttons += emoticonButton("vomiting-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/vomiting-onion-head-emoticon.gif");
buttons += emoticonButton("wait-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/wait-onion-head-emoticon.gif");
buttons += emoticonButton("waiting-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/waiting-onion-head-emoticon.gif");
buttons += emoticonButton("warning-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/warning-onion-head-emoticon.gif");
buttons += emoticonButton("washing-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/washing-onion-head-emoticon.gif");
buttons += emoticonButton("wet-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/wet-onion-head-emoticon.gif");
buttons += emoticonButton("wew-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/wew-onion-head-emoticon.gif");
buttons += emoticonButton("whaaat1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/whaaat1-onion-head-emoticon.gif");
buttons += emoticonButton("whaaat2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/whaaat2-onion-head-emoticon.gif");
buttons += emoticonButton("whaaat3-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/whaaat3-onion-head-emoticon.gif");
buttons += emoticonButton("what-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/what-onion-head-emoticon.gif");
buttons += emoticonButton("whip-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/whip-onion-head-emoticon.gif");
buttons += emoticonButton("whistling-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/whistling-onion-head-emoticon.gif");
buttons += emoticonButton("white-cloud-emoticon6", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/white-cloud-emoticon6.gif");
buttons += emoticonButton("woa-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/woa-onion-head-emoticon.gif");
buttons += emoticonButton("work-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/work-onion-head-emoticon.gif");
buttons += emoticonButton("wow1-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/wow1-onion-head-emoticon.gif");
buttons += emoticonButton("wow2-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/wow2-onion-head-emoticon.gif");
buttons += emoticonButton("yawn-onion-head-emoticon", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon-onionhead/yawn-onion-head-emoticon.gif");

	
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