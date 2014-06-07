// ==UserScript==
// @name       Friendcodes.com skin changer fix
// @namespace  http://use.i.E.your.homepage
// @version    0.1
// @description  fixes the skin changer
// @match      http://*friendcodes.com/*
// @copyright  2012+, You
// ==/UserScript==


document.getElementById("footer_select").innerHTML+='<select name="styleid" onchange="switch_id(this, \'style\')"><optgroup label="Quick Style Chooser"><option class="hidden"></option></optgroup><optgroup label="&nbsp;Standard Styles"><option value="50" class="" selected="selected">--Default Style</option></optgroup><optgroup label="&nbsp;Mobile Styles"><option value="58" class="">-- Default Mobile Style</option></optgroup></select>';


