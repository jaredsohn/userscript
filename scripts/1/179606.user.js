// ==UserScript==
// @id             forums.whirlpool.net.au-0e64fbe0-59f7-4ed7-b436-c886f4e7f426@meh
// @name           whirlpool - movie links at top of watched page
// @version        1.0
// @namespace      meh
// @author         Yansky
// @description    
// @updateURL	http://userscripts.org/scripts/source/179606.user.js
// @include        http://forums.whirlpool.net.au/forum/?action=watched
// @include        https://forums.whirlpool.net.au/forum/?action=watched
// @include        http://forums.whirlpool.net.au/forum/?action=watched*
// @include        https://forums.whirlpool.net.au/forum/?action=watched*
// @run-at         document-end
// ==/UserScript==

var movSecTitleLink = document.querySelector('#threads a[href="/forum/58"]'),
    threadsTR = document.querySelectorAll('#threads form table tbody tr'),
    threadsTB = document.querySelector('#threads form table tbody'),
    movSecTitleLink_p_p = movSecTitleLink.parentNode.parentNode,
    isMovieSection = false;


[].forEach.call(threadsTR,function(item,index,arr){

    if(isMovieSection){

        if(item.className !== 'section'){

            threadsTB.insertBefore(item, threadsTR[0]);
        
        }
        else if(item.className === 'section'){

            isMovieSection = false;
        
        }
    
    }
    if(item === movSecTitleLink_p_p){

        threadsTB.insertBefore(movSecTitleLink_p_p, threadsTR[0]);
        isMovieSection = true;
    
    }

});



