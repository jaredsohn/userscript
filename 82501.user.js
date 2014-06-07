// ==UserScript==
// @name           oflotter
// @description    (ver.1.8) Twitterにあれこれ機能追加するよ！
// @version        1.8
// @author         oflow
// @namespace      http://oflow.me/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
//
//
// Ver.1.8
// ow.ly, imgur, plixi(Tweetphoto), Mobypicture, pic.im, Twitgoo, img.ly のサムネ追加
//
// Ver.1.7.5
// since_idの取得失敗してたの修正
//
// Ver.1.7.4
// タイマー増やしすぎたので減らした
//
// Ver.1.7.3
// Retweetされたやつに付いてくるアレ消した
//
// Ver.1.7.2
// bufferedなあれクリアしてなかった！
// home画面なんかで重複して取得してたの修正
//
// Ver.1.7.1
// にょきにょきさらに仕様変更(li:animateedがあったら順番にする)
// 短縮URLあたりの挙動変更
//
// Ver.1.7
// にょきにょきの仕様変更
// 自動更新みたいなの
//
// Ver.1.6.4
// flic.krのサムネ取得
// www.flickr.comのURL貼られてるの見てないから短縮URLだけ
// oflow.infoドメインそろそろ使えるやろ
//
// Ver.1.6.3
// URL置換間違ってた
//
// Ver.1.6.2
// 新UIになんかしねーから！のやつ修正
//
// Ver.1.6.1
// favstarの仕様変わってたからYahoo! Pipesも変更した。(RSS→JSONの方が楽な気がしてきた)
//
// Ver.1.6
// 新しいバージョンあるかチェックする
// "id_str" と "in_reply_to_status_id_str" 使うようにした
// in_reply_to取得時にエラーだったら何か出るかもしれない
// t.coとhtn.toと(略)のURL展開に対応するためにあれこれ誤魔化した
// 短縮URLは先読みしとくように変更(サムネだけ後回し)
// Instagramのサムネ表示
// body#showのとき背景色おかしかった
// ニコニコ動画のサムネのやつ修正
// Youtubeのサムネ表示
//
// Ver.1.5.2
// 5秒したら上のアレ消す
// 新UIの時は何もしない… はず
// buzztterは日本語でおk
// URL置換かえた
//
// Ver.1.5.1
// トレンドのん変更したときの動作修正
//
// Ver.1.5
// favstarのrecent fav取得
// buzztter関連の動作変更(buzztter以外も選択可能、buzztterの時だけ自動更新)
//
// Ver.1.4
// tinyurl展開に対応でその付近も変更
// amzn.to展開の時は商品画像出るかもしれない
// 4sq.com展開でアレしたけど遅くてダメかもしれない
// ホーム開いてる時トレンドをbuzztterに置き換えた
// ハッシュタグ置換おかしいのが若干マシになったかも
// 
// Ver.1.3.1
// 新しいツイートが○○件ありますを押したとき遅いの改善(したはず)
// リプライ数表示リセットのタイミング変更
// 右側に画像サムネあるときのCSS調整
//
// Ver.1.3
// Firefox専用として作ってたoflotter jQuery版がChromeでも動かせるようになったんで前のはポイッと
// bit.ly URL展開がChrome対応
// URL展開した後にサムネ表示
// 英語版Twitter WebのをCSSを参考にそれっぽく調整
// 新しいツイートにスクロールの速度上げた気がする
// リプライ数表示のはそのツイートの本文っぽいところクリックすると「読んだ」扱いになる(はず)
// CSS調整
//
// Ver.1.2.2
// 新しいツイートにスクロールが埋まってたんで必要なさそうなページで非表示
//
// Ver.1.2.1
// 新しいツイートにスクロールの位置調整
// Replyリンク押したときの動作なおってなかったので修正
// 色分けしてたのがはみ出てたので修正
//
// Ver.1.2
// 英語表記にやや適当に対応
// 自分宛・自分が発言したツイートは色分け出来るようにした
// bit.lyのURLを展開 (bit.ly Proの短縮URL: 4sq.com, amzn.to, yhoo.itも展開するはず)
// 未読っぽいリプライ数をいい加減に表示するかも (status.bufferedで自分宛のがあったのをカウント)
// 新しいツイートが○○件をクリックしたらその辺にスクロール(かなり手抜き)
// 右上ナビのリスト取得あたりを修正
// (自分がフォローしてるリストも取得、自分以外のプロフィールを見てるときはその人のリストを取得)
// DM、Replyリンク押した時の動作修正
// CSS微調整
//
// ver.1.1
// ふぁぼれるようにボタン追加
// 自分にReply、DMボタンはさみしすぎるだろjk
// 右上のナビゲーションにリプライ、リストを追加
// (ホーム画面だとリストへアクセスしやすいかもしれん)
// いろいろ胡散臭い
//
// ver.1.0.4
// in_reply_toたどってたのにもreplyボタンとか付けた
// 読み込み中のときは何かぐるぐる回るようになった
// 画像がアレするのにyfrogと(jpg|png|gif)追加
// replyボタンでin_reply_status_id取得出来てないの修正
// replyボタン押したときの怪しげな動作は察して下さい
// templateの{screen_name}らへん間違ってた！
// 
// ver.1.0.3
// Google Chrome対応(たぶん)
// 画像がアレするのはぱくりではないよ！
//
// ver.1.0.2
// 重い！ってことで「もっと読む」方式にした
// CSS微調整
//
// ver.1.0.1 
// list, reply画面で動いてなかったの修正
// in_reply_toあったのに取得しないの修正
// CSS微調整
//

var oflotter_jquery = function() {
    var version = '1.8';

    // 背景色の設定
    var color = {
        replyToMe : '#faebd7',  // 自分宛ツイートの背景色
        mine      : '#f0f8ff',  // 自分が発言したツイートの背景色
        inReplyTo : '#f3f3f3'   // 取得した関連ツイートの背景色
    };

    var styles = [
        '.retweet-ctx-dlg { display: none !important; }',
        '#oflotter-buffered { display: none; opacity: 0; }',
        '.status.in-queue { display: none; opacity: 0; }',
        '.phoenix-skybar.no-phoenix-skybar { padding-top: 0px !important; }',
        'div#following + hr { display: none; }',
        '#tweeting_button { white-space: nowrap !important; }',
        // 「新しいツイートが…」を押した時の目印のやつ
        '.last-on-refresh-after, .last-on-refresh-after:hover { background: #eee; padding: 0 !important; height: 10px; }',
        '#label-scroll-to-tweet { cursor: pointer; position: absolute; right: 15px; margin-top: 0.4em; }',
        '#label-scroll-to-tweet input { vertical-align: middle; margin-right: 2px; }',
        '#favorites #label-scroll-to-tweet,',
        '#inbox #label-scroll-to-tweet,',
        '#sent #label-scroll-to-tweet,',
        '#retweets_by_others  #label-scroll-to-tweet,',
        '#retweets #label-scroll-to-tweet,',
        '#retweeted_of_mine #label-scroll-to-tweet { display: none; }',
        '#search #label-scroll-to-tweet { margin-top: -2em; }',
        // top-navigation
        '.top-navigation > li { position: relative; }',
        // lists
        '.top-navigation .lists > div { display: none; position: absolute; margin-top: 10px; left: -5px; z-index: 1000; background: #fff; border: 4px solid #ddd; -moz-border-radius: 5px; -webkit-border-radius: 5px; -moz-box-shadow: 0 1px 0 #aaa; -webkit-box-shadow: 0 1px 0 #aaa; }',
        '.top-navigation .lists li { display: list-item; text-align: left; padding: 1px; }',
        '.top-navigation .lists:hover > div { display: block; }',
        '.top-navigation .lists.loading > div { display: none !important; }',
        '.top-navigation ul a { display: block; padding: 0.5em 1em; min-width: 100px; text-decoration: none !important; outline: 0; }',
        '.top-navigation ul a:hover { background: #eee; }',
        '.top-navigation ul .lock-icon { margin-left: 0.5em; }',
        '.top-navigation .stat_count { display: none; padding: 0; }',
        '.top-navigation .stat_count.unread { display: inline; font-weight: bold; }',
        '.top-navigation .stat_count.unread:before { content: "("; }',
        '.top-navigation .stat_count.unread:after { content: ")"; }',
        // status.mentions
//        '.status.unread .status-content { font-weight: bold; }',
        '.mentions { background-color: ' + color['replyToMe'] + '; }',
        '.status.in_reply_to.mentions { background-color: inherit !important; }',
        '#replies .status.mentions { background-color: inherit !important; }',
        '#replies .status.in_reply_to.mentions .status-body { background-color: ' + color['inReplyTo'] + ' !important; }',
        // status.mine
        '.mine { background-color: ' + color['mine'] + '; }',
        '.status.in_reply_to.mine { background-color: inherit !important; }',
        '#replies .status.mine { background-color: inherit !important; }',
        '#profile .status.mine { background-color: inherit !important; }',
        '#show .status.mine { background-color: inherit !important; }',

        // status.in_reply_to
        '.status.in_reply_to:hover { background: inherit !important; }',
        '.has-reply { margin-bottom: 6px !important; }',
        '.in_reply_to .actions-hover { bottom: 4px; }',
        '.in_reply_to { position: relative; margin: 0 !important; margin-top: 3px !important; margin-bottom: 0 !important; padding: 0 0 4px 24px !important; border-bottom: 0 !important; opacity: 0; }',
        '.in_reply_to.latest-reply { padding-top: 3px !important; display: none; }',
        '.in_reply_to.slide-down { display: none; }',
        '.in_reply_to .entry-content { font-size: 85% !important; }',
        '.in_reply_to .status-body { position: relative; min-height: 48px !important; width: 405px !important; margin-left: 56px !important; padding: 6px 10px; border: 1px solid #ddd; -moz-border-radius: 5px; -moz-box-shadow: 1px 1px 0 #ccc; -webkit-border-radius: 5px; -webkit-box-shadow: 1px 1px 0 #ccc; border-radius: 5px; box-shadow: 1px 1px 0 #ccc; background: ' + color['inReplyTo'] + '; }',
        '.in_reply_to.mine .status-body { background-color: ' + color['mine'] + ';}',
        '.in_reply_to.mentions .status-body { background-color: ' + color['replyToMe'] + ';}',
        '.in_reply_to .status-content { display: block; padding-right: 20px; overflow: visible !important; }',
        // icon
        'ol.statuses .in_reply_to .thumb { left: 24px; !important; }',
        // thumbnail
        'span.thumbnail { display: block;  z-index: 50; }',
        '.thumbnail:hover { z-index: 100; }',
        '.thumbnail a { position: relative; display: inline-block; min-width: 14px; min-height: 14px; }',
        '.thumbnail img { display: inline-block; max-width: 200px; max-height: 200px; border: 4px solid #eee; opacity: 0; }',
        '.thumbnail a.loading { margin-right: 25px; margin-top: 10px; }',
        '.thumbnail a.loading img { display: none; opacity: 0; -moz-transform: rotate(-25deg); -webkit-transform: rotate(-25deg); }',
        '.thumbnail a:hover { z-index: 500; }',
        '.status:hover .in_reply_to { background-color: inherit !important; }',
        // more-replies
        '.more-replies { display: block; min-height: 3px; font-size: 80%; margin: 0 !important; padding: 0 !important; text-align: center !important; }',
        '.more-replies a { display: inline-block; height: 20px; cursor: pointer; }',
        '.more-replies.loading { height: 20px; }',
        '.more-replies.loading a { text-indent: -10000px; }',
        '.more-replies.error { padding: 3px !important; color: #e55; }',
        '.more-replies:hover { background: inherit !important; }',
        // actions-hover
        '.actions-hover .rt, .actions-hover .dm { display: block; float: left; line-height: 16px; }',
        '.actions-hover .icon { cursor: pointer; }',
        '.actions-hover .rt:hover .retweet-icon { background-position: -192px 0; }',
        '.actions-hover .dm:hover .reply-icon { background-position: -16px 0; }',
        '.actions-hover li:hover { background-color: transparent !important; }',
        '.actions-hover li:hover a { text-decoration: underline; }',
        // bitly
        'a.bitly { position: relative; }',
        '.bitly.long-url { position: absolute; z-index: 1000; padding: 0.7em 1em; display: none; background: #fff; border: 4px solid #ddd; -moz-border-radius: 5px; -webkit-border-radius: 5px; -moz-box-shadow: 0 1px 0 #aaa; -webkit-box-shadow: 0 1px 0 #aaa; }',
        '.bitly.long-url .long-url { display: block; text-align: left; }',
        '.bitly img { border: 1px solid #ddd; margin-top: 3px; max-height: 150px; max-width: 200px; }',
        '.bitly .amazon { border: 0; }',
        '.bitly .thumbshots { display: block; text-align: left; }',
        '.bitly .divvy, .lists .divvy { display: block; position: absolute; width: 27px; height: 15px; top: -15px; left: 5px; background: url("data:image/gif;base64,R0lGODlhGwAPAJECAP///93d3f///wAAACH5BAEAAAIALAAAAAAbAA8AAAIwlI+pyxgNVZixzlvb3Vlu3hnfGI5mZgInlAIqybTu+znmNOf3juc6P/IJgRuh0VQAADs=") no-repeat center top; }',
//        '.bitly.long-url.loading { display: block; }',
//        '.bitly.long-url.visible { display: block; }',
        '.bitly.long-url .icon { padding-left: 20px; display: none; }',
        '.bitly.long-url.loading .icon { margin-top: 5px; padding-left: 20px; min-width: 20px; min-height: 12px; display: block !important; text-align: left;background-position: left center !important; }',
        '.bitly.long-url.loading .thumbshots { display: none; }',

        // favotter
        '#favotter #new_results_notification,',
        '#favotter #label-scroll-to-tweet,',
        '#favotter #pagination { display: none; }',
        '#favotter .status { padding: 8px 0 !important; }',
        '#favotter .status p { margin: 0 0 0.5em 0 !important; }',
        '#favotter .status p > a { font-weight: bold; }',
        '#favotter .status .favotters { text-align: right; font-size: 85%;}',
        '#favotter .status img { vertical-align: middle; }',
        '#favotter .profile-user + .section { padding: 10px !important; }',

        // favstar
        '#favstar #new_results_notification,',
        '#favstar #label-scroll-to-tweet,',
        '#favstar #pagination { display: none; }',

        '#favstar .profile-user + .section { padding: 10px !important; }',

        '#favstar .mainAvatar { width: 48px; height: 48px; position: absolute; margin-left: -56px; }',
        '#favstar .theTweet { margin-bottom: 0.5em; }',
        '#favstar .clear, #favstar .tweetBy { display: none; }',
        '#favstar .favouritesCount.fav,',
        '#favstar .favouritesCount.favs,',
        '#favstar .favouritesCount.retweet,',
        '#favstar .favouritesCount.retweets { display: inline-block; visibility: visible; width: auto; height: auto; background-image: none; vertical-align: top; margin-left: 2px; font-size: 90%; }',

        '#favstar .favouritesCount.retweet:after { content: " RT"; }',
        '#favstar .favouritesCount.retweets:after { content: " RTs"; }',
        '#favstar .favouritesCount.fav:after { content: " Fav"; }',
        '#favstar .favouritesCount.favs:after { content: " Favs"; }',
        '#favstar .avatarList { text-align: right; margin-bottom: 1px; }',
        '#favstar .avatarList img { width: 24px; height: 24px; margin-left: 1px; }',
        // loading gif
        '.status .loading, .more-replies.loading, .top-navigation li.loading, .bitly.long-url.loading .icon {  background: url("data:image/gif;base64,R0lGODlhDgAOAKIAAP///+/v797e3r29vTHOAP///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAFACwAAAAADgAOAAADK1i6APuwwRWCkmWMV63UG2ct2mQ+QipM4KCuUHvOJRnaWwk+dX/Hv1PtkQAAIfkEBQcABQAsAAAAAAwACAAAAxpYuhH7zEEhVFMAKFpv1lu1ZFCpDOhgFqlqJgAh+QQFBwAFACwCAAAADAAIAAADGlhaIvurwTKGkiUEVa3UG2ct2mSeCqAC5wokACH5BAUHAAUALAYAAAAIAAwAAAMaOFPc2m4VIdijFVLIe/gBBIYdBADdiXInkwAAIfkEBQcABQAsBgACAAgADAAAAxtYWjOrzb32qhVYvKztC8ECAAUYFqMCKmnVPgkAIfkEBQcABQAsAgAGAAwACAAAAxtYujo+jD0YawGACbFwDkGxcVdWgMpWoZbCMgkAIfkEBQcABQAsAAAGAAwACAAAAxoICtXei71JawhvDHexEIW2FVfzNRp1ViboJAAh+QQJBwAFACwAAAAADgAOAAADH1i63P4KAMjkpPHiHXrA3reNiyBs5jkMkKmsI7zJTAIAOw==") no-repeat center top; }',
        '.top-navigation li.loading { color: inherit; margin-right: 5px; padding-right: 15px; background-position: right center !important; }',
        '#oflotter-new-version { display: none; position: fixed; left: 1.5em; top: -1px; z-index: 10000; background: #f6f6f6; background: -moz-linear-gradient(top, #f6f6f6, #ccc); background: -webkit-gradient(linear, left top, left bottom, from(#f6f6f6), to(#ccc)); color: #333; padding: 4px 10px; -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.7); -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.7); vertical-align: middle; font-weight: bold; -moz-border-radius: 0 0 5px 5px; -webkit-border-radius: 0 0 5px 5px; border-radius: 0 0 5px 5px;}'
    ];

    function init() {

        $( 'head' ).append( '<style type="text/css">' + styles.join( '' ) + '</style>' );
        Nav.init();
        InReplyTo.init();
        TweetUrl.init();
        Trends.init();
        Refresh.init();

        // ごにょごにょ
        $( '#side_ad_base' ).remove();
        if ( $( '#side > p.promotion:first' )[0] ) {
            $( '#home_tab' ).css( { marginTop: '5px' } );
            $( '#side > p.promotion' ).remove();
        }
    }
    var Refresh = function() { return {
        delay: 15000,
        timer: null,
        recent: '',
        init: function() {
            if ( !/^(?:home|replies|profile)/.test( document.body.id ) ) return;

            setTimeout( function() {
                $( '#new_results_notification' ).remove();
            }, 3000 );
            Refresh.timer = setInterval( function() {
                // ホームとリプライ・プロフィールだけ
                if ( !/^(?:home|replies|profile)/.test( document.body.id ) ) return;
                Refresh.getJSON();
            }, Refresh.delay );
        },
        getJSON: function() {
            if ( !Refresh.recent ) {
                Refresh.recent = $( '#timeline' ).find( 'li.status:first' ).attr( 'id' ).replace( 'status_', '' );
            }
            $.ajax( {
                type: 'GET',
                url: '/' + ( document.body.id == 'profile' ? pageScreenName : document.body.id ) + '?since_id=' + Refresh.recent + '&refresh=true&oflotter=true',
                dataType: 'json',
                success: function( json ) {
                    Refresh.addStatus( json );
                },
                error: function( xmlhttp ) {
//                    console.debug( xmlhttp.status + ': ' + xmlhttp.statusText );
                }
            } );
        },
        addStatus: function( json ) {
            // とりあえず適当な場所に要素追加しとく
            if ( !document.getElementById( 'oflotter-buffered' ) ) {
                $( document.body ).append( '<div id="oflotter-buffered"></div>' );
            }
            var buffered = $( '#oflotter-buffered' );
            buffered.append( json['#timeline'] );
            // 最期に付け足したやつ
            var statuses = buffered.children( 'ol:last' );

            // since_idのアレ
            var id = statuses.children( 'li.status:first' ).attr( 'id' );
            if ( id ) {
                Refresh.recent = id.replace( 'status_', '' );
            }
            var tl = $( '#timeline' );
            // 逆順でTLに追加していく
            $( statuses.children( 'li.status' ).get().reverse() ).each( function() {
                if ( !tl.children( '#' + this.id )[0] ) {
                    var status = $( this ).hide().addClass( 'in-queue' );
                    InReplyTo.queue( function() {
                        tl.find( 'li:first' ).before( status );
                        status.animate( { height: 'show', opacity: 1 }, 'normal', 'swing' ).removeClass( 'in-queue' );
                    } );

                }
            } );
            InReplyTo.dequeue();
            // クリア
            // 更新ないときは残るけど次で消えるしいいか…
            buffered.remove();

            // 一番上の文字サイズ
            if ( document.body.id == 'profile' ) {
                $( '.latest-status' ).removeClass( 'latest-status' );
                tl.children( '.status:first' ).addClass( 'latest-status' );
            }

        }
    } }();

    var InReplyTo = function() { return {
        inProgress: false,
        data: [],
        delay: 100, // キューのアレ
        timer: null,
        dequeue: function() {
            if ( InReplyTo.data.length == 0 ) return;
            if ( $( '#timeline' ).children( 'li' ).is( ':animated' ) ) {
                // 処理中っぽかったら待つ
                InReplyTo.timer = setTimeout( function() { InReplyTo.dequeue(); }, InReplyTo.delay );
                return;
            }
            // 追加された一番最初のから
            ( InReplyTo.data.shift() )();
        },
        queue: function( callback ) {
            // 順番に実行したいやつ
            if ( typeof callback == 'function' ) {
                InReplyTo.data.push( callback );
            }
        },
        init: function() {
            if ( document.body.id == 'show' ) {
                return;
            }
            $( '#content li.hentry' ).each( function() {
                InReplyTo.getStatusId( $( this ) );
            } );

            var content = document.getElementById( 'content' );
            if ( !content ) return;

            content.addEventListener( 'DOMNodeInserted', function( e ) {
                if ( e.target.nodeType != 1 ) return;
                // elementノードだけ見る in_reply_to～は無視
                var className = e.target.className;
                if ( className.indexOf( 'hentry' ) != -1 && className.indexOf( 'in_reply_to' ) == -1 ) {
                    InReplyTo.getStatusId( $( e.target ) );

                } else if ( e.target.className == 'statuses' ) {
                    $( e.target ).find( 'li.hentry' ).each( function() {
                        InReplyTo.getStatusId( $( this ) );
                    } );
                }
            }, false );

        },
        getStatusId: function( status ) {
            if ( !status.hasClass( 'in_reply_to' ) ) {
                status.find( '.entry-content a.username' ).each( function() {
                    // 自分宛クラス
                    if ( $( this ).text() == sessionScreenName ) {
                        status.addClass( 'mentions' );
                        // bufferedの時だけリプライ数見る
                        if ( status.hasClass( 'buffered' ) ) {
                            Nav.setReplyCount( status, 1 );
                            status.addClass( 'unread' );
                            status.click( Nav.readStatus )
                        }
                        return false;
                    }
                } );
                TweetUrl.bind( status );

                // ログインしてたらボタン付け足したり
                if ( sessionLoggedIn == 'y' ) {
                    var statusId   = status.attr( 'id' ).replace( /^status_/, '' ),
                        screenName = status.attr( 'class' ).replace( /^.+\su-([a-zA-Z0-9_]+)\s.+$/, '$1' );

                    InReplyTo.addRT( status, screenName, statusId );
                    InReplyTo.addDM( status, screenName );
                }
            }
            status.find( '.entry-meta > a:gt(0)' ).each( function() {
                if ( /status\/[0-9]+/.test( this.href ) ) {
                    InReplyTo.getStatusJSON( status, this.href );
                    return false;
                }
            } );
        },
        getStatusJSON: function( status, href, more ) {
            $.ajax( {
                type: 'GET',
                url: href,
                dataType: 'json',
                success: function( json ) {
                    InReplyTo.addStatus( status, json, more );
                },
                error: function( xmlhttp ) {
                    if ( more ) {
                        InReplyTo.addError( xmlhttp, more );
                    }
                }
            } );

        },
        addError: function( xmlhttp, more ) {
            // エラーだったら loadingアイコン消してメッセージ表示してみる
            more.removeClass( 'loading' ).addClass( 'error' );
            more.children().remove();
            more.append( 'in_reply_to_status : ' + xmlhttp.status + ' ' + xmlhttp.statusText );
        },
        addStatus: function( status, json, more ) {
            var in_reply_to = '',
                in_reply_url = '',
                time = '',
                screenName = json['user']['screen_name'],
                statusId   = json['id_str'];

            if ( json['in_reply_to_status_id_str'] ) {
                var in_reply_url = protocol + '//twitter.com/' + json['in_reply_to_screen_name'] + '/status/' + json['in_reply_to_status_id_str'];
                in_reply_to = ' <a href="' + in_reply_url + '">' + locale[lang]['in_reply_to'].replace( '{screenName}', json['in_reply_to_screen_name'] ) + '</a>';
            }
            time = InReplyTo.getTime( json['create_at'] );

            // テンプレート置換用
            var patterns = {
                '{screen_name}'       : screenName,
                '{profile_image_url}' : json['user']['profile_image_url'],
                '{text}'              : InReplyTo.addAnchor( json['text'] ),
                '{id}'                : statusId,
                '{time}'              : time,
                '{created_at}'        : json['created_at'],
                '{source}'            : json['source'],
                '{in_reply_to}'       : in_reply_to
            };

            // .status-body
            var statusBody = template.join('');
            for ( var name in patterns ) {
                statusBody = statusBody.replace( new RegExp( name, 'g' ), patterns[ name ] );
            }

            // クラスどうにかする
            var className = [
                                'hentry',
                                'u-' + json['user']['screen_name'],
                                ( sessionScreenName == json['user']['screen_name'] ? 'mine' : '' ),
                                'status in_reply_to',
                                ( status.hasClass( 'buffered' ) ? 'buffered' : '' ),
                                ( !status.hasClass( 'in_reply_to' ) ? 'latest-reply' : 'slide-down' )
                            ].join( ' ' );

            // li#status_id
            var li = document.createElement( 'li' );
            li.id = 'status_' + json['id'];
            li.className = className;
            li.innerHTML = statusBody;

            InReplyTo.queue( function() {
                // ここからは順番に処理する
                status.after( li );
                li = $( li );
                li.animate( { height: 'show', opacity: 1 }, 'normal', 'swing' );
                TweetUrl.bind( li );
                if ( sessionLoggedIn == 'y' ) {
                    // ログインしてたらRT, DM, Fav付ける
                    InReplyTo.addReply( li, screenName, statusId );
                    InReplyTo.addRT( li, screenName, statusId );
                    InReplyTo.addDM( li, screenName );
                    InReplyTo.addFav( li, statusId, json['favorited'] );
                }
                // mentions色分け
                li.find( '.entry-content a.username' ).each( function() {
                    if ( this.textContent == sessionScreenName ) {
                        li.addClass( 'mentions' );
                        return false;
                    }
                } );


                var nextSibling = li.next( 'li:first' );
                if ( !nextSibling.hasClass( 'more-replies' ) ) {
                    // もっと読むかもしれんけどただの線になるかもしれんやつ
                    var more = document.createElement( 'li' );
                    more.className = 'status more-replies' + ( status.hasClass( 'buffered' ) ? ' buffered' : '' );
                    li.after( more );
                    more = $( more );
                }
                if ( !status.hasClass( 'in_reply_to' ) ) {
                    // statusが親ステータスの時は一旦ここで止める

                    if ( !json['in_reply_to_status_id_str'] ) {
                        return;
                    }
                    // もっと読むリンク付ける
                    var a = document.createElement( 'a' );
                    a.innerHTML = locale[lang]['more'];
                    $( a ).click( function() {
                        more.addClass( 'loading' );
                        li.addClass( 'more-loaded' );
                        InReplyTo.getStatusJSON( li, in_reply_url, more );
                        $( this ).unbind( 'click' );
                    } );
                    more.append( a );
                    // statusが親ステータスの時は一旦ここで止める
                    return;
                }

                // もっと読むクリックしてから次のリプライない場合は横線にする
                if ( !json['in_reply_to_status_id_str'] && nextSibling.hasClass( 'loading' ) ) {
                    nextSibling.removeClass( 'loading' );
                    nextSibling.children().remove();
                }

                if ( json['in_reply_to_status_id_str'] ) {
                    // 次のリプライ取得する
                    InReplyTo.getStatusJSON( li, in_reply_url );
                }

            } );
            InReplyTo.dequeue();

        },
        addAnchor: function( text ) {
            // <a>のやつ URL, Reply, Hashtagでアレ
            var m = text.match( /http(?:s|)\:\/\/[\w\.\-\?\@\~\^\&\=\%\/\#\;!]+|(?:^|\s)\@[\w]+|(?:^|\s)\#[\w]+/g );
            if ( m ) {
                for ( var i = 0; i < m.length; i++ ) {
                    var str = m[i].replace( /(?:^\s|\s$)/g, '' );
                    if ( str[0] == 'h' ) {
                        var url = str.replace( /&(?!amp;)/g, '&amp;' ).replace( /"/g, '&quot;' );
                        text = text.replace( str, '<a class="tweet-url web" rel="nofollow" href="' + url + '">' + url + '</a>' );
                    } else if ( str[0] == '@' ) {
                        text = text.replace( str, '@<a class="tweet-url username" rel="nofollow" href="http://twitter.com/' + str.substring(1) + '">' + str.substring(1) + '</a>' );
                    } else if ( str[0] == '#' ) {
                        text = text.replace( str, '<a class="tweet-url hashtag" rel="nofollow" href="http://twitter.com/search?q=%23' + str.substring(1) + '">' + str + '</a>' );
                    }
                }
            }
            return text;
        },
        addReply: function( status, screenName, statusId ) {
            // 自分にReplyさみしす(´･ω･`)
            if ( status.hasClass( 'mine' ) ) return;
            var actions = status.find( '.actions-hover:first' );
            if ( actions.hasClass( 'add-reply' ) ) return;
            actions.addClass( 'add-reply' );
            var content = '@' + screenName + ' ';

            actions.append( [
                '<li>',
                  '<span class="reply">',
                    '<span class="reply-icon icon"></span>', 
                    '<a title="' + locale[lang]['reply_title'].replace( '{screenName}', screenName ) + '" href="/?status=' + content + '&in_reply_to=' + screenName + '&in_reply_to_status_id=' + statusId + '">' + locale[lang]['reply'] + '</a>',
                  '</span>',
                '</li>'
                ].join( '' ) );

            actions.find( 'span.reply' ).children().click( function() {
                return InReplyTo.setTweetStatus( content, screenName, statusId );
            } );
        },
        addRT: function( status, screenName, statusId ) {
            // 非常識RT
            var actions = status.find( '.actions-hover:first' );
            if ( actions.hasClass( 'add-rt' ) ) return;
            actions.addClass( 'add-rt' );
            var content = ' RT @' + screenName + ': ' + status.find( '.entry-content:first' ).text();

            // フッター付けるアレ使ってたら消しとく
            var footer = status.find( '.entry-footer' )[0];
            if ( footer ) content = content.replace( footer.textContent, '' );

            var href = [
                    '/?status=' + content.replace( /&(?!(?:amp|gt|lt|quot|#x[0-9a-fA-F]+|#[0-9]+);)/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' ),
                    '&in_reply_to=' + screenName,
                    '&in_reply_to_status_id=' + statusId,
                    ].join( '' );

            actions.append( '<li><span class="rt"><span class="retweet-icon icon"></span><a href="' + href + '" title="' + locale[lang]['rt_title'].replace( '{screenName}', screenName ) + '">' + locale[lang]['rt'] + '</a></span>' );

            actions.find( 'span.rt' ).children().click( function() {
                return InReplyTo.setTweetStatus( content, screenName, statusId, true );
            } );

        },
        addDM: function( status, screenName ) {
            // 自分にDMさみしす(´･ω･`)
            if ( status.hasClass( 'mine' ) ) return;
            var actions = status.find( '.actions-hover:first' );
            if ( actions.hasClass( 'add-dm' ) ) return;
            actions.addClass( 'add-dm' );
            var content = 'D ' + screenName + ' ';

            actions.append( '<li><span class="dm"><span class="reply-icon icon"></span><a href="/?status=' + content + '" title="' + locale[lang]['dm'].replace( '{screenName}', screenName ) + '">DM</a></span></li>' );

            actions.find( 'span.dm' ).children().click( function() {
                return InReplyTo.setTweetStatus( content );
            } );
        },
        addFav: function( status, statusId, isFav ) {
            var star = [ '<span class="actions">',
                         '<div>',
                         '<a id="status_star_' + statusId + '" class="fav-action ' + ( isFav ? 'fav' : 'non-fav' ) + '" title="' + locale[lang]['fav'] + '">&nbsp;&nbsp</a>',
                         '</div>',
                         '</span>'
                       ].join( '' );

            status.find( '.status-content > strong:first' ).after( star );
        },
        getTime: function( createAt ) {
            // 時間取得
            var timestamp = Math.floor( ( (new Date()).getTime() - ( new Date( createAt ) ).getTime() ) / 1000 );
            if ( timestamp < 60 ) {
                time = locale[lang]['time'][0].replace( '{time}', timestamp );
            } else if ( timestamp < 3600 ) {
                time = locale[lang]['time'][1].replace( '{time}', Math.floor( timestamp / 60 ) );
            } else if ( timestamp < 86400 ) {
                time = locale[lang]['time'][2].replace( '{time}', Math.floor( timestamp / 3600 ) );
            } else if ( timestamp < 2592000 ) {
                time = locale[lang]['time'][3].replace( '{time}', Math.floor( timestamp / 86400 ) );
            } else {
                time = locale[lang]['time'][4].replace( '{time}', timestamp );
            }
            return time;
        },
        setTweetStatus: function( content, in_reply_to, in_reply_to_status_id, isRT ) {
            var status = $( '#status' )[0];
            if ( !status ) return;
            if ( content.indexOf( '@' ) === 0 ) {
                // むーん…
                content = content + status.value.replace( content.replace( /\s+$/, '' ), '' );
                content = content.replace( /\s+$/, '' ) + ' ';
            }
            status.value = content;
            // キャレット位置を RT: 先頭、Reply, DM: 末尾にする
            if ( isRT ) {
                status.selectionStart = 0;
                status.selectionEnd = 0;
            } else {
                status.selectionStart = content.length;
                status.selectionEnd = content.length;
            }
            smoothScroll( null, function() {
                status.focus()
            } );
            if ( in_reply_to ) {
                $( '#in_reply_to' ).val( in_reply_to );
            }
            if ( in_reply_to_status_id ) {
                $( '#in_reply_to_status_id' ).val( in_reply_to_status_id );
            }
            return false;
        }

    } }();
    var TweetUrl = function() { return {
        imageHosts: [
            'movapic.com',
            'twitpic.com',
            'yfrog.',
            'nicovideo',
            'nico.ms',
            'youtube.com',
            'instagr.am',
            'flic.kr'
        ],
        imageUrls: {
            'movapic'  : /http\:\/\/movapic\.com\/pic\/([a-zA-Z0-9]+)/,
            'twitpic'  : /http\:\/\/twitpic\.com\/([a-zA-Z0-9]+)/,
            'yfrog'    : /http\:\/\/yfrog\.[a-z]+\/([a-zA-Z0-9]+)/,
            'nicoms'   : /http\:\/\/(?:www\.nicovideo\.jp\/watch|nico\.ms)\/sm([0-9]+)/,
            'youtube'  : /http\:\/\/www\.youtube\.com\/watch\?.*v=([a-zA-Z0-9\-]+)/,
            'imgur'    : /http\:\/\/imgur\.com\/([a-zA-Z0-9]+)/,
            'mobypic'  : /http\:\/\/moby\.to\/([a-zA-Z0-9]+)/,
            'imgly'    : /http\:\/\/img\.ly\/([a-zA-Z0-9]+)/,
            'twitgoo'  : /http\:\/\/twitgoo\.com\/([a-zA-Z0-9]+)/,
            'picim'    : /http\:\/\/pic\.im\/([a-zA-Z0-9]+)/,
            'owly'     : /http\:\/\/ow\.ly\/i\/([a-zA-Z0-9]+)/,
            'image'    : /http\:\/\/([a-zA-Z0-9_%\-\+\/\?=#&,.]+\.(?:jpg|jpeg|png|gif))/
        },
        thumbUrls: {
            'movapic'  : 'http://image.movapic.com/pic/s_{id}.jpeg',
            'twitpic'  : 'http://twitpic.com/show/thumb/{id}',
            'yfrog'    : 'http://yfrog.com/{id}.th.jpg',
            'nicoms'   : 'http://tn-skr{number}.smilevideo.jp/smile?i={id}',
            'youtube'  : 'http://i.ytimg.com/vi/{id}/default.jpg',
            'imgur'    : 'http://i.imgur.com/{id}m.jpg',
            'mobypic'  : 'http://moby.to/{id}:medium',
            'imgly'    : 'http://img.ly/show/thumb/{id}',
            'twitgoo'  : 'http://twitgoo.com/thumb/{id}',
            'picim'    : 'http://pic.im/website/thumbnail/{id}',
            'owly'     : 'http://static.ow.ly/photos/thumb/{id}.jpg',
            'image'    : 'http://{id}'
        },
        init: function() {
            $( document.body ).append( '<div class="bitly long-url"><span class="divvy"></span><a class="long-url"></a><span class="thumbshots"></span><span class="icon">loading...</span></div>' );
            $( '.bitly.long-url' ).mouseout( function() {
                $( this ).removeClass( 'visible' );
            } );
        },
        isImage: function( url ) {
            var returnValue = false;
            for ( var i = 0; i < TweetUrl.imageHosts.length; i++ ) {
                if ( url.indexOf( TweetUrl.imageHosts[i] ) != -1 ) {
                    returnValue = true;
                    break;
                }
            }
            return returnValue;
        },
        bind: function( status ) {
            var ignoreUrls = [ 'ustre.am', 'moi.st' ];

            var oflowme = [ 't.co', 'htn.to', 'ow.ly', 'is.gd', '2br.in', 'amba.to', 'fc2.in' ];
            var span = document.createElement( 'span' );
            span.className = 'thumbnail';
            status.find( '.entry-meta' ).before( span );

            $( '#' + status[0].id + ' .tweet-url.web' ).each( function() {
                var a = this, href = this.href;

                if ( $( a ).hasClass( 'thumbnail' ) ) return true;
                var host = href.replace( /^http:\/\//, '' ).replace( /^([^\/]+).+$/, '$1' );

                // 画像サムネすぐ取得できるやつ
                for ( var name in TweetUrl.imageUrls ) {
                    if ( TweetUrl.imageUrls[ name ].test( href ) ) {
                        var id = RegExp.$1;
                        var src = TweetUrl.thumbUrls[ name ].replace( '{id}', id );
                        if ( name == 'nicoms' ) {
                            src = src.replace( '{number}', ( parseInt( id ) % 4 + 1 ) );
                        }

                        TweetUrl.addThumbnail( status, a, src );
                    }
                }
                if ( host == 'instagr.am' ) {
                    // Instagram
                    TweetUrl.instagram( status, a );
                } else if ( /plixi|tweetphoto/.test( host ) ) {
                    // plixi
                    var src = 'http://api.plixi.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=' + encodeURIComponent( href );
                    TweetUrl.addThumbnail( status, a, src );
                } else if ( host == 'flic.kr' ) {
                    // Flickr
                    TweetUrl.flickr( status, a );
                } else if ( host.indexOf( 'www.amazon' ) === 0 ) {
                    // Amazon
                    TweetUrl.amazon( status, a );
                } else if ( host == 'tinyurl.com' ) {
                    // Tinyurl
                    TweetUrl.tinyurl( a );
                } else if ( oflowme.indexOf( host ) != -1 ) {
                    // t.co ( oflow.me )
                    TweetUrl.tco( a );
                } else if ( host.length > 8 || ignoreUrls.indexOf( host ) != -1 ) {
                    return;
                } else {
                    // Bit.ly
                    TweetUrl.bitly( a );
                }

            } );
        },
        addThumbnail: function( status, elm, src ) {

            $( elm ).addClass( 'thumbnail' );
            var a = $( document.createElement( 'a' ) );
            status.find( 'span.thumbnail' ).append( a );

            a.addClass( 'loading' ).attr( 'href', elm.href ).append( '<img src="' + src + '" />' );

            a.find( 'img' )
                  .error( function() { $( this.parentNode ).remove(); } )
                  .load( function() {
                      $( this ).animate( { opacity: 1 } ).parent( 'a' ).removeClass( 'loading' );
                  } );
        },
        amazon: function( status, elm ) {
            if ( /\/(?:dp|ASIN|gp\/product)\/([0-9A-Z]{10})/.test( elm.href ) ) {
                var src = 'http://images-jp.amazon.com/images/P/' + RegExp.$1 + '.09._AA90_.jpg';
                TweetUrl.addThumbnail( status, elm, src );
            }
        },
        tco: function( elm ) {
            $.getJSON(
                'http://oflow.info/php/tco/?callback=?',
                {
                    url: elm.href
                },
                function( json ) {
                    if ( !json['long_url'] ) return;
                    TweetUrl.setLongUrl( elm.href, json['long_url'] );
                }
            );

            $( elm ).mouseover( function() {
                $( this ).addClass( 'current' );
            } );
        },
        bitly: function( elm ) {
            $.getJSON(
                'http://api.bit.ly/v3/expand?callback=?',
                {
                    format: 'json',
                    login: 'oflow',
                    apiKey: 'R_8230b090c9fabb7a4eeef888ae06fe9d',
                    shortUrl: elm.href
                },
                function( json ) {
                    if ( json['status_code'] != 200 ) return;
                    var expand = json['data']['expand'];
                    if ( !expand || expand[0]['error'] ) {
                        return;
                    }
                    TweetUrl.setLongUrl( elm.href, expand[0]['long_url'] );
                }
            );

            $( elm ).mouseover( function() {
                $( this ).addClass( 'current' );
            } );
        },
        tinyurl: function( elm ) {
            $( elm ).mouseover( function() {
                var a = this;
                $( a ).addClass( 'current' );
                $.getJSON(
                    'http://ss-o.net/api/reurl.json?callback=?',
                    {
                        url: a.href
                    },
                    function( json ) {
                        if ( !json['url'] ) return;
                        TweetUrl.setLongUrl( a.href, json['url'] );
                    }
                );
            } );
        },
        flickr: function( status, elm ) {
            if ( !/^http:\/\/flic\.kr\/p\/([^\/]+)/.test( elm.href ) ) {
                return;
            }
            $.getJSON(
                'http://oflow.info/php/flickr/?callback=?',
                {
                    p: RegExp.$1
                },
                function ( json ) {
                    if ( !json['image'] ) {
                        return;
                    }
                    TweetUrl.addThumbnail( status, elm, json['image'] );
                }
            );
        },
        instagram: function( status, elm ) {
            if ( !/^http:\/\/instagr\.am\/p\/([^\/]+)/.test( elm.href ) ) {
                return;
            }
            $.getJSON(
                'http://oflow.info/php/instagram/?callback=?',
                {
                    p: RegExp.$1
                },
                function ( json ) {
                    if ( !json['image'] ) {
                        return;
                    }
                    TweetUrl.addThumbnail( status, elm, json['image'] );
                }
            );
        },
        setLongUrl: function( shortUrl, longUrl ) {
            longUrl  = longUrl.replace( /&#92;/g, '' );
            shortUrl = shortUrl.replace( /&#92;/g, '' );

            $( 'a[href="' + shortUrl + '"]' ).each( function() {
                var a = $( this );
                if ( a.hasClass( 'expanded' ) ) {
                    return;
                }
                // href属性変えとく
                a.attr( { href: longUrl } ).addClass( 'expanded' ).unbind( 'mouseover' );
                if ( a.hasClass( 'current' ) ) {
                    a.removeClass( 'current' );
                    TweetUrl.getThumbnailUrl( a );
                }
                a.hover( function() {
                    TweetUrl.getThumbnailUrl( this );
                }, function() {
                    $( '.bitly.long-url' ).removeClass( 'loading' ).fadeOut( 'fast' );
                } );
                if ( TweetUrl.isImage( longUrl ) ) {
                    // 短縮URLが画像の時もあるかもれない
                    TweetUrl.bind( a.parents( 'li.status' ) );
                }
            } );
        },
        getThumbnailUrl: function( elm ) {
            var longUrl = elm.href;

            var url = null;
            for ( var name in oflotter.TweetUrl.imageUrls ) {
                if ( !oflotter.TweetUrl.imageUrls[ name ].test( longUrl ) ) {
                    continue;
                }
                var id = RegExp.$1;
                url = oflotter.TweetUrl.thumbUrls[ name ].replace( '{id}', id );
                if ( name == 'nicoms' ) {
                    url = url.replace( '{number}', ( parseInt( id ) % 4 + 1 ) );
                }
                break;
            }

            if ( url ) {
                var img = '<img src="' + url + '" />';
            } else if ( longUrl.indexOf( 'http://www.amazon.co' ) === 0 && /\/(?:dp|ASIN|gp\/product)\/([0-9A-Z]{10})/.test( longUrl ) ) {
                longUrl = decodeURIComponent( longUrl );
                var img = '<img src="http://images-jp.amazon.com/images/P/' + RegExp.$1 + '.09._AA90_.jpg" class="amazon" />';
            } else if ( longUrl.indexOf( 'http://foursquare.com' ) === 0 && /\/venue\/([0-9]+)/.test( longUrl ) ) {
                $.getJSON(
                    'http://pipes.yahoo.com/pipes/pipe.run?_callback=?',
                    {
                        _id: 'b5365dcc66fafe5065965955223bf9d9',
                        _render: 'json',
                        url: 'http://api.foursquare.com/v1/venue.xml?vid=' + RegExp.$1,
                    },
                    function( json ) {
                        if ( !json['count'] ) {
                            $( '.bitly.long-url' ).removeClass( 'loading' );
                            return;
                        }
                        var venue = json['value']['items'][0];
                        var latlong = venue['geolat'] + ',' + venue['geolong'];
                        var img = '<img src="http://maps.google.com/staticmap?center=' + latlong + '&markers=' + latlong + '&zoom=14&size=200x150&key=ABQIAAAAHdQyPd3hIpryOWXAVYgxbxSnhvsz13Tv4UkZBHR3eJwOymtuUxRFPv_xNTkVG_XSgQYsQyeUWLMLCQ" class="4sq" />';
                        TweetUrl.setThumbnail( elm, img );
                    }
                );
                TweetUrl.showUrl( elm, longUrl );
                return;
            } else {
                var img = '<img src="http://open.thumbshots.org/image.pxf?url=' + longUrl + '" />';
            }
            if ( /=UTF-8/i.test( longUrl ) ) {
                longUrl = decodeURIComponent( longUrl );
            }
            TweetUrl.showUrl( elm, longUrl );
            TweetUrl.setThumbnail( elm, img );
        },
        showUrl: function( elm, longUrl ) {
            $( '.bitly.long-url' ).addClass( 'loading' ).fadeIn( 'fast' ).show();
            $( '.bitly.long-url > .long-url' ).html( ( longUrl ? longUrl : '' ) );
            var pos = $( elm ).offset();
            $( '.bitly.long-url' ).css( { left: pos.left + 'px', top: pos.top + $( elm ).height() + 10 + 'px' } );
        },
        setThumbnail: function( elm, img ) {
            $( '.bitly.long-url > .thumbshots' ).html( img );

            $( '.bitly.long-url > .thumbshots img' ).load( function() {
                $( '.bitly.long-url' ).removeClass( 'loading' );
                $( this ).unbind();

            } ).error( function() {
                $( '.bitly.long-url' ).removeClass( 'loading' );
                $( this ).unbind();
            } );
        }

    } }();
    var Nav = function() { return {
        init: function() {
            if ( sessionLoggedIn == 'n' ) return;
            this.overwriteHome();
            this.bindKeydownSubmit();
            this.addFav();
            this.addLists();
            this.addReply();

            if ( location.href.indexOf( '#favotter' ) != -1 ) {
                Favotter.getJSON();
            }
        },
        bindKeydownSubmit: function() {
            // 入力フォーム Ctrl + Enter で普通な送信
            //               Alt + Enter で強引な送信 (画面遷移するけどin_reply_to付きのRTとか出来ちゃうかも)
            $( '#status' ).keydown( function( e ) {
                if ( e.ctrlKey && e.keyCode == 13 ) {
                    $( '#tweeting_button' ).trigger( 'click' );
                } else if ( e.altKey && e.keyCode == 13 ) {
                    document.getElementById( 'status_update_form' ).submit();
                }
            } );
        },
        overwriteHome: function() {
            // 右上ナビゲーションのホームをクリックしたときの動作変更
            var homeTab = $( '#home_tab' );
            var navHome = $( '.top-navigation > li:first' );
            navHome.addClass( 'home' );

            if ( !homeTab[0] ) return;
            $( '#home_link' ).click( function() {
                $( '#home_tab > a:first' ).trigger( 'click' );
                Nav.resetReplyCount();
                navHome.addClass( 'loading' );
                var timer = setInterval( function() {
                    if ( !$( '#home_tab' ).hasClass( 'loading' ) ) {
                        navHome.removeClass( 'loading' );
                        clearInterval( timer );
                    }
                }, 400 );
                return false;
            } );
        },
        addReply: function() {
            // 右上ナビゲーションにリプライを追加する

            var home = $( '.top-navigation > .home' );
            home.after( [
                    ' <li class="replies">',
                    '<a id="replies_link" href="/replies">@' + sessionScreenName + '</a>',
                    '<a class="stat_count" title="' + locale[lang]['reset_count'] + '"></a>',
                    '</li>'
                ].join( '' ) );

            if ( $( '#replies_tab' )[0] ) {
                $( '#replies_tab > a:first' ).append( '<span class="stat_count">0</span>' );
                $( '.top-navigation .stat_count' ).click( function() {
                    Nav.resetReplyCount();
                } );
                var navReply = $( '.top-navigation > .replies' );
                $( '#replies_link' ).click( function() {
                    $( '#replies_tab > a:first' ).trigger( 'click' );
                    navReply.addClass( 'loading' );
                    Nav.resetReplyCount();
                    var timer = setInterval( function() {
                        if ( !$( '#replies_tab' ).hasClass( 'loading' ) ) {
                            navReply.removeClass( 'loading' );
                            clearInterval( timer );
                        }
                    }, 400 );
                    return false;
                } );
            }
        },
        setReplyCount: function( status, count ) {
            if ( !$( '#replies_tab' )[0] ) return;
            var navCount = $( '.top-navigation .stat_count' ),
                currentCount = navCount.html();

            if ( currentCount ) {
                count += Number( currentCount.replace( /[^\d]/g, '' ) );
            }
            count = Math.max( 0, count );
            if ( count ) {
                navCount.addClass( 'unread' ).html( count );
                $( '#replies_tab .stat_count' ).html( count );
            } else {
                Nav.resetReplyCount();
            }
        },
        readStatus: function() {
            Nav.setReplyCount( $( this ), -1 );
            $( this ).removeClass( 'unread' );
            $( this ).unbind( 'click', Nav.readStatus );
        },
        resetReplyCount: function() {
            $( '.top-navigation .stat_count' ).removeClass( 'unread' ).html( '' );
            $( '#replies_tab .stat_count' ).html( '0' );
        },
        addLists: function() {
            // 右上ナビゲーションにリストを追加する

            var home = $( '.top-navigation > .home' );
            home.after( [
                ' <li class="lists">',
                '<a id="lists_link" href="/' + sessionScreenName + '/lists">' + locale[lang]['lists'] + '</a>',
                '</li>'
                ].join( '' ) );

            if ( $( '#side_lists .lists-links a > span:first' )[0] ) {
                $( '.top-navigation .lists' ).append( '<div><span class="divvy"></span><ul></ul></div>' );
                if ( pageScreenName ) {
                    $( '.top-navigation .lists ul' ).append( '<li><a href="/' + pageScreenName + '/lists">' + locale[lang]['lists_title'].replace( '{screenName}', pageScreenName ) + '</a></li>' );
                }
                $( '#side_lists .lists-links a > span' ).each( function() {
                    var list = $( this.parentNode );
                    var li = document.createElement( 'li' );
                    var a = document.createElement( 'a' );
                    li.appendChild( a );
                    $( '.top-navigation .lists ul' ).append( li );
                    a = $( a ).attr( 'href', list.attr( 'href' ) ).html( list.html() );

                    var navLists = $( '#lists_link' ).parent( 'li' );
                    if ( pageScreenName ) {
                        return true;
                    }
                    a.click( function() {
                        Nav.resetReplyCount();
                        list.trigger( 'click' );
                        navLists.addClass( 'loading' );
                        listLi = $( list[0].parentNode );
                        var timer = setInterval( function() {
                            if ( !listLi.hasClass( 'loading' ) ) {
                                navLists.removeClass( 'loading' );
                                clearInterval( timer );
                            }
                        }, 400 );
                        return false;
                    } );
                } );
            }
        },
        addFav: function() {
            var home = $( '.top-navigation > .home' );
            // ふぁぼったー
/*            home.after( [
                ' <li class="favotter">',
                '<a id="favotter_link" href="#">' + ( pageScreenName ? pageScreenName + '\'s ' : '' ) + locale[lang]['favotter'] + '</a>',
                '</li>'
                ].join( '' ) );
            $( '#favotter_link' ).click( function() {
                $( this ).parent( 'li' ).addClass( 'loading' );
                Fav.getJSON( 'favotter' );
            } );

*/
            // favstar
            home.after( [
                ' <li class="favstar">',
                '<a id="favstar_link" href="#">' + ( pageScreenName ? pageScreenName + '\'s ' : '' ) + locale[lang]['favstar'] + '</a>',
                '</li>'
                ].join( '' ) );

            $( '#favstar_link' ).click( function() {
                $( this ).parent( 'li' ).addClass( 'loading' );
                Fav.getJSON( 'favstar' );
            } );
        }
    } }();

    var Trends = function() { return {
        timer: null,
        init: function() {
            var trend = $( '#local_trend_locations' );
            if ( !trend[0] ) return;

            // $( '.buzztter.ja' ).click() だと思うように動作しないんで onclick 使ってる
            trend.children( 'p:first' ).before(
                [
                    '<label>Others</label>',
                    '<ul id="local_trend_others" class="clearfix">',
                    '<li><a class="buzztter ja" href="javascript:void(0);" onclick="oflotter.Trends.getJSON(\'buzztter\',\'ja\')">buzztter (ja)</a></li>',
                    '<li><a class="buzztter en" href="javascript:void(0);" onclick="oflotter.Trends.getJSON(\'buzztter\',\'en\')">buzztter (en)</a></li>',
                    '<li><a class="favotter best" href="javascript:void(0);" onclick="oflotter.Trends.getJSON(\'favotter\')">ふぁぼったー</a></li>',
                    '</ul>',
                    '<hr />'
                ].join( '' )
            );
        },
        clear: function() {
            clearInterval( oflotter.Trends.timer );
            oflotter.Trends.timer = null;
        },
        getJSON: function( site, mode ) {
            oflotter.Trends.clear();
            if ( !site ) return;
            // とりあえず buzztter と ふぁぼったーの人気
            if ( site == 'buzztter' ) {
                if ( [ 'ja', 'en' ].indexOf( mode ) == -1 ) {
                    mode = 'ja';
                }
                var text = 'buzztter' + ( mode != 'ja' ? ' (en)' : '' );
                var url  = 'http://buzztter.com/' + mode + '/rss';

                // buzztterは30秒ごとにリロードしてるけどRSS取得は1分ごとに
                oflotter.Trends.timer = setInterval( function() {
                    if ( $( '#location_menu' ).text().indexOf( 'buzztter' ) == -1 ) {
                        // buzztterじゃなければタイマー止める
                        oflotter.Trends.clear();
                        return;
                    }
                    oflotter.Trends.getJSON( site, mode );
                }, 60000 );

            } else {
                site = 'favotter';
                mode = 'best';
                var text = oflotter.locale[ oflotter.lang ]['favotter'];
                var url  = 'http://favotter.net/home.php?env=rss&mode=best';

            }
            $( '#trends_loading').show();

            // 若干タイミングずらす
            setTimeout( function() {
                $( '#local_trend_locations' ).find( 'li' ).removeClass( 'active' );
                $( '#local_trend_others' ).find( '.' + site + '.' + mode ).parent( 'li' ).addClass( 'active' );
            }, 300 );

            $( '#location_menu' ).text( text );

            $.getJSON(
                'http://pipes.yahoo.com/pipes/pipe.run?_callback=?',
                {
                    _id: 'eaf275b910e3d7421033ce6f3076cce0',
                    _render: 'json',
                    url: url
                },
                function( json ) {
                    if ( !json['count'] ) return;
                    oflotter.Trends.setTrends( site, json['value'] );
                }
            );
        },
        setTrends: function( site, value ) {

            $( '#trends_loading').hide();

            var items = value['items'];
            var trendsLinks = $( '.sidebar-menu.trends-links' );

            trendsLinks.empty();
            trendsLinks.css( { opacity: 0 } );
            for ( var i = 0; i < 15; i++ ) {
                var item = items[i];
                if ( !item ) break;
                trendsLinks.append( '<li class="link-title ' + site + '"><a href="' + item[ 'link' ] + '">' + item[ 'title' ] + '</li>' );
            }
            trendsLinks.fadeTo( 'fast', 1 );
        }
    } }();
    var Fav = function() { return {
        // ふぁぼったー, favstarのやつまだ考え中
        getJSON: function( site ) {
            // プロフィールページ開いてたらそのユーザー、それ以外は自分のを取得する
            var screenName = ( pageScreenName ? pageScreenName : sessionScreenName );
            if ( !site ) site = 'favstar';
            if ( site == 'favstar' ) {
                $.getJSON(
                    'http://pipes.yahoo.com/pipes/pipe.run?_callback=?',
                    {
                        _id: '612ca02abf0884ef5640a376a87a9a7b',
                        _render: 'json',
                        user: screenName
                    },
                    function( json ) {
                        if ( !json['count'] ) {
                            $( '.top-navigation > li.favstar:first' ).removeClass( 'loading' );

                            return;
                        }
                        Fav.setFavstar( json['value']['items'] );
                    }
                );
            } else {
                $.getJSON(
                    'http://pipes.yahoo.com/pipes/pipe.run?_callback=?',
                    {
                        _id: 'eaf275b910e3d7421033ce6f3076cce0',
                        _render: 'json',
                        url: 'http://favotter.net/user/' + screenName + '?env=rss&mode=new'
                    },
                    function( json ) {
                        if ( !json['count'] ) {
                            $( '.top-navigation > li.favotter:first' ).removeClass( 'loading' );

                            return;
                        }
                        Fav.setFavotter( json['value']['items'] );
                    }
                );
            }
        },
        setFavotter: function( items ) {
            var tl = $( '#timeline' );
            tl.empty();
            document.body.id = 'favotter';
            $( '#heading' ).html( locale[lang]['favotter'] );
            for ( var i = 0, length = items.length; i < length; i++ ) {
                var status = [
                    '<li class="hentry status favotter">',
                    '<span class="status-body">',
                    '<span class="status-content">',
                    items[i][ 'description' ],
                    '</span>',
                    '</span>',
                    '</li>'
                    ].join( '' );
                    
                tl.append( status );
            }
            tl.append( '続きはWebで！' );
            $( '.top-navigation > li.favotter:first' ).removeClass( 'loading' );
        },
        setFavstar: function( items ) {
            var tl = $( '#timeline' );
            tl.empty();
            document.body.id = 'favstar';
            var screenName = ( pageScreenName ? pageScreenName : sessionScreenName );
            $( '#heading' ).html( screenName + '\'s recent favstar' );
            for ( var i = 0, length = items.length; i < length; i++ ) {
                var status = [
                    '<li class="hentry status favstar">',
                    '<span class="status-body">',
                    items[i][ 'content' ].replace( /favstar\.fm\/users/g, 'twitter.com' ).replace( / target="_blank"/g, '' ),
                    '</span>',
                    '</li>'
                    ].join( '' );
                    
                tl.append( status );
            }
            $( '.top-navigation > li.favstar:first' ).removeClass( 'loading' );
        }
    } }();

    // バージョンチェックする
    var Version = function() { return {
        current: version,
        check: function( json ) {
            if ( !json['version'] || oflotter.Version.current == json['version'] ) return;
            $( document.body ).append( [
                '<div id="oflotter-new-version">',
                '<a href="http://oflow.info/files/oflotter.user.js">',
                'oflotter ' + json['version'] + ' is released</a>',
                '</div>'
            ].join( '' ) );
            setTimeout( function() {
                $( '#oflotter-new-version' ).animate( { height: 'show', opacity: 'show' }, 'fast' );
            }, 3000 );
        }
    } }();

    const protocol  = window.location.protocol;


    var locale = {
            en: {
                'home'  : 'Home',
                'reply' : 'Reply',
                'reply_title' : 'reply to {screenName}',
                'retweet' : 'Retweet',
                'rt'    : 'RT @:',
                'rt_title' : 'RT @{screenName}:',
                'lists' : 'Lists',
                'lists_title' : '{screenName}\'s lists',
                'dm'    : 'Direct message {screenName}',
                'fav'   : 'favorite this tweet',
                'source': 'via {source}',
                'in_reply_to' : 'in reply to {screenName}',
                'time'  : [
                              'about {time} seconds ago',
                              'about {time} minutes ago',
                              'about {time} hours ago',
                              'about {time} days ago',
                              'meccha ago'
                          ],
                'more'   : 'more',
                'scroll' : 'scroll new tweet',
                'reset_count': 'reset reply count',
                'favotter' : 'Favotter',
                'favstar' : 'favstar',
                'shimeji': 'Shimeji'
            },
            ja: {
                'home'  : 'ホーム',
                'reply' : '返信',
                'reply_title' : '{screenName}に返事',
                'retweet' : 'リツイート',
                'rt'    : '非公式RT',
                'rt_title' : 'RT @{screenName}:',
                'lists' : 'リスト',
                'lists_title' : '{screenName}のリスト',
                'dm'    : '{screenName}にダイレクトメッセージ',
                'fav'   : 'ツイートをお気に入りに登録',
                'source': '{source}から',
                'in_reply_to' : '{screenName}宛',
                'time'  : [
                              '約{time}秒前',
                              '約{time}分前',
                              '約{time}時間前',
                              '約{time}日前',
                              'めっちゃ前'
                          ],
                'more'   : 'もっと読む',
                'scroll': '新しいツイートにスクロール',
                'reset_count': 'リプライ数リセット',
                'favotter' : 'ふぁぼったー',
                'favstar' : 'favstar',
                'shimeji': 'しめじ'
            }
        };

    var lang = ( $( document.body ).hasClass( 'ja' ) ? 'ja' : 'en' );


    var template = [
        '<span class="thumb vcard author"><a class="tweet-url profile-pic url" href="' + protocol + '//twitter.com/{screen_name}"><img class="photo fn" width="48" height="48" src="{profile_image_url}" alt="{screen_name}" title="{screen_name}" /></a></span>',
        '<span class="status-body">',
        '<span class="status-content">',
        '<strong><a class="tweet-url screen-name" href="' + protocol + '//twitter.com/{screen_name}">{screen_name}</a></strong> ',
        '<span class="entry-content">{text}</span>',
        '</span>',
        '<span class="meta entry-meta"><a class="entry-date" href="' + protocol + '//twitter.com/{screen_name}/status/{id}" rel="bookmark"><span class="published timestamp" data="{time:\'{created_at}\'}">{time}</a> <span>' + locale[lang]['source'] + '</span>{in_reply_to}</span>',
        '<ul class="actions-hover"></ul><ul class="meta-data clearfix"></ul>',
        '</span>'
        ];

    

    // セッション情報とか取得しとく
    var sessionScreenName = $( 'meta[name="session-user-screen_name"]' ).attr( 'content' );
    var sessionLoggedIn   = $( 'meta[name="session-loggedin"]' ).attr( 'content' );
    var pageScreenName = $( 'meta[name="page-user-screen_name"]' ).attr( 'content' );

    init();

    return {
        Version: Version,
        lang: lang,
        locale: locale,
        sessionLoggedIn: sessionLoggedIn,
        sessionScreenName: sessionScreenName,
        pageScreenName: pageScreenName,
        TweetUrl: TweetUrl,
        Fav: Fav,
        Trends: Trends,
        Refresh: Refresh,
        Nav: Nav
    }
};

// 旧UIならoflotter実行する
if ( document.body.className.indexOf( '-style-twttr' ) == -1 ) {
    var script = document.createElement( 'script' );
    script.id = 'oflotter';
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.appendChild (
        document.createTextNode( [
            '  $( ".fixed-banners" ).remove();',
            'var oflotter = (' + oflotter_jquery.toString() + ')();',
            'oflotter.Trends.getJSON( "buzztter", "ja" );',
            'if ( $( document.body ).hasClass( "phoenix-skybar" ) ) {',
            '  $( document.body ).removeClass( "phoenix-skybar" );',
            '}'
        ].join( '' ) )
    );
    document.body.appendChild( script );

    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = 'http://oflow.info/files/oflotter.json?' + parseInt( (new Date ) / 1000 );
    document.body.appendChild( script );

}
