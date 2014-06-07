// ==UserScript==
// @name        testownik LaTeX fix
// @include     http://michaljodko.com/testownik/*
// @version     1.2
// @grant       none
// ==/UserScript==
window.onload = function (){
    var imgTagList = $('a[href*="http://zts.ita.pwr.wroc.pl/moodle/filter/tex/displaytex.php?"] > img');
    for (var i = 0, l = imgTagList.length; i < l; i++) 
    {
        var imgTag = imgTagList[i];
        var imgUrl = $(imgTag).parent().attr('href').replace(/\+/g, " ");
        imgUrl =  decodeURIComponent(imgUrl);
        imgUrl = imgUrl.replace('http://zts.ita.pwr.wroc.pl/moodle/filter/tex/displaytex.php?', 'http://latex.codecogs.com/png.latex?\\bg_white ')
        $(imgTag).attr('src', imgUrl);
    }
}