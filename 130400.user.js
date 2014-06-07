// ==UserScript==
// @name        SfReader
// @namespace   http://gmscripts.bhe.me
// @author      hitsmaxft <mfthits#gmail.com>
// @description Better SF reader UI
// @include     http://comic.sfacg.com/*
// @version     3.0.1
// @require http://code.jquery.com/jquery-1.11.0.min.js
//
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant unsafeWindow
//
// @disabled-require http://sizzlemctwizzle.com/130400js?show
// ==/UserScript==

var debug_mode = false;

if (typeof unsafeWindow == "undefined") {
	unsafeWindow = window

}

//port jquery into unsafeWindow
if(debug_mode) {
	unsafeWindow.$=jQuery
	unsafeWindow.jQuery=jQuery
}

this.$ = this.jQuery = jQuery.noConflict(true)


;(
	function(jQuery){
		var $ = jQuery

		var debug = function (msg) {
			if (debug_mode) {
				console.log(msg)
			}
		}

		var SfReader = function() {
			this.debug = debug_mode

			this.initAttr = function(){
				var attr = [
				'comicName'
				, 'picCount'
				, 'picAy'
				]

				for (i in attr) {
					var name = attr[i]
					this[name] = unsafeWindow[name]
				}

				this.cur = unsafeWindow.GetArgsFromHref(unsafeWindow.location.href, "p") - 1
                                if (-1 === this.cur) this.cur=0
				this.hostId = unsafeWindow.getHost()
				this.host = unsafeWindow.hosts[unsafeWindow.getHost()]
				this.cache = [];

				this.$curPic = $("#curPic")

				this.$statusBar = this.renderStatusBar()
				this.notif = this.$statusBar.find("#reader_notification")
				this.$pager_text = this.$statusBar.find("#page_indicator span")
				this.notif_text = this.notif.find("span")

				var imgLoadEvent = $.Deferred()
				this.$EImgLoading = imgLoadEvent

				$("#curPic").on('load', function(e) {
					$(this).get(0).scrollIntoView()
					imgLoadEvent.resolve(function(){})
				})


				$(document.body).prepend(this.$statusBar)
			}

		}

		SfReader.prototype.hookRenderPager= function() {
			setInterval((function() {
				this.$pager_text.text("第" + (this.cur+1) + "/" + this.picCount + "页")

			}).bind(this), 100);
		}

		SfReader.prototype.renderStatusBar= function(msg) {
			var box = $("<div></div>")
			box.attr("id", "sfreader_box")
			box.attr("style", "position:fixed;z-index:9999999;background-color:none;padding:10px 30px;width:100%")
			var inner_box = $("<div></div>")
			inner_box.attr("id" , "reader_notification")
			inner_box.attr("style", "display:none;")
			var pager_box = $("<div></div>")
			pager_box.attr("id", "page_indicator")
			var clean_box = $("<div style=\"clear:both\"></div>")
			var inner_span = $("<span></span>")
			inner_span.attr("style", "padding:3px 5px;font-size:1.8em;float:left;color:#fff;background-color:#AF2F15")
			pager_box.append(inner_span[0].cloneNode(true))
			inner_box.append(inner_span)
			inner_span.attr("id", "sfreader-notif-text")
			inner_box.append(clean_box)
			box.append(pager_box)
			box.append(inner_box)
			return  box
		}

		SfReader.prototype.sendMsgWithCallback = function(callback, msg, done_text) {
			this.notif_text.text(msg)
			this.notif.fadeIn()
			this.$EImgLoading.done(
				(function(callback){
					debug("loading fadeout")
				// fadeOut with done text
				setTimeout( (function() {
					this.notif.fadeOut()
					if (done_text)
						this.notif_text.text(done_text)
				}).bind(this), 600)
			}).bind(this)
				)

			callback()
		}

		SfReader.prototype.sendMsg = function(msg, timeout) {
			var latency = timeout || 2;
			this.notif_text.text(msg)
			this.notif.fadeIn()
			setTimeout(
				(function(){this.fadeOut()}).bind(this.notif)
				, 400)
		}
		SfReader.prototype.start = function(page) {
			this.initAttr();

			this.bindPagerButton();
			this.hookRenderPager();
			debug("enjoy sf reader")
		}

		SfReader.prototype.bindPagerButton = function() {

			var pagers = $(".page_turning")
			var pre_links  =  pagers.find(".redfont_input:contains(上一页)")

			var next_links  = pagers.find(".redfont_input:contains(下一页)")

			next_links.push($("#curPic").parent()[0])

			var self = this

			pre_links.each(function(ind , item){
				item.href = "javascript:;"
				item.onclick = (function(e) {
					e.preventDefault();
					this.nav2Page(-1);
				}).bind(self)
			})
			next_links.each(function(ind , item){
				item.href = "javascript:;"
				item.onclick = (function(e) {
					e.preventDefault();
					this.nav2Page(1);
				}).bind(self)
			})

		}

		SfReader.prototype.setImg = function(page) {
			var imgEl = this.$curPic
			imgEl.attr("src" , this.host  + this.picAy[page])
			this.cur = page
			debug("set img url 2 " + imgEl.src)
		}
		SfReader.prototype.render = function(page) {
			debug("rend nothing with page " + page)
		}
		SfReader.prototype.nav2Page = function(pos) {
			if (pos !== -1  && pos !== 1) {
				debug("erro in pos nav : " + pos)
				return false
			}

			var page_id = parseInt(this.cur, 0) + parseInt(pos, 0)

			if (
				page_id < 0
				|| page_id >= this.picCount
				) {

				debug("out of range")
			this.sendMsg("到头啦, 看其他话吧")
			return false
		}

		debug(" go to pageid : " + page_id)

		this.sendMsgWithCallback(
			(function(){
				debug("make resolve")
				this.setImg(page_id)
			}).bind(this)
			, "翻页中..."
			, "翻页完成"
			)

		debug("end of callback")

		setTimeout(this.render(page_id), 0)
	};

	var reader  = new SfReader()
	

	$(document).ready(function() {
			reader.start()
	})

})($)
