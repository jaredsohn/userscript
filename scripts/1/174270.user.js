// ==UserScript==
// @name        AutoFlattr
// @namespace   http://campino2k.de/
// @description Automatically flattrs all things
// @version     2013.07.26-4
// @include https://api.flattr.com/button/*
// @include http://api.flattr.com/button/*
// @include https://*.flattr.com/*
// @include http://*.flattr.com/*
// @grant GM_xmlhttpRequest
// ==/UserScript==
 
(function(){
    
    var _button = document.querySelector( '.flattr-ajax' )
//    console.log( _button );
    if ( _button ) {
        
        GM_xmlhttpRequest({
          method: "GET",
          url: _button.href,
          headers: {
				"X-REQUEST-TOKEN" : getCookie( 'f_rt' ),
				"X-REQUESTED-WITH" : "XMLHttpRequest"
          },
          onload: function(response) {
            //console.log(response);
          }
        });
        
    };
    
   
    /**
     * Taken from Flattr https://flattr.com/_static/js/button.js
     */
    
    function getCookie(name) {
        var c_start, c_end;
        
        if (document.cookie.length>0) {
    
            c_start = document.cookie.indexOf(name + '=');
            if (c_start != -1) {
                c_start += name.length + 1;
                
                c_end = document.cookie.indexOf(';', c_start);
                if (c_end==-1) {
                    c_end = document.cookie.length;
                }
                
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        
        return '';
    };
    
})()