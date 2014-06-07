// ==UserScript==
// @name           Demonoid Big Download Link
// @version        1.2
// @description    Makes the download link BIG and easy to click
// @license        Public Domain
// @include        http://www.demonoid.com/*
// @include        http://demonoid.com/*
// @include        https://www.demonoid.com/*
// @include        https://demonoid.com/*
// @include        http://www.demonoid.me/*
// @include        http://demonoid.me/*
// @include        https://www.demonoid.me/*
// @include        https://demonoid.me/*
// ==/UserScript==

//
// This code is in Public Domain. Any part of this script can be used for any purpose.
//
// Credits:
// Orange button css taken from http://www.webdesignerwall.com/tutorials/css3-gradient-buttons/
//

(function(){
    var link = document.evaluate("//a[contains(@href,'/files/download/')][contains(.,'Click here to download the torrent')]",
        document, null, 9, null).singleNodeValue;
    if (link) {
        var style = document.createElement('style');
        style.textContent = "\
            a.link875 {\
                display: inline-block;\
                font-size: 20px;\
                font-weight: bold;\
                padding: 20px;\
                margin: 5px 15px;\
                text-decoration: none;\
                -moz-border-radius: 10px;\
                -webkit-border-radius: 10px;\
                border-radius: 10px;\
                -moz-box-shadow: 5px 5px 5px #888;\
                -webkit-box-shadow: 5px 5px 5px #888;\
                box-shadow: 5px 5px 5px #888;\
                text-shadow: 3px 3px 3px rgba(0,0,0,0.4);\
                color: #fef4e9;\
                border: solid 1px #da7c0c;\
                background: #f78d1d;\
                background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));\
                background: -moz-linear-gradient(top, #faa51a, #f47a20);\
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#faa51a', endColorstr='#f47a20');\
                \
            }\
            a.link875:hover {\
                background: #f47c20;\
                background: -webkit-gradient(linear, left top, left bottom, from(#f88e11), to(#f06015));\
                background: -moz-linear-gradient(top, #f88e11, #f06015);\
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f88e11', endColorstr='#f06015');\
                \
            }\
            a.link875:active {\
                color: #fcd3a5;\
                background: -webkit-gradient(linear, left top, left bottom, from(#f47a20), to(#faa51a));\
                background: -moz-linear-gradient(top, #f47a20, #faa51a);\
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f47a20', endColorstr='#faa51a');\
                \
            }\
        ";
        document.evaluate("//head", document, null, 9, null).singleNodeValue.appendChild(style);
        link.className = 'link875';
    }
}());
