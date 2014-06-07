// ==UserScript==
// @name           Change background color for sticky forums
// @namespace      GLB
// @description    Changes background color of sticky rows
// @include        http://goallineblitz.com/game/forum_thread_list.pl?*
// ==/UserScript==
// 
// 
// 
 function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};

var divs=getElementsByClassName('sticky_thread thread',document);
if (divs)
{
   for(q=0;q<divs.length;q++)
   {
       divs[q].setAttribute('class','');
       divs[q].setAttribute('bgcolor','#00FFFF');
   }
};

