// ==UserScript==
// @name           fixQnapExternalPort
// @namespace      
// @include        
// ==/UserScript==

var oldPort='8080';
var newPort='YOUR NEW PORT HERE';

// Add jQuery - just to unwrap the magical form
	    var GM_JQ = document.createElement('script');
	    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
	    GM_JQ.type = 'text/javascript';
	    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	 
// Check if jQuery's loaded
	    function GM_wait() 
	    {
	        if(typeof unsafeWindow.jQuery == 'undefined') 				{ window.setTimeout(GM_wait,100); }
	   	 else { $ = unsafeWindow.jQuery; letsFixThatPortShallWe(); }
	    }
	    GM_wait();


	 

	 
// Actually do stuff
	    function letsFixThatPortShallWe() {
           
             var x = $("#sid_form")[0];
              var oldSubmit =  x.submit;
              
             x.submit=function()
               {
                   // alert(x.action);
                    var ac = x.action;
                   //  alert("old:"+ac);
                    ac=ac.replace(oldPort,newPort);
                    x.action=ac;
                    //alert("new:"+ac);
                    x.submit=oldSubmit;
                     x.submit();
                
               }
            }
            
            
          