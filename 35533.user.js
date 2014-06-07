// ==UserScript==
// @name           2shared-autostart download
// @namespace      #avg
// @description    Automatically starts the download
// @include        http://*2shared.com/file/*
// @version        0.1
// ==/UserScript==
location.href=/http[^"]+/i.exec(document.evaluate("//script[2]",document,null,2,null).stringValue)[0]