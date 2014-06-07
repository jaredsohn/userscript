// ==UserScript==
// @name           Google Image Size
// @namespace      http://ihoss.not-a-blog.com/gm.php
// @description    More image size options on googles webpages
// @include        http://images.google.com/images?*
// ==/UserScript==
var elm = document.getElementsByTagName("select")[0];
var sizes = new Array(["xxlarge","XXLarge"], ["xlarge","XLarge"], ["large","Large"], ["medium","Medium"], ["small","Small"], ["icon","Icon"]);
var l = document.location;
var loc = l.protocol+"//"+l.host+l.pathname+"?";
var search = location.search.substring(1).split("&");
var s = -1;
for(var i=0; i<search.length; i++){
  search[i] = search[i].split("=");
  if(search[i][0] == "imgsz"){
    s = search[i][1];
  }else{
    loc+=search[i][0]+"="+search[i][1]+"&"; 
  }
}
loc+="imgsz=";
elm.innerHTML ='<option value="'+loc+'" ' + (s==-1 ? 'selected="selected"' : '') + '>All image sizes</option>';
for(var i=0; i<sizes.length; i++){
  elm.innerHTML+='<option value="'+loc+sizes[i][0]+(s == sizes[i][0] ? '" selected="selected'+(document.body.childNodes[6].firstChild.firstChild.firstChild.childNodes[1].innerHTML = sizes[i][1]) : '')+'">'+sizes[i][1]+'</option>';
}