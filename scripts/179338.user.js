// ==UserScript==
// @name Facebook Links In New Tab
// @version 1.2.1
// @description Opens Links In A New Tab
// @copyright 2013
// @author Ömer Faruk Koloğlu
// @require http://code.jquery.com/jquery-latest.js

// @include        http://*.facebook.*/*
// @include        https://*.facebook.*/*
// ==/UserScript==

$(document).ready(function(){
    $('a').click(function(event){
    	event.preventDefault();
        
        var flag = true;
        var url = $(this).attr('href');
        
        if(url=="#" || url=="" || url==null)
        {
            return true;
        	flag = false;
        }

        var currentURL = location.protocol + '//www.' + document.domain + location.pathname;
        var checkForUrl = url.split("?")[0].split("#")[0];
        
        if(checkForUrl==currentURL)
        {
        	flag = false;
        }
        
        var ajaxAttr = $(this).attr('ajaxify');
        
        if (typeof ajaxAttr !== 'undefined' && ajaxAttr !== false) {
            flag = false;
            return true;
		}
        
        if($(this).hasClass('navLink'))
        {
        	flag = false;
            return true;
        }
        
        if(flag)
        {
            window.open(url,'_blank');
        }
        else
        {
            window.open(url,"_self")
        }
    }); 
});    
