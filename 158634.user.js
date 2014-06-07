// ==UserScript==
// @name        s1 hide dummy div
// @namespace   none
// @include     http://*.saraba1st.com/*
// @include     http://*.sarabalst.com/*
// @include     http://*.stage1st.com/*
// @version     1
// ==/UserScript==

var elm = document.getElementsByTagName("div");
//alert(elm.length);
for(i=0;i<elm.length;i++)
{  
  if (!(elm[i].id).match(/readfloor/i)&&(elm[i].className=="read_t")){
    elm[i].style.display="none";   
    //alert("find one");
  } 
}