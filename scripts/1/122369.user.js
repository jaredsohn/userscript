// ==UserScript==
// @name          taiyosha_comic_list_ex2
// @namespace     http://userscripts.org/users/kawaz
// @description   太陽社の「出版社・発売日順(リスト表示)」を改造する
// @version       1.2
// @match         http://taiyosha.co.jp/comic/
// ==/UserScript==
if(/taiyosha.co.jp\/comic\/comic.*_listhan.html/.test(location.href)) {
  Array.prototype.slice.call(document.querySelectorAll("body>li")).forEach(function(li){
    var t=li.innerHTML;
    var v=t.replace(/\((完|成)\)/,"").split(/&nbsp;&nbsp;/);
    var a=document.createElement("a");
    a.innerHTML=li.innerHTML;
    a.href="http://www.google.co.jp/search?tbm=isch&q="+encodeURIComponent(v[2]+" "+v[3]+" ");
    a.style.textDecoration="none"
    li.innerHTML="";
    li.appendChild(a);
  });
}