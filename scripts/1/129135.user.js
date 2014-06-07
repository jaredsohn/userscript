// ==UserScript==
// @name           Tumblr Renamr
// @namespace      http://not-good-with-computer.tumblr.com
// @description    Change URLs into real names or whatever you want.
// @include        http://*.tumblr.com/*
// @include        http://toys.tumblrist.com/audio/*
// @exclude        http://www.tumblr.com/inbox
// @exclude        http://www.tumblr.com/show/text/*
// @exclude        http://www.tumblr.com/show/photos/*
// @exclude        http://www.tumblr.com/show/quotes/*
// @exclude        http://www.tumblr.com/show/videos/*
// @exclude        http://www.tumblr.com/show/links/*
// @exclude        http://www.tumblr.com/show/chats/*
// @exclude        http://www.tumblr.com/dashboard/iframe*
// @exclude        http://*.disqus.com/*
// ==/UserScript==

var names = new Array(
                         "not-good-with-computer/Awesome Bro", "david/My pal David", 
                         "staff/Staff"
                     );

/*********************************************
 DO NOT EFFING TOUCH THE CODE BELOW THIS LINE
*********************************************/

var len = names.length;

var rep = new Array ();
for (i = 0; i < len; i++) {
    rep.push(names[i].split('/'))
}

len = rep.length;

for (i = 0; i < len; i++) {
    var patt = new RegExp("<a href=\"http:\/\/" + rep[i][0] + ".tumblr.com.*\">" + rep[i][0] + "<\/a>", "g");
    
    document.body.innerHTML = document.body.innerHTML.replace(patt,
    "<a href=\"http://" + rep[i][0] + ".tumblr.com\" style=\"border:1px dashed rgba(0, 0, 0, 0.2); padding: 0px 2px 0px 2px; border-radius:6px;text-decoration: none !important;\">" + rep[i][1] + "</a>"
    );
}