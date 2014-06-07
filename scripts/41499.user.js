// ==UserScript==
// @auther         Atushi Yamazaki
// @name           AutoPagerize4Shortcut
// @namespace      http://atushiyamazaki.blogspot.com/
// @description    AutoPagerize for Shortcut
// @include        http://*
// @include        https://*
// @exclude        https://mail.google.com/*
// @exclude        http://b.hatena.ne.jp/*
// @version        0.0.01 
// ==/UserScript==

/* 
 * Scroll Event
/*--------------------*/
var body = document.getElementsByTagName('body')[0];
var p = body.getElementsByTagName('p');
this.scroll = function() { rsChange(); }
window.addEventListener('scroll', this.scroll, false);
var lastPage = ''
function rsChange() {
    // add page id
    if (p) {
        for (var i = 0; i < p.length; i++) {
            if (p.item(i).firstChild) {
                if (p.item(i).firstChild.nodeValue == 'page: ') {
                    if (p.item(i).childNodes[1].textContent) {
                        p.item(i).id = 'page' + p.item(i).childNodes[1].textContent;
                        lastPage = p.item(i).childNodes[1].textContent;
                    }
                }
            }
        }
    }
}

/* 
 * keyCode
/*--------------------*/
KCODE = {
    P:80, // Page 
    L:76, // last
    ZERO:48,
    ONE:49,
    TWO:50,
    THREE:51,
    FOUR:52,
    FIVE:53,
    SIX:54,
    SEVEN:55,
    EIGHT:56,
    NINE:57
};

/* 
 * Key Down Event
/*--------------------*/
var idKey = '';
window.addEventListener('keydown', function(e) { event((e.keyCode)? e.keyCode: e.charCode); }, false);
function event(keyCode) {
    if (KCODE.P == keyCode) {
        idKey = 'page' + idKey;
        if (focusFlag == 0) {
            if (document.getElementById(idKey)) window.scrollTo(0,document.getElementById(idKey).offsetTop);
            if ('page1' == idKey) {
                if (location.host.indexOf('www.google.') != -1 && location.pathname.indexOf('/search') != -1) {
                    // google search
                    window.scrollTo(0,document.getElementById('res').offsetTop);
                } else {
                    // other
                    window.scrollTo(0,body.clientTop);
                }
            }
        }
        idKey = '';
    } else if (KCODE.L == keyCode) {
        idKey = lastPage;
    } else if (KCODE.ZERO == keyCode) {
        idKey = idKey + '0';
    } else if (KCODE.ONE == keyCode) {
        idKey = idKey + '1';
    } else if (KCODE.TWO == keyCode) {
        idKey = idKey + '2';
    } else if (KCODE.THREE == keyCode) {
        idKey = idKey + '3';
    } else if (KCODE.FOUR == keyCode) {
        idKey = idKey + '4';
    } else if (KCODE.FIVE == keyCode) {
        idKey = idKey + '5';
    } else if (KCODE.SIX == keyCode) {
        idKey = idKey + '6';
    } else if (KCODE.SEVEN == keyCode) {
        idKey = idKey + '7';
    } else if (KCODE.EIGHT == keyCode) {
        idKey = idKey + '8';
    } else if (KCODE.NINE == keyCode) {
        idKey = idKey + '9';
    } else {
        idKey = '';
    }
}

/* 
 * Focus Event
/*--------------------*/
var focusFlag = 0;
var q = document.getElementsByName('q');
if (q) {
    for (var i = 0; i < q.length; i++) {
	q.item(i).addEventListener("click", function() { focusFlag = 1; }, false);
	q.item(i).addEventListener("blur", function() { focusFlag = 0; }, false);
    }
}

rsChange();

