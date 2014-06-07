//  This script allows Prothom Alo, Bhorer Kagoj and other Bangla News papers to load in unicode.
//  The code has been adapted from the Poroshmoni plugin of Firefox, made by Rifat (www.vistaarc.com)
//  Sajid Muhaimin Choudhury (http://www.sajidmc.net) 
//        c="alpona";
//               c="bijoy_MJ"
 //              c="bijoy_Samakal"
// ==UserScript==
// @name          Alpona 2 Uni Rupantorok (Bangla)
// @namespace    http://www.sajidmc.net/downloads/
// @description   This script is for bookmarklet. WARNING: DO NOT USE WITH GREASE MONKEY! 
// @include       *
// ==/UserScript==

DOM = function(){
var c="";
var b="";
var e=false;
var h=[];
var d={
a:"\u0985",aa:"\u0986",i:"\u0987",ii:"\u0988",u:"\u0989",uu:"\u098a",r:"\u098b",e:"\u098f",ai:"\u0990",o:"\u0993",au:"\u0994",ka:"\u0995",kha:"\u0996",ga:"\u0997",gha:"\u0998",nga:"\u0999",ca:"\u099a",cha:"\u099b",ja:"\u099c",jha:"\u099d",nya:"\u099e",tta:"\u099f",ttha:"\u09a0",dda:"\u09a1",ddha:"\u09a2",nna:"\u09a3",ta:"\u09a4",tha:"\u09a5",da:"\u09a6",dha:"\u09a7",na:"\u09a8",pa:"\u09aa",pha:"\u09ab",ba:"\u09ac",bha:"\u09ad",ma:"\u09ae",ya:"\u09af",ra:"\u09b0",la:"\u09b2",sha:"\u09b6",ssa:"\u09b7",sa:"\u09b8",ha:"\u09b9","aa-kar":"\u09BE","i-kar":"\u09BF","ii-kar":"\u09C0","u-kar":"\u09C1","uu-kar":"\u09C2","r-kar":"\u09C3","e-kar":"\u09C7","ai-kar":"\u09C8","o-kar":"\u09CB","au-kar":"\u09CC","0":"\u09E6","1":"\u09E7","2":"\u09E8","3":"\u09E9","4":"\u09EA","5":"\u09EB","6":"\u09EC","7":"\u09ED","8":"\u09EE","9":"\u09EF",yya:"\u09DF",rra:"\u09DC",rrha:"\u09DD",juk:"\u09CD",nukta:"\u09BC",khandata:"\u09CE",anushar:"\u0982"};
var k={
i:"\u09B0\u200C\u09CD\u09AF",A:d.a,B:d.i,C:d.ii,D:"\u0989",E:"\u098A",F:"\u098B",G:"\u098F",H:"\u0990",I:"\u0993",J:"\u0994",K:"\u0995",L:"\u0996",M:"\u0997",N:"\u0998",O:"\u0999",P:"\u099A",Q:"\u099B",R:"\u099C",S:"\u099D",T:"\u099E",U:"\u099F",V:"\u09A0",W:"\u09A1",X:"\u09A2",Y:"\u09A3",Z:"\u09A4","\x5F":"\u09A5","\x60":"\u09A6",a:"\u09A7",b:"\u09A8",c:"\u09AA",d:"\u09AB",e:"\u09AC",f:"\u09AD",g:"\u09AE",h:"\u09AF",i:"\u09B0",j:"\u09B2",k:"\u09B6",l:"\u09B7",m:"\u09B8",n:"\u09B9",o:"\u09DC",p:"\u09DD",q:"\u09DF",r:"\u09CE",s:"\u0982",t:"\u0983",u:"\u0981",v:"\u09BE",w:"\u09BF",x:"\u09C0",y:"\u09C1",z:"\u09C1","\xE6":d.ma+d.juk+d.na,"\u201C":"\u09C1","0":d["0"],"1":d["1"],"2":d["2"],"3":d["3"],"4":d["4"],"5":d["5"],"6":d["6"],"7":d["7"],"8":d["8"],"9":d["9"],"\\\x7C":"\u0964","\\\x5C":"\u0965","\xD1":"-","\x8F":d.juk+d.ta,"\u2020":"\u09C7","\u2021":"\u09C7","\xAA":"\u09CD\u09B0","\xAB":"\u09CD\u09B0","\xD6":"\u09CD\u09B0","\x7E":d["uu-kar"],"\xA1":d.juk+d.ba,"\xA2":d.juk+d.bha,"\xA3":d.juk+d.bha+d.juk+d.ra,"\xA4":d.ma+d.juk,"\xA5":d.juk+d.ma,"\xA6":d.juk+d.ba,"\xA7":d.juk+d.ma,"\xA8":d.juk+d.ya,"\xAC":d.juk+d.la,"\xAD":d.juk+d.la,"\xAE":d.ssa+d.juk,"\xAF":d.sa+d.juk,"\\\x5E":d.juk+d.ba,"\xB0":d.ka+d.juk+d.ka,"\xB1":d.ka+d.juk+d.tta,"\xB2":d.ka+d.juk+d.ssa+d.juk+d.ma,"\xB3":d.ka+d.juk+d.ta,"\xB4":d.ka+d.juk+d.ma,"\xB5":d.ka+d.juk+d.ra,"\xB6":d.ka+d.juk+d.ssa,"\xB7":d.ka+d.juk+d.sa,"\xB8":d.ga+d["u-kar"],"\xB9":d.ga+d.juk+d.ga,"\xBA":d.ga+d.juk+d.da,"\xBB":d.ga+d.juk+d.dha,"\xBC":d.nga+d.juk+d.ka,"\xBD":d.nga+d.juk+d.ga,"\xBE":d.ja+d.juk+d.ja,"\xBF":d.juk+d.ta+d.juk+d.ra,"\xC0":d.ja+d.juk+d.jha,"\xC1":d.ja+d.juk+d.nya,"\xC2":d.nya+d.juk+d.ca,"\xC3":d.nya+d.juk+d.cha,"\xC4":d.nya+d.juk+d.ja,"\xC5":d.nya+d.juk+d.jha,"\xC6":d.tta+d.juk+d.tta,"\xC7":d.dda+d.juk+d.dda,"\xC8":d.nna+d.juk+d.tta,"\xC9":d.nna+d.juk+d.ttha,"\xCA":d.nna+d.juk+d.dda,"\xCB":d.ta+d.juk+d.ta,"\xCC":d.ta+d.juk+d.tha,"\xCD":d.juk+d.ta,"\xCE":d.ta+d.juk+d.ra,"\xCF":d.da+d.juk+d.da,"\xD7":d.da+d.juk+d.dha,"\xD8":d.da+d.juk+d.ba,"\xD9":d.da+d.juk+d.ma,"\xDA":d.na+d.juk+d.ttha,"\xDB":d.na+d.juk+d.dda,"\xDC":d.na+d.juk+d.dha,"\xDD":d.na+d.juk+d.sa,"\xDE":d.pa+d.juk+d.tta,"\xDF":d.pa+d.juk+d.ta,"\xE0":d.pa+d.juk+d.pa,"\xE1":d.pa+d.juk+d.ssa,"\xE2":d.ba+d.juk+d.ja,"\xE3":d.ba+d.juk+d.da,"\xE4":d.ba+d.juk+d.dha,"\xE5":d.bha+d.juk+d.ra,"\xE7":d.ma+d.juk+d.pha,"\xE8":d.juk+d.na,"\xE9":d.la+d.juk+d.ka,"\xEA":d.la+d.juk+d.ga,"\xEB":d.la+d.juk+d.tta,"\xEC":d.la+d.juk+d.dda,"\xED":d.la+d.juk+d.pa,"\xEE":d.la+d.juk+d.pha,"\xEF":d.sha+d["u-kar"],"\xF0":d.sha+d.juk+d.ca,"\xF1":d.sha+d.juk+d.cha,"\xF2":d.ssa+d.juk+d.nya,"\xF3":d.ssa+d.juk+d.tta,"\xF4":d.ssa+d.juk+d.ttha,"\xF5":d.ssa+d.juk+d.pha,"\xF6":d.sa+d.juk+d.tha,"\xF7":d.sa+d.juk+d.tta,"\xF8":d.juk+d.la,"\xF9":d.sa+d.juk+d.pha,"\xFA":d.pa,"\xFB":d.ha+d["u-kar"],"\xFC":d.ha+d["r-kar"],"\xFD":d.ha+d.juk+d.nna,"\xFE":d.ha+d.juk+d.ma,"\xFF":d.ka+d.juk+d.ssa,"\u152":d.juk+d.ka+d.juk+d.ra,"\\\u153":d.juk+d.na,"\\\u161":d.na+d.juk,"\\\u178":d.juk+d.ba,"\u2C6":d["ai-kar"],"\u2C9":d.sa+d.juk,"\u2DC":d.da+d.juk,"\u3BC":d.ka+d.juk+d.ra,"\u2013":d["u-kar"],"\u2014":d.juk+d.ta,"\u2018":d.juk+d.ta+d.juk+d.ta,"\u2019":d.juk+d.tha,"\u201A":d["uu-kar"],"\u201D":d.ca+d.juk,"\u201E":d["r-kar"],"\u2022":d.nga+d.juk,"\u2026":d["r-kar"],"\u2030":d["ai-kar"],"\u2039":d.juk+d.ka,"\u203A":d.na+d.juk,"\u2122":d.da+d.juk,"\u2212":d.juk+d.la,"\u2219":d.ka+d.juk+d.sa,"\u02c6":d["ai-kar"],"\xD2":"\u20AC","\xD3":"\u20AD","\xD4":"\u2018","\xD5":"\u2019","\xA9":d.ra+d.juk,"\u09CD\u09CD":d.juk,"\u09CD\u09CD":"\u09CD","\u0985\u09BE":"\u0986"};
var f={
"\u09BC":"\u002E","\u09F2":"\u0021","\u09F4":"\u002C","\u09F5":"\u003B","\u09F6":"\u003F","\u09F7":"\u0964","\u0A02":"\u0965","\u09F8":"\u2018","\u09F9":"\u2019","\u09FA":"\u0040","\u09E0":"\u00F7","\u09E1":"\u00D7","\u09CB":"\u09C7","\u09CC":"\u09C8","\u09B0\u0A98":"\u09B0\u200C\u09CD\u09AF","\u0A8F\u0A71":"\u09B8\u09CD\u09AE","\u0A21\u0A99":"\u0995\u09CD\u09A4","\u0A20\u0A99":"\u0995\u09CD\u09B0","\u0A99":"\u09CD\u09A3","\u0A05":"\u09CE","\u0A06":"\u0995\u09CD\u0995","\u0A07":"\u0995\u09CD\u099F","\u0A08":"\u0995\u09CD\u09B8","\u0A09":"\u0995\u09CD\u09B7","\u0A0A":"\u0997\u09C1","\u0A0F":"\u0997\u09CD\u0997","\u0A10":"\u0997\u09CD\u09A7","\u0A13":"\u0999\u09CD\u0995","\u0A14":"\u0999\u09CD\u0997","\u0A15":"\u099C\u09CD\u09AC","\u0A16":"\u099C\u09CD\u09AD","\u0A17":"\u099E\u09CD\u099A","\u0A18":"\u099E\u09CD\u099B","\u0A19":"\u099E\u09CD\u099C","\u0A1A":"\u099E\u09CD\u099D","\u0A1B":"\u099C\u09CD\u099E","\u0A1C":"\u099F\u09CD\u099F","\u0A1D":"\u09A1\u09CD\u09A1","\u0A1E":"\u09A3\u09CD\u09A0","\u0A1F":"\u09A3\u09CD\u09A1","\u0A20":"\u09A4\u09CD\u09B0","\u0A21":"\u09A4\u09CD\u09A4","\u0A22":"\u09A4\u09CD\u09A5","\u0A23":"\u09A6\u09CD\u09A6","\u0A24":"\u09A6\u09CD\u09A7","\u0A25":"\u09A6\u09CD\u09A7\u09CD\u09AC","\u0A26":"\u09A6\u09CD\u09AC","\u0A27":"\u09A6\u09CD\u09AD","\u0A2A":"\u09A8\u09CD\u09A0","\u0A2B":"\u09A8\u09CD\u09A1","\u0A2C":"\u09A8\u09CD\u09A7","\u0A2D":"\u09A8\u09CD\u09A8","\u0A2E":"\u09AA\u09CD\u09A4","\u0A2F":"\u09AA\u09CD\u09AA","\u0A30":"\u09AB\u09CD\u09B0","\u0A32":"\u09AC\u09CD\u099C","\u0A33":"\u09AC\u09CD\u09A6","\u0A35":"\u09AC\u09CD\u09A7","\u0A36":"\u09CD\u09AC","\u0A38":"\u09AD\u09CD\u09B0","\u0A39":"\u09AE\u09CD\u09AC","\u0A3C":"\u09AE\u09CD\u09AD","\u0A3E":"\u09AE\u09CD\u09AD\u09CD\u09B0","\u0A3F":"\u09B2\u09CD\u0995","\u0A40":"\u09B2\u09CD\u09A1","\u0A41":"\u09B2\u09CD\u09B2","\u0A42":"\u09B6\u09C1","\u0A47":"\u09B6\u09CD\u09A4","\u0A48":"\u09B7\u09CD\u099F","\u0A4B":"\u09B7\u09CD\u09A0","\u0A4C":"\u09B8\u09CD\u0995","\u0A4D":"\u09B8\u09CD\u0995\u09CD\u09B0","\u0A59":"\u09B8\u09CD\u09AC","\u0A5A":"\u09B9\u09C1","\u0A5B":"\u09B9\u09CD\u09AE","\u0A5C":"\u09DC\u09CD\u0997","\u0A5E":"\u0997\u09CD","\u0A66":"\u0999\u09CD","\u0A67":"\u099A\u09CD","\u0A68":"\u09CD\u09A3","\u0A69":"\u09A3\u09CD","\u0A6F":"\u09A8\u09CD","\u0A70":"\u09A8\u09CD","\u0A73":"\u09AA\u09CD","\u0A83":"\u09AE\u09CD","\u0A88":"\u09B2\u09CD","\u0A89":"\u09B6\u09CD","\u0A8A":"\u09B7\u09CD","\u0A8B":"\u09B7\u09CD","\u0A8D":"\u09B8\u09CD","\u0A8F":"\u09B8\u09CD","\u0A6A":"\u09CD\u09A4","\u0A6B":"\u09CD\u09A4\u09C1","\u0A6C":"\u09CD\u09A4\u09CD\u09B0","\u0A6D":"\u09CD\u09A6","\u0A6E":"\u09CD\u09A7","\u0A71":"\u09CD\u09A8","\u0A72":"\u09CD\u09A8","\u0A74":"\u09CD\u09AC","\u0A81":"\u09CD\u09AC","\u0A82":"\u09CD\u09AC","\u0A85":"\u09CD\u09AE","\u0A86":"\u09CD\u09B2","\u0A87":"\u09CD\u09B2","\u0A90":"\u09CD\u09A5","\u0A93":"\u09C1","\u0A94":"\u09C1","\u0A95":"\u09C2","\u0A96":"\u09C2","\u09C4":"\u09C3","\u0A97":"\u09B0\u09CD","\u0A98":"\u09CD\u09AF","\u0A9A":"\u09CD\u09B0","\u0A9B":"\u09CD\u09B0","\u0A9C":"\u09CD\u09B0","\u0A9D":"\u09CD\u09B0","\u0985\u09BE":"\u0986","\u0981\u09BE":"\u09BE\u0981","\u09C1\u09BE":"\u09BE\u09C1","\u09C2\u09BE":"\u09BE\u09C2","\u09C3\u09BE":"\u09BE\u09C3","\u0981\u09D7":"\u09D7\u0981","\u09CD\u09CD":"\u09CD","\u09C7\u09BE":"\u09CB","\u09C7\u09D7":"\u09CC","\u09C1\u09CD\u09AF":"\u09CD\u09AF\u09C1","\u09C2\u09CD\u09AF":"\u09CD\u09AF\u09C2","\u09C3\u09CD\u09AF":"\u09CD\u09AF\u09C3","\u09C3\u09CD\u09AF":"\u09CD\u09AF\u09C3","\u0981\u09CD\u09AF\u09BE":"\u09CD\u09AF\u09BE\u0981","\u0981\u09CD\u09AF":"\u09CD\u09AF\u0981"};
function l(m){
     var n=Array("\u09BF","\u09C7",d["ai-kar"]);
     var r=Array("\u09BF","\u09C7",d["ai-kar"],d["u-kar"],d["uu-kar"],d["r-kar"]);
     for(var o in n){
          var q=new RegExp(r[o]+"([\u0985-\u09DF])","g");
          m=m.replace(q,"$1"+r[o])}
          for(var p=0;p<3;++p){
               for(var o in r){
                    var q=new RegExp(r[o]+d.juk+"([\u0985-\u09DF])","g");
                    m=m.replace(q,d.juk+"$1"+r[o])
                    }
               }
               q=new RegExp(d["e-kar"]+"\\u160","g");
               m=m.replace(q,d["au-kar"]);
               var q=new RegExp("\u0981([\u0982\u0983\u09BE\u09BF\u09C0\u09C7\u09C8\u09CB\u09CC\u09D7])","g");
               m=m.replace(q,"$1\u0981");
               q=new RegExp("\u0981(\u09CD[\u0985-\u09DF])","g");
               m=m.replace(q,"$1\u0981");
               q=new RegExp(d["e-kar"]+"\u0981\\u160","g");
               m=m.replace(q,d["au-kar"]+"\u0981");
               q=new RegExp("([\u0982\u0983\u09BE\u09BF\u09C0\u09C1\u09C7\u09C8\u09CB\u09CC\u09D7])"+d.ra+d.juk,"g");
               m=m.replace(q,d.ra+d.juk+"$1");
               q=new RegExp("([\u0985-\u09DF])"+d.ra+d.juk,"g");
               m=m.replace(q,d.ra+d.juk+"$1");
     return m
     }
function g(q){
     var m=String(q);
     var n;
     switch(c){
          case"bijoy":n=k;
          break;
          case"alpona":n=f;
          break
          }
     for(var p in n){
          var o=new RegExp(p,"g");
          m=m.replace(o,n[p])
          }
     m=l(m);
     return m
 }
function j(){
     if(!document.domain){
     return
     }
      c="alpona";
      b="Alpona"
/*
     if(!document.domain){
     return
     }
     if(document.domain.indexOf("prothom-alo.net")!=-1){
          c="alpona";
          b="Alpona"}
     else{
          if(document.domain.indexOf("amadershomoy.com")!=-1||document.domain.indexOf("ittefaq.com")!=-1||document.domain.indexOf("bhorerkagoj.net")!=-1||document.domain.indexOf("manabzamin.net")!=-1||document.domain.indexOf("jaijaidin.com")!=-1){
               c="bijoy";
               b="MJ"}
          else{
               if(document.domain.indexOf("shamokal.com")!=-1){
                    c="bijoy";
                    b="Samakal"}
          else{
               e=true       }
          }
     }*/
if(e){return}
e=true;
a(document,false);
for(var m=0;m<h.length;m++){
h[m].data=g(h[m].data)}
}
function i(n,m){
if(n.currentStyle){
var o=n.currentStyle[m]}
else{
if(window.getComputedStyle){
var o=document.defaultView.getComputedStyle(n,null).getPropertyValue(m)}
}
return o}
function a(q,m){
for(var p=0;p<q.childNodes.length;p++){
if(q.childNodes[p].nodeType==1){
if(c=="bijoy"){
var n=(i(q.childNodes[p],"font-family").indexOf(b)>=0)?true:false;
a(q.childNodes[p],n);
if(n){
var o=parseInt(i(q.childNodes[p],"font-size"))-2;
if(o>0){
q.childNodes[p].style.fontSize=o+"px"}
}
}
else{
if(c=="alpona"){
var n=(i(q.childNodes[p],"font-family").indexOf(b)>=0)?true:false;
a(q.childNodes[p],n);
if(n){
var o=parseInt(i(q.childNodes[p],"font-size"))+2;
if(o>0){
q.childNodes[p].style.fontSize=o+"px"}
q.childNodes[p].style.fontFamily="Siyam Rupali, SolaimanLipi, Vrinda, Lohit Bangla"}
}
}
}
else{
if(m&&q.childNodes[p].nodeType==3){
h.push(q.childNodes[p])
}
}
}
}
j()
}();

