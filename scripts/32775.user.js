// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by si tukang nyampah (http://benerantongsampah.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           onion head for blogger
// @namespace      http://benerantongsampah.blogspot.com
// @description    onion head only
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
 
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	        buttons += emoticonButton("puyeng",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh01.gif" );
		buttons += emoticonButton("demam",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh02.gif" );
		buttons += emoticonButton("kabur",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh03.gif" );
		buttons += emoticonButton("ditendang",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh04.gif" );
		buttons += emoticonButton("hmm",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh05.gif" );
		buttons += emoticonButton("ngaistanah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh06.gif" );
		buttons += emoticonButton("beku",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh07.gif" );
		buttons += emoticonButton("nggakjelas1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh08.gif" );
		buttons += emoticonButton("apabolehbuat",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh09.gif" );
		buttons += emoticonButton("aww",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh10.gif" );
		buttons += emoticonButton("nyesel",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh11.gif" );
		buttons += emoticonButton("ngayal",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh12.gif" );
		buttons += emoticonButton("nggakjelas2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh13.gif" );
		buttons += emoticonButton("gyaaa",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh14.gif" );
		buttons += emoticonButton("yay",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh15.gif" );
		buttons += emoticonButton("sendirian",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh16.gif" );
		buttons += emoticonButton("terharu",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh17.gif" );
		buttons += emoticonButton("boo",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh18.gif" );
		buttons += emoticonButton("cinta",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh19.gif" );
		buttons += emoticonButton("pendekar",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh20.gif" );
		buttons += emoticonButton("maksud",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh21.gif" );
		buttons += emoticonButton("oooh",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh22.gif" );
		buttons += emoticonButton("aargh",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh23.gif" );
		buttons += emoticonButton("wtf",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh24.gif" );
		buttons += emoticonButton("ketawamiris",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh25.gif" );
		buttons += emoticonButton("cool",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh26.gif" );
		buttons += emoticonButton("bingung",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh27.gif" );
		buttons += emoticonButton("kartumerah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh28.gif" );
		buttons += emoticonButton("jagoan",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh29.gif" );
		buttons += emoticonButton("senangnya1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh30.gif" );
		buttons += emoticonButton("hah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh31.gif" );
		buttons += emoticonButton("jadimalu1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh32.gif" );
        	buttons += emoticonButton("jadimalu2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh33.gif" );
        	buttons += emoticonButton("nendangbola",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh34.gif" );
        	buttons += emoticonButton("senangnya2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh35.gif" );
        	buttons += emoticonButton("nanana",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh36.gif" );
        	buttons += emoticonButton("ngerokok",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh37.gif" );
        	buttons += emoticonButton("nendangbola2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh38.gif" );
        	buttons += emoticonButton("keringetan",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh39.gif" );
        	buttons += emoticonButton("ketawasetan",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh40.gif" );
        	buttons += emoticonButton("nightmare",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh41.gif" );
        	buttons += emoticonButton("gyahahaha",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh42.gif" );
        	buttons += emoticonButton("speechless",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh43.gif" );
        	buttons += emoticonButton("capedeh",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh44.gif" );
        	buttons += emoticonButton("amitamit",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh45.gif" );
       	 	buttons += emoticonButton("kartukuning",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh46.gif" );
        	buttons += emoticonButton("marah1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh47.gif" );
        	buttons += emoticonButton("marah2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh48.gif" );
        	buttons += emoticonButton("gebrakmeja",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh49.gif" );
        	buttons += emoticonButton("marah3",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh50.gif" );
		buttons += emoticonButton("berendem",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh51.gif" );
        	buttons += emoticonButton("ha",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh52.gif" );
        	buttons += emoticonButton("ziiing",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh53.gif" );
        	buttons += emoticonButton("capek",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh54.gif" );
        	buttons += emoticonButton("ketiduran",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh55.gif" );
        	buttons += emoticonButton("bye",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh56.gif" );
        	buttons += emoticonButton("aiahahaha",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh57.gif" );
        	buttons += emoticonButton("tolong",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh58.gif" );
        	buttons += emoticonButton("nendangbola3",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh59.gif" );
        	buttons += emoticonButton("tidur",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh60.gif" );
        	buttons += emoticonButton("siul",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh61.gif" );
        	buttons += emoticonButton("semangat",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh62.gif" );
        	buttons += emoticonButton("muntah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh63.gif" );
        	buttons += emoticonButton("shock1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh64.gif" );
        	buttons += emoticonButton("gila",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh65.gif" );
        	buttons += emoticonButton("gulingguling",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh66.gif" );
        	buttons += emoticonButton("ngupil",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh67.gif" );
       	 	buttons += emoticonButton("bringiton",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh68.gif" );
        	buttons += emoticonButton("hi",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh69.gif" );
        	buttons += emoticonButton("nangis",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh70.gif" );
        	buttons += emoticonButton("kedinginan",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh71.gif" );
        	buttons += emoticonButton("mantabs",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh73.gif" );
        	buttons += emoticonButton("sigh",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh74.gif" );
        	buttons += emoticonButton("gongxi1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh75.gif" );
        	buttons += emoticonButton("gongxi2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh76.gif" );
        	buttons += emoticonButton("capedeh2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh77.gif" );
        	buttons += emoticonButton("mati1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh78.gif" );
        	buttons += emoticonButton("mati2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh79.gif" );
        	buttons += emoticonButton("nggakjelas3",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh80.gif" );
        	buttons += emoticonButton("keplak",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh81.gif" );
        	buttons += emoticonButton("shock2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh82.gif" );
        	buttons += emoticonButton("makanorang",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh83.gif" );
        	buttons += emoticonButton("basah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh84.gif" );
        	buttons += emoticonButton("belajar",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh85.gif" );
        	buttons += emoticonButton("selimutan",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh86.gif" );
        	buttons += emoticonButton("keki",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh87.gif" );
        	buttons += emoticonButton("hipnotis",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh88.gif" );
        	buttons += emoticonButton("harpa",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh89.gif" );
        	buttons += emoticonButton("ultah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh90.gif" );
     		buttons += emoticonButton("flute",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh91.gif" );
        	buttons += emoticonButton("bonyok",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh92.gif" );
        	buttons += emoticonButton("batuk1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh93.gif" );
        	buttons += emoticonButton("batuk2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh94.gif" );
        	buttons += emoticonButton("nonono",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh95.gif" );
        	buttons += emoticonButton("meler",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh96.gif" );
        	buttons += emoticonButton("ngeteh",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh97.gif" );
        	buttons += emoticonButton("stress",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh98.gif" );
        	buttons += emoticonButton("larilari",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh99.gif" );
        	buttons += emoticonButton("gerah1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh100.gif" );
        	buttons += emoticonButton("gerah2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh101.gif" );
        	buttons += emoticonButton("tutupkuping",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh102.gif" );
        	buttons += emoticonButton("mandi",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh103.gif" );
        	buttons += emoticonButton("catwoman",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh104.gif" );
        	buttons += emoticonButton("cheerleader",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh105.gif" );
        	buttons += emoticonButton("yippie",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh106.gif" );
        	buttons += emoticonButton("mafia",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh107.gif" );
        	buttons += emoticonButton("lulus",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh108.gif" );
        	buttons += emoticonButton("oow",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh109.gif" );
        	buttons += emoticonButton("ngendapngendap",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh110.gif" );
        	buttons += emoticonButton("mwach",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh111.gif" );

			
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


