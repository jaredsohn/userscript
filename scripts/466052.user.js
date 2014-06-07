// ==UserScript==
// @name       Design-Seeds to Tumblr
// @namespace  http://provinite.tumblr.com/
// @version    0.3
// @description  Adds a 'share on tumblr' button to Design-Seeds, as well as a queue button (grey)
// @match      http://design-seeds.com/index.php/home/entry/*
// @match	   http*://www.tumblr.com/share/photo?pvplg=1&*
// @copyright  2014+, Prov
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

if (window.location.href.indexOf('tumblr.com') == -1)
{
	$(document).ready(
	    function() {
            
            //create post button
	    	var clickthru = window.location.href;
	    	var lnk_name = $("div#main section.palettes article.palette h2").first().text();
	    	var photo_src = $("div#main section.palettes article.palette img").first().prop('src');
			var photo_tags = "design-seeds,color palettes," + lnk_name;
	        var photo_caption = '<a href="' + clickthru + '">' + lnk_name + '</a> on <a href="http://design-seeds.com">design-seeds</a>';
			
	        var box = $('nav.connecting');
	        var dl = $('<dl>');
	        var a = $('<a>').prop('href', 'http://www.tumblr.com/share/photo?source=' + 
	                              encodeURIComponent(photo_src) + '&tags=' + 
	                              encodeURIComponent(photo_tags) + '&caption=' + 
	                              encodeURIComponent(photo_caption) + '&clickthru=' + 
	                              encodeURIComponent(clickthru)).text('Share on Tumblr');
	        a.css({
	            display: 'block',
	            textIndent: '-9999px',
	            overflow: 'hidden',
	            width: '61px',
	            height: '20px',
	            background: "url('http://platform.tumblr.com/v1/share_2.png') top left no-repeat transparent",
	            position: 'relative',
	            left: '35px'
	        });
	        
            //create queue button
	        a.prop('target', '_new');
	       	a.appendTo(dl);
	       	dl.appendTo(box);
	        a = $('<a>').prop('href', 'http://www.tumblr.com/share/photo?pvplg=1&source=' + 
	                              encodeURIComponent(photo_src) + '&tags=' + 
	                              encodeURIComponent(photo_tags) + '&caption=' + 
	                              encodeURIComponent(photo_caption) + '&clickthru=' + 
	                              encodeURIComponent(clickthru)).text('Share on Tumblr');
	        a.css({
	            display: 'block',
	            textIndent: '-9999px',
	            overflow: 'hidden',
	            width: '61px',
	            height: '20px',
	            background: "url('https://platform.tumblr.com/v1/share_2T.png') top left no-repeat transparent",
	            position: 'relative',
	            left: '35px',
                top: '10px'
	        });
	        
	        a.prop('target', '_new');
	       	a.appendTo(dl);
        }
	);
}
else
{
    console.log("Y");
    $(document).ready(function() {
    	$('select#post_state option:eq(1)').prop('selected','selected');
        $('select#post_state').change();
    });
}