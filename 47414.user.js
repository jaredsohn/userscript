// ==UserScript==
// @name           Wikipedia Localization
// @namespace      http://userscripts.org/users/45256
// @include        http://zh.wikipedia.org/*
// 用途: 判斷中文Wikipedia的網址，自動切換到繁體檢視
// ==/UserScript==

url=location.href;
re1 = /zh\.wikipedia\.org\/wiki\/(\w+)/;
re2=/\?title=(\w+)&variant=(?!zh\-(tw|hant))/;
//replace string
//target="http://zh.wikipedia.org/w/index.php?title=%s&variant=zh-tw";

//Test url
if (re1.test(url))
{
  m = re1.exec(url);
  //alert(m);
  location.replace("http://zh.wikipedia.org/w/index.php?title="+ m[1] + "&variant=zh-tw");  
}
else if (re2.test(url))
{
  m = re2.exec(url);
  //alert(m);
  location.replace("http://zh.wikipedia.org/w/index.php?title="+ m[1] + "&variant=zh-tw");
}
