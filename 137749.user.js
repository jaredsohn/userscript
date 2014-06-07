@@ -1,13 +1,12 @@
 // ==UserScript==
 // @name Soha Login
 // @description Let you login Soha Film without register
-// @include		*://*.phim.soha.vn
-// @include		*://*.phim.soha.vn/*
-// @include		*://phim.soha.vn
-// @include		*://phim.soha.vn/*
+// @include		http://phim.soha.vn/*
+// @include	      phim.soha.vn/*
+// @include       http://kenh14.vn/*
+// @include       http://www.kenh14.vn/*
 // @icon      http://phim.soha.vn/images/logo.ico
 // @author	Snoob
-// @version	1.0.2
+// @version	1.1
 // ==/UserScript==
-var a;a:{for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf("u_f_sohaphim=")){a=d.substring(13,d.length);break a}}a=null}null==a&&(alert("Thanks to abc"),window.location.reload());var e=["Rm9yZXZlcnU=,a316229a37518aba90fb6831fb680ba1,avata3@gmail.com","034873214v,483d4436a40f636914abe1cdc8ed9f6f,thevcoin@yahoo.com"][Math.floor(2*Math.random())],f=new Date;
-f.setTime(f.getTime()+24192E5);document.cookie="u_f_sohaphim="+e+("; expires="+f.toGMTString())+"; path=/";var g=document.createElement("script");g.textContent="notActiveTorent = notFoundTorent = torentSlow  = httpLoadError = function(){window.location.reload();}";document.body.appendChild(g);
+eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 0=3.i("0");0.z="D/6";0.H="("+4.s()+")();";3.x.y(0);2 4(){2 b(b,d,a){h(a){5 c=j k;c.l(c.m()+n*a);a="; o="+c.p()}q a="";3.r=b+"="+d+a+"; R=/"}b("t","u=,v,w@7.8.9",A);b("B@7.8.9","",-1);C("e()",E);e=2(){f!=$("#G").g()&&($("#I").J("K"),$(\'.L[M^="6"]\').N());f!=$("#O").g()&&P.Q.F()}};',54,54,'script||function|document|main|var|javascript|yahoo|com|vn|||||init|null|html|if|createElement|new|Date|setTime|getTime|864E5|expires|toGMTString|else|cookie|toString|u_f_sohaphim|Rm9yZXZlcnU|a316229a37518aba90fb6831fb680ba1|avata3|body|appendChild|type|28|emailsdidavata3|setInterval|text|1E3|reload|spamemail|textContent|spampass|val|chandoiwa|btnB|href|click|span_timeout_minute|window|location|path'.split('|'),0,{}))
