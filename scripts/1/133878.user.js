// ==UserScript==
// @name        Skem9 Easy Commenter
// @namespace   Brandon Probst
// @website		brandonkprobst.com
// @description On Skem9, you have to go to someone's profile to leave a comment for them. This allows you to reply to the comment, while viewing it, without ever leaving the page.
// @include     http://skem9.com/~*
// @version     1
// ==/UserScript==
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

script.addEventListener('load', function(){ 
	$ = unsafeWindow['jQuery'];
	$.noConflict();
  
	//make sure that we're on our own profile by comparing the 
	//IDs in the "view profile" link to the one in the gallery link
	
	if(
		new RegExp('.*?(\\d+)',["i"]).exec($('#Umenu li a').attr('href'))[1] 
		=== 
		new RegExp('.*?(\\d+)',["i"]).exec($('.proPic a').attr('href'))[1]
	){
		//set up the box that's going to hold the comment box if we need it.
		$('.Comments form .MLine').after('<div style="display:none" id="reply_comment_form"></div>');
		
		//add the reply links
		$('#ProfileContents .Comments .commentsPeps .comName a').each(function(i){
			var href = $(this).attr('href');
			var name = $(this).text();
			
			$(this).parent('span').append(
				 '<div class="commentLinks" style="float:right">'
				+'<a href="#" class="reply_comment_link" data-userid="'+href+'" data-username="'+name+'">Reply to Comment&nbsp;&nbsp;&nbsp;</a>'
				+'</div>'
			);
		});
		
		//once the reply links have been clicked
		$('.reply_comment_link').live('click',function(){
			 $('#reply_comment_form').slideUp(150); //if it's open, close it
			 
			var userid   = $(this).attr('data-userid');
			var username = $(this).attr('data-username');
			
			$('html, body').animate({
		         scrollTop: $(".Comments").offset().top
		     }, 500, function(){
		    	 //Add the comment form, then show the div
		    	 $('#reply_comment_form').html(
		    	 	 '<div class="commentForm centered"><form id="reply_form" action="/'+userid+'" method="post">'
					+'<textarea placeholder="Reply to '+username+'\'s comment" cols="50" rows="5" name="comment" id="formMessage"></textarea><br />'
					+'<input type="hidden" name="addComment" value="1" /><button type="button" id="do_reply" onclick="this.disabled=true;this.value=\'Submiting..\';" class="comSub">Comment</button>'
					+'</form></div>'
		    	 ).slideDown(500);
		     });
	
			return false;
		});
		
		$('#do_reply').live('click',function(e){
			var form_data = $('#reply_form').serialize();
			
			$.ajax({
				type: "POST",
				url: $('#reply_form').attr('action'),
				data: form_data
			});
			$('#reply_comment_form')
				.slideUp(500, function(){
					$(this).html('<div style="background:#333;height:30px;border:1px solid #0af;color:#0af;text-align:center;padding-top:10px;font-weight:bold;">Your comment was sent!</div>')
						   .slideDown(250);
				});
			
			return false;
		});
	}
	
}, false);
