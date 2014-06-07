// My Google Menus
// Version 0.3
// 2006-01-14
// Copyright (c) 2005-2006, Kyrlian
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           My Google Menus
// @namespace      http://www.google.com
// @description    Add links to Google top right menus
// @include        *.google.*
// @include        *.netvibes.*
// @include        *mygooglemenus_config*
// @exclude        
// ==/UserScript==
function isdefined(variable){return(typeof(window[variable])=="undefined"&&typeof(variable)=="undefined")?false:true;}
function addelem(name,url,rightbrother,target){
 var father = rightbrother.parentNode
 var a = document.createElement('A');
 a.appendChild(document.createTextNode(name));
 a.setAttribute('href', url);
 a.setAttribute('target', target);
 a.setAttribute('class', 'q');
 var pipe = document.createTextNode(pipetxt);
 father.insertBefore(pipe, rightbrother);
 father.insertBefore(a, rightbrother);
}
function isneeded(name,rightbrother){
 var brothers = rightbrother.parentNode.childNodes;
 for (var i = 0; i < brothers.length; i++) {
  if ( brothers[i].innerHTML == name){return 0;}
 }
 return 1;
}
function addifneeded(name,url,rightbrother,target){
 if (isneeded(name,rightbrother)==1){
  addelem(name,url,rightbrother,target);
}}
function restyle(anybrother,color){
 var brothers = anybrother.parentNode.childNodes
 for (var i = 0; i < brothers.length; i++) {
  if(brothers[i].style){
   brothers[i].style.textDecoration="none";
   brothers[i].style.color=color;
}}}
function addzero(num){return ((num<10)?'0':'')+num;}
function compdate_en(){var ds=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];with(new Date){return ds[getDay()]+' '+addzero(getDate())+'/'+addzero(getMonth()+1)+', '+((getHours()>12)?getHours()-12:getHours())+':'+addzero(getMinutes())+':'+((getHours()>12)?'PM':'AM');}}
function compdate_fr(){var ds=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];with(new Date){return ds[getDay()]+' '+addzero(getDate())+'/'+addzero(getMonth()+1)+', '+addzero(getHours())+':'+addzero(getMinutes());}}
function refreshdate(language){document.getElementById('spandate').innerHTML=((language=="0")?compdate_en():compdate_fr());}
function adddate(rightbrother,language){
 var span= document.createElement('span');
 var script= document.createElement('script');
 span.setAttribute("id","spandate");
 //we need to put the script in the page rather than in GM space for it to be runned at interval
 if(language=="0"){
  script.innerHTML="function addzero(num){return ((num<10)?'0':'')+num;};function refreshdate(){var ds=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];with(new Date){document.getElementById('spandate').innerHTML=ds[getDay()]+' '+addzero(getDate())+'/'+addzero(getMonth()+1)+', '+((getHours()>12)?getHours()-12:getHours())+':'+addzero(getMinutes())+':'+((getHours()>12)?'PM':'AM');}};";
 }else{
  script.innerHTML="function addzero(num){return ((num<10)?'0':'')+num;};function refreshdate(){var ds=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];with(new Date){document.getElementById('spandate').innerHTML=ds[getDay()]+' '+addzero(getDate())+'/'+addzero(getMonth()+1)+', '+addzero(getHours())+':'+addzero(getMinutes());}};";
 }
 rightbrother.parentNode.insertBefore(script, rightbrother);
 rightbrother.parentNode.insertBefore(span, rightbrother);
 refreshdate(language);
 window.setTimeout("daterefresher=setInterval('refreshdate("+language+");',60000);refreshdate("+language+");", (60-new Date().getSeconds())*1000+5);
}

function openconfig(){
 var configpage='http://membres.lycos.fr/kyrlian/mygooglemenus_config.htm';
 window.location.href=configpage;
}

if(document.getElementById('googlemenuconfiguration')){
 if(!GM_setValue){
  alert('Please upgrade to the latest version of Greasemonkey.');
 }else{
  var j=0;
  for (var i = 0; i < 11; i++){
   if(document.getElementById("n"+i)){
    GM_setValue("n"+j, document.getElementById("n"+i).innerHTML);
    GM_setValue("u"+j, document.getElementById("u"+i).innerHTML);
    GM_setValue("t"+j, document.getElementById("t"+i).innerHTML);
    j+=1;
  }}
  GM_setValue("nitems",j);
  GM_setValue("option_clock",document.getElementById('option_clock').innerHTML);
  GM_setValue("option_color",document.getElementById('option_color').innerHTML);
  alert("Config succesfully imported, this window will now close. If it doesn't feel free to do it.");
  window.close();
 }
}else{
 var daterefresher=0;
 var pipetxt='\u00a0|\u00a0'
 
// The items will be inserted BEFORE (left) the rightAnchor
 if(document.getElementById('userProfile')!=null){
 //netvibes
  var leftAnchor=document.getElementById('userProfile');
  var rightAnchor=leftAnchor.nextSibling;
  //netvibes pipe settings
  var optionalstartpipe=false;// right pipe
  var optionalmiddlepipe=false;// only used if clock
  var optionalendpipe=false;// left pipe 
 }else{
 //google
  var bs=document.getElementsByTagName('b');
  for (var i=0;i<bs.length;i++) {
   var leftAnchor=bs[i];
   var ih=leftAnchor.innerHTML;
   if (ih.substr(ih.length-10,10) == '@gmail.com'){
    //google pipe settings
    optionalstartpipe=false;// right pipe - no reason in the google layout
    optionalmiddlepipe=true;// only used if clock
    optionalendpipe=false;// left pipe - already exists in the google layout
    var rightAnchor = leftAnchor.nextSibling;
    break;
 }}}
 //if(isdefined(rightAnchor)){
 if(rightAnchor){
  if(!isdefined(GM_getValue('option_clock'))){
   addifneeded('Personalized Home','http://www.google.com/ig?hl=en',rightAnchor,'_top');
   addifneeded('My Groups','http://groups.google.com/',rightAnchor,'_top');
   addifneeded('Search History','http://www.google.com/searchhistory/?hl=en',rightAnchor,'_top');
   if(!GM_getValue){
    addifneeded('Update GM','http://greasemonkey.mozdev.org/',rightAnchor,'_top');
   }else{
    addifneeded('Config','http://membres.lycos.fr/kyrlian/mygooglemenus_config.htm',rightAnchor,'_top');
    GM_registerMenuCommand("Google Menus Config",openconfig,"g","control shift","c");
   }
  }else{
   if (optionalstartpipe){
    var startpipe = document.createTextNode(pipetxt);
    leftAnchor.parentNode.insertBefore(startpipe, leftAnchor);
   }  
   if(GM_getValue('option_clock')!="none"){
    adddate(leftAnchor,GM_getValue('option_clock'));
    if (optionalmiddlepipe){
     var middlepipe = document.createTextNode(pipetxt);
     leftAnchor.parentNode.insertBefore(middlepipe, leftAnchor);
   }}
   for (var i = 0; i < GM_getValue("nitems"); i++){
    addifneeded(GM_getValue("n"+i),GM_getValue("u"+i),rightAnchor,GM_getValue("t"+i));
   }
   if (optionalendpipe){
    var endpipe = document.createTextNode(pipetxt);
    leftAnchor.parentNode.insertBefore(endpipe, leftAnchor);
   }
   if(GM_getValue('option_color')!=""){restyle(rightAnchor,GM_getValue('option_color'));}
   GM_registerMenuCommand("Google Menus Config",openconfig,"g","control shift","c");
}}}

