// ==UserScript==
// @name           VimKeysAnywhere
// @namespace      http://adamv.com/greases/
// @description    Adds vim keys to any HTML Text Area
// @include        http://*reddit.com/*
// ==/UserScript==
//alert("Vim Mode Enabled")
// Author: I didnt write the vi.js script, just this greasemonkey hack
// to add it to reddit.
// i take no responsibility if the author uses it to change your reddit post
// todo: include the acutal vi.js in this script.
html_doc = document.getElementsByTagName('head').item(0)
js = document.createElement('script')
js.setAttribute('language', 'javascript')
js.setAttribute('type', 'text/javascript')
js.setAttribute('src',"http://gpl.internetconnection.net/vi/vi.js")
css = document.createElement('link')
css.setAttribute('rel', 'stylesheet')
css.setAttribute('href', 'http://gpl.internetconnection.net/vi/vi.css')
css.setAttribute('type', 'text/css')
html_doc.appendChild(js)
html_doc.appendChild(css)



//now each text area needs this attribute set.
onfocus="editor(this);"
//for each text area in the document
for (var i=0;i<document.getElementsByTagName("textarea").length;i++) document.getElementsByTagName("textarea")[i].setAttribute("onfocus", "editor(this)")
