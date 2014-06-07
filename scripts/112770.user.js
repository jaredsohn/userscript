// ==UserScript==
// @name           aa
// @namespace      jjj
// @include        // ==UserScript==
// @include        // @name           imgur kagerurufu
// @include        // @namespace      reddit
// @include        // @description    Changes imgur.com links to kageurufu.net/imgur/?
// @include        // @include        http://reddit.com/*
// @include        // @include        http://www.reddit.com/*
// @include        // ==/UserScript==
// @include        var anchors = document.getElementsByTagName('a');
// @include        for (var i = 0; i < anchors.length; ++i)
// @include        {
// @include        var a = anchors[i];
// @include        if (a.href && a.href.indexOf('http://imgur.com/') == 0)
// @include        {
// @include            a.href = a.href.replace('http://imgur.com/', 'http://kageurufu.net/imgur/?');
// @include        }
// @include        if (a.href && a.href.indexOf('http://i.imgur.com/') == 0)
// @include        {
// @include            a.href = a.href.replace('http://i.imgur.com/', 'http://kageurufu.net/imgur/?');
// @include        }
// @include        }
// @exclude        // ==UserScript==
// @exclude        // @name           imgur kagerurufu
// @exclude        // @namespace      reddit
// @exclude        // @description    Changes imgur.com links to kageurufu.net/imgur/?
// @exclude        // @include        http://reddit.com/*
// @exclude        // @include        http://www.reddit.com/*
// @exclude        // ==/UserScript==
// @exclude        var anchors = document.getElementsByTagName('a');
// @exclude        for (var i = 0; i < anchors.length; ++i)
// @exclude        {
// @exclude        var a = anchors[i];
// @exclude        if (a.href && a.href.indexOf('http://imgur.com/') == 0)
// @exclude        {
// @exclude            a.href = a.href.replace('http://imgur.com/', 'http://kageurufu.net/imgur/?');
// @exclude        }
// @exclude        if (a.href && a.href.indexOf('http://i.imgur.com/') == 0)
// @exclude        {
// @exclude            a.href = a.href.replace('http://i.imgur.com/', 'http://kageurufu.net/imgur/?');
// @exclude        }
// @exclude        }
// ==/UserScript==