// ==UserScript==
// @name           What.cd Single/EP of the Week
// @namespace      http://google.com
// @description    Displays latest single/EP of the week on what.cd homepage
// @include        http*://*what.cd/index.php
// ==/UserScript==
//Thanks to dieselpowered for making it more like the Featured Album box!

function getElementsByClassName(classname, node) {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
    if(re.test(els[i].className))a.push(els[i]);
    return a;
}

//insert new sidebox
var sideBox = document.createElement("div");
sideBox.className = "box";
var statBox = getElementsByClassName("box", false)[1];
statBox.parentNode.insertBefore(sideBox, statBox);

sideBox.innerHTML = '<div class="head colhead_dark">\
<strong>Single/EP of the Week</strong></div>\
<p>Loading, please wait.</p>';

//Load RSS feed
GM_xmlhttpRequest({ method:'get',
    url:'http://dl.dropbox.com/u/2318402/What/singleEpWeek.rss',
    onload: function(response) {
        //Parse feed
        var parser = new DOMParser();
        var feed = parser.parseFromString(response.responseText,
                "application/xml");
        var latestPost = feed.getElementsByTagName("item")[0];
        var title = latestPost.getElementsByTagName("title")[0].textContent;
        var url = latestPost.getElementsByTagName("link")[0].textContent.split(
                ".cd/", 2)[1];
        var cont=latestPost.getElementsByTagName("description")[0].textContent;
        //scale image
        cont = cont.replace(/<img/g, '<img width="100%" ');
        //update box
        sideBox.innerHTML = '' + 
            '<div class="head colhead_dark">'+
                '<strong>Single/EP of the week</strong></div>' +
            '<div class="center pad">' +
                '<a href="'+url+'">'+title+'</a></div>' +
            '<div>'+cont+'</div>' +
            '<div class="center pad">' +
                '<a href="/forums.php?action=viewthread&threadid=71081">' +
                    '<i>Discuss this single/EP here!</i></a></div>';
    }});
