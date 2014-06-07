// ==UserScript==
// @name           bro3_Trading_support
// @namespace      3gokushi-elmore
// @include        http://*.3gokushi.jp/card/trade_card.php*
// @description    ブラウザ三国志:トレード出品補助、軽い版
// ==/UserScript==

/*
 * http://www.otchy.net/20091104/use-jquery-on-greasemonkey/
 * によるjQuery読み込みスニペットを使用しています
 */

var $v = function(key) { return document.evaluate(key, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); };

(function(d, func) {
   var check = function() {
       if (typeof unsafeWindow.jQuery == 'undefined') return false;
       func(unsafeWindow.jQuery); return true;
   }
   if (check()) return;
   var s = d.createElement('script');
   s.type = 'text/javascript';
   s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
   d.getElementsByTagName('head')[0].appendChild(s);
   (function() {
       if (check()) return;
       setTimeout(arguments.callee, 100);
   })();
})(document, function($){
       GM_log("a");
       $("#cardFileList .cardColmn").each(function(index,elem){
               var cardNo = $(".cardno",this).text();
               var controlObj = $(".control",this);
               var cardPriceGetButton = $(document.createElement("span"));
               $(cardPriceGetButton).html("<input type='button' value='即落札調査' />");
               $(controlObj).after(cardPriceGetButton);
               var cardPriceSetText = $(document.createElement("span"));
               cardPriceSetText.text("未調査");
               $(controlObj).after(cardPriceSetText);
               var gourl = "http://" + location.hostname + "/card/trade.php?s=price&o=a&t=no&k="+cardNo+"&p=1";
               cardPriceGetButton.click(function(){
                       $(cardPriceSetText).text("調査中");
                       $.ajax({
                               url: gourl,
                               success: function(msg,textStatus){

                                       lastPageStr=$(".pager .last a:last",msg).attr("href");
                                       if(lastPageStr != null){
                                               var lastpage = lastPageStr.match("p=([0-9]+)")
                                               //GM_log(lastpage[1]);
                                               var maxpage = lastpage[1];
                                       }else{
                                               var maxpage = 1;
                                       }
                                       var nowpage =0;
                                       //$(cardPriceSetText).text("取得中…" + nowpage + "ページ／"+maxpage+"ページ");
                                       setTimeout(getCardTrade,0);

                                       function getCardTrade(){

                                               if (nowpage < 0) {
                                                       return;
                                               }
                                               nowpage++;
                                               var geturl = "http://" + location.hostname + "/card/trade.php?s=price&o=a&t=no&k="+cardNo+"&p=" + nowpage;
                                               $(cardPriceSetText).text("取得中…" + nowpage + "ページ／"+maxpage+"ページ");
                                               $.ajax({
                                                       url: geturl,
                                                   success: function(msg, textStatus){
                                                       var findJustCard = 0;
                                                       var minTP = 999999;
                                                       var strTP = "";
                                                       var TP = -1;
                                                               $(".tradeTables tr:nth-child(n+2)",msg).each(function(index,elem){
                                                                       GM_log("index=" + index);
                                                                       limit = $(".limit",this).text();
                                                                       strTP = $("strong",this).text();
                                                                       strTP=strTP.replace(",","");
                                                                       TP = Number(strTP);

                                                                       if(limit === "---"){
                                                                               GM_log("index=" +index+ " TP=" +TP);
                                                                               if(TP < minTP){
                                                                                       minTP = TP;
                                                                               }
                                                                               $(cardPriceSetText).text("完了：" + minTP +"TP");
                                                                               $(cardPriceSetText).attr("style","color:#0000CC");

                                                                               findJustCard = 1;

                                                                       }else{

                                                                       }
                                                               });
                                                               if(findJustCard === 1){
                                                                       return 0;
                                                               }
                                                               if(nowpage < maxpage){
                                                                       window.setTimeout(getCardTrade, 0);
                                                               }else{
                                                                       $(cardPriceSetText).text("即落札なし");
                                                               }
                                                       }
                                               });

                                       }
                               }
                       });
               });
               //cardPriceGetButton.click(function(){の終わり

               var cardPutOnShowinp = $("<input>").val("499").attr("size","10");
               var cardPutOnShowButton = $(document.createElement("span"));
               $(cardPutOnShowButton).html("<input type='button' value='出品する' />");



               $(cardPriceGetButton).after(cardPutOnShowinp);
               $(cardPriceGetButton).after(cardPutOnShowButton);
               $(cardPriceGetButton).after($(document.createElement("div")));
               var cardColmnObj = this;

               cardPutOnShowButton.click(function(){
                       var uniqCardIDStr=$(".control",cardColmnObj).html();
                       GM_log("uniqCardIDStr=" + uniqCardIDStr);
                       var uniqCardIDrex = uniqCardIDStr.match("go_exhibit_confirm\\(([0-9]+),[0-9]+\\)");
                       GM_log(uniqCardIDrex[1]);
                       var uniqCardID = uniqCardIDrex[1];
                       var gourl = "http://" + location.hostname + "/card/exhibit_confirm.php";
                       var CardPutOnShowPrice = $(cardPutOnShowinp).val();
                       GM_log("出品価格="+CardPutOnShowPrice);
                       cardPutOnShowinp.remove();
                       var cardPutOnShowStatsText = $(document.createElement("span")).text("出品中");
                       $(cardPutOnShowButton).after(cardPutOnShowStatsText);

                       var elm = $v('//input[@class="commentSend"]');
                       var list = elm.snapshotItem(0).getAttribute("onclick").match(/,'(.*)'\);/);

                       $.post(gourl, {
                               exhibit_cid: uniqCardID,
                               exhibit_price: CardPutOnShowPrice,
                               exhibit_btn: "出品する",
                               ssid: list[1]
                       }, function(data,textStatus){
                               //GM_log("出品成功");
                               //GM_log(data);
                               PutOnShowStr = $('.notice',data).text();
                               GM_log(PutOnShowStr);
                               if(PutOnShowStr.indexOf("カードを出品しました") > 0){
                                       $(cardPutOnShowStatsText).text("出品成功").attr("style","color:#0000CC");
                               }else{
                                       $(cardPutOnShowStatsText).text("出品満杯").attr("style","color:#CC0000");
                               }
                       });
               });
       });
       //$("#cardFileList .cardColmn").each(function(index,elem){の終わり
});