// pixiv favrate

// .1004 2011/05/21 @furugomu
// .1003 1010/7/21
// .1002 2010/7/18
// 　・pixivの仕様変更に追従
//
// .1001
// 　・fav数１のとき取りこぼすポカ直した。単数形め・・・
//
// .1000

// ==UserScript==
// @name           pixiv favrate
// @namespace      http://q-orbit.jp/
// @description    pixivで平均点やfav率を表示
// @include        http://www.pixiv.net/member_illust.php*
// @exclude        http://www.pixiv.net/member_illust.php?id=*
// @exclude        http://www.pixiv.net/*mode=big*
// @require http://code.jquery.com/jquery-1.6.1.min.js
// ==/UserScript==


// ==============カスタマイズ===============
// fav率何％～何％まで色変えするか
var favRateMin =  1;
var favRateMax =  5;

// 平均点何点～何点まで色変えするか
var avgScoreMin = 8.5;
var avgScoreMax = 9.7;

// 何色から何色までグラデするか(RGB値で)
var coldColor = new Array(230,240,240);
var hotColor  = new Array(255,200,210);
// =========================================



// メインパート

var url = document.URL;
if( url.indexOf( "illust_id" ) == -1 ) {
    favrate(); // イラスト管理画面の場合
} else {
    scorerate();  // イラスト単体画面の場合
}


function scorerate() {

    ratingDivision = document.getElementById('rating');
    ratingText = ratingDivision.innerHTML;
    // レーティングdivの表記例
    //<div id="unit">閲覧数：18152　評価回数：1059　総合点：10477<br> </div> 

    // 閲覧数
    var p1,p2;
    p1 = ratingText.indexOf("：");
    p2 = ratingText.indexOf("　");
    var numViews = eval(ratingText.substring( p1+1, p2 ));

    // 評価回数
    p1 = ratingText.indexOf("：", p1+1 );
    p2 = ratingText.indexOf("　", p2+1 );
    var numRatings = eval(ratingText.substring( p1+1, p2 ));

    // 総合点
    p1 = ratingText.indexOf("：", p1+1 );
    p2 = ratingText.indexOf("<", p2+1 );
    var numSumScore = eval(ratingText.substring( p1+1, p2 ));

    // 評価率 = 評価回数 / 閲覧数
    if( numViews == 0 ) {
        ratingRate = 0;
    } else {
        ratingRate = Math.round( 1000 * numRatings / numViews )/10;
    }

    // 平均点 = 総合点 / 評価回数
    if( numRatings == 0 ) {
        avgScore = 0;
    } else {
        avgScore = Math.round( 100 * numSumScore / numRatings )/100;
    }

    // 表示部分を生成する
    var newDataString = "評価率：" + ratingRate  + "%　平均点：" + avgScore;
    var newStatSpan = document.createElement("span");
    var newTextNode = document.createTextNode( newDataString );

        // 色変え：ちゃんと計算してないので、場合によってはcold,hotよりも先の色になります
    var statDivColor = Array( 0,0,0 );
    for(var ii = 0; ii < 3; ii++) {
        statDivColor[ii] = Math.round(Math.min(255, (coldColor[ii]+(hotColor[ii]-coldColor[ii])*Math.max((avgScore-avgScoreMin),0)/(avgScoreMax-avgScoreMin) )));
    }
    var newColorDecr = "rgb(" + statDivColor[0] + "," + statDivColor[1] + ","+ statDivColor[2]+ ")";
    newStatSpan.style.backgroundColor = newColorDecr;

    newStatSpan.appendChild( newTextNode );
    ratingDivision.appendChild( newStatSpan );
}


function favrate() {
  $('.display_works > ul > li').each(function() {
    // 表示部分が下端に付くので、わかりやすいように枠をつける
    $(this).css({'padding-bottom': '0', border: '1px solid #aaa'})

    var text = $('> span', this).text();
    var map = {};
    var re = /([^：]+)：(\d+)/g;
    for (var m = re.exec(text); m; m = re.exec(text)) {
      map[m[1]] = Number(m[2]);
    }
    var numComments = map['コメント'];
    var numViews = map['閲覧数'];
    var numRatings = map['評価回数'];
    var numTotal = map['総合点'];
    var numFavusers = Number($('.count-list > li:first').text());
    // var イメレス数？ = Number($('.count-list > li:nth(1)').text());

    // 表示部分を生成する
    function div(x, y) {
      
      return y == 0 ? 0 : x/y;
    }
    var commRate = Math.round(10000*div(numComments, numViews))/100;
    var favRate = Math.round(1000*div(numFavusers, numViews))/10;
    var ratingRate = Math.round(1000*div(numRatings, numViews))/10;
    var avgScore = Math.round( 100 * div(numTotal, numRatings))/100;

    var str = "FAV: " + favRate  + "% | COM: " + commRate + "%<br>RAT: " + ratingRate + "% | AVG: " + avgScore;
    $('<div></div>')
      .html(str)
      .appendTo(this)
      .css('font-size', '11px')
      .css('background-color', function() {
        // 色変え：ちゃんと計算してないので、場合によってはcold,hotよりも先の色になります
        var statDivColor = Array( 0,0,0 );
        for(var ii = 0; ii < 3; ii++) {
          statDivColor[ii] = Math.round(Math.min(255, (coldColor[ii]+(hotColor[ii]-coldColor[ii])*Math.max((favRate-favRateMin),0)/(favRateMax-favRateMin) )));
        }
        return 'rgb('+statDivColor.join(',')+')';
      });
  });
}

function favrate0(){

    listingDivision = document.getElementById('f').getElementsByTagName('div').item(1);
    illustUnits = listingDivision.getElementsByTagName('li');

    for (var i = 0; i < illustUnits.length; i++) {
        thisUnit = illustUnits[i];
        dataDivision = thisUnit.getElementsByTagName('span').item(0);
        
        // 表示部分が下端に付くので、わかりやすいように枠をつける
        thisUnit.style.border = '1px solid #aaa';
        
        commentViewsText = dataDivision.innerHTML;

        // コメント数閲覧数の表記例
        // コメント：1<span style="padding-right: 6px;"></span>閲覧数：12491<br>評価回数：206<span style="padding-right: 6px;"></span>総合点：2025

        // コメント数
        p1 = commentViewsText.indexOf("：",1);
        p2 = commentViewsText.indexOf("<",1);
        var numComments = eval(commentViewsText.substring( p1+1, p2 ));

        // 閲覧数
        p1 = commentViewsText.indexOf("：",p1+1);
        p2 = commentViewsText.indexOf("<",p1+1);
        var numViews = eval(commentViewsText.substring( p1+1, p2 ));
        if( numViews == 0 ) continue;

        // 評価回数
        p1 = commentViewsText.indexOf("：",p1+1);
        p2 = commentViewsText.indexOf("<",p1+1);
        var numRatings = eval(commentViewsText.substring( p1+1, p2 ));
        if( numRatings == 0 ) continue;

        // 総合点
        p1 = commentViewsText.indexOf("：",p1+1);
        p2 = commentViewsText.length;
        var numTotal = eval(commentViewsText.substring( p1+1, p2 ));
        if( numTotal == 0 ) continue;


        // favorite数(あれば)
        var favText = thisUnit.getElementsByTagName('a').item(1).innerHTML;
        if ( favText.indexOf("user") == -1 ) {
            if( favText.indexOf("res") != -1 ) {
                favText = thisUnit.getElementsByTagName('a').item(2).innerHTML;
            }
        }
        if ( favText.indexOf("user") == -1 ) {
            var numFavusers = 0;
        } else {
            p1 = favText.indexOf(">");
            p2 = favText.indexOf("user");
            var numFavusers = eval( favText.substring( p1+1, p2-1));
        }

        // 表示部分を生成する
        commRate = Math.round(10000*numComments/numViews)/100;
        favRate = Math.round(1000*numFavusers/numViews)/10;
        ratingRate = Math.round(1000*numRatings/numViews)/10;
        avgScore = Math.round( 100 * numTotal / numRatings )/100;

        var newDataString = "FAV: " + favRate  + "% | COM: " + commRate + "%<br>RAT: " + ratingRate + "% | AVG: " + avgScore;
        var newStatDiv = document.createElement("div"); 
        newStatDiv.innerHTML = newDataString;
       
            // 色変え：ちゃんと計算してないので、場合によってはcold,hotよりも先の色になります
        var statDivColor = Array( 0,0,0 );
        for(var ii = 0; ii < 3; ii++) {
            statDivColor[ii] = Math.round(Math.min(255, (coldColor[ii]+(hotColor[ii]-coldColor[ii])*Math.max((favRate-favRateMin),0)/(favRateMax-favRateMin) )));
        }
        var newColorDecr = "rgb(" + statDivColor[0] + "," + statDivColor[1] + ","+ statDivColor[2]+ ")";
        newStatDiv.style.backgroundColor = newColorDecr;
        newStatDiv.style.fontSize = '11px';

        thisUnit.style.paddingBottom = '0px';
        thisUnit.appendChild( newStatDiv );
        
    }
} 
