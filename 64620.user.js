// ==UserScript==
// @name           e-hentai
// @namespace      ehentai
// @include        http://g.e-hentai.org/*
// @include        http://gu.e-hentai.org/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
// ==/UserScript==
//
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
    if (  document.URL.match(/^http:\/\/g.e-hentai.org\/(uploader|tag|\?page=|$)/) ){
        make_poster_view_in_search($);
    }

    }

var debug = 1;
function log( msg){
    if (debug){
        console.debug(msg);
    };
};

function make_large_thumbs()
{
    var COLUMNS = 4;
    var thumb_images = document.querySelectorAll("img[src$='_m.jpg']");
    if (thumb_images.length)
    {
        //var table = document.createElement('table');
        var table = thumb_images[0].offsetParent.offsetParent;
        column_count = 0;
        var row_el = document.createElement("tr");
        table.appendChild( row_el);
        for ( i=0; i <= thumb_images.length; i++)
        {
            img = thumb_images[i];
            if (img)
            {
                var old_td = img.offsetParent;
                old_td.parentNode.removeChild(old_td);
                img.src = img.src.replace("_m.jpg", "_l.jpg");
                if ( column_count == COLUMNS)
                {
                    row_el = document.createElement("tr");
                    table.appendChild(row_el);
                    column_count = 0;
                }
                var td = document.createElement("td");
                td.setAttribute("class","ttd");
                td.appendChild(img.parentNode);
                row_el.appendChild(td);
                column_count++;
            };
        };
    }
}

function make_poster_view_in_search ($) {
    var button = document.createElement('button');
    button.innerHTML = "Show posters";
    button.setAttribute('style','float:left;');
    button.setAttribute('class','show_posters');
    $("table.pt").before(button);
    $("button.show_posters").click(function(){
            var posts_div = $("div.it2");
            for (i=0; i<= posts_div.length;i++ )
            {
                var post_img_div = $(posts_div[i]);
                log(post_img_div);
                if (post_img_div.children('img').length ){
                    var post_img_src = post_img_div.children('img')[0].src
                } else {
                    var post_img_src ="http://gt.ehgt.org:81" +  post_img_div.text().replace(/^init\~(.*)\~.*$/,"$1"); 
                };
                if ( !post_img_div.siblings('img').length )
                    {
                    var post_img = document.createElement('img');
                    post_img.src = post_img_src;
                    post_img.setAttribute('style','float:left');
                    post_img_div.after(post_img);
                        
                } else {
                    post_img_div.siblings('img').toggle();
                };
                //post_img
            };
            });

}

make_large_thumbs();