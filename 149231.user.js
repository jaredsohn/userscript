// ==UserScript==
// @name        forgif.me nsfw bypass
// @namespace   forgif.me
// @description bypass forgif.me nsfw inspired by 9GAG NSFW Viewer by Oliver Huish
// @include     http://forgif.me/*
// @version     0.2
// ==/UserScript==

// Reload all NSFW elements.
function nsfwReload() {
  
  a = document.getElementsByClassName("nsfw-wrapper");
  //alert("found :"+ a.length + "nsfw images");
  for(i=0;i<a.length;i++) {
    dParent = a[i].parentNode
    dataParent = dParent.parentNode;
    //animurl = dataParent.getAttribute("data-animated"); // not avail on the overview page
    
    dataId   = dataParent.getAttribute("data-id");
    if(null!= dataId) {
      //alert ("dataId" +dataId);
      shorturl = dataParent.getAttribute("data-shorturl");
      var subimg = document.createElement("img");
      subimg.setAttribute("alt","Image");
      subimg.setAttribute("src","http://forgif.me/system/image/"+ dataId +"/image.gif");
      var suba = document.createElement("a");
      suba.setAttribute("href",shorturl);
      dParent.removeChild(a[i])
      
      dParent.replaceChild(suba,dParent.firstChild);
      dParent.firstChild.appendChild(subimg,dParent.firstChild);
      //dParent.appendChild(subimg,dParent.firstChild);
    } else  {
      //alert ("dataId" +dataId);
       //dataParent = dParent.parentNode.parentNode;
       dataId   = dataParent.parentNode.getAttribute("data-id");
       shorturl = dataParent.parentNode.getAttribute("data-shorturl");
       //dataParent.parentNode.setAttribute("data-nsfw","false");
       dataParent.parentNode.setAttribute("data-animated","http://forgif.me/system/image/"+ dataId +"/image.gif");
       var subimg = document.createElement("img");
       subimg.setAttribute("alt","Image");
       subimg.setAttribute("src","http://forgif.me/system/image/"+ dataId +"/image.gif");
       dParent.replaceChild(subimg,dParent.firstChild);
       //dParent.firstChild.appendChild(subimg,dParent.firstChild);
    }
    
  }
}

// First run.
nsfwReload();
// Run every couple of seconds.
setInterval(nsfwReload,2000);
