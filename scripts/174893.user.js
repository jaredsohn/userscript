// ==UserScript==
// @name       skip adf.ly
// @namespace  http://userscripts.org/scripts/show/174893
// @version    0.1
// @description  skip adf.ly
// @include         http://adf.ly/*
// @include         https://adf.ly/*
// @include         http://j.gs/*
// @include         http://q.gs/*
// @include         http://9.bb/*
// @include         http://u.bb/*
// @copyright  July 2013, Stéphane Ruaud
// ==/UserScript==

unsafeWindow.onunload=function (){};
unsafeWindow.onbeforeunload=function (){};

if (/locked/.test(location.pathname))
{
    window.location.reload();
}

var ysmm=unsafeWindow.ysmm;
unsafeWindow.skip_button_clicked=true;

var D='';
var F='';
for(var q=0;q<ysmm.length;q++){
  if(q%2==0){D+=ysmm.charAt(q);}
  else{F=ysmm.charAt(q)+F;}
}
ysmm=D+F;
ysmm=Base64.decode(ysmm);
ysmm=ysmm.substring(2);

window.location.href=ysmm;
