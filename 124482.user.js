// ==UserScript==
// @name           IMDB - hide TV ratings on filmographies
// @namespace      http://gstaedtner.net
// @description    This userstyle hides the TV ratings on filmographies, so e.g. an actress who played in a TV show will have the (rating-wise largely useless) show filtered out of her personal filmography and only the specific higher profile roles stay.
// @include        http://www.imdb.com/name/*/filmo*
// ==/UserScript==

var elements = document.getElementsByClassName('filmo');
for (i=0; i<elements.length; i++)
{
    var list = elements[i].getElementsByTagName('li');
    for (j=0; j<list.length; j++)
    {
        if (list[j].innerHTML.indexOf(' (#') != -1)
            list[j].style.display = 'none';
    }
}
