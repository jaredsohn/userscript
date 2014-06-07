// ==UserScript==
// @name          Remove devexpress trial bar
// @namespace     http://userscripts.org/scripts/source/117937.user.js
// @description   Removes the devexpress trial bar at top of page
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       http://localhost*
// ==/UserScript==


setTimeout("alert('hello')",1000);


$('div').each(function (i,n){
    if($(n).css('z-index')==100000 ){        
        $(n).css('display','none')
    }else{
        // id or class exists
    }
})


