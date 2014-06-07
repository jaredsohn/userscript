// ==UserScript==
// @name           Weblabor - BBCode gomb
// @namespace      http://userscripts.org/users/278811
// @description    Megjeleníti az összes BBCode formázás gombját
// @include        http://weblabor.hu/blog/bekuldes
// @include        http://weblabor.hu/cikkek/bekuldes
// @include        http://weblabor.hu/forumok/bekuldes
// @include        http://weblabor.hu/munka/bekuldes
// @include        http://weblabor.hu/konyvek/bekuldes
// @include        http://weblabor.hu/blog/*/*/hozzaszolas*
// @include        http://weblabor.hu/blogmarkok/*/hozzaszolas*
// @include        http://weblabor.hu/cikkek/*/hozzaszolas*
// @include        http://weblabor.hu/forumok/temak/*/hozzaszolas*
// @include        http://weblabor.hu/konyvek/*/hozzaszolas*
// @include        http://www.weblabor.hu/blog/bekuldes
// @include        http://www.weblabor.hu/cikkek/bekuldes
// @include        http://www.weblabor.hu/forumok/bekuldes
// @include        http://www.weblabor.hu/munka/bekuldes
// @include        http://www.weblabor.hu/konyvek/bekuldes
// @include        http://www.weblabor.hu/blog/*/*/hozzaszolas*
// @include        http://www.weblabor.hu/blogmarkok/*/hozzaszolas*
// @include        http://www.weblabor.hu/cikkek/*/hozzaszolas*
// @include        http://www.weblabor.hu/forumok/temak/*/hozzaszolas*
// @include        http://www.weblabor.hu/konyvek/*/hozzaszolas*
// @version        0.2
// ==/UserScript==

GM_addStyle('#textareaControl button { width: 30px; font-size: 10px; }')

var szerk=document.querySelectorAll('textarea')

function pluszgombcsinal()
{
  for (var i=0,l=szerk.length;i<l;i++) szerk[i].removeEventListener('focus',pluszgombcsinal,true)

  var tarto=document.querySelector('#textareaControl')

  if (tarto) tarto.innerHTML
='<button onclick="controlsGeneralTag(controls_textarea,\'b\')" title="Félkövér Ctrl-B"><b>b</b></button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'i\')" title="Dõlt Ctrl-I"><i>i</i></button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'u\')" title="Aláhúzott Ctrl-U"><u>u</u></button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'quote\')" title="Idézet Ctrl-Q"><b>"</b></button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'code\')" title="Kód Ctrl-O"><code>code</code></button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'colorer\',\'=\',controlsAskForColorerType)" title="Színezett kód Ctrl-P"><b>{}</b></button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'h2\')" title="Cím Ctrl-2" style="font-size: 130%">h2</button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'h3\')" title="Alcím Ctrl-3" style="font-size: 120%">h3</button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'h4\')" title="Al-alcím Ctrl-4" style="font-size: 110%">h4</button>'
+'<button onclick="controlsList(controls_textarea)" title="Lista Ctrl-*">:=</button>'
+'<button onclick="controlsTable(controls_textare)" title="Táblázat Ctrl-E"><span style="text-decoration: underline overline line-through">|&nbsp;|&nbsp;|</span></button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'url\',\'=\',controlsAskForLink)" title="Hivatkozás Ctrl-L"><u style="color: #00f;">lnk</u></button>'
+'<button onclick="controlsGeneralTag(controls_textarea,\'img\',\'=\',controlsAskForColorerType)" title="Kép"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAACRQTFRFAAAAAACEAAD/AIQAAP8AAP//hACEhISExsbG3t7e/wD/////9EkSBwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFDRIcMSasO5gAAABZSURBVAjXY9gNBQyojB0gxo72io7uahCj3LijeweYYdDRXg6WYu/o6AYxOsrLC7YDGds7OoK0QYq37+gIKgdp375qeznYwO3Z23fvBisG8neAGLvLsVkKBAAXNlL0e/oBNAAAAABJRU5ErkJggg==" alt="[x]"></button>'
+'<button onclick="searchTextArea(controls_textarea)" title="Keresés Ctrl-F">?</button>'

}

for (var i=0,l=szerk.length;i<l;i++) szerk[i].addEventListener('focus',pluszgombcsinal,true)
