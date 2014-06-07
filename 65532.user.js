// ==UserScript==
// @name           iru_inai
// @namespace      http://d.hatena.ne.jp/meefla/
// @description    Colorize and hide questions on the Question List per user basis.
// @include        http://q.hatena.ne.jp/list*
// @include        http://q.hatena.ne.jp/ranking
// @exclude        http://q.hatena.ne.jp/list/anonymous
// @grant          none
// @version        0.5
// ==/UserScript==

(function(){
  // 設定
  var prefs =['meefla', 'alpinix', 'lionfan2']; // お好みのユーザーIDに変更して下さい。
  var prefsColor = "LightYellow"; // 強調色の設定
  
  var denies=['inai_inai', 'tabun_inai', 'kitto_inai']; // 非表示にしたいユーザーのIDに変更して下さい。
  var delRow=true; // true で質問全体を非表示。false にすると質問文だけを消します。
  // 設定終了
  
  var currentUrl = window.location.href;
  var pageType = currentUrl.substr(22, 4);
  if(pageType == "rank") {
    var listsByClass = document.getElementsByClassName("rankinglist");
  }
  else {
    var listsByClass = document.getElementsByClassName("list-question");
  }
  var lists = listsByClass[0].getElementsByTagName("li");

  for(var i=lists.length-1;i>=0;i--){
    if(pageType == "rank") {
      var userName_elem=lists[i].childNodes[0].childNodes[1];
    }
    else {
      var userName_elem=lists[i].childNodes[2].childNodes[0];
    }
    var userNameLink = userName_elem.title;
    var userName = userNameLink.slice(3);
    
    // 指定ユーザーの質問非表示または質問文非表示
    for(var j=0;j<denies.length;j++){
      if(userName==denies[j]){
        if(delRow){
          // delete row
          lists[i].style.display="none";
        }
        else{
          // hide text
          var questionTexts = lists[i].getElementsByClassName("question-content");
          questionTexts[0].style.visibility="hidden";
        }
        break;
      }
    }
    // 指定ユーザーの強調表示
    for(var k=0;k<prefs.length;k++){
      if(userName==prefs[k]){
        lists[i].style.backgroundColor = prefsColor;
        break;
      }
    }
  }
}
)();
