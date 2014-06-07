// ==UserScript==
// @name           KOC Power Bot
// @version        20130725a
// @namespace      mat
// @homepage       http://userscripts.org/scripts/show/150307
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/games/kingdoms-of-camelot/play*
// @include        *facebook.com/dialog/feed*
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_registerMenuCommand

// @description    Automated features for Kingdoms of Camelot
// ==/UserScript== 

//Fixed weird bug with koc game
if(window.self.location != window.top.location){
   try{
      if(window.self.location.href == window.parent.location.href){
         return; //If iframe source is same as the parent don't load script
      }
   } catch (e){
      //logit(inspect(e,2,1));
   }
}

var Version = '20130725a';

//bandaid to stop loading in advertisements containing the @include urls
if(document.URL.indexOf('sharethis') != -1) {
   GM_log('sharethis:'+document.URL);
   return;
};
//raw deflate code
(function(e){var t=32768;var n=0;var r=1;var i=2;var s=6;var o=true;var u=32768;var a=64;var f=1024*8;var l=2*t;var c=3;var h=258;var p=16;var d=8192;var v=13;if(d>u)alert("error: zip_INBUFSIZ is too small");if(t<<1>1<<p)alert("error: zip_WSIZE is too large");if(v>p-1)alert("error: zip_HASH_BITS is too large");if(v<8||h!=258)alert("error: Code too clever");var m=d;var g=1<<v;var y=g-1;var b=t-1;var w=0;var E=4096;var S=h+c+1;var x=t-S;var T=1;var N=15;var C=7;var k=29;var L=256;var A=256;var O=L+1+k;var M=30;var _=19;var D=16;var P=17;var H=18;var B=2*O+1;var j=parseInt((v+c-1)/c);var F;var I,q;var R;var U=null;var z,W;var X;var V;var $;var J;var K;var Q;var G;var Y;var Z;var et;var tt;var nt;var rt;var it;var st;var ot;var ut;var at;var ft;var lt;var ct;var ht;var pt;var dt;var vt;var mt;var gt;var yt;var bt;var wt;var Et;var St;var xt;var Tt;var Nt;var Ct;var kt;var Lt;var At;var Ot;var Mt;var _t;var Dt;var Pt;var Ht;var Bt;var jt;var Ft;var It;var qt;var Rt=function(){this.fc=0;this.dl=0};var Ut=function(){this.dyn_tree=null;this.static_tree=null;this.extra_bits=null;this.extra_base=0;this.elems=0;this.max_length=0;this.max_code=0};var zt=function(e,t,n,r){this.good_length=e;this.max_lazy=t;this.nice_length=n;this.max_chain=r};var Wt=function(){this.next=null;this.len=0;this.ptr=new Array(f);this.off=0};var Xt=new Array(0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0);var Vt=new Array(0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13);var $t=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7);var Jt=new Array(16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15);var Kt=new Array(new zt(0,0,0,0),new zt(4,4,8,4),new zt(4,5,16,8),new zt(4,6,32,32),new zt(4,4,16,16),new zt(8,16,32,32),new zt(8,16,128,128),new zt(8,32,128,256),new zt(32,128,258,1024),new zt(32,258,258,4096));var Qt=function(e){var t;if(!e)e=s;else if(e<1)e=1;else if(e>9)e=9;ct=e;R=false;ut=false;if(U!=null)return;F=I=q=null;U=new Array(f);V=new Array(l);$=new Array(m);J=new Array(u+a);K=new Array(1<<p);dt=new Array(B);for(t=0;t<B;t++)dt[t]=new Rt;vt=new Array(2*M+1);for(t=0;t<2*M+1;t++)vt[t]=new Rt;mt=new Array(O+2);for(t=0;t<O+2;t++)mt[t]=new Rt;gt=new Array(M);for(t=0;t<M;t++)gt[t]=new Rt;yt=new Array(2*_+1);for(t=0;t<2*_+1;t++)yt[t]=new Rt;bt=new Ut;wt=new Ut;Et=new Ut;St=new Array(N+1);xt=new Array(2*O+1);Ct=new Array(2*O+1);kt=new Array(h-c+1);Lt=new Array(512);At=new Array(k);Ot=new Array(M);Mt=new Array(parseInt(d/8))};var Gt=function(){F=I=q=null;U=null;V=null;$=null;J=null;K=null;dt=null;vt=null;mt=null;gt=null;yt=null;bt=null;wt=null;Et=null;St=null;xt=null;Ct=null;kt=null;Lt=null;At=null;Ot=null;Mt=null};var Yt=function(e){e.next=F;F=e};var Zt=function(){var e;if(F!=null){e=F;F=F.next}else e=new Wt;e.next=null;e.len=e.off=0;return e};var en=function(e){return K[t+e]};var tn=function(e,n){return K[t+e]=n};var nn=function(e){U[W+z++]=e;if(W+z==f)Hn()};var rn=function(e){e&=65535;if(W+z<f-2){U[W+z++]=e&255;U[W+z++]=e>>>8}else{nn(e&255);nn(e>>>8)}};var sn=function(){Z=(Z<<j^V[st+c-1]&255)&y;et=en(Z);K[st&b]=et;tn(Z,st)};var on=function(e,t){_n(t[e].fc,t[e].dl)};var un=function(e){return(e<256?Lt[e]:Lt[256+(e>>7)])&255};var an=function(e,t,n){return e[t].fc<e[n].fc||e[t].fc==e[n].fc&&Ct[t]<=Ct[n]};var fn=function(e,t,n){var r;for(r=0;r<n&&qt<It.length;r++)e[t+r]=It.charCodeAt(qt++)&255;return r};var ln=function(){var e;for(e=0;e<g;e++)K[t+e]=0;lt=Kt[ct].max_lazy;ht=Kt[ct].good_length;if(!o)pt=Kt[ct].nice_length;ft=Kt[ct].max_chain;st=0;Y=0;at=fn(V,0,2*t);if(at<=0){ut=true;at=0;return}ut=false;while(at<S&&!ut)hn();Z=0;for(e=0;e<c-1;e++){Z=(Z<<j^V[e]&255)&y}};var cn=function(e){var t=ft;var n=st;var r;var i;var s=it;var u=st>x?st-x:w;var a=st+h;var f=V[n+s-1];var l=V[n+s];if(it>=ht)t>>=2;do{r=e;if(V[r+s]!=l||V[r+s-1]!=f||V[r]!=V[n]||V[++r]!=V[n+1]){continue}n+=2;r++;do{}while(V[++n]==V[++r]&&V[++n]==V[++r]&&V[++n]==V[++r]&&V[++n]==V[++r]&&V[++n]==V[++r]&&V[++n]==V[++r]&&V[++n]==V[++r]&&V[++n]==V[++r]&&n<a);i=h-(a-n);n=a-h;if(i>s){ot=e;s=i;if(o){if(i>=h)break}else{if(i>=pt)break}f=V[n+s-1];l=V[n+s]}}while((e=K[e&b])>u&&--t!=0);return s};var hn=function(){var e,n;var r=l-at-st;if(r==-1){r--}else if(st>=t+x){for(e=0;e<t;e++)V[e]=V[e+t];ot-=t;st-=t;Y-=t;for(e=0;e<g;e++){n=en(e);tn(e,n>=t?n-t:w)}for(e=0;e<t;e++){n=K[e];K[e]=n>=t?n-t:w}r+=t}if(!ut){e=fn(V,st+at,r);if(e<=0)ut=true;else at+=e}};var pn=function(){while(at!=0&&I==null){var e;sn();if(et!=w&&st-et<=x){rt=cn(et);if(rt>at)rt=at}if(rt>=c){e=An(st-ot,rt-c);at-=rt;if(rt<=lt){rt--;do{st++;sn()}while(--rt!=0);st++}else{st+=rt;rt=0;Z=V[st]&255;Z=(Z<<j^V[st+1]&255)&y}}else{e=An(0,V[st]&255);at--;st++}if(e){Ln(0);Y=st}while(at<S&&!ut)hn()}};var dn=function(){while(at!=0&&I==null){sn();it=rt;tt=ot;rt=c-1;if(et!=w&&it<lt&&st-et<=x){rt=cn(et);if(rt>at)rt=at;if(rt==c&&st-ot>E){rt--}}if(it>=c&&rt<=it){var e;e=An(st-1-tt,it-c);at-=it-1;it-=2;do{st++;sn()}while(--it!=0);nt=0;rt=c-1;st++;if(e){Ln(0);Y=st}}else if(nt!=0){if(An(0,V[st-1]&255)){Ln(0);Y=st}st++;at--}else{nt=1;st++;at--}while(at<S&&!ut)hn()}};var vn=function(){if(ut)return;Q=0;G=0;yn();ln();I=null;z=0;W=0;nt=0;if(ct<=3){it=c-1;rt=0}else{rt=c-1;nt=0;nt=0}X=false};var mn=function(e,t,n){var r;if(!R){vn();R=true;if(at==0){X=true;return 0}}if((r=gn(e,t,n))==n)return n;if(X)return r;if(ct<=3)pn();else dn();if(at==0){if(nt!=0)An(0,V[st-1]&255);Ln(1);X=true}return r+gn(e,r+t,n-r)};var gn=function(e,t,n){var r,i,s;r=0;while(I!=null&&r<n){i=n-r;if(i>I.len)i=I.len;for(s=0;s<i;s++)e[t+r+s]=I.ptr[I.off+s];I.off+=i;I.len-=i;r+=i;if(I.len==0){var o;o=I;I=I.next;Yt(o)}}if(r==n)return r;if(W<z){i=n-r;if(i>z-W)i=z-W;for(s=0;s<i;s++)e[t+r+s]=U[W+s];W+=i;r+=i;if(z==W)z=W=0}return r};var yn=function(){var e;var t;var n;var r;var i;if(gt[0].dl!=0)return;bt.dyn_tree=dt;bt.static_tree=mt;bt.extra_bits=Xt;bt.extra_base=L+1;bt.elems=O;bt.max_length=N;bt.max_code=0;wt.dyn_tree=vt;wt.static_tree=gt;wt.extra_bits=Vt;wt.extra_base=0;wt.elems=M;wt.max_length=N;wt.max_code=0;Et.dyn_tree=yt;Et.static_tree=null;Et.extra_bits=$t;Et.extra_base=0;Et.elems=_;Et.max_length=C;Et.max_code=0;n=0;for(r=0;r<k-1;r++){At[r]=n;for(e=0;e<1<<Xt[r];e++)kt[n++]=r}kt[n-1]=r;i=0;for(r=0;r<16;r++){Ot[r]=i;for(e=0;e<1<<Vt[r];e++){Lt[i++]=r}}i>>=7;for(;r<M;r++){Ot[r]=i<<7;for(e=0;e<1<<Vt[r]-7;e++)Lt[256+i++]=r}for(t=0;t<=N;t++)St[t]=0;e=0;while(e<=143){mt[e++].dl=8;St[8]++}while(e<=255){mt[e++].dl=9;St[9]++}while(e<=279){mt[e++].dl=7;St[7]++}while(e<=287){mt[e++].dl=8;St[8]++}Sn(mt,O+1);for(e=0;e<M;e++){gt[e].dl=5;gt[e].fc=Dn(e,5)}bn()};var bn=function(){var e;for(e=0;e<O;e++)dt[e].fc=0;for(e=0;e<M;e++)vt[e].fc=0;for(e=0;e<_;e++)yt[e].fc=0;dt[A].fc=1;jt=Ft=0;_t=Dt=Pt=0;Ht=0;Bt=1};var wn=function(e,t){var n=xt[t];var r=t<<1;while(r<=Tt){if(r<Tt&&an(e,xt[r+1],xt[r]))r++;if(an(e,n,xt[r]))break;xt[t]=xt[r];t=r;r<<=1}xt[t]=n};var En=function(e){var t=e.dyn_tree;var n=e.extra_bits;var r=e.extra_base;var i=e.max_code;var s=e.max_length;var o=e.static_tree;var u;var a,f;var l;var c;var h;var p=0;for(l=0;l<=N;l++)St[l]=0;t[xt[Nt]].dl=0;for(u=Nt+1;u<B;u++){a=xt[u];l=t[t[a].dl].dl+1;if(l>s){l=s;p++}t[a].dl=l;if(a>i)continue;St[l]++;c=0;if(a>=r)c=n[a-r];h=t[a].fc;jt+=h*(l+c);if(o!=null)Ft+=h*(o[a].dl+c)}if(p==0)return;do{l=s-1;while(St[l]==0)l--;St[l]--;St[l+1]+=2;St[s]--;p-=2}while(p>0);for(l=s;l!=0;l--){a=St[l];while(a!=0){f=xt[--u];if(f>i)continue;if(t[f].dl!=l){jt+=(l-t[f].dl)*t[f].fc;t[f].fc=l}a--}}};var Sn=function(e,t){var n=new Array(N+1);var r=0;var i;var s;for(i=1;i<=N;i++){r=r+St[i-1]<<1;n[i]=r}for(s=0;s<=t;s++){var o=e[s].dl;if(o==0)continue;e[s].fc=Dn(n[o]++,o)}};var xn=function(e){var t=e.dyn_tree;var n=e.static_tree;var r=e.elems;var i,s;var o=-1;var u=r;Tt=0;Nt=B;for(i=0;i<r;i++){if(t[i].fc!=0){xt[++Tt]=o=i;Ct[i]=0}else t[i].dl=0}while(Tt<2){var a=xt[++Tt]=o<2?++o:0;t[a].fc=1;Ct[a]=0;jt--;if(n!=null)Ft-=n[a].dl}e.max_code=o;for(i=Tt>>1;i>=1;i--)wn(t,i);do{i=xt[T];xt[T]=xt[Tt--];wn(t,T);s=xt[T];xt[--Nt]=i;xt[--Nt]=s;t[u].fc=t[i].fc+t[s].fc;if(Ct[i]>Ct[s]+1)Ct[u]=Ct[i];else Ct[u]=Ct[s]+1;t[i].dl=t[s].dl=u;xt[T]=u++;wn(t,T)}while(Tt>=2);xt[--Nt]=xt[T];En(e);Sn(t,o)};var Tn=function(e,t){var n;var r=-1;var i;var s=e[0].dl;var o=0;var u=7;var a=4;if(s==0){u=138;a=3}e[t+1].dl=65535;for(n=0;n<=t;n++){i=s;s=e[n+1].dl;if(++o<u&&i==s)continue;else if(o<a)yt[i].fc+=o;else if(i!=0){if(i!=r)yt[i].fc++;yt[D].fc++}else if(o<=10)yt[P].fc++;else yt[H].fc++;o=0;r=i;if(s==0){u=138;a=3}else if(i==s){u=6;a=3}else{u=7;a=4}}};var Nn=function(e,t){var n;var r=-1;var i;var s=e[0].dl;var o=0;var u=7;var a=4;if(s==0){u=138;a=3}for(n=0;n<=t;n++){i=s;s=e[n+1].dl;if(++o<u&&i==s){continue}else if(o<a){do{on(i,yt)}while(--o!=0)}else if(i!=0){if(i!=r){on(i,yt);o--}on(D,yt);_n(o-3,2)}else if(o<=10){on(P,yt);_n(o-3,3)}else{on(H,yt);_n(o-11,7)}o=0;r=i;if(s==0){u=138;a=3}else if(i==s){u=6;a=3}else{u=7;a=4}}};var Cn=function(){var e;Tn(dt,bt.max_code);Tn(vt,wt.max_code);xn(Et);for(e=_-1;e>=3;e--){if(yt[Jt[e]].dl!=0)break}jt+=3*(e+1)+5+5+4;return e};var kn=function(e,t,n){var r;_n(e-257,5);_n(t-1,5);_n(n-4,4);for(r=0;r<n;r++){_n(yt[Jt[r]].dl,3)}Nn(dt,e-1);Nn(vt,t-1)};var Ln=function(e){var t,s;var o;var u;u=st-Y;Mt[Pt]=Ht;xn(bt);xn(wt);o=Cn();t=jt+3+7>>3;s=Ft+3+7>>3;if(s<=t)t=s;if(u+4<=t&&Y>=0){var a;_n((n<<1)+e,3);Pn();rn(u);rn(~u);for(a=0;a<u;a++)nn(V[Y+a])}else if(s==t){_n((r<<1)+e,3);On(mt,gt)}else{_n((i<<1)+e,3);kn(bt.max_code+1,wt.max_code+1,o+1);On(dt,vt)}bn();if(e!=0)Pn()};var An=function(e,t){J[_t++]=t;if(e==0){dt[t].fc++}else{e--;dt[kt[t]+L+1].fc++;vt[un(e)].fc++;$[Dt++]=e;Ht|=Bt}Bt<<=1;if((_t&7)==0){Mt[Pt++]=Ht;Ht=0;Bt=1}if(ct>2&&(_t&4095)==0){var n=_t*8;var r=st-Y;var i;for(i=0;i<M;i++){n+=vt[i].fc*(5+Vt[i])}n>>=3;if(Dt<parseInt(_t/2)&&n<parseInt(r/2))return true}return _t==d-1||Dt==m};var On=function(e,t){var n;var r;var i=0;var s=0;var o=0;var u=0;var a;var f;if(_t!=0)do{if((i&7)==0)u=Mt[o++];r=J[i++]&255;if((u&1)==0){on(r,e)}else{a=kt[r];on(a+L+1,e);f=Xt[a];if(f!=0){r-=At[a];_n(r,f)}n=$[s++];a=un(n);on(a,t);f=Vt[a];if(f!=0){n-=Ot[a];_n(n,f)}}u>>=1}while(i<_t);on(A,e)};var Mn=16;var _n=function(e,t){if(G>Mn-t){Q|=e<<G;rn(Q);Q=e>>Mn-G;G+=t-Mn}else{Q|=e<<G;G+=t}};var Dn=function(e,t){var n=0;do{n|=e&1;e>>=1;n<<=1}while(--t>0);return n>>1};var Pn=function(){if(G>8){rn(Q)}else if(G>0){nn(Q)}Q=0;G=0};var Hn=function(){if(z!=0){var e,t;e=Zt();if(I==null)I=q=e;else q=q.next=e;e.len=z-W;for(t=0;t<e.len;t++)e.ptr[t]=U[W+t];z=W=0}};var Bn=function(e,t){var n,r;It=e;qt=0;if(typeof t=="undefined")t=s;Qt(t);var i=new Array(1024);var o=[];while((n=mn(i,0,i.length))>0){var u=new Array(n);for(r=0;r<n;r++){u[r]=String.fromCharCode(i[r])}o[o.length]=u.join("")}It=null;return o.join("")};if(!e.RawDeflate)e.RawDeflate={};e.RawDeflate.deflate=Bn})(this);
// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var ENABLE_TEST_TAB = false;
var ENABLE_ATTACK_TAB = false;
var ENABLE_SAMPLE_TAB = false;
var DISABLE_BULKADD_LIST = false;
var ENABLE_GM_AJAX_TRACE = false;
var SEND_ALERT_AS_WHISPER = false;
// end test switches

var throttle = 10;
var MAP_DELAY = 4000;
var MAP_DELAY_WATCH = Number(0);
var DEFAULT_ALERT_SOUND_URL = 'http://koc-power-bot.googlecode.com/svn/trunk/RedAlert.mp3';
var SWF_PLAYER_URL = 'http://koc-power-bot.googlecode.com/svn/trunk/alarmplayer.swf';

var URL_CASTLE_BUT = "data:image/png;base64,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";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,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";
var CHAT_BG_IMAGE = "data:image/gif;base64,R0lGODlhagHQAvcAAP%2F%2F5v%2F%2F1v%2F33v%2F31vf35v%2F3zvf33v%2F3xff31vf3zv%2Fv3u%2F33v%2Fv1v%2Fvzvfv1vfvzvfvxffvvffmzu%2Fmvebmvffere%2Feve%2Fete%2Fere%2Fepebevebeteberd7evd7ete%2FWpebWtd7Wtd7Wrd7WpdbWrd7Ord7OpdbOrdbOpdbFpc7FtdbFnM7FnMXFrc7FlM69rc69nM69lM69jMW9nMW9lMW9jL29nL29lM61jMW1nMW1lMW1jL21nMW1hL21lL21jMWtlLW1lL2tnL2tlL2thL2te7WthL2le72lc7WlhL2la7Wle7Wlc7Wla62le62lc7Wce7Wcc62chLWca6WcjK2cc6WchK2ca62cY6Wcc6Wca6WUhK2Ua6WUa6WUY5yUY5yMa5yMY5yMWpSMa5SMY5SMWoyMY5SEa5SEY4SEe4yEY4yEWoyEUpx7Uox7Wox7UoR7WoR7UoRzUntzY4RzSntzUntzSnNzSntrSmtrY3NrSmtjOhlrzmNaSjpjhBljxRljvRljtRlarRlapRlSnBlSlBlKjBlKhBlKexlCexlCcxlCa0o6CCE6Uhk6Yxk6WkopAEIpADopABAxQjEpEDEpCCEpMRkpMTohADEhACkhCDEZACkZACEZCCEZACEQABkQABkIABAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAagHQAgAI%2FgB1NGgAB02XJUaWKFziZEmShRAVOplIcSIUKA4fLsG4EUqVj1kqNpQosmJEJ1VGSvx4saXLlwxLTvxYReFHmSgnkqRJkabPn0CrvGypE2fFlEZLCl3I8SJEKCirZJmKNGlJIxRJjoza0CREq0eVBq0KNqdIpFo7ehQ61OVYLTSnZoGbUUoSJ0yeNJlR4EGdOGsCC37jRvAaN4gDI37DuDHjOI3dOHYcR46cyZgzI94cmfMby6BBZ34Tp7Tp0ocZFx79GPNp03LsjLZcGjRk1ZJZE278%2Bvbj3qZVH0482rQdO8DjbEZ8OnHwNaU9q9ZNOvnpzryTvzEcuLRr4MWt%2Fgev%2FpoOHdPm0zOWszkOm%2Fc3HjxY42QGChQmRNw%2FQaL%2FiRP7%2FYeCCAT%2BR6B%2B9yUYoIAKmuCgCSVEWMKDD5aAH4UOXkghCvz15yEJCoYoIgoT3gehCSRieKKEEkIogoQj3pcChx7%2Bx99%2FH%2F7H4o4RoohCCjNyaOOCAIb4YX8xJriCggDqGGGRIloo4oYaVgjjiBnGmGWSCdqIoopbhljhg1yWaeYKQJZwwoEjjHBDAgmoYcQGfRVg550DFJCnnQP0ead88tkJ56AJCEoonAUMpOiddiraAKOQRsrooZQOmqiji17qqKaLYurpp54WUGilk3IKaqiMNuAnpIiuKiqi%2F68W2uhAktYKKa13nqorpolemmukj9p6a6278kqqsH8%2B8CcEyhZwwAGMPgCBnQI1sIYRIDQAQbGbcmqqow%2BAGm64npKL6bjncituA%2BiiO1C77MYL77i5BtuXueqCqum37ALq77%2F%2B5vvuv%2F0GPLDBBhfbLr6KAkxwwacCKnC6706M67f1OhtBBBAcwOwADjgwA7tygJGEDjrkoPLKKvuwsg8w5wCzD0MMMXMOKKO8MhApsywzD0AHLfTQQc88NMxBDwHE0kwD4fPLM0dtdNRAU0200DPXXDPNWnettNc8s8yz1DPPYHYOVZNt9NE%2B6KB0z27rvDLKRa9dddBo86C21f5D5%2B3D1XjnMMPKgO8NeN12H6643joA0TXPTXstueQ%2FDPFDD5gXofkPlQuRgwQSwOGGGmecAcbpqIOxhRVWSCEF663DLrsVW9Re%2B%2By45667FVTsrvvrwPsu%2FPC2F7867Lfvfjztt9vOfPLD0%2F588dFXb73yy%2Bee%2FfXcd8%2B98eCHD%2F4ZcMxRRx1zwHHGEkQwQQcj8O%2FRRx8vMOBAHX2Iov%2F%2B%2FPfv%2F%2F8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygAxmhhyUUgQ3wy%2BALDKCAOeRPgiAMoQhHSMISmvCEKEzh%2Fxixhh6IIYOMaIEBDOBBFdrwhjjMoQ53yEMJsrAK7%2F6DXwsIQIAa9vCISEyiEpfIRAMyogtV2AP8XkBEIzbxiljMoha3%2BMA9ZGENU1RABz%2FIxTKa8YxoZCIZjBDGMYLijXCMoxznSMc62vGOeMyjHvfIxz768Y%2BADKQgB0nIQhrykG%2FcQxQZ8QIxehCRkIykJCdJyUpa8pKYzCQoGMGFNjByho%2FUpChHScpSmvKUqBRkF7gQQ0f2IZWwjKUsZ0nLWuIxCzuIIQdDacte%2BvKXwAwmIHGpSzcK85jITKYyY0nMFrhymdCMpjSnWchmPpOa2MymNrNpTWNu85vgDGcvs9CDVnpTnOhMpzozmQUimNODnYinPOdJz3ra8574zP%2BnPvfJz376858ADahAB0rQghr0oAhNqDzJ%2Bc4%2BKPShEI2oRCdK0Ypa9KIYjWc34ZnRjnr0oyANqUhHStCNOpSkKE2pSlfK0pbmk6HOHKNLZ0rTmtr0piUtZyNlitOe%2BvSnQE0pQ3fK0aAa9ahITWpBh%2BpKpTr1qVCFKlN5GtWqWvWqM4UpKE%2BK1a569asZbacuachVsJr1rGgtqTtlSFZNuPWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvatYmWrBw%2FL2MY69rGQjaxkJ0vZyro1C0Uo5mIty9nOevazoA2taAOLWc32YbSoTa1qV8va1t61CkdoqGv%2BZ0vb2tr2toGFrWxxy9ve%2Bva3qdUtUU8L3OIa97jIHaxwXZnc5jr3uc9d7hihS93qWre20t3sdbfL3e5aVrcx9SAlxkve8pr3vOhNr3rXy972uve98I2vfOdL3%2Fra9774za9%2B90veKhQBEuHVA38HTOACG%2FjACE6wghfM4PFC4QgAdqSAG0zhClv4whjOsIbt%2B%2BAIj3HDIA6xiEdM4hKztwpIgIQKXNmISbj4xTCOsYxnTOMa2%2FjGOM6xjnfM4x77%2BMdADrKQh0zkIhf5EpagxBVSTNQ88OHJUI6ylKdM5Spb%2BcpYzrKWt8zlLnv5y2AOs5jHTOYym%2FnMUH5Cilv%2BsIAF5CEPf4iznOdM5zrb%2Bc54zrOe98znPvv5z4AOtKAHTehCG%2FrQiE60nO0CCRsgwM1%2BAISkJ03pSlv60pjOtKY3zelOe%2FrToA61qEdN6lKb%2BtSoTrWqJ22FJEBiBgPoYKRXTeta2%2FrWuM61rnfN614DwgpLgAQMBCDrQBj72MhOtrKXzexmO%2FvZ0I62tKdN7Wpb%2B9rYzra2t83tbnv72A2BxE7T4AdBmPvc6E63utfN7na7%2B93wjre8503vetv73vjOt773ze9%2B%2B%2FvcRoiCh8n974Ib%2FOAIT7jCF87whjvc3EaA8LjzMIiKW%2FziGM%2B4xjfO8Y57%2FOMgD7nIR07%2F8pKb%2FOQoT7nKV87ylls8CRIXYxryQIia2%2FzmOM%2B5znfO8577%2FOdAD7rQh070ohv96EhPutKXzvSm2zzi4pY5zZ1O9apb%2FepYz7rWt871rhPCCEyWeiHGTvaym%2F3saE%2B72tfO9ra7%2Fe1wj7vc5073utv97njPu973TnawR10BMzeE4AdP%2BMIb%2FvCIT7ziF8%2F4xjv%2B8ZCPvOQnT%2FnKW%2F7ymM%2B85gcP9Q12MA%2BbD73oR0%2F60pv%2B9KhPveoFnxAAgzIPh4i97GdP%2B9rb%2Fva4z73ud8%2F73vv%2B98APvvCHT%2FziG%2F%2F4yE%2B%2B7I3ABNfTMA%2BIiL70p0%2F96lv%2F%2BtjPvva3z%2F3u%2Fnv%2F%2B%2BAPv%2FjHT%2F7ym%2F%2F86E%2B%2F9Jn%2F9znkIRHwj7%2F850%2F%2F%2Btv%2F%2FvjPv%2F73z%2F%2F%2B%2B%2F%2F%2FABiAAjiABFiABniACBh%2FftdICOB%2BivCAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCIjiCJFiCJniCEAhzABYy7rcILviCMBiDMjiDNFiDNniDOJiDOriDPNiDPviDQBiEQjiERFiERviCKtgCDtCAeXCETviEUBiFUjiFVFiFVniFLpgEUKBibeZ%2BjvCFYBiGYjiGZFiGZniGaJiGariGbNiGbviGcBiHcjiHdFiHdniHYPgDUBAJKvB6j%2FCHgBiIgjiIhFiIhniIiJiI%2F4q4iIzYiI74iJAYiZI4iZRYiZZ4iYAoBcHGAyEDB1SgAgAQiqI4iqRYiqZ4iqiYiqq4iqzYiq74irAYi7I4i7RYi7Z4i7iIix1gA1kQASk2AwLQAHjQBSeQi8Z4jMiYjMq4jMzYjM74jKi4i13wASmWAwMgjGggAtC4jdzYjd74jeAYjrlIAjfgBRmgBJDgA9qCB2WgjeL4jvAYj%2FI4j%2FTIiiJQA1iQAVMACT8gLXZABu5YjwI5kARZkAZJixsQA1dQAQLnAwnwAHZQBiNwkBRZkRZ5kfOYkAspcDdQABAQkROJkSI5kiRZkre4ATRwBR8gcDXgkSBpkjAZkzI5k%2F%2F3yAUfsI80wAASgAfZOJM%2B%2BZNAWZAj0ANecJOvNgA72ZNBuZRM2ZTcOJRFuY868AAMwJMo4JRYmZVaeYscIAMqmWJTWZVkcJVbWZZmeZameAEKuZKQMJXCOJZoGZdyqZVqqZINuS14AJdzuZd86ZMXgAM2KXA7gJdlQJZ9eZiIiZEbsAM2mWKD%2BZaGmZiSOZkCuZhXgAGOuS3%2FGJmU2ZmeCY4b4JUVkJkNsJmfeZqouY0XIJoC9wN98Y8BmZqyOZu5CAIxEJjp%2BJpKSZu82ZuxaJt2mZsPgAdrEJu%2BeZzIaYq2iZs%2B0BfEaZzJGZ3IqZFs2ZzDWZzSmZ3JqZEY0JD%2Fzomd2hmevAmc3RkJ1mkHagCd4rmenUmeU2Ce8mEHu8me9EmZ7mme7FIHYxAC9dmfk8kBMeAF5amOfrGf%2Fnmgh9mVRRkF%2BFmg%2FImgECqXobmgkfAD%2BUkGDxqhGlqWCrqSFXqhGbqhIuqUAEqhBKqfITqiKgqUtimgDHqiBrqiMvqTLZoBL5qfMTqjOgqTCUmhNCAfepCjOzqkIjmhHvqjDxCkKUqkTHqQG1ADPgqkQtqkVEqQTxqlSTqlVbqlGQmlRxoueKClXDqm4nil1BgJPyqMYkqmbNqNZsoEaAqma9qmdOqMZsqgaaqkdbqn3Gik7%2BkD8lEHGMqnhGqnNaCS%2F3AKqH7RjoXaqMr4pJeZqIHKqI5aqbm4mpEKn4uqnpbaqa%2BIqQM6qZzqqaSqiqD6oqJaqqrqihdwqB6qqHVAqas6q6jYqpkKq7JKq7o6ipCKmXGapAC5q8IqipD6AXCKpHoQrMMqrMV6rECqrMuqq72KBL%2Bal6MarZ36pFXgq0iKB19wrdhaqdNard8arrRqmRjgrMJYrua6qugKpyOzruDaroTKATuAqJFQLYLqAfSqqnV5k%2Fk6ELHKr%2F1KqnWZrgHbAPtasAarkAirr2RAsAxrqdwJpxArsRPrqKGZqRebsZYKqhYrsBHrsZW6mlpgrAm7sCTbqKtZlCFbmuy6sv%2BEOgEKmQEvawcxK7N7SrOXSa3Vogc5q7N0agEOC5bycQfQKrRDW7Rt%2BazzqrRMSrQ927TASgJQW6dS66tTWbVXS6c8251Um6xP27U6%2BrUNKaVWS7ZkSp4phqxzqrZDSp4Cl6ZhuqRwy6Ry%2B6t6erdbmrdua7d8u6PciafSsreB26SDG6cQYLiHS6TcSa0zIKWA27gr%2Brjm6ZxqMLmUO6IJ2ZiXO5yZu7mOe5u%2Bap14ELqiK7gxoAUIa7qom7ozapusm6jscrqaC7sQ2qKtW7uvi7sq2qMoS6C267syCry0C7q3S7z9abyaKqjJq7z0Camj2ZYgCr2ce6ijGbB%2BMaj%2F1ruh4yoQftG73Yug38su6Pm846ud5QuR4pu%2B%2FWmrZwq%2BddC%2B7kuftqq11Vu%2FB2oBh4qZ1Mu%2B6Ku%2F0xkDWOC%2F4Hu%2BAuyfPWrA5ku%2FCay%2BAUqN%2F4vADxy9AcrAAFzBFlzAYLmODqzB26mQ0ysQEDC8ICyeGjnC67gGAXzCqZmQHBy23OvC2QnD3PqsLUzDn2nDbRsujKvDAxzDefq2QCybC9zDDfDDRdybwEutQ5zDSyyZTay3MxzFTHzBPQysUGzFh5nCEAarVczFsjkB9zi1YLzFYjyXE8AB%2FUutZ5zGvLmxpRuoYQzHp3mwbkzHaGzHaInHzVvHfNyZfvzGgYya%2F3Kcx9u7x4W8lZYbuUmKBsW4yJ%2FJtvkqpSUgyZNctNVKxJg8l8CZAZAruZ3cnjUbylmqyKPMlJ%2FsxOFiB5ycyme5ynFammCAyrDMogQMyrPsyrZ8yz5pm%2FnIysJYy76MmBqZAU0QCY6sxMUcl5%2BczMsMyM0cy7mczG47ttPclC36AdYspdiczUsJAl4KzU4Lzp4cwaycpd9szjQawd08zL3MziIpuyi7tc4rz2gpzldgs9p7z%2Fhslvp8pCIbz%2F9ckeIcmGiavwWtlQHtxAq90FhJyfJrBgQN0QWZuDSQnxRt0VkJAl5ZnjTQF3Ww0RztlPpcno7MyyVt0hHMoCn9yv8rTZK669LxCdMxPc%2BkS9MQadM3fZHLidI1XdE9HY%2FbbMrMPNQmOcXLzNNI7aTorMyi3NQzCcM2qrdMLdVWGsHOOpxXjdUCuc3kPJzE7NUwCdZQLdZCTdbdaNaRC89qbZJmTbdj%2FdYjuc3vKddpTdfPaNezXLd6XdcBqo%2Bfi6J%2FjdPm%2BKci3dWFHY4g4AKHPdiKvdjfuAErkI%2BI7aCSbZGUbdmf%2B495ndnISNn7fNevKc2gTY%2BiLdjN%2BZGmfdrymNqJWtqf7dq4uAEscKv%2B%2BMG0DY8aoMnn2dq7LY4akJKlm9izHdy0ONw9C9nHjdyyqAH9G9uJ7Nz1CN24Pd3UPY%2F%2Fyl3cmJ3d8tjby92cDSAHY6AB3i2PX%2BvGieLX5w2PNLut6p3Ekd3eufjecyzfzU3fqmjfeYzf%2Bi2O%2FA2f%2Fv3f4Njb8C3gR03gzjjc2xrbA67g3bjdDs7eEM6Nyo2yIY3dFb6Ntm2OxyrSwL3hx6gBLCCg8GrcIr6NJG7iaAri%2BZ3iALDiCJvh%2FgzjzagBMODhv1rjNr6MOK7jNB7iPV6LP87PND7fQ66KRe7EiY2xST7iKWnkKP7kyajcUr7TL57iF%2F7hrJ3lIq4BOoCvId3lVF7lYQ6wGa7SZQ7lKkna3b3muWjl76kDTQ7nxsjgGDDnIrvOdo6KFZuwsNnntU0D%2F6yLqhCZq4I%2Bi4m7tYGe6LXYqwyaA%2BYr5I7u5%2FeKsCMDkSNb6Yp%2B6ccqsk7O6ax6qPwMsXwu6gBgAV7pofK76aj%2BqQ4rcK0e6q9uqrFOvQrr6rXOinLMoLO%2B6664sVWNpCoL7KuolgiNpDh76qJOtDa51XcQtMZ%2BijyL4a0s7dNeiuldyVqc7aqYtT7LLneA5IkO7pEg6afs7alo7pK%2BuJQO7H%2Fe7smatupuitQZsu5O7%2FVOiouuLfO%2B7%2FYe69r77wDP7wIv6Q0w7vpe8ACQtyRM8Awfig5fuO%2B%2B6xPv7l6%2B4f2O8RFPrJpMwp7d8aFouSCv296et6ttByws8g2%2Flv%2Fqjbwsn7ium%2FEVLvOYS%2FMQ3rkDevMxf5uvqps4r%2BBG%2BqKyHfMyIKAvz%2BMMH5oczNws35ULmWKE3PHTmo7%2BiAZBT%2BBPGsxWX8Imn%2B1bD8q5%2BZFYH%2FP4qMvnWfYiP67WqfQFb7m%2FnfX%2F%2FbhdL59yr98JybpSLx88eff0fcRW%2F8h%2B396Ar6h6oPZUj8WBf%2FiDf94pvPeC3%2FNRv%2FiIH%2FE6n8WM3%2FNcANJ9kflrT7pSbycJru6Xn5sFMPreXviJgvpg%2F9TWmayN792de6YZ7vkdj8eQMOZ9L%2FkYAGFjHvIdv8arHvrbuwEiL%2FxmHNRP75W6TOzkLugc4AL7jMhqTvXSP8f%2BWB7z18%2Fk2f%2F5y92tz9%2FncF%2B4lb%2F0mvyji4sGl%2Bz92M%2F60265f8v7Rh3%2Bdg7%2Fchr72Q2ctN%2FKcx3x%2Bg8QTCL5eNDADpgQABQuZNjQ4UOIESVOpFjR4kWMGTVu5NjR40eQIUNuiHEFg0AaDx7gGZNQ5EuYMWXOpFnT5k2cEEmaRBJphko9LXMOJVrU6FGkSUXuPOnzAQQ9alwqpVrV6lWsWSmCiKHlg0CCD4JO1VrW7Fm0aTly9fI1UsqVZMiqpVvX7l2qIGi0FTijgFi5eAUPJlw4pN62Pf0CnmvY8WPIhdl%2B6AnXjtDImTVvPssVS4YpA1VebszZ9GnUNtmCFv3%2BgHRq2LFlg0ScAWXBOphn7%2Bbd2yGIHV5sv8Wt2%2Fdx5KmBf65cvHRy6NEly2BOvEHu59K1b08LgjqG5g%2BwcydfHq33z02Iizdu3v17pOhZ%2F2SfHf59%2FDHlh6Y%2FPv9%2FAGGSTz368EAoQAQTXCuGz%2FhTyUD7FJRwQgBWc3Cl9ijUcMLJLmQpwg1DvK9Dp8TKUEQU8SNJuAvHSvHF%2F0j6TIn1giIBRhzhm4xGuGzM8cfydizRRSCLlM7CEj80csnkJiPwwROZlFK5GNpSz7Iop9RyMxLDem1LME9DMiz%2FwjQzszH%2FKvNMNg1Ls74245SsStbIzFJOPM0CYYUGW1szT0D%2Fz9qAzzoTgDNQRM3SYIUrWLvB0D8TlZSqRRsNzQdI75x005yYAms0TTkVlSamesIUAjvQAHFUVl%2FSoCTwInkU1cBatdWmV0361LVQb%2FV1Iw1oaDS8L381NqRgG72N11WPdVaiYLUYzsten7XWoWinBbXZa7sFIFtTcTvQW3KhFTaDygq4btxy222IAliXLdZdeieId7156W3XXl1by1ffcoVtilpuAb412YG3NdjdZIfDsuCFWW2YCUkIjrjcbCl%2B%2BGJyX5UWJXUj5fhYj9H1KeQxQBi5Ww1g%2BPgtNatdmdOWX4ZL5JkPdtlhlXDOuVWPP7gyZoh%2FDjRat2gg2miS%2FmnwCuRDmfZ1YpijltpWhJeto9arbd2ghn5TorXortvcYIewn7KD67JH%2FdqkKNbbmuy2zXwbg7hvlrlus2moAu%2BKC5Jjb77PJOnvuAm6ju3CJT0cbz%2FVEKFxTrmCeyAIXCNjcson1QvuwHnlvPNEP4c8pesIJ31K0%2FN2bvXSBXadWdgRvXv2f2s3G%2BzTQd1Ad0DP7jcsPBgHnk3hYw1Lj82Px3MDGrhQ%2FsHmnY8z1%2Bmttt5M7MOrowsPtm%2Bz%2B6q%2FD1%2F8M8lXWnv0tWyZp6qLH739Ld9vav2o5qd%2FSg1Y0LViNanhfPtzHwu0cL%2B%2F4EEqBKyfAREoljXQjYET6t8B%2FqGWvwnyz4HLwmAGmUQSCxKHAfLz4AerdL8HjHAM%2BithjjyGQhWysIUw6t%2F%2FlNaAoMhwhimqIQZCc0Mi7dCFLmuKXxqgJCEOUTi3OaLqkvifV7Xlh0Bx4hPxE8UPTNFEErTie7CoRQh18UVR9OF6wihGFLXMC2WkQQNoh0YRRZE1bXwjHDf0RXxV0Y7kwaMOFLZHDckxNH7EEBcBKZ0X%2FtCNxTPkIaFjvx%2F%2BRQ%2BqciQFiRhJsVCykgoq2RQksT47LHCTCULS%2BuogylEGqJRqMl4qR9SVpPWsla58DwhjyT5aerEkPHsAHPSYS97k6pa%2BbCQwY2OBXS6LmMbEDzLT%2FsYAXw6Qme5xZqxSAs0x%2FG6a76lmeJa5TWrCypu%2FBCdq1KeSb5aTj%2BJcDxzYpc7tvLA5DXBnMeGJpr1YswENcEMXtHlP7dSmJzpwYz0Bup3JoKQBEIgDOQ8amRVl0ScLbeiNHhqdFc3HjRW9KEbpNEh1NdSeHSUMkgjaSzBIk6S9QVIOGPCAhqp0pbvJaGhcisuZxqamJfJZTlGzAf8NZwb77KlPTQNUZUkiB0R1qFHvUsGvKJWpI3WqWqCq0NRRtapoqZlbTlqHd27VnC6L6lfBJ9bYXFUSOghZFjSAVtj0MFwFgIMRKADX1MhTVgkogBuMgNe8wpJifinAGn4A%2F1hzClYShDUsYk8TNI09oABqOKxjOWO%2FKGBCaZOtrGU1g1lMDJWznt0MZhfbgNGSNjP2G%2BwABkBZ1a42Bn9DwmJdC9vYQuZVfzvCWhvAANzm1jHY6y1BgNtZ4RaGuIFrQHCTW1JYFbcgavDBc90UXeZS17pzOqB0m1vd7Q4mBF0BzyehpNXw3oRqFkvvU88VLoM0tb05oRpckDhfujQsPPfFb1r06y%2F59rcmyaKMaNaFXgHDJFcmA2WAEyyTc9bxwWaJAROyl7sJW4VfCZNwhrGy4XB12MNWIR97R4wV7MnLwSf%2BCPa0iGEWH8XFeURwjDWy4L4szcZVqZnJZjAA9v6obMeU2hnUijpk9cJAWXJbMZIxAlm5zdLJOIGyKaU8ZVw5LWk6xnJR%2FmvKJnd5IvVFWY3FDJGsle%2FKZ46JBnSwZKWNjc1DcTOc1bbmOYvkcxm4Us%2FCnOeG7NmTYDYzoBXiYgA2YHCFNrTlMKAeH6hLDng2tEcc3WfxVK%2FSM5mxlzS9af0IzJMmBrWARG2dI5f6xueKZFZVrZ8385nGr1Ywq2dNa5EgbIrxZTSg68xhRuJazzTAQvaCLWzaCCxctNIhsp98Lzv1Os8pto4cwursG%2B9SMWXGtkcWvG0Rd%2Fsi9lMM9aQ9Z9ZGggdADuW52VzBk0hi3eJBpbgzAm%2BK6f%2BA3fW297g3ONGV8LvfFcH3kCQ38Hv%2Fmz5RKQHCn71GJvLX4WOmU2QLAOOJN0QDLrCgeZvo7jMXHHUSzzia%2F31DkpccW0TMMQ7%2FvOmaFVFdQVQ5mqt0S5rXHFs312LOdc4QPNIgc3q49s8PfcIpourllQ76QjFec0G%2BxelLN3TQ1UZ1X%2FM8En5UOsjF3MenpNzondy6G5nn9S73WJGMMfpDYo5JBaIdy1w54KD%2F0u62%2F6Yrc7y7wNtOd4laWe5TrjIrB%2B9kYS5r0XnXeEluKVLGAz2Z64F85I%2B%2B5KHScwxvtfy32DnUXo5Bpm0nH%2Bhj2nnPw48%2Blbd8hFkf%2BQhHE%2FX%2Bem0jPVM6e%2FJWZp%2FuHL3REaPPB%2FTz8EgOwV4cVtAuDH%2FIiEkaRVeI%2Boj2xfkWtfxOTT8G6kd%2BRWzcaNF9%2F9Gyw9T7P1%2BNQmGK9TwjqT%2Fon7Mty%2B3qzu%2FENh5PdcaROn9C1n%2FiSC3wV9nPZv7TPfEYP52zpXxzI7BSvh3bACUrKwQkQKjzn%2F5DwCzovZ8jt7KjpyS4q87DQIIqLOSCvQYcLNRqLNy7gqiCgX0ywQ4cwdNKrRZEwSnAhA90LtiDlRkULRtkvBSzrdcaAtRLPcoIrdsCwhMsrx8DLiPsQHGyLSUMwuXKAQf4riB0tN7igekCr86zwuzSQsvjQsXRLtT%2FA0OVEMMtzD0DM8MvJKKB2ic1FEGesC1%2BCkEeVDIkBDI4oMO8AwE7rK0f6yU9%2FLsm%2FMM8DMLxOqDaWh83CMTvsyE3ekPG24kPyCw6gsS8sxfE0ay%2FsMS2u4DZwoAl%2BKRH9MLIE4EeaItQrERSZDxTbIvMqsEgCMLbwQQfQC01iEXU44DgmERatEVG%2FLkNkAG40SzJKkTUu4AaWKMoMK8BMMb4%2B7yCcMbqc7wlcAp6wsVnRMFQpA84wMbqkwGvWMafuEZZrIEDyqyfaEZv1D5zvAB0fAB1lEVYoUR43MG8E4EY4AJeTInX%2BkWdczTXGQC%2FksfLQZ2BHMN8xBtiFMi%2F%2F0JIfQxINWjIM3zIhbTHtsNHiuRHizQ6jNxHN%2FTHmsNIDDgCqXuAjfw5DkjIuCGkk9S5lJSeVyxDkFS5l1RIlpzJkqvJmDTJdWQ8naTBMuzJvHtJXjwpTuTIZNzHv3CDJfzCpJxBRWzKyAOBp%2FykpZRKxvMOKbLK4MNJ%2B%2BM5rlxEedxKRfTK%2FeM5TezKscyitBRL6EPLG3LLM4Q4WlQJufxCGeCLulRL1BOBpGQCWlxKs3Q4fEwMTZzDKrw5wIxLrNzDE1pMdWHKxFwjJDhMyXxL4UjEqwxCXRSDD1iCwETMXNwBzwTNSJtDzrM8ESDNzwzNuyxF1jyCwOTLzltNz%2F%2FsrbIMQlO8zbYcTIQzgR64TasUzc4zgSJggw%2FAzcj0zYEzzjf4ACJgrtdkvBVggufsgdCZzrxjFDr4ABwYTu00ugngTu%2B0yr5iTnsbzyugAxP4zs0Kz58bTyxgz%2B9UHPjUOXvxAjxoz7okzsizlzDYA%2F6sRRA8xhUQAwHFgUw4qfusOQuQgTIQ0BhY0BVET3GzANLczxjoTxb8T9IUUBnoxeay0G6zFwRtTwqFwcjzxBPFARr0ReiTgRMlgkwgrKP8x%2BBkzyjYBBV8ADQgUWy7ACJgAzEwATTgBKF7AMNKzT1EgSVggyX4ADz4BKGjwi80gTBYgxUoAUag0gIoADT%2F8AEmFU8Q0IEw%2BIEUAANK%2BIQfgAAIIIMf4EDfmAA6nYCFkFOlsFOQwFOLqFM0G1OGoAAK8NNA1QA%2BfQhBTVRFTdQJGFRH1QANaFRJHdQ6pVMLoABIrdRK1QALsFM6hVRQBdVP5VRStQBOtQBUTVUL2IANUFVVnYBVvQBX7dRU%2FR0LAIENAAEQmAANKNMu0IESAIMuDYU4WwMjQIEQCIENSNZk1VVdDQERiFYRSFZpZdZoBQForVYR8ABu9QBWZVVmZVUPCIFxZVZzzVVsNVdqldZrRddv3QB2lVYTmFcUMAER4AARGIFoJddu7dZ1jdYSiFd2RQGCZdcSKIETSNgT%2FwhYaT1YEyBYFDhYhEXYhD3YhIVYjI3YEkCBFOhYjyXYj%2BXYFMDYjgVZjz3ZkBXZEzDZjIXYlDVZFkBZj2UBmk0BmqVZkGWBnG1ZnkWBFViBjP1ZoR3ZkSXYFWCBo%2F3ZjhVapm1ap3Xam41apG3am12BGNiBGtiBHTjaGXCCJAABH2CEURgFYj2AwjICGmCBGVBbGqCBGYABuIWBGJjbuW1bu73ZGUhbFoABqbVbv50BwM1btw1cwSXcuIUBv01cxU3cGsharM3aHugBIpjcHtDayn1cv%2FUBzfWBHfgBzyUCz%2FVcrd2BySUCIzAC0C3d0j1dI%2FjcH1DdJYhd1k0C1P9VXda9XdpFXSOIXd693SXI3dPlXd6lXeEt3iW4Xd8V3t29XSdoXuSd3SQwXuXd3eMN3ue93uuN3SLY3uKNXtml3iUogvAN3u%2BV3uIVX%2FE93iIwgvU13fXdXvgVXid4Ai3ogi8Igy5Ygh8Agx9omT4IhU8YBVEQugDwq%2BbNAgRO4CyogirIAi3QAgZ%2B4C54YC1QYASm4ApG4Al%2BYAvuYA%2F%2BYAZWYAzuAhIm4REmYS%2FQAi8IAzEQgzB4YS%2BI4RKeYfv9Ahv%2BAjLIYR0mgxfu4TAggzIoAx8eYiJ%2B4RwO4iDeYSLO4R5mYiPeYR5u4ij%2B4SLugiLGXxrO4hKuXy3eYAxTzuAvpuAJXmAHDmEEroLmfYInaF42doIqUOM1ZmM4nmMGZmMGvuM7hmM3ZmA1xmM%2F5uM5juM1ll8n4F04jmArLoM1YIMyWGMYGIAf6NKxFQVRCAgAOw%3D%3D";

//var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

 if(document.URL.match(/standalone=1/i)){
    unsafeWindow.appUrl = window.location.protocol+'//www.kabam.com/games/kingdoms-of-camelot/play?s='+unsafeWindow.g_server;
 } else {
	unsafeWindow.appUrl = window.location.protocol+'//apps.facebook.com/kingdomsofcamelot/?s='+unsafeWindow.g_server;	  
 };
  
unsafeWindow.arthurCheck = function (a) {
	logit('arthurCheck intercepted');
	return;
};

var isAFK = false;

var upgradeData = {
  active : false,
  item_upgrade : {},
  item_enhance : {},
  item_repair : [],
  retryInterval : 30,
  enhanceAction : "show",
  enhanceItem : 0,
  enhanceMax  : 1,
  minStones : 100000,
  queuetype : 0,
  upgradetype : 0,
};

//just add your character here and everything else will auto populate
var Filter = {
   Null:atob('rQ=='),
   Period:".",
   Space:" ",
   UnicodeLS:"&#8232;",
};
var Options = {
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  wildType     : 1,
  unownedOnly  : true,
  mistedOnly   : true,
  hostileOnly  : false,  
  friendlyOnly : false,  
  alliedOnly   : false,  
  unalliedOnly : false,  
  neutralOnly  : false,  
  srcAll       : true,  
  srcScoutAmt  : 1,
  minmight     : 1,
  maxmight     : 99999999,
  srcdisttype  : 'square',
  pbWinIsOpen  : false,
  pbWinDrag    : true,
  pbWinPos     : {},
  pbTrackOpen  : true,
  pbKillFairie : false,
  pbGoldHappy  : 95,
  pbGoldEnable : false,
  pbEveryEnable: false,
  pbEveryMins  : 30,
  pbChatOnRight: false,
  pbWideMap    : false,
  pbFoodAlert  : false,
  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, defend:true, minTroops:10000, spamLimit:10, lastAttack:0, barbautoswitch:false, raidautoswitch: {}, alertTR:false, alertTRset:1, alertTR2:false, alertTRsetwaittime:60,RecentActivity:false,email:false,alertTRtoff:false,AFK:true},
  alertSound   : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:20, repeatDelay:0.5, volume:100, alarmActive:false, expireTime:0},
  spamconfig   : {aspam:false, spamvert:'Join my Alliance!!', spammins:'30', atime:2 , spamstate:'a'},
  giftDomains  : {valid:false, list:{}},
  celltext     : {atext:false, provider:0, num1:"000", num2:"000", num3:"0000"},
  giftDelete   : 'e',
  currentTab   : null,
  hideOnGoto   : true,
  transportinterval : 60,
  minwagons    : 100,
  lasttransport: 0,
  reassigninterval: 60,
  lastreassign : 0,
  HelpRequest  : true,
  DeleteRequest: false,
  DeletegAl    : false,
  MapShowExtra : false,
  RaidRunning  : false,
  RaidReset    : 0,
  DeleteMsg    : false,
  DeleteMsgs0  : false,
  DeleteMsgs1  : false,
  DeleteMsgs2  : false,
  DeleteMsgs3  : false,
  DeleteMsgsdf  : false,
  Foodstatus   : {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Creststatus  : {1101:0,1102:0,1103:0,1104:0,1105:0,1106:0,1107:0,1108:0,1109:0,1110:0,1111:0,1112:0,1113:0,1114:0,1115:0},
  LastReport   : 0,
  LastCrestReport   : 0,
  MsgInterval  : 1,
  CrestMsgInterval  : 1,
  foodreport   : false,
  crestreport  : true,
  Crest1Count  : 0,                            
  Crest2Count  : 0,                                                                            
  crestRunning   : false,    
  Crestinterval        : 5,        
  ThroneDeleteItems    :    false,
  ThroneDeleteLevel    :    0,
  throneSaveNum    :    10,
  throneDeletedNum : 0,
  RangeSaveModeSetting : 0,
  Opacity : 0.9,
  language : 'en',
  curMarchTab : "transport",
  BreakingNews : 0,
  BreakingNewsV : false,
  ScripterTab : false,
  KMagicBox : false,
  filter : false,
  mklag  :  false,
  amain  :  false,
  smain  :  0,
  MAP_DELAY :  4000,
  fchar: "Null",
  toprank:  0,
  botrank:  0,
  plog:  true,
  raidbtns: false,
  transbtns: false,
  reassgnbtns: false,
  dfbtns: false,
  crestbtns: false,
  Farmbtns: false,
  SaveState: {},
  CrestSlots: 0,
  colorCityTabs: true,
  ThroneHUD: false,
  WWclick: false,
  loginReward: false,
  CrestRand: false,
  GESeverytenmin:0,
  GESeveryhour:0,
  GESeveryday:0,
};
//unsafeWindow.pt_Options=Options;

var GlobalOptions = {
  pbWatchdog   : false,
  pbWideScreen : true,
  pbWideScreenStyle : 'normal',
  autoPublishGamePopups : false,
  autoCancelGamePopups : false,
  autoPublishPrivacySetting : 80,
  pbupdate : true,
  pbupdatebeta : 0,
  scriptdate : 0,
  version : 0,
  pbNoMoreKabam : false,
  escapeurl : null,
};

var CrestOptions = {
  Running      :  false,
  curRound     :  1,
  CrestCity    :  0,
  RoundOne     :  false,
  RoundTwo     :  true,
  lastRoundOne    :  0,
  lastRoundTwo    :  0,
  X            :  0,
  Y            :  0,
  R1ST         :  0,
  R1MM         :  0,
  R1Scout      :  0,
  R1Pike    :  0,
  R1Sword      :  0,
  R1Arch    :  0,
  R1LC         :  0,
  R1HC         :  0,
  R1SW         :  0,
  R1Ball    :  0,
  R1Ram        :  0,
  R1Cat        :  0,
  R2ST         :  0,
  R2MM         :  0,
  R2Scout      :  0,
  R2Pike    :  0,
  R2Sword      :  0,
  R2Arch    :  0,
  R2LC         :  0,
  R2HC         :  0,
  R2SW         :  0,
  R2Ball    :  0,
  R2Ram        :  0,
  R2Cat        :  0,
  isWild    :  true,
};
var GiftDB = {
  people :  {},
  giftitems :  [],
  agift  :  false,
  adgift :  false,
};

var CrestData = new Array();

   function CrestFunc (Arr) {
   
      if (Arr == undefined)
         Arr = CrestOptions;

      this.Running      =     true;
      this.curRound     =  1,
      this.CrestCity       =  Arr.CrestCity;
      this.RoundOne     =  Arr.RoundOne;
      this.RoundTwo     =  true;
      this.lastRoundOne    =  0;
      this.lastRoundTwo    =  0;
      this.X            =  Arr.X;
      this.Y            =  Arr.Y;
      this.R1ST         =  Arr.R1ST;
      this.R1MM         =  Arr.R1MM;
      this.R1Scout      =  Arr.R1Scout;
      this.R1Pike       =  Arr.R1Pike;
      this.R1Sword      =  Arr.R1Sword;
      this.R1Arch       =  Arr.R1Arch;
      this.R1LC         =  Arr.R1LC;
      this.R1HC         =  Arr.R1HC;
      this.R1SW         =  Arr.R1SW;
      this.R1Ball       =  Arr.R1Ball;
      this.R1Ram        =  Arr.R1Ram;
      this.R1Cat        =  Arr.R1Cat;
      this.R2ST         =  Arr.R2ST;
      this.R2MM         =  Arr.R2MM;
      this.R2Scout      =  Arr.R2Scout;
      this.R2Pike       =  Arr.R2Pike;
      this.R2Sword      =  Arr.R2Sword;
      this.R2Arch       =  Arr.R2Arch;
      this.R2LC         =  Arr.R2LC;
      this.R2HC         =  Arr.R2HC;
      this.R2SW         =  Arr.R2SW;
      this.R2Ball       =  Arr.R2Ball;
      this.R2Ram        =  Arr.R2Ram;
      this.R2Cat        =  Arr.R2Cat;
      this.isWild       =  Arr.isWild;
      
   };

var TrainOptions = {
  Running    : false,
  Troops     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Threshold  : {1:500,2:500,3:500,4:500,5:500,6:500,7:500,8:500},
  Max        : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Gamble     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Workers    : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Item       : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Keep       : {1:{Food:0,Wood:0,Stone:0,Ore:0},
                2:{Food:0,Wood:0,Stone:0,Ore:0},
            3:{Food:0,Wood:0,Stone:0,Ore:0},
            4:{Food:0,Wood:0,Stone:0,Ore:0},
            5:{Food:0,Wood:0,Stone:0,Ore:0},
            6:{Food:0,Wood:0,Stone:0,Ore:0},
            7:{Food:0,Wood:0,Stone:0,Ore:0},
            8:{Food:0,Wood:0,Stone:0,Ore:0}
            },
  Enabled    : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  SelectMax  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  Resource   : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true},
  UseIdlePop : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true},
  CraftingRunning : false,
  CraftIntervallMin : 3,
  CraftingActif : {3000:false,3001:false,3002:false,3003:false,3004:false,3005:false,3006:false,3007:false,3008:false,3009:false,3010:false,3011:false},
  CraftingNb : {3000:0,3001:0,3002:0,3003:0,3004:0,3005:0,3006:0,3007:0,3008:0,3009:0,3010:0,3011:0},
  tr  :  false,
  trset  :  0,
  actr:     false,
  actrset : 0,
  AsTroops     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  AsEnabled  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  AsSelectMax  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  AsMax        : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
};
var FarmOptions = {
   RallyClip: 0,
    Running: false,
    MinMight: 0,
    MaxMight: 999999999,
    Interval: 0,
    SendInterval: 10,
    MaxDistance: 20,
    Inactive:30,
   DeleteReports:false,
   Troops: {1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0},
   FarmNumber: {1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0},
    CityEnable: {1: true,2: true,3: true,4: true,5: true,6: true,7: t
 },
  
  barbing : function(){
         var t = Tabs.farm;
       var city = t.city;
       var u1 = FarmOptions.Troops[1];
       var u2 = FarmOptions.Troops[2];
       var u3 = FarmOptions.Troops[3];
       var u4 = FarmOptions.Troops[4];
       var u5 = FarmOptions.Troops[5];
       var u6 = FarmOptions.Troops[6];
       var u7 = FarmOptions.Troops[7];
       var u8 = FarmOptions.Troops[8];
       var u9 = FarmOptions.Troops[9];
       var u10 = FarmOptions.Troops[10];
       var u11 = FarmOptions.Troops[11];
       var u12 = FarmOptions.Troops[12];
       var now = new Date().getTime()/1000.0;
       now = now.toFixed(0);
       citynumber = Seed.cities[city-1][0];
       cityID = 'city' + citynumber;
       
       t.getAtkKnight(cityID);
       t.rallypointlevel = March.getTotalSlots(citynumber);
       var slots = March.getMarchSlots(citynumber);
       var element2 = 'pddataFarmarray'+(city-1);
       document.getElementById(element2).innerHTML =  'RP: (' + slots + '/' + t.rallypointlevel +')';
       
       if (!FarmOptions.CityEnable[city]) return;
		if (Number(Number(March.getTotalSlots(citynumber))-Number(slots)) <= Number(FarmOptions.RallyClip)) return;
		

       if (t.knt.toSource() == "[]") return;
        if (u1 > parseInt(Seed.units[cityID]['unt1']) || u2 > parseInt(Seed.units[cityID]['unt2']) || u3 > parseInt(Seed.units[cityID]['unt3']) || u4 > parseInt(Seed.units[cityID]['unt4']) || u5 > parseInt(Seed.units[cityID]['unt5']) || u6 > parseInt(Seed.units[cityID]['unt6']) || u7 > parseInt(Seed.units[cityID]['unt7']) || u8 > parseInt(Seed.units[cityID]['unt8']) || u9 > parseInt(Seed.units[cityID]['unt9']) || u10 > parseInt(Seed.units[cityID]['unt10']) || u11 > parseInt(Seed.units[cityID]['unt11']) || u12 > parseInt(Seed.units[cityID]['unt12'])) return;
        if (FarmOptions.FarmNumber[city]>=t.FarmArray[city].length) FarmOptions.FarmNumber[city]=0;

        var kid = t.knt[0].ID;


         var interval = 0;
         switch(FarmOptions.Interval){
                case "1":interval = 1;break;
                case "2":interval = 2;break;
                case "3":interval = 3;break;
                case "4":interval = 6;break;
                case "5":interval = 12;break;
                case "6":interval = 24;break;
        }
        
         var check=0;
         while (check == 0){
         check=1;
               for (i=1;i<=12;i++){
                      if (FarmOptions.Troops[i] > parseInt(Seed.units[cityID]['unt'+i])) check=0;
               }
           if (FarmOptions.Troops[1] == 0 && FarmOptions.Troops[2] == 0 && FarmOptions.Troops[3] == 0 && FarmOptions.Troops[4] == 0 && FarmOptions.Troops[5] == 0 && FarmOptions.Troops[6] == 0 && FarmOptions.Troops[7] == 0 && FarmOptions.Troops[8] == 0 && FarmOptions.Troops[9] == 0 &&FarmOptions.Troops[10] == 0 && FarmOptions.Troops[11] == 0 && FarmOptions.Troops[12] == 0) check=0;
           if (!t.FarmArray[city][FarmOptions.FarmNumber[city]]['enabled']) check=0;
               if (now < (parseInt(t.FarmArray[city][FarmOptions.FarmNumber[city]]['time']) + (3600 * interval))) check=0;
           if (check ==0) FarmOptions.FarmNumber[city]++;
           if (FarmOptions.FarmNumber[city]>=t.FarmArray[city].length) {
                   FarmOptions.FarmNumber[city]=0;
                    break;
            }
       }
           if (check == 0) return;
       

        var xcoord = t.FarmArray[city][FarmOptions.FarmNumber[city]]['x'];
        var ycoord = t.FarmArray[city][FarmOptions.FarmNumber[city]]['y'];
        var uid = t.FarmArray[city][FarmOptions.FarmNumber[city]]['UserId'];
        saveFarmOptions();
        t.checkInactives(citynumber,city,FarmOptions.FarmNumber[city],xcoord,ycoord,kid,uid,u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12);
  },
  
  getnextCity: function(){
    var t = Tabs.farm;
    if (!FarmOptions.Running) return;
    //if(t.searchRunning) return;
    var city = t.city+1;
    if (city>Seed.cities.length){
        city=1;
    }
    t.city = city;
    t.barbing();
  },
  
  getAtkKnight : function(cityID){
     var t = Tabs.farm;
     t.knt = new Array();
       t.rallypointlevel = March.getRallypointLevel(cityID);
     for (k in Seed.knights[cityID]){
             if (Seed.knights[cityID][k]["knightStatus"] == 1 && Seed.leaders[cityID]["resourcefulnessKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["politicsKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["combatKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["intelligenceKnightId"] != Seed.knights[cityID][k]["knightId"]){
                 t.knt.push ({
                     Name:   Seed.knights[cityID][k]["knightName"],
                     Combat:    Seed.knights[cityID][k]["combat"],
                     ID:        Seed.knights[cityID][k]["knightId"],
                 });
             }
     }
     t.knt = t.knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
  },
  
  doBarb: function(cityID,counter,number,xcoord,ycoord,kid,u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12){
          var t = Tabs.farm;
          var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
          params.cid=cityID;
          params.type=4;
        params.kid=kid;
          params.xcoord = xcoord;
          params.ycoord = ycoord;
          if (u1>0) params.u1=u1;
          if (u2>0)params.u2=u2;
          if (u3>0)params.u3=u3;
          if (u4>0)params.u4=u4;
          if (u5>0)params.u5=u5;
          if (u6>0)params.u6=u6;
          if (u7>0)params.u7=u7;
          if (u8>0)params.u8=u8;
          if (u9>0)params.u9=u9;
          if (u10>0)params.u10=u10;
          if (u11>0)params.u11=u11;
          if (u12>0)params.u12=u12;
          params.gold =0;
      params.r1=0;
      params.r2=0,
      params.r3=0;
      params.r4=0;
      params.r5=0;
      
          new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                   method: "post",
                   parameters: params,
                   loading: true,
                   onSuccess: function (transport) {
                   var rslt = eval("(" + transport.responseText + ")");
                 if (rslt.ok) {
                   var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                   var ut = unsafeWindow.unixtime();
            var unitsarr = [];
            for (j in unsafeWindow.unitcost)
               unitsarr.push(0);
            for(i = 0; i <= unitsarr.length; i++)
               if(params["u"+i])
                       unitsarr[i] = params["u"+i];
                   var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                   var currentcityid = params.cid;
                   unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                 if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                 var slots=0;
                 for(var k in Seed.queue_atkp['city'+cityID]) slots++;
                 if(Seed.queue_atkp['city'+cityID].toSource() == "[]") slots = 0;
                 var element1 = 'pddataFarmarray'+(counter-1);
                 document.getElementById(element1).innerHTML =  'RP: (' + slots + '/' + t.rallypointlevel +')';
                   var now = new Date().getTime()/1000.0;
                   now = now.toFixed(0);
                   t.FarmArray[counter][number]['time'] = now;
                 t.FarmArray[counter][number]['attacked']++;
                 FarmOptions.FarmMarches.push ({city:counter,cityId:cityID,marchId:rslt.marchId,number:number});
                 FarmOptions.FarmNumber[counter]++;
                 FarmOptions.Attacks++;
                 saveFarmOptions();
                 document.getElementById('FarmCheck').innerHTML = "Attacks: " + FarmOptions.Attacks + " - Checks:" + FarmOptions.Checks;
                 for (i=0;i<t.helpArray[counter].length;i++){
                        for (j=0;j<t.FarmArray[counter].length;j++){
                             if (parseInt(t.FarmArray[counter][j]['x']) == parseInt(t.helpArray[counter][i]['x']) && parseInt(t.FarmArray[counter][j]['y']) == parseInt(t.helpArray[counter][i]['y'])){
                                       t.helpArray[counter][i]['time'] = t.FarmArray[counter][j]['time'];
                                       t.helpArray[counter][i]['attacked'] = t.FarmArray[counter][j]['attacked'];
                                   }    
                        }
                }
                GM_setValue('Farms_' + Seed.player['name'] + '_city_' + counter + '_' + getServerId(), JSON2.stringify(t.helpArray[counter]));
               }
                   },
                   onFailure: function () {}
           });
       saveFarmOptions();
  },

  clickedSearch : function (){
    var t = Tabs.farm;
    t.opt.searchType = 0;
    t.opt.maxDistance = FarmOptions.MaxDistance;
    t.opt.searchShape = 'circle';
    t.mapDat = [];
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX + t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY + t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;
    var xxx = t.MapAjax.normalize(t.curX);
    var yyy = t.MapAjax.normalize(t.curY);
    var element = 'pddataFarm'+(t.lookup-1);
    document.getElementById(element).innerHTML = 'Searching at '+ xxx +','+ yyy;
   
    setTimeout (function(){t.MapAjax.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
  },
  
  mapCallback : function (left, top, width, rslt){
    var t = Tabs.farm;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      setTimeout (function(){t.MapAjax.request (left, top, width, t.mapCallback)}, MAP_DELAY);
      return;
    }
    map = rslt.data;
    for (k in map){
      var dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      var CityCheck = true;
      var who = "u" + map[k].tileUserId;
      var AllianceName = "";
       if (map[k].cityName == null && map[k].misted ==false) CityCheck = false;
     if (t.isMyself(map[k].tileUserId)) CityCheck = false;
     if (map[k].tileType== 51 && CityCheck) {
            var Diplomacy = "neutral";
            for (DipStatus in t.DipArray) {
                var AllianceId = 0;
                if (rslt.userInfo[who] != undefined) AllianceId = "a" + rslt.userInfo[who].a;                
                for (alliance in Seed.allianceDiplomacies[t.DipArray[DipStatus]]) if (Seed.allianceDiplomacies[t.DipArray[DipStatus]][AllianceId] != undefined) Diplomacy = t.DipArray[DipStatus];
            }
            if (rslt.allianceNames[AllianceId] != undefined) AllianceName = rslt.allianceNames[AllianceId];
            if (Diplomacy == "neutral" && AllianceName =="") Diplomacy = "unallied";
            t.mapDat.push ({time:0,empty:0,lost:false,enabled:'true',attacked:0,DaysInactive:"?",LastCheck:0,Diplomacy:Diplomacy,UserId:map[k].tileUserId,AllianceName:AllianceName,x:map[k].xCoord,y:map[k].yCoord,dist:dist,level:map[k].tileLevel,PlayerName:rslt.userInfo[who].n,cityName:map[k].cityName,might:rslt.userInfo[who].m,cityNumber:map[k].cityNum});
      }
    }
    t.tilesSearched += (15*15);

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        var element = 'pdtotalFarm'+(t.lookup-1);
        document.getElementById(element).innerHTML = 'Found: ' + t.mapDat.length;
        var element = 'pddataFarm'+(t.lookup-1);
        document.getElementById(element).innerHTML = "";
        GM_setValue('Farms_' + Seed.player['name'] + '_city_' + t.lookup + '_' + getServerId(), JSON2.stringify(t.mapDat));
        t.searchRunning = false;
        for (y=1;y<=8;y++) FarmOptions.FarmNumber[y] = 0;
        t.checkFarmData();
        return;
      }
    }
    var x = t.MapAjax.normalize(t.curX);
    var y = t.MapAjax.normalize(t.curY);
    var element = 'pddataFarm'+(t.lookup-1);
    document.getElementById(element).innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){t.MapAjax.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },
  
  stopSearch : function (msg){
    var t = Tabs.farm;
    var element = 'pddataFarm'+(t.lookup-1);
        document.getElementById(element).innerHTML = msg;
    t.searchRunning = false;
  },
  
  hide : function (){
  
  },

  show : function (){
  
  },

};

/********* demist end ******/
pbStartup ();