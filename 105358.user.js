// ==UserScript==
// // @name           Buzzfeed - Always Mobile & Proxified
// // @author         Lanulus
// // @namespace      lanulus@gmail.com
// // @description    Automatically redirects to Buzzfeed's mobile page.
// // @include        http://buzzfeed.com/*
// // @include        http://www.buzzfeed.com/*
// // ==/UserScript==


var re = /\?s=mobile/;
if (re.test(location.href) === false) {
   location.replace("https://proxify.com/u?" + location.href + "?s=mobile");
}