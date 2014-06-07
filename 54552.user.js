// ==UserScript==
// @name           Mashable Sans Twitter Sories
// @namespace      blurg!
// @description    Hides any stories about twitter - or any stories that mention twitter - or any story links in the sidebar that mention twitter - or any icons that link to twitter - or any widgets that link to twitter services...i think you get the gist.
// @include        http://mashable.com/
// @include        http://mashable.com/page/*
// @version        0.4
// ==/UserScript==

if ( top === window ){

	function mashsans(){

		GM_addStyle('#news-channels>.content>ul>li:first-child, '+
			'#mashable-lists>.content>ul>li:first-child,'+
			'.wdt_button, .twitter, .icon-twitter, #tweetmeme_buttonS, #tweetmeme_button'+
			'{display:none !important;}');

		var tf = document.querySelector('#bd>.yui-b>.follow-mashable>.inner>p');
		tf.innerHTML=tf.innerHTML.split('Twitter Followers, ')[1];
		tf.previousElementSibling.setAttribute('style','margin-left:30px;');

		document.evaluate("//div[@id='bd']/div[@class='yui-b']/div[7]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
			.singleNodeValue.setAttribute('style','display:none !important;');

		var qsa=document.evaluate( "//div[@id='yui-main']/div[@class='yui-g']/div[@class='hreview']/ul[@class='post-list']/li[contains(@class, 'post')]|"+
			"//div[@id='tags']/a|"+
			"//ul[@id='news']/li|"+
			"//ul[@id='lists']/li|"+
			"//div[@class='mega-list']/ul/li|"+
			"//ul[@id='popular']/li|"+
			"//ul[@id='commented']/li" 
			, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

		var reg = new RegExp("twitter|tweet", "gim");
			
		for (var i = 0; i < qsa.snapshotLength; i++) {
			
			var item = qsa.snapshotItem(i);
			var tc = item.textContent;
			if(item.hasAttribute('id') && item.getAttribute('id').match('post-')){
				tc = item.querySelector('.headline').textContent+item.querySelector('.text-content').textContent;
			}
			if(tc.match(reg)){
				item.setAttribute('style','display:none !important;');
			}
		}

	}
	var si = window.setInterval(function(){ //we have to wait for all those fucking sidebar widgets to load, because that's why people visit the site right, to read fucking widgets from 3rd party sites right?
		if(document.getElementById('tags')){
			window.clearInterval(si);  
			mashsans();
		}
	},500);

}


