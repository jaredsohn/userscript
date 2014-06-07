// ==UserScript==
// @name        text-color: black
// @namespace   trespassersW
// @description changes page textcolor to pure black
// @include http://*
// @include https://*
// @run-at document-start
// @grant GM_registerMenuCommand
// @grant GM_log
// @grant GM_getValue
// @grant GM_setValue  
// @grant GM_addStyle
// @version     1.1
// ==/UserScript==
const sel='p, div, code, pre, blockquote, td, ul, li';

const css=sel+'{color: black !important;}'

var bL=[], blackList = "\
popmech.ru computerra.ru bbc.co.uk lib.rus.ec absurdopedia.wikia.com\
"; 

function findHost(loc){
 if(!loc) return -1;
 blackList=GM_getValue('blktxtList',blackList);
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
 GM_setValue('blktxtList',blackList);
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
// GM_log('btOff['+ix+']: /'+loc+'/ '+ blackList);
 GM_setValue('blktxtList',blackList);
 menuCmd(loc);
 if(killCSSRule(sel)){
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
       && cssRule.selectorText.toLowerCase()==ruleName){
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
  GM_log('rule not found: ' + rulename); 
  return false;
}

function killCSSRule(ruleName) {                          
   return getCSSRule(ruleName,'delete');                  
}                                                         

var mcmd ='';
function menuCmd(h){
 if(!h) return false;
 var ix=findHost(h); 
 if(ix>-1){
  if(mcmd.indexOf('DEL '+h)<0){
   GM_registerMenuCommand("blackT DEL "+h, function(){delHost(h)}),
   mcmd+="DEL "+h+';'
   GM_log('btOn['+ix+'] '+h);
  }
  return true;
 }
 if(mcmd.indexOf('ADD '+h)<0){
   GM_registerMenuCommand("blackT ADD "+h, function(){addHost(h)}),
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