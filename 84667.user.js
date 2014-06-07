scr_meta=<><![CDATA[
// ==UserScript== 

// @name            Neobux IT (tecnotronika)
// @namespace  http://userscripts.org/scripts/show/84667
// @homepage    http://userscripts.org/scripts/show/84667

// @description   This script provides detailed statistics for your Neobux account and referrals (eg: ages of referrals, recent income/outcome averages, plus more!)

// @include         http://www.neobux.com/?u=c&s*
// @include         https://www.neobux.com/?u=c&s*
// @include         http://www.neobux.com/?u=c
// @include         https://www.neobux.com/?u=c
// @exclude        http://www.neobux.com/?u=c&s=rba
// @exclude        https://www.neobux.com/?u=c&s=rba

////version = major.minor.date.time //date.time = yymmdd.hhmm (GMT)
// @version         3.3.100823.1855
// @updateNote  3.2 = Currently in the experimental development stage, adding support for chrome; 100228.1431 = CHROME-BUGFIX: Finally got storage/editing values working - boolean true/false values are stored as a string, causing later boolean comparisons to fail because the string "false" !== boolean false for example;

////started keeping a changelog of the history in the file ~24/Dec/2009
// @history        3.1.100216.1800 = MISC: Removed previous history as this is a currently the first version of the dev script (blank slate);
// @history        3.1.100216.1807 = COMPATIBILITY: Attempts to improve non-greasemonkey compatibility: Rearranged code order to define functions before they are called; checks are made at the start of the script for (most) greasemonkey API functions and if not found alternatives are provided;
// @history        3.1.100217.0128 = COMPATIBILITY: Research into Chrome/Opera has given me an idea of what is/is not possible using those browsers - have started to attempt to add Chrome support using browser detection and HTML5 storage to replace GM_get/setValue;
// @history        3.1.100217.0229 = MISC COMPATIBILITY: A bunch of changes here and there but cannot remember exactly what they were.. script is working in Firefox;
// @history        3.1.100217.1233 = LANG: Added check for '[Membro' (from '[Membro Normal') for those who use the Portuguese language on Neobux;
// @history        3.1.100217.1721 = PARTIAL-BUGFIX: Autopay costs are not entirely correct - fixed the standard & golden costs to match the help pages but other member types not corrected (nor are they yet confirmed to be correct);
// @history        3.1.100217.1721 = COMPATIBILITY: Removed updater code;
// @history        3.2.100217.1748 = CHROME-BUG: Replaced instances of CDATA ;
// @history        3.2.100217.1749 = CHROME-BUG: Altered formatting of export tabs so that they show correctly above the graphs;
// @history        3.2.100217.1750 = CHROME-BUG: Storage of settings is not working correctly, thus causing the 'initial load' welcome popups to show on *EVERY* page;
// @history        3.2.100218.0321 = CHROME-BUG: *FINALLY* managed to get the script to work almost fully functionally - I'm not very confident about the storage of the preferences (I'm experiencing a few odd issues there) and the appearance of the referral listings pages is messed up;
// @history        3.2.100228.0123 = CORRECTION: Autopay costs for all member types updated; Check for pioneer membership type removed from autopay function;
// @history        3.2.100228.0241 = CHROME-BUGFIX: Strange bug where characters were being appended in the wrong order, eg [ days0] instead of [0 days] - corrected by using ""timeElapsed  +="" repeatedly for each variable;
// @history        3.2.100228.1431 = CHROME-BUGFIX: Finally got storage/editing values working - boolean true/false values are stored as a string, causing later boolean comparisons to fail because the string "false" !== boolean false for example;

// @license        WTFPL v2 - Do What You Want To Public License v2; http://sam.zoy.org/wtfpl/
// @licenseSummary "Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed **as long as the name is changed** [emphasis mine]". 

// ==/UserScript== 
]]></>.toString();

// Excluded requires
// @require    http://userscripts.org/scripts/source/62718.user.js
// Minified jQuery included in the script to improve browser compatibility
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// GM_log('Neobux 2+ (v3.1)');

// jQuery
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(G(){9(1m E!="W")H w=E;H E=18.15=G(a,b){I 6 7u E?6.5N(a,b):1u E(a,b)};9(1m $!="W")H D=$;18.$=E;H u=/^[^<]*(<(.|\\s)+>)[^>]*$|^#(\\w+)$/;E.1b=E.3A={5N:G(c,a){c=c||U;9(1m c=="1M"){H m=u.2S(c);9(m&&(m[1]||!a)){9(m[1])c=E.4D([m[1]],a);J{H b=U.3S(m[3]);9(b)9(b.22!=m[3])I E().1Y(c);J{6[0]=b;6.K=1;I 6}J c=[]}}J I 1u E(a).1Y(c)}J 9(E.1n(c))I 1u E(U)[E.1b.2d?"2d":"39"](c);I 6.6v(c.1c==1B&&c||(c.4c||c.K&&c!=18&&!c.1y&&c[0]!=W&&c[0].1y)&&E.2h(c)||[c])},4c:"1.2.1",7Y:G(){I 6.K},K:0,21:G(a){I a==W?E.2h(6):6[a]},2o:G(a){H b=E(a);b.4Y=6;I b},6v:G(a){6.K=0;1B.3A.1a.16(6,a);I 6},N:G(a,b){I E.N(6,a,b)},4I:G(a){H b=-1;6.N(G(i){9(6==a)b=i});I b},1x:G(f,d,e){H c=f;9(f.1c==3X)9(d==W)I 6.K&&E[e||"1x"](6[0],f)||W;J{c={};c[f]=d}I 6.N(G(a){L(H b 1i c)E.1x(e?6.R:6,b,E.1e(6,c[b],e,a,b))})},17:G(b,a){I 6.1x(b,a,"3C")},2g:G(e){9(1m e!="5i"&&e!=S)I 6.4n().3g(U.6F(e));H t="";E.N(e||6,G(){E.N(6.3j,G(){9(6.1y!=8)t+=6.1y!=1?6.6x:E.1b.2g([6])})});I t},5m:G(b){9(6[0])E(b,6[0].3H).6u().3d(6[0]).1X(G(){H a=6;1W(a.1w)a=a.1w;I a}).3g(6);I 6},8m:G(a){I 6.N(G(){E(6).6q().5m(a)})},8d:G(a){I 6.N(G(){E(6).5m(a)})},3g:G(){I 6.3z(1q,Q,1,G(a){6.58(a)})},6j:G(){I 6.3z(1q,Q,-1,G(a){6.3d(a,6.1w)})},6g:G(){I 6.3z(1q,P,1,G(a){6.12.3d(a,6)})},50:G(){I 6.3z(1q,P,-1,G(a){6.12.3d(a,6.2q)})},2D:G(){I 6.4Y||E([])},1Y:G(t){H b=E.1X(6,G(a){I E.1Y(t,a)});I 6.2o(/[^+>] [^+>]/.14(t)||t.1g("..")>-1?E.4V(b):b)},6u:G(e){H f=6.1X(G(){I 6.67?E(6.67)[0]:6.4R(Q)});H d=f.1Y("*").4O().N(G(){9(6[F]!=W)6[F]=S});9(e===Q)6.1Y("*").4O().N(G(i){H c=E.M(6,"2P");L(H a 1i c)L(H b 1i c[a])E.1j.1f(d[i],a,c[a][b],c[a][b].M)});I f},1E:G(t){I 6.2o(E.1n(t)&&E.2W(6,G(b,a){I t.16(b,[a])})||E.3m(t,6))},5V:G(t){I 6.2o(t.1c==3X&&E.3m(t,6,Q)||E.2W(6,G(a){I(t.1c==1B||t.4c)?E.2A(a,t)<0:a!=t}))},1f:G(t){I 6.2o(E.1R(6.21(),t.1c==3X?E(t).21():t.K!=W&&(!t.11||E.11(t,"2Y"))?t:[t]))},3t:G(a){I a?E.3m(a,6).K>0:P},7c:G(a){I 6.3t("."+a)},3i:G(b){9(b==W){9(6.K){H c=6[0];9(E.11(c,"24")){H e=c.4Z,a=[],Y=c.Y,2G=c.O=="24-2G";9(e<0)I S;L(H i=2G?e:0,33=2G?e+1:Y.K;i<33;i++){H d=Y[i];9(d.26){H b=E.V.1h&&!d.9V["1Q"].9L?d.2g:d.1Q;9(2G)I b;a.1a(b)}}I a}J I 6[0].1Q.1p(/\\r/g,"")}}J I 6.N(G(){9(b.1c==1B&&/4k|5j/.14(6.O))6.2Q=(E.2A(6.1Q,b)>=0||E.2A(6.2H,b)>=0);J 9(E.11(6,"24")){H a=b.1c==1B?b:[b];E("9h",6).N(G(){6.26=(E.2A(6.1Q,a)>=0||E.2A(6.2g,a)>=0)});9(!a.K)6.4Z=-1}J 6.1Q=b})},4o:G(a){I a==W?(6.K?6[0].3O:S):6.4n().3g(a)},6H:G(a){I 6.50(a).28()},6E:G(i){I 6.2J(i,i+1)},2J:G(){I 6.2o(1B.3A.2J.16(6,1q))},1X:G(b){I 6.2o(E.1X(6,G(a,i){I b.2O(a,i,a)}))},4O:G(){I 6.1f(6.4Y)},3z:G(f,d,g,e){H c=6.K>1,a;I 6.N(G(){9(!a){a=E.4D(f,6.3H);9(g<0)a.8U()}H b=6;9(d&&E.11(6,"1I")&&E.11(a[0],"4m"))b=6.4l("1K")[0]||6.58(U.5B("1K"));E.N(a,G(){H a=c?6.4R(Q):6;9(!5A(0,a))e.2O(b,a)})})}};G 5A(i,b){H a=E.11(b,"1J");9(a){9(b.3k)E.3G({1d:b.3k,3e:P,1V:"1J"});J E.5f(b.2g||b.6s||b.3O||"");9(b.12)b.12.3b(b)}J 9(b.1y==1)E("1J",b).N(5A);I a}E.1k=E.1b.1k=G(){H c=1q[0]||{},a=1,2c=1q.K,5e=P;9(c.1c==8o){5e=c;c=1q[1]||{}}9(2c==1){c=6;a=0}H b;L(;a<2c;a++)9((b=1q[a])!=S)L(H i 1i b){9(c==b[i])6r;9(5e&&1m b[i]==\'5i\'&&c[i])E.1k(c[i],b[i]);J 9(b[i]!=W)c[i]=b[i]}I c};H F="15"+(1u 3D()).3B(),6p=0,5c={};E.1k({8a:G(a){18.$=D;9(a)18.15=w;I E},1n:G(a){I!!a&&1m a!="1M"&&!a.11&&a.1c!=1B&&/G/i.14(a+"")},4a:G(a){I a.2V&&!a.1G||a.37&&a.3H&&!a.3H.1G},5f:G(a){a=E.36(a);9(a){9(18.6l)18.6l(a);J 9(E.V.1N)18.56(a,0);J 3w.2O(18,a)}},11:G(b,a){I b.11&&b.11.27()==a.27()},1L:{},M:G(c,d,b){c=c==18?5c:c;H a=c[F];9(!a)a=c[F]=++6p;9(d&&!E.1L[a])E.1L[a]={};9(b!=W)E.1L[a][d]=b;I d?E.1L[a][d]:a},30:G(c,b){c=c==18?5c:c;H a=c[F];9(b){9(E.1L[a]){2E E.1L[a][b];b="";L(b 1i E.1L[a])1T;9(!b)E.30(c)}}J{2a{2E c[F]}29(e){9(c.53)c.53(F)}2E E.1L[a]}},N:G(a,b,c){9(c){9(a.K==W)L(H i 1i a)b.16(a[i],c);J L(H i=0,48=a.K;i<48;i++)9(b.16(a[i],c)===P)1T}J{9(a.K==W)L(H i 1i a)b.2O(a[i],i,a[i]);J L(H i=0,48=a.K,3i=a[0];i<48&&b.2O(3i,i,3i)!==P;3i=a[++i]){}}I a},1e:G(c,b,d,e,a){9(E.1n(b))b=b.2O(c,[e]);H f=/z-?4I|7T-?7Q|1r|69|7P-?1H/i;I b&&b.1c==4W&&d=="3C"&&!f.14(a)?b+"2T":b},1o:{1f:G(b,c){E.N((c||"").2l(/\\s+/),G(i,a){9(!E.1o.3K(b.1o,a))b.1o+=(b.1o?" ":"")+a})},28:G(b,c){b.1o=c!=W?E.2W(b.1o.2l(/\\s+/),G(a){I!E.1o.3K(c,a)}).66(" "):""},3K:G(t,c){I E.2A(c,(t.1o||t).3s().2l(/\\s+/))>-1}},2k:G(e,o,f){L(H i 1i o){e.R["3r"+i]=e.R[i];e.R[i]=o[i]}f.16(e,[]);L(H i 1i o)e.R[i]=e.R["3r"+i]},17:G(e,p){9(p=="1H"||p=="2N"){H b={},42,41,d=["7J","7I","7G","7F"];E.N(d,G(){b["7C"+6]=0;b["7B"+6+"5Z"]=0});E.2k(e,b,G(){9(E(e).3t(\':3R\')){42=e.7A;41=e.7w}J{e=E(e.4R(Q)).1Y(":4k").5W("2Q").2D().17({4C:"1P",2X:"4F",19:"2Z",7o:"0",1S:"0"}).5R(e.12)[0];H a=E.17(e.12,"2X")||"3V";9(a=="3V")e.12.R.2X="7g";42=e.7e;41=e.7b;9(a=="3V")e.12.R.2X="3V";e.12.3b(e)}});I p=="1H"?42:41}I E.3C(e,p)},3C:G(h,j,i){H g,2w=[],2k=[];G 3n(a){9(!E.V.1N)I P;H b=U.3o.3Z(a,S);I!b||b.4y("3n")==""}9(j=="1r"&&E.V.1h){g=E.1x(h.R,"1r");I g==""?"1":g}9(j.1t(/4u/i))j=y;9(!i&&h.R[j])g=h.R[j];J 9(U.3o&&U.3o.3Z){9(j.1t(/4u/i))j="4u";j=j.1p(/([A-Z])/g,"-$1").2p();H d=U.3o.3Z(h,S);9(d&&!3n(h))g=d.4y(j);J{L(H a=h;a&&3n(a);a=a.12)2w.4w(a);L(a=0;a<2w.K;a++)9(3n(2w[a])){2k[a]=2w[a].R.19;2w[a].R.19="2Z"}g=j=="19"&&2k[2w.K-1]!=S?"2s":U.3o.3Z(h,S).4y(j)||"";L(a=0;a<2k.K;a++)9(2k[a]!=S)2w[a].R.19=2k[a]}9(j=="1r"&&g=="")g="1"}J 9(h.3Q){H f=j.1p(/\\-(\\w)/g,G(m,c){I c.27()});g=h.3Q[j]||h.3Q[f];9(!/^\\d+(2T)?$/i.14(g)&&/^\\d/.14(g)){H k=h.R.1S;H e=h.4v.1S;h.4v.1S=h.3Q.1S;h.R.1S=g||0;g=h.R.71+"2T";h.R.1S=k;h.4v.1S=e}}I g},4D:G(a,e){H r=[];e=e||U;E.N(a,G(i,d){9(!d)I;9(d.1c==4W)d=d.3s();9(1m d=="1M"){d=d.1p(/(<(\\w+)[^>]*?)\\/>/g,G(m,a,b){I b.1t(/^(70|6Z|6Y|9Q|4t|9N|9K|3a|9G|9E)$/i)?m:a+"></"+b+">"});H s=E.36(d).2p(),1s=e.5B("1s"),2x=[];H c=!s.1g("<9y")&&[1,"<24>","</24>"]||!s.1g("<9w")&&[1,"<6T>","</6T>"]||s.1t(/^<(9u|1K|9t|9r|9p)/)&&[1,"<1I>","</1I>"]||!s.1g("<4m")&&[2,"<1I><1K>","</1K></1I>"]||(!s.1g("<9m")||!s.1g("<9k"))&&[3,"<1I><1K><4m>","</4m></1K></1I>"]||!s.1g("<6Y")&&[2,"<1I><1K></1K><6L>","</6L></1I>"]||E.V.1h&&[1,"1s<1s>","</1s>"]||[0,"",""];1s.3O=c[1]+d+c[2];1W(c[0]--)1s=1s.5p;9(E.V.1h){9(!s.1g("<1I")&&s.1g("<1K")<0)2x=1s.1w&&1s.1w.3j;J 9(c[1]=="<1I>"&&s.1g("<1K")<0)2x=1s.3j;L(H n=2x.K-1;n>=0;--n)9(E.11(2x[n],"1K")&&!2x[n].3j.K)2x[n].12.3b(2x[n]);9(/^\\s/.14(d))1s.3d(e.6F(d.1t(/^\\s*/)[0]),1s.1w)}d=E.2h(1s.3j)}9(0===d.K&&(!E.11(d,"2Y")&&!E.11(d,"24")))I;9(d[0]==W||E.11(d,"2Y")||d.Y)r.1a(d);J r=E.1R(r,d)});I r},1x:G(c,d,a){H e=E.4a(c)?{}:E.5o;9(d=="26"&&E.V.1N)c.12.4Z;9(e[d]){9(a!=W)c[e[d]]=a;I c[e[d]]}J 9(E.V.1h&&d=="R")I E.1x(c.R,"9e",a);J 9(a==W&&E.V.1h&&E.11(c,"2Y")&&(d=="9d"||d=="9a"))I c.97(d).6x;J 9(c.37){9(a!=W){9(d=="O"&&E.11(c,"4t")&&c.12)6G"O 94 93\'t 92 91";c.90(d,a)}9(E.V.1h&&/6C|3k/.14(d)&&!E.4a(c))I c.4p(d,2);I c.4p(d)}J{9(d=="1r"&&E.V.1h){9(a!=W){c.69=1;c.1E=(c.1E||"").1p(/6O\\([^)]*\\)/,"")+(3I(a).3s()=="8S"?"":"6O(1r="+a*6A+")")}I c.1E?(3I(c.1E.1t(/1r=([^)]*)/)[1])/6A).3s():""}d=d.1p(/-([a-z])/8Q,G(z,b){I b.27()});9(a!=W)c[d]=a;I c[d]}},36:G(t){I(t||"").1p(/^\\s+|\\s+$/g,"")},2h:G(a){H r=[];9(1m a!="8P")L(H i=0,2c=a.K;i<2c;i++)r.1a(a[i]);J r=a.2J(0);I r},2A:G(b,a){L(H i=0,2c=a.K;i<2c;i++)9(a[i]==b)I i;I-1},1R:G(a,b){9(E.V.1h){L(H i=0;b[i];i++)9(b[i].1y!=8)a.1a(b[i])}J L(H i=0;b[i];i++)a.1a(b[i]);I a},4V:G(b){H r=[],2f={};2a{L(H i=0,6y=b.K;i<6y;i++){H a=E.M(b[i]);9(!2f[a]){2f[a]=Q;r.1a(b[i])}}}29(e){r=b}I r},2W:G(b,a,c){9(1m a=="1M")a=3w("P||G(a,i){I "+a+"}");H d=[];L(H i=0,4g=b.K;i<4g;i++)9(!c&&a(b[i],i)||c&&!a(b[i],i))d.1a(b[i]);I d},1X:G(c,b){9(1m b=="1M")b=3w("P||G(a){I "+b+"}");H d=[];L(H i=0,4g=c.K;i<4g;i++){H a=b(c[i],i);9(a!==S&&a!=W){9(a.1c!=1B)a=[a];d=d.8M(a)}}I d}});H v=8K.8I.2p();E.V={4s:(v.1t(/.+(?:8F|8E|8C|8B)[\\/: ]([\\d.]+)/)||[])[1],1N:/6w/.14(v),34:/34/.14(v),1h:/1h/.14(v)&&!/34/.14(v),35:/35/.14(v)&&!/(8z|6w)/.14(v)};H y=E.V.1h?"4h":"5h";E.1k({5g:!E.V.1h||U.8y=="8x",4h:E.V.1h?"4h":"5h",5o:{"L":"8w","8v":"1o","4u":y,5h:y,4h:y,3O:"3O",1o:"1o",1Q:"1Q",3c:"3c",2Q:"2Q",8u:"8t",26:"26",8s:"8r"}});E.N({1D:"a.12",8q:"15.4e(a,\'12\')",8p:"15.2I(a,2,\'2q\')",8n:"15.2I(a,2,\'4d\')",8l:"15.4e(a,\'2q\')",8k:"15.4e(a,\'4d\')",8j:"15.5d(a.12.1w,a)",8i:"15.5d(a.1w)",6q:"15.11(a,\'8h\')?a.8f||a.8e.U:15.2h(a.3j)"},G(i,n){E.1b[i]=G(a){H b=E.1X(6,n);9(a&&1m a=="1M")b=E.3m(a,b);I 6.2o(E.4V(b))}});E.N({5R:"3g",8c:"6j",3d:"6g",8b:"50",89:"6H"},G(i,n){E.1b[i]=G(){H a=1q;I 6.N(G(){L(H j=0,2c=a.K;j<2c;j++)E(a[j])[n](6)})}});E.N({5W:G(a){E.1x(6,a,"");6.53(a)},88:G(c){E.1o.1f(6,c)},87:G(c){E.1o.28(6,c)},86:G(c){E.1o[E.1o.3K(6,c)?"28":"1f"](6,c)},28:G(a){9(!a||E.1E(a,[6]).r.K){E.30(6);6.12.3b(6)}},4n:G(){E("*",6).N(G(){E.30(6)});1W(6.1w)6.3b(6.1w)}},G(i,n){E.1b[i]=G(){I 6.N(n,1q)}});E.N(["85","5Z"],G(i,a){H n=a.2p();E.1b[n]=G(h){I 6[0]==18?E.V.1N&&3y["84"+a]||E.5g&&38.33(U.2V["5a"+a],U.1G["5a"+a])||U.1G["5a"+a]:6[0]==U?38.33(U.1G["6n"+a],U.1G["6m"+a]):h==W?(6.K?E.17(6[0],n):S):6.17(n,h.1c==3X?h:h+"2T")}});H C=E.V.1N&&3x(E.V.4s)<83?"(?:[\\\\w*57-]|\\\\\\\\.)":"(?:[\\\\w\\82-\\81*57-]|\\\\\\\\.)",6k=1u 47("^>\\\\s*("+C+"+)"),6i=1u 47("^("+C+"+)(#)("+C+"+)"),6h=1u 47("^([#.]?)("+C+"*)");E.1k({55:{"":"m[2]==\'*\'||15.11(a,m[2])","#":"a.4p(\'22\')==m[2]",":":{80:"i<m[3]-0",7Z:"i>m[3]-0",2I:"m[3]-0==i",6E:"m[3]-0==i",3v:"i==0",3u:"i==r.K-1",6f:"i%2==0",6e:"i%2","3v-46":"a.12.4l(\'*\')[0]==a","3u-46":"15.2I(a.12.5p,1,\'4d\')==a","7X-46":"!15.2I(a.12.5p,2,\'4d\')",1D:"a.1w",4n:"!a.1w",7W:"(a.6s||a.7V||15(a).2g()||\'\').1g(m[3])>=0",3R:\'"1P"!=a.O&&15.17(a,"19")!="2s"&&15.17(a,"4C")!="1P"\',1P:\'"1P"==a.O||15.17(a,"19")=="2s"||15.17(a,"4C")=="1P"\',7U:"!a.3c",3c:"a.3c",2Q:"a.2Q",26:"a.26||15.1x(a,\'26\')",2g:"\'2g\'==a.O",4k:"\'4k\'==a.O",5j:"\'5j\'==a.O",54:"\'54\'==a.O",52:"\'52\'==a.O",51:"\'51\'==a.O",6d:"\'6d\'==a.O",6c:"\'6c\'==a.O",2r:\'"2r"==a.O||15.11(a,"2r")\',4t:"/4t|24|6b|2r/i.14(a.11)",3K:"15.1Y(m[3],a).K",7S:"/h\\\\d/i.14(a.11)",7R:"15.2W(15.32,G(1b){I a==1b.T;}).K"}},6a:[/^(\\[) *@?([\\w-]+) *([!*$^~=]*) *(\'?"?)(.*?)\\4 *\\]/,/^(:)([\\w-]+)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/,1u 47("^([:.#]*)("+C+"+)")],3m:G(a,c,b){H d,2b=[];1W(a&&a!=d){d=a;H f=E.1E(a,c,b);a=f.t.1p(/^\\s*,\\s*/,"");2b=b?c=f.r:E.1R(2b,f.r)}I 2b},1Y:G(t,o){9(1m t!="1M")I[t];9(o&&!o.1y)o=S;o=o||U;H d=[o],2f=[],3u;1W(t&&3u!=t){H r=[];3u=t;t=E.36(t);H l=P;H g=6k;H m=g.2S(t);9(m){H p=m[1].27();L(H i=0;d[i];i++)L(H c=d[i].1w;c;c=c.2q)9(c.1y==1&&(p=="*"||c.11.27()==p.27()))r.1a(c);d=r;t=t.1p(g,"");9(t.1g(" ")==0)6r;l=Q}J{g=/^([>+~])\\s*(\\w*)/i;9((m=g.2S(t))!=S){r=[];H p=m[2],1R={};m=m[1];L(H j=0,31=d.K;j<31;j++){H n=m=="~"||m=="+"?d[j].2q:d[j].1w;L(;n;n=n.2q)9(n.1y==1){H h=E.M(n);9(m=="~"&&1R[h])1T;9(!p||n.11.27()==p.27()){9(m=="~")1R[h]=Q;r.1a(n)}9(m=="+")1T}}d=r;t=E.36(t.1p(g,""));l=Q}}9(t&&!l){9(!t.1g(",")){9(o==d[0])d.44();2f=E.1R(2f,d);r=d=[o];t=" "+t.68(1,t.K)}J{H k=6i;H m=k.2S(t);9(m){m=[0,m[2],m[3],m[1]]}J{k=6h;m=k.2S(t)}m[2]=m[2].1p(/\\\\/g,"");H f=d[d.K-1];9(m[1]=="#"&&f&&f.3S&&!E.4a(f)){H q=f.3S(m[2]);9((E.V.1h||E.V.34)&&q&&1m q.22=="1M"&&q.22!=m[2])q=E(\'[@22="\'+m[2]+\'"]\',f)[0];d=r=q&&(!m[3]||E.11(q,m[3]))?[q]:[]}J{L(H i=0;d[i];i++){H a=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];9(a=="*"&&d[i].11.2p()=="5i")a="3a";r=E.1R(r,d[i].4l(a))}9(m[1]==".")r=E.4X(r,m[2]);9(m[1]=="#"){H e=[];L(H i=0;r[i];i++)9(r[i].4p("22")==m[2]){e=[r[i]];1T}r=e}d=r}t=t.1p(k,"")}}9(t){H b=E.1E(t,r);d=r=b.r;t=E.36(b.t)}}9(t)d=[];9(d&&o==d[0])d.44();2f=E.1R(2f,d);I 2f},4X:G(r,m,a){m=" "+m+" ";H c=[];L(H i=0;r[i];i++){H b=(" "+r[i].1o+" ").1g(m)>=0;9(!a&&b||a&&!b)c.1a(r[i])}I c},1E:G(t,r,h){H d;1W(t&&t!=d){d=t;H p=E.6a,m;L(H i=0;p[i];i++){m=p[i].2S(t);9(m){t=t.7O(m[0].K);m[2]=m[2].1p(/\\\\/g,"");1T}}9(!m)1T;9(m[1]==":"&&m[2]=="5V")r=E.1E(m[3],r,Q).r;J 9(m[1]==".")r=E.4X(r,m[2],h);J 9(m[1]=="["){H g=[],O=m[3];L(H i=0,31=r.K;i<31;i++){H a=r[i],z=a[E.5o[m[2]]||m[2]];9(z==S||/6C|3k|26/.14(m[2]))z=E.1x(a,m[2])||\'\';9((O==""&&!!z||O=="="&&z==m[5]||O=="!="&&z!=m[5]||O=="^="&&z&&!z.1g(m[5])||O=="$="&&z.68(z.K-m[5].K)==m[5]||(O=="*="||O=="~=")&&z.1g(m[5])>=0)^h)g.1a(a)}r=g}J 9(m[1]==":"&&m[2]=="2I-46"){H e={},g=[],14=/(\\d*)n\\+?(\\d*)/.2S(m[3]=="6f"&&"2n"||m[3]=="6e"&&"2n+1"||!/\\D/.14(m[3])&&"n+"+m[3]||m[3]),3v=(14[1]||1)-0,d=14[2]-0;L(H i=0,31=r.K;i<31;i++){H j=r[i],12=j.12,22=E.M(12);9(!e[22]){H c=1;L(H n=12.1w;n;n=n.2q)9(n.1y==1)n.4U=c++;e[22]=Q}H b=P;9(3v==1){9(d==0||j.4U==d)b=Q}J 9((j.4U+d)%3v==0)b=Q;9(b^h)g.1a(j)}r=g}J{H f=E.55[m[1]];9(1m f!="1M")f=E.55[m[1]][m[2]];f=3w("P||G(a,i){I "+f+"}");r=E.2W(r,f,h)}}I{r:r,t:t}},4e:G(b,c){H d=[];H a=b[c];1W(a&&a!=U){9(a.1y==1)d.1a(a);a=a[c]}I d},2I:G(a,e,c,b){e=e||1;H d=0;L(;a;a=a[c])9(a.1y==1&&++d==e)1T;I a},5d:G(n,a){H r=[];L(;n;n=n.2q){9(n.1y==1&&(!a||n!=a))r.1a(n)}I r}});E.1j={1f:G(g,e,c,h){9(E.V.1h&&g.4j!=W)g=18;9(!c.2u)c.2u=6.2u++;9(h!=W){H d=c;c=G(){I d.16(6,1q)};c.M=h;c.2u=d.2u}H i=e.2l(".");e=i[0];c.O=i[1];H b=E.M(g,"2P")||E.M(g,"2P",{});H f=E.M(g,"2t",G(){H a;9(1m E=="W"||E.1j.4T)I a;a=E.1j.2t.16(g,1q);I a});H j=b[e];9(!j){j=b[e]={};9(g.4S)g.4S(e,f,P);J g.7N("43"+e,f)}j[c.2u]=c;6.1Z[e]=Q},2u:1,1Z:{},28:G(d,c,b){H e=E.M(d,"2P"),2L,4I;9(1m c=="1M"){H a=c.2l(".");c=a[0]}9(e){9(c&&c.O){b=c.4Q;c=c.O}9(!c){L(c 1i e)6.28(d,c)}J 9(e[c]){9(b)2E e[c][b.2u];J L(b 1i e[c])9(!a[1]||e[c][b].O==a[1])2E e[c][b];L(2L 1i e[c])1T;9(!2L){9(d.4P)d.4P(c,E.M(d,"2t"),P);J d.7M("43"+c,E.M(d,"2t"));2L=S;2E e[c]}}L(2L 1i e)1T;9(!2L){E.30(d,"2P");E.30(d,"2t")}}},1F:G(d,b,e,c,f){b=E.2h(b||[]);9(!e){9(6.1Z[d])E("*").1f([18,U]).1F(d,b)}J{H a,2L,1b=E.1n(e[d]||S),4N=!b[0]||!b[0].2M;9(4N)b.4w(6.4M({O:d,2m:e}));b[0].O=d;9(E.1n(E.M(e,"2t")))a=E.M(e,"2t").16(e,b);9(!1b&&e["43"+d]&&e["43"+d].16(e,b)===P)a=P;9(4N)b.44();9(f&&f.16(e,b)===P)a=P;9(1b&&c!==P&&a!==P&&!(E.11(e,\'a\')&&d=="4L")){6.4T=Q;e[d]()}6.4T=P}I a},2t:G(d){H a;d=E.1j.4M(d||18.1j||{});H b=d.O.2l(".");d.O=b[0];H c=E.M(6,"2P")&&E.M(6,"2P")[d.O],3q=1B.3A.2J.2O(1q,1);3q.4w(d);L(H j 1i c){3q[0].4Q=c[j];3q[0].M=c[j].M;9(!b[1]||c[j].O==b[1]){H e=c[j].16(6,3q);9(a!==P)a=e;9(e===P){d.2M();d.3p()}}}9(E.V.1h)d.2m=d.2M=d.3p=d.4Q=d.M=S;I a},4M:G(c){H a=c;c=E.1k({},a);c.2M=G(){9(a.2M)a.2M();a.7L=P};c.3p=G(){9(a.3p)a.3p();a.7K=Q};9(!c.2m&&c.65)c.2m=c.65;9(E.V.1N&&c.2m.1y==3)c.2m=a.2m.12;9(!c.4K&&c.4J)c.4K=c.4J==c.2m?c.7H:c.4J;9(c.64==S&&c.63!=S){H e=U.2V,b=U.1G;c.64=c.63+(e&&e.2R||b.2R||0);c.7E=c.7D+(e&&e.2B||b.2B||0)}9(!c.3Y&&(c.61||c.60))c.3Y=c.61||c.60;9(!c.5F&&c.5D)c.5F=c.5D;9(!c.3Y&&c.2r)c.3Y=(c.2r&1?1:(c.2r&2?3:(c.2r&4?2:0)));I c}};E.1b.1k({3W:G(c,a,b){I c=="5Y"?6.2G(c,a,b):6.N(G(){E.1j.1f(6,c,b||a,b&&a)})},2G:G(d,b,c){I 6.N(G(){E.1j.1f(6,d,G(a){E(6).5X(a);I(c||b).16(6,1q)},c&&b)})},5X:G(a,b){I 6.N(G(){E.1j.28(6,a,b)})},1F:G(c,a,b){I 6.N(G(){E.1j.1F(c,a,6,Q,b)})},7x:G(c,a,b){9(6[0])I E.1j.1F(c,a,6[0],P,b)},25:G(){H a=1q;I 6.4L(G(e){6.4H=0==6.4H?1:0;e.2M();I a[6.4H].16(6,[e])||P})},7v:G(f,g){G 4G(e){H p=e.4K;1W(p&&p!=6)2a{p=p.12}29(e){p=6};9(p==6)I P;I(e.O=="4x"?f:g).16(6,[e])}I 6.4x(4G).5U(4G)},2d:G(f){5T();9(E.3T)f.16(U,[E]);J E.3l.1a(G(){I f.16(6,[E])});I 6}});E.1k({3T:P,3l:[],2d:G(){9(!E.3T){E.3T=Q;9(E.3l){E.N(E.3l,G(){6.16(U)});E.3l=S}9(E.V.35||E.V.34)U.4P("5S",E.2d,P);9(!18.7t.K)E(18).39(G(){E("#4E").28()})}}});E.N(("7s,7r,39,7q,6n,5Y,4L,7p,"+"7n,7m,7l,4x,5U,7k,24,"+"51,7j,7i,7h,3U").2l(","),G(i,o){E.1b[o]=G(f){I f?6.3W(o,f):6.1F(o)}});H x=P;G 5T(){9(x)I;x=Q;9(E.V.35||E.V.34)U.4S("5S",E.2d,P);J 9(E.V.1h){U.7f("<7d"+"7y 22=4E 7z=Q "+"3k=//:><\\/1J>");H a=U.3S("4E");9(a)a.62=G(){9(6.2C!="1l")I;E.2d()};a=S}J 9(E.V.1N)E.4B=4j(G(){9(U.2C=="5Q"||U.2C=="1l"){4A(E.4B);E.4B=S;E.2d()}},10);E.1j.1f(18,"39",E.2d)}E.1b.1k({39:G(g,d,c){9(E.1n(g))I 6.3W("39",g);H e=g.1g(" ");9(e>=0){H i=g.2J(e,g.K);g=g.2J(0,e)}c=c||G(){};H f="4z";9(d)9(E.1n(d)){c=d;d=S}J{d=E.3a(d);f="5P"}H h=6;E.3G({1d:g,O:f,M:d,1l:G(a,b){9(b=="1C"||b=="5O")h.4o(i?E("<1s/>").3g(a.40.1p(/<1J(.|\\s)*?\\/1J>/g,"")).1Y(i):a.40);56(G(){h.N(c,[a.40,b,a])},13)}});I 6},7a:G(){I E.3a(6.5M())},5M:G(){I 6.1X(G(){I E.11(6,"2Y")?E.2h(6.79):6}).1E(G(){I 6.2H&&!6.3c&&(6.2Q||/24|6b/i.14(6.11)||/2g|1P|52/i.14(6.O))}).1X(G(i,c){H b=E(6).3i();I b==S?S:b.1c==1B?E.1X(b,G(a,i){I{2H:c.2H,1Q:a}}):{2H:c.2H,1Q:b}}).21()}});E.N("5L,5K,6t,5J,5I,5H".2l(","),G(i,o){E.1b[o]=G(f){I 6.3W(o,f)}});H B=(1u 3D).3B();E.1k({21:G(d,b,a,c){9(E.1n(b)){a=b;b=S}I E.3G({O:"4z",1d:d,M:b,1C:a,1V:c})},78:G(b,a){I E.21(b,S,a,"1J")},77:G(c,b,a){I E.21(c,b,a,"45")},76:G(d,b,a,c){9(E.1n(b)){a=b;b={}}I E.3G({O:"5P",1d:d,M:b,1C:a,1V:c})},75:G(a){E.1k(E.59,a)},59:{1Z:Q,O:"4z",2z:0,5G:"74/x-73-2Y-72",6o:Q,3e:Q,M:S},49:{},3G:G(s){H f,2y=/=(\\?|%3F)/g,1v,M;s=E.1k(Q,s,E.1k(Q,{},E.59,s));9(s.M&&s.6o&&1m s.M!="1M")s.M=E.3a(s.M);9(s.1V=="4b"){9(s.O.2p()=="21"){9(!s.1d.1t(2y))s.1d+=(s.1d.1t(/\\?/)?"&":"?")+(s.4b||"5E")+"=?"}J 9(!s.M||!s.M.1t(2y))s.M=(s.M?s.M+"&":"")+(s.4b||"5E")+"=?";s.1V="45"}9(s.1V=="45"&&(s.M&&s.M.1t(2y)||s.1d.1t(2y))){f="4b"+B++;9(s.M)s.M=s.M.1p(2y,"="+f);s.1d=s.1d.1p(2y,"="+f);s.1V="1J";18[f]=G(a){M=a;1C();1l();18[f]=W;2a{2E 18[f]}29(e){}}}9(s.1V=="1J"&&s.1L==S)s.1L=P;9(s.1L===P&&s.O.2p()=="21")s.1d+=(s.1d.1t(/\\?/)?"&":"?")+"57="+(1u 3D()).3B();9(s.M&&s.O.2p()=="21"){s.1d+=(s.1d.1t(/\\?/)?"&":"?")+s.M;s.M=S}9(s.1Z&&!E.5b++)E.1j.1F("5L");9(!s.1d.1g("8g")&&s.1V=="1J"){H h=U.4l("9U")[0];H g=U.5B("1J");g.3k=s.1d;9(!f&&(s.1C||s.1l)){H j=P;g.9R=g.62=G(){9(!j&&(!6.2C||6.2C=="5Q"||6.2C=="1l")){j=Q;1C();1l();h.3b(g)}}}h.58(g);I}H k=P;H i=18.6X?1u 6X("9P.9O"):1u 6W();i.9M(s.O,s.1d,s.3e);9(s.M)i.5C("9J-9I",s.5G);9(s.5y)i.5C("9H-5x-9F",E.49[s.1d]||"9D, 9C 9B 9A 5v:5v:5v 9z");i.5C("X-9x-9v","6W");9(s.6U)s.6U(i);9(s.1Z)E.1j.1F("5H",[i,s]);H c=G(a){9(!k&&i&&(i.2C==4||a=="2z")){k=Q;9(d){4A(d);d=S}1v=a=="2z"&&"2z"||!E.6S(i)&&"3U"||s.5y&&E.6R(i,s.1d)&&"5O"||"1C";9(1v=="1C"){2a{M=E.6Q(i,s.1V)}29(e){1v="5k"}}9(1v=="1C"){H b;2a{b=i.5s("6P-5x")}29(e){}9(s.5y&&b)E.49[s.1d]=b;9(!f)1C()}J E.5r(s,i,1v);1l();9(s.3e)i=S}};9(s.3e){H d=4j(c,13);9(s.2z>0)56(G(){9(i){i.9q();9(!k)c("2z")}},s.2z)}2a{i.9o(s.M)}29(e){E.5r(s,i,S,e)}9(!s.3e)c();I i;G 1C(){9(s.1C)s.1C(M,1v);9(s.1Z)E.1j.1F("5I",[i,s])}G 1l(){9(s.1l)s.1l(i,1v);9(s.1Z)E.1j.1F("6t",[i,s]);9(s.1Z&&!--E.5b)E.1j.1F("5K")}},5r:G(s,a,b,e){9(s.3U)s.3U(a,b,e);9(s.1Z)E.1j.1F("5J",[a,s,e])},5b:0,6S:G(r){2a{I!r.1v&&9n.9l=="54:"||(r.1v>=6N&&r.1v<9j)||r.1v==6M||E.V.1N&&r.1v==W}29(e){}I P},6R:G(a,c){2a{H b=a.5s("6P-5x");I a.1v==6M||b==E.49[c]||E.V.1N&&a.1v==W}29(e){}I P},6Q:G(r,b){H c=r.5s("9i-O");H d=b=="6K"||!b&&c&&c.1g("6K")>=0;H a=d?r.9g:r.40;9(d&&a.2V.37=="5k")6G"5k";9(b=="1J")E.5f(a);9(b=="45")a=3w("("+a+")");I a},3a:G(a){H s=[];9(a.1c==1B||a.4c)E.N(a,G(){s.1a(3f(6.2H)+"="+3f(6.1Q))});J L(H j 1i a)9(a[j]&&a[j].1c==1B)E.N(a[j],G(){s.1a(3f(j)+"="+3f(6))});J s.1a(3f(j)+"="+3f(a[j]));I s.66("&").1p(/%20/g,"+")}});E.1b.1k({1A:G(b,a){I b?6.1U({1H:"1A",2N:"1A",1r:"1A"},b,a):6.1E(":1P").N(G(){6.R.19=6.3h?6.3h:"";9(E.17(6,"19")=="2s")6.R.19="2Z"}).2D()},1z:G(b,a){I b?6.1U({1H:"1z",2N:"1z",1r:"1z"},b,a):6.1E(":3R").N(G(){6.3h=6.3h||E.17(6,"19");9(6.3h=="2s")6.3h="2Z";6.R.19="2s"}).2D()},6J:E.1b.25,25:G(a,b){I E.1n(a)&&E.1n(b)?6.6J(a,b):a?6.1U({1H:"25",2N:"25",1r:"25"},a,b):6.N(G(){E(6)[E(6).3t(":1P")?"1A":"1z"]()})},9c:G(b,a){I 6.1U({1H:"1A"},b,a)},9b:G(b,a){I 6.1U({1H:"1z"},b,a)},99:G(b,a){I 6.1U({1H:"25"},b,a)},98:G(b,a){I 6.1U({1r:"1A"},b,a)},96:G(b,a){I 6.1U({1r:"1z"},b,a)},95:G(c,a,b){I 6.1U({1r:a},c,b)},1U:G(k,i,h,g){H j=E.6D(i,h,g);I 6[j.3L===P?"N":"3L"](G(){j=E.1k({},j);H f=E(6).3t(":1P"),3y=6;L(H p 1i k){9(k[p]=="1z"&&f||k[p]=="1A"&&!f)I E.1n(j.1l)&&j.1l.16(6);9(p=="1H"||p=="2N"){j.19=E.17(6,"19");j.2U=6.R.2U}}9(j.2U!=S)6.R.2U="1P";j.3M=E.1k({},k);E.N(k,G(c,a){H e=1u E.2j(3y,j,c);9(/25|1A|1z/.14(a))e[a=="25"?f?"1A":"1z":a](k);J{H b=a.3s().1t(/^([+-]=)?([\\d+-.]+)(.*)$/),1O=e.2b(Q)||0;9(b){H d=3I(b[2]),2i=b[3]||"2T";9(2i!="2T"){3y.R[c]=(d||1)+2i;1O=((d||1)/e.2b(Q))*1O;3y.R[c]=1O+2i}9(b[1])d=((b[1]=="-="?-1:1)*d)+1O;e.3N(1O,d,2i)}J e.3N(1O,a,"")}});I Q})},3L:G(a,b){9(E.1n(a)){b=a;a="2j"}9(!a||(1m a=="1M"&&!b))I A(6[0],a);I 6.N(G(){9(b.1c==1B)A(6,a,b);J{A(6,a).1a(b);9(A(6,a).K==1)b.16(6)}})},9f:G(){H a=E.32;I 6.N(G(){L(H i=0;i<a.K;i++)9(a[i].T==6)a.6I(i--,1)}).5n()}});H A=G(b,c,a){9(!b)I;H q=E.M(b,c+"3L");9(!q||a)q=E.M(b,c+"3L",a?E.2h(a):[]);I q};E.1b.5n=G(a){a=a||"2j";I 6.N(G(){H q=A(6,a);q.44();9(q.K)q[0].16(6)})};E.1k({6D:G(b,a,c){H d=b&&b.1c==8Z?b:{1l:c||!c&&a||E.1n(b)&&b,2e:b,3J:c&&a||a&&a.1c!=8Y&&a};d.2e=(d.2e&&d.2e.1c==4W?d.2e:{8X:8W,8V:6N}[d.2e])||8T;d.3r=d.1l;d.1l=G(){E(6).5n();9(E.1n(d.3r))d.3r.16(6)};I d},3J:{6B:G(p,n,b,a){I b+a*p},5q:G(p,n,b,a){I((-38.9s(p*38.8R)/2)+0.5)*a+b}},32:[],2j:G(b,c,a){6.Y=c;6.T=b;6.1e=a;9(!c.3P)c.3P={}}});E.2j.3A={4r:G(){9(6.Y.2F)6.Y.2F.16(6.T,[6.2v,6]);(E.2j.2F[6.1e]||E.2j.2F.6z)(6);9(6.1e=="1H"||6.1e=="2N")6.T.R.19="2Z"},2b:G(a){9(6.T[6.1e]!=S&&6.T.R[6.1e]==S)I 6.T[6.1e];H r=3I(E.3C(6.T,6.1e,a));I r&&r>-8O?r:3I(E.17(6.T,6.1e))||0},3N:G(c,b,e){6.5u=(1u 3D()).3B();6.1O=c;6.2D=b;6.2i=e||6.2i||"2T";6.2v=6.1O;6.4q=6.4i=0;6.4r();H f=6;G t(){I f.2F()}t.T=6.T;E.32.1a(t);9(E.32.K==1){H d=4j(G(){H a=E.32;L(H i=0;i<a.K;i++)9(!a[i]())a.6I(i--,1);9(!a.K)4A(d)},13)}},1A:G(){6.Y.3P[6.1e]=E.1x(6.T.R,6.1e);6.Y.1A=Q;6.3N(0,6.2b());9(6.1e=="2N"||6.1e=="1H")6.T.R[6.1e]="8N";E(6.T).1A()},1z:G(){6.Y.3P[6.1e]=E.1x(6.T.R,6.1e);6.Y.1z=Q;6.3N(6.2b(),0)},2F:G(){H t=(1u 3D()).3B();9(t>6.Y.2e+6.5u){6.2v=6.2D;6.4q=6.4i=1;6.4r();6.Y.3M[6.1e]=Q;H a=Q;L(H i 1i 6.Y.3M)9(6.Y.3M[i]!==Q)a=P;9(a){9(6.Y.19!=S){6.T.R.2U=6.Y.2U;6.T.R.19=6.Y.19;9(E.17(6.T,"19")=="2s")6.T.R.19="2Z"}9(6.Y.1z)6.T.R.19="2s";9(6.Y.1z||6.Y.1A)L(H p 1i 6.Y.3M)E.1x(6.T.R,p,6.Y.3P[p])}9(a&&E.1n(6.Y.1l))6.Y.1l.16(6.T);I P}J{H n=t-6.5u;6.4i=n/6.Y.2e;6.4q=E.3J[6.Y.3J||(E.3J.5q?"5q":"6B")](6.4i,n,0,1,6.Y.2e);6.2v=6.1O+((6.2D-6.1O)*6.4q);6.4r()}I Q}};E.2j.2F={2R:G(a){a.T.2R=a.2v},2B:G(a){a.T.2B=a.2v},1r:G(a){E.1x(a.T.R,"1r",a.2v)},6z:G(a){a.T.R[a.1e]=a.2v+a.2i}};E.1b.6m=G(){H c=0,3E=0,T=6[0],5t;9(T)8L(E.V){H b=E.17(T,"2X")=="4F",1D=T.12,23=T.23,2K=T.3H,4f=1N&&3x(4s)<8J;9(T.6V){5w=T.6V();1f(5w.1S+38.33(2K.2V.2R,2K.1G.2R),5w.3E+38.33(2K.2V.2B,2K.1G.2B));9(1h){H d=E("4o").17("8H");d=(d=="8G"||E.5g&&3x(4s)>=7)&&2||d;1f(-d,-d)}}J{1f(T.5l,T.5z);1W(23){1f(23.5l,23.5z);9(35&&/^t[d|h]$/i.14(1D.37)||!4f)d(23);9(4f&&!b&&E.17(23,"2X")=="4F")b=Q;23=23.23}1W(1D.37&&!/^1G|4o$/i.14(1D.37)){9(!/^8D|1I-9S.*$/i.14(E.17(1D,"19")))1f(-1D.2R,-1D.2B);9(35&&E.17(1D,"2U")!="3R")d(1D);1D=1D.12}9(4f&&b)1f(-2K.1G.5l,-2K.1G.5z)}5t={3E:3E,1S:c}}I 5t;G d(a){1f(E.17(a,"9T"),E.17(a,"8A"))}G 1f(l,t){c+=3x(l)||0;3E+=3x(t)||0}}})();',62,616,'||||||this|||if|||||||||||||||||||||||||||||||||function|var|return|else|length|for|data|each|type|false|true|style|null|elem|document|browser|undefined||options|||nodeName|parentNode||test|jQuery|apply|css|window|display|push|fn|constructor|url|prop|add|indexOf|msie|in|event|extend|complete|typeof|isFunction|className|replace|arguments|opacity|div|match|new|status|firstChild|attr|nodeType|hide|show|Array|success|parent|filter|trigger|body|height|table|script|tbody|cache|string|safari|start|hidden|value|merge|left|break|animate|dataType|while|map|find|global||get|id|offsetParent|select|toggle|selected|toUpperCase|remove|catch|try|cur|al|ready|duration|done|text|makeArray|unit|fx|swap|split|target||pushStack|toLowerCase|nextSibling|button|none|handle|guid|now|stack|tb|jsre|timeout|inArray|scrollTop|readyState|end|delete|step|one|name|nth|slice|doc|ret|preventDefault|width|call|events|checked|scrollLeft|exec|px|overflow|documentElement|grep|position|form|block|removeData|rl|timers|max|opera|mozilla|trim|tagName|Math|load|param|removeChild|disabled|insertBefore|async|encodeURIComponent|append|oldblock|val|childNodes|src|readyList|multiFilter|color|defaultView|stopPropagation|args|old|toString|is|last|first|eval|parseInt|self|domManip|prototype|getTime|curCSS|Date|top||ajax|ownerDocument|parseFloat|easing|has|queue|curAnim|custom|innerHTML|orig|currentStyle|visible|getElementById|isReady|error|static|bind|String|which|getComputedStyle|responseText|oWidth|oHeight|on|shift|json|child|RegExp|ol|lastModified|isXMLDoc|jsonp|jquery|previousSibling|dir|safari2|el|styleFloat|state|setInterval|radio|getElementsByTagName|tr|empty|html|getAttribute|pos|update|version|input|float|runtimeStyle|unshift|mouseover|getPropertyValue|GET|clearInterval|safariTimer|visibility|clean|__ie_init|absolute|handleHover|lastToggle|index|fromElement|relatedTarget|click|fix|evt|andSelf|removeEventListener|handler|cloneNode|addEventListener|triggered|nodeIndex|unique|Number|classFilter|prevObject|selectedIndex|after|submit|password|removeAttribute|file|expr|setTimeout|_|appendChild|ajaxSettings|client|active|win|sibling|deep|globalEval|boxModel|cssFloat|object|checkbox|parsererror|offsetLeft|wrapAll|dequeue|props|lastChild|swing|handleError|getResponseHeader|results|startTime|00|box|Modified|ifModified|offsetTop|evalScript|createElement|setRequestHeader|ctrlKey|callback|metaKey|contentType|ajaxSend|ajaxSuccess|ajaxError|ajaxStop|ajaxStart|serializeArray|init|notmodified|POST|loaded|appendTo|DOMContentLoaded|bindReady|mouseout|not|removeAttr|unbind|unload|Width|keyCode|charCode|onreadystatechange|clientX|pageX|srcElement|join|outerHTML|substr|zoom|parse|textarea|reset|image|odd|even|before|quickClass|quickID|prepend|quickChild|execScript|offset|scroll|processData|uuid|contents|continue|textContent|ajaxComplete|clone|setArray|webkit|nodeValue|fl|_default|100|linear|href|speed|eq|createTextNode|throw|replaceWith|splice|_toggle|xml|colgroup|304|200|alpha|Last|httpData|httpNotModified|httpSuccess|fieldset|beforeSend|getBoundingClientRect|XMLHttpRequest|ActiveXObject|col|br|abbr|pixelLeft|urlencoded|www|application|ajaxSetup|post|getJSON|getScript|elements|serialize|clientWidth|hasClass|scr|clientHeight|write|relative|keyup|keypress|keydown|change|mousemove|mouseup|mousedown|right|dblclick|resize|focus|blur|frames|instanceof|hover|offsetWidth|triggerHandler|ipt|defer|offsetHeight|border|padding|clientY|pageY|Left|Right|toElement|Bottom|Top|cancelBubble|returnValue|detachEvent|attachEvent|substring|line|weight|animated|header|font|enabled|innerText|contains|only|size|gt|lt|uFFFF|u0128|417|inner|Height|toggleClass|removeClass|addClass|replaceAll|noConflict|insertAfter|prependTo|wrap|contentWindow|contentDocument|http|iframe|children|siblings|prevAll|nextAll|wrapInner|prev|Boolean|next|parents|maxLength|maxlength|readOnly|readonly|class|htmlFor|CSS1Compat|compatMode|compatible|borderTopWidth|ie|ra|inline|it|rv|medium|borderWidth|userAgent|522|navigator|with|concat|1px|10000|array|ig|PI|NaN|400|reverse|fast|600|slow|Function|Object|setAttribute|changed|be|can|property|fadeTo|fadeOut|getAttributeNode|fadeIn|slideToggle|method|slideUp|slideDown|action|cssText|stop|responseXML|option|content|300|th|protocol|td|location|send|cap|abort|colg|cos|tfoot|thead|With|leg|Requested|opt|GMT|1970|Jan|01|Thu|area|Since|hr|If|Type|Content|meta|specified|open|link|XMLHTTP|Microsoft|img|onload|row|borderLeftWidth|head|attributes'.split('|'),0,{}))

//DEFINE Language Strings used by Neobux ::
var neobuxLangStrings = {
// Language strings for the actual Neobux website 
// -> To allow the script to run both in English and Portugese
  EN : {
    'noClicks': 'Nessun clik',
    'today': 'Oggi',
    'yesterday': 'Ieri',
    'REFERRALS': 'REFERENTI',
    'Standard': '[Standard',
  },

  PT : {
    'noClicks': 'Sem cliques',
    'today': 'Hoje',
    'yesterday': 'Ontem',
    'REFERRALS': 'REFERIDOS',
    'Standard': '[Membro Normal',
  },

  SP : {
    'noClicks': 'Nessun clik',
    'today': 'Oggi',
    'yesterday': 'Ieri',
    'REFERRALS': 'REFERENTI',
    'Standard': '[Standard',
  }
};

//DEFINE Language Strings used by the Script ::
var scriptLangStrings = {
// Language Strings used by the script
// List of country codes: http://www.iso.org/iso/english_country_names_and_code_elements

  EN : {
    //English = EN
    // REFERRAL STATISTICS PAGE
    'totalClickAvg': 'Media totale clik',
    'lastdaysClickAvg': 'Media ultimi giorni.',
    'totalClicks': 'Clik Totali',
    'clickedToday': 'Clik di oggi',
    'clickedYday': 'Clik di ieri',
    'others': 'Altri',
    'dailyNetIncome': 'Utile netto giornaliero',
    'avgIncome': 'Media reddito',
    'avgExpenses': 'Media spese',
    'avgTransfers': 'Media trasferimenti.',
    // GRAPHS
    'DirectReferralclickscredited': 'Clik Accreditati Dei Referenti Diretti',
    'RentedReferralclickscredited': 'Clik Accreditati Dei Referenti Noleggiati',
    'RecyclingCosts': 'Costo dei ricicli',
    'AutopayCosts': 'Costi Autopay',
    'TransfersToRentalBalance': 'Trasferimenti Nel Rental Balance',
    'RenewalCosts': 'Costo dei rinnovi',
    'ScheduledRenewals': 'Rinnovi in programma',
    'Exportingto': 'Esportazione',
    'Exportingastext': 'Esporta come testo..',
    'PersonalClicks': 'Clik Personali, Orario PC',
    'OwnClicks': 'Clik Personali, Orario SERVER',
    // STATISTICS SUMMARY (SIDEBAR)
    'statsSum': 'Riepilogo statistiche',
    'today': 'Oggi',
    'yesterday': 'Ieri',
    'rented': 'Referenti',
    'rentedReferrals': 'Referenti affittati',
    'direct': 'Diretti',
    'directReferrals': 'Referenti diretti',
    'clicks': 'Clik',
    'avg': 'media',
    'avgs': 'mediae',
    'average': 'Medie',
    'raverage': 'Media reale', // 'Real Average'
    'averages': 'Mediae',
    'expenses': 'Spese',
    'Recycle': 'Recicli',
    'autopay': 'Autopay',
    'renew': 'Rinnovi',
    'net': 'Netto',
    'projectedNet': 'Proiezione netto',
    'last': 'Ultimo',
    'totals': 'Totali',
    'Days': 'Giorni',
    'recycled': 'Riciclato',
    'autopaid': 'Auto pagamento',
    'updateScript': 'Aggiornamento script',
    'refferalsToBeRenewed': 'Referenti da rinnovare',
    'recycledLast': 'Ultimo riciclo',
    'autopaidLast': 'Ultimo auto pagamento',
    'totalReferrals': 'Totale referenti:',
    'income': 'Reddito',
    'stats': 'Statistiche',
    'summary': 'Riepilogo',
    'projectedIncome': 'Proiezione reddito',
    'zeroClickers': 'Zero-Clickers',
    'Profit': 'Profitto',
    'ExactAVG': '<i>Media. | Esatta</i>',
    'Exact': 'Esatta',
    'Morethan': 'Oltre',
    'Never': 'Nessun <br>giorno minimo necessaro',
    'clicksRemaining': 'Restanti',
    'provided': 'Prevista',
    'remainingNet': 'Netto Restante',
    'incomeRemaining': 'Reddito rimanente',
    'amount': 'Importo',
    // FLAGS
    'W': 'B', // White Flag
    'R': 'R', // Red Flag
    'O': 'N', // Orange Flag
    'Y': 'A', // Yellow Flag
    'G': 'V', // Green Flag
    'B': 'C', // Cyan Flag
    // REFERRAL PROFIT POPUP
    'referral': 'Referenti',
    'expenses': 'Spese',
    'totalexpenses': 'Spese totali',
    'goldenFee': 'Costo Golden',
    'goldenPackFee': 'Costo Golden-Pack',
    'totalExpenses': 'Costo totale',
    'perRefPerDay': 'per ref per giorno',
    'minimumAverage': 'Media Minima',
    'toBreakEven': 'al break even',
    'grossIn': 'Lordo entrata',
    'grossOut': 'Lordo uscita',
    'currentProfit': 'Profitto corrente',
    'incl': 'incluso', // 'Including'
    'recycle': 'reciciclo',
    'netProfit': 'Profitto netto',
    'daysToPayForOwnRecycle': 'Giorni per pagare il riciclo',
    'day': 'giorno',
    'hr': 'ora',
    'hrs': 'ore',
    'min': 'minuto',
    'mins': 'minuti',
    'per': 'per',
    'day#': 'Spesa dei giorni p/ <br>Anno un ritorno su investimento <br>ripagano il loro riciclaggio',
    'months': 'mesi',
    'chosendaily': 'giorno scelto',
    'renewal': 'rinnovo',
    'Renewals': 'Rinnovi',
    'of': 'di',
    // UPDATES
    'newUpdateFoundFor': 'Trovato Nuovo Aggiornamento Per:',
    'updateDesc': 'Nota Aggiornamento',
    'updateNow': 'Aggiorna ora',
    'remindMeLater': 'Ricordami più tardi',
    'dismiss': 'Rifiuta',
    'forUpdates': 'per aggiornare',
    'for': 'per',
    'enableUpdates': 'Abilita Aggiornamenti',
    'disableUpdates': 'Disabilita Aggiornamenti',
    'updates': 'aggiornamenti',
    'noUpdatesAvailableFor ': 'Non è disponibile nessun aggiornamento',
    'autoUpdates': 'Aggiornamenti automatici',
    'newVersionAvailable': 'E disponibile una nuova versione',
    'currentVersion': 'Versione attuale: %s',
    'availableVersion': 'Versione disponible: %s',
    'notesAboutTheAvailableVersion': 'Nota sulla versione disponibile:\n%s',
    'doYouWishToUpdateTo': 'Desideri aggiornare v%s?',
    'doYouWishToTurnOffAutoUpdates': 'Desideri disattivare aggiornamenti automatici?',
    'autoUpdatesCanBeReenabled': 'Gli aggiornamenti possono essere riattivati dal menu impostazioni.',
    // MENUS
    'setAVGDays': 'Imposta il valore per le medie',
    'avgDaysMsg': 'inserire il valore di giorni per le medie.',
    'showSTD': 'Mostra Deviazione Standard',
    'on': 'On',
    'off': 'Off',
    'error': 'Errore',
    'days': 'giorni',
    'editUpdateFrequency': 'Imposta frequenza di aggiornamento',
    'checkForUpdates': '%s: Controlla aggiornamenti',
      // WINDOWS SETTINGS
    '~Settings~': '~ Configurazione ~',
    'MoreScripts': ' Neobux IT script',
    'SaveSettings': 'Salva i dati',
    'NoteSave': 'Nota: È necessario aggiornare la pagina per rendere effettive le impostazioni. <br>Premere esc (Esc) per uscire.',
  } ,

  PT : {
    //Portugues = PT
    // REFERRAL STATISTICS PAGE
    'totalClickAvg': 'M&eacute;dia de Cliques',
    'lastdaysClickAvg': 'M&eacute;dia de Cliques',
    'totalClicks': 'N&ordm; de Cliques',
    'clickedToday': 'Clicaram Hoje',
    'clickedYday': 'Clicaram Ontem',
    'others': 'Com Atraso',
    'dailyNetIncome': 'Ganho Di&aacute;rio',
    'avgIncome': 'M&eacute;dia de Ganhos',
    'avgExpenses': 'M&eacute;dias de Despesas',
    'avgTransfers': 'M&eacute;dias de Transfer&ecirc;ncias',
    // GRAPHS
    'DirectReferralclickscredited': 'Cliques Creditados dos Referidos Diretos',
    'RentedReferralclickscredited': 'Cliques Creditados dos Referidos Alugados',
    'RecyclingCosts': 'Valor da Reciclagem',
    'AutopayCosts': 'Valor do Autopagamento',
    'TransfersToRentalBalance': 'Transfer&ecirc;ncias para o Saldo de Aluguer',
    'RenewalCosts': 'Renova&ccedil;&otilde;es',
    'ScheduledRenewals': 'Renova&ccedil;&otilde;es Agendadas',
    'Exportingto': 'Exportando para',
    'Exportingastext': 'Exportando como Texto..',
    'PersonalClicks': 'Meus Cliques no Hor&aacute;rio do Meu Computador',
    'OwnClicks': 'Meus Cliques no Hor&aacute;rio do Servidor',
    // STATISTICS SUMMARY (SIDEBAR)
    'statsSum': 'Estat&iacute;sticas',
    'today': 'Hoje',
    'yesterday': 'Ontem',
    'rented': 'Alugados',
    'rentedReferrals': 'Referidos Alugados',
    'direct': 'Diretos',
    'directReferrals': 'Referidos Diretos',
    'clicks': 'N&ordm; de Cliques e Valor Ganho',
    'avg': 'M&eacute;dia',
    'avgs': 'm&eacute;dias',
    'average': 'N&ordm; de Cliques',
    'raverage': 'M&eacute;dia Real', // 'Real Average'
    'averages': 'M&eacute;dia de Cliques',
    'expenses': 'Despesas',
    'Recycle': 'Reciclagem',
    'autopay': 'AutoPagto.',
    'renew': 'Renova&ccedil;&atilde;o',
    'net': 'Lucro L&iacute;quido',
    'projectedNet': 'Lucro Previsto',
    'last': '&Uacute;ltimos',
    'totals': 'Resumo Geral',
    'Days': 'Dias',
    'recycled': 'Reciclados',
    'autopaid': 'Autopagos',
    'updateScript': 'Atualize o script',
    'refferalsToBeRenewed': 'Referidos para renovar',
    'recycledLast': 'Reciclados nos &uacute;ltimos',
    'autopaidLast': 'Autopagos nos &uacute;ltimos',
    'totalReferrals': 'N&ordm; de Referidos',
    'income': 'Ganhos',
    'stats': 'M&eacute;dia de Cliques',
    'summary': 'Resumo',
    'projectedIncome': 'Previsto',
    'zeroClickers': 'Nunca Clicaram',
    'Profit': 'Lucro',
    'ExactAVG': '<i>Aprox. | Exata</i>',
    'Exact': 'Exata',
    'Morethan': 'Mais de',
    'Never': 'Nunca atingiu <br>m&iacute;nimo de dias necess&aacute;rios',
    'clicksRemaining': 'Restantes',
    'provided': 'Prevista',
    'remainingNet': 'Lucro Restante',
    'incomeRemaining': 'Restantes',
    'amount': 'Cantidades',
    // FLAGS
    'W': 'W', // White Flag
    'R': 'R', // Red Flag
    'O': 'O', // Orange Flag
    'Y': 'Y', // Yellow Flag
    'G': 'G', // Green Flag
    'B': 'B', // Blue Flag
    // REFERRAL PROFIT POPUP
    'referral': 'Referido',
    'expenses': 'Despesas',
    'totalexpenses': 'Total de Despesas',
    'goldenFee': 'Taxa Golden',
    'goldenPackFee': 'Taxa Pacote Golden',
    'totalExpenses': 'Total de Despesas',
    'perRefPerDay': 'por ref. por dia',
    'minimumAverage': 'M&eacute;dia M&iacute;nima',
    'toBreakEven': 'para Retorno do Investimento',
    'grossIn': 'Ganhos com o valor dos Cliques',
    'grossOut': 'Gastos para o manter cadastrado',
    'currentProfit': 'Lucro Atual',
    'incl': 'incluindo', // 'Including'
    'recycle': 'reciclagem',
    'netProfit': 'Lucro L&iacute;quido',
    'daysToPayForOwnRecycle': 'Dias que restam p/ <br>poder pagar sua reciclagem',
    'day': 'dia',
    'hr': 'hora',
    'hrs': 'horas',
    'min': 'minuto',
    'mins': 'minutos',
    'per': 'por',
    'day#': 'Dias que ser&atilde;o ou foram gastos p/ <br>ter retorno do investimento <br>e pagar sua reciclagem',
    'months': 'm&ecirc;s',
    'chosendaily': 'Di&aacute;ria Escolhida',
    'renewal': 'renova&ccedil;&atilde;o',
    'Renewals': 'Renova&ccedil;&otilde;es',
    'of': 'de',
    // UPDATES
    'newUpdateFoundFor': 'Há uma nova atualização disponível para:',
    'updateDesc': 'Notas da atualização',
    'updateNow': 'Atualizar agora',
    'remindMeLater': 'Lembre-me mais tarde',
    'dismiss': 'Recusar',
    'forUpdates': 'para atualizações',
    'for': 'para',
    'enableUpdates': '%s: atualização ativada',
    'disableUpdates': 'Desativada',
    'updates': 'atualizações',
    'noUpdatesAvailableFor ': 'Nenhuma atualização disponível para %s',
    'autoUpdates': 'Atualização Automática',
    'newVersionAvailable': 'Uma nova versão %s de script de usuário está disponível',
    'currentVersion': 'Versão atual: %s',
    'availableVersion': 'Versão Disponível: %s',
    'notesAboutTheAvailableVersion': 'Notas sobre a atualização disponível:\n%s',
    'doYouWishToUpdateTo': 'Você deseja atualizar para v%s?',
    'doYouWishToTurnOffAutoUpdates': 'Deseja desativar a autalização automática para este script?',
    'autoUpdatesCanBeReenabled': 'As atualizações automáticas podem ser reativadas para este script no submenu de comandos de script.',
    // MENUS
    'setAVGDays': 'Selecione o nº de dias',
    'avgDaysMsg': 'Selecione o nº de dias para a média.',
    'showSTD': 'Mostrar divergência',
    'on': 'Ativado',
    'off': 'Desativado',
    'error': 'Erro',
    'days': 'dias',
    'editUpdateFrequency': 'Editar Frequência da Atualização',
    'checkForUpdates': 'Verificar Atualizações para %s',
    // WINDOWS SETTINGS
    '~Settings~': '~ Configura&ccedil;&otilde;es ~',
    'MoreScripts': 'Mais Scripts Neobux em',
    'SaveSettings': 'Salvar',
    'NoteSave': 'Nota: Atualize a p&aacute;gina para ver as altera&ccedil;&otilde;es. <br>Pressione Esc caso queira sair sem salvar as configura&ccedil;&otilde;es.',
  },

  SP : {
    //Spanish = SP
    // REFERRAL STATISTICS PAGE
    'totalClickAvg': 'Media totale clik',
    'lastdaysClickAvg': 'Media ultimi giorni.',
    'totalClicks': 'Clik Totali',
    'clickedToday': 'Clik di oggi',
    'clickedYday': 'Clik di ieri',
    'others': 'Altri',
    'dailyNetIncome': 'Utile netto giornaliero',
    'avgIncome': 'Media reddito',
    'avgExpenses': 'Media spese',
    'avgTransfers': 'Media trasferimenti.',
    // GRAPHS
    'DirectReferralclickscredited': 'Clik Accreditati Dei Referenti Diretti',
    'RentedReferralclickscredited': 'Clik Accreditati Dei Referenti Noleggiati',
    'RecyclingCosts': 'Costo dei ricicli',
    'AutopayCosts': 'Costi Autopay',
    'TransfersToRentalBalance': 'Trasferimenti Nel Rental Balance',
    'RenewalCosts': 'Costo dei rinnovi',
    'ScheduledRenewals': 'Rinnovi in programma',
    'Exportingto': 'Esportazione',
    'Exportingastext': 'Esporta come testo..',
    'PersonalClicks': 'Clik Personali, Orario PC',
    'OwnClicks': 'Clik Personali, Orario SERVER',
    // STATISTICS SUMMARY (SIDEBAR)
    'statsSum': 'Riepilogo statistiche',
    'today': 'Oggi',
    'yesterday': 'Ieri',
    'rented': 'Referenti',
    'rentedReferrals': 'Referenti affittati',
    'direct': 'Diretti',
    'directReferrals': 'Referenti diretti',
    'clicks': 'Clik',
    'avg': 'media',
    'avgs': 'mediae',
    'average': 'Medie',
    'raverage': 'Media reale', // 'Real Average'
    'averages': 'Mediae',
    'expenses': 'Spese',
    'Recycle': 'Recicli',
    'autopay': 'Autopay',
    'renew': 'Rinnovi',
    'net': 'Netto',
    'projectedNet': 'Proiezione netto',
    'last': 'Ultimo',
    'totals': 'Totali',
    'Days': 'Giorni',
    'recycled': 'Riciclato',
    'autopaid': 'Auto pagamento',
    'updateScript': 'Aggiornamento script',
    'refferalsToBeRenewed': 'Referenti da rinnovare',
    'recycledLast': 'Ultimo riciclo',
    'autopaidLast': 'Ultimo auto pagamento',
    'totalReferrals': 'Totale referenti:',
    'income': 'Reddito',
    'stats': 'Statistiche',
    'summary': 'Riepilogo',
    'projectedIncome': 'Proiezione reddito',
    'zeroClickers': 'Zero-Clickers',
    'Profit': 'Profitto',
    'ExactAVG': '<i>Media. | Esatta</i>',
    'Exact': 'Esatta',
    'Morethan': 'Oltre',
    'Never': 'Nessun <br>giorno minimo necessaro',
    'clicksRemaining': 'Restanti',
    'provided': 'Prevista',
    'remainingNet': 'Netto Restante',
    'incomeRemaining': 'Reddito rimanente',
    'amount': 'Importo',
    // FLAGS
    'W': 'B', // White Flag
    'R': 'R', // Red Flag
    'O': 'N', // Orange Flag
    'Y': 'A', // Yellow Flag
    'G': 'V', // Green Flag
    'B': 'C', // Cyan Flag
    // REFERRAL PROFIT POPUP
    'referral': 'Referenti',
    'expenses': 'Spese',
    'totalexpenses': 'Spese totali',
    'goldenFee': 'Costo Golden',
    'goldenPackFee': 'Costo Golden-Pack',
    'totalExpenses': 'Costo totale',
    'perRefPerDay': 'per ref per giorno',
    'minimumAverage': 'Media Minima',
    'toBreakEven': 'al break even',
    'grossIn': 'Lordo entrata',
    'grossOut': 'Lordo uscita',
    'currentProfit': 'Profitto corrente',
    'incl': 'incluso', // 'Including'
    'recycle': 'reciciclo',
    'netProfit': 'Profitto netto',
    'daysToPayForOwnRecycle': 'Giorni per pagare il riciclo',
    'day': 'giorno',
    'hr': 'ora',
    'hrs': 'ore',
    'min': 'minuto',
    'mins': 'minuti',
    'per': 'per',
    'day#': 'Spesa dei giorni p/ <br>Anno un ritorno su investimento <br>ripagano il loro riciclaggio',
    'months': 'mesi',
    'chosendaily': 'giorno scelto',
    'renewal': 'rinnovo',
    'Renewals': 'Rinnovi',
    'of': 'di',
    // UPDATES
    'newUpdateFoundFor': 'ETrovato Nuovo Aggiornamento Per:',
    'updateDesc': 'Nota Aggiornamento',
    'updateNow': 'Aggiorna ora',
    'remindMeLater': 'Ricordami più tardi',
    'dismiss': 'Rifiuta',
    'forUpdates': 'per aggiornare',
    'for': 'per',
    'enableUpdates': 'Abilita Aggiornamenti',
    'disableUpdates': 'Disabilita Aggiornamenti',
    'updates': 'aggiornamenti',
    'noUpdatesAvailableFor ': 'Non è disponibile nessun aggiornamento',
    'autoUpdates': 'Aggiornamenti automatici',
    'newVersionAvailable': 'E disponibile una nuova versione',
    'currentVersion': 'Versione attuale: %s',
    'availableVersion': 'Versione disponible: %s',
    'notesAboutTheAvailableVersion': 'Nota sulla versione disponibile:\n%s',
    'doYouWishToUpdateTo': 'Desideri aggiornare v%s?',
    'doYouWishToTurnOffAutoUpdates': 'Desideri disattivare aggiornamenti automatici?',
    'autoUpdatesCanBeReenabled': 'Gli aggiornamenti possono essere riattivati dal menu impostazioni.',
    // MENUS
    'setAVGDays': 'Imposta il valore per le medie',
    'avgDaysMsg': 'inserire il valore di giorni per le medie.',
    'showSTD': 'Mostra Deviazione Standard',
    'on': 'On',
    'off': 'Off',
    'error': 'Errore',
    'days': 'giorni',
    'editUpdateFrequency': 'Imposta frequenza di aggiornamento',
    'checkForUpdates': '%s: Controlla aggiornamenti',
      // WINDOWS SETTINGS
    '~Settings~': '~ Configurazione ~',
    'MoreScripts': ' Neobux IT script',
    'SaveSettings': 'Salva i dati',
    'NoteSave': 'Nota: È necessario aggiornare la pagina per rendere effettive le impostazioni. <br>Premere esc (Esc) per uscire.',
  }
}

var logging = true;
var loggingLevel = [0];
var testing = false; // Testing ultimate features using a non-ultimate account?

//if(!logging) { function GM_log() {}; }

// Log Type::
// x = debugging;
// 0 = No Logging;
// 1 = Log Everything;
// 2 = Function Calls;
// 3 = CurrentPage Reasoning;
// 4 = CurrentPage outcome;
// 5 = Account stats;
// 6 = Graph details;
// 7 = Referral details;
// 8 = Manipulating preferences;
// 9 = NumDaysSince ;
// 10 = graphProperties();
// 11 = neobuxString();
// 12 = graphProperties() && referral details --> detailed

// Check if the Greasemonkey API functions are present
// If not, add/insert them


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
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) {
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

//// Chrome::
// According to this source code: http://src.chromium.org/viewvc/chrome/trunk/src/chrome/renderer/resources/greasemonkey_api.js
// These API functions are supported: GM_addStyle, GM_xmlhttpRequest, GM_openInTab, GM_log
// These API functions are explicitly unsupported: GM_getValue, GM_setValue, GM_registerMenuCommand

// NOTE: GM_xmlhttpRequest appears to be subject to same-origin policies (unless permissions are explicitly requested via a manifest file); currently researching this impact on user scripts
// http://code.google.com/chrome/extensions/xhr.html
// Update 16-Feb:: It appears that userscripts are run as 'content scripts' thus do not have access to xhr (cross-domain) functionality - http://code.google.com/chrome/extensions/content_scripts.html

function encode64(string) {
  var cipherText = btoa(string);
  return cipherText;
}

function decode64(string) {
  var clearText = atob(string);
  return clearText;
}

function toBool(str) {
  if ("false" === str) { return false; }
    else if ("true" === str) { return true; } 
      else { return str; }
}

if('Chrome' == browserName) {
  // Cookie storage::
  // Decision: Cannot use cookies as cookies are sent to the server on *EVERY* page request
  // Problem1: Will potentially(?) make the site seem sluggish
  // Problem2: Potential privacy concern: will enable Neobux to track your usage of scripts 

  // HTML5 localStorage::
  // Problem1: localStorage databases are scoped to an HTML5 origin, thus values stored when viewing http:// pages are not accessible via https:// pages (and vice versa)
  // Problem2: Still a potential privacy problem as data stored by localStorage is also accessible by the page itself,  but as the data does not get sent to the server every time a page is loaded there is less overhead and the fact that you are using a script is not "broadcasted"

  // Will try using HTML5 localStorage to implement similar functionality as GM_get/setValue (lesser of the evils?)
  // Store item in local storage:

  if('undefined' == typeof GM_log) {
    if('undefined' !== typeof console.info) {
      console.log('typeof console.info = '+(typeof console.log));
      function GM_log(message) {
        console.info(message); 
      }
    } 
  }

  if('undefined' == typeof GM_getValue) {
    function GM_getValue(key,value) { 
    // GM_log('Get Item:' + key);

      if('undefined' !== typeof window.localStorage[key] && 'undefined' !== window.localStorage[key]) {
          // if ("false" === window.localStorage[key]) {
            // return false; 
          // } else if ("true" === window.localStorage[key]) {
            // return true; 
          // } else {
        return window.localStorage[key]; 
        // }
      }
      else {
        GM_log("GM_getValue: Could not find key:" + key);
        if('undefined' !== typeof value) {
          GM_log("GM_getValue: setting default value");
          GM_setValue(key,value);
          GM_log("GM_getValue: returning default value");
          return value; 
        }
        else {
          GM_log("GM_getValue: no default value set");
          return;
        }
      }
    }
  }
  
  if('undefined' == typeof GM_setValue) {
    function GM_setValue(key,value) {
      try {
        window.localStorage[key] = value;
      } 
        catch(e) {
        GM_log("Error inside GM_setValue");
        GM_log(e);
      }
      // GM_log("Return from GM_setValue.\n" + key + ":" +  value);
    }
  }
}


// GM_registerMenuCommand()
if('undefined' == typeof GM_registerMenuCommand) {
  function GM_registerMenuCommand() { }
}

// GM_log()
if('undefined' == typeof GM_log) {
  if('undefined' !== typeof console.info) {
    console.info('typeof console.info = '+(typeof console.info));
    function GM_log(message) { console.info(message); }
  }
  // else if('undefined' !== typeof Error) {
    // console.info('typeof Error = '+(typeof Error));
    // function GM_log(message) { throw new Error(message); } 
  // }

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


function manipulatePrefs(pref,defaultValue,type) {
  if(type == 'set') {
    return GM_setValue(pref,defaultValue); 
  } 
  else if(type == 'get') {
    if('undefined' !== typeof GM_getValue(pref,defaultValue)) {
      // localStorage saves boolean values as strings, causing problems during boolean comparisons because non-zero-length strings are converted to true
      // eg, 'false' === true and 'true' === true
      if(GM_getValue(pref,defaultValue).toString() == 'false') {
        return false;
      } 
        else if(GM_getValue(pref,defaultValue).toString() == 'true') {
        return true;
      } 
        else {
        return GM_getValue(pref,defaultValue);
      }
    } 
    else {
      GM_log('manipulatePrefs():\n' + pref + ' was not found. Set to default value. Default value = ' + defaultValue,8);
      GM_setValue(pref,defaultValue);
      return GM_getValue(pref,defaultValue);
    }
  } 
  else {
    GM_log('Error: variable "type" not set properly - cannot use "' + type + '" when getting / setting the value for: ' + pref + ' [default value (' + defaultValue + ')'); 
    return defaultValue;
  }
}

function getCurrentPage(requestType) {
  customLogger('|| - getCurrentPage(requestType)',2);
  // Do not consider the URL hash (was causing problems: the hash was being included in the final variable value)
  var DocumentLocation = document.location.href.split('#')[0];

  if('location' == requestType) {
    try {
      var urlVariables = DocumentLocation.split('?')[1].split('&');
      customLogger("DocumentLocation.split('?')[1] = "+ urlVariables,3);
    }
    catch(err) {
      customLogger('Error = '+err,3);
      customLogger('No URL variables available',3);
    }

    customLogger('urlVariables = '+urlVariables,3);
    // customLogger('urlVariables.toString() = '+urlVariables.toString(),3);
    var currentPage;

    if (urlVariables.indexOf('s=rs') >=  0) {
    customLogger('s=rs, therefore referral statistics',3);
    currentPage = 'refStats';
    }
    else if (urlVariables.indexOf('RentedRefListings') >=  0) {
      customLogger("indexOf('RentedRefListings'), therefore rented referral listings",3);
      currentPage = 'rentedRefListing';
    }
    else if (urlVariables.indexOf('u=c') >=  0 && urlVariables.indexOf('s=r') >=  0) {
    customLogger('u=c and s=r, therefore referral listings',3);
      if (urlVariables.indexOf('ss3=1') >=  0) {
        customLogger('ss3=1, therefore direct referral listings',3);
        currentPage = 'directRefListing';
      }
      else if (urlVariables.indexOf('ss3=2') >=  0) {
        customLogger('ss3=2, therefore rented referral listings',3);
        currentPage = 'rentedRefListing';
      }
    }
    else if (urlVariables.indexOf('u=v') >=  0) {
      customLogger('u=v, therefore view advertisements page',3);
    }
    else if (DocumentLocation.indexOf('/v/') >=  0) {
      customLogger('/v/, therefore in the forums',3);
      currentPage = 'viewing an advertisement';
    }
    else if (DocumentLocation.search(/[\?u=c]$/) >=  0) {
      customLogger('?u=c, therefore account summary (from top bar)',3);
      currentPage = 'accSummary';
    }
    else if (DocumentLocation.search(/[\?u=c&s=i]$/) >=  0) {
      customLogger('?u=c&s=i, therefore account summary (from sidebar)',3);
      currentPage = 'accSummary';
    }
    else if (DocumentLocation.indexOf('/rel/bl/') >=  0) {
      customLogger('/rel/bl/, therefore account export data',3);
      currentPage = 'accExport';
    }
    else if (DocumentLocation.indexOf('/forum/') >=  0) {
      customLogger('/forum/, therefore in the forums',3);
      currentPage = 'forums';
    }
    else if (DocumentLocation.indexOf('/refstat/') >=  0) {
      customLogger('/refstat/, therefore referral graph',3);
      currentPage = 'referralGraph';
    }
    else if (DocumentLocation.indexOf('#Neobux2Config') >=  0) {
      customLogger('#Neobux2Config, therefore referral graph',3);
      currentPage = 'scriptConfig';
    }
    else {
      customLogger('unknown page',3);
      currentPage = 'unknown';
    }
    return currentPage;
  }

  else if(requestType == 'language') {
    if(document.body.innerHTML.indexOf(' src="http://neobux.cachefly.net/imagens/band1.png"') > 0) {
      customLogger('currentPage.language = "PT"',4);
      return 'PT';
    }
    else if(document.body.innerHTML.indexOf(' src="http://neobux.cachefly.net/imagens/band2.png"') > 0) {
      customLogger('currentPage.language = "EN"',4);
      return 'EN';
    }
    else {
      GM_log('Error: Defaulting pageLang to PT');
      return 'PT';
    }
  }
}


//Definitions of Functions used by the script:::
//Functions used by classes::

function getAccountType(verbose) {
  if(verbose === true) { verbose = true; } else { verbose = false; }

  var accDiv = document.evaluate('//div[@class="tag"][last()]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);

  if(accDiv.textContent.match('Standard')) {acc=0;}
  else if(accDiv.textContent.match('Golden')) {acc=1;}
  else if(accDiv.textContent.match('Emerald')) {acc=2;}
  else if(accDiv.textContent.match('Sapphire')) {acc=3;}
  else if(accDiv.textContent.match('Platinum')) {acc=4;}
  else if(accDiv.textContent.match('Diamond')) {acc=5;}
  else if(accDiv.textContent.match('Ultimate')) {acc=6;}
  else if(accDiv.textContent.match('Pioneer')) {acc=7;}

  if(!verbose) {
    return acc;
  }
  else {
    switch(acc) {
      case 0: return 'Standard'; break;
      case 1: return 'Golden'; break;
      case 2: return 'Emerald'; break;
      case 3: return 'Sapphire'; break;
      case 4: return 'Platinum'; break;
      case 5: return 'Diamond'; break;
      case 6: return 'Ultimate'; break;
      case 7: return 'Pioneer'; break;
      default: return 'Error: '+acc; break;
    }
  }
}

function getNumberOfRefs(refType) {
  customLogger('||- getRefsFunction.. refType = '+refType, 2);

  // If the current referrals page matches the requested 'refType', grab the number of refs from the page and store the value
  // Else the current page and requested 'refType' are mismatched so grab the number of refs from the stored values

  if((currentPage.name == 'rentedRefListing' && refType == 'Rented') || 
    (currentPage.name == 'directRefListing' && refType == 'Direct')) {
    
    var noOfRefsString = document.evaluate('//span[@class="f_b"]',
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);
    
    // If there are some digits on the page within <h1></h1> tags, grab them 
    // Bugfix: This will match the '30' in the error message alerting the user that they must be at least 30 days old to have direct refs
    // --> Added test for a colon ':' to prevent this happening
    if(noOfRefsString.textContent.match(/\d+/)) {
      var numberOfRefs = parseInt(noOfRefsString.textContent.match(/\d+/));
    } 
    else {
      // If digits cannot be found, set the number of refs to zero (0)
      var numberOfRefs = 0; 
    }
    // Store the number of detected referrals
    var numberOfRefs = manipulatePrefs('numberOf'+refType+'Refs',numberOfRefs,'set');
  }
  
  // Now that the stored values have been updated / created, retrieve and return them
  switch(refType) {
    case 'Rented':
      var numberOfRefs = manipulatePrefs('numberOfRentedRefs','0','get');
      customLogger('getting numberOfRefs ('+refType+') = '+numberOfRefs,'get');
      break;
    case 'Direct':
      var numberOfRefs = manipulatePrefs('numberOfDirectRefs','0','get');
      customLogger('getting numberOfRefs ('+refType+') = '+numberOfRefs,'get');
      break;
  }
  return numberOfRefs;
}


function getAutoPayLimit(accountType) {
// Function that returns the autopay limit (minimum days left for autopay to apply) for each account type

  customLogger('||- getAutoPayLimit()',2);
  customLogger('accountType = '+accountType,2);
    // 0 == Standard
    // 1 == Golden
    // 2 == Emerald
    // 3 == Sapphire
    // 4 == Platinum
    // 5 == Diamond
    // 6 == Ultimate
    // 7 == Pioneer

  switch(accountType) {
    case 0: return 20; break;
    case 1: return 20; break;
    case 2: return 20; break;
    case 3: return 18; break;
    case 4: return 20; break;
    case 5: return 14; break;
    case 6: return 10; break;
    case 7: return 20; break;
  }
}

function getRecycleCost(accountType) {

  var defaultRecycleCost, tmp;

  // Set the defaults for each account type
  switch(accountType) {
    case 0: defaultRecycleCost = 0.07; break;
    case 1: defaultRecycleCost = 0.07; break;
    case 2: defaultRecycleCost = 0.06; break;
    case 3: defaultRecycleCost = 0.07; break;
    case 4: defaultRecycleCost = 0.06; break;
    case 5: defaultRecycleCost = 0.07; break;
    case 6: defaultRecycleCost = 0.04; break;
    case 7: defaultRecycleCost = 0.07; break;
    default: defaultRecycleCost = 0.07; break;
  }
  
  // If the current page is the rented referral listings,
  // store the *actual* recycle cost
  if (currentPage.name === "rentedRefListing") {
    tmp = document.body.innerHTML.match(/var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);
    recycleCost = tmp[2];
    manipulatePrefs("recycleCost", recycleCost, "set");
  }

  // If the varibable 'recycleCost' hasn't been set yet, this will return defaultRecycleCost
  // --> if the referral listings pages haven't been viewed yet
  // else this will return recycleCost (the actual recycle cost retrieved from the page)
  return manipulatePrefs("recycleCost", defaultRecycleCost, "get");
}

function getRenewalFees(renewalPeriod) {
    var
          renewCost15,
          renewCost30,
          renewCost60,
          renewCost90,
          renewCost150,
          renewCost240,
          tmp; 
  if(!renewalPeriod) { renewalPeriod = 60; }
  
    var renewCost30 = 0;
    var renewCost60 = 0;
    var renewCost90 = 0;
    
  if(currentPage.name == 'rentedRefListing') {
    
 tmp = document.body.innerHTML.match(/var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);
        renewCost15 = tmp[3];
        renewCost30 = tmp[4];
        renewCost60 = tmp[5];
        renewCost90 = tmp[6];
        renewCost150 = tmp[7];
        renewCost240 = tmp[8];
        manipulatePrefs("renewalFees_15days", renewCost15, "set");

        manipulatePrefs("renewalFees_30days", renewCost30, "set");
        manipulatePrefs("renewalFees_60days", renewCost60, "set");
        manipulatePrefs("renewalFees_90days", renewCost90, "set");
        manipulatePrefs("renewalFees_150days", renewCost150, "set");
        manipulatePrefs("renewalFees_240days", renewCost240, "set");
  }
  
    this._15days = manipulatePrefs("renewalFees15_days", renewCost15, "get");
    this._30days = manipulatePrefs("renewalFees_30days", renewCost30, "get");
    this._60days = manipulatePrefs("renewalFees_60days", renewCost60, "get");
    this._90days = manipulatePrefs("renewalFees_90days", renewCost90, "get");
    this._150days = manipulatePrefs("renewalFees150_days", renewCost150, "get");
    this._240days = manipulatePrefs("renewalFees240_days", renewCost240, "get");
  
  // Return the default renewal period 
  return manipulatePrefs("renewalFees_" + renewalPeriod + "days", renewCost60, "get");
}

function getGoldenPackCost(accountType) {
// Function that returns the cost of purchasing each account type
// *** EXCLUDING COST OF GOLDEN ***

  switch(accountType) {
    case 0: return 0; break;
    case 1: return 0; break;
    case 2: return 290; break;
    case 3: return 290; break;
    case 4: return 490; break;
    case 5: return 490; break;
    case 6: return 890; break;
    case 7: return 0; break;
  }
}

function getAutoPayCost(accountType) {
// Function that returns the autopay cost (per referral) for each account type

  customLogger('||- getAutoPayCost()',2);
  customLogger('accountType = '+accountType,2);

  var totalRentedRefs = getNumberOfRefs('Rented');
  var perAutoPayCost = 0;

    // 0 == Standard
    // 1 == Golden
    // 2 == Emerald
    // 3 == Sapphire
    // 4 == Platinum
    // 5 == Diamond
    // 6 == Ultimate
    // 7 == Pioneer

// CORRECT @ 27/Feb/2010

// Referrals,        Standard, Golden, Emerald, Sapphire, Platinum, Diamond, Ultimate
// 0000 -> 0250,      $0.25,    $0.20,    $0.20,      $0.20,    $0.20,    $0.20,   $0.20
// 0251 -> 0500,      $0.26,    $0.21,    $0.21,      $0.20,    $0.21,    $0.20,   $0.20
// 0501 -> 0750,      $0.27,    $0.22,    $0.22,      $0.21,    $0.22,    $0.20,   $0.20
// 0751 -> 1000,      $0.28,    $0.23,    $0.23,      $0.22,    $0.23,    $0.21,   $0.20
// 1001 -> 1250,      $0.29,    $0.24,    $0.24,      $0.23,    $0.24,    $0.22,   $0.21
// 1251 -> 1500,      $0.30,    $0.25,    $0.25,      $0.24,    $0.25,    $0.23,   $0.22
// 1501 -> 1750,      $0.31,    $0.26,    $0.26,      $0.25,    $0.26,    $0.24,   $0.23
// over 1750,           $0.32,    $0.27,    $0.27,      $0.26,    $0.27,    $0.25,   $0.24

// NOTE:: Mathematically, daily cost for $0.31 30day fee with 10% discount then rounded to nearest $0.0005 should be $0.0095 but an extra "discount" is applied to make it increment in pairs and look pretty 
// See: http://www.neobux.com/forum/?frmid=9&tpcid=109427 

// Monthly Cost, AutoPay
 // $0.20,       $0.0060
 // $0.21,       $0.0060
 // $0.22,       $0.0065
 // $0.23,       $0.0070
 // $0.24,       $0.0070
 // $0.25,       $0.0075
 // $0.26,       $0.0080
 // $0.27,       $0.0080
 // $0.28,       $0.0085
 // $0.29,       $0.0085
 // $0.30,       $0.0090
 // $0.31,       $0.0090
 // $0.32,       $0.0095

  switch(accountType) {
    case 0:
      if(totalRentedRefs < 251) { perAutoPayCost = 0.0075; }
      else if(totalRentedRefs < 1001) { perAutoPayCost = 0.0080; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.0085; }
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.0090; }
      else { perAutoPayCost = 0.0095; }
      break;

    case 1:
      if(totalRentedRefs < 501) { perAutoPayCost = 0.0060; }
      else if(totalRentedRefs < 751) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1001) { perAutoPayCost = 0.0070; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.0075; }
      else { perAutoPayCost = 0.0080; }
      break;

    case 2:
      if(totalRentedRefs < 501) { perAutoPayCost = 0.0060; }
      else if(totalRentedRefs < 751) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.0070; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.0075; }
      else { perAutoPayCost = 0.008; }
      break;

    case 3:
      if(totalRentedRefs < 751) { perAutoPayCost = 0.0060; }
      else if(totalRentedRefs < 1001) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.0070; }
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.0075; }
      else { perAutoPayCost = 0.0080; }
      break;

    case 4:
      if(totalRentedRefs < 501) { perAutoPayCost = 0.0060; }
      else if(totalRentedRefs < 751) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.0070; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.0075; }
      else { perAutoPayCost = 0.0080; }
      break;

    case 5:
      if(totalRentedRefs < 1001) { perAutoPayCost = 0.0060; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.0070; }
      else { perAutoPayCost = 0.0075; }
      break;

    case 6:
      if(totalRentedRefs < 1251) { perAutoPayCost = 0.0060; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.0065; }
      else { perAutoPayCost = 0.0070; }
      break;
  }
  return perAutoPayCost;
}

/** Compares two objects using
 * built-in JavaScript operators. */
function ascend(a, b) {
    if (a < b)
        return -1;
    else if (a > b)
        return 1;
    return 0;
}

/** Returns an object that contains the count, sum,
 * minimum, median, maximum, mean, variance, and
 * standard deviation of the series of numbers stored
 * in the specified array.  This function changes the
 * specified array by sorting its contents. */
function Stats(data) {
    this.count = data.length;

    /* Sort the data so that all seemingly
     * insignificant values such as 0.000000003 will
     * be at the beginning of the array and their
     * contribution to the mean and variance of the
     * data will not be lost because of the precision
     * of the CPU. */
    data.sort(ascend);

    /* Since the data is now sorted, the minimum value
     * is at the beginning of the array, the median
     * value is in the middle of the array, and the
     * maximum value is at the end of the array. */
    this.min = data[0];
    var middle = Math.floor(data.length / 2);
    if ((data.length % 2) != 0) {
        this.median = data[middle];
    }
    else {
        this.median = (data[middle - 1] + data[middle]) / 2;
    }
    this.max = data[data.length - 1];

    /* Compute the mean and variance using a
     * numerically stable algorithm. */
    var sqsum = 0;
    this.mean = data[0];
    for (var i = 1;  i < data.length;  ++i) {
        var x = data[i];
        var delta = x - this.mean;
        var sweep = i + 1.0;
        this.mean += delta / sweep;
        sqsum += delta * delta * (i / sweep);
    }
    this.sum = this.mean * this.count;
    this.variance = sqsum / this.count;
    this.sdev = Math.sqrt(this.variance);
}

/** Returns a string that shows all the properties and
 * their values for this Stats object. */
Stats.prototype.toString = function () {
    var s = 'tu';
    for (var attr in this) {
        if (typeof(this[attr]) != 'function') {
            s += '  ' + attr + ' ' + this[attr];
        }
    }
    return s;
}

function customLogger(logMessage,logType) {
  if(loggingLevel.indexOf(0) >= 0) {
    var override_disableLogging = true; 
  }
  else if(loggingLevel.indexOf(1) >= 0) {
    var override_enableLogging = true; 
  }
  else {
    for (var i = 0; i < loggingLevel.length; i++) {
      if(logType.toString().indexOf(loggingLevel[i]) >= 0) { var showMessage = true; }
    }
  }

  if((showMessage && !override_disableLogging) || override_enableLogging) {
    GM_log('Log Message [type: '+logType+']: \n'+logMessage);
  }
}

function getRenewalCost(renewalPeriod) {
  customLogger('renewalPeriod = ' + renewalPeriod,2);
  switch(renewalPeriod) {
    case 30: return renewCost30; break;
    case 60: return renewCost60; break;
    case 90: return renewCost90; break;
    default: return 0; break;
  }
}

Config = {
  tabs: {},
  data: {},
  callback: null,
  init: function(settings) {
    Config.settings = settings;
  },
  close: function() {
    document.body.removeChild(Config.$('ConfigBodyWrapper'));
    document.body.removeChild(Config.$('ConfigMask'));
    window.removeEventListener('keyup', Config.keyUpHandler, true);
    if(typeof(Config.callback) == 'function')
      Config.callback();
  },
  show: function(callback) {
    Config.settings = typeof(Config.settings) != 'undefined' ? Config.settings : Config.tabs;
    Config.callback = typeof(callback) == 'function' ? callback : null;
    if(typeof(Config.styleDrawn) == 'undefined') {        // apply styling
      GM_addStyle("\
          #ConfigMask { position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: #000; opacity: 0.7; z-index: 9000; } \
          #ConfigBodyWrapper { height: 100%; left: 0; padding: 0%; position: fixed; top: 0; white-space: normal; width: 100%; z-index: 9010;} \
          #ConfigBody * { background: none; border: none; color: #333; font-family: Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 12px; font-weight: normal !important; line-height: 1.2em; margin: 0 !important; padding: 0 !important; text-decoration: none; } \
          #ConfigBody { -moz-border-radius: 5px; background: #f9f9f9; border: 1px outset #333; color: #333; cursor: default; font-family: Verdana, Arial; font-size: 1.2em; height: 80%; margin: 5% auto !important; min-width: 30em; max-width: 55em; overflow: auto; padding: 1em !important; text-align: left; width: 600px; z-index: 9010; } \
          #ConfigBody a { color: #000099 !important; text-decoration: underline; } \
          #ConfigBody strong, #ConfigContentBox strong { font-weight: bold !important; } \
          #ConfigBody h1 { background-color: #999; border-bottom: 1px solid #333; font-size: 1.1em !important; font-weight: bold !important; margin-bottom: 0.75em !important; padding: 0.5em !important; } \
          #ConfigBody h2 { font-weight: bold; margin: 0.5em 1em !important; } \
          #ConfigBody h1 { font-size: 13px; font-weight: bold; color: #fff; text-decoration: none; } \
          #ConfigBody h1 a:hover { text-decoration: underline; } \
          #ConfigBody li { list-style-type: circle; } \
          #ConfigBody p { font-size: 12px; font-weight: normal; margin-bottom: 1em !important; } \
          #ConfigContentPadding { display: block; height: 70%;  margin: 0.5em !important;}\
          #ConfigTabs { line-height: 1.5em !important; margin: 0.5em 0.5em -0.2em 0 !important; text-align: middle; }\
          #ConfigTabs span { -moz-border-radius: 5px 5px 0 0; background-color: #ddd; border: 1px solid #666; cursor: pointer; margin-right: -2px !important; padding: 2px 10px !important; position: relative; top: -2px; }\
          #ConfigTabs span:hover { background-color: #eee; }\
          #ConfigTabs span.active { background-color: #F9F9F9; cursor: inherit; border-bottom: none; font-weight: bold; padding-top: 3px !important; top: -1px; }\
          #ConfigTabs span.active:hover { background-color: #F9F9F9; }\
          #ConfigContentBox { border: 1px inset #666; height: 80%; overflow: auto; padding: 1.5em 1em 1em !important; }\
          #ConfigContentBox table { border-collapse: collapse !important; margin: 0 15px !important; min-width: 85%; }\
          #ConfigContentBox td { font-weight: normal; }\
          #ConfigContentBox input { border: 1px inset #666 !important; width: 4em !important; }\
          #ConfigContentBox td.fieldLabel { font-weight: bold !important; padding-right: 0.5em !important; text-align: right !important; }\
          #ConfigContentBox td select { border: 1px inset #666; min-width: 4em !important; }\
          #ConfigHistory { border: 1px inset #999; margin: 0 1em 1em 1em !important; max-height: 150px; overflow-y: auto; padding: 0 1em 1em !important; width: 448px; } \
          #ConfigHistory ul { margin-left: 2em !important; } \
          #ConfigClose { cursor: pointer; float: right; height: 14px; opacity: 0.5; } \
          #ConfigClose:hover { opacity: 0.9; } \
          #ConfigFooter { border: 1px solid; bottom: 0px; display: block; margin: 3% 5% !important; padding: 1em 2em !important; width: 80%; } \
          #ConfigFooter input { -moz-border-radius: 3px; background: no-repeat 4px center #eee; border: 1px outset #666; cursor: pointer; float: right; padding: 3px 5px 5px 20px !important; margin-left: 0.5em !important; width: 120px; } \
          #ConfigFooter input:hover { background-color: #f9f9f9; } \
          #ConfigFooter select { border: 1px inset #666; }\
          #ConfigContentBox #ConfigFieldTable td { border: 1px solid #555; padding: 3px !important; }"
        );
      if('undefined' !== typeof(Config.css)) { GM_addStyle(Config.css); }
      Config.styleDrawn = true;
    }
    
    // Create and insert config background mask
    // noticeBg is needed because the reduced opacity is inherited by config area if applied to the noticeWrapper instead
    var noticeBg = document.createElement('div'); 
      noticeBg.id = "ConfigMask";
      noticeBg.style.height = '100%';
      noticeBg.style.width = '100%';
    document.body.appendChild(noticeBg);


    // Create config window
    var noticeWrapper = document.createElement('div');
      noticeWrapper.id = "ConfigBodyWrapper";
      
        var notice = document.createElement('div');
          notice.id = "ConfigBody";
        
          // Create heading
          var html = '<h1><img src="' + Config.icons.config + '" align="absmiddle" style="margin-top: -2px;"/>' + 
              (typeof(Config.scriptName) == 'string' ? Config.scriptName + '' : '')+' ' + localString('~Settings~') 
              +'<span><a href="http://www.neobux.com/forum/?frmid=12&tpcid=143545" style="float: right; color: #444499 !important; font-weight: bold !important; font-size: 1.2em;"><small>'
              +localString('MoreScripts')+'</small> Neobux IT</a></span></h1>'

          // Container for settings stuff
          html += '<div id="ConfigContentPadding">';
            
            // Tab bar
            html += '<div id="ConfigTabs">';
            
            // Draw tabs
            var i = 0;
            var firstTabId = "";
            for(var label in Config.settings) {
              var id = 'configTab' + label.replace(/\s/g, '_');
              label = label.replace(' ','&nbsp;');
              html += '<span id="' + id + '">' + label + '</span> '; // Space after </span> is to fix tab-wrapping bug
              firstTabId = (i == 0 ? id : firstTabId);
              i++;
            }
            html += '</div>'
            
            // Draw container for config to be inserted into later
            html += '<div id="ConfigContentBox">';
            html += '</div>';
            
          html += '</div>';
          
          // End actual config stuff
          
          // Create footer 
          html += '<div id="ConfigFooter">'+
                '<input type="button" id="ConfigCloseButton" value="' + localString('SaveSettings') + '" style="background-image: url(' + Config.icons.save + ')"/>'+
                '<span style="font-size: 0.9em; font-style: italics;">' + localString('NoteSave') + '</span>'+
              '</div>';
        
        // End configBody
        html += '</div>';

        notice.innerHTML = html;
      noticeWrapper.appendChild(notice);
    document.body.appendChild(noticeWrapper);

    // Add tab change listeners
    for(var label in Config.settings) {
      // GM_log('label = '+label);
      var id = 'configTab' + label.replace(/\s/g, '_');
      Config.$(id).addEventListener('click', function() { Config.activateTab(this.id); }, false);
    }

    // Add escape key press and other listener
    Config.activateTab(firstTabId);
    window.addEventListener('keyup', Config.keyUpHandler, true);

    Config.$('ConfigCloseButton').addEventListener('click', Config.close, true);
  },
  
  //-------------------------------- "private" methods -----------------------------------------
  activateTab: function(id) {
    // deactivate current tab
    var elems = Config.$('ConfigTabs').getElementsByTagName('span');
    for(var i = 0; i < elems.length; i++) {
      elems[i].className = '';  
    }
    // set current tab
    Config.$(id).className = 'active';
    var key = id.replace(/^configTab/, '').replace(/_/g, ' ');
    var fields = Config.settings[key].fields;
    
    // 
    var html = (typeof(Config.settings[key].html) == 'string' ? Config.settings[key].html : '');
    html += '<table id="ConfigFieldTable">';

      for(var fieldName in fields) {
        var field = fields[fieldName];
        var type = typeof(field.type) != 'string' ? 'html' : field.type;
        var tip = typeof(field.tip) == 'string' ? field.tip : '';

        var width = typeof(fields[fieldName].width) != 'undefined' ? (fields[fieldName].width.toString().match(/em/) ? fields[fieldName].width : (fields[fieldName].width.toString().match(/px/) ? fields[fieldName].width : fields[fieldName].width + 'px')) : false;
        var height = typeof(fields[fieldName].height) != 'undefined' ? (fields[fieldName].height.toString().match(/em/) ? fields[fieldName].height : (fields[fieldName].height.toString().match(/px/) ? fields[fieldName].height : fields[fieldName].height + 'px')) : false;

        var fieldHTML = '';

        switch(type) {
          case 'spacer': 
            html += '<tr title="' + tip + '"><td colspan="2" style="height: ' + height + '; border: 0px none;">';
            break;

          case 'html': 
            html += '<tr title="' + tip + '"><td colspan="2" style="height: ' + height + '; border: 0px none;">';
            html += field.html;
            break;
            
          case 'select': 
            html += '<tr title="' + tip + '"><td colspan="1" class="fieldLabel">' + 
                (typeof(field.label) == 'string' ? field.label : '') + '</td><td style="padding-top: 0px; padding-bottom: 0px;">';
                
            fieldHTML += '<select id="configInput_' + fieldName + '">';
            if(typeof(field.options) == 'undefined') {
              alert('Options Error: ' + fieldName + ' of type "select" is missing the "options" property');
            } 
            else {
              for(var text in field.options) {
                var val = field.options[text];
                fieldHTML += '<option value="' + val + '"' + (Config.get(fieldName) == val ? ' selected' : '') + '>' + text + ' &nbsp;</option>';
              }
            }
            fieldHTML += '</select>';
            break;

          case 'password': 
          case 'text': 
            html += '<tr title="' + tip + '"><td colspan="1" class="fieldLabel">' + 
                (typeof(field.label) == 'string' ? field.label : '') + '</td><td>';

            fieldHTML += '<input id="configInput_' + fieldName + '" value="' + Config.get(fieldName) + '" style="' + (width ? 'width: ' + width + ';' : '') + ' font-family: monospace, courier new;" type="' + type + '"/>';
            break;
            
          case 'checkbox': 
            html += '<tr title="' + tip + '"><td colspan="1" class="fieldLabel">' + 
                (typeof(field.label) == 'string' ? field.label : '') + '</td><td>';

            fieldHTML += '<input id="configInput_' + fieldName + '" type="checkbox" style="position: relative; top: 2px;"' + (Config.get(fieldName) ? 'checked' : '' ) + '/>';
            break;
        }

        html += typeof(fields[fieldName].text) == 'string' ? '<table><tr><td style="border: 0px none; margin: 0px;">' + fieldHTML + '</td><td style="border: 0px none; margin: 0px;"> &nbsp; - ' + (fields[fieldName].text) + '</td></tr></table>' : '';
        html += '</td></tr>';

      }
    html += '</table>';

    // add check for updates
    if(id == "configTabAbout" && typeof(ScriptUpdater) == 'object' && typeof(ScriptUpdater.scriptId) != 'undefined') {
      html += '<p><br/><a href="javascript: void(0)" id="ConfigCheckUpdatesLink">Check for updates</a></p>';
    }

    // Insert config HTML
    Config.$('ConfigContentBox').innerHTML = html;


    // Add event listeners -- will cause the settings to be edited immediately after change
    for(var fieldName in fields) {
      switch(fields[fieldName].type) {
        case 'checkbox': 
          Config.$('configInput_' + fieldName).addEventListener('change', function() {
            Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.checked ? true : false);
          }, false);
          break;
        case 'select': 
          Config.$('configInput_' + fieldName).addEventListener('change', function() {
            Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.value);
          }, false);
          break;
        case 'password': 
        case 'text': 
          Config.$('configInput_' + fieldName).addEventListener('keyup', function() {
            Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.value);
          }, false);
          break;
      }
    }
    
    if(id == "configTabAbout" && typeof(ScriptUpdater) == 'object' && typeof(ScriptUpdater.scriptId) != 'undefined') {
      $('#ConfigCheckUpdatesLink')[0].addEventListener('click', function() { ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion); }, false);
    }
  },
  keyUpHandler: function (e) {
    // 'Escape' closes the config box
    if(e.keyCode == 27) { Config.close(); }
  },
  icons: {
    install: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
    config: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALvSURBVBgZBcFNaNUFAADw3//jbe/t6d6cc2/kUpeXsEgUsSSiKIzAQxDdvCgdulgagmBXLx4K7BgRWamnOgSDIj3EusRangwlbVvOyba25tvH23v/z36/oCxLcOr7uaO48sxA9Vg7LbTTQloUtrKihXUsI8cqVvAtfo4Biix78eDItmPnX90FADaTotFOisZqJx9NUta7udnlDT/+vXkc52KAIsua/T0BmHuSqwSBOCCK6a2E9vSGojBUiTg0WvNUoz74xeTjT0OAPE376zFZwXoSaKU86dLq0OqwssXSRg4uXn/o2Fjd80OVXTFAnqaD23tCm102O7kwDMSIIsKISCAKKBDka36bXnX7YetxDJAnSbNRi7S2Mu1uKQxLUUiYB6KQSCmKUEYW17o+u/lgDadigCxJ9jb7K1qdUgYlUR4IS+RsPfhFliaeGzkhr+SyJBv74aOX/wsB8qS7d6TRazMpBSFREAjWH0lmflV21lR7e/T19fl3acmbAw+9MzT7CQRlWXrr0k+1OArb3104bvKfVKEE6fSEffv2mZ+f12w2hWFodnbW6Oio8fFxRVHUY8i6ya56vSoMKKAkCAi279bpdCwvL5uYmFCr1Rw4cEC73Vav1786c+ZMO4Q86fbFCnFIFAYEoY17tzSiTcPDw+7fv+/1kxe9e/q8R/PzRkZG7N+///Tly5fL+JVz14dw6eizeyyslWYXc/UqnVZLFEWazabh4WG1Kv19lGVgfX3d3Nyc6elpcZ4kb+DEH3dnrG7FNrqlNC8V2UEjG/MGBxeMjY2ZHP/aVFDa8/RuKysr7ty58yUuxHmaHn77tRdqH598CQDkJde+mcKAhYUFRw4f1Ol0zMzMaDQa8F6tVns/ztN0ZmG55drNuwa21Qz0Vw3UezXqvQYGh1y9etUHH5419fukxcVFy2XTrVufl1mW3bxx40YeHDp5ZQjnsBc7sRM7sAONak+lUq1WHKrds7S05M/yyF84efva2Sn4HxcNUm7wsX3qAAAAAElFTkSuQmCC",
    close: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
    uso: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D",
    save: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII%3D",
  },
  getField: function(key) {
    for(var tabName in Config.settings) {
      if(typeof(Config.settings[tabName].fields) == "object") {
        var fields = Config.settings[tabName].fields
        for(var fieldName in fields)
          if(fieldName == key)
            return fields[fieldName];
      }
    }
    return false;
  },
  get: function(key) {
    var field = Config.getField(key);
    key = typeof(Config.prefix) == 'string' ? Config.prefix + key : key;
    switch(field.type) {
      case 'checkbox': 
        if(typeof(field.value) == 'undefined' || !field.value) {
          return (typeof(GM_getValue(key)) != 'undefined' && GM_getValue(key).toString() == "1") ? true : false;  // false by default
        } 
        else {
          return (typeof(GM_getValue(key)) != 'undefined' && GM_getValue(key).toString() == "0") ? false : true;  // true by default
        }
        break;
      case 'select': 
      case 'password': 
      case 'text': 
        return typeof(GM_getValue(key)) == 'undefined' ? (typeof(field.value) != 'undefined' ?  field.value : '') : GM_getValue(key);
        break;
      default: 
        return typeof(GM_getValue(key)) == 'undefined' ? false : GM_getValue(key);
   }
  },
  set: function(key, value) {
    key = typeof(Config.prefix) == 'string' ? Config.prefix + key : key;  
    GM_setValue(key, value);
  },
  $: function(id) {
    return document.getElementById(id);
  },
};

function insertLogo() {
  var row = document.evaluate(
    "//body/div[1]/table[1]/tbody/tr/td[@align='right']/table/tbody/tr",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (row != null) {
    var lastColumn = row.childNodes[row.childNodes.length - 1];
    var td = document.createElement("td");
    td.setAttribute("valign", "bottom");
    td.setAttribute("style", "padding-bottom: 3px;");
    row.insertBefore(td, lastColumn);
    var img = document.createElement("img"); 

    img.id = "neobuxplus";
    img.src = "data:image;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABDdJREFUeNpiEGZnYFhSn7GHYUZZ+mMWBob/AAHEoC3Kx1AQHczAeO3q5f/KRw8zAAQQo7WmCoOKqtx/aTl1IC3LwPSHU4AhQF+RQfjkYQb+T5cZAAIARAC7/wMWFxoALhYHHggND/EA//4AAI5jRf8AAgT/HRwZ/5WAabACE/P3AOu4tACsqqoA5tnZTwQyTkzzh2tqDRYdHADkEQpVAgCEAHv/AQ8HAACDY1KqDwD6IvwSFTPb6u0AHBIiuBwQBv1mhpZMAE9HPhGqf2768eXj/92wsP8nGBb/5eDg/+iZlv9mXVNUBO719QsGDwkEOi8sAB8jEwDb9fQAWTMxAB1HPgAvHSI/ARAEAAA0NjMAQEBDMy0I+cbW6+IG6PAFbPv8/K2iqsLoAgAIAff+AxUMBwAMAQUABAD8AJR4aKwOFhDb+e3w6DU4NgDz8fAABPr8/AG1elL+zewGzNnm3jRMMChTIQkJmBAaHQvQzc9eApmAdcuw1OMAlrjGNPL9FABZf5cA4PT5aCUmGF0kJhsAAsHZ4ZJXIDcAtbO4AOHNygC5h4MAiZKaAPza5Pzf6usJAgnv5aEnAQQA2+HeANrc4wAQBgMA2+PiAAbl3gSRcXK1AKWOgsduaFv/MwwI/4tbPv8AAwf/PxAL/5+GducoJB4MA/n+BMGIPhduCv0PANzg5AA9BgkAQ2VSAEM/PQyptLd7AQ0AAABcYVkfDAcDOxkL+6UfChb+o8LJIcfS4eL49QAAAlRIN69JxgEcwL8/Xx81p4aK783p2MjVyHSDpjI65daKOgQjCnoZFR1i0KFTLyB1GfQfDDoIBb2ti6uNDSsaY7YHZblMUbdSdKmZOR+d2pPdP8cP+b+CJRyYjN1qHSW0J39svaP2K/W3vCMrNUFTv8djYRTr6rNLn0fD6/TqmZMnEMsXSSgUYgUCPohKIcPEqOPSmJk/u5JIw2y2IlenEN3agb2nD8IOCsU3Yew4t6MXZocbrUIRd+75RjbiqU/cg/0WuIYc1ymp1LEvXek0E0CmNGI7mQEdj4HejIIp1+C2DoD/vYTM3GtEdrOQHLAxkWwuwLl61pvgtSrXarEULt+fQbCnF9P+Z/DPB6D+S1DJFhB48RJPE9/waOMLLrwKwNQSQ1TL3fBdufiWPJw6/0DD/r67s9eAmt6GYmgYVbEUa8F5RFsMlmN5mEFwc/IcLHIF8sFFwH0Y0i4R6LJgmjidgzCoDZLj9v7HHGFrKvx8AZO7dSxqRVCpJGhEfgKUEJ46gzlKAvn4MSh5vIWZJ29OFytFhtss/0IymW7bLFrDeJ/K5TnlpVIDNrbE45AkoZDXKwGrHk3vGHtosLsmaVT/0Pm2PxT++p7ii1mi4APtNuByD0Mml0OvMyG4FoTnqPOISSa5LRKJuzLVhm9p+cOqkLSh0WjxcT2BUoEBl8vBP2Iqng+e/R48AAAAAElFTkSuQmCC";
    img.width = "16";
    img.height = "16";
    img.border = "0";

    img.style.cursor = "pointer";
    img.alt = "NeoBux BR Greasemonkey Script Preferences";

    img.addEventListener("click", function() { showSettingsEditor(); }, false);

    td.appendChild(img);

    var script = document.createElement("script");
    script.textContent = "mk_tt('neobuxplus', 'bm', 'NeoBux IT<br/>Opzioni');";
    row.insertBefore(script, lastColumn);
    if (toBool(manipulatePrefs("firstRun", true, "get") === true)) {

      // Code to run when the user first installs the script.
      // Add the arrow pointing to the settings editor.
      var arrowImg = document.createElement("img");

      arrowImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAQCAYAAAGthlVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcpJREFUeNpiuCXPw8B0+scfBoAAYrguyyXFdPXX/6cAAcSwQ4a3e0tM8H+GTmF2hqMyXP8BAojxpgynACMz8wemW3Ye7+/+Y+pjXCPO+f8nw39GJklWRoYnf/4zAAQQ43kpDoY38dn/GdnYGIRn9zOyPP3PyPBj1xYGBkYgDWSzPAYqU3z+mIGRgYHhHpDN9PTPPwZZFkYwfgJkAwQQI8g1z7n5V0l9/RjG9JyBKY+9qCb0KTNbBct7IfFYjtMnGH4IigQzMbx40vLt6kUGhqdPWpm+/fvP8O/2TYZv//8xMH3/x8DAz8zIAKKZvv3/z8DHxMDwHUgzfQdiISagDJAGCNAB2fMQEIRBePZ2jxMkVCjoFBKJRilRXmj8OoXSP1D5aOTUOh+JkCgVhMgdTriz5q7YbDLzPrvvDNaVNLZFE4tmdegM+tppNUabgox14ZQs223b00ytDv32IawUnocdMvNxT2mImZqPO/fLeWLmcvi6LqzVsgvDmKgrf9VCJfVxj0AqIAzxhEy+qCuXW0gmz/uvuAHNc6cW8FYeQySolqURDxHAKfyxt4ikmWaJWa5v0oiIKOCDNE1OC3z8UN8CvvCl6f3w8Uj+AesHuQv9i+2ZAAAAAElFTkSuQmCC";
      arrowImg.setAttribute("style", "position: relative; right: 12px; top: 24px;");

      td.appendChild(arrowImg);
    }
    else {
      td = document.createElement("td");
      td.innerHTML = "&nbsp;";
      row.insertBefore(td, lastColumn);
    }
  }
}

insertLogo();

if (toBool(manipulatePrefs("firstRun", true, "get") === true)) {
  // code to run when the user first installs the script
  alert('Neobux IT:\ Grazie per aver installato lo script per Greasemonkey Neobux IT .');

  alert('Neobux IT:\ Rispondi alle tre domande, questo serve per inpostare lo script, \ in seguito potrai modificare le tue risposte e tutte le altre impostazioni dal menù, che si trova in alto a destra dello schermo, accanto l icona STAT \ (indicato dalla freccetta rossa, che scompare quando si esce da questa pagina)\n\n');

  var renewalLength = prompt('Neobux IT:\Scrivi in quanti giorni rinnovi i tuoi referenti..\nNOTA: Inserisci un solo parametro - 15 o 30 o 60 o 90 o 150 o 240');
  if(renewalLength !== null) {
    renewalLength = parseInt(renewalLength,10);
    if (renewalLength === 15 || renewalLength === 30 || renewalLength === 60 || renewalLength === 90 || renewalLength === 150 || renewalLength === 240) { 

      manipulatePrefs('renewalPeriod',parseInt(renewalLength,10),'set'); 
    } else { 
      alert('Neobux IT Errore:\nIl valore non è corretto. La data di rinnovo predefinita è ipostata a 90 giorni. \nPer modificare questo parametro entrare nel menù impostazioni.');
    }
  }

  var rentedRefs = prompt('Neobux IT:\nQuanti referenti **AFFITTATI** hai?\ Se si seleziona il tasto cancella, lo script li troverà in automatico \nla prossima volta che verrà visitata la pagina dei referenti in affitto.');
  if(rentedRefs !== null) { manipulatePrefs('numberOfRentedRefs',parseInt(rentedRefs),'set'); }

  var directRefs = prompt('Neobux IT:\nQuanti referenti **DIRETTI** hai?\ Se si seleziona il tasto cancella, lo script li troverà in automatico \nla prossima volta che verrà visitata la pagina dei referenti in affitto.');
  if(directRefs !== null) { manipulatePrefs('numberOfDirectRefs',parseInt(directRefs),'set'); }
  

  // Inform the script that the initial setup is complete.
  manipulatePrefs("firstRun", false, "set"); 
}

//DEFINE Classes used by the Script ::
var currentPage = new function () {
  // Information about the page currently being viewed:
  this.URL = document.location.href;
  this.name = getCurrentPage('location');
  this.language = getCurrentPage('language');
}

// Store how large the graphs are expected to be
// Recent changes to graphs mean that those that show
// click data are only 10-days long
var graphSettings = new function (getSet) {
  if(!getSet) { var getSet = 'get'; }
  this.refGraphLength = manipulatePrefs('refGraphLength',10,getSet);
  this.regularGraphLength = manipulatePrefs('regularGraphLength',15,getSet);
}

// Information about the users account
var myAccount = new function () {
  this.name = document.getElementById('t_conta').textContent;
  this.rentedRefCount = parseInt(getNumberOfRefs('Rented'));
  this.directRefCount = parseInt(getNumberOfRefs('Direct'));
  this.getTotalRefCount = this.rentedRefCount + this.directRefCount;
  this.accountType = parseInt(getAccountType());
  this.autopayLimit = getAutoPayLimit(this.accountType);
  this.autopayCost = getAutoPayCost(this.accountType);
  this.recycleCost = getRecycleCost(this.accountType);
  this.renewalFee = function (renewalPeriod) { return getRenewalFees(renewalPeriod); }
  this.goldenPackCost = getGoldenPackCost(this.accountType);

  if(this.accountType == 6) { this.ownClickValue = 0.02; }
    else { this.ownClickValue = 0.01; }
  if(this.accountType == 0) { this.referralClickValue = 0.005; }
    else { this.referralClickValue = 0.01; }

  if (testing) { this.accountType = 6; } // For testing ultimate only features


  // This will later be used to get & store a local copy of user statistics.
  // this.avgSpentOnRecycles = the average amount spent on recycling each day
  this.stats = new function (getSet) {
    if(!getSet) { var getSet = 'get'; }
    // TODO: Fetch this value automatically
    this.avgSpentOnRecycles = 2.608;
  }

  // Get user preferences
  this.preferences = new function (getSet) {
    if(!getSet) { var getSet = 'get'; }
    
    // Script Settings
    this.scriptLanguage = manipulatePrefs('scriptLanguage','PT',getSet);
    this.updateFrequency = manipulatePrefs("updateFrequency",120,getSet);
    
    // Referral Counts
    this.overrideRentedReferralCount = toBool(manipulatePrefs('overrideRentedReferralCount',false,getSet));
    this.manualRentedReferralCount = manipulatePrefs("manualRentedReferralCount",0,getSet);
    this.overrideDirectReferralCount = toBool(manipulatePrefs('overrideDirectReferralCount',false,getSet));
    this.manualDirectReferralCount = manipulatePrefs("manualDirectReferralCount",0,getSet);
    
    // Flags
    this.textifyFlag = toBool(manipulatePrefs('textifyFlag',false,getSet));
    this.textifyFlag_prefix = manipulatePrefs('textifyFlag_prefix',' | ',getSet);
    
    // Account Settings
    this.renewalPeriod = manipulatePrefs('renewalPeriod',90,getSet); // 30days | 60days (equiv. of autopay) | 90days
    
    // Flag column
    this.flag_shrinkContents = toBool(manipulatePrefs('flag_shrinkContents',false,getSet));
    
    // Referral Name column
    this.referralName_shrinkContents = toBool(manipulatePrefs('referralName_shrinkContents',false,getSet));
    
    // Owned Since column:
    this.referralSince_numerise = toBool(manipulatePrefs('referralSince_numerise',true,getSet));
    this.referralSince_fullerTimers = toBool(manipulatePrefs('referralSince_fullerTimers',true,getSet));
    this.ownedSinceTimer_shortFormat = toBool(manipulatePrefs('ownedSinceTimer_shortFormat',true,getSet));
    this.referralSince_replace = toBool(manipulatePrefs('referralSince_replace',true,getSet));
    this.ownedSince_shrinkContents = toBool(manipulatePrefs('ownedSince_shrinkContents',false,getSet));
    
    // Next Payment column
    this.nextPayment_shrinkContents = toBool(manipulatePrefs('nextPayment_shrinkContents',false,getSet));
    
    // Last Click column:
    this.lastClick_numerise = toBool(manipulatePrefs('lastClick_numerise',true,getSet));
    this.lastClick_fullerTimers = toBool(manipulatePrefs('lastClick_fullerTimers',true,getSet));
    this.lastClickTimer_shortFormat = toBool(manipulatePrefs('lastClickTimer_shortFormat',false,getSet));
    this.lastClick_replace = toBool(manipulatePrefs('lastClick_replace',false,getSet));
    this.lastClick_replaceNilClicks = toBool(manipulatePrefs('lastClick_replaceNilClicks',false,getSet));
    this.lastClick_shrinkContents = toBool(manipulatePrefs('lastClick_shrinkContents',false,getSet));
    
    // Total Clicks column
    this.totalClicks_shrinkContents = toBool(manipulatePrefs('totalClicks_shrinkContents',false,getSet));

    // Average column
    this.exactAverage_show = toBool(manipulatePrefs('exactAverage_show',false,getSet));
    this.exactAverage_seperator = manipulatePrefs('exactAverage_seperator',' | ',getSet);
    this.exactAverage_replace = toBool(manipulatePrefs('exactAverage_replace',false,getSet));
    this.columnPrefix_Average = manipulatePrefs('columnPrefix_Average','',getSet);
    this.average_shrinkContents = toBool(manipulatePrefs('average_shrinkContents',false,getSet));
    
    // Profit Column
    this.showColumn_Profit = toBool(manipulatePrefs('showColumn_Profit',true,getSet));
    this.includeRecycleCostInProfitColumn = toBool(manipulatePrefs('includeRecycleCostInProfitColumn',false,getSet));
    this.columnPrefix_Profit = manipulatePrefs('columnPrefix_Profit','$',getSet);
    this.profitColumn_shrinkContents = toBool(manipulatePrefs('profitColumn_shrinkContents',false,getSet));

    
    // Time Periods for 'smaller' 10day graphs
    this.timePeriod_s1 = manipulatePrefs('timePeriod_s1',5,getSet);
    this.timePeriod_s2 = manipulatePrefs('timePeriod_s2',10,getSet);
    this.timePeriod_s3 = manipulatePrefs('timePeriod_s3',graphSettings.refGraphLength,getSet);

    //Time Periods for larger 15day graphs
    this.timePeriod_1 = manipulatePrefs('timePeriod_1',5,getSet);
    this.timePeriod_2 = manipulatePrefs('timePeriod_2',10,getSet);
    this.timePeriod_3 = manipulatePrefs('timePeriod_3',graphSettings.regularGraphLength,getSet);

    //Time Period for 'recent' section of the Referral statistics sidebar
    this.timePeriod_recent = manipulatePrefs('timePeriod_recent',10,getSet);
    
    //Time Period for the 'average1' column (previously the A10 column)
    this.timePeriod_average1 = manipulatePrefs('timePeriod_average1',10,getSet);
    
    //Time Period for the 'average2' column (previously the A7 column)
    this.timePeriod_average2 = manipulatePrefs('timePeriod_average2',7,getSet);
  }

  // Get Preferences for Ultimate-Only Features
  this.ultimatePreferences = new function (getSet) {
    if(!getSet) { var getSet = 'get'; }
   
    this.showRecentAverage = toBool(manipulatePrefs('showRecentAverage',true,getSet));
    this.minigraphAvgInterval = manipulatePrefs('minigraphAvgInterval',5,getSet);

    // 'clickText' column
    this.showColumn_clickText = toBool(manipulatePrefs('showColumn_clickText',true,getSet));
    this.columnPrefix_clickText = manipulatePrefs('columnPrefix_clickText','',getSet);    
    this.clickText_shrinkContents = toBool(manipulatePrefs('clickText_shrinkContents',false,getSet));
    
    // 'average1' column (previously the A10 column)
    this.showColumn_Average1 = toBool(manipulatePrefs('showColumn_Average1',true,getSet));
    this.columnPrefix_Average1 = manipulatePrefs('columnPrefix_Average1','',getSet);
    this.average1_shrinkContents = toBool(manipulatePrefs('average1_shrinkContents',false,getSet));
    
    // 'average2' column (previously the A7 column)
    this.showColumn_Average2 = toBool(manipulatePrefs('showColumn_Average2',true,getSet));
    this.columnPrefix_Average2 = manipulatePrefs('columnPrefix_Average2','',getSet);
    this.average2_shrinkContents = toBool(manipulatePrefs('average2_shrinkContents',false,getSet));
    
    // Standard Deviation (SDEV / SD) Column
    this.showSDEVColumn = toBool(manipulatePrefs('showSDEVColumn',true,getSet));
    this.columnPrefix_SD = manipulatePrefs('columnPrefix_SD','',getSet);
    this.SD_shrinkContents = toBool(manipulatePrefs('SD_shrinkContents',false,getSet));

    // Ratio of Standard deviation and Average (RSA) Column
    this.showColumn_RSA = toBool(manipulatePrefs('showColumn_RSA',true,getSet));
    this.columnPrefix_RSA = manipulatePrefs('columnPrefix_RSA','',getSet);
    this.RSA_shrinkContents = toBool(manipulatePrefs('RSA_shrinkContents',false,getSet));
  }
};


if(myAccount.preferences.overrideRentedReferralCount) {
  var numberOfRentedReferrals = parseInt(myAccount.preferences.manualRentedReferralCount,10);
} 
else {
  var numberOfRentedReferrals = parseInt(myAccount.rentedRefCount,10);
}

if(myAccount.preferences.overrideDirectReferralCount) {
  var numberOfDirectReferrals = parseInt(myAccount.preferences.manualDirectReferralCount,10);
} 
else {
  var numberOfDirectReferrals = parseInt(myAccount.directRefCount,10);
}


// mathematical function.. calc num^2
Math.square = function (num) {
  return num*num;
};


// Functions used by script::
function getDaysTilPaidOwnRecycle(indivAvg,currentProfit,expensesPerRefPerDay) {
  var incomePerRefPerDay = indivAvg * myAccount.referralClickValue;
  var dayCounter = 0;
  var indivProfit = new Array();
  var dayLimit = 30;
  var profitNeeded = myAccount.recycleCost - currentProfit;

  // Pre-Calculate the amount of profit that will be made after dayCounter days at indivAvg clicks per day
  do {
    dayCounter++;
    indivProfit[dayCounter] = dayCounter * (incomePerRefPerDay - expensesPerRefPerDay);
  } while (dayCounter < dayLimit); 
  
  
  // If currentProfit is less than the cost of recycling, return number of days until currentProfit > recycleCost
  // Else return 'N/A' to signify that the referral has already generated enough profit to pay for its own recycle
  if(myAccount.recycleCost > currentProfit) {
    // Find the point where projected individual profit will be equal to or greater than 
    // the amount of profit needed to pay for its own recycle
    var numberOfDays = 1;
    while(indivProfit[numberOfDays] < profitNeeded) { numberOfDays++; } 
    
    // Check whether the numberOfDays is unreasonably large
    // If it is unreasonably large (default max: 30 days), then return a message saying this
    if(numberOfDays > dayLimit) { numberOfDays = localString('Morethan') + ' ' + dayLimit + ' ' + localString('days') ; }
    return numberOfDays;
  }
  else {
    return '0';
  }
}


// Calculate the number of days since the date 'tmp'
// Will work with the words 'today' & 'yesterday' too
function NumDaysSince (longDate,detail,fullerTimer,shortFormat,column) {
  if(!shortFormat) { var shortFormat = false; }
  
  // var fullerSinceTimer = myAccount.preferences.fullerSinceTimers;
  var fullerSinceTimer = fullerTimer;
  
  // Clean the input string and split it to [0] = date, [1] = time
  var longDate = longDate.replace('&nbsp;','').split(' ');
  
  // If longDate is a date with time (eg, 'owned since' column), longDate[1] == time
  // If longDate is just a date (eg, 'last click' column), longDate.length == 1
  if(longDate.length > 1) {
    var tt = longDate[1].split(":");
  } 
  else {
    var tt = new Array(2);
    tt[0] = "00";
    tt[1] = "00";
  }


  if(longDate[0].match(neobuxString('today'))) {
    var Since = new Date( Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1] );
  } 
  else if(longDate[0].match(neobuxString('yesterday'))) {
    var Since = new Date( Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1] );
  } 
  else {
    var Since = new Date(longDate[0] + (longDate.length > 1 ? " " + longDate[1] : ""));
  }

  var timeElapsed = '';
  var dateDiff = (Today - Since) / MSPD;
  var wholeDaysOwned = Math.floor(dateDiff);
  var wholeHoursOwned = Math.floor((dateDiff - wholeDaysOwned) * 24);
  var wholeMinsOwned = Math.floor((((dateDiff - wholeDaysOwned) * 24) - wholeHoursOwned) * 60 );


  if(fullerSinceTimer || detail == 'decimal') {
    if(detail == 'decimal') {
      timeElapsed = dateDiff;
    }
    else if(detail != 'days' && detail != 'hrs' && detail != 'mins' && detail != 'wholeDays' && detail != 'decimal') {
      GM_log('Variable "detail" not valid');
    }
    else {
      if(!shortFormat) {
        var day_text = ' '+localString('day')+'';
        var days_text = ' '+localString('days')+'';
        var hr_text = ' '+localString('hr')+'';
        var hrs_text = ' '+localString('hrs')+'';
        var min_text = ' '+localString('min')+'';
        var mins_text = ' '+localString('mins')+'';
      }
      else {
        var day_text = 'd';
        var days_text = 'd';
        var hr_text = 'h';
        var hrs_text = 'h';
        var min_text = 'm';
        var mins_text = 'm';
      }
      
      var spacer = ', ';
      
      // Chrome bug: ""timeElapsed  +="" must be used repeatedly, else will append values in the wrong order
      // eg, (d0, 2h, 48m) instead of (0d, 2h, 48m)
      
      if(detail == 'days' || detail == 'hrs' || detail == 'mins') {
        if(wholeDaysOwned != 1) { timeElapsed  += wholeDaysOwned; timeElapsed  += days_text; } 
        else { timeElapsed  += wholeDaysOwned; timeElapsed  += day_text; }
      }
      if(detail == 'hrs' || detail == 'mins') {
        if(wholeHoursOwned != 1) { timeElapsed  += spacer; timeElapsed  += wholeHoursOwned; timeElapsed  += hrs_text; } 
        else { timeElapsed  += spacer; timeElapsed  += wholeHoursOwned; timeElapsed  += hr_text; }
      }
      if(detail == 'mins') {
        if(wholeMinsOwned != 1) { timeElapsed  += spacer; timeElapsed  += wholeMinsOwned; timeElapsed  += mins_text; } 
        else { timeElapsed  += spacer; timeElapsed  += wholeMinsOwned; timeElapsed  += min_text; }
      }
    }
  }

  if((!fullerSinceTimer || detail == 'wholeDays') && detail != 'decimal') {
    timeElapsed = Math.floor(dateDiff);
  }

  return timeElapsed;
}

function showSettingsEditor() {
  Config.show();
}

function localString(key,text) {
  var string;
  var language = currentPage.language; //myAccount.preferences.scriptLanguage;
  
  if('undefined' !== typeof scriptLangStrings[language]) {
    string = scriptLangStrings[language][key]; 
  }
  else if('undefined' !== typeof scriptLangStrings['PT']) {
    GM_log('Error getting language string. Defaulting to Portuguesw.\nRequested key: '+key); 
    string = scriptLangStrings[language][key]; 
  }
  else {
    GM_log('Error getting language string.\nRequested key: '+key); 
    return key;
  }

  if (text) {
    string = string.replace('%s', text); 
  }

  return string;
}

function neobuxString(key) {
  var pageLanguage = currentPage.language; //myAccount.preferences.neobuxLanguage;

  if('undefined' !== typeof neobuxLangStrings[pageLanguage]) {
    return neobuxLangStrings[pageLanguage][key];
  }
  else if('undefined' !== typeof neobuxLangStrings['PT']) {
    GM_log('Error getting neobux string. Defaulting to Portuguese.\nRequested key: '+key); 
    return neobuxLangStrings['PT'][key];
  }
  else {
    GM_log('Error getting neobux string.\nRequested key: '+key); 
    return key;
  }
}


// Object that will hold the data about the current graph
function graphProperties(values,totals) {
  this.value = new function () {
    var i = 1; var tmp = [0]; 
    do{ 
      tmp[i] = values[i-1]; 
      if(isNaN(tmp[i]) || !isFinite(tmp[i])) {
        tmp[i] = -1; 
      }
    } while(i++ < values.length); 
    return tmp; 
  };

  this.totals = new function () {
    var i = 1; var tmp = [0] 
    do{ 
      tmp[i] = tmp[i-1] + parseFloat(values[i-1]);
      if(isNaN(tmp[i]) || !isFinite(tmp[i])) {
        tmp[i] = -1; 
      }
    } while(i++ < values.length); 
    return tmp;
  };
  
  this.today = values[0];
  this.yesterday = values[1];
  this.recent = totals[myAccount.preferences.timePeriod_recent-1];
  
  this.mean = new function () { 
    var i = 1; var tmp = [0]; 
    do{
      tmp[i] = totals[i-1] / (i);
      if(isNaN(tmp[i]) || !isFinite(tmp[i])) {
        tmp[i] = -1; 
      }
      customLogger('i = '+i+'\n'+
      'totals[i] = '+totals[i]+'\n'+
      'totals[i-1] = '+totals[i-1]+'\n'+
      'totals[i-2] = '+totals[i-2]+'\n'+
      'tmp[i] = '+tmp[i],12);

    } while(i++ < totals.length); 
    return tmp;
  };

  this.variance = new Stats(values).variance;
  this.sdev = new Stats(values).sdev;


    customLogger('values = '+values+'\n'+
    'totals = '+totals+'\n'+
    'this.today = '+this.today+'\n'+
    'this.yesterday = '+this.yesterday+'\n'+
    'this.value = '+this.value+'\n'+
    'this.totals = '+this.totals+'\n'+
    'this.mean = '+this.mean+'\n'+
    'this.variance = '+this.variance+'\n'+
    'this.sdev = '+this.sdev+'\n'+
    'totals.length = '+totals.length+'\n'+
    'this.value.length = '+this.value.length,[7,10,12]);
}

var MSPD = 86400000; //MilliSeconds Per Day
var Today = new Date();
var Yesterday = new Date();
Yesterday.setDate(Today.getDate() - 1);

var today = new function () {};
var yesterday = new function () {};
var recent = new function () {};

var startTime_atSWITCH = new Date().getTime();
var timer_getDaysTilPaidOwnRecycle = new Array();

// var img_yellowBackground = 'http://img200.imageshack.us/img200/5423/yellowbg.png';
// var img_redBackground = 'http://img268.imageshack.us/img268/1234/redbg.png';
// var img_greenBackground = 'http://img51.imageshack.us/img51/3718/greenbgv.png';
// var img_grayBackground = 'http://img199.imageshack.us/img199/9953/graybg.png';
// var img_statSidebarBackground = 'http://img24.imageshack.us/img24/326/statbgtaller.png';
// var img_statSidebarBackground_minimal = 'http://img31.imageshack.us/img31/3769/statbgminimal.png';

// data: URLs for background images - prevents needing to be reliant upon imageshack 
// I'm unsure of speed benefits - fewer HTTP requests vs larger .js and lack of cacheing
var img_yellowBackground = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAATCAYAAAC6PNwaAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFDxMvJrcX2NgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAQElEQVQI12P882z5fwYGBgaWv9/uMkAYf35AGb9/Qhh/4CJ/fsKkfqBLEaX4J2ErYIr///8NYfz795+BgYGBAQCdpjiwzLjePgAAAABJRU5ErkJggg==';
var img_redBackground = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAATCAYAAABRC2cZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFDxQaKhnfQMAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAL0lEQVQI12P4f2zff6Z/L58xMP399YuB6e+vn3AWjPsHlwROdQx//jAw/fv/nwEAnxA3fzsYxb4AAAAASUVORK5CYII=';
var img_greenBackground = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAATCAYAAABRC2cZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFDxMwFyuT1nwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAPUlEQVQI12O48mzhf6Z3X+8wMP3+/YOB6fefH8isX39+MjD9/v0dKgbhoin5jRD7DlXy998vBqb///4zAACOjzgn5DtdSQAAAABJRU5ErkJggg==';
var img_grayBackground = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAdCAYAAABrAQZpAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFDxQUDrtfiZ8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAUElEQVQI10WMIQ6AQBADJ/0yFslfCY5wAsS2i7mAqZmZsqxba9wPAubEQeWgqkJxI8eoKig2cjLBn+3HgfqT20HdQS6jTmZGg5Ka8n8wrpMX+VxBlx4CdKwAAAAASUVORK5CYII=';
var img_statSidebarBackground_smaller = 'data:image/png;base64,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';
var img_statSidebarBackground = 'data:image/png;base64,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';
var img_statSidebarBackground_minimal = 'data:image/png;base64,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';


// Make spaces etc appear properly without needing to use &nbsp;

//// SETTINGS EDITING / CONFIG br


switch(currentPage.language) {
  case 'EN':
  if ( currentPage.language == 'EN' ) {
  Config.scriptName = "Neobux IT";
  Config.tabs = {
    "Dettaglio conto":{
      html:'<p>Questa pagina è esclusivamente a scopo informativo, serve per mostrare quello che legge lo script sul tuo conto. Questi parametri non possono essere modificati.</p>',
      fields:{
        html:{
          type:"html",
          html:"<table style='border-collapse: collapse;'>"+
            "<tr><td>Tuo nome: </td><td style='font-weight: bold !important;'>" + myAccount.name + "</td></tr>" +
            "<tr><td>Tipo di conto: </td><td style='font-weight: bold !important;'>" + getAccountType(true) + "</td></tr>" +
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "<tr><td>Referenti noleggiati: </td><td style='font-weight: bold !important;'>" + myAccount.rentedRefCount + "</td></tr>" +
            "<tr><td>Referenti diretti: </td><td style='font-weight: bold !important;'>" + myAccount.directRefCount + "</td></tr>" +
            "<tr><td>Totale referenti: </td><td style='font-weight: bold !important;'>" + myAccount.getTotalRefCount + "</td></tr>" +
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +
            "<tr><td>Il tuo limite per l'autopay: (giorni): </td><td style='font-weight: bold !important;'>" + myAccount.autopayLimit + "</td></tr>" +
            "<tr><td>Il tuo costo per l'autopay: </td><td style='font-weight: bold !important;'>$" + myAccount.autopayCost + "</td></tr>" +
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "<tr><td>Valore dei tuoi clik: </td><td style='font-weight: bold !important;'>$" + myAccount.ownClickValue + "</td></tr>" +
            "<tr><td>Valore clik referenti: </td><td style='font-weight: bold !important;'>$" + myAccount.referralClickValue + "</td></tr>" +
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +
          "</table>",
        }
      },
    },
    "Impostazioni conto":{
      /*html:'<p>These settings are related to how you choose to manage your account /*and what the script has stored regarding your account.</p>',*/
      html:'<p>Tali impostazioni servono per poter gestire al meglio il tuo conto.</p>',
      fields:{
        renewalPeriod:{
          type:"select",
          label:"Periodo di rinnovo",
          options:{
             "15":"15",
             "30":"30",
             "60":"60",
             "90":"90",
             "150":"150",
             "240":"240",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Il numero di giorni per rinnovare.<br>Raccomandato: 240 giorni, autopay disattivato.<br>15 giorni, 30 giorni, 60 giorni [Con autopay attivato], 90 giorni, 150 giorni, 240 giorni</font>',
          value:myAccount.preferences.renewalPeriod,
        },
        spacer_1: {
          type:"spacer",
          height:"15px",
        },
        overrideRentedReferralCount:{
          type:"checkbox",
          label:"Cancella",
          text: '<font style="font-size: x-small; font-style: italic;">Vuoi sostituire i referenti noleggiati che lo script penza che hai?</font>',
          value: myAccount.preferences.overrideRentedReferralCount,
        },
        manualRentedReferralCount:{
          type:"text",
          label:"Referenti noleggiati",
          text: '<font style="font-size: x-small; font-style: italic;">Inserisci i tuoi referenti noleggiati.</font>',
          value: myAccount.preferences.manualRentedReferralCount,
        },
        spacer_2: {
          type:"spacer",
          height:"15px",
        },
        overrideDirectReferralCount:{
          type:"checkbox",
          label:"Cancella",
          text: '<font style="font-size: x-small; font-style: italic;">Vuoi sostituire i referenti diretti che lo script penza che hai?</font>',
          value: myAccount.preferences.overrideDirectReferralCount,
        },
        manualDirectReferralCount:{
          type:"text",
          label:"Referenti diretti",
          text: '<font style="font-size: x-small; font-style: italic;">Inserisci i tuoi referenti diretti.</font>',
          value: myAccount.preferences.manualDirectReferralCount,

        },
      },
    },
    "Lista preferenze":{
      html:"<p>Questa impostazione viene utilizzata per controllare ciò che accade nelle pagine degli elenchi di riferimento.</p>",
      fields:{
        header_refFlags: {
          type:"html",
          html:"<p><b>Preferenza bandiere:</b></p>",
        },
        textifyFlag:{
          type:"checkbox",
          label:"Colore bandiera",
          text: '<font style="font-size: x-small; font-style: italic;">Per cambiare colore alle bandiere<br>R = rosso, O = Arancione, Y = Giallo, G = Verde, W = Bianco</font>',
          value: myAccount.preferences.textifyFlag,
        },
        textifyFlag_prefix:{
          type:"text",
          label:"Separatore",
          text: '<font style="font-size: x-small; font-style: italic;">Per separare la bandiera con il testo</font>',
          value: myAccount.preferences.textifyFlag_prefix,
        },
        flag_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della bandiera risulta ridotto</font>',
          value: myAccount.preferences.flag_shrinkContents,
        },
        header_referralNameColumn: {
          type:"html",
          html:"<br><p><b>Preferenza nome colonna:</b></p>",
        },
        referralName_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.preferences.referralName_shrinkContents,
        },
        header_ownedSinceColumn: {
          type:"html",
          html:"<br><p><b>Proprietà della colonna:</b></p>",
        },
        referralSince_numerise:{
          type:"checkbox",
          label:"Numerico:",
          text: '<font style="font-size: x-small; font-style: italic;">Se SI: visualizza la data in formato giorno/ore/minuti, Se NO: le seguenti impostazioni vengono ignorate.</font>',
          value: myAccount.preferences.referralSince_numerise,
        },
        referralSince_fullerTimers:{
          type:"checkbox",
          label:"Completo:",
          text: '<font style="font-size: x-small; font-style: italic;">Impostazione formato data: Se SI: giorni/ore/minuti, Se NO: giorni</font>',
          value: myAccount.preferences.referralSince_fullerTimers,
        },
        ownedSinceTimer_shortFormat:{
          type:"checkbox",
          label:"Formato ridotto:",
          text: '<font style="font-size: x-small; font-style: italic;">Impostazione formato data: Se SI: D/H/m. Se NO: giorno/ore/minuti</font>',
          value: myAccount.preferences.ownedSinceTimer_shortFormat,
        },
        referralSince_replace:{
          type:"checkbox",
          label:"Numeri/testo:",
          text: '<font style="font-size: x-small; font-style: italic;">Impostazione formato data: Se SI: 10 giorni, 21 ore, 16 minuti, Se NO: 2009/12/21 17:20 (10 giorni, 21 ore, 16 minuti)</font>',
          value: myAccount.preferences.referralSince_replace,
        },
        ownedSince_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.preferences.ownedSince_shrinkContents,
        },
        header_nextPaymentColumn: {
          type:"html",
          html:"<br><p><b>Colonna prossimo pagamento:</b></p>",
        },
        nextPayment_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.preferences.nextPayment_shrinkContents,
        },
        header_lastClickColumn: {
          type:"html",
          html:"<br><p><b>Colonna clik:</b></p>",
        },
        lastClick_numerise:{
          type:"checkbox",
          label:"Numerico:",
          text: '<font style="font-size: x-small; font-style: italic;">Se SI: visualizza la data in formato giorno/ore/minuti. Se NO: le seguenti impostazioni vengono ignorate.</font>',
          value: myAccount.preferences.lastClick_numerise,
        },
        lastClick_fullerTimers:{
          type:"checkbox",
          label:"Completo:",
          text: '<font style="font-size: x-small; font-style: italic;">Impostazione formato data: Se SI: giorni/ore/minuti, Se NO: giorni</font>',
          value: myAccount.preferences.lastClick_fullerTimers,
        },
        lastClickTimer_shortFormat:{
          type:"checkbox",
          label:"Formato ridotto:",
          text: '<font style="font-size: x-small; font-style: italic;">Impostazione formato data: Se SI D/H/m, Se NO: giorno/ore/minuti</font>',
          value: myAccount.preferences.lastClickTimer_shortFormat,
        },
        lastClick_replace:{
          type:"checkbox",
          label:"Numeri/testo:",
          text: '<font style="font-size: x-small; font-style: italic;">Impostazione formato: Se SI: 6 giorni, Se NO: 2009/12/26 [6 giorni]</font>',
          value: myAccount.preferences.lastClick_replace,
        },
        lastClick_replaceNilClicks:{
          type:"checkbox",
          label:"Testo:",
          text: '<font style="font-size: x-small; font-style: italic;">Se SI: rimuove la scritta "nessun clik" per chi non ha mai clikkato</font>',
          value: myAccount.preferences.lastClick_replaceNilClicks,
        },
        lastClick_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.preferences.lastClick_shrinkContents,
        },
        header_avgColumn: {
          type:"html",
          html:"<br><p><b>Colonna medie:</b></p>",
        },
        exactAverage_show:{
          type:"checkbox",
          label:"Media esatta",
          text: '<font style="font-size: x-small; font-style: italic;">Se SI: indica la media esatta.<br/></font>',
          value: myAccount.preferences.exactAverage_show,
        },
        exactAverage_seperator:{
          type:"text",
          label:"Separatore",
          text: '<font style="font-size: x-small; font-style: italic;">Per separare la media presunta da quella esatta</font>',
          value: myAccount.preferences.exactAverage_seperator,
        },
        columnPrefix_Average:{
          type:"text",
          label:"Prefisso",
          text: '<font style="font-size: x-small; font-style: italic;">Cosa deve essre indicato prima della media</font>',
          value: myAccount.preferences.columnPrefix_Average,
        },
        exactAverage_replace:{
          type:"checkbox",
          label:"Sostituire meda",
          text: '<font style="font-size: x-small; font-style: italic;">Per sostituire la media esatta da quella presunta</font>',
          value: myAccount.preferences.exactAverage_replace,
        },
        average_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.preferences.average_shrinkContents,
        },
        header_profitColumn: {
          type:"html",
          html:"<br><p><b>Colonna riciclo:</b></p>",
        },
        showColumn_Profit:{
          type:"checkbox",
          label:"Mostrare:",
          text: '<font style="font-size: x-small; font-style: italic;">Mostrare ricicli</font>',
          value: myAccount.preferences.showColumn_Profit,
        },
        includeRecycleCostInProfitColumn:{
          type:"checkbox",
          label:"Costo del riciclaggio:",
          text: '<font style="font-size: x-small; font-style: italic;">Se SI: visualizza il profitto,<br>Se NO: visualizza il costo del riciclaggio}</font>',
          value: myAccount.preferences.includeRecycleCostInProfitColumn,
        },
        columnPrefix_Profit:{
          type:"text",
          label:"Separatore",
          text: '<font style="font-size: x-small; font-style: italic;">Simbolo visualizzato: $</font>',
          value: myAccount.preferences.columnPrefix_Profit,
        },
        profitColumn_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.preferences.profitColumn_shrinkContents,
        },
      },
    },
    "Lista preferenze 2":{
      html:"<p>Questa impostazione viene utilizzata per controllare ciò che accade nella pagine degli elenchi di riferimento.</p><p><strong>Tali adeguamenti riguardano solo i membri ULTIMATE:</strong></p>",
      fields:{
        columnHeader_clickText: {
          type:"html",
          html:"<br><p><b>Colonna Click-testo ('Click/giorni'):</b></p>",
        },
        showColumn_clickText:{
          type:"checkbox",
          label:"Mostra:",
          text: '<font style="font-size: x-small; font-style: italic;">Se SI: mostra la colonna clik-testo</font>',
          value: myAccount.ultimatePreferences.showColumn_clickText,
        },
        columnPrefix_clickText:{
          type:"text",
          label:"Prefisso",
          text: '<font style="font-size: x-small; font-style: italic;">Imposta il valore da mostrare prima del clik-testo</font>',
          value: myAccount.ultimatePreferences.columnPrefix_clickText,
        },
        clickText_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.ultimatePreferences.clickText_shrinkContents,
        },
        columnHeader_average1: {
          type:"html",
          html:"<br><p><b>'media 1' colonna(A"+myAccount.preferences.timePeriod_average1+")</b></p>",
        },
        showColumn_Average1:{
          type:"checkbox",
          label:"Mostra:",
          text: '<font style="font-size: x-small; font-style: italic;">Visualizza la colonna media 1</font>',
          value: myAccount.ultimatePreferences.showColumn_Average1,
        },
        columnPrefix_Average1:{
          type:"text",
          label:"Prefisso",
          text: '<font style="font-size: x-small; font-style: italic;">Imposta il valore da mostrare prima di media 1</font>',
          value: myAccount.ultimatePreferences.columnPrefix_Average1,
        },
        average1_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.ultimatePreferences.average1_shrinkContents,
        },
        columnHeader_average2: {
          type:"html",
          html:"<br><p><b>'media 2' colonna(A"+myAccount.preferences.timePeriod_average2+")</b></p>",
        },
        showColumn_Average2:{
          type:"checkbox",
          label:"Mostra:",
          text: '<font style="font-size: x-small; font-style: italic;">Visualizza la colonna media 2</font>',
          value: myAccount.ultimatePreferences.showColumn_Average2,
        },
        columnPrefix_Average2:{
          type:"text",
          label:"Prefisso",
          text: '<font style="font-size: x-small; font-style: italic;">Imposta il valore da mostrare prima di media 2: null</font>',
          value: myAccount.ultimatePreferences.columnPrefix_Average2,
        },
        average2_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.ultimatePreferences.average2_shrinkContents,
        },
        header_sdColumn: {
          type:"html",
          html:"<br><p><b>Colonna deviazione standard (SD):</b></p>",
        },
        showSDEVColumn:{
          type:"checkbox",
          label:"Mostra:",
          text: '<font style="font-size: x-small; font-style: italic;">Visualizza la colonna SD</font>',
          value: myAccount.ultimatePreferences.showSDEVColumn,
        },
        columnPrefix_SD:{
          type:"text",
          label:"Prefisso",
          text: '<font style="font-size: x-small; font-style: italic;">Imposta il valore da mostrare prima di SD</font>',
          value: myAccount.ultimatePreferences.columnPrefix_SD,
        },
        SD_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.ultimatePreferences.SD_shrinkContents,
        },
        header_rsaColumn: {
          type:"html",
          html:"<br><p><b>Colonna Rapporto tra deviazione standard e media (RSA):</b></p>",
        },
        showColumn_RSA:{
          type:"checkbox",
          label:"Mostra RSA:",
          text: '<font style="font-size: x-small; font-style: italic;">Visualizza la colonna RSA<br>NOTE: RSA == Ratio of Standard deviation and Average</font>',
          value: myAccount.ultimatePreferences.showColumn_RSA,
        },
        columnPrefix_RSA:{
          type:"text",
          label:"Prefisso",
          text: '<font style="font-size: x-small; font-style: italic;">Imposta il valore da mostrare prima di RSA: null</font>',
          value: myAccount.ultimatePreferences.columnPrefix_RSA,
        },
        RSA_shrinkContents:{
          type:"checkbox",
          label:"Restringimento:",
          text: '<font style="font-size: x-small; font-style: italic;">Se il contenuto della colonna risulta ridotto</font>',
          value: myAccount.ultimatePreferences.RSA_shrinkContents,
        },
      },
    },
    "Tempi":{
      html:'<p>Qui puoi impostare il numero di giorni in cui le medie sono calcolate nel contesto della grafica.<br></p>',
      fields:{
        spacer_1: {
          type:"html",
          html:"<br><p>Periodo di tempo per ingrandire il grafico:</p>",
        },
        timePeriod_s1: {
          type:"select",
          label:"Periodo tempo 1",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8",
          },
          text: '<font style="font-size: x-small; font-style: italic;">valore da 1 a 8 impostato a: 5</font>',
          value:myAccount.preferences.timePeriod_s1,
        },
        timePeriod_s2: {
          type:"select",
          label:"Periodo tempo 2",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9",
          },
          text: '<font style="font-size: x-small; font-style: italic;">valore da 1 a 9 impostato a: 7<br>NOTA: Il periodo di tempo 2 deve essere superiore a quello di tempo 1 </font>',
          value:myAccount.preferences.timePeriod_s2,
        },
        timePeriod_s3: {
          type:"select",
          label:"Periodo tempo 3",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
          },
          text: '<font style="font-size: x-small; font-style: italic;">valore da 1 a 10 impostato a: 10<br>NOTA: Il periodo di tempo 3 deve essere superiore a quello di tempo 2 </font>',
          value:myAccount.preferences.timePeriod_s3,
        },
        spacer_2: {
          type:"html",
          html:"<br><p>Periodo di tempo per ingrandire il grafico:</p>",
        },
        timePeriod_1: {
          type:"select",
          label:"Periodo tempo 1",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            "11":"11", "12":"12", "13":"13",
          },
          text: '<font style="font-size: x-small; font-style: italic;">valore da 1 a 13 impostato a: 5</font>',
          value:myAccount.preferences.timePeriod_1,
        },
        timePeriod_2: {
          type:"select",
          label:"Periodo tempo 2",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            "11":"11", "12":"12", "13":"13", "14":"14",
          },
          text: '<font style="font-size: x-small; font-style: italic;">valore da 1 a 14 impostato a: 10<br>NOTA: Il periodo di tempo 2 deve essere superiore a quello di tempo 1 </font>',
          value:myAccount.preferences.timePeriod_2,
        },
        timePeriod_3: {
          type:"select",
          label:"Periodo tempo 3",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            "11":"11", "12":"12", "13":"13", "14":"14", "15":"15",
          },
          text: '<font style="font-size: x-small; font-style: italic;">valore da 1 a 15 impostato a: 15<br>NOTA: Il periodo di tempo 3 deve essere superiore a quello di tempo 2 </font>',
          value:myAccount.preferences.timePeriod_3,
        },
        spacer_3: {
          type:"html",
          html:"<br><p>(Solo per ULTIMATE):</p>",
        },
        timePeriod_recent: {
          type:"select",
          label:"Media minigrafico",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
          },
          text: '<font style="font-size: x-small; font-style: italic;">valore da 1 a 10 impostato a: 5 (sollo per ULTIMATE)</font>',
          value:myAccount.preferences.timePeriod_recent,
        },
      },
    },
    /*"Language Settings":{
      html:'<p>Configuración de idioma:</p>',
      fields:{
        neobuxLanguage: {
          type:"select",
          label:"Neobux Idioma",
          options:{
            "English":"EN",
            "Portugese":"PT",
            "Spanish":"SP",
          },
          text: '<font style="font-size: x-small; font-style: italic;">What language is Neobux in?</font>',
          value:myAccount.preferences.neobuxLanguage,
        },
        spacer_1: {
          type:"spacer",
          height:"15px",
        },
        scriptLanguage: {
          type:"select",
          label:"Script Language",
          options:{
            "English":"EN",
            "Portugese":"PT",
            "Spanish":"SP",
          },
          text: '<font style="font-size: x-small; font-style: italic;">What language is should the script be in?<br>Note: Only languages that are installed may be selected and non-English support is <b>_extremely_</b> limited.</font>',
          value:myAccount.preferences.scriptLanguage,
        },
      },

    },*/
    "Impostazione aggiornamenti":{
      html:'<p>Impostazione aggiornamento:</p>',
      fields:{
        updateFrequency:{
          type:"text",
          label:"Frequenza d'aggiornamento",
          text: '<font style="font-size: x-small; font-style: italic;">Impostare il tempo per cui lo script deve aggiornare i dati. Consigliato: 120 minuti. </font>',
          value: myAccount.preferences.updateFrequency,
        },
      },
    },
    "Info":{
      html:'<p><strong>Informazioni sul Script:</strong></p>'+
      '<p>Questo script è stato progettato per rendere la gestione del conto Neobux il più semplice possibile e mettere quante più informazioni possibili nel suo campo d applicazione..</p>'+
      '<p><strong><p><strong>Per chi volesse ringraziare i creatori dello sript </strong></p></strong></p>'+
      '<p><a href="http://userscripts.org/users/kwah"> (kwah) </ a> <a href="http://userscripts.org/scripts/show/67521"> (Mgold) </ a> <a href="http://userscripts.org/users/212116">    (tecnotronika) </ a> </ a> <a href="http://userscripts.org/users/211885/scripts"> (Aldione) </ a><br><br>'+
      '<p></p><br>'+
      '<p><strong>Per qualsiasi informazione, o malfunzionamento postate sul <a href = "http://www.neobux.com/forum/?frmid=12&tpcid=143545"> Forum Neobux </ a> cosi potremmo migliorare.</strong></p>'+
      '<p></p>'+
      // '<p><strong>Historia del Scripts:</strong></p>'+
      // '<p>La secuencia de comandos Neobux 2 + ha tenido bastante pocos contribuyentes durante su vida. Que yo sepa, fue creado originalmente por uriburi206 y se mantiene posteriormente y actualizada por oselamet (JM2T tradujo el guión en algún momento también =])..<br><br>Aldione Más tarde se hizo cargo y volvió a escribir el código, liberando como la versión SP (Aldione).</p>'+
      // '<p>Credits to kwah. This is traduction on Spanish</p>'+
      '',
      fields:{
      },
    }
  };
  }
  break;

    case 'PT':
//// SETTINGS EDITING / CONFIG EN
    if ( currentPage.language == 'PT' ) {
  Config.scriptName = "Neobux SP (Aldione)";
  Config.tabs = {
    "Detalhes da Conta":{
      html:'<p>Esta p&aacute;gina &eacute; apenas para fins informativos e apenas para mostrar o que o script entende sobre sua conta. Estas n&atilde;o s&atilde;o configura&ccedil;&otilde;es que podem ser alteradas.</p>',
      fields:{
        html:{
          type:"html",
          html:"<table style='border-collapse: collapse;'>"+
            "<tr><td>Seu Nome de Utilizador: </td><td style='font-weight: bold !important;'>" + myAccount.name + "</td></tr>" + 
            "<tr><td>Seu tipo de Conta: </td><td style='font-weight: bold !important;'>" + getAccountType(true) + "</td></tr>" + 
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "<tr><td>N&ordm; de referidos alugados: </td><td style='font-weight: bold !important;'>" + myAccount.rentedRefCount + "</td></tr>" + 
            "<tr><td>N&ordm; de referidos diretos: </td><td style='font-weight: bold !important;'>" + myAccount.directRefCount + "</td></tr>" + 
            "<tr><td>N&ordm; total de referidos: </td><td style='font-weight: bold !important;'>" + myAccount.getTotalRefCount + "</td></tr>" + 
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "<tr><td>Seu limite de AutoPagamento (dias): </td><td style='font-weight: bold !important;'>" + myAccount.autopayLimit + "</td></tr>" + 
            "<tr><td>Seu Custo de AutoPagamento: </td><td style='font-weight: bold !important;'>$" + myAccount.autopayCost.toFixed(5) + "</td></tr>" + 
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "<tr><td>Valor dos seus cliques: </td><td style='font-weight: bold !important;'>$" + myAccount.ownClickValue + "</td></tr>" + 
            "<tr><td>Valor dos cliques dos seus referidos: </td><td style='font-weight: bold !important;'>$" + myAccount.referralClickValue + "</td></tr>" + 
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
          "</table>",
        }
      },
    },
    "Configurações da Conta":{
    /*html:'<p>Estas configura&ccedil;&otilde;es est&atilde;o relacionadas ao per&iacute;odo de renova&ccedil;&atilde;o que voc&ecirc; optou por gerir em sua conta e como o script identificar&aacute; os totais de referidos em sua conta.</p>',*/
    html:'<p>Estas configura&ccedil;&otilde;es est&atilde;o relacionadas ao per&iacute;odo de renova&ccedil;&atilde;o que voc&ecirc; optou por gerir em sua conta.</p>',
      fields:{
        renewalPeriod:{
          type:"select",
          label:"<i>Per&iacute;odo de <br>Renova&ccedil;&atilde;o <br>mais utilizado:</i>",
          options:{
             "15":"15",
             "30":"30",
             "60":"60",
             "90":"90",
             "150":"150",
             "240":"240",
          },
          text: '<font style="font-size: x-small; font-style: italic;">N&uacute;mero de dias que voc&ecirc; quer renovar. <br>Recomendado: 240 dias de renova&ccedil;&otilde;es e AutoPagto desligado.<br>15 dias, 30 dias, 60 dias (equivalente ao AutoPagto), 90 dias, 150 dias e 240 dias.</font>',
          value:myAccount.preferences.renewalPeriod,
        },
        spacer_1: {
          type:"spacer",
          height:"15px",
        },
        overrideRentedReferralCount:{
          type:"checkbox",
          label:"Substituir Cantidades:",
          text: '<font style="font-size: x-small; font-style: italic;">Voc&ecirc; quer que o script substituia a quantidade de referidos alugados que pensa que voc&ecirc; tem?</font>',
          value: myAccount.preferences.overrideRentedReferralCount,
        },
        manualRentedReferralCount:{
          type:"text",
          label:"Referidos <br>Alugados:",
          text: '<font style="font-size: x-small; font-style: italic;">Quantidade de referidos alugados que voc&ecirc; tem.</font>',
          value: myAccount.preferences.manualRentedReferralCount,
        },
        spacer_2: {
          type:"spacer",
          height:"15px",
        },
        overrideDirectReferralCount:{
          type:"checkbox",
          label:"Substituir Cantidades:",
          text: '<font style="font-size: x-small; font-style: italic;">Voc&ecirc; quer que o script substituia a quantidade de referidos diretos que pensa que voc&ecirc; tem?</font>',
          value: myAccount.preferences.overrideDirectReferralCount,
        },
        manualDirectReferralCount:{
          type:"text",
          label:"Referidos <br>Diretos:",
          text: '<font style="font-size: x-small; font-style: italic;">Quantidade de referidos diretos que voc&ecirc; tem.</font>',
          value: myAccount.preferences.manualDirectReferralCount,
        },
      },
    },
    "Lista Referidos":{
      html:"<p>Essas configura&ccedil;&otilde;es s&atilde;o usadas para controlar o que acontece nas p&aacute;ginas de Listagem de Referidos.</p>",
      fields:{
        header_refFlags: {
          type:"html",
          html:"<p><b>Bandeiras dos Referidos:</b></p>",
        },
        textifyFlag:{
          type:"checkbox",
          label:"<i>Exibir Letras <br>das Bandeiras:</i>",
          text: '<font style="font-size: x-small; font-style: italic;">Exibir letras das bandeiras?<br>R = Vermelha, O = Laranja, Y = Amarela, G = Verde, W = Branca</font>',
          value: myAccount.preferences.textifyFlag,
        },
        textifyFlag_prefix:{
          type:"text",
          label:"Separador:",
          text: '<font style="font-size: x-small; font-style: italic;">O que deve separar a bandeira e texto?</font>',
          value: myAccount.preferences.textifyFlag_prefix,
        },
        flag_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Bandeira?</font>',
          value: myAccount.preferences.flag_shrinkContents,
        },
        header_referralNameColumn: {
          type:"html",
          html:"<br><p><b>Coluna Nome do Referido:</b></p>",
        },
        referralName_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Nome do Referido?</font>',
          value: myAccount.preferences.referralName_shrinkContents,
        },
        header_ownedSinceColumn: {
          type:"html",
          html:"<br><p><b>Coluna Referido Desde:</b></p>",
        },
        referralSince_numerise:{
          type:"checkbox",
          label:"Calcular dias <br>cadastrado:",
          text: '<font style="font-size: x-small; font-style: italic;">A data deve ser exibida em dias, horas e minutos? <br>Se definido para false, as defini&ccedil;&otilde;es abaixo ser&atilde;o ignoradas.</font>',
          value: myAccount.preferences.referralSince_numerise,
        },
        referralSince_fullerTimers:{
          type:"checkbox",
          label:"Exibir horas <br>e minutos <br>em dias <br>cadastrado:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir horas e minutos <br>no resultado do c&aacute;lculo de dias cadastrado?<br>true = dias, horas, minutos, <br>false = somente dias</font>',
          value: myAccount.preferences.referralSince_fullerTimers,
        },
        ownedSinceTimer_shortFormat:{
          type:"checkbox",
          label:"Usar Formato <br>Reduzido:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir horas e minutos em formato reduzido <br>no resultado do c&aacute;lculo de dias cadastrado?<br>true = d, h, m, false = dias, horas, minutos</font>',
          value: myAccount.preferences.ownedSinceTimer_shortFormat,
        },
        referralSince_replace:{
          type:"checkbox",
          label:"Ocultar Data <br> e Hor&aacute;rio <br>do Cadastro:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir apenas resultado do c&aacute;lculo de dias cadastrado?<br>true = 10 dias, 21 horas, 16 minutos, <br>false = 2009/12/21 17:20 (10 dias, 21 horas, 16 minutos)</font>',
          value: myAccount.preferences.referralSince_replace,
        },
        ownedSince_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Referido Desde?</font>',
          value: myAccount.preferences.ownedSince_shrinkContents,
        },
        header_nextPaymentColumn: {
          type:"html",
          html:"<br><p><b>Coluna Pr&oacute;ximo Pagamento:</b></p>",
        },
        nextPayment_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Pr&oacute;ximo Pagamento?</font>',
          value: myAccount.preferences.nextPayment_shrinkContents,
        },
        header_lastClickColumn: {
          type:"html",
          html:"<br><p><b>Coluna &Uacute;ltimo Clique:</b></p>",
        },
        lastClick_numerise:{
          type:"checkbox",
          label:"Calcular dias <br>sem clicar:",
          text: '<font style="font-size: x-small; font-style: italic;">Exibir data em dias, horas, minutos? <br>Se definido para false, as defini&ccedil;&otilde;es abaixo ser&atilde;o ignoradas.</font>',
          value: myAccount.preferences.lastClick_numerise,
        },
        lastClick_fullerTimers:{
          type:"checkbox",
          label:"Exibir dias na <br>qtde de dias <br>sem clicar:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja que o resultado do c&aacute;lculo de dias sem clicar <br>exiba horas e minutos?<br>true = 2009/12/26 [6 dias], false = 2009/12/26 [6] </font>',
          value: myAccount.preferences.lastClick_fullerTimers,
        },
        lastClickTimer_shortFormat:{
          type:"checkbox",
          label:"Usar Formato <br>Reduzido:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir horas e minutos em formato reduzido <br>no resultado do c&aacute;lculo de dias sem clicar?<br>true = d, false = dias</font>',
          value: myAccount.preferences.lastClickTimer_shortFormat,
        },
        lastClick_replace:{
          type:"checkbox",
          label:"<i>Ocultar Data <br>do &Uacute;lt. Clique</i>:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja ocultar data e exibir apenas <br>o resultado do c&aacute;lculo de dias sem clicar?<br>true == 6 dias, false == 2009/12/26 [6 dias]</font>',
          value: myAccount.preferences.lastClick_replace,
        },
        lastClick_replaceNilClicks:{
          type:"checkbox",
          label:"Ocultar <br><i>[Sem Cliques]</i>:",
          text: '<font style="font-size: x-small; font-style: italic;">Caso o referido n&atilde;o tenha clicado ainda, <br>o texto [Sem Cliques] deve ser removido para estreitar a coluna?</font>',
          value: myAccount.preferences.lastClick_replaceNilClicks,
        },
        lastClick_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna &Uacute;ltimo Clique?</font>',
          value: myAccount.preferences.lastClick_shrinkContents,
        },
        header_avgColumn: {
          type:"html",
          html:"<br><p><b>Coluna M&eacute;dia:</b></p>",
        },
        exactAverage_show:{
          type:"checkbox",
          label:"Exibir <br>M&eacute;dia Exata:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir M&eacute;dia Exata? A M&eacute;dia Aproximada usa dias.<br/>Esta M&eacute;dia Exata &eacute; calculada usando a idade do referido em minutos.</font>',
          value: myAccount.preferences.exactAverage_show,
        },
        exactAverage_seperator:{
          type:"text",
          label:"Separador:",
          text: '<font style="font-size: x-small; font-style: italic;">O que deve separa M&eacute;dia Aproximada da M&eacute;dia Exata?</font>',
          value: myAccount.preferences.exactAverage_seperator,
        },
        columnPrefix_Average:{
          type:"text",
          label:"Prefixo:",
          text: '<font style="font-size: x-small; font-style: italic;">O que deve ser exibido antes de M&eacute;dia Aproximada?</font>',
          value: myAccount.preferences.columnPrefix_Average,
        },
        exactAverage_replace:{
          type:"checkbox",
          label:"Exibir apenas <br>M&eacute;dia Exata:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja que a M&eacute;dia Exata substitua completamente <br>a M&eacute;dia Aproximada</font>',
          value: myAccount.preferences.exactAverage_replace,
        },
        average_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna M&eacute;dia?</font>',
          value: myAccount.preferences.average_shrinkContents,
        },
        header_profitColumn: {
          type:"html",
          html:"<br><p><b>Coluna Lucro:</b></p>",
        },
        showColumn_Profit:{
          type:"checkbox",
          label:"Exibir <br>Lucro:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna Lucro seja exibida?</font>',
          value: myAccount.preferences.showColumn_Profit,
        },
        includeRecycleCostInProfitColumn:{
          type:"checkbox",
          label:"<i>Incluir <br>Custo de <br>Reciclagem</i>:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja deduzir o Custo de Reciclagem no valor exibido em Lucro?<br>true = exibo {lucro}, false = exibe {lucro - custo de uma reciclagem}</font>',
          value: myAccount.preferences.includeRecycleCostInProfitColumn,
        },
        columnPrefix_Profit:{
          type:"text",
          label:"Separador:",
          text: '<font style="font-size: x-small; font-style: italic;">O que deve ser exibido antes do valor do Lucro? por exemplo, isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. Padr&atilde;o: $</font>',
          value: myAccount.preferences.columnPrefix_Profit,
        },
        profitColumn_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Lucro?</font>',
          value: myAccount.preferences.profitColumn_shrinkContents,
        },
      },
    },
    "Lista Referidos 2":{
      html:"<p>Essas configura&ccedil;&otilde;es s&atilde;o usadas para controlar o que acontece nas p&aacute;ginas de Listagem de Referidos.</p><p><strong>Estas defini&ccedil;&otilde;es afetam apenas membros Ultimate:</strong></p>",
      fields:{
        columnHeader_clickText: {
          type:"html",
          html:"<p><b>Coluna Cliques do Dia:</b></p>",
        },
        showColumn_clickText:{
          type:"checkbox",
          label:"Exibir Cliques<br> do Dia:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna Cliques do Dia seja exibida?</font>',
          value: myAccount.ultimatePreferences.showColumn_clickText,
        },
        columnPrefix_clickText:{
          type:"text",
          label:"Prefixo",
          text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor de Cliques no Dia? <br>Padr&atilde;o: vazio</font>',
          value: myAccount.ultimatePreferences.columnPrefix_clickText,
        },
        clickText_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Cliques do Dia?</font>',
          value: myAccount.ultimatePreferences.clickText_shrinkContents,
        },
        columnHeader_average1: {
          type:"html",
          html:"<br><p><b>Coluna 1&ordf; M&eacute;dia (A"+myAccount.preferences.timePeriod_average1+"):</b></p>",
        },
        showColumn_Average1:{
          type:"checkbox",
          label:"Exibir A"+myAccount.preferences.timePeriod_average1+":",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna 1&ordf; M&eacute;dia seja exibida?</font>',
          value: myAccount.ultimatePreferences.showColumn_Average1,
        },
        columnPrefix_Average1:{
          type:"text",
          label:"Prefixo:",
          text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor da 1&ordf; M&eacute;dia? por exemplo, isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. <br>Padr&atilde;o: vazio</font>',
          value: myAccount.ultimatePreferences.columnPrefix_Average1,
        },
        average1_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna 1&ordf; M&eacute;dia?</font>',
          value: myAccount.ultimatePreferences.average1_shrinkContents,
        },
        columnHeader_average2: {
          type:"html",
          html:"<br><p><b>Coluna 2&ordf; M&eacute;dia (A"+myAccount.preferences.timePeriod_average2+"):</b></p>",
        },
        showColumn_Average2:{
          type:"checkbox",
          label:"Exibir A"+myAccount.preferences.timePeriod_average2+":",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna 2&ordf; M&eacute;dia seja exibida?</font>',
          value: myAccount.ultimatePreferences.showColumn_Average2,
        },
        columnPrefix_Average2:{
          type:"text",
          label:"Prefixo:",
          text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor da 2&ordf; M&eacute;dia? por exemplo, isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. <br>Padr&atilde;o: vazio</font>',
          value: myAccount.ultimatePreferences.columnPrefix_Average2,
        },
        average2_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna 2&ordf; M&eacute;dia?</font>',
          value: myAccount.ultimatePreferences.average2_shrinkContents,
        },
        header_sdColumn: {
          type:"html",
          html:"<br><p><b>Coluna Desvio Padr&atilde;o (SD):</b></p>",
        },
        showSDEVColumn:{
          type:"checkbox",
          label:"Exibir SD:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna SD seja exibida?</font>',
          value: myAccount.ultimatePreferences.showSDEVColumn,
        },
        columnPrefix_SD:{
          type:"text",
          label:"Prefixo:",
          text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor SD? por exemplo, <br>isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. <br>Padr&atilde;o: vazio</font>',
          value: myAccount.ultimatePreferences.columnPrefix_SD,
        },
        SD_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna SDEV?</font>',
          value: myAccount.ultimatePreferences.SD_shrinkContents,
        },
        header_rsaColumn: {
          type:"html",
          html:"<br><p><b>Coluna Quociente de Desvio Padr&atilde;o e M&eacute;dia (RSA):</b></p>",
        },
        showColumn_RSA:{
          type:"checkbox",
          label:"Exibir RSA:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna RSA seja exibida?<br>NOTA: RSA = Quociente de Desvio Padr&atilde;o e M&eacute;dia</font>',
          value: myAccount.ultimatePreferences.showColumn_RSA,
        },
        columnPrefix_RSA:{
          type:"text",
          label:"Prefixo:",
          text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor RSA? por exemplo, <br>isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. <br>Padr&atilde;o: vazio</font>',
          value: myAccount.ultimatePreferences.columnPrefix_RSA,
        },
        RSA_shrinkContents:{
          type:"checkbox",
          label:"Retirar Espa&ccedil;os:",
          text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna RSA?</font>',
          value: myAccount.ultimatePreferences.RSA_shrinkContents,
        },
      },
    },
    "Periodos de Tempo":{
      html:'<p>Essas configura&ccedil;&otilde;es mudam o n&uacute;mero de dias utilizados para calcular as M&eacute;dias dentro dos gr&aacute;ficos.<br></p>',
      fields:{
        spacer_1: {
          type:"html",
          html:"<p>Per&iacute;odos de Tempo dos Gr&aacute;ficos Menores:</p>",
        },
        timePeriod_s1: {
          type:"select",
          label:"1&ordm; Per&iacute;odo de Tempo:",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 5</font>',
          value:myAccount.preferences.timePeriod_s1,
        },
        timePeriod_s2: {
          type:"select",
          label:"2&ordm; Per&iacute;odo de Tempo:",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 7<br>Nota: 2&ordm; Per&iacute;odo de Tempo deve ser superior <br>ao 1&ordm; Per&iacute;odo de Tempo</font>',
          value:myAccount.preferences.timePeriod_s2,
        },
        timePeriod_s3: {
          type:"select",
          label:"3&ordm; Per&iacute;odo de Tempo:",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 10<br>Nota: 3&ordm; Per&iacute;odo de Tempo deve ser superior <br>ao 2&ordm; Per&iacute;odo de Tempo</font>',
          value:myAccount.preferences.timePeriod_s3,
        },
        spacer_2: {
          type:"html",
          html:"<br><p>Per&iacute;odos de Tempo dos Gr&aacute;ficos Maiores</p>",
        },
        timePeriod_1: {
          type:"select",
          label:"1&ordm; Per&iacute;odo de Tempo:",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            "11":"11", "12":"12", "13":"13",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 5</font>',
          value:myAccount.preferences.timePeriod_1,
        },
        timePeriod_2: {
          type:"select",
          label:"2&ordm; Per&iacute;odo de Tempo:",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            "11":"11", "12":"12", "13":"13", "14":"14",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 10<br>Nota: 2&ordm; Per&iacute;odo de Tempo deve ser superior <br>ao 1&ordm; Per&iacute;odo de Tempo</font>',
          value:myAccount.preferences.timePeriod_2,
        },
        timePeriod_3: {
          type:"select",
          label:"3&ordm; Per&iacute;odo de Tempo:",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            "11":"11", "12":"12", "13":"13", "14":"14", "15":"15",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 15<br>Nota: 3&ordm; Per&iacute;odo de Tempo deve ser superior <br>ao 2&ordm; Per&iacute;odo de Tempo</font>',
          value:myAccount.preferences.timePeriod_3,
        },
        spacer_3: {
          type:"html",
          html:"<br><p><i>Per&iacute;odo Recente para Resumo dos &Uacute;ltimos dias <br>e Minigr&aacute;fico de M&eacute;dias (Somente para Ultimates):</i></p>",
        },
        timePeriod_recent: {
          type:"select",
          label:"Per&iacute;odo Recente para <br>Resumo dos &Uacute;ltimos dias <br>e Minigr&aacute;fico de M&eacute;dias:",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 10<br>Nota: Aqui voc&ecirc; pode escolher o n&ordm; de dias <br>usados para calcular o Lucro dos &Uacute;ltimos dias <br>e serve tamb&eacute;m para definir a quantidade de <br>dias do c&aacute;lculo do Minigr&aacute;fico de M&eacute;dias <br>(Somente para Ultimates)(</font>',
          value:myAccount.preferences.timePeriod_recent,
        },
      },
    },
    /*"Configurações de Idioma":{
      html:'<p>Definir Linguagem:</p>',
      fields:{
        neobuxLanguage: {
          type:"select",
          label:"Linguagem do Neobux",
          options:{
            "Inglês":"EN",
            "Português":"PT",
            "Espanhol":"SP",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Que Linguagem usar no Neobux?</font>',
          value:myAccount.preferences.neobuxLanguage,
        },
        spacer_1: {
          type:"spacer",
          height:"15px",
        },
        scriptLanguage: {
          type:"select",
          label:"Linguagem do Script",
          options:{
            "Inglês":"EN",
            "Português":"PT",
            "Espanhol":"SP",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Que Idioma usar no script?<br>Nota: Apenas os idiomas que estão instalados podem ser seleccionadas e apoio não-Inglês é <b>_extremamente_</b> limitada.</font>',
          value:myAccount.preferences.scriptLanguage,
        },
      },
    },*/
    "Definições do Atualizador":{
      html:'<p>defini&ccedil;&otilde;es do Atualizador:</p>',
      fields:{
        updateFrequency:{
          type:"text",
          label:"Frequ&ecirc;ncia de <br>Atualiza&ccedil;&atilde;o:",
          text: '<font style="font-size: x-small; font-style: italic;">Quantas vezes o script deve buscar por atualiza&ccedil;&otilde;es (em minutos)?<br>Recomendado: 120 minutos (NOTA: digitar apenas n&uacute;meros)</font>',
          value: myAccount.preferences.updateFrequency,
        },
      },
    },
    "Sobre":{
      html:'<p><strong>Sobre o Script:</strong></p>'+
      '<p>Este script foi concebido para tornar o gerenciamento de sua conta do Neobux o mais f&aacute;cil poss&iacute;vel e colocar o m&aacute;ximo de informa&ccedil;&otilde;es possiveis sob seu alcance.</p>'+
      '<p><strong>Quer dizer obrigado?</strong></p>'+
      '<p>&Eacute; sempre bom ouvir de pessoas que gostam do trabalho que eu fa&ccedil;o - apenas um t&oacute;pico sobre <a href="http://www.neobux.com/forum/?frmid=7&tpcid=78359">o f&oacute;rum Neobux</a> e um simples "Eu quero ter seus beb&ecirc;s!" ou "voc&ecirc; &eacute; minha maior estrela!" deveria ser suficiente, mas em um post generoso simplesmente dizer "obrigado" sempre ser&aacute; muito bem-vindo =]<br><br>'+
      'Ali&aacute;s, se voc&ecirc; tem certeza de que algo n&atilde;o est&aacute; certo e voc&ecirc; j&aacute; verificou que n&atilde;o &eacute; o Flying Spaghetti Monster brincando com voc&ecirc;? o <a href="http://www.neobux.com/forum/?frmid=7&tpcid=78359">f&oacute;rum Neobux</a> deve ser o seu primeiro porto de chamada para os pedidos de recursos e reclama&ccedil;&otilde;es. </p><br>'+
      '<p><strong>Outros scripts do Kwah</strong></p>'+
      '<p>Se voc&ecirc; gostou deste script, d&ecirc; uma olhada em meus outros scripts <br>Nem todos eles s&atilde;o t&atilde;o &uacute;teis quanto o script e, geralmente, a descri&ccedil;&atilde;o &eacute; boa o suficiente para descobrir o que faz, mas todas as perguntas podem ser enviadas para o mesmo lugar como acima.</p>'+
      // '<p><strong>Hist&oacute;ria do script:</strong></p>'+
      // '<p>O Neobux 2 + script teve bem poucos participantes durante sua vida. Que eu saiba, ele foi originalmente criado por uriburi206 e mais tarde foi mantido e actualizado por oselamet (JM2T traduziu o script em algum ponto tamb&eacute;m =] ).<br><br>Mais tarde Kwah assumiu e reescreveu o c&oacute;digo, liberando a vers&atilde;o 3 (v3).</p>'+
      '',
      fields:{
      },
    }
    };
  }
  break;

    case 'SP':
//// SETTINGS EDITING / CONFIG EN
    if ( currentPage.language == 'SP' ) {
    Config.scriptName = "Neobux 2+ (v3.1)";
  Config.tabs = {
    "Detalles Cuenta":{
      html:'<p>Esta página es puramente con objeto informativo, sólo para mostrar lo que el script cree sobre su cuenta. Éstos ajustes no pueden ser cambiados.</p>',
      fields:{
        html:{
          type:"html",
          html:"<table style='border-collapse: collapse;'>"+
            "<tr><td>Su Nombre de usuario: </td><td style='font-weight: bold !important;'>" + myAccount.name + "</td></tr>" + 
            "<tr><td>Su tipo de Cuenta: </td><td style='font-weight: bold !important;'>" + getAccountType(true) + "</td></tr>" + 
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "<tr><td>Nº de referidos rentados: </td><td style='font-weight: bold !important;'>" + myAccount.rentedRefCount + "</td></tr>" + 
            "<tr><td>Nº de referidos directos: </td><td style='font-weight: bold !important;'>" + myAccount.directRefCount + "</td></tr>" + 
            "<tr><td>Nº Total de referidos: </td><td style='font-weight: bold !important;'>" + myAccount.getTotalRefCount + "</td></tr>" + 
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "<tr><td>Su límite de Autopay (días): </td><td style='font-weight: bold !important;'>" + myAccount.autopayLimit + "</td></tr>" + 
            "<tr><td>Su coste de Autopay: </td><td style='font-weight: bold !important;'>$" + myAccount.autopayCost + "</td></tr>" + 
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "<tr><td>Valor de sus clicks: </td><td style='font-weight: bold !important;'>$" + myAccount.ownClickValue + "</td></tr>" + 
            "<tr><td>Valor de  clicks de sus referidos: </td><td style='font-weight: bold !important;'>$" + myAccount.referralClickValue + "</td></tr>" + 
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
          "</table>",
        }
      },
    },
    "Config. Cuenta":{
      html:'<p>Estos ajustes se refieren a cómo usted elige administrar su cuenta y lo que el script ha almacenado sobre su cuenta.</p>',
      fields:{
        renewalPeriod:{
          type:"select",
          label:"Periodo Renovación",
          options:{
             "15":"15",
             "30":"30",
             "60":"60",
             "90":"90",
             "150":"150",
             "240":"240",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Nº de días que ud. renueva.<br>Recomendado: renovar a 240 días, autopay off.<br>15 dias, 30 días, 60 días [igual que autopay], 90 días, 150 dias i 240 dias</font>',
          value:myAccount.preferences.renewalPeriod,
        },
        spacer_1: {
          type:"spacer",
          height:"15px",
        },
        overrideRentedReferralCount:{
          type:"checkbox",
          label:"Corregir",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere corregir el nº de referidos rentados que el script cree que tiene?</font>',
          value: myAccount.preferences.overrideRentedReferralCount,
        },
        manualRentedReferralCount:{
          type:"text",
          label:"Referidos Rentados",
          text: '<font style="font-size: x-small; font-style: italic;">¿Cuántos referidos rentados tiene?</font>',
          value: myAccount.preferences.manualRentedReferralCount,
        },
        spacer_2: {
          type:"spacer",
          height:"15px",
        },
        overrideDirectReferralCount:{
          type:"checkbox",
          label:"Corregir",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere corregir el nº de referidos directos que el script cree que tiene?</font>',
          value: myAccount.preferences.overrideDirectReferralCount,
        },
        manualDirectReferralCount:{
          type:"text",
          label:"Referidos Directos",
          text: '<font style="font-size: x-small; font-style: italic;">¿Cuántos referidos directos tiene?</font>',
          value: myAccount.preferences.manualDirectReferralCount,
        },
      },
    },
    "Lista Referidos":{
      html:"<p>Estos parámetros se usan para configurar cómo se muestran las páginas de referidos.</p>",
      fields:{
        header_refFlags: {
          type:"html",
          html:"<p><b> Banderas Referidos:</b></p>",
        },
        textifyFlag:{
          type:"checkbox",
          label:"Texto Bandera",
          text: '<font style="font-size: x-small; font-style: italic;">¿Deben las banderas tener texto?<br>R = Roja, O = Naranja, Y = Amarilla, G = Verde, W = Blanca</font>',
          value: myAccount.preferences.textifyFlag,
        },
        textifyFlag_prefix:{
          type:"text",
          label:"Separador",
          text: '<font style="font-size: x-small; font-style: italic;">¿Como quiere separar la bandera & texto?</font>',
          value: myAccount.preferences.textifyFlag_prefix,
        },
        flag_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Banderas?</font>',
          value: myAccount.preferences.flag_shrinkContents,
        },
        header_referralNameColumn: {
          type:"html",
          html:"<br><p><b>Columna Nombre Referido:</b></p>",
        },
        referralName_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Nombre de Referido?</font>',
          value: myAccount.preferences.referralName_shrinkContents,
        },
        header_ownedSinceColumn: {
          type:"html",
          html:"<br><p><b>Columna Referido desde:</b></p>",
        },
        referralSince_numerise:{
          type:"checkbox",
          label:"Numerar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere poner la fecha en días/hrs/mins? Si selecciona no, el ajuste será ignorado.</font>',
          value: myAccount.preferences.referralSince_numerise,
        },
        referralSince_fullerTimers:{
          type:"checkbox",
          label:"Completo:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha completa?<br>TRUE == días/horas/mins, FALSE == sólo días</font>',
          value: myAccount.preferences.referralSince_fullerTimers,
        },
        ownedSinceTimer_shortFormat:{
          type:"checkbox",
          label:"Formato corto:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha en formato corto?<br>TRUE == d/h/m, FALSE == días/horas/mins</font>',
          value: myAccount.preferences.ownedSinceTimer_shortFormat,
        },
        referralSince_replace:{
          type:"checkbox",
          label:"Reemplazar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere reemplazar la fecha numérica por texto?<br>TRUE == 10 días, 21 hrs, 16 mins, FALSE == 2009/12/21 17:20 (10 días, 21 hrs, 16 mins)</font>',
          value: myAccount.preferences.referralSince_replace,
        },
        ownedSince_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar la columna Poseído desde?</font>',
          value: myAccount.preferences.ownedSince_shrinkContents,
        },
        header_nextPaymentColumn: {
          type:"html",
          html:"<br><p><b>Columna Next Payment:</b></p>",
        },
        nextPayment_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Next Payment?</font>',
          value: myAccount.preferences.nextPayment_shrinkContents,
        },
        header_lastClickColumn: {
          type:"html",
          html:"<br><p><b>Columna Last Click:</b></p>",
        },
        lastClick_numerise:{
          type:"checkbox",
          label:"Numerica:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha en días/hrs/mins? Si no selecciona, Los ajustes siguientes serán ignorados.</font>',
          value: myAccount.preferences.lastClick_numerise,
        },
        lastClick_fullerTimers:{
          type:"checkbox",
          label:"Completo:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha numérica completa?<br>TRUE == días/horas/mins, FALSE == sólo días</font>',
          value: myAccount.preferences.lastClick_fullerTimers,
        },
        lastClickTimer_shortFormat:{
          type:"checkbox",
          label:"Formato corto:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha numérica en formaqto corto?<br>TRUE == d/h/m, FALSE == días/horas/mins</font>',
          value: myAccount.preferences.lastClickTimer_shortFormat,
        },
        lastClick_replace:{
          type:"checkbox",
          label:"Reemplazar",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere cambiar la fecha numérica a texto?<br>TRUE == 6 días, FALSE == 2009/12/26 [6 días]</font>',
          value: myAccount.preferences.lastClick_replace,
        },
        lastClick_replaceNilClicks:{
          type:"checkbox",
          label:"Reemplazar No clicks:",
          text: '<font style="font-size: x-small; font-style: italic;">Si el usuario no ha hecho clicks, quiere eliminar el texto "No Clicks Yet" para  acortar la columna?</font>',
          value: myAccount.preferences.lastClick_replaceNilClicks,
        },
        lastClick_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Last Click?</font>',
          value: myAccount.preferences.lastClick_shrinkContents,
        },
        header_avgColumn: {
          type:"html",
          html:"<br><p><b>Columna AVG:</b></p>",
        },
        exactAverage_show:{
          type:"checkbox",
          label:"AVG Exacto",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar el AVG exacto? El AVG normal usa días.<br/>Este AVG \'exacto\' es calculado usando la antigüedad del referido en minutos.</font>',
          value: myAccount.preferences.exactAverage_show,
        },
        exactAverage_seperator:{
          type:"text",
          label:"Separador",
          text: '<font style="font-size: x-small; font-style: italic;">¿Qué separador quiere usar entre AVG normal & exacto?</font>',
          value: myAccount.preferences.exactAverage_seperator,
        },
        columnPrefix_Average:{
          type:"text",
          label:"Prefijo",
          text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delante del AVG normal?</font>',
          value: myAccount.preferences.columnPrefix_Average,
        },
        exactAverage_replace:{
          type:"checkbox",
          label:"Reemplazar AVG",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere que el AVG exacto reemplace completamente al AVG normal?</font>',
          value: myAccount.preferences.exactAverage_replace,
        },
        average_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna AVG?</font>',
          value: myAccount.preferences.average_shrinkContents,
        },
        header_profitColumn: {
          type:"html",
          html:"<br><p><b>Columna Ganancia:</b></p>",
        },
        showColumn_Profit:{
          type:"checkbox",
          label:"Mostrar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna Ganancia?</font>',
          value: myAccount.preferences.showColumn_Profit,
        },
        includeRecycleCostInProfitColumn:{
          type:"checkbox",
          label:"Coste Reciclaje:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere que la columna Ganancia deduzca el coste de reciclaje del valor mostrado?<br>TRUE == display {profit}, FALSE == display {profit - cost of one recycle}</font>',
          value: myAccount.preferences.includeRecycleCostInProfitColumn,
        },
        columnPrefix_Profit:{
          type:"text",
          label:"Separador:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Qué quieremostrar antes del valor Ganancia? ej. puede usarse para hacer que el script muestre sólo el numero. Defecto: $</font>',
          value: myAccount.preferences.columnPrefix_Profit,
        },
        profitColumn_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Ganancia?</font>',
          value: myAccount.preferences.profitColumn_shrinkContents,
        },
      },
    },
    "Lista Referidos 2":{
      html:"<p>Estos parámetros se usan para controlar lo que ocurre en las paginas de listas de referidos.</p><p><strong>Estos ajustes afectan sólo a miembros Ultimate:</strong></p>",
      fields:{
        columnHeader_clickText: {
          type:"html",
          html:"<br><p><b>Columna Click Text ('Clicks/day'):</b></p>",
        },
        showColumn_clickText:{
          type:"checkbox",
          label:"Mostrar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna "Click-Text"?</font>',
          value: myAccount.ultimatePreferences.showColumn_clickText,
        },
        columnPrefix_clickText:{
          type:"text",
          label:"Prefijo",
          text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delaante del valor "Click-Text"? Defecto: nulo</font>',
          value: myAccount.ultimatePreferences.columnPrefix_clickText,
        },
        clickText_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columnae Click Text ("Clicks/day")?</font>',
          value: myAccount.ultimatePreferences.clickText_shrinkContents,
        },
        columnHeader_average1: {
          type:"html",
          html:"<br><p><b>Columna 'Promedio 1' (A"+myAccount.preferences.timePeriod_average1+"):</b></p>",
        },
        showColumn_Average1:{
          type:"checkbox",
          label:"Mostrar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿quiere mostrar la columna promedio 1?</font>',
          value: myAccount.ultimatePreferences.showColumn_Average1,
        },
        columnPrefix_Average1:{
          type:"text",
          label:"Prefijo",
          text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar antes del valor promedio 1? ej. se puede usar parahacer que el script muestre sólo el número. Defecto: nulo</font>',
          value: myAccount.ultimatePreferences.columnPrefix_Average1,
        },
        average1_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de lacolumna promedio 1?</font>',
          value: myAccount.ultimatePreferences.average1_shrinkContents,
        },
        columnHeader_average2: {
          type:"html",
          html:"<br><p><b>Columna 'Promedio 2' (A"+myAccount.preferences.timePeriod_average2+"):</b></p>",
        },
        showColumn_Average2:{
          type:"checkbox",
          label:"Mostrar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna promedio 2?</font>',
          value: myAccount.ultimatePreferences.showColumn_Average2,
        },
        columnPrefix_Average2:{
          type:"text",
          label:"Prefijo",
          text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delante del valor promedio 2? ej. se puede usar para hacer que el script muestre sólo el número. Defecto: nulo</font>',
          value: myAccount.ultimatePreferences.columnPrefix_Average2,
        },
        average2_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna promedio 2?</font>',
          value: myAccount.ultimatePreferences.average2_shrinkContents,
        },
        header_sdColumn: {
          type:"html",
          html:"<br><p><b>Columna 'Desviación Standard' (SD):</b></p>",
        },
        showSDEVColumn:{
          type:"checkbox",
          label:"Mostrar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna SD?</font>',
          value: myAccount.ultimatePreferences.showSDEVColumn,
        },
        columnPrefix_SD:{
          type:"text",
          label:"Prefijo",
          text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delante del valor SD? ej. puede usarse para que el script muestre sólo el número. Defecto: nulo</font>',
          value: myAccount.ultimatePreferences.columnPrefix_SD,
        },
        SD_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna SDEV?</font>',
          value: myAccount.ultimatePreferences.SD_shrinkContents,
        },
        header_rsaColumn: {
          type:"html",
          html:"<br><p><b>Columna 'Relación entre Desviación Standard y Promedio' (RSA):</b></p>",
        },
        showColumn_RSA:{
          type:"checkbox",
          label:"Mostrar RSA:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna RSA?<br>NOTA: RSA == Relación entre desviación Standard y AVG</font>',
          value: myAccount.ultimatePreferences.showColumn_RSA,
        },
        columnPrefix_RSA:{
          type:"text",
          label:"Prefijo",
          text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delante del valor RSA? ej. puede usarse para hacer que el script sólo muestre el número. Defecto: nulo</font>',
          value: myAccount.ultimatePreferences.columnPrefix_RSA,
        },
        RSA_shrinkContents:{
          type:"checkbox",
          label:"Acortar:",
          text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna RSA?</font>',
          value: myAccount.ultimatePreferences.RSA_shrinkContents,
        },
      },
    },
    "Periodo Tiempo":{
      html:'<p>Estos ajustes cambian el número de días para calcular los promedios bajo los gráficos.<br></p>',
      fields:{
        spacer_1: {
          type:"html",
          html:"<br><p>Periodos de tiempo para gráficos cortos:</p>",
        },
        timePeriod_s1: {
          type:"select",
          label:"Días Periodo 1",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Defecto: 4</font>',
          value:myAccount.preferences.timePeriod_s1,
        },
        timePeriod_s2: {
          type:"select",
          label:"Días Periodo 2",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Defecto: 7<br>NOTA: El tiempo del Periodo 2 debe ser mayor que el tiempo del Periodo 1</font>',
          value:myAccount.preferences.timePeriod_s2,
        },
        timePeriod_s3: {
          type:"select",
          label:"Días Periodo 3",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Defecto: 10<br>NOTA: El tiempo del Periodo 3 debe ser mayor que el tiempo del Periodo 2</font>',
          value:myAccount.preferences.timePeriod_s3,
        },
        spacer_2: {
          type:"html",
          html:"<br><p>Periodos de tiempo para gráficos grandes:</p>",
        },
        timePeriod_1: {
          type:"select",
          label:"Días Periodo 1",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            "11":"11", "12":"12", "13":"13",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Defecto: 5</font>',
          value:myAccount.preferences.timePeriod_1,
        },
        timePeriod_2: {
          type:"select",
          label:"Días Periodo 2",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            "11":"11", "12":"12", "13":"13", "14":"14",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Defecto: 10<br>NOTA: El tiempo del Periodo 2 debe ser mayor que el tiempo del Periodo 1</font>',
          value:myAccount.preferences.timePeriod_2,
        },
        timePeriod_3: {
          type:"select",
          label:"Días Periodo 3",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            "11":"11", "12":"12", "13":"13", "14":"14", "15":"15",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Defecto: 15<br>NOTA: El tiempo del Periodo 3 debe ser mayor que el tiempo del Periodo 2</font>',
          value:myAccount.preferences.timePeriod_3,
        },
        spacer_3: {
          type:"html",
          html:"<br><p>(Sólo Ultimates):</p>",
        },
        timePeriod_recent: {
          type:"select",
          label:"Minigráfica AVG",
          options:{
            "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
            "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
          },
          text: '<font style="font-size: x-small; font-style: italic;">Defecto: 7; sólo Ultimates;</font>',
          value:myAccount.preferences.timePeriod_recent,
        },
      },
    },
    /*"Conf. Lenguaje":{
      html:'<p>Parámetros de Lenguaje:</p>',
      fields:{
        neobuxLanguage: {
          type:"select",
          label:"Lenguaje Neobux",
          options:{
            "Inglés":"EN",
            "Portugués":"PT",
            "Español":"SP",
          },
          text: '<font style="font-size: x-small; font-style: italic;">¿Qué lenguaje tienes en Neobux?</font>',
          value:myAccount.preferences.neobuxLanguage,
        },
        spacer_1: {
          type:"spacer",
          height:"15px",
        },
        scriptLanguage: {
          type:"select",
          label:"Lenguaje Script",
          options:{
            "Inglés":"EN",
            "Portugués":"PT",
            "Español":"SP",
          },
          text: '<font style="font-size: x-small; font-style: italic;">¿En qué lenguaje quieres el script?<br>Nota: Sólo se pueden seleccionar los lenguajes que están instalados y el soporte no Inglés es <b>_extremamente_</b> limitado.</font>',
          value:myAccount.preferences.scriptLanguage,
        },
      },
    },*/
      "Conf. Actualización":{
      html:'<p>Parámetros de Actualización:</p>',
      fields:{
        updateFrequency:{
          type:"text",
          label:"Frecuencia Actualización",
          text: '<font style="font-size: x-small; font-style: italic;">¿Con quéfrecuencia quiere que el script busque actualizaciones [minutos]?<br>Recomendado: 120 [minutos] (NOTA: Entre sólo el número)</font>',
          value: myAccount.preferences.updateFrequency,
        },
      },
    },
    "Acerca de":{
      html:'<p><strong>Acerca del script:</strong></p>'+
      '<p>Este script se ha diseñado para hacer la gestión de su cuenta Neobux tan fácil como sea posible y poner la mayor cantidad de información posible a su alcance.</p>'+
      '<p><strong>¿Quiere agradecer?</strong></p>'+
      '<p>Siempre es agradable escuchar a las personas a quienes les gusta el trabajo que hago - basta con dirigirse a los <a href="http://www.neobux.com/forum/?frmid=1&tpcid=143152">forosNeobux</a> y un simple "Quiero un bebé tuyo!" o "tú eres mi super-estrella!" sería suficiente, pero un post generoso simplemente diciendo "gracias" también será bienvenido siempre =]<br><br>'+
      'Por cierto, si encuentra que algo no funciona bien y ya ha comprobado que los duendes no le hicieron una jugarreta, los <a href="http://www.neobux.com/forum/?frmid=1&tpcid=143152">foros Neobux</a> deben ser su primera escala para sus preguntas y quejas. </p><br>'+
      '<p><strong>Otros Scripts de Kwah</strong></p>'+
      '<p>Si le gusta este script, eche un vistazo a mis otros scripts en <a href="http://userscripts.org/users/211885/scripts">userscripts.org</a><br>No todos ellos son tan útiles como éste y normalmente la descripción es lo suficientemente buena como para averiguar lo que hace, pero pueden enviar las preguntas mismo lugar que el anterior.</p>'+
      // '<p><strong>Historia del script:</strong></p>'+
      // '<p>El script Neobux 2+ ha tenido bastantes contribuyentes durante su existencia. Que yo sepa, fue creado originalmente por uriburi206 y mantenido y actualizado después por oselamet (JM2T también tradujo el script en alguna ocasión =]).<br><br>Más tarde kwah se hizo cargo y reescribió el código, lanzándolo como la versión SP (Aldione).</p>'+
      '',
      fields:{
      },
    }
  };
  }
  break;
}


var newDialog_Style = "" +
  "#modalContainer {"+
    "background-color: transparent;"+
    "position: absolute;"+
    "width: 100%;"+
    "height: 100%;"+
    "top: 0px;"+
    "left: 0px;"+
    "z-index: 10000;"+
    "background-image: url(tp.png); /* required by MSIE to prevent actions on lower z-index elements */"+
 " }"+

  "#alertBox {"+
    "position: relative;"+
    "width: 300px;"+
    "min-height: 100px;"+
    "margin-top: 50px;"+
    "border: 2px solid #000;"+
    "background-color: #F2F5F6;"+
    "background-image: url(alert.png);"+
    "background-repeat: no-repeat;"+
    "background-position: 20px 30px;"+
 " }"+

  "#modalContainer > #alertBox {"+
    "position: fixed;"+
 " }"+

  "#alertBox h1 {"+
    "margin: 0;"+
    "font: bold 0.9em verdana,arial;"+
    "background-color: #78919B;"+
    "color: #FFF;"+
    "border-bottom: 1px solid #000;"+
    "padding: 2px 0 2px 5px;"+
 " }"+

  "#alertBox p {"+
    "font-family: verdana,arial;"+
    "padding: 10px;"+
    "margin: 10px;"+
    "height: auto;"+
 " }"+

  "#alertBox textarea {"+
    "font-family: monospace,courier new,verdana,arial;"+
    "font-size: x-small;"+
    "margin: 15px;"+
    "margin-top: 0px;"+
    "height: auto;"+
    "width: 85%;"+
 " }"+

  "#alertBox #closeBtn {"+
    "display: block;"+
    "position: relative;"+
    "margin: 15px auto;"+
    "padding: 3px;"+
    "border: 2px solid #000;"+
    "width: 70px;"+
    "font: 0.7em verdana,arial;"+
    "text-transform: uppercase;"+
    "text-align: center;"+
    "color: #FFF;"+
    "background-color: #78919B;"+
    "text-decoration: none;"+
  "}";
  


// over-ride the alert method only if this a newer browser.
// Older browser will see standard alerts
// if(document.getElementById) {
  // window.alert = function (txt) {
    // createExportDialog(txt);
  // }
// }

function createExportDialog(txt,exportText,ALERT_TITLE,ALERT_BUTTON_TEXT,exportText_reversed,event) {
  var textareaContents = exportText;
  if(event.ctrlKey && event.altKey && exportText_reversed) { var textareaContents = exportText_reversed; }

  createCustomAlert(txt,textareaContents,ALERT_TITLE,ALERT_BUTTON_TEXT);
}

function createCustomAlert(txt,textareaContents,ALERT_TITLE,ALERT_BUTTON_TEXT) {
// constants to define the title of the alert and button text.
  if(!txt) { var txt = ''; }
  if(!textareaContents) { var textareaContents = ''; }
  if(!ALERT_TITLE) { var ALERT_TITLE = "Oops!"; }
  if(!ALERT_BUTTON_TEXT) { var ALERT_BUTTON_TEXT = "Ok"; }
  
  // shortcut reference to the document object
  var d = document;

  // if the modalContainer object already exists in the DOM, bail out.
  if(d.getElementById("modalContainer")) return;

  // create the modalContainer div as a child of the BODY element
   // make sure its as tall as it needs to be to overlay all the content on the page
  var mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = document.documentElement.scrollHeight + "px";

  // create the DIV that will be the alert 
  var alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
  

  var newDialogStyle = alertObj.appendChild(d.createElement('style'));
    newDialogStyle.setAttribute('type','text/css');
    newDialogStyle.innerHTML = newDialog_Style;


  // MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
  if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";

  // center the alert box
  alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";

  // create an H1 element as the title bar
  var h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

  if(txt != '') {
    // create a paragraph element to contain the txt argument
    var msg = alertObj.appendChild(d.createElement("p"));
    msg.innerHTML = txt;
  }

  if(textareaContents != '') {
    // create a textarea
    var textarea = alertObj.appendChild(d.createElement("center")).appendChild(d.createElement("textarea"));
    textarea.value = textareaContents;
    
    var maxHeight = 300;

    var adjustedHeight = textarea.clientHeight;
    if(!maxHeight || maxHeight > adjustedHeight ) {
      adjustedHeight = Math.max(textarea.scrollHeight, adjustedHeight);
      if(maxHeight ) {
        adjustedHeight = Math.min(maxHeight, adjustedHeight);
      }
      if(adjustedHeight > textarea.clientHeight ) {
        textarea.style.height = adjustedHeight + "px";
      }
    }
  }
  
  // create an anchor element to use as the confirmation button.
  var btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));

  // set up the onclick event to remove the alert when the anchor is clicked
  btn.addEventListener('click', function () { removeCustomAlert(); }, false);

}

// removes the custom alert from the DOM
function removeCustomAlert() {
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}

function refStatsPage() {
  // Grab the embeds that have a height='140'
  // these embeds are the 'big' graphs (NOT the projected average graphs)
  var xpathEmbeds = "//script";
  var xpathResults_embeds = document.evaluate(xpathEmbeds,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null );
  var embeds;
  var chartXML;
  customLogger('xpathResults_embeds.snapshotLength = '+xpathResults_embeds.snapshotLength,6);
  for (var graphNumber = 0, length = xpathResults_embeds.snapshotLength; graphNumber < length; graphNumber++) {
    // Get the script node containing graph info
    if(xpathResults_embeds.snapshotItem(graphNumber).text.match('eval')) {
      var eval = xpathResults_embeds.snapshotItem(graphNumber).text;
      var evals = eval.split(" ");
      for(var i = 0; i < evals.length-1; i++) {
        var evalString = evals[i].split("'");
        processGraphData(i, evalString[1]);
      }
    }
    /*
    embed = xpathResults_embeds.snapshotItem(graphNumber);
    chartXML = embed.getAttribute('flashvars').split('dataXML=')[1].replace("caption='' ","");

    // Process the chartXML that has just been extracted
    processGraphData(graphNumber,chartXML,embed);
    // Insert details about each graph
    insertGraphAverages(embed,graphNumber);*/
  }

  // Insert the 'sidebar statistics' area
  insertSidebar();

     recent.IN = new Array();
     recent.OUT = new Array();
     recent.net = new Array();
    for (var i = 1; i < rentedClicks.totals.length; i++) {
      recent.IN[i] = myAccount.referralClickValue * (rentedClicks.totals[i] + directClicks.totals[i]);
      recent.OUT[i] = recycleCost.totals[i] + autopayCost.totals[i] + renewalCost.totals[i];
      recent.net[i] = (recent.IN[i] - recent.OUT[i]).toFixed(3);
    }


  // Insert summary data at the very bottom of the page
  //var masterTable = document.getElementById(embed.id+"Div").parentNode.parentNode.parentNode;
  var newRow = document.createElement("TR");
    newRow.style.height = "15px";
  var newCol = document.createElement("TD");
    newCol.colSpan = 2;
    newCol.style.backgroundColor = "#AAAAAA";// "#c1f5c1";
    newCol.style.fontFamily = "verdana";
    newCol.style.fontWeight = "bold";
    newCol.style.height = "20px";
    newCol.style.fontSize = "9px";
    newCol.style.border = "1px solid #aaaaaa";
    newCol.style.backgroundImage = "url('" + img_grayBackground + "')";
    newCol.style.width = "170px";
    newCol.style.textAlign = "left";
    newCol.style.verticalAlign = "middle";
    newRow.appendChild(newCol);
  
  var spacer = '<small><small>  |  </small></small>';
    newCol.innerHTML = "<font style='font-size:9px;color:#ffffff'> | "+localString('dailyNetIncome')+" :"+
    " ("+myAccount.preferences.timePeriod_s3+") $"+parseFloat(recent.net[myAccount.preferences.timePeriod_s3]).toFixed(3)+spacer+
    " ("+myAccount.preferences.timePeriod_s2+") $"+parseFloat(recent.net[myAccount.preferences.timePeriod_s2]).toFixed(3)+spacer+
    " ("+myAccount.preferences.timePeriod_s1+") $"+parseFloat(recent.net[myAccount.preferences.timePeriod_s1]).toFixed(3)+spacer+
    " (3) $"+parseFloat(recent.net[3]).toFixed(3)+spacer+
    " (2) $"+parseFloat(recent.net[2]).toFixed(3)+spacer+
    " (1) $"+parseFloat(recent.net[1]).toFixed(3)+
    "</font>";

  // Insert the row that contains the account summary data 
  //masterTable.appendChild(newRow);

}

function processGraphData(graphNumber,evalString) {
// Function that extracts the data from each graph
  customLogger('graphNumber = '+graphNumber, 6);
  var str = decode64(evalString)

  var stats = new Array();
  var dates = new Array();
  var values = new Array();
  var totals = new Array();

  strDates = str.split("[");strDates = strDates[1].split("]", 1);
  strDates = strDates[0].replace(/["']{1}/gi, "");
  strValues = str.split("[");strValues = strValues[3].split("]", 1);

  strDates = strDates.split(",");
  strValues = strValues[0].split(",");
  // Extract the dates & values from the chart data
  for (var j = 0; j < strDates.length; j++) {
    dates[j] = strDates[j];
    values[j] = parseFloat(strValues[j]);
  }

  // Reverse the order of the data so that the most recent data is first
  // (unless the graph being processed is the scheduled rental payments graph)
  if(graphNumber !== 6) {
    dates.reverse();
    values.reverse();
  }


  // Calculate running totals for the data in the graph
  var totals = new Array();
  for (var i = 0, length = values.length; i < length; i++) {
    if(i == 0) { totals[i] = values[i] }
    else { totals[i] = totals[i-1] + values[i]; }
  }



  // Attach the graphProperties to the relevant variable name
  if(currentPage.name == 'refStats') {
  // Variable names for the Referral Statistics page
    switch(graphNumber) {
      case 0:
        directClicks = new graphProperties(values,totals);
        var projectedDirect = document.evaluate('//span[@class="f_b"]',
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null).snapshotItem(1);
        directClicksProjected = projectedDirect.innerHTML.match(/([0-9]\.[0-9][0-9])/)[1];
        directClicks.today_projected = parseFloat(directClicksProjected);
          customLogger('directClicks.today_projected = '+directClicks.today_projected,5);
        break;
      case 1:
        rentedClicks = new graphProperties(values,totals);
        var projectedDirect = document.evaluate('//span[@class="f_b"]',
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null).snapshotItem(4);
        rentedClicksProjected = projectedDirect.innerHTML.match(/([0-9]\.[0-9][0-9])/)[1];
        rentedClicks.today_projected = rentedClicksProjected;
        customLogger('rentedClicks.today_projected = '+rentedClicks.today_projected,5);
        break;
      case 2:
        recycleCost = new graphProperties(values,totals);
        break;
      case 3:
        autopayCost = new graphProperties(values,totals);
        break;
      case 4:
        renewalCost = new graphProperties(values,totals);
        break;
      case 5:
        transfersToRentalBalance = new graphProperties(values,totals);
        break;
      case 6:
        rentalsDue = new graphProperties(values,totals);
        break;
    }
  }
  else if(currentPage.name == 'accSummary') {
  // variable / graph names for the Account Summary page
    switch(graphNumber) {
      case 0:
        ownClicks = new graphProperties(values,totals);
        break;
      case 1:
        ownClicks_Local = new graphProperties(values,totals);
        break;
    }
  }
}


function insertSidebar() {
  // Function which inserts the 'Statistics Sidebar' to the side of the page
     // Location to insert the sidebar

  if('Chrome' == browserName) {
    var xpath = '//td[@width="729"]/table/tbody/tr[2]';
  } 
    else {
    	var wrapper = document.createElement('DIV');
      var wrapperContent = document.body.innerHTML;
      document.body.innerHTML = "";
      wrapper.innerHTML = wrapperContent;
      wrapper.style.margin = "0 auto";
      wrapper.style.width = "902px";
      document.body.appendChild(wrapper);
     var xpath = '//div/div[2]/table/tbody/tr';
  }




  var xpathResult = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);

  var locationToInsert = xpathResult; // right hand side

    today.projectedRentedClicks = rentedClicks.today_projected * numberOfRentedReferrals;
    today.projectedDirectClicks = directClicks.today_projected * numberOfDirectReferrals;
    today.projectedIncome = myAccount.referralClickValue * (today.projectedRentedClicks + today.projectedDirectClicks);

    today.income = myAccount.referralClickValue * (rentedClicks.today + directClicks.today);
    today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;
    today.netIncome = (today.income - today.expenses).toFixed(2);

    yesterday.income = myAccount.referralClickValue * (rentedClicks.yesterday + directClicks.yesterday);
    yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;
    yesterday.netIncome = (yesterday.income - yesterday.expenses).toFixed(2);

    recent.income = new Array();
    recent.expenses = new Array();
    recent.netIncome = new Array();
    
    customLogger('rentedClicks.totals.length = '+rentedClicks.totals.length,5);
    
    for (var i = 0; i < rentedClicks.totals.length; i++) {
      recent.income[i] = myAccount.referralClickValue * (rentedClicks.totals[i] + directClicks.totals[i]);
      recent.expenses[i] = recycleCost.totals[i] + autopayCost.totals[i] + renewalCost.totals[i];
      recent.netIncome[i] = (recent.income[i] - recent.expenses[i]).toFixed(2);
    }

    today.directAverage = (directClicks.today / numberOfDirectReferrals).toFixed(2);
    yesterday.directAverage = (directClicks.yesterday / numberOfDirectReferrals).toFixed(2);
    recent.directAverage = (directClicks.recent / numberOfDirectReferrals).toFixed(2);

    if(!numberOfDirectReferrals > 0) {
      today.directAverage = '0.00';
      yesterday.directAverage = '0.00';
      recent.directAverage = '0.00';
    }

    today.rentedAverage =       (rentedClicks.today / numberOfRentedReferrals).toFixed(2);
    yesterday.rentedAverage =   (rentedClicks.yesterday / numberOfRentedReferrals).toFixed(2);
    recent.rentedAverage =      ((rentedClicks.recent / numberOfRentedReferrals) / myAccount.preferences.timePeriod_recent).toFixed(2);
    
    today.rentedRAverage =      ((rentedClicks.today - (recycleCost.today*100)) / numberOfRentedReferrals).toFixed(2);
    yesterday.rentedRAverage =  ((rentedClicks.yesterday - (recycleCost.yesterday*100)) / numberOfRentedReferrals).toFixed(2);
    recent.rentedRAverage =     (((rentedClicks.recent - (recycleCost.recent*100)) / numberOfRentedReferrals) / myAccount.preferences.timePeriod_recent).toFixed(2);

    if(!numberOfRentedReferrals > 0) {
      today.rentedAverage = '0.00';
      today.rentedRAverage = '0.00';
      yesterday.rentedAverage = '0.00';
      yesterday.rentedRAverage = '0.00';
      recent.rentedAverage = '0.00';
      recent.rentedRAverage = '0.00';
    }

    today.totalRAverage = (((rentedClicks.today + directClicks.today) - (recycleCost.today*100)) / myAccount.getTotalRefCount).toFixed(2);
    yesterday.totalRAverage = (((rentedClicks.yesterday + directClicks.yesterday) - (recycleCost.yesterday*100)) / myAccount.getTotalRefCount).toFixed(2);
    recent.totalRAverage = (((rentedClicks.recent + directClicks.recent) - (recycleCost.recent*100)) / myAccount.getTotalRefCount).toFixed(2);
    
    if(numberOfDirectReferrals == 0 && numberOfRentedReferrals == 0) {
      today.totalRAverage = '0.00 <small>(zero refs)</small>';
      yesterday.totalRAverage = '0.00 <small>(zero refs)</small>';
      recent.totalRAverage = '0.00 <small>(zero refs)</small>';
    }
    
    today.income = (rentedClicks.today + directClicks.today) * myAccount.referralClickValue;
    today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;
    
    yesterday.income = (rentedClicks.yesterday + directClicks.yesterday) * myAccount.referralClickValue;
    yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;
    
    recent.income = (rentedClicks.recent + directClicks.recent) * myAccount.referralClickValue;
    recent.expenses = recycleCost.recent + autopayCost.recent + renewalCost.recent;

    var spacer = document.createElement("TD");
    spacer.setAttribute('style', 'width: 6px; font-size: 6px; padding: 0px;');
    spacer.innerHTML = "&nbsp;";

    var infoLabel = document.createElement("TD");
    infoLabel.setAttribute('style', 'background-color: #ffffff;');
    infoLabel.setAttribute('rowSpan', '3');
    infoLabel.style.border = "1px solid #aaaaaa";
    infoLabel.style.verticalAlign = "top";
    infoLabel.style.paddingTop = "0px";
    infoLabel.style.paddingBottom = "1px";
    infoLabel.style.paddingLeft = "8px";
    infoLabel.style.width = "172px";
    infoLabel.style.backgroundRepeat = "no-repeat";
    infoLabel.style.marginLeft = "2px";

    var sidebarStyle = document.createElement('style');
    sidebarStyle.innerHTML = ""+
      "span.sidebarContent"+
      "{"+
      "  font-family: Verdana, Arial, Helvetica, sans-serif;"+
      "  font-size: x-small !important;"+
      "}"+
      "div.sidebarDetails"+
      "{"+
      "  font-size: 98%;"+
      "  margin-left: 2px;"+
      "}"+

      "h4"+
      "{"+
      "  color: #444;"+
      "  padding-left: 3px;"+
      "  margin-top: 10px;"+
      "  margin-bottom:2px"+
      "}"+
      "h5"+
      "{"+
      "  margin-top: 7px;"+
      "  margin-bottom:2px"+
      "}"+
      "h6"+
      "{"+
      "  font-size: xx-small !important;"+
      "  margin-top: 2px;"+
      "  margin-bottom:2px"+
      "}"+
      ".bold"+
      "{"+
      "  font-weight: bold;"+
      "}"+
      ".grey"+
      "{"+
      "  color: #aaa;"+
      "}";


    infoLabel.innerHTML = (""+
      "<span class='sidebarContent'>"+
      "<span class='sidebarHeader'>"+
      "<h4 class='bold'>"+localString('statsSum')+"<br>"+

      "</span>"+

      "<h5 class='bold'><span class='grey'>    [ "+localString('today')+" ]</span><br>    "+localString('net')+" : $"+today.netIncome+"</h5>"+
      "<hr width= '150px' height='1px' color='#cccccc'/>"+

        "<h6>    "+localString('totals')+"</h6>"+
        "<div class='sidebarDetails'>"+

          "- "+localString('totalReferrals')+" : "+myAccount.getTotalRefCount+"</h4><br>"+      
          "- "+localString('totalClicks')+" : "+(rentedClicks.today + directClicks.today)+"<br>"+
          "-      "+localString('clicksRemaining')+" : "+((today.projectedRentedClicks + today.projectedDirectClicks) - (rentedClicks.today + directClicks.today)).toFixed(0)+"<br>"+

          "- "+localString('stats')+" : "+today.totalRAverage+"<br>"+
          "-      "+localString('provided')+" : "+((today.projectedRentedClicks + today.projectedDirectClicks) / (myAccount.rentedRefCount + myAccount.directRefCount)).toFixed(2)+"<br>"+

          "- "+localString('net')+" : $"+(today.income - today.expenses).toFixed(2)+"<br>"+
          "-      "+localString('income')+" : $"+today.income.toFixed(2)+"<br>"+
          "-      "+localString('expenses')+" : $"+today.expenses.toFixed(2)+"<br>"+
          "- "+localString('remainingNet')+" : $"+(today.projectedIncome - today.income).toFixed(2)+"<br>"+
        "</div>"+
        "<div class='sidebarDetails'>"+
        "<h6>   "+localString('rentedReferrals')+"</h6>"+
          "- "+localString('amount')+" : "+myAccount.rentedRefCount+"<br>"+
          "- "+localString('totalClicks')+" : "+rentedClicks.today+"<br>"+
          "-       "+localString('clicksRemaining')+" : "+(today.projectedRentedClicks - rentedClicks.today).toFixed(0)+"<br>"+
          "- "+localString('stats')+" : "+today.rentedAverage+"<br>"+
          "- "+localString('income')+" : $"+(rentedClicks.today*myAccount.referralClickValue).toFixed(2)+"<br>"+
          "-       "+localString('incomeRemaining')+" : $"+((today.projectedRentedClicks - rentedClicks.today) * myAccount.referralClickValue).toFixed(2)+"<br>"+
        "<h6>   "+localString('directReferrals')+"</h6>"+
          "- "+localString('amount')+" : "+myAccount.directRefCount+"<br>"+
          "- "+localString('totalClicks')+" : "+directClicks.today+"<br>"+
          "-       "+localString('clicksRemaining')+" : "+(today.projectedDirectClicks - directClicks.today).toFixed(0)+"<br>"+
          "- "+localString('stats')+" : "+today.directAverage+"<br>"+
          "- "+localString('income')+" : $"+(directClicks.today*myAccount.referralClickValue).toFixed(2)+"<br>"+
          "-       "+localString('incomeRemaining')+" : $"+((today.projectedDirectClicks - directClicks.today)* myAccount.referralClickValue).toFixed(2)+"<br>"+
        "</div>"+
        "<h6>    "+localString('expenses')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('Recycle')+" : $"+recycleCost.today.toFixed(2)+"<br>"+
          "- "+localString('autopay')+" : $"+autopayCost.today.toFixed(4)+"<br>"+
          "- "+localString('renew')+" : $"+renewalCost.today.toFixed(2)+"<br>"+
        "</div>"+

      "<h5 class='bold'><span class='grey'>    [  "+localString('yesterday')+" ]</span><br>    "+localString('net')+" : $"+yesterday.netIncome+"</h5>"+
      "<hr width= '150px' height='1px' color='#cccccc'/>"+

        "<h6>    "+localString('totals')+"</h6>"+
        "<div class='sidebarDetails'>"+

          "- "+localString('income')+" : $"+yesterday.income.toFixed(2)+"<br>"+
          "- "+localString('expenses')+" : $"+(yesterday.expenses).toFixed(2)+"<br>"+
          "- "+localString('net')+" : $"+(yesterday.income - yesterday.expenses).toFixed(2)+"<br>"+
        "</div>"+
      "<h6>    "+localString('income')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" : ("+rentedClicks.yesterday+") $"+(rentedClicks.yesterday*myAccount.referralClickValue).toFixed(2)+"<br>"+
          "- "+localString('direct')+" : ("+directClicks.yesterday+") $"+(directClicks.yesterday*myAccount.referralClickValue).toFixed(2)+"<br>"+
        "</div>"+
        "<h6>    "+localString('expenses')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('Recycle')+" : $"+recycleCost.yesterday.toFixed(2) +"<br>"+
          "- "+localString('autopay')+" : $"+autopayCost.yesterday.toFixed(4) +"<br>"+
          "- "+localString('renew')+" : $"+renewalCost.yesterday.toFixed(2) +"<br>"+
        "</div>"+
        "<h6>    "+localString('stats')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" : "+yesterday.rentedAverage +"<br>"+
          "- "+localString('direct')+" : "+yesterday.directAverage +"<br>"+
          "- "+localString('raverage')+" : "+yesterday.totalRAverage +"<br>"+
        "</div>"+

      "<h5 class='bold'><span class='grey'>    [ "+localString('last')+" "+myAccount.preferences.timePeriod_recent+" "+localString('Days')+"]</span><br>    "+localString('net')+" : $"+recent.netIncome[myAccount.preferences.timePeriod_recent]+"</h5>"+
      "<hr width= '150px' height='1px' color='#cccccc'/>"+

        "<h6>    "+localString('totals')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('income')+" : $"+recent.income.toFixed(2)+"<br>"+

          "- "+localString('expenses')+" : $"+recent.expenses.toFixed(2)+"<br>"+
          "- "+localString('net')+" : $"+(recent.income - recent.expenses).toFixed(2)+"<br>"+
        "</div>"+
        "<h6>    "+localString('income')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" : ("+rentedClicks.recent+") $"+(rentedClicks.recent*myAccount.referralClickValue).toFixed(2)+"<br>"+
          "- "+localString('direct')+" : ("+directClicks.recent+") $"+(directClicks.recent*myAccount.referralClickValue).toFixed(2)+"<br>"+
        "</div>"+
        "<h6>    "+localString('expenses')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('Recycle')+" : $"+recycleCost.recent.toFixed(2) +"<br>"+
          "- "+localString('autopay')+" : $"+autopayCost.recent.toFixed(4) +"<br>"+
          "- "+localString('renew')+" : $"+renewalCost.recent.toFixed(2) +"<br>"+
        "</div>"+
        "<h6>    "+localString('stats')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" : "+recent.rentedAverage +"<br>"+
          "- "+localString('direct')+" : "+recent.directAverage +"<br>"+
          "- "+localString('raverage')+" : "+recent.totalRAverage +"<br>"+
        "</div>"+
      "</span>");


    infoLabel.appendChild(sidebarStyle);

  //// *** INSERT STATISTICS SUMMARY INTO PAGE *** ////
  locationToInsert.appendChild(spacer);
  locationToInsert.appendChild(infoLabel);

  //// enlarge the width of the page to accomodate the extra column and add a little padding to make it look nicer ////
  locationToInsert.parentNode.parentNode.parentNode.setAttribute('style', 'width: 902px; margin: 0pt -26pt;');
  var nodesSnapshot = document.evaluate("//body/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < nodesSnapshot.snapshotLength; ++i) {
    nodesSnapshot.snapshotItem(i).style.width = "902px";
  }
  nodesSnapshot.snapshotItem(nodesSnapshot.snapshotLength - 1).childNodes[0].style.width = null;
  var script = document.createElement("script");
    script.type = 'text/javascript';
  script.textContent = 'setTimeout(\'jQuery(window).resize()\', 50);';
  document.evaluate('//body', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).appendChild(script);
}

function insertGraphAverages(embed,graphNumber) {
// Function to insert the statistics below graphs
  var statDiv = document.getElementById(embed.id+"Div");
  var earnStr;
  
  var avgLabel = document.createElement("DIV");
    avgLabel.style.width = (parseInt(embed.width) - 2 - 3) + 'px';
    avgLabel.style.height = "14px";
    avgLabel.style.fontFamily = "verdana";
    avgLabel.style.fontWeight = "bold";
    avgLabel.style.fontSize = "9px";
    avgLabel.style.color = "#555555";
    avgLabel.style.verticalAlign = "middle";
    avgLabel.style.textAlign = "left";
    avgLabel.style.borderLeft = "1px solid #aaaaaa";
    avgLabel.style.borderRight = "1px solid #aaaaaa";
    avgLabel.style.borderBottom = "1px solid #aaaaaa";
    avgLabel.style.backgroundColor = "#ffdd00";
    avgLabel.style.backgroundImage = "url('" + img_yellowBackground + "')";
    avgLabel.style.whiteSpace = 'nowrap';
    avgLabel.style.paddingLeft = '3px';
    avgLabel.style.top = statDiv.style.height;
    statDiv.style.height = (parseInt(statDiv.style.height) + 20) + 'px';
    avgLabel.style.color = "#444444";
    avgLabel.innerHTML = ' ';

  var dailyEarnLabel = dailyEarnLabel = document.createElement("DIV");
    dailyEarnLabel.style.width = (parseInt(embed.width) - 2 - 3) + 'px';
    dailyEarnLabel.style.height = "14px";
    dailyEarnLabel.style.fontFamily = "verdana";
    dailyEarnLabel.style.fontWeight = "bold";
    dailyEarnLabel.style.fontSize = "9px";
    dailyEarnLabel.style.verticalAlign = "middle";
    dailyEarnLabel.style.textAlign = "left";
    dailyEarnLabel.style.borderLeft = "1px solid #aaaaaa";
    dailyEarnLabel.style.borderRight = "1px solid #aaaaaa";
    dailyEarnLabel.style.borderBottom = "1px solid #aaaaaa";
    dailyEarnLabel.style.backgroundColor = "#8899aa";    //"#7fac21";
    dailyEarnLabel.style.whiteSpace = 'nowrap';
    dailyEarnLabel.style.paddingLeft = '3px';
    dailyEarnLabel.style.top = statDiv.style.height;
    dailyEarnLabel.innerHTML = ' ';
    
    statDiv.style.height = (parseInt(statDiv.style.height)-(-20))+"px";
  
  var graphLabel = new Array();
  if(currentPage.name == 'refStats') {
  // Code to insert stats below graphs on the Referral Statistics page
    if(graphNumber == 0) {
    // Direct clicks 
      dailyEarnLabel.style.backgroundImage = "url('" + img_greenBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      avgLabel.innerHTML = localString('averages')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") "+(directClicks.mean[myAccount.preferences.timePeriod_s3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") "+(directClicks.mean[myAccount.preferences.timePeriod_s2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") "+(directClicks.mean[myAccount.preferences.timePeriod_s1]).toFixed(3)+"";
      statDiv.appendChild(avgLabel);

      earnStr = " "+localString('avgIncome')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") $"+((directClicks.mean[myAccount.preferences.timePeriod_s3])*myAccount.referralClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") $"+((directClicks.mean[myAccount.preferences.timePeriod_s2])*myAccount.referralClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") $"+((directClicks.mean[myAccount.preferences.timePeriod_s1])*myAccount.referralClickValue).toFixed(3);
      
      graphLabel[graphNumber] = 'Direct Referral clicks credited';
      graphData = directClicks.value;
    }
    else if(graphNumber == 1) {
    // Rented clicks
      dailyEarnLabel.style.backgroundImage = "url('" + img_greenBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      avgLabel.innerHTML = localString('averages')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") "+(rentedClicks.mean[myAccount.preferences.timePeriod_s3]).toFixed(2)+
      " ("+myAccount.preferences.timePeriod_s2+") "+(rentedClicks.mean[myAccount.preferences.timePeriod_s2]).toFixed(2)+
      " ("+myAccount.preferences.timePeriod_s1+") "+(rentedClicks.mean[myAccount.preferences.timePeriod_s1]).toFixed(2)+"";
      statDiv.appendChild(avgLabel);

      earnStr = " "+localString('avgIncome')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") $"+((rentedClicks.mean[myAccount.preferences.timePeriod_s3])*myAccount.referralClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") $"+((rentedClicks.mean[myAccount.preferences.timePeriod_s2])*myAccount.referralClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") $"+((rentedClicks.mean[myAccount.preferences.timePeriod_s1])*myAccount.referralClickValue).toFixed(3);
      
      graphLabel[graphNumber] = 'Rented Referral clicks credited';
      graphData = rentedClicks.value;
    }
    else if(graphNumber == 2) {
    // Recycle graph
      dailyEarnLabel.style.backgroundImage = "url('" + img_redBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      avgLabel.innerHTML = localString('recycledLast')+" "+myAccount.preferences.timePeriod_3+" "+localString('days')+":"+
      " "+(recycleCost.totals[myAccount.preferences.timePeriod_3] / myAccount.recycleCost).toFixed(0)+
      " ($"+recycleCost.totals[myAccount.preferences.timePeriod_3].toFixed(3)+")";
      statDiv.appendChild(avgLabel);

      customLogger('recycleCost.totals[myAccount.preferences.timePeriod_3] = '+recycleCost.totals[myAccount.preferences.timePeriod_3]+'\n'+
      'recycleCost.totals[myAccount.preferences.timePeriod_2] = '+recycleCost.totals[myAccount.preferences.timePeriod_2]+'\n'+
      'recycleCost.totals[myAccount.preferences.timePeriod_1] = '+recycleCost.totals[myAccount.preferences.timePeriod_1],6);

      earnStr = " "+localString('avgExpenses')+" :"+
      " ("+myAccount.preferences.timePeriod_3+") $"+(recycleCost.mean[myAccount.preferences.timePeriod_3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_2+") $"+(recycleCost.mean[myAccount.preferences.timePeriod_2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_1+") $"+(recycleCost.mean[myAccount.preferences.timePeriod_1]).toFixed(3);

      graphLabel[graphNumber] = 'Recycling Costs';
      graphData = recycleCost.value;
    }
    else if(graphNumber == 3) {
    // Autopay graph
      dailyEarnLabel.style.backgroundImage = "url('" + img_redBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      avgLabel.innerHTML = localString('autopaidLast')+" "+myAccount.preferences.timePeriod_3+" "+localString('days')+":"+
      " "+(autopayCost.totals[myAccount.preferences.timePeriod_3] / myAccount.autopayCost).toFixed(0)+
      " ($"+autopayCost.totals[myAccount.preferences.timePeriod_3].toFixed(3)+")";
      statDiv.appendChild(avgLabel);

      customLogger('autopayCost.totals[myAccount.preferences.timePeriod_3] = '+autopayCost.totals[myAccount.preferences.timePeriod_3]+'\n'+
      'autopayCost.totals[myAccount.preferences.timePeriod_2] = '+autopayCost.totals[myAccount.preferences.timePeriod_2]+'\n'+
      'autopayCost.totals[myAccount.preferences.timePeriod_1] = '+autopayCost.totals[myAccount.preferences.timePeriod_1],6);

      earnStr = " "+localString('avgExpenses')+" :"+
      " ("+myAccount.preferences.timePeriod_3+") $"+(autopayCost.mean[myAccount.preferences.timePeriod_3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_2+") $"+(autopayCost.mean[myAccount.preferences.timePeriod_2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_1+") $"+(autopayCost.mean[myAccount.preferences.timePeriod_1]).toFixed(3);

      graphLabel[graphNumber] = 'Autopay Costs';
      graphData = autopayCost.value;
    }
    else if(graphNumber == 4) {
    // One more month
      dailyEarnLabel.style.backgroundImage = "url('" + img_redBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      earnStr = " "+localString('avgExpenses')+" :"+
      " ("+myAccount.preferences.timePeriod_3+") $"+(renewalCost.mean[myAccount.preferences.timePeriod_3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_2+") $"+(renewalCost.mean[myAccount.preferences.timePeriod_2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_1+") $"+(renewalCost.mean[myAccount.preferences.timePeriod_1]).toFixed(3);
      
      graphLabel[graphNumber] = 'Renewal Costs';
      graphData = renewalCost.value;
    }
    else if(graphNumber == 5) {
    // Transfers
      earnStr = " "+localString('avgTransfers')+" :"+
        " ("+myAccount.preferences.timePeriod_3+") $"+(transfersToRentalBalance.mean[myAccount.preferences.timePeriod_3]).toFixed(3)+
        " ("+myAccount.preferences.timePeriod_2+") $"+(transfersToRentalBalance.mean[myAccount.preferences.timePeriod_2]).toFixed(3)+
        " ("+myAccount.preferences.timePeriod_1+") $"+(transfersToRentalBalance.mean[myAccount.preferences.timePeriod_1]).toFixed(3);
      dailyEarnLabel.style.backgroundImage = "url('" + img_grayBackground + "')";
      dailyEarnLabel.style.color = "#eeeeee";
      
      graphLabel[graphNumber] = 'Transfers To Rental Balance';
      graphData = transfersToRentalBalance.value;
    }
    else if(graphNumber == 6) {
    // Rentals due
      dailyEarnLabel = dailyEarnLabel = document.createElement("DIV");
      dailyEarnLabel.style.width = "318px";
      dailyEarnLabel.style.height = "14px";
      dailyEarnLabel.style.fontFamily = "verdana";
      dailyEarnLabel.style.fontWeight = "bold";
      dailyEarnLabel.style.fontSize = "9px";
      dailyEarnLabel.style.textAlign = "left";
      dailyEarnLabel.style.borderLeft = "1px solid #aaaaaa";
      dailyEarnLabel.style.borderRight = "1px solid #aaaaaa";
      dailyEarnLabel.style.borderBottom = "1px solid #aaaaaa";
      dailyEarnLabel.style.backgroundColor = "#8899aa";    //"#7fac21";
      dailyEarnLabel.style.backgroundImage = "url('" + img_greenBackground + "')";
      dailyEarnLabel.style.top = statDiv.style.height;
      statDiv.style.height = (parseInt(statDiv.style.height)-(-20))+"px";
      dailyEarnLabel.style.color = "#444444";

      var rentingPeriod_7 = parseInt(rentalsDue.totals[7]);
      var rentingPeriod_autopay = parseInt(rentalsDue.totals[myAccount.autopayLimit]);
      var rentingPeriod_autopayTo30 = parseInt(rentalsDue.totals[30] - rentalsDue.totals[myAccount.autopayLimit]);
      var rentingPeriod_30to60 = parseInt(rentalsDue.totals[60] - rentalsDue.totals[30]);
      var rentingPeriod_60to90 = parseInt(rentalsDue.totals[90] - rentalsDue.totals[60]);
      var rentingPeriod_90plus = parseInt(numberOfRentedReferrals  -rentalsDue.totals[90]);

      customLogger('\nrentalsDue.totals[7] = '+rentalsDue.totals[7]+'\n'+
      'rentalsDue.totals[myAccount.autopayLimit] = '+rentalsDue.totals[myAccount.autopayLimit]+'\n'+
      'rentalsDue.totals[30] = '+rentalsDue.totals[30]+'\n'+
      'rentalsDue.totals[60] = '+rentalsDue.totals[60]+'\n'+
      'rentalsDue.totals[90] = '+rentalsDue.totals[90],6);

      customLogger('\nrentingPeriod_7 = '+rentingPeriod_7+'\n'+
      'rentingPeriod_autopay = '+rentingPeriod_autopay+'\n'+
      'rentingPeriod_autopayTo30 = '+rentingPeriod_autopayTo30+'\n'+
      'rentingPeriod_30to60 = '+rentingPeriod_30to60+'\n'+
      'rentingPeriod_60to90 = '+rentingPeriod_60to90+'\n'+
      'rentingPeriod_90plus = '+rentingPeriod_90plus,5);

      var spacer2_start = "<font style='color: #6c4e2a; font-size: xx-small;'><small><small>/ ";
      var spacer2_end = "</font></small></small>";

      var rentingPeriod_totalTo30 = spacer2_start + rentalsDue.totals[30] + spacer2_end;
      var rentingPeriod_totalTo60 = spacer2_start + rentalsDue.totals[60] + spacer2_end;
      var rentingPeriod_totalTo90 = spacer2_start + rentalsDue.totals[90] + spacer2_end;

      var spacer = '<small><small>  |  </small></small>';

      earnStr = " | " + localString('refferalsToBeRenewed') + " : " + 
        "(0-7) "                                 + rentingPeriod_7                + spacer + 
        "(0-" + myAccount.autopayLimit + ") "    + rentingPeriod_autopay          + spacer + 
        "(" + myAccount.autopayLimit + "-30) "   + rentingPeriod_autopayTo30      + " " + rentingPeriod_totalTo30 + " " + spacer + 
        "(30-60) "                               + rentingPeriod_30to60           + " " + rentingPeriod_totalTo60 + " " + spacer +
        "(60-90) "                               + rentingPeriod_60to90           + " " + rentingPeriod_totalTo90 + " " + spacer +
        "(90+) "                                 + rentingPeriod_90plus;

      dailyEarnLabel.style.backgroundImage = "url('" + img_yellowBackground + "')";
      dailyEarnLabel.style.width="658px";
      dailyEarnLabel.style.borderTop = "1px solid #aaaaaa";
      
      graphLabel[graphNumber] = 'Scheduled Renewals';
      graphData = rentalsDue.value;
    }
  }
  else if(currentPage.name == 'accSummary') {
  // Code to insert stats below graphs on the Account Summary page
    if(graphNumber == 0) {
    // Own clicks (server time)
      GM_log('ownClicks');
      GM_log(ownClicks);
      GM_log('ownClicks.mean');
      GM_log(ownClicks.mean);
      GM_log('myAccount');
      GM_log(myAccount);
      GM_log('graphSettings.refGraphLength');
      GM_log(graphSettings.refGraphLength);
      GM_log('graphSettings.regularGraphLength');
      GM_log(graphSettings.regularGraphLength);
      GM_log('myAccount.preferences');
      GM_log(myAccount.preferences);
      GM_log('myAccount.preferences.timePeriod_s3');
      GM_log(myAccount.preferences.timePeriod_s3);
      GM_log('myAccount["preferences"]["timePeriod_s3"]');
      GM_log(myAccount["preferences"]["timePeriod_s3"]);
      
      avgLabel.innerHTML = localString('averages')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") "+(ownClicks.mean[myAccount.preferences.timePeriod_s3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") "+(ownClicks.mean[myAccount.preferences.timePeriod_s2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") "+(ownClicks.mean[myAccount.preferences.timePeriod_s1]).toFixed(3)+"";
      statDiv.appendChild(avgLabel);

      earnStr = " "+localString('avgIncome')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") $"+((ownClicks.mean[myAccount.preferences.timePeriod_s3])*myAccount.ownClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") $"+((ownClicks.mean[myAccount.preferences.timePeriod_s2])*myAccount.ownClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") $"+((ownClicks.mean[myAccount.preferences.timePeriod_s1])*myAccount.ownClickValue).toFixed(3);

      dailyEarnLabel.style.backgroundImage = "url('" + img_grayBackground + "')";
      dailyEarnLabel.style.color = "#eeeeee";

      graphLabel[graphNumber] = 'Personal Clicks';
      graphData = ownClicks.value;
    }
    else if(graphNumber == 1) {
    // Own clicks (local time)
      avgLabel.innerHTML = localString('averages')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") "+(ownClicks_Local.mean[myAccount.preferences.timePeriod_s3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") "+(ownClicks_Local.mean[myAccount.preferences.timePeriod_s2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") "+(ownClicks_Local.mean[myAccount.preferences.timePeriod_s1]).toFixed(3)+"";
      statDiv.appendChild(avgLabel);

      earnStr = " "+localString('avgIncome')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") $"+((ownClicks_Local.mean[myAccount.preferences.timePeriod_s3])*myAccount.ownClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") $"+((ownClicks_Local.mean[myAccount.preferences.timePeriod_s2])*myAccount.ownClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") $"+((ownClicks_Local.mean[myAccount.preferences.timePeriod_s1])*myAccount.ownClickValue).toFixed(3);
      
      dailyEarnLabel.style.backgroundImage = "url('" + img_grayBackground + "')";
      dailyEarnLabel.style.color = "#eeeeee";
      
      graphLabel[graphNumber] = 'Own Clicks';
      graphData = ownClicks_Local.value;
      
    }
  }

  dailyEarnLabel.innerHTML = earnStr;
  statDiv.appendChild(dailyEarnLabel);
  
  // Add Export Links
  
  // Create and insert wrapper for export 'tabs'
  var exportTabsWrapper = document.createElement('div');
  // exportTabsWrapper.style.position = 'absolute';
  // exportTabsWrapper.style.float = 'left';
  exportTabsWrapper.style.position = 'relative';
  exportTabsWrapper.style.bottom = '-1px';
  exportTabsWrapper.style.textAlign = 'left';
  exportTabsWrapper.id = 'exportTabsWrapper_'+graphNumber;
  exportTabsWrapper.style.width = (parseFloat(embed.width) - 5) + 'px';;
  exportTabsWrapper.innerHTML = ' ';

  statDiv.insertBefore(exportTabsWrapper,embed);

  
  // Define the export 'tabs'
  var csvExportTab = document.createElement('div');
  var tsvExportTab = document.createElement('div');
  var xmlExportTab = document.createElement('div');
  var textExportTab = document.createElement('div');

  var exportTabStyle = '-moz-border-radius: 0.6em 0.6em 0px 0px; display: inline-block; font-size: xx-small; padding: 0px 7px; margin-right: 7px; text-align: center; cursor: pointer;'; 
  
  csvExportTab.setAttribute('style',exportTabStyle);
  csvExportTab.style.backgroundColor = '#ecd';
  // csvExportTab.style.cssFloat = 'left';
  // csvExportTab.style.width = '20px';
  csvExportTab.className = 'csvExportTab exportTab';
  csvExportTab.id = 'csvExportTab_'+graphNumber;
  csvExportTab.innerHTML = 'CSV';
  
  tsvExportTab.setAttribute('style',exportTabStyle);
  tsvExportTab.style.backgroundColor = '#edc';
  // tsvExportTab.style.cssFloat = 'left';
  // tsvExportTab.style.width = '20px';
  tsvExportTab.className = 'tsvExportTab exportTab';
  tsvExportTab.id = 'tsvExportTab_'+graphNumber;
  tsvExportTab.innerHTML = 'TSV';

  xmlExportTab.setAttribute('style',exportTabStyle);
  xmlExportTab.style.backgroundColor = '#cde';
  // xmlExportTab.style.cssFloat = 'left';
  // xmlExportTab.style.width = '20px';
  xmlExportTab.class = 'xmlExportTab exportTab';
  xmlExportTab.id = 'xmlExportTab_'+graphNumber;
  xmlExportTab.innerHTML = 'XML';

  textExportTab.setAttribute('style',exportTabStyle);
  textExportTab.style.backgroundColor = '#dce';
  // textExportTab.style.cssFloat = 'left';
  // textExportTab.style.width = '20px';
  textExportTab.class = 'textExportTab exportTab';
  textExportTab.id = 'textExportTab_'+graphNumber;
  textExportTab.innerHTML = 'Text';

  // var textAreaContents_text = '';
  // var textAreaContents_CSV = '';
  // var textAreaContents_TSV = '';
  // textAreaContents_text += graphData[i] + '\n';
  // textAreaContents_CSV += currentDate + ',' + graphData[i] + ',\n';
  // textAreaContents_TSV += currentDate + '\t' + graphData[i] + '\t\n';

  var line_text = new Array();
  var line_CSV = new Array();
  var line_TSV = new Array();

  for ( var i = 1; i <= graphData.slice(1).length; i++) {
    var date = new Date()
    if(graphNumber != 6 ) { date.setDate(Today.getDate() - i + 1); }
    else { date.setDate(Today.getDate() + i - 1); }
    var currentDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

    line_text[i-1] = graphData[i];
    line_CSV[i-1] = currentDate + ',' + graphData[i];
    line_TSV[i-1] = currentDate + '\t' + graphData[i];
  }

  var textAreaContents_text = line_text.join('\n');
  var textAreaContents_CSV = line_CSV.join(',\n');
  var textAreaContents_TSV = line_TSV.join('\t\n');
  
  var textAreaContents_reverse_text = line_text.reverse().join('\n');
  var textAreaContents_reverse_CSV = line_CSV.reverse().join(',\n');
  var textAreaContents_reverse_TSV = line_TSV.reverse().join('\t\n');
  
  // Insert 'Export as CSV' Tab and attach click event
  document.getElementById('exportTabsWrapper_'+graphNumber).appendChild(csvExportTab);
  csvExportTab.addEventListener('click', function (event) {
      var textareaContents = textAreaContents_CSV;
      // if(event.ctrlKey && event.altKey && event.shiftKey) { 
      if (event.ctrlKey) { 
        var textareaContents = textAreaContents_reverse_CSV; 
      }
      createCustomAlert(graphLabel[graphNumber]+':',textareaContents,'Exporting to CSV..'); 
    }, false);

  // Insert 'Export as TSV' Tab and attach click event
  document.getElementById('exportTabsWrapper_'+graphNumber).appendChild(tsvExportTab);
  tsvExportTab.addEventListener('click', function (event) {
      var textareaContents = textAreaContents_TSV;
      if (event.ctrlKey) {
        var textareaContents = textAreaContents_reverse_TSV; 
      }
      createCustomAlert(graphLabel[graphNumber]+':',textareaContents,'Exporting to TSV..'); 
    }, false);
  
  // Insert 'Export as XML' Tab and attach click event
  // document.getElementById('exportTabsWrapper_'+graphNumber).appendChild(xmlExportTab);
  // xmlExportTab.addEventListener('click', function (event) { createExportDialog(graphLabel[graphNumber]+':',textAreaContents_CSV,'Exporting to XML..',event); }, false);
  
  // Insert 'Export as Text' Tab and attach click event
  document.getElementById('exportTabsWrapper_'+graphNumber).appendChild(textExportTab);
  textExportTab.addEventListener('click', function (event) {
      var textareaContents = textAreaContents_text;
      if (event.ctrlKey) { 
        var textareaContents = textAreaContents_reverse_text; 
      }
      createCustomAlert(graphLabel[graphNumber]+':',textareaContents,'Exporting as text..'); 
    }, false);
}


function referralPage()
{
// Function that runs on the Referral Listings pages
  //var header = document.getElementsByTagName('H1')[0];
  //var pageContent = header.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

  var renewalPeriod = 0;
  var renewalCost = 0;
  var renewalCostPerRefPerDay = 0;
  var goldenFeePerRefPerDay = 0;
  var goldenPackFeePerRefPerDay = 0;
  var expensesPerRefPerDay = 0;
  var minBreakEvenAvgExcludingRecycles = 0;
 
  if(currentPage.name == 'rentedRefListing') {
    // Define the column indexes
    var col_FLAG = 1;
    var col_NAME = 3;
    var col_SINCE = 4;
    var col_NEXTPAYMENT = 5;
    var col_LAST = 6;
    var col_CLICKS = 7;
    var col_AVG = 8;
    var colHeader_AVG = 6;
  
    // CALCULATE REFERRAL EXPENSES PER DAY AND MIN BREAK EVEN AVERAGE
    renewalPeriod = myAccount.preferences.renewalPeriod; 
    renewalCost = myAccount.renewalFee(renewalPeriod); // Cost of renewing for the renewing period
    
    // Cost of renewing, per ref per day::
    renewalCostPerRefPerDay = renewalCost / renewalPeriod;
    
    if(myAccount.accountType > 0) {
      // Cost of golden & golden packs per ref, per day
      goldenFeePerRefPerDay = ((90 / 365) / numberOfRentedReferrals);
      goldenPackFeePerRefPerDay = ((myAccount.goldenPackCost / 365) / numberOfRentedReferrals);
    }
    
    // Calculate how much referrals cost per day
    expensesPerRefPerDay = renewalCostPerRefPerDay + goldenFeePerRefPerDay + goldenPackFeePerRefPerDay;
    
    // Calculate the minimum average needed to pay for the expenses of each ref each day
    minBreakEvenAvgExcludingRecycles = expensesPerRefPerDay / myAccount.referralClickValue;
  }
  else if(currentPage.name == 'directRefListing') {
    // Define the column indexes
    var col_NAME = 1;
    var col_CAME_FROM = 2;
    var col_SINCE = 3;
    var col_LAST = 4;
    var col_CLICKS = 5;
    var col_AVG = 6;
    var colHeader_AVG = 6;
  }
  else {
    GM_log('Error defining column indexes - currentPage.name is unknown.');
  }

  var sumOfAverages = 0;
  var clickSum = 0;
  var activeRefCount = 0;
  var refCount = -1;

  var todayClickers = 0;
  var ydayClickers = 0;
  var zeroClickers = 0;
  var otherClickers = 0;
  
  var currencySymbol_AVG = myAccount.preferences.columnPrefix_Average;
  var currencySymbol_clickText = myAccount.ultimatePreferences.columnPrefix_clickText;
  var currencySymbol_average1 = myAccount.ultimatePreferences.columnPrefix_Average1;
  var currencySymbol_average2 = myAccount.ultimatePreferences.columnPrefix_Average2;
  var currencySymbol_RSA = myAccount.ultimatePreferences.columnPrefix_RSA;
  var currencySymbol_SD = myAccount.ultimatePreferences.columnPrefix_SD;
  var currencySymbol_Profit = myAccount.preferences.columnPrefix_Profit;
  
  var minigraphs = new Array();
  
  // mainTable = the table which shows the referrals are contained
  var mainTable = document.evaluate('//td[@class="bgt"]/ancestor::tbody[1]',
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);

  var topNode = mainTable.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  topNode.setAttribute('style', 'width: 990px; margin: 0pt auto;');
  var statPop = document.getElementById('chtdiv0');
  //statPop.style.position = 'relative';
  //statPop.style.left = '-55px';

  var rows = mainTable.rows;
  var headerRow = rows[0];


  // If the user wishes to view either extra column, allow the page to expand by removing the fixed width attribute of the content wrapper
  if((myAccount.ultimatePreferences.showColumn_RSA == true || 
      myAccount.preferences.showColumn_Profit) && (numberOfRentedReferrals > 0)) {
      //pageContent.removeAttribute('width');
      //pageContent.setAttribute('cellspacing','5px');
  }

  if(myAccount.preferences.exactAverage_replace == false && 
     myAccount.preferences.exactAverage_show == true) {
      headerRow.childNodes[colHeader_AVG].innerHTML += '<br><small>'+localString('ExactAVG')+'</small>';
  }
  else if(myAccount.preferences.exactAverage_replace == true && 
     myAccount.preferences.exactAverage_show == true) {
      headerRow.childNodes[colHeader_AVG].innerHTML += '<br><small>'+localString('Exact')+'</small>';
  }
  else if((myAccount.preferences.exactAverage_replace == false && 
      myAccount.preferences.exactAverage_show == false) || 
     (myAccount.preferences.exactAverage_replace == true && 
      myAccount.preferences.exactAverage_show == false)) {
        headerRow.childNodes[colHeader_AVG];
  }



  // Ultimate-only columns::
  // Ultimate's minigraphs will not be shown if there are more than 100 referrals per page

  // Check how many referrals are being shown per page
  // If the user has fewer than 10 referrals, the option to select the # of referrals is not present, thus refsPerPage must be set manually
  var refsPerPage = 10;
  var refsPerPageSelector = document.getElementById('rlpp');
  if (refsPerPageSelector != null) {
    refsPerPage = parseInt(refsPerPageSelector.options[refsPerPageSelector.selectedIndex].value);
  } 
  else {
    var yellowBox = document.evaluate(
      '//table/tbody/tr/td[@align="center"][contains(.,"Mini")] | //table/tbody/tr/td[@align="center"][contains(.,"mini")]',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null).singleNodeValue;
    if (yellowBox != null && yellowBox.textContent.toLowerCase().indexOf("mini") > -1) {
      refsPerPage = 150;
    }
  }

  if(refsPerPage <= 100 && myAccount.accountType == 6) {
    // clickText column == A textual representation of the data in the mini click graphs
    if(myAccount.ultimatePreferences.showColumn_clickText == true) {
      var new_clickText = document.createElement('td');
        new_clickText.setAttribute('class','bgt');
        new_clickText.setAttribute('nowrap','');
        new_clickText.setAttribute('align','center');
        new_clickText.innerHTML = '<b><font class="branco2">Clicks<small>/day</small></font></b>';

      headerRow.appendChild(new_clickText);
    }
    
    // 'average1' column == Average for the last 10 days
    if(myAccount.ultimatePreferences.showColumn_Average1 == true) {
      var new_headerAvg_10 = document.createElement('td');
        new_headerAvg_10.setAttribute('class','bgt');
        new_headerAvg_10.setAttribute('nowrap','');
        new_headerAvg_10.setAttribute('align','center');
        new_headerAvg_10.innerHTML = '<b><font class="branco2">A'+myAccount.preferences.timePeriod_average1+'</font></b>';

      headerRow.appendChild(new_headerAvg_10);
    }
    
    // 'average2' column == Average for the last 7 days
    if(myAccount.ultimatePreferences.showColumn_Average2 == true) {
      var new_headerAvg_7 = document.createElement('td');
        new_headerAvg_7.setAttribute('class','bgt');
        new_headerAvg_7.setAttribute('nowrap','');
        new_headerAvg_7.setAttribute('align','center');
        new_headerAvg_7.innerHTML = '<b><font class="branco2">A'+myAccount.preferences.timePeriod_average2+'</font></b>';

        headerRow.appendChild(new_headerAvg_7);
    }

    // 'SDEV' column == Average for the last 7 days
    if(myAccount.ultimatePreferences.showSDEVColumn == true) {
      var new_headerSDEV = document.createElement('td');
        new_headerSDEV.setAttribute('class','bgt');
        new_headerSDEV.setAttribute('nowrap','');
        new_headerSDEV.setAttribute('align','center');
        new_headerSDEV.innerHTML = '<b><font class="branco2">SD</font></b>';

        headerRow.appendChild(new_headerSDEV);
    }
    
    // 'RSA' column == Ratio of standard deviation / average (mean)
    if(myAccount.ultimatePreferences.showColumn_RSA == true) {
      var new_headerRSA = document.createElement('td');
        new_headerRSA.setAttribute('class','bgt');
        new_headerRSA.setAttribute('nowrap','');
        new_headerRSA.setAttribute('align','center');
        new_headerRSA.innerHTML = '<b><font class="branco2">RSA</font></b>';

      headerRow.appendChild(new_headerRSA);
    }
  }
  
  
  // 'Profit' column can be viewed by all members
  if(myAccount.preferences.showColumn_Profit == true) {
    var new_headerPROFIT = document.createElement('td');
      new_headerPROFIT.setAttribute('class','bgt');
      new_headerPROFIT.setAttribute('nowrap','');
      new_headerPROFIT.setAttribute('align','center');
      new_headerPROFIT.innerHTML = '<b><font class="branco2">'+localString('Profit')+'</font></b>';

    headerRow.appendChild(new_headerPROFIT);
  }
 
  
  // Fetch the script that contains referral listing data
  var xpathMtx = "//script[contains(.,'var mtx=')]";
  var xpathResults_mtx = document.evaluate(xpathMtx,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null ).snapshotItem(0);

  // Fetch the useful part of the script and replace the ';' that got removed by split()
  var mtxCode = xpathResults_mtx.innerHTML.split(';')[0] + ';';
  mtxCode = mtxCode.replace(/([0-9]+\.*[0-9]*)([,|\]])/g,"'$1'$2");

  customLogger('xpathResults_mtx = '+xpathResults_mtx+'\n'+
  'mtxCode = '+mtxCode,7);
  
  // Run the code in mtxCode (var mtx=[...];)
  eval(mtxCode);

  // Ultimate-only columns::
  // Ultimate's minigraphs will not be shown if there are more than 100 referrals per page
  if(refsPerPage <= 100 && myAccount.accountType == 6) {
    // mtx.length = # of referrals shown on current page
    for (var z = 0; z < mtx.length; z++) {

      var clickData = mtx[z][14].toString();
      var clickData_array = new Array();
      
      customLogger('clickData = '+clickData,7);
      
      // Make the minigraph data more useable by splitting it into an array
      if(clickData != '0') {
        clickData.split('');
        for ( var i = 0; i < clickData.length; i++) {
         clickData_array[i] = parseInt(clickData[i]);
        }
      }
      else {
        clickData_array = [0,0,0,0,0,0,0,0,0,0];
      }
      
      if(testing) { clickData_array = [0,1,2,3,4,5,6,7,8,9]; }
      
      // Now reverse the order of the array so that the most recent days are first ([0] == today, [1] == yesterday)
      clickData_array.reverse();

      customLogger('typeof clickData_array = '+typeof clickData_array+'\n'+
      'clickData_array = '+clickData_array,7);
      
      // Extract the stats from the minigraph data
      var minigraphClickData = new Array();
      var minigraphClickSums = new Array();
      var minigraphClickAvgs = new Array();

      for (var m = 0; m < clickData_array.length; m++) {
        minigraphClickData[m] = parseInt(clickData_array[m]);
      }

      for (var s = 0; s < minigraphClickData.length; s++) {
        if(s == 0) { minigraphClickSums[s] = minigraphClickData[s]; }
        else { minigraphClickSums[s] = minigraphClickSums[s-1] + minigraphClickData[s]; }

        minigraphClickAvgs[s] = minigraphClickSums[s] / (s);

        customLogger('s = '+s+'\n'+
        'minigraphClickData[s] = '+minigraphClickData[s]+'\n'+
        'minigraphClickSums[s-1] = '+minigraphClickSums[s-1]+'\n'+
        'minigraphClickSums[s] = '+minigraphClickSums[s]+'\n'+
        'minigraphClickAvgs[s] = '+minigraphClickAvgs[s],12);

      }

      minigraphs[z] = new graphProperties(minigraphClickData,minigraphClickSums);
    }
  }


  // Loop through the displayed referrals 
  for (var rowCounter = 1; rowCounter < (rows.length - 1); rowCounter++) {
    var currentRow = rows[rowCounter];

    // If the row isn't blank, process it
    if(currentRow.textContent != '' && currentRow.childNodes.length > 1) {
      refCount++;
      customLogger('rowCounter = '+rowCounter+'\n'+
      'currentRow = '+currentRow+'\n'+
      'refCount = '+refCount,7);

      // currentRow.setAttribute('style','letter-spacing: -0.05em;')

      function shrinkContents(column) {
        column.style.letterSpacing = '-0.05em';
        column.style.wordSpacing = '-0.1em';
      }
      // 
      var refFlag = currentRow.childNodes[col_FLAG];
      var refName = currentRow.childNodes[col_NAME];
      var refOwnedSince = currentRow.childNodes[col_SINCE];
      if(currentPage.name == 'rentedRefListing') { var refNextPayment = currentRow.childNodes[col_NEXTPAYMENT]; }
      var refLastClick = currentRow.childNodes[col_LAST];
      var refTotalClicks = currentRow.childNodes[col_CLICKS];
      var refOverallAvg = currentRow.childNodes[col_AVG];

      if(currentPage.name == 'rentedRefListing') { if(myAccount.preferences.flag_shrinkContents) { shrinkContents(refFlag); } }
      if(myAccount.preferences.referralName_shrinkContents) { shrinkContents(refName); }
      if(myAccount.preferences.ownedSince_shrinkContents) { shrinkContents(refOwnedSince); }
      if(currentPage.name == 'rentedRefListing') { if(myAccount.preferences.nextPayment_shrinkContents) { shrinkContents(refNextPayment); } }
      if(myAccount.preferences.lastClick_shrinkContents) { shrinkContents(refLastClick); }
      if(myAccount.preferences.totalClicks_shrinkContents) { shrinkContents(refTotalClicks); }
      if(myAccount.preferences.average_shrinkContents) { shrinkContents(refOverallAvg); }      

      // Columns specific to the direct referrals page
      if(currentPage.name == 'directRefListing') {
        var refCameFrom = currentRow.childNodes[col_CAME_FROM]; 
        var refNextPayment = currentRow.childNodes[col_NEXTPAYMENT]; 
      }

      if(myAccount.preferences.textifyFlag && currentPage.name == 'rentedRefListing') {
        // Get the flag colour of the referral
        if(refFlag.innerHTML.indexOf('flag0.gif') > 0) {
          var flagColour = localString('W');
        }
        else if(refFlag.innerHTML.indexOf('flag1.gif') > 0) {
          var flagColour = localString('R');
        }
        else if(refFlag.innerHTML.indexOf('flag2.gif') > 0) {
          var flagColour = localString('O');
        }
        else if(refFlag.innerHTML.indexOf('flag3.gif') > 0) {
          var flagColour = localString('Y');
        }
        else if(refFlag.innerHTML.indexOf('flag4.gif') > 0) {
          var flagColour = localString('G');
        }
        else if(refFlag.innerHTML.indexOf('flag5.gif') > 0) {
          var flagColour = localString('B');
        }

        refFlag.style.whiteSpace = "nowrap";
        refFlag.innerHTML += myAccount.preferences.textifyFlag_prefix + flagColour;
      }
      
      // Extract the 'wholeDays' data from the table
      var numDaysOwned_raw = refOwnedSince.innerHTML.replace('&nbsp;', '');
      var lastClick_raw = refLastClick.innerHTML.replace('&nbsp;', '');


      // Calculate the number of days referral has been owned and convert this to a 'fuller' version [x days, y hours, z mins]
      // If {column}_shortFormat == true, it will return [x d, y h, z m] instead
      // If 'fullerSinceTimers' is set to false, NumDaysSince () will return only the whole number of days that have passed


      var numDaysOwned_summarised = NumDaysSince ( numDaysOwned_raw , 'mins' , myAccount.preferences.referralSince_fullerTimers , myAccount.preferences.ownedSinceTimer_shortFormat , 'daysOwned');
      
      // If the referral has not clicked yet, the referral has been inactive for as long as it has been owned
      // Else the referral has been inactive since the date of its last click
      if (lastClick_raw.match( neobuxString('noClicks') )) {
        var inactiveDays = NumDaysSince ( numDaysOwned_raw , 'days' , myAccount.preferences.lastClick_fullerTimers , myAccount.preferences.lastClickTimer_shortFormat , 'lastClick');
        var accurateLastClick = NumDaysSince ( numDaysOwned_raw , 'decimal' , myAccount.preferences.lastClick_fullerTimers , myAccount.preferences.lastClick_fullerTimers , false , 'lastClick');
      } 
      else {
        var inactiveDays = NumDaysSince ( lastClick_raw , 'days' , myAccount.preferences.lastClick_fullerTimers , myAccount.preferences.lastClickTimer_shortFormat , 'lastClick');
        var accurateLastClick = NumDaysSince ( lastClick_raw , 'decimal' , myAccount.preferences.lastClick_fullerTimers , myAccount.preferences.lastClick_fullerTimers , false , 'lastClick');
      }


      // Insert the summarised date / 'time elapsed' to the cell
      // If user preference is to not replace the whole cell, append to end of existing cell contents, else replace the cell contents

      // 'Owned Since' column
      if(myAccount.preferences.referralSince_numerise) {
        if (!myAccount.preferences.referralSince_replace) {
          refOwnedSince.innerHTML = numDaysOwned_raw + "<font style='font-size: 9px; color:#777777'> (" + numDaysOwned_summarised + ")</font>";
        } 
        else {
          refOwnedSince.innerHTML = "<font style='font-size:13px; color:#000'>" + numDaysOwned_summarised + "</font>";
        }
      }

      // 'Last Click' column
      if(myAccount.preferences.lastClick_numerise) {
        if (myAccount.preferences.lastClick_replace || 
           (myAccount.preferences.lastClick_replaceNilClicks && parseInt(refTotalClicks.textContent,10) == 0)) {
          refLastClick.innerHTML = "<font style='font-size: 13px; color: #000'>" + inactiveDays + "</font>";
        } 
        else {
          refLastClick.innerHTML = lastClick_raw + "<font style='font-size: 9px; color:#777777'> [" + inactiveDays + "]</font>";
        }
      }

      var accurateOwnedSince = NumDaysSince ( numDaysOwned_raw , 'decimal', myAccount.preferences.referralSince_fullerTimers , false , 'ownedSince');
      var accurateAverage = parseInt(refTotalClicks.textContent) / accurateOwnedSince;

      // GM_log('parseInt(refTotalClicks.textContent) = '+parseInt(refTotalClicks.textContent)+'\n'+
      // 'accurateOwnedSince = '+accurateOwnedSince+'\n'+
      // 'accurateAverage = '+accurateAverage);


      if(myAccount.preferences.exactAverage_show) {
        // Replace the displayed average (accurate to a 24hour period) with one that that is more accurate
        // (takes hours and minutes into account)

        if(myAccount.preferences.exactAverage_replace) {
          refOverallAvg.innerHTML = (accurateAverage).toFixed(3);
        }
        else {
          refOverallAvg.innerHTML = refOverallAvg.innerHTML + /*'<small>' +*/ 
          myAccount.preferences.exactAverage_seperator + (accurateAverage).toFixed(3) /*+ '</small>'*/;
        }
      }

      refOverallAvg.innerHTML = currencySymbol_AVG + '' + refOverallAvg.innerHTML; // + '' + is necessary to ensure that the vars are concatenated (as opposed to mathematical addition)


      // Update the overall statistics for the single page of referrals (data used for bar at bottom of the referral listing page)
      if(parseFloat(refOverallAvg.textContent) > 0) {
        sumOfAverages += parseFloat(refOverallAvg.textContent);
        clickSum += parseInt(refTotalClicks.textContent);
        activeRefCount++;
      }

      // Keep a tally of how many referrals clicked today / yesterday / never / other
      if(parseInt(refTotalClicks.textContent) == 0) { zeroClickers++; }
        else if(Math.floor(accurateLastClick) == 0) { todayClickers++; }
        else if(Math.floor(accurateLastClick) == 1) { ydayClickers++; }
        else { otherClickers++; }

      if(testing) {
        minigraphs[refCount].values = new Array();
        minigraphs[refCount].values = [0,1,2,3,4,5,6,7,8,9];
      }

      // INSERT EXTRA COLUMNS // 
      // Ultimate-only columns::
      // Ultimate's minigraphs will not be shown if there are more than 100 referrals per page
      if(refsPerPage <= 100 && myAccount.accountType == 6) {
        // clickText column == A textual representation of the data in the mini click graphs
        if(myAccount.ultimatePreferences.showColumn_clickText == true) {

          var columnText_clickText = minigraphs[refCount].value[minigraphs[refCount].value.length-1].toFixed(0);

          for(var i = minigraphs[refCount].value.length-2; i > 0; i--) {
            GM_log(minigraphs[refCount].value[i].toFixed(0));
            columnText_clickText += '|' + minigraphs[refCount].value[i].toFixed(0);
          }

          var newColumn_clickText = document.createElement('td');
            newColumn_clickText.setAttribute('class','l');
            newColumn_clickText.setAttribute('nowrap','');
            newColumn_clickText.setAttribute('style','border-right: 1px solid #AAAAAA; font-family: monospace;');
            newColumn_clickText.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
            newColumn_clickText.innerHTML = "<font style='font-size:9px;color:#000000;'>" + currencySymbol_clickText + columnText_clickText + "</font>";

          if(myAccount.ultimatePreferences.clickText_shrinkContents) { shrinkContents(newColumn_clickText); }

          currentRow.appendChild(newColumn_clickText);
        }

        // 'average1' column == Average for the last timePeriod_average1 days
        if(myAccount.ultimatePreferences.showColumn_Average1 == true) {
          var columnText_average1 = minigraphs[refCount].mean[myAccount.preferences.timePeriod_average1].toFixed(2);
          var newColumn_average1 = document.createElement('td');
            newColumn_average1.setAttribute('class','l');
            newColumn_average1.setAttribute('nowrap','');
            newColumn_average1.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
            newColumn_average1.innerHTML = "<font style='font-size:9px;color:#000000;'>" + currencySymbol_average1 + columnText_average1 + "</font>";

          if(myAccount.ultimatePreferences.average1_shrinkContents) { shrinkContents(newColumn_average1); }

          currentRow.appendChild(newColumn_average1);
        }

        // 'average2' column == Average for the last 7 days
        if(myAccount.ultimatePreferences.showColumn_Average2 == true) {
          var columnText_average2 = minigraphs[refCount].mean[myAccount.preferences.timePeriod_average2].toFixed(2);
          var newColumn_average2 = document.createElement('td');
            newColumn_average2.setAttribute('class','l');
            newColumn_average2.setAttribute('nowrap','');
            newColumn_average2.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
          newColumn_average2.innerHTML = "<font style='font-size:9px;color:#000000;'>" + currencySymbol_average2 + columnText_average2 + "</font>";

          if(myAccount.ultimatePreferences.average2_shrinkContents) { shrinkContents(newColumn_average2); }

          currentRow.appendChild(newColumn_average2);
        }

        // 'SDEV' column == Standard DEViation for the last 10 days
        if(myAccount.ultimatePreferences.showSDEVColumn == true) {
          var columnText_SDEV = minigraphs[refCount].sdev.toFixed(2);
          var newColumn_SDEV = document.createElement('td');
            newColumn_SDEV.setAttribute('class','l');
            newColumn_SDEV.setAttribute('nowrap','');
            newColumn_SDEV.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
            newColumn_SDEV.innerHTML = "<font style='font-size:9px;color:#777777;'>" + currencySymbol_SD + columnText_SDEV + "</font>";
          
          if(myAccount.ultimatePreferences.SD_shrinkContents) { shrinkContents(newColumn_SDEV); }
          
          currentRow.appendChild(newColumn_SDEV);
        }
        
        // 'RSA' column == Ratio of standard deviation / average (mean)
        if(myAccount.ultimatePreferences.showColumn_RSA == true) {
          var columnText_RSA = (minigraphs[refCount].sdev / minigraphs[refCount].mean[10]).toFixed(2);
          var newColumn_RSA = document.createElement('td');
            newColumn_RSA.setAttribute('class','l');
            newColumn_RSA.setAttribute('nowrap','');
            newColumn_RSA.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
            newColumn_RSA.innerHTML = "<font style='font-size:9px;color:#777777'>" + currencySymbol_RSA + columnText_RSA + "</font>";
          
          if(myAccount.ultimatePreferences.RSA_shrinkContents) { shrinkContents(newColumn_RSA); }
          
          currentRow.appendChild(newColumn_RSA);
        }
      }


      // 'Profit' column can be viewed by all members
      if(myAccount.preferences.showColumn_Profit) {

        // Retrieve numerical version of numDaysOwned and other details about the current individual referral
        var numDaysOwned_decimal = NumDaysSince ( numDaysOwned_raw , 'wholeDays' , myAccount.preferences.lastClick_fullerTimers , false , 'lastClick');
        
        var refClicks = parseInt(refTotalClicks.innerHTML);
        var refID = refName.textContent.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
        var indivAvg = accurateAverage;


        // Calculate the gross income and expenses for the referral (accurate to the minute)
        var grossIn = (refClicks * myAccount.referralClickValue);

        if(currentPage.name == 'rentedRefListing') { var grossOut = numDaysOwned_decimal * expensesPerRefPerDay; }
        else if(currentPage.name == 'directRefListing') { grossOut = 0; }
        else { grossOut = 1000; }

        var netProfit_exclRecycles = (grossIn - grossOut);
        var netProfit_inclRecycles = (grossIn - grossOut) - (myAccount.recycleCost);

        var profitPerDay = (indivAvg * myAccount.referralClickValue) - expensesPerRefPerDay;

        customLogger('currentPage.name = '+currentPage.name+'\n'+
        'numDaysOwned_decimal = '+numDaysOwned_decimal+'\n'+
        'expensesPerRefPerDay = '+expensesPerRefPerDay+'\n'+
        'grossOut = '+grossOut+'\n'+
        'grossIn = '+grossIn+'\n'+
        'myAccount.recycleCost = '+myAccount.recycleCost+'\n'+
        'netProfit_exclRecycles = '+netProfit_exclRecycles+'\n'+
        'netProfit_inclRecycles = '+netProfit_inclRecycles,7);

        // Calculate the net income of the individual referral slot

        // If the user wishes to include the cost of recycling in the profit column, include the recycle fee 
        // in the gross expenses for the referral
        if(!myAccount.preferences.includeRecycleCostInProfitColumn || (currentPage.name == 'directRefListing')) {
          var PROFIT = netProfit_exclRecycles;
        } 
        else {
          var PROFIT = netProfit_inclRecycles;
        }


        // Calculate how many days it will take for the referral to pay for its own recycle
        // --> Assumes that the referral has clicked consistently at the current average 
        // --> Odd results from this will be shown if the referral has vastly changing click patterns
        // --> Will return 'More than '+dayLimit+' days' if it will take > dayLimit days to pay for own recycle (dayLimit: default = 30)
        var daysTilPaidOwnRecycle = getDaysTilPaidOwnRecycle(indivAvg,netProfit_exclRecycles,expensesPerRefPerDay);
        if(!isNaN(daysTilPaidOwnRecycle)) {
          var daysLeftToRepay = daysTilPaidOwnRecycle - numDaysOwned_decimal;
        } 
        else {
          if(parseFloat(indivAvg) < parseFloat(minBreakEvenAvgExcludingRecycles)) {
            var daysTilPaidOwnRecycle = localString('Never');
          }
          var daysLeftToRepay = '0';
        }


        // Create the new 'Profit' column
        var newColumn_PROFIT = document.createElement('td');
          newColumn_PROFIT.setAttribute('class','l');
          newColumn_PROFIT.setAttribute('nowrap','');
          newColumn_PROFIT.setAttribute('style','border-right: 1px solid rgb(170, 170, 170);');
          newColumn_PROFIT.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;

          newColumn_PROFIT.id = 'Profit_'+refID; // This ID is used by 'prototip' as an anchor to attach the tooltip to



        // If the net profit is negative, format it differently
      if (currentPage.name == 'directRefListing') {
        if(PROFIT <= 0) {
          newColumn_PROFIT.innerHTML = "<font style='font-size:9px; color:000; font-weight:100; font-style:italic;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>";
        }
        else if(PROFIT > 0) {
          newColumn_PROFIT.innerHTML = "<font style='font-size:11px; color:green; font-weight:700;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>";
        }
        else {
          newColumn_PROFIT.innerHTML = "<font style='font-size:11px; color:F88; font-style:italic;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>"; 
        }
      }

      if (currentPage.name == 'rentedRefListing') {
        if(PROFIT >= recycleCost) {
          newColumn_PROFIT.innerHTML = "<font style='font-size:11px; color:green; font-weight:500;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>";
        }
        else if(PROFIT >= 0) {
          newColumn_PROFIT.innerHTML = "<font style='font-size:11px; color:blue;font-weight:500;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>";
        }
        else if (PROFIT < 0 && profitPerDay <= 0 && netProfit_inclRecycles.toFixed(3) <= 0) {
          newColumn_PROFIT.innerHTML = "<font style='font-size:9px; color:white;font-weight:900; font-style:italic;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>";
        }
        else if (PROFIT < 0 && (recycleCost / profitPerDay).toFixed(0) >= 31 || (daysTilPaidOwnRecycle + numDaysOwned_decimal) >= 31) {
          newColumn_PROFIT.innerHTML = "<font style='font-size:9px; color:lightslategray; font-weight:700; font-style:italic;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>";
        }
        else {
          newColumn_PROFIT.innerHTML = "<font style='font-size:11px; color:red; font-weight:500;font-style:italic;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>"; 
        }
      }

        if(myAccount.preferences.profitColumn_shrinkContents) { shrinkContents(newColumn_PROFIT); }

        // Insert the new 'Profit' column
        currentRow.appendChild(newColumn_PROFIT);


        // If the current page is the rented referral listing page, create and insert the tooltips
        if(currentPage.name == 'rentedRefListing') {
          var tipContent = '<p>'+localString('referral')+': <b>'+refID+'</b></p>'+
          '<hr>'+
          '<i><small>'+localString('expenses')+' '+localString('chosendaily')+'</small></i><br>'+
          '- '+localString('Renewals')+' <i><small>('+renewalPeriod+' '+localString('days')+' '+localString('of')+' '+localString('renewal')+')</small></i> = <b>$'+renewalCostPerRefPerDay.toFixed(5)+'     </b><br>';
          
          // Add Golden / Golden Pack-specific lines to the tooltip
          if(myAccount.accountType == 1) { tipContent = tipContent + '- '+localString('goldenFee')+' <i><small>('+localString('perRefPerDay')+')</small></i> = <b>$'+goldenFeePerRefPerDay.toFixed(5)+'</b><br>'; }
          if(myAccount.accountType > 1) { tipContent = tipContent + '- '+localString('goldenPackFee')+' <i><small>('+localString('perRefPerDay')+'</small></i> = <b>$'+goldenPackFeePerRefPerDay.toFixed(5)+'</b><br>';}
          
          tipContent = tipContent + 
          localString('totalexpenses')+' <i><small>('+localString('perRefPerDay')+')</small></i> = <b>$'+expensesPerRefPerDay.toFixed(5)+'</b><br>'+
          '<br>'+

          '<i><small>'+localString('minimumAverage')+ ' '+localString('toBreakEven')+'</small></i> = <b>'+minBreakEvenAvgExcludingRecycles.toFixed(3)+'</b><br>'+
          '<br>'+

          localString('currentProfit')+' = <b>$'+netProfit_exclRecycles.toFixed(3)+'</b><br>'+
          '<br>'+
          '- '+localString('grossIn')+'   = <b>$'+grossIn.toFixed(3)+'</b><br>'+
          '- '+localString('grossOut')+' = <b>$'+grossOut.toFixed(3)+'</b><br>'+
          '<br>'+
          localString('currentProfit')+' <i><small>('+localString('incl')+' '+recycleCost+' '+localString('for')+' '+localString('recycle')+')</small></i> = <b>$'+netProfit_inclRecycles.toFixed(3)+'</b><br>'+

          '<br>'+

          '<i><small>'+localString('avg')+' '+localString('Exact')+' = <b>'+indivAvg.toFixed(3)+'</b></small></i><br>'+
          localString('netProfit')+' <i><small>('+localString('per')+' '+localString('day')+')</small></i>  = <b>$'+profitPerDay.toFixed(5)+'</b><br>'+
          localString('netProfit')+' <i><small>('+localString('per')+' '+localString('months')+')</small></i> = <b>$'+(profitPerDay * 30).toFixed(5)+'</b><br>'+
          '<br>'+
          localString('daysToPayForOwnRecycle')+' = <b>'+daysTilPaidOwnRecycle+'</b><br><br>';

          if(!isNaN(daysTilPaidOwnRecycle)) {
            tipContent = tipContent + '<i>'+localString('day#')+' = <b>'+(daysTilPaidOwnRecycle + numDaysOwned_decimal)+'</b></i>';
          }

          tipContent = tipContent + '<br>';


          // Create and insert a new script node for the prototip tooltip javascript code to be run from
          var script = document.createElement('script');
          var text = document.createTextNode("new mk_tt('Profit_"+refID+"', 'lm', '"+tipContent+"')");
            script.type = 'text/javascript';
            script.appendChild(text);
            
          currentRow.appendChild(script);
        }
      }
    }
  }
  
  // SUMMARY ROW @ bottom of the referral listing table // 
  var footerRow = rows[rows.length - 1];
  // Set the size of the bottom row to match the size of the header row to accomodate for extra columns that have been added
  if (myAccount.preferences.showColumn_Profit && refsPerPage > 100) {
    rows[0].childNodes[rows[0].childNodes.length - 2].colSpan = 1
  }
  rows[1].childNodes[0].colSpan =
    rows[rows.length - 2].childNodes[0].colSpan =
    footerRow.childNodes[0].colSpan = rows[2].childNodes.length;
   
  
  var totalClickAvg = sumOfAverages / activeRefCount;
  if(isNaN(totalClickAvg)) { totalClickAvg = 0; }

  var footerRow_text = "<font style='font-size:9px;color:#FFFFFF;font-weight:bold;'>"+
  "&nbsp;&nbsp;&nbsp;"+localString('totalClicks')+" : "+clickSum+
  " | "+localString('totalClickAvg')+" : "+(totalClickAvg).toFixed(3);

  if(myAccount.accountType == 6 && refsPerPage <= 100) {
    footerRow_text = footerRow_text + " | "+localString('lastdaysClickAvg')+" ("+myAccount.ultimatePreferences.minigraphAvgInterval+") : "+(minigraphClickAvgs[myAccount.ultimatePreferences.minigraphAvgInterval]).toFixed(3);
  }

  footerRow_text = footerRow_text +
  " | "+localString('clickedToday')+" : " + todayClickers+
  " | "+localString('clickedYday')+": " + ydayClickers+
  " | "+localString('zeroClickers')+" : " + zeroClickers+
  " | "+localString('others')+" : " + otherClickers+
  "</font>";

  footerRow.childNodes[0].style.height= "18px";
  footerRow.childNodes[0].innerHTML = footerRow_text;
}


function accSummaryPage() {
// Function that runs on the Account Summary page
customLogger('Account Summary Page',4);
  
  // The graphs on this page all have height='130'
  // Grab them then process the data
  var xpathEmbeds = "//embed[@height='130']";
  var xpathResults_embeds = document.evaluate(xpathEmbeds,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null );

  var embed;
  var chartXML;

  customLogger('xpathResults_embeds.snapshotLength = '+xpathResults_embeds.snapshotLength,6);
  for (var graphNumber = 0, length = xpathResults_embeds.snapshotLength; graphNumber < length; graphNumber++) {
    // Grab the data from the graphs
    embed = xpathResults_embeds.snapshotItem(graphNumber);
    chartXML = embed.getAttribute('flashvars').split('dataXML=')[1].replace("caption='' ","");
    
    // Process the data within the graphs
    processGraphData(graphNumber,chartXML,embed);
    // Insert the processed data 
    insertGraphAverages(embed,graphNumber);
  }

}



//BEGIN Script Content::

switch(currentPage.name) {
  case 'rentedRefListing':
    if(numberOfRentedReferrals > 0) {
      referralPage();
    }
    break;
  case 'directRefListing':
    if(numberOfDirectReferrals > 0) {
      referralPage();
    }
    break;
  case 'accSummary':
    accSummaryPage();
    break;
  case 'refStats':
    refStatsPage();
    break;
}

//END Script Content



//*********************
// ** UPDATER CODE **
//*********************

var scriptName = /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1];

AnotherAutoUpdater = {
// Config values, change these to match your script
  id: '67521', // Script id on Userscripts.org
// days: 2, // Days to wait between update checks
  days: 1000*60*myAccount.preferences.updateFrequency, // 1000ms * 60secs * mins

// Don't edit after this line, unless you know what you're doing ;-)
  name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
  version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1],
  time: new Date().getTime(),
  call: function (response) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
      onload: function (xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
  compare: function (xpr,response) {
    this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);

    if((this.xversion) && (this.xname[1] == this.name)) {
      GM_log('this.xversion == '+this.xversion);
      this.xversion = parseFloat(this.xversion[1]);
      GM_log('this.xversion == '+this.xversion);
      this.xname = this.xname[1];
    }
    else {
      if((xpr.responseText.match("la página que busca no existe")) || (this.xname[1] != this.name) )
      GM_setValue('updated_'+this.id, 'off');
      return false;
    }

    if( this.xupdateNote = /\/\/\s*@updateNote\s+(.*)\s*\n/i.exec(xpr.responseText) ) {
      this.xupdateNote = this.xupdateNote[1];
      GM_log('this.xupdateNote == '+this.xupdateNote);
      this.updateNotice = this.xupdateNote;
    }
    else {
      this.updateNotice = '';
    }



    // otherVerIsNewerVersion(currentVer,otherVer) ?
    var hasBeenUpdated = otherVerIsNewerVersion(this.version,this.xversion);
    GM_log('hasBeenUpdated = '+hasBeenUpdated);

    if (hasBeenUpdated) {
      GM_log('Newer version available');
      if (confirm(localString('newVersionAvailable',this.xname)+
        '\n\n'+localString('currentVersion',this.version)+
        '\n'+localString('availableVersion',this.xversion)+
        '\n\n'+localString('notesAboutTheAvailableVersion',this.updateNotice)+
        '\n\n'+localString('doYouWishToUpdateTo',this.xversion))) {
          GM_log('Nueva version descargándose.');
          GM_setValue('updated_'+this.id, this.time+'');
          top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
        }
      else {
        GM_log('Nueva version rechazada');
        if(confirm(localString('doYouWishToTurnOffAutoUpdates'))) {
          GM_log('AutoUpdates turned off');
          GM_setValue('updated_'+this.id, 'off');
          GM_registerMenuCommand(this.name+": Turn on Auto Updates", function (){ GM_setValue('updated_'+this.id, new Date().getTime()+'');
          AnotherAutoUpdater.call(true);});
          alert(localString('autoUpdatesCanBeReenabled'));
        }
        GM_setValue('updated_'+this.id, this.time+'');
      }
    }
    else {
      GM_log('Nueva version NO disponible');
      if(response) alert(localString('noUpdatesAvailableFor',this.name));
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },

  check: function () {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');

    if((GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (this.days))) ) {
      this.call();
    }
    else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand(localString('enableUpdates',this.name), function (){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    GM_registerMenuCommand(localString('checkForUpdates',this.name), function (){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.check(true);});
  }
};


if (self.location == top.location && typeof GM_xmlhttpRequest !== 'undefined') {
  GM_registerMenuCommand(scriptName+": "+localString('editUpdateFrequency'), editUpdateFrequency);
  AnotherAutoUpdater.check();
}

var currentVer;
var otherVer;



// CUSTOM FUNCTION -- Compares two version numbers
// Returns true if current version < 'other' version
function otherVerIsNewerVersion(currentVer_input,otherVer_input) {

GM_log('currentVer_input = '+currentVer_input);
GM_log('otherVer_input = '+otherVer_input);

var otherVerIsNewer;

currentVer = currentVer_input.toString().split('.');
if(currentVer[0]) { current_MajVer = currentVer[0]; } else { current_MajVer = 0; }
if(currentVer[1]) { current_MinVer = currentVer[1]; } else { current_MinVer = 0; }
if(currentVer[2]) { current_BugVer = currentVer[2]; } else { current_BugVer = 0; }

otherVer = otherVer_input.toString().split('.');
if(otherVer[0]) { other_MajVer = otherVer[0]; } else { other_MajVer = 0; }
if(otherVer[1]) { other_MinVer = otherVer[1]; } else { other_MinVer = 0; }
if(otherVer[2]) { other_BugVer = otherVer[2]; } else { other_BugVer = 0; }

GM_log('current_MajVer,current_MinVer,current_BugVer = '+current_MajVer+','+current_MinVer+','+current_BugVer);
GM_log('other_MajVer,other_MinVer,other_BugVer = '+other_MajVer+','+other_MinVer+','+other_BugVer);

  if(current_MajVer < other_MajVer) {
    otherVerIsNewer = true;
    GM_log('Reason: current_MajVer < other_MajVer');
  } 
  else if(current_MajVer == other_MajVer) {
    if((current_MinVer < other_MinVer)) {
      otherVerIsNewer = true;
      GM_log('Reason: current_MajVer == other_MajVer');
    } 
    else if((current_MinVer == other_MinVer) && (current_BugVer < other_BugVer)) {
      otherVerIsNewer = true;
      GM_log('Reason: (current_MinVer == other_MinVer) && (current_BugVer < other_BugVer)');
    } 
    else {
      otherVerIsNewer = false;
      GM_log('Reason: current_MinVer == other_MinVer');
    }
  } 
  else {
    otherVerIsNewer = false;
    GM_log('Reason: current_MajVer > other_MajVer');
  }

  GM_log('otherVerIsNewerVersion(currentVer_input,otherVer_input) = '+otherVerIsNewer);
  return otherVerIsNewer;
}



//******************
//**MENU FUNCTIONS**
//******************
// Function called from the Menu to edit how often the script checks for updates
function editUpdateFrequency() {
  var updateFrequency = parseFloat(GM_getValue('updateFrequency',10));

  var updateFrequency_Input = prompt('Por favor, entre con qué frecuencia quiere buscar buscar actualizaciones (minutos).',updateFrequency);
  // GM_log("updateFrequency_Input = "+updateFrequency_Input);
  updateFrequency = parseFloat(updateFrequency_Input);
  GM_log("updateFrequency = "+updateFrequency);

  try {
    if(updateFrequency >=  0 && updateFrequency < 1440) {
      GM_setValue('updateFrequency',String(updateFrequency));
      alert("Configuración guardada satisfactoriamente. Neobux2+ buscará nuevas actualizaciones cada "+updateFrequency+" minutos.");
    }
  }
  catch(err) {
    GM_log("Error = "+err);
    GM_log("updateFrequency = "+updateFrequency);
    alert("¡Ha ocurrido un error! Por favor, intente de nuevo, y luego informe de este error. \n\nNOTA: mínimo = 0 minutos, máximo = 1440 (24hrs), 1.5 mins = 90 seconds.");

  }
}