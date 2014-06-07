// ==UserScript==
// @name 天鳳記録直対成績
// @namespace pecho-n
// @version 1.0.2
// @match http://arcturus.su/tenhou/ranking/ranking.pl*
// @include http://arcturus.su/tenhou/ranking/ranking.pl*
// ==/UserScript==

(function (){
    var div = document.createElement("div");
    var d = "<h2>直接対決成績</h2><table border=0><tr><td valign='top'>";
    d += "<input type='text' id='text1' size='16' readonly>　-　";
    d += "<input type='text' id='text2' size='16' maxlength=8><br>";
    d += "自分段位<select id='danni1'></select>　相手段位";
    d += "<select id='danni2'></select><br>想定卓";
    d += "<select id='s_taku'><option>---</option><option>鳳凰</option>";
    d += "<option>特上</option><option>上級</option></select>";
    d += "　東/南表示<input type='checkbox' id='check' checked> ";
    d += "<input type='button' id='button1' value='計算'><br>";
    d += "<textarea id='result' rows=22 style='font-size: 10pt;width:350px'></textarea>";
    d += "</td><td valign='top' style='padding-left:20px'>";
    d += "<input type='text' id='text_games' size='3'>戦以上の対局者<br>";
    d += "<input type='button' id='button2' value='抽出'><br>";
    d += "<select id='list' size='20'></select></td></tr></table>";
    div.innerHTML = d;
    document.body.insertBefore(div, document.getElementById("stats"));
    danniselect();

    $("button1").addEventListener("click", calc, false);
    $("button2").addEventListener("click", updateSelect, false);
    $("danni1").addEventListener("change", calc, false);
    $("danni2").addEventListener("change", calc, false);
    $("s_taku").addEventListener("change", calc, false);
    $("check").addEventListener("change", calc, false);
    $("list").addEventListener("change", selectPlayer, false)
    
    var player_id = document.getElementsByTagName("h1")[0].innerHTML.split(" ");
    $("text1").value = player_id[0];
    
    //Game list取り込み
    var array1 = document.getElementById("records").innerHTML.split("<br>");
    var gamelist = new Array;
    for(var i=0, n=array1.length-1;i<n;i++){
        gamelist[i] = array1[i].split(" | ");
    }

    var players, opponentid, games_hash =[];
    for(var i=0, n=gamelist.length;i<n;i++){
        gamelist[i][6] = gamelist[i][6].split(" ");
        if(gamelist[i][4].charAt(0) ==  "四"){
            players = 4;
        } else{
            players = 3;
        }

        //対局数を数える
        for(var j=0;j<players;j++){
            gamelist[i][6][j] = gamelist[i][6][j].split(/\(([+-]?\d+.?\d?)\)$/);
            gamelist[i][6][j][0] = gamelist[i][6][j][0].replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&");
            opponentid = gamelist[i][6][j][0];
            if(games_hash[opponentid] == undefined){
                games_hash[opponentid] = 1;
            } else{
                games_hash[opponentid] += 1;
            }
        }
    }    

    //自分のIDとNoNameを削除
    delete games_hash[player_id[0]];
    delete games_hash["NoName"];

    //連想配列を配列にしてソート
    var k=0, games = [];
    for(var key in games_hash){
        games[k] = [];
        games[k][0] = key;
        games[k][1] = games_hash[key];
        k++;
    }
    
    quicksort(games, 0, games.length-1);
    
    function quicksort(a, left, right){
        var pl = left, pr = right, x =a[Math.floor((pl+pr)/2)][1];
        while(pl <= pr){
            while(a[pl][1] > x){
                pl++;
            }
            while(a[pr][1] < x){
                pr--;
            }
            if(pl <= pr){
                var temp = a[pl];
                a[pl] = a[pr];
                a[pr] = temp; 
                pl++; pr--;
            }
        }
        if(pl < right){
            quicksort(a, pl, right);
        }
        if(pr > left){
            quicksort(a, left, pr);
        }
    }
    
    if(games.length > 100){
        $("text_games").value = games[100][1];
    } else{
        $("text_games").value = 2;
    }
    updateSelect();

//================================================

    function $(s){
        return document.getElementById(s);
    }
    
    //指定数以上対局者のリストアップ
    function updateSelect(){
        var ijou = $("text_games").value;
        var to;
        for(var i=games.length-1;i>=0;i--){
            if(games[i][1] >= ijou){
                to = i+1;
                break;
            }
        }
        $("list").length = 0;
        for(var i=0;i<to;i++){
            $("list").length++;
            $("list").options[i].value = games[i][0];
            $("list").options[i].text = games[i][0] + ":" + games[i][1];
        }
    }

    function danniselect(){
        for(var i=1;i<=2;i++){
            var danni_id = "danni" + i;
            $(danni_id).length = 10;
            for(var j=0, k=9;j<10;j++,k--){
                $(danni_id).options[j].value=k;
            }
            var s = ["十段", "九段", "八段", "七段", "六段", "五段", "四段", "三段", "二段", "初段"];
            for(var j=0; j<10;j++){
                $(danni_id).options[j].text = s[j];
            }            
            $(danni_id).selectedIndex = 3;
        }
    }
    
    function selectPlayer(){
        $("text2").value = $("list").options[$("list").selectedIndex].value;
        calc();
    }
    
//================================================

    //計算
    function calc(){
        var id1 = player_id[0];
        var id2 = $("text2").value;
        var count=0, is4ma, taku, shuusi1, shuusi2, chakujun1, chakujun2;

        //配列score初期化
        var score = new Array(2);
        // [0]:三麻 [1]:四麻
        // [i][0]:自分 [i][1]:相手
        // [i][j][0]～個室東,個室南,般東,般南,上東,上南,特東,特南,鳳東,鳳南
        // [i][j][k][0]~ 0:収支, 1-4:着順 5:勝数 6:対局数
        for(var i = 0; i < 2; i++){    
            score[i] = new Array(2);
            for(var j = 0; j < score[i].length; j++){
                score[i][j] = new Array(10);
                for(var k = 0; k < score[i][j].length; k++){
                    score[i][j][k] = [ 0, 0, 0, 0, 0, 0, 0 ];
                }
            }
        }

        //Gamelist探索
        for(var i=0, n=gamelist.length;i<n;i++){
            var g6 = gamelist[i][6], ismatch=false;
            for(var j=0;j<g6.length;j++){
                if(g6[j][0] == id2){
                    ismatch = true;
                }
            }
            //対局者の中に指定したidがあった場合 ここで集計
            if(ismatch){
                count++;
                //四麻か三麻か
                if(gamelist[i][4].charAt(0) == "四"){
                    is4ma = 1;
                }else{
                    is4ma = 0;
                }
                //収支、着順
                for(var j=0;j<is4ma+3;j++ ){
                    if(gamelist[i][6][j][0] == id1){
                        shuusi1 = Number(gamelist[i][6][j][1]);
                        chakujun1 = j+1;
                    }
                    if(gamelist[i][6][j][0] == id2){
                        shuusi2 = Number(gamelist[i][6][j][1]);
                        chakujun2 = j+1;
                    }
                }
                //卓
                var takulevel = gamelist[i][4].charAt(1);
                if(takulevel == "般"){
                    //L0000でなければ個室
                    if(gamelist[i][1] != "L0000"){
                        taku = 0;
                    }else{
                        taku = 2;                        
                    }
                }
                if(takulevel == "上"){
                    taku = 4;
                }else if(takulevel == "特"){
                    taku = 6;
                }else if(takulevel == "鳳"){
                    taku = 8;
                }
                
                if(gamelist[i][3].charAt(2) == "南"){
                    taku += 1;
                }
                
                // console.log("is4ma:" + is4ma);
                // console.log("taku:" + taku);
                // console.log("0 - 収支:" + shuusi1 + " 着順:" + chakujun1);
                // console.log("1 - 収支:" + shuusi2 + " 着順:" + chakujun2);
                // console.log("score0:" + score[is4ma][0][taku]);
                // console.log("score1:" + score[is4ma][1][taku]);
               
                //scoreに集計
                score[is4ma][0][taku][0] += shuusi1;
                score[is4ma][1][taku][0] += shuusi2;
                score[is4ma][0][taku][chakujun1] += 1;
                score[is4ma][1][taku][chakujun2] += 1;
                if(chakujun1 < chakujun2){
                    score[is4ma][0][taku][5] += 1;
                }else{
                    score[is4ma][1][taku][5] += 1;
                }
                
            }
        }

    if(count == 0){
        $("result").value="";
        return 0;
    }
    
    //合計
    var sum = new Array(2);
    for(var i=0;i<2;i++){
        sum[i] = new Array(2);
        for(var j=0;j<2;j++){
            sum[i][j] = [ 0, 0, 0, 0, 0, 0, 0 ];
        }
    }

    for(var i=0;i<2;i++){
        for(var j=0;j<2;j++){
            for(var k=0;k<10;k++){
                sum[i][j][0] += score[i][j][k][0]; //収支
                sum[i][j][1] += score[i][j][k][1]; //着順、1位～
                sum[i][j][2] += score[i][j][k][2];
                sum[i][j][3] += score[i][j][k][3];
                if(i == 1){
                    sum[i][j][4] += score[i][j][k][4];
                }
                sum[i][j][5] += score[i][j][k][5]; //勝数
            }
            sum[i][j][6] += sum[i][j][1]+sum[i][j][2]+sum[i][j][3]+sum[i][j][4];//対局数
        }
    }
    var sanma1 = sum[0][0], sanma2 = sum[0][1];
    var yonma1 = sum[1][0], yonma2 = sum[1][1];
    
    //東風・東南ごとの収支・着順[三・四][自・相][東・南][収支、着順1-4、勝]
    var kazesum = new Array(2);
    for(var i=0;i<2;i++){
        kazesum[i] = new Array(2);
        for(var j=0;j<2;j++){
            kazesum[i][j] = new Array(2);
            for(var k=0;k<2;k++){
                kazesum[i][j][k] = [ 0, 0, 0, 0, 0, 0, 0 ];
            }
        }
    }
    for(var i=0;i<2;i++){
        for(var j=0;j<2;j++){
            for(var k=0;k<10;k++){
                for(var l=0;l<7;l++){
                    kazesum[i][j][k%2][l] += score[i][j][k][l];
                }
            }
            for(var m=1;m<=4;m++){
                kazesum[i][j][0][6] += kazesum[i][j][0][m];
                kazesum[i][j][1][6] += kazesum[i][j][1][m];
            }    
        }
    }
    
//------------------------------------------------------------------------------------------------

    //順位率
    function ratio(n1, n2){
        var i = Math.round(n1 / n2 * 1000);
        if(i == 1000){
          return "1.000";
        } else if(i >= 100 && i < 1000){
           return "." + i;
        } else if(i >= 10 && i < 100){
           return ".0" + i;
        } else if(i < 10 && i > 0){
           return ".00" + i;
        } else if(i == 0){
           return ".000";
        }
    }
    
    function addplus(n){
        if(n > 0){
            return "+" + n;
        }else{
            return n;
        }
    }
    
    function addspace(n){
        if(n >= 0 && n <= 9){
            return " " + n;
        }
        return n;
    }
    
    //平順
    function heijun(o, n){
        var s = Math.round((o[1]+o[2]*2 + o[3]*3 + o[4]*4) / n * 100).toString();
        return s.charAt(0) + "." + s.slice(1);
    }
    
    //平得
    function heitoku(o, n){
        var s = Math.round(o[0]/n * 100);
        if(s == 0){
            return "0";
        }else if(s < 100 && s > 10){
            s = "0" + s;
        }else if(s < 10 && s > 0){
            s = "00" + s;
        }else if( s < -10 && s > -100){
            s = s.toString().slice(0, 1) + "0" + s.toString().slice(1)
        }else if( s < 0 && s > -10){
            s = s.toString().slice(0, 1) + "00" + s.toString().slice(1)
        }
        s = s.toString().slice(0, -2) + "." + s.toString().slice(-2);
        return addplus(s);
    }
    
    //pt収支
    function pt_shuusi4(o, dan){
        var pt = [0,0];
        var plus=[[0,0],[0,0],[30,0],[45,0],[40,10],[60,15],[50,20],[75,30],[60,30],[90,45]];
        var minus = [-30,-40,-50,-60,-70,-80,-90,-100,-110,-120];
        for(var i=2;i<10;i++){
            if(i % 2 == 0){    //東風戦のpt収支
                pt[0] += o[i][1]*plus[i][0] + o[i][2]*plus[i][1] + o[i][4]*minus[dan];
            }else{    //東南戦のpt収支
                pt[1] += o[i][1]*plus[i][0] + o[i][2]*plus[i][1] + o[i][4]*minus[dan]*1.5;
            }
        }
        return pt;
    }
    
    function pt_shuusi3(o, dan){
        var pt = [0,0];
        var plus=[0, 0, 30, 45, 50, 75, 70, 105, 90, 135];
        var minus = [-30,-40,-50,-60,-70,-80,-90,-100,-110,-120];
        for(var i=2;i<10;i++){
            if(i % 2 == 0){
                pt[0] += o[i][1]*plus[i] + o[i][3]*minus[dan];
            }else{
                pt[1] += o[i][1]*plus[i] + o[i][3]*minus[dan]*1.5;
            }
        }
        return pt;
    }

    //想定pt収支
    function soutei4(o, dan, taku){
        if(taku < 0){
            return 0;
        }
        var pt = [0,0], plus = [[60,30], [50,20], [40,10]];
        var minus = [-30,-40,-50,-60,-70,-80,-90,-100,-110,-120];
        pt[0] += o[0][1]*plus[taku][0]+o[0][2]*plus[taku][1]+o[0][4]*minus[dan];
        pt[1] += (o[1][1]*plus[taku][0]+o[1][2]*plus[taku][1]+o[1][4]*minus[dan])*1.5;
        return pt;
    }
    
    function soutei3(o, dan, taku){
        if(taku < 0){
            return 0;
        }
        var pt = [0,0], plus = [90, 70, 50];
        var minus = [-30,-40,-50,-60,-70,-80,-90,-100,-110,-120];
        pt[0] += o[0][1]*plus[taku] + o[0][3]*minus[dan];
        pt[1] += (o[1][1]*plus[taku] + o[1][3]*minus[dan])*1.5;
        return pt;
    }
    
    //対局した卓
    function senjou(o){
        var s = "", count = 0;
        var takuname = ["個東","個南","般東","般南","上東","上南","特東","特南","鳳東","鳳南"];
        for(var i=0;i<10;i++){
            var n = o[0][i][5] + o[1][i][5];
            if(n > 0){
                if(count > 0){
                    s += " ";
                }
                count += 1;
                s += takuname[i] + n + "戦";
            }
        }
        return s;
    }

    //pt差の表記
    function pt_sa(pt1, pt2, s_pt1, s_pt2){
        var s = "pt収支差" + addplus(pt1 - pt2);
        if($("s_taku").selectedIndex != 0){
            s += " 想定pt収支差" + addplus(s_pt1 - s_pt2);
        }
        return s;
    }
    
    //成績の表記
    function seiseki(o, pt, s_pt, dan, n){
        var s = ratio(o[1], o[6])+" "+ratio(o[2], o[6])+" "+ratio(o[3], o[6]);
        if(n == 4){
        s += " "+ratio(o[4], o[6]);
        }
        s += "  平順 " + heijun(o, o[6]) +"\n";
        s += "( " + addspace(o[1]) + " - " + addspace(o[2]) + " - " + addspace(o[3]);
        if(n == 4){
        s += " - " + addspace(o[4]);
        }
        s += ") " + "平得" + heitoku(o, o[6]) + "\n";
        s += "総合得点" + addplus(o[0]) + " pt収支" + addplus(pt);
        if($("s_taku").selectedIndex != 0){
            s += " 想定pt収支" + addplus(s_pt);
        }
        return s;
    }    

//------------------------------------------------------------------------------------------------------    
    var s = "";
    s += id1 + " 対 " + id2 + "\n\n";
    //四麻
    if(yonma1[6] > 0){
        var pt1 = pt_shuusi4(score[1][0], $("danni1").value);
        var pt2 = pt_shuusi4(score[1][1], $("danni2").value);
        var s_pt1 = soutei4(kazesum[1][0], $("danni1").value, $("s_taku").selectedIndex-1);
        var s_pt2 = soutei4(kazesum[1][1], $("danni2").value, $("s_taku").selectedIndex-1);
        
        s += "■四麻 " + (yonma1[5]+yonma2[5]) + "戦 " + yonma1[5] + "勝" + yonma2[5] + "敗 得点差" + addplus((yonma1[0]-yonma2[0])) + "\n";
        s += senjou(score[1]) + "\n";
        s += pt_sa(pt1[0]+pt1[1], pt2[0]+pt2[1], s_pt1[0]+s_pt1[1], s_pt2[0]+s_pt2[1]);
        s+="\n\n"+id1+"\n"+seiseki(yonma1,pt1[0]+pt1[1],s_pt1[0]+s_pt1[1],$("danni1"),4);
        s+="\n\n"+id2+"\n"+seiseki(yonma2,pt2[0]+pt2[1],s_pt2[0]+s_pt2[1],$("danni2"),4);
        
        //四麻東・南ごと
        if(kazesum[1][0][0][6]>0 && kazesum[1][0][1][6] > 0 && $("check").checked){
            for(var i=0;i<2;i++){
                s += "\n\n\n□";
                if(i == 0) s += "東風 ";
                else s += "東南 ";
                s += kazesum[1][0][i][6] + "戦 " + kazesum[1][0][i][5] + "勝" + kazesum[1][1][i][5] + "敗 得点差" + addplus((kazesum[1][0][i][0]-kazesum[1][1][i][0])) + "\n";
                s += pt_sa(pt1[i], pt2[i], s_pt1[i], s_pt2[i]);
                s+="\n\n"+id1+"\n"+seiseki(kazesum[1][0][i],pt1[i],s_pt1[i],$("danni1"),4);
                s+="\n\n"+id2+"\n"+seiseki(kazesum[1][1][i],pt2[i],s_pt2[i],$("danni2"),4);
            }
        }
    } 
    
    //三麻
    if(sanma1[6] > 0){
        var pt1 = pt_shuusi3(score[0][0], $("danni1").value);
        var pt2 = pt_shuusi3(score[0][1], $("danni2").value);
        var s_pt1 = soutei3(kazesum[0][0], $("danni1").value, $("s_taku").selectedIndex-1);
        var s_pt2 = soutei3(kazesum[0][1], $("danni2").value, $("s_taku").selectedIndex-1);
        
        if(yonma1[6] > 0){
            s += "\n\n\n";
        }
        s += "■三麻 " + (sanma1[5]+sanma2[5]) + "戦 " + sanma1[5] + "勝" + sanma2[5] + "敗 得点差" + addplus((sanma1[0]-sanma2[0])) + "\n";
        s += senjou(score[0]) + "\n";
        s += pt_sa(pt1[0]+pt1[1], pt2[0]+pt2[1], s_pt1[0]+s_pt1[1], s_pt2[0]+s_pt2[1]);
        s+="\n\n"+id1+"\n"+seiseki(sanma1,pt1[0]+pt1[1],s_pt1[0]+s_pt1[1],$("danni1"),3);
        s+="\n\n"+id2+"\n"+seiseki(sanma2,pt2[0]+pt2[1],s_pt2[0]+s_pt2[1],$("danni2"),3);
        
        //三麻東・南ごと
        if(kazesum[0][0][0][6]>0 && kazesum[0][0][1][6] > 0 && $("check").checked){
            for(var i=0;i<2;i++){
                s += "\n\n\n□";
                if(i == 0) s += "東風 ";
                else s += "東南 ";
                s+=kazesum[0][0][i][6] + "戦 " + kazesum[0][0][i][5] + "勝" + kazesum[0][1][i][5] + "敗 得点差" + addplus((kazesum[0][0][i][0]-kazesum[0][1][i][0])) + "\n";
                s+=pt_sa(pt1[i], pt2[i], s_pt1[i], s_pt2[i]);
                s+="\n\n"+id1+"\n"+seiseki(kazesum[0][0][i],pt1[i],s_pt1[i],$("danni1"),3);
                s+="\n\n"+id2+"\n"+seiseki(kazesum[0][1][i],pt2[i],s_pt2[i],$("danni2"),3);
            }
        } 
    }
    $("result").value = s;
    }
})();