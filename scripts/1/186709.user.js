// ==UserScript==
// @name        SAKURA砲
// @namespace   http://userscripts.org/users/useridnumber
// @include     http://m1.3gokushi.jp/card/deck.php*
// @version     1
// ==/UserScript==


//データの読み出し
    var sta = GM_getValue('test',0);
    var start = new Date();
    var flag =GM_getValue('flag',0);
//グローバル変数
    var j = 0;
    var ids = [];
    var x = "";
    var y = "";
    var timer2 = "";

//インターフェイスの作成
    lili = document.createElement("li");  //リスト用
    conf = document.createElement("form"); //form用
    formButton = document.createElement("input"); //button用
    ASS = document.createElement("p"); //データ表示用

    /* button用フォームの製作*/
    ASS.innerHTML = "自動出兵ツールver1.0 起動中....(BAN対策のため、通信終了を待っています。)<BR>このツールはデッキの中で暇にしている武将を容赦なく、簡易出兵先１番に突撃させます。";
    lili.id = "AS";
    conf.id = "ASFORM";
    formButton.type = "button";
    formButton.id = "ASbutton";
    formButton.addEventListener("click", change_time, false);
    show_time();

    /*UIの配置*/
    document.getElementById("statMenu").appendChild(lili);
    document.getElementById("AS").appendChild(ASS);
    document.getElementById("AS").appendChild(conf);
    document.getElementById("ASFORM").appendChild(formButton);

//プログラムの手順()
//まずはカードに振られたIDを取得する。
//簡易出撃先から出撃先を取得する
//出撃コマンドを5秒おきに放つ。
//全て終わったら、指定分数待つ。
//リロードする。

//カードのIDをゲット
//IDはidsの中に配列として封じ込める。
            window.onload = function () {
                if (flag == 0 && sta != 0) {
                    ASS.innerHTML = "出兵のための準備をしています。";

                    //ボタンが表示されているものを抽出する。 
                    var decks = document.getElementsByClassName('btn_deck_set');

                    if (decks.length == 0) {
                    //回復時刻表示oFFの場合、ボタンが違うのでこれで回避。
                        decks = document.getElementsByClassName('aboutdeck');
                    }
                    var re = new RegExp("[0-9]+");

                    //IDを抽出中...
                    for (var i = 0; i < decks.length; ++i) {
                        var text = new String(decks.item(i).onclick)
                        //JSのonclickコマンドを参照。
                        if (text.match(/unset/)) {
                            //デッキから外す＝暇にしてる武将。
                            ids.push(re.exec(text));
                        }

                    }
                    ASS.innerHTML = "簡易出兵先を検出中...。簡易出兵先がない場合、ここで動作を停止します。"; 
                    //簡易出兵先から出撃先を取得する。
                    var bookmark = document.getElementById("map_bookmark");
                    var getone = bookmark.getElementsByTagName("option");
                    
                    //出撃先の情報は、区別してx,yに封じ込める。
                    //頭悪い正規表現。
                    var x_reg = new RegExp("x=-*[0-9]+");
                    var x_temp = x_reg.exec(getone.item(1).value);
                    var num = new RegExp("-*[0-9]+");
                    x = num.exec(x_temp);

                    var y_reg = new RegExp("y=-*[0-9]+");
                    var y_temp = y_reg.exec(getone.item(1).value);
                    y = num.exec(y_temp);

                    //出撃コマンドを放つ
                       timer2 = window.setInterval(function () { syutugeki() }, 5000);




                    //ここから待ち状態。
                }else {
                    ASS.innerHTML = "次の出兵時間まで待機中...";
                    var timer1 = window.setInterval(function () { keika() }, 1000);
                    // alert('test');
                }
            };


            //武将を出撃させるfunction
    function syutugeki(){
            
             ASS.innerHTML = (j+1) +"人目の武将を出撃中。";




                if(j < ids.length){
                    var tex = "village_name=&village_x_value=" + x + "&village_y_value=" + y + "&unit_assign_card_id=" + ids[j] + "&radio_move_type=302&show_beat_bandit_flg=&infantry_count=&large_infantry_count=&shield_count=&heavy_shield_count=&spear_count=&halbert_count=&archer_count=&crossbow_count=&ram_count=&catapult_count=&cavalry_count=&cavalry_guards_count=&scout_count=&cavalry_scout_count=&radio_reserve_type=0&x=&y=&card_id=204&btn_send=%E5%87%BA%E5%85%B5";
                  //  alert(tex);
                      GM_xmlhttpRequest({
                    method: "POST",
                    url: "http://m1.3gokushi.jp/facility/castle_send_troop.php",
                    data: tex,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    onload: function (response) {
                        // alert('Sucss');
                    },
                    onerror: function (response) {
                        // alert('faile');
                    }
                });
                }else if(j == ids.length){
                    timer2.stop;
                    flag = 1;
                      ASS.innerHTML = ids.length + "人の武将を出兵させました。5秒後にページを更新します。";
                      GM_setValue('flag', 1);

                }else if(j > ids.length){
                    ASS.innerHTML = "ページを更新します。";
                    location.reload();
                }
                                j = j + 1;
            };
            //指定時間待つfunction
    function keika() {
        now = new Date();
        if (sta == 0) {
            ASS.innerHTML = "自動出兵ツールはおとなしくしています。";
        }
        else{
           ASS.innerHTML = "次の出兵時間まで待機中...(" + flag + "秒経過)";
                   flag = flag + 1;
        GM_setValue('flag', flag);
        }

        if((sta == 1 && flag > 60) || (sta == 2 && flag > 120)  || (sta == 3 && flag > 300)  || (sta == 4 && flag > 600)){
            ASS.innerHTML = "時間が来たので処理を開始します。";
            GM_setValue('flag', 0);
            location.reload();
        }

    };

                //UI用
    function change_time(){
        sta = sta + 1;
        if (sta > 4){
            sta = 0;
        }
        show_time();
        GM_setValue('test', sta);
    };
        function show_time(){
//            alert("STATE:" + sta);
//            alert("Flag:" + flag);
            if (sta == 0) {
        formButton.value = "武将自動出兵:off";
    }
    else if(sta == 1){
                formButton.value = "武将自動出兵:1分おき";
    }
    else if(sta == 2){
                formButton.value = "武将自動出兵:2分おき";
    }
    else if(sta == 3){
                formButton.value = "武将自動出兵:5分おき";
    }
    else if(sta == 4){
                formButton.value = "武将自動出兵:10分おき";
    }
    };