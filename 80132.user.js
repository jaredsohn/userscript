// ==UserScript==
// @name           LDR - More about Recently Added Feeds
// @namespace      http://profile.livedoor.com/ronekko/
// @description    Livedoor Readerで「○○の新着フィード」のフィードにより詳しい情報を追加する
// @include        http://reader.livedoor.com/reader/
// @include        http://reader.livedoor.com/subscribe/*
// @version        20120512
// ==/UserScript==
//20120512: Greasemonkey 0.9.19におけるwindow.setTimeoutの仕様変更に対処

var w = unsafeWindow;
var init = true;
var cache;
var feedList;
var userName
var flag;
var now;
var timer1, timer2;
var contents;
var dict;
var insertContents;
var observeSubsList;
var mySubs;
var checkFlag;


if(location.href.indexOf('http://reader.livedoor.com/subscribe/') === 0){
	// 次回LDR起動時に/api/lite_subsを呼ぶためのフラグを立てる
	GM_setValue("lastUpdateDate", 0);
	return;
}

w.register_hook('AFTER_CONFIGLOAD', function(){
	GM_addStyle('.ldrmaraf { border:solid; border-width:thin; border-color:#888888; padding-left:5px; padding-right:5px; margin-top:5px; margin-bottom:5px;}');
	GM_addStyle('h3.item_title a{ color:#000000; text-decoration:none;}');
	GM_addStyle('.ldrmaraf_subscribed { padding-left:10px; color:#E00000; font-size:15px; font-weight:bold; font-family:sans-serif;}');
	GM_addStyle('.ldrmaraf_p2f { padding-left:10px; color:#008000; font-size:15px; font-weight:bold; font-family:sans-serif;}');
	GM_addStyle('.ldrmaraf_loading { background-color:#DDFFDD; background-image:url("/img/icon/sneak.gif") !important;}');
	GM_addStyle('.ldrmaraf_notshared { background-color:#FFDDDD;}');
});


w.register_hook('BEFORE_SUBS_LOAD', function(){
	var timerA, timerB;
	checkFlag = {};
	
	observeSubsList = function(e){
		if(e.target.nodeName.toLowerCase() != 'div'){ return ;}
		
		timerB && clearTimeout(timerB);
		timerB = setTimeout(function(target){
			var re = new RegExp(/^http:\/\/reader\.livedoor\.com\/user\/(\w+)\/rss$/);
			
			var feeds = w.subs.model.get_list();
			feeds.forEach(function(feed){
				var userName;
				var icon;
				var feedlink = feed.feedlink.match(re);
				if(!feedlink){ return; }
				
				userName = feedlink[1];
				
				if(checkFlag[feedlink]){ return; }
				
				checkFlag[feedlink] = true;
				if(cache[userName] && cache[userName].modified_on === feed.modified_on){
					return;
				}
				
				var feedElem = document.getElementById('subs_item_' + feed.subscribe_id);
				w.addClass(feedElem, 'ldrmaraf_loading');
				
				delete cache[userName];
				
				setTimeout(function(){
					var param = {
						ApiKey : w.LDR_getApiKey(),
						users: userName
					};
					GM_xmlhttpRequest({
						method : "POST",
						url : 'http://reader.livedoor.com/share_api/subs?unread=0&from_id=0&limit=100',
						data : w.Object.toQuery(param),
						headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
						onload :  function(res){
							w.removeClass(document.getElementById(feedElem.id), 'ldrmaraf_loading');
							checkFlag[feedlink] = true;
							var json = JSON.parse(res.responseText);
							if(json.ErrorCode == undefined){ // エラーでない場合
								timerA && clearTimeout(timerA);
								var _feedInfo = json.map(function(item){
									return [item.feedlink, item.subscribe_id.replace(/^\w+:/, '')];
								}).reverse();
								cache[userName] = {modified_on: feed.modified_on, feedInfo: _feedInfo};
							}
							else{ //エラーの場合(退会・非公開にした場合)
								w.removeClass(document.getElementById(feedElem.id), 'ldrmaraf_loading');
								w.addClass(document.getElementById(feedElem.id), 'ldrmaraf_notshared');
								cache[userName] = {modified_on: feed.modified_on, feedInfo: []};
							}
							timerA = setTimeout(function(){
								GM_setValue("cache", cache.toSource());
								timerA = null;
							}, 5000);
						}
					});
				}, 0);
			
			});
		}, 100, e.target);
	};
	
	var loadCache = function(){
		cache = eval("("+GM_getValue("cache")+")") || {};
	}
	
	var loadMySubs = function(){
		const updateInterval = 6 * 3600; // 更新間隔[秒]
		var lastUpdateDate = GM_getValue("lastUpdateDate") || 0;
		var currentDate = (new Date()/1000)|0;
		var timeDiff = currentDate - lastUpdateDate;
		var update = timeDiff > updateInterval || !lastUpdateDate || timeDiff < 0;
		
		if(update){
			var param = {
				ApiKey : w.LDR_getApiKey(),
			};
			setTimeout(function(){
				GM_xmlhttpRequest({
					method : "POST",
					url : 'http://reader.livedoor.com/api/lite_subs',
					data : w.Object.toQuery(param),
					headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
					onload :  function(res){
						mySubs = {};
						var feeds = JSON.parse(res.responseText);
						feeds.forEach(function(feed){
							mySubs[feed.feedlink] = 1;
						});
						GM_setValue("mySubs", mySubs.toSource());
						GM_setValue("lastUpdateDate", currentDate);
					}
				});
			}, 0);
		}
		else if(!mySubs){
			setTimeout(function(){
				mySubs = eval("("+GM_getValue("mySubs")+")");
				var count = 0;
				for(var k in mySubs){
					count++;
				}
			}, 0);
		}
	}
	
	window.setTimeout(function(){
		if(init){
			loadCache();
			init = false;
		}
		loadMySubs();
	}, 10);
	document.getElementById('subs_body').addEventListener('DOMNodeInserted', observeSubsList, true);
});


w.register_hook('AFTER_SUBS_LOAD', function(){
	document.getElementById('subs_body').removeEventListener('DOMNodeInserted', observeSubsList, true);
});


w.register_hook('BEFORE_PRINTFEED', function(feed) {
	flag = false;
	now = new Date();
	timer1 && clearTimeout(timer1);
	timer2 && clearTimeout(timer2);
	contents = {};
	dict = {};
	var rb = document.getElementById('right_body');
	rb.removeEventListener('DOMNodeInserted', insertContents, true);
	var feedUrl = feed.channel.link.match(/^http:\/\/reader\.livedoor\.com\/user\/(\w+)/);
	if(!feedUrl){
		delete insertContents;
		return;
	}
	
	const re = new RegExp(/(\n<a[^>]*><img [^>]+><\/img><\/a><br \/>\n<a [^>]+>livedoor Readerに登録<\/a>\n$)/);
	const reFeedlink = new RegExp(/<a href="http:\/\/reader\.livedoor\.com\/subscribe\/(.*)">livedoor Readerに登録<\/a>/);
	
	flag = true;
	feedList = null;
	userName = feedUrl[1];
	
	var items = feed.items;
	var feedlinks;
	var makeFeedList = function(feedInfo){
		var len = feedInfo.length;
		feedList = feedlinks.map(function(link){
			for(var i=0; i<len; ++i){
				if(link === feedInfo[i][0]){
					return {feedlink : link, sid : userName + ':' + feedInfo[i][1]};
				}
			}
			return {feedlink : link, sid : null};
		});
		
		if(w.Config.reverse_mode){
			feedList.reverse();
		}
	}
	
	feedlinks = items.map(function(item){
		if(!item.body.match('ldrmaraf')){
			item.body = item.body.replace(re, '<div id="ldrmaraf_' + item.id + '" class="ldrmaraf">Loading...</div>' + '$1');
		}
		var feedlink = item.body.match(reFeedlink)[1];
		dict['ldrmaraf_' + item.id] = feedlink;
		return feedlink;
	});
	
	insertContents = function (e){
		var target = e.target;
		if(target.tagName.toLowerCase() != 'div') return;
		if(target.className.match(/(channel(_toolbar)?)|(footer)|(more)/)) return;
		
		var nodes = target.getElementsByClassName('ldrmaraf');
		Array.forEach(nodes, function(elem){
			if(contents[dict[elem.id]]){
				elem.innerHTML = contents[dict[elem.id]];
				w.addClass(elem, 'complete');
				delete dict[elem.id];
			}else if(dict[elem.id]){
				unsafeWindow.setTimeout(arguments.callee, 100, elem);
			}
		});
	};
	rb.addEventListener('DOMNodeInserted', insertContents, true);
	
	(function(){
		if(cache && cache[userName]){
			makeFeedList(cache[userName].feedInfo);
		}else{
			setTimeout(arguments.callee, 500);
		}
	})();
});


w.register_hook('AFTER_PRINTFEED', function(feed) {
	if(!flag){ return; }
	
	var items = feed.items;
	
	(function(time){
		if(feedList && mySubs){
			w.message('フィード情報のダウンロード中...');
			var start=0;
			var end;
			var N=20; // 一度にﾘｸｴｽﾄする件数
			var delay=2000; // ﾘｸｴｽﾄ間隔
			var completion = false;
			(function(){
				end = Math.min(start + N, feedList.length);
				for(var i=start; i<end; ++i){
					(function(feedInfo){
						if(feedInfo.sid){
							var param = {
								ApiKey : w.LDR_getApiKey(),
								subscribe_id : feedInfo.sid,
								users: userName,
							};
							setTimeout(function(){
							GM_xmlhttpRequest({
								method : "POST",
								url : 'http://reader.livedoor.com/share_api/all',
								data : w.Object.toQuery(param),
								headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
								onload : function(res){
									if(now != time){ return; }
									
									var json = res.responseText ? JSON.parse(res.responseText) : null;
									if(json && (json.ErrorCode == undefined)){ // エラーでない場合
										var item = json.items[0];
										var link = item && item.link;
										var title = item && item.title;
										var body = item && item.body;
										var subscribers_count = json.channel.subscribers_count;
										var content = [];
										content.push(['<div><span style="background: ',
														'url(&quot;/img/icon/subscriber.gif&quot;) ',
														'no-repeat scroll 0pt 0pt transparent; ',
														'padding-left: 22px;" class="subscriber">',
														'<span class="num">', subscribers_count,
														'</span> users</span>'].join(''));
										if(feedInfo.feedlink in mySubs){
											content.push('<span class="ldrmaraf_subscribed">[登録済み]</span>');
										}
										if(feedInfo.feedlink.indexOf('http://ic.edge.jp/page2feed/') === 0){
											content.push('<span class="ldrmaraf_p2f">[via Page2Feed API]</span>');
										}
										content.push(['</div><h3 class="item_title">',
														'<a href=', link, ' target="_blank">',
														title, '</a></h3>', body].join(''));
										contents[feedInfo.feedlink] = content.join('');
									}
									else{
										contents[feedInfo.feedlink] = '<h3 class="item_title">Not Found</h3>';
									}
								}
							});
							}, 0);
						}
						else{
							contents[feedInfo.feedlink] = '<h3 class="item_title">Not Found</h3>';
						}
					})(feedList[i]);
				}
				
				start = i;
				if((end < feedList.length) && (now == time)){
					setTimeout(arguments.callee, delay);
				}else{
					completion = true;
				}
			})();
			
			timer2 = setInterval(function(){
				if(isEmpty(dict) && completion){
					w.message('フィード情報のロード完了');
					clearInterval(timer2);
				}else{
					w.message('フィード情報のロード中 ' + ((100 * end / feedList.length)|0) + '%');
				}
			}, delay);
		}
		else if(now == time){
			w.message('ユーザ情報のダウンロード中...');
			timer1 = setTimeout(arguments.callee, 500, time);
		}
	})(now);
	
	function isEmpty(obj){
		for(var k in obj) return false;
		return true;
	}
});