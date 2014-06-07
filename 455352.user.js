// ==UserScript==
// @name       webm expander
// @namespace  http://somewhereovertherainbowz.com
// @version    0.0.1
// @description  Adds a link to each thread that expands all of the webm videos
// @match      *://boards.4chan.org/*
// @copyright  2014+, Anon, damnave@gmail.com
// @require http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function() {
    $('.thread .op .postNum').append(' [<a class="expandWebM" style="text-decoration:underline;">Expand WebM</a>] ');
    $('.expandWebM').on('click', function() {
        if ($(this).text() === 'Expand WebM')
        {
            $(this).text('Kill WebM');
            $('img[data-md5]').each(function(){
               var img = $(this);
               img.click();
            });
        }
        else
        {
            $(this).text('Expand WebM');
            $('.fileThumb').attr('style','');
            $('video').remove();
            $('.collapseWebm').remove();
        }
	});
});