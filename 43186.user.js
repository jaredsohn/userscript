// ==UserScript==
// @name           Undisable
// @namespace      http://userscripts.org/users/82049
// @description    Enable Disabled Fields
// @include        http://www.geradorcpf.com/
// ==/UserScript==

var x,k,f,j;
x=document.forms;
for (k=0;k<x.length;++k){
  f=x[k];
  for(j=0;j<f.length;++j){
    f[j].disabled=false;
    f[j].readOnly=false;
  }
}
