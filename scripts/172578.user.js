// ==UserScript==
// @name        toi_cleaner
// @namespace   amyth
// @description cleans unwanted ads and comments from toi
// @include     http://timesofindia.indiatimes.com/*
// @include     http://timesofindia.indiatimes.com
// @version     1
// ==/UserScript==

var googl = document.getElementById('google_image_div');
if (googl) {
    googl.parentNode.removeChild(googl);
}

var social = document.getElementById('commentWrapper');
if (social) {
    social.parentNode.removeChild(social);
}

var sharebar = document.getElementById('sharebar');
if (sharebar) {
    sharebar.parentNode.removeChild(sharebar);
}

var postCmtIn1 = document.getElementById('postCmtIn1');
if (postCmtIn1) {
    postCmtIn1.parentNode.removeChild(postCmtIn1);
}
var dfp_searchlink = document.getElementById('dfp_searchlink');
if (dfp_searchlink) {
    dfp_searchlink.parentNode.removeChild(dfp_searchlink);
}

var follow_srch = document.getElementById('follow_srch');
if (follow_srch) {
    follow_srch.parentNode.removeChild(follow_srch);
}

var backgroundPopup = document.getElementById('backgroundPopup');
if (backgroundPopup) {
    backgroundPopup.parentNode.removeChild(backgroundPopup);
}

var commentBox = document.getElementById('populatecomment');
if (commentBox) {
    commentBox.parentNode.removeChild(commentBox);
}

var commentBox2 = document.getElementById('cmtMainBox');
if (commentBox2) {
    commentBox2.parentNode.removeChild(commentBox2);
}

var addgutter = document.getElementById('addgutter');
if (addgutter) {
    addgutter.parentNode.removeChild(addgutter);
}



var elements = document.getElementsByClassName("tpgry");

for (var i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);

}


var topb = document.getElementsByClassName('tpgry');
for (var i = 0; i < topb.length; i++) {
    topb[i].parentNode.removeChild(topb[i]);

}

var topw = document.getElementsByClassName('toprtnw1');
for (var i = 0; i < topw.length; i++) {
    topw[i].parentNode.removeChild(topw[i]);

}


var tpgry = document.getElementsByClassName('tpgry');
for (var i = 0; i  <topw.length; i++) {
    tpgry[i].parentNode.removeChild(tpgry[i]);

}
var foot = document.getElementsByClassName('footer_slider');
for (var i = 0; i  <foot.length; i++) {
    foot[i].parentNode.removeChild(foot[i]);

}
var tpt = document.getElementsByClassName('timespoint_block');
for (var i = 0; i  <tpt.length; i++) {
    tpt[i].parentNode.removeChild(tpt[i]);

}

var fir = document.getElementsByClassName('flR rightpart');
for (var i = 0; i  <fir.length; i++) {
    fir[i].parentNode.removeChild(fir[i]);

}

var clearfix = document.getElementsByClassName('clearfix');
for (var i = 0; i  <clearfix.length; i++) {
    clearfix[i].parentNode.removeChild(clearfix[i]);

}