// ==UserScript==
// @name           Bolt_Select-Code_Links
// @namespace      http://userscripts.org/users/202654
// @description    Select content of code blocks in bolt forum
// @include        *bolt.org/board/show*
// @include        *katzforums.com/show*
//
// Bolt Select-Code
// version 0.1
// 2010-08-06
// Created by Phkninja
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


(function () {

// Global Variables
var gvar=function() {};

var code = {
      parent : null,
	  makelink : function(element){
                  var span = document.createElement('span');
                  span.setAttribute('style', 'margin-left:5px; padding:.1em;font-weight:bold;');
                  
                  var a1 = document.createElement("a");
                  a1.href = "javascript:void(0);";
                  a1.setAttribute('style', 'text-decoration: none;');
                  a1.addEventListener('mouseover', function() { chPrStyle(this, '#FFFFFF'); }, true);
                  a1.addEventListener('mouseout', function() { chPrStyle(this); }, true);
                  
                  a1.addEventListener('click', function() { selectIt(this); }, true);
                  
                  a1.appendChild(document.createTextNode('Select Links'));  
                  span.appendChild(a1);
                  element.appendChild(span);
                  
                }
    }

//======= BROWSER DETECTION / ADVANCED SETTING ======//
function ApiBrowserCheck() {
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; 
  }
}
ApiBrowserCheck();
	

var allowedParents = ['div'];
var xpath = './/*[@class="alt2" and @dir="ltr" and (ancestor::' + allowedParents.join(" or ancestor::") + ')]'; 
var tagcode_head = document.evaluate(xpath , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );

if(tagcode_head.snapshotLength > 0){ // ada tag code
 for(var i=0; i<tagcode_head.snapshotLength; i++){
  tagcode = tagcode_head.snapshotItem(i);
  code.parent = tagcode.parentNode.getElementsByTagName('div')[0];
  code.makelink(code.parent);
 }
} 


function selectIt(pObj){
  var Obj = pObj.parentNode.parentNode;
 if(Obj.innerHTML.indexOf('PHP Code:')!=-1){
    Obj = Obj.parentNode.getElementsByTagName('div')[1];
 }else{
    Obj = Obj.parentNode.getElementsByTagName('pre')[0]; 
 }
 if (Obj) {
	 try{Obj.focus();}catch(e){}
     var selection = window.getSelection();
     var range = document.createRange();	 
     range.selectNodeContents(Obj);
     selection.removeAllRanges();
     selection.addRange(range);
	 return selection;
 }
}

function chPrStyle(element, bcolor){
  if(!isDefined(bcolor)) bcolor='';
  element.parentNode.style.background = bcolor;
}

function isDefined(x)   { return !(x == null && x !== null); }

})();
