// ==UserScript==
// @name           nico_mylist_search
// @namespace      http://twitter.com/foldrr
// @description    マイリストページにマイリスト検索機能を追加します。
// @include        http://www.nicovideo.jp/my/mylist*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://jquery-xml2json-plugin.googlecode.com/svn/trunk/jquery.xml2json.js
// @require        https://raw.github.com/cho45/jsdeferred/master/jsdeferred.js
// @require        https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// ==/UserScript==
(function(){
	// Objectでループ処理をする。
	Object.defineProperty(Object.prototype, "each", {
		enumerable: false,
		get: function(){
			return function(callback){
				for(var k in this){
					if(this.hasOwnProperty(k)){
						callback(k, this[k]);
					}
				}
			}
		}
	});

	
	// Objectのキーを取得する。
	Object.defineProperty(Object.prototype, "keys", {
		enumerable: false,
		get: function(){
			var keys = [];
			this.each(function(k, v){
				keys.push(k);
			});
			return keys;
		}
	});


	// Objectの値を取得する。
	Object.defineProperty(Object.prototype, "values", {
		enumerable: false,
		get: function(){
			var values = [];
			this.each(function(k, v){
				values.push(v);
			});
			return values;
		}
	});


	// Objectの差分を取得する。
	Object.defineProperty(Object.prototype, "diff", {
		enumerable: false,
		get: function(){
			return function(rhs){
				var diff = {};
				this.each(function(k, v){
					if(! rhs[k]){
						diff[k] = v;
					}
				});
				return diff;
			}
		}
	});


	// Objectをマージする。
	Object.defineProperty(Object.prototype, "merge", {
		enumerable: false,
		get: function(){
			return function(rhs){
				var lhs = JSON.parse(JSON.stringify(this));

				var deleted = lhs.diff(rhs);
				var deletedKeys = deleted.keys;
				for(var i = 0, n = deletedKeys.length; i < n; i++){
					delete lhs[deletedKeys[i]];
				}

				var added = rhs.diff(lhs);
				var addedKeys = added.keys;
				for(var i = 0, n = addedKeys.length; i < n; i++){
					lhs[addedKeys[i]] = added[addedKeys[i]];
				}

				return lhs;
			}
		}
	});
	

	// Objectを配列に変換する。
	Object.defineProperty(Object.prototype, "toArray", {
		enumerable: false,
		get: function(){
			return function(){
				var results = [];
				this.each(function(k, v){
					results.push(v);
				});
				return results;
			}
		}
	});

	// JSDeferredを準備する。
	Deferred.define();

	
	// ニコニコ動画API。
	var api = unsafeWindow.NicoAPI;
	
	// ニコニコ動画APIのトークン。
	var token = unsafeWindow.NicoAPI.token;
	
	// ログインID
	var loginId = getLoginId();
	
	// 動画の辞書。
	var myItems = {};
	
	// マイリストの辞書。
	var myLists = {};
	
	
	// メイン処理。
	(function(){
        // 画面追加。
		addForm();
        
        // 前回取得データが存在する場合は検索可能にする。
		var json = getValue("myLists");
		json = !!json ? json : "{}";
		myLists = JSON.parse(json);
		if(0 < myLists.keys.length){
			$("#mylistSearchBody").slideDown();
		}
        
        // 前回取得から１時間以上経過していたらキャッシュ再読み込み。
        var lastUpdated = new Date(getValue("lastUpdated") || 0);
        console.debug("lastUpdated = " + lastUpdated);
        var now = new Date();
        var diff = now - lastUpdated;
        console.debug(diff)
        if((3600 * 1000) < diff){
            next(function(){
                console.debug("reload");
                return reload();
            }).
            next(function(){
                $("#mylistSearchBody").slideDown();
            });
        }
        
        $('#mylistSearchKeyword').focus();
	})();
	
	
	// マイリスト検索フォームを追加する。
	function addForm(){
		// メインフォーム。
		var html = 
			<div id="mylistSearch" style="margin-bottom:10px; border:3px solid #95B9DE; background-color:#FFFFFF">
				<div id="mylistSearchHeader" style="color:#666; background-color:#D8E5F3; margin:0px; padding:5px 10px">
					<h3>
						マイリスト検索
                        <span id="mylistSearchHeaderButtons">
                            <input type="button" id="mylistSearchReloadCacheButton" value="キャッシュ再読み込み" />
                        </span>
					</h3>
				</div>
				<div style="padding:10px 20px 10px">
					<div id="mylistSearchBody" style="display:none">
						<input type="text" id="mylistSearchKeyword" size="40"/>
						<input type="button" id="mylistSearchClearButton" value="クリア" />
					</div>
					<div id="mylistSearchInfo" style="display:none; margin-top:10px; color:#888">
						<div id="mylistSearchMessage">
							検索準備中です。
						</div>
						<div id="mylistSearchProgress" style="min-height:80px">
						</div>
					</div>
					<ul id="mylistSearchResult" style="margin:0px; padding:0px">
					</ul>
				</div>
			</div>
		$("#mypageContents").prepend(html.toString());
		
		
		// キャッシュ再読み込みボタン
		$("#mylistSearchReloadCacheButton").click(function(){
            reload();
		});
		
		// キーワード
		$("#mylistSearchKeyword").keyup(function(){
			var keyword = jQuery(this).val();
			var results = search($.trim(keyword), myLists);
			refresh($("#mylistSearchResult"), results);
		});
		
		// ボディのクリアボタン
		$("#mylistSearchClearButton").click(function(){
			$("#mylistSearchKeyword").val("");
			refresh($("#mylistSearchResult"), [], []);
		});
	}
	
	
	// マイリスト情報を再読み込みする。
	function reload(){
        $("#mylistSearchHeaderButtons").slideUp();
        $("#mylistSearchInfo").slideDown();

		// マイリストを取得する。
		return next(function(){
			var newLists = {};
			return getMyLists(function(lists){
				newLists = lists;
			}).
			
			// マイリストの差分を反映する。
			next(function(){
				myLists = myLists.merge(newLists);
			});
		}).
		
		// 動画リストを取得する。
		next(function(){
			var keys = myLists.keys;
			return loop(keys.length, function(i){
				var newItems = {};
				return getMyListItems(keys[i], function(items){
					newItems = items;
				}).

				// 動画リストの差分を反映する。
				next(function(){
					myLists[keys[i]].items = myLists[keys[i]].items.merge(newItems);
				});
			});
		}).

		// 検索フォームを表示する。（ここでひとまずタイトルだけで検索可能にする）
		next(function(){
			// $("#mylistSearchBody").slideDown();
		}).
		
		// タグを取得する。
		next(function(){
			var listIds = myLists.keys;
			return loop(listIds.length, function(i){
				var listId = listIds[i];
				var list = myLists[listId];
				var itemIds = list.items.keys;
				return loop(itemIds.length, function(j){
					var itemId = itemIds[j];
					var item = list.items[itemId];
					return getTags(item.id, function(tags){
						item.tags = tags;

						var progress = document.getElementById("mylistSearchProgress");
						progress.innerHTML = [
							"タグを取得中です。",
							"[" + (i + 1) + "/" + listIds.length + "]" + list.title,
							"[" + (j + 1) + "/" + itemIds.length + "]" + item.id + ":" + item.title
						].join("<br/>");
					});
				});
			});
		}).

		// 取得が終わったので画面のボタン表示を制御する。
		next(function(){
            $("#mylistSearchHeaderButtons").slideDown();
			$("#mylistSearchBody").slideDown();
			$("#mylistSearchInfo").slideUp();
			$("#mylistSearchProgress").text("");
		}).

		// 保存する。
		next(function(){
			setValue("myLists", JSON.stringify(myLists));

            var now = new Date();
            setValue("lastUpdated", now.toString());
		});
	}


	// キーワードから動画を検索する。
	function search(keyword, lists){
		var founds = {}  // 動画を親にした検索結果。
		
		if(keyword == ""){
			return {}
		}

		var keywords = hira2kata(zen2han(keyword)).split(" ");
		var rs = getRegexes(keywords);
		
		lists.each(function(listId, list){
			list.items.each(function(itemId, item){
				// 検索条件: タイトル
				var title = hira2kata(zen2han(item.title));
				
				// 検索条件: タグ
				var tags = hira2kata(zen2han(item.tags.join(" ")));
				
				// 検索条件: マイリストコメント
				var description = hira2kata(zen2han(item.description));
				
				var whole = [title, tags, description].join(" ");
				if(match_all(whole, rs)){
					if(founds[itemId]){
						founds[itemId].lists[listId] = {
							id: listId,
							title: list.title,
							description: item.description
						};
						if(founds[itemId].updateTime < item.updateTime){
							founds[itemId].updateTime = item.updateTime;
						}
					}
					else{
						founds[itemId] = JSON.parse(JSON.stringify(item));
						founds[itemId].lists = {};
						founds[itemId].lists[listId] = {
							id: listId,
							title: list.title,
							description: item.description
						};
						delete founds[itemId].description;
					}
				}
			});
		});
	 	
		founds = founds.toArray();
		founds = founds.sort(function(a, b){
			return b.updateTime - a.updateTime;
		});
		
		return founds;
	}
	
	
	// 検索結果を最新の状態にする。
	function refresh(target, items){
		target.empty();
		
		var elems = [];
		for(var i = 0, n = items.length; i < n; i++){
			var item = items[i];
			
			var html = 
				<li style="clear:both; border-top:1px dashed #95B9DE; margin:10px 0px 0px; padding:10px 0px 0px">
					<div style="float:left">
						<a target="_blank" class="mypageThumb" href="watch/%id">
							<img src="%thumbnailUrl" />
						</a>
					</div>
					<div class="mylistVideo" style="float:left; width:560px; padding-left:10px;">
						<h4><a target="_blank" href="watch/%id">%title</a></h4>
						<p style="margin: 10px 0px 10px">
							<b>タグ:</b><br/>
							%tags<br/>
						</p>
						<p style="margin: 10px 0px 10px">
							<b >マイリスト:</b>
							<table style="margin-top:-10px">
							%mylists
							</table>
						</p>
					</div>
					<div style="float:none; clear:both"></div>
				</li>
			html = html.toString();
			html = html.replace(/%id/g, item.id);
			html = html.replace(/%thumbnailUrl/g, item.thumbnailUrl);
			html = html.replace(/%title/g, item.title);
			html = html.replace(/%tags/g, item.tags.join(" "));
			
			var listHtmls = [];
			item.lists.each(function(k, list){
				var listHtml =
					<tr style="padding:2px 0px 2px">
						<td style="padding-right:10px">%listTitle</td>
						<td>
							<form class="commentForm">
								<input type="hidden" id="listId" value="%listId" />
								<input type="hidden" id="itemId" value="%itemId" />
								<input type="hidden" id="itemType" value="%itemType" />
								<input type="text" id="description" size="32" value="%description" style="margin:0px"/>
								<input type="submit" value="保存" style="margin-left:-5px"/>
							</form>
						</td>
					</tr>
				listHtml = listHtml.toString();
				listHtml = listHtml.replace(/%listTitle/g, list.title);
				listHtml = listHtml.replace(/%listId/g, list.id);
				listHtml = listHtml.replace(/%itemId/g, item.itemId);
				listHtml = listHtml.replace(/%itemType/g, item.itemType);
				listHtml = listHtml.replace(/%description/g, list.description);
				listHtmls.push(listHtml);
			});
			html = html.replace(/%mylists/g, listHtmls.join(""));
			
			elems.push(html);
		}
		
		target.append(elems.join(""));
		
		// 検索結果の各フォームにイベントハンドラを設定。
		$(".commentForm").submit(function(){
			var listId = $("#listId", this).val();
			var itemId = $("#itemId", this).val();
			var itemType = $("#itemType", this).val();
			var description = $("#description", this).val();
			
			if(listId == 0){
				api.Deflist.update(itemType, itemId, description);
			}else{
				api.Mylist.update(listId, itemType, itemId, description);
			}
			myLists[listId].items[itemId].description = description;

			// マイリスコメント変更でリスト上位に表示させたいので。
			myLists[listId].items[itemId].updateTime = Math.floor((new Date).getTime() / 1000);

			setValue("myLists", JSON.stringify(myLists));
			
			return false;
		});
	}
	
	
	// ログインIDを取得する。
	function getLoginId(){
		var userSession = $.cookie("user_session");
		var loginId = userSession.split("_")[2];
		return loginId;
	}
	
	
	// マイリストを取得する。
	function getMyLists(callback){
		var results = {};
		
		results[0] = {
			id: 0,
			title: "とりあえずマイリスト",
			items: {}
		};

		return request(
			'POST', 'http://www.nicovideo.jp/api/mylistgroup/list',
			'token='+token,
			function(xhr){
				var lists = JSON.parse(xhr.responseText)['mylistgroup'];
				for(var i = 0, n = lists.length; i < n; i++){
					var list = lists[i];
					results[list.id] = {
						id: list.id,
						title: list.name,
						items: {}
					};
				}
			}
		).
		next(function(){
			callback(results);
		});
	}


	// マイリストの動画を取得する。
	function getMyListItems(listId, callback){
		var results = {};

		return next(function(){
			if(listId == 0){
				return request(
					"POST", "http://www.nicovideo.jp/api/deflist/list",
					"token=" + token,
					function(xhr){
						var items = JSON.parse(xhr.responseText)["mylistitem"];
						for(var i = 0, n = items.length; i < n; i++){
							var item = items[i];
							results[item.item_id] = toItem(item);
						}
					}
				);
			}
			else{
				return request('GET',
					'http://www.nicovideo.jp/api/mylist/list' + '?group_id=' + listId,
					null,
					function(xhr){
						var items = JSON.parse(xhr.responseText)['mylistitem'];
						for(var i = 0, n = items.length; i < n; i++){
							var item = items[i];
							results[item.item_id] = toItem(item);
						}
					}
				);
			}
		}).
		next(function(){
			callback && callback(results);
		});

		// 動画データを取得する。
		function toItem(x){
			return {
				itemId: x.item_id,
				itemType: x.item_type,
				description: (!!(x.description)) ? x.description : "",
				updateTime: x.update_time,
				id: x.item_data.video_id,
				title: x.item_data.title,
				thumbnailUrl: x.item_data.thumbnail_url,
				tags: []
			};
		}
	}


	// タグを取得する。
	function getTags(videoId, callback){
		return request("GET", 
			"http://ext.nicovideo.jp/api/getthumbinfo/" + videoId,
			null,
			function(xhr){
				var parser = new DOMParser();
				var xml = xhr.responseText;
				var json = $.xml2json(xml);

				//
				// コミュ限定動画が取得できない…。
				//

				if(json.status != "fail"){
					var tags = json.thumb.tags;
					
					// 他言語圏でタグがある場合は、
					// tagsが配列になっている可能性がある。
					// <tags domain="tw">とか。
					tags = (tags.length ? tags[0] : tags).tag;

					callback && callback(tags);
				}
			}
		);
	}
	
	
	// Deferred化したXHR関数。
	function request(method, url, data, onload){
		var deferred = new Deferred();
		GM_xmlhttpRequest({
			'method': method,
			'url': url,
			'data': data,
			'headers': {
				'Cookie': document.cookie
			},
			'onload': function(xhr){
				// コールバックがfalseを返した場合は失敗と見なす。
				(onload(xhr) !== false) ? deferred.call(xhr) : deferred.fail(xhr);
			}
		});
		return deferred;
	}
	
	
	// キーワード配列から正規表現の配列を取得する。
	function getRegexes(keywords){
		var rs = [];
		for(var i = 0, n = keywords.length; i < n; i++){
			rs.push(new RegExp(keywords[i], "ig"));
		}
		return rs;
	}
	
	
	// 正規表現の配列に全て一致するか調べる。
	function match_all(s, regexes){
		for(var i = 0, n = regexes.length; i < n; i++){
			if(! s.match(regexes[i])){
				return false;
			}
		}
		
		return true;
	}
	
	
	// ひらがなからカタカナに変換する。
	function hira2kata(s){
		s = s.replace(/う゛/gm, "ヴ");
		
		var ret = [];
		for(var i = 0, n = s.length; i < n; i++){
			var c = s.charCodeAt(i);
			ret[i] = (0x3041 <= c && c <= 0x3096) ? c + 0x0060 : c;
		}
		
		return String.fromCharCode.apply(null, ret);
	}
	
	
	// 全角から半角へ変換する。
	function zen2han(s){
		var zen = '＿１２３４５６７８９０ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ＠－．，：';
		var han = '_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@-.,:';
		
		for(i = 0, n = zen.length; i < n; i++){
			var re = new RegExp(zen[i], "gm");
			s = s.replace(re, han[i]);
		}
		
		return s;
	}
	
	
	// ブラウザからデータを取得する。
	function getValue(k){
		return GM_getValue(loginId + "." + k);
	}
	
	
	// ブラウザにデータを保存する。
	function setValue(k, v){
		GM_setValue(loginId + "." + k, v);
	}

	
	// デバッグ用。
	function pp(x){
		console.debug(x);
	}
})();
