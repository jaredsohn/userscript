// ==UserScript==
// @name          External Link & Phishing Highlighter
// @namespace     http://lucideer.com/userscripts/
// @description   Highlights external links on any page with a helpful icon so you always know when you're about to leave a page, and have some idea of where you're going.
// @include       *
// @version       2
// @license       http://www.perlfoundation.org/artistic_license_2_0
// ==/UserScript==

(function(){
//begin prefs//
var iconpadding=16; //in px
var mouseovers=true; //on image links. Only works on css bg images sofar
//end prefs//

var a=document.getElementsByTagName("a");
var dp=document.domain.split('.');
var rd=dp[dp.length-2]+'.'+dp[dp.length-1];
for(var i=0,ii=a.length;i<ii;++i){
  if(a[i].href&&(!a[i].href.match(rd+'|@|javascript:|about:|opera:|widget:|resource:|mailto:|file:'))){
    if(document.defaultView.getComputedStyle(a[i],null).getPropertyValue("background-image")=='none'){
      var h=a[i].href.split("/");
      a[i].style.background="url("+h[0]+"//"+h[2]+"/favicon.ico) center left no-repeat";
      a[i].style.paddingLeft=iconpadding+"px";
      }
    else if(mouseovers){
      a[i].addEventListener('mouseover',function(){
        var h=this.href.split("/");
        this.setAttribute('UJS_bgImg',this.style.background);
        this.style.background="url("+h[0]+"//"+h[2]+"/favicon.ico) center left no-repeat";
        },false);
      a[i].addEventListener('mouseout',function(){
        var h=this.href.split("/");
        this.style.background=this.getAttribute('UJS_bgImg');
        this.removeAttribute('UJS_bgImg');
        },false);
      }
    }
  }
})();