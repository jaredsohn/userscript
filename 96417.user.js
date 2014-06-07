// ==UserScript==
// @name           Nico Mylist Rate
// @version        0.2.0
// @description    ニコニコ動画検索結果にマイリスト率を表示
// @include        http://www.nicovideo.jp/*
// ==/UserScript==

(function(){
  var x = document.getElementsByClassName("count view");
  var count_view = document.getElementsByClassName("count view");
  var count_mylist = document.getElementsByClassName("count mylist");
  for (var i = 0; i < count_view.length; i++){
    var view = count_view[i].lastChild.innerHTML.replace(/,/g,"");
    var mylist = count_mylist[i].lastChild.lastChild.innerHTML.replace(/,/g,"");
    var indication, rate, startTag;
    if(view < 100){
      indication="--";
    }else{
      rate=(mylist/view*100).toFixed(0);
      if(rate >= 10){
        var startTag="<font size='4' color='#008000' style='font-weight: bold'>";
      }else if(rate >= 7){
        var startTag="<font size='2' color='#FF0000' style='font-weight: bold'>";
      }else if(rate >= 5){
        var startTag="<font size='2' color='#0000FF' style='font-weight: bold'>";
      }else{
        var startTag="<font size='2' color='#393F3F' style='font-weight: bold'>";
      }  
      indication=startTag+rate+"%</font>";
    }
    var parentNode = count_view[i].parentNode.parentNode;
    var newNode = document.createElement('div');
    parentNode.appendChild(newNode);
    parentNode.lastChild.innerHTML = "<div style='font-size: 5px'><br></div>" + indication;
  }
})();