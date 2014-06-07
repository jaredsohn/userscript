// ==UserScript==
// @name           The Student Room Depression Society De-Default-Anoner
// @description    If you post as anon once, you automatically are anon by default. This script changes it back so you are not anon by default. Does not work when reply to one post only (by clicking the 'quote' button by a post). To get around this, use the multi-quote button, and then reply at the bottom / use the 'quick-reply' button on the post, or use my global script.
// @author         Robert Humphries
// @include        http://www.thestudentroom.co.uk/newreply.php?do=postreply&t=1905323
// @include        http://www.thestudentroom.co.uk/newreply.php?do=postreply&t=1989233
// @include        http://www.thestudentroom.co.uk/newreply.php?do=postreply&t=2116013
// @include        http://www.thestudentroom.co.uk/newreply.php?do=postreply&t=2237476
// @include        http://www.thestudentroom.co.uk/newreply.php?do=postreply&t=2348873
// @include        http://www.thestudentroom.co.uk/newreply.php?do=postreply&t=2512424
// @include        http://www.thestudentroom.co.uk/showthread.php?t=1905323&*
// @include        http://www.thestudentroom.co.uk/showthread.php?t=1989233&*
// @include        http://www.thestudentroom.co.uk/showthread.php?t=2116013*
// @include        http://www.thestudentroom.co.uk/showthread.php?t=2237476*
// @include        http://www.thestudentroom.co.uk/showthread.php?t=2348873*
// @include        http://www.thestudentroom.co.uk/showthread.php?t=2512424*
// @version        1.6
// ==/UserScript==

var anon_box = document.getElementById('cb_anonymous');
if(typeof anon_box != 'undefined'){
    if(anon_box.checked){
        anon_box.checked =false;
    }
}