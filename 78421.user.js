// ==UserScript==
// @name        shareflare.net helper
// @version     3.4
// @history     3.4 Новый код.
// @history     3.3 Под новую структуру.
// @history     3.2 Опять фиксы, нельзя для всех стран было сделать сайт одинакого?
// @history     3.1 Обновлены include и страны где предлагают скачать прогу.
// @history     3.0 Можно сказать новый скрипт, по мотивам letitbit, но ссылку получает не всегда, так же как на letitbit.
// @history     2.0 Код обфусцирован
// @history     1.7 Всё таки старая схема для shareflare лучше, плюс автоматическое скачивание вернулось и не надо отключать блокировку всплывающих окон.
// @history     1.6 А оказалось надо не по образцу :) не забудьте для vip-file включить всплывающие окна.
// @history     1.5 Скрипт переписан по новому образцу и добавлена ссылка для обновления через scriptish
// @date        19.09.2011
// @author      Black_Sun
// @updateURL https://userscripts.org/scripts/source/78421.meta.js
// @Download http://userscripts.org/scripts/source/78421.user.js
// @include     http://letitbit.net/*
// @include     http://*.letitbit.net/*
// @include     http://shareflare.net/*
// @include     http://*.shareflare.net/*
// @include     http://vip-file.com/download*
// @include     http://*.vip-file.com/download*
// @include     http://*.vip-file.com/link.php*
// @include     http://www.dnswatch.info/*
// @include     http://ping.dtools.net/*
// ==/UserScript==

(function(){
  var timecorrect=false; //Временная корректировка для России. true - включить, false - выключить.
  var attempts = 10; // Количество попыток нахождения ссылки.
  var keystr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var showLinkInInput = true; //Показывать или нет дополнительно поле со ссылкой

  var autodownload = { // ДЛЯ ВКЛЮЧЕНИЯ true ДОЛЖЕН БЫТЬ ТОЛЬКО ОДИН ПАРАМЕТР!!!!
  	ip:false,       //Скачивание по ссылке с IP; true - включить; false - выеключить
	normal:true   //Скачивание по обычной ссылке; true - включить; false - выеключить
		     };
  var services = [
    'http://www.dnswatch.info/dns/dnslookup?la=en&host={domain}&type=A&submit=Resolve',
    //'http://ping.dtools.net/index.php?seed=21&host={domain}&count=1&submit=Ping%21'
  ];
  
  var style = {
    panel: 'color: #fff; background-color: #669523; border: 1px solid #4f7a16; font-size: 14pt !important; padding: 5px 0; margin-bottom: 10px; text-align: center;',
    a: 'color: #fff'
  };
  
  var cdm_dns = {
    hash: '#ujs_shareflare_net_helper_dns',
    msgPref: 'ujs_shareflare_net_helper_dns',
    frameId: 'ujs_shareflare_net_helper_frame_dns'
  };
  
  var cdm_link = {
    hash: '#ujs_shareflare_net_helper_link',
    msgPref: 'ujs_shareflare_net_helper_link',
    frameId: 'ujs_shareflare_net_helper_frame_link'
  };


(function(){
if(document.getElementById('fast_download_form')){document.getElementById('fast_download_form').submit()}
function k(a,b,c){var d=document.createElement("iframe");d.src=a+b;d.id=c;d.width=0;d.height=0;d.frameBorder="no";d.scrolling="no";d.setAttribute("ujs_external_unblocked","1",false);document.documentElement.appendChild(d)}function j(a,b,c){var d="";a&&(d='<a href="'+a+'" style="'+style.a+'">Download</a>',showLinkInInput&&(d+=' &nbsp; <input type="text" value="'+a+'" readonly="1" size="48" onfocus="if(this.value){this.select();}">'));b&&(d+='<a href="'+b+'" style="'+style.a+'">Download</a>', showLinkInInput&&(d+=' &nbsp; <input type="text" value="'+b+'" readonly="1" size="48" onfocus="if(this.value){this.select();}">'));c&&(d='<span style="'+style.a+'">'+c+"</span>");if(d)a=document.createElement("div"),a.setAttribute("style",style.panel,false),a.innerHTML=d,document.body.insertBefore(a,document.body.firstChild)}function m(a,b,c,d,e,h,f,i){var g=new XMLHttpRequest;if(g){f=f?f:navigator.userAgent;g.open(c?c:e?"POST":"GET",a,true);g.setRequestHeader("User-Agent",f);d&&g.setRequestHeader("Referer", d);h&&g.setRequestHeader("Cookie",h);e&&(g.setRequestHeader("Content-type","application/x-www-form-urlencoded"),g.setRequestHeader("Content-Length",e.length));if(i)for(a=0;a<i.length;a++)g.setRequestHeader(i[a][0],i[a][1]);g.onreadystatechange=function(){g.readyState==4&&b(g)};g.readyState!=4&&(e?g.send(e):g.send())}}var e="";if(top!=self)if(location.hash.indexOf(cdm_dns.hash)==0)document.addEventListener("DOMContentLoaded",function(){if(document.body){var a="",b;b=location.hostname;if(b.match(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/)){var c= b.split("."),d=c.length;b=d==2?b:c[d-2]+"."+c[d-1]}switch(b){case "dnswatch.info":if((b=document.querySelectorAll(".searchpath"))&&b.length>0)for(c=0;c<b.length;c++)if(d=b[c].innerText?b[c].innerText:b[c].textContent)(d=d.match(/a record found:\s*(\d+\.\d+\.\d+\.\d+)/i))&&d.length>1&&(a=d[1]);break;case "dtools.net":a=(a=document.body.innerHTML.match(/ping\s*[\w\.\-]+\s*\((\d+\.\d+\.\d+\.\d+)\)/i))&&a.length>1?a[1]:""}a=cdm_dns.msgPref+"\n"+encodeURIComponent(a);window.parent.postMessage(a,"*")}}, false);else{if(location.hash.indexOf(cdm_link.hash)==0){var n=location.href.replace(/#.+$/,""),h=0,l=function(){if(!(h<0))if(h>attempts)window.parent.postMessage(cdm_link.msgPref+"\n","*");else{var a=n.replace(/_\%s/,"_"+h),a=a.replace("download","sdownload");h++;m(a,function(b){var c=b.responseText;b.status<400&&c.indexOf("File not found")==-1&&b.getAllResponseHeaders().indexOf('Content-Disposition')!=-1?(h=-100,b=cdm_link.msgPref+"\n"+encodeURIComponent(a),window.parent.postMessage(b,"*")):l()},"HEAD")}};l()}}else window.addEventListener("message",function(a){if(a.data)if(a.data.indexOf(cdm_dns.msgPref)== 0){a=a.data.split("\n");if(a.length==0)return false;if(a[0]==cdm_dns.msgPref){if(a.length>1&&((ip=decodeURIComponent(a[1]))&&e&&(e=e.replace(/^(https?:\/\/)[^\/]+/i,"$1"+ip)),e&&j(null,e),autodownload.ip&&!autodownload.normal))location.href=e;(a=document.getElementById(cdm_dns.frameId))&&a.parentNode.removeChild(a)}}else if(a.data.indexOf(cdm_link.msgPref)==0){a=a.data.split("\n");if(a.length==0)return false;if(a[0]==cdm_link.msgPref){if(a.length>1&&a[1]){var b=decodeURIComponent(a[1]);if(b){j(b); if(autodownload.normal&&!autodownload.ip)location.href=b;if(services&&services.length>0&&(a=b.match(/^http:\/\/([^\/]+)/i))&&a.length>1&&a[1].search(/^\d+\.\d+\.\d+\.\d+/)==-1)e=b,b=Math.random()*(new Date).getTime(),b=Math.round(b)%services.length,k(services[b].replace("{domain}",a[1]),cdm_dns.hash,cdm_dns.frameId)}}else{if(e.search(/^http:\/\/\w+\.shareflare\.net\//i)>-1){e=e.replace(/\.shareflare\.net\//i,".letitbit.net/");k(e,cdm_link.hash,cdm_link.frameId);return}if(e.search(/^http:\/\/\w+\.letitbit\.net\//i)>-1){e=e.replace(/\.letitbit\.net\//i,".vip-file.com/");k(e,cdm_link.hash,cdm_link.frameId);return}j(null,null,"Link not found");(a=document.getElementById("dvifree"))||(a=document.getElementById("ifree_form"));a.tagName!="FORM"&&(a=a.querySelector("form"));a.tagName=="FORM"&&a.submit()}(a=document.getElementById(cdm_link.frameId))&&a.parentNode.removeChild(a)}}},false),document.addEventListener("DOMContentLoaded",function(){if(location.href.search(/^http:\/\/(www\.)?shareflare\.net\/download\/.+\.html$/i)!= -1){var a=document.getElementById("dvifree");a&&(a.tagName!="FORM"&&(a=a.querySelector("form")),a.tagName=="FORM"&&a.submit())}else if(location.href.search(/^http:\/\/(www\.)?(vip-file\.com|shareflare\.net)\/download_free/i)!=-1)for(var b=0;b<document.forms.length;b++)a=document.forms[b],a.action&&a.action.search(/\/download4\.php$/i)!=-1&&a.submit();else if(location.href.search(/^http:\/\/(\w+\.)?shareflare\.net\/(?:download4\.php$|download\.php\?.*uid=)/i)!=-1){var c=document.querySelector('form input[name="md5crypt"]'); if(c&&(c=c.value,!(c.search(/[^\w\+\/\=]/)>-1))){for(var a="",d,h,j,f,i,b=0,c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");b<c.length;)d=keystr.indexOf(c.charAt(b++)),h=keystr.indexOf(c.charAt(b++)),f=keystr.indexOf(c.charAt(b++)),i=keystr.indexOf(c.charAt(b++)),d=d<<2|h>>4,h=(h&15)<<4|f>>2,j=(f&3)<<6|i,a+=String.fromCharCode(d),f!=64&&(a+=String.fromCharCode(h)),i!=64&&(a+=String.fromCharCode(j));c=a.split("|");!(c.length<4)&&c[0].search(/^http:\/\/r\w+\.(shareflare\.net|vip-file\.com)\/download\w+\//i)!== -1&&(c[0]=c[0].replace(/^(http:\/\/[^\/]+\/download\w+\/).*$/i,"$1"),a=c[0]+"sha",b=new Date,f=b.getTime(),ti=timecorrect?180:240,f+=(b.getTimezoneOffset()+ti)*6E4,b=new Date(f),f=b.getDate().toString(),f.length==1&&(f="0"+f),b=b.getHours().toString(),b.length==1&&(b="0"+b),e=a+(f+b)+"/"+c[2]+"_%s/"+c[3],k(e,cdm_link.hash,cdm_link.frameId))}}},false)})();
})();