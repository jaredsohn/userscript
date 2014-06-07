// ==UserScript==
// @id             AboutHits
// @name           AboutHits
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://AboutHits.com/surfbars/imagebar.php?*
// @run-at         document-end
// ==/UserScript==
function mydetect1()
{
   var counter=document.getElementById('counter');
   if(counter.outerHTML.indexOf("none")>0)
   {
      var buttons=document.getElementsByTagName('a');
      for(var i=0;i<buttons.length;i++)
      {
         if(buttons[i].outerHTML.indexOf("submitform")>0)
         {
               buttons[i].click();
               clearInterval(s1); 
         }
      } 
   }
}
function mydetect2()
{
   var url=window.top.document.getElementsByTagName('frame')[1].src;
   if(url.indexOf('AboutHits.com/index.php')>0)
   {  
      var doc=window.top.document.getElementsByTagName('frame')[1].contentWindow.document;
      var result=doc.getElementsByName('check_page_set')[0].value;
      if(result.indexOf("One")>0){doc.forms[0].submit();}
      else if(result.indexOf("Two")>0){doc.forms[1].submit();}
      else if(result.indexOf("Three")>0){doc.forms[2].submit();}
      clearInterval(s2); 
   }
}
var s1=window.setInterval(function(){ mydetect1();},1000);
var s2=window.setInterval(function(){ mydetect2();},100);