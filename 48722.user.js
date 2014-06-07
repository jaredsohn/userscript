// ==UserScript==
// @name           fixedBottomHBFooter
// @author         rikuo
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://b.hatena.ne.jp/*
// @exclude        http://b.hatena.ne.jp/articles
// @exclude        http://b.hatena.ne.jp/articles/*
// ==/UserScript==

//cf. http://d.hatena.ne.jp/so_blue/20090218/1234969578

(function(){
	var _doc = document;
	var footer = _doc.getElementById('footer');

	if(footer){
		//伸縮ボタン作成とstyle設定
		footer.className = 'footer_close';
		footer.addEventListener('click', function(e) {
			if(e.target.tagName == 'A')return;
			if(this.className == 'footer_close'){
				this.className = 'footer_open';
			}else{
				this.className = 'footer_close';
			}
		}, false);
		
		GM_addStyle(<><![CDATA[
			#footer{
				position: fixed;
				left: auto;
				bottom: 0;
				z-index: 100;
				border-top-width: 3px;
				/* 半透明化する場合 */
				/* opacity: 0.8; */
			}
			.footer_open{
				height: auto !important;
			}
			.footer_close{
				height: 2.5em !important;
			}
			#footer div.line-inner ul li.title a.favicon{
				margin-left: 15px;
			}
			#footer div.line-inner ul li.title a.entry_url{
				margin: auto 3px;
				font-weight: normal;
				text-decoration: underline;
			}
			#footer div.line-inner ul li.title a.entry_url:link{
				color: #0000DD;
			}
			#footer div.line-inner ul li.title a.entry_url:visited{
				color: #883388;
			}
		]]></>);

		// ブックマークのコメント欄があれば
		var bmuser = _doc.getElementById('bookmarked_user');
		if(!bmuser)return;

		// 各種要素を取得
		var link = xpath(_doc, 'id("main")/descendant::h2[@class="entrytitle"]/a'),
		users = xpath(_doc, 'id("entry-info")/li[@class="users"]/*[1]').snapshotItem(0),
		li = xpath(footer, 'descendant::div[@class="line4-1"]/div/ul/li[@class="title"]').snapshotItem(0),
		hatebu = xpath(li, 'a/text()').snapshotItem(0),
		df = _doc.createDocumentFragment();

		// 「はてなブックマーク」を「はてブ」に
		var parent = hatebu.parentNode;
		parent.replaceChild(_doc.createTextNode(' はてブ'), hatebu);

		// faviconとリンクを複製して作成
		var favicon = link.snapshotItem(0).cloneNode(true),
		entry = link.snapshotItem(1).cloneNode(true);
		entry.className= 'entry_url';
		if(entry.textContent.length > 8){
			entry.title = entry.textContent;
			entry.textContent = entry.textContent.substring(0,8) + '...';
		}
		df.appendChild(favicon);
		df.appendChild(entry);
		var users_clone = users.cloneNode(true);
		df.appendChild(users_clone);
		li.appendChild(df);
	}

	function c(tag_name) {
		return _doc.createElement(tag_name);
	}
	function xpath(context, query){
		return _doc.evaluate(
		query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		)
	}


})();
