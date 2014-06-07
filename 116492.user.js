// ==UserScript==
// @name           Takichi no Mago
// @namespace      http://endflow.net
// @description    Mod for Takichi no Mago.
// @include        http://takichi.mongolian.jp/
// ==/UserScript==

(function(){

var img = $x('id("main_content")/img')[0];
img.removeAttribute('width');
img.removeAttribute('height');
img.setAttribute('alt', '山田 敬一朗');
img.setAttribute('src', 'https://lh6.googleusercontent.com/-8czHg6yV9-E/To5rMoRJDWI/AAAAAAAAAlM/ZI2yjURHkHY/s512/11%2B-%2B1');

var h1 = $x('id("top_title")')[0];
h1.innerHTML = '山田 敬一朗「あの熊がおじいちゃんを殺した」';

var h2 = $x('//h2/a')[0];
h2.innerHTML = '山田敬一朗';

var addr = $x('id("footer")/address')[0];
addr.innerHTML = addr.innerHTML.replace('Takichi', 'Keiichiro');

function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}

})();
