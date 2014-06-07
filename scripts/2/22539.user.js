// ==UserScript==
// @auther Atushi Yamazaki
// @name Little Better GSearch Results
// @namespace http://atushiyamazaki.blogspot.com/
// @description little better for google search results
// @include http://www.google.*/search*
// @include https://www.google.*/search*
// @version 0.0.09
// ==/UserScript==
var DEFAULT_TEXT_BELOW_THE_TITLE_WIDTH = '60';
var ORIGINAL_TEXT_BELOW_THE_TITLE_WIDTH = '42';
var KEY_CODE = {
    P: 80, // Page
    L: 76, // last
    W: 87, // width of text below the title
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57
};
 
/*
* Scroll Event
/*--------------------*/
var body = document.getElementsByTagName('body')[0];
var p = body.getElementsByTagName('p');
this.scroll = function() { rsChange(); }
window.addEventListener('scroll', this.scroll, false);
var lastPage = '';
var textBelowTheTitleWidth = {
    then: ORIGINAL_TEXT_BELOW_THE_TITLE_WIDTH,
    now: DEFAULT_TEXT_BELOW_THE_TITLE_WIDTH,
    set: function() {
    for (var i = 0; i < document.styleSheets[0].cssRules.length; i++) {
        if (document.styleSheets[0].cssRules[i].cssText.indexOf('.s') != -1
         && document.styleSheets[0].cssRules[i].cssText.indexOf('max-width') != -1
         && document.styleSheets[0].cssRules[i].cssText.indexOf(textBelowTheTitleWidth.then + 'em') != -1) {
          document.styleSheets[0].cssRules[i].style.cssText = document.styleSheets[0].cssRules[i].style.cssText.replace(textBelowTheTitleWidth.then, textBelowTheTitleWidth.now);
        }
    }
}
 
};
 
function setPageId() {
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
 
function rsChange() {
    setPageId();
    textBelowTheTitleWidth.set();
}
 
/*
* Key Down Event
/*--------------------*/
var idKey = '';
window.addEventListener('keydown', function(e) { event((e.keyCode) ? e.keyCode : e.charCode); }, false);
function event(keyCode) {
 
    if (KEY_CODE.P == keyCode) {
        idKey = 'page' + idKey;
        if (focusFlag == 0) {
            if (document.getElementById(idKey)) window.scrollTo(0, document.getElementById(idKey).offsetTop);
            if ('page1' == idKey) window.scrollTo(0, document.getElementById('res').offsetTop);
        }
        idKey = '';
    } else if (KEY_CODE.W == keyCode) {
        if (idKey != '') {
            textBelowTheTitleWidth.then = textBelowTheTitleWidth.now;
            textBelowTheTitleWidth.now = idKey;
            textBelowTheTitleWidth.set();
        }
        idKey = '';
    } else if (KEY_CODE.L == keyCode) {
        idKey = lastPage;
    } else if (KEY_CODE.ZERO == keyCode) {
        idKey = idKey + '0';
    } else if (KEY_CODE.ONE == keyCode) {
        idKey = idKey + '1';
    } else if (KEY_CODE.TWO == keyCode) {
        idKey = idKey + '2';
    } else if (KEY_CODE.THREE == keyCode) {
        idKey = idKey + '3';
    } else if (KEY_CODE.FOUR == keyCode) {
        idKey = idKey + '4';
    } else if (KEY_CODE.FIVE == keyCode) {
        idKey = idKey + '5';
    } else if (KEY_CODE.SIX == keyCode) {
        idKey = idKey + '6';
    } else if (KEY_CODE.SEVEN == keyCode) {
        idKey = idKey + '7';
    } else if (KEY_CODE.EIGHT == keyCode) {
        idKey = idKey + '8';
    } else if (KEY_CODE.NINE == keyCode) {
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
 