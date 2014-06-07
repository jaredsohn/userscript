// ==UserScript==
// @name          Retro Tested
// @namespace     @christaran thanks to http://clarketk.com
// @description   Retro themed remodel of Tested.com
// @include       http://www.tested.com/*
// @match         http://www.tested.com/*
// @version       2.6
// ==/UserScript==

(function() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://web.archive.org/web/20110726112327/http://www.tested.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
}());

document.getElementById("header").getElementsByTagName("img")[0].src = "http://i.imgur.com/kgPoe.png";

document.getElementById("footer").getElementsByTagName("img")[0].src = "http://i.imgur.com/kgPoe.png";


var sheet = document.createElement('style')
sheet.innerHTML = "<!--#header img { margin-bottom: 42px; } body { background: url(http://i.imgur.com/xjXLt.jpg); background-repeat: repeat-x; background-position:0 110px; } .flair { display:none; } #header section.live {display: none;} html body #header nav a:hover{ color: #cc362d; } html body #header nav li.on a{ color: #cf0a00; } #header .social .container{ padding-top:16px; } #header .social{ height:58px;} ";
 document.body.appendChild(sheet);
