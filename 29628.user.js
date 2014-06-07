// ==UserScript==
// @name		      Subtle Alert Box Replacement
// @namespace     http://lucideer.com/userscripts/
// @description   For anyone annoyed by alert boxes locking up the browser, this replaces them with a nice little blue popup in the bottom corner (styleable if you like just edit the CSS at the top of the script)
// @version       1
// @license     Public Domain
// @include       *
// ==/UserScript==

(function(){
var popUP=null;
var popUPStyles='#UJS_alertContainer{'+
                'background-color:#9cf;position:fixed;right:0;bottom:0;width:200px;opacity:0.5;}'+
                '.UJS_alertBox{'+
                'border:1px dashed;padding:2px;}';
if(window.opera){unsafeWindow=window;}
unsafeWindow.alert = function(input) {
if(popUP==null){
    var heads = document.evaluate('//head',document,null,XPathResult.ANY_TYPE,null);
    var head = heads.iterateNext();
    if (head) {
      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(popUPStyles));
      head.appendChild(style); 
      }
    popUP=document.createElement('div');
    popUP.setAttribute('id','UJS_alertContainer');
    document.body.appendChild(popUP);
    }
  var newPopup = document.createElement('div');
  newPopup.setAttribute('class','UJS_alertBox');
  newPopup.textContent=input;
  popUP.appendChild(newPopup);
  newPopup.addEventListener('click',function(){
    this.parentNode.removeChild(this);
    },false);
  }
})();