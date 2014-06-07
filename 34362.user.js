// ==UserScript==
// @name           Reddit parent comment 
// @namespace      Reddit parent comment
// @description    Mouse over "parent" link to show parent comment.
// @include        http://www.reddit.com/r/*/comments/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @grant          GM_addStyle
// ==/UserScript==

$(document.body)
	.on('mouseenter','a.bylink[href^="#"]',show)
	.on('mouseleave','a.bylink[href^="#"]',hide)

GM_addStyle(
	'.parentPreviewww {background-color: #f5f5f5; border: 1px solid #5F99CF; padding:7px;}'
	+'.parentPreviewww .flat-list.buttons {display:none;}'
	+'.parentPreviewww .expand {display:none;}'
)
	
function show(evt){
	var t = $(this);
	var id = t.attr('href').replace(/^#/,'')
	var divParent = $('div.comment.id-t1_'+id+' div.entry:first').clone()
		.addClass('parentPreviewww')
		.css({position:'absolute', top:evt.pageY, left:evt.pageX+t.width()})
		.appendTo(document.body)
	var pos = divParent.offset();
	var h = divParent.outerHeight();
	if( pos.top + h  > window.innerHeight + window.pageYOffset)
		divParent.css({top: window.innerHeight + window.pageYOffset - h - 25})
}
function hide(evt){
	$('.parentPreviewww').remove()
}