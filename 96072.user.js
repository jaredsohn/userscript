// ==UserScript==
// @name          hatena-q-iruka-ex
// @version       1.1
// @namespace     http://userscripts.org/users/kawaz
// @description   はてな人力検索プロフィールのイルカを少し見やすくする
// @include       http://q.hatena.ne.jp/*
// ==/UserScript==
(function(){
  var irukas = document.getElementsByClassName("myirukacell")[0].getElementsByTagName("a");
  for(var i = 0; i < irukas.length; i++) {
    iruka = irukas[i];
    iruka.appendChild(document.createTextNode(iruka.firstChild.title));
    iruka.appendChild(document.createElement("br"));
    iruka.style.display = "none";
  }
  if(0 < irukas.length) {
    var irukainfo = document.createElement("div");
    irukainfo.appendChild(document.createTextNode("いるか数：" + irukas.length));
    irukainfo.onclick = function(){
      for(var i = 0; i < irukas.length; i++) {
        irukas[i].style.display = "";
      }
    };
    irukas[0].parentNode.appendChild(irukainfo);
  }
})();