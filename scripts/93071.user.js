// ==UserScript==
// @name mobile_YT4greaseKit
// @description makes mobile youtube look like regular youtube for low end macs, like my clammy!
// @include http://m.youtube.com/*
// ==/UserScript==

function escSingle(myString){
  if (myString.indexOf("'")>=0){
    for (s=0;s<myString.length;s++){
      var qPos = myString.indexOf("'",s);
      if (qPos>=0) {
        var before = myString.substr(0,qPos);
        var after = myString.substr(qPos+1);
        myString = before + '&#39;' + after;
        s = qPos +1;
      } else {
        break;
      }
    }
  }  
  return myString;
}

function splitTitle(currTitle){
if (currTitle.length>40){
    var putBR = 0;
    for (tB=0;tB<currTitle.length;tB++){
      var findSpace = currTitle.charAt(tB);
      if (findSpace == ' ' && tB<41){
        putBR = tB;
      }
    }
    if (putBR == 0){
      currTitle = currTitle.substr(0,40) +'-<br>'+ currTitle.substr(41);
    } else {
      currTitle = currTitle.substr(0,putBR) +'<br>'+ currTitle.substr(putBR+1);
    }
  }
return currTitle;
}


function linkCode(vidTitle,vidSrc){
  var linkHTML = '<h2>'+ vidTitle +'</h2><embed name="neoPlay" src="'+ vidSrc +'" height="375px" width="450px" AUTOPLAY="true" volume="110" CONTROLLER="true" type="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" scale="aspect"></embed>';
  return linkHTML;
}

function main(){
var otherDivs = '';
var newDIV;
var firstVid = '';
var firstTitle ='';
var divArr = document.getElementsByTagName('div');
var linkArr = document.getElementsByTagName('a');
var myTable = document.getElementsByTagName('table');
var myTD = document.getElementsByTagName('td');
var myHr = document.getElementsByTagName('hr');
origDIV = divArr[3].innerHTML;

if (location.href.indexOf("watch?")>=0){
  divArr[3].innerHTML ='<div>Videos by <a href="'+linkArr[3].href+'">'+ linkArr[3].innerHTML +'</a></div>';
}
for (t=1;t<myTable.length;t++){
  myTable[t].width="40%";
}
for (t=1;t<myTD.length;t++){
  if(myTD[t].width="125") {
    myTD[t].width="400";
  }
}
for (h=0;h<myHr.length;h++){
  myHr[h].style.width="40%";
}
try {
for (x=0;x<linkArr.length;x++){
  var currLink = linkArr[x].href;
  if (currLink.indexOf('rtsp:')>=0){
    if (firstVid ==''){
      firstVid = linkArr[x].href;
      firstTitle = splitTitle(escSingle(linkArr[x+1].innerHTML));
    }
    var origTitle= escSingle(linkArr[x+1].innerHTML);
    var currTitle= splitTitle(origTitle);
    var newCode = linkCode(currTitle,currLink);
    var newLink = "javascript:document.getElementById('embViewer').innerHTML='"+newCode+"';";
    linkArr[x].href = newLink;
    linkArr[x].innerHTML = '<span style="font-size:12px">'+ origTitle +'</span>'+ linkArr[x].innerHTML;
    linkArr[x+1].innerHTML = 'Related Videos';
  } else if (currLink.indexOf('/watch?')>=0){
    var origTitle= escSingle(linkArr[x+1].innerHTML);

    if (linkArr[x].innerHTML.indexOf('img src=')>=0){
      linkArr[x].innerHTML = '<span style="font-size:12px">'+ origTitle +'</span>'+ linkArr[x].innerHTML;
      linkArr[x+1].innerHTML = 'Videos related to ' + origTitle;
    }
  }
}
} catch(e) {
  //alert('Error: ' + e.message);
}
newDIV = document.createElement('div');
newDIV.id = "embViewer";
newDIV.style.padding = "5px";
newDIV.style.float ="left";
if (firstVid==''){
  newDIV.innerHTML = '<h2>Please select a video link to continue</h2>';
} else {
  newDIV.innerHTML = linkCode(firstTitle,firstVid);

}
divArr[3].appendChild(newDIV);

divArr[3].innerHTML = divArr[3].innerHTML +'<div id="newMenu" style"float:right"></div>';
var myURL = location.href;
if (myURL == 'http://m.youtube.com/'){
  divArr[5].appendChild(divArr[6]);
  divArr[7].innerHTML = '';
  divArr[7].style.clear = "both";
} else {
}
}

if (location.href.indexOf("/watch?")<0 && location.href.indexOf("/results?")<0 && location.href.indexOf("/videos?")<0 && location.href.indexOf("/index?")<0  && location.href.indexOf("/profile?")<0 &&location.href!="http://m.youtube.com/"){
} else {
  main();
}