// ==UserScript==
// @name        moviesource
// @namespace   cpuidle
// @include     http://moviesource.to/protection/folder*.html
// @include     http://uploaded.net/404
// @include     http://uploaded.net/file/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant       GM_openInTab
// ==/UserScript==

// file not found
if (document.URL == 'http://uploaded.net/404') {
    window.close();
    return;
}

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
    if (document.URL.match('/uploaded.net\/file/')) {
        // FILE
        var button = $('input.prem').parent().submit();
        window.close();
    }
    else {
        // FOLDER
        var button = $('input#submit');
        
        if (button.length) {
            // open regular download page
            button.parent().submit();
        }
        else {
            // add Load All button
            $('body').append('<input type="button" value="Load All" id="gmLoadAll" />');
            
            // load
            $('#gmLoadAll').click(function() {
                $('div.container a').each(function(i, el) {
                    GM_openInTab($(el).attr("href"));
                });
                window.close();
                return(false);
            });
            
            $('#gmLoadAll').click();
        }
    }
});
