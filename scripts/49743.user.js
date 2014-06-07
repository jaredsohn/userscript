// ==UserScript==
// @name           Eezy Links
// @namespace      http://praga123.deviantart.com/
// @description    Links made eezy!
// @include        http://*.deviantart.com/*
// ==/UserScript==

unsafeWindow.EEzy Links

html
head
script type=textjavascript
function show_prompt()
{
var name=prompt(Paste link below,link);
if (name!=null && name!=)
  {
  document.write(a href=  + name +  a);
  }
}
script
head
body

input type=button onclick=show_prompt() value=Show a prompt box 

body
html