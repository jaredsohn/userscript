// ==UserScript==
// @name           Fast Replier
// @author         http://www.orkut.com/Profile.aspx?uid=3557419226107758391
// @namespace      http://orkutsharing.blogspot.com/
// @description    Answer rapid will be the posts in the communities of the orkut
// @include        http://www.orkut.com/CommMsgs.aspx?*
// ==/UserScript ==

unsafeWindow.SC2=function(name,value) {
GM_setValue(name,value);
}
unsafeWindow.VC2=function(name){
return GM_getValue(name)
}
//--------------------------------------------
// Script XMLHttpRequest, opens the page of answers without loading
//--------------------------------------------
script_=function scri_(){/* Here is the beginning */

if(VC2('frl')==3){window.scrollTo(0,document.body.scrollHeight+1000);SC2('frl',0);
}

if(VC2('frl')==1 && document.body.innerHTML.indexOf(unescape('nid%3D'))>-1 && 

document.body.innerHTML.indexOf(unescape('nst%3D'))>-1){
window.location=window.location+"&na=2";SC2('frl',3);
}else if(VC2 ('frl')==1) {window.scrollTo(0,document.body.scrollHeight+1000);SC2('frl',0);}

function FastReply(url){
url3 =""window.location+"";
url2=url3.substring (21,28);
url=url3.replace(/CommMsgs/gi,'CommMsgPost');


xml=new XMLHttpRequest();
xml.open("GET",url,true);
xml.onreadystatechange=function(){
if(xml.readyState==4){
resp=xml.responseText
resp=resp.replace(/\<form method="post" onsubmit="return validateForm\(\);"/gi,'<form method="post" onsubmit="return 

validateForm();" action='+url)
resp=resp.replace(/name=\"Action.submit\"/gi,"name=\"Action.submit\" onclick=\"try{if(VC('c_ass_comu')==1) {sain();}} 

catch(err) {};SC2('frl',1);\"")
resp=resp.replace (/\n/gi,'');
fo=new RegExp("\<table.{1,9999}\<form","gi");
resp=resp.replace (fo,'<form');
var scir=unescape("%5C%3C%5C/form%5C%3E.% 7B1%2C9999%7D%5C%3C%5C/script%5C%3E")
foa=new RegExp(scir,"gi");
resp=resp.replace(foa,'</form');

for(l=0;l<document.getElementsByTagName('table').length;l++) {
if (document.getElementsByTagName('table')[l].innerHTML.indexOf('http://www.orkut.com/About.aspx')>-1 && 

document.getElementsByTagName('table')[l].innerHTML.indexOf('http://www.orkut.com/Privacy.aspx')>-1){
navbar=document.getElementsByTagName('table') [l];
newElement=document.createElement('y');
newElement.innerHTML=resp
navbar.parentNode.insertBefore(newElement, navbar);
document.getElementsByTagName('textarea')[0].focus();
return;
}
}
}
}
xml.send(null)
}

}/* Here it ends */

url=""+window.location+"";
url=url.substring (21,url.length);
url=url.replace (/CommMsgs/gi,'CommMsgPost')


//--------------------------------------------
// It inserts Script in the page
//--------------------------------------------
var sub1="1"+script_+"1";
var sub2=sub1.substring(24, sub1.length-4);
var script=document.createElement('script');
script.innerHTML=sub2
document.body.insertBefore(script,document.body.firstChild);



//--------------------------------------------
// To answer changes it again
//--------------------------------------------
var obj = document.getElementsByTagName ("a");
for(var i=0;i<obj.length;i++) 
 {
if (obj[i].href.indexOf("CommMsgPost.aspx")>-1) 
  {
var botao=obj[i];
}
};
botao.href="javascript:FastReply('"+url+"');void(0)";
