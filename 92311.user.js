// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           emoticons Emoticons for Blogger
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

    var buttons = "<br />";
	
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofeew.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofangry.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofeyebag.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofeyebag2.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/Copyofeyelashes.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/cry.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/crying.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/dizzy.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/duh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/fire.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/grrr.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/happy.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/happy2.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/huh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/hi.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/kapalkilay.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/kapalkilay.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/ooh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/oo.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/nosebleed2.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/nosebleed.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/kiss.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/leh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/love.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/noo.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_016.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_017.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_018.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_019.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_020.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_021.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_022.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_023.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_024.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_008.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_009.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_010.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_011.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_012.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_013.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_014.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_015.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_001.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_002.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_003.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_004.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_006.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_005.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_007.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/spark.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/tear.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/uhmm.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/kissy.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/oo.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/fire.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/grrr.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/happy2.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/hi.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/huh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/123.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/124.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/131.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/Copyofangry.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/16lxnuq.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/6zlq0y.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/31.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/411.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/611.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_011.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_012.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_014.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_015.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_017.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_018.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_019.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_020.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_021.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_022.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_023.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bibi1004_024.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/cutiepie5.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2iviihk.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/6zlq0y.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2z9cjrljpg.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2lnxv2d.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/2i0947kjpg.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/dizzy.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/016.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/015.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/003.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/shy.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/shy2.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/shy3.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/shygry.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/spark.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/tsk.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/waa.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/12-2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Kawaii%20Smilies/1.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/081.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/059.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/126.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/078.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/073.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/068.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/051-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/042.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/040.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/039.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/032.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/031.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/Animation111.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/Animation101.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/Animation109.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/Animation116.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/24.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/untitled5.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/054.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/2n0q4n6.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/emo15.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/emo16.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/emo17.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/emo18.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/emo19.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/emo21.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/jrcjd4.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/st_4_4_2.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/026.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/097.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/076.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/111.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/074.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/094.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/086.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/095.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/088.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/037.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/064.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/087.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/118.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/108.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/067.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/takikx.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/2cmp3knjpg.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/time.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/thumb.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/022.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/029.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/047.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/050.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/052.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/062.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/070.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/121.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/aha-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/book.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/bug.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/bulb.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/cell.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/crown.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/drop.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Icons/ghost.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/hamburger.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/paperplane.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/loveletter.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/10c52c81d6cefae9eba2075f8461f460-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/th2-1-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_calendar-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_hourglassanimated-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623d02.gif");



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