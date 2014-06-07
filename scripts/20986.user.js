// ==UserScript==
// @name           InternetTabletTalk
// @namespace      MaemoForums
// @description    Make InternetTabletTalk more legible on an Internet Tablet
// @include        http://www.internettablettalk.com/*
// ==/UserScript==

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    alert(document.cookie);
};

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};

if (readCookie('bbstyleid') != '1') {
    var url = window.location.toString();
    var fragment = "";
    url = url.split("#");
    if (url[1]) {
        fragment = "#" + url[1];
    };
    url = url[0];

    var url2 = url.replace(/styleid=[0-9]+/,'styleid=1');
    if (url==url2) {
        if (!/.*\?/.test(url)) { url2 += '?' };
        if (!/.*[?&]$/.test(url)) { url2 += '&' };
        url2 += 'styleid=1';
    }
    window.location = url2;
};

function getPath(path) {
    return document.evaluate(path, document, null, XPathResult.ANY_TYPE,null).iterateNext();
};

const TOPIC_STYLES = [
   ".alt1 { font-size: 120%; }",
   "a:hover { color: #004 !IMPORTANT;}",
   "td.alt1 a { font-size: 110%; }",
   "td#mainbody div.padding { padding: 0 !IMPORTANT; }",
   "div.page > div, div.mb7, div.hd4 { padding: 0 !IMPORTANT; }",
   "#home, #forum, #wiki, #sw, #gallery, #contact { top: 57px !IMPORTANT; }",
   "div#header, div#header-body { height:100px !IMPORTANT; background-position: 0pt -24px !IMPORTANT;}",
   ].join("\n");

function cleanup() {
    var bad = [ "//div[@class='advert']/br", "//div[@style='padding: 0px 25px;']/br"];
    GM_addStyle(TOPIC_STYLES);
    for (var i = 0; i < bad.length; i++) {
        var el = getPath(bad[i]);
        if (el) {
            el.parentNode.removeChild(el);
        };
    };
};

cleanup();
