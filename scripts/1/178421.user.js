// ==UserScript==
// @name         Tieba Magnet Linkifier
// @namespace    http://userscripts.org/users/92143
// @version      0.6
// @description  百度贴吧磁链探测器，给magnet开头的文本添加可点击链接并附加种子(.torrent)文件搜索链接，提供磁链黑名单功能，兼容AutoPager等自动翻页扩展
// @include      /^http\:\/\/tieba\.baidu\.com\/p\//
// @include      /^http\:\/\/tieba\.baidu\.com\/f\?ct\=\d+(.*)\&z\=\d+/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

String.prototype.contains = function(s) {
	return this.indexOf(s) !== -1
}

//true：启用黑名单；false：不启用黑名单
var IS_USING_BLACKLIST = true
var DETECTION_THRESHOLD = 32

//黑名单可自行修改，每一项的空格前面是“magnet:?xt=urn:btih:”和第一个“&”（如果存在的话）之间的内容；
//空格后面是简介，也可以不写
var BLACKLISTED_ITEMS = [
	'a8e24bff230f154f4e235215beb1635484d363e2 纯洁轮舞曲', 
	'd5c3395b7c94ac6fefadac450eaa7f2173dc32e6 纯洁轮舞曲', 
	'7150B723FA02B7FF293CF4BC41A310CACFF659D6 纯洁轮舞曲', 
	'C7D68899E1EBBF4ECF418E80343BC98BF4BF4449 里番吧三神器', 
	'ED6CD12898DEA5EDFD801DF6F0D029D2C4FDE233 里番吧三神器', 
	'888C7A7DE2D6A045FC89C891E979C22DAC8A4D31 里番吧三神器', 
	'F75EF5E9C8E4AF5CEEDEBCFBEDE26AD58323E5DC 里番吧三神器', 
	'dd516974a25c7b5eb1f47ed18cd1d56ec1d65a7d 鸽子血', 
	'3B1DB285C1B15E84D64612C61A133FB86DD87648 肢体洗', 
	'NBH76CRGIUOPI6N75MXHINFKCYBV3TZ7 绅士团圣剑', 
	'c8c8af755100db0e6112123b0450ee9a93ea594f 绅士团圣剑', 
	'1a09518ed576670ac9ef5bb3a823aa1ff624ae98 绅士团圣剑', 
	'71CCA6B952DCBC57B050470235BD675205C8DEBA 绅士团圣剑', 
	'aa4c83e9f7a0cd96e6614a6da9dbb6e03e1906fe 绅士团圣剑', 
	'cf8011b1ff6cecb32accaf790b6942dbb17d141c 绅士团圣剑', 
	'5e3b3627fe03626d4a53cfc18f1341d00e0ce66b 绅士团圣剑', 
	'f2f4902312467d85840a0ba4cca59121a4a08193 绅士团圣剑', 
	'e50897e27381713f045c839fe1a4a7a142cbc84f 绅士团圣剑', 
	'da692bc346c769f235a653bb5c6cef2d704b1075 绅士团圣剑', 
	'74dd5115d488f0f6144acf36efe9213ec95ef83b 绅士团圣剑', 
	'95152a4f15f575813a04ffa4193c89b7dda152c8 绅士团圣剑', 
	'f9ecb24b0f323cb9a38a88c2218aa6d99d26ceeb 绅士团圣剑', 
	'c5c09e5ad855e38649ee6d40b9c3385205ff1943 绅士团圣剑', 
	'EQA2OXOVTWBOY3IGZ2FIWIZBGVO5QZK2 绅士团圣剑', 
	'6X3RKLNICNA5VJFFSRVUN2UEYMBOIXAV 绅士团圣剑', 
	'62B4246A284ECA832F64BFB67DFED2D4575CF6CE ナツヤスミ.'
]

function linkify(text) {
	
	return text
	.replace(/\bmagnet\:\?xt\=urn\:btih\:([0-9A-Z]+)(\&[0-9A-Z\.]+\=[^\&\<\"]+)*(?=\b|\<|$)/ig,
		function(match, p1) {
			return '<a href="' + match + '" class="magnetLinkifier" hash="' + p1.toUpperCase() + '">' + match + '</a>'
		}
	)
	
}

function modify(target) {
	
	//workaround for firefox+autopager double-loading issue; help needed for pinpointing the root cause 
	if($(target).find('.magnetLinkifier').length > 0) {
		return
	}
	
	$(target).find('div[id^="post_content_"], span.lzl_content_main')
	.find(":not(iframe):not(a)").addBack().contents()
	.filter(function() {
		//text node
		return 3 === this.nodeType
	})
	.each(function() {
		$(this).before(linkify(this.nodeValue)).remove()
	})

	$(target).find('.magnetLinkifier').each(function() {
		var hash = $(this).attr('hash')
		if(hash.length < DETECTION_THRESHOLD) {
			$(this).attr('title', '磁链长度过短，有作假和故意断开以逃避黑名单检测之嫌，请谨慎下载。')
			$(this).wrap($('<i/>'))
			$(this).after('&nbsp;(<i><a href="http://torrage.com/torrent/' + 
			decodeBase32OnDectection(hash) + '.torrent" target="_blank" class="magnetLinkifierTorrent" hash="' + hash +'">.torrent</a></i>)')
		}
		else {
			$(this).after('&nbsp;(<a href="http://torrage.com/torrent/' + 
			decodeBase32OnDectection(hash) + '.torrent" target="_blank" class="magnetLinkifierTorrent" hash="' + hash +'">.torrent</a>)')
		}
	})

	if(IS_USING_BLACKLIST) {
		if(BLACKLISTED_ITEMS) {
			$(target).find('.magnetLinkifier, .magnetLinkifierTorrent').each(function() {
				for(var i = 0; i < BLACKLISTED_ITEMS.length; i++) {
					var blacklistItem = BLACKLISTED_ITEMS[i].split(' ')
					if(blacklistItem[0].toUpperCase().contains($(this).attr('hash'))) {
						var tooltip = blacklistItem[1]
						if(tooltip) {
							$(this).attr('title', tooltip)
						}
						$(this).wrap($('<del/>'))
						break
					}
				}
			})
		}
	}

}

modify('.p_postlist')
//seemingly unnecessary for firefox+autopager
$(document)
.on('DOMNodeInserted', '.p_postlist', function(event) {
	if('p_postlist' == event.target.className) {
		modify(event.target)
	}
})

function decodeBase32OnDectection(input) {
	
	if(/^[^G-Z\=]*$/ig.test(input)) {
		return input
	}
	
	var BASE32_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567='
	var buffer = 0
	var numUnprocessedBits = 0
	var decodedHex = []
	
	var decodedHexCount = 0
	
	for(var i = 0; i < input.length; i++) {
		var value = BASE32_TABLE.indexOf(input.charAt(i))
		if (value >= 0 && value < 32) {
			buffer <<= 5
			buffer |= value
			numUnprocessedBits += 5
			if (numUnprocessedBits >= 8) {
				decodedHex[decodedHexCount++] = (buffer >>> (numUnprocessedBits - 8)) & 0xFF
				numUnprocessedBits -= 8
			}
		}
	}
	if (numUnprocessedBits > 0) {
		//GM_log('Tieba Magnet Linkifier: Possible corrupt input. ' + text + ' is not a multiple of 8 bits.')
		//zero bits padded on the right
		decodedHex[decodedHexCount++] = (buffer << (8 - numUnprocessedBits)) & 0xFF
	}
	var output = ''
	for (var i = 0; i < decodedHex.length; i++) {
		output += (decodedHex[i] < 16 ? '0' : '') + toHex(decodedHex[i])
	}
	return output
	
	function toHex(decimal) {
		var HEX_TABLE = '0123456789ABCDEF'
		var hex = HEX_TABLE.substr(decimal & 15, 1)
		while(decimal > 15) {
			decimal >>>= 4
			hex = HEX_TABLE.substr(decimal & 15, 1) + hex
		}
		return hex
	}
	
}
