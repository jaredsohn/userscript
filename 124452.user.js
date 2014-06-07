// ==UserScript==
// @id             Shiichan
// @name           Shiichan
// @version        1.7
// @namespace      4chan
// @author         FrozenVoid
// @description    Provides Shiichan enchancements
// @include        http://dis.4chan.org/*
// @run-at         document-end
// ==/UserScript==
//1.7 merged tripfiller code
GM_addStyle(".label,.label,.namelabel,.navlinks,.postername,.postfieldleft,.emailfield,blockquote,.threadlink,h2{display:none;}")
var fullthreads=1;
var maxrows=7;
var maxcols=140;
FORCE_MONOSPACE=0;
SHOW_FILTERED_SIZE=1;
function rem(x) x.parentNode.removeChild(x)
function tag(name) unsafeWindow.document.getElementsByTagName(name)
function cla(name) unsafeWindow.document.getElementsByClassName(name)
function id(name)  unsafeWindow.document.getElementById(name)
function log(data) GM_log(data)
function tistr(data)  unsafeWindow.document.title=(data).toString()
function geto(obj) XPCNativeWrapper.unwrap(obj)
function sa(obj,att,val) obj.setAttribute(att,val)
function ga(obj,att) obj.getAttribute(att)
function sall(arr,att,val){ for(i in arr)sa(arr[i],att,val);}
function setfilter(data){GM_setValue("filter",data);}
function setfilt(){var data=prompt("Edit filter",GM_getValue("filter",/filter data/gim));
setfilter(data);
}
function getfilter(){return GM_getValue("filter","/123456789/gim");}
GM_registerMenuCommand("SetFilter", setfilt,"s")
var filter=getfilter()
var namefilter=filter;
var a,i,postfilter=filter,linkfilter=filter;
a=tag('textarea');sall(a,'rows',maxrows);sall(a,'cols',maxcols);
if(fullthreads){a=tag('a');//fix thread links
for(i in a)if(a[i].name&&a[i].href.search('-')!=-1)a[i].href=a[i].href.replace(/\/\d+\-\d+|\/\d+\-/,'');}
a=tag('blockquote');abl=a.length;
for(var i=0;i<abl;i++){
if(a[i]&& a[i].innerHTML.search(postfilter)==-1){
if(FORCE_MONOSPACE){a[i].innerHTML="<code>"+a[i].innerHTML+"</code>"}
sa(a[i],"style","display:block");}else{
a[i].parentNode.innerHTML+='[Post filtered:'+(SHOW_FILTERED_SIZE?a[i].textContent.length+' bytes]':']')
//view Selection source for hidden comments
}}
a=cla('threadlink');for(i=0;i<a.length;i++){
if(a[i]&&a[i].innerHTML.search(linkfilter)==-1){
sa(a[i],"style","display:block");}}

a=tag('h2');for(i=0;i<a.length;i++){
if(a[i]&&a[i].innerHTML.search(linkfilter)==-1){
sa(a[i],"style","display:block");}}

a=cla('postername');for(i=0;i<a.length;i++){
if(a[i]&&a[i].innerHTML.search(namefilter)==-1){
sa(a[i],"style","display:inline");}}

function filldata(){
var a=tag('input'),c=tag("textarea"),i;
var text=GM_getValue("text",""),name=GM_getValue("name",""),email=GM_getValue("email","");
if(text)for(i in c){if(c[i].name=='com')c[i].value=text}
if(email)for(i in a){if(a[i].name=='meiru')a[i].value=email}
if(name)for(i in a){if(a[i].name=='kotehan')a[i].value=name}}

function setpro(x){
var data=prompt("Edit "+x,GM_getValue(x,""));
GM_setValue(x,data);filldata();}
function setTrip(){setpro("name")}
function setMail(){setpro("email")}
function setText(){setpro("text")}
GM_registerMenuCommand("setText",setText)
GM_registerMenuCommand("setTrip",setTrip)
GM_registerMenuCommand("setMail",setMail)
filldata(); 