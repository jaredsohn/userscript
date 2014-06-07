// ==UserScript==
// @name           LDR Bookmark
// @namespace      http://profile.livedoor.com/ronekko/
// @description    Livedoor Readerに「ここまで読んだ」機能を付加する
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

// bookmarksのデータ形式 => {subscribe_id : {id:item.id, item:item.title, feed:feed.channel.title, link:item.link, icon:feed.channel.icon}, ...}
var bookmarks = eval("("+GM_getValue("ldrBookmark")+")") || {};
var ldrbmButton, ldrbmGoToButton;
var w = unsafeWindow;
var menuTimer;
const ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMA%2FwD%2FAP83WBt9AAAAGHRFWHRUaXRsZQBib29rbWFyazE2LTluaS5wbmeDBMwSAAAADHRFWHRTb2Z0d2FyZQBWaVisIm5tAAAAdElEQVR42uWQwQ2AMAwDXdSNMwAMkC7R8frmbx6IUpkG8cfKp1ZcnwJeckdrcAcHuauzIFYpyQxmKCXdrjT0EneQILVBAYbMZFuRzFhr5wlApa7P%2BT2EgcyS3x5PceZXWpGi0%2BXgoACwG78GpqtvSC%2F6ZeAAmwaoDAoNGTEAAAAASUVORK5CYII%3D';


// 初期化処理
w.register_hook('AFTER_CONFIGLOAD', function(){
	var ldrbmButtonProperty = {
		id      : "ldrbm_button",
		icon    : ICON,
		innerHTML : '<span id="ldrbm_info"></span>',
	};
	ldrbmButton = w.create_button(ldrbmButtonProperty);
	w.$("control_buttons_ul").appendChild(ldrbmButton);
	
	GM_addStyle('#ldrbm_button{ font-weight:bold; text-align:right;}');
	GM_addStyle('.ldrbm_hilight{ background:#DDFFDD none repeat scroll 0 0;}');
	GM_addStyle('.ldrbm_bookmark_active{background:#E8E8E8 none repeat scroll 0 0; border-color:#808080 #FFFFFF #FFFFFF #808080; border-style:solid; border-width:1px}');
	
	if(length(bookmarks)){
		ldrbmButton.style.width = '29px';
		ldrbmButton.firstChild.innerHTML = length(bookmarks) + '';
	}
	
	addControlMethods();
	addMenuIconEvents();
	
	// bookmarkメニュー用テンプレートの定義
	var textarea = document.createElement('textarea');
	textarea.id = "bookmark_item";
	textarea.className = "template";
	textarea.innerHTML = '<span class=\'button flat_menu\' style="border-top: solid 1px #A0A0A0; background-image:url(\'http://ic.edge.jp/url/[[link]]\');background-repeat:no-repeat;background-position:2px 3px;" onmouseout=\'Control.ldrbmOnunhover(this)\' onmouseover=\'Control.ldrbmOnhover(this)\' onmouseup=\'Control.ldrbmOpenBookmark("[[ subscribe_id ]]");\' >[[ title ]]</span>';
	document.body.appendChild(textarea);
	
	// しおり登録ボタンのテンプレート
	var inboxItems = document.getElementById("inbox_items");
	inboxItems.innerHTML = inboxItems.value.replace('<span id="clip_[[id]]"', '<span id="bookmark_[[id]]" style="display:block;width:18px;height:18px;margin-right:4px;float:left;" class=""><img onmousedown="Control.ldrbmAddBookmark([[id]], this)" src="'+ICON+'"></span>\n<span id="clip_[[id]]"');
	w.ItemFormatter.TMPL = w.Template.get("inbox_items");
});


function addControlMethods(){
w.Control.ldrbmClearBookmark = function(){
	
	if(w.confirm('本当に全消去していいですか？')){
		bookmarks = {};
		setTimeout(function(){
			GM_setValue("ldrBookmark", bookmarks.toSource());
		}, 0);
		ldrbmButton.firstChild.innerHTML = '0';
		turnMenuIconHilight(false);
		w.message('しおりを全消去しました');
	}
}


w.Control.ldrbmOnunhover = function(target){
	target.style.backgroundColor = '#FFFFFF';
}


w.Control.ldrbmOnhover = function(target){
	target.style.backgroundColor = '#B6BDD2';
	if(w.State.ldrbmMenuTimer){
		clearTimeout(w.State.ldrbmMenuTimer);
	}
}


w.Control.ldrbmOpenBookmark = function (sid){
	var unit = 50;
	var start = 0
	var end = unit;
	var limit = 500;
	var pageSize = 10;
	var limitSize;
	var index = -1;
	var param = {
		subscribe_id : sid,
		offset: start,
		limit : end,
		ApiKey : w.LDR_getApiKey()
	};
	
	// TODO: 現在既に表示済みのアイテムの中にターゲットがあればそのままジャンプする
	setTimeout(function f(){
		w.message(start + '-' + (end-1) + '番目を検索中');
		GM_xmlhttpRequest({
			method : "POST",
			url : "http://reader.livedoor.com/api/all",
			data : w.Object.toQuery(param),
			headers : { "Content-Type" : "application/x-www-form-urlencoded" },
			onload : function(res){
				var feed = JSON.parse(res.responseText);
				var items = feed.items;
				for(var i=0, l=items.length; i<l; i++){
					if(bookmarks[sid].id == items[i].id){
						index = start + i;
						break;
					}
				}
				if(index < 0){
					start = end;
					end += unit;
					if(l < unit || end > limit){
						w.message('最新' + limit + '件中にしおりを発見できませんでした。<br>'
								+ 'より古い記事を手作業で探してみてください。');
						return;
					}
					param.offset = start;
					setTimeout(f, 0);
				}
				else{
					if(w.Config.reverse_mode){
						if(index < pageSize){
							start =  0;
							limitSize = index + 1; 
						}else{
							start = index - pageSize + 1;
							limitSize = pageSize;
						}
					}else{
						start = index;
						limitSize = pageSize;
					}
					
					w.State.viewrange.start = start;
					w.State.viewrange.end = start + limitSize;
					param = {
						subscribe_id : sid,
						offset: start,
						limit : limitSize,
						ApiKey : w.LDR_getApiKey()
					};
					
					GM_xmlhttpRequest({
						method : "POST",
						url : "http://reader.livedoor.com/api/all",
						data : w.Object.toQuery(param),
						headers : { "Content-Type" : "application/x-www-form-urlencoded" },
						onload : function(res){
							var feed = JSON.parse(res.responseText);
							var indexOfTopItem = w.Config.reverse_mode ? limitSize-1 : 0;
							// 正しく取得できた場合
							if(feed.items[indexOfTopItem].id == bookmarks[sid].id){
								if(!w.subs_item(sid)){
									w.subs_item(sid, {icon : bookmarks[sid].icon});
								}
								w.print_feed(feed);
								// リクエストよりも件数が少ない場合
								if(feed.items.length < pageSize && w.State.viewrange.start != 0){
									w.State.has_next = false;
								} else {
									w.State.has_next = true;
								}
								w.update("feed_next","feed_prev");
								w.message('しおりにジャンプしました');
							}
							//TODO 正しく取得で着なかった場合
							else{
								w.message('しおりを発見しましたが、ジャンプできませんでした。<br>'
								 + bookmarks[sid].feed + ' の' + index + '番目あたりにあります。');
							}
						}
					});

				}
			}
		});
	}, 0);
}


w.Control.ldrbmAddBookmark = function(id, button){
	var feed = w.get_active_feed();
	var items = feed.items;
	var item;
	
	for(var i=0, len=items.length; i<len; i++){
		if(items[i].id == id){
			item = items[i];
			item.offset = w.Config.reverse_mode ? len - i : i + 1;
			break;
		}
	}
	if(!item){ return ;};
	
	var target = w.$("item_count_" + item.offset);
	if(!target){ return ;}
	
	// 削除
	if(bookmarks[feed.subscribe_id] && bookmarks[feed.subscribe_id].id == item.id){
		w.removeClass(target, "ldrbm_hilight");
		w.removeClass(button, 'ldrbm_bookmark_active');
		delete bookmarks[feed.subscribe_id];
		w.message('しおりを消去しました');
		turnMenuIconHilight(false);
	}
	else{
		// 更新
		if(bookmarks[feed.subscribe_id]){
			// 以前にしおりされていた記事があればそのCSSを普通に戻す
			var items = feed.items;
			for(var i=0, l=items.length; i<l; i++){
				if(bookmarks[feed.subscribe_id].id == items[i].id){
					var old = getElementByItemId(bookmarks[feed.subscribe_id].id);
					w.removeClass(old, "ldrbm_hilight");
					var oldButton = document.getElementById('bookmark_' + bookmarks[feed.subscribe_id].id).firstChild;
					w.removeClass(oldButton, 'ldrbm_bookmark_active');
					break;
				}
			}
		}
		// 追加
		w.message('しおりを登録しました');
		bookmarks[feed.subscribe_id] = {'id':item.id, 'item':item.title, 'feed':feed.channel.title, 'link':item.link, 'icon':feed.channel.icon};
		w.addClass(target, "ldrbm_hilight");
		w.addClass(button, 'ldrbm_bookmark_active');
		turnMenuIconHilight(true);
	}
	setTimeout(function(){
		GM_setValue("ldrBookmark", bookmarks.toSource());
	}, 0);
	
	ldrbmButton.style.width = '29px';
	ldrbmButton.firstChild.innerHTML = length(bookmarks) + '';
}
}

function addMenuIconEvents(){
	// メニューボタンにマウスが乗ったときメニューを表示する
	ldrbmButton.addEventListener('mouseover', function(){
		if(w.State.ldrbmMenuTimer){
			clearTimeout(w.State.ldrbmMenuTimer);
		}
		function stophide(){
			if(w.State.pin_timer){ w.State.pin_timer.cancel() }
		}
		stophide();
		if(!length(bookmarks)){
			return;
		}
		var menu = w.FlatMenu.create_on(this); // TODO: このthisはui:126でFlatMenu.parentに代入されてる。適切に設定すること
		
		menu.setEvent({
			mouseover: stophide,
			mouseout : w.Control.pin_mouseout // TODO: bookmark_mouseoutに変更すること
		});
		menu.show();
		var tmpl = w.Template.get("bookmark_item").compile();
		var write_menu = function(){
			menu.clear();
			// containerの高さにあわせて調整
			var menuHeight = w.$("right_container").offsetHeight - 60;
			var i;
			for(i in bookmarks){
				var item = tmpl({
					subscribe_id : i,
					title : bookmarks[i].feed + ': ' + bookmarks[i].item,
					link  : bookmarks[i].link,
					icon  : bookmarks[i].icon || 'http://image.reader.livedoor.com/img/icon/default.gif'
				});
				menu.add(item);
			}
			
			menu.add([
				'<span class="button flat_menu dust_box"',
				' rel="Control:ldrbmClearBookmark();FlatMenu.hide()">',
				'全消去</span>'
			].join(""));
			
			menu.setStyle({
				width : "420px",
				overflow : "auto",
				border : "solid",
				borderWidth : "1px",
				borderColor : "#A0A0A0"
			});
			menu.update();
			if(menu.element.offsetHeight > menuHeight){
				menu.setStyle({ height : menuHeight + 'px'});
			}
		}
		write_menu();
	}, true);


	// メニューを非表示にするイベント
	ldrbmButton.addEventListener('mouseout', function(){
		w.State.ldrbmMenuTimer = setTimeout(function(){
			w.FlatMenu.hide();
		}, 100);
	}, true);
}


// フィードを開いたとき
w.register_hook('AFTER_PRINTFEED', function(feed) {
	// フィードにしおりがなければなにもしない
	if(!bookmarks[feed.subscribe_id]){
	turnMenuIconHilight(false);
		return;
	}
	
	var items = feed.items;
	var target;
	var button;
	var found = false;
	
	turnMenuIconHilight(true);
	for (var i=0, l=items.length; i<l; i++) {
		if(items[i].id == bookmarks[feed.subscribe_id].id){
			(function(item){
				setTimeout(function f(){
					if((target = getElementByItemId(item.id))){
						w.addClass(target, "ldrbm_hilight");
						button = document.getElementById('bookmark_' + item.id).firstChild;
						w.addClass(button, 'ldrbm_bookmark_active');
					}else{
						setTimeout(f, 500);
					}
				}, 0);
			})(items[i]);
			break;
		}
	}
});


var turnMenuIconHilight = function(on){
	document.getElementById('ldrbm_button').style.backgroundColor = on ? '#DDFFDD' : '';
}


// オブジェクトの要素数
function length(obj){
	var n = 0;
	for(var i in obj){ n++; }
	return n;
}


// 引数: item.id, 戻値: 該当する記事の、id='item_count_N' (Nは整数)であるdiv要素
function getElementByItemId(itemid){
	var target = w.$("item_" + itemid);
	if(target && target.childNodes){
		for(var i=0, nodes=target.childNodes; i<nodes.length; i++){
			if(nodes[i].nodeType == 1) { target = nodes[i]; }
		}
		return target
	}
	return null;
}