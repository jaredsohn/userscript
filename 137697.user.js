// ==UserScript==
// @name        WikiLayer
// @namespace   http://www.onekin.org/WikiLayer
// @description WikiLayer permits users to annotate Wikipedia in an integrated way. This implementation illustrates the proposed Web Augmentation architecture.
// @include     *
// @version     1
// ==/UserScript==
(function(){var ak=32768;var aT=0;var e=1;var bo=2;var bf=6;var N=true;var a5=32768;var bd=64;var bt=1024*8;var aX=2*ak;var X=3;var bs=258;var B=16;var U=8192;var g=13;if(U>a5){alert("error: zip_INBUFSIZ is too small")}if((ak<<1)>(1<<B)){alert("error: zip_WSIZE is too large")}if(g>B-1){alert("error: zip_HASH_BITS is too large")}if(g<8||bs!=258){alert("error: Code too clever")}var a1=U;var au=1<<g;var a6=au-1;var aS=ak-1;var S=0;var V=4096;var bq=bs+X+1;var z=ak-bq;var p=1;var by=15;var aL=7;var aA=29;var K=256;var P=256;var al=K+1+aA;var bn=30;var s=19;var bg=16;var aR=17;var bu=18;var bm=2*al+1;var aD=parseInt((g+X-1)/X);var aq;var bx,i;var L;var aZ=null;var a4,a3;var d;var bl;var c;var an;var y;var aj;var ap;var a7;var ai;var q;var Z;var aa;var aF;var bh;var O;var r;var x;var Y;var I;var aC;var k;var n;var F;var aU;var D;var l;var at;var af;var E;var j;var C;var bb;var f;var m;var aI;var bk;var W;var bp;var br;var az;var M;var a;var aw;var aW;var G;var w;var ad;var aQ;var be;var b;var bA=function(){this.fc=0;this.dl=0};var o=function(){this.dyn_tree=null;this.static_tree=null;this.extra_bits=null;this.extra_base=0;this.elems=0;this.max_length=0;this.max_code=0};var R=function(bF,bE,bH,bG){this.good_length=bF;this.max_lazy=bE;this.nice_length=bH;this.max_chain=bG};var bi=function(){this.next=null;this.len=0;this.ptr=new Array(bt);this.off=0};var aE=new Array(0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0);var u=new Array(0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13);var J=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7);var aG=new Array(16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15);var aP=new Array(new R(0,0,0,0),new R(4,4,8,4),new R(4,5,16,8),new R(4,6,32,32),new R(4,4,16,16),new R(8,16,32,32),new R(8,16,128,128),new R(8,32,128,256),new R(32,128,258,1024),new R(32,258,258,4096));var ab=function(bF){var bE;if(!bF){bF=bf}else{if(bF<1){bF=1}else{if(bF>9){bF=9}}}k=bF;L=false;x=false;if(aZ!=null){return}aq=bx=i=null;aZ=new Array(bt);bl=new Array(aX);c=new Array(a1);an=new Array(a5+bd);y=new Array(1<<B);aU=new Array(bm);for(bE=0;bE<bm;bE++){aU[bE]=new bA()}D=new Array(2*bn+1);for(bE=0;bE<2*bn+1;bE++){D[bE]=new bA()}l=new Array(al+2);for(bE=0;bE<al+2;bE++){l[bE]=new bA()}at=new Array(bn);for(bE=0;bE<bn;bE++){at[bE]=new bA()}af=new Array(2*s+1);for(bE=0;bE<2*s+1;bE++){af[bE]=new bA()}E=new o();j=new o();C=new o();bb=new Array(by+1);f=new Array(2*al+1);bk=new Array(2*al+1);W=new Array(bs-X+1);bp=new Array(512);br=new Array(aA);az=new Array(bn);M=new Array(parseInt(U/8))};var ay=function(){aq=bx=i=null;aZ=null;bl=null;c=null;an=null;y=null;aU=null;D=null;l=null;at=null;af=null;E=null;j=null;C=null;bb=null;f=null;bk=null;W=null;bp=null;br=null;az=null;M=null};var av=function(bE){bE.next=aq;aq=bE};var T=function(){var bE;if(aq!=null){bE=aq;aq=aq.next}else{bE=new bi()}bE.next=null;bE.len=bE.off=0;return bE};var ah=function(bE){return y[ak+bE]};var ag=function(bE,bF){return y[ak+bE]=bF};var Q=function(bE){aZ[a3+a4++]=bE;if(a3+a4==bt){h()}};var aN=function(bE){bE&=65535;if(a3+a4<bt-2){aZ[a3+a4++]=(bE&255);aZ[a3+a4++]=(bE>>>8)}else{Q(bE&255);Q(bE>>>8)}};var aB=function(){ai=((ai<<aD)^(bl[O+X-1]&255))&a6;q=ah(ai);y[O&aS]=q;ag(ai,O)};var bc=function(bF,bE){bv(bE[bF].fc,bE[bF].dl)};var aK=function(bE){return(bE<256?bp[bE]:bp[256+(bE>>7)])&255};var ae=function(bF,bG,bE){return bF[bG].fc<bF[bE].fc||(bF[bG].fc==bF[bE].fc&&bk[bG]<=bk[bE])};var ba=function(bH,bF,bG){var bE;for(bE=0;bE<bG&&b<be.length;bE++){bH[bF+bE]=be.charCodeAt(b++)&255}return bE};var bz=function(){var bE;for(bE=0;bE<au;bE++){y[ak+bE]=0}aC=aP[k].max_lazy;n=aP[k].good_length;if(!N){F=aP[k].nice_length}I=aP[k].max_chain;O=0;a7=0;Y=ba(bl,0,2*ak);if(Y<=0){x=true;Y=0;return}x=false;while(Y<bq&&!x){ac()}ai=0;for(bE=0;bE<X-1;bE++){ai=((ai<<aD)^(bl[bE]&255))&a6}};var a9=function(bJ){var bL=I;var bG=O;var bH;var bK;var bF=bh;var bI=(O>z?O-z:S);var bE=O+bs;var bN=bl[bG+bF-1];var bM=bl[bG+bF];if(bh>=n){bL>>=2}do{bH=bJ;if(bl[bH+bF]!=bM||bl[bH+bF-1]!=bN||bl[bH]!=bl[bG]||bl[++bH]!=bl[bG+1]){continue}bG+=2;bH++;do{}while(bl[++bG]==bl[++bH]&&bl[++bG]==bl[++bH]&&bl[++bG]==bl[++bH]&&bl[++bG]==bl[++bH]&&bl[++bG]==bl[++bH]&&bl[++bG]==bl[++bH]&&bl[++bG]==bl[++bH]&&bl[++bG]==bl[++bH]&&bG<bE);bK=bs-(bE-bG);bG=bE-bs;if(bK>bF){r=bJ;bF=bK;if(N){if(bK>=bs){break}}else{if(bK>=F){break}}bN=bl[bG+bF-1];bM=bl[bG+bF]}}while((bJ=y[bJ&aS])>bI&&--bL!=0);return bF};var ac=function(){var bG,bE;var bF=aX-Y-O;if(bF==-1){bF--}else{if(O>=ak+z){for(bG=0;bG<ak;bG++){bl[bG]=bl[bG+ak]}r-=ak;O-=ak;a7-=ak;for(bG=0;bG<au;bG++){bE=ah(bG);ag(bG,bE>=ak?bE-ak:S)}for(bG=0;bG<ak;bG++){bE=y[bG];y[bG]=(bE>=ak?bE-ak:S)}bF+=ak}}if(!x){bG=ba(bl,O+Y,bF);if(bG<=0){x=true}else{Y+=bG}}};var bw=function(){while(Y!=0&&bx==null){var bE;aB();if(q!=S&&O-q<=z){aF=a9(q);if(aF>Y){aF=Y}}if(aF>=X){bE=bj(O-r,aF-X);Y-=aF;if(aF<=aC){aF--;do{O++;aB()}while(--aF!=0);O++}else{O+=aF;aF=0;ai=bl[O]&255;ai=((ai<<aD)^(bl[O+1]&255))&a6}}else{bE=bj(0,bl[O]&255);Y--;O++}if(bE){t(0);a7=O}while(Y<bq&&!x){ac()}}};var aV=function(){while(Y!=0&&bx==null){aB();bh=aF;Z=r;aF=X-1;if(q!=S&&bh<aC&&O-q<=z){aF=a9(q);if(aF>Y){aF=Y}if(aF==X&&O-r>V){aF--}}if(bh>=X&&aF<=bh){var bE;bE=bj(O-1-Z,bh-X);Y-=bh-1;bh-=2;do{O++;aB()}while(--bh!=0);aa=0;aF=X-1;O++;if(bE){t(0);a7=O}}else{if(aa!=0){if(bj(0,bl[O-1]&255)){t(0);a7=O}O++;Y--}else{aa=1;O++;Y--}}while(Y<bq&&!x){ac()}}};var aJ=function(){if(x){return}aj=0;ap=0;aY();bz();bx=null;a4=0;a3=0;if(k<=3){bh=X-1;aF=0}else{aF=X-1;aa=0}d=false};var v=function(bH,bF,bE){var bG;if(!L){aJ();L=true;if(Y==0){d=true;return 0}}if((bG=bB(bH,bF,bE))==bE){return bE}if(d){return bG}if(k<=3){bw()}else{aV()}if(Y==0){if(aa!=0){bj(0,bl[O-1]&255)}t(1);d=true}return bG+bB(bH,bG+bF,bE-bG)};var bB=function(bK,bI,bF){var bJ,bG,bE;bJ=0;while(bx!=null&&bJ<bF){bG=bF-bJ;if(bG>bx.len){bG=bx.len}for(bE=0;bE<bG;bE++){bK[bI+bJ+bE]=bx.ptr[bx.off+bE]}bx.off+=bG;bx.len-=bG;bJ+=bG;if(bx.len==0){var bH;bH=bx;bx=bx.next;av(bH)}}if(bJ==bF){return bJ}if(a3<a4){bG=bF-bJ;if(bG>a4-a3){bG=a4-a3}for(bE=0;bE<bG;bE++){bK[bI+bJ+bE]=aZ[a3+bE]}a3+=bG;bJ+=bG;if(a4==a3){a4=a3=0}}return bJ};var aY=function(){var bI;var bG;var bF;var bE;var bH;if(at[0].dl!=0){return}E.dyn_tree=aU;E.static_tree=l;E.extra_bits=aE;E.extra_base=K+1;E.elems=al;E.max_length=by;E.max_code=0;j.dyn_tree=D;j.static_tree=at;j.extra_bits=u;j.extra_base=0;j.elems=bn;j.max_length=by;j.max_code=0;C.dyn_tree=af;C.static_tree=null;C.extra_bits=J;C.extra_base=0;C.elems=s;C.max_length=aL;C.max_code=0;bF=0;for(bE=0;bE<aA-1;bE++){br[bE]=bF;for(bI=0;bI<(1<<aE[bE]);bI++){W[bF++]=bE}}W[bF-1]=bE;bH=0;for(bE=0;bE<16;bE++){az[bE]=bH;for(bI=0;bI<(1<<u[bE]);bI++){bp[bH++]=bE}}bH>>=7;for(;bE<bn;bE++){az[bE]=bH<<7;for(bI=0;bI<(1<<(u[bE]-7));bI++){bp[256+bH++]=bE}}for(bG=0;bG<=by;bG++){bb[bG]=0}bI=0;while(bI<=143){l[bI++].dl=8;bb[8]++}while(bI<=255){l[bI++].dl=9;bb[9]++}while(bI<=279){l[bI++].dl=7;bb[7]++}while(bI<=287){l[bI++].dl=8;bb[8]++}a2(l,al+1);for(bI=0;bI<bn;bI++){at[bI].dl=5;at[bI].fc=ao(bI,5)}ar()};var ar=function(){var bE;for(bE=0;bE<al;bE++){aU[bE].fc=0}for(bE=0;bE<bn;bE++){D[bE].fc=0}for(bE=0;bE<s;bE++){af[bE].fc=0}aU[P].fc=1;ad=aQ=0;a=aw=aW=0;G=0;w=1};var H=function(bE,bG){var bF=f[bG];var bH=bG<<1;while(bH<=m){if(bH<m&&ae(bE,f[bH+1],f[bH])){bH++}if(ae(bE,bF,f[bH])){break}f[bG]=f[bH];bG=bH;bH<<=1}f[bG]=bF};var am=function(bM){var bR=bM.dyn_tree;var bH=bM.extra_bits;var bE=bM.extra_base;var bN=bM.max_code;var bP=bM.max_length;var bQ=bM.static_tree;var bK;var bF,bG;var bO;var bJ;var bL;var bI=0;for(bO=0;bO<=by;bO++){bb[bO]=0}bR[f[aI]].dl=0;for(bK=aI+1;bK<bm;bK++){bF=f[bK];bO=bR[bR[bF].dl].dl+1;if(bO>bP){bO=bP;bI++}bR[bF].dl=bO;if(bF>bN){continue}bb[bO]++;bJ=0;if(bF>=bE){bJ=bH[bF-bE]}bL=bR[bF].fc;ad+=bL*(bO+bJ);if(bQ!=null){aQ+=bL*(bQ[bF].dl+bJ)}}if(bI==0){return}do{bO=bP-1;while(bb[bO]==0){bO--}bb[bO]--;bb[bO+1]+=2;bb[bP]--;bI-=2}while(bI>0);for(bO=bP;bO!=0;bO--){bF=bb[bO];while(bF!=0){bG=f[--bK];if(bG>bN){continue}if(bR[bG].dl!=bO){ad+=(bO-bR[bG].dl)*bR[bG].fc;bR[bG].fc=bO}bF--}}};var a2=function(bF,bK){var bH=new Array(by+1);var bG=0;var bI;var bJ;for(bI=1;bI<=by;bI++){bG=((bG+bb[bI-1])<<1);bH[bI]=bG}for(bJ=0;bJ<=bK;bJ++){var bE=bF[bJ].dl;if(bE==0){continue}bF[bJ].fc=ao(bH[bE]++,bE)}};var a8=function(bJ){var bM=bJ.dyn_tree;var bL=bJ.static_tree;var bE=bJ.elems;var bF,bH;var bK=-1;var bG=bE;m=0;aI=bm;for(bF=0;bF<bE;bF++){if(bM[bF].fc!=0){f[++m]=bK=bF;bk[bF]=0}else{bM[bF].dl=0}}while(m<2){var bI=f[++m]=(bK<2?++bK:0);bM[bI].fc=1;bk[bI]=0;ad--;if(bL!=null){aQ-=bL[bI].dl}}bJ.max_code=bK;for(bF=m>>1;bF>=1;bF--){H(bM,bF)}do{bF=f[p];f[p]=f[m--];H(bM,p);bH=f[p];f[--aI]=bF;f[--aI]=bH;bM[bG].fc=bM[bF].fc+bM[bH].fc;if(bk[bF]>bk[bH]+1){bk[bG]=bk[bF]}else{bk[bG]=bk[bH]+1}bM[bF].dl=bM[bH].dl=bG;f[p]=bG++;H(bM,p)}while(m>=2);f[--aI]=f[p];am(bJ);a2(bM,bK)};var ax=function(bM,bL){var bF;var bJ=-1;var bE;var bH=bM[0].dl;var bI=0;var bG=7;var bK=4;if(bH==0){bG=138;bK=3}bM[bL+1].dl=65535;for(bF=0;bF<=bL;bF++){bE=bH;bH=bM[bF+1].dl;if(++bI<bG&&bE==bH){continue}else{if(bI<bK){af[bE].fc+=bI}else{if(bE!=0){if(bE!=bJ){af[bE].fc++}af[bg].fc++}else{if(bI<=10){af[aR].fc++}else{af[bu].fc++}}}}bI=0;bJ=bE;if(bH==0){bG=138;bK=3}else{if(bE==bH){bG=6;bK=3}else{bG=7;bK=4}}}};var aH=function(bM,bL){var bF;var bJ=-1;var bE;var bH=bM[0].dl;var bI=0;var bG=7;var bK=4;if(bH==0){bG=138;bK=3}for(bF=0;bF<=bL;bF++){bE=bH;bH=bM[bF+1].dl;if(++bI<bG&&bE==bH){continue}else{if(bI<bK){do{bc(bE,af)}while(--bI!=0)}else{if(bE!=0){if(bE!=bJ){bc(bE,af);bI--}bc(bg,af);bv(bI-3,2)}else{if(bI<=10){bc(aR,af);bv(bI-3,3)}else{bc(bu,af);bv(bI-11,7)}}}}bI=0;bJ=bE;if(bH==0){bG=138;bK=3}else{if(bE==bH){bG=6;bK=3}else{bG=7;bK=4}}}};var A=function(){var bE;ax(aU,E.max_code);ax(D,j.max_code);a8(C);for(bE=s-1;bE>=3;bE--){if(af[aG[bE]].dl!=0){break}}ad+=3*(bE+1)+5+5+4;return bE};var bD=function(bF,bE,bG){var bH;bv(bF-257,5);bv(bE-1,5);bv(bG-4,4);for(bH=0;bH<bG;bH++){bv(af[aG[bH]].dl,3)}aH(aU,bF-1);aH(D,bE-1)};var t=function(bE){var bG,bF;var bI;var bJ;bJ=O-a7;M[aW]=G;a8(E);a8(j);bI=A();bG=(ad+3+7)>>3;bF=(aQ+3+7)>>3;if(bF<=bG){bG=bF}if(bJ+4<=bG&&a7>=0){var bH;bv((aT<<1)+bE,3);bC();aN(bJ);aN(~bJ);for(bH=0;bH<bJ;bH++){Q(bl[a7+bH])}}else{if(bF==bG){bv((e<<1)+bE,3);aM(l,at)}else{bv((bo<<1)+bE,3);bD(E.max_code+1,j.max_code+1,bI+1);aM(aU,D)}}ar();if(bE!=0){bC()}};var bj=function(bI,bG){an[a++]=bG;if(bI==0){aU[bG].fc++}else{bI--;aU[W[bG]+K+1].fc++;D[aK(bI)].fc++;c[aw++]=bI;G|=w}w<<=1;if((a&7)==0){M[aW++]=G;G=0;w=1}if(k>2&&(a&4095)==0){var bE=a*8;var bH=O-a7;var bF;for(bF=0;bF<bn;bF++){bE+=D[bF].fc*(5+u[bF])}bE>>=3;if(aw<parseInt(a/2)&&bE<parseInt(bH/2)){return true}}return(a==U-1||aw==a1)};var aM=function(bK,bI){var bM;var bF;var bG=0;var bN=0;var bJ=0;var bL=0;var bE;var bH;if(a!=0){do{if((bG&7)==0){bL=M[bJ++]}bF=an[bG++]&255;if((bL&1)==0){bc(bF,bK)}else{bE=W[bF];bc(bE+K+1,bK);bH=aE[bE];if(bH!=0){bF-=br[bE];bv(bF,bH)}bM=c[bN++];bE=aK(bM);bc(bE,bI);bH=u[bE];if(bH!=0){bM-=az[bE];bv(bM,bH)}}bL>>=1}while(bG<a)}bc(P,bK)};var a0=16;var bv=function(bF,bE){if(ap>a0-bE){aj|=(bF<<ap);aN(aj);aj=(bF>>(a0-ap));ap+=bE-a0}else{aj|=bF<<ap;ap+=bE}};var ao=function(bG,bE){var bF=0;do{bF|=bG&1;bG>>=1;bF<<=1}while(--bE>0);return bF>>1};var bC=function(){if(ap>8){aN(aj)}else{if(ap>0){Q(aj)}}aj=0;ap=0};var h=function(){if(a4!=0){var bF,bE;bF=T();if(bx==null){bx=i=bF}else{i=i.next=bF}bF.len=a4-a3;for(bE=0;bE<bF.len;bE++){bF.ptr[bE]=aZ[a3+bE]}a4=a3=0}};var aO=function(bI,bK){var bG,bF;be=bI;b=0;if(typeof bK=="undefined"){bK=bf}ab(bK);var bJ=new Array(1024);var bH=[];while((bG=v(bJ,0,bJ.length))>0){var bE=new Array(bG);for(bF=0;bF<bG;bF++){bE[bF]=String.fromCharCode(bJ[bF])}bH[bH.length]=bE.join("")}be=null;return bH.join("")};if(!window.RawDeflate){window.RawDeflate={}}window.RawDeflate.deflate=aO})();
(function(){var n=32768;var v=0;var H=1;var i=2;var R=9;var h=6;var s=32768;var a=64;var B;var k;var P=null;var b;var L,C;var r;var q;var T;var M;var S;var x;var m,o;var f,j;var A;var E;var O=new Array(0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535);var c=new Array(3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0);var K=new Array(0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99);var I=new Array(1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577);var y=new Array(0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13);var p=new Array(16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15);var w=function(){this.next=null;this.list=null};var G=function(){this.e=0;this.b=0;this.n=0;this.t=null};var l=function(aw,ak,af,au,at,ap){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var ax;var av=new Array(this.BMAX+1);var U;var ar;var aq;var ao;var an;var am;var al;var V=new Array(this.BMAX+1);var ai;var W;var ah;var ag=new G();var ae=new Array(this.BMAX);var ad=new Array(this.N_MAX);var ac;var aa=new Array(this.BMAX+1);var ab;var Z;var Y;var aj;var X;X=this.root=null;for(an=0;an<av.length;an++){av[an]=0}for(an=0;an<V.length;an++){V[an]=0}for(an=0;an<ae.length;an++){ae[an]=null}for(an=0;an<ad.length;an++){ad[an]=0}for(an=0;an<aa.length;an++){aa[an]=0}U=ak>256?aw[256]:this.BMAX;ai=aw;W=0;an=ak;do{av[ai[W]]++;W++}while(--an>0);if(av[0]==ak){this.root=null;this.m=0;this.status=0;return}for(am=1;am<=this.BMAX;am++){if(av[am]!=0){break}}al=am;if(ap<am){ap=am}for(an=this.BMAX;an!=0;an--){if(av[an]!=0){break}}aq=an;if(ap>an){ap=an}for(Z=1<<am;am<an;am++,Z<<=1){if((Z-=av[am])<0){this.status=2;this.m=ap;return}}if((Z-=av[an])<0){this.status=2;this.m=ap;return}av[an]+=Z;aa[1]=am=0;ai=av;W=1;ab=2;while(--an>0){aa[ab++]=(am+=ai[W++])}ai=aw;W=0;an=0;do{if((am=ai[W++])!=0){ad[aa[am]++]=an}}while(++an<ak);ak=aa[aq];aa[0]=an=0;ai=ad;W=0;ao=-1;ac=V[0]=0;ah=null;Y=0;for(;al<=aq;al++){ax=av[al];while(ax-->0){while(al>ac+V[1+ao]){ac+=V[1+ao];ao++;Y=(Y=aq-ac)>ap?ap:Y;if((ar=1<<(am=al-ac))>ax+1){ar-=ax+1;ab=al;while(++am<Y){if((ar<<=1)<=av[++ab]){break}ar-=av[ab]}}if(ac+am>U&&ac<U){am=U-ac}Y=1<<am;V[1+ao]=am;ah=new Array(Y);for(aj=0;aj<Y;aj++){ah[aj]=new G()}if(X==null){X=this.root=new w()}else{X=X.next=new w()}X.next=null;X.list=ah;ae[ao]=ah;if(ao>0){aa[ao]=an;ag.b=V[ao];ag.e=16+am;ag.t=ah;am=(an&((1<<ac)-1))>>(ac-V[ao]);ae[ao-1][am].e=ag.e;ae[ao-1][am].b=ag.b;ae[ao-1][am].n=ag.n;ae[ao-1][am].t=ag.t}}ag.b=al-ac;if(W>=ak){ag.e=99}else{if(ai[W]<af){ag.e=(ai[W]<256?16:15);ag.n=ai[W++]}else{ag.e=at[ai[W]-af];ag.n=au[ai[W++]-af]}}ar=1<<(al-ac);for(am=an>>ac;am<Y;am+=ar){ah[am].e=ag.e;ah[am].b=ag.b;ah[am].n=ag.n;ah[am].t=ag.t}for(am=1<<(al-1);(an&am)!=0;am>>=1){an^=am}an^=am;while((an&((1<<ac)-1))!=aa[ao]){ac-=V[ao];ao--}}}this.m=V[1];this.status=((Z!=0&&aq!=1)?1:0)};var e=function(){if(A.length==E){return -1}return A.charCodeAt(E++)&255};var Q=function(U){while(q<U){r|=e()<<q;q+=8}};var t=function(U){return r&O[U]};var d=function(U){r>>=U;q-=U};var g=function(Z,X,V){var W;var U;var Y;if(V==0){return 0}Y=0;for(;;){Q(f);U=m.list[t(f)];W=U.e;while(W>16){if(W==99){return -1}d(U.b);W-=16;Q(W);U=U.t[t(W)];W=U.e}d(U.b);if(W==16){k&=n-1;Z[X+Y++]=B[k++]=U.n;if(Y==V){return V}continue}if(W==15){break}Q(W);S=U.n+t(W);d(W);Q(j);U=o.list[t(j)];W=U.e;while(W>16){if(W==99){return -1}d(U.b);W-=16;Q(W);U=U.t[t(W)];W=U.e}d(U.b);Q(W);x=k-U.n-t(W);d(W);while(S>0&&Y<V){S--;x&=n-1;k&=n-1;Z[X+Y++]=B[k++]=B[x++]}if(Y==V){return V}}T=-1;return Y};var u=function(X,V,U){var W;W=q&7;d(W);Q(16);W=t(16);d(16);Q(16);if(W!=((~r)&65535)){return -1}d(16);S=W;W=0;while(S>0&&W<U){S--;k&=n-1;Q(8);X[V+W++]=B[k++]=t(8);d(8)}if(S==0){T=-1}return W};var J=function(Z,Y,W){if(P==null){var V;var U=new Array(288);var X;for(V=0;V<144;V++){U[V]=8}for(;V<256;V++){U[V]=9}for(;V<280;V++){U[V]=7}for(;V<288;V++){U[V]=8}L=7;X=new l(U,288,257,c,K,L);if(X.status!=0){alert("HufBuild error: "+X.status);return -1}P=X.root;L=X.m;for(V=0;V<30;V++){U[V]=5}zip_fixed_bd=5;X=new l(U,30,0,I,y,zip_fixed_bd);if(X.status>1){P=null;alert("HufBuild error: "+X.status);return -1}b=X.root;zip_fixed_bd=X.m}m=P;o=b;f=L;j=zip_fixed_bd;return g(Z,Y,W)};var z=function(ae,W,ag){var aa;var Z;var X;var V;var af;var ac;var U;var Y;var ad=new Array(286+30);var ab;for(aa=0;aa<ad.length;aa++){ad[aa]=0}Q(5);U=257+t(5);d(5);Q(5);Y=1+t(5);d(5);Q(4);ac=4+t(4);d(4);if(U>286||Y>30){return -1}for(Z=0;Z<ac;Z++){Q(3);ad[p[Z]]=t(3);d(3)}for(;Z<19;Z++){ad[p[Z]]=0}f=7;ab=new l(ad,19,19,null,null,f);if(ab.status!=0){return -1}m=ab.root;f=ab.m;V=U+Y;aa=X=0;while(aa<V){Q(f);af=m.list[t(f)];Z=af.b;d(Z);Z=af.n;if(Z<16){ad[aa++]=X=Z}else{if(Z==16){Q(2);Z=3+t(2);d(2);if(aa+Z>V){return -1}while(Z-->0){ad[aa++]=X}}else{if(Z==17){Q(3);Z=3+t(3);d(3);if(aa+Z>V){return -1}while(Z-->0){ad[aa++]=0}X=0}else{Q(7);Z=11+t(7);d(7);if(aa+Z>V){return -1}while(Z-->0){ad[aa++]=0}X=0}}}}f=R;ab=new l(ad,U,257,c,K,f);if(f==0){ab.status=1}if(ab.status!=0){if(ab.status==1){}return -1}m=ab.root;f=ab.m;for(aa=0;aa<Y;aa++){ad[aa]=ad[aa+U]}j=h;ab=new l(ad,Y,0,I,y,j);o=ab.root;j=ab.m;if(j==0&&U>257){return -1}if(ab.status==1){}if(ab.status!=0){return -1}return g(ae,W,ag)};var N=function(){var U;if(B==null){B=new Array(2*n)}k=0;r=0;q=0;T=-1;M=false;S=x=0;m=null};var F=function(Y,W,V){var X,U;X=0;while(X<V){if(M&&T==-1){return X}if(S>0){if(T!=v){while(S>0&&X<V){S--;x&=n-1;k&=n-1;Y[W+X++]=B[k++]=B[x++]}}else{while(S>0&&X<V){S--;k&=n-1;Q(8);Y[W+X++]=B[k++]=t(8);d(8)}if(S==0){T=-1}}if(X==V){return X}}if(T==-1){if(M){break}Q(1);if(t(1)!=0){M=true}d(1);Q(2);T=t(2);d(2);m=null;S=0}switch(T){case 0:U=u(Y,W+X,V-X);break;case 1:if(m!=null){U=g(Y,W+X,V-X)}else{U=J(Y,W+X,V-X)}break;case 2:if(m!=null){U=g(Y,W+X,V-X)}else{U=z(Y,W+X,V-X)}break;default:U=-1;break}if(U==-1){if(M){return 0}return -1}X+=U}return X};var D=function(Y){var W,V;N();A=Y;E=0;var Z=new Array(1024);var X=[];while((W=F(Z,0,Z.length))>0){var U=new Array(W);for(V=0;V<W;V++){U[V]=String.fromCharCode(Z[V])}X[X.length]=U.join("")}A=null;return X.join("")};if(!window.RawDeflate){window.RawDeflate={}}window.RawDeflate.inflate=D})();

 // = Infraestructure code =
 var AbstractHostMonitor=function(){
 };
 AbstractHostMonitor.prototype.start=function(){};
 AbstractHostMonitor.prototype.checkContext=function(){  
  var hostModel=this.createHostModel();
  if(hostModel&&hostModel.complete){
   var trigger=this.getTrigger();   
   trigger.execute(hostModel);
  }    
 };
 
 // = HostMonitors =
 // Monitors if in a Wikipedia article
 // If in Wikipedia article, it triggers EditorController
 // Introduced in Story 1
 var WikipediaMonitor=function(){
 };
 WikipediaMonitor.prototype=new AbstractHostMonitor();
 WikipediaMonitor.prototype.start=function(func){
  var obj=this;
  window.addEventListener("load",function(){obj.checkContext();},true);  
 };
 WikipediaMonitor.prototype.getTrigger=function(){
  var trigger=new EditorController();
  return trigger;
 }; 
 WikipediaMonitor.prototype.createHostModel=function(){
  var hostModel={};
  var currentArticle=Article.getCurrentArticle();
  if(currentArticle){
   hostModel.article=currentArticle;
   hostModel.complete=true;
  }
  return hostModel;
 }; 
 
 // Monitors if the layer is applicable to the current Wikipedia article
 // If applicable, it triggers AlwaysTrueTriggerController
 // Introduced in Story 2 
 var ArticleMonitor=function(layer){
  this.layer=layer;
 };
 ArticleMonitor.prototype=new AbstractHostMonitor();
 ArticleMonitor.prototype.start=function(func){
  var obj=this;
  window.addEventListener("load",function(){obj.checkContext();},true);  
 };
 ArticleMonitor.prototype.getTrigger=function(){
  var trigger=new AlwaysTrueTriggerController();
  return trigger;
 }; 
 ArticleMonitor.prototype.createHostModel=function(){
  var hostModel={};
  var currentArticle=Article.getCurrentArticle();
  if(currentArticle){
   if(this.layer["def.type"]=="article"&&currentArticle.getName()==this.layer["def.typec"]){
    hostModel.article=currentArticle;
    hostModel.layer=this.layer;
    hostModel.complete=true;
   }
  }
  return hostModel;
 };  
  
 // = TriggerControllers =
 // Adds the WikiLayer tab
 // Triggers the layer clicking on the tab
 // Introduced in Story 1
 var EditorController=function(){};
 EditorController.prototype.execute=function(hostModel){
  var editorController=new EditorLoadController();  
  var view=new TabView();
  var arr={};
  arr.itemName="WikiLayer";
  arr.selected=false;
  arr.listener=function(){editorController.execute(hostModel);};
  view.setViewData(arr);
  var editorTab=view.render();     
  hostModel.article.addTab(editorTab);
 };

 // Executes the ArticleController 
 // Triggers the layer always
 // Introduced in Story 2
 var AlwaysTrueTriggerController=function(){};
 AlwaysTrueTriggerController.prototype.execute=function(hostModel){
  var controller=new ArticleController();
  controller.execute(hostModel);
 }; 
  
 // = LayerControllers =
 // Adds the Read and Edit tab 
 // Introduced in Story 1 
 var EditorLoadController=function(){};
 EditorLoadController.prototype.execute=function(hostModel){
  var readController=new EditorReadController();
  var editController=new EditorEditController();  
  var view=new TabView();
  var arr={};
  arr.itemName="Read";
  arr.selected=true;
  arr.listener=function(){readController.execute(hostModel);};
  view.setViewData(arr);
  var readTab=view.render();    
  var view=new TabView();
  var arr={};
  arr.itemName="Edit";
  arr.selected=false;
  arr.listener=function(){editController.execute(hostModel);};
  view.setViewData(arr);
  var editTab=view.render();        
  var tabView=new EditorTabsView();
  var tabs=tabView.render();
  tabs.appendChild(readTab);	
  tabs.appendChild(editTab);     
  readController.execute(hostModel); 
 };
 
 // When on clicking Read, adds the Article Header and the wikinotes as sections 
 // Introduced in Story 1   
 var EditorReadController=function(){};
 EditorReadController.prototype.execute=function(hostModel){
  var container=EditorLayerModel.clearContainer();
  var view=new ArticleHeadView();
  view.setViewData({titleName: "WikiLayer"});
  var comb=view.render();
  container.appendChild(comb.header);
  container.appendChild(comb.content);  
  EditorLayerModel.selectTab("read",true);
  EditorLayerModel.selectTab("edit",false);  
  var i=0;
  for(i=0;i<LayerLayerModel.ALL.length;i++){
   var view=new NoteView();  
   var arr={};  
   var hostModelN={}; for(j in hostModel){ hostModelN[j]=hostModel[j]; }
   arr.hostModel=hostModelN;
   arr.controller=new EditorEditController();
   arr.controller2=new ShareController();  
   arr.layer=LayerLayerModel.ALL[i];
   view.setViewData(arr);
   var rendering=view.render(); 	
   container.appendChild(rendering.header);     
   container.appendChild(rendering.content);
  }
 };

 // When on clicking Edit, adds the Article Header, the textarea (initialized with wikinotes content), and the save/preview/cancel buttons 
 // Introduced in Story 1  
 var EditorEditController=function(){};
 EditorEditController.prototype.execute=function(hostModel){
  EditorLayerModel.CURRENT_EDIT=null;
  var container=EditorLayerModel.clearContainer();
  var view=new ArticleHeadView();
  view.setViewData({titleName: "Edit:WikiLayer"});  
  var comb=view.render();
  container.appendChild(comb.header);
  container.appendChild(comb.content);   
  EditorLayerModel.selectTab("read",false);
  EditorLayerModel.selectTab("edit",true);  
  var editor=new EditorView();
  var arr={};
  arr.saveListener=function(){
   new EditorEditSaveController().execute(hostModel);
  };
  arr.previewListener=function(){
   new EditorEditPreviewController().execute(hostModel);
  };  
  arr.cancelListener=function(){
   new EditorReadController().execute(hostModel);
  };
  arr.hostModel=hostModel;
  if(hostModel.layer){ 
   EditorLayerModel.CURRENT_EDIT=hostModel.layer;
   arr.layers=[hostModel.layer];
  }else{
   arr.layers=LayerLayerModel.ALL; 
  }
  editor.setViewData(arr);
  var editorRendering=editor.render();
  container.appendChild(editorRendering);
 };

 // When on clicking Save, parse the textarea and save the parsed wikinotes
 // Introduced in Story 1   
 var EditorEditSaveController=function(){};
 EditorEditSaveController.prototype.execute=function(hostModel){
  var ok=LayerSyntaxUtilities.parseAndSave();
  if(ok){    
   new EditorReadController().execute(hostModel);
  }
 };

 // When on clicking Preview, parse the textarea and adds the rendering of wikinote templates
 // Introduced in Story 1   
 var EditorEditPreviewController=function(){};
 EditorEditPreviewController.prototype.execute=function(hostModel){
  var container=EditorLayerModel.clearPreviewContainer();
  var view=new PreviewHeadView();
  var header=view.render();
  container.appendChild(header);
  var view=new NoteView();  
  var parsedLayers=LayerSyntaxUtilities.parseLayersFromTextarea();
  var bad=false;
  var arr={};
  for(i=0;i<parsedLayers.length;i++){
   var layer=parsedLayers[i];
   var bad=typeof(layer)=="string";
   if(!bad){ 
    arr.hostModel=hostModel; 
    arr.controller=new EditorEditController();
    arr.controller2=new ShareController();      
    arr.layer=layer;
    view.setViewData(arr);
    var rendering=view.render(); 	
    container.appendChild(rendering.header);     
    container.appendChild(rendering.content);  
   }else{
    container.appendChild(document.createTextNode(layer));
   }
  }
 }; 

 // When on clicking Twitter/Facebook icons, generates the tinyURL containing the wikinote and opens Twitter/Facebook with a default message and tinyURL
 // Introduced in Story 1  
 var ShareController=function(){};
 ShareController.prototype.execute=function(hostModel){
  var layerText=LayerSyntaxUtilities.exportLayer(hostModel.layer);
  var code=btoa(RawDeflate.deflate(layerText)); 
  var urlcode=window.location.href+"?LAYER="+code; 
  var urlopen=null;
  if(hostModel.site=="FB"){
   urlopen="http://www.facebook.com/sharer.php?u=";
  }else if(hostModel.site=="TW"){
   urlopen="http://twitter.com/share?text=Check my new WikiLayer! %23wikilayer&url=";
  } 
  GM_xmlhttpRequest({
     method: 'GET',
     url: 'http://tinyurl.com/api-create.php?url='+urlcode,
     onload: function(responseDetails) {
     	GM_openInTab(urlopen+responseDetails.responseText);
     }
  });
 }; 

 // Adds the annotation according to the wikinote definition (layer), part 1
 // Introduced in Story 2  
 var ArticleController=function(){};
 ArticleController.prototype.execute=function(hostModel){
  var controller=new Article2Controller();
  var view=new WikiTextSectionView();
  var arr={};
  arr.content=hostModel.layer["def.note"]["content"];
  arr.callback=function(parsed){
   hostModel.nSection=parsed;
   controller.execute(hostModel);}
  view.setViewData(arr);   
  view.render();
 };
 // Adds the annotation according to the wikinote definition (layer), part 2
 // Introduced in Story 2, modified in Story 3 
 var Article2Controller=function(){};
 Article2Controller.prototype.execute=function(hostModel){
  var article=hostModel.article; var layer=hostModel.layer; var nsection=hostModel.nSection;
  if(layer["def.subtype"]=="section"){
   if(layer["def.position"]=="after"){
    var i=article.indexOfSection(layer["def.subtypec"]);
    article.addSection(i+1,nsection);
   }
  }
 };  
 
 // = LayerViews =
 // Tab view. Similar to Article, Talk, Edit, Read tabs
 // Introduced in Story 1  
 var TabView=function(){
  this.itemName=null;
  this.listener=null;
  this.selected=false;
 };
 TabView.prototype.setViewData=function(arr){
  this.itemName=arr.itemName;
  this.listener=arr.listener;
  this.selected=arr.selected; 
 }
 TabView.prototype.render=function(){
  var myItem=document.createElement("li");
  myItem.id="ca-"+StringUtilities.uncapitalize(this.itemName);
  if(this.selected){
   myItem.className="selected";	
  }else{
   myItem.className="";	
  }
  var myItemSpan=document.createElement("span");
  var myItemA=document.createElement("a");
  myItemA.appendChild(document.createTextNode(this.itemName));
  myItemSpan.appendChild(myItemA);
  myItem.appendChild(myItemSpan);
  var listener=this.listener;
  if(listener){
   myItemA.addEventListener("click",function(ev){
    ev.preventDefault();
    if(ev.currentTarget.parentNode.parentNode.className!="selected"){
     listener(ev);
   }},true);
  }		
  return myItem;
 };
  
 // ArticleHead view. Similar to the header of an Article
 // Introduced in Story 1   
 var ArticleHeadView=function(){
  this.titleName=null;
 };
 ArticleHeadView.prototype.setViewData=function(arr){
  this.titleName=arr.titleName; 
 };
 ArticleHeadView.prototype.render=function(){
  var title=document.createElement("h1");
  title.id="firstHeading";
  title.className="firstHeading";
  title.style.setProperty("display","block","important");
  var titleContent=document.createElement("span");
  titleContent.appendChild(document.createTextNode(this.titleName));
  title.appendChild(titleContent);
		
  var bodyContent=document.createElement("div");
  bodyContent.id="bodyContent";
  var bodyContentIn=document.createElement("div");
  bodyContentIn.id="mw-content-text";
  bodyContentIn.className="mw-content-ltr";
  return {header:title,content:bodyContent};
 }; 
 
 // PreviewHead view. Similar to the header of an Edit/Preview page
 // Introduced in Story 1    
 var PreviewHeadView=function(){
 };
 PreviewHeadView.prototype.setViewData=function(arr){
 };
 PreviewHeadView.prototype.render=function(){
  var div=document.createElement("div");
  div.className="previewnote";
  var h2=document.createElement("h2");
  h2.id="mw-previewheader";		
  h2.appendChild(document.createTextNode("Preview"));
  var p=document.createElement("p");
  var strong=document.createElement("strong");
  strong.appendChild(document.createTextNode("Remember that this is only a preview; your changes have not yet been saved!"));
  p.appendChild(strong);
  var hr=document.createElement("hr");	
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(hr);	
  return div;
 }; 
 
 // Note view. Renders a wikinote. Adds a section with sharing icons and a table with the wikinote clause values
 // Introduced in Story 2, modified in Story 3
 var NoteView=function(){
  this.hostModel=null; 
  this.controller=null;  
  this.controller2=null;   
  this.layer=null;
 };
 NoteView.prototype.setViewData=function(arr){
  this.hostModel=arr.hostModel;
  this.controller=arr.controller;
  this.controller2=arr.controller2;  
  this.layer=arr.layer;  
 };
 NoteView.prototype.render=function(){
  var h2=document.createElement("h2");
  var edit=document.createElement("span");
  edit.className="editsection";
  var a=document.createElement("a");
  a.appendChild(document.createTextNode("edit"));
  var hostModel=this.hostModel;  
  hostModel.layer=this.layer;
  var controller=this.controller;
  a.addEventListener("click",function(ev){ev.preventDefault();controller.execute(hostModel);},true);	
  edit.appendChild(document.createTextNode("["));
  edit.appendChild(a);
  edit.appendChild(document.createTextNode("]"));		
  h2.appendChild(edit);    
  var title=document.createElement("span");
  title.className="mw-headline";
  var titleContent="LayerOn"+StringUtilities.capitalize(this.layer["def.type"])+"("+StringUtilities.wrapParam(this.layer["def.typec"])+").";
  titleContent=titleContent+StringUtilities.capitalize(this.layer["def.position"])+StringUtilities.capitalize(this.layer["def.subtype"])+"("+StringUtilities.wrapParam(this.layer["def.subtypec"])+")";
  title.appendChild(document.createTextNode(titleContent));
  h2.appendChild(title);	
  var share=new ShareView();
  share.setViewData({hostModel:this.hostModel,layer:this.layer,controller:this.controller2});
  h2.appendChild(share.render());		
  var p=document.createElement("p");
  p.appendChild(this.generateLayerRenderingTable(this.layer));	
  return {header:h2,content:p};
 }; 
 NoteView.prototype.generateLayerRenderingTable=function(layer){
  var table=document.createElement("table");
  table.className="infobox";
  table.style.cssFloat="none";
  table.style.width="22em";	
  var caption=document.createElement("caption");
  var i=document.createElement("i");
  i.appendChild(document.createTextNode("WikiLayer"));
  caption.appendChild(i);
  table.appendChild(caption);	
  var tbody=document.createElement("tbody");
  table.appendChild(tbody);	
  this.generateLayerRenderingTableRow(table,"on"+StringUtilities.capitalize(layer["def.type"]),(layer["def.typec"]?layer["def.typec"]:""));
  this.generateLayerRenderingTableRow(table,layer["def.position"]+StringUtilities.capitalize(layer["def.subtype"]),(layer["def.subtypec"]?layer["def.subtypec"]:""));
  this.generateLayerRenderingTableRow(table,"onClickingButton",layer["def.click"]?(layer["def.clickText"]?layer["def.clickText"]:""):"false");	
  var param=null;
  var note=layer["def.note"];	
  var subtype=note["subtype"];
  if(subtype=="wikitext"){
   param=note["content"];
  }else if(subtype=="url"){
   param="extractFromPage("+StringUtilities.wrapParam(note["url"])+(note["xpath"]?(","+StringUtilities.wrapParam(note["xpath"])):"")+")";
  }else if(subtype=="custom"){
   param="extract"+StringUtilities.capitalize(note["ctype"])+"("+StringUtilities.wrapParam(note["article"])+","+StringUtilities.wrapParam(note["section"])+")";  
  }
  var noteType;
  if(note["type"]=="embed"){
   noteType="embedNote"; 
  }else if(note["type"]=="post"){
   noteType="postNote"; 
  }
  this.generateLayerRenderingTableRow(table,noteType,param);
  return table;
 };
 NoteView.prototype.generateLayerRenderingTableRow=function(table,first,second){
  var tr=document.createElement("tr");
  var th=document.createElement("th");
  th.style.textAlign="left";
  var td=document.createElement("td");
  tr.appendChild(th);
  tr.appendChild(td);
  th.appendChild(document.createTextNode(first));
  td.appendChild(document.createTextNode(second));
  table.appendChild(tr);
  return tr;
 };
 
 // EditorTab view. Renders the container of Read and Edit Tab
 var EditorTabsView=function(){};
 EditorTabsView.MainTabSelectedXpath="//*[@id='ca-nstab-main']/../li[@class='selected']";
 EditorTabsView.SubMainTabsXpath="//*[@id='p-views']/ul";   
 EditorTabsView.prototype.render=function(readTabListener,editTabListener){
  var res=null;
  var mainTab=document.evaluate(EditorTabsView.MainTabSelectedXpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
  mainTab.className="";
  mainTab.parentNode.lastElementChild.className="selected";
  var subMainTabs=document.evaluate(EditorTabsView.SubMainTabsXpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var readTab=null;
  var editTab=null;
  if(subMainTabs.snapshotLength==1){
   res=subMainTabs.snapshotItem(0);   
   res.innerHTML="";	
  }
  return res;
 };
 
 // Editor view. Renders the editor of wikinotes (textarea + save/preview/cancel buttons)
 // Introduced in Story 1 
 var EditorView=function(){
  this.saveListener=null;
  this.previewListener=null;
  this.cancelListener=null;
  this.layers=null;  
 };
 EditorView.prototype.setViewData=function(arr){
  this.saveListener=arr.saveListener;
  this.previewListener=arr.previewListener;
  this.cancelListener=arr.cancelListener; 
  this.layers=arr.layers;   
 };
 EditorView.prototype.render=function(){
  var div=document.createElement("div");
  div.id="mw-content-text";
  var divIn=document.createElement("div");
  divIn.id="wikiPreview";
  divIn.className="ontop";
  div.appendChild(divIn);			
  var form=document.createElement("form");
  form.id="editForm";
  div.appendChild(form);		
  var textarea=document.createElement("textarea");
  textarea.id="wpTextbox1";
  textarea.rows="25";
  textarea.cols="80";
  form.appendChild(textarea);
  var editButtons=document.createElement("div");
  editButtons.className="editButtons";
  var input=document.createElement("input");
  input.type="submit";
  input.value="Save WikiLayer";	
  input.id="wpSave";
  var input1=document.createElement("input");
  input1.type="submit";
  input1.value="Show preview";	
  input1.id="wpPreview";	
  var span=document.createElement("span");
  span.className="editHelp";
  var a=document.createElement("a");
  a.id="w-editform-cancel";
  a.appendChild(document.createTextNode("Cancel"));
  var saveListener=this.saveListener;var previewListener=this.previewListener; var cancelListener=this.cancelListener;
  input.addEventListener("click",function(ev){ev.preventDefault();saveListener();},true);
  input1.addEventListener("click",function(ev){ev.preventDefault();previewListener();},true);	
  a.addEventListener("click",function(ev){ev.preventDefault();cancelListener();},true);				
  editButtons.appendChild(input);
  editButtons.appendChild(input1);	
  span.appendChild(a);
  editButtons.appendChild(span);
  form.appendChild(editButtons);					
  var i=0;
  for(i=0;i<this.layers.length;i++){
   var layer=this.layers[i];
   //if(whenOn(layer)){
    var sep="";
    if(textarea.value!=""){
     sep="\n\n";
    }
    textarea.value=textarea.value+sep+LayerSyntaxUtilities.exportLayer(layer);	
   //}
  }		  
  var editorAJAX=document.createElement("script");
  editorAJAX.type="text/javascript";
  var head=document.getElementsByTagName("head")[0];
  var script=null;
  var wikilayerEmbed1=this.generateWikiLayerTemplate();
  var wikilayerEmbed2="//TODO - Extract from other Articles\n\n";
  var wikilayerEmbed3="//TODO - Extract from other Web pages\n\n";		
  var templateB=this.generateAddToToolbarSection("wpTextbox1","wikilayer","WikiNote")+
                this.generateAddToToolbarGroup("wpTextbox1","wikilayer","embed","Embedded Note")+
                this.generateAddToToolbarTool("wpTextbox1","wikilayer","embed","wikilayer11","Embed WikiText","http://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Pen_1.svg/22px-Pen_1.svg.png",wikilayerEmbed1)+				
                this.generateAddToToolbarTool("wpTextbox1","wikilayer","embed","wikilayer12","Embed extractSection","http://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/22px-Wikipedia-logo-v2.svg.png",wikilayerEmbed2)+			
                this.generateAddToToolbarTool("wpTextbox1","wikilayer","embed","wikilayer13","Embed extractFromPage","http://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Applications-internet_Gion.svg/22px-Applications-internet_Gion.svg.png",wikilayerEmbed3);							
  if(!unsafeWindow["MYAJAX"]){	
   script="mw.loader.using(\"ext.wikiEditor.toolbar\", function(){\n"+
	  templateB+
	  "});\n"+	
	  "window.MYAJAX=true;";					
  }else{
   script="$.wikiEditor.instances.pop();\n"+
	  "$('#wpTextbox1').wikiEditor( 'addModule', $.wikiEditor.modules.toolbar.config.getDefaultConfig() );\n"+
	  templateB;
   var scripts=head.getElementsByTagName("script");	
   head.removeChild(scripts[scripts.length-1]);
   alert(script);
  }
  editorAJAX.appendChild(document.createTextNode(script));	
  head.appendChild(editorAJAX);  
  return div;	
 }; 
 EditorView.prototype.generateAddToToolbarSection=function(txtBoxId,sectionName,sectionLabel){
  return "$('#"+txtBoxId+"').wikiEditor( 'addToToolbar', {'sections': { '"+sectionName+"': { 'type': 'toolbar',  'label': '"+sectionLabel+"' } } } );\n";
 };
 EditorView.prototype.generateAddToToolbarGroup=function(txtBoxId,sectionName,groupName,groupLabel){
  return "$('#"+txtBoxId+"').wikiEditor( 'addToToolbar', {'section': '"+sectionName+"', 'groups': { '"+groupName+"': { 'label': '"+groupLabel+"' }  } } );\n";				
 };
 EditorView.prototype.generateAddToToolbarTool=function(txtBoxId,sectionName,groupName,toolName,toolLabel,icon,templateContent){
  return "$('#"+txtBoxId+"').wikiEditor( 'addToToolbar', {'section': '"+sectionName+"','group': '"+groupName+"', 'tools': {'"+toolName+"': { label: '"+toolLabel+"', type: 'button', icon: '"+icon+"',action: { type: 'replace', options: { pre: '"+templateContent.replace(/\n/g,"\\n").replace(/'/g,"\\'")+"'  } } } } } );\n";		
 };
 EditorView.prototype.generateWikiLayerTemplate=function(){
  var str="{{WikiLayer\n";
  str=str+" | onArticle=\"ArticleName\" //Article name as it appears on the URL\n";
  str=str+" | afterSection=\"1\" //Ordinal or Name of one this article's sections\n";
  str=str+" | embedNote=\"== New Section == \\\nTest text.\"\n";				
  str=str+"}}\n\n";
  return str;
 }  
 
 // Share view. Add sharing icons to a wikinote rendering.
 var ShareView=function(){
  this.hostModel=null; 
  this.controller=null;  
  this.layer=null;
 };
 ShareView.ShareIcon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAQCAMAAABjhdy+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMBQTFRFJJC66PH36u30NqLJTb7fSqXIZqbEmdTnUrvbidHnN6TKMprCe73Y1ez0O6jN8fb5Q7LVSLjaGHqn8/n8uOHvTLPVSrrcPqvPicLZr9XlLEFQO1uZ////Mk+NqLvICXGh+Pr8SWeg0N3mTWqjYXuta4SzT8DgcYm2RmSfyNHi0tro4OXvRrbYU2+l2+Hsqdjpg5e/WnWqNKDHQK7Se5G7+/3+YsThXr/eX6LCasTfS7zdms/jzOXvs9rqodfp////DJk4kgAAAEB0Uk5T////////////////////////////////////////////////////////////////////////////////////AMJ7sUQAAAFuSURBVCjPjdLZcoIwFIBhFqUKyqqgIWGnKm4VxVpt9f3fqieJIlov+l/AMMNHcpgIl7+Rhy6GYod1tmIIF/TUhfhxWhf7RNGs9zpXUwSEoocQIml8bVesZimxrVYjyxZQhCKxLkIBJVPWB8ZYSkl4e3v/1j0eWyGQ4G5ABPdVJCzNYJXQPXY7ruvuHdy1XJeSpDYg4IHEPk+qZr4/JaG1ODuDr0W/wvjTsigRb4YKEQgH042Ii+XSJ+HC9ByMz7DN6tTpMHI1TNwJnQTjORDT9HoV5g1MTuh2ILg1yI6+Va0Y2XrfXPTXQ0bg40kA0VtjY0sJF2kKZDjc6m2RCkdTPfbHEjpIwq9BTWB8DOMD8dbr8w9bpCfrlHBxK3lBdPXEt9UrdU8H8iDYLNk1+GObLKNEa4/G41FbU3WdkuApRPIJz8CrfJITW1ZljVWqqirbr45llvPm8yLPM6IIpSqXkAygFBThH4f/0Dz8B+MXul5Va8v64wQAAAAASUVORK5CYII%3D";
 ShareView.prototype.setViewData=function(arr){
  this.hostModel=arr.hostModel;
  this.controller=arr.controller; 
  this.layer=arr.layer;
 }; 
 ShareView.prototype.render=function(){
  var shares=document.createElement("div");
  shares.className="shareButtons";
  shares.style.display="inline-block";
  shares.style.paddingLeft="5px"; 
  var layer=this.layer; 
  var hostModel=this.hostModel;
  var fb=ShareView.createControl("Share on Facebook","#","-18px 0pt",ShareView.ShareIcon);
  var twitt=ShareView.createControl("Share on Twitter","#","-34px 0pt",ShareView.ShareIcon);  
  var controller=this.controller; 
  fb.addEventListener("click",function(ev){ev.preventDefault();hostModel.site="FB";controller.execute(hostModel);},true);  
  twitt.addEventListener("click",function(ev){ev.preventDefault();hostModel.site="TW";controller.execute(hostModel);},true); 
  shares.appendChild(fb);
  shares.appendChild(twitt); 
  return shares;
 }
 ShareView.createControl=function(title,href,pos,icon){
  var control=document.createElement("a");
  control.title=title;
  if(typeof(href)=="string"){
   control.href=href;
  }else{
   control.addEventListener("click",href,true);
  }
  control.target="_blank";
  var img=document.createElement("span");	
  img.title=title;
  img.style.backgroundImage="url("+icon+")";
  img.style.height="16px";
  img.style.width="16px";     
  img.style.backgroundPosition=pos; 
  img.style.display="inline-block";
  img.style.marginRight="5px";
  control.appendChild(img);
  return control;
 } 

 // WikiTextSection view. Converts the WikiText of the wikinote to HTML and then renders 
 // Introduced in Story 2, modified in Story 3 
 var WikiTextSectionView=function(){
  this.content=null;
  this.callback=null;
 };
 WikiTextSectionView.ContentXpath="/api/parse/text/text()";
 WikiTextSectionView.TOCXpath="/api/parse/sections/s/@line";
 WikiTextSectionView.prototype.setViewData=function(arr){
  this.content=arr.content;
  this.callback=arr.callback;
 };
 WikiTextSectionView.prototype.render=function(){
  var callback=this.callback;
  ConnectionUtilities.remoteCall(
  "http://en.wikipedia.org/w/api.php?format=xml&action=parse&text="+encodeURIComponent(this.content),
      function(response){ 
        var parser=new DOMParser(); var xml=parser.parseFromString(response.responseText,"application/xml");
        var content=xml.evaluate(WikiTextSectionView.ContentXpath, xml, null, XPathResult.ANY_TYPE, null).iterateNext();
        var toc=xml.evaluate(WikiTextSectionView.TOCXpath, xml, null, XPathResult.ANY_TYPE, null).iterateNext();
	toc=toc?toc.textContent:"Added by user";
	var nsection=Section.createSection(toc,content.textContent);	      		
        callback(nsection);
   });
 };
  
 // = LayerModels =
 // Storage of the all wikinotes  
 var LayerLayerModel=function(){};
 LayerLayerModel.ALL=[]; 

 // Manages the WikiLayer mode    
 var EditorLayerModel=function(){};
 EditorLayerModel.CURRENT_EDIT=null;
 EditorLayerModel.SubTabXpath=function(name){ return "//li[@id='ca-"+name+"']"; }; 
 EditorLayerModel.ContentXpath="//*[@id='content']";
 EditorLayerModel.PreviewXpath="//*[@id='wikiPreview']";   
 EditorLayerModel.selectTab=function(itemName,flag){
  var tab=document.evaluate(EditorLayerModel.SubTabXpath(itemName), document, null, XPathResult.ANY_TYPE, null).iterateNext();
  if(tab){
   if(flag){
    tab.className="selected";  
   }else{
    tab.className="";  
   }
  }
 }; 
 EditorLayerModel.clearContainer=function(titleName){
  var content=document.evaluate(EditorLayerModel.ContentXpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();			
  content.innerHTML="";		  		
  return content; 
 };
 EditorLayerModel.clearPreviewContainer=function(titleName){
  var content=document.evaluate(EditorLayerModel.PreviewXpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();			
  content.innerHTML="";		  		
  return content; 
 };
 
 // = HostModel =
 // Wraps a Wikipedia article
 // Introduced in Story 1, modified in Story 2 and 3
 var Article=function(name){
  this.name=name;
  this.sections=[];
  this.extractSections();  
 };
 Article.Regexp=/^http:\/\/en\.wikipedia\.org\/wiki\/([^?#]+)/;
 Article.TabsXpath="//*[@id='ca-nstab-main']/.."; 
 Article.getCurrentArticle=function(){
  var name=window.location.href.match(Article.Regexp);
  var current=null;
  if(name){
   current=new Article(name[1]);
  }
  return current;
 };
 Article.prototype.getName=function(){
  return this.name;
 };
 Article.prototype.indexOfSection=function(name){
  var res=-1;
  var i=0;
  for(i=0;i<this.sections.length&&res==-1;i++){
   var currentSection=this.sections[i];
   res=currentSection.getName()==name?i:-1;
  }
  return res;
 }; 
 /*Article.prototype.getSection=function(name){
  var i=this.indexOfSection(name);
  var section=i>-1?this.sections[i]:null;
  return section;
 };*/  
 Article.prototype.getSections=function(){
  return this.sections;
 };  
 Article.prototype.extractSections=function(){
  var sections=document.evaluate(Section.Xpath, document, null, XPathResult.ANY_TYPE, null); 
  var i=0;
  var currentSection=sections.iterateNext();
  while(currentSection){
   this.sections[this.sections.length]=new Section(currentSection.textContent,currentSection.parentNode);  
   currentSection=sections.iterateNext();    
  }     
 };
 Article.prototype.addSection=function(i,nsection){
  var section=i>-1?this.sections[i]:null;
  if(section||i==this.sections.length){
   var toc=document.evaluate(Section.TOCXpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
   if(section){
    if(toc.snapshotLength==this.sections.length){
     var tocentry=toc.snapshotItem(i);
     var ntoc=Section.createTocElement(tocentry,nsection.getName());    
     tocentry.parentNode.insertBefore(ntoc,tocentry);
    }
    section.node.parentNode.insertBefore(nsection.node,section.node);
   }else if(i==this.sections.length){
    if(toc.snapshotLength==this.sections.length){
     var tocentry=toc.snapshotItem(0);
     var ntoc=Section.createTocElement(tocentry,nsection.getName());         
     tocentry.parentNode.appendChild(ntoc);
    }   
    var sectionArea=document.evaluate(Section.ContainerXpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
    if(sectionArea){
     sectionArea.appendChild(nsection.node);   
    } 
   }
   this.extractSections();
  }
 }; 
 Article.prototype.addTab=function(tab){
  var tabs=document.evaluate(Article.TabsXpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();		
  if(tabs){
   tabs.appendChild(tab);	
  }     
 };   

 // Wraps Wikipedia sections
 var Section=function(name,node,nodeToc){
  this.name=name; 
  this.node=node;   
 };
 Section.Xpath="//h2/span[@class='mw-headline']";
 Section.ContainerXpath="//div[@id='mw-content-text']"; 
 Section.TOCXpath="//div[@id='toctitle']/../ul/li";
 Section.createSection=function(toc,content){
  var div=document.createElement("div");
  div.innerHTML=content;
  var canBeToc=div.firstChild;
  if(canBeToc.nodeName=="TABLE"&&canBeToc.getAttribute("id")=="toc"){  //Can be realized through __NOTOC__ in Wikitext
   div.removeChild(canBeToc);	
  } 
  var res=new Section(toc,div);
  return res;
 }
 Section.prototype.getName=function(){
  return this.name;
 }; 
 /*Section.prototype.addContent=function(content,place){ 
  if(place==null){place="end";}
  if(place=="begin"){
   this.node.parentNode.insertBefore(content,this.node.nextElementSibling);
  }else if(place=="end"){
  
  }
 };*/
 Section.createTocElement=function(nodeToc,name){
  var entry=nodeToc.cloneNode(true);
  var index=nodeToc.className.match(/^toclevel-([0-9])/)[1];
  var tocnumber=entry.firstChild.firstChild;
  tocnumber.innerHTML="";
  var x="X";for(var level=1;level<index;level++){x=x+".X";}
  tocnumber.appendChild(document.createTextNode(x));
  var toctext=entry.firstChild.lastChild;
  toctext.innerHTML="";
  toctext.appendChild(document.createTextNode(name));
  entry.firstChild.href="#"+name.replace(/ /g,"_");
  if(entry.children.length==2){entry.removeChild(entry.children[1]);}
  return entry;
 };
 
 // = Utilities =
 var LayerSyntaxUtilities=function(){};
 LayerSyntaxUtilities.TextareaXpath="//*[@id='wpTextbox1']"; 
 LayerSyntaxUtilities.parseAndSave=function(){
  var parsedLayers=LayerSyntaxUtilities.parseLayersFromTextarea();		
  var bad=false;
  var act=null;
  var i=0;
  for(i=0;i<parsedLayers.length&&!bad;i++){
   act=parsedLayers[i];		
   bad=typeof(act)=="string";
  }	
  if(!bad){
   LoadAndSaveUtilities.saveLayers(parsedLayers);
  }else{
   alert("Error in syntax:\n"+act);
  }
  return !bad;
 }; 
 LayerSyntaxUtilities.parseLayersFromTextarea=function(){	
  var res=[];
  var textarea=document.evaluate("//*[@id='wpTextbox1']", document, null, XPathResult.ANY_TYPE, null).iterateNext();
  if(textarea){
   res=LayerSyntaxUtilities.parseLayers(textarea.value);
  }
  return res;
 };
 LayerSyntaxUtilities.parseLayers=function(txt){	
  var matches=txt.match(/\{\{WikiLayer(([^}]|[}][^}])*)\}\}/g);
  var parsedLayers=[];
  var i=0;
  for(i=0;matches&&i<matches.length;i++){
   var unparsedLayer={};	
   var layerMatchWhole=matches[i];
   layerMatch=layerMatchWhole.match(/\{\{WikiLayer(([^}]|[}][^}])*)\}\}/);
   var layerClausesMatch=layerMatch[1].match(/\|\ +[^=]+=\"([^"]*)\"/g);
		
   for(j=0;j<layerClausesMatch.length;j++){
    var layerClauseWhole=layerClausesMatch[j];
    layerClauseMatch=layerClauseWhole.match(/\|\ +([^=]+)=(\"[^"]*\")/);
    unparsedLayer[layerClauseMatch[1]]=layerClauseMatch[2];
   }
   var parsed=LayerSyntaxUtilities.parseLayer(unparsedLayer);
   var layer=null;
   if(parsed){
    layer=parsed;
   }else{
    layer=layerMatchWhole;		
   }
   parsedLayers[parsedLayers.length]=layer;		
  }
  return parsedLayers;
 };
 LayerSyntaxUtilities.parseLayer=function(unparsed){
  var layer={"ins.vars":{}};
  var clauses=0;
  var type;
  var found=false; /***/var URLS={"article":""};
  for(type in URLS){
   var value=unparsed["on"+StringUtilities.capitalize(type)];
   if(value){
    layer["def.type"]=type;
    layer["def.typec"]=JSON.parse(value);
    clauses++;
    break;
   }
  } /***/var HANDLERS={"section":""};
  for(type in HANDLERS){
   var value1=unparsed["before"+StringUtilities.capitalize(type)];
   var value2=unparsed["after"+StringUtilities.capitalize(type)];
   var value3=unparsed["upon"+StringUtilities.capitalize(type)];
   var value=null;	
   if(value1){
    value=value1;
    layer["def.position"]="before";
   }else if(value2){
    value=value2;
    layer["def.position"]="after";
   }else if(value3){
    value=value3;
    layer["def.position"]="upon";
   }		
   if(value){
    layer["def.subtype"]=type;	
    layer["def.subtypec"]=JSON.parse(value);
    clauses++;
    break;					
   }			
  }  
  if(unparsed["onClickingButton"]){
   layer["def.click"]=true;
   layer["def.clickText"]=JSON.parse(unparsed["onClickingButton"]);	
  }else{
   layer["def.click"]=false;		
  }
  layer["def.note"]={};
  var value;
  var value1=unparsed["embedNote"];
  var value2=unparsed["postNote"];
  if(value1){
   value=value1;
   layer["def.note"]["type"]="embed";
  }else if(value2){
   value=value2;
   layer["def.note"]["type"]="post";	
  }
  var extractNote=JSON.parse(value).match(/^extract([^(]+)\('([^']+)'(?:,'([^']+)')?\)$/);
  if(extractNote==null){
   layer["def.note"]["subtype"]="wikitext";
   layer["def.note"]["content"]=JSON.parse(value);
   clauses++;
  }else if(extractNote[1]=="FromPage"){
   layer["def.note"]["subtype"]="url";	
   layer["def.note"]["url"]=extractNote[2];
   if(extractNote[3]){
    layer["def.note"]["xpath"]=extractNote[3];	
   }
   clauses++;
  }else if(extractNote.length==4){
   layer["def.note"]["subtype"]="custom";	
   var typ=StringUtilities.uncapitalize(extractNote[1]);	
   layer["def.note"]["ctype"]=typ;
   layer["def.note"]["article"]=extractNote[2];
   layer["def.note"][typ]=extractNote[3];	
   clauses++;				
  }
  return clauses==3?layer:null;
 };
 LayerSyntaxUtilities.exportLayer=function(layer){
  var str="{{WikiLayer\n";
  str=str+"| on"+StringUtilities.capitalize(layer["def.type"])+"="+(layer["def.typec"]?StringUtilities.wrapParam(layer["def.typec"]):"")+"\n";
  str=str+"| "+layer["def.position"]+StringUtilities.capitalize(layer["def.subtype"])+"="+(layer["def.subtypec"]?StringUtilities.wrapParam(layer["def.subtypec"]):StringUtilities.wrapParam(""))+"\n"; 
  if(layer["def.click"]){
   str=str+"| onClickingButton="+(layer["def.clickText"]?StringUtilities.wrapParam(layer["def.clickText"]):StringUtilities.wrapParam(""))+"\n";
  }
  var param=null;
  var note=layer["def.note"];	
  var subtype=note["subtype"];
  if(subtype=="wikitext"){
   param=StringUtilities.wrapParam(note["content"]);
  }else if(subtype=="url" || subtype=="custom"){
   if(subtype=="url"){
    param="extractFromPage("+StringUtilities.wrapParam(note["url"])+(note["xpath"]?(","+StringUtilities.wrapParam(note["xpath"])):"")+")";			
   }else if(subtype=="custom"){
    param="extract"+StringUtilities.capitalize(note["ctype"])+"("+StringUtilities.wrapParam(note["article"])+","+StringUtilities.wrapParam(note["section"])+")";  
   }
   param=param.replace(/"/g,"'");
   param="\""+param+"\"";		
  }	
  if(note["type"]=="embed"){
   str=str+"| embedNote="+param+""; 
  }else if(note["type"]=="post"){
   str=str+"| postNote="+param+""; 		
  }
  str=str+"\n}}";
  return str;
 } 
 
 var LoadAndSaveUtilities=function(){};
 LoadAndSaveUtilities.loadLayers=function(){
  LayerLayerModel.ALL=GM_getValue("Layers")?JSON.parse(GM_getValue("Layers")):[]; 
 }; 
 LoadAndSaveUtilities.saveLayers=function(parsedLayers){
  var i=0;
  if(EditorLayerModel.CURRENT_EDIT){
   var ind=LayerLayerModel.ALL.indexOf(EditorLayerModel.CURRENT_EDIT);
   LayerLayerModel.ALL.splice(ind,1);
  }else{
   for(i=0;i<LayerLayerModel.ALL.length;i++){
    var layer=LayerLayerModel.ALL[i];
    //if(whenOn(layer)){
     var ind=LayerLayerModel.ALL.indexOf(layer);
     LayerLayerModel.ALL.splice(ind,1);
     i=-1;
    //}
   }
  }
  for(i=0;i<parsedLayers.length;i++){
   LayerLayerModel.ALL[LayerLayerModel.ALL.length]=parsedLayers[i];
  }
  GM_setValue("Layers",JSON.stringify(LayerLayerModel.ALL));
 };
 LoadAndSaveUtilities.detectNewLayersInUrl=function(){
  if(window.location.search.indexOf("?LAYER=")==0){
   var unparsed=RawDeflate.inflate(atob(window.location.search.substring("?LAYER=".length)));
   var reply=confirm("Do you want to add the following Layer?\n"+unparsed);
   if(reply){
    var parsedLayers=LayerSyntaxUtilities.parseLayers(unparsed);
    var goodLayers=[];
    var i=0;
    for(i=0;i<parsedLayers.length;i++){
     var layer=parsedLayers[i];
     var bad=typeof(layer)=="string";    
     if(!bad){ 
      goodLayers[goodLayers.length]=layer;
     }
    }
    LoadAndSaveUtilities.saveLayers(goodLayers);    
   }
  }
 };
 
 var StringUtilities=function(){};
 StringUtilities.capitalize=function(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
 };
 StringUtilities.uncapitalize=function(str){
  return str.charAt(0).toLowerCase() + str.slice(1);
 };
 StringUtilities.wrapParam=function(param){
  return JSON.stringify(param);
 };

 var ConnectionUtilities=function(){}; 
 ConnectionUtilities.remoteCall=function(url,callback){
  GM_log("Call: "+url);
  var oReq=new XMLHttpRequest();  
  oReq.open("GET",url,true);  
  oReq.onreadystatechange=function(oEvent){  
   if(oReq.readyState==4){  
    if(oReq.status!=200) {  
     GM_log("[ERROR] Call: "+url);                                        
    }else{  
     GM_log("[OK] Call: "+oReq.status+" "+url); 
     callback(oReq);                                                                                  
    }  
   }  
  };  
  oReq.send(null);  
  /*GM_xmlhttpRequest({
   method: "GET",
   url   : url,
   onload: function(response){
    if(response.status!=200){             
     GM_log("[ERROR] Call: "+url);                                        
    }else{
     GM_log("[OK] Call: "+response.status+" "+url);                       
     callback(response);                     
    }  
   }
  });*/
 }; 
 
 // = Main =
 if(window.location.href.indexOf("http://en.wikipedia.org")==0){
  new WikipediaMonitor().start();
  LoadAndSaveUtilities.loadLayers();
  LoadAndSaveUtilities.detectNewLayersInUrl();  
  var i=0;
  for(i=0;i<LayerLayerModel.ALL.length;i++){
   new ArticleMonitor(LayerLayerModel.ALL[i]).start();
  }
 }