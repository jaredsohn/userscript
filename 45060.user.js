// ==UserScript==
// @name           What.cd? Posts: Drop multiple in same thread
// @namespace      http://death2y.uuuq.com/
// @description    Shows only the latest post you made in a thread when browsing your posts page
// @include        http*://*what.cd/userhistory.php?*action=posts*
// ==/UserScript==

function oc(a) {//Thanks: http://snook.ca/archives/javascript/testing_for_a_v/
    var o = {};
    for(var i=0;i<a.length;i++)
        o[a[i]]='';
    return o;
}

function extractUrlData(url) {
    url = url.split("?")[1];
    var variables = url.split("&");
    var variablesObj = new Object();
    for (i in variables) {
        variables[i] = variables[i].split("=");
        variablesObj[unescape(variables[i][0])] = unescape(variables[i][1]);
    }
    return variablesObj;
}

var posts = document.getElementsByTagName("table");
var threads = new Array(); //This is the array we will be using to store what threads have replies

for (j in posts) {
    var url = posts[j].getElementsByTagName("a")[0].href;
    var data = extractUrlData(url);
    //Check if it has come up already
    if ( data['threadid'] in oc(threads) ) {
        posts[j].style.display = "none";
    } else {
        //This is the newest one on the page
        threads.push(data['threadid'])
        //GM_log(posts[j].getElementsByTagName("a")[0].innerHTML);
    }
}