// ==UserScript==
// @name           TwitterCensored
// @namespace      http://twitter.com/rokudenashi
// @include        http://twitter.com/*
// @exclude        http://twitter.com/*/status/*
// @description        <censored>
// ==/UserScript==

(function(){
var ng_words = ['チンコ','チンポ','アナル','チンポー','貧乳','オナニー',
	'おっぱい','ショタ','ちんちん','ぱんつ','ふぇら','フェラ','フェラチオ',
	'セックス','せっくす','まんこ','ちんこ','幼女','縞パン','縞ぱん',
	'ロリコン','オナホ','アナル','射精','マンコ','ペニス','ブルマ','淫乱',
	'あなる','金玉','顔射','sex','SEX','TENGA','勃起','スポブラ',
	'ブラジャー','マスターベーション','膣','ぶっかけ','子宮','乳頭',
	'乳房','亀頭','ようじょ','セクロス','セックル','セクース']

var w = this.unsafeWindow || window
var ng_re = new RegExp(ng_words.join('|'),'g')
function censor() {
	w.$('*').contents().not('[nodeType=1]').each(function(){
		this.data = this.data.replace(
			ng_re,'≪censored≫')
	})
}
censor()	

var originalOnPageChange=w.onPageChange
w.onPageChange=function(A) {
	censor()
	return originalOnPageChange(A)
}

})()
