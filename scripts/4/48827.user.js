// ==UserScript==
// @name           Sleipnir Start:hbtimemachine2
// @version        0.0.1
// @namespace      http://d.hatena.ne.jp/kiyotaka_h/
// @description    全自動ブックマーク棚卸し RSS を http://www.sleipnirstart.com/ で手軽に利用。 RSS は id:nitoyon さん作成のものを利用させていただいています。 http://d.hatena.ne.jp/nitoyon/20090512/zenjido_bkm
// @include        http://www.sleipnirstart.com/
// ==/UserScript==

(function(){
    var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;


    // ここから設定
    var user_id = "nitoyon";  // 知りたいはてなユーザーIDを指定
    var month_ago = 12;  // 何ヶ月前の今日のはてブ棚卸しをしたいのかを指定

    w.rssViewNum = 30;  // ニュースの取得件数 1～30(あるだけいける 50 なんかも可)
    w.newsRssCustom = true;  // ニュースのカスタマイズを有効にする true / false
    var doAutoNewsMode = true;  // 自動でニュースを開く true / false
    // ここまで設定 



    /* ここからニュースカスタマイズ
    [title] に、RSS のタイトルが表示されます。お好みに応じて、A タグなどでリンクをつけてください。
    [url] に、RSS のアドレスを入力してください。（SSL には対応していません。）
    ※ [title] にタグを使う場合は、￥マーク＋シングルコーテーションなどに気をつけてください。
    */
    w.RSS_CUSTOM_CUSTOM = // カスタマイズタブ
    [
        {
            title: user_id+'さんの全自動はてブ棚卸し ('+month_ago+'ヶ月前)',
            url: 'http://pipes.yahoo.com/pipes/pipe.run?_id=4f3e5bcb3d348cbf8f31135eb0912ab2&_render=rss&ago='+month_ago+'&user='+user_id
        },
        {
            title: user_id+'さんのはてブ',
            url: 'http://b.hatena.ne.jp/'+user_id+'/rss'
        },
        {
            title: user_id+'さんのお気に入りのはてブ',
            url: 'http://b.hatena.ne.jp/'+user_id+'/favorite.rss'
        }
    ];

    w.RSS_CUSTOM_HBHOT = // はてブ人気エントリータブ
    [
        {
            title: '<a href=\'http://b.hatena.ne.jp/hotentry?mode=general\'>一般</a>',
            url: 'http://b.hatena.ne.jp/hotentry.rssfb?mode=general'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/hotentry/it\'>コンピュータ・IT</a>',
            url: 'http://b.hatena.ne.jp/hotentry/it.rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/hotentry/social\'>社会</a>',
            url: 'http://b.hatena.ne.jp/hotentry/social.rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/hotentry/economics\'>政治・経済</a>',
            url: 'http://b.hatena.ne.jp/hotentry/economics.rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/hotentry/life\'>生活・人生</a>',
            url: 'http://b.hatena.ne.jp/hotentry/life.rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/hotentry/entertainment\'>スポーツ・芸能・音楽</a>',
            url: 'http://b.hatena.ne.jp/hotentry/entertainment.rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/hotentry/knowledge\'>科学・学問</a>',
            url: 'http://b.hatena.ne.jp/hotentry/knowledge.rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/hotentry/game\'>ゲーム・アニメ</a>',
            url: 'http://b.hatena.ne.jp/hotentry/game.rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/hotentry/fun\'>おもしろ</a>',
            url: 'http://b.hatena.ne.jp/hotentry/fun.rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/video\'>動画</a>',
            url: 'http://feedproxy.google.com/hatena/b/video'
        }
    ];

    w.RSS_CUSTOM_HBNEW = // はてブ新着エントリータブ
    [
        {
            title: '<a href=\'http://b.hatena.ne.jp/entrylist/general\'>一般</a>',
            url: 'http://b.hatena.ne.jp/entrylist/general?sort=hot&threshold=&mode=rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/entrylist/it\'>コンピュータ・IT</a>',
            url: 'http://b.hatena.ne.jp/entrylist/it?sort=hot&threshold=&mode=rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/entrylist/social\'>社会</a>',
            url: 'http://b.hatena.ne.jp/entrylist/social?sort=hot&threshold=&mode=rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/entrylist/economics\'>政治・経済</a>',
            url: 'http://b.hatena.ne.jp/entrylist/economics?sort=hot&threshold=&mode=rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/entrylist/life\'>生活・人生</a>',
            url: 'http://b.hatena.ne.jp/entrylist/life?sort=hot&threshold=&mode=rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/entrylist/entertainment\'>スポーツ・芸能・音楽</a>',
            url: 'http://b.hatena.ne.jp/entrylist/entertainment?sort=hot&threshold=&mode=rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/entrylist/knowledge\'>科学・学問</a>',
            url: 'http://b.hatena.ne.jp/entrylist/knowledge?sort=hot&threshold=&mode=rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/entrylist/game\'>ゲーム・アニメ</a>',
            url: 'http://b.hatena.ne.jp/entrylist/game?sort=hot&threshold=&mode=rss'
        },
        {
            title: '<a href=\'http://b.hatena.ne.jp/entrylist/fun\'>おもしろ</a>',
            url: 'http://b.hatena.ne.jp/entrylist/fun?sort=hot&threshold=&mode=rss'
        }
    ];
    
    if(doAutoNewsMode){
        var myInterval = setInterval(function(){
          if(w.loadCompleteFlag){
            clearInterval(myInterval);
            w.chgNewsMode();
          }
        },100);
    }
})();