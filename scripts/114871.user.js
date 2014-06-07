// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TribalWars Enhancer v2", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           TribalWars Enhancer v3
// @version        3a
// @namespace      i.am.timas-at-gmail.com
// @description    Ads Remover. 15x15 Map. Shortcuts Bar. TW-Tools quick-access. Multi-Language and more!
// @include        http://ro*.triburile.ro/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	   http://en*.ds.ignames.net/*
// @include	   http://it*.tribals.it/*
// @copyright      Copyright (c) 2007 - 2008, Gelu Kelu, Timas & Mog
// ==/UserScript==

// If we want debug info this has to exist and be 1, 2 or 3
var DEBUG = 1;

// Initiate jQuery 1.2.3
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(J(){7(1e.3N)L w=1e.3N;L E=1e.3N=J(a,b){K 1B E.2l.4T(a,b)};7(1e.$)L D=1e.$;1e.$=E;L u=/^[^<]*(<(.|\\s)+>)[^>]*$|^#(\\w+)$/;L G=/^.[^:#\\[\\.]*$/;E.1n=E.2l={4T:J(d,b){d=d||T;7(d.15){6[0]=d;6.M=1;K 6}N 7(1o d=="25"){L c=u.2O(d);7(c&&(c[1]||!b)){7(c[1])d=E.4a([c[1]],b);N{L a=T.5J(c[3]);7(a)7(a.2w!=c[3])K E().2s(d);N{6[0]=a;6.M=1;K 6}N d=[]}}N K 1B E(b).2s(d)}N 7(E.1q(d))K 1B E(T)[E.1n.21?"21":"3U"](d);K 6.6E(d.1k==1M&&d||(d.5h||d.M&&d!=1e&&!d.15&&d[0]!=10&&d[0].15)&&E.2I(d)||[d])},5h:"1.2.3",87:J(){K 6.M},M:0,22:J(a){K a==10?E.2I(6):6[a]},2F:J(b){L a=E(b);a.54=6;K a},6E:J(a){6.M=0;1M.2l.1g.1i(6,a);K 6},R:J(a,b){K E.R(6,a,b)},4X:J(b){L a=-1;6.R(J(i){7(6==b)a=i});K a},1J:J(c,a,b){L d=c;7(c.1k==4e)7(a==10)K 6.M&&E[b||"1J"](6[0],c)||10;N{d={};d[c]=a}K 6.R(J(i){Q(c 1p d)E.1J(b?6.W:6,c,E.1l(6,d[c],b,i,c))})},1j:J(b,a){7((b==\'27\'||b==\'1R\')&&2M(a)<0)a=10;K 6.1J(b,a,"2o")},1u:J(b){7(1o b!="3V"&&b!=V)K 6.4x().3t((6[0]&&6[0].2i||T).5r(b));L a="";E.R(b||6,J(){E.R(6.3p,J(){7(6.15!=8)a+=6.15!=1?6.6K:E.1n.1u([6])})});K a},5m:J(b){7(6[0])E(b,6[0].2i).5k().3o(6[0]).2c(J(){L a=6;2b(a.1C)a=a.1C;K a}).3t(6);K 6},8w:J(a){K 6.R(J(){E(6).6z().5m(a)})},8p:J(a){K 6.R(J(){E(6).5m(a)})},3t:J(){K 6.3O(18,P,S,J(a){7(6.15==1)6.38(a)})},6q:J(){K 6.3O(18,P,P,J(a){7(6.15==1)6.3o(a,6.1C)})},6o:J(){K 6.3O(18,S,S,J(a){6.1a.3o(a,6)})},5a:J(){K 6.3O(18,S,P,J(a){6.1a.3o(a,6.2B)})},3h:J(){K 6.54||E([])},2s:J(b){L c=E.2c(6,J(a){K E.2s(b,a)});K 6.2F(/[^+>] [^+>]/.17(b)||b.1f("..")>-1?E.57(c):c)},5k:J(e){L f=6.2c(J(){7(E.14.1d&&!E.3E(6)){L a=6.69(P),4Y=T.3s("1x");4Y.38(a);K E.4a([4Y.3d])[0]}N K 6.69(P)});L d=f.2s("*").4R().R(J(){7(6[F]!=10)6[F]=V});7(e===P)6.2s("*").4R().R(J(i){7(6.15==3)K;L c=E.O(6,"2R");Q(L a 1p c)Q(L b 1p c[a])E.16.1b(d[i],a,c[a][b],c[a][b].O)});K f},1E:J(b){K 6.2F(E.1q(b)&&E.3y(6,J(a,i){K b.1P(a,i)})||E.3e(b,6))},56:J(b){7(b.1k==4e)7(G.17(b))K 6.2F(E.3e(b,6,P));N b=E.3e(b,6);L a=b.M&&b[b.M-1]!==10&&!b.15;K 6.1E(J(){K a?E.33(6,b)<0:6!=b})},1b:J(a){K!a?6:6.2F(E.37(6.22(),a.1k==4e?E(a).22():a.M!=10&&(!a.12||E.12(a,"3u"))?a:[a]))},3H:J(a){K a?E.3e(a,6).M>0:S},7j:J(a){K 6.3H("."+a)},5O:J(b){7(b==10){7(6.M){L c=6[0];7(E.12(c,"2k")){L e=c.3T,5I=[],11=c.11,2X=c.U=="2k-2X";7(e<0)K V;Q(L i=2X?e:0,2f=2X?e+1:11.M;i<2f;i++){L d=11[i];7(d.2p){b=E.14.1d&&!d.9J.1A.9y?d.1u:d.1A;7(2X)K b;5I.1g(b)}}K 5I}N K(6[0].1A||"").1r(/\\r/g,"")}K 10}K 6.R(J(){7(6.15!=1)K;7(b.1k==1M&&/5u|5t/.17(6.U))6.3k=(E.33(6.1A,b)>=0||E.33(6.31,b)>=0);N 7(E.12(6,"2k")){L a=b.1k==1M?b:[b];E("98",6).R(J(){6.2p=(E.33(6.1A,a)>=0||E.33(6.1u,a)>=0)});7(!a.M)6.3T=-1}N 6.1A=b})},3q:J(a){K a==10?(6.M?6[0].3d:V):6.4x().3t(a)},6S:J(a){K 6.5a(a).1V()},6Z:J(i){K 6.2K(i,i+1)},2K:J(){K 6.2F(1M.2l.2K.1i(6,18))},2c:J(b){K 6.2F(E.2c(6,J(a,i){K b.1P(a,i,a)}))},4R:J(){K 6.1b(6.54)},O:J(d,b){L a=d.23(".");a[1]=a[1]?"."+a[1]:"";7(b==V){L c=6.5n("8P"+a[1]+"!",[a[0]]);7(c==10&&6.M)c=E.O(6[0],d);K c==V&&a[1]?6.O(a[0]):c}N K 6.1N("8K"+a[1]+"!",[a[0],b]).R(J(){E.O(6,d,b)})},35:J(a){K 6.R(J(){E.35(6,a)})},3O:J(g,f,h,d){L e=6.M>1,3n;K 6.R(J(){7(!3n){3n=E.4a(g,6.2i);7(h)3n.8D()}L b=6;7(f&&E.12(6,"1O")&&E.12(3n[0],"4v"))b=6.3S("1U")[0]||6.38(6.2i.3s("1U"));L c=E([]);E.R(3n,J(){L a=e?E(6).5k(P)[0]:6;7(E.12(a,"1m")){c=c.1b(a)}N{7(a.15==1)c=c.1b(E("1m",a).1V());d.1P(b,a)}});c.R(6A)})}};E.2l.4T.2l=E.2l;J 6A(i,a){7(a.3Q)E.3P({1c:a.3Q,3l:S,1H:"1m"});N E.5g(a.1u||a.6x||a.3d||"");7(a.1a)a.1a.34(a)}E.1s=E.1n.1s=J(){L b=18[0]||{},i=1,M=18.M,5c=S,11;7(b.1k==8d){5c=b;b=18[1]||{};i=2}7(1o b!="3V"&&1o b!="J")b={};7(M==1){b=6;i=0}Q(;i<M;i++)7((11=18[i])!=V)Q(L a 1p 11){7(b===11[a])6w;7(5c&&11[a]&&1o 11[a]=="3V"&&b[a]&&!11[a].15)b[a]=E.1s(b[a],11[a]);N 7(11[a]!=10)b[a]=11[a]}K b};L F="3N"+(1B 3v()).3L(),6t=0,5b={};L H=/z-?4X|86-?84|1w|6k|7Z-?1R/i;E.1s({7Y:J(a){1e.$=D;7(a)1e.3N=w;K E},1q:J(a){K!!a&&1o a!="25"&&!a.12&&a.1k!=1M&&/J/i.17(a+"")},3E:J(a){K a.1F&&!a.1h||a.28&&a.2i&&!a.2i.1h},5g:J(a){a=E.3g(a);7(a){L b=T.3S("6f")[0]||T.1F,1m=T.3s("1m");1m.U="1u/4m";7(E.14.1d)1m.1u=a;N 1m.38(T.5r(a));b.38(1m);b.34(1m)}},12:J(b,a){K b.12&&b.12.2E()==a.2E()},1T:{},O:J(c,d,b){c=c==1e?5b:c;L a=c[F];7(!a)a=c[F]=++6t;7(d&&!E.1T[a])E.1T[a]={};7(b!=10)E.1T[a][d]=b;K d?E.1T[a][d]:a},35:J(c,b){c=c==1e?5b:c;L a=c[F];7(b){7(E.1T[a]){2V E.1T[a][b];b="";Q(b 1p E.1T[a])1Q;7(!b)E.35(c)}}N{1S{2V c[F]}1X(e){7(c.52)c.52(F)}2V E.1T[a]}},R:J(c,a,b){7(b){7(c.M==10){Q(L d 1p c)7(a.1i(c[d],b)===S)1Q}N Q(L i=0,M=c.M;i<M;i++)7(a.1i(c[i],b)===S)1Q}N{7(c.M==10){Q(L d 1p c)7(a.1P(c[d],d,c[d])===S)1Q}N Q(L i=0,M=c.M,1A=c[0];i<M&&a.1P(1A,i,1A)!==S;1A=c[++i]){}}K c},1l:J(b,a,c,i,d){7(E.1q(a))a=a.1P(b,i);K a&&a.1k==51&&c=="2o"&&!H.17(d)?a+"2S":a},1t:{1b:J(c,b){E.R((b||"").23(/\\s+/),J(i,a){7(c.15==1&&!E.1t.3Y(c.1t,a))c.1t+=(c.1t?" ":"")+a})},1V:J(c,b){7(c.15==1)c.1t=b!=10?E.3y(c.1t.23(/\\s+/),J(a){K!E.1t.3Y(b,a)}).6a(" "):""},3Y:J(b,a){K E.33(a,(b.1t||b).3X().23(/\\s+/))>-1}},68:J(b,c,a){L e={};Q(L d 1p c){e[d]=b.W[d];b.W[d]=c[d]}a.1P(b);Q(L d 1p c)b.W[d]=e[d]},1j:J(d,e,c){7(e=="27"||e=="1R"){L b,46={43:"4W",4U:"1Z",19:"3D"},3c=e=="27"?["7O","7M"]:["7J","7I"];J 5E(){b=e=="27"?d.7H:d.7F;L a=0,2N=0;E.R(3c,J(){a+=2M(E.2o(d,"7E"+6,P))||0;2N+=2M(E.2o(d,"2N"+6+"5X",P))||0});b-=24.7C(a+2N)}7(E(d).3H(":4d"))5E();N E.68(d,46,5E);K 24.2f(0,b)}K E.2o(d,e,c)},2o:J(e,k,j){L d;J 3x(b){7(!E.14.2d)K S;L a=T.4c.4K(b,V);K!a||a.4M("3x")==""}7(k=="1w"&&E.14.1d){d=E.1J(e.W,"1w");K d==""?"1":d}7(E.14.2z&&k=="19"){L c=e.W.50;e.W.50="0 7r 7o";e.W.50=c}7(k.1D(/4g/i))k=y;7(!j&&e.W&&e.W[k])d=e.W[k];N 7(T.4c&&T.4c.4K){7(k.1D(/4g/i))k="4g";k=k.1r(/([A-Z])/g,"-$1").2h();L h=T.4c.4K(e,V);7(h&&!3x(e))d=h.4M(k);N{L f=[],2C=[];Q(L a=e;a&&3x(a);a=a.1a)2C.4J(a);Q(L i=0;i<2C.M;i++)7(3x(2C[i])){f[i]=2C[i].W.19;2C[i].W.19="3D"}d=k=="19"&&f[2C.M-1]!=V?"2H":(h&&h.4M(k))||"";Q(L i=0;i<f.M;i++)7(f[i]!=V)2C[i].W.19=f[i]}7(k=="1w"&&d=="")d="1"}N 7(e.4n){L g=k.1r(/\\-(\\w)/g,J(a,b){K b.2E()});d=e.4n[k]||e.4n[g];7(!/^\\d+(2S)?$/i.17(d)&&/^\\d/.17(d)){L l=e.W.26,3K=e.3K.26;e.3K.26=e.4n.26;e.W.26=d||0;d=e.W.7f+"2S";e.W.26=l;e.3K.26=3K}}K d},4a:J(l,h){L k=[];h=h||T;7(1o h.3s==\'10\')h=h.2i||h[0]&&h[0].2i||T;E.R(l,J(i,d){7(!d)K;7(d.1k==51)d=d.3X();7(1o d=="25"){d=d.1r(/(<(\\w+)[^>]*?)\\/>/g,J(b,a,c){K c.1D(/^(aa|a6|7e|a5|4D|7a|a0|3m|9W|9U|9S)$/i)?b:a+"></"+c+">"});L f=E.3g(d).2h(),1x=h.3s("1x");L e=!f.1f("<9P")&&[1,"<2k 74=\'74\'>","</2k>"]||!f.1f("<9M")&&[1,"<73>","</73>"]||f.1D(/^<(9G|1U|9E|9B|9x)/)&&[1,"<1O>","</1O>"]||!f.1f("<4v")&&[2,"<1O><1U>","</1U></1O>"]||(!f.1f("<9w")||!f.1f("<9v"))&&[3,"<1O><1U><4v>","</4v></1U></1O>"]||!f.1f("<7e")&&[2,"<1O><1U></1U><6V>","</6V></1O>"]||E.14.1d&&[1,"1x<1x>","</1x>"]||[0,"",""];1x.3d=e[1]+d+e[2];2b(e[0]--)1x=1x.5o;7(E.14.1d){L g=!f.1f("<1O")&&f.1f("<1U")<0?1x.1C&&1x.1C.3p:e[1]=="<1O>"&&f.1f("<1U")<0?1x.3p:[];Q(L j=g.M-1;j>=0;--j)7(E.12(g[j],"1U")&&!g[j].3p.M)g[j].1a.34(g[j]);7(/^\\s/.17(d))1x.3o(h.5r(d.1D(/^\\s*/)[0]),1x.1C)}d=E.2I(1x.3p)}7(d.M===0&&(!E.12(d,"3u")&&!E.12(d,"2k")))K;7(d[0]==10||E.12(d,"3u")||d.11)k.1g(d);N k=E.37(k,d)});K k},1J:J(d,e,c){7(!d||d.15==3||d.15==8)K 10;L f=E.3E(d)?{}:E.46;7(e=="2p"&&E.14.2d)d.1a.3T;7(f[e]){7(c!=10)d[f[e]]=c;K d[f[e]]}N 7(E.14.1d&&e=="W")K E.1J(d.W,"9u",c);N 7(c==10&&E.14.1d&&E.12(d,"3u")&&(e=="9r"||e=="9o"))K d.9m(e).6K;N 7(d.28){7(c!=10){7(e=="U"&&E.12(d,"4D")&&d.1a)6Q"U 9i 9h\'t 9g 9e";d.9b(e,""+c)}7(E.14.1d&&/6O|3Q/.17(e)&&!E.3E(d))K d.4z(e,2);K d.4z(e)}N{7(e=="1w"&&E.14.1d){7(c!=10){d.6k=1;d.1E=(d.1E||"").1r(/6M\\([^)]*\\)/,"")+(2M(c).3X()=="96"?"":"6M(1w="+c*6L+")")}K d.1E&&d.1E.1f("1w=")>=0?(2M(d.1E.1D(/1w=([^)]*)/)[1])/6L).3X():""}e=e.1r(/-([a-z])/95,J(a,b){K b.2E()});7(c!=10)d[e]=c;K d[e]}},3g:J(a){K(a||"").1r(/^\\s+|\\s+$/g,"")},2I:J(b){L a=[];7(1o b!="93")Q(L i=0,M=b.M;i<M;i++)a.1g(b[i]);N a=b.2K(0);K a},33:J(b,a){Q(L i=0,M=a.M;i<M;i++)7(a[i]==b)K i;K-1},37:J(a,b){7(E.14.1d){Q(L i=0;b[i];i++)7(b[i].15!=8)a.1g(b[i])}N Q(L i=0;b[i];i++)a.1g(b[i]);K a},57:J(a){L c=[],2r={};1S{Q(L i=0,M=a.M;i<M;i++){L b=E.O(a[i]);7(!2r[b]){2r[b]=P;c.1g(a[i])}}}1X(e){c=a}K c},3y:J(c,a,d){L b=[];Q(L i=0,M=c.M;i<M;i++)7(!d&&a(c[i],i)||d&&!a(c[i],i))b.1g(c[i]);K b},2c:J(d,a){L c=[];Q(L i=0,M=d.M;i<M;i++){L b=a(d[i],i);7(b!==V&&b!=10){7(b.1k!=1M)b=[b];c=c.71(b)}}K c}});L v=8Y.8W.2h();E.14={5K:(v.1D(/.+(?:8T|8S|8R|8O)[\\/: ]([\\d.]+)/)||[])[1],2d:/77/.17(v),2z:/2z/.17(v),1d:/1d/.17(v)&&!/2z/.17(v),48:/48/.17(v)&&!/(8L|77)/.17(v)};L y=E.14.1d?"6H":"75";E.1s({8I:!E.14.1d||T.6F=="79",46:{"Q":"8F","8E":"1t","4g":y,75:y,6H:y,3d:"3d",1t:"1t",1A:"1A",2Y:"2Y",3k:"3k",8C:"8B",2p:"2p",8A:"8z",3T:"3T",6C:"6C",28:"28",12:"12"}});E.R({6B:J(a){K a.1a},8y:J(a){K E.4u(a,"1a")},8x:J(a){K E.2Z(a,2,"2B")},8v:J(a){K E.2Z(a,2,"4t")},8u:J(a){K E.4u(a,"2B")},8t:J(a){K E.4u(a,"4t")},8s:J(a){K E.5i(a.1a.1C,a)},8r:J(a){K E.5i(a.1C)},6z:J(a){K E.12(a,"8q")?a.8o||a.8n.T:E.2I(a.3p)}},J(c,d){E.1n[c]=J(b){L a=E.2c(6,d);7(b&&1o b=="25")a=E.3e(b,a);K 6.2F(E.57(a))}});E.R({6y:"3t",8m:"6q",3o:"6o",8l:"5a",8k:"6S"},J(c,b){E.1n[c]=J(){L a=18;K 6.R(J(){Q(L i=0,M=a.M;i<M;i++)E(a[i])[b](6)})}});E.R({8j:J(a){E.1J(6,a,"");7(6.15==1)6.52(a)},8i:J(a){E.1t.1b(6,a)},8h:J(a){E.1t.1V(6,a)},8g:J(a){E.1t[E.1t.3Y(6,a)?"1V":"1b"](6,a)},1V:J(a){7(!a||E.1E(a,[6]).r.M){E("*",6).1b(6).R(J(){E.16.1V(6);E.35(6)});7(6.1a)6.1a.34(6)}},4x:J(){E(">*",6).1V();2b(6.1C)6.34(6.1C)}},J(a,b){E.1n[a]=J(){K 6.R(b,18)}});E.R(["8f","5X"],J(i,c){L b=c.2h();E.1n[b]=J(a){K 6[0]==1e?E.14.2z&&T.1h["5e"+c]||E.14.2d&&1e["8e"+c]||T.6F=="79"&&T.1F["5e"+c]||T.1h["5e"+c]:6[0]==T?24.2f(24.2f(T.1h["5d"+c],T.1F["5d"+c]),24.2f(T.1h["5L"+c],T.1F["5L"+c])):a==10?(6.M?E.1j(6[0],b):V):6.1j(b,a.1k==4e?a:a+"2S")}});L C=E.14.2d&&4s(E.14.5K)<8c?"(?:[\\\\w*4r-]|\\\\\\\\.)":"(?:[\\\\w\\8b-\\8a*4r-]|\\\\\\\\.)",6v=1B 4q("^>\\\\s*("+C+"+)"),6u=1B 4q("^("+C+"+)(#)("+C+"+)"),6s=1B 4q("^([#.]?)("+C+"*)");E.1s({6r:{"":J(a,i,m){K m[2]=="*"||E.12(a,m[2])},"#":J(a,i,m){K a.4z("2w")==m[2]},":":{89:J(a,i,m){K i<m[3]-0},88:J(a,i,m){K i>m[3]-0},2Z:J(a,i,m){K m[3]-0==i},6Z:J(a,i,m){K m[3]-0==i},3j:J(a,i){K i==0},3J:J(a,i,m,r){K i==r.M-1},6n:J(a,i){K i%2==0},6l:J(a,i){K i%2},"3j-4p":J(a){K a.1a.3S("*")[0]==a},"3J-4p":J(a){K E.2Z(a.1a.5o,1,"4t")==a},"83-4p":J(a){K!E.2Z(a.1a.5o,2,"4t")},6B:J(a){K a.1C},4x:J(a){K!a.1C},82:J(a,i,m){K(a.6x||a.81||E(a).1u()||"").1f(m[3])>=0},4d:J(a){K"1Z"!=a.U&&E.1j(a,"19")!="2H"&&E.1j(a,"4U")!="1Z"},1Z:J(a){K"1Z"==a.U||E.1j(a,"19")=="2H"||E.1j(a,"4U")=="1Z"},80:J(a){K!a.2Y},2Y:J(a){K a.2Y},3k:J(a){K a.3k},2p:J(a){K a.2p||E.1J(a,"2p")},1u:J(a){K"1u"==a.U},5u:J(a){K"5u"==a.U},5t:J(a){K"5t"==a.U},59:J(a){K"59"==a.U},3I:J(a){K"3I"==a.U},58:J(a){K"58"==a.U},6j:J(a){K"6j"==a.U},6i:J(a){K"6i"==a.U},2G:J(a){K"2G"==a.U||E.12(a,"2G")},4D:J(a){K/4D|2k|6h|2G/i.17(a.12)},3Y:J(a,i,m){K E.2s(m[3],a).M},7X:J(a){K/h\\d/i.17(a.12)},7W:J(a){K E.3y(E.3G,J(b){K a==b.Y}).M}}},6g:[/^(\\[) *@?([\\w-]+) *([!*$^~=]*) *(\'?"?)(.*?)\\4 *\\]/,/^(:)([\\w-]+)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/,1B 4q("^([:.#]*)("+C+"+)")],3e:J(a,c,b){L d,2m=[];2b(a&&a!=d){d=a;L f=E.1E(a,c,b);a=f.t.1r(/^\\s*,\\s*/,"");2m=b?c=f.r:E.37(2m,f.r)}K 2m},2s:J(t,p){7(1o t!="25")K[t];7(p&&p.15!=1&&p.15!=9)K[];p=p||T;L d=[p],2r=[],3J,12;2b(t&&3J!=t){L r=[];3J=t;t=E.3g(t);L o=S;L g=6v;L m=g.2O(t);7(m){12=m[1].2E();Q(L i=0;d[i];i++)Q(L c=d[i].1C;c;c=c.2B)7(c.15==1&&(12=="*"||c.12.2E()==12))r.1g(c);d=r;t=t.1r(g,"");7(t.1f(" ")==0)6w;o=P}N{g=/^([>+~])\\s*(\\w*)/i;7((m=g.2O(t))!=V){r=[];L l={};12=m[2].2E();m=m[1];Q(L j=0,3f=d.M;j<3f;j++){L n=m=="~"||m=="+"?d[j].2B:d[j].1C;Q(;n;n=n.2B)7(n.15==1){L h=E.O(n);7(m=="~"&&l[h])1Q;7(!12||n.12.2E()==12){7(m=="~")l[h]=P;r.1g(n)}7(m=="+")1Q}}d=r;t=E.3g(t.1r(g,""));o=P}}7(t&&!o){7(!t.1f(",")){7(p==d[0])d.4l();2r=E.37(2r,d);r=d=[p];t=" "+t.6e(1,t.M)}N{L k=6u;L m=k.2O(t);7(m){m=[0,m[2],m[3],m[1]]}N{k=6s;m=k.2O(t)}m[2]=m[2].1r(/\\\\/g,"");L f=d[d.M-1];7(m[1]=="#"&&f&&f.5J&&!E.3E(f)){L q=f.5J(m[2]);7((E.14.1d||E.14.2z)&&q&&1o q.2w=="25"&&q.2w!=m[2])q=E(\'[@2w="\'+m[2]+\'"]\',f)[0];d=r=q&&(!m[3]||E.12(q,m[3]))?[q]:[]}N{Q(L i=0;d[i];i++){L a=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];7(a=="*"&&d[i].12.2h()=="3V")a="3m";r=E.37(r,d[i].3S(a))}7(m[1]==".")r=E.55(r,m[2]);7(m[1]=="#"){L e=[];Q(L i=0;r[i];i++)7(r[i].4z("2w")==m[2]){e=[r[i]];1Q}r=e}d=r}t=t.1r(k,"")}}7(t){L b=E.1E(t,r);d=r=b.r;t=E.3g(b.t)}}7(t)d=[];7(d&&p==d[0])d.4l();2r=E.37(2r,d);K 2r},55:J(r,m,a){m=" "+m+" ";L c=[];Q(L i=0;r[i];i++){L b=(" "+r[i].1t+" ").1f(m)>=0;7(!a&&b||a&&!b)c.1g(r[i])}K c},1E:J(t,r,h){L d;2b(t&&t!=d){d=t;L p=E.6g,m;Q(L i=0;p[i];i++){m=p[i].2O(t);7(m){t=t.7V(m[0].M);m[2]=m[2].1r(/\\\\/g,"");1Q}}7(!m)1Q;7(m[1]==":"&&m[2]=="56")r=G.17(m[3])?E.1E(m[3],r,P).r:E(r).56(m[3]);N 7(m[1]==".")r=E.55(r,m[2],h);N 7(m[1]=="["){L g=[],U=m[3];Q(L i=0,3f=r.M;i<3f;i++){L a=r[i],z=a[E.46[m[2]]||m[2]];7(z==V||/6O|3Q|2p/.17(m[2]))z=E.1J(a,m[2])||\'\';7((U==""&&!!z||U=="="&&z==m[5]||U=="!="&&z!=m[5]||U=="^="&&z&&!z.1f(m[5])||U=="$="&&z.6e(z.M-m[5].M)==m[5]||(U=="*="||U=="~=")&&z.1f(m[5])>=0)^h)g.1g(a)}r=g}N 7(m[1]==":"&&m[2]=="2Z-4p"){L e={},g=[],17=/(-?)(\\d*)n((?:\\+|-)?\\d*)/.2O(m[3]=="6n"&&"2n"||m[3]=="6l"&&"2n+1"||!/\\D/.17(m[3])&&"7U+"+m[3]||m[3]),3j=(17[1]+(17[2]||1))-0,d=17[3]-0;Q(L i=0,3f=r.M;i<3f;i++){L j=r[i],1a=j.1a,2w=E.O(1a);7(!e[2w]){L c=1;Q(L n=1a.1C;n;n=n.2B)7(n.15==1)n.4k=c++;e[2w]=P}L b=S;7(3j==0){7(j.4k==d)b=P}N 7((j.4k-d)%3j==0&&(j.4k-d)/3j>=0)b=P;7(b^h)g.1g(j)}r=g}N{L f=E.6r[m[1]];7(1o f=="3V")f=f[m[2]];7(1o f=="25")f=6c("S||J(a,i){K "+f+";}");r=E.3y(r,J(a,i){K f(a,i,m,r)},h)}}K{r:r,t:t}},4u:J(b,c){L d=[];L a=b[c];2b(a&&a!=T){7(a.15==1)d.1g(a);a=a[c]}K d},2Z:J(a,e,c,b){e=e||1;L d=0;Q(;a;a=a[c])7(a.15==1&&++d==e)1Q;K a},5i:J(n,a){L r=[];Q(;n;n=n.2B){7(n.15==1&&(!a||n!=a))r.1g(n)}K r}});E.16={1b:J(f,i,g,e){7(f.15==3||f.15==8)K;7(E.14.1d&&f.53!=10)f=1e;7(!g.2D)g.2D=6.2D++;7(e!=10){L h=g;g=J(){K h.1i(6,18)};g.O=e;g.2D=h.2D}L j=E.O(f,"2R")||E.O(f,"2R",{}),1v=E.O(f,"1v")||E.O(f,"1v",J(){L a;7(1o E=="10"||E.16.5f)K a;a=E.16.1v.1i(18.3R.Y,18);K a});1v.Y=f;E.R(i.23(/\\s+/),J(c,b){L a=b.23(".");b=a[0];g.U=a[1];L d=j[b];7(!d){d=j[b]={};7(!E.16.2y[b]||E.16.2y[b].4j.1P(f)===S){7(f.3F)f.3F(b,1v,S);N 7(f.6b)f.6b("4i"+b,1v)}}d[g.2D]=g;E.16.2a[b]=P});f=V},2D:1,2a:{},1V:J(e,h,f){7(e.15==3||e.15==8)K;L i=E.O(e,"2R"),29,4X;7(i){7(h==10||(1o h=="25"&&h.7T(0)=="."))Q(L g 1p i)6.1V(e,g+(h||""));N{7(h.U){f=h.2q;h=h.U}E.R(h.23(/\\s+/),J(b,a){L c=a.23(".");a=c[0];7(i[a]){7(f)2V i[a][f.2D];N Q(f 1p i[a])7(!c[1]||i[a][f].U==c[1])2V i[a][f];Q(29 1p i[a])1Q;7(!29){7(!E.16.2y[a]||E.16.2y[a].4h.1P(e)===S){7(e.67)e.67(a,E.O(e,"1v"),S);N 7(e.66)e.66("4i"+a,E.O(e,"1v"))}29=V;2V i[a]}}})}Q(29 1p i)1Q;7(!29){L d=E.O(e,"1v");7(d)d.Y=V;E.35(e,"2R");E.35(e,"1v")}}},1N:J(g,c,d,f,h){c=E.2I(c||[]);7(g.1f("!")>=0){g=g.2K(0,-1);L a=P}7(!d){7(6.2a[g])E("*").1b([1e,T]).1N(g,c)}N{7(d.15==3||d.15==8)K 10;L b,29,1n=E.1q(d[g]||V),16=!c[0]||!c[0].36;7(16)c.4J(6.4Z({U:g,2L:d}));c[0].U=g;7(a)c[0].65=P;7(E.1q(E.O(d,"1v")))b=E.O(d,"1v").1i(d,c);7(!1n&&d["4i"+g]&&d["4i"+g].1i(d,c)===S)b=S;7(16)c.4l();7(h&&E.1q(h)){29=h.1i(d,b==V?c:c.71(b));7(29!==10)b=29}7(1n&&f!==S&&b!==S&&!(E.12(d,\'a\')&&g=="4V")){6.5f=P;1S{d[g]()}1X(e){}}6.5f=S}K b},1v:J(c){L a;c=E.16.4Z(c||1e.16||{});L b=c.U.23(".");c.U=b[0];L f=E.O(6,"2R")&&E.O(6,"2R")[c.U],42=1M.2l.2K.1P(18,1);42.4J(c);Q(L j 1p f){L d=f[j];42[0].2q=d;42[0].O=d.O;7(!b[1]&&!c.65||d.U==b[1]){L e=d.1i(6,42);7(a!==S)a=e;7(e===S){c.36();c.44()}}}7(E.14.1d)c.2L=c.36=c.44=c.2q=c.O=V;K a},4Z:J(c){L a=c;c=E.1s({},a);c.36=J(){7(a.36)a.36();a.7S=S};c.44=J(){7(a.44)a.44();a.7R=P};7(!c.2L)c.2L=c.7Q||T;7(c.2L.15==3)c.2L=a.2L.1a;7(!c.4S&&c.5w)c.4S=c.5w==c.2L?c.7P:c.5w;7(c.64==V&&c.63!=V){L b=T.1F,1h=T.1h;c.64=c.63+(b&&b.2v||1h&&1h.2v||0)-(b.62||0);c.7N=c.7L+(b&&b.2x||1h&&1h.2x||0)-(b.60||0)}7(!c.3c&&((c.4f||c.4f===0)?c.4f:c.5Z))c.3c=c.4f||c.5Z;7(!c.7b&&c.5Y)c.7b=c.5Y;7(!c.3c&&c.2G)c.3c=(c.2G&1?1:(c.2G&2?3:(c.2G&4?2:0)));K c},2y:{21:{4j:J(){5M();K},4h:J(){K}},3C:{4j:J(){7(E.14.1d)K S;E(6).2j("4P",E.16.2y.3C.2q);K P},4h:J(){7(E.14.1d)K S;E(6).3w("4P",E.16.2y.3C.2q);K P},2q:J(a){7(I(a,6))K P;18[0].U="3C";K E.16.1v.1i(6,18)}},3B:{4j:J(){7(E.14.1d)K S;E(6).2j("4O",E.16.2y.3B.2q);K P},4h:J(){7(E.14.1d)K S;E(6).3w("4O",E.16.2y.3B.2q);K P},2q:J(a){7(I(a,6))K P;18[0].U="3B";K E.16.1v.1i(6,18)}}}};E.1n.1s({2j:J(c,a,b){K c=="4H"?6.2X(c,a,b):6.R(J(){E.16.1b(6,c,b||a,b&&a)})},2X:J(d,b,c){K 6.R(J(){E.16.1b(6,d,J(a){E(6).3w(a);K(c||b).1i(6,18)},c&&b)})},3w:J(a,b){K 6.R(J(){E.16.1V(6,a,b)})},1N:J(c,a,b){K 6.R(J(){E.16.1N(c,a,6,P,b)})},5n:J(c,a,b){7(6[0])K E.16.1N(c,a,6[0],S,b);K 10},2g:J(){L b=18;K 6.4V(J(a){6.4N=0==6.4N?1:0;a.36();K b[6.4N].1i(6,18)||S})},7D:J(a,b){K 6.2j(\'3C\',a).2j(\'3B\',b)},21:J(a){5M();7(E.2Q)a.1P(T,E);N E.3A.1g(J(){K a.1P(6,E)});K 6}});E.1s({2Q:S,3A:[],21:J(){7(!E.2Q){E.2Q=P;7(E.3A){E.R(E.3A,J(){6.1i(T)});E.3A=V}E(T).5n("21")}}});L x=S;J 5M(){7(x)K;x=P;7(T.3F&&!E.14.2z)T.3F("5W",E.21,S);7(E.14.1d&&1e==3b)(J(){7(E.2Q)K;1S{T.1F.7B("26")}1X(3a){3z(18.3R,0);K}E.21()})();7(E.14.2z)T.3F("5W",J(){7(E.2Q)K;Q(L i=0;i<T.4L.M;i++)7(T.4L[i].2Y){3z(18.3R,0);K}E.21()},S);7(E.14.2d){L a;(J(){7(E.2Q)K;7(T.39!="5V"&&T.39!="1y"){3z(18.3R,0);K}7(a===10)a=E("W, 7a[7A=7z]").M;7(T.4L.M!=a){3z(18.3R,0);K}E.21()})()}E.16.1b(1e,"3U",E.21)}E.R(("7y,7x,3U,7w,5d,4H,4V,7v,"+"7G,7u,7t,4P,4O,7s,2k,"+"58,7K,7q,7p,3a").23(","),J(i,b){E.1n[b]=J(a){K a?6.2j(b,a):6.1N(b)}});L I=J(a,c){L b=a.4S;2b(b&&b!=c)1S{b=b.1a}1X(3a){b=c}K b==c};E(1e).2j("4H",J(){E("*").1b(T).3w()});E.1n.1s({3U:J(g,d,c){7(E.1q(g))K 6.2j("3U",g);L e=g.1f(" ");7(e>=0){L i=g.2K(e,g.M);g=g.2K(0,e)}c=c||J(){};L f="4Q";7(d)7(E.1q(d)){c=d;d=V}N{d=E.3m(d);f="61"}L h=6;E.3P({1c:g,U:f,1H:"3q",O:d,1y:J(a,b){7(b=="1W"||b=="5U")h.3q(i?E("<1x/>").3t(a.4b.1r(/<1m(.|\\s)*?\\/1m>/g,"")).2s(i):a.4b);h.R(c,[a.4b,b,a])}});K 6},7n:J(){K E.3m(6.5T())},5T:J(){K 6.2c(J(){K E.12(6,"3u")?E.2I(6.7m):6}).1E(J(){K 6.31&&!6.2Y&&(6.3k||/2k|6h/i.17(6.12)||/1u|1Z|3I/i.17(6.U))}).2c(J(i,c){L b=E(6).5O();K b==V?V:b.1k==1M?E.2c(b,J(a,i){K{31:c.31,1A:a}}):{31:c.31,1A:b}}).22()}});E.R("5S,6d,5R,6D,5Q,6m".23(","),J(i,o){E.1n[o]=J(f){K 6.2j(o,f)}});L B=(1B 3v).3L();E.1s({22:J(d,b,a,c){7(E.1q(b)){a=b;b=V}K E.3P({U:"4Q",1c:d,O:b,1W:a,1H:c})},7l:J(b,a){K E.22(b,V,a,"1m")},7k:J(c,b,a){K E.22(c,b,a,"3i")},7i:J(d,b,a,c){7(E.1q(b)){a=b;b={}}K E.3P({U:"61",1c:d,O:b,1W:a,1H:c})},85:J(a){E.1s(E.4I,a)},4I:{2a:P,U:"4Q",2U:0,5P:"4o/x-7h-3u-7g",5N:P,3l:P,O:V,6p:V,3I:V,49:{3M:"4o/3M, 1u/3M",3q:"1u/3q",1m:"1u/4m, 4o/4m",3i:"4o/3i, 1u/4m",1u:"1u/a7",4G:"*/*"}},4F:{},3P:J(s){L f,2W=/=\\?(&|$)/g,1z,O;s=E.1s(P,s,E.1s(P,{},E.4I,s));7(s.O&&s.5N&&1o s.O!="25")s.O=E.3m(s.O);7(s.1H=="4E"){7(s.U.2h()=="22"){7(!s.1c.1D(2W))s.1c+=(s.1c.1D(/\\?/)?"&":"?")+(s.4E||"7d")+"=?"}N 7(!s.O||!s.O.1D(2W))s.O=(s.O?s.O+"&":"")+(s.4E||"7d")+"=?";s.1H="3i"}7(s.1H=="3i"&&(s.O&&s.O.1D(2W)||s.1c.1D(2W))){f="4E"+B++;7(s.O)s.O=(s.O+"").1r(2W,"="+f+"$1");s.1c=s.1c.1r(2W,"="+f+"$1");s.1H="1m";1e[f]=J(a){O=a;1W();1y();1e[f]=10;1S{2V 1e[f]}1X(e){}7(h)h.34(g)}}7(s.1H=="1m"&&s.1T==V)s.1T=S;7(s.1T===S&&s.U.2h()=="22"){L i=(1B 3v()).3L();L j=s.1c.1r(/(\\?|&)4r=.*?(&|$)/,"$a4="+i+"$2");s.1c=j+((j==s.1c)?(s.1c.1D(/\\?/)?"&":"?")+"4r="+i:"")}7(s.O&&s.U.2h()=="22"){s.1c+=(s.1c.1D(/\\?/)?"&":"?")+s.O;s.O=V}7(s.2a&&!E.5H++)E.16.1N("5S");7((!s.1c.1f("a3")||!s.1c.1f("//"))&&s.1H=="1m"&&s.U.2h()=="22"){L h=T.3S("6f")[0];L g=T.3s("1m");g.3Q=s.1c;7(s.7c)g.a2=s.7c;7(!f){L l=S;g.9Z=g.9Y=J(){7(!l&&(!6.39||6.39=="5V"||6.39=="1y")){l=P;1W();1y();h.34(g)}}}h.38(g);K 10}L m=S;L k=1e.78?1B 78("9X.9V"):1B 76();k.9T(s.U,s.1c,s.3l,s.6p,s.3I);1S{7(s.O)k.4C("9R-9Q",s.5P);7(s.5C)k.4C("9O-5A-9N",E.4F[s.1c]||"9L, 9K 9I 9H 5z:5z:5z 9F");k.4C("X-9C-9A","76");k.4C("9z",s.1H&&s.49[s.1H]?s.49[s.1H]+", */*":s.49.4G)}1X(e){}7(s.6Y)s.6Y(k);7(s.2a)E.16.1N("6m",[k,s]);L c=J(a){7(!m&&k&&(k.39==4||a=="2U")){m=P;7(d){6I(d);d=V}1z=a=="2U"&&"2U"||!E.6X(k)&&"3a"||s.5C&&E.6J(k,s.1c)&&"5U"||"1W";7(1z=="1W"){1S{O=E.6W(k,s.1H)}1X(e){1z="5x"}}7(1z=="1W"){L b;1S{b=k.5q("6U-5A")}1X(e){}7(s.5C&&b)E.4F[s.1c]=b;7(!f)1W()}N E.5v(s,k,1z);1y();7(s.3l)k=V}};7(s.3l){L d=53(c,13);7(s.2U>0)3z(J(){7(k){k.9t();7(!m)c("2U")}},s.2U)}1S{k.9s(s.O)}1X(e){E.5v(s,k,V,e)}7(!s.3l)c();J 1W(){7(s.1W)s.1W(O,1z);7(s.2a)E.16.1N("5Q",[k,s])}J 1y(){7(s.1y)s.1y(k,1z);7(s.2a)E.16.1N("5R",[k,s]);7(s.2a&&!--E.5H)E.16.1N("6d")}K k},5v:J(s,a,b,e){7(s.3a)s.3a(a,b,e);7(s.2a)E.16.1N("6D",[a,s,e])},5H:0,6X:J(r){1S{K!r.1z&&9q.9p=="59:"||(r.1z>=6T&&r.1z<9n)||r.1z==6R||r.1z==9l||E.14.2d&&r.1z==10}1X(e){}K S},6J:J(a,c){1S{L b=a.5q("6U-5A");K a.1z==6R||b==E.4F[c]||E.14.2d&&a.1z==10}1X(e){}K S},6W:J(r,b){L c=r.5q("9k-U");L d=b=="3M"||!b&&c&&c.1f("3M")>=0;L a=d?r.9j:r.4b;7(d&&a.1F.28=="5x")6Q"5x";7(b=="1m")E.5g(a);7(b=="3i")a=6c("("+a+")");K a},3m:J(a){L s=[];7(a.1k==1M||a.5h)E.R(a,J(){s.1g(3r(6.31)+"="+3r(6.1A))});N Q(L j 1p a)7(a[j]&&a[j].1k==1M)E.R(a[j],J(){s.1g(3r(j)+"="+3r(6))});N s.1g(3r(j)+"="+3r(a[j]));K s.6a("&").1r(/%20/g,"+")}});E.1n.1s({1G:J(c,b){K c?6.2e({1R:"1G",27:"1G",1w:"1G"},c,b):6.1E(":1Z").R(J(){6.W.19=6.5s||"";7(E.1j(6,"19")=="2H"){L a=E("<"+6.28+" />").6y("1h");6.W.19=a.1j("19");7(6.W.19=="2H")6.W.19="3D";a.1V()}}).3h()},1I:J(b,a){K b?6.2e({1R:"1I",27:"1I",1w:"1I"},b,a):6.1E(":4d").R(J(){6.5s=6.5s||E.1j(6,"19");6.W.19="2H"}).3h()},6N:E.1n.2g,2g:J(a,b){K E.1q(a)&&E.1q(b)?6.6N(a,b):a?6.2e({1R:"2g",27:"2g",1w:"2g"},a,b):6.R(J(){E(6)[E(6).3H(":1Z")?"1G":"1I"]()})},9f:J(b,a){K 6.2e({1R:"1G"},b,a)},9d:J(b,a){K 6.2e({1R:"1I"},b,a)},9c:J(b,a){K 6.2e({1R:"2g"},b,a)},9a:J(b,a){K 6.2e({1w:"1G"},b,a)},99:J(b,a){K 6.2e({1w:"1I"},b,a)},97:J(c,a,b){K 6.2e({1w:a},c,b)},2e:J(l,k,j,h){L i=E.6P(k,j,h);K 6[i.2P===S?"R":"2P"](J(){7(6.15!=1)K S;L g=E.1s({},i);L f=E(6).3H(":1Z"),4A=6;Q(L p 1p l){7(l[p]=="1I"&&f||l[p]=="1G"&&!f)K E.1q(g.1y)&&g.1y.1i(6);7(p=="1R"||p=="27"){g.19=E.1j(6,"19");g.32=6.W.32}}7(g.32!=V)6.W.32="1Z";g.40=E.1s({},l);E.R(l,J(c,a){L e=1B E.2t(4A,g,c);7(/2g|1G|1I/.17(a))e[a=="2g"?f?"1G":"1I":a](l);N{L b=a.3X().1D(/^([+-]=)?([\\d+-.]+)(.*)$/),1Y=e.2m(P)||0;7(b){L d=2M(b[2]),2A=b[3]||"2S";7(2A!="2S"){4A.W[c]=(d||1)+2A;1Y=((d||1)/e.2m(P))*1Y;4A.W[c]=1Y+2A}7(b[1])d=((b[1]=="-="?-1:1)*d)+1Y;e.45(1Y,d,2A)}N e.45(1Y,a,"")}});K P})},2P:J(a,b){7(E.1q(a)||(a&&a.1k==1M)){b=a;a="2t"}7(!a||(1o a=="25"&&!b))K A(6[0],a);K 6.R(J(){7(b.1k==1M)A(6,a,b);N{A(6,a).1g(b);7(A(6,a).M==1)b.1i(6)}})},94:J(b,c){L a=E.3G;7(b)6.2P([]);6.R(J(){Q(L i=a.M-1;i>=0;i--)7(a[i].Y==6){7(c)a[i](P);a.72(i,1)}});7(!c)6.5p();K 6}});L A=J(b,c,a){7(!b)K 10;c=c||"2t";L q=E.O(b,c+"2P");7(!q||a)q=E.O(b,c+"2P",a?E.2I(a):[]);K q};E.1n.5p=J(a){a=a||"2t";K 6.R(J(){L q=A(6,a);q.4l();7(q.M)q[0].1i(6)})};E.1s({6P:J(b,a,c){L d=b&&b.1k==92?b:{1y:c||!c&&a||E.1q(b)&&b,2u:b,3Z:c&&a||a&&a.1k!=91&&a};d.2u=(d.2u&&d.2u.1k==51?d.2u:{90:8Z,9D:6T}[d.2u])||8X;d.5y=d.1y;d.1y=J(){7(d.2P!==S)E(6).5p();7(E.1q(d.5y))d.5y.1i(6)};K d},3Z:{70:J(p,n,b,a){K b+a*p},5j:J(p,n,b,a){K((-24.8V(p*24.8U)/2)+0.5)*a+b}},3G:[],3W:V,2t:J(b,c,a){6.11=c;6.Y=b;6.1l=a;7(!c.47)c.47={}}});E.2t.2l={4y:J(){7(6.11.30)6.11.30.1i(6.Y,[6.2J,6]);(E.2t.30[6.1l]||E.2t.30.4G)(6);7(6.1l=="1R"||6.1l=="27")6.Y.W.19="3D"},2m:J(a){7(6.Y[6.1l]!=V&&6.Y.W[6.1l]==V)K 6.Y[6.1l];L r=2M(E.1j(6.Y,6.1l,a));K r&&r>-8Q?r:2M(E.2o(6.Y,6.1l))||0},45:J(c,b,d){6.5B=(1B 3v()).3L();6.1Y=c;6.3h=b;6.2A=d||6.2A||"2S";6.2J=6.1Y;6.4B=6.4w=0;6.4y();L e=6;J t(a){K e.30(a)}t.Y=6.Y;E.3G.1g(t);7(E.3W==V){E.3W=53(J(){L a=E.3G;Q(L i=0;i<a.M;i++)7(!a[i]())a.72(i--,1);7(!a.M){6I(E.3W);E.3W=V}},13)}},1G:J(){6.11.47[6.1l]=E.1J(6.Y.W,6.1l);6.11.1G=P;6.45(0,6.2m());7(6.1l=="27"||6.1l=="1R")6.Y.W[6.1l]="8N";E(6.Y).1G()},1I:J(){6.11.47[6.1l]=E.1J(6.Y.W,6.1l);6.11.1I=P;6.45(6.2m(),0)},30:J(a){L t=(1B 3v()).3L();7(a||t>6.11.2u+6.5B){6.2J=6.3h;6.4B=6.4w=1;6.4y();6.11.40[6.1l]=P;L b=P;Q(L i 1p 6.11.40)7(6.11.40[i]!==P)b=S;7(b){7(6.11.19!=V){6.Y.W.32=6.11.32;6.Y.W.19=6.11.19;7(E.1j(6.Y,"19")=="2H")6.Y.W.19="3D"}7(6.11.1I)6.Y.W.19="2H";7(6.11.1I||6.11.1G)Q(L p 1p 6.11.40)E.1J(6.Y.W,p,6.11.47[p])}7(b&&E.1q(6.11.1y))6.11.1y.1i(6.Y);K S}N{L n=t-6.5B;6.4w=n/6.11.2u;6.4B=E.3Z[6.11.3Z||(E.3Z.5j?"5j":"70")](6.4w,n,0,1,6.11.2u);6.2J=6.1Y+((6.3h-6.1Y)*6.4B);6.4y()}K P}};E.2t.30={2v:J(a){a.Y.2v=a.2J},2x:J(a){a.Y.2x=a.2J},1w:J(a){E.1J(a.Y.W,"1w",a.2J)},4G:J(a){a.Y.W[a.1l]=a.2J+a.2A}};E.1n.5L=J(){L b=0,3b=0,Y=6[0],5l;7(Y)8M(E.14){L d=Y.1a,41=Y,1K=Y.1K,1L=Y.2i,5D=2d&&4s(5K)<8J&&!/a1/i.17(v),2T=E.1j(Y,"43")=="2T";7(Y.6G){L c=Y.6G();1b(c.26+24.2f(1L.1F.2v,1L.1h.2v),c.3b+24.2f(1L.1F.2x,1L.1h.2x));1b(-1L.1F.62,-1L.1F.60)}N{1b(Y.5G,Y.5F);2b(1K){1b(1K.5G,1K.5F);7(48&&!/^t(8H|d|h)$/i.17(1K.28)||2d&&!5D)2N(1K);7(!2T&&E.1j(1K,"43")=="2T")2T=P;41=/^1h$/i.17(1K.28)?41:1K;1K=1K.1K}2b(d&&d.28&&!/^1h|3q$/i.17(d.28)){7(!/^8G|1O.*$/i.17(E.1j(d,"19")))1b(-d.2v,-d.2x);7(48&&E.1j(d,"32")!="4d")2N(d);d=d.1a}7((5D&&(2T||E.1j(41,"43")=="4W"))||(48&&E.1j(41,"43")!="4W"))1b(-1L.1h.5G,-1L.1h.5F);7(2T)1b(24.2f(1L.1F.2v,1L.1h.2v),24.2f(1L.1F.2x,1L.1h.2x))}5l={3b:3b,26:b}}J 2N(a){1b(E.2o(a,"a8",P),E.2o(a,"a9",P))}J 1b(l,t){b+=4s(l)||0;3b+=4s(t)||0}K 5l}})();',62,631,'||||||this|if||||||||||||||||||||||||||||||||||||||function|return|var|length|else|data|true|for|each|false|document|type|null|style||elem||undefined|options|nodeName||browser|nodeType|event|test|arguments|display|parentNode|add|url|msie|window|indexOf|push|body|apply|css|constructor|prop|script|fn|typeof|in|isFunction|replace|extend|className|text|handle|opacity|div|complete|status|value|new|firstChild|match|filter|documentElement|show|dataType|hide|attr|offsetParent|doc|Array|trigger|table|call|break|height|try|cache|tbody|remove|success|catch|start|hidden||ready|get|split|Math|string|left|width|tagName|ret|global|while|map|safari|animate|max|toggle|toLowerCase|ownerDocument|bind|select|prototype|cur||curCSS|selected|handler|done|find|fx|duration|scrollLeft|id|scrollTop|special|opera|unit|nextSibling|stack|guid|toUpperCase|pushStack|button|none|makeArray|now|slice|target|parseFloat|border|exec|queue|isReady|events|px|fixed|timeout|delete|jsre|one|disabled|nth|step|name|overflow|inArray|removeChild|removeData|preventDefault|merge|appendChild|readyState|error|top|which|innerHTML|multiFilter|rl|trim|end|json|first|checked|async|param|elems|insertBefore|childNodes|html|encodeURIComponent|createElement|append|form|Date|unbind|color|grep|setTimeout|readyList|mouseleave|mouseenter|block|isXMLDoc|addEventListener|timers|is|password|last|runtimeStyle|getTime|xml|jQuery|domManip|ajax|src|callee|getElementsByTagName|selectedIndex|load|object|timerId|toString|has|easing|curAnim|offsetChild|args|position|stopPropagation|custom|props|orig|mozilla|accepts|clean|responseText|defaultView|visible|String|charCode|float|teardown|on|setup|nodeIndex|shift|javascript|currentStyle|application|child|RegExp|_|parseInt|previousSibling|dir|tr|state|empty|update|getAttribute|self|pos|setRequestHeader|input|jsonp|lastModified|_default|unload|ajaxSettings|unshift|getComputedStyle|styleSheets|getPropertyValue|lastToggle|mouseout|mouseover|GET|andSelf|relatedTarget|init|visibility|click|absolute|index|container|fix|outline|Number|removeAttribute|setInterval|prevObject|classFilter|not|unique|submit|file|after|windowData|deep|scroll|client|triggered|globalEval|jquery|sibling|swing|clone|results|wrapAll|triggerHandler|lastChild|dequeue|getResponseHeader|createTextNode|oldblock|checkbox|radio|handleError|fromElement|parsererror|old|00|Modified|startTime|ifModified|safari2|getWH|offsetTop|offsetLeft|active|values|getElementById|version|offset|bindReady|processData|val|contentType|ajaxSuccess|ajaxComplete|ajaxStart|serializeArray|notmodified|loaded|DOMContentLoaded|Width|ctrlKey|keyCode|clientTop|POST|clientLeft|clientX|pageX|exclusive|detachEvent|removeEventListener|swap|cloneNode|join|attachEvent|eval|ajaxStop|substr|head|parse|textarea|reset|image|zoom|odd|ajaxSend|even|before|username|prepend|expr|quickClass|uuid|quickID|quickChild|continue|textContent|appendTo|contents|evalScript|parent|defaultValue|ajaxError|setArray|compatMode|getBoundingClientRect|styleFloat|clearInterval|httpNotModified|nodeValue|100|alpha|_toggle|href|speed|throw|304|replaceWith|200|Last|colgroup|httpData|httpSuccess|beforeSend|eq|linear|concat|splice|fieldset|multiple|cssFloat|XMLHttpRequest|webkit|ActiveXObject|CSS1Compat|link|metaKey|scriptCharset|callback|col|pixelLeft|urlencoded|www|post|hasClass|getJSON|getScript|elements|serialize|black|keyup|keypress|solid|change|mousemove|mouseup|dblclick|resize|focus|blur|stylesheet|rel|doScroll|round|hover|padding|offsetHeight|mousedown|offsetWidth|Bottom|Top|keydown|clientY|Right|pageY|Left|toElement|srcElement|cancelBubble|returnValue|charAt|0n|substring|animated|header|noConflict|line|enabled|innerText|contains|only|weight|ajaxSetup|font|size|gt|lt|uFFFF|u0128|417|Boolean|inner|Height|toggleClass|removeClass|addClass|removeAttr|replaceAll|insertAfter|prependTo|contentWindow|contentDocument|wrap|iframe|children|siblings|prevAll|nextAll|prev|wrapInner|next|parents|maxLength|maxlength|readOnly|readonly|reverse|class|htmlFor|inline|able|boxModel|522|setData|compatible|with|1px|ie|getData|10000|ra|it|rv|PI|cos|userAgent|400|navigator|600|slow|Function|Object|array|stop|ig|NaN|fadeTo|option|fadeOut|fadeIn|setAttribute|slideToggle|slideUp|changed|slideDown|be|can|property|responseXML|content|1223|getAttributeNode|300|method|protocol|location|action|send|abort|cssText|th|td|cap|specified|Accept|With|colg|Requested|fast|tfoot|GMT|thead|1970|Jan|attributes|01|Thu|leg|Since|If|opt|Type|Content|embed|open|area|XMLHTTP|hr|Microsoft|onreadystatechange|onload|meta|adobeair|charset|http|1_|img|br|plain|borderLeftWidth|borderTopWidth|abbr'.split('|'),0,{}));

// Old style tag fetcher
function $$(tag_name){
	return document.getElementsByTagName(tag_name);
}

// Output function, alternative to alert, logs to firebug console
function log(lvl, arg) {
	if (DEBUG && DEBUG !== 0) {
		if (DEBUG > 0 && lvl == 1) { console.log('[error]: '+arg); }
		if (DEBUG > 1 && lvl == 2) { console.log('[failure]: '+arg); }
		if (DEBUG > 2 && lvl == 3) { console.log('[message]: '+arg); }
	} else { return; }
}

// Make remote calls
function ajax(url, type, async) {
	var xhReq = new XMLHttpRequest();
	if (type != "POST") { type = "GET"; }
	if (async !== true) { async = false; }
	xhReq.open(type, url, async);
	xhReq.send(null);
	log(3, "XMLHttpRequest to "+url);
	return xhReq;
}

// Set a temporary variable
function setVar(name, new_val){
	if (typeof unsafeWindow == "object") {
		unsafeWindow[name] = new_val;
		log(3, name+' set into unsafeWindow [ setVar ]');
	} else if(TW_Is_Opera) {
		window[name] = new_val;
	}
}

// Read a temporary variable
function getVar(name) {
	if (typeof unsafeWindow == "object") {
		return unsafeWindow[name];
	} else {
		return window[name];
	}
}

// Set a function to run in the unsafe area
function setFunc(func, new_func) {
	if (typeof unsafeWindow == "object") {
		unsafeWindow[func] = new_func;
		log(3, func+' set into unsafeWindow [ setFunc ]');
	} else if(TW_Is_Opera) {
		window[func] = new_func;
	}
}

// Get a function from the unsafe area
function getFunc(func){
	if (typeof unsafeWindow == "object") {
		return unsafeWindow[func];
	} else {
		return window[func];
	}
}

// Check if we're using Opera or Firefox
function isOpera() {
	return $.browser.opera;
}

// Persistent Storage
function setValueGlobal(key, new_val) {
	if(!isOpera()){
//                GM_setValue("TWE" + key, encodeURIComponent(new_val));
		GM_setValue("TWE_"+twe.myID()+"_"+key, uneval(new_val));
		return;
	}
	// Opera patch
	document.cookie = escape(key) + "=" + escape(new_val) + ";expires=" + (new Date((new Date()).getTime() + 31536000000)).toGMTString() + ";path=/";
}
function setValue(key, new_val) {
	//setValueGlobal(key, new_val);
	GM_setValue("TWE_"+twe.Unique()+"_"+key, uneval(new_val));
}
function getValueGlobal(key) {
	if(!isOpera()) {
		return eval(GM_getValue("TWE_"+twe.myID()+"_"+key));
	}
	// Opera patch
	var all_cookies = document.cookie.split("; ");
	for(kk=0; kk<all_cookies.length; kk++){
		var this_cookie = all_cookies[kk];
		var tmp = this_cookie.split("=");
		if(tmp[0] == key){
			return unescape(tmp[1]);
		}
	}
	return null;
}

function getValue(key) {
	//ret = getValueGlobal(key);
	//if(!ret && arguments[1]) return getgetValueGlobal(arguments[1]);
	return eval(GM_getValue("TWE_"+twe.Unique()+"_"+key));
}

function delValue(key) {
	//key = key;
	if(!getValue(twe.Unique()+"_"+key)) { return; }
	if(!isOpera()) { GM_setValue("TWE_"+twe.Unique()+"_"+key, ""); }
	// Opera patch
	document.cookie = key + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

function array_flip( trans ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_flip( {a: 1, b: 1, c: 2} );
    // *     returns 1: {1: 'b', 2: 'c'}
	var tmp_ar = {};
	for(var key in trans ) {
		tmp_ar[trans[key]] = key;
	}
	return tmp_ar;
}

// XPath
function xpathGetFirst(xpath) {
	return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
}

// XPath helper from http://wiki.greasespot.net/Code_snippets#XPath_helper
function xpathGetAll(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}


personals = {
	villageGroups : function() { // Grab all the available groups
		if (! getValue("villageGroups") || getValue("villageGroups") == 'undefined') {
			return [];
		} else {
			var val = getValue("villageGroups");
			var grps = [];
			for (i = 0; i < val.length; i++) {
				var grpinfo = getValue("GroupInfo_"+val[i]);
				if (new String(grpinfo) != 'undefined' && new String(grpinfo) != '') {
					var tmp = grpinfo;
					if (!tmp.show) { tmp.show = '1'; }
					grps.push('({"id":"'+val[i]+'" ,"name":"'+tmp.name+'","show":"'+tmp.show+'"})');
				}

			}
			return grps;
		}
	},
 getUserVillages : function() { // Grab the users villages 
	 var villageSet = $("table.vis tr[class^='nowrap row_']");
	 var villages = {};
	 for (i = 0; i < villageSet.length; i++) { // loop through the found links
		 var cells = villageSet[i].getElementsByTagName("td");

		 var tmpId = cells[0].innerHTML.match( /village=([^&]+)/ );
				// fr9 doesn't have contintents
                                //var tmpDetails = cells[0].innerHTML.match( /">(.+) \((\d+)\|(-?\d+)\) K(\d+)<\/sp/ );
		 var tmpDetails = cells[0].innerHTML.match( /">(.+) \((-?\d+)\|(-?\d+)\)(?: K(\d+))?<\/sp/ );
		 var tmpPoints = cells[1].innerHTML.replace(/<span(.+)>.<\/span>/gi, ".");
		 var tmpPointsInt = parseInt(cells[1].innerHTML.replace(/<span(.+)>.<\/span>/gi, ""));

		 var vilinfo = new String(getValue("villageinfo_"+tmpId[1]));

		 if (vilinfo != 'undefined') {
			 vilinfo = vilinfo.split(",");
			 var tmpGrp = vilinfo[0];
			 var tmpAlias = decodeURIComponent(vilinfo[1]);
			 tmpAlias = tmpAlias.replace(/%/g, tmpDetails[1]);
		 } else {
			 var tmpGrp = '0';
			 var tmpAlias = '';
		 }

		 villages[tmpId[1]] = {id: tmpId[1], name: tmpDetails[1], x: parseInt(tmpDetails[2]), y: parseInt(tmpDetails[3]), continent: tmpDetails[4], points: tmpPoints, pointsint: tmpPointsInt,group: tmpGrp,alias: tmpAlias, resourcesHTML:cells[2].innerHTML};
		 //log(3, "villages="+uneval(villages));
	 }
	 villages.length = villageSet.length;
                // And now set the result into the memory
	 setValue("myVillages", villages);
                //return twe.myVillages(); // return it here
 },
 getCurrentVillage : function() { // Grab the currently selected village
	 if (twe.curVillage === null) {
		 try {
		 		var cur = $("a:first").attr("href");
				cur = cur.replace(/(.+)village=([^&]+)(.+)/g, "$2");
				twe.curVillage = cur;
		 } catch(e) {
			 log(1, "Failed to properly execute getCurrentVillage. js error:\n"+e);
			 twe.curVillage = null;
		 }
		 /*
		 
			 var tmp = cur[0].getAttribute("href").match(/village=([^&]+)/);
			 twe.curVillage = tmp[1];
		 */
	 }
	 return twe.curVillage;
 },
 getImageBase : function() { // Grab the base of the images
	 if (! getValueGlobal("imgBase") || getValueGlobal("imgBase").length < 5 || getValueGlobal("imgBase") == 'undefined') {
		 return "/graphic/";
	 } else {
		 return getValueGlobal("imgBase");
	 }
 }
};

twe = { // TWE data
	myID : function() { // My user ID
		if(! getVar('myID') || getVar('myID') == 'undefined') {
			xhReq = ajax(twe.Server+"/guest.php?screen=info_village&id="+personals.getCurrentVillage(), "GET");
			var tmp = xhReq.responseText.match( /info_player&amp;id=([^"]+)/ );
			var id = tmp && tmp[1] ? tmp[1] : null;
			setVar("myID", id);
		}
		return getVar('myID');
	},
 myVillages : function() { // My villages
	 if (twe.Screen == "overview_villages" || ! getValue("myVillages") || getValue("myVillages") === 'undefined') {
		 personals.getUserVillages();
	 }
	 return getValue("myVillages");
 },
 lang : function(field) { // Grab the language tag
	 TW_Lang = languages[twe.Language];
	 if(!TW_Lang) { TW_Lang = languages.en; }
	 if(TW_Lang[field]) {
		 return TW_Lang[field];
	 } else {
		 log(1, "Missing language tag for '"+field+"' in language '"+twe.Language+"'");
		 return '{'+field+'}';
	 }
 },
 getPlugins : function() { // Grab the enabled/disabled info for plugins

	 var val = getValueGlobal("plugins");
	 if (! val || val == 'undefined') {
		 return [];
	 } else {
		 return val;
	 }
 },
 setPlugin : function(name) { // Add or remove a plugin from the disabled list
	 var val = getValueGlobal("plugins");

	 if (! val || new String(val) == 'undefined') {
		 setValueGlobal("plugins", new Array(name));
		 log(2, "Disabled plugin: "+name);
	 } else {

		 if (val.indexOf(name) != -1) {
			 val.splice(val.indexOf(name), 1);
			 var tmp = val;

		 } else {
			 val.push(name);
			 tmp = val;
		 }

		 setValueGlobal("plugins", tmp);
		 log(2, "Switched status of plugin: "+name);
	 }
 },
 curVillage : null,

        // A unique string for each world per user
 Unique : function() { return twe.myID()+"_"+twe.World; }, // twe.myID() performs an XMLHttpRequest

        // Are we super duper premium members?
 Premium : ($("quickbar").length > 0) ? true : false,

        // Get the screen variable
 Screen : location.href.replace(/^(.+)\/(\w+)\.php(.+)screen=(\w+)(.*)$/i,"$4"),

        // Get the page we're viewing
 Page: location.href.replace(/^(.+)\/(\w+)\.php(.+)screen=(\w+)(.*)$/i,"$2"),

        // Get the world we're playing
 World: location.href.replace(/^http:\/\/(\w+)\.(\w+)\.(\w+)\/(.*)$/i,"$1"),

        // Get the language we're playing in
 Language: location.href.replace(/^http:\/\/(\w+)(\d+)\.(\w+)\.(\w+)\/(.*)$/i,"$1"),

        // Get the server we're playing
 Server: location.href.replace(/^(.+)\/(\w+)\.php(.*)$/i,"$1")
};


languages = { // Language tags
	"en" : {
		"villages" : "Villages",
		"overview" : "Village overview",
		"map"      : "Map",
		"main"     : "Village Headquarters",
		"place"    : "Rally point",
		"train"    : "Train",
		"barracks" : "Barracks",
		"stable"   : "Stable",
		"garage"   : "Workshop",
		"smith"    : "Smithy",
		"statue"   : "Statue",
		"market"   : "Market",
		"snob"     : "Academy",
		"player"   : "User",
		"tribe"    : "Tribe",
		"i_player" : "Show player information",
		"i_tribe"  : "Show tribe information",
		"loading"  : "Loading...",
		"c_close"  : "Click to close",
		"track"    : "track village",
		"tracked"  : "Village tracked",
		"untrked"  : "Village untracked",
		"untrack"  : "untrack village",
		"cltrack"  : "clear all",
		"notrack"  : "No tracked villages",
		"oktrack"  : "tracked villages",
		"at_none"  : "Attack again",
		"at_same"  : "Attack again with the same troops",
		"at_all"   : "Attack again with all troops",
		"mapsize"  : "Map size",
		"pop_close": "Close",
		"pop_auto" : "Show automatically:",
		"group_toggle" : "Show/hide group configuration",
		"group_edit" : "save changes",
		"group_moveup" : "Move this group up",
		"group_remove" : "Delete",
		"group_add" : "Add",
		"group_village" : "Villages",
		"group_nogroup" : "ungrouped",
		"group_action" : "Action",
		"group_store" : "Update groups",
		"group_storeDone" : "Groups updates! Reloading the overview page..",
		"group_name" : "Group name",
		"group_ingroup" : "Current group",
		"overview_nogroup" : "Ungrouped villages",
		"overview_village" : "Villages",
		"overview_points" : "Points",
		"overview_resources" : "Resources",
		"overview_warehouse" : "Warehouse",
		"overview_farm" : "Farm",
		"main_setaliasheader" : "Change village alias:",
		"main_setalias" : "Save alias",
		"main_setaliasdone" : "Alias saved!",
		"setting_show" : "TW Enhancer",
		"setting_name" : "Plugin name",
		"setting_toggle" : "Enable/Disable",
		"setting_label_desc" : "Description",
		"setting_label_version" : "Version",
		"setting_label_dev" : "Developer",
		"setting_label_exec" : "Runs for",
  		"tw_scan" : "TribalWars just tried to scan you for using scripts!"
	},

 "ro" : { // Romanian
	 "villages" : "Sate",
  "overview" : "Privire generală asupra satului",
  "map"      : "Hartă",
  "main"     : "Clădirea principală",
  "place"    : "Piaţa centrală",
  "train"    : "Recrutare",
  "barracks" : "Cazarmă",
  "stable"   : "Grajd",
  "garage"   : "Atelier",
  "smith"    : "Fierărie",
  "statue"   : "Statuie",
  "market"   : "Tîrg",
  "snob"     : "Curte nobilă",
  "player"   : "Jucător",
  "tribe"    : "Trib",
  "i_player" : "Arată informaţii despre acest jucător",
  "i_tribe"  : "Arată informaţii despre acest trib",
  "loading"  : "Sencarcă...",
  "c_close"  : "Click pt închidere",
  "track"    : "adaugă la istoric",
  "tracked"  : "Sat adăugat",
  "untrked"  : "Sat şters",
  "untrack"  : "şterge din istoric",
  "cltrack"  : "şterge istoric",
  "notrack"  : "Nici un sat în istoric",
  "oktrack"  : "sate în istoric",
  "at_none"  : "Atacă din nou",
  "at_same"  : "Atacă din nou cu aceleaşi trupe",
  "at_all"   : "Ataca din nou cu toate trupele",
  "mapsize"  : "Dimensiune harta",
  "pop_close": "{close_pop}",
  "pop_auto" : "{auto_pop}"
 },


 "cz"    : { // Czech
	 "villages"              : "Vesnice",
  "overview"              : "Náhled vesnice",
  "map"                   : "Mapa",
  "main"                  : "Hlavní budova",
  "place"                 : "Nádvoří",
  "train"                 : "Výcvik",
  "barracks"              : "Kasárna",
  "stable"                : "Stáj",
  "garage"                : "Dílna",
  "smith"                 : "Kovárna",
  "statue"                : "Socha",
  "market"                : "Tržiště",
  "snob"                  : "Panský dvůr",
  "player"                : "Hráč",
  "tribe"                 : "Kmen",
  "i_player"              : "Zobraz info o hráči",
  "i_tribe"               : "Zobraz info o kmenu",
  "loading"               : "Načítám...",
  "c_close"               : "Klepnutím zavřít",
  "track"                 : "Sledovat vesnici",
  "tracked"               : "Vesnice sledována",
  "untrked"               : "Sledování zrušeno",
  "untrack"               : "Zrušit sledování",
  "cltrack"               : "Zrušit vše",
  "notrack"               : "Žádné sledované vesnice",
  "oktrack"               : "Sledované vesnice",
  "at_none"               : "Zaútočit znovu",
  "at_same"               : "Zaútočit znovu stejnými jednotkami",
  "at_all"                : "Zaútočit znovu všemi jednotkami",
  "mapsize"               : "Velikost mapy",
  "pop_close"             : "Zavřít",
  "pop_auto"              : "Automaticky zobrazit",
  "group_toggle"          : "Zobrazit/skrýt nastavení skupiny",
  "group_edit"            : "Uložit změny",
  "group_moveup"          : "Tuto skupinu přesunout výše",
  "group_remove"          : "Odstranit",
  "group_add"             : "Přidat",
  "group_village"         : "Vesnice",
  "group_nogroup"         : "neseskupeno",
  "group_action"          : "Akce",
  "group_store"           : "Aktualizovat skupiny",
  "group_storeDone"       : "Aktualizace skupin! Načítám stranu náhledu...",
  "group_name"            : "Název skupiny",
  "group_ingroup"         : "Aktuální skupina",
  "overview_nogroup"      : "Neseskupené vesnice",
  "overview_village"      : "Vesnice",
  "overview_points"       : "Body",
  "overview_resources"    : "Zdroje",
  "overview_warehouse"    : "Skladiště",
  "overview_farm"         : "Statek",
  "main_setaliasheader"   : "Změna aliasu vesnice:",
  "main_setalias"         : "Uložit alias",
  "main_setaliasdone"     : "Alias uložen!",
  "setting_show"          : "TW Enhancer",
  "setting_name"          : "Název zásuvky",
  "setting_toggle"        : "Povolit/Zakázat",
  "setting_label_desc"    : "Popis",
  "setting_label_version" : "Verze",
  "setting_label_dev"     : "Vývojář",
  "setting_label_exec"    : "Běhá pro",
  "tw_scan"               : "DivokéKmeny se tě právě pokusily zkontrolovat na používání automatizace!"
 },


 "nl" : { // Dutch
	 	"villages" : "Dorpen",
		"overview" : "Dorpoverzicht",
		"map"      : "Kaart",
		"main"     : "Hoofdgebouw",
		"place"    : "Verzamelplaats",
		"train"    : "Train",
		"barracks" : "Kazerne",
		"stable"   : "Stal",
		"garage"   : "Werkplaats",
		"smith"    : "Smederij",
		"statue"   : "Standbeeld",
		"market"   : "Marktplaats",
		"snob"     : "Adelshoeve",
		"player"   : "Speler",
		"tribe"    : "Stam",
		"i_player" : "Toon speler informatie",
		"i_tribe"  : "Toon stam informatie",
		"loading"  : "Laden...",
		"c_close"  : "Klik om te sluiten",
		"track"    : "Houd een dorp bij",
		"tracked"  : "Dorp word bijgehouden",
		"untrked"  : "Dorp wordt niet meer bijgehouden",
		"untrack"  : "Dorp niet langer bijhouden",
		"cltrack"  : "Leeg de lijst van bijgehouden dorpen",
		"notrack"  : "Geen enkel dorp word bijgehouden",
		"oktrack"  : "Bijgehouden dorpen",
		"at_none"  : "Val nogmaals aan",
		"at_same"  : "Val nogmaals aan met dezelfde troepen",
		"at_all"   : "Val nogmaals aan met al je troepen",
		"mapsize"  : "",
		"pop_close": "Sluit scherm",
		"pop_auto" : "Automatisch openen:",
		"group_toggle" : "Bekijk/verberg groep configuratie",
		"group_edit" : "Opslaan",
		"group_moveup" : "Schuif deze groep omhoog",
		"group_remove" : "Verwijder",
		"group_add" : "Voeg toe",
		"group_village" : "Dorpen",
		"group_nogroup" : "Niet gegroepeerd",
		"group_action" : "Actie",
		"group_store" : "Groepen aanpassen",
		"group_storeDone" : "Groepen aangepast! Pagina word nu herladen..",
		"group_name" : "Groep naam",
		"group_ingroup" : "Huidige groep",
		"overview_nogroup" : "Niet gegroepeerde dorpen",
		"overview_village" : "Dorp",
		"overview_points" : "Punten",
		"overview_resources" : "Goederen",
		"overview_warehouse" : "Warenhuis",
		"overview_farm" : "Boederij",
		"main_setaliasheader" : "Wijzig de alias",
		"main_setalias" : "Sla op",
		"main_setaliasdone" : "Alias opgeslagen!",
		"setting_show" : "TW Enhancer",
		"setting_name" : "Plugin naan",
		"setting_toggle" : "Aanzetten/Uitzetten",
		"setting_label_desc" : "Beschrijving",
		"setting_label_version" : "Versie",
		"setting_label_dev" : "Ontwikkelaar",
		"setting_label_exec" : "Werkt voor",
  		"tw_scan" : "TribalWars heeft zojuist geprobeert het gebruik van scripts te detecteren!"
 },

 "se" : { // Swedish
	 "villages" : "Byar",
  "overview" : "Byöversikt",
  "map"      : "Karta",
  "main"     : "Högkvarter",
  "place"    : "Sammlingsplats",
  "train"    : "Rekrytera",
  "barracks" : "Barrack",
  "stable"   : "Stall",
  "garage"   : "Verkstad",
  "smith"    : "Smedja",
  "statue"   : "Staty",
  "market"   : "Marknad",
  "snob"     : "Akademi",
  "player"   : "Användare",
  "tribe"    : "Stam",
  "i_player" : "Visa spelar information",
  "i_tribe"  : "Visa stam information",
  "loading"  : "Laddar...",
  "c_close"  : "Stäng",
  "track"    : "Spåra by",
  "tracked"  : "Byn spårad",
  "untrked"  : "By ospårad",
  "untrack"  : "Sluta spåra by",
  "cltrack"  : "Rensa alla",
  "notrack"  : "Inga byar spårade",
  "oktrack"  : "Spårade byar",
  "at_none"  : "Attackera igen",
  "at_same"  : "Attackera igen med samma trupp",
  "at_all"   : "Attackera igen med alla trupper",
  "mapsize"  : "{Map size}",
  "pop_close": "{close_pop}",
  "pop_auto" : "{auto_pop}"
 },


 "es" : { // Spanish
	 "villages" : "Pueblos",
  "overview" : "Visión general del pueblo",
  "map"      : "Mapa",
  "main"     : "Edificio principal",
  "place"    : "Plaza de Reuniones",
  "train"    : "{Train}",
  "barracks" : "Cuartel",
  "stable"   : "Cuadra",
  "garage"   : "Taller",
  "smith"    : "Herrería",
  "statue"   : "Estatua",
  "market"   : "Plaza del Mercado",
  "snob"     : "Corte aristócrata",
  "player"   : "Jugadore",
  "tribe"    : "Tribu",
  "i_player" : "Demuestre la información del jugador",
  "i_tribe"  : "Demuestre la información del tribu",
  "loading"  : "Cargamento...",
  "c_close"  : "Hacer click a cerrarse",
  "track"    : "{track village}",
  "tracked"  : "{Village tracked}",
  "untrked"  : "{Village untracked}",
  "untrack"  : "{untrack village}",
  "cltrack"  : "{clear all}",
  "notrack"  : "{No tracked villages}",
  "oktrack"  : "{tracked villages}",
  "at_none"  : "Ataque otra vez",
  "at_same"  : "Ataque otra vez con las mismas tropas",
  "at_all"   : "Ataque otra vez con todas las tropas",
  "mapsize"  : "{Map size}",
  "pop_close": "{close_pop}",
  "pop_auto" : "{auto_pop}"
 },


 "fr" : {
	 "villages" : "Villages",
  "overview" : "Vues d'ensemble",
  "map"      : "Carte",
  "main"     : " Quartier général",
  "place"    : "Point de ralliement",
  "train"    : "Recrutement",
  "barracks" : "Caserne",
  "stable"   : "Ecurie",
  "garage"   : "Atelier",
  "smith"    : "Forge",
  "statue"   : "Statue",
  "market"   : "Marché",
  "snob"     : "Academie",
  "player"   : "joueur",
  "tribe"    : "Tribu",
  "i_player" : "Montrez l'information du joueur",
  "i_tribe"  : "Montrez l'information de la tribu",
  "loading"  : "Chargement...",
  "c_close"  : "Cliquez pour fermer",
  "track"    : "Surveiller un village",
  "tracked"  : "Village surveiller",
  "untrked"  : "Village non surveiller",
  "untrack"  : "non surveiller village",
  "cltrack"  : "effacer tout",
  "notrack"  : "Aucun village surveiller",
  "oktrack"  : "Village surveiller",
  "at_none"  : "Attaquer encore",
  "at_same"  : "Attaquer encore avec les meme troupes",
  "at_all"   : "Attaquer encore avec toutes les troupes",
  "mapsize"  : "Taille de la carte ",
  "pop_close": "Fermer",
  "pop_auto" : "Montrer automatiquement:",
  "group_toggle" : "Montrer/Cacher les groupes",
  "group_edit" : "Sauver les changements",
  "group_moveup" : "Deplacer dans un groupe",
  "group_remove" : "Supprimer",
  "group_add" : "Ajouter",
  "group_village" : "Villages",
  "group_nogroup" : "Dégrouper",
  "group_action" : "Action",
  "group_store" : "Mise a jour des groupes",
  "group_storeDone" : "Groupes mise a jour! actualisation de la page...",
  "group_name" : "Nom du groupe",
  "group_ingroup" : "Groupe Actuel",
  "overview_nogroup" : "Séparer les villages",
  "overview_village" : "Villages",
  "overview_points" : "Points",
  "overview_resources" : "Ressources",
  "overview_warehouse" : "entrepôt",
  "overview_farm" : "Ferme",
  "main_setaliasheader" : "Changer le pseudo du village",
  "main_setalias" : "Enregistrer l'alias",
  "main_setaliasdone" : "Alias sauvegarder!",
  "setting_show" : "TW Enhancer",
  "setting_name" : "Nom du Plugin",
  "setting_toggle" : "Enable/Disable",
  "setting_label_desc" : "Description",
  "setting_label_version" : "Version",
  "setting_label_dev" : "Developeur",
  "setting_label_exec" : "Lancer pour",
  "tw_scan" : "TribalWars scans pour savoir si il y a un script!"
 },

 "it" : { // Italian
	 "villages" : "Villaggi",
  "overview" : "Piantina del villaggio",
  "map"      : "Mappa",
  "main"     : "Quartier Generale",
  "place"    : "Punto di raduno",
  "train"    : "{Train}",
  "barracks" : "Caserma",
  "stable"   : "Stalla",
  "garage"   : "Officina",
  "smith"    : "Fabbro",
  "statue"   : "Statua",
  "market"   : "Mercato",
  "snob"     : "Accademia",
  "player"   : "Giocatore",
  "tribe"    : "Tribù",
  "i_player" : "Mostri le informazioni del giocatore",
  "i_tribe"  : "Mostri le informazioni del tribù",
  "loading"  : "Caricamento...",
  "c_close"  : "Scatto da chiudersi",
  "track"    : "{track village}",
  "tracked"  : "{Village tracked}",
  "untrked"  : "{Village untracked}",
  "untrack"  : "{untrack village}",
  "cltrack"  : "{clear all}",
  "notrack"  : "{No tracked villages}",
  "oktrack"  : "{tracked villages}",
  "at_none"  : "Attacco ancora",
  "at_same"  : "Attacco ancora con le stesse truppe",
  "at_all"   : "Attacco ancora con tutte le truppe",
  "mapsize"  : "{Map size}",
  "pop_close": "{close_pop}",
  "pop_auto" : "{auto_pop}"
 },


 "pl" : { // Polish
	 "villages" : "Przegląd wioski",
  "overview" : "Przeglądy",
  "map"      : "Mapa",
  "main"     : "Ratusz",
  "place"    : "Plac",
  "train"    : "Rekrutuj",
  "barracks" : "Koszary",
  "stable"   : "Stajnia",
  "garage"   : "Warsztat",
  "smith"    : "Kuźnia",
  "statue"   : "Piedestał",
  "market"   : "Rynek",
  "snob"     : "Pałac",
  "player"   : "Gracz",
  "tribe"    : "Wioska",
  "i_player" : "Pokaż informacje o graczu",
  "i_tribe"  : "Pokaż informacje o wiosce",
  "loading"  : "Odświeżanie...",
  "c_close"  : "Zamknij",
  "track"    : "Badaj wioskę",
  "tracked"  : "Wioska badana",
  "untrked"  : "Wioska bez badania",
  "untrack"  : "Zaprzestaj badania",
  "cltrack"  : "wyczyść",
  "notrack"  : "No tracked villages",
  "oktrack"  : "tracked villages",
  "at_none"  : "Ponowny atak",
  "at_same"  : "Ponowny atak tymi samymi jednostkami",
  "at_all"   : "Ponowny atak wszystkimi jednostkami"
 },
 
 "br" : { //Brazilian
	 "villages" : "Aldeias",
  "overview" : "Visualização",
  "map"      : "Mapa",
  "main"     : "Edifício Principal",
  "place"    : "Praça de Reunião",
  "train"    : "Recrutar",
  "barracks" : "Quartel",
  "stable"   : "Estábulo",
  "garage"   : "Oficina",
  "smith"    : "Ferreiro",
  "statue"   : "Estátua",
  "market"   : "Mercado",
  "snob"     : "Academia",
  "player"   : "Jogador",
  "tribe"    : "Tribo",
  "i_player" : "Exibir informação do jogador",
  "i_tribe"  : "Exibir informação da tribo",
  "loading"  : "Carregando...",
  "c_close"  : "Clique para fechar",
  "track"    : "Rastrear Aldeia",
  "tracked"  : "Aldeia rastreada",
  "untrked"  : "Aldeia não rastreada",
  "untrack"  : "Parar rastreamento",
  "cltrack"  : "Limpar tudo",
  "notrack"  : "Sem Aldeias rastreadas",
  "oktrack"  : "aldeias rastreadas",
  "at_none"  : "Atacar novamente",
  "at_same"  : "Atacar novamente com as mesmas tropas ",
  "at_all"   : "Atacar novamente com todas as tropas ",
  "mapsize"  : "Tamanho do mapa",
  "pop_close": "Fechar",
  "pop_auto" : "Exibir automaticamente:"
 },
 
 "de" : { //German
	 "villages" : "Dörfer",
  "overview" : "Dorfübersicht",
  "map"      : "Karte",
  "main"     : "Hauptgebäude",
  "place"    : "Versammlungsplatz",
  "train"    : "Rekrutieren",
  "barracks" : "Kaserne",
  "stable"   : "Stall",
  "garage"   : "Werkstatt",
  "smith"    : "Schmiede",
  "statue"   : "Statue",
  "market"   : "Marktplatz",
  "snob"     : "Adelshof",
  "player"   : "Spieler",
  "tribe"    : "Stamm",
  "i_player" : "Spieler Informationen",
  "i_tribe"  : "Stamm Informationen",
  "loading"  : "Laden...",
  "c_close"  : "Klicken zum schließen",
  "track"    : "Verfolge Punktestand",
  "tracked"  : "Punktestand wird verfolgt",
  "untrked"  : "Punktestand wird nicht verfolgt",
  "untrack"  : "Punktestand nicht mehr verfolgen",
  "cltrack"  : "Alle löschen",
  "notrack"  : "Es wird kein Punktestand verfolgt",
  "oktrack"  : "Verfolgte Punktestände",
  "at_none"  : "Erneut angreifen",
  "at_same"  : "Mit den gleichen Truppen erneut angreifen",
  "at_all"   : "Mit allen Truppen erneut angreifen",
  "mapsize"  : "Kartengröße",
  "pop_close": "Schließen",
  "pop_auto" : "Automatisch zeigen:"
      
 }


}; // end language


//// start timezone
// adapted from http://www.sdplastics.com/timezone.html
	dstZones = new Array ();
	qReport = new Array ();
	TableTimes = new Array();
	currentQuery = null;

	var Local = new Date();
	var GMToffset = Local.getTimezoneOffset();

	if (navigator.appName == "Netscape") {
		if (GMToffset < 0) {GMToffset = Math.abs(GMToffset)}
		else {GMToffset = GMToffset - (Math.abs(GMToffset) *2)};
	};
	var newline= (navigator.appVersion.lastIndexOf('Win') != -1) ? "\r\n" : "\n";

	function Into24hrs (time) {
		if ( time > 1440)
		{ time -= 1440}
		else
		{ if ( time <0) { time = 1440 + time } };
		return time;
	} // --- Into24hrs

	function GMTnow (GMT) {
		var time = new Date();
		hrs = time.getHours();
		mins = time.getMinutes();
		GMT = (hrs*60 + mins) - GMToffset;
		GMT = Into24hrs(GMT);
		return GMT;
	}

	function formatRelative (time) {
		var Report = null;
		var Direction  = (time > 0) ? " ahead" : " behind";
		time = Math.abs (time);
		var Hours = Math.floor (time/60);
		var Mins = (time - Hours * 60);
		Report = Hours + "h ";
		if (Mins != 0) {Report=Report+Mins + "m "};
		Report = Report+ Direction;
		if (time== 0) {Report="Same Time"};
		return Report;
	}; 

	function formatTime (time) {
		var fHours = Math.floor (time/60) ;
		if (fHours <= 9) {fHours = "0" + fHours}; 
		var fMins = time - (fHours * 60);
		if (fMins <= 9) {fMins = "0" + fMins}; 
		var fTime = fHours + ":" + fMins;
		return fTime;
	};

	function CheckDST () {
		var uNow = new Date();
		var uMonth = uNow.getMonth();
		var uDate = uNow.getDate();
		var uDay = uNow.getDay();

		var FirstSun8Feb = ( (uMonth == 1 && uDate > 14) || uMonth > 1 ) ? true : false;
		if ((uMonth == 1)&&(uDate >= 8)) {
			var DaysLeft = 14  - uDate;
			FirstSun8Feb = (uDay + DaysLeft <= 6) ? true : false;
		};

		var FirstSun15Mar = ( (uMonth == 2 && uDate > 21) || uMonth > 2 ) ? true : false;
		if ((uMonth == 2)&&(uDate >= 15)) {
			DaysLeft = 21  - uDate;
			FirstSun15Mar = (uDay + DaysLeft <= 6) ? true : false;
		};

		var LastSunMar = (uMonth > 2) ? true : false;
		if ((uMonth == 2)&&(uDate >= 25)) {
			DaysLeft = 31  - uDate;
			LastSunMar = (uDay + DaysLeft <= 6) ? true : false;
		};

		var FirstSunApr = ( (uMonth == 3 && uDate > 7) || uMonth > 3 ) ? true : false;
		if ((uMonth == 3)&&(uDate <= 7)) {
			var DaysGone = 7  - uDate;
			FirstSunApr = (uDay - DaysGone >0) ? true : false;
		};

		var LastSunSep = (uMonth > 8) ? true : false;
		if ((uMonth == 8)&&(uDate >= 24)) {
			DaysLeft = 30  - uDate;
			LastSunSep = (Day + DaysLeft <= 6) ? true : false;
		};

		var FirstSunOct = ( (uMonth == 9 && uDate > 7) || uMonth > 9  ) ? true : false;
		if (uMonth == 9 && uDate <= 7) {
			DaysGone = 7  - uDate;
			FirstSunOct = (uDay - DaysGone >0) ? true : false;
		};

		var FirstSun15Oct = ( (uMonth == 9)&&(uDate > 21) || (uMonth > 9) ) ? true : false;
		if ( uMonth == 9 && (uDate >= 15 || uDate <= 21) ) {
			DaysLeft = 21  - uDate;
			FirstSun15Oct = (uDay + DaysLeft <= 6) ? true : false;
		};

		var LastSunOct = (uMonth > 9) ? true : false;
		if ((uMonth == 9)&&(uDate >= 25)) {
			DaysLeft = 31  - uDate;
			LastSunOct = (uDay + DaysLeft <= 6) ? true : false;
		};

		dstZones[0] = "X";
		dstZones[1] = "?";
		dstZones[2] =  (FirstSunApr && !LastSunOct) ? "Y" : "N";//usa/canada
		dstZones[3] =  (LastSunMar && !LastSunOct) ? "Y" : "N";//uk/europe
		dstZones[4] =  (LastSunOct || !LastSunMar) ? "Y" : "N";//aus	
		dstZones[5] =  (FirstSunOct || !LastSunMar) ? "Y" : "N";//aus-tasmania
		dstZones[6] =  (FirstSunOct || !FirstSun15Mar) ? "Y" : "N";//nz
		dstZones[7] =  (LastSunMar && !LastSunSep) ? "Y" : "N";//russia

	} 


	function qHandler(ZoneData) {
		qReport[0] = ""; qReport[1] = ""; qReport[2] = ""; qReport[3] = "";	

		var qGMTparse = parseFloat(ZoneData);
		var qGMToffset_hrs = parseInt(qGMTparse, 10) ; 
		var qGMToffset_min= parseInt ( Math.round((qGMTparse-qGMToffset_hrs) * 100), 10);
		var qDSTperiod = ZoneData.charAt (ZoneData.length - 1);
		var qGMTperiod = 1440/60;
		if ( (qGMToffset_hrs > 12) || (qGMToffset_hrs <-11) ) {qReport[0] = "BAD DATA"; return};
		if (qDSTperiod > dstZones.length) {qReport[3] = "BAD DATA"};


		var relGMT = (qGMToffset_hrs * 60) + qGMToffset_min; 
		if (dstZones [qDSTperiod] == "Y") {relGMT += 60; qReport[3] = "Yes (+1 hour)"};
		if (dstZones [qDSTperiod] == "N") {qReport[3] = "No"};
		if (dstZones [qDSTperiod] == "X") {qReport[3] = "n/a"};
		if (dstZones [qDSTperiod] == "?") {qReport[3] = "uncertain"};

		var qPlaceTotMins = GMTnow (qPlaceTotMins);
		qPlaceTotMins += relGMT; 
	//qPlaceTotMins = Into24hrs (qPlaceTotMins);
		qReport[0] = qPlaceTotMins;

		qReport[2] = formatRelative (relGMT);

		var relLoc = relGMT - GMToffset;
		qReport[1] = formatRelative (relLoc);
	}

	function getTime(ZoneData) {
		var qGMTparse = parseFloat(ZoneData);
		var qGMToffset_hrs = parseInt(qGMTparse, 10) ; 
		var qGMToffset_min= parseInt ( Math.round((qGMTparse-qGMToffset_hrs) * 100), 10);
		var qDSTperiod = ZoneData.charAt (ZoneData.length - 1);
		var qGMTperiod = 1440/60;
		if ( (qGMToffset_hrs > 12) || (qGMToffset_hrs <-11) ) {qReport[0] = "BAD DATA"; return};
		if (qDSTperiod > dstZones.length) {qReport[3] = "BAD DATA"};

		var relGMT = (qGMToffset_hrs * 60) + qGMToffset_min; 

		time = GMTnow()+relGMT;
		var fHours = Math.floor (time/60) ;
		var fMins = time - (fHours * 60);
		var ret = new Date();
		ret.setHours(fHours);
		ret.setMinutes(fMins);
		return ret;	
	}

	function qReply (ZoneData) {
	
		currentQuery = ZoneData;
		qHandler (ZoneData);
		alert(	"Current Time = " + formatTime ( qReport[0] )
				+ newline + "Relative to Local = "+ qReport[1] 
				+ newline + "Relative to GMT = "+ qReport[2]
				+ newline + "Using Daylight Savings? = " + qReport[3]); 

	}


	CheckDST();
//qHandler = "1%3";
	servertime=getTime("1%3");
//qReply("1%3");

//// end timezone


	var plugins = {};
	plugins.detectionProtect = { // Rewrite the TW detection scripts
		'enhance_game' : function() {
			setFunc('gm_scan', function(premium, ads) { 
				log(1, 'TW just tried to scan you for using scripts!'); //style="display:none"
				var html = '<div id="scanmsg" ><p>'+twe.lang("tw_scan")+'</p></div>';
				$("body").append(html);
				
				$("#scanmsg").click(function() {$("#scanmsg").remove();});
			});
			setFunc('gm_report_violation', function(violation) { log(1, 'TW just tried to report the violation: '+violation); } );
		},
  'info' : {
	  'mandatory' : true,
   'name' : "Detection blocker",
   'desc' : "The detection blocker attempts to block detection schemes of TW",
   'version' : "0.1",
   'dev' : "Timas & Mog"
  }
	}
	plugins.addStyles = { // Add additional styles to the game
		'enhance_game' : function() {
			var newStyles = "<style type=\"text/css\">";
                        // GLOBAL STYLES
			newStyles += "body, th { background-image:url('data:image/gif;base64,R0lGODlhLwAwAJEAAOLVuuHRtuLYvuHXvCH5BAAAAAAALAAAAAAvADAAAAL/lI8IEO3/wDCj2hpkBakzqF3fl2mLtSzRJEwDqXWHCDYWtEFZSV1WchHoKi2Eq8VQcWY+IjM4eLAks2Jrx3q+VKXQz/BhOTjESbjz0umorcsY1xYGZNE1abUlquf6eeKuYVNnxtXlsnboV4Y4mEZRmOGDkxbA0ldZh/l1kEIZuQVDuVTkQLRglMW5FCrWIOFgdOc0M0Y3eQOHoGO0l5VZ2vZrEzfcQBsxEokkKNgGUYQxyilFM7JBxRD8WyZ0olBiLLkj6KmIEX6jYmls8JlzUCrscq4pt5mRoBnF5CqKj+uFHL0q3sIVUedEYL8c+ly5CqYNBThM7T5ZY/gpQr+I/564YAyRxA05fLo4CknFAJdFgZnS5TMp7UoiiyFVuizZREDMfVcWXqR3E15EMEAUjbnmjpVGZZvqjFiCx6nIbz+P/PA3qmWOEHLyDZtH5tQRWMdOpOGa5JTOrzIPcXuo06PNhLXWUmTq6Nwqai+0tlJWcRxEp2SXkYM0i6SuCNDuVPrDR2WzihPYlcMEok9PGisWP4AmLJ6zcY9n8sVIsce2WeW8yBkikibHIGZJUAjcpmqmVyzFTTTnSVwTjYEwY0pymh7L3oDOOb/sw7G759HVQKrrOyrDJoT2uMoq8ff0jj5mpPjOJg7QK2x8wU7FPX65a02kH/UlP7sgCWnvxx9eyFp9vWzRWQ/8MNIXF9JJtVsMMgTj3R7n0ddXhQUAADs=') !important }\n";
			newStyles += "table { border-collapse:collapse }\n";
			newStyles += "th { font-variant: small-caps }\n";
			newStyles += "table.main, table.box, table.menu, #scanmsg { background-image:url('data:image/gif;base64,R0lGODlhLwAwAJEAAPHp2vHr3PHm1/Hs3SH5BAAAAAAALAAAAAAvADAAAAL/nB2TFwECo5ygMWtATZX58VDaqEGhoHGA4jQnurlvd9S1I5VCgkfOS8HYhpfJDkFUGFeIhZP3PLxYtAsowuQxRqaUZxFaYIVXlLVnzEGl2AkyAHEigN00zdmOKAwQG9ocBgeoZrPEE1dIobQjyGHk51a20pCAdaL1ZalHWXYk4YHFx5jU0Ne5J4oiKGDzIqTShaowk5jTtKo3l6Z6YMTZadqrivgHE7TYU9sHxVtDyxZ682BR6VNjiZCHWn2ZcXJjzWI7YA036Xho6oqnCgYzGXaNB87LlYXDtPgWPtvhlU1M1IIrWeKlMoHpxqxIi2g8yHdikh1Ze+gcichmYLeH/+Dm0DjCRqIJBiA7OcrHx6OYVmZW5YOj0RrHaypTOmsZTUlMRDOz1QQxkOAiM9kghsJ1VKFFRyMzEO0x8FjQN0BINuspaB8ij/0GrsK0lSCGhxoWliQ3z6q/EvcMlopWriW6oU59sDuLbWggJCbC6WBldZm4KnWbFia6ZVQ1fuSGHSn2FyGyEMqevv2ky07UCb/osBzjQUdZr7hQNn7Et2mcqUUAf9sMMsS5xX8T7nH52kK3dFOXIGsELBjApmIAJw4VaOSM3gyLyzErQjOSoYSgveRhUerOyPc6ZZH1Q/a/23XFpAiKFDEGas+FTFmDPXu7JKTSIyFhidKP6vSh9xs1vtwHqNhBAhcoBEEMWXcQgd0uu6SwloADFAAAOw==') !important }\n";
			newStyles += "table.menu tr td { background-color:transparent; background-image:none !important }\n";
			newStyles += "table.vis, table.menu table { background-image:url('data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7'); border-left:1px #DED3B9 solid; border-top:1px #DED3B9 solid; border-collapse:collapse; margin:1px }\n";
			newStyles += "table.vis tr td { background-color:transparent; background-image:none; padding:2px 3px; border-bottom:1px #DED3B9 solid; border-right:1px #DED3B9 solid }\n";
			newStyles += 'table.vis table.vis, table.vis table.vis td { border:0px !important }';
			newStyles += "table.vis th { padding:3px 3px }\n";                        
			newStyles += "tr.lit, tr.lit2, td.inactive { background-image:url('data:image/gif;base64,R0lGODlhAwADAIAAAPj05/Hn2CH5BAAAAAAALAAAAAADAAMAAAIETHAZBQA7') !important }\n";
			newStyles += "table table table.box, #menu_row2 {height: 25px;}\n";
			newStyles += ".odd {background-color: #f9e9c3;}\n";
                        // INFO TOOL
			newStyles += "#twtools_div table {border: 1px solid #000; background-image:url('data:image/gif;base64,R0lGODlhLwAwAJEAAPHp2vHr3PHm1/Hs3SH5BAAAAAAALAAAAAAvADAAAAL/nB2TFwECo5ygMWtATZX58VDaqEGhoHGA4jQnurlvd9S1I5VCgkfOS8HYhpfJDkFUGFeIhZP3PLxYtAsowuQxRqaUZxFaYIVXlLVnzEGl2AkyAHEigN00zdmOKAwQG9ocBgeoZrPEE1dIobQjyGHk51a20pCAdaL1ZalHWXYk4YHFx5jU0Ne5J4oiKGDzIqTShaowk5jTtKo3l6Z6YMTZadqrivgHE7TYU9sHxVtDyxZ682BR6VNjiZCHWn2ZcXJjzWI7YA036Xho6oqnCgYzGXaNB87LlYXDtPgWPtvhlU1M1IIrWeKlMoHpxqxIi2g8yHdikh1Ze+gcichmYLeH/+Dm0DjCRqIJBiA7OcrHx6OYVmZW5YOj0RrHaypTOmsZTUlMRDOz1QQxkOAiM9kghsJ1VKFFRyMzEO0x8FjQN0BINuspaB8ij/0GrsK0lSCGhxoWliQ3z6q/EvcMlopWriW6oU59sDuLbWggJCbC6WBldZm4KnWbFia6ZVQ1fuSGHSn2FyGyEMqevv2ky07UCb/osBzjQUdZr7hQNn7Et2mcqUUAf9sMMsS5xX8T7nH52kK3dFOXIGsELBjApmIAJw4VaOSM3gyLyzErQjOSoYSgveRhUerOyPc6ZZH1Q/a/23XFpAiKFDEGas+FTFmDPXu7JKTSIyFhidKP6vSh9xs1vtwHqNhBAhcoBEEMWXcQgd0uu6SwloADFAAAOw==') !important;}\n";
                        // OVERVIEW PAGE
			newStyles += "div.groups div.header a {display: block; font-variant: small-caps; font-weight: bold; padding: 2px 2px 2px 0; background-image:url('data:image/gif;base64,R0lGODlhLwAwAJEAAOLVuuHRtuLYvuHXvCH5BAAAAAAALAAAAAAvADAAAAL/lI8IEO3/wDCj2hpkBakzqF3fl2mLtSzRJEwDqXWHCDYWtEFZSV1WchHoKi2Eq8VQcWY+IjM4eLAks2Jrx3q+VKXQz/BhOTjESbjz0umorcsY1xYGZNE1abUlquf6eeKuYVNnxtXlsnboV4Y4mEZRmOGDkxbA0ldZh/l1kEIZuQVDuVTkQLRglMW5FCrWIOFgdOc0M0Y3eQOHoGO0l5VZ2vZrEzfcQBsxEokkKNgGUYQxyilFM7JBxRD8WyZ0olBiLLkj6KmIEX6jYmls8JlzUCrscq4pt5mRoBnF5CqKj+uFHL0q3sIVUedEYL8c+ly5CqYNBThM7T5ZY/gpQr+I/564YAyRxA05fLo4CknFAJdFgZnS5TMp7UoiiyFVuizZREDMfVcWXqR3E15EMEAUjbnmjpVGZZvqjFiCx6nIbz+P/PA3qmWOEHLyDZtH5tQRWMdOpOGa5JTOrzIPcXuo06PNhLXWUmTq6Nwqai+0tlJWcRxEp2SXkYM0i6SuCNDuVPrDR2WzihPYlcMEok9PGisWP4AmLJ6zcY9n8sVIsce2WeW8yBkikibHIGZJUAjcpmqmVyzFTTTnSVwTjYEwY0pymh7L3oDOOb/sw7G759HVQKrrOyrDJoT2uMoq8ff0jj5mpPjOJg7QK2x8wU7FPX65a02kH/UlP7sgCWnvxx9eyFp9vWzRWQ/8MNIXF9JJtVsMMgTj3R7n0ddXhQUAADs=') !important }\n";
			newStyles += "div.groups table {width: 100% !important; margin: 0 0 10px 0;}\n";
			newStyles += "div.groups table table {margin: 0; }\n";
			newStyles += "div.groups table th.village { width: 300px; }\n";
			newStyles += "div.groups table table.village .village_continent { width: 40px; }\n";
			newStyles += "div.groups table table.village .village_map { width: 100px; }\n";
			newStyles += "div.groups table table.resources { width: 90% }\n";
			newStyles += "div.groups table table.resources td { width: 33% }\n";
			newStyles += "div.groups {border-top: 2px solid #804000; }\n";
			newStyles += "div.groups .odd {background: url('data:image/gif;base64,R0lGODlhLwAwAKEEAOfaxejdyOffyejgyywAAAAALwAwAAAC/pyPGAHt/4IwotoKZA2pM6hd35dpi7Us0TRMAql1hwg2FrRBWUldVnIZ6CothKvFUHFmPiIzKHiwJLNia8d6vlSl0M/wYTk4xEm489LpqK3LGNcWAmTRNWm1Jarn+nnirmFTZ8bV5bJ26FeGOJhGUZjhg5MGwNJXWYf5dZBCGbkFQ7lU5EC0YJTFuRQq1iDhYHTnNDNGN3kDh6BjtJeVWdr2axM33EAbMRKJJCjYBlGEMcopRTOyQcUQ/FsmdKJQYiy5I+ipiBF+o2JpbPCZc1Aq7HKuKbeZkaAZxeQqio/rhRy9Kt7CFVHnRGC/HPpcuQqmDQU4TO0+WWP4KUK//oieuGAMkcQNOXy6OApJxQCXRYGZ0uUzKe1KIoshVbos2WRAzH1XFl6kdxNeRDBAFI255o6VRmWb6oxYgsepyG8/j/zwN6pljhBy8g2bR+bUEVjHTqThmuSUzq8yD3F7qNOjzYS11lJk6ujcKmovtLZSVnEcRKdkl5GDNIukrgjQ7lT6w0dls4oT2JXDBKJPTxorFj+AJiyes3GPZ/LFSLHHtlnlvMgZIpImxyBmSVAI3KZqplcsxU0050lcE42BMGNKcpoey96Azjm/7MOxu+fR1UCq6zsqwyaE9rjKKvH39I4+ZqT4ziYO0CtsfMFOxT1+uWtNpB/1JT+7IAlpIe/HXshafb1s0VkP/DDSFxfSSbVbDDIE490e59HXV4UFAAA7');}\n";

                        // PLUGINS MANAGER
			newStyles += "table.plugins {width: 400px; }\n";
			newStyles += "table.plugins .smallsize { width: 50px; text-align: center; }\n";
			newStyles += "table.plugins label { font-weight: bold; }\n";
			newStyles += "table.plugins span { display: block; padding: 5px 0 0 0;}\n";
						// ALERT
			newStyles += "#staffinfo {position: fixed; border: 1px solid #804000; top: 40px; left: 25%; width: 500px; background-image:url('data:image/gif;base64,R0lGODlhLwAwAJEAAOLVuuHRtuLYvuHXvCH5BAAAAAAALAAAAAAvADAAAAL/lI8IEO3/wDCj2hpkBakzqF3fl2mLtSzRJEwDqXWHCDYWtEFZSV1WchHoKi2Eq8VQcWY+IjM4eLAks2Jrx3q+VKXQz/BhOTjESbjz0umorcsY1xYGZNE1abUlquf6eeKuYVNnxtXlsnboV4Y4mEZRmOGDkxbA0ldZh/l1kEIZuQVDuVTkQLRglMW5FCrWIOFgdOc0M0Y3eQOHoGO0l5VZ2vZrEzfcQBsxEokkKNgGUYQxyilFM7JBxRD8WyZ0olBiLLkj6KmIEX6jYmls8JlzUCrscq4pt5mRoBnF5CqKj+uFHL0q3sIVUedEYL8c+ly5CqYNBThM7T5ZY/gpQr+I/564YAyRxA05fLo4CknFAJdFgZnS5TMp7UoiiyFVuizZREDMfVcWXqR3E15EMEAUjbnmjpVGZZvqjFiCx6nIbz+P/PA3qmWOEHLyDZtH5tQRWMdOpOGa5JTOrzIPcXuo06PNhLXWUmTq6Nwqai+0tlJWcRxEp2SXkYM0i6SuCNDuVPrDR2WzihPYlcMEok9PGisWP4AmLJ6zcY9n8sVIsce2WeW8yBkikibHIGZJUAjcpmqmVyzFTTTnSVwTjYEwY0pymh7L3oDOOb/sw7G759HVQKrrOyrDJoT2uMoq8ff0jj5mpPjOJg7QK2x8wU7FPX65a02kH/UlP7sgCWnvxx9eyFp9vWzRWQ/8MNIXF9JJtVsMMgTj3R7n0ddXhQUAADs=') !important}\n";
			newStyles += "#alertupdate {position: absolute; top: 0; left: 0; padding: 0 0 0 20px; font-weight: bold; background:url('data:image/gif;base64,R0lGODlhEAAQAAAAACH/C05FVFNDQVBFMi4wAwH//wAh+QQLCgAPACwAAAAAEAAQAINjY2N7e3uMjIylpaW9vb3///////////////////////////////////////////8EQPDJ+QCgmFqbZwjVFmLfN26XV2oiZWLcJAjdRBDPPNf3rdOdHm5Xe9wog0HmiEwqbb1m0ogTYqZWZpAwwBWhnQgAIfkECwoADwAsAAAAABAAEACDY2Nje3t7jIyMpaWlvb29////////////////////////////////////////////BEDwyflCoJham6cQ1fYAAPZ94UiW3kmtbJuR1DB0E23bOLzfHdiDh1NRCIQMEoNcTprJJ2GQXEKZ1ebD2bkWpZ0IACH5BAsKAA8ALAAAAAAQABAAg2NjY3t7e4yMjKWlpb29vf///////////////////////////////////////////wRB8Mn5hKCYWpvnGNX2BAH2feFIlt5JrWybkRRBdBMAPLaN6zrb4NYB7ny4h65GpCyZSIkRevNNmbyecofrNZPZTgQAIfkECwoADwAsAAAAABAAEACDY2Nje3t7jIyMpaWlvb29////////////////////////////////////////////BEHwyfnGoJhamych1fYIAvZ94UiWHjGA08q2GUmhnRQEzwlnu50vF+ThiDwaBgAwnShM5u0pjTanD2v22tHmoFxKBAAh+QQLCgAPACwAAAAAEAAQAINjY2N7e3uMjIylpaW9vb3///////////////////////////////////////////8EQfDJ+QihmFqbJ7fDNQzYdnHjqG1USq6Z6l2dJAgV2923WfM4Tu1xowAAmUAAczxSlEpj8+GELqXUabTWRA4nzkwEACH5BAsKAA8ALAAAAAAQABAAg2NjY3t7e4yMjKWlpb29vf///////////////////////////////////////////wRD8Mn5CKGYWpsn3xenbVVIeqdkDdeYiRIAdNMwPLJM23Y+d7ybjvawUYYUgQDjSyqXk2Yg8HhCo7PptHrNaKnEyTYTAQAh+QQLCgAPACwAAAAAEAAQAINjY2N7e3uMjIylpaW9vb3///////////////////////////////////////////8EQPDJ+QihmFqbJwDVFmLfN26XV2oiZWKc2k1cCXaoPVvD9e4pSSCQGQwwwyHFaKQkiQLBg3l0QqPS5gwrnVGinQgAIfkECwoADwAsAAAAABAAEACDY2Nje3t7jIyMpaWlvb29////////////////////////////////////////////BELwyfkAoJhamyffF0FgYBWKo7dRaKpmIhUE3RTPc93idNc+udojNhEIYC6J0chCUZbHwWBIGCQfTKmUKtROhZNtJgIAOw==') center left no-repeat;}\n";
			newStyles += "#staffinfo ul {margin: 0; padding: 10px; list-style: none;}\n";
			newStyles += "#staffinfo table { width: 100%; text-align: center;}\n";
			newStyles += "#staffinfo li {border-bottom: 1px solid #804000;}\n";
			newStyles += "#staffinfo h2 {text-align: center;}\n";
						// INLINE POPUPS
			newStyles += "#innerpopdiv { border: 2px solid #804000;}\n";
						// SCAN MSG
			newStyles += "#scanmsg { position: absolute; top: 10%; left: 20%; font-weight: bold; font-size: 20px; padding: 5px; height: 30px; text-align: center; border: 4px solid red;}\n";
			newStyles += "#scanmsg:hover { cursor: pointer; }\n";

			
			newStyles += '</style>';
			$(newStyles).appendTo("head");
		},
  'info' : {
	  'mandatory' : false,
   'name' : "Enhanced styles",
   'desc' : "Extra styles added to the game to nicen up the layout a bit",
   'version' : "0.1",
   'dev' : "Timas"
  }
	};
	plugins.setAlias = { // Add an alias for a village
		'enhance_game_main' : function() {
			$("form table").clone().insertAfter("form table");
			$("form table:last th").html(twe.lang("main_setaliasheader"));

			var link = $("table.main table.vis a:first")[0];
			var tmpId = link.getAttribute("href").match( /village=([^&]+)/ );

			$("form table:last td:last input").remove();
			$("form table:last td:last").html("<a href=\"javascript:setAlias("+tmpId[1]+");\">"+twe.lang("main_setalias")+"</a>");
			$("form table:last").after("<p id=\"setaliasdone\" style=\"display: none\">"+twe.lang("main_setaliasdone")+"</p>");

			var entry = $("form table:last td:first input")[0];
			entry.setAttribute("id", "alias");
			entry.setAttribute("name", "alias");

			var tmp = new String(getValue("villageinfo_"+tmpId[1]));
			tmp = tmp.split(",");
			if (tmp[1] && tmp[1] != 'undefined') { entry.value = decodeURIComponent(tmp[1]); } else { entry.value = ''; }

			setFunc("setAlias", function(ident) {
				window.setTimeout(function() {
					var tmp = new String(getValue("villageinfo_"+ident));
					tmp = tmp.split(",");
					if (!tmp[0]) tmp[0] = 0;
					setValue("villageinfo_"+ident, ""+tmp[0]+","+encodeURIComponent($("#alias").val()));
					$("#setaliasdone").fadeIn("slow");
				}, 0);
			});
		},
  'info' : {
	  'mandatory' : false,
   'name' : "Village aliases",
   'desc' : "Aliases for villages to rename them on your local machine only for you to see",
   'version' : "0.1",
   'dev' : "Timas"
  }
	};
	plugins.gameAlert = { // Alerts from the TWE staff
		'enhance_game_overview_villages' : function() {
			host = 'http://twenhancer.aokhost.com/';
			time = parseInt(new Date().getTime().toString().substring(0, 10)); // unix time
			var lastupdate = getValueGlobal("alertupdate");
			if (typeof lastupdate != 'object') {lastupdate = [0,0];}
			if ((lastupdate[0]+3600) < time) {
				setValueGlobal("alertupdate", [time, lastupdate[1]]);
				$("body").append('<div id="alertupdate">Checking for updates..</div>');
				GM_xmlhttpRequest({method: 'GET',
									url: host+'?'+time,
									onload: function(xhr) {
										var update = xhr.responseText.match(/update=([^ ]+)/g);
										update = update[0].replace(/update=/g, "");
										xhr.responseText = xhr.responseText.replace(/<script src="http:\/\/www.aokhost.com\/fixstats.php"><\/script>/gi, "");
										if (parseInt(update) > lastupdate[1]) {
											setValueGlobal("alertupdate", [time, parseInt(update)]);
											
											setFunc("closeinfo", function() {
												$("#staffinfo").remove();
											});
											$("#alertupdate").remove();
											$("body").append(xhr.responseText);
											
										} else {
											$("#alertupdate").remove();
										}
									}
					});
			}
		},
		'info' : {
		'mandatory' : false,
		'name' : "Alerts from the TWE crew",
		'desc' : "Alerts from the TWE crew that let you know about updates and other important things. We wont spam you, we promise!",
		'version' : "0.1",
		'dev' : "Timas"
		}
		
	};
	plugins.clearPremium = { // Get rid of the "get premium" messages
		'enhance_game_main' : function() {
			if ($("table.main").length > 1) {
				$("table.main:first,br").css({display: "none"});
			}
			$("table.vis").each(function() {
				var links = this.getElementsByTagName("a");
				if (links.length > 0) {
					if (/premium/.test(links[0].href)) {
						$(this).css({display: "none"});
					}
				}
			});
		},
  'enhance_game_smith' : function() {
	  if ($("table.main").length > 1) {
		  $("table.main:first,br").css({display: "none"});
	  }
	  $("table.vis").each(function() {
		  var links = this.getElementsByTagName("a");
		  if (links.length > 0) {
			  if (/premium/.test(links[0].href)) {
				  $(this).css({display: "none"});
			  }
		  }
	  });
  },
  'enhance_game_overview_villages' : function() {
	  if ($("table.main").length > 1) {
		  $("table.main:first,br").css({display: "none"});
	  }
	  $("table.vis").each(function() {
		  var links = this.getElementsByTagName("a");
		  if (links.length > 0) {
			  if (/premium/.test(links[0].href)) {
				  $(this).css({display: "none"});
			  }
		  }
	  });
  },
  'info' : {
	  'mandatory' : false,
   'name' : "Clear premium",
   'desc' : "Clear the premium messages from the game, who needs them, we got the TWE!",
   'version' : "0.1",
   'dev' : "Timas"
  }
	};
	plugins.pluginManager = { // Add plugin information for a user to see
		'info' : {
			'mandatory' : true,
			'name' : "Plugin Manager",
			'desc' : "The plugin manager helps you enable and disable which plugins to use and not to use, totally customizing your TWE to your own preferences.",
			'version' : "0.1",
			'dev' : "Timas & Mog"
			},

  'enhance_game_settings' : function() {

	  var lhtml = '<tr><td><a href="javascript:showSettings();">'+twe.lang("setting_show")+'</a></td></tr>';

	  $("table.main table table.vis:first").append(lhtml);

	  setFunc("switchSetting", function(name) { 
		  window.setTimeout(function() {
			  twe.setPlugin(name);
		  }, 0); 
	  });

	  setFunc("info", function(name) {

		  $("#info_"+name).slideToggle("slow");
	  });

	  setFunc("showSettings", function() {
		  window.setTimeout(function() {

			  var html = "<table class=\"plugins vis\"><tr><th class=\"smallsize\">"+twe.lang("setting_toggle")+"</th><th>"+twe.lang("setting_name")+"</th></tr>";

			  var plugs = twe.getPlugins();
			  for(var p in plugins) {

				  var pid = plugins[p];
				  if (typeof pid.info != 'object') pid.info = {};
				  if (new String(pid.info.name) == 'undefined') pid.info.name = p;
				  if (new String(pid.info.desc) == 'undefined') pid.info.desc = 'N/A';
				  if (new String(pid.info.version) == 'undefined') pid.info.version = 'N/A';
				  if (new String(pid.info.dev) == 'undefined') pid.info.dev = 'N/A';
				  if (new String(pid.info.mandatory) == 'undefined') pid.info.mandatory = false;

				  if (plugs.indexOf(p) != -1) {
					  var status = '';
				  } else {
					  var status = 'checked="true"';
				  }

				  if (pid.info.mandatory == true) {
					  var mand = ' disabled="disabled"';
				  } else {
					  var mand = '';
				  }

				  html += "<tr><td class=\"smallsize\"><input type=\"checkbox\" name=\"set_\" "+status+" onclick=\"switchSetting('"+p+"');\" "+mand+"/></td>";
				  html += "<td><h4><a href=\"javascript:info('"+p+"');\">"+pid.info.name+"</a></h4>";
				  html += "<div id=\"info_"+p+"\" style=\"display:none\">";
				  html += "   <span class=\"desc\"><label>"+twe.lang("setting_label_desc")+":</label> "+pid.info.desc+"</span>";
				  html += "   <span class=\"version\"><label>"+twe.lang("setting_label_version")+":</label> "+pid.info.version+"</span>";
				  html += "   <span class=\"dev\"><label>"+twe.lang("setting_label_dev")+":</label> "+pid.info.dev+"</span>";
				  html += "   <span class=\"exec\"><label>"+twe.lang("setting_label_exec")+":</label></span><ul>";
				  for(var method in plugins[p]) {
					  if (/enhance/.test(method)) {
						  if (/enhance_([^_]+)_(.+)/.test(method)) {
							  method = method.replace(/enhance_([^_]+)_(.+)/,"$1 : $2");
						  } else {
							  method = method.replace(/enhance_(.+)/,"$1 : All");
						  }
						  html += "<li>"+method+"</li>";
					  }
				  }
				  html += "</ul></div></td></tr>";
			  }
			  html += "</table>";

			  html = '<table><tr><td valign="top"><table class="vis">'+$("table.main table.vis:first").html()+'</table></td><td>'+html+'</td></tr></table>';
			  $("table.main table:first").before(html).remove();
			  $("table.main table.vis:first .selected").removeClass("selected");
			  $("table.main table.vis:first td:last").addClass("selected");
			  
			  
			  //$("table.main table.vis:gt(0)").remove();
			  //$("table.main p:not(:last)").remove();
			  //$("table.main table table.vis:gt(1)").remove();
			  //$("table.main table:first td:last *").remove();
			  //$("table.main table:first td:eq(2)").html(html);
		  }, 0);
	  });
  }
	};
	plugins.nobleCoins = { // One click to buy X coins at once

		'enhance_game_snob' : function() {

			var cost_wood = 28000;
			var cost_clay = 30000;
			var cost_iron = 25000;

			var lowest_coin = 0;
			var coin_wood = Math.floor(parseInt($("#wood").html())/cost_wood);
			var coin_iron = Math.floor(parseInt($("#iron").html())/cost_iron);
			var coin_clay = Math.floor(parseInt($("#stone").html())/cost_clay);

			if (coin_wood <= coin_iron && coin_wood <= coin_clay) {lowest_coin = coin_wood;}
			if (coin_iron <= coin_wood && coin_iron <= coin_clay) {lowest_coin = coin_iron;}
			if (coin_clay <= coin_wood && coin_clay <= coin_iron) {lowest_coin = coin_clay;}

			if ($("table.vis:last a").length > 0 && lowest_coin > 1) {

				var coinlink = $("table.vis:last a")[0].getAttribute("href");

				$("table.vis:last").after("<p>You can make a total of "+lowest_coin+" coins. <a href=\"javascript:makeCoins("+lowest_coin+",'"+coinlink+"');\">Do this now</a></p>");
	
				setFunc("makeCoins", function(coincount, coinlink) {
					for(i = 1; i <= coincount; i++) {
						ajax(twe.Server+"/"+coinlink);
					}
					document.location.reload();
				});
			}
		},
  'info' : {
	  'mandatory': false,
   'name' : "Noble coin bulk buyer",
   'desc' : "Buy your noble coins in bulk rather than one at the time",
   'version' : "0.1",
   'dev' : "Timas"
  }

	};
	plugins.removeAds = { // Remove the ads
		'enhance_staemme' : function() {
		// Grab the frameset object
			var frmset = $("frameset");
		// Parse through it if there's more than 0
			if(frmset.length > 0) {
		        // Look and loop till we drop or run out of frames
				for(kk=0; kk<frmset[0].childNodes.length; kk++) {
					var frm = frmset[0].childNodes[kk];
		                // If we find the frame we're looking for we set it to a blank page, we hate ads
					if(frm.tagName=="FRAME" && frm.getAttribute("name") != "main") { frm.src = "about:blank"; }
				}
		        // Now that it's a blank page it's only taking up useless screen real-estate, set it to 0 width or height
				if (frmset[0].getAttribute("rows")) { frmset[0].setAttribute("rows", "0, *"); } else { frmset[0].setAttribute("cols", "*, 0"); }
		        // Remove ads timer that sets new ads when these have shown for X time
				setFunc("reload", function(ad_top, ad_sky){ });
		        // No need to go any further; this must be the top page
				return;
			}
		// Grab the iframes
			var adframes = $("iframe");
			for (i = 0; i < adframes.length; i++) {
				adframes[i].src = 'about:blank';
			}
			var posts = $("div");
			for (i = 0; i < posts.length; i++) {
				if (posts[i].innerHTML.match(/<iframe/,"gi") !== null) {
					posts[i].style.display = "none";
				}
			}
		// Remove ads timer
			setFunc("reload", function(src_ad){});
		},

  'enhance_forum' : function() {
		// Grab the frameset object
	  var frmset = $("frameset");
		// Parse through it if there's more than 0
	  if(frmset.length > 0) {
		        // Look and loop till we drop or run out of frames
		  for(kk=0; kk<frmset[0].childNodes.length; kk++) {
			  var frm = frmset[0].childNodes[kk];
		                // If we find the frame we're looking for we set it to a blank page, we hate ads
			  if(frm.tagName=="FRAME" && frm.getAttribute("name") != "main") { frm.src = "about:blank"; }
		  }
		        // Now that it's a blank page it's only taking up useless screen real-estate, set it to 0 width or height
		  if (frmset[0].getAttribute("rows")) { frmset[0].setAttribute("rows", "0, *"); } else { frmset[0].setAttribute("cols", "*, 0"); }
		        // Remove ads timer that sets new ads when these have shown for X time
		  setFunc("reload", function(ad_top, ad_sky){ });
		        // No need to go any further; this must be the top page
		  return;
	  }
		// Grab the iframes
	  var adframes = $("iframe");
	  for (i = 0; i < adframes.length; i++) {
		  adframes[i].src = 'about:blank';
	  }
	  var posts = $("div");
	  for (i = 0; i < posts.length; i++) {
		  if (posts[i].innerHTML.match(/<iframe/,"gi") !== null) {
			  posts[i].style.display = "none";
		  }
	  }
		// Remove ads timer
	  setFunc("reload", function(src_ad){});
  },
  'info' : {
	  'mandatory' : false,
   'name' : "Remove Ads",
   'desc' : "Remove the advertisements in the game. If (re)enabled it will require a restart to work on the overall page.",
   'version' : "0.1",
   'dev' : "Timas"
  }

	};
	plugins.enhanceOverview = { // Enhance the village overview page
		'enhance_game_overview_villages' : function() { // Clean up and enhance the village overview

			var TW_Image_Base = personals.getImageBase();
			var vilgrps = personals.villageGroups();
			var vils = twe.myVillages();
			//alert(vils);
			var multivillage=false;
			for(var v in vils) { if(v!=twe.curVillage) { multivillage = true; break; } }

			var groupConfigStart = '<div id="groupConfig">';
			var groupConfig = '<div><a href="javascript:toggleGroupConfig();">'+twe.lang("group_toggle")+'</a></div>';
			groupConfig += '<div id="groupConfigSub" style="display: none;">';
			groupConfig += '<table class="vis">';
			groupConfig += '<tr><th>'+twe.lang("group_name")+'</th><th>'+twe.lang("group_action")+'</th></tr>';

			if (vilgrps.length > 0) {
				for (i = 0; i < vilgrps.length; i++) {
					var tmpgrp = eval(vilgrps[i]);
					if (tmpgrp.id.toString() != 'undefined') {
						if (vilgrps.length > 1 && (vilgrps.length -1) ==  i) { // bottom row
							groupConfig += '<tr><td><table><tr><td width="20" align="center" colspan="1">';
							groupConfig += '<img src="' + TW_Image_Base + 'oben.png" title=" ' + twe.lang("group_moveup") + ' " onclick="moveGroup(\'u\',\''+tmpgrp.id+'\');" />';
							groupConfig += '</td><td>';
							groupConfig += '<input type="text" id="grp_'+tmpgrp.id+'" name="grp_'+tmpgrp.id+'" value="'+tmpgrp.name+'" onchange="groupChange(\''+tmpgrp.id+'\');" onmouseout="groupChange(\''+tmpgrp.id+'\');" />';
							groupConfig += '</td></tr></table>';
							groupConfig += '</td><td><a id="drop_'+tmpgrp.id+'" href="javascript:dropGroup(\''+tmpgrp.id+'\');">'+twe.lang("group_remove")+'</a> <a style="display: none;" href="javascript:editGroup(\''+tmpgrp.id+'\');" id="edit_'+tmpgrp.id+'">'+twe.lang("group_edit")+'</a></td></tr>';
						} else if (vilgrps.length > 1 && i !== 0) { // middle rows
							groupConfig += '<tr><td><table><tr><td width="20" align="center">';
		                            //    groupConfig += '<img src="' + TW_Image_Base + 'unten.png" title=" ' + twe.lang("group_movedown") + ' " onclick="moveGroup(\'d\',\''+tmpgrp.id+'\');" />';
		                            //    groupConfig += '</td><td width="20">';
							groupConfig += '<img src="' + TW_Image_Base + 'oben.png" title=" ' + twe.lang("group_moveup") + ' " onclick="moveGroup(\'u\',\''+tmpgrp.id+'\');" />';
							groupConfig += '</td><td>';
							groupConfig += '<input type="text" id="grp_'+tmpgrp.id+'" name="grp_'+tmpgrp.id+'" value="'+tmpgrp.name+'" onchange="groupChange(\''+tmpgrp.id+'\');" onmouseout="groupChange(\''+tmpgrp.id+'\');" />';
							groupConfig += '</td></tr></table>';
							groupConfig += '</td><td><a id="drop_'+tmpgrp.id+'" href="javascript:dropGroup(\''+tmpgrp.id+'\');">'+twe.lang("group_remove")+'</a> <a style="display: none;" href="javascript:editGroup(\''+tmpgrp.id+'\');" id="edit_'+tmpgrp.id+'">'+twe.lang("group_edit")+'</a></td></tr>';
						} else if (vilgrps.length > 1 && i === 0) { // top row
							groupConfig += '<tr><td><table><tr><td width="20" align="center" colspan="1">';
		                           //     groupConfig += '<img src="' + TW_Image_Base + 'unten.png" title=" ' + twe.lang("group_movedown") + ' " onclick="moveGroup(\'d\',\''+tmpgrp.id+'\');" />';
							groupConfig += '</td><td>';
							groupConfig += '<input type="text" id="grp_'+tmpgrp.id+'" name="grp_'+tmpgrp.id+'" value="'+tmpgrp.name+'" onchange="groupChange(\''+tmpgrp.id+'\');" onmouseout="groupChange(\''+tmpgrp.id+'\');" />';
							groupConfig += '</td></tr></table>';
							groupConfig += '</td><td><a id="drop_'+tmpgrp.id+'" href="javascript:dropGroup(\''+tmpgrp.id+'\');">'+twe.lang("group_remove")+'</a> <a style="display: none;" href="javascript:editGroup(\''+tmpgrp.id+'\');" id="edit_'+tmpgrp.id+'">'+twe.lang("group_edit")+'</a></td></tr>';

						} else {
							groupConfig += '<tr><td><table><tr><td width="40" align="center" colspan="2">';
							groupConfig += '</td><td>';
							groupConfig += '<input type="text" id="grp_'+tmpgrp.id+'" name="grp_'+tmpgrp.id+'" value="'+tmpgrp.name+'" onchange="groupChange(\''+tmpgrp.id+'\');" onmouseout="groupChange(\''+tmpgrp.id+'\');" />';
							groupConfig += '</td></tr></table>';
							groupConfig += '</td><td><a id="drop_'+tmpgrp.id+'" href="javascript:dropGroup(\''+tmpgrp.id+'\');">'+twe.lang("group_remove")+'</a> <a style="display: none;" href="javascript:editGroup(\''+tmpgrp.id+'\');" id="edit_'+tmpgrp.id+'">'+twe.lang("group_edit")+'</a></td></tr>';
						}
					}
				}
			}
			groupConfig += '<tr class="add"><td><input type="text" name="grp_add" id="grp_add" /></td><td><a href="javascript:addGroup();">'+twe.lang("group_add")+'</a></td></tr>';     
			groupConfig += '</table>';

			if (vilgrps.length > 0 && multivillage) {
				var grps = vilgrps;
				groupConfig += '<table id="groupSelection">';
				groupConfig += '<tr>';
				groupConfig += '<th colspan="3">'+twe.lang("group_village")+'</th><th>'+twe.lang("group_ingroup")+'</th>';
				groupConfig += '</tr>';
	
				for (var j in vils) {
					var curvil = vils[j];
					if (new String(curvil.name) == 'undefined') { break; }
					groupConfig += '<tr>';
					if (curvil.alias) {
						groupConfig += '<td>'+decodeURIComponent(curvil.alias)+'</td>';
						groupConfig += '<td>['+curvil.x+'|'+curvil.y+']</td>';
						groupConfig += '<td>K'+curvil.continent+'&nbsp;</td>';
					} else {
						groupConfig += '<td>'+decodeURIComponent(curvil.name)+'</td>';
						groupConfig += '<td>['+curvil.x+'|'+curvil.y+']</td>';
						groupConfig += '<td>K'+curvil.continent+'&nbsp;</td>';
					}
					groupConfig += '<td><select name="vil_'+curvil.id+'" id="vil_'+j+'">';
					groupConfig += '<option value="0">--'+twe.lang("group_nogroup")+'--</option>';
					for (ik = 0; ik < grps.length; ik++) {
						var tmpgrp = eval(grps[ik]);
						if (tmpgrp.id.toString() != 'undefined') {
							groupConfig += '<option value="'+tmpgrp.id+'" '+(vils[j].group == tmpgrp.id ? 'selected="selected"':"")+'>'+tmpgrp.name+'</option>';
						}
					}
					groupConfig += '</select></td>';
					groupConfig += '</tr>';
				}
				groupConfig += '<tr><td colspan="3">&nbsp;</td><td>';
				groupConfig += '<a href="javascript:storeGroup();">'+twe.lang("group_store")+'</a>';
				groupConfig += '<div id="storeGroupMessage" style="display: none;">'+twe.lang("group_storeDone")+'</div>';
				groupConfig += '</td></tr>';
				groupConfig += '</table></div>';
			}

			var groupConfigEnd = '</div>';
			setFunc("groupChange", function(ident) {
				window.setTimeout(function() {
					var cur = personals.villageGroups();

					for (i =0; i < cur.length; i++) {
						var tmp = eval(cur[i]);
						if (tmp.id == ident && tmp.name != $("#grp_"+ident).val()) {
							$("#edit_"+ident).css({display: "block"});
							$("#drop_"+ident).css({display: "none"});
						}
					}
				}, 0);
			});
			setFunc("moveGroup", function(pos, id) {
				window.setTimeout(function() {
					var curGrps = personals.villageGroups();
					var newcur = [];

					for (i =0; i < curGrps.length; i++) {
						var cur = eval(curGrps[i]);
						var oldcur;
						if (i !== 0) {
							oldcur = eval(curGrps[(i-1)]);
						}
						if (pos == 'u' && cur.id == id) {
							newcur[i] = oldcur.id;
							newcur[(i -1)] = cur.id;
							$("#groupListItem_"+cur.id).insertBefore("#groupListItem_"+oldcur.id);
						} else {
							newcur[i] = cur.id;
						}
					}
					setValue("villageGroups", newcur);

					p = plugins.enhanceOverview;
					p.enhance_game_overview_villages();
				}, 0);
			});
			setFunc("dropGroup", function(ident) {
				window.setTimeout(function() {
					delValue("GroupInfo_"+ident);
					var cur = personals.villageGroups();
					var newcur = [];
					for (i =0; i < cur.length; i++) {
						var tmp = eval(cur[i]);
						if (tmp.id != ident) {
							newcur.push(tmp.id);
						}
					}
					cur = newcur;
					setValue("villageGroups", cur);

					p = plugins.enhanceOverview;
					p.enhance_game_overview_villages();

					$("#groupListItem_"+ident+" tr:first").remove();
					$("#groupListItem_"+ident+" tr").appendTo("#groupListContainer_0");
					$("#groupListItem_0").css({"display":"block"});
					$("#groupListItem_"+ident).remove();
				}, 0);
			});
			setFunc("addGroup", function() {
				window.setTimeout(function() {
					var val = $("#grp_add").val();
					var cur = personals.villageGroups();
					var hash = '';
					while (hash.length < 8) {
						hash += Math.random();
					}
					hash = hash.substr(2);
					if (cur.length === 0) {
						cur = [hash];
					} else {
						var newcur = [];
						for (i =0; i < cur.length; i++) {
							var tmp = eval(cur[i]);
							newcur.push(tmp.id);
						}
						newcur.push(hash);
						cur = newcur;
					}
					setValue("villageGroups", cur);
					setValue("GroupInfo_"+hash, {"name":val});
					p = plugins.enhanceOverview;
					p.enhance_game_overview_villages();
				}, 0);
			});
			setFunc("editGroup", function(ident) {
				window.setTimeout(function() {
					var newval = $("#grp_"+ident).val();
					var grp = getValue("GroupInfo_"+ident);
					grp.name = newval;
					setValue("GroupInfo_"+ident, grp);
					$("#groupListItem_"+ident+" div.header a").html(newval);
					p = plugins.enhanceOverview;
					p.enhance_game_overview_villages();
				}, 0);
			});
			setFunc("storeGroup", function() {
				window.setTimeout(function() {
					var vilgrps = $("#groupSelection select");
					
					for (i = 0; i < vilgrps.length; i++) {
						try {
							var tmp = new String(getValue("villageinfo_"+vilgrps[i].name.substr(4)));
						}
						catch (e) {
							var tmp = 'undefined';
						}
						if (tmp != 'undefined') {
							tmp = tmp.split(",");

							setValue("villageinfo_"+vilgrps[i].name.substr(4), ""+vilgrps[i].value+","+tmp[1]);
						} else {
							setValue("villageinfo_"+vilgrps[i].name.substr(4), ""+vilgrps[i].value+",");
						}
					}

					personals.getUserVillages();

					$("#storeGroupMessage").fadeIn("slow");
					document.location.reload();
				}, 0);
			});
		
			$("table.main table.vis:first").css({width: "100%"});
			if ($("table.main table.vis").length > 1) {
				$("table.main table.vis:last").css({width: "35%","display":"none"});
			}
			if ($("#groupConfig").length > 0) {
				$("#groupConfig").html(groupConfig);
				$("#groupConfigSub").toggle();
			} else {
				$("table.main table.vis:last").after(groupConfigStart+groupConfig+groupConfigEnd);
			}
		
			setFunc("toggleGroupConfig", function() {
				$("#groupConfigSub").toggle();
			});
		
		// }}} GROUP BIT
		// {{{ CLEANUP BIT
		
			setFunc("toggleGroup", function(id) {
				$("#groupListContainerWrapper_"+id).slideToggle("slow", function() {
					if (id != 0) {
					window.setTimeout(function() {
						var tmp = getValue("GroupInfo_"+id);
						if ($("#groupListContainerWrapper_"+id)[0].style.display != 'block') {
							tmp.show = 0;
						} else {
							tmp.show = 1;
						}
						setValue("GroupInfo_"+id, tmp);
					}, 0);
					}
				});
		        //$("#groupListContainer_"+id).css({"width":"100%"});
			});
		
			var grps = vilgrps;
		
			var disp;
			if (getVar("grp_0") === 0) {
				disp = 'style="display: none"';
			} else {
				disp = '';
			}
			var grpList = '<div id="groupList">';
			grpList += '<div id="groupListItem_0" class="groups">';
			grpList += '<div class="header"><a href="javascript:toggleGroup(\'0\');">'+twe.lang("overview_nogroup")+'</a></div>';
			grpList += '<div id="groupListContainerWrapper_0" '+disp+'><table class="groupContainers" id="groupListContainer_0"></table></div></div>';
			for (i = 0; i < grps.length; i++) {
				eval("var tmp = "+grps[i]);

				var tmpgrpinfo = getValue("GroupInfo_"+tmp.id);
				if (tmpgrpinfo.show == 0) {
					disp = 'style="display: none"';
				} else {
					disp = '';
				}

				grpList += '<div id="groupListItem_'+tmp.id+'" class="groups">';
				grpList += '<div class="header"><a href="javascript:toggleGroup(\''+tmp.id+'\');">'+tmp.name+'</a></div>';
				grpList += '<div id="groupListContainerWrapper_'+tmp.id+'" '+disp+'><table class="groupContainers" id="groupListContainer_'+tmp.id+'"></table></div></div>';
			}
			grpList += '</div>';
		
			if ($("table.main table.vis").length == 4) {
				$("table.main table.vis")[0].style.display = 'none';
				$("table.main table.vis")[1].style.display = 'none';
			} else {
				$("table.main table.vis:first").css({"display":"none"});
			}
			if ($("#groupList").length === 0) {
				$("table.main table.vis:first").after(grpList);
			} else {
				$("#groupList table.groupContainers").each(function() {this.innerHTML = '';});
			}
		
			var grps = getValue("villageGroups");
			$("table.vis tr.row_a, table.vis tr.row_b").addClass("villagerow"); // Fix for not messing up the sorting of villages
			$("table.vis tr.villagerow").each(function() {
				var tmpId = this.innerHTML.match( /village=([^&]+)/ );

				var cache = [];

				for (var identi in vils) {
					tmp = vils[identi];

					if (tmp && tmp.id == tmpId[1]) {
						if (grps && grps.indexOf(tmp.group) != -1) {

							$(this).clone().appendTo("#groupListContainer_"+tmp.group);
							cache.push(tmpId[1]);
						}
					}
				}
				if (cache.indexOf(tmpId[1]) == -1) {
					$(this).clone().appendTo("#groupListContainer_0");
				}
			});

			$("#groupList div.groups table tr").each(function() {
		
		
				var tmpId = this.innerHTML.match( /village=([^&]+)/ );
				var alias = '';
				for (identi in vils) {
					tmp = vils[identi];
				//for (i = 0; i < vils.length; i++) {
					//var tmp =vils[i];
					//alert(tmp);
					if (tmp && tmp.id == tmpId[1]) {
						alias = tmp.alias;
						
					}
				}
		
				var tmp = this.innerHTML;
				tmp = tmp.replace(/\n|\r|\t/gi, "");
				if (alias !== '') {
					tmp = tmp.replace(/<td><span id="label_([0-9]+)"><a href="(.+)screen=([a-zA-Z]+)([^"]+)">(.*)<span id="label_text_([0-9]+)">(.+) \(([0-9]+)\|([0-9]+)\) K([0-9]+)<\/span><\/a><\/span>(.+)<\/td><td>(.+)<\/td><td>(.+)<\/td><td>(.+)<\/td>/gi, "<td><table class=\"village\"><tr><td class=\"village_name\"><a href=\"$2screen=$3$4\" title=\"$6\">$5"+alias+"</a></td><td class=\"village_map\"><a href=\"$2screen=map$4\">($8|$9)</a></td><td class=\"village_continent\">K$10</td></tr></table></td><td>$12</td><td>$13</td><td>$14</td>");
				} else {
					tmp = tmp.replace(/<td><span id="label_([0-9]+)"><a href="(.+)screen=([a-zA-Z]+)([^"]+)">(.*)<span id="label_text_([0-9]+)">(.+) \(([0-9]+)\|([0-9]+)\) K([0-9]+)<\/span><\/a><\/span>(.+)<\/td><td>(.+)<\/td><td>(.+)<\/td><td>(.+)<\/td>/gi, "<td><table class=\"village\"><tr><td class=\"village_name\"><a href=\"$2screen=$3$4\">$5$7</a></td><td class=\"village_map\"><a href=\"$2screen=map$4\">($8|$9)</a></td><td class=\"village_continent\">K$10</td></tr></table></td><td>$12</td><td>$13</td><td>$14</td>");
				}
				tmp = tmp.replace(/<td align="center"><img(.+)<img(.+)<img(.+)<\/td><td>(.+)<\/td><td>(.+)<\/td>/gi, "<td><table class=\"resources\"><tr><td><img$1</td><td><img$2</td><td><img$3</td></tr></table></td><td>$4</td><td>$5</td>");

		        //SETTING: FARM SPACE
				farm = tmp.match(/(\d+)\/(\d+)/);
				farm[3] = (farm[2] - farm[1]);
				tmp = tmp.replace(/(\d+)\/(\d+)/gi, farm[3]+" ($2)");

				$(this).html(tmp);
			});
		
			//$("#groupList table.groupContainers tr.villagerow:odd").css({border:"1px solid red"});
			
			$("#groupList table.groupContainers").each(function() {
				var toprow = "<tr><th class=\"village\">"+twe.lang('overview_village')+"</th>";
				toprow += "<th class=\"points\">"+twe.lang('overview_points')+"</th>";
				toprow += "<th class=\"resources\">"+twe.lang('overview_resources')+"</th>";
				toprow += "<th class=\"warehouse\">"+twe.lang('overview_warehouse')+"</th>";
				toprow += "<th>"+twe.lang('overview_farm')+"</th></tr>";

				$(toprow).prependTo(this);
			});
			$("#groupList table.groupContainers tr.villagerow:even").addClass("odd");
			$("#groupList div.groups").each(function() {
				if (this.getElementsByTagName("tr").length == 1) {
					this.style.display = "none";
				}
			});
		// }}} CLEANUP BIT
		},
  'info' : {
	  'mandatory' : false,
   'name' : "Enhanced overview",
   'desc' : "Enhance the overview page, add groups and a neater layout",
   'version' : "0.1",
   'dev' : "Timas"
  }
	};
	plugins.addToolbar = { // Add the premium-like toolbar

		'enhance_game' : function() { // Add the premium-like toolbar
 		//make sure twe.curVillage is initalized
			personals.getCurrentVillage();

			if (/t=([^&]+)/.test(location.href)) {
				var t = '&' + location.href.match(/t=([^&]+)/g)
			} else {
					var t = '';
			}

			var menu_xhtml = '';
            
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=overview_villages'+t+'"><img src="' + personals.getImageBase() + 'unit/unit_snob.png" style="margin:0px 2px" title=" ' + twe.lang("villages") + ' " /></a></td>';
			
			// Add villages dropdown
			var vils = twe.myVillages();
			var multivillage=false;
			for(var v in vils) { if(v!=twe.curVillage) { multivillage = true; break; } }
			if(multivillage && twe.myVillages().length > 1) {
                        // Switch function for the dropdown
				setFunc("switch_village", function(selectObj){
					var target_village_id = selectObj.options[selectObj.selectedIndex].value;
					var redirect_to;
					if(target_village_id == ""){
					
						redirect_to = location.href.replace(/village=([^&]+)/, "village=" + twe.curVillage);
						redirect_to = location.href.replace(/page=([^&]+)/, "");
						redirect_to = location.href.replace(/screen=([^&]+)/, "screen=overview_villages&page=-1");
                                       // redirect_to = "/game.php?village=" + twe.curVillage + "&screen=overview_villages&page=-1";
					}else{
						redirect_to = location.href.replace(/village=([^&]+)/, "village=" + target_village_id);
					}
					location.href = redirect_to;
				});

				menu_xhtml += '<td><select onchange="switch_village(this)"><option value="">- - - - -</option>';

				var grps = personals.villageGroups();

				var tmp_menu_xhtml = '';
				var villist = new Array();

				for (x = 0; x < grps.length; x++) {
					eval("var grp = "+grps[x]);
					
					var option = '';
					
					for(var ij in vils) {
						var vil = vils[ij];
						if (vil['group'] == grp['id']) {
							option += '<option value="' + vil["id"] + '"' + (twe.curVillage == vil["id"] ? ' selected="selected"' : '') + '>' + (vil['alias'] != '' ? decodeURIComponent(vil['alias']) : decodeURIComponent(vil["name"])) + ' [' + vil["points"] + '] ' + vil["x"]+'|'+vil["y"] + '&nbsp;</option>';
							villist.push(vil['id']);
						}
					}
					if (option != '') {
					tmp_menu_xhtml += '<optgroup label="'+grp['name']+'">'; // group optgroup open
					tmp_menu_xhtml += option;
					tmp_menu_xhtml += '</optgroup>'; // group optgroup close
					}
				}

				if (villist.length != vils.length) {
					menu_xhtml += '<optgroup label="'+twe.lang("overview_nogroup")+'">';
				}

				for(var ij in vils) {
					var vil = vils[ij];
					if (villist.indexOf(vil['id']) == -1) {
						if (new String(vil['id']) != 'undefined') {
						menu_xhtml += '<option value="' + vil["id"] + '"' + (twe.curVillage == vil["id"] ? ' selected="selected"' : '') + '>' + (vil['alias'] != '' ? decodeURIComponent(vil['alias']) : decodeURIComponent(vil["name"])) + ' [' + vil["points"] + '] ' + vil["x"]+'|'+vil["y"] + '&nbsp;</option>';
						}
					}
				}
				if (villist.length != vils.length) {
					menu_xhtml += '</optgroup>'; // ungrouped optgroup close
				}
				menu_xhtml += tmp_menu_xhtml;
				menu_xhtml += '</select></td>';
			}

			var TW_Image_Base = personals.getImageBase();

            // Add links
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=overview'+t+'"><img src="' + TW_Image_Base + 'face.png" style="margin:0px 2px" title=" ' + twe.lang("overview") + ' " /></a></td>';
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=map'+t+'"><img src="' + TW_Image_Base + 'ally_rights/found.png" style="margin:0px 2px" title=" ' + twe.lang("map") + ' " /></a></td>';
			menu_xhtml += '<td style="border-left:dotted 1px"><a href="/game.php?village=' + twe.curVillage + '&screen=main'+t+'"><img src="' + TW_Image_Base + 'buildings/main.png" style="margin:0px 2px" title=" ' + twe.lang("main") + ' " /></a></td>';
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=barracks'+t+'"><img src="' + TW_Image_Base + 'buildings/barracks.png" style="margin:0px 2px" title=" ' + twe.lang("barracks") + ' " /></a></td>';
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=stable'+t+'"><img src="' + TW_Image_Base + 'buildings/stable.png" style="margin:0px 2px" title=" ' + twe.lang("stable") + ' " /></a></td>';
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=garage'+t+'"><img src="' + TW_Image_Base + 'buildings/garage.png" style="margin:0px 2px" title=" ' + twe.lang("garage") + ' " /></a></td>';
			if(twe.Premium){
				menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=smith'+t+'"><img src="' + TW_Image_Base + 'buildings/smith.png" style="margin:0px 2px" title=" ' + twe.lang("smith") + ' " /></a></td>';
				menu_xhtml += '<td style="border-left:dotted 1px"><a href="/game.php?village=' + twe.curVillage + '&screen=train'+t+'"><img src="' + TW_Image_Base + 'unit/unit_sword.png" style="margin:0px 2px" title=" ' + twe.lang("train") + ' " /></a></td>';
			}else{
				menu_xhtml += '<td style="border-left:dotted 1px"><a href="/game.php?village=' + twe.curVillage + '&screen=smith'+t+'"><img src="' + TW_Image_Base + 'buildings/smith.png" style="margin:0px 2px" title=" ' + twe.lang("smith") + ' " /></a></td>';
			}
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=place'+t+'"><img src="' + TW_Image_Base + 'buildings/place.png" style="margin:0px 2px" title=" ' + twe.lang("place") + ' " /></a></td>';
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=market'+t+'"><img src="' + TW_Image_Base + 'buildings/market.png" style="margin:0px 2px" title=" ' + twe.lang("market") + ' " /></a></td>';
			menu_xhtml += '<td><a href="/game.php?village=' + twe.curVillage + '&screen=snob'+t+'"><img src="' + TW_Image_Base + 'buildings/snob.png" style="margin:0px 2px" title=" ' + twe.lang("snob") + ' " /></a></td>';
			menu_xhtml += '<td style="border-left: dotted 1px"><a id="twtools_a" href="javascript:tools_show()"><img id="twtools_img" src="' + TW_Image_Base + 'unten.png" style="margin:0px 2px" title="Ext. Tools" /></a></td>';

			setVar("twtools_hidden", "yes");
			setFunc("tools_show", function(){
				window.setTimeout(function() {
					if(getVar("twtools_hidden") == "yes"){
						$("#twtools_div").slideToggle("slow");
						$("#twtools_img")[0].src = personals.getImageBase()+"oben.png";
						$("#twtools_tribe")[0].focus();
						$("#twtools_tribe")[0].value = twe.lang("tribe");
						$("#twtools_tribe")[0].select();
						setVar("twtools_hidden", "no");
					}else{
						$("#twtools_div").slideToggle("slow");
						$("#twtools_img")[0].src = "graphic/unten.png";
						setVar("twtools_hidden", "yes");
					}
				}, 0);
			});

			setFunc("tool_info", function(type){

				var i_obj = $("#twtools_"+type)[0];
				var tribe_name = i_obj.value;
				if(tribe_name=="" || tribe_name==twe.lang(type)){
					i_obj.value = "";
					i_obj.focus();
					return;
				}

				if (type == 'player') {
					window.open("http://" + twe.World + ".tw-tools.com/index.php?name=" + escape(tribe_name) + "&search_at=tribe&object=stat&method=tribe_file&lng=en");
				} else {
					window.open("http://" + twe.World + ".tw-tools.com/index.php?name=" + escape(ally_name) + "&search_at=ally&object=stat&method=ally_file&lng=en");                                        
				}
			});

                // Premium account
			var quickbar = $("quickbar");
			if(quickbar.length > 0) {
                        // Hide quickbar
				quickbar[0].style.display = "none";
			}
			try {
				$("#menu_row2")[0].innerHTML = menu_xhtml;
				var cells = $("#menu_row2 td");
 
				var twt_xhtml = '<tr><td><div id="twtools_div" style="display: none;">';
				twt_xhtml += '<table><tr>';
				twt_xhtml += '<td><a href="http://' + twe.World + '.tw-tools.com/index.php?object=main&method=worldindex&lng=en&type=html" target="_blank">TW-Tools</a>:</td>';
				twt_xhtml += '<td><input type="text" id="twtools_player" value="' + twe.lang("player") + '" /><a href="javascript:tool_info(\'player\')"><img src="' + personals.getImageBase() + 'rechts.png" style="margin:0px 2px" title="' + twe.lang("i_player") + '" /></a></td>';//onfocus="i_focus(this)" onblur="i_blur_tribe(this)"
				twt_xhtml += '<td><input type="text" id="twtools_tribe" value="' + twe.lang("tribe") + '" /><a href="javascript:tool_info(\'tribe\')"><img src="' + personals.getImageBase() + 'rechts.png" style="margin:0px 2px" title="' + twe.lang("i_tribe") + '" /></a></td>';//onfocus="i_focus(this)" onblur="i_blur_ally(this)" 
				twt_xhtml += '</tr></table></div>';
				twt_xhtml += '</td></tr>';
 
				$("#menu_row2")[0].parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML += twt_xhtml;
			} catch(e) {
				log(1, "Failed to execute overall.addToolbar properly, js error: \n"+e);
			}
		},
  'info' : {
	  'mandatory' : false,
   'name' : "Quick access toolbar",
   'desc' : "Add a toolbar to the game to allow quick access to your villages and their specifics",
   'version' : "0.1",
   'dev' : "Timas"
  }
	};
	plugins.distancecalc = { // Calculate the time to travel to a village
		get_distance : function(from, to) {
			var distance_x = from[0]-to[0];
			var distance_y = from[1]-to[1];
			return Math.sqrt(Math.pow(distance_x,2) + Math.pow(distance_y,2));
		},
  'get_distance_table' : function(target) {
	  html = "<table>";
	  html += "<tr><th>Village name</th><th>Distance</th>";
	  if(plugins.quickattack) html += plugins.quickattack.get_overview_heading();
	  html += "</tr>";
	  var villages = twe.myVillages();
	  var arr = [];
	  var count = 0;
	  for(var i in villages) {
		  v = villages[i];
		  html2 = '';
		  //if (count > 9) {style = ' class="distancecalchide" style="display: none;"';} else { style = ''; }
		  html2 += "<tr><td><a href=\"javascript:location.href=location.href.replace(/village=([^&]+)/, 'village=" + v.id+"')\">"+v.name+"</a></td>";
		  var distance = plugins.distancecalc.get_distance([v.x,v.y],target);
		  html2 += "<td>"+Math.round(distance*100)/100+"</td>";
		  if(plugins.quickattack) html2 += plugins.quickattack.get_overview_row(v.id);
		  html2 += "</tr>";
		  arr.push({'distance':distance,'html':html2});
		  count++;
	  }
	  setFunc("distancecalctoggle", function() {
		 $(".distancecalchide").toggle();
		 if ($("#distancecalclink span").html() != 'show') { $("#distancecalclink span").html('show'); } else { $("#distancecalclink span").html('hide'); }
		 
	  });
	  arr.sort(function(a,b) {return a.distance-b.distance;});
	  for(var i=0; i<arr.length; i++) {
		  if (i > 4) {arr[i].html = arr[i].html.replace(/^<tr>/g, '<tr class="distancecalchide" style="display: none;">');} else { arr[i].html = arr[i].html.replace(/^<tr>/g, '<tr class="">'); }
		  if (i%2 == 1) {arr[i].html = arr[i].html.replace(/^<tr class="/g, '<tr class="odd ');}
		  html += arr[i].html;
	  }
	  html += '<tr><td colspan="14"><a id="distancecalclink" href="javascript:distancecalctoggle();"><span>show</span> all villages</a></td></tr>';
	  html += "</table>";
	  return html;
  },

  'enhance_game_info_village' : function() {
	  var target = xpathGetFirst("/html/body/table[3]/tbody/tr/td/table/tbody/tr[2]/td[2]").innerHTML;
	  target = target.replace(/(.+)\((-?\d+\|-?\d+)\)\s(.+)/gi,"$2").split("|");
	  xpathGetFirst("/html/body/table[3]/tbody/tr/td").innerHTML += plugins.distancecalc.get_distance_table(target);;
  },

  'enhance_game_report' : function() {
	  if(!/view=(\d+)/.test(location.href)) return;
	  var target = xpathGetFirst("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td/table[4]/tbody/tr[2]/td[2]/a");
	  if(!target) return;
	  target = target.innerHTML;
	  target = target.replace(/(.+)\((-?\d+\|-?\d+)\)(?: (K\d+))?/gi,"$2").split("|");

	  var content = xpathGetFirst("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td");
	  content.innerHTML += "<h4>Distances</h4>"+plugins.distancecalc.get_distance_table(target);

  },
  'info' : {
	  'mandatory' : false,
   'name' : "Inline distance calculator",
   'desc' : "",
   'version' : "0.1",
   'dev' : "Mog"
  }
	};
	plugins.quickattack = { // Add quick attacks to the village info page
		'get_unit_html' : function(unit, rallypoint) {
			return(
   "<a href=\"javascript:popup('popup_unit.php?unit="+unit.name+"', 520, 520)\">"+
					"<img src=\"graphic/unit/unit_"+unit.name+".png\" title=\""+unit.title+"\" alt=\"\"/></a>" +
					"<input type=\"text\" value=\"\" tabindex=\""+(unit.index+1)+"\" size=\"5\" name=\""+unit.name+"\"/>" +
					"<a href=\"javascript:insertUnit(document.forms[0]."+unit.name+", "+rallypoint.units[unit.index]+")\">"+
					"("+rallypoint.units[unit.index]+")</a>");
		},

  'get_rallypoint_html' : function(village_id,x,y) {
	  var rallypoints = getValue("rallypoints");
	  var rallypoint = rallypoints[village_id];
	  if(!rallypoint) return false;

	  var html = "<h4>Quick Attack</h4><form name=\"units\" action=\"game.php?village="+personals.getCurrentVillage()+"&amp;screen=place&amp;try=confirm\" method=\"post\">\n";

	  html += "<table>\n<tbody><tr>\n";
	  var i=0;
	  var units = plugins.quickattack.getUnits();
	  html += "<td valign=\"top\" width=\"150\"><table class=\"vis\" width=\"100%\"><tbody>";
	  var col=0;
	  for(var i in units) {
		  var unit = units[i];
		  if(unit.col != col) {
			  html += "</tbody></table></td>\n";
			  html += "<td valign=\"top\" width=\"150\"><table class=\"vis\" width=\"100%\"><tbody>";
			  col = unit.col;
		  }
		  html += "<tr><td>"+plugins.quickattack.get_unit_html(unit, rallypoint)+"\n</td></tr>";
	  }
	  html += "</tbody></table></td>\n";

	  html += "<table><tbody><tr>\n<td rowspan=\"2\">\n";
	  html += "x: <input type=\"text\" size=\"5\" value=\""+x+"\" name=\"x\"/>\n";
	  html += "y: <input type=\"text\" size=\"5\" value=\""+y+"\" name=\"y\"/>\n";
	  html += "</td>\n";
		//by using visibility: hidden we still get the gap so that it's the same layout as on the rallypoint
	  html += "<td align=\"top\" style=\"visibility:hidden;\"><a href=\"javascript:popup_scroll('targets.php?village="+personals.getCurrentVillage()+"&amp;mode=own', 340, 400)\">Â» Your own</a></td>\n";
	  html += "<td rowspan=\"2\"><input class=\"attack\" name=\"attack\" value=\"Attack\" style=\"font-size: 10pt;\" type=\"submit\"></td>\n";
	  html += "<td rowspan=\"2\"><input class=\"support\" name=\"support\" value=\"Support\" style=\"font-size: 10pt;\" type=\"submit\"></td>\n";
	  html += "</tr></tbody></table>";
	  html += "</form>";
	  return html;
  },
	//report enhancer by jim5272 http://twenhancer.freeforums.org/report-enhancement-t16.html
  enhance_game_report : function() {
	  var allTR, ResourceParent, allSpans, thisSpan, thisSpansParent, origHtml, newHtml, resourceArray;
	  var resourceTotal, cavReturn;
		
	  resourceTD = $('td:has(> img[src$="graphic/holz.png"])')[0];
	  if(!resourceTD) return;
	  newHtml = resourceTD.innerHTML.replace(/<span.*?<\/span>/g,""); // remove spans
	  newHtml = newHtml.replace(/<img.*?>/g,""); // remove images
	  resourceArray = newHtml.split(" ");
	  resourceTotal = 0.0;
	  if(resourceArray.length){
		  for (var i = 0; i < 3; i++){
			  resourceTotal += (resourceArray[i].valueOf() * 1);
		  }
	  }
	  if (resourceTotal != 0){
		  cavReturn = resourceTotal / 80;
		  cavReturn = Math.ceil(cavReturn);
	  }
		
	  resourceTD.innerHTML += "<br><img src=\"/graphic/res.png\" title=\"Total Available\" alt=\"\"> " + resourceTotal + "&nbsp;<a href=\"javascript:insertUnit(document.forms[0].light, "+cavReturn+")\"><img src=\"graphic/unit/unit_light.png\" title=\"LC to return total\" alt=\"\">&nbsp;" + cavReturn+"</a>";

	  var enemy = xpathGetFirst("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td/table[4]/tbody/tr[2]/td[2]/a").innerHTML;
	  var enemy_x = enemy.replace(/(.+)\((-?\d+)\|(-?\d+)\)(?: (K\d+))?/gi,"$2");
	  var enemy_y = enemy.replace(/(.+)\((-?\d+)\|(-?\d+)\)(?: (K\d+))?/gi,"$3");

	  xpathGetFirst("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table").width='';
	  xpathGetFirst("//td[@height='160']").innerHTML += plugins.quickattack.get_rallypoint_html(personals.getCurrentVillage(),enemy_x,enemy_y);
  },
  getUnits : function() {
	  if(!plugins.quickattack._units)
	  plugins.quickattack._units = getValue("units");
	  return plugins.quickattack._units;
  },
  enhance_game_place : function() {
	  if(/try=confirm/.test(location.href) || /mode=(?:units|sim)/.test(location.href)) return;
	  var units = [];
	  var unitsObj = {};
	  var rallypoint = [];
	  col=0;
	  $("form > table:first tr:first > td").each(function() {
		  $("table tr td", this).each(function() {
			  var title = $(this).find("img")[0].title;
			  var input = $(this).find("input")[0];
				//name = uneval(name);
				//var name = this;
				//var tmp = this.innerHTML.match(//);
			  var unit = {name:input.name,index:(input.tabIndex-1),title:title,col:col};
			  units.push(unit);
			  unitsObj[input.name] = unit;

			  var unitcount = $(this).find("a:last")[0].innerHTML.replace(/\(|\)/g,'');

			  rallypoint.push(unitcount);
		  });
		  col++;
	  });

		// add haul data
	  unitsObj.spear.booty=25;
	  unitsObj.sword.booty=15;
	  unitsObj.axe.booty=10;
	  if(unitsObj.archer) unitsObj.archer.booty=10;
	  unitsObj.spy.booty=0;
	  unitsObj.light.booty=80;
	  if(unitsObj.marcher) unitsObj.marcher.booty=50;
	  unitsObj.heavy.booty=50;
	  unitsObj.ram.booty=0;
	  if(unitsObj.knight) unitsObj.knight.booty=100;
	  unitsObj.snob.booty=0;

	  setValue("units", units);

	  log(3, uneval(units));

		//log(3, uneval(rallypoint));

		//from TW's script.js
	  var getTime = function(element) {
			// Zeit auslesen
		  if(element.firstChild.nodeValue == null) return -1;
		  part = element.firstChild.nodeValue.split(":");

			// FÃƒÂ¼hrende Nullen entfernen
		  for(j=1; j<3; j++) {
			  if(part[j].charAt(0) == "0")
			  part[j] = part[j].substring(1, part[j].length);
		  }

			// Zusammenfassen
		  hours = parseInt(part[0]);
		  minutes = parseInt(part[1]);
		  seconds = parseInt(part[2]);
		  time = hours*60*60+minutes*60+seconds;
		  return parseInt(time);
	  }

	  var now = new Date().getTime();
	  var all = xpathGetAll("//span[@class='timer']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	  var span=false;
		// Find returning troops
	  for(var i=0;i<all.length;i++) {
		  span=all[i];
		  if(/^Return/.test(all.innerHTML)) break;
		  span=false;
	  }
	  var expires;
	  if(span) {
	  } else if(!span && all.length>0) {
		  span = all[0];
			// set expiry to twice the attack time to allow for return.
			// We don't know how long they've been traveling already
			// so just guess that it's twice the remaining attack time
		  expires = now + getTime(span)*1000;
	  } else {
		  expires = 0;
	  }

	  var rallypoints = getValue("rallypoints");
	  if(!rallypoints) rallypoints = new Object();
	  rallypoints[personals.getCurrentVillage()] = {'units':rallypoint,'timestamp':now,'expires':expires};
	  setValue("rallypoints", rallypoints);

	  xpathGetFirst("/html/body/table[3]/tbody/tr/td/table[2]/tbody/tr/td[2]").innerHTML += plugins.quickattack.get_overview();

	  $("form > table:first tr:first table input").change(function() {
		  total=0;
		  $("form > table:first tr:first table input").each(function() {
			  var units = plugins.quickattack.getUnits();
			  unit = units[this.tabIndex-1];
			  if(this.value=='') return;
			  total += parseInt(this.value)*unit.booty;
		  });
		  log(3, total);
	  });
	  setFunc('insertUnit', function insertUnit(input, count) {
		  if(input.value != count)
		  input.value=count;
		  else
			  input.value='';
		  var evt = document.createEvent("HTMLEvents");
		  evt.initEvent("change", true, true);
		  input.dispatchEvent(evt);
	  });
  },
  'get_overview_heading' : function() {
	  var html = "";
	  var units = plugins.quickattack.getUnits();
	  for(var i=0;i<units.length;i++) {
		  var unit = units[i];
		  html += "<th width=\"35\"><img src=\"graphic/unit/unit_"+unit.name+".png\" title=\""+unit.title+"\" alt=\"\"></th>\n";
	  }
	  return html;
  },
  'get_overview' : function() {
		//// add rallypoint overview
	  var rallypoints = getValue("rallypoints");

	  var html="<h3>Rallypoint overview</h3>";
	  html += "<table><tr><th>Village name</th>\n";
	  html += plugins.quickattack.get_overview_heading();
	  html += "<th>Updated</th>";
	  html += "<th>Expires</th>";
	  html += "</tr>";

	  var now = new Date().getTime();
	  TW_Villages = twe.myVillages();
	  var count = 0;
	  for(var i in TW_Villages) {
		  var v = TW_Villages[i];
		  var rallypoint = rallypoints[v.id];
		//  log(1,uneval(rallypoint));
		  out = (v.alias != '') ? v.alias : v.name;
		  if (count%2 == 0) { style = ' class="odd"'; } else { style = ''; }
		  html += "<tr"+style+"><td><a href=\"javascript:location.href=location.href.replace(/village=([^&]+)/, 'village=" + v.id+"')\">"+out+"</a></td>";
		  if(!rallypoint) {
			  html+="<td colspan=\"14\">No data</td></tr>";
			//  continue;
		  } else {
		  html += plugins.quickattack.get_overview_row(v.id);
		  html += "<td>"+Math.round(((now-rallypoint.timestamp)/1000)/60)+" min ago</td>";
		  if(rallypoint.expires === 0) {
			  html += "<td></td>";
		  } else {
			  html += "<td>In "+Math.round(((rallypoint.expires-now)/1000)/60)+" min</td>";
		  }
		  }
		  html += "</tr>\n";
		  count++;
	  }
	  html += "</tr>";
	  html += "</table>\n";
	  return html;
  },
  'get_overview_row' : function(vid) {
	  var rallypoints = getValue("rallypoints");
	  var rallypoint = rallypoints[vid];
	  if(!rallypoint) return "<td colspan=\"0\" align=\"center\">no data</td></tr>";

	  var arr = rallypoint.units;
	  var html = "";
	  for(var j=0;j<arr.length;j++) {
		  html += "<td>"+arr[j]+"</td>";
	  }
	  return html;
  },
  'enhance_game_info_village' : function() {
	  var tbls = $("table");
	  var tmp = [];
	  for(kk=0; kk<tbls.length; kk++){
		  if(tbls[kk].getAttribute("class") == "vis"){
			  tmp = tbls[kk].innerHTML.match( /<td>([^\<]+)<\/td>/i );
			  break;
		  }
	  }

	  var village_id = location.href.replace(/(.+)=(\d+)$/gi, "$2");

	  var village_coords = (tmp && tmp[1]) ? tmp[1] : null;
	  if(village_coords == null) return;
	  village_coords = village_coords.replace(/\|/, "x");

	  var village_coords = village_coords.split("x");
	  xpathGetFirst("/html/body/table[3]/tbody/tr/td").innerHTML += plugins.quickattack.get_rallypoint_html(personals.getCurrentVillage(), village_coords[0], village_coords[1]);
  }
	};
	plugins.reportcache = {
	//production at normal speed
		_production : [
				30, 35, 41, 47,  55,  64,  74,  86, 100, 117, // level 1-10
	136,158,184,214, 249, 289, 337, 391, 455, 530, // level 11-20
 616,717,833,969,1127,1311,1525,1744,2063,2400, // level 21-30
 ],
 getReportsArray : function() {
	 var reports = getValue("reports");
	 var reportsArr = [];
	 for(var k in reports) {
		 reportsArr.push(reports[k]);
	 }
	 return reportsArr;
 },
	// return latest report for all villages
 getReportsByVillage : function() {
	 var reports = getValue("reports");
	 var ret = {};
	 for(var v in reports) {
		 var report = reports[v];
		 var coords = report.coords.join('|');
			// only put in object if it's not already in there or if it's fresher
		 if(!ret[coords] || ret[coords].timestamp < report.timestamp) {
			 ret[coords] = report;
		 }
	 }
	 return ret;
 },
 getReportForCoord : function(coord) {
	 return plugins.reportcache.getReportsByVillage()[coord];
 },
 enhance_game_map : function() {
	 var old_map_popup = unsafeWindow.map_popup;
	 $("#info_content #info_extra_info").after("<tr><td>Last report</td><td id=\"info_reportcache\"></td></tr>");
	 setFunc("map_popup", function map_popup(title, bonus_image, bonus_text, points, owner, ally, village_groups, moral, village_id, source_id) {
		 old_map_popup(title, bonus_image, bonus_text, points, owner, ally, village_groups, moral, village_id, source_id);
		 window.setTimeout(function() {
			 var coord=title.match(/\((-?\d+\|-?\d+)\)/)[1];
			 var report = plugins.reportcache.getReportForCoord(coord);
			 $("#info_reportcache").html(report?report.timefull:"");
		 }, 0);
	 });
 },
 _get_report_html : function() {
	 var html="";
	 var report;
	 var reports = plugins.reportcache.getReportsByVillage();
	 var villages = twe.myVillages();
	 var v = villages[personals.getCurrentVillage()];
	 var vcoords = [v.x,v.y];
	 var i=0;
	 for(var report_id in reports) {
		 report = reports[report_id];
			//log(3, "reportcache report="+uneval(report));
			// age in seconds
			// TODO: remove me - fix for incorrect reports
		 if(report.timestamp.getTime) { report.timestamp = report.timestamp.getTime(); }
		 var age = (servertime.getTime()-report.timestamp)/1000;
		 html +="<table class=\"report\"><tr><th>Target</th><th>"+report.player+"</th></tr>";
		 html += "<tr><th>Village</th><td><a href=\"game.php?village="+personals.getCurrentVillage()+"&amp;screen=info_village&amp;id="+report.villageid+"\">"+report.villagefull+"</a></td></tr>";
		 html += "<tr><th>Date</th><td>"+report.timefull+" "+report.timestamp+"</td></tr>";
		 html += "<tr><th>Distance</th><td>"+plugins.distancecalc.get_distance(vcoords,report.coords)+"</td></tr>\n";
		 html += "<tr><td colspan=\"0\"><a href=\"game.php?village="+personals.getCurrentVillage()+"&amp;screen=report&amp;mode=attack&amp;view="+report.id+"\">Open full report</a></td></tr>\n";

		 html += "<tr><td colspan=\"0\">";
/*
		 html += "<table><tr><th>Buildings</th><td>\n";
		 for(var bname in report.buildings) {
				//html += "<tr>\n";
				//html += "<td>"+plugins.reportcache._buildings[bname]+"</td>\n";
				//html += "<td>"+report.buildings[bname]+"</td>\n";
				//html += "</tr>\n";
		 html += plugins.reportcache._buildings[bname]+" <b>(Level "+report.buildings[bname]+")</b><br/>";
	 }
		 html += "</td></tr></table>";
*/
		 html += "<table>";
		 html += "<tr><th></th><th><img src=\"/graphic/holz.png\"></th><th><img src=\"/graphic/lehm.png\"></th><th><img src=\"/graphic/eisen.png\"</th><th><img src=\"/graphic/res.png\"></th><th></tr>";
		 var sum = 0;
		 for(var i in report.resources) { sum += report.resources[i]; }
		 html += "<tr><th>Last known resource levels</th><td>"+report.resources.join("</td><td>")+"</td><td>"+sum+"</td></tr>\n";
		 if(report.buildings.wood||report.buildings.stone||report.buildings.iron) {
			 html += "<tr><th>Last known Building levels</th><td>"+report.buildings.wood+"</td><td>"+report.buildings.stone+"</td><td>"+report.buildings.iron+"</td></tr>";
			 var resources = report.resources.slice(); // slice = clone array
			 resources[0] += Math.round(plugins.reportcache._production[report.buildings.wood-1]*(age/3600));
			 resources[1] += Math.round(plugins.reportcache._production[report.buildings.stone-1]*(age/3600));
			 resources[2] += Math.round(plugins.reportcache._production[report.buildings.iron-1]*(age/3600));
			 sum = 0;
			 for(var i in resources) { sum += resources[i]; }
			 html += "<tr><th>Estimated resource levels</th><td>"+resources.join("</td><td>")+"</td><td>"+sum+"</td><td>"+"</td></tr>\n";
		 }
		 html += "</td></tr></table>";
		 html += "</td></tr></table>";
		 html += "<hr>";
		 i++;
	 }
	 if(i==0) html += "No reports found - look at some reports first";
	 return html;
 },
 _generate_report : function() {
		// find report id
	 var tmp=location.href.match(/view=(\d+)/);
	 if(!tmp) return false;
	 var report_id = tmp[1];

		// find time report was sent
	 var timeTD = $("table.vis:eq(1) tr:eq(1) td:last")[0];
	 var time;
	 if(/tribalwars.se/.test(location.host)) {
			//example: 19 04 08 21:50
		 var tmp = timeTD.innerHTML.match(/(\d+) (\d+) (\d+) (\d+):(\d+)/);
			// this is a Y3K bug waiting to happen!
		 time = new Date("20"+tmp[3], parseInt(tmp[2])-1, tmp[1], tmp[4], tmp[5]).getTime();
	 } else if(/tribalwars.fr/.test(location.host)) {
			//example: 19.04.08 Ã  17:55
		 var tmp = timeTD.innerHTML.match(/(\d+)\.(\d+)\.(\d+) Ã  (\d+):(\d+)/);
		 time = new Date("20"+tmp[3], parseInt(tmp[2])-1, tmp[1], tmp[4], tmp[5]).getTime();
	 } else {
		 time = Date.parse(timeTD.innerHTML);
	 }
	 var report = {
		 id : report_id,
   timestamp : time,
   timefull : timeTD.innerHTML,
	 };

		// table:eq(2) is Luck table
		// find target table
	 var target = $("table[width='100%']:has(table.vis img[src*='graphic/unit/unit_spear.png']):eq(1)")[0];
		//alert(target.innerHTML);
		//var target = $('table.main table.vis td[colspan=2] > table:eq(3)')[0];
		// this is incorrect for market
	 var targetPlayerA = $('tr:first > th:eq(1)', target)[0];
	 if(!targetPlayerA) {
		 log(1, "Couldn't find target player");
		 return;
	 }
	 report.player = targetPlayerA.innerHTML; // TODO: strip HTML
	 var targetVillageA = $('tr:eq(1) > td:eq(1) a', target)[0];
	 tmp = targetVillageA.href.match(/&id=(\d+)/);
	 report.villageid = tmp[1];
	 tmp = targetVillageA.innerHTML.match(/(.+) \((-?\d+\|-?\d+)\)(?: (K\d+))?/);
	 report.villagefull = targetVillageA.innerHTML;
	 report.villagename = tmp[1];
	 report.coords = tmp[2].split("|");
		
		//var targetUnits = $('tr:eq(2)', target)[0].innerHTML;

		// find resource levels
	 var resourceTD = $('td:has(> img[src$="graphic/holz.png"])')[0];
	 newHtml = resourceTD.innerHTML.replace(/<span.*?<\/span>/g,""); // remove spans
	 newHtml = newHtml.replace(/<img.*?>/g,""); // remove images
	 var resources = newHtml.split(" ");
	 resources.length=3;
	 resources = resources.map(function(element) {return parseInt(element);});
	 report.resources = resources;

		// find building levels
	 var buildingsTD = $('tr:has(> td > img[src$="graphic/holz.png"]) + tr:first > td')[0];
	 report.buildings = !buildingsTD ? {} : plugins.reportcache._get_buildings(buildingsTD);
	 return report;
 },
 _buildings : null,
 getBuildings : function() {
	 if(!plugins.reportcache._buildings)
	 plugins.reportcache._buildings = getValue("buildings");
	 return plugins.reportcache._buildings;
 },
 enhance_game_main : function() {
	 var buildings = {};
	 $('table[class=vis]:has(tr:eq(1) td:eq(6)) tr td:first-child').each(function() {
		 var tmp = this.innerHTML.match(/screen=(.*?)"><img.*> (.*)</);
		 buildings[tmp[1]] = tmp[2];
	 });
	 setValue("buildings", buildings);
 },
 enhance_game_report : function() {
	 var report = plugins.reportcache._generate_report();
	 if(report) plugins.reportcache._update_report(report);

	 $('table.vis:first').append('<tr><td><a href="javascript:reportcache()">Report Summary</a></td></tr>');
	 setFunc("reportcache", function() { window.setTimeout(function() {
		 $("table.main table:first tr:first > td:eq(1)").html(plugins.reportcache._get_report_html());
	 }, 0)});
 },
 _update_report : function(report) {
	 var reports = getValue("reports");
	 if(!reports) reports = {};
	 reports[report.id] = report;
	 setValue("reports", reports);
	 log(3, "reportcache updated report="+uneval(report));
 },
 _get_buildings : function(buildingsTD) {
		/*
	 Village Headquarters <b>(Level 29)</b><br>
	 Barracks <b>(Level 21)</b><br>
	 Stable <b>(Level 4)</b><br>
	 Smithy <b>(Level 8)</b><br>
	 Rally point <b>(Level 1)</b><br>
	 Statue <b>(Level 1)</b><br>
	 Market <b>(Level 19)</b><br>
	 Timber camp <b>(Level 24)</b><br>
	 Clay pit <b>(Level 19)</b><br>
	 Iron mine <b>(Level 16)</b><br>
	 Farm <b>(Level 16)</b><br>
	 Warehouse <b>(Level 24)</b><br>
	 Hiding place <b>(Level 3)</b><br>
	 Wall <b>(Level 2)</b><br>		
		*/
	 var reverse = array_flip(plugins.reportcache.getBuildings());
	 var buildingsText = buildingsTD.innerHTML.replace(/<.+?>/g,""); //this can also contain the loyalty loss.
	 var buildings = {};
	 $.each(buildingsText.split('\n'), function(i, buildingText) {
		 var tmp = buildingText.match(/\s*(.*) \(.*?(\d+)\)/);
		 if(!tmp) return; // don't know what this is -- return silently
		 building = tmp[1];
		 var level = tmp[2];
		 if(!reverse[building]) {
			 log(2, "reportcache: Unknown building: "+building);
			 return;
		 }
		 buildings[reverse[building]] = level;
			//if we want to display the full building name i suggest we grab the raw HTML. Use this code instead:
			//buildings[reverse[building]] = {level:level, text:buildingText};
	 });
	 return buildings;
 },
	};
	plugins.mapexpand = { // Expand the map to be X times it's regular size
	// Map Points Tracking
		'get_mpt_xhtml' : function(village_coords, points){
			if(TW_Mpt[village_coords] == null) return "";

			plugins.mapexpand.put_mpt(village_coords, points);
			var delta = points - TW_Mpt[village_coords];
			if(delta > 0) return ' <span style="color:green">(+' + delta + ')</span>';
			if(delta == 0) return ' <span style="color:black">(0)</span>';
			return ' <span style="color:red">(-' + Math.abs(delta) + ')</span>';
		},

  'get_mpt' : function (){
	  var cacheMpt = getValue("MPTrk");
	  if(!cacheMpt || cacheMpt == ""){
		  cacheMpt = [];
	  }else{
		  cacheMpt = unserialize(cacheMpt);
	  }
	  return cacheMpt;
  },

  'put_mpt' : function (village_coords, points){
	  window.setTimeout(function() {
		  var cacheMpt = get_mpt();
		  cacheMpt[village_coords] = points;
		  var to_save = serialize_x(cacheMpt);
		  TW_setValue("MPTrk", to_save);
	  },0);
  },
  'enhance_game_map': function(){
	  var TW_Image_Base = personals.getImageBase();
		// Get map size
	  var new_size = getValue("MSize");
	  if(!new_size) new_size = 15;

		// map controls
	  setFunc("resize_map", function(){
		  var mss = xpathGetFirst("//*[@id='map_size_select']");
		  var nsz = parseInt(mss.options[mss.selectedIndex].value);

		  window.setTimeout(function(){setValue("MSize", nsz);}, 0);
		  window.setTimeout("window.location.reload(true)", 100);
	  });

	  var form = $$("form")[1];
	  var sizes = [7, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30];
	  var iHtml = '<table><tr><td colspan="2">&nbsp;</td></tr><tr><td align="right">Map size: </td><td><select id="map_size_select" onchange="resize_map()">';
	  for(kk=0; kk<sizes.length; kk++) iHtml += '<option ' + (sizes[kk]==new_size ? 'selected="selected" ' : '') + 'value="' + sizes[kk] +'">' + sizes[kk] + 'x' + sizes[kk] + (sizes[kk]==7?' (off)':'') + '</option>';

	  iHtml += '</select></td></tr>';
	  iHtml += '<tr><td align="right">Mark player: </td><td><input type="text" id="mark_player" size="8" /><input type="text" id="mark_tribe" size="8" /><a href="javascript:search_map();"><img src="'+TW_Image_Base+'/map/map_e.png" /></a></td></tr>';

	  iHtml += '</table>';
	  form.innerHTML += iHtml;
		// end map controls

	  if(new_size == 7) return;

	  window.setTimeout(function() {
		  setValue("MSize", new_size);
	  },0);

	  setFunc("search_map", function(){

		  var plr = xpathGetFirst("//*[@id='mark_player']");
		  var trb = xpathGetFirst("//*[@id='mark_tribe']");
		  var map = document.getElementById("mapCoords");

		  var villages = map.getElementsByTagName("img");

		  for (i = 0; i < villages.length; i++) {
			
			  var tmp = villages[i].getAttribute("onmouseover");

			  if (tmp != null) {
				  tmp = tmp.replace(/map_popup\('(.+)', '(.*)', '(.*)', (\d+), '(.+)\s\((.+)\)', '(.+)\s\((.+) Points\)', (\w+), (\w+), (\w+), (\w+)\)/gi, "$5 $7");

				  if (villages[i].getAttribute("rel") != null) {

					  villages[i].style.border = 'none';
					  villages[i].style.width = '53px';
					  villages[i].style.height = '38px';
					  villages[i].setAttribute("rel", null);
				  }

				  if (plr.value != '') {
					  if (tmp.match(new RegExp(plr.value, "i"))) {
						  villages[i].style.border = '1px solid red';
						  villages[i].style.width = '51px';
						  villages[i].style.height = '36px';
						  villages[i].setAttribute("rel","searched");
					  }
				  }
				  if (trb.value != '') {
					  if (tmp.match(new RegExp(trb.value+"$", "i")) && villages[i].getAttribute("rel") == null) {
						  villages[i].style.border = '1px solid blue';
						  villages[i].style.width = '51px';
						  villages[i].style.height = '36px';
						  villages[i].setAttribute("rel","searched");
					  }
				  }
			  }

		  }
	  });

	  var map_requests_needed = null;
	  var map_requests_size   = null;

	  if(new_size < 16){
		  map_requests_needed = 1;
	  }else{
		  map_requests_needed = 4;
		  map_requests_size   = parseInt(new_size / 2);
		  new_size = map_requests_size * 2;
	  }

		// Get mpt points
	  TW_Mpt = plugins.mapexpand.get_mpt();

		// Get current position
	  var map_x = getVar("mapX");
	  var map_y = getVar("mapY");
	  var map_s = getVar("mapSize");

		// Calculate new X and Y
	  var delta = parseInt((map_s - new_size) / 2);

		// Overwrite values
	  map_x += delta;
	  map_y += delta;

		// InnerHTML
	  var ihtml = "";
	  ihtml += '<tr>';
	  ihtml += '<td height="38">' + map_y + '</td>';
	  ihtml += '<td colspan="' + new_size + '" rowspan="' + new_size + '">';
	  ihtml += '<div style="background-image:url(graphic/map/gras1.png); position:relative; width:' + (53 * new_size) + 'px; height:' + (38 * new_size) +'px; overflow:hidden" id="map">';
	  ihtml += '<div id="mapOld" style="position:absolute">';
	  if(map_requests_needed == 4){
		  var w = 53 * map_requests_size + 1;
		  var h = 38 * map_requests_size + 2;
		  ihtml += '<table cellspacing="0" cellpadding="0"><tr><td><div id="old_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="old_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="old_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="old_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';
	  }
	  ihtml += '<div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div>';
	  ihtml += '</div>';
	  ihtml += '<div id="mapNew" style="position:absolute; left:0px; top:0px">&nbsp;</div>';
	  ihtml += '</div>';
	  ihtml += '</td>';
	  ihtml += '</tr>';
	  for(jj=1; jj<new_size; jj++){
		  ihtml += '<tr><td width="20" height="38">' + (map_y + jj) + '</td></tr>';
	  }
	  ihtml += '<tr id="map_x_axis">';
	  ihtml += '<td height="20"></td>';
	  for(jj=0; jj<new_size; jj++){
		  ihtml += '<td align="center" width="53">' + (map_x + jj) + '</td>';
	  }
	  ihtml += '</tr>';
	  xpathGetFirst("//*[@id='mapCoords']").innerHTML = ihtml;

		// Update data (asynchronously)
	  if(map_requests_needed == 1){
		  var url = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + new_size + '&size_y=' + new_size;
		  var xhReq = new XMLHttpRequest();
		  xhReq.open("GET", url, true);
		  xhReq.onreadystatechange = function(){
			  if(xhReq.readyState != 4 || xhReq.status != 200) return;
			  xpathGetFirst("//*[@id='mapOld']").innerHTML = xhReq.responseText;
		  }
		  xhReq.send(null);
	  }else{
		  var url_1 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		  var url_2 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		  var url_3 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		  var url_4 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;

		  var xhReq_1 = new XMLHttpRequest();
		  xhReq_1.open("GET", url_1, true);
		  xhReq_1.onreadystatechange = function(){
			  if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
			  xpathGetFirst("//*[@id='old_1']").innerHTML = xhReq_1.responseText;
		  }
		  xhReq_1.send(null);

		  var xhReq_2 = new XMLHttpRequest();
		  xhReq_2.open("GET", url_2, true);
		  xhReq_2.onreadystatechange = function(){
			  if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
			  xpathGetFirst("//*[@id='old_2']").innerHTML = xhReq_2.responseText;
		  }
		  xhReq_2.send(null);

		  var xhReq_3 = new XMLHttpRequest();
		  xhReq_3.open("GET", url_3, true);
		  xhReq_3.onreadystatechange = function(){
			  if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
			  xpathGetFirst("//*[@id='old_3']").innerHTML = xhReq_3.responseText;
		  }
		  xhReq_3.send(null);

		  var xhReq_4 = new XMLHttpRequest();
		  xhReq_4.open("GET", url_4, true);
		  xhReq_4.onreadystatechange = function(){
			  if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
			  xpathGetFirst("//*[@id='old_4']").innerHTML = xhReq_4.responseText;
		  }
		  xhReq_4.send(null);

		  setFunc("downloadMapData", function(x_mod, y_mod){

			  var map_x  = getVar("mapX");
			  var map_y  = getVar("mapY");
			  var map_s  = getVar("mapSize");
			  var map_ss = map_s / 2;

			  map_x += x_mod * map_s;
			  map_y += y_mod * map_s;

			  window.setTimeout(function() {
				  setVar("mapX", map_x);
				  setVar("mapY", map_y);}, 0);

				// Prepare new blocks
				  var w = 53 * map_ss + 1;
				  var h = 38 * map_ss + 1;
				  var map_new = getVar("mapNew");
				  map_new.innerHTML = '<table cellspacing="0" cellpadding="0"><tr><td><div id="new_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="new_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="new_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="new_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';

				  var url_1 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
				  var url_2 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
				  var url_3 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;
				  var url_4 = twe.Server + "/" + getVar("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;

				  var xhReq_1 = new XMLHttpRequest();
				  xhReq_1.open("GET", url_1, true);
				  xhReq_1.onreadystatechange = function(){
					  if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
					  xpathGetFirst("//*[@id='new_1']").innerHTML = xhReq_1.responseText;
				  }
				  xhReq_1.send(null);

				  var xhReq_2 = new XMLHttpRequest();
				  xhReq_2.open("GET", url_2, true);
				  xhReq_2.onreadystatechange = function(){
					  if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
					  xpathGetFirst("//*[@id='new_2']").innerHTML = xhReq_2.responseText;
				  }
				  xhReq_2.send(null);

				  var xhReq_3 = new XMLHttpRequest();
				  xhReq_3.open("GET", url_3, true);
				  xhReq_3.onreadystatechange = function(){
					  if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
					  xpathGetFirst("//*[@id='new_3']").innerHTML = xhReq_3.responseText;
				  }
				  xhReq_3.send(null);

				  var xhReq_4 = new XMLHttpRequest();
				  xhReq_4.open("GET", url_4, true);
				  xhReq_4.onreadystatechange = function(){
					  if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
					  xpathGetFirst("//*[@id='new_4']").innerHTML = xhReq_4.responseText;
				  }
				  xhReq_4.send(null);
		  });

			// ScrollX fix
		  function watchMouse(e){
			  var info = document.getElementById("info");
			  if(!info || info.style.visibility != "visible") return false;

			  var scrollX, scrollY, mouseX, mouseY;
			  if(e){
				  scrollX = window.pageXOffset;
				  scrollY = window.pageYOffset;
				  mouseX  = e.clientX;
				  mouseY  = e.clientY;
			  }else{
				  scrollX = document.body.scrollLeft;
				  scrollY = document.body.scrollTop;
				  mouseX  = window.event.clientX;
				  mouseY  = window.event.clientY;
			  }

			  info.style.left = mouseX + 5 + scrollX + "px";
			  info.style.top =  mouseY - 100 + scrollY + "px";
			  return true;
		  };

		  if(document.addEventListener) document.addEventListener("mousemove", watchMouse, true);
		  else document.onmousemove = watchMouse;
	  }

		// ajaxMapInit()
	  window.setTimeout(function() {
		  setVar("mapOld",  xpathGetFirst("//*[@id='mapOld']"));
		  setVar("mapNew",  xpathGetFirst("//*[@id='mapNew']"));
		  setVar("mapX",    map_x);
		  setVar("mapY",    map_y);
		  setVar("mapSize", new_size);
	  }, 0);

		// mapMoveTopo()
	  var scrollX = map_x;
	  var scrollY = map_y;
	  window.setTimeout(function() {
		  setVar("scrollX", scrollX);
		  setVar("scrollY", scrollY);
	  }, 0);
	  var topoX = parseInt(document.getElementsByName('min_x')[0].value);
	  var topoY = parseInt(document.getElementsByName('min_y')[0].value);

	  var relX = scrollX - topoX;
	  if(getVar("globalYDir") == 1){
		  var relY = scrollY - topoY;
	  }else{
		  var relY = (45-mapSize) - (scrollY-topoY);
	  }
	
		// Rechteck verschieben (whatever this mean :)
	  var topoRect = xpathGetFirst('//*[@id="topoRect"]');
	  topoRect.style.left   = (5*(relX)) + 'px';
	  topoRect.style.top    = (5*(relY)) + 'px';
	  topoRect.style.width  = (5*(new_size)) + 'px';
	  topoRect.style.height = (5*(new_size)) + 'px';

		// Tracking

	  setFunc("old_map_popup", getFunc("map_popup"));
	  setFunc("map_popup", function(title, bonus_image, bonus_text, points, owner, ally, village_groups, moral, village_id, source_id){
		  var x_title  = arguments[0];
		  var x_points = null;
		  if(arguments.length == 8){
			  x_points = arguments[1];
			  (getFunc("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
		  }else{
			  x_points = arguments[3];
			  (getFunc("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);			
		  }

		
		  var tmp = x_title.match( /\(([^\)]+)/ );
		  var vlg_coords = tmp && tmp[1] ? tmp[1] : null;

		  if(vlg_coords != null){

			  vlg_coords = vlg_coords.replace(/\|/, "x");
	
				//var villagelinks = $("mapCoords").getElementsByTagName("a");
			  var villagelinks = xpathGetAll("//*[@id='mapCoords']//a");
			  for (i =0; i < villagelinks.length; i++) { 
			
				  var curvil = new String(villagelinks[i].innerHTML);
				  var curcord = curvil.replace(/(.+)\((-?\d+)\|(-?\d+)\)(.+)/gi, "$2x$3");
				  if (curcord == vlg_coords) {
					  curid = villagelinks[i].href.replace(/^(.+)id=(\d+)$/i, "$2");
				  }
			  }
			  var pointrackinfo = (plugins.mapexpand.get_mpt_xhtml(vlg_coords, x_points) != '') ? plugins.mapexpand.get_mpt_xhtml(vlg_coords, x_points) : plugins.mapexpand.get_mpt_xhtml(curid, x_points);
			  xpathGetFirst("//[@id='info_points']").innerHTML = x_points + pointrackinfo;
		  }
	  });
  }
	};
	plugins.inpagepopup = function() {
		var ret = {};
		var inpagePopup = function (url,pwidth,pheight) {
			window.setTimeout(function() {
				var popdiv = document.getElementById('innerpopdiv');
				if (popdiv.style.display == 'block') { popdiv.style.display = 'none'; return;}

				var html = '<table class="vis" width="100%">\n';
				var villages = twe.myVillages();
				for(var v in villages) {
					var village = villages[v];
					html += "<tr><td>"+village.name+"</td>";
					html += "<td>"+village.resourcesHTML+"</td>	<td>";
					html += "<a href=\"javascript:selectTargetInPage("+village.x+", "+village.y+")\">"+village.x+"|"+village.y+"</a></td></tr>";
				}
				html += '</table>';
				popdiv.innerHTML = html;

				var ischecked = (getValue("showpoponhover") == 1) ? "checked=\"checked\"" : "";

				popdiv.setAttribute("style", "position: absolute; width: 500px; display:block;");
			},0);
		};
		ret.enhance_game_place = ret.enhance_game_market = function() {
			var yourown = $('a[href*=javascript:popup_scroll(\'targets.php?village=]')[0];
			if(!yourown) return; // only has 1 village

			setFunc("inpagePopup", inpagePopup);
			setFunc("selectTargetInPage", function(x, y) {
				$("form[name='units'] input[name='x']")[0].value = x;
				$("form[name='units'] input[name='y']")[0].value = y;
				document.getElementById("innerpopdiv").style.display = 'none';
			});

			yourown.id="inpagepoplink";
			yourown.href=unescape(yourown.href).replace(/javascript:popup_scroll\('(.+)', (\d+), (\d+)\)/, "javascript:inpagePopup('$1',$2,$3)");
			$(yourown).after("<div id=\"innerpopdiv\" style=\"display: none;\">&nbsp;</div>");
		};
		return ret;
	}();
	plugins.attackcache = {
		enhance_game_place : function() {
			if(!location.href.match(/&try=confirm/)) return;
			var form = $("form[action*='action=command']")[0];
			if(!form) return;
			var targetcoords = [
					$("input[name='x']",form)[0].value,
	 $("input[name='y']",form)[0].value];
		// TODO - add onsubmit that adds to attackcache
		},
	};

// Kicker
	for(var pname in plugins) {
		var plugs = twe.getPlugins();
		if (plugs.indexOf(pname) == -1) {
			var func = plugins[pname]["enhance_"+twe.Page];
			if(func) { func(); }
			func = plugins[pname]["enhance_"+twe.Page+"_"+twe.Screen];
			if(func) { func(); }
		}
	}