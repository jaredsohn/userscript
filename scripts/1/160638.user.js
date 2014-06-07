// ==UserScript==
// @name           SadChildrenPlusPlus
// @namespace      http://userscripts.org/users/conartist6
// @include        /^http://(archive\.)?picturesforsadchildren\.com/[0-9]+/?/
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

$(window).on('load', function()  {
    var pathname = window.location.pathname;
    var comicno, findcomicno = /([0-9]+)\/$/m;
    var match = findcomicno.exec(pathname);
    if(match) comicno = match[1];
    var comic = $("center > img");
    //grab the title from the burningpotato.com pfsccomictitle service.
    $.ajax("http://burningpotato.com/pfsc/titles.php?n=" + comicno, {success: function(title, textStatus)
    {
        var title;
        //Stick the title text onto the image
        comic.attr("title", title);
    }});



//fix sole instance of decolorization
if(comicno == "61")
{
    comic.attr("src", "http://burningpotato.com/pfsc/61.png");
}
});