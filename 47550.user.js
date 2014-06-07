// ==UserScript==
// @name		Hacker News Undead
// @namespace	http://userscripts.org/scripts/show/47550
// @description	Show links to dead items in Hacker News
// @version		0.1.8.5
// @include		http://news.ycombinator.com/
// @include		https://news.ycombinator.com/
// @include		http://news.ycombinator.com/news
// @include		https://news.ycombinator.com/news
// @include		http://news.ycombinator.com/newest
// @include		https://news.ycombinator.com/newest
// @include		http://news.ycombinator.com/x?fnid=*
// @include		https://news.ycombinator.com/x?fnid=*
// @include		http://news.ycombinator.com/item?id=*
// @include		https://news.ycombinator.com/item?id=*
// @include		http://news.ycombinator.com/submitted?id=*
// @include		https://news.ycombinator.com/submitted?id=*
// @include		http://news.ycombinator.com/saved?id=*
// @include		https://news.ycombinator.com/saved?id=*
// @include		http://news.ycombinator.com/classic
// @include		https://news.ycombinator.com/classic
// @include		http://news.ycombinator.com/active
// @include		https://news.ycombinator.com/active
// @include		http://news.ycombinator.com/best
// @include		https://news.ycombinator.com/best
// @include		http://news.ycombinator.com/noobstories
// @include		https://news.ycombinator.com/noobstories
// @include		http://news.ycombinator.com/ask
// @include		https://news.ycombinator.com/ask
//@include		http://news.ycombinator.com/active
//@include		https://news.ycombinator.com/active
// ==/UserScript==
// #FF6600 - 62C0FA 
var $hn = {
	init: function(){
		try { 
			if (document.location.href.match(/\/item\?id=/)){
				var all_titles = $xpath('//html//body//center//table//tbody//tr//td//table//tbody//tr//td[2][@class="title"]');
				var all_subtexts = $xpath('//html//body//center//table//tbody//tr//td//table//tbody//tr[2]//td[2][@class="subtext"]'); 
				this.init_single_item_page(all_titles.snapshotItem(0),all_subtexts.snapshotItem(0));
				this.normalize_color_dead_comments_color();
			}
			else {
				var all_titles = $xpath('//html//body//center//table//tbody//tr//td//table//tbody//tr//td[3][@class="title"]');
				var all_subtexts = $xpath('//html//body//center//table//tbody//tr//td//table//tbody//tr//td[2][@class="subtext"]'); 
				this.init_multi_items_page(all_titles,all_subtexts);
			}
		} catch(e) { /* alert(e); */  } 
	},
	
	init_single_item_page: function(title,subtext){
		if ((title.innerHTML).match(/\[dead\]/)) {
			this.do_undead(title,subtext);
		}
	},
	
	init_multi_items_page: function(all_titles,all_subtexts){
		for(var i=0, k=all_titles.snapshotLength; i<k; i++){
			var title = all_titles.snapshotItem(i);
			var subtext = all_subtexts.snapshotItem(i); 
			if ((title.innerHTML).match(/\[dead\]/) ){
				if((title.innerHTML).match(/item\?id=/)){
					this.do_undead(title, subtext);
				}
				else {
					title.innerHTML = (title.innerHTML).replace('[dead]', '<a title="Click to undead this link" style="color: #0063DC; text-decoration: underline;" onclick="return false;" id="undead-'+i+'" href="#">[undead]</a>');
					document.getElementById('undead-'+i).addEventListener('click', 
						function(item_title, item_subtext){
							return function(){
								$hn.do_undead(item_title, item_subtext);
							};
						}(title,subtext)
					, false) ;  
				}
			}
		}
	},
	
	do_undead : function(title,subtext){
		var url = subtext.getElementsByTagName('a')[2].href ;
		if ((title.getElementsByTagName('span')).length == 0 ){
			this.show_progress(title);
			title.getElementsByTagName('a')[0].setAttribute('href',url);
			this.end_progress(title);
			return ;
		}
		this.show_progress(title);
		var edit_url = url.replace(/item/,'edit');
		GM_xmlhttpRequest( 
			{
			method:"GET", 
			url: edit_url, headers:{ "User-Agent": navigator.userAgent }, 
			onload: function(response) { 
				response = response.responseText ;
				var original_url = 'http'+response.match(/<td>http(.*)<\/td>/)[1];
				title.getElementsByTagName('a')[0].setAttribute('href',original_url);
				$hn.end_progress(title);
			} });
	},
	
	show_progress : function(title){
		title.innerHTML = (title.innerHTML).replace(/<a title="Click to undead(.*)>\[undead\]<\/a>/,'<span style="color:#FF6600">[fetching...]</span>');
		title.innerHTML = (title.innerHTML).replace('[dead]','<span style="color:#FF6600">[fetching...]</span>');

	},
	
	end_progress : function(title){
		title.innerHTML = (title.innerHTML).replace('[fetching...]','[undead]');
	},
	
	normalize_color_dead_comments_color : function(){
		var all_spans = document.getElementsByTagName('span');
		for (var i = 0, k = all_spans.length; i < k; i++) {
			if (all_spans[i].getAttribute('class') == 'dead') {
				all_spans[i].setAttribute('style', 'color:#000000 !important;');
			}
		}
		var all_fonts = $xpath('//html//body//font');
		for (var i = 0, k = all_fonts.snapshotLength; i < k; i++) { 
			if (all_fonts.snapshotItem(i).getAttribute('color') && all_fonts.snapshotItem(i).getAttribute('color') != '#000000' && all_fonts.snapshotItem(i).getAttribute('color') != '#3c963c') {
				all_fonts.snapshotItem(i).setAttribute('style', 'color:#000000 !important;');
			}
		}	
	}
	
}

function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }

(function() {
	$hn.init();
})();