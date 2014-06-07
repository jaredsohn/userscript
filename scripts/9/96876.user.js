// ==UserScript==
// @name           Force forum.P30World.com
// @author         adrenaline
// @namespace      http://forum.p30world.com/member.php?u=273634
// @description    Redirects all P30World forum links to .com domain
// @include        http://forum.p30world.net/*
// @include        http://forum.p30world.ir/*
// @include        http://www.forum.p30world.net/*
// @include        http://www.forum.p30world.ir/*
// ==/UserScript==

(function() {
    var redirectTo = location.href;
    redirectTo = redirectTo.replace(/forum.p30world\.net|forum.p30world\.ir/, 'forum.p30world.com');
    if ( redirectTo != location.href ) location.href = redirectTo;
}) ();