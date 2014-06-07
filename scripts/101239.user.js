// ==UserScript==
// @name           Google like
// @namespace      *google.com/search*
// @description    Adds Facebook like button to Google search results
// ==/UserScript==

var $;

// add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js'; // latest 1.x.x of jQuery
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// check if jQuery has been loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        runScript();
    }
}

// logging function
function log(message) {
    unsafeWindow.console.log(message);
}

// actual script code
function runScript() {
    $(document).ready(function() {
        // grab the URL
        var url = '';
    
        //log($('div.vsc'));
    
        $('div.vsc').each(function(key, obj) {
            // extract the URL
            var url = $('a.l', obj)[0].href;
            
            // URL encode
            url = url.replace(/:/g, '%3A');
            url = url.replace(/\//g, '%2F');
            url = url.replace(/\?/g, '%3F');
            url = url.replace(/=/g, '%3D');
            url = url.replace(/&/g, '%26');
            url = url.replace(/\ /g, '%20');
        
            // create the like button code
            var likeButtonCode = '<iframe src="http://www.facebook.com/plugins/like.php?href=' + url + '&amp;layout=button_count&amp;show_faces=false&amp;width=90&amp;action=like&amp;font&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe>';
        
            // append the like button
            $('span.tl', obj).append(likeButtonCode);
        });
    });
}
