// ==UserScript==
// @name           DownvoteTest

// @namespace      http://localhost
// @description    DownvoteTest

// @include        http://imgur.com/*

// ==/UserScript==


var arrow = document.getElementsByClassName('arrow down');
var user = document.getElementsByClassName('author');
var Timer = setInterval(function(){scroll()}, 100);
var Time = 0;
var index = -1;
var Downvote = 0;


document.getElementById('topbar').style.position="fixed";


function check(vote) {
var theEvent = document.createEvent("MouseEvent");
theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
vote.dispatchEvent(theEvent);
}
function scroll() 
{
var load = document.getElementById('imagelist-loader');
var comment_load = document.getElementById('loader');

console.log(Downvote);
if (Time >= 10000) 
	{
clearInterval(Timer);
	}
arrow = document.getElementsByClassName('arrow down');
if (comment_load != null) {
Time = 0;
}
window.scrollBy(0,1000);


for (var i=0; i<arrow.length;i++){
if (arrow[i].className != 'arrow down pushed') {
check(arrow[i]);
Downvote++;
}
}
Time++;
}


//27945 StelFury
//2,013 DinoShowdown


