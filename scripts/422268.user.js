// ==UserScript==
// @name Last.fm generate album BB-code
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description Adds an textarea on each album page on last.fm, with corresponding bb-code... Cat, dog and mouse ecosystem, but above all cheese.
// @match      http://www.last.fm/music/*/*
// @copyright  2014+, You
// @grant unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;

var imgSrc = $('img.album-cover').attr('src');
var album = $('h1[itemprop=name]').text().trim();
var artist = $('.suggestcorrection strong').eq(1).text();
var genres = $('a[rel=tag]').eq(0).text();
var data = ''
		   + '[img]' + imgSrc + '[/img]' + "\n"
           + '[size=12][artist]' + artist + '[/artist][/size]' + "\n"
           + '[b][album artist=' + artist + ']' + album + '[/album][/b] [i]' + genres +  '[/i]' + "\n"
           + 'Additional comment' + "\n";

$('.album-detail').after('<section><textarea style="width: 100%" rows="5">' + data + '</textarea></section>');