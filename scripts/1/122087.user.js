// ==UserScript==
// @name           Stack Exchange Japanese Localization
// @description    An (unofficial) attempt of localizing Stack Exchange sites into Japanese, with a focus on the Japanese Language and Usage site. 
// @include        http://stackoverflow.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://meta.superuser.com/*
// @include        http://serverfault.com/*
// @include        http://meta.serverfault.com/*
// @include        http://askubuntu.com/*
// @include        http://meta.askubuntu.com/*
// @include        http://*.stackexchange.com/*
// @include        http://stackapps.com/*
// @exclude        http://area51.stackexchange.com/*
// @exclude        http://*.area51.stackexchange.com/*
// ==/UserScript==

function runJQueryScript(f) {
    if (unsafeWindow.$) {
        // Firefox et al which support unsafeWindow
        $ = unsafeWindow.$
        f()
    }
    else {
        // Other browsers like Google Chrome don't support unsafeWindow, 
        // so use the method at http://stackoverflow.com/questions/2246901/
      
	// Inject our main script
	var script = document.createElement('script')
	script.type = "text/javascript"
	script.textContent = '(' + f.toString() + ')();'
	document.body.appendChild(script)
    }
}

runJQueryScript(function() { // scope everything...

function getObject(a) {
    /* 
     * Converts [['a', 'b'], ...] -> {'a': 'b', ...}
     *
     * This is so that very long keys can span multiple lines
     */
    var o = {}
    for (var i=0; i<arguments.length; i++) {
        var x = arguments[i]
        o[x[0]] = x[1]
    }
    return o
}

function wsProcess(s) {
    // Trim whitespace from the start+end 
    // and remove consecutive whitespace chars
    return $.trim(s).replace(/\s+/gm, ' ')
}

function getText(elm) {
    // Return the text inside of `elm` trimmed
    return wsProcess($(elm).text()||'')
}

function log(txt) {
    console.log(txt)
}

function escapeText(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

if (!window.TEXT_NODE) {
    var TEXT_NODE = 3
}

var strings = {
    'title: span.mod-flair': {
        'moderator': 'モデレータ'
    },
    
    //=======================================================//
    //                      Topmost Bar                      //
    //=======================================================//
    
    // Stack Exchange dropdown
    'text: a#seTabHot': {
        'Hot Questions': 'ホットな質問'
    },
    'text: a#seTabSites': {
        'All Sites': 'すべてのサイト'
    },
    'text: a#seTabInbox': {
        'Inbox': '受信箱'
    },
    'text: a#seTabNotices': {
        'Notifications': 'お知らせ'
    },
    'text: div#seTabEmail a': {
        'email settings': 'メール設定'
    },
    'text: a#seClose': {
        'close': '閉じる'
    },
    'html: div#seWrapper div.seIntro': {
        'Stack Exchange is a network of free, community-driven Q&A sites.': 
        '{a|Stack Exchange|Stack Exchange}はみんなでつくる無料Q&Aサイトのネットワークです'
    },
    'text: div#seContainerInbox div.itemBox div.siteInfo p': {
        'chat message on': 'チャット: ',
        'comment on': 'コメント: ',
        'answer on': '回答: '
    },
    // e-mail settings
    'text: div#seContainerEmail div.itemBox p': {
        'Would you like to receive unread inbox messages via email?':
        '受信箱の未読メッセージをメールで受け取りますか？'
    },
    'text: div#seContainerEmail div.itemBox div': {
        'Email:': 'メールアドレス：'
    },
    'text: div#seContainerEmail div.itemBox div label': {
        'Email me my unread inbox messages': '受信箱の未読メッセージを送る',
        'Do not email me inbox messages': '受信箱のメッセージを送らない'
    },
    'value: input#email-save': {
        'Save': '保存'
    },
    'html: select#email-freq option': {
        'every 3 hours': '3時間おきに',
        'daily': '毎日',
        'weekly': '毎週'
    },
    
    // "My dropdown"
    'text: ul.profile-links li a': {
        'activity': 'アクティビティー',
        'privileges': '権限',
        'log out': 'ログアウト',
    },
    'text: table.profile-recent-summary thead tr th': {
        'today': '今日',
        'week': '今週',
        'month': '今月'
    },
    'text: table.profile-recent-summary tbody tr td a': {
        'reputation': '信用度',
        'votes cast': '投票総数',
        'revisions': '改訂履歴',
        'favorites': 'お気に入り'
    },
    'text: div.profile-footer a': {
        'close': '閉じる'
    },
    
    // Top bar
    'text: div#hlinks span a': {
        'log in': 'ログイン',
        'review': 'レビュー',
        'tools': 'ツール',
        'chat': 'チャット',
        'blog': 'ブログ',
        'meta': 'メタ',
        'main': 'メインサイト',
        'about': '概要',
        'faq': 'よくある質問',
        'careers': 'キャリア2.0'
    },
    
    //=======================================================//
    //                  Bar 2nd From the Top                 //
    //=======================================================//
    
    'text: span.beta-title': {
        'beta': 'ベータ'
    },
    
    'text: span.meta-title': {
        'meta': 'メタ'
    },
    
    // Top subheader
    'text: div.subheader h1, div.subheader h1 a': {
        'Top Questions': 'トップページ', // 'First page' of paginated pages. http://meta.stackoverflow.com/a/90303/157841
        'All Questions': 'すべての質問',
        'Tags': 'タグ',
        'Users': 'ユーザー',
        'Badges': 'バッジ',
        'Unanswered Questions': '回答のない質問',
        'Tag info': 'タグ情報',
        'Tagged Questions': 'タグ付きの質問',
        'Votes Cast': '投票総数', // .user-full-tab-header
        'Search Results': '検索結果',
        'Favorites': 'お気に入り',
        'Favorite': 'お気に入り',
        'Tools': 'ツール',
        'Review': 'レビュー'
    },
    
    // Top navigation
    'text: div.nav ul li a': {
        'Questions': '質問',
        'Tags': 'タグ',
        'Users': 'ユーザー',
        'Badges': 'バッジ',
        'Unanswered': '未回答',
        'Ask Question': '質問する'
    },
    
    //=======================================================//
    //                          Tabs                         //
    //=======================================================//
    
    // Tabs
    'text: div#tabs a': {
        'interesting': 'おすすめ順',
        'featured': '賞金付きの質問',
        'active': '更新順',
        'hot': 'ホット',
        'week': '週間',
        'month': '月間',
        'oldest': '古い順',
        'votes': '投票順',
        'newest': '新着',
        'faq': 'よくある質問',
        'unanswered': '未回答',

        // Tags
        'popular': '人気順',
        'name': '名前順',
        'new': '最新順',
        
        // Meta stack overflow
        'bugs': 'バグ',
        'reqs': '機能要望',
        // Stackapps
        'apps': 'アプリ',
        'scripts': 'スクリプト',
        
        // Users
        'new users': '登録順',
        'voters': '投票数順', // CHECK ME!
        'editors': '編集数順',
        'general': '基本のバッジ',
        'tags': 'タグバッジ',
        'my tags': 'マイタグ', // ???
        'no answers': '未回答',
        
        // User page tabs
        'summary': 'サマリ',
        'answers': '回答',
        'questions': '質問',
        'badges': 'バッジ',
        'favorites': 'お気に入り',
        'bounties': '賞金',
        'activity': 'アクティビティー',
        'accounts': 'アカウント',
        'responses': '返信',
        
        // Tag tabs
        'info': '情報',
        
        // Search tab
        'relevance': '関連順',
        
        // Moderator tools
        'stats': 'トップ',
        'migrated': '移動した質問',
        'close': '閉じ票',
        'delete': '削除票',
        'flags': '通報'
    },
    
    'title: div#tabs a': {
        // Top page
        'questions that may be of interest to you based on your history and tag preferences':
        'あなたの活動履歴やタグ設定から算出したおすすめの質問',
        'questions that have been asked, answered, or updated recently':
        '最近投稿された・回答のあった・更新のあった質問',
        'questions with the most views, answers, and votes over the last few days':
        'ここ数日で最も閲覧数や回答数、投票数の多い質問',
        'questions with the most views, answers, and votes this week':
        '今週の最も閲覧数や回答数、投票数の多い質問',
        'questions with the most views, answers, and votes this month':
        '今月の最も閲覧数や回答数、投票数の多い質問',
        'questions with an active bounty':
        'アクティブな賞金付きの質問',
        // Meta stack overflow
        "questions tagged 'bug' with the most votes":
        '「バグ」タグ付きの質問（投票順）',
        "questions tagged 'feature-request' with the most votes":
        '「機能要望」タグ付きの質問（投票順）',
        // Stack apps
        "hot questions tagged 'app' or 'library'":
        '「アプリ」や「ライブラリー」タグ付きのホットな質問',
        "questions tagged 'script' with the most votes":
        '「スクリプト」タグ付きの質問（投票順）',
        
        // Question Pages
        'Answers with the latest activity first':
        '更新のあった順に回答を表示',
        'Answers in the order they were provided':
        '投稿順に回答を表示',
        'Answers with the highest score first':
        '投票総数順に回答を表示',
        
        // Questions
        'the most recently asked questions':
        '新着質問',
        'questions with the most links':
        '最もリンク数の多い質問',
        'questions with the most votes':
        '最も投票総数の多い質問',
        'questions that have recent activity':
        '最新更新のあった質問',
        'questions that have no upvoted answers':
        '上げ票がついた回答のない質問',
        
        // Tags
        'most popular tags':
        '最も人気のあるタグ',
        'tags in alphabetical order':
        'アルファベット順にタグを表示する',
        'recently created tags':
        '最近作られたタグ',
        
        // A Tag?
        
        // Users
        'Users with the highest reputation scores':
        '最も信用度の高いユーザー',
        'Users who joined in the last 40 days':
        '過去40日間に登録したユーザー',
        'Users who voted more than 10 times':
        '10回以上投票したユーザー',
        'Users who edited more than 5 posts':
        '5回以上投稿を編集したユーザー',
        
        // User Profiles
        'your overall summary':
        '活動状況',
        'answers you have provided':
        '投稿した回答',
        'questions you have asked':
        '投稿した質問',
        'tags you have posts in':
        '投稿したことのあるタグ',
        'badges you have earned':
        '獲得したバッジ',
        'questions you have favorited':
        'お気に入りの質問',
        'bounties you have participated in':
        '参加した賞金',
        'reputation you have earned':
        '獲得した信用度',
        'your recent responses':
        'あなたへの最近の返信',
        'your recent activity':
        '最近の活動',
        'your accounts in the Stack Exchange network':
        'あなたのStack Exchangeネットワークのアカウント',
        
        // Badges
        'standard badges':
        '基本のバッジ',
        'tag-based badges':
        'タグバッジ',
        
        // Unanswered
        'questions with tags that I\'ve participated':
        '投稿したことがあるタグの付いた質問',
        'newest unanswered questions':
        '最新の未回答質問',
        'highest voted unanswered questions':
        '最も投票総数が高い未回答質問',
        'questions with no answers':
        '未回答質問'
    },

    'text: div.user-tabs-nav div#tabs a': {
        // user-page specific
        // "reputation" -> "reputation" (plain)
        'reputation': '信用度' // CHECK ME!
    },
    'text: div:not(.user-tabs-nav) div#tabs a': {
        // "all questions"/"users" etc 
        // "reputation" -> "sorted by reputation"
        'reputation': '信用度順'
    },
    
    'text: div#tabs-interval a': {
        'week': '一週間',
        'month': '一ヶ月',
        'quarter': '三ヶ月',
        'year': '一年間',
        'all': 'すべて'
    },
    'text: div#tabs-type a': {
        'all': 'すべて',
        'gold': '金バッジ',
        'silver': '銀バッジ',
        'bronze': '銅バッジ'
    },
    
    // I've disabled these tabs for now as I can't find a safe way of doing them
    // as they rely on the text underneath when clicked on :/
    
    // div.user-panel-subtabs a
    
    'clicktext: div.subtabs a': {
        'votes': '票数',
        'activity': 'アクティビティー',
        'newest': '最新順',
        'recent': '更新順',
        'class': '色順', // By gold, silver, bronze
        'name': '名前順',
        'active': 'アクティブ',
        'offered': '提供した',
        'earned': '獲得した',
        
        // Favorites tab
        'views': '閲覧数',
        'added': '追加順',
        
        // Reputation tab
        'post': '投稿',
        'time': '時間',
        'graph': 'グラフ',
        
        // Responses tab
        'all': 'すべて',
        'revisions': '修正',
        'comments': 'コメント',
        'answers': '回答',
        
        // Activity tab
        'accepts': '回答を採用',
        'posts': '投稿',
        'badges': 'バッジ',
        'reviews': 'レビュー',
        'suggestions': '修正案'
    },
    
    //=======================================================//
    //                  Controls on the Right                //
    //=======================================================//
    
    // Right Controls ("tag subscriptions" etc)
    'text: p.ar a': {
        'tag subscriptions »': '購読タグを見る »',
        'all tags »': 'すべてのタグ »',
        'all badges »': 'すべてのバッジ »',
        'set tag preferences »': 'タグ設定を変更する »'
    },
    'text: h4#h-inferred-tags': {
        'Frequented Tags': 'よく閲覧するタグ' // http://meta.stackoverflow.com/questions/108224/documentation-for-frequented-tags-feature
    },
    'text: h4#h-interesting-tags': {
        'Favorite Tags': 'お気に入りのタグ',
    },
    'text: h4#h-ignored-tags': {
        'Ignored Tags': '無視しているタグ'
    },
    'value: input#interestingAdd': {
        'Add': '追加'
    },
    'value: input#ignoredAdd': {
        'Add': '追加'
    },
    'text: p.label-key': {
        'tagged': 'タグ',
        'asked': '質問日時',
        'viewed': '閲覧数',
        'kviews': '閲覧数(千)',
        'active': '最終更新'
    },
    'text: a#h-meta': {
        'Visit Meta': 'メタを見る',
    },
    'text: h4#h-related': {
        'Related': '関連質問'
    },
    'text: h4#h-recent-tags': {
        'Recent Tags': '最新のタグ' // http://meta.stackoverflow.com/questions/31585/what-is-the-purpose-of-the-recent-tags-cloud
    },
    'text: h4#h-recent-badges': {
        'Recent Badges': '最新のバッジ'
    },
    'text: h4#h-related-tags': {
        'Related Tags': '関連タグ'
    },
    'text: h4#h-linked': {
        'Linked': 'リンクされた質問'
    },
    'text: div#questions-count p': {
        'questions': '質問数'
    },
    'text: h4#h-unanswered-tags': {
        'Unanswered Tags': '未回答質問のタグ' // Which page?
    },
    //'text: '
    'text: div.module p': {
        'questions tagged': 'タグ付きの質問の数',
        
        // HACK: The text spans three elements, so it's not easy
        // to i18n, but I'll do a quick work-around for now
        'search results for': '件見つかりました',
        'posts containing': ' '
    },
    'text: div.tagged a': {
        'about »': 'このタグについて'
    },
    
    //=======================================================//
    //                     Search Results                    //
    //=======================================================//
    
    'html: form#bigsearch table tbody tr td': {
        'Want better search results? See our search tips!': 
        'お探しのものが見つかりませんか？{a|See our search tips!|検索のヒント}をご覧ください。'
    },
    
    'value: form#bigsearch table tbody tr td input': {
        'search': '検索'
    },
    
    //=======================================================//
    //                    Question Browsing                  //
    //=======================================================//
    
    // Questions
    'text: div.votes div:nth-child(2)': {
        'votes': '票数',
        'vote': '票数'
    },
    'text: div.status, div.status div:nth-child(2)': {
        'answers': '回答数',
        'answer': '回答数'
    },
    'text: div.views div:nth-child(2)': {
        'views': '閲覧数',
        'kviews': '千閲覧数',
        'view': '閲覧数'
    },
    'title: div.answered-accepted': {
        'one of the answers was accepted as the correct answer': 
        '回答が採用されました'
    },
    
    //=======================================================//
    //                     Question Pages                    //
    //=======================================================//
    
    // The controls under tags on questions
    // These are incomplete as I don't have access to them all
    'text: div.post-menu a': {
        'share': '共有',
        'link': 'リンク',
        'edit': '編集',
        'improve this question': '編集', // HACK!
        'improve this answer': '編集', // HACK!
        'close': '閉じる',
        'delete': '削除',
        'undelete': '復活させる',
        'reopen': 'リオープン',
        'flag': '通報', // ???
        'protect': '保護'
    },
    'title: div.post-menu a': {
        'short permalink to this question':
        'この質問のパーマリンクを表示。共有しやすい短いURLです',
        
        'short permalink to this answer':
        'この回答のパーマリンクを表示。共有しやすい短いURLです',
        
        'revise and improve this post':
        'この投稿を修正して良くする', // CHECK ME!
        
        'vote to close or reopen question; when closed, no new answers can be added':
        'この質問に閉じ・リオープン投票をする。閉じられた質問には、新しい回答は追加できなくなります',
        
        'flag this post for serious problems or moderator attention':
        'この投稿に深刻な問題がある場合やモデレータの介入が必要な場合に、通報することができます'
    },
    
    
    // "Add comment" links
    'text: a.comments-link': {
        // TODO: FILL IN THE REST, e.g. "add / show 2 more comments"! 
        'add comment': 'コメントを追加する'
    },
    'title: a.comments-link': {
        'ask author for clarification about this post':
        '不明点があれば投稿者に説明を求めましょう',
    
        'expand to show all comments on this post, or add one of your own':
        'すべてのコメントとコメント入力欄を表示します'
    },
    
    // "Add bounty" links
    'text: a.bounty-link': {
        'start a bounty': '賞金を懸ける'
    },
    'title: a.bounty-link': {
        'offer some of your reputation for better answers':
        '信用度を賞金として、よりよい回答を募集します'
    },

    // Upvote/flag hover icons
    'title: a.comment-up, a.comment-flag': {
        'this comment adds something useful to the post':
        '付加価値のある、いいコメントです！',
        
        'flag this comment as unconstructive, offensive, or spam':
        'このコメントは非建設的・不快・スパムです。通報します'
    },
    'title: td.comment-score span': {
        "number of 'useful comment' votes received":
        '「役立つコメント」投票の合計'
    },
    
    'text: div.was-this-helpful': {
        'feedback': 'フィードバック',
        'Was this post useful to you?': 'この投稿は役に立ちましたか？'
    },
    
    'value: input.anon-vote': {
        'Yes': 'はい',
        'No': 'いいえ'
    },
    
    // Vote up/down etc controls to the left of questions/answers
    'title: div.vote a, div.vote span': {
        // TODO: Fix "The question owner accepted this as the best answer 2 days ago" etc!
        
        'This question shows research effort; it is useful and clear (click again to undo)':
        'この質問には努力の跡が見える: ほかの人にも役立つし分かりやすい',
        
        'This question does not show any research effort; it is unclear or not useful (click again to undo)':
        'この質問には努力の跡が見えない: ほかの人の役にも立たたない、または分かりやすくない',
        
        'View upvote and downvote totals':
        '上げ票と下げ票の各合計を見る', 
        
        'This is a favorite question (click again to undo)':
        'これはお気に入りの質問です',
        
        'share link to this question on Facebook':
        'この質問のURLをフェイスブックで共有する',
        
        'share link to this question on Twitter':
        'この質問のURLをツイッターで共有する',
        
        'This answer is useful (click again to undo)':
        'この回答は役に立った',
        
        'This answer is not useful (click again to undo)':
        'この回答は役に立たなかった'
    },
    
    'value: td.comment-form form table tbody tr td input': {
        'Add Comment': 'コメントを追加する'
    },
    
    'text: a.comment-help-link': {
        'hide help': 'ヘルプを隠す',
        'help': 'ヘルプ'
    },
    
    //=======================================================//
    //                     Markdown Editor                   //
    //=======================================================//
    
    // Editor
    'text: form#post-form h2.space': {
        'Your Answer': 'あなたの回答'
    },
    'title: li.wmd-button': {
        'Strong <strong> Ctrl+B': '重要 <strong> Ctrl+B',
        'Emphasis <em> Ctrl+I': '強調 <em> Ctrl+I',
        
        'Hyperlink <a> Ctrl+L': 'ハイパーリンク <a> Ctrl+L',
        'Blockquote <blockquote> Ctrl+Q': '引用文 <blockquote> Ctrl+Q',
        'Code Sample <pre><code> Ctrl+K': 'サンプルコード <pre><code> Ctrl+K',
        'Image <img> Ctrl+G': '埋め込み画像 <img> Ctrl+G',
        
        'Numbered List <ol> Ctrl+O': '順序付きリスト <ol> Ctrl+O',
        'Bulleted List <ul> Ctrl+U': '順序なしリスト <ul> Ctrl+U',
        'Heading <h1>/<h2> Ctrl+H': '見出し <h1>/<h2> Ctrl+H',
        'Horizontal Rule <hr> Ctrl+R': '水平線 <hr> Ctrl+R',
        
        'Undo - Ctrl+Z': '取り消し - Ctrl+Z',
        'Redo - Ctrl+Y': 'やり直し - Ctrl+Y',
        
        'Markdown Editing Help': 'マークダウン編集ヘルプ'
    },
    'value: input#submit-button': {
        'Post Your Answer': '回答を投稿する',
        'Post Your Question': '質問を投稿する',
        'Save Profile': 'プロフィールを保存する' // on the "edit my profile" page
    },
    'value: div#show-editor-button input': {
        'Add Another Answer': '回答を追加する',
        'Answer Your Question': '自分の質問に回答する'
    },
    
    // Inline editing
    'value: div.form-submit input': {
        'Save Edits': 
        '編集を保存する',
        
        'Copy Profile to all Stack Exchange network accounts': 
        'プロフィールをすべてのStack Exchangeネットワークのアカウントにコピーする' // in the "edit user profile" page!
    },
    'text: div.form-item table tbody tr td label, div.form-item label': {
        'Edit Summary': '編集内容の要約'
    },
    'text: a.cancel-edit': {
        'cancel': 'キャンセル'
    },
    
    // Help
    'text: ul#mdhelp-tabs li': {
        'Links': 'ハイパーリンク',
        'Images': '画像',
        'Styling/Headers': 'スタイルとヘッダー',
        'Lists': 'リスト',
        'Blockquotes': '引用文',
        'Code': 'ソースコード'//,
        //'HTML': 'ハイパーテキスト'
    },
    
    // Anonymous post controls
    'text: a#login-link': {
        'log in': 'ログイン'
    },
    'text: td.vm div label': {
        'Name': '名前',
        'Email': 'メールアドレス',
        'Home Page': 'ホームページ'
    },
    'text: div.orword': {
        'or': 'それとも'
    },
    
    // Community Wiki checkbox
    'text: div.community-option label': {
        'community wiki': 'コミュニティー・ウィキ'
    },
    'title: div.community-option label': getObject([
        'Marking an answer community wiki encourages others to edit it by '+
        'lowering the reputation barrier required to edit. However, you will '+
        'not gain any upvote reputation from it. This cannot be undone.',
        
            '回答をコミュニティー・ウィキとして投稿すると、編集に必要な信用度が低くなり、'+
            '他の人が編集しやすくなります。ただし、上げ票が入っても信用度は獲得できません。'+
            '一度コミュニティー・ウィキにすると取り消すことはできません。']
    ),
    
    //=======================================================//
    //                       User Page                       //
    //=======================================================//
    
    'clicktext: a.toggle-summary': {
        'less info': '折り畳む', // "collapse"
        'more info': '展開する' // "expand"
    },
    
    'text: a.moderator': {
        'Moderator ♦': 'モデレータ ♦'
    },
    
    'text: div.user-header-left div.data table tbody tr th, div#small-user-info div table tbody tr th': {
        'bio': '略歴',
        'visits': '訪問',
        'stats': '統計'
    },
    'text: div.reputation': {
        'reputation': '信用度'
    },
    'text: div.badges': {
        'badges': 'バッジ'
    },
    
    'text: div.user-header-left div.data table tbody tr td, div#small-user-info div table tbody tr td': {
        // bio
        'website': 'ウェブサイト',
        'location': '場所',
        'email': 'メールアドレス',
        'real name': '本名',
        'age': '年齢',
        
        // visits
        'member for': '登録してから',
        'visited': '訪問日数',
        'seen': '最終活動', 
        
        // stats
        'profile views': 'プロフィール閲覧数',
        'helpful flags': '有効通報数',
        'flag weight': '通報影響力'
    },
    
    'text: div.sub-header-links a': {
        'edit': '編集',
        'prefs': '設定',
        'delete': 'アカウントの削除', // only shown to absolute new users?
        'flair': '自己宣伝', // I'm not sure exactly what this means, 
                             // but I've translated it as "self publicity" for now
        'apps': '連携アプリ',
        'my logins': 'ログイン履歴',
        'meta user': 'メタユーザー',
        'parent user': 'メインユーザー',
        'network profile': 'ネットワーク・プロフィール'
    },

    // User summary    
    'text: div.subheader h1 a, div.subheader h1': {
        'Answers': '回答数',
        'Answer': '回答数',
        'Reputation': '信用度',
        'Questions': '質問数',
        'Question': '質問数',
        'Tags': 'タグ数',
        'Tag': 'タグ数',
        'Accounts': 'アカウント数',
        'Account': 'アカウント数',
        'Badges': 'バッジ数',
        'Badge': 'バッジ数',
        'Active bounties': 'アクティブ賞金数',
        'Offered bounties': '提供した賞金数',
        'Earned bounties': '獲得した賞金数',
        'Responses': '返信数'
    },
    
    'text: div.user-panel-footer a': {
        'view more': 'もっと見る'
    },
    
    'text: table.votes-cast-stats thead tr th': {
        'all time': '通算',
        'by type': '種類別',
        'month': '今月',
        'week': '今週',
        'day': '今日'
    },
    
    'text: table.votes-cast-stats tbody tr td': {
        'up': '上げ',
        'down': '下げ',
        'question': '質問',
        'answer': '回答'
    },
    
    'html: div.empty': {
        'This user has not answered any questions': 'このユーザーは質問に{a|answered|答えた}ことがありません',
        'This user has no reputation changes': 'このユーザーの{a|reputation changes|信用度}の履歴はありません',
        'This user has not asked any questions': 'このユーザーは{a|questions|質問}をしたことがありません',
        'This user has not participated in any tags': 'このユーザーは{a|tags|タグ}に参加したことがありません',
        'This user has not earned any badges': 'このユーザーは{a|badges|バッジ}を獲得したことがありません',
        'This user has not cast any votes': 'このユーザーは{a|votes|投票した}ことがありません',
        'This user has no favorite questions': 'このユーザーの{a|favorite questions|お気に入りの質問}はありません',
        'This user has not participated in any bounties.': 'このユーザーは{a|bounties|賞金}に参加したことがありません。',
        
        'You have not answered any questions': '質問に{a|answered|答えた}ことがありません',
        'You have no reputation changes': '{a|reputation changes|信用度}の履歴がありません',
        'You have not asked any questions': '{a|questions|質問}をしたことがありません',
        'You have not participated in any tags': '{a|tags|タグ}に参加したことがありません',
        'You have not earned any badges': '{a|badges|バッジ}を獲得したことがありません',
        'You have not cast any votes': '{a|votes|投票した}ことがありません',
        'You have no favorite questions': '{a|favorite questions|お気に入りの質問}がありません',
        'You have not participated in any bounties.': '{a|bounties|賞金}に参加したことがありません。',
        
        'You have no active bounties': 'アクティブな賞金はありません',
        'You have no offered bounties': '賞金を提供したことがありません',
        'You have no earned bounties': '賞金を獲得したことがありません',
        'This user has no active bounties': 'このユーザーのアクティブな賞金はありません',
        'This user has no offered bounties': 'このユーザーは賞金を提供したことがありません',
        'This user has no earned bounties': 'このユーザーは賞金を獲得したことがありません'
    },
    
    'text: td.rep-desc': {
        'upvote': '上げ票',
        'downvoted': '下げ票',
        'accepted': '回答採用'
    },
    
    'text: table.history-table tbody tr td span, table.history-table tbody tr td, table.history-table tbody tr b': {
        'revised': '修正した',
        'answered': '回答した',
        'comment': 'コメントした',
        'accepted': '回答を採用した',
        'asked': '質問した',
        'awarded': '獲得した',
        'suggested': '修正案を出した',
        'wiki': 'ウィキ',
        'approved': '承認した',
        'rejected': '却下した'
    },
    
    'text: div.rep-footnote': {
        'Reputation on deleted posts and votes is not shown here':
        'ここでは削除された投稿の信用度は表示されません'
    },
    
    'text: div.account-stat span': {
        'reputation': '信用度',
        'badges': 'バッジ数',
        'questions': '質問数',
        'answers': '回答数'
    },
    
    'text: td.reputation': {
        'rep': '信用度'
    },
    
    'text: h1#user-displayname': {
        '> Edit': '> 編集',
        '> Preferences': '> 設定'
    },
    
    // "Edit" thingo
    'text: form#user-edit-form div table tbody tr td': {
        'Display Name': 'ハンドルネーム',
        'Email': 'メールアドレス',
        'Real Name': '本名',
        'Website': 'ウェブサイト',
        'Location': '場所',
        'Birthday': '誕生日',
        'About Me': '自己紹介'
    },
    'text: span.edit-field-overlay': {
        'never displayed, used for optional notifications and your gravatar':
        '完全非公開です。通知を受け取る設定にした場合や、アバター表示用に使われます。',
        
        //'briefly explain your changes (corrected spelling, fixed grammar, improved formatting)':
        //'FIXME',
        
        'YYYY/MM/DD, only used for displaying age':
        'YYYY/MM/DD、年齢表示のために使われ、公開はされません',
        
        'required, but never shown': 
        '必須ですが、公開はされません' // on the anonymous "Markdown Editor" submit controls
    },
    'text: a#cancel': {
        'cancel': 'キャンセル'
    },
    'text: table#user-edit-table tbody tr td p a': {
        'change picture': '写真を変更する'
    },
    'text: table#user-edit-table tbody tr td h2': {
        'Registered User': '登録済みのユーザー',
        'Unregistered User': '未登録のユーザー'
    },
    
    // "Preferences" thingo
    'text: div#interesting-tags div label': {
        'hide ignored tags': '関連する投稿を完全に隠す'
    },
    'text: div.module h4': {
        'Miscellaneous': 'その他'
    },
    'text: div.module div label': {
        'Allow email notifications when I subscribe to questions or tags': 
        'フォローした質問やタグについて、メールで更新を受け取る'
    },
    
    //=======================================================//
    //                Tags/Users/Badges Pages                //
    //=======================================================//
    
    // "Tags" and "Users" pages
    'text: div.page-description table tbody tr td': {
        'Type to find tags:': 'タグを検索：',
        'Type to find users:': 'ユーザーを検索：'
    },
    'text: div#mainbar-full b a': {
        'tag synonyms': 'タグ同義語',
        'weekly / monthly / quarterly reputation leagues': '週間／月間／3ヶ月毎の信用度ランキング'
    },
    'text: div.welovestackoverflow div p a': { // hahaha :P
        'learn more…': 'もっと詳しく',
        'improve tag wiki': '編集する', // HACK!
        'edit description': '編集する', // (I don't know if this is correct or not)
        'top users': 'トップユーザー',
        'synonyms': '同義タグ'
    },
    
    'text: div.page-description p': getObject(
        ['A tag is a keyword or label that categorizes your question with other, '+
         'similar questions. Using the right tags makes it easier for others to '+
         'find and answer your question.',
         
            'タグは、同じトピックに関する質問をまとめて分類するためのキーワードまたはラベルです。適切なタグを質問に付けることで、'+
            '回答を知っている人の目にとまる確率が高くなります。'],
        
        ['As you use Japanese Language and Usage - Stack Exchange to ask '+
         'and answer questions, you’ll earn badges, which appear on your '+
         'user page and in your user card.',
         
             // This might need to be explained differently! =================================
             'このサイトで質問や回答を投稿するうちに、バッジを獲得することがあります。バッジはこのサイトであなたが何かを極めたあかしです。獲得したバッジはユーザープロフィールやユーザーカードに表示されます。']
    ),
    
    'text: a.edit-link': {
        'edit': '編集'
    },
    
    'html: div.user-about-me p': {
        '(your about me is currently blank)': '（現在自己紹介が空っぽです）'
    },
    
    'text: div.user-about-me p a': {
        'click here to edit': '編集する…'
    },
    
    //=======================================================//
    //                    Unanswered Page                    //
    //=======================================================//
    
    'html: div#questions-count p': {
        'questions with no upvoted answers': 
        '<b class="supernova">上げ票付きの回答が1つもない</b>質問', // CHECK ME!
        
        'questions with no answers':
        '<b class="supernova">回答が1つもない</b>質問',
        
        'in your tags': 'あなたのタグ：'
    },
    
    //=======================================================//
    //                    Bottom Controls                    //
    //=======================================================//
    
    // Next/previous page etc
    'text: span.page-numbers': {
        'next': '次へ',
        'prev': '前へ',
        'per page': '表示件数' // FIXME!
    },
    
    // "recent questions feed" at the bottom of the page
    'text: div#feed-link-text a': {
        'recent questions feed': '新着質問のRSSフィード',
        'question feed': 'この質問のRSSフィード',
        'user feed': 'このユーザーのRSSフィード'
    },
    
    // Footer
    'text: div#footer-menu a': {
        'options': 'ふりがな設定',
        'about': '概要',
        'faq': 'よくある質問',
        'blog': 'ブログ',
        'chat': 'チャット',
        'data': 'データ',
        'podcast': 'ポッドキャスト',
        'shop': 'ショップ',
        'legal': '規約',
        'privacy policy': 'プライバシー',
        'jobs': '採用',
        'advertising info': '広告',
        'mobile': 'モバイル',
        'contact us': 'お問い合わせ', 
        'feedback': 'フィードバック'
    },
    
    //=======================================================//
    //                    Bottom Notices                     //
    //=======================================================//
    
    'html: h2.bottom-notice': getObject(
        ['Looking for more? Browse the complete list of questions, or '+
          'popular tags. Help us answer unanswered questions.',
          
             'まだまだいけますか？{a|complete list of questions|すべての質問一覧}'+
             '、それとも{a|popular tags|人気タグ}をどうぞ。'+
             'あなたの{a|unanswered questions|回答を待っている質問}もあるかもしれません。'],
         
         ['Know someone who can answer? Share a link to this '+
         'question via email, Twitter, or Facebook.',
     
            '回答できそうな人を知っていますか？この質問の{a|link|リンク}を{a|email|メール}や'+
            '{a|Twitter|ツイッター}、{a|Facebook|フェイスブック}で共有しましょう。'],
        
        ['You must log in to answer this question.',
            'この質問に回答するには{a|log in|ログイン}が必要です。']
    ),
    
    //=======================================================//
    //                      Tag Popups                       //
    //=======================================================//
    
    'text: span.tm-sub-links a': {
        'subscribe': 'タグをフォローする',
        'unsubscribe': 'タグのフォローをやめる',
        'rss': 'RSSフィード'
    },
    
    'text: span.tm-links a': {
        'faq': 'よくある質問',
        'info': '詳しい情報',
        'top users': 'トップユーザ',
        'edit': '編集'
    },
    
    'text: div.tm-description a': {
        'help us edit this wiki': 'このタグウィキの加筆・訂正の協力者を募集中です' // Wikipedia stub
    },
    
    'title: a.tm-favorite-clear': {
        'toggle this tag between favorite, ignored, and normal':
        'このタグをお気に入り/無視する/何もなしの間で切り替えます'
    },
    
    'title: span.tm-sub-links a': {
        'subscribe for email notifications on this tag':
        'このタグに関連した更新をメールで受け取る',
        
        'add this tag to your rss reader':
        'このタグをあなたのRSSリーダーに追加する'
    },
    
    //=======================================================//
    //                 Administrator Tools                   //
    //=======================================================//
    
    'text: div#mainbar-full div h2': {
        'Questions with extreme votes': '投票が極端に多い質問',
        'Answers with extreme votes': '投票が極端に多い回答',
        'Posts with notable activity': 'アクティビティが多い投稿',
        'Links': 'リンク',
        'Close votes': '閉じ票',
        'Reopen votes': 'リオープン票',
        //'Recent occurrences': '',
        'Delete votes': '削除投票',
        'Undelete votes': '復活投票'
    },
    
    'text: div#mainbar-full div div h3': {
        'Highest voted': '最も投票した',
        'Lowest voted': '投票数の低い',
        'Most commented': 'コメントの高い',
        'Most edited': '編集の高い',
        'Most viewed': '閲覧の高い',
        'Recently protected': '最近保存した',
        'Recently imported': '最近インポートした',
        'New tags': '新しいタグ',
        'Most Votes': '投票の高い',
        'Recent Votes': '最近の投票',
        'Recently Closed': '最近閉じられた',
        'Recently Reopened': '最近リオープンした',
        'Recently Deleted': '最近削除した',
        'Recently Undeleted': '最近復活した'
    },
    
    //=======================================================//
    //                   Close Votes Dialog                  //
    //=======================================================//
    
    // CHECK THESE!
    'text: div#pane-main h2, div#pane1 h2, div#pane2 h2': {
        'Why should this question be closed?':
        'この質問を閉じるべき理由は何ですか？',
        'This question is a duplicate of which other question?':
        'どの質問と重複していますか？',
        'This question…':
        'この質問は…'
    },
    
    'text: span.action-name': {
        'exact duplicate': '完全重複',
        'off topic': 'スレ違い',
        'not constructive': '建設的でない',
        'not a real question': '回答不能',
        'too localized': '局所的過ぎる'
    },
    
    'text: a.popup-actions-cancel': {
        'back': '戻る',
        'cancel': 'キャンセル'
    },
    
    'text: span#remaining-votes': {
        'votes remaining': '残りの投票数',
        'vote remaining': '残りの投票数'
    },
    
    'value: input.popup-submit': {
        'Vote To Close': '閉じ票を入れる'
    },
    
    //=======================================================//
    //                   Community Bulletin                  //
    //=======================================================//
    
    'text: div#sidebar div.community-bulletin h4': {
	'Community Bulletin': '掲示板'
    },
    
    'text: a.event-date': {
        'blog': 'ブログ',
	'meta': 'メタ'
    },
    
    //=======================================================//
    //                   Site Stats                  //
    //=======================================================//

    'text: div#beta-stats h4': {
        'Site Stats': 'このサイトの統計'
    },
    
    'text: td.stats-header': {
        'more site stats on:': '統計をもっと詳しく見る：'
    },
    
    'text: td.stats-label a': {
        'area 51': 'エリア51',
	'stack exchange': 'Stack Exchange'
    },
    
    'text: td.stats-label': {
        'questions': '質問数',
        'answers': '回答数',
        'answered': '回答率',
        'users': 'ユーザー数',
        'visitors/day': '一日の訪問者数'
    }
}

var jluVars = {
    //=======================================================//
    //                         Tags                          //
    //=======================================================//
    
    'tags': {
        // most common tags page 1
        'grammar': '文法',
        'word-choice': '言葉選び',
        'usage': '言葉使い',
        'nuances': 'ニュアンス',
        'vocabulary': '語彙',
        'translation': '翻訳',
        'particles': '不変化詞',
        'kanji': '漢字',
        'verbs': '動詞',
        'words': '言葉',
        'meaning': '意味',
        'etymology': '語源',
        'conjugations': '動詞の活用',
        'politeness': '丁寧さ',
        'pronunciation': '発音',
        'slang': '俗語',
        'synonyms': '同義語',
        'set-phrases': '決まり文句',
        'definitions': '定義',
        'numbers': '数字',
        'readings': '読み',
        'learning': '学び',
        'particle-ni': '助詞「に」', // FIXME
        'culture': '文化',
        'colloquial': '口語',
        'te-form': 'て形', 
        'formal-noun': '固有名詞',
        'dialects': '方言',
        'jlpt': '日本語能力試験',
        'history': '歴史',
        'resources': '参考文献', // CHECK ME!
        'expression': '表現',
        'loanwords': '外来語',
        'adjectives': '形容詞',
        'business-japanese': 'ビジネス日本語',
        // Taken from Chinese Wikipedia, so probably needs correction :P
        //'register': '言語使用場合の領域',
        
        // most common tags page 2
        'honorifics': '敬語', // WARNING!
        'idioms': 'イディオム',
        'contractions': '縮約',
        'keigo': '敬語',
        'orthography': '正字法',
        'syntax': '構文',
        'spelling': 'スペリング',
        'particle-no': '助詞「の」',
        'particle-de': '助詞「で」',
        'negative-forms': '否定形',
        'counter-words': '助数詞',
        'terminology': '専門用語',
        'suffixes': '接尾辞',
        'speaking': '話',
        'tense': '時制',
        'food': '食べ物',
        //'first-person-pronoun': '',
        'hiragana': 'ひらがな',
        'practical': '日常',
        'phonology': '音韻論',
        'kana': 'かな',
        'greetings': '挨拶',
        'i-adjectives': '形容詞',
        //'homophonic-kanji': '',
        'katakana': 'カタカナ',
        'particle-to': '助詞「と」',
        'particle-ga': '助詞「が」',
        'song-lyric': '歌詞',
        'typo': 'タイプミス',
        'particle-wa': '助詞「は」',
        'phrase-requests': '用語要求',
        'adverbs': '副詞',
        'compounds': '複合語',
        'conjunctions': '接続詞',
        'dictionary': '辞書',
        'perspective': '見方',
        
        // most common tags page 3
        'particle-wo': '助詞「を」',
        'nuance': 'ニュアンス',
        'intransitive': '自動詞',
        'computing': 'コンピュータ用語',
        'copula': '連結詞',
        'ellipsis': '省略',
        'internet-slang': 'インターネット俗語',
        'onomatopoeia': '擬音語',
        'phrase': '言い回し',
        'transitive': '他動詞',
        'puns': '駄じゃれ',
        'pronouns': '代名詞',
        'quotes': '引用',
        'questions': '質問',
        'potential-form': '可能形',
        'formality': '形式',
        'chinese': '中国語',
        'ateji': '当て字',
        'passive': '受動態',
        'metaphor': '隠喩',
        'na-adjectives': '形容動詞',
        'name': '名前',
        'romaji': 'ローマ字',
        'time': '時間',
        'wasei-eigo': '和製英語',
        'publishing': '印刷',
        'punctuation': '句読点',
        'obsolete-kana': '変体仮名',
        'interjections': '間投詞',
        'kana-usage': 'かなの使い',
        'particle-na': '助詞「な」',
        'abbreviations': '短縮', // Check me re: ellipsis
        'archaic': '死語', // ???
        'differences': '違い',
        'formation': '形成',
        'stroke-order': '筆順',
        
        // most common tags page 4
        'homonyms': '同音異義語',
        'bikago': '美化語',
        //'clause-pattern': '',
        'demonstratives': '指示詞',
        'part-of-speech': '品詞',
        'pitch-accent': '高低アクセント',
        'okurigana': '送り仮名',
        'particle-ka': '助詞「か」',
        'intonation': 'イントネーション',
        'linguistics': '言語学',
        'relative-clause': '関係詞節',
        'website': 'ウェブサイト',
        //'verse': '',
        'respect': '尊敬',
        'radicals': '部首',
        'single-word-requests': '単独言葉要求', // CHECK ME!
        'mathematics': '数学',
        'language-change': '言語変化',
        'language-reform': '言語改革',
        'nouns': '名詞',
        'particle-e': '助詞「へ」',
        'plurals': '複数',
        'phonetics': '音声学',
        'causative': '使役',
        'animals': '動物',
        'anime': 'アニメ',
        'input-method': '入力方式',
        //'gemination': '',
        'particle-yori': '助詞「より」',
        'machine-translation': '機械翻訳',
        'mnemonics': '記憶を助けるもの',
        'offensive-words': '不快な言葉',
        'direction': '方向',
        'fauna': '動物相',
        'folklore': '民間伝承',
        'email': '電子メール',
        'alphabetical-order': 'アルファベット順',
        'ambiguity': '曖昧さ',
        'comprehension': '理解',
        'colours': '色',
        'comparitive-linguistics': '比較言語学',
        'subject': '主語',
        'tag-question': '付加疑問',
        'rendaku': '連濁',
        'volitional': '意志動詞', // CHECK ME!
        'vowels': '母音',
        
        // meta tags
        'discussion': '会話',
        'tags': 'タグ',
        'support': 'サポート',
        'allowed-questions': '許可された質問',
        'bug': 'バグ',
        'status-completed': 'ステータス完了',
        'feature-request': '機能リクエスト ',
        'tag-synonyms': '同義タグ',
        'faq-topics': 'FAQトピック',
        'furigana': 'ふりがな',
        'answers': '回答',
        'tag-wiki': 'タグウィキ',
        'comments': 'コメント',
        'markdown': 'マークダウン',
        'site-promotion': 'ウェブサイト推進',
        'meta': 'メタ',
        'voting': '投票',
        'target-audience': 'ターゲット・オーディエンス',
        'scope': '範囲'
    },
    
    //=======================================================//
    //                         Badges                        //
    //=======================================================//
	
    'badges': {
        // Badge descriptions
        'Gold Badge': '金バッジ',
        'Silver Badge': '銀バッジ',
        'Bronze Badge': '銅バッジ',
        
        // Badges
        'Altruist': [
        	'利他主義者',
	        "First bounty you manually awarded on another person's question",
	        '他の人の質問に初めて賞金を与えた'
	    ],
        'Analytical': [
        	'分析的', // ??
        	"Visited every section of the FAQ",
        	'すべての{a|FAQ|よくある質問}のセクションを読んだ'
        ],
        'Announcer': [
        	'アナウンサー',
        	'Shared a link to a question that was visited by 25 unique IP addresses',
        	'質問のリンクを共有し、25個の別々のIPアドレスから訪問された'
        ],
        'Archaeologist': [
        	'考古学者',
        	'Edited 100 posts that were inactive for 6 months',
        	'6ヶ月間何の更新もなかった投稿を全部で100個編集した'
        ],
        'Autobiographer': [
        	'自伝作家',
        	'Completed all user profile fields',
        	'ユーザープロフィールの入力欄をすべて記入した'
        ],
        'Benefactor': [
        	'寄贈者',
        	'First bounty you manually awarded on your own question',
        	'自分の質問に初めて賞金を与えた'
        ],
        'Beta': [
        	'ベータ',
        	'Actively participated in the private beta',
        	'プライベートベータ版にアクティブに参加した'
    	],
        'Booster': [
        	'ブースター',
        	'Shared a link to a question that was visited by 300 unique IP addresses',
        	'質問のリンクを共有し、300個の別々のIPアドレスから訪問された'
        ],
        'Caucus': [
        	'党員集会',
        	'Visited an election during any phase of an active election and have enough reputation to cast a vote',
        	'選挙期間中、投票するのに充分な信用度がある状態でサイトを訪問した。選挙のどの段階かは問わない'
        ],
        'Citizen Patrol': [
        	'市民パトロール',
        	'First flagged post',
        	'投稿を初めて通報した'
        ],
        'Civic Duty': [
        	'市民の義務',
        	'Voted 300 or more times',
        	'300回以上投票した'
        ],
        'Cleanup': [
        	'掃除',
        	'First rollback',
        	'初めて差し戻した'
        ],
        'Commentator': [
        	'コメンテーター',
        	'Left 10 comments', 
        	'10個のコメントを残した'
        ],
        'Constituent': [
        	'選挙人',
        	'Voted for a candidate in the final phase of an election', 
        	'選挙の最終投票で候補者に投票した'
        ],
        'Convention': [
        	'委員会',
        	'10 posts with score of 2 on meta',
        	'{a|meta|メタ}でスコア2以上の質問や回答を10個投稿した'
        ],
        'Copy Editor': [
        	'熟練編集者',
        	'Edited 500 posts',
        	'500個の投稿を編集した'
        ],
        'Critic': [
        	'批評家',
        	'First down vote',
        	'初めて下げ票を入れた'
        ],
        'Custodian': [
        	'守衛',
        	'Completed at least one review task. This badge is awarded once per review type', 
        	'1回以上レビュー作業をおこなった。このバッジはレビュー種別ごとに与えられます'
        ],
        'Deputy': [
        	'保安官代理',
        	'Raised 80 helpful flags',
        	'有効な通報を80回おこなった'
        ],
        'Disciplined': [
        	'規律精神',
        	'Deleted own post with score of 3 or higher',
        	'自分の3スコア以上の投稿を削除した'
        ],
        'Editor': [
        	'編集者',
        	'First edit',
        	'初めて編集した'
        ],
        'Electorate': [
        	'有権者',
        	'Voted on 600 questions and 25% or more of total votes are on questions',
        	'600個の投稿に投票し、25％以上が質問に対するもの'
        ],
        'Enlightened': [
        	'覚者',
        	'First to answer and accepted with at least 10 upvotes',
        	'一番乗りで回答し、10以上の上げ票を獲得して採用された'
        ],
        'Enthusiast': [
        	'熱狂者',
        	'Visited the site each day for 30 consecutive days',
        	'30日連続でこのサイトを訪問した'
        ],
        'Epic': [
        	'英雄',
        	'Earned 200 daily reputation 50 times',
        	'一日の獲得信用度の上限である200に50回達した'
        ],
        'Excavator': [
        	'発掘人',
        	'Edited first post that was inactive for 6 months',
        	'6ヶ月の間何の更新もなかった投稿を編集した'
        ],
        'Famous Question': [
        	'有名な質問',
        	'Asked a question with 10,000 views',
        	'一万閲覧数の質問をした'
        ],
        'Fanatic': [
        	'狂信者',
        	'Visited the site each day for 100 consecutive days',
        	'100日連続でこのサイトを訪問した'
        ],
        'Favorite Question': [
        	'お気に入りの質問',
        	'Question favorited by 25 users',
        	'質問が25人のユーザーによってお気に入りに登録された'
        ],
        'Generalist': [
        	'万能選手', // TODO: Is this word for athletes etc only?
        	'Provided non-wiki answers of 15 total score in 20 of top 40 tags',
        	'トップ40のタグのうち20個において、15スコア以上の回答を投稿した（コミュニティ・ウィキを除く）'
        ],
        'Good Answer': [
        	'良い回答', 
        	'Answer score of 25 or more',
        	'回答が25スコア以上を獲得した'
        ],
        'Good Question': [
        	'良い質問',
        	'Question score of 25 or more',
        	'質問が25スコア以上を獲得した'
        ],
        'Great Answer': [
        	'偉大な回答',
        	'Answer score of 100 or more',
        	'回答が100スコア以上を獲得した'
        ],
        'Great Question': [
        	'偉大な質問',
        	'Question score of 100 or more',
        	'質問が100スコア以上を獲得した'
        ],
        'Guru': [
        	'グル', // CHECK ME!
        	'Accepted answer and score of 40 or more',
        	'ベストアンサーでスコア40以上'
        ],
        'Investor': [
        	'投資家',
        	'First bounty you offered on another person\'s question',
        	'他の人の質問に初めて賞金を提供した'
        ],
        'Legendary': [
        	'伝説的',
        	'Earned 200 daily reputation 150 times',
        	'一日の獲得信用度の上限である200に150回達した'
        ],
        'Marshal': [
        	'保安官', 
        	'Raised 500 helpful flags',
        	'有効な通報を500回おこなった'
        ],
        'Mortarboard': [
        	'角帽',
        	'Earned at least 200 reputation in a single day',
        	'一日に200以上の信用度を獲得した'
        ],
        'Necromancer': [
        	'黒魔術師',
        	'Answered a question more than 60 days later with score of 5 or more',
        	'60日以上後に回答し、5スコア以上を獲得した'
        ],
        'Nice Answer': [
        	'ナイス回答', 
        	'Answer score of 10 or more',
        	'回答のポイントは10以上'
        ],
        'Nice Question': [
        	'ナイス質問',
        	'Question score of 10 or more',
        	'回答が10スコア以上を獲得した'
        ],
        'Notable Question': [
        	'目立った質問',
        	'Asked a question with 2,500 views',
        	'2500閲覧数の質問をした'
        ],
        'Organizer': [
        	'整理整頓',
        	'First retag',
        	'初めてリタグした'
        ],
        'Outspoken': [
        	'積極的', // I translated it to "proactive"/"assertive" for now...
        	'Posted 10 messages in chat that were starred by 10 different users',
        	'スターが10個付いたチャットの発言が10個に達した'
        ],
        'Peer Pressure': [
        	'同調圧力',
        	'Deleted own post with score of -3 or lower',
        	'自分の-3スコア以下の投稿を削除した'
        ],
        'Popular Question': [
        	'人気のある質問',
        	'Asked a question with 1,000 views',
        	'1000閲覧数の質問をした'
        ],
        'Populist': [
        	'大衆主義者',
        	'Highest scoring answer that outscored an accepted answer with score of more than 10 by more than 2x',
        	'回答のスコアが採用された10スコア以上回答を2倍以上上回り、スコア順では一番'
        ],
        'Precognitive': [
        	'正夢を見る人',
        	'Followed the Area 51 proposal for this site before it entered the commitment phase',
        	'このサイトがArea 51で提案された時から、コミットフェーズに入る前にフォローしていた'
        ],
        'Promoter': [
        	'主催者', // ??
        	'First bounty you offered on your own question',
        	'自分の質問に初めて賞金を提供した'
        ],
        'Proofreader': [
        	'校正者',
        	'Approved or rejected 100 suggested edits',
        	'修正案を100個承認または却下した'
        ],
        'Publicist': [
        	'広報担当者',
        	'Shared a link to a question that was visited by 1000 unique IP addresses',
        	'質問のリンクを共有し、1000個の別々のIPアドレスから訪問された'
        ],
        'Pundit': [
        	'識者',
        	'Left 10 comments with score of 5 or more',
        	'5スコア以上のコメントを10個の残した'
        ],
        'Quorum': [
        	'定足数',
        	'One post with score of 2 on meta',
        	'{a|meta|メタ}で2スコアの回答や質問を投稿した'
        ],
        'Research Assistant': [
        	'研究助手',
        	'Edited 50 tag wikis',
        	'タグウィキを50個編集した'
        ],
        'Reversal': [
        	'逆転',
        	'Provided answer of +20 score to a question of -5 score',
        	'+20スコア回答を-5スコアの質問に投稿した'
        ],
        'Reviewer': [
        	'レビュワー',
        	'Completed at least 250 review tasks. This badge is awarded once per review type',
        	'250回以上レビュー作業をおこなった。このバッジはレビュー種別ごとに与えられます'
        ],
        'Revival': [
        	'復活',
        	'Answered more than 30 days later as first answer scoring 2 or more',
        	'30日以上後に一番乗りで回答し2スコア以上を獲得した'
        ],
        'Scholar': [
        	'学者',
        	'Asked a question and accepted an answer',
        	'質問して回答を採用した'
        ],
        'Self-Learner': [
        	'勉強家',
        	'Answered your own question with score of 3 or more',
        	'自分の質問に3スコア以上の回答をした'
        ],
        'Sportsmanship': [
        	'スポーツマンシップ',
        	'Up voted 100 answers on questions where an answer of yours has a positive score',
        	'自分の回答のスコアが1以上ある質問で、自分以外の回答に100回上げ票を入れた'
        ],
        'Stellar Question': [
        	'素晴らしい質問',
        	'Question favorited by 100 users',
        	'質問が100人のユーザーによってお気に入りに登録された'
        ],
        'Steward': [
        	'支配人',
        	'Completed at least 1,000 review tasks. This badge is awarded once per review type',
        	'1,000回以上レビュー作業をおこなった。このバッジはレビュー種別ごとに与えられます'
        ],
        'Strunk & White': [
        	'作文術の大家',
        	'Edited 80 posts',
        	'80個の投稿を編集した'
        ],
        'Student': [
        	'学生',
        	'Asked first question with score of 1 or more',
        	'初めてのスコア1以上の質問'
        ],
        'Suffrage': [
        	'選挙権',
        	'Used 30 votes in a day',
        	'一日に30回投票した'
        ],
        'Supporter': [
        	'支援者',
        	'First up vote',
        	'初めて上げ票を入れた'
        ],
        'Synonymizer': [
        	'同義語整理人',
        	'First approved tag synonym',
        	'初めて{a|tag synonym|タグ同義語}を承認した'
        ],
        'Tag Editor': [
        	'タグ編集者',
        	'First Tag Wiki Edit',
        	'初めてタグウィキを編集した'
        ],
        'Talkative': [
        	'おしゃべり',
        	'Posted 10 messages, with 1 or more starred, in chat',
        	'{a|chat|チャット}で10回以上発言し、1個以上のスターが付いた'
        ],
        'Taxonomist': [
        	'分類学者',
        	'Created a tag used by 50 questions',
        	'50個の質問によって使われたタグを作った'
        ],
        'Teacher': [
        	'先生',
        	'Answered first question with score of 1 or more',
        	'1スコア以上の回答をはじめて投稿した'
        ],
        'Tenacious': [
        	'粘り強い',
        	'Zero score accepted answers: more than 5 and 20% of total',
        	'0スコアのベストアンサーが5個以上ですべての回答の20%'
        ],
        'Tumbleweed': [
        	'閑古鳥',
        	'Asked a question with no votes, no answers, no comments, and low views for a week',
        	'1週間、投票もなくコメントもなく閲覧数も少ない質問をした'
        ],
        'Unsung Hero': [
        	'無名の英雄',
        	'Zero score accepted answers: more than 10 and 25% of total',
        	'0スコアのベストアンサーが10個以上ですべての回答の25%'
        ],
        'Vox Populi': [
        	'国民の声',
        	'Used the maximum 40 votes in a day',
        	'1日の投票数の上限40に達した'
        ],
        'Yearling': [
        	'1周年記念', // "first year anniversary" :P
        	'Active member for a year, earning at least 200 reputation',
        	'一年間サイトで活動し、少なくとも信用度を200獲得した'
        ]
    },
    
    //=======================================================//
    //                      Permissions                      //
    //=======================================================//
    
    'perms': {
        'trusted user': '信頼されたユーザー',
        'protect questions': '質問を保護する',
        'access to moderator tools': 'モデレータ・ツールにアクセスする',
        'approve tag wiki edits': '他の人のタグウィキ編集を承認する',
        'create tag synonyms': 'タグ同義語を作る',
        'create gallery chat rooms': '発言権限付きチャットルームを作る',
        'edit questions and answers': '質問と回答を編集する',
        'established user': '認められたユーザー',
        'cast close and reopen votes': '閉じ票・リオープン票を入れる',
        'view close votes': '閉じ票数を見る',
        'retag questions': '質問をリタグする',
        'create tags': '新しいタグを作る',
        'vote down': '下げ票を入れる',
        'create chat rooms': 'チャットルームを作成する',
        'edit community wiki': 'コミュニティー・ウィキ投稿を編集する',
        'set bounties': '賞金をセットする', // CHECK ME!
        'comment everywhere': 'どこでもコメントを残せる',
        'talk in chat': 'チャットで発言する',
        'flag posts': '投稿を通報する',
        'vote up': '上げ票を入れる',
        'create wiki posts': 'ウィキ投稿を作る',
        'remove new user restrictions': '新規ユーザーの制限を解除する',
        'participate in meta': 'メタに参加する',
        'create posts': '新しい質問をしたり回答をしたりする'
    },
    
    //=======================================================//
    //                         Sites                         //
    //=======================================================//

    // Organization:
    // - Beta sites
    // - Launched sites
    //
    // Site links in the global inbox may use a "nickname" for the site (i.e. ask different).
    // Those are placed just below the "short" version (i.e. apple), which is for the mega footer.
    'sites': {
        // Beta
        'personal finance and money': '家計と経済',
        'onstartups': 'スタートアップ',
        'board and card games': 'ボードゲームとカードゲーム',
        'homebrewing': '自家醸造',
        'writers': '作家',
        'audio-video production': 'オーディオビデオ製作',
        'graphic design': 'グラフィックデザイン',
        'code review': 'コードレビュー',
        'code golf': 'コードゴルフ',
        'quantitative finance': '計量経済学',
        'project management': 'プロジェクト管理',
        'physical fitness': 'フィットネス',
        'motor vehicle maintenance and repair': '自動車メンテナンスと修理',
        'parenting': '育児',
        'musical practice and performance': '音楽演奏・パフォーマンス',
        'software quality assurance and testing': 'ソフトウェア品質管理とテスト',
        'german language and usage': 'ドイツ語',
        'japanese language and usage': '日本語',
	'Japanese Language and Usage': '日本語', // HACK!
        'philosophy': '哲学',
        'gardening and landscaping': '園芸と造園',
        'travel': '旅行',
        'personal productivity': '個人的生産性',
        'cryptography': '暗号学',
        'signal processing': '信号処理',
        'french language and usage': 'フランス語',
        'christianity': 'キリスト教',
        'bitcoin': 'ビットコイン',
        'linguistics': '言語学',
        'biblical hermeneutics': '聖書解釈',
        'history': '歴史',
        'lego® answers': 'レゴ',
        'spanish language and usage': 'スペイン語',
        'computational science': '計算科学',
        'movies and tv': '映画とテレビ',
        'chinese language and usage': '中国語',
        'biology': '生物学',
        'poker': 'ポーカー',
        'cognitive sciences': '認知科学',
        'the great outdoors': '自然',
        'smugmug': 'smugmug',
        'martial arts': '武道',
        'sports': 'スポーツ',
        'academia': '学界',
        'computer science': '計算機科学',
        'the workplace': '仕事場',
        'windows phone': 'ウィンドウズフォン',
        'chemistry': '化学',
        'chess': 'チェス',
        'libraries and information science': '図書館情報学',
        'raspberry pi': 'raspberry pi',
        'russian language and usage': 'ロシア語',
        'islam': 'イスラム',
        'salesforce': 'salesforce',
        'patents': '特許',
        'genealogy and family history': '家系',
        'area 51': 'エリア51',
        'api/apps': 'API/アプリ',
        'stack apps': 'スタック・アプリ',

         // Launched
        'stack overflow': 'スタックオーバーフロー',
        'stackoverflow.com': 'スタックオーバーフロー',
        'careers': 'キャリア2.0',
        'server fault': 'サーバーフォルト',
        'super user': 'スーパーユーザー',
        'meta': 'メタスタックオーバーフロー',
        'meta stack overflow': 'メタスタックオーバーフロー',
        'webapps': 'ウェブアプリ',
        'web applications': 'ウェブアプリ',
        'gaming': 'ゲーマー', // CHECK ME!
        'arqade': 'ゲーマー',
        'ubuntu': 'ubuntu',
        'ask ubuntu': 'ubuntu',
        'webmasters': 'ウェブマスター',
        'cooking': '料理',
        'seasoned advice': '料理',
        'game development': 'ゲーム開発',
        'math': '数学',
        'mathematics': '数学',
        'photography': '写真撮影',
        'stats': '統計分析',
        'statistical analysis': '統計分析',
        'tex': 'tex',
        'tex - latex': 'tex - latex',
        'english': '英語',
        'english language and usage': '英語',
        'theoretical cs': '理論計算機科学',
        'theoretical computer science': '理論計算機科学',
        'programmers': 'プログラマー',
        'unix': 'unix',
        'unix and linux': 'unixとlinux',
        'apple': 'アップル',
        'wordpress': 'wordpress',
        'physics': '物理学',
        'home improvement': '家の修繕',
        'gis': '地理情報システム',
        'electronics': '電気工学',
        'electrical engineering': '電気工学',
        'android': 'アンドロイド',
        'android enthusiasts': 'アンドロイド',
        'security': 'ITセキュリティー',
        'it security': 'ITセキュリティー',
        'bicycles': '自転車',
        'dba': 'dba',
        'database administrators': 'データベース管理者',
        'drupal answers': 'drupal',
        'sharepoint': 'sharepoint',
        'scifi & fantasy': 'SFとファンタジー',
        'science fiction and fantasy': 'SFとファンタジー',
        'user experience': 'ユーザーエクスペリエンス',
        'skeptics': '懐疑派',
        'rpg': 'ロールプレイングゲーム',
        'role-playing games': 'ロールプレイングゲーム',
        'judaism': 'ユダヤ',
        'mi yodeya': 'ユダヤ',
        'mathematica': 'mathematica',
        '': ''
    }
}


// Remap the badge keys:
// badges: {english badge name: japanese badge name, ...}
// badgedesc: {english badge description: japanese badge description, ...}

var badges = jluVars['badges'],
    newBadges = jluVars['badges'] = {},
    badgedesc = jluVars['badgedesc'] = {}

$.each(badges, function(enKey, v) {
	var jaKey = v[0],
	    enDesc = v[1],
	    jaDesc = v[2]
	
	if (typeof v=='string') {
		newBadges[enKey] = v
		return
	}
	
	if (jaKey) {
		newBadges[enKey] = jaKey
	}
	
	if (jaDesc) {
		badgedesc[enDesc] = jaDesc
	}
})



/*





'belongs on meta.japanese.stackexchange.com'
'discussion, support, and feature requests for this site'


*/

var mappings = {
    // Map to the localization strings
    'tags': 'mouseovertext: div.user-tags a, a.badge-tag',
    'badges': 'text: a.badge',
    'perms': 'text: div.related div.spacer strong, div.related div.spacer a',
    'badgedesc': 'html: div#mainbar div table tbody tr td',
    'sites': 'text: div#footer-sites a, div#hlogo a'
}

$.each(mappings, function(k, v) {
    strings[v] = jluVars[k]
})

strings['mouseovertext: a.post-tag'] = jluVars['tags']

//=======================================================//
//          Regular Expression Localizations             //
//=======================================================//

var regexes = {
    'html: h2.bottom-notice': [
        [/^Not the answer you're looking for\? Browse other questions tagged.*or ask your own question\.$/,
            '他の {grab|a.post-tag} にタグされた質問を閲覧して、それとも'+ // FIXME!
            '{a|ask your own question|自分の質問をします}。'],
        
        [/^Browse other questions tagged.*/,
            '他の {grab|a.post-tag} にタグされた質問を閲覧します。']
    ],
    
    //=======================================================//
    //             Reputation Score Localization             //
    //=======================================================//
    
    /*
     * Localize e.g. "6234 reputation" in the title 
     * attributes of people's names in comments
    */
    'title: a.comment-user': [
        [/^([0-9]+) reputation$/, '{match|1|number}信用度']
    ],
    'title: span.reputation-score': [
        [/^([0-9k,])+$/, '{match|1|number}'],
        
        [/^reputation score ([0-9]+)$/, '{match|1|number}信用度'],
        [/^reputation score$/, '信用度スコア'],
        
        [/^reputation this week ([0-9]+)$/, '今週の信用度スコアは{match|1|number}'],
        [/^reputation this week$/, '今週の信用度スコア'],
        
        [/^reputation this month ([0-9]+)$/, '今月の信用度スコアは{match|1|number}'],
        [/^reputation this month$/, '今月の信用度スコア'],
        
        [/^reputation this quarter ([0-9]+)$/, '三ヶ月間の信用度スコアは{match|1|number}'],
        [/^reputation this quarter$/, '三ヶ月間の信用度スコア'],
        
        [/^reputation this year ([0-9]+)$/, '今年の信用度スコアは{match|1|number}'],
        [/^reputation this year$/, '今年の信用度スコア']
        
    ],
    'html: span.reputation-score': [
        [/^(.*)$/, '{match|1|number}']
    ],
    
    //=======================================================//
    //                       Page Views                      //
    //=======================================================//
    
    // Process the "X views" items in the 
    // "unanswered questions" tab
    // FIXME: Don't process on the main page! ===========================================
    'html: div.views': [
        [/^([0-9]+) view(s?)$/, '{match|1|number}閲覧数']
    ],
    
    //=======================================================//
    //                   Date Localization                   //
    //=======================================================//
    
    // OPEN ISSUE: Move date-brick and date to their own handlers? ==========================
    // div.date_brick, div.date
    'text: span.relativetime, span.comment-date span, p.label-key b, td.cool, td.warm, td.rep-time, td.rep-day': [
        [/^(.*)$/, '{match|1|date}']
    ],
    
    'html: div#seContainerNotices div.noticeBox div.siteInfo p': [
        [/^Congrats, you've gained the privilege – (.*?) learn more$/,
         'おめでとう！「{jluvar|1|perms}」という特権を得ました。 {a|learn more|詳しい情報…}'], // CHECK ME! ==============
        
	[/^You've earned the "(.*?)" badge\. See your profile\.$/,
         '「{jluvar|1|badges}」というバッジを得ました。あなたの{a|profile|プロフィール}をご覧ください。'],
	 
	 [/^You've earned the "(.*?)" badge\.$/,
         '「{jluvar|1|badges}」というバッジを得ました。'],
	
        // TODO: Fix the hyperlink rewriting for the question title!
        [/^You've earned the "(.*?)" badge for (.*?)\. See your profile\.$/,
         '「{match|2}」という質問では「{jluvar|1|badges}」というバッジを得ました。あなたの{a|profile|プロフィール}をご覧ください。'],
        
        [/^You've earned "(.*?)" and ([0-9]+) other badge(s?)\. See your profile\.$/,
         '「{jluvar|1|badges}」というバッジとともに、他の{match|2}個のバッジを得ました。あなたの{a|profile|プロフィール}をご覧ください。'],
    
	[/^Your question (.*?) was edited.$/,
	 '「{match|1}」という質問への編集がありました。'],
	 
	[/^An edit was suggested to your post (.*?), please review it.$/,
	 '「{match|1}」という質問への修正案がありました。その修正案を{a|review it|レビュー}してください。'],
	
	[/^Your answer (.*?) was edited.$/,
	 '「{match|1}」という回答への編集がありました。']
    ],
    
    //=======================================================//
    //                 User Activity Dropdown                //
    //=======================================================//
    
    'html: span.popup-clock': [
        [/^UTC time ([0-9]+):([0-9]+)$/, '協定世界時{match|1}時{match|2}分']
    ],
    
    //=======================================================//
    //                  Chat Link (in Meta)                  //
    //=======================================================//
    
    'html: a#h-chat-link': [
        [/^([0-9]+) (People|Person) Chatting$/, '{match|1}人はチャット中']
    ],
    
    //=======================================================//
    //                         Tags                          //
    //=======================================================//
    
    'html: div.stats-row a': [
        [/^([0-9]+) asked this week$/, '今週{match|1}つの質問'],
        [/^([0-9]+) this week$/, '今週{match|1}つの質問'],
        
        [/^([0-9]+) asked this month$/, '今月{match|1}つの質問'],
        [/^([0-9]+) this month$/, '今月{match|1}つの質問'],
        
        [/^([0-9]+) asked today$/, '今日{match|1}つの質問']
    ],
    
    'html: div.stats-row': [
        [/^created (.*)$/, '作成時間{match|1|date}']
    ],
    
    // Specific tag feeds
    'html: div#feed-link-text a': [
        [/^newest (.*?) questions feed$/, '最新{jluvar|1|tags}のタグの質問RSSフィード']
    ],
    
    //=======================================================//
    //                    Misc Tooltips                      //
    //=======================================================//
    
    // Page result tooltips
    'title: div.pager a': [
        [/^go to page ([0-9]+)$/, 'ページ{match|1}へ']
    ],
    
    'title: a.page-numbers': [
        [/^show ([0-9]+) items per page$/, 'ページごとに{match|1}件']
    ],
    
    // Badge tooltips:
    // * at the top of the screen
    // * in the "less info" user profile mode
    // * in the user "business card" popup
    'title: span#hlinks-user span, div.badges span span, div.um-flair span, td.badges span, div.user-details span': [
        [/^([0-9]+) gold badge(s?)$/, '{match|1}つの金色バッジ'],
        [/^([0-9]+) silver badge(s?)$/, '{match|1}つの銀色バッジ'],
        [/^([0-9]+) bronze badge(s?)$/, '{match|1}つの青銅バッジ']
    ],
    
    'title: a.badge': [
        [/^gold badge: (.*?)$/, '金バッジ：{jluvar|1|badgedesc}'],
        [/^silver badge: (.*?)$/, '銀バッジ：{jluvar|1|badgedesc}'],
        [/^bronze badge: (.*?)$/, '銅バッジ：{jluvar|1|badgedesc}']
    ],
    
    //=======================================================//
    //                   League Rankings                     //
    //=======================================================//
    
    'html: div#leagueRank a': [
        [/top ([0-9]+)% this week/, '今週は上位{match|1}％'], // CHECK ME!
        [/top ([0-9]+)% this month/, '今月は上位{match|1}％'],
        [/top ([0-9]+)% this quarter/, 'この四半期は上位{match|1}％'],
        [/top ([0-9]+)% this year/, '今年は上位{match|1}％'],
        [/top ([0-9]+)% this quarter/, '今週は上位{match|1}％']
    ],
    
    //=======================================================//
    //                 Stack Exchange Popup                  //
    //=======================================================//
    
    'text: div#seContainerInbox div.itemBox div.siteInfo p': [
        [/^([0-9]+) comments on$/, '{match|1}個のコメント'],
        [/^([0-9]+) answers on$/, '{match|1}個の回答']
    ],
    
    //=======================================================//
    //                    User Profiles                      //
    //=======================================================//
    
    'text: td.rep-desc': [
        [/^([0-9]+) vote(s?)$/, '{match|1}投票数'],
        [/^([0-9]+) event(s?)$/, '{match|1}個の更新']
    ],
    
    // "visited: X days, X consecutive"
    'text: span#days-visited': [
        [/^([0-9]+) day(s?), ([0-9]+) consecutive$/, '{match|1}日、{match|3}日は連続的'],
        [/^([0-9]+) day(s?)$/, '{match|1}日']
    ],
    
    'text: div.account-site div.cool': [
        [/^Joined (.*?), last seen (.*?)$/, '{match|1|date}に登録した、最終活動は{match|2|date}']
    ],
    
    // "copy to all accounts" button
    'value: input#push-profile': [
        [/^Copy (.*) profile to all Stack Exchange accounts$/,
         '{match|1}プロフィールをすべてのStack Exchangeアカウントにコピーする']
    ],
    
    //=======================================================//
    //                  Comment Help Text                    //
    //=======================================================//
    
    'text: span.text-counter': [
        [/^enter at least 15 characters$/, 'せめて15字を入力してください'],
        [/^([0-9]+) more to go.*/, 'まだ{match|1}字が必要…'],
        [/^([\-0-9]+) characters left.*/, '{match|1}字が残っている']
    ],
    
    //=======================================================//
    //                    Answer Pages                       //
    //=======================================================//
    
    'text: div.subheader h2': [
        [/^([0-9]+) Answer(s?)$/, '{match|1}回答数']
    ],
    
    'title: span.vote-accepted-on': [
        [/^The question owner accepted this as the best answer (.*?)$/, 
         '{match|1|date}にこの質問は質問者によってベストアンサーに選ばれた']
    ],
    
    //=======================================================//
    //                     Tag Popups                        //
    //=======================================================//
    
    'text: span.tm-sub-info': [
        [/^([0-9]+) follower(s?)$/, '{match|1}フォロワー数']
    ],
    
    //=======================================================//
    //                     Users Page                        //
    //=======================================================//
    
    'text: div.user-details': [
        [/^([0-9]+) in ([0-9]+) day(s?)$/, '{match|2}日に{match|1}信用度']
    ],
    
    'text: div.user-tags': [
        [/^([0-9]+) edit(s?)$/, '{match|1}編集数']
    ],
    
    'text: div.siteInfo p a': [
        [/^(.*)$/, '{jluvar|1|sites|lower}']
    ],
    
    //=======================================================//
    //                Close Question Reasons                 //
    //=======================================================//
    
    'html: span.action-desc': [
        ['^This question covers exactly the same ground as earlier questions on this topic; '+
        'its answers may be merged with another identical question\\.$',
    
            'この質問は前の質問に同じで、回答は他の質問に統合する可能性はあります。'],
    
        ['^Questions on (.*?) - Stack Exchange are expected to '+
        'generally relate to (.*?), within the scope defined in the faq\\.$',
            
            '{a|faq|よくある質問}に従って、「{jluvar|1|sites|lower}、Stack Exchange」'+
            'への質問は「{match|2}」にかかわる内容です。'],
        
        /*['^Questions on (.*?) Meta - Stack Exchange are expected to be '+
        'discussion, support, and feature requests for (.*?) - Stack Exchange\\.$',
        
            ''],*/
        
        ['^This question is not a good fit to our Q&A format. We expect answers to generally '+
        'involve facts, references, or specific expertise; this question will likely '+
        'solicit opinion, debate, arguments, polling, or extended discussion\\.$',
        
            'この質問は私たちの質問や回答フォーマットに合っていません。'], // FIXME!
    
        ['^It\'s difficult to tell what is being asked here. This question is ambiguous, '+
        'vague, incomplete, or rhetorical and cannot be reasonably answered in its current '+
        'form\\.$',
    
            'この質問は分かりにくいです。この質問はあいまいやはっきりしないや未完成や修辞学的で、'+
            '現在の型では合理的に答えられません。'],
    
        ['^This question is unlikely to ever help any future visitors; it is only relevant '+
        'to a small geographic area, a specific moment in time, or an extraordinarily '+
        'narrow situation that is not generally applicable to the worldwide audience of '+
        'the internet\\.$',
        
            'この質問は将来の訪問者を役に立たない可能性は高いです。'+
            '小さい地理的な領域やある瞬間やとても狭い状況で、'+
            'インターネットの世界中の聴衆を一般的に適用ではありません。']
    ]
}

/*
/^([0-9]+) more vote(s?) needed to close this question$/:
''*/

var jluLoc = {
    firstTime: true,
    
    init: function() {
        // Poll for changes in certain elements
        function poller() {
            jluLoc.poll()
        }
        setInterval(poller, 400) // WARNING! ==================================================
        this.poll()
        
        // Remove the toolbar etc images and replace them with text
        this.removeImages()
        // Localize comments
        // ("show X more comments" and "edited X times" etc)
        this.localizeComments()
    },
    
    poll: function() {
        /*
         * Certain elements are generated in JavaScript, so poll 
         * every so often to check for changes
         * 
         * OPEN ISSUE: Exclude keys once they've been found to save resources?
         */ 
        
        var a = [
            // overview user profile tabs
            'div#user-panel-answers',
            'div#user-panel-questions',
            'div#user-panel-badges',
            'div#user-panel-bounties',
            
            // other user profile tabs
            'div#user-tab-answers',
            'div#user-tab-questions',
            'div#user-tab-tags',
            'div#user-tab-badges',
            'div#user-tab-favorites',
            'div#user-tab-bounties',
            'div#user-tab-reputation',
            'div#user-tab-responses',
            'div#user-tab-activity',
            
            // reputation tab
            'tr.loaded-body',
            'tr.rep-breakdown-row',
            
            // tag popups
            'div#tag-menu',
            
            // wmd editor
            'div.post-editor',
            'div#mdhelp',
            
            // stack exchange popup
            'div#seWrapper',
            'div#seContainerHot',
            'div#seContainerSites',
            'div#seContainerInbox',
            'div#seContainerEmail',
	    'div#seContainerNotices',
            
            // "my info" popup
            'div.profile-popup',
            'div.profile-stats div',
            
            // chat feature link (in meta)
            'div#chat-feature h4',
            
            // comments
            'div.comments table tbody',
            
            // questions/answers (CHECK ME!)
            'div.answer table tbody tr',
            'div.post-text',
            'div.post-taglist',
            'table.fw tbody tr',
            
            // close dialog
            'div#pane-main',
            'div.popup-actions div'
        ]
        var x, 
            i = 0, 
            reprocess = false
        
        if (this.firstTime) {
            // Localize all the elements once 
            // the first time this code is run
            this.firstTime = false
            reprocess = true
        }
        
        while (x=a[i++]) {
            // Poll certain container elements, when the child element's 
            // `processed` attribute doesn't exist, assume the innerHTML has 
            // been replaced or a new element so reprocess the document
            
            $(x).each(function() {
                var fc = this.firstChild
                if (!fc || fc.processed) {
                    return
                }
                
                reprocess = true
                fc.processed = true // IE textnode WARNING! ====================================
            })
        }
        
        if (reprocess) {
            // Only reprocess the document once!
            log('reprocess!')
            jluLoc.processAll()
        }
        
        i=0, a = [
            // chat link in meta
            'html: a#h-chat-link',
            // "x characters to go" etc hints under comments
            'text: span.text-counter',
            // toggle full/mini view in user profiles
            'clicktext: a.toggle-summary',
            // anonymous controls
            'text: div.was-this-helpful',
            'value: input.anon-vote'
        ]
        while (x=a[i++]) {
            // Poll some specific keys
            if (x in strings) {
                this.localizeStrings(x)
            }
            
            if (x in regexes) {
                this.localizeRegExp(x)
            }
        }
        
        this.updateCommentTooltips()
        
        // For the time being, replace the WMD help button with
        // links to the English full help and Japanese quick guide
        $('li.wmd-help-button').replaceWith(
            '<div style="position: absolute; right: 0px; top: 3px">'+
            
            '<a target="_blank" href="/editing-help">'+
            '英語編集ヘルプへ»</a>&nbsp;&nbsp;&nbsp;'+
            
            '<a target="_blank" '+
            'href="http://meta.japanese.stackexchange.com/questions/625/#626">'+
            '日本語編集ガイドへ»</a>'+
            
            '</div>'
        )
        //$('div.mdhelp').css('display', 'none') // HACK! ========================================
        
        //$('div#notify-container').css('display', 'none') // HACK! ============================
    },
    
    processAll: function() {
        // Localize any relevant (basic) text
        $.each(strings, function(key) {
            //log(key)
            jluLoc.localizeStrings(key)
        })
        
        // Localize using regular expressions for 
        // things that can't use the simple method
        $.each(regexes, function(key) {
            //log(key)
            jluLoc.localizeRegExp(key)
        })
    },
    
    //=======================================================//
    //                   Basic Localization                  //
    //=======================================================//
    
    /*
     * Localize elements matching the conditions 
     * of `key` in the format:
     * 
     * "{i18n type}: {sizzle selector}"
     * i18n type: can be text or other DOM attributes 
     *            such as "title" or "value"
     * sizzle selector: see http://api.jquery.com/category/selectors/
     */
    
    localizeStrings: function(key, noLog) {
        var a = key.split(': '),
            typ = a[0],
            cls = a.slice(1).join(': ')
        
        $(cls).each(function() {
            var txt = jluLoc._getText(this, typ)
            
            // Get the localized string
            var i18n = strings[key][txt]//||'PLEASE FILL ME IN!'
            if (i18n==null) {
                if (!noLog && 'Top Questions'==txt) {
                    log('not found: "'+key+'" "'+txt+'"')
                }
                return
            }
            
            jluLoc.localize(txt, i18n, this, typ, null)
        })
    },
    
    localizeRegExp: function(key, noLog) {
        var a = key.split(': '),
            typ = a[0],
            cls = a.slice(1).join(': ')
        
        $(cls).each(function() {
            var txt = jluLoc._getText(this, typ),
                elm = this
            
            $.each(regexes[key], function(i, x) {
                var regex = x[0],
                    i18n = x[1],
                    match = txt.match(regex)
                
                if (!noLog) {
                    //log('regex: '+regex+' match: '+match+' txt: '+txt+' i18n: '+i18n)
                }
                
                if (match) {
                    jluLoc.localize(txt, i18n, elm, typ, match)
                }
            })
        })
    },
    
    _getText: function(elm, typ) {
        if (typ in {text:0, mouseovertext:0, clicktext:0}) {
            return jluLoc._getFirstText(elm)
        }
        else if (typ=='html') {
            return getText(elm)
        }
        else {
            return $.trim(elm[typ])
        }
    },
    
    localize: function(origTxt, i18n, elm, typ, match) {
        var a = [], 
            dateLoc = false
        
        $.each(i18n.split('{'), function(i, x) {
            var split, cmd, args, txt
            
            if (!i) {
                txt = x
            }
            else {
                split = x.split('}')
                cmd = split[0].split('|')[0]
                args = split[0].split('|').slice(1)
                txt = split.slice(1).join('}')
                
                if (cmd=='grab') {
                    // Grab elements using a sizzle selector
                    a.push($(elm).find(args[0]))
                }
                else if (cmd=='match') {
                    // Use a match from the regular expression 
                    // (if called from localizeRegExp)
                    //
                    // argument 1 -> the match number
                    // argument 2 -> `date` for converting 
                    //               dates and `number` for numbers
                    
                    var out = match[args[0]]
                    if (args[1]=='date') {
                        out = jluLoc.localizeDate(out)
                        dateLoc = true
                    }
                    else if (args[1]=='number') {
                        out = jluLoc._numConvert(out)
                    }
                    a.push(out)
                }
                else if (cmd=='a') {
                    // Grab an existing <a href...> element matching 
                    // `txt`, and set the HTML to `newHTML`.
                    
                    a.push($(elm).
                        find('a:contains('+args[0]+')').
                        html(args[1]).
                        remove()
                    )
                }
                else if (cmd=='jluvar') {
                    var map = jluVars[args[1]],
                        key = match[args[0]]
                    
                    if (args[2] == 'lower') {
                        key = key.toLowerCase()
                    }
                    
                    a.push(key in map? map[key]:key)
                }
            }
            
            if (txt) {
                a.push(txt)
            }
        })
        
        // Set the new value
        var joined = a.join('')
        if (typ in {text:0, mouseovertext:0, clicktext:0}) {
            jluLoc._setFirstText(elm, joined)
        }
        else if (typ=='html') {
            var ielm = $(elm)
            ielm.html('').append.apply(ielm, a)
        }
        else {
            elm[typ] = joined
        }
        
        if (typ=='mouseovertext') {
            // Some elements, for example tag elements need the text in 
            // them for certain AJAX-related things, so restore them 
            // when they're moused over!
            
            $(elm).
                mouseover(function() {
                    jluLoc._setFirstText(elm, origTxt)
                }).
                mouseout(function() {
                    jluLoc._setFirstText(elm, joined)
                })
        }
        else if (typ=='clicktext') {
            $(elm).click(function() {jluLoc._setFirstText(elm, origTxt)})
        }
        
        // Localize "modified", "edited" etc if the element was localized 
        // for dates and is an HTML element (not a DOM attribute)
        if (typ in {text:0, html:0} && dateLoc) {
            jluLoc.localizeDateType(elm)
        }
    },
    
    //=======================================================//
    //                  Set Text Node Text                   //
    //=======================================================//
    
    _setFirstText: function(elm, txt) {
        /*
         * Replace the node value of only the first text node so that in 
         * e.g. `<div><img...> my text<div>` modifying `div` doesn't 
         * delete the `img` tag!
         */
        
        var node = this._findTextNode(elm)
        if (node) {
            // Add whitespace (if there was any) before the original text
            // This is for fixing the whitespace before badges etc
            var nV = node.nodeValue
            if (nV.charAt(0) && !$.trim(nV.charAt(0))) {
                txt = nV.charAt(0)+txt
            }
            node.nodeValue = txt
        }
    },
    
    _getFirstText: function(elm, txt) {
        /*
         * Find the text of *only the first text 
         * node which isn't blank or only whitespace*
         */
        var node = this._findTextNode(elm)
        return node? wsProcess(node.nodeValue):''
    },
    
    _findTextNode: function(elm) {
        /*
         * Find the first text node (if there is one)
         */
        var node, i=0
        while (node=elm.childNodes[i++]) {
            if (node.nodeType==TEXT_NODE && $.trim(node.nodeValue)) {
                return node
            }
        }
    },
    
    //=======================================================//
    //                  Comment Localization                 //
    //=======================================================//
    
    localizeComments: function() {
        /* 
         * Convert the "show X more comments" links in comments
         */
        
        $('a.comments-link').each(function() {
            var a = [
                [/^show ([0-9]+) more comment(s?)$/, 
                 'つのコメントを見せる'],
                     
                [/^add \/ show ([0-9]+) more comment(s?)$/,
                 'つのコメントを見せて、またはコメントを追加する']
            ]
            
            var x, i=0
            while (x=a[i++]) {
                var match = getText(this).match(x[0])
                if (match) {
                    // HACK: I can't seem to change the text of these elements, 
                    // as the events stop working. Therefore, make the 
                    // original text white and prepend other text
                    // (until I can find a better solution)
                    this.style.color = 'white'
                    this.style.background = 'transparent'
                    
                    $('<a class="comments-link">'+match[1]+x[1]+'</a>').
                        insertBefore(this.firstChild)
                 }
            }
        })
    },
    
    updateCommentTooltips: function() {
        $('span.text-counter').each(function() {
            // To reduce flicker, create a new element before the 
            // original element (if one hasn't already been)
            // and copy the other classname
            
            if (this==this.parentNode.firstChild) {
                this.style.visibility = 'hidden'
                $('<span></span>').insertBefore(this)
            }
            
            var elm = this.parentNode.firstChild
            $(elm).text($(this).text())
            elm.className = this.className.replace('text-counter', ' ')
        })
    },
    
    //=======================================================//
    //                   Date Localization                   //
    //=======================================================//
    
    localizeDateType: function(elm) {
        // Convert the "asked", "edited", "modified" texts
        // and append them after the date
        var dateType = jluLoc.popDateType(elm)
        if (dateType) {
            var node = document.createTextNode(dateType[1])
            dateType[0].appendChild(node)
        }
    },
    
    localizeDate: function(txt) {
        /*
         * TODO: Localize e.g. "Dec 18 '11 at 2:59" in comments etc!
         */
        
        if (txt.indexOf(' time')!=-1) { // time/times
            // HACK: Special processing for the "viewed X times" 
            // items in the panel on the right
            return jluLoc._numConvert(txt.split(' ')[0])
        }
        
        txt = txt.toLowerCase().replace(' ago', '前')
        $.each([// HACK: months aren't shortened, so I'm using "r"
                'years|y', 'months|r', 'days|d',
                'minutes|m', 'hours|h', 'mins|m', 'secs|s'], function() {
            
            // Shorten all of the times to single chars to 
            // allow processing by _numConvert() below
            var a = this.split('|')
            txt = txt.replace(' '+a[0], a[1])
            txt = txt.replace(' '+a[0].split('').slice(0, -1).join(''), a[1])
        })
        
        // TODO: Fill in the missing strings here, 
        // e.g. "2 days before" etc if they exist
        var other = {
            'just now': 'たった今',
            'today': '今日',
            'yesterday': '昨日'
        }
        
        if (txt in other && other.hasOwnProperty(txt)) {
            // A "special" static time
            return other[txt]
        }
        else if (txt.indexOf(' at ') != -1) {
            // "Dec 29 at 9:16"
            // "Jun 1 '11 at 2:27"
            // "Dec 25 '11 at 5:55" format
            
            var a = txt.split(' at '),
                date = this.convertDate(a[0]),
                time = this.convertTime(a[1])
            return date+' '+time
        }
        else if (txt.indexOf(':') != -1) {
            return this.convertTime(txt)
        }
        else if (txt.split(' ')[0] in this._months) {
            return this.convertDate(txt)
        }
        else {
            // "1d ago" etc format
            return jluLoc._numConvert(txt)
        }
    },
    
    convertDate: function(txt) {
        var date = txt.replace("'", '').split(' '),
            month = date[0],
            day = date[1],
            year = date[2]
        
        return ((year? year+'年':'')+
                jluLoc._months[month]+'月'+
                day+'日')
    },
    
    convertTime: function(txt) {
        var time = txt.split(':'),
            hour = time[0],
            min = time[1]
        
        return hour+'時'+min+'分'
    },
    
    _months: {
        'jan': '1',
        'feb': '2',
        'mar': '3',
        'apr': '4',
        'may': '5',
        'jun': '6',
        'jul': '7',
        'aug': '8',
        'sep': '9',
        'oct': '10',
        'nov': '11',
        'dec': '12'
    },
    
    popDateType: function(elm) {
        if (!elm.parentNode) {
            return // WTF?
        }
        
        var node = elm.parentNode
        if ('tagName' in node && node.tagName.toLowerCase()=='a') {
            // an "edited revision" hyperlink on questions/answers etc 
            // (for viewing revisions), so go up once more
            return this.popDateType(node)
        }
        node = node.firstChild
        
        if (node && node.nodeType==TEXT_NODE) {
            var txt = node.nodeValue
            elm.parentNode.removeChild(node)
            
            var value = this._dateTypes[$.trim(txt)]
            if (value) {
                return [elm.parentNode, value]
            }
        }
    },
    
    _dateTypes: {
        // These need to be checked!
        asked: 'に質問',
        edited: 'に編集',
        modified: 'に修正'
    },
    
    //=======================================================//
    //                   Image Localization                  //
    //=======================================================//
    
    removeImages: function() {
        /*
         * Removes the "Questions", "Tags", "Users", "Badges", 
         * "Unanswered", "Ask Question" images and shows the 
         * hidden text underneath so that the localized text 
         * will be displayed
         */
        
        var a = [//'div#content',
                'div#hlogo a',
                'h1#h-top-questions',
                
                '#nav-questions', 
                '#nav-tags', 
                '#nav-users', 
                '#nav-badges', 
                '#nav-unanswered', 
                '#nav-askquestion', 
                //.nav .youarehere, 
                //.fb-share, 
                //.twitter-share
                
                '#h-top-questions',
                '#h-all-questions',
                '#h-tags',
                '#h-users',
                '#h-badges',
                '#h-unanswered-questions',
                '#h-interesting-tags',
                '#h-ignored-tags',
                '#h-recent-tags',
                '#h-recent-badges',
                '#h-legend',
                '#h-linked',
                '#h-related',
                '#h-related-tags',
                '#h-unanswered-tags',
                '#h-meta',
                '#h-chat-link']
        
        var x, i=0
        while (x=a[i++]) {
            jluLoc._imageToText(a[i])
        }
    },
    
    _imageToText: function(elm) {
        $(elm).css({
            'textIndent': '0',
            //'whiteSpace': 'nowrap',
            'width': 'auto',
            'background': 'none'
        })
    },
    
    //=======================================================//
    //                     Miscellaneous                     //
    //=======================================================//
    
    _numConvert: function(s) {
        var c, i=0, 
            a = [], 
            s = s.split('')
        
        while (c=s[i++]) {
            a.push(this._nums[c]==null? c
                                      : this._nums[c])
        }
        return a.join('')
    },
    
    _nums: {
        //0: '０',    
        //1: '１', 2: '２',    3: '３', 
        //4: '４', 5: '５',    6: '６',
        //7: '７',    8: '８', 9: '９',    
        'k': '千', 
        'm': '分',
        'h': '時間',
        'd': '日',
        'r': '月', // HACK!
        'y': '年',
        's': '秒'
        //'.': '．',
        //',': ''
    }
}

if (window.localStorage) {
    // Add a "English"/"Japanese" toggle to the toolbar 
    // above if the browser supports localStorage
    var jMode = localStorage.getItem('jMode')
    
    if (jMode) {
        jluLoc.init()
    }
    
    function toggleJMode() {
        if (jMode) {
            localStorage.removeItem('jMode')
        }
        else {
            localStorage.setItem('jMode', '1')
        }
        window.location.reload()
    }
    
    $('span#hlinks-custom').
        append('<span class="lsep">|</span>&nbsp;')
    
    $('<a href="javascript: void(0)">'+(jMode? 'English':'日本語版')+'</a>').
        appendTo($('span#hlinks-custom')).
        click(toggleJMode)
}
else {
    jluLoc.init()
}

});
