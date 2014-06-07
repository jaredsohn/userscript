// ==UserScript==
// @name          Twitter testing script
// @author        Barry Hess
// @namespace     http://bjhess.com
// @description	  Test Twitter user scripts in Fluid and Greasemonkey
// @include       http://twitter.com/*
// ==/UserScript==

function meat() {
  if($('#profile')) {
    alert('yes!');
  }
}

function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = unsafeWindow.jQuery; letsJQuery();
    }
}

function letsJQuery()
{
  meat();
}

if(navigator.appVersion.match('AppleWebKit')) {
  meat();
} else {
  GM_wait();
}