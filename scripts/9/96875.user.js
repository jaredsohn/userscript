// ==UserScript==
// @name           Force forum.P30World.net
// @author         adrenaline
// @namespace      http://forum.p30world.com/member.php?u=273634
// @description    Redirects all P30World forum links to .net domain
// @include        http://forum.p30world.com/*
// @include        http://forum.p30world.ir/*
// @include        http://www.forum.p30world.com/*
// @include        http://www.forum.p30world.ir/*
// ==/UserScript==

(function() {
    var redirectTo = location.href;
    redirectTo = redirectTo.replace(/forum.p30world\.com|forum.p30world\.ir/, 'forum.p30world.net');
    if ( redirectTo != location.href ) location.href = redirectTo;
}) ();