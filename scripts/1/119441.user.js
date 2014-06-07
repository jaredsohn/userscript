// ==UserScript==
// @name           nga_clear
// @namespace      wang
// @description    nga图过滤
// @include        http://bbs.ngacn.cc/*
// ==/UserScript==

( function() {
	
		document.title='';
	  function $(id) {
      return document.getElementById(id);
    }
    
   function hd(id,n)
   {
   		if(n>10)
   		{
   			return;
   		}
   		n=n+1;
   		obj = $(id);
   		if(!obj){
   			setTimeout('hd("'+id+'",'+n+')',1000);	
   		}else{
   			obj.style.display='none';
   		}
   }
           
    hd('adsc2',0);
    hd('bbstitle1',0);
    hd('forumboxrightlist',0);
    hd('postads0');
    hd('postads1',0);
    hd('mainmenuavatar',0);
    
    for(i=0;i<1000;i++)
    {
    	try{
    		hd('postportrait'+i,0);
    		hd('postsign'+i,0);    
 
    		
    		}catch(e){}
    }
    

   
    
   
   
   
    
     
     
    
    
	
	})();