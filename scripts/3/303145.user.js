// ==UserScript==
// @name	dBy interpreter
// @namespace   http://www.biacco42.info/
// @description 円/¥ で表示された金額を便利な単位dBy【でぃーびーわい】デシベル円に変換して表示します。便利！
// @include     *
// @exclude    https://www.google.co.jp/*
// @exclude    https://www.google.com/*
// @author     Biacco42
// @license     Apache License 2.0
// @version     0.1
// ==/UserScript==

// 配布場所
// http://userscripts.org

(function() {

  window.onload = function (){
    traverse(document);
  }

  function yenReplace(kidelem){
    if(kidelem.nodeValue.search(/(\d{1,3}(,\d{3})*)\s{0,1}円|\¥\s{0,1}(\d{1,3}(,\d{3})*)|￥\s{0,1}(\d{1,3}(,\d{3})*)/) != -1){
      var price_w_yen = kidelem.nodeValue.match(/(\d{1,3}(,\d{3})*)\s{0,1}円|\¥\s{0,1}(\d{1,3}(,\d{3})*)|￥\s{0,1}(\d{1,3}(,\d{3})*)/);
      var price_wo_comma = Number(price_w_yen[0].replace(/[\s円\¥￥,，]/g, ''));
      var price_dBy = 10 * Math.LOG10E * Math.log(price_wo_comma);
      kidelem.nodeValue = kidelem.nodeValue.replace(/(\d{1,3}(,\d{3})*)\s{0,1}円|\¥\s{0,1}(\d{1,3}(,\d{3})*)|￥\s{0,1}(\d{1,3}(,\d{3})*)/, price_dBy.toFixed(4) + ' dBy');
      yenReplace(kidelem);
    }else if(kidelem.nodeValue.search(/(\d+)\s{0,1}円|\¥\s{0,1}(\d+)|￥\s{0,1}(\d+)/) != -1){
      var price_w_yen = kidelem.nodeValue.match(/(\d{1,3}(,\d{3})*)\s{0,1}円|\¥\s{0,1}(\d{1,3}(,\d{3})*)|￥\s{0,1}(\d{1,3}(,\d{3})*)/);
      var price_wo_comma = Number(price_w_yen[0].replace(/[\s円\¥￥]/g, ''));
      var price_dBy = 10 * Math.LOG10E * Math.log(price_wo_comma);
      kidelem.nodeValue = kidelem.nodeValue.replace(/(\d+)\s{0,1}円|\¥\s{0,1}(\d+)|￥\s{0,1}(\d+)/, price_dBy.toFixed(4) + ' dBy');
      yenReplace(kidelem);
    }
  }
  
  function percentReplace(kidelem){
    if(kidelem.nodeValue.search(/\d+\s{0,1}(%|％)/) != -1){
      var percent_w_mark = kidelem.nodeValue.match(/\d+\s{0,1}(%|％)/);
      var percent = Number(percent_w_mark[0].replace(/[\s%％]/g, ''));
      var percent_dB = 10 * Math.LOG10E * Math.log(percent/100);
      kidelem.nodeValue = kidelem.nodeValue.replace(/\d+\s{0,1}(%|％)/, percent_dB.toFixed(4) + ' dB');
      percentReplace(kidelem);
    }
  }

  function traverse(elem){
    var kids = elem.childNodes;
    var kid;
    for(var a=0; a<kids.length; a++){
      kid = kids.item(a);
      if(kid.nodeType == 3){
        yenReplace(kid);
        percentReplace(kid);
      }else{
        if(kid.childNodes.length>0){
          traverse(kid);
        }
      }
    }
  }
   
})();