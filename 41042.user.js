// ==UserScript==
// @name           Newgrounds: TomFulp you.
// @author      jcgurango
// @description    It changes your login box username as "TomFulp". Right now that's all it does. Next feature: Forum/BBS posts as TomFulp.
// @include         http://*.newgrounds.com/*
// @exclude        http://www.newgrounds.com/*
// @exclude        http://iamgrimreaper.newgrounds.com/*
// @exclude        http://jcgurango.newgrounds.com/*
// @exclude        http://bnwproductions.newgrounds.com/*
// ==/UserScript==

document.getElementById("loginbox_username").innerHTML = "<a href='http://tomfulp.newgrounds.com/'>TomFulp</a>";