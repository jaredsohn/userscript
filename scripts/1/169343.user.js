// ==UserScript==
// @name           Twitter c
// @namespace      http://twitterchat.p.ht/
// @include        http://twitter.com/
// @include        https://twitter.com/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://twitter.com
// @include        https://twitter.com
// @require        http://twitterchat.p.ht/wp-content/plugins/envolve-chat/envolve_api_client.php
// @require        http://twitterchat.p.ht/wp-content/plugins/envolve-chat/envolve-chat.php

// ==/UserScript==

<script type="text/javascript">
var envoSn=118281;
var envProtoType = (("https:" == document.location.protocol) ? "https://" : "http://");
document.write(unescape("%3Cscript src='" + envProtoType + "d.envolve.com/env.nocache.js' type='text/javascript'%3E%3C/script%3E"));
</script>