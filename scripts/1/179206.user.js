// ==UserScript==
// @name        wat
// @namespace   
// @description watwatwat
// @author      hinafu
// @include     *
// @grant       none
// ==/UserScript==

//=============================================================================

function readCookie(a) {
  var b = a + "=",
    c = document.cookie.split(";");
  for (var d = 0; d < c.length; d++) {
    var e = c[d];
    while (e.charAt(0) == " ") e = e.substring(1, e.length);
    if (e.indexOf(b) == 0) return unescape(e.substring(b.length, e.length))
  }
  return null
}

function saveCookie(a, b, c) {
  if (c) {
    var d = new Date;
    d.setTime(d.getTime() + c * 24 * 60 * 60 * 1e3);
    var e = "; expires=" + d.toGMTString()
  } else var e = "";
  var f = "; domain=." + getDomainName(document.location.hostname) + "; ";
  document.cookie = a + "=" + escape(b || "") + e + f + "path=/"
}

function deleteCookie(a) {
  saveCookie(a, "", -1)
}

function setScrobblingFlag(a) {
  var b = {
    _method: "put"
  };
  b.scrobblingEnabled = a, $.ajax({
    type: "POST",
    url: "/members/" + readCookie("id"),
    data: b
  })
}

function getScrobblingFlag() {
  var a = null;
  return $.ajax({
    url: "/members/" + memberShortcut() + ".json?me=true",
    type: "get",
    async: !1,
    success: function (b) {
      a = b.scrobbling_enabled
    }
  }), a == "true" || a == null ? !0 : !1
}

function prettyEncode(a) {
  return a.replace(/[^0-9A-Za-z\-_ ]/g, "").replace(/[ ]+/g, "-").toLowerCase()
}

function timeDigits(a, b) {
  return a < 10 && a != 0 && b && (a = "0" + a), a == 0 && b ? a = "00" : a == 0 && (a = ""), a
}

function getDomainName(a) {
  return a.indexOf("rhapsody") != -1 ? a.substring(a.indexOf("rhapsody")) : a.indexOf("napster") != -1 ? a.substring(a.indexOf("napster")) : a.indexOf("mtvmusic.de") != -1 ? a.substring(a.indexOf("mtvmusic.de")) : null
}

function getQuerySeparator(a) {
  return a ? a.indexOf("?") >= 0 ? "&" : "?" : "?"
}

function secondsToTime(a) {
  var b = "",
    c = Math.floor(a / 3600),
    d = Math.floor(a % 3600 / 60),
    e = Math.ceil(a % 3600 % 60);
  return c >= 1 ? (b += c + ":", b += (d > 9 ? d : "0" + d) + ":") : b += d + ":", b += e > 9 ? e : "0" + e
}

function timeToSeconds(a) {
  var b = a.split(":"),
    c = b.length,
    d = 0;
  for (var e in b) d += b[e] * Math.pow(60, c - 1 - e);
  return d
}

function subtractFromTotalTime(a, b) {
  var c = timeToSeconds(a),
    d = timeToSeconds(b);
  return secondsToTime(d - c)
}

function showRandomElement(a) {
  var b = Math.floor(Math.random() * a.length),
    c = a.eq(b, 1);
  a.hide(), c.show()
}

function s_gi(a, b, c) {
  var d = "s.version='H.24';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
    e = window,
    f = e.s_c_il,
    g = navigator,
    h = g.userAgent,
    i = g.appVersion,
    j = i.indexOf("MSIE "),
    k = h.indexOf("Netscape6/"),
    l, m, n, o, p;
  if (a) {
    a = a.toLowerCase();
    if (f)
      for (n = 0; n < 2; n++)
        for (m = 0; m < f.length; m++) {
          p = f[m], o = p._c;
          if ((!o || o == "s_c" || n > 0 && o == "s_l") && (p.oun == a || p.fs && p.sa && p.fs(p.oun, a))) {
            p.sa && p.sa(a);
            if (o == "s_c") return p
          } else p = 0
        }
  }
  e.s_an = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", e.s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a"), e.s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x"), e.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)"), e.s_d = new Function("x", "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x"), e.s_fe = new Function("c", "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")"), e.s_fa = new Function("f", "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a"), e.s_ft = new Function("c", "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;"), d = s_d(d), j > 0 ? (l = parseInt(m = i.substring(j + 5)), l > 3 && (l = parseFloat(m))) : k > 0 ? l = parseFloat(h.substring(k + 10)) : l = parseFloat(i);
  if (l < 5 || i.indexOf("Opera") >= 0 || h.indexOf("Opera") >= 0) d = s_ft(d);
  return p || (p = new Object, e.s_c_in || (e.s_c_il = new Array, e.s_c_in = 0), p._il = e.s_c_il, p._in = e.s_c_in, p._il[p._in] = p, e.s_c_in++), p._c = "s_c", (new Function("s", "un", "pg", "ss", d))(p, a, b, c), p
}

function s_giqf() {
  var a = window,
    b = a.s_giq,
    c, d, e;
  if (b)
    for (c = 0; c < b.length; c++) d = b[c], e = s_gi(d.oun), e.sa(d.un), e.setTagContainer(d.tagContainerName);
  a.s_giq = 0
}

function loadAdvertisements(a, b) {
  a = a || "free", b = b || "all";
  var c = [];
  if (Locale.isDefaultLocale()) switch (a) {
  case "free":
  case "expired":
  case "suspended":
  case "7daytrial":
  case "30daytrial":
    b == "billboard" ? c = [{
      element: $("#billboard"),
      callback: showBillboard
    }] : c = [{
      element: $("#tophat"),
      callback: showTophatAd
    }, {
      element: $("#billboard"),
      callback: showBillboard
    }];
    break;
  case "subscriber":
  case "14daytrial":
  case "30daytrialcc":
  }
  Advertising.load(c)
}

function updateAdvertisements(a) {
  if (typeof History != "undefined" && History.enabled && a.indexOf("#") >= 0) return;
  var b = Account.getProperties().experienceType,
    c = !1;
  if (Locale.isDefaultLocale())
    if (urlPath(a) == "/" && b != "7daytrial" && b != "30daytrial") $("#tophat").hide(), c = !0;
    else if (b == "7daytrial" || b == "30daytrial" || b == "free" || b == "expired" || b == "suspended") $("#tophat").show(), c = !0;
  if (b == "7daytrial" || b == "30daytrial" || b == "free" || b == "expired" || b == "suspended") c = !0;
  Advertising.update(), c && resizeFrame()
}

function showTophatAd() {
  $("#tophat-ads .tophat-ad").hide();
  var a = Advertising.getProperties();
  if (a["experienceType"] == "7daytrial" || a["experienceType"] == "30daytrial") {
    var b = $("#tophat-ads-countdown #days-left-" + a.trialDaysLeft);
    b.length == 1 ? b.show() : showRandomElement($("#tophat-ads-trial .tophat-ad"))
  } else showRandomElement($("#tophat-ads-" + a.experienceType + " .tophat-ad"));
  $("#tophat-ads").trigger("show-tophat")
}

function showBillboard() {
  showRandomElement($("#billboard-ads .billboard-ad"))
}

function onStrobeCallback(a, b) {
  b == "play" && EditorialHelper.doOnVideoLoad()
}

function delvePlayerCallback(a, b, c) {
  var d = "LimelightPlayer";
  b == "onPlayerLoad" && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0) && DelvePlayer.registerPlayer(d);
  switch (b) {
  case "onPlayStateChanged":
    c.isPlaying && EditorialHelper.doOnVideoLoad()
  }
}

function hideAllBreadcrumbMenus() {
  $("#breadcrumb .crumb").removeClass("current").removeClass("show-genres"), $("#breadcrumb .crumb .crumb-menu").hide()
}

function showAllDownloads(a) {
  $(a.target).hasClass("playlist-page") ? showDownloadedPlaylistTrackStatus() : showDownloadedTrackStatus(), showDownloadedAlbumStatus(), showDownloadedPlaylistStatus()
}

function checkCurrentPlayingTrackDownload() {
  var a = currentQueue().currentTrack();
  if (a) {
    var b = ClientDownloads.tracksCacheState([a.id]);
    b[a.id] == null && stop()
  }
}

function downloadTrack(a) {
  ClientDownloads.downloadTracks([a.id]), pageNavUrl().match(new RegExp("/members/" + memberShortcut() + "/library[.+]?")) || Library.add(a, "track"), showDownloadedTrackStatus()
}

function downloadPlaylistTrack(a, b) {
  var c = [b.id],
    d = ClientDownloads.playlistTrackDownloads(a.id);
  if (d)
    for (var e = 0; e < d.length; e++) c.push(d[e].id);
  downloadPartialPlaylist(a, c)
}

function downloadTracks(a) {
  var b = new Array;
  for (var c = 0; c < a.length; c++) {
    var d = a[c];
    b.push(d.id)
  }
  ClientDownloads.downloadTracks(b), showDownloadedTrackStatus()
}

function removeDownloadedTrack(a) {
  ClientDownloads.removeTrackDownloads([a.id]), $(".track-item").each(function () {
    $(this).attr("track_id") == a.id && $(this).removeClass("downloaded")
  }), checkCurrentPlayingTrackDownload(), $("#member-hub.library-page").length > 0 && downloadedOnly && removeUndownloadedItems()
}

function removeDownloadedPlaylistTrack(a, b) {
  ClientDownloads.removePlaylistTrackDownloads(a, [b.id]), $(".track-item").each(function () {
    $(this).attr("track_id") == b.id && $(this).removeClass("downloaded")
  }), checkCurrentPlayingTrackDownload()
}

function removeDownloadedTracks(a) {
  var b = new Array;
  for (var c = 0; c < a.length; c++) {
    var d = a[c];
    b.push(d.id)
  }
  ClientDownloads.removeTrackDownloads(b), showDownloadedTrackStatus(), checkCurrentPlayingTrackDownload()
}

function downloadAlbum(a) {
  var b = dynamicUrl("/album/" + a.id + "/queue");
  downloadCollection(b), $(".album-item").each(function () {
    var b = $(this).attr("album_id");
    b == a.id && $(this).addClass("downloaded")
  })
}

function removeDownloadedAlbum(a) {
  var b = dynamicUrl("/album/" + a.id + "/queue");
  removeDownloadedCollection(b), $(".album-item").each(function () {
    $(this).attr("album_id") == a.id && $(this).removeClass("downloaded")
  })
}

function downloadPlaylist(a) {
  var b = dynamicUrl("/playlist/" + a.id + "/queue");
  $.ajax({
    url: b,
    dataType: "json",
    success: function (b) {
      if (b != null) {
        var c = getStreamableTrackIds(b.tracks);
        $(".playlist-item").each(function () {
          $(this).attr("playlist_id") == a.id && $(this).addClass("downloaded")
        }), ClientDownloads.downloadPlaylist(a.id, a.name, c), showDownloadedPlaylistTrackStatus(), reportEvent("Playlist", "Downloaded")
      }
    },
    error: function () {}
  })
}

function getStreamableTrackIds(a) {
  var b = new Array;
  return a && $.each(a, function (a, c) {
    isStreamable(c.right_flags) && b.push(c.id)
  }), b
}

function downloadPartialPlaylist(a, b) {
  var c = dynamicUrl("/playlist/" + a.id + "/queue");
  $.ajax({
    url: c,
    dataType: "json",
    success: function (c) {
      if (c != null) {
        var d = getStreamableTracks(c.tracks),
          e = new Array;
        $.each(d, function (c, d) {
          ($.inArray(d.id, b) >= 0 || ClientDownloads.playlistTrackDownloadsState(a.id, [d.id])[d.id] != null) && e.push(d.id)
        }), ClientDownloads.downloadPlaylist(a.id, a.name, e), showDownloadedPlaylistTrackStatus()
      }
    },
    error: function () {}
  })
}

function removeDownloadedPlaylist(a) {
  ClientDownloads.removePlaylist(a.id), $(".playlist-item").each(function () {
    $(this).attr("playlist_id") == a.id && $(this).removeClass("downloaded")
  }), showDownloadedPlaylistTrackStatus(), checkCurrentPlayingTrackDownload()
}

function downloadCollection(a) {
  $.ajax({
    url: a,
    dataType: "json",
    success: function (a) {
      if (a != null) {
        var b = getStreamableTrackIds(a.tracks);
        ClientDownloads.downloadTracks(b), $("#member-hub.library-page").length == 0 && Library.add(a.tracks, "track-list"), showDownloadedTrackStatus()
      }
    },
    error: function () {}
  })
}

function showDownloadedPlaylistTrackStatus() {
  var a = !1,
    b = $(".playlist-item").first().attr("playlist_id"),
    c = [];
  $(".track-item").each(function () {
    var a = trackFromAttributes($(this));
    c.push(a.id)
  });
  var d = ClientDownloads.playlistTrackDownloadsState(b, c);
  return $(".track-item").each(function () {
    var b = trackFromAttributes($(this));
    if (d[b.id] != null)
      if (d[b.id].state == "Saved") $(this).addClass("downloaded"), a = !0;
      else {
        var c = $(this).find(".download-progress");
        c.length == 0 && addTrackDownloadProgressBar($(this))
      } else $(this).removeClass("downloaded")
  }), a
}

function showDownloadedTrackStatus() {
  var a = !1,
    b = [];
  $(".track-item").each(function () {
    var a = trackFromAttributes($(this));
    b.push(a.id)
  });
  var c = ClientDownloads.trackDownloadsState(b);
  return $(".track-item").each(function () {
    var b = trackFromAttributes($(this));
    if (c[b.id] != null)
      if (c[b.id].state == "Saved") $(this).addClass("downloaded"), $("#library-albums").length > 0 && $(this).closest(".album-item").addClass("downloaded"), a = !0;
      else {
        var d = $(this).find(".download-progress");
        d.length == 0 && addTrackDownloadProgressBar($(this))
      } else $(this).removeClass("downloaded")
  }), a
}

function showDownloadedAlbumStatus() {
  var a = [];
  $(".album-item").each(function () {
    var b = $(this).attr("album_id");
    a.push(b)
  });
  var b = ClientDownloads.albumDownloadsState(a);
  $(".album-item").each(function () {
    var a = $(this).attr("album_id");
    b[a] != null ? $(this).addClass("downloaded") : $(this).removeClass("downloaded")
  })
}

function showDownloadedPlaylistStatus() {
  var a = [];
  $(".playlist-item").each(function () {
    var b = $(this).attr("playlist_id");
    a.push(b)
  });
  var b = ClientDownloads.playlistDownloadsState(a);
  $(".playlist-item").each(function () {
    var a = $(this).attr("playlist_id");
    b[a] != null && $(this).addClass("downloaded")
  })
}

function checkLibraryArtistDownloadStatus(a) {
  $("#member-hub.library-page").length > 0 && (showDownloadedTrackStatus() || ($("ul#library-artist-list li").each(function () {
    $(this).attr("artist_id") == a && ($(this).removeClass("downloaded"), $(this).addClass("not-downloaded"), downloadedOnly && ($(this).hide(), $("#library-artist-view").length && ($(this).prevAll("li.downloaded").length > 0 ? navigateToPage($(this).prevAll("li.downloaded:first").find("a").attr("href")) : $(this).nextAll("li.downloaded").length > 0 ? navigateToPage($(this).nextAll("li.downloaded:first").find("a").attr("href")) : showNoDownloadsMessage())))
  }), $("#library-recent-view").length && downloadedOnly && ($("ul#library-artist-list li.downloaded").length ? $(".library-tracks .track-item.downloaded").length == 0 && showNoRecentDownloadsMessage() : showNoDownloadsMessage())))
}

function addTrackDownloadProgressBar(a) {
  progress = $("<div class='download-progress'><div class='download-cancel'></div><div class='progress-bar'><div class='pending'>" + ClientLocale.downloadPending + "</div><div class='progress' style='display:none'></div></div>"), a.addClass("downloading"), a.find(".track").append(progress)
}

function removeDownloadedCollection(a) {
  $.ajax({
    url: a,
    dataType: "json",
    success: function (a) {
      if (a != null) {
        var b = a.tracks,
          c = new Array;
        for (var d = 0; d < b.length; d++) c.push(b[d].id);
        ClientDownloads.removeTrackDownloads(c), showDownloadedTrackStatus(), checkCurrentPlayingTrackDownload()
      }
    },
    error: function () {}
  })
}

function onDownloadTrackEvent(a, b, c, d) {
  (c == "Complete" || c == "Canceled" || c == "Pending_Download" || c.indexOf("Download_Error") != -1) && checkPendingDownloads();
  var e = !0;
  $(".track-item").each(function () {
    var a = trackFromAttributes($(this));
    if (a.id == b) {
      var e = !1;
      if ($("#member-hub.playlist-page").length > 0) {
        var f = $(".playlist-item").first().attr("playlist_id");
        ClientDownloads.playlistTrackDownloadsState(f, [b])[b] != null && (e = !0)
      } else ClientDownloads.trackDownloadsState([b])[b] != null && (e = !0); if (e) {
        var g = $(this).find(".download-progress");
        d < 100 && c != "Canceled" && c.indexOf("Download_Error") == -1 ? (g.length == 0 && (addTrackDownloadProgressBar($(this)), g = $(this).find(".download-progress")), d > 0 && (g.find(".pending").hide(), g.find(".progress").css("width", d + "%").show())) : (g.remove(), $(this).removeClass("downloading"), c == "Complete" && $(this).addClass("downloaded"), checkPendingDownloads())
      }
    }
  })
}

function checkPendingDownloads() {
  var a = ClientDownloads.pendingTrackDownloadsCount();
  if (a > 0) {
    if (a == 1) var b = ClientLocale.currentlyDownloading + " " + a + " " + ClientLocale.track;
    else b = ClientLocale.currentlyDownloading + " " + a + " " + ClientLocale.tracks;
    b += " <a href='#' id='cancel-all-downloads'>Cancel Downloads</a>", downloadingStarted ? $("#notice").html(b) : (showNotice("status", b, !0), downloadingStarted = !0)
  }
  a == 0 && !doneDownloading && (doneDownloading = !0, b = ClientLocale.downloadsCompleted, $("#notice").html(b), $.doTimeout("", 1500, function () {
    doneDownloading = !1, downloadingStarted = !1, $("#notice").attr("persist", "false"), hideNotice()
  }))
}

function showDownloadedLibraryPage() {
  $("#offline-client-page").removeClass("playlists-page").removeClass("playlist-page").addClass("library-page"), $(".downloaded-playlists-tab").removeClass("selected"), $(".downloaded-library-tab").addClass("selected"), artists = ClientDownloads.artistDownloads(), artist = {}, artists != null ? ($("#list-summary-frame").show(), $("#playlists-section").hide(), $("#library-artist-list").html($.render(artists, "#library-artists-template")), $("#library-artist-list li").first().addClass("selected"), renderDownloadedLibraryPeek(artists[0].id, artists[0].name, offlineLibraryView)) : ($("#list-summary-frame").hide(), $("#playlists-section").show().html("<div style='font-size: 14px; text-align: center; margin: 20px'>" + ClientLocale.noDownloadedTracks + "<br>" + ClientLocale.goDownloadTracks + "</div>"))
}

function showDownloadedPlaylistsPage() {
  playlists = ClientDownloads.playlistDownloads(), $("#offline-client-page").removeClass("library-page").removeClass("playlist-page").addClass("playlists-page"), $(".downloaded-library-tab").removeClass("selected"), $(".downloaded-playlists-tab").addClass("selected"), $("#list-summary-frame").hide(), $("#playlists-section").show(), playlists != null ? $("#playlists-section").html($.render(playlists, "#playlist-index-template")) : $("#playlists-section").html("<div style='font-size: 14px; text-align: center; margin: 20px'>" + ClientLocale.noDownloadedPlaylists + "<br>" + ClientLocale.goDownloadPlaylists + "</div>")
}

function showDownloadedPlaylistPage(a, b) {
  playlist = {}, playlist.tracks = ClientDownloads.playlistTrackDownloads(a), playlist.id = a, playlist.name = b, playlist.duration = getDownloadedPlaylistDuration(playlist.tracks);
  for (var c in playlist.tracks) playlist.tracks[c].duration = secondsToTime(playlist.tracks[c].duration);
  $("#offline-client-page").removeClass("library-page").removeClass("playlists-page").addClass("playlist-page"), $(".downloaded-library-tab").removeClass("selected"), $(".downloaded-playlists-tab").addClass("selected"), $("#playlists-section").html($.render(playlist, "#playlist-page-template"))
}

function getDownloadedTracksForArtist(a) {
  var b = ClientDownloads.artistTrackDownloads(a);
  for (var c in b) b[c].duration = secondsToTime(b[c].duration);
  return b
}

function getDownloadedAlbumsForArtist(a) {
  var b = [],
    c = [];
  for (var d in a) {
    var e = a[d].albumId;
    if (jQuery.inArray(e, c) == -1) {
      var f = {};
      f.tracks = [], f.id = e, f.name = a[d].albumName, f.shortcut = f.id.replace(".", ""), f.image = ClientDownloads.albumImageUrl(f.id), f.artistId = a[d].artistId, f.artistName = a[d].artistName, b.push(f), f.tracks.push(a[d]), c.push(f.id)
    } else b[jQuery.inArray(e, c)].tracks.push(a[d])
  }
  return b
}

function renderDownloadedLibraryPeek(a, b, c) {
  artist.id = a, artist.name = b, artist.image = ClientDownloads.artistImageUrl(artist.id), artist.tracks = getDownloadedTracksForArtist(artist.id), artist.albums = getDownloadedAlbumsForArtist(artist.tracks), $("#library-peek").html($.render(artist, "#library-" + c + "-view-template")), offlineLibraryView = c
}

function renderDownloadedLibraryAlbumPeek(a, b, c) {
  var d = getDownloadedTracksForArtist(artist.id),
    e = getDownloadedAlbumTracks(d, c);
  e.id = c, e.artistId = a, e.artistName = b, e.image = ClientDownloads.albumImageUrl(c), $("#library-peek").html($.render(e, "#library-album-view-template"))
}

function getDownloadedAlbumTracks(a, b) {
  var c = {};
  c.tracks = [];
  var d = [];
  for (var e in a) {
    var f = a[e].albumId;
    f == b && (c.tracks.push(a[e]), c.name = a[e].albumName), jQuery.inArray(f, d) == -1 && d.push(f)
  }
  return c.numAlbums = d.length, c
}

function removeDownloadOffline(a, b, c) {
  if (b == "library-track") ClientDownloads.removeTrackDownloads([c]), a.siblings().length == 0 ? showDownloadedLibraryPage() : a.remove();
  else if (b == "library-artist") deleteDownloadedTracks(ClientDownloads.artistTrackDownloads(c)), showDownloadedLibraryPage();
  else if (b == "library-album") {
    var d = [];
    $(".library-tracks .track-item").each(function () {
      $(this).attr("album_id") == c && d.push($(this).attr("track_id"))
    }), ClientDownloads.removeTrackDownloads(d), showDownloadedLibraryPage()
  } else if (b == "playlist-track") {
    var e = a.parent("ul").attr("playlist_id");
    ClientDownloads.removePlaylistTrackDownloads(e, [c]);
    if (a.siblings().length == 0) ClientDownloads.removePlaylist(e), showDownloadedPlaylistsPage();
    else {
      var f = $(a).attr("duration"),
        g = $(".playlist-page-header .duration").html();
      $(".playlist-page-header .duration").html(subtractFromTotalTime(f, g)), a.remove()
    }
  } else b == "playlist" ? (ClientDownloads.removePlaylist(c), a.siblings().length == 0 ? showDownloadedPlaylistsPage() : a.remove()) : b == "playlist-view" && (ClientDownloads.removePlaylist(c), showDownloadedPlaylistsPage());
  rehideQueueItems()
}

function deleteDownloadedTracks(a) {
  var b = new Array;
  for (var c in a) b.push(a[c].id);
  ClientDownloads.removeTrackDownloads(b)
}

function removeUndownloadedItems() {
  $(".library-tracks .track-item").each(function () {
    $(this).hasClass("downloaded") || $(this).remove()
  }), $("#library-albums .album-item").each(function () {
    $(this).find(".track-item").length == 0 && $(this).remove()
  })
}

function getDownloadedPlaylistDuration(a) {
  var b = 0;
  for (var c in a) b += a[c].duration;
  return secondsToTime(b)
}

function switchToOfflineChrome() {
  $("#nav-browse").hide(), $("#nav-featured").hide(), $("#nav-radio").hide(), $("#nav-my-music").addClass("selected"), $("#footer-follow").hide(), $("#footer-menu").hide(), $("#content-frame").css("padding", "10px 10px 0"), $("#footer-copyright").css("margin-bottom", "8px"), $("#context-menu li.share, #player-options, #queue-save").remove();
  var a = $(".player-album-thumbnail").children("a").html();
  $(".player-album-thumbnail").children("a").replaceWith(a), $("#searchform").hide(), $("#search").css("border", "1px solid #983A01"), $("#offline-notice").show()
}

function enableTemplates() {
  $("#library-artist-list").html($.render([], "#library-artists-template")), $("#playlists-section").html($.render([], "#playlist-page-template")), $("#playlists-section").html($.render([], "#playlist-index-template")), $("#library-peek").html($.render([], "#library-tracks-view-template")), $("#library-peek").html($.render([], "#library-albums-view-template")), $("#library-peek").html($.render([], "#library-album-view-template"))
}

function offlineContextMenu(a, b, c, d) {
  $.Event(b).stopPropagation();
  if ($("#context-menu").is(":visible")) {
    hidePopup();
    return
  }
  var e = $("#context-menu");
  e.data("contextItem", c), e.find("li").hide(), e.find("#queue-link").show();
  var f = $(a).attr("obj_type");
  if (f == "library-artist" || f == "playlist" || f == "playlist-view" || f == "library-album") e.find("#remove-download-link a").first().html(ClientLocale.removeDownloads), e.find("#remove-download-link").show();
  else if (f == "library-track" || f == "playlist-track") e.find("#remove-download-link a").first().html(ClientLocale.removeDownload), e.find("#remove-download-link").show();
  e.find("#queue-link a").first().unbind("click").click(function (a) {
    a.preventDefault(), addToQueue(c), hidePopup()
  }), e.find("#remove-download-link a").show().first().unbind("click").click(function (b) {
    b.preventDefault();
    var c = $(a).parent(),
      d = $(a).attr("obj_type"),
      e = $(a).attr("obj_id");
    removeDownloadOffline(c, d, e), hidePopup()
  }), showPopup(e), e.position({
    my: "left top",
    at: "left bottom",
    of: $(a),
    collision: "flip"
  })
}

function showNoDownloadsMessage() {
  $(".library-page #peek").html("<p>" + ClientLocale.noDownloadedTracks + "</p>"), $(".library-page .list").children().hide()
}

function showNoRecentDownloadsMessage() {
  $("#artist-controls").hide(), $(".library-tracks").hide(), $("#library-recent-view .not-found").hide(), $("#library-recent-view .download-not-found").show()
}

function rehideQueueItems() {
  $("#queue-container li").each(function () {
    var a = trackQueue.getItem($(this).attr("id"));
    if (a) {
      var b = ClientDownloads.tracksCacheState([a.track.id]);
      b[a.track.id] == null && $(this).addClass("not-downloaded").hide()
    }
  }), updatePlayerDisplay()
}

function onMachineNotRegistered(a) {
  a == "Too_Many_Machines" ? clientRegisteredMachinesDialog() : a == "Too_Many_Registrations" ? clientErrorDialog(Locale.messages.authorizeMachineTooManyRegistrations) : clientErrorDialog(Locale.messages.authorizeMachineError)
}

function onOfflinePlaybackExpired() {
  stop(), clientErrorDialog(Locale.messages.offlineTimerError)
}

function clientRegisteredMachinesDialog() {
  var a = "/client/registered_machines";
  $.getJSON(a, function (a) {
    $("#registered-machines").html(""), $.each(a, function (a, b) {
      $("#registered-machines").append($("<div class='machine'><div class='name'>" + b.name + "</div><div class='remove-machine'>" + Locale.messages.deauthorize + "</div></div>").attr("machine_guid", b.machineGuid))
    }), $("#registered-machines").children().length == 0 && $("#registered-machines").append("<div class='no-machines'>" + Locale.messages.noMachinesAuthorized + "</div>")
  }), showDialog($("#client-registered-machines-dialog"))
}

function clientErrorDialog(a) {
  $("#client-error-dialog").find(".error").html(a), showDialog($("#client-error-dialog"))
}

function loadFooter(a) {
  (typeof a == "undefined" || a) && positionFooter(), $("#footer-menu").delegate(".foot-item .top-nav.no-link", "click", function (a) {
    a.stopImmediatePropagation(), a.preventDefault();
    var b = $(this).parents(".foot-menu");
    b.hasClass("menu-open") ? b.removeClass("menu-open") : (hideAllTheMenus(a), b.addClass("menu-open"))
  }), $("#footer-menu").delegate(".foot-menu", "click", function (a) {
    $(this).removeClass("menu-open")
  })
}

function positionFooter() {
  $(window).height() - $("#header").height() - $("#middle").height() - $("#footer").height() - 10 > 0 ? $("#footer").css("margin-top", $(window).height() - $("#header").height() - $("#middle").height() - $("#footer").height() - 10) : $("#footer").css("margin-top", 0)
}

function hideAllTheMenus(a) {
  $("#settings-menu").hide(), $(".foot-menu").removeClass("menu-open"), $("#nav-browse-genre") && ($("#nav-browse-genre").removeClass("menu-open"), $("#nav-browse-genre .options").hide())
}

function contextPlusMenu(a, b, c, d) {
  $.Event(b).stopPropagation();
  if ($("#context-menu").is(":visible")) {
    hidePopup();
    return
  }
  $(a).parents(".album").addClass("selected"), selected_context_item = $(a).parents(".album-item, .track-item"), context_item_origin = $(a);
  var e = $("#context-menu");
  e.data("contextItem", c), e.data("featureModuleId", $(a).parents(".feature-module").attr("id")), e.find("li").show(), lastUsedPlaylist == null || lastUsedPlaylist["id"] == c.id || lastUsedPlaylist["id"] == $("#playlist-id").val() && !! c.length ? (e.find("#add-to-current-playlist-link").hide(), e.find("#add-to-current-playlist-link a").html("Add to 'Current Playlist'").hide()) : (e.find("#add-to-current-playlist-link a").html($.render({
    playlist_name: lastUsedPlaylist.name
  }, Locale.messages.addToPlaylist)).show(), e.find("#add-to-current-playlist-link a").first().unbind("click").click(function (b) {
    b.preventDefault(), addToPlaylist(lastUsedPlaylist.id, c), $(a).parents(".feature-module").first().trigger("menu-add-to-current-playlist", c), hidePopup()
  }), e.find("#add-to-current-playlist-link").show()), d == "player" ? (e.find("#queue-link").hide(), e.find("#view-link").show(), e.find("#view-link a").first().unbind("click").click(function (a) {
    a.preventDefault(), viewInContent(c), hidePopup()
  }), e.find("li.share").data("context", "player")) : (e.find("li.share").data("context", ""), d == "track-list" ? (e.find("li.share").hide(), e.find("#add-to-playlist-link").addClass("bottom")) : e.find("#add-to-playlist-link").removeClass("bottom"), e.find("#queue-link").show(), e.find("#queue-link a").first().unbind("click").click(function (b) {
    b.preventDefault(), addToQueue(c), $(a).parents(".feature-module").first().trigger("menu-add-to-queue", c), hidePopup()
  }), e.find("#view-link").hide(), facebookEnabled() || e.find("#share-on-facebook").hide()), e.find("#add-to-playlist-link").toggle(Account.isLoggedIn()), d == "playlist" && Account.isLoggedIn() && pageNavUrl().indexOf("members") != -1 && !Account.isMyMemberPath() ? (e.find("#copy-playlist-link a").unbind("click").click(function (b) {
    b.preventDefault(), c.name == "Favorites" && (c.member_name ? c.name = c.member_name + "'s Favorites" : c.name = "Favorites Copy"), createPlaylist(c.name, c, !0), $(a).parents(".feature-module").first().trigger("menu-create-playlist", c), hidePopup()
  }).parent().show(), e.find("#add-to-playlist-link").hide()) : e.find("#copy-playlist-link a").parent().hide(), e.find("#add-to-playlist-link a").first().unbind("click").click(function (b) {
    b.preventDefault(), addToPlaylistDialog(c), $(a).parents(".feature-module").first().trigger("menu-add-to-playlist", c), hidePopup()
  }), e.find("#add-to-library-link").show(), e.find("#remove-from-library-link").hide(), c.id && getContentType(c.id) == "playlist" && e.find("#add-to-library-link").hide(), d != "player" && isMyLibraryPage() && (e.find("#add-to-library-link").hide(), e.find("#remove-from-library-link").show()), Account.isLoggedIn() || (e.find("#add-to-library-link").hide(), e.find("#remove-from-library-link").hide()), e.find("#add-to-library-link a").first().unbind("click").click(function (b) {
    b.preventDefault(), Library.add(c, d), $(a).parents(".feature-module").first().trigger("menu-add-to-library", c), hidePopup()
  }), e.find("#remove-from-library-link a").first().unbind("click").click(function (a) {
    a.preventDefault(), a.stopPropagation();
    if ($.type(c) == "array")
      if (selected_context_item.hasClass("album-item")) {
        var b = context_item_origin.closest(".album-item");
        deleteLibraryTracksDialog({
          name: b.find("img").attr("alt"),
          id: b.attr("album_id"),
          albumId: b.attr("album_id")
        })
      } else context_item_origin.parent().siblings(".delete-button").click();
      else Library.removeTracks(selected_context_item.children("div.delete-button"));
    hidePopup()
  }), e.addClass("share").find("li.share").removeClass("only");
  if (typeof ClientDownloads != "undefined" && Account.downloadsAllowed()) {
    if (d == "album") $(a).closest(".album-item").hasClass("downloaded") ? (e.find("#remove-download-link a").first().html(Locale.messages.removeDownloads), e.find("#remove-download-link").show()) : e.find("#remove-download-link").hide(), e.find("#download-link a").first().html(Locale.messages.downloadAlbum), e.find("#download-link").show();
    else if (d == "playlist") $(a).closest(".playlist-item").hasClass("downloaded") ? (e.find("#remove-download-link a").first().html(Locale.messages.removeDownloads), e.find("#remove-download-link").show()) : e.find("#remove-download-link").hide(), e.find("#download-link a").first().html(Locale.messages.downloadPlaylist), e.find("#download-link").show();
    else if (!c.length) $(a).parent().parent().hasClass("downloaded") || $(a).parent().parent().hasClass("downloading") ? (e.find("#remove-download-link a").first().html(Locale.messages.removeDownload), e.find("#remove-download-link").show(), e.find("#download-link").hide()) : (e.find("#download-link a").first().html(Locale.messages.downloadTrack), e.find("#download-link").show(), e.find("#remove-download-link").hide());
    else if ($(a).parent().hasClass("is-library-peek")) {
      var f = showDownloadedTrackStatus();
      f ? $(".is-library-peek").addClass("downloaded") : $(".is-library-peek").removeClass("downloaded"), $(a).parent().hasClass("downloaded") ? (e.find("#remove-download-link a").first().html(Locale.messages.removeDownloads), e.find("#remove-download-link").show()) : e.find("#remove-download-link").hide(), e.find("#download-link a").first().html(Locale.messages.downloadTracks), e.find("#download-link").show()
    } else e.find("#download-link").hide(), e.find("#remove-download-link").hide();
    downloadedOnly && $("#member-hub.library-page").length != 0 && e.find("#download-link").hide()
  } else e.find("#download-link").hide(), e.find("#remove-download-link").hide();
  e.find("#add-to-favorites-link").hide(), e.find("#remove-from-favorites-link").hide(), d == "track" && (Favorites.hasTrack(c.id) ? (e.find("#remove-from-favorites-link").show(), e.find("#remove-from-favorites-link a").first().unbind("click").click(function (b) {
    b.preventDefault(), Favorites.removeTrack(c.id), $(a).parents(".feature-module").first().trigger("menu-remove-from-favorites", c), hidePopup()
  })) : (e.find("#add-to-favorites-link").show(), e.find("#add-to-favorites-link a").first().unbind("click").click(function (b) {
    b.preventDefault(), Favorites.addTrack(c.id, "context-menu"), $(a).parents(".feature-module").first().trigger("menu-add-to-favorites", c), hidePopup()
  }))), e.find("#play-station-link").hide(), e.find("#add-to-my-stations-link").hide(), e.find("#remove-from-my-stations-link").hide(), d == "station" && (e.find("#add-to-current-playlist-link").hide(), e.find("#queue-link").hide(), e.find("#add-to-playlist-link").hide(), Account.isLoggedIn() && (e.find("#play-station-link").show(), e.find("#play-station-link").first().unbind("click").click(function (a) {
    a.preventDefault(), playRadio(c.id, c.name), hidePopup()
  }), isMyStationsPage(pageNavUrl()) || (e.find("#add-to-my-stations-link").show(), e.find("#add-to-my-stations-link a").first().unbind("click").click(function (a) {
    a.preventDefault(), Library.add(c, d), hidePopup()
  })))), $("#top-heading-small").hide(), $("#bottom-heading-small").hide(), $("#top-heading").hide(), $("#top-heading-swap").hide(), $("#bottom-heading").hide(), showPopup(e), e.position({
    my: "left top",
    at: "left top",
    of: $(a),
    offset: "-1px -1px",
    collision: "flip"
  }), $(a).offset().top - e.offset().top < 6 ? $(a).offset().left - e.offset().left > 6 ? ($("#top-heading-swap").show(), e.css("top", e.offset().top - 5), e.css("left", e.offset().left + 4)) : $(a).attr("id") == "player-options" ? ($("#top-heading").show(), e.css("top", e.offset().top - 5), e.css("left", e.offset().left - 5)) : $(a).width() < 25 ? ($("#top-heading-small").show(), e.css("top", e.offset().top - 3), e.css("left", e.offset().left - 2)) : ($("#top-heading").show(), e.css("top", e.offset().top - 5), e.css("left", e.offset().left - 5)) : $(a).width() < 25 ? ($("#bottom-heading-small").show(), e.css("top", e.offset().top - 22), e.css("left", e.offset().left - 5)) : ($("#bottom-heading").show(), e.css("top", e.offset().top - 30), e.css("left", e.offset().left - 5))
}

function deepLinkToGenreArtist(a) {
  var b = a[0],
    c = a[3];
  if (b) {
    var d;
    $("#genre-artists li").removeClass("selected"), c && (d = $("#genre-artist-" + c.replace(".", "_")));
    if (d) {
      d.addClass("selected"), $.doTimeout("loading-timeout", 2e3, function () {
        showActionMessage("loading", Locale.messages.loading)
      });
      var e = b;
      e += getQuerySeparator(e) + $.param(dynamicQueryParams()), $(".genre-page #peek").load(e + " #main-content", function () {
        ignore_push_state = !0, History.replaceState(null, document.title, b), $(".genre-page #peek #main-content").show(), $(this).scrollTop(0), $.doTimeout("loading-timeout"), hideActionMessage(), typeof ClientDownloads != "undefined" && showDownloadedTrackStatus()
      })
    }
  }
}

function getLinkToArtist(a) {
  var b = "";
  if (a.artistId != "Art.0" && a.artistName != "Various Artists") {
    var c = a.trackArtistShortcut || a.artistShortcut || a.artistId || a.artistID;
    c && (b = "/artist/" + c)
  }
  return b
}

function getLinkToAlbum(a) {
  var b = "";
  return a && (b = getLinkToArtist(a), a.albumShortcut ? b += "/album/" + a.albumShortcut : a.albumId && (b += "/album/" + a.albumId)), b
}

function getLinkToTrack(a) {
  var b = "";
  return a.artistId != "Art.0" && (a.artistShortcut ? b += "/artist/" + a.artistShortcut : a.artistId && (b += "/artist/" + a.artistId)), a.albumShortcut ? b += "/album/" + a.albumShortcut : a.albumId && (b += "/album/" + a.albumId), a.trackShortcut ? b += "/track/" + a.trackShortcut : b += "/track/" + a.id.charAt(0).toUpperCase() + a.id.slice(1), b
}

function reportEvent(a, b, c, d) {
  EventReporting.reportEvent({
    event: {
      type: a,
      name: b,
      detail: c
    },
    metadata: d
  })
}

function isMyPlaylistsPage() {
  var a = /^\/members\/(.*)\/playlists/,
    b = a.exec(pageNavUrl());
  return b != null ? b[1] == memberShortcut() : !1
}

function isMyFavoritesPage() {
  var a = /^\/members\/(.*)\/favorites/,
    b = a.exec(pageNavUrl());
  return b != null ? b[1] == memberShortcut() : !1
}

function isArtistPage() {
  var a = /^(\/\#)*\/artist\/(|Art\.)(.*)/i,
    b = a.exec(pageNavUrl());
  return b != null
}

function isMyStationsPage(a) {
  var b = /^\/radio\/(.*)\/stations/,
    c = b.exec(a);
  return c != null ? c[1] == memberShortcut() : !1
}

function isErrorPage() {
  var a = PageMetadata.getMetadata();
  return a.site_section && a["site_section"].toLowerCase() == "error"
}

function isMyLibraryPage() {
  var a = /^\/members\/(.*)\/library/,
    b = a.exec(pageNavUrl());
  return b != null ? b[1] == memberShortcut() : !1
}

function isBlogPostPage(a) {
  var b = /^\/blog\/post/i,
    c = b.exec(a);
  return c != null
}

function getSettings(a) {
  var b = null;
  try {
    b = JSON.parse(window.localStorage.getItem("settings_" + a))
  } catch (c) {}
  return b == null && (b = {
    keyboardShortcuts: null
  }, saveSettings(a, b)), b
}

function saveSettings(a, b) {
  window.localStorage.setItem("settings_" + a, JSON.stringify(b))
}

function switchTitles(a) {
  var b = $(a).attr("data-alt"),
    c = $(a).html();
  $(a).html(b).attr("data-alt", c)
}

function toggleKeyboardShortcuts(a) {
  if (Account.isLoggedIn()) {
    var b = getSettings(Account.username);
    b.keyboardShortcuts ? (b.keyboardShortcuts = !1, saveSettings(Account.username, b), switchTitles(a)) : (b.keyboardShortcuts = !0, saveSettings(Account.username, b), switchTitles(a))
  }
}

function playSamplesMode() {
  playbackSamples = !0, MiniPlayer.playSamples = !0, $("#player-next").addClass("disabled").animate({
    opacity: .7
  }), $("#player-previous").addClass("disabled").animate({
    opacity: .7
  })
}

function showSignedIn() {
  var a = Account.smartTruncateEmailAddress(Account.username);
  $("#settings-menu .title").html(a), Account.username.length > a.length && $("#settings-menu .title").attr("title", Account.username), $(".signed-in-only").show(), $(".signed-out-only").hide()
}

function showTrialCountdown() {
  $("#player-trial-countdown").append("Your trial ends in " + Account.getProperties().trialDaysLeft + ' days.<a href="/0d"> Sign up now</a>')
}

function showSuspendedDialog() {
  var a = $("#user-account-suspended");
  showDialog(a), a.find(".close-button").first().unbind("click").click(function (a) {
    hideDialog()
  })
}

function showPopup(a) {
  active_popup != null && active_popup.hide(), active_popup = a, a.show()
}

function hidePopup() {
  active_popup != null && active_popup.hide(), active_popup = null
}

function showDialog(a, b) {
  active_dialog != null && active_dialog.hide(), active_dialog = a, $("#knockout").css("opacity", .5).show(), a.show(), active_dialog_parent = b != null ? b : "#main-container", a.position({
    my: "center center",
    at: "center center",
    of: active_dialog_parent
  }), a.offset({
    top: a.offset().top,
    left: a.offset().left + 10
  })
}

function hideDialog() {
  active_dialog != null && (active_dialog.attr("id") == "rhapsody-survey-dialog" && $("#rhapsody-survey-dialog iframe").remove(), active_dialog.hide()), $("#knockout").hide(), active_dialog = null
}

function showNotice(a, b, c) {
  $("#notice").attr("persist", c || !1 ? "true" : "false").html(b || Locale.layoutMessage.errorLoad), $("#notice").removeClass().addClass(a), $("#noticebox").show(), resizeFrame()
}

function hideNotice() {
  var a = $("#notice").attr("persist") == "false";
  a && ($("#noticebox").hide(), resizeFrame())
}

function showActionMessage(a, b) {
  $("#actionmessage").html(b), $("#actionmessage").removeClass().addClass(a), $("#actionmessagebox").fadeIn()
}

function hideActionMessage() {
  $("#actionmessagebox").fadeOut()
}

function tracksFromItemList(a) {
  var b = new Array;
  return $.each($(a).children(), function (a, c) {
    var d = trackFromAttributes(c);
    b.push(d)
  }), b
}

function streamableTracksFromItemList(a) {
  var b = new Array;
  return $.each($(a).children(), function (a, c) {
    var d = trackFromAttributes(c);
    d.streamable && b.push(d)
  }), b
}

function radioFromItem(a) {
  var b = $(a).parents(".radio-station-item"),
    c = b.attr("radio_id"),
    d = {
      id: c,
      name: b.attr("radio_name"),
      href: "/radio/station/" + c
    };
  return d
}

function viewInContent(a) {
  var b = getLinkToTrack(a);
  closeQueue(), navigateToPage(b)
}

function getContentType(a) {
  var b = "";
  if (a) {
    var c = /([^\.]*)\./.exec(a);
    if (c && c.length > 1) {
      var d = c[1];
      switch (d.toLowerCase()) {
      case "alb":
        b = "album";
        break;
      case "tra":
        b = "track";
        break;
      case "art":
        b = "artist";
        break;
      case "mp":
      default:
        b = "playlist"
      }
    }
  }
  return b
}

function addToQueue(a) {
  if (a.length) queueTrackDataList(a);
  else {
    var b = getContentType(a.id);
    b == "track" ? queueTrack(a) : b == "album" ? queueAlbum(a) : queuePlaylist(a)
  }
}

function versionUpdateReloadDialog(a) {
  $("#version-update-reload-dialog").show(), $("#version-update-reload-dialog").position({
    my: "center center",
    at: "center center",
    of: "#main-container"
  })
}

function userNotValidDialog() {
  showDialog($("#user-not-valid-dialog")), $("#user-not-valid-dialog").find(".dialog-buttons .signin").first().unbind("click").click(function (a) {
    hideDialog(), logUserOut(), window.location = "/authentication/login" + addGoToQueryString(pageNavUrl())
  }), $("#user-not-valid-dialog").find(".dialog-buttons .cancel").first().unbind("click").click(function (a) {
    hideDialog(), logUserOut(), window.location = "/#", window.location.reload(!0)
  })
}

function tokenNotValidDialog() {
  showDialog($("#token-not-valid-dialog")), $("#token-not-valid-dialog").find(".dialog-buttons .signin").first().unbind("click").click(function (a) {
    hideDialog(), logUserOut(), window.location = "/authentication/login" + addGoToQueryString(pageNavUrl())
  }), $("#token-not-valid-dialog").find(".dialog-buttons .cancel").first().unbind("click").click(function (a) {
    hideDialog(), logUserOut(), window.location = "/#", window.location.reload(!0)
  })
}

function addGoToQueryString(a) {
  var b = a.substring(0, a.indexOf("?")),
    c = a.substring(a.indexOf("?"));
  return "/?goto=" + encodeURIComponent(b + c)
}

function queueLimitDialog(a) {
  showDialog($("#queue-limit-dialog")), $("#queue-limit-dialog").find(".dialog-buttons .replace").first().unbind("click").click(function (b) {
    hideDialog(), trackQueue.clear(), a({
      replacedQueue: !0
    })
  }), $("#queue-limit-dialog").find(".dialog-buttons .cancel").first().unbind("click").click(function (b) {
    hideDialog(), a({
      replacedQueue: !1
    })
  })
}

function logUserOut() {
  Account.logout(), deleteCookie("miniPlayer")
}

function scrollToSelectedTrack() {
  if ($("#album-tracks .selected").length > 0) {
    var a = $("#album-tracks .selected").data("position");
    a || (a = $("#album-tracks .selected").position().top - 10, $("#album-tracks .selected").data("position", a)), $("#content-frame").animate({
      scrollTop: a
    }, "slow")
  }
}

function resetPageContent() {
  scrollToSelectedTrack()
}

function refresh() {
  var a = !0;
  return !MiniPlayer.stopped && !MiniPlayer.paused ? versionUpdateReloadDialog() : window.location.reload(), !1
}

function initializePublishListening() {
  togglePublishListeningText(getScrobblingFlag()), Account.isLoggedIn() && Account.properties.facebookId ? $("#publish-listening").show() : $("#publish-listening").hide()
}

function togglePublishListeningText(a) {
  a ? $("#publish-listening a").text("Stop Publishing to Facebook") : $("#publish-listening a").text("Start Publishing to Facebook")
}

function smallPlayer() {
  $("#player").removeClass("player-large"), $("#player").addClass("player-small")
}

function bigPlayer() {
  $("#player").removeClass("player-small"), $("#player").addClass("player-large")
}

function calculate_element_vertical_space(a) {
  var b = 0;
  if (a.is(":visible")) {
    var c = a.css("margin-top");
    c == "auto" ? c = 0 : c = parseInt(c);
    var d = a.css("margin-bottom");
    d == "auto" ? d = 0 : d = parseInt(d), b = a.outerHeight() + c + d
  }
  return b
}

function resizeFrame() {
  var a = $(window).height(),
    b = $(window).width(),
    c = 10;
  a < 650 ? ($("body").addClass("squeeze-layout"), $("#upsell").attr("style", "border-radius: 0;"), $("#player-queue").attr("style", "border-radius: 0;"), $("#player-error").height(104), $("#player-error-background").height(124), c = 0) : ($("#player-error").height(160), $("#player-error-background").height(180), $("#player-error"), $("body").removeClass("squeeze-layout"), $("#upsell").attr("style", "border-radius: 0;"), $("#player-queue").attr("style", "border-radius: 0;"));
  var d = calculate_element_vertical_space($("#noticebox")),
    e = calculate_element_vertical_space($("#tophat")),
    f = calculate_element_vertical_space($("#tophat-upsell")),
    g = calculate_element_vertical_space($("#tour-container")),
    h = calculate_element_vertical_space($("#billboard")),
    i = calculate_element_vertical_space($("#upsell")),
    j = d + e + f + g + h > 0,
    k = calculate_element_vertical_space($("#header")),
    l = calculate_element_vertical_space($("#footer"));
  $("#main-frame").css("height", a - k - d - e - f - g - l - 2), $("#content-frame").length > 0 && $("#content-frame").css("height", $("#main-frame").height() - $("#content-header").outerHeight() - ($("#content-frame").outerHeight() - $("#content-frame").height())), $("#list-content-frame").length > 0 && $("#list-content-frame").css("height", $("#main-frame").height() - $("#content-header").height() - 8);
  if ($("#fb-send-placeholder").length > 0) {
    var m = $("#share-button").offset();
    $("#fb-send").css("top", m.top).css("left", m.left - 60)
  }
  j ? $("#player-queue").css("height", $("#middle").height() - c) : $("#player-queue").css("height", $("#main-frame").height() - c);
  var n = 250,
    o = 100,
    p = 175,
    q = a - k - l - c,
    r = q - i - h;
  $("#queue").is(":visible") && (r -= p), r > n ? bigPlayer() : smallPlayer();
  var s = calculate_element_vertical_space($("#player")),
    t = calculate_element_vertical_space($("#queue-header"));
  if ($("#queue").is(":visible")) {
    var u = q - i - h - s - t - 2;
    u > 100 ? ($("#queue-frame").css("height", u), queue_minified = !1, $("#queue-minified").hide(), $("#queue-frame").show()) : $("#billboard").is(":visible") && (queue_minified = !0, $("#queue-frame").hide(), $("#queue-pointer-top, #queue-pointer-bottom").hide(), trackQueue && trackQueue.getItems().length < 1 ? $("#queue-minified").hide() : $("#queue-minified").show()), updateQueuePointer()
  }
  active_dialog != null && (active_dialog.position({
    my: "center center",
    at: "center center",
    of: active_dialog_parent
  }), active_dialog.offset({
    top: active_dialog.offset().top,
    left: active_dialog.offset().left + 10
  })), checkPeopleListTextHeights()
}

function showEditorial() {
  var a = $("#editorial-feature-content .editorial-feature-message"),
    b = Math.floor(Math.random() * a.length),
    c = a.eq(b, 1);
  a.hide(), c.show()
}

function showUpsell() {
  var a = $("#upsell-content .upsell-message"),
    b = Math.floor(Math.random() * a.length),
    c = a.eq(b, 1);
  a.hide(), c.show()
}

function updateUpsell() {
  $("#upsell").is(":visible") && (updateUpsellCounter++, updateUpsellCounter >= 5 && (updateUpsellCounter = 0, showRandomElement($("#upsell-content .upsell-message"))))
}

function updateHeaderMenu(a) {
  if (a) var b = $("#" + a);
  else {
    var c = PageMetadata.getMetadata().site_section;
    c == "featured" && (b = $("#nav-featured"));
    if (c == "genre" || c == "artist" || c == "album" || c == "browse") b = $("#nav-browse");
    c == "radio" && (b = $("#nav-radio")), c == "members" && (b = $("#nav-my-music"))
  }
  b ? b.addClass("selected").siblings().removeClass("selected") : $("#header-nav").children().removeClass("selected")
}

function hideAllTheThings(a) {
  selected_context_item && selected_context_item.hasClass("album") && (selected_context_item.removeClass("selected"), selected_context_item.find(".play-button, .options-button").stop(!0, !0).fadeOut(150), selected_context_item.find("img").css("opacity", 1), selected_context_item = null), $(".playlist-page") && $(a.target).parents("h3").length == 0 && ($(".playlist-page h3 .rename-playlist").show(), $(".playlist-page h3 .edit-form").remove()), typeof offlineMode == "undefined" && ($(a.target).parents("#search").length == 0 ? ($("#searchbox").val(Locale.searchMessages.search), $("#searchbox").addClass("default")) : $(a.target).attr("id") == "searchbutton" && ($("#searchbox").val(Locale.searchMessages.search), $("#searchbox").addClass("default"))), active_popup != null && $(a.target).parents(active_popup.selector).length == 0 && hidePopup(), $("#favorites-introduction").is(":visible") && a.target.id != "player-favorite" && $(a.target).closest("#favorites-introduction").length == 0 && $("#favorites-introduction").fadeOut(), hideAllTheMenus(a)
}

function deleteLibraryTracksDialog(a) {
  var b = "";
  a.name ? b = Locale.messages.removeAllTracksForFromLibrary.replace("%{item}", "<span>" + a.name + "</span>") : b = Locale.messages.removeAllTracksFromibrary, $("#delete-library-tracks-dialog .text").html(b), $("#delete-library-tracks-dialog").data("item", a), showDialog($("#delete-library-tracks-dialog"))
}

function deepLinkToLibraryArtist(a) {
  var b = a[0],
    c = a[2],
    d = b;
  if (b) {
    Account.isMyMemberPath(b) && (d += getQuerySeparator(d) + "me=true"), d += getQuerySeparator(d) + $.param(dynamicQueryParams());
    var e;
    $("#library-artist-list li").removeClass("selected"), $("#library-recent-list li").removeClass("selected"), c && (e = $("#library-artist-item-" + c.replace(".", "_")));
    if (e.length) e.addClass("selected"), $.doTimeout("loading-timeout", 2e3, function () {
      showActionMessage("loading", Locale.messages.loading)
    }), $(".library-page #peek").load(d + " #main-content", function () {
      $.browser.msie || (ignore_push_state = !0, d.indexOf("/album/") != -1 ? History.pushState(null, document.title, b) : History.replaceState(null, document.title, b), ignore_push_state = !1), $(".library-page #peek #main-content").show(), $(this).scrollTop(0), $.doTimeout("loading-timeout"), hideActionMessage(), Account.properties["experienceType"] == "expired" && ($("#main-content").find(".play-button").css("opacity", .5), $("#main-content").find(".play-button a").hover(function () {
        $(this).css("cursor", "none"), $(this).css("background-position", "0 0")
      }));
      if (typeof ClientDownloads != "undefined") {
        var a = showDownloadedTrackStatus();
        a && $(".is-library-peek").addClass("downloaded"), downloadedOnly && removeUndownloadedItems()
      }
    });
    else return;
    var f = a[0].match(/\/(albums|tracks)$/);
    f && f.length > 0 && $("#library-artist-list li a").each(function () {
      $(this).attr("href", $(this).attr("href").replace(/\/(albums|tracks)$/, f[0]))
    })
  }
}

function deepLinkToLibraryRecent(a) {
  var b = a[0],
    c = b,
    d = a[2];
  b && ($("#library-artist-list li").removeClass("selected"), $("#library-recent-list li").removeClass("selected"), selectedItem = $("#library-recent-item-" + d), selectedItem.length && selectedItem.addClass("selected"), Account.isMyMemberPath(b) && (c += getQuerySeparator(c) + "me=true"), c += getQuerySeparator(c) + $.param(dynamicQueryParams()), $.doTimeout("loading-timeout", 2e3, function () {
    showActionMessage("loading", Locale.messages.loading)
  }), $(".library-page #peek").load(c + " #main-content", function () {
    ignore_push_state = !0, History.replaceState(null, document.title, b), $(".library-page #peek #main-content").show(), $(this).scrollTop(0), $.doTimeout("loading-timeout"), hideActionMessage();
    if (typeof ClientDownloads != "undefined") {
      var a = showDownloadedTrackStatus();
      downloadedOnly && ($(".library-tracks .track-item.downloaded").length ? removeUndownloadedItems() : showNoRecentDownloadsMessage())
    }
  }))
}

function updateSelectedLibraryArtist() {
  if ($("#library-artist-list").children().length <= 1) loadDynamicPage("/members/" + memberShortcut() + "/library");
  else {
    var a = $("#library-artist-id").val(),
      b = $("#library-artist-item-" + a.replace(".", "_"));
    typeof ClientDownloads != "undefined" && downloadedOnly ? b.prevAll("li.downloaded").length > 0 ? navigateToPage(b.prevAll("li.downloaded:first").find("a").attr("href")) : b.nextAll("li.downloaded").length > 0 && navigateToPage(b.nextAll("li.downloaded:first").find("a").attr("href")) : b.prev().length > 0 ? navigateToPage(b.prev().find("a").attr("href")) : b.next().length > 0 && navigateToPage(b.next().find("a").attr("href")), b.slideUp("normal", function () {
      $(this).remove()
    })
  }
}

function trialSignupFacebookConnect(a) {
  var b = FB.getAuthResponse();
  b && b.userID && ($("<input>").attr({
    type: "hidden",
    name: "signup[facebookId]",
    value: b.userID
  }).appendTo(a.find("form")), $("<input>").attr({
    type: "hidden",
    name: "signup[facebookToken]",
    value: b.accessToken
  }).appendTo(a.find("form")), FB.api("/me", function (c) {
    a.find(".trial-facebook-connect").hide(), a.find(".trial-facebook-user .name").html(c.name), a.find(".trial-facebook-user img").attr("src", "http://graph.facebook.com/" + b.userID + "/picture?type=square"), a.find(".trial-facebook-user").show(), a.find("input.email").val(c.email), c.gender == "male" ? a.find(".gender input").slice(0, 1).attr("checked", !0) : c.gender == "female" && a.find(".gender input").slice(1, 2).attr("checked", !0), $("<input>").attr({
      type: "hidden",
      name: "signup[realName]",
      value: c.name
    }).appendTo(a.find("form")), a.find(".field input").each(function () {
      $(this).val() == "" ? $(this).parent().find("label.default").show() : $(this).parent().find("label.default").hide()
    })
  }))
}

function trialSignupDialog() {
  $("#trial-signup-dialog").load("/play_upsell", {}, function (a) {
    if (a.length > 0) {
      var b = $("#trial-signup-dialog");
      showDialog(b, "#container"), reportEvent("Sign-up Prompt"), b.find(".close-button").first().unbind("click").click(function (a) {
        hideDialog()
      })
    }
  })
}

function freePlayNagPopup(a, b) {
  var c = $("#free-play-nag-popup");
  showPopup(c), c.position({
    my: "left top",
    at: "left bottom",
    of: a,
    offset: "-36 -5"
  });
  var d = c.offset().top > a.offset().top;
  c.find(".top-arrow").toggle(d), c.find(".bottom-arrow").toggle(!d), c.find(".close-button").first().unbind("click").click(function (a) {
    hidePopup()
  })
}

function freeQueueNagPopup(a, b) {
  var c = $("#free-queue-nag-popup");
  showPopup(c), c.position({
    my: "left top",
    at: "left bottom",
    of: a,
    offset: "-38 -5"
  });
  var d = c.offset().top > a.offset().top;
  c.find(".top-arrow").toggle(d), c.find(".bottom-arrow").toggle(!d), c.find(".close-button").first().unbind("click").click(function (a) {
    hidePopup()
  })
}

function radioPlayNagPopup(a, b) {
  var c = $("#radio-play-nag-popup");
  showPopup(c), c.position({
    my: "left bottom",
    at: "left top",
    of: a,
    offset: "-35 5",
    collision: "none"
  });
  var d = c.offset().top > a.offset().top;
  c.find(".top-arrow").toggle(d), c.find(".bottom-arrow").toggle(!d), c.find(".close-button").first().unbind("click").click(function (a) {
    hidePopup()
  })
}

function radioPlayExpiredNagPopup(a, b) {
  var c = $("#radio-play-expired-nag-popup");
  showPopup(c), c.position({
    my: "left top",
    at: "left bottom",
    of: a,
    offset: "-36 -5"
  });
  var d = c.offset().top > a.offset().top;
  c.find(".top-arrow").toggle(d), c.find(".bottom-arrow").toggle(!d), c.find(".close-button").first().unbind("click").click(function (a) {
    hidePopup()
  })
}

function sidedoorDialog(a, b) {
  var c = Locale.messages.thisArtist;
  $(".page-title").length > 0 && (c = $(".page-title").text());
  var d = $("#artist-image .image").attr("style"),
    e = artistWatermark;
  d && (e = d.substring(d.indexOf("(") + 1, d.indexOf(")"))), $(a).find(".image").attr("style", "background: url(" + e + ") no-repeat");
  var f = Locale.messages.listenToArtist;
  Locale.isMtv() && (f = $(a).find(".content .text .listento-header").text()), $(a).find(".content .text .listento-header").text($.render({
    artist_name: c
  }, f)), b && $(a).find(".content .text p").text(b), showDialog($(a), "#container"), $(a).find(".close-button").first().unbind("click").click(function (a) {
    hideDialog()
  }), $(a).find(".continue-link").first().unbind("click").click(function (a) {
    hideDialog()
  })
}

function rhapsodySurveyDialog() {
  $("#rhapsody-survey-dialog iframe").get(0).contentWindow.location.replace("https://questionpro.com/t/ADcR7ZN81M?custom1=" + Account.getProperties().guid), showDialog($("#rhapsody-survey-dialog"), "#container"), Account.setUserPreference("marketingSurveyShown"), $("#rhapsody-survey-dialog").find(".close-button").first().unbind("click").click(function (a) {
    hideDialog()
  })
}

function doPeriodicTrialDialogPopOnPlayback() {
  return (!readCookie("token") || readCookie("token") === "") && Account.getProperties().screenname ? (tokenNotValidDialog(), !0) : Account.getProperties()["experienceType"] != "free" || !Locale.showsTrialSignupDialog() ? !1 : free_play_count >= free_play_periodic_upsell_count - 1 ? (free_play_count = 0, trialSignupDialog(), !0) : (free_play_count++, !1)
}

function setMyMusicLinks() {
  var a = $("#nav-my-music a").attr("href"),
    b = a.match(/\/members\/([^\/]+)\/*.*/);
  b && $("#nav-my-music a").attr("href", a.replace(b[1], memberShortcut()))
}

function reloadWithShortcut() {
  var a = pageNavUrl().split("/");
  if (a) {
    var b = pageNavUrl().replace(a[2], memberShortcut());
    b != pageNavUrl() ? navigateToPage(b) : loadDynamicPage(b)
  }
}

function memberShortcut() {
  return readCookie("id")
}

function showLoginButton() {
  (Account.properties["facebookId"] == null || Account.properties["facebookId"] == "") && $("#profile-facebook-connect-button").show()
}

function saveFacebookCreds(a, b, c, d) {
  memberSettingsData.facebookId = a, memberSettingsData.facebookToken = b, memberSettingsData.realName = c, memberSettingsData.gender = d
}

function removeFacebookCreds() {
  memberSettingsData.facebookId = Account.properties.facebookId, memberSettingsData.facebookToken = "", memberSettingsData.realName = Account.properties.realName, memberSettingsData.gender = Account.properties.gender
}

function facebookEnabled() {
  return typeof FB != "undefined" && typeof FB.init != "undefined"
}

function initializeEditProfileButton() {
  $.get("/members/" + memberShortcut() + ".json?me=true", function (a, b) {
    b == "success" && (a.visibility == "public" ? Locale.isNapster() ? $("#napster-connected-icon").show() : $("#rhapsody-connected-icon").show() : Locale.isNapster() ? $("#napster-connect-icon").show() : $("#rhapsody-connect-icon").show(), Account.properties["facebookId"] == null || Account.properties["facebookId"] == "" ? $("#facebook-connect-icon").show() : $("#facebook-connected-icon").show())
  })
}

function subscribeToEmail() {
  $.ajax({
    type: "POST",
    url: "/members/" + memberShortcut() + "/subscribe"
  })
}

function showMemberSettings() {
  $(".error").hide(), $("#member-screenname input").val(memberShortcut()), Account.properties.facebookId && (memberSettingsData.facebookId = Account.properties.facebookId, memberSettingsData.realName = Account.properties.realName), $.get("/members/" + memberShortcut() + ".json?me=true", function (a, b) {
    $("#member-screenname input").val(a.screenname), $("#member-real-name input").val(a.name), $("#member-bio textarea").val(a.bio), $("#member-terms-box").attr("checked", "checked"), memberSettingsData.scrobblingEnabled = a.scrobbling_enabled, memberSettingsData.scrobblingEnabled == null && (memberSettingsData.scrobblingEnabled = "true"), a.visibility == "private" || a.visibility == null ? (Locale.isNapster() ? ($("#napster-connect-logo").show(), $("#napster-connected-logo").hide()) : ($("#rhapsody-connect-logo").show(), $("#rhapsody-connected-logo").hide()), $("#connect-rhapsody-no").attr("checked", !0), $("#member-real-name input").attr("disabled", "disabled").css("opacity", ".6"), $("#member-bio textarea").attr("disabled", "disabled").css("opacity", ".6")) : (Locale.isNapster() ? ($("#napster-connected-logo").show(), $("#napster-connect-logo").hide()) : ($("#rhapsody-connected-logo").show(), $("#rhapsody-connect-logo").hide()), $("#connect-rhapsody-yes").attr("checked", !0)), a.visibility != null && $("#member-terms-agree").hide(), $("#member-profile-dialog .address-end").html($("#member-screenname input").attr("value")), facebookEnabled() ? (FB.api("/me", function (a) {}), memberSettingsData.facebookId == null || memberSettingsData.facebookId == "" ? showUnconnectedModule() : showConnectedModule()) : ($("#facebook-connect-container").hide(), displayMemberSettings())
  })
}

function displayMemberSettings() {
  showDialog($("#member-profile-dialog"), "#container"), $("#member-profile-dialog").delegate("#member-screenname input", "blur", function () {
    $(this).val() == "" && $(this).val(data.screenname)
  })
}

function connectFacebook(a) {
  FB.login(function (b) {
    b.authResponse ? (access_token = b.accessToken, FB.api("/me", function (b) {
      saveFacebookCreds(b.id, access_token, b.name, b.gender), a == "settings-page" ? showConnectedModule() : (a == "profile-page" || a == "welcome-page") && showMemberSettings()
    })) : a == "settings-page" && showUnconnectedModule()
  }, {
    scope: FacebookHelper.requiredPermissions.join(",")
  })
}

function loginFacebook() {
  FB.login(function (a) {
    a.authResponse ? reloadWithShortcut() : showUnconnectedModule()
  }, {
    scope: FacebookHelper.requiredPermissions.join(",")
  })
}

function clearFacebookId() {
  FB.logout(function (a) {}), showUnconnectedModule(), memberSettingsData.facebookId = facebookData.facebookId = "", memberSettingsData.facebookToken = facebookData.facebookToken = ""
}

function toggleMemberFollowButtons(a) {
  if (Account.isLoggedIn()) {
    var b = a.find(".follow-toggler");
    $.get("/members/" + memberShortcut() + "/people/following.json?me=true", function (a, c) {
      c == "success" && (b.each(function () {
        $.inArray($(this).attr("screenname"), a) != -1 && ($(this).toggleClass("following", !0), $(this).attr("title", Locale.messages.stopFollowing + $(this).attr("screenname")), $(this).text(Locale.messages.unfollow))
      }), b.show())
    })
  }
}

function showConnectedModule() {
  if (!memberSettingsData.facebookId) {
    showUnconnectedModule();
    return
  }
  $("#facebook-connect-logo").hide(), $("#facebook-connected-logo").show(), $("#facebook-connect-container .unconnected").hide(), $("#facebook-connect-container .connected").show(), $(".connected .profile-pic").attr("src", "http://graph.facebook.com/" + memberSettingsData.facebookId + "/picture?type=square"), $("#member-real-name input").val(memberSettingsData.realName), $(".connected .profile-name").html(memberSettingsData.realName), memberSettingsData.scrobblingEnabled == "true" ? $(".connected input").attr("checked", "checked") : $(".connected input").removeAttr("checked"), $("#member-real-name").hide(), $("#member-profile-dialog").css("display") == "none" && displayMemberSettings()
}

function showUnconnectedModule() {
  $("#facebook-connected-logo").hide(), $("#facebook-connect-logo").show(), $("#facebook-connect-container .connected").hide(), $("#facebook-connect-container .unconnected").show(), $("#member-real-name").show(), $("#member-profile-dialog").css("display") == "none" && displayMemberSettings()
}

function memberSettingsValidation() {
  var a = !0;
  return noSpacesOrSpecialChars($("#member-screenname input").val()) ? $("#member-screenname .error").slideUp("fast").text("") : a = !1, stringLength($("#member-bio textarea").val(), 150) ? $("#member-bio .error").slideUp("fast").text("") : a = !1, termsChecked() ? $("#member-terms-agree .error").slideUp("fast").text("") : a = !1, nameRequired() ? $("#member-real-name .error").slideUp("fast").text("") : a = !1, a ? !0 : !1
}

function noSpacesOrSpecialChars(a) {
  var b = /^[a-zA-Z\d]+$/;
  return b.test(a) ? !0 : ($("#member-screenname .error").text(Locale.messages.noSpecialChar).slideDown("fast"), !1)
}

function stringLength(a, b) {
  return a.length > b && $("#connect-rhapsody-yes").is(":checked") ? ($("#member-bio .error").text(Locale.messages.fieldLength.replace("%{field_length}", b)).slideDown("fast"), !1) : !0
}

function termsChecked() {
  return $("#member-terms-box").is(":checked") ? !0 : ($("#member-terms-agree .error").text(Locale.messages.termsOfUse).slideDown("fast"), !1)
}

function nameRequired() {
  return $("#connect-rhapsody-yes").is(":checked") && $("#member-real-name input").val() == "" ? ($("#member-real-name .error").text(Locale.messages.nameRequired).slideDown("fast"), !1) : !0
}

function checkPeopleListTextHeights() {
  $(".people-list .text").each(function () {
    $(this).css("height") > "18px" && $(this).css("margin-top", "8px"), $(this).css("height") > "36px" && $(this).css("margin-top", "0").css("line-height", "16px")
  })
}

function ControlVersion() {
  var a, b, c;
  try {
    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), a = b.GetVariable("$version")
  } catch (c) {}
  if (!a) try {
    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), a = "WIN 6,0,21,0", b.AllowScriptAccess = "always", a = b.GetVariable("$version")
  } catch (c) {}
  if (!a) try {
    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"), a = b.GetVariable("$version")
  } catch (c) {}
  if (!a) try {
    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"), a = "WIN 3,0,18,0"
  } catch (c) {}
  if (!a) try {
    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), a = "WIN 2,0,0,11"
  } catch (c) {
    a = -1
  }
  return a
}

function GetSwfVer() {
  var a = -1;
  if (navigator.plugins != null && navigator.plugins.length > 0) {
    if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
      var b = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "",
        c = navigator.plugins["Shockwave Flash" + b].description,
        d = c.split(" "),
        e = d[2].split("."),
        f = e[0],
        g = e[1],
        h = d[3];
      h == "" && (h = d[4]), h[0] == "d" ? h = h.substring(1) : h[0] == "r" && (h = h.substring(1), h.indexOf("d") > 0 && (h = h.substring(0, h.indexOf("d"))));
      var a = f + "." + g + "." + h
    }
  } else navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1 ? a = 4 : navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1 ? a = 3 : navigator.userAgent.toLowerCase().indexOf("webtv") != -1 ? a = 2 : isIE && isWin && !isOpera && (a = ControlVersion());
  return a
}

function FacebookOneclickOnboardingDialog() {
  showDialog($("#facebook-oneclick-onboarding-dialog")), $("#facebook-oneclick-onboarding-dialog").find(".email").html(Account.getProperties().email), $("#facebook-oneclick-onboarding-dialog").find(".onboarding-sign-in").attr("href", "/authentication/login?goto=" + encodeURIComponent(document.location)), $("#facebook-oneclick-onboarding-dialog").find(".dialog-buttons").first().unbind("click").click(function (a) {
    hideDialog()
  })
}

function FacebookOneclickOnboardingExistedDialog() {
  showDialog($("#facebook-oneclick-onboarding-existed-dialog")), $("#facebook-oneclick-onboarding-existed-dialog").find(".close-button").first().unbind("click").click(function (a) {
    hideDialog()
  }), $("#facebook-oneclick-onboarding-existed-dialog").find(".dialog-buttons").first().unbind("click").click(function (a) {
    window.location = "/authentication/login?goto=" + encodeURIComponent(document.location)
  })
}

function CloudSyncOnboardingDialog() {
  showDialog($("#cloud-sync-onboarding-dialog"), "#container"), $("#cloud-sync-onboarding-dialog").find(".close-button").first().unbind("click").click(function (a) {
    hideDialog()
  }), $("#cloud-sync-onboarding-dialog").find(".dialog-buttons").first().unbind("click").click(function (a) {
    hideDialog()
  })
}

function FacebookOneclickOnboardingCheck() {
  var a = readCookie("ob-facebook-oneclick");
  a && Account.isLoggedIn() && (deleteCookie("ob-facebook-oneclick"), a == "ob-facebook-oneclick-existed" ? FacebookOneclickOnboardingExistedDialog() : FacebookOneclickOnboardingDialog())
}

function CloudSyncOnboardingCheck() {
  readCookie("cloudsync_ob") && (CloudSyncOnboardingDialog(), deleteCookie("cloudsync_ob"))
}

function NewUserOnboardingCheck() {
  Account.isLoggedIn() && (!Account.getUserPreference("tourShown") && Account.properties["accountType"] != "RHAPSODY_25" && Locale.showsOnboarding() && Account.getProperties().accountAge <= 1 ? (showOnboardingTour(), Account.setUserPreference("tourShown"), loadAdvertisements(Account.getProperties().experienceType, "billboard")) : loadAdvertisements(Account.getProperties().experienceType))
}

function DesktopOnboardingCheck() {
  Locale.supportsThinClient() && typeof ClientDownloads != "undefined" && (Account.getUserPreference("clientOnboardingShown") || (DesktopOnboardingDialog(), Account.setUserPreference("clientOnboardingShown")))
}

function DesktopOnboardingDialog() {
  showDialog($("#desktop-dialog"), "#container");
  if (typeof ClientDeviceSync != "undefined") {
    var a = Account.getProperties().accountType;
    ClientDeviceSync.isSupported() && (a == "RHAPSODY_TOGO" || a == "RHAPSODY_PREMIER") && $(".device-sync-text").show()
  }
  $("#desktop-dialog").find(".close-button").first().unbind("click").click(function (a) {
    hideDialog()
  }), $("#desktop-dialog").find(".dialog-buttons").first().unbind("click").click(function (a) {
    hideDialog()
  })
}

function NavigationTracker() {
  this.request = null, this.abortPrevious = function () {
    this.request && this.request.abort()
  }
}

function pageNavUrl() {
  var a = History.getState().url,
    b = document.location,
    c = b.protocol + "//" + b.host;
  return a = a.replace(c, ""), a
}

function urlPath(a) {
  return a.split("?")[0]
}

function urlQuery(a) {
  var b = a.split("?"),
    c = "";
  return b[1] && (c = "?" + b[1]), c
}

function navigateToPage(a) {
  loadDynamicPage(a, !1)
}

function dynamicQueryParams() {
  var a = {};
  return Account.hasSpecialCobrand() && (a.cobrand = Account.hasSpecialCobrand(), a.catalog = Account.getProperties().catalog), a.l = LanguageSelector.language, a
}

function dynamicUrl(a, b) {
  typeof b == "undefined" && (b = {}), Account.hasSpecialCobrand() && (b.cobrand = Account.hasSpecialCobrand(), b.catalog = Account.getProperties().catalog);
  var c = $.param(b);
  return c.length > 0 && (a += "?" + c), a
}

function loadDynamicPage(a, b, c) {
  var d = PageRedirect.redirectSignedOutHome(a);
  if (d.doRedirect && d.destination) {
    document.location = d.destination;
    return
  }
  var e = new Date,
    f = "",
    g = "",
    h = "",
    i = "";
  deepLinkQueue = [];
  var j = captureDeepLinks(a);
  if (a.indexOf(j) == 0 && deepLinkQueue.length > 0 && b != 1) {
    processDeepLinkQueue();
    return
  }
  var k = j;
  $.doTimeout("loading-timeout", 2e3, function () {
    showActionMessage("loading", Locale.messages.loading)
  });
  if (k == "" || urlPath(k) == "/") Account.isLoggedIn() ? k = "/members/" + memberShortcut() + "/home" : k = "/welcome", k += urlQuery(a);
  if (Account.isMyMemberPath(a) || isMyStationsPage(a)) f = "&me=true";
  g = "&" + $.param(dynamicQueryParams()), typeof recToken != "undefined" && recToken != null && (h = "&recToken=" + recToken, recToken = null), typeof EditorialHelper.getTab() != "undefined" && (i = "&tab=" + EditorialHelper.getTab()), version = (k.indexOf("?") != -1 ? "&" : "?") + "v=" + app_version, timezoneOffset = a.toLowerCase().indexOf("/listening_history") != -1 ? "&timezoneOffset=" + -1 * (new Date).getTimezoneOffset() : "", navigationTracker.abortPrevious(), navigationTracker.request = $.ajax({
    url: k + version + f + g + h + i + timezoneOffset,
    dataType: "html",
    success: function (d, f, g) {
      loadAjaxPage(a, d, b, c);
      var h = new Date,
        i = h.getTime() - e.getTime();
      $.inArray(a, pagesToTrackLoadTimes) == -1, Tour.tryStart(), processDeepLinkQueue(), resizeFrame(), $.doTimeout("loading-timeout"), hideActionMessage()
    },
    error: function (d, e, f) {
      if (e == "abort") return;
      $.doTimeout("loading-timeout"), hideActionMessage();
      var g = $("#main-content").length > 0 ? $("#main-content").children().first() : $("#main").children().first();
      g.trigger("pageLoadFailed");
      if (b) loadAjaxPage(a, d.responseText, b, c);
      else if (e == "error" || e == "timeout")
        if (d.status == 401) d.responseText == "user not valid error" ? userNotValidDialog() : d.responseText == "token not valid error" && tokenNotValidDialog();
        else {
          d.responseText === undefined && (d.responseText = "Timeout"), ajax_dom = jQuery("<div>").append(d.responseText.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""));
          var h = ajax_dom.find("#error-title").html();
          showNotice("warning", h, !1)
        }
    }
  }), hideNotice()
}

function loadAjaxPage(a, b, c, d) {
  ajax_dom = jQuery("<div>").append(b.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""));
  var e = ajax_dom.find("title").text();
  e == null && (e = b.substring(b.indexOf("<title>") + 7, b.indexOf("</title>"))), c ? document.title = e : (ignore_push_state = !0, d ? History.replaceState(null, e, a) : History.pushState(null, e, a)), $("#main").html(ajax_dom.find("#main-content")), $("#main-content").show(), $("#main-frame-content").scrollTop(0);
  var f = $("#main-content").length > 0 ? $("#main-content").children().first() : $("#main").children().first();
  f.trigger("pageLoaded"), ajax_dom.find(".app-info").each(function (a, b) {
    var c = $(this).attr("version");
    typeof c != "undefined" && c != app_version && (app_version = c, showUpdateNotice())
  })
}

function captureDeepLinks(a) {
  if (!a) return;
  var b = a,
    c = [
      [/(\/members\/.+\/library)\/artists\/([^\/]*)\/.*/, 1, deepLinkToLibraryArtist],
      [/(\/members\/.+\/library)\/recent\/.*/, 1, deepLinkToLibraryRecent],
      [/(\/genre\/.+\/artists\/(essential|popular))\/artist\/([^\/]*)?/, 1, deepLinkToGenreArtist]
    ];
  for (var d = 0; d < c.length; d++) {
    var e = a.match(c[d][0]);
    e && (b = e[c[d][1]], deepLinkQueue.push([c[d][2], e]))
  }
  return b
}

function processDeepLinkQueue() {
  while (deepLinkQueue.length > 0) {
    var a = deepLinkQueue.shift();
    a[0](a[1])
  }
}

function showUpdateNotice() {
  var a = Locale.layoutMessage.siteChanged + " " + "<a id='get-new-version' href='/' onclick='refresh();return false;'>" + Locale.layoutMessage.clickHere + "</a>" + " " + Locale.layoutMessage.reloadPage;
  showNotice("info", a, !0)
}

function SeekLog() {
  this.time = null, this.trackId = null, this.recordSeekBack = function (a) {
    this.trackId = a.id, this.time = new Date
  }, this.shouldGoBackATrack = function (a) {
    return this.trackId != a.id || this.time == null || a.currentTime < (new Date - this.time) / 1e3 ? (this.recordSeekBack(a), !1) : (this.reset(), !0)
  }, this.reset = function () {
    this.time = null, this.trackId = null
  }
}

function currentUTCDateTime() {
  var a = new Date,
    b = 0,
    c, d = [a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds()];
  d[1] += 1;
  while (b++ < 7) c = d[b], c < 10 && (d[b] = "0" + c);
  return d.splice(0, 3).join("-") + "T" + d.join(":") + "Z"
}

function isRadioMode() {
  return MiniPlayer.mode == MiniPlayer.RADIO_MODE
}

function currentQueue() {
  return isRadioMode() ? MiniPlayer.radio.queue : Queue
}

function playerFlashVersionSupportedWarning() {
  var a = MiniPlayerUtil.DetectFlashVer(10, 1, 0);
  if (!a) {
    var b = MiniPlayerUtil.DetectFlashVer(9, 0, 124);
    if (b) {
      var c = Locale.playerMessage.unsupportedVersion + " " + "<a href='http://get.adobe.com/flashplayer/' target='_blank'>" + Locale.playerMessage.latestVersion + "</a>";
      showNotice("warning", c, !1)
    }
  }
}

function onPlayerReady(a) {
  MiniPlayer.setToken(Account.token, Account.username, Account.getProperties().guid), $("#player-play").click(function () {
    play()
  }), $("#player-pause").click(function () {
    pause()
  }), $("#player-previous").click(function (a) {
    playPrevious(a)
  }), $("#player-next").click(function (a) {
    playNext(a)
  }), $("#player-progress").click(function (a) {
    seekLog.reset(), seek(a)
  }), $("#player-shuffle").click(function () {
    trackQueue.toggleShuffle()
  }), $("#player-repeat").click(function () {
    trackQueue.toggleRepeat()
  }), $("#queue-close").click(function () {
    closeQueue()
  }), $("#player-manage-queue").click(function () {
    openQueue()
  }), $("#player-options").click(function (a) {
    playerContextMenu($(this), a)
  }), $("#player-favorite").click(function (a) {
    Favorites.playerButton($(this))
  }), $("#player-radio-close").click(function () {
    stop()
  }), $("#player-info, #queue-controls, #queue-container, #player-manage-queue").disableSelection(), $("#player-album-thumbnails-container img").bind("load", function () {
    $(this).fadeIn("fast")
  }), $("#queue-container").sortable({
    change: function () {
      $(".ui-sortable-helper").addClass("sorting")
    },
    update: function (a, b) {
      var c = $("#queue-container li"),
        d = new Array(c.length);
      for (var e = 0; e < c.length; e++) d[e] = c[e].getAttribute("id");
      trackQueue.reorder(d)
    },
    delay: 30
  }), $("#player-volume").click(function () {
    $("#player-volume-slider").is(":visible") ? $("#player-volume-slider").fadeOut("fast") : ($("#player-volume-slider").fadeIn("fast"), clearTimeout($("#player-volume-slider").data("idleTimeout")), $("#player-volume-slider").data("idleTimeout", setTimeout(function () {
      $("#player-volume-slider").fadeOut("fast")
    }, 5e3)))
  }), $("#player-volume-slider").mouseenter(function () {
    clearTimeout($("#player-volume-slider").data("idleTimeout"))
  }), $("#player-volume-slider").mouseleave(function () {
    $("#player-volume-slider").data("idleTimeout", setTimeout(function () {
      $("#player-volume-slider").fadeOut("fast")
    }, 1e3))
  }), $("#player-volume-slider").slider({
    orientation: "horizontal",
    value: MiniPlayer ? MiniPlayer.volume : 1,
    min: 0,
    max: 1,
    step: .05,
    animate: !0,
    slide: function (a, b) {
      setVolume(b.value)
    }
  }), $("#queue-container").delegate(".queue-options", "click", function (a) {
    a.stopImmediatePropagation();
    var b = $(this).parent();
    contextPlusMenu($(this), a, trackFromMiniplayer(b), "player")
  }), enableQueue(), $("#container").delegate("#queue-content-overlay", "click", function (a) {
    a.preventDefault(), closeQueue()
  }), $("#queue-frame-content").scroll(function (a) {
    updateQueuePointer()
  }), $("#queue-overlay").delegate("#queue-pointer-top", "click", function (a) {
    var b = $("#queue-frame-content .current-playing").position().top,
      c = $("#queue-frame-content").scrollTop() + b - 50;
    $("#queue-frame-content").animate({
      scrollTop: c
    })
  }), $("#queue-overlay").delegate("#queue-pointer-bottom", "click", function (a) {
    var b = $("#queue-frame-content .current-playing").position().top,
      c = $("#queue-frame-content").scrollTop() + b - $("#queue-frame-content").height() + 50;
    $("#queue-frame-content").animate({
      scrollTop: c
    })
  }), $("#queue-overlay").disableSelection(), window.location.search.match(/debug=.*player/) && setDebug(!0), trackQueue.subscribe(trackQueue.LOADED, onQueueLoaded), trackQueue.subscribe(trackQueue.UPDATED, onQueueUpdated), trackQueue.subscribe(trackQueue.ITEM_ADDED, onQueueItemAdded), trackQueue.subscribe(trackQueue.SELECTED_ITEM_CHANGED, onQueueSelectedItemChanged), trackQueue.subscribe(trackQueue.STOPPED, onQueueStopped), trackQueue.load()
}

function toggleSavePlaylist() {
  trackQueue.itemCount() > 0 ? ($("#queue-save").removeClass("queue-control-disabled"), $("#queue-save").unbind("click").click(function () {
    savePlaylist()
  })) : ($("#queue-save").unbind("click"), $("#queue-save").addClass("queue-control-disabled"))
}

function enableQueue() {
  toggleSavePlaylist(), $("#queue-clear").click(function () {
    clearQueue(), resizeFrame()
  }), $("#queue-container").delegate("li", "mousedown", function (a) {
    $(this).removeClass("sorting")
  }), $("#queue-container").delegate("li", "click", function (a) {
    $(this).hasClass("sorting") == 0 && (trackQueue.play($(this).data("track")), seekLog.recordSeekBack(currentQueue().currentTrack())), $(this).removeClass("sorting")
  }), $("#queue-container").delegate("li", "mouseover", function (a) {
    $(this).find(".queue-delete").css("visibility", "visible")
  }), $("#queue-container").delegate("li", "mouseout", function (a) {
    $(this).find(".queue-delete").css("visibility", "hidden")
  }), $("#queue-container").delegate(".queue-delete", "click", function (a) {
    return a.stopImmediatePropagation(), typeof FacebookMusic != "undefined" && FacebookMusic.stop(), trackQueue.removeItem($(this).parent().parent().data("track").key), ($("#queue-frame-content")[0].scrollHeight == $("#queue-frame-content").outerHeight() || $("#queue-frame-content")[0].scrollHeight - $("#queue-frame-content").scrollTop() > $("#queue-frame-content").outerHeight() + $(this).parent().parent().height()) && $(this).parent().parent().next().find(".queue-delete").css("visibility", "visible"), $(this).parent().parent().unbind().remove(), !1
  }), $("#queue-container").sortable("enable"), $("#queue-overlay").removeClass("disabled").animate({
    opacity: 1
  })
}

function disableQueue() {
  $(".queue-control").unbind("click"), $("#queue-container").undelegate("li", "click").undelegate("li", "mouseover").undelegate("li", "mouseout").undelegate(".queue-delete"), $("#queue-container").sortable("disable"), $("#queue-overlay").addClass("disabled").animate({
    opacity: .5
  })
}

function onAnonymousAccountCreated(a) {
  a && a.token && (Account.token = a.token, Account.username = null, MiniPlayer.setToken(Account.token, Account.username), trackQueue.play(), saveCookie("token", Account.token))
}

function onTrackMetadata(a) {
  var b = currentQueue().currentTrack();
  b.title = a.data.title, b.totalTime = a.data.duration, b.artistID = a.data.artistID, b.artistName = a.data.artistName, b.albumID = a.data.albumID, b.albumTitle = a.data.albumTitle, b.albumThumbnailURL = a.data.albumThumbnailURL, b.mp3URL = a.data.mp3URL, b.rights = a.data.rights, b.streamable = isStreamable(b.rights), b.bitrate = a.data.bitRate, b.format = a.data.format, a.data.playsRemaining == 0 && showPlayerError(Locale.playerMessage.endFreePlay), a.data.nextTrack && (setRadioStatus(Locale.playerMessage.nowPlaying + " " + MiniPlayer.radio.stationName + " " + Locale.playerMessage.radio), _trackChanging && trackChanged()), updatePlayerDisplay();
  alert(b.mp3URL)
}

function onTrackEvent(a) {
  var b = a.id,
    c = a.code,
    d = a.detail,
    e = !1;
  switch (c) {
  case MiniPlayer.CONNECTED:
    loadTrackContentErrorRetry = !1, setPlayerStatus(Locale.playerMessage.connected);
    break;
  case MiniPlayer.READY_TO_PLAY:
    var f = currentQueue().currentTrack().playSourceMetadata;
    typeof f == "undefined" && (f = {
      primaryContentName: "- Unknown"
    }, typeof FacebookMusic != "undefined" ? f.featureModule = "From Facebook" : f.featureModule = "- Unknown"), isRadioMode() || reportEvent("Feature", "Play Track", f);
    break;
  case MiniPlayer.UNPAUSED:
  case MiniPlayer.PLAY_STARTED:
    showProgressBar(!0), showTrackInfo(!0), setPlayerStatus(""), typeof FacebookMusic != "undefined" && FacebookMusic.play();
    break;
  case MiniPlayer.PAUSED:
    typeof FacebookMusic != "undefined" && FacebookMusic.pause();
    break;
  case MiniPlayer.PLAY_COMPLETE:
    typeof FacebookMusic != "undefined" && FacebookMusic.pause(), playNext();
    break;
  case MiniPlayer.PLAY_INTERRUPTED:
    showPlayerError(Locale.playerMessage.playInterrupted, Locale.playerMessage.buttonContinue, function () {
      playNext()
    }, 5);
    break;
  case MiniPlayer.CONNECTION_FAILED:
    showPlayerError(Locale.playerMessage.connectionFailed, Locale.playerMessage.buttonOk, function () {
      stop(!0)
    });
    break;
  case MiniPlayer.PLAY_FAILED:
    showPlayerError(Locale.playerMessage.playFailed, Locale.playerMessage.buttonContinue, function () {
      playNext()
    }, 5);
    break;
  case MiniPlayer.SEEK_FAILED:
    playNext();
    break;
  case MiniPlayer.IDLE_TIMEOUT:
    break;
  case MiniPlayer.NOT_FOUND:
    showPlayerError(Locale.playerMessage.notFound, Locale.playerMessage.buttonContinue, function () {
      playNext()
    }, 5);
    break;
  case MiniPlayer.BUFFER_EMPTY:
    setPlayerStatus(Locale.playerMessage.bufferEmpty);
    break;
  case MiniPlayer.BUFFER_FULL:
    setPlayerStatus("");
    break;
  case MiniPlayer.NETWORK_DROPPED:
    showPlayerError(Locale.playerMessage.networkDropped, Locale.playerMessage.buttonOk, function () {
      stop(!0)
    })
  }
  updatePlayerDisplay()
}

function onPlayTimer(a) {
  var b = currentQueue() == MiniPlayer.radio.queue ? currentQueue().currentTrack() : currentQueue().selectedItem.track;
  b.currentTime = a.currentTime, updateProgressDisplay()
}

function onMuteChanged(a) {}

function onModeChanged(a) {
  $("#player").data("currentTrack", null), $("#player").data("nextTrack", null), $("#player").data("previousTrack", null), a.newMode == MiniPlayer.TRACK_MODE ? ($("#player-queue-next").slideUp(function () {
    $("#player-queue-track").show(), $("#player-queue-radio").hide(), $(this).slideDown()
  }), $("#player-shuffle, #player-repeat").fadeIn(), $("#player-next").removeClass("disabled").animate({
    opacity: 1
  }), $("#player-previous").removeClass("disabled").animate({
    opacity: 1
  }), enableQueue(), playbackSamples && ($("#player-next").addClass("disabled").animate({
    opacity: .7
  }), $("#player-previous").addClass("disabled").animate({
    opacity: .7
  }))) : a.newMode == MiniPlayer.RADIO_MODE && ($("#player-queue-next").slideUp(function () {
    $("#player-queue-radio").show(), $("#player-queue-track").hide(), $(this).slideDown()
  }), $("#player-shuffle, #player-repeat").fadeOut(), $("#player-next").removeClass("disabled").animate({
    opacity: 1
  }), $("#player-previous").addClass("disabled").animate({
    opacity: .7
  }), disableQueue()), positionCovers(), updatePlayerDisplay()
}

function onError(a) {
  var b = a.code,
    c = a.detail;
  setPlayerStatus("");
  if (b == "UnsupportedAccountType") showPlayerError(Locale.playerMessage.unsupportedAccountType, Locale.playerMessage.tryRhapsody, function () {
    window.open("/freetrial?cpath=rcom_beta&rsrc=r25error")
  });
  else if (b == "InvalidToken") showPlayerError(Locale.playerMessage.invalidToken, Locale.playerMessage.buttonOk, function () {
    document.location = "/authentication/logout"
  });
  else {
    if (b == "NoContentAvailable") {
      showPlayerError(Locale.playerMessage.noContentAvailable, Locale.playerMessage.buttonOk, function () {
        playNext()
      }, 5);
      return
    }
    if (b == "UnhandledError") {
      showPlayerError(Locale.playerMessage.unhandledError + " " + c, Locale.playerMessage.buttonContinue, function () {
        playNext()
      }, 5);
      return
    }
    if (b == "AccountNotCreated") {
      showPlayerError(Locale.playerMessage.accountNotCreated);
      return
    }
    if (b == "LoadTrackContentError") {
      loadTrackContentErrorRetry ? (loadTrackContentErrorRetry = !1, showPlayerError(Locale.playerMessage.loadTrackContentError, Locale.playerMessage.buttonContinue, function () {
        playNext()
      }, 5)) : (loadTrackContentErrorRetry = !0, reportEvent("Player Error", "There was a problem loading the track you requested. Retrying."), currentQueue().play());
      return
    }
    if (b == "LoadNextTrackContentError") {
      setRadioStatus(" "), c && c == "The selected member's playlist was returned empty." ? showPlayerError(MiniPlayer.radio.stationName + " " + Locale.playerMessage.loadNextTrackContentErrorMember, Locale.playerMessage.buttonOk, function () {
        stop(!0)
      }) : showPlayerError(Locale.playerMessage.loadNextTrackContentError.replace("%{station_name}", MiniPlayer.radio.stationName), Locale.playerMessage.buttonOk, function () {
        stop(!0)
      });
      return
    }
    if (b == "InvalidPassword" || b == "InvalidUsername") {
      userNotValidDialog();
      return
    }
    if (b == "GeoBlocked") {
      showPlayerError(Locale.playerMessage.geoBlocked, Locale.playerMessage.buttonOk, function () {
        stop(!1)
      });
      return
    }
    if (b == "StreamingNotAllowed") showPlayerError(Locale.playerMessage.streamingError, Locale.playerMessage.buttonOk, function () {
      playNext()
    }, 5);
    else {
      showPlayerError(Locale.playerMessage.playerError + " " + c, Locale.playerMessage.buttonContinue, function () {
        playNext()
      }, 5);
      return
    }
  }
  stop(!0)
}

function onPlaybackSessionExpired(a) {
  showPlayerError(Locale.playerMessage.playbackSessionExpired), stop(!0)
}

function updateCovers() {
  function f(a) {
    var b = $("#player-album-thumbnails-container");
    a == "next" ? b.append(i(0).css({
      left: "536px"
    })) : a == "previous" && b.prepend(i(4).css({
      left: "0px"
    }));
    for (var c = 0; c < b.children().length; c++) {
      var d = c == 2,
        e = i(c);
      e.animate({
        left: (c * 134).toString() + "px",
        opacity: d ? 1 : .2
      }, 450), c == 1 && isRadioMode() ? e.fadeOut() : e.show()
    }
  }

  function g() {
    j("blank", 0), j(b, 1), j(a, 2), j(c, 3), j("blank", 4)
  }

  function h() {
    j("blank", 0), j("blank", 1), j("default", 2), j("blank", 3), j("blank", 4)
  }

  function i(a) {
    return $($("#player-album-thumbnails-container").children()[a])
  }

  function j(a, b) {
    var c = i(b),
      d = c.find("img").removeClass("blank");
    if (!a || a == "blank") c.data("track", null).find("a").attr("href", ""), d.attr("src", blankCover).attr("title", "").addClass("blank");
    else if (a == "default") c.data("track", null).find("a").attr("href", ""), d.attr("src", defaultCover).attr("title", "");
    else if (a && a.hasOwnProperty("id")) {
      var e = c.data("track");
      a != e && k(d, a), c.data("track", a).find("a").toggleClass("ajax", a.streamable).toggleClass("disabled", !a.streamable).attr("href", a.streamable ? getLinkToTrack(a) : "javascript://")
    }
  }

  function k(a, b) {
    if (!b) a.attr("src", blankCover);
    else {
      if (a.attr("src") && a.attr("src") == b.albumThumbnailURL) return;
      if (b.albumThumbnailURL && b.albumThumbnailURL != "") a.attr("src", b.albumThumbnailURL);
      else if (b.albumID && b.albumID != "")
        if (typeof offlineMode != "undefined") {
          var c = ClientDownloads.albumImageUrl(b.albumID);
          a.attr("src", c)
        } else $.getJSON("/album/" + b.albumID + "/thumbnail", function (c) {
          var d = c.url;
          b.albumThumbnailURL = d, a.attr("src", d)
        });
        else a.attr("src", defaultCover)
    }
    b && a.attr("title", (b.albumTitle || b.title || "") + (b.artistName && b.artistName != "" ? ", " + b.artistName : ""))
  }
  var a = $("#player").data("currentTrack"),
    b = $("#player").data("previousTrack"),
    c = $("#player").data("nextTrack");
  if (a) {
    var d = -1;
    if (!currentQueue().repeating || currentQueue().itemCount() > 1)
      for (var e = 0; e < 5; e++)
        if (i(e).data("track") == a) {
          d = e;
          break
        }
    d >= 0 ? d == 1 ? (j(b, 0), f("previous")) : d == 3 ? (j(c, 4), f("next")) : d == 2 ? (j(b, 1), j(a, 2), j(c, 3)) : g() : g()
  } else h();
  $(".player-album-thumbnail").each(function (a, b) {
    $(b).css({
      visibility: !isRadioMode() || a != 0 && a != 3 && a != 4 ? "visible" : "hidden"
    })
  })
}

function onDebug(a) {
  trace(a.message)
}

function onFlashUnavailable() {
  showPlayerError(Locale.playerMessage.flashUnavailable, Locale.playerMessage.getFlash, function () {
    setTimeout(function () {
      document.location = "http://get.adobe.com/flashplayer/"
    }, 1500)
  })
}

function onQueueLoaded(a) {
  positionCovers(), deactivatePlayer(), hideTrackInfo(!1), hideProgressBar(), setQueueStatus(), setTimeout(function () {
    var a = trackQueue.getItems();
    if (a.length > 0) {
      var b = jQuery("<div />");
      for (var c = 0; c < a.length; c++) {
        var d = appendTrackItem(a[c].track, b);
        if (typeof offlineMode != "undefined") {
          var e = ClientDownloads.tracksCacheState([a[c].track.id]);
          e[a[c].track.id] == null && $(d).addClass("not-downloaded").hide()
        }
      }
      $("#queue-container").append(b.children())
    }
    updateQueueDisplay(), updatePlayerDisplay(), trackQueue.selectedItem && showTrackInfo(!1), typeof FacebookMusic != "undefined" && FacebookMusic.autoplay(), $("#queue").addClass("queue-loaded")
  }, 750)
}

function onQueueUpdated(a) {
  trackQueue.selectedItem == null && trackQueue.itemCount() > 0 && (trackQueue.setSelectedItem(trackQueue.getNext(!0)), showTrackInfo(!0)), updateQueueDisplay(), updatePlayerDisplay(), trackQueue.itemCount() == 0 && initializePlayerDisplay()
}

function onQueueItemAdded(a) {
  flashQueueButton()
}

function onPlayRequested(a) {
  var b = a.trackID,
    c = $("#player").data("currentTrack");
  $("#player-error").delay(500).slideUp(), MiniPlayer.mode != MiniPlayer.TRACK_MODE || !! c && c.id == b ? b && c && c.id != b ? (trackChanging(), trackChanged()) : trackChanging() : (trackChanging(), trackChanged()), MiniPlayer.paused || setPlayerStatus(Locale.playerMessage.connecting), Account.getProperties()["experienceType"] != "subscriber" && Advertising.update(), typeof EditorialHelper != "undefined" && EditorialHelper.pauseVideoPlayback(), MiniPlayer.mode == MiniPlayer.RADIO_MODE && a.channelID != undefined && a.channelID.match(/screenname\./) && reportEvent("Feature", "Play Member Radio", "members, my radio"), updatePlayerDisplay(), activatePlayer()
}

function updateQueuePointer() {
  if (MiniPlayer.mode == MiniPlayer.TRACK_MODE && MiniPlayer.status != MiniPlayer.statuses.READY) {
    var a = null;
    trackQueue && trackQueue.selectedItem && (a = $(document.getElementById(trackQueue.selectedItem.track.key)));
    if (a && a.length > 0) {
      var b = a.position().top;
      b < 30 ? $("#queue-pointer-top").show() : $("#queue-pointer-top").hide(), b > $("#queue-frame-content").height() ? $("#queue-pointer-bottom").show() : $("#queue-pointer-bottom").hide()
    } else $("#queue-pointer-top").hide(), $("#queue-pointer-bottom").hide()
  }
}

function positionCovers() {
  var a = $("#player-album-thumbnails-container div");
  for (var b = 0; b < a.length; b++) $(a[b]).css({
    left: (b * 134).toString() + "px"
  })
}

function onQueueSelectedItemChanged(a) {
  setPlayerStatus("")
}

function onPlayStopped(a) {
  updatePlayerDisplay()
}

function onQueueStopped(a) {
  deactivatePlayer()
}

function justPlaySomething() {}

function play() {
  if (MiniPlayer.mode == MiniPlayer.TRACK_MODE && trackQueue.itemCount() == 0) {
    justPlaySomething();
    return
  }
  currentQueue().play()
}

function pause() {
  currentQueue().pause()
}

function playNext(a) {
  var b = currentQueue().getNext();
  if (b) seekLog.recordSeekBack(b.track), currentQueue().playNext();
  else {
    if (isRadioMode() || a && $(a.currentTarget).hasClass("disabled")) return;
    trackQueue.itemCount() > 0 && trackQueue.setSelectedItem(trackQueue.getNext(!0)), stop()
  }
}

function playPrevious(a) {
  if (isRadioMode() || a && $(a.currentTarget).hasClass("disabled")) return;
  var b = trackQueue.currentTrack();
  if (b && b.currentTime > 2 && !seekLog.shouldGoBackATrack(b)) {
    seek(0);
    return
  }
  var c = currentQueue().getPrevious();
  c ? (seekLog.recordSeekBack(c.track), currentQueue().playPrevious()) : stop()
}

function stop(a) {
  currentQueue().stop(a), MiniPlayer.setMode(MiniPlayer.TRACK_MODE), (trackQueue.itemCount() == 0 || !trackQueue.selectedItem) && initializePlayerDisplay(), deactivatePlayer()
}

function playerContextMenu(a, b) {
  b.stopImmediatePropagation();
  var c = currentQueue().currentTrack();
  c.streamable && contextPlusMenu(a, b, trackFromMiniplayer(c), "player")
}

function openQueue() {}

function closeQueue() {}

function clearQueue() {
  typeof FacebookMusic != "undefined" && FacebookMusic.stop(), trackQueue.clear(), closeQueue(), updatePlayerDisplay(), updateQueueDisplay(), initializePlayerDisplay()
}

function flashQueueButton() {
  $("#player-manage-queue").stop(!0, !0).effect("highlight", {
    color: "#ff9b00"
  }, 500)
}

function toggleMute() {
  MiniPlayer.toggleMute()
}

function setVolume(a) {
  MiniPlayer.setVolume(a)
}

function seek(a) {
  if (isRadioMode()) return;
  var b = 0;
  a.hasOwnProperty("pageX") ? b = a.pageX - $("#player-progress").offset().left : parseInt(a) >= 0 && (b = parseInt(a) || 0);
  var c = currentQueue().currentTrack();
  if (c) {
    var d = $("#player-progress").width(),
      e = b / d * c.totalTime;
    c.seek(e)
  }
}

function setQueueStatus() {
  var a = trackQueue.itemCount();
  $("#player-manage-queue").text(a == 0 ? "Your queue is empty" : a + " track" + (a != 1 ? "s" : "") + " in your queue"), trackQueue.selectedItem && $("#player-next-track-index").text(trackQueue.selectedItem.playIndex + 1 + " of " + trackQueue.itemCount()).toggle(!MiniPlayer.stopped)
}

function setRadioStatus(a) {
  if (a) {
    $("#player-radio-info").fadeOut("fast", function () {
      $(this).text(a), $(this).fadeIn("fast")
    });
    return
  }
}

function setPlayerStatus(a) {
  var b = $("#player-status");
  b.text() != "" && a == 0 ? b.fadeOut(function () {
    $(this).text("")
  }) : b.text(a).hide().fadeIn()
}

function setDocTitle(a) {
  document.title = a
}

function trackChanging() {
  var a = !0;
  MiniPlayer.paused || ($("#player-progress-indicator").stop(!0, !0).animate({
    width: "0px"
  }, 200), $("#player-current-time").text(MiniPlayer.secondsToTime(0)).show(), $("#player-total-time").text(MiniPlayer.secondsToTime(0)).show())
}

function trackChanged() {
  _trackChanging = !1, $("#player-track-link, #player-artist-link").stop(!0, !0).fadeIn("fast")
}

function showProgressBar(a) {
  var b = $("#player-progress-frame");
  b.is(":visible") || (a ? (b.css("overflow", "hidden"), b.css("height", 0), b.show(), $.doTimeout("animate-progress-bar"), expandProgressBar()) : (b.show(), adjustQueueHeight()))
}

function expandProgressBar() {
  var a = $("#player-progress-frame");
  a.height() < 22 && ($("#player").hasClass("player-small") || $("#queue-frame").css("height", $("#queue-frame").height() - 2), a.css("height", a.height() + 2), $.doTimeout("animate-progress-bar", 50, function () {
    expandProgressBar()
  }))
}

function hideProgressBar(a) {
  var b = $("#player-progress-frame");
  b.is(":visible") && (a ? ($.doTimeout("animate-progress-bar"), shrinkProgressBar()) : (b.hide(), adjustQueueHeight()))
}

function shrinkProgressBar() {
  var a = $("#player-progress-frame");
  a.height() > 0 && (a.css("height", a.height() - 2), $("#queue-frame").css("height", $("#queue-frame").height() + 2), a.height() == 0 && a.hide(), $.doTimeout("animate-progress-bar", 50, function () {
    shrinkProgressBar()
  }))
}

function showTrackInfo(a) {
  var b = $("#player-track-info");
  b.is(":visible") || (a ? b.stop(!0, !0).animate({
    opacity: "show"
  }, {
    duration: 600,
    step: function (a, b) {
      adjustQueueHeight()
    }
  }) : (b.show(), adjustQueueHeight()))
}

function hideTrackInfo(a) {
  var b = $("#player-track-info");
  b.is(":visible") && (a ? b.stop(!0, !0).animate({
    opacity: "hide"
  }, {
    duration: 600,
    step: function (a, b) {
      adjustQueueHeight()
    }
  }) : (b.hide(), adjustQueueHeight()))
}

function adjustQueueHeight() {
  !$("body").hasClass("free-experience") && queue_extended == 0 && (resizeFrame(), updateQueuePointer())
}

function activatePlayer() {
  var a = $("#player-track-info, #player-album-thumbnails-frame");
  a.css("opacity") < 1 && a.animate({
    opacity: 1
  })
}

function deactivatePlayer() {
  hideProgressBar(!0), setPlayerStatus(""), MiniPlayer.stopTrack()
}

function showPlayerError(a, b, c, d) {
  function k() {
    j = setInterval(function () {
      i > 0 ? i == 1 ? h.text(Locale.playerMessage.continuingIn + " " + i + " " + Locale.playerMessage.second + "...").fadeIn() : h.text(Locale.playerMessage.continuingIn + " " + i + " " + Locale.playerMessage.seconds + "...").fadeIn() : h.text(Locale.playerMessage.continuing + "...").fadeIn(), i-- <= 0 && (l(), g.click())
    }, 1e3)
  }

  function l() {
    clearInterval(j), h.fadeOut(function () {
      $(this).text("")
    })
  }
  var e = $("#player-error"),
    f = $("#player-error-message"),
    g = $("#player-error-button"),
    h = $("#player-error-countdown"),
    i = d,
    j;
  setPlayerStatus(""), g.html(b ? b : Locale.playerMessage.buttonOk).unbind().click(function () {
    $(this).parent().delay(500).slideUp(), $(this).fadeOut("fast"), l(), typeof c == "function" && c()
  }), !isNaN(i) && i > 0 && k(i), reportEvent("Player Error", a), f.html(a), e.slideDown(function () {
    g.fadeIn("fast")
  })
}

function updateQueueDisplay() {
  $("#queue-container").sortable("refresh"), $("#player-shuffle").toggleClass("selected", trackQueue.shuffling), $("#player-repeat").toggleClass("selected", trackQueue.repeating), toggleSavePlaylist();
  if (trackQueue.itemCount() == 0) $("#queue-controls").hide(), $("#queue-message-container").show(), $("#queue-container li").remove();
  else {
    $("#queue-controls").show(), $("#queue-message-container").hide(), $("#queue-container li").removeClass("current-playing selected");
    if (trackQueue.selectedItem && trackQueue.selectedItem.track) {
      var a = document.getElementById(trackQueue.selectedItem.track.key);
      a && (MiniPlayer.status == MiniPlayer.statuses.READY ? $(a).removeClass("current-playing").addClass("selected") : $(a).removeClass("selected").addClass("current-playing"))
    }
  }
  updateQueuePointer()
}

function updatePlayerDisplay() {
  if ($("#player").length != 0) {
    var a = currentQueue().currentTrack(),
      b = currentQueue().getPrevious(),
      c = currentQueue().getNext();
    $("#player").data("currentTrack", a), $("#player").data("nextTrack", c ? c.track : null), $("#player").data("previousTrack", b ? b.track : null), $("#player-repeat").attr("title", trackQueue.repeating ? Locale.playerMessage.repeatIsOn : Locale.playerMessage.repeatIsOff), $("#player-shuffle").attr("title", trackQueue.shuffling ? Locale.playerMessage.shuffleIsOn : Locale.playerMessage.shuffleIsOff), $("#player-previous").attr("title", b && MiniPlayer.mode != MiniPlayer.RADIO_MODE ? b.track.title + ", " + b.track.artistName : Locale.playerMessage.previousTrack), $("#player-next").attr("title", c && MiniPlayer.mode != MiniPlayer.RADIO_MODE ? c.track.title + ", " + c.track.artistName : Locale.playerMessage.nextTrack);
    var d = $("#player-info").height() + 2;
    $("#player-error-background").css({
      height: d
    }), $("#player-error").css({
      height: d - 20
    }), MiniPlayer.paused || MiniPlayer.stopped ? ($("#player-play").show(), $("#player-pause").hide()) : ($("#player-play").hide(), $("#player-pause").show());
    if (a) {
      typeof Favorites != "undefined" && Favorites.checkForTrack(a.id);
      try {
        var e = getLinkToArtist(a);
        if (a.streamable) var f = getLinkToTrack(trackFromMiniplayer(a));
        else var f = "";
        e == "/artist/various-artists" ? ($("#player-artist-nolink").text(a.artistName).show(), $("#player-artist a").attr("href", e).text(a.artistName).attr("title", a.artistName).hide()) : ($("#player-artist-link").attr("href", e).text(a.artistName).attr("title", a.artistName).show(), $("#player-artist-nolink").text(a.artistName).hide()), $("#player-track-link").text(a.title).attr("title", a.title).show(), $("#player-current-time").text(MiniPlayer.secondsToTime(a.currentTime)).show(), $("#player-total-time").text(MiniPlayer.secondsToTime(a.totalTime)).show(), $("#player-track-link").toggleClass("ajax", a.streamable).toggleClass("disabled", !a.streamable).attr("href", a.streamable ? f : "javascript://"), typeof a.streamable != "undefined" && (a.streamable ? ($("#player-options").fadeIn(), Account.getProperties()["experienceType"] != "free" && $("#player-favorite").fadeIn()) : ($("#player-options").fadeOut(), Account.getProperties()["experienceType"] != "free" && $("#player-favorite").fadeOut())), setDocTitle(Locale.playerMessage.rhapsodyPlayer + " " + (isRadioMode() ? MiniPlayer.radio.stationName + " " + Locale.playerMessage.radio : a.title + " " + Locale.messages.by + " " + a.artistName))
      } catch (g) {}
    }
    updateCovers(), setQueueStatus(), setRadioStatus(), adjustQueueHeight()
  }
}

function updateProgressDisplay() {
  var a = currentQueue() == MiniPlayer.radio.queue ? currentQueue().currentTrack() : currentQueue().selectedItem.track,
    b = parseInt($("#player-progress").width());
  $("#player-current-time").text(MiniPlayer.secondsToTime(a.currentTime)), $("#player-total-time").text(MiniPlayer.secondsToTime(a.totalTime)), $("#player-progress-indicator").css("width", a.currentTime / a.totalTime * b + "px")
}

function initializePlayerDisplay() {
  $("#player-play").show(), $("#player-pause").hide(), $("#player-track-link").text("").attr("title", ""), $("#player-artist-link").text("").attr("title", ""), $("#player-album-link").attr("href", ""), $("#player").data("previousTrack", null), $("#player").data("currentTrack", null), $("#player").data("nextTrack", null), $(".player-album-thumbnail").data("track", null), $(".player-album-thumbnail a img").removeClass().attr("src", blankCover), $("#player-progress-indicator").css("width", "0"), $("#player-next-track-index").fadeOut(function () {
    $(this).text("")
  }), $("#player-radio-info").fadeOut(function () {
    $(this).text("")
  }), $("#player-current-time").fadeOut(function () {
    $(this).text(MiniPlayer.secondsToTime(0))
  }), $("#player-total-time").fadeOut(function () {
    $(this).text(MiniPlayer.secondsToTime(0))
  }), updateCovers(), hideTrackInfo(!0), hideProgressBar(!0)
}

function savePlaylist() {
  addToPlaylistDialog({
    id: "queue",
    name: Locale.playerMessage.mixerTracks
  }, "new")
}

function trackFromAttributes(a, b) {
  var c = {};
  return c.id = $(a).attr("track_id"), c.trackShortcut = $(a).attr("track_shortcut"), c.name = $(a).attr("track_name"), c.artistId = $(a).attr("artist_id"), c.artistShortcut = $(a).attr("artist_shortcut"), c.artistName = $(a).attr("artist_name"), c.albumId = $(a).attr("album_id"), c.albumShortcut = $(a).attr("album_shortcut"), c.duration = $(a).attr("duration"), c.previewURL = $(a).attr("previewurl"), c.rightFlags = $(a).attr("right_flags"), c.streamable = isStreamable(c.rightFlags), c.href = $(a).attr("href"), c.recToken = $(a).attr("rec_token"), c.playSourceMetadata = b || getPlaySourceMetadata($(a)), c
}

function tracksForMiniplayer(a) {
  var b = new Array;
  return $.each(a, function (a, c) {
    b.push(trackForMiniplayer(c))
  }), b
}

function trackForMiniplayer(a) {
  var b = new Track(a.id);
  return b.trackShortcut = a.trackShortcut, b.title = a.name, b.artistID = a.artistId, b.artistShortcut = a.artistShortcut, b.artistName = a.artistName, b.albumID = a.albumId, b.albumShortcut = a.albumShortcut, b.totalTime = a.duration, b.previewURL = a.previewURL, b.rights = a.rightFlags, b.streamable = !0, b.sourceId = a.sourceId, b.sourceType = a.sourceType, a.trackArtistShortcut && (b.trackArtistShortcut = a.trackArtistShortcut), b.href = a.href, a.recToken && (b.recToken = a.recToken), a.playSourceMetadata && (b.playSourceMetadata = a.playSourceMetadata), b
}

function isStreamable(a) {
  var b = !0;
  return a && (b = (parseInt(a) & 2) == 2), b
}

function trackFromMiniplayer(a) {
  var b = {};
  return b.id = a.id, b.trackShortcut = a.trackShortcut, b.name = a.title, b.artistId = a.artistID, b.artistShortcut = a.artistShortcut, b.artistName = a.artistName, b.albumId = a.albumID, b.albumShortcut = a.albumShortcut, b.duration = a.totalTime, b.previewURL = a.previewURL, b.rightFlags = a.rights, b.streamable = isStreamable(b.rightFlags), b.playSourceMetadata = a.playSourceMetadata, b.recToken = a.recToken, b.href = a.href, b
}

function queueTrack(a, b) {
  b = typeof b != "undefined" && b, (!b || b && !doPeriodicTrialDialogPopOnPlayback()) && checkQueueLimit(1, function () {
    var c = queueIndividualTrack(a);
    b && trackQueue.play(c)
  })
}

function playTrack(a, b) {
  typeof b != "undefined" && (a.playSourceMetadata = getPlaySourceMetadata(b)), queueTrack(a, !0)
}

function queueIndividualTrack(a) {
  var b = trackForMiniplayer(a);
  trackQueue.addItem(b);
  var c = appendTrackItem(b, $("#queue-container"));
  return scrollToAndFlashQueueItems(c), b.key
}

function appendTracksToQueue(a) {
  var b = tracksForMiniplayer(a);
  Queue.addItems(b);
  var c = jQuery("<div />");
  $.each(b, function (a, b) {
    appendTrackItem(b, c)
  });
  var d = $(c.children());
  return $("#queue-container").append(c.children()), scrollToAndFlashQueueItems(d), b[0].key
}

function checkQueueLimit(a, b) {
  trackQueue.itemCount() + a > queueLimit && trackQueue.itemCount() > 0 && ($.doTimeout("queueing-timeout", 1e3, function () {
    hideActionMessage()
  }), queueLimitDialog(b)), b({
    replacedQueue: !1
  })
}

function queueAlbum(a, b) {
  if (!doPeriodicTrialDialogPopOnPlayback()) {
    var c = dynamicUrl("/album/" + a.id + "/queue");
    queueCollection(c, b, a)
  }
}

function albumFromAttributes(a) {
  var b = {};
  return b.id = a.attr("album_id"), b.albumShortcut = a.attr("album_shortcut"), b.name = a.attr("album_name"), b.artistId = a.attr("artist_id"), b.artistName = a.attr("artist_name"), b.artistShortcut = a.attr("artist_shortcut"), b.rightFlags = a.attr("rights"), b.href = a.attr("href"), b.recToken = a.attr("rec_token"), b.playSourceMetadata = getPlaySourceMetadata(a), b
}

function playAlbum(a, b) {
  if (!doPeriodicTrialDialogPopOnPlayback()) {
    var c = "";
    typeof a == "object" ? c = dynamicUrl("/album/" + a.id + "/queue") : (c = dynamicUrl("/album/" + a + "/queue"), a = {
      id: a
    }), a.playSourceMetadata = getPlaySourceMetadata(b), playCollection(c, a)
  }
}

function playArtist(a, b, c) {
  queueArtist(a, !0, getPlaySourceMetadata(b), c)
}

function queueArtist(a, b, c, d) {
  if (!doPeriodicTrialDialogPopOnPlayback()) {
    var e = dynamicUrl("/artist/" + a + "/queue/", {
      count: d || 50
    });
    queueCollection(e, b, {
      id: a,
      playSourceMetadata: c
    })
  }
}

function getArtistTopTracks(a, b, c, d, e) {
  $.ajax({
    type: "GET",
    url: dynamicUrl("/artist/" + a + "/queue/", {
      count: c
    }),
    success: function (a) {
      if (d && typeof d == "function") d(b, e, a.tracks, "track-list");
      else return a.tracks
    },
    error: function (a, b) {
      return !1
    }
  })
}

function getGenreTopTracks(a, b, c, d) {
  $.ajax({
    type: "GET",
    url: dynamicUrl("/genre/" + a + "/queue"),
    success: function (a) {
      if (c && typeof c == "function") c(b, d, a.tracks, "track-list");
      else return a.tracks
    },
    error: function (a, b) {
      return !1
    }
  })
}

function playGenre(a, b) {
  queueGenre(a, !0, getPlaySourceMetadata(b))
}

function queueGenre(a, b, c) {
  if (!doPeriodicTrialDialogPopOnPlayback()) {
    var d = dynamicUrl("/genre/" + a + "/queue");
    queueCollection(d, b, {
      id: a,
      playSourceMetadata: c
    })
  }
}

function playlistFromAttributes(a) {
  var b = {};
  return b.id = a.attr("playlist_id"), b.name = a.attr("playlist_name"), b.member_name = a.attr("playlist_member_name"), b.href = a.attr("href"), b.playSourceMetadata = getPlaySourceMetadata(a), b
}

function queuePlaylist(a, b, c) {
  var d = "";
  typeof a == "object" ? a.href ? d = dynamicUrl(a.href + "/queue") : d = dynamicUrl("/playlist/" + a.id + "/queue") : (d = dynamicUrl("/playlist/" + a + "/queue"), a = {
    id: a
  }), typeof c != "undefined" && !a.playSourceMetadata && (a.playSourceMetadata = c), (!b || b && !doPeriodicTrialDialogPopOnPlayback()) && queueCollection(d, b, a)
}

function playPlaylist(a, b) {
  queuePlaylist(a, !0, getPlaySourceMetadata(b))
}

function playMemberStream(a, b) {
  Account.getProperties()["experienceType"] == "free" && Locale.showsTrialSignupDialog() ? trialSignupDialog() : playbackSamples || playRadio("screenname." + a, b + "'s")
}

function playRadio(a, b) {
  if (!a) return;
  $("#player-radio-info").fadeOut(function () {
    $(this).text(Locale.playerMessage.starting + " " + b + "..."), $(this).fadeIn()
  }), MiniPlayer.playRadio(a, b)
}

function playCollection(a, b) {
  queueCollection(a, !0, b)
}

function queueCollection(a, b, c) {
  $.doTimeout("queueing-timeout", 1e3, function () {
    showActionMessage("action", Locale.messages.addingToMixer)
  }), $.ajax({
    url: a,
    dataType: "json",
    success: function (a) {
      a == null ? $.doTimeout("queueing-timeout", 1e3, function () {
        hideActionMessage(), showActionMessage("action", Locale.messages.noTrackData), $.doTimeout("queueing-timeout", 2e3, function () {
          hideActionMessage()
        })
      }) : checkQueueLimit(a.tracks.length, function () {
        if (c)
          for (var d in a.tracks) c.recToken && (a.tracks[d].recToken = c.recToken), c.playSourceMetadata && (a.tracks[d].playSourceMetadata = c.playSourceMetadata);
        addCollectionToQueue(a.tracks, b, c) || $.doTimeout("queueing-timeout", 1e3, function () {
          hideActionMessage(), showActionMessage("action", Locale.messages.noTrackData), $.doTimeout("queueing-timeout", 2e3, function () {
            hideActionMessage()
          })
        })
      })
    },
    error: function () {
      $.doTimeout("queueing-timeout", 1e3, function () {
        hideActionMessage(), showActionMessage("action", Locale.messages.noTrackData), $.doTimeout("queueing-timeout", 2e3, function () {
          hideActionMessage()
        })
      })
    }
  })
}

function addCollectionToQueue(a, b, c) {
  var d = !1,
    e = a.length;
  e > queueLimit && (a.splice(queueLimit, e), e = queueLimit), e = tryAdjustQueueLengthForSamples(e), a = getStreamableTracks(a, e);
  if (a.length > 0) {
    var f = appendTracksToQueue(a);
    $.doTimeout("queueing-timeout"), hideActionMessage(), b && playFromUpdatedQueue(a, f), d = !0
  }
  return d
}

function getStreamableTracks(a, b) {
  var c = new Array;
  if (a) {
    var d = typeof b != "undefined" ? b : a.length;
    for (var e = 0; e < d && e < a.length; e++) isStreamable(a[e].rightFlags) && c.push(a[e])
  }
  return c
}

function queueTrackItemList(a, b) {
  if (!b || b && !doPeriodicTrialDialogPopOnPlayback()) {
    var c = $(a).children(".track-item");
    checkQueueLimit(c.length, function () {
      var d = tryAdjustQueueLengthForSamples(c.length);
      d == 1 && (c = [c[0]]);
      var e = new Array;
      $.each(c, function (b, c) {
        var d = trackFromAttributes(c);
        isStreamable(d.rightFlags) && ($(a).attr("id") == "album-tracks" && (d.sourceId = d.albumId, d.sourceType = "ALBUM"), e.push(d))
      });
      if (e.length > 0) {
        var f = appendTracksToQueue(e);
        b && playFromUpdatedQueue(e, f)
      }
    })
  }
}

function playTrackItemList(a) {
  queueTrackItemList(a, !0)
}

function queueTrackDataList(a, b) {
  checkQueueLimit(a.length, function () {
    var c = tryAdjustQueueLengthForSamples(a.length),
      d = new Array;
    for (var e = 0; e < c; e++) d.push(a[e]);
    var f = appendTracksToQueue(d);
    b && playFromUpdatedQueue(d, f)
  })
}

function playFromUpdatedQueue(a, b) {
  Queue.getItems().length == a.length && trackQueue.currentTrack() ? trackQueue.play(trackQueue.currentTrack().id) : trackQueue.play(b)
}

function playTrackDataList(a) {
  doPeriodicTrialDialogPopOnPlayback() || queueTrackDataList(a, !0)
}

function tryAdjustQueueLengthForSamples(a) {
  return playbackSamples && (trackQueue.items = [], trackQueue.tracks = {}, a = 1), a
}

function scrollToAndFlashQueueItems(a) {
  if (!a) return;
  var b = a.first().position().top,
    c = $("#queue-frame-content").scrollTop() + b - 50;
  $("#queue-frame-content").animate({
    scrollTop: c
  }, 600, function () {
    a.animate({
      backgroundColor: "#1A4562"
    }, 600, function () {
      a.animate({
        backgroundColor: "#001C31"
      }, 600)
    })
  })
}

function appendTrackItem(a, b) {
  try {
    var c = a.artistId ? trackForMiniplayer(a) : a,
      d = $("<li></li>").data("track", c).attr("id", c.key).append($("<div></div>").addClass("track").append($("<a>Remove</a>").attr("href", "/queue/delete").attr("title", Locale.playerMessage.deleteTrack).addClass("queue-delete")).append($("<div></div>").text("Options").addClass("queue-options")).append($("<div></div>").text(MiniPlayer.secondsToTime(c.totalTime)).addClass("duration")).append($("<div></div>").text(c.title).addClass("track-title")).append($("<div></div>").text(c.artistName).addClass("artist-name"))).appendTo(b);
    return d
  } catch (e) {}
}

function setDebug(a) {
  a ? (MiniPlayer.subscribe(MiniPlayer.DEBUG, onDebug), MiniPlayer.setDebug(!0), $("<div></div>").attr("id", "debugger").append($("<h4>Debug Console</h4>")).append($("<input></input>").attr("type", "button").attr("value", "Clear").click(function () {
    $("#console").text(""), MiniPlayer.debugHistory = []
  })).append($("3.<input></input>").attr("type", "button").attr("value", "Attach Queue").click(function () {
    trace("Queue: " + JSON.stringify(Queue.squish()))
  })).append($("<textarea></textarea>").attr("id", "console")).appendTo("body")) : (MiniPlayer.unsubscribe(MiniPlayer.DEBUG, onDebug), MiniPlayer.setDebug(!1), $("#debugger").remove())
}

function trace(a) {
  var b = $("#console"),
    c = b.text(),
    d = new Date;
  b.text(c + "[" + d.toDateString() + " " + d.toTimeString().substring(0, d.toTimeString().indexOf(" ")) + "] " + a + "\r\n")
}

function scrollToPlaylist() {
  if (playlistState.visibleUrl != null) {
    var a = $("li.playlist-item a[href='" + playlistState.visibleUrl + "']");
    a.size() > 0 ? $(function () {
      var b = a.offset().top - 400 - $(".playlists-page #content-frame ul").offset().top;
      setTimeout(function () {
        $(".playlists-page #content-frame").scrollTop(b)
      }, 100), playlistState.visibleUrl = null
    }) : setTimeout(function () {
      $(".playlists-page #content-frame").scrollTop($(".playlists-page #content-frame ul").height())
    }, 100)
  }
}

function loadPlaylistPage(a) {
  var b = parseInt(a.attr("data-page"));
  a.remove(), showActionMessage("loading", Locale.messages.loading), $.get("/members/" + $(".page-metadata").attr("meta_screenname") + "/playlists?page=" + b.toString(), function (a) {
    hideActionMessage(), $(a).find("li.playlist-item").size() > 0 && ($("ul li.playlist-item:last").after($(a).find("li.playlist-item")), $(function () {
      var c = $("#content-frame").scrollTop();
      $(a).find("li#morePlaylists").size() > 0 && ($("ul li.playlist-item:last").after("<li id='morePlaylists' data-page='" + (b + 1).toString() + "'></li>"), $(function () {
        $("#content-frame").scrollTop(c), $("#morePlaylists").bind("inview", function (a, b, c) {
          loadPlaylistPage($(this))
        })
      })), scrollToPlaylist()
    }))
  })
}

function renamePlaylist(a) {
  var b = $(a).parent().parent(),
    c = $("#new-playlist-name").val(),
    d = $("#playlist-id").val();
  $.post(dynamicUrl("/playlist/" + d), {
    name: c,
    _method: "put"
  }, function (a) {}), b.find(".rename-playlist").html(c).show(), b.find(".edit-form").remove()
}

function addToPlaylistDialog(a, b) {
  if (a.length) var c = Locale.messages.addTheseTracksToPlaylist;
  else {
    var c = "<span>'" + a.name + "'</span>";
    a.artistName && (c += " " + Locale.messages.byArtist.toLowerCase().replace("%{artist_name}", "<span>" + a.artistName + "</span>")), c = Locale.messages.addItemToPlaylist.replace("%{item}", c)
  }
  $("#add-to-playlist-dialog .text").html(c), $("#add-to-playlist-dialog").data("item", a), url = "/playlist/list", $.getJSON(url, function (b) {
    if (b && b.length != 0) {
      $("#add-to-playlist-dialog select").find("option").remove();
      for (var c = 0, d = b.length; c < d; ++c) {
        var e = $("#add-to-playlist-dialog").data("item");
        b[c]["id"] != e.id && (b[c]["id"] != $("#playlist-id").val() || !a.length) && $("#add-to-playlist-dialog select").first().append($("<option></option>").html(b[c].name).attr("value", b[c].id).attr("selected", c == 0 ? "selected" : ""))
      }
    } else $("#add-to-playlist-dialog .new-playlist-tab a").click()
  }), b == "new" ? $("#add-to-playlist-dialog .new-playlist-tab a").click() : $("#add-to-playlist-dialog .existing-playlist-tab a").click(), $("#add-to-new-playlist-name").val(Locale.messages.newPlaylistName).addClass("default"), showDialog($("#add-to-playlist-dialog")), b == "new" ? $("#add-to-new-playlist-name").focus() : $("#add-to-existing-playlist-list").focus()
}

function deletePlaylistDialog(a) {
  var b = Locale.messages.deleteThis.replace("%{item}", "'<span>" + a.name + "</span>'");
  $("#delete-playlist-dialog .text").html(b), $("#delete-playlist-dialog").data("item", a), showDialog($("#delete-playlist-dialog"))
}

function addToPlaylist(a, b) {
  var c;
  if (b.id == "queue") {
    track_amount = "tracks";
    var d = trackQueue.getItems(),
      e = new Array;
    for (var f = 0; f < d.length; f++) e[f] = d[f].track.id;
    c = {
      trackIds: e
    }
  } else if (b.length) {
    track_amount = "tracks";
    var e = new Array(b.length);
    for (var f = 0; f < b.length; f++) e[f] = b[f].id;
    c = {
      trackIds: e
    }
  } else {
    var g = getContentType(b.id);
    g == "track" ? (c = {
      trackIds: b.id
    }, track_amount = "track") : g == "album" ? (c = {
      albumId: b.id
    }, track_amount = "tracks") : (c = {
      playlistId: b.id
    }, track_amount = "tracks")
  }
  c && $.ajax({
    type: "POST",
    url: dynamicUrl("/playlist/" + a + "/append"),
    data: c,
    statusCode: {
      401: function () {
        userNotValid = !0
      }
    },
    success: function (b) {
      pageNavUrl() == "/members/" + memberShortcut() + "/playlists/" + a && loadDynamicPage("/members/" + memberShortcut() + "/playlists/" + a);
      if (b != "append") var c = Locale.messages.maximumPlaylistSize.replace("%{data}", b),
      d = 3e3;
      else var c = Locale.messages.countAddedToPlaylist.replace("%{count}", track_amount),
      d = 1e3;
      showActionMessage("action", c), $.doTimeout("alerting-timeout", d, function () {
        hideActionMessage()
      })
    },
    error: function (a, b) {
      b == 1 ? userNotValidDialog() : (showActionMessage("action", Locale.messages.errorAddingToPlaylist), $.doTimeout("alerting-timeout", 1e3, function () {
        hideActionMessage()
      }))
    }
  })
}

function createPlaylist(a, b, c) {
  if (b.id == "queue") {
    var d = trackQueue.getItems(),
      e = new Array;
    for (var f = 0; f < d.length; f++) e[f] = d[f].track.id;
    data = {
      name: a,
      trackIds: e
    }
  } else if (b.length) {
    var e = new Array(b.length);
    for (var f = 0; f < b.length; f++) e[f] = b[f].id;
    data = {
      name: a,
      trackIds: e
    }
  } else {
    var g = getContentType(b.id);
    g == "track" ? data = {
      name: a,
      trackIds: b.id
    } : g == "album" ? data = {
      name: a,
      albumId: b.id
    } : data = {
      name: a,
      playlistId: b.id
    }
  }
  $.ajax({
    type: "POST",
    url: dynamicUrl("/playlist/create"),
    data: data,
    statusCode: {
      401: function () {
        userNotValid = !0
      }
    },
    success: function (b) {
      lastUsedPlaylist = {
        id: b,
        name: a
      }, isMyPlaylistsPage() && loadDynamicPage("/members/" + memberShortcut() + "/playlists"), c == 1 ? showActionMessage("action", Locale.messages.copyPlaylist.replace("%{playlist_name}", a)) : showActionMessage("action", Locale.messages.addedTracksToNewPlaylist), $.doTimeout("alerting-timeout", 1e3, function () {
        hideActionMessage()
      })
    },
    error: function (a, b) {
      b == 1 ? userNotValidDialog() : (showActionMessage("action", Locale.messages.errorCreatingPlaylist), $.doTimeout("alerting-timeout", 1e3, function () {
        hideActionMessage()
      }))
    }
  })
}

function rateAlbum(a, b, c) {
  showFeedbackSelection(c, a), $.post("/recommendation/feedback", {
    itemId: a,
    recToken: b,
    weight: c,
    _method: "put"
  }, function (a) {})
}

function showFeedbackSelection(a, b) {
  $(".album-item").each(function (c, d) {
    if ($(d).attr("album_id") == b) {
      var e = $(d).find(".thumbs-up"),
        f = $(d).find(".thumbs-down");
      if (a == "0.0" || a == 0) e.empty().addClass("thumbs-up-disabled"), f.empty().addClass("thumbs-down-selected");
      if (a == "1.0" || a == 1) e.empty().addClass("thumbs-up-selected"), f.empty().addClass("thumbs-down-disabled")
    }
  })
}

function getUserFeedback() {}

function twitterRefer(a, b) {
  if (referLoginCheck()) {
    var c = "http://twitter.com/share?url=" + a + "&text=" + encodeURIComponent(b.replace(/&apos;/, "'")),
      d = window.open(c, "_sharePopup", "width=550,height=450");
    (d == null || typeof d == "undefined") && alert("Please disable your pop-up blocker and click the twitter button again."), reportEvent("Feature", "Refer", "Share on Twitter")
  }
}

function facebookRefer(a) {
  if (referLoginCheck()) {
    var b = "http://www.facebook.com/share.php?u=" + a,
      c = window.open(b, "_sharePopup", "width=900,height=500");
    (c == null || typeof c == "undefined") && alert("Please disable your pop-up blocker and click the facebook button again."), reportEvent("Feature", "Refer", "Share on Facebook")
  }
}

function referLoginCheck() {
  return Account.isLoggedIn() ? !0 : (saveCookie("goto", document.location.href), window.location = "/authentication/login", !1)
}

function validateShareForm() {
  return $("#friend0").val() == "" && $("#friend1").val() == "" && $("#friend2").val() == "" && $("#friend3").val() == "" ? (alert("You need to enter at least one email address"), !1) : (showActionMessage("loading", Locale.messages.sendingEmail), $("#refer-submit").attr("disabled", "disabled"), !0)
}

function getBitly(a, b, c) {
  $.getJSON("https://api-ssl.bitly.com/v3/shorten?access_token=86ad0677dffa0ac15b2df99734662a7c02a7af58&longUrl=" + b + "&format=json&callback=?", function (b) {
    if (b.status_code == 200) {
      var d = b.data.url;
      a == "twitter" && $("#twitter-refer").click(function () {
        twitterRefer(d, c)
      }), a == "facebook" && $("#facebook-refer").click(function () {
        facebookRefer(d)
      }), a == "share" && $("#get-link-link").html(d)
    }
  })
}

function showActionMessage(a, b) {
  $("#actionmessage").html(b), $("#actionmessage").removeClass().addClass(a), $("#actionmessagebox").fadeIn()
}

function hideActionMessage() {
  $("#actionmessagebox").fadeOut()
}

function reportEvent(a, b, c, d) {
  EventReporting.reportEvent({
    event: {
      type: a,
      name: b,
      detail: c
    },
    metadata: d
  })
}

function removeDiacritics(a) {
  for (var b = 0; b < defaultDiacriticsRemovalMap.length; b++) a = a.replace(defaultDiacriticsRemovalMap[b].letters, defaultDiacriticsRemovalMap[b].base);
  return a
}

function getPlaySourceMetadata(a) {
  return {
    featureModule: getFeatureModule(a),
    primaryContentName: getPrimaryContentName()
  }
}

function getFeatureModule(a) {
  var b = $(a).attr("feature") ? $(a) : $(a).parents(".feature-module"),
    c = null;
  if (b && b.attr("feature")) c = b.attr("feature");
  else {
    var d = PageMetadata.getMetadata();
    c = "-" + (d.site_section || "") + ", " + (d.page_name || "")
  }
  return c
}

function getPrimaryContentName() {
  var a = "",
    b = PageMetadata.getMetadata();
  if (b) {
    var c = b.main_content_type;
    if (c) {
      a = b[c + "_name"];
      if (b.genre_name) {
        var d = b.genre_name;
        c == "genre" && (a = d[d.length - 1])
      }
      a = c + " : " + a
    }
  }
  return a
}

function reportFeatureAction(a, b, c) {
  reportEvent("Feature", a, b, c)
}

function reportSearchResultEvent(a) {
  reportEvent("Search CTA", "", "", a)
}

function showOnboardingTour() {
  Tour.id = "rhapsody-take-the-tour", Tour.linear = !1, Tour.closed = !1, $("#tour-content:empty").length > 0 ? $.ajax({
    url: "/tophat",
    dataType: "html",
    success: function (a) {
      var b = jQuery("<div>").append(a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""));
      $("#tour-content").html(b.find("#tours")), loadDynamicPage("/")
    }
  }) : loadDynamicPage("/")
}

function loadNamedUpsell(a, b) {
  var c = b.find("#" + a);
  if ($(c).length > 0) {
    var d = c.attr("module_name");
    $("#free-welcome-module").html(c)
  } else loadRandomUpsell(b)
}

function loadRandomUpsell(a) {
  var b = ABTesting.getTestValue(2),
    c = a.find(".upsells").children().length,
    d = Math.floor(b / (100 / c)),
    e = a.find(".upsells").children().eq(d, 1),
    f = e.attr("module_name");
  $("#free-welcome-module").html(e)
}(function (a, b) {
  function c(a) {
    return J.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
  }

  function d(a) {
    if (!co[a]) {
      var b = G.body,
        c = J("<" + a + ">").appendTo(b),
        d = c.css("display");
      c.remove();
      if (d === "none" || d === "") {
        cp || (cp = G.createElement("iframe"), cp.frameBorder = cp.width = cp.height = 0), b.appendChild(cp);
        if (!cq || !cp.createElement) cq = (cp.contentWindow || cp.contentDocument).document, cq.write((J.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cq.close();
        c = cq.createElement(a), cq.body.appendChild(c), d = J.css(c, "display"), b.removeChild(cp)
      }
      co[a] = d
    }
    return co[a]
  }

  function e(a, b) {
    var c = {};
    return J.each(cu.concat.apply([], cu.slice(0, b)), function () {
      c[this] = a
    }), c
  }

  function f() {
    cv = b
  }

  function g() {
    return setTimeout(f, 0), cv = J.now()
  }

  function h() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP")
    } catch (b) {}
  }

  function i() {
    try {
      return new a.XMLHttpRequest
    } catch (b) {}
  }

  function j(a, c) {
    a.dataFilter && (c = a.dataFilter(c, a.dataType));
    var d = a.dataTypes,
      e = {}, f, g, h = d.length,
      i, j = d[0],
      k, l, m, n, o;
    for (f = 1; f < h; f++) {
      if (f === 1)
        for (g in a.converters) typeof g == "string" && (e[g.toLowerCase()] = a.converters[g]);
      k = j, j = d[f];
      if (j === "*") j = k;
      else if (k !== "*" && k !== j) {
        l = k + " " + j, m = e[l] || e["* " + j];
        if (!m) {
          o = b;
          for (n in e) {
            i = n.split(" ");
            if (i[0] === k || i[0] === "*") {
              o = e[i[1] + " " + j];
              if (o) {
                n = e[n], n === !0 ? m = o : o === !0 && (m = n);
                break
              }
            }
          }
        }!m && !o && J.error("No conversion from " + l.replace(" ", " to ")), m !== !0 && (c = m ? m(c) : o(n(c)))
      }
    }
    return c
  }

  function k(a, c, d) {
    var e = a.contents,
      f = a.dataTypes,
      g = a.responseFields,
      h, i, j, k;
    for (i in g) i in d && (c[g[i]] = d[i]);
    while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
    if (h)
      for (i in e)
        if (e[i] && e[i].test(h)) {
          f.unshift(i);
          break
        }
    if (f[0] in d) j = f[0];
    else {
      for (i in d) {
        if (!f[0] || a.converters[i + " " + f[0]]) {
          j = i;
          break
        }
        k || (k = i)
      }
      j = j || k
    } if (j) return j !== f[0] && f.unshift(j), d[j]
  }

  function l(a, b, c, d) {
    if (J.isArray(b)) J.each(b, function (b, e) {
      c || bQ.test(a) ? d(a, e) : l(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
    });
    else if (!c && J.type(b) === "object")
      for (var e in b) l(a + "[" + e + "]", b[e], c, d);
    else d(a, b)
  }

  function m(a, c) {
    var d, e, f = J.ajaxSettings.flatOptions || {};
    for (d in c) c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
    e && J.extend(!0, a, e)
  }

  function n(a, c, d, e, f, g) {
    f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
    var h = a[f],
      i = 0,
      j = h ? h.length : 0,
      k = a === cd,
      l;
    for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = n(a, c, d, e, l, g)));
    return (k || !l) && !g["*"] && (l = n(a, c, d, e, "*", g)), l
  }

  function o(a) {
    return function (b, c) {
      typeof b != "string" && (c = b, b = "*");
      if (J.isFunction(c)) {
        var d = b.toLowerCase().split(b_),
          e = 0,
          f = d.length,
          g, h, i;
        for (; e < f; e++) g = d[e], i = /^\+/.test(g), i && (g = g.substr(1) || "*"), h = a[g] = a[g] || [], h[i ? "unshift" : "push"](c)
      }
    }
  }

  function p(a, b, c) {
    var d = b === "width" ? a.offsetWidth : a.offsetHeight,
      e = b === "width" ? 1 : 0,
      f = 4;
    if (d > 0) {
      if (c !== "border")
        for (; e < f; e += 2) c || (d -= parseFloat(J.css(a, "padding" + bL[e])) || 0), c === "margin" ? d += parseFloat(J.css(a, c + bL[e])) || 0 : d -= parseFloat(J.css(a, "border" + bL[e] + "Width")) || 0;
      return d + "px"
    }
    d = bM(a, b);
    if (d < 0 || d == null) d = a.style[b];
    if (bH.test(d)) return d;
    d = parseFloat(d) || 0;
    if (c)
      for (; e < f; e += 2) d += parseFloat(J.css(a, "padding" + bL[e])) || 0, c !== "padding" && (d += parseFloat(J.css(a, "border" + bL[e] + "Width")) || 0), c === "margin" && (d += parseFloat(J.css(a, c + bL[e])) || 0);
    return d + "px"
  }

  function q(a) {
    var b = G.createElement("div");
    return bC.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild
  }

  function r(a) {
    var b = (a.nodeName || "").toLowerCase();
    b === "input" ? s(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && J.grep(a.getElementsByTagName("input"), s)
  }

  function s(a) {
    if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
  }

  function t(a) {
    return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
  }

  function u(a, b) {
    var c;
    b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(J.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
  }

  function v(a, b) {
    if (b.nodeType === 1 && !! J.hasData(a)) {
      var c, d, e, f = J._data(a),
        g = J._data(b, f),
        h = f.events;
      if (h) {
        delete g.handle, g.events = {};
        for (c in h)
          for (d = 0, e = h[c].length; d < e; d++) J.event.add(b, c, h[c][d])
      }
      g.data && (g.data = J.extend({}, g.data))
    }
  }

  function w(a, b) {
    return J.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }

  function x(a) {
    var b = bo.split("|"),
      c = a.createDocumentFragment();
    if (c.createElement)
      while (b.length) c.createElement(b.pop());
    return c
  }

  function y(a, b, c) {
    b = b || 0;
    if (J.isFunction(b)) return J.grep(a, function (a, d) {
      var e = !! b.call(a, d, a);
      return e === c
    });
    if (b.nodeType) return J.grep(a, function (a, d) {
      return a === b === c
    });
    if (typeof b == "string") {
      var d = J.grep(a, function (a) {
        return a.nodeType === 1
      });
      if (bk.test(b)) return J.filter(b, d, !c);
      b = J.filter(b, d)
    }
    return J.grep(a, function (a, d) {
      return J.inArray(a, b) >= 0 === c
    })
  }

  function z(a) {
    return !a || !a.parentNode || a.parentNode.nodeType === 11
  }

  function A() {
    return !0
  }

  function B() {
    return !1
  }

  function C(a, b, c) {
    var d = b + "defer",
      e = b + "queue",
      f = b + "mark",
      g = J._data(a, d);
    g && (c === "queue" || !J._data(a, e)) && (c === "mark" || !J._data(a, f)) && setTimeout(function () {
      !J._data(a, e) && !J._data(a, f) && (J.removeData(a, d, !0), g.fire())
    }, 0)
  }

  function D(a) {
    for (var b in a) {
      if (b === "data" && J.isEmptyObject(a[b])) continue;
      if (b !== "toJSON") return !1
    }
    return !0
  }

  function E(a, c, d) {
    if (d === b && a.nodeType === 1) {
      var e = "data-" + c.replace(N, "-$1").toLowerCase();
      d = a.getAttribute(e);
      if (typeof d == "string") {
        try {
          d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : J.isNumeric(d) ? +d : M.test(d) ? J.parseJSON(d) : d
        } catch (f) {}
        J.data(a, c, d)
      } else d = b
    }
    return d
  }

  function F(a) {
    var b = K[a] = {}, c, d;
    a = a.split(/\s+/);
    for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
    return b
  }
  var G = a.document,
    H = a.navigator,
    I = a.location,
    J = function () {
      function c() {
        if (!d.isReady) {
          try {
            G.documentElement.doScroll("left")
          } catch (a) {
            setTimeout(c, 1);
            return
          }
          d.ready()
        }
      }
      var d = function (a, b) {
        return new d.fn.init(a, b, g)
      }, e = a.jQuery,
        f = a.$,
        g, h = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        i = /\S/,
        j = /^\s+/,
        k = /\s+$/,
        l = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        m = /^[\],:{}\s]*$/,
        n = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        p = /(?:^|:|,)(?:\s*\[)+/g,
        q = /(webkit)[ \/]([\w.]+)/,
        r = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        s = /(msie) ([\w.]+)/,
        t = /(mozilla)(?:.*? rv:([\w.]+))?/,
        u = /-([a-z]|[0-9])/ig,
        v = /^-ms-/,
        w = function (a, b) {
          return (b + "").toUpperCase()
        }, x = H.userAgent,
        y, z, A, B = Object.prototype.toString,
        C = Object.prototype.hasOwnProperty,
        D = Array.prototype.push,
        E = Array.prototype.slice,
        F = String.prototype.trim,
        I = Array.prototype.indexOf,
        J = {};
      return d.fn = d.prototype = {
        constructor: d,
        init: function (a, c, e) {
          var f, g, i, j;
          if (!a) return this;
          if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
          if (a === "body" && !c && G.body) return this.context = G, this[0] = G.body, this.selector = a, this.length = 1, this;
          if (typeof a == "string") {
            a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? f = h.exec(a) : f = [null, a, null];
            if (f && (f[1] || !c)) {
              if (f[1]) return c = c instanceof d ? c[0] : c, j = c ? c.ownerDocument || c : G, i = l.exec(a), i ? d.isPlainObject(c) ? (a = [G.createElement(i[1])], d.fn.attr.call(a, c, !0)) : a = [j.createElement(i[1])] : (i = d.buildFragment([f[1]], [j]), a = (i.cacheable ? d.clone(i.fragment) : i.fragment).childNodes), d.merge(this, a);
              g = G.getElementById(f[2]);
              if (g && g.parentNode) {
                if (g.id !== f[2]) return e.find(a);
                this.length = 1, this[0] = g
              }
              return this.context = G, this.selector = a, this
            }
            return !c || c.jquery ? (c || e).find(a) : this.constructor(c).find(a)
          }
          return d.isFunction(a) ? e.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), d.makeArray(a, this))
        },
        selector: "",
        jquery: "1.7.2",
        length: 0,
        size: function () {
          return this.length
        },
        toArray: function () {
          return E.call(this, 0)
        },
        get: function (a) {
          return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
        },
        pushStack: function (a, b, c) {
          var e = this.constructor();
          return d.isArray(a) ? D.apply(e, a) : d.merge(e, a), e.prevObject = this, e.context = this.context, b === "find" ? e.selector = this.selector + (this.selector ? " " : "") + c : b && (e.selector = this.selector + "." + b + "(" + c + ")"), e
        },
        each: function (a, b) {
          return d.each(this, a, b)
        },
        ready: function (a) {
          return d.bindReady(), z.add(a), this
        },
        eq: function (a) {
          return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1)
        },
        first: function () {
          return this.eq(0)
        },
        last: function () {
          return this.eq(-1)
        },
        slice: function () {
          return this.pushStack(E.apply(this, arguments), "slice", E.call(arguments).join(","))
        },
        map: function (a) {
          return this.pushStack(d.map(this, function (b, c) {
            return a.call(b, c, b)
          }))
        },
        end: function () {
          return this.prevObject || this.constructor(null)
        },
        push: D,
        sort: [].sort,
        splice: [].splice
      }, d.fn.init.prototype = d.fn, d.extend = d.fn.extend = function () {
        var a, c, e, f, g, h, i = arguments[0] || {}, j = 1,
          k = arguments.length,
          l = !1;
        typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !d.isFunction(i) && (i = {}), k === j && (i = this, --j);
        for (; j < k; j++)
          if ((a = arguments[j]) != null)
            for (c in a) {
              e = i[c], f = a[c];
              if (i === f) continue;
              l && f && (d.isPlainObject(f) || (g = d.isArray(f))) ? (g ? (g = !1, h = e && d.isArray(e) ? e : []) : h = e && d.isPlainObject(e) ? e : {}, i[c] = d.extend(l, h, f)) : f !== b && (i[c] = f)
            }
        return i
      }, d.extend({
        noConflict: function (b) {
          return a.$ === d && (a.$ = f), b && a.jQuery === d && (a.jQuery = e), d
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function (a) {
          a ? d.readyWait++ : d.ready(!0)
        },
        ready: function (a) {
          if (a === !0 && !--d.readyWait || a !== !0 && !d.isReady) {
            if (!G.body) return setTimeout(d.ready, 1);
            d.isReady = !0;
            if (a !== !0 && --d.readyWait > 0) return;
            z.fireWith(G, [d]), d.fn.trigger && d(G).trigger("ready").off("ready")
          }
        },
        bindReady: function () {
          if (!z) {
            z = d.Callbacks("once memory");
            if (G.readyState === "complete") return setTimeout(d.ready, 1);
            if (G.addEventListener) G.addEventListener("DOMContentLoaded", A, !1), a.addEventListener("load", d.ready, !1);
            else if (G.attachEvent) {
              G.attachEvent("onreadystatechange", A), a.attachEvent("onload", d.ready);
              var b = !1;
              try {
                b = a.frameElement == null
              } catch (e) {}
              G.documentElement.doScroll && b && c()
            }
          }
        },
        isFunction: function (a) {
          return d.type(a) === "function"
        },
        isArray: Array.isArray || function (a) {
          return d.type(a) === "array"
        },
        isWindow: function (a) {
          return a != null && a == a.window
        },
        isNumeric: function (a) {
          return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function (a) {
          return a == null ? String(a) : J[B.call(a)] || "object"
        },
        isPlainObject: function (a) {
          if (!a || d.type(a) !== "object" || a.nodeType || d.isWindow(a)) return !1;
          try {
            if (a.constructor && !C.call(a, "constructor") && !C.call(a.constructor.prototype, "isPrototypeOf")) return !1
          } catch (c) {
            return !1
          }
          var e;
          for (e in a);
          return e === b || C.call(a, e)
        },
        isEmptyObject: function (a) {
          for (var b in a) return !1;
          return !0
        },
        error: function (a) {
          throw new Error(a)
        },
        parseJSON: function (b) {
          if (typeof b != "string" || !b) return null;
          b = d.trim(b);
          if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
          if (m.test(b.replace(n, "@").replace(o, "]").replace(p, ""))) return (new Function("return " + b))();
          d.error("Invalid JSON: " + b)
        },
        parseXML: function (c) {
          if (typeof c != "string" || !c) return null;
          var e, f;
          try {
            a.DOMParser ? (f = new DOMParser, e = f.parseFromString(c, "text/xml")) : (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(c))
          } catch (g) {
            e = b
          }
          return (!e || !e.documentElement || e.getElementsByTagName("parsererror").length) && d.error("Invalid XML: " + c), e
        },
        noop: function () {},
        globalEval: function (b) {
          b && i.test(b) && (a.execScript || function (b) {
            a.eval.call(a, b)
          })(b)
        },
        camelCase: function (a) {
          return a.replace(v, "ms-").replace(u, w)
        },
        nodeName: function (a, b) {
          return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        },
        each: function (a, c, e) {
          var f, g = 0,
            h = a.length,
            i = h === b || d.isFunction(a);
          if (e) {
            if (i) {
              for (f in a)
                if (c.apply(a[f], e) === !1) break
            } else
              for (; g < h;)
                if (c.apply(a[g++], e) === !1) break
          } else if (i) {
            for (f in a)
              if (c.call(a[f], f, a[f]) === !1) break
          } else
            for (; g < h;)
              if (c.call(a[g], g, a[g++]) === !1) break; return a
        },
        trim: F ? function (a) {
          return a == null ? "" : F.call(a)
        } : function (a) {
          return a == null ? "" : (a + "").replace(j, "").replace(k, "")
        },
        makeArray: function (a, b) {
          var c = b || [];
          if (a != null) {
            var e = d.type(a);
            a.length == null || e === "string" || e === "function" || e === "regexp" || d.isWindow(a) ? D.call(c, a) : d.merge(c, a)
          }
          return c
        },
        inArray: function (a, b, c) {
          var d;
          if (b) {
            if (I) return I.call(b, a, c);
            d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
            for (; c < d; c++)
              if (c in b && b[c] === a) return c
          }
          return -1
        },
        merge: function (a, c) {
          var d = a.length,
            e = 0;
          if (typeof c.length == "number")
            for (var f = c.length; e < f; e++) a[d++] = c[e];
          else
            while (c[e] !== b) a[d++] = c[e++];
          return a.length = d, a
        },
        grep: function (a, b, c) {
          var d = [],
            e;
          c = !! c;
          for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
          return d
        },
        map: function (a, c, e) {
          var f, g, h = [],
            i = 0,
            j = a.length,
            k = a instanceof d || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || d.isArray(a));
          if (k)
            for (; i < j; i++) f = c(a[i], i, e), f != null && (h[h.length] = f);
          else
            for (g in a) f = c(a[g], g, e), f != null && (h[h.length] = f);
          return h.concat.apply([], h)
        },
        guid: 1,
        proxy: function (a, c) {
          if (typeof c == "string") {
            var e = a[c];
            c = a, a = e
          }
          if (!d.isFunction(a)) return b;
          var f = E.call(arguments, 2),
            g = function () {
              return a.apply(c, f.concat(E.call(arguments)))
            };
          return g.guid = a.guid = a.guid || g.guid || d.guid++, g
        },
        access: function (a, c, e, f, g, h, i) {
          var j, k = e == null,
            l = 0,
            m = a.length;
          if (e && typeof e == "object") {
            for (l in e) d.access(a, c, l, e[l], 1, h, f);
            g = 1
          } else if (f !== b) {
            j = i === b && d.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
              return j.call(d(a), c)
            }) : (c.call(a, f), c = null));
            if (c)
              for (; l < m; l++) c(a[l], e, j ? f.call(a[l], l, c(a[l], e)) : f, i);
            g = 1
          }
          return g ? a : k ? c.call(a) : m ? c(a[0], e) : h
        },
        now: function () {
          return (new Date).getTime()
        },
        uaMatch: function (a) {
          a = a.toLowerCase();
          var b = q.exec(a) || r.exec(a) || s.exec(a) || a.indexOf("compatible") < 0 && t.exec(a) || [];
          return {
            browser: b[1] || "",
            version: b[2] || "0"
          }
        },
        sub: function () {
          function a(b, c) {
            return new a.fn.init(b, c)
          }
          d.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (c, e) {
            return e && e instanceof d && !(e instanceof a) && (e = a(e)), d.fn.init.call(this, c, e, b)
          }, a.fn.init.prototype = a.fn;
          var b = a(G);
          return a
        },
        browser: {}
      }), d.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
        J["[object " + b + "]"] = b.toLowerCase()
      }), y = d.uaMatch(x), y.browser && (d.browser[y.browser] = !0, d.browser.version = y.version), d.browser.webkit && (d.browser.safari = !0), i.test("Â ") && (j = /^[\s\xA0]+/, k = /[\s\xA0]+$/), g = d(G), G.addEventListener ? A = function () {
        G.removeEventListener("DOMContentLoaded", A, !1), d.ready()
      } : G.attachEvent && (A = function () {
        G.readyState === "complete" && (G.detachEvent("onreadystatechange", A), d.ready())
      }), d
    }(),
    K = {};
  J.Callbacks = function (a) {
    a = a ? K[a] || F(a) : {};
    var c = [],
      d = [],
      e, f, g, h, i, j, k = function (b) {
        var d, e, f, g, h;
        for (d = 0, e = b.length; d < e; d++) f = b[d], g = J.type(f), g === "array" ? k(f) : g === "function" && (!a.unique || !m.has(f)) && c.push(f)
      }, l = function (b, k) {
        k = k || [], e = !a.memory || [b, k], f = !0, g = !0, j = h || 0, h = 0, i = c.length;
        for (; c && j < i; j++)
          if (c[j].apply(b, k) === !1 && a.stopOnFalse) {
            e = !0;
            break
          }
        g = !1, c && (a.once ? e === !0 ? m.disable() : c = [] : d && d.length && (e = d.shift(), m.fireWith(e[0], e[1])))
      }, m = {
        add: function () {
          if (c) {
            var a = c.length;
            k(arguments), g ? i = c.length : e && e !== !0 && (h = a, l(e[0], e[1]))
          }
          return this
        },
        remove: function () {
          if (c) {
            var b = arguments,
              d = 0,
              e = b.length;
            for (; d < e; d++)
              for (var f = 0; f < c.length; f++)
                if (b[d] === c[f]) {
                  g && f <= i && (i--, f <= j && j--), c.splice(f--, 1);
                  if (a.unique) break
                }
          }
          return this
        },
        has: function (a) {
          if (c) {
            var b = 0,
              d = c.length;
            for (; b < d; b++)
              if (a === c[b]) return !0
          }
          return !1
        },
        empty: function () {
          return c = [], this
        },
        disable: function () {
          return c = d = e = b, this
        },
        disabled: function () {
          return !c
        },
        lock: function () {
          return d = b, (!e || e === !0) && m.disable(), this
        },
        locked: function () {
          return !d
        },
        fireWith: function (b, c) {
          return d && (g ? a.once || d.push([b, c]) : (!a.once || !e) && l(b, c)), this
        },
        fire: function () {
          return m.fireWith(this, arguments), this
        },
        fired: function () {
          return !!f
        }
      };
    return m
  };
  var L = [].slice;
  J.extend({
    Deferred: function (a) {
      var b = J.Callbacks("once memory"),
        c = J.Callbacks("once memory"),
        d = J.Callbacks("memory"),
        e = "pending",
        f = {
          resolve: b,
          reject: c,
          notify: d
        }, g = {
          done: b.add,
          fail: c.add,
          progress: d.add,
          state: function () {
            return e
          },
          isResolved: b.fired,
          isRejected: c.fired,
          then: function (a, b, c) {
            return h.done(a).fail(b).progress(c), this
          },
          always: function () {
            return h.done.apply(h, arguments).fail.apply(h, arguments), this
          },
          pipe: function (a, b, c) {
            return J.Deferred(function (d) {
              J.each({
                done: [a, "resolve"],
                fail: [b, "reject"],
                progress: [c, "notify"]
              }, function (a, b) {
                var c = b[0],
                  e = b[1],
                  f;
                J.isFunction(c) ? h[a](function () {
                  f = c.apply(this, arguments), f && J.isFunction(f.promise) ? f.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === h ? d : this, [f])
                }) : h[a](d[e])
              })
            }).promise()
          },
          promise: function (a) {
            if (a == null) a = g;
            else
              for (var b in g) a[b] = g[b];
            return a
          }
        }, h = g.promise({}),
        i;
      for (i in f) h[i] = f[i].fire, h[i + "With"] = f[i].fireWith;
      return h.done(function () {
        e = "resolved"
      }, c.disable, d.lock).fail(function () {
        e = "rejected"
      }, b.disable, d.lock), a && a.call(h, h), h
    },
    when: function (a) {
      function b(a) {
        return function (b) {
          g[a] = arguments.length > 1 ? L.call(arguments, 0) : b, j.notifyWith(k, g)
        }
      }

      function c(a) {
        return function (b) {
          d[a] = arguments.length > 1 ? L.call(arguments, 0) : b, --h || j.resolveWith(j, d)
        }
      }
      var d = L.call(arguments, 0),
        e = 0,
        f = d.length,
        g = Array(f),
        h = f,
        i = f,
        j = f <= 1 && a && J.isFunction(a.promise) ? a : J.Deferred(),
        k = j.promise();
      if (f > 1) {
        for (; e < f; e++) d[e] && d[e].promise && J.isFunction(d[e].promise) ? d[e].promise().then(c(e), j.reject, b(e)) : --h;
        h || j.resolveWith(j, d)
      } else j !== a && j.resolveWith(j, f ? [a] : []);
      return k
    }
  }), J.support = function () {
    var b, c, d, e, f, g, h, i, j, k, l, m, n = G.createElement("div"),
      o = G.documentElement;
    n.setAttribute("className", "t"), n.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", c = n.getElementsByTagName("*"), d = n.getElementsByTagName("a")[0];
    if (!c || !c.length || !d) return {};
    e = G.createElement("select"), f = e.appendChild(G.createElement("option")), g = n.getElementsByTagName("input")[0], b = {
      leadingWhitespace: n.firstChild.nodeType === 3,
      tbody: !n.getElementsByTagName("tbody").length,
      htmlSerialize: !! n.getElementsByTagName("link").length,
      style: /top/.test(d.getAttribute("style")),
      hrefNormalized: d.getAttribute("href") === "/a",
      opacity: /^0.55/.test(d.style.opacity),
      cssFloat: !! d.style.cssFloat,
      checkOn: g.value === "on",
      optSelected: f.selected,
      getSetAttribute: n.className !== "t",
      enctype: !! G.createElement("form").enctype,
      html5Clone: G.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
      submitBubbles: !0,
      changeBubbles: !0,
      focusinBubbles: !1,
      deleteExpando: !0,
      noCloneEvent: !0,
      inlineBlockNeedsLayout: !1,
      shrinkWrapBlocks: !1,
      reliableMarginRight: !0,
      pixelMargin: !0
    }, J.boxModel = b.boxModel = G.compatMode === "CSS1Compat", g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, b.optDisabled = !f.disabled;
    try {
      delete n.test
    } catch (p) {
      b.deleteExpando = !1
    }!n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick", function () {
      b.noCloneEvent = !1
    }), n.cloneNode(!0).fireEvent("onclick")), g = G.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), b.radioValue = g.value === "t", g.setAttribute("checked", "checked"), g.setAttribute("name", "t"), n.appendChild(g), h = G.createDocumentFragment(), h.appendChild(n.lastChild), b.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = g.checked, h.removeChild(g), h.appendChild(n);
    if (n.attachEvent)
      for (l in {
        submit: 1,
        change: 1,
        focusin: 1
      }) k = "on" + l, m = k in n, m || (n.setAttribute(k, "return;"), m = typeof n[k] == "function"), b[l + "Bubbles"] = m;
    return h.removeChild(n), h = e = f = n = g = null, J(function () {
      var c, d, e, f, g, h, j, k, l, o, p, q, r, s = G.getElementsByTagName("body")[0];
      !s || (k = 1, r = "padding:0;margin:0;border:", p = "position:absolute;top:0;left:0;width:1px;height:1px;", q = r + "0;visibility:hidden;", l = "style='" + p + r + "5px solid #000;", o = "<div " + l + "display:block;'><div style='" + r + "0;display:block;overflow:hidden;'></div></div>" + "<table " + l + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", c = G.createElement("div"), c.style.cssText = q + "width:0;height:0;position:static;top:0;margin-top:" + k + "px", s.insertBefore(c, s.firstChild), n = G.createElement("div"), c.appendChild(n), n.innerHTML = "<table><tr><td style='" + r + "0;display:none'></td><td>t</td></tr></table>", i = n.getElementsByTagName("td"), m = i[0].offsetHeight === 0, i[0].style.display = "", i[1].style.display = "none", b.reliableHiddenOffsets = m && i[0].offsetHeight === 0, a.getComputedStyle && (n.innerHTML = "", j = G.createElement("div"), j.style.width = "0", j.style.marginRight = "0", n.style.width = "2px", n.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
        marginRight: 0
      }).marginRight, 10) || 0) === 0), typeof n.style.zoom != "undefined" && (n.innerHTML = "", n.style.width = n.style.padding = "1px", n.style.border = 0, n.style.overflow = "hidden", n.style.display = "inline", n.style.zoom = 1, b.inlineBlockNeedsLayout = n.offsetWidth === 3, n.style.display = "block", n.style.overflow = "visible", n.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = n.offsetWidth !== 3), n.style.cssText = p + q, n.innerHTML = o, d = n.firstChild, e = d.firstChild, g = d.nextSibling.firstChild.firstChild, h = {
        doesNotAddBorder: e.offsetTop !== 5,
        doesAddBorderForTableAndCells: g.offsetTop === 5
      }, e.style.position = "fixed", e.style.top = "20px", h.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", h.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, h.doesNotIncludeMarginInBodyOffset = s.offsetTop !== k, a.getComputedStyle && (n.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(n, null) || {
        marginTop: 0
      }).marginTop !== "1%"), typeof c.style.zoom != "undefined" && (c.style.zoom = 1), s.removeChild(c), j = n = c = null, J.extend(b, h))
    }), b
  }();
  var M = /^(?:\{.*\}|\[.*\])$/,
    N = /([A-Z])/g;
  J.extend({
    cache: {},
    uuid: 0,
    expando: "jQuery" + (J.fn.jquery + Math.random()).replace(/\D/g, ""),
    noData: {
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: !0
    },
    hasData: function (a) {
      return a = a.nodeType ? J.cache[a[J.expando]] : a[J.expando], !! a && !D(a)
    },
    data: function (a, c, d, e) {
      if ( !! J.acceptData(a)) {
        var f, g, h, i = J.expando,
          j = typeof c == "string",
          k = a.nodeType,
          l = k ? J.cache : a,
          m = k ? a[i] : a[i] && i,
          n = c === "events";
        if ((!m || !l[m] || !n && !e && !l[m].data) && j && d === b) return;
        m || (k ? a[i] = m = ++J.uuid : m = i), l[m] || (l[m] = {}, k || (l[m].toJSON = J.noop));
        if (typeof c == "object" || typeof c == "function") e ? l[m] = J.extend(l[m], c) : l[m].data = J.extend(l[m].data, c);
        return f = g = l[m], e || (g.data || (g.data = {}), g = g.data), d !== b && (g[J.camelCase(c)] = d), n && !g[c] ? f.events : (j ? (h = g[c], h == null && (h = g[J.camelCase(c)])) : h = g, h)
      }
    },
    removeData: function (a, b, c) {
      if ( !! J.acceptData(a)) {
        var d, e, f, g = J.expando,
          h = a.nodeType,
          i = h ? J.cache : a,
          j = h ? a[g] : g;
        if (!i[j]) return;
        if (b) {
          d = c ? i[j] : i[j].data;
          if (d) {
            J.isArray(b) || (b in d ? b = [b] : (b = J.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
            for (e = 0, f = b.length; e < f; e++) delete d[b[e]];
            if (!(c ? D : J.isEmptyObject)(d)) return
          }
        }
        if (!c) {
          delete i[j].data;
          if (!D(i[j])) return
        }
        J.support.deleteExpando || !i.setInterval ? delete i[j] : i[j] = null, h && (J.support.deleteExpando ? delete a[g] : a.removeAttribute ? a.removeAttribute(g) : a[g] = null)
      }
    },
    _data: function (a, b, c) {
      return J.data(a, b, c, !0)
    },
    acceptData: function (a) {
      if (a.nodeName) {
        var b = J.noData[a.nodeName.toLowerCase()];
        if (b) return b !== !0 && a.getAttribute("classid") === b
      }
      return !0
    }
  }), J.fn.extend({
    data: function (a, c) {
      var d, e, f, g, h, i = this[0],
        j = 0,
        k = null;
      if (a === b) {
        if (this.length) {
          k = J.data(i);
          if (i.nodeType === 1 && !J._data(i, "parsedAttrs")) {
            f = i.attributes;
            for (h = f.length; j < h; j++) g = f[j].name, g.indexOf("data-") === 0 && (g = J.camelCase(g.substring(5)), E(i, g, k[g]));
            J._data(i, "parsedAttrs", !0)
          }
        }
        return k
      }
      return typeof a == "object" ? this.each(function () {
        J.data(this, a)
      }) : (d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!", J.access(this, function (c) {
        if (c === b) return k = this.triggerHandler("getData" + e, [d[0]]), k === b && i && (k = J.data(i, a), k = E(i, a, k)), k === b && d[1] ? this.data(d[0]) : k;
        d[1] = c, this.each(function () {
          var b = J(this);
          b.triggerHandler("setData" + e, d), J.data(this, a, c), b.triggerHandler("changeData" + e, d)
        })
      }, null, c, arguments.length > 1, null, !1))
    },
    removeData: function (a) {
      return this.each(function () {
        J.removeData(this, a)
      })
    }
  }), J.extend({
    _mark: function (a, b) {
      a && (b = (b || "fx") + "mark", J._data(a, b, (J._data(a, b) || 0) + 1))
    },
    _unmark: function (a, b, c) {
      a !== !0 && (c = b, b = a, a = !1);
      if (b) {
        c = c || "fx";
        var d = c + "mark",
          e = a ? 0 : (J._data(b, d) || 1) - 1;
        e ? J._data(b, d, e) : (J.removeData(b, d, !0), C(b, c, "mark"))
      }
    },
    queue: function (a, b, c) {
      var d;
      if (a) return b = (b || "fx") + "queue", d = J._data(a, b), c && (!d || J.isArray(c) ? d = J._data(a, b, J.makeArray(c)) : d.push(c)), d || []
    },
    dequeue: function (a, b) {
      b = b || "fx";
      var c = J.queue(a, b),
        d = c.shift(),
        e = {};
      d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), J._data(a, b + ".run", e), d.call(a, function () {
        J.dequeue(a, b)
      }, e)), c.length || (J.removeData(a, b + "queue " + b + ".run", !0), C(a, b, "queue"))
    }
  }), J.fn.extend({
    queue: function (a, c) {
      var d = 2;
      return typeof a != "string" && (c = a, a = "fx", d--), arguments.length <
        d ? J.queue(this[0], a) : c === b ? this : this.each(function () {
          var b = J.queue(this, a, c);
          a === "fx" && b[0] !== "inprogress" && J.dequeue(this, a)
        })
    },
    dequeue: function (a) {
      return this.each(function () {
        J.dequeue(this, a)
      })
    },
    delay: function (a, b) {
      return a = J.fx ? J.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
        var d = setTimeout(b, a);
        c.stop = function () {
          clearTimeout(d)
        }
      })
    },
    clearQueue: function (a) {
      return this.queue(a || "fx", [])
    },
    promise: function (a, c) {
      function d() {
        --h || e.resolveWith(f, [f])
      }
      typeof a != "string" && (c = a, a = b), a = a || "fx";
      var e = J.Deferred(),
        f = this,
        g = f.length,
        h = 1,
        i = a + "defer",
        j = a + "queue",
        k = a + "mark",
        l;
      while (g--)
        if (l = J.data(f[g], i, b, !0) || (J.data(f[g], j, b, !0) || J.data(f[g], k, b, !0)) && J.data(f[g], i, J.Callbacks("once memory"), !0)) h++, l.add(d);
      return d(), e.promise(c)
    }
  });
  var O = /[\n\t\r]/g,
    P = /\s+/,
    Q = /\r/g,
    R = /^(?:button|input)$/i,
    S = /^(?:button|input|object|select|textarea)$/i,
    T = /^a(?:rea)?$/i,
    U = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    V = J.support.getSetAttribute,
    W, X, Y;
  J.fn.extend({
    attr: function (a, b) {
      return J.access(this, J.attr, a, b, arguments.length > 1)
    },
    removeAttr: function (a) {
      return this.each(function () {
        J.removeAttr(this, a)
      })
    },
    prop: function (a, b) {
      return J.access(this, J.prop, a, b, arguments.length > 1)
    },
    removeProp: function (a) {
      return a = J.propFix[a] || a, this.each(function () {
        try {
          this[a] = b, delete this[a]
        } catch (c) {}
      })
    },
    addClass: function (a) {
      var b, c, d, e, f, g, h;
      if (J.isFunction(a)) return this.each(function (b) {
        J(this).addClass(a.call(this, b, this.className))
      });
      if (a && typeof a == "string") {
        b = a.split(P);
        for (c = 0, d = this.length; c < d; c++) {
          e = this[c];
          if (e.nodeType === 1)
            if (!e.className && b.length === 1) e.className = a;
            else {
              f = " " + e.className + " ";
              for (g = 0, h = b.length; g < h; g++)~ f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
              e.className = J.trim(f)
            }
        }
      }
      return this
    },
    removeClass: function (a) {
      var c, d, e, f, g, h, i;
      if (J.isFunction(a)) return this.each(function (b) {
        J(this).removeClass(a.call(this, b, this.className))
      });
      if (a && typeof a == "string" || a === b) {
        c = (a || "").split(P);
        for (d = 0, e = this.length; d < e; d++) {
          f = this[d];
          if (f.nodeType === 1 && f.className)
            if (a) {
              g = (" " + f.className + " ").replace(O, " ");
              for (h = 0, i = c.length; h < i; h++) g = g.replace(" " + c[h] + " ", " ");
              f.className = J.trim(g)
            } else f.className = ""
        }
      }
      return this
    },
    toggleClass: function (a, b) {
      var c = typeof a,
        d = typeof b == "boolean";
      return J.isFunction(a) ? this.each(function (c) {
        J(this).toggleClass(a.call(this, c, this.className, b), b)
      }) : this.each(function () {
        if (c === "string") {
          var e, f = 0,
            g = J(this),
            h = b,
            i = a.split(P);
          while (e = i[f++]) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e)
        } else if (c === "undefined" || c === "boolean") this.className && J._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : J._data(this, "__className__") || ""
      })
    },
    hasClass: function (a) {
      var b = " " + a + " ",
        c = 0,
        d = this.length;
      for (; c < d; c++)
        if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(O, " ").indexOf(b) > -1) return !0;
      return !1
    },
    val: function (a) {
      var c, d, e, f = this[0];
      if ( !! arguments.length) return e = J.isFunction(a), this.each(function (d) {
        var f = J(this),
          g;
        if (this.nodeType === 1) {
          e ? g = a.call(this, d, f.val()) : g = a, g == null ? g = "" : typeof g == "number" ? g += "" : J.isArray(g) && (g = J.map(g, function (a) {
            return a == null ? "" : a + ""
          })), c = J.valHooks[this.type] || J.valHooks[this.nodeName.toLowerCase()];
          if (!c || !("set" in c) || c.set(this, g, "value") === b) this.value = g
        }
      });
      if (f) return c = J.valHooks[f.type] || J.valHooks[f.nodeName.toLowerCase()], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, typeof d == "string" ? d.replace(Q, "") : d == null ? "" : d)
    }
  }), J.extend({
    valHooks: {
      option: {
        get: function (a) {
          var b = a.attributes.value;
          return !b || b.specified ? a.value : a.text
        }
      },
      select: {
        get: function (a) {
          var b, c, d, e, f = a.selectedIndex,
            g = [],
            h = a.options,
            i = a.type === "select-one";
          if (f < 0) return null;
          c = i ? f : 0, d = i ? f + 1 : h.length;
          for (; c < d; c++) {
            e = h[c];
            if (e.selected && (J.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !J.nodeName(e.parentNode, "optgroup"))) {
              b = J(e).val();
              if (i) return b;
              g.push(b)
            }
          }
          return i && !g.length && h.length ? J(h[f]).val() : g
        },
        set: function (a, b) {
          var c = J.makeArray(b);
          return J(a).find("option").each(function () {
            this.selected = J.inArray(J(this).val(), c) >= 0
          }), c.length || (a.selectedIndex = -1), c
        }
      }
    },
    attrFn: {
      val: !0,
      css: !0,
      html: !0,
      text: !0,
      data: !0,
      width: !0,
      height: !0,
      offset: !0
    },
    attr: function (a, c, d, e) {
      var f, g, h, i = a.nodeType;
      if ( !! a && i !== 3 && i !== 8 && i !== 2) {
        if (e && c in J.attrFn) return J(a)[c](d);
        if (typeof a.getAttribute == "undefined") return J.prop(a, c, d);
        h = i !== 1 || !J.isXMLDoc(a), h && (c = c.toLowerCase(), g = J.attrHooks[c] || (U.test(c) ? X : W));
        if (d !== b) {
          if (d === null) {
            J.removeAttr(a, c);
            return
          }
          return g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d), d)
        }
        return g && "get" in g && h && (f = g.get(a, c)) !== null ? f : (f = a.getAttribute(c), f === null ? b : f)
      }
    },
    removeAttr: function (a, b) {
      var c, d, e, f, g, h = 0;
      if (b && a.nodeType === 1) {
        d = b.toLowerCase().split(P), f = d.length;
        for (; h < f; h++) e = d[h], e && (c = J.propFix[e] || e, g = U.test(e), g || J.attr(a, e, ""), a.removeAttribute(V ? e : c), g && c in a && (a[c] = !1))
      }
    },
    attrHooks: {
      type: {
        set: function (a, b) {
          if (R.test(a.nodeName) && a.parentNode) J.error("type property can't be changed");
          else if (!J.support.radioValue && b === "radio" && J.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
          }
        }
      },
      value: {
        get: function (a, b) {
          return W && J.nodeName(a, "button") ? W.get(a, b) : b in a ? a.value : null
        },
        set: function (a, b, c) {
          if (W && J.nodeName(a, "button")) return W.set(a, b, c);
          a.value = b
        }
      }
    },
    propFix: {
      tabindex: "tabIndex",
      readonly: "readOnly",
      "for": "htmlFor",
      "class": "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable"
    },
    prop: function (a, c, d) {
      var e, f, g, h = a.nodeType;
      if ( !! a && h !== 3 && h !== 8 && h !== 2) return g = h !== 1 || !J.isXMLDoc(a), g && (c = J.propFix[c] || c, f = J.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && (e = f.get(a, c)) !== null ? e : a[c]
    },
    propHooks: {
      tabIndex: {
        get: function (a) {
          var c = a.getAttributeNode("tabindex");
          return c && c.specified ? parseInt(c.value, 10) : S.test(a.nodeName) || T.test(a.nodeName) && a.href ? 0 : b
        }
      }
    }
  }), J.attrHooks.tabindex = J.propHooks.tabIndex, X = {
    get: function (a, c) {
      var d, e = J.prop(a, c);
      return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
    },
    set: function (a, b, c) {
      var d;
      return b === !1 ? J.removeAttr(a, c) : (d = J.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
    }
  }, V || (Y = {
    name: !0,
    id: !0,
    coords: !0
  }, W = J.valHooks.button = {
    get: function (a, c) {
      var d;
      return d = a.getAttributeNode(c), d && (Y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
    },
    set: function (a, b, c) {
      var d = a.getAttributeNode(c);
      return d || (d = G.createAttribute(c), a.setAttributeNode(d)), d.nodeValue = b + ""
    }
  }, J.attrHooks.tabindex.set = W.set, J.each(["width", "height"], function (a, b) {
    J.attrHooks[b] = J.extend(J.attrHooks[b], {
      set: function (a, c) {
        if (c === "") return a.setAttribute(b, "auto"), c
      }
    })
  }), J.attrHooks.contenteditable = {
    get: W.get,
    set: function (a, b, c) {
      b === "" && (b = "false"), W.set(a, b, c)
    }
  }), J.support.hrefNormalized || J.each(["href", "src", "width", "height"], function (a, c) {
    J.attrHooks[c] = J.extend(J.attrHooks[c], {
      get: function (a) {
        var d = a.getAttribute(c, 2);
        return d === null ? b : d
      }
    })
  }), J.support.style || (J.attrHooks.style = {
    get: function (a) {
      return a.style.cssText.toLowerCase() || b
    },
    set: function (a, b) {
      return a.style.cssText = "" + b
    }
  }), J.support.optSelected || (J.propHooks.selected = J.extend(J.propHooks.selected, {
    get: function (a) {
      var b = a.parentNode;
      return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
    }
  })), J.support.enctype || (J.propFix.enctype = "encoding"), J.support.checkOn || J.each(["radio", "checkbox"], function () {
    J.valHooks[this] = {
      get: function (a) {
        return a.getAttribute("value") === null ? "on" : a.value
      }
    }
  }), J.each(["radio", "checkbox"], function () {
    J.valHooks[this] = J.extend(J.valHooks[this], {
      set: function (a, b) {
        if (J.isArray(b)) return a.checked = J.inArray(J(a).val(), b) >= 0
      }
    })
  });
  var Z = /^(?:textarea|input|select)$/i,
    $ = /^([^\.]*)?(?:\.(.+))?$/,
    _ = /(?:^|\s)hover(\.\S+)?\b/,
    ba = /^key/,
    bb = /^(?:mouse|contextmenu)|click/,
    bc = /^(?:focusinfocus|focusoutblur)$/,
    bd = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
    be = function (a) {
      var b = bd.exec(a);
      return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b
    }, bf = function (a, b) {
      var c = a.attributes || {};
      return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
    }, bg = function (a) {
      return J.event.special.hover ? a : a.replace(_, "mouseenter$1 mouseleave$1")
    };
  J.event = {
    add: function (a, c, d, e, f) {
      var g, h, i, j, k, l, m, n, o, p, q, r;
      if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = J._data(a)))) {
        d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = J.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function (a) {
          return typeof J == "undefined" || !! a && J.event.triggered === a.type ? b : J.event.dispatch.apply(h.elem, arguments)
        }, h.elem = a), c = J.trim(bg(c)).split(" ");
        for (j = 0; j < c.length; j++) {
          k = $.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), r = J.event.special[l] || {}, l = (f ? r.delegateType : r.bindType) || l, r = J.event.special[l] || {}, n = J.extend({
            type: l,
            origType: k[1],
            data: e,
            handler: d,
            guid: d.guid,
            selector: f,
            quick: f && be(f),
            namespace: m.join(".")
          }, o), q = i[l];
          if (!q) {
            q = i[l] = [], q.delegateCount = 0;
            if (!r.setup || r.setup.call(a, e, m, h) === !1) a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h)
          }
          r.add && (r.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? q.splice(q.delegateCount++, 0, n) : q.push(n), J.event.global[l] = !0
        }
        a = null
      }
    },
    global: {},
    remove: function (a, b, c, d, e) {
      var f = J.hasData(a) && J._data(a),
        g, h, i, j, k, l, m, n, o, p, q, r;
      if ( !! f && !! (n = f.events)) {
        b = J.trim(bg(b || "")).split(" ");
        for (g = 0; g < b.length; g++) {
          h = $.exec(b[g]) || [], i = j = h[1], k = h[2];
          if (!i) {
            for (i in n) J.event.remove(a, i + b[g], c, d, !0);
            continue
          }
          o = J.event.special[i] || {}, i = (d ? o.delegateType : o.bindType) || i, q = n[i] || [], l = q.length, k = k ? new RegExp("(^|\\.)" + k.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
          for (m = 0; m < q.length; m++) r = q[m], (e || j === r.origType) && (!c || c.guid === r.guid) && (!k || k.test(r.namespace)) && (!d || d === r.selector || d === "**" && r.selector) && (q.splice(m--, 1), r.selector && q.delegateCount--, o.remove && o.remove.call(a, r));
          q.length === 0 && l !== q.length && ((!o.teardown || o.teardown.call(a, k) === !1) && J.removeEvent(a, i, f.handle), delete n[i])
        }
        J.isEmptyObject(n) && (p = f.handle, p && (p.elem = null), J.removeData(a, ["events", "handle"], !0))
      }
    },
    customEvent: {
      getData: !0,
      setData: !0,
      changeData: !0
    },
    trigger: function (c, d, e, f) {
      if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
        var g = c.type || c,
          h = [],
          i, j, k, l, m, n, o, p, q, r;
        if (bc.test(g + J.event.triggered)) return;
        g.indexOf("!") >= 0 && (g = g.slice(0, -1), j = !0), g.indexOf(".") >= 0 && (h = g.split("."), g = h.shift(), h.sort());
        if ((!e || J.event.customEvent[g]) && !J.event.global[g]) return;
        c = typeof c == "object" ? c[J.expando] ? c : new J.Event(g, c) : new J.Event(g), c.type = g, c.isTrigger = !0, c.exclusive = j, c.namespace = h.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, n = g.indexOf(":") < 0 ? "on" + g : "";
        if (!e) {
          i = J.cache;
          for (k in i) i[k].events && i[k].events[g] && J.event.trigger(c, d, i[k].handle.elem, !0);
          return
        }
        c.result = b, c.target || (c.target = e), d = d != null ? J.makeArray(d) : [], d.unshift(c), o = J.event.special[g] || {};
        if (o.trigger && o.trigger.apply(e, d) === !1) return;
        q = [
          [e, o.bindType || g]
        ];
        if (!f && !o.noBubble && !J.isWindow(e)) {
          r = o.delegateType || g, l = bc.test(r + g) ? e : e.parentNode, m = null;
          for (; l; l = l.parentNode) q.push([l, r]), m = l;
          m && m === e.ownerDocument && q.push([m.defaultView || m.parentWindow || a, r])
        }
        for (k = 0; k < q.length && !c.isPropagationStopped(); k++) l = q[k][0], c.type = q[k][1], p = (J._data(l, "events") || {})[c.type] && J._data(l, "handle"), p && p.apply(l, d), p = n && l[n], p && J.acceptData(l) && p.apply(l, d) === !1 && c.preventDefault();
        return c.type = g, !f && !c.isDefaultPrevented() && (!o._default || o._default.apply(e.ownerDocument, d) === !1) && (g !== "click" || !J.nodeName(e, "a")) && J.acceptData(e) && n && e[g] && (g !== "focus" && g !== "blur" || c.target.offsetWidth !== 0) && !J.isWindow(e) && (m = e[n], m && (e[n] = null), J.event.triggered = g, e[g](), J.event.triggered = b, m && (e[n] = m)), c.result
      }
    },
    dispatch: function (c) {
      c = J.event.fix(c || a.event);
      var d = (J._data(this, "events") || {})[c.type] || [],
        e = d.delegateCount,
        f = [].slice.call(arguments, 0),
        g = !c.exclusive && !c.namespace,
        h = J.event.special[c.type] || {}, i = [],
        j, k, l, m, n, o, p, q, r, s, t;
      f[0] = c, c.delegateTarget = this;
      if (!h.preDispatch || h.preDispatch.call(this, c) !== !1) {
        if (e && (!c.button || c.type !== "click")) {
          m = J(this), m.context = this.ownerDocument || this;
          for (l = c.target; l != this; l = l.parentNode || this)
            if (l.disabled !== !0) {
              o = {}, q = [], m[0] = l;
              for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? bf(l, r.quick) : m.is(s)), o[s] && q.push(r);
              q.length && i.push({
                elem: l,
                matches: q
              })
            }
        }
        d.length > e && i.push({
          elem: this,
          matches: d.slice(e)
        });
        for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
          p = i[j], c.currentTarget = p.elem;
          for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
            r = p.matches[k];
            if (g || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((J.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, f), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
          }
        }
        return h.postDispatch && h.postDispatch.call(this, c), c.result
      }
    },
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (a, b) {
        return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (a, c) {
        var d, e, f, g = c.button,
          h = c.fromElement;
        return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || G, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0), a
      }
    },
    fix: function (a) {
      if (a[J.expando]) return a;
      var c, d, e = a,
        f = J.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props;
      a = J.Event(e);
      for (c = g.length; c;) d = g[--c], a[d] = e[d];
      return a.target || (a.target = e.srcElement || G), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), f.filter ? f.filter(a, e) : a
    },
    special: {
      ready: {
        setup: J.bindReady
      },
      load: {
        noBubble: !0
      },
      focus: {
        delegateType: "focusin"
      },
      blur: {
        delegateType: "focusout"
      },
      beforeunload: {
        setup: function (a, b, c) {
          J.isWindow(this) && (this.onbeforeunload = c)
        },
        teardown: function (a, b) {
          this.onbeforeunload === b && (this.onbeforeunload = null)
        }
      }
    },
    simulate: function (a, b, c, d) {
      var e = J.extend(new J.Event, c, {
        type: a,
        isSimulated: !0,
        originalEvent: {}
      });
      d ? J.event.trigger(e, null, b) : J.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }
  }, J.event.handle = J.event.dispatch, J.removeEvent = G.removeEventListener ? function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1)
  } : function (a, b, c) {
    a.detachEvent && a.detachEvent("on" + b, c)
  }, J.Event = function (a, b) {
    if (this instanceof J.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? A : B) : this.type = a, b && J.extend(this, b), this.timeStamp = a && a.timeStamp || J.now(), this[J.expando] = !0;
    else return new J.Event(a, b)
  }, J.Event.prototype = {
    preventDefault: function () {
      this.isDefaultPrevented = A;
      var a = this.originalEvent;
      !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    },
    stopPropagation: function () {
      this.isPropagationStopped = A;
      var a = this.originalEvent;
      !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = A, this.stopPropagation()
    },
    isDefaultPrevented: B,
    isPropagationStopped: B,
    isImmediatePropagationStopped: B
  }, J.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }, function (a, b) {
    J.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function (a) {
        var c = this,
          d = a.relatedTarget,
          e = a.handleObj,
          f = e.selector,
          g;
        if (!d || d !== c && !J.contains(c, d)) a.type = e.origType, g = e.handler.apply(this, arguments), a.type = b;
        return g
      }
    }
  }), J.support.submitBubbles || (J.event.special.submit = {
    setup: function () {
      if (J.nodeName(this, "form")) return !1;
      J.event.add(this, "click._submit keypress._submit", function (a) {
        var c = a.target,
          d = J.nodeName(c, "input") || J.nodeName(c, "button") ? c.form : b;
        d && !d._submit_attached && (J.event.add(d, "submit._submit", function (a) {
          a._submit_bubble = !0
        }), d._submit_attached = !0)
      })
    },
    postDispatch: function (a) {
      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && J.event.simulate("submit", this.parentNode, a, !0))
    },
    teardown: function () {
      if (J.nodeName(this, "form")) return !1;
      J.event.remove(this, "._submit")
    }
  }), J.support.changeBubbles || (J.event.special.change = {
    setup: function () {
      if (Z.test(this.nodeName)) {
        if (this.type === "checkbox" || this.type === "radio") J.event.add(this, "propertychange._change", function (a) {
          a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
        }), J.event.add(this, "click._change", function (a) {
          this._just_changed && !a.isTrigger && (this._just_changed = !1, J.event.simulate("change", this, a, !0))
        });
        return !1
      }
      J.event.add(this, "beforeactivate._change", function (a) {
        var b = a.target;
        Z.test(b.nodeName) && !b._change_attached && (J.event.add(b, "change._change", function (a) {
          this.parentNode && !a.isSimulated && !a.isTrigger && J.event.simulate("change", this.parentNode, a, !0)
        }), b._change_attached = !0)
      })
    },
    handle: function (a) {
      var b = a.target;
      if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
    },
    teardown: function () {
      return J.event.remove(this, "._change"), Z.test(this.nodeName)
    }
  }), J.support.focusinBubbles || J.each({
    focus: "focusin",
    blur: "focusout"
  }, function (a, b) {
    var c = 0,
      d = function (a) {
        J.event.simulate(b, a.target, J.event.fix(a), !0)
      };
    J.event.special[b] = {
      setup: function () {
        c++ === 0 && G.addEventListener(a, d, !0)
      },
      teardown: function () {
        --c === 0 && G.removeEventListener(a, d, !0)
      }
    }
  }), J.fn.extend({
    on: function (a, c, d, e, f) {
      var g, h;
      if (typeof a == "object") {
        typeof c != "string" && (d = d || c, c = b);
        for (h in a) this.on(h, c, d, a[h], f);
        return this
      }
      d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
      if (e === !1) e = B;
      else if (!e) return this;
      return f === 1 && (g = e, e = function (a) {
        return J().off(a), g.apply(this, arguments)
      }, e.guid = g.guid || (g.guid = J.guid++)), this.each(function () {
        J.event.add(this, a, e, d, c)
      })
    },
    one: function (a, b, c, d) {
      return this.on(a, b, c, d, 1)
    },
    off: function (a, c, d) {
      if (a && a.preventDefault && a.handleObj) {
        var e = a.handleObj;
        return J(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this
      }
      if (typeof a == "object") {
        for (var f in a) this.off(f, c, a[f]);
        return this
      }
      if (c === !1 || typeof c == "function") d = c, c = b;
      return d === !1 && (d = B), this.each(function () {
        J.event.remove(this, a, d, c)
      })
    },
    bind: function (a, b, c) {
      return this.on(a, null, b, c)
    },
    unbind: function (a, b) {
      return this.off(a, null, b)
    },
    live: function (a, b, c) {
      return J(this.context).on(a, this.selector, b, c), this
    },
    die: function (a, b) {
      return J(this.context).off(a, this.selector || "**", b), this
    },
    delegate: function (a, b, c, d) {
      return this.on(b, a, c, d)
    },
    undelegate: function (a, b, c) {
      return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
    },
    trigger: function (a, b) {
      return this.each(function () {
        J.event.trigger(a, b, this)
      })
    },
    triggerHandler: function (a, b) {
      if (this[0]) return J.event.trigger(a, b, this[0], !0)
    },
    toggle: function (a) {
      var b = arguments,
        c = a.guid || J.guid++,
        d = 0,
        e = function (c) {
          var e = (J._data(this, "lastToggle" + a.guid) || 0) % d;
          return J._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
        };
      e.guid = c;
      while (d < b.length) b[d++].guid = c;
      return this.click(e)
    },
    hover: function (a, b) {
      return this.mouseenter(a).mouseleave(b || a)
    }
  }), J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
    J.fn[b] = function (a, c) {
      return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
    }, J.attrFn && (J.attrFn[b] = !0), ba.test(b) && (J.event.fixHooks[b] = J.event.keyHooks), bb.test(b) && (J.event.fixHooks[b] = J.event.mouseHooks)
  }),

  function () {
    function a(a, b, c, d, f, g) {
      for (var h = 0, i = d.length; h < i; h++) {
        var j = d[h];
        if (j) {
          var k = !1;
          j = j[a];
          while (j) {
            if (j[e] === c) {
              k = d[j.sizset];
              break
            }
            if (j.nodeType === 1) {
              g || (j[e] = c, j.sizset = h);
              if (typeof b != "string") {
                if (j === b) {
                  k = !0;
                  break
                }
              } else if (m.filter(b, [j]).length > 0) {
                k = j;
                break
              }
            }
            j = j[a]
          }
          d[h] = k
        }
      }
    }

    function c(a, b, c, d, f, g) {
      for (var h = 0, i = d.length; h < i; h++) {
        var j = d[h];
        if (j) {
          var k = !1;
          j = j[a];
          while (j) {
            if (j[e] === c) {
              k = d[j.sizset];
              break
            }
            j.nodeType === 1 && !g && (j[e] = c, j.sizset = h);
            if (j.nodeName.toLowerCase() === b) {
              k = j;
              break
            }
            j = j[a]
          }
          d[h] = k
        }
      }
    }
    var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
      e = "sizcache" + (Math.random() + "").replace(".", ""),
      f = 0,
      g = Object.prototype.toString,
      h = !1,
      i = !0,
      j = /\\/g,
      k = /\r\n/g,
      l = /\W/;
    [0, 0].sort(function () {
        return i = !1, 0
      });
    var m = function (a, b, c, e) {
      c = c || [], b = b || G;
      var f = b;
      if (b.nodeType !== 1 && b.nodeType !== 9) return [];
      if (!a || typeof a != "string") return c;
      var h, i, j, k, l, n, q, r, t = !0,
        u = m.isXML(b),
        v = [],
        x = a;
      do {
        d.exec(""), h = d.exec(x);
        if (h) {
          x = h[3], v.push(h[1]);
          if (h[2]) {
            k = h[3];
            break
          }
        }
      } while (h);
      if (v.length > 1 && p.exec(a))
        if (v.length === 2 && o.relative[v[0]]) i = w(v[0] + v[1], b, e);
        else {
          i = o.relative[v[0]] ? [b] : m(v.shift(), b);
          while (v.length) a = v.shift(), o.relative[a] && (a += v.shift()), i = w(a, i, e)
        } else {
          !e && v.length > 1 && b.nodeType === 9 && !u && o.match.ID.test(v[0]) && !o.match.ID.test(v[v.length - 1]) && (l = m.find(v.shift(), b, u), b = l.expr ? m.filter(l.expr, l.set)[0] : l.set[0]);
          if (b) {
            l = e ? {
              expr: v.pop(),
              set: s(e)
            } : m.find(v.pop(), v.length !== 1 || v[0] !== "~" && v[0] !== "+" || !b.parentNode ? b : b.parentNode, u), i = l.expr ? m.filter(l.expr, l.set) : l.set, v.length > 0 ? j = s(i) : t = !1;
            while (v.length) n = v.pop(), q = n, o.relative[n] ? q = v.pop() : n = "", q == null && (q = b), o.relative[n](j, q, u)
          } else j = v = []
        }
      j || (j = i), j || m.error(n || a);
      if (g.call(j) === "[object Array]")
        if (!t) c.push.apply(c, j);
        else if (b && b.nodeType === 1)
        for (r = 0; j[r] != null; r++) j[r] && (j[r] === !0 || j[r].nodeType === 1 && m.contains(b, j[r])) && c.push(i[r]);
      else
        for (r = 0; j[r] != null; r++) j[r] && j[r].nodeType === 1 && c.push(i[r]);
      else s(j, c);
      return k && (m(k, f, c, e), m.uniqueSort(c)), c
    };
    m.uniqueSort = function (a) {
      if (u) {
        h = i, a.sort(u);
        if (h)
          for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
      }
      return a
    }, m.matches = function (a, b) {
      return m(a, null, null, b)
    }, m.matchesSelector = function (a, b) {
      return m(b, null, null, [a]).length > 0
    }, m.find = function (a, b, c) {
      var d, e, f, g, h, i;
      if (!a) return [];
      for (e = 0, f = o.order.length; e < f; e++) {
        h = o.order[e];
        if (g = o.leftMatch[h].exec(a)) {
          i = g[1], g.splice(1, 1);
          if (i.substr(i.length - 1) !== "\\") {
            g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
            if (d != null) {
              a = a.replace(o.match[h], "");
              break
            }
          }
        }
      }
      return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []), {
        set: d,
        expr: a
      }
    }, m.filter = function (a, c, d, e) {
      var f, g, h, i, j, k, l, n, p, q = a,
        r = [],
        s = c,
        t = c && c[0] && m.isXML(c[0]);
      while (a && c.length) {
        for (h in o.filter)
          if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
            k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
            if (l.substr(l.length - 1) === "\\") continue;
            s === r && (r = []);
            if (o.preFilter[h]) {
              f = o.preFilter[h](f, s, d, r, e, t);
              if (!f) g = i = !0;
              else if (f === !0) continue
            }
            if (f)
              for (n = 0;
                (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
            if (i !== b) {
              d || (s = r), a = a.replace(o.match[h], "");
              if (!g) return [];
              break
            }
          }
        if (a === q)
          if (g == null) m.error(a);
          else break;
        q = a
      }
      return s
    }, m.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a)
    };
    var n = m.getText = function (a) {
      var b, c, d = a.nodeType,
        e = "";
      if (d) {
        if (d === 1 || d === 9 || d === 11) {
          if (typeof a.textContent == "string") return a.textContent;
          if (typeof a.innerText == "string") return a.innerText.replace(k, "");
          for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
        } else if (d === 3 || d === 4) return a.nodeValue
      } else
        for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
      return e
    }, o = m.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
          ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
          CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
          NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
          ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
          TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
          CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
          POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
          PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
          "class": "className",
          "for": "htmlFor"
        },
        attrHandle: {
          href: function (a) {
            return a.getAttribute("href")
          },
          type: function (a) {
            return a.getAttribute("type")
          }
        },
        relative: {
          "+": function (a, b) {
            var c = typeof b == "string",
              d = c && !l.test(b),
              e = c && !d;
            d && (b = b.toLowerCase());
            for (var f = 0, g = a.length, h; f < g; f++)
              if (h = a[f]) {
                while ((h = h.previousSibling) && h.nodeType !== 1);
                a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
              }
            e && m.filter(b, a, !0)
          },
          ">": function (a, b) {
            var c, d = typeof b == "string",
              e = 0,
              f = a.length;
            if (d && !l.test(b)) {
              b = b.toLowerCase();
              for (; e < f; e++) {
                c = a[e];
                if (c) {
                  var g = c.parentNode;
                  a[e] = g.nodeName.toLowerCase() === b ? g : !1
                }
              }
            } else {
              for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
              d && m.filter(b, a, !0)
            }
          },
          "": function (b, d, e) {
            var g, h = f++,
              i = a;
            typeof d == "string" && !l.test(d) && (d = d.toLowerCase(), g = d, i = c), i("parentNode", d, h, b, g, e)
          },
          "~": function (b, d, e) {
            var g, h = f++,
              i = a;
            typeof d == "string" && !l.test(d) && (d = d.toLowerCase(), g = d, i = c), i("previousSibling", d, h, b, g, e)
          }
        },
        find: {
          ID: function (a, b, c) {
            if (typeof b.getElementById != "undefined" && !c) {
              var d = b.getElementById(a[1]);
              return d && d.parentNode ? [d] : []
            }
          },
          NAME: function (a, b) {
            if (typeof b.getElementsByName != "undefined") {
              var c = [],
                d = b.getElementsByName(a[1]);
              for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
              return c.length === 0 ? null : c
            }
          },
          TAG: function (a, b) {
            if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
          }
        },
        preFilter: {
          CLASS: function (a, b, c, d, e, f) {
            a = " " + a[1].replace(j, "") + " ";
            if (f) return a;
            for (var g = 0, h;
              (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
            return !1
          },
          ID: function (a) {
            return a[1].replace(j, "")
          },
          TAG: function (a, b) {
            return a[1].replace(j, "").toLowerCase()
          },
          CHILD: function (a) {
            if (a[1] === "nth") {
              a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
              var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
              a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
            } else a[2] && m.error(a[0]);
            return a[0] = f++, a
          },
          ATTR: function (a, b, c, d, e, f) {
            var g = a[1] = a[1].replace(j, "");
            return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "), a
          },
          PSEUDO: function (a, b, c, e, f) {
            if (a[1] === "not")
              if ((d.exec(a[3]) || "").length > 1 || /^\w/.test(a[3])) a[3] = m(a[3], null, null, b);
              else {
                var g = m.filter(a[3], b, c, !0 ^ f);
                return c || e.push.apply(e, g), !1
              } else if (o.match.POS.test(a[0]) || o.match.CHILD.test(a[0])) return !0;
            return a
          },
          POS: function (a) {
            return a.unshift(!0), a
          }
        },
        filters: {
          enabled: function (a) {
            return a.disabled === !1 && a.type !== "hidden"
          },
          disabled: function (a) {
            return a.disabled === !0
          },
          checked: function (a) {
            return a.checked === !0
          },
          selected: function (a) {
            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
          },
          parent: function (a) {
            return !!a.firstChild
          },
          empty: function (a) {
            return !a.firstChild
          },
          has: function (a, b, c) {
            return !!m(c[3], a).length
          },
          header: function (a) {
            return /h\d/i.test(a.nodeName)
          },
          text: function (a) {
            var b = a.getAttribute("type"),
              c = a.type;
            return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
          },
          radio: function (a) {
            return a.nodeName.toLowerCase() === "input" && "radio" === a.type
          },
          checkbox: function (a) {
            return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
          },
          file: function (a) {
            return a.nodeName.toLowerCase() === "input" && "file" === a.type
          },
          password: function (a) {
            return a.nodeName.toLowerCase() === "input" && "password" === a.type
          },
          submit: function (a) {
            var b = a.nodeName.toLowerCase();
            return (b === "input" || b === "button") && "submit" === a.type
          },
          image: function (a) {
            return a.nodeName.toLowerCase() === "input" && "image" === a.type
          },
          reset: function (a) {
            var b = a.nodeName.toLowerCase();
            return (b === "input" || b === "button") && "reset" === a.type
          },
          button: function (a) {
            var b = a.nodeName.toLowerCase();
            return b === "input" && "button" === a.type || b === "button"
          },
          input: function (a) {
            return /input|select|textarea|button/i.test(a.nodeName)
          },
          focus: function (a) {
            return a === a.ownerDocument.activeElement
          }
        },
        setFilters: {
          first: function (a, b) {
            return b === 0
          },
          last: function (a, b, c, d) {
            return b === d.length - 1
          },
          even: function (a, b) {
            return b % 2 === 0
          },
          odd: function (a, b) {
            return b % 2 === 1
          },
          lt: function (a, b, c) {
            return b < c[3] - 0
          },
          gt: function (a, b, c) {
            return b > c[3] - 0
          },
          nth: function (a, b, c) {
            return c[3] - 0 === b
          },
          eq: function (a, b, c) {
            return c[3] - 0 === b
          }
        },
        filter: {
          PSEUDO: function (a, b, c, d) {
            var e = b[1],
              f = o.filters[e];
            if (f) return f(a, c, b, d);
            if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
            if (e === "not") {
              var g = b[3];
              for (var h = 0, i = g.length; h < i; h++)
                if (g[h] === a) return !1;
              return !0
            }
            m.error(e)
          },
          CHILD: function (a, b) {
            var c, d, f, g, h, i, j, k = b[1],
              l = a;
            switch (k) {
            case "only":
            case "first":
              while (l = l.previousSibling)
                if (l.nodeType === 1) return !1;
              if (k === "first") return !0;
              l = a;
            case "last":
              while (l = l.nextSibling)
                if (l.nodeType === 1) return !1;
              return !0;
            case "nth":
              c = b[2], d = b[3];
              if (c === 1 && d === 0) return !0;
              f = b[0], g = a.parentNode;
              if (g && (g[e] !== f || !a.nodeIndex)) {
                i = 0;
                for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                g[e] = f
              }
              return j = a.nodeIndex - d, c === 0 ? j === 0 : j % c === 0 && j / c >= 0
            }
          },
          ID: function (a, b) {
            return a.nodeType === 1 && a.getAttribute("id") === b
          },
          TAG: function (a, b) {
            return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
          },
          CLASS: function (a, b) {
            return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
          },
          ATTR: function (a, b) {
            var c = b[1],
              d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
              e = d + "",
              f = b[2],
              g = b[4];
            return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
          },
          POS: function (a, b, c, d) {
            var e = b[2],
              f = o.setFilters[e];
            if (f) return f(a, c, b, d)
          }
        }
      }, p = o.match.POS,
      q = function (a, b) {
        return "\\" + (b - 0 + 1)
      };
    for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
    o.match.globalPOS = p;
    var s = function (a, b) {
      return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a
    };
    try {
      Array.prototype.slice.call(G.documentElement.childNodes, 0)[0].nodeType
    } catch (t) {
      s = function (a, b) {
        var c = 0,
          d = b || [];
        if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
        else if (typeof a.length == "number")
          for (var e = a.length; c < e; c++) d.push(a[c]);
        else
          for (; a[c]; c++) d.push(a[c]);
        return d
      }
    }
    var u, v;
    G.documentElement.compareDocumentPosition ? u = function (a, b) {
      return a === b ? (h = !0, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1
    } : (u = function (a, b) {
      if (a === b) return h = !0, 0;
      if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
      var c, d, e = [],
        f = [],
        g = a.parentNode,
        i = b.parentNode,
        j = g;
      if (g === i) return v(a, b);
      if (!g) return -1;
      if (!i) return 1;
      while (j) e.unshift(j), j = j.parentNode;
      j = i;
      while (j) f.unshift(j), j = j.parentNode;
      c = e.length, d = f.length;
      for (var k = 0; k < c && k < d; k++)
        if (e[k] !== f[k]) return v(e[k], f[k]);
      return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
    }, v = function (a, b, c) {
      if (a === b) return c;
      var d = a.nextSibling;
      while (d) {
        if (d === b) return -1;
        d = d.nextSibling
      }
      return 1
    }),

    function () {
      var a = G.createElement("div"),
        c = "script" + (new Date).getTime(),
        d = G.documentElement;
      a.innerHTML = "<a name='" + c + "'/>", d.insertBefore(a, d.firstChild), G.getElementById(c) && (o.find.ID = function (a, c, d) {
        if (typeof c.getElementById != "undefined" && !d) {
          var e = c.getElementById(a[1]);
          return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
        }
      }, o.filter.ID = function (a, b) {
        var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
        return a.nodeType === 1 && c && c.nodeValue === b
      }), d.removeChild(a), d = a = null
    }(),

    function () {
      var a = G.createElement("div");
      a.appendChild(G.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
        var c = b.getElementsByTagName(a[1]);
        if (a[1] === "*") {
          var d = [];
          for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
          c = d
        }
        return c
      }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
        return a.getAttribute("href", 2)
      }), a = null
    }(), G.querySelectorAll && function () {
      var a = m,
        b = G.createElement("div"),
        c = "__sizzle__";
      b.innerHTML = "<p class='TEST'></p>";
      if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
        m = function (b, d, e, f) {
          d = d || G;
          if (!f && !m.isXML(d)) {
            var g = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
            if (g && (d.nodeType === 1 || d.nodeType === 9)) {
              if (g[1]) return s(d.getElementsByTagName(b), e);
              if (g[2] && o.find.CLASS && d.getElementsByClassName) return s(d.getElementsByClassName(g[2]), e)
            }
            if (d.nodeType === 9) {
              if (b === "body" && d.body) return s([d.body], e);
              if (g && g[3]) {
                var h = d.getElementById(g[3]);
                if (!h || !h.parentNode) return s([], e);
                if (h.id === g[3]) return s([h], e)
              }
              try {
                return s(d.querySelectorAll(b), e)
              } catch (i) {}
            } else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
              var j = d,
                k = d.getAttribute("id"),
                l = k || c,
                n = d.parentNode,
                p = /^\s*[+~]/.test(b);
              k ? l = l.replace(/'/g, "\\$&") : d.setAttribute("id", l), p && n && (d = d.parentNode);
              try {
                if (!p || n) return s(d.querySelectorAll("[id='" + l + "'] " + b), e)
              } catch (q) {} finally {
                k || j.removeAttribute("id")
              }
            }
          }
          return a(b, d, e, f)
        };
        for (var d in a) m[d] = a[d];
        b = null
      }
    }(),

    function () {
      var a = G.documentElement,
        b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
      if (b) {
        var c = !b.call(G.createElement("div"), "div"),
          d = !1;
        try {
          b.call(G.documentElement, "[test!='']:sizzle")
        } catch (e) {
          d = !0
        }
        m.matchesSelector = function (a, e) {
          e = e.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
          if (!m.isXML(a)) try {
            if (d || !o.match.PSEUDO.test(e) && !/!=/.test(e)) {
              var f = b.call(a, e);
              if (f || !c || a.document && a.document.nodeType !== 11) return f
            }
          } catch (g) {}
          return m(e, null, null, [a]).length > 0
        }
      }
    }(),

    function () {
      var a = G.createElement("div");
      a.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if ( !! a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
        a.lastChild.className = "e";
        if (a.getElementsByClassName("e").length === 1) return;
        o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
          if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
        }, a = null
      }
    }(), G.documentElement.contains ? m.contains = function (a, b) {
      return a !== b && (a.contains ? a.contains(b) : !0)
    } : G.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
      return !!(a.compareDocumentPosition(b) & 16)
    } : m.contains = function () {
      return !1
    }, m.isXML = function (a) {
      var b = (a ? a.ownerDocument || a : 0).documentElement;
      return b ? b.nodeName !== "HTML" : !1
    };
    var w = function (a, b, c) {
      var d, e = [],
        f = "",
        g = b.nodeType ? [b] : b;
      while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
      a = o.relative[a] ? a + "*" : a;
      for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
      return m.filter(f, e)
    };
    m.attr = J.attr, m.selectors.attrMap = {}, J.find = m, J.expr = m.selectors, J.expr[":"] = J.expr.filters, J.unique = m.uniqueSort, J.text = m.getText, J.isXMLDoc = m.isXML, J.contains = m.contains
  }();
  var bh = /Until$/,
    bi = /^(?:parents|prevUntil|prevAll)/,
    bj = /,/,
    bk = /^.[^:#\[\.,]*$/,
    bl = Array.prototype.slice,
    bm = J.expr.match.globalPOS,
    bn = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  J.fn.extend({
    find: function (a) {
      var b = this,
        c, d;
      if (typeof a != "string") return J(a).filter(function () {
        for (c = 0, d = b.length; c < d; c++)
          if (J.contains(b[c], this)) return !0
      });
      var e = this.pushStack("", "find", a),
        f, g, h;
      for (c = 0, d = this.length; c < d; c++) {
        f = e.length, J.find(a, this[c], e);
        if (c > 0)
          for (g = f; g < e.length; g++)
            for (h = 0; h < f; h++)
              if (e[h] === e[g]) {
                e.splice(g--, 1);
                break
              }
      }
      return e
    },
    has: function (a) {
      var b = J(a);
      return this.filter(function () {
        for (var a = 0, c = b.length; a < c; a++)
          if (J.contains(this, b[a])) return !0
      })
    },
    not: function (a) {
      return this.pushStack(y(this, a, !1), "not", a)
    },
    filter: function (a) {
      return this.pushStack(y(this, a, !0), "filter", a)
    },
    is: function (a) {
      return !!a && (typeof a == "string" ? bm.test(a) ? J(a, this.context).index(this[0]) >= 0 : J.filter(a, this).length > 0 : this.filter(a).length > 0)
    },
    closest: function (a, b) {
      var c = [],
        d, e, f = this[0];
      if (J.isArray(a)) {
        var g = 1;
        while (f && f.ownerDocument && f !== b) {
          for (d = 0; d < a.length; d++) J(f).is(a[d]) && c.push({
            selector: a[d],
            elem: f,
            level: g
          });
          f = f.parentNode, g++
        }
        return c
      }
      var h = bm.test(a) || typeof a != "string" ? J(a, b || this.context) : 0;
      for (d = 0, e = this.length; d < e; d++) {
        f = this[d];
        while (f) {
          if (h ? h.index(f) > -1 : J.find.matchesSelector(f, a)) {
            c.push(f);
            break
          }
          f = f.parentNode;
          if (!f || !f.ownerDocument || f === b || f.nodeType === 11) break
        }
      }
      return c = c.length > 1 ? J.unique(c) : c, this.pushStack(c, "closest", a)
    },
    index: function (a) {
      return a ? typeof a == "string" ? J.inArray(this[0], J(a)) : J.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
    },
    add: function (a, b) {
      var c = typeof a == "string" ? J(a, b) : J.makeArray(a && a.nodeType ? [a] : a),
        d = J.merge(this.get(), c);
      return this.pushStack(z(c[0]) || z(d[0]) ? d : J.unique(d))
    },
    andSelf: function () {
      return this.add(this.prevObject)
    }
  }), J.each({
    parent: function (a) {
      var b = a.parentNode;
      return b && b.nodeType !== 11 ? b : null
    },
    parents: function (a) {
      return J.dir(a, "parentNode")
    },
    parentsUntil: function (a, b, c) {
      return J.dir(a, "parentNode", c)
    },
    next: function (a) {
      return J.nth(a, 2, "nextSibling")
    },
    prev: function (a) {
      return J.nth(a, 2, "previousSibling")
    },
    nextAll: function (a) {
      return J.dir(a, "nextSibling")
    },
    prevAll: function (a) {
      return J.dir(a, "previousSibling")
    },
    nextUntil: function (a, b, c) {
      return J.dir(a, "nextSibling", c)
    },
    prevUntil: function (a, b, c) {
      return J.dir(a, "previousSibling", c)
    },
    siblings: function (a) {
      return J.sibling((a.parentNode || {}).firstChild, a)
    },
    children: function (a) {
      return J.sibling(a.firstChild)
    },
    contents: function (a) {
      return J.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : J.makeArray(a.childNodes)
    }
  }, function (a, b) {
    J.fn[a] = function (c, d) {
      var e = J.map(this, b, c);
      return bh.test(a) || (d = c), d && typeof d == "string" && (e = J.filter(d, e)), e = this.length > 1 && !bn[a] ? J.unique(e) : e, (this.length > 1 || bj.test(d)) && bi.test(a) && (e = e.reverse()), this.pushStack(e, a, bl.call(arguments).join(","))
    }
  }), J.extend({
    filter: function (a, b, c) {
      return c && (a = ":not(" + a + ")"), b.length === 1 ? J.find.matchesSelector(b[0], a) ? [b[0]] : [] : J.find.matches(a, b)
    },
    dir: function (a, c, d) {
      var e = [],
        f = a[c];
      while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !J(f).is(d))) f.nodeType === 1 && e.push(f), f = f[c];
      return e
    },
    nth: function (a, b, c, d) {
      b = b || 1;
      var e = 0;
      for (; a; a = a[c])
        if (a.nodeType === 1 && ++e === b) break;
      return a
    },
    sibling: function (a, b) {
      var c = [];
      for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
      return c
    }
  });
  var bo = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    bp = / jQuery\d+="(?:\d+|null)"/g,
    bq = /^\s+/,
    br = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    bs = /<([\w:]+)/,
    bt = /<tbody/i,
    bu = /<|&#?\w+;/,
    bv = /<(?:script|style)/i,
    bw = /<(?:script|object|embed|option|style)/i,
    bx = new RegExp("<(?:" + bo + ")[\\s/>]", "i"),
    by = /checked\s*(?:[^=]|=\s*.checked.)/i,
    bz = /\/(java|ecma)script/i,
    bA = /^\s*<!(?:\[CDATA\[|\-\-)/,
    bB = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      area: [1, "<map>", "</map>"],
      _default: [0, "", ""]
    }, bC = x(G);
  bB.optgroup = bB.option, bB.tbody = bB.tfoot = bB.colgroup = bB.caption = bB.thead, bB.th = bB.td, J.support.htmlSerialize || (bB._default = [1, "div<div>", "</div>"]), J.fn.extend({
    text: function (a) {
      return J.access(this, function (a) {
        return a === b ? J.text(this) : this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(a))
      }, null, a, arguments.length)
    },
    wrapAll: function (a) {
      if (J.isFunction(a)) return this.each(function (b) {
        J(this).wrapAll(a.call(this, b))
      });
      if (this[0]) {
        var b = J(a, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
          var a = this;
          while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
          return a
        }).append(this)
      }
      return this
    },
    wrapInner: function (a) {
      return J.isFunction(a) ? this.each(function (b) {
        J(this).wrapInner(a.call(this, b))
      }) : this.each(function () {
        var b = J(this),
          c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a)
      })
    },
    wrap: function (a) {
      var b = J.isFunction(a);
      return this.each(function (c) {
        J(this).wrapAll(b ? a.call(this, c) : a)
      })
    },
    unwrap: function () {
      return this.parent().each(function () {
        J.nodeName(this, "body") || J(this).replaceWith(this.childNodes)
      }).end()
    },
    append: function () {
      return this.domManip(arguments, !0, function (a) {
        this.nodeType === 1 && this.appendChild(a)
      })
    },
    prepend: function () {
      return this.domManip(arguments, !0, function (a) {
        this.nodeType === 1 && this.insertBefore(a, this.firstChild)
      })
    },
    before: function () {
      if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
        this.parentNode.insertBefore(a, this)
      });
      if (arguments.length) {
        var a = J.clean(arguments);
        return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments)
      }
    },
    after: function () {
      if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
        this.parentNode.insertBefore(a, this.nextSibling)
      });
      if (arguments.length) {
        var a = this.pushStack(this, "after", arguments);
        return a.push.apply(a, J.clean(arguments)), a
      }
    },
    remove: function (a, b) {
      for (var c = 0, d;
        (d = this[c]) != null; c++)
        if (!a || J.filter(a, [d]).length)!b && d.nodeType === 1 && (J.cleanData(d.getElementsByTagName("*")), J.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
      return this
    },
    empty: function () {
      for (var a = 0, b;
        (b = this[a]) != null; a++) {
        b.nodeType === 1 && J.cleanData(b.getElementsByTagName("*"));
        while (b.firstChild) b.removeChild(b.firstChild)
      }
      return this
    },
    clone: function (a, b) {
      return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function () {
        return J.clone(this, a, b)
      })
    },
    html: function (a) {
      return J.access(this, function (a) {
        var c = this[0] || {}, d = 0,
          e = this.length;
        if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(bp, "") : null;
        if (typeof a == "string" && !bv.test(a) && (J.support.leadingWhitespace || !bq.test(a)) && !bB[(bs.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = a.replace(br, "<$1></$2>");
          try {
            for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && (J.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
            c = 0
          } catch (f) {}
        }
        c && this.empty().append(a)
      }, null, a, arguments.length)
    },
    replaceWith: function (a) {
      return this[0] && this[0].parentNode ? J.isFunction(a) ? this.each(function (b) {
        var c = J(this),
          d = c.html();
        c.replaceWith(a.call(this, b, d))
      }) : (typeof a != "string" && (a = J(a).detach()), this.each(function () {
        var b = this.nextSibling,
          c = this.parentNode;
        J(this).remove(), b ? J(b).before(a) : J(c).append(a)
      })) : this.length ? this.pushStack(J(J.isFunction(a) ? a() : a), "replaceWith", a) : this
    },
    detach: function (a) {
      return this.remove(a, !0)
    },
    domManip: function (a, c, d) {
      var e, f, g, h, i = a[0],
        j = [];
      if (!J.support.checkClone && arguments.length === 3 && typeof i == "string" && by.test(i)) return this.each(function () {
        J(this).domManip(a, c, d, !0)
      });
      if (J.isFunction(i)) return this.each(function (e) {
        var f = J(this);
        a[0] = i.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
      });
      if (this[0]) {
        h = i && i.parentNode, J.support.parentNode && h && h.nodeType === 11 && h.childNodes.length === this.length ? e = {
          fragment: h
        } : e = J.buildFragment(a, this, j), g = e.fragment, g.childNodes.length === 1 ? f = g = g.firstChild : f = g.firstChild;
        if (f) {
          c = c && J.nodeName(f, "tr");
          for (var k = 0, l = this.length, m = l - 1; k < l; k++) d.call(c ? w(this[k], f) : this[k], e.cacheable || l > 1 && k < m ? J.clone(g, !0, !0) : g)
        }
        j.length && J.each(j, function (a, b) {
          b.src ? J.ajax({
            type: "GET",
            global: !1,
            url: b.src,
            async: !1,
            dataType: "script"
          }) : J.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bA, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
        })
      }
      return this
    }
  }), J.buildFragment = function (a, b, c) {
    var d, e, f, g, h = a[0];
    return b && b[0] && (g = b[0].ownerDocument || b[0]), g.createDocumentFragment || (g = G), a.length === 1 && typeof h == "string" && h.length < 512 && g === G && h.charAt(0) === "<" && !bw.test(h) && (J.support.checkClone || !by.test(h)) && (J.support.html5Clone || !bx.test(h)) && (e = !0, f = J.fragments[h], f && f !== 1 && (d = f)), d || (d = g.createDocumentFragment(), J.clean(a, g, d, c)), e && (J.fragments[h] = f ? d : 1), {
      fragment: d,
      cacheable: e
    }
  }, J.fragments = {}, J.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (a, b) {
    J.fn[a] = function (c) {
      var d = [],
        e = J(c),
        f = this.length === 1 && this[0].parentNode;
      if (f && f.nodeType === 11 && f.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
      for (var g = 0, h = e.length; g < h; g++) {
        var i = (g > 0 ? this.clone(!0) : this).get();
        J(e[g])[b](i), d = d.concat(i)
      }
      return this.pushStack(d, a, e.selector)
    }
  }), J.extend({
    clone: function (a, b, c) {
      var d, e, f, g = J.support.html5Clone || J.isXMLDoc(a) || !bx.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : q(a);
      if ((!J.support.noCloneEvent || !J.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !J.isXMLDoc(a)) {
        u(a, g), d = t(a), e = t(g);
        for (f = 0; d[f]; ++f) e[f] && u(d[f], e[f])
      }
      if (b) {
        v(a, g);
        if (c) {
          d = t(a), e = t(g);
          for (f = 0; d[f]; ++f) v(d[f], e[f])
        }
      }
      return d = e = null, g
    },
    clean: function (a, b, c, d) {
      var e, f, g, h = [];
      b = b || G, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || G);
      for (var i = 0, j;
        (j = a[i]) != null; i++) {
        typeof j == "number" && (j += "");
        if (!j) continue;
        if (typeof j == "string")
          if (!bu.test(j)) j = b.createTextNode(j);
          else {
            j = j.replace(br, "<$1></$2>");
            var k = (bs.exec(j) || ["", ""])[1].toLowerCase(),
              l = bB[k] || bB._default,
              m = l[0],
              n = b.createElement("div"),
              o = bC.childNodes,
              p;
            b === G ? bC.appendChild(n) : x(b).appendChild(n), n.innerHTML = l[1] + j + l[2];
            while (m--) n = n.lastChild;
            if (!J.support.tbody) {
              var q = bt.test(j),
                s = k === "table" && !q ? n.firstChild && n.firstChild.childNodes : l[1] === "<table>" && !q ? n.childNodes : [];
              for (g = s.length - 1; g >= 0; --g) J.nodeName(s[g], "tbody") && !s[g].childNodes.length && s[g].parentNode.removeChild(s[g])
            }!J.support.leadingWhitespace && bq.test(j) && n.insertBefore(b.createTextNode(bq.exec(j)[0]), n.firstChild), j = n.childNodes, n && (n.parentNode.removeChild(n), o.length > 0 && (p = o[o.length - 1], p && p.parentNode && p.parentNode.removeChild(p)))
          }
        var t;
        if (!J.support.appendChecked)
          if (j[0] && typeof (t = j.length) == "number")
            for (g = 0; g < t; g++) r(j[g]);
          else r(j);
        j.nodeType ? h.push(j) : h = J.merge(h, j)
      }
      if (c) {
        e = function (a) {
          return !a.type || bz.test(a.type)
        };
        for (i = 0; h[i]; i++) {
          f = h[i];
          if (d && J.nodeName(f, "script") && (!f.type || bz.test(f.type))) d.push(f.parentNode ? f.parentNode.removeChild(f) : f);
          else {
            if (f.nodeType === 1) {
              var u = J.grep(f.getElementsByTagName("script"), e);
              h.splice.apply(h, [i + 1, 0].concat(u))
            }
            c.appendChild(f)
          }
        }
      }
      return h
    },
    cleanData: function (a) {
      var b, c, d = J.cache,
        e = J.event.special,
        f = J.support.deleteExpando;
      for (var g = 0, h;
        (h = a[g]) != null; g++) {
        if (h.nodeName && J.noData[h.nodeName.toLowerCase()]) continue;
        c = h[J.expando];
        if (c) {
          b = d[c];
          if (b && b.events) {
            for (var i in b.events) e[i] ? J.event.remove(h, i) : J.removeEvent(h, i, b.handle);
            b.handle && (b.handle.elem = null)
          }
          f ? delete h[J.expando] : h.removeAttribute && h.removeAttribute(J.expando), delete d[c]
        }
      }
    }
  });
  var bD = /alpha\([^)]*\)/i,
    bE = /opacity=([^)]*)/,
    bF = /([A-Z]|^ms)/g,
    bG = /^[\-+]?(?:\d*\.)?\d+$/i,
    bH = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
    bI = /^([\-+])=([\-+.\de]+)/,
    bJ = /^margin/,
    bK = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    }, bL = ["Top", "Right", "Bottom", "Left"],
    bM, bN, bO;
  J.fn.css = function (a, c) {
    return J.access(this, function (a, c, d) {
      return d !== b ? J.style(a, c, d) : J.css(a, c)
    }, a, c, arguments.length > 1)
  }, J.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = bM(a, "opacity");
            return c === "" ? "1" : c
          }
          return a.style.opacity
        }
      }
    },
    cssNumber: {
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": J.support.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function (a, c, d, e) {
      if ( !! a && a.nodeType !== 3 && a.nodeType !== 8 && !! a.style) {
        var f, g, h = J.camelCase(c),
          i = a.style,
          j = J.cssHooks[h];
        c = J.cssProps[h] || h;
        if (d === b) return j && "get" in j && (f = j.get(a, !1, e)) !== b ? f : i[c];
        g = typeof d, g === "string" && (f = bI.exec(d)) && (d = +(f[1] + 1) * +f[2] + parseFloat(J.css(a, c)), g = "number");
        if (d == null || g === "number" && isNaN(d)) return;
        g === "number" && !J.cssNumber[h] && (d += "px");
        if (!j || !("set" in j) || (d = j.set(a, d)) !== b) try {
          i[c] = d
        } catch (k) {}
      }
    },
    css: function (a, c, d) {
      var e, f;
      c = J.camelCase(c), f = J.cssHooks[c], c = J.cssProps[c] || c, c === "cssFloat" && (c = "float");
      if (f && "get" in f && (e = f.get(a, !0, d)) !== b) return e;
      if (bM) return bM(a, c)
    },
    swap: function (a, b, c) {
      var d = {}, e, f;
      for (f in b) d[f] = a.style[f], a.style[f] = b[f];
      e = c.call(a);
      for (f in b) a.style[f] = d[f];
      return e
    }
  }), J.curCSS = J.css, G.defaultView && G.defaultView.getComputedStyle && (bN = function (a, b) {
    var c, d, e, f, g = a.style;
    return b = b.replace(bF, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !J.contains(a.ownerDocument.documentElement, a) && (c = J.style(a, b))), !J.support.pixelMargin && e && bJ.test(b) && bH.test(c) && (f = g.width, g.width = c, c = e.width, g.width = f), c
  }), G.documentElement.currentStyle && (bO = function (a, b) {
    var c, d, e, f = a.currentStyle && a.currentStyle[b],
      g = a.style;
    return f == null && g && (e = g[b]) && (f = e), bH.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), f === "" ? "auto" : f
  }), bM = bN || bO, J.each(["height", "width"], function (a, b) {
    J.cssHooks[b] = {
      get: function (a, c, d) {
        if (c) return a.offsetWidth !== 0 ? p(a, b, d) : J.swap(a, bK, function () {
          return p(a, b, d)
        })
      },
      set: function (a, b) {
        return bG.test(b) ? b + "px" : b
      }
    }
  }), J.support.opacity || (J.cssHooks.opacity = {
    get: function (a, b) {
      return bE.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
    },
    set: function (a, b) {
      var c = a.style,
        d = a.currentStyle,
        e = J.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
        f = d && d.filter || c.filter || "";
      c.zoom = 1;
      if (b >= 1 && J.trim(f.replace(bD, "")) === "") {
        c.removeAttribute("filter");
        if (d && !d.filter) return
      }
      c.filter = bD.test(f) ? f.replace(bD, e) : f + " " + e
    }
  }), J(function () {
    J.support.reliableMarginRight || (J.cssHooks.marginRight = {
      get: function (a, b) {
        return J.swap(a, {
          display: "inline-block"
        }, function () {
          return b ? bM(a, "margin-right") : a.style.marginRight
        })
      }
    })
  }), J.expr && J.expr.filters && (J.expr.filters.hidden = function (a) {
    var b = a.offsetWidth,
      c = a.offsetHeight;
    return b === 0 && c === 0 || !J.support.reliableHiddenOffsets && (a.style && a.style.display || J.css(a, "display")) === "none"
  }, J.expr.filters.visible = function (a) {
    return !J.expr.filters.hidden(a)
  }), J.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (a, b) {
    J.cssHooks[a + b] = {
      expand: function (c) {
        var d, e = typeof c == "string" ? c.split(" ") : [c],
          f = {};
        for (d = 0; d < 4; d++) f[a + bL[d] + b] = e[d] || e[d - 2] || e[0];
        return f
      }
    }
  });
  var bP = /%20/g,
    bQ = /\[\]$/,
    bR = /\r?\n/g,
    bS = /#.*$/,
    bT = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
    bU = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    bV = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
    bW = /^(?:GET|HEAD)$/,
    bX = /^\/\//,
    bY = /\?/,
    bZ = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    b$ = /^(?:select|textarea)/i,
    b_ = /\s+/,
    ca = /([?&])_=[^&]*/,
    cb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
    cc = J.fn.load,
    cd = {}, ce = {}, cf, cg, ch = ["*/"] + ["*"];
  try {
    cf = I.href
  } catch (ci) {
    cf = G.createElement("a"), cf.href = "", cf = cf.href
  }
  cg = cb.exec(cf.toLowerCase()) || [], J.fn.extend({
    load: function (a, c, d) {
      if (typeof a != "string" && cc) return cc.apply(this, arguments);
      if (!this.length) return this;
      var e = a.indexOf(" ");
      if (e >= 0) {
        var f = a.slice(e, a.length);
        a = a.slice(0, e)
      }
      var g = "GET";
      c && (J.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = J.param(c, J.ajaxSettings.traditional), g = "POST"));
      var h = this;
      return J.ajax({
        url: a,
        type: g,
        dataType: "html",
        data: c,
        complete: function (a, b, c) {
          c = a.responseText, a.isResolved() && (a.done(function (a) {
            c = a
          }), h.html(f ? J("<div>").append(c.replace(bZ, "")).find(f) : c)), d && h.each(d, [c, b, a])
        }
      }), this
    },
    serialize: function () {
      return J.param(this.serializeArray())
    },
    serializeArray: function () {
      return this.map(function () {
        return this.elements ? J.makeArray(this.elements) : this
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || b$.test(this.nodeName) || bU.test(this.type))
      }).map(function (a, b) {
        var c = J(this).val();
        return c == null ? null : J.isArray(c) ? J.map(c, function (a, c) {
          return {
            name: b.name,
            value: a.replace(bR, "\r\n")
          }
        }) : {
          name: b.name,
          value: c.replace(bR, "\r\n")
        }
      }).get()
    }
  }), J.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
    J.fn[b] = function (a) {
      return this.on(b, a)
    }
  }), J.each(["get", "post"], function (a, c) {
    J[c] = function (a, d, e, f) {
      return J.isFunction(d) && (f = f || e, e = d, d = b), J.ajax({
        type: c,
        url: a,
        data: d,
        success: e,
        dataType: f
      })
    }
  }), J.extend({
    getScript: function (a, c) {
      return J.get(a, b, c, "script")
    },
    getJSON: function (a, b, c) {
      return J.get(a, b, c, "json")
    },
    ajaxSetup: function (a, b) {
      return b ? m(a, J.ajaxSettings) : (b = a, a = J.ajaxSettings), m(a, b), a
    },
    ajaxSettings: {
      url: cf,
      isLocal: bV.test(cg[1]),
      global: !0,
      type: "GET",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      processData: !0,
      async: !0,
      accepts: {
        xml: "application/xml, text/xml",
        html: "text/html",
        text: "text/plain",
        json: "application/json, text/javascript",
        "*": ch
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText"
      },
      converters: {
        "* text": a.String,
        "text html": !0,
        "text json": J.parseJSON,
        "text xml": J.parseXML
      },
      flatOptions: {
        context: !0,
        url: !0
      }
    },
    ajaxPrefilter: o(cd),
    ajaxTransport: o(ce),
    ajax: function (a, c) {
      function d(a, c, d, n) {
        if (v !== 2) {
          v = 2, t && clearTimeout(t), s = b, q = n || "", y.readyState = a > 0 ? 4 : 0;
          var o, p, r, u = c,
            x = d ? k(e, y, d) : b,
            z, A;
          if (a >= 200 && a < 300 || a === 304) {
            if (e.ifModified) {
              if (z = y.getResponseHeader("Last-Modified")) J.lastModified[m] = z;
              if (A = y.getResponseHeader("Etag")) J.etag[m] = A
            }
            if (a === 304) u = "notmodified", o = !0;
            else try {
              p = j(e, x), u = "success", o = !0
            } catch (B) {
              u = "parsererror", r = B
            }
          } else {
            r = u;
            if (!u || a) u = "error", a < 0 && (a = 0)
          }
          y.status = a, y.statusText = "" + (c || u), o ? h.resolveWith(f, [p, u, y]) : h.rejectWith(f, [y, u, r]), y.statusCode(l), l = b, w && g.trigger("ajax" + (o ? "Success" : "Error"), [y, e, o ? p : r]), i.fireWith(f, [y, u]), w && (g.trigger("ajaxComplete", [y, e]), --J.active || J.event.trigger("ajaxStop"))
        }
      }
      typeof a == "object" && (c = a, a = b), c = c || {};
      var e = J.ajaxSetup({}, c),
        f = e.context || e,
        g = f !== e && (f.nodeType || f instanceof J) ? J(f) : J.event,
        h = J.Deferred(),
        i = J.Callbacks("once memory"),
        l = e.statusCode || {}, m, o = {}, p = {}, q, r, s, t, u, v = 0,
        w, x, y = {
          readyState: 0,
          setRequestHeader: function (a, b) {
            if (!v) {
              var c = a.toLowerCase();
              a = p[c] = p[c] || a, o[a] = b
            }
            return this
          },
          getAllResponseHeaders: function () {
            return v === 2 ? q : null
          },
          getResponseHeader: function (a) {
            var c;
            if (v === 2) {
              if (!r) {
                r = {};
                while (c = bT.exec(q)) r[c[1].toLowerCase()] = c[2]
              }
              c = r[a.toLowerCase()]
            }
            return c === b ? null : c
          },
          overrideMimeType: function (a) {
            return v || (e.mimeType = a), this
          },
          abort: function (a) {
            return a = a || "abort", s && s.abort(a), d(0, a), this
          }
        };
      h.promise(y), y.success = y.done, y.error = y.fail, y.complete = i.add, y.statusCode = function (a) {
        if (a) {
          var b;
          if (v < 2)
            for (b in a) l[b] = [l[b], a[b]];
          else b = a[y.status], y.then(b, b)
        }
        return this
      }, e.url = ((a || e.url) + "").replace(bS, "").replace(bX, cg[1] + "//"), e.dataTypes = J.trim(e.dataType || "*").toLowerCase().split(b_), e.crossDomain == null && (u = cb.exec(e.url.toLowerCase()), e.crossDomain = !(!u || u[1] == cg[1] && u[2] == cg[2] && (u[3] || (u[1] === "http:" ? 80 : 443)) == (cg[3] || (cg[1] === "http:" ? 80 : 443)))), e.data && e.processData && typeof e.data != "string" && (e.data = J.param(e.data, e.traditional)), n(cd, e, c, y);
      if (v === 2) return !1;
      w = e.global, e.type = e.type.toUpperCase(), e.hasContent = !bW.test(e.type), w && J.active++ === 0 && J.event.trigger("ajaxStart");
      if (!e.hasContent) {
        e.data && (e.url += (bY.test(e.url) ? "&" : "?") + e.data, delete e.data), m = e.url;
        if (e.cache === !1) {
          var z = J.now(),
            A = e.url.replace(ca, "$1_=" + z);
          e.url = A + (A === e.url ? (bY.test(e.url) ? "&" : "?") + "_=" + z : "")
        }
      }(e.data && e.hasContent && e.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", e.contentType), e.ifModified && (m = m || e.url, J.lastModified[m] && y.setRequestHeader("If-Modified-Since", J.lastModified[m]), J.etag[m] && y.setRequestHeader("If-None-Match", J.etag[m])), y.setRequestHeader("Accept", e.dataTypes[0] && e.accepts[e.dataTypes[0]] ? e.accepts[e.dataTypes[0]] + (e.dataTypes[0] !== "*" ? ", " + ch + "; q=0.01" : "") : e.accepts["*"]);
      for (x in e.headers) y.setRequestHeader(x, e.headers[x]);
      if (!e.beforeSend || e.beforeSend.call(f, y, e) !== !1 && v !== 2) {
        for (x in {
          success: 1,
          error: 1,
          complete: 1
        }) y[x](e[x]);
        s = n(ce, e, c, y);
        if (!s) d(-1, "No Transport");
        else {
          y.readyState = 1, w && g.trigger("ajaxSend", [y, e]), e.async && e.timeout > 0 && (t = setTimeout(function () {
            y.abort("timeout")
          }, e.timeout));
          try {
            v = 1, s.send(o, d)
          } catch (B) {
            if (v < 2) d(-1, B);
            else throw B
          }
        }
        return y
      }
      return y.abort(), !1
    },
    param: function (a, c) {
      var d = [],
        e = function (a, b) {
          b = J.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
      c === b && (c = J.ajaxSettings.traditional);
      if (J.isArray(a) || a.jquery && !J.isPlainObject(a)) J.each(a, function () {
        e(this.name, this.value)
      });
      else
        for (var f in a) l(f, a[f], c, e);
      return d.join("&").replace(bP, "+")
    }
  }), J.extend({
    active: 0,
    lastModified: {},
    etag: {}
  });
  var cj = J.now(),
    ck = /(\=)\?(&|$)|\?\?/i;
  J.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      return J.expando + "_" + cj++
    }
  }), J.ajaxPrefilter("json jsonp", function (b, c, d) {
    var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
    if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ck.test(b.url) || e && ck.test(b.data))) {
      var f, g = b.jsonpCallback = J.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
        h = a[g],
        i = b.url,
        j = b.data,
        k = "$1" + g + "$2";
      return b.jsonp !== !1 && (i = i.replace(ck, k), b.url === i && (e && (j = j.replace(ck, k)), b.data === j && (i += (/\?/.test(i) ? "&" : "?") + b.jsonp + "=" + g))), b.url = i, b.data = j, a[g] = function (a) {
        f = [a]
      }, d.always(function () {
        a[g] = h, f && J.isFunction(h) && a[g](f[0])
      }), b.converters["script json"] = function () {
        return f || J.error(g + " was not called"), f[0]
      }, b.dataTypes[0] = "json", "script"
    }
  }), J.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /javascript|ecmascript/
    },
    converters: {
      "text script": function (a) {
        return J.globalEval(a), a
      }
    }
  }), J.ajaxPrefilter("script", function (a) {
    a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
  }), J.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var c, d = G.head || G.getElementsByTagName("head")[0] || G.documentElement;
      return {
        send: function (e, f) {
          c = G.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, e) {
            if (e || !c.readyState || /loaded|complete/.test(c.readyState)) c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success")
          }, d.insertBefore(c, d.firstChild)
        },
        abort: function () {
          c && c.onload(0, 1)
        }
      }
    }
  });
  var cl = a.ActiveXObject ? function () {
      for (var a in cn) cn[a](0, 1)
    } : !1,
    cm = 0,
    cn;
  J.ajaxSettings.xhr = a.ActiveXObject ? function () {
    return !this.isLocal && i() || h()
  } : i,

  function (a) {
    J.extend(J.support, {
      ajax: !! a,
      cors: !! a && "withCredentials" in a
    })
  }(J.ajaxSettings.xhr()), J.support.ajax && J.ajaxTransport(function (c) {
    if (!c.crossDomain || J.support.cors) {
      var d;
      return {
        send: function (e, f) {
          var g = c.xhr(),
            h, i;
          c.username ? g.open(c.type, c.url, c.async, c.username, c.password) : g.open(c.type, c.url, c.async);
          if (c.xhrFields)
            for (i in c.xhrFields) g[i] = c.xhrFields[i];
          c.mimeType && g.overrideMimeType && g.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
          try {
            for (i in e) g.setRequestHeader(i, e[i])
          } catch (j) {}
          g.send(c.hasContent && c.data || null), d = function (a, e) {
            var i, j, k, l, m;
            try {
              if (d && (e || g.readyState === 4)) {
                d = b, h && (g.onreadystatechange = J.noop, cl && delete cn[h]);
                if (e) g.readyState !== 4 && g.abort();
                else {
                  i = g.status, k = g.getAllResponseHeaders(), l = {}, m = g.responseXML, m && m.documentElement && (l.xml = m);
                  try {
                    l.text = g.responseText
                  } catch (a) {}
                  try {
                    j = g.statusText
                  } catch (n) {
                    j = ""
                  }!i && c.isLocal && !c.crossDomain ? i = l.text ? 200 : 404 : i === 1223 && (i = 204)
                }
              }
            } catch (o) {
              e || f(-1, o)
            }
            l && f(i, j, l, k)
          }, !c.async || g.readyState === 4 ? d() : (h = ++cm, cl && (cn || (cn = {}, J(a).unload(cl)), cn[h] = d), g.onreadystatechange = d)
        },
        abort: function () {
          d && d(0, 1)
        }
      }
    }
  });
  var co = {}, cp, cq, cr = /^(?:toggle|show|hide)$/,
    cs = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
    ct, cu = [
      ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
      ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
      ["opacity"]
    ],
    cv;
  J.fn.extend({
    show: function (a, b, c) {
      var f, g;
      if (a || a === 0) return this.animate(e("show", 3), a, b, c);
      for (var h = 0, i = this.length; h < i; h++) f = this[h], f.style && (g = f.style.display, !J._data(f, "olddisplay") && g === "none" && (g = f.style.display = ""), (g === "" && J.css(f, "display") === "none" || !J.contains(f.ownerDocument.documentElement, f)) && J._data(f, "olddisplay", d(f.nodeName)));
      for (h = 0; h < i; h++) {
        f = this[h];
        if (f.style) {
          g = f.style.display;
          if (g === "" || g === "none") f.style.display = J._data(f, "olddisplay") || ""
        }
      }
      return this
    },
    hide: function (a, b, c) {
      if (a || a === 0) return this.animate(e("hide", 3), a, b, c);
      var d, f, g = 0,
        h = this.length;
      for (; g < h; g++) d = this[g], d.style && (f = J.css(d, "display"), f !== "none" && !J._data(d, "olddisplay") && J._data(d, "olddisplay", f));
      for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
      return this
    },
    _toggle: J.fn.toggle,
    toggle: function (a, b, c) {
      var d = typeof a == "boolean";
      return J.isFunction(a) && J.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
        var b = d ? a : J(this).is(":hidden");
        J(this)[b ? "show" : "hide"]()
      }) : this.animate(e("toggle", 3), a, b, c), this
    },
    fadeTo: function (a, b, c, d) {
      return this.filter(":hidden").css("opacity", 0).show().end().animate({
        opacity: b
      }, a, c, d)
    },
    animate: function (a, b, c, e) {
      function f() {
        g.queue === !1 && J._mark(this);
        var b = J.extend({}, g),
          c = this.nodeType === 1,
          e = c && J(this).is(":hidden"),
          f, h, i, j, k, l, m, n, o, p, q;
        b.animatedProperties = {};
        for (i in a) {
          f = J.camelCase(i), i !== f && (a[f] = a[i], delete a[i]);
          if ((k = J.cssHooks[f]) && "expand" in k) {
            l = k.expand(a[f]), delete a[f];
            for (i in l) i in a || (a[i] = l[i])
          }
        }
        for (f in a) {
          h = a[f], J.isArray(h) ? (b.animatedProperties[f] = h[1], h = a[f] = h[0]) : b.animatedProperties[f] = b.specialEasing && b.specialEasing[f] || b.easing || "swing";
          if (h === "hide" && e || h === "show" && !e) return b.complete.call(this);
          c && (f === "height" || f === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], J.css(this, "display") === "inline" && J.css(this, "float") === "none" && (!J.support.inlineBlockNeedsLayout || d(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
        }
        b.overflow != null && (this.style.overflow = "hidden");
        for (i in a) j = new J.fx(this, b, i), h = a[i], cr.test(h) ? (q = J._data(this, "toggle" + i) || (h === "toggle" ? e ? "show" : "hide" : 0), q ? (J._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cs.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (J.cssNumber[i] ? "" : "px"), p !== "px" && (J.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, J.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
        return !0
      }
      var g = J.speed(b, c, e);
      return J.isEmptyObject(a) ? this.each(g.complete, [!1]) : (a = J.extend({}, a), g.queue === !1 ? this.each(f) : this.queue(g.queue, f))
    },
    stop: function (a, c, d) {
      return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
        function b(a, b, c) {
          var e = b[c];
          J.removeData(a, c, !0), e.stop(d)
        }
        var c, e = !1,
          f = J.timers,
          g = J._data(this);
        d || J._unmark(!0, this);
        if (a == null)
          for (c in g) g[c] && g[c].stop && c.indexOf(".run") === c.length - 4 && b(this, g, c);
        else g[c = a + ".run"] && g[c].stop && b(this, g, c);
        for (c = f.length; c--;) f[c].elem === this && (a == null || f[c].queue === a) && (d ? f[c](!0) : f[c].saveState(), e = !0, f.splice(c, 1));
        (!d || !e) && J.dequeue(this, a)
      })
    }
  }), J.each({
    slideDown: e("show", 1),
    slideUp: e("hide", 1),
    slideToggle: e("toggle", 1),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (a, b) {
    J.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d)
    }
  }), J.extend({
    speed: function (a, b, c) {
      var d = a && typeof a == "object" ? J.extend({}, a) : {
        complete: c || !c && b || J.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !J.isFunction(b) && b
      };
      d.duration = J.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in J.fx.speeds ? J.fx.speeds[d.duration] : J.fx.speeds._default;
      if (d.queue == null || d.queue === !0) d.queue = "fx";
      return d.old = d.complete, d.complete = function (a) {
        J.isFunction(d.old) && d.old.call(this), d.queue ? J.dequeue(this, d.queue) : a !== !1 && J._unmark(this)
      }, d
    },
    easing: {
      linear: function (a) {
        return a
      },
      swing: function (a) {
        return -Math.cos(a * Math.PI) / 2 + .5
      }
    },
    timers: [],
    fx: function (a, b, c) {
      this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
    }
  }), J.fx.prototype = {
    update: function () {
      this.options.step && this.options.step.call(this.elem, this.now, this), (J.fx.step[this.prop] || J.fx.step._default)(this)
    },
    cur: function () {
      if (this.elem[this.prop] == null || !! this.elem.style && this.elem.style[this.prop] != null) {
        var a, b = J.css(this.elem, this.prop);
        return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
      }
      return this.elem[this.prop]
    },
    custom: function (a, c, d) {
      function e(a) {
        return f.step(a)
      }
      var f = this,
        h = J.fx;
      this.startTime = cv || g(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (J.cssNumber[this.prop] ? "" : "px"), e.queue = this.options.queue, e.elem = this.elem, e.saveState = function () {
        J._data(f.elem, "fxshow" + f.prop) === b && (f.options.hide ? J._data(f.elem, "fxshow" + f.prop, f.start) : f.options.show && J._data(f.elem, "fxshow" + f.prop, f.end))
      }, e() && J.timers.push(e) && !ct && (ct = setInterval(h.tick, h.interval))
    },
    show: function () {
      var a = J._data(this.elem, "fxshow" + this.prop);
      this.options.orig[this.prop] = a || J.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), J(this.elem).show()
    },
    hide: function () {
      this.options.orig[this.prop] = J._data(this.elem, "fxshow" + this.prop) || J.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
    },
    step: function (a) {
      var b, c, d, e = cv || g(),
        f = !0,
        h = this.elem,
        i = this.options;
      if (a || e >= i.duration + this.startTime) {
        this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
        for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (f = !1);
        if (f) {
          i.overflow != null && !J.support.shrinkWrapBlocks && J.each(["", "X", "Y"], function (a, b) {
            h.style["overflow" + b] = i.overflow[a]
          }), i.hide && J(h).hide();
          if (i.hide || i.show)
            for (b in i.animatedProperties) J.style(h, b, i.orig[b]), J.removeData(h, "fxshow" + b, !0), J.removeData(h, "toggle" + b, !0);
          d = i.complete, d && (i.complete = !1, d.call(h))
        }
        return !1
      }
      return i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = J.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
    }
  }, J.extend(J.fx, {
    tick: function () {
      var a, b = J.timers,
        c = 0;
      for (; c < b.length; c++) a =
        b[c], !a() && b[c] === a && b.splice(c--, 1);
      b.length || J.fx.stop()
    },
    interval: 13,
    stop: function () {
      clearInterval(ct), ct = null
    },
    speeds: {
      slow: 600,
      fast: 200,
      _default: 400
    },
    step: {
      opacity: function (a) {
        J.style(a.elem, "opacity", a.now)
      },
      _default: function (a) {
        a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
      }
    }
  }), J.each(cu.concat.apply([], cu), function (a, b) {
    b.indexOf("margin") && (J.fx.step[b] = function (a) {
      J.style(a.elem, b, Math.max(0, a.now) + a.unit)
    })
  }), J.expr && J.expr.filters && (J.expr.filters.animated = function (a) {
    return J.grep(J.timers, function (b) {
      return a === b.elem
    }).length
  });
  var cw, cx = /^t(?:able|d|h)$/i,
    cy = /^(?:body|html)$/i;
  "getBoundingClientRect" in G.documentElement ? cw = function (a, b, d, e) {
    try {
      e = a.getBoundingClientRect()
    } catch (f) {}
    if (!e || !J.contains(d, a)) return e ? {
      top: e.top,
      left: e.left
    } : {
      top: 0,
      left: 0
    };
    var g = b.body,
      h = c(b),
      i = d.clientTop || g.clientTop || 0,
      j = d.clientLeft || g.clientLeft || 0,
      k = h.pageYOffset || J.support.boxModel && d.scrollTop || g.scrollTop,
      l = h.pageXOffset || J.support.boxModel && d.scrollLeft || g.scrollLeft,
      m = e.top + k - i,
      n = e.left + l - j;
    return {
      top: m,
      left: n
    }
  } : cw = function (a, b, c) {
    var d, e = a.offsetParent,
      f = a,
      g = b.body,
      h = b.defaultView,
      i = h ? h.getComputedStyle(a, null) : a.currentStyle,
      j = a.offsetTop,
      k = a.offsetLeft;
    while ((a = a.parentNode) && a !== g && a !== c) {
      if (J.support.fixedPosition && i.position === "fixed") break;
      d = h ? h.getComputedStyle(a, null) : a.currentStyle, j -= a.scrollTop, k -= a.scrollLeft, a === e && (j += a.offsetTop, k += a.offsetLeft, J.support.doesNotAddBorder && (!J.support.doesAddBorderForTableAndCells || !cx.test(a.nodeName)) && (j += parseFloat(d.borderTopWidth) || 0, k += parseFloat(d.borderLeftWidth) || 0), f = e, e = a.offsetParent), J.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (j += parseFloat(d.borderTopWidth) || 0, k += parseFloat(d.borderLeftWidth) || 0), i = d
    }
    if (i.position === "relative" || i.position === "static") j += g.offsetTop, k += g.offsetLeft;
    return J.support.fixedPosition && i.position === "fixed" && (j += Math.max(c.scrollTop, g.scrollTop), k += Math.max(c.scrollLeft, g.scrollLeft)), {
      top: j,
      left: k
    }
  }, J.fn.offset = function (a) {
    if (arguments.length) return a === b ? this : this.each(function (b) {
      J.offset.setOffset(this, a, b)
    });
    var c = this[0],
      d = c && c.ownerDocument;
    return d ? c === d.body ? J.offset.bodyOffset(c) : cw(c, d, d.documentElement) : null
  }, J.offset = {
    bodyOffset: function (a) {
      var b = a.offsetTop,
        c = a.offsetLeft;
      return J.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(J.css(a, "marginTop")) || 0, c += parseFloat(J.css(a, "marginLeft")) || 0), {
        top: b,
        left: c
      }
    },
    setOffset: function (a, b, c) {
      var d = J.css(a, "position");
      d === "static" && (a.style.position = "relative");
      var e = J(a),
        f = e.offset(),
        g = J.css(a, "top"),
        h = J.css(a, "left"),
        i = (d === "absolute" || d === "fixed") && J.inArray("auto", [g, h]) > -1,
        j = {}, k = {}, l, m;
      i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), J.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j)
    }
  }, J.fn.extend({
    position: function () {
      if (!this[0]) return null;
      var a = this[0],
        b = this.offsetParent(),
        c = this.offset(),
        d = cy.test(b[0].nodeName) ? {
          top: 0,
          left: 0
        } : b.offset();
      return c.top -= parseFloat(J.css(a, "marginTop")) || 0, c.left -= parseFloat(J.css(a, "marginLeft")) || 0, d.top += parseFloat(J.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(J.css(b[0], "borderLeftWidth")) || 0, {
        top: c.top - d.top,
        left: c.left - d.left
      }
    },
    offsetParent: function () {
      return this.map(function () {
        var a = this.offsetParent || G.body;
        while (a && !cy.test(a.nodeName) && J.css(a, "position") === "static") a = a.offsetParent;
        return a
      })
    }
  }), J.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (a, d) {
    var e = /Y/.test(d);
    J.fn[a] = function (f) {
      return J.access(this, function (a, f, g) {
        var h = c(a);
        if (g === b) return h ? d in h ? h[d] : J.support.boxModel && h.document.documentElement[f] || h.document.body[f] : a[f];
        h ? h.scrollTo(e ? J(h).scrollLeft() : g, e ? g : J(h).scrollTop()) : a[f] = g
      }, a, f, arguments.length, null)
    }
  }), J.each({
    Height: "height",
    Width: "width"
  }, function (a, c) {
    var d = "client" + a,
      e = "scroll" + a,
      f = "offset" + a;
    J.fn["inner" + a] = function () {
      var a = this[0];
      return a ? a.style ? parseFloat(J.css(a, c, "padding")) : this[c]() : null
    }, J.fn["outer" + a] = function (a) {
      var b = this[0];
      return b ? b.style ? parseFloat(J.css(b, c, a ? "margin" : "border")) : this[c]() : null
    }, J.fn[c] = function (a) {
      return J.access(this, function (a, c, g) {
        var h, i, j, k;
        if (J.isWindow(a)) return h = a.document, i = h.documentElement[d], J.support.boxModel && i || h.body && h.body[d] || i;
        if (a.nodeType === 9) return h = a.documentElement, h[d] >= h[e] ? h[d] : Math.max(a.body[e], h[e], a.body[f], h[f]);
        if (g === b) return j = J.css(a, c), k = parseFloat(j), J.isNumeric(k) ? k : j;
        J(a).css(c, g)
      }, c, a, arguments.length, null)
    }
  }), a.jQuery = a.$ = J, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
    return J
  })
})(window),

function (a, b) {
  function c(b, c) {
    var e = b.nodeName.toLowerCase();
    if ("area" === e) {
      var f = b.parentNode,
        g = f.name,
        h;
      return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !! h && d(h))
    }
    return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b)
  }

  function d(b) {
    return !a(b).parents().andSelf().filter(function () {
      return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
    }).length
  }
  a.ui = a.ui || {};
  if (a.ui.version) return;
  a.extend(a.ui, {
    version: "1.8.21",
    keyCode: {
      ALT: 18,
      BACKSPACE: 8,
      CAPS_LOCK: 20,
      COMMA: 188,
      COMMAND: 91,
      COMMAND_LEFT: 91,
      COMMAND_RIGHT: 93,
      CONTROL: 17,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      MENU: 93,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SHIFT: 16,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      WINDOWS: 91
    }
  }), a.fn.extend({
    propAttr: a.fn.prop || a.fn.attr,
    _focus: a.fn.focus,
    focus: function (b, c) {
      return typeof b == "number" ? this.each(function () {
        var d = this;
        setTimeout(function () {
          a(d).focus(), c && c.call(d)
        }, b)
      }) : this._focus.apply(this, arguments)
    },
    scrollParent: function () {
      var b;
      return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function () {
        return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
      }).eq(0) : b = this.parents().filter(function () {
        return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
      }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
    },
    zIndex: function (c) {
      if (c !== b) return this.css("zIndex", c);
      if (this.length) {
        var d = a(this[0]),
          e, f;
        while (d.length && d[0] !== document) {
          e = d.css("position");
          if (e === "absolute" || e === "relative" || e === "fixed") {
            f = parseInt(d.css("zIndex"), 10);
            if (!isNaN(f) && f !== 0) return f
          }
          d = d.parent()
        }
      }
      return 0
    },
    disableSelection: function () {
      return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
        a.preventDefault()
      })
    },
    enableSelection: function () {
      return this.unbind(".ui-disableSelection")
    }
  }), a.each(["Width", "Height"], function (c, d) {
    function e(b, c, d, e) {
      return a.each(f, function () {
        c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), e && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
      }), c
    }
    var f = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
      g = d.toLowerCase(),
      h = {
        innerWidth: a.fn.innerWidth,
        innerHeight: a.fn.innerHeight,
        outerWidth: a.fn.outerWidth,
        outerHeight: a.fn.outerHeight
      };
    a.fn["inner" + d] = function (c) {
      return c === b ? h["inner" + d].call(this) : this.each(function () {
        a(this).css(g, e(this, c) + "px")
      })
    }, a.fn["outer" + d] = function (b, c) {
      return typeof b != "number" ? h["outer" + d].call(this, b) : this.each(function () {
        a(this).css(g, e(this, b, !0, c) + "px")
      })
    }
  }), a.extend(a.expr[":"], {
    data: function (b, c, d) {
      return !!a.data(b, d[3])
    },
    focusable: function (b) {
      return c(b, !isNaN(a.attr(b, "tabindex")))
    },
    tabbable: function (b) {
      var d = a.attr(b, "tabindex"),
        e = isNaN(d);
      return (e || d >= 0) && c(b, !e)
    }
  }), a(function () {
    var b = document.body,
      c = b.appendChild(c = document.createElement("div"));
    c.offsetHeight, a.extend(c.style, {
      minHeight: "100px",
      height: "auto",
      padding: 0,
      borderWidth: 0
    }), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
  }), a.extend(a.ui, {
    plugin: {
      add: function (b, c, d) {
        var e = a.ui[b].prototype;
        for (var f in d) e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
      },
      call: function (a, b, c) {
        var d = a.plugins[b];
        if (!d || !a.element[0].parentNode) return;
        for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c)
      }
    },
    contains: function (a, b) {
      return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
    },
    hasScroll: function (b, c) {
      if (a(b).css("overflow") === "hidden") return !1;
      var d = c && c === "left" ? "scrollLeft" : "scrollTop",
        e = !1;
      return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
    },
    isOverAxis: function (a, b, c) {
      return a > b && a < b + c
    },
    isOver: function (b, c, d, e, f, g) {
      return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
    }
  })
}(jQuery),

function (a, b) {
  if (a.cleanData) {
    var c = a.cleanData;
    a.cleanData = function (b) {
      for (var d = 0, e;
        (e = b[d]) != null; d++) try {
        a(e).triggerHandler("remove")
      } catch (f) {}
      c(b)
    }
  } else {
    var d = a.fn.remove;
    a.fn.remove = function (b, c) {
      return this.each(function () {
        return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function () {
          try {
            a(this).triggerHandler("remove")
          } catch (b) {}
        }), d.call(a(this), b, c)
      })
    }
  }
  a.widget = function (b, c, d) {
    var e = b.split(".")[0],
      f;
    b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function (c) {
      return !!a.data(c, b)
    }, a[e] = a[e] || {}, a[e][b] = function (a, b) {
      arguments.length && this._createWidget(a, b)
    };
    var g = new c;
    g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
      namespace: e,
      widgetName: b,
      widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
      widgetBaseClass: f
    }, d), a.widget.bridge(b, a[e][b])
  }, a.widget.bridge = function (c, d) {
    a.fn[c] = function (e) {
      var f = typeof e == "string",
        g = Array.prototype.slice.call(arguments, 1),
        h = this;
      return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function () {
        var d = a.data(this, c),
          f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
        if (f !== d && f !== b) return h = f, !1
      }) : this.each(function () {
        var b = a.data(this, c);
        b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
      }), h)
    }
  }, a.Widget = function (a, b) {
    arguments.length && this._createWidget(a, b)
  }, a.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    options: {
      disabled: !1
    },
    _createWidget: function (b, c) {
      a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
      var d = this;
      this.element.bind("remove." + this.widgetName, function () {
        d.destroy()
      }), this._create(), this._trigger("create"), this._init()
    },
    _getCreateOptions: function () {
      return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
    },
    _create: function () {},
    _init: function () {},
    destroy: function () {
      this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
    },
    widget: function () {
      return this.element
    },
    option: function (c, d) {
      var e = c;
      if (arguments.length === 0) return a.extend({}, this.options);
      if (typeof c == "string") {
        if (d === b) return this.options[c];
        e = {}, e[c] = d
      }
      return this._setOptions(e), this
    },
    _setOptions: function (b) {
      var c = this;
      return a.each(b, function (a, b) {
        c._setOption(a, b)
      }), this
    },
    _setOption: function (a, b) {
      return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this
    },
    enable: function () {
      return this._setOption("disabled", !1)
    },
    disable: function () {
      return this._setOption("disabled", !0)
    },
    _trigger: function (b, c, d) {
      var e, f, g = this.options[b];
      d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
      if (f)
        for (e in f) e in c || (c[e] = f[e]);
      return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
    }
  }
}(jQuery),

function (a, b) {
  var c = !1;
  a(document).mouseup(function (a) {
    c = !1
  }), a.widget("ui.mouse", {
    options: {
      cancel: ":input,option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function () {
      var b = this;
      this.element.bind("mousedown." + this.widgetName, function (a) {
        return b._mouseDown(a)
      }).bind("click." + this.widgetName, function (c) {
        if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1
      }), this.started = !1
    },
    _mouseDestroy: function () {
      this.element.unbind("." + this.widgetName), a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    },
    _mouseDown: function (b) {
      if (c) return;
      this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
      var d = this,
        e = b.which == 1,
        f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
      if (!e || f || !this._mouseCapture(b)) return !0;
      this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
        d.mouseDelayMet = !0
      }, this.options.delay));
      if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
        this._mouseStarted = this._mouseStart(b) !== !1;
        if (!this._mouseStarted) return b.preventDefault(), !0
      }
      return !0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
        return d._mouseMove(a)
      }, this._mouseUpDelegate = function (a) {
        return d._mouseUp(a)
      }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0
    },
    _mouseMove: function (b) {
      return !a.browser.msie || document.documentMode >= 9 || !! b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
    },
    _mouseUp: function (b) {
      return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
    },
    _mouseDistanceMet: function (a) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
    },
    _mouseDelayMet: function (a) {
      return this.mouseDelayMet
    },
    _mouseStart: function (a) {},
    _mouseDrag: function (a) {},
    _mouseStop: function (a) {},
    _mouseCapture: function (a) {
      return !0
    }
  })
}(jQuery),

function (a, b) {
  a.ui = a.ui || {};
  var c = /left|center|right/,
    d = /top|center|bottom/,
    e = "center",
    f = {}, g = a.fn.position,
    h = a.fn.offset;
  a.fn.position = function (b) {
    if (!b || !b.of) return g.apply(this, arguments);
    b = a.extend({}, b);
    var h = a(b.of),
      i = h[0],
      j = (b.collision || "flip").split(" "),
      k = b.offset ? b.offset.split(" ") : [0, 0],
      l, m, n;
    return i.nodeType === 9 ? (l = h.width(), m = h.height(), n = {
      top: 0,
      left: 0
    }) : i.setTimeout ? (l = h.width(), m = h.height(), n = {
      top: h.scrollTop(),
      left: h.scrollLeft()
    }) : i.preventDefault ? (b.at = "left top", l = m = 0, n = {
      top: b.of.pageY,
      left: b.of.pageX
    }) : (l = h.outerWidth(), m = h.outerHeight(), n = h.offset()), a.each(["my", "at"], function () {
      var a = (b[this] || "").split(" ");
      a.length === 1 && (a = c.test(a[0]) ? a.concat([e]) : d.test(a[0]) ? [e].concat(a) : [e, e]), a[0] = c.test(a[0]) ? a[0] : e, a[1] = d.test(a[1]) ? a[1] : e, b[this] = a
    }), j.length === 1 && (j[1] = j[0]), k[0] = parseInt(k[0], 10) || 0, k.length === 1 && (k[1] = k[0]), k[1] = parseInt(k[1], 10) || 0, b.at[0] === "right" ? n.left += l : b.at[0] === e && (n.left += l / 2), b.at[1] === "bottom" ? n.top += m : b.at[1] === e && (n.top += m / 2), n.left += k[0], n.top += k[1], this.each(function () {
      var c = a(this),
        d = c.outerWidth(),
        g = c.outerHeight(),
        h = parseInt(a.curCSS(this, "marginLeft", !0)) || 0,
        i = parseInt(a.curCSS(this, "marginTop", !0)) || 0,
        o = d + h + (parseInt(a.curCSS(this, "marginRight", !0)) || 0),
        p = g + i + (parseInt(a.curCSS(this, "marginBottom", !0)) || 0),
        q = a.extend({}, n),
        r;
      b.my[0] === "right" ? q.left -= d : b.my[0] === e && (q.left -= d / 2), b.my[1] === "bottom" ? q.top -= g : b.my[1] === e && (q.top -= g / 2), f.fractions || (q.left = Math.round(q.left), q.top = Math.round(q.top)), r = {
        left: q.left - h,
        top: q.top - i
      }, a.each(["left", "top"], function (c, e) {
        a.ui.position[j[c]] && a.ui.position[j[c]][e](q, {
          targetWidth: l,
          targetHeight: m,
          elemWidth: d,
          elemHeight: g,
          collisionPosition: r,
          collisionWidth: o,
          collisionHeight: p,
          offset: k,
          my: b.my,
          at: b.at
        })
      }), a.fn.bgiframe && c.bgiframe(), c.offset(a.extend(q, {
        using: b.using
      }))
    })
  }, a.ui.position = {
    fit: {
      left: function (b, c) {
        var d = a(window),
          e = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
        b.left = e > 0 ? b.left - e : Math.max(b.left - c.collisionPosition.left, b.left)
      },
      top: function (b, c) {
        var d = a(window),
          e = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
        b.top = e > 0 ? b.top - e : Math.max(b.top - c.collisionPosition.top, b.top)
      }
    },
    flip: {
      left: function (b, c) {
        if (c.at[0] === e) return;
        var d = a(window),
          f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(),
          g = c.my[0] === "left" ? -c.elemWidth : c.my[0] === "right" ? c.elemWidth : 0,
          h = c.at[0] === "left" ? c.targetWidth : -c.targetWidth,
          i = -2 * c.offset[0];
        b.left += c.collisionPosition.left < 0 ? g + h + i : f > 0 ? g + h + i : 0
      },
      top: function (b, c) {
        if (c.at[1] === e) return;
        var d = a(window),
          f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(),
          g = c.my[1] === "top" ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0,
          h = c.at[1] === "top" ? c.targetHeight : -c.targetHeight,
          i = -2 * c.offset[1];
        b.top += c.collisionPosition.top < 0 ? g + h + i : f > 0 ? g + h + i : 0
      }
    }
  }, a.offset.setOffset || (a.offset.setOffset = function (b, c) {
    /static/.test(a.curCSS(b, "position")) && (b.style.position = "relative");
    var d = a(b),
      e = d.offset(),
      f = parseInt(a.curCSS(b, "top", !0), 10) || 0,
      g = parseInt(a.curCSS(b, "left", !0), 10) || 0,
      h = {
        top: c.top - e.top + f,
        left: c.left - e.left + g
      };
    "using" in c ? c.using.call(b, h) : d.css(h)
  }, a.fn.offset = function (b) {
    var c = this[0];
    return !c || !c.ownerDocument ? null : b ? a.isFunction(b) ? this.each(function (c) {
      a(this).offset(b.call(this, c, a(this).offset()))
    }) : this.each(function () {
      a.offset.setOffset(this, b)
    }) : h.call(this)
  }),

  function () {
    var b = document.getElementsByTagName("body")[0],
      c = document.createElement("div"),
      d, e, g, h, i;
    d = document.createElement(b ? "div" : "body"), g = {
      visibility: "hidden",
      width: 0,
      height: 0,
      border: 0,
      margin: 0,
      background: "none"
    }, b && a.extend(g, {
      position: "absolute",
      left: "-1000px",
      top: "-1000px"
    });
    for (var j in g) d.style[j] = g[j];
    d.appendChild(c), e = b || document.documentElement, e.insertBefore(d, e.firstChild), c.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", h = a(c).offset(function (a, b) {
      return b
    }).offset(), d.innerHTML = "", e.removeChild(d), i = h.top + h.left + (b ? 2e3 : 0), f.fractions = i > 21 && i < 22
  }()
}(jQuery),

function (a, b) {
  a.widget("ui.draggable", a.ui.mouse, {
    widgetEventPrefix: "drag",
    options: {
      addClasses: !0,
      appendTo: "parent",
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: "default",
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: "both",
      snapTolerance: 20,
      stack: !1,
      zIndex: !1
    },
    _create: function () {
      this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
    },
    destroy: function () {
      if (!this.element.data("draggable")) return;
      return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
    },
    _mouseCapture: function (b) {
      var c = this.options;
      return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(b), this.handle ? (c.iframeFix && a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function () {
        a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
          width: this.offsetWidth + "px",
          height: this.offsetHeight + "px",
          position: "absolute",
          opacity: "0.001",
          zIndex: 1e3
        }).css(a(this).offset()).appendTo("body")
      }), !0) : !1)
    },
    _mouseStart: function (b) {
      var c = this.options;
      return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      }, a.extend(this.offset, {
        click: {
          left: b.pageX - this.offset.left,
          top: b.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
    },
    _mouseDrag: function (b, c) {
      this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute");
      if (!c) {
        var d = this._uiHash();
        if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
        this.position = d.position
      }
      if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
      if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
      return a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
    },
    _mouseStop: function (b) {
      var c = !1;
      a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
      var d = this.element[0],
        e = !1;
      while (d && (d = d.parentNode)) d == document && (e = !0);
      if (!e && this.options.helper === "original") return !1;
      if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
        var f = this;
        a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
          f._trigger("stop", b) !== !1 && f._clear()
        })
      } else this._trigger("stop", b) !== !1 && this._clear();
      return !1
    },
    _mouseUp: function (b) {
      return this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function () {
        this.parentNode.removeChild(this)
      }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
    },
    cancel: function () {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
    },
    _getHandle: function (b) {
      var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
      return a(this.options.handle, this.element).find("*").andSelf().each(function () {
        this == b.target && (c = !0)
      }), c
    },
    _createHelper: function (b) {
      var c = this.options,
        d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
      return d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute"), d
    },
    _adjustOffsetFromHelper: function (b) {
      typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var b = this.offsetParent.offset();
      this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
      if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
        top: 0,
        left: 0
      };
      return {
        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      }
    },
    _getRelativeOffset: function () {
      if (this.cssPosition == "relative") {
        var a = this.element.position();
        return {
          top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        }
      }
      return {
        top: 0,
        left: 0
      }
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
      }
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      }
    },
    _setContainment: function () {
      var b = this.options;
      b.containment == "parent" && (b.containment = this.helper[0].parentNode);
      if (b.containment == "document" || b.containment == "window") this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
      if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
        var c = a(b.containment),
          d = c[0];
        if (!d) return;
        var e = c.offset(),
          f = a(d).css("overflow") != "hidden";
        this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
      } else b.containment.constructor == Array && (this.containment = b.containment)
    },
    _convertPositionTo: function (b, c) {
      c || (c = this.position);
      var d = b == "absolute" ? 1 : -1,
        e = this.options,
        f = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        g = /(html|body)/i.test(f[0].tagName);
      return {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
      }
    },
    _generatePosition: function (b) {
      var c = this.options,
        d = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        e = /(html|body)/i.test(d[0].tagName),
        f = b.pageX,
        g = b.pageY;
      if (this.originalPosition) {
        var h;
        if (this.containment) {
          if (this.relative_container) {
            var i = this.relative_container.offset();
            h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
          } else h = this.containment;
          b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
        }
        if (c.grid) {
          var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
          g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
          var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
          f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k
        }
      }
      return {
        top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
        left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
      }
    },
    _clear: function () {
      this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
    },
    _trigger: function (b, c, d) {
      return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), b == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
    },
    plugins: {},
    _uiHash: function (a) {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      }
    }
  }), a.extend(a.ui.draggable, {
    version: "1.8.21"
  }), a.ui.plugin.add("draggable", "connectToSortable", {
    start: function (b, c) {
      var d = a(this).data("draggable"),
        e = d.options,
        f = a.extend({}, c, {
          item: d.element
        });
      d.sortables = [], a(e.connectToSortable).each(function () {
        var c = a.data(this, "sortable");
        c && !c.options.disabled && (d.sortables.push({
          instance: c,
          shouldRevert: c.options.revert
        }), c.refreshPositions(), c._trigger("activate", b, f))
      })
    },
    stop: function (b, c) {
      var d = a(this).data("draggable"),
        e = a.extend({}, c, {
          item: d.element
        });
      a.each(d.sortables, function () {
        this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({
          top: "auto",
          left: "auto"
        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
      })
    },
    drag: function (b, c) {
      var d = a(this).data("draggable"),
        e = this,
        f = function (b) {
          var c = this.offset.click.top,
            d = this.offset.click.left,
            e = this.positionAbs.top,
            f = this.positionAbs.left,
            g = b.height,
            h = b.width,
            i = b.top,
            j = b.left;
          return a.ui.isOver(e + c, f + d, i, j, g, h)
        };
      a.each(d.sortables, function (f) {
        this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
          return c.helper[0]
        }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
      })
    }
  }), a.ui.plugin.add("draggable", "cursor", {
    start: function (b, c) {
      var d = a("body"),
        e = a(this).data("draggable").options;
      d.css("cursor") && (e._cursor = d.css("cursor")), d.css("cursor", e.cursor)
    },
    stop: function (b, c) {
      var d = a(this).data("draggable").options;
      d._cursor && a("body").css("cursor", d._cursor)
    }
  }), a.ui.plugin.add("draggable", "opacity", {
    start: function (b, c) {
      var d = a(c.helper),
        e = a(this).data("draggable").options;
      d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
    },
    stop: function (b, c) {
      var d = a(this).data("draggable").options;
      d._opacity && a(c.helper).css("opacity", d._opacity)
    }
  }), a.ui.plugin.add("draggable", "scroll", {
    start: function (b, c) {
      var d = a(this).data("draggable");
      d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
    },
    drag: function (b, c) {
      var d = a(this).data("draggable"),
        e = d.options,
        f = !1;
      if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
        if (!e.axis || e.axis != "x") d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
        if (!e.axis || e.axis != "y") d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
      } else {
        if (!e.axis || e.axis != "x") b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
        if (!e.axis || e.axis != "y") b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
      }
      f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
    }
  }), a.ui.plugin.add("draggable", "snap", {
    start: function (b, c) {
      var d = a(this).data("draggable"),
        e = d.options;
      d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function () {
        var b = a(this),
          c = b.offset();
        this != d.element[0] && d.snapElements.push({
          item: this,
          width: b.outerWidth(),
          height: b.outerHeight(),
          top: c.top,
          left: c.left
        })
      })
    },
    drag: function (b, c) {
      var d = a(this).data("draggable"),
        e = d.options,
        f = e.snapTolerance,
        g = c.offset.left,
        h = g + d.helperProportions.width,
        i = c.offset.top,
        j = i + d.helperProportions.height;
      for (var k = d.snapElements.length - 1; k >= 0; k--) {
        var l = d.snapElements[k].left,
          m = l + d.snapElements[k].width,
          n = d.snapElements[k].top,
          o = n + d.snapElements[k].height;
        if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
          d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
            snapItem: d.snapElements[k].item
          })), d.snapElements[k].snapping = !1;
          continue
        }
        if (e.snapMode != "inner") {
          var p = Math.abs(n - j) <= f,
            q = Math.abs(o - i) <= f,
            r = Math.abs(l - h) <= f,
            s = Math.abs(m - g) <= f;
          p && (c.position.top = d._convertPositionTo("relative", {
            top: n - d.helperProportions.height,
            left: 0
          }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
            top: o,
            left: 0
          }).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
            top: 0,
            left: l - d.helperProportions.width
          }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
            top: 0,
            left: m
          }).left - d.margins.left)
        }
        var t = p || q || r || s;
        if (e.snapMode != "outer") {
          var p = Math.abs(n - i) <= f,
            q = Math.abs(o - j) <= f,
            r = Math.abs(l - g) <= f,
            s = Math.abs(m - h) <= f;
          p && (c.position.top = d._convertPositionTo("relative", {
            top: n,
            left: 0
          }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
            top: o - d.helperProportions.height,
            left: 0
          }).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
            top: 0,
            left: l
          }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
            top: 0,
            left: m - d.helperProportions.width
          }).left - d.margins.left)
        }!d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
          snapItem: d.snapElements[k].item
        })), d.snapElements[k].snapping = p || q || r || s || t
      }
    }
  }), a.ui.plugin.add("draggable", "stack", {
    start: function (b, c) {
      var d = a(this).data("draggable").options,
        e = a.makeArray(a(d.stack)).sort(function (b, c) {
          return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
        });
      if (!e.length) return;
      var f = parseInt(e[0].style.zIndex) || 0;
      a(e).each(function (a) {
        this.style.zIndex = f + a
      }), this[0].style.zIndex = f + e.length
    }
  }), a.ui.plugin.add("draggable", "zIndex", {
    start: function (b, c) {
      var d = a(c.helper),
        e = a(this).data("draggable").options;
      d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
    },
    stop: function (b, c) {
      var d = a(this).data("draggable").options;
      d._zIndex && a(c.helper).css("zIndex", d._zIndex)
    }
  })
}(jQuery),

function (a, b) {
  a.widget("ui.droppable", {
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      activeClass: !1,
      addClasses: !0,
      greedy: !1,
      hoverClass: !1,
      scope: "default",
      tolerance: "intersect"
    },
    _create: function () {
      var b = this.options,
        c = b.accept;
      this.isover = 0, this.isout = 1, this.accept = a.isFunction(c) ? c : function (a) {
        return a.is(c)
      }, this.proportions = {
        width: this.element[0].offsetWidth,
        height: this.element[0].offsetHeight
      }, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable")
    },
    destroy: function () {
      var b = a.ui.ddmanager.droppables[this.options.scope];
      for (var c = 0; c < b.length; c++) b[c] == this && b.splice(c, 1);
      return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
    },
    _setOption: function (b, c) {
      b == "accept" && (this.accept = a.isFunction(c) ? c : function (a) {
        return a.is(c)
      }), a.Widget.prototype._setOption.apply(this, arguments)
    },
    _activate: function (b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
    },
    _deactivate: function (b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
    },
    _over: function (b) {
      var c = a.ui.ddmanager.current;
      if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
      this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
    },
    _out: function (b) {
      var c = a.ui.ddmanager.current;
      if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
      this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
    },
    _drop: function (b, c) {
      var d = c || a.ui.ddmanager.current;
      if (!d || (d.currentItem || d.element)[0] == this.element[0]) return !1;
      var e = !1;
      return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
        var b = a.data(this, "droppable");
        if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
          offset: b.element.offset()
        }), b.options.tolerance)) return e = !0, !1
      }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1
    },
    ui: function (a) {
      return {
        draggable: a.currentItem || a.element,
        helper: a.helper,
        position: a.position,
        offset: a.positionAbs
      }
    }
  }), a.extend(a.ui.droppable, {
    version: "1.8.21"
  }), a.ui.intersect = function (b, c, d) {
    if (!c.offset) return !1;
    var e = (b.positionAbs || b.position.absolute).left,
      f = e + b.helperProportions.width,
      g = (b.positionAbs || b.position.absolute).top,
      h = g + b.helperProportions.height,
      i = c.offset.left,
      j = i + c.proportions.width,
      k = c.offset.top,
      l = k + c.proportions.height;
    switch (d) {
    case "fit":
      return i <= e && f <= j && k <= g && h <= l;
    case "intersect":
      return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
    case "pointer":
      var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left,
        n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top,
        o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
      return o;
    case "touch":
      return (g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i && f <= j || e < i && f > j);
    default:
      return !1
    }
  }, a.ui.ddmanager = {
    current: null,
    droppables: {
      "default": []
    },
    prepareOffsets: function (b, c) {
      var d = a.ui.ddmanager.droppables[b.options.scope] || [],
        e = c ? c.type : null,
        f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
      g: for (var h = 0; h < d.length; h++) {
        if (d[h].options.disabled || b && !d[h].accept.call(d[h].element[0], b.currentItem || b.element)) continue;
        for (var i = 0; i < f.length; i++)
          if (f[i] == d[h].element[0]) {
            d[h].proportions.height = 0;
            continue g
          }
        d[h].visible = d[h].element.css("display") != "none";
        if (!d[h].visible) continue;
        e == "mousedown" && d[h]._activate.call(d[h], c), d[h].offset = d[h].element.offset(), d[h].proportions = {
          width: d[h].element[0].offsetWidth,
          height: d[h].element[0].offsetHeight
        }
      }
    },
    drop: function (b, c) {
      var d = !1;
      return a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
        if (!this.options) return;
        !this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c))
      }), d
    },
    dragStart: function (b, c) {
      b.element.parents(":not(body,html)").bind("scroll.droppable", function () {
        b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
      })
    },
    drag: function (b, c) {
      b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
        if (this.options.disabled || this.greedyChild || !this.visible) return;
        var d = a.ui.intersect(b, this, this.options.tolerance),
          e = !d && this.isover == 1 ? "isout" : d && this.isover == 0 ? "isover" : null;
        if (!e) return;
        var f;
        if (this.options.greedy) {
          var g = this.element.parents(":data(droppable):eq(0)");
          g.length && (f = a.data(g[0], "droppable"), f.greedyChild = e == "isover" ? 1 : 0)
        }
        f && e == "isover" && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this[e == "isout" ? "isover" : "isout"] = 0, this[e == "isover" ? "_over" : "_out"].call(this, c), f && e == "isout" && (f.isout = 0, f.isover = 1, f._over.call(f, c))
      })
    },
    dragStop: function (b, c) {
      b.element.parents(":not(body,html)").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
    }
  }
}(jQuery),

function (a, b) {
  a.widget("ui.resizable", a.ui.mouse, {
    widgetEventPrefix: "resize",
    options: {
      alsoResize: !1,
      animate: !1,
      animateDuration: "slow",
      animateEasing: "swing",
      aspectRatio: !1,
      autoHide: !1,
      containment: !1,
      ghost: !1,
      grid: !1,
      handles: "e,s,se",
      helper: !1,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      zIndex: 1e3
    },
    _create: function () {
      var b = this,
        c = this.options;
      this.element.addClass("ui-resizable"), a.extend(this, {
        _aspectRatio: !! c.aspectRatio,
        aspectRatio: c.aspectRatio,
        originalElement: this.element,
        _proportionallyResizeElements: [],
        _helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null
      }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
        position: this.element.css("position"),
        width: this.element.outerWidth(),
        height: this.element.outerHeight(),
        top: this.element.css("top"),
        left: this.element.css("left")
      })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
        marginLeft: this.originalElement.css("marginLeft"),
        marginTop: this.originalElement.css("marginTop"),
        marginRight: this.originalElement.css("marginRight"),
        marginBottom: this.originalElement.css("marginBottom")
      }), this.originalElement.css({
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0
      }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
        position: "static",
        zoom: 1,
        display: "block"
      })), this.originalElement.css({
        margin: this.originalElement.css("margin")
      }), this._proportionallyResize()), this.handles = c.handles || (a(".ui-resizable-handle", this.element).length ? {
        n: ".ui-resizable-n",
        e: ".ui-resizable-e",
        s: ".ui-resizable-s",
        w: ".ui-resizable-w",
        se: ".ui-resizable-se",
        sw: ".ui-resizable-sw",
        ne: ".ui-resizable-ne",
        nw: ".ui-resizable-nw"
      } : "e,s,se");
      if (this.handles.constructor == String) {
        this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
        var d = this.handles.split(",");
        this.handles = {};
        for (var e = 0; e < d.length; e++) {
          var f = a.trim(d[e]),
            g = "ui-resizable-" + f,
            h = a('<div class="ui-resizable-handle ' + g + '"></div>');
          h.css({
            zIndex: c.zIndex
          }), "se" == f && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[f] = ".ui-resizable-" + f, this.element.append(h)
        }
      }
      this._renderAxis = function (b) {
        b = b || this.element;
        for (var c in this.handles) {
          this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show());
          if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
            var d = a(this.handles[c], this.element),
              e = 0;
            e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
            var f = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join("");
            b.css(f, e), this._proportionallyResize()
          }
          if (!a(this.handles[c]).length) continue
        }
      }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
        if (!b.resizing) {
          if (this.className) var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          b.axis = a && a[1] ? a[1] : "se"
        }
      }), c.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").hover(function () {
        if (c.disabled) return;
        a(this).removeClass("ui-resizable-autohide"), b._handles.show()
      }, function () {
        if (c.disabled) return;
        b.resizing || (a(this).addClass("ui-resizable-autohide"), b._handles.hide())
      })), this._mouseInit()
    },
    destroy: function () {
      this._mouseDestroy();
      var b = function (b) {
        a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
      };
      if (this.elementIsWrapper) {
        b(this.element);
        var c = this.element;
        c.after(this.originalElement.css({
          position: c.css("position"),
          width: c.outerWidth(),
          height: c.outerHeight(),
          top: c.css("top"),
          left: c.css("left")
        })).remove()
      }
      return this.originalElement.css("resize", this.originalResizeStyle), b(this.originalElement), this
    },
    _mouseCapture: function (b) {
      var c = !1;
      for (var d in this.handles) a(this.handles[d])[0] == b.target && (c = !0);
      return !this.options.disabled && c
    },
    _mouseStart: function (b) {
      var d = this.options,
        e = this.element.position(),
        f = this.element;
      this.resizing = !0, this.documentScroll = {
        top: a(document).scrollTop(),
        left: a(document).scrollLeft()
      }, (f.is(".ui-draggable") || /absolute/.test(f.css("position"))) && f.css({
        position: "absolute",
        top: e.top,
        left: e.left
      }), this._renderProxy();
      var g = c(this.helper.css("left")),
        h = c(this.helper.css("top"));
      d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
        left: g,
        top: h
      }, this.size = this._helper ? {
        width: f.outerWidth(),
        height: f.outerHeight()
      } : {
        width: f.width(),
        height: f.height()
      }, this.originalSize = this._helper ? {
        width: f.outerWidth(),
        height: f.outerHeight()
      } : {
        width: f.width(),
        height: f.height()
      }, this.originalPosition = {
        left: g,
        top: h
      }, this.sizeDiff = {
        width: f.outerWidth() - f.width(),
        height: f.outerHeight() - f.height()
      }, this.originalMousePosition = {
        left: b.pageX,
        top: b.pageY
      }, this.aspectRatio = typeof d.aspectRatio == "number" ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
      var i = a(".ui-resizable-" + this.axis).css("cursor");
      return a("body").css("cursor", i == "auto" ? this.axis + "-resize" : i), f.addClass("ui-resizable-resizing"), this._propagate("start", b), !0
    },
    _mouseDrag: function (b) {
      var c = this.helper,
        d = this.options,
        e = {}, f = this,
        g = this.originalMousePosition,
        h = this.axis,
        i = b.pageX - g.left || 0,
        j = b.pageY - g.top || 0,
        k = this._change[h];
      if (!k) return !1;
      var l = k.apply(this, [b, i, j]),
        m = a.browser.msie && a.browser.version < 7,
        n = this.sizeDiff;
      this._updateVirtualBoundaries(b.shiftKey);
      if (this._aspectRatio || b.shiftKey) l = this._updateRatio(l, b);
      return l = this._respectSize(l, b), this._propagate("resize", b), c.css({
        top: this.position.top + "px",
        left: this.position.left + "px",
        width: this.size.width + "px",
        height: this.size.height + "px"
      }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(l), this._trigger("resize", b, this.ui()), !1
    },
    _mouseStop: function (b) {
      this.resizing = !1;
      var c = this.options,
        d = this;
      if (this._helper) {
        var e = this._proportionallyResizeElements,
          f = e.length && /textarea/i.test(e[0].nodeName),
          g = f && a.ui.hasScroll(e[0], "left") ? 0 : d.sizeDiff.height,
          h = f ? 0 : d.sizeDiff.width,
          i = {
            width: d.helper.width() - h,
            height: d.helper.height() - g
          }, j = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
          k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
        c.animate || this.element.css(a.extend(i, {
          top: k,
          left: j
        })), d.helper.height(d.size.height), d.helper.width(d.size.width), this._helper && !c.animate && this._proportionallyResize()
      }
      return a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
    },
    _updateVirtualBoundaries: function (a) {
      var b = this.options,
        c, e, f, g, h;
      h = {
        minWidth: d(b.minWidth) ? b.minWidth : 0,
        maxWidth: d(b.maxWidth) ? b.maxWidth : Infinity,
        minHeight: d(b.minHeight) ? b.minHeight : 0,
        maxHeight: d(b.maxHeight) ? b.maxHeight : Infinity
      };
      if (this._aspectRatio || a) c = h.minHeight * this.aspectRatio, f = h.minWidth / this.aspectRatio, e = h.maxHeight * this.aspectRatio, g = h.maxWidth / this.aspectRatio, c > h.minWidth && (h.minWidth = c), f > h.minHeight && (h.minHeight = f), e < h.maxWidth && (h.maxWidth = e), g < h.maxHeight && (h.maxHeight = g);
      this._vBoundaries = h
    },
    _updateCache: function (a) {
      var b = this.options;
      this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top = a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width)
    },
    _updateRatio: function (a, b) {
      var c = this.options,
        e = this.position,
        f = this.size,
        g = this.axis;
      return d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), g == "sw" && (a.left = e.left + (f.width - a.width), a.top = null), g == "nw" && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width)), a
    },
    _respectSize: function (a, b) {
      var c = this.helper,
        e = this._vBoundaries,
        f = this._aspectRatio || b.shiftKey,
        g = this.axis,
        h = d(a.width) && e.maxWidth && e.maxWidth < a.width,
        i = d(a.height) && e.maxHeight && e.maxHeight < a.height,
        j = d(a.width) && e.minWidth && e.minWidth > a.width,
        k = d(a.height) && e.minHeight && e.minHeight > a.height;
      j && (a.width = e.minWidth), k && (a.height = e.minHeight), h && (a.width = e.maxWidth), i && (a.height = e.maxHeight);
      var l = this.originalPosition.left + this.originalSize.width,
        m = this.position.top + this.size.height,
        n = /sw|nw|w/.test(g),
        o = /nw|ne|n/.test(g);
      j && n && (a.left = l - e.minWidth), h && n && (a.left = l - e.maxWidth), k && o && (a.top = m - e.minHeight), i && o && (a.top = m - e.maxHeight);
      var p = !a.width && !a.height;
      return p && !a.left && a.top ? a.top = null : p && !a.top && a.left && (a.left = null), a
    },
    _proportionallyResize: function () {
      var b = this.options;
      if (!this._proportionallyResizeElements.length) return;
      var c = this.helper || this.element;
      for (var d = 0; d < this._proportionallyResizeElements.length; d++) {
        var e = this._proportionallyResizeElements[d];
        if (!this.borderDif) {
          var f = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")],
            g = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")];
          this.borderDif = a.map(f, function (a, b) {
            var c = parseInt(a, 10) || 0,
              d = parseInt(g[b], 10) || 0;
            return c + d
          })
        }
        if (!a.browser.msie || !a(c).is(":hidden") && !a(c).parents(":hidden").length) e.css({
          height: c.height() - this.borderDif[0] - this.borderDif[2] || 0,
          width: c.width() - this.borderDif[1] - this.borderDif[3] || 0
        });
        else continue
      }
    },
    _renderProxy: function () {
      var b = this.element,
        c = this.options;
      this.elementOffset = b.offset();
      if (this._helper) {
        this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
        var d = a.browser.msie && a.browser.version < 7,
          e = d ? 1 : 0,
          f = d ? 2 : -1;
        this.helper.addClass(this._helper).css({
          width: this.element.outerWidth() + f,
          height: this.element.outerHeight() + f,
          position: "absolute",
          left: this.elementOffset.left - e + "px",
          top: this.elementOffset.top - e + "px",
          zIndex: ++c.zIndex
        }), this.helper.appendTo("body").disableSelection()
      } else this.helper = this.element
    },
    _change: {
      e: function (a, b, c) {
        return {
          width: this.originalSize.width + b
        }
      },
      w: function (a, b, c) {
        var d = this.options,
          e = this.originalSize,
          f = this.originalPosition;
        return {
          left: f.left + b,
          width: e.width - b
        }
      },
      n: function (a, b, c) {
        var d = this.options,
          e = this.originalSize,
          f = this.originalPosition;
        return {
          top: f.top + c,
          height: e.height - c
        }
      },
      s: function (a, b, c) {
        return {
          height: this.originalSize.height + c
        }
      },
      se: function (b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
      },
      sw: function (b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
      },
      ne: function (b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
      },
      nw: function (b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
      }
    },
    _propagate: function (b, c) {
      a.ui.plugin.call(this, b, [c, this.ui()]), b != "resize" && this._trigger(b, c, this.ui())
    },
    plugins: {},
    ui: function () {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      }
    }
  }), a.extend(a.ui.resizable, {
    version: "1.8.21"
  }), a.ui.plugin.add("resizable", "alsoResize", {
    start: function (b, c) {
      var d = a(this).data("resizable"),
        e = d.options,
        f = function (b) {
          a(b).each(function () {
            var b = a(this);
            b.data("resizable-alsoresize", {
              width: parseInt(b.width(), 10),
              height: parseInt(b.height(), 10),
              left: parseInt(b.css("left"), 10),
              top: parseInt(b.css("top"), 10)
            })
          })
        };
      typeof e.alsoResize == "object" && !e.alsoResize.parentNode ? e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) : a.each(e.alsoResize, function (a) {
        f(a)
      }) : f(e.alsoResize)
    },
    resize: function (b, c) {
      var d = a(this).data("resizable"),
        e = d.options,
        f = d.originalSize,
        g = d.originalPosition,
        h = {
          height: d.size.height - f.height || 0,
          width: d.size.width - f.width || 0,
          top: d.position.top - g.top || 0,
          left: d.position.left - g.left || 0
        }, i = function (b, d) {
          a(b).each(function () {
            var b = a(this),
              e = a(this).data("resizable-alsoresize"),
              f = {}, g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
            a.each(g, function (a, b) {
              var c = (e[b] || 0) + (h[b] || 0);
              c && c >= 0 && (f[b] = c || null)
            }), b.css(f)
          })
        };
      typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function (a, b) {
        i(a, b)
      }) : i(e.alsoResize)
    },
    stop: function (b, c) {
      a(this).removeData("resizable-alsoresize")
    }
  }), a.ui.plugin.add("resizable", "animate", {
    stop: function (b, c) {
      var d = a(this).data("resizable"),
        e = d.options,
        f = d._proportionallyResizeElements,
        g = f.length && /textarea/i.test(f[0].nodeName),
        h = g && a.ui.hasScroll(f[0], "left") ? 0 : d.sizeDiff.height,
        i = g ? 0 : d.sizeDiff.width,
        j = {
          width: d.size.width - i,
          height: d.size.height - h
        }, k = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
        l = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
      d.element.animate(a.extend(j, l && k ? {
        top: l,
        left: k
      } : {}), {
        duration: e.animateDuration,
        easing: e.animateEasing,
        step: function () {
          var c = {
            width: parseInt(d.element.css("width"), 10),
            height: parseInt(d.element.css("height"), 10),
            top: parseInt(d.element.css("top"), 10),
            left: parseInt(d.element.css("left"), 10)
          };
          f && f.length && a(f[0]).css({
            width: c.width,
            height: c.height
          }), d._updateCache(c), d._propagate("resize", b)
        }
      })
    }
  }), a.ui.plugin.add("resizable", "containment", {
    start: function (b, d) {
      var e = a(this).data("resizable"),
        f = e.options,
        g = e.element,
        h = f.containment,
        i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
      if (!i) return;
      e.containerElement = a(i);
      if (/document/.test(h) || h == document) e.containerOffset = {
        left: 0,
        top: 0
      }, e.containerPosition = {
        left: 0,
        top: 0
      }, e.parentData = {
        element: a(document),
        left: 0,
        top: 0,
        width: a(document).width(),
        height: a(document).height() || document.body.parentNode.scrollHeight
      };
      else {
        var j = a(i),
          k = [];
        a(["Top", "Right", "Left", "Bottom"]).each(function (a, b) {
          k[a] = c(j.css("padding" + b))
        }), e.containerOffset = j.offset(), e.containerPosition = j.position(), e.containerSize = {
          height: j.innerHeight() - k[3],
          width: j.innerWidth() - k[1]
        };
        var l = e.containerOffset,
          m = e.containerSize.height,
          n = e.containerSize.width,
          o = a.ui.hasScroll(i, "left") ? i.scrollWidth : n,
          p = a.ui.hasScroll(i) ? i.scrollHeight : m;
        e.parentData = {
          element: i,
          left: l.left,
          top: l.top,
          width: o,
          height: p
        }
      }
    },
    resize: function (b, c) {
      var d = a(this).data("resizable"),
        e = d.options,
        f = d.containerSize,
        g = d.containerOffset,
        h = d.size,
        i = d.position,
        j = d._aspectRatio || b.shiftKey,
        k = {
          top: 0,
          left: 0
        }, l = d.containerElement;
      l[0] != document && /static/.test(l.css("position")) && (k = g), i.left < (d._helper ? g.left : 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left : d.position.left - k.left), j && (d.size.height = d.size.width / d.aspectRatio), d.position.left = e.helper ? g.left : 0), i.top < (d._helper ? g.top : 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top : d.position.top), j && (d.size.width = d.size.height * d.aspectRatio), d.position.top = d._helper ? g.top : 0), d.offset.left = d.parentData.left + d.position.left, d.offset.top = d.parentData.top + d.position.top;
      var m = Math.abs((d._helper ? d.offset.left - k.left : d.offset.left - k.left) + d.sizeDiff.width),
        n = Math.abs((d._helper ? d.offset.top - k.top : d.offset.top - g.top) + d.sizeDiff.height),
        o = d.containerElement.get(0) == d.element.parent().get(0),
        p = /relative|absolute/.test(d.containerElement.css("position"));
      o && p && (m -= d.parentData.left), m + d.size.width >= d.parentData.width && (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)), n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio))
    },
    stop: function (b, c) {
      var d = a(this).data("resizable"),
        e = d.options,
        f = d.position,
        g = d.containerOffset,
        h = d.containerPosition,
        i = d.containerElement,
        j = a(d.helper),
        k = j.offset(),
        l = j.outerWidth() - d.sizeDiff.width,
        m = j.outerHeight() - d.sizeDiff.height;
      d._helper && !e.animate && /relative/.test(i.css("position")) && a(this).css({
        left: k.left - h.left - g.left,
        width: l,
        height: m
      }), d._helper && !e.animate && /static/.test(i.css("position")) && a(this).css({
        left: k.left - h.left - g.left,
        width: l,
        height: m
      })
    }
  }), a.ui.plugin.add("resizable", "ghost", {
    start: function (b, c) {
      var d = a(this).data("resizable"),
        e = d.options,
        f = d.size;
      d.ghost = d.originalElement.clone(), d.ghost.css({
        opacity: .25,
        display: "block",
        position: "relative",
        height: f.height,
        width: f.width,
        margin: 0,
        left: 0,
        top: 0
      }).addClass("ui-resizable-ghost").addClass(typeof e.ghost == "string" ? e.ghost : ""), d.ghost.appendTo(d.helper)
    },
    resize: function (b, c) {
      var d = a(this).data("resizable"),
        e = d.options;
      d.ghost && d.ghost.css({
        position: "relative",
        height: d.size.height,
        width: d.size.width
      })
    },
    stop: function (b, c) {
      var d = a(this).data("resizable"),
        e = d.options;
      d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0))
    }
  }), a.ui.plugin.add("resizable", "grid", {
    resize: function (b, c) {
      var d = a(this).data("resizable"),
        e = d.options,
        f = d.size,
        g = d.originalSize,
        h = d.originalPosition,
        i = d.axis,
        j = e._aspectRatio || b.shiftKey;
      e.grid = typeof e.grid == "number" ? [e.grid, e.grid] : e.grid;
      var k = Math.round((f.width - g.width) / (e.grid[0] || 1)) * (e.grid[0] || 1),
        l = Math.round((f.height - g.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
      /^(se|s|e)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l) : /^(ne)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l) : /^(sw)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.left = h.left - k) : (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l, d.position.left = h.left - k)
    }
  });
  var c = function (a) {
    return parseInt(a, 10) || 0
  }, d = function (a) {
      return !isNaN(parseInt(a, 10))
    }
}(jQuery),

function (a, b) {
  a.widget("ui.selectable", a.ui.mouse, {
    options: {
      appendTo: "body",
      autoRefresh: !0,
      distance: 0,
      filter: "*",
      tolerance: "touch"
    },
    _create: function () {
      var b = this;
      this.element.addClass("ui-selectable"), this.dragged = !1;
      var c;
      this.refresh = function () {
        c = a(b.options.filter, b.element[0]), c.addClass("ui-selectee"), c.each(function () {
          var b = a(this),
            c = b.offset();
          a.data(this, "selectable-item", {
            element: this,
            $element: b,
            left: c.left,
            top: c.top,
            right: c.left + b.outerWidth(),
            bottom: c.top + b.outerHeight(),
            startselected: !1,
            selected: b.hasClass("ui-selected"),
            selecting: b.hasClass("ui-selecting"),
            unselecting: b.hasClass("ui-unselecting")
          })
        })
      }, this.refresh(), this.selectees = c.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
    },
    destroy: function () {
      return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this
    },
    _mouseStart: function (b) {
      var c = this;
      this.opos = [b.pageX, b.pageY];
      if (this.options.disabled) return;
      var d = this.options;
      this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
        left: b.clientX,
        top: b.clientY,
        width: 0,
        height: 0
      }), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
        var d = a.data(this, "selectable-item");
        d.startselected = !0, !b.metaKey && !b.ctrlKey && (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {
          unselecting: d.element
        }))
      }), a(b.target).parents().andSelf().each(function () {
        var d = a.data(this, "selectable-item");
        if (d) {
          var e = !b.metaKey && !b.ctrlKey || !d.$element.hasClass("ui-selected");
          return d.$element.removeClass(e ? "ui-unselecting" : "ui-selected").addClass(e ? "ui-selecting" : "ui-unselecting"), d.unselecting = !e, d.selecting = e, d.selected = e, e ? c._trigger("selecting", b, {
            selecting: d.element
          }) : c._trigger("unselecting", b, {
            unselecting: d.element
          }), !1
        }
      })
    },
    _mouseDrag: function (b) {
      var c = this;
      this.dragged = !0;
      if (this.options.disabled) return;
      var d = this.options,
        e = this.opos[0],
        f = this.opos[1],
        g = b.pageX,
        h = b.pageY;
      if (e > g) {
        var i = g;
        g = e, e = i
      }
      if (f > h) {
        var i = h;
        h = f, f = i
      }
      return this.helper.css({
        left: e,
        top: f,
        width: g - e,
        height: h - f
      }), this.selectees.each(function () {
        var i = a.data(this, "selectable-item");
        if (!i || i.element == c.element[0]) return;
        var j = !1;
        d.tolerance == "touch" ? j = !(i.left > g || i.right < e || i.top > h || i.bottom < f) : d.tolerance == "fit" && (j = i.left > e && i.right < g && i.top > f && i.bottom < h), j ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, c._trigger("selecting", b, {
          selecting: i.element
        }))) : (i.selecting && ((b.metaKey || b.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), c._trigger("unselecting", b, {
          unselecting: i.element
        }))), i.selected && !b.metaKey && !b.ctrlKey && !i.startselected && (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, c._trigger("unselecting", b, {
          unselecting: i.element
        })))
      }), !1
    },
    _mouseStop: function (b) {
      var c = this;
      this.dragged = !1;
      var d = this.options;
      return a(".ui-unselecting", this.element[0]).each(function () {
        var d = a.data(this, "selectable-item");
        d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {
          unselected: d.element
        })
      }), a(".ui-selecting", this.element[0]).each(function () {
        var d = a.data(this, "selectable-item");
        d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
          selected: d.element
        })
      }), this._trigger("stop", b), this.helper.remove(), !1
    }
  }), a.extend(a.ui.selectable, {
    version: "1.8.21"
  })
}(jQuery),

function (a, b) {
  a.widget("ui.sortable", a.ui.mouse, {
    widgetEventPrefix: "sort",
    ready: !1,
    options: {
      appendTo: "parent",
      axis: !1,
      connectWith: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      dropOnEmpty: !0,
      forcePlaceholderSize: !1,
      forceHelperSize: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      items: "> *",
      opacity: !1,
      placeholder: !1,
      revert: !1,
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: "default",
      tolerance: "intersect",
      zIndex: 1e3
    },
    _create: function () {
      var a = this.options;
      this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? a.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
    },
    destroy: function () {
      a.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
      for (var b = this.items.length - 1; b >= 0; b--) this.items[b].item.removeData(this.widgetName + "-item");
      return this
    },
    _setOption: function (b, c) {
      b === "disabled" ? (this.options[b] = c, this.widget()[c ? "addClass" : "removeClass"]("ui-sortable-disabled")) : a.Widget.prototype._setOption.apply(this, arguments)
    },
    _mouseCapture: function (b, c) {
      var d = this;
      if (this.reverting) return !1;
      if (this.options.disabled || this.options.type == "static") return !1;
      this._refreshItems(b);
      var e = null,
        f = this,
        g = a(b.target).parents().each(function () {
          if (a.data(this, d.widgetName + "-item") == f) return e = a(this), !1
        });
      a.data(b.target, d.widgetName + "-item") == f && (e = a(b.target));
      if (!e) return !1;
      if (this.options.handle && !
        c) {
        var h = !1;
        a(this.options.handle, e).find("*").andSelf().each(function () {
          this == b.target && (h = !0)
        });
        if (!h) return !1
      }
      return this.currentItem = e, this._removeCurrentsFromItems(), !0
    },
    _mouseStart: function (b, c, d) {
      var e = this.options,
        f = this;
      this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      }, a.extend(this.offset, {
        click: {
          left: b.pageX - this.offset.left,
          top: b.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), this.domPosition = {
        prev: this.currentItem.prev()[0],
        parent: this.currentItem.parent()[0]
      }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && (a("body").css("cursor") && (this._storedCursor = a("body").css("cursor")), a("body").css("cursor", e.cursor)), e.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", e.opacity)), e.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", e.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
      if (!d)
        for (var g = this.containers.length - 1; g >= 0; g--) this.containers[g]._trigger("activate", b, f._uiHash(this));
      return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
    },
    _mouseDrag: function (b) {
      this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
      if (this.options.scroll) {
        var c = this.options,
          d = !1;
        this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed : b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed : b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))), d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)
      }
      this.positionAbs = this._convertPositionTo("absolute");
      if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
      if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
      for (var e = this.items.length - 1; e >= 0; e--) {
        var f = this.items[e],
          g = f.item[0],
          h = this._intersectsWithPointer(f);
        if (!h) continue;
        if (g != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != g && !a.ui.contains(this.placeholder[0], g) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], g) : !0)) {
          this.direction = h == 1 ? "down" : "up";
          if (this.options.tolerance == "pointer" || this._intersectsWithSides(f)) this._rearrange(b, f);
          else break;
          this._trigger("change", b, this._uiHash());
          break
        }
      }
      return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
    },
    _mouseStop: function (b, c) {
      if (!b) return;
      a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b);
      if (this.options.revert) {
        var d = this,
          e = d.placeholder.offset();
        d.reverting = !0, a(this.helper).animate({
          left: e.left - this.offset.parent.left - d.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
          top: e.top - this.offset.parent.top - d.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
        }, parseInt(this.options.revert, 10) || 500, function () {
          d._clear(b)
        })
      } else this._clear(b, c);
      return !1
    },
    cancel: function () {
      var b = this;
      if (this.dragging) {
        this._mouseUp({
          target: null
        }), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
        for (var c = this.containers.length - 1; c >= 0; c--) this.containers[c]._trigger("deactivate", null, b._uiHash(this)), this.containers[c].containerCache.over && (this.containers[c]._trigger("out", null, b._uiHash(this)), this.containers[c].containerCache.over = 0)
      }
      return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
        helper: null,
        dragging: !1,
        reverting: !1,
        _noFinalSort: null
      }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
    },
    serialize: function (b) {
      var c = this._getItemsAsjQuery(b && b.connected),
        d = [];
      return b = b || {}, a(c).each(function () {
        var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[-=_](.+)/);
        c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
      }), !d.length && b.key && d.push(b.key + "="), d.join("&")
    },
    toArray: function (b) {
      var c = this._getItemsAsjQuery(b && b.connected),
        d = [];
      return b = b || {}, c.each(function () {
        d.push(a(b.item || this).attr(b.attribute || "id") || "")
      }), d
    },
    _intersectsWith: function (a) {
      var b = this.positionAbs.left,
        c = b + this.helperProportions.width,
        d = this.positionAbs.top,
        e = d + this.helperProportions.height,
        f = a.left,
        g = f + a.width,
        h = a.top,
        i = h + a.height,
        j = this.offset.click.top,
        k = this.offset.click.left,
        l = d + j > h && d + j < i && b + k > f && b + k < g;
      return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? l : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
    },
    _intersectsWithPointer: function (b) {
      var c = this.options.axis === "x" || a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height),
        d = this.options.axis === "y" || a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width),
        e = c && d,
        f = this._getDragVerticalDirection(),
        g = this._getDragHorizontalDirection();
      return e ? this.floating ? g && g == "right" || f == "down" ? 2 : 1 : f && (f == "down" ? 2 : 1) : !1
    },
    _intersectsWithSides: function (b) {
      var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height),
        d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width),
        e = this._getDragVerticalDirection(),
        f = this._getDragHorizontalDirection();
      return this.floating && f ? f == "right" && d || f == "left" && !d : e && (e == "down" && c || e == "up" && !c)
    },
    _getDragVerticalDirection: function () {
      var a = this.positionAbs.top - this.lastPositionAbs.top;
      return a != 0 && (a > 0 ? "down" : "up")
    },
    _getDragHorizontalDirection: function () {
      var a = this.positionAbs.left - this.lastPositionAbs.left;
      return a != 0 && (a > 0 ? "right" : "left")
    },
    refresh: function (a) {
      return this._refreshItems(a), this.refreshPositions(), this
    },
    _connectWith: function () {
      var a = this.options;
      return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
    },
    _getItemsAsjQuery: function (b) {
      var c = this,
        d = [],
        e = [],
        f = this._connectWith();
      if (f && b)
        for (var g = f.length - 1; g >= 0; g--) {
          var h = a(f[g]);
          for (var i = h.length - 1; i >= 0; i--) {
            var j = a.data(h[i], this.widgetName);
            j && j != this && !j.options.disabled && e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element) : a(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
          }
        }
      e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
        options: this.options,
        item: this.currentItem
      }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
      for (var g = e.length - 1; g >= 0; g--) e[g][0].each(function () {
        d.push(this)
      });
      return a(d)
    },
    _removeCurrentsFromItems: function () {
      var a = this.currentItem.find(":data(" + this.widgetName + "-item)");
      for (var b = 0; b < this.items.length; b++)
        for (var c = 0; c < a.length; c++) a[c] == this.items[b].item[0] && this.items.splice(b, 1)
    },
    _refreshItems: function (b) {
      this.items = [], this.containers = [this];
      var c = this.items,
        d = this,
        e = [
          [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
            item: this.currentItem
          }) : a(this.options.items, this.element), this]
        ],
        f = this._connectWith();
      if (f && this.ready)
        for (var g = f.length - 1; g >= 0; g--) {
          var h = a(f[g]);
          for (var i = h.length - 1; i >= 0; i--) {
            var j = a.data(h[i], this.widgetName);
            j && j != this && !j.options.disabled && (e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element[0], b, {
              item: this.currentItem
            }) : a(j.options.items, j.element), j]), this.containers.push(j))
          }
        }
      for (var g = e.length - 1; g >= 0; g--) {
        var k = e[g][1],
          l = e[g][0];
        for (var i = 0, m = l.length; i < m; i++) {
          var n = a(l[i]);
          n.data(this.widgetName + "-item", k), c.push({
            item: n,
            instance: k,
            width: 0,
            height: 0,
            left: 0,
            top: 0
          })
        }
      }
    },
    refreshPositions: function (b) {
      this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
      for (var c = this.items.length - 1; c >= 0; c--) {
        var d = this.items[c];
        if (d.instance != this.currentContainer && this.currentContainer && d.item[0] != this.currentItem[0]) continue;
        var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
        b || (d.width = e.outerWidth(), d.height = e.outerHeight());
        var f = e.offset();
        d.left = f.left, d.top = f.top
      }
      if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
      else
        for (var c = this.containers.length - 1; c >= 0; c--) {
          var f = this.containers[c].element.offset();
          this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight()
        }
      return this
    },
    _createPlaceholder: function (b) {
      var c = b || this,
        d = c.options;
      if (!d.placeholder || d.placeholder.constructor == String) {
        var e = d.placeholder;
        d.placeholder = {
          element: function () {
            var b = a(document.createElement(c.currentItem[0].nodeName)).addClass(e || c.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
            return e || (b.style.visibility = "hidden"), b
          },
          update: function (a, b) {
            if (e && !d.forcePlaceholderSize) return;
            b.height() || b.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css("paddingTop") || 0, 10) - parseInt(c.currentItem.css("paddingBottom") || 0, 10)), b.width() || b.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css("paddingLeft") || 0, 10) - parseInt(c.currentItem.css("paddingRight") || 0, 10))
          }
        }
      }
      c.placeholder = a(d.placeholder.element.call(c.element, c.currentItem)), c.currentItem.after(c.placeholder), d.placeholder.update(c, c.placeholder)
    },
    _contactContainers: function (b) {
      var c = null,
        d = null;
      for (var e = this.containers.length - 1; e >= 0; e--) {
        if (a.ui.contains(this.currentItem[0], this.containers[e].element[0])) continue;
        if (this._intersectsWith(this.containers[e].containerCache)) {
          if (c && a.ui.contains(this.containers[e].element[0], c.element[0])) continue;
          c = this.containers[e], d = e
        } else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", b, this._uiHash(this)), this.containers[e].containerCache.over = 0)
      }
      if (!c) return;
      if (this.containers.length === 1) this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1;
      else if (this.currentContainer != this.containers[d]) {
        var f = 1e4,
          g = null,
          h = this.positionAbs[this.containers[d].floating ? "left" : "top"];
        for (var i = this.items.length - 1; i >= 0; i--) {
          if (!a.ui.contains(this.containers[d].element[0], this.items[i].item[0])) continue;
          var j = this.containers[d].floating ? this.items[i].item.offset().left : this.items[i].item.offset().top;
          Math.abs(j - h) < f && (f = Math.abs(j - h), g = this.items[i], this.direction = j - h > 0 ? "down" : "up")
        }
        if (!g && !this.options.dropOnEmpty) return;
        this.currentContainer = this.containers[d], g ? this._rearrange(b, g, null, !0) : this._rearrange(b, null, this.containers[d].element, !0), this._trigger("change", b, this._uiHash()), this.containers[d]._trigger("change", b, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1
      }
    },
    _createHelper: function (b) {
      var c = this.options,
        d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
      return d.parents("body").length || a(c.appendTo != "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] == this.currentItem[0] && (this._storedCSS = {
        width: this.currentItem[0].style.width,
        height: this.currentItem[0].style.height,
        position: this.currentItem.css("position"),
        top: this.currentItem.css("top"),
        left: this.currentItem.css("left")
      }), (d[0].style.width == "" || c.forceHelperSize) && d.width(this.currentItem.width()), (d[0].style.height == "" || c.forceHelperSize) && d.height(this.currentItem.height()), d
    },
    _adjustOffsetFromHelper: function (b) {
      typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var b = this.offsetParent.offset();
      this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
      if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
        top: 0,
        left: 0
      };
      return {
        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      }
    },
    _getRelativeOffset: function () {
      if (this.cssPosition == "relative") {
        var a = this.currentItem.position();
        return {
          top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        }
      }
      return {
        top: 0,
        left: 0
      }
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
        top: parseInt(this.currentItem.css("marginTop"), 10) || 0
      }
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      }
    },
    _setContainment: function () {
      var b = this.options;
      b.containment == "parent" && (b.containment = this.helper[0].parentNode);
      if (b.containment == "document" || b.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
      if (!/^(document|window|parent)$/.test(b.containment)) {
        var c = a(b.containment)[0],
          d = a(b.containment).offset(),
          e = a(c).css("overflow") != "hidden";
        this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
      }
    },
    _convertPositionTo: function (b, c) {
      c || (c = this.position);
      var d = b == "absolute" ? 1 : -1,
        e = this.options,
        f = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        g = /(html|body)/i.test(f[0].tagName);
      return {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
      }
    },
    _generatePosition: function (b) {
      var c = this.options,
        d = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        e = /(html|body)/i.test(d[0].tagName);
      this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
      var f = b.pageX,
        g = b.pageY;
      if (this.originalPosition) {
        this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top));
        if (c.grid) {
          var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
          g = this.containment ? h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3] ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h : h;
          var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
          f = this.containment ? i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2] ? i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i : i
        }
      }
      return {
        top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
        left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
      }
    },
    _rearrange: function (a, b, c, d) {
      c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
      var e = this,
        f = this.counter;
      window.setTimeout(function () {
        f == e.counter && e.refreshPositions(!d)
      }, 0)
    },
    _clear: function (b, c) {
      this.reverting = !1;
      var d = [],
        e = this;
      !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
      if (this.helper[0] == this.currentItem[0]) {
        for (var f in this._storedCSS)
          if (this._storedCSS[f] == "auto" || this._storedCSS[f] == "static") this._storedCSS[f] = "";
        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
      } else this.currentItem.show();
      this.fromOutside && !c && d.push(function (a) {
        this._trigger("receive", a, this._uiHash(this.fromOutside))
      }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c && d.push(function (a) {
        this._trigger("update", a, this._uiHash())
      });
      if (!a.ui.contains(this.element[0], this.currentItem[0])) {
        c || d.push(function (a) {
          this._trigger("remove", a, this._uiHash())
        });
        for (var f = this.containers.length - 1; f >= 0; f--) a.ui.contains(this.containers[f].element[0], this.currentItem[0]) && !c && (d.push(function (a) {
          return function (b) {
            a._trigger("receive", b, this._uiHash(this))
          }
        }.call(this, this.containers[f])), d.push(function (a) {
          return function (b) {
            a._trigger("update", b, this._uiHash(this))
          }
        }.call(this, this.containers[f])))
      }
      for (var f = this.containers.length - 1; f >= 0; f--) c || d.push(function (a) {
        return function (b) {
          a._trigger("deactivate", b, this._uiHash(this))
        }
      }.call(this, this.containers[f])), this.containers[f].containerCache.over && (d.push(function (a) {
        return function (b) {
          a._trigger("out", b, this._uiHash(this))
        }
      }.call(this, this.containers[f])), this.containers[f].containerCache.over = 0);
      this._storedCursor && a("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
      if (this.cancelHelperRemoval) {
        if (!c) {
          this._trigger("beforeStop", b, this._uiHash());
          for (var f = 0; f < d.length; f++) d[f].call(this, b);
          this._trigger("stop", b, this._uiHash())
        }
        return !1
      }
      c || this._trigger("beforeStop", b, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
      if (!c) {
        for (var f = 0; f < d.length; f++) d[f].call(this, b);
        this._trigger("stop", b, this._uiHash())
      }
      return this.fromOutside = !1, !0
    },
    _trigger: function () {
      a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
    },
    _uiHash: function (b) {
      var c = b || this;
      return {
        helper: c.helper,
        placeholder: c.placeholder || a([]),
        position: c.position,
        originalPosition: c.originalPosition,
        offset: c.positionAbs,
        item: c.currentItem,
        sender: b ? b.element : null
      }
    }
  }), a.extend(a.ui.sortable, {
    version: "1.8.21"
  })
}(jQuery),

function (a, b) {
  a.widget("ui.accordion", {
    options: {
      active: 0,
      animated: "slide",
      autoHeight: !0,
      clearStyle: !1,
      collapsible: !1,
      event: "click",
      fillSpace: !1,
      header: "> li > :first-child,> :not(li):even",
      icons: {
        header: "ui-icon-triangle-1-e",
        headerSelected: "ui-icon-triangle-1-s"
      },
      navigation: !1,
      navigationFilter: function () {
        return this.href.toLowerCase() === location.href.toLowerCase()
      }
    },
    _create: function () {
      var b = this,
        c = b.options;
      b.running = 0, b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), b.headers = b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
        if (c.disabled) return;
        a(this).addClass("ui-state-hover")
      }).bind("mouseleave.accordion", function () {
        if (c.disabled) return;
        a(this).removeClass("ui-state-hover")
      }).bind("focus.accordion", function () {
        if (c.disabled) return;
        a(this).addClass("ui-state-focus")
      }).bind("blur.accordion", function () {
        if (c.disabled) return;
        a(this).removeClass("ui-state-focus")
      }), b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
      if (c.navigation) {
        var d = b.element.find("a").filter(c.navigationFilter).eq(0);
        if (d.length) {
          var e = d.closest(".ui-accordion-header");
          e.length ? b.active = e : b.active = d.closest(".ui-accordion-content").prev()
        }
      }
      b.active = b._findActive(b.active || c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), b.active.next().addClass("ui-accordion-content-active"), b._createIcons(), b.resize(), b.element.attr("role", "tablist"), b.headers.attr("role", "tab").bind("keydown.accordion", function (a) {
        return b._keydown(a)
      }).next().attr("role", "tabpanel"), b.headers.not(b.active || "").attr({
        "aria-expanded": "false",
        "aria-selected": "false",
        tabIndex: -1
      }).next().hide(), b.active.length ? b.active.attr({
        "aria-expanded": "true",
        "aria-selected": "true",
        tabIndex: 0
      }) : b.headers.eq(0).attr("tabIndex", 0), a.browser.safari || b.headers.find("a").attr("tabIndex", -1), c.event && b.headers.bind(c.event.split(" ").join(".accordion ") + ".accordion", function (a) {
        b._clickHandler.call(b, a, this), a.preventDefault()
      })
    },
    _createIcons: function () {
      var b = this.options;
      b.icons && (a("<span></span>").addClass("ui-icon " + b.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
    },
    _destroyIcons: function () {
      this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons")
    },
    destroy: function () {
      var b = this.options;
      this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
      var c = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
      return (b.autoHeight || b.fillHeight) && c.css("height", ""), a.Widget.prototype.destroy.call(this)
    },
    _setOption: function (b, c) {
      a.Widget.prototype._setOption.apply(this, arguments), b == "active" && this.activate(c), b == "icons" && (this._destroyIcons(), c && this._createIcons()), b == "disabled" && this.headers.add(this.headers.next())[c ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
    },
    _keydown: function (b) {
      if (this.options.disabled || b.altKey || b.ctrlKey) return;
      var c = a.ui.keyCode,
        d = this.headers.length,
        e = this.headers.index(b.target),
        f = !1;
      switch (b.keyCode) {
      case c.RIGHT:
      case c.DOWN:
        f = this.headers[(e + 1) % d];
        break;
      case c.LEFT:
      case c.UP:
        f = this.headers[(e - 1 + d) % d];
        break;
      case c.SPACE:
      case c.ENTER:
        this._clickHandler({
          target: b.target
        }, b.target), b.preventDefault()
      }
      return f ? (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), !1) : !0
    },
    resize: function () {
      var b = this.options,
        c;
      if (b.fillSpace) {
        if (a.browser.msie) {
          var d = this.element.parent().css("overflow");
          this.element.parent().css("overflow", "hidden")
        }
        c = this.element.parent().height(), a.browser.msie && this.element.parent().css("overflow", d), this.headers.each(function () {
          c -= a(this).outerHeight(!0)
        }), this.headers.next().each(function () {
          a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
        }).css("overflow", "auto")
      } else b.autoHeight && (c = 0, this.headers.next().each(function () {
        c = Math.max(c, a(this).height("").height())
      }).height(c));
      return this
    },
    activate: function (a) {
      this.options.active = a;
      var b = this._findActive(a)[0];
      return this._clickHandler({
        target: b
      }, b), this
    },
    _findActive: function (b) {
      return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === !1 ? a([]) : this.headers.filter(":eq(0)")
    },
    _clickHandler: function (b, c) {
      var d = this.options;
      if (d.disabled) return;
      if (!b.target) {
        if (!d.collapsible) return;
        this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header), this.active.next().addClass("ui-accordion-content-active");
        var e = this.active.next(),
          f = {
            options: d,
            newHeader: a([]),
            oldHeader: d.active,
            newContent: a([]),
            oldContent: e
          }, g = this.active = a([]);
        this._toggle(g, e, f);
        return
      }
      var h = a(b.currentTarget || c),
        i = h[0] === this.active[0];
      d.active = d.collapsible && i ? !1 : this.headers.index(h);
      if (this.running || !d.collapsible && i) return;
      var j = this.active,
        g = h.next(),
        e = this.active.next(),
        f = {
          options: d,
          newHeader: i && d.collapsible ? a([]) : h,
          oldHeader: this.active,
          newContent: i && d.collapsible ? a([]) : g,
          oldContent: e
        }, k = this.headers.index(this.active[0]) > this.headers.index(h[0]);
      this.active = i ? a([]) : h, this._toggle(g, e, f, i, k), j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header), i || (h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected), h.next().addClass("ui-accordion-content-active"));
      return
    },
    _toggle: function (b, c, d, e, f) {
      var g = this,
        h = g.options;
      g.toShow = b, g.toHide = c, g.data = d;
      var i = function () {
        if (!g) return;
        return g._completed.apply(g, arguments)
      };
      g._trigger("changestart", null, g.data), g.running = c.size() === 0 ? b.size() : c.size();
      if (h.animated) {
        var j = {};
        h.collapsible && e ? j = {
          toShow: a([]),
          toHide: c,
          complete: i,
          down: f,
          autoHeight: h.autoHeight || h.fillSpace
        } : j = {
          toShow: b,
          toHide: c,
          complete: i,
          down: f,
          autoHeight: h.autoHeight || h.fillSpace
        }, h.proxied || (h.proxied = h.animated), h.proxiedDuration || (h.proxiedDuration = h.duration), h.animated = a.isFunction(h.proxied) ? h.proxied(j) : h.proxied, h.duration = a.isFunction(h.proxiedDuration) ? h.proxiedDuration(j) : h.proxiedDuration;
        var k = a.ui.accordion.animations,
          l = h.duration,
          m = h.animated;
        m && !k[m] && !a.easing[m] && (m = "slide"), k[m] || (k[m] = function (a) {
          this.slide(a, {
            easing: m,
            duration: l || 700
          })
        }), k[m](j)
      } else h.collapsible && e ? b.toggle() : (c.hide(), b.show()), i(!0);
      c.prev().attr({
        "aria-expanded": "false",
        "aria-selected": "false",
        tabIndex: -1
      }).blur(), b.prev().attr({
        "aria-expanded": "true",
        "aria-selected": "true",
        tabIndex: 0
      }).focus()
    },
    _completed: function (a) {
      this.running = a ? 0 : --this.running;
      if (this.running) return;
      this.options.clearStyle && this.toShow.add(this.toHide).css({
        height: "",
        overflow: ""
      }), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data)
    }
  }), a.extend(a.ui.accordion, {
    version: "1.8.21",
    animations: {
      slide: function (b, c) {
        b = a.extend({
          easing: "swing",
          duration: 300
        }, b, c);
        if (!b.toHide.size()) {
          b.toShow.animate({
            height: "show",
            paddingTop: "show",
            paddingBottom: "show"
          }, b);
          return
        }
        if (!b.toShow.size()) {
          b.toHide.animate({
            height: "hide",
            paddingTop: "hide",
            paddingBottom: "hide"
          }, b);
          return
        }
        var d = b.toShow.css("overflow"),
          e = 0,
          f = {}, g = {}, h = ["height", "paddingTop", "paddingBottom"],
          i, j = b.toShow;
        i = j[0].style.width, j.width(j.parent().width() - parseFloat(j.css("paddingLeft")) - parseFloat(j.css("paddingRight")) - (parseFloat(j.css("borderLeftWidth")) || 0) - (parseFloat(j.css("borderRightWidth")) || 0)), a.each(h, function (c, d) {
          g[d] = "hide";
          var e = ("" + a.css(b.toShow[0], d)).match(/^([\d+-.]+)(.*)$/);
          f[d] = {
            value: e[1],
            unit: e[2] || "px"
          }
        }), b.toShow.css({
          height: 0,
          overflow: "hidden"
        }).show(), b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g, {
          step: function (a, c) {
            c.prop == "height" && (e = c.end - c.start === 0 ? 0 : (c.now - c.start) / (c.end - c.start)), b.toShow[0].style[c.prop] = e * f[c.prop].value + f[c.prop].unit
          },
          duration: b.duration,
          easing: b.easing,
          complete: function () {
            b.autoHeight || b.toShow.css("height", ""), b.toShow.css({
              width: i,
              overflow: d
            }), b.complete()
          }
        })
      },
      bounceslide: function (a) {
        this.slide(a, {
          easing: a.down ? "easeOutBounce" : "swing",
          duration: a.down ? 1e3 : 200
        })
      }
    }
  })
}(jQuery),

function (a, b) {
  var c = 0;
  a.widget("ui.autocomplete", {
    options: {
      appendTo: "body",
      autoFocus: !1,
      delay: 300,
      minLength: 1,
      position: {
        my: "left top",
        at: "left bottom",
        collision: "none"
      },
      source: null
    },
    pending: 0,
    _create: function () {
      var b = this,
        c = this.element[0].ownerDocument,
        d;
      this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
        role: "textbox",
        "aria-autocomplete": "list",
        "aria-haspopup": "true"
      }).bind("keydown.autocomplete", function (c) {
        if (b.options.disabled || b.element.propAttr("readOnly")) return;
        d = !1;
        var e = a.ui.keyCode;
        switch (c.keyCode) {
        case e.PAGE_UP:
          b._move("previousPage", c);
          break;
        case e.PAGE_DOWN:
          b._move("nextPage", c);
          break;
        case e.UP:
          b._keyEvent("previous", c);
          break;
        case e.DOWN:
          b._keyEvent("next", c);
          break;
        case e.ENTER:
        case e.NUMPAD_ENTER:
          b.menu.active && (d = !0, c.preventDefault());
        case e.TAB:
          if (!b.menu.active) return;
          b.menu.select(c);
          break;
        case e.ESCAPE:
          b.element.val(b.term), b.close(c);
          break;
        default:
          clearTimeout(b.searching), b.searching = setTimeout(function () {
            b.term != b.element.val() && (b.selectedItem = null, b.search(null, c))
          }, b.options.delay)
        }
      }).bind("keypress.autocomplete", function (a) {
        d && (d = !1, a.preventDefault())
      }).bind("focus.autocomplete", function () {
        if (b.options.disabled) return;
        b.selectedItem = null, b.previous = b.element.val()
      }).bind("blur.autocomplete", function (a) {
        if (b.options.disabled) return;
        clearTimeout(b.searching), b.closing = setTimeout(function () {
          b.close(a), b._change(a)
        }, 150)
      }), this._initSource(), this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo || "body", c)[0]).mousedown(function (c) {
        var d = b.menu.element[0];
        a(c.target).closest(".ui-menu-item").length || setTimeout(function () {
          a(document).one("mousedown", function (c) {
            c.target !== b.element[0] && c.target !== d && !a.ui.contains(d, c.target) && b.close()
          })
        }, 1), setTimeout(function () {
          clearTimeout(b.closing)
        }, 13)
      }).menu({
        focus: function (a, c) {
          var d = c.item.data("item.autocomplete");
          !1 !== b._trigger("focus", a, {
            item: d
          }) && /^key/.test(a.originalEvent.type) && b.element.val(d.value)
        },
        selected: function (a, d) {
          var e = d.item.data("item.autocomplete"),
            f = b.previous;
          b.element[0] !== c.activeElement && (b.element.focus(), b.previous = f, setTimeout(function () {
            b.previous = f, b.selectedItem = e
          }, 1)), !1 !== b._trigger("select", a, {
            item: e
          }) && b.element.val(e.value), b.term = b.element.val(), b.close(a), b.selectedItem = e
        },
        blur: function (a, c) {
          b.menu.element.is(":visible") && b.element.val() !== b.term && b.element.val(b.term)
        }
      }).zIndex(this.element.zIndex() + 1).css({
        top: 0,
        left: 0
      }).hide().data("menu"), a.fn.bgiframe && this.menu.element.bgiframe(), b.beforeunloadHandler = function () {
        b.element.removeAttr("autocomplete")
      }, a(window).bind("beforeunload", b.beforeunloadHandler)
    },
    destroy: function () {
      this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), a(window).unbind("beforeunload", this.beforeunloadHandler), a.Widget.prototype.destroy.call(this)
    },
    _setOption: function (b, c) {
      a.Widget.prototype._setOption.apply(this, arguments), b === "source" && this._initSource(), b === "appendTo" && this.menu.element.appendTo(a(c || "body", this.element[0].ownerDocument)[0]), b === "disabled" && c && this.xhr && this.xhr.abort()
    },
    _initSource: function () {
      var b = this,
        c, d;
      a.isArray(this.options.source) ? (c = this.options.source, this.source = function (b, d) {
        d(a.ui.autocomplete.filter(c, b.term))
      }) : typeof this.options.source == "string" ? (d = this.options.source, this.source = function (c, e) {
        b.xhr && b.xhr.abort(), b.xhr = a.ajax({
          url: d,
          data: c,
          dataType: "json",
          success: function (a, b) {
            e(a)
          },
          error: function () {
            e([])
          }
        })
      }) : this.source = this.options.source
    },
    search: function (a, b) {
      a = a != null ? a : this.element.val(), this.term = this.element.val();
      if (a.length < this.options.minLength) return this.close(b);
      clearTimeout(this.closing);
      if (this._trigger("search", b) === !1) return;
      return this._search(a)
    },
    _search: function (a) {
      this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
        term: a
      }, this._response())
    },
    _response: function () {
      var a = this,
        b = ++c;
      return function (d) {
        b === c && a.__response(d), a.pending--, a.pending || a.element.removeClass("ui-autocomplete-loading")
      }
    },
    __response: function (a) {
      !this.options.disabled && a && a.length ? (a = this._normalize(a), this._suggest(a), this._trigger("open")) : this.close()
    },
    close: function (a) {
      clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", a))
    },
    _change: function (a) {
      this.previous !== this.element.val() && this._trigger("change", a, {
        item: this.selectedItem
      })
    },
    _normalize: function (b) {
      return b.length && b[0].label && b[0].value ? b : a.map(b, function (b) {
        return typeof b == "string" ? {
          label: b,
          value: b
        } : a.extend({
          label: b.label || b.value,
          value: b.value || b.label
        }, b)
      })
    },
    _suggest: function (b) {
      var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
      this._renderMenu(c, b), this.menu.deactivate(), this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({
        of: this.element
      }, this.options.position)), this.options.autoFocus && this.menu.next(new a.Event("mouseover"))
    },
    _resizeMenu: function () {
      var a = this.menu.element;
      a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
    },
    _renderMenu: function (b, c) {
      var d = this;
      a.each(c, function (a, c) {
        d._renderItem(b, c)
      })
    },
    _renderItem: function (b, c) {
      return a("<li></li>").data("item.autocomplete", c).append(a("<a></a>").text(c.label)).appendTo(b)
    },
    _move: function (a, b) {
      if (!this.menu.element.is(":visible")) {
        this.search(null, b);
        return
      }
      if (this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a)) {
        this.element.val(this.term), this.menu.deactivate();
        return
      }
      this.menu[a](b)
    },
    widget: function () {
      return this.menu.element
    },
    _keyEvent: function (a, b) {
      if (!this.isMultiLine || this.menu.element.is(":visible")) this._move(a, b), b.preventDefault()
    }
  }), a.extend(a.ui.autocomplete, {
    escapeRegex: function (a) {
      return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    },
    filter: function (b, c) {
      var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
      return a.grep(b, function (a) {
        return d.test(a.label || a.value || a)
      })
    }
  })
}(jQuery),

function (a) {
  a.widget("ui.menu", {
    _create: function () {
      var b = this;
      this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
        role: "listbox",
        "aria-activedescendant": "ui-active-menuitem"
      }).click(function (c) {
        if (!a(c.target).closest(".ui-menu-item a").length) return;
        c.preventDefault(), b.select(c)
      }), this.refresh()
    },
    refresh: function () {
      var b = this,
        c = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
      c.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (c) {
        b.activate(c, a(this).parent())
      }).mouseleave(function () {
        b.deactivate()
      })
    },
    activate: function (a, b) {
      this.deactivate();
      if (this.hasScroll()) {
        var c = b.offset().top - this.element.offset().top,
          d = this.element.scrollTop(),
          e = this.element.height();
        c < 0 ? this.element.scrollTop(d + c) : c >= e && this.element.scrollTop(d + c - e + b.height())
      }
      this.active = b.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", a, {
        item: b
      })
    },
    deactivate: function () {
      if (!this.active) return;
      this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null
    },
    next: function (a) {
      this.move("next", ".ui-menu-item:first", a)
    },
    previous: function (a) {
      this.move("prev", ".ui-menu-item:last", a)
    },
    first: function () {
      return this.active && !this.active.prevAll(".ui-menu-item").length
    },
    last: function () {
      return this.active && !this.active.nextAll(".ui-menu-item").length
    },
    move: function (a, b, c) {
      if (!this.active) {
        this.activate(c, this.element.children(b));
        return
      }
      var d = this.active[a + "All"](".ui-menu-item").eq(0);
      d.length ? this.activate(c, d) : this.activate(c, this.element.children(b))
    },
    nextPage: function (b) {
      if (this.hasScroll()) {
        if (!this.active || this.last()) {
          this.activate(b, this.element.children(".ui-menu-item:first"));
          return
        }
        var c = this.active.offset().top,
          d = this.element.height(),
          e = this.element.children(".ui-menu-item").filter(function () {
            var b = a(this).offset().top - c - d + a(this).height();
            return b < 10 && b > -10
          });
        e.length || (e = this.element.children(".ui-menu-item:last")), this.activate(b, e)
      } else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
    },
    previousPage: function (b) {
      if (this.hasScroll()) {
        if (!this.active || this.first()) {
          this.activate(b, this.element.children(".ui-menu-item:last"));
          return
        }
        var c = this.active.offset().top,
          d = this.element.height(),
          e = this.element.children(".ui-menu-item").filter(function () {
            var b = a(this).offset().top - c + d - a(this).height();
            return b < 10 && b > -10
          });
        e.length || (e = this.element.children(".ui-menu-item:first")), this.activate(b, e)
      } else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
    },
    hasScroll: function () {
      return this.element.height() < this.element[a.fn.prop ? "prop" : "attr"]("scrollHeight")
    },
    select: function (a) {
      this._trigger("selected", a, {
        item: this.active
      })
    }
  })
}(jQuery),

function (a, b) {
  var c, d, e, f, g = "ui-button ui-widget ui-state-default ui-corner-all",
    h = "ui-state-hover ui-state-active ",
    i = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
    j = function () {
      var b = a(this).find(":ui-button");
      setTimeout(function () {
        b.button("refresh")
      }, 1)
    }, k = function (b) {
      var c = b.name,
        d = b.form,
        e = a([]);
      return c && (d ? e = a(d).find("[name='" + c + "']") : e = a("[name='" + c + "']", b.ownerDocument).filter(function () {
        return !this.form
      })), e
    };
  a.widget("ui.button", {
    options: {
      disabled: null,
      text: !0,
      label: null,
      icons: {
        primary: null,
        secondary: null
      }
    },
    _create: function () {
      this.element.closest("form").unbind("reset.button").bind("reset.button", j), typeof this.options.disabled != "boolean" ? this.options.disabled = !! this.element.propAttr("disabled") : this.element.propAttr("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !! this.buttonElement.attr("title");
      var b = this,
        h = this.options,
        i = this.type === "checkbox" || this.type === "radio",
        l = "ui-state-hover" + (i ? "" : " ui-state-active"),
        m = "ui-state-focus";
      h.label === null && (h.label = this.buttonElement.html()), this.buttonElement.addClass(g).attr("role", "button").bind("mouseenter.button", function () {
        if (h.disabled) return;
        a(this).addClass("ui-state-hover"), this === c && a(this).addClass("ui-state-active")
      }).bind("mouseleave.button", function () {
        if (h.disabled) return;
        a(this).removeClass(l)
      }).bind("click.button", function (a) {
        h.disabled && (a.preventDefault(), a.stopImmediatePropagation())
      }), this.element.bind("focus.button", function () {
        b.buttonElement.addClass(m)
      }).bind("blur.button", function () {
        b.buttonElement.removeClass(m)
      }), i && (this.element.bind("change.button", function () {
        if (f) return;
        b.refresh()
      }), this.buttonElement.bind("mousedown.button", function (a) {
        if (h.disabled) return;
        f = !1, d = a.pageX, e = a.pageY
      }).bind("mouseup.button", function (a) {
        if (h.disabled) return;
        if (d !== a.pageX || e !== a.pageY) f = !0
      })), this.type === "checkbox" ? this.buttonElement.bind("click.button", function () {
        if (h.disabled || f) return !1;
        a(this).toggleClass("ui-state-active"), b.buttonElement.attr("aria-pressed", b.element[0].checked)
      }) : this.type === "radio" ? this.buttonElement.bind("click.button", function () {
        if (h.disabled || f) return !1;
        a(this).addClass("ui-state-active"), b.buttonElement.attr("aria-pressed", "true");
        var c = b.element[0];
        k(c).not(c).map(function () {
          return a(this).button("widget")[0]
        }).removeClass("ui-state-active").attr("aria-pressed", "false")
      }) : (this.buttonElement.bind("mousedown.button", function () {
        if (h.disabled) return !1;
        a(this).addClass("ui-state-active"), c = this, a(document).one("mouseup", function () {
          c = null
        })
      }).bind("mouseup.button", function () {
        if (h.disabled) return !1;
        a(this).removeClass("ui-state-active")
      }).bind("keydown.button", function (b) {
        if (h.disabled) return !1;
        (b.keyCode == a.ui.keyCode.SPACE || b.keyCode == a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active")
      }).bind("keyup.button", function () {
        a(this).removeClass("ui-state-active")
      }), this.buttonElement.is("a") && this.buttonElement.keyup(function (b) {
        b.keyCode === a.ui.keyCode.SPACE && a(this).click()
      })), this._setOption("disabled", h.disabled), this._resetButton()
    },
    _determineButtonType: function () {
      this.element.is(":checkbox") ? this.type = "checkbox" : this.element.is(":radio") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button";
      if (this.type === "checkbox" || this.type === "radio") {
        var a = this.element.parents().filter(":last"),
          b = "label[for='" + this.element.attr("id") + "']";
        this.buttonElement = a.find(b), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), this.element.addClass("ui-helper-hidden-accessible");
        var c = this.element.is(":checked");
        c && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", c)
      } else this.buttonElement = this.element
    },
    widget: function () {
      return this.buttonElement
    },
    destroy: function () {
      this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(g + " " + h + " " + i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title"), a.Widget.prototype.destroy.call(this)
    },
    _setOption: function (b, c) {
      a.Widget.prototype._setOption.apply(this, arguments);
      if (b === "disabled") {
        c ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1);
        return
      }
      this._resetButton()
    },
    refresh: function () {
      var b = this.element.is(":disabled");
      b !== this.options.disabled && this._setOption("disabled", b), this.type === "radio" ? k(this.element[0]).each(function () {
        a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
      }) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
    },
    _resetButton: function () {
      if (this.type === "input") {
        this.options.label && this.element.val(this.options.label);
        return
      }
      var b = this.buttonElement.removeClass(i),
        c = a("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),
        d = this.options.icons,
        e = d.primary && d.secondary,
        f = [];
      d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s" : d.primary ? "-primary" : "-secondary")), d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), this.options.text || (f.push(e ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || b.attr("title", c))) : f.push("ui-button-text-only"), b.addClass(f.join(" "))
    }
  }), a.widget("ui.buttonset", {
    options: {
      items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
    },
    _create: function () {
      this.element.addClass("ui-buttonset")
    },
    _init: function () {
      this.refresh()
    },
    _setOption: function (b, c) {
      b === "disabled" && this.buttons.button("option", b, c), a.Widget.prototype._setOption.apply(this, arguments)
    },
    refresh: function () {
      var b = this.element.css("direction") === "rtl";
      this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
        return a(this).button("widget")[0]
      }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left" : "ui-corner-right").end().end()
    },
    destroy: function () {
      this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
        return a(this).button("widget")[0]
      }).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), a.Widget.prototype.destroy.call(this)
    }
  })
}(jQuery),

function (a, b) {
  var c = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
    d = {
      buttons: !0,
      height: !0,
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0,
      width: !0
    }, e = {
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0
    }, f = a.attrFn || {
      val: !0,
      css: !0,
      html: !0,
      text: !0,
      data: !0,
      width: !0,
      height: !0,
      offset: !0,
      click: !0
    };
  a.widget("ui.dialog", {
    options: {
      autoOpen: !0,
      buttons: {},
      closeOnEscape: !0,
      closeText: "close",
      dialogClass: "",
      draggable: !0,
      hide: null,
      height: "auto",
      maxHeight: !1,
      maxWidth: !1,
      minHeight: 150,
      minWidth: 150,
      modal: !1,
      position: {
        my: "center",
        at: "center",
        collision: "fit",
        using: function (b) {
          var c = a(this).css(b).offset().top;
          c < 0 && a(this).css("top", b.top - c)
        }
      },
      resizable: !0,
      show: null,
      stack: !0,
      title: "",
      width: 300,
      zIndex: 1e3
    },
    _create: function () {
      this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
      var b = this,
        d = b.options,
        e = d.title || "&#160;",
        f = a.ui.dialog.getTitleId(b.element),
        g = (b.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass(c + d.dialogClass).css({
          zIndex: d.zIndex
        }).attr("tabIndex", -1).css("outline", 0).keydown(function (c) {
          d.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
        }).attr({
          role: "dialog",
          "aria-labelledby": f
        }).mousedown(function (a) {
          b.moveToTop(!1, a)
        }),
        h = b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),
        i = (b.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),
        j = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
          j.addClass("ui-state-hover")
        }, function () {
          j.removeClass("ui-state-hover")
        }).focus(function () {
          j.addClass("ui-state-focus")
        }).blur(function () {
          j.removeClass("ui-state-focus")
        }).click(function (a) {
          return b.close(a), !1
        }).appendTo(i),
        k = (b.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),
        l = a("<span></span>").addClass("ui-dialog-title").attr("id", f).html(e).prependTo(i);
      a.isFunction(d.beforeclose) && !a.isFunction(d.beforeClose) && (d.beforeClose = d.beforeclose), i.find("*").add(i).disableSelection(), d.draggable && a.fn.draggable && b._makeDraggable(), d.resizable && a.fn.resizable && b._makeResizable(), b._createButtons(d.buttons), b._isOpen = !1, a.fn.bgiframe && g.bgiframe()
    },
    _init: function () {
      this.options.autoOpen && this.open()
    },
    destroy: function () {
      var a = this;
      return a.overlay && a.overlay.destroy(), a.uiDialog.hide(), a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), a.uiDialog.remove(), a.originalTitle && a.element.attr("title", a.originalTitle), a
    },
    widget: function () {
      return this.uiDialog
    },
    close: function (b) {
      var c = this,
        d, e;
      if (!1 === c._trigger("beforeClose", b)) return;
      return c.overlay && c.overlay.destroy(), c.uiDialog.unbind("keypress.ui-dialog"), c._isOpen = !1, c.options.hide ? c.uiDialog.hide(c.options.hide, function () {
        c._trigger("close", b)
      }) : (c.uiDialog.hide(), c._trigger("close", b)), a.ui.dialog.overlay.resize(), c.options.modal && (d = 0, a(".ui-dialog").each(function () {
        this !== c.uiDialog[0] && (e = a(this).css("z-index"), isNaN(e) || (d = Math.max(d, e)))
      }), a.ui.dialog.maxZ = d), c
    },
    isOpen: function () {
      return this._isOpen
    },
    moveToTop: function (b, c) {
      var d = this,
        e = d.options,
        f;
      return e.modal && !b || !e.stack && !e.modal ? d._trigger("focus", c) : (e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), d.overlay && (a.ui.dialog.maxZ += 1, d.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)), f = {
        scrollTop: d.element.scrollTop(),
        scrollLeft: d.element.scrollLeft()
      }, a.ui.dialog.maxZ += 1, d.uiDialog.css("z-index", a.ui.dialog.maxZ), d.element.attr(f), d._trigger("focus", c), d)
    },
    open: function () {
      if (this._isOpen) return;
      var b = this,
        c = b.options,
        d = b.uiDialog;
      return b.overlay = c.modal ? new a.ui.dialog.overlay(b) : null, b._size(), b._position(c.position), d.show(c.show), b.moveToTop(!0), c.modal && d.bind("keydown.ui-dialog", function (b) {
        if (b.keyCode !== a.ui.keyCode.TAB) return;
        var c = a(":tabbable", this),
          d = c.filter(":first"),
          e = c.filter(":last");
        if (b.target === e[0] && !b.shiftKey) return d.focus(1), !1;
        if (b.target === d[0] && b.shiftKey) return e.focus(1), !1
      }), a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(), b._isOpen = !0, b._trigger("open"), b
    },
    _createButtons: function (b) {
      var c = this,
        d = !1,
        e = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
        g = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);
      c.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof b == "object" && b !== null && a.each(b, function () {
        return !(d = !0)
      }), d && (a.each(b, function (b, d) {
        d = a.isFunction(d) ? {
          click: d,
          text: b
        } : d;
        var e = a('<button type="button"></button>').click(function () {
          d.click.apply(c.element[0], arguments)
        }).appendTo(g);
        a.each(d, function (a, b) {
          if (a === "click") return;
          a in f ? e[a](b) : e.attr(a, b)
        }), a.fn.button && e.button()
      }), e.appendTo(c.uiDialog))
    },
    _makeDraggable: function () {
      function b(a) {
        return {
          position: a.position,
          offset: a.offset
        }
      }
      var c = this,
        d = c.options,
        e = a(document),
        f;
      c.uiDialog.draggable({
        cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
        handle: ".ui-dialog-titlebar",
        containment: "document",
        start: function (e, g) {
          f = d.height === "auto" ? "auto" : a(this).height(), a(this).height(a(this).height()).addClass("ui-dialog-dragging"), c._trigger("dragStart", e, b(g))
        },
        drag: function (a, d) {
          c._trigger("drag", a, b(d))
        },
        stop: function (g, h) {
          d.position = [h.position.left - e.scrollLeft(), h.position.top - e.scrollTop()], a(this).removeClass("ui-dialog-dragging").height(f), c._trigger("dragStop", g, b(h)), a.ui.dialog.overlay.resize()
        }
      })
    },
    _makeResizable: function (c) {
      function d(a) {
        return {
          originalPosition: a.originalPosition,
          originalSize: a.originalSize,
          position: a.position,
          size: a.size
        }
      }
      c = c === b ? this.options.resizable : c;
      var e = this,
        f = e.options,
        g = e.uiDialog.css("position"),
        h = typeof c == "string" ? c : "n,e,s,w,se,sw,ne,nw";
      e.uiDialog.resizable({
        cancel: ".ui-dialog-content",
        containment: "document",
        alsoResize: e.element,
        maxWidth: f.maxWidth,
        maxHeight: f.maxHeight,
        minWidth: f.minWidth,
        minHeight: e._minHeight(),
        handles: h,
        start: function (b, c) {
          a(this).addClass("ui-dialog-resizing"), e._trigger("resizeStart", b, d(c))
        },
        resize: function (a, b) {
          e._trigger("resize", a, d(b))
        },
        stop: function (b, c) {
          a(this).removeClass("ui-dialog-resizing"), f.height = a(this).height(), f.width = a(this).width(), e._trigger("resizeStop", b, d(c)), a.ui.dialog.overlay.resize()
        }
      }).css("position", g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
    },
    _minHeight: function () {
      var a = this.options;
      return a.height === "auto" ? a.minHeight : Math.min(a.minHeight, a.height)
    },
    _position: function (b) {
      var c = [],
        d = [0, 0],
        e;
      if (b) {
        if (typeof b == "string" || typeof b == "object" && "0" in b) c = b.split ? b.split(" ") : [b[0], b[1]], c.length === 1 && (c[1] = c[0]), a.each(["left", "top"], function (a, b) {
          +c[a] === c[a] && (d[a] = c[a], c[a] = b)
        }), b = {
          my: c.join(" "),
          at: c.join(" "),
          offset: d.join(" ")
        };
        b = a.extend({}, a.ui.dialog.prototype.options.position, b)
      } else b = a.ui.dialog.prototype.options.position;
      e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.css({
        top: 0,
        left: 0
      }).position(a.extend({
        of: window
      }, b)), e || this.uiDialog.hide()
    },
    _setOptions: function (b) {
      var c = this,
        f = {}, g = !1;
      a.each(b, function (a, b) {
        c._setOption(a, b), a in d && (g = !0), a in e && (f[a] = b)
      }), g && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", f)
    },
    _setOption: function (b, d) {
      var e = this,
        f = e.uiDialog;
      switch (b) {
      case "beforeclose":
        b = "beforeClose";
        break;
      case "buttons":
        e._createButtons(d);
        break;
      case "closeText":
        e.uiDialogTitlebarCloseText.text("" + d);
        break;
      case "dialogClass":
        f.removeClass(e.options.dialogClass).addClass(c + d);
        break;
      case "disabled":
        d ? f.addClass("ui-dialog-disabled") : f.removeClass("ui-dialog-disabled");
        break;
      case "draggable":
        var g = f.is(":data(draggable)");
        g && !d && f.draggable("destroy"), !g && d && e._makeDraggable();
        break;
      case "position":
        e._position(d);
        break;
      case "resizable":
        var h = f.is(":data(resizable)");
        h && !d && f.resizable("destroy"), h && typeof d == "string" && f.resizable("option", "handles", d), !h && d !== !1 && e._makeResizable(d);
        break;
      case "title":
        a(".ui-dialog-title", e.uiDialogTitlebar).html("" + (d || "&#160;"))
      }
      a.Widget.prototype._setOption.apply(e, arguments)
    },
    _size: function () {
      var b = this.options,
        c, d, e = this.uiDialog.is(":visible");
      this.element.show().css({
        width: "auto",
        minHeight: 0,
        height: 0
      }), b.minWidth > b.width && (b.width = b.minWidth), c = this.uiDialog.css({
        height: "auto",
        width: b.width
      }).height(), d = Math.max(0, b.minHeight - c);
      if (b.height === "auto")
        if (a.support.minHeight) this.element.css({
          minHeight: d,
          height: "auto"
        });
        else {
          this.uiDialog.show();
          var f = this.element.css("height", "auto").height();
          e || this.uiDialog.hide(), this.element.height(Math.max(f, d))
        } else this.element.height(Math.max(b.height - c, 0));
      this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
    }
  }), a.extend(a.ui.dialog, {
    version: "1.8.21",
    uuid: 0,
    maxZ: 0,
    getTitleId: function (a) {
      var b = a.attr("id");
      return b || (this.uuid += 1, b = this.uuid), "ui-dialog-title-" + b
    },
    overlay: function (b) {
      this.$el = a.ui.dialog.overlay.create(b)
    }
  }), a.extend(a.ui.dialog.overlay, {
    instances: [],
    oldInstances: [],
    maxZ: 0,
    events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (a) {
      return a + ".dialog-overlay"
    }).join(" "),
    create: function (b) {
      this.instances.length === 0 && (setTimeout(function () {
        a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function (b) {
          if (a(b.target).zIndex() < a.ui.dialog.overlay.maxZ) return !1
        })
      }, 1), a(document).bind("keydown.dialog-overlay", function (c) {
        b.options.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
      }), a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize));
      var c = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
        width: this.width(),
        height: this.height()
      });
      return a.fn.bgiframe && c.bgiframe(), this.instances.push(c), c
    },
    destroy: function (b) {
      var c = a.inArray(b, this.instances);
      c != -1 && this.oldInstances.push(this.instances.splice(c, 1)[0]), this.instances.length === 0 && a([document, window]).unbind(".dialog-overlay"), b.remove();
      var d = 0;
      a.each(this.instances, function () {
        d = Math.max(d, this.css("z-index"))
      }), this.maxZ = d
    },
    height: function () {
      var b, c;
      return a.browser.msie && a.browser.version < 7 ? (b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), b < c ? a(window).height() + "px" : b + "px") : a(document).height() + "px"
    },
    width: function () {
      var b, c;
      return a.browser.msie ? (b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), b < c ? a(window).width() + "px" : b + "px") : a(document).width() + "px"
    },
    resize: function () {
      var b = a([]);
      a.each(a.ui.dialog.overlay.instances, function () {
        b = b.add(this)
      }), b.css({
        width: 0,
        height: 0
      }).css({
        width: a.ui.dialog.overlay.width(),
        height: a.ui.dialog.overlay.height()
      })
    }
  }), a.extend(a.ui.dialog.overlay.prototype, {
    destroy: function () {
      a.ui.dialog.overlay.destroy(this.$el)
    }
  })
}(jQuery),

function (a, b) {
  var c = 5;
  a.widget("ui.slider", a.ui.mouse, {
    widgetEventPrefix: "slide",
    options: {
      animate: !1,
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: !1,
      step: 1,
      value: 0,
      values: null
    },
    _create: function () {
      var b = this,
        d = this.options,
        e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
        f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
        g = d.values && d.values.length || 1,
        h = [];
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (d.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = a([]), d.range && (d.range === !0 && (d.values || (d.values = [this._valueMin(), this._valueMin()]), d.values.length && d.values.length !== 2 && (d.values = [d.values[0], d.values[0]])), this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (d.range === "min" || d.range === "max" ? " ui-slider-range-" + d.range : "")));
      for (var i = e.length; i < g; i += 1) h.push(f);
      this.handles = e.add(a(h.join("")).appendTo(b.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function (a) {
        a.preventDefault()
      }).hover(function () {
        d.disabled || a(this).addClass("ui-state-hover")
      }, function () {
        a(this).removeClass("ui-state-hover")
      }).focus(function () {
        d.disabled ? a(this).blur() : (a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), a(this).addClass("ui-state-focus"))
      }).blur(function () {
        a(this).removeClass("ui-state-focus")
      }), this.handles.each(function (b) {
        a(this).data("index.ui-slider-handle", b)
      }), this.handles.keydown(function (d) {
        var e = a(this).data("index.ui-slider-handle"),
          f, g, h, i;
        if (b.options.disabled) return;
        switch (d.keyCode) {
        case a.ui.keyCode.HOME:
        case a.ui.keyCode.END:
        case a.ui.keyCode.PAGE_UP:
        case a.ui.keyCode.PAGE_DOWN:
        case a.ui.keyCode.UP:
        case a.ui.keyCode.RIGHT:
        case a.ui.keyCode.DOWN:
        case a.ui.keyCode.LEFT:
          d.preventDefault();
          if (!b._keySliding) {
            b._keySliding = !0, a(this).addClass("ui-state-active"), f = b._start(d, e);
            if (f === !1) return
          }
        }
        i = b.options.step, b.options.values && b.options.values.length ? g = h = b.values(e) : g = h = b.value();
        switch (d.keyCode) {
        case a.ui.keyCode.HOME:
          h = b._valueMin();
          break;
        case a.ui.keyCode.END:
          h = b._valueMax();
          break;
        case a.ui.keyCode.PAGE_UP:
          h = b._trimAlignValue(g + (b._valueMax() - b._valueMin()) / c);
          break;
        case a.ui.keyCode.PAGE_DOWN:
          h = b._trimAlignValue(g - (b._valueMax() - b._valueMin()) / c);
          break;
        case a.ui.keyCode.UP:
        case a.ui.keyCode.RIGHT:
          if (g === b._valueMax()) return;
          h = b._trimAlignValue(g + i);
          break;
        case a.ui.keyCode.DOWN:
        case a.ui.keyCode.LEFT:
          if (g === b._valueMin()) return;
          h = b._trimAlignValue(g - i)
        }
        b._slide(d, e, h)
      }).keyup(function (c) {
        var d = a(this).data("index.ui-slider-handle");
        b._keySliding && (b._keySliding = !1, b._stop(c, d), b._change(c, d), a(this).removeClass("ui-state-active"))
      }), this._refreshValue(), this._animateOff = !1
    },
    destroy: function () {
      return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
    },
    _mouseCapture: function (b) {
      var c = this.options,
        d, e, f, g, h, i, j, k, l;
      return c.disabled ? !1 : (this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      }, this.elementOffset = this.element.offset(), d = {
        x: b.pageX,
        y: b.pageY
      }, e = this._normValueFromMouse(d), f = this._valueMax() - this._valueMin() + 1, h = this, this.handles.each(function (b) {
        var c = Math.abs(e - h.values(b));
        f > c && (f = c, g = a(this), i = b)
      }), c.range === !0 && this.values(1) === c.min && (i += 1, g = a(this.handles[i])), j = this._start(b, i), j === !1 ? !1 : (this._mouseSliding = !0, h._handleIndex = i, g.addClass("ui-state-active").focus(), k = g.offset(), l = !a(b.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = l ? {
        left: 0,
        top: 0
      } : {
        left: b.pageX - k.left - g.width() / 2,
        top: b.pageY - k.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
      }, this.handles.hasClass("ui-state-hover") || this._slide(b, i, e), this._animateOff = !0, !0))
    },
    _mouseStart: function (a) {
      return !0
    },
    _mouseDrag: function (a) {
      var b = {
        x: a.pageX,
        y: a.pageY
      }, c = this._normValueFromMouse(b);
      return this._slide(a, this._handleIndex, c), !1
    },
    _mouseStop: function (a) {
      return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
    },
    _detectOrientation: function () {
      this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
    },
    _normValueFromMouse: function (a) {
      var b, c, d, e, f;
      return this.orientation === "horizontal" ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), d < 0 && (d = 0), this.orientation === "vertical" && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)
    },
    _start: function (a, b) {
      var c = {
        handle: this.handles[b],
        value: this.value()
      };
      return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c)
    },
    _slide: function (a, b, c) {
      var d, e, f;
      this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (b === 0 && c > d || b === 1 && c < d) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
        handle: this.handles[b],
        value: c,
        values: e
      }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {
        handle: this.handles[b],
        value: c
      }), f !== !1 && this.value(c))
    },
    _stop: function (a, b) {
      var c = {
        handle: this.handles[b],
        value: this.value()
      };
      this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
    },
    _change: function (a, b) {
      if (!this._keySliding && !this._mouseSliding) {
        var c = {
          handle: this.handles[b],
          value: this.value()
        };
        this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("change", a, c)
      }
    },
    value: function (a) {
      if (arguments.length) {
        this.options.value = this._trimAlignValue(a), this._refreshValue(), this._change(null, 0);
        return
      }
      return this._value()
    },
    values: function (b, c) {
      var d, e, f;
      if (arguments.length > 1) {
        this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b);
        return
      }
      if (!arguments.length) return this._values();
      if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
      d = this.options.values, e = arguments[0];
      for (f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null, f);
      this._refreshValue()
    },
    _setOption: function (b, c) {
      var d, e = 0;
      a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments);
      switch (b) {
      case "disabled":
        c ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
        break;
      case "orientation":
        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
        break;
      case "value":
        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
        break;
      case "values":
        this._animateOff = !0, this._refreshValue();
        for (d = 0; d < e; d += 1) this._change(null, d);
        this._animateOff = !1
      }
    },
    _value: function () {
      var a = this.options.value;
      return a = this._trimAlignValue(a), a
    },
    _values: function (a) {
      var b, c, d;
      if (arguments
        .length) return b = this.options.values[a], b = this._trimAlignValue(b), b;
      c = this.options.values.slice();
      for (d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]);
      return c
    },
    _trimAlignValue: function (a) {
      if (a <= this._valueMin()) return this._valueMin();
      if (a >= this._valueMax()) return this._valueMax();
      var b = this.options.step > 0 ? this.options.step : 1,
        c = (a - this._valueMin()) % b,
        d = a - c;
      return Math.abs(c) * 2 >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))
    },
    _valueMin: function () {
      return this.options.min
    },
    _valueMax: function () {
      return this.options.max
    },
    _refreshValue: function () {
      var b = this.options.range,
        c = this.options,
        d = this,
        e = this._animateOff ? !1 : c.animate,
        f, g = {}, h, i, j, k;
      this.options.values && this.options.values.length ? this.handles.each(function (b, i) {
        f = (d.values(b) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", a(this).stop(1, 1)[e ? "animate" : "css"](g, c.animate), d.options.range === !0 && (d.orientation === "horizontal" ? (b === 0 && d.range.stop(1, 1)[e ? "animate" : "css"]({
          left: f + "%"
        }, c.animate), b === 1 && d.range[e ? "animate" : "css"]({
          width: f - h + "%"
        }, {
          queue: !1,
          duration: c.animate
        })) : (b === 0 && d.range.stop(1, 1)[e ? "animate" : "css"]({
          bottom: f + "%"
        }, c.animate), b === 1 && d.range[e ? "animate" : "css"]({
          height: f - h + "%"
        }, {
          queue: !1,
          duration: c.animate
        }))), h = f
      }) : (i = this.value(), j = this._valueMin(), k = this._valueMax(), f = k !== j ? (i - j) / (k - j) * 100 : 0, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", this.handle.stop(1, 1)[e ? "animate" : "css"](g, c.animate), b === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[e ? "animate" : "css"]({
        width: f + "%"
      }, c.animate), b === "max" && this.orientation === "horizontal" && this.range[e ? "animate" : "css"]({
        width: 100 - f + "%"
      }, {
        queue: !1,
        duration: c.animate
      }), b === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[e ? "animate" : "css"]({
        height: f + "%"
      }, c.animate), b === "max" && this.orientation === "vertical" && this.range[e ? "animate" : "css"]({
        height: 100 - f + "%"
      }, {
        queue: !1,
        duration: c.animate
      }))
    }
  }), a.extend(a.ui.slider, {
    version: "1.8.21"
  })
}(jQuery),

function (a, b) {
  function c() {
    return ++e
  }

  function d() {
    return ++f
  }
  var e = 0,
    f = 0;
  a.widget("ui.tabs", {
    options: {
      add: null,
      ajaxOptions: null,
      cache: !1,
      cookie: null,
      collapsible: !1,
      disable: null,
      disabled: [],
      enable: null,
      event: "click",
      fx: null,
      idPrefix: "ui-tabs-",
      load: null,
      panelTemplate: "<div></div>",
      remove: null,
      select: null,
      show: null,
      spinner: "<em>Loading&#8230;</em>",
      tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
    },
    _create: function () {
      this._tabify(!0)
    },
    _setOption: function (a, b) {
      if (a == "selected") {
        if (this.options.collapsible && b == this.options.selected) return;
        this.select(b)
      } else this.options[a] = b, this._tabify()
    },
    _tabId: function (a) {
      return a.title && a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + c()
    },
    _sanitizeSelector: function (a) {
      return a.replace(/:/g, "\\:")
    },
    _cookie: function () {
      var b = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + d());
      return a.cookie.apply(null, [b].concat(a.makeArray(arguments)))
    },
    _ui: function (a, b) {
      return {
        tab: a,
        panel: b,
        index: this.anchors.index(a)
      }
    },
    _cleanup: function () {
      this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
        var b = a(this);
        b.html(b.data("label.tabs")).removeData("label.tabs")
      })
    },
    _tabify: function (c) {
      function d(b, c) {
        b.css("display", ""), !a.support.opacity && c.opacity && b[0].style.removeAttribute("filter")
      }
      var e = this,
        f = this.options,
        g = /^#.+/;
      this.list = this.element.find("ol,ul").eq(0), this.lis = a(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function () {
        return a("a", this)[0]
      }), this.panels = a([]), this.anchors.each(function (b, c) {
        var d = a(c).attr("href"),
          h = d.split("#")[0],
          i;
        h && (h === location.toString().split("#")[0] || (i = a("base")[0]) && h === i.href) && (d = c.hash, c.href = d);
        if (g.test(d)) e.panels = e.panels.add(e.element.find(e._sanitizeSelector(d)));
        else if (d && d !== "#") {
          a.data(c, "href.tabs", d), a.data(c, "load.tabs", d.replace(/#.*$/, ""));
          var j = e._tabId(c);
          c.href = "#" + j;
          var k = e.element.find("#" + j);
          k.length || (k = a(f.panelTemplate).attr("id", j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(e.panels[b - 1] || e.list), k.data("destroy.tabs", !0)), e.panels = e.panels.add(k)
        } else f.disabled.push(b)
      }), c ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), f.selected === b ? (location.hash && this.anchors.each(function (a, b) {
        if (b.hash == location.hash) return f.selected = a, !1
      }), typeof f.selected != "number" && f.cookie && (f.selected = parseInt(e._cookie(), 10)), typeof f.selected != "number" && this.lis.filter(".ui-tabs-selected").length && (f.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), f.selected = f.selected || (this.lis.length ? 0 : -1)) : f.selected === null && (f.selected = -1), f.selected = f.selected >= 0 && this.anchors[f.selected] || f.selected < 0 ? f.selected : 0, f.disabled = a.unique(f.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"), function (a, b) {
        return e.lis.index(a)
      }))).sort(), a.inArray(f.selected, f.disabled) != -1 && f.disabled.splice(a.inArray(f.selected, f.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), f.selected >= 0 && this.anchors.length && (e.element.find(e._sanitizeSelector(e.anchors[f.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(f.selected).addClass("ui-tabs-selected ui-state-active"), e.element.queue("tabs", function () {
        e._trigger("show", null, e._ui(e.anchors[f.selected], e.element.find(e._sanitizeSelector(e.anchors[f.selected].hash))[0]))
      }), this.load(f.selected)), a(window).bind("unload", function () {
        e.lis.add(e.anchors).unbind(".tabs"), e.lis = e.anchors = e.panels = null
      })) : f.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[f.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), f.cookie && this._cookie(f.selected, f.cookie);
      for (var h = 0, i; i = this.lis[h]; h++) a(i)[a.inArray(h, f.disabled) != -1 && !a(i).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
      f.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs");
      if (f.event !== "mouseover") {
        var j = function (a, b) {
          b.is(":not(.ui-state-disabled)") && b.addClass("ui-state-" + a)
        }, k = function (a, b) {
            b.removeClass("ui-state-" + a)
          };
        this.lis.bind("mouseover.tabs", function () {
          j("hover", a(this))
        }), this.lis.bind("mouseout.tabs", function () {
          k("hover", a(this))
        }), this.anchors.bind("focus.tabs", function () {
          j("focus", a(this).closest("li"))
        }), this.anchors.bind("blur.tabs", function () {
          k("focus", a(this).closest("li"))
        })
      }
      var l, m;
      f.fx && (a.isArray(f.fx) ? (l = f.fx[0], m = f.fx[1]) : l = m = f.fx);
      var n = m ? function (b, c) {
          a(b).closest("li").addClass("ui-tabs-selected ui-state-active"), c.hide().removeClass("ui-tabs-hide").animate(m, m.duration || "normal", function () {
            d(c, m), e._trigger("show", null, e._ui(b, c[0]))
          })
        } : function (b, c) {
          a(b).closest("li").addClass("ui-tabs-selected ui-state-active"), c.removeClass("ui-tabs-hide"), e._trigger("show", null, e._ui(b, c[0]))
        }, o = l ? function (a, b) {
          b.animate(l, l.duration || "normal", function () {
            e.lis.removeClass("ui-tabs-selected ui-state-active"), b.addClass("ui-tabs-hide"), d(b, l), e.element.dequeue("tabs")
          })
        } : function (a, b, c) {
          e.lis.removeClass("ui-tabs-selected ui-state-active"), b.addClass("ui-tabs-hide"), e.element.dequeue("tabs")
        };
      this.anchors.bind(f.event + ".tabs", function () {
        var b = this,
          c = a(b).closest("li"),
          d = e.panels.filter(":not(.ui-tabs-hide)"),
          g = e.element.find(e._sanitizeSelector(b.hash));
        if (c.hasClass("ui-tabs-selected") && !f.collapsible || c.hasClass("ui-state-disabled") || c.hasClass("ui-state-processing") || e.panels.filter(":animated").length || e._trigger("select", null, e._ui(this, g[0])) === !1) return this.blur(), !1;
        f.selected = e.anchors.index(this), e.abort();
        if (f.collapsible) {
          if (c.hasClass("ui-tabs-selected")) return f.selected = -1, f.cookie && e._cookie(f.selected, f.cookie), e.element.queue("tabs", function () {
            o(b, d)
          }).dequeue("tabs"), this.blur(), !1;
          if (!d.length) return f.cookie && e._cookie(f.selected, f.cookie), e.element.queue("tabs", function () {
            n(b, g)
          }), e.load(e.anchors.index(this)), this.blur(), !1
        }
        f.cookie && e._cookie(f.selected, f.cookie);
        if (g.length) d.length && e.element.queue("tabs", function () {
          o(b, d)
        }), e.element.queue("tabs", function () {
          n(b, g)
        }), e.load(e.anchors.index(this));
        else throw "jQuery UI Tabs: Mismatching fragment identifier.";
        a.browser.msie && this.blur()
      }), this.anchors.bind("click.tabs", function () {
        return !1
      })
    },
    _getIndex: function (a) {
      return typeof a == "string" && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), a
    },
    destroy: function () {
      var b = this.options;
      return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function () {
        var b = a.data(this, "href.tabs");
        b && (this.href = b);
        var c = a(this).unbind(".tabs");
        a.each(["href", "load", "cache"], function (a, b) {
          c.removeData(b + ".tabs")
        })
      }), this.lis.unbind(".tabs").add(this.panels).each(function () {
        a.data(this, "destroy.tabs") ? a(this).remove() : a(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
      }), b.cookie && this._cookie(null, b.cookie), this
    },
    add: function (c, d, e) {
      e === b && (e = this.anchors.length);
      var f = this,
        g = this.options,
        h = a(g.tabTemplate.replace(/#\{href\}/g, c).replace(/#\{label\}/g, d)),
        i = c.indexOf("#") ? this._tabId(a("a", h)[0]) : c.replace("#", "");
      h.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
      var j = f.element.find("#" + i);
      return j.length || (j = a(g.panelTemplate).attr("id", i).data("destroy.tabs", !0)), j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), e >= this.lis.length ? (h.appendTo(this.list), j.appendTo(this.list[0].parentNode)) : (h.insertBefore(this.lis[e]), j.insertBefore(this.panels[e])), g.disabled = a.map(g.disabled, function (a, b) {
        return a >= e ? ++a : a
      }), this._tabify(), this.anchors.length == 1 && (g.selected = 0, h.addClass("ui-tabs-selected ui-state-active"), j.removeClass("ui-tabs-hide"), this.element.queue("tabs", function () {
        f._trigger("show", null, f._ui(f.anchors[0], f.panels[0]))
      }), this.load(0)), this._trigger("add", null, this._ui(this.anchors[e], this.panels[e])), this
    },
    remove: function (b) {
      b = this._getIndex(b);
      var c = this.options,
        d = this.lis.eq(b).remove(),
        e = this.panels.eq(b).remove();
      return d.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(b + (b + 1 < this.anchors.length ? 1 : -1)), c.disabled = a.map(a.grep(c.disabled, function (a, c) {
        return a != b
      }), function (a, c) {
        return a >= b ? --a : a
      }), this._tabify(), this._trigger("remove", null, this._ui(d.find("a")[0], e[0])), this
    },
    enable: function (b) {
      b = this._getIndex(b);
      var c = this.options;
      if (a.inArray(b, c.disabled) == -1) return;
      return this.lis.eq(b).removeClass("ui-state-disabled"), c.disabled = a.grep(c.disabled, function (a, c) {
        return a != b
      }), this._trigger("enable", null, this._ui(this.anchors[b], this.panels[b])), this
    },
    disable: function (a) {
      a = this._getIndex(a);
      var b = this,
        c = this.options;
      return a != c.selected && (this.lis.eq(a).addClass("ui-state-disabled"), c.disabled.push(a), c.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[a], this.panels[a]))), this
    },
    select: function (a) {
      a = this._getIndex(a);
      if (a == -1)
        if (this.options.collapsible && this.options.selected != -1) a = this.options.selected;
        else return this;
      return this.anchors.eq(a).trigger(this.options.event + ".tabs"), this
    },
    load: function (b) {
      b = this._getIndex(b);
      var c = this,
        d = this.options,
        e = this.anchors.eq(b)[0],
        f = a.data(e, "load.tabs");
      this.abort();
      if (!f || this.element.queue("tabs").length !== 0 && a.data(e, "cache.tabs")) {
        this.element.dequeue("tabs");
        return
      }
      this.lis.eq(b).addClass("ui-state-processing");
      if (d.spinner) {
        var g = a("span", e);
        g.data("label.tabs", g.html()).html(d.spinner)
      }
      return this.xhr = a.ajax(a.extend({}, d.ajaxOptions, {
        url: f,
        success: function (f, g) {
          c.element.find(c._sanitizeSelector(e.hash)).html(f), c._cleanup(), d.cache && a.data(e, "cache.tabs", !0), c._trigger("load", null, c._ui(c.anchors[b], c.panels[b]));
          try {
            d.ajaxOptions.success(f, g)
          } catch (h) {}
        },
        error: function (a, f, g) {
          c._cleanup(), c._trigger("load", null, c._ui(c.anchors[b], c.panels[b]));
          try {
            d.ajaxOptions.error(a, f, b, e)
          } catch (g) {}
        }
      })), c.element.dequeue("tabs"), this
    },
    abort: function () {
      return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this
    },
    url: function (a, b) {
      return this.anchors.eq(a).removeData("cache.tabs").data("load.tabs", b), this
    },
    length: function () {
      return this.anchors.length
    }
  }), a.extend(a.ui.tabs, {
    version: "1.8.21"
  }), a.extend(a.ui.tabs.prototype, {
    rotation: null,
    rotate: function (a, b) {
      var c = this,
        d = this.options,
        e = c._rotate || (c._rotate = function (b) {
          clearTimeout(c.rotation), c.rotation = setTimeout(function () {
            var a = d.selected;
            c.select(++a < c.anchors.length ? a : 0)
          }, a), b && b.stopPropagation()
        }),
        f = c._unrotate || (c._unrotate = b ? function (a) {
          e()
        } : function (a) {
          a.clientX && c.rotate(null)
        });
      return a ? (this.element.bind("tabsshow", e), this.anchors.bind(d.event + ".tabs", f), e()) : (clearTimeout(c.rotation), this.element.unbind("tabsshow", e), this.anchors.unbind(d.event + ".tabs", f), delete this._rotate, delete this._unrotate), this
    }
  })
}(jQuery),

function ($, undefined) {
  function Datepicker() {
    this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "mm/dd/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
    }, this._defaults = {
      showOn: "focus",
      showAnim: "fadeIn",
      showOptions: {},
      defaultDate: null,
      appendText: "",
      buttonText: "...",
      buttonImage: "",
      buttonImageOnly: !1,
      hideIfNoPrevNext: !1,
      navigationAsDateFormat: !1,
      gotoCurrent: !1,
      changeMonth: !1,
      changeYear: !1,
      yearRange: "c-10:c+10",
      showOtherMonths: !1,
      selectOtherMonths: !1,
      showWeek: !1,
      calculateWeek: this.iso8601Week,
      shortYearCutoff: "+10",
      minDate: null,
      maxDate: null,
      duration: "fast",
      beforeShowDay: null,
      beforeShow: null,
      onSelect: null,
      onChangeMonthYear: null,
      onClose: null,
      numberOfMonths: 1,
      showCurrentAtPos: 0,
      stepMonths: 1,
      stepBigMonths: 12,
      altField: "",
      altFormat: "",
      constrainInput: !0,
      showButtonPanel: !1,
      autoSize: !1,
      disabled: !1
    }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
  }

  function bindHover(a) {
    var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return a.bind("mouseout", function (a) {
      var c = $(a.target).closest(b);
      if (!c.length) return;
      c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
    }).bind("mouseover", function (c) {
      var d = $(c.target).closest(b);
      if ($.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) || !d.length) return;
      d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), d.addClass("ui-state-hover"), d.hasClass("ui-datepicker-prev") && d.addClass("ui-datepicker-prev-hover"), d.hasClass("ui-datepicker-next") && d.addClass("ui-datepicker-next-hover")
    })
  }

  function extendRemove(a, b) {
    $.extend(a, b);
    for (var c in b)
      if (b[c] == null || b[c] == undefined) a[c] = b[c];
    return a
  }

  function isArray(a) {
    return a && ($.browser.safari && typeof a == "object" && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/))
  }
  $.extend($.ui, {
    datepicker: {
      version: "1.8.21"
    }
  });
  var PROP_NAME = "datepicker",
    dpuuid = (new Date).getTime(),
    instActive;
  $.extend(Datepicker.prototype, {
    markerClassName: "hasDatepicker",
    maxRows: 4,
    log: function () {
      this.debug && console.log.apply("", arguments)
    },
    _widgetDatepicker: function () {
      return this.dpDiv
    },
    setDefaults: function (a) {
      return extendRemove(this._defaults, a || {}), this
    },
    _attachDatepicker: function (target, settings) {
      var inlineSettings = null;
      for (var attrName in this._defaults) {
        var attrValue = target.getAttribute("date:" + attrName);
        if (attrValue) {
          inlineSettings = inlineSettings || {};
          try {
            inlineSettings[attrName] = eval(attrValue)
          } catch (err) {
            inlineSettings[attrName] = attrValue
          }
        }
      }
      var nodeName = target.nodeName.toLowerCase(),
        inline = nodeName == "div" || nodeName == "span";
      target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
      var inst = this._newInst($(target), inline);
      inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
    },
    _newInst: function (a, b) {
      var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
      return {
        id: c,
        input: a,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: b,
        dpDiv: b ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
      }
    },
    _connectDatepicker: function (a, b) {
      var c = $(a);
      b.append = $([]), b.trigger = $([]);
      if (c.hasClass(this.markerClassName)) return;
      this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (a, c, d) {
        b.settings[c] = d
      }).bind("getData.datepicker", function (a, c) {
        return this._get(b, c)
      }), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a)
    },
    _attachments: function (a, b) {
      var c = this._get(b, "appendText"),
        d = this._get(b, "isRTL");
      b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + "</span>"), a[d ? "before" : "after"](b.append)), a.unbind("focus", this._showDatepicker), b.trigger && b.trigger.remove();
      var e = this._get(b, "showOn");
      (e == "focus" || e == "both") && a.focus(this._showDatepicker);
      if (e == "button" || e == "both") {
        var f = this._get(b, "buttonText"),
          g = this._get(b, "buttonImage");
        b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
          src: g,
          alt: f,
          title: f
        }) : $('<button type="button"></button>').addClass(this._triggerClass).html(g == "" ? f : $("<img/>").attr({
          src: g,
          alt: f,
          title: f
        }))), a[d ? "before" : "after"](b.trigger), b.trigger.click(function () {
          return $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != a[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(a[0])) : $.datepicker._showDatepicker(a[0]), !1
        })
      }
    },
    _autoSize: function (a) {
      if (this._get(a, "autoSize") && !a.inline) {
        var b = new Date(2009, 11, 20),
          c = this._get(a, "dateFormat");
        if (c.match(/[DM]/)) {
          var d = function (a) {
            var b = 0,
              c = 0;
            for (var d = 0; d < a.length; d++) a[d].length > b && (b = a[d].length, c = d);
            return c
          };
          b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort"))), b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay())
        }
        a.input.attr("size", this._formatDate(a, b).length)
      }
    },
    _inlineDatepicker: function (a, b) {
      var c = $(a);
      if (c.hasClass(this.markerClassName)) return;
      c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker", function (a, c, d) {
        b.settings[c] = d
      }).bind("getData.datepicker", function (a, c) {
        return this._get(b, c)
      }), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css("display", "block")
    },
    _dialogDatepicker: function (a, b, c, d, e) {
      var f = this._dialogInst;
      if (!f) {
        this.uuid += 1;
        var g = "dp" + this.uuid;
        this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f)
      }
      extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null;
      if (!this._pos) {
        var h = document.documentElement.clientWidth,
          i = document.documentElement.clientHeight,
          j = document.documentElement.scrollLeft || document.body.scrollLeft,
          k = document.documentElement.scrollTop || document.body.scrollTop;
        this._pos = [h / 2 - 100 + j, i / 2 - 150 + k]
      }
      return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f), this
    },
    _destroyDatepicker: function (a) {
      var b = $(a),
        c = $.data(a, PROP_NAME);
      if (!b.hasClass(this.markerClassName)) return;
      var d = a.nodeName.toLowerCase();
      $.removeData(a, PROP_NAME), d == "input" ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (d == "div" || d == "span") && b.removeClass(this.markerClassName).empty()
    },
    _enableDatepicker: function (a) {
      var b = $(a),
        c = $.data(a, PROP_NAME);
      if (!b.hasClass(this.markerClassName)) return;
      var d = a.nodeName.toLowerCase();
      if (d == "input") a.disabled = !1, c.trigger.filter("button").each(function () {
        this.disabled = !1
      }).end().filter("img").css({
        opacity: "1.0",
        cursor: ""
      });
      else if (d == "div" || d == "span") {
        var e = b.children("." + this._inlineClass);
        e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
      }
      this._disabledInputs = $.map(this._disabledInputs, function (b) {
        return b == a ? null : b
      })
    },
    _disableDatepicker: function (a) {
      var b = $(a),
        c = $.data(a, PROP_NAME);
      if (!b.hasClass(this.markerClassName)) return;
      var d = a.nodeName.toLowerCase();
      if (d == "input") a.disabled = !0, c.trigger.filter("button").each(function () {
        this.disabled = !0
      }).end().filter("img").css({
        opacity: "0.5",
        cursor: "default"
      });
      else if (d == "div" || d == "span") {
        var e = b.children("." + this._inlineClass);
        e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
      }
      this._disabledInputs = $.map(this._disabledInputs, function (b) {
        return b == a ? null : b
      }), this._disabledInputs[this._disabledInputs.length] = a
    },
    _isDisabledDatepicker: function (a) {
      if (!a) return !1;
      for (var b = 0; b < this._disabledInputs.length; b++)
        if (this._disabledInputs[b] == a) return !0;
      return !1
    },
    _getInst: function (a) {
      try {
        return $.data(a, PROP_NAME)
      } catch (b) {
        throw "Missing instance data for this datepicker"
      }
    },
    _optionDatepicker: function (a, b, c) {
      var d = this._getInst(a);
      if (arguments.length == 2 && typeof b == "string") return b == "defaults" ? $.extend({}, $.datepicker._defaults) : d ? b == "all" ? $.extend({}, d.settings) : this._get(d, b) : null;
      var e = b || {};
      typeof b == "string" && (e = {}, e[b] = c);
      if (d) {
        this._curInst == d && this._hideDatepicker();
        var f = this._getDateDatepicker(a, !0),
          g = this._getMinMaxDate(d, "min"),
          h = this._getMinMaxDate(d, "max");
        extendRemove(d.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d)
      }
    },
    _changeDatepicker: function (a, b, c) {
      this._optionDatepicker(a, b, c)
    },
    _refreshDatepicker: function (a) {
      var b = this._getInst(a);
      b && this._updateDatepicker(b)
    },
    _setDateDatepicker: function (a, b) {
      var c = this._getInst(a);
      c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
    },
    _getDateDatepicker: function (a, b) {
      var c = this._getInst(a);
      return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
    },
    _doKeyDown: function (a) {
      var b = $.datepicker._getInst(a.target),
        c = !0,
        d = b.dpDiv.is(".ui-datepicker-rtl");
      b._keyEvent = !0;
      if ($.datepicker._datepickerShowing) switch (a.keyCode) {
      case 9:
        $.datepicker._hideDatepicker(), c = !1;
        break;
      case 13:
        var e = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", b.dpDiv);
        e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]);
        var f = $.datepicker._get(b, "onSelect");
        if (f) {
          var g = $.datepicker._formatDate(b);
          f.apply(b.input ? b.input[0] : null, [g, b])
        } else $.datepicker._hideDatepicker();
        return !1;
      case 27:
        $.datepicker._hideDatepicker();
        break;
      case 33:
        $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
        break;
      case 34:
        $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
        break;
      case 35:
        (a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey;
        break;
      case 36:
        (a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey;
        break;
      case 37:
        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
        break;
      case 38:
        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"), c = a.ctrlKey || a.metaKey;
        break;
      case 39:
        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
        break;
      case 40:
        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, "D"), c = a.ctrlKey || a.metaKey;
        break;
      default:
        c = !1
      } else a.keyCode == 36 && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1;
      c && (a.preventDefault(), a.stopPropagation())
    },
    _doKeyPress: function (a) {
      var b = $.datepicker._getInst(a.target);
      if ($.datepicker._get(b, "constrainInput")) {
        var c = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")),
          d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
        return a.ctrlKey || a.metaKey || d < " " || !c || c.indexOf(d) > -1
      }
    },
    _doKeyUp: function (a) {
      var b = $.datepicker._getInst(a.target);
      if (b.input.val() != b.lastVal) try {
        var c = $.datepicker.parseDate($.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b));
        c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b))
      } catch (d) {
        $.datepicker.log(d)
      }
      return !0
    },
    _showDatepicker: function (a) {
      a = a.target || a, a.nodeName.toLowerCase() != "input" && (a = $("input", a.parentNode)[0]);
      if ($.datepicker._isDisabledDatepicker(a) || $.datepicker._lastInput == a) return;
      var b = $.datepicker._getInst(a);
      $.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
      var c = $.datepicker._get(b, "beforeShow"),
        d = c ? c.apply(a, [a, b]) : {};
      if (d === !1) return;
      extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
      var e = !1;
      $(a).parents().each(function () {
        return e |= $(this).css("position") == "fixed", !e
      }), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
      var f = {
        left: $.datepicker._pos[0],
        top: $.datepicker._pos[1]
      };
      $.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({
        position: "absolute",
        display: "block",
        top: "-1000px"
      }), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({
        position: $.datepicker._inDialog && $.blockUI ? "static" : e ? "fixed" : "absolute",
        display: "none",
        left: f.left + "px",
        top: f.top + "px"
      });
      if (!b.inline) {
        var g = $.datepicker._get(b, "showAnim"),
          h = $.datepicker._get(b, "duration"),
          i = function () {
            var a = b.dpDiv.find("iframe.ui-datepicker-cover");
            if ( !! a.length) {
              var c = $.datepicker._getBorders(b.dpDiv);
              a.css({
                left: -c[0],
                top: -c[1],
                width: b.dpDiv.outerWidth(),
                height: b.dpDiv.outerHeight()
              })
            }
          };
        b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[g] ? b.dpDiv.show(g, $.datepicker._get(b, "showOptions"), h, i) : b.dpDiv[g || "show"](g ? h : null, i), (!g || !h) && i(), b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus(), $.datepicker._curInst = b
      }
    },
    _updateDatepicker: function (a) {
      var b = this;
      b.maxRows = 4;
      var c = $.datepicker._getBorders(a.dpDiv);
      instActive = a, a.dpDiv.empty().append(this._generateHTML(a));
      var d = a.dpDiv.find("iframe.ui-datepicker-cover");
      !d.length || d.css({
        left: -c[0],
        top: -c[1],
        width: a.dpDiv.outerWidth(),
        height: a.dpDiv.outerHeight()
      }), a.dpDiv.find("." + this._dayOverClass + " a").mouseover();
      var e = this._getNumberOfMonths(a),
        f = e[1],
        g = 17;
      a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), a.dpDiv[(e[0] != 1 || e[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement && a.input.focus();
      if (a.yearshtml) {
        var h = a.yearshtml;
        setTimeout(function () {
          h === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml), h = a.yearshtml = null
        }, 0)
      }
    },
    _getBorders: function (a) {
      var b = function (a) {
        return {
          thin: 1,
          medium: 2,
          thick: 3
        }[a] || a
      };
      return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
    },
    _checkOffset: function (a, b, c) {
      var d = a.dpDiv.outerWidth(),
        e = a.dpDiv.outerHeight(),
        f = a.input ? a.input.outerWidth() : 0,
        g = a.input ? a.input.outerHeight() : 0,
        h = document.documentElement.clientWidth + $(document).scrollLeft(),
        i = document.documentElement.clientHeight + $(document).scrollTop();
      return b.left -= this._get(a, "isRTL") ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0), b
    },
    _findPos: function (a) {
      var b = this._getInst(a),
        c = this._get(b, "isRTL");
      while (a && (a.type == "hidden" || a.nodeType != 1 || $.expr.filters.hidden(a))) a = a[c ? "previousSibling" : "nextSibling"];
      var d = $(a).offset();
      return [d.left, d.top]
    },
    _hideDatepicker: function (a) {
      var b = this._curInst;
      if (!b || a && b != $.data(a, PROP_NAME)) return;
      if (this._datepickerShowing) {
        var c = this._get(b, "showAnim"),
          d = this._get(b, "duration"),
          e = function () {
            $.datepicker._tidyDialog(b)
          };
        $.effects && $.effects[c] ? b.dpDiv.hide(c, $.datepicker._get(b, "showOptions"), d, e) : b.dpDiv[c == "slideDown" ? "slideUp" : c == "fadeIn" ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1;
        var f = this._get(b, "onClose");
        f && f.apply(b.input ? b.input[0] : null, [b.input ? b.input.val() : "", b]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
          position: "absolute",
          left: "0",
          top: "-100px"
        }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
      }
    },
    _tidyDialog: function (a) {
      a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
    },
    _checkExternalClick: function (a) {
      if (!$.datepicker._curInst) return;
      var b = $(a.target),
        c = $.datepicker._getInst(b[0]);
      (b[0].id != $.datepicker._mainDivId && b.parents("#" + $.datepicker._mainDivId).length == 0 && !b.hasClass($.datepicker.markerClassName) && !b.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker()
    },
    _adjustDate: function (a, b, c) {
      var d = $(a),
        e = this._getInst(d[0]);
      if (this._isDisabledDatepicker(d[0])) return;
      this._adjustInstDate(e, b + (c == "M" ? this._get(e, "showCurrentAtPos") : 0), c), this._updateDatepicker(e)
    },
    _gotoToday: function (a) {
      var b = $(a),
        c = this._getInst(b[0]);
      if (this._get(c, "gotoCurrent") && c.currentDay) c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear;
      else {
        var d = new Date;
        c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear()
      }
      this._notifyChange(c), this._adjustDate(b)
    },
    _selectMonthYear: function (a, b, c) {
      var d = $(a),
        e = this._getInst(d[0]);
      e["selected" + (c == "M" ? "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d)
    },
    _selectDay: function (a, b, c, d) {
      var e = $(a);
      if ($(d).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0])) return;
      var f = this._getInst(e[0]);
      f.selectedDay = f.currentDay =
        $("a", d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
    },
    _clearDate: function (a) {
      var b = $(a),
        c = this._getInst(b[0]);
      this._selectDate(b, "")
    },
    _selectDate: function (a, b) {
      var c = $(a),
        d = this._getInst(c[0]);
      b = b != null ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
      var e = this._get(d, "onSelect");
      e ? e.apply(d.input ? d.input[0] : null, [b, d]) : d.input && d.input.trigger("change"), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], typeof d.input[0] != "object" && d.input.focus(), this._lastInput = null)
    },
    _updateAlternate: function (a) {
      var b = this._get(a, "altField");
      if (b) {
        var c = this._get(a, "altFormat") || this._get(a, "dateFormat"),
          d = this._getDate(a),
          e = this.formatDate(c, d, this._getFormatConfig(a));
        $(b).each(function () {
          $(this).val(e)
        })
      }
    },
    noWeekends: function (a) {
      var b = a.getDay();
      return [b > 0 && b < 6, ""]
    },
    iso8601Week: function (a) {
      var b = new Date(a.getTime());
      b.setDate(b.getDate() + 4 - (b.getDay() || 7));
      var c = b.getTime();
      return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1
    },
    parseDate: function (a, b, c) {
      if (a == null || b == null) throw "Invalid arguments";
      b = typeof b == "object" ? b.toString() : b + "";
      if (b == "") return null;
      var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
      d = typeof d != "string" ? d : (new Date).getFullYear() % 100 + parseInt(d, 10);
      var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
        f = (c ? c.dayNames : null) || this._defaults.dayNames,
        g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
        h = (c ? c.monthNames : null) || this._defaults.monthNames,
        i = -1,
        j = -1,
        k = -1,
        l = -1,
        m = !1,
        n = function (b) {
          var c = s + 1 < a.length && a.charAt(s + 1) == b;
          return c && s++, c
        }, o = function (a) {
          var c = n(a),
            d = a == "@" ? 14 : a == "!" ? 20 : a == "y" && c ? 4 : a == "o" ? 3 : 2,
            e = new RegExp("^\\d{1," + d + "}"),
            f = b.substring(r).match(e);
          if (!f) throw "Missing number at position " + r;
          return r += f[0].length, parseInt(f[0], 10)
        }, p = function (a, c, d) {
          var e = $.map(n(a) ? d : c, function (a, b) {
            return [[b, a]]
          }).sort(function (a, b) {
            return -(a[1].length - b[1].length)
          }),
            f = -1;
          $.each(e, function (a, c) {
            var d = c[1];
            if (b.substr(r, d.length).toLowerCase() == d.toLowerCase()) return f = c[0], r += d.length, !1
          });
          if (f != -1) return f + 1;
          throw "Unknown name at position " + r
        }, q = function () {
          if (b.charAt(r) != a.charAt(s)) throw "Unexpected literal at position " + r;
          r++
        }, r = 0;
      for (var s = 0; s < a.length; s++)
        if (m) a.charAt(s) == "'" && !n("'") ? m = !1 : q();
        else switch (a.charAt(s)) {
        case "d":
          k = o("d");
          break;
        case "D":
          p("D", e, f);
          break;
        case "o":
          l = o("o");
          break;
        case "m":
          j = o("m");
          break;
        case "M":
          j = p("M", g, h);
          break;
        case "y":
          i = o("y");
          break;
        case "@":
          var t = new Date(o("@"));
          i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
          break;
        case "!":
          var t = new Date((o("!") - this._ticksTo1970) / 1e4);
          i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
          break;
        case "'":
          n("'") ? q() : m = !0;
          break;
        default:
          q()
        }
      if (r < b.length) throw "Extra/unparsed characters found in date: " + b.substring(r);
      i == -1 ? i = (new Date).getFullYear() : i < 100 && (i += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (i <= d ? 0 : -100));
      if (l > -1) {
        j = 1, k = l;
        do {
          var u = this._getDaysInMonth(i, j - 1);
          if (k <= u) break;
          j++, k -= u
        } while (!0)
      }
      var t = this._daylightSavingAdjust(new Date(i, j - 1, k));
      if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k) throw "Invalid date";
      return t
    },
    ATOM: "yy-mm-dd",
    COOKIE: "D, dd M yy",
    ISO_8601: "yy-mm-dd",
    RFC_822: "D, d M y",
    RFC_850: "DD, dd-M-y",
    RFC_1036: "D, d M y",
    RFC_1123: "D, d M yy",
    RFC_2822: "D, d M yy",
    RSS: "D, d M y",
    TICKS: "!",
    TIMESTAMP: "@",
    W3C: "yy-mm-dd",
    _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
    formatDate: function (a, b, c) {
      if (!b) return "";
      var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
        e = (c ? c.dayNames : null) || this._defaults.dayNames,
        f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
        g = (c ? c.monthNames : null) || this._defaults.monthNames,
        h = function (b) {
          var c = m + 1 < a.length && a.charAt(m + 1) == b;
          return c && m++, c
        }, i = function (a, b, c) {
          var d = "" + b;
          if (h(a))
            while (d.length < c) d = "0" + d;
          return d
        }, j = function (a, b, c, d) {
          return h(a) ? d[b] : c[b]
        }, k = "",
        l = !1;
      if (b)
        for (var m = 0; m < a.length; m++)
          if (l) a.charAt(m) == "'" && !h("'") ? l = !1 : k += a.charAt(m);
          else switch (a.charAt(m)) {
          case "d":
            k += i("d", b.getDate(), 2);
            break;
          case "D":
            k += j("D", b.getDay(), d, e);
            break;
          case "o":
            k += i("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
            break;
          case "m":
            k += i("m", b.getMonth() + 1, 2);
            break;
          case "M":
            k += j("M", b.getMonth(), f, g);
            break;
          case "y":
            k += h("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
            break;
          case "@":
            k += b.getTime();
            break;
          case "!":
            k += b.getTime() * 1e4 + this._ticksTo1970;
            break;
          case "'":
            h("'") ? k += "'" : l = !0;
            break;
          default:
            k += a.charAt(m)
          }
      return k
    },
    _possibleChars: function (a) {
      var b = "",
        c = !1,
        d = function (b) {
          var c = e + 1 < a.length && a.charAt(e + 1) == b;
          return c && e++, c
        };
      for (var e = 0; e < a.length; e++)
        if (c) a.charAt(e) == "'" && !d("'") ? c = !1 : b += a.charAt(e);
        else switch (a.charAt(e)) {
        case "d":
        case "m":
        case "y":
        case "@":
          b += "0123456789";
          break;
        case "D":
        case "M":
          return null;
        case "'":
          d("'") ? b += "'" : c = !0;
          break;
        default:
          b += a.charAt(e)
        }
      return b
    },
    _get: function (a, b) {
      return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b]
    },
    _setDateFromField: function (a, b) {
      if (a.input.val() == a.lastVal) return;
      var c = this._get(a, "dateFormat"),
        d = a.lastVal = a.input ? a.input.val() : null,
        e, f;
      e = f = this._getDefaultDate(a);
      var g = this._getFormatConfig(a);
      try {
        e = this.parseDate(c, d, g) || f
      } catch (h) {
        this.log(h), d = b ? "" : d
      }
      a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a)
    },
    _getDefaultDate: function (a) {
      return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
    },
    _determineDate: function (a, b, c) {
      var d = function (a) {
        var b = new Date;
        return b.setDate(b.getDate() + a), b
      }, e = function (b) {
          try {
            return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), b, $.datepicker._getFormatConfig(a))
          } catch (c) {}
          var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date,
            e = d.getFullYear(),
            f = d.getMonth(),
            g = d.getDate(),
            h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
            i = h.exec(b);
          while (i) {
            switch (i[2] || "d") {
            case "d":
            case "D":
              g += parseInt(i[1], 10);
              break;
            case "w":
            case "W":
              g += parseInt(i[1], 10) * 7;
              break;
            case "m":
            case "M":
              f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
              break;
            case "y":
            case "Y":
              e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f))
            }
            i = h.exec(b)
          }
          return new Date(e, f, g)
        }, f = b == null || b === "" ? c : typeof b == "string" ? e(b) : typeof b == "number" ? isNaN(b) ? c : d(b) : new Date(b.getTime());
      return f = f && f.toString() == "Invalid Date" ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0)), this._daylightSavingAdjust(f)
    },
    _daylightSavingAdjust: function (a) {
      return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
    },
    _setDate: function (a, b, c) {
      var d = !b,
        e = a.selectedMonth,
        f = a.selectedYear,
        g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
      a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
    },
    _getDate: function (a) {
      var b = !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
      return b
    },
    _generateHTML: function (a) {
      var b = new Date;
      b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
      var c = this._get(a, "isRTL"),
        d = this._get(a, "showButtonPanel"),
        e = this._get(a, "hideIfNoPrevNext"),
        f = this._get(a, "navigationAsDateFormat"),
        g = this._getNumberOfMonths(a),
        h = this._get(a, "showCurrentAtPos"),
        i = this._get(a, "stepMonths"),
        j = g[0] != 1 || g[1] != 1,
        k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
        l = this._getMinMaxDate(a, "min"),
        m = this._getMinMaxDate(a, "max"),
        n = a.drawMonth - h,
        o = a.drawYear;
      n < 0 && (n += 12, o--);
      if (m) {
        var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
        p = l && p < l ? l : p;
        while (this._daylightSavingAdjust(new Date(o, n, 1)) > p) n--, n < 0 && (n = 11, o--)
      }
      a.drawMonth = n, a.drawYear = o;
      var q = this._get(a, "prevText");
      q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q;
      var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + a.id + "', -" + i + ", 'M');\"" + ' title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>" : e ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>",
        s = this._get(a, "nextText");
      s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s;
      var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + a.id + "', +" + i + ", 'M');\"" + ' title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>" : e ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>",
        u = this._get(a, "currentText"),
        v = this._get(a, "gotoCurrent") && a.currentDay ? k : b;
      u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u;
      var w = a.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(a, "closeText") + "</button>",
        x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + a.id + "');\"" + ">" + u + "</button>" : "") + (c ? "" : w) + "</div>" : "",
        y = parseInt(this._get(a, "firstDay"), 10);
      y = isNaN(y) ? 0 : y;
      var z = this._get(a, "showWeek"),
        A = this._get(a, "dayNames"),
        B = this._get(a, "dayNamesShort"),
        C = this._get(a, "dayNamesMin"),
        D = this._get(a, "monthNames"),
        E = this._get(a, "monthNamesShort"),
        F = this._get(a, "beforeShowDay"),
        G = this._get(a, "showOtherMonths"),
        H = this._get(a, "selectOtherMonths"),
        I = this._get(a, "calculateWeek") || this.iso8601Week,
        J = this._getDefaultDate(a),
        K = "";
      for (var L = 0; L < g[0]; L++) {
        var M = "";
        this.maxRows = 4;
        for (var N = 0; N < g[1]; N++) {
          var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)),
            P = " ui-corner-all",
            Q = "";
          if (j) {
            Q += '<div class="ui-datepicker-group';
            if (g[1] > 1) switch (N) {
            case 0:
              Q += " ui-datepicker-group-first", P = " ui-corner-" + (c ? "right" : "left");
              break;
            case g[1] - 1:
              Q += " ui-datepicker-group-last", P = " ui-corner-" + (c ? "left" : "right");
              break;
            default:
              Q += " ui-datepicker-group-middle", P = ""
            }
            Q += '">'
          }
          Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && L == 0 ? c ? t : r : "") + (/all|right/.test(P) && L == 0 ? c ? r : t : "") + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
          var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
          for (var S = 0; S < 7; S++) {
            var T = (S + y) % 7;
            R += "<th" + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + A[T] + '">' + C[T] + "</span></th>"
          }
          Q += R + "</tr></thead><tbody>";
          var U = this._getDaysInMonth(o, n);
          o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U));
          var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7,
            W = Math.ceil((V + U) / 7),
            X = j ? this.maxRows > W ? this.maxRows : W : W;
          this.maxRows = X;
          var Y = this._daylightSavingAdjust(new Date(o, n, 1 - V));
          for (var Z = 0; Z < X; Z++) {
            Q += "<tr>";
            var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(Y) + "</td>" : "";
            for (var S = 0; S < 7; S++) {
              var ba = F ? F.apply(a.input ? a.input[0] : null, [Y]) : [!0, ""],
                bb = Y.getMonth() != n,
                bc = bb && !H || !ba[0] || l && Y < l || m && Y > m;
              _ += '<td class="' + ((S + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (bb ? " ui-datepicker-other-month" : "") + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (bc ? " " + this._unselectableClass + " ui-state-disabled" : "") + (bb && !G ? "" : " " + ba[1] + (Y.getTime() == k.getTime() ? " " + this._currentClass : "") + (Y.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!bb || G) && ba[2] ? ' title="' + ba[2] + '"' : "") + (bc ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + a.id + "'," + Y.getMonth() + "," + Y.getFullYear() + ', this);return false;"') + ">" + (bb && !G ? "&#xa0;" : bc ? '<span class="ui-state-default">' + Y.getDate() + "</span>" : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? " ui-state-highlight" : "") + (Y.getTime() == k.getTime() ? " ui-state-active" : "") + (bb ? " ui-priority-secondary" : "") + '" href="#">' + Y.getDate() + "</a>") + "</td>", Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y)
            }
            Q += _ + "</tr>"
          }
          n++, n > 11 && (n = 0, o++), Q += "</tbody></table>" + (j ? "</div>" + (g[0] > 0 && N == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), M += Q
        }
        K += M
      }
      return K += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), a._keyEvent = !1, K
    },
    _generateMonthYearHeader: function (a, b, c, d, e, f, g, h) {
      var i = this._get(a, "changeMonth"),
        j = this._get(a, "changeYear"),
        k = this._get(a, "showMonthAfterYear"),
        l = '<div class="ui-datepicker-title">',
        m = "";
      if (f || !i) m += '<span class="ui-datepicker-month">' + g[b] + "</span>";
      else {
        var n = d && d.getFullYear() == c,
          o = e && e.getFullYear() == c;
        m += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'M');\" " + ">";
        for (var p = 0; p < 12; p++)(!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : "") + ">" + h[p] + "</option>");
        m += "</select>"
      }
      k || (l += m + (f || !i || !j ? "&#xa0;" : ""));
      if (!a.yearshtml) {
        a.yearshtml = "";
        if (f || !j) l += '<span class="ui-datepicker-year">' + c + "</span>";
        else {
          var q = this._get(a, "yearRange").split(":"),
            r = (new Date).getFullYear(),
            s = function (a) {
              var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
              return isNaN(b) ? r : b
            }, t = s(q[0]),
            u = Math.max(t, s(q[1] || ""));
          t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'Y');\" " + ">";
          for (; t <= u; t++) a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : "") + ">" + t + "</option>";
          a.yearshtml += "</select>", l += a.yearshtml, a.yearshtml = null
        }
      }
      return l += this._get(a, "yearSuffix"), k && (l += (f || !i || !j ? "&#xa0;" : "") + m), l += "</div>", l
    },
    _adjustInstDate: function (a, b, c) {
      var d = a.drawYear + (c == "Y" ? b : 0),
        e = a.drawMonth + (c == "M" ? b : 0),
        f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c == "D" ? b : 0),
        g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
      a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c == "M" || c == "Y") && this._notifyChange(a)
    },
    _restrictMinMax: function (a, b) {
      var c = this._getMinMaxDate(a, "min"),
        d = this._getMinMaxDate(a, "max"),
        e = c && b < c ? c : b;
      return e = d && e > d ? d : e, e
    },
    _notifyChange: function (a) {
      var b = this._get(a, "onChangeMonthYear");
      b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
    },
    _getNumberOfMonths: function (a) {
      var b = this._get(a, "numberOfMonths");
      return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b
    },
    _getMinMaxDate: function (a, b) {
      return this._determineDate(a, this._get(a, b + "Date"), null)
    },
    _getDaysInMonth: function (a, b) {
      return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
    },
    _getFirstDayOfMonth: function (a, b) {
      return (new Date(a, b, 1)).getDay()
    },
    _canAdjustMonth: function (a, b, c, d) {
      var e = this._getNumberOfMonths(a),
        f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
      return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
    },
    _isInRange: function (a, b) {
      var c = this._getMinMaxDate(a, "min"),
        d = this._getMinMaxDate(a, "max");
      return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime())
    },
    _getFormatConfig: function (a) {
      var b = this._get(a, "shortYearCutoff");
      return b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
        shortYearCutoff: b,
        dayNamesShort: this._get(a, "dayNamesShort"),
        dayNames: this._get(a, "dayNames"),
        monthNamesShort: this._get(a, "monthNamesShort"),
        monthNames: this._get(a, "monthNames")
      }
    },
    _formatDate: function (a, b, c, d) {
      b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
      var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
      return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
    }
  }), $.fn.datepicker = function (a) {
    if (!this.length) return this;
    $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
    var b = Array.prototype.slice.call(arguments, 1);
    return typeof a != "string" || a != "isDisabled" && a != "getDate" && a != "widget" ? a == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b)) : this.each(function () {
      typeof a == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a)
    }) : $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b))
  }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.21", window["DP_jQuery_" + dpuuid] = $
}(jQuery),

function (a, b) {
  a.widget("ui.progressbar", {
    options: {
      value: 0,
      max: 100
    },
    min: 0,
    _create: function () {
      this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
        role: "progressbar",
        "aria-valuemin": this.min,
        "aria-valuemax": this.options.max,
        "aria-valuenow": this._value()
      }), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
    },
    destroy: function () {
      this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove(), a.Widget.prototype.destroy.apply(this, arguments)
    },
    value: function (a) {
      return a === b ? this._value() : (this._setOption("value", a), this)
    },
    _setOption: function (b, c) {
      b === "value" && (this.options.value = c, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), a.Widget.prototype._setOption.apply(this, arguments)
    },
    _value: function () {
      var a = this.options.value;
      return typeof a != "number" && (a = 0), Math.min(this.options.max, Math.max(this.min, a))
    },
    _percentage: function () {
      return 100 * this._value() / this.options.max
    },
    _refreshValue: function () {
      var a = this.value(),
        b = this._percentage();
      this.oldValue !== a && (this.oldValue = a, this._trigger("change")), this.valueDiv.toggle(a > this.min).toggleClass("ui-corner-right", a === this.options.max).width(b.toFixed(0) + "%"), this.element.attr("aria-valuenow", a)
    }
  }), a.extend(a.ui.progressbar, {
    version: "1.8.21"
  })
}(jQuery), jQuery.effects || function (a, b) {
  function c(b) {
    var c;
    return b && b.constructor == Array && b.length == 3 ? b : (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) ? [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10)] : (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) ? [parseFloat(c[1]) * 2.55, parseFloat(c[2]) * 2.55, parseFloat(c[3]) * 2.55] : (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) ? [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)] : (c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b)) ? [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)] : (c = /rgba\(0, 0, 0, 0\)/.exec(b)) ? j.transparent : j[a.trim(b).toLowerCase()]
  }

  function d(b, d) {
    var e;
    do {
      e = a.curCSS(b, d);
      if (e != "" && e != "transparent" || a.nodeName(b, "body")) break;
      d = "backgroundColor"
    } while (b = b.parentNode);
    return c(e)
  }

  function e() {
    var a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
      b = {}, c, d;
    if (a && a.length && a[0] && a[a[0]]) {
      var e = a.length;
      while (e--) c = a[e], typeof a[c] == "string" && (d = c.replace(/\-(\w)/g, function (a, b) {
        return b.toUpperCase()
      }), b[d] = a[c])
    } else
      for (c in a) typeof a[c] == "string" && (b[c] = a[c]);
    return b
  }

  function f(b) {
    var c, d;
    for (c in b) d = b[c], (d == null || a.isFunction(d) || c in l || /scrollbar/.test(c) || !/color/i.test(c) && isNaN(parseFloat(d))) && delete b[c];
    return b
  }

  function g(a, b) {
    var c = {
      _: 0
    }, d;
    for (d in b) a[d] != b[d] && (c[d] = b[d]);
    return c
  }

  function h(b, c, d, e) {
    typeof b == "object" && (e = c, d = null, c = b, b = c.effect), a.isFunction(c) && (e = c, d = null, c = {});
    if (typeof c == "number" || a.fx.speeds[c]) e = d, d = c, c = {};
    return a.isFunction(d) && (e = d, d = null), c = c || {}, d = d || c.duration, d = a.fx.off ? 0 : typeof d == "number" ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, e = e || c.complete, [b, c, d, e]
  }

  function i(b) {
    return !b || typeof b == "number" || a.fx.speeds[b] ? !0 : typeof b == "string" && !a.effects[b] ? !0 : !1
  }
  a.effects = {}, a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (b, e) {
    a.fx.step[e] = function (a) {
      a.colorInit || (a.start = d(a.elem, e), a.end = c(a.end), a.colorInit = !0), a.elem.style[e] = "rgb(" + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ")"
    }
  });
  var j = {
    aqua: [0, 255, 255],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    black: [0, 0, 0],
    blue: [0, 0, 255],
    brown: [165, 42, 42],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgrey: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkviolet: [148, 0, 211],
    fuchsia: [255, 0, 255],
    gold: [255, 215, 0],
    green: [0, 128, 0],
    indigo: [75, 0, 130],
    khaki: [240, 230, 140],
    lightblue: [173, 216, 230],
    lightcyan: [224, 255, 255],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    navy: [0, 0, 128],
    olive: [128, 128, 0],
    orange: [255, 165, 0],
    pink: [255, 192, 203],
    purple: [128, 0, 128],
    violet: [128, 0, 128],
    red: [255, 0, 0],
    silver: [192, 192, 192],
    white: [255, 255, 255],
    yellow: [255, 255, 0],
    transparent: [255, 255, 255]
  }, k = ["add", "remove", "toggle"],
    l = {
      border: 1,
      borderBottom: 1,
      borderColor: 1,
      borderLeft: 1,
      borderRight: 1,
      borderTop: 1,
      borderWidth: 1,
      margin: 1,
      padding: 1
    };
  a.effects.animateClass = function (b, c, d, h) {
    return a.isFunction(d) && (h = d, d = null), this.queue(function () {
      var i = a(this),
        j = i.attr("style") || " ",
        l = f(e.call(this)),
        m, n = i.attr("class") || "";
      a.each(k, function (a, c) {
        b[c] && i[c + "Class"](b[c])
      }), m = f(e.call(this)), i.attr("class", n), i.animate(g(l, m), {
        queue: !1,
        duration: c,
        easing: d,
        complete: function () {
          a.each(k, function (a, c) {
            b[c] && i[c + "Class"](b[c])
          }), typeof i.attr("style") == "object" ? (i.attr("style").cssText = "", i.attr("style").cssText = j) : i.attr("style", j), h && h.apply(this, arguments), a.dequeue(this)
        }
      })
    })
  }, a.fn.extend({
    _addClass: a.fn.addClass,
    addClass: function (b, c, d, e) {
      return c ? a.effects.animateClass.apply(this, [{
          add: b
        },
        c, d, e
      ]) : this._addClass(b)
    },
    _removeClass: a.fn.removeClass,
    removeClass: function (b, c, d, e) {
      return c ? a.effects.animateClass.apply(this, [{
          remove: b
        },
        c, d, e
      ]) : this._removeClass(b)
    },
    _toggleClass: a.fn.toggleClass,
    toggleClass: function (c, d, e, f, g) {
      return typeof d == "boolean" || d === b ? e ? a.effects.animateClass.apply(this, [d ? {
          add: c
        } : {
          remove: c
        },
        e, f, g
      ]) : this._toggleClass(c, d) : a.effects.animateClass.apply(this, [{
          toggle: c
        },
        d, e, f
      ])
    },
    switchClass: function (b, c, d, e, f) {
      return a.effects.animateClass.apply(this, [{
          add: c,
          remove: b
        },
        d, e, f
      ])
    }
  }), a.extend(a.effects, {
    version: "1.8.21",
    save: function (a, b) {
      for (var c = 0; c < b.length; c++) b[c] !== null && a.data("ec.storage." + b[c], a[0].style[b[c]])
    },
    restore: function (a, b) {
      for (var c = 0; c < b.length; c++) b[c] !== null && a.css(b[c], a.data("ec.storage." + b[c]))
    },
    setMode: function (a, b) {
      return b == "toggle" && (b = a.is(":hidden") ? "show" : "hide"), b
    },
    getBaseline: function (a, b) {
      var c, d;
      switch (a[0]) {
      case "top":
        c = 0;
        break;
      case "middle":
        c = .5;
        break;
      case "bottom":
        c = 1;
        break;
      default:
        c = a[0] / b.height
      }
      switch (a[1]) {
      case "left":
        d = 0;
        break;
      case "center":
        d = .5;
        break;
      case "right":
        d = 1;
        break;
      default:
        d = a[1] / b.width
      }
      return {
        x: d,
        y: c
      }
    },
    createWrapper: function (b) {
      if (b.parent().is(".ui-effects-wrapper")) return b.parent();
      var c = {
        width: b.outerWidth(!0),
        height: b.outerHeight(!0),
        "float": b.css("float")
      }, d = a("<div></div>").addClass("ui-effects-wrapper").css({
          fontSize: "100%",
          background: "transparent",
          border: "none",
          margin: 0,
          padding: 0
        }),
        e = document.activeElement;
      try {
        e.id
      } catch (f) {
        e = document.body
      }
      return b.wrap(d), (b[0] === e || a.contains(b[0], e)) && a(e).focus(), d = b.parent(), b.css("position") == "static" ? (d.css({
        position: "relative"
      }), b.css({
        position: "relative"
      })) : (a.extend(c, {
        position: b.css("position"),
        zIndex: b.css("z-index")
      }), a.each(["top", "left", "bottom", "right"], function (a, d) {
        c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
      }), b.css({
        position: "relative",
        top: 0,
        left: 0,
        right: "auto",
        bottom: "auto"
      })), d.css(c).show()
    },
    removeWrapper: function (b) {
      var c, d = document.activeElement;
      return b.parent().is(".ui-effects-wrapper") ? (c = b.parent().replaceWith(b), (b[0] === d || a.contains(b[0], d)) && a(d).focus(), c) : b
    },
    setTransition: function (b, c, d, e) {
      return e = e || {}, a.each(c, function (a, c) {
        var f = b.cssUnit(c);
        f[0] > 0 && (e[c] = f[0] * d + f[1])
      }), e
    }
  }), a.fn.extend({
    effect: function (b, c, d, e) {
      var f = h.apply(this, arguments),
        g = {
          options: f[1],
          duration: f[2],
          callback: f[3]
        }, i = g.options.mode,
        j = a.effects[b];
      return a.fx.off || !j ? i ? this[i](g.duration, g.callback) : this.each(function () {
        g.callback && g.callback.call(this)
      }) : j.call(this, g)
    },
    _show: a.fn.show,
    show: function (a) {
      if (i(a)) return this._show.apply(this, arguments);
      var b = h.apply(this, arguments);
      return b[1].mode = "show", this.effect.apply(this, b)
    },
    _hide: a.fn.hide,
    hide: function (a) {
      if (i(a)) return this._hide.apply(this, arguments);
      var b = h.apply(this, arguments);
      return b[1].mode = "hide", this.effect.apply(this, b)
    },
    __toggle: a.fn.toggle,
    toggle: function (b) {
      if (i(b) || typeof b == "boolean" || a.isFunction(b)) return this.__toggle.apply(this, arguments);
      var c = h.apply(this, arguments);
      return c[1].mode = "toggle", this.effect.apply(this, c)
    },
    cssUnit: function (b) {
      var c = this.css(b),
        d = [];
      return a.each(["em", "px", "%", "pt"], function (a, b) {
        c.indexOf(b) > 0 && (d = [parseFloat(c), b])
      }), d
    }
  }), a.easing.jswing = a.easing.swing, a.extend(a.easing, {
    def: "easeOutQuad",
    swing: function (b, c, d, e, f) {
      return a.easing[a.easing.def](b, c, d, e, f)
    },
    easeInQuad: function (a, b, c, d, e) {
      return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
      return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
      return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
      return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
      return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
      return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
      return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
      return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
      return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
      return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
      return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
      return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
      return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
      return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
      return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
      return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
      return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
      return b == 0 ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
      return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
      return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
      return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
      var f = 1.70158,
        g = 0,
        h = d;
      if (b == 0) return c;
      if ((b /= e) == 1) return c + d;
      g || (g = e * .3);
      if (h < Math.abs(d)) {
        h = d;
        var f = g / 4
      } else var f = g / (2 * Math.PI) * Math.asin(d / h);
      return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
      var f = 1.70158,
        g = 0,
        h = d;
      if (b == 0) return c;
      if ((b /= e) == 1) return c + d;
      g || (g = e * .3);
      if (h < Math.abs(d)) {
        h = d;
        var f = g / 4
      } else var f = g / (2 * Math.PI) * Math.asin(d / h);
      return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
      var f = 1.70158,
        g = 0,
        h = d;
      if (b == 0) return c;
      if ((b /= e / 2) == 2) return c + d;
      g || (g = e * .3 * 1.5);
      if (h < Math.abs(d)) {
        h = d;
        var f = g / 4
      } else var f = g / (2 * Math.PI) * Math.asin(d / h);
      return b < 1 ? -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
    },
    easeInBack: function (a, c, d, e, f, g) {
      return g == b && (g = 1.70158), e * (c /= f) * c * ((g + 1) * c - g) + d
    },
    easeOutBack: function (a, c, d, e, f, g) {
      return g == b && (g = 1.70158), e * ((c = c / f - 1) * c * ((g + 1) * c + g) + 1) + d
    },
    easeInOutBack: function (a, c, d, e, f, g) {
      return g == b && (g = 1.70158), (c /= f / 2) < 1 ? e / 2 * c * c * (((g *= 1.525) + 1) * c - g) + d : e / 2 * ((c -= 2) * c * (((g *= 1.525) + 1) * c + g) + 2) + d
    },
    easeInBounce: function (b, c, d, e, f) {
      return e - a.easing.easeOutBounce(b, f - c, 0, e, f) + d
    },
    easeOutBounce: function (a, b, c, d, e) {
      return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    },
    easeInOutBounce: function (b, c, d, e, f) {
      return c < f / 2 ? a.easing.easeInBounce(b, c * 2, 0, e, f) * .5 + d : a.easing.easeOutBounce(b, c * 2 - f, 0, e, f) * .5 + e * .5 + d
    }
  })
}(jQuery),

function (a, b) {
  a.effects.blind = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = ["position", "top", "bottom", "left", "right"],
        e = a.effects.setMode(c, b.options.mode || "hide"),
        f = b.options.direction || "vertical";
      a.effects.save(c, d), c.show();
      var g = a.effects.createWrapper(c).css({
        overflow: "hidden"
      }),
        h = f == "vertical" ? "height" : "width",
        i = f == "vertical" ? g.height() : g.width();
      e == "show" && g.css(h, 0);
      var j = {};
      j[h] = e == "show" ? i : 0, g.animate(j, b.duration, b.options.easing, function () {
        e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue()
      })
    })
  }
}(jQuery),

function (a, b) {
  a.effects.bounce = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = ["position", "top", "bottom", "left", "right"],
        e = a.effects.setMode(c, b.options.mode || "effect"),
        f = b.options.direction || "up",
        g = b.options.distance || 20,
        h = b.options.times || 5,
        i = b.duration || 250;
      /show|hide/.test(e) && d.push("opacity"), a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
      var j = f == "up" || f == "down" ? "top" : "left",
        k = f == "up" || f == "left" ? "pos" : "neg",
        g = b.options.distance || (j == "top" ? c.outerHeight({
          margin: !0
        }) / 3 : c.outerWidth({
          margin: !0
        }) / 3);
      e == "show" && c.css("opacity", 0).css(j, k == "pos" ? -g : g), e == "hide" && (g /= h * 2), e != "hide" && h--;
      if (e == "show") {
        var l = {
          opacity: 1
        };
        l[j] = (k == "pos" ? "+=" : "-=") + g, c.animate(l, i / 2, b.options.easing), g /= 2, h--
      }
      for (var m = 0; m < h; m++) {
        var n = {}, o = {};
        n[j] = (k == "pos" ? "-=" : "+=") + g, o[j] = (k == "pos" ? "+=" : "-=") + g, c.animate(n, i / 2, b.options.easing).animate(o, i / 2, b.options.easing), g = e == "hide" ? g * 2 : g / 2
      }
      if (e == "hide") {
        var l = {
          opacity: 0
        };
        l[j] = (k == "pos" ? "-=" : "+=") + g, c.animate(l, i / 2, b.options.easing, function () {
          c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments)
        })
      } else {
        var n = {}, o = {};
        n[j] = (k == "pos" ? "-=" : "+=") + g, o[j] = (k == "pos" ? "+=" : "-=") + g, c.animate(n, i / 2, b.options.easing).animate(o, i / 2, b.options.easing, function () {
          a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments)
        })
      }
      c.queue("fx", function () {
        c.dequeue()
      }), c.dequeue()
    })
  }
}(jQuery),

function (a, b) {
  a.effects.clip = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = ["position", "top", "bottom", "left", "right", "height", "width"],
        e = a.effects.setMode(c, b.options.mode || "hide"),
        f = b.options.direction || "vertical";
      a.effects.save(c, d), c.show();
      var g = a.effects.createWrapper(c).css({
        overflow: "hidden"
      }),
        h = c[0].tagName == "IMG" ? g : c,
        i = {
          size: f == "vertical" ? "height" : "width",
          position: f == "vertical" ? "top" : "left"
        }, j = f == "vertical" ? h.height() : h.width();
      e == "show" && (h.css(i.size, 0), h.css(i.position, j / 2));
      var k = {};
      k[i.size] = e == "show" ? j : 0, k[i.position] = e == "show" ? 0 : j / 2, h.animate(k, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue()
        }
      })
    })
  }
}(jQuery),

function (a, b) {
  a.effects.drop = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = ["position", "top", "bottom", "left", "right", "opacity"],
        e = a.effects.setMode(c, b.options.mode || "hide"),
        f = b.options.direction || "left";
      a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
      var g = f == "up" || f == "down" ? "top" : "left",
        h = f == "up" || f == "left" ? "pos" : "neg",
        i = b.options.distance || (g == "top" ? c.outerHeight({
          margin: !0
        }) / 2 : c.outerWidth({
          margin: !0
        }) / 2);
      e == "show" && c.css("opacity", 0).css(g, h == "pos" ? -i : i);
      var j = {
        opacity: e == "show" ? 1 : 0
      };
      j[g] = (e == "show" ?
        h == "pos" ? "+=" : "-=" : h == "pos" ? "-=" : "+=") + i, c.animate(j, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue()
        }
      })
    })
  }
}(jQuery),

function (a, b) {
  a.effects.explode = function (b) {
    return this.queue(function () {
      var c = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3,
        d = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
      b.options.mode = b.options.mode == "toggle" ? a(this).is(":visible") ? "hide" : "show" : b.options.mode;
      var e = a(this).show().css("visibility", "hidden"),
        f = e.offset();
      f.top -= parseInt(e.css("marginTop"), 10) || 0, f.left -= parseInt(e.css("marginLeft"), 10) || 0;
      var g = e.outerWidth(!0),
        h = e.outerHeight(!0);
      for (var i = 0; i < c; i++)
        for (var j = 0; j < d; j++) e.clone().appendTo("body").wrap("<div></div>").css({
          position: "absolute",
          visibility: "visible",
          left: -j * (g / d),
          top: -i * (h / c)
        }).parent().addClass("ui-effects-explode").css({
          position: "absolute",
          overflow: "hidden",
          width: g / d,
          height: h / c,
          left: f.left + j * (g / d) + (b.options.mode == "show" ? (j - Math.floor(d / 2)) * (g / d) : 0),
          top: f.top + i * (h / c) + (b.options.mode == "show" ? (i - Math.floor(c / 2)) * (h / c) : 0),
          opacity: b.options.mode == "show" ? 0 : 1
        }).animate({
          left: f.left + j * (g / d) + (b.options.mode == "show" ? 0 : (j - Math.floor(d / 2)) * (g / d)),
          top: f.top + i * (h / c) + (b.options.mode == "show" ? 0 : (i - Math.floor(c / 2)) * (h / c)),
          opacity: b.options.mode == "show" ? 1 : 0
        }, b.duration || 500);
      setTimeout(function () {
        b.options.mode == "show" ? e.css({
          visibility: "visible"
        }) : e.css({
          visibility: "visible"
        }).hide(), b.callback && b.callback.apply(e[0]), e.dequeue(), a("div.ui-effects-explode").remove()
      }, b.duration || 500)
    })
  }
}(jQuery),

function (a, b) {
  a.effects.fade = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = a.effects.setMode(c, b.options.mode || "hide");
      c.animate({
        opacity: d
      }, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          b.callback && b.callback.apply(this, arguments), c.dequeue()
        }
      })
    })
  }
}(jQuery),

function (a, b) {
  a.effects.fold = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = ["position", "top", "bottom", "left", "right"],
        e = a.effects.setMode(c, b.options.mode || "hide"),
        f = b.options.size || 15,
        g = !! b.options.horizFirst,
        h = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
      a.effects.save(c, d), c.show();
      var i = a.effects.createWrapper(c).css({
        overflow: "hidden"
      }),
        j = e == "show" != g,
        k = j ? ["width", "height"] : ["height", "width"],
        l = j ? [i.width(), i.height()] : [i.height(), i.width()],
        m = /([0-9]+)%/.exec(f);
      m && (f = parseInt(m[1], 10) / 100 * l[e == "hide" ? 0 : 1]), e == "show" && i.css(g ? {
        height: 0,
        width: f
      } : {
        height: f,
        width: 0
      });
      var n = {}, o = {};
      n[k[0]] = e == "show" ? l[0] : f, o[k[1]] = e == "show" ? l[1] : 0, i.animate(n, h, b.options.easing).animate(o, h, b.options.easing, function () {
        e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(c[0], arguments), c.dequeue()
      })
    })
  }
}(jQuery),

function (a, b) {
  a.effects.highlight = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = ["backgroundImage", "backgroundColor", "opacity"],
        e = a.effects.setMode(c, b.options.mode || "show"),
        f = {
          backgroundColor: c.css("backgroundColor")
        };
      e == "hide" && (f.opacity = 0), a.effects.save(c, d), c.show().css({
        backgroundImage: "none",
        backgroundColor: b.options.color || "#ffff99"
      }).animate(f, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          e == "hide" && c.hide(), a.effects.restore(c, d), e == "show" && !a.support.opacity && this.style.removeAttribute("filter"), b.callback && b.callback.apply(this, arguments), c.dequeue()
        }
      })
    })
  }
}(jQuery),

function (a, b) {
  a.effects.pulsate = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = a.effects.setMode(c, b.options.mode || "show"),
        e = (b.options.times || 5) * 2 - 1,
        f = b.duration ? b.duration / 2 : a.fx.speeds._default / 2,
        g = c.is(":visible"),
        h = 0;
      g || (c.css("opacity", 0).show(), h = 1), (d == "hide" && g || d == "show" && !g) && e--;
      for (var i = 0; i < e; i++) c.animate({
        opacity: h
      }, f, b.options.easing), h = (h + 1) % 2;
      c.animate({
        opacity: h
      }, f, b.options.easing, function () {
        h == 0 && c.hide(), b.callback && b.callback.apply(this, arguments)
      }), c.queue("fx", function () {
        c.dequeue()
      }).dequeue()
    })
  }
}(jQuery),

function (a, b) {
  a.effects.puff = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = a.effects.setMode(c, b.options.mode || "hide"),
        e = parseInt(b.options.percent, 10) || 150,
        f = e / 100,
        g = {
          height: c.height(),
          width: c.width()
        };
      a.extend(b.options, {
        fade: !0,
        mode: d,
        percent: d == "hide" ? e : 100,
        from: d == "hide" ? g : {
          height: g.height * f,
          width: g.width * f
        }
      }), c.effect("scale", b.options, b.duration, b.callback), c.dequeue()
    })
  }, a.effects.scale = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = a.extend(!0, {}, b.options),
        e = a.effects.setMode(c, b.options.mode || "effect"),
        f = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : e == "hide" ? 0 : 100),
        g = b.options.direction || "both",
        h = b.options.origin;
      e != "effect" && (d.origin = h || ["middle", "center"], d.restore = !0);
      var i = {
        height: c.height(),
        width: c.width()
      };
      c.from = b.options.from || (e == "show" ? {
        height: 0,
        width: 0
      } : i);
      var j = {
        y: g != "horizontal" ? f / 100 : 1,
        x: g != "vertical" ? f / 100 : 1
      };
      c.to = {
        height: i.height * j.y,
        width: i.width * j.x
      }, b.options.fade && (e == "show" && (c.from.opacity = 0, c.to.opacity = 1), e == "hide" && (c.from.opacity = 1, c.to.opacity = 0)), d.from = c.from, d.to = c.to, d.mode = e, c.effect("size", d, b.duration, b.callback), c.dequeue()
    })
  }, a.effects.size = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
        e = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
        f = ["width", "height", "overflow"],
        g = ["fontSize"],
        h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
        i = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
        j = a.effects.setMode(c, b.options.mode || "effect"),
        k = b.options.restore || !1,
        l = b.options.scale || "both",
        m = b.options.origin,
        n = {
          height: c.height(),
          width: c.width()
        };
      c.from = b.options.from || n, c.to = b.options.to || n;
      if (m) {
        var o = a.effects.getBaseline(m, n);
        c.from.top = (n.height - c.from.height) * o.y, c.from.left = (n.width - c.from.width) * o.x, c.to.top = (n.height - c.to.height) * o.y, c.to.left = (n.width - c.to.width) * o.x
      }
      var p = {
        from: {
          y: c.from.height / n.height,
          x: c.from.width / n.width
        },
        to: {
          y: c.to.height / n.height,
          x: c.to.width / n.width
        }
      };
      if (l == "box" || l == "both") p.from.y != p.to.y && (d = d.concat(h), c.from = a.effects.setTransition(c, h, p.from.y, c.from), c.to = a.effects.setTransition(c, h, p.to.y, c.to)), p.from.x != p.to.x && (d = d.concat(i), c.from = a.effects.setTransition(c, i, p.from.x, c.from), c.to = a.effects.setTransition(c, i, p.to.x, c.to));
      (l == "content" || l == "both") && p.from.y != p.to.y && (d = d.concat(g), c.from = a.effects.setTransition(c, g, p.from.y, c.from), c.to = a.effects.setTransition(c, g, p.to.y, c.to)), a.effects.save(c, k ? d : e), c.show(), a.effects.createWrapper(c), c.css("overflow", "hidden").css(c.from);
      if (l == "content" || l == "both") h = h.concat(["marginTop", "marginBottom"]).concat(g), i = i.concat(["marginLeft", "marginRight"]), f = d.concat(h).concat(i), c.find("*[width]").each(function () {
        var c = a(this);
        k && a.effects.save(c, f);
        var d = {
          height: c.height(),
          width: c.width()
        };
        c.from = {
          height: d.height * p.from.y,
          width: d.width * p.from.x
        }, c.to = {
          height: d.height * p.to.y,
          width: d.width * p.to.x
        }, p.from.y != p.to.y && (c.from = a.effects.setTransition(c, h, p.from.y, c.from), c.to = a.effects.setTransition(c, h, p.to.y, c.to)), p.from.x != p.to.x && (c.from = a.effects.setTransition(c, i, p.from.x, c.from), c.to = a.effects.setTransition(c, i, p.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.options.easing, function () {
          k && a.effects.restore(c, f)
        })
      });
      c.animate(c.to, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          c.to.opacity === 0 && c.css("opacity", c.from.opacity), j == "hide" && c.hide(), a.effects.restore(c, k ? d : e), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue()
        }
      })
    })
  }
}(jQuery),

function (a, b) {
  a.effects.shake = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = ["position", "top", "bottom", "left", "right"],
        e = a.effects.setMode(c, b.options.mode || "effect"),
        f = b.options.direction || "left",
        g = b.options.distance || 20,
        h = b.options.times || 3,
        i = b.duration || b.options.duration || 140;
      a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
      var j = f == "up" || f == "down" ? "top" : "left",
        k = f == "up" || f == "left" ? "pos" : "neg",
        l = {}, m = {}, n = {};
      l[j] = (k == "pos" ? "-=" : "+=") + g, m[j] = (k == "pos" ? "+=" : "-=") + g * 2, n[j] = (k == "pos" ? "-=" : "+=") + g * 2, c.animate(l, i, b.options.easing);
      for (var o = 1; o < h; o++) c.animate(m, i, b.options.easing).animate(n, i, b.options.easing);
      c.animate(m, i, b.options.easing).animate(l, i / 2, b.options.easing, function () {
        a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments)
      }), c.queue("fx", function () {
        c.dequeue()
      }), c.dequeue()
    })
  }
}(jQuery),

function (a, b) {
  a.effects.slide = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = ["position", "top", "bottom", "left", "right"],
        e = a.effects.setMode(c, b.options.mode || "show"),
        f = b.options.direction || "left";
      a.effects.save(c, d), c.show(), a.effects.createWrapper(c).css({
        overflow: "hidden"
      });
      var g = f == "up" || f == "down" ? "top" : "left",
        h = f == "up" || f == "left" ? "pos" : "neg",
        i = b.options.distance || (g == "top" ? c.outerHeight({
          margin: !0
        }) : c.outerWidth({
          margin: !0
        }));
      e == "show" && c.css(g, h == "pos" ? isNaN(i) ? "-" + i : -i : i);
      var j = {};
      j[g] = (e == "show" ? h == "pos" ? "+=" : "-=" : h == "pos" ? "-=" : "+=") + i, c.animate(j, {
        queue: !1,
        duration: b.duration,
        easing: b.options.easing,
        complete: function () {
          e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue()
        }
      })
    })
  }
}(jQuery),

function (a, b) {
  a.effects.transfer = function (b) {
    return this.queue(function () {
      var c = a(this),
        d = a(b.options.to),
        e = d.offset(),
        f = {
          top: e.top,
          left: e.left,
          height: d.innerHeight(),
          width: d.innerWidth()
        }, g = c.offset(),
        h = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({
          top: g.top,
          left: g.left,
          height: c.innerHeight(),
          width: c.innerWidth(),
          position: "absolute"
        }).animate(f, b.duration, b.options.easing, function () {
          h.remove(), b.callback && b.callback.apply(c[0], arguments), c.dequeue()
        })
    })
  }
}(jQuery),

function (a, b) {
  "use strict";
  var c = a.History = a.History || {}, d = a.jQuery;
  if (typeof c.Adapter != "undefined") throw new Error("History.js Adapter has already been loaded...");
  c.Adapter = {
    bind: function (a, b, c) {
      d(a).bind(b, c)
    },
    trigger: function (a, b, c) {
      d(a).trigger(b, c)
    },
    extractEventData: function (a, c, d) {
      var e = c && c.originalEvent && c.originalEvent[a] || d && d[a] || b;
      return e
    },
    onDomLoad: function (a) {
      d(a)
    }
  }, typeof c.init != "undefined" && c.init()
}(window),

function (a, b) {
  "use strict";
  var c = a.document,
    d = a.setTimeout || d,
    e = a.clearTimeout || e,
    f = a.setInterval || f,
    g = a.History = a.History || {};
  if (typeof g.initHtml4 != "undefined") throw new Error("History.js HTML4 Support has already been loaded...");
  g.initHtml4 = function () {
    if (typeof g.initHtml4.initialized != "undefined") return !1;
    g.initHtml4.initialized = !0, g.enabled = !0, g.savedHashes = [], g.isLastHash = function (a) {
      var b = g.getHashByIndex(),
        c;
      return c = a === b, c
    }, g.saveHash = function (a) {
      return g.isLastHash(a) ? !1 : (g.savedHashes.push(a), !0)
    }, g.getHashByIndex = function (a) {
      var b = null;
      return typeof a == "undefined" ? b = g.savedHashes[g.savedHashes.length - 1] : a < 0 ? b = g.savedHashes[g.savedHashes.length + a] : b = g.savedHashes[a], b
    }, g.discardedHashes = {}, g.discardedStates = {}, g.discardState = function (a, b, c) {
      var d = g.getHashByState(a),
        e;
      return e = {
        discardedState: a,
        backState: c,
        forwardState: b
      }, g.discardedStates[d] = e, !0
    }, g.discardHash = function (a, b, c) {
      var d = {
        discardedHash: a,
        backState: c,
        forwardState: b
      };
      return g.discardedHashes[a] = d, !0
    }, g.discardedState = function (a) {
      var b = g.getHashByState(a),
        c;
      return c = g.discardedStates[b] || !1, c
    }, g.discardedHash = function (a) {
      var b = g.discardedHashes[a] || !1;
      return b
    }, g.recycleState = function (a) {
      var b = g.getHashByState(a);
      return g.discardedState(a) && delete g.discardedStates[b], !0
    }, g.emulated.hashChange && (g.hashChangeInit = function () {
      g.checkerFunction = null;
      var b = "",
        d, e, h, i;
      return g.isInternetExplorer() ? (d = "historyjs-iframe", e = c.createElement("iframe"), e.setAttribute("id", d), e.style.display = "none", c.body.appendChild(e), e.contentWindow.document.open(), e.contentWindow.document.close(), h = "", i = !1, g.checkerFunction = function () {
        if (i) return !1;
        i = !0;
        var c = g.getHash() || "",
          d = g.unescapeHash(e.contentWindow.document.location.hash) || "";
        return c !== b ? (b = c, d !== c && (h = d = c, e.contentWindow.document.open(), e.contentWindow.document.close(), e.contentWindow.document.location.hash = g.escapeHash(c)), g.Adapter.trigger(a, "hashchange")) : d !== h && (h = d, g.setHash(d, !1)), i = !1, !0
      }) : g.checkerFunction = function () {
        var c = g.getHash();
        return c !== b && (b = c, g.Adapter.trigger(a, "hashchange")), !0
      }, g.intervalList.push(f(g.checkerFunction, g.options.hashChangeInterval)), !0
    }, g.Adapter.onDomLoad(g.hashChangeInit)), g.emulated.pushState && (g.onHashChange = function (b) {
      var d = b && b.newURL || c.location.href,
        e = g.getHashByUrl(d),
        f = null,
        h = null,
        i = null,
        j;
      return g.isLastHash(e) ? (g.busy(!1), !1) : (g.doubleCheckComplete(), g.saveHash(e), e && g.isTraditionalAnchor(e) ? (g.Adapter.trigger(a, "anchorchange"), g.busy(!1), !1) : (f = g.extractState(g.getFullUrl(e || c.location.href, !1), !0), g.isLastSavedState(f) ? (g.busy(!1), !1) : (h = g.getHashByState(f), j = g.discardedState(f), j ? (g.getHashByIndex(-2) === g.getHashByState(j.forwardState) ? g.back(!1) : g.forward(!1), !1) : (g.pushState(f.data, f.title, f.url, !1), !0))))
    }, g.Adapter.bind(a, "hashchange", g.onHashChange), g.pushState = function (b, d, e, f) {
      if (g.getHashByUrl(e)) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
      if (f !== !1 && g.busy()) return g.pushQueue({
        scope: g,
        callback: g.pushState,
        args: arguments,
        queue: f
      }), !1;
      g.busy(!0);
      var h = g.createStateObject(b, d, e),
        i = g.getHashByState(h),
        j = g.getState(!1),
        k = g.getHashByState(j),
        l = g.getHash();
      return g.storeState(h), g.expectedStateId = h.id, g.recycleState(h), g.setTitle(h), i === k ? (g.busy(!1), !1) : i !== l && i !== g.getShortUrl(c.location.href) ? (g.setHash(i, !1), !1) : (g.saveState(h), g.Adapter.trigger(a, "statechange"), g.busy(!1), !0)
    }, g.replaceState = function (a, b, c, d) {
      if (g.getHashByUrl(c)) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
      if (d !== !1 && g.busy()) return g.pushQueue({
        scope: g,
        callback: g.replaceState,
        args: arguments,
        queue: d
      }), !1;
      g.busy(!0);
      var e = g.createStateObject(a, b, c),
        f = g.getState(!1),
        h = g.getStateByIndex(-2);
      return g.discardState(f, e, h), g.pushState(e.data, e.title, e.url, !1), !0
    }), g.emulated.pushState && g.getHash() && !g.emulated.hashChange && g.Adapter.onDomLoad(function () {
      g.Adapter.trigger(a, "hashchange")
    })
  }, typeof g.init != "undefined" && g.init()
}(window),

function (a, b) {
  "use strict";
  var c = a.console || b,
    d = a.document,
    e = a.navigator,
    f = a.sessionStorage || !1,
    g = a.setTimeout,
    h = a.clearTimeout,
    i = a.setInterval,
    j = a.clearInterval,
    k = a.JSON,
    l = a.alert,
    m = a.History = a.History || {}, n = a.history;
  k.stringify = k.stringify || k.encode, k.parse = k.parse || k.decode;
  if (typeof m.init != "undefined") throw new Error("History.js Core has already been loaded...");
  m.init = function () {
    return typeof m.Adapter == "undefined" ? !1 : (typeof m.initCore != "undefined" && m.initCore(), typeof m.initHtml4 != "undefined" && m.initHtml4(), !0)
  }, m.initCore = function () {
    if (typeof m.initCore.initialized != "undefined") return !1;
    m.initCore.initialized = !0, m.options = m.options || {}, m.options.hashChangeInterval = m.options.hashChangeInterval || 100, m.options.safariPollInterval = m.options.safariPollInterval || 500, m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500, m.options.storeInterval = m.options.storeInterval || 1e3, m.options.busyDelay = m.options.busyDelay || 250, m.options.debug = m.options.debug || !1, m.options.initialTitle = m.options.initialTitle || d.title, m.intervalList = [], m.clearAllIntervals = function () {
      var a, b = m.intervalList;
      if (typeof b != "undefined" && b !== null) {
        for (a = 0; a < b.length; a++) j(b[a]);
        m.intervalList = null
      }
    }, m.debug = function () {
      (m.options.debug || !1) && m.log.apply(m, arguments)
    }, m.log = function () {
      var a = typeof c != "undefined" && typeof c.log != "undefined" && typeof c.log.apply != "undefined",
        b = d.getElementById("log"),
        e, f, g, h, i;
      a ? (h = Array.prototype.slice.call(arguments), e = h.shift(), typeof c.debug != "undefined" ? c.debug.apply(c, [e, h]) : c.log.apply(c, [e, h])) : e = "\n" + arguments[0] + "\n";
      for (f = 1, g = arguments.length; f < g; ++f) {
        i = arguments[f];
        if (typeof i == "object" && typeof k != "undefined") try {
          i = k.stringify(i)
        } catch (j) {}
        e += "\n" + i + "\n"
      }
      return b ? (b.value += e + "\n-----\n", b.scrollTop = b.scrollHeight - b.clientHeight) : a || l(e), !0
    }, m.getInternetExplorerMajorVersion = function () {
      var a = m.getInternetExplorerMajorVersion.cached = typeof m.getInternetExplorerMajorVersion.cached != "undefined" ? m.getInternetExplorerMajorVersion.cached : function () {
          var a = 3,
            b = d.createElement("div"),
            c = b.getElementsByTagName("i");
          while ((b.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->") && c[0]);
          return a > 4 ? a : !1
        }();
      return a
    }, m.isInternetExplorer = function () {
      var a = m.isInternetExplorer.cached = typeof m.isInternetExplorer.cached != "undefined" ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion());
      return a
    }, m.emulated = {
      pushState: !Boolean(a.history && a.history.pushState && a.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),
      hashChange: Boolean(!("onhashchange" in a || "onhashchange" in d) || m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)
    }, m.enabled = !m.emulated.pushState, m.bugs = {
      setHash: Boolean(!m.emulated.pushState && e.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
      safariPoll: Boolean(!m.emulated.pushState && e.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
      ieDoubleCheck: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),
      hashEscape: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7)
    }, m.isEmptyObject = function (a) {
      for (var b in a) return !1;
      return !0
    }, m.cloneObject = function (a) {
      var b, c;
      return a ? (b = k.stringify(a), c = k.parse(b)) : c = {}, c
    }, m.getRootUrl = function () {
      var a = d.location.protocol + "//" + (d.location.hostname || d.location.host);
      if (d.location.port || !1) a += ":" + d.location.port;
      return a += "/", a
    }, m.getBaseHref = function () {
      var a = d.getElementsByTagName("base"),
        b = null,
        c = "";
      return a.length === 1 && (b = a[0], c = b.href.replace(/[^\/]+$/, "")), c = c.replace(/\/+$/, ""), c && (c += "/"), c
    }, m.getBaseUrl = function () {
      var a = m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl();
      return a
    }, m.getPageUrl = function () {
      var a = m.getState(!1, !1),
        b = (a || {}).url || d.location.href,
        c;
      return c = b.replace(/\/+$/, "").replace(/[^\/]+$/, function (a, b, c) {
        return /\./.test(a) ? a : a + "/"
      }), c
    }, m.getBasePageUrl = function () {
      var a = d.location.href.replace(/[#\?].*/, "").replace(/[^\/]+$/, function (a, b, c) {
        return /[^\/]$/.test(a) ? "" : a
      }).replace(/\/+$/, "") + "/";
      return a
    }, m.getFullUrl = function (a, b) {
      var c = a,
        d = a.substring(0, 1);
      return b = typeof b == "undefined" ? !0 : b, /[a-z]+\:\/\//.test(a) || (d === "/" ? c = m.getRootUrl() + a.replace(/^\/+/, "") : d === "#" ? c = m.getPageUrl().replace(/#.*/, "") + a : d === "?" ? c = m.getPageUrl().replace(/[\?#].*/, "") + a : b ? c = m.getBaseUrl() + a.replace(/^(\.\/)+/, "") : c = m.getBasePageUrl() + a.replace(/^(\.\/)+/, "")), c.replace(/\#$/, "")
    }, m.getShortUrl = function (a) {
      var b = a,
        c = m.getBaseUrl(),
        d = m.getRootUrl();
      return m.emulated.pushState && (b = b.replace(c, "")), b = b.replace(d, "/"), m.isTraditionalAnchor(b) && (b = "./" + b), b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""), b
    }, m.store = {}, m.idToState = m.idToState || {}, m.stateToId = m.stateToId || {}, m.urlToId = m.urlToId || {}, m.storedStates = m.storedStates || [], m.savedStates = m.savedStates || [], m.normalizeStore = function () {
      m.store.idToState = m.store.idToState || {}, m.store.urlToId = m.store.urlToId || {}, m.store.stateToId = m.store.stateToId || {}
    }, m.getState = function (a, b) {
      typeof a == "undefined" && (a = !0), typeof b == "undefined" && (b = !0);
      var c = m.getLastSavedState();
      return !c && b && (c = m.createStateObject()), a && (c = m.cloneObject(c), c.url = c.cleanUrl || c.url), c
    }, m.getIdByState = function (a) {
      var b = m.extractId(a.url),
        c;
      if (!b) {
        c = m.getStateString(a);
        if (typeof m.stateToId[c] != "undefined") b = m.stateToId[c];
        else if (typeof m.store.stateToId[c] != "undefined") b = m.store.stateToId[c];
        else {
          for (;;) {
            b = (new Date).getTime() + String(Math.random()).replace(/\D/g, "");
            if (typeof m.idToState[b] == "undefined" && typeof m.store.idToState[b] == "undefined") break
          }
          m.stateToId[c] = b, m.idToState[b] = a
        }
      }
      return b
    }, m.normalizeState = function (a) {
      var b, c;
      if (!a || typeof a != "object") a = {};
      if (typeof a.normalized != "undefined") return a;
      if (!a.data || typeof a.data != "object") a.data = {};
      b = {}, b.normalized = !0, b.title = a.title || "", b.url = m.getFullUrl(m.unescapeString(a.url || d.location.href)), b.hash = m.getShortUrl(b.url), b.data = m.cloneObject(a.data), b.id = m.getIdByState(b), b.cleanUrl = b.url.replace(/\??\&_suid.*/, ""), b.url = b.cleanUrl, c = !m.isEmptyObject(b.data);
      if (b.title || c) b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, ""), /\?/.test(b.hash) || (b.hash += "?"), b.hash += "&_suid=" + b.id;
      return b.hashedUrl = m.getFullUrl(b.hash), (m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl), b
    }, m.createStateObject = function (a, b, c) {
      var d = {
        data: a,
        title: b,
        url: c
      };
      return d = m.normalizeState(d), d
    }, m.getStateById = function (a) {
      a = String(a);
      var c = m.idToState[a] || m.store.idToState[a] || b;
      return c
    }, m.getStateString = function (a) {
      var b, c, d;
      return b = m.normalizeState(a), c = {
        data: b.data,
        title: a.title,
        url: a.url
      }, d = k.stringify(c), d
    }, m.getStateId = function (a) {
      var b, c;
      return b = m.normalizeState(a), c = b.id, c
    }, m.getHashByState = function (a) {
      var b, c;
      return b = m.normalizeState(a), c = b.hash, c
    }, m.extractId = function (a) {
      var b, c, d;
      return c = /(.*)\&_suid=([0-9]+)$/.exec(a), d = c ? c[1] || a : a, b = c ? String(c[2] || "") : "", b || !1
    }, m.isTraditionalAnchor = function (a) {
      var b = !/[\/\?\.]/.test(a);
      return b
    }, m.extractState = function (a, b) {
      var c = null,
        d, e;
      return b = b || !1, d = m.extractId(a), d && (c = m.getStateById(d)), c || (e = m.getFullUrl(a), d = m.getIdByUrl(e) || !1, d && (c = m.getStateById(d)), !c && b && !m.isTraditionalAnchor(a) && (c = m.createStateObject(null, null, e))), c
    }, m.getIdByUrl = function (a) {
      var c = m.urlToId[a] || m.store.urlToId[a] || b;
      return c
    }, m.getLastSavedState = function () {
      return m.savedStates[m.savedStates.length - 1] || b
    }, m.getLastStoredState = function () {
      return m.storedStates[m.storedStates.length - 1] || b
    }, m.hasUrlDuplicate = function (a) {
      var b = !1,
        c;
      return c = m.extractState(a.url), b = c && c.id !== a.id, b
    }, m.storeState = function (a) {
      return m.urlToId[a.url] = a.id, m.storedStates.push(m.cloneObject(a)), a
    }, m.isLastSavedState = function (a) {
      var b = !1,
        c, d, e;
      return m.savedStates.length && (c = a.id, d = m.getLastSavedState(), e = d.id, b = c === e), b
    }, m.saveState = function (a) {
      return m.isLastSavedState(a) ? !1 : (m.savedStates.push(m.cloneObject(a)), !0)
    }, m.getStateByIndex = function (a) {
      var b = null;
      return typeof a == "undefined" ? b = m.savedStates[m.savedStates.length - 1] : a < 0 ? b = m.savedStates[m.savedStates.length + a] : b = m.savedStates[a], b
    }, m.getHash = function () {
      var a = m.unescapeHash(d.location.hash);
      return a
    }, m.unescapeString = function (b) {
      var c = b,
        d;
      for (;;) {
        d = a.unescape(c);
        if (d === c) break;
        c = d
      }
      return c
    }, m.unescapeHash = function (a) {
      var b = m.normalizeHash(a);
      return b = m.unescapeString(b), b
    }, m.normalizeHash = function (a) {
      var b = a.replace(/[^#]*#/, "").replace(/#.*/, "");
      return b
    }, m.setHash = function (a, b) {
      var c, e, f;
      return b !== !1 && m.busy() ? (m.pushQueue({
        scope: m,
        callback: m.setHash,
        args: arguments,
        queue: b
      }), !1) : (c = m.escapeHash(a), m.busy(!0), e = m.extractState(a, !0), e && !m.emulated.pushState ? m.pushState(e.data, e.title, e.url, !1) : d.location.hash !== c && (m.bugs.setHash ? (f = m.getPageUrl(), m.pushState(null, null, f + "#" + c, !1)) : d.location.hash = c), m)
    }, m.escapeHash = function (b) {
      var c = m.normalizeHash(b);
      return c = a.escape(c), m.bugs.hashEscape || (c = c.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), c
    }, m.getHashByUrl = function (a) {
      var b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
      return b = m.unescapeHash(b), b
    }, m.setTitle = function (a) {
      var b = a.title,
        c;
      b || (c = m.getStateByIndex(0), c && c.url === a.url && (b = c.title || m.options.initialTitle));
      try {
        d.getElementsByTagName("title")[0].innerHTML = b.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
      } catch (e) {}
      return d.title = b, m
    }, m.queues = [], m.busy = function (a) {
      typeof a != "undefined" ? m.busy.flag = a : typeof m.busy.flag == "undefined" && (m.busy.flag = !1);
      if (!m.busy.flag) {
        h(m.busy.timeout);
        var b = function () {
          var a, c, d;
          if (m.busy.flag) return;
          for (a = m.queues.length - 1; a >= 0; --a) {
            c = m.queues[a];
            if (c.length === 0) continue;
            d = c.shift(), m.fireQueueItem(d), m.busy.timeout = g(b, m.options.busyDelay)
          }
        };
        m.busy.timeout = g(b, m.options.busyDelay)
      }
      return m.busy.flag
    }, m.busy.flag = !1, m.fireQueueItem = function (a) {
      return a.callback.apply(a.scope || m, a.args || [])
    }, m.pushQueue = function (a) {
      return m.queues[a.queue || 0] = m.queues[a.queue || 0] || [], m.queues[a.queue || 0].push(a), m
    }, m.queue = function (a, b) {
      return typeof a == "function" && (a = {
        callback: a
      }), typeof b != "undefined" && (a.queue = b), m.busy() ? m.pushQueue(a) : m.fireQueueItem(a), m
    }, m.clearQueue = function () {
      return m.busy.flag = !1, m.queues = [], m
    }, m.stateChanged = !1, m.doubleChecker = !1, m.doubleCheckComplete = function () {
      return m.stateChanged = !0, m.doubleCheckClear(), m
    }, m.doubleCheckClear = function () {
      return m.doubleChecker && (h(m.doubleChecker), m.doubleChecker = !1), m
    }, m.doubleCheck = function (a) {
      return m.stateChanged = !1, m.doubleCheckClear(), m.bugs.ieDoubleCheck && (m.doubleChecker = g(function () {
        return m.doubleCheckClear(), m.stateChanged || a(), !0
      }, m.options.doubleCheckInterval)), m
    }, m.safariStatePoll = function () {
      var b = m.extractState(d.location.href),
        c;
      if (!m.isLastSavedState(b)) c = b;
      else return;
      return c || (c = m.createStateObject()), m.Adapter.trigger(a, "popstate"), m
    }, m.back = function (a) {
      return a !== !1 && m.busy() ? (m.pushQueue({
        scope: m,
        callback: m.back,
        args: arguments,
        queue: a
      }), !1) : (m.busy(!0), m.doubleCheck(function () {
        m.back(!1)
      }), n.go(-1), !0)
    }, m.forward = function (a) {
      return a !== !1 && m.busy() ? (m.pushQueue({
        scope: m,
        callback: m.forward,
        args: arguments,
        queue: a
      }), !1) : (m.busy(!0), m.doubleCheck(function () {
        m.forward(!1)
      }), n.go(1), !0)
    }, m.go = function (a, b) {
      var c;
      if (a > 0)
        for (c = 1; c <= a; ++c) m.forward(b);
      else {
        if (!(a < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
        for (c = -1; c >= a; --c) m.back(b)
      }
      return m
    };
    if (m.emulated.pushState) {
      var o = function () {};
      m.pushState = m.pushState || o, m.replaceState = m.replaceState || o
    } else m.onPopState = function (b, c) {
      var e = !1,
        f = !1,
        g, h;
      return m.doubleCheckComplete(), g = m.getHash(), g ? (h = m.extractState(g || d.location.href, !0), h ? m.replaceState(h.data, h.title, h.url, !1) : (m.Adapter.trigger(a, "anchorchange"), m.busy(!1)), m.expectedStateId = !1, !1) : (e = m.Adapter.extractEventData("state", b, c) || !1, e ? f = m.getStateById(e) : m.expectedStateId ? f = m.getStateById(m.expectedStateId) : f = m.extractState(d.location.href), f || (f = m.createStateObject(null, null, d.location.href)), m.expectedStateId = !1, m.isLastSavedState(f) ? (m.busy(!1), !1) : (m.storeState(f), m.saveState(f), m.setTitle(f), m.Adapter.trigger(a, "statechange"), m.busy(!1), !0))
    }, m.Adapter.bind(a, "popstate", m.onPopState), m.pushState = function (b, c, d, e) {
      if (m.getHashByUrl(d) && m.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
      if (e !== !1 && m.busy()) return m.pushQueue({
        scope: m,
        callback: m.pushState,
        args: arguments,
        queue: e
      }), !1;
      m.busy(!0);
      var f = m.createStateObject(b, c, d);
      return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.pushState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")), !0
    }, m.replaceState = function (b, c, d, e) {
      if (m.getHashByUrl(d) && m.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
      if (e !== !1 && m.busy()) return m.pushQueue({
        scope: m,
        callback: m.replaceState,
        args: arguments,
        queue: e
      }), !1;
      m.busy(!0);
      var f = m.createStateObject(b, c, d);
      return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.replaceState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")), !0
    }; if (f) {
      try {
        m.store = k.parse(f.getItem("History.store")) || {}
      } catch (p) {
        m.store = {}
      }
      m.normalizeStore()
    } else m.store = {}, m.normalizeStore();
    m.Adapter.bind(a, "beforeunload", m.clearAllIntervals), m.Adapter.bind(a, "unload", m.clearAllIntervals), m.saveState(m.storeState(m.extractState(d.location.href, !0))), f && (m.onUnload = function () {
      var a, b;
      try {
        a = k.parse(f.getItem("History.store")) || {}
      } catch (c) {
        a = {}
      }
      a.idToState = a.idToState || {}, a.urlToId = a.urlToId || {}, a.stateToId = a.stateToId || {};
      for (b in m.idToState) {
        if (!m.idToState.hasOwnProperty(b)) continue;
        a.idToState[b] = m.idToState[b]
      }
      for (b in m.urlToId) {
        if (!m.urlToId.hasOwnProperty(b)) continue;
        a.urlToId[b] = m.urlToId[b]
      }
      for (b in m.stateToId) {
        if (!m.stateToId.hasOwnProperty(b)) continue;
        a.stateToId[b] = m.stateToId[b]
      }
      m.store = a, m.normalizeStore(), f.setItem("History.store", k.stringify(a))
    }, m.intervalList.push(i(m.onUnload, m.options.storeInterval)), m.Adapter.bind(a, "beforeunload", m.onUnload), m.Adapter.bind(a, "unload", m.onUnload));
    if (!m.emulated.pushState) {
      m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval));
      if (e.vendor === "Apple Computer, Inc." || (e.appCodeName || "") === "Mozilla") m.Adapter.bind(a, "hashchange", function () {
        m.Adapter.trigger(a, "popstate")
      }), m.getHash() && m.Adapter.onDomLoad(function () {
        m.Adapter.trigger(a, "hashchange")
      })
    }
  }, m.init()
}(window),

function (a) {
  function e(c) {
    function n() {
      c ? f.removeData(c) : k && delete b[k]
    }

    function o() {
      g.id = setTimeout(function () {
        g.fn()
      }, l)
    }
    var e = this,
      f, g = {}, h = c ? a.fn : a,
      i = arguments,
      j = 4,
      k = i[1],
      l = i[2],
      m = i[3];
    typeof k != "string" && (j--, k = c = 0, l = i[1], m = i[2]), c ? (f = e.eq(0), f.data(c, g = f.data(c) || {})) : k && (g = b[k] || (b[k] = {})), g.id && clearTimeout(g.id), delete g.id;
    if (m) g.fn = function (a) {
      typeof m == "string" && (m = h[m]), m.apply(e, d.call(i, j)) === !0 && !a ? o() : n()
    }, o();
    else {
      if (g.fn) return l === undefined ? n() : g.fn(l === !1), !0;
      n()
    }
  }
  var b = {}, c = "doTimeout",
    d = Array.prototype.slice;
  a[c] = function () {
    return e.apply(window, [0].concat(d.call(arguments)))
  }, a.fn[c] = function () {
    var a = d.call(arguments),
      b = e.apply(this, [c + a[0]].concat(a));
    return typeof a[0] == "number" || typeof a[1] == "number" ? this : b
  }
}(jQuery),

function (a) {
  function b() {
    var b = window.innerHeight,
      c = document.compatMode;
    if (c || !a.support.boxModel) b = c == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
    return b
  }
  a(window).scroll(function () {
    var c = b(),
      d = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop,
      e = [];
    a.each(a.cache, function () {
      this.events && this.events.inview && e.push(this.handle.elem)
    }), e.length && a(e).each(function () {
      var b = a(this),
        e = b.offset().top,
        f = b.height(),
        g = b.data("inview") || !1;
      d > e + f || d + c < e ? g && (b.data("inview", !1), b.trigger("inview", [!1])) : d < e + f && (g || (b.data("inview", !0), b.trigger("inview", [!0])))
    })
  }), a(function () {
    a(window).scroll()
  })
}(jQuery),

function (a, b) {
  var c = function () {}, d = {
      initialize: function () {
        this.userAgent = navigator.userAgent, this.isiPad = this.userAgent.match(/iPad/i) != null, this.isiPhone = this.userAgent.match(/iPhone/i) != null, this.isAndroid = this.userAgent.match(/Android/i) != null, this.screenWidth = screen.width, this.screenHeight = screen.width, this.isPhone = this.screenHeight < 360, this.isTablet = this.screenHeight >= 360 && this.screenHeight <= 768, this.isDesktop = this.screenHeight > 768, this.hasHTML5VideoCapability = !! document.createElement("video").canPlayType, this.flashPlayerVersion = swfobject.getFlashPlayerVersion(), this.hasFlashPlayerCapability = this.flashPlayerVersion.major >= 10
      },
      adapt: function (b) {
        this.userAgent || this.initialize(), b = a.extend({}, a.fn.strobemediaplayback.defaults, b), this.changed = !0;
        var c = 0,
          d = this.rules.length;
        while (this.changed) {
          this.changed = !1;
          for (c = 0; c < d; c++) this.rules[c](this, b);
          this.changed = !1
        }
        return b
      },
      setOption: function (a, b, c) {
        if (!a.hasOwnProperty(b) || a[b] != c) a[b] = c, this.changed = !0
      },
      rules: [
        function (a, b) {
          b.favorFlashOverHtml5Video && a.hasFlashPlayerCapability ? a.setOption(b, "useHTML5", !1) : !b.favorFlashOverHtml5Video && a.hasHTML5VideoCapability ? a.setOption(b, "useHTML5", !0) : b.favorFlashOverHtml5Video ? a.setOption(b, "useHTML5", !a.hasFlashPlayerCapability) : a.setOption(b, "useHTML5", a.hasHTML5VideoCapability)
        },
        function (a, b) {
          a.isiPhone && a.setOption(b, "javascriptControls", !1)
        },
        function (a, b) {
          a.isiPad && a.setOption(b, "disabledControls", ".volume")
        },
        function (a, b) {
          !a.hasFlashPlayerCapability && !a.hasHTML5VideoCapability && (a.setOption(b, "javascriptControls", !1), a.setOption(b, "displayAlternativeContent", !0))
        }
      ]
    };
  c.prototype = d, a.fn.adaptiveexperienceconfigurator = new c;
  var e = function (b, c) {
    this.element = b, this.$element = a(b), this.options = a.extend({}, a.fn.strobemediaplayback.defaults, c)
  }, f = null,
    g = {
      initialize: function () {
        this.options = a.fn.adaptiveexperienceconfigurator.adapt(this.options);
        if (this.options.useHTML5) {
          var b = a("<video></video>");
          b.attr("id", this.options.id), b.attr("class", "smp_video"), b.attr("preload", "none"), b.attr("width", this.options.width), b.attr("height", this.options.height), b.attr("src", this.options.src), this.options.loop && b.attr("loop", "loop"), this.options.autoPlay && b.attr("autoplay", "autoplay"), this.options.controlBarMode != "none" && b.attr("controls", "controls"), this.options.poster != "" && b.attr("poster", this.options.poster), this.$element.replaceWith(b), this.$video = b, this.video = b[0]
        } else {
          this.options.queryString = a.fn.strobemediaplayback.generateQueryString(this.options);
          var c = this.options;
          c.javascriptCallbackFunction = "$.fn.strobemediaplayback.triggerHandler";
          var d = {
            allowFullScreen: "true",
            wmode: "direct"
          }, e = {
              id: this.options.id,
              name: this.options.id
            };
          f = this, swfobject.embedSWF(this.options.swf, this.$element.attr("id"), this.options.width, this.options.height, this.options.minimumFlashPlayerVersion, this.options.expressInstallSwfUrl, c, d, e, this.onFlashEmbedComplete), this.monitor = new n(null), this.$video = this.monitor.$videoElement, this.video = this.monitor.videoElement, h[this.options.id] = this.monitor
        }
      },
      onFlashEmbedComplete: function (b) {
        !b.success && a.fn.adaptiveexperienceconfigurator.hasHTML5VideoCapability && (f.useHTML5 = !0, f.initialize())
      }
    };
  e.prototype = g, a.fn.strobemediaplayback = function (a) {
    var b = [],
      c, d = null;
    this.each(function () {
      var c = new e(this, a);
      b.push(c)
    });
    for (c = 0; c < b.length; c++) b[c].initialize(), d == null ? d = b[c].$video : d.push(b[c].video);
    return d
  }, a.fn.strobemediaplayback.defaults = {
    favorFlashOverHtml5Video: !0,
    swf: "RhapSMP.swf",
    javascriptCallbackFunction: "$.fn.strobemediaplayback.triggerHandler",
    minimumFlashPlayerVersion: "10.0.0",
    expressInstallSwfUrl: "expressInstall.swf",
    autoPlay: !1,
    loop: !1,
    controlBarMode: "docked",
    poster: ""
  }, a.fn.strobemediaplayback.parseQueryString = function (a) {
    var b = {}, c = a.split("&"),
      d, e = c.length;
    for (var f = 0; f < e; f++) {
      d = c[f].split("=");
      if (d[1] == "true" || d[1] == "false") b[d[0]] = d[1] == "true";
      else {
        var g = parseFloat(d[1]);
        isNaN(g) ? b[d[0]] = d[1] : b[d[0]] = g
      }
    }
    return b
  }, a.fn.strobemediaplayback.generateQueryString = function (a) {
    var b = [];
    for (var c in a) b.length > 0 && b.push("&"), b.push(encodeURIComponent(c)), b.push("="), b.push(a[c]);
    return b.join("")
  };
  var h = {}, i = {};
  a.fn.strobemediaplayback.triggerHandler = function (a, b, c) {
    var d = h[a];
    typeof d != "undefined" && (typeof i[a] == "undefined" && (strobeMediaPlayback = document.getElementById(a), i[a] = strobeMediaPlayback, d.strobeMediaPlayback = strobeMediaPlayback, d.videoElement.play = jQuery.proxy(strobeMediaPlayback.play2, d.strobeMediaPlayback), d.videoElement.pause = jQuery.proxy(strobeMediaPlayback.pause, d.strobeMediaPlayback), d.videoElement.load = jQuery.proxy(d.load, d), d.videoElement.strobeMediaPlayback = strobeMediaPlayback, m(d)), d.update(c, [b], d))
  };
  var j = "src preload currentTime defaultPlaybackRate playbackRate autoplay loop controls volume muted".split(" "),
    k = "played seekable buffered".split(" "),
    l = {
      start: function (a) {
        return this._start[a]
      },
      end: function (a) {
        return this._end[a]
      }
    }, m = function (a) {
      var b = j.length;
      while (b--) {
        var c = j[b];
        if (a.cc.hasOwnProperty(c) && a.videoElement.hasOwnProperty(c) && a.cc[c] != a.videoElement[c]) {
          var d = "set" + c.charAt(0).toUpperCase() + c.substring(1);
          a.strobeMediaPlayback[d](a.videoElement[c]), a.cc[c] = a.videoElement[c]
        }
      }
      setTimeout(function () {
        m(a)
      }, 500)
    }, n = function (b) {
      this.videoElement = {
        duration: 0,
        currentTime: 0,
        paused: !0,
        muted: !1
      }, this.cc = {
        duration: 0,
        currentTime: 0,
        paused: !0,
        muted: !1
      }, this.$videoElement = a(this.videoElement)
    }, o = function (a, b, c) {
      return !a.hasOwnProperty(c) && a[c] != b[c]
    }, p = {
      load: function () {
        this.strobeMediaPlayback.setSrc(this.videoElement.src), this.strobeMediaPlayback.load()
      },
      update: function (a, b, c) {
        var d;
        for (d in a) {
          if (jQuery.inArray("emptied", b) < 0 && c.cc.hasOwnProperty(d) && c.videoElement.hasOwnProperty(d) && c.cc[d] != c.videoElement[d] && !isNaN(c.cc[d]) && !isNaN(c.videoElement[d])) continue;
          c.cc[d] = a[d], c.videoElement[d] = a[d], jQuery.inArray(d, k) >= 0 && (c.videoElement[d].start = l.start, c.videoElement[d].end = l.end)
        }
        if (b) {
          var e = b.length;
          while (e--) c.$videoElement.triggerHandler(b[e])
        }
      }
    };
  n.prototype = p
}(jQuery);
if (typeof org == "undefined") var org = {};
typeof org.strobemediaplayback == "undefined" && (org.strobemediaplayback = {}), typeof org.strobemediaplayback.proxied == "undefined" && (org.strobemediaplayback.proxied = {}), org.strobemediaplayback.triggerHandler = function (a, b, c) {
  b == "onJavaScriptBridgeCreated" ? typeof onJavaScriptBridgeCreated == "function" && onJavaScriptBridgeCreated(a) : typeof org.strobemediaplayback.proxied[a] != "undefined" && org.strobemediaplayback.proxied[a].update(c, [b], org.strobemediaplayback.proxied[a])
},

function (a) {
  a.extend(a.fn, {
    validate: function (b) {
      if (this.length) {
        var d = a.data(this[0], "validator");
        return d ? d : (this.attr("novalidate", "novalidate"), d = new a.validator(b, this[0]), a.data(this[0], "validator", d), d.settings.onsubmit && (b = this.find("input, button"), b.filter(".cancel").click(function () {
          d.cancelSubmit = !0
        }), d.settings.submitHandler && b.filter(":submit").click(function () {
          d.submitButton = this
        }), this.submit(function (b) {
          function e() {
            if (d.settings.submitHandler) {
              if (d.submitButton) var b = a("<input type='hidden'/>").attr("name", d.submitButton.name).val(d.submitButton.value).appendTo(d.currentForm);
              return d.settings.submitHandler.call(d, d.currentForm), d.submitButton && b.remove(), !1
            }
            return !0
          }
          return d.settings.debug && b.preventDefault(), d.cancelSubmit ? (d.cancelSubmit = !1, e()) : d.form() ? d.pendingRequest ? (d.formSubmitted = !0, !1) : e() : (d.focusInvalid(), !1)
        })), d)
      }
      b && b.debug && window.console && console.warn("nothing selected, can't validate, returning nothing")
    },
    valid: function () {
      if (a(this[0]).is("form")) return this.validate().form();
      var b = !0,
        d = a(this[0].form).validate();
      return this.each(function () {
        b &= d.element(this)
      }), b
    },
    removeAttrs: function (b) {
      var d = {}, e = this;
      return a.each(b.split(/\s/), function (a, b) {
        d[b] = e.attr(b), e.removeAttr(b)
      }), d
    },
    rules: function (b, d) {
      var e = this[0];
      if (b) {
        var f = a.data(e.form, "validator").settings,
          g = f.rules,
          h = a.validator.staticRules(e);
        switch (b) {
        case "add":
          a.extend(h, a.validator.normalizeRule(d)), g[e.name] = h, d.messages && (f.messages[e.name] = a.extend(f.messages[e.name], d.messages));
          break;
        case "remove":
          if (!d) return delete g[e.name], h;
          var i = {};
          return a.each(d.split(/\s/), function (a, b) {
            i[b] = h[b], delete h[b]
          }), i
        }
      }
      return e = a.validator.normalizeRules(a.extend({}, a.validator.metadataRules(e), a.validator.classRules(e), a.validator.attributeRules(e), a.validator.staticRules(e)), e), e.required && (f = e.required, delete e.required, e = a.extend({
        required: f
      }, e)), e
    }
  }), a.extend(a.expr[":"], {
    blank: function (b) {
      return !a.trim("" + b.value)
    },
    filled: function (b) {
      return !!a.trim("" + b.value)
    },
    unchecked: function (a) {
      return !a.checked
    }
  }), a.validator = function (b, d) {
    this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = d, this.init()
  }, a.validator.format = function (b, d) {
    return arguments.length == 1 ? function () {
      var d = a.makeArray(arguments);
      return d.unshift(b), a.validator.format.apply(this, d)
    } : (arguments.length > 2 && d.constructor != Array && (d = a.makeArray(arguments).slice(1)), d.constructor != Array && (d = [d]), a.each(d, function (a, c) {
      b = b.replace(RegExp("\\{" + a + "\\}", "g"), c)
    }), b)
  }, a.extend(a.validator, {
    defaults: {
      messages: {},
      groups: {},
      rules: {},
      errorClass: "error",
      validClass: "valid",
      errorElement: "label",
      focusInvalid: !0,
      errorContainer: a([]),
      errorLabelContainer: a([]),
      onsubmit: !0,
      ignore: ":hidden",
      ignoreTitle: !1,
      onfocusin: function (a) {
        this.lastActive = a, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(a)).hide())
      },
      onfocusout: function (a) {
        !this.checkable(a) && (a.name in this.submitted || !this.optional(a)) && this.element(a)
      },
      onkeyup: function (a) {
        (a.name in this.submitted || a == this.lastElement) && this.element(a)
      },
      onclick: function (a) {
        a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
      },
      highlight: function (b, d, e) {
        b.type === "radio" ? this.findByName(b.name).addClass(d).removeClass(e) : a(b).addClass(d).removeClass(e)
      },
      unhighlight: function (b, d, e) {
        b.type === "radio" ? this.findByName(b.name).removeClass(d).addClass(e) : a(b).removeClass(d).addClass(e)
      }
    },
    setDefaults: function (b) {
      a.extend(a.validator.defaults, b)
    },
    messages: {
      required: "This field is required.",
      remote: "Please fix this field.",
      email: "Please enter a valid email address.",
      url: "Please enter a valid URL.",
      date: "Please enter a valid date.",
      dateISO: "Please enter a valid date (ISO).",
      number: "Please enter a valid number.",
      digits: "Please enter only digits.",
      creditcard: "Please enter a valid credit card number.",
      equalTo: "Please enter the same value again.",
      accept: "Please enter a value with a valid extension.",
      maxlength: a.validator.format("Please enter no more than {0} characters."),
      minlength: a.validator.format("Please enter at least {0} characters."),
      rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
      range: a.validator.format("Please enter a value between {0} and {1}."),
      max: a.validator.format("Please enter a value less than or equal to {0}."),
      min: a.validator.format("Please enter a value greater than or equal to {0}.")
    },
    autoCreateRanges: !1,
    prototype: {
      init: function () {
        function b(b) {
          var d = a.data(this[0].form, "validator"),
            e = "on" + b.type.replace(/^validate/, "");
          d.settings[e] && d.settings[e].call(d, this[0], b)
        }
        this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
        var d = this.groups = {};
        a.each(this.settings.groups, function (b, e) {
          a.each(e.split(/\s/), function (a, c) {
            d[c] = b
          })
        });
        var e = this.settings.rules;
        a.each(e, function (b, d) {
          e[b] = a.validator.normalizeRule(d)
        }), a(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", b).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", b), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
      },
      form: function () {
        return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
      },
      checkForm: function () {
        this.prepareForm();
        for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
        return this.valid()
      },
      element: function (b) {
        this.lastElement = b = this.validationTargetFor(this.clean(b)), this.prepareElement(b), this.currentElements = a(b);
        var d = this.check(b);
        return d ? delete this.invalid[b.name] : this.invalid[b.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), d
      },
      showErrors: function (b) {
        if (b) {
          a.extend(this.errorMap, b), this.errorList = [];
          for (var d in b) this.errorList.push({
            message: b[d],
            element: this.findByName(d)[0]
          });
          this.successList = a.grep(this.successList, function (a) {
            return !(a.name in b)
          })
        }
        this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
      },
      resetForm: function () {
        a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass)
      },
      numberOfInvalids: function () {
        return this.objectLength(this.invalid)
      },
      objectLength: function (a) {
        var b = 0,
          c;
        for (c in a) b++;
        return b
      },
      hideErrors: function () {
        this.addWrapper(this.toHide).hide()
      },
      valid: function () {
        return this.size() == 0
      },
      size: function () {
        return this.errorList.length
      },
      focusInvalid: function () {
        if (this.settings.focusInvalid) try {
          a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
        } catch (b) {}
      },
      findLastActive: function () {
        var b = this.lastActive;
        return b && a.grep(this.errorList, function (a) {
          return a.element.name == b.name
        }).length == 1 && b
      },
      elements: function () {
        var b = this,
          d = {};
        return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
          return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in d || !b.objectLength(a(this).rules()) ? !1 : d[this.name] = !0
        })
      },
      clean: function (b) {
        return a(b)[0]
      },
      errors: function () {
        return a(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext)
      },
      reset: function () {
        this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
      },
      prepareForm: function () {
        this.reset(), this.toHide = this.errors().add(this.containers)
      },
      prepareElement: function (a) {
        this.reset(), this.toHide = this.errorsFor(a)
      },
      check: function (b) {
        b = this.validationTargetFor(this.clean(b));
        var d = a(b).rules(),
          e = !1,
          f;
        for (f in d) {
          var g = {
            method: f,
            parameters: d[f]
          };
          try {
            var h = a.validator.methods[f].call(this, b.value.replace(/\r/g, ""), b, g.parameters);
            if (h == "dependency-mismatch") e = !0;
            else {
              e = !1;
              if (h == "pending") {
                this.toHide = this.toHide.not(this.errorsFor(b));
                return
              }
              if (!h) return this.formatAndAdd(b, g), !1
            }
          } catch (i) {
            throw this.settings.debug && window.console && console.log("exception occured when checking element " + b.id + ", check the '" + g.method + "' method", i), i
          }
        }
        if (!e) return this.objectLength(d) && this.successList.push(b), !0
      },
      customMetaMessage: function (b, d) {
        if (a.metadata) {
          var e = this.settings.meta ? a(b).metadata()[this.settings.meta] : a(b).metadata();
          return e && e.messages && e.messages[d]
        }
      },
      customMessage: function (a, b) {
        var c = this.settings.messages[a];
        return c && (c.constructor == String ? c : c[b])
      },
      findDefined: function () {
        for (var a = 0; a < arguments.length; a++)
          if (arguments[a] !== undefined) return arguments[a]
      },
      defaultMessage: function (b, d) {
        return this.findDefined(this.customMessage(b.name, d), this.customMetaMessage(b, d), !this.settings.ignoreTitle && b.title || undefined, a.validator.messages[d], "<strong>Warning: No message defined for " + b.name + "</strong>")
      },
      formatAndAdd: function (a, b) {
        var c = this.defaultMessage(a, b.method),
          d = /\$?\{(\d+)\}/g;
        typeof c == "function" ? c = c.call(this, b.parameters, a) : d.test(c) && (c = jQuery.format(c.replace(d, "{$1}"), b.parameters)), this.errorList.push({
          message: c,
          element: a
        }), this.errorMap[a.name] = c, this.submitted[a.name] = c
      },
      addWrapper: function (a) {
        return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
      },
      defaultShowErrors: function () {
        for (var a = 0; this.errorList[a]; a++) {
          var b = this.errorList[a];
          this.settings.highlight && this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass), this.showLabel(b.element, b.message)
        }
        this.errorList.length && (this.toShow = this.toShow.add(this.containers));
        if (this.settings.success)
          for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
        if (this.settings.unhighlight) {
          a = 0;
          for (b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass)
        }
        this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
      },
      validElements: function () {
        return this.currentElements.not(this.invalidElements())
      },
      invalidElements: function () {
        return a(this.errorList).map(function () {
          return this.element
        })
      },
      showLabel: function (b, d) {
        var e = this.errorsFor(b);
        e.length ? (e.removeClass(this.settings.validClass).addClass(this.settings.errorClass), e.attr("generated") && e.html(d)) : (e = a("<" + this.settings.errorElement + "/>").attr({
          "for": this.idOrName(b),
          generated: !0
        }).addClass(this.settings.errorClass).html(d || ""), this.settings.wrapper && (e = e.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(e).length || (this.settings.errorPlacement ? this.settings.errorPlacement(e, a(b)) : e.insertAfter(b))), !d && this.settings.success && (e.text(""), typeof this.settings.success == "string" ? e.addClass(this.settings.success) : this.settings.success(e)), this.toShow = this.toShow.add(e)
      },
      errorsFor: function (b) {
        var d = this.idOrName(b);
        return this.errors().filter(function () {
          return a(this).attr("for") == d
        })
      },
      idOrName: function (a) {
        return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
      },
      validationTargetFor: function (a) {
        return this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]), a
      },
      checkable: function (a) {
        return /radio|checkbox/i.test(a.type)
      },
      findByName: function (b) {
        var d = this.currentForm;
        return a(document.getElementsByName(b)).map(function (a, c) {
          return c.form == d && c.name == b && c || null
        })
      },
      getLength: function (b, d) {
        switch (d.nodeName.toLowerCase()) {
        case "select":
          return a("option:selected", d).length;
        case "input":
          if (this.checkable(d)) return this.findByName(d.name).filter(":checked").length
        }
        return b.length
      },
      depend: function (a, b) {
        return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
      },
      dependTypes: {
        "boolean": function (a) {
          return a
        },
        string: function (b, d) {
          return !!a(b, d.form).length
        },
        "function": function (a, b) {
          return a(b)
        }
      },
      optional: function (b) {
        return !a.validator.methods.required.call(this, a.trim(b.value), b) && "dependency-mismatch"
      },
      startRequest: function (a) {
        this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
      },
      stopRequest: function (b, d) {
        this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], d && this.pendingRequest == 0 && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !d && this.pendingRequest == 0 && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
      },
      previousValue: function (b) {
        return a.data(b, "previousValue") || a.data(b, "previousValue", {
          old: null,
          valid: !0,
          message: this.defaultMessage(b, "remote")
        })
      }
    },
    classRuleSettings: {
      required: {
        required: !0
      },
      email: {
        email: !0
      },
      url: {
        url: !0
      },
      date: {
        date: !0
      },
      dateISO: {
        dateISO: !0
      },
      dateDE: {
        dateDE: !0
      },
      number: {
        number: !0
      },
      numberDE: {
        numberDE: !0
      },
      digits: {
        digits: !0
      },
      creditcard: {
        creditcard: !0
      }
    },
    addClassRules: function (b, d) {
      b.constructor == String ? this.classRuleSettings[b] = d : a.extend(this.classRuleSettings, b)
    },
    classRules: function (b) {
      var d = {};
      return (b = a(b).attr("class")) && a.each(b.split(" "), function () {
        this in a.validator.classRuleSettings && a.extend(d, a.validator.classRuleSettings[this])
      }), d
    },
    attributeRules: function (b) {
      var d = {};
      b = a(b);
      for (var e in a.validator.methods) {
        var f;
        (f = e === "required" && typeof a.fn.prop == "function" ? b.prop(e) : b.attr(e)) ? d[e] = f : b[0].getAttribute("type") === e && (d[e] = !0)
      }
      return d.maxlength && /-1|2147483647|524288/.test(d.maxlength) && delete d.maxlength, d
    },
    metadataRules: function (b) {
      if (!a.metadata) return {};
      var d = a.data(b.form, "validator").settings.meta;
      return d ? a(b).metadata()[d] : a(b).metadata()
    },
    staticRules: function (b) {
      var d = {}, e = a.data(b.form, "validator");
      return e.settings.rules && (d = a.validator.normalizeRule(e.settings.rules[b.name]) || {}), d
    },
    normalizeRules: function (b, d) {
      return a.each(b, function (e, f) {
        if (f === !1) delete b[e];
        else if (f.param || f.depends) {
          var g = !0;
          switch (typeof f.depends) {
          case "string":
            g = !! a(f.depends, d.form).length;
            break;
          case "function":
            g = f.depends.call(d, d)
          }
          g ? b[e] = f.param !== undefined ? f.param : !0 : delete b[e]
        }
      }), a.each(b, function (e, f) {
        b[e] = a.isFunction(f) ? f(d) : f
      }), a.each(["minlength", "maxlength", "min", "max"], function () {
        b[this] && (b[this] = Number(b[this]))
      }), a.each(["rangelength", "range"], function () {
        b[this] && (b[this] = [Number(b[this][0]), Number(b[this][1])])
      }), a.validator.autoCreateRanges && (b.min && b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), b.minlength && b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b.messages && delete b.messages, b
    },
    normalizeRule: function (b) {
      if (typeof b == "string") {
        var d = {};
        a.each(b.split(/\s/), function () {
          d[this] = !0
        }), b = d
      }
      return b
    },
    addMethod: function (b, d, e) {
      a.validator.methods[b] = d, a.validator.messages[b] = e != undefined ? e : a.validator.messages[b], d.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
    },
    methods: {
      required: function (b, d, e) {
        if (!this.depend(e, d)) return "dependency-mismatch";
        switch (d.nodeName.toLowerCase()) {
        case "select":
          return (b = a(d).val()) && b.length > 0;
        case "input":
          if (this.checkable(d)) return this.getLength(b, d) > 0;
        default:
          return a.trim(b).length > 0
        }
      },
      remote: function (b, d, e) {
        if (this.optional(d)) return "dependency-mismatch";
        var f = this.previousValue(d);
        this.settings.messages[d.name] || (this.settings.messages[d.name] = {}), f.originalMessage = this.settings.messages[d.name].remote, this.settings.messages[d.name].remote = f.message, e = typeof e == "string" && {
          url: e
        } || e;
        if (this.pending[d.name]) return "pending";
        if (f.old === b) return f.valid;
        f.old = b;
        var g = this;
        this.startRequest(d);
        var h = {};
        return h[d.name] = b, a.ajax(a.extend(!0, {
          url: e,
          mode: "abort",
          port: "validate" + d.name,
          dataType: "json",
          data: h,
          success: function (e) {
            g.settings.messages[d.name].remote = f.originalMessage;
            var h = e === !0;
            if (h) {
              var i = g.formSubmitted;
              g.prepareElement(d), g.formSubmitted = i, g.successList.push(d), g.showErrors()
            } else i = {}, e = e || g.defaultMessage(d, "remote"), i[d.name] = f.message = a.isFunction(e) ? e(b) : e, g.showErrors(i);
            f.valid = h, g.stopRequest(d, h)
          }
        }, e)), "pending"
      },
      minlength: function (b, d, e) {
        return this.optional(d) || this.getLength(a.trim(b), d) >= e
      },
      maxlength: function (b, d, e) {
        return this.optional(d) || this.getLength(a.trim(b), d) <= e
      },
      rangelength: function (b, d, e) {
        return b = this.getLength(a.trim(b), d), this.optional(d) || b >= e[0] && b <= e[1]
      },
      min: function (a, b, c) {
        return this.optional(b) || a >= c
      },
      max: function (a, b, c) {
        return this.optional(b) || a <= c
      },
      range: function (a, b, c) {
        return this.optional(b) || a >= c[0] && a <= c[1]
      },
      email: function (a, b) {
        return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)
      },
      url: function (a, b) {
        return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
      },
      date: function (a, b) {
        return this.optional(b) || !/Invalid|NaN/.test(new Date(a))
      },
      dateISO: function (a, b) {
        return this.optional(b) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)
      },
      number: function (a, b) {
        return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)
      },
      digits: function (a, b) {
        return this.optional(b) || /^\d+$/.test(a)
      },
      creditcard: function (a, b) {
        if (this.optional(b)) return "dependency-mismatch";
        if (/[^0-9 -]+/.test(a)) return !1;
        var c = 0,
          d = 0,
          e = !1;
        a = a.replace(/\D/g, "");
        for (var f = a.length - 1; f >= 0; f--) d = a.charAt(f), d = parseInt(d, 10), e && (d *= 2) > 9 && (d -= 9), c += d, e = !e;
        return c % 10 == 0
      },
      accept: function (a, b, c) {
        return c = typeof c == "string" ? c.replace(/,/g, "|") : "png|jpe?g|gif", this.optional(b) || a.match(RegExp(".(" + c + ")$", "i"))
      },
      equalTo: function (b, d, e) {
        return e = a(e).unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
          a(d).valid()
        }), b == e.val()
      }
    }
  }), a.format = a.validator.format
}(jQuery),

function (a) {
  var b = {};
  if (a.ajaxPrefilter) a.ajaxPrefilter(function (a, c, d) {
    c = a.port, a.mode == "abort" && (b[c] && b[c].abort(), b[c] = d)
  });
  else {
    var c = a.ajax;
    a.ajax = function (d) {
      var e = ("port" in d ? d : a.ajaxSettings).port;
      return ("mode" in d ? d : a.ajaxSettings).mode == "abort" ? (b[e] && b[e].abort(), b[e] = c.apply(this, arguments)) : c.apply(this, arguments)
    }
  }
}(jQuery),

function (a) {
  !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && a.each({
    focus: "focusin",
    blur: "focusout"
  }, function (b, d) {
    function e(b) {
      return b = a.event.fix(b), b.type = d, a.event.handle.call(this, b)
    }
    a.event.special[d] = {
      setup: function () {
        this.addEventListener(b, e, !0)
      },
      teardown: function () {
        this.removeEventListener(b, e, !0)
      },
      handler: function (b) {
        return arguments[0] = a.event.fix(b), arguments[0].type = d, a.event.handle.apply(this, arguments)
      }
    }
  }), a.extend(a.fn, {
    validateDelegate: function (b, d, e) {
      return this.bind(d, function (d) {
        var f = a(d.target);
        if (f.is(b)) return e.apply(f, arguments)
      })
    }
  })
}(jQuery), window.JsViews || window.jQuery && jQuery.views || function (a, b) {
  function B(a, b, c, d, e) {
    c = c || {
      viewsCount: 0,
      ctx: f.helpers
    };
    var g = c && c.ctx;
    return {
      jsViews: "v1.0pre",
      path: b || "",
      itemNumber: ++c.viewsCount || 1,
      viewsCount: 0,
      tmpl: e,
      data: d || c.data || {},
      ctx: a && a === g ? g : g ? l(l({}, g), a) : a || {},
      parent: c
    }
  }

  function C(a, b, c, d, e, f, g, h) {
    return c ? (d ? e ? "$view." + e : c : "$data." + c) + (f || "") : g || b || ""
  }

  function D(a) {
    function j(b) {
      b -= c, b && g.push(a.substr(c, b).replace(t, "\\n"))
    }

    function k(a, e, i, k, l, o, p, q, t, v) {
      function D(a, b, c, d, e, f, g, h, i, j, k) {
        return B ? (B = !g, B ? a : '"') : A ? (A = !h, A ? a : '"') : d ? b.replace(r, C) + d : e ? z ? "" : (x = n, "\b" + b + ":") : c ? (z++, b.replace(r, C) + "(") : i ? (z--, ")") : b ? b.replace(r, C) : f ? "," : j ? z ? "" : x ? (x = m, "\b") : "," : (B = g, A = h, '"')
      }
      var x, y = "",
        z = 0,
        A = m,
        B = m;
      i = i || k, j(v), l ? f.allowCode && g.push(["*", o.replace(u, "$1")]) : i ? (i === "else" && (h = d.pop(), g = h[2], e = n), o = o ? (o + " ").replace(s, D).replace(w, function (a, b, c) {
        return y += b + ",", ""
      }) : "", o = o.slice(0, -1), b = [i, p ? q || "none" : "", e && [], "{" + y + "_hash:'" + y + "',_path:'" + o + "'}", o], e && (d.push(h), h = b), g.push(b)) : t && (h = d.pop()), c = v + a.length;
      if (!h) throw "Expected block tag";
      g = h[2]
    }
    var b, c = 0,
      d = [],
      e = [],
      g = e,
      h = [, , e];
    return a = a.replace(v, "\\$1"), a.replace(i, k), j(a.length), E(e)
  }

  function E(a) {
    var b, c, d, e = [],
      f = a.length,
      g = "try{var views=" + (o ? "jQuery" : "JsViews") + '.views,tag=views.renderTag,enc=views.encode,html=views.encoders.html,$ctx=$view && $view.ctx,result=""+\n\n';
    for (d = 0; d < f; d++) {
      c = a[d];
      if (c[0] === "*") g = g.slice(0, d ? -1 : -3) + ";" + c[1] + (d + 1 < f ? "result+=" : "");
      else if ("" + c === c) g += '"' + c + '"+';
      else {
        var h = c[0],
          i = c[1],
          j = c[2],
          k = c[3],
          l = c[4],
          m = l + '||"")+';
        j && e.push(E(j)), g += h === "=" ? !i || i === "html" ? "html(" + m : i === "none" ? "(" + m : 'enc("' + i + '",' + m : 'tag("' + h + '",$view,"' + (i || "") + '",' + (j ? e.length : '""') + "," + k + (l ? "," : "") + l + ")+"
      }
    }
    return b = new Function("$data, $view", g.slice(0, -1) + ";return result;\n\n}catch(e){return views.err(e);}"), b.nested = e, b
  }

  function F(a) {
    return y[a] || (y[a] = "&#" + a.charCodeAt(0) + ";")
  }

  function G(a) {
    try {
      return c(a)
    } catch (b) {}
    return a
  }
  var c, d, e, f, g, h, i, j, k, l, m = !1,
    n = !0,
    o = a.jQuery,
    p = a.document,
    q = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
    r = /^(true|false|null|[\d\.]+)|(\w+|\$(view|data|ctx|(\w+)))([\w\.]*)|((['"])(?:\\\1|.)*\7)$/g,
    s = /(\$?[\w\.\[\]]+)(?:(\()|\s*(===|!==|==|!=|<|>|<=|>=)\s*|\s*(\=)\s*)?|(\,\s*)|\\?(\')|\\?(\")|(\))|(\s+)/g,
    t = /\r?\n/g,
    u = /\\(['"])/g,
    v = /\\?(['"])/g,
    w = /\x08([^\x08]+)\x08/g,
    x = 0,
    y = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    }, z = /[\x00"&'<>]/g,
    A = Array.prototype.slice;
  o ? (c = o, c.fn.extend({
    render: function (a, b, c, d) {
      return h(a, this[0], b, c, d)
    },
    template: function (a, b) {
      return c.template(a, this[0], b)
    }
  })) : (d = a.$, a.JsViews = e = a.$ = c = {
    extend: function (a, b) {
      var c;
      for (c in b) a[c] = b[c];
      return a
    },
    isArray: Array.isArray || function (a) {
      return Object.prototype.toString.call(a) === "[object Array]"
    },
    noConflict: function () {
      return a.$ === e && (a.$ = d), e
    }
  }), l = c.extend, l(c, {
    views: f = {
      templates: {},
      tags: {
        "if": function () {
          var a = this,
            c = a._view;
          return c.onElse = function (a, d) {
            var e = 0,
              f = d.length;
            while (f && !d[e++])
              if (e === f) return "";
            return c.onElse = b, h(c.data, a.tmpl, c.ctx, c)
          }, c.onElse(this, arguments)
        },
        "else": function () {
          var a = this._view;
          return a.onElse ? a.onElse(this, arguments) : ""
        },
        each: function () {
          var a, b = this,
            c = "",
            d = arguments,
            e = d.length,
            f = b.tmpl,
            g = b._view;
          for (a = 0; a < e; a++) c += d[a] ? h(d[a], f, b.ctx || g.ctx, g, b._path, b._ctor) : "";
          return e ? c : c + h(g.data, f, g.ctx, g, b._path, b.tag)
        },
        "=": function (a) {
          return a
        },
        "*": function (a) {
          return a
        }
      },
      helpers: {
        not: function (a) {
          return !a
        }
      },
      allowCode: m,
      debugMode: n,
      err: function (a) {
        return f.debugMode ? "<br/><b>Error:</b> <em> " + (a.message || a) + ". </em>" : '""'
      },
      setDelimiters: function (a, b) {
        var c = b.charAt(0),
          d = b.charAt(1);
        a = "\\" + a.charAt(0) + "\\" + a.charAt(1), b = "\\" + c + "\\" + d, i = a + "(?:(?:(\\#)?(\\w+(?=[!\\s\\" + c + "]))" + "|(?:(\\=)|(\\*)))" + "\\s*((?:[^\\" + c + "]|\\" + c + "(?!\\" + d + "))*?)" + "(!(\\w*))?" + "|(?:\\/([\\w\\$\\.\\[\\]]+)))" + b, i = new RegExp(i, "g")
      },
      registerTags: j = function (a, b) {
        var c;
        if (typeof a == "object")
          for (c in a) j(c, a[c]);
        else f.tags[a] = b;
        return this
      },
      registerHelpers: k = function (a, b) {
        if (typeof a == "object") {
          var c;
          for (c in a) k(c, a[c])
        } else f.helpers[a] = b;
        return this
      },
      encode: function (a, b) {
        return b ? (g[a || "html"] || g.html)(b) : ""
      },
      encoders: g = {
        none: function (a) {
          return a
        },
        html: function (a) {
          return String(a).replace(z, F)
        }
      },
      renderTag: function (a, c, d, e, g) {
        var h, i, j, k = arguments,
          m = f.presenters;
        return hash = g._hash, tagFn = f.tags[a], tagFn ? (e = e && c.tmpl.nested[e - 1], g.tmpl = g.tmpl || e || b, m && m[a] && (i = l(l({}, g.ctx), g), delete i.ctx, delete i._path, delete i.tmpl, g.ctx = i, g._ctor = a + (hash ? "=" + hash.slice(0, -1) : ""), g = l(l({}, tagFn), g), tagFn = f.tags.each), g._encode = d, g._view = c, h = tagFn.apply(g, k.length > 5 ? A.call(k, 5) : [c.data]), h || (h === b ? "" : h.toString())) : ""
      }
    },
    render: h = function (a, b, d, e, g, h) {
      var i, j, k, l, m, n = "";
      arguments.length === 2 && a.jsViews && (e = a, d = e.ctx, a = e.data), b = c.template(b);
      if (!b) return "";
      if (c.isArray(a)) {
        l = new B(d, g, e, a), j = a.length;
        for (i = 0, j = a.length; i < j; i++) k = a[i], m = k ? b(k, new B(d, g, l, k, b, this)) : "", n += f.activeViews ? "<!--item-->" + m + "<!--/item-->" : m
      } else n += b(a, new B(d, g, e, a, b));
      return f.activeViews ? "<!--tmpl(" + (g || "") + ") " + (h ? "tag=" + h : b._name) + "-->" + n + "<!--/tmpl-->" : n
    },
    template: function (a, b) {
      return b ? ("" + b === b ? b = D(b) : o && b instanceof c && (b = b[0]), b && (o && b.nodeType && (b = c.data(b, "tmpl") || c.data(b, "tmpl", D(b.innerHTML))), f.templates[b._name = b._name || a || "_" + x++] = b), b) : a ? "" + a !== a ? a._name ? a : c.template(null, a) : f.templates[a] || c.template(null, q.test(a) ? a : G(a)) : null
    }
  }), f.setDelimiters("{{", "}}")
}(window);
var MiniPlayer = {
  PLAYER_READY: "onPlayerReady",
  PLAY_REQUESTED: "onPlayRequested",
  PLAY_STOPPED: "onPlayStopped",
  TRACK_EVENT: "onTrackEvent",
  TRACK_METADATA: "onTrackMetadata",
  MUTE_CHANGED: "onMuteChanged",
  MODE_CHANGED: "onModeChanged",
  PLAY_TIMER: "onPlayTimer",
  ANONYMOUS_ACCOUNT_CREATED: "onAnonymousAccountCreated",
  ERROR: "onError",
  PLAYBACK_SESSION_EXPIRED: "onPlaybackSessionExpired",
  DEBUG: "onDebug",
  CONNECTED: "Connected",
  READY_TO_PLAY: "ReadyToPlay",
  PLAY_STARTED: "PlayStarted",
  UNPAUSED: "Unpaused",
  PAUSED: "Paused",
  PLAY_COMPLETE: "PlayComplete",
  PLAY_INTERRUPTED: "PlayInterrupted",
  CONNECTION_FAILED: "ConnectionFailed",
  NOT_FOUND: "StreamNotFound",
  PLAY_FAILED: "PlayFailed",
  SEEK_FAILED: "SeekFailed",
  BUFFER_FULL: "BufferFull",
  BUFFER_EMPTY: "BufferEmpty",
  IDLE_TIMEOUT: "IdleTimeout",
  NETWORK_CHANGED: "NetworkChanged",
  NETWORK_DROPPED: "NetworkDropped",
  INVALID_PASSWORD: "InvalidPassword",
  INVALID_USERNAME: "InvalidUsername",
  RADIO_MODE: "RadioMode",
  TRACK_MODE: "TrackMode",
  statuses: {
    INITIALIZING: 0,
    READY: 1,
    IDLE: 2,
    CONNECTING: 3,
    BUFFERING: 4,
    PLAYING: 5,
    PAUSED: 6,
    STOPPED: 7,
    INTERRUPTED: 8
  },
  status: 0,
  ready: !1,
  player: null,
  subscribers: [],
  token: null,
  sessionID: null,
  machineID: null,
  username: null,
  guid: null,
  rhapComURL: "http://www.rhapsody.com/",
  rhap25AuthURL: "",
  playSamples: !1,
  playsRemaining: NaN,
  cookieName: "miniPlayer",
  debug: !1,
  debugHistory: [],
  currentTrack: null,
  currentTime: NaN,
  paused: !1,
  stopped: !0,
  idle: !1,
  seekTo: NaN,
  interrupted: null,
  volume: 1,
  storage: window.localStorage,
  settingsChanged: !1,
  mode: "TrackMode",
  radio: {
    channelID: null,
    stationName: null,
    queue: {
      items: new Array(2),
      currentTrack: function () {
        return this.items[0]
      },
      play: function (a, b) {
        var c = this.currentTrack();
        if (MiniPlayer.mode == MiniPlayer.RADIO_MODE && c && !a && MiniPlayer.paused) {
          c.play(!0);
          return
        }
        a && (MiniPlayer.radio.channelID = a), b && (MiniPlayer.radio.stationName = b), MiniPlayer.notify(MiniPlayer.PLAY_REQUESTED, {
          channelID: a
        }), MiniPlayer.player.playRadio(MiniPlayer.radio.channelID, null, MiniPlayer.token, MiniPlayer.sessionID, MiniPlayer.machineID, MiniPlayer.guid)
      },
      pause: function () {
        this.currentTrack().pause()
      },
      addItem: function (a) {
        this.items[1] && (this.items[0] = this.items[1]), this.items[1] = a
      },
      hasNext: function () {
        this.items[1] != null
      },
      hasPrevious: function () {
        return null
      },
      getNext: function () {
        return this.items[1] ? {
          track: this.items[1]
        } : null
      },
      getPrevious: function () {
        return null
      },
      playNext: function () {
        var a = this.getNext();
        a && typeof a.track != "undefined" && (MiniPlayer.notify(MiniPlayer.PLAY_REQUESTED, {
          channelID: MiniPlayer.radio.channelID,
          trackID: a.track.id
        }), MiniPlayer.player.playRadio(MiniPlayer.radio.channelID, null, MiniPlayer.token, MiniPlayer.sessionID, MiniPlayer.machineID, MiniPlayer.guid))
      },
      playPrevious: function () {
        return
      },
      stop: function () {
        this.channelID = null, this.stationName = null;
        var a = this.currentTrack();
        a && a.stop(), MiniPlayer.stopped = !0, MiniPlayer.notify(MiniPlayer.STOPPED)
      }
    },
    play: function (a, b) {
      this.queue.play(a, b)
    },
    stop: function () {
      this.queue.stop()
    }
  },
  onPlayerReady: function () {
    typeof ClientPlayer != "undefined" ? this.player = ClientPlayer : navigator.appName.indexOf("Microsoft") != -1 ? this.player = window.MiniPlayerApp : this.player = document.MiniPlayerApp;
    if (this.player) {
      var a = MiniPlayerUtil.readCookie(this.cookieName);
      a && (this.sessionID = a.sessionID, this.machineID = a.machineID), this
        .load(), this.ready = !0, this.status = this.statuses.READY, this.notify(this.PLAYER_READY, {})
    }
    this.debug && this.notify(this.DEBUG, {
      message: "Flash Player Version: " + MiniPlayerUtil.ControlVersion() + MiniPlayerUtil.GetSwfVer()
    });
    var b = setInterval(function () {
      MiniPlayer.settingsChanged && (MiniPlayer.settingsChanged = !1, MiniPlayer.save())
    }, 2e3)
  },
  onPlayStopped: function () {
    this.stopped = !0, this.status = this.statuses.STOPPED, this.notify(this.PLAY_STOPPED)
  },
  onTrackEvent: function (a, b, c) {
    if (this.debug) {
      var d = this.debugHistory[this.debugHistory.length - 1];
      if (b == this.CONNECTED) d.connected = (new Date).getTime();
      else if (b == this.PLAY_STARTED && !d.playStarted) {
        this.idle ? this.notify(this.DEBUG, {
          message: "Recovering from idle state (" + this.currentTrack + ", " + this.currentTime + " s)"
        }) : this.interrupted && this.notify(this.DEBUG, {
          message: "Recovering from connection interruption (" + this.currentTrack + ", " + this.currentTime + " s)"
        }), d.playStarted = (new Date).getTime();
        var e = 0,
          f = 0;
        for (var g = 0; g < this.debugHistory.length; g++) e += this.debugHistory[g].playStarted - this.debugHistory[g].playRequested, f += this.debugHistory[g].playStarted - this.debugHistory[g].metadataRetrieved;
        this.notify(this.DEBUG, {
          message: "Connection request to stream start: " + (d.playStarted - d.metadataRetrieved).toString() + " ms (Average: " + Math.floor(f / this.debugHistory.length).toString() + " ms)"
        }), this.notify(this.DEBUG, {
          message: "Play request to stream start: " + (d.playStarted - d.playRequested).toString() + " ms (Average: " + Math.floor(e / this.debugHistory.length).toString() + " ms)"
        })
      } else b == this.PLAY_INTERRUPTED ? this.notify(this.DEBUG, {
        message: "[PLAYBACK ERROR] " + b + " occurred for track " + this.debugHistory[this.debugHistory.length - 1].id
      }) : b == this.CONNECTION_FAILED || b == this.PLAY_FAILED || b == this.SEEK_FAILED ? this.notify(this.DEBUG, {
        message: "[PLAYBACK ERROR] " + b + " occurred for track " + this.debugHistory[this.debugHistory.length - 1].id
      }) : b == this.IDLE_TIMEOUT && this.notify(this.DEBUG, {
        message: "Entering idle state (" + this.currentTrack + ", " + this.currentTime + " s)"
      });
      this.notify(this.DEBUG, {
        message: b + " (" + a + (c ? ", " + c : "") + ")"
      })
    }
    if (b == this.PLAY_STARTED) this.idle ? (this.idle = !1, a == this.currentTrack && this.seekTrack(this.currentTrack, this.seekTo || this.currentTime)) : this.interrupted && (a == this.currentTrack && ((new Date).getTime() - this.interrupted < 1e4 ? this.seekTrack(this.currentTrack, this.currentTime) : this.pauseTrack()), this.interrupted = null), this.seekTo = NaN, this.paused = !1, this.stopped = !1, this.status = this.statuses.PLAYING;
    else if (b == this.PAUSED || b == this.UNPAUSED) b == this.PAUSED ? (this.paused = !0, this.status = this.statuses.PAUSED) : (this.paused = !1, this.status = this.statuses.PLAYING);
    else {
      if (b == this.PLAY_INTERRUPTED) {
        this.interrupted = (new Date).getTime(), this.status = this.statuses.INTERRUPTED, this.playTrack(this.currentTrack);
        return
      }
      b == this.PLAY_COMPLETE ? (this.stopped = !0, this.status = this.statuses.STOPPED) : b == this.IDLE_TIMEOUT ? (this.idle = !0, this.status = this.statuses.IDLE) : b == this.SEEK_FAILED ? this.idle && this.playTrack(this.currentTrack) : b == this.BUFFER_EMPTY ? this.status = this.statuses.BUFFERING : b != this.BUFFER_FULL && (b == this.NOT_FOUND ? (this.stopped = !0, this.status = this.statuses.STOPPED) : b != this.NETWORK_CHANGED && b != this.NETWORK_DROPPED)
    }
    this.notify(this.TRACK_EVENT, {
      id: a,
      code: b,
      detail: c
    })
  },
  onTrackMetadata: function (a, b) {
    if (this.debug) {
      var c = this.debugHistory[this.debugHistory.length - 1];
      c.metadataRetrieved = (new Date).getTime();
      var d = 0;
      for (var e = 0; e < this.debugHistory.length; e++) d += this.debugHistory[e].metadataRetrieved - this.debugHistory[e].playRequested;
      this.notify(this.DEBUG, {
        message: "Play request to metadata response (" + c.id + "): " + (c.metadataRetrieved - c.playRequested) + " ms (Average: " + Math.floor(d / this.debugHistory.length).toString() + " ms)"
      })
    }
    b.nextTrack && (this.radio.queue.addItem(new Track(a, b.title, b.artistName, b.albumID, b.albumThumbnailURL)), this.radio.queue.addItem(new Track(b.nextTrack.trackID, b.nextTrack.title, b.nextTrack.artistName, b.nextTrack.albumID, b.nextTrack.albumThumbnailURL))), this.notify(this.TRACK_METADATA, {
      id: a,
      data: b
    })
  },
  onMuteChanged: function (a) {
    this.notify(this.MUTE_CHANGED, {
      muted: a
    })
  },
  onPlayTimer: function (a, b, c) {
    this.currentTrack = a, this.currentTime = b, this.status = this.statuses.PLAYING, this.notify(this.PLAY_TIMER, {
      id: a,
      currentTime: b,
      totalTime: c
    })
  },
  onAnonymousAccountCreated: function (eventData) {
    var o = eval("(" + eventData.data + ")");
    this.token = o.token, this.sessionID = o.sessionID, this.machineID = o.machineID, this.playsRemaining = o.playsRemaining, MiniPlayerUtil.setCookie(this.cookieName, {
      sessionID: this.sessionID,
      machineID: this.machineID
    }, 365), this.notify(this.ANONYMOUS_ACCOUNT_CREATED, {
      token: this.token
    })
  },
  onError: function (a, b) {
    this.debug && this.notify(this.DEBUG, {
      message: a + " (" + this.currentTrack + (b ? ", " + b : "") + ")"
    }), this.notify(this.ERROR, {
      code: a,
      detail: b
    })
  },
  onPlaybackSessionIDChanged: function (a) {
    this.sessionID = a
  },
  onPlaybackSessionExpired: function () {
    this.stopped = !0, this.sessionID = null, this.notify(this.PLAYBACK_SESSION_EXPIRED, {})
  },
  setToken: function (a, b, c) {
    this.token = a, this.sessionID = null;
    if (!this.machineID || this.machineID == "null") this.machineID = MiniPlayerUtil.uuid();
    this.username = b, this.guid = c, MiniPlayerUtil.setCookie(this.cookieName, {
      sessionID: this.sessionID,
      machineID: this.machineID,
      userName: this.username
    })
  },
  setMode: function (a) {
    if (a != this.mode) {
      var b = this.mode;
      this.mode = a, this.notify(this.MODE_CHANGED, {
        oldMode: b,
        newMode: a
      })
    }
  },
  createAnonymousAccount: function () {
    return;
    var a
  },
  playSample: function (a, b) {
    this.player && (this.mode == this.RADIO_MODE && !this.paused && (this.setMode(this.TRACK_MODE), this.radio.stop()), this.player.playSample(a, b), this.status = this.statuses.CONNECTING, this.notify(this.PLAY_REQUESTED, {
      trackID: a
    }), this.debug && (this.notify(this.DEBUG, {
      message: "Token: " + this.token
    }), this.notify(this.DEBUG, {
      message: "Session ID: " + this.sessionID
    }), this.notify(this.DEBUG, {
      message: "Machine ID: " + this.machineID
    })))
  },
  playTrack: function (a, b) {
    if (!this.token) return;
    var c;
    this.player && (this.mode == this.RADIO_MODE && !this.paused && (this.setMode(this.TRACK_MODE), this.radio.stop()), b && (b.sourceType == "ALBUM" || b.sourceType == "PLAYLIST" ? b.recToken ? c = {
      playback: {
        recommendationId: b.recToken,
        source: {
          type: b.sourceType,
          id: b.sourceId
        }
      }
    } : c = {
      playback: {
        source: {
          type: b.sourceType,
          id: b.sourceId
        }
      }
    } : b.recToken && (c = {
      playback: {
        recommendationId: b.recToken
      }
    })), this.status = this.statuses.CONNECTING, this.notify(this.PLAY_REQUESTED, {
      trackID: a
    }), this.player.playTrack(a, this.token, this.sessionID, this.machineID, this.username, this.guid, c), this.debug && (this.notify(this.DEBUG, {
      message: "Token: " + this.token
    }), this.notify(this.DEBUG, {
      message: "Session ID: " + this.sessionID
    }), this.notify(this.DEBUG, {
      message: "Machine ID: " + this.machineID
    })), this.debug && !this.idle && !this.paused && this.debugHistory.push({
      id: a,
      playRequested: (new Date).getTime()
    }))
  },
  pauseTrack: function () {
    this.player && this.player.pauseTrack()
  },
  stopTrack: function () {
    this.player && this.player.stopTrack()
  },
  seekTrack: function (a, b) {
    this.player && (this.seekTo = b, this.player.seekTrack(a, b))
  },
  playRadio: function (a, b) {
    if (!this.token) return;
    this.player && (this.setMode(this.RADIO_MODE), this.status = this.statuses.CONNECTING, this.radio.play(a, b), this.debug && (this.notify(this.DEBUG, {
      message: "Token: " + this.token
    }), this.notify(this.DEBUG, {
      message: "Session ID: " + this.sessionID
    }), this.notify(this.DEBUG, {
      message: "Machine ID: " + this.machineID
    })))
  },
  toggleMute: function () {
    this.player && this.player.toggleMute()
  },
  setVolume: function (a) {
    this.player && (this.player.setVolume(a), this.volume = a, this.settingsChanged = !0)
  },
  secondsToTime: function (a) {
    if (!isNaN(a)) {
      var b = Math.floor(a / 60),
        c = Math.floor(a) % 60;
      return b + ":" + (c < 10 ? "0" + c : c)
    }
    return "0:00"
  },
  subscribe: function (a, b) {
    this.subscribers.push({
      eventName: a,
      handler: b
    })
  },
  unsubscribe: function (a, b) {
    for (var c = 0; c < this.subscribers.length; c++) this.subscribers[c].eventName == a && this.subscribers[c].handler == b && this.subscribers.splice(c, 1)
  },
  notify: function (a, b) {
    for (var c = 0; c < this.subscribers.length; c++) this.subscribers[c].eventName == a && typeof this.subscribers[c].handler == "function" && this.subscribers[c].handler(b)
  },
  embed: function (a, b, c, d, e) {
    this.player || (document.getElementById(b).innerHTML = MiniPlayerUtil.getPlayer(a, c, d || "production", e || "40134"))
  },
  setDebug: function (a) {
    this.debug = a
  },
  getBrowserInfo: function () {
    return {
      type: MiniPlayerUtil.browserInfo.browser(),
      version: MiniPlayerUtil.browserInfo.version()
    }
  },
  save: function () {
    this.storage ? this.storage.setItem(this.storageKey(), JSON.stringify(this.squish())) : MiniPlayerUtil.setCookie(this.storageKey(), JSON.stringify(this.squish()))
  },
  load: function () {
    var a = this.storage ? this.storage.getItem(this.storageKey()) : MiniPlayerUtil.readCookie(this.storageKey());
    if (a) {
      var b = JSON.parse(a);
      this.setVolume(b.volume)
    }
  },
  squish: function () {
    return {
      volume: this.volume
    }
  },
  storageKey: function () {
    return this.cookieName + "_settings"
  }
}, MiniPlayerUtil = {
    readCookie: function (a) {
      var b = a + "=",
        c = document.cookie.split(";");
      for (var d = 0; d < c.length; d++) {
        var e = c[d],
          f;
        while (e.charAt(0) == " ") e = e.substring(1, e.length);
        e.indexOf(b) == 0 && (f = unescape(e.substring(b.length, e.length)));
        if (f) {
          var g = {}, h = f.split("&");
          for (d = 0; d < h.length; d++) {
            var i = h[d].split("=");
            g[i[0]] = unescape(i[1])
          }
          return g
        }
      }
      return null
    },
    setCookie: function (a, b, c) {
      if (typeof b == "object") {
        var d = [];
        for (var e in b) d.push(e + "=" + escape(b[e]));
        b = d.join("&")
      }
      var f = "";
      if (c) {
        var g = new Date;
        g.setTime(g.getTime() + c * 24 * 60 * 60 * 1e3), f += "; expires=" + g.toGMTString()
      }
      document.cookie = a + "=" + escape(b || "") + f + "; path=/"
    },
    deleteCookie: function (a) {
      createCookie(a, "", -1)
    },
    uuid: function () {
      var a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
        var b = Math.random() * 16 | 0,
          c = a == "x" ? b : b & 3 | 8;
        return c.toString(16)
      }).toUpperCase();
      return a
    },
    isIE: navigator.appVersion.indexOf("MSIE") != -1,
    isWin: navigator.appVersion.toLowerCase().indexOf("win") != -1,
    isOpera: navigator.userAgent.indexOf("Opera") != -1,
    ControlVersion: function () {
      var a, b, c;
      try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), a = b.GetVariable("$version")
      } catch (c) {}
      if (!a) try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), a = "WIN 6,0,21,0", b.AllowScriptAccess = "always", a = b.GetVariable("$version")
      } catch (c) {}
      if (!a) try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"), a = b.GetVariable("$version")
      } catch (c) {}
      if (!a) try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"), a = "WIN 3,0,18,0"
      } catch (c) {}
      if (!a) try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), a = "WIN 2,0,0,11"
      } catch (c) {
        a = -1
      }
      return a
    },
    GetSwfVer: function () {
      var a = -1;
      if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
          var b = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "",
            c = navigator.plugins["Shockwave Flash" + b].description,
            d = c.split(" "),
            e = d[2].split("."),
            f = e[0],
            g = e[1],
            h = d[3];
          h == "" && (h = d[4]), h[0] == "d" ? h = h.substring(1) : h[0] == "r" ? (h = h.substring(1), h.indexOf("d") > 0 && (h = h.substring(0, h.indexOf("d")))) : h[0] == "b" && (h = h.substring(1));
          var a = f + "." + g + "." + h
        }
      } else navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1 ? a = 4 : navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1 ? a = 3 : navigator.userAgent.toLowerCase().indexOf("webtv") != -1 ? a = 2 : this.isIE && this.isWin && !this.isOpera && (a = this.ControlVersion());
      return a
    },
    DetectFlashVer: function (a, b, c) {
      versionStr = this.GetSwfVer();
      if (versionStr == -1) return !1;
      if (versionStr != 0) {
        this.isIE && this.isWin && !this.isOpera ? (tempArray = versionStr.split(" "), tempString = tempArray[1], versionArray = tempString.split(",")) : versionArray = versionStr.split(".");
        var d = versionArray[0],
          e = versionArray[1],
          f = versionArray[2];
        if (d > parseFloat(a)) return !0;
        if (d == parseFloat(a)) {
          if (e > parseFloat(b)) return !0;
          if (e == parseFloat(b) && f >= parseFloat(c)) return !0
        }
        return !1
      }
    },
    AC_AddExtension: function (a, b) {
      var c = a.indexOf("?");
      if (c != -1) {
        var d = a.substring(0, c);
        return d.length >= b.length && d.lastIndexOf(b) == d.length - b.length ? a : a.replace(/\?/, b + "?")
      }
      return a.length >= b.length && a.lastIndexOf(b) == a.length - b.length ? a : a + b
    },
    AC_Generateobj: function (a, b, c) {
      var d = "";
      if (this.isIE && this.isWin && !this.isOpera) {
        d += "<object ";
        for (var e in a) d += e + '="' + a[e] + '" ';
        d += ">";
        for (var e in b) d += '<param name="' + e + '" value="' + b[e] + '" /> ';
        d += "</object>"
      } else {
        d += "<embed ";
        for (var e in c) d += e + '="' + c[e] + '" ';
        d += "> </embed>"
      }
      return d
    },
    AC_FL_RunContent: function () {
      var a = this.AC_GetArgs(arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
      return this.AC_Generateobj(a.objAttrs, a.params, a.embedAttrs)
    },
    AC_GetArgs: function (a, b, c, d, e) {
      var f = new Object;
      f.embedAttrs = new Object, f.params = new Object, f.objAttrs = new Object;
      for (var g = 0; g < a.length; g += 2) {
        var h = a[g].toLowerCase();
        switch (h) {
        case "classid":
          break;
        case "pluginspage":
          f.embedAttrs[a[g]] = a[g + 1];
          break;
        case "src":
        case "movie":
          a[g + 1] = this.AC_AddExtension(a[g + 1], b), f.embedAttrs.src = a[g + 1], f.params[c] = a[g + 1];
          break;
        case "onafterupdate":
        case "onbeforeupdate":
        case "onblur":
        case "oncellchange":
        case "onclick":
        case "ondblClick":
        case "ondrag":
        case "ondragend":
        case "ondragenter":
        case "ondragleave":
        case "ondragover":
        case "ondrop":
        case "onfinish":
        case "onfocus":
        case "onhelp":
        case "onmousedown":
        case "onmouseup":
        case "onmouseover":
        case "onmousemove":
        case "onmouseout":
        case "onkeypress":
        case "onkeydown":
        case "onkeyup":
        case "onload":
        case "onlosecapture":
        case "onpropertychange":
        case "onreadystatechange":
        case "onrowsdelete":
        case "onrowenter":
        case "onrowexit":
        case "onrowsinserted":
        case "onstart":
        case "onscroll":
        case "onbeforeeditfocus":
        case "onactivate":
        case "onbeforedeactivate":
        case "ondeactivate":
        case "type":
        case "codebase":
          f.objAttrs[a[g]] = a[g + 1];
          break;
        case "id":
        case "width":
        case "height":
        case "align":
        case "vspace":
        case "hspace":
        case "class":
        case "title":
        case "accesskey":
        case "name":
        case "tabindex":
          f.embedAttrs[a[g]] = f.objAttrs[a[g]] = a[g + 1];
          break;
        default:
          f.embedAttrs[a[g]] = f.params[a[g]] = a[g + 1]
        }
      }
      return f.objAttrs.classid = d, e && (f.embedAttrs.type = e), f
    },
    requiredMajorVersion: 9,
    requiredMinorVersion: 0,
    requiredRevision: 124,
    hasProductInstall: function () {
      return this.DetectFlashVer(6, 0, 65)
    },
    hasRequestedVersion: function () {
      return this.DetectFlashVer(this.requiredMajorVersion, this.requiredMinorVersion, this.requiredRevision)
    },
    getPlayer: function (a, b, c, d) {
      return this.hasRequestedVersion() ? this.AC_FL_RunContent("src", a, "width", "1", "height", "1", "align", "middle", "id", "MiniPlayerApp", "quality", "high", "bgcolor", "$ffffff", "name", "MiniPlayerApp", "allowScriptAccess", "always", "type", "application/x-shockwave-flash", "pluginspage", "http://www.adobe.com/go/getflashplayer", "flashVars", "namespace=MiniPlayer&cobrand=" + d + "&environment=" + c) : (typeof b == "function" && b(), "")
    },
    browserInfo: {
      browser: function () {
        return this.searchString(this.dataBrowser) || "An unknown browser"
      },
      version: function () {
        return this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version"
      },
      searchString: function (a) {
        for (var b = 0; b < a.length; b++) {
          var c = a[b].string,
            d = a[b].prop;
          this.versionSearchString = a[b].versionSearch || a[b].identity;
          if (c) {
            if (c.indexOf(a[b].subString) != -1) return a[b].identity
          } else if (d) return a[b].identity
        }
      },
      searchVersion: function (a) {
        var b = a.indexOf(this.versionSearchString);
        if (b == -1) return;
        return parseFloat(a.substring(b + this.versionSearchString.length + 1))
      },
      dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
      }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      }, {
        prop: window.opera,
        identity: "Opera"
      }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
      }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
      }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
      }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
      }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
      }]
    }
  }, Track = function (a, b, c, d, e) {
    this.id = a, this.key = this.id, this.trackShortcut = "", this.title = b || "", this.artistID = "", this.artistName = c || "", this.artistShortcut = "", this.albumID = d || "", this.albumShortcut = "", this.albumTitle = "", this.albumThumbnailURL = e || "", this.mp3URL = "", this.currentTime = 0, this.totalTime = 0, this.rights = 0, this.href = ""
  };
Track.prototype.play = function (a) {
  !a && !Queue.contains(this) && Queue.addItem(this), !MiniPlayer.token || MiniPlayer.playSamples ? (this.totalTime = 30, MiniPlayer.playSample(this.id, this.previewURL)) : MiniPlayer.playTrack(this.id, this)
}, Track.prototype.pause = function () {
  MiniPlayer.pauseTrack()
}, Track.prototype.seek = function (a) {
  MiniPlayer.seekTrack(this.id, a)
}, Track.prototype.stop = function () {
  MiniPlayer.stopTrack()
}, MiniPlayerUtil.Loader = function (a, b, c) {
  this.url = a, this.req = null, this.onload = b ? b : function () {}, this.onerror = c ? c : function () {}, this.load(a)
}, MiniPlayerUtil.Loader.prototype = {
  load: function (a) {
    window.XMLHttpRequest ? this.req = new XMLHttpRequest : window.ActiveXObject && (this.req = new ActiveXObject("Microsoft.XMLHTTP"));
    if (this.req) try {
      var b = this;
      this.req.onreadystatechange = function () {
        b.onReadyState.call(b)
      }, this.req.open("GET", a, !0), this.req.send(null)
    } catch (c) {
      this.onerror({
        status: -1,
        data: c.message
      })
    }
  },
  onReadyState: function () {
    var a = this.req,
      b = a.readyState;
    if (b == 4) {
      var c = a.status;
      responseText = "", c == 200 || c == 0 ? (responseText = a.responseText, this.onload({
        status: c,
        data: responseText
      })) : this.onerror({
        status: c,
        data: responseText
      })
    }
  }
};
var Queue = {
  items: [],
  selectedItem: null,
  shuffling: !1,
  repeating: !1,
  tracks: {},
  subscribers: [],
  storage: window.localStorage,
  LOADED: "loaded",
  UPDATED: "updated",
  STOPPED: "stopped",
  ITEM_ADDED: "itemAdded",
  SELECTED_ITEM_CHANGED: "selectedItemChanged",
  addItem: function (a) {
    a.key = this.getKey(a.id), this.items.push(new QueueItem(a, this.items.length, this.items.length, !1)), this.shuffling && this.shuffle(), this.tracks[a.key] = a, this.notify(this.UPDATED), this.notify(this.ITEM_ADDED), this.save()
  },
  addItems: function (a) {
    for (var b = 0, c = a.length; b < c; ++b) track = a[b], track.key = this.getKey(track.id), this.items.push(new QueueItem(track, this.items.length, this.items.length, !1)), this.tracks[track.key] = track;
    this.shuffling && this.shuffle(), this.notify(this.UPDATED), this.notify(this.ITEM_ADDED), this.save()
  },
  removeItem: function (a) {
    var b = this.getItem(a);
    if (!b) return;
    var c = this.getNext();
    this.items.splice(b.playIndex, 1);
    var d = 0;
    for (var e = 0; e < this.items.length; e++) this.items[e].playIndex = d++;
    this.selectedItem && b.track == this.selectedItem.track && (c && MiniPlayer.status == MiniPlayer.statuses.PLAYING ? this.play(c) : this.stop()), this.notify(this.UPDATED), this.save()
  },
  itemCount: function () {
    return this.items.length
  },
  play: function (a) {
    if (this.items.length == 0) return !1;
    if (typeof a == "string") {
      var b = this.getItem(a);
      this.selectedItem && this.selectedItem != b && this.selectedItem.track.stop(), this.setSelectedItem(b), this.shuffling && this.shuffle()
    } else typeof a == "object" && a.hasOwnProperty("key") ? this.setSelectedItem(this.getItem(a.key)) : typeof a == "object" && a.hasOwnProperty("track") && this.setSelectedItem(a);
    this.selectedItem || this.setSelectedItem(this.items[0]), this.selectedItem.track.play(), this.selectedItem.played = !0, this.notify(this.UPDATED), this.save()
  },
  pause: function () {
    if (!this.selectedItem) return;
    this.selectedItem.track.pause(), this.notify(this.UPDATED)
  },
  stop: function (a) {
    this.selectedItem && this.selectedItem.track && this.selectedItem.track.stop(), a || (this.setSelectedItem(null), this.save()), MiniPlayer.stopped = !0, this.notify(this.UPDATED), this.notify(this.STOPPED)
  },
  playNext: function () {
    this.shuffling && this.repeating && this.selectedItem && this.selectedItem.playIndex == this.items.length - 1 && this.shuffle();
    var a = this.getNext();
    a ? this.play(a) : this.stop()
  },
  playPrevious: function () {
    var a = this.getPrevious();
    a ? this.play(a) : this.stop()
  },
  toggleShuffle: function () {
    this.shuffling ? this.unshuffle() : this.shuffle(), this.shuffling = !this.shuffling, this.notify(this.UPDATED), this.save()
  },
  toggleRepeat: function () {
    this.repeating = !this.repeating, this.notify(this.UPDATED), this.save()
  },
  hasNext: function () {
    return this.getNext() != null
  },
  hasPrevious: function () {
    return this.getPrevious() != null
  },
  getNext: function (a) {
    return this.selectedItem && this.selectedItem.playIndex < this.items.length - 1 ? this.items[this.selectedItem.playIndex + 1] : this.items.length != 0 && (this.repeating || a) ? this.items[0] : null
  },
  getPrevious: function () {
    return this.selectedItem && this.selectedItem.playIndex > 0 ? this.items[this.selectedItem.playIndex - 1] : this.repeating && this.items.length != 0 ? this.items[this.items.length - 1] : null
  },
  currentTrack: function () {
    return this.selectedItem ? this.selectedItem.track : null
  },
  contains: function (a) {
    if (typeof a == "string") return tracks[a] != undefined ? !0 : !1;
    if (typeof a == "object" && a.hasOwnProperty("id"))
      for (var b = 0; b < this.items.length; b++)
        if (this.items[b].track == a) return !0;
    return !1
  },
  getItem: function (a) {
    for (var b = 0; b < this.items.length; b++)
      if (this.items[b].track.key == a) return this.items[b];
    return null
  },
  getItems: function () {
    return this.items.slice().sort(this.sortByDisplay)
  },
  shuffle: function () {
    for (var a = 0; a < this.items.length; a++) this.items[a].playIndex = Math.random();
    this.selectedItem && (this.selectedItem.playIndex = 0), this.items.sort(this.sortByPlay);
    for (a = 0; a < this.items.length; a++) this.items[a].playIndex = a, this.items[a].played = !1
  },
  unshuffle: function () {
    for (var a = 0; a < this.items.length; a++) this.items[a].playIndex = this.items[a].displayIndex;
    this.items.sort(this.sortByPlay)
  },
  reorder: function (a) {
    if (!this.items.length == a.length) return;
    for (var b = 0; b < this.items.length; b++) this.getItem(a[b]).displayIndex = b;
    this.shuffling || this.unshuffle(), this.notify(this.UPDATED), this.save()
  },
  save: function () {
    this.items.length == 0 && (this.storage ? this.storage.removeItem(this.storageKey()) : deleteCookie(this.storageKey()));
    try {
      this.storage ? this.storage.setItem(this.storageKey(), JSON.stringify(this.squish())) : saveCookie(this.storageKey(), JSON.stringify(this.squish()))
    } catch (a) {}
  },
  load: function () {
    var a = typeof ClientAuthentication != "undefined" ? ClientAuthentication.getAuthenticationInfo().username : readCookie("username"),
      b = this.storage ? this.storage.getItem(this.storageKey()) : readCookie(this.storageKey());
    if (b && a && !MiniPlayer.playSamples) {
      var c = JSON.parse(b);
      this.items = c.items, this.shuffling = c.shuffling || !1, this.repeating = c.repeating || !1;
      for (var d = 0; d < this.items.length; d++) {
        var e = this.items[d].track,
          f = new Track(e.id);
        f.key = this.getKey(e.id), f.trackShortcut = e.trackShortcut, f.title = e.title, f.artistID = e.artistID, f.artistName = e.artistName, f.artistShortcut = e.artistShortcut, f.albumID = e.albumID, f.albumTitle = e.albumTitle, f.albumShortcut = e.albumShortcut, f.albumThumbnailURL = e.albumThumbnailURL, f.totalTime = e.totalTime, f.streamable = e.streamable, f.mp3URL = e.mp3URL, f.href = e.href, e.sourceType && (f.sourceId = e.sourceId, f.sourceType = e.sourceType), e.playStartTime && (f.playStartTime = e.playStartTime), e.recToken && (f.recToken = e.recToken), e.playSourceMetadata ? f.playSourceMetadata = e.playSourceMetadata : f.playSourceMetadata = {
          featureModule: "From Storage",
          primaryContentName: "From Storage"
        }, this.tracks[f.key] = f, this.items[d].track = f
      }
      this.items.sort(this.sortByDisplay), this.setSelectedItem(this.items[c.selectedItemIndex]), this.shuffling && this.shuffle()
    }
    this.notify(this.LOADED)
  },
  clear: function () {
    this.items = [], this.tracks = {}, this.selectedItem = null, this.stop(), this.notify(this.UPDATED), this.save()
  },
  subscribe: function (a, b) {
    this.subscribers.push({
      eventName: a,
      handler: b
    })
  },
  unsubscribe: function (a, b) {
    for (var c = 0; c < this.subscribers.length; c++) this.subscribers[c].eventName == a && this.subscribers[c].handler == b && this.subscribers.splice(c, 1)
  },
  notify: function (a, b) {
    for (var c = 0; c < this.subscribers.length; c++) this.subscribers[c].eventName == a && typeof this.subscribers[c].handler == "function" && this.subscribers[c].handler(b)
  },
  setSelectedItem: function (a) {
    this.selectedItem = a, this.notify(this.SELECTED_ITEM_CHANGED, {
      item: a
    })
  },
  sortByPlay: function (a, b) {
    return a.playIndex - b.playIndex
  },
  sortByDisplay: function (a, b) {
    return a.displayIndex - b.displayIndex
  },
  storageKey: function () {
    var a = typeof ClientAuthentication != "undefined" ? ClientAuthentication.getAuthenticationInfo().username : readCookie("username");
    return "queue" + (a ? "_" + a : "_anon")
  },
  squish: function () {
    return {
      items: this.storage ? this.items : this.items.slice(-10).sort(this.sortByDisplay),
      selectedItemIndex: this.selectedItem != null ? this.selectedItem.playIndex : 0,
      shuffling: this.shuffling,
      repeating: this.repeating
    }
  },
  getKey: function (a) {
    var b = a,
      c = 0;
    while (this.tracks[b]) b = a + "_" + ++c;
    return b
  }
}, QueueItem = function (a, b, c, d) {
    this.track = a, this.displayIndex = b, this.playIndex = c, this.played = d
  };
(function () {
  function a(a, b, c) {
    a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent("on" + b, c)
  }

  function b(a) {
    if ("keypress" == a.type) {
      var b = String.fromCharCode(a.which);
      return a.shiftKey || (b = b.toLowerCase()), b
    }
    return k[a.which] ? k[a.which] : l[a.which] ? l[a.which] : String.fromCharCode(a.which).toLowerCase()
  }

  function c(a) {
    a = a || {};
    var b = !1,
      c;
    for (c in r) a[c] ? b = !0 : r[c] = 0;
    b || (u = !1)
  }

  function d(a, b, c, d, e, f) {
    var g, i, j = [],
      k = c.type;
    if (!p[a]) return [];
    "keyup" == k && h(a) && (b = [a]);
    for (g = 0; g < p[a].length; ++g)
      if (i = p[a][g], d || !i.seq || r[i.seq] == i.level)
        if (k == i.action && ("keypress" == k && !c.metaKey && !c.ctrlKey || b.sort().join(",") === i.modifiers.sort().join(","))) {
          var l = d && i.seq == d && i.level == f;
          (!d && i.combo == e || l) && p[a].splice(g, 1), j.push(i)
        }
    return j
  }

  function e(a) {
    var b = [];
    return a.shiftKey && b.push("shift"), a.altKey && b.push("alt"), a.ctrlKey && b.push("ctrl"), a.metaKey && b.push("meta"), b
  }

  function f(a, b, c) {
    !w.stopCallback(b, b.target || b.srcElement, c) && !1 === a(b, c) && (b.preventDefault && b.preventDefault(), b.stopPropagation && b.stopPropagation(), b.returnValue = !1, b.cancelBubble = !0)
  }

  function g(a) {
    "number" != typeof a.which && (a.which = a.keyCode);
    var c = b(a);
    c && ("keyup" == a.type && t == c ? t = !1 : w.handleKey(c, e(a), a))
  }

  function h(a) {
    return "shift" == a || "ctrl" == a || "alt" == a || "meta" == a
  }

  function i(a, b) {
    var c, d, e, f = [];
    c = "+" === a ? ["+"] : a.split("+");
    for (e = 0; e < c.length; ++e) d = c[e], n[d] && (d = n[d]), b && "keypress" != b && m[d] && (d = m[d], f.push("shift")), h(d) && f.push(d);
    c = d, e = b;
    if (!e) {
      if (!o) {
        o = {};
        for (var g in k) 95 < g && 112 > g || k.hasOwnProperty(g) && (o[k[g]] = g)
      }
      e = o[c] ? "keydown" : "keypress"
    }
    return "keypress" == e && f.length && (e = "keydown"), {
      key: d,
      modifiers: f,
      action: e
    }
  }

  function j(a, e, g, h, k) {
    q[a + ":" + g] = e, a = a.replace(/\s+/g, " ");
    var l = a.split(" ");
    if (1 < l.length) {
      var m = a;
      a = function (a) {
        return function () {
          u = a, ++r[m], clearTimeout(s), s = setTimeout(c, 1e3)
        }
      }, h = function (a) {
        f(e, a, m), "keyup" !== g && (t = b(a)), setTimeout(c, 10)
      };
      for (k = r[m] = 0; k < l.length; ++k) {
        var n = k + 1 === l.length ? h : a(g || i(l[k + 1]).action);
        j(l[k], n, g, m, k)
      }
    } else l = i(a, g), p[l.key] = p[l.key] || [], d(l.key, l.modifiers, {
      type: l.action
    }, h, a, k), p[l.key][h ? "unshift" : "push"]({
      callback: e,
      modifiers: l.modifiers,
      action: l.action,
      seq: h,
      level: k,
      combo: a
    })
  }
  for (var k = {
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    20: "capslock",
    27: "esc",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "ins",
    46: "del",
    91: "meta",
    93: "meta",
    224: "meta"
  }, l = {
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    }, m = {
      "~": "`",
      "!": "1",
      "@": "2",
      "#": "3",
      $: "4",
      "%": "5",
      "^": "6",
      "&": "7",
      "*": "8",
      "(": "9",
      ")": "0",
      _: "-",
      "+": "=",
      ":": ";",
      '"': "'",
      "<": ",",
      ">": ".",
      "?": "/",
      "|": "\\"
    }, n = {
      option: "alt",
      command: "meta",
      "return": "enter",
      escape: "esc",
      mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
    }, o, p = {}, q = {}, r = {}, s, t = !1, u = !1, v = 1; 20 > v; ++v) k[111 + v] = "f" + v;
  for (v = 0; 9 >= v; ++v) k[v + 96] = v;
  a(document, "keypress", g), a(document, "keydown", g), a(document, "keyup", g);
  var w = {
    bind: function (a, b, c) {
      a = a instanceof Array ? a : [a];
      for (var d = 0; d < a.length; ++d) j(a[d], b, c);
      return this
    },
    unbind: function (a, b) {
      return w.bind(a, function () {}, b)
    },
    trigger: function (a, b) {
      return q[a + ":" + b] && q[a + ":" + b]({}, a), this
    },
    reset: function () {
      return p = {}, q = {}, this
    },
    stopCallback: function (a, b) {
      return -1 < (" " + b.className + " ").indexOf(" mousetrap ") ? !1 : "INPUT" == b.tagName || "SELECT" == b.tagName || "TEXTAREA" == b.tagName || b.contentEditable && "true" == b.contentEditable
    },
    handleKey: function (a, b, e) {
      b = d(a, b, e);
      var g, i = {}, j = 0,
        k = !1;
      for (g = 0; g < b.length; ++g) b[g].seq && (j = Math.max(j, b[g].level));
      for (g = 0; g < b.length; ++g) b[g].seq ? b[g].level == j && (k = !0, i[b[g].seq] = 1, f(b[g].callback, e, b[g].combo)) : k || f(b[g].callback, e, b[g].combo);
      e.type == u && !h(a) && c(i)
    }
  };
  window.Mousetrap = w, "function" == typeof define && define.amd && define(w)
})();
var swfobject = function () {
  function A() {
    if (t) return;
    try {
      var a = i.getElementsByTagName("body")[0].appendChild(Q("span"));
      a.parentNode.removeChild(a)
    } catch (b) {
      return
    }
    t = !0;
    var c = l.length;
    for (var d = 0; d < c; d++) l[d]()
  }

  function B(a) {
    t ? a() : l[l.length] = a
  }

  function C(b) {
    if (typeof h.addEventListener != a) h.addEventListener("load", b, !1);
    else if (typeof i.addEventListener != a) i.addEventListener("load", b, !1);
    else if (typeof h.attachEvent != a) R(h, "onload", b);
    else if (typeof h.onload == "function") {
      var c = h.onload;
      h.onload = function () {
        c(), b()
      }
    } else h.onload = b
  }

  function D() {
    k ? E() : F()
  }

  function E() {
    var c = i.getElementsByTagName("body")[0],
      d = Q(b);
    d.setAttribute("type", e);
    var f = c.appendChild(d);
    if (f) {
      var g = 0;
      (function () {
        if (typeof f.GetVariable != a) {
          var b = f.GetVariable("$version");
          b && (b = b.split(" ")[1].split(","), y.pv = [parseInt(b[0], 10), parseInt(b[1], 10), parseInt(b[2], 10)])
        } else if (g < 10) {
          g++, setTimeout(arguments.callee, 10);
          return
        }
        c.removeChild(d), f = null, F()
      })()
    } else F()
  }

  function F() {
    var b = m.length;
    if (b > 0)
      for (var c = 0; c < b; c++) {
        var d = m[c].id,
          e = m[c].callbackFn,
          f = {
            success: !1,
            id: d
          };
        if (y.pv[0] > 0) {
          var g = P(d);
          if (g)
            if (S(m[c].swfVersion) && !(y.wk && y.wk < 312)) U(d, !0), e && (f.success = !0, f.ref = G(d), e(f));
            else if (m[c].expressInstall && H()) {
            var h = {};
            h.data = m[c].expressInstall, h.width = g.getAttribute("width") || "0", h.height = g.getAttribute("height") || "0", g.getAttribute("class") && (h.styleclass = g.getAttribute("class")), g.getAttribute("align") && (h.align = g.getAttribute("align"));
            var i = {}, j = g.getElementsByTagName("param"),
              k = j.length;
            for (var l = 0; l < k; l++) j[l].getAttribute("name").toLowerCase() != "movie" && (i[j[l].getAttribute("name")] = j[l].getAttribute("value"));
            I(h, i, d, e)
          } else J(g), e && e(f)
        } else {
          U(d, !0);
          if (e) {
            var n = G(d);
            n && typeof n.SetVariable != a && (f.success = !0, f.ref = n), e(f)
          }
        }
      }
  }

  function G(c) {
    var d = null,
      e = P(c);
    if (e && e.nodeName == "OBJECT")
      if (typeof e.SetVariable != a) d = e;
      else {
        var f = e.getElementsByTagName(b)[0];
        f && (d = f)
      }
    return d
  }

  function H() {
    return !u && S("6.0.65") && (y.win || y.mac) && !(y.wk && y.wk < 312)
  }

  function I(b, c, d, e) {
    u = !0, r = e || null, s = {
      success: !1,
      id: d
    };
    var g = P(d);
    if (g) {
      g.nodeName == "OBJECT" ? (p = K(g), q = null) : (p = g, q = d), b.id = f;
      if (typeof b.width == a || !/%$/.test(b.width) && parseInt(b.width, 10) < 310) b.width = "310";
      if (typeof b.height == a || !/%$/.test(b.height) && parseInt(b.height, 10) < 137) b.height = "137";
      i.title = i.title.slice(0, 47) + " - Flash Player Installation";
      var j = y.ie && y.win ? "ActiveX" : "PlugIn",
        k = "MMredirectURL=" + h.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + j + "&MMdoctitle=" + i.title;
      typeof c.flashvars != a ? c.flashvars += "&" + k : c.flashvars = k;
      if (y.ie && y.win && g.readyState != 4) {
        var l = Q("div");
        d += "SWFObjectNew", l.setAttribute("id", d), g.parentNode.insertBefore(l, g), g.style.display = "none",

        function () {
          g.readyState == 4 ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10)
        }()
      }
      L(b, c, d)
    }
  }

  function J(a) {
    if (y.ie && y.win && a.readyState != 4) {
      var b = Q("div");
      a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(K(a), b), a.style.display = "none",

      function () {
        a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
      }()
    } else a.parentNode.replaceChild(K(a), a)
  }

  function K(a) {
    var c = Q("div");
    if (y.win && y.ie) c.innerHTML = a.innerHTML;
    else {
      var d = a.getElementsByTagName(b)[0];
      if (d) {
        var e = d.childNodes;
        if (e) {
          var f = e.length;
          for (var g = 0; g < f; g++)(e[g].nodeType != 1 || e[g].nodeName != "PARAM") && e[g].nodeType != 8 && c.appendChild(e[g].cloneNode(!0))
        }
      }
    }
    return c
  }

  function L(c, d, f) {
    var g, h = P(f);
    if (y.wk && y.wk < 312) return g;
    if (h) {
      typeof c.id == a && (c.id = f);
      if (y.ie && y.win) {
        var i = "";
        for (var j in c) c[j] != Object.prototype[j] && (j.toLowerCase() == "data" ? d.movie = c[j] : j.toLowerCase() == "styleclass" ? i += ' class="' + c[j] + '"' : j.toLowerCase() != "classid" && (i += " " + j + '="' + c[j] + '"'));
        var k = "";
        for (var l in d) d[l] != Object.prototype[l] && (k += '<param name="' + l + '" value="' + d[l] + '" />');
        h.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>", n[n.length] = c.id, g = P(c.id)
      } else {
        var m = Q(b);
        m.setAttribute("type", e);
        for (var o in c) c[o] != Object.prototype[o] && (o.toLowerCase() == "styleclass" ? m.setAttribute("class", c[o]) : o.toLowerCase() != "classid" && m.setAttribute(o, c[o]));
        for (var p in d) d[p] != Object.prototype[p] && p.toLowerCase() != "movie" && M(m, p, d[p]);
        h.parentNode.replaceChild(m, h), g = m
      }
    }
    return g
  }

  function M(a, b, c) {
    var d = Q("param");
    d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
  }

  function N(a) {
    var b = P(a);
    b && b.nodeName == "OBJECT" && (y.ie && y.win ? (b.style.display = "none", function () {
      b.readyState == 4 ? O(a) : setTimeout(arguments.callee, 10)
    }()) : b.parentNode.removeChild(b))
  }

  function O(a) {
    var b = P(a);
    if (b) {
      for (var c in b) typeof b[c] == "function" && (b[c] = null);
      b.parentNode.removeChild(b)
    }
  }

  function P(a) {
    var b = null;
    try {
      b = i.getElementById(a)
    } catch (c) {}
    return b
  }

  function Q(a) {
    return i.createElement(a)
  }

  function R(a, b, c) {
    a.attachEvent(b, c), o[o.length] = [a, b, c]
  }

  function S(a) {
    var b = y.pv,
      c = a.split(".");
    return c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
  }

  function T(c, d, e, f) {
    if (y.ie && y.mac) return;
    var g = i.getElementsByTagName("head")[0];
    if (!g) return;
    var h = e && typeof e == "string" ? e : "screen";
    f && (v = null, w = null);
    if (!v || w != h) {
      var j = Q("style");
      j.setAttribute("type", "text/css"), j.setAttribute("media", h), v = g.appendChild(j), y.ie && y.win && typeof i.styleSheets != a && i.styleSheets.length > 0 && (v = i.styleSheets[i.styleSheets.length - 1]), w = h
    }
    y.ie && y.win ? v && typeof v.addRule == b && v.addRule(c, d) : v && typeof i.createTextNode != a && v.appendChild(i.createTextNode(c + " {" + d + "}"))
  }

  function U(a, b) {
    if (!x) return;
    var c = b ? "visible" : "hidden";
    t && P(a) ? P(a).style.visibility = c : T("#" + a, "visibility:" + c)
  }

  function V(b) {
    var c = /[\\\"<>\.;]/,
      d = c.exec(b) != null;
    return d && typeof encodeURIComponent != a ? encodeURIComponent(b) : b
  }
  var a = "undefined",
    b = "object",
    c = "Shockwave Flash",
    d = "ShockwaveFlash.ShockwaveFlash",
    e = "application/x-shockwave-flash",
    f = "SWFObjectExprInst",
    g = "onreadystatechange",
    h = window,
    i = document,
    j = navigator,
    k = !1,
    l = [D],
    m = [],
    n = [],
    o = [],
    p, q, r, s, t = !1,
    u = !1,
    v, w, x = !0,
    y = function () {
      var f = typeof i.getElementById != a && typeof i.getElementsByTagName != a && typeof i.createElement != a,
        g = j.userAgent.toLowerCase(),
        l = j.platform.toLowerCase(),
        m = l ? /win/.test(l) : /win/.test(g),
        n = l ? /mac/.test(l) : /mac/.test(g),
        o = /webkit/.test(g) ? parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
        p = !1,
        q = [0, 0, 0],
        r = null;
      if (typeof j.plugins != a && typeof j.plugins[c] == b) r = j.plugins[c].description, r && (typeof j.mimeTypes == a || !j.mimeTypes[e] || !! j.mimeTypes[e].enabledPlugin) && (k = !0, p = !1, r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10), q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10), q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
      else if (typeof h.ActiveXObject != a) try {
        var s = new ActiveXObject(d);
        s && (r = s.GetVariable("$version"), r && (p = !0, r = r.split(" ")[1].split(","), q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]))
      } catch (t) {}
      return {
        w3: f,
        pv: q,
        wk: o,
        ie: p,
        win: m,
        mac: n
      }
    }(),
    z = function () {
      if (!y.w3) return;
      (typeof i.readyState != a && i.readyState == "complete" || typeof i.readyState == a && (i.getElementsByTagName("body")[0] || i.body)) && A(), t || (typeof i.addEventListener != a && i.addEventListener("DOMContentLoaded", A, !1), y.ie && y.win && (i.attachEvent(g, function () {
        i.readyState == "complete" && (i.detachEvent(g, arguments.callee), A())
      }), h == top && function () {
        if (t) return;
        try {
          i.documentElement.doScroll("left")
        } catch (a) {
          setTimeout(arguments.callee, 0);
          return
        }
        A()
      }()), y.wk && function () {
        if (t) return;
        if (!/loaded|complete/.test(i.readyState)) {
          setTimeout(arguments.callee, 0);
          return
        }
        A()
      }(), C(A))
    }(),
    W = function () {
      y.ie && y.win && window.attachEvent("onunload", function () {
        var a = o.length;
        for (var b = 0; b < a; b++) o[b][0].detachEvent(o[b][1], o[b][2]);
        var c = n.length;
        for (var d = 0; d < c; d++) N(n[d]);
        for (var e in y) y[e] = null;
        y = null;
        for (var f in swfobject) swfobject[f] = null;
        swfobject = null
      })
    }();
  return {
    registerObject: function (a, b, c, d) {
      if (y.w3 && a && b) {
        var e = {};
        e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, m[m.length] = e, U(a, !1)
      } else d && d({
        success: !1,
        id: a
      })
    },
    getObjectById: function (a) {
      if (y.w3) return G(a)
    },
    embedSWF: function (c, d, e, f, g, h, i, j, k, l) {
      var m = {
        success: !1,
        id: d
      };
      y.w3 && !(y.wk && y.wk < 312) && c && d && e && f && g ? (U(d, !1), B(function () {
        e += "", f += "";
        var n = {};
        if (k && typeof k === b)
          for (var o in k) n[o] = k[o];
        n.data = c, n.width = e, n.height = f;
        var p = {};
        if (j && typeof j === b)
          for (var q in j) p[q] = j[q];
        if (i && typeof i === b)
          for (var r in i) typeof p.flashvars != a ? p.flashvars += "&" + r + "=" + i[r] : p.flashvars = r + "=" + i[r];
        if (S(g)) {
          var s = L(n, p, d);
          n.id == d && U(d, !0), m.success = !0, m.ref = s
        } else {
          if (h && H()) {
            n.data = h, I(n, p, d, l);
            return
          }
          U(d, !0)
        }
        l && l(m)
      })) : l && l(m)
    },
    switchOffAutoHideShow: function () {
      x = !1
    },
    ua: y,
    getFlashPlayerVersion: function () {
      return {
        major: y.pv[0],
        minor: y.pv[1],
        release: y.pv[2]
      }
    },
    hasFlashPlayerVersion: S,
    createSWF: function (a, b, c) {
      return y.w3 ? L(a, b, c) : undefined
    },
    showExpressInstall: function (a, b, c, d) {
      y.w3 && H() && I(a, b, c, d)
    },
    removeSWF: function (a) {
      y.w3 && N(a)
    },
    createCSS: function (a, b, c, d) {
      y.w3 && T(a, b, c, d)
    },
    addDomLoadEvent: B,
    addLoadEvent: C,
    getQueryParamValue: function (a) {
      var b = i.location.search || i.location.hash;
      if (b) {
        /\?/.test(b) && (b = b.split("?")[1]);
        if (a == null) return V(b);
        var c = b.split("&");
        for (var d = 0; d < c.length; d++)
          if (c[d].substring(0, c[d].indexOf("=")) == a) return V(c[d].substring(c[d].indexOf("=") + 1))
      }
      return ""
    },
    expressInstallCallback: function () {
      if (u) {
        var a = P(f);
        a && p && (a.parentNode.replaceChild(p, a), q && (U(q, !0), y.ie && y.win && (p.style.display = "block")), r && r(s)), u = !1
      }
    }
  }
}(),
  ABTesting = {
    cookie_name: "ab_testing",
    ab_token: "",
    init: function () {
      var a = this.readCookie(this.cookie_name);
      return a || (a = Math.random().toFixed(10).toString(), a = a.replace("0.", ""), this.saveCookie("ab_testing", a, 30)), document.location.search.indexOf("?ab_testing=") != -1 && (a = document.location.search.replace("?ab_testing=", ""), this.saveCookie("ab_testing", a, 30)), this.ab_token = a, this
    },
    getTestValue: function (a) {
      var b = this.ab_token.substring((a - 1) * 2, (a - 1) * 2 + 2);
      return parseInt(b)
    },
    getTestCase: function (a, b) {
      var c = this.ab_token.substring((a - 1) * 2, (a - 1) * 2 + 2),
        d = parseInt(c),
        e = 0;
      for (var f = 0; f < b.length; f++) {
        e += b[f];
        if (d < e) return f + 1
      }
      return b.length
    },
    getTestCaseFromLength: function (a, b) {
      var c = this.ab_token.substring((a - 1) * 2, (a - 1) * 2 + 2),
        d = parseInt(c),
        e = 0;
      for (var f = 0; f < b; f++) {
        e += 100 / b;
        if (d < e) return f + 1
      }
      return b
    },
    readCookie: function (a) {
      var b = a + "=",
        c = document.cookie.split(";");
      for (var d = 0; d < c.length; d++) {
        var e = c[d];
        while (e.charAt(0) == " ") e = e.substring(1, e.length);
        if (e.indexOf(b) == 0) return unescape(e.substring(b.length, e.length))
      }
      return null
    },
    saveCookie: function (a, b, c) {
      var d = "";
      if (c) {
        var e = new Date;
        e.setTime(e.getTime() + c * 24 * 60 * 60 * 1e3), d += "; expires=" + e.toGMTString()
      }
      var f = "; domain=." + this.getDomainName(document.location.hostname) + "; ";
      document.cookie = a + "=" + escape(b || "") + d + f + "path=/"
    },
    getDomainName: function (a) {
      return a.indexOf("rhapsody") != -1 ? a.substring(a.indexOf("rhapsody")) : a.indexOf("napster") != -1 ? a.substring(a.indexOf("napster")) : null
    }
  }.init(),
  EventReporting = {
    reporters: [],
    euLocales: ["de", "uk", "at", "be", "dk", "fi", "fr", "gr", "ie", "it", "lu", "nl", "no", "pt", "es", "se", "ch", "tr", "eu"],
    laLocales: ["co", "br"],
    reportEvent: function (a) {
      var b = EventReporting.tryGetOption(a, "event") || a;
      if (!b) return;
      var c = EventReporting.tryGetMetadata(a),
        d = EventReporting.tryGetMarketingVars(a),
        e = EventReporting.tryGetAccount(a);
      for (var f = 0; f < EventReporting.reporters.length; f++) {
        var g = EventReporting.reporters[f];
        typeof g["isInitialized"] != "undefined" && !g.isInitialized && typeof g["init"] != "undefined" && g.init(), typeof g["reportEvent"] != "undefined" && g.reportEvent(b, c, d, e)
      }
    },
    reportError: function (a) {
      var b = EventReporting.tryGetOption(a, "error") || a;
      if (!b) return;
      var c = EventReporting.tryGetMetadata(a),
        d = EventReporting.tryGetMarketingVars(a),
        e = EventReporting.tryGetAccount(a);
      for (var f = 0; f < EventReporting.reporters.length; f++) {
        var g = EventReporting.reporters[f];
        typeof g["isInitialized"] != "undefined" && !g.isInitialized && typeof g["init"] != "undefined" && g.init(), typeof g["reportError"] != "undefined" && g.reportError(b, c, d, e)
      }
    },
    reportPageView: function (a) {
      var b = EventReporting.tryGetMetadata(a),
        c = EventReporting.tryGetMarketingVars(a),
        d = EventReporting.tryGetAccount(a);
      for (var e = 0; e < EventReporting.reporters.length; e++) {
        var f = EventReporting.reporters[e];
        typeof f["isInitialized"] != "undefined" && !f.isInitialized && typeof f["init"] != "undefined" && f.init(), typeof f["reportPageView"] != "undefined" && f.reportPageView(b, c, d)
      }
    },
    addReporter: function (a) {
      var b = !0;
      typeof a["allowedDomains"] != "undefined" && (b = EventReporting.isDomainAllowed(a.allowedDomains)), b && this.reporters.push(a)
    },
    arrayLoop: function (a, b) {
      var c = b.length;
      for (var d = 0; d < c; d++)
        if (b[d] === a) return d;
      return -1
    },
    debug: null,
    isDebug: function () {
      return this.debug ? this.debug : (this.debug = !1, typeof $ != "undefined" && (this.debug = $("app-info").attr("env") == "test"), this.debug)
    },
    tryGetMetadata: function (a) {
      var b = EventReporting.tryGetOption(a, "metadata");
      return b || (b = typeof PageMetadata != "undefined" ? PageMetadata.getMetadata() : {
        site_section: "Marketing",
        page_name: document.title
      }), b
    },
    tryGetMarketingVars: function (a) {
      var b = EventReporting.tryGetOption(a, "marketingVars");
      return !b && typeof MarketingVariables != "undefined" && (b = MarketingVariables.getVariables()), b
    },
    tryGetAccount: function (a) {
      var b = EventReporting.tryGetOption(a, "account");
      return !b && typeof Account != "undefined" && (b = Account.getProperties()), b
    },
    getClientType: function () {
      var a = "Web";
      return typeof ClientAuthentication != "undefined" && (a = "Thin Client", typeof LocalMachineInfo != "undefined" && (a = LocalMachineInfo.getLocalOS() + " Thin Client")), a
    },
    tryGetOption: function (a, b) {
      return a && a[b] ? a[b] : null
    },
    getDomain: function () {
      var a = window.location.hostname.split(".").splice(1, 3).join("_");
      if (a == "napster_com") {
        var b = EventReporting.getCountryForNapster();
        EventReporting.arrayLoop(b, EventReporting.laLocales) >= 0 && (a = "napster_la")
      }
      return a
    },
    isDomainAllowed: function (a) {
      if (a == null || a.length == 0) return !0;
      var b = EventReporting.getDomain();
      for (var c = 0; c < a.length; c++)
        if (a[c] === b) return !0;
      return !1
    },
    getRegion: function () {
      var a = null,
        b = EventReporting.getDomain();
      switch (b) {
      case "rhapsody_com":
        a = "unitedstates";
        break;
      case "napster_de":
        a = "germany";
        break;
      case "napster_co_uk":
        a = "unitedkingdom";
        break;
      case "napster_com":
        a = "europe";
        break;
      case "napster_la":
        a = "latinamerica";
        break;
      case "mtvmusic_de":
        a = "mtv";
        break;
      default:
        a = "unitedstates"
      }
      return a
    },
    getCountry: function () {
      var a = null,
        b = EventReporting.getDomain();
      switch (b) {
      case "rhapsody_com":
        a = "US";
        break;
      case "napster_de":
        a = "DE";
        break;
      case "napster_co_uk":
        a = "GB";
        break;
      case "napster_com":
      case "napster_la":
        a = EventReporting.getCountryForNapster();
        break;
      case "mtvmusic_de":
        a = "DE";
        break;
      default:
        a = "US"
      }
      return a
    },
    getCountryForNapster: function () {
      var a = null,
        b = window.location.hostname.split(".");
      return b[0].indexOf("www") < 0 ? (a = b[0], a.indexOf("-") >= 0 && (a = a.split("-")[0])) : typeof page_country != "undefined" && (a = page_country), a
    },
    getProduct: function () {
      var a = window.location.hostname.split(".");
      return EventReporting.arrayLoop("rhapsody", a) != -1 ? "Rhapsody" : EventReporting.arrayLoop("napster", a) != -1 ? "Napster" : EventReporting.arrayLoop("mtvmusic", a) != -1 ? "MTV" : "Rhapsody"
    },
    getPlatform: function () {
      var a = navigator.platform;
      return a.indexOf("Win") > -1 ? "Windows" : a.indexOf("Mac") > -1 ? "Mac" : "Others"
    },
    getLanguage: function () {
      var a = null,
        b = this.readCookie("language");
      b && (a = b);
      var c = window.location.search.match(/l=([^&]*)/);
      return c && (a = c[1]), a
    },
    getLocale: function (a, b) {
      var c = null,
        d = null;
      a && (c = a.toUpperCase()), b ? b.indexOf("-") >= 0 ? d = b.replace("-", "_") : b == "en" ? d = "en_US" : b == "el" ? d = "el_GR" : b.indexOf("_") >= 0 ? d = b : d = b.toLowerCase() + "_" + b.toUpperCase() : (a && (c == "US" ? d = "en_US" : c == "DE" ? d = "de_DE" : c == "GB" && (d = "en_GB")), !d && c && (d = c.toLowerCase() + "_" + c.toUpperCase())), c == "EU" && (c = "Unknown");
      var e = (c ? c : "Unknown") + " : " + (d ? d : "Unknown");
      return e
    },
    loggedIn: function () {
      return EventReporting.readCookie("token") != null
    },
    getPath: function () {
      var a = window.location.pathname + window.location.hash;
      return window.location.pathname == "/" && window.location.hash != "" && (a = window.location.hash.replace("#", "")), a
    },
    readCookie: function (a) {
      var b = a + "=",
        c = document.cookie.split(";");
      for (var d = 0; d < c.length; d++) {
        var e = c[d];
        while (e.charAt(0) == " ") e = e.substring(1, e.length);
        if (e.indexOf(b) == 0) return unescape(e.substring(b.length, e.length))
      }
      return null
    }
  }, GoogleEventReporter = {
    isInitialized: !1,
    config: {
      key: "UA-225770-1"
    },
    allowedDomains: ["rhapsody_com", "napster_de", "napster_co_uk"],
    reportEvent: function (a, b, c, d) {
      _gaq.push(["_trackEvent", a.type, a.name, a.detail, a.value])
    },
    reportError: function (a, b, c, d) {
      this.reportEvent(a, b, c, d)
    },
    reportPageView: function (a, b, c) {
      _gaq.push(["_trackPageview", EventReporting.getPath()])
    },
    init: function () {
      _gaq = typeof _gaq == "undefined" ? [] : _gaq, _gaq.push(["_setAccount", this.config.key]), _gaq.push(["_setDomainName", "auto"]), _gaq.push(["_setAllowLinker", !1]);
      var a = document.createElement("script");
      a.type = "text/javascript", a.async = !0, a.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
      var b = document.getElementsByTagName("script")[0];
      b.parentNode.insertBefore(a, b), this.isInitialized = !0
    }
  };
EventReporting.addReporter(GoogleEventReporter);
var dataLayer = [],
  GoogleTagManager = {
    isInitialized: !1,
    name: "GoogleTagManager",
    getGoogleTagManagerID: function () {
      if (EventReporting.getCountry() == "US" || EventReporting.arrayLoop(EventReporting.getCountry().toLowerCase(), EventReporting.laLocales) >= 0) return "GTM-4H9RL";
      if (EventReporting.arrayLoop(EventReporting.getCountry().toLowerCase(), EventReporting.euLocales) >= 0) return "GTM-WR4TVV"
    },
    reportEvent: function (a, b, c, d) {},
    reportPageView: function (a, b, c) {
      var d = {};
      for (var e in b) b.hasOwnProperty(e) && (d[e] = b[e]);
      if (c) {
        for (var f in c) {
          f == "isLoggedIn" && (c[f] ? d.signedIn = "yes" : d.signedIn = "no");
          if (f == "accountType")
            if (c[f] == "RHAPSODY_PREMIER" || c[f] == "RHAPSODY_UNLIMITED") d.tier = "premier";
            else if (c[f] == "RHAPSODY_PREMIER_PLUS" || c[f] == "RHAPSODY_TOGO") d.tier = "premierplus";
          if (f == "trialLength") {
            var g = [0, 7, 14, 30];
            EventReporting.arrayLoop(c[f], g) > -1 && (d[f] = c[f])
          }
          f == "zip" && c[f] != "" && (d.zipcode = c[f])
        }
        d.userType = "existing"
      } else d.userType = "new";
      d.timestamp = (new Date).getTime(), d.platform = EventReporting.getPlatform(), d.country = EventReporting.getCountry().toLowerCase(), d.product = EventReporting.getProduct(), window.dataLayer.push(d), window.dataLayer.push({
        event: "pageLoad"
      })
    },
    init: function () {
      (function (a, b, c, d, e) {
        a[d] = a[d] || [], a[d].push({
          "gtm.start": (new Date).getTime(),
          event: "gtm.js"
        });
        var f = b.getElementsByTagName(c)[0],
          g = b.createElement(c),
          h = d != "dataLayer" ? "&l=" + d : "";
        g.async = !0, g.src = "//www.googletagmanager.com/gtm.js?id=" + e + h, f.parentNode.insertBefore(g, f)
      })(window, document, "script", "dataLayer", GoogleTagManager.getGoogleTagManagerID()), this.isInitialized = !0
    }
  };
EventReporting.addReporter(GoogleTagManager);
var NielsenEventReporter = {
  isInitialized: !1,
  refer: "",
  config: {
    server: "secure-us.imrworldwide.com"
  },
  allowedDomains: ["rhapsody_com"],
  reportPageView: function (a, b, c) {
    var d = new Image(1, 1),
      e = EventReporting.getPath();
    d.src = ["//" + this.config.server + "/cgi-bin/m?ci=us-604369h&cg=0&cc=1&si=", encodeURIComponent(document.location.protocol + "//" + document.location.host), encodeURIComponent(e), "&rp=", this.refer, "&ts=compact&rnd=", (new Date).getTime()].join(""), this.refer = ""
  },
  init: function () {
    this.refer = encodeURI(document.referrer), this.isInitialized = !0
  }
};
EventReporting.addReporter(NielsenEventReporter);
var FloodlightEventReporter = {
  isInitialized: !1,
  config: {
    server: "http://fls.doubleclick.net"
  },
  allowedDomains: ["rhapsody_com"],
  reportPageView: function (a, b, c) {
    var d = !1,
      e = !1,
      f = "",
      g = "",
      h = "web",
      i = "",
      j = "floodlight-frame",
      k = "",
      l = Math.random() + "",
      m = l * 1e13;
    if (!EventReporting.loggedIn()) switch (a.site_section) {
    case "home":
      f = "mktg", g = "homep024", e = !0;
      break;
    case "genre":
      f = "product", g = "genre028", typeof a.genre_name != "undefined" && a.genre_name[0] != null && (i = a.genre_name[0]), e = !0;
      break;
    case "artist":
      f = "product", g = "artis738", typeof a.genre_name != "undefined" && a.genre_name[0] != null && (i = a.genre_name[0]), e = !0;
      break;
    case "Marketing":
      f = "mktg", a.page_name.indexOf("Discover") != -1 && (g = "disco581"), a.page_name.indexOf("Free Trial") != -1 && (g = "landi011"), e = !0;
      break;
    case "blog":
      f = "product", g = "edito641", e = !0;
      break;
    case "authentication":
      f = "product", e = !0, d = !0, g = "login765"
    } else a.site_section == "home" && (f = "product", e = !0, g = "signe661");
    if (e) {
      k = "http://fls.doubleclick.net/activityi;src=3651568;type=" + f + ";cat=" + g + (i != "" ? ";u1=" + i : "") + ";u5=" + h + ";ord=" + m + "?", d && (k = "https://fls.doubleclick.net/activityi;src=3651568;type=" + f + ";cat=" + g + (i != "" ? ";u1=" + i : "") + ";u5=" + h + ";ord=" + m + "?");
      var n = document.getElementById(j);
      if (n) n.setAttribute("src", k);
      else {
        n = document.createElement("iframe"), n.setAttribute("id", j), n.setAttribute("frameborder", "0"), n.setAttribute("scrolling", "no"), n.setAttribute("width", "1"), n.setAttribute("height", "1"), n.setAttribute("style", "position: absolute; width: 1px; height: 1px"), n.setAttribute("src", k);
        var o = document.getElementsByTagName("body");
        o.length > 0 ? o[0].appendChild(n) : window.addEventListener ? window.addEventListener("DOMContentLoaded", function () {
          var a = document.getElementsByTagName("body");
          a[0].appendChild(n)
        }, !1) : window.attachEvent("onload", function () {
          var a = document.getElementsByTagName("body");
          a[0].appendChild(n)
        })
      }
    }
  },
  init: function () {
    this.isInitialized = !0
  }
};
EventReporting.addReporter(FloodlightEventReporter);
var MediaplexEventReporter = {
  isInitialized: !1,
  config: {
    secureServer: "secure.img-cdn.mediaplex.com"
  },
  allowedDomains: ["napster_de"],
  reportPageView: function (a, b, c) {
    if (a && a["site_section"] == "authentication") {
      var d = (new Date).getTime(),
        e = "https://" + this.config.secureServer + "/0/21776/universal.html?page_name=bestandskunde&bestandskunde=1&mpuid=" + d;
      f = document.createElement("iframe"), f.setAttribute("frameborder", "0"), f.setAttribute("scrolling", "no"), f.setAttribute("width", "1"), f.setAttribute("height", "1"), f.setAttribute("style", "position: absolute; width: 1px; height: 1px"), f.setAttribute("src", e);
      var g = document.getElementsByTagName("body");
      g[0].appendChild(f)
    }
  },
  init: function () {
    this.isInitialized = !0
  }
}, AditionEventReporter = {
    isInitialized: !1,
    config: {
      secureServer: "ad4.adfarm1.adition.com"
    },
    allowedDomains: ["napster_de"],
    reportPageView: function (a, b, c) {
      if (a && a["site_section"] == "authentication") {
        var d = (new Date).getTime(),
          e = "https://" + this.config.secureServer + "/track?tid=5308&sid=13266&type=html";
        f = document.createElement("iframe"), f.setAttribute("frameborder", "0"), f.setAttribute("scrolling", "no"), f.setAttribute("width", "1"), f.setAttribute("height", "1"), f.setAttribute("style", "position: absolute; width: 1px; height: 1px"), f.setAttribute("src", e);
        var g = document.getElementsByTagName("body");
        g[0].appendChild(f)
      }
    },
    init: function () {
      this.isInitialized = !0
    }
  }, ComscoreEventReporter = {
    isInitialized: !1,
    config: {
      server: "b.scorecardresearch.com",
      secureServer: "sb.scorecardresearch.com"
    },
    allowedDomains: ["rhapsody_com"],
    init: function () {
      this.isInitialized = !0
    },
    reportPageView: function (a, b, c) {
      var d = d || [];
      d.push({
        c1: "2",
        c2: "9857203"
      });
      var e = document.createElement("script"),
        f = document.getElementsByTagName("script")[0];
      e.async = !0, e.src = ("https:" == document.location.protocol ? "https://" + this.config.secureServer : "http://" + this.config.server) + "/beacon.js", f.parentNode.insertBefore(e, f)
    }
  };
EventReporting.addReporter(ComscoreEventReporter);
var SearchRevEventReporter = {
  pathsByReferrer: [],
  config: {
    server: "s1.srtk.net"
  },
  allowedDomains: ["rhapsody_com"],
  init: function () {
    this.pathsByReferrer["/mtv-mobile-test-url-1"] = "http://ad.doubleclick.net/clk;232773159;15177704;k?", this.pathsByReferrer["/mtv-mobile-test-url-2"] = "http://ad.doubleclick.net/clk;232773159;15177704;k?", this.pathsByReferrer["/mtv-mobile-test-url-3"] = "http://ad.doubleclick.net/clk;232773159;15177704;k?", this.pathsByReferrer["/mtv-ros-android"] = "http://ad.doubleclick.net/clk;232895209;15177704;l?", this.pathsByReferrer["/vh-ros-android"] = "http://ad.doubleclick.net/clk;232895213;15177704;g?", this.pathsByReferrer["/cmt-ros-android"] = "http://ad.doubleclick.net/clk;232895217;15177704;k?", this.pathsByReferrer["/logo-ros-android"] = "http://ad.doubleclick.net/clk;232895002;15177704;c?", this.pathsByReferrer["/mtv-music-section-android"] = "http://ad.doubleclick.net/clk;232894998;15177704;z?", this.pathsByReferrer["/vh-music-section-android"] = "http://ad.doubleclick.net/clk;232894994;15177704;v?", this.pathsByReferrer["/cmt-music-section-android"] = "http://ad.doubleclick.net/clk;232894989;15177704;z?", this.pathsByReferrer["/mtv-music-promo-android"] = "http://ad.doubleclick.net/clk;232938389;15177704;s?", this.pathsByReferrer["/vh-music-promo-android"] = "http://ad.doubleclick.net/clk;232938393;15177704;n?", this.pathsByReferrer["/cmt-music-promo-android"] = "http://ad.doubleclick.net/clk;232938399;15177704;t?", this.pathsByReferrer["/mtv-homepage-android"] = "http://ad.doubleclick.net/clk;232936771;15177704;l?", this.pathsByReferrer["/vh-homepage-android"] = "http://ad.doubleclick.net/clk;232936764;15177704;n?", this.pathsByReferrer["/cmt-homepage-android"] = "http://ad.doubleclick.net/clk;232936761;15177704;k?", this.pathsByReferrer["/mobile-tribes-android"] = "http://ad.doubleclick.net/clk;232895219;15177704;m?", this.pathsByReferrer["/android-email"] = "http://ad.doubleclick.net/clk;233605354;15177704;c?", this.pathsByReferrer["/mtv-ros-iphone"] = "http://ad.doubleclick.net/clk;232895207;15177704;j?", this.pathsByReferrer["/vh-ros-iphone"] = "http://ad.doubleclick.net/clk;232895211;15177704;e?", this.pathsByReferrer["/cmt-ros-iphone"] = "http://ad.doubleclick.net/clk;232895215;15177704;i?", this.pathsByReferrer["/logo-ros-iphone"] = "http://ad.doubleclick.net/clk;232895219;15177704;m?", this.pathsByReferrer["/mtv-music-section-iphone"] = "http://ad.doubleclick.net/clk;232895000;15177704;a?", this.pathsByReferrer["/vh-music-section-iphone"] = "http://ad.doubleclick.net/clk;232894996;15177704;x?", this.pathsByReferrer["/cmt-music-section-iphone"] = "http://ad.doubleclick.net/clk;232894992;15177704;t?", this.pathsByReferrer["/mtv-music-promo-iphone"] = "http://ad.doubleclick.net/clk;232938387;15177704;q?", this.pathsByReferrer["/vh-music-promo-iphone"] = "http://ad.doubleclick.net/clk;232938391;15177704;l?", this.pathsByReferrer["/cmt-music-promo-iphone"] = "http://ad.doubleclick.net/clk;232938395;15177704;p?", this.pathsByReferrer["/mtv-homepage-iphone"] = "http://ad.doubleclick.net/clk;232938402;15177704;e?", this.pathsByReferrer["/vh-homepage-iphone"] = "http://ad.doubleclick.net/clk;232936769;15177704;s?", this.pathsByReferrer["/cmt-homepage-iphone"] = "http://ad.doubleclick.net/clk;232936762;15177704;l?", this.pathsByReferrer["/mobile-tribes-iphone"] = "http://ad.doubleclick.net/clk;232936754;15177704;m?", this.pathsByReferrer["/mtv-news-ipad-app"] = "http://ad.doubleclick.net/clk;232936756;15177704;o?", this.pathsByReferrer["/iphone-email"] = "http://ad.doubleclick.net/clk;233605321;15177704;w?"
  },
  reportEvent: function (a, b, c, d) {
    if (!a.action) return;
    (new Image).src = "http://" + SearchRevEventReporter.config.server + "/www/delivery/ti.php?trackerid=96&cb=" + Math.floor(Math.random() * 99999) + "&sr_action=" + a.action;
    var e = a.destination,
      f = document.referrer;
    if (f && f != "")
      for (var g = 0; g < this.pathsByReferrer.length; g++)
        if (f.indexOf(this.pathsByReferrer[g][0]) != -1) {
          (new Image).src = this.pathsByReferrer[g][1] + e;
          break
        }
  }
};
EventReporting.addReporter(SearchRevEventReporter);
var OmnitureEventReporter = {
  isInitialized: !1,
  config: {
    suite_ids: {
      unitedstates: "rhapsodyprod",
      europe: "rhapsodyintlprod",
      unitedkingdom: "rhapsodyintlprod",
      germany: "rhapsodyintlprod",
      mtv: "rhapsodymtvprod",
      latinamerica: "rhapsodylatamprod"
    },
    trackingServer: "c.rhapsody.com",
    trackingServerSecure: "sc.rhapsody.com",
    reportTrackPlayEvents: !0
  },
  allowedDomains: null,
  trace: [],
  getSuiteId: function () {
    var a = EventReporting.getRegion();
    return this.config.suite_ids[a] ? this.config.suite_ids[a] : this.config.suite_ids.unitedstates
  },
  clear: function () {
    if (typeof s != "undefined") {
      for (var a = 0; a < 100; a++) s["prop" + a] = "", s["eVar" + a] = "";
      s.events = s.channel = s.pageName = s.pageType = "", s.hier1 = s.hier2 = s.hier3 = s.hier4 = s.hier5 = "", s.campaign = s.purchaseID = s.products = s.server = s.state = s.zip = "", s.linkTrackEvents = "None", s.linkTrackVars = "None"
    }
  },
  tryAddToTrace: function () {
    (EventReporting.isDebug() || window.location.search.match(/debug=.*omniture-trace/)) && this.trace.push(this.getVariables()) > 10 && this.trace.shift()
  },
  reportEvent: function (a, b, c, d) {
    if (typeof s == "undefined") return;
    this.setCommonProperties(b, c, d);
    var e = "Unknown";
    typeof a != "undefined" && (e = a.type + (a.name ? " : " + a.name : ""));
    if (a["type"] == "Click Play" || a["type"] == "Click Queue") s.eVar6 = s.prop6 = a.name.toLowerCase(), s.eVar30 = "", a.detail && a.detail.match(/^tra\.\d*/i) && (s.eVar30 = a.detail);
    if (a["type"] == "Social") {
      var f = a.name.toLowerCase(),
        g = a.detail ? a.detail.toLowerCase() : "unknown";
      s.prop12 = f + " : " + g
    }
    a["type"] == "Player Error" && (s.eVar48 = a.name);
    if (a["type"] == "Feature") {
      var h = a.name.toLowerCase(),
        f = a.detail;
      a["name"] == "Play Track" && (h = "tracks played", f = a.detail.featureModule, s.prop47 = s.eVar47 = a.detail.primaryContentName.toLowerCase()), a["name"] == "Play Member Radio" && (h = "tracks played", f = a.detail);
      var i = (h + " : " + f).toLowerCase();
      if (b) {
        var j = b.main_content_type;
        if (j) {
          a.name.match(/mobile detect/i) && (i = "mobile detect : " + j), s.eVar51 = b[j + "_id"], s.eVar52 = b[j + "_name"], s.eVar54 = b.artist_name, s.eVar56 = b.album_name;
          if (b.genre_name) {
            var k = b.genre_name;
            s.eVar57 = k[0], s.eVar58 = k.length == 1 ? k[0] : k[k.length - 1];
            if (j == "genre") {
              var l = b.genre_id;
              s.eVar51 = l[l.length - 1], s.eVar52 = k[k.length - 1]
            }
          }
        }
      }
      f.match(/share/i) && (s.prop12 = (f + " : " + h).toLowerCase()), s.prop32 = s.eVar32 = h.toLowerCase(), s.prop33 = s.eVar33 = i.toLowerCase(), e = i.toLowerCase()
    }
    b && (b.search_link_type && (s.prop8 = b.search_link_type.toLowerCase()), b.search_term && (s.eVar63 = b.search_term.toLowerCase()), b.search_type && (s.eVar67 = b.search_type.toLowerCase()), b.search_results && (s.eVar64 = b.search_results), a["type"] == "Search CTA" && b.search_result && (s.eVar66 = b.search_result.substr(0, 50).toLowerCase()), b.marketing_name && (s.eVar70 = b.marketing_name.toLowerCase())), s.events = this.getEvent(a), s.linkTrackEvents = s.events, this.setEventPath("E", e);
    var m = ["events", "campaign", "purchaseID", "products", "channel", "server", "state", "zip", "pageType"];
    for (var n in s)(n.match(/eVar\d*/) || n.match(/prop\d*/) || n.match(/hier\d*/)) && s[n] && m.push(n);
    s.linkTrackVars = m.join(","), this.tryAddToTrace();
    var o = "o";
    a.linkType && (o = a.linkType);
    if (a["name"] == "Play Track" && !this.config.reportTrackPlayEvents) {
      this.clear();
      return
    }
    s.tl(!0, o, e), this.clear()
  },
  getEvent: function (a) {
    var b = "";
    switch (a.type) {
    case "Social":
      b = "event11";
      break;
    case "Playlist":
      switch (a.name) {
      case "Downloaded":
        b = "event38";
        break;
      case "Deleted":
        b = "event39"
      }
      break;
    case "Click Play":
      b = "event40";
      break;
    case "Click Queue":
      b = "event37";
      break;
    case "Add to Queue":
      b = "event47";
      break;
    case "Add to Library":
      b = "event41";
      break;
    case "Add to Playlist":
      b = "event42";
      break;
    case "Add to Favorites":
      b = "event48";
      break;
    case "Search CTA":
      b = "event17";
      break;
    case "Sign-up Prompt":
      b = "event29";
      break;
    case "Player Error":
      b = "event52";
      break;
    case "Feature":
      b = "event45", a["name"] == "Search" && (b += ",event16"), a["name"] == "Play Track" && (b += ",event36"), a["name"] == "Mobile Detect" && a["detail"] == "Try Rhapsody" && (b += ",event46");
      if (a["name"] == "Favorites" || a["detail"] != null && a["detail"] == "Add to Favorites") b += ",event48";
      a["detail"] == "Add to Queue" && (b += ",event47"), typeof a["detail"] == "string" && a.detail.toLowerCase().indexOf("share") >= 0 && (b += ",event11")
    }
    return b
  },
  setEventPath: function (a, b) {
    s.prop71 = a + " : " + b.toLowerCase()
  },
  setCommonProperties: function (a, b, c) {
    var d = c ? c.isLoggedIn : EventReporting.readCookie("token") != null;
    if (a) {
      var e = a.site_section + " : " + (a.page_name ? a.page_name : "index");
      c && e == "home : index" && (e = c.isLoggedIn ? "home : subscriber" : "home : free"), s.pageName = s.eVar20 = e
    } else typeof $ != "undefined" ? s.pageName = s.eVar20 = $("title").text() : s.pageName = s.eVar20 = document.title;
    s.eVar21 || (s.eVar21 = s.pageName), s.eVar40 = "not logged in", s.eVar41 = "not logged in";
    if (d) {
      s.eVar40 = "logged in";
      var f = c && c.guid ? c.guid : EventReporting.readCookie("guid");
      f && (s.eVar41 = f)
    }
    s.prop29 = s.eVar29 = c && c.experienceType ? c.experienceType : "free", s.prop3 = s.prop7 = s.eVar8 = EventReporting.getClientType(), a && a.site_section && (s.channel = a.site_section);
    var g = EventReporting.getLanguage(),
      h = EventReporting.getCountry();
    a && (g || (g = a.language), h && h.match(/eu/i) && (h = a.country)), s.eVar39 = EventReporting.getLocale(h, g)
  },
  reportError: function (a, b, c, d) {},
  reportPageView: function (a, b, c) {
    if (typeof s == "undefined") return;
    this.setCommonProperties(a, b, c), this.setEventPath("P", s.pageName), s.events = "event1";
    if (a) {
      var d = a.main_content_type;
      if (d)
        if (d == "genre") {
          var e = a.genre_name;
          if (d == "genre") {
            var f = a.genre_id;
            s.eVar51 = f[f.length - 1], s.eVar52 = e[e.length - 1]
          }
        } else s.eVar51 = a[d + "_id"], s.eVar52 = a[d + "_name"];
      var g = a.site_section;
      g && g == "members" && (s.eVar59 = a["is_me"] == "meta_is_me" ? "my_profile" : "not_my_profile")
    }
    this.tryAddToTrace(), s.t(), this.clear()
  },
  getVariables: function () {
    var a = {};
    if (typeof s != "undefined") {
      for (var b = 0; b < 100; b++) s["prop" + b] && (a["c" + b] = s["prop" + b]), s["eVar" + b] && (a["v" + b] = s["eVar" + b]);
      a.events = s.events, a.pageName = s.pageName, a.campaign = s.campaign
    }
    return a
  },
  doPlugins: function () {
    if (typeof s == "undefined") return;
    var a = s.wd.location.href;
    s.prop9 = s.getNewRepeat(), s.eVar9 = s.prop9, s.prop10 = s.getVisitNum(), s.eVar10 = s.prop10, s.eVar20 = s.pageName, s.eVar22 = s.getQueryParam("pcode", "", a), s.eVar22 = s.getValOnce(s.eVar22, "s_eVar22", 0), s.prop22 = s.eVar22, s.eVar23 = s.getQueryParam("cpath", "", a), s.eVar23 = s.getValOnce(s.eVar23, "s_eVar23", 0), s.prop23 = s.eVar23, s.eVar24 = s.getQueryParam("rsrc", "", a), s.eVar24 = s.getValOnce(s.eVar24, "s_eVar24", 0), s.prop24 = s.eVar24, s.eVar25 = s.getQueryParam("lsrc", "", a), s.eVar25 = s.getValOnce(s.eVar25, "s_eVar25", 0), s.prop25 = s.eVar25, s.eVar26 = s.getQueryParam("ocode", "", a), s.eVar26 = s.getValOnce(s.eVar26, "s_eVar26", 0), s.prop26 = s.eVar26, s.eVar27 = s.getQueryParam("opage", "", a), s.eVar27 = s.getValOnce(s.eVar27, "s_eVar27", 0), s.prop27 = s.eVar27, s.eVar28 = s.getQueryParam("cmpid", "", a), s.eVar28 = s.getValOnce(s.eVar28, "s_eVar28", 0), s.prop28 = s.eVar28, s.campaign = s.eVar22 + ":" + s.eVar23 + ":" + s.eVar24 + ":" + s.eVar25 + ":" + s.eVar26 + ":" + s.eVar27 + ":" + s.eVar28, s.campaign == "::::::" && (s.campaign = ""), s.prop1 = s.campaign, s.clickPast(s.campaign, "event24", "event25"), s.eVar62 = window.location.href, s.prop5 = OmnitureEventReporter.getSuiteId()
  },
  init: function () {
    if (typeof s_gi == "undefined") return;
    var a = this.getSuiteId();
    if (!a) return;
    s = s_gi(a), s.charSet = "UTF-8", s.currencyCode = "USD", s.trackDownloadLinks = !0, s.trackExternalLinks = !0, s.trackInlineStats = !0, s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,cls,msi,dmg", s.linkInternalFilters = "javascript:,rhapsody.com,napster.de,napster.co.uk,napster.com", s.linkTrackVars = "None", s.linkTrackEvents = "None", s.visitorNamespace = "rhapsody", s.trackingServer = this.config.trackingServer, s.trackingServerSecure = this.config.trackingServerSecure, s.usePlugins = !0, s.doPlugins = OmnitureEventReporter.doPlugins, s.getQueryParam = new Function("p", "d", "u", "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.location);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i==p.length?i:i+1)}return v"), s.p_gpv = new Function("k", "u", "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,'&','p_gvf',k)}return v"), s.p_gvf = new Function("t", "k", "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'True':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa(v)}return ''"), s.getValOnce = new Function("v", "c", "e", "var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v"), s.getVisitNum = new Function("var s=this,e=new Date(),cval,cvisit,ct=e.getTime(),c='s_vnum',c2='s_invisit';e.setTime(ct+30*24*60*60*1000);cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn='),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisit){if(str){e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}else return 'unknown visit number';}else{if(str){str++;k=cval.substring(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}else{s.c_w(c,ct+30*24*60*60*1000+'&vn=1',e);e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return 1;}}"), s.getNewRepeat = new Function("vars=this,e= new Date(),ct=e.getTime(),y=e.getYear();e.setTime(ct+9999*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w('s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s.c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cval+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else return 'Repeat';"), s.clickPast = new Function("scp", "ct_ev", "cp_ev", "cpc", "var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc){cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev;s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc,0,0);}}}"), s.p_fo = new Function("n", "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=new Object;return 1;}else {return 0;}"), s.vpr = new Function("vs", "v", "var s=this,k=vs.substring(0,2)=='s_'?vs.substring(2):vs;s['vpv_'+k]=v;s['vpm_'+k]=1"), s.dt = new Function("tz", "t", "var d=new Date;if(t)d.setTime(t);d=new Date(d.getTime()+(d.getTimezoneOffset()*60*1000));return new Date(Math.floor(d.getTime()+(tz*60*60*1000)))"), s.vh_gt = new Function("k", "v", "var s=this,vh='|'+s.c_r('s_vh_'+k),vi=vh.indexOf('|'+v+'='),ti=vi<0?vi:vi+2+v.length,pi=vh.indexOf('|',ti),t=ti<0?'':vh.substring(ti,pi<0?vh.length:pi);return t"), s.vh_gl = new Function("k", "var s=this,vh=s.c_r('s_vh_'+k),e=vh?vh.indexOf('='):0;return vh?(vh.substring(0,e?e:vh.length)):''"), s.vh_s = new Function("k", "v", "if(k&&v){var s=this,e=new Date,st=e.getTime(),y=e.getYear(),c='s_vh_'+k,vh='|'+s.c_r(c)+'|',t=s.vh_gt(k,v);e.setYear((y<1900?y+1900:y)+5);if(t)vh=s.rep(vh,'|'+v+'='+t+'|','|');if(vh.substring(0,1)=='|')vh=vh.substring(1);if(vh.substring(vh.length-1,vh.length)=='|')vh=vh.substring(0,vh.length-1);vh=v+'=[PCC]'+(vh?'|'+vh:'');s.c_w(c,vh,e);if(s.vh_gt(k,v)!='[PCC]')return 0;vh=s.rep(vh,'[PCC]',st);s.c_w(c,vh,e)}return 1"), s.p_fo = new Function("n", "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=new Object;return 1;}else {return 0;}"), this.isInitialized = !0
  }
};
EventReporting.addReporter(OmnitureEventReporter);
var s_code = "",
  s_objectID;
s_giqf();
var LanguageSelector = {
  supported_languages: ["en", "en-GB", "de", "el", "fr", "it", "nl", "pt", "tr", "es", "es-CO", "pt-BR"],
  cookie_name: "language",
  language: "en",
  init: function () {
    this.language = typeof page_default_locale != "undefined" ? page_default_locale : "en";
    if (typeof Account != "undefined") {
      var a = Account.getProperties().locale;
      a && (this.language = a)
    }
    var b = this.readCookie(this.cookie_name);
    b && (this.language = b.replace("_", "-"));
    var c = window.location.search.match(/l=([^&]*)/);
    if (c) {
      var d = this.supportedLanguage(c[1]);
      d && (this.language = d.replace("_", "-"), this.saveCookie(this.cookie_name, this.language.replace("-", "_"), 365))
    }
    return this
  },
  supportedLanguage: function (a) {
    var b = null;
    a = a.replace("_", "-"), a.substring(0, 3) == "es-" && a != "es-ES" && (a = "es-CO");
    if ($.inArray(a, this.supported_languages) != -1) b = a;
    else {
      var c = a.substring(0, 2);
      $.inArray(c, this.supported_languages) != -1 && (b = c)
    }
    return b
  },
  setLanguage: function (a) {
    var b = page_default_locale;
    if (typeof Account != "undefined") {
      var c = Account.getProperties().locale;
      c && (b = c)
    }
    a != b ? this.saveCookie("language", a.replace("-", "_"), 365) : this.deleteCookie("language")
  },
  readCookie: function (a) {
    var b = a + "=",
      c = document.cookie.split(";");
    for (var d = 0; d < c.length; d++) {
      var e = c[d];
      while (e.charAt(0) == " ") e = e.substring(1, e.length);
      if (e.indexOf(b) == 0) return unescape(e.substring(b.length, e.length))
    }
    return null
  },
  saveCookie: function (a, b, c) {
    var d = "";
    if (c) {
      var e = new Date;
      e.setTime(e.getTime() + c * 24 * 60 * 60 * 1e3), d += "; expires=" + e.toGMTString()
    }
    var f = "; domain=." + this.getDomainName(document.location.hostname) + "; ";
    document.cookie = a + "=" + escape(b || "") + d + f + "path=/"
  },
  deleteCookie: function (a) {
    saveCookie(a, "", -1)
  },
  getDomainName: function (a) {
    return a.indexOf("rhapsody") != -1 ? a.substring(a.indexOf("rhapsody")) : a.indexOf("napster") != -1 ? a.substring(a.indexOf("napster")) : null
  }
}.init(),
  MarketingVariables = {
    cookie_name: "afftr_override",
    cookie_variables: ["ocode", "pcode", "rsrc", "cpath"],
    query_variables: ["src", "lsrc", "opage"],
    init: function () {
      var a = this.readCookie(this.cookie_name),
        b = this.splitQuery(a),
        c = b.ocode;
      if (c == null || c == "napsterde" || c == "napstercouk" || c == "rhapcom") b.ocode = "organicweb", this.setCookie(this.cookie_name, b, 30)
    },
    getValue: function (a) {
      var b = this.readCookie(this.cookie_name),
        c = this.splitQuery(b);
      return c[a]
    },
    getVariables: function (a) {
      if (a) var b = a.substring(0, a.indexOf("?"));
      else var b = document.location.search;
      var c = this.readCookie(this.cookie_name),
        d = this.splitQuery(c),
        e = this.splitQuery(b);
      for (i = 0; i < this.query_variables.length; i++) {
        var f = this.query_variables[i];
        e[f] && (d[f] = e[f])
      }
      return d
    },
    splitQuery: function (a) {
      if (a == null) return {};
      var b = a.split("&"),
        c = {};
      for (var d = 0; d < b.length; d++) {
        var e = b[d].split("=");
        c[e[0]] = e[1]
      }
      return c
    },
    readCookie: function (a) {
      var b = a + "=",
        c = document.cookie.split(";");
      for (var d = 0; d < c.length; d++) {
        var e = c[d];
        while (e.charAt(0) == " ") e = e.substring(1, e.length);
        if (e.indexOf(b) == 0) return unescape(e.substring(b.length, e.length))
      }
      return null
    },
    setCookie: function (a, b, c) {
      if (typeof b == "object") {
        var d = [];
        for (var e in b) d.push(e + "=" + escape(b[e]));
        b = d.join("&")
      }
      var f = "";
      if (c) {
        var g = new Date;
        g.setTime(g.getTime() + c * 24 * 60 * 60 * 1e3), f += "; expires=" + g.toGMTString()
      }
      var h = "; domain=." + this.getDomainName(document.location.hostname) + "; ";
      document.cookie = a + "=" + escape(b || "") + f + h + "path=/"
    },
    getDomainName: function (a) {
      return a.indexOf("rhapsody") != -1 ? a.substring(a.indexOf("rhapsody")) : a.indexOf("napster") != -1 ? a.substring(a.indexOf("napster")) : null
    },
    deleteCookie: function (a) {
      createCookie(a, "", -1)
    }
  };
MarketingVariables.init();
var Account = {
  properties: {},
  username: null,
  token: null,
  isLoaded: !1,
  getUsername: function () {
    return this.username = readCookie("username"), this.username
  },
  getToken: function () {
    return this.token = readCookie("token"), this.token
  },
  isLoggedIn: function () {
    return this.getUsername(), this.getToken(), this.username != null && this.token != null
  },
  areCookiesValid: function () {
    var a = readCookie("id"),
      b = readCookie("guid");
    return this.isLoggedIn() && (!a || a === "" || !b || b === "") ? !1 : !0
  },
  getProperties: function () {
    var a = this.properties;
    return a.username = this.username, a.token = this.token, a.isLoggedIn = this.isLoggedIn(), a.shortUsername = this.smartTruncateEmailAddress(this.username), a.trialDaysLeft = this.getTrialDaysLeft(this.properties.trialTerminationDate), a.trialLength = this.getTrialLength(this.properties.dateCreated, this.properties.trialTerminationDate), a.experienceType = this.getExperienceType(a.trialLength), a.accountAge = this.getAccountAge(this.properties.dateCreated), a
  },
  logout: function () {
    this.properties = {}, deleteCookie("username"), this.username = null, deleteCookie("token"), this.token = null
  },
  load: function (a) {
    Account.properties = a ? a : {}, Account.properties.screenname && saveCookie("id", Account.properties.screenname), Account.isLoaded = !0, typeof LanguageSelector != "undefined" && LanguageSelector.init()
  },
  update: function (a) {
    Account.properties.facebookId = a.facebookId, Account.properties.realName = a.realName, Account.properties.gender = a.gender, Account.properties.visibility = a.visibility
  },
  init: function () {
    this.getUsername(), this.getToken(), this.username ? document.write("<script src='/authentication/account?" + (new Date).getTime() + "' type='text/javascript'></" + "script>") : this.isLoaded = !0
  },
  getAccountAge: function (a) {
    var b = (new Date - new Date(a)) / 864e5;
    return this.overrideAccountAge() || b
  },
  getExperienceType: function (a) {
    var b = "free";
    return a >= 35 ? b = "subscriber" : a >= 30 && this.properties["accountType"] == "RHAPSODY_PREMIER" ? b = "30daytrial" : a >= 30 && a <= 35 ? b = "30daytrialcc" : a >= 14 ? b = "14daytrial" : a >= 7 && Locale.trialRequiresCreditCard() ? b = "7daytrialcc" : a >= 7 ? b = "7daytrial" : this.properties["isSuspended"] == 1 ? b = "suspended" : a == 0 && this.properties["accountType"] == "RHAPSODY_25" ? b = "expired" : a == 0 && this.isLoggedIn() && (b = "subscriber"), this.overrideExperienceType() || b
  },
  getTrialLength: function (a, b) {
    var c = 0;
    if (b && b.time && a) {
      var d = new Date(b.time.time) - new Date(a);
      c = Math.floor(d / 864e5) + 1, c >= 30 && c <= 35 ? c = 30 : c >= 14 ? c = 14 : c >= 7 && (c = 7)
    }
    return this.overrideTrialLength() || c
  },
  getTrialDaysLeft: function (a) {
    var b = 0;
    if (a && a.time) {
      var c = new Date(a.time.time) - new Date;
      c > 0 && c < 864e5 ? b = 1 : b = Math.floor(c / 864e5) + 1
    }
    return this.overrideTrialDaysLeft() || b
  },
  smartTruncateEmailAddress: function (a) {
    return a && a.length > 23 && (a = a.substring(0, 12) + "..." + a.substring(a.length - 8, a.length)), a
  },
  overrideTrialDaysLeft: function () {
    var a = this.getOverride("daysLeft");
    return a && (a = parseInt(a)), a
  },
  overrideAccountAge: function () {
    var a = this.getOverride("accountAge");
    return a
  },
  overrideExperienceType: function () {
    var a = this.getOverride("experience"),
      b = this.overrideTrialDaysLeft();
    return a && b == 0 && (a = "expired"), a
  },
  overrideTrialLength: function () {
    var a = null,
      b = this.getOverride("experience");
    return b && (b == "7daytrial" ? a = 7 : b == "14daytrial" ? a = 14 : b == "30daytrial" && (a = 30)), a
  },
  getOverride: function (a) {
    var b = null;
    if (this.properties["accountType"] == "RHAPSODY_TOGO" || this.properties["accountType"] == "RHAPSODY_UNLIMITED" || this.properties["accountType"] == "PREMIER-EXTRA" || this.properties["accountType"] == "RHAPSODY_PREMIER") {
      var c = this.getQueryStrPairs(window.location.search.substring(1));
      c[a] && (b = c[a])
    }
    return b
  },
  getQueryStrPairs: function (a) {
    var b = new Object;
    if (a && a.length > 0) {
      var c = a.split("&");
      for (var d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        b[e[0]] = e[1]
      }
    }
    return b
  },
  isMyMemberPath: function (a) {
    return a = typeof a != "undefined" ? a : pageNavUrl(), a.match(new RegExp("/members/" + memberShortcut())) || a.match(new RegExp("/members/g." + this.getProperties().guid))
  },
  hasSpecialCobrand: function () {
    var a = ["50101", "60000", "60001"],
      b = this.properties.cobrand;
    return jQuery.inArray(b, a) == -1 && (b = null), b
  },
  downloadsAllowed: function () {
    var a = this.properties.accountType;
    return a != "RHAPSODY_25" && a != "RHAPSODY"
  },
  doNotShowUpgrade: function () {
    return $.inArray(this.properties.cobrand, ["50101", "40144", "50102"]) > -1
  },
  getUserPreference: function (a) {
    var b = this.properties.user_preferences;
    if (!b) return "error";
    if (jQuery.inArray(a, b) != -1) return !0;
    for (var c in b)
      if (b[c].match(a + "=")) return b[c].match(new RegExp(/=\s*(.*)/))[1];
    return !1
  },
  setUserPreference: function (a, b) {
    if (b) {
      var c = a + "/" + b;
      if (Account.getUserPreference(a) == b) return
    } else {
      c = a;
      if (Account.getUserPreference(c)) return
    }
    $.ajax({
      url: "/set_member_preference/" + c,
      success: function (a) {
        Account.properties.user_preferences = a
      }
    })
  },
  deleteUserPreference: function (a) {
    if (!Account.getUserPreference(a)) return;
    $.ajax({
      url: "/delete_member_preference/" + a,
      success: function (a) {
        Account.properties.user_preferences = a
      }
    })
  },
  resetUserPreferences: function () {
    $.ajax({
      url: "/reset_member_preferences",
      success: function () {
        Account.properties.user_preferences = []
      }
    })
  }
};
Account.init();
var Advertising = {
  slots: [],
  load: function (a) {
    Advertising.slots = a, $.each(Advertising.slots, function (a, b) {
      var c = b.element,
        d = b.callback;
      $(c).find(".ad-content").load($(c).attr("ad_bucket"), function () {
        d()
      })
    })
  },
  update: function () {
    $.each(Advertising.slots, function (a, b) {
      b.callback()
    })
  },
  getProperties: function () {
    var a = PageMetadata.getMetadata();
    a.environment = Advertising.getEnvironment();
    var b = Account.getProperties();
    return a.accountType = typeof b["accountType"] == "undefined" ? "" : b.accountType, a.experienceType = b.experienceType, a.trialDaysLeft = "", b.trialDaysLeft > 0 && (b["trialDaysLeft"] != 7 ? a.trialDaysLeft = b.trialDaysLeft + 1 + "" : a.trialDaysLeft = b.trialDaysLeft + ""), a
  },
  isDebug: function () {
    return $(".app-info").attr("env") == "test" || window.location.search.match(/debug=.*ads/)
  },
  getEnvironment: function () {
    return $(".app-info").attr("env") != "production" ? "test" : "production"
  }
};
$(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate("#album-overview-page", "pageLoaded", function () {
    scrollToSelectedTrack()
  }), $("#main").delegate(".album", "click", function () {
    $(this).attr("rec_token") != undefined && (recToken = $(this).attr("rec_token"))
  })
}), $(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate("#artist-radio", "mouseenter", function () {
    $(this).animate({
      opacity: .8
    }, 200, function () {})
  }), $("#main").delegate("#artist-radio", "mouseleave", function () {
    $(this).animate({
      opacity: .45
    }, 200, function () {})
  })
}), $(document).delegate("#editorial", "pageLoaded", function () {
  $("#editorial.all-posts-page").delegate("#post-filter-form .filter", "change", function (a) {
    a.stopPropagation(), $("#post-filter-form").submit(EditorialHelper.allPostsFormSubmit())
  });
  if ($("div#mtvVideo").size() > 0)
    if (Account.isLoggedIn()) {
      var a = {
        swf: "/assets/flash/RhapSMP18.swf",
        src: "",
        width: 633,
        height: 356,
        autoPlay: !0,
        forceMtvMedia: !0,
        poster: "",
        verbose: !1,
        minimumFlashPlayerVersion: "10.2.0",
        expressInstallSwfUrl: "/assets/flash/expressInstall.swf",
        javascriptCallbackFunction: "onStrobeCallback"
      };
      a.src = encodeURIComponent($("div#mtvVideo").attr("data-src")), a.poster = encodeURIComponent($("div#mtvVideo").attr("data-poster")), $("div#mtvVideo").strobemediaplayback(a)
    } else $("div#mtvVideo").hide(), $("div#mtvVideoLoggedOut").show();
  if ($("div#mtvSimulcast").size() > 0)
    if (Account.isLoggedIn()) {
      var b = {
        swf: "/assets/flash/RhapSMP18.swf",
        src: "",
        simulcastStreamId: 0,
        simulcastUrlTemplate: "",
        simulcastCountryAndLanguage: "",
        width: 633,
        height: 356,
        autoPlay: !0,
        poster: "",
        minimumFlashPlayerVersion: "10.2.0",
        plugin_hls: "/assets/flash/HLSDynamicPlugin.swf",
        expressInstallSwfUrl: "/assets/flash/expressInstall.swf",
        hdsPureLiveOffset: 30,
        hdsMinimumBufferTime: 4,
        javascriptCallbackFunction: "onStrobeCallback",
        hdsParams: "",
        useHds: !0
      };
      b.simulcastStreamId = parseInt($("div#mtvSimulcast").attr("data-id")), b.simulcastUrlTemplate = $("div#mtvSimulcast").attr("data-url-template"), b.simulcastCountryAndLanguage = $("div#mtvSimulcast").attr("data-language"), b.poster = $("div#mtvSimulcast").attr("data-poster"), b.hdsParams = "hdcore=3.10&g=" + $("div#mtvSimulcast").attr("data-session-id"), $("div#mtvSimulcast").strobemediaplayback(b)
    } else $("div#mtvSimulcast").hide(), $("div#mtvSimulcastLoggedOut").show();
  $("#editorial.post-page").delegate(".handle", "click", function () {
    var a = $("#editorial.post-page #primary .content"),
      b = $(this);
    b.hasClass("open") ? (a.animate({
      height: a.data("height").min
    }, 1e3), b.removeClass("open")) : (a.animate({
      height: a.data("height").max
    }, 1e3), b.addClass("open"))
  })
}), $(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate(".embedded-media", "mouseenter", function () {
    $(this).find(".control-container").removeClass("inactive")
  }), $("#main").delegate(".embedded-media", "mouseleave", function () {
    $(this).find(".control-container").addClass("inactive")
  }), $("#main").delegate(".embedded-media div.video-item", "click", function (a) {
    a.preventDefault();
    var b = $(this).find(".control-container a:first").attr("href");
    b != null && loadDynamicPage(b, !1, !1)
  })
}), $(document).delegate("#editorial.post-page", "pageLoaded", function () {
  var a = $("#editorial.post-page #primary .content"),
    b = 344;
  a.height() > b && ($("#related-posts").length || $("#albums").length) && (b = parseInt($(".post .text").css("line-height")) * 4 + $(".post .embedded-media").outerHeight(!0) + 6, a.data("height", {
    min: b,
    max: a.height()
  }), a.height(b), $("#editorial.post-page .content-more").show()), $("#editorial.post-page").delegate("#toggle-album-view-control .button", "click", function () {
    $(this).hasClass("selected") || ($(this).hasClass("list") ? $("#editorial.post-page .album-detail").css("display", "inline-block") : $("#editorial.post-page .album-detail").hide(), $("#toggle-album-view-control .button").removeClass("selected"), $(this).addClass("selected"))
  })
}), $(document).delegate("#editorial.all-posts-page", "pageLoaded", function () {
  EditorialHelper.initPostListFrame($("#content-frame"))
}), $(document).delegate("#editorial.album-of-the-day-posts-page", "pageLoaded", function () {
  EditorialHelper.initPostListFrame($("#content-frame"))
}), $(document).delegate("#editorial.genre-posts-page", "pageLoaded", function () {
  EditorialHelper.initPostListFrame($("#content-frame"))
}), $(document).delegate("#editorial.artist-posts-page", "pageLoaded", function () {
  EditorialHelper.initPostListFrame($("#content-frame"))
});
var EditorialHelper = {
  currentPage: null,
  endPage: null,
  retrievingPage: !1,
  postHeight: null,
  frame: null,
  enable: function () {
    this.retrievingPage = !1
  },
  disable: function () {
    this.retrievingPage = !0
  },
  incrementPage: function () {
    this.currentPage = this.currentPage + 1
  },
  setEndPage: function () {
    this.endPage = this.currentPage
  },
  initPostListFrame: function (a) {
    a.scroll(EditorialHelper.scrollPage), this.frame = a, this.postHeight = a.find("#post-list-frame .post").height(), this.currentPage = 1, this.endPage = 0
  },
  scrollPage: function () {
    var a = EditorialHelper,
      b = a.frame.find("#post-list-frame");
    if (!a.retrievingPage && a.currentPage != a.endPage && a.frame.scrollTop() + a.frame.height() > a.frame.find("#post-list-frame").height() - a.postHeight * 10) {
      a.disable();
      var c = b.attr("href") + "?v=" + app_version + "&page=" + (a.currentPage + 1) + (b.attr("params") ? "&" + b.attr("params") : "") + $.param(dynamicQueryParams());
      $.doTimeout("loading-timeout", 1e3, function () {
        showActionMessage("loading", Locale.messages.loading)
      }), $.ajax({
        url: c,
        statusCode: {
          200: function (a, b, c) {
            var d = $(a).find(".post");
            d.length > 0 ? ($("#post-list-frame").append(d), EditorialHelper.incrementPage()) : EditorialHelper.setEndPage()
          }
        },
        error: function () {
          EditorialHelper.setEndPage()
        },
        complete: function () {
          $.doTimeout("loading-timeout"), hideActionMessage(), EditorialHelper.enable()
        }
      })
    }
  },
  allPostsFormSubmit: function () {
    var a = $("#post-filter-form"),
      b = "/" + a.serialize(),
      c = a.attr("action") + b.replace(/[=&]/g, "/").replace(/\/(media|genre|category)\/all/g, "");
    loadDynamicPage(c, !1, !0)
  },
  centerEmbeddedMediaImage: function (a) {
    var b = $(a);
    if (b.width() > b.parent().width()) {
      var c = -((b.width() - b.parent().width()) / 2);
      b.css("margin-left", c)
    }
  },
  getTab: function () {
    return $("#editorial-page-nav").attr("tab")
  },
  doOnVideoLoad: function () {
    MiniPlayer.status == MiniPlayer.statuses.PLAYING && pause()
  },
  pauseVideoPlayback: function () {
    typeof DelvePlayer != "undefined" && typeof DelvePlayer.getPlayer().getPlayer() != "undefined" && DelvePlayer.doGetCurrentPlayState().isPlaying && DelvePlayer.doPause(), $("#mtvVideo").size() > 0 && $("#mtvVideo")[0].pause(), $("#mtvSimulcast").size() > 0 && $("#mtvSimulcast")[0].pause()
  }
};
$(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate("#breadcrumb .crumb-label", "mouseenter", function () {
    hideAllBreadcrumbMenus();
    var a = $(this).parent(".crumb").addClass("has-focus");
    a.addClass("current"), a.hasClass("no-genres") || setTimeout(function () {
      if (a.hasClass("has-focus")) {
        var b = a.attr("id");
        $.ajax({
          url: "/genre/drop_down?genreId=" + b + "&" + $.param(dynamicQueryParams()),
          success: function (b) {
            a.addClass("current");
            if (b && b != "") {
              a.addClass("show-genres");
              var c = a.find(".crumb-menu");
              c.empty().append(b);
              var d = a.find(".crumb-label"),
                e = parseInt(d.css("width")),
                f = parseInt(c.css("width")),
                g = 2;
              e + g >= f && c.css("width", e + g + "px");
              var h = a.next().find(".name").html();
              c.find(".name").each(function (a, b) {
                $(b).html() == h && $(b).parent().addClass("selected")
              }), c.show()
            }
          }
        })
      }
    }, 350)
  }), $("#main").delegate("#breadcrumb .crumb-label", "mouseleave", function (a) {
    $(this).parent().removeClass("has-focus")
  }), $("#main").delegate("#breadcrumb .crumb-label", "mousemove", function (a) {
    $("#breadcrumb .crumb:not('.has-focus')").removeClass("current").removeClass("show-genres"), $("#breadcrumb .crumb:not('.has-focus') .crumb-menu").hide()
  }), $("#main").delegate("#breadcrumb-container", "mouseleave", function (a) {
    hideAllBreadcrumbMenus()
  })
}), $(document).delegate("body", "siteLoaded", function () {
  $("#nav-browse-genre .current a").live("click", function (a) {
    a.stopImmediatePropagation(), a.preventDefault(), $("#nav-browse-genre").hasClass("menu-open") ? ($("#nav-browse-genre").removeClass("menu-open"), $("#nav-browse-genre .options").hide()) : (hideAllTheMenus(a), $("#nav-browse-genre").addClass("menu-open"), $("#nav-browse-genre .options").show())
  }), $("#nav-browse-genre .options a").live("click", function () {
    $("#nav-browse-genre").removeClass("menu-open"), $("#nav-browse-genre .options").hide()
  }), $("#main").delegate("#browse-page", "pageLoaded", function () {
    $(this).find(".genre-item").first().find("#line").addClass("no-image")
  })
}), $(document).delegate("body", "siteLoaded", function () {
  downloadedOnly = !1, doneDownloading = !1, downloadingStarted = !1, typeof ClientAuthentication != "undefined" && ClientAuthentication.setAuthenticationInfo(Account.username, Account.getProperties().cobrand, Account.getProperties().guid, Account.token, Account.getProperties().accountType);
  if (typeof ClientDeviceSync != "undefined") {
    var a = Account.getProperties().accountType;
    ClientDeviceSync.isSupported() && (a == "RHAPSODY_TOGO" || a == "RHAPSODY_PREMIER") && ($("#nav-device-sync").show(), $(document).delegate("#nav-device-sync", "click", function (a) {
      a.preventDefault(), ClientDeviceSync.isInstalled() ? ClientDeviceSync.launchApplication() : navigateToPage("/devicesync")
    }), $(document).delegate("#devicesync-download", "click", function (a) {
      a.preventDefault(), ClientDeviceSync.launchInstaller()
    }))
  }
  typeof ClientDownloads != "undefined" && ($("body").addClass("desktop-client"), $("#footer-mtv").hide(), $("#main").delegate("#offline-client-page", "pageLoaded", function () {
    offlineMode = !0, offlineLibraryView = "albums", switchToOfflineChrome(), enableTemplates(), $.extend(Queue, OfflineQueue), showDownloadedLibraryPage(), $(document).delegate(".library-artist-link", "click", function (a) {
      a.preventDefault(), $(this).siblings().removeClass("selected"), $(this).addClass("selected"), renderDownloadedLibraryPeek($(this).attr("id"), $(this).attr("name"), offlineLibraryView)
    }), $(document).delegate(".downloaded-playlists-tab, .show-playlists", "click", function () {
      showDownloadedPlaylistsPage()
    }), $(document).delegate(".show-library, .downloaded-library-tab", "click", function (a) {
      showDownloadedLibraryPage()
    }), $(document).delegate(".downloaded-playlist .play-button", "click", function () {
      playTrackDataList(ClientDownloads.playlistTrackDownloads($(this).attr("playlist_id")))
    }), $(document).delegate(".downloaded-playlist .queue-button", "click", function () {
      queueTrackDataList(ClientDownloads.playlistTrackDownloads($(this).attr("playlist_id")))
    }), $(document).delegate(".downloaded-playlist-play-button", "click", function (a) {
      a.preventDefault(), playTrackItemList("#playlist-tracks")
    }), $(document).delegate(".downloaded-playlist-queue-button", "click", function (a) {
      a.preventDefault(), queueTrackItemList("#playlist-tracks")
    }), $(document).delegate(".play-all .play-button", "click", function (a) {
      a.preventDefault(), playTrackItemList(".library-tracks")
    }), $(document).delegate(".album-item .play-button", "click", function (a) {
      a.preventDefault();
      var b = $(this).closest(".album-item").attr("shortcut");
      playTrackItemList("#" + b)
    }), $(document).delegate(".album-item .queue-button", "click", function (a) {
      a.preventDefault();
      var b = $(this).closest(".album-item").attr("shortcut");
      queueTrackItemList("#" + b)
    }), $(document).delegate(".offline-library-play-all .offline-options-button", "click", function (a) {
      a.preventDefault(), offlineContextMenu(this, a, tracksFromItemList(".library-tracks"), "track-list")
    }), $(document).delegate(".album-item .offline-options-button", "click", function (a) {
      a.preventDefault();
      var b = $(this).closest(".album-item").attr("shortcut");
      offlineContextMenu(this, a, tracksFromItemList("#" + b), "track-list")
    }), $(document).delegate(".track-item .offline-options-button", "click", function (a) {
      a.preventDefault();
      var b = $(this).parents(".track-item");
      b && b.attr("track_id") && offlineContextMenu(this, a, trackFromAttributes(b))
    }), $(document).delegate(".downloaded-playlist .offline-options-button", "click", function (a) {
      a.preventDefault(), offlineContextMenu(this, a, ClientDownloads.playlistTrackDownloads($(this).attr("playlist_id")), "playlist")
    }), $(document).delegate(".playlist-page-header .offline-options-button", "click", function (a) {
      a.preventDefault(), offlineContextMenu(this, a, tracksFromItemList("#playlist-tracks"), "track-list")
    }), $(document).delegate(".play-all .queue-button", "click", function (a) {
      a.preventDefault(), queueTrackItemList(".library-tracks")
    }), $(document).delegate(".playlist .name", "click", function (a) {
      showDownloadedPlaylistPage($(this).attr("playlist_id"), $(this).attr("playlist_name"))
    }), $(document).delegate("#albums-view-toggle", "click", function () {
      renderDownloadedLibraryPeek($(this).attr("artistid"), $(this).attr("name"), "albums")
    }), $(document).delegate("#tracks-view-toggle", "click", function () {
      renderDownloadedLibraryPeek($(this).attr("artistid"), $(this).attr("name"), "tracks")
    }), $(document).delegate(".album-view-artist-link", "click", function () {
      renderDownloadedLibraryPeek($(this).attr("artist_id"), $(this).attr("artist_name"), "albums")
    }), $(document).delegate(".album-link", "click", function () {
      var a = $(this).closest(".album-item").attr("album_id"),
        b = $(this).closest(".album-item").attr("artist_id"),
        c = $(this).closest(".album-item").attr("artist_name");
      renderDownloadedLibraryAlbumPeek(b, c, a)
    })
  }), $("#main").delegate(".library-page", "pageLoaded", function () {
    if (typeof offlineMode == "undefined") {
      pageNavUrl().match(new RegExp("/members/" + memberShortcut() + "/library[.+]?")) && $("#content-header").append("<div class='subtabs'><ul><li class='selected'><a class='all-music'>" + ClientLocale.allMusic + "</a></li><li><a class='downloaded-music'>" + ClientLocale.downloaded + "</a></li></ul></div>");
      var a = ClientDownloads.artistDownloads(),
        b = new Array;
      for (var c in a) {
        var d = a[c];
        b.push(d.id)
      }
      $("ul#library-artist-list li").each(function () {
        jQuery.inArray($(this).attr("artist_id"), b) != -1 ? $(this).addClass("downloaded") : $(this).addClass("not-downloaded")
      }), downloadedOnly = !1
    }
    $("#content-header").delegate(".all-music", "click", function () {
      $(".subtabs").find("li").removeClass("selected"), $(this).parent().addClass("selected"), $("li.not-downloaded").show(), $(".list").children().show(), $("#library-recent-header").show(), $("#library-recent-list").show(), navigateToPage(pageNavUrl()), downloadedOnly = !1
    }), $("#content-header").delegate(".downloaded-music", "click", function () {
      $(".subtabs").find("li").removeClass("selected"), $(this).parent().addClass("selected"), $("li.not-downloaded").hide(), $("#library-recent-header").hide(), $("#library-recent-list").hide(), $("#peek #main-content").find("#library-recent-view").length > 0 && $("#library-artist-list .downloaded a").length > 0 && navigateToPage($("#library-artist-list .downloaded a").attr("href")), downloadedOnly = !0;
      var a = !0;
      $("#library-artist-list .downloaded").length == 0 ? showNoDownloadsMessage() : $("#library-artist-view").length || $("#library-albums").length ? $("li.selected").hasClass("not-downloaded") ? navigateToPage($("#library-artist-list .downloaded a").attr("href")) : removeUndownloadedItems() : $("#library-album-view").length ? $("li.selected").hasClass("not-downloaded") ? navigateToPage($("#library-artist-list .downloaded a").attr("href")) : showDownloadedTrackStatus() ? removeUndownloadedItems() : navigateToPage($("#library-artist-list .downloaded a").attr("href")) : $(".library-tracks .track-item.downloaded").length ? removeUndownloadedItems() : showNoRecentDownloadsMessage()
    })
  }), $(document).delegate(".download-cancel", "click", function (a) {
    var b = $(this).parents(".track-item");
    if (b && b.attr("track_id")) {
      var c = trackFromAttributes(b);
      ClientDownloads.removeTrackDownloads([c.id])
    }
  }), $(document).delegate("#cancel-all-downloads", "click", function (a) {
    ClientDownloads.removeAllPendingTrackDownloads(), showAllDownloads(a)
  }), $("#context-menu").delegate("#download-link", "click", function (a) {
    var b = $("#context-menu").data("contextItem"),
      c = getContentType(b.id),
      d = b.artistId;
    if (c == "track")
      if ($("#member-hub.playlist-page").length > 0) {
        var e = {
          id: $(".playlist-item").first().attr("playlist_id"),
          name: $(".playlist-item").first().attr("playlist_name")
        };
        downloadPlaylistTrack(e, b)
      } else downloadTrack(b);
      else c == "album" ? downloadAlbum(b) : c == "playlist" ? downloadPlaylist(b) : b.length != 0 && (downloadTracks(b), d = b[0].artistId);
    $("#member-hub.library-page").length > 0 && $("ul#library-artist-list li").each(function () {
      $(this).attr("artist_id") == d && $(this).addClass("downloaded").removeClass("not-downloaded")
    }), $("#album-overview-page").length > 0 && $("#content-frame .album-item").addClass("downloaded"), $("#library-albums").length != 0 && $("#library-albums li.album-item").each(function () {
      var a = $(this);
      for (var c in b) {
        var d = b[c];
        a.attr("album_id") == d["albumId"] && a.addClass("downloaded")
      }
    }), a.preventDefault(), hidePopup()
  }), $("#context-menu").delegate("#remove-download-link", "click", function (a) {
    if (typeof offlineMode == "undefined") {
      var b = $("#context-menu").data("contextItem"),
        c = getContentType(b.id),
        d = b.artistId;
      if (c == "track")
        if ($("#member-hub.playlist-page").length > 0) {
          var e = $(".playlist-item").first().attr("playlist_id");
          removeDownloadedPlaylistTrack(e, b)
        } else removeDownloadedTrack(b);
        else c == "album" ? removeDownloadedAlbum(b) : c == "playlist" ? removeDownloadedPlaylist(b) : b.length != 0 && (removeDownloadedTracks(b), d = b[0].artistId);
      $.doTimeout("", 500, function () {
        checkLibraryArtistDownloadStatus(d)
      }), $("#library-albums").length != 0 && $("#library-albums li.album-item").each(function () {
        var a = $(this);
        for (var c in b) {
          var d = b[c];
          a.attr("album_id") == d["albumId"] && a.removeClass("downloaded")
        }
      })
    }
    a.preventDefault(), hidePopup()
  }), $("#main").delegate("", "pageLoaded", function (a) {
    showAllDownloads(a)
  }))
});
var OfflineQueue = {
  itemCount: function () {
    var a = 0,
      b = [];
    for (var c in this.items) {
      var d = trackFromAttributes($(this));
      b.push(this.items[c].track.id)
    }
    var e = ClientDownloads.tracksCacheState(b);
    for (var f in this.items) e[this.items[f].track.id] != null && a++;
    return a
  },
  getNext: function (a) {
    if (this.selectedItem) {
      var b = this.items.length - this.selectedItem.playIndex - 1;
      for (var c = 0; c < b; c++) {
        var d = this.items[this.selectedItem.playIndex + 1 + c],
          e = ClientDownloads.tracksCacheState([d.track.id]);
        if (e[d.track.id] != null) return d
      }
      if (this.items.length != 0 && (this.repeating || a))
        for (var c = 0; c < this.items.length; c++) {
          var d = this.items[c],
            e = ClientDownloads.tracksCacheState([d.track.id]);
          if (e[d.track.id] != null) return d
        }
    }
    return null
  },
  getPrevious: function () {
    if (this.selectedItem) {
      var a = this.selectedItem.playIndex;
      for (var b = 0; b < a; b++) {
        var c = this.items[this.selectedItem.playIndex - b - 1],
          d = ClientDownloads.tracksCacheState([c.track.id]);
        if (d[c.track.id] != null) return c
      }
      if (this.repeating && this.items.length != 0)
        for (var b = 0; b < this.items.length; b++) {
          var c = this.items[this.items.length - b - 1],
            d = ClientDownloads.tracksCacheState([c.track.id]);
          if (d[c.track.id] != null) return c
        }
    }
    return null
  },
  currentTrack: function () {
    if (this.selectedItem) {
      var a = this.selectedItem.track.id,
        b = ClientDownloads.tracksCacheState([a]);
      if (b[a] != null) return this.selectedItem.track;
      var c = this.getNext();
      c && !MiniPlayer.stopped ? this.play(c) : this.stop()
    }
    return null
  }
};
$(document).delegate("body", "siteLoaded", function () {
  $("#client-registered-machines-dialog").delegate(".remove-machine", "click", function (a) {
    var b = $(this).parent().attr("machine_guid");
    $(this).parent().remove(), $.post("/client/remove_machine", {
      machine_guid: b,
      _method: "put"
    }, function (a) {}), $("#registered-machines").children().length == 0 && $("#registered-machines").append("<div class='no-machines'>" + Locale.messages.noMachinesAuthorized + "</div>")
  }), $("#client-registered-machines-dialog").delegate("input.submit", "click", function (a) {
    a.preventDefault(), hideDialog()
  }), $("#client-error-dialog").delegate("input.submit", "click", function (a) {
    a.preventDefault(), hideDialog()
  })
}), $(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate("#cloudsync-page", "pageLoaded", function () {
    navigator.appVersion.indexOf("Mac") != -1 ? ($("#cloudsync-page").css("background", "url(../assets/marketing/cloudsync-mac.jpg) no-repeat 10px 158px"), $("#cloudsync-download").attr("href", "http://download.rhap.com/ricloudsync/RhapsodyCloudSync-US.dmg")) : ($("#cloudsync-page").css("background", "url(../assets/marketing/cloudsync-windows.jpg) no-repeat 10px 158px"), $("#cloudsync-download").attr("href", "http://download.rhap.com/ricloudsync/RhapsodyCloudSync-US.exe"))
  })
}), $(document).delegate("body", "siteLoaded", function () {
  loadFooter(!1)
});
var selected_context_item = null,
  lastUsedPlaylist = null;
$(document).ready(function () {
  var a = ["id", "guid", "token", "username"],
    b = new Date;
  b.setTime(b.getTime() - 1);
  for (var c = 0; c < a.length; c++) document.cookie = a[c] + "='';expires=" + b.toGMTString();
  var d = readCookie("ob-newuser" + Account.getProperties().username);
  if (d || Account.getProperties().accountAge >= 1) Account.setUserPreference("tourShown"), deleteCookie("ob-newuser" + Account.getProperties().username);
  var e = readCookie("ob-desktop");
  e && (Account.setUserPreference("clientOnboardingShown"), deleteCookie("ob-desktop"));
  var f = readCookie("survey_shown");
  f && (Account.setUserPreference("marketingSurveyShown"), deleteCookie("survey_shown"));
  var g = window.localStorage.getItem("tophat_upsell_closed_id-" + Account.getProperties().username);
  g && (Account.setUserPreference("lastTophatShown", g), window.localStorage.removeItem("tophat_upsell_closed_id-" + Account.getProperties().username))
}), $(document).delegate("body", "siteLoaded", function () {
  Account.getProperties()["experienceType"] != "free" && (Favorites.store(), $("#main").delegate(".favorites-page .delete-button", "click", function () {
    var a = $(this).parents(".track-item"),
      b = null;
    if (a && a.attr("track_id")) {
      b = a.attr("track_id");
      var c = currentQueue().currentTrack();
      c && c["id"] == b && $("#player-favorite").removeClass("selected")
    }
    Favorites.removeTrack(b)
  }), $("#player-favorite").show())
});
var Favorites = {
  id: "Unknown",
  tracks: null,
  buttonLock: !1,
  store: function () {
    url = "/members/" + memberShortcut() + "/favorites/list", $.getJSON(dynamicUrl(url), function (a) {
      for (var b in a) a[b] = a[b].toLowerCase();
      Favorites.tracks = a
    })
  },
  hasTrack: function (a) {
    return Favorites.tracks && $.inArray(a.toLowerCase(), Favorites.tracks) >= 0
  },
  checkForTrack: function (a) {
    if (Favorites.buttonLock) return;
    Favorites.tracks ? $.inArray(a.toLowerCase(), Favorites.tracks) != -1 ? $("#player-favorite").addClass("selected") : $("#player-favorite").removeClass("selected") : $("#player-favorite").removeClass("selected")
  },
  playerButton: function (a) {
    var b = currentQueue().currentTrack();
    a.hasClass("selected") ? (Favorites.buttonLock = !0, a.removeClass("selected"), $.doTimeout("", 1200, function () {
      Favorites.buttonLock = !1
    }), Favorites.removeTrack(b.id)) : (Favorites.buttonLock = !0, a.addClass("selected"), $.doTimeout("", 1200, function () {
      Favorites.buttonLock = !1
    }), Favorites.tracks || this.showOnboarding(a), Favorites.addTrack(b.id, "player"))
  },
  addTrack: function (a, b) {
    $.ajax({
      type: "POST",
      url: "/members/" + memberShortcut() + "/favorites/add",
      data: {
        track_id: a
      },
      statusCode: {
        401: function () {
          userNotValid = !0
        }
      },
      success: function (a) {
        isMyFavoritesPage() && loadDynamicPage("/members/" + memberShortcut() + "/favorites"), $.doTimeout("", 1e3, function () {
          Favorites.store()
        }), b == "context-menu" && (showActionMessage("action", Locale.messages.addedTrackToFavorites), $.doTimeout("alerting-timeout", 1e3, function () {
          hideActionMessage()
        }))
      },
      error: function (a, b) {
        b == 1 ? userNotValidDialog() : (showActionMessage("action", Locale.messages.errorAddingToPlaylist), $.doTimeout("alerting-timeout", 1e3, function () {
          hideActionMessage()
        }))
      }
    })
  },
  removeTrack: function (a) {
    $.ajax({
      type: "POST",
      url: "/members/" + memberShortcut() + "/favorites/remove",
      data: {
        track_id: a
      },
      statusCode: {
        401: function () {
          userNotValid = !0
        }
      },
      success: function (b) {
        isMyFavoritesPage() && ($(".favorites-page .favorite-tracks li").length == 1 ? loadDynamicPage("/members/" + memberShortcut() + "/favorites") : $(".favorites-page .favorite-tracks li").each(function (b) {
          if ($(this).attr("track_id").toLowerCase() == a.toLowerCase()) {
            var c = $(this);
            c.slideUp("normal", function () {
              c.remove()
            })
          }
        })), $.doTimeout("", 1e3, function () {
          Favorites.store()
        })
      },
      error: function (a, b) {
        b == 1 && userNotValidDialog()
      }
    })
  },
  showOnboarding: function (a) {
    $("#favorites-introduction").fadeIn(), $("#favorites-introduction").position({
      my: "right top",
      at: "left top",
      of: a,
      offset: "3 -11",
      collision: "flip"
    }), $("#favorites-introduction").find(".close-button").first().unbind("click").click(function (a) {
      $("#favorites-introduction").fadeOut()
    }), $("#favorites-introduction").find(".dialog-buttons").first().unbind("click").click(function (a) {
      $("#favorites-introduction").fadeOut()
    })
  }
}, FacebookMusic = {
    fbMusic: {
      url: "",
      context: "",
      autoplay: "false"
    },
    init: function (a) {
      facebookEnabled() && (FB.Event.subscribe("fb.music.PLAY", FacebookMusic.playCallback), FB.Event.subscribe("fb.music.RESUME", FacebookMusic.resumeCallback), FB.Event.subscribe("fb.music.PAUSE", FacebookMusic.pauseCallback), FB.Event.subscribe("fb.music.STATUS", FacebookMusic.statusCallback), FB.Event.subscribe("fb.music.BRIDGE_READY", FacebookMusic.readyCallback), FB.Event.subscribe("fb.music.ALREADY_CONNECTED", FacebookMusic.connectedCallback))
    },
    playCallback: function (a) {
      if (!FacebookMusic.isCurrentTrackEqualTrackFromFacebook(a) && FacebookMusic.fbMusic.autoplay == "false") {
        FacebookMusic.musicFromFacebook(a);
        if (FacebookMusic.fbMusic.url) {
          var b = FacebookMusic.fbMusic.url.substring(FacebookMusic.fbMusic.url.indexOf("rhapsody.com") + 12);
          playCollection(dynamicUrl(FacebookMusic.fbMusic.url + "/queue")), navigateToPage(b)
        }
      }
      FacebookMusic.fbMusic.autoplay = "false"
    },
    resumeCallback: function (a) {
      if (currentQueue().currentTrack() != null && FacebookMusic.fbMusic.url != "") play();
      else {
        FacebookMusic.musicFromFacebook(a);
        if (FacebookMusic.fbMusic.url) {
          var b = FacebookMusic.fbMusic.url.substring(FacebookMusic.fbMusic.url.indexOf("rhapsody.com") + 12);
          playCollection(dynamicUrl(FacebookMusic.fbMusic.url + "/queue")), navigateToPage(b)
        }
      }
    },
    pauseCallback: function (a) {
      pause()
    },
    statusCallback: function (a) {
      facebookEnabled() && FB.getAuthResponse() && FB.Music.send("STATUS", {
        playing: !1,
        song: FacebookMusic.fbMusic.url,
        user_id: FB.getAuthResponse().userID
      })
    },
    readyCallback: function (a) {},
    connectedCallback: function (a) {},
    autoplay: function () {
      if (pageNavUrl().indexOf("?play") != -1) {
        var a = pageNavUrl().substring(0, pageNavUrl().indexOf("?"));
        if (document.cookie.indexOf("fb_autoplay") != -1) {
          var b = readCookie("fb_autoplay");
          b && $.each(b.split("&"), function (a, b) {
            var c = b.split("=")[0],
              d = b.split("=")[1];
            FacebookMusic.fbMusic[c] = d
          })
        }
        playCollection(dynamicUrl(a + "/queue")), FacebookMusic.fbMusic.autoplay = "true", deleteCookie("fb_autoplay")
      }
    },
    play: function () {
      this.verifyCurrentTrackFromFacebook();
      if (facebookEnabled() && FB.getAuthResponse() && this.haveTrackFromFacebook()) {
        var a = currentUTCDateTime();
        setTimeout(function () {
          FB.Music.send("STATUS", {
            playing: !0,
            song: FacebookMusic.fbMusic.url,
            created_time: a,
            expires_in: currentQueue().currentTrack().totalTime,
            user_id: FB.getAuthResponse().userID
          })
        }, 3e3)
      }
    },
    pause: function () {
      facebookEnabled() && FB.getAuthResponse() && this.haveTrackFromFacebook() && FB.Music.send("STATUS", {
        playing: !1,
        song: FacebookMusic.fbMusic.url,
        user_id: FB.getAuthResponse().userID
      })
    },
    stop: function () {
      this.isCurrentTrackFromFacebook() && (this.pause(), this.fbMusic = {
        url: "",
        context: ""
      })
    },
    verifyCurrentTrackFromFacebook: function () {
      this.isCurrentTrackFromFacebook() || (this.pause(), this.fbMusic = {
        url: "",
        context: ""
      })
    },
    haveTrackFromFacebook: function () {
      return this.fbMusic.url != ""
    },
    isCurrentTrackFromFacebook: function () {
      if (this.haveTrackFromFacebook()) {
        var a = this.fbMusic.url.substring(this.fbMusic.url.indexOf("rhapsody.com") + 12);
        if (this.fbMusic.context == "album") return getLinkToAlbum(currentQueue().currentTrack()) == a;
        if (this.fbMusic.context == "track") return getLinkToTrack(currentQueue().currentTrack()) == a;
        if (this.fbMusic.context == "artist") return getLinkToArtist(currentQueue().currentTrack()) == a;
        if (this.fbMusic.context == "playlist") return currentQueue().currentTrack().sourceId == (this.fbMusic.url.substring(this.fbMusic.url.indexOf("mp.")) || this.fbMusic.url.substring(this.fbMusic.url.indexOf("pp.")))
      }
      return !1
    },
    isCurrentTrackEqualTrackFromFacebook: function (a) {
      return currentQueue().currentTrack() != null ? a.song ? getLinkToTrack(currentQueue().currentTrack()) == a.song.substring(a.song.indexOf("rhapsody.com") + 12) : a.album ? getLinkToAlbum(currentQueue().currentTrack()) == a.album.substring(a.album.indexOf("rhapsody.com") + 12) : a.musician ? getLinkToArtist(currentQueue().currentTrack()) == a.musician.substring(a.musician.indexOf("rhapsody.com") + 12) : a.playlist ? currentQueue().currentTrack().sourceId == (a.playlist.substring(a.playlist.indexOf("mp.")) || a.playlist.substring(a.playlist.indexOf("pp."))) : !1 : !1
    },
    unloadPage: function () {
      facebookEnabled() && FB.getAuthResponse() && typeof FB.Music != "undefined" && FB.Music.send("STATUS", {
        offline: !0,
        user_id: FB.getAuthResponse().userID
      })
    },
    musicFromFacebook: function (a) {
      a.song ? this.fbMusic = {
        url: a.song,
        context: "track"
      } : a.album ? this.fbMusic = {
        url: a.album,
        context: "album"
      } : a.musician ? this.fbMusic = {
        url: a.musician,
        context: "artist"
      } : a.playlist ? this.fbMusic = {
        url: a.playlist,
        context: "playlist"
      } : this.fbMusic = {
        url: "",
        context: ""
      }
    },
    fb_error: function () {
      facebookEnabled() && FB.Music.send("STATUS", {
        error_code: 101,
        redirect_url: url,
        playing: !1,
        song: url,
        user_id: FB.getAuthResponse().userID
      })
    }
  };
$(document).ready(function () {
  FacebookMusic.init(fb_app_id), window.onbeforeunload = function () {
    FacebookMusic.unloadPage()
  }
}), $(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate("#genre-key-artists-page", "pageLoaded", function () {
    pageNavUrl(), deepLinkQueue.length == 0 && (captureDeepLinks($("#genre-key-artists-page #genre-artists li:first a").attr("href")), processDeepLinkQueue())
  }), $("#main").delegate("#genre-artists-page", "pageLoaded", function () {
    deepLinkQueue.length == 0 && (captureDeepLinks($("#genre-artists-page #genre-artists li:first a").attr("href")), processDeepLinkQueue())
  }), $("#main").delegate("#genre-filter .current", "mouseenter", function () {
    $("#genre-filter").addClass("menu-open"), $(this).siblings(".options").show()
  }), $("#main").delegate(".genre-page #genre-filter", "mouseleave", function () {
    $("#genre-filter").removeClass("menu-open"), $(".genre-page #genre-filter .options").hide()
  }), $("#main").delegate(".genre-page #genre-filter a", "click", function () {
    $("#genre-filter").removeClass("menu-open").find(".options").hide()
  })
}), this.JSON || (this.JSON = {}),

function () {
  function f(a) {
    return a < 10 ? "0" + a : a
  }

  function quote(a) {
    return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) {
      var b = meta[a];
      return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }) + '"' : '"' + a + '"'
  }

  function str(a, b) {
    var c, d, e, f, g = gap,
      h, i = b[a];
    i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)), typeof rep == "function" && (i = rep.call(b, a, i));
    switch (typeof i) {
    case "string":
      return quote(i);
    case "number":
      return isFinite(i) ? String(i) : "null";
    case "boolean":
    case "null":
      return String(i);
    case "object":
      if (!i) return "null";
      gap += indent, h = [];
      if (Object.prototype.toString.apply(i) === "[object Array]") {
        f = i.length;
        for (c = 0; c < f; c += 1) h[c] = str(c, i) || "null";
        return e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g, e
      }
      if (rep && typeof rep == "object") {
        f = rep.length;
        for (c = 0; c < f; c += 1) d = rep[c], typeof d == "string" && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e))
      } else
        for (d in i) Object.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
      return e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g, e
    }
  }
  typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (a) {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) {
    return this.valueOf()
  });
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap, indent, meta = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    }, rep;
  typeof JSON.stringify != "function" && (JSON.stringify = function (a, b, c) {
    var d;
    gap = "", indent = "";
    if (typeof c == "number")
      for (d = 0; d < c; d += 1) indent += " ";
    else typeof c == "string" && (indent = c);
    rep = b;
    if (!b || typeof b == "function" || typeof b == "object" && typeof b.length == "number") return str("", {
      "": a
    });
    throw new Error("JSON.stringify")
  }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
    function walk(a, b) {
      var c, d, e = a[b];
      if (e && typeof e == "object")
        for (c in e) Object.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
      return reviver.call(a, b, e)
    }
    var j;
    text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }));
    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
      "": j
    }, "") : j;
    throw new SyntaxError("JSON.parse")
  })
}(), $(document).delegate("body", "siteLoaded", function () {
  Account.isLoggedIn() && getSettings(Account.username).keyboardShortcuts == 1 && switchTitles($("a#shortcut-enable-link"))
});
var active_popup = null,
  active_dialog = null,
  active_dialog_parent = null,
  updateUpsellCounter = 5,
  queue_extended = !1,
  queue_minified = !1;
$(document).delegate("body", "siteLoaded", function () {
  if (!Account.areCookiesValid()) {
    Account.logout(), window.location = "/authentication/login";
    return
  }
  $.ajaxSetup({
    timeout: 2e4
  }), $("#container").delegate("", "pageLoadFailed", function (a) {
    EventReporting.reportPageView()
  }), $("#container").delegate("", "pageLoaded", function (a) {
    updateHeaderMenu(), updateUpsell(), updateAdvertisements(pageNavUrl()), !Account.isLoggedIn() && !free_play_nag_shown ? (pageNavUrl().indexOf("facebook=true") >= 0 ? sidedoorDialog("#facebook-sidedoor-dialog") : isArtistPage() && (Locale.isMtv() ? sidedoorDialog("#mtv-sidedoor-dialog") : sidedoorDialog("#sidedoor-dialog", Locale.messages.andMillions)), free_play_nag_shown = !0) : free_play_nag_shown = !0, (history.pushState || History.getState().url.indexOf("#") == -1) && EventReporting.reportPageView()
  }), $(document).delegate("#publish-listening", "click", function (a) {
    a.preventDefault();
    var b = !getScrobblingFlag();
    togglePublishListeningText(b), setScrobblingFlag(b)
  }), $(document).delegate("a.no-link", "click", function (a) {
    a.stopImmediatePropagation(), a.preventDefault()
  }), $("#nav").delegate(".nav-menu ul li a", "click", function () {
    $(".nav-menu").removeClass("menu-open")
  }), $("#header-nav").delegate(".nav-item", "click", function (a) {
    updateHeaderMenu($(this).attr("id"))
  }), $("#header").delegate("#signed-in-nav", "click", function (a) {
    a.stopPropagation(), $("#settings-menu").is("visible") ? ($("#settings-menu").hide(), $("#service-nav .nav-menu").removeClass("menu-open")) : (hideAllTheMenus(a), $("#settings-menu").show().position({
      my: "right top",
      at: "right top",
      of: $("#settings-nav-item")
    }), $("#service-nav .nav-menu").addClass("menu-open"))
  }), $(document).delegate("#settings-menu-dropdown", "click", function () {
    $("#settings-menu").hide()
  }), $("#service-nav").delegate(".nav-menu ul li a", "click", function () {
    $("#service-nav .nav-menu").removeClass("menu-open")
  }), $("body").delegate(".dialog-box .close-button", "click", function () {
    hideDialog()
  }), $("#knockout").mousedown(function () {
    $("#facebook-oneclick-onboarding-dialog").is(":visible") || hideDialog()
  }), $("body").keydown(function (a) {
    $("#facebook-oneclick-onboarding-dialog").is(":visible") || a.which == 27 && hideDialog()
  }), $("#version-update-reload-dialog .submit").live("click", function () {
    window.location.reload()
  }), $("#version-update-reload-dialog input.cancel").live("click", function (a) {
    a.preventDefault(), $("#version-update-reload-dialog").hide()
  }), typeof page_country != "undefined" && $("body").addClass(page_country + "-country"), typeof LanguageSelector != "undefined" && $("body").addClass(LanguageSelector.language + "-language"), Locale.eu16() && $("body").addClass("eu16");
  if (Account.isLoggedIn()) {
    showSignedIn();
    var a = Account.getProperties().experienceType;
    $("body").addClass(a + "-experience");
    switch (a) {
    case "7daytrial":
      $("body").addClass("sevendaytrial-experience"), showTrialCountdown();
      break;
    case "7daytrialcc":
      $("body").addClass("sevendaytrialcc-experience");
      break;
    case "30daytrial":
      $("body").addClass("thirtydaytrial-experience"), showTrialCountdown();
      break;
    case "14daytrial":
      $("body").addClass("fourteendaytrial-experience"), showTrialCountdown();
      break;
    case "30daytrialcc":
      $("body").addClass("thirtydaytrialcc-experience");
      break;
    case "subscriber":
      $(".refer").show();
      if (!Account.doNotShowUpgrade())
        if (Account.getProperties().accountType == "RHAPSODY_PREMIER") $(".premier-upgrade").show();
        else if (Account.getProperties().accountType == "RHAPSODY" || Account.getProperties().accountType == "RHAPSODY_UNLIMITED") $(".premier-upgrade a").attr("href", "/0d"), $(".premier-upgrade").show();
      break;
    case "expired":
      playSamplesMode();
      break;
    case "suspended":
      showSuspendedDialog(), playSamplesMode()
    }
    $(".signed-in-only").show(), $(".signed-out-only").hide(), $("#logout-link").click(function (a) {
      a.preventDefault();
      var b = $(a.currentTarget).attr("href"),
        c = b + addGoToQueryString(pageNavUrl());
      return LanguageSelector.language != page_locale && (c += "&l=" + LanguageSelector.language), page_country == "eu" && (c += "&c=" + Account.getProperties().country), setTimeout(function () {
        document.location = c
      }, 500), !1
    })
  } else $("body").addClass("free-experience"), loadAdvertisements(), playSamplesMode(), $(".signed-in-only").hide(), $(".signed-out-only").show(), $("#login-link").click(function (a) {
    a.preventDefault();
    var b = ["/my_music", "/country"],
      c = $(a.currentTarget).attr("href"),
      d = c;
    return $.inArray(window.location.pathname, b) < 0 && (d = c + addGoToQueryString(pageNavUrl())), setTimeout(function () {
      document.location = d
    }, 500), !1
  });
  $("#upsell-content").load("/messagecenter/index.html", function () {
    showRandomElement($("#upsell-content .upsell-message"))
  }), resizeFrame(), setMyMusicLinks(), $("#upsell-toggle").click(function (a) {
    $("#upsell").hasClass("closed") ? ($("#upsell").removeClass("closed"), $("#queue-frame").animate({
      height: $("#queue-frame").height() - 90
    }), $("#upsell-content").animate({
      height: $("#upsell-content").height() + 90
    }), $("#upsell-toggle").text(Locale.messages.close)) : ($("#upsell").addClass("closed"), $("#queue-frame").animate({
      height: $("#queue-frame").height() + 90
    }), $("#upsell-content").animate({
      height: $("#upsell-content").height() - 90
    }), $("#upsell-toggle").text(Locale.messages.open)), $.doTimeout("rec-timeout", 500, function () {
      resizeFrame()
    })
  }), $(document).delegate("#upsell-content a", "click", function (a) {
    a.button == 0 && a.metaKey != 1 && a.ctrlKey != 1 && (a.preventDefault(), href = $(this).attr("href"), href.indexOf("http") != 0 ? loadDynamicPage(href, !1) : window.open(href))
  }), $("#content-frame").scroll(function (a) {}), $(document).keyup(function (a) {
    (a.metaKey == 0 || a.ctrlKey == 0) && !playbackSamples && $("body").removeClass("queue-option-toggled")
  }), $(document).keydown(function (a) {
    (a.metaKey == 1 || a.ctrlKey == 1) && !playbackSamples && $("body").addClass("queue-option-toggled")
  }), $(window).focus(function (a) {
    (a.metaKey == 1 || a.ctrlKey == 1) && !playbackSamples && $("body").addClass("queue-option-toggled")
  }), $(window).blur(function (a) {
    $("body").removeClass("queue-option-toggled")
  }), $(document).click(function (a) {
    hideAllTheThings(a)
  }), $(document).delegate("#main", "pageLoaded", function () {
    $("#content-frame").scroll(function (a) {
      hideAllTheThings(a)
    })
  }), $("#queue, #player").mouseenter(function () {
    if (queue_minified == 1 && trackQueue.getItems().length > 0) {
      var a = $(window).height() - $("#header").height() - $("#player").height() - 80;
      $("#queue-frame").css("height", a), updateQueuePointer(), $("#queue-minified").hide(), $("#queue-showing").show(), $("#queue-pointer-top, #queue-pointer-bottom").hide(), $("#queue-frame").slideDown(), queue_extended = !0, updateQueuePointer()
    }
  }), $("#player-queue").mouseleave(function () {
    queue_extended == 1 && (queue_extended = !1, $.doTimeout("rec-timeout", 1e3, function () {
      queue_extended == 0 && ($("#queue-frame").slideUp(), $("#queue-showing").hide(), $("#queue-pointer-top, #queue-pointer-bottom").hide(), trackQueue.getItems().length > 0 && $("#queue-minified").show())
    }))
  })
});
var ajaxRequests = 0;
$(document).ajaxStart(function () {
  ajaxRequests++
}), $(document).ajaxStop(function () {
  ajaxRequests--
}), jQuery.event.add(window, "load", resizeFrame), jQuery.event.add(window, "resize", function () {
  resizeFrame(), hidePopup()
}), $(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate(".library-page .play-all .delete-button", "click", function (a) {
    a.stopImmediatePropagation();
    if ($(this).attr("trackids") != null) {
      var b = $(this).attr("trackIds"),
        c = b.split(",");
      c.pop()
    } else {
      var c = new Array($(".library-tracks").children().length),
        d = 0;
      $(".library-tracks").children().each(function () {
        var a = $(this);
        c[d] = a.attr("track_id"), d++
      })
    }
    typeof ClientDownloads != "undefined" && ClientDownloads.removeTrackDownloads(c);
    var e = $("#library-artist-name a"),
      f = $("#library-artist-id").val();
    e.length > 0 ? deleteLibraryTracksDialog({
      name: $.trim(e.text()),
      id: f,
      trackIds: c
    }) : deleteLibraryTracksDialog({
      trackIds: c,
      id: f
    })
  }), $("#delete-library-tracks-dialog").delegate(".submit", "click", function () {
    var a = $("#delete-library-tracks-dialog").data("item");
    if (a.albumId) {
      hideDialog(), Library.removeAlbum(a);
      return
    }
    var b = a.id;
    typeof ClientDownloads != "undefined" && ClientDownloads.removeTrackDownloads(a.trackIds), $.post(dynamicUrl("/library/remove"), {
      trackIds: a.trackIds,
      _method: "put"
    }, function (a) {
      if ($("#library-recent-view").length == 0) {
        if ($("#library-album-view").length != 0) {
          var c = $("#number-of-albums").val(),
            d = $("#library-artist-item-" + b.replace(".", "_"));
          if (c > 1) {
            navigateToPage(d.find("a").attr("href"));
            return
          }
        }
        if ($("#library-artist-list").children().length <= 1) typeof ClientDownloads != "undefined" && downloadedOnly ? checkLibraryArtistDownloadStatus(b) : loadDynamicPage("/members/" + memberShortcut() + "/library");
        else {
          var d = $("#library-artist-item-" + b.replace(".", "_"));
          typeof ClientDownloads != "undefined" && downloadedOnly ? d.prevAll("li.downloaded").length > 0 ? navigateToPage(d.prevAll("li.downloaded:first").find("a").attr("href")) : d.nextAll("li.downloaded").length > 0 && navigateToPage(d.nextAll("li.downloaded:first").find("a").attr("href")) : d.prev().length > 0 ? navigateToPage(d.prev().find("a").attr("href")) : d.next().length > 0 && navigateToPage(d.next().find("a").attr("href")), d.slideUp("normal", function () {
            $(this).remove()
          })
        }
        $("#library-artist-list").children().length > 1 && typeof ClientDownloads != "undefined" && downloadedOnly && checkLibraryArtistDownloadStatus(b)
      } else loadDynamicPage(pageNavUrl(), !0)
    }), hideDialog()
  }), $("#delete-library-tracks-dialog").delegate("input.cancel", "click", function (a) {
    a.preventDefault(), hideDialog()
  }), $("#main").delegate(".library-page .track-item .delete-button", "click", function () {
    var a = $(this);
    Library.removeTracks(a)
  })
});
var Library = {
  removeTracks: function (a) {
    var b = a.parent().find(".id").val(),
      c = a.closest(".track-item");
    typeof ClientDownloads != "undefined" && ClientDownloads.removeTrackDownloads([b]), $.post(dynamicUrl("/library/remove"), {
      trackIds: [b],
      _method: "put"
    }, function (b) {
      if (c.siblings().size() == 0)
        if ($("#library-recent-view").length == 0) {
          if ($("#library-album-view").length != 0) {
            var d = $("#library-artist-id").val(),
              e = $("#number-of-albums").val(),
              f = $("#library-artist-item-" + d.replace(".", "_"));
            if (e > 1) {
              navigateToPage(f.find("a").attr("href"));
              return
            }
          }
          typeof ClientDownloads != "undefined" && downloadedOnly ? checkLibraryArtistDownloadStatus(c.attr("artist_id")) : updateSelectedLibraryArtist()
        } else loadDynamicPage(pageNavUrl(), !0);
        else a.parent().slideUp("normal", function () {
          a.parent().remove()
        })
    })
  },
  removeAlbum: function (a) {
    $.post(dynamicUrl("/library/remove"), {
      albumId: a.albumId,
      _method: "put"
    }, function (b) {
      context_item_origin.closest(".album-item").remove(), $("ul#library-albums div.album-item").length == 0 && ($("ul#library-artist-list li.selected").hide(), typeof ClientDownloads != "undefined" && removeDownloadedAlbum(a), loadDynamicPage("/members/" + memberShortcut() + "/library"))
    })
  },
  removeStation: function (a) {
    var b = a.parent().attr("radio_id"),
      c = a.closest(".radio-station-item");
    $.post(dynamicUrl("/library/remove"), {
      stationId: b,
      _method: "put"
    }, function (b) {
      c.siblings().size() == 0 ? loadDynamicPage(pageNavUrl(), !0) : a.parent().slideUp("normal", function () {
        a.parent().remove()
      })
    })
  },
  add: function (a, b) {
    var c = null,
      d = Locale.messages.addedTracksToLibrary;
    switch (b) {
    case "track":
      c = {
        trackIds: a.id
      };
      break;
    case "album":
      c = {
        albumId: a.id
      };
      break;
    case "station":
      c = {
        stationId: a.id
      }, d = Locale.messages.addedStationToMyStations;
      break;
    case "player":
      var e = trackQueue.getItems(),
        f = [];
      for (var g = 0; g < e.length; g++) f[g] = e[g].track.id;
      c = {
        trackIds: f
      };
      break;
    case "track-list":
      var f = new Array(a.length);
      for (var g = 0; g < a.length; g++) f[g] = a[g].id;
      c = {
        trackIds: f
      }
    }
    c != null && $.post(dynamicUrl("/library/add"), c, function (a) {
      showActionMessage("action", d), $.doTimeout("alerting-timeout", 1e3, function () {
        hideActionMessage()
      }), isMyLibraryPage() && loadDynamicPage("/members/" + memberShortcut() + "/library"), reportEvent("Add to Library")
    }).error(function (a) {
      a.status == 401 && userNotValidDialog()
    })
  }
};
$(document).delegate("body", "siteLoaded", function () {
  $("#container").delegate("#language-select-menu a", "click", function (a) {
    a.preventDefault();
    var b = $(this).attr("language"),
      c = window.location.href.replace(/([?&])l=[^&]*[&]?/, "$1").replace(/[&?]$/, "");
    LanguageSelector.setLanguage(b), window.location = c.replace("#", "")
  }), $("#language-select-menu .selected").removeClass("selected");
  var a;
  $("#language-select-menu li a").each(function () {
    $(this).attr("language") == LanguageSelector.language && ($(this).addClass("selected"), a = $(this).text())
  }), a && $("#language-select").html(a)
});
var Locale = {
  defaultLocale: "us",
  defaultLanguage: "en",
  euLocales: ["de", "uk"],
  eu16Locales: ["at", "be", "dk", "fi", "fr", "gr", "ie", "it", "lu", "nl", "no", "pt", "es", "se", "ch", "tr", "eu"],
  country: typeof page_country != "undefined" ? page_country : "us",
  language: typeof page_locale != "undefined" ? page_locale : "en",
  isDefaultLocale: function () {
    return this.country == this.defaultLocale
  },
  getProperties: function () {
    return {
      locale: this.country
    }
  },
  us: function () {
    return this.country == "us"
  },
  eu: function () {
    return $.inArray(Locale.country, Locale.euLocales) >= 0
  },
  eu16: function () {
    return $.inArray(Locale.country, Locale.eu16Locales) >= 0
  },
  trialRequiresCreditCard: function () {
    return this.eu() || this.eu16()
  },
  showsOnboarding: function () {
    return this.us()
  },
  showsRadioNag: function () {
    return this.us()
  },
  showsTrialSignupDialog: function () {
    return this.us()
  },
  showsTophatUpsell: function () {
    return this.us()
  },
  showsSurvey: function () {
    return this.us()
  },
  supportsThinClient: function () {
    return this.eu()
  },
  isNapster: function () {
    return this.eu() || this.eu16()
  },
  useBitlyForPostShares: function () {
    return this.us()
  },
  isMtv: function () {
    return this.country == "mtvde"
  }
}, PageMetadata = {
    getMetadata: function (a) {
      a = typeof a == "undefined" ? ".page-metadata" : a;
      var b = {};
      if ($(a).length > 0) {
        var c = $(a).get(0).attributes;
        c && $.each(c, function (a) {
          var d = c[a];
          if (d.name.indexOf("meta_") == 0) {
            var e = d.value;
            try {
              e = $.parseJSON(d.value)
            } catch (f) {}
            b[d.name.substring(5)] = e
          }
        })
      }
      return b
    },
    getMetadataQueryStr: function (a) {
      var b = this.getMetadata(a),
        c = [];
      for (var d in b) {
        var e = b[d];
        if (typeof e == "string") c.push(d + "=" + encodeURIComponent(e));
        else
          for (var f in e) c.push(d + "=" + encodeURIComponent(e[f]))
      }
      return c.join("&")
    }
  }, free_play_nag_shown = !1,
  free_play_periodic_upsell_count = 3,
  free_play_count = free_play_periodic_upsell_count;
$(document).delegate("body", "siteLoaded", function () {
  $(document).delegate(".free-experience .radio-station-item .play-button a", "click", function (a) {
    a.stopImmediatePropagation(), Locale.showsRadioNag() && radioPlayNagPopup($(this))
  }), $(document).delegate(".free-experience #queue-link a", "click", function (a) {
    a.stopImmediatePropagation(), a.preventDefault(), Locale.showsTrialSignupDialog() && trialSignupDialog()
  }), $(document).delegate(".expired-experience #main #popular-artists .radio-station-item .play-button a", "click", function (a) {
    a.stopImmediatePropagation(), radioPlayExpiredNagPopup($(this))
  }), $(document).delegate(".expired-experience #main #my-artist-stations .radio-station-item .play-button a", "click", function (a) {
    a.stopImmediatePropagation(), radioPlayExpiredNagPopup($(this))
  }), $(document).delegate(".expired-experience #artist-overview-page .radio-station-item .play-button a", "click", function (a) {
    a.stopImmediatePropagation(), radioPlayExpiredNagPopup($(this))
  }), Account.getProperties()["experienceType"] == "subscriber" && Locale.showsSurvey() && typeof ClientDownloads == "undefined" && !Account.getUserPreference("marketingSurveyShown") && Math.random() <= .01 && rhapsodySurveyDialog()
});
var memberSettingsData = {
  _method: "put"
}, facebookData = {
    _method: "put"
  }, Member = {
    screenname: "",
    artists: [],
    genres: [],
    getArtists: function (a) {
      this.artists.length == 0 ? $.get("/members/" + memberShortcut() + "/recent_artists.json", function (b, c) {
        Member.artists = c == "success" ? b : [], a(Member.artists)
      }) : a(this.artists)
    }
  };
$(document).delegate("body", "siteLoaded", function () {
  facebookEnabled() && FB.init({
    appId: fb_app_id,
    cookie: !0,
    status: !0,
    xfbml: !0,
    oauth: !0,
    music: MiniPlayerUtil.hasRequestedVersion()
  }), $("#visibility-toggler").live("click", function () {
    $.post("/members/" + memberShortcut(), {
      _method: "put",
      visibility: $("#visibility-toggler").hasClass("private") ? "public" : "private"
    }, function (a, b) {
      b == "success" && (toggler = $("#visibility-toggler"), toggler.attr("class", a.visibility), toggler.attr("title", "Your member profile is " + (a.visibility == null ? "anonymous" : a.visibility)))
    })
  }), $(".follow-toggler").live("click", function () {
    $.post("/members/" + $(this).attr("screenname") + "/people/followers", $(this).hasClass("following") ? {
      _method: "delete"
    } : null, function (a, b) {
      b != "success"
    }), $(this).hasClass("following") ? ($(this).removeClass("following"), $(this).text(Locale.messages.follow)) : ($(this).addClass("following"), $(this).text(Locale.messages.unfollow))
  }), $("#play-radio-button").live("click", function () {
    playMemberStream($(this).attr("screenname"), $(this).attr("name"))
  }), $("#member-profile-dialog .submit").click(function () {
    memberSettingsValidation() && (memberSettingsData.screenName = $("#member-screenname input").val(), memberSettingsData.facebookId ? memberSettingsData.scrobblingEnabled = $(".connected input").is(":checked") ? "true" : "false" : memberSettingsData.realName = $("#connect-rhapsody-yes").is(":checked") ? $("#member-real-name input").val() : "", memberSettingsData.bio = $("#connect-rhapsody-yes").is(":checked") ? $("#member-bio textarea").val() : "", memberSettingsData.visibility = $("#connect-rhapsody-yes").is(":checked") ? "public" : "private", $.ajax({
      type: "POST",
      url: "/members/" + memberShortcut(),
      data: memberSettingsData,
      complete: function (a, b, c) {
        a.status == 201 ? (hideDialog(), setMyMusicLinks(), reloadWithShortcut(), Account.update(memberSettingsData)) : a.status == 401 && $("#member-screenname .error").text(Locale.messages.screenNameTaken).slideDown("fast")
      }
    }))
  }), $("#oneclick-submit").click(function () {
    $("#member-visibility").is(":checked") && (memberSettingsData.visibility = "public", $.ajax({
      type: "POST",
      url: "/members/" + memberShortcut(),
      data: memberSettingsData
    })), subscribeToEmail()
  }), $("#member-profile-dialog .cancel").click(function () {
    hideDialog(), removeFacebookCreds()
  }), $("#main").delegate("#member-hub", "pageLoaded", function () {
    var a = $(".page-metadata").attr("meta_screenname");
    a == memberShortcut() ? initializeEditProfileButton() : toggleMemberFollowButtons($("#content-header")), $.browser.msie && parseInt($.browser.version, 10) <= 8 ? document.location.hash.indexOf("?editprofile") != -1 && showMemberSettings() : pageNavUrl().indexOf("?editprofile") != -1 && showMemberSettings(), Account.properties["experienceType"] == "expired" && ($("#play-radio-button").css("opacity", .5), $(".profile-radio").hover(function () {
      $(this).css("cursor", "none"), $(this).find(".title").css("background-position", "100% 0"), $(this).find(".button").css("background-position", "0 0")
    }))
  }), $("#main").delegate("#genre-people-page", "pageLoaded", function () {
    toggleMemberFollowButtons($("#genre-people-page"))
  }), $("#main").delegate("#artist-people-page", "pageLoaded", function () {
    toggleMemberFollowButtons($("#artist-people-page"))
  }), $("#main").delegate("#member-hub.people-page", "pageLoaded", function () {
    toggleMemberFollowButtons($("#member-hub.people-page")), $("#member-search-form .search-button").mousedown(function (a) {
      a.preventDefault(), ContactsHelper.searchForMember($("#member-search .search-box").val())
    }), $("#member-search-form").submit(function (a) {
      a.preventDefault(), ContactsHelper.searchForMember($("#member-search-form .search-box").val())
    })
  }), $("#main").delegate("#member-hub.library-page", "pageLoaded", function () {
    deepLinkQueue.length == 0 && (captureDeepLinks($("#library-artist-list li:first a").attr("href")), processDeepLinkQueue())
  }), $("#main").delegate("#member-hub.people-page", "pageLoaded", function () {
    facebookEnabled() || $("#people-nav li.facebook").hide(), Account.properties["experienceType"] == "expired" && ($("#content").find(".play-button").css("opacity", .5), $("#content").find(".play-button a").hover(function () {
      $(this).css("cursor", "none"), $(this).css("background-position", "0 0")
    }))
  }), $("#profile-edit").live("click", function () {
    showMemberSettings()
  }), $("#facebook-connect-container").delegate(".connect-button", "click", function () {
    connectFacebook("settings-page")
  }), $("#facebook-connect-container").delegate(".log-out", "click", function () {
    clearFacebookId()
  }), $("#main").delegate("#profile-facebook-connect-button", "click", function () {
    connectFacebook("profile-page")
  }), $("#main").delegate("#welcome-facebook-connect-button", "click", function () {
    connectFacebook("welcome-page")
  }), $("#main").delegate("#member-hub.profile-page #artists .more-stripe .more-button", "click", function () {
    $("#artists-more").is(":visible") ? ($("#artists-more").slideUp(), $(this).children(".more-arrow-down").show(), $(this).children(".more-arrow-up").hide()) : ($("#artists-more").slideDown(), $(this).children(".more-arrow-down").hide(), $(this).children(".more-arrow-up").show())
  }), $("#member-profile-dialog").delegate("#connect-rhapsody-yes", "click", function () {
    $("#member-real-name input").removeAttr("disabled").css("opacity", "1"), $("#member-bio textarea").removeAttr("disabled").css("opacity", "1"), Locale.napster() ? ($("#napster-connected-logo").show(), $("#napster-connect-logo").hide()) : ($("#rhapsody-connected-logo").show(), $("#rhapsody-connect-logo").hide())
  }), $("#member-profile-dialog").delegate("#connect-rhapsody-no", "click", function () {
    $("#member-real-name input").attr("disabled", "disabled").css("opacity", ".6"), $("#member-bio textarea").attr("disabled", "disabled").css("opacity", ".6"), Locale.isNapster() ? ($("#napster-connect-logo").show(), $("#napster-connected-logo").hide()) : ($("#rhapsody-connect-logo").show(), $("#rhapsody-connected-logo").hide())
  }), $("#member-profile-dialog").delegate("#member-screenname input", "keyup", function () {
    $("#member-profile-dialog .address-end").html($("#member-screenname input").attr("value"))
  }), $("#main").delegate("#member-hub.profile-page", "pageLoaded", function () {
    function a() {
      b(), c(), d(), resizeFrame()
    }

    function b() {
      var a = [],
        b = [];
      $("#artists ol li").each(function (c, d) {
        c < 5 ? a.push(d) : b.push(d)
      }), b.length > 0 && ($("#artists").append("<ol class='lower'></ol>"), $("#artists ol.lower").append($(b)), $("#artists ol.upper").after($("#artists ol.lower")), $("#artists ol.lower li ").each(function (a, b) {
        $(this).prepend($(this).find(".play-button")), $(this).find(".artistart-controls").remove()
      }))
    }

    function c() {
      $("#artists ol.lower").length > 0 ? ($("#artists-more").show(), $("#artists-more .handle").click(function () {
        $("#artists-more .handle").hasClass("open") ? ($("#artists ol.lower").slideUp(), $("#artists-more .handle").removeClass("open")) : ($("#artists ol.lower").slideDown(), $("#artists-more .handle").addClass("open"))
      })) : $("#artists-overlap-hint").css("top", "0px")
    }

    function d() {
      $("#artists ol.upper").show(), $("#member-hub.profile-page").show()
    }
    Account.isLoggedIn() ? (Member.getArtists(function (b) {
      if (b.length > 0 && memberShortcut() != $("#artists").attr("member"))
        for (var c = 0; c < b.length; c++) {
          var d = $("#artist-" + b[c].id.replace(".", "_"));
          d.length > 0 && (d.addClass("highlight").prependTo($("#artists ol")), $("#artists-overlap-hint").show())
        }
      a()
    }), Account.properties["experienceType"] == "expired" && ($("#listening-history").find(".play-button").css("opacity", .5), $("#listening-history").find(".play-button a").hover(function () {
      $(this).css("cursor", "none"), $(this).css("background-position", "0 0")
    }))) : a()
  }), $("#main").delegate("#member-hub.profile-page #recent-items .album-item .view-tracks", "click", function () {
    $(this).removeClass("view-tracks").addClass("hide-tracks"), $(this).parent().find(".track-list").show()
  }), $("#main").delegate("#member-hub.profile-page #recent-items .album-item .hide-tracks", "click", function () {
    $(this).removeClass("hide-tracks").addClass("view-tracks"), $(this).parent().find(".track-list").hide()
  }), $("#main").delegate("#member-hub.people-page.followees", "pageLoaded", function () {
    $("#find-people li.service").click(function () {
      ContactsHelper.launchAuthPopup($(this).attr("service"), $(this).attr("path"))
    })
  }), $("#main").delegate("#member-hub.listening-history-page", "pageLoaded", function () {
    Account.properties["experienceType"] == "expired" && ($("#content").find(".play-button").css("opacity", .5), $("#content").find(".play-button a").hover(function () {
      $(this).css("cursor", "none"), $(this).css("background-position", "0 0")
    }))
  })
});
var ContactsHelper = {
  authPopupWindow: null,
  resultDialog: null,
  anonymousMemberData: null,
  launchAuthPopup: function (a, b) {
    this.authPopupWindow && !this.authPopupWindow.closed && this.authPopupWindow.focus ? this.authPopupWindow.focus() : (this.closeAuthPopup(), this.authPopupWindow = window.open("/auth/" + b, "", "toolbar=0,width=600,height=470"), window.name = "PIXIES_AUTH_READY", window.authCallback = function (a, b) {
      ContactsHelper.retrieveContacts(a, b)
    }, window.authReset = function () {
      ContactsHelper.resetContactsAuth()
    })
  },
  closeAuthPopup: function () {
    this.authPopupWindow && this.authPopupWindow.close && this.authPopupWindow.close(), window.name = "", this.authPopupWindow = null
  },
  resetContactsAuth: function () {
    window.name == "PIXIES_AUTH_READY" && this.authPopupWindow && (window.name = "", this.closeAuthPopup())
  },
  searchForMember: function (a) {
    a.length > 0 && ($.doTimeout("loading-timeout", 1e3, function () {
      showActionMessage("loading", Locale.messages.loading)
    }), this.setupResultsDialog(), $.ajax({
      url: "/members/" + memberShortcut() + "/people/search?s=" + a,
      success: function (a) {
        ContactsHelper.resultDialog.find(".dialog-content").html(a), ContactsHelper.setupEmailAnonymous()
      },
      error: function () {
        ContactsHelper.resultDialog.find(".error").show()
      },
      complete: function () {
        $.doTimeout("loading-timeout"), hideActionMessage(), showDialog(ContactsHelper.resultDialog)
      }
    }))
  },
  setupResultsDialog: function () {
    this.resultDialog = $("#find-people-results-dialog"), this.resultDialog.find(".error").hide(), this.resultDialog.find(".close-button").first().unbind("click").click(function (a) {
      ContactsHelper.closeContactsDialog()
    }), this.resultDialog.find(".button.done").first().unbind("click").click(function (a) {
      ContactsHelper.sendAnonymousEmail(), ContactsHelper.closeContactsDialog()
    })
  },
  retrieveContacts: function (a, b) {
    this.closeAuthPopup(), $.doTimeout("loading-timeout", 1e3, function () {
      showActionMessage("loading", Locale.messages.loading)
    }), this.setupResultsDialog(), $.ajax({
      url: "/members/" + memberShortcut() + "/people/contacts?service=" + a + "&token=" + b,
      timeout: 2e4,
      success: function (a) {
        ContactsHelper.resultDialog.find(".dialog-content").html(a), ContactsHelper.setupEmailAnonymous()
      },
      error: function () {
        ContactsHelper.resultDialog.find(".error").show()
      },
      complete: function () {
        $.doTimeout("loading-timeout"), hideActionMessage(), showDialog(ContactsHelper.resultDialog)
      }
    })
  },
  closeContactsDialog: function () {
    hideDialog(), this.resultDialog.find(".dialog-content").text(""), navigateToPage(pageNavUrl())
  },
  setupEmailAnonymous: function () {
    var a = this.resultDialog;
    a.find(".toggle-email input.yes").click(function (a) {
      var b = ContactsHelper.resultDialog;
      b.find(".demo-email").slideDown("slow"), b.find("li.toggle-select-all").show(), b.find("input.select-anonymous").show()
    }), a.find(".toggle-email input.no").click(function (a) {
      var b = ContactsHelper.resultDialog;
      b.find(".demo-email").slideUp("slow"), b.find("li.toggle-select-all").hide(), b.find("input.select-anonymous").hide()
    }), a.find(".anonymous-member").each(function (a, b) {
      b = $(b), b.data("member", {
        email: b.attr("email"),
        guid: b.attr("guid")
      }), b.removeAttr("email"), b.removeAttr("guid")
    }), a.find(".toggle-select-all :checkbox").click(function (a) {
      ContactsHelper.resultDialog.find(".select-anonymous").attr("checked", this.checked)
    })
  },
  sendAnonymousEmail: function () {
    if (this.resultDialog.find(".toggle-email input:checked").val() == "yes") {
      ContactsHelper.anonymousMemberData = "";
      var a = ContactsHelper.resultDialog;
      a.find("#anonymous-member-contacts-message").removeClass("error success").hide(), a.find(".anonymous-member").each(function (a, b) {
        if ($(b).find("input.select-anonymous").attr("checked")) {
          var c = $(b).data("member");
          ContactsHelper.anonymousMemberData += "&members[][guid]=" + c.guid + "&members[][email]=" + c.email
        }
      }), $.ajax({
        url: "/members/" + memberShortcut() + "/people/contact",
        type: "POST",
        data: ContactsHelper.anonymousMemberData,
        success: function () {
          showNotice("info", Locale.contactsMessage.sendSuccessful, !1), $.doTimeout(7e3, function () {
            hideNotice()
          })
        },
        error: function () {
          showNotice("warning", Locale.contactsMessage.sendFailed, !1), $.doTimeout(7e3, function () {
            hideNotice()
          })
        }
      })
    }
  }
}, FacebookHelper = {
    requiredPermissions: ["email", "publish_actions", "user_likes", "user_interests", "friends_interests", "friends_likes"]
  };
$(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate("#browser", "pageLoaded", function () {
    RhapsodyCustomerConfigProbe.init()
  })
});
var isIE = navigator.appVersion.indexOf("MSIE") != -1 ? !0 : !1,
  isWin = navigator.appVersion.toLowerCase().indexOf("win") != -1 ? !0 : !1,
  isOpera = navigator.userAgent.indexOf("Opera") != -1 ? !0 : !1;
RhapsodyCustomerConfigProbe = {
  flashVersion: null,
  browserName: null,
  browserVersion: null,
  osName: null,
  osVersion: null,
  renderBoxId: "customercfg",
  init: function () {
    this.reportCustomerConfig()
  },
  _getUserAgent: function () {
    return navigator.userAgent
  },
  _getFlash: function () {
    return GetSwfVer()
  },
  reportCustomerConfig: function () {
    var a = "<p>Flash version: " + this._getFlash() + " UserAgent: " + this._getUserAgent() + "</p>";
    document.getElementById(this.renderBoxId).innerHTML = a
  }
}, $(document).delegate("body", "siteLoaded", function () {
  $(document).delegate("#main .play-button a", "click", function (a) {
    a.preventDefault();
    var b = a.metaKey != 1 && a.ctrlKey != 1 || playbackSamples,
      c = $(this).parents(".track-item");
    if (c && c.attr("track_id")) {
      var d = trackFromAttributes(c);
      queueTrack(d, b)
    } else if ($(this).parents(".radio-station-item").length > 0) c = $(this).parents(".radio-station-item"), c && c.attr("radio_id") && playRadio(c.attr("radio_id"), c.attr("radio_name"));
    else if ($(this).parents(".album-item").length > 0) {
      c = $(this).parents(".album-item");
      if (c.attr("album_id")) {
        var e = albumFromAttributes(c),
          f = $(c).parent().find(".track-list");
        f.length > 0 ? queueTrackItemList(f, b) : queueAlbum(e, b)
      }
    } else if ($(this).parents(".playlist-item").length > 0) {
      var g = $(this).parents(".playlist-item");
      g = playlistFromAttributes(g), queuePlaylist(g, b)
    } else if ($(this).parents(".play-all").length > 0)
      if ($(this).parents(".feature-module").children("#top-tracks").children().length > 4) queueTrackItemList($("#top-tracks"), b);
      else if ($(this).parents(".play-all").attr("artistId")) {
      var h = $(this).parents(".play-all").attr("artistId");
      queueArtist(h, b, getPlaySourceMetadata(this))
    } else if ($(this).parents(".play-all").attr("genrePath")) {
      var i = $(this).parents(".play-all").attr("genrePath");
      queueGenre(i, b, getPlaySourceMetadata(this))
    }
  }), $("#main").delegate(".playlist-page .rights-button", "mouseenter", function (a) {
    $(this).siblings(".rights-explanation").show()
  }), $("#main").delegate(".library-page .rights-button", "mouseenter", function (a) {
    var b = $(this).position();
    $(this).siblings(".rights-explanation").css("top", b.top - 53).css("left", b.left).show()
  }), $("#main").delegate(".options-button-disabled", "mouseenter", function (a) {
    var b = $(this).position();
    $(this).siblings(".rights-explanation").css("top", b.top - 53).css("left", b.left - 180).show()
  }), $("#main").delegate(".rights-button, .options-button-disabled", "mouseleave", function (a) {
    $(this).siblings(".rights-explanation").hide()
  }), $(document).delegate("#main .play-link a", "click", function (a) {
    a.preventDefault();
    var b = $(this).parents(".track-item");
    b && b.attr("track_id") && (b = trackFromAttributes(b), playTrack(b))
  }), $(document).delegate("#main .options-button a", "click", function (a) {
    a.preventDefault(), a.stopImmediatePropagation();
    var b = $(this).parents(".track-item");
    if (b && b.attr("track_id")) b = trackFromAttributes(b), contextPlusMenu(this, a, b, "track");
    else if ($(this).parents(".album-item").length > 0) {
      var c = $(this).parents(".album-item");
      c.attr("album_id") && (c.attr("library_album") ? contextPlusMenu(this, a, streamableTracksFromItemList("#" + c.attr("album_shortcut") + "-tracks"), "track-list") : (c = albumFromAttributes(c), contextPlusMenu(this, a, c, "album")))
    } else if ($(this).parents(".playlist-item").length > 0) {
      var d = $(this).parents(".playlist-item");
      d = playlistFromAttributes(d), contextPlusMenu(this, a, d, "playlist")
    } else if ($(this).parents(".radio-station-item").length > 0) {
      var e = radioFromItem($(this));
      contextPlusMenu(this, a, e, "station")
    } else if ($(this).parents(".play-all").length > 0)
      if ($(this).parents(".play-all").attr("artistId")) {
        var f = $(this).parents(".play-all").attr("artistId");
        $(this).parents(".feature-module").children("#top-tracks").children().length > 4 ? contextPlusMenu(this, a, streamableTracksFromItemList("#top-tracks"), "track-list") : getArtistTopTracks(f, this, 50, contextPlusMenu, a)
      } else if ($(this).parents(".play-all").attr("genrePath")) {
      var g = $(this).parents(".play-all").attr("genrePath");
      $(this).parents(".feature-module").children("#top-tracks").children().length > 4 ? contextPlusMenu(this, a, streamableTracksFromItemList("#top-tracks"), "track-list") : getGenreTopTracks(g, this, contextPlusMenu, a)
    }
  }), $(document).delegate("#top-heading, #top-heading-swap, #top-heading-small, #bottom-heading, #bottom-heading-small, ", "click", function (a) {
    hidePopup()
  }), $("#main").delegate(".albumart-controls", "mouseenter", function () {
    $(this).children(".play-button, .options-button, .offline-options-button").stop(!0, !0).fadeIn(150), $(this).find("img").css("opacity", .7), $(this).parent().attr("rectoken") && $(this).children(".thumbs-up, .thumbs-down").stop(!0, !0).fadeIn(150)
  }), $("#main").delegate(".albumart-controls", "mouseleave", function () {
    $(this).parents(".selected").length || ($(this).children(".play-button, .options-button, .offline-options-button, .thumbs-up, .thumbs-down").stop(!0, !0).fadeOut(150), $(this).find("img").css("opacity", 1))
  }), $("#main").delegate(".artistart-controls", "mouseenter", function () {
    $(this).children(".play-button").stop(!0, !0).fadeIn(150), $(this).find("img").css("opacity", .7)
  }), $("#main").delegate(".artistart-controls", "mouseleave", function () {
    $(this).parents(".selected").length || ($(this).children(".play-button").stop(!0, !0).fadeOut(150), $(this).find("img").css("opacity", 1))
  })
}), $(document).delegate("body", "siteLoaded", function () {
  NewUserOnboardingCheck(), DesktopOnboardingCheck(), CloudSyncOnboardingCheck()
}), ignore_push_state = !1, pagesToTrackLoadTimes = ["/welcome", "/album/newreleases", "/about", "/chart/tracks", "/playlist", "/artist/duke_ellington", "/artist/johnny_cash", "/artist/arcade_fire", "/artist/pixies/album/Alb.220913", "/artist/public_enemy/album/Alb.141155", "/artist/yeah_yeah_yeahs/album/Alb.27825016"];
var navigationTracker = new NavigationTracker;
(function (a, b) {
  var c = a.History,
    d = a.jQuery,
    e = a.document;
  if (!c.enabled) return !1;
  d(function () {
    d(e).ready(function () {
      if (d("#container").children().length == 0) {
        var b = LanguageSelector.language;
        d("#container").load(dynamicUrl("/chrome/sitelayout", {
          version: app_version,
          l: b
        }), function (c, e, f) {
          var g = pageNavUrl();
          if (Account.isMyMemberPath(g) || Account.hasSpecialCobrand() || b != page_locale) d("#main-content").remove(), d("body").trigger("siteLoaded"), loadDynamicPage(g, !0);
          else {
            captureDeepLinks(a.location.pathname);
            if (deepLinkQueue.length > 0) {
              var h = deepLinkQueue[0][1][1];
              d.ajax({
                url: h,
                dataType: "html",
                success: function (a) {
                  ajax_dom = jQuery("<div>").append(a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")), d("#main").html(ajax_dom.find("#main-content").children().first()), d("#peek").append(d("#main-content")), d("#main-content").show(), d("body").trigger("siteLoaded")
                }
              })
            } else d("#main").append(d("#main-content").children().first()), d("#main-content").show(), d("body").trigger("siteLoaded")
          }
        })
      } else Account.hasSpecialCobrand() ? (d("#main-content").remove(), d("body").trigger("siteLoaded"), loadDynamicPage(pageNavUrl(), !0)) : (d("body").trigger("siteLoaded"), loadDynamicPage(pageNavUrl().replace("/#/", "/").replace("#", "")))
    }), d(a).bind("statechange", function () {
      var a = c.getState(),
        b = a.url,
        d = e.location,
        f = d.protocol + "//" + d.host;
      b = b.replace(f, ""), b == "" && (b = "/welcome"), ignore_push_state || loadDynamicPage(b, !0), ignore_push_state = !1
    })
  })
})(window), $(document).delegate("body", "siteLoaded", function () {
  $(document).delegate("a.ajax", "click", function (a) {
    a.preventDefault();
    if ($("#main-frame").hasClass("no-ajax")) return;
    if (a.button == 0 && a.metaKey != 1 && a.ctrlKey != 1) {
      a.preventDefault();
      var b = $(this).attr("href");
      b = b.replace(document.location.protocol + "//" + document.location.host, ""), loadDynamicPage(b, !1)
    }
  }), $(document).delegate("a.ad-click-ajax", "click", function (a) {
    if (a.button == 0 && a.metaKey != 1 && a.ctrlKey != 1) {
      a.preventDefault(), href = $(this).attr("href"), href = href.replace(document.location.protocol + "//" + document.location.host, "");
      var b = $(this).attr("ad_click");
      if (b) {
        var c = new Image;
        c.src = b.split("%3f")[0] + "?http://www.rhapsody.com/assets/layout/blank.png?" + (new Date).getTime()
      }
      loadDynamicPage(href, !1)
    }
  })
});
var deepLinkQueue = [],
  trackQueue, _trackChanging = !1,
  playbackSamples = !1,
  queueLimit = $.browser.msie && jQuery.browser.version.substring(0, 1) < 9 ? 200 : 800,
  seekLog = new SeekLog,
  onPlayerReadyRun = !1,
  loadTrackContentErrorRetry = !1;
$(document).delegate("body", "siteLoaded", function () {
  trackQueue = Queue, typeof ClientPlayer == "undefined" && MiniPlayer.subscribe(MiniPlayer.PLAYER_READY, onPlayerReady), MiniPlayer.subscribe(MiniPlayer.PLAY_REQUESTED, onPlayRequested), MiniPlayer.subscribe(MiniPlayer.PLAY_STOPPED, onPlayStopped), MiniPlayer.subscribe(MiniPlayer.TRACK_EVENT, onTrackEvent), MiniPlayer.subscribe(MiniPlayer.TRACK_METADATA, onTrackMetadata), MiniPlayer.subscribe(MiniPlayer.MUTE_CHANGED, onMuteChanged), MiniPlayer.subscribe(MiniPlayer.MODE_CHANGED, onModeChanged), MiniPlayer.subscribe(MiniPlayer.PLAY_TIMER, onPlayTimer), MiniPlayer.subscribe(MiniPlayer.ANONYMOUS_ACCOUNT_CREATED, onAnonymousAccountCreated), MiniPlayer.subscribe(MiniPlayer.PLAYBACK_SESSION_EXPIRED, onPlaybackSessionExpired), MiniPlayer.subscribe(MiniPlayer.ERROR, onError);
  if (typeof ClientPlayer == "undefined") {
    var a = {
      us: "40134",
      uk: "60201",
      de: "60301"
    };
    MiniPlayer.embed("/assets/flash/MiniPlayer.swf?v=" + app_version, "miniPlayer", onFlashUnavailable, miniplayer_env, a[Locale.is])
  } else onPlayerReady();
  playerFlashVersionSupportedWarning()
}), $(function () {
  Account.isLoggedIn() && (Mousetrap.bind("space", function (a) {
    getSettings(Account.username).keyboardShortcuts && ($("#player-play").is(":visible") && (play(), a.preventDefault && a.preventDefault()), $("#player-pause").is(":visible") && (pause(), a.preventDefault && a.preventDefault()))
  }), Mousetrap.bind("right", function (a) {
    if (getSettings(Account.username).keyboardShortcuts) {
      a.preventDefault && a.preventDefault();
      var b = {
        currentTarget: $("#player-next").get(0)
      };
      playNext(b)
    }
  }), Mousetrap.bind("left", function (a) {
    if (getSettings(Account.username).keyboardShortcuts) {
      a.preventDefault && a.preventDefault();
      var b = {
        currentTarget: $("#player-previous").get(0)
      };
      playPrevious(b)
    }
  }))
});
var playlistState = {
  visibleUrl: null
};
$(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate(".playlist-page", "pageLoaded", function () {
    $(".playlist-page .sortable-track-list").sortable({
      update: function (a, b) {
        id = $("#playlist-id").val(), trackIds = new Array, $(".playlist-page .sortable-track-list .id").each(function (a) {
          trackIds.push($(this).val())
        }), $.post(dynamicUrl("/playlist/" + id), {
          trackIds: trackIds,
          _method: "put"
        }, function (a) {})
      },
      axis: "y",
      delay: 30
    })
  }), $("#main").delegate(".playlist-page .rename-playlist", "click", function (a) {
    var b = $(this).parent();
    if (b.find(".edit-form").length == 0) {
      name = $.trim($(this).text()), $(this).hide();
      var c = $("<input />", {
        type: "text",
        id: "new-playlist-name",
        value: name
      });
      return b.append('<div class="edit-form"></div>'), b.children(".edit-form").append(c).append('<input type="button" class="rename-save-button button" value="' + Locale.messages.rename + '"/>'), b.find(".edit-form input").select().focus(), a.stopImmediatePropagation(), !1
    }
  }), $("#main").delegate(".playlist-page", "keydown", function (a) {
    var b = $(this).parent().parent();
    $(".playlist-page .rename-save-button").is(":visible") && (a.which == 27 && (b.find(".rename-playlist").show(), b.find(".edit-form").remove()), a.which == 13 && renamePlaylist(this))
  }), $("#main").delegate(".playlist-page #new-playlist-name", "click", function (a) {
    a.stopImmediatePropagation()
  }), $("#main").delegate(".playlist-page .rename-save-button", "click", function () {
    renamePlaylist(this)
  }), $("#main").delegate(".playlists-page .delete-button", "click", function () {
    var a = $(this).parent().find(".id").val(),
      b = $(this).parent().find(".name a").html();
    deletePlaylistDialog({
      id: a,
      name: b
    })
  }), $("#delete-playlist-dialog").delegate(".submit", "click", function () {
    var a = $("#delete-playlist-dialog").data("item");
    typeof ClientDownloads != "undefined" && ClientDownloads.removePlaylist(a.id), $.post(dynamicUrl("/playlist/" + a.id), {
      _method: "delete"
    }, function (b) {
      lastUsedPlaylist && lastUsedPlaylist.id == a.id && (lastUsedPlaylist = null)
    }), $('input[value="' + a.id + '"]').parent().slideUp("normal", function () {
      $(this).remove()
    }), reportEvent("Playlist", "Deleted"), hideDialog()
  }), $("#delete-playlist-dialog").delegate("input.cancel", "click", function (a) {
    a.preventDefault(), hideDialog()
  }), $("#main").delegate(".playlist-page .delete-button", "click", function () {
    var a = $(this).parents(".track-item"),
      b = null;
    a && a.attr("track_id") && (b = a.attr("track_id")), $(this).parent().slideUp("normal", function () {
      $(this).remove();
      var a = $(this).children(".duration").html(),
        c = $(".play-all .duration").html();
      $(".play-all .duration").html(subtractFromTotalTime(a, c)), id = $("#playlist-id").val(), trackIds = new Array, $(".playlist-page .sortable-track-list .id").each(function (a) {
        trackIds.push($(this).val())
      }), typeof ClientDownloads != "undefined" && ClientDownloads.removePlaylistTrackDownloads(id, [b]), $.post(dynamicUrl("/playlist/" + id), {
        trackIds: trackIds,
        _method: "put"
      }, function (a) {})
    })
  }), $("#add-to-playlist-dialog").delegate("input.submit", "click", function (a) {
    a.preventDefault();
    if ($(this).val() == Locale.messages.add) {
      var b = $("#add-to-existing-playlist-list").val(),
        c = $("#add-to-existing-playlist-list :selected").text();
      object = $("#add-to-playlist-dialog").data("item"), addToPlaylist(b, object), reportEvent("Add to Playlist"), lastUsedPlaylist = {
        id: b,
        name: c
      }
    } else {
      var c = $("#add-to-new-playlist-name").val();
      object = $("#add-to-playlist-dialog").data("item"), createPlaylist(c, object, !1)
    }
    hideDialog()
  }), $("#add-to-playlist-dialog").delegate("#add-to-new-playlist-name", "focus", function (a) {
    a.preventDefault(), $(this).val() == Locale.messages.newPlaylistName && ($(this).removeClass("default"), $(this).select())
  }), $("#add-to-playlist-dialog").delegate("#add-to-new-playlist-name", "blur", function (a) {
    a.preventDefault(), $(this).val() == "" && ($(this).addClass("default"), $(this).val(Locale.messages.newPlaylistName))
  }), $("#add-to-playlist-dialog").delegate("#add-to-playlist-dialog input.cancel", "click", function (a) {
    a.preventDefault(), hideDialog()
  }), $("#add-to-playlist-dialog").delegate(".new-playlist-tab a", "click", function (a) {
    a.preventDefault(), $("#add-to-playlist-dialog .existing-playlist-tab").removeClass("selected"), $("#add-to-playlist-dialog .new-playlist-tab").addClass("selected"), $("#new-playlist-tab-page").show(), $("#existing-playlist-tab-page").hide(), $("#add-to-new-playlist-name").focus(), $("#add-to-playlist-dialog .submit").val(Locale.messages.create)
  }), $("#add-to-playlist-dialog ").delegate(".existing-playlist-tab a", "click", function (a) {
    a.preventDefault(), $("#add-to-playlist-dialog .existing-playlist-tab").addClass("selected"), $("#add-to-playlist-dialog .new-playlist-tab").removeClass("selected"), $("#existing-playlist-tab-page").show(), $("#new-playlist-tab-page").hide(), $("#add-to-existing-playlist-list").focus(), $("#add-to-playlist-dialog .submit").val(Locale.messages.add)
  })
}), $(document).delegate(".radio-page", "pageLoaded", function () {
  $("#my-stations").delegate(".radio-station-item .delete-button", "click", function () {
    var a = $(this);
    Library.removeStation(a)
  }), Account.isLoggedIn() && ($("#my-stations-tab").find("a").attr("href", "/radio/" + memberShortcut() + "/stations"), $("#my-stations-tab").show())
}), $(document).delegate("#recommended-radio-page", "pageLoaded", function () {
  $("#featured-station").load("/featured_radio_module?" + $.param(dynamicQueryParams()), function (a, b, c) {
    $("#featured-loadingmessage").hide(), b != "success" && $("#featured-station-backup").show()
  }), $.doTimeout("rec-timeout", 600, function () {
    $("#my-artist-stations").hide()
  }), Account.isLoggedIn() ? $("#my-artist-stations").load("/radio/recommendation?" + $.param(dynamicQueryParams()), function (a, b, c) {
    $("#loadingmessage").hide(), $.doTimeout("rec-timeout"), $("#my-artist-stations").is(":visible") || $("#my-artist-stations").fadeIn(), b == "error" && $("#my-artist-stations").html(Locale.messages.noRecommendations)
  }) : ($("#loadingmessage").hide(), $("#my-artists").hide());
  var a = $("#artist-search");
  a.val(a.attr("title")), a.focus(function () {
    $(this).val() == $(this).attr("title") && $(this).val("").removeClass("default")
  }), a.blur(function () {
    $(this).val() == "" && $(this).val($(this).attr("title")).addClass("default")
  }), $("#artist-search").click(function () {
    $("#search-artists .ui-autocomplete").show()
  }), jQuery.ui.autocomplete.prototype._renderItem = function (a, b) {
    return $("<li></li>").data("item.autocomplete", b).append("<a>" + b.label + "</a>").appendTo(a)
  }, $("#artist-search").autocomplete({
    position: {
      my: "left top",
      at: "left bottom",
      of: "#artist-search"
    },
    source: function (a, b) {
      $.ajax({
        url: "/search/typeahead/" + a.term + ".json?" + $.param(dynamicQueryParams()),
        data: {
          max: 10,
          name_startsWith: a.term
        },
        success: function (a) {
          b($.map(a.artists, function (a) {
            return {
              label: "<span class='name'>" + a.name + "<span class='description'>" + a.description + "</span></span>",
              value: a.name,
              id: a.id.replace("Art.", "Sas."),
              type: a.type
            }
          }))
        }
      })
    },
    minLength: 2,
    select: function (a, b) {
      if (b.item.id != undefined && b.item.id != "") {
        $("#artist-search").blur(), $("#artist-search").data("_handledKeyPress", !0), $("#artist-search").trigger("click-artist-radio-search-result", b);
        if ($(".free-experience").length > 0) Locale.showsRadioNag() && radioPlayNagPopup($("#artist-search"));
        else {
          var c = Locale.playerMessage.artistRadio.replace("%{artist_name}", b.item.value);
          playRadio(b.item.id, c)
        }
      }
    }
  }).data("autocomplete")._renderMenu = function (a, b) {
    var c = this;
    $(a).addClass("artist-radio-search"), $.each(b, function (b, d) {
      b < 5 && c._renderItem(a, d)
    })
  }
}), $(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate("#new-recs-page", "pageLoaded", function () {})
});
var PageRedirect = {
  redirectSignedOutHome: function (a) {
    var b = this.readCookie("token") == null,
      c = b && a == "/",
      d = a;
    return c && (d = "/start"), {
      doRedirect: c,
      destination: d
    }
  },
  getTestCase: function (a, b) {
    var c = this.readCookie("ab_testing");
    c || (c = Math.random().toFixed(10).toString(), c = c.replace("0.", ""), this.saveCookie("ab_testing", c, 30)), document.location.search.indexOf("?ab_testing=") != -1 && (c = document.location.search.replace("?ab_testing=", ""), this.saveCookie("ab_testing", c, 30));
    var d = c,
      e = d.substring((a - 1) * 2, (a - 1) * 2 + 2),
      f = parseInt(e),
      g = 0;
    for (var h = 0; h < b.length; h++) {
      g += b[h];
      if (f < g) return h + 1
    }
    return b.length
  },
  redirect: function () {
    var a = this.mobileOS(),
      b = document.location.protocol + "//" + document.location.host,
      c = document.location.pathname,
      d = c.split("/"),
      e = d[d.length - 2],
      f = this.readCookie("language");
    a && !this.readCookie("mobile_app_declined") && !this.readCookie("token") ? document.location = b + "/mobile" + c : typeof ClientAuthentication != "undefined" && !this.readCookie("token") ? document.location = "/authentication/login" : !history.pushState && document.location.pathname != "/" ? document.location = b + "/#" + c + document.location.search : this.readCookie("username") != null && this.readCookie("token") != null && page_country != "eu" && document.location.hostname.indexOf("napster.com") != -1 ? document.location.hostname = document.location.hostname.replace(page_country, "www") : !f || page_locale == f || document.location.search.indexOf("l=") != -1
  },
  mobileOS: function () {
    var a = ["iPhone", "iPad", "Silk", "Android", "BlackBerry", "Windows Phone"],
      b = this.readCookie("test_ua") || navigator.userAgent;
    for (var c = 0; c < a.length; c++)
      if (b.indexOf(a[c]) != -1) return a[c];
    return null
  },
  readCookie: function (a) {
    var b = a + "=",
      c = document.cookie.split(";");
    for (var d = 0; d < c.length; d++) {
      var e = c[d];
      while (e.charAt(0) == " ") e = e.substring(1, e.length);
      if (e.indexOf(b) == 0) return unescape(e.substring(b.length, e.length))
    }
    return null
  },
  saveCookie: function (a, b, c) {
    var d = "";
    if (c) {
      var e = new Date;
      e.setTime(e.getTime() + c * 24 * 60 * 60 * 1e3), d += "; expires=" + e.toGMTString()
    }
    var f = "; domain=." + this.getDomainName(document.location.hostname) + "; ";
    document.cookie = a + "=" + escape(b || "") + d + f + "path=/"
  },
  getDomainName: function (a) {
    return a.indexOf("rhapsody") != -1 ? a.substring(a.indexOf("rhapsody")) : a.indexOf("napster") != -1 ? a.substring(a.indexOf("napster")) : null
  }
}, defaultDiacriticsRemovalMap = [{
    base: "A",
    letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
  }, {
    base: "AA",
    letters: /[\uA732]/g
  }, {
    base: "AE",
    letters: /[\u00C6\u01FC\u01E2]/g
  }, {
    base: "AO",
    letters: /[\uA734]/g
  }, {
    base: "AU",
    letters: /[\uA736]/g
  }, {
    base: "AV",
    letters: /[\uA738\uA73A]/g
  }, {
    base: "AY",
    letters: /[\uA73C]/g
  }, {
    base: "B",
    letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
  }, {
    base: "C",
    letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
  }, {
    base: "D",
    letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
  }, {
    base: "DZ",
    letters: /[\u01F1\u01C4]/g
  }, {
    base: "Dz",
    letters: /[\u01F2\u01C5]/g
  }, {
    base: "E",
    letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
  }, {
    base: "F",
    letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
  }, {
    base: "G",
    letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
  }, {
    base: "H",
    letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
  }, {
    base: "I",
    letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
  }, {
    base: "J",
    letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
  }, {
    base: "K",
    letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
  }, {
    base: "L",
    letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
  }, {
    base: "LJ",
    letters: /[\u01C7]/g
  }, {
    base: "Lj",
    letters: /[\u01C8]/g
  }, {
    base: "M",
    letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
  }, {
    base: "N",
    letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
  }, {
    base: "NJ",
    letters: /[\u01CA]/g
  }, {
    base: "Nj",
    letters: /[\u01CB]/g
  }, {
    base: "O",
    letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
  }, {
    base: "OI",
    letters: /[\u01A2]/g
  }, {
    base: "OO",
    letters: /[\uA74E]/g
  }, {
    base: "OU",
    letters: /[\u0222]/g
  }, {
    base: "P",
    letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
  }, {
    base: "Q",
    letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
  }, {
    base: "R",
    letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
  }, {
    base: "S",
    letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
  }, {
    base: "T",
    letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
  }, {
    base: "TZ",
    letters: /[\uA728]/g
  }, {
    base: "U",
    letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
  }, {
    base: "V",
    letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
  }, {
    base: "VY",
    letters: /[\uA760]/g
  }, {
    base: "W",
    letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
  }, {
    base: "X",
    letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
  }, {
    base: "Y",
    letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
  }, {
    base: "Z",
    letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
  }, {
    base: "a",
    letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
  }, {
    base: "aa",
    letters: /[\uA733]/g
  }, {
    base: "ae",
    letters: /[\u00E6\u01FD\u01E3]/g
  }, {
    base: "ao",
    letters: /[\uA735]/g
  }, {
    base: "au",
    letters: /[\uA737]/g
  }, {
    base: "av",
    letters: /[\uA739\uA73B]/g
  }, {
    base: "ay",
    letters: /[\uA73D]/g
  }, {
    base: "b",
    letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
  }, {
    base: "c",
    letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
  }, {
    base: "d",
    letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
  }, {
    base: "dz",
    letters: /[\u01F3\u01C6]/g
  }, {
    base: "e",
    letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
  }, {
    base: "f",
    letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
  }, {
    base: "g",
    letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
  }, {
    base: "h",
    letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
  }, {
    base: "hv",
    letters: /[\u0195]/g
  }, {
    base: "i",
    letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
  }, {
    base: "j",
    letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
  }, {
    base: "k",
    letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
  }, {
    base: "l",
    letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
  }, {
    base: "lj",
    letters: /[\u01C9]/g
  }, {
    base: "m",
    letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
  }, {
    base: "n",
    letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
  }, {
    base: "nj",
    letters: /[\u01CC]/g
  }, {
    base: "o",
    letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
  }, {
    base: "oi",
    letters: /[\u01A3]/g
  }, {
    base: "ou",
    letters: /[\u0223]/g
  }, {
    base: "oo",
    letters: /[\uA74F]/g
  }, {
    base: "p",
    letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
  }, {
    base: "q",
    letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
  }, {
    base: "r",
    letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
  }, {
    base: "s",
    letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
  }, {
    base: "t",
    letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
  }, {
    base: "tz",
    letters: /[\uA729]/g
  }, {
    base: "u",
    letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
  }, {
    base: "v",
    letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
  }, {
    base: "vy",
    letters: /[\uA761]/g
  }, {
    base: "w",
    letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
  }, {
    base: "x",
    letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
  }, {
    base: "y",
    letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
  }, {
    base: "z",
    letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
  }],
  Reporting = {
    getRecommendationFeatureName: function (a, b) {
      b = b || PageMetadata.getMetadata();
      var c = b.site_section || "",
        d = "New Recommendation";
      return c.match(/^members$/) ? d = "New Recommendations Page" : c.match(/^recommendation$/) && (d += "New Recommendations Test Page"), d
    },
    getMetadataForAlbumFromElement: function (a) {
      var b = $(a).parents(".album-item"),
        c = PageMetadata.getMetadata();
      return c.main_content_type = "album", c.album_name = b.attr("album_name"), c.album_id = b.attr("album_id"), c
    },
    getMetadataForAlbum: function (a) {
      var b = PageMetadata.getMetadata();
      return b.main_content_type = "album", b.album_name = a.name, b.album_id = a.id, b
    },
    getMetadataForStandardSearch: function (a, b) {
      var c = PageMetadata.getMetadata();
      c.search_type = "Standard", c.search_results = "No";
      if (c.search_results_total) {
        var d = parseInt(c.search_results_total);
        c.search_results = d > 0 ? "Yes" : "No"
      }
      return typeof b != "undefined" && (c.search_link_type = "Search : " + b), typeof a == "undefined" && (c.search_term = searchns.query, c.search_results = searchns.data && parseInt(searchns.data.rangeSize) > 0 ? "Yes" : "No"), c
    },
    getMetadataForTypeAheadSearch: function (a) {
      var b = PageMetadata.getMetadata();
      b.search_term = searchns.query, b.search_type = "Type-Ahead", b.search_results = searchns.data && parseInt(searchns.data.rangeSize) > 0 ? "Yes" : "No", b.search_result = null;
      if (typeof a != "undefined") {
        var c = "",
          d = $(a).attr("data-searchby"),
          e = $(a).attr("data-type");
        e ? c = e : d && (c = "by " + d), b.search_link_type = "Search : " + c;
        var f = $(a).attr("data-itemname"),
          g = $(a).attr("data-genre") || "Unknown";
        typeof f != "undefined" && (b.search_result = e + " : " + g + " : " + f)
      }
      return b
    },
    getMetadataForTrackFromElement: function (a) {
      var b = $(a).parents(".track-item"),
        c = PageMetadata.getMetadata();
      return c.main_content_type = "track", c.track_name = b.attr("track_name"), c.track_id = b.attr("track_id"), c
    },
    getMetadataForTrack: function (a) {
      var b = PageMetadata.getMetadata();
      return b.main_content_type = "track", b.track_name = a.name, b.track_id = a.id, b
    },
    getMetadataForGenreFromElement: function (a) {
      var b = $(a).parents(".genre-item"),
        c = PageMetadata.getMetadata();
      return c.main_content_type = "genre", c.genre_name = [b.attr("genre_name")], c.genre_id = [b.attr("genre_id")], c
    },
    getMetadataForUpsell: function (a) {
      var b = PageMetadata.getMetadata();
      return b.marketing_name = $(a).attr("marketing-name"), b
    },
    getTypeOfBreadcrumbLink: function (a) {
      var b = $(a).attr("href").split("/"),
        c = b[b.length - 1],
        d = b[b.length - 2];
      return b[1] == "" ? "Home" : c == "genre" ? "All Genres" : c == "albums" ? "Artist Albums" : d == "artist" ? "Artist" : d == "chart" ? "Charts" : c == "blog" ? "Blog" : d == "genre" ? "Top Level Genre" : "Sub Level Genre"
    },
    getTypeOfAccountLink: function (a) {
      var b = a.attr("href");
      if (b == "/account") return "My Account";
      if (a.parent().hasClass("premier-upgrade")) return "Upgrade Account";
      if (b == "/devicesync") return "Device Sync";
      if (b == "/authentication/logout") return "Sign Out"
    },
    getMessageCenterToggle: function () {
      return $("#upsell").hasClass("closed") ? "Close Click" : "Open Click"
    },
    getMessageCenterMessageType: function () {
      return $(".upsell-message:visible").hasClass("the-mix") ? "Editorial Message Center" : "Marketing Message Center"
    }
  };
$(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate(".track-item .play-button a", "click", function (a) {
    var b = $("body").hasClass("queue-option-toggled") ? "Click Queue" : "Click Play",
      c = Reporting.getMetadataForTrackFromElement(a.target);
    reportEvent(b, "Track : " + getFeatureModule(this), c.track_id)
  }), $("#main").delegate(".album-item .play-button a", "click", function (a) {
    if (!$(this).parents(".album-item").hasClass("play-all")) {
      var b = $("body").hasClass("queue-option-toggled") ? "Click Queue" : "Click Play";
      reportEvent(b, "Album : " + getFeatureModule(this))
    }
  }), $("#main").delegate(".radio-station-item .play-button a", "click", function (a) {
    if ($("body").hasClass("queue-option-toggled")) return;
    reportEvent("Click Play", "Radio : " + getFeatureModule(this))
  }), $("#main").delegate("#search-artists", "click-artist-radio-search-result", function (a, b) {
    if ($("body").hasClass("queue-option-toggled")) return;
    reportEvent("Click Play", "Radio : " + getFeatureModule(this))
  }), $("#main").delegate(".artist .play-button a", "click", function (a, b) {
    var c = $("body").hasClass("queue-option-toggled") ? "Click Queue" : "Click Play";
    reportEvent(c, "Artist : " + getFeatureModule(this))
  }), $("#main").delegate(".person .play-button a", "click", function (a) {
    if ($("body").hasClass("queue-option-toggled")) return;
    reportEvent("Click Play", "Member Radio : " + getFeatureModule(this))
  }), $("#main").delegate("#play-radio-button", "click", function (a) {
    if ($("body").hasClass("queue-option-toggled")) return;
    reportEvent("Click Play", "Member Radio : " + getFeatureModule(this))
  }), $("#main").delegate(".playlist-item .play-button a", "click", function (a) {
    if (!$(this).parents(".playlist-item").hasClass("play-all")) {
      var b = $("body").hasClass("queue-option-toggled") ? "Click Queue" : "Click Play";
      reportEvent(b, "Playlist : " + getFeatureModule(this))
    }
  }), $("#main").delegate(".play-all .play-button a", "click", function (a) {
    var b = $("body").hasClass("queue-option-toggled") ? "Click Queue" : "Click Play";
    reportEvent(b, "All Tracks : " + getFeatureModule(this))
  }), $("#main").delegate(".genre-play-button a", "click", function (a) {
    var b = $("body").hasClass("queue-option-toggled") ? "Click Queue" : "Click Play";
    reportEvent(b, "Genre Top Tracks : " + getFeatureModule(this))
  }), $("#main").delegate(".blog-play-link", "click", function (a) {
    var b = "Unknown",
      c = null;
    if ($(this).hasClass("track")) {
      b = "Track";
      var d = $(this).attr("href").match(/\/track\/(Tra\.\d*)$/i);
      d || (d = $(this).attr("onclick").match(/(Tra\.\d*)/i)), d && (c = d[1])
    }
    $(this).hasClass("album") && (b = "Album"), $(this).hasClass("playlist") && (b = "Playlist"), $(this).attr("href").match(/\/radio\/(.*)$/) && (b = "Radio");
    var e = $("body").hasClass("queue-option-toggled") ? "Click Queue" : "Click Play";
    reportEvent(e, b + " : " + getFeatureModule(this), c)
  }), $("#main").delegate(".play-button a", "click", function (a) {}), $("#main").delegate(".track-item .queue-button a", "click", function (a) {
    var b = Reporting.getMetadataForTrackFromElement(a.target);
    reportEvent("Click Queue", "Track : " + getFeatureModule(this), b.track_id)
  }), $("#main").delegate(".album-item .queue-button a", "click", function (a) {
    reportEvent("Click Queue", "Album : " + getFeatureModule(this))
  }), $("#main").delegate(".playlist-item .queue-button a", "click", function (a) {
    reportEvent("Click Queue", "Playlist : " + getFeatureModule(this))
  }), $("#main").delegate(".play-all .queue-button a", "click", function (a) {
    reportEvent("Click Queue", "All Tracks : " + getFeatureModule(this))
  }), $("#main").delegate(".queue-button a", "click", function (a) {}), $("#player-queue").delegate("#player-favorite", "click", function (a) {
    $(this).hasClass("selected") ? reportFeatureAction("Favorites", "Player : Add Track Click") : reportFeatureAction("Favorites", "Player : Remove Track Click")
  }), $("#main").delegate("#browse-page #main-genres .genre-item .genre", "click", function (a) {
    reportFeatureAction("Browse Page", "Click Genre")
  }), $("#main").delegate("#browse-page #main-genres .genre-play-button", "click", function (a) {
    reportFeatureAction("Browse Page", "Play Genre")
  }), $("#main").delegate("#browse-page #main-genres .genre-item .more", "click", function (a) {
    reportFeatureAction("Browse Page", "More")
  }), $("#main").delegate("#main-genres .album .artist a", "click", function (a) {
    reportFeatureAction("Browse Page", "Click Artist", Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#main-genres .album .title a", "click", function (a) {
    reportFeatureAction("Browse Page", "Click Album", Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#main-genres .album .albumart-controls a.album-image", "click", function (a) {
    reportFeatureAction("Browse Page", "Click Album Image", Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#main-genres .album .play-button", "click", function (a) {
    var b = $("body").hasClass("queue-option-toggled") ? "Queue" : "Play";
    reportFeatureAction("Browse Page", b, Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#main-genres .album .queue-button", "click", function (a) {
    reportFeatureAction("Browse Page", "Queue", Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#main-genres", "menu-add-to-library", function (a, b) {
    reportFeatureAction("Browse Page", "Add to Library", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#main-genres", "menu-create-playlist", function (a, b) {
    reportFeatureAction("Browse Page", "Create Playlist", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#main-genres", "menu-add-to-playlist", function (a, b) {
    reportFeatureAction("Browse Page", "Add to Playlist", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#main-genres", "menu-add-to-current-playlist", function (a, b) {
    reportFeatureAction("Browse Page", "Add to Current Playlist", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#main-genres", "menu-add-to-queue", function (a, b) {
    return reportFeatureAction("Browse Page", "Add to Queue", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#main-genres", "menu-replace-queue", function (a, b) {
    reportFeatureAction("Browse Page", "Replace Queue", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#main-genres", "share-on-facebook", function (a, b) {
    return reportFeatureAction("Browse Page", "Share on Facebook", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#main-genres", "share-on-twitter", function (a, b) {
    return reportFeatureAction("Browse Page", "Share on Twitter", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#main-genres", "share-email", function (a, b) {
    return reportFeatureAction("Browse Page", "Share Email", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#main-genres", "share-on-google", function (a, b) {
    return reportFeatureAction("Browse Page", "Share on Google+", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#favorites-tab", "click", function (a) {
    reportFeatureAction("Favorites", "Click Tab")
  }), $("#main").delegate(".favorites-icon-link", "click", function (a) {
    reportFeatureAction("Favorites", "Click Playlist")
  }), $("body").delegate("#billboard-ads .billboard-ad a", "click", function (a) {
    a.preventDefault();
    var b = $(a.currentTarget).attr("href"),
      c = $(a.currentTarget).attr("target");
    return reportFeatureAction("Billboard Ad", "Click Link", Reporting.getMetadataForUpsell($(a.target).parents(".billboard-ad"))), $(this).hasClass("ajax") ? !0 : (setTimeout(function () {
      c == "_blank" ? window.open(b) : document.location = b
    }, 500), !1)
  }), $("#container").delegate("#tophat-upsell .close-button", "click", function (a) {
    reportFeatureAction("Tophat Upsell", "Click Close", Reporting.getMetadataForUpsell($(a.target).parents(".tophatupsell")))
  }), $("#container").delegate("#tophat-upsell a", "click", function (a) {
    reportFeatureAction("Tophat Upsell", "Click Link", Reporting.getMetadataForUpsell($(a.target).parents(".tophatupsell")));
    if (!$(this).hasClass("ajax")) {
      a.preventDefault();
      var b = $(a.currentTarget).attr("href"),
        c = $(a.currentTarget).attr("target");
      setTimeout(function () {
        c == "_blank" ? window.open(b) : document.location = b
      }, 500)
    }
  }), $("body").delegate("#tophat-ads .tophat-ad a", "click", function (a) {
    a.preventDefault();
    var b = $(a.currentTarget).attr("href"),
      c = $(a.currentTarget).attr("target");
    return reportFeatureAction("Tophat Ad", "Click Link", Reporting.getMetadataForUpsell($(a.target).parents(".tophat-ad"))), $(this).hasClass("ajax") ? !0 : (setTimeout(function () {
      c == "_blank" ? window.open(b) : document.location = b
    }, 500), !1)
  }), $("body").delegate("#tophat-upsell", "show-tophat", function (a) {
    var b = $("#tophat-upsell .tophatupsell:visible");
    reportFeatureAction("Tophat Upsell", "Show", Reporting.getMetadataForUpsell(b))
  }), $("body").delegate("#tophat-ads", "show-tophat", function (a, b) {
    var b = $("#tophat-ads .tophat-ad:visible");
    reportFeatureAction("Tophat Ad", "Show", Reporting.getMetadataForUpsell(b))
  }), $("#main").delegate("#welcome-page #genre-list #my-genres .more", "click", function (a) {
    reportFeatureAction("Personalized Genre", "More")
  }), $("#main").delegate("#welcome-page #genre-list #my-genres .header-title", "click", function (a) {
    reportFeatureAction("Personalized Genre", "More")
  }), $("#main").delegate("#welcome-page #genre-list #my-genres ul li a", "click", function (a) {
    reportFeatureAction("Personalized Genre", "Click Top-Level Genre", Reporting.getMetadataForGenreFromElement(a.target))
  }), $("#main").delegate("#welcome-page #genre-list #genres .more", "click", function (a) {
    reportFeatureAction("Genres", "More")
  }), $("#main").delegate("#welcome-page #genre-list #genres .header-title", "click", function (a) {
    reportFeatureAction("Genres", "More")
  }), $("#main").delegate("#welcome-page #genre-list #genres ul li a", "click", function (a) {
    reportFeatureAction("Genres", "Click Top-Level Genre", Reporting.getMetadataForGenreFromElement(a.target))
  }), $("#main").delegate("#chart-tracks .header a", "click", function (a) {
    reportFeatureAction("Charts", "More")
  }), $("#main").delegate("#chart-tracks .play-button", "click", function (a) {
    var b = $("body").hasClass("queue-option-toggled") ? "Queue" : "Play";
    reportFeatureAction("Charts", b, Reporting.getMetadataForTrackFromElement(a.target))
  }), $("#main").delegate("#chart-tracks .track .play-link a", "click", function (a) {
    reportFeatureAction("Charts", "Click Track", Reporting.getMetadataForTrackFromElement(a.target))
  }), $("#main").delegate("#chart-tracks .queue-button", "click", function (a) {
    reportFeatureAction("Charts", "Queue", Reporting.getMetadataForTrackFromElement(a.target))
  }), $("#main").delegate("#chart-tracks .track .artist a", "click", function (a) {
    reportFeatureAction("Charts", "Click Artist", Reporting.getMetadataForTrackFromElement(a.target))
  }), $("#main").delegate("#chart-tracks", "menu-add-to-favorites", function (a, b) {
    return reportFeatureAction("Charts", "Add to Favorites", Reporting.getMetadataForTrack(b)), !1
  }), $("#main").delegate("#chart-tracks", "menu-add-to-library", function (a, b) {
    reportFeatureAction("Charts", "Add to Library", Reporting.getMetadataForTrack(b))
  }), $("#main").delegate("#chart-tracks", "menu-create-playlist", function (a, b) {
    reportFeatureAction("Charts", "Create Playlist", Reporting.getMetadataForTrack(b))
  }), $("#main").delegate("#chart-tracks", "menu-add-to-playlist", function (a, b) {
    reportFeatureAction("Charts", "Add to Playlist", Reporting.getMetadataForTrack(b))
  }), $("#main").delegate("#chart-tracks", "menu-add-to-current-playlist", function (a, b) {
    reportFeatureAction("Charts", "Add to Current Playlist", Reporting.getMetadataForTrack(b))
  }), $("#main").delegate("#chart-tracks", "menu-add-to-queue", function (a, b) {
    return reportFeatureAction("Charts", "Add to Queue", Reporting.getMetadataForTrack(b)), !1
  }), $("#main").delegate("#chart-tracks", "menu-replace-queue", function (a, b) {
    reportFeatureAction("Charts", "Replace Queue", Reporting.getMetadataForTrack(b))
  }), $("#main").delegate("#chart-tracks", "share-on-facebook", function (a, b) {
    return reportFeatureAction("Charts", "Share on Facebook", Reporting.getMetadataForTrack(b)), !1
  }), $("#main").delegate("#chart-tracks", "share-on-twitter", function (a, b) {
    return reportFeatureAction("Charts", "Share on Twitter", Reporting.getMetadataForTrack(b)), !1
  }), $("#main").delegate("#chart-tracks", "share-email", function (a, b) {
    return reportFeatureAction("Charts", "Share Email", Reporting.getMetadataForTrack(b)), !1
  }), $("#main").delegate("#chart-tracks", "share-on-google", function (a, b) {
    return reportFeatureAction("Charts", "Share on Google+", Reporting.getMetadataForTrack(b)), !1
  }), $("#main").delegate(".welcome-editorial .more", "click", function (a) {
    reportFeatureAction("Featured on Rhapsody", "More")
  }), $("#main").delegate(".welcome-editorial .header-title", "click", function (a) {
    reportFeatureAction("Featured on Rhapsody", "More")
  }), $("#main").delegate(".welcome-editorial .editorial-content a", "click", function (a) {
    typeof $(a.target).attr("src") != "undefined" ? reportFeatureAction("Featured on Rhapsody", "Image Click") : reportFeatureAction("Featured on Rhapsody", "Link Click")
  }), $("#main").delegate("#social-profile .header-title", "click", function (a) {
    reportFeatureAction("Music Profile", "More")
  }), $("#main").delegate("#social-profile .image", "click", function (a) {
    reportFeatureAction("Music Profile", "Click Image")
  }), $("#main").delegate("#social-profile .fb-connected-message a, #social-profile .fb-not-connected-message a", "click", function (a) {
    reportFeatureAction("Music Profile", "Click Name")
  }), $("#main").delegate("#social-profile .welcome-edit-profile", "click", function (a) {
    reportFeatureAction("Music Profile", "Click Edit Profile")
  }), $("#main").delegate("#social-profile .welcome-create-profile", "click", function (a) {
    reportFeatureAction("Music Profile", "Click Create Profile")
  }), $("#main").delegate("#new-releases .album .artist a", "click", function (a) {
    reportFeatureAction("New Releases", "Click Artist", Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#new-releases .album .title a", "click", function (a) {
    reportFeatureAction("New Releases", "Click Album", Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#new-releases .album .albumart-controls a.album-image", "click", function (a) {
    reportFeatureAction("New Releases", "Click Album Image", Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#new-releases .album .play-button", "click", function (a) {
    var b = $("body").hasClass("queue-option-toggled") ? "Queue" : "Play";
    reportFeatureAction("New Releases", b, Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#new-releases .album .queue-button", "click", function (a) {
    reportFeatureAction("New Releases", "Queue", Reporting.getMetadataForAlbumFromElement(a.target))
  }), $("#main").delegate("#new-releases", "menu-add-to-library", function (a, b) {
    reportFeatureAction("New Releases", "Add to Library", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#new-releases", "menu-create-playlist", function (a, b) {
    reportFeatureAction("New Releases", "Create Playlist", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#new-releases", "menu-add-to-playlist", function (a, b) {
    reportFeatureAction("New Releases", "Add to Playlist", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#new-releases", "menu-add-to-current-playlist", function (a, b) {
    reportFeatureAction("New Releases", "Add to Current Playlist", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#new-releases", "menu-add-to-queue", function (a, b) {
    return reportFeatureAction("New Releases", "Add to Queue", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#new-releases", "menu-replace-queue", function (a, b) {
    reportFeatureAction("New Releases", "Replace Queue", Reporting.getMetadataForAlbum(b))
  }), $("#main").delegate("#new-releases", "share-on-facebook", function (a, b) {
    return reportFeatureAction("New Releases", "Share on Facebook", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#new-releases", "share-on-twitter", function (a, b) {
    return reportFeatureAction("New Releases", "Share on Twitter", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#new-releases", "share-email", function (a, b) {
    return reportFeatureAction("New Releases", "Share Email", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#new-releases", "share-on-google", function (a, b) {
    return reportFeatureAction("New Releases", "Share on Google+", Reporting.getMetadataForAlbum(b)), !1
  }), $("#main").delegate("#new-releases .header a", "click", function (a) {
    reportFeatureAction("New Releases", "More")
  }), $("#main").delegate("#search-results", "share-on-facebook", function (a, b) {
    return reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Share on Facebook")), !1
  }), $("#main").delegate("#search-results", "share-on-twitter", function (a, b) {
    return reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Share on Twitter")), !1
  }), $("#main").delegate("#search-results", "share-email", function (a, b) {
    return reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Share Email")), !1
  }), $("#main").delegate("#search-results", "share-on-google", function (a, b) {
    return reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Share on Google+")), !1
  }), $("#main").delegate("#search-results", "menu-add-to-favorites", function (a, b) {
    return reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Add to Favorites")), !1
  }), $("#main").delegate("#search-results", "menu-add-to-library", function (a, b) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Add to Library"))
  }), $("#main").delegate("#search-results", "menu-create-playlist", function (a, b) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Create Playlist"))
  }), $("#main").delegate("#search-results", "menu-add-to-playlist", function (a, b) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Add to Playlist"))
  }), $("#main").delegate("#search-results", "menu-add-to-current-playlist", function (a, b) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Add to Current Playlist"))
  }), $("#main").delegate("#search-results", "menu-add-to-queue", function (a, b) {
    return reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Add to Queue")), !1
  }), $("#main").delegate("#search-results", "menu-replace-queue", function (a, b) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Replace Queue"))
  }), $("#main").delegate("#search-results .track-item .queue-button a", "click", function (a) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Queue Track"))
  }), $("#main").delegate("#search-results .track-item .play-button a", "click", function (a) {
    var b = $("body").hasClass("queue-option-toggled") ? "Queue Track" : "Play Track";
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, b))
  }), $("#main").delegate("#search-results .track .name a", "click", function (a) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Track"))
  }), $("#main").delegate("#search-results .track .artist a", "click", function (a) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Track Artist"))
  }), $("#main").delegate("#search-results .artist-list .artist a", "click", function (a) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Artist"))
  }), $("#main").delegate("#search-results .album .play-button a", "click", function (a) {
    var b = $("body").hasClass("queue-option-toggled") ? "Queue Album" : "Play Album";
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, b))
  }), $("#main").delegate("#search-results .album .info .artist a", "click", function (a) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Album Artist"))
  }), $("#main").delegate("#search-results .album .albumart-controls a.album-image", "click", function (a) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Album Image"))
  }), $("#main").delegate("#search-results .album .title a", "click", function (a) {
    reportSearchResultEvent(Reporting.getMetadataForStandardSearch(this, "Album"))
  }), $("#search").delegate("#searchform", "search-click", function (a, b) {
    a.preventDefault(), reportFeatureAction("Search", "Standard Query", Reporting.getMetadataForStandardSearch())
  }), $("#search").delegate(".ui-menu-item", "view-result-keydown", function (a) {
    var b = Reporting.getMetadataForTypeAheadSearch(a.target);
    reportFeatureAction("Search", "Type-Ahead Result", b), reportSearchResultEvent(b)
  }), $("#search").delegate(".ui-menu-item", "click", function (a) {
    var b = Reporting.getMetadataForTypeAheadSearch(a.currentTarget),
      c = "Type-Ahead Result";
    a.currentTarget == $("#autocomplete-featured-artist").get(0) && (c = "Type-Ahead Result : Featured Image"), reportFeatureAction("Search", c, b), reportSearchResultEvent(b)
  }), $("#search").delegate(".searchbythis", "click", function (a) {
    var b = "By " + $(this).attr("data-searchby");
    reportFeatureAction("Search", b, Reporting.getMetadataForTypeAheadSearch(this))
  }), $("#main").delegate("#breadcrumb a", "click", function (a) {
    reportFeatureAction("Breadcrumb", Reporting.getTypeOfBreadcrumbLink($(this)) + " Click")
  }), $("#container").delegate("#service-nav li a", "click", function (a) {
    reportFeatureAction("Account Menu", Reporting.getTypeOfAccountLink($(this)) + " Click")
  }), $("#main").delegate(".genre-page #genre-editorial-content a", "click", function (a) {
    reportFeatureAction("Genre Editorial", "Click")
  }), $("#main").delegate(".artist-page #artist-editorial-content a", "click", function (a) {
    reportFeatureAction("Artist Editorial", "Click")
  }), $("#container").delegate("#upsell-toggle", "click", function (a) {
    reportFeatureAction(Reporting.getMessageCenterMessageType(), Reporting.getMessageCenterToggle())
  }), $("#container").delegate(".upsell-message-title a", "click", function (a) {
    reportFeatureAction(Reporting.getMessageCenterMessageType(), "Title Click")
  }), $("#container").delegate(".upsell-message-text a img", "click", function (a) {
    reportFeatureAction(Reporting.getMessageCenterMessageType(), "Image Click")
  }), $("#container").delegate(".upsell-message-text .more", "click", function (a) {
    reportFeatureAction(Reporting.getMessageCenterMessageType(), "Link Click")
  }), $("body").delegate("#main", "menu-add-to-favorites", function (a, b) {
    a.stopPropagation(), reportEvent("Add to Favorites")
  }), $("body").delegate(".feature-module", "menu-add-to-queue", function (a, b) {
    a.stopPropagation(), reportEvent("Add to Queue", "", "")
  }), $("body").delegate("#main", "share-on-facebook", function (a, b) {
    a.stopPropagation(), Share.reportEvent("share-on-facebook")
  }), $("body").delegate("#main", "share-on-twitter", function (a, b) {
    a.stopPropagation(), Share.reportEvent("share-on-twitter")
  }), $("body").delegate("#main", "share-email", function (a, b) {
    a.stopPropagation(), Share.reportEvent("share-email")
  }), $("body").delegate("#main", "share-on-google", function (a, b) {
    a.stopPropagation(), Share.reportEvent("share-on-google")
  })
}), $(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate("#search-all-page", "pageLoaded", function () {
    var a = $("#search-text").html();
    $(".artist-list .artist a, .album-list .album .title a, .track-list .track .name a").each(function () {
      var b = $(this).text(),
        c = new RegExp("(" + a + ")", "i");
      $(this).html(b.replace(c, "<span class='match'>$1</span>"))
    })
  }), $("#main").delegate("#search-all-page, #search-album-page, #search-artist-page, #search-track-page", "pageLoaded", function () {
    var a = $("#search-text").html();
    $(".artist-list .artist a, .album-list .album .title a, .track-list .track .name a").each(function () {
      var b = $(this).text(),
        c = new RegExp("(" + a + ")", "i");
      $(this).html(b.replace(c, "<span class='match'>$1</span>"))
    })
  })
}), $(document).delegate("body", "siteLoaded", function () {
  $.template("twitterTemplate", Locale.messages.nowPlaying), $.template("twitterAlbumTemplate", Locale.messages.nowPlayingAlbum), $.template("twitterGenreTemplate", Locale.messages.nowPlayingGenre), $.template("twitterPostTemplate", Locale.messages.nowPlayingPost), $(document).delegate("#context-menu li.share .facebook", "click", function () {
    hidePopup($("#context-menu"));
    var a = $("#context-menu").data("contextItem"),
      b = $("#context-menu li.share").data("context");
    Share.facebook(a, b)
  }), $(document).delegate("#context-menu li.share .twitter", "click", function () {
    hidePopup($("#context-menu"));
    var a = $("#context-menu").data("contextItem"),
      b = $("#context-menu li.share").data("context");
    Share.twitter(a, b)
  }), $(document).delegate("#context-menu li.share .google", "click", function () {
    hidePopup($("#context-menu"));
    var a = $("#context-menu").data("contextItem"),
      b = $("#context-menu li.share").data("context");
    Share.google(a, b)
  }), $(document).delegate("#context-menu li.share .email", "click", function () {
    var a = $("#context-menu").data("contextItem"),
      b = $("#context-menu li.share").data("context");
    Share.link(a, b)
  }), $("#share-link-dialog .dialog-buttons input").click(function () {
    hideDialog()
  }), $(document).delegate("#share-controls .share-only .facebook", "click", function () {
    var a = Share.getItemFromAttributes($(this).parents(".share-only"));
    Share.facebook(a)
  }), $(document).delegate("#share-controls .share-only .twitter", "click", function () {
    var a = Share.getItemFromAttributes($(this).parents(".share-only"));
    Share.twitter(a)
  }), $(document).delegate("#share-controls .share-only .google", "click", function () {
    var a = Share.getItemFromAttributes($(this).parents(".share-only"));
    Share.google(a)
  }), $(document).delegate("#share-controls .share-only .email", "click", function () {
    var a = Share.getItemFromAttributes($(this).parents(".share-only"));
    Share.link(a)
  })
});
var Share = {
  getBaseUrl: function () {
    var a = getDomainName(document.location.hostname),
      b = "http://www." + a;
    if (Locale.eu16()) {
      var c = PageMetadata.getMetadata(),
        d = "www";
      c && c.country && (d = c.country.toLowerCase()), b = "http://" + d + "." + a
    }
    return b
  },
  facebook: function (a, b) {
    var c = a.id;
    this.reportEvent("share-on-facebook", a, b);
    if (c) {
      var d = a.title || a.name,
        e = this.getBaseUrl() + a.href,
        f = "http://www.facebook.com/sharer.php?u=" + e + "&t=" + d.replace(/\s+/g, "+");
      window.open(f, "_sharePopup", "width=630,height=430")
    }
  },
  getBitly: function (a, b, c) {
    $.getJSON("https://api-ssl.bitly.com/v3/shorten?access_token=86ad0677dffa0ac15b2df99734662a7c02a7af58&longUrl=" + a + "&format=json&callback=?", function (a) {
      a.status_code == 200 ? b(a.data.url) : c(a)
    })
  },
  twitter: function (a, b) {
    var c = a.id,
      d = this.getBaseUrl() + a.href;
    this.reportEvent("share-on-twitter", a, b);
    var e = function (b) {
      var c = $.render(a, $.template("twitterTemplate"));
      a.name ? a.artistName ? c = $.render(a, $.template("twitterAlbumTemplate")) : a.type && a.type == "genre" && (c = $.render(a, $.template("twitterGenreTemplate"))) : a.type && a.type == "post" && (c = $.render(a, $.template("twitterPostTemplate")));
      var d = c.replace(/&apos;/, "'").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&#34;/g, '"'),
        e = "http://twitter.com/share?url=" + b + "&text=" + encodeURIComponent(d);
      window.open(e, "_sharePopup", "width=550,height=450")
    };
    c && (isBlogPostPage(pageNavUrl()) && Locale.useBitlyForPostShares() ? Share.getBitly(d, e, function (a) {}) : e(d))
  },
  google: function (a, b) {
    this.reportEvent("share-on-google", a, b);
    var c = this.getBaseUrl() + a.href,
      d = "https://plus.google.com/share?url=" + c;
    window.open(d, "_sharePopup", "width=550,height=450")
  },
  link: function (a, b) {
    hideDialog();
    if (a.id) {
      var c = this.getBaseUrl(),
        d = c + "/track/" + a.id;
      a.href && (d = c + a.href), this.reportEvent("share-email", a, b), $("#share-url").attr("value", d), showDialog($("#share-link-dialog"))
    }
  },
  getItemFromAttributes: function (a) {
    var b = {};
    return b.id = a.attr("id"), b.title = a.attr("title"), b.name = a.attr("name"), b.artistName = a.attr("artist_name"), b.href = a.attr("href"), b.type = a.attr("type"), b
  },
  reportEvent: function (a, b, c) {
    var d = this.getAction(a);
    if (typeof b == "undefined") reportEvent("Social", d, this.getFeatureModule());
    else if (typeof c == "undefined" || c == "") {
      var e = $("#context-menu").data("featureModuleId");
      $("#" + (e || "main")).trigger(a, b)
    } else reportEvent("Social", d, c)
  },
  getFeatureModule: function () {
    var a = null,
      b = $("#context-menu").data("featureModuleId");
    if (typeof b != "undefined") a = $("#" + b).attr("feature");
    else {
      var c = PageMetadata.getMetadata();
      a = c.site_section + ", " + c.page_name
    }
    return a
  },
  getAction: function (a) {
    switch (a) {
    case "share-email":
      return "Share Email";
    case "share-on-facebook":
      return "Share on Facebook";
    case "share-on-twitter":
      return "Share on Twitter";
    case "share-on-google":
      return "Share on Google+"
    }
    return ""
  }
};
$(document).delegate("body", "pageLoaded", function () {
  var a = Account.getProperties();
  if (Locale.showsTophatUpsell() && a.accountAge > 1) {
    var b = Tophat.getType(a);
    b && ($("#tophat-upsell-content:empty").length > 0 ? $.ajax({
      url: "/tophat",
      dataType: "html",
      success: function (a) {
        var c = jQuery("<div>").append(a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""));
        $("#tour-content").html($(c).find("#tours")), Tour.init(), $("#tophat-upsell-content").html($(c).remove("#tours")), Tophat.init(b), Tour.tryStart() || Tophat.show()
      },
      error: function () {}
    }) : Tour.inProgress() || Tophat.show())
  }
  $(document).delegate("#tophat-upsell .close-button", "click", function (a) {
    Tophat.close()
  }), $(document).delegate("#tour-container .next-button", "click", function (a) {
    Tour.next()
  }), $(document).delegate("#tour-container .close-button", "click", function (a) {
    return a.stopImmediatePropagation(), Tour.end(), !1
  }), $(document).delegate("#take-the-tour", "click", function (a) {
    showOnboardingTour()
  })
});
var Tophat = {
  id: null,
  type: null,
  current_index: 0,
  init: function (a) {
    this.type = a, this.id = null;
    var b = $("#tophat-upsell").find(".tophatupsells." + this.type).attr("id"),
      c = Account.getUserPreference("lastTophatShown");
    b && c != b && (this.id = b)
  },
  show: function () {
    if (!this.id) return;
    if ($("#" + this.id + ":empty") >= 0) return;
    var a = this.current_index;
    this.current_index++, this.current_index >= $("#" + this.id).children().length && (this.current_index = 0), $("#tophat-upsell").find(".close-button").remove(), $(".tophatupsell").hide();
    var b = $("#" + this.id + " > div:eq(" + this.current_index + ")");
    $(".tophatupsells." + this.type).show(), b.append("<div class='close-button'></div>"), b.show(), $("#tophat-upsell").show(), $("#tophat-upsell").find(".close-button").css("top", $("#tophat-upsell").height() / 2 - 9), $("#tophat-upsell").trigger("show-tophat")
  },
  close: function () {
    Account.setUserPreference("lastTophatShown", this.id), this.id = null, $("#tophat-upsell").hide(), resizeFrame()
  },
  getType: function (a) {
    if (a["experienceType"] == "subscriber") {
      if (a["accountType"] == "RHAPSODY_PREMIER" || a["accountType"] == "RHAPSODY_UNLIMITED") return "premier";
      if (a["accountType"] == "RHAPSODY_PREMIER_PLUS" || a["accountType"] == "RHAPSODY_TOGO") return "premierplus"
    }
    return null
  }
}, Tour = {
    id: null,
    linear: !1,
    currentStep: 0,
    closed: !0,
    inProgress: function () {
      return this.id != null
    },
    isNew: function (a, b) {
      return a.length > 0 && (!b || a != b.id || !b.closed)
    },
    pageMatchesStep: function (a) {
      return PageMetadata.getMetadata().site_section == a.site_section && (!a.page_name || a.page_name == "" || PageMetadata.getMetadata().page_name == a.page_name)
    },
    init: function () {
      var a = $("#tour-content").find(".tour").attr("id"),
        b = Account.getUserPreference("lastFeatureTourShown");
      a && Tour.isNew(a, b) && (b && b.id == a ? (this.id = b.id, this.linear = b.linear, this.currentStep = b.currentStep, this.closed = b.closed) : (this.id = a, this.linear = $("#tour-content").find("#" + a).attr("linear") || !1, this.currentStep = 1, this.closed = !1, this.store()))
    },
    tryStart: function () {
      return this.id != null ? ($("#tour-content").show(), this.closed ? (this.hide(), !1) : (this.linear ? this.runLinear() : this.runNonLinear(), this.store(), !0)) : !1
    },
    runLinear: function () {
      var a = $("#" + this.id + " .step" + this.currentStep),
        b = $("#" + this.id + " .step" + (this.currentStep + 1)),
        c = this.getStepLocation(a),
        d = this.getStepLocation(b);
      this.pageMatchesStep(c) ? (this.show(a), this.closed = a.attr("end") ? !0 : !1) : this.pageMatchesStep(d) ? (this.currentStep++, a = b, this.show(a), this.closed = a.attr("end") ? !0 : !1) : (this.hide(), this.closed = !1)
    },
    runNonLinear: function () {
      var a = null;
      $("#" + this.id + " .tour-step").each(function (b, c) {
        a = Tour.pageMatchesStep(Tour.getStepLocation($(c))) ? $(c) : a
      }), a ? (this.show(a), this.closed = a.attr("end") ? !0 : !1) : (this.hide(), this.closed = !1)
    },
    getStepLocation: function (a) {
      var b = {};
      return b.site_section = a.attr("site_section") || !1, b.page_name = a.attr("page_name") || !1, b
    },
    checkForNextButton: function (a) {
      a.attr("next_button") ? $("#tour-container .next-button").show() : $("#tour-container .next-button").hide()
    },
    store: function () {
      $("#" + this.id).hasClass("tour") && Account.setUserPreference("lastFeatureTourShown", this.id)
    },
    show: function (a) {
      $("#tophat-upsell").hide(), $(".tophat-ad").hide(), $("#tour-container").show(), $("#" + this.id).show(), this.checkForNextButton(a), a.show().addClass("current-step").siblings().hide().removeClass("current-step"), resizeFrame()
    },
    next: function () {
      this.currentStep++, this.store();
      var a = $("#" + this.id + " .current-step").attr("next_page");
      a != undefined ? ($("#" + this.id + " .current-step").attr("site_section") == "radio" && $("#" + this.id).find("#finish-image").attr("site_section", "home"), loadDynamicPage(a.replace("{id}", memberShortcut()))) : this.tryStart()
    },
    hide: function () {
      $("#tour-container, .tour, .selectable-tour").hide(), Account.getProperties().accountAge < 1 ? loadAdvertisements(Account.getProperties().experienceType) : (showTophatAd(), Tophat.show()), resizeFrame()
    },
    end: function () {
      this.closed = !0, this.store(), this.hide()
    }
  };
$(document).delegate("body", "siteLoaded", function () {
  $("#main").delegate("#welcome-page", "pageLoaded", function () {}), $("#main").delegate("#welcome-page #free-welcome-module .try-button a", "click", function (a) {
    a.preventDefault();
    var b = $("#free-welcome-module").find(".upsell").attr("module_name"),
      c = $(this).attr("href");
    setTimeout(function () {
      document.location = c
    }, 1e3)
  }), $(document).delegate(".welcome-create-profile", "click", function () {
    navigateToPage("members/" + memberShortcut() + "?editprofile")
  }), $(document).delegate(".welcome-edit-profile", "click", function () {
    navigateToPage("members/" + memberShortcut() + "?editprofile")
  })
}), $(document).delegate("body", "siteLoaded", function () {
  var a = $("#main-content").length > 0 && $("#main-content").children().length > 0 ? $("#main-content").children().first() : $("#main").children().first(),
    b = $(".page-metadata").attr("meta_site_section") || "";
  b.indexOf("not found") > 0 ? a.trigger("pageLoadFailed") : urlPath(pageNavUrl()) != "/" && a.trigger("pageLoaded")
})
