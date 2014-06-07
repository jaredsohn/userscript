// ==UserScript==
// @name          Tribal Wars eXtension! v3.0.3 PL(In English) 
// @namespace     http://none
// @description   This Is JonnyD's  script in English. Right now it is only in the alpha stage and kinks are still being worked out. Most things do work but the calculator is however is of no use to you if you don't speak Polish. Have any suggestions post them and I will see what I can do. The new version will have premium style map, more menus, fixed calculator, and much more!!! This is just so that you may get a feel for the script. The new release will have the tribalwars interface script integrated in it. There is much work that needs to be done to the script. The writer has alot of unworking things. Taking all suggestions!! Is is in about 95% English.
// @include       http://w*.tribalwars.*/game.php*
// @include 	  http://pl*.plemiona.*/game.php*
// @include 	  http://pl*.ds.innogames.*/game.php*
// @include		http://tw*.tribalwars.net/*
// @version       3.0
// ==/UserScript==
//__________________________________________________________________________________________________________________//

//MooTools, My Object Oriented Javascript Tools. Copyright (c) 2006 Valerio Proietti, <http://mad4milk.net>, MIT Style License.
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('o bF={\'bG\':1.1};k $8a(O){m(O!=b9)};k $F(O){B(!$8a(O))m N;B(O.4Y)m\'G\';o F=7g O;B(F==\'2C\'&&O.c4){23(O.7s){12 1:m\'G\';12 3:m/\\S/.2t(O.8Z)?\'bk\':\'bu\'}}B(F==\'2C\'||F==\'k\'){23(O.aR){12 2I:m\'1B\';12 7V:m\'5n\';12 18:m\'4O\'}B(7g O.V==\'4S\'){B(O.3h)m\'cT\';B(O.8r)m\'1c\'}}m F};k $2c(){o 4R={};M(o i=0;i<1c.V;i++){M(o K 1b 1c[i]){o ap=1c[i][K];o 6R=4R[K];B(6R&&$F(ap)==\'2C\'&&$F(6R)==\'2C\')4R[K]=$2c(6R,ap);17 4R[K]=ap}}m 4R};o $R=7c.R=k(){o 1q=1c;B(!1q[1])1q=[c,1q[0]];M(o K 1b 1q[1])1q[0][K]=1q[1][K];m 1q[0]};o $4Q=7c.cW=k(){M(o i=0,l=1c.V;i<l;i++){1c[i].R=k(1W){M(o 1V 1b 1W){B(!c.1L[1V])c.1L[1V]=1W[1V];B(!c[1V])c[1V]=$4Q.6P(1V)}}}};$4Q.6P=k(1V){m k(Y){m c.1L[1V].3U(Y,2I.1L.aI.1S(1c,1))}};$4Q(7S,2I,6W,ao);o 3y=k(O){O=O||{};O.R=$R;m O};o cX=L 3y(U);o cM=L 3y(P);P.6s=P.35(\'6s\')[0];k $2B(O){m!!(O||O===0)};k $5F(O,a8){m $8a(O)?O:a8};k $7X(3p,1z){m 1d.an(1d.7X()*(1z-3p+1)+3p)};k $3A(){m L 97().bf()};k $4Z(1H){ci(1H);cn(1H);m 1F};U.43=!!(P.5M);B(U.aO)U.31=U[U.7d?\'cl\':\'aY\']=1e;17 B(P.9A&&!P.bz&&!bl.bM)U.cS=U.4M=U[U.43?\'cg\':\'65\']=1e;17 B(P.cb!=1F)U.7W=1e;B(7g 5O==\'b9\'){o 5O=k(){};B(U.4M)P.aq("cJ");5O.1L=(U.4M)?U["[[bA.1L]]"]:{}}5O.1L.4Y=1e;B(U.aY)5f{P.bK("cc",N,1e)}4X(e){};o 18=k(1K){o 63=k(){m(1c[0]!==1F&&c.1j&&$F(c.1j)==\'k\')?c.1j.3U(c,1c):c};$R(63,c);63.1L=1K;63.aR=18;m 63};18.1m=k(){};18.1L={R:k(1K){o 7k=L c(1F);M(o K 1b 1K){o aP=7k[K];7k[K]=18.aL(aP,1K[K])}m L 18(7k)},3q:k(){M(o i=0,l=1c.V;i<l;i++)$R(c.1L,1c[i])}};18.aL=k(2o,2a){B(2o&&2o!=2a){o F=$F(2a);B(F!=$F(2o))m 2a;23(F){12\'k\':o 7E=k(){c.1r=1c.8r.1r;m 2a.3U(c,1c)};7E.1r=2o;m 7E;12\'2C\':m $2c(2o,2a)}}m 2a};o 8b=L 18({bD:k(W){c.4j=c.4j||[];c.4j.1k(W);m c},7t:k(){B(c.4j&&c.4j.V)c.4j.9W().2k(10,c)},bC:k(){c.4j=[]}});o 2q=L 18({1I:k(F,W){B(W!=18.1m){c.$19=c.$19||{};c.$19[F]=c.$19[F]||[];c.$19[F].5w(W)}m c},1i:k(F,1q,2k){B(c.$19&&c.$19[F]){c.$19[F].1o(k(W){W.3a({\'Y\':c,\'2k\':2k,\'1c\':1q})()},c)}m c},3Z:k(F,W){B(c.$19&&c.$19[F])c.$19[F].2H(W);m c}});o 4i=L 18({2U:k(){c.C=$2c.3U(1F,[c.C].R(1c));B(!c.1I)m c;M(o 3B 1b c.C){B($F(c.C[3B]==\'k\')&&3B.2t(/^5C[A-Z]/))c.1I(3B,c.C[3B])}m c}});2I.R({7l:k(W,Y){M(o i=0,j=c.V;i<j;i++)W.1S(Y,c[i],i,c)},3f:k(W,Y){o 54=[];M(o i=0,j=c.V;i<j;i++){B(W.1S(Y,c[i],i,c))54.1k(c[i])}m 54},2K:k(W,Y){o 54=[];M(o i=0,j=c.V;i<j;i++)54[i]=W.1S(Y,c[i],i,c);m 54},4v:k(W,Y){M(o i=0,j=c.V;i<j;i++){B(!W.1S(Y,c[i],i,c))m N}m 1e},bo:k(W,Y){M(o i=0,j=c.V;i<j;i++){B(W.1S(Y,c[i],i,c))m 1e}m N},3S:k(3h,15){o 3N=c.V;M(o i=(15<0)?1d.1z(0,3N+15):15||0;i<3N;i++){B(c[i]===3h)m i}m-1},8m:k(1h,V){1h=1h||0;B(1h<0)1h=c.V+1h;V=V||(c.V-1h);o 89=[];M(o i=0;i<V;i++)89[i]=c[1h++];m 89},2H:k(3h){o i=0;o 3N=c.V;6Y(i<3N){B(c[i]===3h){c.6y(i,1);3N--}17{i++}}m c},1l:k(3h,15){m c.3S(3h,15)!=-1},bm:k(1P){o O={},V=1d.3p(c.V,1P.V);M(o i=0;i<V;i++)O[1P[i]]=c[i];m O},R:k(1B){M(o i=0,j=1B.V;i<j;i++)c.1k(1B[i]);m c},2c:k(1B){M(o i=0,l=1B.V;i<l;i++)c.5w(1B[i]);m c},5w:k(3h){B(!c.1l(3h))c.1k(3h);m c},bp:k(){m c[$7X(0,c.V-1)]||N},7Y:k(){m c[c.V-1]||N}});2I.1L.1o=2I.1L.7l;2I.1L.2t=2I.1L.1l;k $A(1B){m 2I.8m(1B)};k $1o(3W,W,Y){B(3W&&7g 3W.V==\'4S\'&&$F(3W)!=\'2C\')2I.7l(3W,W,Y);17 M(o 1w 1b 3W)W.1S(Y||3W,3W[1w],1w)};6W.R({2t:k(6o,2S){m(($F(6o)==\'2E\')?L 7V(6o,2S):6o).2t(c)},3c:k(){m 5X(c,10)},b4:k(){m 69(c)},7N:k(){m c.3l(/-\\D/g,k(2T){m 2T.7T(1).aJ()})},9o:k(){m c.3l(/\\w[A-Z]/g,k(2T){m(2T.7T(0)+\'-\'+2T.7T(1).5B())})},8I:k(){m c.3l(/\\b[a-z]/g,k(2T){m 2T.aJ()})},5Y:k(){m c.3l(/^\\s+|\\s+$/g,\'\')},7w:k(){m c.3l(/\\s{2,}/g,\' \').5Y()},5I:k(1B){o 1v=c.2T(/\\d{1,3}/g);m(1v)?1v.5I(1B):N},5H:k(1B){o 3C=c.2T(/^#?(\\w{1,2})(\\w{1,2})(\\w{1,2})$/);m(3C)?3C.aI(1).5H(1B):N},1l:k(2E,s){m(s)?(s+c+s).3S(s+2E+s)>-1:c.3S(2E)>-1},aK:k(){m c.3l(/([.*+?^${}()|[\\]\\/\\\\])/g,\'\\\\$1\')}});2I.R({5I:k(1B){B(c.V<3)m N;B(c.V==4&&c[3]==0&&!1B)m\'c5\';o 3C=[];M(o i=0;i<3;i++){o 52=(c[i]-0).4u(16);3C.1k((52.V==1)?\'0\'+52:52)}m 1B?3C:\'#\'+3C.2h(\'\')},5H:k(1B){B(c.V!=3)m N;o 1v=[];M(o i=0;i<3;i++){1v.1k(5X((c[i].V==1)?c[i]+c[i]:c[i],16))}m 1B?1v:\'1v(\'+1v.2h(\',\')+\')\'}});7S.R({3a:k(C){o W=c;C=$2c({\'Y\':W,\'I\':N,\'1c\':1F,\'2k\':N,\'4f\':N,\'6J\':N},C);B($2B(C.1c)&&$F(C.1c)!=\'1B\')C.1c=[C.1c];m k(I){o 1q;B(C.I){I=I||U.I;1q=[(C.I===1e)?I:L C.I(I)];B(C.1c)1q.R(C.1c)}17 1q=C.1c||1c;o 3P=k(){m W.3U($5F(C.Y,W),1q)};B(C.2k)m 9H(3P,C.2k);B(C.4f)m cI(3P,C.4f);B(C.6J)5f{m 3P()}4X(cE){m N};m 3P()}},cL:k(1q,Y){m c.3a({\'1c\':1q,\'Y\':Y})},6J:k(1q,Y){m c.3a({\'1c\':1q,\'Y\':Y,\'6J\':1e})()},Y:k(Y,1q){m c.3a({\'Y\':Y,\'1c\':1q})},cU:k(Y,1q){m c.3a({\'Y\':Y,\'I\':1e,\'1c\':1q})},2k:k(2k,Y,1q){m c.3a({\'2k\':2k,\'Y\':Y,\'1c\':1q})()},4f:k(at,Y,1q){m c.3a({\'4f\':at,\'Y\':Y,\'1c\':1q})()}});ao.R({3c:k(){m 5X(c)},b4:k(){m 69(c)},1E:k(3p,1z){m 1d.3p(1z,1d.1z(3p,c))},2r:k(5L){5L=1d.3J(10,5L||0);m 1d.2r(c*5L)/5L},cN:k(W){M(o i=0;i<c;i++)W(i)}});o Q=L 18({1j:k(el,1W){B($F(el)==\'2E\'){B(U.31&&1W&&(1W.1w||1W.F)){o 1w=(1W.1w)?\' 1w="\'+1W.1w+\'"\':\'\';o F=(1W.F)?\' F="\'+1W.F+\'"\':\'\';5j 1W.1w;5j 1W.F;el=\'<\'+el+1w+F+\'>\'}el=P.aq(el)}el=$(el);m(!1W||!el)?el:el.2i(1W)}});o 29=L 18({1j:k(T){m(T)?$R(T,c):c}});29.R=k(1W){M(o 1V 1b 1W){c.1L[1V]=1W[1V];c[1V]=$4Q.6P(1V)}};k $(el){B(!el)m N;B(el.4Y)m 33.4V(el);B([U,P].1l(el))m el;o F=$F(el);B(F==\'2E\'){el=P.7f(el);F=(el)?\'G\':N}B(F!=\'G\')m N;B(el.4Y)m 33.4V(el);B([\'2C\',\'cx\'].1l(el.6k.5B()))m el;$R(el,Q.1L);el.4Y=1e;m 33.4V(el)};P.77=P.35;k $$(){o T=[];M(o i=0,j=1c.V;i<j;i++){o 1Q=1c[i];23($F(1Q)){12\'G\':T.1k(1Q);12\'ce\':1D;12 N:1D;12\'2E\':1Q=P.77(1Q,1e);5D:T.R(1Q)}}m $$.5R(T)};$$.5R=k(1B){o T=[];M(o i=0,l=1B.V;i<l;i++){B(1B[i].$6T)6C;o G=$(1B[i]);B(G&&!G.$6T){G.$6T=1e;T.1k(G)}}M(o i=0,l=T.V;i<l;i++)T[i].$6T=1F;m L 29(T)};29.6D=k(K){m k(){o 1q=1c;o 1y=[];o T=1e;M(o i=0,j=c.V,3P;i<j;i++){3P=c[i][K].3U(c[i],1q);B($F(3P)!=\'G\')T=N;1y.1k(3P)};m(T)?$$.5R(1y):1y}};Q.R=k(1K){M(o K 1b 1K){5O.1L[K]=1K[K];Q.1L[K]=1K[K];Q[K]=$4Q.6P(K);o aF=(2I.1L[K])?K+\'29\':K;29.1L[aF]=29.6D(K)}};Q.R({2i:k(1W){M(o 1V 1b 1W){o 4x=1W[1V];23(1V){12\'8A\':c.4z(4x);1D;12\'19\':B(c.6B)c.6B(4x);1D;12\'1K\':c.6j(4x);1D;5D:c.7b(1V,4x)}}m c},25:k(el,aH){el=$(el);23(aH){12\'aA\':el.3r.7G(c,el);1D;12\'aB\':o 3v=el.8x();B(!3v)el.3r.81(c);17 el.3r.7G(c,3v);1D;12\'1n\':o 84=el.9i;B(84){el.7G(c,84);1D}5D:el.81(c)}m c},8o:k(el){m c.25(el,\'aA\')},6O:k(el){m c.25(el,\'aB\')},ca:k(el){m c.25(el,\'3O\')},ct:k(el){m c.25(el,\'1n\')},b8:k(){o T=[];$1o(1c,k(4n){T=T.7y(4n)});$$(T).25(c);m c},2H:k(){m c.3r.cv(c)},9M:k(b3){o el=$(c.cp(b3!==N));B(!el.$19)m el;el.$19={};M(o F 1b c.$19)el.$19[F]={\'1P\':$A(c.$19[F].1P),\'1J\':$A(c.$19[F].1J)};m el.6G()},ck:k(el){el=$(el);c.3r.cm(el,c);m el},co:k(21){B(U.31){23(c.57()){12\'1Z\':c.c6.b7=21;m c;12\'2W\':m c.7b(\'21\',21)}}c.81(P.c7(21));m c},7F:k(1A){m c.1A.1l(1A,\' \')},bh:k(1A){B(!c.7F(1A))c.1A=(c.1A+\' \'+1A).7w();m c},b5:k(1A){c.1A=c.1A.3l(L 7V(\'(^|\\\\s)\'+1A+\'(?:\\\\s|$)\'),\'$1\').7w();m c},ch:k(1A){m c.7F(1A)?c.b5(1A):c.bh(1A)},1O:k(K,J){23(K){12\'22\':m c.bi(69(J));12\'by\':K=(U.31)?\'bn\':\'bW\'}K=K.7N();23($F(J)){12\'4S\':B(![\'bH\',\'am\'].1l(K))J+=\'5a\';1D;12\'1B\':J=\'1v(\'+J.2h(\',\')+\')\'}c.1Z[K]=J;m c},4z:k(1Y){23($F(1Y)){12\'2C\':Q.6w(c,\'1O\',1Y);1D;12\'2E\':c.1Z.b7=1Y}m c},bi:k(22){B(22==0){B(c.1Z.4G!="4y")c.1Z.4G="4y"}17{B(c.1Z.4G!="8D")c.1Z.4G="8D"}B(!c.71||!c.71.cR)c.1Z.am=1;B(U.31)c.1Z.3f=(22==1)?\'\':"6Z(22="+22*3b+")";c.1Z.22=c.$1X.22=22;m c},2j:k(K){K=K.7N();o 1N=c.1Z[K];B(!$2B(1N)){B(K==\'22\')m c.$1X.22;o 1N=[];M(o 1Z 1b Q.4e){B(K==1Z){Q.4e[1Z].1o(k(s){o 1Z=c.2j(s);1N.1k(5X(1Z)?1Z:\'8W\')},c);B(K==\'2Y\'){o 4v=1N.4v(k(52){m(52==1N[0])});m(4v)?1N[0]:N}m 1N.2h(\' \')}}B(K.1l(\'2Y\')){B(Q.4e.2Y.1l(K)){m[\'8X\',\'82\',\'2M\'].2K(k(p){m c.2j(K+p)},c).2h(\' \')}17 B(Q.92.1l(K)){m[\'8S\',\'8T\',\'8U\',\'8V\'].2K(k(p){m c.2j(\'2Y\'+p+K.3l(\'2Y\',\'\'))},c).2h(\' \')}}B(P.9n)1N=P.9n.bL(c,1F).bN(K.9o());17 B(c.71)1N=c.71[K]}B(U.31)1N=Q.91(K,1N,c);B(1N&&K.2t(/2G/i)&&1N.1l(\'1v\')){m 1N.66(\'1v\').6y(1,4).2K(k(2G){m 2G.5I()}).2h(\' \')}m 1N},ba:k(){m Q.7D(c,\'2j\',1c)},5U:k(6U,1h){6U+=\'bZ\';o el=(1h)?c[1h]:c[6U];6Y(el&&$F(el)!=\'G\')el=el[6U];m $(el)},9F:k(){m c.5U(\'2o\')},8x:k(){m c.5U(\'3v\')},bq:k(){m c.5U(\'3v\',\'9i\')},7Y:k(){m c.5U(\'2o\',\'bx\')},cD:k(){m $(c.3r)},8F:k(){m $$(c.9A)},7Z:k(el){m!!$A(c.35(\'*\')).1l(el)},6n:k(K){o 26=Q.6z[K];B(26)m c[26];B(!U.31)m c.cK(K);o 7z=c.cO[K];m(7z)?7z.8Z:1F},c8:k(K){o 26=Q.6z[K];B(26)c[26]=\'\';17 c.94(K);m c},c9:k(){m Q.7D(c,\'6n\',1c)},7b:k(K,J){o 26=Q.6z[K];B(26)c[26]=J;17 c.cq(K,J);m c},6j:k(1Y){m Q.6w(c,\'7b\',1Y)},5Q:k(){c.cH=$A(1c).2h(\'\');m c},57:k(){m c.6k.5B()},1m:k(){33.44(c.35(\'*\'));m c.5Q(\'\')}});Q.91=k(K,1N,G){B($2B(5X(1N)))m 1N;B([\'2N\',\'2z\'].1l(K)){o 1J=(K==\'2z\')?[\'1t\',\'4k\']:[\'1n\',\'3O\'];o 3n=0;1J.1o(k(J){3n+=G.2j(\'2Y-\'+J+\'-2z\').3c()+G.2j(\'4F-\'+J).3c()});m G[\'1C\'+K.8I()]-3n+\'5a\'}17 B(K.2t(/2Y(.+)8X|34|4F/)){m\'8W\'}m 1N};Q.4e={\'2Y\':[],\'4F\':[],\'34\':[]};[\'8S\',\'8T\',\'8U\',\'8V\'].1o(k(5Z){M(o 1Z 1b Q.4e)Q.4e[1Z].1k(1Z+5Z)});Q.92=[\'cr\',\'cs\',\'cj\'];Q.7D=k(el,28,1P){o 1N={};$1o(1P,k(1s){1N[1s]=el[28](1s)});m 1N};Q.6w=k(el,28,80){M(o 1s 1b 80)el[28](1s,80[1s]);m el};Q.6z=L 3y({\'4O\':\'1A\',\'M\':\'cf\',\'cw\':\'cQ\',\'cP\':\'cC\',\'cB\':\'cA\',\'cy\':\'cz\',\'cF\':\'cG\',\'cY\':\'bV\',\'J\':\'J\',\'7M\':\'7M\',\'7P\':\'7P\',\'7O\':\'7O\'});Q.2F={7a:{2A:k(F,W){B(c.7v)c.7v(F,W,N);17 c.bw(\'5C\'+F,W);m c},3j:k(F,W){B(c.ad)c.ad(F,W,N);17 c.bv(\'5C\'+F,W);m c}}};U.R(Q.2F.7a);P.R(Q.2F.7a);Q.R(Q.2F.7a);o 33={T:[],4V:k(el){B(!el.$1X){33.T.1k(el);el.$1X={\'22\':1}}m el},44:k(T){M(o i=0,j=T.V,el;i<j;i++){B(!(el=T[i])||!el.$1X)6C;B(el.$19)el.1i(\'44\').6G();M(o p 1b el.$1X)el.$1X[p]=1F;M(o p 1b Q.1L)el[p]=1F;el.4Y=el.$1X=el=1F;33.T.2H(el)}},1m:k(){33.4V(U);33.4V(P);33.44(33.T)}};U.2A(\'bt\',k(){U.2A(\'af\',33.1m);B(U.31)U.2A(\'af\',bB)});o 2R=L 18({1j:k(I){B(I&&I.$9J)m I;c.$9J=1e;I=I||U.I;c.I=I;c.F=I.F;c.3u=I.3u||I.bs;B(c.3u.7s==3)c.3u=c.3u.3r;c.9W=I.bU;c.bS=I.bT;c.bX=I.bY;c.c3=I.c2;B([\'9L\',\'5r\'].1l(c.F)){c.c1=(I.9X)?I.9X/c0:-(I.bR||0)/3}17 B(c.F.1l(\'1s\')){c.6Q=I.9P||I.bQ;M(o 1w 1b 2R.1P){B(2R.1P[1w]==c.6Q){c.1s=1w;1D}}B(c.F==\'bI\'){o 7i=c.6Q-bE;B(7i>0&&7i<13)c.1s=\'f\'+7i}c.1s=c.1s||6W.bP(c.6Q).5B()}17 B(c.F.2t(/(8p|3i|bO)/)){c.1M={\'x\':I.7p||I.9h+P.2X.67,\'y\':I.7q||I.9R+P.2X.6a};c.9d={\'x\':I.7p?I.7p-U.9v:I.9h,\'y\':I.7q?I.7q-U.9t:I.9R};c.dw=(I.9P==3)||(I.eJ==2);23(c.F){12\'9E\':c.2p=I.2p||I.eK;1D;12\'9D\':c.2p=I.2p||I.8z}c.9U()}m c},1R:k(){m c.6V().76()},6V:k(){B(c.I.6V)c.I.6V();17 c.I.eI=1e;m c},76:k(){B(c.I.76)c.I.76();17 c.I.eH=N;m c}});2R.6d={2p:k(){B(c.2p&&c.2p.7s==3)c.2p=c.2p.3r},9Y:k(){5f{2R.6d.2p.1S(c)}4X(e){c.2p=c.3u}}};2R.1L.9U=(U.7W)?2R.6d.9Y:2R.6d.2p;2R.1P=L 3y({\'eG\':13,\'8B\':38,\'8C\':40,\'1t\':37,\'4k\':39,\'eL\':27,\'eM\':32,\'eR\':8,\'eS\':9,\'5j\':46});Q.2F.2q={1I:k(F,W){c.$19=c.$19||{};c.$19[F]=c.$19[F]||{\'1P\':[],\'1J\':[]};B(c.$19[F].1P.1l(W))m c;c.$19[F].1P.1k(W);o 7u=F;o 2w=Q.2q[F];B(2w){B(2w.7I)2w.7I.1S(c,W);B(2w.2K)W=2w.2K;B(2w.F)7u=2w.F}B(!c.7v)W=W.3a({\'Y\':c,\'I\':1e});c.$19[F].1J.1k(W);m c.2A(7u,W)},3Z:k(F,W){B(!c.$19||!c.$19[F])m c;o 1p=c.$19[F].1P.3S(W);B(1p==-1)m c;o 1s=c.$19[F].1P.6y(1p,1)[0];o J=c.$19[F].1J.6y(1p,1)[0];o 2w=Q.2q[F];B(2w){B(2w.2H)2w.2H.1S(c,W);B(2w.F)F=2w.F}m c.3j(F,J)},6B:k(1Y){m Q.6w(c,\'1I\',1Y)},6G:k(F){B(!c.$19)m c;B(!F){M(o 6t 1b c.$19)c.6G(6t);c.$19=1F}17 B(c.$19[F]){c.$19[F].1P.1o(k(W){c.3Z(F,W)},c);c.$19[F]=1F}m c},1i:k(F,1q,2k){B(!c.$19||!c.$19[F])m c;c.$19[F].1P.1o(k(W){W.3a({\'Y\':c,\'2k\':2k,\'1c\':1q})()},c);m c},9G:k(15,F){B(!15.$19)m c;B(!F){M(o 6t 1b 15.$19)c.9G(15,6t)}17 B(15.$19[F]){15.$19[F].1P.1o(k(W){c.1I(F,W)},c)}m c}};U.R(Q.2F.2q);P.R(Q.2F.2q);Q.R(Q.2F.2q);Q.2q=L 3y({\'8k\':{F:\'9E\',2K:k(I){I=L 2R(I);B(I.2p==c||c.7Z(I.2p))m;c.1i(\'8k\',I)}},\'8h\':{F:\'9D\',2K:k(I){I=L 2R(I);B(I.2p==c||c.7Z(I.2p))m;c.1i(\'8h\',I)}},\'5r\':{F:(U.7W)?\'9L\':\'5r\'}});7S.R({3g:k(Y,1q){m c.3a({\'Y\':Y,\'1c\':1q,\'I\':2R})}});29.R({eQ:k(a0){m L 29(c.3f(k(el){m(Q.57(el)==a0)}))},ai:k(1A,2D){o T=c.3f(k(el){m(el.1A&&el.1A.1l(1A,\' \'))});m(2D)?T:L 29(T)},ah:k(4w,2D){o T=c.3f(k(el){m(el.4w==4w)});m(2D)?T:L 29(T)},al:k(1w,7x,J,2D){o T=c.3f(k(el){o 2a=Q.6n(el,1w);B(!2a)m N;B(!7x)m 1e;23(7x){12\'=\':m(2a==J);12\'*=\':m(2a.1l(J));12\'^=\':m(2a.6p(0,J.V)==J);12\'$=\':m(2a.6p(2a.V-J.V)==J);12\'!=\':m(2a!=J);12\'~=\':m 2a.1l(J,\' \')}m N});m(2D)?T:L 29(T)}});k $E(1Q,3f){m($(3f)||P).a5(1Q)};k $eP(1Q,3f){m($(3f)||P).77(1Q)};$$.3M={\'5n\':/^(\\w*|\\*)(?:#([\\w-]+)|\\.([\\w-]+))?(?:\\[(\\w+)(?:([!*^$]?=)["\']?([^"\'\\]]*)["\']?)?])?$/,\'43\':{7C:k(1y,36,1f,i){o 2s=[36.eN?\'87:\':\'\',1f[1]];B(1f[2])2s.1k(\'[@4w="\',1f[2],\'"]\');B(1f[3])2s.1k(\'[1l(7y(" ", @4O, " "), " \',1f[3],\' ")]\');B(1f[4]){B(1f[5]&&1f[6]){23(1f[5]){12\'*=\':2s.1k(\'[1l(@\',1f[4],\', "\',1f[6],\'")]\');1D;12\'^=\':2s.1k(\'[cZ-eO(@\',1f[4],\', "\',1f[6],\'")]\');1D;12\'$=\':2s.1k(\'[eE(@\',1f[4],\', 2E-V(@\',1f[4],\') - \',1f[6].V,\' + 1) = "\',1f[6],\'"]\');1D;12\'=\':2s.1k(\'[@\',1f[4],\'="\',1f[6],\'"]\');1D;12\'!=\':2s.1k(\'[@\',1f[4],\'!="\',1f[6],\'"]\')}}17{2s.1k(\'[@\',1f[4],\']\')}}1y.1k(2s.2h(\'\'));m 1y},7B:k(1y,36,2D){o T=[];o 43=P.5M(\'.//\'+1y.2h(\'//\'),36,$$.3M.ak,eD.et,1F);M(o i=0,j=43.eu;i<j;i++)T.1k(43.es(i));m(2D)?T:L 29(T.2K($))}},\'a3\':{7C:k(1y,36,1f,i){B(i==0){B(1f[2]){o el=36.7f(1f[2]);B(!el||((1f[1]!=\'*\')&&(Q.57(el)!=1f[1])))m N;1y=[el]}17{1y=$A(36.35(1f[1]))}}17{1y=$$.3M.35(1y,1f[1]);B(1f[2])1y=29.ah(1y,1f[2],1e)}B(1f[3])1y=29.ai(1y,1f[3],1e);B(1f[4])1y=29.al(1y,1f[4],1f[5],1f[6],1e);m 1y},7B:k(1y,36,2D){m(2D)?1y:$$.5R(1y)}},ak:k(aj){m(aj==\'87\')?\'96://aQ.er.eo/ep/87\':N},35:k(36,6k){o 7Q=[];M(o i=0,j=36.V;i<j;i++)7Q.R(36[i].35(6k));m 7Q}};$$.3M.28=(U.43)?\'43\':\'a3\';Q.2F.7H={7e:k(1Q,2D){o 1y=[];1Q=1Q.5Y().66(\' \');M(o i=0,j=1Q.V;i<j;i++){o a2=1Q[i];o 1f=a2.2T($$.3M.5n);B(!1f)1D;1f[1]=1f[1]||\'*\';o 2s=$$.3M[$$.3M.28].7C(1y,c,1f,i);B(!2s)1D;1y=2s}m $$.3M[$$.3M.28].7B(1y,c,2D)},a5:k(1Q){m $(c.7e(1Q,1e)[0]||N)},77:k(1Q,2D){o T=[];1Q=1Q.66(\',\');M(o i=0,j=1Q.V;i<j;i++)T=T.7y(c.7e(1Q[i],1e));m(2D)?T:$$.5R(T)},ew:k(1A){m c.7e(\'.\'+1A)}};Q.R({7f:k(4w){o el=P.7f(4w);B(!el)m N;M(o 1r=el.3r;1r!=c;1r=1r.3r){B(!1r)m N}m el}});P.R(Q.2F.7H);Q.R(Q.2F.7H);Q.R({4b:k(){23(c.57()){12\'4o\':o 1J=[];$1o(c.C,k(3B){B(3B.eB)1J.1k($5F(3B.J,3B.21))});m(c.7O)?1J:1J[0];12\'99\':B(!(c.7P&&[\'eC\',\'eA\'].1l(c.F))&&![\'4y\',\'21\',\'ez\'].1l(c.F))1D;12\'9c\':m c.J}m N},9b:k(){m $$(c.35(\'99\'),c.35(\'4o\'),c.35(\'9c\'))},5l:k(){o 51=[];c.9b().1o(k(el){o 1w=el.1w;o J=el.4b();B(J===N||!1w||el.7M)m;o 7L=k(4x){51.1k(1w+\'=\'+6e(4x))};B($F(J)==\'1B\')J.1o(7L);17 7L(J)});m 51.2h(\'&\')}});Q.R({3x:k(x,y){c.67=x;c.6a=y},6N:k(){m{\'2J\':{\'x\':c.67,\'y\':c.6a},\'3n\':{\'x\':c.42,\'y\':c.3T},\'6M\':{\'x\':c.6H,\'y\':c.5N}}},3o:k(2m){2m=2m||[];o el=c,1t=0,1n=0;do{1t+=el.ex||0;1n+=el.ey||0;el=el.eT}6Y(el);2m.1o(k(G){1t-=G.67||0;1n-=G.6a||0});m{\'x\':1t,\'y\':1n}},aX:k(2m){m c.3o(2m).y},aW:k(2m){m c.3o(2m).x},4A:k(2m){o 1u=c.3o(2m);o O={\'2z\':c.42,\'2N\':c.3T,\'1t\':1u.x,\'1n\':1u.y};O.4k=O.1t+O.2z;O.3O=O.1n+O.2N;m O}});Q.2q.7K={7I:k(W){B(U.70){W.1S(c);m}o 5V=k(){B(U.70)m;U.70=1e;U.1H=$4Z(U.1H);c.1i(\'7K\')}.Y(c);B(P.5c&&U.4M){U.1H=k(){B([\'70\',\'8q\'].1l(P.5c))5V()}.4f(50)}17 B(P.5c&&U.31){B(!$(\'7J\')){o 59=(U.5b.f5==\'f7:\')?\'://0\':\'8n:f9(0)\';P.f3(\'<2W 4w="7J" eX 59="\'+59+\'"><\\/2W>\');$(\'7J\').6c=k(){B(c.5c==\'8q\')5V()}}}17{U.2A("4r",5V);P.2A("eV",5V)}}};U.f2=k(W){m c.1I(\'7K\',W)};U.R({8f:k(){B(c.65)m c.f0;B(c.8Y)m P.4H.90;m P.2X.90},8l:k(){B(c.65)m c.eZ;B(c.8Y)m P.4H.9e;m P.2X.9e},9w:k(){B(c.31)m 1d.1z(P.2X.42,P.2X.6H);B(c.4M)m P.4H.6H;m P.2X.6H},9x:k(){B(c.31)m 1d.1z(P.2X.3T,P.2X.5N);B(c.4M)m P.4H.5N;m P.2X.5N},8s:k(){m c.9v||P.2X.67},8u:k(){m c.9t||P.2X.6a},6N:k(){m{\'3n\':{\'x\':c.8f(),\'y\':c.8l()},\'6M\':{\'x\':c.9w(),\'y\':c.9x()},\'2J\':{\'x\':c.8s(),\'y\':c.8u()}}},3o:k(){m{\'x\':0,\'y\':0}}});o 1g={f8:{}};1g.2O=L 18({C:{45:18.1m,1T:18.1m,7m:18.1m,2b:k(p){m-(1d.as(1d.85*p)-1)/2},49:eY,2u:\'5a\',3Q:1e,9z:50},1j:k(C){c.G=c.G||1F;c.2U(C);B(c.C.1j)c.C.1j.1S(c)},2l:k(){o 3A=$3A();B(3A<c.3A+c.C.49){c.4l=c.C.2b((3A-c.3A)/c.C.49);c.4s();c.4p()}17{c.1R(1e);c.2i(c.14);c.1i(\'1T\',c.G,10);c.7t()}},2i:k(14){c.1a=14;c.4p();m c},4s:k(){c.1a=c.4t(c.15,c.14)},4t:k(15,14){m(14-15)*c.4l+15},1h:k(15,14){B(!c.C.3Q)c.1R();17 B(c.1H)m c;c.15=15;c.14=14;c.4h=c.14-c.15;c.3A=$3A();c.1H=c.2l.4f(1d.2r(ax/c.C.9z),c);c.1i(\'45\',c.G);m c},1R:k(2f){B(!c.1H)m c;c.1H=$4Z(c.1H);B(!2f)c.1i(\'7m\',c.G);m c},2w:k(15,14){m c.1h(15,14)},eW:k(2f){m c.1R(2f)}});1g.2O.3q(L 8b,L 2q,L 4i);1g.3s={4o:k(K,14){B(K.2t(/2G/i))m c.2M;B(14.1l&&14.1l(\' \'))m c.6D;m c.9q},2P:k(el,K,5d){B(!5d.1k)5d=[5d];o 15=5d[0],14=5d[1];B(!14&&14!=0){14=15;15=el.2j(K)}o 1x=c.4o(K,14);m{15:1x.2P(15),14:1x.2P(14),1x:1x}}};1g.3s.9q={2P:k(J){m 69(J)},55:k(15,14,2x){m 2x.4t(15,14)},4b:k(J,2u,K){B(2u==\'5a\'&&K!=\'22\')J=1d.2r(J);m J+2u}};1g.3s.6D={2P:k(J){m J.1k?J:J.66(\' \').2K(k(v){m 69(v)})},55:k(15,14,2x){o 1a=[];M(o i=0;i<15.V;i++)1a[i]=2x.4t(15[i],14[i]);m 1a},4b:k(J,2u,K){B(2u==\'5a\'&&K!=\'22\')J=J.2K(1d.2r);m J.2h(2u+\' \')+2u}};1g.3s.2M={2P:k(J){m J.1k?J:J.5H(1e)},55:k(15,14,2x){o 1a=[];M(o i=0;i<15.V;i++)1a[i]=1d.2r(2x.4t(15[i],14[i]));m 1a},4b:k(J){m\'1v(\'+J.2h(\',\')+\')\'}};1g.82=1g.2O.R({1j:k(el,K,C){c.G=$(el);c.K=K;c.1r(C)},5k:k(){m c.2i(0)},4s:k(){c.1a=c.1x.55(c.15,c.14,c)},2i:k(14){c.1x=1g.3s.4o(c.K,14);m c.1r(c.1x.2P(14))},1h:k(15,14){B(c.1H&&c.C.3Q)m c;o 2e=1g.3s.2P(c.G,c.K,[15,14]);c.1x=2e.1x;m c.1r(2e.15,2e.14)},4p:k(){c.G.1O(c.K,c.1x.4b(c.1a,c.C.2u,c.K))}});Q.R({f1:k(K,C){m L 1g.82(c,K,C)}});1g.4e=1g.2O.R({1j:k(el,C){c.G=$(el);c.1r(C)},4s:k(){M(o p 1b c.15)c.1a[p]=c.1x[p].55(c.15[p],c.14[p],c)},2i:k(14){o 2e={};c.1x={};M(o p 1b 14){c.1x[p]=1g.3s.4o(p,14[p]);2e[p]=c.1x[p].2P(14[p])}m c.1r(2e)},1h:k(O){B(c.1H&&c.C.3Q)m c;c.1a={};c.1x={};o 15={},14={};M(o p 1b O){o 2e=1g.3s.2P(c.G,p,O[p]);15[p]=2e.15;14[p]=2e.14;c.1x[p]=2e.1x}m c.1r(15,14)},4p:k(){M(o p 1b c.1a)c.G.1O(p,c.1x[p].4b(c.1a[p],c.C.2u,p))}});Q.R({3t:k(C){m L 1g.4e(c,C)}});1g.29=1g.2O.R({1j:k(T,C){c.T=$$(T);c.1r(C)},4s:k(){M(o i 1b c.15){o 5o=c.15[i],4a=c.14[i],3z=c.1x[i],5s=c.1a[i]={};M(o p 1b 5o)5s[p]=3z[p].55(5o[p],4a[p],c)}},2i:k(14){o 2e={};c.1x={};M(o i 1b 14){o 4a=14[i],3z=c.1x[i]={},9l=2e[i]={};M(o p 1b 4a){3z[p]=1g.3s.4o(p,4a[p]);9l[p]=3z[p].2P(4a[p])}}m c.1r(2e)},1h:k(O){B(c.1H&&c.C.3Q)m c;c.1a={};c.1x={};o 15={},14={};M(o i 1b O){o 7A=O[i],5o=15[i]={},4a=14[i]={},3z=c.1x[i]={};M(o p 1b 7A){o 2e=1g.3s.2P(c.T[i],p,7A[p]);5o[p]=2e.15;4a[p]=2e.14;3z[p]=2e.1x}}m c.1r(15,14)},4p:k(){M(o i 1b c.1a){o 5s=c.1a[i],3z=c.1x[i];M(o p 1b 5s)c.T[i].1O(p,3z[p].4b(5s[p],c.C.2u,p))}}});1g.ac=1g.2O.R({C:{2m:[],1C:{\'x\':0,\'y\':0}},1j:k(G,C){c.1a=[];c.G=$(G);c.1G={\'1R\':c.1R.Y(c,N)};c.1I(\'45\',k(){P.1I(\'5r\',c.1G.1R)}.Y(c));c.3Z(\'1T\',k(){P.3Z(\'5r\',c.1G.1R)}.Y(c));c.1r(C)},4s:k(){M(o i=0;i<2;i++)c.1a[i]=c.4t(c.15[i],c.14[i])},3x:k(x,y){B(c.1H&&c.C.3Q)m c;o el=c.G.6N();o 1J={\'x\':x,\'y\':y};M(o z 1b el.3n){o 1z=el.6M[z]-el.3n[z];B($2B(1J[z]))1J[z]=($F(1J[z])==\'4S\')?1J[z].1E(0,1z):1z;17 1J[z]=el.2J[z];1J[z]+=c.C.1C[z]}m c.1h([el.2J.x,el.2J.y],[1J.x,1J.y])},dr:k(){m c.3x(N,0)},dq:k(){m c.3x(N,\'bg\')},dl:k(){m c.3x(0,N)},dm:k(){m c.3x(\'bg\',N)},8z:k(el){o 1r=c.G.3o(c.C.2m);o 3u=$(el).3o(c.C.2m);m c.3x(3u.x-1r.x,3u.y-1r.y)},4p:k(){c.G.3x(c.1a[0],c.1a[1])}});1g.dn=1g.2O.R({C:{2d:\'8J\'},1j:k(el,C){c.G=$(el);c.3d=L Q(\'4K\',{\'8A\':$R(c.G.ba(\'34\'),{\'aT\':\'4y\'})}).6O(c.G).b8(c.G);c.G.1O(\'34\',0);c.2U(C);c.1a=[];c.1r(c.C);B(U.65)c.1I(\'1T\',k(){c.G.2H().25(c.3d)})},4s:k(){M(o i=0;i<2;i++)c.1a[i]=c.4t(c.15[i],c.14[i])},8J:k(){c.34=\'34-1n\';c.5z=\'2N\';c.1C=c.G.3T},8K:k(){c.34=\'34-1t\';c.5z=\'2z\';c.1C=c.G.42},bc:k(2d){c[2d||c.C.2d]();m c.1h([c.G.2j(c.34).3c(),c.3d.2j(c.5z).3c()],[0,c.1C])},be:k(2d){c[2d||c.C.2d]();m c.1h([c.G.2j(c.34).3c(),c.3d.2j(c.5z).3c()],[-c.1C,0])},5k:k(2d){c[2d||c.C.2d]();m c.2i([-c.1C,0])},41:k(2d){c[2d||c.C.2d]();m c.2i([0,c.1C])},en:k(2d){B(c.3d.3T==0||c.3d.42==0)m c.bc(2d);m c.be(2d)},4p:k(){c.G.1O(c.34,c.1a[0]+c.C.2u);c.3d.1O(c.5z,c.1a[1]+c.C.2u)}});1g.86=k(2b,2S){2S=2S||[];B($F(2S)!=\'1B\')2S=[2S];m $R(2b,{dC:k(1p){m 2b(1p,2S)},dD:k(1p){m 1-2b(1-1p,2S)},dE:k(1p){m(1p<=0.5)?2b(2*1p,2S)/2:(2-2b(2*(1-1p),2S))/2}})};1g.3m=L 3y({dB:k(p){m p}});1g.3m.R=k(7R){M(o 2b 1b 7R){1g.3m[2b]=L 1g.86(7R[2b]);1g.3m.88(2b)}};1g.3m.88=k(2b){[\'dA\',\'dx\',\'dy\'].1o(k(83){1g.3m[2b.5B()+83]=1g.3m[2b][\'dk\'+83]})};1g.3m.R({dj:k(p,x){m 1d.3J(p,x[0]||6)},d6:k(p){m 1d.3J(2,8*(p-1))},d7:k(p){m 1-1d.aD(1d.d8(p))},d5:k(p){m 1-1d.aD((1-p)*1d.85/2)},d4:k(p,x){x=x[0]||1.d0;m 1d.3J(p,2)*((x+1)*p-x)},d1:k(p){o J;M(o a=0,b=1;1;a+=b,b/=2){B(p>=(7-4*a)/11){J=-1d.3J((11-6*a-11*p)/4,2)+b*b;1D}}m J},d2:k(p,x){m 1d.3J(2,10*--p)*1d.as(20*p*1d.85*(x[0]||1)/3)}});[\'d9\',\'da\',\'dg\',\'dh\'].1o(k(2b,i){1g.3m[2b]=L 1g.86(k(p){m 1d.3J(p,[i+2])});1g.3m.88(2b)});o 3Y={};3Y.2O=L 18({C:{3K:N,2u:\'5a\',45:18.1m,au:18.1m,1T:18.1m,av:18.1m,8M:18.1m,1E:N,3F:{x:\'1t\',y:\'1n\'},4E:N,6u:6},1j:k(el,C){c.2U(C);c.G=$(el);c.3K=$(c.C.3K)||c.G;c.3i={\'1a\':{},\'1p\':{}};c.J={\'1h\':{},\'1a\':{}};c.1G={\'1h\':c.1h.3g(c),\'3V\':c.3V.3g(c),\'3L\':c.3L.3g(c),\'1R\':c.1R.Y(c)};c.6K();B(c.C.1j)c.C.1j.1S(c)},6K:k(){c.3K.1I(\'64\',c.1G.1h);m c},9K:k(){c.3K.3Z(\'64\',c.1G.1h);m c},1h:k(I){c.1i(\'au\',c.G);c.3i.1h=I.1M;o 1E=c.C.1E;c.1E={\'x\':[],\'y\':[]};M(o z 1b c.C.3F){B(!c.C.3F[z])6C;c.J.1a[z]=c.G.2j(c.C.3F[z]).3c();c.3i.1p[z]=I.1M[z]-c.J.1a[z];B(1E&&1E[z]){M(o i=0;i<2;i++){B($2B(1E[z][i]))c.1E[z][i]=($F(1E[z][i])==\'k\')?1E[z][i]():1E[z][i]}}}B($F(c.C.4E)==\'4S\')c.C.4E={\'x\':c.C.4E,\'y\':c.C.4E};P.2A(\'2V\',c.1G.3V);P.2A(\'6S\',c.1G.1R);c.1i(\'45\',c.G);I.1R()},3V:k(I){o aw=1d.2r(1d.dd(1d.3J(I.1M.x-c.3i.1h.x,2)+1d.3J(I.1M.y-c.3i.1h.y,2)));B(aw>c.C.6u){P.3j(\'2V\',c.1G.3V);P.2A(\'2V\',c.1G.3L);c.3L(I);c.1i(\'av\',c.G)}I.1R()},3L:k(I){c.5K=N;c.3i.1a=I.1M;M(o z 1b c.C.3F){B(!c.C.3F[z])6C;c.J.1a[z]=c.3i.1a[z]-c.3i.1p[z];B(c.1E[z]){B($2B(c.1E[z][1])&&(c.J.1a[z]>c.1E[z][1])){c.J.1a[z]=c.1E[z][1];c.5K=1e}17 B($2B(c.1E[z][0])&&(c.J.1a[z]<c.1E[z][0])){c.J.1a[z]=c.1E[z][0];c.5K=1e}}B(c.C.4E[z])c.J.1a[z]-=(c.J.1a[z]%c.C.4E[z]);c.G.1O(c.C.3F[z],c.J.1a[z]+c.C.2u)}c.1i(\'8M\',c.G);I.1R()},1R:k(){P.3j(\'2V\',c.1G.3V);P.3j(\'2V\',c.1G.3L);P.3j(\'6S\',c.1G.1R);c.1i(\'1T\',c.G)}});3Y.2O.3q(L 2q,L 4i);Q.R({e8:k(C){m L 3Y.2O(c,$2c({3F:{x:\'2z\',y:\'2N\'}},C))}});3Y.aM=3Y.2O.R({C:{6q:[],2g:N,2m:[]},1j:k(el,C){c.2U(C);c.G=$(el);c.6q=$$(c.C.6q);c.2g=$(c.C.2g);c.1u={\'G\':c.G.2j(\'1u\'),\'2g\':N};B(c.2g)c.1u.2g=c.2g.2j(\'1u\');B(![\'3X\',\'7h\'].1l(c.1u.G))c.1u.G=\'3X\';o 1n=c.G.2j(\'1n\').3c();o 1t=c.G.2j(\'1t\').3c();B(c.1u.G==\'3X\'&&![\'7h\',\'3X\',\'5S\'].1l(c.1u.2g)){1n=$2B(1n)?1n:c.G.aX(c.C.2m);1t=$2B(1t)?1t:c.G.aW(c.C.2m)}17{1n=$2B(1n)?1n:0;1t=$2B(1t)?1t:0}c.G.4z({\'1n\':1n,\'1t\':1t,\'1u\':c.1u.G});c.1r(c.G)},1h:k(I){c.3e=1F;B(c.2g){o 4J=c.2g.4A();o el=c.G.4A();B(c.1u.G==\'3X\'&&![\'7h\',\'3X\',\'5S\'].1l(c.1u.2g)){c.C.1E={\'x\':[4J.1t,4J.4k-el.2z],\'y\':[4J.1n,4J.3O-el.2N]}}17{c.C.1E={\'y\':[0,4J.2N-el.2N],\'x\':[0,4J.2z-el.2z]}}}c.1r(I)},3L:k(I){c.1r(I);o 3e=c.5K?N:c.6q.3f(c.b1,c).7Y();B(c.3e!=3e){B(c.3e)c.3e.1i(\'e2\',[c.G,c]);c.3e=3e?3e.1i(\'e3\',[c.G,c]):1F}m c},b1:k(el){el=el.4A(c.C.2m);o 1a=c.3i.1a;m(1a.x>el.1t&&1a.x<el.4k&&1a.y<el.3O&&1a.y>el.1n)},1R:k(){B(c.3e&&!c.5K)c.3e.1i(\'eb\',[c.G,c]);17 c.G.1i(\'ec\',c);c.1r();m c}});Q.R({ei:k(C){m L 3Y.aM(c,C)}});o 6h=L 18({C:{28:\'4T\',9p:1e,93:18.1m,4L:18.1m,6E:18.1m,aS:1e,5J:\'ej-8\',9m:N,4B:{}},7r:k(){c.2y=(U.7d)?L 7d():(U.31?L aO(\'ek.eh\'):N);m c},1j:k(C){c.7r().2U(C);c.C.5G=c.C.5G||c.5G;c.4B={};B(c.C.aS&&c.C.28==\'4T\'){o 5J=(c.C.5J)?\'; eg=\'+c.C.5J:\'\';c.5i(\'9Q-F\',\'ab/x-aQ-ed-ee\'+5J)}B(c.C.1j)c.C.1j.1S(c)},9g:k(){B(c.2y.5c!=4||!c.4W)m;c.4W=N;o 4C=0;5f{4C=c.2y.4C}4X(e){};B(c.C.5G.1S(c,4C))c.4L();17 c.6E();c.2y.6c=18.1m},5G:k(4C){m((4C>=e0)&&(4C<dN))},4L:k(){c.3w={\'21\':c.2y.dO,\'5q\':c.2y.dP};c.1i(\'4L\',[c.3w.21,c.3w.5q]);c.7t()},6E:k(){c.1i(\'6E\',c.2y)},5i:k(1w,J){c.4B[1w]=J;m c},5y:k(2L,1U){B(c.C.9m)c.98();17 B(c.4W)m c;c.4W=1e;B(1U&&c.C.28==\'4N\')2L=2L+(2L.1l(\'?\')?\'&\':\'?\')+1U,1U=1F;c.2y.dM(c.C.28,2L,c.C.9p);c.2y.6c=c.9g.Y(c);B((c.C.28==\'4T\')&&c.2y.dL)c.5i(\'dH\',\'dI\');$R(c.4B,c.C.4B);M(o F 1b c.4B)5f{c.2y.dJ(F,c.4B[F])}4X(e){};c.1i(\'93\');c.2y.5y($5F(1U,1F));m c},98:k(){B(!c.4W)m c;c.4W=N;c.2y.aC();c.2y.6c=18.1m;c.7r();c.1i(\'7m\');m c}});6h.3q(L 8b,L 2q,L 4i);o a9=6h.R({C:{1U:1F,7o:1F,1T:18.1m,72:N,7U:N},1j:k(2L,C){c.1I(\'4L\',c.1T);c.2U(C);c.C.1U=c.C.1U||c.C.a7;B(![\'4T\',\'4N\'].1l(c.C.28)){c.5p=\'5p=\'+c.C.28;c.C.28=\'4T\'}c.1r();c.5i(\'X-dR-dX\',\'7d\');c.5i(\'dY\',\'21/8n, 21/dZ, ab/5q, 21/5q, */*\');c.2L=2L},1T:k(){B(c.C.7o)$(c.C.7o).1m().5Q(c.3w.21);B(c.C.72||c.C.7U)c.72();c.1i(\'1T\',[c.3w.21,c.3w.5q],20)},9C:k(1U){1U=1U||c.C.1U;23($F(1U)){12\'G\':1U=$(1U).5l();1D;12\'2C\':1U=7c.5l(1U)}B(c.5p)1U=(1U)?[c.5p,1U].2h(\'&\'):c.5p;m c.5y(c.2L,1U)},72:k(){B(c.C.7U||/(dT|dU)2W/.2t(c.9Z(\'9Q-F\')))o 4d=c.3w.21;17{o 2W,4d=[],5n=/<2W[^>]*>([\\s\\S]*?)<\\/2W>/dS;6Y((2W=5n.dV(c.3w.21)))4d.1k(2W[1]);4d=4d.2h(\'\\n\')}B(4d)(U.9N)?U.9N(4d):U.9H(4d,0)},9Z:k(1w){5f{m c.2y.dW(1w)}4X(e){};m 1F}});7c.5l=k(1Y){o 51=[];M(o K 1b 1Y)51.1k(6e(K)+\'=\'+6e(1Y[K]));m 51.2h(\'&\')};Q.R({5y:k(C){m L a9(c.6n(\'dQ\'),$2c({a7:c.5l()},C,{28:\'4T\'})).9C()}});o 3I=L 3y({C:{6f:N,6i:N,49:N,56:N},2i:k(1s,J,C){C=$2c(c.C,C);J=6e(J);B(C.6f)J+=\'; 6f=\'+C.6f;B(C.6i)J+=\'; 6i=\'+C.6i;B(C.49){o 6x=L 97();6x.dK(6x.bf()+C.49*24*60*60*ax);J+=\'; e1=\'+6x.ef()}B(C.56)J+=\'; 56\';P.4D=1s+\'=\'+J;m $R(C,{\'1s\':1s,\'J\':J})},4N:k(1s){o J=P.4D.2T(\'(?:^|;)\\\\s*\'+1s.aK()+\'=([^;]*)\');m J?e5(J[1]):N},2H:k(4D,C){B($F(4D)==\'2C\')c.2i(4D.1s,\'\',$2c(4D,{49:-1}));17 c.2i(4D,\'\',$2c(C,{49:-1}))}});o 3G={4u:k(O){23($F(O)){12\'2E\':m\'"\'+O.3l(/(["\\\\])/g,\'\\\\$1\')+\'"\';12\'1B\':m\'[\'+O.2K(3G.4u).2h(\',\')+\']\';12\'2C\':o 2E=[];M(o K 1b O)2E.1k(3G.4u(K)+\':\'+3G.4u(O[K]));m\'{\'+2E.2h(\',\')+\'}\'}m 6W(O)},5M:k(4q,56){m(($F(4q)!=\'2E\')||(56&&!4q.2t(/^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+e4-u \\n\\r\\t])+?$/)))?N:e6(\'(\'+4q+\')\')}};3G.e7=6h.R({1j:k(2L,C){c.2L=2L;c.1I(\'4L\',c.1T);c.1r(C);c.5i(\'X-ea\',\'e9\')},5y:k(O){m c.1r(c.2L,\'dG=\'+3G.4u(O))},1T:k(){c.1i(\'1T\',3G.5M(c.3w.21,c.C.56))}});o bb=L 3y({8n:k(1Y,1K){1K=$2c({\'5A\':18.1m},1K);o 2W=L Q(\'2W\',{\'59\':1Y}).6B({\'4r\':1K.5A,\'dF\':k(){B(c.5c==\'8q\')c.1i(\'4r\')}});5j 1K.5A;m 2W.6j(1K).25(P.6s)},1x:k(1Y,1K){m L Q(\'4m\',$2c({\'95\':\'dc\',\'db\':\'de\',\'F\':\'21/1x\',\'5h\':1Y},1K)).25(P.6s)},58:k(1Y,1K){1K=$2c({\'5A\':18.1m,\'df\':18.1m,\'di\':18.1m},1K);o 58=L d3();58.59=1Y;o G=L Q(\'8t\',{\'59\':1Y});[\'4r\',\'aC\',\'dz\'].1o(k(F){o I=1K[\'5C\'+F];5j 1K[\'5C\'+F];G.1I(F,k(){c.3Z(F,1c.8r);I.1S(c)})});B(58.2z&&58.2N)G.1i(\'4r\',G,1);m G.6j(1K)},6F:k(5e,C){C=$2c({1T:18.1m,b6:18.1m},C);B(!5e.1k)5e=[5e];o 6F=[];o 6m=0;5e.1o(k(1Y){o 8t=L bb.58(1Y,{\'5A\':k(){C.b6.1S(c,6m);6m++;B(6m==5e.V)C.1T()}});6F.1k(8t)});m L 29(6F)}});o 3H=L 18({V:0,1j:k(2C){c.O=2C||{};c.5u()},4N:k(1s){m(c.6L(1s))?c.O[1s]:1F},6L:k(1s){m(1s 1b c.O)},2i:k(1s,J){B(!c.6L(1s))c.V++;c.O[1s]=J;m c},5u:k(){c.V=0;M(o p 1b c.O)c.V++;m c},2H:k(1s){B(!c.6L(1s))m c;5j c.O[1s];c.V--;m c},1o:k(W,Y){$1o(c.O,W,Y)},R:k(O){$R(c.O,O);m c.5u()},2c:k(){c.O=$2c.3U(1F,[c.O].R(1c));m c.5u()},1m:k(){c.O={};c.V=0;m c},1P:k(){o 1P=[];M(o K 1b c.O)1P.1k(K);m 1P},1J:k(){o 1J=[];M(o K 1b c.O)1J.1k(c.O[K]);m 1J}});k $H(O){m L 3H(O)};3H.3I=3H.R({1j:k(1w,C){c.1w=1w;c.C=$R({\'bj\':1e},C||{});c.4r()},bd:k(){B(c.V==0){3I.2H(c.1w,c.C);m 1e}o 4q=3G.4u(c.O);B(4q.V>dv)m N;3I.2i(c.1w,4q,c.C);m 1e},4r:k(){c.O=3G.5M(3I.4N(c.1w),1e)||{};c.5u()}});3H.3I.2F={};[\'R\',\'2i\',\'2c\',\'1m\',\'2H\'].1o(k(28){3H.3I.2F[28]=k(){3H.1L[28].3U(c,1c);B(c.C.bj)c.bd();m c}});3H.3I.3q(3H.3I.2F);o 2M=L 18({1j:k(2G,F){F=F||(2G.1k?\'1v\':\'3C\');o 1v,2n;23(F){12\'1v\':1v=2G;2n=1v.8d();1D;12\'2n\':1v=2G.9r();2n=2G;1D;5D:1v=2G.5H(1e);2n=1v.8d()}1v.2n=2n;1v.3C=1v.5I();m $R(1v,2M.1L)},4R:k(){o 5m=$A(1c);o 6Z=($F(5m[5m.V-1])==\'4S\')?5m.dp():50;o 1v=c.8m();5m.1o(k(2G){2G=L 2M(2G);M(o i=0;i<3;i++)1v[i]=1d.2r((1v[i]/ 3b * (3b - 6Z)) + (2G[i] /3b*6Z))});m L 2M(1v,\'1v\')},du:k(){m L 2M(c.2K(k(J){m 53-J}))},dt:k(J){m L 2M([J,c.2n[1],c.2n[2]],\'2n\')},ds:k(6X){m L 2M([c.2n[0],6X,c.2n[2]],\'2n\')},em:k(6X){m L 2M([c.2n[0],c.2n[1],6X],\'2n\')}});k $eq(r,g,b){m L 2M([r,g,b],\'1v\')};k $f6(h,s,b){m L 2M([h,s,b],\'2n\')};2I.R({8d:k(){o 5t=c[0],5v=c[1],73=c[2];o 2Z,6l,8g;o 1z=1d.1z(5t,5v,73),3p=1d.3p(5t,5v,73);o 4l=1z-3p;8g=1z/53;6l=(1z!=0)?4l/1z:0;B(6l==0){2Z=0}17{o 8c=(1z-5t)/4l;o 8R=(1z-5v)/4l;o br=(1z-73)/4l;B(5t==1z)2Z=br-8R;17 B(5v==1z)2Z=2+8c-br;17 2Z=4+8R-8c;2Z/=6;B(2Z<0)2Z++}m[1d.2r(2Z*9y),1d.2r(6l*3b),1d.2r(8g*3b)]},9r:k(){o br=1d.2r(c[2]/3b*53);B(c[1]==0){m[br,br,br]}17{o 2Z=c[0]%9y;o f=2Z%60;o p=1d.2r((c[2]*(3b-c[1]))/f4*53);o q=1d.2r((c[2]*(9s-c[1]*f))/9u*53);o t=1d.2r((c[2]*(9s-c[1]*(60-f)))/9u*53);23(1d.an(2Z/60)){12 0:m[br,t,p];12 1:m[q,br,p];12 2:m[p,br,t];12 3:m[p,q,br];12 4:m[t,p,br];12 5:m[br,p,q]}}m N}});o 9B=L 18({C:{5W:20,8w:1,79:k(x,y){c.G.3x(x,y)}},1j:k(G,C){c.2U(C);c.G=$(G);c.8j=([U,P].1l(G))?$(P.4H):c.G},1h:k(){c.8i=c.9a.3g(c);c.8j.2A(\'2V\',c.8i)},1R:k(){c.8j.3j(\'2V\',c.8i);c.1H=$4Z(c.1H)},9a:k(I){c.1M=(c.G==U)?I.9d:I.1M;B(!c.1H)c.1H=c.2J.4f(50,c)},2J:k(){o el=c.G.6N();o 1p=c.G.3o();o 4h={\'x\':0,\'y\':0};M(o z 1b c.1M){B(c.1M[z]<(c.C.5W+1p[z])&&el.2J[z]!=0)4h[z]=(c.1M[z]-c.C.5W-1p[z])*c.C.8w;17 B(c.1M[z]+c.C.5W>(el.3n[z]+1p[z])&&el.2J[z]+el.3n[z]!=el.6M[z])4h[z]=(c.1M[z]-el.3n[z]+c.C.5W-1p[z])*c.C.8w}B(4h.y||4h.x)c.1i(\'79\',[el.2J.x+4h.x,el.2J.y+4h.y])}});9B.3q(L 2q,L 4i);o 8G=L 18({C:{79:18.1m,1T:18.1m,8P:k(1p){c.48.1O(c.p,1p)},2d:\'8K\',6r:3b,1C:0},1j:k(el,48,C){c.G=$(el);c.48=$(48);c.2U(C);c.8O=-1;c.8N=-1;c.2l=-1;c.G.1I(\'64\',c.aa.3g(c));o 7j,1C;23(c.C.2d){12\'8K\':c.z=\'x\';c.p=\'1t\';7j={\'x\':\'1t\',\'y\':N};1C=\'42\';1D;12\'8J\':c.z=\'y\';c.p=\'1n\';7j={\'x\':N,\'y\':\'1n\'};1C=\'3T\'}c.1z=c.G[1C]-c.48[1C]+(c.C.1C*2);c.a1=c.48[1C]/2;c.a6=c.G[\'4N\'+c.p.8I()].Y(c.G);c.48.1O(\'1u\',\'7h\').1O(c.p,-c.C.1C);o 8L={};8L[c.z]=[-c.C.1C,c.1z-c.C.1C];c.3L=L 3Y.2O(c.48,{1E:8L,3F:7j,6u:0,45:k(){c.75()}.Y(c),8M:k(){c.75()}.Y(c),1T:k(){c.75();c.2f()}.Y(c)});B(c.C.1j)c.C.1j.1S(c)},2i:k(2l){c.2l=2l.1E(0,c.C.6r);c.78();c.2f();c.1i(\'8P\',c.a4(c.2l));m c},aa:k(I){o 1u=I.1M[c.z]-c.a6()-c.a1;1u=1u.1E(-c.C.1C,c.1z-c.C.1C);c.2l=c.8H(1u);c.78();c.2f();c.1i(\'8P\',1u)},75:k(){c.2l=c.8H(c.3L.J.1a[c.z]);c.78()},78:k(){B(c.8O!=c.2l){c.8O=c.2l;c.1i(\'79\',c.2l)}},2f:k(){B(c.8N!==c.2l){c.8N=c.2l;c.1i(\'1T\',c.2l+\'\')}},8H:k(1u){m 1d.2r((1u+c.C.1C)/c.1z*c.C.6r)},a4:k(2l){m c.1z*2l/c.C.6r}});8G.3q(L 2q);8G.3q(L 4i);o ev=1g.ac.R({1j:k(C){c.1r(U,C);c.68=(c.C.68)?$$(c.C.68):$$(P.68);o 5b=U.5b.5h.2T(/^[^#]*/)[0]+\'#\';c.68.1o(k(4m){B(4m.5h.3S(5b)!=0)m;o 3E=4m.5h.6p(5b.V);B(3E&&$(3E))c.ag(4m,3E)},c);B(!U.65)c.1I(\'1T\',k(){U.5b.eU=c.3E})},ag:k(4m,3E){4m.1I(\'8p\',k(I){c.3E=3E;c.8z(3E);I.1R()}.3g(c))}});o 9S=L 18({C:{4I:N,45:18.1m,1T:18.1m,2Q:1e,6u:3,9I:k(G,2Q){2Q.1O(\'22\',0.7);G.1O(\'22\',0.7)},9T:k(G,2Q){G.1O(\'22\',1);2Q.2H();c.44.2H()}},1j:k(4U,C){c.2U(C);c.4U=$(4U);c.T=c.4U.8F();c.4I=(c.C.4I)?$$(c.C.4I):c.T;c.1G={\'1h\':[],\'62\':c.62.3g(c)};M(o i=0,l=c.4I.V;i<l;i++){c.1G.1h[i]=c.1h.3g(c,c.T[i])}c.6K();B(c.C.1j)c.C.1j.1S(c);c.1G.61=c.61.3g(c);c.1G.2f=c.2f.Y(c)},6K:k(){c.4I.1o(k(3K,i){3K.1I(\'64\',c.1G.1h[i])},c)},9K:k(){c.4I.1o(k(3K,i){3K.3Z(\'64\',c.1G.1h[i])},c)},1h:k(I,el){c.3R=el;c.8y=c.4U.4A();B(c.C.2Q){o 1u=el.3o();c.1C=I.1M.y-1u.y;c.44=L Q(\'4K\').25(P.4H);c.2Q=el.9M().25(c.44).4z({\'1u\':\'3X\',\'1t\':1u.x,\'1n\':I.1M.y-c.1C});P.2A(\'2V\',c.1G.62);c.1i(\'9I\',[el,c.2Q])}P.2A(\'2V\',c.1G.61);P.2A(\'6S\',c.1G.2f);c.1i(\'45\',el);I.1R()},62:k(I){o J=I.1M.y-c.1C;J=J.1E(c.8y.1n,c.8y.3O-c.2Q.3T);c.2Q.1O(\'1n\',J);I.1R()},61:k(I){c.3R.3R=1e;c.2o=c.2o||I.1M.y;c.1a=I.1M.y;o 5Z=((c.2o-c.1a)<=0)?\'8C\':\'8B\';o 6v=c.3R.9F();o 3v=c.3R.8x();B(6v&&5Z==\'8B\'){o 9O=6v.4A();B(I.1M.y<9O.3O)c.3R.8o(6v)}B(3v&&5Z==\'8C\'){o 9V=3v.4A();B(I.1M.y>9V.1n)c.3R.6O(3v)}c.2o=I.1M.y},eF:k(){o 8E=[];c.4U.8F().1o(k(el,i){8E[i]=c.T.3S(el)},c);m 8E},2f:k(){c.2o=1F;P.3j(\'2V\',c.1G.61);P.3j(\'6S\',c.1G.2f);B(c.C.2Q){P.3j(\'2V\',c.1G.62);c.1i(\'9T\',[c.3R,c.2Q])}c.1i(\'1T\',c.3R)}});9S.3q(L 2q,L 4i);o ar=L 18({C:{az:k(4c){4c.1O(\'4G\',\'8D\')},ay:k(4c){4c.1O(\'4G\',\'4y\')},8v:30,9j:3b,9k:3b,1A:\'bJ\',5P:{\'x\':16,\'y\':16},5S:N},1j:k(T,C){c.2U(C);c.4g=L Q(\'4K\',{\'4O\':c.C.1A+\'-4c\',\'8A\':{\'1u\':\'3X\',\'1n\':\'0\',\'1t\':\'0\',\'4G\':\'4y\'}}).25(P.4H);c.3d=L Q(\'4K\').25(c.4g);$$(T).1o(c.ae,c);B(c.C.1j)c.C.1j.1S(c)},ae:k(el){el.$1X.47=(el.5h&&el.57()==\'a\')?el.5h.3l(\'96://\',\'\'):(el.95||N);B(el.5g){o 6b=el.5g.66(\'::\');B(6b.V>1){el.$1X.47=6b[0].5Y();el.$1X.5T=6b[1].5Y()}17{el.$1X.5T=el.5g}el.94(\'5g\')}17{el.$1X.5T=N}B(el.$1X.47&&el.$1X.47.V>c.C.8v)el.$1X.47=el.$1X.47.6p(0,c.C.8v-1)+"&cu;";el.1I(\'8k\',k(I){c.1h(el);B(!c.C.5S)c.8e(I);17 c.1u(el)}.Y(c));B(!c.C.5S)el.1I(\'2V\',c.8e.3g(c));o 2f=c.2f.Y(c);el.1I(\'8h\',2f);el.1I(\'44\',2f)},1h:k(el){c.3d.1m();B(el.$1X.47){c.5g=L Q(\'9f\').25(L Q(\'4K\',{\'4O\':c.C.1A+\'-5g\'}).25(c.3d)).5Q(el.$1X.47)}B(el.$1X.5T){c.21=L Q(\'9f\').25(L Q(\'4K\',{\'4O\':c.C.1A+\'-21\'}).25(c.3d)).5Q(el.$1X.5T)}$4Z(c.1H);c.1H=c.41.2k(c.C.9j,c)},2f:k(I){$4Z(c.1H);c.1H=c.5k.2k(c.C.9k,c)},1u:k(G){o 1p=G.3o();c.4g.4z({\'1t\':1p.x+c.C.5P.x,\'1n\':1p.y+c.C.5P.y})},8e:k(I){o aE={\'x\':U.8f(),\'y\':U.8l()};o 2J={\'x\':U.8s(),\'y\':U.8u()};o 4c={\'x\':c.4g.42,\'y\':c.4g.3T};o 1V={\'x\':\'1t\',\'y\':\'1n\'};M(o z 1b 1V){o 1p=I.1M[z]+c.C.5P[z];B((1p+4c[z]-2J[z])>aE[z])1p=I.1M[z]-c.C.5P[z]-4c[z];c.4g.1O(1V[z],1p)}},41:k(){B(c.C.aG)c.1H=c.5k.2k(c.C.aG,c);c.1i(\'az\',[c.4g])},5k:k(){c.1i(\'ay\',[c.4g])}});ar.3q(L 2q,L 4i);o cd=L 18({1j:k(){c.5E=$A(1c);c.19={};c.4P={}},1I:k(F,W){c.4P[F]=c.4P[F]||{};c.19[F]=c.19[F]||[];B(c.19[F].1l(W))m N;17 c.19[F].1k(W);c.5E.1o(k(5x,i){5x.1I(F,c.3V.Y(c,[F,5x,i]))},c);m c},3V:k(F,5x,i){c.4P[F][i]=1e;o 4v=c.5E.4v(k(2a,j){m c.4P[F][j]||N},c);B(!4v)m;c.5E.1o(k(2a,j){c.4P[F][j]=N},c);c.19[F].1o(k(I){I.1S(c,c.5E,5x)},c)}});o 7n=1g.29.R({C:{8Q:18.1m,aN:18.1m,3D:0,41:N,2N:1e,2z:N,22:1e,6g:N,6A:N,3Q:N,74:N},1j:k(){o C,2v,T,2g;$1o(1c,k(4n,i){23($F(4n)){12\'2C\':C=4n;1D;12\'G\':2g=$(4n);1D;5D:o 2s=$$(4n);B(!2v)2v=2s;17 T=2s}});c.2v=2v||[];c.T=T||[];c.2g=$(2g);c.2U(C);c.2o=-1;B(c.C.74)c.C.3Q=1e;B($2B(c.C.41)){c.C.3D=N;c.2o=c.C.41}B(c.C.1h){c.C.3D=N;c.C.41=N}c.3t={};B(c.C.22)c.3t.22=\'b2\';B(c.C.2z)c.3t.2z=c.C.6A?\'b0\':\'42\';B(c.C.2N)c.3t.2N=c.C.6g?\'aU\':\'5N\';M(o i=0,l=c.2v.V;i<l;i++)c.aV(c.2v[i],c.T[i]);c.T.1o(k(el,i){B(c.C.41===i)c.1i(\'8Q\',[c.2v[i],el]);17 M(o 2x 1b c.3t)el.1O(2x,0)},c);c.1r(c.T);B($2B(c.C.3D))c.3D(c.C.3D)},aV:k(3k,G,1p){3k=$(3k);G=$(G);o 2t=c.2v.1l(3k);o 3N=c.2v.V;c.2v.5w(3k);c.T.5w(G);B(3N&&(!2t||1p)){1p=$5F(1p,3N-1);3k.8o(c.2v[1p]);G.6O(3k)}17 B(c.2g&&!2t){3k.25(c.2g);G.25(c.2g)}o aZ=c.2v.3S(3k);3k.1I(\'8p\',c.3D.Y(c,aZ));B(c.C.2N)G.4z({\'4F-1n\':0,\'2Y-1n\':\'6I\',\'4F-3O\':0,\'2Y-3O\':\'6I\'});B(c.C.2z)G.4z({\'4F-1t\':0,\'2Y-1t\':\'6I\',\'4F-4k\':0,\'2Y-4k\':\'6I\'});G.b2=1;B(c.C.6A)G.b0=c.C.6A;B(c.C.6g)G.aU=c.C.6g;G.1O(\'aT\',\'4y\');B(!2t)M(o 2x 1b c.3t)G.1O(2x,0);m c},3D:k(26){26=($F(26)==\'G\')?c.T.3S(26):26;B((c.1H&&c.C.3Q)||(26===c.2o&&!c.C.74))m c;c.2o=26;o O={};c.T.1o(k(el,i){O[i]={};B((i!=26)||(c.C.74&&(el.3T>0))){c.1i(\'aN\',[c.2v[i],el]);M(o 2x 1b c.3t)O[i][2x]=0}17{c.1i(\'8Q\',[c.2v[i],el]);M(o 2x 1b c.3t)O[i][2x]=el[c.3t[2x]]}},c);m c.1h(O)},cV:k(26){m c.3D(26)}});1g.7n=7n;',62,940,'||||||||||||this||||||||function||return||var|||||||||||||if|options|||type|element||event|value|property|new|for|false|obj|document|Element|extend||elements|window|length|fn||bind||||case||to|from||else|Class|events|now|in|arguments|Math|true|param|Fx|start|fireEvent|initialize|push|contains|empty|top|each|pos|args|parent|key|left|position|rgb|name|css|items|max|className|array|offset|break|limit|null|bound|timer|addEvent|values|properties|prototype|page|result|setStyle|keys|selector|stop|call|onComplete|data|prop|props|tmp|source|style||text|opacity|switch||inject|index||method|Elements|current|transition|merge|mode|parsed|end|container|join|set|getStyle|delay|step|overflown|hsb|previous|relatedTarget|Events|round|temp|test|unit|togglers|custom|fx|transport|width|addListener|chk|object|nocash|string|Methods|color|remove|Array|scroll|map|url|Color|height|Base|parse|ghost|Event|params|match|setOptions|mousemove|script|documentElement|border|hue||ie||Garbage|margin|getElementsByTagName|context||||create|100|toInt|wrapper|overed|filter|bindWithEvent|item|mouse|removeListener|toggler|replace|Transitions|size|getPosition|min|implement|parentNode|CSS|effects|target|next|response|scrollTo|Abstract|iCss|time|option|hex|display|anchor|modifiers|Json|Hash|Cookie|pow|handle|drag|shared|len|bottom|returns|wait|active|indexOf|offsetHeight|apply|check|iterable|absolute|Drag|removeEvent||show|offsetWidth|xpath|trash|onStart||myTitle|knob|duration|iTo|getValue|tip|scripts|Styles|periodical|toolTip|change|Options|chains|right|delta|link|argument|select|increase|str|load|setNow|compute|toString|every|id|val|hidden|setStyles|getCoordinates|headers|status|cookie|grid|padding|visibility|body|handles|cont|div|onSuccess|webkit|get|class|checker|native|mix|number|post|list|collect|running|catch|htmlElement|clear||queryString|bit|255|results|getNow|secure|getTag|image|src|px|location|readyState|fromTo|sources|try|title|href|setHeader|delete|hide|toQueryString|colors|regexp|iFrom|_method|xml|mousewheel|iNow|red|setLength|green|include|instance|send|layout|onload|toLowerCase|on|default|instances|pick|isSuccess|hexToRgb|rgbToHex|encoding|out|precision|evaluate|scrollHeight|HTMLElement|offsets|setHTML|unique|fixed|myText|walk|domReady|area|parseInt|trim|direction||move|moveGhost|klass|mousedown|webkit419|split|scrollLeft|links|parseFloat|scrollTop|dual|onreadystatechange|fix|encodeURIComponent|domain|fixedHeight|XHR|path|setProperties|tagName|saturation|counter|getProperty|regex|substr|droppables|steps|head|evType|snap|prev|setMany|date|splice|Properties|fixedWidth|addEvents|continue|Multi|onFailure|images|removeEvents|scrollWidth|none|attempt|attach|hasKey|scrollSize|getSize|injectAfter|generic|code|mp|mouseup|included|brother|stopPropagation|String|percent|while|alpha|loaded|currentStyle|evalScripts|blue|alwaysHide|draggedKnob|preventDefault|getElementsBySelector|checkStep|onChange|Listeners|setProperty|Object|XMLHttpRequest|getElements|getElementById|typeof|relative|fKey|mod|proto|forEach|onCancel|Accordion|update|pageX|pageY|setTransport|nodeType|callChain|realType|addEventListener|clean|operator|concat|node|iProps|getItems|getParam|getMany|merged|hasClass|insertBefore|Dom|add|ie_ready|domready|qs|disabled|camelCase|multiple|checked|found|transitions|Function|charAt|evalResponse|RegExp|gecko|random|getLast|hasChild|pairs|appendChild|Style|easeType|first|PI|Transition|xhtml|compat|newArray|defined|Chain|rr|rgbToHsb|locate|getWidth|brightness|mouseleave|coord|mousemover|mouseenter|getHeight|copy|javascript|injectBefore|click|complete|callee|getScrollLeft|img|getScrollTop|maxTitleChars|velocity|getNext|coordinates|toElement|styles|up|down|visible|serial|getChildren|Slider|toStep|capitalize|vertical|horizontal|lim|onDrag|previousEnd|previousChange|onTick|onActive|gr|Top|Right|Bottom|Left|0px|Width|opera|nodeValue|clientWidth|fixStyle|borderShort|onRequest|removeAttribute|rel|http|Date|cancel|input|getCoords|getFormElements|textarea|client|clientHeight|span|onStateChange|clientX|firstChild|showDelay|hideDelay|iParsed|autoCancel|defaultView|hyphenate|async|Single|hsbToRgb|6000|pageYOffset|600000|pageXOffset|getScrollWidth|getScrollHeight|360|fps|childNodes|Scroller|request|mouseout|mouseover|getPrevious|cloneEvents|setTimeout|onDragStart|extended|detach|DOMMouseScroll|clone|execScript|prevPos|which|Content|clientY|Sortables|onDragComplete|fixRelatedTarget|nextPos|shift|wheelDelta|relatedTargetGecko|getHeader|tag|half|sel|normal|toPosition|getElement|getPos|postBody|picked|Ajax|clickedElement|application|Scroll|removeEventListener|build|unload|useLink|filterById|filterByClass|prefix|resolver|filterByAttribute|zoom|floor|Number||createElement|Tips|cos|interval|onBeforeStart|onSnap|distance|1000|onHide|onShow|before|after|abort|sin|win|elementsProperty|timeout|where|slice|toUpperCase|escapeRegExp|Merge|Move|onBackground|ActiveXObject|pp|www|constructor|urlEncoded|overflow|fullHeight|addSection|getLeft|getTop|ie6|idx|fullWidth|checkAgainst|fullOpacity|contents|toFloat|removeClass|onProgress|cssText|adopt|undefined|getStyles|Asset|slideIn|save|slideOut|getTime|full|addClass|setOpacity|autoSave|textnode|navigator|associate|styleFloat|some|getRandom|getFirst||srcElement|beforeunload|whitespace|detachEvent|attachEvent|lastChild|float|all|DOMElement|CollectGarbage|clearChain|chain|111|MooTools|version|zIndex|keydown|tool|execCommand|getComputedStyle|taintEnabled|getPropertyValue|menu|fromCharCode|keyCode|detail|control|ctrlKey|shiftKey|readOnly|cssFloat|alt|altKey|Sibling|120|wheel|metaKey|meta|nodeName|transparent|styleSheet|createTextNode|removeProperty|getProperties|injectInside|getBoxObjectFor|BackgroundImageCache|Group|boolean|htmlFor|webkit420|toggleClass|clearTimeout|borderColor|replaceWith|ie7|replaceChild|clearInterval|appendText|cloneNode|setAttribute|borderWidth|borderStyle|injectTop|hellip|removeChild|colspan|embed|tabindex|tabIndex|accessKey|accesskey|rowSpan|getParent|err|maxlength|maxLength|innerHTML|setInterval|iframe|getAttribute|pass|Document|times|attributes|rowspan|colSpan|hasLayout|khtml|collection|bindAsEventListener|showThisHideOpen|Native|Window|readonly|starts|618|Bounce|Elastic|Image|Back|Sine|Expo|Circ|acos|Quad|Cubic|media|stylesheet|sqrt|screen|onabort|Quart|Quint|onerror|Pow|ease|toLeft|toRight|Slide||pop|toBottom|toTop|setSaturation|setHue|invert|4096|rightClick|Out|InOut|error|In|linear|easeIn|easeOut|easeInOut|readystatechange|json|Connection|close|setRequestHeader|setTime|overrideMimeType|open|300|responseText|responseXML|action|Requested|gi|ecma|java|exec|getResponseHeader|With|Accept|html|200|expires|leave|over|Eaeflnr|decodeURIComponent|eval|Remote|makeResizable|JSON|Request|drop|emptydrop|form|urlencoded|toGMTString|charset|XMLHTTP|makeDraggable|utf|Microsoft||setBrightness|toggle|org|1999|RGB|w3|snapshotItem|UNORDERED_NODE_SNAPSHOT_TYPE|snapshotLength|SmoothScroll|getElementsByClassName|offsetLeft|offsetTop|password|radio|selected|checkbox|XPathResult|substring|serialize|enter|returnValue|cancelBubble|button|fromElement|esc|space|namespaceURI|with|ES|filterByTag|backspace|tab|offsetParent|hash|DOMContentLoaded|clearTimer|defer|500|innerHeight|innerWidth|effect|onDomReady|write|10000|protocol|HSB|https|Shared|void'.split('|'),0,{}))
//__________________________________________________________________________________________________________________//

// -> [FUNCIONES GENERALES]	
//		-> addGlobalJS(js)
//		-> addGlobalStyle(css)
//		-> getParam(name)
//		-> twHideFrame()
//		-> twEditOriginalElements()
//		-> twNumFormat(Qty)
//		-> twLoadingData(mode)
//
// -> [INICIALIZACIĂ“N]			
//		-> twInitialize()
//		-> twInitInterface()
//		-> twInitNewCSS()
//
// -> [OBTENCIĂ“N DE DATOS]
//		-> twGlobalResumeArmy_AddVillageInfo(village)
//		-> twGlobalResumeArmy()
//		-> twShowInfoArmy(village_id)
//		-> twShowInfoFarm()twShowInfoResources()
//		-> twGetVillageBuildingsLevel(village_id)
//		-> twGetVillageArmy(village_id, mode)
//		-> twGetpID()twInitVillageArmy(village_id)
//		-> twInitVillageBuildingsLevel(village_id)
//		-> twDataLoader(village_id, _load)
//
// -> [MENĂš PUEBLOS]	
//		-> twVillagesNavigator()
//		-> twVillagesListGenerator(min, max)
//		-> twGetVillageNum(id)
//		-> twInitVillagesList()
//		-> twGetVillagesList()
//
// -> [MAPA]
//		-> twMap()
//		-> twGlobalMap()
//	
// -> [BUSCADOR DE PUEBLOS]
// 		-> twVillagesFinderInterface()
// 		-> twVillagesFinder() 		
//
// -> [COMPACTADOR]
// 		-> twReportInterface()
// 		-> twPreviewReportGenerator(reportWithForumTags)
// 		-> twReportGenerator(reportInfo)
// 		-> twReportData()
//
// -> [NUEVAS FUNCIONALIDADES]	
// 		-> twSetSim()
//		-> TwSetVillageInfo()
//		-> twSetReport()	
//									
// -> [INIT]														


var DebugMode = 0 // 0 = off, 1 = on. Activa todos los GM_logs.

var baseURL = getParam('GETURL');	// Url del world al que estamos conectados
var wID = 0												// Mundo en el que nos encontramos
var wNum = 0											// Numero que identifica el mundo
var	pID = 0												// Identificador del jugador
var twGlobalInfo = new Array();	// Array con los datos globales del pueblo seleccionado
var twLinks = new Array();				// Array con todos los enlaces del TW.
var vID = 0;											// Identificador del Pueblo
var twUrlScreen = "";							// Url que srive de path para tw
var Attacking = "";
var Army = new Array();					// Contiene las Army de cada Pueblo
var Villages = new Array();			// Listado de pueblos
var nVillages = 0;								// Cantidad de Pueblos
var presentURL = ""	;							// Url Actual
var language = "";								// Idioma seleccionado
var twLanguage = new Array();		// Matriz de idiomas
var villagesBuildingsLevel = new Array(0);// Listado de los niveles de cada edificio
var infoPlayer = new Array();

var extImgsPath = "http://i184.photobucket.com/albums/x195/twextension/"; // Ruta de las imĂˇgenes
var twImgsPath = "http://www.plemiona.pl/graphic/"; 										//  Ruta para las imĂˇgenes originales de tw

var twUnitsNamesArray = new Array("spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob");
var twCostsByUnit = new Array( new Array(50,30,10), new Array(30,30,70), new Array(60,30,40), new Array(100,30,60), new Array(50,50,20), new Array(125,100,250), new Array(250,100,150), new Array(200,150,600), new Array(300,200,200), new Array(300,400,100), new Array(20,20,40), new Array(40000,50000,50000) );
var twFarmVillagersByUnit = new Array(1,1,1,1,2,4,5,6,5,8,10,100);
var twSpeedByUnit = new Array(18,22,18,18,9,10,10,11,30,30,10,35);

var twBuildingsNamesArray = new Array("main", "barracks", "stable", "garage", "snob", "smith", "place", "market", "wood", "stone", "iron", "farm", "storage", "hide", "wall");
var twBuildingsModesArray = new Array("build", "destroy", "command", "units", "sim", "send", "own_offer", "other_offer", "traders");

var twOtherNamesArray = new Array("holz", "lehm", "eisen", "res", "face","new_report", "read_mail", "links", "rechts", "unten", "oben","villages", "ally_forum");


// =================================================================================================================//
// FUNCIONES GENERALES
// =================================================================================================================//
// Method: addGlobalJS
// Summary: Agrega una script al head del documento html.
// Params: js
// Returns: nothing
function addGlobalJS(js) {
    var head, jscript;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    jscript = document.createElement('script');
    jscript.type = 'text/javascript';
    jscript.innerHTML = js;
    head.appendChild(jscript);
}
//__________________________________________________________________________________________________________________//

// Method: addGlobalStyle
// Summary: Permite editar/modificar las hojas de estilo
// Params: css
// Returns: nothing
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
//__________________________________________________________________________________________________________________//

// Method: getParam
// Summary: Busca y devuelve en la url en la que nos encontramos el string indicado (@name), sino lo encuentra
//					devuelve una cadena vacĂ­a.
// Params: name
// Returns: null o array de strings
function getParam(name) {
  if (name == 'GETURL') {
    var regexS = "(.*)/(.*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
  } else {
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
  }
  if( results == null )
    return "";
  else
    return results[1];
};
//__________________________________________________________________________________________________________________//
// Method: twHidesFrame
// Summary: Esconde el frame de publicidad
// Params: nothing
// Returns: nothing
function twHidesFrame()
{
	var adsFrame = window.parent.document.getElementsByName('sky');
	if(adsFrame[0] == null){
		url = document.location.href 
		window.parent.location.href = url+"&intro&no_top";
		return false;
	}
	else{
		window.parent.document.getElementsByTagName('frameset')[0].cols = "*, 0";
		return true;
	}
}
//__________________________________________________________________________________________________________________//
// Method: twEditOriginalElements
// Summary: 
// Params: nothing
// Returns: nothing
function twEditOriginalElements()
{
	//for(var i=0;i<$$('table').length;i++)
	//	GM_log($$('table')[i].innerTEXT)
	$$('table')[3].parentNode.removeChild($$('table')[3]);	
	$$('table')[2].parentNode.removeChild($$('table')[2]);
	$$('hr')[0].parentNode.removeChild($$('hr')[0]);

	// Reposicionar la tabla principal y mostrar barras de desplazamiento en el body.
	$$('.main')[0].setAttribute('align','');
	$$('.main')[0].setAttribute('width','');
	$$('.main')[0].setAttribute('style','top:0;left:0;width:840px;margin: 160px 0 0 96px;padding:0;z-index:40;');
	$$('body')[0].setAttribute('style','overflow:auto;background-image:url("'+twGlobalInfo["InterfaceBackgroundParts"][28]+'")')
	
}
//__________________________________________________________________________________________________________________//
// Method: twNumFormat
// Summary: 
// Params: nothing
// Returns: nothing
function twNumFormat(Qty)
{
	var numFormated ="";
	Qty += '';
	Qty = Qty.split("");
	for(var i=0;i<Qty.length;i++){
		numFormated += Qty[i];
		if((Qty.length-(i+1)) % 3 == 0 && (Qty.length-(i+1)) != 0) numFormated += ".";
	}
	return numFormated;
}
//__________________________________________________________________________________________________________________//
// Method: twLoadingData
// Summary: 
// Params: flag
// Returns: nothing
function twLoadingData(mode)
{
	if(mode == 0)
	{ 
		var newHTML = document.createElement("div");
		newHTML.setAttribute('id', 'LoadingData');
		newHTML.style.width = (document.body.scrollWidth < window.innerWidth?window.innerWidth: document.body.scrollWidth) + 'px';
		newHTML.style.height = (document.body.scrollHeight < window.innerHeight?window.innerHeight: document.body.scrollHeight) + 'px';
		newHTML.innerHTML = '<div style="width:300px;margin-top:150px;margin-bottom:auto;background-color:#F8F4E8;border:2px solid #804000;padding:30px 30px 30px 40px;margin-left:auto; margin-right:auto;"><img src="http://i184.photobucket.com/albums/x195/twextension/loading.gif" border="0" ><br><b>Loading</b></div>';
		document.body.insertBefore(newHTML, document.body.childNodes[1]);
	}
	else
		$('LoadingData').parentNode.removeChild($('LoadingData'));
}
//__________________________________________________________________________________________________________________//

// Method: 
// Summary: Evita el molesto mensaje y la redirecciĂłn obligatoria a la zona premium.
// Params: nothing
// Returns: nothing
/*
function(){
	//if(document.body.search(/window.setTimeout("scan_toolbox()", 200);/))
		document.replace('window.setTimeout("scan_toolbox()", 200);', '');
}*/

//__________________________________________________________________________________________________________________//
// =================================================================================================================//


// =================================================================================================================//
// [INICIALIZACIĂ“N]
// =================================================================================================================//

// Method: twInitialize
// Summary: Inicializa Tribal eXtension
// Params: nothing
// Returns: nothing
function twInitialize()
{
	// InicializaciĂłn de variables
	language = baseURL.match(/(es)|(de)|(pl)|(it)|(fr)|(ro)|(nl)|(net)/g)
	if(language == null)
		language = "es";
		
	if(getParam('screen') != "")
		presentURL += 	 "&screen="+getParam('screen');
	if(getParam('mode')!= "")
		presentURL += 	 "&mode="+getParam('mode');
	if(getParam('id') != "")
		presentURL += 	 "&id="+getParam('id');
	if(getParam('start') != "")
		presentURL += 	 "&id="+getParam('start');

	twUrlScreen = baseURL+'/game.php?';
	
	// Identificador del world
	// nombre del world mĂˇs el idioma, ej. w3es
	wID = baseURL.match(/\b[ds|tw|pl|w]\d\b/g) + language;
	wNum = baseURL.match(/[0123456789]/);

	pID = GM_getValue(wID+"_pID", 0);
	vID = document.evaluate('html/body/table[2]/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	vID = vID.substring( vID.indexOf("e=",0)+2, vID.indexOf("&amp;sc",0) );
	
	// Detecta si esta el modo vacaciones ON
	if( getParam('t') != ""){
		pID = getParam('t');
		twUrlScreen += 't='+pID+'&';
	}
	
	nVillages = GM_getValue(wID+"_"+pID+"_nVillages", 1);
	
	twLanguage["es"] = new Array();	
	twLanguage["es"]["mainMenu"] = new Array ("Logout", "Forum", "Chat", "Help", "Settings", "Premium", "Ranking", "Tribe", "Reports", "Mail"); 
	twLanguage["es"]["mainSubMenu"] = new Array("Perfil", "Correo Electr&oacute;nico", "Options", "Start Over", "Delete Account", "Conexi&oacute;n Compartida", "Modo Vacaciones", "Accesos", "Cambiar Contrase&ntilde;a", "Surveys", "Support", 
																							"Clasificaci&oacute;n por Adversarios Vencidos en Ataque", "Clasificaci&oacute;n por Adversarios vencidos en Defensa", "Clasificaci&oacute;n por Adeversarios Vencidos Total",
																							"Przegląd", "Członkowie", "Profil", "Dyplomacja", "Zaproszenia", "Wiadomośc powitalna", "Uprawnienia?",
																							"Wszystkie", "Atak", "Obrona", "Pomoc", "Handel", "Inne",
																							"Bandeja de Entrada", "Bandeja de Salida", "Archivo", "Crear Mensaje", "Bloquear Remitente");
	twLanguage["es"]["units"] = new Array("Spearmen", "Swordmen", "Axemen", "Archmen", "Scout", "Light Calvary", "Mounted Archer", "Heavy Calvary", "Ram", "Catapult", "Paladin", "Nobleman");
	twLanguage["es"]["buildings"] = new Array ("Village Headquarters", "Koszary", "Stajnia", "Warsztat", "Corte Aristocr&aacute;tica", "Herrer&iacute;a", "Plac", "Plaza de Mercado", "Los Le&ntilde;adores", "Barrera", "Mina de Hierro", "La Granja", "Almac&eacute;n", "El Escondrijo", "Muralla");
	twLanguage["es"]["resources"] = new Array ("Drewno", "Glina", "Ĺ»elazo", "Pojemność spichlerza");
	twLanguage["es"]["other"] = new Array("Mapa", "VisiĂłn general del pueblo");
	twLanguage["es"]["reportKeys"] = new Array("Bot&iacute;n:", "Da&ntilde;o con arietes", "Da&ntilde;o causado con catapultas", "Aprobaci&oacute;n disminuida", "Koszary", "unidades fuera", "Materias Primas espionados");
	twLanguage["es"]["report"] = new Array("Bot&iacute;n", "Da&ntilde;o con arietes", "Da&ntilde;o causado con catapultas", "Aprobaci&oacute;n disminuida", "Koszary", "unidades fuera", "Materias Primas espionados");

	twLinks["twMainMenuArray"] = new Array();
	twLinks["twMainMenuArray"]["logout"] = document.evaluate('/html/body/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	twLinks["twMainMenuArray"]["logout"] = twUrlScreen+"village="+vID+"&screen=&action=logout&h="+twLinks["twMainMenuArray"]["logout"].substring( twLinks["twMainMenuArray"]["logout"].indexOf("h=",0)+2, twLinks["twMainMenuArray"]["logout"].indexOf("\" ",0) );
	twLinks["twMainMenuArray"]["forum"] = "http://forum.tribalwars.net/index.php";
	twLinks["twMainMenuArray"]["chat"] = baseURL+"/chat.php";
	twLinks["twMainMenuArray"]["help"] = baseURL+"/help.php";
	
	twLinks["twMainMenuArray"]["settings"]= new Array();
		twLinks["twMainMenuArray"]["settings"][0] = twUrlScreen+"village="+vID+"&screen=settings&mode=profile";
		twLinks["twMainMenuArray"]["settings"][1] = twUrlScreen+"village="+vID+"&screen=settings&mode=email";
		twLinks["twMainMenuArray"]["settings"][2] = twUrlScreen+"village="+vID+"&screen=settings&mode=settings";
		twLinks["twMainMenuArray"]["settings"][3] = twUrlScreen+"village="+vID+"&screen=settings&mode=move";
		twLinks["twMainMenuArray"]["settings"][4] = twUrlScreen+"village="+vID+"&screen=settings&mode=delete";
		twLinks["twMainMenuArray"]["settings"][5] = twUrlScreen+"village="+vID+"&screen=settings&mode=share";
		twLinks["twMainMenuArray"]["settings"][6] = twUrlScreen+"village="+vID+"&screen=settings&mode=vacation";
		twLinks["twMainMenuArray"]["settings"][7] = twUrlScreen+"village="+vID+"&screen=settings&mode=logins";
		twLinks["twMainMenuArray"]["settings"][8] = twUrlScreen+"village="+vID+"&screen=settings&mode=change_passwd";
		twLinks["twMainMenuArray"]["settings"][9] = twUrlScreen+"village="+vID+"&screen=settings&mode=poll";
		twLinks["twMainMenuArray"]["settings"][10] = "http://www.tribalwars.net/ticket_login.php";
	
	twLinks["twMainMenuArray"]["premium"] = twUrlScreen+"village="+vID+"&screen=premium";
	 
	twLinks["twMainMenuArray"]["ranking"] = new Array();
		twLinks["twMainMenuArray"]["ranking"][0] = twUrlScreen+"village="+vID+"&screen=ranking&mode=player";
		twLinks["twMainMenuArray"]["ranking"][1] = twUrlScreen+"village="+vID+"&screen=ranking&mode=ally";
		twLinks["twMainMenuArray"]["ranking"][2] = twUrlScreen+"village="+vID+"&screen=ranking&mode=con_player";
		twLinks["twMainMenuArray"]["ranking"][3] = twUrlScreen+"village="+vID+"&screen=ranking&mode=con_ally";
	
	twLinks["twMainMenuArray"]["ally"] = new Array(); 
		twLinks["twMainMenuArray"]["ally"][0] = twUrlScreen+"village="+vID+"&screen=ally&mode=overview";
		twLinks["twMainMenuArray"]["ally"][1] = twUrlScreen+"village="+vID+"&screen=ally&mode=members";
		twLinks["twMainMenuArray"]["ally"][2] = twUrlScreen+"village="+vID+"&screen=ally&mode=profile";
		twLinks["twMainMenuArray"]["ally"][3] = twUrlScreen+"village="+vID+"&screen=ally&mode=contracts";
		twLinks["twMainMenuArray"]["ally"][4] = twUrlScreen+"village="+vID+"&screen=ally&mode=forum";
		twLinks["twMainMenuArray"]["ally"][5] = twUrlScreen+"village="+vID+"&screen=ally&mode=invite";
		twLinks["twMainMenuArray"]["ally"][6] = twUrlScreen+"village="+vID+"&screen=ally&mode=intro_igm";
		twLinks["twMainMenuArray"]["ally"][7] = twUrlScreen+"village="+vID+"&screen=ally&mode=properties";
		
	twLinks["twMainMenuArray"]["reports"] = new Array(); 
		twLinks["twMainMenuArray"]["reports"][0] = twUrlScreen+"village="+vID+"&screen=report&mode=all";
		twLinks["twMainMenuArray"]["reports"][1] = twUrlScreen+"village="+vID+"&screen=report&mode=attack";
		twLinks["twMainMenuArray"]["reports"][2] = twUrlScreen+"village="+vID+"&screen=report&mode=defense";
		twLinks["twMainMenuArray"]["reports"][3] = twUrlScreen+"village="+vID+"&screen=report&mode=support";
		twLinks["twMainMenuArray"]["reports"][4] = twUrlScreen+"village="+vID+"&screen=report&mode=trade";
		twLinks["twMainMenuArray"]["reports"][5] = twUrlScreen+"village="+vID+"&screen=report&mode=miscellaneous";
		twLinks["twMainMenuArray"]["reports"][6] = twUrlScreen+"village="+vID+"&screen=report&mode=forwarded";
		twLinks["twMainMenuArray"]["reports"][7] = twUrlScreen+"village="+vID+"&screen=report&mode=filter";
		twLinks["twMainMenuArray"]["reports"][8] = twUrlScreen+"village="+vID+"&screen=report&mode=blocksender";

	twLinks["twMainMenuArray"]["mails"] = new Array(); 
		twLinks["twMainMenuArray"]["mails"][0] = twUrlScreen+"village="+vID+"&screen=mail&mode=in";
		twLinks["twMainMenuArray"]["mails"][1] = twUrlScreen+"village="+vID+"&screen=mail&mode=out";
		twLinks["twMainMenuArray"]["mails"][2] = twUrlScreen+"village="+vID+"&screen=mail&mode=new";
		twLinks["twMainMenuArray"]["mails"][3] = twUrlScreen+"village="+vID+"&screen=mail&mode=block";
	
	twLinks["twMainMenuArray"]["map"] =  twUrlScreen+"village="+vID+"&screen=map"; 
	twLinks["twMainMenuArray"]["villages"] =  twUrlScreen+"village="+vID+"&screen=overview_villages"; 
	twLinks["twMainMenuArray"]["overview"] =  twUrlScreen+"village="+vID+"&screen=overview"; 
	twLinks["twMainMenuArray"]["graphicView"] = "";
	twLinks["twMainMenuArray"]["textView"] = "";
	
	// Enlaces: Edificios
	twLinks["twMainScreens"] = new Array();
	for(var i=0; i<twBuildingsNamesArray.length;i++)
		twLinks["twMainScreens"][i] = twUrlScreen+"village="+vID+"&screen="+twBuildingsNamesArray[i];
	
	// Enlaces: Subpantallas de los edificios
	twLinks["twSubScreens"] = new Array();
	for(var i=0; i<3;i++){
		for(var j=0; i<twBuildingsModesArray.length;i++)
			twLinks["twSubScreens"][i] = twLinks["twMainScreens"][i]+"&mode="+twBuildingsModesArray[j] ;
	}
	
	// Enlaces: MiniImĂˇgenes de los Edificios	
	twLinks["twBuildingsImg"] = new Array();
	for(var i=0; i<twBuildingsNamesArray.length;i++)
		twLinks["twBuildingsImg"][i] = twImgsPath+"buildings/"+twBuildingsNamesArray[i]+".png";	
	
	// Enlaces: MiniImĂˇgenes de las Unidades
	twLinks["twUnitsImg"] = new Array();
	for(var i=0; i<twUnitsNamesArray.length;i++)
		twLinks["twUnitsImg"][i] = twImgsPath+"unit/unit_"+twUnitsNamesArray[i]+".png";

	// Enlaces: MiniImĂˇgenes de los Recursos, granja y otros
	twLinks["twOtherImg"] = new Array();
	for(var i=0; i<twOtherNamesArray.length;i++)
		twLinks["twOtherImg"][i] = twImgsPath+twOtherNamesArray[i]+".png";
	
	// Enlaces: Herramientas y Utilidades
	twLinks["twUtils"] = new Array();
	twLinks["twUtils"][0] = "http://www.tw-tools.com/?lng=pl";
	twLinks["twUtils"][1] = "http://plemiona.netszkola.pl/";
	twLinks["twUtils"][2] = "http://kruk.lej.pl/";
	twLinks["twUtils"][3] = "http://plemiona.one.pl/";
	twLinks["twUtils"][4] = "http://gim.ventus.xon.pl/";
	twLinks["twUtils"][5] = "http://forum.plemiona.pl/attachment.php?attachmentid=541&d=1181906941";
	twLinks["twUtils"][6] = "http://plemionasite.xt.pl/formularz.html";
	twLinks["twUtils"][7] = "http://haste.ovh.org/RAC.exe";
	
	// Datos sobre los Recursos:
	// 0->Madera Almacenada, 1->Barro Almacenado, 2->Hierro Almacenado, 3->Capacidad AlmacĂ©n
	twGlobalInfo["resources"] = new Array();
	twGlobalInfo["resources"][0] = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[2]",document, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	twGlobalInfo["resources"][1] = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[4]",document, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	twGlobalInfo["resources"][2] = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[6]",document, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	twGlobalInfo["resources"][3] = document.evaluate('//*[@id="storage"]',document,null,XPathResult.STRING_TYPE,null).stringValue; 
	
	//Datos de la Granja:
	// 0->Espacios Usados, 1->Espacios Totales, 2->Espacios libres
	twGlobalInfo["farm"] = document.evaluate('/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td[2]/table/tbody/tr/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue.split("/");
	twGlobalInfo["farm"][2] = twGlobalInfo["farm"][1] - twGlobalInfo["farm"][0];
	
	// ImĂˇgenes de la interfaz:
	twGlobalInfo["InterfaceBackgroundParts"] = new Array();
		twGlobalInfo["InterfaceBackgroundParts"][0] = extImgsPath+"Interface6_01.png";
		twGlobalInfo["InterfaceBackgroundParts"][1] = extImgsPath+"Interface6_02.png";
		twGlobalInfo["InterfaceBackgroundParts"][2] = extImgsPath+"Interface6_03.png";	
		twGlobalInfo["InterfaceBackgroundParts"][3] = extImgsPath+"Interface6_04.png";
		twGlobalInfo["InterfaceBackgroundParts"][4] = extImgsPath+"Interface6_05.png";
		twGlobalInfo["InterfaceBackgroundParts"][5] = extImgsPath+"Interface6_07.png";
		twGlobalInfo["InterfaceBackgroundParts"][6] = extImgsPath+"Interface6_08.png";
		twGlobalInfo["InterfaceBackgroundParts"][7] = extImgsPath+"Interface6_09.png";
		twGlobalInfo["InterfaceBackgroundParts"][8] = extImgsPath+"Interface6_10.png";
		twGlobalInfo["InterfaceBackgroundParts"][9] = extImgsPath+"Interface6_11.png";
		twGlobalInfo["InterfaceBackgroundParts"][10] = extImgsPath+"Interface6_12.png";
		twGlobalInfo["InterfaceBackgroundParts"][11] = extImgsPath+"Interface6_13.png";
		twGlobalInfo["InterfaceBackgroundParts"][12] = extImgsPath+"Interface6_14.png";
		twGlobalInfo["InterfaceBackgroundParts"][13] = extImgsPath+"Interface6_15.png";
		twGlobalInfo["InterfaceBackgroundParts"][14] = extImgsPath+"Interface6_16.png";
		twGlobalInfo["InterfaceBackgroundParts"][15] = extImgsPath+"Interface6_17.png";
		twGlobalInfo["InterfaceBackgroundParts"][16] = extImgsPath+"Interface6_26.png";
		twGlobalInfo["InterfaceBackgroundParts"][17] = extImgsPath+"Interface6_20.png";
		twGlobalInfo["InterfaceBackgroundParts"][18] = extImgsPath+"Interface6_22.png";
		twGlobalInfo["InterfaceBackgroundParts"][19] = extImgsPath+"Interface_25.png";
		twGlobalInfo["InterfaceBackgroundParts"][20] = extImgsPath+"Interface_23.png";
		twGlobalInfo["InterfaceBackgroundParts"][21] = extImgsPath+"Interface_24.png";
		twGlobalInfo["InterfaceBackgroundParts"][22] = extImgsPath+"Interface6_06.png";
		twGlobalInfo["InterfaceBackgroundParts"][23] = extImgsPath+"Interface6_18.png";
		twGlobalInfo["InterfaceBackgroundParts"][24] = extImgsPath+"Interface6_21.png";
		twGlobalInfo["InterfaceBackgroundParts"][25] = extImgsPath+"Interface6_28.png";
		twGlobalInfo["InterfaceBackgroundParts"][26] = extImgsPath+"Interface6_29.png";
		twGlobalInfo["InterfaceBackgroundParts"][27] = extImgsPath+"Interface6_30.png";
		//twGlobalInfo["InterfaceBackgroundParts"][28] = extImgsPath+"background.jpg";
		twGlobalInfo["InterfaceBackgroundParts"][28] = "";
		twGlobalInfo["InterfaceBackgroundParts"][29] = extImgsPath+"roundedTopMainTable.png";
		twGlobalInfo["InterfaceBackgroundParts"][30] = extImgsPath+"roundedBottomMainTable.png";
		

	twGlobalInfo["InterfaceItems"] = new Array();
		//twGlobalInfo["InterfaceItems"][0] = extImgsPath+"SliderBar.png";
		twGlobalInfo["InterfaceItems"][0] = extImgsPath+"SliderBar2.png";
		twGlobalInfo["InterfaceItems"][1] = extImgsPath+"SliderItem.png";  
		twGlobalInfo["InterfaceItems"][2] = extImgsPath+"SliderDownArrow.png";
		twGlobalInfo["InterfaceItems"][3] = extImgsPath+"SliderUpArrow.png";
		twGlobalInfo["InterfaceItems"][4] = extImgsPath+"overview.png";
		twGlobalInfo["InterfaceItems"][5] = extImgsPath+"map.png";
		twGlobalInfo["InterfaceItems"][6] = extImgsPath+"armyResume.png";
		twGlobalInfo["InterfaceItems"][7] = extImgsPath+"reload.png";
		twGlobalInfo["InterfaceItems"][8] = extImgsPath+"villagesOverview.png";
		twGlobalInfo["InterfaceItems"][9] = extImgsPath+"rankIcon.png";
		twGlobalInfo["InterfaceItems"][10] = extImgsPath+"rankbody.png";
		twGlobalInfo["InterfaceItems"][11] = extImgsPath+"rankrounded.png";
		twGlobalInfo["InterfaceItems"][12] = extImgsPath+"notBuilded.png";
		
	twGlobalInfo["InterfaceIcons"]	 = new Array();
		twGlobalInfo["InterfaceIcons"][0] = "";
	
	
	// Te atacan?
	if(document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td[3]/table/tbody/tr/td",document, null,XPathResult.STRING_TYPE,null).stringValue != "")
		Attacking = '<div style="color:#DE6706;margin-right:15px;width:50px;"><img src="'+twLinks["twBuildingsImg"][1]+'" /><b>'+document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td[3]/table/tbody/tr/td",document, null,XPathResult.STRING_TYPE,null).stringValue+'</b></div>';
	
}
//__________________________________________________________________________________________________________________//

// Method: twInitNewCSS
// Summary: Escribe y carga las nuevas hojas de estilo
// Params: nothing
// Returns: nothing
function twInitNewCSS()
{
	var newCSS = "";
	// Css TwMenu
	newCSS += '.twMenu {font:12px arial;z-index:1000;text-align:center}';
	newCSS += '.twMenu, .twMenu ul { padding: 0;	margin: 0; list-style: none; float : left; width : 80px;}';
	newCSS += '.twMenu li {position : relative;float : left;line-height : 1.25em;margin-bottom : -1px;width: 80px;border-bottom:1px solid #DED3B9;padding:2px;}';
	newCSS += '.twMenu li ul { position : absolute; left: -999em;	margin-left : 80px;margin-top : -1.35em;width:175px;background-color:#F1EBDD;border:2px solid #DED3B9;z-index:1001}';
	newCSS += '.twMenu li ul li, .twMenu li ul li a {width:170px;}';
	newCSS += '.twMenu li ul ul { left: -999em;background-color:#F1EBDD;}';
	newCSS += '.twMenu li a { width: 80px;display : block;	font-weight : bold;	text-decoration : none;}';
	newCSS += '.twMenu li a:hover {color:#0082BE; background:#FFF;}';
	newCSS += '.twMenu li:hover ul ul, .twMenu li:hover ul ul ul {left: -999em;z-index:1002}';
	newCSS += '.twMenu li:hover ul, .twMenu li li:hover ul, .twMenu li li li:hover ul {left: auto;background-color:#fff;z-index:1002}';
	newCSS += '.twMenu li ul li ul {margin-left : 170px;}';	
		
	// Css para situar los datos de la granja
	newCSS += '#twFarmInfo {position:absolute;top:155px;margin-left:70px;z-index:1000;}';
	// Css situar los recursos
	newCSS += '#twResourcesInfo {position:absolute;top:131px;margin-left:80px;z-index:1000;}';
	
	// Css de la pantalla 'Cargando...'
	newCSS += '#LoadingData {position:absolute;top:0;left:0;opacity:1;Background-color:#DED3B9;color:#804000;text-align:center;z-index:100000}';
	 
	// Css MenĂş desplegable de los pueblos
	newCSS += '#VillageNavigator {position:absolute;top:80px;left:0;margin-left:360px;z-index:1001;width:443px;text-align:left;}';
	
	newCSS += '#twVillagesList {margin:0;padding:0;height:230px;width:440px;background-color:#F8F4E8;border:1px solid #804000;margin-top:9px;opacity:0.90;z-index:1001;}';
	newCSS += '#twVillagesList ul {float:left;height:230px;width:415px; margin:0; padding:0;border-right:1px solid #DED3B9;}';
	newCSS += '#twVillagesList li {text-decoration:none;display:block;padding:4px;border:1px solid #DED3B9;border-top:0;border-right:0;}';

	newCSS += '#DownArrow {position:absolute;top:3px;margin-left:425px;}';
	newCSS += '#LeftArrow {position:absolute;top:3px;margin-left:459px;width:12px;height:12px}';
	newCSS += '#RightArrow{position:absolute;top:3px;margin-left:489px;width:12px;height:12px}';

	newCSS += '#vSlider {margin:15px 0 0 0;padding:0 2px 0 2px;float:right;background:transparent url("http://i184.photobucket.com/albums/x195/twextension/SliderBar.png") no-repeat scroll center;height:200px;width:19px;}'
	newCSS += '#vItem {background:transparent url("http://i184.photobucket.com/albums/x195/twextension/SliderItem.png") no-repeat scroll center;cursor:pointer;height:27px;width:19px;}'


	// Css de la barra de NavegaciĂłn
	newCSS += '#twVillageNavBar{position:absolute;top:0;left:0;}';
	
	newCSS += '#VillageLinks {position:absolute;top:74px;left:0;margin-left:185px;z-index:1000;width:300px;}';
	newCSS += '#VillageInfoArmy {position:absolute;top:14px;left:0;margin-left:160px;z-index:1000;}';
	newCSS += '#VillageInfoResources {position:absolute;top:43px;left:0;margin-left:160px;z-index:1001;}';
	newCSS += '#VillageInfoFarm {position:absolute;top:43px;left:0;margin-left:625px;z-index:1000;}';
	newCSS += '#VillageBuildings {position:absolute;top:0;left:0;}';

	
	// Css Efectos del compactador
	newCSS += '#reportEffect {margin-top:0}';
	newCSS += '#reportEffect h2 {font-size:14pt;}';
	newCSS += '#reportEffect dt {background-color:#DED3B9;padding:2px;}';
	newCSS += '#reportEffect dd {background-color:#F8F4E8;border-left:1px solid #DED3B9;padding:4px;}';
	
	// Css del menĂş de utilidades y herramientas
	newCSS += '#utils {position:absolute;top:375px;left:0;z-index:1000}';
	// Css del menĂş principal
	newCSS += '#mainMenu {position:absolute;top:157px;left:0;width:100px;margin:0;z-index:1000;}';
	// CSS del MenĂş de Edificios
	newCSS += '#BuildingsBar {position:absolute;top:0;left:0;}';
	newCSS += '.iconBuilding {position:absolute;top:0;left:0;height:14px;border:1px solid #804000;background-color:#F1EBDD;border-right:0;padding:2px;}';

	// CSS para situar la Interfaz de Tribal eXtension
	newCSS += '#interface {position:absolute;top:0;left:0}';

	// Css Para posicionar la Barra de NavegaciĂłn superior
	newCSS += '#twNavBar {width:850px;height:150px;margin-top:40px;z-index:1010}';
	
	// Css para posicionar el popup de informaciĂłn de cada jugador
	newCSS += '#playerPopUp {position:absolute;top:265px;left:165px;z-index:10001}'
	newCSS += '#playerCurriculum {position:absolute;top:0;left:0;opacity:0.9;Background-color:#DED3B9;color:#804000;text-align:center;z-index:10000 }'
	
	// Agregamos las nuevas Hojas de estilo
	addGlobalStyle(newCSS);
}
//__________________________________________________________________________________________________________________//

// Method: twInitInterface
// Summary: 
// Params: nothing
// Returns: nothing
function twInitInterface()
{
	var newHTML = '';
	newHTML += '<div style="position:absolute; left:0px; top:0px; width:67px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][0]+'" width="67" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:67px; top:0px; width:66px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][1]+'" width="66" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:133px; top:0px; width:67px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][2]+'" width="67" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:200px; top:0px; width:722px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][3]+'" width="722" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:922px; top:0px; width:26px; height:118px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][4]+'" width="26" height="118" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:0px; top:59px; width:67px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][5]+'" width="67" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:67px; top:59px; width:66px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][6]+'" width="66" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:133px; top:59px; width:67px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][7]+'" width="67" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:200px; top:59px; width:148px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][8]+'" width="148" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:348px; top:59px; width:19px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][9]+'" width="19" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:367px; top:59px; width:401px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][10]+'" width="401" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:768px; top:59px; width:42px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][11]+'" width="42" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:810px; top:59px; width:57px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][12]+'" width="57" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:867px; top:59px; width:55px; height:59px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][13]+'" width="55" height="59" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:0px; top:118px; width:67px; height:39px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][14]+'" width="67" height="39" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:67px; top:118px; width:66px; height:39px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][15]+'" width="66" height="39" alt="">';
	newHTML += '</div>';
	//newHTML += '<div style="position:absolute; left:0px; top:157px; width:100px; height:190px;">';
	//newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][17]+'" width="100" height="190" alt="">';
	//newHTML += '</div>';
	//newHTML += '<div style="position:absolute; left:0px; top:347px; width:100px; height:22px;">';
	//newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][18]+'" width="100" height="22" alt="">';
	//newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:215px; top:16px; width:15px; height:28px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][19]+'" width="15" height="28" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:230px; top:45px; width:15px; height:29px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][20]+'" width="15" height="29" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:682px; top:45px; width:15px; height:29px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][20]+'" width="15" height="29" alt="">';
	newHTML += '</div>';
	newHTML += '<div style="position:absolute; left:150px; top:12px; width:14px; height:67px;">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][21]+'" width="14" height="67" alt="">';
	newHTML += '</div>';
	
	newHTML += '<div style="position:absolute; left:101px; top:150px; width:840px; height:17px;z-index:999">';
	newHTML += '	<img src="'+twGlobalInfo["InterfaceBackgroundParts"][29]+'" width="840" height="17" alt="">';
	newHTML += '</div>';

	
	// AĂ±adida la barra de edificios
	newHTML += twRankingBar();
	newHTML += twBuildingsBar();
	
	
	var div = document.createElement("div");
	div.setAttribute('id','interface_');
	div.innerHTML = newHTML;
	document.body.insertBefore(div, document.body.childNodes[1]);
	
	//$('interface').innerHTML = newHTML;
	
	// Eventos de los botones
	//	var mySlide1 = new Fx.Slide('mBarracks', {duration: 500});
	//	mySlide1.toggle('horizontal');

}
//__________________________________________________________________________________________________________________//
// =================================================================================================================//


// =================================================================================================================//
// [OBTENCIĂ“N DE DATOS]
// =================================================================================================================//
// Method: twDataLoader
// Summary: 
// Params: nothing
// Returns: nothing
function twDataLoader(village_id, _load)
{		
		if(pID == 0){ twGetpID(); return;}
		
		twInitVillagesList();
		twInitVillageArmy(village_id);
		twInitVillageBuildingsLevel(village_id);
		
		twShowInfoArmy(village_id);		
		twShowBuildingsLevel();

		// Listado de pueblos
		if(_load[0] == 1 || twGetVillageNum(village_id) == -1){
			if(!$('LoadingData')) twLoadingData(0);
			if(DebugMode == 1) GM_log("Loading villages list...");
			twGetVillagesList();
		}
		else
		{
			// Niveles de Edificios
			if(_load[1] == 1 ||GM_setValue(wID+"_"+pID+"_"+vID+"_LVL_"+twBuildingsNamesArray[0], -1) < 0 )
				twGetVillageBuildingsLevel(village_id);
			// Tropas
			if(_load[2] == 1 || GM_getValue(wID+"_"+pID+"_"+"_"+village_id+"_"+twUnitsNamesArray[0], -1) < 0 ){
				if(!$('LoadingData')) twLoadingData(0);
				if(DebugMode == 1) GM_log("Loading villages's Army...");
				twGetVillageArmy(village_id, 'single');
			}
		}

		 

}
//__________________________________________________________________________________________________________________//

// Method: twInitVillageBuildingsLevel
// Summary: 
// Params: nothing
// Returns: nothing
function twInitVillageBuildingsLevel(village_id)
{
	var village = twGetVillageNum(village_id);
	// Inicializa la matriz de tropas del pueblo seleccionado
	villagesBuildingsLevel[village] = new Array();
	for(var i=0;i<twBuildingsNamesArray.length;i++)
		villagesBuildingsLevel[village][twBuildingsNamesArray[i]] = GM_getValue(wID+"_"+pID+"_"+vID+"_LVL_"+twBuildingsNamesArray[i], 0);
}
//__________________________________________________________________________________________________________________//

// Method: twInitVillageArmy
// Summary: 
// Params: village_id
// Returns: nothing
function twInitVillageArmy(village_id)
{
	var village = twGetVillageNum(village_id);
	// Inicializa la matriz de tropas del pueblo seleccionado
	Army[village] = new Array();
	for(var i=0; i<12;i++)
		Army[village][""+twUnitsNamesArray[i]+""] = GM_getValue(wID+"_"+pID+"_"+"_"+vID+"_"+twUnitsNamesArray[i], 0);
}
//__________________________________________________________________________________________________________________//

// Method: twGetpiD
// Summary: 
// Params: nothing
// Returns: nothing
function twGetpID()
{
	// si el pID no esta cargado empieza con la carga de todos los datos
	if(pID == 0)
	{	
		if(!$('LoadingData')) twLoadingData(0);
		GM_xmlhttpRequest({
			method: 'GET',
			url: baseURL+'/guest.php?screen=info_village&id='+vID,
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html'},
			onload: function(responseDetails) {
				httpRequest  = responseDetails.responseText;
				var newHTML = document.createElement("div");
				newHTML.setAttribute('id', 'loadVillages');
				newHTML.innerHTML = httpRequest;
				document.body.insertBefore(newHTML, document.body.childNodes[1]);
				
				// Carga del id del usuario
				pID = document.evaluate('/html/body/div/table/tbody/tr/td/table[2]/tbody/tr[4]/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
				pID = pID.substring(pID.indexOf("d=",0)+2, pID.indexOf("\">",0));
				if(DebugMode == 1) GM_log("[twGetpID()] pID = "+pID);
				GM_setValue(wID+"_pID", pID);
				newHTML.parentNode.removeChild(newHTML);
				twDataLoader(vID, new Array(1,1,1))
			},
		});
	}
}
//__________________________________________________________________________________________________________________//

// Method: twGetVillageArmy
// Summary: 
// Params: nothing
// Returns: nothing
function twGetVillageArmy(village_id, mode)
{
	// Inicializa la matriz de tropas del pueblo
	twInitVillageArmy(village_id);
	// Empieza la carga de las tropas del pueblo
	GM_xmlhttpRequest({ 
		method: 'GET',
		url: twUrlScreen+'village='+village_id+'&screen=place&mode=units',
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/xml',},
		onload: function(responseDetails) 
		{
			var newHTML = document.createElement("div");
			newHTML.setAttribute('id', 'loadArmy');
			newHTML.innerHTML = responseDetails.responseText;
			document.body.insertBefore(newHTML, document.body.childNodes[0]);
			var k = 2, i = 0;
			while(i<12){
				Army[twGetVillageNum(village_id)][twUnitsNamesArray[i]] = document.evaluate('/html/body/div/table/tbody/tr/td/table[2]/tbody/tr/td[2]/form/table/tbody/tr[2]/td['+k+']',document,null,XPathResult.STRING_TYPE,null).stringValue;
				GM_setValue(wID+"_"+pID+"_"+"_"+village_id+"_"+twUnitsNamesArray[i], Army[twGetVillageNum(village_id)][twUnitsNamesArray[i]]);
				i++;
				k++;
			}									
			if(DebugMode == 1) GM_log("[twGetVillageArmy] = OK!");
			newHTML.parentNode.removeChild(newHTML);
			// Mostramos los datos
			if(mode == 'single')
				twShowInfoArmy(village_id);
			else if(mode == 'all')
				twGlobalResumeArmy_AddVillageInfo(twGetVillageNum(village_id));
				
			if($('LoadingData')) twLoadingData(1);
			if(DebugMode == 1) GM_log("Army of Village "+twGetVillageNum(village_id)+" => loaded!");
		}
	});
}
//__________________________________________________________________________________________________________________//

// Method: twGetVillageBuildingsLevel
// Summary: 
// Params: nothing
// Returns: nothing
function twGetVillageBuildingsLevel(village_id)
{
	if(DebugMode == 1) GM_log("Loading Village Buildings Level...");
	// Inicializa la matriz de tropas del pueblo
	twInitVillageBuildingsLevel(village_id);
	// Empieza la carga de las tropas del pueblo
	GM_xmlhttpRequest({ 
		method: 'GET',
		url: twUrlScreen+'village='+village_id+'&screen=main',
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/xml',},
		onload: function(responseDetails) 
		{
			var txt = responseDetails.responseText;
			var newHTML = document.createElement("div");
			newHTML.setAttribute('id', 'loadBuildings');
			newHTML.innerHTML = txt;
			document.body.insertBefore(newHTML, document.body.childNodes[0]);
					
			var k = 2, str = "", building = "", lvl = 0, path = "/html/body/div/table[3]/tbody/tr/td/table[2]/tbody/ ";

			if(txt.test(/action=cancel/) && txt.test(/mode=destroy/))
				path = "/html/body/div/table[3]/tbody/tr/td/table[3]/tbody/tr[2]/td/table[2]/tbody/";
			if(!txt.test(/action=cancel/) && txt.test(/mode=destroy/))
				path = "/html/body/div/table[3]/tbody/tr/td/table[2]/tbody/tr[2]/td/table/tbody/";
			if(txt.test(/action=cancel/) && !txt.test(/mode=destroy/))
				path = "/html/body/div/table[3]/tbody/tr/td/table[3]/tbody/"
				
			do
			{
				str = ""; 		
				if(document.evaluate(path+'tr['+k+']/td',document,null,XPathResult.STRING_TYPE,null).stringValue != "")
					str = document.evaluate(path+'tr['+k+']/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
			
				if(str != "" ){
					lvl = str.substring(str.lastIndexOf(" "), str.lastIndexOf(")"));
					building = str.substring(str.indexOf("screen=")+7, str.indexOf("\">"));
					if(DebugMode == 1) GM_log(building+" => "+lvl)
					GM_setValue(wID+"_"+pID+"_"+vID+"_LVL_"+building, lvl);
				}
				k++;
			}while(str != "");	
			if(DebugMode == 1) GM_log("Buildings Level loaded. OK!");
			newHTML.parentNode.removeChild(newHTML);
			twShowBuildingsLevel()
		}
	});
}
//__________________________________________________________________________________________________________________//


// Method: twShowInfoResources
// Summary: 
// Params: nothing
// Returns: nothing
function twShowBuildingsLevel()
{
	var num = 0;
	var newDiv = "";
	
	
	num = parseInt(GM_getValue(wID+"_"+pID+"_"+vID+"_LVL_main"))
	if(!isNaN(num)){
		if(num > 9)  newDiv += '<div style="position:absolute;top:147px;left:985px;font-size:6pt;"><b>'+num+'</b></div>';
		else  newDiv += '<div style="position:absolute;top:147px;left:988px;font-size:6pt;"><b>'+num+'</b></div>';
	}
	else newDiv += '<div style="position:absolute;top:146px;left:984px;font-size:6pt;"><img src="'+twGlobalInfo["InterfaceItems"][12]+'" title="Edificio Sin Construir"></div>';
	
	num = parseInt(GM_getValue(wID+"_"+pID+"_"+vID+"_LVL_barracks"))
	if(!isNaN(num)){
		if(num > 9)  newDiv += '<div style="position:absolute;top:184px;left:985px;font-size:6pt;"><b>'+num+'</b></div>';
		else  newDiv += '<div style="position:absolute;top:184px;left:988px;font-size:6pt;"><b>'+num+'</b></div>';
	}
	else newDiv += '<div style="position:absolute;top:183px;left:984px;font-size:6pt;"><img src="'+twGlobalInfo["InterfaceItems"][12]+'" title="Edificio Sin Construir"></div>';

	num = parseInt(GM_getValue(wID+"_"+pID+"_"+vID+"_LVL_stable"))
	if(!isNaN(num)){
		if(num > 9) newDiv += '<div style="position:absolute;top:222px;left:985px;font-size:6pt;"><b>'+num+'</b></div>';
		else  newDiv += '<div style="position:absolute;top:222px;left:988px;font-size:6pt;"><b>'+num+'</b></div>';
	}
	else newDiv += '<div style="position:absolute;top:220px;left:984px;font-size:6pt;"><img src="'+twGlobalInfo["InterfaceItems"][12]+'" title="Edificio Sin Construir"></div>';

	num = parseInt(GM_getValue(wID+"_"+pID+"_"+vID+"_LVL_garage"))
	if(!isNaN(num)){
	 if(num > 9) newDiv += '<div style="position:absolute;top:258px;left:985px;font-size:6pt;"><b>'+num+'</b></div>';
	 else newDiv += '<div style="position:absolute;top:258px;left:988px;font-size:6pt;"><b>'+num+'</b></div>';
	}
	else newDiv += '<div style="position:absolute;top:257px;left:984px;font-size:6pt;"><img src="'+twGlobalInfo["InterfaceItems"][12]+'" title="Edificio Sin Construir"></div>';
	
	num = parseInt(GM_getValue(wID+"_"+pID+"_"+vID+"_LVL_snob"))
	if(!isNaN(num)){
		if(num > 9) newDiv += '<div style="position:absolute;top:295px;left:985px;font-size:6pt;"><b>'+num+'</b></div>';
		else newDiv += '<div style="position:absolute;top:295px;left:988px;font-size:6pt;"><b>'+num+'</b></div>';
	} 
	else newDiv += '<div style="position:absolute;top:292px;left:984px;font-size:6pt;"><img src="'+twGlobalInfo["InterfaceItems"][12]+'" title="Edificio Sin Construir"></div>';
	
	num = parseInt(GM_getValue(wID+"_"+pID+"_"+vID+"_LVL_place"))
	if(!isNaN(num)){
		if(num > 9)  newDiv += '<div style="position:absolute;top:331px;left:985px;font-size:6pt;"><b>'+num+'</b></div>';
		else  newDiv += '<div style="position:absolute;top:331px;left:988px;font-size:6pt;"><b>'+num+'</b></div>';
	}
	else newDiv += '<div style="position:absolute;top:329px;left:984px;font-size:6pt;"><img src="'+twGlobalInfo["InterfaceItems"][12]+'" title="Edificio Sin Construir"></div>';
	
	num = parseInt(GM_getValue(wID+"_"+pID+"_"+vID+"_LVL_smith"))
	if(!isNaN(num)){
	 if(num > 9) newDiv += '<div style="position:absolute;top:368px;left:985px;font-size:6pt;"><b>'+num+'</b></div>';
	 else newDiv += '<div style="position:absolute;top:368px;left:988px;font-size:6pt;"><b>'+num+'</b></div>';
	}
	else newDiv += '<div style="position:absolute;top:367px;left:984px;font-size:6pt;"><img src="'+twGlobalInfo["InterfaceItems"][12]+'" title="Edificio Sin Construir"></div>';

	num = parseInt(GM_getValue(wID+"_"+pID+"_"+vID+"_LVL_market"))
	if(!isNaN(num)){
		if(num > 9) newDiv += '<div style="position:absolute;top:405px;left:985px;font-size:6pt;"><b>'+num+'</b></div>';
		else newDiv += '<div style="position:absolute;top:405px;left:988px;font-size:6pt;"><b>'+num+'</b></div>';
	}
	else newDiv += '<div style="position:absolute;top:403px;left:984px;font-size:6pt;"><img src="'+twGlobalInfo["InterfaceItems"][12]+'" title="Edificio Sin Construir"></div>';


	if($('BuildingsLvL')) $('BuildingsLvL').innerHTML ="";
	$('BuildingsLvL').innerHTML += newDiv;
}
//__________________________________________________________________________________________________________________//

// Method: twShowInfoResources
// Summary: 
// Params: nothing
// Returns: nothing
function twShowInfoResources()
{
	var newDiv = "";
	newDiv += "<div id='VillageInfoResources'>";
	newDiv += "<table>";
	newDiv += "		<tbody>";
	newDiv += "			<tr>";
	newDiv += "				<th style='background-color:#804000;color:#fff;width:auto;height:29px;padding:2px 4px 2px;margin-right:5px'>Resources:</th>";
	newDiv += "				<td title='Drewno' style='padding:0 0 0 15px'><img src='"+twLinks["twOtherImg"][0]+"' /></td><td>"+twGlobalInfo["resources"][0]+"</td>";
	newDiv += "				<td title='Glina'><img src='"+twLinks["twOtherImg"][1]+"' /></td><td>"+twGlobalInfo["resources"][1]+"</td>";
	newDiv += "				<td title='Żelazo'><img src='"+twLinks["twOtherImg"][2]+"' /></td><td>"+twGlobalInfo["resources"][2]+"</td>";
	newDiv += "				<td title='Pojemność spichlerza'><img src='"+twLinks["twOtherImg"][3]+"' /></td><td id='storage'>"+twGlobalInfo["resources"][3]+"</td>";
	newDiv += "			</tr>";
	newDiv += "		</tbody>";
	newDiv += "	</table>";
	newDiv += "</div>";
	// AĂ±adimos los recursos a la Barra de navegaciĂłn
	if($('VillageInfoResources')) $('VillageInfoResources').parentNode.removeChild($('VillageInfoResources'));
	$('twVillageNavBar').innerHTML += newDiv;
	return newDiv;
}
//__________________________________________________________________________________________________________________//

// Method: twShowInfoFarm
// Summary: 
// Params: nothing
// Returns: nothing
function twShowInfoFarm()
{
	var newDiv = "";
	newDiv += "<div id='VillageInfoFarm'>";
	newDiv += "	<table>";
	newDiv += "	<tbody>";
	newDiv += "		<tr>";
	newDiv += "			<th style='background-color:#804000;color:#fff;width:auto;height:29px;padding:2px 2px 2px 8px;'>Farm: </th>";
	newDiv += "			<td title='Akualna ludność' style='padding:0 0 0 12px'><img src='"+twLinks["twOtherImg"][4]+"' /></td><td>"+twGlobalInfo["farm"][0] +"</td>";
	newDiv += "			<td title='Maksymalna ludność'><img src='"+twLinks["twOtherImg"][4]+"' /></td><td>"+twGlobalInfo["farm"][1]+"</td>";
	newDiv += "			<td title='Wolna ludność'><img src='"+twLinks["twOtherImg"][4]+"' /></td><td style='color:green;'><b>"+twGlobalInfo["farm"][2]+"</b></td>";
	newDiv += "		</tr>";
	newDiv += "	</tbody>";
	newDiv += "</table>";
	newDiv += "</div>";
	// AĂ±adimos los datos de la granja a la Barra de NavegaciĂłn
	if($('VillageInfoFarm')) $('VillageInfoFarm').parentNode.removeChild($('VillageInfoFarm'));
	$('twVillageNavBar').innerHTML += newDiv;
	return newDiv;
}
//__________________________________________________________________________________________________________________//

// Method: twShowInfoArmy
// Summary: 
// Params: village_id
// Returns: nothing
function twShowInfoArmy(village_id)
{
	var village = twGetVillageNum(village_id);
	var newDiv = "";
	newDiv += "<table>";
	newDiv += "	<tbody>";
	newDiv += "		<tr>";
	newDiv += "			<th style='background-color:#804000;color:#fff;width:auto;height:28px;padding:2px 2px 2px 2px;'>Units: </th>";
	for(var i=0;i<12;i++){
		if(Army[village][twUnitsNamesArray[i]] > 0 && Army[village][twUnitsNamesArray[i]] != null) newDiv += "		<td title='"+twLanguage["es"]["units"][i]+"' style='padding:0 5px 0 15px'><img src='"+twLinks["twUnitsImg"][i]+"'></td><td>"+Army[village][twUnitsNamesArray[i]]+"</td>";
	}
	newDiv += "		</tr>";
	newDiv += "	</tbody>";
	newDiv += "</table>";

	if($('VillageInfoArmy')) 
		$('VillageInfoArmy').innerHTML = newDiv
	else
		$('twVillageNavBar').innerHTML += "<div id='VillageInfoArmy'>" +newDiv+"</div>";
		
	twVillagesNavigator();
	return newDiv;
}
//__________________________________________________________________________________________________________________//


// Method: twGlobalResumeArmy
// Summary: 
// Params: nothing
// Returns: nothing
function twGlobalResumeArmy()
{
		var newHTML ="";
		newHTML += "<h2>Unit Summary</h2>";
		newHTML += "<table id='GlobalArmyInfo' width=100% style='text-align:left;'>"
		newHTML += "	<tr style='text-align:center'><th rowspan=2>Village</th><th rowspan=2>Points</th><th colspan=12 width:80% align='center'>Troops</th></tr>";
		newHTML += "	<tr>";
		
		for(i=0;i<12;i++)
			newHTML += "<th><img src='"+twLinks["twUnitsImg"][i]+"'></th>";
		 
		newHTML += "	</tr>";
		newHTML += "</table>";
		
		var elem = document.evaluate('/html/body/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		elem.singleNodeValue.textContent = '';
		elem.singleNodeValue.innerHTML = newHTML;
		//document.createElement("table")
		//document.createTextNode("<tr><th>NÂş</th><th>Pueblo</th><th colspan='12'>Unidades</th");
		//document.body.appendChild("main");
		
		for(var i=0;i<Villages.length;i++)
			twGetVillageArmy(Villages[i]["id"], 'all');
}
//__________________________________________________________________________________________________________________//

function twGlobalResumeArmy_AddVillageInfo(village)
{
	//var newDiv = "<tr>";
	var newTR = document.createElement("tr")
	var newA = "";
	var newTD = "";
	var txt = "";

	newA = document.createElement("a");
	newA.setAttribute("href", twUrlScreen+"village="+Villages[village]["id"]+"&screen=overview" )
	txt = document.createTextNode(Villages[village]["name"]+" ("+Villages[village]["coords"]+")")
	newA.appendChild(txt);
	
	newTD = document.createElement("td")
	newTD.appendChild(newA);
	newTR.appendChild(newTD);
	
	newTD = document.createElement("td")
	txt = document.createTextNode(Villages[village]["points"])
	newTD.appendChild(txt);
	newTR.appendChild(newTD);

	for(var i=0;i<12;i++){
		newTD = document.createElement("td")
		newTD.setAttribute("title", twLanguage["es"]["units"][i])
		newTD.setAttribute("style", "padding:0 5px 0 15px")
		txt = document.createTextNode(Army[village][twUnitsNamesArray[i]])
		newTD.appendChild(txt);
		newTR.appendChild(newTD);
	}
	
	$('GlobalArmyInfo').appendChild(newTR)
	
	//var elem = document.evaluate('/html/body/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	//elem.singleNodeValue.innerHTML += newDiv;

}

// =================================================================================================================//


// =================================================================================================================//
// [MENĂš PUEBLOS] 
// =================================================================================================================//
// Method: twGetVillagesList
// Summary: 
// Params: nothing
// Returns: nothing
function twGetVillagesList()
{
	GM_xmlhttpRequest({
			method: 'GET',
			url: baseURL+'/guest.php?screen=info_player&id='+pID,
			headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/html',
			},
			
			onload: function(responseDetails) {
					httpRequest  = responseDetails.responseText;
					var newHTML = document.createElement("div");
					newHTML.setAttribute('id', 'loadPlayer');
					newHTML.innerHTML = httpRequest;
					document.body.insertBefore(newHTML, document.body.childNodes[0]);
					var i = 2;
					var j = 0;
					nVillages = 0;					  ///html/body/div/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr[2]/td/a
					while(document.evaluate('/html/body/div/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr['+i+']/td/a',document,null,XPathResult.STRING_TYPE,null).stringValue != "")
					{
						if(DebugMode == 1) GM_log("[twGetVillagesList] = Loading... Village => "+(i-1));
						// Cargamos la Matriz de pueblos con los datos de cada pueblo
						Villages[nVillages] = new Array();
						Villages[nVillages]["id"] = document.evaluate('/html/body/div/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr['+i+']/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
						Villages[nVillages]["id"] = Villages[nVillages]["id"].substring( Villages[nVillages]["id"].indexOf("d=",0)+2, Villages[nVillages]["id"].indexOf("\">",0) );			
						Villages[nVillages]["name"] = document.evaluate('/html/body/div/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr['+i+']/td/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
						Villages[nVillages]["coords"] = document.evaluate('/html/body/div/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr['+i+']/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
						Villages[nVillages]["points"] = document.evaluate('/html/body/div/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr['+i+']/td[3]',document,null,XPathResult.STRING_TYPE,null).stringValue;
						// Guardamos los datos
						GM_setValue(wID+"_"+pID+"_"+nVillages+"_villageID", Villages[nVillages]["id"]);
						GM_setValue(wID+"_"+pID+"_"+nVillages+"_villageNAME", Villages[nVillages]["name"]);
						GM_setValue(wID+"_"+pID+"_"+nVillages+"_villageCOORDS", Villages[nVillages]["coords"]);
						GM_setValue(wID+"_"+pID+"_"+nVillages+"_villagePOINTS", Villages[nVillages]["points"]);
						i++;
						nVillages++;
					}			
					GM_setValue(wID+"_"+pID+"_nVillages", nVillages);
					newHTML.parentNode.removeChild(newHTML);
					if(DebugMode == 1) GM_log("[twGetVillagesList] = OK!");
					twVillagesNavigator();
					twDataLoader(vID, new Array(0,1,1));
			}
		});
}
//__________________________________________________________________________________________________________________//

// Method: twInitVillageList
// Summary: Inicializa la lista de pueblos
// Params: nothing
// Returns: nothing
function twInitVillagesList()
{
		i = GM_getValue(wID+"_"+pID+"_nVillages", 0);
		j = 0;
		while( i > 0)
		{
			Villages[j] = new Array();					
			Villages[j]["id"] 		= GM_getValue(wID+"_"+pID+"_"+j+"_villageID");
			Villages[j]["name"] 	= GM_getValue(wID+"_"+pID+"_"+j+"_villageNAME");
			Villages[j]["coords"] = GM_getValue(wID+"_"+pID+"_"+j+"_villageCOORDS");
			Villages[j]["points"] = GM_getValue(wID+"_"+pID+"_"+j+"_villagePOINTS");
			i--;
			j++;
		}
}
//__________________________________________________________________________________________________________________//

// Method: twGetVillageNum
// Summary: Dada una id de un pueblo nos devuelve la posiciĂłn de Ă©ste dentro del array de pueblos.
// Params: village
// Returns: id
function twGetVillageNum(id)
{
	var village = -1;
	var i = GM_getValue(wID+"_"+pID+"_nVillages", 0);
	var k = 0;
	// Obtiene la posiciĂłn del pueblo que buscamos en la matriz de pueblos
	while( i > 0){
		if(Villages[k]["id"] == id)
			village = k;
		i--;
		k++;
	}
	return village;
}
//__________________________________________________________________________________________________________________//

// Method: twVillagesListGenerator
// Summary: 
// Params: integer, integer
// Returns: string
function twVillagesListGenerator(min, max)
{
	var html ="";
	var k = min;
	while( k < max){
		html += "<li id='v"+k+"' ><a accesskey='s' href='"+twUrlScreen+"village="+Villages[k]["id"]+presentURL+"'>"+Villages[k]["name"]+"("+Villages[k]["coords"]+")&nbsp;|&nbsp;"+Villages[k]["points"]+" P</a></li>";	
		k++;
	}
	html += ""
	return html;
}
//__________________________________________________________________________________________________________________//

// Method: twVillageNavigator
// Summary: 
// Params: isLoaded
// Returns: nothing
function twVillagesNavigator()
{	
	try{
		// if(DebugMode == 1) GM_logGM_log(wID+"_"+pID+"_nVillages => "+GM_getValue(wID+"_"+pID+"_nVillages", 0));
		// if(DebugMode == 1) GM_logGM_log("Villages.length => "+Villages.length);
		var villageSelected = twGetVillageNum(vID);
		var newDiv = "";
		var i = 0, j = 0, k = 0;
		var firstVillage = 0, lastVillage = 10;
		
		if(GM_getValue(wID+"_"+pID+"_nVillages", 0) < lastVillage)
			lastVillage = GM_getValue(wID+"_"+pID+"_nVillages", 0)
		
		
		newDiv += "<div id='VillageNavigator'>";
		// Comprueba si nos estĂˇn atacando en ese pueblo, en caso afirmativo muestra un icono al lado del nombre del pueblo
		newDiv += "<div id='vSelected' style='padding-left:0px;'><a accesskey='s' href='"+twUrlScreen+"village="+Villages[(parseInt(villageSelected))]["id"]+"&screen=overview_villages'>"+Villages[villageSelected]["name"]+"("+Villages[villageSelected]["coords"]+")&nbsp;|&nbsp;"+Villages[villageSelected]["points"]+" P</a></div>";
		
		if(Villages.length > 1){
			newDiv += "<div id='twVillagesList'><ul id='vlist'>"+twVillagesListGenerator(firstVillage, lastVillage)+"</ul><div id='vSlider'><div id='vItem'></div></div></div>";
			newDiv += "	<div id='DownArrow' ><a id='btnVillagesList' href='javascript:void(0)' ><img src='"+twLinks["twOtherImg"][11]+"' width=11 height=11 alt='Villages List'/></a></div>";
			//newDiv += "	<div id='vSlider'><div id='vItem'></div></div>";
		}
		
		//Flecha para desplazarse al pueblo anterior
		if((villageSelected-1) >= 0 && Villages.length > 1)
			newDiv += "<div id='LeftArrow' ><a href='"+twUrlScreen+"village="+Villages[(villageSelected-1)]["id"]+presentURL+"' ><img src='"+twLinks["twOtherImg"][7]+"' width=11 height=11 alt='Previous'/></a></div>";
		
		// Flecha para desplazarse al pueblo siguiente
		if((parseInt(villageSelected)+1) < nVillages && Villages.length > 1)
			newDiv += "<div id='RightArrow'><a href='"+twUrlScreen+"village="+Villages[(parseInt(villageSelected)+1)]["id"]+presentURL+"' ><img src='"+twLinks["twOtherImg"][8]+"' width=11 height=11 alt='Next' /></a></div>";
		
		newDiv += "</div>";
		
		if($('VillageLinks')){ if(DebugMode == 1) GM_log("VillageLinks ya existe!"); $('VillageLinks').parentNode.removeChild($('VillageLinks'));}
		newDiv += '<div id="VillageLinks">';
		newDiv += '	<table style="padding:0 4px 0 4px;height:30px;">';
		newDiv += '		<tbody>';
		newDiv += '			<tr>';
		newDiv += '				<td style="border-right:1px solid #804000"><a id="btnDataRefresh" href="javascript:void(0)"><img src="'+twGlobalInfo["InterfaceItems"][7]+'" title="Page Refresh" />&nbsp;</a></td>';
		newDiv += '				<td><a href="'+twLinks["twMainMenuArray"]["overview"]+'"><img src="'+twGlobalInfo["InterfaceItems"][4]+'" title="Village Overview" />&nbsp;</a></td>';
		newDiv += '				<td><a href="'+twLinks["twMainMenuArray"]["map"]+'"><img src="'+twGlobalInfo["InterfaceItems"][5]+'" title="Map" />&nbsp;</a></td>';
		newDiv += '				<td><a href="'+twLinks["twMainMenuArray"]["villages"]+'"><img src="'+twGlobalInfo["InterfaceItems"][8]+'" title="Village(s) List" />&nbsp;</a></td>';
		newDiv += '				<td><a id="btnShowAllArmy" href="javascript:void(0)"><img src="'+twGlobalInfo["InterfaceItems"][6]+'" title="Total Number Of Units"/>&nbsp;</a></td>'
		newDiv += '			</tr>'
		newDiv += '		</tbody>';
		newDiv += '	</table>';
		newDiv += '</div>';
		
		// AĂ±adimos el MenĂş desplegable de pueblos a la barra de NavegaciĂłn
		if($('VillageNavigator')){ if(DebugMode == 1) GM_log("VillageNavigator ya existe!"); $('VillageNavigator').parentNode.removeChild($('VillageNavigator'));}
		$('twVillageNavBar').innerHTML += newDiv;
		
	// Eventos del MenĂş Desplegable de Pueblos
	if($('btnVillagesList'))
	{
		var vDropDown = new Fx.Slide('twVillagesList', {duration: 500}); // Desplegable
		//var vSliderDropDown = new Fx.Slide('vSlider', {duration: 500}); 	// Barra de despazamiento del desplegable
		vDropDown.hide()
		//vSliderDropDown.hide()
		$('btnVillagesList').addEvent('click', function(e) {
			e = new Event(e);
			vDropDown.toggle();
			//vSliderDropDown.toggle();
			e.stop();
		});	
		
		var fx = new Fx.Style($('vItem'), 'top', {duration: 300, wait: false})
		var mySlide2 = new Slider($('vSlider'), $('vItem'), {
			onChange: function(pos){
				if(pos > lastVillage){
					firstVillage = firstVillage + (pos - lastVillage);
					lastVillage = pos;
					document.getElementById('vlist').innerHTML = twVillagesListGenerator(firstVillage, lastVillage);	
				}
				else if(pos < firstVillage){
					lastVillage = lastVillage - (firstVillage - pos);
					firstVillage = pos;
					document.getElementById('vlist').innerHTML = twVillagesListGenerator(firstVillage, lastVillage);
				}		
			},
			onTick: function(pos){
			fx.custom(pos);
			},
			steps: Villages.length,
			mode: 'vertical',
			offset:5
		}).set(0);
	}
	
// Eventos para el menĂş de la barra de navegaciĂłn
	if($('btnShowAllArmy')){
		$('btnShowAllArmy').addEvent('click', function(e) {
			e = new Event(e);
			twGlobalResumeArmy();
			e.stop();
		});
	}
	
	if($('btnDataRefresh')){
		$('btnDataRefresh').addEvent('click', function() {
				twDataLoader(vID, new Array(1,1,1))
		});		
	}
		
		return newDiv;
	}catch(e){GM_log(e); return -1;}
}
//__________________________________________________________________________________________________________________//
// =================================================================================================================//


// =================================================================================================================//
// [CALCULADORAS] 
// =================================================================================================================//
// Method: twCalculatorTimeByUnit
// Summary: 
// Params: oVillage, dVillage
// Returns: distancesByUnit[]
function twCalculatorTimeByUnit(oVillage, dVillage)
{
	var X = 0; // Distancia en el eje X
	var Y = 0; // Distancia en el eje Y
	var T = 0; // Tiempo en segundos
	
	var distancesByUnit =  new Array(); // Matriz de distancias
	var formatTime = new Array(0,0,0); // Tiempo en hh:mm:ss
	
	for(var i=0;i<12;i++)
	{
		// ObtenciĂłn de las componentes del vector distancia
		X = (oVillage[0] - dVillage[0]) *  (twSpeedByUnit[i]*60);
		Y = (oVillage[1] - dVillage[1]) *  (twSpeedByUnit[i]*60);
		// CĂˇlculo del tiempo en Segundos
		T = Math.sqrt(X*X + Y*Y);
		// Formateo el tiempo
		formatTime[0] = parseInt(T/3600);                               				// Horas
		formatTime[1] = parseInt((T - formatTime[0]*3600)/60);                 	// Minutos
		formatTime[2] = Math.round(T - (formatTime[0]*3600+formatTime[1]*60));  // Segundos
		// AĂ±adido a la Matriz de distancias
		distancesByUnit[i] = formatTime[0]+":"+formatTime[1]+":"+formatTime[2];
	}
	return distancesByUnit;
};

// Method: twCalculatorCostbyQty
// Summary: Devuelve los costes en recursos de la cantidad de tropas que recibe al ser llamada la funciĂłn.
// Params: unit (string), Qty (integer)
// Returns: resources[]
function twCalculatorCostbyQty(unit, Qty)
{
	var resources = new Array(0,0,0); // Array con los costes
	var flag = false // bandera para salir del bucle
	var i = 0;
	
	do{
		if(twUnitsNamesArray[i] == unit) { 
			resources[0] = parseInt(twCostsByUnit[i][0]) * parseInt(Qty); 
			resources[1] = parseInt(twCostsByUnit[i][1]) * parseInt(Qty); 
			resources[2] = parseInt(twCostsByUnit[i][2]) * parseInt(Qty);
			flag = true;
		} 
		i++;
	}while(!flag)
	return resources;
}
//__________________________________________________________________________________________________________________//
// =================================================================================================================//


// =================================================================================================================//
// [MAPA]
// =================================================================================================================//
// Method: twMap
// Summary: Modifica el mapa.
// Params: nothing
// Returns: nothing
function twMap()
{
var oMap = document.getElementById('map');
	// RedefiniciĂłn de la medidas del mapa
	oMap.style.width="742px";
	oMap.style.height="532px";
	
	var vCoords = new Array();
	vCoords['x'] = document.getElementsByTagName("input")[5].value;
	vCoords['y'] = 	document.getElementsByTagName("input")[6].value;

	var tRect = document.getElementById('topoRect');
	tRect.style.width = '68px';
	tRect.style.height = '68px';
	
	var tRectTop = tRect.style.top;
	tRectTop = tRectTop.substring(0, tRectTop.length - 2);
	tRectTop = parseInt(tRectTop) - 19;
	
	var tRectLeft = tRect.style.left;
	tRectLeft = tRectLeft.substring(0, tRectLeft.length - 2);
	tRectLeft = parseInt(tRectLeft) - 18;
	
	tRect.style.top = tRectTop+"px";
	tRect.style.left = tRectLeft+"px";
	
	var flechasDplz = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	var str = flechasDplz.singleNodeValue.innerHTML;
	var x = str.substring(str.indexOf("x=")+2, str.indexOf("&amp;y"));
	var y = str.substring(str.indexOf("y=")+2, str.indexOf("\">"));

	str = str.replace("x="+x, "x="+(parseInt(x)+7) );
	str = str.replace("y="+y, "y="+(parseInt(y)+7) );

	flechasDplz.singleNodeValue.textContent = "";
	flechasDplz.singleNodeValue.innerHTML = str;

	///html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[2]/a
	
	// Ocultamos el minimapa
	oMiniMap = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	oMiniMap.singleNodeValue.textContent  = "";
	
	twLoadingData(0)
	GM_xmlhttpRequest({
			method: 'GET',
			url: twLinks["twMainMenuArray"]["map"] +'&xml&start_x='+(parseInt(vCoords['x'])-7)+'&start_y='+(parseInt(vCoords['y'])-7)+'&size_x=14&size_y=14',
			headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/xml,text/xml',
			},
			onreadystatechange: function(responseDetails)
			{
				if(responseDetails.readyState == 4) twLoadingData(1);
			},
			onload: function(responseDetails) {		
					oMap.innerHTML = responseDetails.responseText;
			}
	});
	
	// ???
	/*najaxMapInit('+(3)+', '+(1)+', 14, "'+twLinks["Mapa"]+'&xml", -1, 1);';
  addGlobalJS(newJS);
  document.getElementById('mapOld').innerHTML*/S(newJS);
}
//__________________________________________________________________________________________________________________//

/// Method: twGlobalMap
// Summary: 
// Params: nothing
// Returns: nothing 
function twGlobalMap(){}
//__________________________________________________________________________________________________________________//
// =================================================================================================================//


// =================================================================================================================//
// [COMPACTADOR] (GENERADOR DE INFORMES) 
// =================================================================================================================//
// Method: twReportData
// Summary: Obtiene los datos del informe que posteriormente compactaremos.
// Params: nothing
// Returns: reportInfo[]
function twReportData()
{
		var i = 2;
		
		// ComprobaciĂłn: Informe reenviado (init = 5) o Informe propio (init = 3)
		var init = 3;
		if(document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td',document,null,XPathResult.STRING_TYPE,null).stringValue == "Enviado por:")
			init = 5;
			
		// Datos del informe
		var reportInfo = new Array();

		reportInfo['date'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['luck'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table/tbody/tr/td/b',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['morale'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table/tbody/tr/td/h4',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['morale'] = reportInfo['morale'].replace("Moral:","");
			
		// InformaciĂłn del atacante
		reportInfo['attacker'] = new Array();
		reportInfo['attacker']['player'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr/th[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['attacker']['village'] = new Array();
		str = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr[2]/td[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['attacker']['village']['name'] = str.substring(0, (str.lastIndexOf('(')-1));
		reportInfo['attacker']['village']['x'] = str.substring((str.lastIndexOf('(')+1), str.lastIndexOf('|'));
		reportInfo['attacker']['village']['y'] = str.substring((str.lastIndexOf('|')+1), str.lastIndexOf(')'));
			
		reportInfo['attacker']['army'] = new Array();
		for(var i=0;i<12;i++){
			reportInfo['attacker']['army'][twUnitsNamesArray[i]] = new Array();
			reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td['+(i+2)+']',document,null,XPathResult.STRING_TYPE,null).stringValue;
			reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td['+(i+2)+']',document,null,XPathResult.STRING_TYPE,null).stringValue;
		}
			
		// PĂ©rdidas del Atacante en la Batalla
		reportInfo['attacker']['lossesResources'] = new Array();
		reportInfo['attacker']['lossesResources']['wood'] = 0;
		reportInfo['attacker']['lossesResources']['stone'] = 0;
		reportInfo['attacker']['lossesResources']['iron'] = 0;
		for(i=0;i<12;i++)
			reportInfo['attacker']['lossesResources']['wood'] = parseInt(reportInfo['attacker']['lossesResources']['wood']) +  parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][0];
		for(i=0;i<12;i++)
			reportInfo['attacker']['lossesResources']['stone'] = parseInt(reportInfo['attacker']['lossesResources']['stone']) + parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][1];
		for(i=0;i<12;i++)
			reportInfo['attacker']['lossesResources']['iron'] = parseInt(reportInfo['attacker']['lossesResources']['iron']) + parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][2];

		// InformaciĂłn del defensor
		reportInfo['defender'] = new Array();
		reportInfo['defender']['player'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr/th[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
		if(reportInfo['defender']['player'] == "") reportInfo['defender']['player'] = "Desconocido";
		reportInfo['defender']['village'] = new Array();
		str = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr[2]/td[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
		reportInfo['defender']['village']['name'] = str.substring(0, (str.lastIndexOf('(')-1));
		reportInfo['defender']['village']['x'] = str.substring((str.lastIndexOf('(')+1), str.lastIndexOf('|'));
		reportInfo['defender']['village']['y'] = str.substring((str.lastIndexOf('|')+1), str.lastIndexOf(')'));
			
		reportInfo['defender']['army'] = new Array();
		for(var i=0;i<12;i++){
			reportInfo['defender']['army'][twUnitsNamesArray[i]] = new Array();
			reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td['+(i+2)+']',document,null,XPathResult.STRING_TYPE,null).stringValue;
			if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] == "")
				reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] = 0;
			reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td['+(i+2)+']',document,null,XPathResult.STRING_TYPE,null).stringValue;
			if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'] == "")
				reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'] = 0;
		}
		
		// PĂ©rdidas del Defensor en la Batalla
		reportInfo['defender']['lossesResources'] = new Array();
		reportInfo['defender']['lossesResources']['wood'] = 0;
		reportInfo['defender']['lossesResources']['stone']  = 0;
		reportInfo['defender']['lossesResources']['iron'] = 0;
		for(i=0;i<12;i++)
			reportInfo['defender']['lossesResources']['wood'] = parseInt(reportInfo['defender']['lossesResources']['wood']) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][0];
		for(i=0;i<12;i++)
			reportInfo['defender']['lossesResources']['stone'] = parseInt(reportInfo['defender']['lossesResources']['stone']) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][1];
		for(i=0;i<12;i++)
			reportInfo['defender']['lossesResources']['iron'] = parseInt(reportInfo['defender']['lossesResources']['iron']) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'])*twCostsByUnit[i][2];
		
		// InformaciĂłn de BotĂ­n, espionaje y daĂ±os.
		var k = 0;
		var i = 1;
		var j = 0;
		reportInfo['damage'] = new Array();
		str = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[5]/tbody/tr/th',document,null,XPathResult.STRING_TYPE,null).stringValue;
		while(str != ""){
			//GM_log("str = "+str+", i = "+i)
			while(j < twLanguage["es"]["reportKeys"].length){
				if(str.search(/twLanguage["es"]["reportKeys"][j]/i) != -1){
					if(i == 1)
						reportInfo['damage'][k] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[5]/tbody/tr/td',document,null,XPathResult.STRING_TYPE,null).stringValue; 
					else
						reportInfo['damage'][k] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[5]/tbody/tr['+i+']/td',document,null,XPathResult.STRING_TYPE,null).stringValue; 					
					k++;
				}
				j++;
			}
			i++;
			j = 0;
			str = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[5]/tbody/tr['+i+']/th',document,null,XPathResult.STRING_TYPE,null).stringValue;
		}	
		return reportInfo;
}
//__________________________________________________________________________________________________________________//

// Method: twReportGenerator
// Summary: Compacta el informe
// Params: reportInfo[]
// Returns: newReport[]
function twReportGenerator(reportInfo)
{
		// Variables y contadores
		var str = "";
		var newReport = new Array();
		var i = 0;

		// ComprobaciĂłn: Informe reenviado (init = 5) o Informe propio (init = 3)
		var init = 3;
		if(document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td',document,null,XPathResult.STRING_TYPE,null).stringValue == "Enviado por:")
			init = 5;

		// PĂ©rdidas del Atacante
		var attackerTotalUnits = 0;
		var attackerLossesUnits = 0;
		for(i=0;i<12;i++){
			attackerTotalUnits = parseInt(attackerTotalUnits) + parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'])
			attackerLossesUnits = parseInt(attackerLossesUnits) + parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses'])
		}

			// PĂ©rdidas del Defensor
			defenderTotalUnits = 0;
			defenderLossesUnits = 0;
			for(i=0;i<12;i++){
				defenderTotalUnits = parseInt(defenderTotalUnits) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'])
				defenderLossesUnits = parseInt(defenderLossesUnits) + parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses'])
			}

		// Generando el Informe
		newReport[0] = '[b]Report: '+reportInfo['date'].substring(0,8)+' o '+reportInfo['date'].substring(14,8)+'[/b]\n';
		// Vencedor de la Batalla
		if(attackerLossesUnits == attackerTotalUnits)
			newReport[0] +='Defender ('+reportInfo['defender']['player']+').';
		else
			newReport[0] +='Attacker ('+reportInfo['attacker']['player']+').';

		
		newReport[1] = '\n\n[i]Luck:[color=red] '+reportInfo['luck']+' [/color][/i]\n';
		newReport[2] = '[i]Morale:[color=blue] '+reportInfo['morale']+' [/color][/i]\n\n';
		

		// Datos del Atacante
		newReport[3] = '[b]Attacker: [color=purple][size=15] '+reportInfo['attacker']['player']+' [/size][/color][/b]\n'; 
		newReport[4] = '[b]Village: [color=navy][size=13] '+reportInfo['attacker']['village']['name']+' ['+reportInfo['attacker']['village']['x']+'|'+reportInfo['attacker']['village']['y']+'] [/size][/color][/b]\n';
	
		// Tropas del Atacante
		newReport[5] = '';
		for(i=0;i<12;i++){
			if(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'] > 0	)
					newReport[5] += '[img]'+twLinks["twUnitsImg"][i]+'[/img]'+twLanguage["es"]['units'][i]+'[b] '+reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total']+' [/b].Straty: [color=darkred] '+reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses']+' [/color]([color=green]'+parseInt( parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['total'])-parseInt(reportInfo['attacker']['army'][twUnitsNamesArray[i]]['losses']))+'[/color])\n';
		}
		newReport[5] += '__________________________________________________________________________'
		newReport[5] += '\n[i][b]Attacker Losses:[/b]'; 
		newReport[5] += '\n&nbsp; Unit Losses: [color=darkred]'+attackerLossesUnits+'[/color]/[b]'+attackerTotalUnits+'[/b] ([color=green]'+(attackerTotalUnits-attackerLossesUnits)+'[/color]) Jednostek ([b][color=blue]'+(Math.round((attackerLossesUnits*100/attackerTotalUnits)*10)/10)+'%[/color][/b]) Jednostek'
		newReport[5] += '\n&nbsp; Resources:[img]'+twLinks["twOtherImg"][0]+'[/img]'+reportInfo['attacker']['lossesResources']['wood']+'[img]'+twLinks["twOtherImg"][1]+'[/img]'+reportInfo['attacker']['lossesResources']['stone']+'[img]'+twLinks["twOtherImg"][2]+'[/img]'+reportInfo['attacker']['lossesResources']['iron'];
		newReport[5] += '&nbsp;(W sumie: [img]'+twLinks["twOtherImg"][3]+'[/img][b]'+(parseInt(reportInfo['attacker']['lossesResources']['wood'])+parseInt(reportInfo['attacker']['lossesResources']['stone'])+parseInt(reportInfo['attacker']['lossesResources']['iron']))+'[/b] surowców)[/i]\n';
		
		
		newReport[6] = '\n[b]Defender: [color=purple][size=15] '+reportInfo['defender']['player']+' [/size][/color][/b]\n'; 
		newReport[7] = '[b]Village: [color=navy][size=13] '+reportInfo['defender']['village']['name']+' ['+reportInfo['defender']['village']['x']+'|'+reportInfo['defender']['village']['y']+'] [/size][/color][/b]\n';

		if(parseInt(defenderTotalUnits) != 0)
		{
			// Tropas del Defensor
			newReport[8] = '';
			for(i=0;i<12;i++){
				if(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'] > 0	)
						newReport[8] += '[img]'+twLinks["twUnitsImg"][i]+'[/img]'+twLanguage["es"]['units'][i]+'[b] '+reportInfo['defender']['army'][twUnitsNamesArray[i]]['total']+' [/b].Przeżyło;: [color=darkred] '+reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses']+' [/color]([color=green]'+(parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['total'])-parseInt(reportInfo['defender']['army'][twUnitsNamesArray[i]]['losses']))+'[/color])\n';
			}
			newReport[8] += '__________________________________________________________________________'
			newReport[8] += '\n[i][b]Defender Loses:[/b]';
			newReport[8] += '\n&nbsp;Unit Losses: [color=darkred]'+defenderLossesUnits+'[/color]/[b]'+defenderTotalUnits+'[/b] ([color=green]'+(defenderTotalUnits-defenderLossesUnits)+'[/color]) Jednostek ([b][color=blue]'+(Math.round((defenderLossesUnits*100/defenderTotalUnits)*10)/10)+'%[/color][/b])';
			newReport[8] += '\n&nbsp;Resources:[img]'+twLinks["twOtherImg"][0]+'[/img]'+reportInfo['defender']['lossesResources']['wood']+'[img]'+twLinks["twOtherImg"][1]+'[/img]'+reportInfo['defender']['lossesResources']['stone']+'[img]'+twLinks["twOtherImg"][2]+'[/img]'+reportInfo['defender']['lossesResources']['iron'];
			newReport[8] += '&nbsp;(W sumie: [img]'+twLinks["twOtherImg"][3]+'[/img][b]'+(parseInt(reportInfo['defender']['lossesResources']['wood'])+parseInt(reportInfo['defender']['lossesResources']['stone'])+parseInt(reportInfo['defender']['lossesResources']['iron']))+'[/b]).[/i]\n';
			newReport[8] += '\n';
		}
		else
		{
			if(attackerTotalUnits == attackerLossesUnits)
			{
				newReport[8] = '[i]Żaden żołnierz nie wrócił żywy.[/i]';
				newReport[8] +='\n\n[i][b]Losses:[/b] [b]Perdi&oacute;[/b] [color=darkred]????[/color]/[b]????[/b] Jednostek ([b][color=blue]??%[/color][/b]). [b]Przeżyło[/b]: [color=green]????[/color] Jednostek[/i].\n\n';
			}
			else
			{
				newReport[8] = '[i]Sin Tropas. El Pueblo est&aacute; vac&iacute;o[/i]';
				newReport[8] +='\n\n[i][b]Losses:[/b] [b]Perdi&oacute;[/b] [color=darkred]0[/color]/[b]0[/b] Jednostek ([b][color=blue]100%[/color][/b]). [b]Resto[/b]: [color=green]0[/color] Jednostek [/i].\n\n';
			}
		}
		
		//newReport[9] = 'P&eacute;rdidas de '+reportInfo['attacker']['player']+':';
		//newReport[9] += '&nbsp;[img]'+twLinks["twOtherImg"][0]+'[/img]'+reportInfo['attacker']['lossesResources']['wood']+'[img]'+twLinks["twOtherImg"][1]+'[/img]'+reportInfo['attacker']['lossesResources']['stone']+'[img]'+twLinks["twOtherImg"][2]+'[/img]'+reportInfo['attacker']['lossesResources']['iron'];
		//newReport[9] += '&nbsp;(Total: [b]'+(parseInt(reportInfo['attacker']['lossesResources']['wood'])+parseInt(reportInfo['attacker']['lossesResources']['stone'])+parseInt(reportInfo['attacker']['lossesResources']['iron']))+'[/b] recursos).\n';
		
		//newReport[10] = 'P&eacute;rdidas de '+reportInfo['defender']['player']+':';
		//newReport[10] += '&nbsp;[img]'+twLinks["twOtherImg"][0]+'[/img]'+reportInfo['defender']['lossesResources']['wood']+'[img]'+twLinks["twOtherImg"][1]+'[/img]'+reportInfo['defender']['lossesResources']['stone']+'[img]'+twLinks["twOtherImg"][2]+'[/img]'+reportInfo['defender']['lossesResources']['iron'];
		//newReport[10] += '&nbsp;(Total: [b]'+(parseInt(reportInfo['defender']['lossesResources']['wood'])+parseInt(reportInfo['defender']['lossesResources']['stone'])+parseInt(reportInfo['defender']['lossesResources']['iron']))+'[/b] recursos).\n';
		
		newReport[9] ='W sumie:';
		newReport[9] += '[img]'+twLinks["twOtherImg"][0]+'[/img] '+ (parseInt(reportInfo['attacker']['lossesResources']['wood']) +	parseInt(reportInfo['defender']['lossesResources']['wood']));
		newReport[9] += '[img]'+twLinks["twOtherImg"][1]+'[/img] '+ (parseInt(reportInfo['attacker']['lossesResources']['stone'])+	parseInt(reportInfo['defender']['lossesResources']['stone']));
		newReport[9] += '[img]'+twLinks["twOtherImg"][2]+'[/img] '+ (parseInt(reportInfo['attacker']['lossesResources']['iron']) +	parseInt(reportInfo['defender']['lossesResources']['iron']));
		newReport[9] += ' (Total: [b]'+(parseInt(reportInfo['attacker']['lossesResources']['wood'])+parseInt(reportInfo['defender']['lossesResources']['wood'])+parseInt(reportInfo['attacker']['lossesResources']['stone'])+parseInt(reportInfo['defender']['lossesResources']['stone'])+parseInt(reportInfo['attacker']['lossesResources']['iron'])+parseInt(reportInfo['defender']['lossesResources']['iron']))+'[/b] surowców).';
		
		newReport[10] = '\n';
		for(var i=0;i<reportInfo['damage'].length;i++){
			newReport[10] += '\n' + reportInfo['damage'][i]
			GM_log(reportInfo['damage'][i]);
		}
		
		newReport[11] +='\n\n[b]Report Generated By Tribal e[color=sienna]X[/color]tension [/b]';
		return newReport;
};
//__________________________________________________________________________________________________________________//

// Method: twPreviewReportGenerator
// Summary: Genera la vista prĂ©via del informe compactado
// Params: report[]
// Returns: reportPreview[]
function twPreviewReportGenerator(reportWithForumTags)
{
	// Vista Preliminar del informe
	var reportTmp = reportWithForumTags;
	var reportPreview = "";
	var ForumTags = new Array('[b]', '[/b]', '[i]', '[/i]', '[u]', '[/u]', '\n', '[color=darkred]', '[color=sienna]','[color=purple]','[color=navy]', '[color=green]', '[color=red]', '[color=blue]', '[/color]', '[size=13]', '[size=15]', '[/size]','[img]http://www.tribalwars.es/graphic/unit/unit_spear.png[/img]', '[img]http://www.tribalwars.es/graphic/unit/unit_sword.png[/img]', '[img]http://www.tribalwars.es/graphic/unit/unit_axe.png[/img]', '[img]http://www.plemiona.pl/graphic/unit/unit_archer.png[/img]', '[img]http://www.tribalwars.es/graphic/unit/unit_spy.png[/img]', '[img]http://www.tribalwars.es/graphic/unit/unit_light.png[/img]', '[img]http://www.plemiona.pl/graphic/unit/unit_marcher.png[/img]', '[img]http://www.tribalwars.es/graphic/unit/unit_heavy.png[/img]', '[img]http://www.tribalwars.es/graphic/unit/unit_ram.png[/img]', '[img]http://www.tribalwars.es/graphic/unit/unit_catapult.png[/img]', '[img]http://www.plemiona.pl/graphic/unit/unit_knight.png[/img]', '[img]http://www.tribalwars.es/graphic/unit/unit_snob.png[/img]','[img]http://www.tribalwars.es/graphic/holz.png[/img]', '[img]http://www.tribalwars.es/graphic/lehm.png[/img]', '[img]http://www.tribalwars.es/graphic/eisen.png[/img]', '[img]http://www.tribalwars.es/graphic/res.png[/img]');
	var HtmlTags = new Array('<b>', '</b>', '<i>', '</i>','<u>', '</u>', '<br>', '<span style="color:#C40000;">', '<span style="color: sienna;">','<span style="color: purple;">','<span style="color: navy;">','<span style="color: green;">', '<span style="color: red;">', '<span style="color: blue;">', '</span>', '<span style="font-size: 13px;">','<span style="font-size: 15px;">', '</span>','<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/unit/unit_spear.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/unit/unit_sword.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/unit/unit_axe.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.plemiona.pl/graphic/unit/unit_archer.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/unit/unit_spy.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/unit/unit_light.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.plemiona.pl/graphic/unit/unit_marcher.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/unit/unit_heavy.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/unit/unit_ram.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/unit/unit_catapult.png"/>','<img border="0" class="resizeImage" alt="" src="http://www.plemiona.pl/graphic/unit/unit_knight.png"/>', '<img border="0" class="resizeImage" alt="" src="http://tribalwars.es/graphic/unit/unit_snob.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/holz.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/lehm.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/eisen.png"/>', '<img border="0" class="resizeImage" alt="" src="http://www.tribalwars.es/graphic/res.png"/>');
	
	var j = 0;
	
	for(var k = 0;k<reportTmp.length;k++){
		for(var i=0;i<ForumTags.length;i++) {
			while(reportTmp[k].indexOf(ForumTags[i], 0) != -1)
				reportTmp[k] = reportTmp[k].replace(ForumTags[i], HtmlTags[i]);
		}
		reportPreview += reportTmp[k];
	}
	return reportPreview;
};
//__________________________________________________________________________________________________________________//

// Method: twReportInterface()
// Summary: Genera la interfaz visual del Compactador de Informes 
// Params: nothing
// Returns: nothing
function twReportInterface()
{
		var data = twReportData();
		var report = twReportGenerator(data);
		var reportWithForumTags = "";
		for(var i=0;i < report.length;i++)
			reportWithForumTags += report[i]
		var reportWithoutForumTags = twPreviewReportGenerator(report)
		var newHTML = '';
		
		newHTML += '<dl id="reportEffect"><dl>'
			newHTML += "<h2><b>Converter</b></h2>"
			newHTML += "<div><a href='"+twUrlScreen+"village="+vID+presentURL+"&view="+getParam("view")+"' >Return</div>"
			// opciones
			newHTML += '<dt id="twReportSettings"><a href="javascript:void(0)">Options</a></dt>';
			newHTML += '<dd>';
			newHTML += '		<input type="checkbox" id="coords" checked >Display/Hide Coordinates<br>';
			newHTML += '		<input type="checkbox" id="nombreAtc" checked >Display/Hide Attacker Losses<br>';
			newHTML += '		<input type="checkbox" id="nombreDef" checked >Display/Hide Defender Losses<br>';
			newHTML += '		<input type="checkbox" id="ArmyAtc" checked >Display/Hide Attacker Units<br>';
			newHTML += '		<input type="checkbox" id="ArmyDef" checked >Display/Hide Defender Units<br><br>';
			newHTML += '		<input type="button" id="aplicaCambios" value="Potwierdź" disabled ><br>';
			newHTML += '</dd>';
			
			// Informe Compactado
			newHTML += '<dt><a href="javascript:void(0)">Report</a></dt>';
			newHTML += '<dd><textarea id="twReport"  name="twReport" cols=94 rows=15>'+reportWithForumTags+'</textarea></dd>';

			// Vista PrĂ©via del informe
			newHTML += '<dt id="twReportPreview"><a href="javascript:void(0)">Converted Report</a></dt>';
			newHTML += '<dd>'+ reportWithoutForumTags +'</dd>';
					
		newHTML += '</dl></dl>'
		
		var elem = document.evaluate('/html/body/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		elem.singleNodeValue.textContent = '';
		elem.singleNodeValue.innerHTML = newHTML;

		new Accordion($$('dl#reportEffect dt'), $$('dl#reportEffect dd'));
		new SmoothScroll();
};
//__________________________________________________________________________________________________________________//
// =================================================================================================================//


// =================================================================================================================//
// BUSCADOR DE PUEBLOS
// =================================================================================================================//
// Method: twVillagesFinder
// Summary: Buscador de pueblos
// Params: nothing
// Returns: nothing
function twVillagesFinder()
{
	

}	

// Method: twVillagesFinder
// Summary: Interfaz del buscador del pueblos.
// Params: nothing
// Returns: nothing
function twVillagesFinderInterface()
{
	newHTML = "<div>"
	newHTML = "	<div></div>";
	newHTML = "</div>"

}	

//__________________________________________________________________________________________________________________//
// =================================================================================================================//


// =================================================================================================================//
// BARRAS DE NAVEGACIĂ“N
// =================================================================================================================//
// Method: twVillageNavBar
// Summary: Barra con informaciĂłn sobre la tropa, recursos,granja, menĂş desplegable de pueblos y los enlaces
//					rĂˇpidos a la visiĂłn del pueblo y el mapa.
// Params: nothing
// Returns: nothing
function twVillageNavBar()
{
	var newDiv = document.createElement("div");
	newDiv.setAttribute('id','twVillageNavBar');
	newDiv.innerHTML ="";
	document.body.insertBefore(newDiv, document.body.childNodes[1]);

	twShowInfoResources();
	twShowInfoFarm();
}
//__________________________________________________________________________________________________________________//

// Method: twVillageNavBarAddEvents
// Summary: 
// Params: nothing
// Returns: nothing
function twVillageNavBarAddEvents(){}
//__________________________________________________________________________________________________________________//

// Method: twMainMenuNavigationBar
// Summary: Permite acceder de forma fĂˇcil y rĂˇpida a todas las opciones del menĂş principal.
// Params: nothing
// Returns: nothing
function twMainMenuNavigationBar()
{
	var codeNavBar = '';
	var str="";
	str = document.evaluate('/html/body/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	
	// Barra de MenĂş Principal
	codeNavBar += 	'<ul class="twMenu" style="width:95px;background-image: url(\''+twGlobalInfo['InterfaceBackgroundParts'][25]+'\'); background-repeat: repeat-y;">';
	
	if(	str.match("new_mail") != null)
		codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["mails"][0]+'"><img src="'+twLinks["twOtherImg"][6]+'" />&nbsp;'+twLanguage["net"]["mainMenu"][9]+'</a>';
	else
		codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["mails"][0]+'">&nbsp;'+twLanguage["es"]["mainMenu"][9]+'</a>';
	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["mails"][0]+'">Mail</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["mails"][1]+'">Circular Mail</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["mails"][2]+'">Write Mail</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["mails"][3]+'">Block Sender</a></li>';
	codeNavBar +=				'</ul>';

	if(	str.match("new_report") != null)
		codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["reports"][0]+'"><img src="'+twLinks["twOtherImg"][5]+'" />&nbsp;'+twLanguage["es"]["mainMenu"][8]+'</a>';
	else
		codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["reports"][0]+'">&nbsp;'+twLanguage["es"]["mainMenu"][8]+'</a>';

	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["reports"][0]+'">All Reports</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["reports"][1]+'">Attacks</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["reports"][2]+'">Defenses</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["reports"][3]+'">Support</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["reports"][4]+'">Trade</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["reports"][5]+'">Miscellaneous</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["reports"][6]
+'">Forwarded</a></li>';
codeNavBar +=						'<li><a href="'+twLinks["twMainMenuArray"]["reports"][7]
+'">Filter</a></li>';	
codeNavBar +=						'<li><a href="'+twLinks["twMainMenuArray"]["reports"][8]
+'">Block Sender</a></li>';					
	codeNavBar +=				'</ul>';	
	codeNavBar +=			'</li>';
	
	if(	str.match("ally_forum") != null)
		codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["ally"][4]+'"><img alt="" title="Nuevo informe en el foro de la tribu" src="'+twLinks["twOtherImg"][12]+'"/>&nbsp;'+twLanguage["es"]["mainMenu"][7]+'</a>';
	else
		codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["ally"][0]+'">&nbsp;'+twLanguage["es"]["mainMenu"][7]+'</a>';

	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ally"][0]+'">Overview</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ally"][1]+'">Members</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ally"][2]+'">Profile</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ally"][3]+'">Diplomacy</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ally"][5]+'">Invite Player</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ally"][6]+'">Welcome Message</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ally"][7]+'">Properties</a></li>';

	if(	str.match("ally_forum") != null)
		codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ally"][4]+'"><img alt="" title="Nuevo informe en el foro de la tribu" src="'+twLinks["twOtherImg"][12]+'"/>&nbsp;Forum</a></li>';
	else
		codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ally"][4]+'">Forum</a></li>';
	codeNavBar +=				'</ul>';
	codeNavBar +=			'</li>';

	codeNavBar +=	'<li><a href="javascript:void(0)">&nbsp;Tools</a>';
	codeNavBar +=		'<ul>';
	codeNavBar +=				'<li><a href="'+twLinks["twUtils"][0]+'" target="_blank">TW Tools</a></li>';
	codeNavBar +=				'<li><a href="'+twLinks["twUtils"][1]+'" target="_blank">Plemiona Stystyki</a></li>';
	codeNavBar +=				'<li><a href="javascript:void(0)">Konwertery</a>';
	codeNavBar +=					'<ul>';
	codeNavBar +=					'	<li><a href="'+twLinks["twUtils"][2]+'" target="_blank" >Kruk</a></li>';	
	codeNavBar +=					'	<li><a href="'+twLinks["twUtils"][3]+'" target="_blank" >Netdreamer</a></li>';		
	codeNavBar +=					'</ul>';
	codeNavBar +=				'</li>';
	codeNavBar +=				'<li><a href="javascript:void(0)">Calculator</a>';
	codeNavBar +=					'<ul>';
	codeNavBar +=						'<li><a href="'+twLinks["twUtils"][5]+'" target="_blank">Calculate Distances</a></li>';
	codeNavBar +=						'<li><a href="'+twLinks["twUtils"][6]+'" target="_blank">Calculator Distances w/Execution</a></li>';
	codeNavBar +=						'<li><a href="'+twLinks["twUtils"][7]+'" target="_blank">Calculate Strategy</a></li>';	
	codeNavBar +=						'<li><a href="'+twLinks["twUtils"][8]+'" target="_blank">Rapax Adv Calculator v3.0</a></li>';	
	codeNavBar +=				'</ul>';
	codeNavBar +=			'</li>';
	codeNavBar +=		'</ul>';
	codeNavBar +=	'</li>';

	codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["settings"][0]+'"><img src="'+twGlobalInfo["InterfaceIcons"][0]+'" />&nbsp;'+twLanguage["es"]["mainMenu"][4]+'</a>';
	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][0]+'">Profile</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][1]+'">Email</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][2]+'">Settings</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][3]+'">Start Over</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][4]+'">Delete Account</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][5]+'">Share Internet Connection</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][6]+'">Account Sitting</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][7]+'">Logins</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][8]+'">Change Password</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][9]+'">Surveys</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["settings"][10]+'">Support</a></li>';
	codeNavBar +=				'</ul>';
	codeNavBar +=			'</li>';
	
	codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["premium"]+'"><img src="'+twGlobalInfo["imgPremium"]+'" />&nbsp;'+twLanguage["es"]["mainMenu"][5]+'</a></li>';
	
	codeNavBar += 		'<li><a id="menuRank" href="'+twLinks["twMainMenuArray"]["ranking"][0]+'" ><img src="'+twGlobalInfo["InterfaceIcons"][0] +'" />&nbsp;<span style="font-size:12px;padding:0;">'+twLanguage["es"]["mainMenu"][6]+'</span></a>';
	codeNavBar +=				'<ul id="subMenuRank">';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ranking"][0]+'">Player</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ranking"][1]+'">Tribes</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ranking"][2]+'">Continent Players</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["ranking"][3]+'">Continent Tribes</a></li>';
	codeNavBar +=				'</ul>';
	codeNavBar +=			'</li>';
	
	codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["forum"]+'" target="_blank" ><img src="'+twGlobalInfo["InterfaceIcons"][0]+'" />&nbsp;'+twLanguage["es"]["mainMenu"][1]+'</a></li>';
	codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["chat"]+'" target="_blank" ><img src="'+twGlobalInfo["InterfaceIcons"][0]+'" />&nbsp;'+twLanguage["es"]["mainMenu"][2]+'</a></li>';
	codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'" target="_blank" ><img src="'+twGlobalInfo["InterfaceIcons"][0]+'" />&nbsp;'+twLanguage["es"]["mainMenu"][3]+'</a>';
	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=intro" target="_blank">TW Help</a></li>';
	codeNavBar +=					'<li><a href="javascript:void(0);" target="_blank">TW Language Sites</a>';
	codeNavBar +=						'<ul>';
	codeNavBar +=							'<li><a href="http://www.tribalwars.es/" target="_blank">Spanish TW(es)</a></li>';
	codeNavBar +=							'<li><a href="http://www.tribalwars.net/" target="_blank">English TW (net)</a></li>';
	codeNavBar +=							'<li><a href="http://www.die-staemme.de/" target="_blank" >Deutch TW (de)</a></li>';	
	codeNavBar +=							'<li><a href="http://www.tribalwars.it/" target="_blank">Italian TW (it)</a></li>';
	codeNavBar +=							'<li><a href="http://www.tribalwars.fr/" target="_blank">French TW (fr)</a></li>';
	codeNavBar +=							'<li><a href="http://www.tribalwars.nl/" target="_blank">Netherlands TW (nl)</a></li>';
	codeNavBar +=							'<li><a href="http://www.plemiona.pl/" target="_blank">Polish TW (pl)</a></li>';
	codeNavBar +=							'<li><a href="http://www.tribalwars.ro/" target="_blank">Romainian TW (ro)</a></li>';
	codeNavBar +=							'<li><a href="http://www.tribalwars.se/" target="_blank">Swedish TW (se)</a></li>';
	codeNavBar +=						'</ul>';
	codeNavBar +=					'</li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=late_start" target="_blank">Late Start</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=buildings" target="_blank">Buildings</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=units" target="_blank">Units</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=fight" target="_blank">Battle System</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=points" target="_blank">Points</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=reports" target="_blank">Reports</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=bb" target="_blank">BB-Codes</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=external_igm" target="_blank">External IGM</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=map_data" target="_blank">World Data</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=banner" target="_blank">Tribalwars Banner</a></li>';
	codeNavBar +=					'<li><a href="'+twLinks["twMainMenuArray"]["help"]+'?mode=server_info" target="_blank">Server Info</a></li>';

	codeNavBar +=					'<li><a href="http://www.tribalwars.net/rules.php"target="_blank">Rules</a></li>';
	codeNavBar +=				'</ul>';
	codeNavBar +=			'</li>';
	
	codeNavBar += 		'<li><a href="'+twLinks["twMainMenuArray"]["logout"]+'"><span style="top:60px;"><img src="'+twGlobalInfo["InterfaceIcons"][0]+'" />&nbsp;'+twLanguage["es"]["mainMenu"][0]+'</span></a></li>';

	codeNavBar +=			'</li>';
	codeNavBar += 	'</ul>';
	
	codeNavBar += 	'<img src="'+twGlobalInfo["InterfaceBackgroundParts"][26]+'" width="90" height="21" alt="">';
	
	var div = document.createElement("div");
	div.setAttribute('id','mainMenu');
	div.innerHTML = codeNavBar;
	document.body.insertBefore(div, document.body.childNodes[1]);
	
};
//__________________________________________________________________________________________________________________//

// Method: twRankingBar
// Summary: 
// Params: nothing
// Returns: nothing
function twRankingBar()
{

	var PosYPuntos ='';
	
	str = document.evaluate('/html/body/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	PosYPuntos = str.substring(str.indexOf("(", 0)+1, str.indexOf(")",0));
	PosYPuntos = PosYPuntos.replace('<span class="grey">.</span>', '.');


	var newHTML = "";
	newHTML += '<div style="position:absolute;top:115px;left:205px;width:700px;">';
		// Ranking del jugador
		newHTML += '<div style="float:left;width:185px">';
		newHTML += '	<div style="float:left;"><img  src="'+twGlobalInfo["InterfaceItems"][9]+'" width="30" height="28" border="0" alt=""  /></div>';
		newHTML += '	<div style="float:left;width:141px;height:22px;margin-top:3px;background-image:url(\''+twGlobalInfo["InterfaceItems"][10]+'\');background-repeat:repeat-x"><div style="margin:3px;color:#804000;font-weight:bold">'+PosYPuntos+'</div></div>';
		newHTML += '	<div style="float:left;margin-top:3px"><img  src="'+twGlobalInfo["InterfaceItems"][11]+'" width="9" height="22" border="0" alt="" /></div>';
		newHTML += '</div>';
		
		// Ranking de la tribu
		newHTML += '<div style="float:left;width:185px;margin-left:50px">';
		newHTML += '	<div style="float:left;"><img  src="'+twGlobalInfo["InterfaceItems"][9]+'" width="30" height="28" border="0" alt=""  /></div>';
		newHTML += '	<div style="float:left;width:141px;height:22px;margin-top:3px;background-image:url(\''+twGlobalInfo["InterfaceItems"][10]+'\');background-repeat:repeat-x"><div style="margin:3px;color:#804000;font-weight:bold">Tribal eXtension</div></div>';
		newHTML += '	<div style="float:left;margin-top:3px"><img  src="'+twGlobalInfo["InterfaceItems"][11]+'" width="9" height="22" border="0" alt="" /></div>';
		newHTML += '</div>';
		
		// Ranking en adversarios vencidos
		newHTML += '<div style="float:left;width:185px;margin-left:50px">';
		newHTML += '	<div style="float:left;"><img  src="'+twGlobalInfo["InterfaceItems"][9]+'" width="30" height="28" border="0" alt=""  /></div>';
		newHTML += '	<div style="float:left;width:141px;height:22px;margin-top:3px;background-image:url(\''+twGlobalInfo["InterfaceItems"][10]+'\');background-repeat:repeat-x"><div style="margin:3px;color:#804000;font-weight:bold">Alpha Stage Testing</div></div>';
		newHTML += '	<div style="float:left;margin-top:3px"><img  src="'+twGlobalInfo["InterfaceItems"][11]+'" width="9" height="22" border="0" alt="" /></div>';
		newHTML += '</div>';
		
	newHTML += '</div>';
	return newHTML;
	
}
//__________________________________________________________________________________________________________________//

// Method: twBuildingsBar
// Summary: 
// Params: nothing
// Returns: nothing
function twBuildingsBar()
{
	var newHTML = "";
	// ImĂˇgenes

	//	Enlaces
	//newHTML += '<div id="mMain" class="iconBuilding" style="width:120px;top:155px;margin-left:840px;"><a href="'+twLinks["twMainScreens"][0]+'">Building</a></div>';
	//newHTML += '<div id="mBarracks" class="iconBuilding" style="width:55px;top:191px;margin-left:905px;" ><a href="'+twLinks["twMainScreens"][1]+'">Barracks</a></div>';
	//newHTML += '<div id="mStable" class="iconBuilding" style="width:55px;top:229px;margin-left:905px;" id="mStable"><a href="'+twLinks["twMainScreens"][2]+'">Stable</a></div>';
	//newHTML += '<div id="mGarage" class="iconBuilding" style="width:50px;top:265px;margin-left:910px;"><a href="'+twLinks["twMainScreens"][3]+'">Workshop</a></div>';
	//newHTML += '<div id="mSnob" class="iconBuilding" style="width:130px;top:301px;margin-left:828px;"><a href="'+twLinks["twMainScreens"][4]+'">Corte Aristocr&aacute;tica</a></div>';
	//newHTML += '<div id="mPlace" class="iconBuilding" style="width:135px;top:337px;margin-left:823px;"><a href="'+twLinks["twMainScreens"][6]+'">Plaza de Reuniones</a></div>';
	//newHTML += '<div id="mSmith" class="iconBuilding" style="width:65px;top:375px;margin-left:895px;"><a href="'+twLinks["twMainScreens"][5]+'">Smithy;a</a></div>';
	//newHTML += '<div id="mMarket" class="iconBuilding" style="width:130px;top:411px;margin-left:828px;"><a href="'+twLinks["twMainScreens"][7]+'">Market</a></div>';
	
	newHTML += '<div style="position:absolute; left:956px; top:125px; width:51px; height:332px;">';
	newHTML += '	<img id="Interface6_04" src="'+twGlobalInfo["InterfaceBackgroundParts"][27]+'" width="51" height="332" border="0" alt="" usemap="#Interface6_04_Map" />';
	newHTML += '</div>';

	newHTML += '<map name="Interface6_04_Map" id="Interface6_04_Map">';
	newHTML += '	<area id="MarketIcon" title="Market" shape="poly" alt="" coords="0,287, 9,281, 29,281, 33,277, 40,277, 44,281, 45,288, 41,294, 36,295, 36,303, 29,310, 6,311, 0,304" href="'+twLinks["twMainScreens"][7]+'" />';
	newHTML += '	<area id="SmithIcon" title="Smithy" shape="poly" alt="" coords="0,251, 9,245, 29,245, 33,241, 40,241, 44,245, 45,252, 41,258, 36,259, 36,267, 29,274, 6,275, 0,268" href="'+twLinks["twMainScreens"][5]+'" />';
	newHTML += '	<area id="PlaceIcon" title="Rally Point" shape="poly" alt="" coords="0,214, 9,207, 27,207, 33,202, 41,204, 44,208, 45,214, 42,219, 36,222, 36,230, 29,236, 8,236, 0,231" href="'+twLinks["twMainScreens"][6]+'" />';
	newHTML += '	<area id="SnobIcon" title="Academy" shape="poly" alt="" coords="0,176, 9,170, 29,170, 33,166, 40,166, 44,170, 45,177, 41,183, 36,184, 36,192, 29,199, 6,200, 0,193" href="'+twLinks["twMainScreens"][4]+'" />';
	newHTML += '	<area id="GarageIcon" title="Workshop" shape="poly" alt="" coords="0,142, 7,135, 28,136, 32,132, 37,130, 42,133, 45,140, 42,147, 36,150, 36,158, 29,165, 7,165, 0,159" href="'+twLinks["twMainScreens"][3]+'" />';
	newHTML += '	<area id="StableIcon" title="Stable" shape="poly" alt="" coords="0,105, 7,98, 29,98, 33,93, 40,93, 44,99, 45,106, 41,112, 36,113, 36,121, 29,128, 7,127, 0,122" href="'+twLinks["twMainScreens"][2]+'" />';
	newHTML += '	<area id="BarracksIcon" title="Barracks" shape="poly" alt="" coords="0,67, 9,61, 29,61, 33,57, 40,57, 44,61, 45,68, 41,74, 36,75, 36,83, 29,90, 6,91, 0,84" href="'+twLinks["twMainScreens"][1]+'" />';
	newHTML += '	<area id="MainIcon" title="Village Headquarters" shape="poly" alt="" coords="0,30, 9,24, 29,24, 33,20, 40,20, 44,24, 45,31, 41,37, 36,38, 36,46, 29,53, 6,54, 0,47" href="'+twLinks["twMainScreens"][0]+'" />';
	newHTML += '</map>';
	
	newHTML += '<div id="BuildingsLvL">&nbsp;</div>'
	return newHTML;
}
//__________________________________________________________________________________________________________________//
// =================================================================================================================//



// =================================================================================================================//
// NUEVAS FUNCIONALIDADES
// =================================================================================================================//
// Method: twSetReport
// Summary: 
// Params: nothing
// Returns: nothing
function twSetReport()
{
	try{
	// Links al compactador y al simulador
		var url = "";
		var data = twReportData();
		var QtyUnits = 0
		
		data["morale"] = data["morale"].replace(' ', '');
		url += "&moral="+data["morale"].replace('%', '');
		
		for(var i=0;i<twUnitsNamesArray.length;i++){
			QtyUnits = (parseInt(data['attacker']['army'][twUnitsNamesArray[i]]['total']) - parseInt(data['attacker']['army'][twUnitsNamesArray[i]]['losses']));
			if(QtyUnits > 0) url += "&att_"+twUnitsNamesArray[i]+"="+QtyUnits; 
		}
		for(var i=0;i<twUnitsNamesArray.length;i++){
			QtyUnits = (parseInt(data['defender']['army'][twUnitsNamesArray[i]]['total']) - parseInt(data['defender']['army'][twUnitsNamesArray[i]]['losses']));
			if(QtyUnits > 0) url += "&def_"+twUnitsNamesArray[i]+"="+QtyUnits;
		}
		
	// ComprobaciĂłn: Informe reenviado (init = 5) o Informe propio (init = 3)
		var init = 3;
		if(document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td',document,null,XPathResult.STRING_TYPE,null).stringValue == "Enviado por:")
			init = 5;
		
		var id = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr[2]/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
		var str =  document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[3]/tbody/tr/th[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
		id = id.substring(id.indexOf("id=",0)+3, id.indexOf("\">",0) );
		var attacker = '<a href="http://w5.tribalwars.es/game.php?village='+vID+'&screen=place&mode=command&target='+id+'">'+str+'</a>';
		
		id = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr[2]/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
		str =  document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+init+']/td/table[4]/tbody/tr/th[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
		
		id = id.substring( id.indexOf("id=",0)+3, id.indexOf("\">",0) );
		var defender = '<a href="http://w5.tribalwars.es/game.php?village='+vID+'&screen=place&mode=command&target='+id+'">'+str+'</a>';
	
		// Opciones
		var newHTML = '';
		newHTML += '<table class="vis" style="width:100px;margin-top:10px;">';
		newHTML += '	<tr>';
		newHTML += '		<th>Options</th>';
		newHTML += '	</tr>';
		newHTML += '	<tr>';
		newHTML += '		<td><a id="twLinkReporter" href="javascript:void(0)" >&raquo; Converter</a></td>';
		newHTML += '	</tr>';
		newHTML += '	<tr>';
		newHTML += '		<td><a id="twLinkSimu" href="'+baseURL+'/staemme.php?screen=place&mode=sim'+url+'" >&raquo; Simulator</a></td>';
		newHTML += '	</tr>';
		newHTML += '	<tr>';
		newHTML += '		<td><a id="TwSaveReport" href="javascript:alert(\'Abandoned.\');" >&raquo; Active</a></td>';
		newHTML += '	</tr>';

		/*
		newHTML += '	<tr>';
		newHTML += '		<td><a href="javascript:void(0);">Attacker: </a></td>';
		newHTML += '	</tr>';
		newHTML += '	<tr>';
		newHTML += '		<td><a href="javascript:void(0);">&raquo;'+attacker+' </a></td>';
		newHTML += '	</tr>';
		newHTML += '	<tr>';
		newHTML += '		<td><a href="javascript:void(0);">&raquo;'+defender+'</a></td>';
		newHTML += '	</tr>';
		*/
		newHTML += '</table>'
		var twReporterOptions = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		twReporterOptions.singleNodeValue.innerHTML += newHTML;
		twReporterLinks = $('twLinkReporter');
		twReporterLinks.addEventListener("click", twReportInterface, true);
	}catch(e){if(DebugMode == 1) GM_log("[twSetReport()]  \n"+e)}
}
//__________________________________________________________________________________________________________________//

//==================================================================================================================//
// Method: twSetVillageInfo
// Summary: 
// Params: nothing
// Returns: nothing
function TwSetVillageInfo()
{
	try{
		// infoPlayer
		infoPlayer["Nombre"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/th',document,null,XPathResult.STRING_TYPE,null).stringValue; 
		infoPlayer["Jugador"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[4]/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML; 
		infoPlayer["NombreJugador"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[4]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;  
		infoPlayer["Puntos"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[3]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue; 
		infoPlayer["Tribu"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[5]/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
		infoPlayer["TribuID"]=	infoPlayer["Tribu"].substring(infoPlayer["Tribu"].indexOf("id=")+3, infoPlayer["Tribu"].indexOf("\">"))
		infoPlayer["JugadorID"] = infoPlayer["Jugador"].substring(infoPlayer["Jugador"].indexOf("id=")+3, infoPlayer["Jugador"].indexOf("\">"))

		
		var CoordDestino = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[2]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue; 
		var CoordOrigen = document.evaluate('/html/body/table[2]/tbody/tr/td/b',document,null,XPathResult.STRING_TYPE,null).stringValue; 
		CoordOrigen = CoordOrigen.replace('(',''); 
		CoordOrigen = CoordOrigen.replace(')','');
		
		infoPlayer["CoordOrigen"] = new Array();
		infoPlayer["CoordOrigen"] = CoordOrigen.split('|');
		infoPlayer["CoordDestino"] = new Array();
		infoPlayer["CoordDestino"] = CoordDestino.split('|');
		
		infoPlayer["PuebloID"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[7]/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
		infoPlayer["PuebloID"] = infoPlayer["PuebloID"].substring(infoPlayer["PuebloID"].indexOf("target=")+7, infoPlayer["PuebloID"].indexOf("\">"))
		//GM_log("PuebloID => "+infoPlayer["PuebloID"])
		
		// cĂˇlculo de distancias (tiempos)
		var tiempoUnidad = twCalculatorTimeByUnit(infoPlayer["CoordOrigen"], infoPlayer["CoordDestino"]);
		
		var newinfo_village = '<h2>'+infoPlayer["Nombre"]+'</h2>';
		newinfo_village += '<div>';
		newinfo_village += '	<table class="vis" style="float:left; width:250px;">';
		newinfo_village += '		<tbody>';
		newinfo_village += '			<tr><th>Player Information</th></tr>';
		newinfo_village += '			<tr><td>Coordinates: <b>'+ CoordDestino +'</b></td></tr>';
		newinfo_village += '			<tr><td>Points<b>'+ infoPlayer["Puntos"] +'</b</td></tr>';
		newinfo_village += '			<tr><td>Player: <a id="btnPlayerPopUp" href="javascript:void(0);">'+ infoPlayer["NombreJugador"] +'</a></td></tr>';
		newinfo_village += '			<tr><td>Tribe: '+ infoPlayer["Tribu"] +'</td></tr>';
		newinfo_village += '			<tr><th>Actions</th></tr>';
		newinfo_village += '			<tr><td><a 	href= "'+twLinks["twMainMenuArray"]["map"]+'&x='+infoPlayer["CoordDestino"][0]+'&y='+infoPlayer["CoordDestino"][1]+'" >&raquo; Return Map</a></td></tr>';
		newinfo_village += '			<tr><td>'+document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[7]/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML; +'</td></tr>';
		
		if(document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[8]/td/a',document,null,XPathResult.STRING_TYPE,null).stringValue != "")
			newinfo_village += '			<tr><td>'+document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[8]/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML; +'</td></tr>';
		
		if(document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[9]/td/a',document,null,XPathResult.STRING_TYPE,null).stringValue != "")
			newinfo_village += '			<tr><td>'+document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[9]/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML; +'</td></tr>';
		
		newinfo_village += '		</tbody>';
		newinfo_village += '	</table>';
		
		newinfo_village += '	<table class="vis" style="float:left;width:200px;">';
		newinfo_village += '		<tbody>';
		newinfo_village += '			<tr><th>Units</th><th>Speed</th></tr>';
		
		for(var i=0;i<12;i++)
			newinfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit='+twUnitsNamesArray[i]+'\', 520, 520)">'+twLanguage["es"]["units"][i]+'</a></td><td>'+tiempoUnidad[i]+'</td></tr>';
		
		newinfo_village += '		</tbody>';
		newinfo_village += '	</table';
		
		newinfo_village += '	<table class="vis" style="float:left;width:350px">';
		newinfo_village += '		<tbody>';
		newinfo_village += '			<tr><th>Advanced Information</th></tr>';
		newinfo_village += '			<tr><td><a href="javascript:alert(\'Abandoned.\');">&raquo; Village History</a></td></tr>';
		newinfo_village += '			<tr><td><a href="javascript:alert(\'Abandoned.\');">&raquo; Village Changed Hands</a></td></tr>';
		newinfo_village += '		</tbody>';
		newinfo_village += '	</table>';	
		newinfo_village += '</div>'; 
		
		var NewElem = document.evaluate('/html/body/table[3]/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		NewElem.singleNodeValue.innerHTML = newinfo_village;
		
// Eventos
		if($('btnPlayerPopUp')){
			$('btnPlayerPopUp').addEvent('click', function() {
					twPlayerPopUp();
			});		
		}
		
  }catch(e){if(DebugMode == 1) GM_log("[twSetVillageinfo()]  \n"+e)}
  
}
//__________________________________________________________________________________________________________________//

// Method: twPlayerPopUp
// Summary: 
// Params: nothing
// Returns: nothing
function twPlayerPopUp()
{
	if($('playerPopUp')) return;

	var newInfo_village ="";
	newInfo_village += '<div style="width:200px;height:auto;background-color:#F8F4E8;border:2px solid #804000;padding:2px;">';
	newInfo_village += '	<table>';
	newInfo_village += '		<tbody>';
	newInfo_village += '			<tr><th>Player Information </th><td><a id="btnPlayerPopUpClose" href="javascript:void(0);" >X</a></td></tr>';
	newInfo_village += '			<tr><td colspan=2 ><a href="'+twUrlScreen+'village='+vID+'&screen=info_player&id='+infoPlayer["JugadorID"]+'">Profile</a></td></tr>';
	newInfo_village += '			<tr><td colspan=2 ><a id="btnPlayerCurriculum" href="javascript:void(0)">Player Stats</a></td></tr>';
	newInfo_village += '			<tr><td colspan=2 ><a id="btnPlayerAllies" href="javascript:void(0)">Tribe Stats</a></td></tr>';
	newInfo_village += '		</tbody>';
	newInfo_village += '	</table>';
	newInfo_village += '</div>'
	
	var newHTML = document.createElement("div");
	newHTML.setAttribute('id', 'playerPopUp');
	newHTML.innerHTML = newInfo_village;
	document.body.insertBefore(newHTML, document.body.childNodes[1]);

//Eventos	
	if($('btnPlayerPopUpClose')){
		$('btnPlayerPopUpClose').addEvent('click', function() {
				$('playerPopUp').parentNode.removeChild($('playerPopUp'));
		});		
	}
	
	if($('btnPlayerCurriculum')){
		$('btnPlayerCurriculum').addEvent('click', function() {
				twPlayerCurriculum();
		});		
	}
	
		if($('btnPlayerAllies')){
		$('btnPlayerAllies').addEvent('click', function() {
				twPlayerInfoAllies();
		});		
	}
}
//__________________________________________________________________________________________________________________//

// Method: twPlayerCurriculum
// Summary: 
// Params: nothing
// Returns: nothing
function twPlayerCurriculum()
{
	if($('btnPlayerPopUpClose')) $('playerPopUp').parentNode.removeChild($('playerPopUp'));
	
	var newInfo_village ="";
	newInfo_village += '<div style="position:relative;opacity:1.9;top:100px;margin-left:auto;margin-right:auto;width:750px;min-height:100px;height:auto;background-color:#F8F4E8;border:2px solid #804000;padding:2px;">';
	newInfo_village += '	<table>';
	newInfo_village += '		<tbody>';
	newInfo_village += '			<tr><th width=100%>Stats</th><td><a id="btnPlayerCurriculumClose" href="javascript:void(0);" >X</a></td></tr>';
	newInfo_village += '			<tr><td><div id="twPLayerCurriculum"><div id="loadingCurriculum">LoadingData..</div></div></td></tr>';	
	newInfo_village += '		</tbody>';
	newInfo_village += '	</table>';
	newInfo_village += '</div>'
	
	var newHTML = document.createElement("div");
	newHTML.setAttribute('id', 'playerCurriculum');
	newHTML.style.width = (document.body.scrollWidth < window.innerWidth?window.innerWidth: document.body.scrollWidth) + 'px';
	newHTML.style.height = (document.body.scrollHeight < window.innerHeight?window.innerHeight: document.body.scrollHeight) + 'px';
	newHTML.innerHTML = newInfo_village;
	document.body.insertBefore(newHTML, document.body.childNodes[1]);

	if(DebugMode == 1) GM_log("Wczytywanie statystyk Gracza...");
	GM_xmlhttpRequest({ 
		method: 'GET',
		url: 'http://tribal.texplico.com/tribal/TX_quienEsQuien.php?nombre='+infoPlayer["NombreJugador"]+'+&mundo='+wNum+'&villageID='+vID+'&playerID='+pID,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/xml',},
		onload: function(responseDetails) {
			$('twPLayerCurriculum').innerHTML = responseDetails.responseText;
			if(DebugMode == 1) GM_log("Player Curriculum loaded. OK!");
		}		
	});			

	if($('btnPlayerCurriculumClose')){
		$('btnPlayerCurriculumClose').addEvent('click', function() {
				$('playerCurriculum').parentNode.removeChild($('playerCurriculum'));
		});		
	}
	
	
}
//__________________________________________________________________________________________________________________//

// Method: twPlayerCurriculum
// Summary: 
// Params: nothing
// Returns: nothing
function twPlayerInfoAllies()
{
	if($('btnPlayerPopUpClose')) $('playerPopUp').parentNode.removeChild($('playerPopUp'));
	
	var selectedAllies = ""
	
	var newInfo_village ="";
	newInfo_village += '<div style="position:relative;opacity:1.9;top:100px;margin-left:auto;margin-right:auto;width:750px;min-height:100px;height:auto;background-color:#F8F4E8;border:2px solid #804000;padding:2px;">';
	newInfo_village += '	<table>';
	newInfo_village += '		<tbody>';
	newInfo_village += '			<tr><th width=100%>Tribe Stats </th><td><a id="btnPlayerCurriculumClose" href="javascript:void(0);" >X</a></td></tr>';
	newInfo_village += '			<tr><td><div id="twPLayerCurriculum"><div id="loadingCurriculum">LoadingData...</div></div></td></tr>';	
	newInfo_village += '		</tbody>';
	newInfo_village += '	</table>';
	newInfo_village += '</div>'
	
	var newHTML = document.createElement("div");
	newHTML.setAttribute('id', 'playerCurriculum');
	newHTML.style.width = (document.body.scrollWidth < window.innerWidth?window.innerWidth: document.body.scrollWidth) + 'px';
	newHTML.style.height = (document.body.scrollHeight < window.innerHeight?window.innerHeight: document.body.scrollHeight) + 'px';
	newHTML.innerHTML = newInfo_village;
	document.body.insertBefore(newHTML, document.body.childNodes[1]);

	if(DebugMode == 1) GM_log("Wczytywanie statystyk Plemienia...");
	GM_xmlhttpRequest({ 
		method: 'GET',
		url: 'http://tribal.texplico.com/tribal/TX_optionTribus.php?mundo='+wNum,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/xml',},
		onload: function(responseDetails) {
		
			//var allies = responseDetails.responseText
			var menu = '';
			menu += '<fieldset><legend>Options</legend>';
			menu += ' 	<select name="alliesSelected" id="alliesSelected" size=4>';
			menu += '		</select>';
			menu += '		<select name="allTribes" id="allTribes" >';
			menu += responseDetails.responseText; // Options de las alianzas
			menu +='		</select>';
			
			menu += '		<input type="button" name="addAllies" id="btnAddAllies" value="A&ntilde;adir Alianza" />'
			menu += '		<input type="button" name="getInfo" id="btnGetInfo" value="Get Info" align=right/>'
			menu += '</fieldset>'
			
			menu += '<div id="infoAllies"></div>';
			
			$('twPLayerCurriculum').innerHTML = menu;
			
			for(var i=0; i<$('allTribes').length;i++){
				if($('allTribes').options[i].value == infoPlayer["TribuID"]){
					$('alliesSelected').options[$('alliesSelected').length] = new Option($('allTribes').options[i].text, $('allTribes').options[i].value, false)
					selectedAllies = $('allTribes').options[i].value;
					$('allTribes').options[i] = null;
				}
			}
			
			if(DebugMode == 1) GM_log("Info Allies loaded. OK!");
			
			if($('btnAddAllies')){
				$('btnAddAllies').addEvent('click', function() {
					$('alliesSelected').options[$('alliesSelected').length] = new Option($('allTribes').options[$('allTribes').selectedIndex].text, $('allTribes').options[$('allTribes').selectedIndex].value, false)
					
					if(selectedAllies == "")
						selectedAllies = $('allTribes').options[$('allTribes').selectedIndex].value;
					else
						selectedAllies += ","+$('allTribes').value;
					//GM_log($('allTribes').options[$('allTribes').selectedIndex].text+" => "+$('allTribes').options[$('allTribes').selectedIndex].value);
					GM_log(selectedAllies)
				});		
			}
			
			if($('btnGetInfo')){
				$('btnGetInfo').addEvent('click', function() {
						getInfoAlliesOfEnemy(selectedAllies);
				});		
			}
		}		
	});			

	if($('btnPlayerCurriculumClose')){
		$('btnPlayerCurriculumClose').addEvent('click', function() {
				$('playerCurriculum').parentNode.removeChild($('playerCurriculum'));
		});		
	}
}
//__________________________________________________________________________________________________________________//

// Method: getInfoAlliesOfEnemy
// Summary: 
// Params: selectedAllies string,
// Returns: nothing
function getInfoAlliesOfEnemy(selectedAllies)
{
	if(DebugMode == 1) GM_log("Loading Info Allies Of Enemy...");
	GM_log('http://tribal.texplico.com/tribal/TX_apoyos.php?mundo='+wNum+'&idOrigen='+vID+'&idDestino='+infoPlayer["PuebloID"]+'&IDSTribus='+selectedAllies)
	GM_xmlhttpRequest({ 
		method: 'GET',
		url: 'http://tribal.texplico.com/tribal/TX_apoyos.php?mundo='+wNum+'&idOrigen='+vID+'&idDestino='+infoPlayer["PuebloID"]+'&IDSTribus='+selectedAllies,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/xml',},
		onload: function(responseDetails) {
			$('infoAllies').innerHTML = responseDetails.responseText
			if(DebugMode == 1) GM_log("Info Allies Of Enemy loaded. OK!");
		}		
	});		
}
//__________________________________________________________________________________________________________________//

// Method: getTribePacts
// Summary: 
// Params: nothing
// Returns: nothing
function getTribePacts()
{
	// Lista de tribus aliadas
	var allies = new Array();
	// Lista de tribus con pacto de paz
	var pdps = new Array();
	// Lista de tribus enemigas
	var enemies = new Array();
	GM_log("id =>"+getParam('id'))
	GM_xmlhttpRequest({ 
		method: 'GET',
		url: twUrlScreen+'village='+getParam('id')+'&screen=ally&mode=contracts',
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/xml',},
		onload: function(responseDetails) {
			httpRequest  = responseDetails.responseText;
			var newHTML = document.createElement("div");
			newHTML.setAttribute('id', 'loadTribePacts');
			newHTML.innerHTML = httpRequest;
			document.body.insertBefore(newHTML, document.body.childNodes[0]);
			
			var k = 2, i = 0, str = "", mode = 2 // mode=2 -> aliados, mode=3 -> pdp's, mode=4 -> enemigos
			
			for(var mode=2;mode<5;mode++)
			{
				do{
					str = ""; 		
					if(document.evaluate('/html/body/div/table[3]/tbody/tr/td/table['+mode+']/tbody/tr['+k+']/td',document,null,XPathResult.STRING_TYPE,null).stringValue != "")
						str = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table['+mode+']/tbody/tr['+k+']/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
					if(str != "" ){
						str = str.substring(str.indexOf("id=")+3, str.indexOf("\">"));
						allies[i] = str;
						GM_log(allies[i]);
						k++;
					}
				}while(str != "");
				k=2;
				i=0;		
			}
			GM_log("Tribe Pacts loaded. OK!");
			newHTML.parentNode.removeChild(newHTML);
		}		
	});
}
//__________________________________________________________________________________________________________________//

// Method: twSetSim
// Summary: 
// Params: nothing
// Returns: nothing
function twSetSim()
{
	try{
	// Las tecnologĂ­as del defensor por defecto serĂˇn de nivel 3
	// Las tecnologĂ­as del atacante por defecto serĂˇn de nivel 1
		for(var i=0;i<twUnitsNamesArray.length;i++){
			if(getParam("att_"+twUnitsNamesArray[i]) != ''){
				document.getElementsByName('att_tech_'+twUnitsNamesArray[i])[0].value = 1
				document.getElementsByName('att_'+twUnitsNamesArray[i])[0].value = getParam('att_'+twUnitsNamesArray[i]);
			}
			if(getParam("def_"+twUnitsNamesArray[i]) != ''){
				document.getElementsByName('def_tech_'+twUnitsNamesArray[i])[0].value = 3
				document.getElementsByName('def_'+twUnitsNamesArray[i])[0].value = getParam('def_'+twUnitsNamesArray[i]);
			}
		}
	// Se pone la moral con la que atacas segĂşn la del informe
		if(getParam('moral') != '') document.getElementById('moral').value = getParam('moral');
		
	// Si ha habido espionaje, se pone el nivel de la muralla. Por defecto serĂˇ nivel 20.
		if(getParam('def_wall') != '')
			document.getElementsByName('def_wall')[0].value = getParam('def_wall')
		else
			document.getElementsByName('def_wall')[0].value = 20
		
	// Se pone por defecto la suerte en -25
		document.getElementsByName('luck')[0].value = -25
	
		if(document.evaluate("/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML != "")
		{
			var attUnits = new Array();
			attUnits["total"] = new Array();
			attUnits["losses"] = new Array();
			var defUnits = new Array();
			defUnits["total"] = new Array();
			defUnits["losses"] = new Array();
		
	// Unidades que has metido dentro del simulador
			for(var i=0;i<12;i++){
				attUnits["total"][i] = document.evaluate("/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody/tr[2]/td["+(i+3)+"]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
				defUnits["total"][i] = document.evaluate("/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td["+(i+3)+"]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
			}
	
	// Unidades que han muerto		
			for(var i=0;i<12;i++){
				attUnits["losses"][i] = document.evaluate("/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody/tr[3]/td["+(i+2)+"]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
				defUnits["losses"][i] = document.evaluate("/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td["+(i+2)+"]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
			}		
	
	// Recursos Perdidos		
			var defResourcesLosses = new Array();
			var attResourcesLosses = new Array();
		
			for(var i=0;i<12;i++){
				attResourcesLosses[i] = twCalculatorCostbyQty(twUnitsNamesArray[i], parseInt(attUnits["losses"][i]));
				defResourcesLosses[i] = twCalculatorCostbyQty(twUnitsNamesArray[i], parseInt(defUnits["losses"][i]));
			}
			
			var attTotalResourcesLosses = new Array(0,0,0)
			var	defTotalResourcesLosses = new Array(0,0,0)
			for(var i=0;i<3;i++){
				for(var j=0;j<9;j++){
					attTotalResourcesLosses[i] = parseInt(attTotalResourcesLosses[i]) + parseInt(attResourcesLosses[j][i]);
					defTotalResourcesLosses[i] = parseInt(defTotalResourcesLosses[i]) + parseInt(defResourcesLosses[j][i]);
				}
			}
	// Mostrar recursos perdidos		
			var NewElem;
			NewElem = document.evaluate('/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
			NewElem.singleNodeValue.innerHTML += '<tr><th colspan=2>P&eacute;rdidas del Atacante&nbsp;</th><td colspan=3><img src="'+twLinks["twOtherImg"][0]+'" />&nbsp;'+twNumFormat(attTotalResourcesLosses[0])+'</td><td colspan=3><img src="'+twLinks["twOtherImg"][1]+'" />&nbsp;'+twNumFormat(attTotalResourcesLosses[1])+'</td><td colspan=3><img src="'+twLinks["twOtherImg"][2]+'" />&nbsp;'+twNumFormat(attTotalResourcesLosses[2])+'</td></tr>';
			NewElem.singleNodeValue.innerHTML += '<tr><th colspan=2>P&eacute;rdidas del Defensor&nbsp;</th><td colspan=3><img src="'+twLinks["twOtherImg"][0]+'" />&nbsp;'+twNumFormat(defTotalResourcesLosses[0])+'</td><td colspan=3><img src="'+twLinks["twOtherImg"][1]+'" />&nbsp;'+twNumFormat(defTotalResourcesLosses[1])+'</td><td colspan=3><img src="'+twLinks["twOtherImg"][2]+'" />&nbsp;'+twNumFormat(defTotalResourcesLosses[2])+'</td></tr>';
	
		}
	}catch(e){if(DebugMode == 1) GM_log("[twSetSim()]  \n"+e)}
}
//__________________________________________________________________________________________________________________//



// =================================================================================================================//
// INIT!! 
// =================================================================================================================//

window.addEvent('domready', function() 
{
	try{

		if(twHidesFrame())
		{ 
			twInitNewCSS(); 
			twInitialize(); 
			
			if(getParam('screen') == 'info_village'){TwSetVillageInfo();}
			if(getParam('screen') == 'report' && getParam('view') != ""){twSetReport();}
			if(getParam('screen') == 'place' && getParam('mode') == 'sim'){twSetSim();}
			/*if(getParam('screen') == 'map'){twMap();}*/
		
			twInitInterface();
			twMainMenuNavigationBar();
			twVillageNavBar();	
			
			twEditOriginalElements();  
		
			twDataLoader(vID, new Array(0,0,0));  
		}
	}catch(e){ if(DebugMode == 1) GM_log(e)}	
});
//__________________________________________________________________________________________________________________//
