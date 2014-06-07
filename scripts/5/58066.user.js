// ==UserScript==
// @name           TwitterFilter
// @namespace      http://twitter.com/rokudenashi
// @include        http://twitter.com/*
// @exclude        http://twitter.com/*/status/*
// @exclude        http://twitter.com/*/statuses/*
// @description        twitterのPOSTをフィルタリング
// ==/UserScript==

(function(){
	var rule = [
		//多重RTを薄く
		{'re':/RT:? @\w/,'bgcolor':'#CCC'},
		{'re':/(RT:? @\w.*){2}/,'css':{'opacity':'0.8'}},
		{'re':/(RT:? @\w.*){3}/,'css':{'opacity':'0.6'}},
		{'re':/(RT:? @\w.*){4}/,'css':{'opacity':'0.4'}},
		{'re':/(RT:? @\w.*){5,}/,'css':{'opacity':'0.2'}},
		{'re':/^RT:? @\w*:? ?RT @/,'hide':true}, //コメント無し多重RT

		//NGワード
		{'words':['censored','出社'],'hide':true},
		{'re':/^http\:[\/\.\w]*$/,'hide':true}, //URLのみ
		{'words':['チンコ','チンポ','貧乳','巨乳','オナニー','おっぱい','ちんちん','ぱんつ','ふぇら','フェラ','フェラチオ','セックス','せっくす','まんこ','ちんこ','幼女','縞パン','縞ぱん','ロリコン','ショタコン','オナホ','アナル','射精','マンコ','ペニス','ブルマ','淫乱','金玉','顔射','sex','SEX','SEX','TENGA','勃起','陰毛','イマラチオ','イラマチオ','おめこ','陰茎','クンニ','マン汁','センズリ','パイパン','肉棒','ペド'],'css':{'opacity':'0.4'}}, //censored

		{'source':'API','bgcolor':'#CCC'},
		{'source':'twitterfeed','bgcolor':'#CCC'},
		{'source':'Tumblr','hide':true},
		{'protected':true,'bgcolor':'#FCF'},

		//注目
		{'words':['rokudenashi','ろくで','だめ','ダメ','駄目'],'bgcolor':'#FFE'},

		//in_reply_toなしのreplyを薄く
		{'re':/@rokudenashi/,'css':{'opacity':'0.2'}},
		{'re':/@rokudenashi/,'in_reply_to':/in reply to rokudenashi/,'css':{'opacity':'1.0'}},

		//spam
		{'words':['Click the link'],'source':'API','css':{'opacity':'0'}},
	]

	var w = this.unsafeWindow || window
	var consoleWindow = null
	var log = function(s) {
		if(!consoleWindow)consoleWindow = open('','console')
		consoleWindow.console.log(s)
	}

	function checkCond(rule,entry,status) {
		if (rule['re']&&!status.match(rule['re'])) return false
		if (rule['protected']&&!w.$('.lock-icon',entry).length) return false
		if (rule['source']&&w.$('.entry-meta a[rel=nofollow]',
				entry).text()!=rule['source']) return false
		if (rule['in_reply_to']&&!w.$('.entry-meta',entry).text().match(rule['in_reply_to'])) return false
		return true
	}

	function execRule(rule,entry,status) {
		if (checkCond(rule,entry,status)) {
				if (rule['bgcolor'])
					entry.css('background-color',rule['bgcolor'])
				if (rule['hide']) {
//					entry.hide()
					w.$('.entry-content',entry).hide()
					entry.css({'opacity':'0.25'})
				}
				if (rule['css']) entry.css(rule['css'])
		}
	}

	w.$(rule).each(function() {
		if (this['words']) this['re'] = new RegExp(this['words'].join('|'))
	})
	function filter() {
		w.$('.hentry:not(.filtered)').each(function() {
			var entry = w.$(this)
			var status = w.$('.entry-content',entry).text()
			for (i=0;i<rule.length;i++)execRule(rule[i],entry,status)
			w.$(rule).each(function(){execRule(this,entry,status)})
			var c = w.$('.entry-content',entry)
			if (c&&c.html()) c.html(c.html().replace(/\n/g,'<br>'))
			entry.addClass('filtered')
		})
	}
	filter()

	var originalOnPageChange = w.onPageChange
	w.onPageChange = function(A) {
		filter()
		return originalOnPageChange(A)
	}
	var originalProcessTimelineRefresh = w.processTimelineRefresh
	w.processTimelineRefresh = function(J,D) {
		originalProcessTimelineRefresh(J,D)
		filter()
	}

})()
