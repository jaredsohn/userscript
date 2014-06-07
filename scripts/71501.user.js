// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Cahya Prastyanto (http://blogger-emoticon.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Baba Pig 1.0 Emoticons for Blogger
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
	
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090519b07.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090602a06.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623d02.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623d05.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623d06.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623e05.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/02A0298.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/02A0299.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/02A0303.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/02A0305.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/Untitled-1-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/Untitled-11-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/Untitled-12.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/Untitled-8.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/korea_01.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/japan_02.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/goldfish_02.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/folder_01w.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/excel_01.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/camera_05.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/banana_01.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/aircraft_02.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/word_01.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/tv_04.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/suitcase_01.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/radio_07.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/ppt_01.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/moon_01.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_016.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_017.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_018.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_019.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_020.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_021.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_022.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_023.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_008.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_024.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_009.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_010.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_012.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_013.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_014.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_015.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_001.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_002.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_003.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_004.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_005.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_006.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/ish/bibi1004_007.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/control_fastforward.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/control_pause.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/control_rewind.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/mail_open-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_attention-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_attention-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_error-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_house-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_hourglassnon-animated-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_musicon-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_search.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/speech_comment.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/scared.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/smile.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/unhappy.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/5f8708b0.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/10.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/2.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/3-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/4.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/5.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/6.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/7.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/8.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/9.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090519b10.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/16.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/th2-1-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/thUntitled-1-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/th16-2-2.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/th13-1-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/10c52c81d6cefae9eba2075f8461f460-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_calendar-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_computer-1.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/speech_thoughts.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/wineglass.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/tulips.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/tree_round.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/teabag.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/strawberry.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/redribbon.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/paperplane.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/pinkflower.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/26-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/094.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/067.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/048.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/047.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/611.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/411.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/33-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/31.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/29-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/062.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/058.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/054.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/052.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/044.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/037.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/029.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/026.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/022.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/020.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/crying.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/cry.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/catsno.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/Copyofeyebag2.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/Copyofeyebag.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/Copyofangry.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/Animation116.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/Animation111.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/Animation109.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/Animation101.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/134.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/131.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/124.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/123.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/121.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/118.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/116.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/111.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/heeheehee.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/happy2.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/ghost.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/food.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/flower.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/fire.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/emo19.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/sc.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/panda.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/ooh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/oo.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/noo.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/kissy.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/emo18.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/emo17.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/emo16.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/emo15.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/duh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/drop.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/tear.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/spark.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/6zlq0y.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/16lxnuq.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/109.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/108.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/097.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/086.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/070.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/066.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/key.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/hamburger.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/goldfishsnack.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/donut.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/cupidbow.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/cupcake.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/coffee.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/chickie.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/uhmm.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/time.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/candle.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/blueribbon.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/blackribbon.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bigsmile.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/bear_bnw.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623c10.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623a10.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623a01.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/taxi-1.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/065.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/jo.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/i_notice.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/hi.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/ic-49.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/misc_sheep.png");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/huh.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/loveletter.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623e03.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/20090623e01.gif");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/grrr.jpg");
buttons += emoticonButton("blogger-emoticon.blogspot.com", "http://i402.photobucket.com/albums/pp105/mexxDD95/emoticons/ish/te.gif");
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