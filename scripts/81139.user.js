// ==UserScript==
// @name MyScript
// @namespace xXx
// @include http://*.*
// @description    links.
// @version        1.0
// ==/UserScript==

<!-- Script-Anfang -->

<script language="JavaScript">
var eypos=-200, ejump=-4;
var typos=-260, tjump=-4;
var delay=2;
function do_menue()
{
if(typos>-260)
{
tjump=-4;
if(typos>=130)
head_fahren();
}
ejump=-ejump;
if(eypos<=-200 || eypos>=20)
menue_fahren();
}
function menue_fahren()
{
if(document.layers) document.menue.top=eypos; else document.all.menue.style.top=eypos;
eypos+=ejump;
if(eypos>-200 && eypos<20)
setTimeout("menue_fahren()", delay);
}
function do_head()
{
if(eypos>-200)
{
ejump=-4;
if(eypos>=20)
menue_fahren();
}
tjump=-tjump;
if(typos<=-260 || typos>=130)
head_fahren();
}
function head_fahren()
{
if(document.layers) document.head.top=typos; else document.all.head.style.top=typos;
typos+=tjump;
if(typos>-260 && typos<130)
setTimeout("head_fahren()", delay);
}
</script>
<p class="center" align="center"> </p>
<p class="center" align="center"> </p>
<p class="center" align="center"> </p>
<div style="position: absolute; z-index: 2; top: 18px; left: 5px;">
<table border="0">
  <tbody>
    <tr>
      <td align="center"></td>
    </tr>
    <tr style="font-weight: bold; color: rgb(255, 0, 0);">
      <td align="center"><a href="javascript:do_menue()">linkleiste</a></td>
    </tr>
    <tr>
      <td align="center"></td>
    </tr>
  </tbody>
</table>
</div>
<div id="menue"
 style="position: absolute; z-index: 2; top: 18px; left: 96px;">
<table border="0" cellpadding="0" cellspacing="0"
 cols="3" width="450">
  <tbody>
    <tr>
      <td> <a style="font-weight: bold;"
 onmouseover="window.status='Link 1' ;return true"
 href="http:///google.de" target="dummy">google</a><br>
      <a style="font-weight: bold;"
 onmouseover="window.status='Link 2' ;return true"
 href="http://de6.grepolismaps.org/8d004d7830d6836f4b85a0df256bae45"
 target="dummy">Karte 1</a><br>
      <a style="font-weight: bold;"
 onmouseover="window.status='Link 3' ;return true"
 href="http://de6.grepolismaps.org/18eccf2ede9870f01e26d40108ec617d"
 target="dummy">Karte 2</a><br>
      <a style="font-weight: bold;"
 onmouseover="window.status='Link 4' ;return true"
 href="http://www.grepotools.de/reservation/6,1421,2a95456f22f355d170bc605f2f3d8ef6"
 target="dummy">ResTool</a><br>
      <a style="font-weight: bold;"
 onmouseover="window.status='Link 5' ;return true"
 href="http://www.imagehost.org" target="dummy">ImgHost</a><br>
      <a style="font-weight: bold;"
 onmouseover="window.status='Link 6' ;return true"
 href="http://www.cactus2000.de/de/unit/poptd3.shtml"
 target="dummy">Timer</a><br>
      <a style="font-weight: bold;"
 onmouseover="window.status='Link 7' ;return true"
 href="http://userscripts.org/" target="dummy">scripts</a></td>
    </tr>
  </tbody>
</table>
</div>
<p></p>
<!-- Script-Ende -->
