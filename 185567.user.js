// ==UserScript==
// @name        RedditLog Linker
// @namespace   vusys
// @include     http://redditlog.com/snapshot*
// @version     1
// @grant       none
// @require     http://codeorigin.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

$(function() {

    $('.user, .author').each(function(){
       
        var link = $('<a></a>');
        
        link.text( $(this).text() );  
        link.attr('href', 'http://www.reddit.com/user/' + $(this).text() );  
        link.attr('target', '_blank');  
           
        $(this).replaceWith(link);
    });
    
    var domain = $('span.domain').text();
    $('span.domain').remove();
    
    var domain_replacement = $('<span class="domain"></span>').text(domain);
    
    var link = $('<a class="title"></a>');
    link.text( $('.title').text() );  
    link.attr('href', 'http://www.reddit.com/search?q='+$('.title').text() );  
    link.attr('target', '_blank');  
    
    $('.title').replaceWith(link);
    $('.title').append(domain_replacement);

});

