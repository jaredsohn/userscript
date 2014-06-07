// ==UserScript==
// @name        Fantasy Premier League - Remove Pitch Ad
// @namespace   none
// @description We don't want no stinkin' commercials in our lineup.
// @include     http://fantasy.premierleague.com/*
// @grant       none
// @version     1
// ==/UserScript==

// For reference, this is the CSS that we want to override...
//#ism .ismPitch {
    //background: #dbdbdb url(../img/pitch.png) no-repeat center bottom;
    //height: 480px;
    //margin-bottom: 20px;
//}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#ism .ismPitch {  background: #dbdbdb url(http://img198.imageshack.us/img198/4564/vpad.png) no-repeat center bottom ! important; }');