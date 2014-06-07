// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==


<table align="center" width="98%"><tr><td>

<HTML>
<HEAD>
<script language="JavaScript">
var sizes = new Array("0px", "1px", "2px", "3px", "4px");
sizes.pos = 0;
function elast() {
var el = document.all.elastic;
if (null == el.direction)
   el.direction = 1;
else if ((sizes.pos > sizes.length - 4) || (0 == sizes.pos))
   el.direction *= -1;
   el.style.letterSpacing = sizes[sizes.pos += el.direction];
}
setInterval('elast()', 100)
</script>
</HEAD>
<BODY>
<h1 align="center" id="elastic"><font size="3">AhmedKasem</font></hi>
</BODY>
</HTML></td></tr></table>

