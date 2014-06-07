// ==UserScript==
// @name           Wyszukiwarka w szukajce
// @namespace      http://darkwarez.pl/
// @include        http://*darkwarez.pl/forum/search.php?mode=results
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
       
        catFirst = $(".forumlink a:first").attr("href");
        catFirst = catFirst.replace('viewforum.php?f=', '');
        
        catLast = $(".forumlink a:last").attr("href");
        catLast = catLast.replace('viewforum.php?f=', '');
        
        if(catFirst == catLast) {
        $('head').append('<link rel="stylesheet" href="http://exohm.pl/dw/style.css" type="text/css">');
        $('body').append('<form method="post" action="search.php?mode=results"><div id="search_speed"><input type="hidden" name="search_forum" value="'+catFirst+'"><input type="hidden" name="show_results" value="topics"><input type="hidden" name="search_terms" value="all"><input type="hidden" name="only_topics" value="topics"><input type="hidden" name="search_fields" value="all"></form></div>');
        $('#search_speed').append('<input type="text" value="Szukaj..." name="search_keywords" onClick="if(this.value=\'Szukaj...\')this.value=\'\'">');
        $('#search_speed').append('<input type="submit" value="" name="submit">');
        }
        
    }