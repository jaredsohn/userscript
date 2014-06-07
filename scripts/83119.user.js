// ==UserScript==
// @name           WhoToFollowMustDie
// @namespace      http://jasonfager.com
// @description    Disable the annoying "Who to follow" box on Twitter.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

GM_addStyle('#recommended_users { display: none; }');