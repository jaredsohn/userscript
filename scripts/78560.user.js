// ==UserScript==
// @name           tinydAmn
// @namespace      24bps.com
// @description    Makes dAmn take up less size in the browser window. By electricnet.
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

// Creating needed CSS styles
tdcss      = document.createElement('link')
tdcss.rel  = "stylesheet"
tdcss.type = "text/css"
tdcss.href = "http://temple.24bps.com/public/tinydamn.css?"+new Date().getDate()
document.getElementsByTagName('head')[0].appendChild(tdcss)

// Manipulate the HTML
tdjs       = document.createElement('script')
tdjs.src   = "http://temple.24bps.com/public/tinydamn.js?"+new Date().getDate()
document.getElementsByTagName('head')[0].appendChild(tdjs)
