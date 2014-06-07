// ==UserScript==
// @name           YouTube Recommended Channel Remover
// @namespace      ltamake
// @description    This extremely simple script removes the annoying sidebar on www.youtube.com/my_subscriptions. Sure, you can hide it, but this is better. I don't want to see those annoying untalented fools who have to pay YouTube to become popular.
// @include        http://*.youtube.*
// @include        https://*.youtube.*
// ==/UserScript==

document.getElementById("yt-admin-recommendations").style.display = "none";
document.getElementById("yt-admin-content").style.borderRight = "1px solid #AAAAAA";
document.getElementById("yt-admin-content").style.borderBottom = "1px solid #AAAAAA";