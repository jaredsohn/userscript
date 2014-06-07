// ==UserScript== 
// @name Youtube logo change 
// @description changes the youtube logo on the old layout page to the new one
// @include http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif* 
// @version 0.2 a
// ==/UserScript==



var pattern1 = "http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"
if(location.href.indexOf(pattern1) == 0){
	location.href = "http://upload.wikimedia.org/wikipedia/commons/thumb/9/98/YouTube_Logo.svg/200px-YouTube_Logo.svg.png";
}