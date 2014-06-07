// ==UserScript==
// @id             xvideosDL
// @name           xvideos DL Button
// @namespace      faleij
// @description    Adds download button below the video
// @include        http://www.xvideos.com/video*
// ==/UserScript==
var flvVars= document.getElementById("flash-player-embed").getAttribute("flashvars");
flvVars = decodeURIComponent(flvVars.substring(flvVars.lastIndexOf("flv_url=")+8));
button = document.createElement("input");
button.setAttribute("id", "dwlnBtn");
button.setAttribute("value", "Download Movie");
button.setAttribute("type", "button");
button.setAttribute("onClick", "document.location='"+flvVars+"';");
document.getElementById("flash-player-embed").parentNode.insertBefore(button,document.getElementById("flash-player-embed").parent);