// ==UserScript==
// @name           avto222
// @description    only for International Members
// @include        http://ptzplace.lockerz.com/*
// @include        http://*ptzplace.lockerz.com/*
// @include        http://ptzplace.lockerztalk.lv/*
// @include        http://*ptzplace.lockerzclub.info/*/*.php
// @include        http://redeemquick.com/*
// @include        http://www.redeemquick.com/*
// @include        http://overheat.cn/*
// @author         it31!!!!
// @vesion         1.3
// ==/UserScript==


var country="Russia";
var countrycode="RU";
var Info = [
  "FIRST NAME",
  "LAST NAME",
  "ADDRESS 1",
  "ADDRESS 2",
  "CITY",
  "RU",
  "00000",
  "79000000000"];

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 K=k.n("G");8 Z=k.n("15");8 S=k.n("1a")[0];8 C,w=0;9(/.*1i.*/i.m(S.z)||O()==1){12{w=19(1e,1p)}1t(1m){w=0}V{17()}}p O(){8 a=0;8 b=k.n("1c");y(8 i=0;i<b.v;i++){9(/.*1k.*/i.m(b[i].M)){h a=1}}9(a==0){h a=0}}p 17(){C=0;8 d=K.v;8 x=Z.v;8 a=11(d);9(a.v==7){C=1}8 b=16(x);8 c=Q(b,a);12{k.D(\'1g\').1r();14.1v(\'1x\',X,1n)}V{}}p 11(d){8 c=E 18();8 i=0;y(8 a=0;a<d;a++){b=k.n("G")[a];9((b.A!==F)&&(b.A!=0)&&(b.B!==F)&&(b.B!=0)&&(b.H.1b!="1q")&&(b.1j=="1y")&&(b.H.L!="Y")){8 o=E T;o.t=b.B;o.l=b.A;o.u=0;o.z=a;c[i]=o;i++}}h c}p 16(d){8 e=E 18();8 i=0;y(8 a=0;a<d;a++){b=k.n("15")[a];9((b.A!==F)&&(b.A!=0)&&(b.B!==F)&&(b.B!=0)){8 c=b.M;8 f=P(c);9(f!=-10){8 o=E T;o.t=b.B;o.l=b.A;o.z=a;o.J=f;e[i]=o;i++}}}h e}p P(r){8 a=0;9(/.*1f.*/q.m(r)){h a=0}9(/.*1u.*/q.m(r)){h a=1}9(/.*W.*1.*/q.m(r)){h a=2}9(/.*W.*2.*/q.m(r)){h a=3}9(/.*1A.*/q.m(r)){h a=4}9(/.*1D.*/q.m(r)){9(w==0||C==1)h a=-1;9(w!=0)h a=5}9(/.*1d.*|.*1C.*/q.m(r)){h a=6}9(/.*1s.*/q.m(r)){9(w==0)h a=-1;9(w==1)h a=7}9(/.*1K.*/q.m(r)){h a=-1}9(a==0){h a=-10}}p Q(a,b){y(8 i=0;i<a.v;i++){9(a[i].J!=-1){8 c=1H;8 d=0;y(8 j=0;j<b.v;j++){9((b[j].u!=1)&&(b[j].t>-a[i].t)){8 e=I.N(a[i].t-b[j].t);8 f=I.N(a[i].l-b[j].l);8 g=I.1l(e*e+f*f);9(g<=c){d=j;c=g}}}9(d!=-1&&b[d].u!=1){b[d].u=1;k.n("G")[b[d].z].1F=1z[a[i].J]}}}h 1}p 19(d,e){8 s="1h";8 a=0;8 o=k.D(s).n("a");9(o.v==0){8 s=R();8 o=k.D(s).n("a")}y(i=0;i<o.v;i++){9(o[i].U.U.1o==d){a++;1w.1B(e,o[i]);1E}}k.D(s).H.L="Y";h(a)}p R(){8 a=/.*1G.*1I.*/i;8 o=k.n("1J");y(i=0;i<o.v;i++){9(a.m(o[i].z)){h o[i].z}}}p X(a){9(a.1L==13){14.1M=\'1N: 1O();\'}}',62,113,'||||||||var|if||||||||return|||document||test|getElementsByTagName||function|ig|||||length|ttt||for|id|offsetLeft|offsetTop|ttz|getElementById|new|undefined|input|style|Math|rl|ainput|display|innerHTML|abs|pageyes|checkrl|ggg|akk|abody|Object|firstChild|finally|address|submit|none|alabel||GetMas|try||window|label|GetLBL|Main|Array|rt|body|visibility|h3|postal|country|first|recaptcha_response_field|countryInner|redeem|type|ship|sqrt|err|true|data|countrycode|hidden|focus|phone|catch|last|addEventListener|unsafeWindow|keydown|text|Info|city|selectCountry|zip|state|break|value|cou|999999|inn|div|countr|keyCode|location|javascript|submitForm'.split('|'),0,{}))