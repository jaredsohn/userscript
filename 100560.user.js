// ==UserScript==
// @name				AMALL for Chrome
// @namespace			nuck
// @description			Makes returning llamas easier than ever before
// @match				http://my.deviantart.com/messages/*
// @match				*://www.deviantart.com/account/badges/give.php?badgetype=llama&*
// @icon				http://i54.tinypic.com/53twfm.gif
// @run-at				document-end
// ==/UserScript==

if (unsafeWindow.location.pathname.indexOf('messages') !== -1) {
	GM_addStyle('span.amall-give { background-image: url(http://i52.tinypic.com/2a9bmmc.png) !important; background-position: 0 0 !important; } span.amall-working { background-position: -15px 0 !important; } span.amall-already { background-position: -30px 0 !important; } span.amall-success { background-position: -45px 0 !important; } span.amall-error { background-position: -60px 0 !important; }');
	var contentEval = function(source) {
		if ('function' == typeof source) {
			source = '(' + source + ')();'
		}
		var script = document.createElement('script');
		script.setAttribute("type", "application/javascript");
		script.textContent = source;
		document.body.appendChild(script);
		document.body.removeChild(script);
	}
	contentEval(function(){
		DWait.ready(["jms/pages/messagebox.js"], function () {
			MESSAGE_HELPERS.list = {
				generic: function(cmd){
					if (cmd == 'render' && this.message.title == 'Llama'){
						var who = /.<a class="u" href="http:\/\/.*\.deviantart\.com\/">(.*)<\/a>/.exec(this.message.who)[1];
						$('.mcdx', $(this.node).parent()).addClass('amall-give').css({
							'display': 'block',
							'background-position': '0 -15px'
						}).attr('onclick','').unbind('click').bind('click',function(e){
							Llama(who,$(this));
							return false;
						}).bind('mousedown',function(){
							return false;
						});
					}
				},
			};
			if ($('.mcbox.mcbox-list.mcbox-list-generic .mcdx:hidden').length > 0){
				$('.mcbox.mcbox-list.mcbox-list-generic .mcdx:hidden').each(function(){
					(function(that){
						if (that.message.title == 'Llama'){
							$('.mcdx', $(that.node).parent()).addClass('amall-give').css({
								'display': 'block',
								'background-position': '0 -15px'
							}).attr('onclick','').unbind('click').bind('click',function(e){
								Llama(/.<a class="u" href="http:\/\/.*\.deviantart\.com\/">(.*)<\/a>/.exec($(this).parent().parent().data('mcbox').message.who)[1],$(this));
								return false;
							}).bind('mousedown',function(){
								return false;
							});
						}
					})($(this).parent().parent().data('mcbox'));
				});
			}
			var Llama = function(u,s){
				s.addClass('amall-working');
				$.ajax({
					dataType: 'json',
					url: 'http://my.deviantart.com/global/difi/?c[]="User","getGiveMenu",["' + u + '"]&t=json',
					success: function(r){
						var clicky = $('a:contains(Llama Badge)', r.DiFi.response.calls[0].response.content.html).attr('onclick');
						if (!clicky && r.DiFi.response.calls[0].response.content.html.indexOf('Already gave a Llama') !== -1){
							// [STATUS] ALREADY GAVE A LLAMA
							s.addClass('amall-already').removeClass('amall-working');
						} else {
							var userNum = /Badges\.buildModal\(\\?\'llama\\?\', (\d+)\)/.exec(clicky)[1];
							var i = 0;
							$('<iframe>').attr('src','http://www.deviantart.com/account/badges/give.php?badgetype=llama&to_user='+userNum).css({'display': 'none', 'height': 0, 'width': 0}).appendTo('body').load(function(){
								i++;
								if (i == 2) {
									s.addClass('amall-success').removeClass('amall-working');
									$(this).remove();
									
									// DOUBLE CHECK THAT IT SENT
									$.ajax({
										dataType: 'json',
										url: 'http://my.deviantart.com/global/difi/?c[]="User","getGiveMenu",["' + u + '"]&t=json&t=' + Date.now(),
										success: function(resp){
											if (resp.DiFi.response.calls[0].response.content.html.indexOf('Already gave a Llama') == -1){
												// [STATUS] ERROR
												s.addClass('amall-error').removeClass('amall-working');
											}
										}
									});
								}
							});
						}
					},
					error: function(){
						// [STATUS] ERROR
						s.addClass('amall-error').removeClass('amall-working');
					}
				});
			};
		});
	});
} else if (unsafeWindow.location.pathname.indexOf('give.php') !== -1) {
	document.getElementById('tos').checked = true;
	document.getElementById('password_remembered').checked = true;
	document.getElementsByTagName('form')[0].submit();
}