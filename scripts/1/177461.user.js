// ==UserScript==
// @name        FB_MBTI_Identifier
// @namespace   eustache
// @description Places your MBTI type in front of your comments in MBTI groups.
// @include     https://www.facebook.com/groups/2224451542/*
// @include     https://www.facebook.com/groups/MainINTJ/*
// @include     https://www.facebook.com/groups/intuitivethinkers/*
// @include     https://www.facebook.com/groups/2207272615/*
// @include     https://www.facebook.com/groups/2224594763/*
// @include     https://www.facebook.com/groups/INFJ.2.0/*
// @include     https://www.facebook.com/groups/2222795904/*
// @include     https://www.facebook.com/groups/MBTIST/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at document-end
// @grant	none
// @updateUrl   http://userscripts.org/scripts/source/177461.user.js
// @version     2
// ==/UserScript==

var TYPE = 'INTP';
var REGEX = /\([IE][NS][TF][PJ]\)\:/;

document.onreadystatechange = function() {
    if ('complete' === document.readyState) {
        main();
        console.log('grease monkey loaded!!!!');
    } else {
        console.log('readyState ===' + document.readyState);
    }
};

document.addEventListener('DOMNodeInserted', main, true);

function main(e) {
    console.log('main has been called!');
    jQuery('.UFIAddCommentInput').each(function(i) {
        this.onclick = function(i) {
            if (REGEX.exec(this.value) === null) {
                this.value = '(' + TYPE + '): ' + this.value;
                console.log('Added type to comment line.');
            }
        };

    });
}


