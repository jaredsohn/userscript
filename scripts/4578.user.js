// ==UserScript==
// @name          Digg link target chooser
// @namespace     http://minwoo.blogsite.org
// @description	  Tweaks links to articles in digg to open in current window; adds an icon next to the link that opens it in a new window.
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

(function(){
  function fixLink(h3){
    var link = h3.getElementsByTagName('a')[0];
    var newLink = document.createElement('a');
    newLink.href = link.href;
    newLink.target = link.target;
    newLink.title = 'Open in new window';
    link.target = '';
    newLink.innerHTML = ' <img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%03%00%00%00%BA%EC%3F%8F%00%00%00%15PLTEf%99%CC3%99%CC%99%CC%FF%00f%CC%00f%FF%FF%FF%FF%FF%FF%FFD%EA%08%95%00%00%00%07tRNS%FF%FF%FF%FF%FF%FF%00%1AK%03F%00%00%008IDAT%18W%25%CBA%12%00%40%04%03A%22%EB%FFO%DE%C1%1CT%1F%24%9A%BC%05%CAx%B4l%E7%B2%C8%3Ar%F4%94%CB%11%A3%A1B%AE%CE%9E%07%F9%15%E3!%1D%2F%F8%01Y%EC%01%9B%9B%C45f%00%00%00%00IEND%AEB%60%82"/>';
    h3.appendChild(newLink);
  }
  
    var h3 = document.getElementById('title');
    if (h3){ // this is a comments page
      fixLink(h3);
    }
    else { // this is a main page
      var count = 0;
      while (h3 = document.getElementById('title' + count)){
        fixLink(h3);
        count++;
      }
    }
})();

