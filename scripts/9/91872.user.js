// ==UserScript==
// @name           FanFiction.Net - Liker Script
// @namespace      http://www.stefanhayden.com
// @description    Color code the authors and stories you like and dislike
// @include        http://*.fanfiction.net/*
// @include        https://*.fanfiction.net/*
// @exclude        http://*.fanfiction.net/s/*
// @exclude        https://*.fanfiction.net/s/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var data = document.getElementsByTagName('div');

for(j = 0; j < data.length; j++)
{
	if (data[j].className.indexOf('z-list') != -1)
	{ 
	
		var hasAuthor = $(data[j]).find('a[href^="/u"]').length;
		var authorInterface = '';
	
		var s = $(data[j]).find('a[href^="/s"]:first').attr('href').split('/')[2];
		if(hasAuthor) {
			var a = $(data[j]).find('a[href^="/u"]').attr('href').split('/')[2];
		}
		
		if(hasAuthor) {
			authorInterface ='<a href="" class="like_author" style="color:blue;">Like Author</a> | '+
			'<a href="" class="dislike_author" style="color:blue;">Dislike Author</a> | ';
		}
		
		$(data[j]).append(
			'<div id="new_like_actions" style="margin:0px 0px 0px 20px; font-size:11px;">'+
			'<a href="" class="like_story" style="color:blue;">Like Story</a> | '+
			authorInterface +
			'<a href="" class="dislike_story" style="color:blue;">Dislike Story</a> |'+
			'<a href="" class="clear_story" style="color:blue;">Clear</a>'+
			'</div>'
		);
				
		//like_author
		if(hasAuthor) {
			$(data[j]).find('#new_like_actions .like_author').click(function(){ return false; });
			var elmLink = $(data[j]).find('#new_like_actions .like_author').get(0); 
			elmLink.addEventListener("click", like_author, false);
			
			if(GM_getValue("a"+a) == 'true'){
				$(data[j]).css('background-color','#C4FFCA');
				$(data[j]).find('a[href^="/u"]').css('color','green').css('font-weight','900')
			}
		}

		
		//dislike_author
		if(hasAuthor) {
			$(data[j]).find('#new_like_actions .dislike_author').click(function(){ return false; });
			var elmLink = $(data[j]).find('#new_like_actions .dislike_author').get(0); 
			elmLink.addEventListener("click", dislike_author, false);
			
			if(GM_getValue("a"+a) == 'false'){
				$(data[j]).css('background-color','#FCB0B0');
				$(data[j]).find('a[href^="/u"]').css('color','red').css('font-weight','900')
			}
		}
		

		//like_story
		$(data[j]).find('#new_like_actions .like_story').click(function(){ return false; });
		var elmLink = $(data[j]).find('#new_like_actions .like_story').get(0); 
		elmLink.addEventListener("click", like_story, false);
		

		if(GM_getValue("s"+s) == 'true'){ 
			$(data[j]).css('background-color','#C4FFCA');
			$(data[j]).find('a[href^="/s"]:first').css('color','green').css('font-weight','900')
		}	
		
		//dislike_story
		$(data[j]).find('#new_like_actions .dislike_story').click(function(){ return false; });
		var elmLink = $(data[j]).find('#new_like_actions .dislike_story').get(0); 
		elmLink.addEventListener("click", dislike_story, false);
		

		if(GM_getValue("s"+s) == 'false'){ 
			$(data[j]).css('background-color','#FCB0B0');
			$(data[j]).find('a[href^="/s"]:first').css('color','red').css('font-weight','900')
		}	
		
		//clear_story
		$(data[j]).find('#new_like_actions .clear_story').click(function(){ return false; });
		var elmLink = $(data[j]).find('#new_like_actions .clear_story').get(0); 
		elmLink.addEventListener("click", clear_story, false);
		
		//hide_dislikes
		if(GM_getValue("hide_dislikes") == true && (GM_getValue("s"+s) == 'false' || GM_getValue("a"+a) == 'false')){ 
			$(data[j]).css('display','none');
		}	
		
		
	}//if
}//for
	



function like_story(){
	var i = $(this).parents('.z-list').css('background-color','#C4FFCA')
	.find('a[href^="/s"]:first').css('color','green').css('font-weight','900').attr('href').split('/')[2];
		
		  setTimeout(function() {
			GM_setValue("s"+i, 'true');
		  }, 0);
	return false;
}


function like_author(){
	var i = $(this).parents('.z-list').css('background-color','#C4FFCA')
	.find('a[href^="/u"]:first').css('color','green').css('font-weight','900').attr('href').split('/')[2];
		
		  setTimeout(function() {
			GM_setValue("a"+i, 'true');
		  }, 0);
	return false;
}


function dislike_author(){
	var i = $(this).parents('.z-list').css('background-color','#FCB0B0')
	.find('a[href^="/u"]:first').css('color','red').css('font-weight','900').attr('href').split('/')[2];
		
		  setTimeout(function() {
			GM_setValue("a"+i, 'false');
		  }, 0);
	return false;
}

function dislike_story(){
	var i = $(this).parents('.z-list').css('background-color','#FCB0B0')
	.find('a[href^="/s"]:first').css('color','red').css('font-weight','900').attr('href').split('/')[2];
		
		  setTimeout(function() {
			GM_setValue("s"+i, 'false');
		  }, 0);
	return false;
}

function clear_story(){
	var i = $(this).parents('.z-list').css('background-color','#FFF');
	var s = i.find('a[href^="/s"]:first').css('color','blue').css('font-weight','100').attr('href').split('/')[2];
	var a = i.find('a[href^="/u"]:first').css('color','blue').css('font-weight','100').attr('href').split('/')[2];
		
		  setTimeout(function() {
			GM_setValue("s"+s, 'clear');
			GM_setValue("a"+a, 'clear');
		  }, 0);
	return false;
}


//	OPTIONS
//	-  show/hide dislikes
//
//

$('form#myform').after(
	'<div class="liker_script_options" style="padding:5px; border:1px solid #333399; margin-bottom:5px; background:#D8D8FF;">'+
	'<b>Liker Options:</b> '+
	'<a href="http://twitter.com/StefanHayden" style="float:right;">Suggest an option</a>'+
	'</div>'
);

if(GM_getValue("hide_dislikes") == true){
	$('.liker_script_options').append('<a href="" class="show_dislikes" style="color:blue">Show Dislikes</a>')

	//$('.liker_script_options .show_dislikes').click(function(){ return false; });
	var elmLink = $('.liker_script_options .show_dislikes').get(0); 
	elmLink.addEventListener("click", show_dislikes, false);

} else {	
	$('.liker_script_options').append('<a href="" class="hide_dislikes" style="color:blue">Hide Dislikes</a>')
	
	//$('.liker_script_options .hide_dislikes').click(function(){ return false; });
	var elmLink = $('.liker_script_options .hide_dislikes').get(0); 
	elmLink.addEventListener("click", hide_dislikes, false);

}



function show_dislikes(){
	setTimeout(function() {
		GM_setValue("hide_dislikes", false);
	}, 0);
	return false;
}

function hide_dislikes(){
	setTimeout(function() {
		GM_setValue("hide_dislikes", true);
	}, 0);
	return false;
}



//unsafeWindow.console.log()