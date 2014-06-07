// ==UserScript==
// @author			Edgars Vasiļjevs
// @name			Draugiem.lv Supercharged
// @namespace			9abcc62df0cb2316c96e832bc2023f9d
// @version			3.0.1
// @include			http://www.draugiem.lv/*
// @match			http://www.draugiem.lv/*
// @run-at 			document-start
// ==/UserScript==

	// inject
	(function(callback) {
		var script = document.createElement("script");
		script.setAttribute('src', 'http://ifrype.com/v64/js/jsbase-1.0.0.min.js');
		script.addEventListener('load', function() {
			var script = document.createElement('script');			
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	})(init);
	
	function init() {

		var pageTitle = top.document.title, msgs = 0, times_checked = 0, ajax_cnt, common_save = [], focusFlag = 0; 

		$('.userPicture').live('mouseenter', function() {
			var id = $(this).find('img[src$=jpg]').attr('src').split('_')[1].split('.')[0];
			
				css = 'z-index: 9999999; display: block; width: 30px; height: 30px; opacity: 0.9; position: absolute; border: 1px solid gray; border-radius: 5px; box-shadow: 0 0 3px #DDDDDD inset;';
			
			$(this).append('<a class="hadzaa" title="Apskatīt profila bildi" 	href="javascript:;" onclick="InfoBox.open(\'/friend/picture.php?fid='+id+'\',{width:710,overlayClose:true});return false;" style="'+css+'; background: white url(http://ifrype.com/i/icons/search.png) no-repeat 8px 8px; top: -3px; left: -3px;"></a>');
			$(this).append('<a class="hadzaa" title="Rakstīt vēstuli" 			href="javascript:;" onclick="return D.sendMail('+id+');" style="'+css+'; background: white url(http://ifrype.com/i/icons/messagesCreate.png) no-repeat 7px 7px; top: 31px; left: -3px;"></a>');
								
		}).live('mouseleave', function() {
			$('a.hadzaa').remove();
		});

		//remove some ads
		$('#MiniAdsContainer1, div[id*=adv], .miniAdsContainer').remove();
		
		// msg
		check_messages = function(checkMSGS) {
			if (!checkMSGS) {
				top.document.title = pageTitle;
				clearInterval(window.blink);
				clearInterval(window.check);
				times_checked = 0;
				msgs = 0;
				return;
			}
			window.check = setInterval(function () {
				$.get('/messages/rq/list.php?p=inbox&pg=1&uid=0', function(data) {
					msgcount = parseInt($('.unread',data).size());
					if (msgs != msgcount && msgcount) {
						msgs = msgcount;
						if (window.blink) clearInterval(window.blink);
						window.blink = setInterval(function() {
							msg = (/1$/.test(msgcount) && !/11$/.test(msgcount)) ? 'jauna vēstule!' : 'jaunas vēstules!';
							top.document.title = (top.document.title == pageTitle) ? 'Tev ir '+msgcount+' '+msg : pageTitle;
						}, 500);
					}
					else if (msgcount == 0) {
						check_messages(false);
						check_messages(true);
					}
				});
				if (times_checked++ == 720) check_messages(false);
			},10000);
		}
		
		$(window).blur(function() {
			check_messages(true);
		}).focus(function() {
			check_messages(false);
		});

	}
