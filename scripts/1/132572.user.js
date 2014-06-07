// ==UserScript==
// @version        2.2.2
// @name           CNC TA Base scanner
// @namespace      http://g3gg0.de
// @description
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require        http://sizzlemctwizzle.com/updater.php?id=132572
// ==/UserScript==

(function ()
{
var g3_baseScanMain = function ()
    {
        try
        {
            /* compressed with http://javascriptcompressor.com/ */

            /* http://jquery.com/ */
            eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(y(1Q,14){G 19=1Q.19,bA=1Q.bA,bB=1Q.bB;G k=(y(){G k=y(Q,R){B 2H k.fn.5C(Q,R,6k)},eM=1Q.k,4B$=1Q.$,6k,eN=/^(?:[^#<]*(<[\\w\\W]+>)[^>]*$|#([\\w\\-]*)$)/,bC=/\\S/,bD=/^\\s+/,bE=/\\s+$/,eO=/^<(\\w+)\\s*\\/?>(?:<\\/\\1>)?$/,eP=/^[\\],:{}\\s]*$/,eQ=/\\\\(?:["\\\\\\/iQ]|u[0-9a-fA-F]{4})/g,eR=/"[^"\\\\\\n\\r]*"|P|17|T|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?/g,eS=/(?:^|:|,)(?:\\s*\\[)+/g,eT=/(eU)[ \\/]([\\w.]+)/,eV=/(iR)(?:.*9v)?[ \\/]([\\w.]+)/,eW=/(iS) ([\\w.]+)/,eX=/(iT)(?:.*? iU:([\\w.]+))?/,eY=/-([a-z]|[0-9])/ig,eZ=/^-ms-/,f0=y(4C,f1){B(f1+"").9w()},bF=bA.bF,87,88,50,5D=9x.39.5D,9y=9x.39.iV,1R=45.39.1R,2I=45.39.2I,46=9z.39.46,2V=45.39.2V,bG={};k.fn=k.39={5E:k,5C:y(Q,R,6k){G M,6,K,1J;if(!Q){B C}if(Q.1c){C.R=C[0]=Q;C.J=1;B C}if(Q==="1m"&&!R&&19.1m){C.R=19;C[0]=19.1m;C.Q=Q;C.J=1;B C}if(1b Q==="1C"){if(Q.bH(0)==="<"&&Q.bH(Q.J-1)===">"&&Q.J>=3){M=[T,Q,T]}N{M=eN.2e(Q)}if(M&&(M[1]||!R)){if(M[1]){R=R 7f k?R[0]:R;1J=(R?R.34||R:19);K=eO.2e(Q);if(K){if(k.89(R)){Q=[19.2s(K[1])];k.fn.3i.1l(Q,R,P)}N{Q=[1J.2s(K[1])]}}N{K=k.bI([M[1]],[1J]);Q=(K.6l?k.3j(K.2f):K.2f).47}B k.7g(C,Q)}N{6=19.6m(M[2]);if(6&&6.1i){if(6.id!==M[2]){B 6k.2N(Q)}C.J=1;C[0]=6}C.R=19;C.Q=Q;B C}}N if(!R||R.7h){B(R||6k).2N(Q)}N{B C.5E(R).2N(Q)}}N if(k.1Y(Q)){B 6k.3D(Q)}if(Q.Q!==14){C.Q=Q.Q;C.R=Q.R}B k.2W(Q,C)},Q:"",7h:"1.7.2",J:0,iW:y(){B C.J},bJ:y(){B 2I.1l(C,0)},27:y(4o){B 4o==T?C.bJ():(4o<0?C[C.J+4o]:C[4o])},3O:y(1T,H,Q){G K=C.5E();if(k.3k(1T)){1R.2g(K,1T)}N{k.7g(K,1T)}K.bK=C;K.R=C.R;if(H==="2N"){K.Q=C.Q+(C.Q?" ":"")+Q}N if(H){K.Q=C.Q+"."+H+"("+Q+")"}B K},1n:y(1p,1z){B k.1n(C,1p,1z)},3D:y(fn){k.bL();88.2h(fn);B C},eq:y(i){i=+i;B i===-1?C.2I(i):C.2I(i,i+1)},29:y(){B C.eq(0)},51:y(){B C.eq(-1)},2I:y(){B C.3O(2I.2g(C,1s),"2I",2I.1l(1s).6n(","))},3a:y(1p){B C.3O(k.3a(C,y(6,i){B 1p.1l(6,i,6)}))},3E:y(){B C.bK||C.5E(T)},1R:1R,6o:[].6o,3P:[].3P};k.fn.5C.39=k.fn;k.1O=k.fn.1O=y(){G 1e,H,1A,48,9A,3j,1K=1s[0]||{},i=1,J=1s.J,4p=17;if(1b 1K==="8a"){4p=1K;1K=1s[1]||{};i=2}if(1b 1K!=="1S"&&!k.1Y(1K)){1K={}}if(J===i){1K=C;--i}U(;i<J;i++){if((1e=1s[i])!=T){U(H in 1e){1A=1K[H];48=1e[H];if(1K===48){6p}if(4p&&48&&(k.89(48)||(9A=k.3k(48)))){if(9A){9A=17;3j=1A&&k.3k(1A)?1A:[]}N{3j=1A&&k.89(1A)?1A:{}}1K[H]=k.1O(4p,3j,48)}N if(48!==14){1K[H]=48}}}}B 1K};k.1O({iX:y(4p){if(1Q.$===k){1Q.$=4B$}if(4p&&1Q.k===k){1Q.k=eM}B k},9B:17,9C:1,iY:y(f2){if(f2){k.9C++}N{k.3D(P)}},3D:y(9D){if((9D===P&&!--k.9C)||(9D!==P&&!k.9B)){if(!19.1m){B 6q(k.3D,1)}k.9B=P;if(9D!==P&&--k.9C>0){B}88.7i(19,[k]);if(k.fn.3n){k(19).3n("3D").3F("3D")}}},bL:y(){if(88){B}88=k.6r("5F 2O");if(19.4D==="2X"){B 6q(k.3D,1)}if(19.5G){19.5G("50",50,17);1Q.5G("8b",k.3D,17)}N if(19.52){19.52("7j",50);1Q.52("9E",k.3D);G bM=17;2D{bM=1Q.iZ==T}2E(e){}if(19.2t.f3&&bM){bN()}}},1Y:y(1F){B k.E(1F)==="y"},3k:45.3k||y(1F){B k.E(1F)==="28"},5H:y(1F){B 1F!=T&&1F==1F.1Q},9F:y(1F){B!bO(2u(1F))&&j0(1F)},E:y(1F){B 1F==T?9z(1F):bG[5D.1l(1F)]||"1S"},89:y(1F){if(!1F||k.E(1F)!=="1S"||1F.1c||k.5H(1F)){B 17}2D{if(1F.5E&&!9y.1l(1F,"5E")&&!9y.1l(1F.5E.39,"j1")){B 17}}2E(e){B 17}G 1j;U(1j in 1F){}B 1j===14||9y.1l(1F,1j)},8c:y(1F){U(G H in 1F){B 17}B P},2P:y(9G){bP 2H bQ(9G);},bR:y(L){if(1b L!=="1C"||!L){B T}L=k.46(L);if(1Q.9H&&1Q.9H.f4){B 1Q.9H.f4(L)}if(eP.1a(L.1r(eQ,"@").1r(eR,"]").1r(eS,""))){B(2H f5("B "+L))()}k.2P("f6 9H: "+L)},f7:y(L){if(1b L!=="1C"||!L){B T}G 2F,2G;2D{if(1Q.f8){2G=2H f8();2F=2G.j2(L,"1Z/2F")}N{2F=2H 9I("f9.j3");2F.4E="17";2F.j4(L)}}2E(e){2F=14}if(!2F||!2F.2t||2F.2A("fa").J){k.2P("f6 j5: "+L)}B 2F},bS:y(){},bT:y(L){if(L&&bC.1a(L)){(1Q.j6||y(L){1Q["j7"].1l(1Q,L)})(L)}},5I:y(1C){B 1C.1r(eZ,"ms-").1r(eY,f0)},1d:y(6,H){B 6.1d&&6.1d.9w()===H.9w()},1n:y(1S,1p,1z){G H,i=0,J=1S.J,bU=J===14||k.1Y(1S);if(1z){if(bU){U(H in 1S){if(1p.2g(1S[H],1z)===17){2J}}}N{U(;i<J;){if(1p.2g(1S[i++],1z)===17){2J}}}}N{if(bU){U(H in 1S){if(1p.1l(1S[H],H,1S[H])===17){2J}}}N{U(;i<J;){if(1p.1l(1S[i],i,1S[i++])===17){2J}}}}B 1S},46:46?y(1Z){B 1Z==T?"":46.1l(1Z)}:y(1Z){B 1Z==T?"":1Z.5D().1r(bD,"").1r(bE,"")},2W:y(28,1L){G K=1L||[];if(28!=T){G E=k.E(28);if(28.J==T||E==="1C"||E==="y"||E==="j8"||k.5H(28)){1R.1l(K,28)}N{k.7g(K,28)}}B K},6s:y(6,28,i){G 3Q;if(28){if(2V){B 2V.1l(28,6,i)}3Q=28.J;i=i?i<0?53.5J(0,3Q+i):i:0;U(;i<3Q;i++){if(i in 28&&28[i]===6){B i}}}B-1},7g:y(29,7k){G i=29.J,j=0;if(1b 7k.J==="4q"){U(G l=7k.J;j<l;j++){29[i++]=7k[j]}}N{2q(7k[j]!==14){29[i++]=7k[j++]}}29.J=i;B 29},5K:y(1T,1p,9J){G K=[],8d;9J=!!9J;U(G i=0,J=1T.J;i<J;i++){8d=!!1p(1T[i],i);if(9J!==8d){K.1R(1T[i])}}B K},3a:y(1T,1p,bV){G I,1j,K=[],i=0,J=1T.J,3k=1T 7f k||J!==14&&1b J==="4q"&&((J>0&&1T[0]&&1T[J-1])||J===0||k.3k(1T));if(3k){U(;i<J;i++){I=1p(1T[i],i,bV);if(I!=T){K[K.J]=I}}}N{U(1j in 1T){I=1p(1T[1j],1j,bV);if(I!=T){K[K.J]=I}}}B K.6t.2g([],K)},2k:1,8e:y(fn,R){if(1b R==="1C"){G 2G=fn[R];R=fn;fn=2G}if(!k.1Y(fn)){B 14}G 1z=2I.1l(1s,2),8e=y(){B fn.2g(R,1z.6t(2I.1l(1s)))};8e.2k=fn.2k=fn.2k||8e.2k||k.2k++;B 8e},4F:y(1T,fn,1j,I,9K,bW,54){G 2e,bX=1j==T,i=0,J=1T.J;if(1j&&1b 1j==="1S"){U(i in 1j){k.4F(1T,fn,i,1j[i],1,bW,I)}9K=1}N if(I!==14){2e=54===14&&k.1Y(I);if(bX){if(2e){2e=fn;fn=y(6,1j,I){B 2e.1l(k(6),I)}}N{fn.1l(1T,I);fn=T}}if(fn){U(;i<J;i++){fn(1T[i],1j,2e?I.1l(1T[i],i,fn(1T[i],1j)):I,54)}}9K=1}B 9K?1T:bX?fn.1l(1T):J?fn(1T[0],1j):bW},3G:y(){B(2H bY()).fb()},fc:y(5L){5L=5L.1D();G M=eT.2e(5L)||eV.2e(5L)||eW.2e(5L)||5L.2V("j9")<0&&eX.2e(5L)||[];B{5M:M[1]||"",9v:M[2]||"0"}},bZ:y(){y 3o(Q,R){B 2H 3o.fn.5C(Q,R)}k.1O(P,3o,C);3o.ja=C;3o.fn=3o.39=C();3o.fn.5E=3o;3o.bZ=C.bZ;3o.fn.5C=y 5C(Q,R){if(R&&R 7f k&&!(R 7f 3o)){R=3o(R)}B k.fn.5C.1l(C,Q,R,fd)};3o.fn.5C.39=3o.fn;G fd=3o(19);B 3o},5M:{}});k.1n("jb jc 9z f5 45 bY 5N 9x".2K(" "),y(i,H){bG["[1S "+H+"]"]=H.1D()});87=k.fc(bF);if(87.5M){k.5M[87.5M]=P;k.5M.9v=87.9v}if(k.5M.eU){k.5M.jd=P}if(bC.1a("\\c0")){bD=/^[\\s\\c0]+/;bE=/[\\s\\c0]+$/}6k=k(19);if(19.5G){50=y(){19.8f("50",50,17);k.3D()}}N if(19.52){50=y(){if(19.4D==="2X"){19.c1("7j",50);k.3D()}}}y bN(){if(k.9B){B}2D{19.2t.f3("1t")}2E(e){6q(bN,1);B}k.3D()}B k})();G c2={};y fe(3b){G 1S=c2[3b]={},i,J;3b=3b.2K(/\\s+/);U(i=0,J=3b.J;i<J;i++){1S[3b[i]]=P}B 1S}k.6r=y(3b){3b=3b?(c2[3b]||fe(3b)):{};G 2i=[],56=[],2O,7l,7m,9L,7n,6u,2h=y(1z){G i,J,6,E,je;U(i=0,J=1z.J;i<J;i++){6=1z[i];E=k.E(6);if(E==="28"){2h(6)}N if(E==="y"){if(!3b.7o||!1M.9M(6)){2i.1R(6)}}}},7p=y(R,1z){1z=1z||[];2O=!3b.2O||[R,1z];7l=P;7m=P;6u=9L||0;9L=0;7n=2i.J;U(;2i&&6u<7n;6u++){if(2i[6u].2g(R,1z)===17&&3b.jf){2O=P;2J}}7m=17;if(2i){if(!3b.5F){if(56&&56.J){2O=56.57();1M.7i(2O[0],2O[1])}}N if(2O===P){1M.8g()}N{2i=[]}}},1M={2h:y(){if(2i){G J=2i.J;2h(1s);if(7m){7n=2i.J}N if(2O&&2O!==P){9L=J;7p(2O[0],2O[1])}}B C},35:y(){if(2i){G 1z=1s,9N=0,ff=1z.J;U(;9N<ff;9N++){U(G i=0;i<2i.J;i++){if(1z[9N]===2i[i]){if(7m){if(i<=7n){7n--;if(i<=6u){6u--}}}2i.3P(i--,1);if(3b.7o){2J}}}}}B C},9M:y(fn){if(2i){G i=0,J=2i.J;U(;i<J;i++){if(fn===2i[i]){B P}}}B 17},8h:y(){2i=[];B C},8g:y(){2i=56=2O=14;B C},49:y(){B!2i},c3:y(){56=14;if(!2O||2O===P){1M.8g()}B C},jg:y(){B!56},7i:y(R,1z){if(56){if(7m){if(!3b.5F){56.1R([R,1z])}}N if(!(3b.5F&&2O)){7p(R,1z)}}B C},7p:y(){1M.7i(C,1s);B C},7l:y(){B!!7l}};B 1M};G 9O=[].2I;k.1O({8i:y(6v){G 8j=k.6r("5F 2O"),8k=k.6r("5F 2O"),8l=k.6r("2O"),2v="jh",9P={7q:8j,9Q:8k,c4:8l},2U={36:8j.2h,7r:8k.2h,9R:8l.2h,2v:y(){B 2v},fg:8j.7l,ji:8k.7l,9S:y(fh,fi,fj){2l.36(fh).7r(fi).9R(fj);B C},fk:y(){2l.36.2g(2l,1s).7r.2g(2l,1s);B C},jj:y(fl,fm,fo){B k.8i(y(6w){k.1n({36:[fl,"7q"],7r:[fm,"9Q"],9R:[fo,"c4"]},y(2m,L){G fn=L[0],c5=L[1],7s;if(k.1Y(fn)){2l[2m](y(){7s=fn.2g(C,1s);if(7s&&k.1Y(7s.2U)){7s.2U().9S(6w.7q,6w.9Q,6w.c4)}N{6w[c5+"9T"](C===2l?6w:C,[7s])}})}N{2l[2m](6w[c5])}})}).2U()},2U:y(1F){if(1F==T){1F=2U}N{U(G 1j in 2U){1F[1j]=2U[1j]}}B 1F}},2l=2U.2U({}),1j;U(1j in 9P){2l[1j]=9P[1j].7p;2l[1j+"9T"]=9P[1j].7i}2l.36(y(){2v="jk"},8k.8g,8l.c3).7r(y(){2v="jl"},8j.8g,8l.c3);if(6v){6v.1l(2l,2l)}B 2l},jm:y(7t){G 1z=9O.1l(1s,0),i=0,J=1z.J,c6=2H 45(J),3R=J,jn=J,2l=J<=1&&7t&&k.1Y(7t.2U)?7t:k.8i(),2U=2l.2U();y fp(i){B y(I){1z[i]=1s.J>1?9O.1l(1s,0):I;if(!(--3R)){2l.8m(2l,1z)}}}y fq(i){B y(I){c6[i]=1s.J>1?9O.1l(1s,0):I;2l.jo(2U,c6)}}if(J>1){U(;i<J;i++){if(1z[i]&&1z[i].2U&&k.1Y(1z[i].2U)){1z[i].2U().9S(fp(i),2l.9Q,fq(i))}N{--3R}}if(!3R){2l.8m(2l,1z)}}N if(2l!==7t){2l.8m(2l,J?[7t]:[])}B 2U}});k.1g=(y(){G 1g,4C,a,3w,2a,1U,2f,7u,22,8n,i,6x,V=19.2s("V"),2t=19.2t;V.4G("23","t");V.3x="   <c7/><2B></2B><a 3S=\'/a\' 12=\'1N:9U;9V:1t;2Q:.55;\'>a</a><1U E=\'58\'/>";4C=V.2A("*");a=V.2A("a")[0];if(!4C||!4C.J||!a){B{}}3w=19.2s("3w");2a=3w.3y(19.2s("3z"));1U=V.2A("1U")[0];1g={c8:(V.2o.1c===3),2Y:!V.2A("2Y").J,fr:!!V.2A("c7").J,12:/1N/.1a(a.2Z("12")),fs:(a.2Z("3S")==="/a"),2Q:/^0.55/.1a(a.12.2Q),8o:!!a.12.8o,ft:(1U.I==="3H"),fu:2a.59,8p:V.23!=="t",9W:!!19.2s("3p").9W,c9:19.2s("9X").7v(P).9Y!=="<:9X></:9X>",fv:P,fw:P,fy:17,6y:P,ca:P,cb:17,cc:17,cd:P,ce:P};k.6z=1g.6z=(19.jp==="jq");1U.3c=P;1g.fz=1U.7v(P).3c;3w.49=P;1g.fB=!2a.49;2D{3A V.1a}2E(e){1g.6y=17}if(!V.5G&&V.52&&V.fC){V.52("fD",y(){1g.ca=17});V.7v(P).fC("fD")}1U=19.2s("1U");1U.I="t";1U.4G("E","4H");1g.fE=1U.I==="t";1U.4G("3c","3c");1U.4G("H","t");V.3y(1U);2f=19.9Z();2f.3y(V.a0);1g.cf=2f.7v(P).7v(P).a0.3c;1g.fF=1U.3c;2f.3T(1U);2f.3y(V);if(V.52){U(i in{6A:1,7w:1,a1:1}){8n="3H"+i;6x=(8n in V);if(!6x){V.4G(8n,"B;");6x=(1b V[8n]==="y")}1g[i+"jr"]=6x}}2f.3T(V);2f=3w=2a=V=1U=T;k(y(){G 5a,6B,4r,2B,4a,7x,6C,a2,12,24,a3,a4,7y,1m=19.2A("1m")[0];if(!1m){B}a2=1;7y="6D:0;4s:0;6E:";a3="37:cg;1N:0;1t:0;2w:9U;3U:9U;";a4=7y+"0;fG:3d;";12="12=\'"+a3+7y+"fH js #jt;";24="<V "+12+"1V:7z;\'><V 12=\'"+7y+"0;1V:7z;4b:3d;\'></V></V>"+"<2B "+12+"\' fI=\'0\' fJ=\'0\'>"+"<5O><4a></4a></5O></2B>";5a=19.2s("V");5a.12.a5=a4+"2w:0;3U:0;37:a6;1N:0;4s-1N:"+a2+"4I";1m.5b(5a,1m.2o);V=19.2s("V");5a.3y(V);V.3x="<2B><5O><4a 12=\'"+7y+"0;1V:4J\'></4a><4a>t</4a></5O></2B>";7u=V.2A("4a");6x=(7u[0].a7===0);7u[0].12.1V="";7u[1].12.1V="4J";1g.fK=6x&&(7u[0].a7===0);if(1Q.4t){V.3x="";6C=19.2s("V");6C.12.2w="0";6C.12.7A="0";V.12.2w="ju";V.3y(6C);1g.cd=(fL((1Q.4t(6C,T)||{7A:0}).7A,10)||0)===0}if(1b V.12.6F!=="14"){V.3x="";V.12.2w=V.12.6D="9U";V.12.6E=0;V.12.4b="3d";V.12.1V="8q";V.12.6F=1;1g.cb=(V.7B===3);V.12.1V="7z";V.12.4b="ch";V.3x="<V 12=\'2w:fH;\'></V>";1g.cc=(V.7B!==3)}V.12.a5=a3+a4;V.3x=24;6B=V.2o;4r=6B.2o;4a=6B.4c.2o.2o;7x={fM:(4r.4K!==5),fN:(4a.4K===5)};4r.12.37="a8";4r.12.1N="jv";7x.ci=(4r.4K===20||4r.4K===15);4r.12.37=4r.12.1N="";6B.12.4b="3d";6B.12.37="4L";7x.fO=(4r.4K===-5);7x.fP=(1m.4K!==a2);if(1Q.4t){V.12.7C="1%";1g.ce=(1Q.4t(V,T)||{7C:0}).7C!=="1%"}if(1b 5a.12.6F!=="14"){5a.12.6F=1}1m.3T(5a);6C=V=5a=T;k.1O(1g,7x)});B 1g})();G fQ=/^(?:\\{.*\\}|\\[.*\\])$/,fR=/([A-Z])/g;k.1O({1W:{},fS:0,30:"k"+(k.fn.7h+53.fT()).1r(/\\D/g,""),cj:{"ck":P,"1S":"jw:jx-jy-jz-jA-jB","jC":P},cm:y(6){6=6.1c?k.1W[6[k.30]]:6[k.30];B!!6&&!a9(6)},L:y(6,H,L,5P){if(!k.8r(6)){B}G cn,3e,K,4d=k.30,co=1b H==="1C",5c=6.1c,1W=5c?k.1W:6,id=5c?6[4d]:6[4d]&&4d,cp=H==="22";if((!id||!1W[id]||(!cp&&!5P&&!1W[id].L))&&co&&L===14){B}if(!id){if(5c){6[4d]=id=++k.fS}N{id=4d}}if(!1W[id]){1W[id]={};if(!5c){1W[id].fU=k.bS}}if(1b H==="1S"||1b H==="y"){if(5P){1W[id]=k.1O(1W[id],H)}N{1W[id].L=k.1O(1W[id].L,H)}}cn=3e=1W[id];if(!5P){if(!3e.L){3e.L={}}3e=3e.L}if(L!==14){3e[k.5I(H)]=L}if(cp&&!3e[H]){B cn.22}if(co){K=3e[H];if(K==T){K=3e[k.5I(H)]}}N{K=3e}B K},4M:y(6,H,5P){if(!k.8r(6)){B}G 3e,i,l,4d=k.30,5c=6.1c,1W=5c?k.1W:6,id=5c?6[4d]:4d;if(!1W[id]){B}if(H){3e=5P?1W[id]:1W[id].L;if(3e){if(!k.3k(H)){if(H in 3e){H=[H]}N{H=k.5I(H);if(H in 3e){H=[H]}N{H=H.2K(" ")}}}U(i=0,l=H.J;i<l;i++){3A 3e[H[i]]}if(!(5P?a9:k.8c)(3e)){B}}}if(!5P){3A 1W[id].L;if(!a9(1W[id])){B}}if(k.1g.6y||!1W.fV){3A 1W[id]}N{1W[id]=T}if(5c){if(k.1g.6y){3A 6[4d]}N if(6.4N){6.4N(4d)}N{6[4d]=T}}},1X:y(6,H,L){B k.L(6,H,L,P)},8r:y(6){if(6.1d){G M=k.cj[6.1d.1D()];if(M){B!(M===P||6.2Z("jD")!==M)}}B P}});k.fn.1O({L:y(1j,I){G 1o,25,3i,H,l,6=C[0],i=0,L=T;if(1j===14){if(C.J){L=k.L(6);if(6.1c===1&&!k.1X(6,"fW")){3i=6.cq;U(l=3i.J;i<l;i++){H=3i[i].H;if(H.2V("L-")===0){H=k.5I(H.jE(5));cr(6,H,L[H])}}k.1X(6,"fW",P)}}B L}if(1b 1j==="1S"){B C.1n(y(){k.L(C,1j)})}1o=1j.2K(".",2);1o[1]=1o[1]?"."+1o[1]:"";25=1o[1]+"!";B k.4F(C,y(I){if(I===14){L=C.aa("fX"+25,[1o[0]]);if(L===14&&6){L=k.L(6,1j);L=cr(6,1j,L)}B L===14&&1o[1]?C.L(1o[0]):L}1o[1]=I;C.1n(y(){G 1M=k(C);1M.aa("fY"+25,1o);k.L(C,1j,I);1M.aa("fZ"+25,1o)})},T,I,1s.J>1,T,17)},4M:y(1j){B C.1n(y(){k.4M(C,1j)})}});y cr(6,1j,L){if(L===14&&6.1c===1){G H="L-"+1j.1r(fR,"-$1").1D();L=6.2Z(H);if(1b L==="1C"){2D{L=L==="P"?P:L==="17"?17:L==="T"?T:k.9F(L)?+L:fQ.1a(L)?k.bR(L):L}2E(e){}k.L(6,1j,L)}N{L=14}}B L}y a9(1F){U(G H in 1F){if(H==="L"&&k.8c(1F[H])){6p}if(H!=="fU"){B 17}}B P}y cs(6,E,1A){G 7D=E+"5d",8s=E+"2b",8t=E+"6G",5d=k.1X(6,7D);if(5d&&(1A==="2b"||!k.1X(6,8s))&&(1A==="6G"||!k.1X(6,8t))){6q(y(){if(!k.1X(6,8s)&&!k.1X(6,8t)){k.4M(6,7D,P);5d.7p()}},0)}}k.1O({g0:y(6,E){if(6){E=(E||"fx")+"6G";k.1X(6,E,(k.1X(6,E)||0)+1)}},cu:y(8u,6,E){if(8u!==P){E=6;6=8u;8u=17}if(6){E=E||"fx";G 1j=E+"6G",3R=8u?0:((k.1X(6,1j)||1)-1);if(3R){k.1X(6,1j,3R)}N{k.4M(6,1j,P);cs(6,E,"6G")}}},2b:y(6,E,L){G q;if(6){E=(E||"fx")+"2b";q=k.1X(6,E);if(L){if(!q||k.3k(L)){q=k.1X(6,E,k.2W(L))}N{q.1R(L)}}B q||[]}},6H:y(6,E){E=E||"fx";G 2b=k.2b(6,E),fn=2b.57(),1B={};if(fn==="cv"){fn=2b.57()}if(fn){if(E==="fx"){2b.5e("cv")}k.1X(6,E+".ab",1B);fn.1l(6,y(){k.6H(6,E)},1B)}if(!2b.J){k.4M(6,E+"2b "+E+".ab",P);cs(6,E,"2b")}}});k.fn.1O({2b:y(E,L){G cw=2;if(1b E!=="1C"){L=E;E="fx";cw--}if(1s.J<cw){B k.2b(C[0],E)}B L===14?C:C.1n(y(){G 2b=k.2b(C,E,L);if(E==="fx"&&2b[0]!=="cv"){k.6H(C,E)}})},6H:y(E){B C.1n(y(){k.6H(C,E)})},jF:y(5Q,E){5Q=k.fx?k.fx.8v[5Q]||5Q:5Q;E=E||"fx";B C.2b(E,y(6I,1B){G 8w=6q(6I,5Q);1B.6J=y(){g1(8w)}})},8x:y(E){B C.2b(E||"fx",[])},2U:y(E,1S){if(1b E!=="1C"){1S=E;E=14}E=E||"fx";G 5d=k.8i(),3B=C,i=3B.J,3R=1,7D=E+"5d",8s=E+"2b",8t=E+"6G",2G;y 7q(){if(!(--3R)){5d.8m(3B,[3B])}}2q(i--){if((2G=k.L(3B[i],7D,14,P)||(k.L(3B[i],8s,14,P)||k.L(3B[i],8t,14,P))&&k.L(3B[i],7D,k.6r("5F 2O"),P))){3R++;2G.2h(7q)}}7q();B 5d.2U(1S)}});G cx=/[\\n\\t\\r]/g,8y=/\\s+/,g2=/\\r/g,g3=/^(?:31|1U)$/i,g4=/^(?:31|1U|1S|3w|8z)$/i,g5=/^a(?:jG)?$/i,cy=/^(?:jH|jI|4E|3c|jJ|5d|49|3d|jK|cz|cA|g6|jL|jM|59)$/i,8p=k.1g.8p,4O,cB,cC;k.fn.1O({3i:y(H,I){B k.4F(C,k.3i,H,I,1s.J>1)},8A:y(H){B C.1n(y(){k.8A(C,H)})},1k:y(H,I){B k.4F(C,k.1k,H,I,1s.J>1)},jN:y(H){H=k.7E[H]||H;B C.1n(y(){2D{C[H]=14;3A C[H]}2E(e){}})},cD:y(I){G 4e,i,l,6,8B,c,cl;if(k.1Y(I)){B C.1n(y(j){k(C).cD(I.1l(C,j,C.23))})}if(I&&1b I==="1C"){4e=I.2K(8y);U(i=0,l=C.J;i<l;i++){6=C[i];if(6.1c===1){if(!6.23&&4e.J===1){6.23=I}N{8B=" "+6.23+" ";U(c=0,cl=4e.J;c<cl;c++){if(!~8B.2V(" "+4e[c]+" ")){8B+=4e[c]+" "}}6.23=k.46(8B)}}}}B C},cE:y(I){G 4e,i,l,6,23,c,cl;if(k.1Y(I)){B C.1n(y(j){k(C).cE(I.1l(C,j,C.23))})}if((I&&1b I==="1C")||I===14){4e=(I||"").2K(8y);U(i=0,l=C.J;i<l;i++){6=C[i];if(6.1c===1&&6.23){if(I){23=(" "+6.23+" ").1r(cx," ");U(c=0,cl=4e.J;c<cl;c++){23=23.1r(" "+4e[c]+" "," ")}6.23=k.46(23)}N{6.23=""}}}}B C},g7:y(I,8C){G E=1b I,7F=1b 8C==="8a";if(k.1Y(I)){B C.1n(y(i){k(C).g7(I.1l(C,i,C.23,8C),8C)})}B C.1n(y(){if(E==="1C"){G 23,i=0,1M=k(C),2v=8C,4e=I.2K(8y);2q((23=4e[i++])){2v=7F?2v:!1M.g8(23);1M[2v?"cD":"cE"](23)}}N if(E==="14"||E==="8a"){if(C.23){k.1X(C,"g9",C.23)}C.23=C.23||I===17?"":k.1X(C,"g9")||""}})},g8:y(Q){G 23=" "+Q+" ",i=0,l=C.J;U(;i<l;i++){if(C[i].1c===1&&(" "+C[i].23+" ").1r(cx," ").2V(23)>-1){B P}}B 17},1f:y(I){G 1B,K,1Y,6=C[0];if(!1s.J){if(6){1B=k.5f[6.E]||k.5f[6.1d.1D()];if(1B&&"27"in 1B&&(K=1B.27(6,"I"))!==14){B K}K=6.I;B 1b K==="1C"?K.1r(g2,""):K==T?"":K}B}1Y=k.1Y(I);B C.1n(y(i){G 1M=k(C),1f;if(C.1c!==1){B}if(1Y){1f=I.1l(C,i,1M.1f())}N{1f=I}if(1f==T){1f=""}N if(1b 1f==="4q"){1f+=""}N if(k.3k(1f)){1f=k.3a(1f,y(I){B I==T?"":I+""})}1B=k.5f[C.E]||k.5f[C.1d.1D()];if(!1B||!("1h"in 1B)||1B.1h(C,1f,"I")===14){C.I=1f}})}});k.1O({5f:{3z:{27:y(6){G 1f=6.cq.I;B!1f||1f.cF?6.I:6.1Z}},3w:{27:y(6){G I,i,5J,3z,2j=6.8D,5R=[],1e=6.1e,4P=6.E==="3w-4P";if(2j<0){B T}i=4P?2j:0;5J=4P?2j+1:1e.J;U(;i<5J;i++){3z=1e[i];if(3z.59&&(k.1g.fB?!3z.49:3z.2Z("49")===T)&&(!3z.1i.49||!k.1d(3z.1i,"ga"))){I=k(3z).1f();if(4P){B I}5R.1R(I)}}if(4P&&!5R.J&&1e.J){B k(1e[2j]).1f()}B 5R},1h:y(6,I){G 5R=k.2W(I);k(6).2N("3z").1n(y(){C.59=k.6s(k(C).1f(),5R)>=0});if(!5R.J){6.8D=-1}B 5R}}},ac:{1f:P,21:P,24:P,1Z:P,L:P,2w:P,3U:P,3I:P},3i:y(6,H,I,54){G K,1B,5S,4Q=6.1c;if(!6||4Q===3||4Q===8||4Q===2){B}if(54&&H in k.ac){B k(6)[H](I)}if(1b 6.2Z==="14"){B k.1k(6,H,I)}5S=4Q!==1||!k.8E(6);if(5S){H=H.1D();1B=k.4R[H]||(cy.1a(H)?cB:4O)}if(I!==14){if(I===T){k.8A(6,H);B}N if(1B&&"1h"in 1B&&5S&&(K=1B.1h(6,I,H))!==14){B K}N{6.4G(H,""+I);B I}}N if(1B&&"27"in 1B&&5S&&(K=1B.27(6,H))!==T){B K}N{K=6.2Z(H);B K===T?14:K}},8A:y(6,I){G 5g,ad,H,l,7F,i=0;if(I&&6.1c===1){ad=I.1D().2K(8y);l=ad.J;U(;i<l;i++){H=ad[i];if(H){5g=k.7E[H]||H;7F=cy.1a(H);if(!7F){k.3i(6,H,"")}6.4N(8p?H:5g);if(7F&&5g in 6){6[5g]=17}}}}},4R:{E:{1h:y(6,I){if(g3.1a(6.1d)&&6.1i){k.2P("E ae jO\'t be jP")}N if(!k.1g.fE&&I==="4H"&&k.1d(6,"1U")){G 1f=6.I;6.4G("E",I);if(1f){6.I=1f}B I}}},I:{27:y(6,H){if(4O&&k.1d(6,"31")){B 4O.27(6,H)}B H in 6?6.I:T},1h:y(6,I,H){if(4O&&k.1d(6,"31")){B 4O.1h(6,I,H)}6.I=I}}},7E:{af:"cG",g6:"jQ","U":"gb","6K":"23",jR:"jS",fJ:"jT",fI:"jU",jV:"jW",jX:"jY",jZ:"k0",k1:"gc",gd:"k2"},1k:y(6,H,I){G K,1B,5S,4Q=6.1c;if(!6||4Q===3||4Q===8||4Q===2){B}5S=4Q!==1||!k.8E(6);if(5S){H=k.7E[H]||H;1B=k.8F[H]}if(I!==14){if(1B&&"1h"in 1B&&(K=1B.1h(6,I,H))!==14){B K}N{B(6[H]=I)}}N{if(1B&&"27"in 1B&&(K=1B.27(6,H))!==T){B K}N{B 6[H]}}},8F:{cG:{27:y(6){G ag=6.5T("af");B ag&&ag.cF?fL(ag.I,10):g4.1a(6.1d)||g5.1a(6.1d)&&6.3S?0:14}}}});k.4R.af=k.8F.cG;cB={27:y(6,H){G cH,ae=k.1k(6,H);B ae===P||1b ae!=="8a"&&(cH=6.5T(H))&&cH.6L!==17?H.1D():14},1h:y(6,I,H){G 5g;if(I===17){k.8A(6,H)}N{5g=k.7E[H]||H;if(5g in 6){6[5g]=P}6.4G(H,H.1D())}B H}};if(!8p){cC={H:P,id:P,k3:P};4O=k.5f.31={27:y(6,H){G K;K=6.5T(H);B K&&(cC[H]?K.6L!=="":K.cF)?K.6L:14},1h:y(6,I,H){G K=6.5T(H);if(!K){K=19.k4(H);6.k5(K)}B(K.6L=I+"")}};k.4R.af.1h=4O.1h;k.1n(["2w","3U"],y(i,H){k.4R[H]=k.1O(k.4R[H],{1h:y(6,I){if(I===""){6.4G(H,"ah");B I}}})});k.4R.gd={27:4O.27,1h:y(6,I,H){if(I===""){I="17"}4O.1h(6,I,H)}}}if(!k.1g.fs){k.1n(["3S","1A","2w","3U"],y(i,H){k.4R[H]=k.1O(k.4R[H],{27:y(6){G K=6.2Z(H,2);B K===T?14:K}})})}if(!k.1g.12){k.4R.12={27:y(6){B 6.12.a5.1D()||14},1h:y(6,I){B(6.12.a5=""+I)}}}if(!k.1g.fu){k.8F.59=k.1O(k.8F.59,{27:y(6){G 2c=6.1i;if(2c){2c.8D;if(2c.1i){2c.1i.8D}}B T}})}if(!k.1g.9W){k.7E.9W="k6"}if(!k.1g.ft){k.1n(["4H","58"],y(){k.5f[C]={27:y(6){B 6.2Z("I")===T?"3H":6.I}}})}k.1n(["4H","58"],y(){k.5f[C]=k.1O(k.5f[C],{1h:y(6,I){if(k.3k(I)){B(6.3c=k.6s(k(6).1f(),I)>=0)}}})});G ai=/^(?:8z|1U|3w)$/i,cI=/^([^\\.]*)?(?:\\.(.+))?$/,ge=/(?:^|\\s)cJ(\\.\\S+)?\\b/,gf=/^1j/,gg=/^(?:k7|gh)|6M/,cK=/^(?:k8|k9)$/,gj=/^(\\w*)(?:#([\\w\\-]+))?(?:\\.([\\w\\-]+))?$/,gk=y(Q){G 4f=gj.2e(Q);if(4f){4f[1]=(4f[1]||"").1D();4f[3]=4f[3]&&2H 5N("(?:^|\\\\s)"+4f[3]+"(?:\\\\s|$)")}B 4f},gl=y(6,m){G cL=6.cq||{};B((!m[1]||6.1d.1D()===m[1])&&(!m[2]||(cL.id||{}).I===m[2])&&(!m[3]||m[3].1a((cL["6K"]||{}).I)))},cM=y(22){B k.O.1E.cJ?22:22.1r(ge,"aj$1 ak$1")};k.O={2h:y(6,1P,2m,L,Q){G 4u,3V,22,t,5h,E,32,1G,8G,4f,3W,1E;if(6.1c===3||6.1c===8||!1P||!2m||!(4u=k.1X(6))){B}if(2m.2m){8G=2m;2m=8G.2m;Q=8G.Q}if(!2m.2k){2m.2k=k.2k++}22=4u.22;if(!22){4u.22=22={}}3V=4u.26;if(!3V){4u.26=3V=y(e){B 1b k!=="14"&&(!e||k.O.am!==e.E)?k.O.an.2g(3V.6,1s):14};3V.6=6}1P=k.46(cM(1P)).2K(" ");U(t=0;t<1P.J;t++){5h=cI.2e(1P[t])||[];E=5h[1];32=(5h[2]||"").2K(".").6o();1E=k.O.1E[E]||{};E=(Q?1E.7G:1E.ao)||E;1E=k.O.1E[E]||{};1G=k.1O({E:E,5i:5h[1],L:L,2m:2m,2k:2m.2k,Q:Q,4f:Q&&gk(Q),4S:32.6n(".")},8G);3W=22[E];if(!3W){3W=22[E]=[];3W.5j=0;if(!1E.6N||1E.6N.1l(6,L,32,3V)===17){if(6.5G){6.5G(E,3V,17)}N if(6.52){6.52("3H"+E,3V)}}}if(1E.2h){1E.2h.1l(6,1G);if(!1G.2m.2k){1G.2m.2k=2m.2k}}if(Q){3W.3P(3W.5j++,0,1G)}N{3W.1R(1G)}k.O.6O[E]=P}6=T},6O:{},35:y(6,1P,2m,Q,gm){G 4u=k.cm(6)&&k.1X(6),t,5h,E,5i,32,cN,j,22,1E,26,5k,1G;if(!4u||!(22=4u.22)){B}1P=k.46(cM(1P||"")).2K(" ");U(t=0;t<1P.J;t++){5h=cI.2e(1P[t])||[];E=5i=5h[1];32=5h[2];if(!E){U(E in 22){k.O.35(6,E+1P[t],2m,Q,P)}6p}1E=k.O.1E[E]||{};E=(Q?1E.7G:1E.ao)||E;5k=22[E]||[];cN=5k.J;32=32?2H 5N("(^|\\\\.)"+32.2K(".").6o().6n("\\\\.(?:.*\\\\.)?")+"(\\\\.|$)"):T;U(j=0;j<5k.J;j++){1G=5k[j];if((gm||5i===1G.5i)&&(!2m||2m.2k===1G.2k)&&(!32||32.1a(1G.4S))&&(!Q||Q===1G.Q||Q==="**"&&1G.Q)){5k.3P(j--,1);if(1G.Q){5k.5j--}if(1E.35){1E.35.1l(6,1G)}}}if(5k.J===0&&cN!==5k.J){if(!1E.7H||1E.7H.1l(6,32)===17){k.cO(6,E,4u.26)}3A 22[E]}}if(k.8c(22)){26=4u.26;if(26){26.6=T}k.4M(6,["22","26"],P)}},gn:{"fX":P,"fY":P,"fZ":P},3n:y(O,L,6,cP){if(6&&(6.1c===3||6.1c===8)){B}G E=O.E||O,32=[],1W,8H,i,18,2x,5U,1E,26,6P,8I;if(cK.1a(E+k.O.am)){B}if(E.2V("!")>=0){E=E.2I(0,-1);8H=P}if(E.2V(".")>=0){32=E.2K(".");E=32.57();32.6o()}if((!6||k.O.gn[E])&&!k.O.6O[E]){B}O=1b O==="1S"?O[k.30]?O:2H k.5V(E,O):2H k.5V(E);O.E=E;O.8J=P;O.8H=8H;O.4S=32.6n(".");O.cQ=O.4S?2H 5N("(^|\\\\.)"+32.6n("\\\\.(?:.*\\\\.)?")+"(\\\\.|$)"):T;5U=E.2V(":")<0?"3H"+E:"";if(!6){1W=k.1W;U(i in 1W){if(1W[i].22&&1W[i].22[E]){k.O.3n(O,L,1W[i].26.6,P)}}B}O.2C=14;if(!O.1K){O.1K=6}L=L!=T?k.2W(L):[];L.5e(O);1E=k.O.1E[E]||{};if(1E.3n&&1E.3n.2g(6,L)===17){B}6P=[[6,1E.ao||E]];if(!cP&&!1E.go&&!k.5H(6)){8I=1E.7G||E;18=cK.1a(8I+E)?6:6.1i;2x=T;U(;18;18=18.1i){6P.1R([18,8I]);2x=18}if(2x&&2x===6.34){6P.1R([2x.3J||2x.gp||1Q,8I])}}U(i=0;i<6P.J&&!O.aq();i++){18=6P[i][0];O.E=6P[i][1];26=(k.1X(18,"22")||{})[O.E]&&k.1X(18,"26");if(26){26.2g(18,L)}26=5U&&18[5U];if(26&&k.8r(18)&&26.2g(18,L)===17){O.5W()}}O.E=E;if(!cP&&!O.8K()){if((!1E.5l||1E.5l.2g(6.34,L)===17)&&!(E==="6M"&&k.1d(6,"a"))&&k.8r(6)){if(5U&&6[E]&&((E!=="8L"&&E!=="ar")||O.1K.7B!==0)&&!k.5H(6)){2x=6[5U];if(2x){6[5U]=T}k.O.am=E;6[E]();k.O.am=14;if(2x){6[5U]=2x}}}}B O.2C},an:y(O){O=k.O.4T(O||1Q.O);G 3W=((k.1X(C,"22")||{})[O.E]||[]),5j=3W.5j,1z=[].2I.1l(1s,0),gq=!O.8H&&!O.4S,1E=k.O.1E[O.E]||{},8M=[],i,j,18,8N,K,8O,5m,3q,1G,7I,8P;1z[0]=O;O.gr=C;if(1E.gs&&1E.gs.1l(C,O)===17){B}if(5j&&!(O.31&&O.E==="6M")){8N=k(C);8N.R=C.34||C;U(18=O.1K;18!=C;18=18.1i||C){if(18.49!==P){8O={};3q=[];8N[0]=18;U(i=0;i<5j;i++){1G=3W[i];7I=1G.Q;if(8O[7I]===14){8O[7I]=(1G.4f?gl(18,1G.4f):8N.is(7I))}if(8O[7I]){3q.1R(1G)}}if(3q.J){8M.1R({6:18,3q:3q})}}}}if(3W.J>5j){8M.1R({6:C,3q:3W.2I(5j)})}U(i=0;i<8M.J&&!O.aq();i++){5m=8M[i];O.gu=5m.6;U(j=0;j<5m.3q.J&&!O.cR();j++){1G=5m.3q[j];if(gq||(!O.4S&&!1G.4S)||O.cQ&&O.cQ.1a(1G.4S)){O.L=1G.L;O.1G=1G;K=((k.O.1E[1G.5i]||{}).26||1G.2m).2g(5m.6,1z);if(K!==14){O.2C=K;if(K===17){O.5W();O.8Q()}}}}}if(1E.cS){1E.cS.1l(C,O)}B O.2C},3f:"ka kb kc gv kd ke kf gw gu kg cT as kh 1K cU ki 8R".2K(" "),at:{},gx:{3f:"kj cV 1j gy".2K(" "),1u:y(O,3K){if(O.8R==T){O.8R=3K.cV!=T?3K.cV:3K.gy}B O}},gz:{3f:"31 kk cW gA 7J kl km cX gB kn ko gC".2K(" "),1u:y(O,3K){G au,1J,1m,31=3K.31,7J=3K.7J;if(O.cX==T&&3K.cW!=T){au=O.1K.34||19;1J=au.2t;1m=au.1m;O.cX=3K.cW+(1J&&1J.4v||1m&&1m.4v||0)-(1J&&1J.7K||1m&&1m.7K||0);O.gB=3K.gA+(1J&&1J.4w||1m&&1m.4w||0)-(1J&&1J.7L||1m&&1m.7L||0)}if(!O.as&&7J){O.as=7J===O.1K?3K.gC:7J}if(!O.8R&&31!==14){O.8R=(31&1?1:(31&2?3:(31&4?2:0)))}B O}},4T:y(O){if(O[k.30]){B O}G i,1k,4U=O,8S=k.O.at[O.E]||{},48=8S.3f?C.3f.6t(8S.3f):C.3f;O=k.5V(4U);U(i=48.J;i;){1k=48[--i];O[1k]=4U[1k]}if(!O.1K){O.1K=4U.gv||19}if(O.1K.1c===3){O.1K=O.1K.1i}if(O.cT===14){O.cT=O.gw}B 8S.1u?8S.1u(O,4U):O},1E:{3D:{6N:k.bL},8b:{go:P},8L:{7G:"a1"},ar:{7G:"cY"},kp:{6N:y(L,32,3V){if(k.5H(C)){C.cZ=3V}},7H:y(32,3V){if(C.cZ===3V){C.cZ=T}}}},8T:y(E,6,O,gD){G e=k.1O(2H k.5V(),O,{E:E,d0:P,4U:{}});if(gD){k.O.3n(e,T,6)}N{k.O.an.1l(6,e)}if(e.8K()){O.5W()}}};k.O.26=k.O.an;k.cO=19.8f?y(6,E,26){if(6.8f){6.8f(E,26,17)}}:y(6,E,26){if(6.c1){6.c1("3H"+E,26)}};k.5V=y(1A,3f){if(!(C 7f k.5V)){B 2H k.5V(1A,3f)}if(1A&&1A.E){C.4U=1A;C.E=1A.E;C.8K=(1A.kq||1A.gE===17||1A.gF&&1A.gF())?8U:6Q}N{C.E=1A}if(3f){k.1O(C,3f)}C.cU=1A&&1A.cU||k.3G();C[k.30]=P};y 6Q(){B 17}y 8U(){B P}k.5V.39={5W:y(){C.8K=8U;G e=C.4U;if(!e){B}if(e.5W){e.5W()}N{e.gE=17}},8Q:y(){C.aq=8U;G e=C.4U;if(!e){B}if(e.8Q){e.8Q()}e.kr=P},ks:y(){C.cR=8U;C.8Q()},8K:6Q,aq:6Q,cR:6Q};k.1n({aj:"gG",ak:"gH"},y(3L,4T){k.O.1E[3L]={7G:4T,ao:4T,26:y(O){G 1K=C,8P=O.as,1G=O.1G,Q=1G.Q,K;if(!8P||(8P!==1K&&!k.3r(1K,8P))){O.E=1G.5i;K=1G.2m.2g(C,1s);O.E=4T}B K}}});if(!k.1g.fv){k.O.1E.6A={6N:y(){if(k.1d(C,"3p")){B 17}k.O.2h(C,"6M.av gI.av",y(e){G 6=e.1K,3p=k.1d(6,"1U")||k.1d(6,"31")?6.3p:14;if(3p&&!3p.d1){k.O.2h(3p,"6A.av",y(O){O.d2=P});3p.d1=P}})},cS:y(O){if(O.d2){3A O.d2;if(C.1i&&!O.8J){k.O.8T("6A",C.1i,O,P)}}},7H:y(){if(k.1d(C,"3p")){B 17}k.O.35(C,".av")}}}if(!k.1g.fw){k.O.1E.7w={6N:y(){if(ai.1a(C.1d)){if(C.E==="58"||C.E==="4H"){k.O.2h(C,"kt.8V",y(O){if(O.4U.ku==="3c"){C.d3=P}});k.O.2h(C,"6M.8V",y(O){if(C.d3&&!O.8J){C.d3=17;k.O.8T("7w",C,O,P)}})}B 17}k.O.2h(C,"kv.8V",y(e){G 6=e.1K;if(ai.1a(6.1d)&&!6.d4){k.O.2h(6,"7w.8V",y(O){if(C.1i&&!O.d0&&!O.8J){k.O.8T("7w",C.1i,O,P)}});6.d4=P}})},26:y(O){G 6=O.1K;if(C!==6||O.d0||O.8J||(6.E!=="4H"&&6.E!=="58")){B O.1G.2m.2g(C,1s)}},7H:y(){k.O.35(C,".8V");B ai.1a(C.1d)}}}if(!k.1g.fy){k.1n({8L:"a1",ar:"cY"},y(3L,4T){G d5=0,2m=y(O){k.O.8T(4T,O.1K,k.O.4T(O),P)};k.O.1E[4T]={6N:y(){if(d5++===0){19.5G(3L,2m,P)}},7H:y(){if(--d5===0){19.8f(3L,2m,P)}}}})}k.fn.1O({3H:y(1P,Q,L,fn,4P){G 8W,E;if(1b 1P==="1S"){if(1b Q!=="1C"){L=L||Q;Q=14}U(E in 1P){C.3H(E,Q,L,1P[E],4P)}B C}if(L==T&&fn==T){fn=Q;L=Q=14}N if(fn==T){if(1b Q==="1C"){fn=L;L=14}N{fn=L;L=Q;Q=14}}if(fn===17){fn=6Q}N if(!fn){B C}if(4P===1){8W=fn;fn=y(O){k().3F(O);B 8W.2g(C,1s)};fn.2k=8W.2k||(8W.2k=k.2k++)}B C.1n(y(){k.O.2h(C,1P,fn,L,Q)})},4P:y(1P,Q,L,fn){B C.3H(1P,Q,L,fn,1)},3F:y(1P,Q,fn){if(1P&&1P.5W&&1P.1G){G 1G=1P.1G;k(1P.gr).3F(1G.4S?1G.5i+"."+1G.4S:1G.5i,1G.Q,1G.2m);B C}if(1b 1P==="1S"){U(G E in 1P){C.3F(E,Q,1P[E])}B C}if(Q===17||1b Q==="y"){fn=Q;Q=14}if(fn===17){fn=6Q}B C.1n(y(){k.O.35(C,1P,fn,Q)})},kw:y(1P,L,fn){B C.3H(1P,T,L,fn)},kx:y(1P,fn){B C.3F(1P,T,fn)},ky:y(1P,L,fn){k(C.R).3H(1P,C.Q,L,fn);B C},kz:y(1P,fn){k(C.R).3F(1P,C.Q||"**",fn);B C},kA:y(Q,1P,L,fn){B C.3H(1P,Q,L,fn)},kB:y(Q,1P,fn){B 1s.J==1?C.3F(Q,"**"):C.3F(1P,Q,fn)},3n:y(E,L){B C.1n(y(){k.O.3n(E,L,C)})},aa:y(E,L){if(C[0]){B k.O.3n(E,L,C[0],P)}},4x:y(fn){G 1z=1s,2k=fn.2k||k.2k++,i=0,d6=y(O){G 8X=(k.1X(C,"8X"+fn.2k)||0)%i;k.1X(C,"8X"+fn.2k,8X+1);O.5W();B 1z[8X].2g(C,1s)||17};d6.2k=2k;2q(i<1z.J){1z[i++].2k=2k}B C.6M(d6)},cJ:y(d7,gJ){B C.aj(d7).ak(gJ||d7)}});k.1n(("ar 8L a1 cY 8b kC gK gL 6M kD "+"kE kF kG gG gH aj ak "+"7w 3w 6A kH gI kI 2P gh").2K(" "),y(i,H){k.fn[H]=y(L,fn){if(fn==T){fn=L;L=T}B 1s.J>0?C.3H(H,T,L,fn):C.3n(H)};if(k.ac){k.ac[H]=P}if(gf.1a(H)){k.O.at[H]=k.O.gx}if(gg.1a(H)){k.O.at[H]=k.O.gz}});(y(){G aw=/((?:\\((?:\\([^()]+\\)|[^()]+)+\\)|\\[(?:\\[[^\\[\\]]*\\]|[\'"][^\'"]*[\'"]|[^\\[\\]\'"]+)+\\]|\\\\.|[^ >+~,(\\[\\\\]+)+|[>+~])(\\s*,\\s*)?((?:.|\\r|\\n)*)/g,30="kJ"+(53.fT()+\'\').1r(\'.\',\'\'),36=0,5D=9x.39.5D,8Y=17,d8=P,6R=/\\\\/g,gM=/\\r\\n/g,8Z=/\\W/;[0,0].6o(y(){d8=17;B 0});G 1q=y(Q,R,1L,4g){1L=1L||[];R=R||19;G gN=R;if(R.1c!==1&&R.1c!==9){B[]}if(!Q||1b Q!=="1C"){B 1L}G m,1h,1I,2p,K,18,4y,i,d9=P,90=1q.2y(R),1o=[],da=Q;do{aw.2e("");m=aw.2e(da);if(m){da=m[3];1o.1R(m[1]);if(m[2]){2p=m[3];2J}}}2q(m);if(1o.J>1&&db.2e(Q)){if(1o.J===2&&1H.4L[1o[0]]){1h=dc(1o[0]+1o[1],R,4g)}N{1h=1H.4L[1o[0]]?[R]:1q(1o.57(),R);2q(1o.J){Q=1o.57();if(1H.4L[Q]){Q+=1o.57()}1h=dc(Q,1h,4g)}}}N{if(!4g&&1o.J>1&&R.1c===9&&!90&&1H.M.5n.1a(1o[0])&&!1H.M.5n.1a(1o[1o.J-1])){K=1q.2N(1o.57(),R,90);R=K.1y?1q.1u(K.1y,K.1h)[0]:K.1h[0]}if(R){K=4g?{1y:1o.4y(),1h:2W(4g)}:1q.2N(1o.4y(),1o.J===1&&(1o[0]==="~"||1o[0]==="+")&&R.1i?R.1i:R,90);1h=K.1y?1q.1u(K.1y,K.1h):K.1h;if(1o.J>0){1I=2W(1h)}N{d9=17}2q(1o.J){18=1o.4y();4y=18;if(!1H.4L[18]){18=""}N{4y=1o.4y()}if(4y==T){4y=R}1H.4L[18](1I,4y,90)}}N{1I=1o=[]}}if(!1I){1I=1h}if(!1I){1q.2P(18||Q)}if(5D.1l(1I)==="[1S 45]"){if(!d9){1L.1R.2g(1L,1I)}N if(R&&R.1c===1){U(i=0;1I[i]!=T;i++){if(1I[i]&&(1I[i]===P||1I[i].1c===1&&1q.3r(R,1I[i]))){1L.1R(1h[i])}}}N{U(i=0;1I[i]!=T;i++){if(1I[i]&&1I[i].1c===1){1L.1R(1h[i])}}}}N{2W(1I,1L)}if(2p){1q(2p,gN,1L,4g);1q.dd(1L)}B 1L};1q.dd=y(1L){if(91){8Y=d8;1L.6o(91);if(8Y){U(G i=1;i<1L.J;i++){if(1L[i]===1L[i-1]){1L.3P(i--,1)}}}}B 1L};1q.3q=y(1y,1h){B 1q(1y,T,T,1h)};1q.92=y(2d,1y){B 1q(1y,T,T,[2d]).J>0};1q.2N=y(1y,R,2y){G 1h,i,3Q,M,E,1t;if(!1y){B[]}U(i=0,3Q=1H.ax.J;i<3Q;i++){E=1H.ax[i];if((M=1H.ay[E].2e(1y))){1t=M[1];M.3P(1,1);if(1t.93(1t.J-1)!=="\\\\"){M[1]=(M[1]||"").1r(6R,"");1h=1H.2N[E](M,R,2y);if(1h!=T){1y=1y.1r(1H.M[E],"");2J}}}}if(!1h){1h=1b R.2A!=="14"?R.2A("*"):[]}B{1h:1h,1y:1y}};1q.1u=y(1y,1h,4z,38){G M,6S,E,7M,94,1u,1t,i,54,2x=1y,2C=[],3s=1h,gO=1h&&1h[0]&&1q.2y(1h[0]);2q(1y&&1h.J){U(E in 1H.1u){if((M=1H.ay[E].2e(1y))!=T&&M[2]){1u=1H.1u[E];1t=M[1];6S=17;M.3P(1,1);if(1t.93(1t.J-1)==="\\\\"){6p}if(3s===2C){2C=[]}if(1H.df[E]){M=1H.df[E](M,3s,4z,2C,38,gO);if(!M){6S=7M=P}N if(M===P){6p}}if(M){U(i=0;(94=3s[i])!=T;i++){if(94){7M=1u(94,M,i,3s);54=38^7M;if(4z&&7M!=T){if(54){6S=P}N{3s[i]=17}}N if(54){2C.1R(94);6S=P}}}}if(7M!==14){if(!4z){3s=2C}1y=1y.1r(1H.M[E],"");if(!6S){B[]}2J}}}if(1y===2x){if(6S==T){1q.2P(1y)}N{2J}}2x=1y}B 3s};1q.2P=y(9G){bP 2H bQ("kK 2P, kL kM: "+9G);};G 7N=1q.7N=y(6){G i,2d,1c=6.1c,K="";if(1c){if(1c===1||1c===9||1c===11){if(1b 6.az===\'1C\'){B 6.az}N if(1b 6.dg===\'1C\'){B 6.dg.1r(gM,\'\')}N{U(6=6.2o;6;6=6.4c){K+=7N(6)}}}N if(1c===3||1c===4){B 6.6L}}N{U(i=0;(2d=6[i]);i++){if(2d.1c!==8){K+=7N(2d)}}}B K};G 1H=1q.3X={ax:["5n","dh","7O"],M:{5n:/#((?:[\\w\\6T-\\6U\\-]|\\\\.)+)/,7P:/\\.((?:[\\w\\6T-\\6U\\-]|\\\\.)+)/,dh:/\\[H=[\'"]*((?:[\\w\\6T-\\6U\\-]|\\\\.)+)[\'"]*\\]/,di:/\\[\\s*((?:[\\w\\6T-\\6U\\-]|\\\\.)+)\\s*(?:(\\S?=)\\s*(?:([\'"])(.*?)\\3|(#?(?:[\\w\\6T-\\6U\\-]|\\\\.)*)|)|)\\s*\\]/,7O:/^((?:[\\w\\6T-\\6U\\*\\-]|\\\\.)+)/,aA:/:(gP|5X|51|29)-kN(?:\\(\\s*(aB|aC|(?:[+\\-]?\\d+|(?:[+\\-]?\\d*)?n\\s*(?:[+\\-]\\s*\\d+)?))\\s*\\))?/,5Y:/:(5X|eq|gt|lt|29|51|aB|aC)(?:\\((\\d*)\\))?(?=[^\\-]|$)/,7Q:/:((?:[\\w\\6T-\\6U\\-]|\\\\.)+)(?:\\(([\'"]?)((?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\2\\))?/},ay:{},aD:{"6K":"23","U":"gb"},aE:{3S:y(6){B 6.2Z("3S")},E:y(6){B 6.2Z("E")}},4L:{"+":y(1I,25){G 6V=1b 25==="1C",dj=6V&&!8Z.1a(25),dk=6V&&!dj;if(dj){25=25.1D()}U(G i=0,l=1I.J,6;i<l;i++){if((6=1I[i])){2q((6=6.7R)&&6.1c!==1){}1I[i]=dk||6&&6.1d.1D()===25?6||17:6===25}}if(dk){1q.1u(25,1I,P)}},">":y(1I,25){G 6,6V=1b 25==="1C",i=0,l=1I.J;if(6V&&!8Z.1a(25)){25=25.1D();U(;i<l;i++){6=1I[i];if(6){G 2c=6.1i;1I[i]=2c.1d.1D()===25?2c:17}}}N{U(;i<l;i++){6=1I[i];if(6){1I[i]=6V?6.1i:6.1i===25}}if(6V){1q.1u(25,1I,P)}}},"":y(1I,25,2y){G 5Z,3M=36++,7S=dl;if(1b 25==="1C"&&!8Z.1a(25)){25=25.1D();5Z=25;7S=dm}7S("1i",25,3M,1I,5Z,2y)},"~":y(1I,25,2y){G 5Z,3M=36++,7S=dl;if(1b 25==="1C"&&!8Z.1a(25)){25=25.1D();5Z=25;7S=dm}7S("7R",25,3M,1I,5Z,2y)}},2N:{5n:y(M,R,2y){if(1b R.6m!=="14"&&!2y){G m=R.6m(M[1]);B m&&m.1i?[m]:[]}},dh:y(M,R){if(1b R.gQ!=="14"){G K=[],1L=R.gQ(M[1]);U(G i=0,l=1L.J;i<l;i++){if(1L[i].2Z("H")===M[1]){K.1R(1L[i])}}B K.J===0?T:K}},7O:y(M,R){if(1b R.2A!=="14"){B R.2A(M[1])}}},df:{7P:y(M,3s,4z,2C,38,2y){M=" "+M[1].1r(6R,"")+" ";if(2y){B M}U(G i=0,6;(6=3s[i])!=T;i++){if(6){if(38^(6.23&&(" "+6.23+" ").1r(/[\\t\\n\\r]/g," ").2V(M)>=0)){if(!4z){2C.1R(6)}}N if(4z){3s[i]=17}}}B 17},5n:y(M){B M[1].1r(6R,"")},7O:y(M,3s){B M[1].1r(6R,"").1D()},aA:y(M){if(M[1]==="5X"){if(!M[2]){1q.2P(M[0])}M[2]=M[2].1r(/^\\+|\\s*/g,\'\');G 1a=/(-?)(\\d*)(?:n([+\\-]?\\d*))?/.2e(M[2]==="aB"&&"2n"||M[2]==="aC"&&"2n+1"||!/\\D/.1a(M[2])&&"kO+"+M[2]||M[2]);M[2]=(1a[1]+(1a[2]||1))-0;M[3]=1a[3]-0}N if(M[2]){1q.2P(M[0])}M[0]=36++;B M},di:y(M,3s,4z,2C,38,2y){G H=M[1]=M[1].1r(6R,"");if(!2y&&1H.aD[H]){M[1]=1H.aD[H]}M[4]=(M[4]||M[5]||"").1r(6R,"");if(M[2]==="~="){M[4]=" "+M[4]+" "}B M},7Q:y(M,3s,4z,2C,38){if(M[1]==="38"){if((aw.2e(M[3])||"").J>1||/^\\w/.1a(M[3])){M[3]=1q(M[3],T,T,3s)}N{G K=1q.1u(M[3],3s,4z,P^38);if(!4z){2C.1R.2g(2C,K)}B 17}}N if(1H.M.5Y.1a(M[0])||1H.M.aA.1a(M[0])){B P}B M},5Y:y(M){M.5e(P);B M}},5o:{kP:y(6){B 6.49===17&&6.E!=="3d"},49:y(6){B 6.49===P},3c:y(6){B 6.3c===P},59:y(6){if(6.1i){6.1i.8D}B 6.59===P},2c:y(6){B!!6.2o},8h:y(6){B!6.2o},9M:y(6,i,M){B!!1q(M[3],6).J},gR:y(6){B(/h\\d/i).1a(6.1d)},1Z:y(6){G 3i=6.2Z("E"),E=6.E;B 6.1d.1D()==="1U"&&"1Z"===E&&(3i===E||3i===T)},4H:y(6){B 6.1d.1D()==="1U"&&"4H"===6.E},58:y(6){B 6.1d.1D()==="1U"&&"58"===6.E},dn:y(6){B 6.1d.1D()==="1U"&&"dn"===6.E},aF:y(6){B 6.1d.1D()==="1U"&&"aF"===6.E},6A:y(6){G H=6.1d.1D();B(H==="1U"||H==="31")&&"6A"===6.E},gS:y(6){B 6.1d.1D()==="1U"&&"gS"===6.E},gT:y(6){G H=6.1d.1D();B(H==="1U"||H==="31")&&"gT"===6.E},31:y(6){G H=6.1d.1D();B H==="1U"&&"31"===6.E||H==="31"},1U:y(6){B(/1U|3w|8z|31/i).1a(6.1d)},8L:y(6){B 6===6.34.kQ}},gU:{29:y(6,i){B i===0},51:y(6,i,M,28){B i===28.J-1},aB:y(6,i){B i%2===0},aC:y(6,i){B i%2===1},lt:y(6,i,M){B i<M[3]-0},gt:y(6,i,M){B i>M[3]-0},5X:y(6,i,M){B M[3]-0===i},eq:y(6,i,M){B M[3]-0===i}},1u:{7Q:y(6,M,i,28){G H=M[1],1u=1H.5o[H];if(1u){B 1u(6,i,M,28)}N if(H==="3r"){B(6.az||6.dg||7N([6])||"").2V(M[3])>=0}N if(H==="38"){G 38=M[3];U(G j=0,l=38.J;j<l;j++){if(38[j]===6){B 17}}B P}N{1q.2P(H)}},aA:y(6,M){G 29,51,3M,2c,1W,3R,95,E=M[1],2d=6;kR(E){aG"gP":aG"29":2q((2d=2d.7R)){if(2d.1c===1){B 17}}if(E==="29"){B P}2d=6;aG"51":2q((2d=2d.4c)){if(2d.1c===1){B 17}}B P;aG"5X":29=M[2];51=M[3];if(29===1&&51===0){B P}3M=M[0];2c=6.1i;if(2c&&(2c[30]!==3M||!6.dp)){3R=0;U(2d=2c.2o;2d;2d=2d.4c){if(2d.1c===1){2d.dp=++3R}}2c[30]=3M}95=6.dp-51;if(29===0){B 95===0}N{B(95%29===0&&95/29>=0)}}},5n:y(6,M){B 6.1c===1&&6.2Z("id")===M},7O:y(6,M){B(M==="*"&&6.1c===1)||!!6.1d&&6.1d.1D()===M},7P:y(6,M){B(" "+(6.23||6.2Z("6K"))+" ").2V(M)>-1},di:y(6,M){G H=M[1],2C=1q.3i?1q.3i(6,H):1H.aE[H]?1H.aE[H](6):6[H]!=T?6[H]:6.2Z(H),I=2C+"",E=M[2],4h=M[4];B 2C==T?E==="!=":!E&&1q.3i?2C!=T:E==="="?I===4h:E==="*="?I.2V(4h)>=0:E==="~="?(" "+I+" ").2V(4h)>=0:!4h?I&&2C!==17:E==="!="?I!==4h:E==="^="?I.2V(4h)===0:E==="$="?I.93(I.J-4h.J)===4h:E==="|="?I===4h||I.93(0,4h.J+1)===4h+"-":17},5Y:y(6,M,i,28){G H=M[2],1u=1H.gU[H];if(1u){B 1u(6,i,M,28)}}}};G db=1H.M.5Y,gV=y(4C,4o){B"\\\\"+(4o-0+1)};U(G E in 1H.M){1H.M[E]=2H 5N(1H.M[E].aH+(/(?![^\\[]*\\])(?![^\\(]*\\))/.aH));1H.ay[E]=2H 5N(/(^(?:.|\\r|\\n)*?)/.aH+1H.M[E].aH.1r(/\\\\(\\d+)/g,gV))}1H.M.gW=db;G 2W=y(28,1L){28=45.39.2I.1l(28,0);if(1L){1L.1R.2g(1L,28);B 1L}B 28};2D{45.39.2I.1l(19.2t.47,0)[0].1c}2E(e){2W=y(28,1L){G i=0,K=1L||[];if(5D.1l(28)==="[1S 45]"){45.39.1R.2g(K,28)}N{if(1b 28.J==="4q"){U(G l=28.J;i<l;i++){K.1R(28[i])}}N{U(;28[i];i++){K.1R(28[i])}}}B K}}G 91,7T;if(19.2t.6W){91=y(a,b){if(a===b){8Y=P;B 0}if(!a.6W||!b.6W){B a.6W?-1:1}B a.6W(b)&4?-1:1}}N{91=y(a,b){if(a===b){8Y=P;B 0}N if(a.aI&&b.aI){B a.aI-b.aI}G al,bl,ap=[],bp=[],aJ=a.1i,aK=b.1i,18=aJ;if(aJ===aK){B 7T(a,b)}N if(!aJ){B-1}N if(!aK){B 1}2q(18){ap.5e(18);18=18.1i}18=aK;2q(18){bp.5e(18);18=18.1i}al=ap.J;bl=bp.J;U(G i=0;i<al&&i<bl;i++){if(ap[i]!==bp[i]){B 7T(ap[i],bp[i])}}B i===al?7T(a,bp[i],-1):7T(ap[i],b,1)};7T=y(a,b,K){if(a===b){B K}G 18=a.4c;2q(18){if(18===b){B-1}18=18.4c}B 1}}(y(){G 3p=19.2s("V"),id="1v"+(2H bY()).fb(),4V=19.2t;3p.3x="<a H=\'"+id+"\'/>";4V.5b(3p,4V.2o);if(19.6m(id)){1H.2N.5n=y(M,R,2y){if(1b R.6m!=="14"&&!2y){G m=R.6m(M[1]);B m?m.id===M[1]||1b m.5T!=="14"&&m.5T("id").6L===M[1]?[m]:14:[]}};1H.1u.5n=y(6,M){G 2d=1b 6.5T!=="14"&&6.5T("id");B 6.1c===1&&2d&&2d.6L===M}}4V.3T(3p);4V=3p=T})();(y(){G V=19.2s("V");V.3y(19.kS(""));if(V.2A("*").J>0){1H.2N.7O=y(M,R){G 1L=R.2A(M[1]);if(M[1]==="*"){G 2G=[];U(G i=0;1L[i];i++){if(1L[i].1c===1){2G.1R(1L[i])}}1L=2G}B 1L}}V.3x="<a 3S=\'#\'></a>";if(V.2o&&1b V.2o.2Z!=="14"&&V.2o.2Z("3S")!=="#"){1H.aE.3S=y(6){B 6.2Z("3S",2)}}V=T})();if(19.6X){(y(){G aL=1q,V=19.2s("V"),id="kT";V.3x="<p 6K=\'gX\'></p>";if(V.6X&&V.6X(".gX").J===0){B}1q=y(60,R,2p,4g){R=R||19;if(!4g&&!1q.2y(R)){G M=/^(\\w+$)|^\\.([\\w\\-]+$)|^#([\\w\\-]+$)/.2e(60);if(M&&(R.1c===1||R.1c===9)){if(M[1]){B 2W(R.2A(60),2p)}N if(M[2]&&1H.2N.7P&&R.6Y){B 2W(R.6Y(M[2]),2p)}}if(R.1c===9){if(60==="1m"&&R.1m){B 2W([R.1m],2p)}N if(M&&M[3]){G 6=R.6m(M[3]);if(6&&6.1i){if(6.id===M[3]){B 2W([6],2p)}}N{B 2W([],2p)}}2D{B 2W(R.6X(60),2p)}2E(kU){}}N if(R.1c===1&&R.1d.1D()!=="1S"){G gY=R,2x=R.2Z("id"),96=2x||id,dq=R.1i,dr=/^\\s*[+~]/.1a(60);if(!2x){R.4G("id",96)}N{96=96.1r(/\'/g,"\\\\$&")}if(dr&&dq){R=R.1i}2D{if(!dr||dq){B 2W(R.6X("[id=\'"+96+"\'] "+60),2p)}}2E(gZ){}kV{if(!2x){gY.4N("id")}}}}B aL(60,R,2p,4g)};U(G 1k in aL){1q[1k]=aL[1k]}V=T})()}(y(){G 24=19.2t,3q=24.92||24.kW||24.kX||24.kY;if(3q){G h0=!3q.1l(19.2s("V"),"V"),ds=17;2D{3q.1l(19.2t,"[1a!=\'\']:kZ")}2E(gZ){ds=P}1q.92=y(2d,1y){1y=1y.1r(/\\=\\s*([^\'"\\]]*)\\s*\\]/g,"=\'$1\']");if(!1q.2y(2d)){2D{if(ds||!1H.M.7Q.1a(1y)&&!/!=/.1a(1y)){G K=3q.1l(2d,1y);if(K||!h0||2d.19&&2d.19.1c!==11){B K}}}2E(e){}}B 1q(1y,T,T,[2d]).J>0}}})();(y(){G V=19.2s("V");V.3x="<V 6K=\'1a e\'></V><V 6K=\'1a\'></V>";if(!V.6Y||V.6Y("e").J===0){B}V.a0.23="e";if(V.6Y("e").J===1){B}1H.ax.3P(1,0,"7P");1H.2N.7P=y(M,R,2y){if(1b R.6Y!=="14"&&!2y){B R.6Y(M[1])}};V=T})();y dm(3g,18,3M,1I,5Z,2y){U(G i=0,l=1I.J;i<l;i++){G 6=1I[i];if(6){G M=17;6=6[3g];2q(6){if(6[30]===3M){M=1I[6.aM];2J}if(6.1c===1&&!2y){6[30]=3M;6.aM=i}if(6.1d.1D()===18){M=6;2J}6=6[3g]}1I[i]=M}}}y dl(3g,18,3M,1I,5Z,2y){U(G i=0,l=1I.J;i<l;i++){G 6=1I[i];if(6){G M=17;6=6[3g];2q(6){if(6[30]===3M){M=1I[6.aM];2J}if(6.1c===1){if(!2y){6[30]=3M;6.aM=i}if(1b 18!=="1C"){if(6===18){M=P;2J}}N if(1q.1u(18,[6]).J>0){M=6;2J}}6=6[3g]}1I[i]=M}}}if(19.2t.3r){1q.3r=y(a,b){B a!==b&&(a.3r?a.3r(b):P)}}N if(19.2t.6W){1q.3r=y(a,b){B!!(a.6W(b)&16)}}N{1q.3r=y(){B 17}}1q.2y=y(6){G 2t=(6?6.34||6:0).2t;B 2t?2t.1d!=="l0":17};G dc=y(Q,R,4g){G M,dt=[],du="",4V=R.1c?[R]:R;2q((M=1H.M.7Q.2e(Q))){du+=M[0];Q=Q.1r(1H.M.7Q,"")}Q=1H.4L[Q]?Q+"*":Q;U(G i=0,l=4V.J;i<l;i++){1q(Q,4V[i],dt,4g)}B 1q.1u(du,dt)};1q.3i=k.3i;1q.3X.aD={};k.2N=1q;k.1y=1q.3X;k.1y[":"]=k.1y.5o;k.7o=1q.dd;k.1Z=1q.7N;k.8E=1q.2y;k.3r=1q.3r})();G h1=/l1$/,h2=/^(?:h3|h4|dv)/,h5=/,/,h6=/^.[^:#\\[\\.,]*$/,2I=45.39.2I,5Y=k.1y.M.gW,h7={h8:P,3Y:P,6I:P,5p:P};k.fn.1O({2N:y(Q){G 1M=C,i,l;if(1b Q!=="1C"){B k(Q).1u(y(){U(i=0,l=1M.J;i<l;i++){if(k.3r(1M[i],C)){B P}}})}G K=C.3O("","2N",Q),J,n,r;U(i=0,l=C.J;i<l;i++){J=K.J;k.2N(Q,C[i],K);if(i>0){U(n=J;n<K.J;n++){U(r=0;r<J;r++){if(K[r]===K[n]){K.3P(n--,1);2J}}}}}B K},9M:y(1K){G dw=k(1K);B C.1u(y(){U(G i=0,l=dw.J;i<l;i++){if(k.3r(C,dw[i])){B P}}})},38:y(Q){B C.3O(dx(C,Q,17),"38",Q)},1u:y(Q){B C.3O(dx(C,Q,P),"1u",Q)},is:y(Q){B!!Q&&(1b Q==="1C"?5Y.1a(Q)?k(Q,C.R).2j(C[0])>=0:k.1u(Q,C).J>0:C.1u(Q).J>0)},h9:y(3X,R){G K=[],i,l,18=C[0];if(k.3k(3X)){G aN=1;2q(18&&18.34&&18!==R){U(i=0;i<3X.J;i++){if(k(18).is(3X[i])){K.1R({Q:3X[i],6:18,aN:aN})}}18=18.1i;aN++}B K}G 6Z=5Y.1a(3X)||1b 3X!=="1C"?k(3X,R||C.R):0;U(i=0,l=C.J;i<l;i++){18=C[i];2q(18){if(6Z?6Z.2j(18)>-1:k.2N.92(18,3X)){K.1R(18);2J}N{18=18.1i;if(!18||!18.34||18===R||18.1c===11){2J}}}}K=K.J>1?k.7o(K):K;B C.3O(K,"h9",3X)},2j:y(6){if(!6){B(C[0]&&C[0].1i)?C.dv().J:-1}if(1b 6==="1C"){B k.6s(C[0],k(6))}B k.6s(6.7h?6[0]:6,C)},2h:y(Q,R){G 1h=1b Q==="1C"?k(Q,R):k.2W(Q&&Q.1c?[Q]:Q),4C=k.7g(C.27(),1h);B C.3O(dy(1h[0])||dy(4C[0])?4C:k.7o(4C))},l2:y(){B C.2h(C.bK)}});y dy(2d){B!2d||!2d.1i||2d.1i.1c===11}k.1n({2c:y(6){G 2c=6.1i;B 2c&&2c.1c!==11?2c:T},h3:y(6){B k.3g(6,"1i")},l3:y(6,i,4i){B k.3g(6,"1i",4i)},6I:y(6){B k.5X(6,2,"4c")},5p:y(6){B k.5X(6,2,"7R")},l4:y(6){B k.3g(6,"4c")},dv:y(6){B k.3g(6,"7R")},l5:y(6,i,4i){B k.3g(6,"4c",4i)},h4:y(6,i,4i){B k.3g(6,"7R",4i)},l6:y(6){B k.dz((6.1i||{}).2o,6)},h8:y(6){B k.dz(6.2o)},3Y:y(6){B k.1d(6,"3Z")?6.ha||6.hb.19:k.2W(6.47)}},y(H,fn){k.fn[H]=y(4i,Q){G K=k.3a(C,fn,4i);if(!h1.1a(H)){Q=4i}if(Q&&1b Q==="1C"){K=k.1u(Q,K)}K=C.J>1&&!h7[H]?k.7o(K):K;if((C.J>1||h5.1a(Q))&&h2.1a(H)){K=K.l7()}B C.3O(K,H,2I.1l(1s).6n(","))}});k.1O({1u:y(1y,1T,38){if(38){1y=":38("+1y+")"}B 1T.J===1?k.2N.92(1T[0],1y)?[1T[0]]:[]:k.2N.3q(1y,1T)},3g:y(6,3g,4i){G 5m=[],18=6[3g];2q(18&&18.1c!==9&&(4i===14||18.1c!==1||!k(18).is(4i))){if(18.1c===1){5m.1R(18)}18=18[3g]}B 5m},5X:y(18,2C,3g,6){2C=2C||1;G 4o=0;U(;18;18=18[3g]){if(18.1c===1&&++4o===2C){2J}}B 18},dz:y(n,6){G r=[];U(;n;n=n.4c){if(n.1c===1&&n!==6){r.1R(n)}}B r}});y dx(3B,40,97){40=40||0;if(k.1Y(40)){B k.5K(3B,y(6,i){G 8d=!!40.1l(6,i,6);B 8d===97})}N if(40.1c){B k.5K(3B,y(6,i){B(6===40)===97})}N if(1b 40==="1C"){G dA=k.5K(3B,y(6){B 6.1c===1});if(h6.1a(40)){B k.1u(40,dA,!97)}N{40=k.1u(40,dA)}}B k.5K(3B,y(6,i){B(k.6s(6,40)>=0)===97})}y dB(19){G 2i=dC.2K("|"),aO=19.9Z();if(aO.2s){2q(2i.J){aO.2s(2i.4y())}}B aO}G dC="l8|l9|la|lb|lc|ld|L|le|lf|lg|lh|li|"+"gR|lj|6G|lk|9X|ll|9R|lm|ln|5Q|lo",hc=/ k\\d+="(?:\\d+|T)"/g,aP=/^\\s+/,dD=/<(?!hd|br|he|ck|hr|lp|1U|c7|lq|98)(([\\w:]+)[^>]*)\\/>/ig,dE=/<([\\w:]+)/,hf=/<2Y/i,hg=/<|&#?\\w+;/,hh=/<(?:1v|12)/i,hi=/<(?:1v|1S|ck|3z|12)/i,dF=2H 5N("<(?:"+dC+")[\\\\s/>]","i"),dG=/3c\\s*(?:[^=]|=\\s*.3c.)/i,dH=/\\/(lr|ls)1v/i,hj=/^\\s*<!(?:\\[lu\\[|\\-\\-)/,3N={3z:[1,"<3w cz=\'cz\'>","</3w>"],lv:[1,"<hk>","</hk>"],hl:[1,"<2B>","</2B>"],5O:[2,"<2B><2Y>","</2Y></2B>"],4a:[3,"<2B><2Y><5O>","</5O></2Y></2B>"],he:[2,"<2B><2Y></2Y><dI>","</dI></2B>"],hd:[1,"<3a>","</3a>"],5l:[0,"",""]},aQ=dB(19);3N.ga=3N.3z;3N.2Y=3N.lw=3N.dI=3N.lx=3N.hl;3N.ly=3N.4a;if(!k.1g.fr){3N.5l=[1,"V<V>","</V>"]}k.fn.1O({1Z:y(I){B k.4F(C,y(I){B I===14?k.1Z(C):C.8h().61((C[0]&&C[0].34||19).dJ(I))},T,I,1s.J)},aR:y(24){if(k.1Y(24)){B C.1n(y(i){k(C).aR(24.1l(C,i))})}if(C[0]){G 5q=k(24,C[0].34).eq(0).3j(P);if(C[0].1i){5q.5b(C[0])}5q.3a(y(){G 6=C;2q(6.2o&&6.2o.1c===1){6=6.2o}B 6}).61(C)}B C},hm:y(24){if(k.1Y(24)){B C.1n(y(i){k(C).hm(24.1l(C,i))})}B C.1n(y(){G 1M=k(C),3Y=1M.3Y();if(3Y.J){3Y.aR(24)}N{1M.61(24)}})},5q:y(24){G 1Y=k.1Y(24);B C.1n(y(i){k(C).aR(1Y?24.1l(C,i):24)})},lz:y(){B C.2c().1n(y(){if(!k.1d(C,"1m")){k(C).99(C.47)}}).3E()},61:y(){B C.70(1s,P,y(6){if(C.1c===1){C.3y(6)}})},hn:y(){B C.70(1s,P,y(6){if(C.1c===1){C.5b(6,C.2o)}})},aS:y(){if(C[0]&&C[0].1i){B C.70(1s,17,y(6){C.1i.5b(6,C)})}N if(1s.J){G 1h=k.aT(1s);1h.1R.2g(1h,C.bJ());B C.3O(1h,"aS",1s)}},dK:y(){if(C[0]&&C[0].1i){B C.70(1s,17,y(6){C.1i.5b(6,C.4c)})}N if(1s.J){G 1h=C.3O(C,"dK",1s);1h.1R.2g(1h,k.aT(1s));B 1h}},35:y(Q,ho){U(G i=0,6;(6=C[i])!=T;i++){if(!Q||k.1u(Q,[6]).J){if(!ho&&6.1c===1){k.9b(6.2A("*"));k.9b([6])}if(6.1i){6.1i.3T(6)}}}B C},8h:y(){U(G i=0,6;(6=C[i])!=T;i++){if(6.1c===1){k.9b(6.2A("*"))}2q(6.2o){6.3T(6.2o)}}B C},3j:y(62,71){62=62==T?17:62;71=71==T?62:71;B C.3a(y(){B k.3j(C,62,71)})},24:y(I){B k.4F(C,y(I){G 6=C[0]||{},i=0,l=C.J;if(I===14){B 6.1c===1?6.3x.1r(hc,""):T}if(1b I==="1C"&&!hh.1a(I)&&(k.1g.c8||!aP.1a(I))&&!3N[(dE.2e(I)||["",""])[1].1D()]){I=I.1r(dD,"<$1></$2>");2D{U(;i<l;i++){6=C[i]||{};if(6.1c===1){k.9b(6.2A("*"));6.3x=I}}6=0}2E(e){}}if(6){C.8h().61(I)}},T,I,1s.J)},99:y(I){if(C[0]&&C[0].1i){if(k.1Y(I)){B C.1n(y(i){G 1M=k(C),2x=1M.24();1M.99(I.1l(C,i,2x))})}if(1b I!=="1C"){I=k(I).hp()}B C.1n(y(){G 6I=C.4c,2c=C.1i;k(C).35();if(6I){k(6I).aS(I)}N{k(2c).61(I)}})}N{B C.J?C.3O(k(k.1Y(I)?I():I),"99",I):C}},hp:y(Q){B C.35(Q,P)},70:y(1z,2B,1p){G 1L,29,2f,2c,I=1z[0],5r=[];if(!k.1g.cf&&1s.J===3&&1b I==="1C"&&dG.1a(I)){B C.1n(y(){k(C).70(1z,2B,1p,P)})}if(k.1Y(I)){B C.1n(y(i){G 1M=k(C);1z[0]=I.1l(C,i,2B?1M.24():14);1M.70(1z,2B,1p)})}if(C[0]){2c=I&&I.1i;if(k.1g.1i&&2c&&2c.1c===11&&2c.47.J===C.J){1L={2f:2c}}N{1L=k.bI(1z,C,5r)}2f=1L.2f;if(2f.47.J===1){29=2f=2f.2o}N{29=2f.2o}if(29){2B=2B&&k.1d(29,"5O");U(G i=0,l=C.J,hq=l-1;i<l;i++){1p.1l(2B?4V(C[i],29):C[i],1L.6l||(l>1&&i<hq)?k.3j(2f,P,P):2f)}}if(5r.J){k.1n(5r,y(i,6){if(6.1A){k.72({E:"9c",6O:17,1w:6.1A,4E:17,3l:"1v"})}N{k.bT((6.1Z||6.az||6.3x||"").1r(hj,"/*$0*/"))}if(6.1i){6.1i.3T(6)}})}}B C}});y 4V(6,18){B k.1d(6,"2B")?(6.2A("2Y")[0]||6.3y(6.34.2s("2Y"))):6}y dL(1A,2L){if(2L.1c!==1||!k.cm(1A)){B}G E,i,l,dM=k.1X(1A),7U=k.1X(2L,dM),22=dM.22;if(22){3A 7U.26;7U.22={};U(E in 22){U(i=0,l=22[E].J;i<l;i++){k.O.2h(2L,E,22[E][i])}}}if(7U.L){7U.L=k.1O({},7U.L)}}y dN(1A,2L){G 1d;if(2L.1c!==1){B}if(2L.hs){2L.hs()}if(2L.ht){2L.ht(1A)}1d=2L.1d.1D();if(1d==="1S"){2L.9Y=1A.9Y}N if(1d==="1U"&&(1A.E==="58"||1A.E==="4H")){if(1A.3c){2L.hu=2L.3c=1A.3c}if(2L.I!==1A.I){2L.I=1A.I}}N if(1d==="3z"){2L.59=1A.lA}N if(1d==="1U"||1d==="8z"){2L.hv=1A.hv}N if(1d==="1v"&&2L.1Z!==1A.1Z){2L.1Z=1A.1Z}2L.4N(k.30);2L.4N("d1");2L.4N("d4")}k.bI=y(1z,9d,5r){G 2f,6l,7V,1J,29=1z[0];if(9d&&9d[0]){1J=9d[0].34||9d[0]}if(!1J.9Z){1J=19}if(1z.J===1&&1b 29==="1C"&&29.J<lB&&1J===19&&29.bH(0)==="<"&&!hi.1a(29)&&(k.1g.cf||!dG.1a(29))&&(k.1g.c9||!dF.1a(29))){6l=P;7V=k.dO[29];if(7V&&7V!==1){2f=7V}}if(!2f){2f=1J.9Z();k.aT(1z,1J,2f,5r)}if(6l){k.dO[29]=7V?2f:1}B{2f:2f,6l:6l}};k.dO={};k.1n({hw:"61",lC:"hn",5b:"aS",lD:"dK",lE:"99"},y(H,3K){k.fn[H]=y(Q){G K=[],7W=k(Q),2c=C.J===1&&C[0].1i;if(2c&&2c.1c===11&&2c.47.J===1&&7W.J===1){7W[3K](C[0]);B C}N{U(G i=0,l=7W.J;i<l;i++){G 1T=(i>0?C.3j(P):C).27();k(7W[i])[3K](1T);K=K.6t(1T)}B C.3O(K,H,7W.Q)}}});y 9e(6){if(1b 6.2A!=="14"){B 6.2A("*")}N if(1b 6.6X!=="14"){B 6.6X("*")}N{B[]}}y dP(6){if(6.E==="58"||6.E==="4H"){6.hu=6.3c}}y dQ(6){G 1d=(6.1d||"").1D();if(1d==="1U"){dP(6)}N if(1d!=="1v"&&1b 6.2A!=="14"){k.5K(6.2A("1U"),dP)}}y hx(6){G V=19.2s("V");aQ.3y(V);V.3x=6.9Y;B V.2o}k.1O({3j:y(6,62,71){G 63,73,i,3j=k.1g.c9||k.8E(6)||!dF.1a("<"+6.1d+">")?6.7v(P):hx(6);if((!k.1g.ca||!k.1g.fz)&&(6.1c===1||6.1c===11)&&!k.8E(6)){dN(6,3j);63=9e(6);73=9e(3j);U(i=0;63[i];++i){if(73[i]){dN(63[i],73[i])}}}if(62){dL(6,3j);if(71){63=9e(6);73=9e(3j);U(i=0;63[i];++i){dL(63[i],73[i])}}}63=73=T;B 3j},aT:y(1T,R,2f,5r){G dR,1v,j,K=[];R=R||19;if(1b R.2s==="14"){R=R.34||R[0]&&R[0].34||19}U(G i=0,6;(6=1T[i])!=T;i++){if(1b 6==="4q"){6+=""}if(!6){6p}if(1b 6==="1C"){if(!hg.1a(6)){6=R.dJ(6)}N{6=6.1r(dD,"<$1></$2>");G dS=(dE.2e(6)||["",""])[1].1D(),5q=3N[dS]||3N.5l,hy=5q[0],V=R.2s("V"),aU=aQ.47,35;if(R===19){aQ.3y(V)}N{dB(R).3y(V)}V.3x=5q[1]+6+5q[2];2q(hy--){V=V.a0}if(!k.1g.2Y){G dT=hf.1a(6),2Y=dS==="2B"&&!dT?V.2o&&V.2o.47:5q[1]==="<2B>"&&!dT?V.47:[];U(j=2Y.J-1;j>=0;--j){if(k.1d(2Y[j],"2Y")&&!2Y[j].47.J){2Y[j].1i.3T(2Y[j])}}}if(!k.1g.c8&&aP.1a(6)){V.5b(R.dJ(aP.2e(6)[0]),V.2o)}6=V.47;if(V){V.1i.3T(V);if(aU.J>0){35=aU[aU.J-1];if(35&&35.1i){35.1i.3T(35)}}}}}G 3Q;if(!k.1g.fF){if(6[0]&&1b(3Q=6.J)==="4q"){U(j=0;j<3Q;j++){dQ(6[j])}}N{dQ(6)}}if(6.1c){K.1R(6)}N{K=k.7g(K,6)}}if(2f){dR=y(6){B!6.E||dH.1a(6.E)};U(i=0;K[i];i++){1v=K[i];if(5r&&k.1d(1v,"1v")&&(!1v.E||dH.1a(1v.E))){5r.1R(1v.1i?1v.1i.3T(1v):1v)}N{if(1v.1c===1){G hz=k.5K(1v.2A("1v"),dR);K.3P.2g(K,[i+1,0].6t(hz))}2f.3y(1v)}}}B K},9b:y(1T){G L,id,1W=k.1W,1E=k.O.1E,6y=k.1g.6y;U(G i=0,6;(6=1T[i])!=T;i++){if(6.1d&&k.cj[6.1d.1D()]){6p}id=6[k.30];if(id){L=1W[id];if(L&&L.22){U(G E in L.22){if(1E[E]){k.O.35(6,E)}N{k.cO(6,E,L.26)}}if(L.26){L.26.6=T}}if(6y){3A 6[k.30]}N if(6.4N){6.4N(k.30)}3A 1W[id]}}}});G aV=/hA\\([^)]*\\)/i,hB=/2Q=([^)]*)/,hC=/([A-Z]|^ms)/g,hD=/^[\\-+]?(?:\\d*\\.)?\\d+$/i,aW=/^-?(?:\\d*\\.)?\\d+(?!4I)[^\\d\\s]+$/i,hE=/^([\\-+])=([\\-+.\\de]+)/,hF=/^4s/,hG={37:"cg",fG:"3d",1V:"7z"},64=["lF","lG","lH","lI"],65,4t,3m;k.fn.21=y(H,I){B k.4F(C,y(6,H,I){B I!==14?k.12(6,H,I):k.21(6,H)},H,I,1s.J>1)};k.1O({66:{2Q:{27:y(6,5s){if(5s){G K=65(6,"2Q");B K===""?"1":K}N{B 6.12.2Q}}}},aX:{"lJ":P,"lK":P,"lL":P,"2Q":P,"lM":P,"lN":P,"lO":P,"6F":P},dU:{"9V":k.1g.8o?"8o":"lP"},12:y(6,H,I,2p){if(!6||6.1c===3||6.1c===8||!6.12){B}G K,E,9f=k.5I(H),12=6.12,1B=k.66[9f];H=k.dU[9f]||9f;if(I!==14){E=1b I;if(E==="1C"&&(K=hE.2e(I))){I=(+(K[1]+1)*+K[2])+2u(k.21(6,H));E="4q"}if(I==T||E==="4q"&&bO(I)){B}if(E==="4q"&&!k.aX[9f]){I+="4I"}if(!1B||!("1h"in 1B)||(I=1B.1h(6,I))!==14){2D{12[H]=I}2E(e){}}}N{if(1B&&"27"in 1B&&(K=1B.27(6,17,2p))!==14){B K}B 12[H]}},21:y(6,H,2p){G K,1B;H=k.5I(H);1B=k.66[H];H=k.dU[H]||H;if(H==="8o"){H="9V"}if(1B&&"27"in 1B&&(K=1B.27(6,P,2p))!==14){B K}N if(65){B 65(6,H)}},dV:y(6,1e,1p){G 2x={},K,H;U(H in 1e){2x[H]=6.12[H];6.12[H]=1e[H]}K=1p.1l(6);U(H in 1e){6.12[H]=2x[H]}B K}});k.65=k.21;if(19.3J&&19.3J.4t){4t=y(6,H){G K,3J,41,2w,12=6.12;H=H.1r(hC,"-$1").1D();if((3J=6.34.3J)&&(41=3J.4t(6,T))){K=41.lQ(H);if(K===""&&!k.3r(6.34.2t,6)){K=k.12(6,H)}}if(!k.1g.ce&&41&&hF.1a(H)&&aW.1a(K)){2w=12.2w;12.2w=K;K=41.2w;12.2w=2w}B K}}if(19.2t.3m){3m=y(6,H){G 1t,9g,dW,K=6.3m&&6.3m[H],12=6.12;if(K==T&&12&&(dW=12[H])){K=dW}if(aW.1a(K)){1t=12.1t;9g=6.aY&&6.aY.1t;if(9g){6.aY.1t=6.3m.1t}12.1t=H==="lR"?"lS":K;K=12.lT+"4I";12.1t=1t;if(9g){6.aY.1t=9g}}B K===""?"ah":K}}65=4t||3m;y dX(6,H,2p){G 1f=H==="2w"?6.7B:6.a7,i=H==="2w"?1:0,3Q=4;if(1f>0){if(2p!=="6E"){U(;i<3Q;i+=2){if(!2p){1f-=2u(k.21(6,"6D"+64[i]))||0}if(2p==="4s"){1f+=2u(k.21(6,2p+64[i]))||0}N{1f-=2u(k.21(6,"6E"+64[i]+"aZ"))||0}}}B 1f+"4I"}1f=65(6,H);if(1f<0||1f==T){1f=6.12[H]}if(aW.1a(1f)){B 1f}1f=2u(1f)||0;if(2p){U(;i<3Q;i+=2){1f+=2u(k.21(6,"6D"+64[i]))||0;if(2p!=="6D"){1f+=2u(k.21(6,"6E"+64[i]+"aZ"))||0}if(2p==="4s"){1f+=2u(k.21(6,2p+64[i]))||0}}}B 1f+"4I"}k.1n(["3U","2w"],y(i,H){k.66[H]={27:y(6,5s,2p){if(5s){if(6.7B!==0){B dX(6,H,2p)}N{B k.dV(6,hG,y(){B dX(6,H,2p)})}}},1h:y(6,I){B hD.1a(I)?I+"4I":I}}});if(!k.1g.2Q){k.66.2Q={27:y(6,5s){B hB.1a((5s&&6.3m?6.3m.1u:6.12.1u)||"")?(2u(5N.$1)/hH)+"":5s?"1":""},1h:y(6,I){G 12=6.12,3m=6.3m,2Q=k.9F(I)?"hA(2Q="+I*hH+")":"",1u=3m&&3m.1u||12.1u||"";12.6F=1;if(I>=1&&k.46(1u.1r(aV,""))===""){12.4N("1u");if(3m&&!3m.1u){B}}12.1u=aV.1a(1u)?1u.1r(aV,2Q):1u+" "+2Q}}}k(y(){if(!k.1g.cd){k.66.7A={27:y(6,5s){B k.dV(6,{"1V":"8q-7z"},y(){if(5s){B 65(6,"4s-lU")}N{B 6.12.7A}})}}}});if(k.1y&&k.1y.5o){k.1y.5o.3d=y(6){G 2w=6.7B,3U=6.a7;B(2w===0&&3U===0)||(!k.1g.fK&&((6.12&&6.12.1V)||k.21(6,"1V"))==="4J")};k.1y.5o.ch=y(6){B!k.1y.5o.3d(6)}}k.1n({4s:"",6D:"",6E:"aZ"},y(4j,dY){k.66[4j+dY]={dZ:y(I){G i,1o=1b I==="1C"?I.2K(" "):[I],e0={};U(i=0;i<4;i++){e0[4j+64[i]+dY]=1o[i]||1o[i-2]||1o[0]}B e0}}});G hI=/%20/g,hJ=/\\[\\]$/,e1=/\\r?\\n/g,hK=/#.*$/,hL=/^(.*?):[ \\t]*([^\\r\\n]*)\\r?$/mg,hM=/^(?:lV|lW|hN|hN-lX|lY|3d|lZ|4q|aF|m0|m1|m2|1Z|5Q|1w|m3)$/i,hO=/^(?:m4|hP|hP\\-m5|.+\\-m6|dn|m7|m8):$/,hQ=/^(?:9c|m9)$/,hR=/^\\/\\//,e2=/\\?/,hS=/<1v\\b[^<]*(?:(?!<\\/1v>)<[^<]*)*<\\/1v>/gi,hT=/^(?:3w|8z)/i,e3=/\\s+/,hU=/([?&])4B=[^&]*/,e4=/^([\\w\\+\\.\\-]+:)(?:\\/\\/([^\\/?#:]*)(?::(\\d+))?)?/,e5=k.fn.8b,b0={},e6={},67,68,e7=["*/"]+["*"];2D{67=bB.3S}2E(e){67=19.2s("a");67.3S="";67=67.3S}68=e4.2e(67.1D())||[];y e8(69){B y(9h,6v){if(1b 9h!=="1C"){6v=9h;9h="*"}if(k.1Y(6v)){G 2r=9h.1D().2K(e3),i=0,J=2r.J,3l,2i,b1;U(;i<J;i++){3l=2r[i];b1=/^\\+/.1a(3l);if(b1){3l=3l.93(1)||"*"}2i=69[3l]=69[3l]||[];2i[b1?"5e":"1R"](6v)}}}}y 9i(69,1e,b2,1x,3l,6a){3l=3l||1e.2r[0];6a=6a||{};6a[3l]=P;G 2i=69[3l],i=0,J=2i?2i.J:0,b3=(69===b0),4k;U(;i<J&&(b3||!4k);i++){4k=2i[i](1e,b2,1x);if(1b 4k==="1C"){if(!b3||6a[4k]){4k=14}N{1e.2r.5e(4k);4k=9i(69,1e,b2,1x,4k,6a)}}}if((b3||!4k)&&!6a["*"]){4k=9i(69,1e,b2,1x,"*",6a)}B 4k}y e9(1K,1A){G 1j,4p,b4=k.6b.b4||{};U(1j in 1A){if(1A[1j]!==14){(b4[1j]?1K:(4p||(4p={})))[1j]=1A[1j]}}if(4p){k.1O(P,1K,4p)}}k.fn.1O({8b:y(1w,5t,1p){if(1b 1w!=="1C"&&e5){B e5.2g(C,1s)}N if(!C.J){B C}G 3F=1w.2V(" ");if(3F>=0){G Q=1w.2I(3F,1w.J);1w=1w.2I(0,3F)}G E="9c";if(5t){if(k.1Y(5t)){1p=5t;5t=14}N if(1b 5t==="1S"){5t=k.98(5t,k.6b.4l);E="ma"}}G 1M=C;k.72({1w:1w,E:E,3l:"24",L:5t,2X:y(1x,2R,5u){5u=1x.5u;if(1x.fg()){1x.36(y(r){5u=r});1M.24(Q?k("<V>").61(5u.1r(hS,"")).2N(Q):5u)}if(1p){1M.1n(1p,[5u,2R,1x])}}});B C},mb:y(){B k.98(C.hV())},hV:y(){B C.3a(y(){B C.3B?k.2W(C.3B):C}).1u(y(){B C.H&&!C.49&&(C.3c||hT.1a(C.1d)||hM.1a(C.E))}).3a(y(i,6){G 1f=k(C).1f();B 1f==T?T:k.3k(1f)?k.3a(1f,y(1f,i){B{H:6.H,I:1f.1r(e1,"\\r\\n")}}):{H:6.H,I:1f.1r(e1,"\\r\\n")}}).27()}});k.1n("hW hX hY mc md hZ".2K(" "),y(i,o){k.fn[o]=y(f){B C.3H(o,f)}});k.1n(["27","me"],y(i,3t){k[3t]=y(1w,L,1p,E){if(k.1Y(L)){E=E||1p;1p=L;L=14}B k.72({E:3t,1w:1w,L:L,5v:1p,3l:E})}});k.1O({mf:y(1w,1p){B k.27(1w,14,1p,"1v")},mh:y(1w,L,1p){B k.27(1w,L,1p,"5w")},b5:y(1K,b6){if(b6){e9(1K,k.6b)}N{b6=1K;1K=k.6b}e9(1K,b6);B 1K},6b:{1w:67,ea:hO.1a(68[1]),6O:P,E:"9c",9j:"74/x-i0-3p-i1; i2=mi-8",i3:P,4E:P,9k:{2F:"74/2F, 1Z/2F",24:"1Z/24",1Z:"1Z/mj",5w:"74/5w, 1Z/b7","*":e7},3Y:{2F:/2F/,24:/24/,5w:/5w/},9l:{2F:"i4",1Z:"5u"},42:{"* 1Z":1Q.9z,"1Z 24":P,"1Z 5w":k.bR,"1Z 2F":k.f7},b4:{R:P,1w:P}},eb:e8(b0),ec:e8(e6),72:y(1w,1e){if(1b 1w==="1S"){1e=1w;1w=14}1e=1e||{};G s=k.b5({},1e),5x=s.R||s,b8=5x!==s&&(5x.1c||5x 7f k)?k(5x):k.O,2l=k.8i(),ed=k.6r("5F 2O"),6c=s.6c||{},4W,ee={},ef={},b9,6d,75,ba,1o,2v=0,7X,i,1x={4D:0,76:y(H,I){if(!2v){G eg=H.1D();H=ef[eg]=ef[eg]||H;ee[H]=I}B C},i5:y(){B 2v===2?b9:T},bb:y(1j){G M;if(2v===2){if(!6d){6d={};2q((M=hL.2e(b9))){6d[M[1].1D()]=M[2]}}M=6d[1j.1D()]}B M===14?T:M},eh:y(E){if(!2v){s.bc=E}B C},6e:y(2S){2S=2S||"6e";if(75){75.6e(2S)}36(0,2S);B C}};y 36(2R,ei,3u,5y){if(2v===2){B}2v=2;if(ba){g1(ba)}75=14;b9=5y||"";1x.4D=2R>0?4:0;G 7Y,5v,2P,2S=ei,4A=3u?i6(s,1x,3u):14,77,78;if(2R>=bd&&2R<mk||2R===i7){if(s.i8){if((77=1x.bb("ml-i9"))){k.77[4W]=77}if((78=1x.bb("mm"))){k.78[4W]=78}}if(2R===i7){2S="mn";7Y=P}N{2D{5v=ia(s,4A);2S="5v";7Y=P}2E(e){2S="fa";2P=e}}}N{2P=2S;if(!2S||2R){2S="2P";if(2R<0){2R=0}}}1x.2R=2R;1x.2S=""+(ei||2S);if(7Y){2l.8m(5x,[5v,2S,1x])}N{2l.mo(5x,[1x,2S,2P])}1x.6c(6c);6c=14;if(7X){b8.3n("72"+(7Y?"mp":"bQ"),[1x,s,7Y?5v:2P])}ed.7i(5x,[1x,2S]);if(7X){b8.3n("hY",[1x,s]);if(!(--k.ej)){k.O.3n("hX")}}}2l.2U(1x);1x.5v=1x.36;1x.2P=1x.7r;1x.2X=ed.2h;1x.6c=y(3a){if(3a){G 2G;if(2v<2){U(2G in 3a){6c[2G]=[6c[2G],3a[2G]]}}N{2G=3a[1x.2R];1x.9S(2G,2G)}}B C};s.1w=((1w||s.1w)+"").1r(hK,"").1r(hR,68[1]+"//");s.2r=k.46(s.3l||"*").1D().2K(e3);if(s.79==T){1o=e4.2e(s.1w.1D());s.79=!!(1o&&(1o[1]!=68[1]||1o[2]!=68[2]||(1o[3]||(1o[1]==="ib:"?80:ic))!=(68[3]||(68[1]==="ib:"?80:ic))))}if(s.L&&s.i3&&1b s.L!=="1C"){s.L=k.98(s.L,s.4l)}9i(b0,s,1e,1x);if(2v===2){B 17}7X=s.6O;s.E=s.E.9w();s.bf=!hQ.1a(s.E);if(7X&&k.ej++===0){k.O.3n("hW")}if(!s.bf){if(s.L){s.1w+=(e2.1a(s.1w)?"&":"?")+s.L;3A s.L}4W=s.1w;if(s.1W===17){G ek=k.3G(),K=s.1w.1r(hU,"$mq="+ek);s.1w=K+((K===s.1w)?(e2.1a(s.1w)?"&":"?")+"4B="+ek:"")}}if(s.L&&s.bf&&s.9j!==17||1e.9j){1x.76("mr-mt",s.9j)}if(s.i8){4W=4W||s.1w;if(k.77[4W]){1x.76("ie-i9-mu",k.77[4W])}if(k.78[4W]){1x.76("ie-mv-mw",k.78[4W])}}1x.76("mx",s.2r[0]&&s.9k[s.2r[0]]?s.9k[s.2r[0]]+(s.2r[0]!=="*"?", "+e7+"; q=0.my":""):s.9k["*"]);U(i in s.5y){1x.76(i,s.5y[i])}if(s.ih&&(s.ih.1l(5x,1x,s)===17||2v===2)){1x.6e();B 17}U(i in{5v:1,2P:1,2X:1}){1x[i](s[i])}75=9i(e6,s,1e,1x);if(!75){36(-1,"ii mz")}N{1x.4D=1;if(7X){b8.3n("hZ",[1x,s])}if(s.4E&&s.8w>0){ba=6q(y(){1x.6e("8w")},s.8w)}2D{2v=1;75.bg(ee,36)}2E(e){if(2v<2){36(-1,e)}N{bP e;}}}B 1x},98:y(a,4l){G s=[],2h=y(1j,I){I=k.1Y(I)?I():I;s[s.J]=ij(1j)+"="+ij(I)};if(4l===14){4l=k.6b.4l}if(k.3k(a)||(a.7h&&!k.89(a))){k.1n(a,y(){2h(C.H,C.I)})}N{U(G 4j in a){bh(4j,a[4j],4l,2h)}}B s.6n("&").1r(hI,"+")}});y bh(4j,1F,4l,2h){if(k.3k(1F)){k.1n(1F,y(i,v){if(4l||hJ.1a(4j)){2h(4j,v)}N{bh(4j+"["+(1b v==="1S"?i:"")+"]",v,4l,2h)}})}N if(!4l&&k.E(1F)==="1S"){U(G H in 1F){bh(4j+"["+H+"]",1F[H],4l,2h)}}N{2h(4j,1F)}}k.1O({ej:0,77:{},78:{}});y i6(s,1x,3u){G 3Y=s.3Y,2r=s.2r,9l=s.9l,ct,E,5z,bi;U(E in 9l){if(E in 3u){1x[9l[E]]=3u[E]}}2q(2r[0]==="*"){2r.57();if(ct===14){ct=s.bc||1x.bb("mA-E")}}if(ct){U(E in 3Y){if(3Y[E]&&3Y[E].1a(ct)){2r.5e(E);2J}}}if(2r[0]in 3u){5z=2r[0]}N{U(E in 3u){if(!2r[0]||s.42[E+" "+2r[0]]){5z=E;2J}if(!bi){bi=E}}5z=5z||bi}if(5z){if(5z!==2r[0]){2r.5e(5z)}B 3u[5z]}}y ia(s,4A){if(s.ik){4A=s.ik(4A,s.3l)}G 2r=s.2r,42={},i,1j,J=2r.J,2G,5A=2r[0],5p,9m,5B,6f,6g;U(i=1;i<J;i++){if(i===1){U(1j in s.42){if(1b 1j==="1C"){42[1j.1D()]=s.42[1j]}}}5p=5A;5A=2r[i];if(5A==="*"){5A=5p}N if(5p!=="*"&&5p!==5A){9m=5p+" "+5A;5B=42[9m]||42["* "+5A];if(!5B){6g=14;U(6f in 42){2G=6f.2K(" ");if(2G[0]===5p||2G[0]==="*"){6g=42[2G[1]+" "+5A];if(6g){6f=42[6f];if(6f===P){5B=6g}N if(6g===P){5B=6f}2J}}}}if(!(5B||6g)){k.2P("ii 9m el "+9m.1r(" "," 9n "))}if(5B!==P){4A=5B?5B(4A):6g(6f(4A))}}}B 4A}G il=k.3G(),9o=/(\\=)\\?(&|$)|\\?\\?/i;k.b5({7Z:"1p",43:y(){B k.30+"4B"+(il++)}});k.eb("5w 7Z",y(s,mB,1x){G em=(1b s.L==="1C")&&/^74\\/x\\-i0\\-3p\\-i1/.1a(s.9j);if(s.2r[0]==="7Z"||s.7Z!==17&&(9o.1a(s.1w)||em&&9o.1a(s.L))){G 81,43=s.43=k.1Y(s.43)?s.43():s.43,en=1Q[43],1w=s.1w,L=s.L,1r="$1"+43+"$2";if(s.7Z!==17){1w=1w.1r(9o,1r);if(s.1w===1w){if(em){L=L.1r(9o,1r)}if(s.L===L){1w+=(/\\?/.1a(1w)?"&":"?")+s.7Z+"="+43}}}s.1w=1w;s.L=L;1Q[43]=y(4A){81=[4A]};1x.fk(y(){1Q[43]=en;if(81&&k.1Y(en)){1Q[43](81[0])}});s.42["1v 5w"]=y(){if(!81){k.2P(43+" mC 38 mD")}B 81[0]};s.2r[0]="5w";B"1v"}});k.b5({9k:{1v:"1Z/b7, 74/b7, 74/eo, 74/x-eo"},3Y:{1v:/b7|eo/},42:{"1Z 1v":y(1Z){k.bT(1Z);B 1Z}}});k.eb("1v",y(s){if(s.1W===14){s.1W=17}if(s.79){s.E="9c";s.6O=17}});k.ec("1v",y(s){if(s.79){G 1v,7a=19.7a||19.2A("7a")[0]||19.2t;B{bg:y(4B,1p){1v=19.2s("1v");1v.4E="4E";if(s.im){1v.i2=s.im}1v.1A=s.1w;1v.9E=1v.7j=y(4B,7b){if(7b||!1v.4D||/mE|2X/.1a(1v.4D)){1v.9E=1v.7j=T;if(7a&&1v.1i){7a.3T(1v)}1v=14;if(!7b){1p(bd,"5v")}}};7a.5b(1v,7a.2o)},6e:y(){if(1v){1v.9E(0,1)}}}}});G bj=1Q.9I?y(){U(G 1j in 7c){7c[1j](0,1)}}:17,io=0,7c;y ep(){2D{B 2H 1Q.ip()}2E(e){}}y iq(){2D{B 2H 1Q.9I("f9.mF")}2E(e){}}k.6b.2z=1Q.9I?y(){B!C.ea&&ep()||iq()}:ep;(y(2z){k.1O(k.1g,{72:!!2z,ir:!!2z&&("mG"in 2z)})})(k.6b.2z());if(k.1g.72){k.ec(y(s){if(!s.79||k.1g.ir){G 1p;B{bg:y(5y,2X){G 2z=s.2z(),26,i;if(s.it){2z.cA(s.E,s.1w,s.4E,s.it,s.aF)}N{2z.cA(s.E,s.1w,s.4E)}if(s.er){U(i in s.er){2z[i]=s.er[i]}}if(s.bc&&2z.eh){2z.eh(s.bc)}if(!s.79&&!5y["X-iu-9T"]){5y["X-iu-9T"]="ip"}2D{U(i in 5y){2z.76(i,5y[i])}}2E(4B){}2z.bg((s.bf&&s.L)||T);1p=y(4B,7b){G 2R,2S,6d,3u,2F;2D{if(1p&&(7b||2z.4D===4)){1p=14;if(26){2z.7j=k.bS;if(bj){3A 7c[26]}}if(7b){if(2z.4D!==4){2z.6e()}}N{2R=2z.2R;6d=2z.i5();3u={};2F=2z.i4;if(2F&&2F.2t){3u.2F=2F}2D{3u.1Z=2z.5u}2E(4B){}2D{2S=2z.2S}2E(e){2S=""}if(!2R&&s.ea&&!s.79){2R=3u.1Z?bd:mH}N if(2R===mI){2R=mJ}}}}2E(iv){if(!7b){2X(-1,iv)}}if(3u){2X(2R,2S,3u,6d)}};if(!s.4E||2z.4D===4){1p()}N{26=++io;if(bj){if(!7c){7c={};k(1Q).gL(bj)}7c[26]=1p}2z.7j=1p}},6e:y(){if(1p){1p(0,1)}}}}})}G bk={},3Z,7d,iw=/^(?:4x|3v|3C)$/,ix=/^([+\\-]=)?([\\d+.\\-]+)([a-z%]*)$/i,9p,9q=[["3U","7C","mK","mL","mM"],["2w","es","7A","mN","mO"],["2Q"]],9r;k.fn.1O({3v:y(2M,33,1p){G 6,1V;if(2M||2M===0){B C.82(7e("3v",3),2M,33,1p)}N{U(G i=0,j=C.J;i<j;i++){6=C[i];if(6.12){1V=6.12.1V;if(!k.1X(6,"9s")&&1V==="4J"){1V=6.12.1V=""}if((1V===""&&k.21(6,"1V")==="4J")||!k.3r(6.34.2t,6)){k.1X(6,"9s",et(6.1d))}}}U(i=0;i<j;i++){6=C[i];if(6.12){1V=6.12.1V;if(1V===""||1V==="4J"){6.12.1V=k.1X(6,"9s")||""}}}B C}},3C:y(2M,33,1p){if(2M||2M===0){B C.82(7e("3C",3),2M,33,1p)}N{G 6,1V,i=0,j=C.J;U(;i<j;i++){6=C[i];if(6.12){1V=k.21(6,"1V");if(1V!=="4J"&&!k.1X(6,"9s")){k.1X(6,"9s",1V)}}}U(i=0;i<j;i++){if(C[i].12){C[i].12.1V="4J"}}B C}},iy:k.fn.4x,4x:y(fn,eu,1p){G ev=1b fn==="8a";if(k.1Y(fn)&&k.1Y(eu)){C.iy.2g(C,1s)}N if(fn==T||ev){C.1n(y(){G 2v=ev?fn:k(C).is(":3d");k(C)[2v?"3v":"3C"]()})}N{C.82(7e("4x",3),fn,eu,1p)}B C},mP:y(2M,9n,33,1p){B C.1u(":3d").21("2Q",0).3v().3E().82({2Q:9n},2M,33,1p)},82:y(1k,2M,33,1p){G 83=k.2M(2M,33,1p);if(k.8c(1k)){B C.1n(83.2X,[17])}1k=k.1O({},1k);y ew(){if(83.2b===17){k.g0(C)}G 2a=k.1O({},83),ex=C.1c===1,3d=ex&&k(C).is(":3d"),H,1f,p,e,1B,1r,1o,4m,3E,4n,3t;2a.6h={};U(p in 1k){H=k.5I(p);if(p!==H){1k[H]=1k[p];3A 1k[p]}if((1B=k.66[H])&&"dZ"in 1B){1r=1B.dZ(1k[H]);3A 1k[H];U(p in 1r){if(!(p in 1k)){1k[p]=1r[p]}}}}U(H in 1k){1f=1k[H];if(k.3k(1f)){2a.6h[H]=1f[1];1f=1k[H]=1f[0]}N{2a.6h[H]=2a.iz&&2a.iz[H]||2a.33||\'iA\'}if(1f==="3C"&&3d||1f==="3v"&&!3d){B 2a.2X.1l(C)}if(ex&&(H==="3U"||H==="2w")){2a.4b=[C.12.4b,C.12.mQ,C.12.mR];if(k.21(C,"1V")==="8q"&&k.21(C,"9V")==="4J"){if(!k.1g.cb||et(C.1d)==="8q"){C.12.1V="8q-7z"}N{C.12.6F=1}}}}if(2a.4b!=T){C.12.4b="3d"}U(p in 1k){e=2H k.fx(C,2a,p);1f=1k[p];if(iw.1a(1f)){3t=k.1X(C,"4x"+p)||(1f==="4x"?3d?"3v":"3C":0);if(3t){k.1X(C,"4x"+p,3t==="3v"?"3C":"3v");e[3t]()}N{e[1f]()}}N{1o=ix.2e(1f);4m=e.18();if(1o){3E=2u(1o[2]);4n=1o[3]||(k.aX[p]?"":"4I");if(4n!=="4I"){k.12(C,p,(3E||1)+4n);4m=((3E||1)/e.18())*4m;k.12(C,p,4m+4n)}if(1o[1]){3E=((1o[1]==="-="?-1:1)*3E)+4m}e.84(4m,3E,4n)}N{e.84(4m,1f,"")}}}B P}B 83.2b===17?C.1n(ew):C.2b(83.2b,ew)},6J:y(E,8x,4X){if(1b E!=="1C"){4X=8x;8x=E;E=14}if(8x&&E!==17){C.2b(E||"fx",[])}B C.1n(y(){G 2j,ey=17,3h=k.3h,L=k.1X(C);if(!4X){k.cu(P,C)}y ez(6,L,2j){G 1B=L[2j];k.4M(6,2j,P);1B.6J(4X)}if(E==T){U(2j in L){if(L[2j]&&L[2j].6J&&2j.2V(".ab")===2j.J-4){ez(C,L,2j)}}}N if(L[2j=E+".ab"]&&L[2j].6J){ez(C,L,2j)}U(2j=3h.J;2j--;){if(3h[2j].6===C&&(E==T||3h[2j].2b===E)){if(4X){3h[2j](P)}N{3h[2j].iB()}ey=P;3h.3P(2j,1)}}if(!(4X&&ey)){k.6H(C,E)}})}});y eA(){6q(iC,0);B(9r=k.3G())}y iC(){9r=14}y 7e(E,4o){G 1F={};k.1n(9q.6t.2g([],9q.2I(0,4o)),y(){1F[C]=E});B 1F}k.1n({mS:7e("3v",1),mT:7e("3C",1),mU:7e("4x",1),mV:{2Q:"3v"},mW:{2Q:"3C"},mX:{2Q:"4x"}},y(H,3f){k.fn[H]=y(2M,33,1p){B C.82(3f,2M,33,1p)}});k.1O({2M:y(2M,33,fn){G 2a=2M&&1b 2M==="1S"?k.1O({},2M):{2X:fn||!fn&&33||k.1Y(2M)&&2M,4Y:2M,33:fn&&33||33&&!k.1Y(33)&&33};2a.4Y=k.fx.3F?0:1b 2a.4Y==="4q"?2a.4Y:2a.4Y in k.fx.8v?k.fx.8v[2a.4Y]:k.fx.8v.5l;if(2a.2b==T||2a.2b===P){2a.2b="fx"}2a.2x=2a.2X;2a.2X=y(iD){if(k.1Y(2a.2x)){2a.2x.1l(C)}if(2a.2b){k.6H(C,2a.2b)}N if(iD!==17){k.cu(C)}};B 2a},33:{mY:y(p){B p},iA:y(p){B(-53.mZ(p*53.n0)/2)+0.5}},3h:[],fx:y(6,1e,1k){C.1e=1e;C.6=6;C.1k=1k;1e.3L=1e.3L||{}}});k.fx.39={eB:y(){if(C.1e.6i){C.1e.6i.1l(C.6,C.3G,C)}(k.fx.6i[C.1k]||k.fx.6i.5l)(C)},18:y(){if(C.6[C.1k]!=T&&(!C.6.12||C.6.12[C.1k]==T)){B C.6[C.1k]}G eC,r=k.21(C.6,C.1k);B bO(eC=2u(r))?!r||r==="ah"?0:r:eC},84:y(el,9n,4n){G 1M=C,fx=k.fx;C.eD=9r||eA();C.3E=9n;C.3G=C.4m=el;C.6Z=C.2v=0;C.4n=4n||C.4n||(k.aX[C.1k]?"":"4I");y t(4X){B 1M.6i(4X)}t.2b=C.1e.2b;t.6=C.6;t.iB=y(){if(k.1X(1M.6,"85"+1M.1k)===14){if(1M.1e.3C){k.1X(1M.6,"85"+1M.1k,1M.4m)}N if(1M.1e.3v){k.1X(1M.6,"85"+1M.1k,1M.3E)}}};if(t()&&k.3h.1R(t)&&!9p){9p=fV(fx.iE,fx.iF)}},3v:y(){G bm=k.1X(C.6,"85"+C.1k);C.1e.3L[C.1k]=bm||k.12(C.6,C.1k);C.1e.3v=P;if(bm!==14){C.84(C.18(),bm)}N{C.84(C.1k==="2w"||C.1k==="3U"?1:0,C.18())}k(C.6).3v()},3C:y(){C.1e.3L[C.1k]=k.1X(C.6,"85"+C.1k)||k.12(C.6,C.1k);C.1e.3C=P;C.84(C.18(),0)},6i:y(4X){G p,n,2X,t=9r||eA(),36=P,6=C.6,1e=C.1e;if(4X||t>=1e.4Y+C.eD){C.3G=C.3E;C.6Z=C.2v=1;C.eB();1e.6h[C.1k]=P;U(p in 1e.6h){if(1e.6h[p]!==P){36=17}}if(36){if(1e.4b!=T&&!k.1g.cc){k.1n(["","X","Y"],y(2j,I){6.12["4b"+I]=1e.4b[2j]})}if(1e.3C){k(6).3C()}if(1e.3C||1e.3v){U(p in 1e.6h){k.12(6,p,1e.3L[p]);k.4M(6,"85"+p,P);k.4M(6,"4x"+p,P)}}2X=1e.2X;if(2X){1e.2X=17;2X.1l(6)}}B 17}N{if(1e.4Y==n1){C.3G=t}N{n=t-C.eD;C.2v=n/1e.4Y;C.6Z=k.33[1e.6h[C.1k]](C.2v,n,0,1,1e.4Y);C.3G=C.4m+((C.3E-C.4m)*C.6Z)}C.eB()}B P}};k.1O(k.fx,{iE:y(){G bn,3h=k.3h,i=0;U(;i<3h.J;i++){bn=3h[i];if(!bn()&&3h[i]===bn){3h.3P(i--,1)}}if(!3h.J){k.fx.6J()}},iF:13,6J:y(){n2(9p);9p=T},8v:{n3:n4,n5:bd,5l:n6},6i:{2Q:y(fx){k.12(fx.6,"2Q",fx.3G)},5l:y(fx){if(fx.6.12&&fx.6.12[fx.1k]!=T){fx.6.12[fx.1k]=fx.3G+fx.4n}N{fx.6[fx.1k]=fx.3G}}}});k.1n(9q.6t.2g([],9q),y(i,1k){if(1k.2V("4s")){k.fx.6i[1k]=y(fx){k.12(fx.6,1k,53.5J(0,fx.3G)+fx.4n)}}});if(k.1y&&k.1y.5o){k.1y.5o.n7=y(6){B k.5K(k.3h,y(fn){B 6===fn.6}).J}}y et(1d){if(!bk[1d]){G 1m=19.1m,6=k("<"+1d+">").hw(1m),1V=6.21("1V");6.35();if(1V==="4J"||1V===""){if(!3Z){3Z=19.2s("3Z");3Z.gc=3Z.2w=3Z.3U=0}1m.3y(3Z);if(!7d||!3Z.2s){7d=(3Z.hb||3Z.ha).19;7d.n8((k.1g.6z?"<!n9 24>":"")+"<24><1m>");7d.na()}6=7d.2s(1d);7d.1m.3y(6);1V=k.21(6,"1V");1m.3T(3Z)}bk[1d]=1V}B bk[1d]}G bo,iG=/^t(?:nb|d|h)$/i,eF=/^(?:1m|24)$/i;if("iH"in 19.2t){bo=y(6,1J,4Z,6j){2D{6j=6.iH()}2E(e){}if(!6j||!k.3r(4Z,6)){B 6j?{1N:6j.1N,1t:6j.1t}:{1N:0,1t:0}}G 1m=1J.1m,44=eG(1J),7L=4Z.7L||1m.7L||0,7K=4Z.7K||1m.7K||0,4w=44.iI||k.1g.6z&&4Z.4w||1m.4w,4v=44.iJ||k.1g.6z&&4Z.4v||1m.4v,1N=6j.1N+4w-7L,1t=6j.1t+4v-7K;B{1N:1N,1t:1t}}}N{bo=y(6,1J,4Z){G 41,2T=6.2T,iK=6,1m=1J.1m,3J=1J.3J,86=3J?3J.4t(6,T):6.3m,1N=6.4K,1t=6.bq;2q((6=6.1i)&&6!==1m&&6!==4Z){if(k.1g.ci&&86.37==="a8"){2J}41=3J?3J.4t(6,T):6.3m;1N-=6.4w;1t-=6.4v;if(6===2T){1N+=6.4K;1t+=6.bq;if(k.1g.fM&&!(k.1g.fN&&iG.1a(6.1d))){1N+=2u(41.eH)||0;1t+=2u(41.eI)||0}iK=2T;2T=6.2T}if(k.1g.fO&&41.4b!=="ch"){1N+=2u(41.eH)||0;1t+=2u(41.eI)||0}86=41}if(86.37==="4L"||86.37==="a6"){1N+=1m.4K;1t+=1m.bq}if(k.1g.ci&&86.37==="a8"){1N+=53.5J(4Z.4w,1m.4w);1t+=53.5J(4Z.4v,1m.4v)}B{1N:1N,1t:1t}}}k.fn.3I=y(1e){if(1s.J){B 1e===14?C:C.1n(y(i){k.3I.iL(C,1e,i)})}G 6=C[0],1J=6&&6.34;if(!1J){B T}if(6===1J.1m){B k.3I.iM(6)}B bo(6,1J,1J.2t)};k.3I={iM:y(1m){G 1N=1m.4K,1t=1m.bq;if(k.1g.fP){1N+=2u(k.21(1m,"7C"))||0;1t+=2u(k.21(1m,"es"))||0}B{1N:1N,1t:1t}},iL:y(6,1e,i){G 37=k.21(6,"37");if(37==="a6"){6.12.37="4L"}G bs=k(6),bt=bs.3I(),eJ=k.21(6,"1N"),eK=k.21(6,"1t"),iN=(37==="cg"||37==="a8")&&k.6s("ah",[eJ,eK])>-1,3f={},bu={},bv,bw;if(iN){bu=bs.37();bv=bu.1N;bw=bu.1t}N{bv=2u(eJ)||0;bw=2u(eK)||0}if(k.1Y(1e)){1e=1e.1l(6,i,bt)}if(1e.1N!=T){3f.1N=(1e.1N-bt.1N)+bv}if(1e.1t!=T){3f.1t=(1e.1t-bt.1t)+bw}if("iO"in 1e){1e.iO.1l(6,3f)}N{bs.21(3f)}}};k.fn.1O({37:y(){if(!C[0]){B T}G 6=C[0],2T=C.2T(),3I=C.3I(),9t=eF.1a(2T[0].1d)?{1N:0,1t:0}:2T.3I();3I.1N-=2u(k.21(6,"7C"))||0;3I.1t-=2u(k.21(6,"es"))||0;9t.1N+=2u(k.21(2T[0],"eH"))||0;9t.1t+=2u(k.21(2T[0],"eI"))||0;B{1N:3I.1N-9t.1N,1t:3I.1t-9t.1t}},2T:y(){B C.3a(y(){G 2T=C.2T||19.1m;2q(2T&&(!eF.1a(2T.1d)&&k.21(2T,"37")==="a6")){2T=2T.2T}B 2T})}});k.1n({4v:"iJ",4w:"iI"},y(3t,1k){G 1N=/Y/.1a(1k);k.fn[3t]=y(1f){B k.4F(C,y(6,3t,1f){G 44=eG(6);if(1f===14){B 44?(1k in 44)?44[1k]:k.1g.6z&&44.19.2t[3t]||44.19.1m[3t]:6[3t]}if(44){44.nc(!1N?1f:k(44).4v(),1N?1f:k(44).4w())}N{6[3t]=1f}},3t,1f,1s.J,T)}});y eG(6){B k.5H(6)?6:6.1c===9?6.3J||6.gp:17}k.1n({nd:"3U",aZ:"2w"},y(H,E){G 9u="ne"+H,bx="gK"+H,eL="3I"+H;k.fn["4r"+H]=y(){G 6=C[0];B 6?6.12?2u(k.21(6,E,"6D")):C[E]():T};k.fn["6B"+H]=y(4s){G 6=C[0];B 6?6.12?2u(k.21(6,E,4s?"4s":"6E")):C[E]():T};k.fn[E]=y(I){B k.4F(C,y(6,E,I){G 1J,by,3L,K;if(k.5H(6)){1J=6.19;by=1J.2t[9u];B k.1g.6z&&by||1J.1m&&1J.1m[9u]||by}if(6.1c===9){1J=6.2t;if(1J[9u]>=1J[bx]){B 1J[9u]}B 53.5J(6.1m[bx],1J[bx],6.1m[eL],1J[eL])}if(I===14){3L=k.21(6,E);K=2u(3L);B k.9F(K)?K:3L}k(6).21(E,I)},E,I,1s.J,T)}});1Q.k=1Q.$=k;if(1b bz==="y"&&bz.iP&&bz.iP.k){bz("7h",[],y(){B k})}})(1Q);',62,1441,'||||||elem||||||||||||||jQuery||||||||||||||function|||return|this||type||var|name|value|length|ret|data|match|else|event|true|selector|context||null|for|div|||||||style||undefined|||false|cur|document|test|typeof|nodeType|nodeName|options|val|support|set|parentNode|key|prop|call|body|each|parts|callback|Sizzle|replace|arguments|left|filter|script|url|jqXHR|expr|args|src|hooks|string|toLowerCase|special|obj|handleObj|Expr|checkSet|doc|target|results|self|top|extend|types|window|push|object|elems|input|display|cache|_data|isFunction|text||css|events|className|html|part|handle|get|array|first|opt|queue|parent|node|exec|fragment|apply|add|list|index|guid|deferred|handler||firstChild|extra|while|dataTypes|createElement|documentElement|parseFloat|state|width|old|isXML|xhr|getElementsByTagName|table|result|try|catch|xml|tmp|new|slice|break|split|dest|speed|find|memory|error|opacity|status|statusText|offsetParent|promise|indexOf|makeArray|complete|tbody|getAttribute|expando|button|namespaces|easing|ownerDocument|remove|done|position|not|prototype|map|flags|checked|hidden|thisCache|props|dir|timers|attr|clone|isArray|dataType|currentStyle|trigger|jQuerySub|form|matches|contains|curLoop|method|responses|show|select|innerHTML|appendChild|option|delete|elements|hide|ready|end|off|now|on|offset|defaultView|original|orig|doneName|wrapMap|pushStack|splice|len|count|href|removeChild|height|eventHandle|handlers|selectors|contents|iframe|qualifier|computedStyle|converters|jsonpCallback|win|Array|trim|childNodes|copy|disabled|td|overflow|nextSibling|internalKey|classNames|quick|seed|check|until|prefix|selection|traditional|start|unit|num|deep|number|inner|margin|getComputedStyle|elemData|scrollLeft|scrollTop|toggle|pop|inplace|response|_|all|readyState|async|access|setAttribute|radio|px|none|offsetTop|relative|removeData|removeAttribute|nodeHook|one|nType|attrHooks|namespace|fix|originalEvent|root|ifModifiedKey|gotoEnd|duration|docElem|DOMContentLoaded|last|attachEvent|Math|pass||stack|shift|checkbox|selected|container|insertBefore|isNode|defer|unshift|valHooks|propName|tns|origType|delegateCount|eventType|_default|matched|ID|filters|prev|wrap|scripts|computed|params|responseText|success|json|callbackContext|headers|finalDataType|current|conv|init|toString|constructor|once|addEventListener|isWindow|camelCase|max|grep|ua|browser|RegExp|tr|pvt|time|values|notxml|getAttributeNode|ontype|Event|preventDefault|nth|POS|nodeCheck|query|append|dataAndEvents|srcElements|cssExpand|curCSS|cssHooks|ajaxLocation|ajaxLocParts|structure|inspected|ajaxSettings|statusCode|responseHeaders|abort|conv1|conv2|animatedProperties|step|box|rootjQuery|cacheable|getElementById|join|sort|continue|setTimeout|Callbacks|inArray|concat|firingIndex|func|newDefer|isSupported|deleteExpando|boxModel|submit|outer|marginDiv|padding|border|zoom|mark|dequeue|next|stop|class|nodeValue|click|setup|global|eventPath|returnFalse|rBackslash|anyFound|u00c0|uFFFF|isPartStr|compareDocumentPosition|querySelectorAll|getElementsByClassName|pos|domManip|deepDataAndEvents|ajax|destElements|application|transport|setRequestHeader|lastModified|etag|crossDomain|head|isAbort|xhrCallbacks|iframeDoc|genFx|instanceof|merge|jquery|fireWith|onreadystatechange|second|fired|firing|firingLength|unique|fire|resolve|fail|returned|firstParam|tds|cloneNode|change|offsetSupport|paddingMarginBorder|block|marginRight|offsetWidth|marginTop|deferDataKey|propFix|isBool|delegateType|teardown|sel|fromElement|clientLeft|clientTop|found|getText|TAG|CLASS|PSEUDO|previousSibling|checkFn|siblingCheck|curData|cacheresults|insert|fireGlobals|isSuccess|jsonp||responseContainer|animate|optall|custom|fxshow|prevComputedStyle|browserMatch|readyList|isPlainObject|boolean|load|isEmptyObject|retVal|proxy|removeEventListener|disable|empty|Deferred|doneList|failList|progressList|resolveWith|eventName|cssFloat|getSetAttribute|inline|acceptData|queueDataKey|markDataKey|force|speeds|timeout|clearQueue|rspace|textarea|removeAttr|setClass|stateVal|selectedIndex|isXMLDoc|propHooks|handleObjIn|exclusive|bubbleType|isTrigger|isDefaultPrevented|focus|handlerQueue|jqcur|selMatch|related|stopPropagation|which|fixHook|simulate|returnTrue|_change|origFn|lastToggle|hasDuplicate|rNonWord|contextXML|sortOrder|matchesSelector|substr|item|diff|nid|keep|param|replaceWith||cleanData|GET|nodes|getAll|origName|rsLeft|dataTypeExpression|inspectPrefiltersOrTransports|contentType|accepts|responseFields|conversion|to|jsre|timerId|fxAttrs|fxNow|olddisplay|parentOffset|clientProp|version|toUpperCase|Object|hasOwn|String|copyIsArray|isReady|readyWait|wait|onload|isNumeric|msg|JSON|ActiveXObject|inv|chainable|firingStart|has|argIndex|sliceDeferred|lists|reject|progress|then|With|1px|float|enctype|nav|outerHTML|createDocumentFragment|lastChild|focusin|conMarginTop|positionTopLeftWidthHeight|paddingMarginBorderVisibility|cssText|static|offsetHeight|fixed|isEmptyDataObject|triggerHandler|run|attrFn|attrNames|property|tabindex|attributeNode|auto|rformElems|mouseenter|mouseleave||triggered|dispatch|bindType||isPropagationStopped|blur|relatedTarget|fixHooks|eventDoc|_submit|chunker|order|leftMatch|textContent|CHILD|even|odd|attrMap|attrHandle|password|case|source|sourceIndex|aup|bup|oldSizzle|sizset|level|safeFrag|rleadingWhitespace|safeFragment|wrapAll|before|clean|safeChildNodes|ralpha|rnumnonpx|cssNumber|runtimeStyle|Width|prefilters|placeBefore|originalOptions|executeOnly|flatOptions|ajaxSetup|settings|javascript|globalEventContext|responseHeadersString|timeoutTimer|getResponseHeader|mimeType|200||hasContent|send|buildParams|firstDataType|xhrOnUnloadAbort|elemdisplay||dataShow|timer|getOffset||offsetLeft||curElem|curOffset|curPosition|curTop|curLeft|scrollProp|docElemProp|define|navigator|location|rnotwhite|trimLeft|trimRight|userAgent|class2type|charAt|buildFragment|toArray|prevObject|bindReady|toplevel|doScrollCheck|isNaN|throw|Error|parseJSON|noop|globalEval|isObj|arg|emptyGet|bulk|Date|sub|xA0|detachEvent|flagsCache|lock|notify|action|pValues|link|leadingWhitespace|html5Clone|noCloneEvent|inlineBlockNeedsLayout|shrinkWrapBlocks|reliableMarginRight|pixelMargin|checkClone|absolute|visible|fixedPosition|noData|embed||hasData|privateCache|getByName|isEvents|attributes|dataAttr|handleQueueMarkDefer||_unmark|inprogress|setter|rclass|rboolean|multiple|open|boolHook|fixSpecified|addClass|removeClass|specified|tabIndex|attrNode|rtypenamespace|hover|rfocusMorph|attrs|hoverHack|origCount|removeEvent|onlyHandlers|namespace_re|isImmediatePropagationStopped|postDispatch|metaKey|timeStamp|charCode|clientX|pageX|focusout|onbeforeunload|isSimulated|_submit_attached|_submit_bubble|_just_changed|_change_attached|attaches|toggler|fnOver|baseHasDuplicate|prune|soFar|origPOS|posProcess|uniqueSort||preFilter|innerText|NAME|ATTR|isTag|isPartStrNotTag|dirCheck|dirNodeCheck|file||nodeIndex|hasParent|relativeHierarchySelector|pseudoWorks|tmpSet|later|prevAll|targets|winnow|isDisconnected|sibling|filtered|createSafeFragment|nodeNames|rxhtmlTag|rtagName|rnoshimcache|rchecked|rscriptType|colgroup|createTextNode|after|cloneCopyEvent|oldData|cloneFixAttributes|fragments|fixDefaultChecked|findInputs|checkScriptType|tag|hasBody|cssProps|swap|uncomputed|getWidthOrHeight|suffix|expand|expanded|rCRLF|rquery|rspacesAjax|rurl|_load|transports|allTypes|addToPrefiltersOrTransports|ajaxExtend|isLocal|ajaxPrefilter|ajaxTransport|completeDeferred|requestHeaders|requestHeadersNames|lname|overrideMimeType|nativeStatusText|active|ts|from|inspectData|previous|ecmascript|createStandardXHR||xhrFields|marginLeft|defaultDisplay|fn2|bool|doAnimation|isElement|hadTimers|stopQueue|createFxNow|update|parsed|startTime||rroot|getWindow|borderTopWidth|borderLeftWidth|curCSSTop|curCSSLeft|offsetProp|_jQuery|quickExpr|rsingleTag|rvalidchars|rvalidescape|rvalidtokens|rvalidbraces|rwebkit|webkit|ropera|rmsie|rmozilla|rdashAlpha|rmsPrefix|fcamelCase|letter|hold|doScroll|parse|Function|Invalid|parseXML|DOMParser|Microsoft|parsererror|getTime|uaMatch|rootjQuerySub|createFlags|argLength|isResolved|doneCallbacks|failCallbacks|progressCallbacks|always|fnDone|fnFail||fnProgress|resolveFunc|progressFunc|htmlSerialize|hrefNormalized|checkOn|optSelected|submitBubbles|changeBubbles||focusinBubbles|noCloneChecked||optDisabled|fireEvent|onclick|radioValue|appendChecked|visibility|5px|cellpadding|cellspacing|reliableHiddenOffsets|parseInt|doesNotAddBorder|doesAddBorderForTableAndCells|subtractsBorderForOverflowNotVisible|doesNotIncludeMarginInBodyOffset|rbrace|rmultiDash|uuid|random|toJSON|setInterval|parsedAttrs|getData|setData|changeData|_mark|clearTimeout|rreturn|rtype|rfocusable|rclickable|readonly|toggleClass|hasClass|__className__|optgroup|htmlFor|frameBorder|contenteditable|rhoverHack|rkeyEvent|rmouseEvent|contextmenu||rquickIs|quickParse|quickIs|mappedTypes|customEvent|noBubble|parentWindow|run_all|delegateTarget|preDispatch||currentTarget|srcElement|ctrlKey|keyHooks|keyCode|mouseHooks|clientY|pageY|toElement|bubble|returnValue|getPreventDefault|mouseover|mouseout|keypress|fnOut|scroll|unload|rReturn|origContext|isXMLFilter|only|getElementsByName|header|image|reset|setFilters|fescape|globalPOS|TEST|oldContext|pseudoError|disconnectedMatch|runtil|rparentsprev|parents|prevUntil|rmultiselector|isSimple|guaranteedUnique|children|closest|contentDocument|contentWindow|rinlinejQuery|area|col|rtbody|rhtml|rnoInnerhtml|rnocache|rcleanScript|fieldset|thead|wrapInner|prepend|keepData|detach|lastIndex||clearAttributes|mergeAttributes|defaultChecked|defaultValue|appendTo|shimCloneNode|depth|jsTags|alpha|ropacity|rupper|rnum|rrelNum|rmargin|cssShow|100|r20|rbracket|rhash|rheaders|rinput|datetime|rlocalProtocol|app|rnoContent|rprotocol|rscript|rselectTextarea|rts|serializeArray|ajaxStart|ajaxStop|ajaxComplete|ajaxSend|www|urlencoded|charset|processData|responseXML|getAllResponseHeaders|ajaxHandleResponses|304|ifModified|Modified|ajaxConvert|http|443||If|||beforeSend|No|encodeURIComponent|dataFilter|jsc|scriptCharset||xhrId|XMLHttpRequest|createActiveXHR|cors||username|Requested|firefoxAccessException|rfxtypes|rfxnum|_toggle|specialEasing|swing|saveState|clearFxNow|noUnmark|tick|interval|rtable|getBoundingClientRect|pageYOffset|pageXOffset|prevOffsetParent|setOffset|bodyOffset|calculatePosition|using|amd|bfnrt|opera|msie|mozilla|rv|hasOwnProperty|size|noConflict|holdReady|frameElement|isFinite|isPrototypeOf|parseFromString|XMLDOM|loadXML|XML|execScript|eval|regexp|compatible|superclass|Boolean|Number|safari|actual|stopOnFalse|locked|pending|isRejected|pipe|resolved|rejected|when|pCount|notifyWith|compatMode|CSS1Compat|Bubbles|solid|000|2px|20px|clsid|D27CDB6E|AE6D|11cf|96B8|444553540000|applet|classid|substring|delay|rea|autofocus|autoplay|controls|loop|required|scoped|removeProp|can|changed|readOnly|maxlength|maxLength|cellSpacing|cellPadding|rowspan|rowSpan|colspan|colSpan|usemap|useMap|frameborder|contentEditable|coords|createAttribute|setAttributeNode|encoding|mouse|focusinfocus|focusoutblur|attrChange|attrName|relatedNode|altKey|bubbles|cancelable|eventPhase|shiftKey|view|char|buttons|offsetX|offsetY|screenX|screenY|beforeunload|defaultPrevented|cancelBubble|stopImmediatePropagation|propertychange|propertyName|beforeactivate|bind|unbind|live|die|delegate|undelegate|resize|dblclick|mousedown|mouseup|mousemove|keydown|keyup|sizcache|Syntax|unrecognized|expression|child|0n|enabled|activeElement|switch|createComment|__sizzle__|qsaError|finally|mozMatchesSelector|webkitMatchesSelector|msMatchesSelector|sizzle|HTML|Until|andSelf|parentsUntil|nextAll|nextUntil|siblings|reverse|abbr|article|aside|audio|bdi|canvas|datalist|details|figcaption|figure|footer|hgroup|meter|output|section|summary|video|img|meta|java|ecma||CDATA|legend|tfoot|caption|th|unwrap|defaultSelected|512|prependTo|insertAfter|replaceAll|Top|Right|Bottom|Left|fillOpacity|fontWeight|lineHeight|orphans|widows|zIndex|styleFloat|getPropertyValue|fontSize|1em|pixelLeft|right|color|date|local|email|month|range|search|tel|week|about|storage|extension|res|widget|HEAD|POST|serialize|ajaxError|ajaxSuccess|post|getScript||getJSON|UTF|plain|300|Last|Etag|notmodified|rejectWith|Success|1_|Content||Type|Since|None|Match|Accept|01|Transport|content|originalSettings|was|called|loaded|XMLHTTP|withCredentials|404|1223|204|marginBottom|paddingTop|paddingBottom|paddingLeft|paddingRight|fadeTo|overflowX|overflowY|slideDown|slideUp|slideToggle|fadeIn|fadeOut|fadeToggle|linear|cos|PI|Infinity|clearInterval|slow|600|fast|400|animated|write|doctype|close|able|scrollTo|Height|client'.split('|'),0,{}));
            
            /* http://code.google.com/p/jquery-json/ */
            eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(7($){6 A=/["\\\\\\U-\\V\\W-\\X]/g,H={\'\\b\':\'\\\\b\',\'\\t\':\'\\\\t\',\'\\n\':\'\\\\n\',\'\\f\':\'\\\\f\',\'\\r\':\'\\\\r\',\'"\':\'\\\\"\',\'\\\\\':\'\\\\\\\\\'};$.h=8 5===\'v\'&&5.I?5.I:7(o){2(o===w){3\'w\'}6 4=8 o;2(4===\'B\'){3 B}2(4===\'J\'||4===\'Y\'){3\'\'+o}2(4===\'e\'){3 $.C(o)}2(4===\'v\'){2(8 o.h===\'7\'){3 $.h(o.h())}2(o.K===11){6 j=o.12()+1,l=o.13(),L=o.14(),m=o.15(),p=o.17(),q=o.18(),9=o.19();2(j<10){j=\'0\'+j}2(l<10){l=\'0\'+l}2(m<10){m=\'0\'+m}2(p<10){p=\'0\'+p}2(q<10){q=\'0\'+q}2(9<1a){9=\'0\'+9}2(9<10){9=\'0\'+9}3\'"\'+L+\'-\'+j+\'-\'+l+\'T\'+m+\':\'+p+\':\'+q+\'.\'+9+\'Z"\'}2(o.K===1b){6 D=[];M(6 i=0;i<o.1c;i++){D.N($.h(o[i])||\'w\')}3\'[\'+D.O(\',\')+\']\'}6 x,E,F=[];M(6 k 1d o){4=8 k;2(4===\'J\'){x=\'"\'+k+\'"\'}G 2(4===\'e\'){x=$.C(k)}G{P}4=8 o[k];2(4===\'7\'||4===\'B\'){P}E=$.h(o[k]);F.N(x+\':\'+E)}3\'{\'+F.O(\',\')+\'}\'}};$.1e=8 5===\'v\'&&5.y?5.y:7(u){3 Q(\'(\'+u+\')\')};$.1f=8 5===\'v\'&&5.y?5.y:7(u){6 R=u.z(/\\\\["\\\\\\/1g]/g,\'@\').z(/"[^"\\\\\\n\\r]*"|1h|1i|w|-?\\d+(?:\\.\\d*)?(?:[1j][+\\-]?\\d+)?/g,\']\').z(/(?:^|:|,)(?:\\s*\\[)+/g,\'\');2(/^[\\],:{}\\s]*$/.1k(R)){3 Q(\'(\'+u+\')\')}G{1l 1m 1n(\'1o 1p 5, 1q 1r 1s 1t.\');}};$.C=7(e){2(e.1u(A)){3\'"\'+e.z(A,7(a){6 c=H[a];2(8 c===\'e\'){3 c}c=a.1v();3\'\\\\1w\'+1x.1y(c/16).S(16)+(c%16).S(16)})+\'"\'}3\'"\'+e+\'"\'}})(1z);',62,98,'||if|return|type|JSON|var|function|typeof|milli|||||string|||toJSON||month||day|hours|||minutes|seconds||||src|object|null|name|parse|replace|escapeable|undefined|quoteString|ret|val|pairs|else|meta|stringify|number|constructor|year|for|push|join|continue|eval|filtered|toString||x00|x1f|x7f|x9f|boolean|||Date|getUTCMonth|getUTCDate|getUTCFullYear|getUTCHours||getUTCMinutes|getUTCSeconds|getUTCMilliseconds|100|Array|length|in|evalJSON|secureEvalJSON|bfnrtu|true|false|eE|test|throw|new|SyntaxError|Error|parsing|source|is|not|valid|match|charCodeAt|u00|Math|floor|jQuery'.split('|'),0,{}));
            
            /* jStorage (http://www.jstorage.info/) */
            eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(6($){2(!$||!($.A||17.A||b.o)){U g 1G("18, 1H 19 1I 1J 1K 1a 1L 1M 8!");}h 3={},c={8:"{}"},9=B,C=0,V=$.A||17.A||(b.o&&(o.W||o.1N)),X=$.1b||(b.o&&(o.Y||o.1O))||6(1c){5 D(1c).1b()},p=f,Z,E={G:6(H){h I=(H?H.1P||H:0).I;5 I?I.1Q!=="1R":f},W:6(J){2(!10.G(J)){5 f}l{5 g 1S().1T(J)}m(1U){l{5 J.K}m(1V){}}5 f},Y:6(1d){h 11=("L"j b&&(g L()).1W)||(b.1e&&6(1f){h M=g 1e(\'1X.1Y\');M.1Z=\'f\';M.20(1f);5 M}),N;2(!11){5 f}N=11.21("L"j b&&(g L())||b,1d,\'22/K\');5 10.G(N)?N:f}};6 1g(){h 12=f;2("s"j b){l{b.s.23(\'1h\',\'24\');12=q;b.s.25(\'1h\')}m(26){}}2(12){l{2(b.s){c=b.s;p="s"}}m(27){}}k 2("O"j b){l{2(b.O){c=b.O[b.28.29];p="O"}}m(2a){}}k{9=P.1i(\'1j\');2(9.1k){9.1l.1m=\'1n(#1o#1p)\';P.1q(\'1r\')[0].1s(9);9.1t("8");h r="{}";l{r=9.1u("8")}m(1v){}c.8=r;p="1w"}k{9=B;5}}13();Q()}6 13(){2(c.8){l{3=X(D(c.8))}m(2b){c.8="{}"}}k{c.8="{}"}C=c.8?D(c.8).1x:0}6 t(){l{c.8=V(3);2(9){9.2c("8",c.8);9.2d("8")}C=c.8?D(c.8).1x:0}m(2e){}}6 v(4){2(!4||(n 4!="1y"&&n 4!="2f")){U g 1z(\'2g 1A 2h 1a 1y 19 2i\');}2(4=="d"){U g 1z(\'2j 4 1A\');}5 q}6 Q(){h u,i,a,w=1B,14=f;2k(Z);2(!3.d||n 3.d.a!="R"){5}u=+g 1C();a=3.d.a;1D(i j a){2(a.1E(i)){2(a[i]<=u){x a[i];x 3[i];14=q}k 2(a[i]<w){w=a[i]}}}2(w!=1B){Z=2l(Q,w-u)}2(14){t()}}$.8={2m:"0.1.7.0",2n:6(4,e,y){v(4);y=y||{};2(E.G(e)){e={15:q,K:E.W(e)}}k 2(n e=="6"){e=B}k 2(e&&n e=="R"){e=X(V(e))}3[4]=e;2(!2o(y.a)){10.1F(4,y.a)}k{t()}5 e},2p:6(4,16){v(4);2(4 j 3){2(3[4]&&n 3[4]=="R"&&3[4].15&&3[4].15){5 E.Y(3[4].K)}k{5 3[4]}}5 n(16)==\'2q\'?B:16},2r:6(4){v(4);2(4 j 3){x 3[4];2(3.d&&n 3.d.a=="R"&&4 j 3.d.a){x 3.d.a[4]}t();5 q}5 f},1F:6(4,z){h u=+g 1C();v(4);z=2s(z)||0;2(4 j 3){2(!3.d){3.d={}}2(!3.d.a){3.d.a={}}2(z>0){3.d.a[4]=u+z}k{x 3.d.a[4]}t();Q();5 q}5 f},2t:6(){3={};t();5 q},2u:6(){6 F(){}F.2v=3;5 g F()},S:6(){h S=[],i;1D(i j 3){2(3.1E(i)&&i!="d"){S.2w(i)}}5 S},2x:6(){5 C},2y:6(){5 p},2z:6(){5!!p},2A:6(){h T,r;2(9&&9.1k){T=P.1i(\'1j\');9.2B.2C(T,9);9=T;9.1l.1m=\'1n(#1o#1p)\';P.1q(\'1r\')[0].1s(9);9.1t("8");r="{}";l{r=9.1u("8")}m(1v){}c.8=r;p="1w"}13()}};1g()})(b.$||b.18);',62,163,'||if|_storage|key|return|function||jStorage|_storage_elm|TTL|window|_storage_service|__jstorage_meta|value|false|new|var||in|else|try|catch|typeof|JSON|_backend|true|data|localStorage|_save|curtime|_checkKey|nextExpire|delete|options|ttl|toJSON|null|_storage_size|String|_XMLService||isXML|elm|documentElement|xmlNode|xml|DOMParser|xml_doc|resultXML|globalStorage|document|_handleTTL|object|index|new_storage_elm|throw|json_encode|encode|json_decode|decode|_ttl_timeout|this|dom_parser|localStorageReallyWorks|_load_storage|changed|_is_xml|def|Object|jQuery|or|be|evalJSON|str|xmlString|ActiveXObject|_xmlString|_init|_tmptest|createElement|link|addBehavior|style|behavior|url|default|userData|getElementsByTagName|head|appendChild|load|getAttribute|E5|userDataBehavior|length|string|TypeError|name|Infinity|Date|for|hasOwnProperty|setTTL|Error|MooTools|Prototype|needs|to|loaded|before|stringify|parse|ownerDocument|nodeName|HTML|XMLSerializer|serializeToString|E1|E2|parseFromString|Microsoft|XMLDOM|async|loadXML|call|text|setItem|tmpval|removeItem|BogusQuotaExceededErrorOnIos5|E3|location|hostname|E4|E6|setAttribute|save|E7|number|Key|must|numeric|Reserved|clearTimeout|setTimeout|version|set|isNaN|get|undefined|deleteKey|Number|flush|storageObj|prototype|push|storageSize|currentBackend|storageAvailable|reInit|parentNode|replaceChild'.split('|'),0,{}));

            /* http://stackoverflow.com/questions/246801/how-can-you-encode-to-base64-using-javascript */
            eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 F={f:"P+/=",Q:z(5){7 8="";7 s,k,l,v,t,h,j;7 i=0;5=F.I(5);G(i<5.B){s=5.m(i++);k=5.m(i++);l=5.m(i++);v=s>>2;t=((s&3)<<4)|(k>>4);h=((k&H)<<2)|(l>>6);j=l&u;o(J(k)){h=j=C}w o(J(l)){j=C}8=8+p.f.q(v)+p.f.q(t)+p.f.q(h)+p.f.q(j)}D 8},R:z(5){7 8="";7 s,k,l;7 v,t,h,j;7 i=0;5=5.K(/[^A-S-T-9\\+\\/\\=]/g,"");G(i<5.B){v=p.f.E(5.q(i++));t=p.f.E(5.q(i++));h=p.f.E(5.q(i++));j=p.f.E(5.q(i++));s=(v<<2)|(t>>4);k=((t&H)<<4)|(h>>2);l=((h&3)<<6)|j;8=8+b.d(s);o(h!=C){8=8+b.d(k)}o(j!=C){8=8+b.d(l)}}8=F.L(8);D 8},I:z(e){e=e.K(/\\r\\n/g,"\\n");7 a="";U(7 n=0;n<e.B;n++){7 c=e.m(n);o(c<x){a+=b.d(c)}w o((c>V)&&(c<W)){a+=b.d((c>>6)|X);a+=b.d((c&u)|x)}w{a+=b.d((c>>M)|N);a+=b.d(((c>>6)&u)|x);a+=b.d((c&u)|x)}}D a},L:z(a){7 e="";7 i=0;7 c=Y=y=0;G(i<a.B){c=a.m(i);o(c<x){e+=b.d(c);i++}w o((c>Z)&&(c<N)){y=a.m(i+1);e+=b.d(((c&10)<<6)|(y&u));i+=2}w{y=a.m(i+1);O=a.m(i+2);e+=b.d(((c&H)<<M)|((y&u)<<6)|(O&u));i+=3}}D e}}',62,63,'|||||input||var|output||utftext|String||fromCharCode|string|_keyStr||enc3||enc4|chr2|chr3|charCodeAt||if|this|charAt||chr1|enc2|63|enc1|else|128|c2|function||length|64|return|indexOf|Base64|while|15|_utf8_encode|isNaN|replace|_utf8_decode|12|224|c3|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|encode|decode|Za|z0|for|127|2048|192|c1|191|31'.split('|'),0,{}));

            
            var version = "2.2.2";
            
            function g3_formatNumber(number)
            {
                var scalings = ['', 'k', 'M', 'G', 'T'];
                var scaling = 0;

                while (number > 1000)
                {
                    scaling++;
                    number /= 1000;
                }

                return (Math.round(number * 10) / 10) + " " + scalings[scaling];
            }

            function g3_createArray(length)
            {
                var a = new Array(length || 0);

                if (arguments.length > 1)
                {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var i = 0;

                    for (i = 0; i < length; i++)
                    {
                        a[i] = g3_createArray.apply(this, args);
                    }
                }

                return a;
            }

            function g3_getVar(name)
            {
                return $.jStorage.get(name);
            }

            function g3_setVar(name, val)
            {
                return $.jStorage.set(name, val);
            }

            function g3_baseScanCreate()
            {
                console.log("g3_baseScan Loaded");
                /* first time setup */
                if (!g3_getVar("loadCount"))
                {
                    g3_setVar("loadCount", 0);
                    g3_setVar("resMap", {});
                    g3_setVar("resDistrib", g3_createArray(9, 8, 1));
                }

                g3_setVar("loadCount", (g3_getVar("loadCount") + 1));
                if ($.jStorage.storageAvailable())
                {
                    console.log("g3_baseScan: Storage used: " + g3_formatNumber($.jStorage.storageSize()) + "B");
                    console.log("g3_baseScan: Started " + g3_getVar("loadCount") + " times");
                }
                else
                {
                    console.log("g3_baseScan: No storage available");
                }

                var g3_fileManager = ClientLib.File.FileManager.GetInstance();
                var g3_imgEmpty = g3_fileManager.GetPhysicalPath("ui/menues/main_menu/misc_empty_pixel.png");
                var g3_imgTiberium = g3_fileManager.GetPhysicalPath("ui/common/icn_res_tiberium.png");
                var g3_imgCrystal = g3_fileManager.GetPhysicalPath("ui/common/icn_res_chrystal.png");
                var g3_imgCredits = g3_fileManager.GetPhysicalPath("ui/common/icn_res_dollar.png");
                var g3_imgResearch = g3_fileManager.GetPhysicalPath("ui/common/icn_res_research.png");

                var g3_imgItem = g3_fileManager.GetPhysicalPath("ui/icons/icon_item.png");

                var g3_mode_NORMAL = 0;
                var g3_mode_RESMAP = 1;
                var g3_mode_RESMAP_CACHE = 2;

                var g3_tableData_POS = 0;
                var g3_tableData_NAME = 1;
                var g3_tableData_LEVEL = 2;
                var g3_tableData_TIBERIUM = 3;
                var g3_tableData_CRYSTAL = 4;
                var g3_tableData_CREDITS = 5;
                var g3_tableData_RESEARCH = 6;
                var g3_tableData_ATTACKED = 7;
                var g3_tableData_DISTANCE = 8;
                var g3_tableData_ATTRACTIVITY = 9;
                var g3_tableData_RES_MAP = 10;
                var g3_tableData_CITY_ID = 11;

                var g3_encoded_FREE = 0;
                var g3_encoded_TIBERIUM = 1;
                var g3_encoded_CRYSTAL = 2;

                var g3_baseScan = {
                    rowData: [],
                    rowDataPos: 0,
                    rowDataHovered: 0,
                    rowDataPosUpdate: 0,
                    rowDataPosUpdateRetries: 0,
                    popup: null,
                    popupLabel: null,
                    table: null,
                    window: null,
                    scrollpane: null,
                    composite: null,
                    cancel: false,
                    scanInProgress: false,
                    tableModel: null,
                    maxTries: 40,
                    mode: g3_mode_NORMAL,
                    
                    maxPacketSize: 3072,                        
                    sendRemain: null,                        
                    sendLength: 0,
                    sendPart: 0,
                    
                    m_BuildingsSymbol: null,
                    m_DefenseUnitsSymbol: null,
                    m_UnitLevelRequirementsSymbol: null,
                    
                    reportError: function (ex)
                    {
                        var content = g3_baseScan.newPacket();
                        content.exception = "" + ex;
                        g3_baseScan.dataRequest(content);
                        
                        console.log("exception: ", content.exception);
                    },
                    
                    detectObfuscated: function(city)
                    {
                        /* find m_Buildings */
                        var buildingsData = city.get_CityBuildingsData();
                        var unitsData = city.get_CityUnitsData();

                        if(!g3_baseScan.m_BuildingsSymbol)
                        {
                            for (i in buildingsData) 
                            { 
                                if (buildingsData[i] && (buildingsData[i].l) && (buildingsData[i].l[0]) && (buildingsData[i].l[0].get_Health)) 
                                {
                                    g3_baseScan.m_BuildingsSymbol = i;
                                }
                            }
                        }
                        
                        if(!g3_baseScan.m_DefenseUnitsSymbol)
                        {
                            for (i in unitsData) 
                            { 
                                if (unitsData[i] && (unitsData[i].l) && (unitsData[i].l[0]) && (unitsData[i].l[0].get_Health)) 
                                {
                                    g3_baseScan.m_DefenseUnitsSymbol = i;
                                }
                            }
                        }

                        if(!g3_baseScan.m_UnitLevelRequirementsSymbol)
                        {
                            if(g3_baseScan.m_BuildingsSymbol || g3_baseScan.m_DefenseUnitsSymbol)
                            {
                                /* find m_UnitLevelRequirements */
                                var reqSrc = null;
                                
                                if(g3_baseScan.m_BuildingsSymbol)
                                {
                                    reqSrc = buildingsData[g3_baseScan.m_BuildingsSymbol].l[0];
                                }
                                if(!reqSrc && g3_baseScan.m_DefenseUnitsSymbol)
                                {
                                    reqSrc = unitsData[g3_baseScan.m_DefenseUnitsSymbol].l[0];
                                }
                                if(reqSrc)
                                {
                                    for (i in reqSrc) 
                                    { 
                                        if (reqSrc[i] && (reqSrc[i].rer)) 
                                        {
                                            g3_baseScan.m_UnitLevelRequirementsSymbol = i;
                                        }
                                    }
                                }
                            }
                        }                        

                        if(!g3_baseScan.m_BuildingsSymbol)
                        {
                            console.log("Could not locate m_BuildingsSymbol");
                            return false;
                        }
                        if(!g3_baseScan.m_DefenseUnitsSymbol)
                        {
                            console.log("Could not locate m_DefenseUnitsSymbol");
                            return false;
                        }
                        if(!g3_baseScan.m_UnitLevelRequirementsSymbol)
                        {
                            console.log("Could not locate m_UnitLevelRequirementsSymbol");
                            return false;
                        }
                        
                        return true;
                    },
                    
                    updateToolTip: function ()
                    {
                        var tooltip = "Scan menu<br>";

                        try
                        {
                            if ($.jStorage.storageAvailable())
                            {
                                tooltip += "Storage used: " + g3_formatNumber($.jStorage.storageSize()) + "B";
                            }
                            else
                            {
                                tooltip += "No permanent storage available. Cache will not work.";
                            }
                        }
                        catch (ex)
                        {
                            tooltip += "jStorage error";
                        }

                        g3_baseScan.menuButton.setToolTipText(tooltip);
                    },

                    createArray: function (length)
                    {
                        var a = new Array(length || 0);

                        if (arguments.length > 1)
                        {
                            var args = Array.prototype.slice.call(arguments, 1);
                            var i = 0;

                            for (i = 0; i < length; i++)
                            {
                                a[i] = g3_baseScan.createArray.apply(this, args);
                            }
                        }

                        return a;
                    },

                    newPacket: function ()
                    {
                        var inst = ClientLib.Data.MainData.GetInstance();
                        return {
                            v: version,
                            id: inst.get_Player().get_AccountId(),
                            name: inst.get_Player().get_Name(),
                            alliance: inst.get_Alliance().get_Name(),
                            server: inst.get_Server().get_Name(),
                            update: (g3_baseScan.checkTimeout / 1000)
                        };
                    },

                    /* database requests code */
                    dataRequest: function (param)
                    {
                        try
                        {
                            if (window.g3_data)
                            {
                                return;
                            }

                            var encodedData = Base64.encode($.toJSON(param));

                            /* is a multipart transfer in progress? */
                            if (g3_baseScan.sendRemain != null || encodedData.length > g3_baseScan.maxPacketSize)
                            {
                                /* first call */
                                if (g3_baseScan.sendRemain == null)
                                {
                                    g3_baseScan.sendRemain = encodedData;
                                    g3_baseScan.sendLength = encodedData.length;
                                    g3_baseScan.sendPart = 0;
                                }

                                g3_baseScan.sendPart++;

                                var content = g3_baseScan.newPacket();
                                content.multipart = true;
                                content.part = g3_baseScan.sendPart;
                                content.parts = Math.floor((g3_baseScan.sendLength / g3_baseScan.maxPacketSize) + 1);
                                content.length = g3_baseScan.sendLength;

                                if (g3_baseScan.sendRemain.length > 0)
                                {
                                    var current = g3_baseScan.sendRemain.slice(0, g3_baseScan.maxPacketSize);
                                    g3_baseScan.sendRemain = g3_baseScan.sendRemain.slice(g3_baseScan.maxPacketSize);

                                    content.data = current;

                                    window.g3_data = {
                                        data: Base64.encode($.toJSON(content)),
                                        cb: g3_baseScan.dataRequest
                                    };
                                }
                                else
                                {
                                    /* last packet is empty */
                                    g3_baseScan.sendRemain = null;
                                    g3_baseScan.sendPart = 0;

                                    content.data = "";
                                    
                                    window.g3_data = {
                                        data: Base64.encode($.toJSON(content)),
                                        cb: g3_baseScan.parseAnswer
                                    };
                                }
                            }
                            else
                            {
                                window.g3_data = {
                                    data: encodedData,
                                    cb: g3_baseScan.parseAnswer
                                };
                            }
                        }
                        catch (ex)
                        {
                            console.log("ex:", ex);
                        }
                    },

                    /* parse JSON and check return obj */
                    parseAnswer: function (str)
                    {
                        try
                        {
                            var object = null;

                            eval("object = " + str + ";");
                            if (object.available)
                            {
                                g3_baseScan.btnUpload.setLabel("Sync DB");
                                g3_baseScan.btnUpload.setEnabled(true);
                            }
                            else
                            {   
                                g3_baseScan.btnUpload.setLabel("Sync DB (server n/a)");
                                g3_baseScan.btnUpload.setEnabled(false);
                            }
                            
                            if(object.serverNote)
                            {
                                g3_baseScan.btnUpload.setLabel("Sync DB (" + object.serverNote + ")");
                            }
                            
                            if(object.requestUpload)
                            {
                                window.setTimeout(function(){g3_baseScan.uploadDatabase();}, 500);
                            }
                            
                            /* did server deliver a new layout map? */
                            if(object.resmap)
                            {
                                var localMap = g3_getVar("resMap");
                                
                                console.log("Got new resmap", object.resmap);
                                
                                for (coord in object.resmap)
                                {
                                    var matchFound = false;
                                    var newLayouts = object.resmap[coord];
                                    var localLayouts = localMap[coord];
                                    
                                    if(localLayouts == null)
                                    {
                                        localMap[coord] = newLayouts;
                                    }
                                    else
                                    {
                                        var newLayoutPos = 0;

                                        /* check if this distribution was already stored for coordinate */
                                        for (newLayoutPos = 0; newLayoutPos < newLayouts.length; newLayoutPos++)
                                        {
                                            var localLayoutPos = 0;
                                            
                                            for (localLayoutPos = 0; localLayoutPos < localLayouts.length; localLayoutPos++)
                                            {
                                                var match = true;
                                                var pos = 0;

                                                for (pos = 0; pos < 5; pos++)
                                                {
                                                    if (localLayouts[localLayoutPos][pos] != newLayouts[newLayoutPos][pos])
                                                    {
                                                        match = false;
                                                    }
                                                }

                                                /* yes, already had this layout */
                                                if (match)
                                                {
                                                    matchFound = true;
                                                    break;
                                                }
                                            }
                                            
                                            /* not stored yet, add */
                                            if(!matchFound)
                                            {
                                                localLayouts[localLayouts.length] = newLayouts[newLayoutPos];
                                            }
                                        }
                                    }
                                    localMap[coord] = localLayouts;
                                }
                                
                                if(!object.dryRunUpdate)
                                {
                                    g3_setVar("resMap", localMap);
                                }
                                else
                                {
                                    console.log("dry run: ", localMap);
                                }
                            }
                        }
                        catch (ex)
                        {
                            g3_baseScan.reportError(ex);
                        }
                    },

                    checkDatabase: function ()
                    {
                        try
                        {
                            g3_baseScan.dataRequest(g3_baseScan.newPacket());
                        }
                        catch (ex)
                        { }
                        g3_baseScan.checkTimeoutId = window.setTimeout(g3_baseScan.checkDatabase, g3_baseScan.checkTimeout);
                    },


                    updateList: function ()
                    {
                        try
                        {
                            var tooltip = "";

                            /* if in cache mode, display all fields at once */
                            if (g3_baseScan.mode == g3_mode_RESMAP_CACHE)
                            {
                                var resMap = g3_getVar("resMap");
                                var key = null;
                                var posX = 0;
                                var posY = 0;

                                for (key in resMap)
                                {
                                    var risky = false;
                                    var pos = 0;

                                    /* warn if there are more layouts stored for that position */
                                    if (resMap[key].length > 1)
                                    {
                                        risky = true;
                                        console.log("Base at " + key + " has more than one layout. this is bad :(");
                                    }

                                    for (pos = 0; pos < resMap[key].length; pos++)
                                    {
                                        var tableData = g3_baseScan.decodeLayout(resMap[key][pos]);
                                        tooltip = "Base spawn at " + key + ", this layout was seen in " + resMap[key][pos]["seenCount"] + " different bases.";
                                        
                                        if(resMap[key][pos]['source'])
                                        {
                                            var source = resMap[key][pos];
                                            tooltip = tooltip + " (shared by '" + source['user'] + "')";
                                        }
                                        posX = parseInt(key.split(':')[0]);
                                        posY = parseInt(key.split(':')[1]);

                                        var label = g3_baseScan.getResMapLabel(tableData, true);
                                        label.posX = posX;
                                        label.posY = posY;

                                        /* set color and warn about that position */
                                        if (risky)
                                        {
                                            label.setBackgroundColor("#503030");
                                            tooltip += " Warning! Base was seen with more than just one resource layout";
                                        }

                                        label.set(
                                        {
                                            toolTipText: tooltip
                                        });

                                        label.addListener("click", function (e)
                                        {
                                            try
                                            {
                                                ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(this.posX, this.posY);
                                            }
                                            catch (ex)
                                            {
                                                console.log("g3_baseScan: labelClickCallback error: ", ex);
                                            }
                                        });

                                        g3_baseScan.composite.add(label);
                                    }
                                }
                                g3_baseScan.window.setCaption("Showing whole map cache (finished)");
                                g3_baseScan.cancel = false;
                                g3_baseScan.scanInProgress = false;
                            }
                            else
                            {
                                var retry = false;
                                var loops = 0;
                                var maxLoops = 15;

                                while (!retry)
                                {
                                    if (g3_baseScan.cancel)
                                    {
                                        g3_baseScan.window.setCaption("Scan results (cancelled)");
                                        g3_baseScan.cancel = false;
                                        g3_baseScan.scanInProgress = false;
                                        return;
                                    }

                                    var dataLine = null;

                                    /* start from top and find the first entry that has to be filled
                                   do this as atomic as possible in case the list gets sorted from gui (table does this?)
                                 */
                                    g3_baseScan.rowDataPosUpdate = -1;
                                    do {
                                        g3_baseScan.rowDataPosUpdate++;
                                        dataLine = g3_baseScan.rowData[g3_baseScan.rowDataPosUpdate];
                                    } while (dataLine && dataLine[g3_tableData_NAME]);

                                    if (dataLine)
                                    {
                                        var posData = dataLine[g3_tableData_POS];
                                        var city = null;

                                        /* make sure coordinates are well-formed enough */
                                        if (posData != null && posData.split(':').length == 2)
                                        {
                                            posX = parseInt(posData.split(':')[0]);
                                            posY = parseInt(posData.split(':')[1]);

                                            /* check if there is any base */
                                            var obj = ClientLib.Data.MainData.GetInstance().get_World().GetObjectFromPosition(posX, posY);

                                            if (obj && obj.Id)
                                            {
                                                var id = obj.Id;

                                                dataLine[g3_tableData_LEVEL] = obj.Level;
                                                dataLine[g3_tableData_CITY_ID] = obj.Id;

                                                /* if destroyed meanwhile, show that it is a ruin */
                                                if (obj.CampType == ClientLib.Data.Reports.ENPCCampType.Destroyed)
                                                {
                                                    dataLine[g3_tableData_NAME] = "(Ruin)";
                                                    dataLine[g3_tableData_TIBERIUM] = 0;
                                                    dataLine[g3_tableData_CRYSTAL] = 0;
                                                    dataLine[g3_tableData_CREDITS] = 0;
                                                    dataLine[g3_tableData_RESEARCH] = 0;
                                                    dataLine[g3_tableData_ATTACKED] = true;
                                                }
                                                else
                                                {
                                                    city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(id);

                                                    /* something was not cached? */
                                                    if (!city || !city.get_Name() || !g3_baseScan.getResources(city) || !g3_baseScan.getLayout(city))
                                                    {
                                                        /* in resmap mode, only dispay cached items */
                                                        if (g3_baseScan.mode == g3_mode_RESMAP)
                                                        {
                                                            dataLine[g3_tableData_NAME] = "(skipped)";
                                                            dataLine[g3_tableData_TIBERIUM] = 0;
                                                            dataLine[g3_tableData_CRYSTAL] = 0;
                                                            dataLine[g3_tableData_CREDITS] = 0;
                                                            dataLine[g3_tableData_RESEARCH] = 0;
                                                            dataLine[g3_tableData_ATTACKED] = true;
                                                        }
                                                        else
                                                        {
                                                            var maxTries = g3_baseScan.maxTries;

                                                            /* only timeout normally if the selected city wasn't the one we wanted it to be (e.g. user hovered some other city during scan) */
                                                            if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId() != id)
                                                            {
                                                                /* else we give 5x the chance */
                                                                maxTries *= 5;
                                                            }

                                                            if (g3_baseScan.rowDataPosUpdateRetries < maxTries)
                                                            {
                                                                var mainData = ClientLib.Data.MainData.GetInstance();
                                                                var comm = ClientLib.Net.CommunicationManager.GetInstance();

                                                                /* force updating */
                                                                mainData.get_Cities().set_CurrentCityId(0);
                                                                mainData.get_Cities().set_CurrentCityId(id);
                                                                /* fake activity */
                                                                comm.UserAction();
                                                                /* this is mean :) it causes increased traffic. so only enabled for devloper */
                                                                if (mainData.get_Player().get_Name() == "g3gg0")
                                                                {
                                                                    //comm.RequestUpdate$0();
                                                                }

                                                                /* do not loop, get next from server */
                                                                retry = true;
                                                            }
                                                            else
                                                            {
                                                                dataLine[g3_tableData_NAME] = "(failed, of of attack range?)";
                                                                dataLine[g3_tableData_TIBERIUM] = 0;
                                                                dataLine[g3_tableData_CRYSTAL] = 0;
                                                                dataLine[g3_tableData_CREDITS] = 0;
                                                                dataLine[g3_tableData_RESEARCH] = 0;
                                                                dataLine[g3_tableData_ATTACKED] = true;
                                                                console.log("g3_baseScan: City at " + posX + ":" + posY + " failed to retrieve, next one...");
                                                            }
                                                        }
                                                    }
                                                    else
                                                    {
                                                        /* success, get details and update list */
                                                        var resources = g3_baseScan.getResources(city);

                                                        dataLine[g3_tableData_NAME] = city.get_Name().toLocaleString();
                                                        dataLine[g3_tableData_LEVEL] = city.get_BaseLevel();
                                                        if (resources)
                                                        {
                                                            dataLine[g3_tableData_TIBERIUM] = Math.round(resources[1]);
                                                            dataLine[g3_tableData_CRYSTAL] = Math.round(resources[2]);
                                                            dataLine[g3_tableData_CREDITS] = Math.round(resources[3]);
                                                            dataLine[g3_tableData_RESEARCH] = Math.round(resources[6]);
                                                            dataLine[g3_tableData_ATTRACTIVITY] = (resources[1] + resources[2] + resources[3] + resources[6]) / 1000000;
                                                            dataLine[g3_tableData_ATTACKED] = resources[8];
                                                        }
                                                        dataLine[g3_tableData_RES_MAP] = g3_baseScan.getLayout(city);

                                                        if (g3_baseScan.mode == g3_mode_RESMAP)
                                                        {
                                                            var skipLayout = false;
                                                            tooltip = dataLine[g3_tableData_NAME] + " (" + dataLine[g3_tableData_LEVEL] + ") at " + posX + ":" + posY;
                                                            label = g3_baseScan.getResMapLabel(dataLine[g3_tableData_RES_MAP], true);
                                                            label.cityId = dataLine[g3_tableData_CITY_ID];
                                                            label.posX = posX;
                                                            label.posY = posY;


                                                            /* color background in red/green if its a enemy/allied */
                                                            if (!city.IsNPC())
                                                            {
                                                                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();

                                                                /* green if we are in alliance and its a member or its our base */
                                                                if ((alliance && city.get_OwnerAllianceId() == alliance.get_Id()) || !city.get_OwnerAllianceId())
                                                                {
                                                                    skipLayout = true;
                                                                    label.setBackgroundColor("#005000");
                                                                    tooltip += " (Alliance)";
                                                                }
                                                                else
                                                                {
                                                                    label.setBackgroundColor("#500000");
                                                                    tooltip += " (Enemy)";
                                                                }
                                                            }
                                                            else
                                                            {
                                                                tooltip += " (NPC)";
                                                            }

                                                            if (!skipLayout)
                                                            {
                                                                label.set(
                                                                {
                                                                    toolTipText: tooltip
                                                                });
                                                                label.addListener("click", function (e)
                                                                {
                                                                    try
                                                                    {
                                                                        ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(this.posX, this.posY);
                                                                        ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(this.cityId);
                                                                    }
                                                                    catch (ex)
                                                                    {
                                                                        console.log("g3_baseScan: labelClickCallback error: ", ex);
                                                                    }
                                                                });

                                                                g3_baseScan.composite.add(label);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                dataLine[g3_tableData_NAME] = "(disappeared?)";
                                                dataLine[g3_tableData_TIBERIUM] = 0;
                                                dataLine[g3_tableData_CRYSTAL] = 0;
                                                dataLine[g3_tableData_CREDITS] = 0;
                                                dataLine[g3_tableData_RESEARCH] = 0;
                                                dataLine[g3_tableData_ATTRACTIVITY] = 0;
                                                dataLine[g3_tableData_ATTACKED] = true;
                                                console.log("g3_baseScan: Object at " + posX + ":" + posY + " failed to retrieve, although its listed...");
                                            }
                                        }
                                        else
                                        {
                                            dataLine[g3_tableData_NAME] = "(internal error)";
                                            dataLine[g3_tableData_TIBERIUM] = 0;
                                            dataLine[g3_tableData_CRYSTAL] = 0;
                                            dataLine[g3_tableData_CREDITS] = 0;
                                            dataLine[g3_tableData_RESEARCH] = 0;
                                            dataLine[g3_tableData_ATTRACTIVITY] = 0;
                                            dataLine[g3_tableData_ATTACKED] = true;
                                            console.log("g3_baseScan: Object at list pos " + g3_baseScan.rowDataPosUpdate + " failed to get position...");
                                        }

                                        /* if we should re-run this loop */
                                        if (!retry)
                                        {
                                            /* go for next one */
                                            g3_baseScan.rowDataPosUpdateRetries = 0;

                                            if (g3_baseScan.mode == g3_mode_NORMAL)
                                            {
                                                /* to make sure the table gets updated, set data again */
                                                g3_baseScan.tableModel.setData(g3_baseScan.rowData);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        g3_baseScan.cancel = false;
                                        g3_baseScan.scanInProgress = false;
                                        g3_baseScan.rowDataPosUpdateRetries = 0;

                                        if (g3_baseScan.mode == g3_mode_RESMAP)
                                        {
                                            g3_baseScan.window.setCaption("Scan results - ONLY DISPLAYING CACHED ITEMS from previous scan");
                                        }
                                        else
                                        {
                                            g3_baseScan.window.setCaption("Scan results (finished)");
                                        }
                                        return;
                                    }

                                    /* don't block too long, this will cause lag */
                                    if ((g3_baseScan.mode != g3_mode_RESMAP) && (++loops >= maxLoops))
                                    {
                                        retry = true;
                                    }
                                }
                                window.setTimeout(g3_baseScan.updateList, 100);
                            }
                        }
                        catch (ex)
                        {
                            console.log("g3_baseScan: updateList error: ", ex);
                            return;
                        }
                    },

                    encodeLayout: function (charLayout)
                    {
                        var encoded = {};
                        var pos = 0;
                        var x = 0;
                        var y = 0;

                        for (pos = 0; (pos < 5); pos++)
                        {
                            encoded[pos] = 0;
                        }

                        for (y = 0; (y < 8); y++)
                        {
                            for (x = 0; (x < 9); x++)
                            {
                                var encodedLine = x >> 1;
                                var encodedBitPos = (y << 1) + ((x & 1) * 16);
                                var bitVal = g3_encoded_FREE;

                                if (charLayout[x][y] == "C")
                                {
                                    bitVal = g3_encoded_CRYSTAL;
                                }
                                if (charLayout[x][y] == "T")
                                {
                                    bitVal = g3_encoded_TIBERIUM;
                                }
                                encoded[encodedLine] |= (bitVal << encodedBitPos);
                            }
                        }

                        return encoded;
                    },

                    decodeLayout: function (encodedLayout)
                    {
                        var decoded = [];
                        var pos = 0;
                        var x = 0;
                        var y = 0;

                        for (pos = 0; (pos < 9); pos++)
                        {
                            decoded[pos] = [];
                        }

                        for (y = 0; (y < 8); y++)
                        {
                            for (x = 0; (x < 9); x++)
                            {
                                var encodedLine = x >> 1;
                                var encodedBitPos = (y << 1) + ((x & 1) * 16);
                                var bitVal = (encodedLayout[encodedLine] >> encodedBitPos) & 3;
                                var charVal = " ";

                                if (bitVal == g3_encoded_TIBERIUM)
                                {
                                    charVal = "T";
                                }
                                if (bitVal == g3_encoded_CRYSTAL)
                                {
                                    charVal = "C";
                                }
                                decoded[x][y] = charVal;
                            }
                        }

                        return decoded;
                    },

                    getLayout: function (city)
                    {
                        try
                        {
                            var dist = g3_getVar("resDistrib");
                            var map = g3_getVar("resMap");
                            tableData = g3_baseScan.createArray(9, 8);

                            /* find m_ResourceLayout */
                            m_ResourceLayoutSymbol = null;
                            for (i in city) 
                            { 
                                if (city[i] && (city[i].length == 16)) 
                                {
                                    m_ResourceLayoutSymbol = i;
                                }
                            }
                            if(!m_ResourceLayoutSymbol)
                            {
                                console.log("Could not locate m_ResourceLayout");
                                return;
                            }

                            if (city[m_ResourceLayoutSymbol] != null) // m_ResourceLayout
                            {
                                var x = 0;
                                var y = 0;

                                for (y = 0; (y < 8); y++)
                                {
                                    for (x = 0; (x < 9); x++)
                                    {
                                        var type = ' ';
                                        var terrainType = ((city[m_ResourceLayoutSymbol][y] >> ((3 * x) & 0x1f)) & ClientLib.Data.ECityTerrainType.WATER);

                                        if (!dist[x][y][0])
                                        {
                                            dist[x][y][0] = 0;
                                        }
                                        if (!dist[x][y][1])
                                        {
                                            dist[x][y][1] = 0;
                                        }

                                        switch (terrainType)
                                        {
                                        case ClientLib.Data.ECityTerrainType.NONE:
                                            type = ' ';
                                            break;
                                        case ClientLib.Data.ECityTerrainType.CRYSTAL:
                                            type = 'C';
                                            dist[x][y][1]++;
                                            break;
                                        case ClientLib.Data.ECityTerrainType.TIBERIUM:
                                            type = 'T';
                                            dist[x][y][0]++;
                                            break;
                                        case ClientLib.Data.ECityTerrainType.BLOCKED:
                                            type = 'B';
                                            break;
                                        case ClientLib.Data.ECityTerrainType.FOREST:
                                            type = 'F';
                                            break;
                                        case ClientLib.Data.ECityTerrainType.BRIAR:
                                            type = 'b';
                                            break;
                                        case ClientLib.Data.ECityTerrainType.SWAMP:
                                            type = 'S';
                                            break;
                                        case ClientLib.Data.ECityTerrainType.WATER:
                                            type = 'W';
                                            break;
                                        default:
                                            type = '?';
                                            break;
                                        }

                                        tableData[x][y] = type;
                                    }
                                }

                                /* only store NPC bases */
                                if (city.IsNPC())
                                {
                                    var coord = city.get_PosX() + ":" + city.get_PosY();
                                    var matchFound = false;
                                    var records = map[coord];
                                    var encodedLayout = g3_baseScan.encodeLayout(tableData);

                                    /* nothing stored about? */
                                    if (!records)
                                    {
                                        records = [];
                                    }
                                    else
                                    {
                                        var record = 0;

                                        /* check if this distribution was already stored */
                                        for (record = 0; (record < records.length); record++)
                                        {
                                            var match = true;
                                            var pos = 0;

                                            for (pos = 0; pos < 5; pos++)
                                            {
                                                if (records[record][pos] != encodedLayout[pos])
                                                {
                                                    match = false;
                                                }
                                            }

                                            /* yes, already had this layout */
                                            if (match)
                                            {
                                                matchFound = true;

                                                /* update seen count if this is a different base than last time */
                                                if (records[record]["lastId"] != city.get_Id())
                                                {
                                                    console.log("g3_baseScan: A new base at " + coord + " has same layout");
                                                    records[record]["lastId"] = city.get_Id();
                                                    records[record]["seenCount"]++;
                                                }
                                                break;
                                            }
                                        }
                                    }

                                    /* do we have to add this layout to our database? */
                                    if (!matchFound)
                                    {
                                        /* was this because of a new layout? */
                                        if (records.length > 0)
                                        {
                                            console.log("g3_baseScan: Base at " + coord + " has some new layout");
                                        }
                                        encodedLayout["seenCount"] = 1;
                                        encodedLayout["lastId"] = city.get_Id();
                                        records[records.length] = encodedLayout;
                                    }

                                    map[coord] = records;
                                    g3_setVar("resMap", map);
                                    g3_setVar("resDistrib", dist);
                                }
                                return tableData;
                            }

                            return null;
                        }
                        catch (ex)
                        {
                            console.log("g3_baseScan: error: ", ex);
                        }
                    },

                    getResources: function (city)
                    {
                        var resourceInfo = [0, 0, 0, 0, 0, 0, 0, 0, false];
                        var pos = 0;
                        var req = 0;
                        var i = 0;
                        var buildingsData = city.get_CityBuildingsData();
                        var unitsData = city.get_CityUnitsData();
                        
                        if(!g3_baseScan.detectObfuscated(city))
                        {
                            console.log("missing obfuscated members");
                            return null;
                        }
                        
                        /* have any data about units? */
                        if (unitsData != null && buildingsData != null)
                        {
                            /* already cached buildings?  m_Buildings */
                            if (buildingsData[g3_baseScan.m_BuildingsSymbol] != null)
                            {
                                var buildings = buildingsData[g3_baseScan.m_BuildingsSymbol].l;

                                for (pos = 0; pos < buildings.length; pos++)
                                {
                                    var building = buildings[pos];
                                    req = building[g3_baseScan.m_UnitLevelRequirementsSymbol].rer; //m_UnitLevelRequirements;

                                    for (i = 0; i < req.length; i++)
                                    {
                                        resourceInfo[req[i].t] += req[i].c * building.get_HitpointsPercent();
                                        if (building.get_HitpointsPercent() < 1.0)
                                        {
                                            resourceInfo[8] = true;
                                        }
                                    }
                                }
                            }

                            /* already cached defense units? was: city.m_CityUnits.m_DefenseUnits */
                            if (unitsData[g3_baseScan.m_DefenseUnitsSymbol] != null)
                            {
                                var units = unitsData[g3_baseScan.m_DefenseUnitsSymbol].l;

                                for (pos = 0; pos < units.length; pos++)
                                {
                                    var unit = units[pos];
                                    req = unit[g3_baseScan.m_UnitLevelRequirementsSymbol].rer; //m_UnitLevelRequirements;

                                    for (i = 0; i < req.length; i++)
                                    {
                                        resourceInfo[req[i].t] += req[i].c * unit.get_HitpointsPercent();
                                        if (unit.get_HitpointsPercent() < 1.0)
                                        {
                                            resourceInfo[8] = true;
                                        }
                                    }
                                }
                            }

                            /* now check if this is an empty set */
                            var empty = true;
                            for (pos = 0; pos < 8; pos++)
                            {
                                if (resourceInfo[pos] != 0)
                                {
                                    empty = false;
                                }
                            }

                            /* if so, discard this and let the scanner rescan this base again */
                            if (empty)
                            {
                                return null;
                            }

                            return resourceInfo;
                        }
                        return null;
                    },

                    cellDoubleClickCallback: function (e)
                    {
                        try
                        {
                            var cityId = g3_baseScan.rowData[e.getRow()][g3_tableData_CITY_ID];
                            var posData = g3_baseScan.rowData[e.getRow()][g3_tableData_POS];

                            /* center screen */
                            if (posData != null && posData.split(':').length == 2)
                            {
                                var posX = parseInt(posData.split(':')[0]);
                                var posY = parseInt(posData.split(':')[1]);
                                ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(posX, posY);
                            }

                            /* and highlight base */
                            if (cityId)
                            {
                                ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(cityId);
                            }
                        }
                        catch (ex)
                        {
                            console.log("g3_baseScan: cellDoubleClickCallback error: ", ex);
                        }
                    },

                    closeCallback: function (e)
                    {
                        /* cancel scanning */
                        g3_baseScan.cancel = true;
                    },

                    getResMapLabel: function (tableData, colored)
                    {
                        /* first get the number of spots */
                        var cntTiberium = 0;
                        var cntCrystal = 0;
                        var x = 0;
                        var y = 0;

                        for (y = 0;
                        (y < 8); y++)
                        {
                            for (x = 0;
                            (x < 9); x++)
                            {
                                switch (tableData[x][y])
                                {
                                case 'T':
                                    cntTiberium++;
                                    break;
                                case 'C':
                                    cntCrystal++;
                                    break;
                                }
                            }
                        }

                        /* then plot them */
                        var richString = '<table border="0" cellspacing="0" cellpadding="0">';
                        for (y = 0;
                        (y < 8); y++)
                        {
                            richString = richString + "<tr>";
                            for (x = 0;
                            (x < 9); x++)
                            {
                                var img = "";
                                switch (tableData[x][y])
                                {
                                case 'T':
                                    img = '<img width="14" height="14" src="' + g3_imgTiberium + '">';
                                    break;
                                case 'C':
                                    img = '<img width="14" height="14" src="' + g3_imgCrystal + '">';
                                    break;
                                default:
                                    img = '<img width="14" height="14" src="' + g3_imgEmpty + '">';
                                    break;
                                }
                                richString = richString + "<td>" + img + "</td>";
                            }

                            if (!colored)
                            {
                                /* oh and add the number of resource spots, too */
                                switch (y)
                                {
                                case 5:
                                    richString = richString + '<td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><img width="14" height="14" src="' + g3_imgTiberium + '">x' + cntTiberium + '</td>';
                                    break;
                                case 6:
                                    richString = richString + '<td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><img width="14" height="14" src="' + g3_imgCrystal + '">x' + cntCrystal + '</td>';
                                    break;
                                }
                            }
                            richString = richString + "</tr>";
                        }
                        richString = richString + "</table>";

                        var label = new qx.ui.basic.Label().set(
                        {
                            backgroundColor: "#303030",
                            value: richString,
                            rich: true,
                        });

                        if (colored)
                        {
                            if (cntTiberium > cntCrystal)
                            {
                                label.setBackgroundColor("#202820");
                            }
                            else if (cntTiberium < cntCrystal)
                            {
                                label.setBackgroundColor("#202028");
                            }
                        }

                        return label;
                    },

                    mouseMoveCallback: function (e)
                    {
                        try
                        {
                            var dataLine = g3_baseScan.rowData[g3_baseScan.table.getFocusedRow()];

                            if (!dataLine)
                            {
                                g3_baseScan.rowDataHovered = -1;
                                g3_baseScan.popup.hide();
                                g3_baseScan.popup.removeAll();
                                return;
                            }

                            var tableData = dataLine[g3_tableData_RES_MAP];

                            /* no data? don't show anything in popup */
                            if (!tableData)
                            {
                                g3_baseScan.rowDataHovered = -1;
                                g3_baseScan.popup.hide();
                                g3_baseScan.popup.removeAll();
                                return;
                            }

                            /* select base, if no scan is in progress */
                            if (!g3_baseScan.scanInProgress)
                            {
                                ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(dataLine[g3_tableData_CITY_ID]);
                            }

                            /* is this city already shown in tooltip? */
                            if (g3_baseScan.rowDataHovered == dataLine[g3_tableData_CITY_ID])
                            {
                                /* just update position and return */
                                g3_baseScan.popup.placeToMouse(e);
                                return;
                            }

                            var resMapLabel = g3_baseScan.getResMapLabel(tableData);

                            g3_baseScan.popup.removeAll();
                            g3_baseScan.popup.add(resMapLabel);
                            g3_baseScan.rowDataHovered = dataLine[g3_tableData_CITY_ID];
                        }
                        catch (ex)
                        {
                            console.log("g3_baseScan: mouseMoveCallback error: ", ex);
                        }

                        g3_baseScan.popup.placeToMouse(e);
                        g3_baseScan.popup.show();
                    },

                    uploadDatabase: function ()
                    {
                        var resMap = g3_getVar("resMap");
                
                        var content = g3_baseScan.newPacket();
                        content.resmapcache = resMap;
                        
                        g3_baseScan.dataRequest(content);
                    },

                    scanTargets: function ()
                    {
                        try
                        {
                            /* throw away any pending cancel request */
                            g3_baseScan.cancel = false;
                            g3_baseScan.scanInProgress = true;
                            
                            allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                            found = false;
                            for(cityData in allCities)
                            {
                                found |= g3_baseScan.detectObfuscated(allCities[cityData]);
                            }
                            
                            if(found)
                            {
                                console.log("finally found obfuscated members, forget about eventual error messages about 'could not locate...' before" );
                            }
                            else
                            {
                                console.log("failed in finding obfuscated members :( expect problems..." );
                            }

                            /* init data */
                            g3_baseScan.rowData = [];
                            g3_baseScan.rowDataPos = 0;
                            g3_baseScan.rowDataPosUpdate = 0;

                            g3_baseScan.window.removeAll();
                            g3_baseScan.composite.removeAll();

                            if (g3_baseScan.mode == g3_mode_RESMAP_CACHE)
                            {
                                g3_baseScan.window.setCaption("Showing whole map cache (this might hang your browser for A LONG TIME)");
                                g3_baseScan.window.add(g3_baseScan.scrollpane);
                                /* do nothing else here, just let updateList being called */
                            }
                            else
                            {
                                var posX = g3_baseScan.selectedBase.get_PosX();
                                var posY = g3_baseScan.selectedBase.get_PosY();
                                var scanX = 0;
                                var scanY = 0;
                                var world = ClientLib.Data.MainData.GetInstance().get_World();

                                console.log("Scanning from: " + g3_baseScan.selectedBase.get_Name());

                                if (g3_baseScan.mode == g3_mode_NORMAL)
                                {
                                    g3_baseScan.window.setCaption("Scan results (scan in progress, please don't click anything)");
                                    g3_baseScan.window.add(g3_baseScan.table);
                                }
                                else
                                {
                                    g3_baseScan.window.setCaption("Scan results (this might hang your browser for some seconds)");
                                    g3_baseScan.window.add(g3_baseScan.scrollpane);
                                }

                                for (scanY = posY - 10; scanY <= posY + 10; scanY++)
                                {
                                    for (scanX = posX - 10; scanX <= posX + 10; scanX++)
                                    {
                                        var distX = Math.abs(posX - scanX);
                                        var distY = Math.abs(posY - scanY);
                                        var distance = Math.sqrt((distX * distX) + (distY * distY));

                                        /* we can only attack up to 10 fields distance */
                                        if (distance <= 10.0)
                                        {
                                            var object = world.GetObjectFromPosition(scanX, scanY);

                                            if (object && object.CampType != ClientLib.Data.Reports.ENPCCampType.Destroyed)
                                            {
                                                switch (object.Type)
                                                {
                                                case ClientLib.Data.WorldSector.ObjectType.City:
                                                case ClientLib.Data.WorldSector.ObjectType.NPCBase:
                                                case ClientLib.Data.WorldSector.ObjectType.NPCCamp:
                                                    g3_baseScan.rowData[g3_baseScan.rowDataPos] = [];
                                                    g3_baseScan.rowData[g3_baseScan.rowDataPos][g3_tableData_POS] = scanX + ":" + scanY;
                                                    g3_baseScan.rowData[g3_baseScan.rowDataPos][g3_tableData_LEVEL] = object.Level;
                                                    g3_baseScan.rowData[g3_baseScan.rowDataPos][g3_tableData_CITY_ID] = object.Id;
                                                    g3_baseScan.rowData[g3_baseScan.rowDataPos][g3_tableData_DISTANCE] = distance;
                                                    g3_baseScan.rowDataPos++;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                /* update table with new list */
                                if (g3_baseScan.mode == g3_mode_NORMAL)
                                {
                                    g3_baseScan.tableModel.setData(g3_baseScan.rowData);
                                }
                            }

                            g3_baseScan.window.moveTo(60, 60);
                            g3_baseScan.window.open();
                            window.setTimeout(g3_baseScan.updateList, 50);
                        }
                        catch (ex)
                        {
                            console.log("g3_baseScan: scanTargets error: ", ex);
                        }
                    }
                };



                function initGui()
                {
                    var app = qx.core.Init.getApplication();
                    var navBar = app.getNavigationBar();

                    g3_baseScan.menuButton = new qx.ui.form.Button(null, g3_imgItem).set(
                    {
                        toolTipText: "Scan possible targets"
                    });
                    g3_baseScan.menuButton.addListener("execute", function (e)
                    {
                        g3_baseScan.updateToolTip();

                        if (g3_baseScan.scanInProgress)
                        {
                            g3_baseScan.cancel = true;
                        }
                        else
                        {
                            if (g3_baseScan.ctxPopup.isVisible())
                            {
                                g3_baseScan.ctxPopup.hide();
                                return;
                            }

                            g3_baseScan.ctxPopup.show();
                        }
                    });
                    g3_baseScan.updateToolTip();

                    app.getDesktop().add(g3_baseScan.menuButton, {
                        right: navBar.getBounds().width,
                        top: 0
                    });

                    g3_baseScan.window = new qx.ui.window.Window("Scan results").set(
                    {
                        layout: new qx.ui.layout.Grow(),
                        allowClose: true,
                        allowMinimize: false
                    });

                    g3_baseScan.scrollpane = new qx.ui.container.Scroll().set(
                    {
                        width: 1080,
                        height: 740
                    });

                    g3_baseScan.composite = new qx.ui.container.Composite();
                    g3_baseScan.composite.setLayout(new qx.ui.layout.Flow().set(
                    {
                        spacingX: 2,
                        spacingY: 2
                    }));
                    g3_baseScan.scrollpane.add(g3_baseScan.composite);

                    /* build popup window */
                    g3_baseScan.popup = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set(
                    {
                        backgroundColor: "#303030",
                        padding: [2, 4],
                        offset: 15,
                        offsetBottom: 40
                    });

                    g3_baseScan.popupLabel = new qx.ui.basic.Label("");
                    g3_baseScan.popup.add(g3_baseScan.popupLabel);


                    /* build context menu popup window */
                    g3_baseScan.ctxPopup = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set(
                    {
                        layout: new qx.ui.layout.VBox(9),
                        backgroundColor: "#303030",
                        padding: [2, 4],
                        offset: 15,
                        offsetBottom: 40
                    });

                    var btnResMapScan = new qx.ui.form.Button("Scan").set(
                    {
                        toolTipText: "Will only scan resource maps for resources around your currently selected base"
                    });
                    var btnResMapHere = new qx.ui.form.Button("Show around base").set(
                    {
                        toolTipText: "Will only show resource maps for resources around your currently selected base"
                    });
                    var btnResMapAll = new qx.ui.form.Button("Show whole cache").set(
                    {
                        toolTipText: "Will show all resource maps for all NPC bases/outposts in cache. (Warning: will cause your browser to hang 1-2 minutes)"
                    });
                    g3_baseScan.btnUpload = new qx.ui.form.Button("Sync DB (checking...)").set(
                    {
                        toolTipText: ""
                    });

                    g3_baseScan.ctxPopup.add(new qx.ui.basic.Label("Scan Bases"));
                    g3_baseScan.ctxPopup.add(btnResMapScan);
                    g3_baseScan.ctxPopup.add(new qx.ui.basic.Label("Resource Map"));
                    g3_baseScan.ctxPopup.add(btnResMapHere);
                    g3_baseScan.ctxPopup.add(btnResMapAll);
                    g3_baseScan.ctxPopup.add(new qx.ui.basic.Label("Cache"));
                    g3_baseScan.ctxPopup.add(g3_baseScan.btnUpload);

                    btnResMapScan.addListener("execute", function (e)
                    {
                        g3_baseScan.ctxPopup.hide();
                        g3_baseScan.mode = g3_mode_NORMAL;
                        g3_baseScan.selectedBase = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        g3_baseScan.scanTargets();
                    });

                    btnResMapHere.addListener("execute", function (e)
                    {
                        g3_baseScan.ctxPopup.hide();
                        g3_baseScan.mode = g3_mode_RESMAP;
                        g3_baseScan.selectedBase = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        g3_baseScan.scanTargets();
                    });

                    btnResMapAll.addListener("execute", function (e)
                    {
                        g3_baseScan.ctxPopup.hide();
                        g3_baseScan.mode = g3_mode_RESMAP_CACHE;
                        g3_baseScan.selectedBase = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        g3_baseScan.scanTargets();
                    });

                    g3_baseScan.btnUpload.setEnabled(false);
                    g3_baseScan.btnUpload.addListener("execute", function (e)
                    {
                        g3_baseScan.btnUpload.setEnabled(false);
                        g3_baseScan.ctxPopup.hide();
                        g3_baseScan.uploadDatabase();
                    });

                    app.getDesktop().add(g3_baseScan.ctxPopup, {
                        right: navBar.getBounds().width,
                        top: g3_baseScan.menuButton.getHeight()
                    });

                    g3_baseScan.tableModel = new qx.ui.table.model.Simple();
                    g3_baseScan.tableModel.setColumns(["Pos", "Name", "Lvl", "Tiberium", "Crystal", "Credits", "Research", "Att.", "Dist.", "Value"]);

                    g3_baseScan.table = new qx.ui.table.Table(g3_baseScan.tableModel);

                    var tcm = g3_baseScan.table.getTableColumnModel();

                    tcm.setDataCellRenderer(g3_tableData_ATTACKED, new qx.ui.table.cellrenderer.Boolean());
                    tcm.setColumnWidth(g3_tableData_POS, 60, false);
                    tcm.setColumnWidth(g3_tableData_NAME, 100, false);
                    tcm.setColumnWidth(g3_tableData_LEVEL, 30, false);
                    tcm.setColumnWidth(g3_tableData_TIBERIUM, 80, false);
                    tcm.setColumnWidth(g3_tableData_CRYSTAL, 80, false);
                    tcm.setColumnWidth(g3_tableData_CREDITS, 80, false);
                    tcm.setColumnWidth(g3_tableData_RESEARCH, 80, false);
                    tcm.setColumnWidth(g3_tableData_ATTACKED, 40, false);
                    tcm.setColumnWidth(g3_tableData_DISTANCE, 60, false);
                    tcm.setColumnWidth(g3_tableData_ATTRACTIVITY, 60, false);

                    g3_baseScan.table.setFocusCellOnMouseMove(true);

                    g3_baseScan.table.addListener("mousemove", g3_baseScan.mouseMoveCallback);
                    g3_baseScan.table.addListener("cellDblclick", g3_baseScan.cellDoubleClickCallback);
                    g3_baseScan.window.addListener("close", g3_baseScan.closeCallback);

                    app.getDesktop().add(g3_baseScan.window);
                    g3_baseScan.window.close();
                }

                try
                {
                    window.__g3_baseScan = g3_baseScan;

                    /* check database after screen has loaded */
                    g3_baseScan.checkTimeout = 600000;
                    g3_baseScan.checkTimeoutId = window.setTimeout(g3_baseScan.checkDatabase, 10000);
                    
                    initGui();
                }
                catch (ex)
                {
                    console.log("g3_baseScan: initGui error: ", ex);
                }
            }

            function g3_baseScanCheck()
            {
                try
                {
                    if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getNavigationBar() && qx.core.Init.getApplication().getNavigationBar().isVisible())
                    {
                        g3_baseScanCreate();
                        return;
                    }
                    window.setTimeout(g3_baseScanCheck, 1000);
                }
                catch (ex)
                {
                    console.log("g3_baseScan: g3_baseScanCheck error: ", ex);
                }
            }

            window.setTimeout(g3_baseScanCheck, 1000);
        }
        catch (ex)
        {
            console.log("g3_baseScan: init error: ", ex);
        }
    };
try
{
    var inj = document.createElement("script");
    txt = g3_baseScanMain.toString();
    inj.innerHTML = "(" + txt + ")();";
    inj.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(inj);

    /* preparing online resource statistics sharing. test code goes here */
    unsafeWindow.g3_data = null;
    unsafeWindow.g3_transferActive = false;
    unsafeWindow.requestInterval = 500;
    window.requestInterval = 500;
    window.requestFunc = function ()
    {
        try
        {
            if (unsafeWindow.g3_data && !unsafeWindow.g3_transferActive)
            {
                var packet = unsafeWindow.g3_data;
                unsafeWindow.g3_data = null;
                unsafeWindow.g3_transferActive = true;
            }
        }
        catch (ex)
        { }
    };
    window.requestUpdate = function ()
    {
        try
        { 
            if (window.requestInterval != unsafeWindow.requestInterval)
            {
                window.requestInterval = unsafeWindow.requestInterval;
                clearInterval(window.requesterId);
                window.requesterId = setInterval(requestFunc, window.requestInterval);
            }
        }
        catch (ex)
        { }
    };
    window.requesterId = window.setInterval(window.requestFunc, window.requestInterval);
    window.requesterUpdaterId = window.setInterval(window.requestUpdate, 500);
}
catch (ex)
{
    console.log("g3_baseScan: init error: ", ex);
}
})();