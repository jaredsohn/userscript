// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/)

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaii Emoticons
// @namespace      http://oh-so-lovelisa.blogspot.com/
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
                     
        buttons += emoticonButton("0", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/a4ce3f04.gif");
buttons += emoticonButton("1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/1.gif");
buttons += emoticonButton("2", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/2.gif");
buttons += emoticonButton("3", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/3.gif");
buttons += emoticonButton("4", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/4.gif");
buttons += emoticonButton("5", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/5.gif");
buttons += emoticonButton("6", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/6.gif");
buttons += emoticonButton("7", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/7.gif");
buttons += emoticonButton("8", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/8.gif");
buttons += emoticonButton("9", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/9.gif");
buttons += emoticonButton("(", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/a0ed1143.gif");
buttons += emoticonButton(")", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/0acf7112.gif");
buttons += emoticonButton("7eleven", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/7eleven.gif");
buttons += emoticonButton("up", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/up2.gif");
buttons += emoticonButton("bag", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/bag1.gif");
buttons += emoticonButton("bag1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/bag.gif");
buttons += emoticonButton("annoyed", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/anoyyed.gif");
buttons += emoticonButton("book", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/book.gif");
buttons += emoticonButton("blog4", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/blog2.gif");
buttons += emoticonButton("bell", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/bell.gif");
buttons += emoticonButton("camera", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/captured.gif");
buttons += emoticonButton("camera", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/camera.gif");
buttons += emoticonButton("crown", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/camera.gif");
buttons += emoticonButton("cake", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/cke.gif");
buttons += emoticonButton("car", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/carcrookie.gif");
buttons += emoticonButton("chummy", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/carcrookie.gif");
buttons += emoticonButton("sobsob", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/cuteteddy.gif");
buttons += emoticonButton("cry", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/cry-1.gif");
buttons += emoticonButton("inlove", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/inlove1.gif");
buttons += emoticonButton("home", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/home-2.gif");
buttons += emoticonButton("tv", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/tv1.gif");
buttons += emoticonButton("zzzz", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/zzzz.gif");
buttons += emoticonButton("love", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/love-4.gif");
buttons += emoticonButton("homehp", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/ring.gif");
buttons += emoticonButton("party", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/prty.gif");
buttons += emoticonButton("pencil", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/pencil-1.gif");
buttons += emoticonButton("thanks", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/thanks.gif");
buttons += emoticonButton("sorry", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/sorry.gif");
buttons += emoticonButton("umbrella", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/umbrella.gif");
buttons += emoticonButton("umbrella", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/umbrella1.gif");
buttons += emoticonButton("up1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/up1-1.gif");
buttons += emoticonButton("like&love", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/HAPPY1.gif");
buttons += emoticonButton("ambulans", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/ambulans.gif");
buttons += emoticonButton("girl", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/lisalove-1.gif");
buttons += emoticonButton("!", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/1-1.gif");
buttons += emoticonButton("bumblebee", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/bumblebee.gif");
buttons += emoticonButton("cherry", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/berry.gif");
buttons += emoticonButton("grr", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/angry1.gif");
buttons += emoticonButton("meow", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/cat.gif");
buttons += emoticonButton("ring", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/calling.gif");
buttons += emoticonButton("cuppcake", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/cupcake.gif");
buttons += emoticonButton("scissors", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/copycat.gif");
buttons += emoticonButton("dress", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/dress.gif");
buttons += emoticonButton("donut", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/doughnuts.gif"); 
buttons += emoticonButton("flower", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/flowerish.gif");
buttons += emoticonButton("spoonnfoke", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/eat.gif");
buttons += emoticonButton("dvd", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/dvd.gif");
buttons += emoticonButton("boygirl", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/girlboy.gif");
buttons += emoticonButton("flu", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/flu.gif");
buttons += emoticonButton("love", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/hellokitty1.gif");
buttons += emoticonButton("like", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/hellokitty.gif");
buttons += emoticonButton("smile", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/happy.gif");
buttons += emoticonButton("good", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/good.gif");
buttons += emoticonButton("hkgrrr", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/hellokitty2.gif");
buttons += emoticonButton("hikhik", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/hikhik.gif");
buttons += emoticonButton("hey say", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/heysay.gif");
buttons += emoticonButton("sob", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/hellokitty5.gif");
buttons += emoticonButton("light", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/lamp.gif"); 
buttons += emoticonButton("lolipoppy", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/kitty.gif");
buttons += emoticonButton("kfc", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/kfc.gif");
buttons += emoticonButton("comp", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/lappy.gif");
buttons += emoticonButton("loveheart", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/love6.gif");
buttons += emoticonButton("lovescream", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/love-1.gif");
buttons += emoticonButton("messageslove1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/mail3.gif"); 
buttons += emoticonButton("messageslove2", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/mail2.gif");
buttons += emoticonButton("mcd", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/mcd.gif");
buttons += emoticonButton("nite1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/nite1.gif");
buttons += emoticonButton("music", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/music1.gif");
buttons += emoticonButton("rainbow", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/rainbow.gif"); 
buttons += emoticonButton("pencil", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/pencil.gif"); 
buttons += emoticonButton("peace", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/peace.gif"); 
buttons += emoticonButton("ok", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/ok1.gif");
buttons += emoticonButton("strawberry", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/strawberry-1.gif"); 
buttons += emoticonButton("shop", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/shop.gif"); 
buttons += emoticonButton("youtube", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/youtube.gif"); 
buttons += emoticonButton("sweet", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/sweet.gif");
buttons += emoticonButton("sun", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/sun1.gif");       
buttons += emoticonButton("strawberry1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/strawberry4.gif");
buttons += emoticonButton("strawberry2", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/strawberry3.gif");
buttons += emoticonButton("dress1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/dress1.gif");
buttons += emoticonButton("balloon", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/balloon.gif");
buttons += emoticonButton("lollipoppy1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/candy.gif");
buttons += emoticonButton("burger", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/burger.gif");
buttons += emoticonButton("zzz", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/hellokitty8.gif");
buttons += emoticonButton("stokin", "http://jugem.jp/fun/picto/pictos_list.php?p=day&pageID=5");    
buttons += emoticonButton("hp", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/hndphone.gif");
buttons += emoticonButton("!2", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/scream.gif");
buttons += emoticonButton("chocolate", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/chocolate.gif");
buttons += emoticonButton("dushdush", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/dushdush.gif");
buttons += emoticonButton("english", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/english.gif");
buttons+=  emoticonButton("candle", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/candle.gif");
buttons += emoticonButton("bathe", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/bathe.gif");
buttons += emoticonButton("smile", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/HAPPY1.gif");
buttons += emoticonButton("up", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/up3.gif");
buttons += emoticonButton("mail", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/mail-1.gif");
buttons += emoticonButton("star", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/stary1.gif");
buttons += emoticonButton("star1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/stary.gif");
buttons += emoticonButton("bye", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/bye.gif");
buttons += emoticonButton("lisa", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/lisa-8.gif");
buttons += emoticonButton("heart", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/638145bltz6zqhdo.gif");
buttons += emoticonButton("wekk", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/638119ruc7mlx0c4.gif");
buttons += emoticonButton("blog", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/blog-1.gif");
buttons += emoticonButton("yippie", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/hoorey.gif");
buttons += emoticonButton("heeee", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/heee.gif");
buttons += emoticonButton("happy", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/happy11.gif");
buttons += emoticonButton("click", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/click-1.gif");
buttons += emoticonButton("tatah", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/byebye.gif");
buttons += emoticonButton("nite2", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/sleep.gif");
buttons += emoticonButton("lisa1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/lisa-9.gif");
buttons += emoticonButton("guy", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/daddy.gif");
buttons += emoticonButton("car", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/car-1.gif");
buttons += emoticonButton("blog1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/blog1.gif");
buttons += emoticonButton("girl", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/mommy.gif");
buttons += emoticonButton("love", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/inlove.gif");
buttons += emoticonButton("girl1", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/girl-1.gif");
buttons += emoticonButton("corner", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/turnright.gif");
buttons += emoticonButton("present", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/present.gif");
buttons += emoticonButton("stary", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/lovelove.gif");
buttons += emoticonButton("troli", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/troli.gif");
buttons += emoticonButton("tee", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/tee.gif");
buttons += emoticonButton("strawbery2", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/strawberry-3.gif");
buttons += emoticonButton("&", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/and1.gif");
buttons += emoticonButton("line", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/liner.gif");
buttons += emoticonButton("line", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/liner2.gif");
buttons += emoticonButton("line", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/dividers1-1.gif");
buttons += emoticonButton("line", "http://i857.photobucket.com/albums/ab137/Putri_Shasya/dividers.gif");

       
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
