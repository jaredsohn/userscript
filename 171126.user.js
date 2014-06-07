// ==UserScript==
// @name           PhpMyAdmin Helper
// @namespace      http://software.sitesbr.net
// @author         Sergio Abreu
// @description    Expands Query textarea of PhpMyAdmin and Keeps it alive.
// @include        *phpmyadmin*
// @include        *dbmy*
// @include        *mysql*
// @version        1.1
// ==/UserScript==

ta = document.getElementById('sqlquery');
      
if(ta){
      ta.style.height="450px";
      ta.style.fontSize="14px";      
}
                
var keeper = new function(){                
 

 function keep_phpmyadmin(){     

	 xm = new XMLHttpRequest();      
	 xm.onreadystatechange = function(){
	                      if( xm.readyState==4){
	                      	 if( xm.status % 200 == 0){
		                       window.status = "Keeping phpmy: " + new Date().toString().match(/\d+:\d+:\d+/)[0];
		                    }
	                     }
	                    };
	
	   xm.open( "get", top.location.href.match(/^htt.+\.php/), true);  
         xm.send( ); 

          setTimeout( keep_phpmyadmin, 10000);      	
	 }
	 
    keep_phpmyadmin();         
 
 };
 
var sc = document.createElement('script');
bd = keeper+"";
sc.innerHTML = bd.substring(13, bd.length -2);
document.getElementsByTagName('head')[0].appendChild(sc);