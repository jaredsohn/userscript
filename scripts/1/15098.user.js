// ==UserScript==
// @name           Whirlpool Rater
// @namespace      forums.whirlpool.net.au
// @version         0.4
// @description    Rate threads posts
// @include        http://forums.whirlpool.net.au/forum-replies.cfm*
// @include        http://forums.whirlpool.net.au/forum-search-topviews.cfm
// ==/UserScript==
//0.2 Changes - Fixed some CSS issues.
//0.3 Changes - Removed email and country input. Now automatically adds username. 
//0.4Changes - Added hide/Show reviews. Fixed the auto add username.


if(navigator.userAgent.toLowerCase().indexOf('firefox')){

	$ = unsafeWindow.jQuery;
	
}

function mywrite(s) {

	(s.indexOf('div') < 0)?$(s).appendTo('head'):$(s).appendTo('body');

}

unsafeWindow.document.write = mywrite; 

if(document.URL == "http://forums.whirlpool.net.au/forum-search-topviews.cfm"){

	$('h3').after('<div class="js-kit-top" title="Top content" style="width: 300px"></div>');

	var s1 = document.createElement('script');

	s1.setAttribute('src', 'http://js-kit.com/top.js');
	s1.setAttribute('type', 'text/javascript');

	document.getElementsByTagName('head')[0].appendChild(s1);	

}
else{
	
	var bpE = $('.bodypost');

	bpE.each(function(){

		var pID = $(this).parent().attr('id');
		
		$(this).prepend('<div class="js-kit-rating" path="'+pID+'" view="combo"></div>'
		+'<div class="js-kit-comments" path="'+pID+'" style="margin-bottom:10px;border-bottom:1px dotted grey;"></div>');
		
	});


	var s2 = document.createElement('script');

	s2.setAttribute('src', 'http://js-kit.com/reviews.js');
	s2.setAttribute('type', 'text/javascript');

	document.getElementsByTagName('head')[0].appendChild(s2);
	
	GM_addStyle('.js-singleCommentKarma{'
				+'	margin-top:10px !important;'
				+'	position:relative !important;'
				+'}'
				+'.js-singleCommentRating>div:firstchild{'
				+'	position:absolute !important;'
				+'}'
				+'.js-singleCommentINFO {'
				+'	color:#808080 !important;'
				+'	float:right !important;'
				+'	margin:0pt 0pt 2em 2em !important;'
				+'	padding:3px !important;'
				+'	text-align:right !important;'
				+'	width:100% !important;'
				+'}'
				+'.js-commentFieldLabel{'
				+'	display:none !important;'
				+'}'
				+'input[name=js-CmtCity]{'
				+'	display:none !important;'
				+'}'
				+'.js-commentInputEmail{'
				+'	display:none !important;'
				+'}'
				+'.js-CommentsArea>div:last-child{'
				+'	display:none;'
				+'}'
				+'.js-poweredBy{'
				+'	margin:-12px 2px 2px 0pt;'
				+'}');				

	var jsname; 
				
	function slowAsBuggery(){

		jsname.val($.trim($('.nav_item_name').text().split('user')[0])); //chaining FTW! :)

		$('.js-commentControl a[@href=http://js-kit.com/comments?wow]').each(function(){
		
			var t = $(this);

			var b = t.parent().parent().parent().next().next()
			
			var bC = b.children('div.js-OldComments:first');
			
			var bDiv = bC[0].getElementsByTagName('div');
			
			if(bDiv.length > 1){
			
				t.attr('href', '#').text('Hide/Show Reviews');
			
			}
			else{
			
				t.parent().text('0 Reviews');
			
				t.hide();
			
			}
		
			t.click(function(){

				b.toggle();

				return false;
			
			});
		
		});
	
	}
				
	function GM_wait() {
	
		jsname = $('input[@name=js-CmtName]');

		if(jsname.length != bpE.length) { 
		
			window.setTimeout(GM_wait, 100); 
			
		}
		else { 
		
			slowAsBuggery(); 
			
		}
	}
	GM_wait();


}