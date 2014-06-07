// ==UserScript==
// @name         No Adult Verification
// @namespace    http://userscripts.org/users/92143
// @version      1.0
// @description  Skips adult verification of getchu.com and the like. 绕过Getchu等网站的成人检测。
// @include      /^http\:\/\/([^\.]+\.)?getchu\.com/
// @include      /^http\:\/\/([^\.]+\.)?(dm5|jpmanga)\.com/
// @include      /^http\:\/\/([^\.]+\.)?dlsite\.com/
// @include      /^http\:\/\/([^\.]+\.)?amazon\.co\.jp/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

//do not run in frames or iframes
if (window.top == window.self) {
	var url = location.href
	var expiration = getExpiresString(10)
	var dataArray = [{
		site: /^http\:\/\/([^\.]*\.)?getchu\.com/, 
		cookies: ['getchu_adalt_flag=getchu.com;path=/;' + expiration], 
		flag: 'getchu_adalt_flag='
	}, {
		site: /^http\:\/\/([^\.]*\.)?(dm5|jpmanga)\.com/, 
		cookies: ['isAdult=1;path=/;' + expiration], 
		flag: 'isAdult='
	}, {
		site: /^http\:\/\/([^\.]*\.)?dlsite\.com/, 
		cookies: ['adultchecked=1;path=/;' + expiration], 
		flag: 'adultchecked='
	}]
	var i = dataArray.length
	
	while(i--) {
		if(dataArray[i].site.test(url)) {
			var isNew = (-1 === document.cookie.indexOf(dataArray[i].flag))
			var j = dataArray[i].cookies.length
			while(j--) {
				document.cookie = dataArray[i].cookies[j]
			}
			if(isNew) {
				//work around first-time redirection
				location.reload()
			}
			break
		}
	}
	
	document.addEventListener('DOMContentLoaded', function() {
		if(/^http\:\/\/([^\.]+\.)?amazon\.co\.jp/.test(url)) {
			processAmazonCoJp()
		}
	}, false)
}

function getExpiresString(years) {
	var yearsLater = new Date()
	yearsLater.setFullYear(yearsLater.getFullYear() + years)
	return 'expires=' + yearsLater.toGMTString() + ';'
}

function processAmazonCoJp() {
	var yes = $('a[href^="/gp/product/black-curtain-redirect.html"]').get(0)
	if(yes) {
		yes.click()
	}
	else {
		var u = $('img[src*="/warning-adult-item"]').closest('a').attr('href')
		if(u) {
			GM_xmlhttpRequest({
				method: 'GET', 
				url: u, 
				onload: function(r1) {
					var m1 = /href\=\"(\/gp\/product\/black\-curtain\-redirect\.html.*?)\"/.exec(r1.responseText)
					if(m1 && m1[1]) {
						GM_xmlhttpRequest({
							method: 'GET', 
							url: 'http://www.amazon.co.jp' + m1[1], 
							onload: function(r2) {
								location.reload()
							}
						})
					}
				}
			})
		}
	}
}
