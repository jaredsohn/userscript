// ==UserScript==
// @name           Blogsport: Bigger posting area
// @description    Resizes post area blogspot.com
// @include        http://www.blogger.com/post-create.g?*
// ==/UserScript==


document.getElementById('richeditorframe').style.width  = "800px";
document.getElementById('richeditorframe').style.height = "800px";

document.getElementById('editarea').style.width = "800px";
document.getElementById('editarea').style.height= "940px";
