// ==UserScript==
// @name         NicoNicoEn
// @description  NicoNico, in English!
// @version      1.3
// @include      http://*.nicovideo.jp/*
// @include      https://*.nicovideo.jp/*
// ==/UserScript==


/***
**** Page Modification
**** Required Objects and Functions
***/
function addGlobalStyle(css) {
        var head, style
        head = document.getElementsByTagName('head')[0]
        if (!head) { return; }
        style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = css
        head.appendChild(style)
}

var trans = {
    words_so: [], //single old
    words_sn: [], //single new
    words_go: [], //global old
    words_gn: [], //global new
    
    add: function (mode, t_old, t_new) {
        if(mode == 's') {
            this.words_so.push(t_old)
            this.words_sn.push(t_new)
        }
        else if(mode == 'g') {
            this.words_go.push(t_old)
            this.words_gn.push(t_new)
        }
    },
    clear: function () {
        this.words_so.length = 0; //single old
        this.words_sn.length = 0; //single new
        this.words_go.length = 0; //global old
        this.words_gn.length = 0; //global new
    },
    translate: function (target) {
        if(typeof target == 'string') {
            target = document.getElementById(target);
        }
        
        // Grab html
        html = target.innerHTML

        // Replace words in html
        for(var i = 0; i < this.words_so.length; i++) {
            html = html.replace(new RegExp(this.words_so[i]), this.words_sn[i])
        }
        for(var i = 0; i < this.words_go.length; i++) {
            html = html.replace(new RegExp(this.words_go[i], 'g'), this.words_gn[i])
        }

        // Shove html
        target.innerHTML = html
    }
}

/* Function stolen from Netlobo becasue
**  I'm too lazy to reinvent the wheel */
document.getElementsByClassName = function(clsName){
     var retVal = new Array()
     var elements = document.getElementsByTagName("*")
     for(var i = 0;i < elements.length;i++){
          if(elements[i].className.indexOf(" ") >= 0){
                var classes = elements[i].className.split(" ")
                for(var j = 0;j < classes.length;j++){
                     if(classes[j] == clsName)
                          retVal.push(elements[i])
                }
          }
          else if(elements[i].className == clsName)
                retVal.push(elements[i])
     }
     return retVal
}


/***
**** Navbar Translation
**** Since they all use more-or-less the same navbar
***/
{
    if(window.location.hostname == 'nivent.nicovideo.jp') {
    	target = 'header'
    }
    else if(window.location.hostname == 'live.nicovideo.jp') {
    	target = 'navi'
    }
    else if(window.location.hostname == 'com.nicovideo.jp') {
    	target = 'site-head'
    }
    else if(window.location.hostname == 'ichiba.nicovideo.jp') {
    	target = 'headerNav'
    }
    else if(window.location.hostname == 'chokuhan.nicovideo.jp') {
    	target = 'CommonHeader'
    }
    else if(window.location.hostname == 'uad.nicovideo.jp') {
    	target = 'header-top'
    }
    else if((window.location.hostname == 'dic.nicovideo.jp') ||
            (window.location.hostname == 'jk.nicovideo.jp')) {
    	target = 'topline'
    }
    else if((window.location.hostname == 'app.nicovideo.jp') ||
            (window.location.hostname == 'commons.nicovideo.jp')) {
    	target = 'Topbar'
    }
    else {
        target = window.document.body.childNodes[1] // catch-all
    }


    /*** Nav
    ***/
    trans.add('g', 'ニコニコTOP', 'NicoNico')
    
    // Links
    trans.add('g', '動画', 'Videos')
    trans.add('g', '静画', 'Images')
    trans.add('g', '生放送', 'Broadcasts')
    trans.add('g', 'アプリ', 'Applications')

    // Menu
    trans.add('g', 'その他', 'More')
    
    trans.add('g', 'チャンネル', 'Channels')
    trans.add('g', '市場', 'Shop')
    trans.add('g', '実況', 'Live TV')
    trans.add('g', 'コミュ二ティ', 'Community')
    trans.add('g', 'コミュニティ', 'Community')
    trans.add('g', 'カレンダー', ' Calender') // title fix com.
    trans.add('g', 'ニベント', 'Events')
    trans.add('g', 'モバイル', 'Mobile')

    trans.add('g', '大百科', 'Guide')
    trans.add('g', 'ニコニ広告', 'NicoAds')
    trans.add('g', 'ニコニ・コモンズ', 'NicoNi Commons') // title fix app.
    trans.add('g', 'コモンズ', 'Commons')
    trans.add('g', 'チケットセンター', 'Tickets')
    trans.add('g', 'ニコニコ直販', 'Anime Store')
    trans.add('g', 'ニュース', 'News')

    // Welcome
    trans.add('g', 'ようこそ', 'Welcome, ')
    trans.add('g', 'ゲスト', 'Guest');
    trans.add('g', 'さん', '');
    trans.add('g', 'ログイン', 'Login/Register')
    trans.add('g', 'プレミアム登録', 'Upgrade')
    trans.add('g', '一般会員', 'Regular Member')

    // Links
    trans.add('g', 'マイページ', 'My Page')
    trans.add('s', 'ランキング', 'Ranking')
    trans.add('s', 'プレミアム会員登録', 'Premium')

    // Menu
    trans.add('s', 'メニュー', 'Menu')

    // Logout
    trans.add('g', 'ログアウト', 'Logout')


    if(window.location.hostname == 'www.nicovideo.jp') {

        // Links
        trans.add('s', '動画を投稿', 'Post Video')
        trans.add('s', '総合ランキング', 'Ranking')
        trans.add('s', 'ランキング', 'Ranking')
        trans.add('s', 'オススメ', 'Recommended')
        
        //Menu
        trans.add('s', 'マイリスト', 'My List')
        trans.add('s', 'ウオッチリスト', 'My Watchlist')
        trans.add('s', '投稿動画', 'My Videos')
        trans.add('s', '視聴履歴', 'History')
        trans.add('s', 'アカウント設定', 'Edit Profile')
        trans.add('s', 'リモコン', 'Remocon')
        trans.add('s', 'ヘルプ', 'Help')
    }
    else if(window.location.hostname == 'seiga.nicovideo.jp') {

        trans.add('s', 'ニコニコ動画のマイページに移動します', 'My Page'); //title attribute

        // Links
        trans.add('s', '静画ランキング', 'Ranking')
        trans.add('s', '投稿する', 'Create')
        
        //Menu
        trans.add('s', 'イラスト', 'Illustrations')
        trans.add('s', 'クリップ', 'Clips')
        trans.add('s', '定点観測', 'Personalise')
        trans.add('s', 'ブログパーツ', 'Blog Parts')
        trans.add('s', '投稿イラスト', 'My Image')
        
        trans.add('s', 'マンガ', 'Manga')
        trans.add('s', 'お気に入り', 'My Favorites')
        trans.add('s', '投稿マンガ', 'My Manga')

        trans.add('s', '電子書籍', 'Books')
        trans.add('s', '最近読んだ書籍', 'Read')
        trans.add('s', '最近購入した書籍', 'Bought')
        trans.add('s', 'Twitter連携の設定', 'Twitter')
    }
    else if(window.location.hostname == 'commons.nicovideo.jp') {

    	// Register
    	trans.add('s', 'NicoNicoVideosアカウントを新規登録', 'Register')
    	trans.add('s', '新規アカウント登録', 'Register')
    }
    else if(window.location.hostname == 'ch.nicovideo.jp') {
    	
    	// Menu
    	trans.add('s', '購入したもの', 'Purchased')
    	trans.add('g', '登録したChannels', 'Channels')
    	trans.add('s', 'ポイントの購入', 'Purchase')

    	trans.add('s', '所持ポイント', 'You have')
    }
    else if(window.location.hostname == 'chokuhan.nicovideo.jp') {

    	// Links
    	trans.add('s', '使い方ガイド', 'Help Guide')
	}
    else if(window.location.hostname == 'dic.nicovideo.jp') {

    	// Links
    	trans.add('s', '記事のランダム表示', 'Random Article')
    	trans.add('s', 'ヘルプ', 'Help')
	}
    else if(window.location.hostname == 'uad.nicovideo.jp') {

    	// Links
    	trans.add('s', 'ニコニコポイント購入', 'Purchase')
	}
	else if(window.location.hostname == 'jk.nicovideo.jp') {

    	// Links
    	trans.add('g', 'アカウント情報の管理', 'Account Info')
    	trans.add('g', 'ログアウト', 'Logout')

    	// Dumb Hack
    	trans.translate('topline_other') // main menu
    	trans.translate('topline_right') // right menu
	}
    else if(window.location.hostname == 'com.nicovideo.jp') {

    	// Links
    	trans.add('s', 'トップページ', 'Home')
	}
    else if(window.location.hostname == 'ichiba.nicovideo.jp') {

    	// Links
    	trans.add('s', 'もうすぐ発売', 'Releasing Soon')

    	// Menu
    	trans.add('s', 'まとめ買い', 'Bulk Buying')
    	trans.add('s', 'ヘルプ', 'Help')
    	trans.add('s', 'ブログ', 'Blog')
	}
	else if(window.location.hostname == 'event.nicovideo.jp') {
		
		// Links
		trans.add('g', 'ニコニコTicketsのトップページ', 'Home')
		trans.add('g', 'トップ', 'Home')
	}


    /*** Translate and Clear
    ***/
    trans.translate(target)
    trans.clear()
}



// NicoNico
/*target = window.document.body
trans.add('g', 'ニコ', 'Nico')
trans.translate(target)*/







/***
**** Page Modification
**** Everything else
***/ 

/***
**** NicoNico Portal
***/
if(window.location.hostname == 'www.nicovideo.jp' && window.location.pathname == "/") {

    /* Header
    */
    
      /* Search */
        trans.add('s', '動画', 'Videos')
        trans.add('s', 'マイリスト', 'My List')
        trans.add('s', '静画', 'Images')
        trans.add('s', '生放送', 'Broadcasts')
        //
        trans.add('s', '教えてくれ、俺はあと何回右上を考えればいい？', 'What do you truly believe you are searching for?') //WHATIS this shit
        //
        trans.translate(document.getElementById('searchFormWrap'))
        trans.clear()
        //
        addGlobalStyle('.ads_468 {visibility:hidden;} #web_pc_premium {visibility:hidden; height:30px;}')

    /* Left Sidebar
    */

      /* Services */
        trans.add('s', 'ニコニコサービス', 'NicoNico Services')
        trans.add('s', '動画', 'Videos'); trans.add('s', 'リニューアル', 'revamped')
        trans.add('s', '静画', 'Images')
        trans.add('s', '生放送', 'Broadcasts')
        trans.add('s', 'チャンネル', 'Channels')
        trans.add('s', '大百科', 'Nicopedia')
        trans.add('s', '市場', 'Market')
        trans.add('s', 'ニコニ広告', 'NicoAds')
        trans.add('s', '実況', 'Live TV')
        trans.add('s', 'コモンズ', 'Commons')
        trans.add('s', 'コミュニティ', 'Community')
        trans.add('s', 'ニコニコDVD', 'DVD Rental')
        trans.add('s', 'ニコニコ直販', 'Anime Store') //WHATIS ニコニコ直販
        trans.add('s', '遊園地', 'Park')
        trans.add('s', 'ニコゲー', 'Games')
        trans.add('s', 'モバイル', 'Mobile')
        trans.add('s', 'ニュース', 'News'); trans.add('s', '\>New\<', '\>new\<')
        trans.add('s', '一覧', 'More')
        //
        trans.translate(document.getElementById('nicoService'))
        trans.clear()

      /* Events and Promotions */
        trans.add('s', 'イベント＆キャンペーン', 'Events & Promos')
        //
        trans.translate(document.getElementById('eventCampaign'))
        trans.clear()

      /* Featured Game */
        trans.add('s', 'おすすめゲーム', 'Featured Game')
        //
        trans.translate(document.getElementById('recommendGame'))
        trans.clear()
        //
        addGlobalStyle('#recommendGame h2 { padding-left:20px; }')

    /* Content
    */
      /* TV Lineup */
        trans.add('s', '放送予定', 'TV Lineup')
        trans.add('s', 'ニコニコ生放送', 'NicoNicoBroadcasts')
        //
        trans.translate(document.getElementById('liveProgram'))
        trans.clear()

      /* Current Events */
        trans.add('s', 'ニコニコニュース', 'Current Events')
        trans.add('s', '一覧', 'More')
        //
        trans.translate(document.getElementById('topicsInner'))
        trans.clear()

      /* NicoNico News */
        trans.add('s', 'ニコニコからのお知らせ', 'NicoNico News')
        trans.add('s', '一覧', 'More')
        //
        trans.translate(document.getElementById('nicoNews'))
        trans.clear()

      /* Anime Channel */
        trans.add('s', '毎週無料配信\！最新アニメはニコニコチャンネルで\！', 'New Anime Episodes Every Week\!')
        trans.add('s', '一覧', 'More')
        //
        trans.translate(document.getElementById('anime'))
        trans.clear()

      /* Hot Videos */
        trans.add('s', '話題の動画', 'Hot Videos')
        trans.add('s', '一覧', 'More')
        //
        trans.translate(document.getElementById('hotVideo'))
        trans.clear()

      /* User Adverts */
        trans.add('s', 'ユーザーが宣伝している動画', 'User Advertisments')
        trans.add('s', '前日ディリーTOP１０より', 'Daily from last Sun\'s TOP10')
        trans.add('s', 'ニコニ広告', 'NicoAds')
        //
        trans.translate(document.getElementById('uadVideo'))
        trans.clear()

      /* Featured Videos */
        trans.add('s', 'テレ東アニメ特集', 'Featured Anime Videos')
        trans.add('s', '★前回のテーマ『サブカルチャー特集』', 'Themes from the last 『subculture★special』')
        trans.add('s', 'ニコニコチャンネル', 'NicoNicoChannels')
        //
        trans.translate(document.getElementById('featuredVideo'))
        trans.clear()

    /* Right Sidebar
    */
        addGlobalStyle('.sideBanner, .sideAd, .sideTxtAd { display:none; }')

      /* Events */
        trans.add('s', '各種ライブチケット発売中', 'Buy Tickets For These Events')
        trans.add('s', '一覧', 'More')
        //
        trans.translate(document.getElementById('liveEvent'))
        trans.clear()

      /* Popular Shows */
        trans.add('s', '人気のあった生放送', 'Popular Shows')
        //
        trans.translate(document.getElementById('popularLive'))
        trans.clear()

      /* Manga */
        trans.add('s', 'ニコニコで漫画を描いてみた', 'NicoNicoManga')
        trans.add('s', '特設ページへ', 'More')
        //
        trans.translate(document.getElementById('manga'))
        trans.clear()

      /* Popular Pic, NicoNicoBlog */
        /* This does not work for the moment. Rather than show a pic, it displays a carefully selected nothing, so I'll just disable the thing for the moment, until NicoNico gets it working properly */
        addGlobalStyle('#popularPic { display:none; }')

      /* Blog Column */
        trans.add('s', 'ニコニコラム', 'NicoNicoBlog')
        trans.add('s', '続きを読む', 'More')
        //
        trans.translate(document.getElementById('niconicolumn'))
        trans.clear()

      /* Recommended News */
        trans.add('s', '掲載記事紹介', 'Recommended News')
        trans.add('s', '一覧', 'More')
        //
        trans.translate(document.getElementById('recommendNews'))
        trans.clear()

    /* Footer
    */
      /* Ads */
        addGlobalStyle('.footerBanner { display:none }')
        addGlobalStyle('#contents { margin-bottom:0; }')
        addGlobalStyle('#contentsWrap { padding-bottom:0; }')
        addGlobalStyle('.sidewallAd { display:none; }')
        
      /* Links */
        trans.add('s', 'フィッシング詐欺にご注意！', 'Beware of Phishing!')
        trans.add('s', '利用規約', 'Terms and Conditions')
        trans.add('s', '宣言', 'Declaration')
        trans.add('s', '受賞', 'Awards')
        trans.add('s', '掲示板', 'BBS')
        trans.add('s', '広告出稿に関するお問い合わせ', 'Advertisments')
        //
        trans.translate(document.getElementById('footerWrap'))
        trans.clear()
}

/***
*** NicoNicoDouga
***/
else if(window.location.hostname == 'www.nicovideo.jp') {

    /* Header
    */
    
      /* Search */
        trans.add('s', 'ニコニコ動画', 'NicoNicoDouga')
        //
        trans.add('s', 'キーワード', 'Keyword')
        trans.add('s', 'タグ', 'Tag')
        trans.add('s', 'マイリスト', 'My List')
        //
        trans.add('s', '検索', 'Search')
        //
        trans.translate(document.getElementById('PAGEHEADER'))
        trans.clear()
        //> Ads
        addGlobalStyle('.ads_468 {visibility:hidden;} #web_pc_premium {visibility:hidden; height:30px;}')
        //> Images
        /* sw_0 */ addGlobalStyle('a.head_ssw_0 img { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAAAWCAYAAAD5Cs8YAAADN0lEQVRo3u2YWW4bMQyGda0+5dxd463e4q3enfUoLGiAAUuQlOiOPWPYDz9GEimKY32hNElfHx/hrrtOUfrWakFEMkB0/jUp+mNeYo1GwfO93YaI+ItH5zZNciM9WykI3u8iYakCtqjfKZBYa6Sf3S5EhD/Cj07nqOjcpghztzaY3u1/YKM4ufk52CRwTYMt/er14NZ0DbBRv8mwpVa/D7emO2zVwJY6wyFIfXl4OMrqN1UlebYHg0+IyF/qkrDxdfmm8vFS2HgcCZtcw4NN5mLBlnrjMUjRQrLddOVy7Y5GYeg4bOeobBwSC6rSyhaFTbNZMTTYUn8yASkKINvSfoofjWtr5eaUjMscuH4/PYWg4zE12DR7FDYZRwIlbVTZPOA02GTlkbG1sRxsaTibgZQMotm0fqSd88vZcv6aBtMp5P5Y+BjB5lVi3rcqW8lRy49Mb4y3rSqmHaMcLAmZZiu5s6XxYgFSGvWejeyRds4vZ8v5a7KgsqArqbC8b1U27xjllUt7yjZWNutu5t3ZvMqmAVhyX0uT5RKkKIBsa/3oPGn3YnvxormhLKg8MCPV0aps3jGqVTWtymkgldzd6BjVwPIqXMl9Lc3Wa5CiAFrfs/E+H9PGNb/IuiW5SFlQeWB6FXA0n//Ttyqbd4xqVS1X5ayPAmnjx6gHn2Yrua+lxXYLUhQg15fj0ubFzI3lcrD8NR/SfLOBkj8WDXirivK5XnUj2OQxqlWy3J3O+iiwrhTeXU27s5X+ayYt93uoUrRw1XGlEIbonD+7nQmWFPqiNKCozeGlnKzqRpquVkchyFHYch8EpR8I0a9RS2n9/AxViFNcVcxzaHU4ZCFDH/InKLxqx+Oj3To2CXiMj/JgQ8DoqX24lFa26DFaCtoRns3LC9yiaLNLfWnDCSzPV1Y47OM8zVfChhWJV8lS2OjYjFY29EFfFM3lstZC/7R7e4O7qtX29fUTDnxi3/JFO8GCT5xDMSiOBRtuIPYJTAk5xtSAQBGYOI/nXSLyT/v3d7irftGGWOMSTA5lLqamKnJOAOfX4eMDpC6x7i3kW2eutbxkk8G5xnzryvXiL3kN4FxjvnXk+hedV/z/+etzYwAAAABJRU5ErkJggg==); }')
        /* sw_1 */ addGlobalStyle('a.head_ssw_1 img { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAAAWCAYAAAD5Cs8YAAABzElEQVRo3u2TTW4CMQyFfY22aoGCEB0hQIhSCgLufyRW7irSyEr8xzATVC8+kTjO87MnwMtohEHgAV7HYwwCD/A2mWAQeID36RSDwAN8zGYYBB5gPJ9jEHiAz8UCKTdEvCEW97Vi9ZnyKUN4pnU9frh8i5Y2D2ZNg5RUiK5rx+t1yB7bj0QTf3QfFg2YL5dISQJ0Tc89eSmeqyXd0cSpBw2leyXNLmpqZsnV0MYsc7b2BIvVCilUJHeW21vWUp50JuVbKGlrfHhrcrPmYlxNzss9c87xtV4jNJsNUnKvnjtL55a1lCedSfkWSvekHu+pWeqR/mrmpPFS+gbSTDlgud0iJQnQdW5vvUfPOW1Oz+qNQ9L2zsNauzQjzSws3yb3TSTtHLDa7ZCSBHJ77qy9b8dy8Vyepa7GixZJ29L/PbVLM5Jmq/Gi7cHSD2z2e6QkAWlP4/SM05RikodSfi5HQqvdZU1utpq5c1o5b55vKHmH7eGAXZIKd61bC7S3PvutbbawOx6xC9qvuCvNWqH/2j7r1TQH+D6dMAg8wM/5jEHgAQ6XCwaBB0B8PL/XK1L6qPsf/A7pdZAma344z+h3KK+9N/kMD+cZ/Q7h9Q+L2uKrsadZYgAAAABJRU5ErkJggg==); }')
        /* submit */ trans.add('g', 'http://res.nimg.jp/img/base/head/search/submit.png', 'data:image/png;base64,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')
        trans.translate(document.body) // replace image urls
        trans.clear()

      /* Intro Text */
    if(window.location.href.split('/')[3] == 'video_top' || window.location.href.split('/')[3] == 'top') {
        trans.add('s', 'ニコニコ動画にようこそ！', 'Welcome to NicoNicoDouga!')
        trans.add('s', '総動画', '&nbsp;&nbsp;Total Videos:')
        trans.add('s', '本日+', 'Today ')
        trans.add('s', 'からお気に入りの動画を探してコメントしよう！', '&nbsp;&nbsp;Find and review your favorite videos!')
        //
        //translate fall-through
        
      /* Catagories */
        trans.add('g', 'カテゴリ総合', 'General')
        //
        trans.add('s', '【エンタ・音楽・スポ】', '【Entertainment】')
        trans.add('g', 'エンターテイメント', 'Entertainment')
        trans.add('g', '音楽', 'Music')
        trans.add('g', 'スポーツ', 'Sport')
        //
        trans.add('s', '【教養・生活】', '【Life】')
        trans.add('g', '動物', 'Animal')
        trans.add('g', '料理', 'Cooking')
        trans.add('g', '日記', 'Diary')
        trans.add('g', '自然', 'Nature')
        trans.add('g', '科学', 'Science')
        trans.add('g', '歴史', 'History')
        trans.add('g', 'ラジオ', 'Radio')
        trans.add('g', 'ニコニコ動画講座', 'How-To')
        //
        trans.add('s', '【政治】', '【Politics】')
        trans.add('s', '政治', 'General')
        //
        trans.add('s', '【やってみた】', '【Doing】')
        trans.add('g', '歌ってみた', 'Singing')
        trans.add('g', '演奏してみた', 'Playing')
        trans.add('g', '踊ってみた', 'Dancing')
        trans.add('g', '描いてみた', 'Drawing')
        trans.add('g', 'ニコニコ技術部', 'Technology')
        //
        trans.add('s', '【アニメ・ゲーム】', '【Culture】')
        trans.add('g', 'アニメ', 'Anime')
        trans.add('g', 'ゲーム', 'Games')
        //
        trans.add('s', '【殿堂入りカテゴリ】', '【Popular】')
        trans.add('g', 'アイドルマスター', 'Imas')
        trans.add('g', '東方', 'Toho')
        trans.add('g', '例のアレ', 'Are')
        trans.add('g', 'その他', 'Other')
        //
        trans.translate(document.getElementById('PAGEBODY'))
        trans.clear()
        //> Images
        /* g1_tab_0 */ addGlobalStyle('.bg_g1 a:link img, .bg_g1 a:visited img { background-image:url(data:image/png;base64,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); }')
        /* g1_tab_1 */ addGlobalStyle('.bg_g1 a:hover img, .bg_g1 a:active img { background-image:url(data:image/png;base64,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); }')
        /* g1_tab_2 */ addGlobalStyle('.bg_g1 a.open:link img, .bg_g1 a.open:visited img, .bg_g1 a.open:hover img, .bg_g1 a.open:active img { background-image:url(data:image/png;base64,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); }')
        /* upload */ trans.add('g', 'http://res.nimg.jp/img/index/g/btn_upload.png', 'data:image/png;base64,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')
        trans.translate(document.body)
        trans.clear()

      /* Stats Text */
        trans.add('s', '動画数：', 'Total Videos: ')
        trans.add('s', '再生数：', 'Total Views: ')
        trans.add('s', 'コメント数：', 'Comments: ')
        //
        trans.translate(document.body)
        trans.clear()

      /* Adds */
        document.getElementById('web_pc_premium').parentNode.remove()
        document.getElementById('web_pc_360').remove()
    }

    /* Videos
    */
    else if(window.location.href.split('/')[3] == 'watch') {
      /* Error - Cannot Press F5 */
        trans.add('g', 'キー操作制限：ブラウザの｢戻る｣ボタンでお戻りください', '"Reload" key disabled, please press the "Back" key to return')
      /* Error - Too Much Activity on Servers */
        trans.add('s', '混雑中です', 'Error')
        trans.add('s', 'システムの問題により一時的に応答不能になっています。', 'Unable to respond due to temporary system problems')
      /* Translate Errors */
        trans.translate(document.body)
        trans.clear()
        
      /* Video Header */
        trans.add('s', '動画の説明文', 'Information')
        trans.add('s', 'マイリストコメント', 'MyList Comments')
        trans.add('s', '投稿のユーザー動画', 'User-Submitted Video')
        trans.add('s', 'この動画は', '')
        trans.add('s', 'コミュニティに登録ができます', 'Post this video to a community')
        trans.add('s', '続きを読む', 'More')
        trans.add('s', '【編集】', '【Edit】')
        //> Months
        trans.add('s', '年', ', '); trans.add('s', '日', '')
        trans.add('s', '01月', 'January ')
        trans.add('s', '02月', 'February ')
        trans.add('s', '03月', 'March ')
        trans.add('s', '04月', 'April ')
        trans.add('s', '05月', 'May ')
        trans.add('s', '06月', 'June ')
        trans.add('s', '07月', 'July ')
        trans.add('s', '08月', 'August ')
        trans.add('s', '09月', 'September ')
        trans.add('s', '10月', 'October ')
        trans.add('s', '11月', 'November ')
        trans.add('s', '12月', 'December ')
        //> Images
        /* btn_info_open */ trans.add('g', 'http://res.nimg.jp/img/watch/btn_info_open.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAaCAYAAADyrhO6AAAEd0lEQVR42u1bO1IjMRD1mXwCqog5AbEDLuATcAIiMmICgk2XCxA45gRsulWcwMub5VGPR2t+ksEw3VVd89FI03rqp25p7NXe5Pr2NjV1seqy4slmu+00JWXJ4jxY8WZGkNTU23dE+UAQHHd//6SmLlaVCx1BnBwpKUsWJ0kSJCUlCZKS8hUEuX5ZwmxW/48/WB4eHvbPz89h2ePj4/7y8rJY/pny9PS0v7q62t/d3X0rDA8iM32zLUFowGY1G7SLi4v9+fn5lw3qzc1Npy6wB/fhdOv1uiNBJHgO5XiutaDtsbjA+c7Ozjo8gesxyRCGh9mvneebRxNBMPOenJx0oMERcR456mcQBO/22Q2k3b5ic39/XyTAIQkCbMY6FWw8lB1ThWRVTPswzAgSCGY6aMlRQSCAivskUeScKENaoeBzMFjXy52ocCydqXkP7USDy1QGbaMP7phMu6A4j1Iy6JDDOEFgI+rz3cSE9sAO3NN3lvBDn6BahmtEH60TvU8zANrIqEXc3ZY+DInznPH7kREEJAAZ+pwSwOAaDgigMCNt5YOmRh3c1xkL5yjDfdYFyCXRaBGRFfVpKwaKqQzuOUEYGfE+KM7pJHAi2oz+4bxv4JUgTFPwbo26wAvt0w6U0Vb0CX2LMFCM+LzjhvPofYoRnZx9KdkSYajvUZJMHb/jiSDKyqHjwNoDAPrsCiA4SwFcXEd1SDCuEeiU0WCMSVWcEBhgJYy2h4GC05VSLJIN11C0xXejTO3QsrEEUUKpXW4HHE4J6NeKddRe9IyWA3O2RdtKtgxh6NdTx6+lb9ZHkM1qWEcsPqN8WWcKJ4gOAuu7EsSpAGv0Ivl8RmN77uTaF9roivruRCSm9rElQRw/j9qOUYkg2teoDtplSjWWIN4uJz8l72SCNPLNNinW+vVl0XHkAh2A6G6LD+AYgnAWo0Yp0ViA4fjcIvVFe9/gRgRhZFO7IoLg/LMIEvWjhiBcS3GjpYYg3rfZBGngm+3WIDMNUDJo+OYuDNMuH2CSCsdSilYTonWds7VfNfdFEM6eJEJpNy4qQzuaWrQkiEcn1mdkrCUIcYjIP0QQT2F9UqoiSKVvtl2kzzBA807NiX1Xi7OSLgp1wHXwGOZrACYBPb3y9qL1ijoDF8a+80Q72Mc+MrUgCI7RorqE0VSC6PqEO2gsi7ac3da+sa8mSIVvtv+pyXr+V3Q4E3dKmKcrKChjOY6aknFHSHc8agFmW/5NRNvjHj+VfaAjcoeGCrKo0+I6srk1QZQUEX61BOH4sI9QOLluouia0tvuG/smBJnpm0f3Wyzux7tTMsUCcAAr2g5lmada3haux/zMofRc1B6/GTD6eDnsKn3RZp+n2uMYuF19GA3VHYObl2s/iIm/l3Wi9wEffaZ2/FrIt/mxYrTITElJgkh6oHlpSsqXEGS323Un179/5T8KU/MfhcqFF268/eUWN6Hr09PU1MUqefDuP+mMIkqU1NQlKnkATrwRhCSB5iySumQlDygfNor5QGrqEtXlH5sEt+k9zHq1AAAAAElFTkSuQmCC')
        /* btn_info_close */ trans.add('g', 'http://res.nimg.jp/img/watch/btn_info_close.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAaCAYAAADyrhO6AAAEi0lEQVR42u2bMVLkMBBFfaY5AVXEnICYgAvMCTgBERkxAQHpcgGCiTkBm24VJ5jlT9WjPo0s2WObnVp3V3WNbclSq/W/uqWZ6fZB7h4eUlNXq1E6Lq6224OmpKxZIg86HmYESU19+EKUbwTR5+7P79TU1apz4UCQSI6UlDVLJEkSJCUlCZKS8q8IsulmN/L+/n7/+vp6Mk57f3/fv7y8VO19fHw8CVtlx83NzcHmU5KWDxeRI7A5L0FkwFV3NEkErOvr6/3l5eX+9vZ2//b2dnh+cXHxY4BTnwJUJKQmlOf63Gw2n/ZFkb2qM7eob/lojD/Pzs4Ovjw1aflwEXIcgc35COIGHGGIHKbJZPXdfvQPSH+SICJCCVTPz8+HCZVNmlTd98lSBJEP1PZQ0UKzhB3HLn5O7pYPFyPHSGzOQ5CSASMMUagV+PpIEAki5wrAmvzoZFZ4aWzPy2opm8gZgahnAlzf5JLKQPQITIFDz0oRoFZWI4jGIN9534xL9qmuIrL7wX3gq7euVQ9bdE/7PJPPiWLcx8WlVCZbZIfbUvOh3vWUsDbOpbE5nSBXXVsbIofUVkYniByrewGWFAJHy2mAU2UCNO9Rpr6kuu5zskcLtwEAR6BiB6tkJAiE472tfREL8fSeymrpUOwXMgp4np66TUQRcn7s5F1IorY1Zq8f21ffusf3bq/qQ0jK8EHJlpoPIdOQcS6NzWkEUQd33bDPimjA28rPWpwgmhB3jt+rjhxZ2pCqjvoQIKTqsy/9IM2CEEQ4COOTS11fpR0cIpvK1QarJrk3ZYA03g8hiI8hlsdUL6Zc7oNS+hbb13UErpd7RNDzmi01H2r8ft8a55LYnHeT7h2PkFbO7gSJdQEvwFe5Rw4crjpRa072lCqS0ifIAV8aD5vRqKQLbkOJbHMRBB9426z0YwhS69/nRP4aShCil/vQyXsUQWbC5rwEGcjKEhh9ZRpDECYe53IKRUiHOKojQHAvrR19spqTOvj+oDW5kSC6936pGwHXOpCYmyBxHFMJQlqLTiGItz0LQY7E5klEEPLPPsA6aGI61pdWEU3IeT1lGnuaFfcjYyKIr9KlcXsZIO473ZlCkJIPVObp6RSCeCo5NsWKKSz12d+sPoKQc/oGlePU0gbZ8/S4ofMVUkTCsZ4yUa91EqJ3iER9QI3AgzD0qz585Zbd1GXcEKK1UEzdg/geIto9lSD+PuPyunH/E/vjuy8njJNt1REEp+BUTkuYvBg1AC51IQvpkLcBCYgoKOlX61iV1KwGVIDtpzxOqlju7cWy2rfLUwmi8ZL6YGcNdGMI4qTgpM7Hyskh8xX78/kvRbr/I4LM8CWdBi/1VVTXcVXlXDw+171WZGmpTO+M+YlDH4li2yKi2xOjU5+9/h3EkG+VW35plRPlSmlcqa1ae/E+joOTO+/XfT90flrjXFLyx4opKUmQlJSZCLLb7Q4Xd7+e8h+FqfmPQufCBzc+/3Krh9LN+Xlq6moVHnz5TzpRxImSmrpGhQfixCdBIIk0V5HUNSs8QL4dElMhNXWNGuUvCHPJJoO24+AAAAAASUVORK5CYII=')
        /* tag_title */ trans.add('g', '\'http://res.nimg.jp/img/watch/tag_title.png\'', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAQCAYAAACGCybUAAAA4ElEQVRIx9WWUQqCQBCGfe3JCwSBISEhISEloWGwJIj3P4SHsFaYIYaZdjbahxU+WOff2flQBJPlfW3SNDrsldjFc5qiw3qv8mYcowPlH8PgZJ5nFk1vCFD+bowakPbpCQHK3/peDchLdZpxb0vKfDxQ/tK2amAQrXE53avNNKD8uWnUwBCp/pnTvVwmnecC5U91rQaGSTVp7erlsm+g/LGq1MAQqSatfTINKH8oSzUwRKrTnPtgXT0aUH5fFEGwQvSe1n4F5Xd5Hgz6dP91Lspvsyw6UP7addGxysf8S/wCMjpz93P/ny0AAAAASUVORK5CYII=')
        /* dic_on */ trans.add('g', 'http://res.nimg.jp/img/common/icon/dic_on.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAR0lEQVQoz2MwNjb+TwpmYGD4zwBinPn/nyAGq4NpJNUmuKYzRGCQuplAp6FowgZI0nQGSYxkTcgaB6EmkvxEdOiRHE+kpj0ACnOGu2XlJ9oAAAAASUVORK5CYII=')
        /* uad_1 */ trans.add('g', 'http://res.nimg.jp/img/watch/my_btn/uad_1.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAeCAYAAAC7Q5mxAAAFC0lEQVRo3u2a308VRxTH7//Rh8YmJiRNbEgjDanEIhWKKGKAFCxYSZQXTYtEbawNIZharGhILQYEsRZJpRYLEtMKEl8a5Ic+lR/iCwngC0+F1Ecy3c/A2ezOztx7rY/uJN+wc+bMOXM+u5fdO3sTymvr6+tq9NEjderMGZWTl6cytm2LZRFsYAQrmNESAm93UZEq2LdPlR08qCoOHYplEWxgBCuBmPj35Uv12eHDPryiAwf0cayoYCMQYQa7xMrKino3M1MPFO7fr+nGcgtGsIIZ7BILCwv6880lGgNKT7CCGex8gFDNKyyMlYZgZQWYW1AQKw05AX6Un2/V0P37av75c9XR1eX0eZPkBMhzjqlPq6qUtKmnT60+b5qsAEvKy9WHubkRXbh0aQPekyf6b7k32eb3TWNjSF+ePBnx+aS4WI+5YjCHcenjZ8a1xTbHbfEldqp4rPHqtWu63sGhodB6RLCyAszeuTMiHhjX1tbUF/X1GmBbR0fEJ3/vXmVrc/PzquboUd+vtLLSt9tykSc41tPb64ybKvfAvXuh2MxxNYlHLPHjrxw3t7SEYjkBfpCTExFFTU5NRY6D+njPno2kz57pY/Rje/sGEM8W9GU+7fMjR0L2rxsatJ15Yvv51i1tY0ziomS5ifv74KC28Vf8jp84oeMgfJH0GcOH3LTvLl7052Ezc1oBFpeVqfezs0P6trlZB/yhrU33JyYndb+4tDTkl+v9Y6XNzs2F7D/19ITmI45NG+ofGND2qpqayPyvzp6NrC1Vbvqr3gm0zWHM9E83H4JVWgBHRkdDRUnxgE2nCObRiOMn9+DTOBlB3+UXL5wn4P8CpDGeLkCpj/Xa5iUFyPe897ZvD4kzuLS8rHJ27dKqrK7WCYYfPgz5MUab8RaVjn18YkLbi0pKdL/22DHdb71yJeTXffOmn49jZPrYcmBj7WZeEXbX2G937+p41N10/rzVB1YpAUpRtsbiXgcgEILAZNGcIBtAKRjha8tBwcRDM5tXnwtAMoCyPmqUk0eOlAD5kswXZNGv/f06wJ/Dw6rrxg1fY+Pj2t547pzvy51JFzo7G4rhshds3jmJRZ/iTR9EPlr96dORMTPH6uqqf4KJF1yfKXLZ8plxqV0YBMdgFQHIFk1w83BxaUkvytxUbGhq0kH/ePDAt2Xt2KFt0zMzId+a2lpt77x+PRJn7PFjPSbxWlpbIz7Mo9V5z2muTc5gbmLIMXbXHMbNtbok6wzGE1ZOgFJ4EFJQgAVwKoDMpxHPjCHFEodWWlHx2gCDcZNBfBWAfXfupAeQbRpzEleHLagJJlgExVKE+BDLFmP35vObDbwJkFgcB5Xs5AlEV24XQGLJlcwxtZgXS5BVBOA7GRlaf09Pq3+8idI3JQ+9v/T16X5mVlbkRrO4uKgueE/wrhjor7Ex7evya+/sdN7IyBnMzZqDc1mbKza+pr/EkjUF6+DRK+iXEqAsLplMH/pBpZqfbi4zri2+K8arrCOoau/59XhdnZZt3AqQjcK3t26NlYZgZb0CGXxry5ZYSQSjyBXI1xMeDrk8Y0jJBSNYwcwHyEsSbs08PMYQk8ODEaxgpgHyau6qt8fHVrW8++QzHm/dhwUTeWdOH2b6tSYvh9mZ+P7yZb3PxaUZ/4zDLtjACFYw0y/W+XmCQBweGVG9t29v7Hx0d8cKymMCGxgJPP3TDvlxEQYuST7XsdyCkcCj/QfaYqo8pz0MgAAAAABJRU5ErkJggg==')
        /* mylist_1 */ trans.add('g', 'http://res.nimg.jp/img/watch/my_btn/mylist_1.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAeCAYAAAC7Q5mxAAAEj0lEQVRo3u2a208XRxTHf/9HH4xNTEia2JBGDFFikQoCilggFAtWGkSNjSUtipYGDQ8+NA3BWgwIYi2gpqmmsSFEAX1pkEt8KldfSLi88Aapj2S6nxNnsz9+M/sbbq0Pe5JvduecM2dmP+zym73ElGerq6tq8MULdfHKFZWRlaVSdu+OZBBsYAQrmGExDe9Qfr7KOXpUFZ84oT47eTKSQbCBEaw0xNg/b96oz0+d8uHlHz8u+5ESBRsNEWawiy0tLakPUlMlkHvsmNCNZBeMYAUz2MVmZ2fl+uYUjQC5CVYwg50PEKpZubmRHAQrI8DMnJxIDrIC/Dg720l/9vaqmdevZRuW92Nzs+Qh19pa39bVSb+2jo51991uWQGyznHR9MyM0lZaXm7NG3v1ys/LKyx0ro8aGhulX/eDB+vq91/ICLCwpETty8x0UhDgrdu3jTlfnjkj8ZWVFdkeLigQ/9e1ter7a9cS8onjL/EmR5t9AXj/vnUetlrUoB/zZKtr6hh9bHI5flgZAaYfOOCkqbcA2SJTTktbm5+DZR85Iv4/njyRdv3Vq3H5XT09cX62GP5k89C1UeXp0/JHQ8QXFxdlv6isLG4cmwVr2WQFuDcjw0lT09My2K/d3bL9oqrKmKOFfZKXJ35ysdGxMT+XGAcZ9H3X0OCPkWweujaiBvZpaalf++fWVj+On9po4PlzydVt5HL8RoAFxcXqo/R0J01OTcnA5y5ckO1PLS1x8fLKSt+vczO9f7463j84KL66+npp/9LVFddG7GPEks0jWNvks0mP65IbFKy2BCADj4yOSjsYBxxWUFRkPCANGJC0F7zLjDrBGhsFqP84Yf22BSD3eR/u2eOkibcTzzh4UDXfvCn7ZRUVcfHhkZGE3GCNZwMD4u+8d0+2jdevx8VrL1/24y7z0D72tZ85VJ8/b+2vx147t2SC1ZYBzPeWJ8EDZcIYYMMAAlzb/MJCwhgbBagh/v74sV/fVmNLAXKTzA2yiyYmJ2VgfpFoDw0PCwT2f3v0SGI53q+ZKTco+mFNN24kxL65dEliHXfvOs9jrarOnvVzTGNQO6y/TbBKAMgjGtcHi+MTEzJw2v790uaOA6usrlZz8/Oq7+lTa25Q7XfuSKzGW8+tjeHDyHGdh0nElpeXJdc2flh/kzSrLQOI9CQx7iLeFYA6b9sB8phmMwA56zBAuh6kC8Chly8lL6hD3trOVpurgD70x6+vjuBVsVmAmlUCwPdTUpz09/i4DJyalub79MK3t68vaa5Wa3u7xL6qqUmI4bOZzjfVZuk0NzcXl//X0FDo+KZYmDYNEJkGtU0kbILJYia59AcyqvDWnOs9jg0B5EHhjl27IjkIVsYzkOB7O3dGChGMEs5Abk9YHHJ6RpDCBSNYwcwHyEsSfppZUEYQw+HBCFYwE4C8mrvlPbvjUbV+98k1/q49Rv+/BRP9zpw2zOS1Ji+HearxQ1OTPOfi1Iw+4zALNjCCFczkxTqfJ2iIz/r7Vc/Dh3KT3dnZGSkojwlsYKThyacd+uMiHJySXNeR7IKRhof9C5DuKi431GFfAAAAAElFTkSuQmCC')
        trans.translate(document.getElementById('WATCHHEADER'))
        trans.clear()
        //
        addGlobalStyle('#addChannelBookmark img, #addCommunity img, #addWatchlist img { background-image:url(data:image/png;base64,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); }')
        //>Ads
        addGlobalStyle('#ichiba_placeholder { display:none; }')
        document.getElementById('ichiba_placeholder').nextSibling.nextSibling.remove()

      /* Video Footer */
        trans.add('s', 'プレーヤーの使い方', 'Using the Player')
        trans.add('s', 'よくあるご質問', 'FAQ')
        trans.add('s', 'ユーザーコメントを報告', 'Report Comment')
        trans.add('s', 'この動画を報告', 'Report Video')
        //> Images
        /* blog */ trans.add('g', 'http://res.nimg.jp/img/watch/outside/blog.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAUCAYAAAByKzjvAAADn0lEQVRYw+2ZvUtcQRTF37+Ryr8jlV0gIFiksUxjIE0E2xS2AeuAqYSAdYKFVbAXBcEimsTv+BFjFDVKjIiT/Cac5XrnzVt3V90Ub+GwO2/uvXPnnDsfT4uiKMKb8fEaXQDcF8+HhkL96c4H7qMAM/Pz4erqqsY9As6vCXB5eRnxuL//xpAPsMG39/bC4dFR+H1xEX6enoZv+/vh6OQktmV/enYWfhwexue/zs9jG7uvu7vh+8FBfIYdPvTJ17ergA34n4hXbokAShZiw7OiKbCTz11M8sXwcPgwPd1RjLcTExHt+M3Mzpb2kRO5dZIXfCUCUHGgFQHkA25bgCcDA+Hd5GRHMV6Njka04nN8fBzHfjkyUtpPTvR3khd8JQKwrEEUYK74hzCXBXbyAX6Qre3tiNwk6eM7ZysBrF1VjLKx2xFAsXPjsTq8AOori1WWI3wlArAXgzIBHvT0VAI/OwDV86ivL8JWEsmzfJmAoDa2liyePR0cbPTZrYTtgWfqs9uFxqbvYW9vVgDsbExVPt9+6+K3Hc8KYPvI1wphc7Hx4CsRgEMT5ATIfejDzyakiZAMCWgvhwwIpw9YYql22qoWYrweG2vsu/SpmuyEsGHidmyRULUCsJWf31qsn8SWyNZucWnpWh9zU85VPMBXIgA3D1AlgBXCPsNPE2FSQJMgCU3GE2L3eb6pWJHnzwC1mYQqG1Bl8mNcEdBMAJECiarWsjytwF4A+rRygVaseLBVb+PDVyIAV0DQzgrAzxJFYiQqaJK3IYAIsPFl532anQFULCRpNaqSrZ+P4VcKMWweqvKyXOQHX4kA3N1BMwG079s2fpao3NXvtgSwW5U/uHNVV7UN+YPVC2CvndbW9900F/hKBNjY2YloZwXgV7W3iqx2BdAZYM8O9WHvzxi7xVQJoFieLJunF9xuMzoflDNtrXbLg88ZvhIB1ra2Itq5BeH3ZWOjMXF/y8kdilUCYGdvHrlbiSWvbGxbDLnbkF9RPk9sbExLur3pMJa/kclPt0HxnAiwvLkZ0cp7gHyABJDiVKV/m1QF5+7b/i5NNeldwBOnPh+DtvV5PzUVPi4vh4W/9nyTp3L+vL4e5hYWSmP4Z3Y+fl60c2/tngeNnQhAMqCVvwXJR/i0ttaAfba0upo8W1xZiYQAfgvWrttQnoA5ALVt7sqZ72YveYqdCGDJq3H3uCZA/c+R7iAKgBIcfjXuH3Bf8G8xftS4f8D9H4e1gNPQdzdZAAAAAElFTkSuQmCC')
        /* mixi */ trans.add('g', 'http://img.mixi.jp/img/basic/mixicheck_entry/bt_check_1.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAASCAYAAAAKRM1zAAAFYElEQVRYw82Xf2xTVRTHn8IERIcBRRRjDCr+QAIJgvwUEYcgogKCccGIAfnDHzCJESVGNEFNXEKE6CTZMDDEDbt1rqzbWtat7QYZjAr7UZgjZbAUWDfmGAzGHO3X73lvFx9jDNRE2uSb987tfe/ezz3nnnueBtsUTdeOaYbscRpyZ/aiXqUsVDUFk/ZRVmqq3lckz8k7gKiV1g1oPHUExfOB/W8AVW8Bvy+llgA1vFa+abQXvQL2202NVqBR/TOB9qMs8LxEkIWA/zVCzQPKX6bYdmCOcRW7kotw8HVg7wKE7TMRrCpAIBC44aqurkZZWVm+w+H41G63a1lZWVpaWtploP0oN4pnEYJA++OAfVMJMgnYM4EaD5Q+ZVzFLpsM+KYBFbPZZw4izvmIdLQhEoncUHV0dKC1tRWhUAgVFRWw2WyLLBZLJ6h1rIZfJyTBMx2ofhsIXwDOB4BdIwlH2AsngI4zBKMnvSOAFh/037ENhB7HRXkWcE9HOGBFOByOGrW1taGmpgYEXaxAxyGXXvJRgc+BVr8BUjoFqLcCbXWGXfUOcCKdoAcM+1QBUPwQYUdzUSaj3btSX9Frad26dUhNTb2uvj1p2bJlYHj22OfcuXMoLS2V8Xppf24ftQ3escDuR+iZe//22PGfgJ2Ded3aCVZI+GeAQx8ZdqMDKLwbKHmQoGPQnr8Q7e3tl3S1lVag/9VjApqXl3dZm3l8pdraWqSkpHyiXUx/PIhdTxByKOAcADSXGSC7JjKrxgB1Pxp2zReG7V9p2A25Rn/PfQzpkThvX6CHi5IM7Pf7kZCQoE9KABXo2rVr9TaRGXrjxo2X2qXf2bNn9XYBUu0KTt0LiIwhY5nHV2poaAATkkND+nBCUQV38YzsR9C9BojzfiCbR9CxFMP2xRt25QrDDtmBvNt4zHCBXKNwuuB9PVREauIygYyMDD05yMSYEXWA1atX620yOWmXycqkZQEUnPSTZ+U/9azH49HvpY9aJHmX/CfPqPHNamlpgcvlghbeNuxMxPMow5RhaL8d+KMTNJ+gVoId7QQtizfscgWaxz4MbS+jIfdJhPZt0SegJqrgBKan0FV9zN40e1XBdRe6SjKWtKnxu8rr9UI7nTy0IOJgNnXRq/kP0KO/GSB53HuW3kDtJsPes4h2L56nHxj2mYPc188zIcXhQuYkHA/W6asn+reg4sGuQD2BKo+q96nxzWpqaoLT6YRW8tmghZFMZs8iJiQXjws/92KIiWfHw/TgEIYws/Ep7lsHr5m0bcO4bzOYtKro3QQgZzwCJZvR3Nx8SV1DV1ZV7iU8rwYq/0kfCVXpL2HcNXTNoa72qFoIKRjMc1Cqq6tDcnJykZwwtwa/HbgFthGIFPFMLGSxUDgTEdcMQrIoyOcxk/80QZlxnc8xac1lkfAuPczSkMdSaMcSBINBfeXM6pqM1P67Guj1JiP1rDkxiVeZWa+Yg6i8vBxr1qz5SlWCg48k3vEdNg+6iBzx7AxCs5Z1L2BW5d4sXsyEtcTQbhYVJSz/bGPQZJmFQwer0NjYeIXksP4/C4Tu5iAOyMnJQWxs7J3msnfQ+vg+LzSs75/ZsWlAI37msWFhkvqF2s7Q3soz1sriYCe/YKwj0JA5H5UH9up7MRolIet2uyWiPu6uxr+FGkIN+3Ju77jUpX3niX5YFPMi24Y3b+jjjKT0xzHbe3otefLkSdTX10eNxIOHDx+Gz+dDdnY2li9f/iHnHXutD5sYqm+n+iA5ZuqppMHI+n6FniT4hRB1YhGPpKQk96pVq74RxwhkYmLiP/ucO/r1zRMfu+em2bwd1fmSaNVQamDX+f8F1B/lHbRofAwAAAAASUVORK5CYII=')
        trans.translate(document.getElementById('WATCHFOOTER'))
        trans.clear()
    }

    /* Tag Search
    */
    else if(window.location.href.split('/')[3] == 'tag') {
      /* Title */
        trans.add('s', 'タグ', 'Search for')
        trans.add('s', 'を含む動画の検索結果', ' tag')
        //
        trans.add('s', '登録数：', 'Number of Members: ')
        trans.add('s', '件', '')
        //
        trans.add('s', 'キーワード', 'Search for')
        trans.add('s', 'を含むタグを検索', ' keyword instead')
        //
        trans.translate(document.body)
        trans.clear()

      /* Sort Options */ // g to get lists at top and bottom
        trans.add('g', 'コメントが新しい順', 'Most Recently Commented')
        trans.add('g', 'コメントが古い順', 'Least Recently Commented')
        trans.add('g', '再生数が多い順', 'Most Viewed')
        trans.add('g', '再生数が少ない順', 'Least Viewed')
        trans.add('g', 'コメント数が多い順', 'Most Commented')
        trans.add('g', 'コメント数が少ない順', 'Least Commented')
        trans.add('g', 'マイリスト数が多い順', 'Most MyList Adds')
        trans.add('g', 'マイリスト数が少ない順', 'Least MyList Adds')
        trans.add('g', '投稿日時が新しい順', 'Most Recently Posted')
        trans.add('g', '投稿日時が古い順', 'Least Recently Posted')
        trans.add('g', '再生時間が長い順', 'Longest Duration')
        trans.add('g', '再生時間が短い順', 'Shortest Duration')
        //
        trans.translate(document.body)
        trans.clear()

      /* Video Info */
        trans.add('g', '再生：', 'Views: ')
        trans.add('g', 'コメ：', 'Comments: ')
        trans.add('g', 'マイ：', 'MyList: ')
        trans.add('g', '宣伝：', 'Ads: ')
    }

    /* Footer
    */
      /* Links */
        trans.add('s', '動画トップ', 'Top')
        trans.add('s', 'フィッシング詐欺にご注意！', 'Beware of Phishing!')
        trans.add('s', '利用規約', 'Terms of Use')
        trans.add('s', '宣言', 'Declorations')
        trans.add('s', '受賞', 'Awards')
        trans.add('s', '掲示板', 'BBS')
        trans.add('s', 'ヘルプ', 'Help')
        trans.add('s', '動画投稿ハンドブック', 'Handbook')
        trans.add('s', '広告出稿に関するお問い合わせ', 'Buying Ads')
        //
        trans.translate(document.body)
        trans.clear()
        
      /* Stats */
        //trans.add('s', '総動画数：', 'Total Videos: ')
        //trans.add('g', '／ 総再生数：', '&nbsp;&nbsp;&nbsp;Total Views: ')
        //trans.add('s', '／ 総コメント数：', '&nbsp;&nbsp;&nbsp;Comments: ')
        //
        //trans.translate(document.body)
        
      /* Specs */
        trans.add('s', '【推奨環境】', '… Recommended Specs … ')
        trans.add('s', 'OS：', 'OS: ')
        trans.add('s', 'ブラウザ：', 'Browser: ')
        trans.add('s', 'Internet Explorer, Firefox, Safari\\(Mac版のみ\\), 各最新版', 'Internet Explorer, Firefox, Safari(Mac only), latest of each')
        trans.add('s', 'プラグイン：', '<br />Plugins: ')
        trans.add('s', 'Adobe Flash Player 10以降', 'Adobe Flash Player 10 (or higher)')
        trans.add('s', 'その他：', 'Other: ')
        trans.add('s', 'クッキー\\(cookie\\)制限をしている場合は nicovideo.jp を許可', 'Allow cookies from nicovideo.jp')
        //
        trans.translate(document.body)
        trans.clear()
}

/***
*** NicoNicoSecure
***/

else if(window.location.hostname == 'secure.nicovideo.jp') {

    /* Overview
    */
    if(window.location.pathname == '/secure/') {
      /* Header */
        trans.add('s', 'ようこそ', 'Profile of ')
        trans.add('s', 'さん', '')
        trans.add('s', '終了する場合は必ず', 'After editing, please')
        trans.add('s', 'ログアウト', 'logout')
        trans.add('s', ' してください。', '')
        //
        trans.translate(window.document.body)
        trans.clear()
        
      /* Content */
        trans.add('s', '会員状態・所持ニコニコポイント', 'Member Details')
        trans.add('s', '会員状態', 'Membership Type')
        trans.add('s', '一般会員', 'Regular')
        trans.add('s', 'プレミアム会員登録', 'Upgrade Account')
        trans.add('s', '所持ニコニコポイント', 'NicoNico Points')
        trans.add('s', 'ポイント', 'Points')
        trans.add('s', 'ポイントの購入・明細の確認', 'NicoNicoPoints')
        //
        trans.add('s', 'プロフィール', 'Profile')
        trans.add('s', 'ニックネーム', 'Username')
        trans.add('s', '性別', 'Sex')
        trans.add('s', '男性', 'Male')
        trans.add('s', '生年月日', 'Birthday')
        //> Birthday Months
        trans.add('s', '年', ', '); trans.add('s', '日', '')
        trans.add('s', '01月', 'January ')
        trans.add('s', '02月', 'February ')
        trans.add('s', '03月', 'March ')
        trans.add('s', '04月', 'April ')
        trans.add('s', '05月', 'May ')
        trans.add('s', '06月', 'June ')
        trans.add('s', '07月', 'July ')
        trans.add('s', '08月', 'August ')
        trans.add('s', '09月', 'September ')
        trans.add('s', '10月', 'October ')
        trans.add('s', '11月', 'November ')
        trans.add('s', '12月', 'December ')
        //
        trans.add('s', 'お住まいの地域', 'Location')
        trans.add('s', 'プロフィールの変更', 'Edit Profile')
        trans.add('s', 'が付いている項目は変更できません', 'cannot be edited')
        trans.add('s', '登録メールアドレス', 'Contact')
        trans.add('s', 'PC', 'Email')
        trans.add('s', '携帯', 'Phone')
        trans.add('s', '未登録', 'None')
        trans.add('s', '登録メールアドレスの変更', 'Edit Contacts')
        //
        trans.add('s', '公開・非公開', 'Public and Private Details')
        trans.add('s', 'プロフィール', 'Profile')
        trans.add('s', 'ニックネーム', 'Username')
        trans.add('s', '性別', 'Sex')
        trans.add('s', '生年月日', 'Birthday')
        trans.add('s', 'お住まいの地域', 'Location')
        trans.add('s', '一覧', 'Lists')
        trans.add('s', '投稿動画', 'My Videos')
        trans.add('s', '公開マイリスト', 'mylist')
        trans.add('s', '参加コミュニティ', 'Communities')
        trans.add('s', '入会チャンネル', 'Watched Channels')
        trans.add('s', '公開・非公開設定の変更', 'Edit Profile')
        trans.add('s', 'ニックネームは常に公開されます', 'must remail public')
        trans.add('g', '非公開', 'Private'); //must come becore public
        trans.add('g', '全ユーザに公開', 'Public')
        trans.add('g', '公開', 'Public')
        //
        trans.add('s', 'ニコレポ', 'Nicorepo')
        trans.add('s', 'あなたのニコレポは', 'Your Nicorepo')
        trans.add('s', 'twitter連携', 'Twitter')
        trans.add('s', '全ユーザーに公開', 'All Public Users')
        trans.add('s', '連携していません', 'None')
        trans.add('s', '表示設定の変更', 'Edit Preferences')
        trans.add('s', 'twitter連携の変更', 'Edit Twitter')
        //
        trans.add('s', 'メールサービス', 'Mail Services')
        trans.add('s', '最新情報やニコレポメールなどのメールサービスを個別に開始・停止します', 'The start and stop individual services such as e-mail updates and Nikorepomeru'); //check, this is pasted direct from google translator
        trans.add('s', 'メールサービスの変更', 'Edit Mail')
        //
        trans.add('s', 'セキュリティ', 'Security')
        trans.add('s', 'パスワード', 'Password')
        trans.add('s', '秘密の質問・答え', 'Secret Question')
        trans.add('s', '初心者モード', 'Starter'); //check
        trans.add('s', '無効', 'invalid'); //check
        trans.add('s', '質問：', 'Q: ')
        trans.add('s', '答え：', 'A: ')
        //> Questions
        trans.add('s', '好きな食べ物は？', 'What is your favorite food?')
        trans.add('s', '嫌いな食べ物は？', 'What is your least liked food?')
        trans.add('s', '卒業した学校名は？', 'What school did you graduate from?')
        trans.add('s', '母親の旧姓は？', 'What is your mother\'s maiden name?')
        trans.add('s', '好きな映画の題名は？', 'What is the title of your favorite movie?')
        trans.add('s', '飼っているペットの名前は？', 'What is the name of a pet?')
        trans.add('s', '好きな芸能人は？', 'Who is your favorite celebrity?')
        //
        trans.add('s', 'セキュリティの変更', 'Edit Security')
        //
        trans.add('s', 'ブロック', 'Blocking')
        trans.add('s', 'ユーザーブロック登録数', 'Number of blocked users')
        trans.add('s', '人', ' Users')
        trans.add('s', 'ブロックの変更', 'Edit Blocks')
        //
        trans.translate(window.document.body)
        trans.clear()

        trans.add('s', 'ニコニコ動画バージョンの変更', 'Change NicoNico Video Style')
        trans.add('s', 'ニコニコ動画を退会する', 'Delete NicoNico Account')
        //
        trans.translate(window.document.body)
        trans.clear()
        
      /* Footer */
        trans.add('s', '【ニコニコ動画アカウントで利用できるサービス一覧】', '【NicoNico Provided Services】')
        trans.add('s', 'ニコニコ動画', 'Videos')
        trans.add('s', 'ニコニコ静画', 'Images')
        trans.add('s', 'ニコニコ生放送', 'Broadcasts')
        trans.add('s', 'ニコニコチャンネル', 'Channels')
        trans.add('s', 'ニコニコミュ二ティ', 'Community')
        trans.add('s', 'ニコニコ大百科', 'Nicopedia')
        trans.add('s', 'ニコニ・コモンズ', 'Commons')
        trans.add('s', 'ニコニ広告', 'NicoAds')
        trans.add('s', 'ニコニコ実況', 'Live TV')
        trans.add('s', 'ニコニコDVD', 'DVD Rental')
        trans.add('s', 'ニコゲー', 'Games')
        //
        trans.translate(window.document.body)
        trans.clear()
        
      /* Encryption Footer */
        trans.add('s', 'このサイトは、サイバートラストの ', 'This site has been authenticated by ')
        trans.add('s', 'サーバ証明書', 'Cybertrust')
        trans.add('s', 'により実在性が認証されています。', '')
        trans.add('s', 'また、SSLページは通信が暗号化されプライバシーが守られています。', 'This page uses encrypted SSL communications')
        //
        trans.translate(window.document.body)
        trans.clear()
    }

    /* Overview
    */
    if(window.location.pathname == '/secure/profile_edit') {

      /* Profile Modification */
        trans.add('s', 'お住まいの地域 を変更しました。', 'Location has been changed')
        //
        trans.add('s', '現在の状態を確認( 新規ウインドウが開きます )', 'View Profile (opens in new window)')
        //
        trans.translate(window.document.body)
        trans.clear()
        
      /* Header */
        trans.add('s', 'プロフィールの変更', 'Edit Profile')
        //
        trans.translate(window.document.body)
        trans.clear()
        //
        trans.add('s', '変更したい情報に新しい情報を入力して', '')
        trans.add('s', '変更', 'Please')
        trans.add('s', 'を押してください。', 'enter your information correctly')
        trans.add('s', 'が付いている項目は', 'Hidden details')
        trans.add('s', '非表示にはできず、すべてのユーザーに公開されます。', 'cannot be viewed by all users')
        trans.add('s', '利用規約に触れるような内容を含まないよう、十分にご注意ください。', 'Please note this page does not contain content that touches upon the Terms of Service')
        //
        trans.translate(window.document.body)
        trans.clear()
        
      /* Body */
        trans.add('s', 'ニックネーム', 'Username')
        trans.add('s', '全半角問わず2～16字以内', '16 characters or less')
        trans.add('s', '現在のニックネーム：', 'Current Username:')
        trans.add('s', '新しいニックネーム：', 'New Username:')
        trans.add('s', 'ニコニコ動画 ', 'Change your profile picture on ')
        trans.add('s', 'プロフィール画像の変更', 'NicoNicoDouga')
        trans.add('s', 'で変更することができます。', 'directly')
        trans.add('s', 'プレミアム会員にご登録いただくと、自己紹介のテキスト中にhtmlタグを使うことができます。', 'Registered members can use HTML in their Description')
        trans.add('s', 'プロフィール画像', 'Profile Picture')
        trans.add('s', '自己紹介', 'Description')
        trans.add('s', '性別', 'Sex')
        trans.add('s', '男性', 'Male')
        trans.add('s', '生年月日', 'Birthday')
        trans.add('s', 'お住まいの地域', 'Location')
        trans.add('s', '現在のお住まいの地域', 'Current Area:')
        trans.add('s', '新しいお住まいの地域', 'New Area:')
        //
        trans.add('g', '※現在の状態は', '※ This item is currently ')
        trans.add('g', '非公開', 'private');//must come becore public
        trans.add('g', '公開', 'public')
        trans.add('g', 'です', '')
        trans.add('g', '変更不可', 'Cannot Edit')
        //trans.add('g', '変更', 'Submit')
        //
        trans.translate(window.document.body)
        trans.clear()
        
      /* Footer */
        trans.add('s', 'アカウント設定のトップへ', 'Return to Overview')
        //
        trans.translate(window.document.body)
        trans.clear()
    }
}