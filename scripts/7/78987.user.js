// ==UserScript==
// @name           SkinnedGmail
// @include        *://mail.google*
// ==/UserScript==
GM_addStyle('table[class=ft],select[name=bact],td[valign=bottom],td[class=lb],td[height="25"],font[size="1"],input[name=nvp_a_arch],h3,input[name=file0]{display:none}');
if(b=document.getElementById("to"))b.rows=1;
a=document.evaluate('//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(i=0;i<a.snapshotLength;i++)if((b=a.snapshotItem(i)).innerHTML=="Actualiser")b.parentNode.removeChild(b);
a=document.evaluate('//td',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(i=0;i<a.snapshotLength;i++)if((b=a.snapshotItem(i)).innerHTML=="&nbsp;")b.innerHTML="";
a=document.evaluate('//input[@type="submit"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(i=0;a.snapshotItem(i).name.substr(0,8)=="nvp_site";i++);
b=a.snapshotItem(i).name;
if(b=="nvp_tbu_go")b="nvp_bbu_go";
do i++;while(b!=a.snapshotItem(i).name);
for(;i<a.snapshotLength;i++)(b=a.snapshotItem(i)).parentNode.removeChild(b);
if((a=document.evaluate('//textarea[@name="body"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)).snapshotLength)window.setInterval((function(a){return function(){a.width=innerWidth-177;a.height=innerHeight-266;}})(a.snapshotItem(0).style),0);
if((a=document.evaluate('//div[@class="msg"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)).snapshotLength)a.snapshotItem(0).innerHTML=a.snapshotItem(0).innerHTML.replace(/<br>/g," ").replace(/\n \n/g,"<br><br>");