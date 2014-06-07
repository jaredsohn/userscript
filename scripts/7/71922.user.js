// ==UserScript==

// @name           Neobux Referral Highlighter v1 _ Experimental

// @namespace      http://www.neobux.com/

// @description    A completely new & rewritten version of the Neobux Referral Highlighter that allows you to design your own custom rules for highlighting your referrals, and what *exactly* you want to do with them (eg: highlight it / hide it)

// @include        http://www.neobux.com/c/rl/*

// @include        https://www.neobux.com/c/rl/*



////version = major.minor.date.time //date.time = yymmdd.hhmm (GMT)

// @version        1.0.101230.1750



////started keeping a changelog of the history in the file ~07/Jan/2010

// @history        0.2.1 = The version prior to the change in the version number format;

// @history        0.3 = The next version # that is being worked towards;

// @history        0.3.100107.1311 = Changed some formatting, variable names - General Tidy up of the code; Changed cleanData() to remove 'everything' between the brackets, not just numbers;

// @history        0.3 = The next version # that is being worked towards; 100107.1311 = Changed some formatting, variable names - General Tidy up of the code; Changed cleanData() to remove 'everything' between the brackets, not just numbers;

// @history        1.0 = Complete rewrite of the code to allow custom rules / actions

// @history        1.0.100319.2008 = It is working when used via the Firebug console but not as a greasemonkey script (Error console states 'component not available' with no indication re:line numbers or to which component it refers to =/ ; 

// @history        1.0.100319.2113 = After some googling I changed to jQuery 1.3.2 (from what I assume was 1.4) and the problems ceased, almost ready to release;

// @history        1.0.101114.0104 = oh wow this script still works O.o; Trivial fix to the rented referrals page code after http://www.neobux.com/forum/?/3/157684/Referral-listing/ broke it; Uploaded to userscripts.org;

// @history        1.0.101230.1750 = Amended the include rules to match the new Neobux url structures; Uploaded to userscripts.org;



// @attribution    kwah [modifed xargoon's script to fix bug(s) plus later updates] ( http://www.neobux.com/forum/?frmid=7&tpcid=61509 )

// @attribution    Kjetil Leroen (xargoon) [full credit for the original script] ( http://www.neobux.com/forum/?frmid=7&tpcid=12599 )



// @license (CC)   Attribution-Noncommercial-Share Alike 2.0; http://creativecommons.org/licenses/by-nc-sa/2.0/



// ==/UserScript==





// wrapped in an anonymous function so that it doesn't interfere with the page's javascript when run using the firebug console

(function(){



  // jQuery -- Doesn't seem to be working correctly ($.each() seems to break things inside GM)

  // eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(G(){9(1m E!="W")H w=E;H E=18.15=G(a,b){I 6 7u E?6.5N(a,b):1u E(a,b)};9(1m $!="W")H D=$;18.$=E;H u=/^[^<]*(<(.|\\s)+>)[^>]*$|^#(\\w+)$/;E.1b=E.3A={5N:G(c,a){c=c||U;9(1m c=="1M"){H m=u.2S(c);9(m&&(m[1]||!a)){9(m[1])c=E.4D([m[1]],a);J{H b=U.3S(m[3]);9(b)9(b.22!=m[3])I E().1Y(c);J{6[0]=b;6.K=1;I 6}J c=[]}}J I 1u E(a).1Y(c)}J 9(E.1n(c))I 1u E(U)[E.1b.2d?"2d":"39"](c);I 6.6v(c.1c==1B&&c||(c.4c||c.K&&c!=18&&!c.1y&&c[0]!=W&&c[0].1y)&&E.2h(c)||[c])},4c:"1.2.1",7Y:G(){I 6.K},K:0,21:G(a){I a==W?E.2h(6):6[a]},2o:G(a){H b=E(a);b.4Y=6;I b},6v:G(a){6.K=0;1B.3A.1a.16(6,a);I 6},N:G(a,b){I E.N(6,a,b)},4I:G(a){H b=-1;6.N(G(i){9(6==a)b=i});I b},1x:G(f,d,e){H c=f;9(f.1c==3X)9(d==W)I 6.K&&E[e||"1x"](6[0],f)||W;J{c={};c[f]=d}I 6.N(G(a){L(H b 1i c)E.1x(e?6.R:6,b,E.1e(6,c[b],e,a,b))})},17:G(b,a){I 6.1x(b,a,"3C")},2g:G(e){9(1m e!="5i"&&e!=S)I 6.4n().3g(U.6F(e));H t="";E.N(e||6,G(){E.N(6.3j,G(){9(6.1y!=8)t+=6.1y!=1?6.6x:E.1b.2g([6])})});I t},5m:G(b){9(6[0])E(b,6[0].3H).6u().3d(6[0]).1X(G(){H a=6;1W(a.1w)a=a.1w;I a}).3g(6);I 6},8m:G(a){I 6.N(G(){E(6).6q().5m(a)})},8d:G(a){I 6.N(G(){E(6).5m(a)})},3g:G(){I 6.3z(1q,Q,1,G(a){6.58(a)})},6j:G(){I 6.3z(1q,Q,-1,G(a){6.3d(a,6.1w)})},6g:G(){I 6.3z(1q,P,1,G(a){6.12.3d(a,6)})},50:G(){I 6.3z(1q,P,-1,G(a){6.12.3d(a,6.2q)})},2D:G(){I 6.4Y||E([])},1Y:G(t){H b=E.1X(6,G(a){I E.1Y(t,a)});I 6.2o(/[^+>] [^+>]/.14(t)||t.1g("..")>-1?E.4V(b):b)},6u:G(e){H f=6.1X(G(){I 6.67?E(6.67)[0]:6.4R(Q)});H d=f.1Y("*").4O().N(G(){9(6[F]!=W)6[F]=S});9(e===Q)6.1Y("*").4O().N(G(i){H c=E.M(6,"2P");L(H a 1i c)L(H b 1i c[a])E.1j.1f(d[i],a,c[a][b],c[a][b].M)});I f},1E:G(t){I 6.2o(E.1n(t)&&E.2W(6,G(b,a){I t.16(b,[a])})||E.3m(t,6))},5V:G(t){I 6.2o(t.1c==3X&&E.3m(t,6,Q)||E.2W(6,G(a){I(t.1c==1B||t.4c)?E.2A(a,t)<0:a!=t}))},1f:G(t){I 6.2o(E.1R(6.21(),t.1c==3X?E(t).21():t.K!=W&&(!t.11||E.11(t,"2Y"))?t:[t]))},3t:G(a){I a?E.3m(a,6).K>0:P},7c:G(a){I 6.3t("."+a)},3i:G(b){9(b==W){9(6.K){H c=6[0];9(E.11(c,"24")){H e=c.4Z,a=[],Y=c.Y,2G=c.O=="24-2G";9(e<0)I S;L(H i=2G?e:0,33=2G?e+1:Y.K;i<33;i++){H d=Y[i];9(d.26){H b=E.V.1h&&!d.9V["1Q"].9L?d.2g:d.1Q;9(2G)I b;a.1a(b)}}I a}J I 6[0].1Q.1p(/\\r/g,"")}}J I 6.N(G(){9(b.1c==1B&&/4k|5j/.14(6.O))6.2Q=(E.2A(6.1Q,b)>=0||E.2A(6.2H,b)>=0);J 9(E.11(6,"24")){H a=b.1c==1B?b:[b];E("9h",6).N(G(){6.26=(E.2A(6.1Q,a)>=0||E.2A(6.2g,a)>=0)});9(!a.K)6.4Z=-1}J 6.1Q=b})},4o:G(a){I a==W?(6.K?6[0].3O:S):6.4n().3g(a)},6H:G(a){I 6.50(a).28()},6E:G(i){I 6.2J(i,i+1)},2J:G(){I 6.2o(1B.3A.2J.16(6,1q))},1X:G(b){I 6.2o(E.1X(6,G(a,i){I b.2O(a,i,a)}))},4O:G(){I 6.1f(6.4Y)},3z:G(f,d,g,e){H c=6.K>1,a;I 6.N(G(){9(!a){a=E.4D(f,6.3H);9(g<0)a.8U()}H b=6;9(d&&E.11(6,"1I")&&E.11(a[0],"4m"))b=6.4l("1K")[0]||6.58(U.5B("1K"));E.N(a,G(){H a=c?6.4R(Q):6;9(!5A(0,a))e.2O(b,a)})})}};G 5A(i,b){H a=E.11(b,"1J");9(a){9(b.3k)E.3G({1d:b.3k,3e:P,1V:"1J"});J E.5f(b.2g||b.6s||b.3O||"");9(b.12)b.12.3b(b)}J 9(b.1y==1)E("1J",b).N(5A);I a}E.1k=E.1b.1k=G(){H c=1q[0]||{},a=1,2c=1q.K,5e=P;9(c.1c==8o){5e=c;c=1q[1]||{}}9(2c==1){c=6;a=0}H b;L(;a<2c;a++)9((b=1q[a])!=S)L(H i 1i b){9(c==b[i])6r;9(5e&&1m b[i]==\'5i\'&&c[i])E.1k(c[i],b[i]);J 9(b[i]!=W)c[i]=b[i]}I c};H F="15"+(1u 3D()).3B(),6p=0,5c={};E.1k({8a:G(a){18.$=D;9(a)18.15=w;I E},1n:G(a){I!!a&&1m a!="1M"&&!a.11&&a.1c!=1B&&/G/i.14(a+"")},4a:G(a){I a.2V&&!a.1G||a.37&&a.3H&&!a.3H.1G},5f:G(a){a=E.36(a);9(a){9(18.6l)18.6l(a);J 9(E.V.1N)18.56(a,0);J 3w.2O(18,a)}},11:G(b,a){I b.11&&b.11.27()==a.27()},1L:{},M:G(c,d,b){c=c==18?5c:c;H a=c[F];9(!a)a=c[F]=++6p;9(d&&!E.1L[a])E.1L[a]={};9(b!=W)E.1L[a][d]=b;I d?E.1L[a][d]:a},30:G(c,b){c=c==18?5c:c;H a=c[F];9(b){9(E.1L[a]){2E E.1L[a][b];b="";L(b 1i E.1L[a])1T;9(!b)E.30(c)}}J{2a{2E c[F]}29(e){9(c.53)c.53(F)}2E E.1L[a]}},N:G(a,b,c){9(c){9(a.K==W)L(H i 1i a)b.16(a[i],c);J L(H i=0,48=a.K;i<48;i++)9(b.16(a[i],c)===P)1T}J{9(a.K==W)L(H i 1i a)b.2O(a[i],i,a[i]);J L(H i=0,48=a.K,3i=a[0];i<48&&b.2O(3i,i,3i)!==P;3i=a[++i]){}}I a},1e:G(c,b,d,e,a){9(E.1n(b))b=b.2O(c,[e]);H f=/z-?4I|7T-?7Q|1r|69|7P-?1H/i;I b&&b.1c==4W&&d=="3C"&&!f.14(a)?b+"2T":b},1o:{1f:G(b,c){E.N((c||"").2l(/\\s+/),G(i,a){9(!E.1o.3K(b.1o,a))b.1o+=(b.1o?" ":"")+a})},28:G(b,c){b.1o=c!=W?E.2W(b.1o.2l(/\\s+/),G(a){I!E.1o.3K(c,a)}).66(" "):""},3K:G(t,c){I E.2A(c,(t.1o||t).3s().2l(/\\s+/))>-1}},2k:G(e,o,f){L(H i 1i o){e.R["3r"+i]=e.R[i];e.R[i]=o[i]}f.16(e,[]);L(H i 1i o)e.R[i]=e.R["3r"+i]},17:G(e,p){9(p=="1H"||p=="2N"){H b={},42,41,d=["7J","7I","7G","7F"];E.N(d,G(){b["7C"+6]=0;b["7B"+6+"5Z"]=0});E.2k(e,b,G(){9(E(e).3t(\':3R\')){42=e.7A;41=e.7w}J{e=E(e.4R(Q)).1Y(":4k").5W("2Q").2D().17({4C:"1P",2X:"4F",19:"2Z",7o:"0",1S:"0"}).5R(e.12)[0];H a=E.17(e.12,"2X")||"3V";9(a=="3V")e.12.R.2X="7g";42=e.7e;41=e.7b;9(a=="3V")e.12.R.2X="3V";e.12.3b(e)}});I p=="1H"?42:41}I E.3C(e,p)},3C:G(h,j,i){H g,2w=[],2k=[];G 3n(a){9(!E.V.1N)I P;H b=U.3o.3Z(a,S);I!b||b.4y("3n")==""}9(j=="1r"&&E.V.1h){g=E.1x(h.R,"1r");I g==""?"1":g}9(j.1t(/4u/i))j=y;9(!i&&h.R[j])g=h.R[j];J 9(U.3o&&U.3o.3Z){9(j.1t(/4u/i))j="4u";j=j.1p(/([A-Z])/g,"-$1").2p();H d=U.3o.3Z(h,S);9(d&&!3n(h))g=d.4y(j);J{L(H a=h;a&&3n(a);a=a.12)2w.4w(a);L(a=0;a<2w.K;a++)9(3n(2w[a])){2k[a]=2w[a].R.19;2w[a].R.19="2Z"}g=j=="19"&&2k[2w.K-1]!=S?"2s":U.3o.3Z(h,S).4y(j)||"";L(a=0;a<2k.K;a++)9(2k[a]!=S)2w[a].R.19=2k[a]}9(j=="1r"&&g=="")g="1"}J 9(h.3Q){H f=j.1p(/\\-(\\w)/g,G(m,c){I c.27()});g=h.3Q[j]||h.3Q[f];9(!/^\\d+(2T)?$/i.14(g)&&/^\\d/.14(g)){H k=h.R.1S;H e=h.4v.1S;h.4v.1S=h.3Q.1S;h.R.1S=g||0;g=h.R.71+"2T";h.R.1S=k;h.4v.1S=e}}I g},4D:G(a,e){H r=[];e=e||U;E.N(a,G(i,d){9(!d)I;9(d.1c==4W)d=d.3s();9(1m d=="1M"){d=d.1p(/(<(\\w+)[^>]*?)\\/>/g,G(m,a,b){I b.1t(/^(70|6Z|6Y|9Q|4t|9N|9K|3a|9G|9E)$/i)?m:a+"></"+b+">"});H s=E.36(d).2p(),1s=e.5B("1s"),2x=[];H c=!s.1g("<9y")&&[1,"<24>","</24>"]||!s.1g("<9w")&&[1,"<6T>","</6T>"]||s.1t(/^<(9u|1K|9t|9r|9p)/)&&[1,"<1I>","</1I>"]||!s.1g("<4m")&&[2,"<1I><1K>","</1K></1I>"]||(!s.1g("<9m")||!s.1g("<9k"))&&[3,"<1I><1K><4m>","</4m></1K></1I>"]||!s.1g("<6Y")&&[2,"<1I><1K></1K><6L>","</6L></1I>"]||E.V.1h&&[1,"1s<1s>","</1s>"]||[0,"",""];1s.3O=c[1]+d+c[2];1W(c[0]--)1s=1s.5p;9(E.V.1h){9(!s.1g("<1I")&&s.1g("<1K")<0)2x=1s.1w&&1s.1w.3j;J 9(c[1]=="<1I>"&&s.1g("<1K")<0)2x=1s.3j;L(H n=2x.K-1;n>=0;--n)9(E.11(2x[n],"1K")&&!2x[n].3j.K)2x[n].12.3b(2x[n]);9(/^\\s/.14(d))1s.3d(e.6F(d.1t(/^\\s*/)[0]),1s.1w)}d=E.2h(1s.3j)}9(0===d.K&&(!E.11(d,"2Y")&&!E.11(d,"24")))I;9(d[0]==W||E.11(d,"2Y")||d.Y)r.1a(d);J r=E.1R(r,d)});I r},1x:G(c,d,a){H e=E.4a(c)?{}:E.5o;9(d=="26"&&E.V.1N)c.12.4Z;9(e[d]){9(a!=W)c[e[d]]=a;I c[e[d]]}J 9(E.V.1h&&d=="R")I E.1x(c.R,"9e",a);J 9(a==W&&E.V.1h&&E.11(c,"2Y")&&(d=="9d"||d=="9a"))I c.97(d).6x;J 9(c.37){9(a!=W){9(d=="O"&&E.11(c,"4t")&&c.12)6G"O 94 93\'t 92 91";c.90(d,a)}9(E.V.1h&&/6C|3k/.14(d)&&!E.4a(c))I c.4p(d,2);I c.4p(d)}J{9(d=="1r"&&E.V.1h){9(a!=W){c.69=1;c.1E=(c.1E||"").1p(/6O\\([^)]*\\)/,"")+(3I(a).3s()=="8S"?"":"6O(1r="+a*6A+")")}I c.1E?(3I(c.1E.1t(/1r=([^)]*)/)[1])/6A).3s():""}d=d.1p(/-([a-z])/8Q,G(z,b){I b.27()});9(a!=W)c[d]=a;I c[d]}},36:G(t){I(t||"").1p(/^\\s+|\\s+$/g,"")},2h:G(a){H r=[];9(1m a!="8P")L(H i=0,2c=a.K;i<2c;i++)r.1a(a[i]);J r=a.2J(0);I r},2A:G(b,a){L(H i=0,2c=a.K;i<2c;i++)9(a[i]==b)I i;I-1},1R:G(a,b){9(E.V.1h){L(H i=0;b[i];i++)9(b[i].1y!=8)a.1a(b[i])}J L(H i=0;b[i];i++)a.1a(b[i]);I a},4V:G(b){H r=[],2f={};2a{L(H i=0,6y=b.K;i<6y;i++){H a=E.M(b[i]);9(!2f[a]){2f[a]=Q;r.1a(b[i])}}}29(e){r=b}I r},2W:G(b,a,c){9(1m a=="1M")a=3w("P||G(a,i){I "+a+"}");H d=[];L(H i=0,4g=b.K;i<4g;i++)9(!c&&a(b[i],i)||c&&!a(b[i],i))d.1a(b[i]);I d},1X:G(c,b){9(1m b=="1M")b=3w("P||G(a){I "+b+"}");H d=[];L(H i=0,4g=c.K;i<4g;i++){H a=b(c[i],i);9(a!==S&&a!=W){9(a.1c!=1B)a=[a];d=d.8M(a)}}I d}});H v=8K.8I.2p();E.V={4s:(v.1t(/.+(?:8F|8E|8C|8B)[\\/: ]([\\d.]+)/)||[])[1],1N:/6w/.14(v),34:/34/.14(v),1h:/1h/.14(v)&&!/34/.14(v),35:/35/.14(v)&&!/(8z|6w)/.14(v)};H y=E.V.1h?"4h":"5h";E.1k({5g:!E.V.1h||U.8y=="8x",4h:E.V.1h?"4h":"5h",5o:{"L":"8w","8v":"1o","4u":y,5h:y,4h:y,3O:"3O",1o:"1o",1Q:"1Q",3c:"3c",2Q:"2Q",8u:"8t",26:"26",8s:"8r"}});E.N({1D:"a.12",8q:"15.4e(a,\'12\')",8p:"15.2I(a,2,\'2q\')",8n:"15.2I(a,2,\'4d\')",8l:"15.4e(a,\'2q\')",8k:"15.4e(a,\'4d\')",8j:"15.5d(a.12.1w,a)",8i:"15.5d(a.1w)",6q:"15.11(a,\'8h\')?a.8f||a.8e.U:15.2h(a.3j)"},G(i,n){E.1b[i]=G(a){H b=E.1X(6,n);9(a&&1m a=="1M")b=E.3m(a,b);I 6.2o(E.4V(b))}});E.N({5R:"3g",8c:"6j",3d:"6g",8b:"50",89:"6H"},G(i,n){E.1b[i]=G(){H a=1q;I 6.N(G(){L(H j=0,2c=a.K;j<2c;j++)E(a[j])[n](6)})}});E.N({5W:G(a){E.1x(6,a,"");6.53(a)},88:G(c){E.1o.1f(6,c)},87:G(c){E.1o.28(6,c)},86:G(c){E.1o[E.1o.3K(6,c)?"28":"1f"](6,c)},28:G(a){9(!a||E.1E(a,[6]).r.K){E.30(6);6.12.3b(6)}},4n:G(){E("*",6).N(G(){E.30(6)});1W(6.1w)6.3b(6.1w)}},G(i,n){E.1b[i]=G(){I 6.N(n,1q)}});E.N(["85","5Z"],G(i,a){H n=a.2p();E.1b[n]=G(h){I 6[0]==18?E.V.1N&&3y["84"+a]||E.5g&&38.33(U.2V["5a"+a],U.1G["5a"+a])||U.1G["5a"+a]:6[0]==U?38.33(U.1G["6n"+a],U.1G["6m"+a]):h==W?(6.K?E.17(6[0],n):S):6.17(n,h.1c==3X?h:h+"2T")}});H C=E.V.1N&&3x(E.V.4s)<83?"(?:[\\\\w*57-]|\\\\\\\\.)":"(?:[\\\\w\\82-\\81*57-]|\\\\\\\\.)",6k=1u 47("^>\\\\s*("+C+"+)"),6i=1u 47("^("+C+"+)(#)("+C+"+)"),6h=1u 47("^([#.]?)("+C+"*)");E.1k({55:{"":"m[2]==\'*\'||15.11(a,m[2])","#":"a.4p(\'22\')==m[2]",":":{80:"i<m[3]-0",7Z:"i>m[3]-0",2I:"m[3]-0==i",6E:"m[3]-0==i",3v:"i==0",3u:"i==r.K-1",6f:"i%2==0",6e:"i%2","3v-46":"a.12.4l(\'*\')[0]==a","3u-46":"15.2I(a.12.5p,1,\'4d\')==a","7X-46":"!15.2I(a.12.5p,2,\'4d\')",1D:"a.1w",4n:"!a.1w",7W:"(a.6s||a.7V||15(a).2g()||\'\').1g(m[3])>=0",3R:\'"1P"!=a.O&&15.17(a,"19")!="2s"&&15.17(a,"4C")!="1P"\',1P:\'"1P"==a.O||15.17(a,"19")=="2s"||15.17(a,"4C")=="1P"\',7U:"!a.3c",3c:"a.3c",2Q:"a.2Q",26:"a.26||15.1x(a,\'26\')",2g:"\'2g\'==a.O",4k:"\'4k\'==a.O",5j:"\'5j\'==a.O",54:"\'54\'==a.O",52:"\'52\'==a.O",51:"\'51\'==a.O",6d:"\'6d\'==a.O",6c:"\'6c\'==a.O",2r:\'"2r"==a.O||15.11(a,"2r")\',4t:"/4t|24|6b|2r/i.14(a.11)",3K:"15.1Y(m[3],a).K",7S:"/h\\\\d/i.14(a.11)",7R:"15.2W(15.32,G(1b){I a==1b.T;}).K"}},6a:[/^(\\[) *@?([\\w-]+) *([!*$^~=]*) *(\'?"?)(.*?)\\4 *\\]/,/^(:)([\\w-]+)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/,1u 47("^([:.#]*)("+C+"+)")],3m:G(a,c,b){H d,2b=[];1W(a&&a!=d){d=a;H f=E.1E(a,c,b);a=f.t.1p(/^\\s*,\\s*/,"");2b=b?c=f.r:E.1R(2b,f.r)}I 2b},1Y:G(t,o){9(1m t!="1M")I[t];9(o&&!o.1y)o=S;o=o||U;H d=[o],2f=[],3u;1W(t&&3u!=t){H r=[];3u=t;t=E.36(t);H l=P;H g=6k;H m=g.2S(t);9(m){H p=m[1].27();L(H i=0;d[i];i++)L(H c=d[i].1w;c;c=c.2q)9(c.1y==1&&(p=="*"||c.11.27()==p.27()))r.1a(c);d=r;t=t.1p(g,"");9(t.1g(" ")==0)6r;l=Q}J{g=/^([>+~])\\s*(\\w*)/i;9((m=g.2S(t))!=S){r=[];H p=m[2],1R={};m=m[1];L(H j=0,31=d.K;j<31;j++){H n=m=="~"||m=="+"?d[j].2q:d[j].1w;L(;n;n=n.2q)9(n.1y==1){H h=E.M(n);9(m=="~"&&1R[h])1T;9(!p||n.11.27()==p.27()){9(m=="~")1R[h]=Q;r.1a(n)}9(m=="+")1T}}d=r;t=E.36(t.1p(g,""));l=Q}}9(t&&!l){9(!t.1g(",")){9(o==d[0])d.44();2f=E.1R(2f,d);r=d=[o];t=" "+t.68(1,t.K)}J{H k=6i;H m=k.2S(t);9(m){m=[0,m[2],m[3],m[1]]}J{k=6h;m=k.2S(t)}m[2]=m[2].1p(/\\\\/g,"");H f=d[d.K-1];9(m[1]=="#"&&f&&f.3S&&!E.4a(f)){H q=f.3S(m[2]);9((E.V.1h||E.V.34)&&q&&1m q.22=="1M"&&q.22!=m[2])q=E(\'[@22="\'+m[2]+\'"]\',f)[0];d=r=q&&(!m[3]||E.11(q,m[3]))?[q]:[]}J{L(H i=0;d[i];i++){H a=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];9(a=="*"&&d[i].11.2p()=="5i")a="3a";r=E.1R(r,d[i].4l(a))}9(m[1]==".")r=E.4X(r,m[2]);9(m[1]=="#"){H e=[];L(H i=0;r[i];i++)9(r[i].4p("22")==m[2]){e=[r[i]];1T}r=e}d=r}t=t.1p(k,"")}}9(t){H b=E.1E(t,r);d=r=b.r;t=E.36(b.t)}}9(t)d=[];9(d&&o==d[0])d.44();2f=E.1R(2f,d);I 2f},4X:G(r,m,a){m=" "+m+" ";H c=[];L(H i=0;r[i];i++){H b=(" "+r[i].1o+" ").1g(m)>=0;9(!a&&b||a&&!b)c.1a(r[i])}I c},1E:G(t,r,h){H d;1W(t&&t!=d){d=t;H p=E.6a,m;L(H i=0;p[i];i++){m=p[i].2S(t);9(m){t=t.7O(m[0].K);m[2]=m[2].1p(/\\\\/g,"");1T}}9(!m)1T;9(m[1]==":"&&m[2]=="5V")r=E.1E(m[3],r,Q).r;J 9(m[1]==".")r=E.4X(r,m[2],h);J 9(m[1]=="["){H g=[],O=m[3];L(H i=0,31=r.K;i<31;i++){H a=r[i],z=a[E.5o[m[2]]||m[2]];9(z==S||/6C|3k|26/.14(m[2]))z=E.1x(a,m[2])||\'\';9((O==""&&!!z||O=="="&&z==m[5]||O=="!="&&z!=m[5]||O=="^="&&z&&!z.1g(m[5])||O=="$="&&z.68(z.K-m[5].K)==m[5]||(O=="*="||O=="~=")&&z.1g(m[5])>=0)^h)g.1a(a)}r=g}J 9(m[1]==":"&&m[2]=="2I-46"){H e={},g=[],14=/(\\d*)n\\+?(\\d*)/.2S(m[3]=="6f"&&"2n"||m[3]=="6e"&&"2n+1"||!/\\D/.14(m[3])&&"n+"+m[3]||m[3]),3v=(14[1]||1)-0,d=14[2]-0;L(H i=0,31=r.K;i<31;i++){H j=r[i],12=j.12,22=E.M(12);9(!e[22]){H c=1;L(H n=12.1w;n;n=n.2q)9(n.1y==1)n.4U=c++;e[22]=Q}H b=P;9(3v==1){9(d==0||j.4U==d)b=Q}J 9((j.4U+d)%3v==0)b=Q;9(b^h)g.1a(j)}r=g}J{H f=E.55[m[1]];9(1m f!="1M")f=E.55[m[1]][m[2]];f=3w("P||G(a,i){I "+f+"}");r=E.2W(r,f,h)}}I{r:r,t:t}},4e:G(b,c){H d=[];H a=b[c];1W(a&&a!=U){9(a.1y==1)d.1a(a);a=a[c]}I d},2I:G(a,e,c,b){e=e||1;H d=0;L(;a;a=a[c])9(a.1y==1&&++d==e)1T;I a},5d:G(n,a){H r=[];L(;n;n=n.2q){9(n.1y==1&&(!a||n!=a))r.1a(n)}I r}});E.1j={1f:G(g,e,c,h){9(E.V.1h&&g.4j!=W)g=18;9(!c.2u)c.2u=6.2u++;9(h!=W){H d=c;c=G(){I d.16(6,1q)};c.M=h;c.2u=d.2u}H i=e.2l(".");e=i[0];c.O=i[1];H b=E.M(g,"2P")||E.M(g,"2P",{});H f=E.M(g,"2t",G(){H a;9(1m E=="W"||E.1j.4T)I a;a=E.1j.2t.16(g,1q);I a});H j=b[e];9(!j){j=b[e]={};9(g.4S)g.4S(e,f,P);J g.7N("43"+e,f)}j[c.2u]=c;6.1Z[e]=Q},2u:1,1Z:{},28:G(d,c,b){H e=E.M(d,"2P"),2L,4I;9(1m c=="1M"){H a=c.2l(".");c=a[0]}9(e){9(c&&c.O){b=c.4Q;c=c.O}9(!c){L(c 1i e)6.28(d,c)}J 9(e[c]){9(b)2E e[c][b.2u];J L(b 1i e[c])9(!a[1]||e[c][b].O==a[1])2E e[c][b];L(2L 1i e[c])1T;9(!2L){9(d.4P)d.4P(c,E.M(d,"2t"),P);J d.7M("43"+c,E.M(d,"2t"));2L=S;2E e[c]}}L(2L 1i e)1T;9(!2L){E.30(d,"2P");E.30(d,"2t")}}},1F:G(d,b,e,c,f){b=E.2h(b||[]);9(!e){9(6.1Z[d])E("*").1f([18,U]).1F(d,b)}J{H a,2L,1b=E.1n(e[d]||S),4N=!b[0]||!b[0].2M;9(4N)b.4w(6.4M({O:d,2m:e}));b[0].O=d;9(E.1n(E.M(e,"2t")))a=E.M(e,"2t").16(e,b);9(!1b&&e["43"+d]&&e["43"+d].16(e,b)===P)a=P;9(4N)b.44();9(f&&f.16(e,b)===P)a=P;9(1b&&c!==P&&a!==P&&!(E.11(e,\'a\')&&d=="4L")){6.4T=Q;e[d]()}6.4T=P}I a},2t:G(d){H a;d=E.1j.4M(d||18.1j||{});H b=d.O.2l(".");d.O=b[0];H c=E.M(6,"2P")&&E.M(6,"2P")[d.O],3q=1B.3A.2J.2O(1q,1);3q.4w(d);L(H j 1i c){3q[0].4Q=c[j];3q[0].M=c[j].M;9(!b[1]||c[j].O==b[1]){H e=c[j].16(6,3q);9(a!==P)a=e;9(e===P){d.2M();d.3p()}}}9(E.V.1h)d.2m=d.2M=d.3p=d.4Q=d.M=S;I a},4M:G(c){H a=c;c=E.1k({},a);c.2M=G(){9(a.2M)a.2M();a.7L=P};c.3p=G(){9(a.3p)a.3p();a.7K=Q};9(!c.2m&&c.65)c.2m=c.65;9(E.V.1N&&c.2m.1y==3)c.2m=a.2m.12;9(!c.4K&&c.4J)c.4K=c.4J==c.2m?c.7H:c.4J;9(c.64==S&&c.63!=S){H e=U.2V,b=U.1G;c.64=c.63+(e&&e.2R||b.2R||0);c.7E=c.7D+(e&&e.2B||b.2B||0)}9(!c.3Y&&(c.61||c.60))c.3Y=c.61||c.60;9(!c.5F&&c.5D)c.5F=c.5D;9(!c.3Y&&c.2r)c.3Y=(c.2r&1?1:(c.2r&2?3:(c.2r&4?2:0)));I c}};E.1b.1k({3W:G(c,a,b){I c=="5Y"?6.2G(c,a,b):6.N(G(){E.1j.1f(6,c,b||a,b&&a)})},2G:G(d,b,c){I 6.N(G(){E.1j.1f(6,d,G(a){E(6).5X(a);I(c||b).16(6,1q)},c&&b)})},5X:G(a,b){I 6.N(G(){E.1j.28(6,a,b)})},1F:G(c,a,b){I 6.N(G(){E.1j.1F(c,a,6,Q,b)})},7x:G(c,a,b){9(6[0])I E.1j.1F(c,a,6[0],P,b)},25:G(){H a=1q;I 6.4L(G(e){6.4H=0==6.4H?1:0;e.2M();I a[6.4H].16(6,[e])||P})},7v:G(f,g){G 4G(e){H p=e.4K;1W(p&&p!=6)2a{p=p.12}29(e){p=6};9(p==6)I P;I(e.O=="4x"?f:g).16(6,[e])}I 6.4x(4G).5U(4G)},2d:G(f){5T();9(E.3T)f.16(U,[E]);J E.3l.1a(G(){I f.16(6,[E])});I 6}});E.1k({3T:P,3l:[],2d:G(){9(!E.3T){E.3T=Q;9(E.3l){E.N(E.3l,G(){6.16(U)});E.3l=S}9(E.V.35||E.V.34)U.4P("5S",E.2d,P);9(!18.7t.K)E(18).39(G(){E("#4E").28()})}}});E.N(("7s,7r,39,7q,6n,5Y,4L,7p,"+"7n,7m,7l,4x,5U,7k,24,"+"51,7j,7i,7h,3U").2l(","),G(i,o){E.1b[o]=G(f){I f?6.3W(o,f):6.1F(o)}});H x=P;G 5T(){9(x)I;x=Q;9(E.V.35||E.V.34)U.4S("5S",E.2d,P);J 9(E.V.1h){U.7f("<7d"+"7y 22=4E 7z=Q "+"3k=//:><\\/1J>");H a=U.3S("4E");9(a)a.62=G(){9(6.2C!="1l")I;E.2d()};a=S}J 9(E.V.1N)E.4B=4j(G(){9(U.2C=="5Q"||U.2C=="1l"){4A(E.4B);E.4B=S;E.2d()}},10);E.1j.1f(18,"39",E.2d)}E.1b.1k({39:G(g,d,c){9(E.1n(g))I 6.3W("39",g);H e=g.1g(" ");9(e>=0){H i=g.2J(e,g.K);g=g.2J(0,e)}c=c||G(){};H f="4z";9(d)9(E.1n(d)){c=d;d=S}J{d=E.3a(d);f="5P"}H h=6;E.3G({1d:g,O:f,M:d,1l:G(a,b){9(b=="1C"||b=="5O")h.4o(i?E("<1s/>").3g(a.40.1p(/<1J(.|\\s)*?\\/1J>/g,"")).1Y(i):a.40);56(G(){h.N(c,[a.40,b,a])},13)}});I 6},7a:G(){I E.3a(6.5M())},5M:G(){I 6.1X(G(){I E.11(6,"2Y")?E.2h(6.79):6}).1E(G(){I 6.2H&&!6.3c&&(6.2Q||/24|6b/i.14(6.11)||/2g|1P|52/i.14(6.O))}).1X(G(i,c){H b=E(6).3i();I b==S?S:b.1c==1B?E.1X(b,G(a,i){I{2H:c.2H,1Q:a}}):{2H:c.2H,1Q:b}}).21()}});E.N("5L,5K,6t,5J,5I,5H".2l(","),G(i,o){E.1b[o]=G(f){I 6.3W(o,f)}});H B=(1u 3D).3B();E.1k({21:G(d,b,a,c){9(E.1n(b)){a=b;b=S}I E.3G({O:"4z",1d:d,M:b,1C:a,1V:c})},78:G(b,a){I E.21(b,S,a,"1J")},77:G(c,b,a){I E.21(c,b,a,"45")},76:G(d,b,a,c){9(E.1n(b)){a=b;b={}}I E.3G({O:"5P",1d:d,M:b,1C:a,1V:c})},75:G(a){E.1k(E.59,a)},59:{1Z:Q,O:"4z",2z:0,5G:"74/x-73-2Y-72",6o:Q,3e:Q,M:S},49:{},3G:G(s){H f,2y=/=(\\?|%3F)/g,1v,M;s=E.1k(Q,s,E.1k(Q,{},E.59,s));9(s.M&&s.6o&&1m s.M!="1M")s.M=E.3a(s.M);9(s.1V=="4b"){9(s.O.2p()=="21"){9(!s.1d.1t(2y))s.1d+=(s.1d.1t(/\\?/)?"&":"?")+(s.4b||"5E")+"=?"}J 9(!s.M||!s.M.1t(2y))s.M=(s.M?s.M+"&":"")+(s.4b||"5E")+"=?";s.1V="45"}9(s.1V=="45"&&(s.M&&s.M.1t(2y)||s.1d.1t(2y))){f="4b"+B++;9(s.M)s.M=s.M.1p(2y,"="+f);s.1d=s.1d.1p(2y,"="+f);s.1V="1J";18[f]=G(a){M=a;1C();1l();18[f]=W;2a{2E 18[f]}29(e){}}}9(s.1V=="1J"&&s.1L==S)s.1L=P;9(s.1L===P&&s.O.2p()=="21")s.1d+=(s.1d.1t(/\\?/)?"&":"?")+"57="+(1u 3D()).3B();9(s.M&&s.O.2p()=="21"){s.1d+=(s.1d.1t(/\\?/)?"&":"?")+s.M;s.M=S}9(s.1Z&&!E.5b++)E.1j.1F("5L");9(!s.1d.1g("8g")&&s.1V=="1J"){H h=U.4l("9U")[0];H g=U.5B("1J");g.3k=s.1d;9(!f&&(s.1C||s.1l)){H j=P;g.9R=g.62=G(){9(!j&&(!6.2C||6.2C=="5Q"||6.2C=="1l")){j=Q;1C();1l();h.3b(g)}}}h.58(g);I}H k=P;H i=18.6X?1u 6X("9P.9O"):1u 6W();i.9M(s.O,s.1d,s.3e);9(s.M)i.5C("9J-9I",s.5G);9(s.5y)i.5C("9H-5x-9F",E.49[s.1d]||"9D, 9C 9B 9A 5v:5v:5v 9z");i.5C("X-9x-9v","6W");9(s.6U)s.6U(i);9(s.1Z)E.1j.1F("5H",[i,s]);H c=G(a){9(!k&&i&&(i.2C==4||a=="2z")){k=Q;9(d){4A(d);d=S}1v=a=="2z"&&"2z"||!E.6S(i)&&"3U"||s.5y&&E.6R(i,s.1d)&&"5O"||"1C";9(1v=="1C"){2a{M=E.6Q(i,s.1V)}29(e){1v="5k"}}9(1v=="1C"){H b;2a{b=i.5s("6P-5x")}29(e){}9(s.5y&&b)E.49[s.1d]=b;9(!f)1C()}J E.5r(s,i,1v);1l();9(s.3e)i=S}};9(s.3e){H d=4j(c,13);9(s.2z>0)56(G(){9(i){i.9q();9(!k)c("2z")}},s.2z)}2a{i.9o(s.M)}29(e){E.5r(s,i,S,e)}9(!s.3e)c();I i;G 1C(){9(s.1C)s.1C(M,1v);9(s.1Z)E.1j.1F("5I",[i,s])}G 1l(){9(s.1l)s.1l(i,1v);9(s.1Z)E.1j.1F("6t",[i,s]);9(s.1Z&&!--E.5b)E.1j.1F("5K")}},5r:G(s,a,b,e){9(s.3U)s.3U(a,b,e);9(s.1Z)E.1j.1F("5J",[a,s,e])},5b:0,6S:G(r){2a{I!r.1v&&9n.9l=="54:"||(r.1v>=6N&&r.1v<9j)||r.1v==6M||E.V.1N&&r.1v==W}29(e){}I P},6R:G(a,c){2a{H b=a.5s("6P-5x");I a.1v==6M||b==E.49[c]||E.V.1N&&a.1v==W}29(e){}I P},6Q:G(r,b){H c=r.5s("9i-O");H d=b=="6K"||!b&&c&&c.1g("6K")>=0;H a=d?r.9g:r.40;9(d&&a.2V.37=="5k")6G"5k";9(b=="1J")E.5f(a);9(b=="45")a=3w("("+a+")");I a},3a:G(a){H s=[];9(a.1c==1B||a.4c)E.N(a,G(){s.1a(3f(6.2H)+"="+3f(6.1Q))});J L(H j 1i a)9(a[j]&&a[j].1c==1B)E.N(a[j],G(){s.1a(3f(j)+"="+3f(6))});J s.1a(3f(j)+"="+3f(a[j]));I s.66("&").1p(/%20/g,"+")}});E.1b.1k({1A:G(b,a){I b?6.1U({1H:"1A",2N:"1A",1r:"1A"},b,a):6.1E(":1P").N(G(){6.R.19=6.3h?6.3h:"";9(E.17(6,"19")=="2s")6.R.19="2Z"}).2D()},1z:G(b,a){I b?6.1U({1H:"1z",2N:"1z",1r:"1z"},b,a):6.1E(":3R").N(G(){6.3h=6.3h||E.17(6,"19");9(6.3h=="2s")6.3h="2Z";6.R.19="2s"}).2D()},6J:E.1b.25,25:G(a,b){I E.1n(a)&&E.1n(b)?6.6J(a,b):a?6.1U({1H:"25",2N:"25",1r:"25"},a,b):6.N(G(){E(6)[E(6).3t(":1P")?"1A":"1z"]()})},9c:G(b,a){I 6.1U({1H:"1A"},b,a)},9b:G(b,a){I 6.1U({1H:"1z"},b,a)},99:G(b,a){I 6.1U({1H:"25"},b,a)},98:G(b,a){I 6.1U({1r:"1A"},b,a)},96:G(b,a){I 6.1U({1r:"1z"},b,a)},95:G(c,a,b){I 6.1U({1r:a},c,b)},1U:G(k,i,h,g){H j=E.6D(i,h,g);I 6[j.3L===P?"N":"3L"](G(){j=E.1k({},j);H f=E(6).3t(":1P"),3y=6;L(H p 1i k){9(k[p]=="1z"&&f||k[p]=="1A"&&!f)I E.1n(j.1l)&&j.1l.16(6);9(p=="1H"||p=="2N"){j.19=E.17(6,"19");j.2U=6.R.2U}}9(j.2U!=S)6.R.2U="1P";j.3M=E.1k({},k);E.N(k,G(c,a){H e=1u E.2j(3y,j,c);9(/25|1A|1z/.14(a))e[a=="25"?f?"1A":"1z":a](k);J{H b=a.3s().1t(/^([+-]=)?([\\d+-.]+)(.*)$/),1O=e.2b(Q)||0;9(b){H d=3I(b[2]),2i=b[3]||"2T";9(2i!="2T"){3y.R[c]=(d||1)+2i;1O=((d||1)/e.2b(Q))*1O;3y.R[c]=1O+2i}9(b[1])d=((b[1]=="-="?-1:1)*d)+1O;e.3N(1O,d,2i)}J e.3N(1O,a,"")}});I Q})},3L:G(a,b){9(E.1n(a)){b=a;a="2j"}9(!a||(1m a=="1M"&&!b))I A(6[0],a);I 6.N(G(){9(b.1c==1B)A(6,a,b);J{A(6,a).1a(b);9(A(6,a).K==1)b.16(6)}})},9f:G(){H a=E.32;I 6.N(G(){L(H i=0;i<a.K;i++)9(a[i].T==6)a.6I(i--,1)}).5n()}});H A=G(b,c,a){9(!b)I;H q=E.M(b,c+"3L");9(!q||a)q=E.M(b,c+"3L",a?E.2h(a):[]);I q};E.1b.5n=G(a){a=a||"2j";I 6.N(G(){H q=A(6,a);q.44();9(q.K)q[0].16(6)})};E.1k({6D:G(b,a,c){H d=b&&b.1c==8Z?b:{1l:c||!c&&a||E.1n(b)&&b,2e:b,3J:c&&a||a&&a.1c!=8Y&&a};d.2e=(d.2e&&d.2e.1c==4W?d.2e:{8X:8W,8V:6N}[d.2e])||8T;d.3r=d.1l;d.1l=G(){E(6).5n();9(E.1n(d.3r))d.3r.16(6)};I d},3J:{6B:G(p,n,b,a){I b+a*p},5q:G(p,n,b,a){I((-38.9s(p*38.8R)/2)+0.5)*a+b}},32:[],2j:G(b,c,a){6.Y=c;6.T=b;6.1e=a;9(!c.3P)c.3P={}}});E.2j.3A={4r:G(){9(6.Y.2F)6.Y.2F.16(6.T,[6.2v,6]);(E.2j.2F[6.1e]||E.2j.2F.6z)(6);9(6.1e=="1H"||6.1e=="2N")6.T.R.19="2Z"},2b:G(a){9(6.T[6.1e]!=S&&6.T.R[6.1e]==S)I 6.T[6.1e];H r=3I(E.3C(6.T,6.1e,a));I r&&r>-8O?r:3I(E.17(6.T,6.1e))||0},3N:G(c,b,e){6.5u=(1u 3D()).3B();6.1O=c;6.2D=b;6.2i=e||6.2i||"2T";6.2v=6.1O;6.4q=6.4i=0;6.4r();H f=6;G t(){I f.2F()}t.T=6.T;E.32.1a(t);9(E.32.K==1){H d=4j(G(){H a=E.32;L(H i=0;i<a.K;i++)9(!a[i]())a.6I(i--,1);9(!a.K)4A(d)},13)}},1A:G(){6.Y.3P[6.1e]=E.1x(6.T.R,6.1e);6.Y.1A=Q;6.3N(0,6.2b());9(6.1e=="2N"||6.1e=="1H")6.T.R[6.1e]="8N";E(6.T).1A()},1z:G(){6.Y.3P[6.1e]=E.1x(6.T.R,6.1e);6.Y.1z=Q;6.3N(6.2b(),0)},2F:G(){H t=(1u 3D()).3B();9(t>6.Y.2e+6.5u){6.2v=6.2D;6.4q=6.4i=1;6.4r();6.Y.3M[6.1e]=Q;H a=Q;L(H i 1i 6.Y.3M)9(6.Y.3M[i]!==Q)a=P;9(a){9(6.Y.19!=S){6.T.R.2U=6.Y.2U;6.T.R.19=6.Y.19;9(E.17(6.T,"19")=="2s")6.T.R.19="2Z"}9(6.Y.1z)6.T.R.19="2s";9(6.Y.1z||6.Y.1A)L(H p 1i 6.Y.3M)E.1x(6.T.R,p,6.Y.3P[p])}9(a&&E.1n(6.Y.1l))6.Y.1l.16(6.T);I P}J{H n=t-6.5u;6.4i=n/6.Y.2e;6.4q=E.3J[6.Y.3J||(E.3J.5q?"5q":"6B")](6.4i,n,0,1,6.Y.2e);6.2v=6.1O+((6.2D-6.1O)*6.4q);6.4r()}I Q}};E.2j.2F={2R:G(a){a.T.2R=a.2v},2B:G(a){a.T.2B=a.2v},1r:G(a){E.1x(a.T.R,"1r",a.2v)},6z:G(a){a.T.R[a.1e]=a.2v+a.2i}};E.1b.6m=G(){H c=0,3E=0,T=6[0],5t;9(T)8L(E.V){H b=E.17(T,"2X")=="4F",1D=T.12,23=T.23,2K=T.3H,4f=1N&&3x(4s)<8J;9(T.6V){5w=T.6V();1f(5w.1S+38.33(2K.2V.2R,2K.1G.2R),5w.3E+38.33(2K.2V.2B,2K.1G.2B));9(1h){H d=E("4o").17("8H");d=(d=="8G"||E.5g&&3x(4s)>=7)&&2||d;1f(-d,-d)}}J{1f(T.5l,T.5z);1W(23){1f(23.5l,23.5z);9(35&&/^t[d|h]$/i.14(1D.37)||!4f)d(23);9(4f&&!b&&E.17(23,"2X")=="4F")b=Q;23=23.23}1W(1D.37&&!/^1G|4o$/i.14(1D.37)){9(!/^8D|1I-9S.*$/i.14(E.17(1D,"19")))1f(-1D.2R,-1D.2B);9(35&&E.17(1D,"2U")!="3R")d(1D);1D=1D.12}9(4f&&b)1f(-2K.1G.5l,-2K.1G.5z)}5t={3E:3E,1S:c}}I 5t;G d(a){1f(E.17(a,"9T"),E.17(a,"8A"))}G 1f(l,t){c+=3x(l)||0;3E+=3x(t)||0}}})();',62,616,'||||||this|||if|||||||||||||||||||||||||||||||||function|var|return|else|length|for|data|each|type|false|true|style|null|elem|document|browser|undefined||options|||nodeName|parentNode||test|jQuery|apply|css|window|display|push|fn|constructor|url|prop|add|indexOf|msie|in|event|extend|complete|typeof|isFunction|className|replace|arguments|opacity|div|match|new|status|firstChild|attr|nodeType|hide|show|Array|success|parent|filter|trigger|body|height|table|script|tbody|cache|string|safari|start|hidden|value|merge|left|break|animate|dataType|while|map|find|global||get|id|offsetParent|select|toggle|selected|toUpperCase|remove|catch|try|cur|al|ready|duration|done|text|makeArray|unit|fx|swap|split|target||pushStack|toLowerCase|nextSibling|button|none|handle|guid|now|stack|tb|jsre|timeout|inArray|scrollTop|readyState|end|delete|step|one|name|nth|slice|doc|ret|preventDefault|width|call|events|checked|scrollLeft|exec|px|overflow|documentElement|grep|position|form|block|removeData|rl|timers|max|opera|mozilla|trim|tagName|Math|load|param|removeChild|disabled|insertBefore|async|encodeURIComponent|append|oldblock|val|childNodes|src|readyList|multiFilter|color|defaultView|stopPropagation|args|old|toString|is|last|first|eval|parseInt|self|domManip|prototype|getTime|curCSS|Date|top||ajax|ownerDocument|parseFloat|easing|has|queue|curAnim|custom|innerHTML|orig|currentStyle|visible|getElementById|isReady|error|static|bind|String|which|getComputedStyle|responseText|oWidth|oHeight|on|shift|json|child|RegExp|ol|lastModified|isXMLDoc|jsonp|jquery|previousSibling|dir|safari2|el|styleFloat|state|setInterval|radio|getElementsByTagName|tr|empty|html|getAttribute|pos|update|version|input|float|runtimeStyle|unshift|mouseover|getPropertyValue|GET|clearInterval|safariTimer|visibility|clean|__ie_init|absolute|handleHover|lastToggle|index|fromElement|relatedTarget|click|fix|evt|andSelf|removeEventListener|handler|cloneNode|addEventListener|triggered|nodeIndex|unique|Number|classFilter|prevObject|selectedIndex|after|submit|password|removeAttribute|file|expr|setTimeout|_|appendChild|ajaxSettings|client|active|win|sibling|deep|globalEval|boxModel|cssFloat|object|checkbox|parsererror|offsetLeft|wrapAll|dequeue|props|lastChild|swing|handleError|getResponseHeader|results|startTime|00|box|Modified|ifModified|offsetTop|evalScript|createElement|setRequestHeader|ctrlKey|callback|metaKey|contentType|ajaxSend|ajaxSuccess|ajaxError|ajaxStop|ajaxStart|serializeArray|init|notmodified|POST|loaded|appendTo|DOMContentLoaded|bindReady|mouseout|not|removeAttr|unbind|unload|Width|keyCode|charCode|onreadystatechange|clientX|pageX|srcElement|join|outerHTML|substr|zoom|parse|textarea|reset|image|odd|even|before|quickClass|quickID|prepend|quickChild|execScript|offset|scroll|processData|uuid|contents|continue|textContent|ajaxComplete|clone|setArray|webkit|nodeValue|fl|_default|100|linear|href|speed|eq|createTextNode|throw|replaceWith|splice|_toggle|xml|colgroup|304|200|alpha|Last|httpData|httpNotModified|httpSuccess|fieldset|beforeSend|getBoundingClientRect|XMLHttpRequest|ActiveXObject|col|br|abbr|pixelLeft|urlencoded|www|application|ajaxSetup|post|getJSON|getScript|elements|serialize|clientWidth|hasClass|scr|clientHeight|write|relative|keyup|keypress|keydown|change|mousemove|mouseup|mousedown|right|dblclick|resize|focus|blur|frames|instanceof|hover|offsetWidth|triggerHandler|ipt|defer|offsetHeight|border|padding|clientY|pageY|Left|Right|toElement|Bottom|Top|cancelBubble|returnValue|detachEvent|attachEvent|substring|line|weight|animated|header|font|enabled|innerText|contains|only|size|gt|lt|uFFFF|u0128|417|inner|Height|toggleClass|removeClass|addClass|replaceAll|noConflict|insertAfter|prependTo|wrap|contentWindow|contentDocument|http|iframe|children|siblings|prevAll|nextAll|wrapInner|prev|Boolean|next|parents|maxLength|maxlength|readOnly|readonly|class|htmlFor|CSS1Compat|compatMode|compatible|borderTopWidth|ie|ra|inline|it|rv|medium|borderWidth|userAgent|522|navigator|with|concat|1px|10000|array|ig|PI|NaN|400|reverse|fast|600|slow|Function|Object|setAttribute|changed|be|can|property|fadeTo|fadeOut|getAttributeNode|fadeIn|slideToggle|method|slideUp|slideDown|action|cssText|stop|responseXML|option|content|300|th|protocol|td|location|send|cap|abort|colg|cos|tfoot|thead|With|leg|Requested|opt|GMT|1970|Jan|01|Thu|area|Since|hr|If|Type|Content|meta|specified|open|link|XMLHTTP|Microsoft|img|onload|row|borderLeftWidth|head|attributes'.split('|'),0,{}));

  

  

// http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js



/*

 * jQuery JavaScript Library v1.3.2

 * http://jquery.com/

 *

 * Copyright (c) 2009 John Resig

 * Dual licensed under the MIT and GPL licenses.

 * http://docs.jquery.com/License

 *

 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)

 * Revision: 6246

 */

(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});

/*

 * Sizzle CSS Selector Engine - v0.9.3

 *  Copyright 2009, The Dojo Foundation

 *  Released under the MIT, BSD, and GPL Licenses.

 *  More information: http://sizzlejs.com/

 */

(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();

  

  

  

  // n.b. - placed in a function and wrapped so that it can be folded away in the text editor

  (function browserCompatibility(){



    // Browser Detection code

    // http://www.javascripter.net/faq/browsern.htm

    var nVer = navigator.appVersion;

    var nAgt = navigator.userAgent;

    var browserName  = navigator.appName;

    var fullVersion  = ''+parseFloat(navigator.appVersion); 

    var majorVersion = parseInt(navigator.appVersion,10);

    var nameOffset,verOffset,ix;



    // In MSIE, the true version is after "MSIE" in userAgent

    if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {

     browserName = "Microsoft Internet Explorer";

     fullVersion = nAgt.substring(verOffset+5);

    }

    // In Opera, the true version is after "Opera" 

    else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {

     browserName = "Opera";

     fullVersion = nAgt.substring(verOffset+6);

    }

    // In Chrome, the true version is after "Chrome" 

    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {

     browserName = "Chrome";

     fullVersion = nAgt.substring(verOffset+7);

    }

    // In Safari, the true version is after "Safari" 

    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {

     browserName = "Safari";

     fullVersion = nAgt.substring(verOffset+7);

    }

    // In Firefox, the true version is after "Firefox" 

    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {

     browserName = "Firefox";

     fullVersion = nAgt.substring(verOffset+8);

    }

    // In most other browsers, "name/version" is at the end of userAgent 

    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) 

    {

     browserName = nAgt.substring(nameOffset,verOffset);

     fullVersion = nAgt.substring(verOffset+1);

     if (browserName.toLowerCase()==browserName.toUpperCase()) {

      browserName = navigator.appName;

     }

    }

    // trim the fullVersion string at semicolon/space if present

    if ((ix=fullVersion.indexOf(";"))!=-1) { fullVersion=fullVersion.substring(0,ix); }

    if ((ix=fullVersion.indexOf(" "))!=-1) { fullVersion=fullVersion.substring(0,ix); }



    majorVersion = parseInt(''+fullVersion,10);

    if (isNaN(majorVersion)) {

     fullVersion  = ''+parseFloat(navigator.appVersion); 

     majorVersion = parseInt(navigator.appVersion,10);

    }





    function toBool(str) {

      if ("false" === str)     { return false; }

      else if ("true" === str) { return true; } 

      else                     { return str; }

    }



    // GM_log()

    if('undefined' == typeof GM_log) {

      if('undefined' !== typeof console) {

      // Greasemonkey-specific API for message logging (level: information)

        console.info('typeof console.info = '+(typeof console.info));

        function GM_log(message) { 

          console.info(message); 

        }

      } 

      else if('undefined' !== typeof opera.postError) {

      // Opera-specific API for message logging (level: information)

        opera.postError('typeof opera.postError = '+(typeof opera.postError));

        function GM_log(message) { 

          opera.postError(message); 

        }

      }

      // else if('undefined' !== typeof Error) {

      // // Generic API for throwing errors (level: error)

      // // NOTE: throw() will halt the execution of the script

        // console.info('typeof Error = '+(typeof Error));

        // function GM_log(message) { 

          // throw new Error(message); 

        // } 

      // }

    }



    // GM_setValue()

    if('undefined' == typeof GM_setValue) {

      function GM_setValue(key,value) { 

        try {

          window.localStorage[key] = value;

        } catch(e) {

          GM_log("Error inside GM_setValue");

          GM_log(e);

        }

        // GM_log("Return from GM_setValue.\n" + key + ":" +  value);

      }

    }



    // GM_getValue()

    if('undefined' == typeof GM_getValue) {

      function GM_getValue(key,value) { 

        // GM_log('Get Item:' + key);

        

        if('undefined' !== typeof window.localStorage) {

          if('undefined' !== window.localStorage[key] ) {

                  // if ("false" === window.localStorage[key]) {

                    // return false; 

                  // } else if ("true" === window.localStorage[key]) {

                    // return true; 

                  // } else {

            return window.localStorage[key]; 

                  // }

          }

          else if('undefined' !== typeof value) 

          { 

            GM_log("GM_getValue: Could not find key:" + key);

            GM_log("GM_getValue: Attempting to set key value to the supplied default. Default = "+value);

            GM_setValue(key,value);

            GM_log("GM_getValue: Returning default value. Default = "+value);

            return value; 

          }

          else

          {

            GM_log("GM_getValue: Unable to retrieve value and no default set.");

            return undefined;

          }

        }

      }

    }



    // GM_registerMenuCommand()

    if('undefined' == typeof GM_registerMenuCommand) {

      function GM_registerMenuCommand() { }

    }



    // GM_addStyle() 

    // taken from actual greasemonkey source

    if('undefined' == typeof GM_addStyle) {

      function GM_addStyle(css) {

        var head = document.getElementsByTagName("head")[0];

        if (head) {

          var style = document.createElement("style");

          style.textContent = css;

          style.type = "text/css";

          head.appendChild(style);

        }

        return style;

      }

    }

  })();





  /* --------------------------------------

  ----------------FUNCTIONS----------------

  -------------------------------------- */



  // CHECKS HOW MANY DAYS BETWEEN (tmp) AND TODAY



  function NumDaysSince(tmp) 

  {

    // console.info(tmp);

    // console.info(typeof tmp);

    

    

    var tmpDate = tmp.split(' ');



    if(tmpDate.length>1) {

      var tt = tmpDate[1].split(":");

    } else {

      var tt = new Array(2); // default to midnight

      tt[0] = "00";

      tt[1] = "00";

    }



    if(tmpDate[0].match("Today") || tmpDate[0].match("Hoje")) {

      var Since = new Date( Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1] );

    } 

    else if(tmpDate[0].match("Yesterday") || tmpDate[0].match("Ontem")) {

      var Since = new Date( Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1] );

    }

    else {

      var Since = new Date(tmpDate[0] + (tmpDate.length>1 ? " " + tmpDate[1] : ""));

    }



    var numDays = Math.floor((Today - Since) / MSPD);

    return numDays;

    

  }



  function manipulatePrefs(pref,defaultValue,type)

  {

  if ( typeof GM_getValue != 'function') { return defaultValue; }



    if ( type == 'set') 

    {

      if ( typeof GM_setValue !== 'function')

      {

        return defaultValue; 

      }

      else

      {

        return GM_setValue(pref,defaultValue); 

      }

    

    }

    else if ( type == 'get') 

    {

      if ( typeof GM_setValue !== 'function') 

      {

        return defaultValue; 

      }

      else 

      {

        if ( GM_listValues().indexOf(pref) >=  0)

        {

          customLogger('manipulatePrefs():\n' + "Pref found:\n'" + pref + "' = " + GM_getValue(pref,defaultValue),8);

          return GM_getValue(pref,defaultValue);

        }

        else

        {

          customLogger('manipulatePrefs():\n' + pref + ' was not found. Set to default value. Default value = ' + defaultValue,8);

          GM_setValue(pref,defaultValue);

          return GM_getValue(pref,defaultValue);

        }

      }

    }

    else

    {

      GM_log('Error: variable "type" not set properly - cannot use "' + type + '" when getting / setting the value for: ' + pref + ' [default value (' + defaultValue + ')'); 

      return defaultValue;

    }

  }







  // cleanData()

  // REMOVES EXTRA STUFF FROM THE TABLE CELLS

  // CREATED AS A FIX TO SOLVE THE COMPATIBILITY ISSUES WITH NEOBUX 2+

  // KWAH - 01062009

  function cleanData(inputString) 

  {

    // GM_log('inputString = '+inputString);

    

    var str = inputString;

    

    str = str.replace('&nbsp;',''); // remove &nbsp; chars

    str = str.replace(/\[.*\]/,''); // remove the [ ] stuff // not needed after the /<font.*<\/font>/ check was added

    str = str.replace(/\(.*\)/,''); // remove the ( ) stuff // nor is this... left behind for completeness though

    str = str.replace(/<font.*<\/font>/,''); // remove the ( ) stuff

    str = str.replace(/^\s+|\s+$/g,''); // remove leading & trailing white space



    // GM_log('str = '+str);

    

    return str;

  }







  // set "today" & "yesterday" dates

  var Today = new Date();

  var Yesterday = new Date()

  Yesterday.setDate(Today.getDate() - 1);



  // Defaults and settings:

  var MSPD = 86400000; // 24hours*60minutes*60seconds*1000microseconds = 1 day = 86400000 MicroSecondsPerDay (MSPD)

  var english = true;

  var directRefs = true;





  // // check whether the table is in English or Portugese

  // if(rows[0].childNodes[1].innerHTML.match('Referido')) { english = false; } // default = true



  // TODO:: Update checks to most recent detection code

  var directRefs = true;

  if(window.location.href.match('ss3=2')) { directRefs = false; } // default = true



  if(directRefs) {

    var col_NAME = 1;

    var col_CAMEFROM = 2;

    var col_SINCE = 3;

    var col_LAST = 4;

    var col_CLICKS = 5;

    var col_AVG = 6;

    var colHeader_AVG = 6;

  } 

  else 

  {

    var col_FLAG = 1;

    var col_NAME = 3;

    var col_SINCE = 4;

    var col_NEXTPAYMENT = 5;

    var col_LAST = 6;

    var col_CLICKS = 7;

    var col_AVG = 8;

    var colHeader_AVG = 6;

  }





  // adds the menu options to enable modification of default values

  // CreateMenuOptions(); 





  var preferences = {

    'highlightReferrals': true,

    // NOTE: RULE CRITERIA ARE *INCLUSIVE* - IE, THE ACTIONS ARE APPLIED IF THE CRITERIA ARE MET

    // THUS IF DEFAULT CRITERIA ARE TOO GENERALISED, ACTIONS FOR RULES WHICH DO NOT EXPLICITLY STATE THE CRITERIA WILL INADVERTENTLY BE APPLIED

    // EG, BY SETTING THE DEFAULT MINIMUM AVG TO 0 (zero) AND MAXIMUM AVG TO Ifinity, ALL RULES WHICH DO NOT HAVE OVERRIDING CRITERIA WILL MATCH

    'rules': {

      'defaults': {

      // Default Criteria should exclude all referrals

        'criteria': {

          // 'Average' Column

          // By default, apply rules to no referrals (ie, those with an average above 0 or below Infinity)

          // Note: see above note re: too generalised defaults

          'avg_min': Infinity,  

          'avg_max': 0, 

          

          // 'Owned Since' Column

          // By default, apply all rules to referrals that have been owned for at least 7 days 

          // Note: see above note re: too generalised defaults

          'age_min': Infinity,  

          'age_max': 0, 

          

          // (total) 'Clicks' Column

          // By default, apply rules to no referrals (ie, those with clicks above 0 or below Infinity)

          // Note: see above note re: too generalised defaults

          'totalClicks_min': Infinity,  

          'totalClicks_max': 0, 

          

          // 'Last Click' Column

          // By default, apply rules to no referrals (ie, those whose last click was after less than 0 days into the past or earlier than an infinite number of days ago)

          // Note: see above note re: too generalised defaults

          'lastClick_min': Infinity,  

          'lastClick_max': 0, 

        },

        'action': {

          // By default, do no action

          // OPTIONS::

          // 'color': (string) '(css-friendly) color or color code to highlight referral in'

          // 'hide': (boolean) true/false whether to hide referral

          // TODO:: think about whether to change to allow / replace with css strings that affect the row/cells? (nb, bgcolor is applied to cells to bypass changes caused by the mouseover events but entire row is hidden)

        }

      },

      'specific': [

      // Specific, user-set rules

      {

        // Hide referrals that are younger than 7 days old

        'criteria': {

          'age_max': 7,

        },

        'action': {

          'hide': true

        }

      },

      {

        // Highlight refs #FF9900 (orange) if referral has average below 1.2

        'criteria': {

          'avg_max': 1.2,

        },

        'action': {

          'color': '#FF9900'

        }

      },

      {

        // Highlight refs #EE1133 (deeper red) if referral has average below 0.8

        'criteria': {

          'avg_max': 0.8,

        },

        'action': {

          // 'color': '#EE1133'

          'color': '#EE5577'

        }

      },

      {

        // Highlight refs #3399FF (Blue) if referral has average above 2.5

        'criteria': {

          'avg_min': 2.5,

        },

        'action': {

          'color': '#3399FF'

        }

      },

      {

        // Highlight refs #FF99FF (Purple) if it has been >= 7 days days since the referral's last click

        'criteria': {

          'lastClick_min': 7,

        },

        'action': {

          'color': '#CC88CC'

        }

      },

      {

        // Highlight refs #FF99FF (Purple) if the referral's last click was >= 7 days ago

        'criteria': {

          'lastClick_min': 7,

        },

        'action': {

          'color': '#FF99FF'

        }

      },

      {

        // Highlight refs #FF99CC (Light Pink) if the referral is due to be renewed within the next 14 days

        'criteria': {

          'lastClick_min': 7,

        },

        'action': {

          'color': '#FF99FF'

        }

      },

      {

        // Highlight refs #FF3399 (Bright Pink) if the referral is due to be renewed within the next 5 days

        'criteria': {

          'lastClick_min': 7,

        },

        'action': {

          'color': '#FF99FF'

        }

      },

      {

        // Highlight refs #FF99FF (Purple) if referral is >= 4 days days old and has clicked zero ads

        'criteria': {

          'lastClick_min': 4,

          'totalClicks_max': 0,

        },

        'action': {

          'color': '#FF99FF',

          'hide': false

        }

      }]

    }

  };



  // console.info(preferences);





  function getRawReferralDataFromMTX() {

      // Fetch the script that contains referral listing data

    var xpathMtx = "//script[contains(.,'mtx=')]";

    var xpathResults_mtx = document.evaluate(xpathMtx,

      document,

      null,

      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,

      null ).snapshotItem(0);

      

    // Fetch the useful part of the script and replace the ';' that got removed by split()

    var mtxCode = xpathResults_mtx.innerHTML.split(';')[0] + ';';

    

    // Run the code in mtxCode (var mtx=[...];)

    return mtxCode;

  }



  eval(getRawReferralDataFromMTX());



  console.info(mtx);





  // $('tr[onmouseout]').each(function(i,currentReferral) {

  // });

  

  $('tr[onmouseout]').each(function(i,currentReferral) {

    

    // console.info('Referral #'+(1+i));

    // console.group();

    

    var col_Flag = currentReferral.children[col_FLAG];

    var col_Name = currentReferral.children[col_NAME];

    var col_OwnedSince = currentReferral.children[col_SINCE];

    var col_LastClick = currentReferral.children[col_LAST];

    var col_TotalClicks = currentReferral.children[col_CLICKS];

    var col_OverallAvg = currentReferral.children[col_AVG];

    

    

    // Returns the *whole* number of days that the referral has been owned

    var ref_age = NumDaysSince(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\ [0-9]{2}\:[0-9]{2}|[a-zA-Z]+\ [0-9]{2}\:[0-9]{2}/.exec(cleanData(currentReferral.children[col_SINCE].innerHTML)).toString());

    // console.info('ref_age = ' + ref_age);

    // console.info('typeof ref_age = ' + typeof ref_age);

    

    // Returns the *whole* number of days since the referral's last click

    var ref_daysSinceLastClick = NumDaysSince(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}|[a-zA-Z\ ]+/.exec(cleanData(currentReferral.children[col_LAST].innerHTML)).toString());

    // console.info('ref_daysSinceLastClick = ' + ref_daysSinceLastClick);

    // console.info('typeof ref_daysSinceLastClick = ' + typeof ref_daysSinceLastClick);

    

    var ref_OverallAvg = (/[0-9]+\.[0-9]+/.exec(col_OverallAvg.textContent));

    // console.info(ref_OverallAvg);

    

    

    // Start dealing with the referral from a 'blank slate' with all referrals showing / with no custom highlighting

    // note: used when testing with firebug

    currentReferral.style.display = '';

    for(var y = 0; y < currentReferral.childNodes.length; y++) {

      currentReferral.childNodes[y].style.background = ''; // inactives = purple

    }

    

    

    // Process the specific (custom) rules defined in the user preferences

    $(preferences.rules.specific).each(function(x,currentRule) {

      // console.info(currentRule.criteria);

      // console.info('Rule #'+(1+x));

      

      var rules_minAvg = (currentRule.criteria.avg_min) ? currentRule.criteria.avg_min : preferences.rules.defaults.criteria.avg_min;

      var rules_maxAvg = (currentRule.criteria.avg_max) ? currentRule.criteria.avg_max : preferences.rules.defaults.criteria.avg_max;

      

      var rules_minAge = (currentRule.criteria.age_min) ? currentRule.criteria.age_min : preferences.rules.defaults.criteria.age_min;

      var rules_maxAge = (currentRule.criteria.age_max) ? currentRule.criteria.age_max : preferences.rules.defaults.criteria.age_max;

      

      var rules_minTotalClicks = (currentRule.criteria.totalClicks_min) ? currentRule.criteria.totalClicks_min : preferences.rules.defaults.criteria.totalClicks_min;

      var rules_maxTotalClicks = (currentRule.criteria.totalClicks_max) ? currentRule.criteria.totalClicks_max : preferences.rules.defaults.criteria.totalClicks_max;

      

      var rules_minLastClickTime = (currentRule.criteria.lastClick_min) ? currentRule.criteria.lastClick_min : preferences.rules.defaults.criteria.lastClick_min;

      var rules_maxLastClickTime = (currentRule.criteria.lastClick_max) ? currentRule.criteria.lastClick_max : preferences.rules.defaults.criteria.lastClick_max;

      

      

      if(ref_OverallAvg < rules_maxAvg) 

      {

        // console.info(ref_OverallAvg + ' < ' + rules_maxAvg);

        // console.info('currentRule.action.hide = ' + (currentRule.action.hide) + ' / ' + (typeof currentRule.action.hide));

        // console.info('currentRule.action.color = ' + (currentRule.action.color) + ' / ' + (typeof currentRule.action.color));

        

        if(true === currentRule.action.hide) {

          currentReferral.style.display = 'none';

        } else if(false === currentRule.action.hide) {

          currentReferral.style.display = '';

        }

        

        if('undefined' !== typeof currentRule.action.color)

        {

          for(var y = 0; y < currentReferral.childNodes.length; y++) {

            currentReferral.childNodes[y].style.background = currentRule.action.color;

          }

        }

      }

      

      if(ref_OverallAvg > rules_minAvg) 

      {

        // console.info(ref_OverallAvg + ' > ' + rules_minAvg);

        // console.info('currentRule.action.hide = ' + (currentRule.action.hide) + ' / ' + (typeof currentRule.action.hide));

        // console.info('currentRule.action.color = ' + (currentRule.action.color) + ' / ' + (typeof currentRule.action.color));

        

        if(true === currentRule.action.hide) {

          currentReferral.style.display = 'none';

        } else if(false === currentRule.action.hide) {

          currentReferral.style.display = '';

        }

        

        if('undefined' !== typeof currentRule.action.color)

        {

          for(var y = 0; y < currentReferral.childNodes.length; y++) {

            currentReferral.childNodes[y].style.background = currentRule.action.color;

          }

        }

      }

      

      if(ref_age < rules_maxAge) 

      {

        // console.info(ref_age + ' < ' + rules_maxAge);

        // console.info('currentRule.action.hide = ' + (currentRule.action.hide) + ' / ' + (typeof currentRule.action.hide));

        // console.info('currentRule.action.color = ' + (currentRule.action.color) + ' / ' + (typeof currentRule.action.color));

        

        if(true === currentRule.action.hide) {

          currentReferral.style.display = 'none';

        } else if(false === currentRule.action.hide) {

          currentReferral.style.display = '';

        }

        

        if('undefined' !== typeof currentRule.action.color)

        {

          for(var y = 0; y < currentReferral.childNodes.length; y++) {

            currentReferral.childNodes[y].style.background = currentRule.action.color;

          }

        }

      }

      

      if(ref_age > rules_minAge) 

      {

        // console.info(ref_age + ' > ' + rules_minAge);

        // console.info('currentRule.action.hide = ' + (currentRule.action.hide) + ' / ' + (typeof currentRule.action.hide));

        // console.info('currentRule.action.color = ' + (currentRule.action.color) + ' / ' + (typeof currentRule.action.color));

        

        if(true === currentRule.action.hide) {

          currentReferral.style.display = 'none';

        } else if(false === currentRule.action.hide) {

          currentReferral.style.display = '';

        }

        

        if('undefined' !== typeof currentRule.action.color)

        {

          for(var y = 0; y < currentReferral.childNodes.length; y++) {

            currentReferral.childNodes[y].style.background = currentRule.action.color;

          }

        }

      }

      

      if(ref_daysSinceLastClick < rules_maxLastClickTime) 

      {

        // console.info(ref_daysSinceLastClick + ' < ' + rules_maxLastClickTime);

        // console.info('currentRule.action.hide = ' + (currentRule.action.hide) + ' / ' + (typeof currentRule.action.hide));

        // console.info('currentRule.action.color = ' + (currentRule.action.color) + ' / ' + (typeof currentRule.action.color));

        

        if(true === currentRule.action.hide) {

          currentReferral.style.display = 'none';

        } else if(false === currentRule.action.hide) {

          currentReferral.style.display = '';

        }

        

        if('undefined' !== typeof currentRule.action.color)

        {

          for(var y = 0; y < currentReferral.childNodes.length; y++) {

            currentReferral.childNodes[y].style.background = currentRule.action.color;

          }

        }

      }

      

      if(ref_daysSinceLastClick > rules_minLastClickTime) 

      {

        // console.info(ref_daysSinceLastClick + ' > ' + rules_minLastClickTime);

        // console.info('currentRule.action.hide = ' + (currentRule.action.hide) + ' / ' + (typeof currentRule.action.hide));

        // console.info('currentRule.action.color = ' + (currentRule.action.color) + ' / ' + (typeof currentRule.action.color));

        

        if(true === currentRule.action.hide) {

          currentReferral.style.display = 'none';

        } else if(false === currentRule.action.hide) {

          currentReferral.style.display = '';

        }

        

        if('undefined' !== typeof currentRule.action.color)

        {

          for(var y = 0; y < currentReferral.childNodes.length; y++) {

            currentReferral.childNodes[y].style.background = currentRule.action.color;

          }

        }

      }

      

      //console.info(this);

    });



    

    // console.groupEnd();

    

  });





})();