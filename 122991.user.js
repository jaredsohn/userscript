// ==UserScript==
// @name           Better.Caoliu
// @namespace      Better.Caoliu
// @version        2.01
// @updateURL      https://userscripts.org/scripts/source/122991.meta.js
// @downloadURL    https://userscripts.org/scripts/source/122991.user.js
// @description    This script removes redirection or ads in Caoliu, linkbucks, adf.ly, imagedunk, imageporter, imgchili, rmdown, ilix.in, 400kb.com, jptorrent.org, ref.so, imagekitty.com and etc.
// t66y:
// @match          http://t66y.com/htm_data/*
// @match          http://www.t66y.com/htm_data/*
// @match          http://cl.eye.rs/htm_data/*
// @match          http://cl.orc.st/htm_data/*
// viidii.com
// @match          http://www.viidii.com/?*
// linkbucks
// @match          http://*.allanalpass.com/*
// @match          http://*.amy.gs/*
// @match          http://*.any.gs/*
// @match          http://*.baberepublic.com/*
// @match          http://*.deb.gs/*
// @match          http://*.drstickyfingers.com/*
// @match          http://*.dyo.gs/*
// @match          http://*.fapoff.com/*
// @match          http://*.filesonthe.net/*
// @match          http://*.galleries.bz/*
// @match          http://*.hornywood.tv/*
// @match          http://*.linkbabes.com/*
// @match          http://*.linkbucks.com/*
// @match          http://*.linkgalleries.net/*
// @match          http://*.linkseer.net/*
// @match          http://*.miniurls.co/*
// @match          http://*.picbucks.com/*
// @match          http://*.picturesetc.net/*
// @match          http://*.placepictures.com/*
// @match          http://*.poontown.net/*
// @match          http://*.qqc.co/*
// @match          http://*.qvvo.com/*
// @match          http://*.realfiles.net/*
// @match          http://*.rqq.co/*
// @match          http://*.seriousdeals.net/*
// @match          http://*.seriousfiles.com/*
// @match          http://*.seriousurls.com/*
// @match          http://*.sexpalace.gs/*
// @match          http://*.seriousfiles.com/*
// @match          http://*.theseblogs.com/*
// @match          http://*.thesefiles.com/*
// @match          http://*.theseforums.com/*
// @match          http://*.thosegalleries.com/*
// @match          http://*.tinybucks.net/*
// @match          http://*.tinylinks.co/*
// @match          http://*.tnabucks.com/*
// @match          http://*.tubeviral.com/*
// @match          http://*.uberpicz.com/*
// @match          http://*.ubervidz.com/*
// @match          http://*.ubucks.net/*
// @match          http://*.ugalleries.net/*
// @match          http://*.ultrafiles.net/*
// @match          http://*.urlbeat.net/*
// @match          http://*.urlpulse.net/*
// @match          http://*.whackyvidz.com/*
// @match          http://*.youfap.me/*
// @match          http://*.yyv.co/*
// @match          http://*.zxxo.net/*
// @match          http://*.zff.co/*
// @match          http://*.freegaysitepass.com/*
// adf.ly
// @match          http://adf.ly/*
// @match          http://www.adf.ly/*
// @match          http://9.bb/*
// @match          http://u.bb/*
// @match          http://j.gs/*
// @match          http://q.gs/*
// imagedunk
// @match          http://picleet.com/*
// @match          http://imagedunk.com/*
// imageporter
// @match          http://imageporter.com/*
// @match          http://www.imageporter.com/*
// @match          http://picturedip.com/*
// @match          http://piclambo.net/*
// imgchili
// @match          http://imgchili.com/show/*
// rmdown
// @match          http://www.rmdown.com/link.php?hash=*
// ilix.in
// @match          http://ilix.in/*
// 400kb.com
// @match          http://www.400kb.com/go.php?ref=*
// jptorrent.org
// @match          http://*.jptorrent.org/link.php?ref=*
// ref.so
// @match          http://ref.so/*
// pixhub.eu
// @match          http://pixhub.eu/images/show/*
// imagekitty.com
// @match          http://www.imagekitty.com/*
// imagetwist.com
// @match          http://imagetwist.com/*
// @match          http://www.imagetwist.com/*
// imagehyper.com
// @match          http://serve.imagehyper.com/img.php?*
// imagebam.com
// @match          http://www.imagebam.com/image/*
// upsimple.com
// @match          http://upsimple.com/view/*
// imagevenue.com
// @match          http://*.imagevenue.com/img.php?image=*
// wvw.fs-dy.com
// @match          http://wvw.fs-dy.com/link.php?ref=*
// @match          http://torrents.jav-board.com/downxx.php?aid=*
// tiung.com
// @match          http://www.tiung.com/x/download.php?file=*
// javjunkies.com
// @match          http://javjunkies.com/*
// adfoc.us
// @match          http://adfoc.us/*
// adcrun.ch
// @match          http://adcrun.ch/*
// comicalpic.net
// @match          http://comicalpic.net/*
// imgah.com
// @match          http://imgah.com/*
// ==/UserScript==
(function(mb,a,nb,ob,N,wa,xa,pb,qb,ya,rb,f,sb,tb,ub,V,za,vb,wb,xb,yb,I,ea,Aa,W,X,zb,H,Ba,d,Ab,Bb,Ca,fa,Cb,Da,Db,ga,Eb,Fb,ha,Gb,Hb,Ib,Jb,Kb,Q,Lb,Mb,Nb,Ob,Pb,Qb,Rb,Y,J,Z,Ea,Fa,Sb,Tb,Ga,Ha,Ub,Vb,Wb,Ia,Xb,Ja,Yb,Zb,O,Ka,ia,$,$b,ac,bc,cc,dc,La,ec,fc,gc,hc,ic,jc,kc,lc,ja,mc,nc,oc,pc,qc,rc,Ma,R,sc,ka,tc,uc,vc,wc,xc,yc,zc,la,u,Ac,Bc,Cc,Na,p,Oa,Dc,Pa,Ec,t,Fc,Gc,Hc,Ic,Jc,v,Kc,Lc,Mc,ma,Nc,Oc,Qa,Pc,Qc,Rc,Sc,Tc,Uc,Vc,Ra,Wc,Xc,Yc,Sa,Zc,$c,ad,bd,Ta,cd,dd,ed,fd,gd,hd,id,jd,kd,na,ld,y,md,Ua,nd,od,pd,qd,k,rd,sd,z,td,
q,ud,oa,vd,wd,xd,yd,zd,Ad,Bd,Cd,Dd,pa,Ed,Fd,Gd,Va,Hd,Id,Jd,Kd,aa,B,A,w,Ld,Wa,Md,Nd,Od,Xa,Pd,S,Qd,Rd,Sd,Td,Ud,Vd,Wd,Xd,Ya,Yd,Za,qa,Zd,$d,ae,be,ce,de,ee,fe,e,ge,E,C,$a,m,he,ie,je,F,ra,ke,le,T,me,ne,oe,K,x,n,b,ab,pe,qe,re,se,bb,te,ue,ve,we,xe,ye,ze,cb,Ae,Be,Ce,De,Ee,Fe,Ge,He,Ie,ba,Je,Ke,Le,db,Me,Ne,Oe,U,eb,Pe,P,Qe,Re,Se,fb,s,Te,Ue,Ve,r,gb,hb,l,ib,L,We,Xe,Ye,Ze,sa,M,jb,ta,$e,ca,kb,ua,af,bf,lb,cf,df,ef,ff,va,gf,D,hf,jf,kf,lf,mf,nf,of,pf,qf){(function(){[nd,nb][a](x);var c=function(b,c){function e(a,b){Object[xa](b)[n](function(h){a[h]=
b[h]});return a}function k(){p||(p=ab,b[gb](ya,k,N),q[n](function(a){a(g)}),q[l]=f)}function m(a,c){return(c||b)[kb](a)}function g(a,c){var e;if(typeof a===wb)return g[Ad](a);if(a instanceof g)return a;if(this instanceof g)if(typeof a===Va)if(a[f]===I){var G=b[ea](aa);G[W]=a;e=[];g[n](G[kb](X),function(a){a[H][ua](a)});g[n](G[Ba],function(a){e[V](a)});G[W]=d}else e=m(a,c);else e=a instanceof Array?a:a?[a]:[];else return new g(a,c);for(var G=e[l],k=f;k<G;++k)this[k]=e[k];this[l]=G}function r(a,b,h,
c){function d(a){if(h){if(v(a[Z],h))c[Ea](this,arguments)}else c[Ea](this,arguments)}a[J]||(a[J]=++F,z[a[J]]=[]);a[za](b,d,N);z[a[J]][V]({ev:b,fn:c,filter:h,proxy:d})}function t(a,b,h,c){if(a[J])z[a[J]][n](function(d,e){!d||(b&&d[Fa]!==b||h&&d[Ve]!==h||c&&d[ca]!==c)||(a[gb](d[Fa],d[s],N),delete z[a[J]][e])})}var q=[],u=N,p=N;g[ca]=g[B];var y=b[Ca][f],C=Function[B][ta][fa](Array[B][n]);e(g,{forEach:C,ready:function(a){if(p)a(g);else{var c=b[sb];if(c===tb||c===xd)p=ab,a(g);else if(q[V](a),!u)b[za](ya,
k,N)}},extend:e,select:m,proxy:function(c){var e=b[ea](X);e[Da]=[Db,ga][a](D)+c[Ee]()+[[ha,ha][a](ga),[[d,[Ze,[Hb,d][a](ha)][a](ga)][a](A),A][a](D)][a](w);y[ba](e);y[ua](e)},addCss:function(a){var c=b[ea](Q);c[Da]=a;b[Lb][ba](c)}});var v=Function[B][ta][fa](Element[B][nf]||Element[B][Nb]||Element[B][Ob]||Element[B][Pb]),E=Function[B][ta][fa](Array[B][Wa]),z=Object[Rb](Y),F=f;e(g[ca],{forEach:Array[B][n],map:function(a){return this[l]===f?g([]):g(E(this,a))},filter:function(a){var b=[];this[n](function(h){if(v(h,
a))b[V](h)});return g(b)},find:function(a){return this[l]===f?g([]):g(a,this[f])},children:function(a){return this[l]===f?g([]):a?this[Wa](function(b){return v(b,a)}):g(this[f][Ca])},parent:function(){return this[l]===f?g([]):this[f][H]},closest:function(a){if(this[l]===f||!(b instanceof Element))return g([]);for(var b=this[f];(b=b[H])&&b instanceof Element;)if(v(b,a))return g(b);return g([])},remove:function(){this[n](function(a){a[H][ua](a)});return this},on:function(b,h,c){if(this[l]===f)return g([]);
switch(arguments[l]){case Ga:c=h;h=Y;break;case Ha:break;default:throw[eb,Xa][a](x);}r(this[f],b,h,c)},off:function(b,h,c){if(this[l]===f)return g([]);switch(arguments[l]){case Ga:c=h;h=Y;break;case Ha:break;default:throw[eb,Xa][a](x);}t(this[f],b,h,c)},css:function(a){if(this[l]===f)return g([]);var b=this[f];if(typeof a===Va){var h=b[Q][a];return h!==d?h:getComputedStyle(b)[a]}Object[xa](a)[n](function(h){b[Q][h]=a[h]})},append:function(a){if(this[l]===f)return g([]);if(a=g(a)[f])this[f][ba](a);
return this},prepend:function(a){if(this[l]===f)return g([]);a=g(a)[f];var b=this[f];if(a)b[S](a,b[Ba][f]);return this},insertBefore:function(a){if(this[l]===f)return g([]);a=g(a)[f];var b=this[f];if(a)a[H][S](b,a);return this},before:function(a){if(this[l]===f)return g([]);a=g(a)[f];var b=this[f];if(a)b[H][S](a,b);return this},insertAfter:function(a){if(this[l]===f)return g([]);a=g(a)[f];var b=this[f];if(a)a[H][S](b,a[Ia]);return this},after:function(a){if(this[l]===f)return g([]);a=g(a)[f];var b=
this[f];if(a)b[H][S](a,b[Ia]);return this}});return g}(document,window),rf={"zh-CN":{enabled:Ne,feedback:Me,feedback_title:Rd,donation:pf,donation_title:bf},"en-US":{enabled:Ka,feedback:De,feedback_title:[Zd,Ae,ac,cb][a](x),donation:ye,donation_title:[de,La,ec,fc][a](x)}},sf=navigator[gc]||hc;c[ic](c,{isArrayLike:function(a){return typeof a===ge&&l in a&&!(a instanceof Window)},die:function(a){if(c[te](a))c[n](a,function(a){c[E](a)});else c[n]([ja,mc,nc,oc],function(b){a[b]&&(a[b]=Y);if(a[hf](b))a[$a](b)})},
clearCookies:function(){for(var b=document[Ma][ef](w),c=f;c<b[l];c++){var e=b[c],k=e[R](m),e=k>-F?e[tc](f,k):e;document[Ma]=e+[[[d,[d,uc][a](w),vc][a](m),d][a](K),oe,yc,jf,[la,la,la][a](u),ke][a](x)}},tips:function(){var h=[[d,aa][a](I),[[je,[Cc,lb][a](p)][a](m),Oa][a](b),[[d,d,[Ka,d,Pa][a](A)][a](D),[d,C][a](I)][a](w),[[[t,ib][a](m),d][a](u),d,[Gc,e][a](b),Xe,[lb,Oa][a](b),M][a](v),[[Q,jb][a](m),Lc][a](u),[Z,Za][a](m),[[ma,[M,d,[Nc,d,[M,d][a](p)][a](A),d,[cb,d,I][a](A)][a](D)][a](m),[[C,Pa][a](p),
[d,C][a](I)][a](w)][a](v),[[[t,ib][a](m),d][a](u),d,[He,Qa][a](b),Ya,M][a](v),[[Q,jb][a](m),Qc][a](u),[ma,[M,d,[Rc,d,M][a](A)][a](D)][a](m),[[Z,[[Za,d][a](p),d,[Ya,d,I][a](A)][a](D)][a](m),[[C,d][a](p),d][a](I),[aa,d][a](p)][a](v)][a](x),G=[[d,[[va,Tc][a](D),[Uc,Vc][a](w),[Ra,Wc][a](w),[Ra,hb][a](w),[Te,Sa][a](w),fb][a](u),[[$c,ad][a](w),[bd,Se][a](w),[cd,dd][a](w),[ed,d][a](A)][a](u),[va,[fd,Sa][a](D),fb][a](u),[Pd,d][a](A),va][a](b),[[Od,hb][a](D),[df,of][a](w),[kd,d][a](A)][a](u)][a](x);c[na](G);
var k=rf[sf],h=h[sa](/\{\{([0-9a-zA-Z_]+)\}\}/g,function(a,b){return k[b]||a});document[y][ba](c(h)[f])}});var da=[{hosts:[[Kd,e][a](b),[Ua,mb,Gd][a](b),[Ua,pd,ve][a](b)],fn:function(){c[E](c([[d,pa][a](b),[bb,[d,pa][a](b)][a](K),C][a](x)));c([[d,pa][a](b),C][a](x))[n](function(a){a[t]=a[t][sa](yd,cf)[sa](/______/g,b)})}},{hosts:[[se,e][a](b)],fn:function(){var a=document[q](ud);a&&a[t]&&(location[t]=a[t])}},{hosts:[[vd,e][a](b),[td,z][a](b),[re,z][a](b),[sd,e][a](b),[rd,z][a](b),[ue,e][a](b),[Bd,
z][a](b),[Cd,e][a](b),[gf,k][a](b),[qd,xe][a](b),[od,ze][a](b),[Hd,e][a](b),[Id,e][a](b),[Jd,k][a](b),[md,k][a](b),[ld,P][a](b),[jd,e][a](b),[Ge,k][a](b),[Ke,e][a](b),[id,k][a](b),[Ue,P][a](b),[$e,e][a](b),[hd,k][a](b),[Pe,P][a](b),[gd,k][a](b),[Ta,e][a](b),[Zc,e][a](b),[Yc,z][a](b),[Ta,e][a](b),[Sd,e][a](b),[Xc,e][a](b),[Je,e][a](b),[Sc,e][a](b),[Wd,k][a](b),[Xd,P][a](b),[Pc,e][a](b),[Oc,e][a](b),[Mc,e][a](b),[mf,e][a](b),[Kc,k][a](b),[Jc,k][a](b),[ae,k][a](b),[be,k][a](b),[kf,k][a](b),[lf,e][a](b),
[we,Qa][a](b),[Ic,P][a](b),[Hc,k][a](b),[ff,P][a](b),[Fc,e][a](b)],fn:function(){c[s](function(){var a=Lbjs;a&&a.TargetUrl&&(document.body.innerHTML="",a.IsClick=!0,window.onbeforeunload=null,location.href=a.TargetUrl)})}},{hosts:[[Ec,qe][a](b),[Dc,Na][a](b),[ie,Na][a](b),[Bc,z][a](b),[Re,z][a](b)],fn:function(){if(location[ra][R]([d,[Ac,le][a](b)][a](v))!==-F)document[y][W]=d;else{var h=document[q]([ne,C][a](x));if(h)h[T]();else c[zc](),c[s](function(){if(window.zzz){var a=new XMLHttpRequest;a.onreadystatechange=
function(){if(4==a.readyState&&200==a.status){var b=a.responseText;/^https?:\/\//.test(b)&&(location.href=b)}};a.open("POST","/shortener/go",!0);a.setRequestHeader("Content-type","application/x-www-form-urlencoded");a.send("zzz="+zzz)}})}}},{hosts:[[xc,e][a](b),[wc,e][a](b)],fn:function(){c[s](function(){splashpage.closeit()});c([y,ka][a](p))[n](function(a){if(a[he]!==sc)c(a)[r]()})}},{hosts:[[rc,e][a](b),[qc,e][a](b),[pc,k][a](b)],fn:function(){c[s](function(){jsm_url="";popunder=function(){};splashpage.closeit()});
c(oa)[r]();c([y,aa][a](p),function(a){if(a[q](X))c(a)[r]()})}},{hosts:[[lc,e][a](b)],fn:function(){if(document[ma][R](kc)!==-F)c([jc,[d,fe][a](b),[d,ee][a](b)][a](K))[r](),c([y,dc][a](x))[n](function(a){if(a[q](oa))c(a)[r]()}),c(ce)[cc]({display:bc});else location[$b]()}},{hosts:[[$d,e][a](b)],fn:function(){c(bb)[r]();var b=document[q]([[$,ia][a](O),[qa,d][a](L)][a](m));b&&(c[E](b),b[T]())}},{hosts:[[Yd,Vd][a](b)],fn:function(){c[na]([d,[[Zb,Ud][a](D),[Td,d][a](A)][a](u)][a](b));c[s](function(){if(seconds){seconds=
0;var a=document.querySelector("#captcha-form");a?a.focus():setInterval(function(){var a=document.querySelector("form");a&&a.submit&&a.submit()},100)}});var h=document[q]([[oa,Le][a](O),[[Yb,d][a](L),[Ja,d][a](L)][a](O)][a](m));h&&(location[t]=h[Ja])}},{hosts:[[Xb,e][a](b)],fn:function(){c[s](function(){update&&(update=function(){},timer(),clearInterval(MyMar1))});c([X,[Qd,ka][a](p)][a](K))[n](function(a){if(!a[q](U))c(a)[r]()});c[E](c([U,$][a](K)));document[q](U)[Wb]()}},{hosts:[[Vb,Qe][a](b)],fn:function(){c([y,
ka][a](p))[n](function(a){if(!a[q](U))c(a)[r]()});var b=document[q]([[$,ia][a](O),[qa,d][a](L)][a](m));if(b)b[T]()}},{hosts:[[Nd,me][a](b)],fn:function(){var b=document[q]([Ub,C][a](p));b&&(document[y][W]=d,location[t]=b[t])}},{hosts:[[Oe,Tb][a](b)],fn:function(){c[na]([[[d,db][a](b),[d,db][a](b)][a](K),[[y,Md][a](D),Sb][a](u),[Qb,d][a](A)][a](x));c([d,Mb][a](b))[r]()}},{hosts:[[Ld,e][a](b)],fn:function(){c(Kb)[r]()}},{hosts:[[Ie,e][a](b)],fn:function(){c[s](function(){doClose()})}},{hosts:[[Jb,e][a](b)],
fn:function(){c[s](function(){c("#dialog-confirm").dialog("close");createCookie("hasVisitedBefore","true",1E3)});c([Ib,Fe,Ye][a](K))[r]()}},{hosts:[[Gb,e][a](b)],fn:function(){c[s](function(){closeOverlay()})}},{hosts:[[Fb,e][a](b)],fn:function(){c(Eb)[r]();c[E](document);c[s](function(){SetCookie("pf",1,"")})}},{hosts:[[Ce,e][a](b)],fn:function(){c[s](function(){interstitialBox.closeit()})}},{hosts:[[Cb,Bb,e][a](b),[Ab,e][a](b)],fn:function(){c[E](c(U));var b=document[q]([[$,ia][a](O),[qa,d][a](L)][a](m));
if(b&&b[T])b[T]()}},{hosts:[[zb,e][a](b)],fn:function(){setInterval(function(){c[E]([document,document[y]])},Be);c[s](function(){var a;if(a=countdown.toString().match(/http[:a-zA-Z0-9\.?\/&=]+/)[0])document.body.innerHTML="",location.href=a})}},{hosts:[[af,e][a](b)],fn:function(){location[ra][R]([d,Aa,yb,d][a](v))!==-F&&(location[ra]=[d,Aa,d][a](v));c([[[C,[ja,d][a](L),t][a](O),M][a](m),[Fd,[Ed,d][a](L)][a](b)][a](v))[n](function(a){var b=a[xb](ja)[Dd](We);b&&b[F]&&(a[t]=b[F],a[$a](Z),c[E](a))})}},
{hosts:[[vb,La][a](b)],fn:function(){c[s](function(){-1!==click_url.indexOf("http://adfoc.us/serve/click/")&&(document.body.innerHTML="",location.replace(click_url))})}},{hosts:[[zd,ub][a](b)],fn:function(){c[s](function(){var a=document.body.querySelector("iframe.fly_frame+script");a&&(a=a.innerHTML.replace(/^\s+|\s+$/g,""),0===a.indexOf("eval(")&&(a=a.replace(/^eval\(/g,"String("),a=eval(a),a=a.match(/skip_ad\.click\(function\(\)\{(.*),function\(/)[1],eval(a+',function(r){var o = JSON.parse(r);if(o.message.url.length>4){location.href = o.message.url;document.body.innerHTML = "";};});')))})}},
{hosts:[[rb,k][a](b)],fn:function(){c([d,qb][a](b))[r]()}},{hosts:[[pe,e][a](b)],fn:function(){c(pb)[r]()}}];c(function(){for(var a=location[wd],b=f;b<da[l];++b)for(var d=f;d<da[b][wa][l];++d)if(a[R](da[b][wa][d])!==-F){da[b][ca]();c[ob]();return}});window[qf]=c})()})("eye","join","strict","tips",!1,"hosts","keys","#boxes","overlay_ad","readystatechange","comicalpic",0,"readyState","interactive","ch","push","addEventListener","adfoc","function","getAttribute","attention","<","createElement","main",
"innerHTML","script","tiung","parentNode","childNodes","","jav-board","fs-dy","children","bind","wvw","textContent","try","(","#disclaimer","upsimple",")","imagebam","e","#h","imagehyper","#dhtmlwindowholder","style","head","adultpage","mozMatchesSelector","webkitMatchesSelector","oMatchesSelector","!important","create",null,"__i","target","apply","ev","scroll","eu",2,3,"#btn_open","jptorrent","submit","nextSibling","400kb","src",'"ifram"',"blockUI","[","enabled","type","input","reload","to","block",
"css","tr","us","do","better","language","en-US","extend","#ad","imgChili","imgchili","onclick","onsubmit","onmouseover","onmouseout","piclambo","picturedip","imageporter","cookie","indexOf","CENTER","*","substr","expires","Thu","picleet","imagedunk","Jan","clearCookies","00",":","1market","j",'"bc_tips_container"',"bb",">","Caoliu","9","&emsp","adf","href","freegaysitepass","github","zxxo","yyv","ugalleries","/","ubucks",'blue"',"uberpicz","title","feedback_title","tubeviral","me","tnabucks",'red"',
"donation_title","thosegalleries","position","fixed","top","2em","right","thesefiles","sexpalace","opacity","seriousurls","4","background","#abc","seriousfiles","5px","border-radius","3px","hover","seriousdeals","realfiles","poontown","picbucks","pointer","addCss","miniurls","body","linkseer","cl","use","hornywood","orc","galleries","net","deb","baberepublic","gs","amy","querySelector","#directlink","iframe","allanalpass","host","complete",/^http\:\/\/www\.viidii\.(?:com|info)\/\?(.*?)&z/,"adcrun",
"ready","dyo","fapoff","match","tpc_content",'php"',"JAV","rs","string","linkbabes","linkbucks","linkgalleries","t66y","div","prototype","}",";","imagekitty","map","overflow","ref","#toggleGoogle","invalid","8","insertBefore","#wrap","\u6709\u95ee\u9898\u70b9\u6b64\u53cd\u9988","theseblogs","none","display","in","tinybucks","tinylinks","donation","ilix",'"_blank"','"submit"',"Click","rmdown","ultrafiles","urlbeat","#all","Help","sidebar","sidebar2","com","object","die","a","removeAttribute","=","tagName",
"u","class",1,"pathname","GMT","php","click","so","#continue","01",","," ","forEach",".",!0,"imgah","ly","any","viidii","img","isArrayLike","drstickyfingers","st","youfap","bz","Donation","tv","feedback","here",100,"imagevenue","Feedback","toString","#l","picturesetc","opengg","imagetwist","appendChild","theseforums","placepictures","name","adult","\u53cd\u9988","\u5df2\u542f\u7528","pixhub","form","Arguments","rqq","co","org","q","padding","0","proxy","green","qqc","filter","remove","removeEventListener",
"color","length",'"http',"]",/location\.href\s*=\s*"([^"]+)"/,"OpenGG","#r","catch","replace",'"','"color',"call","qvvo","fn","querySelectorAll","removeChild","javjunkies","\u6211\u8981\u6350\u52a9\u6b64\u9879\u76ee","Better","$1","red","split","zff","bc_tips_container","filesonthe","{","hasAttribute","1970","urlpulse","whackyvidz","ubervidz","matches","cursor","\u6350\u52a9","$");