// ==UserScript==
// @name           osakaya
// @namespace      http://d.hatena.ne.jp/t_f_m/
// @include        http://www.osakaya.co.jp/kensaku/KENSAKU2.asp*
// @include        http://www.osakaya.co.jp/kensaku/kensaku2.asp
// ==/UserScript==
(function(){
var t = document.evaluate('//table[@width="95%"]/tbody/tr/td/a[contains(@href,"kensaku3")]',document,null,7,null)
as=[]
for(i=0,l=t.snapshotLength;i<l;i++){
  a=t.snapshotItem(i)
  as.push(a)
}
loadRanking(as)
function loadRanking(as){
  a=as.shift()
  if(a){
    GM_xmlhttpRequest({method:"GET",
                       overrideMimeType:"text/plain; charset=Shift_JIS",
                       url:a.href,
                       onload:function(res){
                         if(rank=res.responseText.match(/<table border=3 .*>.*<td nowrap align=center>(<FONT .*>.*<\/FONT>)<\/td>.*<\/table>/i)){
                           a.parentNode.innerHTML+=("<br />" +RegExp.$1)
                         }
                         loadRanking(as)
                       },
                      })
  } 
}


var boot=function(){
  window.addEventListener('AutoPagerize_DOMNodeInserted', function(evt){
      aaa=document.evaluate('./td/a',evt.target,null,7,null).snapshotItem(0)
      //loadRanking([aaa])
      as.push(aaa)
    })
}
if(window.AutoPagerize){
  boot();
}else{
  window.addEventListener('GM_AutoPagerizeLoaded', boot, false);
}

/*
//table[@width="95%"]/tbody/tr/td/a[contains(@href,"kensaku3")]
//img/following-sibling::table/tbody/tr/td[font/a] for kensaku3
// @include        http://www.osakaya.co.jp/kensaku/kensaku2.asp
*/
})()
