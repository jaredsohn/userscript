// ==UserScript==
// @name         masqIP
// @namespace    masqIP
// @description  Slavehack ip hider
// @include      *
// ==/UserScript==

var listIPs = ['Your IP Here'];
var masqIPs = ['n00bs-this code was stolen from everywhere'];
// your signature up there, but plx dont remove the link ;)
var replaceROWS = "6";
var replaceCOLS = "80";
//
// DO NOT EDIT BELOW //
//
function x2(mW){if(!self.document.getElementsByName(mW)[0])return null;var z=self.document.getElementsByName(mW)[0];if(!z)return null;if(window.getComputedStyle(z,"").getPropertyValue("display")!="none")return z;};function v9(){if(!document.getElementsByTagName)return null;var Gi=document.getElementsByTagName("form");if(!Gi)return null;for(var i=0;i<Gi.length;i++){if((Gi[i].method=="get")||(Gi[i].method=="GET"))continue;if((Gi[i].method=="post")||(Gi[i].method=="POST"))return Gi[i];}};function lz(r){return Math.floor(Math.random()*r);};function pD(Hn,hn,jp){if(!Hn){return;}else{Hn.rows=hn;Hn.cols=jp;}};function Dk(nH,Hn,mR,bP){if((!Hn)||(!nH)){return;}else{var l=Hn.value;Hn.value=Hn.value.replace(mR,bP);if(l!=Hn.value)wJ(nH);}return;};function wJ(nH){if(!nH)return;var m=nH.elements;for(var j=0;j<m.length;j++){var C=m[j];if((C.value.length>1)&&(C.type=="submit")&&((C.value=="edit")||(C.value="submit")||(C.value="Continue"))){nH.submit();return;}}};var oP=listIPs;var mE=masqIPs;var lZ="logedit";var hn=replaceROWS;var jp=replaceCOLS;(function(){var mR="\\b("+oP.join("|")+")\\b";var lB=new RegExp(mR,"gi");var bP=mE[lz(mE.length)];var Hn=x2(lZ);var nH=v9();if((!Hn)||(!nH))return;pD(Hn,hn,jp);Dk(nH,Hn,lB,bP);return;})();