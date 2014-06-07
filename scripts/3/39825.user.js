// ==UserScript==
// @name           RMPKillFileXtreme
// @namespace      www.ratemyprofessors.com/jive/vodka
// @description    An ardtard filter, only without the Show/Hide option
// @include        http://www.ratemyprofessors.com/*
// @include        http://ratemyprofessors.com/*
// ==/UserScript==

// ADD YOUR BLACKLIST ENTRIES HERE

var Bans = Array("ardtard", "nincompoop", "doofus_maximus");


var banRegs = Array();
for(var ban in Bans){
  //create a regular expression using the user's name
  var re = new RegExp('posted by\: ' + Bans[ban]);
  banRegs.push(re);
 }

var basicRe = new RegExp('posted by\: ');
var spans = document.getElementsByTagName('span');

for(var span=0; span<spans.length; span++){
  if(spans[span].className=='messageAuthor'){
    var test = spans[span];
    if(test.childNodes[0].nodeValue){
      var block=0;
      var newLink = 0;
      var user='';
      for(var re in banRegs){
   if(test.childNodes[0].nodeValue){
   
     if(test.childNodes[0].nodeValue.match(banRegs[re])){
       while(test && test.nodeName.toUpperCase() != 'TABLE'){
         test = test.parentNode;
       }
       test.style.display='none';
     }else{
       if(test.childNodes[0] && test.childNodes[0].nodeValue){
       
         user = test.childNodes[0].nodeValue.replace(basicRe, '');
       }
     }
   }
      }
    }
  }
 }