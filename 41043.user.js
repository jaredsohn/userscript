// ==UserScript==
// @name           Newgrounds: bigbadron you.
// @author      jcgurango
// @description    It changes your login box username as "bigbadron". Right now that's all it does. Next feature: Forum/BBS posts as bigbadron.
// @include         *newgrounds*
// ==/UserScript==

document.getElementById("loginbox_username").innerHTML = "<a href='http://bigbadron.newgrounds.com/'>bigbadron</a>";