// ==UserScript==
// @name           Kongregate Profile Badges
// @description    Kongregate Profile Badges
// @include        http://www.kongregate.com/accounts/*/badges
// @include        http://kongregate.com/accounts/*/badges
// @include        http://www.kongregate.com/accounts/*/badges#
// @include        http://kongregate.com/accounts/*/badges#
// ==/UserScript==
var q,b;
function init(){
var f=document.getElementById("sidebar");
f.style.position="fixed";
f.style.float="right";
var g=document.getElementById("ad_container");
if(g!=null){
f.appendChild(g);
}
b=n();
l();
}
function l(){
var x=document.getElementById("sidebar");
if (document.getElementById("dazmenu")==null){
var t = document.createElement("div");
t.setAttribute("id","dazmenu");
t.style.height="60px";
t.style.display="block";
var o=w("Sort By Completion");
o.addEventListener("click",d,true);
t.appendChild(o);
var o=w("Sort By Difficulty");
o.addEventListener("click",s,true);
t.appendChild(o);
var o=w("Sort Alphbetically");
o.addEventListener("click",f,true);
t.appendChild(o);
x.insertBefore(t,x.firstChild);
}
}
function w(n){
var o=document.createElement('a');
o.setAttribute("href","#");
o.innerHTML=n;
o.style.margin="0 5px;";
o.style.fontSize="1.3em";
o.style.display="block";
return o;
}
function n(){
var x=document.getElementById("main").getElementsByTagName("div");
var b=new Array();
for(var i=0;i<x.length;i++){
if (x[i].getAttribute("class")=="badges_list"){
var t=x[i].getElementsByTagName("a");
for(var o=0;o<t.length;o++){
var m=t[o].getElementsByTagName("img")[0];
var a=m.getAttribute("onmouseover");
//m.setAttribute("onmouseover",'z("'+a.slice(a.indexOf(".view_badgeinfo', '")+19,-2)+'");');
m.removeAttribute("onmouseover");
a = a.slice(a.indexOf(".view_badgeinfo', '")+19,-2);
m.setAttribute("target",a);
m.addEventListener("mouseover",function(){z(this);},true);
b.push(t[o]);
}
}
}
return(b);
}
function s(){
t();
c("Easy");
c("Medium");
c("Hard");
c("Impossible");
for(var i=0;i<b.length;i++){
var m=b[i].getElementsByTagName("img")[0];
var a=m.getAttribute("target");
var l=document.getElementById(a).getElementsByTagName("dd")[1].innerHTML;
a=m.getAttribute("title").indexOf("(completed)")>0;
var v;
if (l.indexOf("easy")>0){
v=document.getElementById("Easy");
}else if(l.indexOf("medium")>0){
v=document.getElementById("Medium");
}else if(l.indexOf("hard")>0){
v=document.getElementById("Hard");
}else if(l.indexOf("impossible")>0){
v=document.getElementById("Impossible");
}else{
return;
}
v=v.getElementsByTagName("dl")[0];
p=document.createElement("dt");
p.appendChild(b[i]);
if(!a){
v.insertBefore(p,v.firstChild);
}else{
v.insertBefore(p,v.lastChild);
}
}
}
function d(){
t();
c("Complete");
c("Incomplete");
for(var i=0;i<b.length;i++){
var m=b[i].getElementsByTagName("img")[0];
a=m.getAttribute("title").indexOf("(completed)")>0;
var v;
if(a){
v=document.getElementById("Complete");
}else{
v=document.getElementById("Incomplete");
}
v=v.getElementsByTagName("dl")[0];
p=document.createElement("dt");
p.appendChild(b[i]);
v.insertBefore(p,v.lastChild);
}
}
function f(){
t();
c("Everything");
var o=b.concat([]);
o.sort(function(i,p){
i=i.getElementsByTagName("img")[0];
p=p.getElementsByTagName("img")[0];
if(i.getAttribute('title')<p.getAttribute('title')){
return -1;
}
if (i.getAttribute('title')>p.getAttribute('title')){
return 1;
}
return 0;
});
var v= document.getElementById("Everything");
v = v.getElementsByTagName("dl")[0];
for(var i=0;i<o.length;i++){
var p=document.createElement("dt");
p.appendChild(o[i]);
v.insertBefore(p,v.lastChild);
}
}
function t(){
var a=document.getElementsByTagName("div");
var c=new Array();
for(var i=0;i<a.length;i++){
if(a[i].getAttribute("class")=="badge_wrapper"){
c.push(a[i]);
}
}
for(var i=0;i<c.length;i++){
c[i].parentNode.removeChild(c[i]);
}
}
function c(n){
var x=document.getElementById(n);
if (x==null){
x=document.createElement("div");
x.setAttribute("id",n);
x.setAttribute("class","badge_wrapper");
var t=document.createElement("div");
t.setAttribute("class","morebadges_heading");
t.style.background="#A31919 url(/images/presentation/redarrow_right.gif) no-repeat scroll 112px 0px;";
t.style.height="27px;";
t.style.width="122px;";
t.innerHTML='<span class="badge_type">'+n+'</span>';
x.appendChild(t);
t=document.createElement("div");
t.setAttribute("class","badges_list");
t.innerHTML='<dl class="badge"></dl><br style="clear:both;" />';
x.appendChild(t);
var t=document.getElementById("main");
t.appendChild(x);
}
}
function z(n){
if (q==null){
var x=document.getElementById("sidebar").getElementsByTagName("div");
for(var i=0;i<x.length;i++){
if(x[i].getAttribute("class")=="view_badgeinfo"){
if (x[i].style.display!="none"){
q=x[i];
}
}
}
}
q.style.display="none";
q=document.getElementById(n.getAttribute("target"));
if(q!=null){
q.style.display="block";
}
}
init();