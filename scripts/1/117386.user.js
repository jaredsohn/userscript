// <![CDATA[
// ==UserScript==
// @name          Simple Clock by Ardor
// @author        Ardor
// @version       2011-11-06
// @namespace     *
// @description   places a flash Clock in window
// @include       *
// ==/UserScript== 

/* for top window only */
if(window.parent==self)
{
var docBody = document.body;
var myClock = document.createElement('embed');
myClock.id = "myClock";
myClock.border = 'no';
myClock.style.position = 'fixed';
myClock.style.zIndex = 10000;


/* Here u set prefered position u can use top, left , right or bottom */
myClock.style.top = '20px';
myClock.style.right = '5px';


myClock.src = 'http://flash-clocks.com/free-flash-clocks-blog-topics/free-flash-clock-97.swf';
//myClock.src = 'http://flash-clocks.com/free-flash-clocks-blog-topics/free-flash-clock-175.swf';
myClock.height = '200';
myClock.width = '200';
myClock.setAttribute('wmode','transparent');

docBody.appendChild(myClock);
}