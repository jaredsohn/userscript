// ==UserScript==
// @name CSS3 URL Hover
// @description Testing in CSS3
// ==/UserScript==

var fb = escape(window.top.location);
if(fb.match("facebook.com")) {
  document.write("
<style>
  a:hover {
    -webkit-animation-name: myfirst;
    -webkit-animation-duration: 5s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-delay: 0s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -webkit-animation-play-state: running;
  }
  @-webkit-keyframes myfirst  {
   0%   {background:red;}
  50%   {background:yellow;}
  100%  {background:green;}
  }
</style>");
}