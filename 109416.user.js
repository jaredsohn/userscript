// ==UserScript==
// @name Netflix Watch Instantly Compact View
// @match http://movies.netflix.com/*
// ==/UserScript==

var body = document.getElementsByTagName('body')[0];
if (!!body) body.style.textAlign = 'left';

var pageContent = document.getElementById('page-content');
if (!!pageContent) pageContent.style.textAlign = 'left';

var SLPlayerWrapper= document.getElementById('SLPlayerWrapper');
if (!!SLPlayerWrapper)
{
SLPlayerWrapper.style.textAlign = 'left';
SLPlayerWrapper.style.margin = '0px !important';
SLPlayerWrapper.style.width = 'Auto !important';
}

document.getElementsByTagName('object')[0].style.width = window.innerWidth + 'px !important'; 
document.getElementsByTagName('object')[0].style.height = window.outerHeight + 'px !important';

document.getElementsByTagName('body')[0].style.overflow = 'hidden';

window.toggle = true;

window.onresize = function () { document.getElementsByTagName('object')[0].style.width = window.innerWidth + 'px !important'; document.getElementsByTagName('object')[0].style.height = (window.toggle ? window.outerHeight : window.innerHeight) + 'px !important'; }

window.onkeydown = function (e) {
  if (e.keyCode == 83)
  {
    if (window.toggle)
      document.getElementsByTagName('object')[0].style.height = window.innerHeight + 'px !important';   
    else
      document.getElementsByTagName('object')[0].style.height = window.outerHeight + 'px !important';
    window.toggle = !window.toggle;
  }
}