// ==UserScript==
// @name          Quickcamp
// @namespace     http://sebadog.com/quickcamp
// @description	  Organize you projects, Quick!
// @include       http://*.projectpath.com/*
// @include       http://*.updatelog.com/*
// @include       http://*.clientsection.com/*
// @include       http://*.seework.com/*
// @include       http://*.grouphub.com/*
// ==/UserScript==

(function() {
// Constants
var glIsMain=false;
window.addEventListener('keydown', keyHandler, false);

var d=ebi("MainTabs");

if (ebtn(ebtn(d,"li")[0],"a")[0].innerHTML=="Dashboard"){
  var glIsMain=true;
  var e=ebtn(ebtn(d,"li")[0],"a");
  var link=new Array();
  underline(ebtn(ebtn(d,"li")[0],"a")[0],"D");
  underline(ebtn(ebtn(d,"li")[1],"a")[0],"T");
  underline(ebtn(ebtn(d,"li")[2],"a")[0],"i");
  underline(ebtn(ebtn(d,"li")[3],"a")[0],"S");
  underline(ebtn(ebtn(d,"li")[4],"a")[0],"e");
  underline(ebtn(ebtn(d,"li")[5],"a")[0],"A");
  underline(ebtn(ebtn(d,"li")[6],"a")[0],"P");
  mark(ebtn(ebtn(ebi("Header"),"h3")[0],"a")[1],"H");
  
  link[0]=getLink(ebtn(ebtn(d,"li")[0],"a")[0]);
  link[1]=getLink(ebtn(ebtn(d,"li")[1],"a")[0]);
  link[2]=getLink(ebtn(ebtn(d,"li")[2],"a")[0]);
  link[3]=getLink(ebtn(ebtn(d,"li")[3],"a")[0]);
  link[4]=getLink(ebtn(ebtn(d,"li")[4],"a")[0]);
  link[5]=getLink(ebtn(ebtn(d,"li")[5],"a")[0]);
  link[6]=getLink(ebtn(ebtn(d,"li")[6],"a")[0]);
  link[7]=getLink(ebtn(ebtn(ebi("Header"),"h3")[0],"a")[1]);
}else{
  var d=ebi("MainTabs");
  var e=ebtn(ebtn(d,"li")[0],"a");
  var link=new Array();
  mark(ebtn(ebi("floatright"),"a")[0],"g");
  mark(ebtn(ebi("floatright"),"a")[1],"n");
  mark(ebtn(ebi("floatright"),"a")[2],"H");
  nounderline(ebtn(ebi("floatright"),"a")[3])
  mark(ebi("floatright").nextSibling.nextSibling,"D");
  mark(ebi("floatright").nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[1],"C");
  link[0]=getLink(ebtn(ebtn(d,"li")[0],"a")[0]);
  link[1]=getLink(ebtn(ebtn(d,"li")[1],"a")[0]);
  link[2]=getLink(ebtn(ebtn(d,"li")[2],"a")[0]);
  link[3]=getLink(ebtn(ebtn(d,"li")[3],"a")[0]);
  link[4]=getLink(ebtn(ebtn(d,"li")[4],"a")[0]);
  link[5]=getLink(ebtn(ebtn(d,"li")[6],"a")[0]);
  link[6]=getLink(ebtn(ebtn(d,"li")[5],"a")[0]);
  link[7]=getLink(ebtn(ebi("floatright"),"a")[0]);
  link[8]=getLink(ebtn(ebi("floatright"),"a")[1]);
  link[9]=getLink(ebtn(ebi("floatright"),"a")[2]);
  link[10]=getLink(ebi("floatright").nextSibling.nextSibling);
  
  underline(ebtn(ebtn(d,"li")[0],"a")[0],"O");
  underline(ebtn(ebtn(d,"li")[1],"a")[0],"M");
  underline(ebtn(ebtn(d,"li")[2],"a")[0],"T");
  underline(ebtn(ebtn(d,"li")[3],"a")[0],"i");
  underline(ebtn(ebtn(d,"li")[4],"a")[0],"W");
  underline(ebtn(ebtn(d,"li")[5],"a")[0],"S");
  underline(ebtn(ebtn(d,"li")[6],"a")[0],"P");
}

function keyHandler(event) {
    
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if ( event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }
  
  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }
  if (glIsMain){
    if (event.keyCode==68) {
      location.href=link[0];
    }
    if (event.keyCode==84) {
      location.href=link[1];
    }
    if (event.keyCode==73) {
      location.href=link[2];
    }
    if (event.keyCode==83) {
      location.href=link[3];
    }
    if (event.keyCode==69) {
      location.href=link[4];
    }
    if (event.keyCode==65) {
      location.href=link[5];
    }
    if (event.keyCode==80) {
      location.href=link[6];
    }
    if (event.keyCode==72) {
      location.href=link[7];
    }
  
  }else{
    if (event.keyCode==79) {
      location.href=link[0];
    }
    if (event.keyCode==77) {
      location.href=link[1];
    }
    if (event.keyCode==84) {
      location.href=link[2];
    }
    if (event.keyCode==73) {
      location.href=link[3];
    }
    if (event.keyCode==87) {
      location.href=link[4];
    }
    if (event.keyCode==80) {
      location.href=link[5];
    }
    if (event.keyCode==83) {
      location.href=link[6];
    }
    if (event.keyCode==71) {
      location.href=link[7];
    }
    if (event.keyCode==78) {
      location.href=link[8];
    }
    if (event.keyCode==72) {
      location.href=link[9];
    }
    if (event.keyCode==68) {
      location.href=link[10];
    }
    if (event.keyCode==67) {
      ebi("P2P_selector").style.display="inline";
      ebi("P2P_link").style.display="none";
      ebi("projectSelector").focus();
    }
  }
  
  return false;
}


})();
function ebi(pId){
  return document.getElementById(pId);
}
function ebtn(pObj,pTag){
  return pObj.getElementsByTagName(pTag);
}
function underline(pObj,pUnderline) {
  var lText=pObj.innerHTML;
  var n=lText.indexOf(pUnderline);
  lNewText=lText.substring(0,n)+'<span style="text-decoration:underline!important">'+lText.substring(n,n+1)+'</span>'+lText.substring(n+1);
  pObj.innerHTML=lNewText;
}
function getLink(pObj){
  return pObj.href;
}
function mark(pObj,pUnderline) {
  var lText=pObj.innerHTML;
  var n=lText.indexOf(pUnderline);
  lNewText=lText.substring(0,n)+'<span style="background:#04143F!important;text-decoration:underline;">'+lText.substring(n,n+1)+'</span>'+lText.substring(n+1);
  pObj.innerHTML=lNewText;
}
function getLink(pObj){
  return pObj.href;
}
function nounderline(pObj){
  pObj.style.textDecoration="none";
}