// ==UserScript==
// @name           Auto-like
// @namespace      facebook
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.facebook.com/*
// ==/UserScript==

$(function(){
	$('body').append('<style>#al_menu {z-index: 999; padding: 5px 10px; position: fixed; left: 0px; bottom: 0px; background-color: gray;} #al_menu a{color: white; padding: 3px 20px 3px 10px} #al_menu ul{padding: 10px; background-color: gray; position: absolute; bottom: 20px; display: none;} #al_comm_ul{left: 60px;} #al_menu ul li {padding: 2px 0px;} </style>');
	$('body').append('<div id="al_menu"><ul id="al_post_ul"></ul><a id="al_post" href="#">Like posts</a><a id="al_comm" href="#">Like comments</a><ul id="al_comm_ul"></ul></div>');
	$('#al_post').bind('mouseover', function(){
		var nevek = [];
		var tmp_nevek = [];
		var i;
		$('.UIStory .UIIntentionalStory_Names a').each(function(index){		
			tmp_nevek[$(this).text()] = 1;
		});
		$('.storyContent .actorName a').each(function(index){		
			tmp_nevek[$(this).text()] = 1;			
		});
		for (i in tmp_nevek){
			nevek.push(i);
		}	
		nevek.sort();
		$('#al_post_ul').text('');
		for (i=0; i<nevek.length; i++) {
			$('#al_post_ul').append('<li><a class="like_post">'+nevek[i]+'</a></li>');	
		}	
		$('#al_post_ul a').bind('click',function(){
			$('#al_menu ul').hide();
			if (confirm('Do you LIKE all the posts of '+$(this).text()+'?')){
				var likes = 0;
				var name_to_like = $(this).text();
				$('.UIStory').each(function(){
					if ($(this).find('.UIIntentionalStory_Names a:contains("'+name_to_like+'")').length>0){
						likes++;
						$(this).find('.like_link:eq(0)').attr('id','tolike_'+likes);
						$(this).css('background-color','lightblue');
						$('body').append('<script>document.getElementById("tolike_'+likes+'").click();</script>');
					}
				});
				alert(likes+" posts liked.");
			}
		});
		$('#al_post_ul').slideDown();	
		$('#al_comm_ul').stop(true,true).hide();
	});	
	$('#al_comm').bind('mouseover', function(){
		var nevek = [];
		var tmp_nevek = [];
		var i;		
		$('.actorName').each(function(index){		
			tmp_nevek[$(this).text()] = 1;
		});
		for (i in tmp_nevek){
			nevek.push(i);
		}	
		nevek.sort();
		$('#al_comm_ul').text('');
		for (i=0; i<nevek.length; i++) {
			$('#al_comm_ul').append('<li><a class="like_post">'+nevek[i]+'</a></li>');	
		}	
		$('#al_comm_ul a').bind('click',function(){
			$('#al_menu ul').hide();
				if (confirm('Do you LIKE all comments of '+$(this).text()+'?')){
					var likes = 0;
					var name_to_like = $(this).text();
					$('.uiUfiComment').each(function(){
						if ($(this).find('.actorName:contains("'+name_to_like+'")').length>0){
							likes++;
							$(this).find('button:eq(0)').attr('id','tolike_'+likes);
							$(this).css('background-color','lightblue');
							$('body').append('<script>document.getElementById("tolike_'+likes+'").click();</script>');
						}
					});
					alert(likes+" comments liked.");
				}
		});		
		$('#al_comm_ul').slideDown();	
		$('#al_post_ul').stop(true,true).hide();		
	});	
	$('#al_post_ul').bind('mouseleave',function(){
		$(this).stop(true,true).slideUp();
	});	
	$('#al_comm_ul').bind('mouseleave',function(){
		$(this).stop(true,true).slideUp();
	});	
});