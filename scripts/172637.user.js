// ==UserScript==
// @name        kokoko
// @namespace   kokoko
// @include     https://bitcointalk.org/*
// @version     2
// @grant       none
// ==/UserScript==

(function () {
    var kokoko = new Array('Pivo','stahanovec', 'vata2013', 'lobby');
    var kokokoText = 'ко-ко-ко';

    var posters = document.getElementsByClassName('poster_info');
    for(var i=0;i<posters.length;i++)
    {
        var posterName = posters[i].firstElementChild.textContent;
        for(var j=0;j<kokoko.length;j++)
        {
            if(posterName==kokoko[j])
            {
                posters[i].parentElement.lastElementChild.lastElementChild.innerHTML=kokokoText;
            }
        }
    }
    var quotes = document.getElementsByClassName('quoteheader');
    for(var i=0;i<quotes.length;i++)
    {
        var quoterName = quotes[i].textContent;
        for(var j=0;j<kokoko.length;j++)
        {
            if(quoterName.indexOf(kokoko[j])>0)
            {                
                quotes[i].parentElement.getElementsByClassName('quote')[0].innerHTML=kokokoText;
            }
        }
    }
})();