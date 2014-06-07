// ==UserScript==
// @name       InFakt Adds Killer
// @version    1.2
// @include    https://www.infakt.pl/app*
// @description  InFakt Adds Killer
// @copyright  2014+, Łukasz 'PerSOft' Malicki
// ==/UserScript==

var items = document.body.getElementsByTagName('div');
for (item in items)
{
    if (items[item].attributes["class"] != null)
    {
        if (items[item].attributes["class"].value != null)
        {
            if (items[item].attributes["class"].value.indexOf("try-free-box") > 0)
            {
                items[item].remove();
            }
        }
    }   
}