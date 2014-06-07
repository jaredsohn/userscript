// ==UserScript== 

// @name            Kijiji Photo Enlarger

// @namespace       http://www.sitepoint.com/userscripts/ 

// @description     Provide larger preview images on mouseover on the kijiji site

// @include         http://pei.kijiji.ca/* 

// @exclude         http://msn.com/* 

// ==/UserScript==
/*
Date: Jan 25, 2013
Beta Only - Still in Testing
Author: Don Bowers
Use: Provide larger preview images on mouseover on the kijiji site
*/

window.onload = function() {
    if (window.location.hostname == "pei.kijiji.ca") {
    
    startForm();
    makeLayer("lr1",500,100,100,100,"white",0,2000);
    }
}

function startForm() {
    var allThumbs = document.getElementsByClassName("thumbnail thumbImg");
    for (i=0;i<allThumbs.length;i++) {
        id = i;
        allThumbs[i].onmouseover = showFull;
        allThumbs[i].onmouseout = hideFull;
    }
}

function showFull() {
    //document.getElementById(this.id).style.visibility = "visible";
    var origSrc = this.src;
    //console.log(origSrc);
    tempSrc = origSrc.substring(0, origSrc.length - 6)
    tempSrc = tempSrc + "20.JPG";
    //this.src = tempSrc;
    document.getElementById("lr1").innerHTML = "<img id='don' src='"+tempSrc+"' />";
    document.getElementById("lr1").style.visibility = "visible";
    document.getElementById("lr1").style.display = "block";
    document.getElementById("don").style.width= "100%";
    document.getElementById("don").style.height= "100%";
}
function hideFull() {

    document.getElementById("lr1").style.visibility = "hidden";
    document.getElementById("lr1").style.display = "none";
}

function makeLayer(id,L,T,W,H,bgColor,visible,zIndex) {
 if (document.getElementById) {
  if (document.getElementById(id)) {
   alert ('Layer with this ID already exists!');
   return;
  }

  var ST= 'position:fixed'
  +'; left:'+L+'px'
  +'; top:'+T+'px'
  +'; display:none'
  +'; border:1px solid #000000'
  //+'; clip:rect(0,'+W+','+H+',0)'
  +'; visibility:'+(null==visible || 1==visible ? 'visible':'hidden')
  +(null==zIndex  ? '' : '; z-index:'+zIndex)
  +(null==bgColor ? '' : '; background-color:'+bgColor)

  var LR= '<div id='+id+' style="'+ST+'">YOU</div>'

  if (document.body) {
   if (document.body.insertAdjacentHTML) document.body.insertAdjacentHTML("afterBegin",LR);
   else
   if (document.createElement && document.body.appendChild) {
    var newNode = document.createElement('div');
    newNode.setAttribute('id',id);
    newNode.setAttribute('style',ST);
    document.body.appendChild(newNode);
   }
  }
 }
 }
