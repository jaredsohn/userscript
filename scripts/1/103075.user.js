// ==UserScript==
// @name mdq
// @namespace cafe.moonlight.gr.jp
// @include http://mdq.member.jp.square-enix.com/*
// @version 2.3
// ==/UserScript==
//

// sometime chrome not define unsafeWindow
var unsafeWindow = this['unsafeWindow'] || window;

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}

// cho45 - http://lowreal.net/
function $x(exp, context) {
    var Node = unsafeWindow.Node;
    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for (var i = 0, len = result.snapshotLength; i < len ; i++) {
            var item = result.snapshotItem(i);
            switch (item.nodeType) {
            case 1: //Node.ELEMENT_NODE:
                ret.push(item);
                break;
            case 2: //Node.ATTRIBUTE_NODE:
            case 3: //Node.TEXT_NODE:
                ret.push(item.textContent);
                break;
            default:
                break;
            }
        }
        return ret;
    }
    }
    return null;
}

var url = document.location.href;
if (url.match("http://mdq.member.jp.square-enix.com/charstat.php")) {
    if (url.match(/c=(\d+)/)) {
        var extracted = RegExp.$1;
        var char_id = parseInt(extracted);

        var paginator = document.createElement('nav');
        paginator.className = 'cmd';
        var pul = document.createElement('ul');
        paginator.appendChild(pul);

        var li1 = document.createElement('li');
        var a1 = document.createElement('a');
        a1.href = '/charstat.php?c=' + (char_id - 1);
        a1.textContent = '前へ';
        li1.appendChild(a1);
        pul.appendChild(li1);

        var li2 = document.createElement('li');
        var a2 = document.createElement('a');
        a2.href = '/charstat.php?c=' + (char_id + 1);
        a2.textContent = '次へ';
        li2.appendChild(a2);
        pul.appendChild(li2);

        document.body.appendChild(paginator);
    }
}

if (url.match("http://mdq.member.jp.square-enix.com/charstat.php")) {
    var anchors = $x('//a[.="模擬対戦"]');
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        if (anchor.className === 'disable') {
            var bbs_anchors = $x('//a[.="個人掲示板"]');
            if (bbs_anchors.length < 1) {
                return;
            }
            var player_href = bbs_anchors[0].href
            if (player_href.match(/.*bbs\.php\?bn=(\d+)/)) {
                anchor.className = '';
                anchor.href = 'btl_pvp.php?t=' + RegExp.$1;
            }
        }
    }
}

var SKILLS = {
    'クルードスラッシュ':{code:1,type:2,para:'syn',k:1.2,desc:''},
    'クルードスマッシュ':{code:2,type:2,para:'syn',k:1.2,desc:''},
    'クルードスラスト':{code:3,type:2,para:'syn',k:1.2,desc:''},
    '攻撃力20%アップ':{code:4,type:2,para:'syn',k:1.2,desc:''},
    'カットダウン':{code:5,type:2,para:'syn',k:1.2,desc:''},
    'ソードリフト':{code:6,type:2,para:'syn',k:1.2,desc:''},
    'ダブルスラッシュ':{code:7,type:2,para:'syn',k:1.2,desc:''},
    'ソードマスター':{code:8,type:2,para:'syn',k:1.2,desc:'自らの斬撃耐性を高める常質技法'},
    'ハードヒット':{code:9,type:2,para:'syn',k:1.2,desc:''},
    'ノックダウン':{code:10,type:2,para:'syn',k:1.2,desc:''},
    'ダブルクラッシュ':{code:11,type:2,para:'syn',k:1.2,desc:''},
    'ハンマーマスター':{code:12,type:2,para:'syn',k:1.2,desc:''},
    'ブレイヴァリー':{code:13,type:2,para:'syn',k:1.2,desc:''},
    'クイックリフト':{code:14,type:2,para:'syn',k:1.2,desc:''},
    'ダブルスラスト':{code:15,type:2,para:'syn',k:1.2,desc:''},
    'スピアマスター':{code:16,type:2,para:'syn',k:1.2,desc:''},
    'リフトアッパー':{code:17,type:2,para:'syn',k:1.2,desc:''},
    'ハードタックル':{code:18,type:2,para:'syn',k:1.2,desc:''},
    '連掌':{code:19,type:2,para:'syn',k:1.2,desc:''},
    '筋力20％アップ':{code:20,type:2,para:'syn',k:1.2,desc:''},
    '飛燕斬':{code:21,type:2,para:'syn',k:1.2,desc:''},
    'ソニックブーム':{code:22,type:2,para:'syn',k:1.2,desc:''},
    'デルタスラッシュ':{code:23,type:2,para:'syn',k:1.2,desc:''},
    'クレセントムーン':{code:24,type:2,para:'syn',k:1.2,desc:''},
    '炎の刻印':{code:25,type:2,para:'syn',k:1.2,desc:''},
    '氷の刻印':{code:26,type:2,para:'syn',k:1.2,desc:''},
    '雷の刻印':{code:27,type:2,para:'syn',k:1.2,desc:''},
    'ダブルクレセント':{code:28,type:2,para:'syn',k:1.2,desc:''},
    'パワークラッシュ':{code:29,type:2,para:'syn',k:1.2,desc:''},
    'ウォークライ':{code:30,type:2,para:'syn',k:1.2,desc:''},
    'バトルフォーカス':{code:31,type:2,para:'syn',k:1.2,desc:''},
    '一撃粉砕':{code:32,type:2,para:'syn',k:1.2,desc:''},
    'ブランディッシュ':{code:33,type:2,para:'syn',k:1.2,desc:''},
    'ブラッディスウィング':{code:34,type:2,para:'syn',k:1.2,desc:''},
    'バーサーク':{code:35,type:2,para:'syn',k:1.2,desc:''},
    'ジェノサイド':{code:36,type:2,para:'syn',k:1.2,desc:''},
    'チャージ':{code:37,type:2,para:'syn',k:1.2,desc:''},
    'ガードスタンス':{code:38,type:2,para:'syn',k:1.2,desc:'自身防御力UP+囮'},
    'クリティカルスパイク':{code:39,type:2,para:'syn',k:1.2,desc:''},
    'ファイナルチャージ':{code:40,type:2,para:'syn',k:1.2,desc:''},
    '光の刻印':{code:41,type:2,para:'syn',k:1.2,desc:'攻撃力up+光属性付与'},
    'セイフキープ':{code:42,type:2,para:'syn',k:1.2,desc:'自分以外の味方に光の障壁をはり、敵の攻撃から守る強化術式'},
    'クロスブレイク':{code:43,type:2,para:'syn',k:1.2,desc:''},
    'クルセイド':{code:44,type:2,para:'syn',k:1.2,desc:''},
    'ショルダーチャージ':{code:45,type:2,para:'syn',k:1.2,desc:''},
    'レッグバイター':{code:46,type:2,para:'syn',k:1.2,desc:''},
    'クロスカウンター':{code:47,type:2,para:'syn',k:1.2,desc:''},
    '倒地空襲':{code:48,type:2,para:'syn',k:1.2,desc:''},
    '地烈':{code:49,type:2,para:'syn',k:1.2,desc:''},
    '空破':{code:50,type:2,para:'syn',k:1.2,desc:'衝撃波で空を飛ぶ敵を吹き飛ばすと共に、反射術壁を破る攻撃技法 '},
    '乱撃':{code:51,type:2,para:'syn',k:1.2,desc:''},
    '無双乱舞':{code:52,type:2,para:'syn',k:1.2,desc:''},
    'クルードスタブ':{code:53,type:2,para:'syn',k:1.2,desc:''},
    'クルードショット':{code:54,type:2,para:'syn',k:1.2,desc:''},
    'ワイヤートラップ':{code:55,type:2,para:'syn',k:1.2,desc:''},
    '荷重20%ダウン':{code:56,type:2,para:'syn',k:1.2,desc:''},
    '応急手当':{code:57,type:2,para:'syn',k:1.2,desc:''},
    'パウダーショット':{code:58,type:2,para:'syn',k:1.2,desc:'敵単体攻撃+ドライ'},
    'ウォーターショット':{code:59,type:2,para:'syn',k:1.2,desc:''},
    '知覚力20%アップ':{code:60,type:2,para:'syn',k:1.2,desc:''},
    '闇討ち':{code:61,type:2,para:'syn',k:1.2,desc:'敵単体攻撃+スタン'},
    '目潰し':{code:62,type:2,para:'syn',k:1.2,desc:''},
    'バックスタブ':{code:63,type:2,para:'syn',k:1.2,desc:''},
    '器用さ20%アップ':{code:64,type:2,para:'syn',k:1.2,desc:''},
    'スローイングナイフ':{code:65,type:2,para:'syn',k:1.2,desc:''},
    '水遁の術':{code:66,type:2,para:'syn',k:1.2,desc:''},
    '土遁の術':{code:67,type:2,para:'syn',k:1.2,desc:''},
    '影隠れ':{code:68,type:2,para:'syn',k:1.2,desc:'自身隠密付与'},
    'ハードスラップ':{code:69,type:2,para:'syn',k:1.2,desc:''},
    'リフトアップ':{code:70,type:2,para:'syn',k:1.2,desc:'敵単体攻撃[帯状]+リフト'},
    'マイントラップ':{code:71,type:2,para:'syn',k:1.2,desc:'単体ダメージ(対地)/リフト'},
    'ヴァイタリティ':{code:72,type:2,para:'syn',k:1.2,desc:'睡眠耐性(?)'},
    '連射':{code:73,type:2,para:'syn',k:1.2,desc:''},
    'エイミングショット':{code:74,type:2,para:'syn',k:1.2,desc:''},
    'ソニックスティンガー':{code:75,type:2,para:'syn',k:1.2,desc:''},
    'ライジングショット':{code:76,type:2,para:'syn',k:1.2,desc:''},
    'ポイズンショット':{code:77,type:2,para:'syn',k:1.2,desc:''},
    'トランキルショット':{code:78,type:2,para:'syn',k:1.2,desc:''},
    'メディカルケア':{code:79,type:2,para:'syn',k:1.2,desc:''},
    'レインショット':{code:80,type:2,para:'syn',k:1.2,desc:''},
    'ストレイトレイド':{code:81,type:2,para:'syn',k:1.2,desc:''},
    'シャドウレイド':{code:82,type:2,para:'syn',k:1.2,desc:''},
    'トリプルピアス':{code:83,type:2,para:'syn',k:1.2,desc:''},
    'アクセルラッシュ':{code:84,type:2,para:'syn',k:1.2,desc:''},
    'ヴェノムエッジ':{code:85,type:2,para:'syn',k:1.2,desc:''},
    'ネックスリット':{code:86,type:2,para:'syn',k:1.2,desc:''},
    'ハングワイヤー':{code:87,type:2,para:'syn',k:1.2,desc:''},
    'アサシネイション':{code:88,type:2,para:'syn',k:1.2,desc:''},
    '口封じ':{code:89,type:2,para:'syn',k:1.2,desc:''},
    '筋断ち':{code:90,type:2,para:'syn',k:1.2,desc:''},
    '空蝉の術':{code:91,type:2,para:'syn',k:1.2,desc:''},
    'イズナ落とし':{code:92,type:2,para:'syn',k:1.2,desc:''},
    '闇の刻印':{code:93,type:2,para:'syn',k:1.2,desc:''},
    '春幻の術':{code:94,type:2,para:'syn',k:1.2,desc:'敵単体筋力減少＋睡眠'},
    '霧幻の術':{code:95,type:2,para:'syn',k:1.2,desc:'敵単体同調減少+支配'},
    '鬼門遁甲陣':{code:96,type:2,para:'syn',k:1.2,desc:''},
    'バーストフロア':{code:97,type:2,para:'syn',k:1.2,desc:'発動:敵単体ダメージ(対ドライ)＋リフト＋燃焼'},
    'ベアトラップ':{code:98,type:2,para:'syn',k:1.2,desc:'発動:敵単体器用減少＋ショック＋捕縛'},
    'トラップセンサー':{code:99,type:2,para:'syn',k:1.2,desc:'自身ショック耐性＋捕縛耐性付与(両方未確認)'},
    'ペンデュラムサイズ':{code:100,type:2,para:'syn',k:1.2,desc:''},
    'フローズンピット':{code:101,type:2,para:'syn',k:1.2,desc:'単体ダメージ+ダウン+凍結'},
    'フラッシュマイン':{code:102,type:2,para:'syn',k:1.2,desc:'敵単体知覚DOWN＋ブランク+暗闇'},
    'サーチライト':{code:103,type:2,para:'syn',k:1.2,desc:'ブランク、暗闇耐性'},
    'ストーンプレス':{code:104,type:2,para:'syn',k:1.2,desc:''},
    'フレイムスクイーズ':{code:105,type:2,para:'syn',k:1.2,desc:''},
    'フリーズバイト':{code:106,type:2,para:'syn',k:1.2,desc:''},
    'フォトンフラックス':{code:107,type:2,para:'syn',k:1.2,desc:''},
    'サイコスピア':{code:108,type:2,para:'syn',k:1.2,desc:''},
    'ファイアランス':{code:109,type:2,para:'syn',k:1.2,desc:''},
    'エクスプロージョン':{code:110,type:2,para:'syn',k:1.2,desc:''},
    'ファイアフォース':{code:111,type:2,para:'syn',k:1.2,desc:''},
    'ヒートバリア':{code:112,type:2,para:'syn',k:1.2,desc:'ウェット、凍結耐性'},
    'プラズマハープーン':{code:113,type:2,para:'syn',k:1.2,desc:''},
    'コールライトニング':{code:114,type:2,para:'syn',k:1.2,desc:''},
    'サンダーフォース':{code:115,type:2,para:'syn',k:1.2,desc:''},
    '同調20%アップ':{code:116,type:2,para:'syn',k:1.2,desc:''},
    'アイシクルランス':{code:117,type:2,para:'syn',k:1.2,desc:''},
    'ブリザード':{code:118,type:2,para:'syn',k:1.2,desc:''},
    'コールドフォース':{code:119,type:2,para:'syn',k:1.2,desc:''},
    '魔力20%アップ':{code:120,type:2,para:'syn',k:1.2,desc:''},
    'マインドブラスト':{code:121,type:2,para:'syn',k:1.2,desc:''},
    'コンフュージョン':{code:122,type:2,para:'syn',k:1.2,desc:''},
    'サイキックフォース':{code:123,type:2,para:'syn',k:1.2,desc:''},
    '知力20%アップ':{code:124,type:2,para:'syn',k:1.2,desc:''},
    'レヴァンテイン':{code:125,type:2,para:'syn',k:1.2,desc:''},
    'ヴォルカニックフレア':{code:126,type:2,para:'syn',k:1.2,desc:''},
    'アーマメルト':{code:127,type:2,para:'syn',k:1.2,desc:''},
    'クリムゾンデトネイト':{code:128,type:2,para:'syn',k:1.2,desc:''},
    'ミスティックテイム':{code:129,type:2,para:'syn',k:1.2,desc:''},
    'コンジュアーエレメンタル':{code:130,type:2,para:'syn',k:1.2,desc:''},
    'イーサヴォルテクス':{code:131,type:2,para:'syn',k:1.2,desc:''},
    'エレメンタルバースト':{code:132,type:2,para:'syn',k:1.2,desc:''},
    'アストラルテイム':{code:133,type:2,para:'syn',k:1.2,desc:''},
    'ハウリングファントム':{code:134,type:2,para:'syn',k:1.2,desc:''},
    'コントロールデーモン':{code:135,type:2,para:'syn',k:1.2,desc:''},
    'サバト':{code:136,type:2,para:'syn',k:1.2,desc:''},
    'クラウソラス':{code:137,type:2,para:'syn',k:1.2,desc:''},
    'アークサンダー':{code:138,type:2,para:'syn',k:1.2,desc:''},
    'ディヴァイントランス':{code:139,type:2,para:'syn',k:1.2,desc:''},
    'サンダーテンペスト':{code:140,type:2,para:'syn',k:1.2,desc:''},
    'コキュートス':{code:141,type:2,para:'syn',k:1.2,desc:''},
    'ワードオヴカース':{code:142,type:2,para:'syn',k:1.2,desc:''},
    'サクリファイス':{code:143,type:2,para:'syn',k:1.2,desc:''},
    'コールオヴアビス':{code:144,type:2,para:'syn',k:1.2,desc:''},
    '魂の刻印':{code:145,type:2,para:'syn',k:1.2,desc:''},
    'ダイアモンドダスト':{code:146,type:2,para:'syn',k:1.2,desc:''},
    'ブラッドラスト':{code:147,type:2,para:'syn',k:1.2,desc:''},
    'ブラッディリプライザル':{code:148,type:2,para:'syn',k:1.2,desc:''},
    'ゲイボルグ':{code:149,type:2,para:'syn',k:1.2,desc:''},
    'グラヴィティプレス':{code:150,type:2,para:'syn',k:1.2,desc:''},
    'ソウルプリズン':{code:151,type:2,para:'syn',k:1.2,desc:''},
    'イヴルアイ':{code:152,type:2,para:'syn',k:1.2,desc:''},
    'スリープクラウド':{code:153,type:2,para:'syn',k:1.2,desc:''},
    'ナイトメア':{code:154,type:2,para:'syn',k:1.2,desc:''},
    'プレイダーク':{code:155,type:2,para:'syn',k:1.2,desc:''},
    'エターナルドリーム':{code:156,type:2,para:'syn',k:1.2,desc:''},
    'ヒーリング':{code:157,type:2,para:'syn',k:1.2,desc:''},
    'ペイン':{code:158,type:2,para:'syn',k:1.2,desc:''},
    'インジャリー':{code:159,type:2,para:'syn',k:1.2,desc:''},
    '防御力20%アップ':{code:160,type:2,para:'syn',k:1.2,desc:''},
    'ヒーリングフィールド':{code:161,type:2,para:'syn',k:1.2,desc:''},
    'フォースシールド':{code:162,type:2,para:'syn',k:1.2,desc:''},
    'プロテクションダーク':{code:163,type:2,para:'syn',k:1.2,desc:''},
    'ピュリファイ':{code:164,type:2,para:'syn',k:1.2,desc:'毒、麻痺耐性'},
    'プロテクションファイア':{code:165,type:2,para:'syn',k:1.2,desc:''},
    'プロテクションコールド':{code:166,type:2,para:'syn',k:1.2,desc:''},
    'プロテクションサンダー':{code:167,type:2,para:'syn',k:1.2,desc:''},
    'シールドエリア':{code:168,type:2,para:'syn',k:1.2,desc:'スタン,封術耐性'},
    'ホーリーレイ':{code:169,type:2,para:'syn',k:1.2,desc:''},
    'ブレスウェポン':{code:170,type:2,para:'syn',k:1.2,desc:''},
    'プロテクションマインド':{code:171,type:2,para:'syn',k:1.2,desc:''},
    'マインドブロック':{code:172,type:2,para:'syn',k:1.2,desc:'支配、恐怖耐性'},
    'アルカナ':{code:173,type:2,para:'syn',k:1.2,desc:''},
    'フォーチュン':{code:174,type:2,para:'syn',k:1.2,desc:''},
    'プロテクションライト':{code:175,type:2,para:'syn',k:1.2,desc:''},
    '霊感20％アップ':{code:176,type:2,para:'syn',k:1.2,desc:''},
    'キュアライト':{code:177,type:2,para:'syn',k:1.2,desc:''},
    'デヴォーション':{code:178,type:2,para:'syn',k:1.2,desc:''},
    'ホーリーオーダー':{code:179,type:2,para:'syn',k:1.2,desc:''},
    'セラフィックレイストーム':{code:180,type:2,para:'syn',k:1.2,desc:''},
    'スロウ':{code:181,type:2,para:'syn',k:1.2,desc:'全体に荷重増加+ショック'},
    'インヴィジブルネット':{code:182,type:2,para:'syn',k:1.2,desc:'敵全体ダメージ＋飛行解除'},
    'パワーサージ':{code:183,type:2,para:'syn',k:1.2,desc:'全体に電磁耐性低下+スタン'},
    'ワームスウォーム':{code:184,type:2,para:'syn',k:1.2,desc:''},
    'リフレクト':{code:185,type:2,para:'syn',k:1.2,desc:''},
    'キャンセレイション':{code:186,type:2,para:'syn',k:1.2,desc:'全ての敵の幻影、反射術壁を解除し、同調を低下させる攻撃術式'},
    'アンチグラヴィティ':{code:187,type:2,para:'syn',k:1.2,desc:''},
    'アイソレイション':{code:188,type:2,para:'syn',k:1.2,desc:'敵単体ダメージ＋ショック'},
    'ウィークネス':{code:189,type:2,para:'syn',k:1.2,desc:'全体に攻撃力低下+ブランク'},
    'ナチュラルパワー':{code:190,type:2,para:'syn',k:1.2,desc:''},
    'ディスターバンス':{code:191,type:2,para:'syn',k:1.2,desc:'敵全員の精神耐性低下+ショック'},
    'ウィンターブラスト':{code:192,type:2,para:'syn',k:1.2,desc:''},
    'ストリクトオーダー':{code:193,type:2,para:'syn',k:1.2,desc:'2回攻撃'},
    'ホーリーシャイン':{code:194,type:2,para:'syn',k:1.2,desc:''},
    'セイントファイア':{code:195,type:2,para:'syn',k:1.2,desc:'冷気耐性減少＋燃焼'},
    'コンシールメント':{code:196,type:2,para:'syn',k:1.2,desc:''},
    'クロスレイ':{code:197,type:2,para:'syn',k:1.2,desc:''},
    'アッシュトゥアッシュ':{code:198,type:2,para:'syn',k:1.2,desc:''},
    'ホーリーウォーター':{code:199,type:2,para:'syn',k:1.2,desc:'敵全体炎熱耐性低下＋ウェット'},
    'エナジーセイバー':{code:200,type:2,para:'syn',k:1.2,desc:''},
    'プレディクト':{code:201,type:2,para:'syn',k:1.2,desc:'自身知覚上昇+幻影付与'},
    'ヘイスト':{code:202,type:2,para:'syn',k:1.2,desc:''},
    'クロノフォビア':{code:203,type:2,para:'syn',k:1.2,desc:'敵全体光耐性減少＋恐怖'},
    'カタストロフ':{code:204,type:2,para:'syn',k:1.2,desc:''},
    'ゾディアック':{code:205,type:2,para:'syn',k:1.2,desc:''},
    'フラジャイル':{code:206,type:2,para:'syn',k:1.2,desc:''},
    'アストロフォビア':{code:207,type:2,para:'syn',k:1.2,desc:'敵の心に星や空に対する恐怖心を植えつけ、闇耐性を下げる攻撃術式'},
    'メテオストライク':{code:208,type:2,para:'syn',k:1.2,desc:''},
    'テイム':{code:209,type:2,para:'syn',k:1.2,desc:'愛玩動物を使役'},
    'テイマーウィップ':{code:210,type:2,para:'syn',k:1.2,desc:'敵単体攻撃'},
    'レッグバインダー':{code:211,type:2,para:'syn',k:1.2,desc:'敵単体攻撃+ダウン'},
    'ウィップバインド':{code:212,type:2,para:'syn',k:1.2,desc:'敵単体攻撃+捕縛'},
    'ビーストテイム':{code:213,type:2,para:'syn',k:1.2,desc:''},
    'バードテイム':{code:214,type:2,para:'syn',k:1.2,desc:''},
    'コントロールビースト':{code:215,type:2,para:'syn',k:1.2,desc:''},
    'ピンサータクティクス':{code:216,type:2,para:'syn',k:1.2,desc:''},
    'レプタイルテイム':{code:217,type:2,para:'syn',k:1.2,desc:''},
    'スネイクキラー':{code:218,type:2,para:'syn',k:1.2,desc:'敵単体ダメージ+ダウン'},
    'コブラファング':{code:219,type:2,para:'syn',k:1.2,desc:'敵単体ダメージ+毒'},
    'カモンスネイク':{code:220,type:2,para:'syn',k:1.2,desc:''},
    'インセクトユーズ':{code:221,type:2,para:'syn',k:1.2,desc:''},
    'インセクティサイド':{code:222,type:2,para:'syn',k:1.2,desc:''},
    'ショックニードル':{code:223,type:2,para:'syn',k:1.2,desc:''},
    'インセクトスウォーム':{code:224,type:2,para:'syn',k:1.2,desc:''},
    'アンデッドコマンド':{code:225,type:2,para:'syn',k:1.2,desc:''},
    'ターンアンデッド':{code:226,type:2,para:'syn',k:1.2,desc:''},
    'チリングスマイル':{code:227,type:2,para:'syn',k:1.2,desc:''},
    'アンデッドレギオン':{code:228,type:2,para:'syn',k:1.2,desc:''},
    'ディオーズテイム':{code:229,type:2,para:'syn',k:1.2,desc:''},
    'ビーストスレイヤー':{code:230,type:2,para:'syn',k:1.2,desc:'単体ダメージ+リフト'},
    'インストラクション':{code:231,type:2,para:'syn',k:1.2,desc:'ペットの攻撃力増加+アウェイク'},
    'ディオーズラッシュ':{code:232,type:2,para:'syn',k:1.2,desc:''},
    'ドラゴンテイム':{code:233,type:2,para:'syn',k:1.2,desc:''},
    'ドラゴンバスター':{code:234,type:2,para:'syn',k:1.2,desc:''},
    'インサイトメント':{code:235,type:2,para:'syn',k:1.2,desc:'ペット攻撃力増加+アウェイク'},
    'ドラゴンチャージ':{code:236,type:2,para:'syn',k:1.2,desc:''},
    'プラントユーズ':{code:237,type:2,para:'syn',k:1.2,desc:''},
    'ワイルドファイア':{code:238,type:2,para:'syn',k:1.2,desc:''},
    'シンパサイズ':{code:239,type:2,para:'syn',k:1.2,desc:''},
    'フォレストレイジ':{code:240,type:2,para:'syn',k:1.2,desc:''},
    'アニメイトコマンド':{code:241,type:2,para:'syn',k:1.2,desc:''},
    'ドールブレイカー':{code:242,type:2,para:'syn',k:1.2,desc:''},
    'イーサリンク':{code:243,type:2,para:'syn',k:1.2,desc:''},
    'アニメイトフォース':{code:244,type:2,para:'syn',k:1.2,desc:''},
    'メンテナンス':{code:248,type:2,para:'syn',k:1.2,desc:''},
    'モウイング':{code:252,type:2,para:'syn',k:1.2,desc:''},
    'レッグクラッシュ':{code:256,type:2,para:'syn',k:1.2,desc:''},
    'エンチャントウェポン':{code:260,type:2,para:'syn',k:1.2,desc:''},
    'リリース':{code:264,type:2,para:'syn',k:1.2,desc:''},
    'デモリッシュハンマー':{code:268,type:2,para:'syn',k:1.2,desc:''},
    '調べる':{code:272,type:2,para:'syn',k:1.2,desc:''},
    '魅力20%アップ':{code:276,type:2,para:'syn',k:1.2,desc:''},
    'ベアクロー':{code:309,type:2,para:'syn',k:1.2,desc:''},
    'ベアハッグ':{code:310,type:2,para:'syn',k:1.2,desc:''},
    'ハンティングスタイル':{code:311,type:2,para:'syn',k:1.2,desc:''},
    'ボディプレス':{code:312,type:2,para:'syn',k:1.2,desc:''}
};


var status = {
    hp: -1,
    lv:-1,
    exp:-1,
    str:-1,
    dex:-1,
    per:-1,
    syn:-1,
    ins:-1,
    luk:-1,
    chr:-1,
    wgt:-1,
    atk:-1,
    mgk:-1,
    def:-1
};

var st = function(text) {
    if (text.match(/\s*(.*)\sLv(\d*)/)) {
        var skill = SKILLS[RegExp.$1];

        if (typeof(skill) !== 'undefined') {
            var f = 0;
            var slv = parseInt(RegExp.$2);
            switch (skill.type) {
            case 2:
                f = (status.syn + 100) * status.mgk / 100 * (0.95 + 0.05*slv) * skill.k;
                break;
            }
            return {'name': RegExp.$1, 'lv': RegExp.$2, 'desc': skill.desc, 'min': Math.round(f*0.95), 'max': Math.round(f*1.05)};
        } else {
            return {'name': RegExp.$1, 'lv': RegExp.$2, 'desc': 'unknown', 'min': 0, 'max':0};
        }
    }
    return {'name': 'データなし', 'lv': 0};
}
// parse
if (url.match("http://mdq.member.jp.square-enix.com/charstat.php")) {
    var tds = $x('//table[2]/tbody/tr/td');
    var s = 'h' + tds.length + ' ';
    for (var i = 0; i < tds.length; i++) {
        s = s + i + ':' + tds[i].textContent + "\n";
        tds[i].title='hoge';
    }
    //alert(s);

    var li = 3;
    for (var i = 0; i < tds.length; i++) {
        if (tds[i].textContent.trim() == 'Lv') {
            li = i;
            break;
        }
    }
    //alert('li=' + li);
    status = {
        hp:tds[2].textContent,
        lv:tds[li + 1].textContent,
        exp:tds[li + 3].textContent,
        str:tds[li + 5].textContent,
        dex:tds[li + 7].textContent,
        per:tds[li + 9].textContent,
        syn:parseInt(tds[li + 11].textContent),
        itl:tds[li + 13].textContent,
        ins:tds[li + 15].textContent,
        luk:tds[li + 17].textContent,
        chr:tds[li + 19].textContent,
        wgt:tds[li + 21].textContent,
        atk:tds[li + 23].textContent,
        mgk:parseInt(tds[li + 25].textContent),
        def:tds[li + 27].textContent
    };
    //  alert('atk=' + status.atk);

    var skills = $x('//table[3]/tbody/tr/td');
    if (skills.length > 0) {
        var s = 'h' + skills.length + ' ';
        for (var i = 0; i < skills.length; i++) {
            s = s + i + ':' + skills[i].textContent + "\n";
            skills[i].title='hoge';
        }
        //  alert(s);
        status.skills = [st(skills[1].textContent), st(skills[3].textContent), st(skills[5].textContent), st(skills[7].textContent), st(skills[9].textContent), st(skills[11].textContent), st(skills[13].textContent)];
        for (var i = 0; i < 5; i++) {
            skills[3 + i * 2].title = status.skills[i + 1].desc + '(' + status.skills[i + 1].min + '-' + status.skills[i + 1].max + ')';
        }
    }
}


// 幅を広くする
//document.body.style.maxWidth='480px';

// デフォルトのショートカットを非表示にする
/*var shortcut = $x('//nav[@class="shortcut"]');
  for (var i = 0; i < shortcut.length; i++) {
  shortcut[i].style.display = 'none';
  }*/

// 通報ボタンを消す
if (url.match("http://mdq.member.jp.square-enix.com/bbs.php")) {
    var anchors = $x('//a[.="通報"]');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].style.display = 'none';
    }
}

// 市場のキャラクタ番号をリンクする
if (url.match("http://mdq.member.jp.square-enix.com/market.php")) {
    var infoes = $x('//div[@class="info"]');
    for (var i = 0; i < infoes.length; i++) {
        var info = infoes[i];
        for (var j = 0; j < info.childNodes.length; j++) {
            var child = info.childNodes[j];
            /* nodeType
               1 要素ノード
               2 属性ノード
               3 テキストノード
               4 CDATAノード
               5 実体参照ノード
               6 実体ノード
               7 処理命令ノード
               8 注釈宣言ノード
               9 文書ノード
               10 文書型宣言ノード
               11 文書切片ノード
               12 表記法ノード */
            if (child.nodeType == 3) {
                if (child.data.match(/\((\d+)\)\s.+/)) {
                    var a = document.createElement('a');
                    a.href = '/charstat.php?c=' + RegExp.$1;
                    a.textContent = child.data;
                    info.appendChild(a);
                    info.removeChild(child);
                }
            }
        }
    }
}

//闘技場のキャラクタ番号をリンクする
if (url.match("http://mdq.member.jp.square-enix.com/btl_league.php")) {
    var items = $x('//nav[@class="list"]//ul//li');
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (typeof items[i].childNodes === 'undefined') {
            continue;
        }
        var anchor = items[i].childNodes[0];
        for (var j = 0; j < anchor.childNodes.length; j++) {
            var child = anchor.childNodes[j];
            /* nodeType
               1 要素ノード
               2 属性ノード
               3 テキストノード
               4 CDATAノード
               5 実体参照ノード
               6 実体ノード
               7 処理命令ノード
               8 注釈宣言ノード
               9 文書ノード
               10 文書型宣言ノード
               11 文書切片ノード
               12 表記法ノード */
            if (child.nodeType == 3) {
                if (child.data.match(/ \((\d+)\).+/)) {
                    var a = document.createElement('a');
                    a.href = '/charstat.php?c=' + RegExp.$1;
                    a.textContent = '□';
                    a.style.float = 'left';
                    item.insertBefore(a, anchor);

                    anchor.style.float = 'left';
                    anchor.style.width = '70%';
                }
            }
        }
    }
}

// サーヴィターのキャラクタ番号をリンクする
if (url.match(/http:\/\/mdq\.member\.jp\.square-enix\.com\/servitor\.php\?atk=1/)) {
    var items = $x('//nav[@class="list"]//ul//li');
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (typeof items[i].childNodes === 'undefined') {
            continue;
        }
        var anchor = items[i].childNodes[0];
        for (var j = 0; j < anchor.childNodes.length; j++) {
            var child = anchor.childNodes[j];
            /* nodeType
               1 要素ノード
               2 属性ノード
               3 テキストノード
               4 CDATAノード
               5 実体参照ノード
               6 実体ノード
               7 処理命令ノード
               8 注釈宣言ノード
               9 文書ノード
               10 文書型宣言ノード
               11 文書切片ノード
               12 表記法ノード */
            if (child.nodeType == 3) {
                if (child.data.match(/\((\d+)\).+/)) {
                    var a = document.createElement('a');
                    a.href = '/charstat.php?c=' + RegExp.$1;
                    a.textContent = '□';
                    a.style.float = 'left';
                    item.insertBefore(a, anchor);

                    anchor.style.float = 'left';
                    anchor.style.width = '70%';
                }
            }
        }
    }
}

// (種類リスト) http://mdq.member.jp.square-enix.com/market.php?t=-1
// (リスト) http://mdq.member.jp.square-enix.com/market.php?t=3
// (詳細)  http://mdq.member.jp.square-enix.com/market.php?in=3570464
// 市場で劣化してるものには色をつける
if (url.match("http://mdq.member.jp.square-enix.com/market.php")) {
    var items = $x('//nav[@class="list"]//ul//li');
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (typeof items[i].childNodes === 'undefined') {
            continue;
        }
        var anchor = items[i].childNodes[0];
        for (var j = 0; j < anchor.childNodes.length; j++) {
            var child = anchor.childNodes[j];
            /* nodeType
               1 要素ノード
               2 属性ノード
               3 テキストノード
               4 CDATAノード
               5 実体参照ノード
               6 実体ノード
               7 処理命令ノード
               8 注釈宣言ノード
               9 文書ノード
               10 文書型宣言ノード
               11 文書切片ノード
               12 表記法ノード */
            if (child.nodeType == 3) {
                if (child.data.match(/劣化(\d+)%/)) {
                    if (RegExp.$1 !== "0") {
                        var span = document.createElement('span');
                        span.textContent = child.data;
                        span.setAttribute("style", "color: red;");

                        anchor.insertBefore(span, child);
                        anchor.removeChild(child);
                        break;
                    }
                }
            }
        }
    }
}


function to_32(n) {
    if (n < 10) {
        return n.toString();
    }
    return String.fromCharCode(n - 10 + 65);
}

function to_hex32(ary) {
    r = '';
    for (var i = 0; i < ary.length; i++) {
        n = ary[i];
        upper = Math.floor(n / 32);
        lower = n % 32;
        r += to_32(upper);
        r += to_32(lower);
    }
    return r;
}

if (url.match(/http:\/\/mdq\.member\.jp\.square-enix\.com\/skillset\.php\?all=1/)) {
    var items = $x('//nav[@class="list"]//ul//li');
    var skill_codes = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (typeof items[i].childNodes === 'undefined') {
            continue;
        }
        var anchor = items[i].childNodes[0];
        for (var j = 0; j < anchor.childNodes.length; j++) {
            var child = anchor.childNodes[j];
            /* nodeType
               1 要素ノード
               2 属性ノード
               3 テキストノード
               4 CDATAノード
               5 実体参照ノード
               6 実体ノード
               7 処理命令ノード
               8 注釈宣言ノード
               9 文書ノード
               10 文書型宣言ノード
               11 文書切片ノード
               12 表記法ノード */
            if (child.nodeType == 3) {
                //alert(child.data);
                // 装備してないスキルはtext
                if (child.data.match(/\[[A|P|F]\](.*) Lv(\d+)/)) {
                    //alert(RegExp.$1 + RegExp.$2);
                    s = SKILLS[RegExp.$1];
                    if (typeof(s) !== 'undefined') {
                        //alert(s.code);
                        skill_codes.push(s.code);
                        continue;
                    }
                }
            } else if (child.nodeType == 1) {
                if (child.tagName === 'SPAN') {
                    kid = child.childNodes[0];
                    if (kid.data.match(/E:(.*) Lv(\d+)/)) {
                        s = SKILLS[RegExp.$1];
                        if (typeof(s) !== 'undefined') {
                            skill_codes.push(s.code);
                            continue;
                        }
                    }
                }
            }
        }
    }
    var title = $x('//h2')[0];
    var a = document.createElement('a');
    a.href = 'http://mdq.heroku.com/skills/list?' + to_hex32(skill_codes);
    a.textContent = 'スキル一覧  ';
    title.insertBefore(a, title.childNodes[0]);
}

function logout_login(event) {
    var iframe = document.getElementById('logout_frame');
    iframe.addEventListener('load', logout_complete, false);
    iframe.src = "http://member.jp.square-enix.com/logout/";
}

function logout_complete(event) {
    document.location="https://member.jp.square-enix.com/login/?next=http://special.member.jp.square-enix.com/mdq/";
}

var page = 0;
var pets = [];
pets.sortByTime = function() {
    pets.sort(function(a, b) {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
    });
}

openShop = function() {
    pets.length = 0;
    loadShopPage(0);
}

fetchDetail = function() {
    var c = 0;
    for (var i = 0; i < pets.length; i++) {
        var p = pets[i];
        if (p.time < 2) {
            fetchStack.push(p);
            c++;
        }
    }
    setTimeout(timerLoading, 0.1);
    alert(c + 'pets update requested.');
}

var fetchStack = [];
var curPet = null;
timerLoading = function() {
    if (curPet != null) {
        setTimeout(timerLoading, 0.2);
        //Console.log('skip');
        return;
    } else {
        pet = fetchStack.pop();
        curPet = pet;
        //alert("start fetching " + pet.name);
        loadDetailPage(curPet);
    }
    if (fetchStack.length > 0) {
        setTimeout(timerLoading, 0);
    }
}

loadDetailPage = function(pet) {
    curPet = pet;
    var iframe = document.getElementById('logout_frame');
    iframe.src = "http://mdq.member.jp.square-enix.com/market.php?in=" + pet.id;
    return true;
}
loadDetailPageComplete = function(event) {
    // いつくるの? addEventListenerした瞬間?
    if (curPet == null) {
        return;
    }
    var iframe = document.getElementById('logout_frame');
    var ifdoc = iframe.contentWindow.document;

    var infoes = $x('//div[@class="info"]', ifdoc);
    if (infoes.length < 4) {
        // not bidded
        curPet.bidder = null;
        curPet.rea = 0;
    } else {
        var info = infoes[2]
        curPet.bidder = info.childNodes[3].textContent;

        var info2 = infoes[3]
        var reatext = info2.childNodes[2].textContent;

        if (reatext.match(/入札額：(\d+) (?:rea|zid)/)) {
            //alert('id=' + curPet.id + 'rea = ' + RegExp.$1);
            curPet.rea = parseInt(RegExp.$1);
        } else {
            alert('not match; ' + reatext);
        }
    }
    updatePetOnTable(curPet);
    curPet = null;
}

var added = false;
loadShopPage = function(start) {
    page = start;
    var iframe = document.getElementById('pet_list');

    if (!added) {
        iframe.addEventListener('load', loadShopPageComplete, false);
        added = true;
    }
    iframe.src = "http://mdq.member.jp.square-enix.com/market.php?t=6&s=" + page;
}

loadShopPageComplete = function(event) {
    var iframe = document.getElementById('pet_list');
    iframe.removeEventListener('load', null, false);

    var ifdoc = iframe.contentWindow.document;

    var hasNextPage;
    var nextAnchors = $x('//a[.="次へ→"]', ifdoc);
    if (nextAnchors[0].className === 'disable') {
        hasNextPage = false;
    } else {
        hasNextPage = true;
    }

    var items = $x('//nav[@class="list"]//ul//li//a', ifdoc);

    for (var i = 0; i < items.length; i++) {
        var anchor = items[i];
        var id = 0;
        if (anchor.href.match(/market\.php\?in=(\d+)&s=(\d+)$/)) {
            id = RegExp.$1;
        }

        j = 0;
        var img = anchor.childNodes[j]; j++;

        var text1 = anchor.childNodes[j]; j++;
        if (typeof(text1.data) === 'undefined') {
            // [終了]?
            continue;
        }
        var name;
        var lv;
        var atk;
        var mgk;
        var rare;
        if (text1.data.match(/^(.*)\s\sLv(\d+) 攻(\d+) 魔(\d+) ★(\d+)$/)) {
            //alert(RegExp.$1 + ':' + RegExp.$2 + ':' + RegExp.$3 + ':' + RegExp.$4 + ':' + RegExp.$5);
            name = RegExp.$1;
            lv = RegExp.$2;
            atk = RegExp.$3;
            mgk = RegExp.$4;
            rare = RegExp.$5;
        } else {
            // renamed pet
            name = text1.data;

            // skip
            var br = anchor.childNodes[j]; j++;
            var text1n = anchor.childNodes[j]; j++;
            if (text1n.data.match(/^\sLv(\d+) 攻(\d+) 魔(\d+) ★(\d+)$/)) {
                lv = RegExp.$1;
                atk = RegExp.$2;
                mgk = RegExp.$3;
                rare = RegExp.$4;
            } else {
                alert('parse failed:'+ text1n.data);
                return; // todo want to skip
            }
        }

        // skip
        br = anchor.childNodes[j]; j++

        var text2 = anchor.childNodes[j]; j++;
        var rea;
        var rest;
        if (text2.data.match(/^入札額 (\d+)(?:rea|zid)　残り(\d+)時間未満$/)) {
            //alert(RegExp.$1 + ':' + RegExp.$2);
            rea = RegExp.$1;
            rest = RegExp.$2;
        } else {
            //alert('not match' + text2.data);
            rea = 0;
            var span = anchor.childNodes[j]; j++;
            var text2n = anchor.childNodes[j]; j++;
            if (text2n.data.match(/^(?:rea|zid)　残り(\d+)時間未満$/)) {
                rest = RegExp.$1;
            } else {
                alert('parse failed:'+ text2n.data);
                return; // todo want to skip
            }
        }
        pets.push({
            'id': id,
            'image': img.src,
            'name': name,
            'level': lv,
            'attack': atk,
            'magic': mgk,
            'rarity': rare,
            'rea': parseInt(rea),
            'bidder': null,
            'time': parseInt(rest)
        });
    }
/*    var test = '------\n';
    for (var k = 0; k < pets.length; k++) {
        var p = pets[k];
        test += '(' + p.id + ')' + p.name + ' ' + p.rea + 'rea (～' + p.time + "h)\n";
    }
    alert(test);*/
    if (hasNextPage) {
        loadShopPage(page + 20);
    } else {
        drawShopTable();
    }
}

petlid = function(pet) {
    return 'pet' + pet.id;
}

var last_bet = 1;
addPet = function(parent, pet) {
    var li = document.createElement('li');
    li.id = petlid(pet);
    li.style.width = "98%";

    var a = document.createElement('a');
    a.href = "/market.php?in=" + pet.id;
    a.textContent = "(" + pet.time + ") " + pet.name + "Lv" + pet.level;
    a.style.height = "18px";
    a.style.width = "100%";

    var img = document.createElement('img');
    img.src = pet.image;
    img.width = 32;
    img.height = 32;
    img.style.float = "left";

    var br = document.createElement('br');

    var rea = document.createElement('span');
    rea.id ='pet_rea' + pet.id;
    rea.textContent = pet.rea;

    var bidder = document.createElement('span');
    bidder.id ='pet_bid' + pet.id;
    if (pet.bidder != null) {
        bidder.textContent = pet.bidder;
    }

    var plus = document.createElement('a');
    plus.id ='pet_plus' + pet.id;
    plus.href = "javascript: void(0);";
    plus.textContent = '＋';
    plus.style.float =  "right";
    plus.style.height = "100%";
    plus.style.minHeight = "0";
    plus.addEventListener('click', function(ev) {
        sendPost(pet.id, pet.rea + 1);
    }, false);

    var bet = document.createElement('a');
    bet.id ='pet_bet' + pet.id;
    bet.href = "javascript: void(0);";
    bet.textContent = '＄';
    bet.style.float =  "right";
    bet.style.height = "100%";
    bet.style.minHeight = "0";
    bet.addEventListener('click', function(ev) {
        b = prompt('How much do you bet?', last_bet);
        if (b != null && b != "") {
            last_bet = b;
            sendPost(pet.id, b);
        }
    }, false);


    a.appendChild(img);
    a.appendChild(br);
    a.appendChild(rea);
    a.appendChild(bidder);
    li.appendChild(a);
    li.appendChild(plus);
    li.appendChild(bet);
    parent.appendChild(li);
}

removeAllChildren = function(parent) {
    while(parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
}

drawShopTable = function() {
    var shopUL = document.getElementById('shop');
    removeAllChildren(shopUL);
    pets.sortByTime();
    for (var k = 0; k < pets.length; k++) {
        addPet(shopUL, pets[k]);
    }
}
updatePetOnTable = function(pet) {
    var span = document.getElementById('pet_bid' + pet.id);
    span.textContent = pet.bidder;

    var reaSpan = document.getElementById('pet_rea' + pet.id);
    reaSpan.textContent = pet.rea;
}

function addLink(box, url, text, isGreen) {
    var li = document.createElement('li');
    li.style.width = "98%";
    if (typeof isGreen !== "undefined") {
        li.id = "g";
    }
    var a = document.createElement('a');
    a.href = url;
    a.textContent = text;
    a.style.height = "18px";
    li.appendChild(a);
    box.appendChild(li);
}

function addLoginLink(box, text, isGreen) {
    var li = document.createElement('li');
    li.id = "login_li"
    li.style.width = "98%";
    if (typeof isGreen !== "undefined") {
        li.id = "g";
    }
    var a = document.createElement('a');
    a.id = "login_helper";
    a.href="javascript:void(0)";
    a.textContent = text;
    a.style.height = "18px";
    a.addEventListener('click', logout_login, false);

    li.appendChild(a);
    box.appendChild(li);
}

function addShopLink(box, text, func, isGreen) {
    var li = document.createElement('li');
    li.id = "shop_li"
    li.style.width = "98%";
    if (typeof isGreen !== "undefined") {
        li.id = "g";
    }
    var a = document.createElement('a');
    a.id = "shop_helper";
    a.href="javascript:void(0)";
    a.textContent = text;
    a.style.height = "18px";
    a.addEventListener('click', func, false);

    li.appendChild(a);
    box.appendChild(li);
}

function addShopReloader(box, text, isGreen) {
    var li = document.createElement('li');
    li.id = "shop_reloader_li"
    li.style.width = "98%";
    if (typeof isGreen !== "undefined") {
        li.id = "g";
    }
    var a = document.createElement('a');
    a.id = "shop_helper";
    a.href="javascript:void(0)";
    a.textContent = text;
    a.style.height = "18px";
    a.addEventListener('click', openShop, false);

    li.appendChild(a);
    box.appendChild(li);
}

// ページ左にコマンドを並べる
var myMenu = document.createElement('nav');
myMenu.className = 'cmd';
myMenu.style.position = "fixed";
myMenu.style.overflow = "auto";
myMenu.style.left = "0px";
myMenu.style.width = "120px";
myMenu.style.height = "100%";

iframe = document.createElement('iframe');
iframe.id = "logout_frame";
iframe.style.width = "0px";
iframe.style.height = "0px";
iframe.addEventListener('load', function(ev) {
    loadDetailPageComplete(ev)
}, false);


iframe2 = document.createElement('iframe');
iframe2.id = "pet_list";
iframe2.style.width = "0px";
iframe2.style.height = "0px";

var myUl = document.createElement('ul');
myMenu.appendChild(myUl);
addLink(myUl, "http://mdq.member.jp.square-enix.com/main.php", 'メイン');
addLink(myUl, "http://mdq.member.jp.square-enix.com/mypage.php", 'マイページ');
addLink(myUl, "http://mdq.member.jp.square-enix.com/party.php", 'パーティ');
addLink(myUl, "http://mdq.member.jp.square-enix.com/skillset.php", 'スキル');
addLink(myUl, "http://mdq.member.jp.square-enix.com/items.php", '持ち物');
addLink(myUl, "http://mdq.member.jp.square-enix.com/farm.php", 'ペット');
addLink(myUl, "http://mdq.member.jp.square-enix.com/servitor.php?atk=1", 'サーヴィター');
addLink(myUl, "http://mdq.member.jp.square-enix.com/menu.php", 'メニュ');
addLink(myUl, "http://mdq.member.jp.square-enix.com/bbs.php?r=m", 'マイ', true);
addLink(myUl, "http://mdq.member.jp.square-enix.com/bbs.php?bt=7", '通知', true);
addLink(myUl, "http://mdq.member.jp.square-enix.com/bbs.php?bt=1&r=m", 'パーティ', true);
addLink(myUl, "http://mdq.member.jp.square-enix.com/bbs.php?bt=4", 'ユニオン', true);
addLink(myUl, "http://mdq.member.jp.square-enix.com/bbs.php?bt=8", '通知', true);
addLink(myUl, "http://mdq.member.jp.square-enix.com/bbs.php?bt=5", '全体', true);
addLink(myUl, "http://mdq.member.jp.square-enix.com/bbs.php?bt=6", '宣伝', true);
addLink(myUl, "http://mdq.member.jp.square-enix.com/bbs.php?bt=2&r=m", 'ノード', true);
addLink(myUl, "http://mdq.member.jp.square-enix.com/bbs.php?bt=255", 'トピック', true);
addLink(myUl, "http://mdq.member.jp.square-enix.com/shops.php", '商店');
addLink(myUl, "http://mdq.member.jp.square-enix.com/market.php", '市場');
addLink(myUl, "http://mdq.member.jp.square-enix.com/unions.php?cmd=box", '倉庫');
addLink(myUl, "http://mdq.member.jp.square-enix.com/unions.php?cmd=que", 'ミッション');
/*addLink(myUl, "http://mdq.member.jp.square-enix.com/charstat.php?c=3", 'なゆ太');*/
addLink(myUl, "http://mdq.member.jp.square-enix.com/btl_league.php", '闘技場');
addLink(myUl, "http://mdq.member.jp.square-enix.com/search.php", '検索');
addLink(myUl, "http://mdq.member.jp.square-enix.com/announce.php", 'おしらせ');
addLink(myUl, "http://mdq.member.jp.square-enix.com/newspaper.php", '新聞');
addLink(myUl, "http://mdq.member.jp.square-enix.com/results.php", '記録');
addLoginLink(myUl, 'ログイン');

myMenu.appendChild(iframe);
myMenu.appendChild(iframe2);

// ページ左にコマンドを並べる
if (url.match(/^http:\/\/mdq\.member\.jp\.square-enix\.com\/market\.php$/)) {
    var shopDiv = document.createElement('div');
    shopDiv.className = 'bb';

    var shopTitle = document.createElement('div');
    shopTitle.className = 'bbt';
    shopTitle.textContent = 'Pet Market';

    var shopCmd = document.createElement('nav');
    shopCmd.className = 'cmd';

    var shopNav = document.createElement('nav');
    shopNav.className = 'list';

    var shopUL = document.createElement('ul');
    shopNav.id = 'shop';
    shopNav.appendChild(shopUL);
    shopDiv.appendChild(shopTitle);
    shopDiv.appendChild(shopCmd);
    shopDiv.appendChild(shopNav);

    addShopLink(shopCmd, 'リストアップ/リロード', openShop);
    addShopLink(shopCmd, '詳細取得', fetchDetail);

    var shortcuts = $x('//nav[@class="shortcut"]');

    document.body.insertBefore(shopDiv, shortcuts[0].nextSibling);
}

document.body.insertBefore(myMenu, document.body.firstChild);

// HTMLフォームの形式にデータを変換する
encodeHTMLForm = function(data) {
    var params = [];
    for(var name in data) {
        var value = data[name];
        var param = encodeURIComponent(name).replace(/%20/g, '+')
            + '=' + encodeURIComponent(value).replace(/%20/g, '+');
        params.push(param);
    }
    return params.join('&');
}
//<a href="market.php?in=9030794&amp;bid=1003&amp;cc=4523f944e8fe3e5e3c7969d2cf0513af">入札する</a>
sendPost = function(pet_id, rea) {
    //alert('sendPost' + pet_id + ' ' + rea);
    var request = new XMLHttpRequest();
    //alert(request);
    request.open("POST", 'market.php', true); // todo url
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                if (request.responseText.match(/<a\shref="market\.php\?in=(\d+)&bid=(\d+)&cc=(\w+)&s=(\d)">入札する<\/a>/)) {
                    sendBidding(RegExp.$3, RegExp.$1, RegExp.$2, RegExp.$3);
                } else {
                    alert("match failed: " + request.responseText);
                }
            } else {
                alert('http error');
                return;
            }
        }
    }
    data = {
        in: pet_id,
        bid: rea
    };
    if (window.confirm('bet $' + rea + ' on?')) {
        request.send(encodeHTMLForm(data));
    }
}

sendBidding = function(cc, id, rea, start) {
    //alert('sendBidding' + cc + ' ' + id + ' ' + rea);
    var request = new XMLHttpRequest();
    var url = "market.php?in=" + id + "&bid=" + rea + "&cc=" + cc + "&s=" + start;
    request.open("GET", url, true); // todo url
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                //alert(request.responseText);
                for (var i = 0; i < pets.length; i++) {
                    if (pets[i].id = id) {
                        loadDetailPage(pets[i]);
                        return;
                    }
                }
                alert('no pets to bid...');
            } else {
                alert('http error');
                return;
            }
        }
    }
    request.send(null);
}
