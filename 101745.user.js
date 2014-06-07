// ==UserScript==
// @name           Like vek na!!
// @namespace      facebook
// @description    Facebook like hrat ho tan!
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.facebook.com/*
// @version        1.0.5
// @copyright      Movie Corner™
// ==/UserScript==

$(function(){
	$('body').append('<style>#al_menu {z-index: 999; padding: 5px 10px; position: fixed; left: 0px; bottom: 30px; background-color: #3b5998;} #al_menu a{color: white; padding: 3px 20px 3px 10px} #al_menu ul{padding: 10px; background-color: #627aad; position: absolute; bottom: 25px; display: none;} #al_comm_ul{left: 5px;} #al_menu ul li {padding: 2px 0px;} </style>');
	$('body').append('<div id="al_menu"><a id="al_comm" href="#">Comments Like vek ang!</a><ul id="al_comm_ul"></ul></div>');
		
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
				if (confirm($(this).text()+' comments zawng zawng i Like vek dawn ania aww!!')){
					var likes = 0;
					var name_to_like = $(this).text();
					$('.uiUfiComment').each(function(){
						if ($(this).find('.actorName:contains("'+name_to_like+'")').length>0 && $(this).find('button:eq(0)').attr('title')=="Like this comment")
						{
							likes++;
							$(this).find('button:eq(0)').attr('id','tolike_'+likes);
							$(this).css('background-color','lightblue');
							$('body').append('<script>document.getElementById("tolike_'+likes+'").click();</script>');
						}
					});
					alert("Comment "+likes+" i Like e !!.");
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