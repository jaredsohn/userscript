// ==UserScript==
// @name        Beatport -> Soundcloud
// @namespace   
// @description Beatport -> Soundcloud
// @include     *beatport.com/*
// @version     1
// @grant       none
// ==/UserScript==


$(
  function()
    {
        var list = document.getElementsByClassName('headerNav')[0];
        var item = document.createElement('li');
        item.className =  'headerNav-item';
        item.innerHTML = '<span class="headerNav-button"><span class="headerNav-button-label">Search SC</span></span>';
        item.addEventListener("click",searchSC,false);
        list.appendChild(item);
    }
);

function searchSC()
{
   var nameClass = document.getElementsByClassName('trackName')[0];
   if(nameClass != null)
   {
        var name = nameClass.title;

        var artistClass = document.getElementsByClassName('artist')[0].childNodes[0];
        var artist = artistClass.title;

        window.open('https://soundcloud.com/search?q=' + name + ' ' + artist,'_blank');
    }
}


