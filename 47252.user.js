// ==UserScript==
// @name           Last.fm: Remove unplayable links
// @description    Remove links to songs that can't be played in full length from all lists on Last.fm (and its translations)
// @include        http://*.lastfm.*/*
// @include        http://*.last.fm/*
// ==/UserScript==

function strpos(haystack, needle, offset)
{
    // Finds position of first occurrence of a string within another  
    // 
    // version: 810.1317
    // discuss at: http://phpjs.org/functions/strpos
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Onno Marsman    
    // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
    // *     returns 1: 14
    var i = (haystack+'').indexOf( needle, offset ); 
    return i===-1 ? false : i;
}
function str_replace(search, replace, subject) {
    // Replaces all occurrences of search in haystack with replace  
    // 
    // version: 903.3016
    // discuss at: http://phpjs.org/functions/str_replace
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brettz9.blogspot.com)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
    var s = subject;
    var ra = r instanceof Array, sa = s instanceof Array;
    var f = [].concat(search);
    var r = [].concat(replace);
    var i = (s = [].concat(s)).length;
    var j = 0;
    
    while (j = 0, i--) {
        if (s[i]) {
            while (s[i] = (s[i]+'').split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f){};
        }
    }

    return sa ? s : s[0];
}

var tabellen = document.getElementsByTagName("table");
for (var tabnum in tabellen)
{
    if (tabellen[tabnum].className == 'mediumImageChart')
    {
        zellen = tabellen[tabnum].getElementsByTagName("tr");
        nextstyle = "odd";
        for (var index in zellen)
        {
            if ((strpos(zellen[index].className, "streamable") === false) || (strpos(zellen[index].className, "flp") === false))
            {
                zellen[index].innerHTML = "";
            } else {
                zellen[index].className = nextstyle + " streamable flp";
                if (nextstyle == "")
                {
                    nextstyle = "odd";
                } else {
                    nextstyle = "";
                }
            }
        }
    }
    if (tabellen[tabnum].className.indexOf('candyStriped') != -1)
    {
        zellen = tabellen[tabnum].getElementsByTagName("tr");
        nextstyle = "odd";
        for (var index in zellen)
        {
            if ((strpos(zellen[index].className, "streamable") === false) || (strpos(zellen[index].className, "flp") === false))
            {
                zellen[index].innerHTML = "";
            } else {
                zellen[index].className = nextstyle + " streamable flp";
                if (nextstyle == "")
                {
                    nextstyle = "odd";
                } else {
                    nextstyle = "";
                }
            }
        }
    }
    if (tabellen[tabnum].id == 'searchResults')
    {
        zellen = tabellen[tabnum].getElementsByTagName("tr");
        nextstyle = "odd";
        for (var index in zellen)
        {
            if ((strpos(zellen[index].innerHTML, '<a class="playbutton"') === false) && (strpos(zellen[index].innerHTML, '<h2') === false) && (zellen[index].id != 'exactMatch'))
            {
                zellen[index].innerHTML = "";
            }
        }
    }
}