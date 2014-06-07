// ==UserScript==
// @name          hatena-q-hide-denied-question
// @namespace     http://userscripts.org/users/kawaz
// @description   はてな人力検索で答えられない（回答条件に外れる）質問を見えなくする
// @include       http://q.hatena.ne.jp/list*
// ==/UserScript==
(function(){
  var lis = document.querySelectorAll(".list-question>li");
  Array.prototype.slice.apply(lis).forEach(function(li){
    if(li.querySelector("img[src*='recepting-disable']")) li.style.display='none';
  });
  //AutoPagerize手抜き対応
  setTimeout(arguments.callee, 2000);
})();