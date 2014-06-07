// ==UserScript==
// @name           GawkerBlogCookie
// @namespace      mkirkland
// @description    Sets the blog mode cookie for Gawker Media sites.
// @version 0.0.2
// @include	   http://io9.com/*
// @include	   http://gawker.com/*
// @include	   http://gizmodo.com/*
// @include	   http://jalopnik.com/*
// @include	   http://lifehacker.com/*
// @include	   http://deadspin.com/*
// @include	   http://jezebel.com/*
// @include	   http://fleshbot.com/*
// @include	   http://gawker.tv/*
// @include	   http://kotaku.com/*
// ==/UserScript==

(function ()
{
  //expire in the distant future when we have hovercars
  var expires = new Date();
  expires.setDate(expires.getDate + 3650);

  document.cookie = "____GCV=classic;expires="+expires.toUTCString();
  if(document.location.pathname=='/')
    document.location.replace("http://blog."+document.location.hostname);
})();
