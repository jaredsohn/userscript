// ==UserScript==
// @name           DS - News-In-Title
// @namespace      *
// @description    Version 1.2.0 | Shows in the title of the tab, whether you have new News.
// @author         Ulrich-Matthias Schäfer
// @include        http://*.die-staemme.de*
// ==/UserScript==

// Modifikationen und Weiterverbreitung dieses Scripts benötigen die
// Zustimmung des Autors.
// -----------------------------------------------------------------------------

var $ = unsafeWindow.$;

var url = window.location.href;

if(url.split("village=")[1] == null)
    return;

var welt = url.split(".")[0].replace("http://de", "");
var dorf_ID = url.split("village=")[1].split("&")[0];

var title = $(unsafeWindow.top.document).find('title');
var oldTitle = 'Die St&auml;mme - Welt '+welt;

title.html(oldTitle);

var newTitle = '';
var marqueeTitleOn = false;

unsafeWindow.newsInTitle_getNews = function(){
    $.get(url,function(data){
        ajax = $(data);
        
        var post = ajax.find('.icon.header.new_post').length;
        var msg = ajax.find('.icon.header.new_mail').length;
        var report = ajax.find('.icon.header.new_report').length;
        
        if(post || msg || report)
        {
            $('#menu_row').html(ajax.find('#menu_row').html());
            newTitle = '['+(post+msg+report)+']'+(msg ? ' - Neue Nachricht': '')+(report ? ' - Neuer Bericht': '')+(post ? ' - Neuer Beitrag': '');

            title.html(newTitle);
            if(!marqueeTitleOn)
            {
                unsafeWindow.newsInTitle_marqueeTitle();
                marqueeTitleOn = true;
            }
        }
        
        unsafeWindow.setTimeout(function(){unsafeWindow.newsInTitle_getNews();},10000);
    });
};


unsafeWindow.newsInTitle_marqueeTitle = function()
{
    var count = title.html().substr(1,1);
    var tempTitle = title.html().substr(3);
    
    title.html('['+count+']'+tempTitle.substr(1));
    
    if(tempTitle == '')
        title.html(newTitle);
        
    unsafeWindow.setTimeout(function(){unsafeWindow.newsInTitle_marqueeTitle();},250);
};

unsafeWindow.newsInTitle_getNews();