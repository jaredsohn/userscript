// ==UserScript==
// @name           	twus
// @version        	v0.3
// @namespace   	TWsc
// @description   	tribalwars
// @include        	http://*.tribalwars.*/*screen=*
// @copyright      	Copyright (c) 2010 by MaJia(免责的马甲)
// ==/UserScript==
// XPath
// Initiate jQuery 1.2.3
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(J(){7(1e.3N)L w=1e.3N;L E=1e.3N=J(a,b){K 1B E.2l.4T(a,b)};7(1e.$)L D=1e.$;1e.$=E;L u=/^[^<]*(<(.|\\s)+>)[^>]*$|^#(\\w+)$/;L G=/^.[^:#\\[\\.]*$/;E.1n=E.2l={4T:J(d,b){d=d||T;7(d.15){6[0]=d;6.M=1;K 6}N 7(1o d=="25"){L c=u.2O(d);7(c&&(c[1]||!b)){7(c[1])d=E.4a([c[1]],b);N{L a=T.5J(c[3]);7(a)7(a.2w!=c[3])K E().2s(d);N{6[0]=a;6.M=1;K 6}N d=[]}}N K 1B E(b).2s(d)}N 7(E.1q(d))K 1B E(T)[E.1n.21?"21":"3U"](d);K 6.6E(d.1k==1M&&d||(d.5h||d.M&&d!=1e&&!d.15&&d[0]!=10&&d[0].15)&&E.2I(d)||[d])},5h:"1.2.3",87:J(){K 6.M},M:0,22:J(a){K a==10?E.2I(6):6[a]},2F:J(b){L a=E(b);a.54=6;K a},6E:J(a){6.M=0;1M.2l.1g.1i(6,a);K 6},R:J(a,b){K E.R(6,a,b)},4X:J(b){L a=-1;6.R(J(i){7(6==b)a=i});K a},1J:J(c,a,b){L d=c;7(c.1k==4e)7(a==10)K 6.M&&E[b||"1J"](6[0],c)||10;N{d={};d[c]=a}K 6.R(J(i){Q(c 1p d)E.1J(b?6.W:6,c,E.1l(6,d[c],b,i,c))})},1j:J(b,a){7((b==\'27\'||b==\'1R\')&&2M(a)<0)a=10;K 6.1J(b,a,"2o")},1u:J(b){7(1o b!="3V"&&b!=V)K 6.4x().3t((6[0]&&6[0].2i||T).5r(b));L a="";E.R(b||6,J(){E.R(6.3p,J(){7(6.15!=8)a+=6.15!=1?6.6K:E.1n.1u([6])})});K a},5m:J(b){7(6[0])E(b,6[0].2i).5k().3o(6[0]).2c(J(){L a=6;2b(a.1C)a=a.1C;K a}).3t(6);K 6},8w:J(a){K 6.R(J(){E(6).6z().5m(a)})},8p:J(a){K 6.R(J(){E(6).5m(a)})},3t:J(){K 6.3O(18,P,S,J(a){7(6.15==1)6.38(a)})},6q:J(){K 6.3O(18,P,P,J(a){7(6.15==1)6.3o(a,6.1C)})},6o:J(){K 6.3O(18,S,S,J(a){6.1a.3o(a,6)})},5a:J(){K 6.3O(18,S,P,J(a){6.1a.3o(a,6.2B)})},3h:J(){K 6.54||E([])},2s:J(b){L c=E.2c(6,J(a){K E.2s(b,a)});K 6.2F(/[^+>] [^+>]/.17(b)||b.1f("..")>-1?E.57(c):c)},5k:J(e){L f=6.2c(J(){7(E.14.1d&&!E.3E(6)){L a=6.69(P),4Y=T.3s("1x");4Y.38(a);K E.4a([4Y.3d])[0]}N K 6.69(P)});L d=f.2s("*").4R().R(J(){7(6[F]!=10)6[F]=V});7(e===P)6.2s("*").4R().R(J(i){7(6.15==3)K;L c=E.O(6,"2R");Q(L a 1p c)Q(L b 1p c[a])E.16.1b(d[i],a,c[a][b],c[a][b].O)});K f},1E:J(b){K 6.2F(E.1q(b)&&E.3y(6,J(a,i){K b.1P(a,i)})||E.3e(b,6))},56:J(b){7(b.1k==4e)7(G.17(b))K 6.2F(E.3e(b,6,P));N b=E.3e(b,6);L a=b.M&&b[b.M-1]!==10&&!b.15;K 6.1E(J(){K a?E.33(6,b)<0:6!=b})},1b:J(a){K!a?6:6.2F(E.37(6.22(),a.1k==4e?E(a).22():a.M!=10&&(!a.12||E.12(a,"3u"))?a:[a]))},3H:J(a){K a?E.3e(a,6).M>0:S},7j:J(a){K 6.3H("."+a)},5O:J(b){7(b==10){7(6.M){L c=6[0];7(E.12(c,"2k")){L e=c.3T,5I=[],11=c.11,2X=c.U=="2k-2X";7(e<0)K V;Q(L i=2X?e:0,2f=2X?e+1:11.M;i<2f;i++){L d=11[i];7(d.2p){b=E.14.1d&&!d.9J.1A.9y?d.1u:d.1A;7(2X)K b;5I.1g(b)}}K 5I}N K(6[0].1A||"").1r(/\\r/g,"")}K 10}K 6.R(J(){7(6.15!=1)K;7(b.1k==1M&&/5u|5t/.17(6.U))6.3k=(E.33(6.1A,b)>=0||E.33(6.31,b)>=0);N 7(E.12(6,"2k")){L a=b.1k==1M?b:[b];E("98",6).R(J(){6.2p=(E.33(6.1A,a)>=0||E.33(6.1u,a)>=0)});7(!a.M)6.3T=-1}N 6.1A=b})},3q:J(a){K a==10?(6.M?6[0].3d:V):6.4x().3t(a)},6S:J(a){K 6.5a(a).1V()},6Z:J(i){K 6.2K(i,i+1)},2K:J(){K 6.2F(1M.2l.2K.1i(6,18))},2c:J(b){K 6.2F(E.2c(6,J(a,i){K b.1P(a,i,a)}))},4R:J(){K 6.1b(6.54)},O:J(d,b){L a=d.23(".");a[1]=a[1]?"."+a[1]:"";7(b==V){L c=6.5n("8P"+a[1]+"!",[a[0]]);7(c==10&&6.M)c=E.O(6[0],d);K c==V&&a[1]?6.O(a[0]):c}N K 6.1N("8K"+a[1]+"!",[a[0],b]).R(J(){E.O(6,d,b)})},35:J(a){K 6.R(J(){E.35(6,a)})},3O:J(g,f,h,d){L e=6.M>1,3n;K 6.R(J(){7(!3n){3n=E.4a(g,6.2i);7(h)3n.8D()}L b=6;7(f&&E.12(6,"1O")&&E.12(3n[0],"4v"))b=6.3S("1U")[0]||6.38(6.2i.3s("1U"));L c=E([]);E.R(3n,J(){L a=e?E(6).5k(P)[0]:6;7(E.12(a,"1m")){c=c.1b(a)}N{7(a.15==1)c=c.1b(E("1m",a).1V());d.1P(b,a)}});c.R(6A)})}};E.2l.4T.2l=E.2l;J 6A(i,a){7(a.3Q)E.3P({1c:a.3Q,3l:S,1H:"1m"});N E.5g(a.1u||a.6x||a.3d||"");7(a.1a)a.1a.34(a)}E.1s=E.1n.1s=J(){L b=18[0]||{},i=1,M=18.M,5c=S,11;7(b.1k==8d){5c=b;b=18[1]||{};i=2}7(1o b!="3V"&&1o b!="J")b={};7(M==1){b=6;i=0}Q(;i<M;i++)7((11=18[i])!=V)Q(L a 1p 11){7(b===11[a])6w;7(5c&&11[a]&&1o 11[a]=="3V"&&b[a]&&!11[a].15)b[a]=E.1s(b[a],11[a]);N 7(11[a]!=10)b[a]=11[a]}K b};L F="3N"+(1B 3v()).3L(),6t=0,5b={};L H=/z-?4X|86-?84|1w|6k|7Z-?1R/i;E.1s({7Y:J(a){1e.$=D;7(a)1e.3N=w;K E},1q:J(a){K!!a&&1o a!="25"&&!a.12&&a.1k!=1M&&/J/i.17(a+"")},3E:J(a){K a.1F&&!a.1h||a.28&&a.2i&&!a.2i.1h},5g:J(a){a=E.3g(a);7(a){L b=T.3S("6f")[0]||T.1F,1m=T.3s("1m");1m.U="1u/4m";7(E.14.1d)1m.1u=a;N 1m.38(T.5r(a));b.38(1m);b.34(1m)}},12:J(b,a){K b.12&&b.12.2E()==a.2E()},1T:{},O:J(c,d,b){c=c==1e?5b:c;L a=c[F];7(!a)a=c[F]=++6t;7(d&&!E.1T[a])E.1T[a]={};7(b!=10)E.1T[a][d]=b;K d?E.1T[a][d]:a},35:J(c,b){c=c==1e?5b:c;L a=c[F];7(b){7(E.1T[a]){2V E.1T[a][b];b="";Q(b 1p E.1T[a])1Q;7(!b)E.35(c)}}N{1S{2V c[F]}1X(e){7(c.52)c.52(F)}2V E.1T[a]}},R:J(c,a,b){7(b){7(c.M==10){Q(L d 1p c)7(a.1i(c[d],b)===S)1Q}N Q(L i=0,M=c.M;i<M;i++)7(a.1i(c[i],b)===S)1Q}N{7(c.M==10){Q(L d 1p c)7(a.1P(c[d],d,c[d])===S)1Q}N Q(L i=0,M=c.M,1A=c[0];i<M&&a.1P(1A,i,1A)!==S;1A=c[++i]){}}K c},1l:J(b,a,c,i,d){7(E.1q(a))a=a.1P(b,i);K a&&a.1k==51&&c=="2o"&&!H.17(d)?a+"2S":a},1t:{1b:J(c,b){E.R((b||"").23(/\\s+/),J(i,a){7(c.15==1&&!E.1t.3Y(c.1t,a))c.1t+=(c.1t?" ":"")+a})},1V:J(c,b){7(c.15==1)c.1t=b!=10?E.3y(c.1t.23(/\\s+/),J(a){K!E.1t.3Y(b,a)}).6a(" "):""},3Y:J(b,a){K E.33(a,(b.1t||b).3X().23(/\\s+/))>-1}},68:J(b,c,a){L e={};Q(L d 1p c){e[d]=b.W[d];b.W[d]=c[d]}a.1P(b);Q(L d 1p c)b.W[d]=e[d]},1j:J(d,e,c){7(e=="27"||e=="1R"){L b,46={43:"4W",4U:"1Z",19:"3D"},3c=e=="27"?["7O","7M"]:["7J","7I"];J 5E(){b=e=="27"?d.7H:d.7F;L a=0,2N=0;E.R(3c,J(){a+=2M(E.2o(d,"7E"+6,P))||0;2N+=2M(E.2o(d,"2N"+6+"5X",P))||0});b-=24.7C(a+2N)}7(E(d).3H(":4d"))5E();N E.68(d,46,5E);K 24.2f(0,b)}K E.2o(d,e,c)},2o:J(e,k,j){L d;J 3x(b){7(!E.14.2d)K S;L a=T.4c.4K(b,V);K!a||a.4M("3x")==""}7(k=="1w"&&E.14.1d){d=E.1J(e.W,"1w");K d==""?"1":d}7(E.14.2z&&k=="19"){L c=e.W.50;e.W.50="0 7r 7o";e.W.50=c}7(k.1D(/4g/i))k=y;7(!j&&e.W&&e.W[k])d=e.W[k];N 7(T.4c&&T.4c.4K){7(k.1D(/4g/i))k="4g";k=k.1r(/([A-Z])/g,"-$1").2h();L h=T.4c.4K(e,V);7(h&&!3x(e))d=h.4M(k);N{L f=[],2C=[];Q(L a=e;a&&3x(a);a=a.1a)2C.4J(a);Q(L i=0;i<2C.M;i++)7(3x(2C[i])){f[i]=2C[i].W.19;2C[i].W.19="3D"}d=k=="19"&&f[2C.M-1]!=V?"2H":(h&&h.4M(k))||"";Q(L i=0;i<f.M;i++)7(f[i]!=V)2C[i].W.19=f[i]}7(k=="1w"&&d=="")d="1"}N 7(e.4n){L g=k.1r(/\\-(\\w)/g,J(a,b){K b.2E()});d=e.4n[k]||e.4n[g];7(!/^\\d+(2S)?$/i.17(d)&&/^\\d/.17(d)){L l=e.W.26,3K=e.3K.26;e.3K.26=e.4n.26;e.W.26=d||0;d=e.W.7f+"2S";e.W.26=l;e.3K.26=3K}}K d},4a:J(l,h){L k=[];h=h||T;7(1o h.3s==\'10\')h=h.2i||h[0]&&h[0].2i||T;E.R(l,J(i,d){7(!d)K;7(d.1k==51)d=d.3X();7(1o d=="25"){d=d.1r(/(<(\\w+)[^>]*?)\\/>/g,J(b,a,c){K c.1D(/^(aa|a6|7e|a5|4D|7a|a0|3m|9W|9U|9S)$/i)?b:a+"></"+c+">"});L f=E.3g(d).2h(),1x=h.3s("1x");L e=!f.1f("<9P")&&[1,"<2k 74=\'74\'>","</2k>"]||!f.1f("<9M")&&[1,"<73>","</73>"]||f.1D(/^<(9G|1U|9E|9B|9x)/)&&[1,"<1O>","</1O>"]||!f.1f("<4v")&&[2,"<1O><1U>","</1U></1O>"]||(!f.1f("<9w")||!f.1f("<9v"))&&[3,"<1O><1U><4v>","</4v></1U></1O>"]||!f.1f("<7e")&&[2,"<1O><1U></1U><6V>","</6V></1O>"]||E.14.1d&&[1,"1x<1x>","</1x>"]||[0,"",""];1x.3d=e[1]+d+e[2];2b(e[0]--)1x=1x.5o;7(E.14.1d){L g=!f.1f("<1O")&&f.1f("<1U")<0?1x.1C&&1x.1C.3p:e[1]=="<1O>"&&f.1f("<1U")<0?1x.3p:[];Q(L j=g.M-1;j>=0;--j)7(E.12(g[j],"1U")&&!g[j].3p.M)g[j].1a.34(g[j]);7(/^\\s/.17(d))1x.3o(h.5r(d.1D(/^\\s*/)[0]),1x.1C)}d=E.2I(1x.3p)}7(d.M===0&&(!E.12(d,"3u")&&!E.12(d,"2k")))K;7(d[0]==10||E.12(d,"3u")||d.11)k.1g(d);N k=E.37(k,d)});K k},1J:J(d,e,c){7(!d||d.15==3||d.15==8)K 10;L f=E.3E(d)?{}:E.46;7(e=="2p"&&E.14.2d)d.1a.3T;7(f[e]){7(c!=10)d[f[e]]=c;K d[f[e]]}N 7(E.14.1d&&e=="W")K E.1J(d.W,"9u",c);N 7(c==10&&E.14.1d&&E.12(d,"3u")&&(e=="9r"||e=="9o"))K d.9m(e).6K;N 7(d.28){7(c!=10){7(e=="U"&&E.12(d,"4D")&&d.1a)6Q"U 9i 9h\'t 9g 9e";d.9b(e,""+c)}7(E.14.1d&&/6O|3Q/.17(e)&&!E.3E(d))K d.4z(e,2);K d.4z(e)}N{7(e=="1w"&&E.14.1d){7(c!=10){d.6k=1;d.1E=(d.1E||"").1r(/6M\\([^)]*\\)/,"")+(2M(c).3X()=="96"?"":"6M(1w="+c*6L+")")}K d.1E&&d.1E.1f("1w=")>=0?(2M(d.1E.1D(/1w=([^)]*)/)[1])/6L).3X():""}e=e.1r(/-([a-z])/95,J(a,b){K b.2E()});7(c!=10)d[e]=c;K d[e]}},3g:J(a){K(a||"").1r(/^\\s+|\\s+$/g,"")},2I:J(b){L a=[];7(1o b!="93")Q(L i=0,M=b.M;i<M;i++)a.1g(b[i]);N a=b.2K(0);K a},33:J(b,a){Q(L i=0,M=a.M;i<M;i++)7(a[i]==b)K i;K-1},37:J(a,b){7(E.14.1d){Q(L i=0;b[i];i++)7(b[i].15!=8)a.1g(b[i])}N Q(L i=0;b[i];i++)a.1g(b[i]);K a},57:J(a){L c=[],2r={};1S{Q(L i=0,M=a.M;i<M;i++){L b=E.O(a[i]);7(!2r[b]){2r[b]=P;c.1g(a[i])}}}1X(e){c=a}K c},3y:J(c,a,d){L b=[];Q(L i=0,M=c.M;i<M;i++)7(!d&&a(c[i],i)||d&&!a(c[i],i))b.1g(c[i]);K b},2c:J(d,a){L c=[];Q(L i=0,M=d.M;i<M;i++){L b=a(d[i],i);7(b!==V&&b!=10){7(b.1k!=1M)b=[b];c=c.71(b)}}K c}});L v=8Y.8W.2h();E.14={5K:(v.1D(/.+(?:8T|8S|8R|8O)[\\/: ]([\\d.]+)/)||[])[1],2d:/77/.17(v),2z:/2z/.17(v),1d:/1d/.17(v)&&!/2z/.17(v),48:/48/.17(v)&&!/(8L|77)/.17(v)};L y=E.14.1d?"6H":"75";E.1s({8I:!E.14.1d||T.6F=="79",46:{"Q":"8F","8E":"1t","4g":y,75:y,6H:y,3d:"3d",1t:"1t",1A:"1A",2Y:"2Y",3k:"3k",8C:"8B",2p:"2p",8A:"8z",3T:"3T",6C:"6C",28:"28",12:"12"}});E.R({6B:J(a){K a.1a},8y:J(a){K E.4u(a,"1a")},8x:J(a){K E.2Z(a,2,"2B")},8v:J(a){K E.2Z(a,2,"4t")},8u:J(a){K E.4u(a,"2B")},8t:J(a){K E.4u(a,"4t")},8s:J(a){K E.5i(a.1a.1C,a)},8r:J(a){K E.5i(a.1C)},6z:J(a){K E.12(a,"8q")?a.8o||a.8n.T:E.2I(a.3p)}},J(c,d){E.1n[c]=J(b){L a=E.2c(6,d);7(b&&1o b=="25")a=E.3e(b,a);K 6.2F(E.57(a))}});E.R({6y:"3t",8m:"6q",3o:"6o",8l:"5a",8k:"6S"},J(c,b){E.1n[c]=J(){L a=18;K 6.R(J(){Q(L i=0,M=a.M;i<M;i++)E(a[i])[b](6)})}});E.R({8j:J(a){E.1J(6,a,"");7(6.15==1)6.52(a)},8i:J(a){E.1t.1b(6,a)},8h:J(a){E.1t.1V(6,a)},8g:J(a){E.1t[E.1t.3Y(6,a)?"1V":"1b"](6,a)},1V:J(a){7(!a||E.1E(a,[6]).r.M){E("*",6).1b(6).R(J(){E.16.1V(6);E.35(6)});7(6.1a)6.1a.34(6)}},4x:J(){E(">*",6).1V();2b(6.1C)6.34(6.1C)}},J(a,b){E.1n[a]=J(){K 6.R(b,18)}});E.R(["8f","5X"],J(i,c){L b=c.2h();E.1n[b]=J(a){K 6[0]==1e?E.14.2z&&T.1h["5e"+c]||E.14.2d&&1e["8e"+c]||T.6F=="79"&&T.1F["5e"+c]||T.1h["5e"+c]:6[0]==T?24.2f(24.2f(T.1h["5d"+c],T.1F["5d"+c]),24.2f(T.1h["5L"+c],T.1F["5L"+c])):a==10?(6.M?E.1j(6[0],b):V):6.1j(b,a.1k==4e?a:a+"2S")}});L C=E.14.2d&&4s(E.14.5K)<8c?"(?:[\\\\w*4r-]|\\\\\\\\.)":"(?:[\\\\w\\8b-\\8a*4r-]|\\\\\\\\.)",6v=1B 4q("^>\\\\s*("+C+"+)"),6u=1B 4q("^("+C+"+)(#)("+C+"+)"),6s=1B 4q("^([#.]?)("+C+"*)");E.1s({6r:{"":J(a,i,m){K m[2]=="*"||E.12(a,m[2])},"#":J(a,i,m){K a.4z("2w")==m[2]},":":{89:J(a,i,m){K i<m[3]-0},88:J(a,i,m){K i>m[3]-0},2Z:J(a,i,m){K m[3]-0==i},6Z:J(a,i,m){K m[3]-0==i},3j:J(a,i){K i==0},3J:J(a,i,m,r){K i==r.M-1},6n:J(a,i){K i%2==0},6l:J(a,i){K i%2},"3j-4p":J(a){K a.1a.3S("*")[0]==a},"3J-4p":J(a){K E.2Z(a.1a.5o,1,"4t")==a},"83-4p":J(a){K!E.2Z(a.1a.5o,2,"4t")},6B:J(a){K a.1C},4x:J(a){K!a.1C},82:J(a,i,m){K(a.6x||a.81||E(a).1u()||"").1f(m[3])>=0},4d:J(a){K"1Z"!=a.U&&E.1j(a,"19")!="2H"&&E.1j(a,"4U")!="1Z"},1Z:J(a){K"1Z"==a.U||E.1j(a,"19")=="2H"||E.1j(a,"4U")=="1Z"},80:J(a){K!a.2Y},2Y:J(a){K a.2Y},3k:J(a){K a.3k},2p:J(a){K a.2p||E.1J(a,"2p")},1u:J(a){K"1u"==a.U},5u:J(a){K"5u"==a.U},5t:J(a){K"5t"==a.U},59:J(a){K"59"==a.U},3I:J(a){K"3I"==a.U},58:J(a){K"58"==a.U},6j:J(a){K"6j"==a.U},6i:J(a){K"6i"==a.U},2G:J(a){K"2G"==a.U||E.12(a,"2G")},4D:J(a){K/4D|2k|6h|2G/i.17(a.12)},3Y:J(a,i,m){K E.2s(m[3],a).M},7X:J(a){K/h\\d/i.17(a.12)},7W:J(a){K E.3y(E.3G,J(b){K a==b.Y}).M}}},6g:[/^(\\[) *@?([\\w-]+) *([!*$^~=]*) *(\'?"?)(.*?)\\4 *\\]/,/^(:)([\\w-]+)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/,1B 4q("^([:.#]*)("+C+"+)")],3e:J(a,c,b){L d,2m=[];2b(a&&a!=d){d=a;L f=E.1E(a,c,b);a=f.t.1r(/^\\s*,\\s*/,"");2m=b?c=f.r:E.37(2m,f.r)}K 2m},2s:J(t,p){7(1o t!="25")K[t];7(p&&p.15!=1&&p.15!=9)K[];p=p||T;L d=[p],2r=[],3J,12;2b(t&&3J!=t){L r=[];3J=t;t=E.3g(t);L o=S;L g=6v;L m=g.2O(t);7(m){12=m[1].2E();Q(L i=0;d[i];i++)Q(L c=d[i].1C;c;c=c.2B)7(c.15==1&&(12=="*"||c.12.2E()==12))r.1g(c);d=r;t=t.1r(g,"");7(t.1f(" ")==0)6w;o=P}N{g=/^([>+~])\\s*(\\w*)/i;7((m=g.2O(t))!=V){r=[];L l={};12=m[2].2E();m=m[1];Q(L j=0,3f=d.M;j<3f;j++){L n=m=="~"||m=="+"?d[j].2B:d[j].1C;Q(;n;n=n.2B)7(n.15==1){L h=E.O(n);7(m=="~"&&l[h])1Q;7(!12||n.12.2E()==12){7(m=="~")l[h]=P;r.1g(n)}7(m=="+")1Q}}d=r;t=E.3g(t.1r(g,""));o=P}}7(t&&!o){7(!t.1f(",")){7(p==d[0])d.4l();2r=E.37(2r,d);r=d=[p];t=" "+t.6e(1,t.M)}N{L k=6u;L m=k.2O(t);7(m){m=[0,m[2],m[3],m[1]]}N{k=6s;m=k.2O(t)}m[2]=m[2].1r(/\\\\/g,"");L f=d[d.M-1];7(m[1]=="#"&&f&&f.5J&&!E.3E(f)){L q=f.5J(m[2]);7((E.14.1d||E.14.2z)&&q&&1o q.2w=="25"&&q.2w!=m[2])q=E(\'[@2w="\'+m[2]+\'"]\',f)[0];d=r=q&&(!m[3]||E.12(q,m[3]))?[q]:[]}N{Q(L i=0;d[i];i++){L a=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];7(a=="*"&&d[i].12.2h()=="3V")a="3m";r=E.37(r,d[i].3S(a))}7(m[1]==".")r=E.55(r,m[2]);7(m[1]=="#"){L e=[];Q(L i=0;r[i];i++)7(r[i].4z("2w")==m[2]){e=[r[i]];1Q}r=e}d=r}t=t.1r(k,"")}}7(t){L b=E.1E(t,r);d=r=b.r;t=E.3g(b.t)}}7(t)d=[];7(d&&p==d[0])d.4l();2r=E.37(2r,d);K 2r},55:J(r,m,a){m=" "+m+" ";L c=[];Q(L i=0;r[i];i++){L b=(" "+r[i].1t+" ").1f(m)>=0;7(!a&&b||a&&!b)c.1g(r[i])}K c},1E:J(t,r,h){L d;2b(t&&t!=d){d=t;L p=E.6g,m;Q(L i=0;p[i];i++){m=p[i].2O(t);7(m){t=t.7V(m[0].M);m[2]=m[2].1r(/\\\\/g,"");1Q}}7(!m)1Q;7(m[1]==":"&&m[2]=="56")r=G.17(m[3])?E.1E(m[3],r,P).r:E(r).56(m[3]);N 7(m[1]==".")r=E.55(r,m[2],h);N 7(m[1]=="["){L g=[],U=m[3];Q(L i=0,3f=r.M;i<3f;i++){L a=r[i],z=a[E.46[m[2]]||m[2]];7(z==V||/6O|3Q|2p/.17(m[2]))z=E.1J(a,m[2])||\'\';7((U==""&&!!z||U=="="&&z==m[5]||U=="!="&&z!=m[5]||U=="^="&&z&&!z.1f(m[5])||U=="$="&&z.6e(z.M-m[5].M)==m[5]||(U=="*="||U=="~=")&&z.1f(m[5])>=0)^h)g.1g(a)}r=g}N 7(m[1]==":"&&m[2]=="2Z-4p"){L e={},g=[],17=/(-?)(\\d*)n((?:\\+|-)?\\d*)/.2O(m[3]=="6n"&&"2n"||m[3]=="6l"&&"2n+1"||!/\\D/.17(m[3])&&"7U+"+m[3]||m[3]),3j=(17[1]+(17[2]||1))-0,d=17[3]-0;Q(L i=0,3f=r.M;i<3f;i++){L j=r[i],1a=j.1a,2w=E.O(1a);7(!e[2w]){L c=1;Q(L n=1a.1C;n;n=n.2B)7(n.15==1)n.4k=c++;e[2w]=P}L b=S;7(3j==0){7(j.4k==d)b=P}N 7((j.4k-d)%3j==0&&(j.4k-d)/3j>=0)b=P;7(b^h)g.1g(j)}r=g}N{L f=E.6r[m[1]];7(1o f=="3V")f=f[m[2]];7(1o f=="25")f=6c("S||J(a,i){K "+f+";}");r=E.3y(r,J(a,i){K f(a,i,m,r)},h)}}K{r:r,t:t}},4u:J(b,c){L d=[];L a=b[c];2b(a&&a!=T){7(a.15==1)d.1g(a);a=a[c]}K d},2Z:J(a,e,c,b){e=e||1;L d=0;Q(;a;a=a[c])7(a.15==1&&++d==e)1Q;K a},5i:J(n,a){L r=[];Q(;n;n=n.2B){7(n.15==1&&(!a||n!=a))r.1g(n)}K r}});E.16={1b:J(f,i,g,e){7(f.15==3||f.15==8)K;7(E.14.1d&&f.53!=10)f=1e;7(!g.2D)g.2D=6.2D++;7(e!=10){L h=g;g=J(){K h.1i(6,18)};g.O=e;g.2D=h.2D}L j=E.O(f,"2R")||E.O(f,"2R",{}),1v=E.O(f,"1v")||E.O(f,"1v",J(){L a;7(1o E=="10"||E.16.5f)K a;a=E.16.1v.1i(18.3R.Y,18);K a});1v.Y=f;E.R(i.23(/\\s+/),J(c,b){L a=b.23(".");b=a[0];g.U=a[1];L d=j[b];7(!d){d=j[b]={};7(!E.16.2y[b]||E.16.2y[b].4j.1P(f)===S){7(f.3F)f.3F(b,1v,S);N 7(f.6b)f.6b("4i"+b,1v)}}d[g.2D]=g;E.16.2a[b]=P});f=V},2D:1,2a:{},1V:J(e,h,f){7(e.15==3||e.15==8)K;L i=E.O(e,"2R"),29,4X;7(i){7(h==10||(1o h=="25"&&h.7T(0)=="."))Q(L g 1p i)6.1V(e,g+(h||""));N{7(h.U){f=h.2q;h=h.U}E.R(h.23(/\\s+/),J(b,a){L c=a.23(".");a=c[0];7(i[a]){7(f)2V i[a][f.2D];N Q(f 1p i[a])7(!c[1]||i[a][f].U==c[1])2V i[a][f];Q(29 1p i[a])1Q;7(!29){7(!E.16.2y[a]||E.16.2y[a].4h.1P(e)===S){7(e.67)e.67(a,E.O(e,"1v"),S);N 7(e.66)e.66("4i"+a,E.O(e,"1v"))}29=V;2V i[a]}}})}Q(29 1p i)1Q;7(!29){L d=E.O(e,"1v");7(d)d.Y=V;E.35(e,"2R");E.35(e,"1v")}}},1N:J(g,c,d,f,h){c=E.2I(c||[]);7(g.1f("!")>=0){g=g.2K(0,-1);L a=P}7(!d){7(6.2a[g])E("*").1b([1e,T]).1N(g,c)}N{7(d.15==3||d.15==8)K 10;L b,29,1n=E.1q(d[g]||V),16=!c[0]||!c[0].36;7(16)c.4J(6.4Z({U:g,2L:d}));c[0].U=g;7(a)c[0].65=P;7(E.1q(E.O(d,"1v")))b=E.O(d,"1v").1i(d,c);7(!1n&&d["4i"+g]&&d["4i"+g].1i(d,c)===S)b=S;7(16)c.4l();7(h&&E.1q(h)){29=h.1i(d,b==V?c:c.71(b));7(29!==10)b=29}7(1n&&f!==S&&b!==S&&!(E.12(d,\'a\')&&g=="4V")){6.5f=P;1S{d[g]()}1X(e){}}6.5f=S}K b},1v:J(c){L a;c=E.16.4Z(c||1e.16||{});L b=c.U.23(".");c.U=b[0];L f=E.O(6,"2R")&&E.O(6,"2R")[c.U],42=1M.2l.2K.1P(18,1);42.4J(c);Q(L j 1p f){L d=f[j];42[0].2q=d;42[0].O=d.O;7(!b[1]&&!c.65||d.U==b[1]){L e=d.1i(6,42);7(a!==S)a=e;7(e===S){c.36();c.44()}}}7(E.14.1d)c.2L=c.36=c.44=c.2q=c.O=V;K a},4Z:J(c){L a=c;c=E.1s({},a);c.36=J(){7(a.36)a.36();a.7S=S};c.44=J(){7(a.44)a.44();a.7R=P};7(!c.2L)c.2L=c.7Q||T;7(c.2L.15==3)c.2L=a.2L.1a;7(!c.4S&&c.5w)c.4S=c.5w==c.2L?c.7P:c.5w;7(c.64==V&&c.63!=V){L b=T.1F,1h=T.1h;c.64=c.63+(b&&b.2v||1h&&1h.2v||0)-(b.62||0);c.7N=c.7L+(b&&b.2x||1h&&1h.2x||0)-(b.60||0)}7(!c.3c&&((c.4f||c.4f===0)?c.4f:c.5Z))c.3c=c.4f||c.5Z;7(!c.7b&&c.5Y)c.7b=c.5Y;7(!c.3c&&c.2G)c.3c=(c.2G&1?1:(c.2G&2?3:(c.2G&4?2:0)));K c},2y:{21:{4j:J(){5M();K},4h:J(){K}},3C:{4j:J(){7(E.14.1d)K S;E(6).2j("4P",E.16.2y.3C.2q);K P},4h:J(){7(E.14.1d)K S;E(6).3w("4P",E.16.2y.3C.2q);K P},2q:J(a){7(I(a,6))K P;18[0].U="3C";K E.16.1v.1i(6,18)}},3B:{4j:J(){7(E.14.1d)K S;E(6).2j("4O",E.16.2y.3B.2q);K P},4h:J(){7(E.14.1d)K S;E(6).3w("4O",E.16.2y.3B.2q);K P},2q:J(a){7(I(a,6))K P;18[0].U="3B";K E.16.1v.1i(6,18)}}}};E.1n.1s({2j:J(c,a,b){K c=="4H"?6.2X(c,a,b):6.R(J(){E.16.1b(6,c,b||a,b&&a)})},2X:J(d,b,c){K 6.R(J(){E.16.1b(6,d,J(a){E(6).3w(a);K(c||b).1i(6,18)},c&&b)})},3w:J(a,b){K 6.R(J(){E.16.1V(6,a,b)})},1N:J(c,a,b){K 6.R(J(){E.16.1N(c,a,6,P,b)})},5n:J(c,a,b){7(6[0])K E.16.1N(c,a,6[0],S,b);K 10},2g:J(){L b=18;K 6.4V(J(a){6.4N=0==6.4N?1:0;a.36();K b[6.4N].1i(6,18)||S})},7D:J(a,b){K 6.2j(\'3C\',a).2j(\'3B\',b)},21:J(a){5M();7(E.2Q)a.1P(T,E);N E.3A.1g(J(){K a.1P(6,E)});K 6}});E.1s({2Q:S,3A:[],21:J(){7(!E.2Q){E.2Q=P;7(E.3A){E.R(E.3A,J(){6.1i(T)});E.3A=V}E(T).5n("21")}}});L x=S;J 5M(){7(x)K;x=P;7(T.3F&&!E.14.2z)T.3F("5W",E.21,S);7(E.14.1d&&1e==3b)(J(){7(E.2Q)K;1S{T.1F.7B("26")}1X(3a){3z(18.3R,0);K}E.21()})();7(E.14.2z)T.3F("5W",J(){7(E.2Q)K;Q(L i=0;i<T.4L.M;i++)7(T.4L[i].2Y){3z(18.3R,0);K}E.21()},S);7(E.14.2d){L a;(J(){7(E.2Q)K;7(T.39!="5V"&&T.39!="1y"){3z(18.3R,0);K}7(a===10)a=E("W, 7a[7A=7z]").M;7(T.4L.M!=a){3z(18.3R,0);K}E.21()})()}E.16.1b(1e,"3U",E.21)}E.R(("7y,7x,3U,7w,5d,4H,4V,7v,"+"7G,7u,7t,4P,4O,7s,2k,"+"58,7K,7q,7p,3a").23(","),J(i,b){E.1n[b]=J(a){K a?6.2j(b,a):6.1N(b)}});L I=J(a,c){L b=a.4S;2b(b&&b!=c)1S{b=b.1a}1X(3a){b=c}K b==c};E(1e).2j("4H",J(){E("*").1b(T).3w()});E.1n.1s({3U:J(g,d,c){7(E.1q(g))K 6.2j("3U",g);L e=g.1f(" ");7(e>=0){L i=g.2K(e,g.M);g=g.2K(0,e)}c=c||J(){};L f="4Q";7(d)7(E.1q(d)){c=d;d=V}N{d=E.3m(d);f="61"}L h=6;E.3P({1c:g,U:f,1H:"3q",O:d,1y:J(a,b){7(b=="1W"||b=="5U")h.3q(i?E("<1x/>").3t(a.4b.1r(/<1m(.|\\s)*?\\/1m>/g,"")).2s(i):a.4b);h.R(c,[a.4b,b,a])}});K 6},7n:J(){K E.3m(6.5T())},5T:J(){K 6.2c(J(){K E.12(6,"3u")?E.2I(6.7m):6}).1E(J(){K 6.31&&!6.2Y&&(6.3k||/2k|6h/i.17(6.12)||/1u|1Z|3I/i.17(6.U))}).2c(J(i,c){L b=E(6).5O();K b==V?V:b.1k==1M?E.2c(b,J(a,i){K{31:c.31,1A:a}}):{31:c.31,1A:b}}).22()}});E.R("5S,6d,5R,6D,5Q,6m".23(","),J(i,o){E.1n[o]=J(f){K 6.2j(o,f)}});L B=(1B 3v).3L();E.1s({22:J(d,b,a,c){7(E.1q(b)){a=b;b=V}K E.3P({U:"4Q",1c:d,O:b,1W:a,1H:c})},7l:J(b,a){K E.22(b,V,a,"1m")},7k:J(c,b,a){K E.22(c,b,a,"3i")},7i:J(d,b,a,c){7(E.1q(b)){a=b;b={}}K E.3P({U:"61",1c:d,O:b,1W:a,1H:c})},85:J(a){E.1s(E.4I,a)},4I:{2a:P,U:"4Q",2U:0,5P:"4o/x-7h-3u-7g",5N:P,3l:P,O:V,6p:V,3I:V,49:{3M:"4o/3M, 1u/3M",3q:"1u/3q",1m:"1u/4m, 4o/4m",3i:"4o/3i, 1u/4m",1u:"1u/a7",4G:"*/*"}},4F:{},3P:J(s){L f,2W=/=\\?(&|$)/g,1z,O;s=E.1s(P,s,E.1s(P,{},E.4I,s));7(s.O&&s.5N&&1o s.O!="25")s.O=E.3m(s.O);7(s.1H=="4E"){7(s.U.2h()=="22"){7(!s.1c.1D(2W))s.1c+=(s.1c.1D(/\\?/)?"&":"?")+(s.4E||"7d")+"=?"}N 7(!s.O||!s.O.1D(2W))s.O=(s.O?s.O+"&":"")+(s.4E||"7d")+"=?";s.1H="3i"}7(s.1H=="3i"&&(s.O&&s.O.1D(2W)||s.1c.1D(2W))){f="4E"+B++;7(s.O)s.O=(s.O+"").1r(2W,"="+f+"$1");s.1c=s.1c.1r(2W,"="+f+"$1");s.1H="1m";1e[f]=J(a){O=a;1W();1y();1e[f]=10;1S{2V 1e[f]}1X(e){}7(h)h.34(g)}}7(s.1H=="1m"&&s.1T==V)s.1T=S;7(s.1T===S&&s.U.2h()=="22"){L i=(1B 3v()).3L();L j=s.1c.1r(/(\\?|&)4r=.*?(&|$)/,"$a4="+i+"$2");s.1c=j+((j==s.1c)?(s.1c.1D(/\\?/)?"&":"?")+"4r="+i:"")}7(s.O&&s.U.2h()=="22"){s.1c+=(s.1c.1D(/\\?/)?"&":"?")+s.O;s.O=V}7(s.2a&&!E.5H++)E.16.1N("5S");7((!s.1c.1f("a3")||!s.1c.1f("//"))&&s.1H=="1m"&&s.U.2h()=="22"){L h=T.3S("6f")[0];L g=T.3s("1m");g.3Q=s.1c;7(s.7c)g.a2=s.7c;7(!f){L l=S;g.9Z=g.9Y=J(){7(!l&&(!6.39||6.39=="5V"||6.39=="1y")){l=P;1W();1y();h.34(g)}}}h.38(g);K 10}L m=S;L k=1e.78?1B 78("9X.9V"):1B 76();k.9T(s.U,s.1c,s.3l,s.6p,s.3I);1S{7(s.O)k.4C("9R-9Q",s.5P);7(s.5C)k.4C("9O-5A-9N",E.4F[s.1c]||"9L, 9K 9I 9H 5z:5z:5z 9F");k.4C("X-9C-9A","76");k.4C("9z",s.1H&&s.49[s.1H]?s.49[s.1H]+", */*":s.49.4G)}1X(e){}7(s.6Y)s.6Y(k);7(s.2a)E.16.1N("6m",[k,s]);L c=J(a){7(!m&&k&&(k.39==4||a=="2U")){m=P;7(d){6I(d);d=V}1z=a=="2U"&&"2U"||!E.6X(k)&&"3a"||s.5C&&E.6J(k,s.1c)&&"5U"||"1W";7(1z=="1W"){1S{O=E.6W(k,s.1H)}1X(e){1z="5x"}}7(1z=="1W"){L b;1S{b=k.5q("6U-5A")}1X(e){}7(s.5C&&b)E.4F[s.1c]=b;7(!f)1W()}N E.5v(s,k,1z);1y();7(s.3l)k=V}};7(s.3l){L d=53(c,13);7(s.2U>0)3z(J(){7(k){k.9t();7(!m)c("2U")}},s.2U)}1S{k.9s(s.O)}1X(e){E.5v(s,k,V,e)}7(!s.3l)c();J 1W(){7(s.1W)s.1W(O,1z);7(s.2a)E.16.1N("5Q",[k,s])}J 1y(){7(s.1y)s.1y(k,1z);7(s.2a)E.16.1N("5R",[k,s]);7(s.2a&&!--E.5H)E.16.1N("6d")}K k},5v:J(s,a,b,e){7(s.3a)s.3a(a,b,e);7(s.2a)E.16.1N("6D",[a,s,e])},5H:0,6X:J(r){1S{K!r.1z&&9q.9p=="59:"||(r.1z>=6T&&r.1z<9n)||r.1z==6R||r.1z==9l||E.14.2d&&r.1z==10}1X(e){}K S},6J:J(a,c){1S{L b=a.5q("6U-5A");K a.1z==6R||b==E.4F[c]||E.14.2d&&a.1z==10}1X(e){}K S},6W:J(r,b){L c=r.5q("9k-U");L d=b=="3M"||!b&&c&&c.1f("3M")>=0;L a=d?r.9j:r.4b;7(d&&a.1F.28=="5x")6Q"5x";7(b=="1m")E.5g(a);7(b=="3i")a=6c("("+a+")");K a},3m:J(a){L s=[];7(a.1k==1M||a.5h)E.R(a,J(){s.1g(3r(6.31)+"="+3r(6.1A))});N Q(L j 1p a)7(a[j]&&a[j].1k==1M)E.R(a[j],J(){s.1g(3r(j)+"="+3r(6))});N s.1g(3r(j)+"="+3r(a[j]));K s.6a("&").1r(/%20/g,"+")}});E.1n.1s({1G:J(c,b){K c?6.2e({1R:"1G",27:"1G",1w:"1G"},c,b):6.1E(":1Z").R(J(){6.W.19=6.5s||"";7(E.1j(6,"19")=="2H"){L a=E("<"+6.28+" />").6y("1h");6.W.19=a.1j("19");7(6.W.19=="2H")6.W.19="3D";a.1V()}}).3h()},1I:J(b,a){K b?6.2e({1R:"1I",27:"1I",1w:"1I"},b,a):6.1E(":4d").R(J(){6.5s=6.5s||E.1j(6,"19");6.W.19="2H"}).3h()},6N:E.1n.2g,2g:J(a,b){K E.1q(a)&&E.1q(b)?6.6N(a,b):a?6.2e({1R:"2g",27:"2g",1w:"2g"},a,b):6.R(J(){E(6)[E(6).3H(":1Z")?"1G":"1I"]()})},9f:J(b,a){K 6.2e({1R:"1G"},b,a)},9d:J(b,a){K 6.2e({1R:"1I"},b,a)},9c:J(b,a){K 6.2e({1R:"2g"},b,a)},9a:J(b,a){K 6.2e({1w:"1G"},b,a)},99:J(b,a){K 6.2e({1w:"1I"},b,a)},97:J(c,a,b){K 6.2e({1w:a},c,b)},2e:J(l,k,j,h){L i=E.6P(k,j,h);K 6[i.2P===S?"R":"2P"](J(){7(6.15!=1)K S;L g=E.1s({},i);L f=E(6).3H(":1Z"),4A=6;Q(L p 1p l){7(l[p]=="1I"&&f||l[p]=="1G"&&!f)K E.1q(g.1y)&&g.1y.1i(6);7(p=="1R"||p=="27"){g.19=E.1j(6,"19");g.32=6.W.32}}7(g.32!=V)6.W.32="1Z";g.40=E.1s({},l);E.R(l,J(c,a){L e=1B E.2t(4A,g,c);7(/2g|1G|1I/.17(a))e[a=="2g"?f?"1G":"1I":a](l);N{L b=a.3X().1D(/^([+-]=)?([\\d+-.]+)(.*)$/),1Y=e.2m(P)||0;7(b){L d=2M(b[2]),2A=b[3]||"2S";7(2A!="2S"){4A.W[c]=(d||1)+2A;1Y=((d||1)/e.2m(P))*1Y;4A.W[c]=1Y+2A}7(b[1])d=((b[1]=="-="?-1:1)*d)+1Y;e.45(1Y,d,2A)}N e.45(1Y,a,"")}});K P})},2P:J(a,b){7(E.1q(a)||(a&&a.1k==1M)){b=a;a="2t"}7(!a||(1o a=="25"&&!b))K A(6[0],a);K 6.R(J(){7(b.1k==1M)A(6,a,b);N{A(6,a).1g(b);7(A(6,a).M==1)b.1i(6)}})},94:J(b,c){L a=E.3G;7(b)6.2P([]);6.R(J(){Q(L i=a.M-1;i>=0;i--)7(a[i].Y==6){7(c)a[i](P);a.72(i,1)}});7(!c)6.5p();K 6}});L A=J(b,c,a){7(!b)K 10;c=c||"2t";L q=E.O(b,c+"2P");7(!q||a)q=E.O(b,c+"2P",a?E.2I(a):[]);K q};E.1n.5p=J(a){a=a||"2t";K 6.R(J(){L q=A(6,a);q.4l();7(q.M)q[0].1i(6)})};E.1s({6P:J(b,a,c){L d=b&&b.1k==92?b:{1y:c||!c&&a||E.1q(b)&&b,2u:b,3Z:c&&a||a&&a.1k!=91&&a};d.2u=(d.2u&&d.2u.1k==51?d.2u:{90:8Z,9D:6T}[d.2u])||8X;d.5y=d.1y;d.1y=J(){7(d.2P!==S)E(6).5p();7(E.1q(d.5y))d.5y.1i(6)};K d},3Z:{70:J(p,n,b,a){K b+a*p},5j:J(p,n,b,a){K((-24.8V(p*24.8U)/2)+0.5)*a+b}},3G:[],3W:V,2t:J(b,c,a){6.11=c;6.Y=b;6.1l=a;7(!c.47)c.47={}}});E.2t.2l={4y:J(){7(6.11.30)6.11.30.1i(6.Y,[6.2J,6]);(E.2t.30[6.1l]||E.2t.30.4G)(6);7(6.1l=="1R"||6.1l=="27")6.Y.W.19="3D"},2m:J(a){7(6.Y[6.1l]!=V&&6.Y.W[6.1l]==V)K 6.Y[6.1l];L r=2M(E.1j(6.Y,6.1l,a));K r&&r>-8Q?r:2M(E.2o(6.Y,6.1l))||0},45:J(c,b,d){6.5B=(1B 3v()).3L();6.1Y=c;6.3h=b;6.2A=d||6.2A||"2S";6.2J=6.1Y;6.4B=6.4w=0;6.4y();L e=6;J t(a){K e.30(a)}t.Y=6.Y;E.3G.1g(t);7(E.3W==V){E.3W=53(J(){L a=E.3G;Q(L i=0;i<a.M;i++)7(!a[i]())a.72(i--,1);7(!a.M){6I(E.3W);E.3W=V}},13)}},1G:J(){6.11.47[6.1l]=E.1J(6.Y.W,6.1l);6.11.1G=P;6.45(0,6.2m());7(6.1l=="27"||6.1l=="1R")6.Y.W[6.1l]="8N";E(6.Y).1G()},1I:J(){6.11.47[6.1l]=E.1J(6.Y.W,6.1l);6.11.1I=P;6.45(6.2m(),0)},30:J(a){L t=(1B 3v()).3L();7(a||t>6.11.2u+6.5B){6.2J=6.3h;6.4B=6.4w=1;6.4y();6.11.40[6.1l]=P;L b=P;Q(L i 1p 6.11.40)7(6.11.40[i]!==P)b=S;7(b){7(6.11.19!=V){6.Y.W.32=6.11.32;6.Y.W.19=6.11.19;7(E.1j(6.Y,"19")=="2H")6.Y.W.19="3D"}7(6.11.1I)6.Y.W.19="2H";7(6.11.1I||6.11.1G)Q(L p 1p 6.11.40)E.1J(6.Y.W,p,6.11.47[p])}7(b&&E.1q(6.11.1y))6.11.1y.1i(6.Y);K S}N{L n=t-6.5B;6.4w=n/6.11.2u;6.4B=E.3Z[6.11.3Z||(E.3Z.5j?"5j":"70")](6.4w,n,0,1,6.11.2u);6.2J=6.1Y+((6.3h-6.1Y)*6.4B);6.4y()}K P}};E.2t.30={2v:J(a){a.Y.2v=a.2J},2x:J(a){a.Y.2x=a.2J},1w:J(a){E.1J(a.Y.W,"1w",a.2J)},4G:J(a){a.Y.W[a.1l]=a.2J+a.2A}};E.1n.5L=J(){L b=0,3b=0,Y=6[0],5l;7(Y)8M(E.14){L d=Y.1a,41=Y,1K=Y.1K,1L=Y.2i,5D=2d&&4s(5K)<8J&&!/a1/i.17(v),2T=E.1j(Y,"43")=="2T";7(Y.6G){L c=Y.6G();1b(c.26+24.2f(1L.1F.2v,1L.1h.2v),c.3b+24.2f(1L.1F.2x,1L.1h.2x));1b(-1L.1F.62,-1L.1F.60)}N{1b(Y.5G,Y.5F);2b(1K){1b(1K.5G,1K.5F);7(48&&!/^t(8H|d|h)$/i.17(1K.28)||2d&&!5D)2N(1K);7(!2T&&E.1j(1K,"43")=="2T")2T=P;41=/^1h$/i.17(1K.28)?41:1K;1K=1K.1K}2b(d&&d.28&&!/^1h|3q$/i.17(d.28)){7(!/^8G|1O.*$/i.17(E.1j(d,"19")))1b(-d.2v,-d.2x);7(48&&E.1j(d,"32")!="4d")2N(d);d=d.1a}7((5D&&(2T||E.1j(41,"43")=="4W"))||(48&&E.1j(41,"43")!="4W"))1b(-1L.1h.5G,-1L.1h.5F);7(2T)1b(24.2f(1L.1F.2v,1L.1h.2v),24.2f(1L.1F.2x,1L.1h.2x))}5l={3b:3b,26:b}}J 2N(a){1b(E.2o(a,"a8",P),E.2o(a,"a9",P))}J 1b(l,t){b+=4s(l)||0;3b+=4s(t)||0}K 5l}})();',62,631,'||||||this|if||||||||||||||||||||||||||||||||||||||function|return|var|length|else|data|true|for|each|false|document|type|null|style||elem||undefined|options|nodeName||browser|nodeType|event|test|arguments|display|parentNode|add|url|msie|window|indexOf|push|body|apply|css|constructor|prop|script|fn|typeof|in|isFunction|replace|extend|className|text|handle|opacity|div|complete|status|value|new|firstChild|match|filter|documentElement|show|dataType|hide|attr|offsetParent|doc|Array|trigger|table|call|break|height|try|cache|tbody|remove|success|catch|start|hidden||ready|get|split|Math|string|left|width|tagName|ret|global|while|map|safari|animate|max|toggle|toLowerCase|ownerDocument|bind|select|prototype|cur||curCSS|selected|handler|done|find|fx|duration|scrollLeft|id|scrollTop|special|opera|unit|nextSibling|stack|guid|toUpperCase|pushStack|button|none|makeArray|now|slice|target|parseFloat|border|exec|queue|isReady|events|px|fixed|timeout|delete|jsre|one|disabled|nth|step|name|overflow|inArray|removeChild|removeData|preventDefault|merge|appendChild|readyState|error|top|which|innerHTML|multiFilter|rl|trim|end|json|first|checked|async|param|elems|insertBefore|childNodes|html|encodeURIComponent|createElement|append|form|Date|unbind|color|grep|setTimeout|readyList|mouseleave|mouseenter|block|isXMLDoc|addEventListener|timers|is|password|last|runtimeStyle|getTime|xml|jQuery|domManip|ajax|src|callee|getElementsByTagName|selectedIndex|load|object|timerId|toString|has|easing|curAnim|offsetChild|args|position|stopPropagation|custom|props|orig|mozilla|accepts|clean|responseText|defaultView|visible|String|charCode|float|teardown|on|setup|nodeIndex|shift|javascript|currentStyle|application|child|RegExp|_|parseInt|previousSibling|dir|tr|state|empty|update|getAttribute|self|pos|setRequestHeader|input|jsonp|lastModified|_default|unload|ajaxSettings|unshift|getComputedStyle|styleSheets|getPropertyValue|lastToggle|mouseout|mouseover|GET|andSelf|relatedTarget|init|visibility|click|absolute|index|container|fix|outline|Number|removeAttribute|setInterval|prevObject|classFilter|not|unique|submit|file|after|windowData|deep|scroll|client|triggered|globalEval|jquery|sibling|swing|clone|results|wrapAll|triggerHandler|lastChild|dequeue|getResponseHeader|createTextNode|oldblock|checkbox|radio|handleError|fromElement|parsererror|old|00|Modified|startTime|ifModified|safari2|getWH|offsetTop|offsetLeft|active|values|getElementById|version|offset|bindReady|processData|val|contentType|ajaxSuccess|ajaxComplete|ajaxStart|serializeArray|notmodified|loaded|DOMContentLoaded|Width|ctrlKey|keyCode|clientTop|POST|clientLeft|clientX|pageX|exclusive|detachEvent|removeEventListener|swap|cloneNode|join|attachEvent|eval|ajaxStop|substr|head|parse|textarea|reset|image|zoom|odd|ajaxSend|even|before|username|prepend|expr|quickClass|uuid|quickID|quickChild|continue|textContent|appendTo|contents|evalScript|parent|defaultValue|ajaxError|setArray|compatMode|getBoundingClientRect|styleFloat|clearInterval|httpNotModified|nodeValue|100|alpha|_toggle|href|speed|throw|304|replaceWith|200|Last|colgroup|httpData|httpSuccess|beforeSend|eq|linear|concat|splice|fieldset|multiple|cssFloat|XMLHttpRequest|webkit|ActiveXObject|CSS1Compat|link|metaKey|scriptCharset|callback|col|pixelLeft|urlencoded|www|post|hasClass|getJSON|getScript|elements|serialize|black|keyup|keypress|solid|change|mousemove|mouseup|dblclick|resize|focus|blur|stylesheet|rel|doScroll|round|hover|padding|offsetHeight|mousedown|offsetWidth|Bottom|Top|keydown|clientY|Right|pageY|Left|toElement|srcElement|cancelBubble|returnValue|charAt|0n|substring|animated|header|noConflict|line|enabled|innerText|contains|only|weight|ajaxSetup|font|size|gt|lt|uFFFF|u0128|417|Boolean|inner|Height|toggleClass|removeClass|addClass|removeAttr|replaceAll|insertAfter|prependTo|contentWindow|contentDocument|wrap|iframe|children|siblings|prevAll|nextAll|prev|wrapInner|next|parents|maxLength|maxlength|readOnly|readonly|reverse|class|htmlFor|inline|able|boxModel|522|setData|compatible|with|1px|ie|getData|10000|ra|it|rv|PI|cos|userAgent|400|navigator|600|slow|Function|Object|array|stop|ig|NaN|fadeTo|option|fadeOut|fadeIn|setAttribute|slideToggle|slideUp|changed|slideDown|be|can|property|responseXML|content|1223|getAttributeNode|300|method|protocol|location|action|send|abort|cssText|th|td|cap|specified|Accept|With|colg|Requested|fast|tfoot|GMT|thead|1970|Jan|attributes|01|Thu|leg|Since|If|opt|Type|Content|embed|open|area|XMLHTTP|hr|Microsoft|onreadystatechange|onload|meta|adobeair|charset|http|1_|img|br|plain|borderLeftWidth|borderTopWidth|abbr'.split('|'),0,{}));

//try {
if (true) {
	var btime = new Date();
	var temp = new Date();
	var dodge_time = new Date();
	var server_time = new Date();
	var version = "v0.2";
	var interval = 1000;
	var td = 2700;
	var dodge_count = 0;
	var timeZone = 7*3600*1000;
	var tc = 500; 
	var mm = 0;
	var t0 = null;
	var rStep = 10;
	var br = false;
	var rhtml = "";
	var iCount = 1;
	var toolbar = true;
	var postvar = "";
	var unitsArray = ["spear","sword","axe","spy","light","heavy","ram","catapult","knight","snob","Militia"];
	var diffs = ["","","","","","","","","","","","","","","","",""];
	var pid = 0;
	var vid = 0;
	var coord = "999|999";
	var curVillage = 0;
	var villages_count = 1;
	var incoming = 0;
	var sitter_id = 0;
	var points = 0;
	var ranking = 0;
	var scripts = $("script");
	//GM_log(scripts.length);
	for (var i=0;i<scripts.length;i++) {
		if (scripts[i].innerHTML.indexOf("game_data") != -1) {
			gamedata = scripts[i].innerHTML.split("var game_data = {")[1].split("};")[0].split(":{");		
			//GM_log(gamedata[1].split("}")[0]);
			//GM_log(gamedata[2]);
			pid = gamedata[1].split(",")[0].split(":")[1].replace('"','').replace('"','');
			pname = gamedata[1].split(",")[1].split(":")[1].replace('"','').replace('"','');
			villages_count = parseInt(gamedata[1].split(",")[3].split(":")[1].replace('"','').replace('"',''));
			incoming = parseInt(gamedata[1].split(",")[6].split(":")[1].replace('"','').replace('"',''));
			sitter_id = parseInt(gamedata[1].split(",")[7].split(":")[1].replace('"','').replace('"',''));
			points = parseInt(gamedata[1].split(",")[4].split(":")[1].replace('"','').replace('"',''));
			ranking = parseInt(gamedata[1].split(",")[5].split(":")[1].replace('"','').replace('"',''));

			vid = gamedata[2].split(",")[0].split(":")[1].replace('"','').replace('"','');
			curVillage = vid;
			vname = gamedata[2].split(",")[1].split(":")[1].replace('"','').replace('"','');
			coord = gamedata[2].split(",")[2].split(":")[1].replace('"','').replace('"','').split('|');
			con = gamedata[2].split(",")[3].split(":")[1].replace('"','').replace('"','');
			//GM_log(pid);
			//GM_log(vid);
			//GM_log(points+"     "+ranking);
		}
	}
	var Premium =($("quickbar").length > 0) ? true : false;
	var Screen = location.href.replace(/^(.+)\/(\w+)\.php(.+)screen=(\w+)(.*)$/i,"$4");
	var Page =   location.href.replace(/^(.+)\/(\w+)\.php(.+)screen=(\w+)(.*)$/i,"$2");
	var World =  location.href.replace(/^http:\/\/(\w+)\.(\w+)\.(\w+)\/(.*)$/i,"$1");
	var Server = location.href.replace(/^(.+)\/(\w+)\.php(.*)$/i,"$1");
	var _Unique = World+"_"+pid;
		//GM_log("server:"+Server);
	var imgbase = "graphic";
	var menu_xhtml = "";
	var strRC = "";
	var total = 0;  
	
	var dodge_target = {
			url: "",
			x: "515",
			y: "529",
			action_id: "9999",
			action: "command",
			h: "999",
			spear: "0",
			sword: "0",
			axe: "0",
			spy: "0",
			light: "0",
			heavy: "0",
			ram: "0",
			catapult: "0",
			snob: "0",
			Militia: "0",
			sumbit: "OK",
			attack: "true",
			support: "false"
		}
	var farm_target = {
			url: "",
			vid: "",
			x: "515",
			y: "529",
			action_id: "",
			action: "command",
			h: "",
			ch: "",
			spec_name: "",
			spec_value: "",
			spear: "0",
			sword: "0",
			axe: "0",
			spy: "1",
			light: "0",
			heavy: "0",
			ram: "0",
			catapult: "0",
			snob: "0",
			Militia: "0",
			sumbit: "OK",
			attack: "true"
		}
	var FarmArray = [];
	var priceArray = [0,90,130,130,120,475,950,700,820,80,140000,0];
	var peopleArray = [ 0, 1, 1, 1, 2, 4, 6, 5, 8, 100,0,0,0,0];
	var speedArray = [18, 22, 18, 9, 10, 11, 30, 30, 10,35, 0.02];
	var haulArray = [25,15,10,0,80,50,0,0,100,0,0,0,0,0];
	var unit_index = 0;
	var troops_type = unitsArray[unit_index];
	var unit_haul = haulArray[unit_index]; 
	var cavCount = 0;
	var cavTotal = 0;
	var icoArray = ["spear","sword","axe","spy","light","heavy","ram","catapult","knight","snob","Militia"];
	var storageArray = [0,1000,1229,1512,1859,2285,2810,3454,4247,5222,6420,
						7893,9705,11932,14670,18037,22177,27266,33523,41217,
						50675,62305,76604,94184,115798,142373,175047,215219,
						264611,325337,400000,0]; 
	var farmArray = [0,
					240,281,329,386,452,530,622,729,854,1002,
					1174,1376,1613,1891,2216,2598,3045,3569,4183,4904,
					5748,6737,7896,9255,10848,12715,14904,17469,20476,24000,
					0];
	var hideArray = [0,150,200,267,356,474,632,843,1125,1500,2000,0]; 
	var _production = [6,								//0
		 33, 38, 45,  52,  60,  70,  82,  95, 111, 129, // level 1-10
		150,174,202, 235, 274, 318, 370, 431, 501, 583, // level 11-20
		678,788,917,1066,1240,1442,1678,1951,2270,2640, // level 21-30
		];
	var _units = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var _buildings = null;

	$("#header_info")[0].innerHTML += "<div id='info_div' class='small' style='text-align:left;height:16px;margin:0;padding:0;white-space:nowrap;border:0;background:transparent;'/>";
	var dodge_div = document.createElement("DIV");
	dodge_div.setAttribute("style","float:bottom;display:none;");
	$("body")[0].appendChild(dodge_div);
}

	if (toolbar) {
		if (/t=([^&]+)/.test(location.href)) {
			var t = '&' + location.href.match(/t=([^&]+)/g)
		} else {
			var t = '';
		}
		var newreport = '';
		var newmail = '';
		var newpost = '';
		var logout = $("tr#menu_row td:last a")[0].href;
		if ($("[class='icon header new_post']").length>0) newpost = '<a href="/game.php?village=' + curVillage +  t+ '&screen=ally&mode=forum"> <span class="icon header new_post" title="New post in private forum"></span></a>';
		if ($("[class='icon header new_mail']").length>0) newmail = '<a href="/game.php?village=' + curVillage + t+ '&screen=mail"> <span class="icon header new_mail" title="New mail"></span></a>';
		if ($("[class='icon header new_report']").length>0) newreport = '<a href="/game.php?village=' + curVillage + t+ '&screen=report&amp;mode=attack"> <span class="icon header new_report" title="New report"></span></a>';
		var top_xhtml = '';
	/*
		top_xhtml += '<tr><td>';
		top_xhtml += '<table class="header-border"><tr><td>';
		top_xhtml += '<table class="box menu nowrap"><tr>';
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + t+ '&screen=overview"> O<span class="small">verview </a></td>';
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + t+ '&screen=overview_villages"> V<span class="small">illa list</span></a></td>';
		top_xhtml += '<td class="icon-box nowrap">'+newreport+'<a href="/game.php?village=' + curVillage + t+ '&screen=report"> R<span class="small">eports </span></a></td>';
		top_xhtml += '<td class="icon-box nowrap">'+newmail+'<a href="/game.php?village=' + curVillage + t+ '&screen=mail"> M<span class="small">ail  </span></a></td>';
		top_xhtml += '<td class="icon-box nowrap">'+newpost+'<a href="/game.php?village=' + curVillage + t+ '&screen=ally"> T<span class="small">ribe  </span></a></td>';
		top_xhtml += '</tr></table></td></tr></table></td>';
		top_xhtml += '<td></td>';
	*/
	/*
		top_xhtml += '<td><table class="header-border"><tr><td>';
		top_xhtml += '<table class="box menu nowrap"><tr>';
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage +  t+'&screen=ranking"> R<span class="small">anking  </span></a><span class="small">('+ranking+'.|'+points+'p) </span></td>';
		top_xhtml += '<td class="icon-box nowrap" align="center">   <a href="/game.php?village='+curVillage+ t+'&screen=map">M<span class="small">ap </span></a> <span class="small">('+coord[0]+'|'+coord[1]+')</span> </td>';
		top_xhtml += '</tr></table></td></tr></table></td>';
		
		top_xhtml += '<td colspan="3"><table class="header-border"><tr><td>';
		top_xhtml += '<table class="box menu nowrap"><tr>';
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage +  t+'&screen=settings"> S<span class="small">ettings </span></a></td>';	
		top_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + t+ '&screen=premium"> P<span class="small">remium </span></a></td>';
		top_xhtml += '<td class="icon-box nowrap"><a href="'+logout+'"> L<span class="small">og out </span></a></td>';
		top_xhtml += '</tr></table></td></tr></table></td></tr>';
		$("#header_info")[0].innerHTML = top_xhtml+$("#header_info")[0].innerHTML;
	*/	
		//style="border-left: solid 1px #876534"
		menu_xhtml += '<td class="icon-box nowrap"><a href="http://'+World+'.tribalwarsmap.com/us/noflash/" target="_blank">' +
						'<img src="'+imgbase + '/rabe_38x40.png?1" style="height:16px;margin:0px 2px;" title="tribalwarsmap.com" />' + 
						'</a></td>';
		menu_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + 
						curVillage + 
						'&screen=main' + t + 
						'"><img src="'+imgbase + '/buildings/main.png?1" style="margin:0px 2px" title="Main" />' + 
						'</a></td>';
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=barracks'+t+'"><img src="'+imgbase + '/buildings/barracks.png?1" style="margin:0px 2px" title="barracks" /></a></td>';
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=stable'+t+'"><img src="'+imgbase + '/buildings/stable.png?1" style="margin:0px 2px" title="stable" /></a></td>';
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=garage'+t+'"><img src="'+imgbase + '/buildings/garage.png?1" style="margin:0px 2px" title="garage" /></a></td>';
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=snob'+t+'"><img src="'+imgbase + '/buildings/snob.png?1" style="margin:0px 2px" title="snob" /></a></td>';
		
		menu_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + '&screen=smith'+t+'"><img src="'+imgbase + '/buildings/smith.png?1" style="margin:0px 2px" title="smith" /></a></td>';	
		menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=place'+t+'"><img src="'+imgbase + '/buildings/place.png?1" style="margin:0px 2px" title="place" /></a></td>';
	//	menu_xhtml += '<td><a href="/game.php?village=' + curVillage + '&screen=church_f'+t+'"><img src="'+imgbase + '/buildings/church.png?1" style="margin:0px 2px" title="First church" /></a></td>';
		menu_xhtml += '<td class="icon-box nowrap"><a href="/game.php?village=' + curVillage + '&screen=market'+t+'"><img src="'+imgbase + '/buildings/market.png?1" style="margin:0px 2px" title="market" /></a></td>';
		menu_xhtml += '';
	//$("#menu_row2_village").after(menu_xhtml);
	}
	function _log(data,br){
		if (br) {
			$("td[id='info_div0']")[0].innerHTML = data+"<br/>"+$("td[id='info_div0']")[0].innerHTML;
		} else {$("div[id='info_div']")[0].innerHTML = data;};
	}
	function _msg(data){
		$("p.server_info")[0].innerHTML = $("p.server_info")[0].innerHTML.split("|")[0] + 
										" | " + data + 
										" | "+ $("p.server_info")[0].innerHTML.split("|")[1];
	}
	function setFunc(func, new_func) {
		if (typeof unsafeWindow == "object") {
			unsafeWindow[func] = new_func;
		} 
	}
	function xpathGetFirst(xpath) {
		return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	}
	function xpathGetAll(p, context) {
		if (!context) context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
		return arr;
	}
	function ajax(url, type, async) {
		var xhReq = new XMLHttpRequest();
		if (type != "POST") { type = "GET"; }
		if (async !== true) { async = false; }
		xhReq.open(type, url, async);
		xhReq.send(null);
		return xhReq;
	}
	function array_flip( trans ) {
		var tmp_ar = {};
		for(var key in trans ) {
			tmp_ar[trans[key]] = key;
		}
		return tmp_ar;
	}
	function setValue(key, new_val) {
		GM_setValue(_Unique+"_"+key, uneval(new_val));
	}
	function getValue(key) {
		return eval(GM_getValue(_Unique+"_"+key));
	}
	function getUserVillages() { // Grab the users villages 
		var villageSet = $("table.vis tr[class^='nowrap  row_']");
		if (!villageSet) return false;
		var villages = {};
		for (i = 0; i < villageSet.length; i++) { // loop through the found links
			 var cells = villageSet[i].getElementsByTagName("td");
//	GM_log(villageSet[i].innerHTML+"   \n\r "+cells[0].innerHTML+" \n\r " +cells[1].innerHTML+" \n\r " +cells[2].innerHTML);
			var tmpId = cells[0].innerHTML.match( /village=([^&]+)/ );
			var tmpDetails = cells[0].innerHTML.match( /">(.+) \((-?\d+)\|(-?\d+)\)(?: K(\d+))?<\/sp/ );
			var tmpPoints = cells[1].textContent.replace(".","");
			var tmpPointsInt = parseInt(tmpPoints);

// GM_log(tmpDetails[1]);
			villages[tmpId[1]] = {
				id: tmpId[1], 
				name: tmpDetails[1], 
				x: parseInt(tmpDetails[2]), 
				y: parseInt(tmpDetails[3]), 
				continent: tmpDetails[4], 
				points: tmpPoints
			};
		}
		 
		villageSet = $("table.vis tr[class^='nowrap  selected row_']");
		for (i = 0; i < villageSet.length; i++) { // loop through the found links
			var cells = villageSet[i].getElementsByTagName("td");
//	GM_log(villageSet[i].innerHTML+"   \n\r "+cells[0].innerHTML+" \n\r " +cells[1].innerHTML+" \n\r " +cells[2].innerHTML);
			var tmpId = cells[0].innerHTML.match( /village=([^&]+)/ );
			var tmpDetails = cells[0].innerHTML.match( /">(.+) \((-?\d+)\|(-?\d+)\)(?: K(\d+))?<\/sp/ );
			var tmpPoints = cells[1].textContent.replace(".","");
			var tmpPointsInt = parseInt(tmpPoints);
			//var vcoords_from = ["513","530"];
			//var vcoords_to = [tmpDetails[2],tmpDetails[3]];
			//var dist = parseInt(get_distance_num(vcoords_from,vcoords_to)*10000000);
//GM_log(tmpDetails[1]);
			villages[tmpId[1]] = {
				id: tmpId[1], 
				name: tmpDetails[1], 
				x: parseInt(tmpDetails[2]), 
				y: parseInt(tmpDetails[3]), 
				continent: tmpDetails[4], 
				points: tmpPoints
			};
		};
		setValue("myVillages", villages);
		_log("getUserVillages:"+villageSet.length,false);
	}
	function getCurrentVillage() { // Grab the currently selected village
		if (curVillage == null) {
			try {
				var cur = $("a:first").attr("href");
				cur = cur.replace(/(.+)village=([^&]+)(.+)/g, "$2");
				curVillage = cur;
				vid = cur;
			} catch(e) {
				GM_log("Failed to properly execute getCurrentVillage. js error:\n"+e);
				curVillage = null;
			}
		}
		//_log("getCurrentVillage: "+curVillage,false);
		return curVillage;
	}
	function myVillages() { // My villages
		if (Screen == "overview_villages" || ! getValue("myVillages") || getValue("myVillages") === 'undefined') {
			getUserVillages();
		}
		//_log("myVillages",false);
		return getValue("myVillages");
	 }
	function getReportsByVillage() {
			var reports = getValue("reports");
			var ret = {};
			var i = 0;
			for(var v in reports) {
					 i++;
					 var report = reports[v];
					 var coords = report.coords.join('|');
					 if(!ret[coords] || ret[coords].timestamp < report.timestamp) {
						 ret[coords] = report;
					 }
			}
			//_log("getReportsByVillage",false);
			return ret;
	}
	function getReportForCoord(coord) {
				 return getReportsByVillage()[coord];
	}
	function getUnits() {
		return getValue("units");
	}
	function get_unit_html(unit, rallypoint) {
		_log("get_unit_html:"+unit.title,false);
		return(	"<input type='text' value='' size='5' name='"+unit.id+"'/>" +
				"<br/><img src='"+imgbase+"/unit/unit_"+unit.id+".png?1' title='"+unit.title+"' height='12px'/>" +
				" <a href='javascript:insertUnit(document.forms[0]."+unit.id+", "+rallypoint.units[unit.index]+")'>"+ 
				"("+rallypoint.units[unit.index]+")</a>");
	}
	function get_rallypoint_html(village_id,x,y) {
		  var rallypoints = getValue("rallypoints");
		  var rallypoint = rallypoints[village_id];
		  if(!rallypoint) return false;
		  var html = "<form id='units_form' name='units' action='/game.php?village="+village_id+"&amp;screen=place&amp;try=confirm' method='post'>";
		  html += "<table cellpadding='0' cellspacing='0' width='100%' style='border:1px solid #987634;'><tbody><tr>";
		  var units = getUnits()[village_id];
		  html += "<th valign='top' width='100%'><table cellpadding='0' cellspacing='0' border='0' width='100%'><tbody><tr>";
		  var col = 1;
		  for(var i in units) {
			  var unit = units[i];
			  html += "<th valign='middle' align='center'>"+get_unit_html(unit, rallypoint)+"</th>";
		  }
		  html += "</tr></tbody></table></th><th>";
		  html += "<table><tbody><tr>\n<th rowspan='2'>";
		  html += "<input type='text' size='5' value='"+x+"' name='x' id='inputx' /><br/> x: ";
		  html += "</th><th><input type='text' size='5' value='"+y+"' name='y' id='inputy' /><br/> y: ";
		  html += "</th>";
		  html += "<td rowspan='2'><input id='target_attack' class='attack' name='attack' value='攻击' style='font-size: 10pt;' type='submit'>";
		  html += "<input id='target_support' class='support' name='support' value='支援' style='font-size: 10pt;' type='submit'></td>";
		  html += "</tr></tbody></table>";
		  html += "</th></tr></tbody></table>";
		  html += "</form>";
		  _log("get_rallypoint_html: "+village_id+" ("+x+"|"+y+")",false);
		  return html;
	}
	function get_distance_num(from, to) {
		var distance_x = from[0]-to[0];
		var distance_y = from[1]-to[1];
		var distance = Math.sqrt(Math.pow(distance_x,2) + Math.pow(distance_y,2));
		//var ret = "<font color='green'>" + distance.toFixed(2) +"</font>cells";
		//_log("get_distance_num("+from+","+to+"): "+distance,false);
		return distance;
	}
	setFunc("changeTroopsType", function(index,istart){ 
		window.setTimeout(function() {
			//var troops_type = $("#troopsSel")[0].options[index].value;
			//var villageid = $("#troopsSel")[0].name;
			//GM_log(istart);//
			setValue("unit_index",index);
			for (var idx=0;idx<rStep;idx++) {
				var idn = idx + istart +1;
				var dist = parseFloat($("#dist_"+idn)[0].value);
				var speed = dist*speedArray[index];
				
				var troops_speed_hour = parseInt(speed/60);
				var troops_speed_min = parseInt(speed - troops_speed_hour*60);
				var troops_speed_sec = parseInt((speed - troops_speed_hour*60 - troops_speed_min)*60);
				var troops_speed = (troops_speed_hour>0?troops_speed_hour+":":"")+troops_speed_min +":"+troops_speed_sec;
						//var troops_speed = troops_speed_min +":"+troops_speed_sec;
						//var troops_speed = (dist*speedArray[4]).toFixed(2);
				//GM_log("time: "+dist*speedArray[4]+"     "+troops_speed_hour+":"+troops_speed_min+":"+troops_speed_sec);
				$("#speed_"+idn)[0].innerHTML = troops_speed;
				//GM_log(dist+"      "+speed);
				//$("#farm_"+idn)[0].innerHTML = farm_table();
			}

			unit_haul = haulArray[index];
			var farm_tables = $("td[name^='farm_table_']");
			var reports = getValue("reports");
			for (var f=0;f<farm_tables.length;f++){
				var fid = farm_tables[f].id;
				//var report = reports[fid];
				//GM_log("farm_tables:"+fid);
				//farm_tables[fid].innerHTML = farm_table(report);
			}
			//GM_log(" unit_haul:     "+unit_haul);
		},0)
	});
	function farm_table(report) {
		var cavTotal = parseFloat($("#cavTotal")[0].value);
		var cavCount = cavTotal / unit_haul;
		cavCount = Math.ceil(cavCount) ;
		var html = "";
		if (true) {
			html += "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr>";//  + 
					//"<td class='small'> <font color='green'><b><span id='speed_"+(jj+iStart)+"'>" + troops_speed + "</span></b></font><span class='inactive small'>min</span></td>";
			var did = parseInt(report.villageid);
			var pnt = points[did];
			if (!pnt) {
				pnt = {point:0};
				//points[did] = pnt;
			}
			html += (pnt.point>0?("<td class='small' style='border:0px solid gold; width:1px;' nowrap><img src='"+imgbase +"/face.png?1' height='12px'/><b>"+pnt.point+"</b></td>"):"");
			//html +=	(wallHtml==""?"":(iWall>0?("<td class='small' style='border:2px solid red; width:1px;' nowrap>"+wallHtml+"</td>"):("<td style='width:1px;'nowrap>"+wallHtml+"</td>")));
						
			// ------------------------ 侦查
			html += "<td style='border:1px solid #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
					report.villageid + "," + 
					report.coords[0] + 
					","+ report.coords[1] + 
					",0,true);'>" + 
					"<img src='"+imgbase +"/unit/unit_spy.png?1' height='12px'></a></td>";
			// 手动抢夺									
			html += "<td style='border:1px solid #987634;' width='16px' nowrap><a href='javascript:{"+ 
					"insertUnit(document.forms[0].spy, \"1\");"+ 						 
					"insertUnit(document.forms[0].light, \""+ (cavCount+2) + "\");"+ 
					"insertUnit(document.forms[0].x, \""+ report.coords[0] + "\");"+ 
					"insertUnit(document.forms[0].y, \""+ report.coords[1] + "\");" + 
					"}'>" +  
					"<img src='"+imgbase +"/buildings/place.png?1' height='12px'></a></td>";
							
			html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
					"<a href='javascript:farmIt(" + 
					report.villageid + "," + 
					report.coords[0] + 
					","+ report.coords[1] + 
					",0,true,true);' title='attack'>" + 
					"<img src='"+imgbase +"/unit/unit_axe.png?1' height='12px'></a></td>";

			html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
					"<a href='javascript:farmIt(" + 
					report.villageid + "," + 
					report.coords[0] + 
					","+ report.coords[1] + 
					","+parseInt(cavCount+2)+",true);' title='loot'" + 
					((iTroops==0)?">":" onclick='javascript:return false;'>") + 
					"<img src='"+imgbase +"/unit/unit_light.png?1' height='12px'>" +  		
					parseInt(cavCount+2) + 
					"</a></td>";

			if (cavCount/2>10) {
				html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
						report.villageid + "," + 
						report.coords[0] + 
						","+ report.coords[1] + 
						","+parseInt((cavCount+2)/2)+",true);' title='loot'" + 
						((iTroops==0)?">":" onclick='javascript:return false;'>") + 
						parseInt((cavCount+2)/2) + "</a></td>";
				// farm 2		 	
			}
			if (cavCount/3>10) {
				html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
						report.villageid + "," + 
						report.coords[0] + 
						","+ report.coords[1] + 
						","+parseInt((cavCount+2)/3)+",true);' title='loot'" + 
						((iTroops==0)?">":" onclick='javascript:return false;'>") + 									
						parseInt((cavCount+2)/3) + "</a></td>";
			// farm 3		 	
			}
			if (cavCount/4>10) {
				html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
						report.villageid + "," + 
						report.coords[0] + 
						","+ report.coords[1] + 
						","+parseInt((cavCount+2)/4)+",true);' title='loot'" +  
						((iTroops==0)?">":" onclick='javascript:return false;'>") + 
						parseInt((cavCount+2)/4) + "</a></td>";
			//  farm 4
			}
							
			html += "</tr></table>";
		}
		return html;
	}
	function _get_report_html(rCount) {
				var html = "<table cellpadding='0' cellspacing='0' border='0' width='100%'>"; 
				html += "<tr class='.row_a'>";
				var points = getValue("points");
				if (!points) points = {};
				var report;
				var reports = getReportsByVillage();
				var villages = myVillages();
				var v = villages[vid];
				var vcoords = [v.x,v.y];

				var i=0;
				var jj =0;
				var iStorage = 1000;
				var iStart = rCount - rStep;
				for (var report_id in reports) { i++;}
				if (rCount > i) rCount = i;
				i = 0;
				if (rCount  == 0) {
					rCount = reports.length;
					iStart = 0;
				} 
						//var troops_type = unitsArray[4]; // LC= troops_type
						
						var unitOpts = "<select id='troopsSel' name='"+iStart+"' onChange='changeTroopsType(this.options.selectedIndex,"+iStart+")' style='color:white;background-Color: #987634;border:1px solid #987634;' class='box menu nowrap'>";
						for (var unt=0;unt<unitsArray.length;unt++) {
						//GM_log("unitsArray[unt]: " +unitsArray[unt]+"   troops_type: "+troops_type)
							var troops_select = (unitsArray[unt]==troops_type?'selected="true"':'');
							unitOpts += '<option value="'+unitsArray[unt]+'" '+troops_select+'>' + 
										unitsArray[unt] +
										'</option>';				
						}
						unitOpts += "</select>";
				html += "<td><font color='red'><b>L</b></font><span class='small'>ist <b>o</b>f</span> <font color='green'><b>R</b></font><span class='small'>eports </span><font color='blue'><b>C</b></font><span class='small'>ache</span></td><td colspan='1' align='right'><img src='"+imgbase+"/unit/speed.png' height='12px'>&nbsp;"+unitOpts+"</td></tr><tr class='.row_a'>";
				
				for (var report_id in reports) {
					if (i < iStart) { i++;}	
					else 
					{
						jj += 1;
						report = reports[report_id];
						if(report.timestamp.getTime) { report.timestamp = report.timestamp.getTime(); }
						 
						var lclTime = new Date();
						var age = ((lclTime.getTime() - 12*3600*1000)-report.timestamp)/1000;
						age = age>0? age:(0 - age);
						var sTime = (age/3600);
						var sHour = parseInt(sTime);
						var sMinute = parseInt((sTime - sHour)*60);
			//			var sSecond = parseInt(((sTime - sHour)*60 - sMinute)*60);
						if (sMinute >9)  {	sTime = "<font color='#208020'>" + sHour + "</font>:<font color='#000'>" + sMinute+"</font>";} 
						else 
						{sTime = "<font color='#208020'>" + sHour + "</font>:<font color='#000'>0" + sMinute+"</font>";}
						
		// -----------------------
						var dist = get_distance_num(vcoords,report.coords);
						var troops_speed_hour = parseInt((dist*speedArray[4])/60);
						var troops_speed_min = parseInt(dist*speedArray[4] - troops_speed_hour*60);
						var troops_speed_sec = parseInt((dist*speedArray[4] - troops_speed_hour*60 - troops_speed_min)*60);
						var troops_speed = (troops_speed_hour>0?troops_speed_hour+":":"")+(troops_speed_min>9?troops_speed_min:"0"+troops_speed_min)+":"+(troops_speed_sec>9?troops_speed_sec:"0"+troops_speed_sec);
						//var troops_speed = troops_speed_min +":"+troops_speed_sec;
						//var troops_speed = (dist*speedArray[4]).toFixed(2);
				//GM_log("time: "+dist*speedArray[4]+"     "+troops_speed_hour+":"+troops_speed_min+":"+troops_speed_sec);
						//var troops_type = unitsArray[4]; // LC= troops_type
						
						var unitOpts = "<select id='troopsSel' name='"+report.villageid+"' onChange='changeTroopsType(this.options.selectedIndex,"+report.villageid+")' style='color:white;background-Color: #987634;border:1px solid #987634;' class='box menu nowrap'>";
						for (var unt=0;unt<unitsArray.length;unt++) {
							var troops_select = (unitsArray[unt]==troops_type?'selected="true"':'');
							unitOpts += '<option value="'+unitsArray[unt]+'" '+troops_select+'>' + 
										unitsArray[unt] +
										'</option>';				
						}
						unitOpts += "</select>";
						var iTroops = 0;
						var unitHtml = "";
						var UnitArray = report.Units;
						//if (UnitArray[u]>0) {unitHtml += "<span><img src='/imgbase/unit/unit_" + icoArray[u]+".png?1' height='12px'><b><i>" + parseInt(UnitArray[u]) + "</i></b></span>";iTroops += 1;} 
						for (var u=0;u<UnitArray.length-1;u++)
						{
							if (UnitArray[u]>0) {
								unitHtml += "<span>" + 
											"<img src='"+imgbase+"/unit/unit_" + 
											icoArray[u]+".png?1' height='12px'>" + 
											"<b><i>" + 
											parseInt(UnitArray[u]) + 
											"</i></b></span>";
											iTroops += 1;
							} 
						}
						var wallHtml = "";
						var iWall = 0;
						if (report.buildings.wall) {
							if (parseInt(report.buildings.wall)>0 && parseInt(report.buildings.wall)<21) 
								wallHtml = "<span><img src='"+imgbase+"/buildings/wall.png?1' height='12px'>"+parseInt(report.buildings.wall)+"</span>";
							else if (parseInt(report.buildings.wall)>20) {
								wallHtml = "<span><img src='"+imgbase+"/buildings/wall.png?1' height='12px'><font color='red'><b>Scout fail</b></font></span>";
								iWall += 1;
							}
						}
						var attacked = report.attacked ? report.attacked : "";
						var rplayer = report.player;		//Bonus village
						var villagename = (report.villagename.indexOf("Bonus village")!=-1?"":(report.villagename.indexOf("Barbarian village")!=-1?"":report.villagename))		
						 html += "<td class='small' width='50%' style='border:0px solid #604620;' align='right' valign='top' nowrap>" + 
								"<table class='content-border vis' cellpadding='0' cellspacing='0' width='100%' style='border:1px solid #987634;border-top:1px solid #987634;border-left:1px solid #987634;'>";						
						 html += "<tr class='selected'><th width='60px'>" + 
						 "<a href='game.php?village="+curVillage + 
						"&amp;screen=report&amp;mode=attack&amp;view="+report.id+ "'" + 
						"target='_blank'><img src='"+imgbase+"/new_report.png' height='12px' width='12px'>" + 
						(jj+iStart) + 
						"</a></th>" + 
						"<th class='small' nowrap><table cellpadding='0' border='0' cellspacing='0' width='100%'><tr>" + 
						"<th class='small'>"+rplayer + "</th><th class='small'><a href='game.php?village="+curVillage + 
						"&amp;screen=info_village&amp;id="+report.villageid+"' target='_blank'>" + 
						//villagename + 
						"  (" +
						report.coords[0]+"|"+report.coords[1] + 
						")</a></th>" + 
						(unitHtml==""?"":("<td class='small' style='border:2px solid red; width:1px;' nowrap>"+unitHtml+"</td>")) + 
						"<th class='small' width='10%' align='right'>" + 
						"<span style='text-align:right'>" + attacked + 
						sTime +  
						"</span>" + 
						"</th></tr></table>" + 
						"</td></tr>";

						 html += "";
						 var sum = 0;
						 var wh = storageArray[parseInt(report.buildings['storage'])];
						 for(var j in report.resources) { sum += report.resources[j]; }
						 html += "<tr class='selected'><td class='small' align='center'><img src='"+imgbase +"/res.png' height='12px'><b>" + 
						 wh + 
						 "</b></td>";
			//			 log(1,report.buildings.wood);
						var lvl = [];
						var _prod = [];
						var buildings = report.buildings;
			//GM_log(buildings["wood"]+"\n\r"+report.buildings.stone);
						lvl[0] = buildings["wood"]?buildings["wood"]:0;
						lvl[1] = report.buildings.stone?report.buildings.stone:0;
						lvl[2] = report.buildings.iron?report.buildings.iron:0;
						_prod[0] = _production[lvl[0]];
						_prod[1] = _production[lvl[1]];
						_prod[2] = _production[lvl[2]];
						//_prod[2] = (lvl[2]==0)?0:_production[lvl[2]];
	//	log(1,lvl[0]+"\n\r"+lvl[1]+"\n\r"+lvl[2]);

						var resources = report.resources.slice(); // slice = clone array
						resources[0] = Math.round(_prod[0]*(age/3600));
						resources[1] = Math.round(_prod[1]*(age/3600));
						resources[2] = Math.round(_prod[2]*(age/3600));
						var res = report.resources.slice();
						var storage = storageArray[parseInt(report.buildings['storage'])]; //�ֿ����
						var hide = hideArray[parseInt(report.buildings['hide'])];  // ɽ�����

			//				log(1,"storage[" + +report.buildings['storage']+"]: "+storage+"  /  hide["+report.buildings['hide']+"]: "+hide);
						storage = parseInt(storage);	
						hide = parseInt(hide);
						cavTotal = 0;
						for(var ires in resources) {
								//if (resources[ires]>storage) resources[ires] = storage;
								//usum += resources[ires];
							res[ires] = (report.resources[ires] + resources[ires])>storage?storage:(report.resources[ires] + resources[ires]);
							cavTotal += res[ires]; 
						}
								
							//var cavTotal = sum + usum;
						if (cavTotal > (storage-hide)*3) cavTotal = (storage-hide)*3;

						//var iLC = 0;
						//var cavCount = 0;
				//		GM_log(cavTotal+"-----------"+cavCount);
						if (cavTotal > 0){
							cavCount = cavTotal / unit_haul;
							cavCount = Math.ceil(cavCount) ;
							//cavCount = Math.ceil(Math.ceil(iLC/3)/100)*100;
						}
			
						html += "<td class='small'><table cellpadding='0' border='0' cellspacing='0' width='100%'><tr><td valign='top' width='80%' class='small'>" + 
									"<img src='"+imgbase +"/holz.png' height='12px'><B>" + 
									//(report.resources[0] + resources[0]) + 
									res[0] + 
									"</B><span class='inactive' title='"+_prod[0]+"'>/"+ 
									+lvl[0] + //_prod[0] + 
									"</span>&nbsp;"; 
						html += "<img src='"+imgbase +"/lehm.png' height='12px'><B>" + 
									//(report.resources[1] + resources[1]) + 
									res[1] + 
									"</B><span class='inactive' title='"+_prod[1]+"'>/"+ 
									+lvl[1] + //_prod[1]+ 
									"</span>&nbsp;"; 
						html += "<img src='"+imgbase +"/eisen.png' height='12px'><B>" + 
									//(report.resources[2] + resources[2]) + 
									res[2] + 
									"</B><span class='inactive' title='"+_prod[2]+"'>/"+ 
									+lvl[2] + //_prod[2]+ 
									"</span>&nbsp;&nbsp;&nbsp;"; 

						html += "<input id='cavTotal' type='hidden' value='"+cavTotal+"'/><img src='"+imgbase +"/res.png' height='12px'><b>" +cavTotal+"</b></td>";
						//if (report.ifarm!="") {html += "<th style='border:1px solid #987634;width:1px;'><img src='"+imgbase +"/command/attack.png?1'/></th>";}
						html += "<td class='small' id='att"+report.villageid+"' style='color:red;' valign='top' align='right' width='20%' nowrap><b><u>"+report.ifarm+"</u></b></td>";
						html += "</tr></table></td></tr>";	
						
						html += "<tr><td class='small' style='text-align:center;height:12px;border-top:0px dotted #987634;' nowrap>" + 
								"<img src='"+imgbase +"/forwarded.png'>" + 
								"<font color='green'><b><input id='dist_"+(jj+iStart)+"' type='hidden' value='"+dist+"'/>" + dist.toFixed(2) + " </b></font></td>" + 
								"<td id='"+report.villageid+"' name='farm_table_"+report.villageid+"' class='small' style='height:12px;border-top:0px dotted #987634;'>";


if (true) {
								html += "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr>"  + 
								"<td class='small'> <font color='green'><b><span id='speed_"+(jj+iStart)+"'>" + troops_speed + "</span></b></font></td>";
						//		"+unitOpts+"
						var did = parseInt(report.villageid);
						var pnt = points[did];
						if (!pnt) {
							pnt = {
									point:0,
									grow:0
							};
							//points[did] = pnt;
						}
						var strg = "";
						if (pnt.grow!=0) {
							strg = (pnt.grow!=0?"("+(pnt.grow>0?"+":"")+pnt.grow+")":'');
						}
						html += (pnt.point>0?("<td class='small' style='border:0px solid gold; width:1px;' nowrap><img src='"+imgbase +"/face.png' height='12px'/><b>"+pnt.point+"</b>"+strg+"</td>"):"");
						html +=	(wallHtml==""?"":(iWall>0?("<td class='small' style='border:2px solid red; width:1px;' nowrap>"+wallHtml+"</td>"):("<td style='width:1px;'nowrap>"+wallHtml+"</td>")));
						
			// ------------------------ 侦查
							html +=  "<td style='border:1px solid #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
										 report.villageid + "," + 
										 report.coords[0] + 
										 ","+ report.coords[1] + 
										 ",0,true);' title='Scout '>" + 
										 "<img src='"+imgbase +"/unit/unit_spy.png?1' height='12px'></a></td>";
								// 手动抢夺									
						html += "<td style='border:1px solid #987634;' width='16px' nowrap><a href='javascript:{"+ 
										 "insertUnit(document.forms[0].spy, \"1\");"+ 						 
										 "insertUnit(document.forms[0].light, \""+ (cavCount+2) + "\");"+ 
										 "insertUnit(document.forms[0].x, \""+ report.coords[0] + "\");"+ 
										 "insertUnit(document.forms[0].y, \""+ report.coords[1] + "\");" + 
										 "}' title='Rally point '>" +  
										 "<img src='"+imgbase +"/buildings/place.png?1' height='12px'></a></td>";
							
						html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
										 "<a href='javascript:farmIt(" + 
										 report.villageid + "," + 
										 report.coords[0] + 
										 ","+ report.coords[1] + 
										 ",0,true,true);' title='Attack with Axemen'>" + 
										 "<img src='"+imgbase +"/unit/unit_axe.png?1' height='12px'></a></td>";
						
						html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
										 "<a href='javascript:farmIt(" + 
										 report.villageid + "," + 
										 report.coords[0] + 
										 ","+ report.coords[1] + 
										 ",0,true,false,true);' title='Attack with spears'>" + 
										 "<img src='"+imgbase +"/unit/unit_spear.png?1' height='12px'></a></td>";

						// 轻骑抢夺
						html += "<td style='border:1px solid #987634;' width='16px' nowrap>" + 
								"<a href='javascript:farmIt(" + 
								report.villageid + "," + 
								report.coords[0] + 
								","+ report.coords[1] + 
								","+parseInt(cavCount+2)+",true);' title='Loot'" + 
								((iTroops==0)?">":" onclick='javascript:return false;'>") + 
								"<img src='"+imgbase +"/unit/unit_light.png?1' height='12px'>" +  		
								parseInt(cavCount+2) + 
								"</a></td>";

						if (cavCount/2>10) {
							html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
									report.villageid + "," + 
									report.coords[0] + 
									","+ report.coords[1] + 
									","+parseInt((cavCount+2)/2)+",true);' title='Loot'" + 
									((iTroops==0)?">":" onclick='javascript:return false;'>") + 
									parseInt((cavCount+2)/2) + "</a></td>";
										 // farm 2		 	
						}
						if (cavCount/3>10) {
							html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
									report.villageid + "," + 
									report.coords[0] + 
									","+ report.coords[1] + 
									","+parseInt((cavCount+2)/3)+",true);' title='Loot'" + 
									((iTroops==0)?">":" onclick='javascript:return false;'>") + 									
									parseInt((cavCount+2)/3) + "</a></td>";
										 // farm 3		 	
						}
						if (cavCount/4>10) {
							html += "<td style='border:1px dotted #987634;' width='16px' nowrap><a href='javascript:farmIt(" + 
									report.villageid + "," + 
									report.coords[0] + 
									","+ report.coords[1] + 
									","+parseInt((cavCount+2)/4)+",true);' title='Loot'" +  
									((iTroops==0)?">":" onclick='javascript:return false;'>") + 
									parseInt((cavCount+2)/4) + "</a></td>";
										 //  farm 4
						}
							
						html += "</tr></table>";
}						

						html += "</td></tr></th></tr></table></td>";
						if ((jj/2) == parseInt(jj/2)) html += "</tr>";
						i++;
						if (i == rCount ) {
							html += "<table cellpadding='0' cellspacing='0' border='0' width='100%'><tr>" + 
									"<td style='text-align:right;'>" + 
									get_rallypoint_html(v.id,"","") + 
									"</td></tr>" +  
									"</table>";	 
						}
													 
						if (i > rCount -1) return html;
					 }
				 }
				 if(i==0) {html += "No reports found - look at some reports first";}
				 html += "</table>";

				 _log("rStep:"+rStep+"  iStart:"+iStart+"  rCount:"+rCount,false);
				 return html;
	}
	function _generate_report() {
			// find report id
		if(/mode=attack/.test(location.href)){}
		else{
			if(/mode=all/.test(location.href)){}
			else{
				if(!(/view=/.test(location.href))) return false;
				_log("not an attack's report: "+!(/mode=all/.test(location.href)));
				return false;
			}
		}
	
		var walls = 1;
		var tmp=location.href.match(/view=(\d+)/);
	//	log(1,eval(tmp));
		if(!tmp) return false;
		var report_id = tmp[1];
	//	GM_log($("table.vis:eq(2) tr:eq(3) td:last")[0].innerHTML);
		var timeTD = $("table.vis:eq(2) tr:eq(3) td:last")[0];
		var time = Date.parse(timeTD.innerHTML); 

	//			 GM_log(time);	
		var report = {
					id : report_id,
					timestamp : time,
					timefull : timeTD.innerHTML,
					ifarm : "",
				//	pop: 0,
		};

		var UnitArray = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		var UnitTarget1 = $("table[id='attack_info_def_units'] tr:eq(1) td"); //Ŀ����
		var UnitTarget2 = $("table[id='attack_info_def_units'] tr:eq(2) td");  //Ŀ�걻������
		for (var u=1;u<UnitTarget1.length;u++) {
			if (parseInt(UnitTarget1[u].innerHTML)>0) {
				UnitArray[u-1] = parseInt(UnitTarget1[u].innerHTML)-parseInt(UnitTarget2[u].innerHTML)+0.1;
//	GM_log(UnitTarget1.length+"      "+UnitArray[u-1]);
			}
		}
		report.Units = UnitArray;

		var priceTotal = 0;
		var peopleTotal = 0;
		var uLost = 0;
		var attack_info_att = $("table[id='attack_info_att_units']")[0];
		GM_log("attack_info_att:\n\r"+attack_info_att.innerHTML);
		var rLost = $('tr:eq(2) td', attack_info_att);	
		for (r=1;r<rLost.length;r++) {
			if (parseInt(rLost[r].innerHTML) > 0) {
				uLost = parseInt(rLost[r].innerHTML);
				priceTotal += priceArray[r] *uLost;
				peopleTotal += peopleArray[r] * uLost;
				rLost[r].innerHTML += "<br>" + (peopleArray[r] > 1? "(<font color='green'>"+peopleArray[r] * uLost+ "</font>)" : "") +"<br><font color='green'>" +priceArray[r] * uLost+ "</font>";			
	//GM_log("rLost"+r+":\n\r"+rLost[r].innerHTML);
			}
		}
		if (priceTotal >0) rLost[0].innerHTML += (peopleTotal > 0? "<br>(<font color='green'><b>"+peopleTotal+ "</b></font>)" : "") +"<br><font color='green'><b>" + priceTotal+ "</b></font>";
		peopleTotal = 0;
		priceTotal = 0;
		var attack_info_def = $("table[id='attack_info_def_units']")[0];
		var rLost = $('tr:eq(2) td', attack_info_def);	
		for (r=1;r<rLost.length;r++) {
			if (parseInt(rLost[r].innerHTML) > 0) {
				uLost = parseInt(rLost[r].innerHTML);
				priceTotal += priceArray[r] *uLost;
				peopleTotal += peopleArray[r] * uLost;
				rLost[r].innerHTML += "<br>" + (peopleArray[r] > 1? "(<font color='red'>"+peopleArray[r] * uLost+ "</font>)" : "") +"<br><font color='red'>" +priceArray[r] * uLost+ "</font>";			
					//log(1,rLost[r].innerHTML);
			}
		}
		if (priceTotal >0) rLost[0].innerHTML += (peopleTotal > 0? "<br>(<font color='red'><b>"+peopleTotal+ "</b></font>)" : "") +"<br><font color='red'><b>" + priceTotal+ "</b></font>";
		var target = $("table[id='attack_info_def']")[0];
		var targetPlayerA = $('tr:first > th:eq(1)', target)[0];
	//if(! target) return;
	//GM_log("target: "+target.innerHTML);
	//if(! target) return;
		report.player = targetPlayerA.innerHTML; // TODO: strip HTML
		var targetVillageA = $('tr:eq(1) > td:eq(1) a', target)[0];
		tmp = targetVillageA.href.match(/&id=(\d+)/);
		var village_id = tmp[1];
		if (myVillages()[village_id]) {
			_log("Not an attack report ("+village_id+")");
			return false;
		}
		report.villageid = village_id;
		tmp = targetVillageA.innerHTML.match(/(.+) \((-?\d+\|-?\d+)\)(?: (K\d+))?/);
		report.villagefull = targetVillageA.innerHTML;
		report.villagename = tmp[1];
		report.coords = tmp[2].split("|");
		var resources = [0,0,0];
		var resourceTD = $('td:has(> img[src$="graphic/holz.png?1"])')[0];
		if (!resourceTD) resourceTD = $('td:has(> img[src$="graphic/lehm.png?1"])')[0];
		if (!resourceTD) resourceTD = $('td:has(> img[src$="graphic/eisen.png?1"])')[0];
	//GM_log(resourceTD.innerHTML);
		walls = 0;
		if (resourceTD) {
			newHtml = resourceTD.innerHTML.replace(/<span.*?<\/span>/g,""); // remove spans
			newHtml = newHtml.replace(/<img.*?>/g,""); // remove images
	//GM_log(newHtml);
			var ress = newHtml.split(" ");
	//GM_log("ress.length: "+ress.length);
			var r = 0;
			if (ress.length<4) {
				resources=[0,0,0];
				if (resourceTD.innerHTML.match("holz.png")) {r += 1;resources[0]=1;}
				if (resourceTD.innerHTML.match("lehm.png")) {r += 1;resources[1]=1;}
				if (resourceTD.innerHTML.match("eisen.png")) {r += 1;resources[2]=1;}
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
				if (r>0) {
					if (resources[2]>0)	resources[2] = parseInt(ress[0]);
					if (resources[1]>0)	resources[1] = parseInt(ress[0]);
					if (resources[0]>0)	resources[0] = parseInt(ress[0]);
				} else if (r>1) {
					if (resources[2]>0)	resources[2] = parseInt(ress[1]);
					if (resources[1]>0)	resources[1] = parseInt(ress[1]);
					if (resources[0]>0)	resources[0] = parseInt(ress[1]);						
				}
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
			} else {
				ress.length=3;
				resources = ress.map(function(element) {return parseInt(element);});
			}
		} else {walls = 999;}
		report.resources = resources;
				 
	//-----//////////////////////////--///////////////////////	// find building levels
		var buildingsTD = xpathGetFirst("//table[@id='attack_spy']/tbody/tr[2]/td");
	//GM_log("buildingsTD:\n\r"+buildingsTD.innerHTML);
		if (buildingsTD) {
			report.buildings = _get_buildings(buildingsTD);
			walls = 0;
		} else {
			if (!report.buildings) {
				report.buildings = {};
				var buildings = getValue("buildings")[curVillage];
	//GM_log(eval(buildings));
				for (bld in buildings) {
					report.buildings[bld] = 1;
	//GM_log(""+bld+":"+report.buildings[bld]+"\n\r");
				}
			}
		}
		if (walls==999) report.buildings["wall"] = walls;
		
		var haul = $("table#attack_results tr:first td:last")[0];
		if (haul) {
			haul = parseInt(haul.innerHTML.split("/")[0]);
			var hauls = getValue("hauls");
			if (! hauls) {
				hauls = 0;
				setValue("haulstime",timeTD.innerHTML);
			}
			var rpts= getValue("reports");
			if (rpts){
				var rpt = rpts[village_id];
				if (rpt) { 
					if (rpt.id!=report_id) {
						hauls += haul;
						setValue("hauls",hauls);
					}
				}
			}
		}

	//GM_log("wall: "+walls+"report.buildings[wall]: "+report.buildings[wall]);
	//report.attacked = "  ";
	//report.end = "-->";
		_log("_generate_report ",false);
		return report;
	}
	function generate_report(doc,href) {
			// find report id
		var walls = 1;
//GM_log($("table.vis:eq(2) tr:eq(3) td:last",doc)[0].innerHTML);
		var timeTD = $("table.vis:eq(2) tr:eq(3) td:last",doc)[0];
		var time = Date.parse(timeTD.innerHTML); 
		//var rl = $("td:has(> a[href^='report_id'])",doc)[0];
		var href = $("td.nopad table.vis:first tr:first td:first a",doc)[0].href;
		var report_id = 0;
		if (href.indexOf("id=")>0) {
			var tmp=href.match(/id=(\d+)/);
			if(!tmp) return false;
			report_id = tmp[1];
		}

	//	GM_log(report_id+"      "+time);	
		var report = {
					id : report_id,
					timestamp : time,
					timefull : timeTD.innerHTML,
					ifarm : "",

		};

		var UnitArray = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		var UnitTarget1 = $("table[id='attack_info_def_units'] tr:eq(1) td",doc); //Ŀ����
		var UnitTarget2 = $("table[id='attack_info_def_units'] tr:eq(2) td",doc);  //Ŀ�걻������
		for (var u=1;u<UnitTarget1.length;u++) {
			if (parseInt(UnitTarget1[u].innerHTML)>0) {
				UnitArray[u-1] = parseInt(UnitTarget1[u].innerHTML)-parseInt(UnitTarget2[u].innerHTML)+0.1;
	//GM_log(UnitTarget1.length+"      "+UnitArray[u-1]);
			}
		}
		report.Units = UnitArray;
				 
		var priceArray = [0,90,130,190,120,475,950,700,820,140000,0];
		var peopleArray = [ 0, 1, 1, 1, 2, 4, 6, 5, 8, 100,0];
		var priceTotal = 0;
		var peopleTotal = 0;
		var uLost = 0;
		var attack_info_att = $("table[id='attack_info_att_units']",doc)[0];
	//	GM_log("attack_info_att:\n\r"+attack_info_att.innerHTML);
		var rLost = $('tr:eq(2) td', attack_info_att);	
		for (r=1;r<rLost.length;r++) {
			if (parseInt(rLost[r].innerHTML) > 0) {
				uLost = parseInt(rLost[r].innerHTML);
				priceTotal += priceArray[r] *uLost;
				peopleTotal += peopleArray[r] * uLost;
				rLost[r].innerHTML += "<br>" + (peopleArray[r] > 1? "(<font color='green'>"+peopleArray[r] * uLost+ "</font>)" : "") +"<br><font color='green'>" +priceArray[r] * uLost+ "</font>";			
	//GM_log("rLost"+r+":\n\r"+rLost[r].innerHTML);
			}
		}
		if (priceTotal >0) rLost[0].innerHTML += (peopleTotal > 0? "<br>(<font color='green'><b>"+peopleTotal+ "</b></font>)" : "") +"<br><font color='green'><b>" + priceTotal+ "</b></font>";
		peopleTotal = 0;
		priceTotal = 0;
		var attack_info_def = $("table[id='attack_info_def_units']",doc)[0];
		var rLost = $('tr:eq(2) td', attack_info_def);	
		for (r=1;r<rLost.length;r++) {
			if (parseInt(rLost[r].innerHTML) > 0) {
				uLost = parseInt(rLost[r].innerHTML);
				priceTotal += priceArray[r] *uLost;
				peopleTotal += peopleArray[r] * uLost;
				rLost[r].innerHTML += "<br>" + (peopleArray[r] > 1? "(<font color='red'>"+peopleArray[r] * uLost+ "</font>)" : "") +"<br><font color='red'>" +priceArray[r] * uLost+ "</font>";			
					//log(1,rLost[r].innerHTML);
			}
		}
		if (priceTotal >0) rLost[0].innerHTML += (peopleTotal > 0? "<br>(<font color='red'><b>"+peopleTotal+ "</b></font>)" : "") +"<br><font color='red'><b>" + priceTotal+ "</b></font>";
		var target = $("table[id='attack_info_def']",doc)[0];
		var targetPlayerA = $('tr:first > th:eq(1)', target)[0];
	//if(! target) return;
	//GM_log("target: "+target.innerHTML);
	//if(! target) return;
		report.player = targetPlayerA.innerHTML; // TODO: strip HTML
		var targetVillageA = $('tr:eq(1) > td:eq(1) a', target)[0];
		tmp = targetVillageA.href.match(/&id=(\d+)/);
		var village_id = tmp[1];
		if (myVillages()[village_id]) {
			_log("Not an attack report ("+village_id+")");
			return false;
		}
		report.villageid = tmp[1];
		tmp = targetVillageA.innerHTML.match(/(.+) \((-?\d+\|-?\d+)\)(?: (K\d+))?/);
		report.villagefull = targetVillageA.innerHTML;
		report.villagename = tmp[1];
		report.coords = tmp[2].split("|");
		var resources = [0,0,0];
		var resourceTD = $('td:has(> img[src$="graphic/holz.png?1"])',doc)[0];
		if (!resourceTD) resourceTD = $('td:has(> img[src$="graphic/lehm.png?1"])',doc)[0];
		if (!resourceTD) resourceTD = $('td:has(> img[src$="graphic/eisen.png?1"])',doc)[0];
	//GM_log(resourceTD.innerHTML);
		walls = 0;
		if (resourceTD) {
			newHtml = resourceTD.innerHTML.replace(/<span.*?<\/span>/g,""); // remove spans
			newHtml = newHtml.replace(/<img.*?>/g,""); // remove images
	//GM_log(newHtml);
			var ress = newHtml.split(" ");
	//GM_log("ress.length: "+ress.length);
			var r = 0;
			if (ress.length<4) {
				resources=[0,0,0];
				if (resourceTD.innerHTML.match("holz.png")) {r += 1;resources[0]=1;}
				if (resourceTD.innerHTML.match("lehm.png")) {r += 1;resources[1]=1;}
				if (resourceTD.innerHTML.match("eisen.png")) {r += 1;resources[2]=1;}
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
				if (r>0) {
					if (resources[2]>0)	resources[2] = parseInt(ress[0]);
					if (resources[1]>0)	resources[1] = parseInt(ress[0]);
					if (resources[0]>0)	resources[0] = parseInt(ress[0]);
				} else if (r>1) {
					if (resources[2]>0)	resources[2] = parseInt(ress[1]);
					if (resources[1]>0)	resources[1] = parseInt(ress[1]);
					if (resources[0]>0)	resources[0] = parseInt(ress[1]);						
				}
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
			} else {
				ress.length=3;
				resources = ress.map(function(element) {return parseInt(element);});
	//GM_log("r: "+r + "   resources[0]: " +resources[0] + "   resources[1]: " +resources[1] + "    resources[2]: " +resources[2]);
			}
		} else {walls = 999;}
		report.resources = resources;
				 
	//-----//////////////////////////--///////////////////////	// find building levels
		var buildingsTD = document.evaluate("//table[@id='attack_spy']/tbody/tr[2]/td",doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		if (buildingsTD) {
			report.buildings = _get_buildings(buildingsTD);
			walls = 0;
		} else {
			if (!report.buildings) {
				report.buildings = {};
				var buildings = getValue("buildings")[curVillage];
				for (bld in buildings) {
					report.buildings[bld] = 1;
	//GM_log(""+bld+":"+report.buildings[bld]+"\n\r");
				}
			}
		}
		if (walls==999) report.buildings["wall"] = walls;
		
		var haul = $("table[id='attack_results'] tr:first td:last",doc)[0];
		//GM_log(haul.innerHTML);
		if (haul) {
			haul = parseInt(haul.innerHTML.split("/")[0]);
			var hauls = getValue("hauls");
			if (! hauls) {
				hauls = 0;
				setValue("haulstime",timeTD.innerHTML);
			}
//	GM_log("village_id["+village_id+"]: "+report_id);
			var rpts= getValue("reports");
			if (rpts){
				var rpt = rpts[village_id];
				if (rpt) { 
					if (rpt.id!=report_id) {
						hauls += haul;
						setValue("hauls",hauls);
					}
				}
			}
		}

		_log("generate_report "+report_id,false);
		return report;
	}
	setFunc("changeReport", function(index){ 
		var r = $("select[name='report_list']")[0].options[index].value;
		//reportcache(parseInt(r));
		//return;
		//_log(r);
		if (parseInt(r)<9999) 
			reportcache(parseInt(r));
		else {
			$("input[id='b_report']")[0].checked = false; 
			$("table.main tr:first > td").html(rhtml);
		}
	});
	setFunc("changeStep", function(index){ 
		window.setTimeout(function() {
			var r = $("select[name='report_step']")[0].options[index].value;
			rStep = parseInt(r);
			setValue("report_step",rStep);
			var str = set_report_menu(rStep);
			$("div[id='footer']")[0].innerHTML = str + $("div[id='footer']")[0].innerHTML; 
		},300)
	});
	setFunc("display_report_cache", function() { 
		window.setTimeout(function() {
			if (! $("input[id='b_report']")[0].checked){
				$("table.main tr:first > td").html(rhtml);
			} else {
				reportcache(iCount);
			}
		}, 0)});
	setFunc("read_report", function() { 
		window.setTimeout(function() {
		var leng = 1;
//		for(leng=9;leng>0;leng--){
			url = Server+"/game.php?village="+curVillage+"&screen=report&mode=attack&from="+(leng-1)*12;
			var req = GM_xmlhttpRequest({
				method: "GET",
				url: url,
				data:null,
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						//GM_log(dodge_div.innerHTML);
						var rl = $("form table.vis tr td:has(> input[name^='id_'])",dodge_div);
						//GM_log("rl.length:"+rl.length);
						var ct = 0;
						
						for (i=rl.length;i>0;i--) {
							//GM_log(rl[i-1].innerHTML.indexOf("(new)"));
							if (rl[i-1].innerHTML.indexOf("(new)")!=-1) {
								ct += 1;
								var r = $("a",rl[i-1])[0];
								//GM_log(r.href);
								var rid=r.href.match(/view=(\d+)/)[1];
								//GM_log(rid);
								var req = GM_xmlhttpRequest({
									method: "GET",
									url: r.href,
									data:null,
									onload: function(responseDetails){
										if (responseDetails.status  == 200) {
											dodge_div.innerHTML = responseDetails.responseText;
											var report = generate_report(dodge_div,r.href);
											if (report) _update_report(report);
											var rcid = $("td.nopad table.vis:first tr:first td:first a",dodge_div)[0].href.match(/id=(\d+)/)[1];
											//  (#"+rcid+")
											var rtitle = $("#labelText",dodge_div)[0].innerHTML;
											_log("Read report: <a target='_blank' href='/game.php?village="+curVillage+"&screen=report&mode=all&view="+rcid+"'>"+rtitle+"</a>");
										}
								}});
								//rl[i-1].innerHTML.replace("(new)","");
							}
							//_log("New report: "+rid);	
						}
						_log("New report: "+ct);
					}
				}
			});	
//	}
		}, 0)});
	setFunc("read_all_report", function() { 
		window.setTimeout(function() {
		var lg = 9;
		for(leng=lg;leng>0;leng--){
			url = Server + "/game.php?village="+curVillage+"&screen=report&mode=attack&from="+(leng-1)*12;
			var req = GM_xmlhttpRequest({
				method: "GET",
				url: url,
				data:null,
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						//GM_log(dodge_div.innerHTML);
						var rl = $("form table.vis tr td:has(> input[name^='id_'])",dodge_div);
						//GM_log("rl.length:"+rl.length);

						for (i=rl.length;i>0;i--) {
								var r = $("a",rl[i-1])[0];
								//GM_log(r.href);
								//var rid=r.href.match(/view=(\d+)/)[1];
								//GM_log(rid);
								var req = GM_xmlhttpRequest({
									method: "GET",
									url: r.href,
									data:null,
									onload: function(responseDetails){
										if (responseDetails.status  == 200) {
											dodge_div.innerHTML = responseDetails.responseText;
											
											var dt1 = new Date().getTime();
											var report = generate_report(dodge_div,r.href);
											if (report) {
												_update_report(report);
											} 
											else {
												dodge_div.innerHTML = responseDetails.responseText;
												report = generate_report(dodge_div,r.href);
												if (report) _update_report(report);
											}
											var dt = new Date().getTime()-dt1;
											
											var rcid = $("td.nopad table.vis:first tr:first td:first a",dodge_div)[0].href.match(/id=(\d+)/)[1];
											var rtitle = $("#labelText",dodge_div)[0].innerHTML;
											//  (#"+rcid+")
											//GM_log("read all reports: "+rcid);
											_log("Read report("+dt + "ms): <a target='_blank' href='/game.php?village="+curVillage+"&screen=report&mode=all&view="+rcid+"'>"+rtitle+"</a>");
										}
								}});
						}
					}
				}
			});	
	}
		}, 0)});
	setFunc("read_points", function() { 
		window.setTimeout(function() {
			var reports = getValue("reports");
			if (! reports) return false;
		for (var vid in reports) {
			url = Server + "/game.php?village="+curVillage+"&screen=info_village&id="+vid;
			var req = GM_xmlhttpRequest({
				method: "GET",
				url: url,
				data:null,
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						var did = $("table.vis:last tr:last td:last a",dodge_div)[0].href.split("target=")[1];
						if (! did) did = $("table.vis:last tr:last td:last a",dodge_div)[0].href.split("village_id=")[1];
						//var did = location.href.replace(/(.+)id=([^&]+)(.+)/g, "$2");
						//GM_log("did: "+did);
						var player = $("table.vis:last tr:eq(3) td:last",dodge_div)[0].innerHTML;
						var point = parseInt($("table.vis:last tr:eq(2) td:last",dodge_div)[0].textContent.replace(".",""));
						var points = getValue("points");
						if (!points) points = {};
						var pnt = points[did];
						if (!pnt) {
							pnt ={point:0,grow:0};
						}
						if (!pnt.grow) pnt.grow = 0;
						if (point!=pnt.point && pnt.point!=0) pnt.grow = point - pnt.point;
						pnt.point = point;
						points[did] = pnt;
						setValue("points", points);
						_log("read_points "+player+"("+did+"): "+point+" ("+pnt.grow+")",false);
					}
				}
			});	
		}
		}, 0)
	});
	function reportcache(r) {
		window.setTimeout(function() {
			iCount = r;
			//$("table.main tr:first td:first").html(_get_report_html(r));
			$("td#content_value").html(_get_report_html(r));
			//GM_log(_get_report_html(r));
			_log("reportcache: "+(r-9)+"~"+r,false);
			$("input[id='b_report']")[0].checked = true;
		},30);}; 
		
	setFunc("report_sort_for_distance", function() { 
		 window.setTimeout(function() {
			_log("report_sort_for_distance ",false);
			 var reports = getValue("reports");
			 var ret = {};
			 var temp = {};
			 var villages = myVillages();
			 //GM_log("vid: "+vid+"     cur: "+curVillage);
			 var v = villages[curVillage];
			 var i = 0;
			 var j = 0;
			 for (var report_id in reports) { 
					var report = reports[report_id];
					var distance_x = v.x - report.coords[0];
					var distance_y = v.y - report.coords[1];
					var distance = parseInt(Math.sqrt(Math.pow(distance_x,2) + Math.pow(distance_y,2)) * 1000000);
		//			log(1,report_id + " / " +distance);
					if (!temp[distance]) {
						temp[distance] = report_id;
					} else {
						i++;
						temp[distance+i]  = report_id;
					}
					j++;
			}

			var tmp = 0;
			for ( var k=0; k<j; k++) {
				i = 0;
				for (var dist in temp) {
						if (temp[dist] !="@@@") {
								if (i==0) {tmp  = parseInt(dist); i++; }
								if (parseInt(dist)<tmp) {
										tmp = parseInt(dist);	
								}
						}
				}
				var vid = reports[temp[tmp]].villageid;
				ret[vid] = reports[temp[tmp]];
		//		log(1,"temp["+tmp+"]"+temp[tmp]);
				temp[tmp] = "@@@";
			}
			setValue("reports", ret);
			_log("report_sort_for_distance: Done ",false);
		 }, 0)});	 
	setFunc("report_sort_for_time", function() { 
		window.setTimeout(function() {
			_log("report_sort_for_time ",false);
			 var reports = getValue("reports");
			 var ret = {};
			 var temp = {};
			 //var villages = myVillages();
			 //var v = villages[vid];
			 var i = 0;
			 var j = 0;
			 for (var report_id in reports) { 
					var report = reports[report_id];
					var timestamp = parseInt(report.timestamp);
		//			log(1,report_id + " / " +distance);
					if (!temp[timestamp]) {
						temp[timestamp] = report_id;
					} else {
						i++;
						temp[timestamp+i]  = report_id;
					}
					j++;
			}

			var tmp = 0;
			for ( var k=0; k<j; k++) {
				i = 0;
				for (var ts in temp) {
						if (temp[ts] !="@@@") {
								if (i==0) {
									tmp  = parseInt(ts); 
									i++; 
								}
								if (parseInt(ts)>=tmp) {
										tmp = parseInt(ts);	
								}
						}
				}
				var vid = reports[temp[tmp]].villageid;
				ret[vid] = reports[temp[tmp]];
				//log(1,"temp["+tmp+"]"+temp[tmp]);
				temp[tmp] = "@@@";
			}
			setValue("reports", ret);
			_log("report_sort_for_time: Done ",false);
		 }, 0)});	
	setFunc("report_sort_for_point", function() { 
		window.setTimeout(function() {
			_log("report_sort_for_point ",false);
			var points = getValue("points");
			 var reports = getValue("reports");
			 var ret = {};
			 var temp = {};
			 //var villages = myVillages();
			 //var v = villages[vid];
			 var i = 0;
			 var j = 0;
			 for (var vid in points) { 
				//	var report = reports[vid];
					var point = points[vid];
					var pnt = parseInt(point.point)*10000;
		//			log(1,report_id + " / " +distance);
					if (!temp[pnt]) {
						temp[pnt] = parseInt(vid);
					} else {
						i++;
						temp[pnt+i] = parseInt(vid);
					}
					j++;
			}

			var tmp = 0;
			for ( var k=0; k<j; k++) {
				i = 0;
				for (var ts in temp) {
						if (temp[ts] !="@@@") {
							if (i==0) {
								tmp  = parseInt(ts); 
								i++; 
							}
							if (parseInt(ts)>=tmp) {
								tmp = parseInt(ts);	
							}
						}
				}
				//_log("temp["+tmp+"]: "+temp[tmp]);
				var did = temp[tmp];//reports[temp[tmp]].villageid;
				if (reports[did]) ret[did] = reports[did];
				//GM_log(eval(ret[did]));
				temp[tmp] = "@@@";
			}
			//setValue("rets", ret);
			for (var did in reports) {
				if (!ret[did]) {
					ret[did] = reports[did];
				}
			}
			setValue("reports", ret);
			_log("report_sort_for_point: Done",false);
		 }, 0)});
	function _update_report(report) {
		var reports = getValue("reports");
		if(!reports) reports = {};
		reports[report.villageid] = report;
		setValue("reports", reports);
		//_log("_update_report ",false);
	}
	function _get_buildings(buildingsTD) {
		var reverse = array_flip(getValue("buildings")[curVillage]);

		var buildingsText = buildingsTD.innerHTML.replace(/<.+?>/g,""); //this can also contain the loyalty loss.
		var buildings = {};
		$.each(buildingsText.split('\n'), function(i, buildingText) {
			var tmp = buildingText.match(/\s*(.*) \(.*?(\d+)\)/);
			if(!tmp) return; // don't know what this is -- return silently
			building = tmp[1];
			var level = parseInt(tmp[2]);
			if(!reverse[building]) return;
			buildings[reverse[building]] = level;
		});
		_log("_get_buildings ",false);
		return buildings;
	}
	function enhance_game_main(doc) {
		var pa = $("table.vis:eq(2) tr:first td:first")[0];
		if (pa) {
	//	GM_log(pa.innerHTML);
			if (pa.innerHTML.indexOf("» premium account")!= -1) {
	//	GM_log(pa.innerHTML.indexOf("» premium account"));
				var pn = pa.parentNode.parentNode;
				pn.parentNode.removeChild(pn);

				//pa.parentNode.parentNode.parentNode.setAttribute("style","display:none");
			}
		}
		var wood = $("#main_buildrow_wood td .nowrap")[0];
		//GM_log(wood.innerHTML);
		var wood_level = parseInt(wood.innerHTML.match(/Level (\d+)/)[1]);
		//GM_log(wood_level);
		var _prod_wood = _production[wood_level];
		var _prod_wood_next = _production[wood_level+1];
		wood.innerHTML = "(<span class='inactive'>"+wood_level+"/</span>"+_prod_wood+"/"+_prod_wood_next+")";

		var iron = $("#main_buildrow_iron td .nowrap")[0];
		var iron_level = parseInt(iron.innerHTML.match(/Level (\d+)/)[1]);
		var _prod_iron = _production[iron_level];
		var _prod_iron_next = _production[iron_level+1];
		iron.innerHTML = "(<span class='inactive'>"+iron_level+"/</span>"+_prod_iron+"/"+_prod_iron_next+")";

		var stone = $("#main_buildrow_stone td .nowrap")[0];
		var stone_level = parseInt(stone.innerHTML.match(/Level (\d+)/)[1]);
		var _prod_stone = _production[stone_level];
		var _prod_stone_next = _production[stone_level+1];
		stone.innerHTML = "(<span class='inactive'>"+stone_level+"/</span>"+_prod_stone+"/"+_prod_stone_next+")";
		
		var farm = $("#main_buildrow_farm td .nowrap")[0];
		var farm_level = parseInt(farm.innerHTML.match(/Level (\d+)/)[1]);
		var _population_farm = farmArray[farm_level];
		var _population_farm_next = farmArray[farm_level+1];
		farm.innerHTML = "(<span class='inactive'>"+farm_level+"</span>/"+_population_farm_next+")";

		var storage = $("#main_buildrow_storage td .nowrap")[0];
		var storage_level = parseInt(storage.innerHTML.match(/Level (\d+)/)[1]);
		var capacity_storage = storageArray[storage_level];
		var capacity_storage_next = storageArray[storage_level+1];
		storage.innerHTML = "(<span class='inactive'>"+storage_level+"</span>/"+capacity_storage_next+")";

		var buildings = getValue("buildings");
		if (!buildings) var buildings = {};
		var bc = 0;
		for (var bld in buildings) { bc++;}
		if (bc == 17) {_log("enhance_game_main return",false);return;}
		var buildingset = {};
		$('table[id=buildings] tr td:first-child').each(function() {
		var tmp = this.innerHTML.match(/screen=(.*?)"><img.*> (.*)</);
		_log(bc + "\n\r"+ tmp[1]+" \n\r "+tmp[2] + "\n\r" );
			if (!buildingset[tmp[1]]) buildingset[tmp[1]] = tmp[2];
		});
		buildings[curVillage] =  buildingset;
		setValue("buildings", buildings);
		_log("enhance_game_main ",false);
	}
	function enhance_game_report(doc) {
	if(!(/view=/.test(location.href))) {
	//	read_report();
		return false;
	}
	
		var report = _generate_report();
	//GM_log(report);
		if (report) _update_report(report);
	}
	function enhance_game_place(doc) {
		  if(/try=confirm/.test(location.href) || /mode=(?:units|sim)/.test(location.href)) return;
		  var units = getValue("units");
		  if (! units) units = {};
		 // _log("enhance_game_place ",false);

		  var unitsObj = {};
		  var rallypoint = [];
		  col=0;
		//GM_log(""+$("form table.vis:eq(7)")[0].innerHTML);
		  for(var u=7;u<11;u++){
			  var ut = $("table.vis")[u];
			  $("td", ut).each(function() {
					var title = $(this).find("img")[0].title;
					var input = $(this).find("input")[0];
					//GM_log("input:"+input.name);
					//units.push(unit);
				  
					//var unitcount = parseInt($(this).find("a:last")[0].innerHTML.replace(/\(|\)/g,''));
					var unitcount = parseInt($(this).find("a:last")[0].innerHTML.replace('(','').replace(')',''));
					var unit = {id:input.name,count:unitcount,title:title,index:(input.tabIndex-1)};
					unitsObj[input.name] = unit;
					rallypoint.push(unitcount);
			  });
			  col += 1;
		  }

		  //setValue("units", units);
		  if (! units[vid]) {
			units[vid] = unitsObj;
			setValue("units", units);
		  }
		  
		  var rallypoints = getValue("rallypoints");
		  if(!rallypoints) rallypoints = new Object();
		  rallypoints[vid] = {'units':rallypoint};
		  setValue("rallypoints", rallypoints);
		  _log("enhance_game_place ",false);
	}
	function enhance_game_barracks(doc) {
		var unit_row = $('tr.row_a'); 
		var units = getValue("units");
		if(!units) units = new Object();
		var unit = units[vid];
		var unit_count = [0,0,0,0];
		var time,mins,secs,uph,upd;
		for (var u=0; u<unit_row.length; u++) {
			unit_count[u] = parseInt(unit_row[u].cells[6].innerHTML.split("/")[1],10);	
			
			mins = parseInt(unit_row[u].cells[5].innerHTML.split(":")[1],10);
			secs = parseInt(unit_row[u].cells[5].innerHTML.split(":")[2],10);
			time = mins*60+secs;
			uph = (3600/time).toFixed(1);
			upd = parseInt(24*3600/time,10);
			unit_row[u].cells[6].innerHTML += " <span class='small inactive'>("+uph+"/"+upd+")";
		}
		unit.spear.count = unit_count[0];
		unit.sword.count = unit_count[1];
		unit.axe.count = unit_count[2];
		setValue("units", units);
		_log("enhance_game_barracks ",false);
	}
	function enhance_game_stable(doc) {
		var unit_row = $('tr.row_a'); 
		var units = getValue("units");
		if(!units) units = new Object();
		var unit = units[vid];
		var unit_count = [0,0,0,0];
		var time,mins,secs,uph,upd;
		for (var u=0; u<unit_row.length; u++) {
			unit_count[u] = parseInt(unit_row[u].cells[6].innerHTML.split("/")[1]);	
			
			mins = parseInt(unit_row[u].cells[5].innerHTML.split(":")[1],10);
			secs = parseInt(unit_row[u].cells[5].innerHTML.split(":")[2],10);
			time = mins*60+secs;
			uph = (3600/time).toFixed(1);
			upd = parseInt(24*3600/time,10);
			unit_row[u].cells[6].innerHTML += " <span class='small inactive'>("+uph+"/"+upd+")";
		}
		unit.spy.count = unit_count[0];
		unit.light.count = unit_count[1];
		unit.heavy.count = unit_count[2];
		setValue("units", units);
		_log("enhance_game_stable ",false);
	}
	function enhance_game_garage(doc) {
		var unit_row = $('tr.row_a'); 
		var units = getValue("units");
		if(!units) units = new Object();
		var unit = units[vid];
		var unit_count = [0,0,0,0];
		var time,mins,secs,uph,upd;
		for (var u=0; u<unit_row.length; u++) {
			unit_count[u] = parseInt(unit_row[u].cells[6].innerHTML.split("/")[1]);	
			
			mins = parseInt(unit_row[u].cells[5].innerHTML.split(":")[1],10);
			secs = parseInt(unit_row[u].cells[5].innerHTML.split(":")[2],10);
			time = mins*60+secs;
			uph = (3600/time).toFixed(1);
			upd = parseInt(24*3600/time,10);
			unit_row[u].cells[6].innerHTML += " <span class='small inactive'>("+uph+"/"+upd+")";
		}
		unit.ram.count = unit_count[0];
		unit.catapult.count = unit_count[1];
		setValue("units", units);
		_log("enhance_game_garage ",false);
	}	
	function enhance_game_snob(doc) {
		var unit_row = $('td a:has(> img[src$="graphic/unit/unit_snob.png?1"])')[0].parentNode.parentNode;
		var units = getValue("units");
		if(!units) units = new Object();
		var unit = units[vid];
		var unit_count = unit_row.cells[4].innerHTML.split("/")[1];
		unit.snob.count = unit_count;
		setValue("units", units);
		_log("enhance_game_snob ",false);
	}	
	function enhance_game_info_village(doc) {
		var did = $("table.vis:last tr:last td:last a")[0].href.split("target=")[1];
		if (! did) did = $("table.vis:last tr:last td:last a",dodge_div)[0].href.split("village_id=")[1];
		//var did = location.href.replace(/(.+)id=([^&]+)(.+)/g, "$2");
		//GM_log("did: "+did);
		var point = parseInt($("table.vis:last tr:eq(2) td:last")[0].textContent.replace(".",""));
		var points = getValue("points");
		if (!points) points = {};
		var pnt = points[did];
		if (!pnt) pnt ={point:0};
		pnt.point = point;
		points[did] = pnt;
		setValue("points", points);
		_log("enhance_game_info_village ",false);
	}	
	function enhance_game_info_player(doc) {
		//GM_log(location.href.indexOf("id="+pid));
		if (location.href.indexOf("id="+pid)== -1) {
			_log("enhance_game_info_player: other player, return");
			return false;
		}
		var vrows = $("table.vis:eq(1) tr");
		//if (! vrows) return false;
		//GM_log("did: "+did);
		var villages = {};
		for (var r=1;r<vrows.length;r++) {
			var v = $("td:first a",vrows[r])[0];
			if (!v) return;
			var id = v.href.split("id=")[1];
			var name = v.textContent;
			var coord = $("td:eq(1)",vrows[r])[0].textContent;
			var x = coord.split("|")[0];
			var y = coord.split("|")[1];
			var point = $("td:last",vrows[r])[0].textContent;
			villages[id] = {
				id: id, 
				name: name, 
				x: parseInt(x), 
				y: parseInt(y), 
				continent: con, 
				points: point
			};			
			//GM_log("vid: "+id);
		}
		setValue("myVillages", villages);
		_log("enhance_game_info_player ",false);
	}	
	function display_troops() {
		var ua = getValue("units");
		var va = getValue("myVillages");
		if (!ua || !va) return false;
		var html = "<br/>";
		var u = ua[vid];
		html += "<table class='content-border' width='100%'>";
		html += "<tr><th>Villages</th>";
		for (var t in u) {
			var ui = u[t];
			html += "<th><img src='"+imgbase + "/unit/unit_"+ui.id+".png?1' style='margin:0px 2px' title='"+ui.title+"'>";
		}
		html += "</tr>";
		for (var v in va) {
			var id =va[v].id;
			var u = ua[id];
			html += "<tr>";
			html += "<td>"+va[v].name+"</td>";
			for (var t in u) {
				var ui = u[t];
				html += "<td>"+ui.count+"</td>";
			}
			html += "</tr>";
		}
		$("#content_value")[0].innerHTML += html;
	}
// -//////////////////-dodge-/////////////////////////-
	function get_server_time(doc){
		var sdt = $("[id='serverDate']",doc)[0].innerHTML.split("/");
		var sy = sdt[2];
		var sm = sdt[1];
		var sd = sdt[0];
		var st = $("[id='serverTime']",doc)[0].innerHTML;
		//var h = st.split(":")[0], min = st.split(":")[1], sec = st.split(":")[2];
		var ret = new Date(sy+ " "+sm+ " "+sd+ " "+ st);
		return ret;
	}
	function get_timeDiff(){
		var timec = [0,0];
		var iii = 0;
			var t0 = new Date().getTime();
			var ret = ajax(Server + "/game.php?village="+curVillage+"&screen=place", "GET");
			var t1 = new Date().getTime();
			timec[0] = t1 -t0;
			dodge_div.innerHTML = ret.responseText;
			timec[1] = get_server_time(dodge_div).getTime()-((new Date()).getTime()-timeZone);
		return timec;
	}
	function _final(doc){
		
		//var move = $("table.vis:last tr:last td:eq(1)",doc)[0].innerHTML;
		//var move1 = $("table.vis:last tr:last td:last",doc)[0].innerHTML;
		//_log("Arrival time: "+move +" <<"+ move1+">>",true);
		_log("<table class='vis'>"+$("table.vis:last",doc)[0].innerHTML+"</table>",true);
	}
	function dodge_final(doc){
		try{
			dodge_target.action_id =$("input[name='action_id']",doc)[0].value;
			dodge_target.url=$("form",doc)[0].action;
		} catch(e){
			var ss_time = get_server_time(doc);
			_log("<font color='blue'>"+ss_time +"</font>:  final: getValue fail ",true);
			return false
		}
		postvar += 	"&action_id="+dodge_target.action_id + 
					"&sumbit="+dodge_target.sumbit;
	//GM_log(postvar);
		GM_xmlhttpRequest({
				method: "POST",
				url: dodge_target.url,
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				data:encodeURI(postvar),
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						var ss_time = get_server_time(dodge_div);
						//_log("<font color='blue'>"+(ss_time.getTime()-temp)+"</font>",false);
						_log("<font color='blue'>"+ss_time +"</font>:  Complete  "+dodge_target.action_id,true);
						_final(dodge_div);
					}
				}
		});	
	}
	function dodge_confirm(doc){
		var url = Server + "/game.php?village="+curVillage+"&screen=place&try=confirm";
		try{
			var exx=$("a[href^='javascript:insertUnit']",doc);
			dodge_target[unitsArray[0]] = exx[0].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[1]] = exx[1].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[2]] = exx[2].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[3]] = exx[3].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[4]] = exx[4].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[5]] = exx[5].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[6]] = exx[6].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[7]] = exx[7].innerHTML.replace("(","").replace(")","");
			dodge_target[unitsArray[8]] = exx[8].innerHTML.replace("(","").replace(")","");
			//dodge_target[unitsArray[9]] = exx[9].innerHTML.replace("(","").replace(")","");
			//dodge_target[unitsArray[10]] = exx[10].innerHTML.replace("(","").replace(")","");
			//dodge_target[unitsArray[11]] = exx[11].innerHTML.replace("(","").replace(")","");
			dodge_target.x=$("input[name='x']",doc)[0].value;
			dodge_target.y=$("input[name='y']",doc)[0].value;
			dodge_target.url=$("form",doc)[0].action;
		} catch(e){
			var ss_time = get_server_time(doc);
			_log("<font color='blue'>"+ss_time +"</font>:  Confirm: getValue fail",true);
			return false;
		}
		postvar =	"x="+dodge_target.x + 
					"&y="+dodge_target.y + 
					(dodge_target.support?("&support="+dodge_target.support):"") + 
					(dodge_target.attack?("&attack="+dodge_target.attack):"") + 
					"&"+unitsArray[0]+"="+dodge_target[unitsArray[0]] + 
					"&"+unitsArray[1]+"="+dodge_target[unitsArray[1]] + 
					"&"+unitsArray[2]+"="+dodge_target[unitsArray[2]] + 
					"&"+unitsArray[3]+"="+dodge_target[unitsArray[3]] + 
					"&"+unitsArray[4]+"="+dodge_target[unitsArray[4]] + 
					"&"+unitsArray[5]+"="+dodge_target[unitsArray[5]] + 
					"&"+unitsArray[6]+"="+dodge_target[unitsArray[6]] + 
					"&"+unitsArray[7]+"="+dodge_target[unitsArray[7]] + 
					"&"+unitsArray[8]+"="+dodge_target[unitsArray[8]];
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:encodeURI(postvar),
			onload: function(responseDetails) 
			{
				if (responseDetails.status  == 200) {
					dodge_div.innerHTML = responseDetails.responseText;		
					var ss_time = get_server_time(dodge_div);
					var _t = dodge_time.getTime()-ss_time.getTime()-tc-500;				
					setTimeout(function(){
						dodge_final(dodge_div);
					},_t);
					_log("<font color='blue'>"+ss_time +"</font>:  Confirm",true);
					_log($("table[id='contentContainer']",dodge_div)[0].innerHTML,true);
					_log("<font color='blue'>"+ss_time +"</font>:  Delay "+_t+"(ms)",true);
				}
			}
		});
		
	}
	function dodge(x,y,url) { 
		url = Server + "/game.php?village="+curVillage+"&screen=place";
	//_log(url,true);
	//GM_log(doc.innerHTML);
		postvar = "x="+x+"&y="+y;
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:encodeURI(postvar),
			onload: function(responseDetails) 
				{
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						var ss_time = get_server_time(dodge_div);
						dodge_confirm(dodge_div)
						_log("<font color='blue'>"+ss_time +"</font>:  Command",true);
					}
				}
		});
	}
	function ready_to_dodge(){
			GM_xmlhttpRequest({
				method: "GET",
				data: null,
				url: dodge_target.url,
				onload: function(responseDetails) 
					{
						if (responseDetails.status  == 200) {
							dodge_div.innerHTML = responseDetails.responseText;
							var ss_time = get_server_time(dodge_div);
							var _t = dodge_time.getTime()-ss_time.getTime()-td-tc-5*1000;
							//setTimeout(function(){dodge(dodge_target.x,dodge_target.y,dodge_target.url);},_t-300);
							setTimeout(function(){dodge(dodge_target.x,dodge_target.y,dodge_target.url);},_t);
							_log("<font color='blue'>"+ss_time +"</font>:  startting dodge at <font color='green'>"+_t/1000+"</font>(s) later",true);
						}
					}
			});
	}
	function set_time_difference_calibration(){
		var diff = 0;
		var iii = 0;
		for (i=0;i<5;i++) {
			var ret = get_timeDiff();
			iii += ret[0];
			diff += ret[1];
			//_log("time difference: "+ret[1]+"ms,  time calibration: "+ret[0]+"ms",true);
		}
		tc = iii/5;
		td = diff/5;
		ready_to_dodge();
		_log("<font color='blue'>"+get_server_time(dodge_div) +"</font>:  td:"+td+"   tc:"+tc,true);
		$("#ii0")[0].value = tc;
		$("#diff0")[0].innerHTML = "time difference: " + td;
	}
	setFunc("countdown", function(){ 
		dodge_count -= 1000;
		if (dodge_count<30*1000) {
			window.clearInterval(t0);
			var ret = get_timeDiff();
			setTimeout(function(){set_time_difference_calibration()},0);
			_log(curVillage+" Getting time difference & time calibration",true);
		} else {
			$("#countdown")[0].innerHTML = dodge_count/1000;
		}
	});
	setFunc("setdodge", function(){ window.setTimeout(function() {
		if (t0) window.clearInterval(t0);
		interval = parseInt($("input[id='timer0']")[0].value);
		tc = parseInt($("#ii0")[0].value);
		dodge_target.url = Server + "/game.php?village="+curVillage+"&screen=place";
		dodge_target.x = $("input[id='x0']")[0].value;
		dodge_target.y = $("input[id='y0']")[0].value;
		var y=$("input[id='year']")[0].value;
		var m=$("input[id='month']")[0].value;
		var d=$("input[id='day']")[0].value;
		var h=$("input[id='hour']")[0].value;
		var min=$("input[id='minute']")[0].value;
		var sec=$("input[id='second']")[0].value;
		mm=parseInt($("input[id='mm']")[0].value);
		dodge_time = new Date((new Date(y+" "+m+" "+d+" "+h+":"+min+":"+sec)).getTime()+mm);
		server_time = get_server_time(window.document);
		dodge_count = dodge_time.getTime() - server_time.getTime(); // -----///
	//	server_time = new Date(server_time+1000*3600*7);
//	GM_log(interval+"      dodge_time: "+dodge_time.getTime()+"  server_time:"+server_time.getTime()+"   "+(dodge_time.getTime()-server_time.getTime()));
		t0 = window.setInterval("countdown()",interval);
		_log("<font color='blue'>"+server_time +"</font>:  Countdown <font color='green'><span id='countdown'>"+dodge_count/1000+"</span></font>(s)",true);
	}, 0)});	 
	setFunc("changeOpt", function(index){ window.setTimeout(function() {
		var coord = $("select[name='coords']")[0].options[index].text;
		$("input[id='x0']")[0].value = coord.split("|")[0];
		$("input[id='y0']")[0].value = coord.split("|")[1];
		var vil = getValue("myVillages");
		var v = vil[curVillage];
		var to = [v.x,v.y];
		var from = coord.split("|");
		var d = get_distance_num(from, to);
		_log(v.id+"  ("+v.x+"|"+v.y +")  "+d.toFixed(2),false);
	}),0});
	setFunc("setOpt", function(id){ window.setTimeout(function() {
		var att = $("input[id='att']")[0];
		var spt = $("input[id='spt']")[0];
		if (id=="att") spt.checked = !att.checked;
		if (id=="spt") att.checked = !spt.checked;
		dodge_target.attack = att.checked;
		dodge_target.support = spt.checked;
		_log("  attack: "+dodge_target.attack+"&nbsp;     support: "+dodge_target.support,false);
	}),0});
	function TroopsSave () {
		var reports = eval(GM_getValue(_Unique+"_reports"));
		var coordx0 = "0";
		var coordy0 = "0";
		var strOpt = "<select name='coords' onChange='changeOpt(this.options.selectedIndex)'>";
		for(var v in reports) {
			var report = reports[v];
			var coord = report.coords.join('|');
			if (coordx0 == "0") {coordx0 = report.coords[0];coordy0 = report.coords[1];};
			strOpt += "<option value='" +coord+"'>"+coord+"</option>"
		}
		strOpt += "</select>";
		var stime = get_server_time(window.document);
	//GM_log(stime);
		var ltime = new Date();
		td = (ltime.getTime()-stime.getTime()-1000*3600*12)>0?(ltime.getTime()-stime.getTime()-1000*3600*12):0-(ltime.getTime()-stime.getTime()-1000*3600*12);
		tc = 2750 - td;

// ---------------------------------------------------------//
		var units = getUnits()[curVillage];
		var col = 1;
		var html = "<table>" + 
					"<tr><td>";
		  
		html += "<table class='header-border'><tr><td>" + 
				"<table class='box menu nowrap'>";
		html += "<tr>";
		for(var i in units) {
			var unit = units[i];
			html += "<td class='icon-box nowrap'>" + 
					"<img src='"+imgbase +"/unit/unit_"+unit.id+".png' title='"+unit.title+"' />" +
					"</td>";
		}
		html += "<td class='icon-box nowrap'>x </td><td class='icon-box nowrap'>y </td>";
		html += "</tr><tr class='newStyleOnly'><td class='shadow' colspan='14'>" + 
				"<div class='leftshadow'></div><div class='rightshadow'></div>" + 
				"</td></tr>";
		for (var row=0;row<3;row++) {
			html += "<tr>";
			for(var i in units) {
				var unit = units[i];
				html += "<td class='icon-box nowrap'>" + 
						"<input style='height:12px;' type='text' value='' tabindex='"+(unit.index+1)+"' size='6' name='"+unit.id+"_"+row+"'/>" +
						"</td>";
			}
			html += "<td class='icon-box nowrap'><input type='text' size='5' value='' name='x_"+row+"' id='inputx' /></td>";
			html += "<td class='icon-box nowrap'><input type='text' size='5' value='' name='y_"+row+"' id='inputy' /></td>";
			html += "</tr>";
		}

		html += "</table></td></tr></table></td></tr></table>";
		html += "<br/>";
//----------------------------------------------------------//		
		var mstime = 0;
		str = "<table class='box' width='100%'><tr><td><table class='vis' width='100%'><tr><th>" + 
				"<input type='button' id='dodge' onclick='javascript:setdodge();' value='dodge'/>" + 
				"<label><input type='radio' id='att' onchange='javascript:setOpt(\"att\");'/>attack </label>" + 
				"<label><input type='radio' id='spt' onchange='javascript:setOpt(\"spt\");'/>support </label>" + 
				"<span style='float:right;'>Timeout:<input id='timer0' name='timer0' size='5' value='1000' type='text' /></span>" + 
				"</th></tr>" + 
				"<tr><th><table class='vis' width='100%'><tbody><tr class='nowrap'><td width='50%'>" + 
				"time calibration(ms):<input id='ii0' name='ii0' size='4' value='"+tc+"' type='text' />" +
				"     time difference(ms):<input id='diff0' name='diff0' size='4' value='"+td+"' type='text' />" +
				"</td><td>" + 
				"x: <input id='x0' name='x0' size='4' value='"+coordx0+"' type='text' /> " +
				"y: <input id='y0' name='y0' size='4' value='"+coordy0+"' type='text' /> " + 
				strOpt+"</td></tr>" + 
				"<tr class='nowrap' colspan='2'><th colspan='2'>" + 
				"departure time:" + 
				"</th></tr>" + 
				"<tr class='nowrap'><td>" + 
				"Date(yyyy-mm-dd):<input id='year' name='year' size='4' value='"+stime.getFullYear()+"' type='text' />" + 
				" - <input id='month' name='month' size='2' value='"+(stime.getMonth()+1)+"' type='text' />" + 
				" - <input id='day' name='day' size='2' value='"+stime.getDate()+"' type='text' />" + 
				"</td><td>" + 
				"Time(hh:mm:ss.mm):<input id='hour' name='hour' size='3' value='"+stime.getHours()+"' type='text' />" + 
				" : <input id='minute' name='minute' size='3' value='"+(parseInt(stime.getMinutes())+2)+"' type='text' />" + 
				" : <input id='second' name='second' size='3' value='00' type='text' />" + 
				".<input id='mm' name='mm' size='4' value='"+mstime+"' type='text' />" + 
				"</th></tr>" + 
				"</td></tr>" + 
				"</tbody></table></td></tr><tr><th>Message:</th></tr>" + 
				"<tr><td id='info_div0'>" + 
				"input data and then click the checkbox to dodge for your troops.<br/>" + 
				"</td></tr></table></td></tr></table>";
		//str = html + str;

		$("td#content_value").html(str);
	}
//---////////////////////////---farm start---////////////////////////---//
	function set_farm_flag(ss_time){
		var reports = getValue("reports");

		var report = reports[farm_target.vid];
		report.ifarm = ss_time;
		//_log("update report: "+farm_target.vid);
		_update_report(report);
		setValue("reports", reports);
		_log("Complete at <font color='blue'>"+ss_time+"</font>."+farm_target.x+"|"+farm_target.y,false);
	}
	function farm_final(vid,doc){
		try{
			farm_target.ch =$("input[name='ch']",doc)[0].value;
			farm_target.action_id =$("input[name='action_id']",doc)[0].value;
			farm_target.url=$("form",doc)[0].action;
		} catch(e){
			var t=new Date();
			_log("final: get <i>action_id</i>  fail <font color='red'>"+t+"</font>  "+farm_target.x+"|"+farm_target.y);
			return false
		}
		postvar += 	"&action_id="+farm_target.action_id + 
					"&ch="+ farm_target.ch + 
					"&sumbit="+farm_target.sumbit;
	//GM_log(postvar);
		GM_xmlhttpRequest({
				method: "POST",
				url: farm_target.url,
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				data:encodeURI(postvar),
				onload: function(responseDetails){
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						var ss_time = get_server_time(dodge_div);
						set_farm_flag($("[id='serverTime']",dodge_div)[0].innerHTML);
						var xpath = "td[id='att"+vid+"']";
						$(xpath)[0].innerHTML = "<b><u>"+$("[id='serverTime']",dodge_div)[0].innerHTML+"</u></b>";
						//xpathGetFirst(xpath).innerHTML = "<img src='"+imgbase +"/command/attack.png?1'/>";
						//_log("Complete at <font color='blue'>"+ss_time+"</font>."+farm_target.x+"|"+farm_target.y,false);
						
					}
				}
		});	
	}
	function farm_confirm(vid,doc){
		var url = Server + "/game.php?village="+curVillage+"&screen=place&try=confirm";
		try{// 0:spear 2:axe 3:spy 4:LC
			var exx=$("a[href^='javascript:insertUnit']",doc);
	//GM_log("world"+World+" ///  "+"exx[3]"+exx[3].innerHTML);
			if (parseInt(farm_target[unitsArray[3]])>parseInt(exx[3].innerHTML.replace("(","").replace(")",""))) farm_target[unitsArray[3]] = 0;
			
			if (parseInt(farm_target[unitsArray[2]])>0) {
				farm_target[unitsArray[2]] = parseInt(exx[2].innerHTML.replace("(","").replace(")",""));
				farm_target[unitsArray[8]] = parseInt(exx[8].innerHTML.replace("(","").replace(")",""));
				farm_target[unitsArray[4]] = 0;
			} 
			else if (parseInt(farm_target[unitsArray[0]])>0) {
				farm_target[unitsArray[0]] = parseInt(exx[0].innerHTML.replace("(","").replace(")",""));
				farm_target[unitsArray[8]] = parseInt(exx[8].innerHTML.replace("(","").replace(")",""));
				farm_target[unitsArray[4]] = 0;
			}
			else if (parseInt(farm_target[unitsArray[4]])>parseInt(exx[4].innerHTML.replace("(","").replace(")",""))) {
				var uc = parseInt(exx[4].innerHTML.replace("(","").replace(")",""),10);
				var refarm = "<a href='javascript:farmIt(" + 
							vid + 
							"," + 
							farm_target.x + 
							"," + 
							farm_target.y + 
							"," + 
							uc + 
							",true,false,false)'> farm with " + 
							unitsArray[4]+ 
							"" + 
							exx[4].innerHTML + 
							"?</a>";
				_log("Confirm data: Not enough unit, "+refarm,false);
				return false;
			} else {
				farm_target[unitsArray[8]] = 0;
				//$("a[href^='javascript:insertUnit']")[4].innerHTML = parseInt(exx[4].innerHTML)-farm_target[unitsArray[4]];
			}
			farm_target.x=$("input[name='x']",doc)[0].value;
			farm_target.y=$("input[name='y']",doc)[0].value;
			farm_target.url=$("form",doc)[0].action;
			farm_target.spec_name=$("form > input:first",doc)[0].name;
			farm_target.spec_value=$("form > input:first",doc)[0].value;
		//	GM_log("spec_"+farm_target.spec_name+"="+farm_target.spec_value);
		} catch(e){
			var ttt=new Date();
			_log("confirm: get <i>units</i> or <i>coords</i> fail <font color='red'>"+ttt+"</font>  "+farm_target.x+"|"+farm_target.y);
			return;
		}
		var uc = $("a[href^='javascript:insertUnit']");
		for (var u=0;u<9;u++) {
			uc[u].innerHTML = "("+(parseInt(exx[u].innerHTML.replace("(","").replace(")",""))-farm_target[unitsArray[u]])+")";
			//GM_log(parseInt(uc[u].innerHTML.replace("(","").replace(")",""))+"    "+farm_target[unitsArray[u]]);
		}
		postvar = "x="+farm_target.x + 
					"&y="+farm_target.y + 
					"&" + farm_target.spec_name +
					"=" + farm_target.spec_value + 
					"&attack="+farm_target.attack;
		postvar += "&"+unitsArray[0]+"="+farm_target[unitsArray[0]];
		postvar += "&"+unitsArray[1]+"="+farm_target[unitsArray[1]];
		postvar += "&"+unitsArray[2]+"="+farm_target[unitsArray[2]];
		postvar += "&"+unitsArray[3]+"="+farm_target[unitsArray[3]];
		postvar += "&"+unitsArray[4]+"="+farm_target[unitsArray[4]];
		postvar += "&"+unitsArray[5]+"="+farm_target[unitsArray[5]];
		postvar += "&"+unitsArray[6]+"="+farm_target[unitsArray[6]];
		postvar += "&"+unitsArray[7]+"="+farm_target[unitsArray[7]];
		postvar += "&"+unitsArray[8]+"="+farm_target[unitsArray[8]];
		//postvar += "&"+unitsArray[9]+"="+farm_target[unitsArray[9]];
		//postvar += "&"+unitsArray[10]+"="+farm_target[unitsArray[10]];
		//postvar += "&"+unitsArray[11]+"="+farm_target[unitsArray[11]];
		GM_xmlhttpRequest({
				method: "POST",
				url: url,
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				data:encodeURI(postvar),
				onload: function(responseDetails) 
					{
						if (responseDetails.status  == 200) {
							dodge_div.innerHTML = responseDetails.responseText;
							_log("Confirm data, "+farm_target.x+"|"+farm_target.y,false);
							farm_final(vid,dodge_div);
						}
					}
		});	
	}
	function farm(vid,x,y) { 
	url = Server + "/game.php?village="+curVillage+"&screen=place";
	postvar = "x="+x+"&y="+y;
	var xhReq = GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:encodeURI(postvar),
			onload: function(responseDetails) 
				{
					if (responseDetails.status  == 200) {
						dodge_div.innerHTML = responseDetails.responseText;
						_log("Set up data, "+farm_target.x+"|"+farm_target.y,false);
						farm_confirm(vid,dodge_div);
					}
				}
		});
	}
	function ready_to_farm(vid,x,y){
			var url = Server + "/game.php?screen=place";
			GM_xmlhttpRequest({
				method: "GET",
				data: null,
				url: url,
				onload: function(responseDetails) 
					{
						if (responseDetails.status  == 200) {
							dodge_div.innerHTML = responseDetails.responseText;
							_log("enter rallypoint, "+farm_target.x+"|"+farm_target.y,false);
							setTimeout(function(){farm(vid,x,y);},100); 
							return; 
						}
					}
			});
	}
	setFunc("farmIt", function(vid,x,y,cavCount,bSpy,bAxe,bSpear){ window.setTimeout(function() {
		if (bAxe) {farm_target[unitsArray[2]] = 1;} 
		else if (bSpear) {farm_target[unitsArray[0]] = 1;}
		else {
			farm_target[unitsArray[3]] = 0;
			farm_target[unitsArray[4]] = cavCount;
		}
		if (bSpy) farm_target[unitsArray[3]] = 1;
		else farm_target[unitsArray[3]] = 0;
		//farm_target[unitsArray[5]] = cavCount;
		farm_target.x = x;
		farm_target.y = y;
		farm_target.vid = vid;
		_log("Satrting... "+farm_target.x+"|"+farm_target.y,false);
		ready_to_farm(vid,x,y);
	},0)});
// ---////////////////////////---farm end---////////////////////////---//
	function set_report_menu(iStep){
		var reports = getReportsByVillage();
		var i=0;
		for (var report_id in reports) { i++;}

		var iCnt = ((i/iStep)+1);
		var strRC = '&nbsp;&nbsp;»<a href="javascript:read_all_report()"> R<span class="small">ead all reports</span></a>';
		strRC += '&nbsp;»<a href="javascript:read_points()"> G<span class="small">et points</span></a>';
		strRC += '&nbsp;»<a href="javascript:report_sort_for_distance()" title="Sort report with distance"> d<span class="small">istance</span></a>'; 
		strRC += '&nbsp;»<a href="javascript:report_sort_for_point()" title="Sort report with point"> p<span class="small">oint</span></a>'; 
		strRC += '&nbsp;»<a href="javascript:report_sort_for_time()" title="Sort report with time"> t<span class="small">ime</span></a>'; 
		
		var strOpt = "";
		strOpt = "&nbsp;&nbsp;<select name='report_step' onChange='changeStep(this.options.selectedIndex)' style='color:white;background-Color: #987634;border:1px solid white;'>";
		strOpt += "<option value='"+(iStep-4)+"'>"+(iStep-4)+"</option>";
		strOpt += "<option value='"+(iStep-2)+"'>"+(iStep-2)+"</option>";
		strOpt += "<option value='"+(iStep)+"' selected='true'>"+(iStep)+"</option>";
		strOpt += "<option value='"+(iStep+2)+"'>"+(iStep+2)+"</option>";
		strOpt += "<option value='"+(iStep+6)+"'>"+(iStep+6)+"</option>";
		strOpt += "<option value='"+(iStep+10)+"'>"+(iStep+10)+"</option>";

		strOpt += "</select>";

		strOpt += "<select name='report_list' onChange='changeReport(this.options.selectedIndex)' style='color:white;background-Color: #987634;border:1px solid white;'>";
		strOpt += "<option value='9999'>Report</option>";
		strOpt += "<option value='0'>All</option>";
		for (ii=1; ii<iCnt; ii++) {
			strOpt += "<option value='" + ii*iStep +"'>"+((ii-1)*iStep+1) + ' ~' + ii*iStep +"</option>"
		}
		
		strOpt += "</select>";
		strRC += strOpt;
		strRC += "" + 
				"<input id='b_report' name='b_report' type='checkbox' valign='middle'" + 
				" onChange='javascript:display_report_cache();' style='color:white;background-Color: #987634;border:1px solid white;'>" + 
				"<b>t<span class='small'>oggle &nbsp;</span></b></input>";
		if (! br) rhtml = $("td#content_value")[0].innerHTML;
		return strRC;
	}
	setFunc("changeVil", function(index){ window.setTimeout(function() {
		var vid = $("select[name='vills']")[0].options[index].value;
		var url = location.href.replace(/village=([^&]+)/g,"village="+vid);
		setValue("village_selected",parseInt(vid));
		location.href = url;
	}),0});
	function set_vil_menu() {
		var vils = myVillages();
		var vils = getValue("myVillages");
		var vv = 0;
		for (var vid in vils) {vv++;}
		var disabled = false;
		if (vv==1) disabled = true;
		var vhtml = "<select id='vills' name='vills' onChange='changeVil(this.options.selectedIndex)' " + 
					"style='color:#885614;background-Color: RGB(194,174,131);border:1px solid #987644;'>";
		for (var vid in vils) {
			var vil = vils[vid];
	//GM_log(vil.x);
			var sel = curVillage==vid?'selected="true"':'';
	//GM_log("curVillage: "+curVillage+"   vid: "+vid);
			vhtml += '<option value="'+vid+'" '+sel+'>' + 
					vil.name + "  ("+vil.points+")" +
					'</option>';
		}
		vhtml += '</select>';
		//GM_log("vhtml: "+vhtml);
		$("td#menu_row2_village")[0].innerHTML = vhtml;	
		//GM_log("vhtml: "+$("td#menu_row2_village")[0].innerHTML);
	}
	if (true) {
		if (Screen == "main") enhance_game_main();
		else if (Screen == "report") enhance_game_report();
		else if (Screen == "overview_villages") {getUserVillages();display_troops();}
		else if (Screen == "place") enhance_game_place();
		else if (Screen == "stable") enhance_game_stable();
		//else if (Screen == "statue") enhance_game_statue();
		else if (Screen == "garage") enhance_game_garage();
		else if (Screen == "barracks") enhance_game_barracks();
		else if (Screen == "snob") enhance_game_snob();
		else if (Screen == "premium") TroopsSave();
		else if (Screen == "info_village") enhance_game_info_village();
		else if (Screen == "info_player") enhance_game_info_player();
/*		
		var units = getValue("units");
		if (!units) {
			var units = new Object();
			units[vid] = { // var unitsArray = ["spear","sword","axe","spy","light","heavy","ram","catapult","knight","snob","Militia"];
				spear: 0,
				sword: 0,
				axe: 0,
				spy: 0,
				light: 0,
				heavy: 0,
				ram: 0,
				catapult: 0,
				knight: 0,
				snob: 0,
				Militia: 0
			}
			setValue("units",units);
		}
*/
		unit_index = getValue("unit_index");
		if(!unit_index) {
			setValue("unit_index",4);
			
			unit_index = 4;
		}
		//GM_log("unit_index: "+unit_index);
		troops_type = unitsArray[unit_index];
		
		unit_haul = haulArray[unit_index]; 
	//GM_log("troops_type: "+troops_type+"  unit_haul: "+unit_haul);
	
	//	if ($("[class='icon header new_report']").length>0)  window.setTimeout(function() {read_report();},2);
		if (villages_count>1) set_vil_menu();
		rStep = getValue("report_step");
		if (! rStep) {
			rStep = 10;
			setValue("report_step",rStep);
		}
		strRC = set_report_menu(rStep);
		$("tr[id='menu_row'] td:eq(1) a")[0].href += "&mode=attack";

		var crd = $("tr[id='menu_row2'] td:eq(5) a[href='#']")[0];
		//GM_log(crd.innerHTML);
		if (crd) crd.parentNode.setAttribute("style","display:none");
		var crd = $("tr[id='menu_row2'] td:eq(4) b.nowrap")[0];
		//GM_log(crd.innerHTML);
		if (crd) crd.parentNode.setAttribute("style","display:none");
		var crd = $("tr[id='menu_row2'] td:eq(2) b.nowrap")[0];
		//GM_log(crd.innerHTML);
		if (crd) crd.parentNode.setAttribute("style","display:none");
		
		var MaJia = "M<span class='small'>a</span>J<span class='small'>ia</span> <span class='small'>2011</span>";

		var menu_row2 = $("tr[id='menu_row2']")[0];
		menu_row2.innerHTML = menu_xhtml +menu_row2.innerHTML;
		$("div[id='footer']")[0].innerHTML = strRC;
		btime = new Date()- btime;
		_msg(""+btime+"ms  "); 
	}
//} 
//catch(e){
//	GM_log("Error: "+e);
//	return false
//}
	