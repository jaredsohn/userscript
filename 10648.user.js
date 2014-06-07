// ==UserScript==
// @name           ACF Forum/topic hider
// @namespace      .
// @description    coded by jakev, much help from the online docu.
// @include        http://acforums.megadoomer.com/viewforum.php* 
// @include        http://acforums.megadoomer.com/index.php*
// ==/UserScript==

var oo


function getCookie(c_name)
{
if (document.cookie.length>0)
{ 
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1)
{ 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}

oo=getCookie('topichider');
if (oo==null || oo==""){setCookie('topichider',1,365)}


var unhide = document.createElement("div");

unhide.innerHTML = "<script type=\"text/javascript\">function setCookie(c_name,value,expiredays){var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);document.cookie=c_name+ \"=\" +escape(value)+((expiredays==null) ? \"\" : \"; expires=\"+exdate.toGMTString())} function getCookie(c_name) {if(document.cookie.length>0);{c_start=document.cookie.indexOf(c_name+\"=\");if(c_start!=-1){c_start=c_start+c_name.length+1;c_end=document.cookie.indexOf(\";\",c_start);if(c_end==-1)c_end=document.cookie.length;return unescape(document.cookie.substring(c_start,c_end));} }return \"\"}function toggler(){if(getCookie('topichider')==1){document.getElementById('togglerbg').style.backgroundColor=\"#0000FF\";setCookie('topichider',0,365);forumTR = document.getElementsByTagName('tr');q=0;if(forumTR.length==0){q=1;forumTR=document.getElementsByTagName('li')};for (i=1;i<forumTR.length;i++) {if(forumTR[i].innerHTML.match('No new posts') || forumTR[i].innerHTML.match('This topic is locked: you cannot edit posts or make replies.') || forumTR[i].innerHTML.match('The selected topics have been moved.') || forumTR[i].innerHTML.match(/\\w+_read_?\\w*?\\.gif\\); background-repeat: no-repeat;\">/)){if(q==1){forumTR[i].style.display='block';}else{forumTR[i].style.display='table-row';}}};}else{setCookie('topichider',1,365);document.getElementById('togglerbg').style.backgroundColor='#FF0000';q=0;forumTR = document.getElementsByTagName('tr');if(forumTR.length==0){forumTR=document.getElementsByTagName('li')};for (i=1;i < forumTR.length;i++){if (forumTR[i].innerHTML.match('No new posts')=='No new posts' || forumTR[i].innerHTML.match('This topic is locked: you cannot edit posts or make replies.') || forumTR[i].innerHTML.match('The selected topics have been moved.') || forumTR[i].innerHTML.match(/\\w+_read_?\\w*?\\.gif\\); background-repeat: no-repeat;\">/)){forumTR[i].style.display=\"none\";}}}}</script>" + '<div style="position:fixed;top:10px;left:10px;background-color:#FF0000;color: #ffffff !important;" id="togglerbg">' +'<a id="unhidelink" href="#unhidden" name="unhidden" onclick="javascript:toggler();" style="display:block;height:10px;width:10px;"></a>' +'</div>';

document.body.insertBefore(unhide, document.body.firstChild);

forumTR = document.getElementsByTagName('tr');if(forumTR.length==0){forumTR=document.getElementsByTagName('li')};
if (oo==1){

for (i=1;i < forumTR.length;i++)
{

moo=forumTR[i];

if (moo.innerHTML.match('alt="No new posts"') || moo.innerHTML.match('alt="This topic is locked, you cannot edit posts or make further replies."') || moo.innerHTML.match('The selected topics have been moved.') || moo.innerHTML.match(/\w+_read_?\w*?\.gif\); background-repeat: no-repeat;">/)){
forumTR[i].style.display="none";
}
}
}
else{
document.getElementById('togglerbg').style.backgroundColor="#0000FF"}