// ==UserScript==
// @name           pixiv rating helper
// @version        1.3.0
// @namespace      http://wazly.blog87.fc2.com/
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// ==/UserScript==

(function($){
	$.ajaxSetup({
		dataType: 'html',
		timeout: 5000,
		cache: false
	});
		var Illust = function(id){
			this.id = id;
			this.viewed = new Number(($('#unit>h4').text().match(/閲覧数：+(\d{1,})/))[1]);
			this.rated = new Number(($('#unit>h4').text().match(/評価回数：+(\d{1,})/))[1]);
			this.scored = new Number(($('#unit>h4').text().match(/総合点：+(\d{1,})/))[1]);
			this.averageScored = this.rated == 0 ? 0 : (this.scored / this.rated).toFixed(2);
			this.averageRated = this.viewed == 0 ? 0 : Math.round(this.rated / this.viewed * 100);
			this.bookmarked = [0,0,0];
		};
		var User = function(id){
			this.id = id;
			this.isPremium;
			this.isRegisteredBy;
			this.isMypixiv;
		}
		Illust.prototype = {
			insertAge: function(){
				var ary;
				var past;
				var now = (new Date()).getTime() + (new Date()).getTimezoneOffset()*60*1000 + 540*60*1000;
				ary = ($('#contents .works_data>p:first').text()).match(/\d{1,}/g);
				past = (new Date(ary[0], ary[1] - 1, ary[2], ary[3], ary[4], 0, 0)).getTime();
				var minutes = (now - past) / 1000 / 60;
				var hours = minutes / 60;
				var days = hours / 24;
				var years = days / 365;
				var age = '';
				if (Math.floor(years)) {
					age += Math.floor(years) + '年';
				}
				if (Math.floor(days)) {
				age += Math.floor(days) % 365 + '日';
				}
				if (Math.floor(hours)) {
				age += Math.floor(hours) % 24 + '時間';
				}
				age += Math.floor(minutes) % 60 + '分';
				age += '前';
				var maxRG = '180'
				var rg = Math.floor((days / 365) * maxRG);
				if(rg > maxRG){rg = maxRG}
				$('<div/>',{
					id: 'age',
					css: {
						color : 'rgb(' + rg + ',' + rg + ',255)'
					},
					text: age
				}).insertAfter('#contents .works_data>p:first');
			},
			changeRatingAll10: function(){
				$('#unit>.unit-rating>li>a').attr({
					'title': '10点',
					'onClick': 'javascript:countup_rating(10)'
				});
			},
			displayLettersLeft: function(){
				$('<span/>',{
					id: 'lettersLeft',
					css: {
						'margin-left': '70%',
						'color': '#CCCCCC'
					},
					text: '140'
				}).appendTo('#one_comment+strong');
				$('input[name="comment"]').bind('input', function(e){
					var l = ($(this).val()).length;
					$('#lettersLeft').css({
						'color': ((l <= 140) ? '#CCCCCC' : '#D40D12')
					}).text(140 - l);
				})
			},
			colorComment: function(color1, color2){document.addEventListener('DOMNodeInserted', function(){
				$('#one_comment_area p.worksComment a[href$="' + $('#rpc_u_id').text() + '"]').parent().css({'background': color1});
				$('#one_comment_area p.worksComment a[href$="' + $('#rpc_e_id').text() + '"]').parent().css({'background': color2});
			}, false);
			},
			displayBookmarked: function(){
				$.ajax({
					url: 'http://www.pixiv.net/bookmark_detail.php?illust_id=' + this.id,
					success: function(data){
						var bookmarkedCount = $(data).find('ul.count-list').clone();
						bookmarkedCount.css({'position':'absolute','right':'22%','top':'0'});
						bookmarkedCount.insertBefore('div.bookmark');
					}	
				});
			}
		}
		var illust = new Illust($('#rpc_i_id').text());
		var user = new User($('#rpc_u_id').text());
		$('<div/>').text('評価率：' + illust.averageRated + '%　平均点：' + illust.averageScored).appendTo('#unit>h4');
		if(!$('#unit .current-rating').length){
			$('<li/>').attr({
				'class': 'current-rating'
			}).css({
				'opacity': '0.4'
			}).prependTo('#unit .unit-rating');
		}
		$('#unit .current-rating').css({
			'width': 26 * illust.averageScored
		});
		
		illust.insertAge();
		illust.changeRatingAll10();
		illust.displayLettersLeft();
		illust.displayBookmarked();
		illust.colorComment('#FFFCEB','#DDFFDD');
		if ($('#one_comment_area').css('display') == 'none') {
			var timer = window.setInterval(function(){
				try{
					unsafeWindow.one_comment_view();
					clearTimeout(timer);
				} catch(e){}
			},200)
		};
})(unsafeWindow.jQuery);
