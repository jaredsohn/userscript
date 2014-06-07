// ==UserScript==
// @name           Google Videos for Engadget
// @namespace      http://userscripts.org/users/74146
// @description    Add related videos to Engadget posts (post page only).
// @include        http://*.engadget.com/*
// @author         Yale Huang
// @version        0.1
// ==/UserScript==

(function(){

var GlobalStyle = new(function() {
	this.add = function (css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	};
})();

GlobalStyle.add(' \
.bar { 	color:gray; 	margin:0 4px }  .grid-res .dash,#tv-player .dash,#tv-player .br,.list-res .br,.tv-res .br { 	display:none }  table.gooooogle span.currentpage { 	color:#c00; 	font-weight:bold }  .grid-res .rl-item-rollover .favicon { 	top:102px }  .grid-res .rl-item-rollover-youtube .favicon { 	top: 46px }  .grid-res .rl-item-rollover .favicon { 	top:103px; 	left:4px } .grid-res .rl-item-rollover-youtube .favicon { 	top:47px }  .favicon { 	z-index:1; 	width:16px; 	height:16px; 	position:absolute; 	border:0 } .list-res .favicon { 	top:89px; 	left:11px } .grid-res .favicon { 	top:114px; 	left:5px } .tv-res .favicon { 	top:57px; 	left:1px } .related .favicon { 	top:46px; 	left:55px;}  .goog-zippy-collapsed,.goog-zippy-expanded { 	cursor:pointer; 	color:#00f; 	margin:2px 4px 0 0; 	float:left; 	overflow:hidden } .goog-zippy-collapsed { 	background:no-repeat url(http://video.google.com/img/video_search.png) -150px -22px; 	width:12px; 	height:12px } .goog-zippy-expanded { 	background:no-repeat url(http://video.google.com/img/video_search.png) -16px -26px; 	width:12px; 	height:12px }  table.gooooogle { 	margin-top:2.5em; 	margin-bottom:1.5em } table.gooooogle td { 	font-size:10pt } table.gooooogle a { 	color:#000 } table.gooooogle a.imglink { 	text-decoration:none; 	border:none } table.gooooogle td.next a { 	text-align:left; 	font-size:12pt; 	color:#00c; 	font-weight:bold } table.gooooogle td.prev a { 	text-align:right; 	font-size:12pt; 	color:#00c; 	font-weight:bold; 	width:68px; 	white-space:nowrap }  .tv-body .mail-pagi-long { 	display:none }  .message { 	clear:both; 	padding:1em 0 1em }  .nav_current { 	background:no-repeat url(http://video.google.com/img/video_search.png) 0 0; 	width:16px; 	height:26px } .nav_first { 	background:no-repeat url(http://video.google.com/img/video_search.png) -126px 0; 	width:18px; 	height:26px } .nav_last { 	background:no-repeat url(http://video.google.com/img/video_search.png) -16px 0; 	width:42px; 	height:26px } .nav_next { 	background:no-repeat url(/img/video_search.png) -28px -26px; 	width:100px; 	height:26px; 	cursor:pointer } .nav_page { 	background:no-repeat url(http://video.google.com/img/video_search.png) 0 -26px; 	width:16px; 	height:26px; 	cursor:pointer } .nav_previous { 	background:no-repeat url(http://video.google.com/img/video_search.png) -58px 0; 	width:68px; 	height:26px; 	cursor:pointer }  .grid-res .rl-thumbnail-rollover { 	padding:3px 0 0 2px; 	height:112px } .grid-res .rl-thumbnail-rollover .thumbs div { 	margin:-1px 1px 0 }  .grid-res .rl-item-rollover-youtube .rl-thumbnail-rollover { 	height:56px }  .rl-item { 	clear:both; 	font-size:10pt; 	width:100% }  .rl-res { 	overflow:hidden; 	padding-left:5px } .tv-res .rl-res { 	float:none; 	overflow:hidden; 	cursor:pointer; 	border:1px solid #fff; 	margin:1px 5px; 	height:85px } .tv-res .rl-thumbnail,.tv-res .rl-metadata { 	margin-top:5px } .tv-res .rl-metadata { 	//float:left; 	//position:relative; 	//margin-left:3px } .tv-res .rl-title,.tv-res .rl-details { 	//width:100%; 	//overflow:hidden }  .rl-item .rl-special a:link { 	color:#77c; 	float:left } .rl-item .rl-special a:visited { 	color:#551a8b; 	float:left } .rl-item .bar { 	color:gray; 	margin:0 4px; 	float:left } #current-meta .rl-ratings { 	//margin-right:-8px } .rl-stars { 	position:relative; 	top:-1px; 	//top:1px } .rl-rating-editor { 	display:none; 	//margin-left:3px }  .rl-item table { 	border-collapse:collapse; 	font-size:small; 	//font-size:x-small } .rl-title { 	font-size:115% } .rl-filetype { 	font-size:x-small; 	//font-size:xx-small; 	color:#00c } .rl-thumbnail { 	float:left; 	position:relative }  .list-res .rl-metadata { 	float:left; 	margin-left:10px; 	width:600px; 	margin-top:12px; 	clear:right } .list-res .rl-thumbnail-inner img { 	border:1px solid gray; 	height:90px; 	width:120px; 	margin:3px; 	display:block } .grid-res .rl-thumbnail-inner img { 	border:1px solid gray; 	height:120px; 	width:160px; 	margin:3px } .list-res .rl-thumbnail-inner { 	border:1px solid gray; 	height:98px; 	width:128px; 	margin-top:10px; 	margin-bottom:10px; 	margin-left:6px } .grid-res .rl-thumbnail-inner { 	border:1px solid gray; 	height:128px; 	width:168px; 	margin-bottom:10px; 	position:relative } .tv-res .rl-thumbnail-inner img { 	border:1px solid gray; 	height:72px; 	width:96px } .tv-res .rl-thumbnail-inner { 	margin-right:5px } .rl-thumbnail-rollover { 	display:none } .grid-res .rl-thumbnail-rollover { 	border:1px solid gray; 	height:114px; 	width:224px; 	margin-bottom:10px; 	padding:1px; 	//padding-bottom:0 } .grid-res .rl-thumbnail-rollover .thumbs { 	width:224px; 	overflow:hidden; 	display:block; 	//padding-top:3px } .grid-res .rl-thumbnail-rollover .thumbs div { 	border:none; 	margin:2px 0 0 2px; 	//margin-top:-1px; 	padding:0; 	float:left; 	display:inline } .grid-res .rl-thumbnail-rollover .thumbs div img { 	border:none; 	height:54px; 	width:72px } .grid-res .rl-thumbnail-rollover #thumbs_container .play_button_container { 	display:none } .grid-res .rl-item-rollover .rl-thumbnail-rollover { 	display:block } .grid-res .rl-item-rollover-youtube .rl-thumbnail-rollover { 	height:58px } .grid-res .rl-item-rollover .rl-thumbnail-inner { 	display:none } .grid-res .rl-thumbnail-mouse-watcher { 	background:url(http://video.google.com/img/transparent.gif); 	cursor:pointer; 	z-index:2; 	position:absolute; 	width:168px; 	height:128px } .grid-res .rl-item-rollover .rl-thumbnail-mouse-watcher { 	width:226px }  .rl-snippet-grid-view { 	display:none; 	overflow:hidden; 	padding-right:4px; 	width:224px; 	//width:226px } .grid-res .rl-item-rollover .rl-snippet-grid-view,.grid-res .rl-item-rollover-no-grid .rl-snippet-grid-view { 	display:block; 	overflow:hidden } .grid-res .rl-item-rollover .br,.grid-res .rl-item-rollover .rl-domain,.grid-res .rl-item-rollover-no-grid .br,.grid-res .rl-item-rollover-no-grid .rl-domain { 	display:none }  .grid-res .rl-item { 	clear:none; 	float:left; 	width:240px; 	height:260px; 	margin-top:5px } .rl-item-spacer { 	display:none } .grid-res .rl-item-spacer { 	display:inline; 	clear:none; 	float:left; 	height:260px } .grid-res .rl-item-rollover,.grid-res .rl-item-rollover-no-grid { 	border:1px solid #d6e4ff; 	background:#eff3f9; 	overflow:hidden; 	width:238px; 	height:258px; 	//width:240px; 	//height:260px } .grid-res .rl-thumbnail { 	position:relative; 	padding-top:5px; 	padding-left:0 } .grid-res .rl-metadata { 	clear:both; 	padding-left:0; 	margin-left:1px } .grid-res .rl-title { 	width:220px; 	overflow:hidden } .grid-res .rl-snippet,.grid-res .rl-special,.grid-res .rl-votes { 	display:none }  .tv-res .rl-title { 	font-size:small; 	//font-size:x-small; 	overflow:hidden; 	padding-right:5px } .grid-res .rl-date,.list-res .rl-date,.tv-res .rl-snippet,.tv-res .rl-special,.tv-res .rl-date,.tv-res .rl-votes { 	display:none } .rl-short-snippet { 	display:none } .tv-body .res-wide .rl-short-snippet { 	display:table; 	//display:inline }  .rl-domain { 	display:none } .grid-res .rl-domain,.list-res .rl-domain,.tv-res .rl-domain { 	display:inline; 	color:green }  player .rl-special { 	display:none }  .suggestion-title { 	font-size:small; 	//font-size:x-small; 	color:gray; 	padding-left:5px } .suggestion,.suggestion-bottom { 	height:1.2em; 	font-size:small; 	//font-size:x-small; 	margin-bottom:1px; 	margin-top:2px; 	overflow:hidden } .suggestion-bottom { 	height:9em } .suggestion a,.suggestion-bottom a { 	white-space:nowrap }  .video-from-domain { 	color:green } \
');

var getTags = function(item, xpath) {
	var TagLinks = document.evaluate(
	    xpath,
	    item,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);

	GM_log(item.innerHTML);
	GM_log(xpath);
	GM_log(TagLinks.snapshotLength);

	var tags = new Array();
	for (var n=0; n<TagLinks.snapshotLength; n++) {
		tags.push(TagLinks.snapshotItem(n).text);
	}
	return tags;
};

var updatePostbody = function(item, replace_array, tags) {
// http://video.google.com/videosearch?q=Dell%20Mini%2012&emb=0&so=0&output=results
	var url = 'http://video.google.com/videosearch?emb=0&so=0&output=results&q=' + tags;
	GM_log(url);
	GM_xmlhttpRequest({
    		method: 'GET',
    		url: url,
    		onload: function(res) {
			GM_log(res.responseText);
			var postbodies = document.evaluate(
			    replace_array[0],
			    item,
			    null,
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			    null);

			var text = res.responseText.split('<div style="clear:both;"></div>')[0];
			GM_log(item.innerHTML);
			GM_log(replace_array[0]);
			GM_log(postbodies.snapshotLength);
			GM_log(text);

			if(postbodies.snapshotLength < 1)
				return;
			var p=postbodies.snapshotItem(0);

			var new_div = document.createElement("div");
			// new_div.setAttribute("class", "google_video");
			new_div.setAttribute("style", "height:407px; overflow-y:scroll;");
			new_div.innerHTML = text;

			replace_array[1](new_div,p);
		},
		onerror: function() {
			GM_log("Failed to get " + url);
		}
	});
};

var getTags;
var xpaths = [ ["//div[@class='post']",
		"div[@class='postmeta']/p[@class='posttags']/a",
		['//div[@id="subcontent"]/div',
			function(newItem, item){
				item.parentNode.insertBefore(newItem,item);	
			}
		]
	       ]
	     ];

for (var i=0; i<xpaths.length; i++) {
	var posts = document.evaluate(
	    xpaths[i][0],
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);

	if (posts.snapshotLength>0) {
		post = posts.snapshotItem(0);
		tags_line = "+" + getTags(post, xpaths[i][1]).join("%2C+OR+");
		GM_log(tags_line);
		if(tags_line != "+"){
			updatePostbody(post, xpaths[i][2], tags_line);
		}
	}
}

})();
