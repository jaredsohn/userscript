// ==UserScript==
// @name         Linearise cuil.com
// @description  Add a single column layout on the cuil.com search results page, for people like me who like to read linearly
// @namespace    lucideer.com
// @include      http://www.cuil.com/search?*
// ==/UserScript

(function(){
if(!document.getElementById('tbl_1')&&location.href.indexOf('cuil.com/search?')!=-1){ // in case the site implements their own single column layout in future - we don't want to clash
  var tbl_1=document.createElement('div'),
      a_c1=document.createElement('a'),
      resultmap=[0,6,1,7,2,8,3,8,4,11];
  if(!window.opera){id=unsafeWindow.id,E=unsafeWindow.E;}
  tbl_1.setAttribute('id','tbl_1');
  tbl_1.style.display='none';
  a_c1.setAttribute('id','a_c1');
  a_c1.setAttribute('class','ctrl');
  a_c1.setAttribute('href','/search?q=bob%20is%20cuil&pi=0&cols=1&sl=long');
  a_c1.textContent='1 Column';

  function add_linearised_results(){
    var results=document.evaluate('//div[@class="result"]',document,null,7,null);
    id('bdy').insertBefore(tbl_1,id('tbl_2').parentNode);
    var pipe=id('controls').insertBefore(document.createTextNode(' | '),id('a_c2'));
    id('controls').insertBefore(a_c1,pipe);
    a_c1.addEventListener('click',function(eV){
      eV.preventDefault();
      eV.stopPropagation();
      if(!E.hasClassName(this,"sel")){
        E.show(tbl_1);
        G=P=1;
        if(window.opera){Cookie.set("cols",1,60);} // not sure how I'll get this working in Firefox...
        E.addClassName(this,"sel");
        E.removeClassName(id('a_c2'),"sel");
        E.removeClassName(id('a_c3'),"sel");
        }
      },false);
    id('a_c2').addEventListener('click',function(){E.hide(tbl_1);E.removeClassName(id('a_c1'),"sel");},false);
    id('a_c3').addEventListener('click',function(){E.hide(tbl_1);E.removeClassName(id('a_c1'),"sel");},false);
    for(var i=0,ii=resultmap.length;i<ii;++i){
      tbl_1.appendChild(results.snapshotItem(resultmap[i]).cloneNode(true));
      }
    var h=document.evaluate('//head',document,null,9,null).singleNodeValue;
    var s=document.createElement('style');
    s.setAttribute('type','text/css');
    s.appendChild(document.createTextNode('#div_status{padding:5px!important;}#tbl_1 .result_img{margin-top:-30px!important;margin-bottom:0!important;}#tbl_1 .result p,.result h2{margin:0.5em!important;}#tbl_1 .result{margin-bottom:10px!important;}'));
    h.appendChild(s);
    }
  
  // if we're in opera we hijack the pages native scripts to do the work for us
  // (this is obviously a lot quicker)  
  if(window.opera){
    window.addEventListener('DOMContentLoaded',add_linearised_results,null);
    window.opera.defineMagicFunction('assert',function(real){
      if(arguments[3].indexOf('1	column mode')!=-1){E.show(id('tbl_1'));}
      else{return real(arguments.slice(2));}
      });
    }
  else{ // if we're not in opera (i.e. FF), we have to do most of the work ourselves, after page load
    add_linearised_results();
    E.show(id('tbl_1'));
    E.hide(id('tbl_2'));
    E.hide(id('tbl_3'));
    }
  }
})();
