// ==UserScript==
// @name           Shortnews - Direct Feed redirect
// @namespace      http://www.softcreatr.de
// @author         Sascha Greuel <sascha@softcreatr.de>
// @description    Bypass the waiting time, when visiting Shortnews.de through the RSS-Feed
// @license        Creative Commons Attribution-NonCommercial-NoDerivs 3.0
// @version        1.0.0
// @run-at         document-end
// @include        http*://da.feedsportal.com*
// ==/UserScript==

document.location.replace(document.getElementsByTagName("a")[1].href);