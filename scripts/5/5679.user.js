// ==UserScript==
// @name	Only Torrentspy Torrents/Comments
// @namespace	http://torrentspy.gedekran.com
// @author	Kristopher
// @description	Removes all content on Torrentspy except Torrents and Comments.
// @include	http://www.torrentspy.com*
// @include	http://*torrentspy.com*
// ==/UserScript==

(function() {
head = document.getElementsByTagName('head')[0];
	if (head)
	{
		style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML =
			'body {  background: #fff; padding: 0; width: 98%; height: 100%  margin: 0px; }\n' +
			'#container {  width: 100%; padding: 0; background: #fff; }\n' +
			'#page {  width: 100%;  padding: 0; background: #fff; min-height: 0px; }\n' +
			'#search { display: none; }\n' +
			'#search-nav { display: none; }\n' +
			'#torrentdetails {  background: #fff; }\n' +
			'#torrentdetails .t-header {padding-left: 10px; padding-right: 0px; padding-top: 10px; padding-bottom: 0px; height: 55px;}\n' +
			'#torrentdetails .t-info table { width: 100%;}\n' +
			'#t-attributes table.t-detail-table {  display: none; }\n' +
			'#header {  display: none; }\n' +
			'#nav {  display: none; }\n' +
			'#cols { padding: 0; }\n' +
			'#col-right {  display: none; }\n' +
			'#col-left {  width: 100%; }\n' +
			'#footer { display: none; }\n' +
			'.adspace-top {  display: none; }\n' +
			'.adspace-side { display: none; }\n' +
			'.adspace-middle { display: none; }\n' +
			'.adspace-bottom { display: none; }\n' +
			'.adspace-details { display: none; }\n' +	
			'.content { width: 100%; padding-left: 10px; padding-right: 0px; padding-top: 0px; padding-bottom: 0px; float: left; }\n' +
			'.content table.list { width: 100%; }\n' +
			'.content table.directory { width: 100%;  margin: 0px;}\n' +
			'.content h3 { padding-top: 20px; }\n' +
			'.comment { width: 98%; }\n' +
			'table.newcomment { display: none; }\n' +
			'div.meta { display: none; }\n' +	
			'.sub-cols { display: none; }\n' +
			'.clear { display: none; }\n' +
			'.ShoutFrameBody { display: none; }\n' +
			'.swFeedTitleLinks { display: none; }\n' +
			'.list { width: 100%; }\n' +
			'.att-rateall { display: none; }\n' +
			'.t-rating { display: none; }\n' +
			'.t-altdownloads { display: none;}\n' +
			'.t-tabs { display: none; }\n' +
			'.tmsg { display: none; }\n' +
			'.content h2 { display: none;; }\n' +
			'tr { width: 100%; }\n' +
			'iframe { display: none; }\n' +


		head.appendChild(style);
	}
})();