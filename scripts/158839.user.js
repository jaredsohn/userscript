// ==UserScript==
// @name        Twitter Share for Reddit
// @namespace   505469
// @description Adds a share to twitter button to reddit posts.
// @include     http://www.reddit.com/*
// @version     1.0
// @grant       none
// ==/UserScript==



function main () {
    /*--- Put all of your code here.
        Use jquery with $ or however the target page uses it.
    */


$('div.link.thing').each(function() {
    var link = $(this);
    var t = link.find('p.title').first().children(":first");
    var title = t.attr('href');
    if(title[0] == '/')
        title = "http://reddit.com"+title;
    link.find('ul.flat-list.buttons').
         append('<li><img src="http://www.lesker.com/newweb/gif/Icon_Twitter_12x12.png"></img><a target="_blank" href="http://twitter.com/intent/tweet?text='+encodeURIComponent(title)+' via @Reddit"> Share with Twitter</a></li>');
});




}

function addJS_Node (text, s_URL, funcToRun) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

addJS_Node (null, null, main);

