// ==UserScript==
// @name       Chordtab Auto Chord
// @namespace  http://use.i.E.your.homepage/
// @version    0.20
// @description  hide ads and auto redirect to chord page
// @include http://chordtabs.in.th/song.php*
// @include http://www.chordtabs.in.th/song.php*
// @run-at document-body
// @match  
// @copyright  2012+, GU
// ==/UserScript==

var url = window.location.toString();
if(url.indexOf("&chord=yes") == -1){
    window.location.href = url + "&chord=yes";
}else{
    setTimeout(function(){
        var e = document.getElementById("songHeader");
        e.parentNode.removeChild(e);
        e = document.getElementsByTagName("td");
        e = e[e.length-5];
        e.parentNode.removeChild(e);
        document.title = document.title.substring(39,document.title.length);
    },100);
}