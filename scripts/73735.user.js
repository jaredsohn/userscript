{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1516;}\viewkind4\uc1\pard\f0\fs20 // Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)\par
// Modified by si tukang nyampah (http://benerantongsampah.blogspot.com/) \par
\par
// FEATURES\par
// Works only in Compose modes\par
// Add the emoticons at the end of the text\par
\par
// TODO\par
// modify the script to insert the emoticon directly after the cursor\par
\par
// ==UserScript==\par
// @name           onion head\par
// @namespace      http://benerantongsampah.blogspot.com\par
// @description    onion head only\par
// @include        http://*.blogger.com/post-edit.g?*\par
// @include        http://*.blogger.com/post-create.g?*\par
 \par
// ==/UserScript==\par
\par
window.addEventListener("load", function(e) \{\par
\par
\par
function setemoticons(domname) \par
\{\par
var editbar = document.getElementById(domname);\par
  if (editbar) \{\par
\par
    var buttons = "<br />";\par
\tab buttons += emoticonButton("puyeng",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh01.gif" );\par
\tab buttons += emoticonButton("demam",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh02.gif" );\par
\tab buttons += emoticonButton("kabur",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh03.gif" );\par
\tab buttons += emoticonButton("ditendang",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh04.gif" );\par
\tab buttons += emoticonButton("jangan2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh05.gif" );\par
\tab buttons += emoticonButton("ngaistanah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh06.gif" );\par
\tab buttons += emoticonButton("beku",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh07.gif" );\par
\tab buttons += emoticonButton("sepele",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh09.gif" );\par
\tab buttons += emoticonButton("berkacakaca",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh10.gif" );\par
\tab buttons += emoticonButton("nyesel",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh11.gif" );\par
\tab buttons += emoticonButton("hohoho",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh12.gif" );\par
\tab buttons += emoticonButton("gyaaa",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh14.gif" );\par
\tab buttons += emoticonButton("yay",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh15.gif" );\par
\tab buttons += emoticonButton("hampa",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh16.gif" );\par
\tab buttons += emoticonButton("terharu",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh17.gif" );\par
\tab buttons += emoticonButton("boo",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh18.gif" );\par
\tab buttons += emoticonButton("cinta",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh19.gif" );\par
\tab buttons += emoticonButton("sokcool",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh20.gif" );\par
\tab buttons += emoticonButton("maksudnya...",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh21.gif" );\par
\tab buttons += emoticonButton("ohhh",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh22.gif" );\par
\tab buttons += emoticonButton("gakmau",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh23.gif" );\par
\tab buttons += emoticonButton("tidaaak",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh24.gif" );\par
\tab buttons += emoticonButton("ketawamiris",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh25.gif" );\par
\tab buttons += emoticonButton("cool",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh26.gif" );\par
\tab buttons += emoticonButton("bingung",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh27.gif" );\par
\tab buttons += emoticonButton("kartumerah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh28.gif" );\par
\tab buttons += emoticonButton("jagoan",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh29.gif" );\par
\tab buttons += emoticonButton("senangnya1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh30.gif" );\par
\tab buttons += emoticonButton("apa?!",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh31.gif" );\par
\tab buttons += emoticonButton("malu",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh32.gif" );\par
        \tab buttons += emoticonButton("malukucing",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh33.gif" );\par
        \tab buttons += emoticonButton("shoot",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh34.gif" );\par
        \tab buttons += emoticonButton("senangnya2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh35.gif" );\par
        \tab buttons += emoticonButton("nanana",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh36.gif" );\par
        \tab buttons += emoticonButton("ngerokok",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh37.gif" );\par
        \tab buttons += emoticonButton("catch!!!",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh38.gif" );\par
        \tab buttons += emoticonButton("keringetan",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh39.gif" );\par
        \tab buttons += emoticonButton("licik",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh40.gif" );\par
        \tab buttons += emoticonButton("nightmare",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh41.gif" );\par
        \tab buttons += emoticonButton("ngakak",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh42.gif" );\par
        \tab buttons += emoticonButton("speechless",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh43.gif" );\par
        \tab buttons += emoticonButton("capedeh",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh44.gif" );\par
        \tab buttons += emoticonButton("amitaba",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh45.gif" );\par
       \tab buttons += emoticonButton("kartukuning",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh46.gif" );\par
        \tab buttons += emoticonButton("murka",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh47.gif" );\par
        \tab buttons += emoticonButton("marah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh48.gif" );\par
        \tab buttons += emoticonButton("anjrot",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh49.gif" );\par
        \tab buttons += emoticonButton("berang",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh50.gif" );\par
\tab buttons += emoticonButton("berendem",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh51.gif" );\par
        \tab buttons += emoticonButton("aha",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh52.gif" );\par
        \tab buttons += emoticonButton("ziiing",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh53.gif" );\par
        \tab buttons += emoticonButton("ngantuk",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh54.gif" );\par
        \tab buttons += emoticonButton("ketiduran",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh55.gif" );\par
        \tab buttons += emoticonButton("bye",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh56.gif" );\par
        \tab buttons += emoticonButton("nangis",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh57.gif" );\par
        \tab buttons += emoticonButton("tolong",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh58.gif" );\par
        \tab buttons += emoticonButton("dribel",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh59.gif" );\par
        \tab buttons += emoticonButton("tidur",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh60.gif" );\par
        \tab buttons += emoticonButton("siul",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh61.gif" );\par
        \tab buttons += emoticonButton("hehehe",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh62.gif" );\par
        \tab buttons += emoticonButton("muntah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh63.gif" );\par
        \tab buttons += emoticonButton("shock",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh64.gif" );\par
        \tab buttons += emoticonButton("cewekmalu",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh65.gif" );\par
        \tab buttons += emoticonButton("guling2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh66.gif" );\par
        \tab buttons += emoticonButton("ngupil",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh67.gif" );\par
       \tab buttons += emoticonButton("bringiton",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh68.gif" );\par
        \tab buttons += emoticonButton("hi",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh69.gif" );\par
        \tab buttons += emoticonButton("nangislari",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh70.gif" );\par
        \tab buttons += emoticonButton("kedinginan",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh71.gif" );\par
        \tab buttons += emoticonButton("mantabs",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh73.gif" );\par
        \tab buttons += emoticonButton("sigh",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh74.gif" );\par
        \tab buttons += emoticonButton("gongxi1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh75.gif" );\par
        \tab buttons += emoticonButton("gongxi2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh76.gif" );\par
        \tab buttons += emoticonButton("nyudut",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh77.gif" );\par
        \tab buttons += emoticonButton("mati",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh78.gif" );\par
        \tab buttons += emoticonButton("keplak",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh81.gif" );\par
        \tab buttons += emoticonButton("keringetdingin",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh82.gif" );\par
        \tab buttons += emoticonButton("makanorang",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh83.gif" );\par
        \tab buttons += emoticonButton("basah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh84.gif" );\par
        \tab buttons += emoticonButton("belajar",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh85.gif" );\par
        \tab buttons += emoticonButton("selimutan",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh86.gif" );\par
        \tab buttons += emoticonButton("keki",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh87.gif" );\par
        \tab buttons += emoticonButton("hipnotis",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh88.gif" );\par
        \tab buttons += emoticonButton("harpa",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh89.gif" );\par
        \tab buttons += emoticonButton("ultah",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh90.gif" );\par
     \tab buttons += emoticonButton("flute",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh91.gif" );\par
        \tab buttons += emoticonButton("bonyok",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh92.gif" );\par
        \tab buttons += emoticonButton("mucrat",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh93.gif" );\par
        \tab buttons += emoticonButton("mocrot",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh94.gif" );\par
        \tab buttons += emoticonButton("nonono",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh95.gif" );\par
        \tab buttons += emoticonButton("nosebleed",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh96.gif" );\par
        \tab buttons += emoticonButton("nikmat",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh97.gif" );\par
        \tab buttons += emoticonButton("stress",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh98.gif" );\par
        \tab buttons += emoticonButton("lari2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh99.gif" );\par
        \tab buttons += emoticonButton("gerah1",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh100.gif" );\par
        \tab buttons += emoticonButton("gerah2",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh101.gif" );\par
        \tab buttons += emoticonButton("tutupkuping",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh102.gif" );\par
        \tab buttons += emoticonButton("mandi",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh103.gif" );\par
        \tab buttons += emoticonButton("cambuk",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh104.gif" );\par
        \tab buttons += emoticonButton("cheer",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh105.gif" );\par
        \tab buttons += emoticonButton("yippie",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh106.gif" );\par
        \tab buttons += emoticonButton("mafia",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh107.gif" );\par
        \tab buttons += emoticonButton("lulus",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh108.gif" );\par
        \tab buttons += emoticonButton("oow",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh109.gif" );\par
        \tab buttons += emoticonButton("maling",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh110.gif" );\par
        \tab buttons += emoticonButton("mwach",  "http://i298.photobucket.com/albums/mm247/erlia_onionhead/oh111.gif" );\par
\par
\tab\tab\tab\par
    buttons += separator();\par
\par
    editbar.innerHTML += buttons;\par
  \}\par
\}\par
\par
\par
function emoticonButton(name, url) \{\par
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() \{var rich_edit = document.getElementById(\\"richeditorframe\\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\\"body\\");rich_body[0].innerHTML+=\\"<img  class=\\\\\\"emoticon\\\\\\"  src=\\\\\\""+url+"\\\\\\" width=\\\\\\"\\\\\\" height=\\\\\\"\\\\\\" alt=\\\\\\"" + name + "\\\\\\" title=\\\\\\"" + name + "\\\\\\" />\\";\})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\\n";\par
\}\par
\par
function separator() \{\par
  return "<div style=\\"display: block;\\" class=\\"vertbar\\"><span style=\\"display: block;\\" class=\\"g\\">&nbsp;</span><span style=\\"display: block;\\" class=\\"w\\">&nbsp;</span></div>\\n";\par
\}\par
\par
setemoticons("formatbar");\par
\par
 \}, false);\par
}
