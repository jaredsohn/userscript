// ==UserScript==
// @name        Bigger emotes hitbox.tv
// @author Technomancer
// @namespace   any size emote
// @description can display any emote of any size
// @include     *.hitbox.tv/*
// @version     .21
// ==/UserScript==

GM_addStyle ("					\
	.chat .smiley {				\
	height: inherit !important; \
	max-height:64px;			\
	width: auto;				\
	margin-top: top;			\
        vertical-align: top; \
}");