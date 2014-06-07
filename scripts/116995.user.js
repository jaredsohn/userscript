// ==UserScript==
// @name           google_reader_max
// @namespace      http://userscripts.org/scripts/show/116995
// @description    把google-reader的阅读区域放到最大（custmozier max readable area）
// @include        http*://*.google.com*/reader/*
// ==/UserScript==

	/* 以下是修改样式---modify css style*/
var styleText='';

	styleText+='#viewer-top-controls-container {margin-top:-16px;}';	
	styleText+='#title-and-status-holder,#entries,#viewer-top-controls,#entries.list .entry .collapsed  {padding:0 0 0 0;}';
	styleText+='#entries.list .entry .collapsed  {line-height: 2ex;    height:30px;}';
	styleText+='#lhn-add-subscription  {top:34px;    margin-top: -37px;width: 90px;}';
	styleText+='#viewer-header,#lhn-add-subscription-section  {height:27px;}';
	styleText+='.scroll-tree li.folder .link, .scroll-tree li.sub {    height: 21px;}';
	styleText+='.lhn-section-primary {    line-height: 14px;}';
	styleText+='#reading-list-unread-count {    line-height: 2px;}';
	styleText+='#home-section {    padding: 0.1em 0;}';
	
	/* 隐藏不想显示的组件---hide unwanted compoment (id-# class-.) ,#home-section ,#lhn-recommendations ,#lhn-selectors */
	styleText+='#scrollable-sections-top-shadow,#scrollable-sections-bottom-shadow,.gbh,#gb, #gbar,#top-bar {display:none}';
	
	/* 自定义显示尺寸为最大区域---custmozier max readable area */
	styleText+='.entry .entry-body, .entry .entry-title, .entry .entry-likers { max-width: 100%;}';
	styleText+='#nav  {width: 400px;}';
	styleText+='.folder .folder .name-text {max-width: 270px;}';
	styleText+='.folder .folder .name-text.folder-name-text {max-width: 180px;}';
	// styleText+='#gb.gbes, #gb.gbesi {    height: 24px;}	';

/* Write down the style---------------------------- */

var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode(styleText);

style.type = 'text/css';
if(style.styleSheet)  style.styleSheet.cssText = rules.nodeValue;
else style.appendChild(rules);
head.appendChild(style); 