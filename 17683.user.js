// ==UserScript==
// @name           Crazy Browser by www.hamarabikaner.org. Just Copy and 
                   Paste in the browser and see
// @author         Krishan Kant
// @provided by    http://www.hamarabikaner.org
// @description    Just copy and paste in the address bar
// @include        
// ==/UserScript==
javascript:R=-1;DI=document.links;DIL=DI.length;function A(a,b,c){return Math.sin(R/350*6.28*b+a)*c+c}function B(a){DIS=DI.item(a).style;DIS.position='absolute';DIS.left=A(5,100,500);DIS.top=A(5.6,60,150)}setInterval('R++;B(R%DIL)',15);void(0)