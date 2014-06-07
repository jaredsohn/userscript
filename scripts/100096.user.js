// ==UserScript==
// @name           Remove - Welcome to the #New Twitter!
// @description    Removes the annoying 'Welcome to the #New Twitter' bar at the top of the screen.
// @author         South Somewhere
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=7981358aef708e92eeadd4422aed9e5e&r=PG&s=64&default=identicon
// @require        http://sizzlemctwizzle.com/updater.php?id=100096&days=1&show
// @include        *twitter.com/*
// @version        v1.0
// ==/UserScript==

GM_addStyle(
'#welcome-banner-outer, .banner-outer {display:none !important;}'
);