// ==UserScript==
// @name           ftbt
// @namespace      dekosuke
// @include        http://may.2chan.net/40/*
// ==/UserScript==

(function(){
 //bgcolor書きかえ
 document.body.style.backgroundColor = 'white';
 var tds = document.getElementsByTagName("td");
 for(var i in tds)
 {
  //alert(tds[i].style.backgroundColor);
  var style=document.defaultView.getComputedStyle(tds[i],null)
  if(style){
   var bgcolor = style.getPropertyValue("background-color");
   if(bgcolor == 'rgb(240, 224, 214)' ){
    tds[i].style.backgroundColor="white";
   }
  }
  /*
  if(tds[i].bgColor && tds[i].bgColor=='#f0e0d6' ){
    tds[i].bgColor="white";
    tds[i].style.backgroundColor="ivory";
  }
  alert(typeof(tds[i].style.backgroundColor));break;
  */
 }
 //img書きかえ
 var imgs = document.getElementsByTagName('img');
 for(var i in imgs){
  var w = 50;
  if(imgs[i].width>0){
   w = imgs[i].width;
   //alert("w");break;
  }
  var h = 50;
  if(imgs[i].height>0){
   h = imgs[i].height;
  }
  var r = Math.sqrt( 50 * 50 / w / h );
  imgs[i].style.width = w * r;
  imgs[i].style.height = h * r ;
 }
 /*
 //blockquote書きかえ
 var bqs = document.getElementsByTagName('blockquote');
 for(var i in bqs){
   if(bqs[i].style){
     bqs[i].style.fontSize = '80%';
   }
 }
 */
})();


