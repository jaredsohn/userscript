// ==UserScript==
// @name         CroudiaPlus
// @namespace    http://mithrilworks.jp/
// @description  Extend for Croudia
// @author       Giemsa
// @include      https://croudia.com/*
// @version      0.1.6
// ==/UserScript==

function addJQuery(callback){
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
	script.addEventListener('load', function(){
		var script = document.createElement("script");
		script.textContent = "jQuery.noConflict(); (" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQuery(function(){
	// ささやくエリア生成
	function createPostField(){
		var token = $('meta[name=csrf-token]').attr('content');
		var field = '<form style="position: relative;" method="post" enctype="multipart/form-data" data-ajax="false" action="/voices/write" accept-charset="UTF-8">	\
						<div style="width: 100%; padding-right: 120px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; -ms-box-sizing: border-box; box-sizing: border-box;">	\
							<input type="text" name="voice[tweet]" autocomplete="off" style="width: 100%; padding: 4px; font-size: 120%; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; -ms-box-sizing: border-box; box-sizing: border-box;"/>	\
						</div>		\
						<input type="hidden" value="✓" name="utf8">	\
						<input type="hidden" id="token" value="" name="authenticity_token">	\
						<input type="submit" id="send" style="position: absolute; width: 120px; right: 0; top: 0; height: 100%;" value="ささやく" />		\
					</form>';
		$('.ui-content').before(field);
		$('#token').val(token);
	};

	// リンク生成
	function setNavigate(){
		$('div.ui-btn-text').each(function(){
			var link = $(this);
			var c = link.children('a.ui-link-inherit');
			var n = link.next();
			var a = c.attr('href');
			if(a){
				var id = a.split('/')[3];
				n.attr('uhref', a).css('z-index', 3);
				c.children('p.ui-li-desc:nth-child(2)').append([
					'&nbsp;',
					'<a href="https://croudia.com/voices/response_input/', id, '" data-rel="dialog" class="ui-link" style="text-decoration: underline;">返信</a>',
					'&nbsp;',
					'<a href="https://croudia.com/voices/quotation_input/', id, '" data-rel="dialog" class="ui-link" style="text-decoration: underline;">引用返信</a>'
				].join(''));
			}
			c.attr('data-orig-href', a);
			c.removeAttr('href');
		});
		
		var link = $('a.ui-link-inherit');
		
		link.children('p.ui-li-desc:nth-child(3)').each(function(){
			var link = $(this);
			var t = link.text()
				.replace(/(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/gi, '<a href="$1" target="_blank">$1</a>')
				.replace(/(@([a-zA-Z0-9_]+))/gi, '<a href="https://croudia.com/$2">$1</a>');
			link.html(t).css({
				'font-size': '95%',
				'line-height': '1.4em',
				'margin-top': '2px'
			});
		});
	};
	
	// わつはぷ
	function allVoices(){
		$('a[data-icon=refresh] > span.ui-btn-inner').html('<span class="ui-btn-text">		\
				<h1 class="h_90">みんなのささやき</h1>		\
			</span>		\
			<span class="ui-icon ui-icon-test-tweet ui-icon-shadow"></span>'
		);
		
		$('a[data-icon=refresh]').attr('href', 'https://croudia.com/search/all_voice');
	}
	
	// 追加読み込み分のリンク生成
	var tl = $('#tweet');
	if(tl.size() == 0)
		tl = $('#all_voice_list');
	tl[0].addEventListener('DOMNodeInserted', (function(){
		var cnt = 0;
		return function(e){
			if(e.target.tagName == 'LI' && ++cnt == 20){
				setTimeout(function(){ setNavigate(); }, 10);
				cnt = 0;
			}
		};
	})(), false);
	
	tl.delegate('.ui-li-icon.avatar.ui-li-thumb', 'click', function(e){
		location.href = '/' + $(this).next().find('span.gray').text().substr(2);
	}).delegate('span.bord, span.gray', 'click', function(e){
		location.href = '/' + $(this).next('span.gray').text().substr(2);
	});

	allVoices();
	createPostField();
	setNavigate();
	
	tl.delegate('span.ui-icon-arrow-r', 'click', function(e){
		location.href = this.getAttribute('uhref');
	});
});