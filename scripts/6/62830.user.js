// ==UserScript==
// @name           Collapse all comments by default
// @namespace      http://reddit.com/
// @description    Collapses all comments on reddit by default
// @include        http://*.reddit.com/*/comments/*
// ==/UserScript==

(function($){$('div.noncollapsed').find('.expand').click();})(unsafeWindow.jQuery);