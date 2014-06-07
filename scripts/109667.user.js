// ==UserScript==
// @name Samu Post Blocker
// @namespace http://*.somewhereinblog.net/
// @description Block post(user) on somewhereinblog.net
// @include http://www.somewhereinblog.net/
// ==/UserScript== 

  var divs = document.getElementsByTagName("a");
  var blogs=new Array("abc","def","ghi");
  var d=document.documentElement.innerHTML;
  var l = "http://www.somewhereinblog.net/blog/";
  for(var blg in blogs){
  var lnk=l+blogs[blg]+"/";
        
        for (var i = 40; i < divs.length; ++i) {
        
          if(divs[i].href.substring(0, lnk.length) === lnk){
        
          var start = d.indexOf(divs[i].href,16000)-13;
          i=i+5;
          var last = d.indexOf("></a></p>",start+50);
                    var final = d.substring(0,start);
          final=final+d.substring(last+12);
          
          d=final;
          
        }}}document.documentElement.innerHTML=d;