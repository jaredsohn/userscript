// Die Stämme Erweiterung
// version 1.3
// Letzte Aktualisierung am 19.11.2007
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Die Staemme Features", and click Uninstall.
// --------------------------------------------------------------------
// ==UserScript==
// @name           Die Staemme Features
// @namespace      http://userscripts.org/scripts/show/10650
// @description    Fuegt eine neue Benutzerleiste, dynamisches Menü und weitere Features hinzu
// @include        http://de*.die-staemme.de/*
// @include        http://de*.ds.ignames.net/*
// @version        1.3
// ==/UserScript==

var my_menu_css = '.my_menu ul {padding: 0; margin: 0; list-style: none; background-color: #F1EBDD; }'+
					'.my_menu li {float: left; position: relative; display: block; padding-right: 10px; background-color: #F1EBDD; height: 17px; }'+
					'.my_menu li:hover {background-color: #C7B999; }'+
					'.my_menu li ul {display: none; position: absolute; left: 0; top: 17px; z-index: 10}'+
					'.my_menu li:hover ul { display: block; width: 150px;}'+
					'.my_menu li:hover ul li {display: block; height: 17px; width: 100%; }'+
					'.my_menu li ul li {border-width: 1px; border-style: solid; border-color: #804000;}'+
					'.my_menu a { color: #804000; font-weight: bold; height: 17px; display: block; width: 100%; }'+
					'.my_menu img {	border: 0; }'+
					'.del_link {color: #FF0000; font-weight: bold}'+
					'.spy_link {display: none}'+
					'.front_div {position: absolute; top: 100px; left: 200px; z-index: 200}'+
					'.fav_add_link {color: #FF0000 !important; font-weight: bold}' +
					'.fav_add_link_ready {color: green !important}'+
					'.kommentar {font-size: 10px; color: #804000;}';
					
GM_addStyle(my_menu_css);
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('q(1v 1F.6=="S"){1F.S=1F.S;B 6=u(a,c){q(1F==7)v 1p 6(a,c);a=a||1h;q(6.1r(a))v 1p 6(1h)[6.E.39?"39":"36"](a);q(1v a=="21"){B m=/^[^<]*(<(.|\\s)+>)[^>]*$/.2D(a);q(m)a=6.3C([m[1]]);K v 1p 6(c).2i(a)}v 7.5g(a.1l==2L&&a||(a.3h||a.I&&a!=1F&&!a.20&&a[0]!=S&&a[0].20)&&6.40(a)||[a])};q(1v $!="S")6.38$=$;B $=6;6.E=6.8e={3h:"1.1.2",89:u(){v 7.I},I:0,29:u(1R){v 1R==S?6.40(7):7[1R]},2l:u(a){B L=6(a);L.5J=7;v L},5g:u(a){7.I=0;[].1g.11(7,a);v 7},J:u(E,1x){v 6.J(7,E,1x)},2f:u(1a){B 4k=-1;7.J(u(i){q(7==1a)4k=i});v 4k},1D:u(22,P,C){B 1a=22;q(22.1l==3j)q(P==S)v 7.I&&6[C||"1D"](7[0],22)||S;K{1a={};1a[22]=P}v 7.J(u(2f){Q(B G 1z 1a)6.1D(C?7.1u:7,G,6.G(7,1a[G],C,2f,G))})},1n:u(22,P){v 7.1D(22,P,"2V")},2H:u(e){q(1v e=="21")v 7.44().41(1h.8q(e));B t="";6.J(e||7,u(){6.J(7.2J,u(){q(7.20!=8)t+=7.20!=1?7.67:6.E.2H([7])})});v t},2I:u(){B a=6.3C(1A);v 7.J(u(){B b=a[0].3R(V);7.Y.2O(b,7);1Y(b.18)b=b.18;b.4H(7)})},41:u(){v 7.2Y(1A,V,1,u(a){7.4H(a)})},5R:u(){v 7.2Y(1A,V,-1,u(a){7.2O(a,7.18)})},5Q:u(){v 7.2Y(1A,14,1,u(a){7.Y.2O(a,7)})},5L:u(){v 7.2Y(1A,14,-1,u(a){7.Y.2O(a,7.2d)})},4z:u(){v 7.5J||6([])},2i:u(t){v 7.2l(6.2T(7,u(a){v 6.2i(t,a)}),t)},4w:u(4v){v 7.2l(6.2T(7,u(a){B a=a.3R(4v!=S?4v:V);a.$1I=17;v a}))},1y:u(t){v 7.2l(6.1r(t)&&6.2o(7,u(2w,2f){v t.11(2w,[2f])})||6.3v(t,7))},2b:u(t){v 7.2l(t.1l==3j&&6.3v(t,7,V)||6.2o(7,u(a){v(t.1l==2L||t.3h)?6.3i(a,t)<0:a!=t}))},1M:u(t){v 7.2l(6.2h(7.29(),t.1l==3j?6(t).29():t.I!=S&&(!t.1c||t.1c=="7m")?t:[t]))},4f:u(1q){v 1q?6.1y(1q,7).r.I>0:14},19:u(19){v 19==S?(7.I?7[0].P:17):7.1D("P",19)},4d:u(19){v 19==S?(7.I?7[0].2C:17):7.44().41(19)},2Y:u(1x,1O,3p,E){B 4w=7.I>1;B a=6.3C(1x);q(3p<0)a.6X();v 7.J(u(){B 1a=7;q(1O&&6.1c(7,"1O")&&6.1c(a[0],"3u"))1a=7.5e("1V")[0]||7.4H(1h.5d("1V"));6.J(a,u(){E.11(1a,[4w?7.3R(V):7])})})}};6.1w=6.E.1w=u(){B 1U=1A[0],a=1;q(1A.I==1){1U=7;a=0}B G;1Y(G=1A[a++])Q(B i 1z G)1U[i]=G[i];v 1U};6.1w({6G:u(){q(6.38$)$=6.38$;v 6},1r:u(E){v!!E&&1v E!="21"&&!E.1c&&1v E[0]=="S"&&/u/i.1m(E+"")},48:u(D){v D.52&&D.50&&!D.50.4Z},1c:u(D,W){v D.1c&&D.1c.3d()==W.3d()},J:u(1a,E,1x){q(1a.I==S)Q(B i 1z 1a)E.11(1a[i],1x||[i,1a[i]]);K Q(B i=0,6p=1a.I;i<6p;i++)q(E.11(1a[i],1x||[i,1a[i]])===14)3Y;v 1a},G:u(D,P,C,2f,G){q(6.1r(P))P=P.43(D,[2f]);B 6i=/z-?2f|8s-?8p|1b|6c|8j-?25/i;v P&&P.1l==3X&&C=="2V"&&!6i.1m(G)?P+"4R":P},16:{1M:u(D,c){6.J(c.3W(/\\s+/),u(i,O){q(!6.16.35(D.16,O))D.16+=(D.16?" ":"")+O})},2e:u(D,c){D.16=c?6.2o(D.16.3W(/\\s+/),u(O){v!6.16.35(c,O)}).64(" "):""},35:u(t,c){t=t.16||t;c=c.1T(/([\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:])/g,"\\\\$1");v t&&1p 4O("(^|\\\\s)"+c+"(\\\\s|$)").1m(t)}},4N:u(e,o,f){Q(B i 1z o){e.1u["1K"+i]=e.1u[i];e.1u[i]=o[i]}f.11(e,[]);Q(B i 1z o)e.1u[i]=e.1u["1K"+i]},1n:u(e,p){q(p=="25"||p=="3P"){B 1K={},3O,3M,d=["88","87","86","83"];6.J(d,u(){1K["82"+7]=0;1K["80"+7+"7Z"]=0});6.4N(e,1K,u(){q(6.1n(e,"1e")!="1X"){3O=e.7Y;3M=e.7X}K{e=6(e.3R(V)).2i(":4C").5N("2S").4z().1n({4A:"1G",3G:"7V",1e:"2E",7S:"0",7R:"0"}).5C(e.Y)[0];B 2X=6.1n(e.Y,"3G");q(2X==""||2X=="4u")e.Y.1u.3G="7O";3O=e.7L;3M=e.7K;q(2X==""||2X=="4u")e.Y.1u.3G="4u";e.Y.3B(e)}});v p=="25"?3O:3M}v 6.2V(e,p)},2V:u(D,G,5z){B L;q(G=="1b"&&6.12.1k)v 6.1D(D.1u,"1b");q(G=="4r"||G=="2A")G=6.12.1k?"3y":"2A";q(!5z&&D.1u[G])L=D.1u[G];K q(1h.3x&&1h.3x.4q){q(G=="2A"||G=="3y")G="4r";G=G.1T(/([A-Z])/g,"-$1").4o();B O=1h.3x.4q(D,17);q(O)L=O.5x(G);K q(G=="1e")L="1X";K 6.4N(D,{1e:"2E"},u(){B c=1h.3x.4q(7,"");L=c&&c.5x(G)||""})}K q(D.4m){B 5t=G.1T(/\\-(\\w)/g,u(m,c){v c.3d()});L=D.4m[G]||D.4m[5t]}v L},3C:u(a){B r=[];6.J(a,u(i,1s){q(!1s)v;q(1s.1l==3X)1s=1s.7r();q(1v 1s=="21"){B s=6.2N(1s),1N=1h.5d("1N"),28=[];B 2I=!s.15("<1t")&&[1,"<3q>","</3q>"]||(!s.15("<7h")||!s.15("<1V")||!s.15("<7g"))&&[1,"<1O>","</1O>"]||!s.15("<3u")&&[2,"<1O><1V>","</1V></1O>"]||(!s.15("<7c")||!s.15("<7a"))&&[3,"<1O><1V><3u>","</3u></1V></1O>"]||[0,"",""];1N.2C=2I[1]+s+2I[2];1Y(2I[0]--)1N=1N.18;q(6.12.1k){q(!s.15("<1O")&&s.15("<1V")<0)28=1N.18&&1N.18.2J;K q(2I[1]=="<1O>"&&s.15("<1V")<0)28=1N.2J;Q(B n=28.I-1;n>=0;--n)q(6.1c(28[n],"1V")&&!28[n].2J.I)28[n].Y.3B(28[n])}1s=[];Q(B i=0,l=1N.2J.I;i<l;i++)1s.1g(1N.2J[i])}q(1s.I===0&&!6.1c(1s,"3k"))v;q(1s[0]==S||6.1c(1s,"3k"))r.1g(1s);K r=6.2h(r,1s)});v r},1D:u(D,W,P){B 2j=6.48(D)?{}:{"Q":"73","72":"16","4r":6.12.1k?"3y":"2A",2A:6.12.1k?"3y":"2A",2C:"2C",16:"16",P:"P",2P:"2P",2S:"2S",70:"6Y",2Q:"2Q"};q(W=="1b"&&6.12.1k&&P!=S){D.6c=1;v D.1y=D.1y.1T(/49\\([^\\)]*\\)/6T,"")+(P==1?"":"49(1b="+P*5r+")")}K q(W=="1b"&&6.12.1k)v D.1y?4g(D.1y.6P(/49\\(1b=(.*)\\)/)[1])/5r:1;q(W=="1b"&&6.12.3r&&P==1)P=0.6M;q(2j[W]){q(P!=S)D[2j[W]]=P;v D[2j[W]]}K q(P==S&&6.12.1k&&6.1c(D,"3k")&&(W=="6L"||W=="6J"))v D.6I(W).67;K q(D.52){q(P!=S)D.6H(W,P);q(6.12.1k&&/5a|3z/.1m(W)&&!6.48(D))v D.31(W,2);v D.31(W)}K{W=W.1T(/-([a-z])/6E,u(z,b){v b.3d()});q(P!=S)D[W]=P;v D[W]}},2N:u(t){v t.1T(/^\\s+|\\s+$/g,"")},40:u(a){B r=[];q(a.1l!=2L)Q(B i=0,2x=a.I;i<2x;i++)r.1g(a[i]);K r=a.3D(0);v r},3i:u(b,a){Q(B i=0,2x=a.I;i<2x;i++)q(a[i]==b)v i;v-1},2h:u(2y,3E){B r=[].3D.43(2y,0);Q(B i=0,54=3E.I;i<54;i++)q(6.3i(3E[i],r)==-1)2y.1g(3E[i]);v 2y},2o:u(1P,E,47){q(1v E=="21")E=1p 4J("a","i","v "+E);B 1f=[];Q(B i=0,2w=1P.I;i<2w;i++)q(!47&&E(1P[i],i)||47&&!E(1P[i],i))1f.1g(1P[i]);v 1f},2T:u(1P,E){q(1v E=="21")E=1p 4J("a","v "+E);B 1f=[],r=[];Q(B i=0,2w=1P.I;i<2w;i++){B 19=E(1P[i],i);q(19!==17&&19!=S){q(19.1l!=2L)19=[19];1f=1f.6y(19)}}B r=1f.I?[1f[0]]:[];5S:Q(B i=1,5V=1f.I;i<5V;i++){Q(B j=0;j<i;j++)q(1f[i]==r[j])4Y 5S;r.1g(1f[i])}v r}});1p u(){B b=6t.6s.4o();6.12={3c:/6o/.1m(b),45:/45/.1m(b),1k:/1k/.1m(b)&&!/45/.1m(b),3r:/3r/.1m(b)&&!/(8y|6o)/.1m(b)};6.8x=!6.12.1k||1h.8w=="8v"};6.J({6h:"a.Y",4V:"6.4V(a)",8t:"6.27(a,2,\'2d\')",8r:"6.27(a,2,\'6m\')",8n:"6.2K(a.Y.18,a)",8m:"6.2K(a.18)"},u(i,n){6.E[i]=u(a){B L=6.2T(7,n);q(a&&1v a=="21")L=6.3v(a,L);v 7.2l(L)}});6.J({5C:"41",8l:"5R",2O:"5Q",8k:"5L"},u(i,n){6.E[i]=u(){B a=1A;v 7.J(u(){Q(B j=0,2x=a.I;j<2x;j++)6(a[j])[n](7)})}});6.J({5N:u(22){6.1D(7,22,"");7.8i(22)},8h:u(c){6.16.1M(7,c)},8g:u(c){6.16.2e(7,c)},8f:u(c){6.16[6.16.35(7,c)?"2e":"1M"](7,c)},2e:u(a){q(!a||6.1y(a,[7]).r.I)7.Y.3B(7)},44:u(){1Y(7.18)7.3B(7.18)}},u(i,n){6.E[i]=u(){v 7.J(n,1A)}});6.J(["6b","6a","69","68"],u(i,n){6.E[n]=u(1R,E){v 7.1y(":"+n+"("+1R+")",E)}});6.J(["25","3P"],u(i,n){6.E[n]=u(h){v h==S?(7.I?6.1n(7[0],n):17):7.1n(n,h.1l==3j?h:h+"4R")}});6.1w({1q:{"":"m[2]==\'*\'||6.1c(a,m[2])","#":"a.31(\'2Z\')==m[2]",":":{6a:"i<m[3]-0",69:"i>m[3]-0",27:"m[3]-0==i",6b:"m[3]-0==i",2y:"i==0",37:"i==r.I-1",66:"i%2==0",65:"i%2","27-3V":"6.27(a.Y.18,m[3],\'2d\',a)==a","2y-3V":"6.27(a.Y.18,1,\'2d\')==a","37-3V":"6.27(a.Y.8d,1,\'6m\')==a","8c-3V":"6.2K(a.Y.18).I==1",6h:"a.18",44:"!a.18",68:"6.E.2H.11([a]).15(m[3])>=0",34:\'a.C!="1G"&&6.1n(a,"1e")!="1X"&&6.1n(a,"4A")!="1G"\',1G:\'a.C=="1G"||6.1n(a,"1e")=="1X"||6.1n(a,"4A")=="1G"\',8b:"!a.2P",2P:"a.2P",2S:"a.2S",2Q:"a.2Q||6.1D(a,\'2Q\')",2H:"a.C==\'2H\'",4C:"a.C==\'4C\'",63:"a.C==\'63\'",4Q:"a.C==\'4Q\'",62:"a.C==\'62\'",4P:"a.C==\'4P\'",61:"a.C==\'61\'",60:"a.C==\'60\'",3S:\'a.C=="3S"||6.1c(a,"3S")\',5Z:"/5Z|3q|8a|3S/i.1m(a.1c)"},".":"6.16.35(a,m[2])","@":{"=":"z==m[4]","!=":"z!=m[4]","^=":"z&&!z.15(m[4])","$=":"z&&z.2M(z.I - m[4].I,m[4].I)==m[4]","*=":"z&&z.15(m[4])>=0","":"z",4M:u(m){v["",m[1],m[3],m[2],m[5]]},5Y:"z=a[m[3]];q(!z||/5a|3z/.1m(m[3]))z=6.1D(a,m[3]);"},"[":"6.2i(m[2],a).I"},5X:[/^\\[ *(@)([a-2g-3Q-]*) *([!*$^=]*) *(\'?"?)(.*?)\\4 *\\]/i,/^(\\[)\\s*(.*?(\\[.*?\\])?[^[]*?)\\s*\\]/,/^(:)([a-2g-3Q-]*)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/i,/^([:.#]*)([a-2g-3Q*-]*)/i],1S:[/^(\\/?\\.\\.)/,"a.Y",/^(>|\\/)/,"6.2K(a.18)",/^(\\+)/,"6.27(a,2,\'2d\')",/^(~)/,u(a){B s=6.2K(a.Y.18);v s.3D(6.3i(a,s)+1)}],3v:u(1q,1P,2b){B 1K,O=[];1Y(1q&&1q!=1K){1K=1q;B f=6.1y(1q,1P,2b);1q=f.t.1T(/^\\s*,\\s*/,"");O=2b?1P=f.r:6.2h(O,f.r)}v O},2i:u(t,1C){q(1v t!="21")v[t];q(1C&&!1C.20)1C=17;1C=1C||1h;q(!t.15("//")){1C=1C.4L;t=t.2M(2,t.I)}K q(!t.15("/")){1C=1C.4L;t=t.2M(1,t.I);q(t.15("/")>=1)t=t.2M(t.15("/"),t.I)}B L=[1C],2a=[],37=17;1Y(t&&37!=t){B r=[];37=t;t=6.2N(t).1T(/^\\/\\//i,"");B 3N=14;B 1H=/^[\\/>]\\s*([a-2g-9*-]+)/i;B m=1H.2D(t);q(m){6.J(L,u(){Q(B c=7.18;c;c=c.2d)q(c.20==1&&(6.1c(c,m[1])||m[1]=="*"))r.1g(c)});L=r;t=t.1T(1H,"");q(t.15(" ")==0)4Y;3N=V}K{Q(B i=0;i<6.1S.I;i+=2){B 1H=6.1S[i];B m=1H.2D(t);q(m){r=L=6.2T(L,6.1r(6.1S[i+1])?6.1S[i+1]:u(a){v 3L(6.1S[i+1])});t=6.2N(t.1T(1H,""));3N=V;3Y}}}q(t&&!3N){q(!t.15(",")){q(L[0]==1C)L.4K();6.2h(2a,L);r=L=[1C];t=" "+t.2M(1,t.I)}K{B 32=/^([a-2g-3Q-]+)(#)([a-2g-9\\\\*38-]*)/i;B m=32.2D(t);q(m){m=[0,m[2],m[3],m[1]]}K{32=/^([#.]?)([a-2g-9\\\\*38-]*)/i;m=32.2D(t)}q(m[1]=="#"&&L[L.I-1].5W){B 2m=L[L.I-1].5W(m[2]);q(6.12.1k&&2m&&2m.2Z!=m[2])2m=6(\'[@2Z="\'+m[2]+\'"]\',L[L.I-1])[0];L=r=2m&&(!m[3]||6.1c(2m,m[3]))?[2m]:[]}K{q(m[1]==".")B 4I=1p 4O("(^|\\\\s)"+m[2]+"(\\\\s|$)");6.J(L,u(){B 3K=m[1]!=""||m[0]==""?"*":m[2];q(6.1c(7,"84")&&3K=="*")3K="30";6.2h(r,m[1]!=""&&L.I!=1?6.4G(7,[],m[1],m[2],4I):7.5e(3K))});q(m[1]=="."&&L.I==1)r=6.2o(r,u(e){v 4I.1m(e.16)});q(m[1]=="#"&&L.I==1){B 5U=r;r=[];6.J(5U,u(){q(7.31("2Z")==m[2]){r=[7];v 14}})}L=r}t=t.1T(32,"")}}q(t){B 19=6.1y(t,r);L=r=19.r;t=6.2N(19.t)}}q(L&&L[0]==1C)L.4K();6.2h(2a,L);v 2a},1y:u(t,r,2b){1Y(t&&/^[a-z[({<*:.#]/i.1m(t)){B p=6.5X,m;6.J(p,u(i,1H){m=1H.2D(t);q(m){t=t.81(m[0].I);q(6.1q[m[1]].4M)m=6.1q[m[1]].4M(m);v 14}});q(m[1]==":"&&m[2]=="2b")r=6.1y(m[3],r,V).r;K q(m[1]=="."){B 1H=1p 4O("(^|\\\\s)"+m[2]+"(\\\\s|$)");r=6.2o(r,u(e){v 1H.1m(e.16||"")},2b)}K{B f=6.1q[m[1]];q(1v f!="21")f=6.1q[m[1]][m[2]];3L("f = u(a,i){"+(6.1q[m[1]].5Y||"")+"v "+f+"}");r=6.2o(r,f,2b)}}v{r:r,t:t}},4G:u(o,r,1S,W,1H){Q(B s=o.18;s;s=s.2d)q(s.20==1){B 1M=V;q(1S==".")1M=s.16&&1H.1m(s.16);K q(1S=="#")1M=s.31("2Z")==W;q(1M)r.1g(s);q(1S=="#"&&r.I)3Y;q(s.18)6.4G(s,r,1S,W,1H)}v r},4V:u(D){B 4F=[];B O=D.Y;1Y(O&&O!=1h){4F.1g(O);O=O.Y}v 4F},27:u(O,1f,3p,D){1f=1f||1;B 1R=0;Q(;O;O=O[3p]){q(O.20==1)1R++;q(1R==1f||1f=="66"&&1R%2==0&&1R>1&&O==D||1f=="65"&&1R%2==1&&O==D)v O}},2K:u(n,D){B r=[];Q(;n;n=n.2d){q(n.20==1&&(!D||n!=D))r.1g(n)}v r}});6.H={1M:u(T,C,1i,F){q(6.12.1k&&T.4E!=S)T=1F;q(F)1i.F=F;q(!1i.2s)1i.2s=7.2s++;q(!T.$1I)T.$1I={};B 2W=T.$1I[C];q(!2W){2W=T.$1I[C]={};q(T["2U"+C])2W[0]=T["2U"+C]}2W[1i.2s]=1i;T["2U"+C]=7.5P;q(!7.1j[C])7.1j[C]=[];7.1j[C].1g(T)},2s:1,1j:{},2e:u(T,C,1i){q(T.$1I){B i,j,k;q(C&&C.C){1i=C.1i;C=C.C}q(C&&T.$1I[C])q(1i)5O T.$1I[C][1i.2s];K Q(i 1z T.$1I[C])5O T.$1I[C][i];K Q(j 1z T.$1I)7.2e(T,j);Q(k 1z T.$1I[C])q(k){k=V;3Y}q(!k)T["2U"+C]=17}},1Q:u(C,F,T){F=6.40(F||[]);q(!T)6.J(7.1j[C]||[],u(){6.H.1Q(C,F,7)});K{B 1i=T["2U"+C],19,E=6.1r(T[C]);q(1i){F.5M(7.2j({C:C,1U:T}));q((19=1i.11(T,F))!==14)7.4B=V}q(E&&19!==14)T[C]();7.4B=14}},5P:u(H){q(1v 6=="S"||6.H.4B)v;H=6.H.2j(H||1F.H||{});B 3H;B c=7.$1I[H.C];B 1x=[].3D.43(1A,1);1x.5M(H);Q(B j 1z c){1x[0].1i=c[j];1x[0].F=c[j].F;q(c[j].11(7,1x)===14){H.2k();H.2B();3H=14}}q(6.12.1k)H.1U=H.2k=H.2B=H.1i=H.F=17;v 3H},2j:u(H){q(!H.1U&&H.5K)H.1U=H.5K;q(H.5I==S&&H.5H!=S){B e=1h.4L,b=1h.4Z;H.5I=H.5H+(e.5G||b.5G);H.7W=H.7U+(e.5F||b.5F)}q(6.12.3c&&H.1U.20==3){B 2R=H;H=6.1w({},2R);H.1U=2R.1U.Y;H.2k=u(){v 2R.2k()};H.2B=u(){v 2R.2B()}}q(!H.2k)H.2k=u(){7.3H=14};q(!H.2B)H.2B=u(){7.7T=V};v H}};6.E.1w({3F:u(C,F,E){v 7.J(u(){6.H.1M(7,C,E||F,F)})},5E:u(C,F,E){v 7.J(u(){6.H.1M(7,C,u(H){6(7).5D(H);v(E||F).11(7,1A)},F)})},5D:u(C,E){v 7.J(u(){6.H.2e(7,C,E)})},1Q:u(C,F){v 7.J(u(){6.H.1Q(C,F,7)})},3I:u(){B a=1A;v 7.5B(u(e){7.4x=7.4x==0?1:0;e.2k();v a[7.4x].11(7,[e])||14})},7Q:u(f,g){u 4X(e){B p=(e.C=="3U"?e.7P:e.7N)||e.7M;1Y(p&&p!=7)2z{p=p.Y}2G(e){p=7};q(p==7)v 14;v(e.C=="3U"?f:g).11(7,[e])}v 7.3U(4X).5A(4X)},39:u(f){q(6.3T)f.11(1h,[6]);K{6.3b.1g(u(){v f.11(7,[6])})}v 7}});6.1w({3T:14,3b:[],39:u(){q(!6.3T){6.3T=V;q(6.3b){6.J(6.3b,u(){7.11(1h)});6.3b=17}q(6.12.3r||6.12.45)1h.7J("7I",6.39,14)}}});1p u(){6.J(("7F,7E,36,7D,7C,4s,5B,7B,"+"7A,7z,7y,3U,5A,7x,3q,"+"4P,7w,7v,7u,2v").3W(","),u(i,o){6.E[o]=u(f){v f?7.3F(o,f):7.1Q(o)}})};q(6.12.1k)6(1F).5E("4s",u(){B 1j=6.H.1j;Q(B C 1z 1j){B 4p=1j[C],i=4p.I;q(i&&C!=\'4s\')7t 6.H.2e(4p[i-1],C);1Y(--i)}});6.E.1w({7s:u(U,1Z,M){7.36(U,1Z,M,1)},36:u(U,1Z,M,1W){q(6.1r(U))v 7.3F("36",U);M=M||u(){};B C="5w";q(1Z)q(6.1r(1Z)){M=1Z;1Z=17}K{1Z=6.30(1Z);C="5v"}B 46=7;6.3f({U:U,C:C,F:1Z,1W:1W,2c:u(2F,10){q(10=="2t"||!1W&&10=="5s")46.1D("2C",2F.3g).4j().J(M,[2F.3g,10,2F]);K M.11(46,[2F.3g,10,2F])}});v 7},7o:u(){v 6.30(7)},4j:u(){v 7.2i("4i").J(u(){q(7.3z)6.5q(7.3z);K 6.4h(7.2H||7.7n||7.2C||"")}).4z()}});q(!1F.3s)3s=u(){v 1p 7l("7j.7i")};6.J("5p,5o,5n,5m,5l,5k".3W(","),u(i,o){6.E[o]=u(f){v 7.3F(o,f)}});6.1w({29:u(U,F,M,C,1W){q(6.1r(F)){M=F;F=17}v 6.3f({U:U,F:F,2t:M,4e:C,1W:1W})},7f:u(U,F,M,C){v 6.29(U,F,M,C,1)},5q:u(U,M){v 6.29(U,17,M,"4i")},7b:u(U,F,M){v 6.29(U,F,M,"5j")},79:u(U,F,M,C){q(6.1r(F)){M=F;F={}}v 6.3f({C:"5v",U:U,F:F,2t:M,4e:C})},78:u(23){6.3o.23=23},77:u(5i){6.1w(6.3o,5i)},3o:{1j:V,C:"5w",23:0,5h:"76/x-75-3k-74",5f:V,3l:V,F:17},3m:{},3f:u(s){s=6.1w({},6.3o,s);q(s.F){q(s.5f&&1v s.F!="21")s.F=6.30(s.F);q(s.C.4o()=="29"){s.U+=((s.U.15("?")>-1)?"&":"?")+s.F;s.F=17}}q(s.1j&&!6.4b++)6.H.1Q("5p");B 4c=14;B N=1p 3s();N.71(s.C,s.U,s.3l);q(s.F)N.3n("6Z-7d",s.5h);q(s.1W)N.3n("7e-4a-6W",6.3m[s.U]||"6V, 6U 6S 7k 4l:4l:4l 6R");N.3n("X-6Q-7p","3s");q(N.7q)N.3n("6O","6N");q(s.5u)s.5u(N);q(s.1j)6.H.1Q("5k",[N,s]);B 3t=u(4n){q(N&&(N.6K==4||4n=="23")){4c=V;q(3w){5c(3w);3w=17}B 10;2z{10=6.5b(N)&&4n!="23"?s.1W&&6.6q(N,s.U)?"5s":"2t":"2v";q(10!="2v"){B 3J;2z{3J=N.4y("59-4a")}2G(e){}q(s.1W&&3J)6.3m[s.U]=3J;B F=6.5y(N,s.4e);q(s.2t)s.2t(F,10);q(s.1j)6.H.1Q("5l",[N,s])}K 6.3A(s,N,10)}2G(e){10="2v";6.3A(s,N,10,e)}q(s.1j)6.H.1Q("5n",[N,s]);q(s.1j&&!--6.4b)6.H.1Q("5o");q(s.2c)s.2c(N,10);q(s.3l)N=17}};B 3w=4E(3t,13);q(s.23>0)58(u(){q(N){N.6F();q(!4c)3t("23")}},s.23);2z{N.7G(s.F)}2G(e){6.3A(s,N,17,e)}q(!s.3l)3t();v N},3A:u(s,N,10,e){q(s.2v)s.2v(N,10,e);q(s.1j)6.H.1Q("5m",[N,s,e])},4b:0,5b:u(r){2z{v!r.10&&7H.6D=="4Q:"||(r.10>=57&&r.10<6C)||r.10==56||6.12.3c&&r.10==S}2G(e){}v 14},6q:u(N,U){2z{B 55=N.4y("59-4a");v N.10==56||55==6.3m[U]||6.12.3c&&N.10==S}2G(e){}v 14},5y:u(r,C){B 4t=r.4y("6B-C");B F=!C&&4t&&4t.15("N")>=0;F=C=="N"||F?r.6A:r.3g;q(C=="4i")6.4h(F);q(C=="5j")3L("F = "+F);q(C=="4d")6("<1N>").4d(F).4j();v F},30:u(a){B s=[];q(a.1l==2L||a.3h)6.J(a,u(){s.1g(2p(7.W)+"="+2p(7.P))});K Q(B j 1z a)q(a[j]&&a[j].1l==2L)6.J(a[j],u(){s.1g(2p(j)+"="+2p(7))});K s.1g(2p(j)+"="+2p(a[j]));v s.64("&")},4h:u(F){q(1F.53)1F.53(F);K q(6.12.3c)1F.58(F,0);K 3L.43(1F,F)}});6.E.1w({1L:u(R,M){B 1G=7.1y(":1G");R?1G.24({25:"1L",3P:"1L",1b:"1L"},R,M):1G.J(u(){7.1u.1e=7.2u?7.2u:"";q(6.1n(7,"1e")=="1X")7.1u.1e="2E"});v 7},1E:u(R,M){B 34=7.1y(":34");R?34.24({25:"1E",3P:"1E",1b:"1E"},R,M):34.J(u(){7.2u=7.2u||6.1n(7,"1e");q(7.2u=="1X")7.2u="2E";7.1u.1e="1X"});v 7},51:6.E.3I,3I:u(E,4D){B 1x=1A;v 6.1r(E)&&6.1r(4D)?7.51(E,4D):7.J(u(){6(7)[6(7).4f(":1G")?"1L":"1E"].11(6(7),1x)})},6z:u(R,M){v 7.24({25:"1L"},R,M)},6x:u(R,M){v 7.24({25:"1E"},R,M)},6w:u(R,M){v 7.J(u(){B 5T=6(7).4f(":1G")?"1L":"1E";6(7).24({25:5T},R,M)})},6v:u(R,M){v 7.24({1b:"1L"},R,M)},6u:u(R,M){v 7.24({1b:"1E"},R,M)},85:u(R,3e,M){v 7.24({1b:3e},R,M)},24:u(G,R,1o,M){v 7.1J(u(){7.2r=6.1w({},G);B 1t=6.R(R,1o,M);Q(B p 1z G){B e=1p 6.33(7,1t,p);q(G[p].1l==3X)e.2q(e.O(),G[p]);K e[G[p]](G)}})},1J:u(C,E){q(!E){E=C;C="33"}v 7.J(u(){q(!7.1J)7.1J={};q(!7.1J[C])7.1J[C]=[];7.1J[C].1g(E);q(7.1J[C].I==1)E.11(7)})}});6.1w({R:u(R,1o,E){B 1t=R&&R.1l==6r?R:{2c:E||!E&&1o||6.1r(R)&&R,26:R,1o:E&&1o||1o&&1o.1l!=4J&&1o};1t.26=(1t.26&&1t.26.1l==3X?1t.26:{8C:8B,8A:57}[1t.26])||8z;1t.1K=1t.2c;1t.2c=u(){6.6n(7,"33");q(6.1r(1t.1K))1t.1K.11(7)};v 1t},1o:{},1J:{},6n:u(D,C){C=C||"33";q(D.1J&&D.1J[C]){D.1J[C].4K();B f=D.1J[C][0];q(f)f.11(D)}},33:u(D,1d,G){B z=7;B y=D.1u;B 4W=6.1n(D,"1e");y.6l="1G";z.a=u(){q(1d.3Z)1d.3Z.11(D,[z.2n]);q(G=="1b")6.1D(y,"1b",z.2n);K q(6k(z.2n))y[G]=6k(z.2n)+"4R";y.1e="2E"};z.6j=u(){v 4g(6.1n(D,G))};z.O=u(){B r=4g(6.2V(D,G));v r&&r>-8u?r:z.6j()};z.2q=u(4S,3e){z.4T=(1p 6g()).6f();z.2n=4S;z.a();z.4U=4E(u(){z.3Z(4S,3e)},13)};z.1L=u(){q(!D.1B)D.1B={};D.1B[G]=7.O();1d.1L=V;z.2q(0,D.1B[G]);q(G!="1b")y[G]="6e"};z.1E=u(){q(!D.1B)D.1B={};D.1B[G]=7.O();1d.1E=V;z.2q(D.1B[G],0)};z.3I=u(){q(!D.1B)D.1B={};D.1B[G]=7.O();q(4W=="1X"){1d.1L=V;q(G!="1b")y[G]="6e";z.2q(0,D.1B[G])}K{1d.1E=V;z.2q(D.1B[G],0)}};z.3Z=u(3a,42){B t=(1p 6g()).6f();q(t>1d.26+z.4T){5c(z.4U);z.4U=17;z.2n=42;z.a();q(D.2r)D.2r[G]=V;B 2a=V;Q(B i 1z D.2r)q(D.2r[i]!==V)2a=14;q(2a){y.6l="";y.1e=4W;q(6.1n(D,"1e")=="1X")y.1e="2E";q(1d.1E)y.1e="1X";q(1d.1E||1d.1L)Q(B p 1z D.2r)q(p=="1b")6.1D(y,p,D.1B[p]);K y[p]=""}q(2a&&6.1r(1d.2c))1d.2c.11(D)}K{B n=t-7.4T;B p=n/1d.26;z.2n=1d.1o&&6.1o[1d.1o]?6.1o[1d.1o](p,n,3a,(42-3a),1d.26):((-6d.8o(p*6d.8D)/2)+0.5)*(42-3a)+3a;z.a()}}}})}',62,536,'||||||jQuery|this|||||||||||||||||||if||||function|return||||||var|type|elem|fn|data|prop|event|length|each|else|ret|callback|xml|cur|value|for|speed|undefined|element|url|true|name||parentNode||status|apply|browser||false|indexOf|className|null|firstChild|val|obj|opacity|nodeName|options|display|result|push|document|handler|global|msie|constructor|test|css|easing|new|expr|isFunction|arg|opt|style|typeof|extend|args|filter|in|arguments|orig|context|attr|hide|window|hidden|re|events|queue|old|show|add|div|table|elems|trigger|num|token|replace|target|tbody|ifModified|none|while|params|nodeType|string|key|timeout|animate|height|duration|nth|tb|get|done|not|complete|nextSibling|remove|index|z0|merge|find|fix|preventDefault|pushStack|oid|now|grep|encodeURIComponent|custom|curAnim|guid|success|oldblock|error|el|al|first|try|cssFloat|stopPropagation|innerHTML|exec|block|res|catch|text|wrap|childNodes|sibling|Array|substr|trim|insertBefore|disabled|selected|originalEvent|checked|map|on|curCSS|handlers|parPos|domManip|id|param|getAttribute|re2|fx|visible|has|load|last|_|ready|firstNum|readyList|safari|toUpperCase|to|ajax|responseText|jquery|inArray|String|form|async|lastModified|setRequestHeader|ajaxSettings|dir|select|mozilla|XMLHttpRequest|onreadystatechange|tr|multiFilter|ival|defaultView|styleFloat|src|handleError|removeChild|clean|slice|second|bind|position|returnValue|toggle|modRes|tag|eval|oWidth|foundToken|oHeight|width|9_|cloneNode|button|isReady|mouseover|child|split|Number|break|step|makeArray|append|lastNum|call|empty|opera|self|inv|isXMLDoc|alpha|Modified|active|requestDone|html|dataType|is|parseFloat|globalEval|script|evalScripts|pos|00|currentStyle|isTimeout|toLowerCase|els|getComputedStyle|float|unload|ct|static|deep|clone|lastToggle|getResponseHeader|end|visibility|triggered|radio|fn2|setInterval|matched|getAll|appendChild|rec|Function|shift|documentElement|_resort|swap|RegExp|submit|file|px|from|startTime|timer|parents|oldDisplay|handleHover|continue|body|ownerDocument|_toggle|tagName|execScript|sl|xmlRes|304|200|setTimeout|Last|href|httpSuccess|clearInterval|createElement|getElementsByTagName|processData|setArray|contentType|settings|json|ajaxSend|ajaxSuccess|ajaxError|ajaxComplete|ajaxStop|ajaxStart|getScript|100|notmodified|newProp|beforeSend|POST|GET|getPropertyValue|httpData|force|mouseout|click|appendTo|unbind|one|scrollTop|scrollLeft|clientX|pageX|prevObject|srcElement|after|unshift|removeAttr|delete|handle|before|prepend|check|state|tmp|rl|getElementById|parse|_prefix|input|reset|image|password|checkbox|join|odd|even|nodeValue|contains|gt|lt|eq|zoom|Math|1px|getTime|Date|parent|exclude|max|parseInt|overflow|previousSibling|dequeue|webkit|ol|httpNotModified|Object|userAgent|navigator|fadeOut|fadeIn|slideToggle|slideUp|concat|slideDown|responseXML|content|300|protocol|ig|abort|noConflict|setAttribute|getAttributeNode|method|readyState|action|9999|close|Connection|match|Requested|GMT|Jan|gi|01|Thu|Since|reverse|readOnly|Content|readonly|open|class|htmlFor|urlencoded|www|application|ajaxSetup|ajaxTimeout|post|th|getJSON|td|Type|If|getIfModified|tfoot|thead|XMLHTTP|Microsoft|1970|ActiveXObject|FORM|textContent|serialize|With|overrideMimeType|toString|loadIfModified|do|keyup|keypress|keydown|change|mousemove|mouseup|mousedown|dblclick|scroll|resize|focus|blur|send|location|DOMContentLoaded|removeEventListener|clientWidth|clientHeight|relatedTarget|toElement|relative|fromElement|hover|left|right|cancelBubble|clientY|absolute|pageY|offsetWidth|offsetHeight|Width|border|substring|padding|Left|object|fadeTo|Right|Bottom|Top|size|textarea|enabled|only|lastChild|prototype|toggleClass|removeClass|addClass|removeAttribute|line|insertAfter|prependTo|children|siblings|cos|weight|createTextNode|prev|font|next|10000|CSS1Compat|compatMode|boxModel|compatible|400|fast|600|slow|PI'.split('|'),0,{}))

var KOSTEN = new Array();
KOSTEN[0] = new Array(50,30,10,1); //Speer
KOSTEN[1] = new Array(30,30,70,1); //Schwert
KOSTEN[2] = new Array(60,30,40,1); //Axt
KOSTEN[3] = new Array(100,30,60,1); //Bogen
KOSTEN[4] = new Array(50,50,20,2); //Späher
KOSTEN[5] = new Array(125,100,250,4); //Lkav
KOSTEN[6] = new Array(250,100,150,5); //Berittene
KOSTEN[7] = new Array(200,150,600,6); //Skav
KOSTEN[8] = new Array(300,200,200,5); //Ramme
KOSTEN[9] = new Array(320,400,100,8); //Kata
KOSTEN[10] = new Array(20,20,40,10); //Pala
KOSTEN[11] = new Array(40000,50000,50000,100); //AG
KOSTEN[12] = new Array(28000,30000,25000,0); //Münze

function getUrlParam(param) //Parameter aus der URL holen
{
	var url_params = location.search.substr(1);
	var params = url_params.split('&');
	for (var i=0; i<params.length; i++)
	{
		if (params[i].indexOf(param) >= 0)
		{
			return params[i];
		}
	}
	return "";
}

//Neuen Link (inkl. Bild) für das Menü erstellen
function createLinkNode(href_p,img_p,text_p,target_p)
{	
	var li = document.createElement("li");
	var link = document.createElement("a");
	link.href = href_p;
	
	var text = document.createTextNode(text_p);
	
	if (img_p != "")
	{
		var img = document.createElement("img");
		var src = document.createAttribute("src");
		src.nodeValue = img_p;
		img.setAttributeNode(src);
		link.appendChild(img);
	}
	
	if (target_p != "")
	{
		link.target = target_p;
	}
	
	link.appendChild(text);
	
	li.appendChild(link);
	
	return li;
}

//Funktion zur Erweiterung des Marktplatz-Links
function expandMarketLink(market_link)
{
	var submenu = document.createElement("ul");
	var eigene_angeb = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=own_offer","","Eigene Angeb.","");
	var fremde_angeb = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=other_offer","","Fremde Angeb.","");
	var status = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=traders","","Haendlerstatus","");
	submenu.appendChild(eigene_angeb);
	submenu.appendChild(fremde_angeb);
	submenu.appendChild(status);
	market_link.appendChild(submenu);
	return market_link;
}

//Funktion zur Erweiterung des Versammlungsplatz-Links
function expandPlaceLink(vers_platz_link)
{
	var submenu = document.createElement("ul");
	var truppen = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place&mode=units","","Truppen","");
	var sim = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place&mode=sim","","Simulator","");
	submenu.appendChild(truppen);
	submenu.appendChild(sim);
	vers_platz_link.appendChild(submenu);
	return vers_platz_link;
}

function expandBerichtLink(bericht_link)
{
	var submenu = document.createElement("ul");
	arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=attack","","Angriffe","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=defense","","Verteidigung","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=support","","Unterstuetzung","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=trade","","Handel","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=other","","Sonstiges","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	bericht_link.appendChild(submenu);
	return bericht_link;
}

function expandSettingsLink(setting_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=profile","","Profil","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=email","","E-Mail-Adresse","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=settings","","Einstellungen","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=move","","Neu anfangen","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=delete","","Acc loeschen","");
	arr[5] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=share","","INet-Verb. teilen","");
	arr[6] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=vacation","","Urlaubsmodus","");
	arr[7] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=logins","","Logins","");
	arr[8] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=change_passwd","","Passw. aendern","");
	arr[9] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=poll","","Umfragen","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	setting_link.appendChild(submenu);
	return setting_link;	
}

function expandPremiumLink(prem_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=help","","Vorteile","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=premium","","Kaufen","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=points","","Einsetzen","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=log","","Protokoll","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	prem_link.appendChild(submenu);
	return prem_link;
}

function expandRangliste(rangliste_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=ally","","Staemme","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=player","","Spieler","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=con_ally","","Kontinent Staemme","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=con_player","","Kontinent Spieler","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=kill_player","","Besiegte Gegner","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	rangliste_link.appendChild(submenu);
	return rangliste_link;
}

function expandStamm(stamm_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=profile","","Profil","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=members","","Mitglieder","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=contracts","","Diplomatie","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=forum","","Forum","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	stamm_link.appendChild(submenu);
	return stamm_link;
}

function expandNachrichten(nachrichten_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=mass_out","","Rundschreiben","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=new","","Nachricht schreiben","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=block","","Absender blockieren","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	nachrichten_link.appendChild(submenu);
	return nachrichten_link;
}

//Menüs erstellen und einfügen
if (window.location.href.indexOf("game.php") >= 0)
{	
	if (getUrlParam("screen") == "screen=overview")
	{
		insertWhenStorageIsFull();
		
		/*Falls in der Dorfliste etwas ausgewählt wurde, muss eine Überprüfung stattfinden
		weil die counter nicht gesetzt wurden, das Dorf aber verändert wurde */
		checkVillageSwitcher();
	}
	
	if (getUrlParam("screen") == "screen=place") //Versammlungsplatz wird aufgerufen
	{
		if ((getUrlParam("mode") == "") || (getUrlParam("mode") == "mode=command"))
		{
		
			document.addEventListener('click', function(event)
			{
				if (event.target.id == "show_hide_place_fav_link")
				{
					if (GM_getValue("show_att_favs",false) == false)
					{
						$('#att_favdiv').slideDown('slow');
						GM_setValue("show_att_favs",true);
					}
					else
					{
						$('#att_favdiv').slideUp('slow');
						GM_setValue("show_att_favs",false);
					}
					
				}
				
				if (event.target.rel == "insert_place_fav_link")
				{
					var htm = event.target.innerHTML;
					htm = htm.replace("(","");
					htm = htm.replace(")","");
					var koords = htm.split("|");
					document.getElementsByName("x")[0].value = koords[0];
					document.getElementsByName("y")[0].value = koords[1];
				}
				
				if (event.target.rel == "del_place_fav_link")
				{
					Check = confirm(unescape("Wollen Sie den Favorit wirklich l%F6schen?"));
					if (Check == true)
					{
						var id = event.target.id;
						remove_AttFavs(id);
						location.reload();
					}
				}
				
				if (event.target.name == "attack")
				{
					var koordinaten = document.getElementsByName("x")[0].value+"|"+document.getElementsByName("y")[0].value;
					var jetzt = new Date();
					var Tag = jetzt.getDate();
					var Monat = jetzt.getMonth()+1;
					var Jahr = jetzt.getFullYear();
					
					var std = jetzt.getHours();
					var min = jetzt.getMinutes();
					if (Tag < 10)
						Tag = "0"+Tag;
					if (Monat < 10)
						Monat = "0"+Monat;
					if (std < 10)
						std = "0"+std;
					if (min < 10)
						min = "0"+std;
					
					var time = Tag+"."+Monat+"."+Jahr+" "+std+":"+min;
					setAttTime(koordinaten,time)
				}
				
			}, false);
			
			//Already pressed Attack/Support -> No Favs have to be displayed
			if ((document.body.innerHTML.indexOf('value="OK"') >= 0) && (document.body.innerHTML.indexOf('editInput') < 0))
			{
				//click auf Button abfangen und Angriffsdatum updaten
			}
			else
			{
				var droplink = create("a");
				droplink.href = "#";
				droplink.id = "show_hide_place_fav_link";
				droplink.innerHTML = "&gt;&gt; Favoriten";
				
				var favdiv = create("div");
				
				var vID = getUrlParam("village").replace("village=","");
				var favtabelle = getAttFavTable(vID);
				var tabelle;
				
				if (document.body.innerHTML.indexOf("att.png") >= 0)
				{
					tabelle = document.getElementsByTagName("table")[15];
				}
				else
				{
					tabelle = document.getElementsByTagName("table")[14];
				}
				
				var spaceTR = tabelle.insertRow(1);
				var linkTR = tabelle.insertRow(2);
				var divTR = tabelle.insertRow(3);
				var linkTD = create("td");
				var colsp = document.createAttribute("colspan");
				colsp.nodeValue = "5";
				var colsp1 = document.createAttribute("colspan");
				colsp1.nodeValue = "5";
				
				var attr = document.createAttribute("style");
				var id = document.createAttribute("id");
				id.nodeValue = "att_favdiv";
				if (GM_getValue("show_att_favs",false) == false)
				{
					attr.nodeValue = "display: none";
				}
				else
				{
					attr.nodeValue = "display: block";
				}
				favdiv.setAttributeNode(attr);
				favdiv.setAttributeNode(id);
				
				linkTD.appendChild(droplink);
				linkTD.setAttributeNode(colsp);
				
				var divTD = create("td");
				divTD.setAttributeNode(colsp1);
				favdiv.appendChild(favtabelle);
				divTD.appendChild(favdiv);
				
				linkTR.appendChild(linkTD);
				divTR.appendChild(divTD);
			}
		}
		
		if (getUrlParam("mode") == "mode=sim") //Links in den Simulator einfügen
		{
			sim_insertAttModeLinks();
		}
	}
	
	//Marktplatz - Favoriten einfügen
	if ((getUrlParam("screen") == "screen=market") && (getUrlParam("mode") == ""))
	{
		document.addEventListener('click', function(event)
		{
			if (event.target.rel == "insert_market_fav_link")
			{
				var htm = event.target.innerHTML;
				htm = htm.replace("(","");
				htm = htm.replace(")","");
				var koords = htm.split("|");
				document.getElementsByName("x")[0].value = koords[0];
				document.getElementsByName("y")[0].value = koords[1];
			}
			
			if (event.target.rel == "del_market_fav_link")
			{
				Check = confirm(unescape("Wollen Sie den Favorit wirklich l%F6schen?"));
				if (Check == true)
				{
					var id = event.target.id;
					remove_MarketFavs(id);
					location.reload();
				}
			}
			
		}, false);
		
		if (document.body.innerHTML.indexOf("Transport best") < 0) //normale Marktplatzseite
		{
			var vID = getUrlParam("village").replace("village=","");
			var favtabelle = getMarketFavTable(vID);
			var tabelle;
			
			if (document.body.innerHTML.indexOf("att.png") >= 0)
			{
				tabelle = document.getElementsByTagName("table")[13];
			}
			else
			{
				tabelle = document.getElementsByTagName("table")[12];
			}
			
			var spaceTR = tabelle.insertRow(2);
			var myTR = tabelle.insertRow(3);
			var myTD = create("td");
			var colsp = document.createAttribute("colspan");
			colsp.nodeValue = "5";
			myTD.setAttributeNode(colsp);
			myTD.appendChild(favtabelle);
			myTR.appendChild(myTD);
		}
	}
	
	if (getUrlParam("screen") == "screen=report")
	{
		//Wird ein spezieller Bericht wird angeschaut, muss geprüft werden ob das kein Bericht ist, bei dem Unterstützung in einem anderen Dorf angegriffen wurde
		if ((getUrlParam("view") != "") && (document.body.innerHTML.indexOf("Deine Unterstützung") < 0))
		{
			report_insertSimulationLinks();
		}
	}
	
	if (getUrlParam("screen") == "screen=map")
	{
		insertMapResizeForm();
		mapResize(GM_getValue("map_size",10));
	}
	
	if (getUrlParam("screen") == "screen=info_village")
	{
		insertFavouriteAddForm();
	}

	if (getUrlParam("screen") == "screen=snob") // Adelshof wird aufgerufen
	{
		var a_tags = document.getElementsByTagName("a");
		
		var count = 0;
		if (document.body.innerHTML.indexOf("att.png") >= 0)
		{
			count = 6;
		}
		else
		{
			count = 5;
		}

		for (var i = 0; i < a_tags.length; i++)
		{
			if ( (""+a_tags[i]).split("&")[2] == "action=coin")
			{
				
				var cip = document.getElementsByTagName("table")[count];
				var munzen_praegen_link = document.createElement("a");
				munzen_praegen_link.href="#";
				munzen_praegen_link.addEventListener("click", praege_alle_muenzen, false);
				munzen_praegen_link.innerHTML = '&gt;&gt; Pr&auml;ge alle M&uuml;nzen<br />';
				var div = create("div");
				div.innerHTML = '<span style="font-size: 10px">Anklicken -> erledigt. Ergebnis wird allerdings erst beim n&auml;chsten Site-Reload richtig angezeigt!</span>';
				cip.appendChild(munzen_praegen_link);
				cip.appendChild(div);
				break;
			}
		}
	}
	
	//Schnellleiste erstellen und einfügen
	createMenubar();
	
	//Gesamtes Menü ersetzen
	expandMenu();
	
	//Pfeil-Navigation einfügen
	insertVillageSwitcher();
}

function report_insertSimulationLinks()
{
	//var tr = document.getElementsByTagName("table")[9].getElementsByTagName("tr")[1];
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		var tr = document.getElementsByTagName("table")[10].getElementsByTagName("tr")[2];
	}
	else
	{
		var tr = document.getElementsByTagName("table")[9].getElementsByTagName("tr")[2];
	}
	
	//var td = tr.getElementsByTagName("td")[1];
	var td = tr.getElementsByTagName("td")[0];
	var sim_link = document.createElement("a");
	sim_link.href = "#";
	sim_link.innerHTML+= "&gt;&gt;simulieren&lt;&lt;";
	sim_link.addEventListener("click",saveSpiedTroups,false);
	td.innerHTML+="<br />Diesen Bericht ";
	td.appendChild(sim_link);
}

function ajax_createVillageList()
{
	var url = (""+location.href).split("/")[2];
	var village = "";
	var act_villageID;
	var link;
	var villageID = getUrlParam("village").split("=")[1];
	GM_xmlhttpRequest({
		method:"GET",
		url: "http://"+url+"/game.php?village="+villageID+"&screen=overview_villages",
		headers:{
		    "User-Agent":"monkeyagent",
		    "Accept":"text/monkey,text/xml",
		},
		onload:function(details) {
				var div = document.createElement("div");
				div.innerHTML = details.responseText;
				if (div.innerHTML.indexOf("att.png") >= 0)
				{
					var tr = div.getElementsByTagName("table")[7].getElementsByTagName("tr");
				}
				else
				{
					var tr = div.getElementsByTagName("table")[6].getElementsByTagName("tr");
				}
				
				for (var i= 1; i< tr.length; i++)
				{
					village = "village"+i;
					link = tr[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
					act_villageID = link.href.split("?")[1].split("&")[0];
					GM_setValue(village,act_villageID);
				}
				
				GM_setValue("village_max",i-1);
				GM_setValue("village_counter",1);
				location.reload();
				alert(unescape("D%F6rferliste aktualisiert! Ab jetzt kann mit Pfeilen navigiert werden!"));
		}
	});
}

/* Fügt die Links-Rechts Pfeile hinzu, mit denen man schnell durch die Dörfer switchen kann */
function insertVillageSwitcher()
{
	var img_left = document.createElement("img");
	img_left.src = "http://img388.imageshack.us/img388/3844/leftom8.png";
	var left_link = document.createElement("a");
	left_link.href = "#";
	left_link.appendChild(img_left);
	left_link.innerHTML+="&nbsp;&nbsp;";
	left_link.addEventListener("click",changeVillageLeft,false);
	
	var img_right = document.createElement("img");
	img_right.src = "http://img177.imageshack.us/img177/1439/rightio7.png";
	var right_link = document.createElement("a");
	right_link.href = "#";
	right_link.appendChild(img_right);
	right_link.innerHTML+="&nbsp;&nbsp;";
	right_link.addEventListener("click",changeVillageRight,false);
	
	var img_middle = document.createElement("img");
	img_middle.src = "http://img521.imageshack.us/img521/39/refreshil0.png";
	var middle_link = document.createElement("a");
	middle_link.href = "#";
	middle_link.appendChild(img_middle);
	middle_link.innerHTML+="&nbsp;&nbsp;";
	middle_link.addEventListener("click",ajax_createVillageList,false);
	
	var before_child = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
	var before = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[0].getElementsByTagName("td")[0];

	
	//Sind mehr als 1 Dorf vorhanden?
	if (GM_getValue("village_max",1) != 1)
	{
		
		if (GM_getValue("village_counter",1) == 1)
		{
			before.insertBefore(middle_link, before_child);
			before.insertBefore(right_link, before_child);
		}
		else if (GM_getValue("village_counter",1) == GM_getValue("village_max"))
		{
			
			before.insertBefore(left_link, before_child);
			before.insertBefore(middle_link, before_child);
		}
		else
		{
			before.insertBefore(left_link,before_child);
			before.insertBefore(middle_link, before_child);
			before.insertBefore(right_link,before_child);
		}
	}
	else
	{
		before.insertBefore(middle_link, before_child);
	}
}

//Fügt in der Übersicht einen Button hinzu, bei dessen click ein Fenster mit den vorhandenen Dörfern erscheint
function insertWhenStorageIsFull()
{
	var helper, row;
	var prod_array = new Array();
	var holz = parseInt(document.getElementById("wood").innerHTML); //Variablen der aktuellen Lagerinhalte holen
	var lehm = parseInt(document.getElementById("stone").innerHTML);
	var eisen = parseInt(document.getElementById("iron").innerHTML);
	var storage = parseInt(document.getElementById("storage").innerHTML.replace(" ","")); //Wie viel kann gelagert werden?
	
	if (document.body.innerHTML.indexOf("att.png") >= 0) //Angriff läuft -> weitere Table wurde eingefügt durch Stämme-Script -> nächste Table verwenden
	{
		var rows = document.getElementsByTagName("table")[10].getElementsByTagName("tr");
	}
	else
	{
		var rows = document.getElementsByTagName("table")[9].getElementsByTagName("tr");
	}
	
	try
	{
		for (var i=1; i<=3; i++)
		{
			row = rows[i];
			helper = row.getElementsByTagName("td")[1].innerHTML.replace("<strong>","");
			prod_array[i-1]= parseInt(helper.replace("</strong> pro Stunde",""));
		}
	}
	catch (e) //tritt ein Fehler auf, ist die klassische Dorfübersicht aktiv -> table [8]
	{
		var rows = document.getElementsByTagName("table")[8].getElementsByTagName("tr");
		for (var i=1; i<=3; i++)
		{
			row = rows[i];
			helper = row.getElementsByTagName("td")[1].innerHTML.replace("<strong>","");
			prod_array[i-1]= parseInt(helper.replace("</strong> pro Stunde",""));
		}
	}
	
	
	
	var now = new Date();
	var holz_voll = new Date();
	var lehm_voll = new Date();
	var eisen_voll = new Date();
	var holz_dauer = (storage - holz) / prod_array[0];
	var lehm_dauer = (storage - lehm) / prod_array[1];
	var eisen_dauer = (storage - eisen) / prod_array[2];

	holz_voll.setTime(now.getTime() + Math.round(holz_dauer * 60 * 60 * 1000)); //Wann ist der Speicher voll ?
	lehm_voll.setTime(now.getTime() + Math.round(lehm_dauer * 60 * 60 * 1000));
	eisen_voll.setTime(now.getTime() + Math.round(eisen_dauer * 60 * 60 * 1000));
	
	var holz_string = compareDatesReturnOutput(holz_voll,now);
	var lehm_string = compareDatesReturnOutput(lehm_voll, now);
	var eisen_string = compareDatesReturnOutput(eisen_voll, now);
	
	rows[1].getElementsByTagName("td")[1].innerHTML+="<br />"+holz_string;
	rows[2].getElementsByTagName("td")[1].innerHTML+="<br />"+lehm_string;
	rows[3].getElementsByTagName("td")[1].innerHTML+="<br />"+eisen_string;
}

function compareDatesReturnOutput(mydate, mynow)
{
	var string = '<span class="kommentar">';
	var diff = mydate.getTime() - mynow.getTime();
	var tomorrow = new Date();
	tomorrow.setTime(tomorrow.getTime() + (24 * 60 * 60 * 1000));
	if ((diff < (24 * 60 * 60 * 1000)) && (mydate.getDate() == mynow.getDate())) //heute
	{
		string+= "heute ";
	}
	else if ((diff < (48 * 60 * 60 * 1000)) && (tomorrow.getDate() == mydate.getDate())) //morgen
	{
		
		string+="morgen ";
	}
	else
	{
		var help = (""+mydate.getFullYear()).substr(2);
		string+=""+mydate.getDate()+"."+(mydate.getMonth()+1)+"."+help+" ";
	}
	
	var stunden = ((mydate.getHours() < 10) ? "0" + mydate.getHours() : mydate.getHours());
	var minuten = ((mydate.getMinutes() < 10) ? "0"+mydate.getMinutes() : mydate.getMinutes());
	
	string+="um "+stunden+":"+minuten+"</span>";
	
	return string;
}

function sim_insertAttModeLinks()
{
	var want_count;
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		var table = document.getElementsByTagName("table")[10];
		var help = document.getElementsByTagName("table")[11];
		want_count = 12;
	}
	else
	{
		var table = document.getElementsByTagName("table")[9];
		var help = document.getElementsByTagName("table")[10];
		want_count = 11;
	}
	
	var wanted;
	
	if (table.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML.indexOf("img") >= 0) //Simulation ausgeführt
	{
		sim_insertLostRessources(table);
		
		if (help.innerHTML.indexOf("Schaden durch") >= 0) //Rammböcke/Katas wurden mitsimuliert -> nächste Table
		{
			wanted = document.getElementsByTagName("table")[want_count].getElementsByTagName("tr")[0].getElementsByTagName("th");

		}
		else
		{
			wanted = document.getElementsByTagName("table")[want_count-1].getElementsByTagName("tr")[0].getElementsByTagName("th");
		}
	}
	else //keine Simulation ausgeführt
	{
		wanted = document.getElementsByTagName("table")[want_count-2].getElementsByTagName("tr")[0].getElementsByTagName("th");
	}
	table = document.getElementsByTagName("table")[want_count-3];
	
	var div = document.createElement("div");
	div.innerHTML+="<b><br />Erweiterung:</b><br /><br />";
	
	div.appendChild(document.createTextNode("Du bist:"));
	var att_link = document.createElement("a");
	att_link.href="#";
	att_link.addEventListener("click",insertOffTroupsInSimulator,false);
	att_link.innerHTML = "<br />Angreifer<br />";
	div.appendChild(att_link);
	
	var del_att = document.createElement("a");
	del_att.setAttribute("class","del_link");
	del_att.href="#";
	del_att.innerHTML = "&nbsp;&nbsp;[X]";
	del_att.addEventListener("click",resetOffTroupsInSimulator,false);
	wanted[1].appendChild(del_att);
	
	var def_link = document.createElement("a");
	def_link.href="#";
	def_link.addEventListener("click",insertDefTroupsInSimulator,false);
	def_link.innerHTML = "Verteidiger<br /><br />";
	div.appendChild(def_link);
	
	//div.appendChild(document.createTextNode("Spaehbericht"));
	var del_def = document.createElement("a");
	del_def.href="#";
	del_def.setAttribute("class","del_link");
	del_def.innerHTML = "&nbsp;&nbsp;[X]";
	del_def.addEventListener("click",resetDefTroupsInSimulator,false);
	wanted[2].appendChild(del_def);
	
	var spy_link = document.createElement("input");
	spy_link.type = "submit";
	spy_link.value = "einfuegen";
	spy_link.setAttribute("class","spy_link");
	spy_link.addEventListener("click",insertSpiedTroupsInSimulator,false);
	
	div.appendChild(spy_link);
	
	table.appendChild(div);
	
	if (GM_getValue("want_simulation") == 1)
	{
		spy_link.click();
	}
	else
	{
		GM_setValue("want_simulation",0);
	}
}

function sim_insertLostRessources(table)
{
	var losses_att = table.getElementsByTagName("tr")[2].getElementsByTagName("td");
	var losses_def = table.getElementsByTagName("tr")[5].getElementsByTagName("td");
	
	var kosten_att = new Array(0,0,0,0);
	var kosten_def = new Array(0,0,0,0);
	
	for (var i=1; i<losses_att.length; i++)
	{
		kosten_att[0] = kosten_att[0] + (parseInt(losses_att[i].innerHTML)*KOSTEN[i-1][0]);
		kosten_att[1] = kosten_att[1] + (parseInt(losses_att[i].innerHTML)*KOSTEN[i-1][1]);
		kosten_att[2] = kosten_att[2] + (parseInt(losses_att[i].innerHTML)*KOSTEN[i-1][2]);
		kosten_att[3] = kosten_att[3] + (parseInt(losses_att[i].innerHTML)*KOSTEN[i-1][3]);
	}
	
	for (var i=1; i<losses_def.length; i++)
	{
		kosten_def[0] = kosten_def[0] + (parseInt(losses_def[i].innerHTML)*KOSTEN[i-1][0]);
		kosten_def[1] = kosten_def[1] + (parseInt(losses_def[i].innerHTML)*KOSTEN[i-1][1]);
		kosten_def[2] = kosten_def[2] + (parseInt(losses_def[i].innerHTML)*KOSTEN[i-1][2]);
		kosten_def[3] = kosten_def[3] + (parseInt(losses_def[i].innerHTML)*KOSTEN[i-1][3]);
	}
	
	var tr_att = create("tr");
	var titel_att = create("td");
	titel_att.setAttribute("colspan","2");
	titel_att.innerHTML = "Kosten Verluste:";
	var holz_att = create("td");
	holz_att.setAttribute("colspan","2");
	holz_att.innerHTML = '<img src="/graphic/holz.png" /> '+kosten_att[0];
	var lehm_att = create("td");
	lehm_att.setAttribute("colspan","2");
	lehm_att.innerHTML = '<img src="/graphic/lehm.png" /> '+kosten_att[1];
	var eisen_att = create("td");
	eisen_att.setAttribute("colspan","2");
	eisen_att.innerHTML = '<img src="/graphic/eisen.png" /> '+kosten_att[2];
	var bh_att = create("td");
	bh_att.setAttribute("colspan","2");
	bh_att.innerHTML = '<img src="/graphic/face.png" /> '+kosten_att[3];
	var ges_att = create("td");
	ges_att.setAttribute("colspan","2");
	ges_att.innerHTML = '<img src="/graphic/res.png" /> '+(kosten_att[0]+kosten_att[1]+kosten_att[2]);
	
	tr_att.appendChild(titel_att);
	tr_att.appendChild(holz_att);
	tr_att.appendChild(lehm_att);
	tr_att.appendChild(eisen_att);
	tr_att.appendChild(bh_att);
	tr_att.appendChild(ges_att);
	
	var tr_def = create("tr");
	var titel_def = create("td");
	titel_def.setAttribute("colspan","2");
	titel_def.innerHTML = "Kosten Verluste:";
	var holz_def = create("td");
	holz_def.setAttribute("colspan","2");
	holz_def.innerHTML = '<img src="/graphic/holz.png" /> '+kosten_def[0];
	var lehm_def = create("td");
	lehm_def.setAttribute("colspan","2");
	lehm_def.innerHTML = '<img src="/graphic/lehm.png" /> '+kosten_def[1];
	var eisen_def = create("td");
	eisen_def.setAttribute("colspan","2");
	eisen_def.innerHTML = '<img src="/graphic/eisen.png" /> '+kosten_def[2];
	var bh_def = create("td");
	bh_def.setAttribute("colspan","2");
	bh_def.innerHTML = '<img src="/graphic/face.png" /> '+kosten_def[3];
	var ges_def = create("td");
	ges_def.setAttribute("colspan","2");
	ges_def.innerHTML = '<img src="/graphic/res.png" /> '+(kosten_def[0]+kosten_def[1]+kosten_def[2]);
	
	tr_def.appendChild(titel_def);
	tr_def.appendChild(holz_def);
	tr_def.appendChild(lehm_def);
	tr_def.appendChild(eisen_def);
	tr_def.appendChild(bh_def);
	tr_def.appendChild(ges_def);
	
	var act_row = table.getElementsByTagName("tr")[3];
	act_row.parentNode.insertBefore(tr_att,act_row);
	act_row = table.getElementsByTagName("tr")[6];
	act_row.parentNode.insertBefore(tr_def,act_row.nextSibling);
}

function create(name)
{
	return document.createElement(name);
}

function ajax_VillageTroups(mode)
{
	var bdiv;
	var url = (""+location.href).split("/")[2];
	var villageID = getUrlParam("village").split("=")[1];
	
	GM_xmlhttpRequest({
		method:"GET",
		url: "http://"+url+"/game.php?village="+villageID+"&screen=place&mode=units",
		headers:{
		    "User-Agent":"monkeyagent",
		    "Accept":"text/monkey,text/xml",
		},
		onload:function(details) {
			var bdiv = document.createElement("div");
			bdiv.innerHTML = details.responseText;
				
			if (bdiv.innerHTML.indexOf("att.png") >= 0)
			{
				var rows = bdiv.getElementsByTagName("table")[10].getElementsByTagName("tr");
			}
			else
			{
				var rows = bdiv.getElementsByTagName("table")[9].getElementsByTagName("tr");
			}
			
			var td;
	
			//Eigenes Dorf - ist immer in der 2. Zeile
			if (mode == "off")
			{
				td = rows[1].getElementsByTagName("td");
				
				document.getElementsByName("att_spear")[0].value = td[1].innerHTML;
				document.getElementsByName("att_sword")[0].value = td[2].innerHTML;
				document.getElementsByName("att_axe")[0].value = td[3].innerHTML;
				document.getElementsByName("att_archer")[0].value = td[4].innerHTML;
				document.getElementsByName("att_spy")[0].value = td[5].innerHTML;
				document.getElementsByName("att_light")[0].value = td[6].innerHTML;
				document.getElementsByName("att_marcher")[0].value = td[7].innerHTML;
				document.getElementsByName("att_heavy")[0].value = td[8].innerHTML;
				document.getElementsByName("att_ram")[0].value = td[9].innerHTML;
				document.getElementsByName("att_catapult")[0].value = td[10].innerHTML;
				document.getElementsByName("att_knight")[0].value = td[11].innerHTML;
				document.getElementsByName("att_snob")[0].value = td[12].innerHTML;
			}
			
			//Insgesamt
			if (mode == "def")
			{
				td = rows[rows.length-1].getElementsByTagName("th");
				document.getElementsByName("def_spear")[0].value = td[1].innerHTML;
				document.getElementsByName("def_sword")[0].value = td[2].innerHTML;
				document.getElementsByName("def_axe")[0].value = td[3].innerHTML;
				document.getElementsByName("def_archer")[0].value = td[4].innerHTML;
				document.getElementsByName("def_spy")[0].value = td[5].innerHTML;
				document.getElementsByName("def_light")[0].value = td[6].innerHTML;
				document.getElementsByName("def_marcher")[0].value = td[7].innerHTML;
				document.getElementsByName("def_heavy")[0].value = td[8].innerHTML;
				document.getElementsByName("def_ram")[0].value = td[9].innerHTML;
				document.getElementsByName("def_catapult")[0].value = td[10].innerHTML;
				document.getElementsByName("def_knight")[0].value = td[11].innerHTML;
				document.getElementsByName("def_snob")[0].value = td[12].innerHTML;
				document.getElementsByName("def_wall")[0].value = "";
				document.getElementsByName("moral")[0].value = "100";
			}
			
		}
	});
}

function saveSpiedTroups()
{
	var table_counter;
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		var data = document.getElementsByTagName("table")[17].getElementsByTagName("tr")[1].getElementsByTagName("td");
		var lost = document.getElementsByTagName("table")[17].getElementsByTagName("tr")[2].getElementsByTagName("td");
		table_counter = 18;
	}
	else
	{
		var data = document.getElementsByTagName("table")[16].getElementsByTagName("tr")[1].getElementsByTagName("td");
		var lost = document.getElementsByTagName("table")[16].getElementsByTagName("tr")[2].getElementsByTagName("td");
		table_counter = 17;
	}
	GM_setValue("spy_speer",parseInt(data[1].innerHTML)-parseInt(lost[1].innerHTML));
	GM_setValue("spy_schwert",parseInt(data[2].innerHTML)-parseInt(lost[2].innerHTML));
	GM_setValue("spy_axt",parseInt(data[3].innerHTML)-parseInt(lost[3].innerHTML));
	GM_setValue("spy_bogen",parseInt(data[4].innerHTML)-parseInt(lost[4].innerHTML));
	GM_setValue("spy_spaeher",parseInt(data[5].innerHTML)-parseInt(lost[5].innerHTML));
	GM_setValue("spy_lkav",parseInt(data[6].innerHTML)-parseInt(lost[6].innerHTML));
	GM_setValue("spy_bbogen",parseInt(data[7].innerHTML)-parseInt(lost[7].innerHTML));
	GM_setValue("spy_skav",parseInt(data[8].innerHTML)-parseInt(lost[8].innerHTML));
	GM_setValue("spy_ramme",parseInt(data[9].innerHTML)-parseInt(lost[9].innerHTML));
	GM_setValue("spy_kata",parseInt(data[10].innerHTML)-parseInt(lost[10].innerHTML));
	GM_setValue("spy_pala",parseInt(data[11].innerHTML)-parseInt(lost[11].innerHTML));
	GM_setValue("spy_ag",parseInt(data[12].innerHTML)-parseInt(lost[12].innerHTML));
	
	var moral = document.getElementsByTagName("h4")[1].innerHTML; //Moral: 87%
	moral = moral.replace("Moral: ","");
	moral = moral.replace("%","");
	GM_setValue("spy_moral",parseInt(moral));
	
	var table;
	var geb;
	table = document.getElementsByTagName("table")[table_counter];
	
	if (table && (table.getElementsByTagName("tr").length > 1)) //Wall auch erspäht
	{
		
		geb = table.getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
		
		if (geb.innerHTML.indexOf("Wall") >= 0) //Der Verteidiger hat einen Wall gebaut
		{
			var wall = geb.innerHTML.split("Wall <b>"); //(Stufe X)</b><br /> bleibt übrig
			
			if (wall.length > 1) //Wall wurde erspäht
			{
				wall[1] = wall[1].replace(")</b><br />","");
				wall[1] = wall[1].replace("(Stufe ","");
				GM_setValue("spy_wall",parseInt(wall[1]));
			}
		}
		else //Kein Wall im Dorf vorhanden
		{
			GM_setValue("spy_wall",0);
		}
	}
	else //Wall wurde nicht erspäht
	{
		GM_setValue("spy_wall",0);
	}
	
	/*Wall wurde vielleicht nicht erspäht, aber beschädigt -> Gebäudestufe ersichtlich */
	if (document.body.innerHTML.indexOf("Schaden durch") >= 0)
	{
		var tr = document.getElementsByTagName("table")[table_counter].getElementsByTagName("tr");
		
		//Wurde der Wall zusätzlich durch Katapulte beschädigt?
		if ((tr.length >= 3) && (tr[2].innerHTML.indexOf("Wall") >= 0))
		{
			var help = tr[2].getElementsByTagName("td")[0].innerHTML;
			var wall = help.split(" auf Level ")[1];
			wall = wall.replace("<b>","");
			wall = wall.replace("</b>","");
			GM_setValue("spy_wall",parseInt(wall));
		}
		else if (tr[1].innerHTML.indexOf("Wall") >= 0)
		{
			var help = tr[1].getElementsByTagName("td")[0].innerHTML;
			var wall = help.split(" auf Level ")[1];
			wall = wall.replace("<b>","");
			wall = wall.replace("</b>","");
			GM_setValue("spy_wall",parseInt(wall));
		}
	}
	
	GM_setValue("want_simulation",1);
	
	location.href = "game.php?"+getUrlParam("village")+"&screen=place&mode=sim";
}

function insertOffTroupsInSimulator()
{
	ajax_VillageTroups("off");
}

function insertDefTroupsInSimulator()
{
	ajax_VillageTroups("def");
}

function resetOffTroupsInSimulator()
{
	document.getElementsByName("att_spear")[0].value = "";
	document.getElementsByName("att_sword")[0].value = "";
	document.getElementsByName("att_axe")[0].value = "";
	document.getElementsByName("att_archer")[0].value = "";
	document.getElementsByName("att_spy")[0].value = "";
	document.getElementsByName("att_light")[0].value = "";
	document.getElementsByName("att_marcher")[0].value = "";
	document.getElementsByName("att_heavy")[0].value = "";
	document.getElementsByName("att_ram")[0].value = "";
	document.getElementsByName("att_catapult")[0].value = "";
	document.getElementsByName("att_knight")[0].value = "";
	document.getElementsByName("att_snob")[0].value = "";
	document.getElementsByName("moral")[0].value = "100";
}

function resetDefTroupsInSimulator()
{
	document.getElementsByName("def_spear")[0].value = "";
	document.getElementsByName("def_sword")[0].value = "";
	document.getElementsByName("def_axe")[0].value = "";
	document.getElementsByName("def_archer")[0].value = "";
	document.getElementsByName("def_spy")[0].value = "";
	document.getElementsByName("def_light")[0].value = "";
	document.getElementsByName("def_marcher")[0].value = "";
	document.getElementsByName("def_heavy")[0].value = "";
	document.getElementsByName("def_ram")[0].value = "";
	document.getElementsByName("def_catapult")[0].value = "";
	document.getElementsByName("def_knight")[0].value = "";
	document.getElementsByName("def_snob")[0].value = "";
	document.getElementsByName("moral")[0].value = "100";
	document.getElementsByName("def_wall")[0].value = "";
}

function insertSpiedTroupsInSimulator()
{
	document.getElementsByName("def_spear")[0].value = GM_getValue("spy_speer");
	document.getElementsByName("def_sword")[0].value = GM_getValue("spy_schwert");
	document.getElementsByName("def_axe")[0].value = GM_getValue("spy_axt");
	document.getElementsByName("def_archer")[0].value = GM_getValue("spy_bogen");
	document.getElementsByName("def_spy")[0].value = GM_getValue("spy_spaeher");
	document.getElementsByName("def_light")[0].value = GM_getValue("spy_lkav");
	document.getElementsByName("def_marcher")[0].value = GM_getValue("spy_bbogen");
	document.getElementsByName("def_heavy")[0].value = GM_getValue("spy_skav");
	document.getElementsByName("def_ram")[0].value = GM_getValue("spy_ramme");
	document.getElementsByName("def_catapult")[0].value = GM_getValue("spy_kata");
	document.getElementsByName("def_knight")[0].value = GM_getValue("spy_pala");
	document.getElementsByName("def_snob")[0].value = GM_getValue("spy_ag");
	document.getElementsByName("def_wall")[0].value = GM_getValue("spy_wall");
	document.getElementsByName("moral")[0].value = GM_getValue("spy_moral");
	
	GM_setValue("want_simulation",0);
}


function expandMenu()
{
	var link_array = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("a");
	var link_counter = 7;
	
	if (link_array.length == 12) //-> Im Stammesforum gibt es neue Beitrage
	{
		link_counter = 8;
	}
	
	var punkte = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML;
	punkte = punkte.substr(punkte.indexOf("\("),punkte.indexOf("\)")-punkte.indexOf("\(")+1);
	punkte = punkte.replace('<span class="grey">','');
	punkte = punkte.replace('</span>','');
	var logout = createLinkNode(link_array[0].href,"",link_array[0].innerHTML,"");
	var forum = createLinkNode(link_array[1].href,"",link_array[1].innerHTML,"_blank");
	var chat = createLinkNode(link_array[2].href,"",link_array[2].innerHTML,"_blank");
	var hilfe = createLinkNode(link_array[3].href,"",link_array[3].innerHTML,"_blank");
	var einstellungen = createLinkNode(link_array[4].href,"",link_array[4].innerHTML,"");
	var premium = createLinkNode(link_array[5].href,"",link_array[5].innerHTML,"");
	var rangliste = createLinkNode(link_array[6].href,"",link_array[6].innerHTML+""+punkte,"");
	
	//Überprüfung ob es neue Nachrichten im Stamm gibt (Image kommt vor, weil das Bild auch ein Link ist muss mit link-counter (erhöhung um 1) gearbeitet werden)
	var stamm;
	var stamm_forum;
	if (link_array.length == 12) // -> Neue Beiträge im Stammesforum, Bild kommt vor
	{
		var img = link_array[link_counter-1].getElementsByTagName("img")[0];
		stamm_forum = createLinkNode(link_array[link_counter-1].href,img.src,"","");
		
	}
	else
	{
		stamm_forum = false;
	}
	stamm = createLinkNode(link_array[link_counter].href,"",link_array[link_counter].innerHTML,"");
	
	link_counter++;
	
	//Neue Berichte gibts
	var berichte;
	if (link_array[link_counter].innerHTML.indexOf("<img") >= 0)
	{
		var img = link_array[link_counter].getElementsByTagName("img")[0];
		var text = link_array[link_counter].innerHTML.substr(link_array[link_counter].innerHTML.indexOf(">")+1);
		berichte = createLinkNode(link_array[link_counter].href,img.src,text,"");
	}
	else
	{
		berichte = createLinkNode(link_array[link_counter].href,"",link_array[link_counter].innerHTML,"");
	}
	
	//Neue Nachrichten gibts
	link_counter++;
	var nachrichten;
	if (link_array[link_counter].innerHTML.indexOf("<img") >= 0)
	{
		var img = link_array[link_counter].getElementsByTagName("img")[0];
		var text = link_array[link_counter].innerHTML.substr(link_array[link_counter].innerHTML.indexOf(">")+1);
		nachrichten = createLinkNode(link_array[link_counter].href,img.src,text,"");
	}
	else
	{
		nachrichten = createLinkNode(link_array[link_counter].href,"",link_array[link_counter].innerHTML,"");
	}
	link_counter++;
	var freunde = createLinkNode(link_array[link_counter].href,"",link_array[link_counter].innerHTML,"");
	
	berichte = expandBerichtLink(berichte);
	einstellungen = expandSettingsLink(einstellungen);
	premium = expandPremiumLink(premium);
	rangliste = expandRangliste(rangliste);
	stamm = expandStamm(stamm);
	nachrichten = expandNachrichten(nachrichten);
	
	
	var td = document.createElement("td");
	var div = document.createElement("div");
	var ul = document.createElement("ul");
	var stylenode = document.createAttribute("class");
	stylenode.nodeValue = "my_menu";
	div.setAttributeNode(stylenode);
	
	ul.appendChild(logout);
	ul.appendChild(forum);
	ul.appendChild(chat);
	ul.appendChild(hilfe);
	ul.appendChild(einstellungen);
	ul.appendChild(premium);
	ul.appendChild(rangliste);
	if (stamm_forum != false)
	{
		ul.appendChild(stamm_forum);
	}
	ul.appendChild(stamm);
	ul.appendChild(berichte);
	ul.appendChild(nachrichten);
	ul.appendChild(freunde);
	
	div.appendChild(ul);
	td.appendChild(div);
	
	var to_replace = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0];
	to_replace.replaceChild(td,to_replace.firstChild);
}

function createMenubar()
{
	var main_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=main","graphic/buildings/main.png","Hauptgebaeude","");
	var kaserne_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=barracks","graphic/buildings/barracks.png","Kaserne","");
	var stall_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=stable","graphic/buildings/stable.png","Stall","");
	var werkstatt_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=garage","graphic/buildings/garage.png","Werkstatt","");
	var marktplatz_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market","graphic/buildings/market.png","Marktplatz","");
	var vers_platz_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place","graphic/buildings/place.png","Versammlungsplatz","");
	var adelshof_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=snob","graphic/buildings/snob.png","Adelshof","");
	var schmiede_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=smith","graphic/buildings/smith.png","Schmiede","");

	//Marktplatz-Links erweitern (Dropdown)
	marktplatz_link = expandMarketLink(marktplatz_link);

	//Versammlungsplatz erweitern
	vers_platz_link = expandPlaceLink(vers_platz_link);

	//Menü-Div erstelle und Style setzen
	var divnode = document.createElement("div");
	var ulnode = document.createElement("ul");
	var stylenode = document.createAttribute("class");
	stylenode.nodeValue = "my_menu";
	divnode.setAttributeNode(stylenode);

	//Links in das Menü einfügen
	ulnode.appendChild(main_link);
	ulnode.appendChild(kaserne_link);
	ulnode.appendChild(stall_link);
	ulnode.appendChild(werkstatt_link);
	ulnode.appendChild(adelshof_link);
	ulnode.appendChild(schmiede_link);
	ulnode.appendChild(vers_platz_link);
	ulnode.appendChild(marktplatz_link);

	divnode.appendChild(ulnode);

	//Schnellleiste im Dokument einfügen
	document.getElementsByTagName("table")[0].appendChild(divnode);
}

function changeVillageLeft()
{
	var counter = GM_getValue("village_counter",1);
	counter--;
	var name = "village"+counter;
	var village = GM_getValue(name);
	var url = (""+location.href).substr((""+location.href).indexOf("&"));
	GM_setValue("village_counter",counter);
	location.href = "game.php?" + village + url;
}
function changeVillageRight()
{
	var counter = GM_getValue("village_counter",1);
	counter++;
	var name = "village"+counter;
	var village = GM_getValue(name);
	var url = (""+location.href).substr((""+location.href).indexOf("&"));
	GM_setValue("village_counter",counter);
	location.href = "game.php?" + village + url;
}
function checkVillageSwitcher()
{
	var village = getUrlParam("village");
	var name;
	var max = GM_getValue("village_max",1);
	
	if (max != 1)
	{
		for (var i=1; i<=max; i++)
		{
			name = "village"+i;
			if (GM_getValue(name) == village)
			{
				GM_setValue("village_counter",i);
			}
		}
	}
}

//resize the map to the wanted size - little bit buggy (rectangle on the right topo jumps a fiew koords after first click) 
function mapResize(newSize){

     // Get current position
     var map_x = unsafeWindow.mapX;
     var map_y = unsafeWindow.mapY;
     var map_s = unsafeWindow.mapSize;

     // Calculate new X and Y
     var delta = parseInt((map_s - newSize) / 2);

     // Overwrite values
     map_x += delta;
     map_y += delta;

     // InnerHTML
     var ihtml = "";
     ihtml += '<tr>';
     ihtml += '<td height="38">' + map_y + '</td>';
     ihtml += '<td colspan="' + newSize + '" rowspan="' + newSize + '">';
     ihtml += '<div style="background-image:url(graphic/map/gras4.png); position:relative; width:' + (53 * newSize) + 'px; height:' + (38 * newSize) +'px; overflow:hidden" id="map">';
     ihtml += '<div id="mapOld" style="position:absolute; left:0px; top:0px">';
     ihtml += '<div style="color:white; margin:10px">Lade Karte...</div>';
     ihtml += '</div>';
     ihtml += '<div id="mapNew" style="position:absolute; left:0px; top:0px"></div>';
     ihtml += '</div>';
     ihtml += '</td>';
     ihtml += '</tr>';
     for(jj=1; jj<newSize; jj++){
         ihtml += '<tr><td width="20" height="38">' + (map_y + jj) + '</td></tr>';
     }
     ihtml += '<tr id="map_x_axis">';
     ihtml += '<td height="20"></td>';
     for(jj=0; jj<newSize; jj++){
         ihtml += '<td align="center" width="53">' + (map_x + jj) + '</td>';
     }
     ihtml += '</tr>';
     var tmp = document.getElementById("mapCoords").innerHTML = ihtml;

     // Update data
     var url = "http://"+(""+location.href).split("/")[2] + "/" + unsafeWindow.mapURL + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + newSize + '&size_y=' + newSize;
     GM_xmlhttpRequest({
         method:"GET",
         url:url,
         onload:function(details){
             document.getElementById("mapOld").innerHTML = details.responseText;
         }
     });

     // mapMoveTopo()
     var scrollX = map_x;
     var scrollY = map_y;
     unsafeWindow.scrollX = scrollX;
     unsafeWindow.scrollY = scrollY;
     var topoX = parseInt(document.getElementsByName('min_x')[0].value); //minimalstes x auf Karte rechts
     var topoY = parseInt(document.getElementsByName('min_y')[0].value); //minimalstes y auf Karte rechts

     var relX = scrollX - topoX;
     if(unsafeWindow.globalYDir == 1){
         var relY = scrollY - topoY;
     }else{
         var relY = (45-mapSize) - (scrollY-topoY);
     }
    
     // Rechteck verschieben
     document.getElementById('topoRect').style.left   = (5*(relX)) + 'px';
     document.getElementById('topoRect').style.top    = (5*(relY)) + 'px';
     document.getElementById('topoRect').style.width  = (5*(newSize)) + 'px';
     document.getElementById('topoRect').style.height = (5*(newSize)) + 'px';
	 
	 unsafeWindow.ajaxMapInit(parseInt(unsafeWindow.mapX), parseInt(unsafeWindow.mapY), parseInt(newSize) , "game.php?"+getUrlParam("village")+"&screen=map&xml", 1, 1);
	 
 }
 
 //insert the Form into the map screen where user can choose size of the map
 function insertMapResizeForm()
 {
		var count = 0;
		if (document.body.innerHTML.indexOf("att.png") >= 0)
		{
			count = 14;
		}
		else
		{
			count = 13;
		}
		
		var myRow = document.getElementsByTagName("table")[count].insertRow(1);
		var myTd1 = create("td");
		myTd1.innerHTML = 'Kartengr&ouml;&szlig;e <input type="text" size="2" maxlength="2" id="my_map_size" value="'+GM_getValue("map_size",10)+'" /> <span style="font-size: 8px">(max 15)</span>';
		var myTd2 = create("td");
		var myButton = create("input");
		myButton.type = "submit";
		myButton.value = "Speichern";
		myButton.addEventListener("click",saveMapSize,false);
		
		myTd2.appendChild(myButton);
		myRow.appendChild(myTd1);
		myRow.appendChild(myTd2);
 }
 
 //save the typed mapsize into Firefox Cache
 function saveMapSize()
 {
	var myVal;
	try
	{
		if (parseInt(document.getElementById("my_map_size").value) > 15)
		{
			var myVal = 15;
		}
		else
		{
			myVal = document.getElementById("my_map_size").value;
		}
	}
	catch (ex) {myVal = 15;}
	
	GM_setValue("map_size",myVal);
	mapResize(GM_getValue("map_size",10));
 }
 
 function insertFavouriteAddForm()
 {
	var counter;
	
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		counter = 7;
	}
	else
	{
		counter = 6;
	}

	$(".vis").after('<a href="#" class="fav_add_link" id="fav_show_link">&raquo; Favoriten</a>');
	$("#fav_show_link").after('<div id="fav_div" style="border: 1px solid black !important; width: 50%; display: none; padding: 10px !important; margin: 10px">Favorit in: <select id="fav_type" size="1"><option value="this_village">diesem Dorf</option><option value="global_village">Allen D&ouml;rfern</option></select> <select id="fav_place" size="1"><option value="place">Versammlungsplatz</option><option value="market">Marktplatz</option></select><br />Notiz: <input type="text" id="fav_notiz" size="40" /><br /><br /><input type="submit" value="Speichern" id="save_fav" /><br /><br /><a href="#" id="fav_hide_link">[close]</a></div>');
	
	document.addEventListener('click', function(event)
	{
		if ( event.target.id == 'fav_show_link') 
		{
			$('#fav_div').slideDown("slow");
		}
		
		if (event.target.id == 'fav_hide_link')
		{
			$('#fav_div').slideUp('slow');
		}
		
		if (event.target.id == 'save_fav')
		{
			var favKind = 0;
			var villageID = getUrlParam("id").replace("id=","");
			var koords = document.getElementsByTagName("table")[counter].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
			var dorfname = document.getElementsByTagName("table")[counter].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML;
			var username = document.getElementsByTagName("table")[counter].getElementsByTagName("tr")[3].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
			var notiz = $('#fav_notiz').val();
			var userID = document.getElementsByTagName("table")[counter].getElementsByTagName("tr")[3].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href;
			var userID = userID.split("id=")[1];
			
			if ($('#fav_type').val() == "this_village")
			{
				favKind = getUrlParam("village").replace("village=","");
			}
			else
			{
				favKind = -1;
			}
			if ($('#fav_place').val() == "market")
			{
				add_MarketFavs(villageID, koords, dorfname, username, userID, notiz, favKind);
				
			}
			else
			{
				add_AttFavs(villageID, koords, dorfname, username, userID, notiz, favKind, "-1");
			}
			
			$('#fav_div').slideUp('slow');
			$('#fav_show_link').fadeTo("slow",0.0, function()
			{
				$('.vis').after('<span class="fav_add_link_ready" style="display: none; font-weight: bold">Favorit erfolgreich gespeichert!</span>');
				$('.fav_add_link_ready').fadeIn("slow");
			});
			
		}
		
	}, false);
	
 }
 
 function getAttFavTable(villageid)
{
	var favs=getAttFavs4Village(villageid);
}

function getMarketFavTable(villageid)
{
	var favs=getMarketFavs4Village(villageid);
}

//Remove the Village with this villageid
function remove_AttFavs(villageid)
{
	var attFavs=get_AttFavs();
	//Search for same villageid
	for (var i=0;i<attFavs.length;i++)
	{
		//Found the villageid
		if (attFavs[i][0]==villageid)
		{
			//Remove array. This entry will not be written to storage
			attFavs[i]="";
		}
	}
	write_AttFavs(attFavs);
}
//Remove the Village with this villageid
function remove_MarketFavs(villageid)
{
	var marketFavs=get_MarketFavs();
	//Search for same villageid
	for (var i=0;i<marketFavs.length;i++)
	{
		//Found the villageid
		if (marketFavs[i][0]==villageid)
		{
			//Remove array. This entry will not be written to storage
			marketFavs[i]="";
		}
	}
	write_MarketFavs(marketFavs);
}

//Villageid=Id of the actual Village
//Koords= Location of the Village
//Dorfname= Name of the Village
//User= Name of the User the Village belongs to
//Note= Note of the User
//Villagefav= Save Favourite for this Village(pass -1 to this function to make the favourite global)
//Lastattack= Time of the Last attack
function add_AttFavs(villageid,koords,dorfname,user,userid,note,villagefav,lastattack)
{
	var attFavs=get_AttFavs();
	write_AttFavs(addFavs(attFavs,villageid,koords,dorfname,user,userid,note,villagefav,lastattack));
}
//Villageid=Id of the actual Village
//Koords= Location of the Village
//Dorfname= Name of the Village
//User= Name of the User the Village belongs to
//Note= Note of the User
//Villagefav= Save Favourite for this Village(pass -1 to this function to make the favourite global)
//Lastattack= Time of the Last attack
function add_MarketFavs(villageid,koords,dorfname,user,userid,note,villagefav)
{
	var marketFavs=get_MarketFavs();
	write_MarketFavs(addFavs(marketFavs,villageid,koords,dorfname,user,userid,note,villagefav,""));
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//AB HIER NICHTS VERWENDEN!!!!!!!
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
function getWorld()
{
	return location.href.split('.')[0].split('de')[1];
}

function get_MarketFavs()
{
	var marketfavs=GM_getValue("marketfavs"+getWorld(),"");
	return splitFavs(marketfavs);
}

function get_AttFavs()
{
	var attfavs=GM_getValue("attfavs"+getWorld(),"");
	return splitFavs(attfavs);
}

function getAttFavs4Village(villagefav)
{
	var favs=get_AttFavs();
	for (var i=0;i<favs.length;i++)
	{
		if ((favs[i][5]!=villagefav)&&(favs[i][5]!="-1"))
		{
			favs[i]="";
		}
	}
	return favs;
}

function getMarketFavs4Village(villagefav)
{
	var favs=get_MarketFavs();
	for (var i=0;i<favs.length;i++)
	{
		if ((favs[i][5]!=villagefav)&&(favs[i][5]!="-1"))
		{
			favs[i]="";
		}
	}
	return favs;
}

function addFavs(favs,villageid,koords,dorfname,user,userid,note,villagefav,lastattack)
{
	//Search for same villageid
	for (var i=0;i<favs.length;i++)
	{
		//Village is already in the list-->update information
		if (favs[i][0]==villageid)
		{
			favs[i][1]=koords;
			favs[i][2]=dorfname;
			favs[i][3]=user;
			favs[i][4]=note.replace("\\","");
			favs[i][5]=villagefav;
			favs[i][6]=lastattack;
			favs[i][7]=userid;
			return favs;
		}
	}
	//Village is not in the list yet
	var dorfeintrag=new Array();
	dorfeintrag[0]=villageid;
	dorfeintrag[1]=koords;
	dorfeintrag[2]=dorfname;
	dorfeintrag[3]=user;
	dorfeintrag[4]=note.replace("\\","");
	dorfeintrag[5]=villagefav;
	dorfeintrag[6]=lastattack;
	dorfeintrag[7]=userid;
	favs[favs.length]=dorfeintrag;
	return favs;
}

function splitFavs(favouriten)
{
	//Two Backslashes indicate the border between 2 villages
	var splitted=favouriten.split("\\\\");
	var returnarray=new Array();
	for (var i=0; i<splitted.length; i++)
	{
		//There is an extra element at the end...
		if (splitted[i]!="")
		{
			//Split the string to an array
			returnarray[i]=splitted[i].split("\\");
		}
	}
	return returnarray;
}

//Used to generate a String to store in GM out of the Favs
function convertFavs2String(favs)
{
	var string="";
	for (var i=0;i<favs.length;i++)
	{
		if (favs[i]!="")
		{
			for (var j=0;j<favs[i].length;j++)
			{
				if (favs[i][j]=="")
					favs[i][j]="-1";
				string+=favs[i][j]+"\\";
			}
			string+="\\"
		}
	}
	return string;
}


function write_AttFavs(attFavs)
{
	GM_setValue("attfavs"+getWorld(),convertFavs2String(attFavs));
}

function write_MarketFavs(marketFavs)
{
	GM_setValue("marketfavs"+getWorld(),convertFavs2String(marketFavs));
}

function getAttFavTable(villageid)
{
	var favs=getAttFavs4Village(villageid);
	var tabelle=create("table");
	tabelle.setAttribute("width","100%");
	var title=create("tr");
	var koordstd=create("th");
	koordstd.innerHTML="Koordinaten";
	var dorfnametd=create("th");
	dorfnametd.innerHTML="Dorfname";
	var usertd=create("th");
	usertd.innerHTML="Spieler";
	var notetd=create("th");
	notetd.innerHTML="Notiz";
	var lastattacktd=create("th");
	lastattacktd.innerHTML="Letzter Angriff";
	title.appendChild(koordstd);
	title.appendChild(dorfnametd);
	title.appendChild(usertd);
	title.appendChild(lastattacktd);
	title.appendChild(notetd);
	tabelle.appendChild(title);
	for (var i=0;i<favs.length;i++)
	{
		if (favs[i]!="")
		{
			var row=create("tr");
			var koordstd=create("td");
			koordstd.innerHTML='<a href="#" rel="insert_place_fav_link">('+favs[i][1]+')</a>';
			var dorfnametd=create("td");
			dorfnametd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_village&id="+favs[i][0]+">"+favs[i][2]+"</a>";
			var usertd=create("td");
			if (favs[i][3]=="-1")
				usertd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_player&id="+favs[i][7]+"></a>";
			else
				usertd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_player&id="+favs[i][7]+">"+favs[i][3]+"</a>";
			var notetd=create("td");
			notetd.innerHTML=favs[i][4];
			var lastattacktd=create("td");
			if (favs[i][6]=="-1")
				lastattacktd.innerHTML="";
			else
				lastattacktd.innerHTML=favs[i][6];
			var del_col = create("td");
			del_col.innerHTML = '<a href="#" rel="del_place_fav_link" id="'+favs[i][0]+'">[x]</a>';
			row.appendChild(koordstd);
			row.appendChild(dorfnametd);
			row.appendChild(usertd);
			row.appendChild(lastattacktd);
			row.appendChild(notetd);
			row.appendChild(del_col);
			tabelle.appendChild(row);
		}
	}
	return tabelle;
}

function getMarketFavTable(villageid)
{
	var favs=getMarketFavs4Village(villageid);
	var tabelle=create("table");
	tabelle.setAttribute("width","100%");
	var title=create("tr");
	var koordstd=create("th");
	koordstd.innerHTML="Koordinaten";
	var dorfnametd=create("th");
	dorfnametd.innerHTML="Dorfname";
	var usertd=create("th");
	usertd.innerHTML="Spieler";
	var notetd=create("th");
	notetd.innerHTML="Notiz";
	title.appendChild(koordstd);
	title.appendChild(dorfnametd);
	title.appendChild(usertd);
	title.appendChild(notetd);
	tabelle.appendChild(title);
	for (var i=0;i<favs.length;i++)
	{
		if (favs[i]!="")
		{
			var row=create("tr");
			var koordstd=create("td");
			koordstd.innerHTML='<a href="#" rel="insert_market_fav_link">('+favs[i][1]+')</a>';
			var dorfnametd=create("td");
			dorfnametd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_village&id="+favs[i][0]+">"+favs[i][2]+"</a>";
			var usertd=create("td");
			if (favs[i][3]=="-1")
				usertd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_player&id="+favs[i][7]+"></a>";
			else
				usertd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_player&id="+favs[i][7]+">"+favs[i][3]+"</a>";
				
			var notetd=create("td");
			notetd.innerHTML=favs[i][4];
			var del_col = create("td");
			del_col.innerHTML = '<a href="#" rel="del_market_fav_link" id="'+favs[i][0]+'">[x]</a>';
			row.appendChild(koordstd);
			row.appendChild(dorfnametd);
			row.appendChild(usertd);
			row.appendChild(notetd);
			row.appendChild(del_col);
			tabelle.appendChild(row);
		}
	}
	return tabelle;
}

function setAttTime(villagekoords,atttime)
{
	var attFavs=get_AttFavs();
	for (var i=0;i<attFavs.length;i++)
	{
		//Found the villageid
		if (attFavs[i][1]==villagekoords)
		{
			attFavs[i][6]=atttime;
			break;
		}
	}
	write_AttFavs(attFavs);
}

function show_hide_AttFavs()
{
}

function praege_alle_muenzen()
{
	var holz  = parseInt(document.getElementById("wood").innerHTML); //Variablen der aktuellen Lagerinhalte holen
	var lehm  = parseInt(document.getElementById("stone").innerHTML);
	var eisen = parseInt(document.getElementById("iron").innerHTML);

	var holz_teile  = parseInt(holz / KOSTEN[12][0]);
	var lehm_teile  = parseInt(lehm / KOSTEN[12][1]);
	var eisen_teile = parseInt(eisen / KOSTEN[12][2]);

	var anzahl_muenzen = Math.min(Math.min(holz_teile, lehm_teile), eisen_teile);

	var a_tags = document.getElementsByTagName("a");

	for (var i = 0; i < a_tags.length; i++)
	{
		if ( (""+a_tags[i]).split("&")[2] == "action=coin")
		{
			h_param = (""+a_tags[i]).split("&")[3];
		}
	}

	var url = (""+location.href).split("/")[2];
	var villageID = getUrlParam("village").split("=")[1];

	for (i = 0; i < anzahl_muenzen; i++)
	{
		GM_xmlhttpRequest({
			method:"GET",
			url: "http://"+url+"/game.php?village="+villageID+"&screen=snob&action=coin&"+h_param,
			headers:{
				"User-Agent":"monkeyagent",
				"Accept":"text/monkey,text/xml",
			},
			onload: function(responseDetails) {
				while (responseDetails.status != 200) {}
			}
		});
	}

	location.reload();
}