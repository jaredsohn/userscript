// ==UserScript==
// @name        font-size: 16px
// @namespace   trespassersW
// @description Sets up page's font size to 16px for specified sites 
// @include http://*
// @include https://*
// @include file://*
// @run-at document-start
// @grant GM_registerMenuCommand
// @grant GM_log
// @grant GM_getValue
// @grant GM_setValue  
// @grant GM_addStyle
// @version     1.0
// about:config ⇉ extensions.greasemonkey.scriptvals.trespassersW/font-size: 16px.16pxList
// ==/UserScript==
"use strict";
const gm_id='siteList';
const hdr='header#font_size_16px,';
const style='\
div,p,li,blockquote,td,dd \
{\
 font-size: 16px !important;\
 font-family: Tahoma,Verdana,sans-serif !important;\
 line-height: 1.2 !important;\
}\
';
const css=hdr+style;

var bL=[], blackList = "\
userstyles.org userscripts.org \
"; 

function findHost(loc){
 if(!loc) return -1;
 blackList=GM_getValue(gm_id,blackList);
 bL=blackList.split(' ');
 for(var i=0, il= bL.length; i<il; i++)
  if(loc==bL[i]) return i;
 return -1;
}

function addHost(loc){
 if(findHost(loc)>-1)
 { GM_log('already '+loc);
  return; }
 blackList=loc+' '+bL.join(' ');
 GM_setValue(gm_id,blackList);
 menuCmd(loc);
 GM_addStyle(css); 
// window.location.reload(true);
}

var readProtect = false;
function delHost(loc){
 var ix=findHost(loc);
 if(ix <0) {  GM_log('del HeTy '+ loc);
 return;}
 bL.splice(ix,1);
 blackList=bL.join(' ');
// GM_log('16pxOff['+ix+']: /'+loc+'/ '+ blackList);
 GM_setValue(gm_id,blackList);
 menuCmd(loc);
 if(killCSSRule(hdr)){
   GM_log('del ' +loc);
 }else if(readProtect){
   GM_log('read-protected: '+location.host);
   window.location.reload(true);
 }else GM_log('not found: ' +loc);
 // window.location.reload(true);
}
// http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
function getCSSRule(ruleName, deleteFlag) {
  var ssh= unsafeWindow.document.styleSheets;
  if (!ssh) return false;
  ruleName=ruleName.toLowerCase();
  readProtect = false;  
  try{
  for (var i=0; i<ssh.length; i++) {
    var sh=ssh[i];
    var ii=0, cssRule=false;
    do { // doesn't work on read-protected sites -
      cssRule = sh.cssRules[ii];
      if( cssRule && cssRule.selectorText // could provoke SecurityError
       && cssRule.selectorText.indexOf(ruleName)==0){
         if (deleteFlag=='delete'){
            sh.deleteRule(ii);
            //GM_log('rule found: ' + ruleName); 
            return true;
         }else return cssRule;
        }
      ii++;
    }while (cssRule);
  }
  }catch(e){readProtect=true; return false;}
  //GM_log('rule not found: ' + rulename); 
  return false;
}

function killCSSRule(ruleName) {
/* * /
 readProtect=false;
 do{ 
  var rc = getCSSRule(ruleName,'delete');
 }while(rc);
 return readProtect==false;
/* */
 return getCSSRule(ruleName,'delete');
}

var mcmd ='';
function menuCmd(h){
 if(!h) return false;
 var ix=findHost(h); 
 if(ix>-1){
  if(mcmd.indexOf('DEL '+h)<0){
   GM_registerMenuCommand("16px: DEL "+h, function(){delHost(h)}),
   mcmd+="DEL "+h+';'
   GM_log('ADD['+ix+'] '+h);
  }
  return true;
 }
 if(mcmd.indexOf('ADD '+h)<0){
   GM_registerMenuCommand("16px: ADD "+h, function(){addHost(h)}),
   mcmd+="ADD "+h+';'
 }
 return false;
}

function main(){
var loc=location.host, loc3='';
var t=loc.split('.');
if(t.length>2){
 loc3=loc;
 loc=t[t.length-2]+'.'+t[t.length-1];
}
//if(ix>-1)
if(menuCmd(loc) | menuCmd(loc3)) 
 GM_addStyle(css);
}

//if(document.body) 
 main();