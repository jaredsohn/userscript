// ==UserScript==
// @name           Plurk Smile by @Lidsa edited from me
// @namespace     créditos para http://phpz.org/ - http://lidsa.org
// @description    Smilies Variados adicionais Para Plurk.com
// @include        http://www.plurk.com/*
// @exclude        http://www.plurk.com/m/*
// ==/UserScript==

// jQuery 1.2.6 pack
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(H(){J w=1b.4M,3m$=1b.$;J D=1b.4M=1b.$=H(a,b){I 2B D.17.5j(a,b)};J u=/^[^<]*(<(.|\\s)+>)[^>]*$|^#(\\w+)$/,62=/^.[^:#\\[\\.]*$/,12;D.17=D.44={5j:H(d,b){d=d||S;G(d.16){7[0]=d;7.K=1;I 7}G(1j d=="23"){J c=u.2D(d);G(c&&(c[1]||!b)){G(c[1])d=D.4h([c[1]],b);N{J a=S.61(c[3]);G(a){G(a.2v!=c[3])I D().2q(d);I D(a)}d=[]}}N I D(b).2q(d)}N G(D.1D(d))I D(S)[D.17.27?"27":"43"](d);I 7.6Y(D.2d(d))},5w:"1.2.6",8G:H(){I 7.K},K:0,3p:H(a){I a==12?D.2d(7):7[a]},2I:H(b){J a=D(b);a.5n=7;I a},6Y:H(a){7.K=0;2p.44.1p.1w(7,a);I 7},P:H(a,b){I D.P(7,a,b)},5i:H(b){J a=-1;I D.2L(b&&b.5w?b[0]:b,7)},1K:H(c,a,b){J d=c;G(c.1q==56)G(a===12)I 7[0]&&D[b||"1K"](7[0],c);N{d={};d[c]=a}I 7.P(H(i){R(c 1n d)D.1K(b?7.V:7,c,D.1i(7,d[c],b,i,c))})},1g:H(b,a){G((b==\'2h\'||b==\'1Z\')&&3d(a)<0)a=12;I 7.1K(b,a,"2a")},1r:H(b){G(1j b!="49"&&b!=U)I 7.4E().3v((7[0]&&7[0].2z||S).5F(b));J a="";D.P(b||7,H(){D.P(7.3t,H(){G(7.16!=8)a+=7.16!=1?7.76:D.17.1r([7])})});I a},5z:H(b){G(7[0])D(b,7[0].2z).5y().39(7[0]).2l(H(){J a=7;1B(a.1x)a=a.1x;I a}).3v(7);I 7},8Y:H(a){I 7.P(H(){D(7).6Q().5z(a)})},8R:H(a){I 7.P(H(){D(7).5z(a)})},3v:H(){I 7.3W(19,M,Q,H(a){G(7.16==1)7.3U(a)})},6F:H(){I 7.3W(19,M,M,H(a){G(7.16==1)7.39(a,7.1x)})},6E:H(){I 7.3W(19,Q,Q,H(a){7.1d.39(a,7)})},5q:H(){I 7.3W(19,Q,M,H(a){7.1d.39(a,7.2H)})},3l:H(){I 7.5n||D([])},2q:H(b){J c=D.2l(7,H(a){I D.2q(b,a)});I 7.2I(/[^+>] [^+>]/.11(b)||b.1h("..")>-1?D.4r(c):c)},5y:H(e){J f=7.2l(H(){G(D.14.1f&&!D.4n(7)){J a=7.6o(M),5h=S.3h("1v");5h.3U(a);I D.4h([5h.4H])[0]}N I 7.6o(M)});J d=f.2q("*").5c().P(H(){G(7[E]!=12)7[E]=U});G(e===M)7.2q("*").5c().P(H(i){G(7.16==3)I;J c=D.L(7,"3w");R(J a 1n c)R(J b 1n c[a])D.W.1e(d[i],a,c[a][b],c[a][b].L)});I f},1E:H(b){I 7.2I(D.1D(b)&&D.3C(7,H(a,i){I b.1k(a,i)})||D.3g(b,7))},4Y:H(b){G(b.1q==56)G(62.11(b))I 7.2I(D.3g(b,7,M));N b=D.3g(b,7);J a=b.K&&b[b.K-1]!==12&&!b.16;I 7.1E(H(){I a?D.2L(7,b)<0:7!=b})},1e:H(a){I 7.2I(D.4r(D.2R(7.3p(),1j a==\'23\'?D(a):D.2d(a))))},3F:H(a){I!!a&&D.3g(a,7).K>0},7T:H(a){I 7.3F("."+a)},6e:H(b){G(b==12){G(7.K){J c=7[0];G(D.Y(c,"2A")){J e=c.64,63=[],15=c.15,2V=c.O=="2A-2V";G(e<0)I U;R(J i=2V?e:0,2f=2V?e+1:15.K;i<2f;i++){J d=15[i];G(d.2W){b=D.14.1f&&!d.at.2x.an?d.1r:d.2x;G(2V)I b;63.1p(b)}}I 63}N I(7[0].2x||"").1o(/\\r/g,"")}I 12}G(b.1q==4L)b+=\'\';I 7.P(H(){G(7.16!=1)I;G(b.1q==2p&&/5O|5L/.11(7.O))7.4J=(D.2L(7.2x,b)>=0||D.2L(7.34,b)>=0);N G(D.Y(7,"2A")){J a=D.2d(b);D("9R",7).P(H(){7.2W=(D.2L(7.2x,a)>=0||D.2L(7.1r,a)>=0)});G(!a.K)7.64=-1}N 7.2x=b})},2K:H(a){I a==12?(7[0]?7[0].4H:U):7.4E().3v(a)},7b:H(a){I 7.5q(a).21()},79:H(i){I 7.3s(i,i+1)},3s:H(){I 7.2I(2p.44.3s.1w(7,19))},2l:H(b){I 7.2I(D.2l(7,H(a,i){I b.1k(a,i,a)}))},5c:H(){I 7.1e(7.5n)},L:H(d,b){J a=d.1R(".");a[1]=a[1]?"."+a[1]:"";G(b===12){J c=7.5C("9z"+a[1]+"!",[a[0]]);G(c===12&&7.K)c=D.L(7[0],d);I c===12&&a[1]?7.L(a[0]):c}N I 7.1P("9u"+a[1]+"!",[a[0],b]).P(H(){D.L(7,d,b)})},3b:H(a){I 7.P(H(){D.3b(7,a)})},3W:H(g,f,h,d){J e=7.K>1,3x;I 7.P(H(){G(!3x){3x=D.4h(g,7.2z);G(h)3x.9o()}J b=7;G(f&&D.Y(7,"1T")&&D.Y(3x[0],"4F"))b=7.3H("22")[0]||7.3U(7.2z.3h("22"));J c=D([]);D.P(3x,H(){J a=e?D(7).5y(M)[0]:7;G(D.Y(a,"1m"))c=c.1e(a);N{G(a.16==1)c=c.1e(D("1m",a).21());d.1k(b,a)}});c.P(6T)})}};D.17.5j.44=D.17;H 6T(i,a){G(a.4d)D.3Y({1a:a.4d,31:Q,1O:"1m"});N D.5u(a.1r||a.6O||a.4H||"");G(a.1d)a.1d.37(a)}H 1z(){I+2B 8J}D.1l=D.17.1l=H(){J b=19[0]||{},i=1,K=19.K,4x=Q,15;G(b.1q==8I){4x=b;b=19[1]||{};i=2}G(1j b!="49"&&1j b!="H")b={};G(K==i){b=7;--i}R(;i<K;i++)G((15=19[i])!=U)R(J c 1n 15){J a=b[c],2w=15[c];G(b===2w)6M;G(4x&&2w&&1j 2w=="49"&&!2w.16)b[c]=D.1l(4x,a||(2w.K!=U?[]:{}),2w);N G(2w!==12)b[c]=2w}I b};J E="4M"+1z(),6K=0,5r={},6G=/z-?5i|8B-?8A|1y|6B|8v-?1Z/i,3P=S.3P||{};D.1l({8u:H(a){1b.$=3m$;G(a)1b.4M=w;I D},1D:H(a){I!!a&&1j a!="23"&&!a.Y&&a.1q!=2p&&/^[\\s[]?H/.11(a+"")},4n:H(a){I a.1C&&!a.1c||a.2j&&a.2z&&!a.2z.1c},5u:H(a){a=D.3k(a);G(a){J b=S.3H("6w")[0]||S.1C,1m=S.3h("1m");1m.O="1r/4t";G(D.14.1f)1m.1r=a;N 1m.3U(S.5F(a));b.39(1m,b.1x);b.37(1m)}},Y:H(b,a){I b.Y&&b.Y.2r()==a.2r()},1Y:{},L:H(c,d,b){c=c==1b?5r:c;J a=c[E];G(!a)a=c[E]=++6K;G(d&&!D.1Y[a])D.1Y[a]={};G(b!==12)D.1Y[a][d]=b;I d?D.1Y[a][d]:a},3b:H(c,b){c=c==1b?5r:c;J a=c[E];G(b){G(D.1Y[a]){2U D.1Y[a][b];b="";R(b 1n D.1Y[a])1X;G(!b)D.3b(c)}}N{1U{2U c[E]}1V(e){G(c.5l)c.5l(E)}2U D.1Y[a]}},P:H(d,a,c){J e,i=0,K=d.K;G(c){G(K==12){R(e 1n d)G(a.1w(d[e],c)===Q)1X}N R(;i<K;)G(a.1w(d[i++],c)===Q)1X}N{G(K==12){R(e 1n d)G(a.1k(d[e],e,d[e])===Q)1X}N R(J b=d[0];i<K&&a.1k(b,i,b)!==Q;b=d[++i]){}}I d},1i:H(b,a,c,i,d){G(D.1D(a))a=a.1k(b,i);I a&&a.1q==4L&&c=="2a"&&!6G.11(d)?a+"2X":a},1F:{1e:H(c,b){D.P((b||"").1R(/\\s+/),H(i,a){G(c.16==1&&!D.1F.3T(c.1F,a))c.1F+=(c.1F?" ":"")+a})},21:H(c,b){G(c.16==1)c.1F=b!=12?D.3C(c.1F.1R(/\\s+/),H(a){I!D.1F.3T(b,a)}).6s(" "):""},3T:H(b,a){I D.2L(a,(b.1F||b).6r().1R(/\\s+/))>-1}},6q:H(b,c,a){J e={};R(J d 1n c){e[d]=b.V[d];b.V[d]=c[d]}a.1k(b);R(J d 1n c)b.V[d]=e[d]},1g:H(d,e,c){G(e=="2h"||e=="1Z"){J b,3X={30:"5x",5g:"1G",18:"3I"},35=e=="2h"?["5e","6k"]:["5G","6i"];H 5b(){b=e=="2h"?d.8f:d.8c;J a=0,2C=0;D.P(35,H(){a+=3d(D.2a(d,"57"+7,M))||0;2C+=3d(D.2a(d,"2C"+7+"4b",M))||0});b-=29.83(a+2C)}G(D(d).3F(":4j"))5b();N D.6q(d,3X,5b);I 29.2f(0,b)}I D.2a(d,e,c)},2a:H(f,l,k){J e,V=f.V;H 3E(b){G(!D.14.2k)I Q;J a=3P.54(b,U);I!a||a.52("3E")==""}G(l=="1y"&&D.14.1f){e=D.1K(V,"1y");I e==""?"1":e}G(D.14.2G&&l=="18"){J d=V.50;V.50="0 7Y 7W";V.50=d}G(l.1I(/4i/i))l=y;G(!k&&V&&V[l])e=V[l];N G(3P.54){G(l.1I(/4i/i))l="4i";l=l.1o(/([A-Z])/g,"-$1").3y();J c=3P.54(f,U);G(c&&!3E(f))e=c.52(l);N{J g=[],2E=[],a=f,i=0;R(;a&&3E(a);a=a.1d)2E.6h(a);R(;i<2E.K;i++)G(3E(2E[i])){g[i]=2E[i].V.18;2E[i].V.18="3I"}e=l=="18"&&g[2E.K-1]!=U?"2F":(c&&c.52(l))||"";R(i=0;i<g.K;i++)G(g[i]!=U)2E[i].V.18=g[i]}G(l=="1y"&&e=="")e="1"}N G(f.4g){J h=l.1o(/\\-(\\w)/g,H(a,b){I b.2r()});e=f.4g[l]||f.4g[h];G(!/^\\d+(2X)?$/i.11(e)&&/^\\d/.11(e)){J j=V.1A,66=f.65.1A;f.65.1A=f.4g.1A;V.1A=e||0;e=V.aM+"2X";V.1A=j;f.65.1A=66}}I e},4h:H(l,h){J k=[];h=h||S;G(1j h.3h==\'12\')h=h.2z||h[0]&&h[0].2z||S;D.P(l,H(i,d){G(!d)I;G(d.1q==4L)d+=\'\';G(1j d=="23"){d=d.1o(/(<(\\w+)[^>]*?)\\/>/g,H(b,a,c){I c.1I(/^(aK|4f|7E|aG|4T|7A|aB|3n|az|ay|av)$/i)?b:a+"></"+c+">"});J f=D.3k(d).3y(),1v=h.3h("1v");J e=!f.1h("<au")&&[1,"<2A 7w=\'7w\'>","</2A>"]||!f.1h("<ar")&&[1,"<7v>","</7v>"]||f.1I(/^<(aq|22|am|ak|ai)/)&&[1,"<1T>","</1T>"]||!f.1h("<4F")&&[2,"<1T><22>","</22></1T>"]||(!f.1h("<af")||!f.1h("<ad"))&&[3,"<1T><22><4F>","</4F></22></1T>"]||!f.1h("<7E")&&[2,"<1T><22></22><7q>","</7q></1T>"]||D.14.1f&&[1,"1v<1v>","</1v>"]||[0,"",""];1v.4H=e[1]+d+e[2];1B(e[0]--)1v=1v.5T;G(D.14.1f){J g=!f.1h("<1T")&&f.1h("<22")<0?1v.1x&&1v.1x.3t:e[1]=="<1T>"&&f.1h("<22")<0?1v.3t:[];R(J j=g.K-1;j>=0;--j)G(D.Y(g[j],"22")&&!g[j].3t.K)g[j].1d.37(g[j]);G(/^\\s/.11(d))1v.39(h.5F(d.1I(/^\\s*/)[0]),1v.1x)}d=D.2d(1v.3t)}G(d.K===0&&(!D.Y(d,"3V")&&!D.Y(d,"2A")))I;G(d[0]==12||D.Y(d,"3V")||d.15)k.1p(d);N k=D.2R(k,d)});I k},1K:H(d,f,c){G(!d||d.16==3||d.16==8)I 12;J e=!D.4n(d),40=c!==12,1f=D.14.1f;f=e&&D.3X[f]||f;G(d.2j){J g=/5Q|4d|V/.11(f);G(f=="2W"&&D.14.2k)d.1d.64;G(f 1n d&&e&&!g){G(40){G(f=="O"&&D.Y(d,"4T")&&d.1d)7p"O a3 a1\'t 9V 9U";d[f]=c}G(D.Y(d,"3V")&&d.7i(f))I d.7i(f).76;I d[f]}G(1f&&e&&f=="V")I D.1K(d.V,"9T",c);G(40)d.9Q(f,""+c);J h=1f&&e&&g?d.4G(f,2):d.4G(f);I h===U?12:h}G(1f&&f=="1y"){G(40){d.6B=1;d.1E=(d.1E||"").1o(/7f\\([^)]*\\)/,"")+(3r(c)+\'\'=="9L"?"":"7f(1y="+c*7a+")")}I d.1E&&d.1E.1h("1y=")>=0?(3d(d.1E.1I(/1y=([^)]*)/)[1])/7a)+\'\':""}f=f.1o(/-([a-z])/9H,H(a,b){I b.2r()});G(40)d[f]=c;I d[f]},3k:H(a){I(a||"").1o(/^\\s+|\\s+$/g,"")},2d:H(b){J a=[];G(b!=U){J i=b.K;G(i==U||b.1R||b.4I||b.1k)a[0]=b;N 1B(i)a[--i]=b[i]}I a},2L:H(b,a){R(J i=0,K=a.K;i<K;i++)G(a[i]===b)I i;I-1},2R:H(a,b){J i=0,T,2S=a.K;G(D.14.1f){1B(T=b[i++])G(T.16!=8)a[2S++]=T}N 1B(T=b[i++])a[2S++]=T;I a},4r:H(a){J c=[],2o={};1U{R(J i=0,K=a.K;i<K;i++){J b=D.L(a[i]);G(!2o[b]){2o[b]=M;c.1p(a[i])}}}1V(e){c=a}I c},3C:H(c,a,d){J b=[];R(J i=0,K=c.K;i<K;i++)G(!d!=!a(c[i],i))b.1p(c[i]);I b},2l:H(d,a){J c=[];R(J i=0,K=d.K;i<K;i++){J b=a(d[i],i);G(b!=U)c[c.K]=b}I c.7d.1w([],c)}});J v=9B.9A.3y();D.14={5B:(v.1I(/.+(?:9y|9x|9w|9v)[\\/: ]([\\d.]+)/)||[])[1],2k:/75/.11(v),2G:/2G/.11(v),1f:/1f/.11(v)&&!/2G/.11(v),42:/42/.11(v)&&!/(9s|75)/.11(v)};J y=D.14.1f?"7o":"72";D.1l({71:!D.14.1f||S.70=="6Z",3X:{"R":"9n","9k":"1F","4i":y,72:y,7o:y,9h:"9f",9e:"9d",9b:"99"}});D.P({6W:H(a){I a.1d},97:H(a){I D.4S(a,"1d")},95:H(a){I D.3a(a,2,"2H")},91:H(a){I D.3a(a,2,"4l")},8Z:H(a){I D.4S(a,"2H")},8X:H(a){I D.4S(a,"4l")},8W:H(a){I D.5v(a.1d.1x,a)},8V:H(a){I D.5v(a.1x)},6Q:H(a){I D.Y(a,"8U")?a.8T||a.8S.S:D.2d(a.3t)}},H(c,d){D.17[c]=H(b){J a=D.2l(7,d);G(b&&1j b=="23")a=D.3g(b,a);I 7.2I(D.4r(a))}});D.P({6P:"3v",8Q:"6F",39:"6E",8P:"5q",8O:"7b"},H(c,b){D.17[c]=H(){J a=19;I 7.P(H(){R(J i=0,K=a.K;i<K;i++)D(a[i])[b](7)})}});D.P({8N:H(a){D.1K(7,a,"");G(7.16==1)7.5l(a)},8M:H(a){D.1F.1e(7,a)},8L:H(a){D.1F.21(7,a)},8K:H(a){D.1F[D.1F.3T(7,a)?"21":"1e"](7,a)},21:H(a){G(!a||D.1E(a,[7]).r.K){D("*",7).1e(7).P(H(){D.W.21(7);D.3b(7)});G(7.1d)7.1d.37(7)}},4E:H(){D(">*",7).21();1B(7.1x)7.37(7.1x)}},H(a,b){D.17[a]=H(){I 7.P(b,19)}});D.P(["6N","4b"],H(i,c){J b=c.3y();D.17[b]=H(a){I 7[0]==1b?D.14.2G&&S.1c["5t"+c]||D.14.2k&&1b["5s"+c]||S.70=="6Z"&&S.1C["5t"+c]||S.1c["5t"+c]:7[0]==S?29.2f(29.2f(S.1c["4y"+c],S.1C["4y"+c]),29.2f(S.1c["2i"+c],S.1C["2i"+c])):a==12?(7.K?D.1g(7[0],b):U):7.1g(b,a.1q==56?a:a+"2X")}});H 25(a,b){I a[0]&&3r(D.2a(a[0],b,M),10)||0}J C=D.14.2k&&3r(D.14.5B)<8H?"(?:[\\\\w*3m-]|\\\\\\\\.)":"(?:[\\\\w\\8F-\\8E*3m-]|\\\\\\\\.)",6L=2B 4v("^>\\\\s*("+C+"+)"),6J=2B 4v("^("+C+"+)(#)("+C+"+)"),6I=2B 4v("^([#.]?)("+C+"*)");D.1l({6H:{"":H(a,i,m){I m[2]=="*"||D.Y(a,m[2])},"#":H(a,i,m){I a.4G("2v")==m[2]},":":{8D:H(a,i,m){I i<m[3]-0},8C:H(a,i,m){I i>m[3]-0},3a:H(a,i,m){I m[3]-0==i},79:H(a,i,m){I m[3]-0==i},3o:H(a,i){I i==0},3S:H(a,i,m,r){I i==r.K-1},6D:H(a,i){I i%2==0},6C:H(a,i){I i%2},"3o-4u":H(a){I a.1d.3H("*")[0]==a},"3S-4u":H(a){I D.3a(a.1d.5T,1,"4l")==a},"8z-4u":H(a){I!D.3a(a.1d.5T,2,"4l")},6W:H(a){I a.1x},4E:H(a){I!a.1x},8y:H(a,i,m){I(a.6O||a.8x||D(a).1r()||"").1h(m[3])>=0},4j:H(a){I"1G"!=a.O&&D.1g(a,"18")!="2F"&&D.1g(a,"5g")!="1G"},1G:H(a){I"1G"==a.O||D.1g(a,"18")=="2F"||D.1g(a,"5g")=="1G"},8w:H(a){I!a.3R},3R:H(a){I a.3R},4J:H(a){I a.4J},2W:H(a){I a.2W||D.1K(a,"2W")},1r:H(a){I"1r"==a.O},5O:H(a){I"5O"==a.O},5L:H(a){I"5L"==a.O},5p:H(a){I"5p"==a.O},3Q:H(a){I"3Q"==a.O},5o:H(a){I"5o"==a.O},6A:H(a){I"6A"==a.O},6z:H(a){I"6z"==a.O},2s:H(a){I"2s"==a.O||D.Y(a,"2s")},4T:H(a){I/4T|2A|6y|2s/i.11(a.Y)},3T:H(a,i,m){I D.2q(m[3],a).K},8t:H(a){I/h\\d/i.11(a.Y)},8s:H(a){I D.3C(D.3O,H(b){I a==b.T}).K}}},6x:[/^(\\[) *@?([\\w-]+) *([!*$^~=]*) *(\'?"?)(.*?)\\4 *\\]/,/^(:)([\\w-]+)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/,2B 4v("^([:.#]*)("+C+"+)")],3g:H(a,c,b){J d,1t=[];1B(a&&a!=d){d=a;J f=D.1E(a,c,b);a=f.t.1o(/^\\s*,\\s*/,"");1t=b?c=f.r:D.2R(1t,f.r)}I 1t},2q:H(t,o){G(1j t!="23")I[t];G(o&&o.16!=1&&o.16!=9)I[];o=o||S;J d=[o],2o=[],3S,Y;1B(t&&3S!=t){J r=[];3S=t;t=D.3k(t);J l=Q,3j=6L,m=3j.2D(t);G(m){Y=m[1].2r();R(J i=0;d[i];i++)R(J c=d[i].1x;c;c=c.2H)G(c.16==1&&(Y=="*"||c.Y.2r()==Y))r.1p(c);d=r;t=t.1o(3j,"");G(t.1h(" ")==0)6M;l=M}N{3j=/^([>+~])\\s*(\\w*)/i;G((m=3j.2D(t))!=U){r=[];J k={};Y=m[2].2r();m=m[1];R(J j=0,3i=d.K;j<3i;j++){J n=m=="~"||m=="+"?d[j].2H:d[j].1x;R(;n;n=n.2H)G(n.16==1){J g=D.L(n);G(m=="~"&&k[g])1X;G(!Y||n.Y.2r()==Y){G(m=="~")k[g]=M;r.1p(n)}G(m=="+")1X}}d=r;t=D.3k(t.1o(3j,""));l=M}}G(t&&!l){G(!t.1h(",")){G(o==d[0])d.4s();2o=D.2R(2o,d);r=d=[o];t=" "+t.6v(1,t.K)}N{J h=6J;J m=h.2D(t);G(m){m=[0,m[2],m[3],m[1]]}N{h=6I;m=h.2D(t)}m[2]=m[2].1o(/\\\\/g,"");J f=d[d.K-1];G(m[1]=="#"&&f&&f.61&&!D.4n(f)){J p=f.61(m[2]);G((D.14.1f||D.14.2G)&&p&&1j p.2v=="23"&&p.2v!=m[2])p=D(\'[@2v="\'+m[2]+\'"]\',f)[0];d=r=p&&(!m[3]||D.Y(p,m[3]))?[p]:[]}N{R(J i=0;d[i];i++){J a=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];G(a=="*"&&d[i].Y.3y()=="49")a="3n";r=D.2R(r,d[i].3H(a))}G(m[1]==".")r=D.5m(r,m[2]);G(m[1]=="#"){J e=[];R(J i=0;r[i];i++)G(r[i].4G("2v")==m[2]){e=[r[i]];1X}r=e}d=r}t=t.1o(h,"")}}G(t){J b=D.1E(t,r);d=r=b.r;t=D.3k(b.t)}}G(t)d=[];G(d&&o==d[0])d.4s();2o=D.2R(2o,d);I 2o},5m:H(r,m,a){m=" "+m+" ";J c=[];R(J i=0;r[i];i++){J b=(" "+r[i].1F+" ").1h(m)>=0;G(!a&&b||a&&!b)c.1p(r[i])}I c},1E:H(t,r,h){J d;1B(t&&t!=d){d=t;J p=D.6x,m;R(J i=0;p[i];i++){m=p[i].2D(t);G(m){t=t.8r(m[0].K);m[2]=m[2].1o(/\\\\/g,"");1X}}G(!m)1X;G(m[1]==":"&&m[2]=="4Y")r=62.11(m[3])?D.1E(m[3],r,M).r:D(r).4Y(m[3]);N G(m[1]==".")r=D.5m(r,m[2],h);N G(m[1]=="["){J g=[],O=m[3];R(J i=0,3i=r.K;i<3i;i++){J a=r[i],z=a[D.3X[m[2]]||m[2]];G(z==U||/5Q|4d|2W/.11(m[2]))z=D.1K(a,m[2])||\'\';G((O==""&&!!z||O=="="&&z==m[5]||O=="!="&&z!=m[5]||O=="^="&&z&&!z.1h(m[5])||O=="$="&&z.6v(z.K-m[5].K)==m[5]||(O=="*="||O=="~=")&&z.1h(m[5])>=0)^h)g.1p(a)}r=g}N G(m[1]==":"&&m[2]=="3a-4u"){J e={},g=[],11=/(-?)(\\d*)n((?:\\+|-)?\\d*)/.2D(m[3]=="6D"&&"2n"||m[3]=="6C"&&"2n+1"||!/\\D/.11(m[3])&&"8q+"+m[3]||m[3]),3o=(11[1]+(11[2]||1))-0,d=11[3]-0;R(J i=0,3i=r.K;i<3i;i++){J j=r[i],1d=j.1d,2v=D.L(1d);G(!e[2v]){J c=1;R(J n=1d.1x;n;n=n.2H)G(n.16==1)n.4q=c++;e[2v]=M}J b=Q;G(3o==0){G(j.4q==d)b=M}N G((j.4q-d)%3o==0&&(j.4q-d)/3o>=0)b=M;G(b^h)g.1p(j)}r=g}N{J f=D.6H[m[1]];G(1j f=="49")f=f[m[2]];G(1j f=="23")f=6u("Q||H(a,i){I "+f+";}");r=D.3C(r,H(a,i){I f(a,i,m,r)},h)}}I{r:r,t:t}},4S:H(b,c){J a=[],1t=b[c];1B(1t&&1t!=S){G(1t.16==1)a.1p(1t);1t=1t[c]}I a},3a:H(a,e,c,b){e=e||1;J d=0;R(;a;a=a[c])G(a.16==1&&++d==e)1X;I a},5v:H(n,a){J r=[];R(;n;n=n.2H){G(n.16==1&&n!=a)r.1p(n)}I r}});D.W={1e:H(f,i,g,e){G(f.16==3||f.16==8)I;G(D.14.1f&&f.4I)f=1b;G(!g.24)g.24=7.24++;G(e!=12){J h=g;g=7.3M(h,H(){I h.1w(7,19)});g.L=e}J j=D.L(f,"3w")||D.L(f,"3w",{}),1H=D.L(f,"1H")||D.L(f,"1H",H(){G(1j D!="12"&&!D.W.5k)I D.W.1H.1w(19.3L.T,19)});1H.T=f;D.P(i.1R(/\\s+/),H(c,b){J a=b.1R(".");b=a[0];g.O=a[1];J d=j[b];G(!d){d=j[b]={};G(!D.W.2t[b]||D.W.2t[b].4p.1k(f)===Q){G(f.3K)f.3K(b,1H,Q);N G(f.6t)f.6t("4o"+b,1H)}}d[g.24]=g;D.W.26[b]=M});f=U},24:1,26:{},21:H(e,h,f){G(e.16==3||e.16==8)I;J i=D.L(e,"3w"),1L,5i;G(i){G(h==12||(1j h=="23"&&h.8p(0)=="."))R(J g 1n i)7.21(e,g+(h||""));N{G(h.O){f=h.2y;h=h.O}D.P(h.1R(/\\s+/),H(b,a){J c=a.1R(".");a=c[0];G(i[a]){G(f)2U i[a][f.24];N R(f 1n i[a])G(!c[1]||i[a][f].O==c[1])2U i[a][f];R(1L 1n i[a])1X;G(!1L){G(!D.W.2t[a]||D.W.2t[a].4A.1k(e)===Q){G(e.6p)e.6p(a,D.L(e,"1H"),Q);N G(e.6n)e.6n("4o"+a,D.L(e,"1H"))}1L=U;2U i[a]}}})}R(1L 1n i)1X;G(!1L){J d=D.L(e,"1H");G(d)d.T=U;D.3b(e,"3w");D.3b(e,"1H")}}},1P:H(h,c,f,g,i){c=D.2d(c);G(h.1h("!")>=0){h=h.3s(0,-1);J a=M}G(!f){G(7.26[h])D("*").1e([1b,S]).1P(h,c)}N{G(f.16==3||f.16==8)I 12;J b,1L,17=D.1D(f[h]||U),W=!c[0]||!c[0].32;G(W){c.6h({O:h,2J:f,32:H(){},3J:H(){},4C:1z()});c[0][E]=M}c[0].O=h;G(a)c[0].6m=M;J d=D.L(f,"1H");G(d)b=d.1w(f,c);G((!17||(D.Y(f,\'a\')&&h=="4V"))&&f["4o"+h]&&f["4o"+h].1w(f,c)===Q)b=Q;G(W)c.4s();G(i&&D.1D(i)){1L=i.1w(f,b==U?c:c.7d(b));G(1L!==12)b=1L}G(17&&g!==Q&&b!==Q&&!(D.Y(f,\'a\')&&h=="4V")){7.5k=M;1U{f[h]()}1V(e){}}7.5k=Q}I b},1H:H(b){J a,1L,38,5f,4m;b=19[0]=D.W.6l(b||1b.W);38=b.O.1R(".");b.O=38[0];38=38[1];5f=!38&&!b.6m;4m=(D.L(7,"3w")||{})[b.O];R(J j 1n 4m){J c=4m[j];G(5f||c.O==38){b.2y=c;b.L=c.L;1L=c.1w(7,19);G(a!==Q)a=1L;G(1L===Q){b.32();b.3J()}}}I a},6l:H(b){G(b[E]==M)I b;J d=b;b={8o:d};J c="8n 8m 8l 8k 2s 8j 47 5d 6j 5E 8i L 8h 8g 4K 2y 5a 59 8e 8b 58 6f 8a 88 4k 87 86 84 6d 2J 4C 6c O 82 81 35".1R(" ");R(J i=c.K;i;i--)b[c[i]]=d[c[i]];b[E]=M;b.32=H(){G(d.32)d.32();d.80=Q};b.3J=H(){G(d.3J)d.3J();d.7Z=M};b.4C=b.4C||1z();G(!b.2J)b.2J=b.6d||S;G(b.2J.16==3)b.2J=b.2J.1d;G(!b.4k&&b.4K)b.4k=b.4K==b.2J?b.6c:b.4K;G(b.58==U&&b.5d!=U){J a=S.1C,1c=S.1c;b.58=b.5d+(a&&a.2e||1c&&1c.2e||0)-(a.6b||0);b.6f=b.6j+(a&&a.2c||1c&&1c.2c||0)-(a.6a||0)}G(!b.35&&((b.47||b.47===0)?b.47:b.5a))b.35=b.47||b.5a;G(!b.59&&b.5E)b.59=b.5E;G(!b.35&&b.2s)b.35=(b.2s&1?1:(b.2s&2?3:(b.2s&4?2:0)));I b},3M:H(a,b){b.24=a.24=a.24||b.24||7.24++;I b},2t:{27:{4p:H(){55();I},4A:H(){I}},3D:{4p:H(){G(D.14.1f)I Q;D(7).2O("53",D.W.2t.3D.2y);I M},4A:H(){G(D.14.1f)I Q;D(7).4e("53",D.W.2t.3D.2y);I M},2y:H(a){G(F(a,7))I M;a.O="3D";I D.W.1H.1w(7,19)}},3N:{4p:H(){G(D.14.1f)I Q;D(7).2O("51",D.W.2t.3N.2y);I M},4A:H(){G(D.14.1f)I Q;D(7).4e("51",D.W.2t.3N.2y);I M},2y:H(a){G(F(a,7))I M;a.O="3N";I D.W.1H.1w(7,19)}}}};D.17.1l({2O:H(c,a,b){I c=="4X"?7.2V(c,a,b):7.P(H(){D.W.1e(7,c,b||a,b&&a)})},2V:H(d,b,c){J e=D.W.3M(c||b,H(a){D(7).4e(a,e);I(c||b).1w(7,19)});I 7.P(H(){D.W.1e(7,d,e,c&&b)})},4e:H(a,b){I 7.P(H(){D.W.21(7,a,b)})},1P:H(c,a,b){I 7.P(H(){D.W.1P(c,a,7,M,b)})},5C:H(c,a,b){I 7[0]&&D.W.1P(c,a,7[0],Q,b)},2m:H(b){J c=19,i=1;1B(i<c.K)D.W.3M(b,c[i++]);I 7.4V(D.W.3M(b,H(a){7.4Z=(7.4Z||0)%i;a.32();I c[7.4Z++].1w(7,19)||Q}))},7X:H(a,b){I 7.2O(\'3D\',a).2O(\'3N\',b)},27:H(a){55();G(D.2Q)a.1k(S,D);N D.3A.1p(H(){I a.1k(7,D)});I 7}});D.1l({2Q:Q,3A:[],27:H(){G(!D.2Q){D.2Q=M;G(D.3A){D.P(D.3A,H(){7.1k(S)});D.3A=U}D(S).5C("27")}}});J x=Q;H 55(){G(x)I;x=M;G(S.3K&&!D.14.2G)S.3K("69",D.27,Q);G(D.14.1f&&1b==1S)(H(){G(D.2Q)I;1U{S.1C.7V("1A")}1V(3e){3B(19.3L,0);I}D.27()})();G(D.14.2G)S.3K("69",H(){G(D.2Q)I;R(J i=0;i<S.4W.K;i++)G(S.4W[i].3R){3B(19.3L,0);I}D.27()},Q);G(D.14.2k){J a;(H(){G(D.2Q)I;G(S.3f!="68"&&S.3f!="1J"){3B(19.3L,0);I}G(a===12)a=D("V, 7A[7U=7S]").K;G(S.4W.K!=a){3B(19.3L,0);I}D.27()})()}D.W.1e(1b,"43",D.27)}D.P(("7R,7Q,43,85,4y,4X,4V,7P,"+"7O,7N,89,53,51,7M,2A,"+"5o,7L,7K,8d,3e").1R(","),H(i,b){D.17[b]=H(a){I a?7.2O(b,a):7.1P(b)}});J F=H(a,c){J b=a.4k;1B(b&&b!=c)1U{b=b.1d}1V(3e){b=c}I b==c};D(1b).2O("4X",H(){D("*").1e(S).4e()});D.17.1l({67:D.17.43,43:H(g,d,c){G(1j g!=\'23\')I 7.67(g);J e=g.1h(" ");G(e>=0){J i=g.3s(e,g.K);g=g.3s(0,e)}c=c||H(){};J f="2P";G(d)G(D.1D(d)){c=d;d=U}N{d=D.3n(d);f="6g"}J h=7;D.3Y({1a:g,O:f,1O:"2K",L:d,1J:H(a,b){G(b=="1W"||b=="7J")h.2K(i?D("<1v/>").3v(a.4U.1o(/<1m(.|\\s)*?\\/1m>/g,"")).2q(i):a.4U);h.P(c,[a.4U,b,a])}});I 7},aL:H(){I D.3n(7.7I())},7I:H(){I 7.2l(H(){I D.Y(7,"3V")?D.2d(7.aH):7}).1E(H(){I 7.34&&!7.3R&&(7.4J||/2A|6y/i.11(7.Y)||/1r|1G|3Q/i.11(7.O))}).2l(H(i,c){J b=D(7).6e();I b==U?U:b.1q==2p?D.2l(b,H(a,i){I{34:c.34,2x:a}}):{34:c.34,2x:b}}).3p()}});D.P("7H,7G,7F,7D,7C,7B".1R(","),H(i,o){D.17[o]=H(f){I 7.2O(o,f)}});J B=1z();D.1l({3p:H(d,b,a,c){G(D.1D(b)){a=b;b=U}I D.3Y({O:"2P",1a:d,L:b,1W:a,1O:c})},aE:H(b,a){I D.3p(b,U,a,"1m")},aD:H(c,b,a){I D.3p(c,b,a,"3z")},aC:H(d,b,a,c){G(D.1D(b)){a=b;b={}}I D.3Y({O:"6g",1a:d,L:b,1W:a,1O:c})},aA:H(a){D.1l(D.60,a)},60:{1a:5Z.5Q,26:M,O:"2P",2T:0,7z:"4R/x-ax-3V-aw",7x:M,31:M,L:U,5Y:U,3Q:U,4Q:{2N:"4R/2N, 1r/2N",2K:"1r/2K",1m:"1r/4t, 4R/4t",3z:"4R/3z, 1r/4t",1r:"1r/as",4w:"*/*"}},4z:{},3Y:H(s){s=D.1l(M,s,D.1l(M,{},D.60,s));J g,2Z=/=\\?(&|$)/g,1u,L,O=s.O.2r();G(s.L&&s.7x&&1j s.L!="23")s.L=D.3n(s.L);G(s.1O=="4P"){G(O=="2P"){G(!s.1a.1I(2Z))s.1a+=(s.1a.1I(/\\?/)?"&":"?")+(s.4P||"7u")+"=?"}N G(!s.L||!s.L.1I(2Z))s.L=(s.L?s.L+"&":"")+(s.4P||"7u")+"=?";s.1O="3z"}G(s.1O=="3z"&&(s.L&&s.L.1I(2Z)||s.1a.1I(2Z))){g="4P"+B++;G(s.L)s.L=(s.L+"").1o(2Z,"="+g+"$1");s.1a=s.1a.1o(2Z,"="+g+"$1");s.1O="1m";1b[g]=H(a){L=a;1W();1J();1b[g]=12;1U{2U 1b[g]}1V(e){}G(i)i.37(h)}}G(s.1O=="1m"&&s.1Y==U)s.1Y=Q;G(s.1Y===Q&&O=="2P"){J j=1z();J k=s.1a.1o(/(\\?|&)3m=.*?(&|$)/,"$ap="+j+"$2");s.1a=k+((k==s.1a)?(s.1a.1I(/\\?/)?"&":"?")+"3m="+j:"")}G(s.L&&O=="2P"){s.1a+=(s.1a.1I(/\\?/)?"&":"?")+s.L;s.L=U}G(s.26&&!D.4O++)D.W.1P("7H");J n=/^(?:\\w+:)?\\/\\/([^\\/?#]+)/;G(s.1O=="1m"&&O=="2P"&&n.11(s.1a)&&n.2D(s.1a)[1]!=5Z.al){J i=S.3H("6w")[0];J h=S.3h("1m");h.4d=s.1a;G(s.7t)h.aj=s.7t;G(!g){J l=Q;h.ah=h.ag=H(){G(!l&&(!7.3f||7.3f=="68"||7.3f=="1J")){l=M;1W();1J();i.37(h)}}}i.3U(h);I 12}J m=Q;J c=1b.7s?2B 7s("ae.ac"):2B 7r();G(s.5Y)c.6R(O,s.1a,s.31,s.5Y,s.3Q);N c.6R(O,s.1a,s.31);1U{G(s.L)c.4B("ab-aa",s.7z);G(s.5S)c.4B("a9-5R-a8",D.4z[s.1a]||"a7, a6 a5 a4 5N:5N:5N a2");c.4B("X-9Z-9Y","7r");c.4B("9W",s.1O&&s.4Q[s.1O]?s.4Q[s.1O]+", */*":s.4Q.4w)}1V(e){}G(s.7m&&s.7m(c,s)===Q){s.26&&D.4O--;c.7l();I Q}G(s.26)D.W.1P("7B",[c,s]);J d=H(a){G(!m&&c&&(c.3f==4||a=="2T")){m=M;G(f){7k(f);f=U}1u=a=="2T"&&"2T"||!D.7j(c)&&"3e"||s.5S&&D.7h(c,s.1a)&&"7J"||"1W";G(1u=="1W"){1U{L=D.6X(c,s.1O,s.9S)}1V(e){1u="5J"}}G(1u=="1W"){J b;1U{b=c.5I("7g-5R")}1V(e){}G(s.5S&&b)D.4z[s.1a]=b;G(!g)1W()}N D.5H(s,c,1u);1J();G(s.31)c=U}};G(s.31){J f=4I(d,13);G(s.2T>0)3B(H(){G(c){c.7l();G(!m)d("2T")}},s.2T)}1U{c.9P(s.L)}1V(e){D.5H(s,c,U,e)}G(!s.31)d();H 1W(){G(s.1W)s.1W(L,1u);G(s.26)D.W.1P("7C",[c,s])}H 1J(){G(s.1J)s.1J(c,1u);G(s.26)D.W.1P("7F",[c,s]);G(s.26&&!--D.4O)D.W.1P("7G")}I c},5H:H(s,a,b,e){G(s.3e)s.3e(a,b,e);G(s.26)D.W.1P("7D",[a,s,e])},4O:0,7j:H(a){1U{I!a.1u&&5Z.9O=="5p:"||(a.1u>=7e&&a.1u<9N)||a.1u==7c||a.1u==9K||D.14.2k&&a.1u==12}1V(e){}I Q},7h:H(a,c){1U{J b=a.5I("7g-5R");I a.1u==7c||b==D.4z[c]||D.14.2k&&a.1u==12}1V(e){}I Q},6X:H(a,c,b){J d=a.5I("9J-O"),2N=c=="2N"||!c&&d&&d.1h("2N")>=0,L=2N?a.9I:a.4U;G(2N&&L.1C.2j=="5J")7p"5J";G(b)L=b(L,c);G(c=="1m")D.5u(L);G(c=="3z")L=6u("("+L+")");I L},3n:H(a){J s=[];G(a.1q==2p||a.5w)D.P(a,H(){s.1p(3u(7.34)+"="+3u(7.2x))});N R(J j 1n a)G(a[j]&&a[j].1q==2p)D.P(a[j],H(){s.1p(3u(j)+"="+3u(7))});N s.1p(3u(j)+"="+3u(D.1D(a[j])?a[j]():a[j]));I s.6s("&").1o(/%20/g,"+")}});D.17.1l({1N:H(c,b){I c?7.2g({1Z:"1N",2h:"1N",1y:"1N"},c,b):7.1E(":1G").P(H(){7.V.18=7.5D||"";G(D.1g(7,"18")=="2F"){J a=D("<"+7.2j+" />").6P("1c");7.V.18=a.1g("18");G(7.V.18=="2F")7.V.18="3I";a.21()}}).3l()},1M:H(b,a){I b?7.2g({1Z:"1M",2h:"1M",1y:"1M"},b,a):7.1E(":4j").P(H(){7.5D=7.5D||D.1g(7,"18");7.V.18="2F"}).3l()},78:D.17.2m,2m:H(a,b){I D.1D(a)&&D.1D(b)?7.78.1w(7,19):a?7.2g({1Z:"2m",2h:"2m",1y:"2m"},a,b):7.P(H(){D(7)[D(7).3F(":1G")?"1N":"1M"]()})},9G:H(b,a){I 7.2g({1Z:"1N"},b,a)},9F:H(b,a){I 7.2g({1Z:"1M"},b,a)},9E:H(b,a){I 7.2g({1Z:"2m"},b,a)},9D:H(b,a){I 7.2g({1y:"1N"},b,a)},9M:H(b,a){I 7.2g({1y:"1M"},b,a)},9C:H(c,a,b){I 7.2g({1y:a},c,b)},2g:H(k,j,i,g){J h=D.77(j,i,g);I 7[h.36===Q?"P":"36"](H(){G(7.16!=1)I Q;J f=D.1l({},h),p,1G=D(7).3F(":1G"),46=7;R(p 1n k){G(k[p]=="1M"&&1G||k[p]=="1N"&&!1G)I f.1J.1k(7);G(p=="1Z"||p=="2h"){f.18=D.1g(7,"18");f.33=7.V.33}}G(f.33!=U)7.V.33="1G";f.45=D.1l({},k);D.P(k,H(c,a){J e=2B D.28(46,f,c);G(/2m|1N|1M/.11(a))e[a=="2m"?1G?"1N":"1M":a](k);N{J b=a.6r().1I(/^([+-]=)?([\\d+-.]+)(.*)$/),2b=e.1t(M)||0;G(b){J d=3d(b[2]),2M=b[3]||"2X";G(2M!="2X"){46.V[c]=(d||1)+2M;2b=((d||1)/e.1t(M))*2b;46.V[c]=2b+2M}G(b[1])d=((b[1]=="-="?-1:1)*d)+2b;e.3G(2b,d,2M)}N e.3G(2b,a,"")}});I M})},36:H(a,b){G(D.1D(a)||(a&&a.1q==2p)){b=a;a="28"}G(!a||(1j a=="23"&&!b))I A(7[0],a);I 7.P(H(){G(b.1q==2p)A(7,a,b);N{A(7,a).1p(b);G(A(7,a).K==1)b.1k(7)}})},9X:H(b,c){J a=D.3O;G(b)7.36([]);7.P(H(){R(J i=a.K-1;i>=0;i--)G(a[i].T==7){G(c)a[i](M);a.7n(i,1)}});G(!c)7.5A();I 7}});J A=H(b,c,a){G(b){c=c||"28";J q=D.L(b,c+"36");G(!q||a)q=D.L(b,c+"36",D.2d(a))}I q};D.17.5A=H(a){a=a||"28";I 7.P(H(){J q=A(7,a);q.4s();G(q.K)q[0].1k(7)})};D.1l({77:H(b,a,c){J d=b&&b.1q==a0?b:{1J:c||!c&&a||D.1D(b)&&b,2u:b,41:c&&a||a&&a.1q!=9t&&a};d.2u=(d.2u&&d.2u.1q==4L?d.2u:D.28.5K[d.2u])||D.28.5K.74;d.5M=d.1J;d.1J=H(){G(d.36!==Q)D(7).5A();G(D.1D(d.5M))d.5M.1k(7)};I d},41:{73:H(p,n,b,a){I b+a*p},5P:H(p,n,b,a){I((-29.9r(p*29.9q)/2)+0.5)*a+b}},3O:[],48:U,28:H(b,c,a){7.15=c;7.T=b;7.1i=a;G(!c.3Z)c.3Z={}}});D.28.44={4D:H(){G(7.15.2Y)7.15.2Y.1k(7.T,7.1z,7);(D.28.2Y[7.1i]||D.28.2Y.4w)(7);G(7.1i=="1Z"||7.1i=="2h")7.T.V.18="3I"},1t:H(a){G(7.T[7.1i]!=U&&7.T.V[7.1i]==U)I 7.T[7.1i];J r=3d(D.1g(7.T,7.1i,a));I r&&r>-9p?r:3d(D.2a(7.T,7.1i))||0},3G:H(c,b,d){7.5V=1z();7.2b=c;7.3l=b;7.2M=d||7.2M||"2X";7.1z=7.2b;7.2S=7.4N=0;7.4D();J e=7;H t(a){I e.2Y(a)}t.T=7.T;D.3O.1p(t);G(D.48==U){D.48=4I(H(){J a=D.3O;R(J i=0;i<a.K;i++)G(!a[i]())a.7n(i--,1);G(!a.K){7k(D.48);D.48=U}},13)}},1N:H(){7.15.3Z[7.1i]=D.1K(7.T.V,7.1i);7.15.1N=M;7.3G(0,7.1t());G(7.1i=="2h"||7.1i=="1Z")7.T.V[7.1i]="9m";D(7.T).1N()},1M:H(){7.15.3Z[7.1i]=D.1K(7.T.V,7.1i);7.15.1M=M;7.3G(7.1t(),0)},2Y:H(a){J t=1z();G(a||t>7.15.2u+7.5V){7.1z=7.3l;7.2S=7.4N=1;7.4D();7.15.45[7.1i]=M;J b=M;R(J i 1n 7.15.45)G(7.15.45[i]!==M)b=Q;G(b){G(7.15.18!=U){7.T.V.33=7.15.33;7.T.V.18=7.15.18;G(D.1g(7.T,"18")=="2F")7.T.V.18="3I"}G(7.15.1M)7.T.V.18="2F";G(7.15.1M||7.15.1N)R(J p 1n 7.15.45)D.1K(7.T.V,p,7.15.3Z[p])}G(b)7.15.1J.1k(7.T);I Q}N{J n=t-7.5V;7.4N=n/7.15.2u;7.2S=D.41[7.15.41||(D.41.5P?"5P":"73")](7.4N,n,0,1,7.15.2u);7.1z=7.2b+((7.3l-7.2b)*7.2S);7.4D()}I M}};D.1l(D.28,{5K:{9l:9j,9i:7e,74:9g},2Y:{2e:H(a){a.T.2e=a.1z},2c:H(a){a.T.2c=a.1z},1y:H(a){D.1K(a.T.V,"1y",a.1z)},4w:H(a){a.T.V[a.1i]=a.1z+a.2M}}});D.17.2i=H(){J b=0,1S=0,T=7[0],3q;G(T)ao(D.14){J d=T.1d,4a=T,1s=T.1s,1Q=T.2z,5U=2k&&3r(5B)<9c&&!/9a/i.11(v),1g=D.2a,3c=1g(T,"30")=="3c";G(T.7y){J c=T.7y();1e(c.1A+29.2f(1Q.1C.2e,1Q.1c.2e),c.1S+29.2f(1Q.1C.2c,1Q.1c.2c));1e(-1Q.1C.6b,-1Q.1C.6a)}N{1e(T.5X,T.5W);1B(1s){1e(1s.5X,1s.5W);G(42&&!/^t(98|d|h)$/i.11(1s.2j)||2k&&!5U)2C(1s);G(!3c&&1g(1s,"30")=="3c")3c=M;4a=/^1c$/i.11(1s.2j)?4a:1s;1s=1s.1s}1B(d&&d.2j&&!/^1c|2K$/i.11(d.2j)){G(!/^96|1T.*$/i.11(1g(d,"18")))1e(-d.2e,-d.2c);G(42&&1g(d,"33")!="4j")2C(d);d=d.1d}G((5U&&(3c||1g(4a,"30")=="5x"))||(42&&1g(4a,"30")!="5x"))1e(-1Q.1c.5X,-1Q.1c.5W);G(3c)1e(29.2f(1Q.1C.2e,1Q.1c.2e),29.2f(1Q.1C.2c,1Q.1c.2c))}3q={1S:1S,1A:b}}H 2C(a){1e(D.2a(a,"6V",M),D.2a(a,"6U",M))}H 1e(l,t){b+=3r(l,10)||0;1S+=3r(t,10)||0}I 3q};D.17.1l({30:H(){J a=0,1S=0,3q;G(7[0]){J b=7.1s(),2i=7.2i(),4c=/^1c|2K$/i.11(b[0].2j)?{1S:0,1A:0}:b.2i();2i.1S-=25(7,\'94\');2i.1A-=25(7,\'aF\');4c.1S+=25(b,\'6U\');4c.1A+=25(b,\'6V\');3q={1S:2i.1S-4c.1S,1A:2i.1A-4c.1A}}I 3q},1s:H(){J a=7[0].1s;1B(a&&(!/^1c|2K$/i.11(a.2j)&&D.1g(a,\'30\')==\'93\'))a=a.1s;I D(a)}});D.P([\'5e\',\'5G\'],H(i,b){J c=\'4y\'+b;D.17[c]=H(a){G(!7[0])I;I a!=12?7.P(H(){7==1b||7==S?1b.92(!i?a:D(1b).2e(),i?a:D(1b).2c()):7[c]=a}):7[0]==1b||7[0]==S?46[i?\'aI\':\'aJ\']||D.71&&S.1C[c]||S.1c[c]:7[0][c]}});D.P(["6N","4b"],H(i,b){J c=i?"5e":"5G",4f=i?"6k":"6i";D.17["5s"+b]=H(){I 7[b.3y()]()+25(7,"57"+c)+25(7,"57"+4f)};D.17["90"+b]=H(a){I 7["5s"+b]()+25(7,"2C"+c+"4b")+25(7,"2C"+4f+"4b")+(a?25(7,"6S"+c)+25(7,"6S"+4f):0)}})})();',62,669,'|||||||this|||||||||||||||||||||||||||||||||||if|function|return|var|length|data|true|else|type|each|false|for|document|elem|null|style|event||nodeName|||test|undefined||browser|options|nodeType|fn|display|arguments|url|window|body|parentNode|add|msie|css|indexOf|prop|typeof|call|extend|script|in|replace|push|constructor|text|offsetParent|cur|status|div|apply|firstChild|opacity|now|left|while|documentElement|isFunction|filter|className|hidden|handle|match|complete|attr|ret|hide|show|dataType|trigger|doc|split|top|table|try|catch|success|break|cache|height||remove|tbody|string|guid|num|global|ready|fx|Math|curCSS|start|scrollTop|makeArray|scrollLeft|max|animate|width|offset|tagName|safari|map|toggle||done|Array|find|toUpperCase|button|special|duration|id|copy|value|handler|ownerDocument|select|new|border|exec|stack|none|opera|nextSibling|pushStack|target|html|inArray|unit|xml|bind|GET|isReady|merge|pos|timeout|delete|one|selected|px|step|jsre|position|async|preventDefault|overflow|name|which|queue|removeChild|namespace|insertBefore|nth|removeData|fixed|parseFloat|error|readyState|multiFilter|createElement|rl|re|trim|end|_|param|first|get|results|parseInt|slice|childNodes|encodeURIComponent|append|events|elems|toLowerCase|json|readyList|setTimeout|grep|mouseenter|color|is|custom|getElementsByTagName|block|stopPropagation|addEventListener|callee|proxy|mouseleave|timers|defaultView|password|disabled|last|has|appendChild|form|domManip|props|ajax|orig|set|easing|mozilla|load|prototype|curAnim|self|charCode|timerId|object|offsetChild|Width|parentOffset|src|unbind|br|currentStyle|clean|float|visible|relatedTarget|previousSibling|handlers|isXMLDoc|on|setup|nodeIndex|unique|shift|javascript|child|RegExp|_default|deep|scroll|lastModified|teardown|setRequestHeader|timeStamp|update|empty|tr|getAttribute|innerHTML|setInterval|checked|fromElement|Number|jQuery|state|active|jsonp|accepts|application|dir|input|responseText|click|styleSheets|unload|not|lastToggle|outline|mouseout|getPropertyValue|mouseover|getComputedStyle|bindReady|String|padding|pageX|metaKey|keyCode|getWH|andSelf|clientX|Left|all|visibility|container|index|init|triggered|removeAttribute|classFilter|prevObject|submit|file|after|windowData|inner|client|globalEval|sibling|jquery|absolute|clone|wrapAll|dequeue|version|triggerHandler|oldblock|ctrlKey|createTextNode|Top|handleError|getResponseHeader|parsererror|speeds|checkbox|old|00|radio|swing|href|Modified|ifModified|lastChild|safari2|startTime|offsetTop|offsetLeft|username|location|ajaxSettings|getElementById|isSimple|values|selectedIndex|runtimeStyle|rsLeft|_load|loaded|DOMContentLoaded|clientTop|clientLeft|toElement|srcElement|val|pageY|POST|unshift|Bottom|clientY|Right|fix|exclusive|detachEvent|cloneNode|removeEventListener|swap|toString|join|attachEvent|eval|substr|head|parse|textarea|reset|image|zoom|odd|even|before|prepend|exclude|expr|quickClass|quickID|uuid|quickChild|continue|Height|textContent|appendTo|contents|open|margin|evalScript|borderTopWidth|borderLeftWidth|parent|httpData|setArray|CSS1Compat|compatMode|boxModel|cssFloat|linear|def|webkit|nodeValue|speed|_toggle|eq|100|replaceWith|304|concat|200|alpha|Last|httpNotModified|getAttributeNode|httpSuccess|clearInterval|abort|beforeSend|splice|styleFloat|throw|colgroup|XMLHttpRequest|ActiveXObject|scriptCharset|callback|fieldset|multiple|processData|getBoundingClientRect|contentType|link|ajaxSend|ajaxSuccess|ajaxError|col|ajaxComplete|ajaxStop|ajaxStart|serializeArray|notmodified|keypress|keydown|change|mouseup|mousedown|dblclick|focus|blur|stylesheet|hasClass|rel|doScroll|black|hover|solid|cancelBubble|returnValue|wheelDelta|view|round|shiftKey|resize|screenY|screenX|relatedNode|mousemove|prevValue|originalTarget|offsetHeight|keyup|newValue|offsetWidth|eventPhase|detail|currentTarget|cancelable|bubbles|attrName|attrChange|altKey|originalEvent|charAt|0n|substring|animated|header|noConflict|line|enabled|innerText|contains|only|weight|font|gt|lt|uFFFF|u0128|size|417|Boolean|Date|toggleClass|removeClass|addClass|removeAttr|replaceAll|insertAfter|prependTo|wrap|contentWindow|contentDocument|iframe|children|siblings|prevAll|wrapInner|nextAll|outer|prev|scrollTo|static|marginTop|next|inline|parents|able|cellSpacing|adobeair|cellspacing|522|maxLength|maxlength|readOnly|400|readonly|fast|600|class|slow|1px|htmlFor|reverse|10000|PI|cos|compatible|Function|setData|ie|ra|it|rv|getData|userAgent|navigator|fadeTo|fadeIn|slideToggle|slideUp|slideDown|ig|responseXML|content|1223|NaN|fadeOut|300|protocol|send|setAttribute|option|dataFilter|cssText|changed|be|Accept|stop|With|Requested|Object|can|GMT|property|1970|Jan|01|Thu|Since|If|Type|Content|XMLHTTP|th|Microsoft|td|onreadystatechange|onload|cap|charset|colg|host|tfoot|specified|with|1_|thead|leg|plain|attributes|opt|embed|urlencoded|www|area|hr|ajaxSetup|meta|post|getJSON|getScript|marginLeft|img|elements|pageYOffset|pageXOffset|abbr|serialize|pixelLeft'.split('|'),0,{}));

// ********** Main Script ***********
var smileData = [];


smileData.push([
	'01',
	'http://e.imagehost.org/',

		[
'0048/3TA.gif','0446/3W2.gif','0316/39q.gif','0493/5ec.gif','0796/5h7.gif','0195/5ns.gif',
'0097/5n3.gif','0005/5hw.gif','0399/5hx.gif','0802/5hs.gif', '0155/2I1.gif','0442/1ss.gif','0161/5dU.gif','0838/5eI.gif','0738/9AM.gif','0638/9AW.gif',
'0542/9B5.gif','0939/33H.gif','0342/gp.gif','0144/JE.gif','0815/Jp.gif',
'0023/39x.gif','0924/5gN.gif','0823/5mH.gif','0218/5gT.gif','0632/5nm.gif','0033/5hp.gif',
'0428/5mR.gif','0014/Hn.gif','0878/5gz.gif','0767/5mY.gif','0685/5g8.gif','0586/5hv.gif',
'0977/9AU.gif','0375/5ij.gif', '0950/bZ3.gif' ,'0960/ajv.gif','0983/84303rd.gif','0714/84305wt.gif',
'0624/79652rr.gif','0014/18927.gif','0422/18794.gif','0819/13389.gif','0615/13388.gif',
'0720/18620.gif','0065/bjk.gif','0257/74834wr.gif','0154/86.gif',
'0556/awz.gif','0800/bjy.gif','0626/cm.gif','0588/huh.gif'
	]


]);

smileData.push([
	'02',
	'http://e.imagehost.org/',
	[
		'0027/dnk.gif','0771/th_268.gif','0764/ch.gif','0429/pnt.gif',
'0895/a34.gif','0030/buu.gif',
'0390/3_17.gif',
'0291/4_11.gif','0681/4V0.gif','0545/fl.gif',
'0002/buh.gif','0930/sl.gif','0389/22_1.gif','0409/5hH.gif','0091/5px.gif','0390/9AP.gif',
'0798/ha.gif','0804/nham.gif','0499/hi.gif','0098/hel.gif','0712/cb.gif','0861/ih.gif','0761/bbb.gif',
'0562/nha.gif','0972/pato.gif','0865/5pq.gif','0271/5pr.gif',
'0167/5ia.gif','0346/5nh.gif','0806/5mP.gif','0333/bmq.gif','0706/9AX.gif','0504/sh.gif',
'0206/ok_7.gif','0308/hnf.gif',
'0010/zmb.gif','0865/o.gif','0412/t.gif',
'0814/gg.gif','0524/bb.gif','0632/bb.gif','0433/il.gif','0467/Jt.gif',
'0339/hi.gif','0165/guit.gif','0057/zzz.gif','0964/5ht.gif','0660/no.gif','0260/brb.gif',
'0266/pic.gif',
'0073/hm.gif','0745/5gd.gif'

	]
]);


smileData.push([
	'03',
	'http://a.imagehost.org/',
	[
		'0725/BJ.gif','0510/000.gif','0680/sh.gif','0448/5eJ.gif',
'0844/rad.gif','0749/af.gif',
'0150/dudu.gif',
'0056/esc.gif','0952/cof.gif','0856/th_pant.gif',
'0226/tel.gif','0979/antie3.gif','0063/ahn.gif','0062/ball.gif','0357/th.gif','0717/preso.gif',
'0664/koko.gif','0570/pint.gif',
'0459/pcof.gif','0262/cat.gif','0975/bts.gif','0651/ahh.gif','0163/nho.gif',
'0241/pz.gif','0628/no.gif','0040/nha.gif','0364/yes.gif',
'0738/who.gif',
'0565/hah.gif','0422/ppc.gif','0325/scd.gif','0114/hot.gif','0429/shower.gif',
'0726/drool.gif','0530/hi.gif',
'0325/fiu.gif','0140/hebad.gif',
'0284/hrt.gif',
'0293/pap.gif','0622/turt.gif','0325/cpt.gif','0021/tv.gif','0209/emo.gif',
'0928/esc.gif','0236/bee.gif','0130/mario.gif','0535/dudu.gif','0264/ask.gif','0167/vaka.gif',
'0565/hap1.gif',
'0968/grr.gif','0870/fome.gif'

	]
]);

smileData.push([
	'04',
	'http://a.imagehost.org/',
	[
		'0957/uu.gif','0985/022.gif','0391/0498emo-messbrasil.gif',
'0790/3191emo-messbrasil.gif',
'0686/alegre_imess_1.gif','0089/hud.png',
'0990/3027emo-messbrasil.png',
'0611/3085emo-messbrasil.gif','0012/693emo-messbrasil.gif',
'0291/ban.gif',
'0040/okk.gif','0620/brushteeth.gif','0022/em42.gif','0927/em40.gif',
'0371/em56.gif','0269/em46.gif',
'0676/3839emo-messbrasil.gif','0076/3855emo-messbrasil.gif',
'0973/3854emo-messbrasil.gif','0674/em53.gif','0083/unsbye.gif',
'0072/th_098.gif','0618/wootbye.gif',
'0925/th_umbrella.gif','0830/smile.png','0239/heartsplash2_sm.gif','0853/heart.gif',
'0370/bebye.gif',
'0775/hohbye.gif',


'0333/5pf.gif','0052/1vu.gif',
 '0941/JF.gif','0657/MZ.gif','0052/Jm.gif',
'0844/Jv.gif','0044/14p.gif','0352/Jt.gif',
'0460/Jq.gif','0671/Jn.gif',
'0579/oo.gif',
'0332/dent.gif','0135/hi.gif',
'0853/5nG.gif','0759/5hu.gif', '0255/5mU.gif','0650/5ph.gif','0862/5po.gif',
'0256/iT.gif','0427/6fr.gif','0602/5pp.gif',
'0658/yeah.gif','0068/no1.gif'

	]
]);


smileData.push([
	'05',
	'http://a.imagehost.org/',
	[
		'0722/5ed.gif','0926/4yu.gif','0334/5hC.gif','0229/cry.gif',
'0630/5ib.gif','0038/pisc.gif',
'0435/AK.gif',
'0235/5hy.gif','0846/5mL.gif','0563/49I.gif',
'0450/j9.gif','0352/5nF.gif','0761/iT.gif','0162/oh.gif','0067/5pv.gif','0469/5hL.gif',
'0655/bua.gif','0562/bah.gif',
'0855/cry.gif','0740/mimi.gif','0873/fura.gif','0272/anjo.gif','0171/ic.gif',
'0883/kir.gif','0793/chuv.gif','0499/bye.gif','0901/057.gif',
'0564/ih.gif',

'0804/tomara.gif','0334/5gH.gif','0607/hohoh.gif','0429/1a.gif','0457/1b.gif',
'0861/1c.gif','0754/1d.gif',
'0665/1f.gif','0977/1e.gif',
'0372/1g.gif',
'0768/1h.gif','0125/1j.gif','0748/1l.gif','0050/1m.gif','0951/1n.gif',
'0850/1o.gif','0749/1p.gif','0149/1q.gif','0049/1r.gif','0424/1s.gif','0366/1t.gif',
'0811/4E.gif',
'0932/5mS.png','0338/15w.gif'

	]
]);

smileData.push([
	'06',
	'http://',
	[
	'e.imagehost.org/0475/2_3.gif','e.imagehost.org/0382/64A.gif',
'e.imagehost.org/0285/bh.gif','e.imagehost.org/0691/bE3.gif','e.imagehost.org/0089/u7.gif',
		'e.imagehost.org/0293/u4.gif',
'e.imagehost.org/0513/bann_7.gif','e.imagehost.org/0373/u5.gif',
'plurk.cainanunes.com/creu1.gif',
		'plurk.cainanunes.com/creu2.gif',
'plurk.cainanunes.com/creu3.gif','plurk.cainanunes.com/creu4.gif',
'plurk.cainanunes.com/creu5.gif','plurk.cainanunes.com/Oo.gif',
'plurk.cainanunes.com/hohoho.gif',
	'plurk.cainanunes.com/nonono.gif ',
'plurk.cainanunes.com/apathetic.gif',
'plurk.cainanunes.com/coffee.gif','plurk.cainanunes.com/chimarrao.gif',
'plurk.cainanunes.com/beer.gif','plurk.cainanunes.com/draught_dark_beer.gif',
		'plurk.cainanunes.com/draught_beer.gif',
'plurk.cainanunes.com/white_wine.gif','plurk.cainanunes.com/blue_label.gif',
'plurk.cainanunes.com/green_label.gif','plurk.cainanunes.com/heart.gif',
'e.imagehost.org/0399/uhu.gif',
'e.imagehost.org/0212/pf.gif','e.imagehost.org/0606/bah1.gif',
'e.imagehost.org/0005/bua2.gif','e.imagehost.org/0119/u6.gif','e.imagehost.org/0191/bah.gif',
'e.imagehost.org/0091/pf.gif', 'e.imagehost.org/0483/xd_10.gif',
'e.imagehost.org/0902/hih.gif','e.imagehost.org/0598/lw.gif',
'e.imagehost.org/0234/lov.gif','e.imagehost.org/0532/huh1.gif','e.imagehost.org/0504/1rb.gif',
'a.imagehost.org/0902/174.gif','a.imagehost.org/0426/175.gif','a.imagehost.org/0820/17.gif',
'a.imagehost.org/0140/14_10.gif','a.imagehost.org/0234/11.gif','a.imagehost.org/0624/12.gif',
'a.imagehost.org/0936/13.gif','a.imagehost.org/0332/15.gif','a.imagehost.org/0727/16.gif',
'a.imagehost.org/0120/1_2.gif','a.imagehost.org/0059/179.gif',
'a.imagehost.org/0092/2_15.gif','a.imagehost.org/0496/3.gif'
	]
]);


smileData.push([
	'09',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'idea3.gif','search(2).gif','girl_cray.gif','spiteful.gif','mux3q0.gif','jester.gif',
 'kez_06.gif','party0020.gif','girl_cray3(2).gif','cheerful_h4h.gif',
 'angel.gif', 'licklips.gif','abejat2fs.gif',
		'mf_wave.gif','rasta.gif','unknw.gif','man_in_love.gif','banned2.gif',
		'clapping.gif','drink.gif','JC_golly.gif','rain.gif','slap2.gif','rofl.gif',
		'arrowhead.png','thumbsup_still.png','stun.gif','teens.gif',
'shy.gif','rm_shifty.gif',
		'surrender.gif','blind.gif','av-4.gif','oneeyed01.png','SHABLON_padonak_02.gif','bow_arrow.gif',
	            'sweatingbullets.gif','girl_crazy(2).gif','greedy.gif','spruce_up.gif','lock2.gif', 'bye2.gif','Mauridia_03.gif',
'no3.gif','babyandbear.gif','dontgetit.gif','on_the_quiet(2).gif','swhisper.gif',
'Laie_76Bmini.gif','help.gif','weird.gif','boxed2.gif'

	]
]);


smileData.push([
	'10',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'sarcastic_hand(2).gif','jamie.gif','mda(2).gif','to_keep_order.gif',
 'Laie_69.gif','i-m_so_happy(2).gif','girl_sigh(2).gif','tease(2).gif','hideingbhindcurtian.gif',
 'Laie_60Am.gif', 'crazy.gif','mf_witch.gif',
		'funce.gif','bad(2).gif','yes(2).gif','connie_08.gif','goku-s.gif','connie_32.gif',
		'cake.gif','shocking.gif','kiss(2).gif','loveletter.gif','wacko(4).gif','icon_cool.gif',
		'Vishenka_07.gif','bb(2).gif','read.gif','cryss.gif','v.gif','rofl2.gif',
		'sorry(2).gif','rubikt4ip.gif','icon_biggrin.gif','blum.gif','Just_Cuz_14.gif','lmfao.gif',
	            'lex_14.gif','lazy(2).gif','weirdo.gif','pleasantry(2).gif','helpsmilie.gif', 
'boxing.gif','resent.gif',
'shakehead.gif','yess(2).gif','heat(2).gif','mf_megaphone.gif','flautatvl7.gif','mama2287151iz.gif','Hyron_03.gif','beee.gif','uran_h4h.gif'

	]
]);

smileData.push([
	'11',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'Vishenka_26.gif','mf_apple.gif','cartman_h4h_sp.gif','smile1.gif',
 'shiftyeyes_anim.gif','sad(4).gif','snitch.png','superman2.gif','sharky.gif',
 'nono.gif', 'mf_type.gif','kilroy.gif',
		'sarcastic(2).gif','sad2.gif','mf_chieftain.gif','bomb2.gif','wink(3).gif','ireful2.gif',
		'mf_fez.gif','smartass.gif','afro2.gif','thmbup.gif','Vishenka_17.gif','winner_second_h4h.gif','alucard.gif','Vishenka_12.gif','Just_Cuz_08.gif','hmmph.gif','kez_09.gif','king.gif',
		'cry.gif','giggle.gif','icon_rolleyes.gif','pilot(2).gif','boat.gif','viannen_01.gif',
	            'to_take_umbrage.gif','girl_dance(2).gif','oneeyed02.png',
'Koshechka_08.gif','dance.gif', 'director.gif','snitch.gif',
'rtvs9.gif','timer.gif','give_heart.gif','stitchface.png','laugh2.gif','whistle3.gif','swoon2.gif',
'fruits_cherry.gif','drillsgt.gif'

	]
]);

smileData.push([
	'12',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'blush.gif','kez_11.gif','genial.gif','no7kw5.png.gif','kiss2.gif','tomato2.gif',
		'showoff.gif','english_en.gif','hooray.gif','mail2.gif','cool.png','yahoo.gif',
		'connie_rockingbaby.gif','blush02.gif','tender(2).gif','george.gif',
'obi-wan.gif','kez_01.gif',
		'snoozer_05.gif','secret.gif','63714.gif','yeah.gif','eat.gif','vishenka_20.gif',
		'kez_12.gif','bruce_h4h.gif',
'medicine.gif','ok.gif','yaisse.gif','mf_laughbounce.gif',
		'thank_you.gif','secret2.gif','beach(2).gif','icon9.gif','pacifierfight.gif',
'Vishenka_11.gif',
		'phone1.gif','music2(2).gif','sleeping_01.gif','pioneer_smoke.gif',
'duh.gif','console.gif',
		'Just_Cuz_29.gif','tooth.gif','peach.gif','catchfly.gif','whistle2.gif','gamer1.gif', 
		'girlchat.gif','beta.gif','tired.gif','Just_Cuz_32.gif'
	]
]);


smileData.push([
	'13',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'butterfly.gif','paratrooper.gif','icon3.gif','this(2).gif','dntknw.gif','spam.gif',
		'biker_h4h.gif','mf_charliechaplin.gif','Just_Cuz_30.gif','mf_leia.gif','popcorm1.gif','evo.gif',
		'lex_02.gif','sly.gif','kissing2.gif','trumpet.gif','sleeping_02.gif','cupcake.gif',
		'hang1.gif','girl_in_love(2).gif','umnik.gif','crying.gif','fear2.gif','capsmilie.gif',
		'spidey.gif','king2.gif','Just_Cuz_15.gif','tongue_tied_h4h.gif',
'kez_13.gif','crazyperson.gif',
		'close_tema.gif','livre.gif','sad3.gif',
'girl_impossible(2).gif','russian_roulette.gif','Just_Cuz_13.gif',
		'kez_02.gif','woodyfly1.gif','wink2.gif',
'princess_h4h.gif','bruce_h4h.gif','tommy.gif',
		'yu(2).gif','who-let-rip.png','lex_13.gif',
'Vishenka_09.gif','pogranichnik.gif','new_russian.gif',
		'mf_kamikaze.gif','wizard.gif','kez_16.gif',
'unknw(2).gif'
	]
]);


smileData.push([
	'14',
	'http://www.ze-games.net/forum/images/smilies/',
	[
                        'lac.gif','rohan.gif','girl_hide(2).gif','Laie_73.gif',
		'whaa.png','Sneaktongue.gif','ph34r.gif','basketball.gif','kez_10.gif','yikes.gif',
		'hmmph02.png','sneaky.gif','dopey_h4h.gif','thumbs_up.gif',
'superstition(2).gif','nea.gif',
		'alcoholic.gif','angel.png','Just_Cuz_26.gif',
'wacko2(2).gif','Vishenka_08.gif','hair.gif',
		'mf_bluesbrother.gif',
'ike_sp_h4h.gif','telephone.gif','walkman.gif','ph34r_anim.gif','Hyron_02.gif',
		'trampoline.gif','anakin.gif','JC_frankie.gif',
'girl_wacko(2).gif','kyle_h4h_sp.gif','garrison_h4h_sp.gif',
		'insane.gif','detective2.gif','pioneer.gif','fishing_h4h.gif','hockey1.gif',
'Laie_20.gif',
		'lilo_h4h.gif','pokerface.gif','big_boss.gif','kwasny.gif','mf_aussie.gif','confused02.png',
		'party.gif','mf_monkey.gif','Just_Cuz_35.gif','dance4(2).gif',
'mf_viking.gif','good(4).gif'
	]
]);


smileData.push([
    '15',
	'http://www.ze-games.net/forum/images/smilies/',
    [
        'rap.gif','oneeyed02.png','fool.gif','ireful1.gif','icon5.gif','upsidedown.gif',
'connie_girl_cleanglasses.gif','mr47_02.gif','grrr.gif',
        'axehead.png','chef.gif','medieval.gif','han-solo.gif','pray.gif','hat.gif','not_i.gif',
        'boredom(2).gif','yes3.gif','dontgetit.gif','drag.gif','sun_bespectacled.gif',
'stan_h4h_sp.gif','mf_medusa.gif','mwah1.gif',
        'baby.gif','patsak.gif','Just_Cuz_21.gif','evilguy.gif','kez_17.gif','superman.gif','cook.gif',
        'girl_prepare_fish(2).gif','girl_drink1.gif','blind.gif',
'Mauridia_02.gif','download.gif','to_become_senile.gif','cheff.gif',
        'ok(2).gif','angry2.gif',
'fever.gif','idea2.gif','smackhead.gif','neo.gif','tap3.gif',
'Just_Cuz_19.gif','wallace.gif','mamba.gif','connie_2.gif','Laie_16.gif',
'lex_04.gif','turned.gif'

    ]
]);


smileData.push([
    '16',
    'http://www.mysmiley.net/imgs/smile/',
    [
        'confused/confused0004.gif','indifferent/indifferent0019.gif','animals/animal0002.gif',
'happy/happy0023.gif','innocent/innocent0001.gif','winking/winking0067.gif',
'animated/anim_64.gif',
'love/love0025.gif','love/love0046.gif',
        'love/love0044.gif','love/love0078.gif','rolleye/rolleye0006.gif',
'rolleye/rolleye0015.gif','rolleye/rolleye0017.gif','rolleye/rolleye.gif','cool/cool0007.gif',
        'cool/cool0043.gif','sad/sad0020.gif','sad/sad0016.gif','sad/sad0043.gif','sad/sad0047.gif',
'sad/sad0056.gif','sad/sad0100.gif','sad/sad0078.gif',
        'sad/sad0148.gif','sad/sad0122.gif','sign/sign0067.gif','sign/sign0059.gif',
'sign/sign0107.gif','sign/sign0117.gif','sign/sign0118.gif',
        'sign/sign0127.gif','sign/sign0120.gif','sign/sign0180.gif','sign/sign0189.gif',
'indifferent/indifferent0018.gif','sign/sign0201.gif','sign/sign0196.gif',
        'happy/happy0040.gif','happy/happy0038.gif','happy/happy0058.gif',
'happy/happy0029.gif','happy/happy0089.gif','happy/happy0206.gif','happy/happy0187.gif',
'happy/happy0168.gif','animals/animal0060.gif','animals/animal0036.gif',
'winking/winking0016.gif','winking/winking0063.gif','winking/winking0070.gif','sick/sick0002.gif'

    ]
]);

smileData.push([
    '17',
    'http://www.mysmiley.net/imgs/smile/',
    [
        'love/love0004.gif','angel/angel04.gif','love/love0033.gif','mad/mad0050.gif','indifferent/indifferent0008.gif',
'mad/mad0215.gif','angel/jesus.gif',
'mad/mad0217.gif','angel/cupid.gif',
'angel/bow2.gif','mad/mad0235.gif','angel/angeldevil.gif','mad/mad0270.gif','angel/angel02.gif',
'angel/beeangel.gif','angel/whiteangel.gif',
'characters/character0029.gif','characters/character0017.gif','happy/happy0099.gif',
'animated/anim_37.gif','characters/character0147.gif',
'characters/character0144.gif', 'happy/happy0124.gif','happy/happy0159.gif',
'happy/happy0098.gif','characters/character0201.gif','characters/character0203.gif',
'characters/character0178.gif','characters/character0164.gif','characters/character0163.gif',
'happy/happy0120.gif', 'happy/happy0133.gif','characters/character0205.gif','characters/character0242.gif',
'happy/happy0207.gif','happy/happy0175.gif','happy/happy0171.gif','happy/happy0173.gif',
'happy/happy0191.gif','happy/happy0190.gif','animals/animal0009.gif','animals/animal0048.gif',
'animals/animal0070.gif','happy/happy0206.gif','animals/animal0045.gif',
'happy/happy0178.gif','animated/anim_40.gif','animated/anim_44.gif',
'animated/anim_35.gif','animated/anim_48.gif','party/party0009.gif','tongue/tongue0007.gif'

    ]
]);

smileData.push([
    '18',
    ' http://',
    [
        'mysmiley.net/imgs/smile/sign/sign0031.gif','mysmiley.net/imgs/smile/sign/sign0036.gif',
'mysmiley.net/imgs/smile/sign/sign0046.gif','mysmiley.net/imgs/smile/sign/sign0032.gif',
'mysmiley.net/imgs/smile/sign/sign0037.gif',
'mysmiley.net/imgs/smile/sign/sign0042.gif','mysmiley.net/imgs/smile/sign/sign0047.gif',
'mysmiley.net/imgs/smile/sign/sign0033.gif','mysmiley.net/imgs/smile/sign/sign0038.gif',
'mysmiley.net/imgs/smile/sign/sign0043.gif','mysmiley.net/imgs/smile/sign/sign0048.gif',
'mysmiley.net/imgs/smile/sign/sign0039.gif','mysmiley.net/imgs/smile/sign/sign0028.gif',
'mysmiley.net/imgs/smile/sign/sign0029.gif',
'mysmiley.net/imgs/smile/sign/sign0030.gif','mysmiley.net/imgs/smile/sign/sign0049.gif',
'mysmiley.net/imgs/smile/sign/sign0044.gif','mysmiley.net/imgs/smile/sign/sign0035.gif',
'mysmiley.net/imgs/smile/sign/sign0050.gif','mysmiley.net/imgs/smile/sign/sign0045.gif',
'mysmiley.net/imgs/smile/sign/sign0040.gif',
'mysmiley.net/imgs/smile/sign/sign0035.gif','mysmiley.net/imgs/smile/sign/sign.gif',
'mysmiley.net/imgs/smile/sign/sign0051.gif','a.imagehost.org/0829/BRB.gif',
'a.imagehost.org/0130/WTF.gif', 'mysmiley.net/imgs/smile/sign/sign0075.gif',
'mysmiley.net/imgs/smile/sign/sign0053.gif','mysmiley.net/imgs/smile/sign/sign0061.gif',
'mysmiley.net/imgs/smile/sign/sign0069.gif','mysmiley.net/imgs/smile/sign/sign0052.gif',
'mysmiley.net/imgs/smile/sign/sign0068.gif',
'mysmiley.net/imgs/smile/scared/scared0014.gif',
'mysmiley.net/imgs/smile/indifferent/indifferent0023.gif',
'mysmiley.net/imgs/smile/animated/anim_13.gif','mysmiley.net/imgs/smile/sign/sign0133.gif',
'mysmiley.net/imgs/smile/sign/sign0185.gif','mysmiley.net/imgs/smile/scared/scared0013.gif',
'mysmiley.net/imgs/smile/sign/sign0203.gif','mysmiley.net/imgs/smile/love/love0049.gif',
'mysmiley.net/imgs/smile/love/love0043.gif','mysmiley.net/imgs/smile/love/love0083.gif',
'mysmiley.net/imgs/smile/sad/sad0049.gif',
'mysmiley.net/imgs/smile/sad/sad0025.gif',
'mysmiley.net/imgs/smile/confused/confused0093.gif',
'mysmiley.net/imgs/smile/angel/angel05.gif',
'mysmiley.net/imgs/smile/confused/confused0085.gif',
'mysmiley.net/imgs/smile/confused/confused0081.gif',
'mysmiley.net/imgs/smile/sick/sick0012.gif',
'mysmiley.net/imgs/smile/sick/sick0001.gif','mysmiley.net/imgs/smile/party/party0037.gif',
'mysmiley.net/imgs/smile/party/party0052.gif'

    ]
]);


smileData.push([
	'19',
	'http://a.imagehost.org/',
	[
		'0080/hug.gif','0378/gnaw.gif','0285/luvbite.gif','0685/abra.gif',
'0096/flower.gif','0478/inluv.gif',
'0388/kiss2.gif','0792/squee.gif',
'0376/avoiding-eyecontact.gif','0611/heart.gif','0011/hugmeplz.gif','0406/loser.gif',
'0306/talktowall.gif','0215/manhug.gif','0619/luv.gif','0517/winknudge.gif',
'0154/badday.gif','0557/finger.gif','0471/luvpat.gif','0371/sheepish.gif','0765/bla.gif',
'0663/b54.gif','0465/b25.gif','0266/b18.gif',
'0270/th_juggle.gif','0551/wink.gif','0925/hi.gif',
'0323/kaku.gif','0736/kiss.gif','0647/yes.gif',
'0268/crau.gif','0011/gl2.gif','0606/gah.gif','0005/vei.gif','0406/tf.gif','0817/niver.gif',
'0221/bu.gif','0614/gaio.gif',
'0019/panic.gif','0732/nsei.gif','0965/sh.gif','0272/secret.gif','0664/pan1.gif','0569/crazy.gif',
'0959/byby.gif','0772/peru.gif','0988/th_mwahaha.gif','0687/gr.gif',
'0448/soap.gif','0493/sos.gif',
'0295/viol.gif','0081/musc.gif'

	]
]);

smileData.push([
	'20',
	'http://',
	[
		'a.imagehost.org/0885/verg.gif','a.imagehost.org/0677/th_bow-1.gif',
'a.imagehost.org/0292/dead.gif','a.imagehost.org/0665/fiu.gif',
'a.imagehost.org/0061/gr.gif','a.imagehost.org/0956/mr.gif',
'a.imagehost.org/0870/ok.gif','a.imagehost.org/0276/pam.gif',
'a.imagehost.org/0167/ui.gif','a.imagehost.org/0072/sorry.gif',
'www.mysmiley.net/imgs/smile/confused/confused0024.gif',
'mysmiley.net/imgs/smile/love/love0028.gif','mysmiley.net/imgs/smile/love/love0047.gif',
'mysmiley.net/imgs/smile/love/love0043.gif','mysmiley.net/imgs/smile/love/love0054.gif',
'mysmiley.net/imgs/smile/love/love0087.gif',
'mysmiley.net/imgs/smile/love/love0065.gif',
'mysmiley.net/imgs/smile/indifferent/indifferent0028.gif',
'a.imagehost.org/0248/blush.gif',
'a.imagehost.org/0783/th_adoration.gif','a.imagehost.org/0557/th_compassion.gif',
'a.imagehost.org/0950/th_glomp.gif','a.imagehost.org/0351/th_hungry.gif',
'a.imagehost.org/0257/th_handshake.gif',
'a.imagehost.org/0152/th_hump.gif','a.imagehost.org/0555/th_flirty.gif',
'a.imagehost.org/0956/th_happy-1.gif',
'a.imagehost.org/0527/th_lmao-1.gif',
'a.imagehost.org/0648/th_teevee.gif',
'a.imagehost.org/0552/th_reading.gif',
'a.imagehost.org/0452/th_sentimental.gif','a.imagehost.org/0351/th_slyfart.gif',
'a.imagehost.org/0160/th_strong.gif','a.imagehost.org/0564/th_cuddle.gif',
'a.imagehost.org/0963/th_sadness.gif','a.imagehost.org/0403/th_laughing-1.gif',
'a.imagehost.org/0190/th_drooling.gif','a.imagehost.org/0591/th_nod-1.gif',
'a.imagehost.org/0988/th_mwahaha.gif',
'a.imagehost.org/0398/th_licking.gif',
'a.imagehost.org/0793/th_helpful.gif',
'a.imagehost.org/0187/th_jealous.gif','a.imagehost.org/0597/th_typerhappy.gif',
'a.imagehost.org/0987/th_whisper.gif','a.imagehost.org/0822/th_wave.gif',
'a.imagehost.org/0610/th_meditate.gif','a.imagehost.org/0716/th_yawnstretch.gif',
'a.imagehost.org/0514/th_zeal.gif',
'a.imagehost.org/0414/th_omfg.gif','a.imagehost.org/0710/th_shakefist.gif',
'a.imagehost.org/0621/th_paranoid.gif','a.imagehost.org/0404/th_ohmygod.gif'

	]
]);


smileData.push([
	'21',
	'http://',
	[
		'a.imagehost.org/0086/th_date.gif','a.imagehost.org/0873/please.gif',
'a.imagehost.org/0886/th_aroused.gif','a.imagehost.org/0841/th_lick.gif',
'a.imagehost.org/0279/th_squee_by_Synfull.gif',
'a.imagehost.org/0911/0625emo-messbrasil.gif',
'a.imagehost.org/0576/fail.gif','a.imagehost.org/0171/th_heartbreaker.gif',
'a.imagehost.org/0490/Asdf.png',
'a.imagehost.org/0894/sarcasticclap.gif','a.imagehost.org/0239/8D.gif',
'a.imagehost.org/0178/loveing.gif','a.imagehost.org/0618/hatelove.gif',
'a.imagehost.org/0520/Pat_Emote_by_eStunt.gif',
'a.imagehost.org/0416/nutkick.gif','a.imagehost.org/0718/thanks.gif',
'a.imagehost.org/0119/lovepoke.gif','a.imagehost.org/0511/giggle.gif',
'a.imagehost.org/0896/facepalm_2.gif',
'a.imagehost.org/0454/gif.gif','a.imagehost.org/0364/D.gif',
'a.imagehost.org/0259/Dry.png',
'a.imagehost.org/0657/fluffy.gif','a.imagehost.org/0575/dunlookatmelikethat.gif',
'a.imagehost.org/0968/lovedup.png',
'a.imagehost.org/0857/nosepoke.gif',
'a.imagehost.org/0515/C_by_Caeser1993.gif','a.imagehost.org/0564/th_strip.gif',
'a.imagehost.org/0884/fear.gif','a.imagehost.org/0852/aww.gif',
'a.imagehost.org/0844/avoiding-eyecontact.gif',
'a.imagehost.org/0243/animesweat.gif','a.imagehost.org/0140/hatsoff.gif',
'a.imagehost.org/0950/grumpy.gif','a.imagehost.org/0346/cheerleader.gif',
'a.imagehost.org/0750/kiss.gif','a.imagehost.org/0656/O_o.gif',
'a.imagehost.org/0148/th_boing.gif',
'a.imagehost.org/0216/th_comfort.gif',
'a.imagehost.org/0103/th_faint.gif','a.imagehost.org/0020/th_sneeze.gif',
'a.imagehost.org/0414/th_slap-1.gif','a.imagehost.org/0323/th_shh.gif',
'a.imagehost.org/0617/th_tunes-1.gif','a.imagehost.org/0717/th_threaten.gif',
'a.imagehost.org/0997/th_clone.gif','a.imagehost.org/0107/th_bye.gif',
'a.imagehost.org/0011/th_bonk.gif',
'a.imagehost.org/0908/th_crying.gif','a.imagehost.org/0808/th_dizzy.gif',
'a.imagehost.org/0712/th_dohtwo.gif','a.imagehost.org/0348/bucktooth2.gif'
]
]);

smileData.push([
	'22',
	'http://',
	[
                                            'f.imagehost.org/0694/01_1.gif','f.imagehost.org/0573/02.gif',
'f.imagehost.org/0714/03_6.gif','f.imagehost.org/0332/04_9.gif',
'f.imagehost.org/0584/015.gif','f.imagehost.org/0742/character11.gif',
'f.imagehost.org/0289/cool0019.gif','f.imagehost.org/0034/tn_36445_d9a5eb5a5e069d29997f822a9373bd08.gif',
'f.imagehost.org/0422/fighting0057.gif','f.imagehost.org/0807/04ho6.gif',
'f.imagehost.org/0148/1225.gif','f.imagehost.org/0158/Mini-Hello022.gif',
'f.imagehost.org/0643/anim_26.gif','f.imagehost.org/0366/bandaid-amarelo.gif',
'f.imagehost.org/0899/BunnyLoveBench.gif','f.imagehost.org/0097/camera2.gif',
'f.imagehost.org/0330/char19.gif','f.imagehost.org/0195/dataehora.gif',
'f.imagehost.org/0255/e1.gif','f.imagehost.org/0608/emo10.gif',
'f.imagehost.org/0465/MiniGifSapo04.gif','f.imagehost.org/0454/mouse.gif',
'f.imagehost.org/0248/onpu26.gif','f.imagehost.org/0134/pixel144-1.gif',
'f.imagehost.org/0233/senpuki02.gif','f.imagehost.org/0954/tv-pink.gif',
'g.imagehost.org/0613/bj.gif','g.imagehost.org/0884/1aaa.gif',
'g.imagehost.org/0840/1b.gif','g.imagehost.org/0117/briga.gif',
'g.imagehost.org/0392/bua.gif','g.imagehost.org/0849/by.gif',
'g.imagehost.org/0049/cons.gif','g.imagehost.org/0555/esc.gif',
'g.imagehost.org/0543/fluffy.gif','g.imagehost.org/0712/grrr.gif',
'g.imagehost.org/0540/palm.gif','g.imagehost.org/0436/ri.gif',
'g.imagehost.org/0824/rs.gif','g.imagehost.org/0787/smil.gif',
'g.imagehost.org/0753/th_030.gif','g.imagehost.org/0631/th_typerhappy.gif',
'g.imagehost.org/0747/th_Writing_emoticon_by_eburt.gif','g.imagehost.org/0785/uhu.gif',
'g.imagehost.org/0901/uhuu.gif','f.imagehost.org/0359/ahn3.gif','g.imagehost.org/0863/dan.gif',
'f.imagehost.org/0213/pil.gif','f.imagehost.org/0202/s22.gif','g.imagehost.org/0794/nhas2.gif',
'f.imagehost.org/0471/morri.gif','f.imagehost.org/0566/limp.gif','f.imagehost.org/0578/ler.gif',
'g.imagehost.org/0653/grrrr.gif','g.imagehost.org/0619/grr.gif','g.imagehost.org/0478/gn3.gif',

]
]);



smileData.push([
	'23',
	'http://',
	[                      'g.imagehost.org/0076/c1.gif','f.imagehost.org/0921/c2.gif','f.imagehost.org/0590/c3_10.gif',
'f.imagehost.org/0255/c4.gif','f.imagehost.org/0228/c5.gif','f.imagehost.org/0164/c6.gif',
'f.imagehost.org/0172/c7.gif','g.imagehost.org/0665/c8.gif','g.imagehost.org/0393/c9.gif',
'g.imagehost.org/0427/leit.gif','g.imagehost.org/0575/MamegomaHappy.gif',
'f.imagehost.org/0912/MamegomaInLove.gif',
'f.imagehost.org/0997/MamegomaLaugh.gif','f.imagehost.org/0194/MamegomaShocked.gif',
'f.imagehost.org/0438/MamegomaSleep.gif',
'f.imagehost.org/0172/MamegomaWtf.gif','f.imagehost.org/0238/th_morri.gif',
'f.imagehost.org/0369/kao_blush.gif','g.imagehost.org/0958/kao_cheering.gif',
'f.imagehost.org/0908/kao_confused.gif','f.imagehost.org/0557/kao_cool.gif',
'f.imagehost.org/0707/kao_cry.gif','f.imagehost.org/0253/kao_kiss.gif',
'f.imagehost.org/0344/kao_laughing.gif','g.imagehost.org/0851/kao_love.gif',
'g.imagehost.org/0806/kao_mad.gif','f.imagehost.org/0999/kao_mouth_shut.gif',
'f.imagehost.org/0846/kao_sad.gif','f.imagehost.org/0901/kao_shocked.gif',
'f.imagehost.org/0392/kao_sweat.gif','g.imagehost.org/0178/kao_wink.gif',
'g.imagehost.org/0888/Ahh_1.png','g.imagehost.org/0038/amused.gif','f.imagehost.org/0036/bar.gif',
'g.imagehost.org/0582/imessenger_emo_banana_40.gif','g.imagehost.org/0027/iaa.gif',
'f.imagehost.org/0029/imessenger_emo_banana_41.gif','g.imagehost.org/0803/imessenger_emo_banana_44.gif',
'g.imagehost.org/0615/imessenger_emo_banana_74.gif','g.imagehost.org/0464/imessenger_emo_banana_79.gif',
'g.imagehost.org/0953/imessenger_emo_banana_82.gif','g.imagehost.org/0604/th_Good_night_by_viskot.gif',
'g.imagehost.org/0604/th_confused_by_Freesong.gif','f.imagehost.org/0877/th_yaay.gif', 'j.imagehost.org/0371/th_jail.gif',
'j.imagehost.org/0594/supereyes.gif','j.imagehost.org/0904/retard.gif','j.imagehost.org/0904/3578emo-messbrasil.gif', 

]
]);

smileData.push([
	'24',
	'http://a.imagehost.org/',

		[
                                  '0606/showerfap.gif','0272/Bathtime.gif','0662/sho_wer.gif','0564/shoower.gif',
'0466/shower_time.gif','0371/showerrr.gif',
'0273/sshhowers.gif','0171/sshower.gif','0562/1fwb43.gif','0201/1zckcus.gif', 
'0605/2a8rklw.gif','0014/2j0md68.gif','0412/2mnrz1f.gif','0809/2s0h8nl.gif','0716/2wexdfo.gif',
'0114/11gpxg1.gif','0011/15fri4k.gif','0312/21lnc4z.png','0219/25qzqqg.gif','0628/52be2v.gif','0510/282dvtc.gif',
'0922/2966h3.gif','0824/a9u4og.gif','0730/bhiptt.gif','0528/jrs9ip.gif','0427/k1e2j8.gif','0331/vpckua.gif',
'0733/w32.gif','0028/x1k080g.gif','0932/xcvwuc.gif','0326/2dmik3a.png',
'0300/2hnx8a1.gif','0205/2s9raee.gif','0610/2utp2yb.gif','0514/2zp18cg.gif','0905/5agtnr.gif','0807/24g4o6o.gif',
'0715/28bskdg.gif','0108/34yqjjn.gif',
'0014/156wmxy.gif','0913/353a3ye.gif','0317/e9bxu9.gif','0718/fjmcrt.gif',
'0523/jauyzb.gif','0928/rrjl2b.gif','0206/1z5ulau.gif','0342/2eanp1h.gif',
'0743/2ryswsi.gif','0443/23mpr9t.png','0824/34sqg3s.gif','0721/xm4w3b.gif','0030/4t991s.gif',

]
]);


smileData.push([
	'25',
	'http://a.imagehost.org/',

		[
                                  '0462/swift.gif','0058/swift0.png','0863/swift_2.gif','0667/swift_2.png',
'0569/swift_3.gif','0475/swift_3.png',
'0771/swift_4.gif','0170/swift_5.gif','0972/swift_6.gif','0876/swift_7.gif', 
'0790/swift_8.gif','0440/swift_10.gif','0537/swift_12.gif','0430/swift_13.gif','0341/swift_14.gif',
'0941/swift_15.gif','0833/swift_16.gif','0342/swift_17.gif','0856/swift_18.gif','0464/swift_19.gif','0074/swift_20.gif',
'0477/swift_21.gif','0980/swift_22.gif','0274/swift_24.gif','0841/swift_25.gif','0744/swift_26.gif','0150/swift_27.gif',
'0252/swift_28.gif','0751/swift_29.gif','0913/swift_9.gif','0604/swift_23.gif',
'0215/swift_30.gif','0610/swift_31.gif','0012/swift_32.gif','0413/swift_33.gif','0821/swift_34.gif','0619/swift_35.gif',
'0516/swift_36.gif','0911/swift_37.gif',
'0314/swift_38.gif','0122/swift_39.gif','0534/swift_40.gif','0921/swift_41.gif',
'0830/swift_42.gif','0728/swift_43.gif','0134/swift_44.gif','0527/swift_45.gif',
'0439/swift_46.gif','0236/swift_47.gif','0136/swift_48.gif','0041/swift_49.gif','0438/swift_50.gif',

]
]);

smileData.push([
	'26',
	'http://a.imagehost.org/',

		[
                                  '0834/swift_51.gif','0738/swift_52.gif','0740/swift_53.gif','0503/swift_55.gif',
'0800/swift_56.gif','0700/swift_57.gif',
'0094/swift_58.gif','0218/swift_54.gif','0172/swift_59.gif','0272/swift_60.gif', 
'0500/swift_61.gif','0295/swift_62.gif','0911/swift_63.gif','0016/swift_64.gif','0618/swift_65.gif',
'0624/swift_66.gif','0532/swift_67.gif','0934/swift_68.gif','0837/swift_69.gif','0730/swift_70.gif','0740/swift_71.gif',
'0843/swift_72.gif','0457/swift_73.gif','0462/swift_74.gif','0073/swift_75.gif','0468/swift_76.gif','0770/swift_77.gif',
'0873/swift_78.gif','0279/swift_79.gif','0094/swift_80.gif','0473/swift_81.gif',
'0382/swift_82.gif','0293/swift_83.gif','0585/swift_84.gif','0687/swift_85.gif','0591/swift_86.gif','0498/swift_87.gif',
'0899/swift_88.gif','0656/swift_89.gif',
'0052/swift_90.gif','0857/swift_91.gif','0754/swift_92.gif','0650/swift_93.gif',
'0453/swift_94.gif','0860/swift_95.gif','0255/swift_96.gif','0179/swift_97.gif',
'0471/swift_98.gif','0876/swift_99.gif','0772/swift_100.gif','0680/swift_101.gif','0582/swift_102.gif',

]
]);

smileData.push([
	'27',
	'http://a.imagehost.org/',

		[
                                  '0978/swift_103.gif','0871/swift_104.gif','0072/swift_105.gif','0977/swift_106.gif',
'0379/swift_107.gif','0285/swift_108.gif','0680/swiftt.jpg',
'0454/emot.gif','0261/emot_2.gif','0652/emot_3.gif','0453/emot_4.gif', 
'0668/emot_5.gif','0570/emot_6.gif','0467/emot_7.gif','0777/emot_8.gif','0670/emot_9.gif',
'0574/emot_10.gif','0274/emot_11.gif','0178/emot_12.gif','0071/emot_13.gif','0887/emot_14.gif','0285/emot_15.gif',
'0186/emot_16.gif','0590/emot_17.gif','0389/emot_18.gif','0794/emot_19.gif','0594/emot_20.gif','0749/emoti.gif',
'0638/emoti.png','0423/emoti_2.gif','0334/emoti_2.png','0731/emoti_3.gif',
'0135/emoti_4.gif','0416/emoti_5.gif','0880/emoti_6.gif','0777/emoti_7.gif','0084/emoti_8.gif','0479/emoti_9.gif','0388/emoti_10.gif',

]
]);

smileData.push([
	'28',
	'http://a.imagehost.org/',

		[
                                  '0600/angry.gif','0726/ashamed2.gif','0621/attention.gif','0031/blush.gif',
'0424/blush2.gif','0731/cake.gif',
'0126/cool.gif','0523/crash.gif','0930/cry.gif','0827/dalove.gif', 
'0732/emo_7.gif','0540/emo.jpg','0439/emo_2.gif','0840/emo_3.gif','0241/emo_4.gif',
'0149/emo_5.gif','0546/emo_6.gif','0949/emo_7.gif','0849/emo_8.gif','0645/emo_9.gif','0048/emo_11.gif',
'0951/emo_12.gif','0356/emo_13.gif','0750/emo_14.gif','0152/emo_15.gif','0560/emo_16.gif','0855/emo_17.gif',
'0757/emo_18.gif','0648/emo_20.gif','0068/emo_21.gif','0464/emo_22.gif',
'0024/emo_23.gif','0553/emo_24.gif','0351/emo_25.gif','0250/emo_26.gif','0150/emo_27.gif','0552/emo_28.gif',
'0364/emo_29.gif','0265/emo_30.gif',
'0658/emo_31.gif','0960/emo_32.gif','0261/emo_33.gif','0160/emo_34.gif',
'0563/emo_35.gif','0864/emo_36.gif','0761/emo_37.gif','0077/emo_38.gif',
'0462/emo_40.gif','0380/emo_41.gif','0181/emo_42.gif','0079/emo_43.gif','0986/emo_44.gif',

]
]);

smileData.push([
	'29',
	'http://a.imagehost.org/',

		[
                                  '0886/emo_45.gif','0184/emo_46.gif','0083/emo_47.gif','0984/emo_48.gif',
'0893/emo_49.gif','0795/emo_50.gif',
'0683/eyepopping.gif','0085/frustrated.gif','0889/glad.gif','0289/happy.gif', 
'0972/hungry2.gif','0531/juggling.gif','0335/love.gif','0244/Music_lover_Emoticons_by_Mattdrew.gif','0635/nanana.gif',
'0542/neutral.gif','0442/no.gif','0345/O_o.gif','0743/party2.gif','0139/popcorn2.gif','0445/rolleyes.gif',
'0347/sad.gif','0244/shocked.gif','0645/shout.gif','0550/stressed.gif','0960/stupid.gif','0861/stupidme2.gif',
'0262/teary.gif','0055/trash.gif','0467/weirdface2.gif','0364/whisper2.gif',
'0272/worships.gif','0662/yawn2.gif',

]
]);

smileData.push([
	'30',
	'http://i.imagehost.org/',

		[
                                  '0272/6963ae86fc485612f31cf0e6ee6fd896.gif','0408/127253.gif','0412/an-face.gif','0712/243bd5a7efd86923aabea652943952ab.gif',
'0515/smilieset9a.png','0027/smilieset9c.png',
'0822/smilieset9e.png','0025/smilieset9j.png','0031/smilieset9i.png','0330/2a.gif', 
'0139/124221.gif','0086/barraco.gif', '0986/6a3dea7830da74305259072bae537421.gif','0191/1508339.gif','0716/80-003_ts03.gif',
'0292/46be344c93433134705da6d51a5d3f45.gif','0592/243mdyo_th_jpg.gif','0205/473125.gif','0722/07-004_book.gif','0217/2qq.gif','0026/1285915.gif',
'0831/216062.gif','0005/kt_angry_032007.gif','0066/kt_angry.gif','0965/pn_close_200801.gif','0774/1490fae365e8d9.gif','0074/hellokittyFR-44.gif',
'0978/i_s_u_01_11934_01_05.gif','0703/kr_verysad.gif',
'0437/147be5f01ae798.gif','0753/145758f4be0ee6.gif',
'0059/59-003_xm03.gif','0975/59-018_xm18.gif','0277/59-017_xm17.gif',
'0185/20091215b09.gif','0382/g.gif','0206/icon28.gif',
'0720/mistletoe_kiss_by_cremecake.gif','0526/christmas_08.gif',


]
]);


var isinit = false;
var currInput = null;
var pageState = location.href.split('/')[3];

$(function()
{
    var selImg = $('.emoticon_selecter_img');
    
    selImg.each(function(i)
    {
        $(this).data('index', selImg.length - i);
    })
    .click(function()
    {
        isinit || setTimeout(init, 1000);
        currInput = (pageState == 'p') ?  $('#input_permalink') : $(this).data('index') == 2 ? $('#input_big') : $('#input_small');
    });
    
    // input box
    $('#input_big, #input_small, #input_permalink').keyup(replaceSmile);
});


// init
function init()
{
    isinit = true;
    $('#emoticon_selecter')
        .wrapInner('<div/>')
        .prepend('<ul><li ref="0">00</li></ul>')
        .css({color:'#ACD5F4'});
    // init contents
    $(smileData).each(addTab);
    // init css
    initCSS();
    // bind events
    bindEvents();
}

function initCSS()
{
    $('#emoticon_selecter > ul').css(
	{           
		margin:'0',
		padding: '0 0 0 0',
		listStyle: 'none',
		width: '450!important',
	})

	.children('li').css(
	{
                        color: '#C4AE74',
		float: 'left',
		marginTop: '2px',
		marginBottom: '2px',
		marginLeft: '0',
		marginRight: '3px',
                        border:'1px solid #9FDCF7',
		padding: '0 3px',
		cursor: 'pointer',
                        fontSize:'6.5pt',
                        fontWeight:'normal',
		backgroundColor: '#9FDCF7',
	});

	$('#emoticon_selecter div').css(
	{
		marginTop: '3px',
		marginBottom: '3px',
		marginRight: '0',
		marginLeft: '0',
		padding: '0px',
                        borderTop:'3px double #fff',
		backgroundColor: '#fff',
		height: '100%',
		width: '450',
		clear: 'both',
		overflow: 'auto'
	})
	.children('img').css(
	{
		margin: '1px',
		padding: '0',
		backgroundColor: '#fff',
		border: '1px solid #9FDCF7',
		width: '30px',
		height: '30px',
		cursor: 'pointer',
                        textAlign: 'center'
	});

}


function bindEvents()
{
    // insert smile
    $('#emoticon_selecter > div > img').click(function()
    {
        currInput.val(currInput.val() + ' ' + this.src + ' ').focus();
    });
    // tabs
	$('#emoticon_selecter > ul > li').mouseover(function()
	{
		$('#emoticon_selecter > ul > li').css('background-color','');
		var ref = $(this).css('background-color','#E2FAFC').attr('ref');
		$('#emoticon_selecter > div').hide().eq(parseInt(ref)).show();
	}).eq(0).mouseover();
}

function replaceSmile()
{
    this.value = this.value.replace(/\[(\d+) (\d+)\]/g, doReplace);
}

function doReplace(str, datid, smileid)
{
    arr = smileData[datid];
    if (typeof(arr) != 'undefined')
    {
        if(typeof(arr[2][smileid]) != 'undefined')
            str = ' ' + smileData[datid][1] + smileData[datid][2][smileid] + ' ';
    }
    return str;
}

function addTab(id, data)
{
	$('#emoticon_selecter > ul').append('<li ref="'+(id+1)+'">'+data[0]+'</li>');
	addImages($('<div></div>').appendTo('#emoticon_selecter').hide(), data, id);
}

function addImages(obj, data, ind)
{
    var baseUrl = data[1];
    $(data[2]).each(function(i, dat)
    {
        var _url = baseUrl + dat;
        obj.append('<img src="'+_url+'" alt="'+dat+'" title="['+ind+' '+i+']" />');
    });
}