// ==UserScript==
// @name           Geocaching.com old header design
// @namespace      none
// @include        http*://www.geocaching.com/*
// @author         Michalowic
// @version        1.2
// ==/UserScript==

var allImg=document.getElementsByTagName("img"), i=0, img;
var patternhttp = 'http://www.geocaching.com/images/tlnMasters/geocaching-logo.png';
var patternhttps = 'https://www.geocaching.com/images/tlnMasters/geocaching-logo.png';

while (img = allImg[i++])
{
    if (img.src.match(patternhttp)){
        img.src = img.src.replace(patternhttp, 'http://web.archive.org/web/20130605161903/https://www.geocaching.com/images/tlnMasters/logo.png');
        img.setAttribute('width', '363px');
        img.setAttribute('height', '36px');
    }
    
       if (img.src.match(patternhttps)){
        img.src = img.src.replace(patternhttps, 'http://web.archive.org/web/20130605161903/https://www.geocaching.com/images/tlnMasters/logo.png');
        img.setAttribute('width', '363px');
        img.setAttribute('height', '36px');
    }
}

GM_addStyle(".pozadi {background: #8c9e65 url('http://web.archive.org/web/20130605161903/https://www.geocaching.com/images/tlnMasters/bg_header.png'); background-position: center top; height: 97px;}");
var header = document.getElementById('ctl00_siteHeader');
header.setAttribute('class', 'pozadi');

GM_addStyle(".profileWidget {background-color:rgba(0,0,0,0.4); border-radius:5px;}");
var widget = document.getElementById('ctl00_divSignedIn');
widget.setAttribute('class', 'profileWidget');

GM_addStyle(".navigace {background: #8c9e65; }");
var navigace = document.getElementById('Navigation');
navigace.setAttribute('class', 'navigace');