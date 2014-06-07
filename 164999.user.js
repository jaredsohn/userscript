// ==UserScript==
// @name           Upvote

// @namespace      http://localhost
// @description    Upvote

// @include        http://imgur.com/*

// ==/UserScript==


var arrow = document.getElementsByClassName('arrow up');
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
arrow = document.getElementsByClassName('arrow up');
if (comment_load != null) {
Time = 0;
}
window.scrollBy(0,1000);


for (var i=0; i<arrow.length;i++){
if (arrow[i].className != 'arrow up pushed') {
check(arrow[i]);
Downvote++;
}
}
Time++;
}


//27945 StelFury
//2,013 DinoShowdown


