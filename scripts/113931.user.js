// ==UserScript==
// @name           tinami_sort
// @namespace      yktmt.com
// @include        http://www.tinami.com/search/list?*
// ==/UserScript==

(function(){


var enableSort = true;
var delay = 50;

function addStyle(){
   var nStyle = document.createElement('style');
   nStyle.type = 'text/css';
   var cssText = document.createTextNode(
      'span.support_score { background: #5CBCDC; color: #FFFFFF; font-weight: bold; padding: 0 6px; border-radius: 3px; }'
   );
   nStyle.appendChild(cssText);
   document.getElementsByTagName('head').item(0).appendChild(nStyle);
}

addStyle();

function $xa(p,d){
   var e=document.evaluate(p,d,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),r=[];
   for(var i=0,l=e.snapshotLength;i<l;i++){ r[i]=e.snapshotItem(i); }
   return r;
}

function $each(a,f){for(var i=0;i<a.length;i++){f(a[i]);}}

function $eachdelay(a,f){
   var i = 0;
   var tid = setInterval(function(){
      f(a[i++]);
      if(i >= a.length){ clearInterval(tid); }
   },delay);
}

function scoreCount(item){
   if(!item){ return; }
   var sspan = item.getElementsByClassName('support_score');
   if(sspan[0]){
      return parseInt(sspan[0].textContent, 10);
   }else{
      return 0;
   }
}

function tSort(ktar){
   if(!ktar){ return; }
   var tds = $xa('./parent::tr/td',ktar);
   var done = ktar.parentNode.getElementsByClassName('support_score');
   if(tds.length == done.length){
      tds.sort(function(a, b){return scoreCount(b) - scoreCount(a);});
      $each(tds, function(td){td.parentNode.appendChild(td);});
   }
}

function getScore(tar){
   if(!tar){ return; }
   var span = document.createElement("span");
   span.setAttribute('class','support_score');
   var count = 0;
   var a = $xa('.//a',tar);
   if(a.length != 1){ return count; }
   GM_xmlhttpRequest({
      method: 'GET',
      url: a[0].href.replace('view','view/support'),
      onload: function(res) {
         count = parseInt(res.responseText, 10) -1;
         if(isNaN(count) || count < 1){ span.setAttribute('style','display: none;'); }
         var text = document.createTextNode(count);
         span.appendChild(text);
         var p = a[0].getElementsByTagName('p')[0];
         p.appendChild(span);
         if(enableSort){ tSort(tar); }
      },
      onerror: function(){
         span.setAttribute('style','display: none;');
         var text = document.createTextNode('e');
         span.appendChild(text);
         var p = a[0].getElementsByTagName('p')[0];
         p.appendChild(span);
         if(enableSort){ tSort(tar); }
      }
   });
}

function handle(node){
   $eachdelay(
      $xa('.//td[ descendant::a[contains(@href,"view")] ]', node),
      getScore
   )
}

window.addEventListener('load',   function(){ handle(document); }, false);
document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(e){ handle(e.target); }, false);


})();