// ==UserScript==
// @name           scriptmudle
// @namespace      Avo
// @include        https://campusvirtual.udc.es/moodle/course/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML+'<table><tr>'+'<td><iframe title="mudle" src="http://www1.shoutmix.com/?mudle" frameborder="0" height="500" scrolling="auto" width="160">&lt;a&gt;View shoutbox&lt;/a&gt;</iframe></td>'+'<td><br><br><br><br><br><br><iframe title="tenis" src="http://www.formacion-dka.es/juegosentuweb.htm" frameborder="0" width="500" height="600" scrolling="no" align="center"></iframe></td>'+'</tr><tr>'+'<td><input type="button" onclick="window.scrollTo(0,0) " value="DISIMULAR" style="font-size: 50px; font-weight: bold; width: 1000; height: 40;" ></td>'+'</tr></table>';

//CHAT:
//<iframe title="mudle" src="http://www1.shoutmix.com/?mudle" frameborder="0" height="500" scrolling="auto" width="160">
//&lt;a&gt;View shoutbox&lt;/a&gt;
//</iframe>;

//BOTON Disimular:
//<input type="button" onclick="window.scrollTo(0,0)" value="DISIMULAR">