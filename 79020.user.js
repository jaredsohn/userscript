// ==UserScript==
// @name           sing365 wonderful
// @namespace      lalla
// @include        http://*.sing365.com/*
// ==/UserScript==


function run(){
data = document.getElementsByTagName("td")[44];
data = data.innerHTML;
song_artist = data.match("tf_artist = \".*?\";")[0].replace("tf_artist = \"" , "").replace("\";","");
song_name = data.match("tf_song = \".*?\";")[0].replace("tf_song = \"" , "").replace("\";","");
a = "<img src=\"http://www.sing365.com/images/phone2.gif\" border=\"0\"><br><br></div>";
b = "<div align=\"center\"><br><br><img src=\"http://www.sing365.com/images/phone.gif\"";
song_lyrics = data.substring(data.indexOf(a) + a.length , data.lastIndexOf(b));
document.write("<h1>" + song_name + "</h1><h3>" + song_artist + "</h3><hr><br />" + song_lyrics);
}

setTimeout(run,100)