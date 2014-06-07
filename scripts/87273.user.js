// ==UserScript==
// @name           Utasuki TSV Generator
// @namespace      http://rimpei.org/
// @description    うたスキのりれきページでスコアを含んだTSVを生成します。
// @include        http://joysound.com/ex/utasuki/mypage/singhistory/*index.htm
// ==/UserScript==

// Using jQuery
// http://www.otchy.net/20091104/use-jquery-on-greasemonkey/
(function(d,f){var c=function(){if(unsafeWindow.jQuery==null)return 1;f(unsafeWindow.jQuery)};if(c()){var s=d.createElement("script");s.src="//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";d.getElementsByTagName("head")[0].appendChild(s);(function(){!c()||setTimeout(arguments.callee,100)})()}})(document,function($){main($);$("#b").click(function(){alert("")})});

function main($) {
    var tsvRow = function(i,e){
       var row = [
           e.cells[0].textContent // 演奏日付
         , e.cells[1].textContent // 曲名
         , e.cells[2].textContent // 歌手名
         , e.cells[1].firstChild.attributes[0].value.match(/\d+/)[0]  // 曲ID
         , e.cells[2].firstChild.attributes[0].value.match(/[\d_]+/)[0] // 歌手ID
       ];

       // sleep するけどブラウザ操作不能になるお！
       $.ajax({url: "http://rimpei.org/sozai/sleep.php", async: false});

       // 順位、人数、得点、平均点 を取得
       $.ajax({
           url: "/ex/search/ranking.htm?selSongNo="+row[3],
           async: false,
           success: function(data) {
               // $(data) としてしまうと画像などを読み込んでしまうため、
               // 必要な部分のみ正規表現で切りだしてから評価する
               $(/<p class="myRank">[\s\S]*?<\/p>/.exec(data)[0]).find("strong").each(function(){
                   row.push(this.textContent);
               });
           },
       });

       return row.join("\t");
    };

    var tsv = function(){
        return $("div.tableList tbody tr").map(tsvRow).toArray().reverse().join("\n");
    };

    $("body").append('<input id="_" type="submit" value="Generate TSV">');
    $("#_").click(function(){
        $(this).val("Loading...").attr("disabled", true);
        $("body").append("<pre>"+tsv()+"</pre>");
        $(this).hide();
    });
}
