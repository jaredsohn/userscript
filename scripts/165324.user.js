// ==UserScript==
// @name           hdcomp
// @namespace      LOL
// @include        http://sicodi.cnh.net.mx/scripts/cgiip.exe/WService=wseem/helpdesk/*
// ==/UserScript==

 var laurl; var delay1;  var currticket;

 laurl=location.href;
 delay1=500+Math.floor(Math.random() * 300);
 setTimeout(AddButton,delay1);


// javascript:{ window.location=union}

function setvarsg(){
  var a; a=laurl.split("cve="); var b;b=a[1].split("-"); var union;
  var num=parseInt(parseInt(b[1])+1);zero=5 - num.toString().length + 1;
  zero2=Array(+(zero > 0 &&   zero)).join("0") + num;
  union=a[0]+"cve="+b[0]+"-"+zero2;
  alert(union);

  currticket = union;

}


function AddButton(){
        setvarsg();

}

