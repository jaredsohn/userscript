// ==UserScript==
// @name           	HackerNews Drop Down Menu Pages
// @namespace           http://userscripts.org/scripts/show/58915
// @version		0.1.3
// @description    	A drop down menu on HackerNews for some of the not-so-familiar pages
// @include        	http://news.ycombinator.com/*
// @include        	https://news.ycombinator.com/*
// ==/UserScript==

////////////////////////////////
// Change the following variables for different colors: 
// default colors:
// $hn_dd_background_color = 'FF6600';
// $hn_dd_hover_color = 'FD934A';

var $hn_dd_background_color = 'FF6600';
var $hn_dd_hover_color = 'FD934A';

///////////////////////////////

var $hn_dd = {
	
	_menu_items : [
		['/classic','Classic','classic'],
		['/best','Highest voted recent links','best'],
		['/active','Most active current discussions','active'],
		['/bestcomments','Highest voted recent comments','best comments'],
		['/ask','Questions, polls, and self posts','ask HN'],
		['/offers','HN members offering their help and services','offers'],
		['/noobstories','Submissions from new accounts','noob stories'],
		['/noobcomments','Comments from new accounts','noob comments']
	],
	
	_draw_css : function(){
		var css = '#hn_dd_menu{position:absolute;display:inline;}'+
			'#hn_dd_menu ul .item{display:none;}'+
			'#hn_dd_menu ul .top{margin-bottom:4px;}'+
			'#hn_dd_menu ul:hover .item{display:block;background-color:#'+$hn_dd_background_color+';}'+
			'#hn_dd_menu ul:hover .item a{padding:5px 10px;display:block;}'+
			'#hn_dd_menu ul:hover .item a:hover{background-color:#'+$hn_dd_hover_color+'}'+
			'#hn_dd_menu ul{width:100%;float:left;margin:0;padding:0 2px 2px 2px;list-style:none;}';
		return css ;	
	},
		
	init : function(){
		var menu_links = $xpath('/html/body/center/table/tbody/tr/td/table/tbody/tr/td[2]/span[@class="pagetop"]/a[@href="submit"]');
		var submit_link_parent = menu_links.snapshotItem(0).parentNode;
		var dd_link = '<style>'+this._draw_css()+'</style>'+ 
			' | <div id="hn_dd_menu"><ul>'+
			'<li class="top"><a href="/lists">other pages</a></li>'; 
			for (var i=0, k=this._menu_items.length; i<k; i++){
				dd_link += '<li class="item"><a href="'+this._menu_items[i][0]+'" title="'+this._menu_items[i][1]+'">'+this._menu_items[i][2]+'</a></li>';
			}
			dd_link +='</ul></div>';
			submit_link_parent.innerHTML += dd_link;
	}
}

function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }

(function() {
	try {
		$hn_dd.init() ;
	}
	catch(e){ /* console.log(e) */ }
})();