// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thejijie (http://itsmejijie.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name		Private
// @namespace	Yllvyre
// @description	Private
// @include	http://*.blogger.com/post-edit.g?*
// @include	http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
                      
	buttons += emoticonButton("glee", "http://farm4.static.flickr.com/3144/2414753301_80ffe0b732_o.gif");
	buttons += emoticonButton("heart", 	"http://farm4.static.flickr.com/3168/2415575714_c2993768a2_o.gif");
	buttons += emoticonButton("pissed", "http://farm3.static.flickr.com/2277/2415575764_2955fb6a1b_o.gif ");
	buttons += emoticonButton("sad", "http://farm3.static.flickr.com/2102/2415575798_a6e566990f_o.gif ");
	buttons += emoticonButton("shock", 	"http://farm4.static.flickr.com/3150/2414753425_169bbc9bd6_o.gif");
	buttons += emoticonButton("smile", "http://farm3.static.flickr.com/2116/2415575856_423ea927aa_o.gif");
	buttons += emoticonButton("sorry", "http://farm4.static.flickr.com/3105/2414753495_4e19090c12_o.gif ");
	buttons += emoticonButton("tongue", "http://farm4.static.flickr.com/3233/2415575910_36d99b5390_o.gif");
	buttons += emoticonButton("xo", "http://farm3.static.flickr.com/2196/2415575920_43874e4f1b_o.gif");
	buttons += emoticonButton("wink", "http://farm3.static.flickr.com/2101/2415575956_53370aefcc_o.gif");
	buttons += emoticonButton("yawn", "http://farm4.static.flickr.com/3279/2414753603_8e345a94b9_o.gif");
	buttons += emoticonButton("cute4", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/1716354hq4rsq5c1z.gif");
	buttons += emoticonButton("cute5", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/988870bb1dofxhzt.gif");
	buttons += emoticonButton("cute6", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/367464zgkw5d9f1w-1.gif");
	buttons += emoticonButton("emoticon01", "http://i620.photobucket.com/albums/tt281/aisya99/1.gif");
	buttons += emoticonButton("emoticon02", "http://i620.photobucket.com/albums/tt281/aisya99/10.gif");
	buttons += emoticonButton("emoticon03", "http://i620.photobucket.com/albums/tt281/aisya99/111e7b5d0ca6e22bee18b51084855be2.gif");
	buttons += emoticonButton("emoticon04", "http://i620.photobucket.com/albums/tt281/aisya99/13.gif");
	buttons += emoticonButton("emoticon05", "http://i620.photobucket.com/albums/tt281/aisya99/14.gif");
	buttons += emoticonButton("emoticon06", "http://i620.photobucket.com/albums/tt281/aisya99/15.gif");
	buttons += emoticonButton("emoticon07", "http://i620.photobucket.com/albums/tt281/aisya99/3.gif");
	buttons += emoticonButton("emoticon08", "http://i620.photobucket.com/albums/tt281/aisya99/31.gif");
	buttons += emoticonButton("emoticon09", "http://i620.photobucket.com/albums/tt281/aisya99/4.gif");
	buttons += emoticonButton("emoticon10", "http://i620.photobucket.com/albums/tt281/aisya99/5.gif");
	buttons += emoticonButton("emoticon11", "http://i620.photobucket.com/albums/tt281/aisya99/6.gif");
	buttons += emoticonButton("emoticon12", "http://i620.photobucket.com/albums/tt281/aisya99/8.gif");
	buttons += emoticonButton("emoticon13", "http://i620.photobucket.com/albums/tt281/aisya99/thstressball.gif");
	buttons += emoticonButton("e01", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/shopping.gif");
	buttons += emoticonButton("e02", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sikacak.png");
	buttons += emoticonButton("e03", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sick.gif");
	buttons += emoticonButton("wink", "http://i622.photobucket.com/albums/tt304/priestessgirlmarie/smilies/kao%20emoticons/kao_wink.gif");
	buttons += emoticonButton("emoticon01", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/shopping.gif");
	buttons += emoticonButton("emoticon02", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sick.gif");
	buttons += emoticonButton("emoticon03", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sidaibaju.png");
	buttons += emoticonButton("emoticon04", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sister.png");
	buttons += emoticonButton("emoticon05", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/skippy.gif");
	buttons += emoticonButton("emoticon06", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/skola.png");
	buttons += emoticonButton("emoticon07", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/skull-1.gif");
	buttons += emoticonButton("emoticon08", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/smile.gif");
	buttons += emoticonButton("emoticon09", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/socks.png");
	buttons += emoticonButton("emoticon10", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sofbol.gif");
	buttons += emoticonButton("emoticon11", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sotong.png");
	buttons += emoticonButton("emoticon12", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/spec.gif");
	buttons += emoticonButton("emoticon13", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/star2.gif");
	buttons += emoticonButton("emoticon14", 
"http://i596.photobucket.com/albums/tt44/ainurnajwastory/stoberi.gif");
	buttons += emoticonButton("emoticon15", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/stokin.gif");
	buttons += emoticonButton("emoticon16", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/straighten.png");
	buttons += emoticonButton("emoticon17", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/surat.png");
	buttons += emoticonButton("emoticon18", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sweater.gif");
	buttons += emoticonButton("emoticon19", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/sweets.gif");
	buttons += emoticonButton("emoticon20", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tampar.png");
	buttons += emoticonButton("emoticon21", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tdo-1.gif");
	buttons += emoticonButton("emoticon22", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tdo.png");
	buttons += emoticonButton("emoticon23", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/tepon.gif");
	buttons += emoticonButton("emoticon24", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/thcreambunny_tv-1.gif");
	buttons += emoticonButton("emoticon25", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/thfon-2-1.gif");
	buttons += emoticonButton("emoticon26", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/thgirl-1.gif");
	buttons += emoticonButton("emoticon27", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/thjam-1.gif");
	buttons += emoticonButton("twitter", "http://i277.photobucket.com/albums/kk70/safiena_album/twitter.gif");
	buttons += emoticonButton("facebook", "http://i277.photobucket.com/albums/kk70/safiena_album/facebook.png");
	buttons += emoticonButton("love", "http://i277.photobucket.com/albums/kk70/safiena_album/luv-2.gif");
	buttons += emoticonButton("malaysia", "http://i277.photobucket.com/albums/kk70/safiena_album/my-1.gif");
	buttons += emoticonButton("rumah", "http://i277.photobucket.com/albums/kk70/safiena_album/home-1.gif");
	buttons += emoticonButton("surat", "http://i277.photobucket.com/albums/kk70/safiena_album/03_a05.gif");
	buttons += emoticonButton("lollipop", "http://i277.photobucket.com/albums/kk70/safiena_album/lollipop2-2.gif");
	buttons += emoticonButton("kasut", "http://i277.photobucket.com/albums/kk70/safiena_album/minishoe.gif");
	buttons += emoticonButton("pen", "http://i277.photobucket.com/albums/kk70/safiena_album/luvpen.gif");
	buttons += emoticonButton("completed", "http://i46.tinypic.com/20u4co7.jpg");
      
        
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