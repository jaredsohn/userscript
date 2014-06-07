// ==UserScript==
// @name         Animepaper Shoutbox Mod
// @namespace	 APSBMod
// @version 	 1.15
// @include      http://www.animepaper.net/chat/*
// @author       AClockWorkLemon
// @description  Turns the AnimePaper Shoutbox into a native app sort of thing.
// ==/UserScript==

var jq = function () {
	runScript=function(){if(window.$){
	$(function () {
		var VERSION = 1.15;

		//add some loveleh css in
		$('head').append('<link rel="stylesheet" href="http://dl.dropbox.com/u/4410179/AP%20UserStyle/ShoutboxMod/' + VERSION.toString() + '/shoutbox.css" type="text/css" />')


		//Dynamically resize some stuff
		$(window).resize(resize = function() {
			$('.chatlog').height($(window).height()-95);
			$('div.console .chatsubmit input[type="text"]').width($(window).width()-60);
		});
		resize()


		//expand/retract userlist
		var chromeRedrawHack = function() {
			//hack to force chome to redraw
			var sel = document.getElementById('content');
			sel.style.display='none';
			sel.offsetHeight;
			sel.style.display='block';
			$('.chatlog').scrollTop(9001)
		}

		$('body').append('<span id="userlist-fold" class="minus"></span>');
		$('.chatbox').css('padding-right', '200px');
		var folded = false;
		$('#userlist-fold').click(function() {
			if (folded == false) {
				$('.userlist').css('display', 'none');
				$('#userlist-fold').removeClass('minus').addClass('plus');
				$('.chatbox').css('padding-right', '0');
				chromeRedrawHack();
				folded = true;
			}
			else {
				$('.userlist').css('display', 'block');
				$('#userlist-fold').removeClass('plus').addClass('minus');
				$('.chatbox').css('padding-right', '200px');
				chromeRedrawHack();
				folded = false;
			}
		});


		//Stop slowing down on window blur (give them an option to do it)
		var slow_on_blur = true;
		var onblur_handler = null;
		$.each($(window).data('events').blur, function(key, handlerObj) {
			onblur_handler = handlerObj.handler;
		});
		$('.pagesinner > h2')
			.append('<span id="blur_checkbox" class="checked">Slow down on blur:</span>')
		$('#blur_checkbox').click(function() {
			if (slow_on_blur) {
				$(window).unbind('blur')
				$('#blur_checkbox').removeClass('checked').addClass('unchecked');
				slow_on_blur = false;
			}
			else {
				$(window).bind('blur', onblur_handler)
				$('#blur_checkbox').removeClass('unchecked').addClass('checked');
				slow_on_blur = true;
			}
		});		


		//Autoupdate script
		window['ShoutboxModCurrentVersion'] = VERSION
		$("<script />").attr('type','text/javascript').attr('src','http://dl.dropbox.com/u/4410179/AP%20UserStyle/ShoutboxMod/update.js').appendTo('head');
	});

	}else{window.setTimeout(runScript,50);}}
	runScript();
};

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + jq.toString() + ')();';
document.body.appendChild(script);