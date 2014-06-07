// ==UserScript==
// @name         Specific Domain Link LDRizer
// @namespace    http://www.firedictionary.com
// @description  LDRizing links to specific domains.
// @include      http://*
// @exclude      http://mail.google.com/*
// @exclude      http://www.google.*/search*
// ==/UserScript==

(function(){
   //
   // Parameters --------
   //
   var targetDomains = ['/.*wikipedia\.org/', '/.*amazon\.com/', '/.*amazon\.co\.jp/'];
   var highlighting = true;
   var style = 'background-color: #FFFF33; border: 1px solid #333300; padding: 3px;';


   //
   // Main Script -------
   //
   var links = document.getElementsByTagName('a');

   for(var i = 0; i<links.length; i++){
     var href = links[i].getAttribute('href');

     if(href && isTraget(href)){
       links[i].setAttribute('class', 'taggedlink');
       wrap(getSpan(), links[i]);
     }
   }

   
   //
   // functions --------
   //
   function isTraget(href){
     var result = false;
     
     for(var i = 0; i < targetDomains.length ; i++){
       var re = new RegExp(targetDomains[i], 'i');
       
       if(href.search(re) != -1){
	 result = true;
	 break;
       }
     }
     
     return result;
   }
   
   function wrap(wrapper, element){
     var p = element.parentNode;
     if(p){
       var next = element.nextSibling;
       p.removeChild(element);
       wrapper.appendChild(element);

       if(next){
	 p.insertBefore(wrapper, next);
       } else {
	 p.appendChild(wrapper);
       }
     }
   }
   
   function getSpan(){
     var span = document.createElement('span');
     span.setAttribute('class', 'xfolkentry');
     
     if (highlighting) {
       span.setAttribute('style', style);      
     }

     return span;
   }
 }());