// ==UserScript==
// @name			Pixiv translation
// @description		Partly translated Pixiv pages
// @namespace		http://userscripts.org/users/33432
// @include			http://www.pixiv.net/*
// @include			http://pixiv.net/*
// ==/UserScript==

var translations={
	// General
	追加する:				"Submit",


	// Top menu
	"ポイント残高：":		"Points:",
	ヘルプ:				"Help",
	ユーザー検索:			"Search users",
	ログアウト:				"Log out",

	ホーム:				"Home",
	イラストの投稿: 		"Upload picture",
	作品の投稿:			"Upload picture",
	イラストの管理: 		"My pictures",
	作品の管理:			"My pictures",
	ブックマーク管理:		"Favorites",
	メッセージ:				"Messages",
	設定変更:			"Edit profile",
	pixivについて:			"About",
	開発者ブログ:			"Developers Blog",
	
	// Register page
	メールアドレスを入力:		"Enter E-Mail",
	仮登録メール送信:		"Confirm E-Mail",
	登録情報の入力:		"Enter Personal Information",
	"登録完了（ログイン）":	"Done!",
	
	"pixiv ID 新規登録":	"Pixiv registration",
	
	"pixiv ID を既にお持ちの場合は、":	"If you already have pixiv account, ",
	こちらからログイン:		"you can login here",
	"できます。":			".",
	
	下記フォームに:			"Please ",
	あなたのメールアドレスを入力:	"enter your email address",
	"してください。":		" into the form below.",
	
	"入力を完了するとpixiv事務局より、仮登録メールが送信されます。":
						"Confirmation message will be sent to your email address.",
	
	"仮登録メールに記載されているURLより登録情報（pixiv ID,パスワードなど）を設定すると登録完了です。":
						"Information in the confirmation message is needed to complete registraction",
	
	"ご入力いただいたメールアドレスは他の利用者には一切公開されません。":
						"Your email will never be published to other users",
	
	"メールアドレス：":		"E-Mail address:",
	
	"登録確認画面へ":		"Confirm",
	
	// Random page
	人気のタグ:			"Tags",
	ランダム:				"Random",
	"検　索":			"Search",
	タグ:					"Tags",
	"タイトル・キャプション":	"Titles",
	ウェブ:				"Web",
	ランダムピックアップ:		"Random selection",
	ランダムで選んだタグに飛ぶ:
						"Random tag",
	再検索:				"New random selection",
	
	// Front page
	プロフィール確認:		"Profile",
	みんなの新着イラスト:	"New pictures",
	お気に入りユーザー新着イラスト: "Pictures by users added to favorites",
	デイリーランキング:		"Daily ranking",
	マンスリーランキング:		"Monthly ranking",
	新規登録:			"Sign up",
	パスワード:			"Password",
	次回から自動的にログイン:	" Remember me",
	"※pixiv ID・パスワードを忘れた":	"※ I forgot my pixiv ID/password",
	注目のタグ:			"Tags",
	人気のタグ:			"Popular tags",
	pixivに招待する:		"Invite to Pixiv",
	ポイント通帳を見る:		"Point passbook",
	pixivプレミアムとは:		"Pixiv Premium",
	注目キーワード:		"Popular tags: ",
	
	// Invite page
	友人をpixivに招待する:	"Invite your friend to Pixiv",
	"新たにpixivに招待したい友人・知人のメールアドレスを記入してください。":
						"Please enter E-Mail address of a friend you want to invite.",
	相手のメールアドレス:	"Your friend's E-Mail address",
	あなたのお名前:		"Your name",
	
	// Misc
	このページの上部へ:		"Top",
	トップ:				"Top",
	"[[D]]年[[D]]月[[D]]日 [[D]]:[[D]]":	"[[D]]-[[D]]-[[D]] [[D]]:[[D]]",
	
	// Bottom menu
	お知らせ:				"Info",
	利用規約:			"TOS",
	ガイドライン:			"Guide",
	プライバシーポリシー:		"Privacy statement",
	広告掲載:			"Contact us",
	お問い合わせ:			"Support",
	ピクシブ通信:			"Pixiv News",
	pixivブログ:			"Pixiv Blog",
	pixivフェスタ:			"Pixiv Fiesta",
	pixivマーケット:		"Pixiv Shop",
	pixiv開発者ブログ:		"Developers Blog",
	運営会社:			"Pixiv Company",
	人材募集:			"Recruiting",

	// User page
	イラストを見る:			"Pictures", // seems to be unused
	作品を見る:			"Pictures",
	ブックマークを見る:		"Favorites",
	メッセージを送る:		"Send message",
	お気に入りに追加:		"Add to favorites",
	マイピクに追加:			"Add to friends",
	プロフィールを見る:		"Profile",
	掲示板を見る:			"BBS",
	マイピク:				"Friends",
	お気に入りユーザー:		"Favorite users",
	一覧を見る:			"See all",
	パーソナルタグ:			"Personal tags",
	"投稿者：":			"User: ",
	このユーザーが投稿したイラスト:
						"Pictures posted by this user",
	このユーザーがブックマークしたイラスト:
						"Pictures favored by this user",
	"[PR]注目の情報":		"News",
	投稿したイラスト:		"New uploads",
	"投稿数: [[D]]枚":	"Total uploads: [[D]]",
	"投稿数：[[D]]件":	"Total: [[D]]",
	もっと見る:			"See more",
	ブックマーク:			"Bookmarks",
	"登録数: [[D]]枚":	"Total: [[D]]",
	イメージレスポンス:		"Picture replies",
	プロフィール:			"Profile",
	新しい順:				"New first",
	古い順:				"Old first",
	
	全体に公開:			"Public",
	公開:				"Public",
	マイピクに公開:			"Friends only",
	非公開:				"Private",
	"公開設定：":			"Publicity: ",
	
	"お気に入りに以下のユーザーを追加しますか？":
						"Add this user to favorties?",
	"さんをお気に入りに追加しました。":
						" was added to favorites.",
	"さんは既にお気に入りに追加済みです。":
						" is already added to your favorites.",
	
	
	ニックネーム:			"Alias",
	"[[D]]文字以内":		"[[D]] letters max.",
	HPアドレス:			"Home page",
	性別:				"Sex",
	男:					"Male",
	女:					"Female",
	住所:				"City",
	生まれた年:			"Birth year",
	年:					" year",
	血液型:				"Blood Type",
	A型:				"A",
	B型:				"B",
	O型:				"O",
	AB型:				"AB",
	年齢:				"Age",
	誕生日:				"Birthday",
	職業:				"Occupation",
	自己紹介:			"About self",
	作業環境:			"Employment",
	作業環境画像:		"Employment picture",
	コンピュータ:			"Computer",
	モニタ:				"Monitor",
	ソフト:				"Software",
	スキャナー:			"Scanner",
	マウス:				"Mouse",
	机の上にあるもの:		"Stuff on desktop",
	椅子:				"Chair",
	

	// Pictures list
	"次の[[D]]件>>":		"Next [[D]] >>",
	"<<前の[[D]]件":		"<< Prev [[D]]",
	イラストタグ:			"Tags",
	
	// Picture page
	登録タグ:				"Tags",
	このイラストをブックマークする:	"Add to favorites",
	タグ編集:				"Edit tags",
	"コメント：":			"Comment:",
	"送　信":			"Submit",
	コメント履歴表示:		"Show comments",
	コメント履歴を閉じる:		"Hide comments",
	この作品に対する情報提供:	"Report this picture",
	"閲覧数：[[D]]　評価回数：[[D]]　総合点：[[D]]":	"Views: [[D]] Votes: [[D]] Total points: [[D]]",
	Twitterで紹介する:	"Post to twitter",
//	:		"",



//	:				"",


	// Random tags
	東方:				"Touhou ",
	オリジナル:			"Original ",
	女の子:				"Girl ",
	版権:				"Copyright ",
	落書き:				"Oekaki ",
	ヘタリア:				"Hetaria ",
	初音ミク:				"Hatsune Miku ",
	らくがき:				"Scribble ",
	おっぱい:				"Breasts ",
	漫画:				"Manga ",
	アイドルマスター:		"Idolmaster ",
	ケモノ:				"Beast ",
	魔理沙:				"Marisa ",
	ドット絵:				"Pixel artwork ",
	少女:				"Maiden ",
	モノクロ:				"B/W ",
	ガンダム:				"Gundam ",
	霊夢:				"Reimu ",
//	描いてもいいのよ:		"You shouldn't draw more ", // (not sure at all)
	練習:				"Practice ",
	ロリ:					"Loli ",
	ファンタジー:			"Fantasy ",
	模写:				"Trace ",
	男の子:				"Boy ",
	アリス:				"Alice ",
	ショタ:				"Shota ",
	眼鏡:				"Glasses ",
	ラクガキ:				"Scribble ",
	"4コマ":				"4-koma ",
	レミリア:				"Remilia ",
	オリキャラ:				"Original Character ",
	線画:				"Line Drawing ",
	"けいおん!":			"K-On! ",
	猫:					"Cat ",
	制服:				"Uniform ",
//	塗ってもいいのよ:		"You should draw more ", // (not sure at all)
	メカ:					"Mecha ",
	水着:				"Swimsuit ",
	百合:				"Yuri ",
	セーラー服:			"Sailor Suit",
	ボーカロイド:			"Vocaloid ",
	動物:				"Animal ",
	
	下書き:				"Sketch ",
	
	
	選択してください:		"Please choose one",

};

function defined(v){
	return v!=undefined;
}

function translate(text){
	var numbers=[];
	var no;
	
	if(!defined(text) || !text.match) return undefined;
	
	text=text.replace(/^\s*/,"").replace(/\s*$/,"");

	if(text=="") return undefined;

	while(defined(no=text.match(/\d+/)))
		numbers.push(no[0]),text=text.replace(/\d+/,"[[D]]");

	var translation=translations[text];
	
	if(defined(translation)){
		while(numbers.length)
			translation=translation.replace(/\[\[D\]\]/,numbers.shift());
	}
	
	return translation;
}

function translateTree(a){
	var items=document.evaluate("descendant::*",a,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for(var i=0;i<items.snapshotLength;i++){
		var e=items.snapshotItem(i);
		
		for(var j=0;j<e.childNodes.length;j++){
			var elem=e.childNodes[j];
			if(elem.nodeType==3){
				var text=translate(elem.wholeText);
				if(defined(text)) elem.replaceWholeText(text);
			} else{
				var text=translate(elem.value);
				if(defined(text)) elem.value=text;
			}
		}
	}
}

GM_addStyle('body{font-family: meiryo,mona}');
GM_addStyle('.ads_value{display: none}');

document.body.addEventListener("DOMNodeInserted",function(a){translateTree(a.relatedNode);},false);

translateTree(document);
