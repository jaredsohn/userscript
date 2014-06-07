// ==UserScript==
// @name           elven blood refresher
// @namespace      http://apps.facebook.com
// @description    refreshes when stamina or life reaches 0
// @include        http://apps.facebook.com/elvenblood/*
// @include        http://apps.new.facebook.com/elvenblood/*
// ==/UserScript==

var stamina = document.evaluate("//*[contains(text(), 'More stamina in')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var life = document.evaluate("//*[contains(text(), 'More life in')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var timeToWaitS = 0;
var timeToWaitL = 0;
var lifeloc = 0;

if (life.snapshotLength != 0){
    lifeloc = life.snapshotItem(0).textContent.indexOf("More life in ");
}

if (stamina.snapshotLength != 0 && life.snapshotLength != 0){
    timeToWaitS = parseInt(stamina.snapshotItem(0).textContent.substring(15,19)) * 1000;
    timeToWaitL = parseInt(life.snapshotItem(0).textContent.substring(lifeloc + 13, lifeloc + 17)) * 1000;
    window.setTimeout(function() { startCountDown() }, 1000);
}

if (stamina.snapshotLength != 0 && life.snapshotLength == 0){
    timeToWaitS = parseInt(stamina.snapshotItem(0).textContent.substring(15,19)) * 1000;
    window.setTimeout(function() { startCountDown() }, 1000);
}

if (stamina.snapshotLength == 0 && life.snapshotLength != 0){
    timeToWaitL = parseInt(life.snapshotItem(0).textContent.substring(lifeloc + 13, lifeloc + 17)) * 1000;
    window.setTimeout(function() { startCountDown() }, 1000);
}

function startCountDown(){
  if (stamina.snapshotLength != 0 && life.snapshotLength == 0){
      stamina.snapshotItem(0).textContent = "More stamina in " + (timeToWaitS / 1000) + " seconds...";
      timeToWaitS = timeToWaitS - 1000;
      if (timeToWaitS > 0){
         window.setTimeout(function() { startCountDown() }, 1000);
      }else{
         window.location.href = window.location.href;
      }
  }  
  
  if (life.snapshotLength != 0 && stamina.snapshotLength == 0){
      life.snapshotItem(0).textContent = "More life in " + (timeToWaitL / 1000) + " seconds...";
      timeToWaitL = timeToWaitL - 1000;
      if (timeToWaitL > 0){
         window.setTimeout(function() { startCountDown() }, 1000);
      }else{
         window.location.href = window.location.href;
      }
  } 
  
  if (life.snapshotLength != 0 && stamina.snapshotLength != 0){
      stamina.snapshotItem(0).textContent = "More stamina in " + (timeToWaitS / 1000) + " seconds... More life in " + (timeToWaitL / 1000) + " seconds...";
      timeToWaitL = timeToWaitL - 1000;
      timeToWaitS = timeToWaitS - 1000;
      if (timeToWaitS > 0 && timeToWaitL > 0){
         window.setTimeout(function() { startCountDown() }, 1000);
      }else{
         window.location.href = window.location.href;
      }
  }
}