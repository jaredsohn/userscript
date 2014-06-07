// ==UserScript==
// @name        Youtubeおさるフィルタ（煩雑版）
// @namespace   おさる
// @include     *youtube.com/*
// @version     20140503
// @grant       none
// ==/UserScript==

// license: public domain
// 2014/02/12 http://engawa.2ch.net/test/read.cgi/poverty/1392030665/
// 2014/02/12 http://pastebin.com/HqCEafWN

////////////////////////////////////////////////////////

var useRegex = true;

// NG target
var NGList = [
"HIKAKIN"
];
// NG target(regex)
var NGre = new RegExp("HIKAKIN|HikakinTV|HikakinGames|HikakinBlog|SeikinTV|SeikinGames|Seikin|瀬戸弘司 / Koji Seto|瀬戸弘司ミニ|eguri89games|Amusing MEGWIN TV 毎日面白動画|megwintvlab|MEGWINTV MINIM|Canale di MEGWINTVanimation|PDSKabushikiGaisha|PDS English|中途半端外人　毎日PDS動画投稿ペインダンテ|PDRさん|PDRさんのゴミ箱|Daichi Beatboxer|TheDaichiNet|MAHOTO|マホちゃんGames|KazuChannel|KazuChannel2|KazuGames|KazuTabiTV|kazumeshi|KAZUYA Channel|KAZUYA Channel2|マックスむらい|AppBankMovie|赤髪のとものゲーム実況チャンネル!!|それいけ！実写髪ちゃん！|MasuoTV|MasuoGames|はじめしゃちょー（hajime）|はじめしゃちょー2 (hajime)|ジェット☆ダイスケ|jetdaisukex|TheMorusaism|Morusan2ch|Morusan2chG|劇団スカッシュ(SQUASHfilms)|SQUASH2nd|ひゃくえんゲーマー|Ari Keita|ARI OR ALI|ARI OR ALI Games|たくたく/takutaku|たくたく ゲーム実況 チャンネル2|shinkoruri|akihabaraBANKINYA|まやみか神山|まや神山|UJXChannel|UJXBlog|mune0826|kougeisha|POLINKEY MOVIE|HetareBBoy|へたれの日記|HetareBBoyUSA|PROWRESTLING SHIBATAR ZZ|TheGacchannel|BANZAI0226|avntisdouga|TOMIKKU NET|tamutin53|tamutin532ch|tamutin533ch|ビックバンＴＶ スカキャン|TOMIKKU NET|TOMIKKU NET 2nd CH|teraminato|まえちゃんねる MAECHANNEL|まえちゃんねる 2nd|チャンキチビデオ（公式）|チャンキチサブビデオ|Just Duncan|ViolentElfDoomsday|【0712RUI】|RadiOyazi|imiga|R&W学園|soezimax|soezimax2 さんのチャンネル|soezimax3|デラックス (DX apach)|narions50|茸(たけ)の顔出しちゃんねる|ミンミン動画塾|ozzy78|momonaekichi|SILK CHANNEL|6MEN47|WANIBUNsub|D-channel|D-channel2|秋葉仁の今思う事|動画解放軍|muneblog|宇佐美恭一郎|立花孝志|RYOJI TAKARABE|Mおに|マーキュリー商事|Syake9ma|rakuexpress7777|カワケン KAWAKEN|takutakunonitijyou|TourbillonCafe|geniway|Digital Wackys|sonnaitakeuchi|まぐにぃチャンネル|Mitsuo(三夫)|tatsuhiro042|ドグマ風見（ドグチューブ）|哲一乃万|さとちん TV|hikaru kinnpatu|ocyan0809|あたり なりゆき|岡田紳吾|uetore1|dakotakoti|sasakiasahiVlog|sasakiasahi|ミカエラ|Micaela Braithwaite|Rachel & Jun|Rachel & Jun Extra|Sharla in Japan|Sharla in Japan (Extra)|manwomanfilm|mimei|everydaymimei|BaCouple|バイリンガール英会話 in Japan|バイリンガール英会話 Bilingirl English|Japanagos（ジャパナゴス）|BoutoKM|Melodee Morita|kanadajin3|danceandmelodee|ABTVnetwork|Choicerish|cotorich|Sorano Ch.|JunsTV|ライブブ|megumi sakaue|Megumi Games|鈴川絢子/Suzukawa Ayako|chiachamchannel|haruxnyantv|aoinoaoi8|greenchan0714|SekineRisa|Miume みうめ|日本エレキテル連合の感電パラレル|fujiashiy|りん20歳の動画日記♪-Japanese Girl Rin-|kattyanneru1011|potemi926|Kamemushi Kobuta|Rinozawa|せんももチャンネル Senmomo channel （動画毎日更新中！）|Nozamama|Nozaoto|hidekazu0311|HARU- Slam|enakimura|Tora Channel|ベイビーチャンネル Baby-Channel|LotteChocomotionTV|angfaOfficial|uuum|テラスハウス|terracehousech|yleveron|P-martTV|ARROWS-SCREEN|すくーぷてれび|janbaritv|パチンコ・パチスロ必勝本WEB-TV|pachinkoplayguide|VPRESS CHANNEL|ENTER CHANNEL|pachitele777|samurai graph|ｔｖＢＡＳＨ|チャンネルくらら（毎日１８時更新）|レオンチャンネル|LEON1mini1|パズドラ究極攻略TV|SakuraSoTV|某国のイージス|OUTSIDESOUND|ChGrandStrategy|TomoNews Japan|アジアの特定の「あの国」|popularmovie999|1812makoto|douga warosu|lonniedos|[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF\u3400-\u4DBF\u4DC0-\u4DFF]+", "i");

// class
var classes = ["channels-content-item", "yt-lockup", "video-list-item", "lohp-medium-shelf", "playlist-video-item", "lohp-large-shelf-container"];

/////////////////////////////////////////////////////////

//  class example
// TOP
// channels-content-item yt-shelf-grid-item yt-uix-shelfslider-item
// lohp-medium-shelf vve-check 
// SEARCH
// yt-lockup clearfix yt-uix-tile result-item-padding yt-lockup-video yt-lockup-tile vve-check
// PLAY
// video-list-item related-list-item


var searchFun = useRegex ? function(s) {
    return NGre.test(s);
} : function(s) {
    for(var i=0;i<NGList.length;i++) if(s.indexOf(NGList[i]) >= 0) return true;
    return false;
};

function kill(c){
    var i, a = document.getElementsByClassName(c);
    for(i=0;i<a.length;i++){
        if(searchFun(a[i].innerHTML))
            a[i].style.display = "none";
    }
    return a.length;
}

for(var i=0;i<classes.length;i++)
    kill(classes[i]);