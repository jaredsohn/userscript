// ==UserScript==
// @name           Skocz do
// @namespace      http://darkwarez.pl
// @include        http://*darkwarez.pl/forum/*
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
        $('head').append('<link rel="stylesheet" href="http://exohm.pl/dw/style.css" type="text/css">');
        $('body').append('<div id="box" onMouseOver="box_con.style.visibility=\'visible\';" onMouseOut="box_con.style.visibility=\'hidden\';">Skocz do</div>');
        $('body').append('<div id="box_con" onMouseOver="box_con.style.visibility=\'visible\';" onMouseOut="box_con.style.visibility=\'hidden\';"></div>');
        
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=10"><div class="box_con_b">Info</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=6"><div class="box_con_b">Prosby</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=15"><div class="box_con_b">Problemy</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=12"><div class="box_con_b">Poradniki</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=9"><div class="box_con_b">Gry</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=5"><div class="box_con_b">Filmy</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=8"><div class="box_con_b">Muzyka</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=2"><div class="box_con_b">Programy</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=21"><div class="box_con_b">XXX</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=1"><div class="box_con_b">Inne</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=47"><div class="box_con_b">VIP offtopic</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=50"><div class="box_con_b">Super VIP</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=17"><div class="box_con_b">Games corner</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=19"><div class="box_con_b">Movies corner</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=18"><div class="box_con_b">Music corner</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=48"><div class="box_con_b">Webmastering</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=48"><div class="box_con_b">Sport</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=49"><div class="box_con_b">Humor</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=20"><div class="box_con_b">Grafika</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=44"><div class="box_con_b">Hardware</div></a>');
        $('#box_con').append('<a href="http://darkwarez.pl/forum/viewforum.php?f=7"><div class="box_con_b last">Uwagi</div></a>');
    }
