// ==UserScript==
// @name           Rewrite
// @namespace      www.bungie.net
// @description    Lets you change words to your desire.
// @include        http://*bungie.net*
// @exclude        http://www.bungie.net/Account/Settings.aspx?page=*
// @version        1
// ==/UserScript==
//Cloxverto & AbitofZero<3
var OLDWORD = GM_getValue('OLDWORD');
var NEWWORD = GM_getValue('NEWWORD');
if(OLDWORD == null|| NEWWORD == null){
GM_setValue('OLDWORD', 'null');
GM_setValue('NEWWORD', 'null');
}
var a = document.getElementsByTagName('a');
for(i=0;i<a.length;i++){
if(eval("document.getElementsByTagName('a').item(i).innerHTML.search(/"+OLDWORD+"/i)")>-1){
eval("document.getElementsByTagName('a').item(i).innerHTML = document.getElementsByTagName('a').item(i).innerHTML.replace(/"+OLDWORD+"/gi, NEWWORD)");
}
}
var span = document.getElementsByTagName('span');
for(i=0;i<span.length;i++){
if(eval("document.getElementsByTagName('span').item(i).innerHTML.search(/"+OLDWORD+"/i)")>-1){
eval("document.getElementsByTagName('span').item(i).innerHTML = document.getElementsByTagName('span').item(i).innerHTML.replace(/"+OLDWORD+"/gi, NEWWORD)");
}
}
var li = document.getElementsByTagName('li');
for(i=0;i<li.length;i++){
if(eval("document.getElementsByTagName('li').item(i).innerHTML.search(/"+OLDWORD+"/i)")>-1){
eval("document.getElementsByTagName('li').item(i).innerHTML = document.getElementsByTagName('li').item(i).innerHTML.replace(/"+OLDWORD+"/gi, NEWWORD)");
}
}
var p = document.getElementsByTagName('p');
for(i=0;i<p.length;i++){
if(eval("document.getElementsByTagName('p').item(i).innerHTML.search(/"+OLDWORD+"/i)")>-1){
eval("document.getElementsByTagName('p').item(i).innerHTML = document.getElementsByTagName('p').item(i).innerHTML.replace(/"+OLDWORD+"/gi, NEWWORD)");
}
}
if(document.URL.search("Settings") > -1){
var signature = document.getElementsByTagName('tr').item(4).parentNode;
signature.innerHTML += '</tr><tr><td class="field">Original Word</td><td><input type="text" id="OLDWORD" class="text_entry" value="'+OLDWORD+'" /></td></tr>'+
'<tr><td class="field">Altered Word</td><td><input type="text" id="NEWWORD" class="text_entry" value="'+NEWWORD+'"/></td>';
document.getElementById('ctl00_mainContent_bEditProfileButton').addEventListener('click', function(){GM_setValue('OLDWORD',document.getElementById('OLDWORD').value);GM_setValue('NEWWORD',document.getElementById('NEWWORD').value);}, true);
document.getElementById('ctl00_mainContent_bEditProfileButton2').addEventListener('click', function(){GM_setValue('OLDWORD',document.getElementById('OLDWORD').value);GM_setValue('NEWWORD',document.getElementById('NEWWORD').value);}, true);
}