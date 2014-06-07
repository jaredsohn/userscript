// ==UserScript==
// @name        Thread Hider
// @namespace   https://userscripts.org/users/600032
// @description What-x Thread hider
// @grant       GM_getValue
// @grant       GM_setValue
// @include     http*://what.cd/forums.php?action=viewforum&forumid=*
// @version     0.3 alpha
// ==/UserScript==

var $ = unsafeWindow.jQuery;

//Custom thread hiding
//Templates
//$('a[href="forums.php?action=viewthread&threadid=XXXXXX"]').parent().parent().parent().parent().remove();
//$('td > a[href="user.php?id=XXXXXX"]').parent().parent().remove();

//Thread
//$('a[href="forums.php?action=viewthread&threadid=188172"]').parent().parent().parent().parent().remove();

//User (thread starter)
//$('td > a[href="user.php?id=392499"]').parent().parent().remove();

//Read stickies
GM_setValue('hidereadsticky', true);
//GM_setValue('hidereadsticky', false);

//Unread threads
GM_setValue('hideunread', false);
//GM_setValue('hideunread', true);

//Read threads
GM_setValue('hideread', false);
//GM_setValue('hideread', true);


//Hide read stickies
if (GM_getValue('hidereadsticky', true) == true) {
    $('.read_sticky').parent().remove();
    $('.read_locked_sticky').parent().remove();
}

if (GM_getValue('hideread', true) == true) {
    $('.read').parent().remove();
}

if (GM_getValue('hideunread', true) == true) {
    $('.unread').parent().remove();
}