// ==UserScript==
// @name        Gog no rep
// @description Remove reputation
// @include     http://www.gog.com/*
// @version     1
// @grant       none
// ==/UserScript==
var nostars=true;//change to false if you like to leave stars
var novotes=true;//change to false if you want to vote and see "high" and "low" rated posts
+function(){
var xywka = document.getElementsByClassName('xywka');
for (var i=xywka.length-1; i>=0; i--) {
    xywka[i].parentNode.removeChild(xywka[i]); 
  }
if (nostars) { 
var stars = document.getElementsByClassName('t_u_stars_p');
for (var i=stars.length-1; i>=0; i--) {
    stars[i].parentNode.removeChild(stars[i]); 
  }    
 }   
if (novotes) {
var votes = document.getElementsByClassName('rate_this_post_h_EN');
for (var i=votes.length-1; i>=0; i--) {
    votes[i].parentNode.removeChild(votes[i]); 
  }    
var rategreen = document.getElementsByClassName('post_rate_green');
for (var i=rategreen.length-1; i>=0; i--) {
    rategreen[i].parentNode.removeChild(rategreen[i]); 
  }    
var ratered = document.getElementsByClassName('post_rate_red');
for (var i=ratered.length-1; i>=0; i--) {
    ratered[i].parentNode.removeChild(ratered[i]); 
  }   
var replay = document.getElementsByClassName('replay_h_EN');
for (var i=replay.length-1; i>=0; i--) {
    replay[i].style.right="1px"; 
  }        
 }    
}();