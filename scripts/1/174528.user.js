// ==UserScript==
// @name        auto_genius
// @namespace   tim
// @description auto submit genius
// @include     http://concierge.apple.com/geniusbar/*
// @version     1 
// ==/UserScript==

( function() {

    var version="v 1.11 beta";
    function $(id) {
      return document.getElementById(id);
    }
    curl=window.location.href;
    if(curl.indexOf('timeslots')>-1)
    {
        
        if($('errorMessageC').innerHTML.indexOf('4000560121')>-1)
        {
        
            purl=curl.replace("/timeslots","");
            
            window.location.href=purl;
        }
    }else{
 
        
        
   
        window.onload=function(){
            
            $('fwdButtonC').click();
        }

      
       
    }

     

  })();