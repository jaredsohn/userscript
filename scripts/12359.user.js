// ==UserScript==
// @name          TribalWars eXtension by wolfie
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Tribal eXtension v2.0.1 by Wolfie [Beta], almost done traduction to english is still pending
// @include       http://tw*.tribalwars.net/game.php*
// @include       http://en*.ds.ignames.net/*
// ==/UserScript==

// Librería de JavaScript: MooTools 
//MooTools, My Object Oriented Javascript Tools. Copyright (c) 2006 Valerio Proietti, <http://mad4milk.net>, MIT Style License.
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('n V=k(1t){n 6e=k(){m(9.1e&&1h[0]!=\'8a\')l 9.1e.3M(9,1h);U l 9};P(n G 15 9)6e[G]=9[G];6e.19=1t;l 6e};V.1n=k(){};V.19={Q:k(1t){n 6i=I 9(\'8a\');n 7T=k(2s,1R){m(!2s.3M||!1R.3M)l K;l k(){9.1u=2s;l 1R.3M(9,1h)}};P(n G 15 1t){n 2s=6i[G];n 1R=1t[G];m(2s&&2s!=1R)1R=7T(2s,1R)||1R;6i[G]=1R}l I V(6i)},1P:k(1t){P(n G 15 1t)9.19[G]=1t[G]}};1H.Q=k(){n 1c=1h;1c=(1c[1])?[1c[0],1c[1]]:[9,1c[0]];P(n G 15 1c[1])1c[0][G]=1c[1][G];l 1c[0]};1H.7M=k(){P(n i=0;i<1h.14;i++)1h[i].Q=V.19.1P};I 1H.7M(6u,1L,5Z,9B,V);m(7t 4O==\'3D\'){n 4O=V.1n;4O.19={}}U{4O.19.7l=1f}18.Q=N.Q=1H.Q;n ag=18;k $B(J){m(J===1W||J===3D)l K;n B=7t J;m(B==\'4y\'){m(J.7l)l\'F\';m(J.1v)l\'26\';m(J.ac){2f(J.8M){1a 1:l\'F\';1a 3:l J.ah.1l(/\\S/)?\'ap\':\'5L\'}}}l B};k $2a(J){l!!(J||J===0)};k $aq(J,8C){l($B(J))?J:8C};k $8B(34,1q){l M.8K(M.8B()*(1q-34+1)+34)};k $3H(1r){aj(1r);ak(1r);l 1W};m(18.8m)18.3L=18[18.5T?\'al\':\'6z\']=1f;U m(N.9w&&!N.a0&&!a4.a3)18.3R=1f;U m(N.bi!=1W)18.7f=1f;m(18.6z)7K{N.b2("aZ",K,1f)}7G(e){};1L.19.5r=1L.19.5r||k(W,O){P(n i=0;i<9.14;i++)W.1D(O,9[i],i,9)};1L.19.2J=1L.19.2J||k(W,O){n 44=[];P(n i=0;i<9.14;i++){m(W.1D(O,9[i],i,9))44.1v(9[i])}l 44};1L.19.4A=1L.19.4A||k(W,O){n 44=[];P(n i=0;i<9.14;i++)44[i]=W.1D(O,9[i],i,9);l 44};1L.19.4M=1L.19.4M||k(W,O){P(n i=0;i<9.14;i++){m(!W.1D(O,9[i],i,9))l K}l 1f};1L.19.8H=1L.19.8H||k(W,O){P(n i=0;i<9.14;i++){m(W.1D(O,9[i],i,9))l 1f}l K};1L.19.49=1L.19.49||k(4l,T){T=T||0;m(T<0)T=M.1q(0,9.14+T);3O(T<9.14){m(9[T]===4l)l T;T++}l-1};1L.Q({1j:1L.19.5r,6P:k(17,14){17=17||0;m(17<0)17=9.14+17;14=14||(9.14-17);n 3Z=[];P(n i=0;i<14;i++)3Z[i]=9[17++];l 3Z},3V:k(4l){n i=0;3O(i<9.14){m(9[i]===4l)9.6o(i,1);U i++}l 9},1l:k(4l,T){l 9.49(4l,T)!=-1},Q:k(3Z){P(n i=0;i<3Z.14;i++)9.1v(3Z[i]);l 9},be:k(1S){n J={},14=M.34(9.14,1S.14);P(n i=0;i<14;i++)J[1S[i]]=9[i];l J}});k $A(26,17,14){l 1L.19.6P.1D(26,17,14)};k $1j(7O,W,O){l 1L.19.5r.1D(7O,W,O)};5Z.Q({1l:k(5w,86){l((7t 5w==\'2L\')?I 7o(5w,86):5w).1l(9)},2w:k(){l 7x(9)},9e:k(){l 53(9)},6B:k(){l 9.3l(/-\\D/g,k(2p){l 2p.7v(1).8S()})},9n:k(){l 9.3l(/\\w[A-Z]/g,k(2p){l(2p.7v(0)+\'-\'+2p.7v(1).4R())})},9l:k(){l 9.4R().3l(/\\b[a-z]/g,k(2p){l 2p.8S()})},5I:k(){l 9.3l(/^\\s+|\\s+$/g,\'\')},65:k(){l 9.3l(/\\s{2,}/g,\' \').5I()},5O:k(26){n 1p=9.2p(/\\d{1,3}/g);l(1p)?1p.5O(26):K},52:k(26){n 36=9.2p(/^#?(\\w{1,2})(\\w{1,2})(\\w{1,2})$/);l(36)?36.aL(1).52(26):K}});1L.Q({5O:k(26){m(9.14<3)l K;m(9[3]&&(9[3]==0)&&!26)l\'aJ\';n 36=[];P(n i=0;i<3;i++){n 5z=(9[i]-0).4v(16);36.1v((5z.14==1)?\'0\'+5z:5z)}l 26?36:\'#\'+36.2z(\'\')},52:k(26){m(9.14!=3)l K;n 1p=[];P(n i=0;i<3;i++){1p.1v(7x((9[i].14==1)?9[i]+9[i]:9[i],16))}l 26?1p:\'1p(\'+1p.2z(\',\')+\')\'}});9B.Q({2w:k(){l 7x(9)},9e:k(){l 53(9)}});6u.Q({2c:k(u){n W=9;u=1H.Q({\'O\':W,\'C\':K,\'1h\':1W,\'2n\':K,\'3g\':K,\'5P\':K},u||{});m($2a(u.1h)&&$B(u.1h)!=\'26\')u.1h=[u.1h];l k(C){n 1c;m(u.C){C=C||18.C;1c=[(u.C===1f)?C:I u.C(C)];m(u.1h)1c=1c.aD(u.1h)}U 1c=u.1h||1h;n 3a=k(){l W.3M(u.O,1c)};m(u.2n)l aC(3a,u.2n);m(u.3g)l aS(3a,u.3g);m(u.5P){7K{l 3a()}7G(9g){l 9g}}l 3a()}},bf:k(1c,O){l 9.2c({\'1h\':1c,\'O\':O})},5P:k(1c,O){l 9.2c({\'1h\':1c,\'O\':O,\'5P\':1f})()},O:k(O,1c){l 9.2c({\'O\':O,\'1h\':1c})},b6:k(O,1c){l 9.2c({\'O\':O,\'C\':1f,\'1h\':1c})},2n:k(5R,O,1c){l 9.2c({\'2n\':5R,\'O\':O,\'1h\':1c})()},3g:k(5R,O,1c){l 9.2c({\'3g\':5R,\'O\':O,\'1h\':1c})()}});n 1i=I V({1e:k(o){m($B(o)==\'2L\')o=N.9a(o);l $(o)}});k $(o){m(!o)l K;m(o.9o||[18,N].1l(o))l o;m($B(o)==\'2L\')o=N.64(o);m($B(o)!=\'F\')l K;m([\'4y\',\'b5\'].1l(o.62.4R())||o.Q)l o;o.9o=1f;3G.5y(o);o.Q=1H.Q;m(!(o.7l))o.Q(1i.19);l o};n 2K=I V({});I 1H.7M(2K);N.3C=N.3e;k $$(){m(!1h)l K;m(1h.14==1){m(!1h[0])l K;m(1h[0].9r)l 1h[0]}n 11=[];$1j(1h,k(1x){2f($B(1x)){1a\'F\':11.1v($(1x));2b;1a\'2L\':1x=N.3C(1x);6W:m(1x.14){$1j(1x,k(o){m($(o))11.1v(o)})}}});11.9r=1f;l 1H.Q(11,I 2K)};2K.5v=k(G){l k(){n 1c=1h;n 4P=[];n 11=1f;$1j(9,k(o){n 3a=o[G].3M(o,1c);m($B(3a)!=\'F\')11=K;4P.1v(3a)});m(11)4P=$$(4P);l 4P}};1i.Q=k(1t){P(n G 15 1t){4O.19[G]=1t[G];1i.19[G]=1t[G];2K.19[G]=2K.5v(G)}};1i.Q({4b:k(o,9v){o=$(o)||I 1i(o);2f(9v){1a"9F":$(o.2P).9O(9,o);2b;1a"9x":m(!o.5x())$(o.2P).5C(9);U $(o.2P).9O(9,o.5x());2b;1a"97":o.5C(9)}l 9},9H:k(o){l 9.4b(o,\'9F\')},7w:k(o){l 9.4b(o,\'9x\')},2O:k(o){l 9.4b(o,\'97\')},9D:k(o){9.5C($(o)||I 1i(o));l 9},3V:k(){9.2P.ai(9);l 9},98:k(9q){n o=9.ao(9q!==K);l $(o)},9T:k(o){o=$(o)||I 1i(o);9.2P.an(o,9);l o},am:k(1I){m(18.3L){2f(9.4I()){1a\'1F\':9.a7.9S=1I;l 9;1a\'2W\':9.5M(\'1I\',1I);l 9}}9.5C(N.a5(1I));l 9},5V:k(1s){l 9.1s.1l(\'(?:^|\\\\s)\'+1s+\'(?:\\\\s|$)\')},5a:k(1s){m(!9.5V(1s))9.1s=(9.1s+\' \'+1s).65();l 9},9c:k(1s){9.1s=9.1s.3l(I 7o(\'(^|\\\\s)\'+1s+\'(?:\\\\s|$)\'),\'$1\').65();l 9},a1:k(1s){l 9.5V(1s)?9.9c(1s):9.5a(1s)},1J:k(G,L){m(G==\'21\')9.92(53(L));U 9.1F[G.6B()]=(L.1v)?\'1p(\'+L.2z(\',\')+\')\':L;l 9},4D:k(1B){2f($B(1B)){1a\'4y\':P(n G 15 1B)9.1J(G,1B[G]);2b;1a\'2L\':9.1F.9S=1B}l 9},92:k(21){m(21==0){m(9.1F.3p!="3t")9.1F.3p="3t"}U{m(9.1F.3p!="7m")9.1F.3p="7m"}m(!9.5Q||!9.5Q.b1)9.1F.b3=1;m(18.3L)9.1F.2J="6g(21="+21*2x+")";9.1F.21=9.21=21;l 9},1V:k(G){G=G.6B();n 1F=9.1F[G]||K;m(!$2a(1F)){m(G==\'21\')l $2a(9.21)?9.21:1;m([\'3c\',\'aU\'].1l(G)){l[9.1V(G+\'-1k\')||0,9.1V(G+\'-45\')||0,9.1V(G+\'-3y\')||0,9.1V(G+\'-1m\')||0].2z(\' \')}m(N.94)1F=N.94.aW(9,1W).aY(G.9n());U m(9.5Q)1F=9.5Q[G]}m(1F==\'at\'&&[\'2u\',\'2v\'].1l(G))l 9[\'3P\'+G.9l()]+\'2Q\';l(1F&&G.1l(/1Y/i)&&1F.1l(/1p/))?1F.5O():1F},1d:k(B,W){9.12=9.12||{};9.12[B]=9.12[B]||{\'1S\':[],\'1X\':[]};m(!9.12[B].1S.1l(W)){9.12[B].1S.1v(W);m(9.9h){9.9h((B==\'4r\'&&18.7f)?\'72\':B,W,K)}U{W=W.O(9);9.bh(\'6s\'+B,W);9.12[B].1X.1v(W)}}l 9},bc:k(1B){m(1B){P(n B 15 1B)9.1d(B,1B[B])}l 9},1T:k(B,W){m(9.12&&9.12[B]){n 1N=9.12[B].1S.49(W);m(1N==-1)l 9;n 1E=9.12[B].1S.6o(1N,1)[0];m(9.9t){9.9t((B==\'4r\'&&18.7f)?\'72\':B,1E,K)}U{9.aT(\'6s\'+B,9.12[B].1X.6o(1N,1)[0])}}l 9},4j:k(B){m(9.12){m(B){m(9.12[B]){9.12[B].1S.1j(k(W){9.1T(B,W)},9);9.12[B]=1W}}U{P(n 9f 15 9.12)9.4j(9f);9.12=1W}}l 9},1g:k(B,1c){m(9.12&&9.12[B]){9.12[B].1S.1j(k(W){W.O(9,1c)()},9)}},6l:k(6m){n o=9[6m+\'93\'];3O($B(o)==\'5L\')o=o[6m+\'93\'];l $(o)},90:k(){l 9.6l(\'2s\')},5x:k(){l 9.6l(\'5i\')},aA:k(){n o=9.az;3O($B(o)==\'5L\')o=o.av;l $(o)},au:k(){n o=9.aw;3O($B(o)==\'5L\')o=o.ax;l $(o)},ay:k(){l $(9.2P)},7I:k(){l $$(9.9w)},5M:k(G,L){2f(G){1a\'9z\':9.1s=L;2b;1a\'1F\':9.4D(L);2b;1a\'22\':m(18.6z){n o=$(N.9a(\'<\'+9.4I()+\' 22="\'+L+\'" />\'));$1j(9.aG,k(4g){m(4g.22!=\'22\')o.5M(4g.22,4g.L)});m(9.2P)9.9T(o);l o}6W:9.aR(G,L)}l 9},88:k(1B){P(n G 15 1B)9.5M(G,1B[G]);l 9},4V:k(){9.aI=$A(1h).2z(\'\');l 9},7X:k(G){l(G==\'9z\')?9.1s:9.8A(G)},4I:k(){l 9.62.4R()},2X:k(x,y){9.57=x;9.58=y},3d:k(){2f(9.4I()){1a\'3r\':m(9.9E!=-1){n 74=9.u[9.9E];l 74.L||74.1I}2b;1a\'8g\':m(!(9.aK&&[\'aH\',\'aM\'].1l(9.B))&&![\'3t\',\'1I\',\'aN\'].1l(9.B))2b;1a\'8I\':l 9.L}l K},61:k(){l{\'2i\':{\'x\':9.57,\'y\':9.58},\'3v\':{\'x\':9.2E,\'y\':9.2y},\'5X\':{\'x\':9.5t,\'y\':9.5c}}},3K:k(3h){3h=3h||[];n o=9,1m=0,1k=0;aQ{1m+=o.aP||0;1k+=o.aO||0;o=o.aF}3O(o);3h.1j(k(F){1m-=F.57||0;1k-=F.58||0});l{\'x\':1m,\'y\':1k}},5s:k(){l 9.3K().y},69:k(){l 9.3K().x},3u:k(3h){n 1z=9.3K(3h);n J={\'2v\':9.2E,\'2u\':9.2y,\'1m\':1z.x,\'1k\':1z.y};J.45=J.1m+J.2v;J.3y=J.1k+J.2u;l J}});18.1d=N.1d=1i.19.1d;18.1T=N.1T=1i.19.1T;18.4j=N.4j=1i.19.4j;n 3G={11:[],5y:k(F){3G.11.1v(F)},6f:k(){3G.5y(18);3G.5y(N);3G.11.1j(k(o){o.4j();P(n p 15 1i.19)o[p]=1W;o.Q=1W})}};18.1d(\'aE\',3G.6f);n 4S=I V({1e:k(C){9.C=C||18.C;9.B=9.C.B;9.4Q=9.C.4Q||9.C.aB;m(9.4Q.8M==3)9.4Q=9.4Q.2P;9.8j=9.C.bb;9.ba=9.C.b9;9.b7=9.C.bd;9.bg=9.C.aX;m([\'72\',\'4r\'].1l(9.B)){9.4X=9.C.8v?(9.C.8v/(18.6X?-8w:8w)):-(9.C.aV||0)/ 3} U m (9.B.1l(/1E/)){9.6T=9.C.8E||9.C.b0;P(n 22 15 4S.1S){m(4S.1S[22]==9.6T){9.1E=22;2b}}9.1E=9.1E||5Z.b4(9.6T).4R()}U m(9.B.1l(/2h/)||(9.B==\'6K\')){9.1M={\'x\':9.C.6V||9.C.8p+N.2o.57,\'y\':9.C.6H||9.C.8r+N.2o.58};9.8U={\'x\':9.C.6V?9.C.6V-18.7U:9.C.8p,\'y\':9.C.6H?9.C.6H-18.7P:9.C.8r};9.a2=(9.C.8E==3)||(9.C.a6==2);2f(9.B){1a\'9W\':9.67=9.C.67||9.C.as;2b;1a\'9P\':9.67=9.C.67||9.C.79}}},1A:k(){9.6b();9.66();l 9},6b:k(){m(9.C.6b)9.C.6b();U 9.C.a8=1f;l 9},66:k(){m(9.C.66)9.C.66();U 9.C.ab=K;l 9}});4S.1S={\'aa\':13,\'a9\':38,\'ad\':40,\'1m\':37,\'45\':39,\'af\':27,\'ae\':32,\'b8\':8,\'cX\':46};6u.Q({28:k(O,1c){l 9.2c({\'O\':O,\'1h\':1c,\'C\':4S})}});n 7r=I V({9X:k(W){9.3F=9.3F||[];9.3F.1v(W);l 9},7p:k(){m(9.3F&&9.3F.14)9.3F.8j().2n(10,9)},8F:k(){9.3F=[]}});n 3m=I V({1d:k(B,W){m(W!=V.1n){9.12=9.12||{};9.12[B]=9.12[B]||[];m(!9.12[B].1l(W))9.12[B].1v(W)}l 9},1g:k(B,1c,2n){m(9.12&&9.12[B]){9.12[B].1j(k(W){W.2c({\'O\':9,\'2n\':2n,\'1h\':1c})()},9)}l 9},1T:k(B,W){m(9.12&&9.12[B])9.12[B].3V(W);l 9}});n 33=I V({2q:k(5e,u){9.u=1H.Q(5e,u);m(9.1d){P(n 4N 15 9.u){m(($B(9.u[4N])==\'k\')&&4N.1l(/^6s[A-Z]/))9.1d(4N,9.u[4N])}}l 9}});n cB=I V({1e:k(){9.4H=$A(1h);9.12={};9.4q={}},1d:k(B,W){9.4q[B]=9.4q[B]||{};9.12[B]=9.12[B]||[];m(9.12[B].1l(W))l K;U 9.12[B].1v(W);9.4H.1j(k(4G,i){4G.1d(B,9.7W.O(9,[B,4G,i]))},9);l 9},7W:k(B,4G,i){9.4q[B][i]=1f;n 4M=9.4H.4M(k(1R,j){l 9.4q[B][j]||K},9);m(!4M)l;9.4H.1j(k(1R,j){9.4q[B][j]=K},9);9.12[B].1j(k(C){C.1D(9,9.4H,4G)},9)}});k $E(1x,2J){l($(2J)||N).6h(1x)};k $cL(1x,2J){l($(2J)||N).3C(1x)};1i.Q({4J:k(1x){n 11=[];1x.65().5G(\' \').1j(k(6c,i){n 29=6c.2p(/^(\\w*|\\*)(?:#([\\w-]+)|\\.([\\w-]+))?(?:\\[(\\w+)(?:([*^$]?=)["\']?([^"\'\\]]*)["\']?)?])?$/);m(!29)l;2I.1x=29;29[1]=29[1]||\'*\';m(i==0){m(29[2]){n o=9.64(29[2]);m(!o||((29[1]!=\'*\')&&(1i.19.4I.1D(o)!=29[1])))l;11=[o]}U{11=$A(9.3e(29[1]))}}U{11=2K.19.3e.1D(11,29[1],1f);m(29[2])11=11.2J(2I.3W)}m(29[3])11=11.2J(2I.1s);m(29[4])11=11.2J(2I.4g)},9);l $$(11)},64:k(3W){n o=N.64(3W);m(!o)l K;P(n 1u=o.2P;1u!=9;1u=1u.2P){m(!1u)l K}l o},6h:k(1x){l 9.3C(1x)[0]},3C:k(1x){n 73=[];1x.5G(\',\').1j(k(6c){73.Q(9.4J(6c))},9);l $$(73)}});N.Q({cN:k(1s){l N.4J(\'.\'+1s)},6h:1i.19.6h,4J:1i.19.4J,3C:1i.19.3C});n 2I={1x:[],3W:k(o){l(o.3W==2I.1x[2])},1s:k(o){l(1i.19.5V.1D(o,2I.1x[3]))},4g:k(o){n 1R=o.8A(2I.1x[4]);m(!1R)l K;n 76=2I.1x[5];m(!76)l 1f;n L=2I.1x[6];2f(76){1a\'*=\':l(1R.1l(L));1a\'=\':l(1R==L);1a\'^=\':l(1R.1l(\'^\'+L));1a\'$=\':l(1R.1l(L+\'$\'))}l K}};2K.Q({3e:k(62){n 78=[];9.1j(k(o){78.Q(o.3e(62))});l 78}});n 8y=I V({14:0,J:{},1e:k(J){9.Q(J)},7g:k(1E){l 9.J[1E]},cA:k(1E){l 9.J[1E]!==3D},2e:k(1E,L){m(L===3D)l K;m(9.J[1E]===3D)9.14++;9.J[1E]=L;l 9},3V:k(1E){m(9.J[1E]===3D)l 9;n J={};9.14--;P(n G 15 9.J){m(G!=1E)J[G]=9.J[G]}9.J=J;l 9},1j:k(W,O){P(n G 15 9.J)W.1D(O||9,G,9.J[G])},Q:k(J){P(n G 15 J){m(9.J[G]===3D)9.14++;9.J[G]=J[G]}l 9},1n:k(){l(9.14==0)},1S:k(){n 1S=[];P(n G 15 9.J)1S.1v(G);l 1S},1X:k(){n 1X=[];P(n G 15 9.J)1X.1v(9.J[G]);l 1X}});k $H(J){l I 8y(J)};n 2l=I V({1e:k(1Y,B){m(1Y.8x)l 1Y;1Y.8x=1f;B=B||(1Y.1v?\'1p\':\'36\');n 1p,1Q;2f(B){1a\'1p\':1p=1Y;1Q=1p.6R();2b;1a\'1Q\':1p=1Y.8Y();1Q=1Y;2b;6W:1p=1Y.52(1f);1Q=1p.6R()}1p.1Q=1Q;l 1H.Q(1p,2l.19)},cD:k(){n 4K=$A(1h);n 6g=($B(4K[4K.14-1])==\'9J\')?4K.cY():50;n 1p=9.6P();4K.1j(k(1Y){1Y=I 2l(1Y);P(n i=0;i<3;i++)1p[i]=M.2t((1p[i]/ 2x * (2x - 6g)) + (1Y[i] /2x*6g))});l I 2l(1p,\'1p\')},d5:k(){l I 2l(9.4A(k(L){l 3X-L}))},db:k(L){l I 2l([L,9.1Q[1],9.1Q[2]],\'1Q\')},d6:k(6d){l I 2l([9.1Q[0],6d,9.1Q[2]],\'1Q\')},d4:k(6d){l I 2l([9.1Q[0],9.1Q[1],6d],\'1Q\')}});k $cS(r,g,b){l I 2l([r,g,b],\'1p\')};k $cF(h,s,b){l I 2l([h,s,b],\'1Q\')};1L.Q({6R:k(){n 4U=9[0],55=9[1],5n=9[2];n 2r,5q,6O;n 1q=M.1q(4U,55,5n),34=M.34(4U,55,5n);n 4T=1q-34;6O=1q/3X;5q=(1q!=0)?4T/1q:0;m(5q==0){2r=0}U{n 6U=(1q-4U)/4T;n 6S=(1q-55)/4T;n br=(1q-5n)/4T;m(4U==1q)2r=br-6S;U m(55==1q)2r=2+6U-br;U 2r=4+6S-6U;2r/=6;m(2r<0)2r++}l[M.2t(2r*8X),M.2t(5q*2x),M.2t(6O*2x)]},8Y:k(){n br=M.2t(9[2]/2x*3X);m(9[1]==0){l[br,br,br]}U{n 2r=9[0]%8X;n f=2r%60;n p=M.2t((9[2]*(2x-9[1]))/cx*3X);n q=M.2t((9[2]*(8R-9[1]*f))/8Q*3X);n t=M.2t((9[2]*(8R-9[1]*(60-f)))/8Q*3X);2f(M.8K(2r/60)){1a 0:l[br,t,p];1a 1:l[q,br,p];1a 2:l[p,br,t];1a 3:l[p,q,br];1a 4:l[t,p,br];1a 5:l[br,p,q]}}l K}});18.Q({1d:k(B,W){m(B==\'56\'){m(9.5u)W();U m(!9.12||!9.12.56){n 54=k(){m(9.5u)l;9.5u=1f;m(9.1r)9.1r=$3H(9.1r);1i.19.1g.1D(9,\'56\');9.12.56=1W}.O(9);m(N.4w&&9.3R){9.1r=k(){m([\'5u\',\'8O\'].1l(N.4w))54()}.3g(50)}U m(N.4w&&9.3L){N.cK("<2W 3W=8P cJ 5g=5Y:cI(0)><\\/2W>");$(\'8P\').7h=k(){m(9.4w==\'8O\')54()}}U{9.1d("cM",54);N.1d("cQ",54)}}}1i.19.1d.1D(9,B,W);l 9},cP:k(7S){l 9.1d(\'56\',7S)}});18.Q({7b:k(){m(9.3R)l 9.bj;m(9.6X)l N.3q.80;l N.2o.80},6M:k(){m(9.3R)l 9.cH;m(9.6X)l N.3q.7Z;l N.2o.7Z},8n:k(){m(9.3L)l M.1q(N.2o.2E,N.2o.5t);m(9.3R)l N.3q.5t;l N.2o.5t},8h:k(){m(9.3L)l M.1q(N.2o.2y,N.2o.5c);m(9.3R)l N.3q.5c;l N.2o.5c},6N:k(){l 9.7U||N.2o.57},6I:k(){l 9.7P||N.2o.58},61:k(){l{\'3v\':{\'x\':9.7b(),\'y\':9.6M()},\'5X\':{\'x\':9.8n(),\'y\':9.8h()},\'2i\':{\'x\':9.6N(),\'y\':9.6I()}}},3K:k(){l{\'x\':0,\'y\':0}}});n 1b={};1b.1U=I V({23:k(){l{3k:V.1n,1G:V.1n,70:V.1n,83:1b.47.6j,3s:cG,2k:\'2Q\',2T:1f,8i:50}},1e:k(u){9.F=9.F||1W;9.2q(9.23(),u);m(9.u.1e)9.u.1e.1D(9)},1C:k(){n 43=I 7q().7i();m(43<9.43+9.u.3s){9.8f=43-9.43;9.3I();9.3b()}U{9.1A(1f);9.Y=9.R;9.3b();9.1g(\'1G\',9.F,10);9.7p()}},2e:k(R){9.Y=R;9.3b();l 9},3I:k(){9.Y=9.3N(9.T,9.R)},3N:k(T,R){l 9.u.83(9.8f,T,(R-T),9.u.3s)},17:k(T,R){m(!9.u.2T)9.1A();U m(9.1r)l 9;9.T=T;9.R=R;9.43=I 7q().7i();9.1r=9.1C.3g(M.2t(cy/9.u.8i),9);9.1g(\'3k\',9.F);l 9},1A:k(1Z){m(!9.1r)l 9;9.1r=$3H(9.1r);m(!1Z)9.1g(\'70\',9.F);l 9},cw:k(T,R){l 9.17(T,R)},cE:k(1Z){l 9.1A(1Z)}});1b.1U.1P(I 7r);1b.1U.1P(I 3m);1b.1U.1P(I 33);1b.47={9N:k(t,b,c,d){l c*t/d+b},6j:k(t,b,c,d){l-c/2*(M.6k(M.2A*t/d)-1)+b}};1b.2G={3r:k(G,R){m(G.1l(/1Y/i))l 9.2l;m(R.1l&&R.1l(\' \'))l 9.5v;l 9.8l},2m:k(o,G,4a){m(!4a.1v)4a=[4a];n T=4a[0],R=4a[1];m(!R&&R!=0){R=T;T=o.1V(G)}n 1o=9.3r(G,R);l{T:1o.2m(T),R:1o.2m(R),1o:1o}}};1b.2G.8l={2m:k(L){l 53(L)},4c:k(T,R,2g){l 2g.3N(T,R)},3d:k(L,2k){l L+2k}};1b.2G.5v={2m:k(L){l L.1v?L:L.5G(\' \').4A(k(v){l 53(v)})},4c:k(T,R,2g){n Y=[];P(n i=0;i<T.14;i++)Y[i]=2g.3N(T[i],R[i]);l Y},3d:k(L,2k){l L.2z(2k+\' \')+2k}};1b.2G.2l={2m:k(L){l L.1v?L:L.52(1f)},4c:k(T,R,2g){n Y=[];P(n i=0;i<T.14;i++)Y[i]=M.2t(2g.3N(T[i],R[i]));l Y},3d:k(L){l\'1p(\'+L.2z(\',\')+\')\'}};1b.85=1b.1U.Q({1e:k(o,G,u){9.F=$(o);9.G=G;9.1u(u)},63:k(){l 9.2e(0)},3I:k(){9.Y=9.1o.4c(9.T,9.R,9)},2e:k(R){9.1o=1b.2G.3r(9.G,R);l 9.1u(9.1o.2m(R))},17:k(T,R){m(9.1r&&9.u.2T)l 9;n 1O=1b.2G.2m(9.F,9.G,[T,R]);9.1o=1O.1o;l 9.1u(1O.T,1O.R)},3b:k(){9.F.1J(9.G,9.1o.3d(9.Y,9.u.2k))}});1i.Q({cR:k(G,u){l I 1b.85(9,G,u)}});1b.84=1b.1U.Q({1e:k(o,u){9.F=$(o);9.1u(u)},3I:k(){P(n p 15 9.T)9.Y[p]=9.1o[p].4c(9.T[p],9.R[p],9)},2e:k(R){n 1O={};9.1o={};P(n p 15 R){9.1o[p]=1b.2G.3r(p,R[p]);1O[p]=9.1o[p].2m(R[p])}l 9.1u(1O)},17:k(J){m(9.1r&&9.u.2T)l 9;9.Y={};9.1o={};n T={},R={};P(n p 15 J){n 1O=1b.2G.2m(9.F,p,J[p]);T[p]=1O.T;R[p]=1O.R;9.1o[p]=1O.1o}l 9.1u(T,R)},3b:k(){P(n p 15 9.Y)9.F.1J(p,9.1o[p].3d(9.Y[p],9.u.2k))}});1i.Q({2V:k(u){l I 1b.84(9,u)}});1b.2K=1b.1U.Q({1e:k(11,u){9.11=$$(11);9.1u(u)},3I:k(){P(n i 15 9.T){n 4W=9.T[i],35=9.R[i],31=9.1o[i],4Y=9.Y[i]={};P(n p 15 4W)4Y[p]=31[p].4c(4W[p],35[p],9)}},2e:k(R){n 1O={};9.1o={};P(n i 15 R){n 35=R[i],31=9.1o[i]={},89=1O[i]={};P(n p 15 35){31[p]=1b.2G.3r(p,35[p]);89[p]=31[p].2m(35[p])}}l 9.1u(1O)},17:k(J){m(9.1r&&9.u.2T)l 9;9.Y={};9.1o={};n T={},R={};P(n i 15 J){n 71=J[i],4W=T[i]={},35=R[i]={},31=9.1o[i]={};P(n p 15 71){n 1O=1b.2G.2m(9.11[i],p,71[p]);4W[p]=1O.T;35[p]=1O.R;31[p]=1O.1o}}l 9.1u(T,R)},3b:k(){P(n i 15 9.Y){n 4Y=9.Y[i],31=9.1o[i];P(n p 15 4Y)9.11[i].1J(p,31[p].3d(4Y[p],9.u.2k))}}});1b.9C=1b.1U.Q({1e:k(F,u){9.Y=[];9.F=$(F);9.1d(\'3k\',k(){9.F.1d(\'4r\',9.1A.O(9,K))}.O(9));9.1T(\'1G\',k(){9.F.1T(\'4r\',9.1A.O(9,K))}.O(9));9.1u(u)},3I:k(){P(n i=0;i<2;i++)9.Y[i]=9.3N(9.T[i],9.R[i])},2X:k(x,y){m(9.1r&&9.u.2T)l 9;n o=9.F.61();n 1X={\'x\':x,\'y\':y};P(n z 15 o.3v){n 1q=o.5X[z]-o.3v[z];m($2a(1X[z]))1X[z]=($B(1X[z])==\'9J\')?M.1q(M.34(1X[z],1q),0):1q;U 1X[z]=o.2i[z]}l 9.17([o.2i.x,o.2i.y],[1X.x,1X.y])},da:k(){l 9.2X(K,0)},d7:k(){l 9.2X(K,\'9A\')},dc:k(){l 9.2X(0,K)},d8:k(){l 9.2X(\'9A\',K)},79:k(o){l 9.2X($(o).69(),$(o).5s())},3b:k(){9.F.2X(9.Y[0],9.Y[1])}});1b.d9=1b.1U.Q({1e:k(o,u){9.F=$(o).1J(\'3c\',0);9.2F=I 1i(\'48\').7w(9.F).1J(\'99\',\'3t\').9D(9.F);9.2q({\'1K\':\'6t\'},u);9.Y=[];9.1u(9.u)},3I:k(){P(n i=0;i<2;i++)9.Y[i]=9.3N(9.T[i],9.R[i])},6t:k(){9.3c=\'1k\';9.7e=\'2u\';9.3P=9.F.2y;l[9.F.1V(\'3c-1k\').2w(),9.2F.1V(\'2u\').2w()]},6D:k(){9.3c=\'1m\';9.7e=\'2v\';9.3P=9.F.2E;l[9.F.1V(\'3c-1m\').2w(),9.2F.1V(\'2v\').2w()]},9R:k(1K){l 9.17(9[1K||9.u.1K](),[0,9.3P])},9Q:k(1K){l 9.17(9[1K||9.u.1K](),[-9.3P,0])},63:k(1K){9[1K||9.u.1K]();l 9.2e([-9.3P,0])},3j:k(1K){9[1K||9.u.1K]();l 9.2e([0,9.3P])},cW:k(1K){m(9.2F.2y==0||9.2F.2E==0)l 9.9R(1K);U l 9.9Q(1K)},3b:k(){9.F.1J(\'3c-\'+9.3c,9.Y[0]+9.u.2k);9.2F.1J(9.7e,9.Y[1]+9.u.2k)}});1b.47={9N:k(t,b,c,d){l c*t/d+b},cV:k(t,b,c,d){l c*(t/=d)*t+b},cT:k(t,b,c,d){l-c*(t/=d)*(t-2)+b},cU:k(t,b,c,d){m((t/=d/2)<1)l c/2*t*t+b;l-c/2*((--t)*(t-2)-1)+b},cZ:k(t,b,c,d){l c*(t/=d)*t*t+b},d3:k(t,b,c,d){l c*((t=t/d-1)*t*t+1)+b},d2:k(t,b,c,d){m((t/=d/2)<1)l c/2*t*t*t+b;l c/2*((t-=2)*t*t+2)+b},d1:k(t,b,c,d){l c*(t/=d)*t*t*t+b},d0:k(t,b,c,d){l-c*((t=t/d-1)*t*t*t-1)+b},cC:k(t,b,c,d){m((t/=d/2)<1)l c/2*t*t*t*t+b;l-c/2*((t-=2)*t*t*t-2)+b},cu:k(t,b,c,d){l c*(t/=d)*t*t*t*t+b},bJ:k(t,b,c,d){l c*((t=t/d-1)*t*t*t*t+1)+b},bK:k(t,b,c,d){m((t/=d/2)<1)l c/2*t*t*t*t*t+b;l c/2*((t-=2)*t*t*t*t+2)+b},bI:k(t,b,c,d){l-c*M.6k(t/d*(M.2A/2))+c+b},bH:k(t,b,c,d){l c*M.4Z(t/d*(M.2A/2))+b},6j:k(t,b,c,d){l-c/2*(M.6k(M.2A*t/d)-1)+b},bE:k(t,b,c,d){l(t==0)?b:c*M.2H(2,10*(t/d-1))+b},bF:k(t,b,c,d){l(t==d)?b+c:c*(-M.2H(2,-10*t/d)+1)+b},bG:k(t,b,c,d){m(t==0)l b;m(t==d)l b+c;m((t/=d/2)<1)l c/2*M.2H(2,10*(t-1))+b;l c/2*(-M.2H(2,-10*--t)+2)+b},bL:k(t,b,c,d){l-c*(M.59(1-(t/=d)*t)-1)+b},bM:k(t,b,c,d){l c*M.59(1-(t=t/d-1)*t)+b},bS:k(t,b,c,d){m((t/=d/2)<1)l-c/2*(M.59(1-t*t)-1)+b;l c/2*(M.59(1-(t-=2)*t)+1)+b},bT:k(t,b,c,d,a,p){m(t==0)l b;m((t/=d)==1)l b+c;m(!p)p=d*.3;m(!a)a=1;m(a<M.6n(c)){a=c;n s=p/4}U n s=p/(2*M.2A)*M.6p(c/a);l-(a*M.2H(2,10*(t-=1))*M.4Z((t*d-s)*(2*M.2A)/p))+b},cv:k(t,b,c,d,a,p){m(t==0)l b;m((t/=d)==1)l b+c;m(!p)p=d*.3;m(!a)a=1;m(a<M.6n(c)){a=c;n s=p/4}U n s=p/(2*M.2A)*M.6p(c/a);l a*M.2H(2,-10*t)*M.4Z((t*d-s)*(2*M.2A)/p)+c+b},bR:k(t,b,c,d,a,p){m(t==0)l b;m((t/=d/2)==2)l b+c;m(!p)p=d*(.3*1.5);m(!a)a=1;m(a<M.6n(c)){a=c;n s=p/4}U n s=p/(2*M.2A)*M.6p(c/a);m(t<1)l-.5*(a*M.2H(2,10*(t-=1))*M.4Z((t*d-s)*(2*M.2A)/p))+b;l a*M.2H(2,-10*(t-=1))*M.4Z((t*d-s)*(2*M.2A)/p)*.5+c+b},bN:k(t,b,c,d,s){m(!s)s=1.6A;l c*(t/=d)*t*((s+1)*t-s)+b},bO:k(t,b,c,d,s){m(!s)s=1.6A;l c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},bP:k(t,b,c,d,s){m(!s)s=1.6A;m((t/=d/2)<1)l c/2*(t*t*(((s*=(1.9p))+1)*t-s))+b;l c/2*((t-=2)*t*(((s*=(1.9p))+1)*t+s)+2)+b},9M:k(t,b,c,d){l c-1b.47.6E(d-t,0,c,d)+b},6E:k(t,b,c,d){m((t/=d)<(1/2.75)){l c*(7.5J*t*t)+b}U m(t<(2/2.75)){l c*(7.5J*(t-=(1.5/2.75))*t+.75)+b}U m(t<(2.5/2.75)){l c*(7.5J*(t-=(2.25/2.75))*t+.bD)+b}U{l c*(7.5J*(t-=(2.bC/2.75))*t+.bp)+b}},bq:k(t,b,c,d){m(t<d/2)l 1b.47.9M(t*2,0,c,d)*.5+b;l 1b.47.6E(t*2-d,0,c,d)*.5+c*.5+b}};n 2M={};2M.1U=I V({23:k(){l{3T:K,2k:\'2Q\',3k:V.1n,6C:V.1n,1G:V.1n,9s:V.1n,7j:V.1n,1w:K,3n:{x:\'1m\',y:\'1k\'},3S:6}},1e:k(o,u){9.2q(9.23(),u);9.F=$(o);9.3T=$(9.u.3T)||9.F;9.2h={\'Y\':{},\'1N\':{}};9.L={\'17\':{},\'Y\':{}};9.1y={\'17\':9.17.28(9)};9.91();m(9.u.1e)9.u.1e.1D(9)},91:k(){9.3T.1d(\'5h\',9.1y.17)},17:k(C){9.1g(\'6C\',9.F);9.2h.17=C.1M;n 1w=9.u.1w;9.1w={\'x\':[],\'y\':[]};P(n z 15 9.u.3n){9.L.Y[z]=9.F.1V(9.u.3n[z]).2w();9.2h.1N[z]=C.1M[z]-9.L.Y[z];m(1w&&1w[z]){P(n i=0;i<2;i++){m($2a(1w[z][i]))9.1w[z][i]=1w[z][i].3M?1w[z][i].1D(9):1w[z][i]}}}9.1y.2j=9.2j.28(9);9.1y.1A=9.1A.O(9);9.1y.2B=9.u.3S?9.9j.28(9):9.1y.2j;N.1d(\'2R\',9.1y.2B);N.1d(\'5W\',9.1y.1A);9.1g(\'3k\',9.F);C.1A()},9j:k(C){n 9u=M.2t(M.59(M.2H(C.1M.x-9.2h.17.x,2)+M.2H(C.1M.y-9.2h.17.y,2)));m(9u>9.u.3S){N.1T(\'2R\',9.1y.2B);9.1y.2B=9.1y.2j;N.1d(\'2R\',9.1y.2B);9.2j(C);9.1g(\'9s\',9.F)}C.1A()},2j:k(C){9.4t=K;9.2h.Y=C.1M;P(n z 15 9.u.3n){9.L.Y[z]=9.2h.Y[z]-9.2h.1N[z];m(9.1w[z]){m($2a(9.1w[z][1])&&(9.L.Y[z]>9.1w[z][1])){9.L.Y[z]=9.1w[z][1];9.4t=1f}U m($2a(9.1w[z][0])&&(9.L.Y[z]<9.1w[z][0])){9.L.Y[z]=9.1w[z][0];9.4t=1f}}9.F.1J(9.u.3n[z],9.L.Y[z]+9.u.2k)}9.1g(\'7j\',9.F);C.1A()},7N:k(){9.3T.1T(\'5h\',9.1y.17)},1A:k(){N.1T(\'2R\',9.1y.2B);N.1T(\'5W\',9.1y.1A);9.1g(\'1G\',9.F)}});2M.1U.1P(I 3m);2M.1U.1P(I 33);1i.Q({bo:k(u){l I 2M.1U(9,1H.Q(u||{},{3n:{x:\'2v\',y:\'2u\'}}))}});2M.9y=2M.1U.Q({5A:k(){l{4s:[],4u:K,3h:[]}},1e:k(o,u){9.2q(9.5A(),u);9.F=$(o);9.1z=9.F.1V(\'1z\');9.4s=$$(9.u.4s);m(![\'4p\',\'7Q\'].1l(9.1z))9.1z=\'4p\';n 1k=9.F.1V(\'1k\').2w();n 1m=9.F.1V(\'1m\').2w();m(9.1z==\'4p\'){1k=$2a(1k)?1k:9.F.5s();1m=$2a(1m)?1m:9.F.69()}U{1k=$2a(1k)?1k:0;1m=$2a(1m)?1m:0}9.F.4D({\'1k\':1k+\'2Q\',\'1m\':1m+\'2Q\',\'1z\':9.1z});9.1u(9.F,9.u)},17:k(C){9.4u=$(9.u.4u);m(9.4u){n 2S=9.4u.3u();n o=9.F.3u();m(9.1z==\'4p\'){9.u.1w={\'x\':[2S.1m,2S.45-o.2v],\'y\':[2S.1k,2S.3y-o.2u]}}U{n 6r=o.1m-9.F.1V(\'1m\').2w();n 6x=o.1k-9.F.1V(\'1k\').2w();9.u.1w={\'y\':[-(6x)+2S.1k,2S.3y-6x-o.2u],\'x\':[-(6r)+2S.1m,2S.45-6r-o.2v]}}}9.1u(C)},2j:k(C){9.1u(C);m(9.4t)l 9;9.4s.1j(k(2d){m(9.6w($(2d))){m(!2d.5F)2d.1g(\'bk\',[9.F,9]);2d.5F=1f}U{m(2d.5F)2d.1g(\'bl\',[9.F,9]);2d.5F=K}},9);l 9},6w:k(o){o=o.3u(9.u.3h);l(9.2h.Y.x>o.1m&&9.2h.Y.x<o.45&&9.2h.Y.y<o.3y&&9.2h.Y.y>o.1k)},1A:k(){9.1u();9.1r=$3H(9.1r);m(9.4t)l 9;n 6v=K;9.4s.1j(k(2d){m(9.6w(2d)){2d.1g(\'2d\',[9.F,9]);6v=1f}},9);m(!6v)9.F.1g(\'2d\',9);l 9}});1i.Q({bm:k(u){l I 2M.9y(9,u)}});n 4h=I V({23:k(){l{3f:\'4e\',9Y:1f,9L:V.1n,5K:V.1n,4f:V.1n,5D:V.1n,3B:{},5E:9.5E}},1e:k(u){9.24=18.5T?I 5T():(18.3L?I 8m(\'bt.bu\'):K);9.2q(9.23(),u);m(!9.24)l;9.3B={};m(9.u.1e)9.u.1e.1D(9)},5K:k(){9.1g(\'5K\',9.24);m(9.24.4w!=4)l;n 3J=0;7K{3J=9.24.3J}7G(e){}m(9.u.5E(3J))9.4f();U 9.5D();9.24.7h=V.1n},5E:k(3J){l((3J>=bA)&&(3J<bB))},4f:k(){9.2U={\'1I\':9.24.bz,\'4B\':9.24.by};9.1g(\'4f\',[9.2U.1I,9.2U.4B]);9.7p()},5D:k(){9.1g(\'5D\',9.24)},4i:k(22,L){9.3B[22]=L;l 9},4C:k(2D,2N){9.1g(\'9L\');9.24.bv(9.u.3f,2D,9.u.9Y);9.24.7h=9.5K.O(9);m((9.u.3f==\'4e\')&&9.24.bw)9.4i(\'bx\',\'bU\');1H.Q(9.3B,9.u.3B);P(n B 15 9.3B)9.24.bV(B,9.3B[B]);9.24.4C(2N);l 9}});4h.1P(I 7r);4h.1P(I 3m);4h.1P(I 33);n 81=4h.Q({95:k(){l{3U:1W,7u:1W,1G:V.1n,5l:K,9I:K,4x:\'cj-8\'}},1e:k(2D,u){9.1d(\'4f\',9.1G);9.2q(9.95(),u);9.1u(9.u);m(![\'4e\',\'7g\'].1l(9.u.3f)){9.4z=\'4z=\'+9.u.3f;9.u.3f=\'4e\'}m(9.u.3f==\'4e\'){n 4x=(9.u.4x)?\'; ck=\'+9.u.4x:\'\';9.4i(\'ci-B\',\'9G/x-ch-ce-cf\'+4x)}9.4i(\'X-cg-cl\',\'5T\');9.4i(\'cm\',\'1I/5Y, 1I/cs, 9G/4B, 1I/4B, */*\');9.2D=2D},1G:k(){m(9.u.7u)$(9.u.7u).4V(9.2U.1I);m(9.u.9I)7B(9.2U.1I);m(9.u.5l)9.5l.2n(30,9);9.1g(\'1G\',[9.2U.1I,9.2U.4B],20)},7R:k(){n 2N=1W;2f($B(9.u.3U)){1a\'F\':2N=$(9.u.3U).3Y();2b;1a\'4y\':2N=1H.3Y(9.u.3U);2b;1a\'2L\':2N=9.u.3U}m(9.4z)2N=(2N)?[9.4z,2N].2z(\'&\'):9.4z;l 9.4C(9.2D,2N)},5l:k(){n 2W,8k=/<2W[^>]*>([\\s\\S]*?)<\\/2W>/cq;3O((2W=8k.cn(9.2U.1I)))7B(2W[1])}});1H.3Y=k(1B){n 7s=[];P(n G 15 1B)7s.1v(7V(G)+\'=\'+7V(1B[G]));l 7s.2z(\'&\')};1i.Q({4C:k(u){u=1H.Q(u||{},{3U:9.3Y(),3f:\'4e\'});l I 81(9.7X(\'co\'),u).7R()},8V:k(){n J={};$$(9.3e(\'8g\'),9.3e(\'3r\'),9.3e(\'8I\')).1j(k(o){n 22=$(o).22;n L=o.3d();m((L!==K)&&22)J[22]=L});l J},3Y:k(){l 1H.3Y(9.8V())}});n cp={2e:k(1E,L,u){u=1H.Q({5k:K,5m:K,3s:cd},u||{});L=cc(L);m(u.5k)L+="; 5k="+u.5k;m(u.5m)L+="; 5m="+u.5m;m(u.3s){n 5N=I 7q();5N.c1(5N.7i()+(u.3s*c2));L+="; c0="+5N.bZ()}N.8t=1E+"="+L},7g:k(1E){n L=N.8t.2p(\'(?:^|;)\\\\s*\'+1E+\'=([^;]*)\');l L?bW(L[1]):K},3V:k(1E){9.2e(1E,\'\',{3s:-1})}};n 4k={4v:k(J){2f($B(J)){1a\'2L\':l\'"\'+J.3l(I 7o(\'(["\\\\\\\\])\',\'g\'),\'\\\\$1\')+\'"\';1a\'26\':l\'[\'+J.4A(k(ar){l 4k.4v(ar)}).2z(\',\')+\']\';1a\'4y\':n 2L=[];P(n G 15 J)2L.1v(\'"\'+G+\'":\'+4k.4v(J[G]));l\'{\'+2L.2z(\',\')+\'}\'}l 5Z(J)},8J:k(8L){l 7B(\'(\'+8L+\')\')}};4k.c3=4h.Q({1e:k(2D,u){9.2D=2D;9.1d(\'4f\',9.1G);9.1u(u);9.4i(\'X-c4\',\'ca\')},4C:k(J){l 9.1u(9.2D,\'cb=\'+4k.4v(J))},1G:k(){9.1g(\'1G\',4k.8J(9.2U.1I))}});n 5f={5Y:k(1B,1t){l 5f.2c(\'2W\',{\'B\':\'1I/5Y\',\'5g\':1B},1t,1f)},1o:k(1B,1t){l 5f.2c(\'c9\',{\'9k\':\'c8\',\'c5\':\'c6\',\'B\':\'1I/1o\',\'3z\':1B},1t,1f)},3A:k(1B,1t){1t=1H.Q({\'5g\':1B,\'5d\':V.1n,\'7L\':V.1n,\'7H\':V.1n},1t||{});n 3A=I c7();3A.5d=k(){m(1h.7Y.8b)l K;1h.7Y.8b=1f;9.5d=1W;l 1t.5d.1D(9)};3A.7H=1t.7H;3A.7L=1t.7L;3A.5g=1t.5g;l 5f.2c(\'7y\',1t)},5U:k(4o,u){u=1H.Q({1G:V.1n,8z:V.1n},u||{});m(!4o.1v)4o=[4o];n 5U=[];7n=0;4o.1j(k(1B){n 7y=I 5f.3A(1B,{\'5d\':k(){7n++;u.8z();m(7n==4o.14)u.1G()}});5U.1v(7y)});l 5U},2c:k(B,5e,1t,4b){1H.Q(5e,1t||{});n F=I 1i(B).88(5e);m(4b)F.2O($$(\'ct\')[0]);l F}};n 7a=1b.2K.Q({5A:k(){l{6Y:V.1n,9m:V.1n,2Z:0,3j:K,2u:1f,2v:K,21:1f,5S:K,5B:K,2T:K,5j:K}},1e:k(3x,11,u){9.2q(9.5A(),u);9.2s=-1;m(9.u.5j)9.u.2T=1f;m($2a(9.u.3j)){9.u.2Z=K;9.2s=9.u.3j}m(9.u.17){9.u.2Z=K;9.u.3j=K}9.3x=$$(3x);9.11=$$(11);9.3x.1j(k(9Z,i){9Z.1d(\'6K\',9.2Z.O(9,i))},9);9.11.1j(k(o,i){o.9b=1;m(9.u.5B)o.9i=9.u.5B;m(9.u.5S)o.9V=9.u.5S;o.1J(\'99\',\'3t\')},9);9.2V={};m(9.u.21)9.2V.21=\'9b\';m(9.u.2v)9.2V.2v=9.u.5B?\'9i\':\'2E\';m(9.u.2u)9.2V.2u=9.u.5S?\'9V\':\'5c\';9.11.1j(k(o,i){m(9.u.3j===i)9.1g(\'6Y\',[9.3x[i],o]);U P(n 2g 15 9.2V)o.1J(2g,0)},9);9.1u(9.11,9.u);m($2a(9.u.2Z))9.2Z(9.u.2Z)},2Z:k(42){m((9.1r&&9.u.2T)||(42===9.2s&&!9.u.5j))l 9;9.2s=42;n J={};9.11.1j(k(o,i){J[i]={};m((i!=42)||(9.u.5j&&(o.2y>0))){9.1g(\'9m\',[9.3x[i],o]);P(n 2g 15 9.2V)J[i][2g]=0}U{9.1g(\'6Y\',[9.3x[i],o]);P(n 2g 15 9.2V)J[i][2g]=o[9.2V[2g]]}},9);l 9.17(J)},cz:k(42){l 9.2Z(42)}});1b.7a=7a;n 6q=I V({23:k(){l{5b:20,6F:1,68:k(x,y){9.F.2X(x,y)}}},1e:k(F,u){9.2q(9.23(),u);9.F=$(F);9.6J=([18,N].1l(F))?$(N.3q):9.F},17:k(){9.6Q=9.8T.28(9);9.6J.1d(\'2R\',9.6Q)},1A:k(){9.6J.1T(\'2R\',9.6Q);9.1r=$3H(9.1r)},8T:k(C){9.1M=(9.F==18)?C.8U:C.1M;m(!9.1r)9.1r=9.2i.3g(50,9)},2i:k(){n o=9.F.61();n 1N=9.F.3K();n 3w={\'x\':0,\'y\':0};P(n z 15 9.1M){m(9.1M[z]<(9.u.5b+1N[z])&&o.2i[z]!=0)3w[z]=(9.1M[z]-9.u.5b-1N[z])*9.u.6F;U m(9.1M[z]+9.u.5b>(o.3v[z]+1N[z])&&o.2i[z]+o.3v[z]!=o.5X[z])3w[z]=(9.1M[z]-o.3v[z]+9.u.5b-1N[z])*9.u.6F}m(3w.y||3w.x)9.1g(\'68\',[o.2i.x+3w.x,o.2i.y+3w.y])}});6q.1P(I 3m);6q.1P(I 33);n 6L=I V({23:k(){l{68:V.1n,1G:V.1n,6Z:k(1N){9.2C.1J(9.p,1N+\'2Q\')},4E:2x,1K:\'6D\',4X:K}},1e:k(o,2C,u){9.F=$(o);9.2C=$(2C);9.2q(9.23(),u);9.7k=-1;9.7z=-1;9.1C=-1;9.F.1d(\'5h\',9.8W.28(9));m(9.u.4X)9.F.1d(\'4r\',9.8u.28(9));m(9.u.1K==\'6D\'){9.z=\'x\';9.p=\'1m\';9.1q=9.F.2E-9.2C.2E;9.7d=9.2C.2E/2;9.6G=9.F.69.O(9.F)}U m(9.u.1K==\'6t\'){9.z=\'y\';9.p=\'1k\';9.1q=9.F.2y-9.2C.2y;9.7d=9.2C.2y/2;9.6G=9.F.5s.O(9.F)}9.2C.1J(\'1z\',\'7Q\').1J(9.p,0);n 7C={},7D={};7D[9.z]=[0,9.1q];7C[9.z]=9.p;9.2j=I 2M.1U(9.2C,{1w:7D,3S:0,3n:7C,3k:k(){9.5p()}.O(9),7j:k(){9.5p()}.O(9),1G:k(){9.5p();9.1Z()}.O(9)});m(9.u.1e)9.u.1e.1D(9)},2e:k(1C){m(1C>9.u.4E)1C=9.u.4E;U m(1C<0)1C=0;9.1C=1C;9.6a();9.1Z();9.1g(\'6Z\',9.8e(9.1C)+\'\');l 9},8u:k(C){m(C.4X<0)9.2e(9.1C+1);U m(C.4X>0)9.2e(9.1C-1);C.1A()},8W:k(C){n 1z=C.1M[9.z]-9.6G()-9.7d;m(1z>9.1q)1z=9.1q;U m(1z<0)1z=0;9.1C=9.7A(1z);9.6a();9.1Z();9.1g(\'6Z\',1z+\'\')},5p:k(){9.1C=9.7A(9.2j.L.Y[9.z]);9.6a()},6a:k(){m(9.7k!=9.1C){9.7k=9.1C;9.1g(\'68\',9.1C)}},1Z:k(){m(9.7z!==9.1C){9.7z=9.1C;9.1g(\'1G\',9.1C+\'\')}},7A:k(1z){l M.2t(1z/9.1q*9.u.4E)},8e:k(1C){l(9.1q)*1C/9.u.4E}});6L.1P(I 3m);6L.1P(I 33);n bs=1b.9C.Q({1e:k(u){9.1d(\'70\',9.8F);n 4L=18.4L.3z.2p(/^[^#]*/)[0]+\'#\';$1j(N.cO,k(4n){m(4n.3z.49(4L)!=0)l;n 3Q=4n.3z.96(4L.14);m(3Q&&$(3Q))9.82(4n,3Q)},9);9.1u(18,u)},82:k(4n,3Q){4n.1d(\'6K\',k(C){m(!18.3R)9.9X(k(){18.4L.3z=\'#\'+3Q});9.79(3Q);C.1A()}.28(9))}});n 7F=I V({23:k(){l{41:K,3k:V.1n,1G:V.1n,2Y:1f,3S:3,8s:k(F,2Y){2Y.1J(\'21\',0.5)},8Z:k(F,2Y){2Y.3V()}}},1e:k(4m,u){9.2q(9.23(),u);9.4m=$(4m);9.11=9.4m.7I();9.41=$$(9.u.41)||9.11;9.2j=[];9.1y={\'17\':[]};9.11.1j(k(o,i){9.1y.17[i]=9.17.28(9,o);m(9.u.2Y){9.6f=I 1i(\'48\').2O(N.3q);n 1w=9.4m.3u();9.2j[i]=I 2M.1U(o,{3T:9.41[i],3S:9.u.3S,3n:{y:\'1k\'},1w:{y:[1w.1k,1w.3y-o.2y]},6C:k(F){n 4d=F.3K();9.8o=F;9.2j[i].F=9.2Y=F.98().4D({\'1z\':\'4p\',\'1k\':4d.y+\'2Q\',\'1m\':4d.x+\'2Q\'}).2O(9.6f);9.1g(\'8s\',[o,9.2Y])}.O(9),1G:k(F){9.2j[i].F=9.8o;9.1g(\'8Z\',[o,9.2Y])}.O(9)})}9.41[i].1d(\'5h\',9.17.28(9,o))},9);m(9.u.1e)9.u.1e.1D(9)},17:k(C,o){9.1y.2B=9.2B.28(9,o);9.1y.1Z=9.1Z.O(9,o);N.1d(\'2R\',9.1y.2B);N.1d(\'5W\',9.1y.1Z);9.1g(\'3k\',o);C.1A()},2B:k(C,o){n 5o=o.90();n 5i=o.5x();m(5o){n 87=5o.3u();m(C.1M.y<87.3y)o.9H(5o)}m(5i){n 9d=5i.3u();m(C.1M.y>9d.1k)o.7w(5i)}C.1A()},7N:k(){9.11.1j(k(o,i){9.41[i].1T(\'5h\',9.1y.17[i])},9)},bX:k(){n 7J=[];9.4m.7I().1j(k(o,i){7J[i]=9.11.49(o)},9);l 7J},1Z:k(o){N.1T(\'2R\',9.1y.2B);N.1T(\'5W\',9.1y.1Z);9.1g(\'1G\',o)}});7F.1P(I 3m);7F.1P(I 33);n 7E=I V({23:k(){l{8D:k(3o){3o.1J(\'3p\',\'7m\')},8q:k(3o){3o.1J(\'3p\',\'3t\')},6y:30,8c:2x,8d:2x,1s:\'bY\',4d:{\'x\':16,\'y\':16},9U:K}},1e:k(11,u){9.2q(9.23(),u);9.3E=I 1i(\'48\').5a(9.u.1s+\'-3o\').4D({\'1z\':\'4p\',\'1k\':\'0\',\'1m\':\'0\',\'3p\':\'3t\'}).2O(N.3q);9.2F=I 1i(\'48\').2O(9.3E);$1j(11,k(o){9.8N($(o))},9);m(9.u.1e)9.u.1e.1D(9)},8N:k(o){o.3i=o.3z?o.3z.3l(\'cr://\',\'\'):(o.9k||K);m(o.51){n 5H=o.51.5G(\'::\');m(5H.14>1){o.3i=5H[0].5I();o.4F=5H[1].5I()}U{o.4F=o.51}o.bn(\'51\')}U{o.4F=K}m(o.3i&&o.3i.14>9.u.6y)o.3i=o.3i.96(0,9.u.6y-1)+"&bQ;";o.1d(\'9W\',k(C){9.17(o);9.7c(C)}.28(9));m(!9.u.9U)o.1d(\'2R\',9.7c.28(9));o.1d(\'9P\',9.1Z.28(9))},17:k(o){9.2F.4V(\'\');m(o.3i){I 1i(\'9K\').2O(I 1i(\'48\').5a(9.u.1s+\'-51\').2O(9.2F)).4V(o.3i)}m(o.4F){I 1i(\'9K\').2O(I 1i(\'48\').5a(9.u.1s+\'-1I\').2O(9.2F)).4V(o.4F)}$3H(9.1r);9.1r=9.3j.2n(9.u.8c,9)},1Z:k(C){$3H(9.1r);9.1r=9.63.2n(9.u.8d,9);C.1A()},7c:k(C){n 8G={\'x\':18.7b(),\'y\':18.6M()};n 2i={\'x\':18.6N(),\'y\':18.6I()};n 3o={\'x\':9.3E.2E,\'y\':9.3E.2y};n 77={\'x\':\'1m\',\'y\':\'1k\'};P(n z 15 77){n 1N=C.1M[z]+9.u.4d[z];m((1N+3o[z]-2i[z])>8G[z])1N=C.1M[z]-9.u.4d[z]-3o[z];9.3E.1J(77[z],1N+\'2Q\')};C.1A()},3j:k(){9.1g(\'8D\',[9.3E])},63:k(){9.1g(\'8q\',[9.3E])}});7E.1P(I 3m);7E.1P(I 33);',62,819,'|||||||||this|||||||||||function|return|if|var|el||||||options|||||||type|event|||element|property||new|obj|false|value|Math|document|bind|for|extend|to||from|else|Class|fn||now|||elements|events||length|in||start|window|prototype|case|Fx|args|addEvent|initialize|true|fireEvent|arguments|Element|each|top|test|left|empty|css|rgb|max|timer|className|properties|parent|push|limit|selector|bound|position|stop|source|step|call|key|style|onComplete|Object|text|setStyle|mode|Array|page|pos|parsed|implement|hsb|current|keys|removeEvent|Base|getStyle|null|values|color|end||opacity|name|getOptions|transport||array||bindWithEvent|param|chk|break|create|drop|set|switch|fx|mouse|scroll|drag|unit|Color|parse|delay|documentElement|match|setOptions|hue|previous|round|height|width|toInt|100|offsetHeight|join|PI|move|knob|url|offsetWidth|wrapper|CSS|pow|Filters|filter|Elements|string|Drag|data|injectInside|parentNode|px|mousemove|cont|wait|response|effects|script|scrollTo|ghost|display||iCss||Options|min|iTo|hex||||returns|increase|margin|getValue|getElementsByTagName|method|periodical|overflown|myTitle|show|onStart|replace|Events|modifiers|tip|visibility|body|select|duration|hidden|getCoordinates|size|change|togglers|bottom|href|image|headers|getElementsBySelector|undefined|toolTip|chains|Garbage|clear|setNow|status|getPosition|ie|apply|compute|while|offset|anchor|khtml|snap|handle|postBody|remove|id|255|toQueryString|newArray||handles|index|time|results|right||Transitions|div|indexOf|fromTo|inject|getNow|offsets|post|onSuccess|attribute|XHR|setHeader|removeEvents|Json|item|list|lnk|sources|absolute|checker|mousewheel|droppables|out|container|toString|readyState|encoding|object|_method|map|xml|send|setStyles|steps|myText|instance|instances|getTag|getElements|colors|location|every|option|HTMLElement|items|target|toLowerCase|Event|delta|red|setHTML|iFrom|wheel|iNow|sin||title|hexToRgb|parseFloat|domReady|green|domready|scrollLeft|scrollTop|sqrt|addClass|area|scrollHeight|onload|defaults|Asset|src|mousedown|next|alwaysHide|domain|evalScripts|path|blue|prev|draggedKnob|saturation|forEach|getTop|scrollWidth|loaded|Multi|regex|getNext|collect|bit|getExtended|fixedWidth|appendChild|onFailure|isSuccess|overing|split|dual|trim|5625|onStateChange|whitespace|setProperty|date|rgbToHex|attempt|currentStyle|ms|fixedHeight|XMLHttpRequest|images|hasClass|mouseup|scrollSize|javascript|String||getSize|tagName|hide|getElementById|clean|preventDefault|relatedTarget|onChange|getLeft|checkStep|stopPropagation|sel|percent|klass|trash|alpha|getElement|pr0t0typ3|sineInOut|cos|getBrother|what|abs|splice|asin|Scroller|diffx|on|vertical|Function|dropped|checkAgainst|diffy|maxTitleChars|ie6|70158|camelCase|onBeforeStart|horizontal|bounceOut|velocity|getPos|pageY|getScrollTop|mousemover|click|Slider|getHeight|getScrollLeft|brightness|copy|coord|rgbToHsb|gr|code|rr|pageX|default|opera|onActive|onTick|onCancel|iProps|DOMMouseScroll|els|opt||operator|prop|found|toElement|Accordion|getWidth|locate|half|layout|gecko|get|onreadystatechange|getTime|onDrag|previousChange|htmlElement|visible|counter|RegExp|callChain|Date|Chain|queryString|typeof|update|charAt|injectAfter|parseInt|img|previousEnd|toStep|eval|modSlide|limSlide|Tips|Sortables|catch|onerror|getChildren|serial|try|onabort|Native|detach|iterable|pageYOffset|relative|request|init|parentize|pageXOffset|encodeURIComponent|check|getProperty|callee|clientHeight|clientWidth|Ajax|useLink|transition|Styles|Style|params|prevPos|setProperties|iParsed|noinit|done|showDelay|hideDelay|toPosition|cTime|input|getScrollHeight|fps|shift|regexp|Single|ActiveXObject|getScrollWidth|old|clientX|onHide|clientY|onDragStart|cookie|scrolledElement|wheelDelta|120|isColor|Hash|onProgress|getAttribute|random|picked|onShow|which|clearChain|win|some|textarea|evaluate|floor|str|nodeType|build|complete|ie_ready|600000|6000|toUpperCase|getCoords|client|toObject|clickedElement|360|hsbToRgb|onDragComplete|getPrevious|attach|setOpacity|Sibling|defaultView|moreOptions|substr|inside|clone|overflow|createElement|fullOpacity|removeClass|nextPos|toFloat|evType|err|addEventListener|fullWidth|checkAndDrag|rel|capitalize|onBackground|hyphenate|_element_extended_|525|contents|_elements_extended_|onSnap|removeEventListener|distance|where|childNodes|after|Move|class|full|Number|Scroll|adopt|selectedIndex|before|application|injectBefore|evalResponse|number|span|onRequest|bounceIn|linear|insertBefore|mouseout|slideOut|slideIn|cssText|replaceWith|fixed|fullHeight|mouseover|chain|async|tog|all|toggleClass|rightClick|taintEnabled|navigator|createTextNode|button|styleSheet|cancelBubble|up|enter|returnValue|nodeName|down|space|esc|Window|nodeValue|removeChild|clearTimeout|clearInterval|ie7|appendText|replaceChild|cloneNode|textnode|pick||fromElement|auto|getLast|nextSibling|lastChild|previousSibling|getParent|firstChild|getFirst|srcElement|setTimeout|concat|unload|offsetParent|attributes|checkbox|innerHTML|transparent|checked|slice|radio|password|offsetTop|offsetLeft|do|setAttribute|setInterval|detachEvent|padding|detail|getComputedStyle|metaKey|getPropertyValue|BackgroundImageCache|keyCode|hasLayout|execCommand|zoom|fromCharCode|embed|bindAsEventListener|alt|backspace|ctrlKey|control|shiftKey|addEvents|altKey|associate|pass|meta|attachEvent|getBoxObjectFor|innerWidth|over|leave|makeDraggable|removeAttribute|makeResizable|984375|bounceInOut||SmoothScroll|Microsoft|XMLHTTP|open|overrideMimeType|Connection|responseXML|responseText|200|300|625|9375|expoIn|expoOut|expoInOut|sineOut|sineIn|quintOut|quintInOut|circIn|circOut|backIn|backOut|backInOut|hellip|elasticInOut|circInOut|elasticIn|close|setRequestHeader|unescape|serialize|tool|toGMTString|expires|setTime|86400000|Remote|Request|media|screen|Image|stylesheet|link|JSON|json|escape|365|form|urlencoded|Requested|www|Content|utf|charset|With|Accept|exec|action|Cookie|gi|http|html|head|quintIn|elasticOut|custom|10000|1000|showThisHideOpen|hasKey|Group|quartInOut|mix|clearTimer|HSB|500|innerHeight|void|defer|write|ES|load|getElementsByClassName|links|onDomReady|DOMContentLoaded|effect|RGB|quadOut|quadInOut|quadIn|toggle|delete|pop|cubicIn|quartOut|quartIn|cubicInOut|cubicOut|setBrightness|invert|setSaturation|toBottom|toRight|Slide|toTop|setHue|toLeft'.split('|'),0,{}))

// ============================================
// Tribal eXtension By JonnyD
// ============================================

// Global CSS
var newCSS = '';
// Array con los datos globales del pueblo seleccionado
var twDatosGlobales = new Array();
// Array con todos los enlaces del TW.
var twLinks = new Array();
// Identificador del Pueblo
var vID = 0;
// Url para movernos por nuestra cuenta de tribalwars
var twUrlScreen ="";
// Contiene las tropas de cada Pueblo
var Tropas = new Array();
// Listado de pueblos
var twListaPueblos = new Array();
// Url Actual
var nowUrl =""
// Cantidad total de Pueblos
var nPueblos = 0;

// Método: addGlobalStyle
// Atributos: $css
// Explicación: Permite editar/modificar las hojas de estilo
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Método: getParam
// Atributos: $name
// Explicación: Busca y devuelve en la url en la que nos encontramos el string indicado (@name), sino lo encuentra
//							devuelve una cadena vacía.
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

baseURL = getParam('GETURL');
// Identificador del jugador
var	pID = GM_getValue("pID", 0);

// Método: twCargarCSS
// Explicación: Escribe y carga las nuevas hojas de estilo
function twCargarCSS()
{
	// Css TwBarMenu
	newCSS += '.menu {font: 12px arial;margin:0; z-index:99;vertical-align:middle;}';
	newCSS += '.menu ul li a, .menu ul li a:visited {display:block; text-decoration:none;width:auto; height:auto;min-height:20px;text-align:center;vertical-align:middle; color:#804000;background:#f1ebdd; padding: 4px; overflow:hidden;}';
	newCSS += '.menu ul {padding:0; margin:0;list-style-type: none; }';
	newCSS += '.menu ul li {float:left; margin-right:0px; position:relative;}';
	newCSS += '.menu ul li ul {display: none}';
	newCSS += '.menu ul li:hover a {color:#0082BE; background:#FFF;border-left:1px solid #804000;border-right:1px solid #804000;}';
	newCSS += '.menu ul li:hover ul {display:block; position:absolute; top:29px; left:0; width:105px;margin-top:-3px;}';
	newCSS += '.menu ul li:hover ul li a.hide {background:#804000; color:#fff}';
	newCSS += '.menu ul li:hover ul li:hover a.hide {color:#000; background:#ded3b9;}';
	newCSS += '.menu ul li:hover ul li ul {display: none;}';
	newCSS += '.menu ul li:hover ul li a {display:block; background:#f1ebdd; border: 1px solid; border-top: 0; color:#000;}';
	newCSS += '.menu ul li:hover ul li a:hover {color:#000; background:#ded3b9;}';
	newCSS += '.menu ul li:hover ul li:hover ul {display:block; position:absolute; left:105px; top:0;}';
	newCSS += '.menu ul li:hover ul li:hover ul.left {left:-105px;}';
	newCSS += '.menu ul li:hover ul li:hover ul {left:-169px;}';
	newCSS += '#BarraNav{width:850px;height:150px;margin-top:40px;}';
	
	// Nueva Hoja de estilos agregada
	addGlobalStyle(newCSS);

}

// Método: twInit
// Explicación: Inicializa Tribal eXtension
function twInit()
{

	// Inicialización de todas las variables globales 
	
	if(getParam('screen') != "")
		nowUrl += "&screen="+getParam('screen');
	if(getParam('mode')!= "")
		nowUrl += "&mode="+getParam('mode');
	if(getParam('id') != "")
		nowUrl += "&id="+getParam('id');
	
	vID = document.evaluate('/html/body/table[2]/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	vID = vID.substring( vID.indexOf("e=",0)+2, vID.indexOf("&amp;sc",0) );
	// Detecta si esta en modo vacaciones o no
	if( getParam('t') != ""){
		pID = getParam('t');
		twUrlScreen = baseURL+'/game.php?t='+pID+'&';
	}
	else{
		twUrlScreen = baseURL+'/game.php?';
	}

	// Enlaces: Menú Principal
	twLinks["Salir"] = document.evaluate('/html/body/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	twLinks["Salir"] = twUrlScreen+"village="+vID+"&screen=&action=logout&h="+twLinks["Salir"].substring( twLinks["Salir"].indexOf("h=",0)+2, twLinks["Salir"].indexOf("\" ",0) );
	twLinks["Foro"] = "http://board.tribalwars.net/index.php";
	twLinks["Chat"] = baseURL+"/chat.php";
	twLinks["Ayuda"] = baseURL+"/help.php";
	twLinks["Opciones"] = twUrlScreen+"village="+vID+"&screen=settings"; 
		twLinks["OpcionesEmail"] = twUrlScreen+"village="+vID+"&screen=settings&mode=profile";
		twLinks["OpcionesOpciones"] = twUrlScreen+"village="+vID+"&screen=settings&mode=settings";
		twLinks["OpcionesEmpezar"] = twUrlScreen+"village="+vID+"&screen=settings&mode=move";
		twLinks["OpcionesEliminar"] = twUrlScreen+"village="+vID+"&screen=settings&mode=ref";
		twLinks["OpcionesCompartir"] = twUrlScreen+"village="+vID+"&screen=settings&mode=share";
		twLinks["OpcionesVacaciones"] = twUrlScreen+"village="+vID+"&screen=settings&mode=vacation";
		twLinks["OpcionesAccesos"] = twUrlScreen+"village="+vID+"&screen=settings&mode=logins";
		twLinks["OpcionesPassword"] = twUrlScreen+"village="+vID+"&screen=settings&mode=change_passwd";
		twLinks["OpcionesEncuestas"] = twUrlScreen+"village="+vID+"&screen=settings&mode=poll";
		twLinks["OpcionesSoporte"] = "http://en1l1.ds.innogames.net/ticket_login.php";
		twLinks["OpcionesNotas"] = twUrlScreen+"village="+vID+"&screen=memo";
	twLinks["Premium"] = twUrlScreen+"village="+vID+"&screen=premium"; 
	twLinks["Ranking"] = twUrlScreen+"village="+vID+"&screen=ranking"; 
		twLinks["RankingPorJugador"] =twUrlScreen+"village="+vID+"&screen=ranking&mode=player";
		twLinks["RankingPorTribu"] = twUrlScreen+"village="+vID+"&screen=ranking&mode=ally";
		twLinks["RankingAdvAtaque"] = twUrlScreen+"village="+vID+"&screen=ranking&mode=kill_player&lit_player_id=&type=att";
		twLinks["RankingAdvDefensor"] = twUrlScreen+"village="+vID+"&screen=ranking&mode=kill_player&lit_player_id=&type=def";
		twLinks["RankingAdvTotal"] = twUrlScreen+"village="+vID+"&screen=ranking&mode=kill_player&lit_player_id=&type=all";
	twLinks["Tribu"] = twUrlScreen+"village="+vID+"&screen=ally"; 
		twLinks["TribuHistorial"] = twUrlScreen+"village="+vID+"&screen=ally&mode=overview";
		twLinks["TribuMiembros"] = twUrlScreen+"village="+vID+"&screen=ally&mode=members";
		twLinks["TribuPerfil"] = twUrlScreen+"village="+vID+"&screen=ally&mode=profile";
		twLinks["TribuDiplomacia"] = twUrlScreen+"village="+vID+"&screen=ally&mode=contracts";
		twLinks["TribuForo"] = twUrlScreen+"village="+vID+"&screen=ally&mode=forum";
	twLinks["Informes"] = twUrlScreen+"village="+vID+"&screen=report"; 
		twLinks["InformesTodos"] = twUrlScreen+"village="+vID+"&screen=report&mode=all";
		twLinks["InformesAtaque"] = twUrlScreen+"village="+vID+"&screen=report&mode=attack";
		twLinks["InformesDefensa"] = twUrlScreen+"village="+vID+"&screen=report&mode=defense";
		twLinks["InformesApoyo"] = twUrlScreen+"village="+vID+"&screen=report&mode=support";
		twLinks["InformesComercio"] = twUrlScreen+"village="+vID+"&screen=report&mode=trade";
		twLinks["InformesOtro"] = twUrlScreen+"village="+vID+"&screen=report&mode=other";

	twLinks["Mensajes"] = twUrlScreen+"village="+vID+"&screen=mail"; 
		twLinks["MensajesEntrada"] = twUrlScreen+"village="+vID+"&screen=mail&mode=in";
		twLinks["MensajesSalida"] = twUrlScreen+"village="+vID+"&screen=mail&mode=out";
		twLinks["MensajesArchivo"] = twUrlScreen+"village="+vID+"&screen=mail&mode=arch";
		twLinks["MensajesNuevo"] = twUrlScreen+"village="+vID+"&screen=mail&mode=new";
		twLinks["MensajesBloquear"] = twUrlScreen+"village="+vID+"&screen=mail&mode=Block";
	
	// Enlaces: Edificios
	twLinks["Principal"] = twUrlScreen+"village="+vID+"&screen=main";
		twLinks["PrincipalConstruir"] = twUrlScreen+"village="+vID+"&screen=main&mode=build";
		twLinks["PrincipalDerribar"] = twUrlScreen+"village="+vID+"&screen=main&mode=destroy";
	twLinks["Cuartel"] = twUrlScreen+"village="+vID+"&screen=barracks";
	twLinks["Cuadra"] = twUrlScreen+"village="+vID+"&screen=stable";
	twLinks["Taller"] = twUrlScreen+"village="+vID+"&screen=garage";
	twLinks["Corte"] = twUrlScreen+"village="+vID+"&screen=snob";
	twLinks["Herreria"] = twUrlScreen+"village="+vID+"&screen=smith";
	twLinks["Plaza"] = twUrlScreen+"village="+vID+"&screen=place";
		twLinks["PlazaOrdenes"] = twUrlScreen+"village="+vID+"&screen=place&mode=command";
		twLinks["PlazaTropas"] =  twUrlScreen+"village="+vID+"&screen=place&mode=units";
		twLinks["PlazaSimulador"] =  twUrlScreen+"village="+vID+"&screen=place&mode=sim";
	twLinks["Mercado"] = twUrlScreen+"village="+vID+"&screen=market";
		twLinks["MercadoEnviarRecursos"] = twUrlScreen+"village="+vID+"&screen=market&mode=send";
		twLinks["MercadoMisOfertas"] = twUrlScreen+"village="+vID+"&screen=market&mode=own_offer";
		twLinks["MercadoOtrasOfertas"] = twUrlScreen+"village="+vID+"&screen=market&mode=other_offer";
		twLinks["MercadoComerciantes"] = twUrlScreen+"village="+vID+"&screen=market&mode=traders";
	twLinks["Madera"] = twUrlScreen+"village="+vID+"&screen=wood";
	twLinks["Barro"] = twUrlScreen+"village="+vID+"&screen=stone";
	twLinks["Hierro"] = twUrlScreen+"village="+vID+"&screen=iron";
	twLinks["Granja"] = twUrlScreen+"village="+vID+"&screen=farm";
	twLinks["Almacen"] = twUrlScreen+"village="+vID+"&screen=storage";
	twLinks["Escondrijo"] = twUrlScreen+"village="+vID+"&screen=hide";
	twLinks["Muralla"] = twUrlScreen+"village="+vID+"&screen=wall";
	
	// Enlaces: MiniImágenes de los Edificios
	twLinks["imgPrincipal"] = "http://en1.ds.ignames.net/graphic/buildings/main.png";
	twLinks["imgCuartel"] = "http://en1.ds.ignames.net/graphic/buildings/barracks.png";
	twLinks["imgCuadra"] = "http://en1.ds.ignames.net/graphic/buildings/stable.png";
	twLinks["imgTaller"] = "http://en1.ds.ignames.net/graphic/buildings/garage.png";
	twLinks["imgCorte"] = "http://en1.ds.ignames.net/graphic/buildings/snob.png";
	twLinks["imgHerreria"] = "http://en1.ds.ignames.net/graphic/buildings/smith.png";
	twLinks["imgPlaza"] = "http://en1.ds.ignames.net/graphic/buildings/place.png";
	twLinks["imgMercado"] = "http://en1.ds.ignames.net/graphic/buildings/market.png";
	twLinks["imgMadera"] = "http://en1.ds.ignames.net/graphic/buildings/wood.png";
	twLinks["imgBarro"] = "http://en1.ds.ignames.net/graphic/buildings/stone.png";
	twLinks["imgHierro"] = "http://en1.ds.ignames.net/graphic/buildings/iron.png";
	twLinks["imgGranja"] = "http://en1.ds.ignames.net/graphic/buildings/farm.png";
	twLinks["imgAlmacen"] = "http://en1.ds.ignames.net/graphic/buildings/storage.png";
	twLinks["imgEscondrijo"] = "http://en1.ds.ignames.net/graphic/buildings/hide.png";
	twLinks["imgMuralla"] = "http://en1.ds.ignames.net/graphic/buildings/wall.png";
	
	// Enlaces: MiniImágenes de las Unidades
	twLinks["imgLancero"] = "http://en1.ds.ignames.net/graphic/unit/unit_spear.png";
	twLinks["imgEspada"] = "http://en1.ds.ignames.net/graphic/unit/unit_sword.png";
	twLinks["imgHacha"] = "http://en1.ds.ignames.net/graphic/unit/unit_axe.png";
	twLinks["imgEspia"] = "http://en1.ds.ignames.net/graphic/unit/unit_spy.png";
	twLinks["imgLigero"] = "http://en1.ds.ignames.net/graphic/unit/unit_light.png";
	twLinks["imgPesado"] = "http://en1.ds.ignames.net/graphic/unit/unit_heavy.png";
	twLinks["imgAriete"] = "http://en1.ds.ignames.net/graphic/unit/unit_ram.png";
	twLinks["imgCatapulta"] = "http://en1.ds.ignames.net/graphic/unit/unit_catapult.png";
	twLinks["imgAristocrata"] = "http://en1.ds.ignames.net/graphic/unit/unit_snob.png";
	
	// Enlaces: MiniImágenes de los Recursos
	twLinks["imgMadera"] = "http://en1.ds.ignames.net/graphic/holz.png";
	twLinks["imgBarro"] = "http://en1.ds.ignames.net/graphic/lehm.png";
	twLinks["imgHierro"] = "http://en1.ds.ignames.net/graphic/eisen.png";
	
	//Enlace: MiniImagén de la granja
	twLinks["imgPoblacion"] = "http://en1.ds.ignames.net/graphic/face.png";
	
	// Enlaces: Herramientas
	twLinks["CompactadorHumor"] = "http://www.compactador.com.ar/TW/index.php";
	twLinks["CompactadorJuankar"] = "http://www.tribalpacker.mx.gs";
	twLinks["CompactadorMerlin"] = "http://www.prosur.com/tribalwars/inicio.php";
	twLinks["BuscadorPueblos1"] = "http://tribalwars.servegame.org";
	twLinks["BUscadorPueblos2"] = "http://www.guscreations.com/item.php?key=buscador_tribalwars";
	twLinks["CalcBotinTropas"] = "http://www.freewebs.com/bydarkmen/calcu2.html";
	twLinks["CalcTropasBotin"] = "http://www.freewebs.com/bydarkmen/calcuup.html";
	twLinks["CalcVelocidadTropas"] = "http://www.savefile.com/files/489797";
	twLinks["CalcPerdidas"] = "http://www.freewebs.com/bydarkmen/perdida.html";
	twLinks["CalcGranja"] = "http://granjerodepro.es.kz";
	twLinks["CalcTiempo"] = "http://www.comunidadvip.com/tw/";
	twLinks["TwTools"] = "http://www.tw-tools.com/";
	twLinks["DsPlusTropas"] = "http://w1.dsplus.de/index.php?tool=units";
	twLinks["DsPlusEdificios"] = "http://w1.dsplus.de/index.php?tool=buildings";
	
	// Enlaces Generales
	twLinks["Mapa"] =  twUrlScreen+"village="+vID+"&screen=map"; 
	twLinks["ListaPueblos"] =  twUrlScreen+"village="+vID+"&screen=overview_villages"; 
	twLinks["VerPueblo"] =  twUrlScreen+"village="+vID+"&screen=overview"; 
	twLinks["VistaGrafica"] = twUrlScreen+"village="+vID+"&screen=overview&action=set_visual&visual=1&h=";
	twLinks["VistaTexto"] = twUrlScreen+"village="+vID+"&screen=overview&action=set_visual&visual=0&h=";
	
	// Recursos
	twDatosGlobales["produccionDeMadera"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td[2]/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
	twDatosGlobales["produccionDeBarro"]= document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
	twDatosGlobales["produccionDeHierro"]  = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
	twDatosGlobales["Almacen"]= document.evaluate('//*[@id="storage"]',document,null,XPathResult.STRING_TYPE,null).stringValue; 
	twDatosGlobales["Madera"] = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[2]",document, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	twDatosGlobales["Barro"] = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[4]",document, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	twDatosGlobales["Hierro"]= document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[6]",document, null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	
	// Granja
	var aux="";
	aux = document.evaluate('/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td[2]/table/tbody/tr/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
	aux = aux.split("/");
	twDatosGlobales["Granja"] = new Array();
	twDatosGlobales["Granja"]["Ocupados"] = aux[0];
	twDatosGlobales["Granja"]["Totales"] = aux[1];
	twDatosGlobales["Granja"]["Libres"] = aux[1]-aux[0];
	
	// Imágenes Barra de Navegación
	twDatosGlobales["imgInterfaz"] = "data:image/png;base64,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%3D";
	twDatosGlobales["imgMenu"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%03R%00%00%00%2C%08%02%00%00%01%97%83.%EA%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%09%A6IDATx%DAb%BCwy'%C3(%A0%00%B0%40%A8E%B9%EE%85%AB%EF%8E%06%07%91%E0%FF%BF%BFg%B7%CFW4v%00%B2%99%80%F8%E9%B53%A3%C1G%12%60db6%F1N%F9%FD%FB%0F4%04%F7%CF%AA%1F%0D%142%C0%DBw%1F%A0!%183a%EBhp%90%01%98%99%99%11%E5%E0%B3%87%D7n%DDy%F0%E7%EF%DF%D1p!%12%88%8A%08%C9H%89%03%19%00%01%C48Z%17S%A1%22%FE%F6%E6%B5%AC%8E%E5hp%10%09%E6e%3B%F8%D7%CE%81%96%80%C2%12*%A3aG%12H%9Az%60%7Bo!4%F8F%01%19%20%B2%7D%1D4%F8%26Gk%8F%06%07%A9%60aO%05%A2%EAx%F2%EC%E5%EB7%EFF%03%85%D8%1A%83%99YME%81%9D%9D%0D%20%80Fk%DEQ0%08%9A.%40%B0%AC%D8%3Fw%E9%D5%D1%10%19%05%B4%06%C7%D6MU%B7r%87%B0%A1%8D%97%25%05%DE%A3%89o%14%D0%07%98%FB%A5%BD~%F3%1E%25%FD9%A65%8E%86%CB(%A0%0FX%5E%19%F4%FD%FB%0F%94%F4'%ADe%F2%E2%F1%8D%FEP%E5'%D7N%8E%06%D0(%A0%11X%90%EF%3A%BB%B5%40%DE%3BGRB%14%22%02%10%40%A3%FD%8FQ0%60%60t%E4j%14%0C%82%9E%EF%83s%07%2Fn%5D%9C8y%2F%23%13%F3h%B8%8C%02%AA%83%C7W%8E%AFi%8C%89%9B%8C%A8i%A1%D5%EE%BDS%7BM%FD%D2G%03h%14%D0%1AL%8E%D6%8E%E8%DE%C0%C4%C4%88%A8vo%1E%DE2%1A.%A3%80%0E%20w%E9%D5%5Bg%0E%A2%B4%F9%20so%A3%60%14%D0%01%9C%5E%DA%F5%E7%CF%9F%D1%0E%C7(%18%18%F0%EF%DF%7FD%E2%5B%5E%194%1A%22%A3%80%3E%40%DC%3E%EE%EF%BF%7F%88%C4%A7b%ED9%1A(%A3%80%3E%1D%0E1%15%03V%16fD%E2S%B5p%DB%B7%B4gA%BE%EBh%E8%8C%02%1A%81'%D7N%F6%87*%CB%04%D5%CA%CAH%B0%B0%80%C6%F8%103%1C%C0j%F8%E3%A7%CF%AF%DF%BC%FB%F6%ED%C7%7F%86%FF%A3%815%0A%A8%0B%18%19%18%B9%B88DE%84%F8%F9x!C-%00%01%D8%B9c%90%86%A1%20%0C%C0M%9A%C6%A6%D6%B6R%92Z%09(%06!%A8%05%07%17%17%D1%A5%8B%AB%0A%05%15%9C%DC%3Avp%11A%1CD%10%BB%8B%20%82%8B%83%08%0E%3A%89%88%20%3A%88Z)H%8B%22*%ED%18%8C%C5%A4%24%3E%ED%A0%B6%B1%CEI%FFoM%A6%1B~%EE%E5%EE%05%E35%00hDL%9Dg%C5%DC%CD%E5%FEf!wm~%9DN%00%00l%D0%E2%D1tD%8A%F5%8FN%0BR_%BD%D7j%FB%BE%E3%8D%A5%C7%AB%D3%E4v%16E%04%00%5BK'd16843GQ%D4%3F%D9%87%FF%93%00%80%C3%AC%8EK%13%2B%7BM%2C%FB3%01%7F-%18%1C%A6Sc%F3%5B%A8%14%008%09%89%B5%83%B5%94%AA%96*%9B-%16%D9W%CCg%DA%E5%01T%0A%00%9C%84%C4%9A%F2t%F7%AA%BEUVJ-%B2O%E8%EA%7D%CE%5E%A0R%00%E0%24%24%D6%BC%7C%A7%A6%EB%86iXg_%3C%B9%BC%B30%89J%01%80%93%90X%13%E3%B3n%DAM%B9%BE%BF%F7U%CF%3A%C8y%F8h%7D%F1%E5%F6%0Cs%5E%00%B0%BBtBv%0B%DD%E2%F0T%B4%8D%8F%F0a%9F%8F%AB%2C6%BB%2Cw%5CL%D3%7C%D74EQ%1F2%E7%F7'%BB%A5B%1E%15%04%00%1Ba%C3%1D%FE%9E%11%7FT%E28o(%D8%D2%1A%0A%06%02%CDUs%DE%3F%EFu%90%044%0CC%D3%CB%9F%F4%B2a%E2%9A%11%00%D8%06MQ%8C%87!X%0FC%93f%AFf%BF%EFC%00%F6%EE'%A4%C98%8E%E3%F8%FE%3C%8F%9Bnc%D3%A9-%A2%88h%105H%0F%15%5D%82%08tD%60%EC%94%15v%E8%22f%E7%90%0E%D5I%A2%82%3At%8A%20%06)x%10%C2%98%83%A8%8ER%10%CC%1A%12LL%88L%09Q%A8%B9%C7%FDy%9E%BE%EB%10%5B%9B%3Bt%7B%F6%BC_%E7g%97%CF%E1%C3%EF%B7%E7%F7%7C%7F%7C%D3%06%C0%92%E5H%04%00%E8%3E%00%B0%84F%B3%0CR%89%F8%B7%F4%FB%F5%AF%19b%02%60%16%C1%BD%E1%3D%91%E3%3Dg%87%FE%A7%FBf%C6%877V%BE%1C%3B%3F%DC%3Fz%7F%D7%81%08i%020%8B%B5%A5tfn6~%BD%DF%1F%DA7p%F3%C9N%8F%D5y%D7!%BF9%7D%F5VOt%88%10%01%98W*%19%7F%FB%F4%CE%E5G%C9%BFg%FA%1Au%9F%14%DF%E0%F8t%E8%E0Q%82%03%60v%AB%8B%F3%93c%B1K%0F%13%B5%C7%5C%AA%DEu%A4%12q%D9%E1R%7C%00%9A%83%B4%99t%DA%87%99gz%CD%00%E6%AA%EE%FB8%FB%FC%E2%DD%17%E4%05%A0iH%A7%7D~%3D%A5i%F9%CA%01V6%CE%B8%00%B0%82%7F%06X%D1%7D%00%2C!%BB%95%2B%14%8A%86a%D0%7D%00%2CD%16%7D%BAQ5%96%80%EE%03%60Et%1F%80%E6%B7%BD%9D%2F%CA%9E%D7%C6%9E%17%80%95%18%95%B5W%DB%7D%91%BE%C1%89%1B%03%C4%04%A0iH%A7%F9%0E%9Dr%3A%1D%E5%E3%CD%B6%1D%EE%A8%EC%3Dwem)%BD%BA8O%5E%00%9A%80%B4%99tZgo%B4%B5%D5%AD*J%E5%97%1DU%DDg%B7%DB%2F%3Cx99%16K%BF%99%225%00%A6%26%3D%26m%B6%3Bv%DB%E7%F5x%DAZUUi4%B3%5E%D7%8D%5CNK%DE%1B%C9%AE%AF%9C%88%5D%0B%9F%8Cv%ED%3FL%88%00%CC%E2%C7%F2Bf.%F9n%FA%B1%D3%DB%D9%DD7%DA%EE%F7uw%05%83%1D%01Y%FAU%0E5%A83%C7%A5T*e%B7r%9B%9B%3F%17%5EMl.%7F%CAo%7C'M%00f%A1%F8C%AEP%D8%7F%E4%8C%CB%D5%22%2B%BE%8Ev%7F%20%E0%93u%9F%D3%E9%AC%DA%E6%D6%BD%A7M%D7uM%CB%FF%CAnI%09j%DAv%A1%7CW%91N%A6%00L%C1aw%C8%0E%D7%EDvI%E5y%3DmnwK%ED%1C%97%3A%B3K%E5%09)%C8%F2_%83%AA%22%3F%2B%14%8BR%85%06%F7%B4%010%09)1)%3BUQ%D4%3FW%B5%D5%9D%DF%F7%5B%80%F6%EE%254%8A%3B%0E%E0%F8%CE%EC%CC%CEnv%8D%26%0D%82%8FH%F1%85%9Ah%09(6E%D4%C3%8A%16%2C%F4%10%A1%3E%10oB%0F%3E%F1%A2%07O%9El%A2'AO%96%A65%E0M%C5G%88%E2Ac%03)%A1Db%7D%C4g%C4G%05%15%C2fwfv%C7%DF%CC%24%81*3kD%D2%C1%7C%3F%CB%FE%D9%04%B2%03%FF%D37%F3%F8%FF%D9%A7%0D%00%00%60b%FC%5B%CC%14%00%00%00%90%7D%00%00%00%F8Bhc%FD%83%9Es'_%DC%EB%7D%D9%7F%93%B9%03%00%00%18OSg%D7M%9DS%DF%B0~%9B%A2~%CA%99%BB%8F%CD%BE%CE%3F%8E%DC%BBqQ%3E%CCX%B0t%D5%D6%FD3%17-g%EA%01%00%00%C6%D3%D3%7F%BA%3BO%B5%FC%B6%F3%7B%F9%3C%F7%DB%B5%8D%9Bv%BF%F7%C0Z%B8%F2%8Ft%5Com%EE%EFjOf%A6%FC%B0%EF%18%B5%07%00%00%F0%BF%1B%E8%EB%3A%7B%F8%E7%FC%E0%9B%D9%CB%B2%8D%5B%F6%AA%5E%FC%95M%C02%D9w%FE%97%1D%AF%1E%DD%CEn%3F%B48%FB%13S%0C%00%00%10%1D%BD%1Dm%1D%C7%0FT%D5%CE%5B%B3%B3%D9%5B%97%DE%CD%BF%90%F8%0B%BB0%7C%A1e%974_%D3%C1V%9A%0F%00%00%20j%A4%D0%A4%D3%5E%3F%B9%DB~ton(oY%96%BB%DCh%F0%82%A3%81%D9%D7s%EE%E4%BF%0Fn%7D%B7qOm%7D%23%D3%0A%00%00%10A%D2iRko%06%EE%F6%9C%FDU%CA%CF4%AD%90%A5%E6%03%B3%AF%FF%CFv%19%EBV71%A1%00%00%00%91%E5%D7%DA%D3%BF%AF%FA%BB%AB%99V%E0%26C%81O%F2%E6%07%DF%CA%98%AA%ACf6%01%00%00%22%CB%AF5%7Bh0%97%1B%D2%E2qM%DE%EE%96%94%EA%87%F7%F8%B1%5C3%00%00%C0%84%40%F6%01%00%00L%EC%EC%AB%CBn%90%B1%FB%CC%09%E6%08%00%00%20%B2%FCZ%9B%BCpe%3Eo%9A%A6eYv%B1Trb%CE%18%B2%AFa%FD%B6%9A%AF%17v%9Ej%19%E8%EBbB%01%00%00%22H%3AMjM%AF%9EY%D3%B0%D6%BD%99O%89%B9C%C0%CA%7Da%17y%D7%ED%3E%F2%D5%AC%F9%A7%0Fn%EA%EDhcZ%01%00%00%22E%0AM%3AM%9B2%7DZv%BB%AE%EB%86%91H%E8%BA%A6k%AA%A2z%F9%F7%BE%B0%5D%3A%1C%C7)%95J%D7%5B%9B%1Fv_fs6%00%00%80%88%18%DD%9C-Y%BB%A4fyS%3A%9D%9A%94IWVf%D2%15%A9d%D2HH%F9%B9%0F%F3*c%C8%BE%D1%F23-%BB%AB%ED%E8%E3%BF%AE%C8o%A4%FCVl%DE7m~%033%0E%00%000%9E%9E%DD%E9%B9%F6%FBa%FF%06%3C%A3%F6%9B%AA%A5%3FJ%E3I%EAe2%15%99t%BA%A2%22%19%D2%7C%E5%B3o%B8%FC%1C%C7%B6l%D3%B2r%B9%A1%BEK%AD%AF%1F%DF%1E%7C~%9F%A9%07%00%00%18OZ%D5%8CD%F5%ACI%F5Y%5D%D7%13%09%3D%954R%A9%A4d%9F%8C%A9%941r%85W%09%DA%96%B7%7C%F6%F9%E5%E782%96%2C%DB%B6%2C%BBP0%0B%05%2B_%10%DE%03%23%B6(z%A7%05%1Dgd'%B8%E0%ED%E0%00%00%00%F0Q%FC~%F3BN%F1N%E1%A9%9A%16%D75M%9A%CF0%12IC%B8%1F%BC%DE%D3%FC%25%9A%83%9A%2F%16%B2K%C7%7F%0F%E9~%83%E3%A8%DE%9D%82%BA%1C%C3.%16%8Bv%D1%0F%3EOI%5E1'6%D2%7DD%1F%00%00%C0%E7(%BF%E1%EAs%1F%D2%88%AB%F1%B8%F7%F6%E3%2F%EE%BE%E4g%D5%DF%91%23%24%F8%C6%90%7D%A3%F1'c%5CQ%E4%CB%E5%40N%22%E6%5D%FEu%86O%F2%C5F%DE%00%00%00%F8%BC%F17%1C~%A3%A7%FD%94%B2%E7%F6%3E%F4%0EV%83%5E%AE%F2d%17U%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgMenuUtils"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%8D%00%00%009%08%06%00%00%01%7C%02%98P%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%053IDATx%DAbhp%600%FE%FF%FF%3F%03%A5%98%85%81%81%E1%CC%A77%F7%18%60%80OD%89%91%81H%00%D4%F7%1F%C6fb%20%13%00%0DaA%E63%E1%B3%05%C8%3E%09%E2%03%F1z(%7D%0E*%0E%A2%7F%23%EBc!%E4d(%08%80%D2%86X%E4(%F3%1A%CD%0C%02y%8D%B3%3FT%F9%3B%A5%06%01%04%10%035%D2%100-%B2%B0%20%07%1E%B9i%08%23%8C%D0%D3%06%25%81%FD%1Bh%D8ld%5B%81%F8%1D%94%FE%8F'y%60MG)%40%85)H%7CA%7C%06%0C%E2t%04LC%14%1B%B2%FB.%83*%40%001%02%D3%C0%FF%C2%D5w1%24II%0Ad%96%1E%FD%40%AA%00Y%0C%E4)%16%7C%E9%8DV%8E%C2%17%F9%2CDhd%05%3A%EC%0F%95%1C%C2%82%5E%1C%92%E4%20%A4%3C%C3%40%2F%C0%C40%C8%C0%A8%83%08%01%80%00b%04%15%FF%83%05%B0%E0%C8~T%CBU%A4d%7B%5CQ%F5%9B%DE%0E%C1%9Bn(%A9_Ii%D3%11%9B%88i%15%3A%BF%C9%CAQ%40_%FC%A2W%F5%40L%89%CC%0A5%80%17%98%A0%BF%60q(%2B%10%BF%07%E2%25%40%1C%83%DC(%01%B1%81z%3E%40%D5%0A%40%D5%E1%CF%DA%1F_%DF%1D4y%7BP%15%7C%A3%8E%19u%CC%90v%0CUZ%FD%D4%02%00%01%84%DCs%B8%0A-%B8%EE%40%E5T%A0%85%996%BDjrz%01%60!%EC%0D%A4%B6%40%B9y%40%BC%1E%88_%00%B1%04%10%07%02%F1%24%F4%5E%0C(%10%CE%13%D1V%1F%92%81%04m0%DC%07b%194%A9IPLV%07%06%5BC%80q%08%26%98%DFt)p%80%B1px%88%A5%9A%93d%15%80d%DAgC%ED~%3A%0D%B3%12%D9MiJ%3B%04t)%87%90%3B%18%C4%D8Ci%A0P%2Bp%B0%0D%AC%BC%04%E2g%40O%18%A19%184%A0-%05%C4%E2%14%06%14%FD%DA%1540%13%E4yqB%1D%A7%A1%00%98%18F%C1h%E0%8C%06%CEh%E0%8C%06%CEh%E0%0Cv%00%10%40%A0%5E9K%FD%FE%FF%7FF%83%02%B3%8D%03k%BCa%ED%B6C%D5i%01%1Bt%D7%87%C9P%05r%CB%19%EB%10M%7F%A8%B26%0B1%5Dv%20%B8%064%D0%0C%188%A7%87Q%A0%80%00%CE%E1%19R%CA%99S%40%83%DD%87p%A0%B0%91%D2%C7%22%B5%00%DE%01%B4%80g%88%06%CAOZ%D7L%E1C0%C1%C4%D2%A3%CA%9E3%04%03f%0E%3D%02%86f%93%BF4%2Cp%E9%D6%C8%7B2%84R%CB%2Bz%06%0Ch%2CFo%08%A4%16c%06%D4%F9o%BAt%0B.%02-%96%18%C4%81%02%9AZ93P%FD%A5%E7%40%07X%D3%A3%9C%00bn%12%D4%83%DA%5B%8F)%ED%12P%0A%8E%40%BB%14%FA%C0%96%F1%25%22%1C%0Dj~%A3%CF%E1%82%96t%AC%846%C0b%A0b%82X%F4%82(%7B%20%3E%86%3Ep%0E-d%AD%80%F8%20%B5%FAJ%D4%02%17%A1%0E%BF%0Bt%B4%0A%91%01%C2%80%14%08%19D%DAs%10)%90h%DA%89%A46P%1E%1D%24%1F%C6%604%60F%03f4%60F%03f4%60F%03f4%60F%03f4%60F%03f4%60F%03f%14%60%E9%5D%03%BB%C13%FAC%953F%83%02%01%BE%FDf%D8%04%10%A0%BD%ABgi%20%08%A2%5BZ%18T%10%1B%FF%40%1AQ1%A0%85%82(%E9%FC%1FB*%FD'%A2%60%B0%B4Nc%99(%D8D%B0%09%04%B1%89E%0A%15%AD%C4F%11A%10%DF%DC%CD%92%23%8D%C9%E5%3E%F6%96%F7%E0%B1!%24%D9%BB%99w%FB1%3B%BB%09R%ED%F1%BA%7B%D8%E8%CB%86Y%094%7D%8E%91%3D)%8Bo%12%FB%3D%02k%60%C7%97t%7C%DF%A0%FE%3A%01%D7M%B89zl_%E3%01%0A%7CmcU%AB%26%12%15%8C%19%20%BB%D5%EF.%A1%E8Q%3CN%89e%17lF%DE%9E%C8%D7i%048%EF%F5bvP%B4)%9E%5C%C5%D20%83cS%92%EB%B7S%BC%EEk%BD%F8%3D%14-%8A'3%A1%94%C0%F7%A2%8F%82e%9B%5E%99.%CD%04%E5%B4%05%93%E5%D4%A9%5E%A4%14%9B%02%B72u%9F%E6%DB%9B%60%85%AEM%15%15%B5%B37%A2%09fWx%1AV%E8%DBTZ%995%3B%7B%F5M4%82.n%B0%CA%AE*%B9.I%B3%CA%3AY%D6%9B%87%F3.%F5%86%171%A3z%A5%EBc%8F_%24g%F49%8F%FA%F3%7C%E2_4%B0%C4%60%E0xbY%CE%BAeqI4%166%18x%83B%CEa%ED%A7!%20%FC%FE9%8A%07%F0Q%EA%00%9F%C07%F0%D7~%E6%BFz%87%BA%D5)p%DE%84%BB%C56%C0%ED%A1%81%A8%E4%F0V%C1%BBI%EE'%22%94%2B%133%0D%DEG%D1DgX%3D5%945%BA8%BA%09%A3%B7b%18%5B%CE%A0%99%01%17F5v%C2%F9%C5s%B6E%88%FC%AE%EC%D3%3C%03%DB*X9%FB%EF%5B%058%AB%22%DC%02%F7%CD%E0x-%E7%E0%F2%80T%8C.%0Bk%07jtY%5C%2B%8D%E0%F8%0F%13.%A4%BA%08%11%C2q%D1%BB%C9%22%CDb%A6%7DH%DA%F7%01L%A6!(%1A%82%A2!(%1A%82%A2!(%1A%82%A0h%08%8A%86%A0h%08%8A%86%A0h%08%82%A2!%92%82%2CX%9E%825%97%FE%96%8Bp%17_%3F%E6%E2%0F%D8N%8A%00%B5%EF%F3%E1%00%00%00%00IEND%AEB%60%82";
		
	twDatosGlobales["imgLogout"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0A%08%06%00%00%01%1C%1C4o%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%8EIDATx%DAb%3E%B1u9%83%84%8C%DA%13%16qei%06%85%C7%2F%A2%01%02%88y%EF%FC)%BC%12jZ%97%99%24%B5%14%F9%18%19%19E%01%02%88a%AD%86%F6%89%8F%C1%E6%FFkJ%CB%FE%3F%7D%FA%F4%3F%40%00%003%00%CC%FF%01%E0%D6%BC%00%DF%E1%F1%3D%BB%C4%CC%9E%25!%1D%B9%04%1F%8C%8F%FF%12%CA%DE%00%F8%87%8C%00%CA%CE%CC%F0%01%E0%D4%BB%00%F6%FA%FF%00%CB%D3%E9%FF%24%1D%0A%3C%02%00B%00%BD%FF%01%BF%9F%951%F3%00%FA%08%0D%8D%A3%C6%DEbI%9D%E3%F3%0Cc%1A%1B%14%00978%00%B2%B1%B2%CC%02%0F%1F%16%01%0A%13%13%19%E7%E6%D7%00%E8%EC%02A%13%11%03%00%1D%1C%1E%00%2C%2C%2C%00%F6%F7%F6%01%02%00%91%00n%FF%01%D4%C5%B0%00%E8%E3%E7%0E!'%26%F2%A8%A9%C2%D1%F4%05%FA%0B%FC%F7%FA%FE%0E%0E%0E%05%04%D9%CC%D8D%08%DE%DCO%E1%A6%B5%3E%F9%3C%3A%20%F1%EC%F3%0EZOQ%00%F9%FA%FA%00%04Q%D2%C6%BB%FD%F6%FE%00%02%FD%DC%00%DE%9E%E8%00%01MD%00%1A%1D%1C%00%E8%E6%E7%00%02%BAJN%5B%B0%16%14%A2%A2%F3%10%F0%E5aR%FD%EE%FA%F8%00%16%14%15%00%0D%0D%0D%00%01%DB%D3%BC%00%F5%EC%EF%16%10%19%15%EA%EB%ED%F5%16%A3%A7%B5%B23597%ED%E9%E0%A2%024%407-%09%C3%01%1C%C7%7F%FF6%FD%DB6%ABe%AC%A0%07%D0A%20%85%07A(%F2%60%87z%09%5D%82%A0%A8%DE%40%AF%A0w%10t%EC%18%11%9E%3CU%10%221B%89%0A%0A%B4%02%9DFy%A8p9%B6%7C%DA%DCl%E7%EF%E5%CB%87%E4%3D%3A%ABgc%26%3A%8Br%AE%B0%ADf%0B%9B%C9%BD%8D%DDo.8%9D%BF)%5E%0C%F71j%BAm%B4%3A%1D%04%05%01%B2%2C%83%E3x%94%2B%95'%92%9E%8B%E5cK%91e%D8%3DP%BD%0D)%24%C01%0C%5C%D6%CB%F8%88%AD%C2Z%88C%EB%FE%60m%25%059%22%83a%18x%F6P%14%E5%81%FD%9B%0C%B8%F5j%15%3E%00~%CB%C6%B8%F5%05%F7%D7%80%AE%13%E8S~L%8C%B9%D0%2B%0E%08%86%20%8A%22(%A5%5E%D3%E18%0E%D8%F5%F4Q%B2%EB%B8%108%8A%C7%CC%F5%CEq%F6%EE%20u%B8%B5%3FO%98%FE%E7%D5%EDy%ED%F5%3D%DC%EAt%07%3C%CF%11I%92%D0hh(%96%5E%60%9A%26H%EDMA%DF%B6%E0%23%03%18%9A%01%96%B2%E0F%04x%13x.%A9%C8)%F7%7C%B3i%9C%86Bbb1%1A%3EI%C4%A3g%D4O%D5%40%80%C5%3F%BE%E8%12%87k%19%2C%F0%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgForo"] = "";//"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%13%08%06%00%00%01%05W%06Z%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%05%C6IDATx%DA%00'%00%D8%FF%01%D1%E1%DC%00%02%DB%B3%EB%1C.%3D%15%02%CB%D4%F2%D9%13%F5%E0%14%B6%CB%E4%09%04K6%01'w%CA%0A%FF%E9%AB%10%F0%02%88ajW%A7%E1%9B%C7%A7%18%18%16%9Dy%FF%DF%A7%CD%FD%26%B3%8C%EEo%2B)%E5%99f%00%01%00*%00%D5%FF%00%23%0E%3E%FA%E7u%0B%FF%FB%A9%3E%FF%B8%CE%DC%2F%E1%F3%F0%00%00%D6%D8%DA%00%C3%B4%A1%0F%FF%9E%3E%FF%C4n%1D%FF%1F%0A%08%FF%02%88%C1%3F%C2%2B%E6%D7%CB%F3%0C%FB%D7%07%BD%7D%FF%EA%0C%C3%FF%FF%FF%19%18.5)%FD_%D2%DE%F8%FF%F7%0A%C7%FF%CF%80%02%20A%A6i%BF%AF1p%C8%7D%60%C8%15%D1dhM%A98%C0%00%04Ln%B6%7B%19U%BE%9Eb%08%FF%24%CA%10%2B%B1%CE%1E%24%C8%F2%93%E7%07C%9B%8C%12%C3%F5%E3%FC%0C%96%2C'%19%CC%81%82%00%01%C4%18%93%97%1B*%F4%FA%C1*%F1%2F%2F%19%A2%26%B6%1D%FExf%B5%AD%EA%E7%FB%0C%87%95%233%24%24%14g2002%E8%AB%DB10%D9%18%EA%DC%BD%B6%EB%3A%C3%B3%FBL%0C%D3%AEl%B4%FD%F9K%99!%FE%FB%0B%06%1D%2B%B3%99%25%09%7D%0C%0C%FF%B9A%B600%DA%04Fy%0A%8B%06%2C%B7R%96%FDQ%A8%D6%2C%FE%9C%ED%23%C3%A3O%AE%0C%FF%B6oe%D8%FF%97%83a%EB%DD%AF%7FO%1D%3F%CB%C2rpy%E3%F6%9F%FF%FF%08%5C%FB%C4%CC%92%BE%99%F9w%B5Y%3C%C3%B6%DB%BC%0C%EF%EE%DFd%B8%FF%EE%09CB%E9%24%88%C3%CF%3C%FE%006%FA%E5%87W%7FB%9D2%AD%F7%5E%BE%FF%D2O%40%5Dq%95e%F8jIf%3E%86%1F%2C%E2%5E%40%E9%A3%00%01%00r%01%8D%FE%00)1%24%04XYd%85%EE%E7%D9%00%FA%E0%C2*%CC%B8%5B%EF%DB%CA%A65%F0%EC%CD%00%EF%EA%CC%00%EF%EA%CC%00%01LQG%FF5%FD%F4%00%EB%01%FA%FDod%26%FF%0F%F0%0B%04%CA%E8%D3%00%1FQ%8D%01%FD%FC%FA%00%01%02%03%00%02%09%DF%C6%00g%22%E1%006%12%CE%03%0E%F9%FB%04%15%01%C7%00%D8%E8'%FD%12%239%00%07%1E8%00%16%0D%17%00%02%D7%EE%3E%EA%8F%C4%EC%00%B0%E6m%00%88%13%09%00%C7%F4F%00%FAE%16%9F%99%8A%8E%00w%5E%5D%00%02%04%03%00%044M%9E%16%0BH%EE%00%2C%D0%EC%00W%07%CA%00%C8%0D%C3%00%D2%F8%08d%06%E3%08%17%06%07%07%BC%DD%E5%EA%92%01LZ%98%E8%F9%01%1F%07m3%91%10%3B)%08%00%09%F7%0F%00%86%BB%E4%000%EC%F0%00%A6%EE%FB%00%FA%0B%1FF%02%8E%818%18ZM%07%11%E6%EF%F4%E3%12%E5%09%00%EC%FA%EC%00%06%F2%ED%00%12%20%D6%00%23%F9%EF%00%FD%F8%FCQ%01%FF%F9%DC%00%CF%EE%FF%00%BD%D1%BE%8F%1E%F1%DEp%EB%20%02%00%D0%8F%19%00%16%D7%A6%00%BC%05'%F6%8A%9C%83%0B%01%D8%E2%C7%00%DB%EC%F0%00%8E%BA%91%FF!3!%00%F0%F5%02%00%E9%C8x%00D%3B%06%00%E1%C4%16%00%01%FF%A66%01%C9%DB%CB%00%03%02%03%00%DD%ED%DD%1D%1B%0D%06%18%C4%D0%CF%E2%1A%E9T%D0%BF%E5%D7%08%F4%F9%1A%00%7Cw4%19%024Qn!M%06P%1C%FF%7Fs%B7%DC%DC%C5%CBt%CE5%5D%23sC%CD%94R%F063%02%A3%C2.%F6%94%26%8A%14%D2%05%AA%07%0B%7C)z%09%0C%2C-0%08%CA%E8%A1%87%84%95%A9%94A%A1%CBU%EADm%FBF5un%CE5%E7.%CE%CD%EFs%F6%B1%A7%CE%C3y%FC%9D%CB%FF%FC%0Faq%2F%09%DA%5B%9Az%8FT%D76%A62R%BC%E9%7F%1E%ADo%3Cy%AD%E9%D2%A9'%D6w%FD%7D%01o%A4U%9B%C5%87%E7%B7%11_%ED%84%F1%C0%B9%8E%E3%E24%B17%B6%1D%C3%FF%A1%CC%3E%08B%AD%D6%7F%D7eY%8B%9BK%B3P%25WA%24%8Ab%60%DE%02Zy%1Az-%096%8F%03I0%8C%04%8A%C2k%A7%10%BE%BD%0D%D7%8B%F6%97tQ4%1D%DFu%02%03%95%D2Qh%14Z%B0rU%82%1C%9B%C9%0D%B7u%09%93%C6A%0C%0FM%C08%BB%8D%24%DD%3E%7Csl%83%1A%F3%60%83%F4%A0%7F%9E%84c%7D%F7%F0%B1%8C%EA%1E%25%9D%8C%B5%19'%BAn%DC%01w%CD%07%11%8F%1F%EF.a%FC%97%99%DC%95%D2%A2%9D%F0%1EJw%17%A7%C3%A3%B9%08_%EC%16%FC%98%C7%86V%8C%FC%B2%A30H%B8%18%2BT%60%8E%9EUD3%FF%DA%9F%3D%FAd%FE%D8o%00GH%A0%A6%A6%1C%C9%22!%C1%E7%8B%99%03l%7B%D0M%F9N%5CN%DD%AD%C0%16%7B%19%3AU%04R%FFCh%A5%06%A8e%D5%20B%3E%D8%9C%11L%CB%0B%60%F1%AE%82%7C9%84%3A%7D%3B%12ei0%FD%9C%C2%DAV%F4%854Ir%E1%D5%E3%9E%18%FBfs%DD%15%D7%AA%FD%9E%3B0%26dQ%9A%9D%5C%11%A4%1B%9EqS%AD%A4%9C%A0%E9%10%20%0B!G%24%87%C0%C5%14%B1Y%F1%F4L%1E(%D1%10%5CD%0A%1C%F6i%2C8Y%E7yj%5D%84%99%B2%8D%5DY%C2b%0C%9C%ED%8EQ%AA%15%9B%2B%13%2CF%FE%E9%AD%CE%F6%0E%E3%ED%DEz%85%06%12%22%08%83x%13%F2%A2%AB%B0%8F%2C%E1%EE%D48%0A3%84%20%A3%24%3EL%FA%E1%E4%E5%85**%1A%FA%E2%AEe%DE%10%10%C3%8Ee%DD%0B%1Fw%09%A4%9D%3C%3B%10%1C%E8U%B6%EA1%E8%92%A1%B6%F2%3E%82%E6%F7%18%F9%1C%067%AF%1B%FA%06%09B%FC%158L%11%D4%96%AA%A8%CD%E8LgA%BEx2%0E%1B%B5%2C%83%20%18%24%93%B8%9CD%04Wh%F5%BA%8D%0E%06%FC%0BII%F8%83%1F_f%A9d%01%3F%40%CF%EDI%09%FB%17%F1%D6e%01O%9C%08%1E%9D%83%80%23%CCYt%2CvU%1D.33%AC%D1%7F%EEEo%CB%964%EC%F5%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgChat"] = "";//"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%13%08%06%00%00%01%05W%06Z%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%05%93IDATx%DA%00'%00%D8%FF%00%E8%F3%F3%00%C0%8B%CC%01%F7%F6%FE%00%00%CA%CC%CF%00%EC%EE%ED%FF%AF%B1%B6%FF%0220-%0A%F5%F3%F4%CF%09%07%02%03%02%88q%D9%9FV%06%FD'%B7%19%19~%FE%FA%F3%FF%F1%A3%07%FF%99%D9%D9X%1B%C5%C4%C5%1A%01%02%00*%00%D5%FF%01%FF%FF%FF%00%BC%BC%BDZ())%A5%E5%E4%E4%FB%F5%F5%F4%06%01%CD%D1%D9%00%03%FF%F7%FF%12%17%1A%00%F5%F1%EE%00%10%10%11%7F%02%00i%00%96%FF%00t%FC%FA%00QY%A3%00%94P%B5%00%F5%F31%00%F9%F9%F9%06%00%8C%84_%00%DF%E0%E0%FF%DA%DB%DD%F9%CA%C8%CAj%FF%FF%FF%00%01%F1%F2%F3%FF%01%02%00%00%F4%F4%F4%00%F4%F6%FB%00%23!%0A%03%02%F8%F6%F5%B0%EE%F0%F4%00%F4%F7%FB%00%BC%B9%B6%00%02%00%03%FE%02%CF%D0%D0Q%EC%E7%E4%01%17%12%0C%1F%09%08%07%01%00%00%10%02%02%88%E1%DE%F7%EF%AC%16K70%84%A5F1%AF%DEx%84%E1%13%D0%CCO_%BFq_%BB%D9%C9%B0%E4%FF%1F%86%09S%A70%14%14%1400%CE%9A%BF%96%91%83%93'%266%DCm%D1%8F_%BF%18%FE%FC%F9%0Dt%D5%2F%86%7F%BF%7F1%3C%7F%F3%81AH%80%FF%EA%ED%CBGt%98%CE%5Cy%FD%DF%CATu%D1%E7%2F%DF%18%BE%7F%FF%C6%F0%19%18l%40%8F%02%E9O%0C%EC%EC%1C%0C%C7%8E%9F%D4%E6b%FD%CA%C0%A4%20%FC%8Ea%E6%8C%E9%8C%D7%AF%5D)%BBq%EB%DE%F7%97%AF%DF3%9C%3C%7D%81%E1%F5%DB%F7%FFx9Y%9B~~%FB%C4%18%9F%D5%CE%002!%1Ed%0A%D0%BF%8C%D2%D2%D2%0C%9B7of%D8%B6m%1B%C3%A9S%A7%18ttt%18%3E%7C%F8%00%B6%05%20%00%8D%E4%0E%D20%18%00%E1KL%15%D4X%05%1F%15%AC%94%A6P%D4R%BAtpr%10%177)A%14%15'w'%05A%3B%B9%89%E0%E0%20h%11%07A%A9%8EbP%AC%3A%89NB%06A%07%5B%04%D3VCS%FE4%0F%93%DFDp8n8%B8%E1%EEc%5E%08A%9Am%C5%B9z%88%E3%A97%26%BD8D%99%8FIf~m%02%F4g%97%BA%CC%10%B8%DBb%11%A3%07%7B%B8lj%C3%D2%C9%0AM%0F%B6%E3%E8%AC%10x%AB%CEZ%FB%C1ap%D9u%B0%C6%C5%3B%E6Fb%CD3%D3%99%A7%10%5B%A3%A5%D2%07M%C6%BA%89%FD5.o%C2%09%26S)%60yu%0B%DF%EA%B7%E9%B8%94%EAF%83%D6%EA%1A%FD%2C%97%E9%A7%A2%D0%8B%AB%1BZ%ABV%FB9a%90_%E8%0Cv5%EB%0D%03%F6%8F%09%DB%B6%3DY%B0L%1B%BD%7D!h%8D%CA%0E%9BL%0C%0Fx-%FE%CD%7F%E1%BF%FBR%14%05%261%18V7%9D%ED%BB%DB%02%1C%8F%0Db8hX.%1C%04%E0%91%04%D7%24%10%E2)%91%BB%2FH%06!%84%15%84%E8kGWO%F4%FA%FA%CA%5B%BD%05%89x%EC9*%08c%E1p%98%FACB%96elld%A1iZ%E6%E9%F1%E1TUU%E4r9%88%A2%E8s%CAs%3EP%91H%04%95J%19%3C%CF%E7%BD%DF%F2%1E%D2%90%24%09~%8B%AE%EB%F5_%01%9A(%97%D7%26%A2(%8C%9F%3B3%A4yT%9B%87%8DM%AA%26%A6%8D%12%A1%85%22n%D4EQ%A4*%5D%B4%3B%DDT%B4f%E7%1F%90%85%8A%90%85Y%B80B*%88%82%8F%AC%12%5BA%03-%24-%D4j%1Bj%B3iDhI%B0%8D%9A6%D1i%3B%26%CDd%5E%19%CF%C4%07%5E8%DC%C5%E1%9E%FB%F1%9D%DF9%A4P%DB%85%12%BB%0Dw%17%97%A1B%F1pg%A0%872S%5Eu%3A%3E%AD.%CE%C7%89%FF%F8%88%EA%D4%3B%20%F3%F3%13%AC%95h8%7B%F5%0D%18%1C%3E%92%85%D3%AAD%1D%85S%85Mx51%0ENl%2B%D9%10%05zf.%AB%7Ck%F9%08%EF%9E%CE%92zaS%1D8%3F%B0%EF%DC%85%E1a%1D%A34DQ%A0dh%98%F44%FD%D9%60%B4%D8%19Z%A8%AD%2C-%BC.%1D8S%E9sS0%11%89%10%A3%C9%04%D7%FD~%95%AC%E6%BEB08%09%9DN%19._%EA%0BZ%AD%9D7%DB%DB%DBA%87f(%8A%8A%A1%40%A3%D1%F8w%F3%B5*%94%CB%E5%26H6%9Bm%C9n%B7%DF%26%84%9A1%9B%DB%04%B20%FF%1E%E6%D3%1F%8E%0D%0D%0D%BD%F5%1Cv%D9%24%19W%00%0E%90%24%09%CD%02%FF%17%93e%19%B0G%20)%00*%AD%D3%26%16%40V%B7%BD%1E%BD%3F%97%BF7N%25%97%154%B4%AD%CFj5%DBdT%A2%11QG%3AD%11%C9%C0%10%C5%DF%00h%B7%96%E3%EBZN%004%1C%F6%B4%B6B%B1X%B0%C8%8A%E5%DA%89%93O%08e%FA%F2%08%BA%DCGvWVs%98(6%5B%2B%A1%82%26E%F8%E8o!%E1OQES%87%D29%9C%99t%3A%0D%07%5D%5Duk%CB%8F%B8%BE2%A7%92%E8%8B%E7drjJ%1D%19%B9%B2%D7%E3%F1%047%8A%C5%1B%5B%3B%3B%94%CD%EE%80%9E%DE%5E%60%D9-%C8%E7%F3M%A0X%96%05%8E-%034%14%E8%EA%EE%06%AF%D7%FB%B8%A3c%FF%AD%FB%E1%07%25%8E%AB%AAD%5BYx%94p8%0C%C9dR%19%1D%1D%85%C1%C1A7%EE%85%9ER%B9%FC%10Uu%B6%9A%8C%CF%F4%06%C3w%8Af%8C%22_%7D%E9r%B9%17S%A9%D4n6%9B%05%13v%D2%E7%F3%19%12%89%84H%10%C6C%A8%BB%C00%8C%F6%3B%13%8DFI%2C%16%93%2CV%0B%19%8B%8C%B5p%1CgA%AF.%F2%3C%3F%8B%1E%E5%D6%D6%D7!%14%0AA%7F%7F%3Fd2%19mM%90%40%20%A0A%0B%BF%00%F7%9B%FA%AB%BA%16%BC%F9%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgAyuda"] = "";//"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%13%08%06%00%00%01%05W%06Z%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%05%B5IDATx%DAb%B8wy%17%C3%F7%C7%7F%DF%1D%DEw%98%81%E1%DD%FB%DF%9F%8Cc%CF%FF%FF%03%84%8C%EF%5E%3Dd%B8~%F7%DD%7F%5E%166A%80%00%00%1B%00%E4%FF%00%EA%DC%D6%00%EF%E7%F2%00%04F%93%F6%FF%0C%F1%E1%00%00%E0%E3%E0%B2%FF%FB%F1%FF%02%00*%00%D5%FF%00%DE%D4%BF%00%9C%C3%F1%FF%EE%F7%F0%FFc%88%EC%FF%CD%CA%D1%95%01%E9%E8%E4%18H%7C%D7%E7-%12%12%00%D8%F1%F0%00%BA%8D*%00%02%00i%00%96%FF%01%EA%DE%DC%00%EE%0F%FE%8B%0B%03%12c%0A%01%FC%12%F7%ED%FC%00%02%11%1D%12%E2%C3%C3%02t%0E%FA%01%11%F4%01%14%FF%00%00%FE%00%03%E8%06P%8E%A6%CE%F9%00tW%1A%00Dl%E0%00%0F%02%C3%09%02kW1%00%FE%06%05%00%24g%DC%00%14%0A%EA%00%1D%13%1D%B0%00%D0%D0%D0%00%F6%F1%FB%FF%E2%E3%F8%FFwvr%FF%D2%CC%CF%00%02%00%CD%002%FF%00%DE%D3%BA%00%E9%DD%DB%16%FF%FE%FC%FF%ED%FD%FF%FF%D2%F6%EF%FF%C5%F0%FC%FF%F9%FF%F6%FF%F1%F5%ED9%C3%BE%C3%00%E4%DE%E4%00%02%09%0C%17E%D4%F7%1C%E9C%7C%DE%00%FA%E8%F4%00Q%60%DD%00%E8%D6%E8%00%89%9D%DF%00Vz%E3%C6%3CA%3B%FF%C8%C5%DF%11%04%03%0F)%B2%AE%A3%C8%00%ED%F5%0C%00Iz%E2%00%BD%8C%15%00s%8B%DC%00%D6%00%08%00%02%EF%04%00%FA%00%F9%00%DE%F0%CA%87%02%FE%F8%E8%09%85o5%EEd9%07%00%F4%F6%EC%00%F1%02%11%00%E4%02%FA%00%1A%F6%EB%00%C7%A33%00zrw%00%3E16h%01%ED%E9%E1%00%01%03%05%00%F1%F4%F7%00%DE%D9%DD%ED%D2%DE%E4%01%FB%EC%F0%00%0B%1E%0F%DA%23%17%188-%23)%00%FD%FE%FE%00%02PH%EF%B0%0C%04p%18%C0%BF%BB%DE%5D%7Bm%A3%AD%A6%84j%83%10Ab%11%22%F1%ECF%E2%11%26%03C%CD%22%C2P%83%85%CD%D0%CD%2411%12%13%F1%88h%90h%88%A1%22HP%D5%87V_z%AD%DE%A9k%EF%9C%FF%FA-%DF%F7%CB%9F%08(%BE%14%ADG%A9%240%84%B5%3Df%16T%E0%D4%FC%86%C8qK%AC%5E%83%02%A7(B9%7D%99e%D3%D4%DC%5B%A0%B4%8C%E9%86%91M%05%96rU%DB%EDAY%96%FFc%90%8CF%DF%941Xg%DC%5B%09dS%05tkR%F0%1CSX%DB%0E%D8%8C%E5%95%DF%3F%82%A0%25%AB%EA%5Bo%17%DC%3CrB%1A%5Eo%14m%CE4%A6GX%EC_%17q%F5%24%E8%DE%FC%89%7B*ST%E9%3E%3E%93%F8%08%C4%B1%A7.%C7%E2(%89%D3%DB%2F%FCHy%EC%1E%DE%C1%D9g%AB%A3h%92%86%C8s%90h%1DZ%A5%00%A6%C6%06%D05%F7%0A%AD%BA%08%9A!%90%CBe%95N%F2%2Fg%24B%CA%02%1A%E1%A2%05%93%2BW%A0%D4%24%24%85ef%B2%03%17gG%12%19%8D%C4%96w%D6%87%C0%F2%3E%D4%E8x%AC%BA%FA%20%A6%A2%98%9F%AE%40%99%18%82%C5%CAN%10%E1%A0%1F%D9%BC%60%A8ml%C9%BC%DF%3FCyVt6T%C3%F7%F2%88%93%03%CF%F9%E0%A0%A3%9FH'B%0A%04%85dRX%F5%DE%5C%CE%C6%23yp%A5%18%86%1D%E3%3D%8CJ%7C0%1BL%F8%13%A0%83%AA%0Bi*%8E%A3%E7%DE%7Dx%EF%9D%DB%DD%9Cn6%B7%FC%20jX%99%A0%13*%0C%D4%97%22%220%92%22%88B_%EA%25%7C%F1!(%B0%8F%87(BB%0A%22%FB%80%E8E%E8%A1%E8EF%10Q%A2%91%95%169Q%A7s~%CC%B9%DD%ED%3Aw%3F%F6%BF%BB%DD%F5%7B%3E%1C~%E7%FC%CE%F9Q%A5%F8%D0%94%05%1C%17%80%2C%A7%ECv%7B%F5%20%1CeGle%EE%26%0Befa%D2%A0%98th%D0%C1)%24%AE%E5%8A_%13j%F6N%19G%CF%14%09%10%99%9EG%5Dm%1D(%8A2v%00e%C0%40YYz%B0%AA%BE%E9%C6%161c~%DD%8C%E5%B4%06%99%08%D0%D5%24%CC%8A%13%92%E4B%A2%60%F2%D7%D7X%7BN%EC%E7zx%86%12%D3%E9%CD%3E%1D%FAh%89%A8%C4CE%FF%84Q%B1%2Bp%97%E2k%AF%3F%F9%40%E1%E7%9C%86%0Av%16%B7.%BAP%CE%EE%C6%9B1%11%8C5%85%93%1Dnd%F3%0Cn%3F%8Ebq%D3%8A%AE%96%3C%FA%CF%1D%84%B8%99%C1%F4%D4T%2F%EF%E0%9F%9B%1D%DE%B6%18%EB%B2%07%EE%BDZFx%C6%04%85%8Acc%5B%C2%A5%81%2C%B6%F4(%04%D5%0F%BE%90%80%CFKp%EC%C0%3E8%0C%1D%E9%5C%16o%C3%2C%E8%E2%02%06.4%C0%C6%05F%22%B1%EF%8B%C6%F9l%E5%A2%AC%60.%12E~%87%20%AF%B2%C8%E9vDH%0D%B6%09%8D%CB%A15%7Cyq%146%13%8F%AEk%9F%F0%3Eb(2%01%AA%5E%C4%7C%7C%C5%A8O%C1%F0%88FF%CE%3D%A3%8B%8A8%EEf%2C%C5%D6%C6j%A8%E2%AA%81%DCA%D10%9C%85%00%AF%E1%7F%B09%84%D7%13%AB%E8%7D%B8%8E%94%EC%01%CF%C4%40%EB%12%0A%92%88%96C%7B%60%05Atn%16%92%98%18%A2%05!u%3A%B1%91yw%F5%7C%10%FD%DD%0Ep%1B%AB%20%867%0A*%E1b%92h%A9%14%D0ZY%01'%A7%1A%85%CBC%CD%D9a%CAdq%F3%8A%07%7D%C7%FD%08%8F%7D%C6%D4%EF%F1%BF%A7%3A%CF%BE%A4%84%E4%B2Qk%02I%26%ED%5E%FF%EE%A7%BA%85%09N%FEX%C1%E8%C7Y%2C%2C-%A2%DA%E5D%86x%91%95(%84%82%0C%CEt%FA%10j%0C%20%93%5E%C7%F0%83a%B8x%CFP%DB%E1%E6~Y%96%F1%FF%05%10%0DP%0A%04%0CcE%2C%BE%D6-%8A%D2%88%9B%DF%EBt%FA%AA%60v%1Ba%D2%0AP3%1AbKI%7C%9B%98%C4%DA%E2%2F%A1%B6%C1w%BF%A3%BD%E3%91%C7%E9%DC!%25%02c%FE%01)n%92%98DF%FD%80%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgOpciones"] = "";//"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%13%08%06%00%00%01%05W%06Z%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%04%3DIDATx%DA%00'%00%D8%FF%01%C8%C8%C8%00%0C%0C%0C%00%EA%EA%EA%00%02%00%00%00%24%07%07%07%FF%10%10%10%17%02%08%08%08%DC%DF%DF%DF%F1%F8%F8%F8%E9%02%88%F1%FA%F5%EB%0C%EF%DF%BFg%60RRR%FA%0F%94a%60%DA%B8q%E3%1E%16%16%16a%80%00b%04%99%C0%CF%CF%CF%00%02o%DE%BCi~%FD%FAu%0D%C8%A4p%20%E3%93%A0%A0%A0%C9%F7%EF%DF%D3%25%25%25%19%01%02%88%F1%E2%C5%8B%0C%DF%BE%7Dc%E0%E6%E6f%00%0A%DA%02%15%1C%06%A9d%F8%F7%EF%1F%CB%D3%A7O%DDLLL%0E%BF%7D%FBV%9D%F1%C1%83%07%3B%FF%FF%FF%EF%F6%FC%F9s%90%8E%08%11%11%91c%20%07%B9%01%CD%13%E3%E4%E4%049y%25%D0%08f%16%A0%99%FB%80%9CW%BF%7F%FF%5E%2C%24%24%C4%F0%F5%EBW%06%80%00%1C%901%0A%C30%0CE%A5%18%0C%5D%B2%05%0F%F1%90BV%DF%A5W%E8%D6%A9%F4%06%3DD%CF%D13d%E9%D65%831d%2F%1D%8C%C1%99LH%FBe%0D%02%C1%D7%FF%8F_%91D%A5%B5%A6%94R%0D%CC9%93sn%9F%E7%99%C5%16%F6%5C%C31%5CJa%84%7F%99%D9%B5mk%A6iby%EC%BAnWJQ%23k%1C%C7%17%04%3B%22%CE%60%B9%C7%18%3F%88%7CXk%19%B72%C6%1C%1B%08%C8%7B%FF%86%23%85%10%9E%408%F5%7DO%B8%AF%82%B1m%1BA%F3k%84%0D%FD%DD%00%CF(%E2%B2%AE%EBaY%16%1E%86A%CA%11Q%AD%E6%2F%00%93%E4%AF%D20%14%C5%E1%9BKp%08%06%A9C%08%19%02%0E%8D%93%C1A%C8St%EC%7B%E8%EA%E4%24%1D%7D%0C%C1w%E8R(%06%0D%81H%96f%92d%09%88%25wK1%D4%EF%DCA%BC%10%02%97%CB9%DF%EF%8FSU%95u%8DP%AC%18%CF%F3%C40%85%E2%1BD%BC%F7%7D%FF'%C4%1E%AD%B5%B5%01%A6%7B%A6%BF%F1%F0H%BC%89%FB%FF%11%13NX%7B%80%E9%D9%F7%FD%3DB.Hq%ED%CA%5E%C6%9E%D1%83Y%92%24%1BX%AE%F9%96%F8%B6B%A1%E2%FE%CE%1D%C7q%96e%D9%B71F%11%9C%0A%C3%F0%AB(%8A%1D%06%3B%AC%BB%22%EEO%1D%04%C1)%AA%14%80M%1C%C7Y%D34*%8A%A29%7C1~~%90%88%D1%F8%F1%3A%0C%83%C0%3E%C2t%00%F8A%2C%A1l%0B%9Ag%95%3Ay%9E%2B%20%8F8.%FF%0A%86%B4%EB%BA%1D%F1%5C%C2j%FD%92z%B8eY%EE%DB%B65%D34%A5%B8%FF%02%C2V%D4J%1ArD%DD%0F%0E%9F%D3%23U%D7%F5%13%A0%B7%D2%14%C9%D7V%07%F5%BF%02tQ%F6%2C%0D%03a%1COJ%5B%9D%A45%8A%20B%8Cr%20%22%C1YW%C1%17%A8%E0%A2%93%83%08%05%D1%C5Q%1D%04'%97~%01%85%BA%FB%09%1C%C4%B5%8Bdpm%90%C6!%A2.B%87%A2h%F4%F7%0F%09h%0F%8E4%D7%DC%3D%FF%B7%E7%D2%F8H%E5%FCh%A5%5B%7F%A8%01%F4T%BF%E8%3FM%C6%1C%CF%11%08.%93%FE-%08%DF%A1%EB0P%0F%F96%FA%E7L%FF%90S%9Aj%BE%EC%F0%0E%CB%9Ba%18%D60%E6%82%F5U%C4%D9(%95JM%D6M%B1%FF%00!P%A20%E6%94g%19%C5N%F4%CE%F0%40%B1C%C0v%F9%DD%01%D5%10%0E%17%84%1C%3BnXo%A7N%23%CC%00%9E4%D0%60%85%8D%EFT%1DC%F2%09%0C%B6%98%7B%A8%DDE%ED%84%10%8E%D25M%F6%3C%83%E8%88%B5%2B%8A_%A2e%98%0A%0B%0D%1B%11%3F0%F5%93n%9DV%BB%E1%80R%FA%82%1B%83%D0%AB%D2YU%F9%8961%F7%C8%01%A9%F9%26%D1g%3A%80%E2%05h%FE%C0%C0-%B2%A9%EE%FB%FE9%1FW%A0aEQ%D4e%C3%3E%16%B7%A9%1A%80b%86L4x_2%C6%8C%83%E6%2B%08%82%16q%5C%80%9A%E5y%5EB%D1%B4%C7%D3%FE%81%E6%3C%A7_C%C7p%C1H%E8G%AC%AF%F3%EC%E1%DA%3A%C8j%20%9E%85%E2%9B%E38k%F4%DA%3D%DF%0B%BD%25%00%99%D3%93E%C1%87%EA%03%B3%05%25%23%D7%E8%E4).%AC%5BEFC%99%CF%22S%E6%F0%D7%BC%9B%F3%F9%C7%FD%82E%95%04%A1%8F%A9n%A0h%F3%BEH%B7%F7t%08%D5%B7%E38%B6%09%AA%0D%C5%8A%EB%BAO%BAK%40%AE%AB%23G%95%DE%60%BF5MW%1D(%B2q%8B%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgPremium"] = "";//"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%13%08%06%00%00%01%05W%06Z%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%05mIDATx%DA%00'%00%D8%FF%01%F9%EB%C6%00%00%11%0F%00%06%03%0A%04%00%FF%FF%E1%00%F9%C7%0D%FFYR%3C%FF%01%FF%FF%DD%00%D5%DB%04%00%08%1D%FB%00%02%00%1B%00%E4%FF%01%F7%FC%DE%00%EA%E1%E6%00%00%E3%D58%FF%FD%FFs%FF%04%04%01%8D1%C6%CE%F8%03%02%88%11d%C2%9BO%1F%19~%DD%BC%FF%8FQ*%9D%EB%F0%9E%FC%1F%40%93%EE0%3E%B8%B2%87%F1%DF-%AB%FF%7FO%A8%FD%7F%F0%EC%12%03%40%00%00i%00%96%FF%01%FF%F4%D8%00%F8%0A%09%00%02%F8%F0%00%06%09%0F%00%00%00%FF%00%02%FF%00%00%00%EA%DD%DE%00%B0%A59%FF%EA%E6%E2%00%E8%DD%EB%00%02%AB%9D%A8%AB%1E%0F%AA%FFVBU%00%0A%E1%7B%FF%EE%F7%04%12%00%FE%FF%DE%01%F6%E1J%FF%F0%F3%B7%FF%B5%B9%ABm%DC%DE%D3%00%02%F5%DB%EC%FF%9D%AE8%AA%EC%DB%18%01%E7%CC%D6A%FE%15%06%00%02%08%EC%24VN!%86'%0Fo2%BCx%FA%9C%E1%D3%D3%5B%A7%CF%DF%DBl%92%18%BF%85QH%99%83%81%91%81%89%E1%CB%FB%8F%0C%2CLL%CC%0C%FBw%CE%3D%FF%FA%D5C%16%0E.%B9%3F%5E%F6%0F%0C%14%F5%DF0%ACY%DBsSB%F4%DB%AF%DF%3F%E5%BE%D9y%8481%FC%FA%7B%83%ED%1B0t.%9D%DC%1DvpI%C2%FF%3F7%19%FE%FF%FB%5D%F7%7F%FFr%C7%FF%BD%95%15%DB%9E%7F%BC%C5x%FB%D6m%06%26V%26%96_%9C%0C%FF%80%81%B5%A5RD%EE%0ECq%8B%DB%B7-%AB4%5B5-%C4%18%D8%7F%1Dr%FB%F0%81%E7%FF%2F%166%06%60%F0%82%7CN%18%00%04%10%D83l%7Cb%0C%3FYY%19%FE321%BC%7Fp%90%F1%CB7%C9%FF%F2%CAr%0Cl%EC%40%A3%18%18~1%81%95%B2r0%9C%5C%BF%8C%E1%CA%CE%AD%0C%EF%9Fn%FE%F7%E3%E5%AFhV6V%A0%04%D3%AF%9F%DF%7F1%40%14123%BC%FA%F8%82%81WN%CDUC%E1%1D%C3%81%7D7%2B%FE%FF%E5%60%D8%BEd%02%C3%8Ds7%19X%BE~%FD%AAs%EC%60%CD%0A66%E1%7F%0F%CEn%96%953%DF%C7%F0%E5%DB%13%CD%F5%CBn%5C%E6cbd%F8%F2%F5%EBl%16%16.%9E%17%B7%EFn%D1N%CD%A9d%F8%FBn%25%03%F3KU%86%8A%EE0f%C6w%E7uf%F5%DEg%60%FFm%A8%C9%F0%E7%FF%7D%86%DF%FF%9F1%CFi%8A%BB%F0%EB%A9%FA%FF_%8Fm%81%9En%FB%9F%EE%AA%F0%EF%FA%9DS%01w%EF%DEe%00%86%FF_NF%86o%7F%A5dE8%98%DF%3Ec8tY%8D%E1%FF%EB%0F%0C%16f%9F%FEq%F1%08o%60%60%FA%0Ev%F8w%86%BF%7FX%8C%2C%FF%A8%B7%F5%2B1%B0%FC%0B.%5D%B0%F2%01CX%AC'%F3%AB%C7o%9C~%FC%E7e%60%FA%F3%E9%17%C3%9F'%DF%FF%AC%DA%FE%7B%A1U%C8%04%3DM-%ED%1E%AB%80%3A%C6%95%9B%B4W%B2%090%BCa%15%FDA%5C%A8%03%04%A8%A1%FCB%9A%8A%E28%FE%BD%F7%9E%BB%3B7%E7%D6%D4)%BA%A6Q%C8%10%84%C6%B4%7F%0E%C2%10B!%FA%23%3E%04%19%3E%08%3D%18%3Ee%F4%07z%A9%7C%0D%C2%D7%22%7C%08%B1%84%14%0A%1FDF4D1%FFVl%3Ag%CB%AD%E9t%7F%DC%EE%BA%BB%FBw%3B%D3%3A%E7%E1%3C%FD%0E%87%CF%F7s%BE%87%C4%0FyR%85%18%95%0A%E9%CC.%E2%91-%AA%0D%DD%F4%C5%B2%2C%F5%7F%5B%5D%E9%AE%B5%D8%C7%F5z%CBxA%C1oS%95%11%DA2%1D%9D%CA3%87b%A3x0%FF%A0%FF_%84G8%18%86%5C8%01%8D%E9%12X%C1fH%FDP%06%3A%1C%D9%8B%AE%A9%BB%2F%3F%BF%F7%3C%D0%F1VzQ)%07%A8%E8%ACF%09m%87%B06%BB%86%80%3B%08R%BC%98%A1%0E0%1C%8F%D8%5E%00A%BF%1B%1B%9E%09%B4%B48%A0%10%7D%97%DA4%DF%20%CBc%B0%B5f%F0i%7C%E6%B6%E1%8B%F6%05%3B%BF%BA%15%0E%2C%22%F23%04%93%B9%15%CDmWA%08%A1%2C%2476%3Ds%8F%96g%87%9Fw%5Co%87%A0%AEG%3Ag%402%99%A24%25Td%A6%20%1D%2C%40%A8%B1%40%24%0E%9Ag%13%04%B2%0F%B52%07%5E%C8%E2%DD%DB%14%B6%A3%D6%9D%5B%BD%3D%D7%98%82%E2-M%C79%D1%EF%8E%EB%BD%3E%E7%A0%7F%7D%F4q%A3U%C2%19%BB%16%3C%F6A%24%1FXr%0A0%5D%86RQE5%DA%83of%05%1FF%96%10%D7%D9q%AE%B3o%C8n%3B%FB%8C%1A%261%D9%BC%1B%1C%CB%D3%D0Y%86A%81%C8%BB%91%ACo%C99T%A6%89%3C%AC%2B%9F%A4%18c%60%EA%BB%91S5%81%88%9B%F8%E5%9C%C7%E8d6%D9~g%B4%B9%F2%24%BB%AE%12%12H%85%08U%86%16%0CaI1%0B%5EC%7Fe%09%B8%7C%2C%1C%BBY%90L%F7%EB%CC%1E%E48%2F%5E%8F%24p%A3%D3%897%C3%01%88Q%0D%2C%D6m%5Cp%CC%E9%16%5D%83c%25%E9%3C%CBD%05%94%AAY%18h%26%D4%1F%2Fh%FF!%1A%88%22%9D%88c%F9%EB%C7%99%D0%9FWmK%0B%3C%8C%C2%80%F7Jo%D7%BD%86%E3%D5%13%E2A%1C%EE%F0b%DF%C6%F7%E9%A1%F3%E5%15%95%D3%13.4%F6%F4%3F%AD%3Dm%7B%92%973G%9E%15%1B6%97%90%91%8B%A6%C1%D1%C0S%D0%C0%B5%164f%B3%A2%CA%A81%EC%18%CC%B5%A8V%F3H%C6%A3%90%8F)H%89%22%18YkN%26E%AE%C6Z%ED%E7%F5%B4%B2%0BGB%FF%05%DE%14n9hj%2C%40%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgRanking"] = "";//"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%13%08%06%00%00%01%05W%06Z%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%05%3BIDATx%DAb%FC%FF%FF%3F%03%0C%B0%AC%5B%B7%9D%E1%8B%D1%87%FF%EB%AF%172%B0%9C%BA%BB%8Fa%F1%C5b%065%E13%0C%00%01%C4%08S%C6%F2%FA%D9%FF%FFe%EF%CC%19%18%E5r%9F%FF%E7%12%E5d%00%08%00*%00%D5%FF%00%C3%C3%C3%00%F5%F4%F9%FF%EE%EE%F7%FF%DF%E1%EE%FF%B5%B8%BE%FE%04%3C%3C%0F%0A(%AD%14%00%0E%01%18%00'%04%3A%00%E2%DDt%01%02%88%11%D9.%B8%9D%2F%5E%BC%F8%CF%C8%C8%CE%C0%C4%C8%C1%F0%F37%03%C3%8F_%2F%19%99~%7F%FE%C9%F0%EE%CFm%86%2F%FF_2%C4%5D%D5d%F8.%C2%C2%C02%F3%7F5%C3%DA%FD%9B%18%B8%85%98%18%E4%1E%DCcx%2C%F8.%8CE%E6%83%26%C3%C7%1B%9D%0C%DF%B8%5E10%02%F1%AB%BFl%FF%01%020%24%C7%3A%09%03%01%00%86%7F%EEJm1%96%93D%13%E3d%84%26%0E%8E%B2%B9809j%E2C%E8%23%F8%1A%8DOa%A2%2F%A0LM%DC%91%0E%3A%88%8D%09%88%20%EDQ%E0Z%40%BF%F5%2B%85aH%A3%E1%AF%BD-%C5x%92R%B66%C8%CD%12%AD5%AB%95%24%8A%3A%EF%AAV%AD%8B%9Fo%FD%1F%90%2F%13%E6k%8B%CD%A9%CDT%0E%198%86%60q%C5%BDs%7B%B8%7BRC%A4EB'%7B%60%24%15%81%3E%A7%FE%E2p%F9%D4%E4%A6%7B%C0o%BFI%FA%D9%26l%17%17%D6d%FE%C1%D0%7Cq%1D%3Csz%FC%88%0CsfGw%F8%8B%16Q%BC%83r_%D9%DB%F6(%C5o)%B3Jw%BF%D7%97gJ%B8F%08%D3%2B2%2F%C6%19%8B%8Am%8C%5B%F6%13%BB%1Ag%7F%02%B0E%F7*%0DC%01%14%C7%CFMn%93%B4MRZ%9A%3Ah)%16tp(%1D%9C%8A%C5%DDA%1C%9C%7C%01W'_A%5C%7C%03'%BB%88%A0XD%D0E%C4%C9%C5%CC%ADEAZK%B5i%13c%3E47%89q%D6%178p~%FF%7F%D5%FE(%26%11V%1A%8D%E6%DDtb%22%25H0%0C%0B%E9t%06%C6x%02%CAK%18%BE%BD%C84%0CC%C2%02%06%C6B%08%22%87%DFe%9EO%81K%89Pr%0A%5C%26%969%E7%23(D%C4%07%98%08%C1%13%10%13%1B%24%8Ep%CB%1D%60w%B0%86%91%DA%DB%A4~%10%88%CC%A0I%A3%11%F4%DC%15Jf%0D%D7%D6%1EN%3AG%E0r6l%3F%98%A3%EF%9E%A9%F5%14%1D%017%C0%CE%CD%16%A8%97%87%A8Y(FK%A8%06%E7h%B5%AB%DB%94%D3%98%BAq%D9D%3D%BF%00%C9%9F%05%95M%88N%05%EB%8B%17h%9D~%23_%E8%83%0E%BBOd%B5%D6F%BF3%03%D5%AB%A0%3Fy%86%B6%7C%88%E3%B3OH%19%1Er%A4%80%06%CCE%D1%AF%E3%FE%91%C0%CAD%C9%C3%84%E1a%1FJ%D6B%96DpD%022%E8%B9%E8rF-%B6_%EB%25%81%B8%C6x%5E%97e%3D%E6%25%F5%2BM%CA%8E%90%9DF%3F%02TP.%AFQ%04A%18%FFf%A6%A7%E7%E9Nv%B3!%89%F1%09Q%09%AC%A0%071Q%BC%E5%20%E8A%3CF0'%CF%82%07%FF%01A%04%0FB%AE%22%11%3D%06%C4%9B%01AQ01%86%90%5D%1F%C1(I%08%E6%E5%C6%DD%EC%CC%24%B3%F3nk%8FEwUW%FD%EA%FBZ%AAV%AB%88%E3%E8%D4%BE%1FL%18%A6%DD%A2%E9%A3%3C%CFc%C8%B9%AF0%25%12Bj%7F%AB-%85a%18%13%D3T%E2%AA%92i%5CksnE%A6i%B9%A6%A9%AE%AB%5C%9D%ED%F0e%BE%EF%13%F0%B4%AFr%B6r%B5X%2C%23%CFrx%9E%07BO%1B%B2%90Q%DC%5B%3E%8E%C2%A1%02%3A%9B%3E%08%23%04A%08%A7%D0Ew%04%AA%B5%F9%B0%BB%B7%AFB%E7%2B%8C%0A!I%12%5E%AF%EF%22l'%24%E6N1%1F2S%60%1A%06%C5%02%CD%BD%16%E9%B9%0D%08%19%ED8%25C%1D%20g%FB%08%A3%00%ED%EC%2F%97-%CB%106i%A6%E5%D3%96%85pJ%C5%1E8%8E%85%B4%F3%BCj%81I2%0C%9BS%7F*%A4%84%C3rt4%B1%8B%05%E5!%BEn%7DAmI%203%25t%B3%86%3C%96%DE%BB%3F%A8%5D%B8%CD%C2%BD%84%84%A6X%FB%8D%3F%10A%3F%82%B8%0B%1E%96%F1%D3%7C%85%B7%3B%B3x%F7%A9%8AK%D2(%86N%0E%E0%7Bq%1Ak%9B%3A%8C%2C%02%D37%A1%2B%83%B0%C3%BBXY%B99%C2%BC%A3%A7%D9%95k%0E%9E%7D%9C%3B%F6C%9D%C4%E7%DA%1A%C6%86%1F%C3s_%60%EA%D74%EA%DB%11%1C%D3%C6%BC%F5%1E%8B%A1%8A%D2Z%19%06)l%B8%F4%04%C5x%0C%1F%16%B6%B0%9A%92%E2%BB%9A%83%E7%06%96%CF3%0EU%E2%0D%5Bd4%CA%26%5C%3C%98%19G)%B1q%A4%7B%1CgN%DC%C2%D6%F66v%F6%26%A0%F7%CC!%D76P%B1%9E%A2%E9%8E%E2%CD%E2.%B8Y%80%A6%B9PD%019%F1a%8F%9EO%0A%CB%E6%D2as%00%97%FB%A71%F5Z%20P%02%B8I%9Dx%B9%60Z%99%90N%20%FE%ADC6V1%93%1E%87%AA%0A%EA8%23%AE%FF%60%92Yu%E2l(j%C6n%8C%DC%81%2C%94%97%A1%B7q%DDm%C4C%17%8B-G%D3rJ(%D2%97%25%C1%E0%07%A1.G%9E%0E%3B%25O%2B%A6%B2%91%9Bz%94iL%12%AA%E8%8D%15YK%B9%D5L%1A%C0%FA%7F%87%DDW%1D%FE%3C9r%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgTribu"] = "";// "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%13%08%06%00%00%01%05W%06Z%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%05%9BIDATx%DAb%FC%FF%FF%3F%03%0C%B08%9B%98%3E%B2%16%7C%2F-%A4-%F7%92q%E3%DE%DB%0C%DF%3E%7C%F7%7D%2B%7Ch3%40%001%C2%941%5EH%D2%FA%AFo%CE%CF%C0%B2V%A2k%F5%1D%13%E10%80%00%00*%00%D5%FF%03%C9%C9%C2%13%24%20!%F630%3F%09%99U%00%BB3*%09%80%00%C1%D3%D3%0AUt%E8%FFT%84%FF%FF%E6%FD%F4%FF%3E%C0Q%FF%02%88%11%D9.%B8%9D%BE%01A%FF9%DE%3EgH%CF%15%3B.%F7%E5%A5%25%9BY3%23%D3%F9%D3%07%19j%14%98%19%D8%BE%FF%BF%A4%C6%FC%8B%81%83%83%97%81%C9%22%F2%02%C3%F3%EAC%0C%13%D8%0C%D3s5%EC%18%9E%BC%FE%25%C6%A4%2F%7Bi%FE%B9%DD%3BV%CC%89%8Cf%D4~%AA%C1%C8%22%C6%F2%0A%20%00%00%CD%002%FF%01%D2%D3%CB%00%AD%AE%BC%14%A1%A0%9A%8BTOQ%B5HR%5E%ACA%3A%01%08%D1%B6%B9%EC%FD%01%F7%0B%11%17%25E%1E!%25%BC%01%40EA%DB%F1%EC%EB%24%C6b%10%00%08%0C%F4%00%AD%C1%12%FD!O%06%D7%2C%06%1B%2C%06%FC%DD%00%CA%E3%0B%00%071d%01%01%D5%D6%CF%00QWl%FB9%E6%CE%04%25%12%0D%00%E2RY%FE%F58%F6%02f%F2%17%00%D3%EC%C6%00%F60S%85F%3AE%7C%01%3CR%81%A3%05%0F~%5C%20%18%00%00%09%23%DB%00%E1%CC%1A%00%E2%FCl%00%F2%0E%C8%00%23-%11%00%D2%F6%DC%00%95%2F%87%BD%01%AA%B7%D6%00%24%22%09%00%04%F1%02%00%19*%FB%00%14%0B%FF%00%00%00%FA%07%E4%EF%F4%F9%AD%B9%C8%00%FD%14%FC%00B!8%00%02%B0A7%AF%0C%C6%01%1C%C0%BF%BF%E7%F1d%0B%2Ba%CBF%5Es1%3C%F2%AC%E5%A5%85B%5E.%94%C8%C5%81%3B%09QRvq%11%B9H%3BMI%93%5CH%1C%1CXa%E30%5B%96%B7%C7%13%87g%3C3%8B%D8%96%87%E7%E1.%9F%3F%E1%F3%EF%DA_4%7Fs%89%7D%B7gbdlh%20I%AB%DD%E3X%BD%E2%DE%9Cw02%BFu%B0%ED%EC*)6-%93z%5B%0D_%CAZ%8B2h%15%2B%CE%25%F8%2F%22T%60%AD%40%D5%EA%CCHA%02bz%F78M%0C%A6%C5V%D9%8B%C9%DA7%0C%DBtp%F9C%BB%ED%E5_%83%99i%D9%C8%D6%C8%F0J%19%E7T%E8%FA%06%A9%A9%99%F0xc8%3D%BE%851%A7CT%1E%05%24K%D7%10%1EUp%D5%8Ds%D4%F4%AC%7D%CA%EE%12p%EE%0Bb%E6%B8%0A%5B%B4%F3%DE%8E%3E%1C%C9%16%8C%DE%BD%40%ADd%C3%A4%ADw%E30%D7%D2i%AB%E3%12%D89%8B%E2%3E%98%40C%FF%3C%E2%91%1C%3C%99yD%5C%E10a%9B%C4%9F%A22%3D%DE%D5%08(%22A%F01%C8jn%81%26%AF%10%92%2C%E1%D9%17%05q%AC%06z%1E%F8%ABn%95f~%8C%A6%94%40%0D%5B%BC%90%C8%17%3FnO.%F1%AA%C4a-%B4%20%C9%60%D0%AFs%A5%9Au%850%E0*%08%01bZ%20%0B%C1%EF%20dE%C6%E7%D7'~%05%E8%A0%7CB%9A%0A%000%FEm%EF%EDm%BEm%3A%A7%DB%9C%9Bh%CETR%D3M'%136%B0%7F%07%F3P%97%A2%0E%1D%EA%D0%A90(%22E%24%10%A4%08%BCT%84%97%A0%10%ADT%A8%0E%9AY%F6G)%986%A7%A18E%5Dn%A2%B8%B9%F7%D6%FE%BC%FD%7F-%CF%1F%FC.%DF%EF%FB%0E%F5%E9%EB%7D%00%8B%ED%0C%0E%98%00z%7B%BA%A0%D1ip%FF%5E%0FRb%02U%95%CD8e%D3%40(d%C1x%FF%C2%B5%E22%AE%AD.%94j%8Bu%BEf%8Bu%89O%C5C%8A%7C%25%FE7G%12%04%01%11I6%BDz%3D%3A%5Cml%ACx8%F0%22%1B%2411%3D%8B%14B%93%06%83%F9%12%9F%00k%FF9%7C%87uN%3D%3An%B0%A0%DC%2C%01%99%DE%83%FDM%17%FE%04i%7F%FB%E5%0E%93T%26%F7%10%D9!t%DB%E7%E7%86%F5%05%12eb%E3%17%88%DF%1F%A0Y%FB%88%8B%FA%08%8C%CA%DD%8A%85%2F%F6%2B%7CD%3C)%A6%26%9E6V%0ArE%D1%3CH%F8%03%E4fa%86%22%11%04%A9%04%BD%B0%E6%A3x%019N~%1D%1B%EBb%A4*D%D6%B7%D1oS%A0U%9B%01K%E5!%91%A4p%24%BA%8F%CD%98%A7%D8%1D%0FH%EA%C2%E4%06%1D%F6%E9%D2%7C%10%99%B4%1F%E0%02%E0I%05%5C%EE%14%94%E6z%A7%A6%AC%01DwW'32%3A%D4%1E%0D%06%40%85%A2%A0%23)p%DE%03%84%BCa%7C%DB%F2%C3%AD%AE%F1%9F%B8%DD%F9%D2%E9g%14%CE%A5i%AB%8Cc%10%F7e%B0%15%01%9E%CF%EDA%D7z%F5V%8D%D1%FC%8CK%84!pl%07%11%8E%C4%8A%86F%967%1D3%DE%9Cb%E1%1EJ%24%0E%E4%ABj%B1L%D9%E0%C9p%90%EB%7F%A0%EA%1C%89RV%83%BB%D6%EBp%F9%1C%E8%FF%D4%07%CA%A4%C9*%B9%8D%0B%FA%B6%9Bm%8D%D6'D%B5%A9%E5%DA%E3%FE%C2%EF%24%DD%20%AA%A8%D3%83*hD%B4%CA%84%937%CEce5%80%02%C2%02v%A3%05%5Ch%1E%11%D5%3B%8Co%7B%F0%D63%08Ui%11%B6%C2%1E%04%E4%0Cf%BF%CE%9C%AD%25%CBR%E4%FE%0EO%B3%E1y%F8%16W%A1%A0I%C8EZ%A4eQt%BC%1FDnN%0649%87%B2%12%A9%FB%B4I%3D%C5%A1%3D%B8%B3.%C8%17%B3z)%17O%8B%0A%C5*JE%AB2%E6%FA%A6%CF%C7%8EV%0F%1C%5E%80T%A2F%B9!%06D%93%20%93b%24%A8%0C%F2%D5Ih%15B%F8%034%04%3C%03%992%81%CD%60%08%8B.%0E%CC%EE2%92%F1%0CbT%1C%A4%9C%80%A9%D0%08%85%5C%8C%7F%E5ZY%0E%98%A9%2B%E5%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgInformes"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0A%08%03%00%00%00%5C%C5%F4%CB%00%00%01%17PLTE%DE%D3%B9%F7%F6%F3%DD%D2%B8%FC%FB%FB%C6%1E%1D%C7%1F%1F%CCwp%D1%7Bk%93%82c%96%85h%96%87h%B2aU%9A%00%00%84%04%03%AD%00%00%A0%3A-%82tX%83uY%93zV%91%7D%5B%89%7Cb%8A%7Dc%94%88o%9A%8Al%9C%88i%9D%8Aj%95%89q%9C%8Dp%99%8Ex%9E%90r%9F%91r%9D%91w%9E%92y%A1%8Aq%A2%8Dt%A4%96y%A5%99%7F%A8%9B~%B1%9B%7F%D2%85u%D3%88w%A2%96%80%A5%9A%82%A9%9D%87%AE%A2%86%B0%A3%86%B4%A0%86%B7%AB%8F%BA%A7%8C%BB%A8%8E%B1%A7%93%B1%A8%96%B5%AD%9D%B7%AF%9C%BF%B2%96%D5%96%84%D3%9D%89%C0%B4%98%C1%B4%98%C2%B6%9A%C3%B6%9A%CB%BF%A4%D4%BD%A5%D6%BE%B1%E3%92%92%CE%C0%AF%CC%C6%BA%CE%C9%BE%D2%C7%AC%D4%C8%AE%DC%C8%AF%D0%C5%B9%D7%CA%BC%D8%CD%BF%DC%D1%B7%BAl_%82%00%00%DF%DB%D1%F3%D8%D7%E3%E0%DA%EB%E5%DF%EB%E6%DF%ED%E8%E1%F0%EC%E8%F4%F2%EE%C0%01%01%F7%F5%F4%F9%F7%F5%F9%F7%F6%FA%F9%F8%FB%FB%F9%C0%02%02%FC%FC%FB~Q%0A%CF%00%00%00%01tRNS%00%40%E6%D8f%00%00%00%86IDATx%5E%3D%CAU%0E%C30%14D%D1g%87Sffffff%86%FD%AF%A3%B5%15e~%AE%8E4%A0%0E%B7%A3%E5%02V%D9%0D%8E%D1%7B%92U%D4%0C%D7%D0%F7uZe%08%D6%B1%CD%8D%DB3%97eQ%8A%00%B4%7C%E9%DDc%F8a%07%25%97c%0A%20W%AE%88y%9Ey%BD%C1%D3%23g%AB%FBp%3F%8E%F2!%DD%B6O%08%DE%AAm%117%8B%1D%8D6A%1D0%A6%9C%96%1C%40%23)P%D7%ED%26%FF%EC%DF9%A6%FC%01%5C%F6%10%C0%E0%D5%F9%A8%00%00%00%00IEND%AEB%60%82";

	twDatosGlobales["imgMensajes"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0A%08%03%00%00%00%5C%C5%F4%CB%00%00%00%07tIME%07%D6%06%14%16%0E%2C%ECx%FEU%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%03%00PLTE%C4%BC%AD%FF%FF%FF%C5%BD%AE%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%DA%D3%C5%FF%FF%FF%BB%B1%9D%AB%A0%87%E0%D7%C3%FF%FF%FF%B5%AC%99%C2%B9%A8%C3%BB%AB%FF%FF%FF%C1%B8%A6%C4%BC%AC%DC%D7%CA%AE%A4%8E%BE%B6%A4%E5%E1%D9vfE%FF%FF%FF%FF%FF%FB%FF%FC%F7%DA%D3%C6wgF%F9%F5%ED%A1%95%7D%B5%AC%98%E4%E1%D7%FF%FF%FF%FF%FF%FF%FF%FF%FC%FF%FC%F6%9E%92z%F1%ED%E1%E5%E2%D9%B8%AD%98%C4%BD%AD%B0%A7%92%E3%DD%D3%FF%FF%F7%FF%FA%F2%A8%9D%84%F0%EB%DD%EC%E5%D8%ED%E6%D9%B6%AB%95%FC%FA%F6%A3%97%80%EF%EA%DE%F8%F2%E8%D5%CC%BA%A5%98%7D%99%8Bn%E1%D8%C5%E5%DD%CB%E7%E1%D0%B5%AA%91%FB%F9%F5%A2%96~%F5%F0%E8%FA%F6%EE%A8%9C%84%B5%AA%92%A3%96y%E3%DA%C6%D8%CE%B9%93%84e%D7%CC%B6%E0%D6%C1%AF%A3%88%FC%FA%F7%A3%98%81%F5%F1%EB%F9%F6%EE%F2%ED%E2%ED%E6%D8%BD%B2%9B%AD%A2%8B%DB%D1%BA%DA%CF%B8%D0%C4%AB%8F~%5D%D3%C7%AF%AD%A0%83%BA%B1%9E%A4%99%83%F9%F7%F1%FF%FB%F7%FB%F8%F1%F3%EE%E4%EE%E7%DA%E7%E0%D0%DC%D1%BB%DB%D0%B9%DA%CF%B7%D1%C5%AC%91%82a%A6%98%7CgV1%B8%AF%9D%C1%B9%A7%BE%B6%A3%B8%AE%99%B5%AA%93%B1%A6%8E%B0%A4%8B%AD%A0%85%AC%9E%84%AC%9E%83%A7%99%7B%A2%93ueR.%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2F%125%80%00%00%00%A6IDATx%DAc%90%91cbbb%00%02!~%3EAUq%06%26%5Eufff%01F%16%1E%09Ia%11Q%06%26f%5E166FV%1E%0E)i.YN%06%06F6y%05%16E%25e%15v.5S%0D%06MFFF-m%0E%1D%5Dv%3D%7D%03C%23%06%06%16Vc%93%20v3s%0BK%2Bk%1B%5B%06%06V%3B%7B%07G'g%17W7w%0FO%2F%06%06o%1F_%3F%FF%80%40%EE%E0%90%D0%B0%F0%08%86%C8%A8%E8%98%D8%B8%F8%04%EE%C4%A4%E4%94%D44%86%F4%8C%CC%2C%CE%EC%9C%DC%BC%FC%82%C2%A2%E2%12%00%22%24%1B%04%B6%5B%E2%3E%00%00%00%00IEND%AEB%60%82";

	twDatosGlobales["imgFlechaIzq"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0B%04%03%00%00%00%5B%82j%15%00%00%00!PLTE%00%00%00z%5BH%7FeT%86%5EI%89cH%8DiP%AC%88n%AD%8At%AF%92%7B%B2%8Bt%B0%90v%C1C%25*%00%00%00%01tRNS%00%40%E6%D8f%00%00%00EIDATx%5E%1D%C5%A1%0D%800%18%05%E1%13%90%14%14%8C%C0%06%24%5D%00%F1%06%60%8Abq%7F%98%A4%C11*%ED%FB%C4%1D%9D%DC%C1%1Bu%BA%DA%7B%B3t%B0%AD%CD%C2%1CW%89%1BR%3C%1F%C0%F4z%A4%8AU~%40E%09%E1%00%0F%E0%F4%00%00%00%00IEND%AEB%60%82";
	twDatosGlobales["imgFlechaDer"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0B%04%03%00%00%00%5B%82j%15%00%00%00!PLTE%EE%EB%DC%89cH%AD%8Atz%5BH%B2%8Bt%8DiP%86%5EI%AC%88n%B0%90v%AF%92%7B%7FeT%5E%7D%1E%25%00%00%00%01tRNS%00%40%E6%D8f%00%00%00BIDATx%5E%1D%C51%01%800%0C%05%D1%2B%0A%C8P%04t)%CC5%C0%C0%C2X%09%B1%10%0D%08A*%FC%DCp%8F%B2%A2%8A%25%CC%9A%B8I%B3%CD%7F%87zi%3Db%07%9Ev%20.%7D%B9IN%FD%03%ED%10%06%D7X%E1%85%D4%00%00%00%00IEND%AEB%60%82";
	
}

// Método: twInitTropasPueblo
// Atributo: $IDPueblo
// Explicación: Inicializa la matriz de tropas del pueblo antes de cargarlas.
function twInitTropasPueblo(vID)
{
	var IDPueblo = vID;
	Tropas[IDPueblo] = new Array();
	// Lanceros
	Tropas[IDPueblo]["Lanceros"] = new Array();
		Tropas[IDPueblo]["Lanceros"]["Totales"] = 0;
		Tropas[IDPueblo]["Lanceros"]["Disponibles"] = 0;
	// Espadas
	Tropas[IDPueblo]["Espadas"] = new Array();
		Tropas[IDPueblo]["Espadas"]["Totales"] = 0;
		Tropas[IDPueblo]["Espadas"]["Disponibles"] = 0;
	// Hachas
	Tropas[IDPueblo]["Hachas"] = new Array();
		Tropas[IDPueblo]["Hachas"]["Totales"] = 0;
		Tropas[IDPueblo]["Hachas"]["Disponibles"] = 0;
	// Aristocratas
	Tropas[IDPueblo]["Aristocratas"] = new Array();
		Tropas[IDPueblo]["Aristocratas"]["Totales"] = 0;
		Tropas[IDPueblo]["Aristocratas"]["Disponibles"] = 0;
	// Espias
	Tropas[IDPueblo]["Espias"] = new Array();
		Tropas[IDPueblo]["Espias"]["Totales"] = 0;
		Tropas[IDPueblo]["Espias"]["Disponibles"] = 0;
	// Ligeros
	Tropas[IDPueblo]["Ligeros"] = new Array();
		Tropas[IDPueblo]["Ligeros"]["Totales"] = 0;
		Tropas[IDPueblo]["Ligeros"]["Disponibles"] = 0;
	// Pesados
	Tropas[IDPueblo]["Pesados"] = new Array();
		Tropas[IDPueblo]["Pesados"]["Totales"] = 0;
		Tropas[IDPueblo]["Pesados"]["Disponibles"] = 0;
	// Arietes
	Tropas[IDPueblo]["Arietes"] = new Array();
		Tropas[IDPueblo]["Arietes"]["Totales"] = 0;
		Tropas[IDPueblo]["Arietes"]["Disponibles"] = 0;
	// Catapultas
	Tropas[IDPueblo]["Catapultas"] = new Array();
		Tropas[IDPueblo]["Catapultas"]["Totales"] = 0;
		Tropas[IDPueblo]["Catapultas"]["Disponibles"] = 0;
}

// Método: twMostrarRecursos
// Explicación: Una vez cargado, muestra los recursos del pueblo en el que nos encontramos en la barra de Navegación.
function twMostrarRecursos()
{

	var divRecursos = "";
	divRecursos += "<div style='position:absolute;top:131px;margin-left:85px'>";
	divRecursos += "<table>";
	divRecursos += "	<tbody>";
	divRecursos += "		<tr>";
	divRecursos += "			<td title='Timber'><img src='"+twLinks["imgMadera"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+twDatosGlobales["Madera"]+"<span style='vertical-align:sub;font-size:9px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>";
	divRecursos += "			<td title='clay'><img src='"+twLinks["imgBarro"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+twDatosGlobales["Barro"]+"<span style='vertical-align:sub;font-size:9px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>";
	divRecursos += "			<td title='Iron'><img src='"+twLinks["imgHierro"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+twDatosGlobales["Hierro"]+"<span style='vertical-align:sub;font-size:9px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>";
	divRecursos += "			<td title='Warehouse'><img src='"+twLinks["imgAlmacen"]+"'></td><td><span id='storage'>"+twDatosGlobales["Almacen"]+"</span><span style='vertical-align:sub;font-size:9px;'></span></td>";
	divRecursos += "		</tr>";
	divRecursos += "	</tbody>";
	divRecursos += "</table>";
	divRecursos += "</div>";

	$('BarraNav').innerHTML += divRecursos;
	
}

// Método: twMostrarGranja
// Explicación: Una vez cargada, muestra las tropas del pueblo en el que nos encontramos en la Barra de Navegación.
function twMostrarGranja()
{
	var divGranja = "";
	divGranja += "<div style='position:absolute;top:155px;margin-left:85px'>";
	divGranja += "<table>";
	divGranja += "	<tbody>";
	divGranja += "		<tr>";
	divGranja += "			<td title='Taken'><img src='"+twLinks["imgPoblacion"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'><span>"+twDatosGlobales["Granja"]["Ocupados"] +"</span><span style='vertical-align:sub;font-size:9px;'> / Used</span></td>";
	divGranja += "			<td title='Total'><img src='"+twLinks["imgPoblacion"]+"'></td><tdstyle='border-right:1px solid; border-color:#B5936F;'><span>"+twDatosGlobales["Granja"]["Totales"]+"</span><span style='vertical-align:sub;font-size:9px;'> / Total</span></td>";
	divGranja += "			<td title='Available'><img src='"+twLinks["imgPoblacion"]+"'></td><tdstyle='border-right:1px solid; border-color:#B5936F;'><span style='color:red;'><b>"+twDatosGlobales["Granja"]["Libres"]+"</b></span><span style='vertical-align:sub;font-size:9px;'> / Available</span></td>";
	divGranja += "		</tr>";
	divGranja += "	</tbody>";
	divGranja += "</table>";
	divGranja += "</div>";
	$('BarraNav').innerHTML += divGranja;
	
}

// Método: twMostrarTropas
// Explicación: Una vez cargada, muestra las tropas del pueblo en el que nos encontramos en la Barra de Navegación.
function twMostrarTropas(IDPueblo)
{
	var divTropas = "";
	divTropas += "<div style='position:absolute;top:106px;margin-left:85px'>";
	divTropas += "<table>";
	divTropas += "	<tbody>";
	divTropas += "		<tr>";
	divTropas += "			<td title='Spear fighters'><img src='"+twLinks["imgLancero"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+Tropas[IDPueblo]["Lanceros"]["Totales"]+"&nbsp;&nbsp;</td>";
	divTropas += "			<td title='Swordsmen'><img src='"+twLinks["imgEspada"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+Tropas[IDPueblo]["Espadas"]["Totales"]+"&nbsp;&nbsp;</td>";
	divTropas += "			<td title='Axemen'><img src='"+twLinks["imgHacha"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+Tropas[IDPueblo]["Hachas"]["Totales"]+"&nbsp;&nbsp;</td>";
	divTropas += "			<td title='Scouts'><img src='"+twLinks["imgEspia"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+Tropas[IDPueblo]["Espias"]["Totales"]+"&nbsp;&nbsp;</td>";
	divTropas += "			<td title='Light cavalry'><img src='"+twLinks["imgLigero"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+Tropas[IDPueblo]["Ligeros"]["Totales"]+"&nbsp;&nbsp;</td>";
	divTropas += "			<td title='Heavy cavalry'><img src='"+twLinks["imgPesado"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+Tropas[IDPueblo]["Pesados"]["Totales"]+"&nbsp;&nbsp;</td>";
	divTropas += "			<td title='Ram'><img src='"+twLinks["imgAriete"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+Tropas[IDPueblo]["Arietes"]["Totales"]+"&nbsp;&nbsp;</td>";
	divTropas += "			<td title='Catapult'><img src='"+twLinks["imgCatapulta"]+"'></td><td style='border-right:1px solid; border-color:#B5936F;'>"+Tropas[IDPueblo]["Catapultas"]["Totales"]+"&nbsp;&nbsp;</td>";
	divTropas += "			<td title='Nobleman'><img src='"+twLinks["imgAristocrata"]+"'></td><td>"+Tropas[IDPueblo]["Aristocratas"]["Totales"]+"</td>";
	divTropas += "		</tr>";
	divTropas += "	</tbody>";
	divTropas += "</table>";
	divTropas += "</div>";
	$('Cargando').parentNode.removeChild($('Cargando'));
	$('BarraNav').innerHTML += divTropas;
	
}

// Método: twNavegacionPueblos
// Explicación: una vez cargado el listado de pueblos, nos permite movernos rápidamente entre ellos. Además, también
// se encarga de escribir el nombre del pueblo, coordenadas y puntos en la Barra de Navegación.
function twNavegacionPueblos()
{
	var k = 0
	while(twListaPueblos[k]["ID"] != vID)
		k++;
	var str = "";
	
	if(document.evaluate("/html/body/div/table[2]/tbody/tr/td[2]/table/tbody/tr/td[3]/table/tbody/tr/td",document, null,XPathResult.STRING_TYPE,null).stringValue != "")
		str += '<span style="color:#DE6706;margin-right:10px"><img src="'+twLinks["imgCuartel"]+'" /><b>'+document.evaluate("/html/body/div/table[2]/tbody/tr/td[2]/table/tbody/tr/td[3]/table/tbody/tr/td",document, null,XPathResult.STRING_TYPE,null).stringValue+'</b></span>';
	
	str += "<span><a accesskey='s' href='"+twUrlScreen+"village="+twListaPueblos[k]["ID"]+"&screen=overview_villages'>"+twListaPueblos[k]["Nombre"]+"("+twListaPueblos[k]["Coords"]+")&nbsp;|&nbsp;"+twListaPueblos[k]["Puntos"]+" P</a></span>";
	var divPueblos = "";
	
	if(k > 0)
	{
		var previous = k-1;
		divPueblos += "<div style='position:absolute;top:88px;margin-left:110px;z-index:99'>";
		divPueblos += "<a href='"+twUrlScreen+"village="+twListaPueblos[previous]["ID"]+nowUrl+"' ><img src='"+twDatosGlobales["imgFlechaIzq"]+"' width=11 height=11 alt='Previous'/></a>";
		divPueblos += "</div>";
	}

	divPueblos += "<div style='position:absolute;top:84px;width:650px;text-align:center;margin-left:35px'>";
	divPueblos += str; 
	divPueblos += "</div>";
	
	if ((k+1) < nPueblos )
	{
		var next = k+1;
		divPueblos += "<div style='position:absolute;top:88px;margin-left:590px;'>";
		divPueblos += "<a href='"+twUrlScreen+"village="+twListaPueblos[next]["ID"]+nowUrl+"' ><img src='"+twDatosGlobales["imgFlechaDer"]+"' width=11 height=11 alt='Next' /></a>";
		divPueblos += "</div>";
	}
	$('BarraNav').innerHTML += divPueblos;
}

// Método: twObtenerTropas
// Explicación: Obtiene las tropas del pueblo.
function twObtenerTropas()
{
	var aux;
	var strUnidad
	twInitTropasPueblo(vID);
	
	GM_xmlhttpRequest({
				method: 'GET',
				url: twUrlScreen+'village='+vID+'&screen=overview',
				headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'text/xml',
				},

				onload: function(responseDetails) {
						httpRequest  = responseDetails.responseText;
						var newHTML = document.createElement("div");
						newHTML.setAttribute('id', 'loadTropas');
						newHTML.innerHTML = httpRequest;
						document.body.insertBefore(newHTML, document.body.childNodes[0]);
		
						var k= 2;
						if(document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr/th',document, null,XPathResult.STRING_TYPE,null).stringValue == "Units")
						{
							aux = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td',document,null,XPathResult.STRING_TYPE,null).stringValue;
							do
							{
								if(aux.indexOf( "Spear fighters",0) != -1)
									Tropas[vID]["Lanceros"]["Totales"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
								if(aux.indexOf( "Swordsmen",0) != -1)
									Tropas[vID]["Espadas"]["Totales"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
								if(aux.indexOf( "Axemen",0) != -1)
									Tropas[vID]["Hachas"]["Totales"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
								if(aux.indexOf( "Scout",0) != -1)
									Tropas[vID]["Espias"]["Totales"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
								if(aux.indexOf( "Light cavalry",0) != -1)
									Tropas[vID]["Ligeros"]["Totales"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
								if(aux.indexOf( "Heavy cavalry",0) != -1)
									Tropas[vID]["Pesados"]["Totales"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
								if(aux.indexOf( "Ram",0) != -1)
									Tropas[vID]["Arietes"]["Totales"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
								if(aux.indexOf( "Catapult",0) != -1)
									Tropas[vID]["Catapultas"]["Totales"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
								if(aux.indexOf( "Nobleman",0) != -1)		
									Tropas[vID]["Aristocratas"]["Totales"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
								k++;
								aux = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr['+k+']/td',document,null,XPathResult.STRING_TYPE,null).stringValue;
							}while(aux != "");					
						}
						
						twDatosGlobales['ProDeMadera'] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td[2]/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
						twDatosGlobales['ProDeBarro'] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;
						twDatosGlobales['ProDeHierro'] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]/strong',document,null,XPathResult.STRING_TYPE,null).stringValue;

						newHTML.parentNode.removeChild(newHTML);
						twMostrarTropas(vID);
				}
	});
}
// Método: twObtenerpID
// Explicación: Se encarga de inicializar la variable pID,
function twObtenerpID()
{
	// Avisa al usuario de que se están cargando datos.
	var newHTML = document.createElement("div");
	newHTML.setAttribute('id', 'Cargando');
	newHTML.setAttribute('style','position:absolute;top:106px;margin-left:209px;border:1px solid #000;Background-color:#DED3B9;color:#000;font-size:12px;width:498px;height:15px;text-align:center;opacity:0.85;padding:4px;');
	newHTML.innerHTML = "<b>Loading...</b>";
	document.body.insertBefore(newHTML, document.body.childNodes[1]);
	
	//if(pID == 0)
	//{
		GM_xmlhttpRequest({
					method: 'GET',
					url: twUrlScreen+'village='+vID+'&screen=info_village&id='+vID,
					headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Accept': 'application/x-www-form-urlencoded',
					},
					
					onload: function(responseDetails) {
							httpRequest  = responseDetails.responseText;
							var newHTML = document.createElement("div");
							newHTML.setAttribute('id', 'loadVillages');
							newHTML.innerHTML = httpRequest;
							document.body.insertBefore(newHTML, document.body.childNodes[4]);
							pID = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr[4]/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
							pID = pID.substring( pID.indexOf("d=",0)+2, pID.indexOf("\">",0) );
							newHTML.parentNode.removeChild(newHTML);
							// Identificador del jugador
							GM_setValue("pID", pID);
							twObtenerPueblos();
					},
		});
	//}
	/*else
	{
		twMostrarRecursos();
		twMostrarGranja();
		twInitTropasPueblo(vID);
		twMostrarTropas(vID);
		twNavegacionPueblos();

	}*/
}

// Método: twObtenerPueblos
// Explicación: Se encarga de obtener un listado de los pueblos del jugador y servir de
// disparador para cargar las tropas, recursos y datos de la granja del jugador.
function twObtenerPueblos()
{
	GM_xmlhttpRequest({
			method: 'GET',
			url: twUrlScreen+'village='+vID+'&screen=info_player&id='+pID,
			headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/x-www-form-urlencoded',
			},
			
			onload: function(responseDetails) {
					httpRequest  = responseDetails.responseText;
					var newHTML = document.createElement("div");
					newHTML.setAttribute('id', 'loadPlayer');
					newHTML.innerHTML = httpRequest;
					document.body.insertBefore(newHTML, document.body.childNodes[4]);

					var i = 2;
					while(document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr['+i+']/td/a',document,null,XPathResult.STRING_TYPE,null).stringValue != "")
					{
						twListaPueblos[nPueblos] = new Array();
						twListaPueblos[nPueblos]["ID"] = document.evaluate('/html/body/div/table[3]/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr['+i+']/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
						twListaPueblos[nPueblos]["ID"] = twListaPueblos[nPueblos]["ID"].substring( twListaPueblos[nPueblos]["ID"].indexOf("d=",0)+2, twListaPueblos[nPueblos]["ID"].indexOf("\">",0) );
						twListaPueblos[nPueblos]["Nombre"] = document.evaluate('/html/body/div[3]/table[3]/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr['+i+']/td/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
						twListaPueblos[nPueblos]["Coords"] = document.evaluate('/html/body/div[3]/table[3]/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr['+i+']/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
						twListaPueblos[nPueblos]["Puntos"] = document.evaluate('/html/body/div[3]/table[3]/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr['+i+']/td[3]',document,null,XPathResult.STRING_TYPE,null).stringValue;
						i++;
						nPueblos++;
					}			
					twMostrarRecursos();
					twMostrarGranja();
					twNavegacionPueblos();
					newHTML.parentNode.removeChild(newHTML);
					twObtenerTropas();
			}
		});
}

// Método: twCalculadoraTiempoTropas
// Atributos: $PuebloOrigen, $PuebloDestino
// Explicación: Devuelve una martiz con los tiempos que tarda cada unidad en llegar al pueblo de destino.
function twCalculadoraTiempoTropas(PuebloOrigen, PuebloDestino)
{
	var VelocidadUnidadPorCampo = new Array(12,15,12,6,6.5,7.5,20,24,30); // Velocidades
		
	var X = 0; // Distancia en el eje X
	var Y = 0; // Distancia en el eje Y
	
	var T = 0; // Tiempo en minutos
	var Distancias =  new Array(10);
	var Duracion = new Array(0,0,0); // Tiempo en hh:mm:ss
	
	dX = Math.pow((PuebloOrigen[0] - PuebloDestino[0]), 2);
	dY = Math.pow((PuebloOrigen[1] - PuebloDestino[1]), 2);
	
	Distancias[0] = Math.ceil(Math.sqrt((dX+dY)));	
	
	for(var i=1;i<10;i++)
	{
		// Obtención de las componentes del vector distancia
		X = (PuebloOrigen[0] - PuebloDestino[0]) *  VelocidadUnidadPorCampo[i-1];
		Y = (PuebloOrigen[1] - PuebloDestino[1]) *  VelocidadUnidadPorCampo[i-1];
		
		// Cálculo del tiempo en Minutos
		T = Math.sqrt(X*X + Y*Y);
		
		Duracion[0] = parseInt(T/60);                               							  // Horas
		Duracion[1] = parseInt(T - Duracion[0]*60);                 							  // Minutos
		Duracion[2] = Math.round((T - parseInt(Duracion[0]*60 + Duracion[1]))*60);  // Segundos
		
		Distancias[i] = Duracion[0]+":"+Duracion[1]+":"+Duracion[2];
	
	}
	return Distancias;
};

// Método: twCompactadorJS
// Explicación: Carga el mapa con todos los pueblos del world.
function twMapa(){}

// Método: twCompactador
// Explicación: Compacta el informe abierto en pantalla
function twCompactador()
{
		var flagDefensor = 0;
		// Número de espacios que utiliza cada unidad en la granja
		var EspacioPorUnidad = new Array(1,1,1,2,4,6,5,8,100);
		
		// Costes por unidad
		var PrecioPorUnidad = new Array();
		PrecioPorUnidad['Lancero'] = new Array(50,30,10);
		PrecioPorUnidad['Espadas'] = new Array(30,30,90);
		PrecioPorUnidad['Hachas'] = new Array(60,30,40);
		PrecioPorUnidad['Espia'] = new Array(50,50,20);
		PrecioPorUnidad['Ligero'] = new Array(125,100,250);
		PrecioPorUnidad['Pesado'] = new Array(180,120,500);
		PrecioPorUnidad['Ariete'] = new Array(300,200,200);
		PrecioPorUnidad['Catapulta'] = new Array(320,400,100);
		PrecioPorUnidad['Aristocrata'] = new Array(30000,50000,50000);
		
		// Comprobación: Informe reenviado (pos=5) o Informe propio (pos=3)
		var posInicial = 3;
		if(document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td',document,null,XPathResult.STRING_TYPE,null).stringValue == "Enviado por:")
			posInicial = 5;
			
		// Datos del informe
		var datosInforme = new Array();

		datosInforme['Fecha'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
		datosInforme['Suerte'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table/tbody/tr/td/b',document,null,XPathResult.STRING_TYPE,null).stringValue;
		datosInforme['Moral'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table/tbody/tr/td/h4',document,null,XPathResult.STRING_TYPE,null).stringValue;
		datosInforme['Moral'] = datosInforme['Moral'].replace("Moral:","");
		
		var auxPatacante = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[2]/td[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
		var auxPdefensor = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[2]/td[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;

		datosInforme['Atacante'] = new Array();
			datosInforme['Atacante']['Nombre'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr/th[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
			datosInforme['Atacante']['Pueblo'] = new Array();
				datosInforme['Atacante']['Pueblo']['Nombre'] = auxPatacante.substring(0, (auxPatacante.lastIndexOf('(')-1) );
				datosInforme['Atacante']['Pueblo']['x'] = auxPatacante.substring( (auxPatacante.lastIndexOf('(')+1), auxPatacante.lastIndexOf('|') );
				datosInforme['Atacante']['Pueblo']['y'] = auxPatacante.substring( (auxPatacante.lastIndexOf('|')+1), auxPatacante.lastIndexOf(')') );
			datosInforme['Atacante']['Tropas'] = new Array();
				datosInforme['Atacante']['Tropas']['Lanceros'] = new Array();
					datosInforme['Atacante']['Tropas']['Lanceros']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Atacante']['Tropas']['Lanceros']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Atacante']['Tropas']['Espadas'] = new Array();
					datosInforme['Atacante']['Tropas']['Espadas']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td[3]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Atacante']['Tropas']['Espadas']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td[3]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Atacante']['Tropas']['Hachas'] = new Array();
					datosInforme['Atacante']['Tropas']['Hachas']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td[4]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Atacante']['Tropas']['Hachas']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td[4]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Atacante']['Tropas']['Espias'] = new Array();
					datosInforme['Atacante']['Tropas']['Espias']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td[5]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Atacante']['Tropas']['Espias']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td[5]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Atacante']['Tropas']['Ligeros'] = new Array();
					datosInforme['Atacante']['Tropas']['Ligeros']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td[6]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Atacante']['Tropas']['Ligeros']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td[6]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Atacante']['Tropas']['Pesados'] = new Array();
					datosInforme['Atacante']['Tropas']['Pesados']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td[7]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Atacante']['Tropas']['Pesados']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td[7]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Atacante']['Tropas']['Arietes'] = new Array();
					datosInforme['Atacante']['Tropas']['Arietes']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td[8]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Atacante']['Tropas']['Arietes']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td[8]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Atacante']['Tropas']['Catapultas'] = new Array();
					datosInforme['Atacante']['Tropas']['Catapultas']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td[9]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Atacante']['Tropas']['Catapultas']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td[9]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Atacante']['Tropas']['Aristocratas'] = new Array();
					datosInforme['Atacante']['Tropas']['Aristocratas']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[2]/td[10]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Atacante']['Tropas']['Aristocratas']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[3]/tbody/tr[3]/td/table/tbody/tr[3]/td[10]',document,null,XPathResult.STRING_TYPE,null).stringValue;

		datosInforme['Defensor'] = new Array();
			datosInforme['Defensor']['Nombre'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr/th[2]/a',document,null,XPathResult.STRING_TYPE,null).stringValue;
			datosInforme['Defensor']['Pueblo'] = new Array();
				datosInforme['Defensor']['Pueblo']['Nombre'] = auxPdefensor.substring(0, (auxPdefensor.lastIndexOf('(')-1) );
				datosInforme['Defensor']['Pueblo']['x'] = auxPdefensor.substring( (auxPdefensor.lastIndexOf('(')+1), auxPdefensor.lastIndexOf('|') );
				datosInforme['Defensor']['Pueblo']['y'] = auxPdefensor.substring( (auxPdefensor.lastIndexOf('|')+1), auxPdefensor.lastIndexOf(')') );
			datosInforme['Defensor']['Tropas'] = new Array();
				datosInforme['Defensor']['Tropas']['Lanceros'] = new Array();
					datosInforme['Defensor']['Tropas']['Lanceros']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Defensor']['Tropas']['Lanceros']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Defensor']['Tropas']['Espadas'] = new Array();
					datosInforme['Defensor']['Tropas']['Espadas']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td[3]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Defensor']['Tropas']['Espadas']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td[3]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Defensor']['Tropas']['Hachas'] = new Array();
					datosInforme['Defensor']['Tropas']['Hachas']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td[4]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Defensor']['Tropas']['Hachas']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td[4]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Defensor']['Tropas']['Espias'] = new Array();
					datosInforme['Defensor']['Tropas']['Espias']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td[5]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Defensor']['Tropas']['Espias']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td[5]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Defensor']['Tropas']['Ligeros'] = new Array();
					datosInforme['Defensor']['Tropas']['Ligeros']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td[6]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Defensor']['Tropas']['Ligeros']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td[6]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Defensor']['Tropas']['Pesados'] = new Array();
					datosInforme['Defensor']['Tropas']['Pesados']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td[7]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Defensor']['Tropas']['Pesados']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td[7]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Defensor']['Tropas']['Arietes'] = new Array();
					datosInforme['Defensor']['Tropas']['Arietes']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td[8]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Defensor']['Tropas']['Arietes']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td[8]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Defensor']['Tropas']['Catapultas'] = new Array();
					datosInforme['Defensor']['Tropas']['Catapultas']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td[9]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Defensor']['Tropas']['Catapultas']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td[9]',document,null,XPathResult.STRING_TYPE,null).stringValue;
				datosInforme['Defensor']['Tropas']['Aristocratas'] = new Array();
					datosInforme['Defensor']['Tropas']['Aristocratas']['Totales'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[2]/td[10]',document,null,XPathResult.STRING_TYPE,null).stringValue;
					datosInforme['Defensor']['Tropas']['Aristocratas']['Perdidos'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/table/tbody/tr[3]/td[10]',document,null,XPathResult.STRING_TYPE,null).stringValue;
		
		datosInforme['Espionaje']= "" ;
		datosInforme['Danios'] = new Array ();
		datosInforme['Danios']['Arietes'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[5]/tbody/tr[2]/td',document,null,XPathResult.STRING_TYPE,null).stringValue;
		datosInforme['Danios']['Catapultas'] = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[5]/tbody/tr[3]/td',document,null,XPathResult.STRING_TYPE,null).stringValue;
		datosInforme['Botin'] =  document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[5]/tbody/tr/td',document,null,XPathResult.STRING_TYPE,null).stringValue.split(" ");
		datosInforme['Aprobacion'] = "";

		// Informe para foro TribalWars.es
		var informeCompac = '';
		//informeCompac += '[U][B][COLOR=darkblue]'+datosInforme['Atacante']['Nombre']+'[/COLOR] vs [COLOR=green]'+datosInforme['Defensor']['Nombre']+'[/COLOR][/B][/U]\n';
		informeCompac += '[b]Batalla del d&iacute;a '+datosInforme['Fecha'].substring(0,8)+' a las '+datosInforme['Fecha'].substring(14,8)+'[/b]\n\n';
		
		informeCompac += '[i]Suerte:[color=red] '+datosInforme['Suerte']+' [/color][/i]\n';
		informeCompac += '[i]Moral:[color=blue] '+datosInforme['Moral']+' [/color][/i]\n\n';
		
		informeCompac += '[b]Atacante: [color=purple][size=15] '+datosInforme['Atacante']['Nombre']+' [/size][/color][/b]\n'; 
		informeCompac += '[b]Pueblo: [color=navy][size=13] '+datosInforme['Atacante']['Pueblo']['Nombre']+' ['+datosInforme['Atacante']['Pueblo']['x']+'|'+datosInforme['Atacante']['Pueblo']['y']+'] [/size][/color][/b]\n';
		
		// Tropas Atacante
		// Lanceros
		if( datosInforme['Atacante']['Tropas']['Lanceros']['Totales'] > 0	)
					informeCompac += '[img]'+twLinks["imgLancero"]+'[/img] Lanceros: [b] '+datosInforme['Atacante']['Tropas']['Lanceros']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Atacante']['Tropas']['Lanceros']['Perdidos']+' [/color]([color=green]'+(datosInforme['Atacante']['Tropas']['Lanceros']['Totales']-datosInforme['Atacante']['Tropas']['Lanceros']['Perdidos'])+'[/color])\n';
		// Espadas
		if( datosInforme['Atacante']['Tropas']['Espadas']['Totales'] > 0	)
					informeCompac += '[img]'+twLinks["imgEspada"]+'[/img] Guerreros a Espada: [b] '+datosInforme['Atacante']['Tropas']['Espadas']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Atacante']['Tropas']['Espadas']['Perdidos']+' [/color]([color=green]'+(datosInforme['Atacante']['Tropas']['Espadas']['Totales']-datosInforme['Atacante']['Tropas']['Espadas']['Perdidos'])+'[/color])\n';
		// Hachas
		if( datosInforme['Atacante']['Tropas']['Hachas']['Totales'] > 0	)
					informeCompac += '[img]'+twLinks["imgHacha"]+'[/img] Guerreros de Hacha: [b] '+datosInforme['Atacante']['Tropas']['Hachas']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Atacante']['Tropas']['Hachas']['Perdidos']+' [/color]([color=green]'+(datosInforme['Atacante']['Tropas']['Hachas']['Totales']-datosInforme['Atacante']['Tropas']['Hachas']['Perdidos'])+'[/color])\n';
		// Espías
		if( datosInforme['Atacante']['Tropas']['Espias']['Totales'] > 0	)
					informeCompac += '[img]'+twLinks["imgEspia"]+'[/img] Esp&iacute;as: [b] '+datosInforme['Atacante']['Tropas']['Espias']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Atacante']['Tropas']['Espias']['Perdidos']+' [/color]([color=green]'+(datosInforme['Atacante']['Tropas']['Espias']['Totales']-datosInforme['Atacante']['Tropas']['Espias']['Perdidos'])+'[/color])\n';
		// Ligeros
		if( datosInforme['Atacante']['Tropas']['Ligeros']['Totales'] > 0	)
					informeCompac += '[img]'+twLinks["imgLigero"]+'[/img] Caballer&iacute;a Ligera: [b] '+datosInforme['Atacante']['Tropas']['Ligeros']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Atacante']['Tropas']['Ligeros']['Perdidos']+' [/color]([color=green]'+(datosInforme['Atacante']['Tropas']['Ligeros']['Totales']-datosInforme['Atacante']['Tropas']['Ligeros']['Perdidos'])+'[/color])\n';
		// Pesados
		if( datosInforme['Atacante']['Tropas']['Pesados']['Totales'] > 0	)
					informeCompac += '[img]'+twLinks["imgPesado"]+'[/img] Caballer&iacute;a Pesada: [b] '+datosInforme['Atacante']['Tropas']['Pesados']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Atacante']['Tropas']['Pesados']['Perdidos']+' [/color]([color=green]'+(datosInforme['Atacante']['Tropas']['Pesados']['Totales']-datosInforme['Atacante']['Tropas']['Pesados']['Perdidos'])+'[/color])\n';
		// Arietes
		if( datosInforme['Atacante']['Tropas']['Arietes']['Totales'] > 0	)
					informeCompac += '[img]'+twLinks["imgAriete"]+'[/img] Arietes: [b] '+datosInforme['Atacante']['Tropas']['Arietes']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Atacante']['Tropas']['Arietes']['Perdidos']+' [/color]([color=green]'+(datosInforme['Atacante']['Tropas']['Arietes']['Totales']-datosInforme['Atacante']['Tropas']['Arietes']['Perdidos'])+'[/color])\n';
		// Catapultas
		if( datosInforme['Atacante']['Tropas']['Catapultas']['Totales'] > 0	)
					informeCompac += '[img]'+twLinks["imgCatapulta"]+'[/img] Catapultas: [b] '+datosInforme['Atacante']['Tropas']['Catapultas']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Atacante']['Tropas']['Catapultas']['Perdidos']+' [/color]([color=green]'+(datosInforme['Atacante']['Tropas']['Catapultas']['Totales']-datosInforme['Atacante']['Tropas']['Catapultas']['Perdidos'])+'[/color])\n';
		// Aristócratas
		if( datosInforme['Atacante']['Tropas']['Aristocratas']['Totales'] > 0	)
					informeCompac += '[img]'+twLinks["imgAristocrata"]+'[/img] Arist&oacute;cratas: [b] '+datosInforme['Atacante']['Tropas']['Aristocratas']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Atacante']['Tropas']['Aristocratas']['Perdidos']+' [/color]([color=green]'+(datosInforme['Atacante']['Tropas']['Aristocratas']['Totales']-datosInforme['Atacante']['Tropas']['Aristocratas']['Perdidos'])+'[/color])\n';

		informeCompac +='\n';
		var AtcTotalUnidades=0;
		var AtcTotalUnidadesPerdidas=0;

		AtcTotalUnidades = parseInt(datosInforme['Atacante']['Tropas']['Lanceros']['Totales'])+parseInt(datosInforme['Atacante']['Tropas']['Espadas']['Totales'])+parseInt(datosInforme['Atacante']['Tropas']['Hachas']['Totales'])+(parseInt(datosInforme['Atacante']['Tropas']['Espias']['Totales'])*2)+(parseInt(datosInforme['Atacante']['Tropas']['Ligeros']['Totales'])*4)+(parseInt(datosInforme['Atacante']['Tropas']['Pesados']['Totales'])*6)+(parseInt(datosInforme['Atacante']['Tropas']['Arietes']['Totales'])*5)+(parseInt(datosInforme['Atacante']['Tropas']['Catapultas']['Totales'])*8)+(parseInt(datosInforme['Atacante']['Tropas']['Aristocratas']['Totales'])*100);
		AtcTotalUnidadesPerdidas = parseInt(datosInforme['Atacante']['Tropas']['Lanceros']['Perdidos'])+parseInt(datosInforme['Atacante']['Tropas']['Espadas']['Perdidos'])+parseInt(datosInforme['Atacante']['Tropas']['Hachas']['Perdidos'])+(parseInt(datosInforme['Atacante']['Tropas']['Espias']['Perdidos'])*2)+(parseInt(datosInforme['Atacante']['Tropas']['Ligeros']['Perdidos'])*4)+(parseInt(datosInforme['Atacante']['Tropas']['Pesados']['Perdidos'])*6)+(parseInt(datosInforme['Atacante']['Tropas']['Arietes']['Perdidos'])*5)+(parseInt(datosInforme['Atacante']['Tropas']['Catapultas']['Perdidos'])*8)+(parseInt(datosInforme['Atacante']['Tropas']['Aristocratas']['Perdidos'])*100);
			
		informeCompac +='[i][u][b]Unidades Totales Atacante:[/b][/u] [b]Perdi&oacute;[/b] [color=darkred]'+AtcTotalUnidadesPerdidas+'[/color]/[b]'+AtcTotalUnidades+'[/b] Unidad(es) ([b][color=blue]'+(Math.round((AtcTotalUnidadesPerdidas*100/AtcTotalUnidades)*10)/10)+'%[/color][/b]). [b]Resto[/b]: [color=green]'+(AtcTotalUnidades-AtcTotalUnidadesPerdidas)+'[/color] Unidad(es) [/i].\n'
		
		informeCompac += '\n[b]Defensor: [color=purple][size=15] '+datosInforme['Defensor']['Nombre']+' [/size][/color][/b]\n'; 
		informeCompac += '[b]Pueblo: [color=navy][size=13] '+datosInforme['Defensor']['Pueblo']['Nombre']+' ['+datosInforme['Defensor']['Pueblo']['x']+'|'+datosInforme['Defensor']['Pueblo']['y']+'] [/size][/color][/b]\n';
				
		// Tropas Defensor
		if(document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/p',document,null,XPathResult.STRING_TYPE,null).stringValue == ""	)
		{
			// Lanceros
			if( datosInforme['Defensor']['Tropas']['Lanceros']['Totales'] > 0	)
						informeCompac += '[img]'+twLinks["imgLancero"]+'[/img] Lanceros: [b] '+datosInforme['Defensor']['Tropas']['Lanceros']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Defensor']['Tropas']['Lanceros']['Perdidos']+' [/color]([color=green]'+(datosInforme['Defensor']['Tropas']['Lanceros']['Totales']-datosInforme['Defensor']['Tropas']['Lanceros']['Perdidos'])+'[/color])\n';
			// Espadas
			if( datosInforme['Defensor']['Tropas']['Espadas']['Totales'] > 0	)
						informeCompac += '[img]'+twLinks["imgEspada"]+'[/img] Guerreros a Espada: [b] '+datosInforme['Defensor']['Tropas']['Espadas']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Defensor']['Tropas']['Espadas']['Perdidos']+' [/color]([color=green]'+(datosInforme['Defensor']['Tropas']['Espadas']['Totales']-datosInforme['Defensor']['Tropas']['Espadas']['Perdidos'])+'[/color])\n';
			// Hachas
			if( datosInforme['Defensor']['Tropas']['Hachas']['Totales'] > 0	)
						informeCompac += '[img]'+twLinks["imgHacha"]+'[/img] Guerreros de Hacha: [b] '+datosInforme['Defensor']['Tropas']['Hachas']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Defensor']['Tropas']['Hachas']['Perdidos']+' [/color]([color=green]'+(datosInforme['Defensor']['Tropas']['Hachas']['Totales']-datosInforme['Defensor']['Tropas']['Hachas']['Perdidos'])+'[/color])\n';
			// Espías
			if( datosInforme['Defensor']['Tropas']['Espias']['Totales'] > 0	)
						informeCompac += '[img]'+twLinks["imgEspia"]+'[/img] Esp&iacute;as: [b] '+datosInforme['Defensor']['Tropas']['Espias']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Defensor']['Tropas']['Espias']['Perdidos']+' [/color]([color=green]'+(datosInforme['Defensor']['Tropas']['Espias']['Totales']-datosInforme['Defensor']['Tropas']['Espias']['Perdidos'])+'[/color])\n';
			// Ligeros
			if( datosInforme['Defensor']['Tropas']['Ligeros']['Totales'] > 0	)
						informeCompac += '[img]'+twLinks["imgLigero"]+'[/img] Caballer&iacute;a Ligera: [b] '+datosInforme['Defensor']['Tropas']['Ligeros']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Defensor']['Tropas']['Ligeros']['Perdidos']+' [/color]([color=green]'+(datosInforme['Defensor']['Tropas']['Ligeros']['Totales']-datosInforme['Defensor']['Tropas']['Ligeros']['Perdidos'])+'[/color])\n';
			// Pesados
			if( datosInforme['Defensor']['Tropas']['Pesados']['Totales'] > 0	)
						informeCompac += '[img]'+twLinks["imgPesado"]+'[/img] Caballer&iacute;a Pesada: [b] '+datosInforme['Defensor']['Tropas']['Pesados']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Defensor']['Tropas']['Pesados']['Perdidos']+' [/color]([color=green]'+(datosInforme['Defensor']['Tropas']['Pesados']['Totales']-datosInforme['Defensor']['Tropas']['Pesados']['Perdidos'])+'[/color])\n';
			// Arietes
			if( datosInforme['Defensor']['Tropas']['Arietes']['Totales'] > 0	)
						informeCompac += '[img]'+twLinks["imgAriete"]+'[/img] Arietes: [b] '+datosInforme['Defensor']['Tropas']['Arietes']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Defensor']['Tropas']['Arietes']['Perdidos']+' [/color]([color=green]'+(datosInforme['Defensor']['Tropas']['Arietes']['Totales']-datosInforme['Defensor']['Tropas']['Arietes']['Perdidos'])+'[/color])\n';
			// Catapultas
			if( datosInforme['Defensor']['Tropas']['Catapultas']['Totales'] > 0	)
						informeCompac += '[img]'+twLinks["imgCatapulta"]+'[/img] Catapultas: [b] '+datosInforme['Defensor']['Tropas']['Catapultas']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Defensor']['Tropas']['Catapultas']['Perdidos']+' [/color]([color=green]'+(datosInforme['Defensor']['Tropas']['Catapultas']['Totales']-datosInforme['Defensor']['Tropas']['Catapultas']['Perdidos'])+'[/color])\n';
			// Aristócratas
			if( datosInforme['Defensor']['Tropas']['Aristocratas']['Totales'] > 0	)
						informeCompac += '[img]'+twLinks["imgAristocrata"]+'[/img] Arist&oacute;cratas: [b] '+datosInforme['Defensor']['Tropas']['Aristocratas']['Totales']+' [/b].Perdi&oacute;: [color=darkred] '+datosInforme['Defensor']['Tropas']['Aristocratas']['Perdidos']+' [/color]([color=green]'+(datosInforme['Defensor']['Tropas']['Aristocratas']['Totales']-datosInforme['Defensor']['Tropas']['Aristocratas']['Perdidos'])+'[/color])\n';
	
			informeCompac +='\n';
			var DefTotalUnidades=0;
			var DefTotalUnidadesPerdidas=0;
	
			DefTotalUnidades = parseInt(datosInforme['Defensor']['Tropas']['Lanceros']['Totales'])+parseInt(datosInforme['Defensor']['Tropas']['Espadas']['Totales'])+parseInt(datosInforme['Defensor']['Tropas']['Hachas']['Totales'])+(parseInt(datosInforme['Defensor']['Tropas']['Espias']['Totales'])*2)+(parseInt(datosInforme['Defensor']['Tropas']['Ligeros']['Totales'])*4)+(parseInt(datosInforme['Defensor']['Tropas']['Pesados']['Totales'])*6)+(parseInt(datosInforme['Defensor']['Tropas']['Arietes']['Totales'])*5)+(parseInt(datosInforme['Defensor']['Tropas']['Catapultas']['Totales'])*8)+(parseInt(datosInforme['Defensor']['Tropas']['Aristocratas']['Totales'])*100);
			DefTotalUnidadesPerdidas = parseInt(datosInforme['Defensor']['Tropas']['Lanceros']['Perdidos'])+parseInt(datosInforme['Defensor']['Tropas']['Espadas']['Perdidos'])+parseInt(datosInforme['Defensor']['Tropas']['Hachas']['Perdidos'])+(parseInt(datosInforme['Defensor']['Tropas']['Espias']['Perdidos'])*2)+(parseInt(datosInforme['Defensor']['Tropas']['Ligeros']['Perdidos'])*4)+(parseInt(datosInforme['Defensor']['Tropas']['Pesados']['Perdidos'])*6)+(parseInt(datosInforme['Defensor']['Tropas']['Arietes']['Perdidos'])*5)+(parseInt(datosInforme['Defensor']['Tropas']['Catapultas']['Perdidos'])*8)+(parseInt(datosInforme['Defensor']['Tropas']['Aristocratas']['Perdidos'])*100);
				
			informeCompac +='[i][u][b]Unidades Totales Defensor:[/b][/u] [b]Perdi&oacute;[/b] [color=darkred]'+DefTotalUnidadesPerdidas+'[/color]/[b]'+DefTotalUnidades+'[/b] Unidad(es) ([b][color=blue]'+(Math.round((DefTotalUnidadesPerdidas*100/DefTotalUnidades)*10)/10)+'%[/color][/b]). [b]Resto[/b]: [color=green]'+(DefTotalUnidades-DefTotalUnidadesPerdidas)+'[/color] Unidad(es) [/i].\n';
		}
		else{
			if(document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr['+posInicial+']/td/table[4]/tbody/tr[3]/td/p',document,null,XPathResult.STRING_TYPE,null).stringValue != ""	){
				flagDefensor = 1;
				informeCompac += '[i]Tropas Ocultas.[/i]\n';
			}
			else{
				informeCompac += '[i]Sin Tropas.[/i]\n';
			}
		}
		// Vencedor
		if(AtcTotalUnidadesPerdidas == AtcTotalUnidades)
			informeCompac +='\n[b]La batalla es ganada por el Defensor.[/b]\n\n';
		else
			informeCompac +='\n[b]La batalla es ganada por el Atacante.[/b]\n\n';

		// Pérdidas de la Batalla
		var PerdidasRecursosAtacante = new Array();
		PerdidasRecursosAtacante['Madera'] = parseInt(datosInforme['Atacante']['Tropas']['Lanceros']['Perdidos'])*PrecioPorUnidad['Lancero'][0]+parseInt(datosInforme['Atacante']['Tropas']['Espadas']['Perdidos'])*PrecioPorUnidad['Espadas'][0]+parseInt(datosInforme['Atacante']['Tropas']['Hachas']['Perdidos'])*PrecioPorUnidad['Hachas'][0]+parseInt(datosInforme['Atacante']['Tropas']['Espias']['Perdidos'])*PrecioPorUnidad['Espia'][0]+parseInt(datosInforme['Atacante']['Tropas']['Ligeros']['Perdidos'])*PrecioPorUnidad['Ligero'][0]+parseInt(datosInforme['Atacante']['Tropas']['Pesados']['Perdidos'])*PrecioPorUnidad['Pesado'][0]+parseInt(datosInforme['Atacante']['Tropas']['Arietes']['Perdidos'])*PrecioPorUnidad['Ariete'][0]+parseInt(datosInforme['Atacante']['Tropas']['Catapultas']['Perdidos'])*PrecioPorUnidad['Catapulta'][0]+parseInt(datosInforme['Atacante']['Tropas']['Aristocratas']['Perdidos'])*PrecioPorUnidad['Aristocrata'][0];
		PerdidasRecursosAtacante['Barro'] = parseInt(datosInforme['Atacante']['Tropas']['Lanceros']['Perdidos'])*PrecioPorUnidad['Lancero'][1]+parseInt(datosInforme['Atacante']['Tropas']['Espadas']['Perdidos'])*PrecioPorUnidad['Espadas'][1]+parseInt(datosInforme['Atacante']['Tropas']['Hachas']['Perdidos'])*PrecioPorUnidad['Hachas'][1]+parseInt(datosInforme['Atacante']['Tropas']['Espias']['Perdidos'])*PrecioPorUnidad['Espia'][1]+parseInt(datosInforme['Atacante']['Tropas']['Ligeros']['Perdidos'])*PrecioPorUnidad['Ligero'][1]+parseInt(datosInforme['Atacante']['Tropas']['Pesados']['Perdidos'])*PrecioPorUnidad['Pesado'][1]+parseInt(datosInforme['Atacante']['Tropas']['Arietes']['Perdidos'])*PrecioPorUnidad['Ariete'][1]+parseInt(datosInforme['Atacante']['Tropas']['Catapultas']['Perdidos'])*PrecioPorUnidad['Catapulta'][1]+parseInt(datosInforme['Atacante']['Tropas']['Aristocratas']['Perdidos'])*PrecioPorUnidad['Aristocrata'][1];
		PerdidasRecursosAtacante['Hierro'] = parseInt(datosInforme['Atacante']['Tropas']['Lanceros']['Perdidos'])*PrecioPorUnidad['Lancero'][2]+parseInt(datosInforme['Atacante']['Tropas']['Espadas']['Perdidos'])*PrecioPorUnidad['Espadas'][2]+parseInt(datosInforme['Atacante']['Tropas']['Hachas']['Perdidos'])*PrecioPorUnidad['Hachas'][2]+parseInt(datosInforme['Atacante']['Tropas']['Espias']['Perdidos'])*PrecioPorUnidad['Espia'][2]+parseInt(datosInforme['Atacante']['Tropas']['Ligeros']['Perdidos'])*PrecioPorUnidad['Ligero'][2]+parseInt(datosInforme['Atacante']['Tropas']['Pesados']['Perdidos'])*PrecioPorUnidad['Pesado'][2]+parseInt(datosInforme['Atacante']['Tropas']['Arietes']['Perdidos'])*PrecioPorUnidad['Ariete'][2]+parseInt(datosInforme['Atacante']['Tropas']['Catapultas']['Perdidos'])*PrecioPorUnidad['Catapulta'][2]+parseInt(datosInforme['Atacante']['Tropas']['Aristocratas']['Perdidos'])*PrecioPorUnidad['Aristocrata'][2];

		var PerdidasRecursosDefensor = new Array();
		if(flagDefensor == 0){
			PerdidasRecursosDefensor['Madera'] = parseInt(datosInforme['Defensor']['Tropas']['Lanceros']['Perdidos'])*PrecioPorUnidad['Lancero'][0]+parseInt(datosInforme['Defensor']['Tropas']['Espadas']['Perdidos'])*PrecioPorUnidad['Espadas'][0]+parseInt(datosInforme['Defensor']['Tropas']['Hachas']['Perdidos'])*PrecioPorUnidad['Hachas'][0]+parseInt(datosInforme['Defensor']['Tropas']['Espias']['Perdidos'])*PrecioPorUnidad['Espia'][0]+parseInt(datosInforme['Defensor']['Tropas']['Ligeros']['Perdidos'])*PrecioPorUnidad['Ligero'][0]+parseInt(datosInforme['Defensor']['Tropas']['Pesados']['Perdidos'])*PrecioPorUnidad['Pesado'][0]+parseInt(datosInforme['Defensor']['Tropas']['Arietes']['Perdidos'])*PrecioPorUnidad['Ariete'][0]+parseInt(datosInforme['Defensor']['Tropas']['Catapultas']['Perdidos'])*PrecioPorUnidad['Catapulta'][0]+parseInt(datosInforme['Defensor']['Tropas']['Aristocratas']['Perdidos'])*PrecioPorUnidad['Aristocrata'][0];
			PerdidasRecursosDefensor['Barro'] = parseInt(datosInforme['Defensor']['Tropas']['Lanceros']['Perdidos'])*PrecioPorUnidad['Lancero'][1]+parseInt(datosInforme['Defensor']['Tropas']['Espadas']['Perdidos'])*PrecioPorUnidad['Espadas'][1]+parseInt(datosInforme['Defensor']['Tropas']['Hachas']['Perdidos'])*PrecioPorUnidad['Hachas'][1]+parseInt(datosInforme['Defensor']['Tropas']['Espias']['Perdidos'])*PrecioPorUnidad['Espia'][1]+parseInt(datosInforme['Defensor']['Tropas']['Ligeros']['Perdidos'])*PrecioPorUnidad['Ligero'][1]+parseInt(datosInforme['Defensor']['Tropas']['Pesados']['Perdidos'])*PrecioPorUnidad['Pesado'][1]+parseInt(datosInforme['Defensor']['Tropas']['Arietes']['Perdidos'])*PrecioPorUnidad['Ariete'][1]+parseInt(datosInforme['Defensor']['Tropas']['Catapultas']['Perdidos'])*PrecioPorUnidad['Catapulta'][1]+parseInt(datosInforme['Defensor']['Tropas']['Aristocratas']['Perdidos'])*PrecioPorUnidad['Aristocrata'][1];
			PerdidasRecursosDefensor['Hierro'] = parseInt(datosInforme['Defensor']['Tropas']['Lanceros']['Perdidos'])*PrecioPorUnidad['Lancero'][2]+parseInt(datosInforme['Defensor']['Tropas']['Espadas']['Perdidos'])*PrecioPorUnidad['Espadas'][2]+parseInt(datosInforme['Defensor']['Tropas']['Hachas']['Perdidos'])*PrecioPorUnidad['Hachas'][2]+parseInt(datosInforme['Defensor']['Tropas']['Espias']['Perdidos'])*PrecioPorUnidad['Espia'][2]+parseInt(datosInforme['Defensor']['Tropas']['Ligeros']['Perdidos'])*PrecioPorUnidad['Ligero'][2]+parseInt(datosInforme['Defensor']['Tropas']['Pesados']['Perdidos'])*PrecioPorUnidad['Pesado'][2]+parseInt(datosInforme['Defensor']['Tropas']['Arietes']['Perdidos'])*PrecioPorUnidad['Ariete'][2]+parseInt(datosInforme['Defensor']['Tropas']['Catapultas']['Perdidos'])*PrecioPorUnidad['Catapulta'][2]+parseInt(datosInforme['Defensor']['Tropas']['Aristocratas']['Perdidos'])*PrecioPorUnidad['Aristocrata'][2];
		}
		else{
			PerdidasRecursosDefensor['Madera'] = 0;
			PerdidasRecursosDefensor['Barro'] = 0;
			PerdidasRecursosDefensor['Hierro'] = 0;
		}
		
		informeCompac +='P&eacute;rdidas de '+datosInforme['Atacante']['Nombre']+': [img]'+twLinks["imgMadera"]+'[/img]'+PerdidasRecursosAtacante['Madera']+'[img]'+twLinks["imgBarro"]+'[/img]'+PerdidasRecursosAtacante['Barro']+'[img]'+twLinks["imgHierro"]+'[/img]'+PerdidasRecursosAtacante['Hierro']+' (Total: [b]'+(parseInt(PerdidasRecursosAtacante['Madera'])+parseInt(PerdidasRecursosAtacante['Barro'])+parseInt(PerdidasRecursosAtacante['Hierro']))+'[/b] recursos).\n';
		if(flagDefensor == 0)
			informeCompac +='P&eacute;rdidas de '+datosInforme['Defensor']['Nombre']+': [img]'+twLinks["imgMadera"]+'[/img]'+ PerdidasRecursosDefensor['Madera']+'[img]'+twLinks["imgBarro"]+'[/img]'+ PerdidasRecursosDefensor['Barro']+'[img]'+twLinks["imgHierro"]+'[/img]'+ PerdidasRecursosDefensor['Hierro']+' (Total: [b]'+ (parseInt(PerdidasRecursosDefensor['Madera'])+parseInt(PerdidasRecursosDefensor['Barro'])+parseInt(PerdidasRecursosDefensor['Hierro']))+'[/b] recursos).\n';
		else
			informeCompac +='P&eacute;rdidas de '+datosInforme['Defensor']['Nombre']+': [img]'+twLinks["imgMadera"]+'[/img]????[img]'+twLinks["imgBarro"]+'[/img]????[img]'+twLinks["imgHierro"]+'[/img]???? (Total: [b]????[/b] recursos).\n';
		informeCompac +='P&eacute;rdidas Totales: [img]'+twLinks["imgMadera"]+'[/img] '+(parseInt(PerdidasRecursosAtacante['Madera'])+parseInt(PerdidasRecursosDefensor['Madera']))+' [img]'+twLinks["imgBarro"]+'[/img] '+ (parseInt(PerdidasRecursosAtacante['Barro'])+parseInt(PerdidasRecursosDefensor['Barro']))+' [img]'+twLinks["imgHierro"]+'[/img] '+(parseInt(PerdidasRecursosAtacante['Hierro'])+parseInt(PerdidasRecursosDefensor['Hierro']))+' (Total: [b]'+(parseInt(PerdidasRecursosAtacante['Madera'])+parseInt(PerdidasRecursosDefensor['Madera'])+parseInt(PerdidasRecursosAtacante['Barro'])+parseInt(PerdidasRecursosDefensor['Barro'])+parseInt(PerdidasRecursosAtacante['Hierro'])+parseInt(PerdidasRecursosDefensor['Hierro']))+'[/b] recursos).';
		
		// Botín
		if(datosInforme['Botin'] != '')
			informeCompac +='\n\nBot&iacute;n: [img]'+twLinks["imgMadera"]+'[/img]'+ datosInforme['Botin'][0]+' [img]'+twLinks["imgBarro"]+'[/img]'+ datosInforme['Botin'][1]+' [img]'+twLinks["imgHierro"]+'[/img] '+ datosInforme['Botin'][2]+'.\n\n';
		
		// Daños
		if(datosInforme['Danios']['Arietes'] != '')
			informeCompac += "\n[b]"+datosInforme['Danios']['Arietes'].replace("Baluarte dañado", "Muralla dañada")+"[/b]";
		if(datosInforme['Danios']['Catapultas'] != '')
			informeCompac += "\n[b]"+datosInforme['Danios']['Catapultas']+"[/b]";
		
		informeCompac +='\n\n[b]Compactado con Tribal e[color=sienna]X[/color]tension [/b]';
		return informeCompac;
};
	
// Método: twVistaPreliminar
// Atributos: $informeCOmpac
// Explicación: Genera una vista prévia dado un informe compactado con twCompactador.
function twVistaPreliminar(informeCompac)
{
	// Vista Preliminar del informe
	var informePreview = informeCompac;
	var ForumTags = new Array('[b]', '[/b]', '[i]', '[/i]', '[u]', '[/u]', '\n', '[color=darkred]', '[color=sienna]','[color=purple]','[color=navy]', '[color=green]', '[color=red]', '[color=blue]', '[/color]', '[size=13]', '[size=15]', '[/size]','[img]http://en1.ds.ignames.net/graphic/unit/unit_spear.png[/img]', '[img]http://en1.ds.ignames.net/graphic/unit/unit_sword.png[/img]', '[img]http://en1.ds.ignames.net/graphic/unit/unit_axe.png[/img]', '[img]http://en1.ds.ignames.net/graphic/unit/unit_spy.png[/img]', '[img]http://en1.ds.ignames.net/graphic/unit/unit_light.png[/img]', '[img]http://en1.ds.ignames.net/graphic/unit/unit_heavy.png[/img]', '[img]http://en1.ds.ignames.net/graphic/unit/unit_ram.png[/img]', '[img]http://en1.ds.ignames.net/graphic/unit/unit_catapult.png[/img] ', '[img]http://en1.ds.ignames.net/graphic/unit/unit_snob.png[/img]','[img]http://en1.ds.ignames.net/graphic/holz.png[/img]', '[img]http://en1.ds.ignames.net/graphic/lehm.png[/img]', '[img]http://en1.ds.ignames.net/graphic/eisen.png[/img]');
	var HtmlTags = new Array('<b>', '</b>', '<i>', '</i>','</u>', '</u>', '<br>', '<span style="color: darkred;">', '<span style="color: sienna;">','<span style="color: purple;">','<span style="color: navy;">','<span style="color: green;">', '<span style="color: red;">', '<span style="color: blue;">', '</span>', '<span style="font-size: 13px;">','<span style="font-size: 15px;">', '</span>','<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/unit/unit_spear.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/unit/unit_sword.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/unit/unit_axe.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/unit/unit_spy.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/unit/unit_light.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/unit/unit_heavy.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/unit/unit_ram.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/unit/unit_catapult.png"/>', '<img border="0" class="resizeImage" alt="" src="http://tribalwars.es/graphic/unit/unit_snob.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/holz.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/lehm.png"/>', '<img border="0" class="resizeImage" alt="" src="http://en1.ds.ignames.net/graphic/eisen.png"/>');
	
	for(var i=0;i<ForumTags.length;i++) {
		while(informePreview.indexOf(ForumTags[i], 0) != -1)
			informePreview = informePreview.replace(ForumTags[i], HtmlTags[i]);
	}
	return informePreview;
};

// Método: twCompactadorJS
// Explicación: Compactador de batallas. Sirve como disparador para compactar el informe que tenemos en pantalla.
function twCompactadorJS()
{
		var informeCompac = twCompactador();
		var informePreview = twVistaPreliminar(informeCompac);
		
		var previewHTML = '';
		previewHTML += '	<br /><hr /><br /><div><h3>Vista Pr&eacute;via</h3></div>';
		previewHTML += '		<table border="1">';
	  previewHTML += '			<tbody>';
		previewHTML += '				<tr>';
		previewHTML += '					<td valign="top" style="width:740px;height:auto;background-color: rgb(222, 211, 185); font-family: Verdana,Arial,Helvetica,sans-serif; text-align: left; font-size: 12px; line-height: 18px;">';
		previewHTML += 							informePreview;
		previewHTML += '				  </td>';
		previewHTML += '				</tr>';
		previewHTML += '			</tbody>';
		previewHTML += '		</table>';
		previewHTML += '	</div>';
		previewHTML += '</div>';
				
		var informeHTML = '';
		informeHTML += '	<div><h3>Informe</h3></div>';
		informeHTML += '	<fieldset>';
		informeHTML += '	<legend>Opciones</legend>';
		informeHTML += '			<input type="checkbox" id="coords" checked >Mostrar/Ocultar Coordenadas<br>';
		informeHTML += '			<input type="checkbox" id="nombreAtc" checked >Mostrar/Ocultar Nombre Atacante<br>';
		informeHTML += '			<input type="checkbox" id="nombreDef" checked >Mostrar/Ocultar Nombre Defensor<br>';
		informeHTML += '			<input type="checkbox" id="tropasAtc" checked >Mostrar/Ocultar Tropas Atacante<br>';
		informeHTML += '			<input type="checkbox" id="tropasDef" checked >Mostrar/Ocultar Tropas Defensor<br><br>';
		informeHTML += '			<input type="button" id="aplicaCambios" value="Aplicar Cambios" disabled ><br>';
		informeHTML += '	</fieldset>';
		informeHTML += '		<textarea id="informe"  name="inf" cols=90 rows=15>'+informeCompac +'</textarea>';
		informeHTML += '	</div>';
		informeHTML += '	<div><center><a id="sel" href="#inf" onclick="javascript:document.getElementById(\'informe\').select();">Seleccionar todo</a></center></div>';

		var newHTML = '';
		newHTML += '<div id="TwCompactadorJS">';
		newHTML += '	<div>';
		
		var elem = document.evaluate('/html/body/table/tbody/tr/td/table/tbody/tr/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		elem.singleNodeValue.textContent = '';
		elem.singleNodeValue.innerHTML = newHTML + informeHTML + previewHTML ;
		
		$('aplicaCambios').addEvent('click', function() {
			twCompactadorJSOptions["coords"] = $('coords').checked;
			twCompactadorJSOptions["nombreAtc"] = $('nombreAtc').value;
			twCompactadorJSOptions["nombreDef"] = $('nombreDef').value;
			twCompactadorJSOptions["tropasAtc"] = $('tropasAtc').value;
			twCompactadorJSOptions["tropasDef"] = $('tropasDef').value;
			twCompactadorJS();
			$('coords').value = twCompactadorJSOptions["coords"] ;
			$('nombreAtc').value = twCompactadorJSOptions["nombreAtc"];
			$('nombreDef').value = twCompactadorJSOptions["nombreDef"];
			$('tropasAtc').value = twCompactadorJSOptions["tropasAtc"];
			$('tropasDef').value = twCompactadorJSOptions["tropasDef"];
			alert("ok");
		});

};

// Método: twBuscadorPueblos
// Explicación: Permite buscar pueblos basandose en unas condiciones impuestas por el usuario.
function twBUscadorPueblos(){}	

// Método: twMenuUtilidades
// Explicacion: Menú con las utilidades creadas para tribalwars
function twMenuUtilidades()
{
	var divUtilidades = "";

	// Menú Utilidades
	divUtilidades += '<div class="menu" style="position:absolute;top:182px;margin-left:220px;z-index:124;">';
	divUtilidades +=		'	<ul style="">';
	divUtilidades +=				'<li style="width:63px"><a href="'+twLinks["TwTools"]+'" target="_blank">TW Tools</a></li>';
	divUtilidades +=				'<li style="width:115px;border-left:1px dotted;"><a href="#">Compressers</a>';
	divUtilidades +=					'<ul>';
	divUtilidades +=					'	<li style="width:115px;border-top: 1px solid #804000;" ><a href="'+twLinks["CompactadorHumor"]+'" target="_blank" >TWComp v2.0 by HuMoR</a></li>';	
	divUtilidades +=					'	<li style="width:115px;" ><a href="'+twLinks["CompactadorJuankar"]+'" target="_blank" >TribalPacker 0.9b by Juankar</a></li>';	
	divUtilidades +=					'	<li  style="width:115px;" ><a href="'+twLinks["CompactadorMerlin"]+'" target="_blank" >Merlin by Prosur</a></li>';	
	divUtilidades +=					'</ul>';
	divUtilidades +=				'</li>';
	divUtilidades +=				'<li  style="width:140px;border-left: 1px dotted;" ><a href="#">Town Lookups</a>';
	divUtilidades +=					'<ul>';
	divUtilidades +=						'<li style="width:140px;border-top: 1px solid #804000;" ><a href="'+twLinks["BuscadorPueblos1"]+'" target="_blank">Finder by Kodomo</a></li>';	
	divUtilidades +=						'<li style="width:140px;" ><a href="'+twLinks["BUscadorPueblos2"]+'" target="_blank">Finder by guscreations</a></li>';
	divUtilidades +=					'</ul>';
	divUtilidades +=				'</li>';
	divUtilidades +=				'<li  style="width:118px;border-left:1px dotted;" ><a href="#">Simulators</a>';
	divUtilidades +=					'<ul>';
	divUtilidades +=						'<li style="width:118px;border-top: 1px solid #804000;"><a href="'+twLinks["CalcBotinTropas"]+'" target="_blank">Troops</a></li>';
	divUtilidades +=						'<li style="width:118px;"><a href="'+twLinks["CalcTropasBotin"]+'" target="_blank">Resources</a></li>';
	divUtilidades +=						'<li style="width:118px;"><a href="'+twLinks["CalcGranja"]+'" target="_blank">Farm</a></li>';	
	divUtilidades +=						'<li style="width:118px;"><a href="'+twLinks["CalcPerdidas"]+'" target="_blank">Looses</a></li>';
	divUtilidades +=						'<li style="width:118px;"><a href="'+twLinks["CalcTiempo"]+'" target="_blank">Timing</a></li>';
	divUtilidades +=						'<li style="width:118px;"><a href="'+twLinks["DsPlusTropas"]+'" target="_blank">DS Plus Troops</a></li>';	
	divUtilidades +=						'<li style="width:118px;"><a href="'+twLinks["DsPlusEdificios"]+'" target="_blank">DS Plus Buildings</a></li>';	
	divUtilidades +=				'</ul>';
	divUtilidades +=			'</li>';
	divUtilidades +=		'</ul>';
	divUtilidades +=	'</div>';

		$('BarraNav').innerHTML += divUtilidades;
}

// Método: twInfoPueblo
// Explicacion: Muestra información del pueblo.
function twInfoPueblo()
{
	var divInfoPueblo = "";

	// Menú Utilidades
	divInfoPueblo += '<div class="menu" style="position:absolute;top:187px;margin-left:47px;height:15px;z-index:124;">';
	divInfoPueblo += 	'<span><a href="'+twLinks["VerPueblo"]+'">Village Overview</a> - <a href="'+twLinks["Mapa"]+'">Map</a></span>';
	divInfoPueblo += '</div>';

	$('BarraNav').innerHTML += divInfoPueblo;
}

// Método: twBarraNavegacion
// Explicacion: Barra de Navegación, permite movernos rápidamente por todas las pantallas de tribalwars.
function twBarraMenu()
{
	var codeNavBar = '';
	var PosYPuntos ='';
	var str="";
	str = document.evaluate('/html/body/table/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
	PosYPuntos = str.substring(str.indexOf("(", 0)+1, str.indexOf(")",0));
	PosYPuntos = PosYPuntos.replace('<span class="grey">.</span>', '.');

	// Barra de Menú Principal
	codeNavBar += '<center>';
	codeNavBar += '<div class="menu" style="width:875px; position:relative;z-index:125;">';
	codeNavBar += '<img src="'+twDatosGlobales["imgMenu"]+'" />';
	codeNavBar += 	'<ul style="margin-top:-36px;margin-left:35px;">';
	codeNavBar += 		'<li style="width:70px;"><a  href="'+twLinks["Salir"]+'"><span style="top:60px;"><img src="'+twDatosGlobales["imgLogout"]+'" />&nbsp;Logout</span></a></li>';
	codeNavBar += 		'<li style="width:65px;border-left: 1px dotted;"><a href="'+twLinks["Foro"]+'" target="_blank" ><img src="'+twDatosGlobales["imgForo"]+'" />&nbsp;Forum</a></li>';
	codeNavBar += 		'<li style="width:65px;border-left: 1px dotted;"><a href="'+twLinks["Chat"]+'" target="_blank" ><img src="'+twDatosGlobales["imgChat"]+'" />&nbsp;Chat</a></li>';
	codeNavBar += 		'<li style="width:67px;border-left: 1px dotted;"><a href="'+twLinks["Ayuda"]+'" target="_blank" ><img src="'+twDatosGlobales["imgAyuda"]+'" />&nbsp;Help</a></li>';
	codeNavBar += 		'<li style="width:100px;border-left: 1px dotted;"><a href="'+twLinks["Opciones"]+'"><img src="'+twDatosGlobales["imgOpciones"]+'" />&nbsp;Settings</a>';
	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li style="width:100px;;border-top: 1px solid #804000"><a href="'+twLinks["OpcionesEmail"]+'">Profile</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesOpciones"]+'">Settings</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesEmpezar"]+'">Start Over</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesCompartir"]+'">Share Internet conection</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesVacaciones"]+'">Accont Sitting</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesAccesos"]+'">Logins</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesPassword"]+'">Change Password</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesEncuestas"]+'">Surveys</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesEliminar"]+'">Recruit Player</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesSoporte"]+'">Service request</a></li>';
	codeNavBar +=					'<li style="width:100px;"><a href="'+twLinks["OpcionesNotas"]+'">Notebook</a></li>';
	codeNavBar +=				'</ul>';
	codeNavBar +=			'<li>';
	//codeNavBar += 		'<li style="width:85px;border-left: 1px dotted;"><a href="'+twLinks["Premium"]+'"><img src="'+twDatosGlobales["imgPremium"]+'" />&nbsp;Premium</a></li>';
	codeNavBar += 		'<li style="width:145px;border-left: 1px dotted;padding:0;margin:0"><a style="padding:0;margin:0;" href="'+twLinks["Ranking"]+'" ><img src="'+twDatosGlobales["imgRanking"]+'" />&nbsp;<span style="font-size:12px;padding:0;">Ranking</span><br><span style="font-size:x-small;padding:0;">('+PosYPuntos+')</span></a>';
	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li style="width:145px;border-top: 1px solid #804000"><a href="'+twLinks["RankingPorJugador"]+'">Player</a></li>';
	codeNavBar +=					'<li style="width:145px;"><a href="'+twLinks["RankingPorTribu"]+'">Tribes</a></li>';
	codeNavBar +=					'<li style="width:145px;"><a href="'+twLinks["RankingAdvAtaque"]+'">Opponents Defeated</a></li>';
	codeNavBar +=				'</ul>';
	codeNavBar +=			'</li>';
	
	if(	str.indexOf("New post in private forum",0) != -1)
		codeNavBar += 		'<li style="width:105px;border-left: 1px dotted;"><a href="'+twLinks["Tribu"]+'"><img alt="" title="New post in private forum" src="http://en1.ds.ignames.net/graphic/ally_forum.png"/>&nbsp;Tribe</a>';
	else
		codeNavBar += 		'<li style="width:105px;border-left: 1px dotted;"><a href="'+twLinks["Tribu"]+'">&nbsp;Tribe</a>';

	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li style="width:105px;border-top: 1px solid #804000"><a href="'+twLinks["TribuHistorial"]+'">Overview</a></li>';
	codeNavBar +=					'<li style="width:105px;"><a href="'+twLinks["TribuMiembros"]+'">Members</a></li>';
	codeNavBar +=					'<li style="width:105px;"><a href="'+twLinks["TribuPerfil"]+'">Profile</a></li>';
	codeNavBar +=					'<li style="width:105px;"><a href="'+twLinks["TribuDiplomacia"]+'">Diplomacy</a></li>';
	
	if(	str.indexOf("New post in private forum",0) != -1)
		codeNavBar +=					'<li style="width:105px;""><a href="'+twLinks["TribuForo"]+'"><img alt="" title="New post in private forum" src="http://en1.ds.ignames.net/graphic/ally_forum.png"/>&nbsp;Forum</a></li>';
	else
		codeNavBar +=					'<li style="width:105px;""><a href="'+twLinks["TribuForo"]+'">Forum</a></li>';

	codeNavBar +=				'</ul>';
	codeNavBar +=			'</li>';
	
	if(	str.indexOf("new_report",0) != -1)
		codeNavBar += 		'<li style="width:85px;border-left: 1px dotted;"><a href="'+twLinks["Informes"]+'"><img src="'+twDatosGlobales["imgInformes"]+'" />&nbsp;Reports</a>';
	else
		codeNavBar += 		'<li style="width:85px;border-left: 1px dotted;"><a href="'+twLinks["Informes"]+'">&nbsp;Reports</a>';

	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li style="width:85px;border-top: 1px solid #804000"><a href="'+twLinks["InformesTodos"]+'">All</a></li>';
	codeNavBar +=					'<li style="width:85px;"><a href="'+twLinks["InformesAtaque"]+'">Attacks</a></li>';
	codeNavBar +=					'<li style="width:85px;"><a href="'+twLinks["InformesDefensa"]+'">Defense</a></li>';
	codeNavBar +=					'<li style="width:85px;"><a href="'+twLinks["InformesApoyo"]+'">Support</a></li>';
	codeNavBar +=					'<li style="width:85px;"><a href="'+twLinks["InformesComercio"]+'">Trade</a></li>';
	codeNavBar +=					'<li style="width:85px;"><a href="'+twLinks["InformesOtros"]+'">Misc.</a></li>';
	codeNavBar +=				'</ul>';
	codeNavBar +=			'</li>';

	if(	str.indexOf("New message",0) != -1)
		codeNavBar += 		'<li style="width:95px;border-left: 1px dotted;"><a href="'+twLinks["Mensajes"]+'"><img src="'+twDatosGlobales["imgMensajes"]+'" />&nbsp;New Mail</a>';
	else
		codeNavBar += 		'<li style="width:95px;border-left: 1px dotted;"><a href="'+twLinks["Mensajes"]+'">&nbsp;Mail</a>';

	codeNavBar +=				'<ul>';
	codeNavBar +=					'<li style="width:95px;border-top: 1px solid #804000"><a href="'+twLinks["MensajesNuevo"]+'">Compose</a></li>';
	codeNavBar +=					'<li style="width:95px;"><a href="'+twLinks["MensajesEntrada"]+'">Inbox</a></li>';
	codeNavBar +=					'<li style="width:95px;"><a href="'+twLinks["MensajesSalida"]+'">Send</a></li>';
	codeNavBar +=					'<li style="width:95px;"><a href="'+twLinks["MensajesArchivo"]+'">Archive</a></li>';
	codeNavBar +=					'<li style="width:95px;"><a href="'+twLinks["MensajesBloquear"]+'">Block Sender</a></li>';
	codeNavBar +=				'</ul>';
	codeNavBar +=			'</li>';
	codeNavBar += 	'</ul>';
	codeNavBar +=	'</div>';
	
	// Barra de Menú con accesos rápidos y datos de tropas y recursos
	codeNavBar +=	'<div id="BarraNav">';
	codeNavBar +=	'			<map name="FPMap0">';
	codeNavBar +=	'				<area title="Barracks" href="'+twLinks["Cuartel"]+'" shape="circle" coords="810,26,19" alt="Cuartel" > <!-- Cuartel -->';
	codeNavBar +=	'				<area title="Stable" href="'+twLinks["Cuadra"]+'" shape="circle" coords="827,64,19" alt="Cuadra"> <!-- Cuadra -->';
	codeNavBar +=	'				<area title="Workshop" href="'+twLinks["Taller"]+'" shape="circle" coords="816,105,18" alt="Taller" > <!-- Taller -->';
	codeNavBar +=	'				<area title="Academy" href="'+twLinks["Corte"]+'" shape="circle" coords="780,129,19" alt="Corte Aristocr&aacute;tica" > <!-- Corte -->';
	codeNavBar +=	'				<area title="Rally Point" href="'+twLinks["Plaza"]+'" shape="circle" coords="728,128,19" alt="Plaza de Reuniones" > <!-- Plaza -->';
	codeNavBar +=	'				<area title="Smithy" href="'+twLinks["Herreria"]+'" shape="circle" coords="692,105,19" alt="Herrer&iacute;a" > <!-- Herrería -->';
	codeNavBar +=	'				<area title="Market" href="'+twLinks["Mercado"]+'" shape="circle" coords="684,64,19" alt="Plaza del Mercado" > <!-- Mercado -->';
	codeNavBar +=	'				<area title="Village Headquartes" href="'+twLinks["Principal"]+'" shape="circle" coords="702, 25, 19" alt="Edificio Principal" > <!-- Ed. Principal -->';
	codeNavBar +=	'				<area title="Tribal eXtension Utilities" href="#" shape="poly" coords="768,29, 742,106, 746,108, 752,109, 761,109, 770,107, 778,103, 783,99, 789,93, 794,85, 797,79, 797,61, 795,54, 792,47, 789,43, 785,38, 781,35, 777,32" alt="Utilidades" > <!-- Ed. Principal -->';
	codeNavBar +=	'				<area title="Troops Report" href="#" shape="poly" coords="740,106, 745,93, 766,28, 758,27, 749,27, 740,30, 733,33, 727,38, 721,45, 717,55, 715,64, 715,70, 715,74, 718,85, 721,90, 723,94, 729,99, 734,103" alt="Tropas" > <!-- Ed. Principal -->';
	codeNavBar +=	'			</map>';				
	codeNavBar +=	'			<img style="z-index:50" "border="0" src="'+twDatosGlobales["imgInterfaz"]+'" usemap="#FPMap0" width="850" height="175" />';
	codeNavBar +=	'		</div>';
	codeNavBar +=	'</center>';
	
	return codeNavBar;

};

// Método: twCargarCambios_Informes
// Explicacion:
function twCargarCambios_Informes()
{
	var twLinkCompactador = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	twLinkCompactador.singleNodeValue.innerHTML += '<tr><td align="center" colspan=4><a id="twLinkCompactador" href="#" >Compactar</a></td></tr>';	
	twLinkCompactador = document.getElementById('twLinkCompactador');
	twLinkCompactador.addEventListener("click", twCompactadorJS, true);
}

// Función: twInfoPueblo
// Explicacion: 
function TwInfoPueblo()
{
	var info = new Array();
	// Info
	info["Nombre"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr/th',document,null,XPathResult.STRING_TYPE,null).stringValue; 
	info["Jugador"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[4]/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML; 
	//info[Jugador] = info[Jugador].singleNodeValue.innerHTML;
	info["Puntos"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[3]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue; 
	info["Tribu"] = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[5]/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null); 
	info["Tribu"] = info["Tribu"].singleNodeValue.innerHTML;
	
	var CoordDestino = document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[2]/td[2]',document,null,XPathResult.STRING_TYPE,null).stringValue; 
	var CoordOrigen = document.evaluate('/html/body/table[2]/tbody/tr/td/b',document,null,XPathResult.STRING_TYPE,null).stringValue; 
	CoordOrigen = CoordOrigen.replace('(',''); 
	CoordOrigen = CoordOrigen.replace(')','');
	CoordOrigen = CoordOrigen.substr(0,7);

	info["CoordOrigen"] = new Array();
	info["CoordOrigen"] = CoordOrigen.split('|');
	info["CoordDestino"] = new Array();
	info["CoordDestino"] = CoordDestino.split('|');
	
	// cálculo de distancias (tiempos)
	var tiempoUnidad = twCalculadoraTiempoTropas(info["CoordOrigen"], info["CoordDestino"]);
	
	var newInfo_village = '<h2>'+info["Nombre"]+'</h2>';
	newInfo_village += '<div style="width:700px;">';
	newInfo_village += '	<table class="vis" style="float:left; width:250px;">';
	newInfo_village += '		<tbody>';
	newInfo_village += '			<tr><th>'+ info["Nombre"] +'</th></tr>';
	newInfo_village += '			<tr><td>Coordinates:<b>'+ CoordDestino +'</b></td></tr>';
	newInfo_village += '			<tr><td>Points:<b>'+ info["Puntos"] +'</b</td></tr>';
	newInfo_village += '			<tr><td>Player:'+ info["Jugador"] +'</td></tr>';
	newInfo_village += '			<tr><td>Tribe:'+ info["Tribu"] +'</td></tr>';
	newInfo_village += '			<tr><th>Actions</th></tr>';
	newInfo_village += '			<tr><td><a 	href= "'+twLinks["Mapa"]+'&x='+info["CoordDestino"][0]+'&y='+info["CoordDestino"][1]+'" >&raquo; Center Map</a></td></tr>';
	newInfo_village += '			<tr><td>'+document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[7]/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML; +'</td></tr>';
	
	if(document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[8]/td/a',document,null,XPathResult.STRING_TYPE,null).stringValue != "")
		newInfo_village += '			<tr><td>'+document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[8]/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML; +'</td></tr>';
	
	if(document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[9]/td/a',document,null,XPathResult.STRING_TYPE,null).stringValue != "")
		newInfo_village += '			<tr><td>'+document.evaluate('/html/body/table[3]/tbody/tr/td/table/tbody/tr[9]/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML; +'</td></tr>';
	
	newInfo_village += '		</tbody>';
	newInfo_village += '	</table>';
	newInfo_village += '	<table class="vis" style="float:left;width:200px;">';
	newInfo_village += '		<tbody>';
	newInfo_village += '			<tr><th>Unidad</th><th>Tiempo</th></tr>';
	newInfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit=spear\', 520, 520)">Spear Fighter</a></td><td>'+tiempoUnidad[1]+'</td></tr>';
	newInfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit=sword\', 520, 520)">Swordsman</a></td><td>'+tiempoUnidad[2]+'</td></tr>';
	newInfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit=axe\', 520, 520)">Axeman</a></td><td>'+tiempoUnidad[3]+'</td></tr>'
	newInfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit=spy\', 520, 520)">Scouts</a></td><td>'+tiempoUnidad[4]+'</td></tr>';
	newInfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit=light\', 520, 520)">Light cavalry</a></td><td>'+tiempoUnidad[5]+'</td></tr>';
	newInfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit=heavy\', 520, 520)">Heavy Cavalry</a></td><td>'+tiempoUnidad[6]+'</td></tr>';
	newInfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit=ram\', 520, 520)">Rams</a></td><td>'+tiempoUnidad[7]+'</td></tr>';
	newInfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit=catapult\', 520, 520)">Catapults</a></td><td>'+tiempoUnidad[8]+'</td></tr>';
	newInfo_village += '			<tr><td><a href="javascript:popup(\'popup_unit.php?unit=snob\', 520, 520)">Nobleman</a></td><td>'+tiempoUnidad[9]+'</td></tr>';
	newInfo_village += '		</tbody>';
	newInfo_village += '	</table>';
	newInfo_village += '</div>'; 
	
	var NewElem = document.evaluate('/html/body/table[3]/tbody/tr/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
  NewElem.singleNodeValue.innerHTML = newInfo_village;

}

	// Inicialización del script
	twInit();
	twCargarCSS();
	
	// Barra de Navegación rápida	
	var newHTML = document.createElement("div");
	newHTML.innerHTML = '<br />'+ twBarraMenu() +'<br /><br />';
	document.body.insertBefore(newHTML, document.body.childNodes[4]);
	// Menú Utilidades
	twMenuUtilidades();
	// Info Pueblo
	twInfoPueblo();
	
	// Cargar Nuevas Interfaces
	// Interfaz: Overview
	if (getParam('screen') == 'overview' && getParam('screen') != "overview_villages") {}
	// Interfaz: Informes
	if(getParam('screen') == 'report' && getParam('view') != ""){twCargarCambios_Informes();}
	// Interfaz: Cuartel
	if (getParam('screen') == 'barracks') {}
	// Interfaz: Información de un pueblo
	if(getParam('screen') == 'info_village'){TwInfoPueblo();}
	
	// Eliminación del Menu Principal
	document.body.childNodes[1].parentNode.removeChild(document.body.childNodes[1]);
	document.body.childNodes[2].parentNode.removeChild(document.body.childNodes[2]);
	document.body.childNodes[4].parentNode.removeChild(document.body.childNodes[4]);
	
	// Carga de pueblos, tropas, recursos y granja
	twObtenerpID();
