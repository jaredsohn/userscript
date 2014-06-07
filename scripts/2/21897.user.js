// ==UserScript==
// @name           ACF hide post
// @namespace      .
// @description    Hides already read posts!
// @include        http://acforums.megadoomer.com/viewtopic.php*
// ==/UserScript==

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

oo=getCookie('posthider');

hide=document.createElement('div');
hide.innerHTML='<a href="#" style="position:fixed;top:5px;left:5px;height:15px;width:15px;background-color:#ff0090;display:block;" id="moolink"></a>';
document.body.insertBefore(hide, document.body.firstChild);

z=1;
if (oo==null || oo==""){setCookie('posthider',1,365);oo=1;}
if (oo==1){oo=2;mmoo()}else{document.getElementById('moolink').style.backgroundColor="#000"}
document.getElementById('moolink').addEventListener('click',function(){mmoo();},true);

function unmoo(){
a=document.getElementsByTagName('table');
maxl=a.length;
document.getElementById('moolink').style.backgroundColor="#000";

for(i=0;i<maxl;i++){

if(a[i].innerHTML.match(/icon_post_target\.gif"/) && a[i].innerHTML.match(/<table/)){
a[i].style.display="block";
a[i].style.width="100%";
if(document.getElementById('l'+i)){
document.getElementById('d'+i).style.display='none';
document.getElementById('d'+i).id='';}
}

}

}

function mmoo(){
if(oo==2){oo=1;setCookie('posthider',1,365);}else{oo=2;setCookie('posthider',2,365);unmoo();return;}

document.getElementById('moolink').style.backgroundColor="#FF0090";
a=document.getElementsByTagName('table');
maxl=a.length;

for(i=0;i<maxl;i++){

if(a[i].innerHTML.match(/icon_post_target\.gif"/) && a[i].innerHTML.match(/<table/)){
a[i].style.display="none";
a[i].id="a"+i;

author=a[i].innerHTML.match(/"postauthor.*>.+<\/b>/)
author+='';
author=author.substr(13);
date=a[i].innerHTML.match(/Posted:<\/b>.+<\/div><\/td>/);
date+='';
date=date.substr(12);
date=date.replace(/<\/div><\/td>/,'');
author=author.replace(/style=".+">/,'');
aLink=document.createElement('div');
aLink.style.backgroundColor="#000";
aLink.style.width="100%";
aLink.style.margin="5px";
aLink.style.border="2px solid #FFF";
aLink.class="moo";
aLink.id="d"+i;
aLink.innerHTML='<a href="#a'+i+'" onClick="function(){moo(this)}" name="a'+i+'" id="l'+i+'" style="padding:7px;font-size:20px;display:block;height:100%;width:100%;"><span style="color:#ff0090!important;">Show this post by '+author+' posted on '+date+'</span></a>';
a[i].parentNode.insertBefore(aLink, a[i].nextSibling)
document.getElementById('l'+i).addEventListener('click',function(){hmoo(this);},true);

}

}

}

function hmoo(o){
document.getElementById(o.name).style.display="block";
document.getElementById(o.name).style.width="100%";
o.style.display="none";
}