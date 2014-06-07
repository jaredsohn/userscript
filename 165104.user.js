// ==UserScript==
// @name Evernote forum Shortcuts
// @namespace Q7JmcGrBNo34
// @key 
// @include http://discussion.evernote.com/forum/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require https://raw.github.com/teamdf/jquery-visible/master/jquery.visible.min.js
// ==/UserScript==
var current = 0;
$('td[class*="col_f_icon"]').eq(current).attr('style', 'background-color:#69aa35');
$(document).keypress(function(e) {
    console.log(e.which);
    if(e.which == 106) {
        if (current < $('td[class*="col_f_icon"]').size() - 1)
        {    
            var next = current + 1;
            
            $('td[class*="col_f_icon"]').eq(current).attr('style', '');
            $('td[class*="col_f_icon"]').eq(next).attr('style', 'background-color:#69aa35');
            console.log($(window).scrollTop());
            if ($('td[class*="col_f_icon"]').eq(next).visible() != true)
            {
                var currentScrollTop = $(window).scrollTop();
                
                $('html,body').scrollTop(currentScrollTop + $('td[class*="col_f_icon"]').eq(next).offset().top - $('td[class*="col_f_icon"]').eq(current).offset().top);
            }
            current = next;
            
            
        }
        
    }
    
    if(e.which == 107) {
        if (current > 0)
        {
            next = current - 1;
            $('td[class*="col_f_icon"]').eq(current).attr('style', '');
            $('td[class*="col_f_icon"]').eq(next).attr('style', 'background-color:#69aa35');
            if ($('td[class*="col_f_icon"]').eq(next).visible() != true)
            {
                $('html,body').scrollTop($('td[class*="col_f_icon"]').eq(next).offset().top - 10);
            }
            
            
            current = next;
            
            
            
            
        }
        
    }
    if(e.which == 111) {
        window.location.href=$('td[class*="col_f_content"]').eq(current).find('a[id*="tid-link"]').attr('href');
    }
});
