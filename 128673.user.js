// ==UserScript==
// @name          Retro Tested - Personalities
// @namespace     @Th3irdEye thanks to christaran and http://clarketk.com
// @description   Retro themed remodel of Tested.com with new Header Image featuring all four of the new Tested crew.
// @include       http://www.tested.com/*
// @match         http://www.tested.com/*
// @version       1.0
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

document.getElementById("footer").getElementsByTagName("img")[0].src = "http://i.imgur.com/kgPoe.png";

var sheet = document.createElement('style')
sheet.innerHTML = " #header .social {height: 77px; } #header .social .container {line-height: 80px; } #header .flair::before { top: 0px; background: url(http://i.imgur.com/TGhq4.png); background-position-y: 0px; background-repeat:no-repeat; } img { margin-bottom: 42px; } body { background: url(http://i.imgur.com/xjXLt.jpg); background-repeat: repeat-x; background-position:0 185px; } html body #header nav a:hover{ color: #cc362d; } html body #header nav li.on a{ color: #cf0a00; }  html header{ l}";
 document.body.appendChild(sheet);