// KrautZip
// Copyright (c) 2010 Berlinbernd
// Released under the GNU Lesser General Public License
// http://www.gnu.org/copyleft/lgpl.html
//
// ==UserScript==
// @name           KrautZip
// @namespace      http://dieweltistgarnichtso.net
// @description    Zip redundant content.
// @include        http://krautchan.net/*
// @include        http://krautchan.net/*/*
// @include        http://krautchan.net/*/*/*
// @include        http://krautchan.net/*/*/*/*
// @include        http://www.krautchan.net/*
// @include        http://www.krautchan.net/*/*
// @include        http://www.krautchan.net/*/*/*
// @include        http://www.krautchan.net/*/*/*/*
// ==/UserScript==

// the following function was taken from jsolait <http://jsolait.net/>
// LZW-compress a string
function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

function zip_all() {
    var allPosts;
    allPosts = document.evaluate(
        '//*[starts-with(@id, "post_text")]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    var thisPost;
    for (var i = 0; i < allPosts.snapshotLength; i++) {
        thisPost = allPosts.snapshotItem(i);
        postText = thisPost.innerHTML;
        if (postText == '') {
            // lzw_encode chokes on zero-lenght strings, skip iteration
            continue;
        }
        ratio = postText.length / lzw_encode(postText).length;
        if (ratio < 3) {
            // everything went better than expected
        } else {
            thisPost.innerHTML = '<span style="color:#ff0000; font-weight: bold">(ZIP)</span>';
        }
    }
}

document.addEventListener("DOMContentLoaded", zip_all, false);
