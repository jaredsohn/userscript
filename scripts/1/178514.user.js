// ==UserScript==
// @name           MustLoadFaster
// @description    Everything must load faster
// @include        *
// @version        0.0.1
// ==/UserScript==
(function(){"use strict";var e=window,t=document,n="div",r="load",i="click",s="submit",o=t.createElement(n),u="style",a="opacity",f="cursor",l="background-color",c="position",h="z-index",p="width",d="height",v="top",m="left",g=0,y="wait",b="#FFF",w="fixed",E=100,S="100%",x="addEventListener",T=.03,N=.75,C;o[u][a]=g;o[u][f]=y;o[u][l]=b;o[u][c]=w;o[u][h]=E;o[u][p]=S;o[u][d]=S;o[u][v]=g;o[u][m]=g;e.raf=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}();C=function(){if(o[u][a]<N){e.raf(C);g=g+T>N?N:g+T;o[u][a]=g}};e[x](r,function(){var e="length",n=0,r="preventDefault",u="returnValue",a=false,f="body",l="getElementsByTagName",c=0,h="appendChild",p="a",d="form",v=t[l](p),m=t[l](d),g=v[e],y=function(e){if(e[r])e[r]();e[u]=a;t[l](f)[c][h](o);C()},b;for(;n<g;n++){v[n][x](i,y)}g=m[e];n=0;for(;n<g;n++){m[n][x](s,y)}})})()