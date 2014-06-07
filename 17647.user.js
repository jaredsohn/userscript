Source for "reflection.js v1.7"

   1. // ==UserScript==
   2. // @name           reflection.js v1.7
   3. // @author         http://www.orkut.com/CommunityJoin.aspx?cmm=41646677
   4. // @provided by    http://www.orkut.com/CommunityJoin.aspx?cmm=41646677
   5. // @description    It add reflections to images
   6. // @include        *.orkut.com/Scrap.aspx*
   7. // ==/UserScript==
   8. /**
   9. * reflection.js v1.7
  10. *
  11. * Contributors: Cow http://cow.neondragon.net
  12. *               Gfx http://www.jroller.com/page/gfx/
  13. *               Sitharus http://www.sitharus.com
  14. *               Andreas Linde http://www.andreaslinde.de
  15. *               Tralala, coder @ http://www.vbulletin.org
  16. *
  17. * Freely distributable under MIT-style license.
  18. */
  19.
  20. /* From prototype.js */
  21. document.getElementsByClassName = function(className) {
  22.     var children = document.getElementsByTagName('*') || document.all;
  23.     var elements = new Array();
  24.  
  25.     for (var i = 0; i < children.length; i++) {
  26.         var child = children[i];
  27.         var classNames = child.className.split(' ');
  28.         for (var j = 0; j < classNames.length; j++) {
  29.             if (classNames[j] == className) {
  30.                 elements.push(child);
  31.                 break;
  32.             }
  33.         }
  34.     }
  35.     return elements;
  36. }
  37.
  38. var Reflection = {
  39.     defaultHeight : 0.5,
  40.     defaultOpacity: 0.5,
  41.    
  42.     add: function(image, options) {
  43.         Reflection.remove(image);
  44.        
  45.         doptions = { "height" : Reflection.defaultHeight, "opacity" : Reflection.defaultOpacity }
  46.         if (options) {
  47.             for (var i in doptions) {
  48.                 if (!options[i]) {
  49.                     options[i] = doptions[i];
  50.                 }
  51.             }
  52.         } else {
  53.             options = doptions;
  54.         }
  55.    
  56.         try {
  57.             var d = document.createElement('div');
  58.             var p = image;
  59.            
  60.             var classes = p.className.split(' ');
  61.             var newClasses = '';
  62.             for (j=0;j<classes.length;j++) {
  63.                 if (classes[j] != "reflect") {
  64.                     if (newClasses) {
  65.                         newClasses += ' '
  66.                     }
  67.                    
  68.                     newClasses += classes[j];
  69.                 }
  70.             }
  71.
  72.             var reflectionHeight = Math.floor(p.height*options['height']);
  73.             var divHeight = Math.floor(p.height*(1+options['height']));
  74.            
  75.             var reflectionWidth = p.width;
  76.            
  77.             if (document.all && !window.opera) {
  78.                 /* Fix hyperlinks */
  79.                 if(p.parentElement.tagName == 'A') {
  80.                     var d = document.createElement('a');
  81.                     d.href = p.parentElement.href;
  82.                 } 
  83.                    
  84.                 /* Copy original image's classes & styles to div */
  85.                 d.className = newClasses;
  86.                 p.className = 'reflected';
  87.                
  88.                 d.style.cssText = p.style.cssText;
  89.                 p.style.cssText = 'vertical-align: bottom';
  90.            
  91.                 var reflection = document.createElement('img');
  92.                 reflection.src = p.src;
  93.                 reflection.style.width = reflectionWidth+'px';
  94.                
  95.                 reflection.style.marginBottom = "-"+(p.height-reflectionHeight)+'px';
  96.                 reflection.style.filter = 'flipv progid:DXImageTransform.Microsoft.Alpha(opacity='+(options['opacity']*100)+', style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy='+(options['height']*100)+')';
  97.                
  98.                 d.style.width = reflectionWidth+'px';
  99.                 d.style.height = divHeight+'px';
 100.                 p.parentNode.replaceChild(d, p);
 101.                
 102.                 d.appendChild(p);
 103.                 d.appendChild(reflection);
 104.             } else {
 105.                 var canvas = document.createElement('canvas');
 106.                 if (canvas.getContext) {
 107.                     /* Copy original image's classes & styles to div */
 108.                     d.className = newClasses;
 109.                     p.className = 'reflected';
 110.                    
 111.                     d.style.cssText = p.style.cssText;
 112.                     p.style.cssText = 'vertical-align: bottom';
 113.            
 114.                     var context = canvas.getContext("2d");
 115.                
 116.                     canvas.style.height = reflectionHeight+'px';
 117.                     canvas.style.width = reflectionWidth+'px';
 118.                     canvas.height = reflectionHeight;
 119.                     canvas.width = reflectionWidth;
 120.                    
 121.                     d.style.width = reflectionWidth+'px';
 122.                     d.style.height = divHeight+'px';
 123.                     p.parentNode.replaceChild(d, p);
 124.                    
 125.                     d.appendChild(p);
 126.                     d.appendChild(canvas);
 127.                    
 128.                     context.save();
 129.                    
 130.                     context.translate(0,image.height-1);
 131.                     context.scale(1,-1);
 132.                    
 133.                     context.drawImage(image, 0, 0, reflectionWidth, image.height);
 134.    
 135.                     context.restore();
 136.                    
 137.                     context.globalCompositeOperation = "destination-out";
 138.                     var gradient = context.createLinearGradient(0, 0, 0, reflectionHeight);
 139.                    
 140.                     gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
 141.                     gradient.addColorStop(0, "rgba(255, 255, 255, "+(1-options['opacity'])+")");
 142.        
 143.                     context.fillStyle = gradient;
 144.                     if (navigator.appVersion.indexOf('WebKit') != -1) {
 145.                         context.fill();
 146.                     } else {
 147.                         context.fillRect(0, 0, reflectionWidth, reflectionHeight*2);
 148.                     }
 149.                 }
 150.             }
 151.         } catch (e) {
 152.         }
 153.     },
 154.    
 155.     remove : function(image) {
 156.         if (image.className == "reflected") {
 157.             image.className = image.parentNode.className;
 158.             image.parentNode.parentNode.replaceChild(image, image.parentNode);
 159.         }
 160.     }
 161. }
 162.
 163. function addReflections() {
 164.     var rimages = document.getElementsByClassName('reflect');
 165.     for (i=0;i<rimages.length;i++) {
 166.         var rheight = null;
 167.         var ropacity = null;
 168.        
 169.         var classes = rimages[i].className.split(' ');
 170.         for (j=0;j<classes.length;j++) {
 171.             if (classes[j].indexOf("rheight") == 0) {
 172.                 var rheight = classes[j].substring(7)/100;
 173.             } else if (classes[j].indexOf("ropacity") == 0) {
 174.                 var ropacity = classes[j].substring(8)/100;
 175.             }
 176.         }
 177.        
 178.         Reflection.add(rimages[i], { height: rheight, opacity : ropacity});
 179.     }
 180. }
 181.
 182. var previousOnload = window.onload;
 183. window.onload = function () { if(previousOnload) previousOnload(); addReflections(); }