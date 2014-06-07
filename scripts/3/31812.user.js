// ==UserScript==
// @name           Kill Dievca Dna
// @namespace      none
// @description    Zrusi pornograficky obrazok na strankach www.cas.sk
// @include        http://www.cas.sk/*
// ==/UserScript==
//
  if (e = document.getElementsByTagName("a"))  
   {  
     c = e.length;  
     for(i = 0; i < c; i++)  
     {  
       if (e[i].hasAttribute("class"))  
       {  
         // skryt� reklam  
         if (e[i].getAttribute("class") == "dievcaDna")   
         {  
           e[i].style.display = "none";  
        }  
    
       }  
     }  
   }

if (e = document.getElementsByTagName("img"))  
   {  
     c = e.length;  
     for(i = 0; i < c; i++)  
     {  
       if (e[i].hasAttribute("src"))  
       {  
         // skryt� reklam
         var str=e[i].getAttribute("src")
         if (str.indexOf("http://img.topky.sk/nude/")>=0)   
         {  
           e[i].style.display = "none";  
        }  
    
       }  
     }  
   }

if (e = document.getElementsByTagName("img"))  
   {  
     c = e.length;  
     for(i = 0; i < c; i++)  
     {  
       if (e[i].hasAttribute("src"))  
       {  
         // skryt� reklam
         var str=e[i].getAttribute("src")
         if (str.indexOf("http://img.dievcaleta.sk/")>=0)   
         {  
           e[i].style.display = "none";  
        }  
    
       }  
     }  
   }  
// 
