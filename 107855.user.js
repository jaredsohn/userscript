// ==UserScript==
// @id             cfakevideosDL
// @name           cfake videos DL Button
// @namespace      cfakevideos
// @description    Adds download button below the video
// @include        http://www.cfake.com/video*
// ==/UserScript==

var flvVars= document.getElementById("s1").getAttribute("flashvars");
flvVars = decodeURIComponent(flvVars.substring(flvVars.lastIndexOf("file=")+42));

button = document.createElement("input");
button.setAttribute("id", "dwlnBtn");
button.setAttribute("value", "Download Movie");
button.setAttribute("type", "button");
button.setAttribute("onClick", "document.location='"+flvVars+"';");
document.getElementById("s1").parentNode.insertBefore(button,document.getElementById("s1").parent);