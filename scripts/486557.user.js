// ==UserScript==
// @name       usb_bezeq
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/MNU_menu_sta.htm*
// @copyright  2012+, You
// ==/UserScript==

var upnp = document.querySelector('[href="UPNP_upnp.htm"]').parentNode.parentNode
var tr = document.createElement("tr")
tr.innerHTML = '<TD vAlign=top><IMG height=7 alt="" src="redbull.gif" width=7 align=top vspace=6></TD><TD><A href="USB_settings.htm" target=formframe>USB Settings</A></TD>'
upnp.parentNode.insertBefore(tr,upnp.nextSibling)