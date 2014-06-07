// ==UserScript==
// @name            WassrStatuses-dailyViewer
// @namespace       http://rilakkuma.moe.hm/
// @description     Wassrで日付毎のヒトコトへのリンクを追加
// @include         http://wassr.jp/user/*
// @author          betoneto http://wassr.jp/user/betoneto
// @version         0.1
// ==/UserScript==

dd = new Date();
yyyy = dd.getYear();
mm = dd.getMonth() + 1;
dd = dd.getDate();
if(yyyy < 2000){yyyy += 1900;}
if(mm < 10){mm = "0" + mm;}
if(dd < 10){dd = "0" + dd;}

function add(){
  var urlString;
  var divElements = document.getElementsByTagName("div");
  for(i=0; i<divElements.length; i++){
    if(divElements[i].className == 'image'){
      urlString = divElements[i].firstChild.href;
    }
    if(divElements[i].className == 'UserSub'){
      urlString = urlString + "/statuses-daily/" + yyyy + "-" + mm + "-" + dd;
      var pElements = divElements[i].childNodes;
      for(j=0; j<pElements.length; j++){
        if(pElements[j].className == 'buttons'){
          pElements[j].innerHTML += 
          '<a href="' + urlString + '"><img class="emoji" src="/img/pictogram/E56A.gif" alt="" title="" width="16" height="16">日付検索</a>';
        }
      }
    }
  }
}

add();
