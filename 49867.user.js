// ==UserScript==
// @name            Trollhammaren
// @author          VaelynPhi
// @namespace       http://vaelynphi.livejournal.com
// @description     Removes unsalient user posts from community and friends-list pages on LiveJournal.
// @include         http://*.livejournal.com*
// @include         http://*.livejournal.com/friends?skip=*
// @exclude         http://googleads.g.doubleclick.net*
// @exclude         http://ad.doubleclick.net*
// @license         Creative Commons Attribution License
// @version	        0.1
// @released        2009-05-17
// @updated         2009-05-17
// @compatible      Greasemonkey
// ==/UserScript==

var rN = [];
var uri = document.URL;

function gBL(){
 var bh = [];
 if(GM_getValue('LJ_BAN_LIST')){
  bh = GM_getValue('LJ_BAN_LIST').split(',');
  if(!bh[0].length){ bh.shift(); }
 }
 return bh;
}

function BanMe(event){
 bh = gBL();
 bh.push(event.target.parentNode.childNodes[0].lastChild.firstChild.firstChild.nodeValue);
 GM_setValue('LJ_BAN_LIST',bh.toString());
 window.history.go(0);
}

function UnBanMe(event){
 bh = gBL();
 var banned = event.target.parentNode.childNodes[0].lastChild.firstChild.firstChild.nodeValue;
 for(var i=0; i<bh.length; i++){
  if(banned==bh[i]){
   bh.splice(i,1);
   GM_setValue('LJ_BAN_LIST',bh.toString());
   window.history.go(0);
  }
 }
}

function th(R){
 for(var j=0; j<R.length; j++){
//  R[j].parentNode.removeChild(R[j]);
  R[j].style.display = 'none';
 }
}

if(uri.match('community')!=null){
 if(uri.match('html')!=null){
  var sp = document.getElementsByTagName('SPAN');
  for(var i=0; i<sp.length; i++){
   if(0<=sp[i].id.search('ljcmt')){
    if(sp[i+1].className =='ljuser'){
     var bh = gBL();
     for(var j=0; j<bh.length; j++){
      if(sp[i+1].lastChild.firstChild.firstChild.nodeValue==bh[j]){
       rN.push(sp[i].previousSibling,sp[i],sp[i].nextSibling);
      }
     }
    }
   }
  }
 }else{
  var bh = gBL();
  var ent = document.getElementsByClassName('entrybox');
  for(var i=0; i<ent.length; i++){
   var ind = ent[i].getElementsByClassName('index');
   for(var k=0; k<bh.length; k++){
    if(ind[1].lastChild.firstChild.nodeValue==bh[k]){
     rN.push(ent[i].parentNode);
    }
   }
  } 
 }
 th(rN);
}else if(uri.match('friends')!=null){
 var ent = document.getElementsByClassName('box');
 for(var i=0; i<ent.length; i++){
  var us = ent[i].getElementsByClassName('ljuser');
  if(us.length){
   var bh = gBL();
   for(var k=0; k<bh.length; k++){
    if(us[0].childNodes[1].firstChild.nodeValue==bh[k]){
     rN.push(ent[i]);
    }
   }
  }
 }
 th(rN);
}else if(uri.match('profile')!=null){
 var isBANNED = false;
 var pro = document.getElementsByClassName('username');
 var user = pro[0].firstChild.lastChild.firstChild.firstChild.nodeValue;
 var bh = gBL();
 for(var i=0; i<bh.length; i++){ if(user==bh[i]){ isBANNED = true; } }
 var link = document.createElement('SPAN');
 if(isBANNED){
  link.appendChild(document.createTextNode(' [UnBan user?]'));
  link.addEventListener('click',UnBanMe,false);
 }else{
  link.appendChild(document.createTextNode(' [Ban user?]'));
  link.addEventListener('click',BanMe,false);
 }
 pro[0].appendChild(link);
}