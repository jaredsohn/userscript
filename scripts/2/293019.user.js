// ==UserScript==
// @name           ISP Ads to remove
// @namespace     ISP Ads to remove
// @description    移除ISP通过iframe进行广告劫持
// @include http://*
// @grant       none
// ==/UserScript==

//document.ready
(function () {
   var ie =!!(window.attachEvent&&!window.opera),wk=/webkit\/(\d+)/i.test(navigator.userAgent)&&(RegExp.$1<525);
   var fn =[],run=function(){for(var i=0;i<fn.length;i++)fn[i]();},d=document;d.ready=function(f){
   if(!ie&&!wk&&d.addEventListener){return d.addEventListener('DOMContentLoaded',f,false);}if(fn.push(f)>1)return;
   if(ie)(function(){try{d.documentElement.doScroll('left');run();}catch(err){setTimeout(arguments.callee,0);}})();
   else if(wk)var t=setInterval(function(){if(/^(loaded|complete)$/.test(d.readyState))clearInterval(t),run();},0);};
})();


document.ready(function(){
    var el = document.querySelector('iframe#i123');
    if(el){
        window.location.reload();
    }
});