// ==UserScript==
// @name        Youtubeおさるフィルタ（簡略版）
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
var NGre = new RegExp("HIKAKIN|HikakinTV|HikakinGames|HikakinBlog|SeikinTV|SeikinGames|Seikin|瀬戸弘司 / Koji Seto|瀬戸弘司ミニ|eguri89games|Amusing MEGWIN TV 毎日面白動画|megwintvlab|MEGWINTV MINIM|Canale di MEGWINTVanimation|PDSKabushikiGaisha|PDS English|中途半端外人　毎日PDS動画投稿ペインダンテ|PDRさん|PDRさんのゴミ箱|Daichi Beatboxer|TheDaichiNet|MAHOTO|マホちゃんGames|KazuChannel|KazuChannel2|KazuGames|KazuTabiTV|kazumeshi|KAZUYA Channel|KAZUYA Channel2|マックスむらい|AppBankMovie|赤髪のとものゲーム実況チャンネル!!|それいけ！実写髪ちゃん！|MasuoTV|MasuoGames|はじめしゃちょー（hajime）|はじめしゃちょー2 (hajime)|ジェット☆ダイスケ|jetdaisukex|TheMorusaism|Morusan2ch|Morusan2chG|劇団スカッシュ(SQUASHfilms)|SQUASH2nd|ひゃくえんゲーマー|Ari Keita|ARI OR ALI|ARI OR ALI Games|たくたく/takutaku|たくたく ゲーム実況 チャンネル2|shinkoruri|dakotakoti|sasakiasahiVlog|sasakiasahi|ミカエラ|Micaela Braithwaite|Rachel & Jun|Rachel & Jun Extra|Sharla in Japan|Sharla in Japan (Extra)|manwomanfilm|mimei|everydaymimei|BaCouple|バイリンガール英会話 in Japan|バイリンガール英会話 Bilingirl English|Japanagos（ジャパナゴス）|BoutoKM|Melodee Morita|kanadajin3|danceandmelodee|potemi926|uuum", "i");

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