// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           deviantART: complete outgoing link
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Display the complete link on outgoing link warning pages on deviantART
// @include        http://www.deviantart.com/users/outgoing?*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

document.addEventListener("load", changeLinkText(), false);

function changeLinkText() {
var elem = document.getElementsByClassName("gmbutton2c")[0];
var href = elem.getAttribute("href");
elem.innerHTML = "Continue to <strong>" + href + "</strong>";
elem.setAttribute("id", "fulllinkbutton");
var style = document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));
style.textContent = "#fulllinkbutton {background: rgb(181, 198, 181) -moz-linear-gradient(rgb(199, 213, 198), rgb(181, 198, 181));}"
style.textContent += "#fulllinkbutton:hover {background: rgb(201, 218, 201) -moz-linear-gradient(rgb(219, 233, 218), rgb(201, 218, 201));}"
style.textContent += "#fulllinkbutton:active {background: rgb(231, 248, 231) -moz-linear-gradient(rgb(201, 214, 197), rgb(231, 248, 231));}"
style.textContent += "#fulllinkbutton {border-radius: 6px; border: 1px solid rgb(139, 166, 139); -moz-border-top-colors: rgb(139, 166, 139) rgb(229, 231, 228); border-top-width: 2px; height: 24px; line-height: 24px;}";
document.getElementsByClassName("gr-box")[0].parentNode.setAttribute("style", "min-width: 600px; max-width: 100%; margin-top: 20px");
}