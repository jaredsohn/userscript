// Copyright (C) 2007 by Jens Rieks <studivz -at- jens beim surfen (dot) de>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ==UserScript==
// @name           SVZProfileDiff
// @namespace      http://svzprofilediff.blao.de/
// @version        v1 rev9
// @date           2008-02-25
// @description    StudiVZ+SchuelerVZ: Aenderungen in Profilen anzeigen
// @include        http://www.studivz.net/Profile/*
// @include        http://www.schuelervz.net/Profile/*
// ==/UserScript==
/*
 * jQuery 1.2.3 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-02-17 16:05:55 +0100 (Sun, 17 Feb 2008) $
 * $Rev: 4763 $
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(J(){7(1c.3O)L w=1c.3O;L E=1c.3O=J(a,b){K 1B E.2k.4V(a,b)};7(1c.$)L D=1c.$;1c.$=E;L u=/^[^<]*(<(.|\\s)+>)[^>]*$|^#(\\w+)$/;L G=/^.[^:#\\[\\.]*$/;E.1m=E.2k={4V:J(d,b){d=d||U;7(d.15){6[0]=d;6.M=1;K 6}N 7(1u d=="25"){L c=u.36(d);7(c&&(c[1]||!b)){7(c[1])d=E.4k([c[1]],b);N{L a=U.5M(c[3]);7(a)7(a.2u!=c[3])K E().2i(d);N{6[0]=a;6.M=1;K 6}N d=[]}}N K 1B E(b).2i(d)}N 7(E.1q(d))K 1B E(U)[E.1m.1Z?"1Z":"46"](d);K 6.7a(d.1j==1I&&d||(d.5i||d.M&&d!=1c&&!d.15&&d[0]!=10&&d[0].15)&&E.2J(d)||[d])},5i:"1.2.3",88:J(){K 6.M},M:0,1Y:J(a){K a==10?E.2J(6):6[a]},2K:J(b){L a=E(b);a.55=6;K a},7a:J(a){6.M=0;1I.2k.1i.1h(6,a);K 6},S:J(a,b){K E.S(6,a,b)},4X:J(b){L a=-1;6.S(J(i){7(6==b)a=i});K a},1K:J(c,a,b){L d=c;7(c.1j==4b)7(a==10)K 6.M&&E[b||"1K"](6[0],c)||10;N{d={};d[c]=a}K 6.S(J(i){Q(c 1p d)E.1K(b?6.W:6,c,E.1k(6,d[c],b,i,c))})},1l:J(b,a){7((b==\'28\'||b==\'1T\')&&2B(a)<0)a=10;K 6.1K(b,a,"2w")},1t:J(b){7(1u b!="3X"&&b!=V)K 6.4v().3n((6[0]&&6[0].2r||U).5s(b));L a="";E.S(b||6,J(){E.S(6.3s,J(){7(6.15!=8)a+=6.15!=1?6.6L:E.1m.1t([6])})});K a},5p:J(b){7(6[0])E(b,6[0].2r).5n().3k(6[0]).2d(J(){L a=6;2c(a.1D)a=a.1D;K a}).3n(6);K 6},8w:J(a){K 6.S(J(){E(6).6B().5p(a)})},8p:J(a){K 6.S(J(){E(6).5p(a)})},3n:J(){K 6.3P(19,P,T,J(a){7(6.15==1)6.3j(a)})},6s:J(){K 6.3P(19,P,P,J(a){7(6.15==1)6.3k(a,6.1D)})},6r:J(){K 6.3P(19,T,T,J(a){6.1b.3k(a,6)})},5b:J(){K 6.3P(19,T,P,J(a){6.1b.3k(a,6.2I)})},3g:J(){K 6.55||E([])},2i:J(b){L c=E.2d(6,J(a){K E.2i(b,a)});K 6.2K(/[^+>] [^+>]/.17(b)||b.1f("..")>-1?E.57(c):c)},5n:J(e){L f=6.2d(J(){7(E.14.1e&&!E.3F(6)){L a=6.6d(P),4Z=U.3r("1v");4Z.3j(a);K E.4k([4Z.3t])[0]}N K 6.6d(P)});L d=f.2i("*").4U().S(J(){7(6[F]!=10)6[F]=V});7(e===P)6.2i("*").4U().S(J(i){7(6.15==3)K;L c=E.O(6,"2P");Q(L a 1p c)Q(L b 1p c[a])E.16.1a(d[i],a,c[a][b],c[a][b].O)});K f},1C:J(b){K 6.2K(E.1q(b)&&E.3y(6,J(a,i){K b.1Q(a,i)})||E.3a(b,6))},4O:J(b){7(b.1j==4b)7(G.17(b))K 6.2K(E.3a(b,6,P));N b=E.3a(b,6);L a=b.M&&b[b.M-1]!==10&&!b.15;K 6.1C(J(){K a?E.2S(6,b)<0:6!=b})},1a:J(a){K!a?6:6.2K(E.2Q(6.1Y(),a.1j==4b?E(a).1Y():a.M!=10&&(!a.12||E.12(a,"3f"))?a:[a]))},3v:J(a){K a?E.3a(a,6).M>0:T},7k:J(a){K 6.3v("."+a)},5P:J(b){7(b==10){7(6.M){L c=6[0];7(E.12(c,"2h")){L e=c.3N,5L=[],11=c.11,2X=c.R=="2h-2X";7(e<0)K V;Q(L i=2X?e:0,2e=2X?e+1:11.M;i<2e;i++){L d=11[i];7(d.2o){b=E.14.1e&&!d.9J.1A.9y?d.1t:d.1A;7(2X)K b;5L.1i(b)}}K 5L}N K(6[0].1A||"").1o(/\\r/g,"")}K 10}K 6.S(J(){7(6.15!=1)K;7(b.1j==1I&&/5w|5v/.17(6.R))6.3q=(E.2S(6.1A,b)>=0||E.2S(6.35,b)>=0);N 7(E.12(6,"2h")){L a=b.1j==1I?b:[b];E("97",6).S(J(){6.2o=(E.2S(6.1A,a)>=0||E.2S(6.1t,a)>=0)});7(!a.M)6.3N=-1}N 6.1A=b})},3o:J(a){K a==10?(6.M?6[0].3t:V):6.4v().3n(a)},6O:J(a){K 6.5b(a).1R()},72:J(i){K 6.2M(i,i+1)},2M:J(){K 6.2K(1I.2k.2M.1h(6,19))},2d:J(b){K 6.2K(E.2d(6,J(a,i){K b.1Q(a,i,a)}))},4U:J(){K 6.1a(6.55)},O:J(d,b){L a=d.23(".");a[1]=a[1]?"."+a[1]:"";7(b==V){L c=6.5q("8Q"+a[1]+"!",[a[0]]);7(c==10&&6.M)c=E.O(6[0],d);K c==V&&a[1]?6.O(a[0]):c}N K 6.1M("8M"+a[1]+"!",[a[0],b]).S(J(){E.O(6,d,b)})},2Z:J(a){K 6.S(J(){E.2Z(6,a)})},3P:J(g,f,h,d){L e=6.M>1,3m;K 6.S(J(){7(!3m){3m=E.4k(g,6.2r);7(h)3m.8D()}L b=6;7(f&&E.12(6,"1V")&&E.12(3m[0],"4t"))b=6.3T("1X")[0]||6.3j(6.2r.3r("1X"));L c=E([]);E.S(3m,J(){L a=e?E(6).5n(P)[0]:6;7(E.12(a,"1n")){c=c.1a(a)}N{7(a.15==1)c=c.1a(E("1n",a).1R());d.1Q(b,a)}});c.S(6C)})}};E.2k.4V.2k=E.2k;J 6C(i,a){7(a.3S)E.3R({1d:a.3S,3l:T,1J:"1n"});N E.5h(a.1t||a.6z||a.3t||"");7(a.1b)a.1b.2W(a)}E.1r=E.1m.1r=J(){L b=19[0]||{},i=1,M=19.M,5d=T,11;7(b.1j==8e){5d=b;b=19[1]||{};i=2}7(1u b!="3X"&&1u b!="J")b={};7(M==1){b=6;i=0}Q(;i<M;i++)7((11=19[i])!=V)Q(L a 1p 11){7(b===11[a])6y;7(5d&&11[a]&&1u 11[a]=="3X"&&b[a]&&!11[a].15)b[a]=E.1r(b[a],11[a]);N 7(11[a]!=10)b[a]=11[a]}K b};L F="3O"+(1B 3M()).3L(),6u=0,5c={};L H=/z-?4X|87-?85|1x|6o|81-?1T/i;E.1r({80:J(a){1c.$=D;7(a)1c.3O=w;K E},1q:J(a){K!!a&&1u a!="25"&&!a.12&&a.1j!=1I&&/J/i.17(a+"")},3F:J(a){K a.1H&&!a.1g||a.2a&&a.2r&&!a.2r.1g},5h:J(a){a=E.3e(a);7(a){L b=U.3T("6j")[0]||U.1H,1n=U.3r("1n");1n.R="1t/4j";7(E.14.1e)1n.1t=a;N 1n.3j(U.5s(a));b.3j(1n);b.2W(1n)}},12:J(b,a){K b.12&&b.12.2E()==a.2E()},1S:{},O:J(c,d,b){c=c==1c?5c:c;L a=c[F];7(!a)a=c[F]=++6u;7(d&&!E.1S[a])E.1S[a]={};7(b!=10)E.1S[a][d]=b;K d?E.1S[a][d]:a},2Z:J(c,b){c=c==1c?5c:c;L a=c[F];7(b){7(E.1S[a]){2T E.1S[a][b];b="";Q(b 1p E.1S[a])1O;7(!b)E.2Z(c)}}N{1U{2T c[F]}1P(e){7(c.53)c.53(F)}2T E.1S[a]}},S:J(c,a,b){7(b){7(c.M==10){Q(L d 1p c)7(a.1h(c[d],b)===T)1O}N Q(L i=0,M=c.M;i<M;i++)7(a.1h(c[i],b)===T)1O}N{7(c.M==10){Q(L d 1p c)7(a.1Q(c[d],d,c[d])===T)1O}N Q(L i=0,M=c.M,1A=c[0];i<M&&a.1Q(1A,i,1A)!==T;1A=c[++i]){}}K c},1k:J(b,a,c,i,d){7(E.1q(a))a=a.1Q(b,i);K a&&a.1j==51&&c=="2w"&&!H.17(d)?a+"30":a},1s:{1a:J(c,b){E.S((b||"").23(/\\s+/),J(i,a){7(c.15==1&&!E.1s.3G(c.1s,a))c.1s+=(c.1s?" ":"")+a})},1R:J(c,b){7(c.15==1)c.1s=b!=10?E.3y(c.1s.23(/\\s+/),J(a){K!E.1s.3G(b,a)}).6e(" "):""},3G:J(b,a){K E.2S(a,(b.1s||b).3Y().23(/\\s+/))>-1}},6b:J(b,c,a){L e={};Q(L d 1p c){e[d]=b.W[d];b.W[d]=c[d]}a.1Q(b);Q(L d 1p c)b.W[d]=e[d]},1l:J(d,e,c){7(e=="28"||e=="1T"){L b,41={3Z:"4Y",5y:"24",18:"44"},3c=e=="28"?["7Q","7N"]:["7M","7L"];J 4T(){b=e=="28"?d.7J:d.7I;L a=0,2N=0;E.S(3c,J(){a+=2B(E.2w(d,"7H"+6,P))||0;2N+=2B(E.2w(d,"2N"+6+"60",P))||0});b-=22.7E(a+2N)}7(E(d).3v(":4a"))4T();N E.6b(d,41,4T);K 22.2e(0,b)}K E.2w(d,e,c)},2w:J(e,k,j){L d;J 3x(b){7(!E.14.26)K T;L a=U.49.4K(b,V);K!a||a.4L("3x")==""}7(k=="1x"&&E.14.1e){d=E.1K(e.W,"1x");K d==""?"1":d}7(E.14.2A&&k=="18"){L c=e.W.4N;e.W.4N="0 7s 7q";e.W.4N=c}7(k.1E(/4d/i))k=y;7(!j&&e.W&&e.W[k])d=e.W[k];N 7(U.49&&U.49.4K){7(k.1E(/4d/i))k="4d";k=k.1o(/([A-Z])/g,"-$1").2v();L h=U.49.4K(e,V);7(h&&!3x(e))d=h.4L(k);N{L f=[],2z=[];Q(L a=e;a&&3x(a);a=a.1b)2z.4I(a);Q(L i=0;i<2z.M;i++)7(3x(2z[i])){f[i]=2z[i].W.18;2z[i].W.18="44"}d=k=="18"&&f[2z.M-1]!=V?"2F":(h&&h.4L(k))||"";Q(L i=0;i<f.M;i++)7(f[i]!=V)2z[i].W.18=f[i]}7(k=="1x"&&d=="")d="1"}N 7(e.4l){L g=k.1o(/\\-(\\w)/g,J(a,b){K b.2E()});d=e.4l[k]||e.4l[g];7(!/^\\d+(30)?$/i.17(d)&&/^\\d/.17(d)){L l=e.W.2b,3w=e.3w.2b;e.3w.2b=e.4l.2b;e.W.2b=d||0;d=e.W.7g+"30";e.W.2b=l;e.3w.2b=3w}}K d},4k:J(l,h){L k=[];h=h||U;7(1u h.3r==\'10\')h=h.2r||h[0]&&h[0].2r||U;E.S(l,J(i,d){7(!d)K;7(d.1j==51)d=d.3Y();7(1u d=="25"){d=d.1o(/(<(\\w+)[^>]*?)\\/>/g,J(b,a,c){K c.1E(/^(a9|a7|7e|a6|4B|7b|a1|3u|9W|9U|9S)$/i)?b:a+"></"+c+">"});L f=E.3e(d).2v(),1v=h.3r("1v");L e=!f.1f("<9Q")&&[1,"<2h 76=\'76\'>","</2h>"]||!f.1f("<9M")&&[1,"<75>","</75>"]||f.1E(/^<(9H|1X|9F|9A|9x)/)&&[1,"<1V>","</1V>"]||!f.1f("<4t")&&[2,"<1V><1X>","</1X></1V>"]||(!f.1f("<9w")||!f.1f("<9v"))&&[3,"<1V><1X><4t>","</4t></1X></1V>"]||!f.1f("<7e")&&[2,"<1V><1X></1X><6Y>","</6Y></1V>"]||E.14.1e&&[1,"1v<1v>","</1v>"]||[0,"",""];1v.3t=e[1]+d+e[2];2c(e[0]--)1v=1v.5z;7(E.14.1e){L g=!f.1f("<1V")&&f.1f("<1X")<0?1v.1D&&1v.1D.3s:e[1]=="<1V>"&&f.1f("<1X")<0?1v.3s:[];Q(L j=g.M-1;j>=0;--j)7(E.12(g[j],"1X")&&!g[j].3s.M)g[j].1b.2W(g[j]);7(/^\\s/.17(d))1v.3k(h.5s(d.1E(/^\\s*/)[0]),1v.1D)}d=E.2J(1v.3s)}7(d.M===0&&(!E.12(d,"3f")&&!E.12(d,"2h")))K;7(d[0]==10||E.12(d,"3f")||d.11)k.1i(d);N k=E.2Q(k,d)});K k},1K:J(d,e,c){7(!d||d.15==3||d.15==8)K 10;L f=E.3F(d)?{}:E.41;7(e=="2o"&&E.14.26)d.1b.3N;7(f[e]){7(c!=10)d[f[e]]=c;K d[f[e]]}N 7(E.14.1e&&e=="W")K E.1K(d.W,"9t",c);N 7(c==10&&E.14.1e&&E.12(d,"3f")&&(e=="9q"||e=="9o"))K d.9m(e).6L;N 7(d.2a){7(c!=10){7(e=="R"&&E.12(d,"4B")&&d.1b)6T"R 9i 9h\'t 9g 9d";d.9a(e,""+c)}7(E.14.1e&&/6Q|3S/.17(e)&&!E.3F(d))K d.4w(e,2);K d.4w(e)}N{7(e=="1x"&&E.14.1e){7(c!=10){d.6o=1;d.1C=(d.1C||"").1o(/6P\\([^)]*\\)/,"")+(2B(c).3Y()=="96"?"":"6P(1x="+c*6V+")")}K d.1C&&d.1C.1f("1x=")>=0?(2B(d.1C.1E(/1x=([^)]*)/)[1])/6V).3Y():""}e=e.1o(/-([a-z])/94,J(a,b){K b.2E()});7(c!=10)d[e]=c;K d[e]}},3e:J(a){K(a||"").1o(/^\\s+|\\s+$/g,"")},2J:J(b){L a=[];7(b.1j!=1I)Q(L i=0,M=b.M;i<M;i++)a.1i(b[i]);N a=b.2M(0);K a},2S:J(b,a){Q(L i=0,M=a.M;i<M;i++)7(a[i]==b)K i;K-1},2Q:J(a,b){7(E.14.1e){Q(L i=0;b[i];i++)7(b[i].15!=8)a.1i(b[i])}N Q(L i=0;b[i];i++)a.1i(b[i]);K a},57:J(a){L c=[],2q={};1U{Q(L i=0,M=a.M;i<M;i++){L b=E.O(a[i]);7(!2q[b]){2q[b]=P;c.1i(a[i])}}}1P(e){c=a}K c},3y:J(c,a,d){L b=[];Q(L i=0,M=c.M;i<M;i++)7(!d&&a(c[i],i)||d&&!a(c[i],i))b.1i(c[i]);K b},2d:J(d,a){L c=[];Q(L i=0,M=d.M;i<M;i++){L b=a(d[i],i);7(b!==V&&b!=10){7(b.1j!=1I)b=[b];c=c.6N(b)}}K c}});L v=8Z.8Y.2v();E.14={5m:(v.1E(/.+(?:8W|8U|8T|8S)[\\/: ]([\\d.]+)/)||[])[1],26:/6K/.17(v),2A:/2A/.17(v),1e:/1e/.17(v)&&!/2A/.17(v),3W:/3W/.17(v)&&!/(8O|6K)/.17(v)};L y=E.14.1e?"6I":"78";E.1r({8K:!E.14.1e||U.6H=="6F",41:{"Q":"8I","8F":"1s","4d":y,78:y,6I:y,3t:"3t",1s:"1s",1A:"1A",2U:"2U",3q:"3q",8E:"8C",2o:"2o",8B:"8A",3N:"3N",6E:"6E",2a:"2a",12:"12"}});E.S({6D:J(a){K a.1b},8z:J(a){K E.4s(a,"1b")},8y:J(a){K E.31(a,2,"2I")},8x:J(a){K E.31(a,2,"4r")},8v:J(a){K E.4s(a,"2I")},8u:J(a){K E.4s(a,"4r")},8t:J(a){K E.5j(a.1b.1D,a)},8s:J(a){K E.5j(a.1D)},6B:J(a){K E.12(a,"8r")?a.8q||a.8o.U:E.2J(a.3s)}},J(c,d){E.1m[c]=J(b){L a=E.2d(6,d);7(b&&1u b=="25")a=E.3a(b,a);K 6.2K(E.57(a))}});E.S({6A:"3n",8n:"6s",3k:"6r",8m:"5b",8l:"6O"},J(c,b){E.1m[c]=J(){L a=19;K 6.S(J(){Q(L i=0,M=a.M;i<M;i++)E(a[i])[b](6)})}});E.S({8k:J(a){E.1K(6,a,"");7(6.15==1)6.53(a)},8j:J(a){E.1s.1a(6,a)},8i:J(a){E.1s.1R(6,a)},8h:J(a){E.1s[E.1s.3G(6,a)?"1R":"1a"](6,a)},1R:J(a){7(!a||E.1C(a,[6]).r.M){E("*",6).1a(6).S(J(){E.16.1R(6);E.2Z(6)});7(6.1b)6.1b.2W(6)}},4v:J(){E(">*",6).1R();2c(6.1D)6.2W(6.1D)}},J(a,b){E.1m[a]=J(){K 6.S(b,19)}});E.S(["8g","60"],J(i,c){L b=c.2v();E.1m[b]=J(a){K 6[0]==1c?E.14.2A&&U.1g["5g"+c]||E.14.26&&1c["8f"+c]||U.6H=="6F"&&U.1H["5g"+c]||U.1g["5g"+c]:6[0]==U?22.2e(22.2e(U.1g["5f"+c],U.1H["5f"+c]),22.2e(U.1g["5e"+c],U.1H["5e"+c])):a==10?(6.M?E.1l(6[0],b):V):6.1l(b,a.1j==4b?a:a+"30")}});L C=E.14.26&&4G(E.14.5m)<8d?"(?:[\\\\w*4q-]|\\\\\\\\.)":"(?:[\\\\w\\8c-\\8b*4q-]|\\\\\\\\.)",6x=1B 4p("^>\\\\s*("+C+"+)"),6w=1B 4p("^("+C+"+)(#)("+C+"+)"),6v=1B 4p("^([#.]?)("+C+"*)");E.1r({6t:{"":J(a,i,m){K m[2]=="*"||E.12(a,m[2])},"#":J(a,i,m){K a.4w("2u")==m[2]},":":{8a:J(a,i,m){K i<m[3]-0},89:J(a,i,m){K i>m[3]-0},31:J(a,i,m){K m[3]-0==i},72:J(a,i,m){K m[3]-0==i},3i:J(a,i){K i==0},3J:J(a,i,m,r){K i==r.M-1},6q:J(a,i){K i%2==0},6p:J(a,i){K i%2},"3i-4m":J(a){K a.1b.3T("*")[0]==a},"3J-4m":J(a){K E.31(a.1b.5z,1,"4r")==a},"86-4m":J(a){K!E.31(a.1b.5z,2,"4r")},6D:J(a){K a.1D},4v:J(a){K!a.1D},84:J(a,i,m){K(a.6z||a.83||E(a).1t()||"").1f(m[3])>=0},4a:J(a){K"24"!=a.R&&E.1l(a,"18")!="2F"&&E.1l(a,"5y")!="24"},24:J(a){K"24"==a.R||E.1l(a,"18")=="2F"||E.1l(a,"5y")=="24"},82:J(a){K!a.2U},2U:J(a){K a.2U},3q:J(a){K a.3q},2o:J(a){K a.2o||E.1K(a,"2o")},1t:J(a){K"1t"==a.R},5w:J(a){K"5w"==a.R},5v:J(a){K"5v"==a.R},5a:J(a){K"5a"==a.R},3D:J(a){K"3D"==a.R},59:J(a){K"59"==a.R},6n:J(a){K"6n"==a.R},6m:J(a){K"6m"==a.R},2H:J(a){K"2H"==a.R||E.12(a,"2H")},4B:J(a){K/4B|2h|6l|2H/i.17(a.12)},3G:J(a,i,m){K E.2i(m[3],a).M},7Z:J(a){K/h\\d/i.17(a.12)},7Y:J(a){K E.3y(E.3I,J(b){K a==b.Y}).M}}},6k:[/^(\\[) *@?([\\w-]+) *([!*$^~=]*) *(\'?"?)(.*?)\\4 *\\]/,/^(:)([\\w-]+)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/,1B 4p("^([:.#]*)("+C+"+)")],3a:J(a,c,b){L d,2j=[];2c(a&&a!=d){d=a;L f=E.1C(a,c,b);a=f.t.1o(/^\\s*,\\s*/,"");2j=b?c=f.r:E.2Q(2j,f.r)}K 2j},2i:J(t,p){7(1u t!="25")K[t];7(p&&p.15!=1&&p.15!=9)K[];p=p||U;L d=[p],2q=[],3J,12;2c(t&&3J!=t){L r=[];3J=t;t=E.3e(t);L o=T;L g=6x;L m=g.36(t);7(m){12=m[1].2E();Q(L i=0;d[i];i++)Q(L c=d[i].1D;c;c=c.2I)7(c.15==1&&(12=="*"||c.12.2E()==12))r.1i(c);d=r;t=t.1o(g,"");7(t.1f(" ")==0)6y;o=P}N{g=/^([>+~])\\s*(\\w*)/i;7((m=g.36(t))!=V){r=[];L l={};12=m[2].2E();m=m[1];Q(L j=0,3d=d.M;j<3d;j++){L n=m=="~"||m=="+"?d[j].2I:d[j].1D;Q(;n;n=n.2I)7(n.15==1){L h=E.O(n);7(m=="~"&&l[h])1O;7(!12||n.12.2E()==12){7(m=="~")l[h]=P;r.1i(n)}7(m=="+")1O}}d=r;t=E.3e(t.1o(g,""));o=P}}7(t&&!o){7(!t.1f(",")){7(p==d[0])d.4i();2q=E.2Q(2q,d);r=d=[p];t=" "+t.6i(1,t.M)}N{L k=6w;L m=k.36(t);7(m){m=[0,m[2],m[3],m[1]]}N{k=6v;m=k.36(t)}m[2]=m[2].1o(/\\\\/g,"");L f=d[d.M-1];7(m[1]=="#"&&f&&f.5M&&!E.3F(f)){L q=f.5M(m[2]);7((E.14.1e||E.14.2A)&&q&&1u q.2u=="25"&&q.2u!=m[2])q=E(\'[@2u="\'+m[2]+\'"]\',f)[0];d=r=q&&(!m[3]||E.12(q,m[3]))?[q]:[]}N{Q(L i=0;d[i];i++){L a=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];7(a=="*"&&d[i].12.2v()=="3X")a="3u";r=E.2Q(r,d[i].3T(a))}7(m[1]==".")r=E.56(r,m[2]);7(m[1]=="#"){L e=[];Q(L i=0;r[i];i++)7(r[i].4w("2u")==m[2]){e=[r[i]];1O}r=e}d=r}t=t.1o(k,"")}}7(t){L b=E.1C(t,r);d=r=b.r;t=E.3e(b.t)}}7(t)d=[];7(d&&p==d[0])d.4i();2q=E.2Q(2q,d);K 2q},56:J(r,m,a){m=" "+m+" ";L c=[];Q(L i=0;r[i];i++){L b=(" "+r[i].1s+" ").1f(m)>=0;7(!a&&b||a&&!b)c.1i(r[i])}K c},1C:J(t,r,h){L d;2c(t&&t!=d){d=t;L p=E.6k,m;Q(L i=0;p[i];i++){m=p[i].36(t);7(m){t=t.7X(m[0].M);m[2]=m[2].1o(/\\\\/g,"");1O}}7(!m)1O;7(m[1]==":"&&m[2]=="4O")r=G.17(m[3])?E.1C(m[3],r,P).r:E(r).4O(m[3]);N 7(m[1]==".")r=E.56(r,m[2],h);N 7(m[1]=="["){L g=[],R=m[3];Q(L i=0,3d=r.M;i<3d;i++){L a=r[i],z=a[E.41[m[2]]||m[2]];7(z==V||/6Q|3S|2o/.17(m[2]))z=E.1K(a,m[2])||\'\';7((R==""&&!!z||R=="="&&z==m[5]||R=="!="&&z!=m[5]||R=="^="&&z&&!z.1f(m[5])||R=="$="&&z.6i(z.M-m[5].M)==m[5]||(R=="*="||R=="~=")&&z.1f(m[5])>=0)^h)g.1i(a)}r=g}N 7(m[1]==":"&&m[2]=="31-4m"){L e={},g=[],17=/(-?)(\\d*)n((?:\\+|-)?\\d*)/.36(m[3]=="6q"&&"2n"||m[3]=="6p"&&"2n+1"||!/\\D/.17(m[3])&&"7W+"+m[3]||m[3]),3i=(17[1]+(17[2]||1))-0,d=17[3]-0;Q(L i=0,3d=r.M;i<3d;i++){L j=r[i],1b=j.1b,2u=E.O(1b);7(!e[2u]){L c=1;Q(L n=1b.1D;n;n=n.2I)7(n.15==1)n.4h=c++;e[2u]=P}L b=T;7(3i==0){7(j.4h==d)b=P}N 7((j.4h-d)%3i==0&&(j.4h-d)/3i>=0)b=P;7(b^h)g.1i(j)}r=g}N{L f=E.6t[m[1]];7(1u f=="3X")f=f[m[2]];7(1u f=="25")f=6g("T||J(a,i){K "+f+";}");r=E.3y(r,J(a,i){K f(a,i,m,r)},h)}}K{r:r,t:t}},4s:J(b,c){L d=[];L a=b[c];2c(a&&a!=U){7(a.15==1)d.1i(a);a=a[c]}K d},31:J(a,e,c,b){e=e||1;L d=0;Q(;a;a=a[c])7(a.15==1&&++d==e)1O;K a},5j:J(n,a){L r=[];Q(;n;n=n.2I){7(n.15==1&&(!a||n!=a))r.1i(n)}K r}});E.16={1a:J(f,i,g,e){7(f.15==3||f.15==8)K;7(E.14.1e&&f.54!=10)f=1c;7(!g.2G)g.2G=6.2G++;7(e!=10){L h=g;g=J(){K h.1h(6,19)};g.O=e;g.2G=h.2G}L j=E.O(f,"2P")||E.O(f,"2P",{}),1w=E.O(f,"1w")||E.O(f,"1w",J(){L a;7(1u E=="10"||E.16.52)K a;a=E.16.1w.1h(19.3Q.Y,19);K a});1w.Y=f;E.S(i.23(/\\s+/),J(c,b){L a=b.23(".");b=a[0];g.R=a[1];L d=j[b];7(!d){d=j[b]={};7(!E.16.2l[b]||E.16.2l[b].4g.1Q(f)===T){7(f.3H)f.3H(b,1w,T);N 7(f.6f)f.6f("4f"+b,1w)}}d[g.2G]=g;E.16.27[b]=P});f=V},2G:1,27:{},1R:J(e,h,f){7(e.15==3||e.15==8)K;L i=E.O(e,"2P"),29,4X;7(i){7(h==10||(1u h=="25"&&h.7V(0)=="."))Q(L g 1p i)6.1R(e,g+(h||""));N{7(h.R){f=h.2m;h=h.R}E.S(h.23(/\\s+/),J(b,a){L c=a.23(".");a=c[0];7(i[a]){7(f)2T i[a][f.2G];N Q(f 1p i[a])7(!c[1]||i[a][f].R==c[1])2T i[a][f];Q(29 1p i[a])1O;7(!29){7(!E.16.2l[a]||E.16.2l[a].4e.1Q(e)===T){7(e.6c)e.6c(a,E.O(e,"1w"),T);N 7(e.6a)e.6a("4f"+a,E.O(e,"1w"))}29=V;2T i[a]}}})}Q(29 1p i)1O;7(!29){L d=E.O(e,"1w");7(d)d.Y=V;E.2Z(e,"2P");E.2Z(e,"1w")}}},1M:J(g,c,d,f,h){c=E.2J(c||[]);7(g.1f("!")>=0){g=g.2M(0,-1);L a=P}7(!d){7(6.27[g])E("*").1a([1c,U]).1M(g,c)}N{7(d.15==3||d.15==8)K 10;L b,29,1m=E.1q(d[g]||V),16=!c[0]||!c[0].2R;7(16)c.4I(6.50({R:g,2D:d}));c[0].R=g;7(a)c[0].69=P;7(E.1q(E.O(d,"1w")))b=E.O(d,"1w").1h(d,c);7(!1m&&d["4f"+g]&&d["4f"+g].1h(d,c)===T)b=T;7(16)c.4i();7(h&&E.1q(h)){29=h.1h(d,b==V?c:c.6N(b));7(29!==10)b=29}7(1m&&f!==T&&b!==T&&!(E.12(d,\'a\')&&g=="5t")){6.52=P;1U{d[g]()}1P(e){}}6.52=T}K b},1w:J(c){L a;c=E.16.50(c||1c.16||{});7(!c.R)c.R="";L b=c.R.23(".");c.R=b[0];L f=E.O(6,"2P")&&E.O(6,"2P")[c.R],3E=1I.2k.2M.1Q(19,1);3E.4I(c);Q(L j 1p f){L d=f[j];3E[0].2m=d;3E[0].O=d.O;7(!b[1]&&!c.69||d.R==b[1]){L e=d.1h(6,3E);7(a!==T)a=e;7(e===T){c.2R();c.45()}}}7(E.14.1e)c.2D=c.2R=c.45=c.2m=c.O=V;K a},50:J(c){L a=c;c=E.1r({},a);c.2R=J(){7(a.2R)a.2R();a.7U=T};c.45=J(){7(a.45)a.45();a.7T=P};7(!c.2D)c.2D=c.7S||U;7(c.2D.15==3)c.2D=a.2D.1b;7(!c.4W&&c.5x)c.4W=c.5x==c.2D?c.7R:c.5x;7(c.67==V&&c.66!=V){L b=U.1H,1g=U.1g;c.67=c.66+(b&&b.2y||1g&&1g.2y||0)-(b.65||0);c.7P=c.7O+(b&&b.2t||1g&&1g.2t||0)-(b.64||0)}7(!c.3c&&((c.4D||c.4D===0)?c.4D:c.63))c.3c=c.4D||c.63;7(!c.62&&c.61)c.62=c.61;7(!c.3c&&c.2H)c.3c=(c.2H&1?1:(c.2H&2?3:(c.2H&4?2:0)));K c},2l:{1Z:{4g:J(){4S();K},4e:J(){K}},48:{4g:J(){7(E.14.1e)K T;E(6).2x("4R",E.16.2l.48.2m);K P},4e:J(){7(E.14.1e)K T;E(6).3C("4R",E.16.2l.48.2m);K P},2m:J(a){7(I(a,6))K P;19[0].R="48";K E.16.1w.1h(6,19)}},3B:{4g:J(){7(E.14.1e)K T;E(6).2x("4Q",E.16.2l.3B.2m);K P},4e:J(){7(E.14.1e)K T;E(6).3C("4Q",E.16.2l.3B.2m);K P},2m:J(a){7(I(a,6))K P;19[0].R="3B";K E.16.1w.1h(6,19)}}}};E.1m.1r({2x:J(c,a,b){K c=="4P"?6.2X(c,a,b):6.S(J(){E.16.1a(6,c,b||a,b&&a)})},2X:J(d,b,c){K 6.S(J(){E.16.1a(6,d,J(a){E(6).3C(a);K(c||b).1h(6,19)},c&&b)})},3C:J(a,b){K 6.S(J(){E.16.1R(6,a,b)})},1M:J(c,a,b){K 6.S(J(){E.16.1M(c,a,6,P,b)})},5q:J(c,a,b){7(6[0])K E.16.1M(c,a,6[0],T,b);K 10},2g:J(){L b=19;K 6.5t(J(a){6.4H=0==6.4H?1:0;a.2R();K b[6.4H].1h(6,19)||T})},7F:J(a,b){K 6.2x(\'48\',a).2x(\'3B\',b)},1Z:J(a){4S();7(E.2O)a.1Q(U,E);N E.3A.1i(J(){K a.1Q(6,E)});K 6}});E.1r({2O:T,3A:[],1Z:J(){7(!E.2O){E.2O=P;7(E.3A){E.S(E.3A,J(){6.1h(U)});E.3A=V}E(U).5q("1Z")}}});L x=T;J 4S(){7(x)K;x=P;7(U.3H&&!E.14.2A)U.3H("5Z",E.1Z,T);7(E.14.1e&&1c==38)(J(){7(E.2O)K;1U{U.1H.7D("2b")}1P(39){3z(19.3Q,0);K}E.1Z()})();7(E.14.2A)U.3H("5Z",J(){7(E.2O)K;Q(L i=0;i<U.4M.M;i++)7(U.4M[i].2U){3z(19.3Q,0);K}E.1Z()},T);7(E.14.26){L a;(J(){7(E.2O)K;7(U.3b!="5Y"&&U.3b!="1z"){3z(19.3Q,0);K}7(a===10)a=E("W, 7b[7C=7B]").M;7(U.4M.M!=a){3z(19.3Q,0);K}E.1Z()})()}E.16.1a(1c,"46",E.1Z)}E.S(("7A,7z,46,7y,5f,4P,5t,7x,"+"7w,7G,7v,4R,4Q,7u,2h,"+"59,7t,7K,7r,39").23(","),J(i,b){E.1m[b]=J(a){K a?6.2x(b,a):6.1M(b)}});L I=J(a,c){L b=a.4W;2c(b&&b!=c)1U{b=b.1b}1P(39){b=c}K b==c};E(1c).2x("4P",J(){E("*").1a(U).3C()});E.1m.1r({46:J(g,d,c){7(E.1q(g))K 6.2x("46",g);L e=g.1f(" ");7(e>=0){L i=g.2M(e,g.M);g=g.2M(0,e)}c=c||J(){};L f="4J";7(d)7(E.1q(d)){c=d;d=V}N{d=E.3u(d);f="5X"}L h=6;E.3R({1d:g,R:f,1J:"3o",O:d,1z:J(a,b){7(b=="1W"||b=="5W")h.3o(i?E("<1v/>").3n(a.4c.1o(/<1n(.|\\s)*?\\/1n>/g,"")).2i(i):a.4c);h.S(c,[a.4c,b,a])}});K 6},7p:J(){K E.3u(6.5V())},5V:J(){K 6.2d(J(){K E.12(6,"3f")?E.2J(6.7o):6}).1C(J(){K 6.35&&!6.2U&&(6.3q||/2h|6l/i.17(6.12)||/1t|24|3D/i.17(6.R))}).2d(J(i,c){L b=E(6).5P();K b==V?V:b.1j==1I?E.2d(b,J(a,i){K{35:c.35,1A:a}}):{35:c.35,1A:b}}).1Y()}});E.S("5U,5T,68,5S,6h,5R".23(","),J(i,o){E.1m[o]=J(f){K 6.2x(o,f)}});L B=(1B 3M).3L();E.1r({1Y:J(d,b,a,c){7(E.1q(b)){a=b;b=V}K E.3R({R:"4J",1d:d,O:b,1W:a,1J:c})},7n:J(b,a){K E.1Y(b,V,a,"1n")},7m:J(c,b,a){K E.1Y(c,b,a,"3h")},7l:J(d,b,a,c){7(E.1q(b)){a=b;b={}}K E.3R({R:"5X",1d:d,O:b,1W:a,1J:c})},7j:J(a){E.1r(E.58,a)},58:{27:P,R:"4J",2V:0,5Q:"4n/x-7i-3f-7h",5O:P,3l:P,O:V,5N:V,3D:V,4o:{3K:"4n/3K, 1t/3K",3o:"1t/3o",1n:"1t/4j, 4n/4j",3h:"4n/3h, 1t/4j",1t:"1t/7f",4F:"*/*"}},4E:{},3R:J(s){L f,37=/=\\?(&|$)/g,1y,O;s=E.1r(P,s,E.1r(P,{},E.58,s));7(s.O&&s.5O&&1u s.O!="25")s.O=E.3u(s.O);7(s.1J=="4C"){7(s.R.2v()=="1Y"){7(!s.1d.1E(37))s.1d+=(s.1d.1E(/\\?/)?"&":"?")+(s.4C||"7d")+"=?"}N 7(!s.O||!s.O.1E(37))s.O=(s.O?s.O+"&":"")+(s.4C||"7d")+"=?";s.1J="3h"}7(s.1J=="3h"&&(s.O&&s.O.1E(37)||s.1d.1E(37))){f="4C"+B++;7(s.O)s.O=(s.O+"").1o(37,"="+f+"$1");s.1d=s.1d.1o(37,"="+f+"$1");s.1J="1n";1c[f]=J(a){O=a;1W();1z();1c[f]=10;1U{2T 1c[f]}1P(e){}7(h)h.2W(g)}}7(s.1J=="1n"&&s.1S==V)s.1S=T;7(s.1S===T&&s.R.2v()=="1Y"){L i=(1B 3M()).3L();L j=s.1d.1o(/(\\?|&)4q=.*?(&|$)/,"$a5="+i+"$2");s.1d=j+((j==s.1d)?(s.1d.1E(/\\?/)?"&":"?")+"4q="+i:"")}7(s.O&&s.R.2v()=="1Y"){s.1d+=(s.1d.1E(/\\?/)?"&":"?")+s.O;s.O=V}7(s.27&&!E.5K++)E.16.1M("5U");7((!s.1d.1f("a4")||!s.1d.1f("//"))&&s.1J=="1n"&&s.R.2v()=="1Y"){L h=U.3T("6j")[0];L g=U.3r("1n");g.3S=s.1d;7(s.7c)g.a3=s.7c;7(!f){L l=T;g.a2=g.9Z=J(){7(!l&&(!6.3b||6.3b=="5Y"||6.3b=="1z")){l=P;1W();1z();h.2W(g)}}}h.3j(g);K 10}L m=T;L k=1c.79?1B 79("9Y.9X"):1B 77();k.9V(s.R,s.1d,s.3l,s.5N,s.3D);1U{7(s.O)k.4A("9T-9R",s.5Q);7(s.5G)k.4A("9P-5F-9O",E.4E[s.1d]||"9N, 9L 9K 9I 5k:5k:5k 9G");k.4A("X-9C-9B","77");k.4A("9z",s.1J&&s.4o[s.1J]?s.4o[s.1J]+", */*":s.4o.4F)}1P(e){}7(s.73)s.73(k);7(s.27)E.16.1M("5R",[k,s]);L c=J(a){7(!m&&k&&(k.3b==4||a=="2V")){m=P;7(d){71(d);d=V}1y=a=="2V"&&"2V"||!E.70(k)&&"39"||s.5G&&E.6Z(k,s.1d)&&"5W"||"1W";7(1y=="1W"){1U{O=E.6J(k,s.1J)}1P(e){1y="5B"}}7(1y=="1W"){L b;1U{b=k.5o("6X-5F")}1P(e){}7(s.5G&&b)E.4E[s.1d]=b;7(!f)1W()}N E.5r(s,k,1y);1z();7(s.3l)k=V}};7(s.3l){L d=54(c,13);7(s.2V>0)3z(J(){7(k){k.9u();7(!m)c("2V")}},s.2V)}1U{k.9s(s.O)}1P(e){E.5r(s,k,V,e)}7(!s.3l)c();J 1W(){7(s.1W)s.1W(O,1y);7(s.27)E.16.1M("6h",[k,s])}J 1z(){7(s.1z)s.1z(k,1y);7(s.27)E.16.1M("68",[k,s]);7(s.27&&!--E.5K)E.16.1M("5T")}K k},5r:J(s,a,b,e){7(s.39)s.39(a,b,e);7(s.27)E.16.1M("5S",[a,s,e])},5K:0,70:J(r){1U{K!r.1y&&9r.9p=="5a:"||(r.1y>=6W&&r.1y<9n)||r.1y==6U||r.1y==9l||E.14.26&&r.1y==10}1P(e){}K T},6Z:J(a,c){1U{L b=a.5o("6X-5F");K a.1y==6U||b==E.4E[c]||E.14.26&&a.1y==10}1P(e){}K T},6J:J(r,b){L c=r.5o("9k-R");L d=b=="3K"||!b&&c&&c.1f("3K")>=0;L a=d?r.9j:r.4c;7(d&&a.1H.2a=="5B")6T"5B";7(b=="1n")E.5h(a);7(b=="3h")a=6g("("+a+")");K a},3u:J(a){L s=[];7(a.1j==1I||a.5i)E.S(a,J(){s.1i(3p(6.35)+"="+3p(6.1A))});N Q(L j 1p a)7(a[j]&&a[j].1j==1I)E.S(a[j],J(){s.1i(3p(j)+"="+3p(6))});N s.1i(3p(j)+"="+3p(a[j]));K s.6e("&").1o(/%20/g,"+")}});E.1m.1r({1G:J(c,b){K c?6.2f({1T:"1G",28:"1G",1x:"1G"},c,b):6.1C(":24").S(J(){6.W.18=6.5u||"";7(E.1l(6,"18")=="2F"){L a=E("<"+6.2a+" />").6A("1g");6.W.18=a.1l("18");7(6.W.18=="2F")6.W.18="44";a.1R()}}).3g()},1F:J(b,a){K b?6.2f({1T:"1F",28:"1F",1x:"1F"},b,a):6.1C(":4a").S(J(){6.5u=6.5u||E.1l(6,"18");6.W.18="2F"}).3g()},6S:E.1m.2g,2g:J(a,b){K E.1q(a)&&E.1q(b)?6.6S(a,b):a?6.2f({1T:"2g",28:"2g",1x:"2g"},a,b):6.S(J(){E(6)[E(6).3v(":24")?"1G":"1F"]()})},9f:J(b,a){K 6.2f({1T:"1G"},b,a)},9e:J(b,a){K 6.2f({1T:"1F"},b,a)},9c:J(b,a){K 6.2f({1T:"2g"},b,a)},9b:J(b,a){K 6.2f({1x:"1G"},b,a)},99:J(b,a){K 6.2f({1x:"1F"},b,a)},98:J(c,a,b){K 6.2f({1x:a},c,b)},2f:J(l,k,j,h){L i=E.6R(k,j,h);K 6[i.34===T?"S":"34"](J(){7(6.15!=1)K T;L g=E.1r({},i);L f=E(6).3v(":24"),4x=6;Q(L p 1p l){7(l[p]=="1F"&&f||l[p]=="1G"&&!f)K E.1q(g.1z)&&g.1z.1h(6);7(p=="1T"||p=="28"){g.18=E.1l(6,"18");g.33=6.W.33}}7(g.33!=V)6.W.33="24";g.42=E.1r({},l);E.S(l,J(c,a){L e=1B E.2s(4x,g,c);7(/2g|1G|1F/.17(a))e[a=="2g"?f?"1G":"1F":a](l);N{L b=a.3Y().1E(/^([+-]=)?([\\d+-.]+)(.*)$/),21=e.2j(P)||0;7(b){L d=2B(b[2]),2C=b[3]||"30";7(2C!="30"){4x.W[c]=(d||1)+2C;21=((d||1)/e.2j(P))*21;4x.W[c]=21+2C}7(b[1])d=((b[1]=="-="?-1:1)*d)+21;e.43(21,d,2C)}N e.43(21,a,"")}});K P})},34:J(a,b){7(E.1q(a)||(a&&a.1j==1I)){b=a;a="2s"}7(!a||(1u a=="25"&&!b))K A(6[0],a);K 6.S(J(){7(b.1j==1I)A(6,a,b);N{A(6,a).1i(b);7(A(6,a).M==1)b.1h(6)}})},95:J(b,c){L a=E.3I;7(b)6.34([]);6.S(J(){Q(L i=a.M-1;i>=0;i--)7(a[i].Y==6){7(c)a[i](P);a.74(i,1)}});7(!c)6.5A();K 6}});L A=J(b,c,a){7(!b)K 10;c=c||"2s";L q=E.O(b,c+"34");7(!q||a)q=E.O(b,c+"34",a?E.2J(a):[]);K q};E.1m.5A=J(a){a=a||"2s";K 6.S(J(){L q=A(6,a);q.4i();7(q.M)q[0].1h(6)})};E.1r({6R:J(b,a,c){L d=b&&b.1j==93?b:{1z:c||!c&&a||E.1q(b)&&b,2p:b,40:c&&a||a&&a.1j!=92&&a};d.2p=(d.2p&&d.2p.1j==51?d.2p:{91:90,9D:6W}[d.2p])||9E;d.5l=d.1z;d.1z=J(){7(d.34!==T)E(6).5A();7(E.1q(d.5l))d.5l.1h(6)};K d},40:{6M:J(p,n,b,a){K b+a*p},5C:J(p,n,b,a){K((-22.8X(p*22.8V)/2)+0.5)*a+b}},3I:[],47:V,2s:J(b,c,a){6.11=c;6.Y=b;6.1k=a;7(!c.3V)c.3V={}}});E.2s.2k={4u:J(){7(6.11.32)6.11.32.1h(6.Y,[6.2L,6]);(E.2s.32[6.1k]||E.2s.32.4F)(6);7(6.1k=="1T"||6.1k=="28")6.Y.W.18="44"},2j:J(a){7(6.Y[6.1k]!=V&&6.Y.W[6.1k]==V)K 6.Y[6.1k];L r=2B(E.1l(6.Y,6.1k,a));K r&&r>-8R?r:2B(E.2w(6.Y,6.1k))||0},43:J(c,b,d){6.5D=(1B 3M()).3L();6.21=c;6.3g=b;6.2C=d||6.2C||"30";6.2L=6.21;6.4z=6.4y=0;6.4u();L e=6;J t(a){K e.32(a)}t.Y=6.Y;E.3I.1i(t);7(E.47==V){E.47=54(J(){L a=E.3I;Q(L i=0;i<a.M;i++)7(!a[i]())a.74(i--,1);7(!a.M){71(E.47);E.47=V}},13)}},1G:J(){6.11.3V[6.1k]=E.1K(6.Y.W,6.1k);6.11.1G=P;6.43(0,6.2j());7(6.1k=="28"||6.1k=="1T")6.Y.W[6.1k]="8P";E(6.Y).1G()},1F:J(){6.11.3V[6.1k]=E.1K(6.Y.W,6.1k);6.11.1F=P;6.43(6.2j(),0)},32:J(a){L t=(1B 3M()).3L();7(a||t>6.11.2p+6.5D){6.2L=6.3g;6.4z=6.4y=1;6.4u();6.11.42[6.1k]=P;L b=P;Q(L i 1p 6.11.42)7(6.11.42[i]!==P)b=T;7(b){7(6.11.18!=V){6.Y.W.33=6.11.33;6.Y.W.18=6.11.18;7(E.1l(6.Y,"18")=="2F")6.Y.W.18="44"}7(6.11.1F)6.Y.W.18="2F";7(6.11.1F||6.11.1G)Q(L p 1p 6.11.42)E.1K(6.Y.W,p,6.11.3V[p])}7(b&&E.1q(6.11.1z))6.11.1z.1h(6.Y);K T}N{L n=t-6.5D;6.4y=n/6.11.2p;6.4z=E.40[6.11.40||(E.40.5C?"5C":"6M")](6.4y,n,0,1,6.11.2p);6.2L=6.21+((6.3g-6.21)*6.4z);6.4u()}K P}};E.2s.32={2y:J(a){a.Y.2y=a.2L},2t:J(a){a.Y.2t=a.2L},1x:J(a){E.1K(a.Y.W,"1x",a.2L)},4F:J(a){a.Y.W[a.1k]=a.2L+a.2C}};E.1m.5e=J(){L b=0,38=0,Y=6[0],5E;7(Y)8N(E.14){L d=Y.1b,3U=Y,1L=Y.1L,1N=Y.2r,5H=26&&4G(5m)<8L&&!/a0/i.17(v),2Y=E.1l(Y,"3Z")=="2Y";7(Y.6G){L c=Y.6G();1a(c.2b+22.2e(1N.1H.2y,1N.1g.2y),c.38+22.2e(1N.1H.2t,1N.1g.2t));1a(-1N.1H.65,-1N.1H.64)}N{1a(Y.5J,Y.5I);2c(1L){1a(1L.5J,1L.5I);7(3W&&!/^t(8J|d|h)$/i.17(1L.2a)||26&&!5H)2N(1L);7(!2Y&&E.1l(1L,"3Z")=="2Y")2Y=P;3U=/^1g$/i.17(1L.2a)?3U:1L;1L=1L.1L}2c(d&&d.2a&&!/^1g|3o$/i.17(d.2a)){7(!/^8H|1V.*$/i.17(E.1l(d,"18")))1a(-d.2y,-d.2t);7(3W&&E.1l(d,"33")!="4a")2N(d);d=d.1b}7((5H&&(2Y||E.1l(3U,"3Z")=="4Y"))||(3W&&E.1l(3U,"3Z")!="4Y"))1a(-1N.1g.5J,-1N.1g.5I);7(2Y)1a(22.2e(1N.1H.2y,1N.1g.2y),22.2e(1N.1H.2t,1N.1g.2t))}5E={38:38,2b:b}}J 2N(a){1a(E.2w(a,"8G",P),E.2w(a,"a8",P))}J 1a(l,t){b+=4G(l)||0;38+=4G(t)||0}K 5E}})();',62,630,'||||||this|if||||||||||||||||||||||||||||||||||||||function|return|var|length|else|data|true|for|type|each|false|document|null|style||elem||undefined|options|nodeName||browser|nodeType|event|test|display|arguments|add|parentNode|window|url|msie|indexOf|body|apply|push|constructor|prop|css|fn|script|replace|in|isFunction|extend|className|text|typeof|div|handle|opacity|status|complete|value|new|filter|firstChild|match|hide|show|documentElement|Array|dataType|attr|offsetParent|trigger|doc|break|catch|call|remove|cache|height|try|table|success|tbody|get|ready||start|Math|split|hidden|string|safari|global|width|ret|tagName|left|while|map|max|animate|toggle|select|find|cur|prototype|special|handler||selected|duration|done|ownerDocument|fx|scrollTop|id|toLowerCase|curCSS|bind|scrollLeft|stack|opera|parseFloat|unit|target|toUpperCase|none|guid|button|nextSibling|makeArray|pushStack|now|slice|border|isReady|events|merge|preventDefault|inArray|delete|disabled|timeout|removeChild|one|fixed|removeData|px|nth|step|overflow|queue|name|exec|jsre|top|error|multiFilter|readyState|which|rl|trim|form|end|json|first|appendChild|insertBefore|async|elems|append|html|encodeURIComponent|checked|createElement|childNodes|innerHTML|param|is|runtimeStyle|color|grep|setTimeout|readyList|mouseleave|unbind|password|args|isXMLDoc|has|addEventListener|timers|last|xml|getTime|Date|selectedIndex|jQuery|domManip|callee|ajax|src|getElementsByTagName|offsetChild|orig|mozilla|object|toString|position|easing|props|curAnim|custom|block|stopPropagation|load|timerId|mouseenter|defaultView|visible|String|responseText|float|teardown|on|setup|nodeIndex|shift|javascript|clean|currentStyle|child|application|accepts|RegExp|_|previousSibling|dir|tr|update|empty|getAttribute|self|state|pos|setRequestHeader|input|jsonp|charCode|lastModified|_default|parseInt|lastToggle|unshift|GET|getComputedStyle|getPropertyValue|styleSheets|outline|not|unload|mouseout|mouseover|bindReady|getWH|andSelf|init|relatedTarget|index|absolute|container|fix|Number|triggered|removeAttribute|setInterval|prevObject|classFilter|unique|ajaxSettings|submit|file|after|windowData|deep|offset|scroll|client|globalEval|jquery|sibling|00|old|version|clone|getResponseHeader|wrapAll|triggerHandler|handleError|createTextNode|click|oldblock|checkbox|radio|fromElement|visibility|lastChild|dequeue|parsererror|swing|startTime|results|Modified|ifModified|safari2|offsetTop|offsetLeft|active|values|getElementById|username|processData|val|contentType|ajaxSend|ajaxError|ajaxStop|ajaxStart|serializeArray|notmodified|POST|loaded|DOMContentLoaded|Width|ctrlKey|metaKey|keyCode|clientTop|clientLeft|clientX|pageX|ajaxComplete|exclusive|detachEvent|swap|removeEventListener|cloneNode|join|attachEvent|eval|ajaxSuccess|substr|head|parse|textarea|reset|image|zoom|odd|even|before|prepend|expr|uuid|quickClass|quickID|quickChild|continue|textContent|appendTo|contents|evalScript|parent|defaultValue|CSS1Compat|getBoundingClientRect|compatMode|styleFloat|httpData|webkit|nodeValue|linear|concat|replaceWith|alpha|href|speed|_toggle|throw|304|100|200|Last|colgroup|httpNotModified|httpSuccess|clearInterval|eq|beforeSend|splice|fieldset|multiple|XMLHttpRequest|cssFloat|ActiveXObject|setArray|link|scriptCharset|callback|col|plain|pixelLeft|urlencoded|www|ajaxSetup|hasClass|post|getJSON|getScript|elements|serialize|black|keyup|solid|keydown|change|mousemove|mousedown|dblclick|resize|focus|blur|stylesheet|rel|doScroll|round|hover|mouseup|padding|offsetHeight|offsetWidth|keypress|Bottom|Top|Right|clientY|pageY|Left|toElement|srcElement|cancelBubble|returnValue|charAt|0n|substring|animated|header|noConflict|line|enabled|innerText|contains|weight|only|font|size|gt|lt|uFFFF|u0128|417|Boolean|inner|Height|toggleClass|removeClass|addClass|removeAttr|replaceAll|insertAfter|prependTo|contentWindow|wrap|contentDocument|iframe|children|siblings|prevAll|nextAll|wrapInner|prev|next|parents|maxLength|maxlength|readOnly|reverse|readonly|class|borderLeftWidth|inline|htmlFor|able|boxModel|522|setData|with|compatible|1px|getData|10000|ie|ra|it|PI|rv|cos|userAgent|navigator|600|slow|Function|Object|ig|stop|NaN|option|fadeTo|fadeOut|setAttribute|fadeIn|slideToggle|changed|slideUp|slideDown|be|can|property|responseXML|content|1223|getAttributeNode|300|method|protocol|action|location|send|cssText|abort|th|td|cap|specified|Accept|colg|With|Requested|fast|400|tfoot|GMT|thead|1970|attributes|Jan|01|leg|Thu|Since|If|opt|Type|embed|Content|area|open|hr|XMLHTTP|Microsoft|onreadystatechange|adobeair|meta|onload|charset|http|1_|img|br|borderTopWidth|abbr'.split('|'),0,{}))/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 */
 function escape2(s) {
    var n = s;
    n = n.replace(/&/g, "&amp;");
    n = n.replace(/</g, "&lt;");
    n = n.replace(/>/g, "&gt;");
    n = n.replace(/"/g, "&quot;");

    return n;
}
function diffString( o, n ) {
  o = o.replace(/\s+$/, '');
  n = n.replace(/\s+$/, '');

  var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
  var str = "";

  var oSpace = o.match(/\s+/g);
  if (oSpace == null) {
    oSpace = ["\n"];
  } else {
    oSpace.push("\n");
  }
  var nSpace = n.match(/\s+/g);
  if (nSpace == null) {
    nSpace = ["\n"];
  } else {
    nSpace.push("\n");
  }

  if (out.n.length == 0) {
      for (var i = 0; i < out.o.length; i++) {
        str += '<del>' + escape2(out.o[i]) + oSpace[i] + "</del>";
      }
  } else {
    if (out.n[0].text == null) {
      for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
        str += '<del>' + escape2(out.o[n]) + oSpace[n] + "</del>";
      }
    }

    for ( var i = 0; i < out.n.length; i++ ) {
      if (out.n[i].text == null) {
        str += '<ins>' + escape2(out.n[i]) + nSpace[i] + "</ins>";
      } else {
        var pre = "";

        for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
          pre += '<del>' + escape2(out.o[n]) + oSpace[n] + "</del>";
        }
        str += " " + out.n[i].text + nSpace[i] + pre;
      }
    }
  }
  
  return str;
}
function diff( o, n ) {
  var ns = new Object();
  var os = new Object();
  
  for ( var i = 0; i < n.length; i++ ) {
    if ( ns[ n[i] ] == null )
      ns[ n[i] ] = { rows: new Array(), o: null };
    ns[ n[i] ].rows.push( i );
  }
  
  for ( var i = 0; i < o.length; i++ ) {
    if ( os[ o[i] ] == null )
      os[ o[i] ] = { rows: new Array(), n: null };
    os[ o[i] ].rows.push( i );
  }
  
  for ( var i in ns ) {
    if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
      n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
      o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
    }
  }
  
  for ( var i = 0; i < n.length - 1; i++ ) {
    if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
         n[i+1] == o[ n[i].row + 1 ] ) {
      n[i+1] = { text: n[i+1], row: n[i].row + 1 };
      o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
    }
  }
  
  for ( var i = n.length - 1; i > 0; i-- ) {
    if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
         n[i-1] == o[ n[i].row - 1 ] ) {
      n[i-1] = { text: n[i-1], row: n[i].row - 1 };
      o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
    }
  }
  
  return { o: o, n: n };
}
/**
*
*  Javascript trim, ltrim, rtrim
*  http://www.webtoolkit.info/
*
*
**/

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
/*
 * use the firebug console if it is available
 */
if(!(console && console.firebug)) {
	// create a dummy logger
	console = new Object();

	console.dir =
	console.error =
	console.group =
	console.groupEnd =
	console.info =
	console.log =
	console.trace =
	function(txt) {
	};

/*
 * make sure that some condition is met
 */
	console.assert = function(cond, txt) {
		if(!cond) {
			throw txt;
		}
	};
}
/*
 *
 */
function styleGreen(html) {
	return "<span style='background-color:lightgreen;'>"+html+"</span>";
}

/*
 *
 */
function styleRed(html) {
	//return "<span style='background-color:#FFB0B0;'>"+html+"</span>";
	return "<span style='background-color:red;'>"+html+"</span>";
}

/*
 *
 */
function fadeIn(tag) {
	tag = $(tag);
	tag.animate({opacity:1}, 500, function(){
		tag.show();
	});
}

/*
 *
 */
function fadeOut(tag) {
	tag = $(tag);
	tag.animate({opacity:0}, 500, function(){
		tag.hide();
	});
}
/*
 * determine the id of the profile you are visiting
 */
function forginProfileID(doNotFailOnError) {
	var accusedUserId = $("#accusedUserId");
	
	if(accusedUserId.length) {
		return accusedUserId.get(0).value;
	}
	if(!doNotFailOnError) {
		console.error("forginProfileID failed");
	}
	return null;
}

/*
 * determine your own profile's id
 */
function ownProfileID() {
	var href = $("a[@title='Meine Seite']").get(0).href;
	console.assert(href, "currentProfileID: href");
	var myid = /.*\/(.*)$/.exec(href);
	console.assert(myid, "currentProfileID: myid");
	console.assert(myid.length >= 2, "currentProfileID: myid.length >= 2");
	return myid[1];
}

/*
 * determine the id of the current profile
 */
function profileID() {
	if(!profileID.cached) {
		var id = forginProfileID(true);
		if(id) {
			profileID.cached = id;
		} else {
			profileID.cached = ownProfileID();
		}
	}
	return profileID.cached;
}

/*
 *
 */
function isFriend() {
	return $("#UniFriendsList li").length == 3;
}
var actionRemember;
var actionForget;
var actionUpdate;
/*
 *
 */
function getLiveInfo() {
	if(!getLiveInfo.cache) {
		var div = $('#Profile_InformationSnipplet')[0];
		getLiveInfo.cache = div.innerHTML;
	}
	return getLiveInfo.cache;
}

/*
 *
 */
function getInfoKey() {
	return "profile.info.html."+profileID();
}

/*
 *
 */
function getStoredInfo() {
	if(!getStoredInfo.cache) { 
		try {	
			var tmp = GM_getValue(getInfoKey());
			if(tmp) {
				getStoredInfo.cache = unescape(tmp);
			} else {
				getStoredInfo.cache = ""; 
			}
		} catch(err) {
			console.error("getStoredInfo: GM_getValue failed");
			getStoredInfo.cache = "";
		}
	}
	return getStoredInfo.cache;
}

/*
 *
 */
function getStoredInfoHTML() {
	if(!getStoredInfoHTML.cache) {
		getStoredInfoHTML.cache = $(getStoredInfo());
	}
	return getStoredInfoHTML.cache;
}
 
/*
 *
 */
function resetInformation() {
	var div = $('#Profile_InformationSnipplet')[0];
	div.innerHTML = getLiveInfo();
	addActions();
}

/*
 *
 */
function actionRememberExec() {
	var txt = escape(getLiveInfo());
	GM_setValue(getInfoKey(), txt);
	console.info("Profile gemerkt");
	
	fadeOut(actionRemember);
	fadeIn(actionForget);
	fadeOut(actionUpdate);
	
	resetInformation();
}	

/*
 *
 */
function actionForgetExec() {
	GM_setValue(getInfoKey(), "");
	console.info("Profile vergessen");
	
	fadeIn(actionRemember);
	fadeOut(actionForget);
	fadeOut(actionUpdate);
	
	resetInformation();
}

/*
 *
 */
function addActions() {
	var h2 = $("#Profile_InformationSnipplet h2");
	
	if(!actionRemember) {
		actionRemember = $('<a href="javascript:void(0);" style="margin-left:10px;">[merken]</a>')[0];
		$(actionRemember).hide();
		actionRemember.addEventListener("click", function() {
			actionRememberExec();
		}, true);
	}
	h2[0].appendChild(actionRemember);
	
	if(!actionUpdate) {
		actionUpdate = $('<a href="javascript:void(0);" style="margin-left:10px;">[updaten]</a>')[0];
		$(actionUpdate).hide();
		actionUpdate.addEventListener("click", function() {
			actionRememberExec();
		}, true);
	}
	h2[0].appendChild(actionUpdate);

	if(!actionForget) {
		actionForget = $('<a href="javascript:void(0);" style="margin-left:10px;">[vergessen]</a>')[0];
		$(actionForget).hide();
		actionForget.addEventListener("click", function() {
			actionForgetExec();
		}, true);
	}
	h2[0].appendChild(actionForget);
}

/*
 * parse profile information, returns the gathered data as an hash
 */
function parseHTML(html) {
	var divs = $(html).find('div');
	var key = null;
	var ret = [];
	
	for(var i = 0; i < divs.length; ++i ) {
		var txt = divs[i].innerHTML;
		
		// even indices are key, odd the values
		if( (i % 2) == 0 ) {
			key = trim(txt);
		} else {
			//console.log("[%s] [%s] [%s]", i, key, txt);
			ret[key] = txt;
		}
	}
	return ret;
}

/*
 *
 */
function findDivFieldByLabel(div, key) {
	var divs = $(div).find('div');
	
	for(var i = 0; i < divs.length; ++i ) {
		var txt = divs[i].innerHTML;
		
		// matching key?
		if(trim(txt) == key) {
			// -> the next one is the value we want 
			return divs[i+1];
		}
	}
	console.error("findDivFieldByLable failed");
	console.trace();
	return null;
}

/*
 *
 */
function htmlDiff(a, b, div) {
	div.innerHTML = diffString(a, b);
	$(div).find("ins").each(function(){
		var txt = $(this).text();
		var node = styleGreen(txt);
		$(this).after($(node));
		$(this).remove();
	});
	$(div).find("del").each(function(){
		var txt = $(this).text();
		var node = styleRed(txt);
		$(this).after($(node));
		$(this).remove();
	});
}

/*
 *
 */
function doDiff() {
	var div = $('#Profile_InformationSnipplet')[0];
	var live = getLiveInfo();
	//console.info("%s", live);
	var stored = getStoredInfoHTML();
	//console.info("%s", stored);
	var a = parseHTML(stored);
	var b = parseHTML(live);
	var changed = false;
	
	/*for(var key in a) {
		if(!b[key]) {
			console.log("!live && stored: [%s]", key);
			changed = true;
		}
	}
	
	for(var key in b) {
		if(!a[key]) {
			console.log("live && !stored: [%s]", key);
			changed = true;
		}
	}*/
	
	for(var key in a) {
		if(a[key] && b[key] && a[key]!=b[key]) {
			var found = findDivFieldByLabel(div, key);
			//console.log("live != stored: [%s] [%s]", key, found);
			htmlDiff(a[key], b[key], found);
			changed = true;
		}
	}
	
	return changed;
}

/*
 *
 */
function main() {
	console.info("start");
	
	// fill cache
	getLiveInfo();
	
	// add actions
	addActions();
	
	var storedInfo = getStoredInfo();
	if(storedInfo && storedInfo.length > 0) {
		$(actionForget).show();
		if(doDiff()) {
			$(actionUpdate).show();
			console.info("profile changed");
		} else {
			console.info("no changes");
		}
	} else {
		// "forget" does not work with this -> profile is stored again on next page load
		//if(isFriend()) {
		//	actionRememberExec();
		//	console.info("stored friend's profile information");
		//} else {
			$(actionRemember).show();
			console.info("no profile information stored");
		//}
	}
	console.info("stop");
	
}

/*
 *
 */
function __init() {
	console.group("profilediff");
	try {
		main();
	} catch( err ) {
		console.error(err);
	}
	console.groupEnd();
}

__init();
