// ==UserScript==
// @name           Twitter chat
// @namespace      http://twitterchat.p.ht/
// @include        http://twitter.com/
// @include        https://twitter.com/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://twitter.com
// @include        https://twitter.com
//@require         http://twitterchat.p.ht/chatstyle.css
//@require         http://twitterchat.p.ht/wp-content/plugins/envolve-chat/envolve_api_client.php
//@require         http://twitterchat.p.ht/wp-content/plugins/envolve-chat/envolve-chat.php
// ==/UserScript==

var $ = unsafeWindow.$, jQuery = $;
$('head').append('<link type="text/css" href="http://twitterchat.p.ht/chatstyle.css" rel="stylesheet" charset="utf-8"><script type="text/javascript" src="http://twitterchat.p.ht/wp-content/plugins/envolve-chat/envolve_api_client.php" charset="utf-8"></script><script type="text/javascript" src="http://twitterchat.p.ht/wp-content/plugins/envolve-chat/envolve-chat.php" charset="utf-8"></script>');