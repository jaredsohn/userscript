// Based on the original emoticons for blogger by Haziq (http://mohd-zul-haziq.blogspot.com/)
// Modified by Mohd Zul Haziq (http://mohd-zul-haziq.blogspot.com/))

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name Emoticons for Blogger Onion 3.0
// @namespace http://mohd-zul-haziq.blogspot.com/)
// @description You can use emoticons in Blogger. by chocthinie.blogspot.com
// @include http://*.blogger.com/post-edit.g?*
// @include http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname)
{
var editbar = document.getElementById(domname);
if (editbar) {

var buttons = "
";

buttons += emoticonButton("Terkejut", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc1.gif");
buttons += emoticonButton("Khayal", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc2.gif");
buttons += emoticonButton("Malu", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc3.gif");
buttons += emoticonButton("Lebam", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc4.gif");
buttons += emoticonButton("Tidur Mati", "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc5.gif");
buttons += emoticonButton("Jeles","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc6.gif");
buttons += emoticonButton("Bermain","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc7.gif");
buttons += emoticonButton("Gila","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc8.gif")
buttons += emoticonButton("Sedih","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc8.gif")
buttons += emoticonButton("Berfikir","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc9.giff")
buttons += emoticonButton("Lucu","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc10.gifgif")
buttons += emoticonButton("Marah","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc11.gif")
buttons += emoticonButton("Sedih(2)","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc12.gif")
buttons += emoticonButton("Dalam Percintaan","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc13.gif")
buttons += emoticonButton("Malu(2)","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc14.gif")
buttons += emoticonButton("Mengawal","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc15.gif")
buttons += emoticonButton("Gembira","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc16.gif")
buttons += emoticonButton("Gembira(2)","http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/cathead2/kwc17.gif")


buttons += separator();

editbar.innerHTML += buttons;
}
}


function emoticonButton(name, url) {
return "\";})();ButtonMouseDown(this);'>'\n";
}

function separator() {
return "
\n";
}

setemoticons("formatbar");

}, false);