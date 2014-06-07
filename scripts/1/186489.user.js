// ==UserScript==
// @name           Forum signature
// @description    Automatically adds a signature to posts on the thread.
// @namespace      Andrew
// @include        *.roblox.com/Forum/AddPost.aspx*
// @version        1
// ==/UserScript==

var siggy = "Hi, I just got myself a new signature! :D"

document.getElementById('ctl00_cphRoblox_Createeditpost1_PostForm_PostBody').defaultValue = "\n\n\n" + siggy;
