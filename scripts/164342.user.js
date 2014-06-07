// ==UserScript==
// @name           pixiv_rating_for_autopagerize
// @version        1.0
// @namespace      http://userscripts.org/users/438377
// @author         henge
// @description    autopagerizeなどで読み込んだ作品ページでも評価ができるようにする
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @include        http://www.pixiv.net/novel/show.php?id=*
// @run-at         document-end
// ==/UserScript==

// 参考 thanks for:
// http://javascripter.hatenablog.com/entry/20090324/1237903880
// http://efcl.info/2009/1122/res1483/
function evalInPage(fun) {
	location.href = "javascript:void (" + fun + ")()";
}

evalInPage(function () {
	pixiv.rating = {
		store: [],
		create: function(node){
			var index = this.store.push({
				rate  : 0,
				width : 26,
				height: 26,
				offset: null,
				container      : null,
				ratingContainer: null,
				statusContainer: null,
				illustId: null,
				node: node
			});
			this.setup(this.store[index - 1]);
		},

		setup: function(st) {
			var self = this;
			var rated = $(st.node).find(".rating").hasClass("rated");
			if (rated) return;

			st.illustId = parseInt($(st.node).find('.bookmark-container a').attr("href").match(/\d+/));
			st.container = $(st.node).find('.score');
			st.ratingContainer = $(st.node).find('.rating', st.container)
				.mousemove(function(e){self.update(e.pageX, e.pageY, st);})
				.mouseleave(function(e){self.clear(st)});

			pixiv.user.loggedIn && st.ratingContainer.click(function(e){self.apply(st)});
			st.statusContainer = $(st.node).find('.status', st.container);
		},

		update: function(x, y, st) {
			var container = st.ratingContainer,
				width = st.width,
				height = st.height,
				offset = st.offset || (st.offset = container.offset()),
				top = y - offset.top + 1,
				left = Math.max(x - Math.ceil(offset.left), 0) + 1,
				rate = Math.ceil(left / width);

			if (pixiv.user.bitter) {
				left -= width * (rate - 1);

				switch (rate) {
				case 1:
					rate = this.slim(rate, left, top, 0.45, 0.55, st);
					break;
				case 2:
					rate = this.slim(rate, left, top, 0.4, 0.6, st);
					break;
				}
			}

			if (rate !== st.rate) {
				container
					.removeClass('rate-' + st.rate)
					.addClass('rate-' + rate);
				st.rate = rate;
			}
		},

		clear: function(st) {
			st.ratingContainer.removeClass('rate-' + st.rate);
			st.rate = 0;
			st.offset = null;
		},

		slim: function(rate, x, y, min_x, max_x, min_y, max_y, st) {
			$.type(min_y) === 'number' || (min_y = min_x);
			$.type(max_y) === 'number' || (max_y = max_x);
			var width = st.width, height = st.height;
			return (
				x < width * min_x || x > width * max_x ||
				y < height * min_y || y > height * max_y
			) ? 0 : rate;
		},

		apply: function(st) {
			var rate = st.rate,
				container, rated_count, score_count,
				width;

			if (!rate || rate > 10) return false;

			this.send(rate, st);

			container = st.container;
			rated_count = $('.rated-count', container);
			score_count = $('.score-count', container);
			rated_count.text(+rated_count.text() + 1);
			score_count.text(+score_count.text() + rate);

			width = st.width;
			st.statusContainer
				.text(rate)
				.css('left', width * rate - width / 2)
				.animate({
					marginTop: -20,
					opacity  : 0
				}, 'slow', function() {
					$(this).remove();
				});

			st.ratingContainer
				.addClass('rated rate-' + rate)
				.unbind();
			pixiv.context.rated = true;

			return false;
		},

		send: function(rate, st) {
			var q = {
				mode : 'save',
				i_id : st.illustId,
				u_id : pixiv.user.id,
				qr   : +pixiv.context.hasQuestionnaire,
				score: rate
			};
			return pixiv.api.post('./rpc_rating.php', q);
		}
	};
	document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(e){
		pixiv.rating.create(e.target);
	}, false);
	document.body.addEventListener('AutoPatchWork.DOMNodeInserted', function(e){
		pixiv.rating.create(e.target);
	}, false);
	document.body.addEventListener('AutoPagerAfterInsert', function(e){
		pixiv.rating.create(e.target);
	}, false);
});

