// ==UserScript==
// @name           jQuery Gallery
// @namespace      http://www.outeverywhere.com
// @include        http://www.outeverywhere.com/*
// @include        http://www.journalhound.com/*
// ==/UserScript==





/*
 * jQuery 1.1.2 (jquery.com)
 * Copyright (c) 2006 John Resig
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 * Edited for greasemonkey -- sunsean
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('q(1v 1F.6=="S"){1F.S=1F.S;B 6=u(a,c){q(1F==7)v 1p 6(a,c);a=a||1h;q(6.1r(a))v 1p 6(1h)[6.E.39?"39":"36"](a);q(1v a=="21"){B m=/^[^<]*(<(.|\\s)+>)[^>]*$/.2D(a);q(m)a=6.3C([m[1]]);K v 1p 6(c).2i(a)}v 7.5g(a.1l==2L&&a||(a.3h||a.I&&a!=1F&&!a.20&&a[0]!=S&&a[0].20)&&6.40(a)||[a])};q(1v $!="S")6.38$=$;B $=6;6.E=6.8e={3h:"1.1.2",89:u(){v 7.I},I:0,29:u(1R){v 1R==S?6.40(7):7[1R]},2l:u(a){B L=6(a);L.5J=7;v L},5g:u(a){7.I=0;[].1g.11(7,a);v 7},J:u(E,1x){v 6.J(7,E,1x)},2f:u(1a){B 4k=-1;7.J(u(i){q(7==1a)4k=i});v 4k},1D:u(22,P,C){B 1a=22;q(22.1l==3j)q(P==S)v 7.I&&6[C||"1D"](7[0],22)||S;K{1a={};1a[22]=P}v 7.J(u(2f){Q(B G 1z 1a)6.1D(C?7.1u:7,G,6.G(7,1a[G],C,2f,G))})},1n:u(22,P){v 7.1D(22,P,"2V")},2H:u(e){q(1v e=="21")v 7.44().41(1h.8q(e));B t="";6.J(e||7,u(){6.J(7.2J,u(){q(7.20!=8)t+=7.20!=1?7.67:6.E.2H([7])})});v t},2I:u(){B a=6.3C(1A);v 7.J(u(){B b=a[0].3R(V);7.Y.2O(b,7);1Y(b.18)b=b.18;b.4H(7)})},41:u(){v 7.2Y(1A,V,1,u(a){7.4H(a)})},5R:u(){v 7.2Y(1A,V,-1,u(a){7.2O(a,7.18)})},5Q:u(){v 7.2Y(1A,14,1,u(a){7.Y.2O(a,7)})},5L:u(){v 7.2Y(1A,14,-1,u(a){7.Y.2O(a,7.2d)})},4z:u(){v 7.5J||6([])},2i:u(t){v 7.2l(6.2T(7,u(a){v 6.2i(t,a)}),t)},4w:u(4v){v 7.2l(6.2T(7,u(a){B a=a.3R(4v!=S?4v:V);a.$1I=17;v a}))},1y:u(t){v 7.2l(6.1r(t)&&6.2o(7,u(2w,2f){v t.11(2w,[2f])})||6.3v(t,7))},2b:u(t){v 7.2l(t.1l==3j&&6.3v(t,7,V)||6.2o(7,u(a){v(t.1l==2L||t.3h)?6.3i(a,t)<0:a!=t}))},1M:u(t){v 7.2l(6.2h(7.29(),t.1l==3j?6(t).29():t.I!=S&&(!t.1c||t.1c=="7m")?t:[t]))},4f:u(1q){v 1q?6.1y(1q,7).r.I>0:14},19:u(19){v 19==S?(7.I?7[0].P:17):7.1D("P",19)},4d:u(19){v 19==S?(7.I?7[0].2C:17):7.44().41(19)},2Y:u(1x,1O,3p,E){B 4w=7.I>1;B a=6.3C(1x);q(3p<0)a.6X();v 7.J(u(){B 1a=7;q(1O&&6.1c(7,"1O")&&6.1c(a[0],"3u"))1a=7.5e("1V")[0]||7.4H(1h.5d("1V"));6.J(a,u(){E.11(1a,[4w?7.3R(V):7])})})}};6.1w=6.E.1w=u(){B 1U=1A[0],a=1;q(1A.I==1){1U=7;a=0}B G;1Y(G=1A[a++])Q(B i 1z G)1U[i]=G[i];v 1U};6.1w({6G:u(){q(6.38$)$=6.38$;v 6},1r:u(E){v!!E&&1v E!="21"&&!E.1c&&1v E[0]=="S"&&/u/i.1m(E+"")},48:u(D){v D.52&&D.50&&!D.50.4Z},1c:u(D,W){v D.1c&&D.1c.3d()==W.3d()},J:u(1a,E,1x){q(1a.I==S)Q(B i 1z 1a)E.11(1a[i],1x||[i,1a[i]]);K Q(B i=0,6p=1a.I;i<6p;i++)q(E.11(1a[i],1x||[i,1a[i]])===14)3Y;v 1a},G:u(D,P,C,2f,G){q(6.1r(P))P=P.43(D,[2f]);B 6i=/z-?2f|8s-?8p|1b|6c|8j-?25/i;v P&&P.1l==3X&&C=="2V"&&!6i.1m(G)?P+"4R":P},16:{1M:u(D,c){6.J(c.3W(/\\s+/),u(i,O){q(!6.16.35(D.16,O))D.16+=(D.16?" ":"")+O})},2e:u(D,c){D.16=c?6.2o(D.16.3W(/\\s+/),u(O){v!6.16.35(c,O)}).64(" "):""},35:u(t,c){t=t.16||t;c=c.1T(/([\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:])/g,"\\\\$1");v t&&1p 4O("(^|\\\\s)"+c+"(\\\\s|$)").1m(t)}},4N:u(e,o,f){Q(B i 1z o){e.1u["1K"+i]=e.1u[i];e.1u[i]=o[i]}f.11(e,[]);Q(B i 1z o)e.1u[i]=e.1u["1K"+i]},1n:u(e,p){q(p=="25"||p=="3P"){B 1K={},3O,3M,d=["88","87","86","83"];6.J(d,u(){1K["82"+7]=0;1K["80"+7+"7Z"]=0});6.4N(e,1K,u(){q(6.1n(e,"1e")!="1X"){3O=e.7Y;3M=e.7X}K{e=6(e.3R(V)).2i(":4C").5N("2S").4z().1n({4A:"1G",3G:"7V",1e:"2E",7S:"0",7R:"0"}).5C(e.Y)[0];B 2X=6.1n(e.Y,"3G");q(2X==""||2X=="4u")e.Y.1u.3G="7O";3O=e.7L;3M=e.7K;q(2X==""||2X=="4u")e.Y.1u.3G="4u";e.Y.3B(e)}});v p=="25"?3O:3M}v 6.2V(e,p)},2V:u(D,G,5z){B L;q(G=="1b"&&6.12.1k)v 6.1D(D.1u,"1b");q(G=="4r"||G=="2A")G=6.12.1k?"3y":"2A";q(!5z&&D.1u[G])L=D.1u[G];K q(1h.3x&&1h.3x.4q){q(G=="2A"||G=="3y")G="4r";G=G.1T(/([A-Z])/g,"-$1").4o();B O=1h.3x.4q(D,17);q(O)L=O.5x(G);K q(G=="1e")L="1X";K 6.4N(D,{1e:"2E"},u(){B c=1h.3x.4q(7,"");L=c&&c.5x(G)||""})}K q(D.4m){B 5t=G.1T(/\\-(\\w)/g,u(m,c){v c.3d()});L=D.4m[G]||D.4m[5t]}v L},3C:u(a){B r=[];6.J(a,u(i,1s){q(!1s)v;q(1s.1l==3X)1s=1s.7r();q(1v 1s=="21"){B s=6.2N(1s),1N=1h.5d("1N"),28=[];B 2I=!s.15("<1t")&&[1,"<3q>","</3q>"]||(!s.15("<7h")||!s.15("<1V")||!s.15("<7g"))&&[1,"<1O>","</1O>"]||!s.15("<3u")&&[2,"<1O><1V>","</1V></1O>"]||(!s.15("<7c")||!s.15("<7a"))&&[3,"<1O><1V><3u>","</3u></1V></1O>"]||[0,"",""];1N.2C=2I[1]+s+2I[2];1Y(2I[0]--)1N=1N.18;q(6.12.1k){q(!s.15("<1O")&&s.15("<1V")<0)28=1N.18&&1N.18.2J;K q(2I[1]=="<1O>"&&s.15("<1V")<0)28=1N.2J;Q(B n=28.I-1;n>=0;--n)q(6.1c(28[n],"1V")&&!28[n].2J.I)28[n].Y.3B(28[n])}1s=[];Q(B i=0,l=1N.2J.I;i<l;i++)1s.1g(1N.2J[i])}q(1s.I===0&&!6.1c(1s,"3k"))v;q(1s[0]==S||6.1c(1s,"3k"))r.1g(1s);K r=6.2h(r,1s)});v r},1D:u(D,W,P){B 2j=6.48(D)?{}:{"Q":"73","72":"16","4r":6.12.1k?"3y":"2A",2A:6.12.1k?"3y":"2A",2C:"2C",16:"16",P:"P",2P:"2P",2S:"2S",70:"6Y",2Q:"2Q"};q(W=="1b"&&6.12.1k&&P!=S){D.6c=1;v D.1y=D.1y.1T(/49\\([^\\)]*\\)/6T,"")+(P==1?"":"49(1b="+P*5r+")")}K q(W=="1b"&&6.12.1k)v D.1y?4g(D.1y.6P(/49\\(1b=(.*)\\)/)[1])/5r:1;q(W=="1b"&&6.12.3r&&P==1)P=0.6M;q(2j[W]){q(P!=S)D[2j[W]]=P;v D[2j[W]]}K q(P==S&&6.12.1k&&6.1c(D,"3k")&&(W=="6L"||W=="6J"))v D.6I(W).67;K q(D.52){q(P!=S)D.6H(W,P);q(6.12.1k&&/5a|3z/.1m(W)&&!6.48(D))v D.31(W,2);v D.31(W)}K{W=W.1T(/-([a-z])/6E,u(z,b){v b.3d()});q(P!=S)D[W]=P;v D[W]}},2N:u(t){v t.1T(/^\\s+|\\s+$/g,"")},40:u(a){B r=[];q(a.1l!=2L)Q(B i=0,2x=a.I;i<2x;i++)r.1g(a[i]);K r=a.3D(0);v r},3i:u(b,a){Q(B i=0,2x=a.I;i<2x;i++)q(a[i]==b)v i;v-1},2h:u(2y,3E){B r=[].3D.43(2y,0);Q(B i=0,54=3E.I;i<54;i++)q(6.3i(3E[i],r)==-1)2y.1g(3E[i]);v 2y},2o:u(1P,E,47){q(1v E=="21")E=1p 4J("a","i","v "+E);B 1f=[];Q(B i=0,2w=1P.I;i<2w;i++)q(!47&&E(1P[i],i)||47&&!E(1P[i],i))1f.1g(1P[i]);v 1f},2T:u(1P,E){q(1v E=="21")E=1p 4J("a","v "+E);B 1f=[],r=[];Q(B i=0,2w=1P.I;i<2w;i++){B 19=E(1P[i],i);q(19!==17&&19!=S){q(19.1l!=2L)19=[19];1f=1f.6y(19)}}B r=1f.I?[1f[0]]:[];5S:Q(B i=1,5V=1f.I;i<5V;i++){Q(B j=0;j<i;j++)q(1f[i]==r[j])4Y 5S;r.1g(1f[i])}v r}});1p u(){B b=6t.6s.4o();6.12={3c:/6o/.1m(b),45:/45/.1m(b),1k:/1k/.1m(b)&&!/45/.1m(b),3r:/3r/.1m(b)&&!/(8y|6o)/.1m(b)};6.8x=!6.12.1k||1h.8w=="8v"};6.J({6h:"a.Y",4V:"6.4V(a)",8t:"6.27(a,2,\'2d\')",8r:"6.27(a,2,\'6m\')",8n:"6.2K(a.Y.18,a)",8m:"6.2K(a.18)"},u(i,n){6.E[i]=u(a){B L=6.2T(7,n);q(a&&1v a=="21")L=6.3v(a,L);v 7.2l(L)}});6.J({5C:"41",8l:"5R",2O:"5Q",8k:"5L"},u(i,n){6.E[i]=u(){B a=1A;v 7.J(u(){Q(B j=0,2x=a.I;j<2x;j++)6(a[j])[n](7)})}});6.J({5N:u(22){6.1D(7,22,"");7.8i(22)},8h:u(c){6.16.1M(7,c)},8g:u(c){6.16.2e(7,c)},8f:u(c){6.16[6.16.35(7,c)?"2e":"1M"](7,c)},2e:u(a){q(!a||6.1y(a,[7]).r.I)7.Y.3B(7)},44:u(){1Y(7.18)7.3B(7.18)}},u(i,n){6.E[i]=u(){v 7.J(n,1A)}});6.J(["6b","6a","69","68"],u(i,n){6.E[n]=u(1R,E){v 7.1y(":"+n+"("+1R+")",E)}});6.J(["25","3P"],u(i,n){6.E[n]=u(h){v h==S?(7.I?6.1n(7[0],n):17):7.1n(n,h.1l==3j?h:h+"4R")}});6.1w({1q:{"":"m[2]==\'*\'||6.1c(a,m[2])","#":"a.31(\'2Z\')==m[2]",":":{6a:"i<m[3]-0",69:"i>m[3]-0",27:"m[3]-0==i",6b:"m[3]-0==i",2y:"i==0",37:"i==r.I-1",66:"i%2==0",65:"i%2","27-3V":"6.27(a.Y.18,m[3],\'2d\',a)==a","2y-3V":"6.27(a.Y.18,1,\'2d\')==a","37-3V":"6.27(a.Y.8d,1,\'6m\')==a","8c-3V":"6.2K(a.Y.18).I==1",6h:"a.18",44:"!a.18",68:"6.E.2H.11([a]).15(m[3])>=0",34:\'a.C!="1G"&&6.1n(a,"1e")!="1X"&&6.1n(a,"4A")!="1G"\',1G:\'a.C=="1G"||6.1n(a,"1e")=="1X"||6.1n(a,"4A")=="1G"\',8b:"!a.2P",2P:"a.2P",2S:"a.2S",2Q:"a.2Q||6.1D(a,\'2Q\')",2H:"a.C==\'2H\'",4C:"a.C==\'4C\'",63:"a.C==\'63\'",4Q:"a.C==\'4Q\'",62:"a.C==\'62\'",4P:"a.C==\'4P\'",61:"a.C==\'61\'",60:"a.C==\'60\'",3S:\'a.C=="3S"||6.1c(a,"3S")\',5Z:"/5Z|3q|8a|3S/i.1m(a.1c)"},".":"6.16.35(a,m[2])","@":{"=":"z==m[4]","!=":"z!=m[4]","^=":"z&&!z.15(m[4])","$=":"z&&z.2M(z.I - m[4].I,m[4].I)==m[4]","*=":"z&&z.15(m[4])>=0","":"z",4M:u(m){v["",m[1],m[3],m[2],m[5]]},5Y:"z=a[m[3]];q(!z||/5a|3z/.1m(m[3]))z=6.1D(a,m[3]);"},"[":"6.2i(m[2],a).I"},5X:[/^\\[ *(@)([a-2g-3Q-]*) *([!*$^=]*) *(\'?"?)(.*?)\\4 *\\]/i,/^(\\[)\\s*(.*?(\\[.*?\\])?[^[]*?)\\s*\\]/,/^(:)([a-2g-3Q-]*)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/i,/^([:.#]*)([a-2g-3Q*-]*)/i],1S:[/^(\\/?\\.\\.)/,"a.Y",/^(>|\\/)/,"6.2K(a.18)",/^(\\+)/,"6.27(a,2,\'2d\')",/^(~)/,u(a){B s=6.2K(a.Y.18);v s.3D(6.3i(a,s)+1)}],3v:u(1q,1P,2b){B 1K,O=[];1Y(1q&&1q!=1K){1K=1q;B f=6.1y(1q,1P,2b);1q=f.t.1T(/^\\s*,\\s*/,"");O=2b?1P=f.r:6.2h(O,f.r)}v O},2i:u(t,1C){q(1v t!="21")v[t];q(1C&&!1C.20)1C=17;1C=1C||1h;q(!t.15("//")){1C=1C.4L;t=t.2M(2,t.I)}K q(!t.15("/")){1C=1C.4L;t=t.2M(1,t.I);q(t.15("/")>=1)t=t.2M(t.15("/"),t.I)}B L=[1C],2a=[],37=17;1Y(t&&37!=t){B r=[];37=t;t=6.2N(t).1T(/^\\/\\//i,"");B 3N=14;B 1H=/^[\\/>]\\s*([a-2g-9*-]+)/i;B m=1H.2D(t);q(m){6.J(L,u(){Q(B c=7.18;c;c=c.2d)q(c.20==1&&(6.1c(c,m[1])||m[1]=="*"))r.1g(c)});L=r;t=t.1T(1H,"");q(t.15(" ")==0)4Y;3N=V}K{Q(B i=0;i<6.1S.I;i+=2){B 1H=6.1S[i];B m=1H.2D(t);q(m){r=L=6.2T(L,6.1r(6.1S[i+1])?6.1S[i+1]:u(a){v 3L(6.1S[i+1])});t=6.2N(t.1T(1H,""));3N=V;3Y}}}q(t&&!3N){q(!t.15(",")){q(L[0]==1C)L.4K();6.2h(2a,L);r=L=[1C];t=" "+t.2M(1,t.I)}K{B 32=/^([a-2g-3Q-]+)(#)([a-2g-9\\\\*38-]*)/i;B m=32.2D(t);q(m){m=[0,m[2],m[3],m[1]]}K{32=/^([#.]?)([a-2g-9\\\\*38-]*)/i;m=32.2D(t)}q(m[1]=="#"&&L[L.I-1].5W){B 2m=L[L.I-1].5W(m[2]);q(6.12.1k&&2m&&2m.2Z!=m[2])2m=6(\'[@2Z="\'+m[2]+\'"]\',L[L.I-1])[0];L=r=2m&&(!m[3]||6.1c(2m,m[3]))?[2m]:[]}K{q(m[1]==".")B 4I=1p 4O("(^|\\\\s)"+m[2]+"(\\\\s|$)");6.J(L,u(){B 3K=m[1]!=""||m[0]==""?"*":m[2];q(6.1c(7,"84")&&3K=="*")3K="30";6.2h(r,m[1]!=""&&L.I!=1?6.4G(7,[],m[1],m[2],4I):7.5e(3K))});q(m[1]=="."&&L.I==1)r=6.2o(r,u(e){v 4I.1m(e.16)});q(m[1]=="#"&&L.I==1){B 5U=r;r=[];6.J(5U,u(){q(7.31("2Z")==m[2]){r=[7];v 14}})}L=r}t=t.1T(32,"")}}q(t){B 19=6.1y(t,r);L=r=19.r;t=6.2N(19.t)}}q(L&&L[0]==1C)L.4K();6.2h(2a,L);v 2a},1y:u(t,r,2b){1Y(t&&/^[a-z[({<*:.#]/i.1m(t)){B p=6.5X,m;6.J(p,u(i,1H){m=1H.2D(t);q(m){t=t.81(m[0].I);q(6.1q[m[1]].4M)m=6.1q[m[1]].4M(m);v 14}});q(m[1]==":"&&m[2]=="2b")r=6.1y(m[3],r,V).r;K q(m[1]=="."){B 1H=1p 4O("(^|\\\\s)"+m[2]+"(\\\\s|$)");r=6.2o(r,u(e){v 1H.1m(e.16||"")},2b)}K{B f=6.1q[m[1]];q(1v f!="21")f=6.1q[m[1]][m[2]];3L("f = u(a,i){"+(6.1q[m[1]].5Y||"")+"v "+f+"}");r=6.2o(r,f,2b)}}v{r:r,t:t}},4G:u(o,r,1S,W,1H){Q(B s=o.18;s;s=s.2d)q(s.20==1){B 1M=V;q(1S==".")1M=s.16&&1H.1m(s.16);K q(1S=="#")1M=s.31("2Z")==W;q(1M)r.1g(s);q(1S=="#"&&r.I)3Y;q(s.18)6.4G(s,r,1S,W,1H)}v r},4V:u(D){B 4F=[];B O=D.Y;1Y(O&&O!=1h){4F.1g(O);O=O.Y}v 4F},27:u(O,1f,3p,D){1f=1f||1;B 1R=0;Q(;O;O=O[3p]){q(O.20==1)1R++;q(1R==1f||1f=="66"&&1R%2==0&&1R>1&&O==D||1f=="65"&&1R%2==1&&O==D)v O}},2K:u(n,D){B r=[];Q(;n;n=n.2d){q(n.20==1&&(!D||n!=D))r.1g(n)}v r}});6.H={1M:u(T,C,1i,F){q(6.12.1k&&T.4E!=S)T=1F;q(F)1i.F=F;q(!1i.2s)1i.2s=7.2s++;q(!T.$1I)T.$1I={};B 2W=T.$1I[C];q(!2W){2W=T.$1I[C]={};q(T["2U"+C])2W[0]=T["2U"+C]}2W[1i.2s]=1i;T["2U"+C]=7.5P;q(!7.1j[C])7.1j[C]=[];7.1j[C].1g(T)},2s:1,1j:{},2e:u(T,C,1i){q(T.$1I){B i,j,k;q(C&&C.C){1i=C.1i;C=C.C}q(C&&T.$1I[C])q(1i)5O T.$1I[C][1i.2s];K Q(i 1z T.$1I[C])5O T.$1I[C][i];K Q(j 1z T.$1I)7.2e(T,j);Q(k 1z T.$1I[C])q(k){k=V;3Y}q(!k)T["2U"+C]=17}},1Q:u(C,F,T){F=6.40(F||[]);q(!T)6.J(7.1j[C]||[],u(){6.H.1Q(C,F,7)});K{B 1i=T["2U"+C],19,E=6.1r(T[C]);q(1i){F.5M(7.2j({C:C,1U:T}));q((19=1i.11(T,F))!==14)7.4B=V}q(E&&19!==14)T[C]();7.4B=14}},5P:u(H){q(1v 6=="S"||6.H.4B)v;H=6.H.2j(H||1F.H||{});B 3H;B c=7.$1I[H.C];B 1x=[].3D.43(1A,1);1x.5M(H);Q(B j 1z c){1x[0].1i=c[j];1x[0].F=c[j].F;q(c[j].11(7,1x)===14){H.2k();H.2B();3H=14}}q(6.12.1k)H.1U=H.2k=H.2B=H.1i=H.F=17;v 3H},2j:u(H){q(!H.1U&&H.5K)H.1U=H.5K;q(H.5I==S&&H.5H!=S){B e=1h.4L,b=1h.4Z;H.5I=H.5H+(e.5G||b.5G);H.7W=H.7U+(e.5F||b.5F)}q(6.12.3c&&H.1U.20==3){B 2R=H;H=6.1w({},2R);H.1U=2R.1U.Y;H.2k=u(){v 2R.2k()};H.2B=u(){v 2R.2B()}}q(!H.2k)H.2k=u(){7.3H=14};q(!H.2B)H.2B=u(){7.7T=V};v H}};6.E.1w({3F:u(C,F,E){v 7.J(u(){6.H.1M(7,C,E||F,F)})},5E:u(C,F,E){v 7.J(u(){6.H.1M(7,C,u(H){6(7).5D(H);v(E||F).11(7,1A)},F)})},5D:u(C,E){v 7.J(u(){6.H.2e(7,C,E)})},1Q:u(C,F){v 7.J(u(){6.H.1Q(C,F,7)})},3I:u(){B a=1A;v 7.5B(u(e){7.4x=7.4x==0?1:0;e.2k();v a[7.4x].11(7,[e])||14})},7Q:u(f,g){u 4X(e){B p=(e.C=="3U"?e.7P:e.7N)||e.7M;1Y(p&&p!=7)2z{p=p.Y}2G(e){p=7};q(p==7)v 14;v(e.C=="3U"?f:g).11(7,[e])}v 7.3U(4X).5A(4X)},39:u(f){q(6.3T)f.11(1h,[6]);K{6.3b.1g(u(){v f.11(7,[6])})}v 7}});6.1w({3T:14,3b:[],39:u(){q(!6.3T){6.3T=V;q(6.3b){6.J(6.3b,u(){7.11(1h)});6.3b=17}q(6.12.3r||6.12.45)1h.7J("7I",6.39,14)}}});1p u(){6.J(("7F,7E,36,7D,7C,4s,5B,7B,"+"7A,7z,7y,3U,5A,7x,3q,"+"4P,7w,7v,7u,2v").3W(","),u(i,o){6.E[o]=u(f){v f?7.3F(o,f):7.1Q(o)}})};q(6.12.1k)6(1F).5E("4s",u(){B 1j=6.H.1j;Q(B C 1z 1j){B 4p=1j[C],i=4p.I;q(i&&C!=\'4s\')7t 6.H.2e(4p[i-1],C);1Y(--i)}});6.E.1w({7s:u(U,1Z,M){7.36(U,1Z,M,1)},36:u(U,1Z,M,1W){q(6.1r(U))v 7.3F("36",U);M=M||u(){};B C="5w";q(1Z)q(6.1r(1Z)){M=1Z;1Z=17}K{1Z=6.30(1Z);C="5v"}B 46=7;6.3f({U:U,C:C,F:1Z,1W:1W,2c:u(2F,10){q(10=="2t"||!1W&&10=="5s")46.1D("2C",2F.3g).4j().J(M,[2F.3g,10,2F]);K M.11(46,[2F.3g,10,2F])}});v 7},7o:u(){v 6.30(7)},4j:u(){v 7.2i("4i").J(u(){q(7.3z)6.5q(7.3z);K 6.4h(7.2H||7.7n||7.2C||"")}).4z()}});q(!1F.3s)3s=u(){v 1p 7l("7j.7i")};6.J("5p,5o,5n,5m,5l,5k".3W(","),u(i,o){6.E[o]=u(f){v 7.3F(o,f)}});6.1w({29:u(U,F,M,C,1W){q(6.1r(F)){M=F;F=17}v 6.3f({U:U,F:F,2t:M,4e:C,1W:1W})},7f:u(U,F,M,C){v 6.29(U,F,M,C,1)},5q:u(U,M){v 6.29(U,17,M,"4i")},7b:u(U,F,M){v 6.29(U,F,M,"5j")},79:u(U,F,M,C){q(6.1r(F)){M=F;F={}}v 6.3f({C:"5v",U:U,F:F,2t:M,4e:C})},78:u(23){6.3o.23=23},77:u(5i){6.1w(6.3o,5i)},3o:{1j:V,C:"5w",23:0,5h:"76/x-75-3k-74",5f:V,3l:V,F:17},3m:{},3f:u(s){s=6.1w({},6.3o,s);q(s.F){q(s.5f&&1v s.F!="21")s.F=6.30(s.F);q(s.C.4o()=="29"){s.U+=((s.U.15("?")>-1)?"&":"?")+s.F;s.F=17}}q(s.1j&&!6.4b++)6.H.1Q("5p");B 4c=14;B N=1p 3s();N.71(s.C,s.U,s.3l);q(s.F)N.3n("6Z-7d",s.5h);q(s.1W)N.3n("7e-4a-6W",6.3m[s.U]||"6V, 6U 6S 7k 4l:4l:4l 6R");N.3n("X-6Q-7p","3s");q(N.7q)N.3n("6O","6N");q(s.5u)s.5u(N);q(s.1j)6.H.1Q("5k",[N,s]);B 3t=u(4n){q(N&&(N.6K==4||4n=="23")){4c=V;q(3w){5c(3w);3w=17}B 10;2z{10=6.5b(N)&&4n!="23"?s.1W&&6.6q(N,s.U)?"5s":"2t":"2v";q(10!="2v"){B 3J;2z{3J=N.4y("59-4a")}2G(e){}q(s.1W&&3J)6.3m[s.U]=3J;B F=6.5y(N,s.4e);q(s.2t)s.2t(F,10);q(s.1j)6.H.1Q("5l",[N,s])}K 6.3A(s,N,10)}2G(e){10="2v";6.3A(s,N,10,e)}q(s.1j)6.H.1Q("5n",[N,s]);q(s.1j&&!--6.4b)6.H.1Q("5o");q(s.2c)s.2c(N,10);q(s.3l)N=17}};B 3w=4E(3t,13);q(s.23>0)58(u(){q(N){N.6F();q(!4c)3t("23")}},s.23);2z{N.7G(s.F)}2G(e){6.3A(s,N,17,e)}q(!s.3l)3t();v N},3A:u(s,N,10,e){q(s.2v)s.2v(N,10,e);q(s.1j)6.H.1Q("5m",[N,s,e])},4b:0,5b:u(r){2z{v!r.10&&7H.6D=="4Q:"||(r.10>=57&&r.10<6C)||r.10==56||6.12.3c&&r.10==S}2G(e){}v 14},6q:u(N,U){2z{B 55=N.4y("59-4a");v N.10==56||55==6.3m[U]||6.12.3c&&N.10==S}2G(e){}v 14},5y:u(r,C){B 4t=r.4y("6B-C");B F=!C&&4t&&4t.15("N")>=0;F=C=="N"||F?r.6A:r.3g;q(C=="4i")6.4h(F);q(C=="5j")3L("F = "+F);q(C=="4d")6("<1N>").4d(F).4j();v F},30:u(a){B s=[];q(a.1l==2L||a.3h)6.J(a,u(){s.1g(2p(7.W)+"="+2p(7.P))});K Q(B j 1z a)q(a[j]&&a[j].1l==2L)6.J(a[j],u(){s.1g(2p(j)+"="+2p(7))});K s.1g(2p(j)+"="+2p(a[j]));v s.64("&")},4h:u(F){q(1F.53)1F.53(F);K q(6.12.3c)1F.58(F,0);K 3L.43(1F,F)}});6.E.1w({1L:u(R,M){B 1G=7.1y(":1G");R?1G.24({25:"1L",3P:"1L",1b:"1L"},R,M):1G.J(u(){7.1u.1e=7.2u?7.2u:"";q(6.1n(7,"1e")=="1X")7.1u.1e="2E"});v 7},1E:u(R,M){B 34=7.1y(":34");R?34.24({25:"1E",3P:"1E",1b:"1E"},R,M):34.J(u(){7.2u=7.2u||6.1n(7,"1e");q(7.2u=="1X")7.2u="2E";7.1u.1e="1X"});v 7},51:6.E.3I,3I:u(E,4D){B 1x=1A;v 6.1r(E)&&6.1r(4D)?7.51(E,4D):7.J(u(){6(7)[6(7).4f(":1G")?"1L":"1E"].11(6(7),1x)})},6z:u(R,M){v 7.24({25:"1L"},R,M)},6x:u(R,M){v 7.24({25:"1E"},R,M)},6w:u(R,M){v 7.J(u(){B 5T=6(7).4f(":1G")?"1L":"1E";6(7).24({25:5T},R,M)})},6v:u(R,M){v 7.24({1b:"1L"},R,M)},6u:u(R,M){v 7.24({1b:"1E"},R,M)},85:u(R,3e,M){v 7.24({1b:3e},R,M)},24:u(G,R,1o,M){v 7.1J(u(){7.2r=6.1w({},G);B 1t=6.R(R,1o,M);Q(B p 1z G){B e=1p 6.33(7,1t,p);q(G[p].1l==3X)e.2q(e.O(),G[p]);K e[G[p]](G)}})},1J:u(C,E){q(!E){E=C;C="33"}v 7.J(u(){q(!7.1J)7.1J={};q(!7.1J[C])7.1J[C]=[];7.1J[C].1g(E);q(7.1J[C].I==1)E.11(7)})}});6.1w({R:u(R,1o,E){B 1t=R&&R.1l==6r?R:{2c:E||!E&&1o||6.1r(R)&&R,26:R,1o:E&&1o||1o&&1o.1l!=4J&&1o};1t.26=(1t.26&&1t.26.1l==3X?1t.26:{8C:8B,8A:57}[1t.26])||8z;1t.1K=1t.2c;1t.2c=u(){6.6n(7,"33");q(6.1r(1t.1K))1t.1K.11(7)};v 1t},1o:{},1J:{},6n:u(D,C){C=C||"33";q(D.1J&&D.1J[C]){D.1J[C].4K();B f=D.1J[C][0];q(f)f.11(D)}},33:u(D,1d,G){B z=7;B y=D.1u;B 4W=6.1n(D,"1e");y.6l="1G";z.a=u(){q(1d.3Z)1d.3Z.11(D,[z.2n]);q(G=="1b")6.1D(y,"1b",z.2n);K q(6k(z.2n))y[G]=6k(z.2n)+"4R";y.1e="2E"};z.6j=u(){v 4g(6.1n(D,G))};z.O=u(){B r=4g(6.2V(D,G));v r&&r>-8u?r:z.6j()};z.2q=u(4S,3e){z.4T=(1p 6g()).6f();z.2n=4S;z.a();z.4U=4E(u(){z.3Z(4S,3e)},13)};z.1L=u(){q(!D.1B)D.1B={};D.1B[G]=7.O();1d.1L=V;z.2q(0,D.1B[G]);q(G!="1b")y[G]="6e"};z.1E=u(){q(!D.1B)D.1B={};D.1B[G]=7.O();1d.1E=V;z.2q(D.1B[G],0)};z.3I=u(){q(!D.1B)D.1B={};D.1B[G]=7.O();q(4W=="1X"){1d.1L=V;q(G!="1b")y[G]="6e";z.2q(0,D.1B[G])}K{1d.1E=V;z.2q(D.1B[G],0)}};z.3Z=u(3a,42){B t=(1p 6g()).6f();q(t>1d.26+z.4T){5c(z.4U);z.4U=17;z.2n=42;z.a();q(D.2r)D.2r[G]=V;B 2a=V;Q(B i 1z D.2r)q(D.2r[i]!==V)2a=14;q(2a){y.6l="";y.1e=4W;q(6.1n(D,"1e")=="1X")y.1e="2E";q(1d.1E)y.1e="1X";q(1d.1E||1d.1L)Q(B p 1z D.2r)q(p=="1b")6.1D(y,p,D.1B[p]);K y[p]=""}q(2a&&6.1r(1d.2c))1d.2c.11(D)}K{B n=t-7.4T;B p=n/1d.26;z.2n=1d.1o&&6.1o[1d.1o]?6.1o[1d.1o](p,n,3a,(42-3a),1d.26):((-6d.8o(p*6d.8D)/2)+0.5)*(42-3a)+3a;z.a()}}}})}',62,536,'||||||jQuery|this|||||||||||||||||||if||||function|return||||||var|type|elem|fn|data|prop|event|length|each|else|ret|callback|xml|cur|value|for|speed|undefined|element|url|true|name||parentNode||status|apply|browser||false|indexOf|className|null|firstChild|val|obj|opacity|nodeName|options|display|result|push|document|handler|global|msie|constructor|test|css|easing|new|expr|isFunction|arg|opt|style|typeof|extend|args|filter|in|arguments|orig|context|attr|hide|window|hidden|re|events|queue|old|show|add|div|table|elems|trigger|num|token|replace|target|tbody|ifModified|none|while|params|nodeType|string|key|timeout|animate|height|duration|nth|tb|get|done|not|complete|nextSibling|remove|index|z0|merge|find|fix|preventDefault|pushStack|oid|now|grep|encodeURIComponent|custom|curAnim|guid|success|oldblock|error|el|al|first|try|cssFloat|stopPropagation|innerHTML|exec|block|res|catch|text|wrap|childNodes|sibling|Array|substr|trim|insertBefore|disabled|selected|originalEvent|checked|map|on|curCSS|handlers|parPos|domManip|id|param|getAttribute|re2|fx|visible|has|load|last|_|ready|firstNum|readyList|safari|toUpperCase|to|ajax|responseText|jquery|inArray|String|form|async|lastModified|setRequestHeader|ajaxSettings|dir|select|mozilla|XMLHttpRequest|onreadystatechange|tr|multiFilter|ival|defaultView|styleFloat|src|handleError|removeChild|clean|slice|second|bind|position|returnValue|toggle|modRes|tag|eval|oWidth|foundToken|oHeight|width|9_|cloneNode|button|isReady|mouseover|child|split|Number|break|step|makeArray|append|lastNum|call|empty|opera|self|inv|isXMLDoc|alpha|Modified|active|requestDone|html|dataType|is|parseFloat|globalEval|script|evalScripts|pos|00|currentStyle|isTimeout|toLowerCase|els|getComputedStyle|float|unload|ct|static|deep|clone|lastToggle|getResponseHeader|end|visibility|triggered|radio|fn2|setInterval|matched|getAll|appendChild|rec|Function|shift|documentElement|_resort|swap|RegExp|submit|file|px|from|startTime|timer|parents|oldDisplay|handleHover|continue|body|ownerDocument|_toggle|tagName|execScript|sl|xmlRes|304|200|setTimeout|Last|href|httpSuccess|clearInterval|createElement|getElementsByTagName|processData|setArray|contentType|settings|json|ajaxSend|ajaxSuccess|ajaxError|ajaxComplete|ajaxStop|ajaxStart|getScript|100|notmodified|newProp|beforeSend|POST|GET|getPropertyValue|httpData|force|mouseout|click|appendTo|unbind|one|scrollTop|scrollLeft|clientX|pageX|prevObject|srcElement|after|unshift|removeAttr|delete|handle|before|prepend|check|state|tmp|rl|getElementById|parse|_prefix|input|reset|image|password|checkbox|join|odd|even|nodeValue|contains|gt|lt|eq|zoom|Math|1px|getTime|Date|parent|exclude|max|parseInt|overflow|previousSibling|dequeue|webkit|ol|httpNotModified|Object|userAgent|navigator|fadeOut|fadeIn|slideToggle|slideUp|concat|slideDown|responseXML|content|300|protocol|ig|abort|noConflict|setAttribute|getAttributeNode|method|readyState|action|9999|close|Connection|match|Requested|GMT|Jan|gi|01|Thu|Since|reverse|readOnly|Content|readonly|open|class|htmlFor|urlencoded|www|application|ajaxSetup|ajaxTimeout|post|th|getJSON|td|Type|If|getIfModified|tfoot|thead|XMLHTTP|Microsoft|1970|ActiveXObject|FORM|textContent|serialize|With|overrideMimeType|toString|loadIfModified|do|keyup|keypress|keydown|change|mousemove|mouseup|mousedown|dblclick|scroll|resize|focus|blur|send|location|DOMContentLoaded|removeEventListener|clientWidth|clientHeight|relatedTarget|toElement|relative|fromElement|hover|left|right|cancelBubble|clientY|absolute|pageY|offsetWidth|offsetHeight|Width|border|substring|padding|Left|object|fadeTo|Right|Bottom|Top|size|textarea|enabled|only|lastChild|prototype|toggleClass|removeClass|addClass|removeAttribute|line|insertAfter|prependTo|children|siblings|cos|weight|createTextNode|prev|font|next|10000|CSS1Compat|compatMode|boxModel|compatible|400|fast|600|slow|PI'.split('|'),0,{}))


//
// Determine the pixel width of the scrollbar - code taken from:
// http://www.fleegix.org/articles/2006/05/30/getting-the-scrollbar-width-in-pixels
//
function getScrollBarWidth() {
	 var scr = $.ce("div").css({
	   width: '200px', height: '150px', overflow: 'hidden'
	 }).appendTo(document.body);
   var inn = $.ce("div").css({ width: '100%', height: '200px'}).appendTo(scr);
   
	 var wNoScroll = inn.get(0).offsetWidth;
	 scr.css('overflow', 'scroll');
	 var wScroll = inn.get(0).offsetWidth;
	 
	 if (wNoScroll == wScroll) wScroll = scr.clientWidth;
	 document.body.removeChild(scr.get(0));
	 return (wNoScroll - wScroll);
}


function hideGallery(event) {
  $("#galleryOverlay").hide();
  $("#galleryBackground").hide();
  return;
}


function displayThumbnails(element) {
  var container = $(element).parent(".postmid");
  if (container.size() == 0) {
    container = $("#content");
  }
  var images = container.find("a img");
  var thumbs = $("#thumbsOverlay");
  
  images.each(
    function() {
    
      if (/\/[^\d]{1,2}[\d]+\./.test(this.src)) {
        var src = this.src.replace(/\/[^\d]+([\d]+\.)/g, "/sq$1");
        var img = $.ce("img").attr("src", src).css({
          marginBottom: "3px",
          display: "block",
          border: "1px solid #000",
          cursor:"pointer"
        });   
        var parent = $(this).parents(".gallery");        
        if (parent.size()) {
          img.attr("title", parent.find("a").text());
          img.attr("alt", parent.find("span").text());          
        } else {
          img.attr("title", this.title);
        }
            
        img.click(displayImage);
        img.mouseover(function() {
          if (!$(this).is(".currentImage")) {
            this.style.border = "1px solid red"
          }
        });
        img.mouseout(function() {
          if (!$(this).is(".currentImage")) {
            this.style.border = "1px solid  #666"
          }
        });   
        thumbs.append(img); 
      }
      return;
    }
  
  );

  return;

}



function timeChange(object, property, end) {
  var iterations = 10;
  var time = 50;

  var start = object[property];
  var tween = (end - start)/iterations;
  var counter = 1;
  var doTween = function() {
    if (counter++ < iterations) {
      object[property] = start + tween * counter;
      setTimeout(doTween, 40);
    } else {
      object[property] = end;
    }
  }
  doTween();
  return;
}


function getImageId(image) {
  var match = /\/[^\d]+([\d]+)\./.exec(image.src);
  if (match && match.length > 0) {
    return match[1];
  }

}

function scrollThumbIntoView(image) {
  var thumbs = $("#thumbsOverlay");
  var images = $("#thumbsOverlay img");
    
  var imageId = getImageId(image);
  
  var currImage = $("#thumbsOverlay .currentImage");
  if (currImage.size()) {
    currImage.removeClass("currentImage");
    currImage.css("border", "1px solid #000");
  }  

  var currentThumb = $("#thumbsOverlay img[@src*=" + imageId + ".]");   
  $(currentThumb).addClass("currentImage").css("border", "1px solid #f00");
  
  var index = images.index(currentThumb.get(0));
  timeChange(thumbs.get(0), "scrollTop", index * 77 - thumbs.height()/2 + 39);

  return;
}


function showNextSequence(event) {
  var target = event.target;
  
  var rightSide = event.layerY > target.offsetHeight / 2;
  var currentImage = $("#galleryImage img");
  var imageId = getImageId(currentImage.get(0));
  
  var currentThumb = $("#thumbsOverlay img[@src*=" + imageId + ".]"); 
  var nextImage = (rightSide ? currentThumb.next() : currentThumb.prev()).get(0);   
  
  if (nextImage) {
    if (document.createEvent) {
      var evObj = document.createEvent("MouseEvents");
      evObj.initEvent("click", true, false );
      nextImage.dispatchEvent(evObj);
    } else if (nextImage.fireEvent) {
      nextImage.fireEvent("click");
    }
  }
  
  event.stopPropagation()
  return;
}


function displayImage(event) {
  var target = event.target
  var oldSrc = target.src;
  
  var src = target.src.replace(/\/[^\d]{1,2}([\d]+\.)/g, "/g$1");
  
  if (src != target.src) {     

    var background = $("#galleryBackground");
    var gallery = $("#galleryOverlay");  
    var image = $("#galleryImage");  

    var img = $.ce("img").attr("src", src);
    var parent = $(target).parents(".gallery");
    if (parent.size()) {
      img.attr("title", parent.find("a").text());
      $("#galleryText").text(parent.find("span").text());
    } else {
      img.attr("title", target.title);
      $("#galleryText").text(target.alt);    
    }

    if (gallery.is(":hidden")) {
    
      $("#thumbsOverlay").empty();
      displayThumbnails(target);

      image.empty();
      image.append(LOADING_IMAGE);
      
      
      var scroll = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
      gallery.show().css({
        marginLeft: "-" + (gallery.width()/2 + GALLERY_PADDING) + "px",
        marginTop: scroll - (gallery.height()/2 + GALLERY_PADDING) + "px",
      });      
      background.css("top", scroll + "px").show();
    }
    
    img.bind("load", function(event) {
      //
      // Scale the image down if needed
      //
      var max = Math.max(this.height, this.width)
      if (max > MAX_IMAGE_WIDTH) {
        var scale = MAX_IMAGE_WIDTH / max;
        this.height *= scale;
        this.width *= scale;
      }
      
      $(this).css({
        position: "relative",      
        top: "50%",
        marginTop: "-" + (this.height/2) + "px",
        zIndex: 9
      });
   
      image.empty();
      image.append(this);
      scrollThumbIntoView(this);

          
      return;
    });
    
    event.preventDefault();
    event.stopPropagation();

  } else {
    hideGallery();
  }
  return;  
}



var MAX_IMAGE_WIDTH = 500;
var GALLERY_PADDING = 10;
var THUMB_SIZE = 72;


var LOADING_IMAGE = $(
  "<img src='/g/icons/ajax.gif' alt='loading' align='absmiddle' width='16' height='16' />"
).css({position: "absolute", top: "50%", marginTop: "-8px"});




// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.pack.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {







$.ce = function(e, id) {
  return $(document.createElement(e)).attr("id", id ? id : "");
}

var content = document.getElementById("content");
if (content) {

  var div = $.ce("div", "galleryOverlay").css({
    color: "#000",
    position: "absolute",
    left: "50%",
    top: "50%",
    zIndex: 200,
    textAlign: "center",
    padding: GALLERY_PADDING + "px",
    backgroundColor: "#fff",
    border: "1px solid black",
    MozBorderRadius: "10px"    
  }).hide().appendTo(document.body);

  $.ce("div").css("textAlign", "left").append(
    $.ce("img").attr({
      src: "/favicon.ico",
      align: "absmiddle"
    }).css({
      marginRight: "3px",
      marginBottom: "2px",
      cursor: "pointer"
    }).click(hideGallery)
  ).append("Photo gallery").appendTo(div);

  $.ce("div", "thumbsOverlay").css({
    width: (THUMB_SIZE + getScrollBarWidth() + 5) + "px",
    height: MAX_IMAGE_WIDTH + 2 + "px",    
    overflow: "auto",
    float: "left",
    textAlign: "right"
  }).appendTo(div);
    
  $.ce("div", "galleryImage").css({
    width: (MAX_IMAGE_WIDTH) + "px",
    height: (MAX_IMAGE_WIDTH) + "px",
    backgroundColor: "#efefef",
    border: "1px solid #999",
    marginLeft: "100px",
    cursor: "pointer"

  }).appendTo(div).click(showNextSequence);
  
  $.ce("div", "galleryText").appendTo(div).css({
    margin: "5px",
    width: "600px",
  });

  $.ce("div", "galleryBackground").css({
    position: "absolute",
    top: "0",
    backgroundColor: "#000",
    zIndex: 101,
    width: "100%",
    height: "100%",
  }).hide().fadeTo(0, 0.5).appendTo(document.body).click(hideGallery);

  $("#content a img").click(displayImage);
  
}





}