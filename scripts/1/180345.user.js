// ==UserScript==
// @name         MAL Series Stats
// @namespace    http://userscripts.org/users/92143
// @version      0.2
// @description  Adds genres, score and other series stats to the Tags column of MAL user lists. Can be used with "Custom Tags Filter for MAL" for quick filtering. 
// @include      /^http\:\/\/myanimelist\.net\/animelist\/[^\/]+/
// @include      /^http\:\/\/myanimelist\.net\/mangalist\/[^\/]+/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

String.prototype.contains = function(s) {
	return this.indexOf(s) !== -1
}
String.prototype.startsWith = function(s) {
		return this.slice(0, s.length) == s
}

var ANIME_URL_T = '64'
var MANGA_URL_T = '65'
var ANIME_RE = /^[\s\S]*?Genres\:\ (.*)[\s\S]*?Status\:\ [\s\S]*?Type\:\ [\s\S]*?Episodes\:\ [\s\S]*?Score\:\ ([\d\.]*?)\ \(scored\ by\ ([\d\,]*?)\ users\)[\s\S]*?Ranked\:\ (\#\d*)[\s\S]*?Popularity\:\ [\s\S]*?Members\:\ [\s\S]*?$/
var MANGA_RE = /^[\s\S]*?Genres\:\ (.*)[\s\S]*?Status\:\ [\s\S]*?Volumes\:\ [\s\S]*?Score\:\ ([\d\.]*?)\ \(scored\ by\ ([\d\,]*?)\ users\)[\s\S]*?Ranked\:\ (\#\d*)[\s\S]*?Popularity\:\ [\s\S]*?Members\:\ [\s\S]*?$/
var queryUrlT

function formatData(data, re) {
	
	return $(data).text().replace(re, function(match, p1, p2, p3, p4) {
		return '<span title="Genres"><u>G:</u></span> ' + p1 + '<br><span title="Score(Users)#Ranked"><u>S:</u></span> ' + p2 + '(' + p3.replace(',', '') + ')' + p4
	})
	
}

function init() {
	
	if(location.href.contains('/animelist/')) {
		queryUrlT = ANIME_URL_T
	}
	else {
		queryUrlT = MANGA_URL_T
	}
	
}

init()

$('span[id^="tagLinks"]').each(function() {
	var queryUrl
	var seriesId = parseInt(this.id.split('tagLinks')[1])
	if(seriesId) {
		queryUrl = '/includes/ajax.inc.php?t=' + queryUrlT + '&id=' + seriesId
	}
	else {
		return
	}
	var thisSpan = '#' + this.id
	
	GM_xmlhttpRequest({
		method: 'GET', 
		url: queryUrl, 
		onload: function(response) {
			if('' == $(thisSpan).text().trim()) {
				$(thisSpan).html('')
			}
			var re, webUrl
			if(ANIME_URL_T === queryUrlT) {
				re = ANIME_RE
				webUrl = 'http://myanimelist.net/anime/' + seriesId
			}
			else {
				re = MANGA_RE
				webUrl = 'http://myanimelist.net/manga/' + seriesId
			}
			var t = response.responseText
			if(!t.contains(' 0.00 ') || t.contains('scored by 0 users')) {
				$(thisSpan).append($('<div/>').html(formatData(t, re)).css('font-size', '10px'))
			}
			else {
				GM_xmlhttpRequest({
					method: 'GET', 
					url: webUrl, 
					onload: function(response) {
						var webScore = /\>Score\:\<\/span\>\ ([\d\.]*)\<sup\>\<small\>1\</.exec(response.responseText)[1]
						if(webScore) {
							t = t.replace(' 0.00 ', ' ' + webScore + ' ')
						}
						$(thisSpan).append($('<div/>').html(formatData(t, re)).css('font-size', '10px'))
					}
				})
			}
		}
	})
})
