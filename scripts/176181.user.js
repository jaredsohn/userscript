// ==UserScript==
// @name        Dobrochan youtuber
// @namespace   udp://insomnia/*
// @include     http://dobrochan.com/*
// @include     https://dobrochan.com/*
// @version     1
// ==/UserScript==

$('<style type="text/css"> .yuki_ytholder {float: left;} .yuki_clickable { cursor: pointer; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: -moz-none; -ms-user-select: none; user-select: none; } .de-ytube-link:before {content:"";background:url(https://youtube.com/favicon.ico) no-repeat center;margin:0 4px;padding:0 16px 0 0;} </style>').appendTo("head");

$('div.message a').each(function(index){
	var l = $(this);

	if(l.text().indexOf('YouTube: ') == 0 && l.attr('href').indexOf('http://www.youtube.com/watch?v=') == 0){
		console.log(l.closest(".postbody"));
		var ytId = l.attr('href').replace('http://www.youtube.com/watch?v=','');
		l.addClass('de-ytube-link');
		l.on('click', function(event){
			event.preventDefault();
			if($(this).closest(".postbody").parent().find('.yuki_ytholder').length > 0){
				$(this).closest(".postbody").parent().find('.yuki_ytholder').replaceWith($('<div class="yuki_ytholder"><img src="https://i.ytimg.com/vi/'+ytId+
					'/0.jpg" height="270" width="360" class="yuki_clickable"/><br/><span style="font-size: 50%;" class="yuki_clickable" onclick="$(this).parent().remove();">[x]</span></div>').find('img').on('click', function(ytId){
						return function(event){
							$(this).replaceWith($('<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + ytId +
							 '" wmode="transparent" width="360" height="270">'));
						}
					}(ytId)).parent());
			}else{
				$(this).closest(".postbody").before($('<div class="yuki_ytholder"><img src="https://i.ytimg.com/vi/'+ytId+
					'/0.jpg" height="270" width="360" class="yuki_clickable"/><br/><span style="font-size: 50%;" class="yuki_clickable" onclick="$(this).parent().remove();">[x]</span></div>').find('img').on('click', function(ytId){
						return function(event){
							$(this).replaceWith($('<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + ytId +
							 '" wmode="transparent" width="360" height="270">'));
						}
					}(ytId)).parent());
			}
			$(this).closest(".postbody").css('clear', 'left');
		});
	}
});
