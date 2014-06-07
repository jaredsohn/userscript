// ==UserScript==
// @name           Delete styles
// @namespace      http://melnitsa.net/forum/*
// @description    Удалить нафиг!
// @include	http://melnitsa.net/forum/*
// @include	http://www.melnitsa.net/forum/*
// ==/UserScript==
var tag='span', flag=false, spans='', n=1; /*n=1 потому что в серой теме это див, не содержащий внутри другие дивы*/
if (document.getElementsByTagName('head')[0].getElementsByTagName('link')[0].rel=='shortcut icon'){ /*проверка темы оформления по наличию фавикона - в зелёной теме его нет*/
var tag='div';
var flag=true;
}
var posts=document.getElementsByTagName(tag); /*выбор дивов с постами/подписями, либо спана с подписью*/
for(i=1;i<posts.length;i++){
if (posts[i].className=='postbody'){   
  if (flag){
   if((posts[i-1].className=='postbody')||(posts[n].innerHTML.indexOf('<div')>=0)){ /*если предыдущий див был постом, значит текущий - подпись или если текущий всё таки подпись, но див с постом содержит лишние дивы, нарушающие порядок*/
    spans=posts[i].getElementsByTagName('span'); /* отобрали подпись разбираем все существующие в ней спаны*/
   }
  }
  else {spans=posts[i].getElementsByTagName('span');}
  for(j=0;j<spans.length;j++){  
    spans[j].removeAttribute('style'); /*удаляем стили спанов в подписи*/
  }
var n=i; /* n - индекс предыдущего дива с классом постбоди */
}
}
