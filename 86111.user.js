// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Liyana (http://flowerykiss.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           My Own Edited Script
// @namespace      http://flowerykiss.blogspot.com
// @description    You can use emoticons in Blogger by flowerykiss.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";





        buttons += emoticonButton(":136:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/shopping.gif");
	buttons += emoticonButton(":137:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sick.gif");
	buttons += emoticonButton(":138:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sidaibaju.png");
	buttons += emoticonButton(":139:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sister.png");
	buttons += emoticonButton(":140:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/skippy.gif");
	buttons += emoticonButton(":141:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/skola.png");
	buttons += emoticonButton(":142:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sweater.gif");
	
	
	

        buttons += emoticonButton(":143:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tdo-1.gif");
	buttons += emoticonButton(":144:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tdo.png");
	buttons += emoticonButton(":145:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tepon.gif");
	buttons += emoticonButton(":146:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/thcreambunny_tv-1.gif");
	



buttons += emoticonButton(":147:", "http://i277.photobucket.com/albums/kk70/safiena_album/twitter.gif");
	buttons += emoticonButton(":148:", "http://i277.photobucket.com/albums/kk70/safiena_album/facebook.png");
	buttons += emoticonButton(":149:", "http://i277.photobucket.com/albums/kk70/safiena_album/my-1.gif");
	buttons += emoticonButton(":150:", "http://i277.photobucket.com/albums/kk70/safiena_album/home-1.gif");
	buttons += emoticonButton(":151:", "http://i277.photobucket.com/albums/kk70/safiena_album/03_a05.gif");
	buttons += emoticonButton(":152:", "http://i277.photobucket.com/albums/kk70/safiena_album/lollipop2-2.gif");
	buttons += emoticonButton(":153:", "http://i277.photobucket.com/albums/kk70/safiena_album/minishoe.gif");
	buttons += emoticonButton(":154:", "http://i277.photobucket.com/albums/kk70/safiena_album/luvpen.gif");
	buttons += emoticonButton(":155:", "http://i46.tinypic.com/20u4co7.jpg");








  buttons += emoticonButton(":156:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Web%20materials/loading1.gif");



  buttons += emoticonButton(":157:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/star%20panda%20smilies/airplane.png");
  buttons += emoticonButton(":158:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/star%20panda%20smilies/book.png");
  buttons += emoticonButton(":159:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/star%20panda%20smilies/earth.png");






  buttons += emoticonButton("0", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/1e0eb8950ea22eb58c043d7b6238939a.gif");
  buttons += emoticonButton("1", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/863287d81fb051ea1973530885a469fa.gif");
  buttons += emoticonButton("2", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/d408702d44383ed4394ce8a19356b435.gif");
  buttons += emoticonButton("3", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/4199061f501eca26b90b5269a52bb4f5.gif");
  buttons += emoticonButton("4", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/4b5fbfda470b94ce413638d9b844d384.gif");
  buttons += emoticonButton("5", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/b24d2d4df87e15282ddae0015c37cb08.gif");
  buttons += emoticonButton("6", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/a9017f2016d43e92886505be6e13ce91.gif");
  buttons += emoticonButton("7", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/5d6aeee1616b03df739f60030db4aa9f.gif");
  buttons += emoticonButton("8", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/20e46b0d052dce749fb7dbfe0ba12cc3.gif");
  buttons += emoticonButton("9", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Numbers/9599f8fc00f63e21dce2ae3667181d19.gif");





  buttons += emoticonButton(":160:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/music_azul.gif");
  buttons += emoticonButton(":161:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/miniup.gif");
  buttons += emoticonButton(":162:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/minisorvete.gif");
  buttons += emoticonButton(":163:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/miniventilador.gif");
  buttons += emoticonButton(":164:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/mininews.gif");
  buttons += emoticonButton(":165:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/miniradio.gif");
  buttons += emoticonButton(":166:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/minipizza.gif");
  buttons += emoticonButton(":167:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/minikitty2.gif");
  buttons += emoticonButton(":168:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/minichuva.gif");
  buttons += emoticonButton(":169:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/minibatata.gif");
  buttons += emoticonButton(":170:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/mini134.gif");
  buttons += emoticonButton(":171:", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/mini103.gif");







  buttons += emoticonButton(":172:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/manderly/socute.gif");
  buttons += emoticonButton(":173:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/02A0304.gif");
  buttons += emoticonButton(":174:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/3d02922f9a5ca8f7fd6d03ce2d77a19c.gif");
  buttons += emoticonButton(":175:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/8b9efbaa3d77d164ba34a25d1611aa41.gif");
  buttons += emoticonButton(":176:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/588a9fc2b7b27818360692f756edd137.gif");
  buttons += emoticonButton(":177:", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/7511bfe0a64e2ef18dbbfbfb94b813d4.gif");










  buttons += emoticonButton("happy", "http://dl5.glitter-graphics.net/pub/435/435805ow5699wuzm.gif");
  buttons += emoticonButton("vote", "http://dl5.glitter-graphics.net/pub/967/967985v818a4mn1y.gif");
  buttons += emoticonButton("kiss", "http://dl8.glitter-graphics.net/pub/699/699258ehqnox0kww.gif");
  buttons += emoticonButton("click", "http://dl2.glitter-graphics.net/pub/1244/1244732vlnxggrj2r.gif");
  buttons += emoticonButton("bye", "http://dl10.glitter-graphics.net/pub/348/348430xpfzm8fl9a.gif");
  buttons += emoticonButton("hello", "http://dl10.glitter-graphics.net/pub/1064/1064240rzz01o6zju.gif");
  buttons += emoticonButton("pink", "http://dl.glitter-graphics.net/pub/762/762871e0ktzoiu7x.gif");
  buttons += emoticonButton("diary", "http://dl4.glitter-graphics.net/pub/1597/1597864dcroeqh6lb.gif");
  buttons += emoticonButton("Lol", "http://dl3.glitter-graphics.net/pub/426/426993xy8pjf7103.gif");
  buttons += emoticonButton("night", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/minilua.gif");
  buttons += emoticonButton("news", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/mininews2.gif");
  buttons += emoticonButton("graduate", "http://i11.photobucket.com/albums/a168/evelynregly/minigifs/minifacul.gif");
  buttons += emoticonButton("computer", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/35c4799b26face660a30915a6b25ef89.gif");

  buttons += emoticonButton("ok", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/b23fb5c08c9e587b1dfa1c8eea2e59a7.gif");
  buttons += emoticonButton("!?", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/4db562b6c2bc0e31bc19dc41111e8b12.gif");
  buttons += emoticonButton("vamp", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/8ebd6aa1613f8a6f317e75ce7d94dd13.gif");
  buttons += emoticonButton("umbrella", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/49a371755239b12100f288279c1eefb5.gif");
  buttons += emoticonButton("sleep", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/1148e3013316e4f2600e17b9e351de8a.gif");
  buttons += emoticonButton("ATM", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/20090623c03.gif");
  buttons += emoticonButton("house", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/1239607002-280065.gif");
  buttons += emoticonButton("bath", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/c51e1fdd4c21e2ec42b43529a01834be.gif");
  buttons += emoticonButton("shopping", "http://i561.photobucket.com/albums/ss52/angelicxmelody/babydoll%20smilies%20complete/f53ade42ede219d291c48f34c064d190.gif");
  buttons += emoticonButton(")", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Smilies/8accff38bd48d32f40fc4d756bd7148d.gif");
  buttons += emoticonButton("(", "http://i561.photobucket.com/albums/ss52/angelicxmelody/Small%20Smilies/33ab97b18b2f240a30d8e8300d885e77.gif");
  buttons += emoticonButton("haha", "http://i561.photobucket.com/albums/ss52/angelicxmelody/sweet%20bubble%20smilies/32.gif");


 buttons += emoticonButton("blog", "http://img375.imageshack.us/img375/566/thz206877697.gif");
 buttons += emoticonButton("time", "http://img139.imageshack.us/img139/1985/thtime.png");
 buttons += emoticonButton("cake", "http://img262.imageshack.us/img262/9034/cakemini02.gif");
 buttons += emoticonButton("updated", "http://img338.imageshack.us/img338/8403/1104304vetrq0vfyz.gif");
 buttons += emoticonButton("hi", "http://img262.imageshack.us/img262/5745/439758h831qlcl8s.gif");
 buttons += emoticonButton("LOL", "http://img225.imageshack.us/img225/5950/426993xy8pjf7103.gif");




	
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