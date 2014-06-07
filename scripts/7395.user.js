// ==UserScript==
// @name           Digg addin
// @namespace      8928
// @description    Provides open in new window, and delicious
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==


(function(){

  var duggmirroricon	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB%2FHNKOAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfWBRMAKCQ2oIuYAAAAB3RJTUUH1gUTACoSHi2f8wAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAADBQTFRFAAAAmZmZqKio1tbW2NjY29vb3d3d3t7e4uLi5eXl6enp7e3t9fX19vb2%2Bvr6%2F%2F%2F%2FWS1fFAAAAAF0Uk5TAEDm2GYAAABESURBVHjaY2BQUlJkYGDQ%2F%2F8xAUienpjAIKS%2Fs1CJQU5%2FuqEjg5ygoKAhg2x5iYsjg9Lvle2CDEy%2FZpSKMTD9bA8RAwC9gRArqhXXPwAAAABJRU5ErkJggg%3D%3D';
  var openlinkicon	= 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%03%00%00%00%BA%EC%3F%8F%00%00%00%15PLTEf%99%CC3%99%CC%99%CC%FF%00f%CC%00f%FF%FF%FF%FF%FF%FF%FFD%EA%08%95%00%00%00%07tRNS%FF%FF%FF%FF%FF%FF%00%1AK%03F%00%00%008IDAT%18W%25%CBA%12%00%40%04%03A%22%EB%FFO%DE%C1%1CT%1F%24%9A%BC%05%CAx%B4l%E7%B2%C8%3Ar%F4%94%CB%11%A3%A1B%AE%CE%9E%07%F9%15%E3!%1D%2F%F8%01Y%EC%01%9B%9B%C45f%00%00%00%00IEND%AEB%60%82';

  function fixLink(h3){
  	
    var link	= h3.getElementsByTagName('a')[0];
    var url	= link.href;
    var title	= link.firstChild.nodeValue;
    var entry	= h3.parentNode;
    var notes	= entry.getElementsByTagName('p')[1].firstChild.nodeValue;
    
    var js1	= "javascript:var ";
    var js2	= '=window.open("';
    var js3	= '")';
    
    var vDigg	= 'vDigg'+count;
    var vDeli	= 'vDeli'+count;
    var vDugg	= 'vDugg'+count;
    
    link.style.display='none';
    
    var fDigg	= document.createElement('a');
    var fDeli	= document.createElement('a');
    var fDugg	= document.createElement('a');
    var fReal	= document.createElement('a');
    
    var uDigg	= url

    var uDeli	= 'http://del.icio.us/rashid8928?v=6&noui=no&jump=doclose&url=%URL%&title=%TITLE%&notes=%NOTES%';
    uDeli	= uDeli.replace('%TITLE%',encodeURIComponent(title));
    uDeli	= uDeli.replace('%URL%',encodeURIComponent(url));
    uDeli	= uDeli.replace('%NOTES%',encodeURIComponent(notes));

    var uDugg	= document.getElementById('diggs' + count).href;
    uDugg	= uDugg.replace(/digg\.com/, 'duggmirror.com');
    
    fDigg.href	= js1+vDigg+js2+uDigg+js3;
    fDeli.href	= js1+vDeli+js2+encodeURIComponent(uDeli)+js3;
    fDugg.href	= js1+vDugg+js2+uDugg+js3;
    fReal.href	= url
    
    fDigg.innerHTML = title;
    fDeli.innerHTML = '<img src="http://del.icio.us/favicon.ico">';
    fDugg.innerHTML = '<img src="'+duggmirroricon+'">';
    fReal.innerHTML = '<img src="'+openlinkicon+'">';
    
    fDigg.style.margin='5px';
    fDeli.style.margin='5px';
    fDugg.style.margin='5px';
    fReal.style.margin='5px';
    
    h3.appendChild(fDigg);
    h3.appendChild(fDeli);
    h3.appendChild(fDugg);
    h3.appendChild(fReal);

  }
    var h3 = document.getElementById('title');
    if (h3){
      fixLink(h3);
    }
    else {
      var count = 0;
      while (h3 = document.getElementById('title' + count)){
        fixLink(h3);
        count++;
      }
    }
})();