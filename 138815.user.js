// ==UserScript==
// @name        Block DK
// @namespace   BlockDK
// @description Block dark knight rises
// @include     https://twitter.com*
// @include     http://twitter.com*
// @version     1
// ==/UserScript==


setTimeout( function(){
    data = document.querySelectorAll(".trends li.js-trend-item");
    if (data.length > 0){
        remove_dark_knight(data);
    } else {
        setTimeout(arguments.callee , 500);
    }
} , 500);

setTimeout( function(){
    data = document.querySelectorAll("p.js-tweet-text");
    if (data.length > 0){
        remove_dark_knight(data);
    } else {
        setTimeout(arguments.callee , 500);
    }
} , 500);

function remove_dark_knight(el){
    for(i=0; i<el.length; i++){
        curr = el[i];
        if(curr.dataset['trendName']){
            currTrend = curr.dataset['trendName'];
        } else {
            currTrend = curr.innerHTML;
        }

        currTrend = currTrend.split(' ').join('').toLowerCase();
        if(currTrend.match(/(batman|darkknight|tdkr)/g)){
            curr.style.display = 'none';
        }
    }
}
