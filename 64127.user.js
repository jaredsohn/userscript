// ==UserScript==
// @name           TTK_mediaSearch_helper
// @namespace      TTK
// @include        *myttk.ru/media/video*
// @include        *myttk.ru/media/games*
// ==/UserScript==

 var s=document.createElement('style');
 s.setAttribute("type","text/css");
 s.innerHTML='a:visited {color: #900060;}option{width:260px}';
 document.getElementsByTagName("head")[0].appendChild(s); 
 
 var d=document.createElement('input');
 d.setAttribute("type","button");
 d.setAttribute("style","position:fixed; border-style:none; height:18px; padding-bottom:3px; top:0px; right:330px; background:#C0DBEA; z-index:999999999");
 d.setAttribute("onmouseover", "this.style.background='#fcc'");
 d.setAttribute("onmouseout", "this.style.background='#C0DBEA'"); 
 if (GM_getValue('lastvideo')!=undefined) {
if (document.location.href.indexOf('video')>0 & document.location.href!=GM_getValue('lastvideo').split('^')[0]) {
 d.setAttribute("onclick", "document.location.href=\'"+GM_getValue('lastvideo').split('^')[0]+"\'");
 d.value='Back to page '+GM_getValue('lastvideo').split('^')[1];
 document.getElementsByTagName("body")[0].appendChild(d); 
}}
 if (GM_getValue('lastgames')!=undefined) {
if (document.location.href.indexOf('games')>0 & document.location.href!=GM_getValue('lastgames').split('^')[0]) {
 d.setAttribute("onclick", "document.location.href=\'"+GM_getValue('lastgames').split('^')[0]+"\'");
 d.value='Back to page '+GM_getValue('lastgames').split('^')[1]; 
 document.getElementsByTagName("body")[0].appendChild(d); 
}}
 var h=document.createElement('select');
 h.id='historylist';
if (GM_getValue('video')==undefined) {GM_setValue('video', '');}
if (GM_getValue('video')!='') {
 h.options[h.options.length]=new Option('============= Video =============', '', false, true);
 var list = GM_getValue('video').split('|');
 for (var l=1; l<list.length; l++) {
 h.options[h.options.length]=new Option('['+l+'] '+list[l].split('^')[1], list[l].split('^')[0], false, true);
 }
}
 if (GM_getValue('games')==undefined) {GM_setValue('games', '');}
if (GM_getValue('games')!='') {
 h.options[h.options.length]=new Option('============= Games =============', '', false, true); 
 var list = GM_getValue('games').split('|');
 for (var l=1; l<list.length; l++) {
 h.options[h.options.length]=new Option('['+l+'] '+list[l].split('^')[1], list[l].split('^')[0], false, true);
 }
}
if (h.options.length>0) {
h.setAttribute("onChange","if (this.value)  {document.location.href=this.value;}");
 h.setAttribute("style","width:300px;position:fixed; top:0px; right:20px; border-style:none; background:#C0DBEA; z-index:999999999");h.selectedIndex=0;
 document.getElementsByTagName("body")[0].appendChild(h);}
var divs = document.all ? document.all : document.getElementsByTagName('a');
for (var i=0; i<divs.length; i++) {
var href = divs[i].href.toLowerCase();
var temp = divs[i].innerHTML;

if ((!isNaN(temp) & href.indexOf('myttk.ru/media')>=0 & href.indexOf('advanced')<0) | (!isNaN(temp) & href.indexOf('pagen_')>=0)) {
divs[i].innerHTML = '<input class="pagelink" type="button" style="cursor:pointer;width:36px;background:#C0DBEA;border-style:none;text-align:center" onmouseover=\"this.style.background=\'#fcc\';\"onmouseout=\"this.style.background=\'#C0DBEA\';\" value="'+temp+'" />';}}

if (document.location.href.indexOf('myttk.ru/media/')>-1 & document.location.href.indexOf('download')>0) {var timer = '';
timer = window.setTimeout(function() {self.close();}, 1000);}

window.addEventListener("click", function() {
if ((document.location.href.indexOf('video/?PAGEN')>0 | document.location.href.indexOf('myttk.ru/media/video/')>-1) & document.activeElement.className=="pagelink") {
GM_setValue('lastvideo', document.activeElement.parentNode.href+'^'+document.activeElement.value);}
if ((document.location.href.indexOf('games/?PAGEN')>0 | document.location.href.indexOf('myttk.ru/media/games/')>-1) & document.activeElement.className=="pagelink") {
GM_setValue('lastgames', document.activeElement.parentNode.href+'^'+document.activeElement.value);}
var newlink='';
if (document.activeElement.href.indexOf('video')>0 & document.activeElement.href.indexOf('search')<0 & document.activeElement.href.indexOf('download')<0 & document.activeElement.href.indexOf('translate')<0 & document.activeElement.href.indexOf('#')<0 & document.activeElement.innerHTML.indexOf('<img')<0) {
newlink=document.activeElement.href+'^'+document.activeElement.innerHTML;}
if (document.activeElement.href.indexOf('video')>0 & document.activeElement.innerHTML.indexOf('<img')>=0 & document.activeElement.firstChild.title!='') {
newlink=document.activeElement.href+'^'+document.activeElement.firstChild.title;}
var list = GM_getValue('video').split('|');var kill=0;
 for (var l=1; l<list.length; l++) {
 if (newlink.split('^')[0]==list[l].split('^')[0]) {kill=1;}
 }
 if (kill==0 & newlink!='') {
 GM_setValue('video', GM_getValue('video')+'|'+newlink);
 }
var newlink='';
if (document.activeElement.href.indexOf('games')>0 & document.activeElement.href.indexOf('search')<0 & document.activeElement.href.indexOf('download')<0 & document.activeElement.href.indexOf('translate')<0 & document.activeElement.href.indexOf('#')<0 & document.activeElement.innerHTML.indexOf('<img')<0) {
newlink=document.activeElement.href+'^'+document.activeElement.innerHTML;}
if (document.activeElement.href.indexOf('games')>0 & document.activeElement.innerHTML.indexOf('<img')>=0 & document.activeElement.firstChild.title) {
newlink=document.activeElement.href+'^'+document.activeElement.firstChild.title;}
var list = GM_getValue('games').split('|');var kill=0;
 for (var l=1; l<list.length; l++) {
 if (newlink.split('^')[0]==list[l].split('^')[0]) {kill=1;}
 }
 if (kill==0 & newlink!='') {
 GM_setValue('games', GM_getValue('games')+'|'+newlink);
 }
}, false);

