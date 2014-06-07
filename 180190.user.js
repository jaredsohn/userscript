// ==UserScript==
// @name       Steam - Breezy Edition
// @namespace  http://steamcommunity.com/profiles/76561198030875794/
// @version    0.1a
// @description  gl hf
// @include     http://steamcommunity.com/*
// @include     https://steamcommunity.com/*
// @include     http://store.steampowered.com/*
// @include     https://store.steampowered.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2013+, RE-O
// ==/UserScript==


$ ( "#global_header" ).before (
    $ ( "<div\>", {
    height: "53px"
    })
)
;
$ ( "#global_header" ).css({
	"position": "fixed",
	"top": "0",
	"left": "0",
	"width": "100%",
	"z-index": "9999"
})
;
$ ( ".content" ).css({
	"background-image": "",
	"background-position": "",
	"height": "52px"
})
;
$ ( ".logo" ).css({
	"padding-top": "12px",
	"width": "120px",
	"height": "30px",
	"margin-left": "0",
	"margin-right": "0"
})
;
$ ( "#logo_holder" ).children("a").children("img").attr({
	"width": "120px",
	"height": "30px"
})
;
$ ( "#supernav" ).css({
    "left": "250px"
})
;
$ ( ".menuitem.supernav" ).css({
	"padding-top": "19px",
	"padding-bottom": "22px"
})
;
$ ( ".menuitem" ).css({
	"padding-top": "19px"
})
;
$ ( ".menuitem_new" ).remove()
;
$ ( ".header_installsteam_btn.header_installsteam_btn_gray" ).remove()
;