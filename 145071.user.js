// ==UserScript==
// @name       4chan All Image Expander
// @namespace  http://metalfrog.us/scripts
// @version    0.3.1
// @description  Adds a link to each thread that expands all of its images, up to as wide as the viewport
// @match      *://boards.4chan.org/*
// @copyright  2012+, Keith J. Frank, keithjfrank@gmail.com
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function() {
    var expanded = {};
    var frameWidth = $(window).width() - 40;
    
    $('.thread .op .postNum').append(' [<a href="#" class="expandAll" style="text-decoration:underline;">Expand All Images</a>] ');

    $('.thread').on('click','.expandAll', function(e){
        var $thread = $(this).closest('.thread');
        e.preventDefault();
        
        $thread.find('.post').each(function(){
            var $post = $(this);
            var $link = $post.find('.fileThumb');

            if( typeof expanded[$thread[0].id] === 'undefined') {
                // We haven't expanded this thread yet. Cache it!
                expanded[$thread[0].id] = false;
            }
            
            if($link.length){
                var $images = $link.find('img');
                //$post.toggleClass('fitToPage');
                
                // Check if this image has been expanded manually
                if( !expanded[$thread[0].id] && ($images.length === 1) ){
                    $post.css('clear','both');
                    $($images[0]).toggle();
                    $link.append('<img class="expandedImg fitToPage" alt="Image" src="'+ $link.attr('href') +'" style="max-height:auto !important; max-width:'+ frameWidth +'px!important" />');
                }
                
                // If thread is expanded, and so is the image, go back to its thumb
                if( expanded[$thread[0].id] && ($images.length === 2) ){
                    $post.css('clear','none');
                    $($images[1]).remove();
                    $($images[0]).toggle();
                }
            }
        });
        
        expanded[$thread[0].id] = !expanded[$thread[0].id];
        $thread.find('.expandAll').text(expanded[$thread[0].id] ? 'Collapse All Images' : 'Expand All Images');
    });
}, false);