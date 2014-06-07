// ==UserScript==
// @name           NicoWatch Tools
// @namespace      http://wktklabs.blog98.fc2.com/
// @description    ニコニコ動画Greasemonkeyスクリプトの統合スクリプト
// @include        http://www.nicovideo.jp/watch/*
// @version        0.5.20130123
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @updateURL      http://userscripts.org/scripts/source/156461.meta.js
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

(function(){

    var defaultConfig = {
        position : "top", /* top or bottom */
    };
    var functionEnable = {
        getflv : { flag : true, label : "FLV/MP4/SWF"},
        getxml : { flag : true, label : "XML"},
        getmp3 : { flag : true, label : "MP3"},
        comments_search : { flag : true, label : "コメント検索"},
        comments_getLinks : { flag : true, label : "リンク抽出"},
        getFilter : { flag : true, label : "フィルター"},
        tagsReload : { flag : true, label : "タグ更新"},
        viewLockedTags : { flag : true, label : ""},
        tagLinker : { flag : false, label : ""},
        getUsername : { flag : true, label : ""},
        replaceUserTextLink : { flag : false, label : ""},
        replaceUserTextSpace : { flag : false, label : ""},
        ecoMode : { flag : true, label : "エコノミー", label2 : "ノーマル"},
        heatMeter : { flag : true, label : "HeatMeter"}
    };

	var $$ = unsafeWindow.$$;
	var flvplayer = unsafeWindow.document.getElementById('flvplayer').wrappedJSObject;
	function htmlspecialchars(c){return c.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
	function xpath(query) {
		var results = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = new Array();
		for(var i=0; i<results.snapshotLength; i++){
			nodes.push(results.snapshotItem(i));
		}
		return nodes;
	}
	var Video = unsafeWindow.Video;
	var User = unsafeWindow.User;

	var api = {
		vid : false,
		prm : {
			all : false
		},
		xml : {
			publicCom : {
				text : false,
				dom : false,
				flag : false
			},
			userCom : {
				text : false,
				dom : false,
				flag : false
			}
		},
		checkWrapper : function(){
			if (flvplayer.GetVariable('o') == "base") return true;
			else return false;
		},
		get : function(func){
			var bfunc = function(f){
				if (!f) return api.prm.all;
				else f({responseText : api.prm.all});
			}
			if (!api.prm.all) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.nicovideo.jp/api/getflv?v=' + this.vid,
					onload: function(res){
						api.prm.all = res.responseText;
						var prms = api.prm.all.split('&');
						for(var i=0; i<prms.length; i++) {
							var pair = prms[i].split('=');
							api.prm[pair[0]] = pair[1];
						}
						bfunc(func);
					},
					onerror: function(res){
						$("#tools_status").html("接続エラー");
						GM_log(res.status + ':' + res.statusText);
					}
				});
			}
			else bfunc(func)
		},
		comments : function(type, func){
			var getComments = function(){
				var thread_id = decodeURIComponent(api.prm.thread_id);
				var url = decodeURIComponent(api.prm.ms);
				var dataStr;
				if (type==1) dataStr = '<thread res_from="-1000" fork="1" version="20061206" thread="' + thread_id + '" />';
				else dataStr = '<thread res_from="-1000" version="20061206" thread="' + thread_id + '" />';
				GM_xmlhttpRequest({
					method: 'POST',
					headers: { 'Content-type': 'text/xml' },
					url: url,
					data: dataStr,
					onload: function(res){
						xml.text = res.responseText;
						xml.dom = (new DOMParser()).parseFromString(res.responseText, "text/xml").wrappedJSObject;
						$("#tools_status").html("");
						if (!xml.flag) {
							switch (type) {
								case 0:
									$("#reload_public_xml").html('<a id="reload_public_xml_act" href="javascript:void(0);" title="通常コメントデータを更新">' +
																	'<img src="data:image/gif;base64,R0lGODlhDAAMAIMAAG1tbcvLy6WlpYCAgP7+/ra2tnZ2dubm5q6uroqKigAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIVwATABgIgAABBAUMGhQ40KABAAMOGBxA0GAAigMIFIAoUCEBigUEBiCQwGMAAAw9eiRYUKXBgSI9CiBwMsHGjAoBCAD5EeJIAgRxHqBo4CVMjwUQGIUZEAA7">' +
																	' 通常コメ' +
																	'</a>');
									$("#reload_public_xml_act").click(function(){
										$("#reload_public_xml").html("");
										api.comments(0, function(){
											$("#reload_public_xml").html('<a id="reload_public_xml_act" href="javascript:void(0);" title="通常コメントデータを更新">' +
																			'<img src="data:image/gif;base64,R0lGODlhDAAMAIMAAG1tbcvLy6WlpYCAgP7+/ra2tnZ2dubm5q6uroqKigAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIVwATABgIgAABBAUMGhQ40KABAAMOGBxA0GAAigMIFIAoUCEBigUEBiCQwGMAAAw9eiRYUKXBgSI9CiBwMsHGjAoBCAD5EeJIAgRxHqBo4CVMjwUQGIUZEAA7">' +
																			' 通常コメ' +
																			'</a>');
											alert("通常コメントデータを更新しました");
										})
									});
									if (!api.xml.userCom.flag) break;
								case 1:
									$("#reload_user_xml").html('<a id="reload_user_xml_act" href="javascript:void(0);" title="投稿者コメントデータを更新">' +
																'<img src="data:image/gif;base64,R0lGODlhDAAMAIMAAG1tbcvLy6WlpYCAgP7+/ra2tnZ2dubm5q6uroqKigAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIVwATABgIgAABBAUMGhQ40KABAAMOGBxA0GAAigMIFIAoUCEBigUEBiCQwGMAAAw9eiRYUKXBgSI9CiBwMsHGjAoBCAD5EeJIAgRxHqBo4CVMjwUQGIUZEAA7">' +
																' 投稿者コメ' +
																'</a>');
									$("#reload_user_xml_act").click(function(){
										$("#reload_user_xml").html("");
										api.comments(1, function(){
											$("#reload_user_xml").html('<a id="reload_user_xml_act" href="javascript:void(0);" title="投稿者コメントデータを更新">' +
																		'<img src="data:image/gif;base64,R0lGODlhDAAMAIMAAG1tbcvLy6WlpYCAgP7+/ra2tnZ2dubm5q6uroqKigAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIVwATABgIgAABBAUMGhQ40KABAAMOGBxA0GAAigMIFIAoUCEBigUEBiCQwGMAAAw9eiRYUKXBgSI9CiBwMsHGjAoBCAD5EeJIAgRxHqBo4CVMjwUQGIUZEAA7">' +
																		' 投稿者コメ' +
																		'</a>');
											alert("投稿者コメントデータを更新しました");
										})
									});
									break;
							}
							xml.flag = true;
						}
						func();
					},
					onerror: function(res){
						$("#tools_status").html("接続エラー");
						GM_log(res.status + ':' + res.statusText);
					}
				});
			};
			var xml;
			if (type==1) {
				xml = this.xml.userCom;
				$("#tools_status").html("投稿者コメントデータ取得中...");
			}
			else {
				xml = this.xml.publicCom;
				$("#tools_status").html("一般コメントデータ取得中...");
			}
			if (api.prm.thread_id==undefined) getComments();
			else api.get(getComments);
		}
	}
  
	/*--- tools ---*/
	var tools = {
		flag : {
			getflv : 0,
			search : 0,
			getLinks : 0,
			getFilter : 0
		},
		show : function(){
			if (document.URL.match(/^http:\/\/.*?\.nicovideo\.jp\/watch\/([^\/?<>"'#]+)/)) {
				api.vid = RegExp.$1;
				var toolbar = document.createElement("table");
				toolbar.id = 'tools_table';
				toolbar.cellpadding = 0;
				toolbar.cellspacing = 4;
				toolbar.border = 0;
				toolbar.className = 'TXT12';
				toolbar.innerHTML = '<tr>' +
									'<td><span id="nicowatchtools_icon"></span></td>' +
									((functionEnable.getflv.flag)?'<td><input type="submit" id="flv_dl" class="submit" value="'+functionEnable.getflv.label+'"/></td>':"") +
									((functionEnable.getxml.flag)?'<td><input type="submit" id="xml_dl" class="submit" value="'+functionEnable.getxml.label+'"/></td>':"") +
									((functionEnable.getmp3.flag)?'<td><input type="submit" id="mp3_dl" class="submit" value="'+functionEnable.getmp3.label+'"/></td>':"") +
									((functionEnable.comments_search.flag)?'<td><input type="submit" id="search_comments" class="submit" value="'+functionEnable.comments_search.label+'"/></td>':"") +
									((functionEnable.comments_getLinks.flag)?'<td><input id="get_links" type="submit" class="submit" value="'+functionEnable.comments_getLinks.label+'"/></td>':"") +
									((functionEnable.getFilter.flag)?'<td><input id="get_filter" type="submit" class="submit" value="'+functionEnable.getFilter.label+'"/></td>':"") +
									((functionEnable.tagsReload.flag)?'<td><input id="tags_reload" type="submit" value="'+functionEnable.tagsReload.label+'" class="submit" /></td>':"") +
									((functionEnable.ecoMode.flag)?'<td><input id="eco_mode" type="submit" class="submit" value="'+functionEnable.ecoMode.label+'"/></td>':"") +
									((functionEnable.heatMeter.flag)?'<td><input id="heatMeter_btn" type="submit" class="submit" value="'+functionEnable.heatMeter.label+'"/></td>':"") +
									'<td id="tools_status" width="100%">' +
									'' +
									'</td>' +
									'<td id="tools_status2">' +
									'' +
									'</td>' +
									'<td id="reload_public_xml" style="padding:5px 10px 0 0;">' +
									'' +
									'</td>' +
									'<td id="reload_user_xml" style="padding:5px 10px 0 0;">' +
									'' +
									'</td>' +
									'</tr>';
				var search_box = document.createElement("div");
				search_box.id = "search_comments_box";
				if (functionEnable.comments_search.flag) {
					search_box.className = "TXT12";
					search_box.style.display="none";
					search_box.setAttribute("name","");
					search_box.style.padding="0 0 5px 30px";
					search_box.innerHTML = '<form id="search_comments_form" style="margin:0;padding:0;" onsubmit="return false">' +
											'検索対象：<select id="comment_type" name="comment_type">' +
											'<option value="public">通常コメント</option>' +
											'<option value="user">投稿者コメント</option></select>' +
											' キーワード：<input id="search_comments_input" type="text" style="width:150px" />' +
											' <input type="submit" value="検索/全表示" style="background-color:#f0f0f0;border-width:1px;border-style:solid;border-color : #cccccc #999999 #999999 #cccccc;" />' +
											' <input type="button" value="消" onclick="$(\'search_comments_input\').value=\'\'" style="background-color:#f0f0f0;border-width:1px;border-style:solid;border-color : #cccccc #999999 #999999 #cccccc;" />' +
											'　　表示：' +
											'<input type="checkbox" id="search_disp_mail" name="mail" value=1><label for="search_disp_mail">コマンド</label>' +
											' <input type="checkbox" id="search_disp_post" name="post" value=1><label for="search_disp_post">書き込み日時</label>' +
											' <input type="checkbox" id="search_disp_number" name="number" value=1><label for="search_disp_number">コメント番号</label>' +
											' </form>';
				}
				var toolbox = document.createElement("div");
				toolbox.id = "toolbox";
				toolbox.className = "TXT12";
				
				if (defaultConfig.position=="bottom") {
					var doc = document.createElement("div");
					doc.id = "nicowatchtools";
					doc.style.cssText = "margin: 0 auto 5px auto;";
					var doc1 = document.createElement("div");
					doc1.id = "nicowatchtools_top";
					doc.appendChild(doc1);
					doc1 = document.createElement("div");
					doc1.id = "nicowatchtools_container";
					doc1.appendChild(toolbar);
					doc1.appendChild(search_box);
					doc1.appendChild(toolbox);
					doc.appendChild(doc1);
					doc1 = document.createElement("div");
					doc1.id = "nicowatchtools_bottom";
					doc.appendChild(doc1);
					$("#WATCHFOOTER").prepend(doc);
				}
				else {
					//
					$("#WATCHHEADER").append(toolbar);
					$("#WATCHHEADER").append(search_box);
					$("#WATCHHEADER").append(toolbox);
				}
				
				if (functionEnable.tagsReload.flag) $("#tags_reload").click(tools.tagsReload);
				if (functionEnable.tagLinker.flag) tools.tagLinker();
				if (functionEnable.viewLockedTags.flag) tools.viewLockedTags();
				
				if (functionEnable.getflv.flag) $("#flv_dl").click(tools.getflv);
				if (functionEnable.getxml.flag) $("#xml_dl").click(tools.getxml);
				if (functionEnable.getmp3.flag) $("#mp3_dl").click(tools.getmp3);
				if (functionEnable.comments_search.flag) $("#search_comments").click(tools.comments.search.input);
				if (functionEnable.comments_search.flag) $("#search_comments_form").click(tools.comments.search.act);
				if (functionEnable.comments_getLinks.flag) $("#get_links").click(tools.comments.getLinks);
				if (functionEnable.getFilter.flag) $("#get_filter").click(tools.getFilter.show);
				if (functionEnable.getFilter.flag) tools.getFilter.count();
				if (functionEnable.ecoMode.flag) $("#eco_mode").click(tools.ecoMode.change);
				if (functionEnable.ecoMode.flag) tools.ecoMode.show();
				if (functionEnable.getUsername.flag) tools.getUsername();
				if (functionEnable.heatMeter.flag) {
					$("#heatMeter_btn").click(heatMeter.switch);
					heatMeter.switchCheck();
					heatMeter.act();
				}
				tools.replaceUserText();
			}
		},
		getflv : function(){
			if ($("#toolbox").attr("name") == "getflv") {
				$("#toolbox").attr("name","");
				$("#toolbox").html("");
			}
			else {
				$("#search_comments_box").css("display","none");
				$("#tools_status").html("セッションの再確立中...");
				GM_xmlhttpRequest({
					method : 'GET',
					url : 'http://www.nicovideo.jp/watch/' + location.href.split('/').reverse()[0],
					onload : function(res) {
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://www.nicovideo.jp/api/getflv?v=' + location.href.split('/').reverse()[0],
							onload: function(res){
								$("#tools_status").html("");
								var movie_type = flvplayer.GetVariable('movie_type');
								if (/&url=(.+?)&/.test(res.responseText)) {
									var note = '', ecoNote = '', url = decodeURIComponent(RegExp.$1);
									var ecoFlag = /low$/.test(url);
									if (ecoFlag) ecoNote = '　(エコノミーモードにより画質が低下しています)';
									if (ecoFlag || (movie_type != "swf" && movie_type != "mp4")) {
										movie_type = "flv";
									}
									else {
										note = '<tr><td align="right" style="padding-right:0;">ヒント：</td><td style="padding-left:0;">ダウンロードURLを右クリック→「名前を付けてリンク先を保存」から任意の保存先を選択し、拡張子を「.' + movie_type + '」にして保存してください。</td></tr>';
									}
									if (movie_type == "swf") url = url + "as3";
									$("#toolbox").html('<div style="margin:0 30px;">' +
														'<table style="margin-top:5px;border:2px #ccc solid;" width="100%" cellpadding="0" cellspacing="5">' +
														'<tr>' +
														'<td align="right" width="120px" style="padding-right:0;">' +
														'タイトルコピペ用：' +
														'</td>' +
														'<td style="padding-left:0;">' +
														'<input type="text" class="paste" style="width:500px;" value="' + Video.title + "." + movie_type + '" onfocus="this.select();" readonly="readonly" />' +
														'</td>' +
														'</tr>' +
														'<tr>' +
														'<td align="right" style="padding-right:0;">' +
														'動画ファイル形式：' +
														'</td>' +
														'<td style="padding-left:0;">' +
														movie_type + ecoNote +
														'</td>' +
														'</tr>' +
														'<tr>' +
														'<td align="right" style="padding-right:0;">' +
														'ダウンロードURL：' +
														'</td>' +
														'<td style="padding-left:0;">' +
														'<a href="'+url+'" target="_blank">'+url+'</a>' +
														'</td>' +
														'</tr>' +
														note +
														'</table>' +
														'</div>' +
														'<div style="text-align:right">' +
														'<a id="toolbox_close" href="javascript:void(0);">[×]とじる</a>' +
														'</div>');
									$("#toolbox_close").click(tools.getflv);
									$("#toolbox").attr("name","getflv");
								}
							}
						});
					}
				});
			}
		},
		getmp3 : function(){
			var mp3window = window.open('http://www.nicomimi.net/play/' + location.href.split('/').reverse()[0]);
		},
		get3gp : function(){
			var nico3gpwindow = window.open('http://www.nico3gp.com/?nicomimi=' + location.href.split('/').reverse()[0]);
		},
		getxml : function(){
			var func = function(type){
				var iframe = document.createElement("iframe");
				iframe.style.display = "none";
				var text;
				if (type==1) text = api.xml.userCom.text;
				else text = api.xml.publicCom.text;
				location.href = 'data:application/octet-stream,'+encodeURIComponent(text.replace(/></g, '>\r\n<'));
			}
			if (confirm("通常コメントまたは投稿者コメントデータをダウンロードします。\nOK => 通常コメント\nキャンセル => 投稿者コメント")) {
				if (confirm("通常コメントデータをダウンロードします。\nよろしいですか？")) {
					if (!api.xml.publicCom.flag) api.comments(0,function(){func(0);});
					else func(0);
				}
			}
			else {
				if (confirm("投稿者コメントデータをダウンロードします。\nよろしいですか？")) {
					if (!api.xml.userCom.flag) api.comments(1,function(){func(1);});
					else func(1);
				}
			}
		},
		comments : {
			display : function(nonText, reg, linkOnly, type, func){
				$("#tools_status").html();
				var table = function(reg){
					var xml;
					if (type==1) xml = api.xml.userCom;
					else xml = api.xml.publicCom;
					var results = '';
					var chatText;
					var premi;
					var reg = new RegExp(reg, "ig");
					var match = false, match2 = false;
					var flag = false;
					var com;
					var ii = false;
					var user_id;
					var date = new Date();
					var chat = xml.dom.getElementsByTagName("chat");
					var num = chat.length;
					var month, day, hour, seconds;
					for (var i = 0; i < num; i++) {
						chatText = chat[i].textContent;
						user_id = chat[i].getAttribute("user_id");
						if (linkOnly) match = /((sm|fz|yo|ig|ax|na|nm|za|yk|sk|fx|cw|zc|zb|ca|zd)\d+)|(watch\/\d+)|(mylist\/\d+)|(h?ttps?:\/\/[-_.!~*()a-zA-Z0-9;\/?:@&=+$,%#]+)/.test(chatText);
						else {
							match = reg.test(chatText);
							match2 = reg.test(user_id);
						}
						if (match || match2) {
							flag = true;
							user_id = user_id;
							vpos_min = Math.floor(Math.floor(chat[i].getAttribute("vpos") / 100) / 60);
							vpos_sec = Math.floor(chat[i].getAttribute("vpos") / 100) - vpos_min * 60;
							if (vpos_min < 10) vpos_min = '0' + vpos_min;
							if (vpos_sec < 10) vpos_sec = '0' + vpos_sec;
							if (chat[i].getAttribute("premium")) premi = '[P] ';
							else premi = '';
							com = htmlspecialchars(chatText);
							if (com.match(/(h?ttps?:\/\/[-_.!~*()a-zA-Z0-9;\/?:@&=+$,%#]+)/i)) {
								com = com.replace(/(h?ttps?:\/\/[-_.!~*()a-zA-Z0-9;\/?:@&=+$,%#]+)/ig, 
									function($1){
										var url = $1, deurl = $1;
										if (!/^h/.test(url)) deurl = "h" + url;
										return '<a href="'+deurl+'" target="_blank">'+url+'</a>';
									}
								);
							}
							else if (com.match(/((sm|fz|yo|ig|ax|na|nm|za|yk|sk|fx|cw|zc|zb|ca|zd)\d+)/ig))
								com = com.replace(/((sm|fz|yo|ig|ax|na|nm|za|yk|sk|fx|cw|zc|zb|ca|zd)\d+)/ig, '<a href="/watch/'+RegExp.$1+'">'+RegExp.$1+'</a>');
							else if (com.match(/(watch\/\d+)/ig))
								com = com.replace(/(watch\/\d+)/ig, '<a href="/'+RegExp.$1+'">'+RegExp.$1+'</a>');
							else if (com.match(/(mylist\/\d+)/ig))
								com = com.replace(/(mylist\/\d+)/ig, '<a href="/'+RegExp.$1+'">'+RegExp.$1+'</a>');
							else if (com.match(/(user\/\d+)/ig))
								com = com.replace(/(user\/\d+)/ig, '<a href="/'+RegExp.$1+'">'+RegExp.$1+'</a>');
							else if (com.match(/([-_.!~*()a-zA-Z0-9;\/?:@&=+$,%#]{50})/ig))
								com = com.replace(/([-_.!~*()a-zA-Z0-9;\/?:@&=+$,%#]{50})/ig, RegExp.$1+'<br />');
							com = com.replace(/\\r\\n/ig,'<br />');
							if (ii) {
								trStyle = 'style="background:#efefef;"';
								ii = false;
							} else {
								trStyle = '';
								ii = true;
							}
							date.setTime(chat[i].getAttribute("date")+'000');
							month = date.getMonth() + 1;
							if (month < 10) month = '0' + month;
							day = date.getDate();
							if (day < 10) day = '0' + day;
							hour = date.getHours();
							if (hour < 10) hour = '0' + hour;
							seconds = date.getMinutes();
							if (seconds < 10) seconds = '0' + seconds;
							results += '<tr ' + trStyle + '>'
									+ '<td>'
									+ vpos_min + ':' + vpos_sec
									+ '</td>'
									+ '<td class="comment">'
									+ com
									+ '</td>'
									+ (($("#search_disp_mail").get(0).checked)?'<td class="mail" style="white-space:nowrap;">'
									+ ((chat[i].getAttribute("mail")!=null)?chat[i].getAttribute("mail"):"-")
									+ '</td>':"")
									+ (($("#search_disp_post").get(0).checked)?'<td>'
									+ month + '/' + day + ' ' + hour + ':' + seconds
									+ '</td>':"")
									+ (($("#search_disp_number").get(0).checked)?'<td>'
									+ chat[i].getAttribute("no")
									+ '</td>':"")
									+ '<td style="white-space:nowrap;padding:0 5px;text-align:left;">'
									+ premi
									+ ((type==0)?'<a href="javascript:void(0);" onclick="var id=$(\'search_comments_input\');id.value=this.innerHTML;$(\'search_comments_box\').style.display=\'\';id.focus();window.Element.scrollTo($$(\'p.TXT12\').first());" class="uid_link">'
									+ user_id
									+ '</a>':'')
									+ '</td>'
									+ '</tr>';
						}
					}
					if (flag) {
						$("#toolbox").html('<table id="toolbox_table" cellpadding="0" cellspacing="0"><tbody>' +
											'<tr class="top_bar">' +
											'<td>再生時間</td>' +
											'<td width="100%">コメント</td>' +
											(($("#search_disp_mail").get(0).checked)?'<td>コマンド</td>':"") +
											(($("#search_disp_post").get(0).checked)?'<td>書き込み日時</td>':"") +
											(($("#search_disp_number").get(0).checked)?'<td>コメ番号</td>':"") +
											((type==1)?'<td>プレミアム</td>':"<td>[プレミアム] ユーザーID</td>") +
											'</tr>' +
											results +
											'</tbody></table>' +
											'<div style="text-align:right">' +
											'<a id="toolbox_close" href="javascript:void(0);">[×]とじる</a>' +
											'</div>');
						$("#toolbox_close").click(function(){
							$("#search_comments_box").css("display","none");
							$("#toolbox").html("");
							$("#toolbox").attr("name","");
						});
					} else {
						$("#toolbox").html("");
						alert(nonText);
					}
					if (func) func();
				};
				if (type==0 && !api.xml.publicCom.dom) api.comments(0,function(){table(reg)});
				else if (type==1 && !api.xml.userCom.dom) api.comments(1,function(){table(reg)});
				else table(reg);
			},
			search : {
				input : function(){
					$("#tools_status").html("");
					if ($("#search_comments_box").css("display")!="none"){
						$("#search_comments_box").css("display","none");
						$("#toolbox").html("");
						$("#toolbox").attr("name","");
					}
					else {
						$("#toolbox").html("");
						$("#search_comments_box").css("display","");
						$("#search_comments_input").focus();
						$("#toolbox").attr("name","searchComments");
					}
				},
				act : function(){
					$("#tools_status").html("");
					word = $("#search_comments_input").val();
					word = word.replace('　', ' ').split(' ');
					var num = word.length;
					var type;
					if ($("#comment_type").val()=="user") type=1;
					else type=0;
					if (num > 0 && word != '') {
						var words = '';
						for (var i = 0; i < num; i++) {
							words += '|(' + word[i] + ')'
						}
						tools.comments.display('該当するコメントは見つかりませんでした。', words.substr(1), false, type, false);
					} else {
						if (type==1) tools.comments.display('投稿者コメントはありませんでした。', '', false, type, false);
						else tools.comments.display('', '', false, type, false);
					}
				}
			},
			getLinks : function(){
				$("#search_comments_box").css("display","none");
				if ($("#toolbox").attr("name") == "getLinks"){
					$("#toolbox").html("");
					$("#toolbox").attr("name","");
				}
				else {
					tools.comments.display('コメント内にリンクは見つかりませんでした。', '', true, 0, function(){
						if ($("#toolbox").html() != "") $("#toolbox").attr("name","getLinks");
						else $("#toolbox").attr("name","");
					});
				}
			},
			getUserComments : function(){
				$("#search_comments_box").css("display","none");
				if ($("#toolbox").attr("name") == "getUserComments"){
					$("#toolbox").html("");
					$("#toolbox").attr("name","");
				}
				else {
					tools.comments.display('', '', false, 0, 
						function(){$("#toolbox").attr("name","getUserComments");}
					);
				}
			}
		},
		getFilter : {
			count : function(){
				setTimeout(function(){
					api.get(function(){
							if (api.prm.ng_up!=undefined) {
								var filters = decodeURIComponent(decodeURIComponent(api.prm.ng_up)).split('&');
								if (filters.length > 0) $("#get_filter").val() += '(' + filters.length + ')';
								clearInterval(filterCounter);
							}
					});
				}, 3000);
			},
			show : function(){
				$("#search_comments_box").css("display","none");
				$("#toolbox").html("");
				$("#tools_status").html("");
				if ($("#toolbox").attr("name") == "getFilter") {
					$("#toolbox").attr("name","");
				}
				else {
					if (!api.prm.ng_up) {
						alert("フィルターは設定されていません。");
						$("#toolbox").attr("name","");
					}
					else {
						filters = decodeURIComponent(decodeURIComponent(api.prm.ng_up)).split('&');
						var results = '';
						var ii = false;
						for (var i = 0; i < filters.length; i++) {
							filters[i].match(/(.+)=(.+)/);
							if (ii) {
								trStyle = 'style="background:#efefef;"';
								ii = false;
							} else {
								trStyle = '';
								ii = true;
							}
							results += '<tr ' + trStyle + '><td style="white-space:nowrap;padding:0 10px;">' + RegExp.$1 + '</td><td class="comment">' + RegExp.$2 + '</td></tr>';
						}
						$("#toolbox").html('<table id="toolbox_table" cellpadding="0" cellspacing="0"><tbody>' +
											'<tr class="top_bar">' +
											'<td>変換前</td>' +
											'<td width="100%">変換後</td>' +
											'</tr>' +
											results +
											'</tbody></table>' +
											'<div style="text-align:right">' +
											'<a id="toolbox_close" href="javascript:void(0);">[×]とじる</a>' +
											'</div>');
						$("#toolbox_close").click(function(){
							$("#toolbox").html("");
							$("#toolbox").attr("name","");
						});
						$("#toolbox").attr("name","getFilter");
					}
				}
			}
		},
		tagsReload : function(){
			if (!functionEnable.tagsReload.flag) return;
			$("#tools_status").html("");
			GM_xmlhttpRequest({
				method : 'POST',
				url : "http://www.nicovideo.jp/tag_edit/" + api.vid,
				headers : {
					'X-Requested-With' :'XMLHttpRequest',
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				data : 'cmd=tags',
				onload : function(res) {
					if (/^<\!DOCTYPE HTML PUBLIC/.test(res.responseText)) alert("タグの更新に失敗しました。");
					else {
						$("#video_tags").html(res.responseText);
						tools.tagLinker(tools.viewLockedTags(unsafeWindow.Nicopedia.decorateLinks));
						var tagfrm = $("#video_tags").get(0);
						var tagBGcolor = 125;
						timeId = setInterval(function(){
							tagBGcolor += 10;
							tagfrm.style.backgroundColor = "#ffff" + tagBGcolor.toString(16);
							if (tagBGcolor >= "255") clearInterval(timeId);
						}, 100);
					}
				}
			});
		},
		tagLinker : function(func){
			if (!functionEnable.tagLinker.flag) return;
			var tags = (xpath("//div[@id='video_tags']//a[@rel='tag']"));
			for (var i=0; i<tags.length ;i++) {
				if (tags[i].href.match(/((sm|fz|yo|ig|ax|na|nm|za|yk|sk|fx|cw|zc|zb|ca|zd)\d+)/ig))
					tags[i].href = "/watch/"+RegExp.$1;
				else if (tags[i].href.match(/((co)\d+)/ig))
					tags[i].href = "http://com.nicovideo.jp/community/"+RegExp.$1;
				else if (tags[i].href.match(/(mylist%2F\d+)/ig))
					tags[i].href = "/"+RegExp.$1;
				else if (tags[i].href.match(/(user%2F\d+)/ig))
					tags[i].href = "/"+RegExp.$1;
			}
			if (func!=undefined) func();
		},
		viewLockedTags : function(func){
			if (!functionEnable.viewLockedTags.flag) return;
			var tagList = Video.lockedTags;
			var tags = (xpath("//div[@id='video_tags']//a[@rel='tag']"));
			var starHTML;
			for (var i=0; i<tags.length ;i++) {
				for (var ii=0;ii<tagList.length;ii++) {
					if (tags[i].href.match(new RegExp('tag/'+encodeURIComponent(tagList[ii])+'$', 'i'))) {
						starHTML = document.createElement("span");
						starHTML.className = "tools_locked_tags_star";
						starHTML.innerHTML = "★";
						tags[i].parentNode.insertBefore(starHTML, tags[i]);
						break;
					}
				}
			}
			if (func!=undefined) func();
		},
		getUsername : function(){
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.smilevideo.jp/view/' + api.vid.replace(/^[a-z]{2}/, ''),
				onload: function(res){
					if(/<strong>(.+?)<\/strong> が/.test(res.responseText)) {
						var user = decodeURIComponent(RegExp.$1);
						var doc1 = document.createElement("span");
						doc1.style.fontSize = "12px";
						doc1.innerHTML = " [ <b>"+user+"</b> ] ";
						(xpath("//div[@id='des_1']/div/p"))[0].appendChild(doc1);
						var doc2 = document.createElement("span");
						doc2.style.fontSize = "12px";
						doc2.style.color = "#000";
						doc2.innerHTML = " [ うｐ主 ： <b>"+user+"</b> ] ";
						(xpath("//div[@id='des_2']/table/tbody/tr/td[2]/p[2]/span"))[0].insertBefore(doc2, (xpath("//div[@id='des_2']/table/tbody/tr/td[2]/p[2]/span/a"))[0]);
					}
				}
			});
		},
		replaceUserText : function(){
			setTimeout(function(){
				var p;
				if (api.checkWrapper()) p = $("#WATCHHEADER").get(0).getElementsByTagName('p')[2];
				else p = (xpath("//div[@id='des_2']/table[2]/tbody/tr/td[2]/p"))[0];
				var userText = p.innerHTML;
				if (functionEnable.replaceUserTextLink.flag) 
					userText = userText.replace(/("?>?h?ttps?:\/\/[-_.!~*()a-zA-Z0-9;\/?:@&=+$,%#]+)/ig, 
						function($1){
							var url = $1;
							if (!/^("|>)/.test(url) && !url.match(/nicovideo\.jp/ig)) {
								url.match(/(h?ttps?:\/\/[-_.!~*()a-zA-Z0-9;\/?:@&=+$,%#]+)$/ig);
								url = RegExp.$1;
								if (!/^h/.test(url)) url = "h" + url;
								return '<a href="'+url+'" target="_blank">'+url+'</a>';
							}
							else return url;
						}
					);
				if (functionEnable.replaceUserTextSpace.flag && p.getElementsByTagName('br').length<1)
					userText = userText.replace(/([ 　]{3,})/ig, "<br />");
				if (functionEnable.replaceUserTextLink.flag || functionEnable.replaceUserTextSpace.flag)
					p.innerHTML = userText;
			}, 1000);
		},
		ecoMode : {
			show : function(){
				if (/(.*)\?eco=1$/.test(document.URL)) $("#eco_mode").val(functionEnable.ecoMode.label2);
			},
			change : function(){
				if (/(.*)\?eco=1$/.test(document.URL)) window.self.location.href = RegExp.$1;
				else window.self.location.href = document.URL+"?eco=1";
			},
		}
	};

	GM_addStyle(
"#nicowatchtools_icon{" +
"		display:block;" +
"		width: 49px;" +
"		height: 20px;" +
"		margin-left:1px;" +
"		margin-right:5px;" +
"		background: url('data:image/gif;base64,R0lGODlhMQAUAIUAABUmJomRjlZgWi9AQMzPzx8wL7O4tyk2LnF6dunt7SAvMJanpy05LxcoJm12ckFVVdvi4lljXkJNRSUzLbi9vIWNiqCmpCs8PBssK4iamlJnZzJDQ8zR0ba7uio2MHR9eP7%2B%2Fp6koiw6MxcoKOXn5yIzMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAxABQAAAj%2BAEGASACBg8GDCBMqXMgwIYQEAgcu0PBgg8WLGDNq3Mjx4gMNCyAmWFCxo8mTKB%2BEhKDhwgaXLlFahPny5YWbOHPqrKmh4MyaOEVcECF0qIeiNGnOJMp0I8wHBnXeJCpBBIUQRCNQiIBU6lQKAT6A%2BNBValSpIiyAkKC2aoCxZXUSBUFBLFmvOKOWuLB3qgQQFiKACGAVhNCih4dOFUHXbtm9kA1C5ruhRAkRHEhg5iCCBOejR5mKHtoYLtGLfFNLtmyZbwkPFUBEqPBBcIW5EXMbnlsXbgALRVlbXi2ctQQJHo6SWJv8wwcEHxxEj94cBO2xEkh08FB8OIcSAMC6i7cMWkKHsdwVTPAwob37CRhEEFjrwDoJEhIwANgvHoDB8ACCB0ADHsy2nAMTDIjBCBg06GAB652HFQIC4VdcgP%2Ftx99%2BCggGggERJLiffg42WAIGE%2Fy1XYEghCDBhRr6x0GMAA7ogQNEKaAhgwyWaGIJyJEnAncwahgVjRo2AB%2BSTMaoQAMa6tckfxxA8MCUWGappYYPPJTBBVuGKSYAF2QgUgYPCDjmmjGW8ICZERHU0Jx00vmQQAEBADs%3D');" +
"	}" +
"	#tools_table {" +
"		max-width: 960px;" +
"		white-space: nowrap;" +
"	}" +
"	#tools_table td{" +
"		font-size:12px;" +
"	}" +
"	#search_comments_box, #search_comments_box td{" +
"		font-size:12px;" +
"	}" +
"	#toolbox {" +
"		padding: 0 20px;" +
"	}" +
"	#toolbox td{" +
"		padding: 0 20px;" +
"		font-size:12px;" +
"	}" +
"	#toolbox_table {" +
"		width: 920px;" +
"	}" +
"	#toolbox_table td{" +
"		text-align: center;" +
"		padding: 2px 0;" +
"		font-size:12px;" +
"	}" +
"	#toolbox_table .comment{" +
"		white-space: normal;" +
"		text-align: left;" +
"		padding-left: 5px;" +
"	}" +
"	#toolbox_table a.uid_link{ text-decoration: none; color: #666666; }" +
"	#toolbox_table a.uid_link:hover{ text-decoration: underline; color: #000; }" +
"	#toolbox_table .top_bar{" +
"		background: url('data:image/gif;base64,R0lGODlhAQAXAIIAAI%2BPj8%2FP0Pf38Kenp%2Fn59AAAAAAAAAAAACwAAAAAAQAXAAAIDgAFCBxIsCBBAgAGBAgIADs%3D');" +
"	}" +
"	#toolbox_table .top_bar td{" +
"		white-space: nowrap;" +
"		padding: 0 10px;" +
"		height: 23px;" +
"		line-height: 23px;" +
"		background: url('data:image/gif;base64,R0lGODlhAQAXAIIAAI%2BPj8%2FP0MHBwff38Kenp%2Fn59AAAAAAAACH5BAAAAAAALAAAAAABABcAAAgRAAcIHCCgoMGDBwcUAEAgQEAAOw%3D%3D') no-repeat;" +
"	}" +
"	#toolbox_table a{" +
"		color: #0099CC;" +
"		height: 22px;" +
"	}" +
"	#tools_status {" +
"		padding-left: 5px;" +
"	}" +
"	span.tools_locked_tags_star {" +
"		color:orange;" +
"		font-weight: bold;" +
"		cursor: text;" +
"		text-decoration: none;" +
"	}" +
"	" +
"	#nicowatchtools {" +
"		width: 950px;" +
"		padding: 0 4px;" +
"		margin-bottom: 5px;" +
"	}" +
"	#nicowatchtools_top{" +
"		height: 5px;" +
"		width: 950px;" +
"		background: url('data:image/gif;base64,R0lGODlhtgMFAIIAACgtLbGzs29ycvn6%2BpOWlj1CQri6unZ5eSwAAAAAtgMFAAAIrwAHDAggoACAgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlyoLCAggcACBAwZq6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DBGjhAYOCBsGjTql3Ltq3bt3Djyp1Lt67du3iTHiCYM6%2Ffv4ADCx5MuLDhw4gTKzZQULHjx5AjS55MubLly5ILBAQAOw%3D%3D') no-repeat top left;" +
"	}" +
"	#nicowatchtools_container{" +
"		padding: 0 10px;" +
"		background-color: #f9fafa;" +
"		border-left: 1px #000 solid;" +
"		border-right: 1px #000 solid;" +
"	}" +
"	#nicowatchtools_bottom{" +
"		height: 5px;" +
"		width: 950px;" +
"		background: url('data:image/gif;base64,R0lGODlhtgMFAIIAACgtLbGzs29ycvn6%2BpOWlj1CQri6unZ5eSwAAAAAtgMFAAAIsgALDBhIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJcmABAQZaypxJs6bNmzhz6tzJs6fPn0CDCh1gQECAA0OTKl3KtKnTp1CjSp1KdeiBAAMIHIhZtavXr2DDih1LtqxZoQYOECAYQEABAHDjyp1Lt67du3jz6t3Lt6%2Ffv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gnv8Q6ICAAOw%3D%3D') no-repeat bottom left;" +
"	}");
	
/*---------- HeatMeter ----------*/
	
	var h_api = {
		vid : Video.id,
		prm : {
			all : false
		},
		xml : {
			text : false,
			dom : false,
			flag : false
		},
		get : function(func){
			if (func) {
				if (!this.prm.all) {
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://ext.nicovideo.jp/api/getflv/' + this.vid,
						onload: func,
						onerror: function(res){
							GM_log(res.status + ':' + res.statusText);
						}
					});
				}
				else {
					func({responseText : this.prm.all});
				}
			}
		},
		comments : function(func){
			var com_num = 1000;
			var vl = Video.length;
			xml = this.xml;
			this.get(function(res){
				if(/thread_id=(.+?)&/.test(res.responseText)){
					var thread_id = decodeURIComponent(RegExp.$1);
					res.responseText.match(/&ms=(.+?)&/);
					var url = decodeURIComponent(RegExp.$1);
					res.responseText.match(/&user_id=(.+?)&/);
					var user_id = decodeURIComponent(RegExp.$1);
					GM_xmlhttpRequest({
						method: 'POST',
						headers: { 'Content-type': 'text/xml' },
						url: url,
						data: '<thread res_from="-'+ com_num +'" version="20061206" thread="' + thread_id + '" user_id="' + user_id + '" />',
						onload: function(res){
							xml.text = res.responseText;
							xml.dom = (new DOMParser()).parseFromString(res.responseText, "text/xml").wrappedJSObject;
							h_api.xml.flag = true;
							func();
						},
						onerror: function(res){
							GM_log(res.status + ':' + res.statusText);
						}
					});
				}
			});
		}
	}
	
	var heatMeter = {
		prm : {
			getflag : false,
			deleted : false,
			video_mode : '4:3',
			video_mode_arr : {'4:3' : ['16:9',370], '16:9' : ['4:3',240]},
			color : [
				'#060026', '#0f0082', '#181395', '#214dd6',
				'#3b8cd2', '#36b9d3', '#34c5a5', '#41cc27',
				'#8fd104', '#bfd70e', '#c8ab0b', '#c38509',
				'#c65706', '#c22404', '#c51b20', '#c51b20'
			],
			fontsize : [
				12, 12, 12, 12,
				12, 12, 12, 12,
				12, 12, 12, 12,
				12, 12, 12, 12
			],
			video_length : Video.length,
			titles : Array(),
			chatNum : Array(),
			seekbar_width : {
				'4:3' : {
				divwidth : 2,
				widthsep : 107
				},
				'16:9' : {
				divwidth : 3,
				widthsep : 115
				}
			},
			maxnum : 0,
			timerID : false
		},
		switchCheck : function(){
			if (GM_getValue("nicowatch_heatMeter", 1) == 1) $("#heatMeter_btn").css("color","");
			else $("#heatMeter_btn").css("color","#aaa");
		},
		switch : function(){
			if (GM_getValue("nicowatch_heatMeter", 1) == 1) {
				GM_setValue("nicowatch_heatMeter", 0);
				$("#heatMeter_btn").css("color","#aaa");
				$("#heatmeter").hide();
			}
			else {
				$("#heatMeter_btn").css("color","");
				GM_setValue("nicowatch_heatMeter", 1);
				heatMeter.act();
			}
		},
		act : function(){
			if (GM_getValue("nicowatch_heatMeter", 1) == 1) {
				if (!$("#heatmeter").get(0)) {
					var doc = document.createElement("div");
					doc.id = "heatmeter";
					var doc1 = document.createElement("div");
					doc1.id = "heatmeter_top";
					doc.appendChild(doc1);
					doc1 = document.createElement("div");
					doc1.id = "heatmeter_container";
					doc1.innerHTML = '<span style="font-size:12px;">　stanby...　　</spna><a href="javascript:void(0);" style="font-size:10px;" id="heatmeter_bootlink">動かない場合はここをクリック</a>';
					doc.appendChild(doc1);
					doc1 = document.createElement("div");
					doc1.id = "heatmeter_bottom";
					doc.appendChild(doc1);
					$('#WATCHFOOTER').prepend($(doc));
					var bootfunc = function(){
						if (!flvplayer) setTimeout(bootfunc,100);
						setTimeout(function(){ heatMeter.reload(); }, 3000);
					}
					$("#heatmeter_bootlink").click(bootfunc);
					bootfunc();
				}
				else $("#heatmeter").show();
			}
		},
		calcurate : function(force){
			var i, ii, vpos, nowTime = 0, maxnum = 0;
			var vpos_min, vpos_sec, timeSep;
			var html = '';
			var chat = h_api.xml.dom.getElementsByTagName("chat");
			var ret = h_api.xml.text.match(/vpos=\"(\w+)\"/gm);
			for (i = 0; i < ret.length; i++) {
				/vpos=\"(\w+)\"/gm.test(ret[i]);
				if (this.prm.video_length < Math.floor(RegExp.$1/100)) {
					this.prm.video_length += 10;
					break;
				}
			}
			var timeInterval = (this.prm.video_length*100) / this.prm.seekbar_width[this.prm.video_mode].widthsep;
			if (force || !heatMeter.prm.getflag) {
				for (i = 0; i < this.prm.seekbar_width[this.prm.video_mode].widthsep; i++) {
					nowTime += timeInterval;
					this.prm.chatNum[i] = 0;
					for (ii = 0; ii < chat.length; ii++) {
						vpos = chat[ii].getAttribute("vpos");
						if (nowTime - timeInterval <= vpos && vpos < nowTime) this.prm.chatNum[i]++;
					}
					if (this.prm.chatNum[i] > maxnum) maxnum = this.prm.chatNum[i];
					vpos_min = Math.floor((nowTime-timeInterval)/100/60);
					vpos_sec = Math.floor((nowTime-timeInterval)/100) - vpos_min * 60;
					if (vpos_min < 10) vpos_min = '0' + vpos_min;
					if (vpos_sec < 10) vpos_sec = '0' + vpos_sec;
					timeSep = vpos_min + "：" + vpos_sec + " 〜 ";
					vpos_min = Math.floor(nowTime/100/60);
					vpos_sec = Math.floor(nowTime/100) - vpos_min * 60;
					if (vpos_min < 10) vpos_min = '0' + vpos_min;
					if (vpos_sec < 10) vpos_sec = '0' + vpos_sec;
					timeSep += vpos_min + "：" + vpos_sec;
					this.prm.titles[i] = timeSep;
				}
				heatMeter.prm.getflag = true;
				this.prm.maxnum = maxnum;
			}
			for (i = 0; i < this.prm.seekbar_width[this.prm.video_mode].widthsep; i++) {
				html += '<div class="h_meter" num="'+i+'" style="width:' + heatMeter.prm.seekbar_width[this.prm.video_mode].divwidth + 'px;overflow:hidden;background-color:'+this.prm.color[Math.round(this.prm.chatNum[i]/this.prm.maxnum*0.15*100)]+';" title="コメント数：'+this.prm.chatNum[i]+'　　'+this.prm.titles[i]+'">&nbsp;</div>';
			}
			$('#heat_meter_body').html(html);
			$('#video_mode').html('[ <a id="video_mode_change" title="' + heatMeter.prm.video_mode_arr[heatMeter.prm.video_mode][0] + 'モードに切替" href="javascript:void(0);">' + this.prm.video_mode + '</a> ]');
			$('#video_mode_change').click(function(){
					if (heatMeter.timerID) clearInterval(heatMeter.timerID);
					$('#heat_status').html('');
					$('#heat_meter_body').css("width",heatMeter.prm.video_mode_arr[heatMeter.prm.video_mode][1]);
					heatMeter.prm.video_mode = heatMeter.prm.video_mode_arr[heatMeter.prm.video_mode][0];
					heatMeter.calcurate(true);
			});
			$('#reload_html').html('<span id="reloadbtn_html">[ <a id="reloadbtn" href="javascript:void(0);">コメントデータ更新</a> ]</span>');
			$('#reloadbtn').click(function(){
					if (heatMeter.timerID) clearInterval(heatMeter.timerID);
					$('#reloadbtn_html').html('[ コメントデータ更新中... ]');
					$('#heat_meter_body').html('Loading...');
					$('#heat_status').html('');
					h_api.comments(function(){heatMeter.calcurate(true);});
			});
			heatMeter.follow_seekber();
		},
		show : function(){
			var status_html = '';
			$('#heatmeter_container').html('<table width="100%" cellpadding="0" cellspacing="0" id="heatmeter" class="TXT12"><tr>' +
												'<td id="heat_meter_body" valign="top">' +
												'Loading...' +
												'</td>' +
												'<td id="heat_status" valign="bottom">' +
												status_html +
												'</td>' +
												'<td style="white-space: nowrap;" align="right">' +
												'<span id="video_mode"></span> ' +
												'<span id="reload_html"><span id="reloadbtn_html">[ コメントデータ更新中... ]</span></span>　' +
												'</td></tr>' +
												'</table>');
			if (!this.prm.deleted && !heatMeter.prm.getflag) {
				h_api.comments(function(){heatMeter.calcurate(true);});
			}
			else if (!this.prm.deleted) {
				this.calcurate(false);
			}
			else {
				$('#heat_meter_body').html('Sorry, this video has been deleted.');
			}
		},
		reload : function(){
			if (Video.isDeleted) {
				heatMeter.prm.deleted = true;
			}
			heatMeter.show();
		},
		follow_seekber : function(){
			this.timerID = setInterval(function(){
				var seekbarWidth = heatMeter.prm.seekbar_width[heatMeter.prm.video_mode].widthsep * heatMeter.prm.seekbar_width[heatMeter.prm.video_mode].divwidth;
				var move_time = flvplayer.ext_getPlayheadTime();
				var nowposition = move_time * seekbarWidth / heatMeter.prm.video_length;
//				console.debug( move_time + " : " + nowposition);
				var temp = 0;
				for (var i = 0; i < heatMeter.prm.seekbar_width[heatMeter.prm.video_mode].widthsep; i++) {
					if ((i*heatMeter.prm.seekbar_width[heatMeter.prm.video_mode].divwidth) <= nowposition && nowposition < ((i+1)*heatMeter.prm.seekbar_width[heatMeter.prm.video_mode].divwidth)) {
						temp = Math.round(heatMeter.prm.chatNum[i]/heatMeter.prm.maxnum*0.15*100);
						$('#heat_status').html(heatMeter.prm.titles[i] +
													'　　コメント数 ： ' +
													'<span style="font-weight:bold;color:' + 
													heatMeter.prm.color[temp] +
													';font-size:' +
													heatMeter.prm.fontsize[temp] +
													'px;" >' +
													heatMeter.prm.chatNum[i] +
													'</span>');
						break;
					}
				}
				if (nowposition > seekbarWidth) nowposition = seekbarWidth;
				$('#heat_meter_body').css("background-position", (70+nowposition)+"px 18px");
			}, 200);
		}
	};
	GM_addStyle(
	"#heatmeter {" +
"		width: 976px;" +
"		margin: 0 auto;" +
"	}" +
"	#heatmeter td{" +
"		font-size:12px;" +
"	}" +
"	#heatmeter_top{" +
"		height: 1px;" +
"		width: 974px;" +
"		margin: 0 auto;" +
"		background-color: #666666;" +
"	}" +
"	#heatmeter_container{" +
"		width: 974px;" +
"		padding:4px 0 2px 0;" +
"		background-color: #f0f0f0;" +
"		border-left: 1px #666666 solid;" +
"		border-right: 1px #666666 solid;" +
"		min-height: 24px;" +
"	}" +
"	#heat_meter{" +
"		margin: 0 10px;" +
"	}" +
"	#heatmeter_container div.h_meter{" +
"		white-space: nowrap;" +
"		overflow: hidden;" +
"		padding: 0;" +
"		margin: 0;" +
"		width: 2px;" +
"		height: 16px;" +
"		float: left;" +
"	}" +
"	#heatmeter_container #heat_meter_body{" +
"		height: 23px;" +
"		width: 240px;" +
"		padding-left:73px;" +
"		font-size:12px;" +
"		background: url('data:image/gif;base64,R0lGODlhBwAFAIEAAICAgMDAwP%2F%2F%2F%2F%2F%2F%2FyH5BAEAAAMALAAAAAAHAAUAAAgZAAcIEBBAwACBBAMUHKiwYcKGCgFInAggIAA7') no-repeat 77px 18px;" +
"	}" +
"	#heatmeter_container #heat_status{" +
"		padding-bottom: 3px;" +
"	}" +
"	#heatmeter_container td{" +
"		white-space: nowrap;" +
"		padding: 0;" +
"		margin: 0;" +
"	}" +
"	#heatmeter_bottom{" +
"		height: 1px;" +
"		width: 974px;" +
"		margin: 0 auto;" +
"		background-color: #666666;" +
"	}");
	
	tools.show();
})();