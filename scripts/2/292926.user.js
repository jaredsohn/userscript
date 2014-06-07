// ==UserScript==
// @name           Add facebook sharer links to reddit with IMG
// @description    A brief description of your script
// @author         Jonno and Changed by Edputt
// @include        http://*.reddit.com/*
// @version        1.1
// ==/UserScript==

$('div.link.thing').each(function() {
    var link = $(this);
    var img = link.find('a.thumbnail').first().children(':first').attr('src');
    var t = link.find('p.title').first().children(":first");
    var title = t.attr('href');
    var text  = t.text();
    if(title[0] == '/')
        title = "http://reddit.com"+title;
    link.find('ul.flat-list.buttons').
         append('<li><a target="_blank" href="http://facebook.com/sharer.php?s=100&p[images][0]='+encodeURIComponent(img)+'&p[url]='+encodeURIComponent(title)+'&p[title]='+encodeURIComponent(text)+'"><img src="http://fb-school.com/assets/fbschool/images/fbshare.jpg" height="15"></a></li>');
});