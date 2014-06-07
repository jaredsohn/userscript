// ==UserScript==
// @name           Sum Effect Intranet
// @namespace      http://nicinabox.com
// @description    Adds enhancements to Ticket system. v1.4 adds reply hotkey (hit R), most recent reply jump now with Reply link, so it follows down page, attachment flags now collapsed--expand on hover.
// @version		   1.4
// @include        http://intranet.sumeffect.com/*
// ==/UserScript==

// Append some text to the element with id #someText using the jQuery library.

// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
jQuery = unsafeWindow['jQuery'];
jQuery.noConflict();
/* You put your jQuery code here, which must use the jQuery namespace. See Note. */

var regex = new RegExp('(www[1-9]\.corecommerce\.com)', 'i');
jQuery(document).ready(function($) {
	// Login page dropdown fix
	$('select[name="uUser"]').replaceWith('<input type="text" value="nic.haynes@sumeffect.com" name="uUser" />');
	
	// Link urls in page
/* 	var reg = new RegExp('https?://', 'g');
	$('.supportResponse').each(function(){
		var a = $(this).html().search(reg);
		if (a != -1) {
			console.log(a);
			$(this).css('color', 'red');
		}	
	}); */

	// KB reply
	$('#commentField textarea').blur(function(){
		$(this).removeClass('response-focus');
	}).focus(function() {                
		$(this).addClass("response-focus")
	}); 
	$(document).keypress(function(e){
		var code = (e.keyCode ? e.keyCode : e.which);	
		if(code == 114 && !$('#commentField textarea').hasClass('response-focus')) {
			$('#addReply').click();
			$('#commentField textarea').focus().addClass('response-focus');
	 	}
	});

 	
	
	// FTP link
	$('.text-row').each(function(){
		var s = $(this).html().search(regex);
		if (s != -1) {
		// Add classes
		var url	  = $(this).addClass('url').text();
		var uname = $(this).next().addClass('uname').text();
		var pword = $(this).next().next().addClass('pword').text();
		
		// Cleanup
		url = $.trim(url);
		uname = $.trim(uname);
		pword = $.trim(pword);
		
		$('.url,').parent()
			.css('border-top', '1px solid silver')
			.css('border-bottom', '1px solid silver');	

		var html = '<td><small><a style="text-decoration: none" target="_blank" href="ftp://'+uname+':'+pword+'@'+url+'">Open FTP &rarr;</a></small></td>';
		$(this).parent().append(html);
	}
});
		
    // Move comment box to top
    var c = $('#commentText').closest('table').addClass('myReply');
  	var html = "<table id='myReply'>"+c.html()+"</table>";
  	$("<div id='newReply'></div>").prependTo('#xfloater');
  	$(html).appendTo('#newReply').hide();
  	$('.myReply').remove();
  	
  	$("<div id='tools'><a id='addReply' style='float:left' href='#'>Add Reply</a> <a id='addReply' style='float:right' href='#bottom'>Jump to most recent</a></div>").prependTo('#newReply')
  		.css('padding', '10px')
  		.css('margin-top', '16px')
  		.css('margin-bottom', '10px')
  		.css('overflow', 'auto')
  		.css('background', '#efefef');
   	$('.infoDetails legend').append("<a id='collapeInfo' href='#'>Collapse</a>");
		$('.infoDetails').css('width', 'auto');
		$('#collapeInfo').css('font-size', '10px');
		
  	$("#addReply").toggle(function(){
  		$('#myReply').slideDown();
  		$(this).text('Close Reply');
  		$('#commentField textarea').focus().addClass('response-focus');
		return false;
  	}, function(){
  		$('#myReply').slideUp();
  		$('#commentField textarea').focus().removeClass('response-focus');
  		$(this).text('Add Reply');
  		return false;
  	});
  	$("#collapeInfo").toggle(function(){
  		$('.infoDetails table').slideUp();
  		$(this).text('Expand');
		return false;
  	}, function(){
  		$('.infoDetails table').slideDown();
  		$(this).text('Expand');
  		return false;
  	});
  	
  	// Jump top/bottom
  	//$('form[name="main"]').before("<a href='#bottom' id='top'>Go to most recent reply</a>");
  	$('form[name="main"]').after("<a href='#' id='bottom'>Back to top</a>");
  	var $myReply   = $("#newReply"),
    $window    = $(window),
    offset     = $myReply.offset(),
    topPadding = 15;

    // Scroll right pane into view
    $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $myReply.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
        
            $myReply.stop().animate({
         	    marginTop: 0
            });
        }
    });
    
    // Add attachment links/jump  
	$('fieldset.supportResponse span').each(function(i, e){
    	var height = $(this).parents('fieldset').outerHeight();
    	var myAtt = $(this).text();
    	$(this).parent().append("<a href='#satt-"+(i+1)+"' id='satt-"+i+"' class='sAttIcon attIcon'>"+myAtt+"</a>").css('position', 'relative');
    	$('#satt-'+i)
	    	.css('position', 'absolute')
	    	.css('display', 'block')
	    	.css('text-indent', '-9999px')
	    	.css('background', '#57A9FD')
	    	.css('color', 'white')
	    	.css('z-index', '11')
	    	.css('top', '-16px')
	    	.css('left', '518px')
	    	.css('width', '8px')
	    	.css('height', (height-7)+"px");
    });    
   	$('fieldset.userResponse span').each(function(i, e){
    	var height = $(this).parents('fieldset').outerHeight();
    	var myAtt = $(this).text();
    	$(this).parent().append("<a href='#catt-"+(i+1)+"' id='catt-"+i+"' class='cAttIcon attIcon'>"+myAtt+"</a>").css('position', 'relative');
    	$('#catt-'+i)
	    	.css('position', 'absolute')
	    	.css('display', 'block')
	    	.css('text-indent', '-9999px')
	    	.css('background', '#B71313')
	    	.css('color', 'white')
	    	.css('z-index', '11')
	    	.css('top', '-16px')
	    	.css('left', '518px')
	    	.css('width', '8px')
	    	.css('height', (height-7)+"px");
    });
	$('.attIcon').hover(function(){
		var height = $(this).parents('fieldset').outerHeight();
		$(this)
			.css('text-indent', '0')
			.css('padding', '5px')
			.height(height-17+'px')
			.width('auto');
	}, function(){
		var height = $(this).parents('fieldset').outerHeight();
		$(this)
			.css('text-indent', '-9999px')
			.css('padding', '0')
			.height(height-7+'px')
			.width('8px');
	});
      
 });

}, false);