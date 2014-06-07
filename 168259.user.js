// ==UserScript==
// @name       Tak og hjerte på nxtgns browse.php
// @namespace  https://nxtgn.org
// @version    1.1
// @description  Du kan nu takke og give hjerte for en torrent uden at åbne den, alt du skal gøre er at hente den og så kommer der en knap til dig.
// @match      http://nxtgn.org/browse.php*
// @match      https://nxtgn.org/browse.php*
// @copyright  2012+, You
// ==/UserScript==

/* Indsæt Javascript kode */
var head= document.getElementsByTagName('head')[0];
var script= document.createElement('script');
script.type= 'text/javascript';
script.innerHTML='function t1(elem) {\n'
+'	  window.open(window.location.protocol+"//nxtgn.org/"+elem.id); \n'
+'	  elem.innerHTML="";\n'
+'    var Field = document.createElement("input");\n'
+'    Field.setAttribute("type", "button");\n'
+'    Field.setAttribute("name", "submit");\n'
+'    Field.setAttribute("value", "Tak!");\n'
+'    elem.appendChild(Field);\n'
+'	  elem.id=elem.id.substring(16,elem.id.length).toString();\n'
+'    elem.onclick=function() {t2(this,this.id)};\n'
+'} \n'
+'function t2(elem,id) {\n'
+'    var xmlhttp;\n'
+'    xmlhttp=new XMLHttpRequest();\n'
+'    xmlhttp.open("POST",window.location.protocol+"//nxtgn.org/thanks.php",true);\n'
+'    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");\n'
+'	  xmlhttp.send("submit=Tak!&torrentid="+id);\n'
+'	  elem.innerHTML="";\n'
+'    var Field = document.createElement("input");\n'
+'    Field.setAttribute("type", "button");\n'
+'    Field.setAttribute("name", "submit");\n'
+'    Field.setAttribute("value", "Giv et hjerte!");\n'
+'    elem.appendChild(Field);\n'
+'    elem.onclick=function() {t3(this,this.id)};\n'
+'}\n'
+'function t3(elem,id) {\n'
+'    var xmlhttp;\n'
+'    xmlhttp=new XMLHttpRequest();\n'
+'    xmlhttp.open("POST",window.location.protocol+"//nxtgn.org/takebonus.php",true);\n'
+'    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");\n'
+'	  xmlhttp.send("submit=Giv%20et%20hjerte!&buyid=6&do=lovetorrent&tid="+id);\n'
+'    elem.onclick="";\n'
+'    elem.id="";\n'
+'    elem.style.textDecoration="none";\n'
+'    elem.innerHTML=":)";\n'
+'}\n';
head.appendChild(script);

/* Rediger links til at bruge onclick med t1 */
var regex = new RegExp('<a class="index" href="', 'g');
var html=document.documentElement.innerHTML;
html = html.replace(regex, '<a class="index" onclick="t1(this)" href="javascript:void(0);" id="');
document.documentElement.innerHTML=html;