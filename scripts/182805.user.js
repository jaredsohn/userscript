// ==UserScript==
// @name        that's not his name
// @author	theaeblackthorn
// @namespace	http://noseyhedgehog.co.uk
// @description that's not his name
// @include     *archiveofourown.org/*
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);


    $.fn.replaceText = function( search, replace, text_only ) {  
      return this.each(function(){  
        var node = this.firstChild,  
          val,  
          new_val,  
          remove = [];  
        if ( node ) {  
          do {  
            if ( node.nodeType === 3 ) {  
              val = node.nodeValue; 
              new_val = val.replace( search, replace );  
              if ( new_val !== val ) {  
                if ( !text_only && /</.test( new_val ) ) {  
                  $(node).before( new_val );  
                  remove.push( node );  
                } else {  
                  node.nodeValue = new_val;  
                }  
              }  
            }  
          } while ( node = node.nextSibling );  
        }  
        remove.length && $(remove).remove();  
      });  
    }; 


$(document).ready(function() {
    $('.actions').append("<li><a class='btn_fix_name' href='#'>Fix the sheriff's name</a></li>");
    
    $('.btn_fix_name').on('click', function(e) {
        e.preventDefault();
        
    	var bad_name = prompt("Please enter the incorrect name being used","Mark");
        if (bad_name != null) {
            var regexed = new RegExp("\\b"+bad_name+"\\b","gi");
            $('#chapters p').replaceText(regexed, "John");
        }
    });
    

});