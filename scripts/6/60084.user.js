// ==UserScript==
// @name           gmail_and_blog_de_japaneseproofreader
// @namespace      http://d.hatena.ne.jp/Koonies/
// @description    GMailやブログなどいろんな所の編集のページに「校正する」ボタンを追加します
// @include        http*://mail.google.com/mail/h/*
// @include        http://d.hatena.ne.jp/*/edit*
// @include        http://blog*.fc2.com/control.php?mode=editor&process=*
// @include        http://blogs.yahoo.co.jp/*/MYBLOG/write.html*
// @include        http://blog.seesaa.jp/pages/my/blog/article/*/input*
// @include        http://livedoor.blogcms.jp/blog/*/article/edit*
// @include        http://mixi.jp/edit_diary.pl?*
// @include        http://mixi.jp/add_diary.pl?*
// @include        http://nanapi.jp/*
// @include        http://amigo.mail.goo.ne.jp/goomail/index.ghtml?view=mail_creation*
// @include        http://anond.hatelabo.jp/Koonies/edit*
// @include        http://h.hatena.ne.jp/*
// @include        http://q.hatena.ne.jp/*
// @version        1.1
// ==/UserScript==

// 
// ■対応サイト
// 
// はてなダイアリー（http://d.hatena.ne.jp/）
// 人力検索（http://q.hatena.ne.jp/）
// はてなハイク（http://h.hatena.ne.jp/）
// はてな匿名ダイアリー（http://anond.hatelabo.jp/）
//
// FC2ブログ（http://blog.fc2.com/）
// Yahoo!ブログ（http://blogs.yahoo.co.jp/）
// Seesaa（http://blog.seesaa.jp/）
// livedoorブログ（http://blog.livedoor.com/）
// mixi（http://mixi.jp/）
// nanapi（http://nanapi.jp/）
// 
// gooメール（http://mail.goo.ne.jp/goomail/index.ghtml）
// GMail（https://mail.google.com/mail/h/）
// 
// 
// ■簡単な説明
// 
// [校正する]ボタンを押すと新しい画面で日本語文章校正ツール(http://www.japaneseproofreader.com/)を開きます
// ブログ校正用ブックマークレット(http://www.japaneseproofreader.com/sendblog.html)がベースです
// 
// ポップアップがブロックされないよう設定してからご使用ください。
// また本スクリプト使用の結果、いかなるトラブルが起きても、当方では一切の責任を負いませんのでご了承ください。
// 
// 
// ■その他
// 
// GMail：簡易HTMLモードでのみ有効になります。（簡易HTMLモードは→https://mail.google.com/mail/h/）
// livedoorブログ：一度「プレビューボタン」を押してから「校正する」を押してください。
// 

(function(){
	var arr = [
		{
			"url"     : 'mail\.google\.com',
			"title"   : '//input[@name="subject" and @class="i"]',
			"body1"   : '//textarea[@name="body" and @class="mi"]',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//input[@type="submit" and @name="nvp_bu_send"]'
		},
		{
			"url"     : 'd\.hatena\.ne\.jp',
			"title"   : '//input[@name="title"]',
			"body1"   : '//textarea[@id="textarea-edit"]',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//input[@type="submit" and @name="preview"]'
		},
		{
			"url"     : 'blog.+\.fc2\.com',
			"title"   : '//input[@id="entry_title"]',
			"body1"   : '//textarea[@id="body"]',
			"body2"   : '//textarea[@id="extend"]',
			"body3"   : '',
			"preview" : '//input[@type="submit"]'
		},
		{
			"url"     : 'blogs\.yahoo\.co\.jp',
			"title"   : '//input[@name="title" and @class="frm_txt"]',
			"body1"   : '//textarea[@name="content" and @class="frm_textarea"]',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//a[@href="javascript:submitAll(1)"]'
		},
		{
			"url"     : 'blog\.seesaa\.jp',
			"title"   : '//textarea[@name="article__subject"]',
			"body1"   : '//textarea[@id="article__body"]',
			"body2"   : '//textarea[@id="article__body_more"]',
			"body3"   : '',
			"preview" : '//input[@type="submit" and @name="confirm"]'
		},
		{
			"url"     : 'livedoor\.blogcms\.jp',
			"title"   : '//input[@id="entryTitle"]',
			"body1"   : '//textarea[@id="inputBody"]',
			"body2"   : '//textarea[@id="inputBodyMore"]',
			"body3"   : '//textarea[@id="inputBodyPrivate"]',
			"preview" : '//input[@id="previewButton"]'
		},
		{
			"url"     : 'mixi\.jp',
			"title"   : '//input[@name="diary_title" and @class="editareaWidth"]',
			"body1"   : '//textarea[@id="diaryBody"]',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//input[@type="submit" and @class="formBt01"]'
		},
		{
			"url"     : 'nanapi\.jp',
			"title"   : '//input[@id="recipe-title"]',
			"body1"   : '//textarea[@id="recipe-content"]',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//button[@type="submit" and @name="preview"]'
		},
		{
			"url"     : 'anond\.hatelabo\.jp',
			"title"   : '//input[@id="text-title"]',
			"body1"   : '//textarea[@id="text-body"]',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//input[@name="preview" and @type="submit"]'
		},
		{
			"url"     : 'h\.hatena\.ne\.jp',
			"title"   : '',
			"body1"   : '//textarea[@name="body" and @class="entry-body"]',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//input[@class="submit" and @type="submit"]'
		},
		{
			"url"     : 'q\.hatena\.ne\.jp',
			"title"   : '',
			"body1"   : '//textarea[@id="textarea-edit" or @name="content"]',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//input[@style="margin:5px 5px 10px 10px;vertical-align:middle;"'
			                    +' or @name="enter_question"]'
		},
		{
			"url"     : 'amigo\.mail\.goo\.ne\.jp',
			"title"   : '//input[@name="mailsbj"]',
			"body1"   : '//textarea[@name="mailbdy"]',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//a[@href="javascript:sendMail()"]'
		}
/*
		{
			"url"     : '',
			"title"   : '',
			"body1"   : '//',
			"body2"   : '',
			"body3"   : '',
			"preview" : '//'
		},
*/
	];
	
	var DEBUG_MODE=0;
	var xpath;
	var cnt=0;
	var i=arr.length;
	
	while((i--) && (!location.host.match(arr[i]["url"])));
	
	if (i<0) {
		if (DEBUG_MODE) console.log("アドレスのマッチングに失敗しました：" + location.host);
		return;
	}
	
	xpath = arr[i];
	
	/*document.addEventListener*/ 
	window.addEventListener(
		'load',
		function() {
			cnt++;
			if (cnt>1) return;
			
			var kakunin= document.evaluate(xpath["preview"],document,null,7,null).snapshotItem(0);
			
			if (DEBUG_MODE) {
				//alert("stop");
				console.log( xpath["url"]);
				if (xpath["title"  ]!='') console.log( "title:"   + document.evaluate(xpath["title"  ],document,null,7,null).snapshotLength );
				if (xpath["body1"  ]!='') console.log( "body1:"   + document.evaluate(xpath["body1"  ],document,null,7,null).snapshotLength );
				if (xpath["body2"  ]!='') console.log( "body2:"   + document.evaluate(xpath["body1"  ],document,null,7,null).snapshotLength );
				if (xpath["body3"  ]!='') console.log( "body2:"   + document.evaluate(xpath["body1"  ],document,null,7,null).snapshotLength );
				if (xpath["preview"]!='') console.log( "preview:" + document.evaluate(xpath["preview"],document,null,7,null).snapshotLength );
			}
			
			if (kakunin) {
				var kousei = document.createElement("input");
				kousei.type = "button";
				kousei.value = '\u6821\u6b63\u3059\u308b'; /* 校正する */
				
				kousei.addEventListener(
					'click',
					function() {
						var sendText = "TcheckON";
						if (xpath["title"]!='') {
							sendText += document.evaluate(xpath["title"],document,null,7,null).snapshotItem(0).value;
						}
						sendText += '\n\n' +
						            document.evaluate(xpath["body1"],document,null,7,null).snapshotItem(0).value;
						
						if (xpath["body2"]!='') {
							sendText = sendText +
							           '\n\n' +
							           document.evaluate(xpath["body2"],document,null,7,null).snapshotItem(0).value;
							
							if (xpath["body3"]!='') {
								sendText = sendText +
								           '\n\n' +
								           document.evaluate(xpath["body3"],document,null,7,null).snapshotItem(0).value;
							}
						}
						
						window.open('http://www.japaneseproofreader.com/',
						            sendText,
						            'resizable=yes,status=no,menubar=no,toolbar=no,location=no,scrollbars=yes');
					},
					true
				);
				
				kakunin.parentNode.insertBefore(kousei, kakunin.nextSibling);
				//kakunin.parentNode.insertBefore(kousei, kakunin);
			}
		},
		true
	);
})();
