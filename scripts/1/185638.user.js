// ==UserScript==
// @name        HarajukuPlayer
// @namespace   none-none
// @description NicoPlayer4,LivePlayer　最終更新版
// @include     http://www.nicovideo.jp/watch/*
// @include     http://live.nicovideo.jp/watch/*
// @require     http://res.nimg.jp/js/swfobject.js
// @version     1.2.1
// @grant       none
// ==/UserScript==

//v1.2.1 パラメータ"quality"の値の変更が反映されるように修正
//
//v1.2.0 Opera, Safari, Sleipnirに対応
//
//v1.1.5 ※GINZAプレイヤー更新の影響により自動再生が効かなくなったため自動再生できるよう修正
//       ※ニコ割を表示・非表示選択できるように修正
//       
//       ※変数　要変更
//
//v1.1.4 ニコ割を再生できるように修正
//
//v1.1.3 動画プレイヤー内のおすすめタブの中にある動画を押してもページが遷移されないバグを修正
//       動画・生放送プレイヤーの「モニタサイズで拡大する」が正常に動作しないバグを修正
//
//v1.1.2 生放送プレイヤーをブラウザサイズにした際にコメント投稿欄がズレるのを修正
//
//v1.1.1 生放送プレイヤーのサイズとCSSを修正
//
//v1.1.0 chromeに対応
//
//v1.0.0 初版


/************ 自動再生 ************/

    //自動再生on → Video_autoPlay = true;

    //自動再生off → Video_autoPlay = false;

    var Video_autoPlay = false;

//

/************* ニコ割 *************/

    //ニコ割on → marq = "0";

    //ニコ割off → marq = "1";

    var marq = "0";

//

(function(){

    var url = location.href;
    var url_res = url.split("?");
    var url_value = url_res[0].split("/watch/");
    var flvplayer = document.getElementById("flvplayer");

    if(flvplayer){
        var player_value = (flvplayer.getAttribute("flashvars")).split("&");

        if(url_value[0]==="http://www.nicovideo.jp"){
            var so = new SWFObject("http://res.nimg.jp/swf/player/nicoplayer.swf", "flvplayer", "976", "504", 9, "#FFFFFF");
        }else if(url_value[0]==="http://live.nicovideo.jp"){
            var so = new SWFObject("http://live.nicovideo.jp/liveplayer.swf?v="+url_value[1], "flvplayer", "950", "520", 9, "#FFFFFF");
        }

        for(var i=0;i<=player_value.length-1;i++){
            player_value[i] = player_value[i].split("=");
            player_value[i][1]=(player_value[i][0]==="noMarquee"?marq:player_value[i][1]);
            so.addVariable(player_value[i][0],player_value[i][1]);
        }
        so.addParam("allowScriptAccess", "always");
        so.addParam("allowFullScreen", "true");
        so.addParam("quality",flvplayer.getAttribute("quality"));
        so.write("flvplayer_container");
    }

    if(Video_autoPlay===true){
        AutoPlay();
    }

})();

function AutoPlay(){
    window.onload=function(){
        var count = 1;
        var flvplayer = document.getElementById("flvplayer");
        while(count<=10){
            setTimeout(function(){
                try{
                    flvplayer.ext_play(1);
                    count=10;
                }catch(e){}
            },(count==1?1000:2000));
            count++;
        }
    }
}