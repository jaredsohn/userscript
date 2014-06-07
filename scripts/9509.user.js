// ==UserScript==
// @name           OGame Phalanx and Combat report source
// @namespace      OGame Phalanx and Combat report source 
// @include        http://*/game/phalanx.php?session=*
// @include        http://*/game/bericht.php?session=*
// ==/UserScript==

var html = '<html>\n'+document.documentElement.innerHTML + '\n</html>';
html = html.replace(/<tbody>/g,"").replace(/<\/tbody>/g,"").replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
var textarea = document.createElement("div");
textarea.innerHTML = '<textarea  style="overflow:hidden;" readonly onclick ="this.focus();this.select()">' +html+'</textarea>';
document.body.appendChild (textarea);