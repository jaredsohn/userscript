// ==UserScript==
// @name        アナゴさん
// @namespace   http://js4.in/ns/
// @description アナゴさんの声をブラウザ内で再生させる
// @include     http://www66.tok2.com/home2/aigyagehee/*
// @version     1.0.2
// @grant       none
// ==/UserScript==

(function() {
	
	
var au = document.createElement("audio")
au.autoplay = true
document.querySelector("head").appendChild(au)

var currentsource = null

function set_anago(evt) {
	var n = evt.target
	while (n != document.body) {
		if (n.nodeName == "A") {
			if (!n.dataset.failed && /\.wav$/.test(n.href)) {
				evt.preventDefault()
				currentsource = n
				au.src = null
				au.src = n.href
			}
			break
		}
		n = n.parentNode
	}
}

function err(evt) {
	switch(au.error.code) {
	case au.error.MEDIA_ERR_ABORTED:
		break
	case au.error.MEDIA_ERR_NETWORK:
		currentsource.parentNode.replaceChild(
			document.createTextNode("ファイル無し"),
			currentsource)
		break
	case au.error.MEDIA_ERR_DECODE:
		currentsource.textContent = "デコードエラー"
		currentsource.dataset.failed = true
		break
	case au.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
		currentsource.textContent = "未対応形式"
		currentsource.dataset.failed = true
		break
	}
}

document.body.addEventListener("click", set_anago, true)
au.addEventListener("error", err, false)

})()