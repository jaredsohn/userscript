// ==UserScript==
// @name        letitbit.net helper. FROM Opera 9 - 10
// @version     8.0
// @history 	8.0 Код обновлён спасибо за идею mikle0x
// @history 	7.4.2 Введена опция корректировки времени для России.
// @history 	7.4.1 Упс :)
// @history 	7.4 Доп. проверка.
// @history 	7.3.2 Кое что забыл :p
// @history 	7.3.1 Fix перебора.
// @history 	7.3 Кажись определились с работой.
// @history 	7.2b Beta версия, т.к. не понятно работает она или нет как положено до конца.
// @history 	7.1 Эксперименты по версии продолжаются, но этот раз последний.
// @history 	7.0.2 Непонятная история с последней версией файла, удалили id.
// @history 	7.0.1 Добавил автоскачивание на выбор по ссылке с IP или по оригинальной. Параметр ip или normal должен быть выставлен только один в true или все в false. Также изменил id скрипта. Написал описания к параметрам.
// @history 	7.0 Полностью новый рабочий скрипт
// @author      Mike Samokhvalov (mod. by Black_Sun)
// @namespace http://userscripts.org/scripts/show/75310
// @updateURL	https://userscripts.org/scripts/source/75310.meta.js
// @include     http://letitbit.net/*
// @include     http://*.letitbit.net/*
// @include     http://vip-file.com/download*
// @include     http://*.vip-file.com/download*
// @include     http://*.vip-file.com/link.php*
// @include     http://www.dnswatch.info/*
// @include     http://ping.dtools.net/*
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

(function(){



  var showLinkInInput = true; //Показывать или нет дополнительно поле со ссылкой
  var autodownload = true;  //Автоскачивание; true - включить; false - выеключить



  var timecorrect=true; //Временная корректировка для России. true - включить, false - выключить.
  var attempts = 5; // Количество попыток нахождения ссылки.
  var keystr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';		     
  var services = [
    'http://www.dnswatch.info/dns/dnslookup?la=en&host={domain}&type=A&submit=Resolve',
    //'http://ping.dtools.net/index.php?seed=21&host={domain}&count=1&submit=Ping%21'
  ];
  
  var style = {
    panel: 'color: #fff; background-color: #669523; border: 1px solid #4f7a16; font-size: 14pt !important; padding: 5px 0; margin-bottom: 10px; text-align: center;',
    a: 'color: #fff'
  };
 
  var cdm_dns = {
    hash: '#ujs_letitbit_net_helper_dns',
    msgPref: 'ujs_letitbit_net_helper_dns',
    frameId: 'ujs_letitbit_net_helper_frame_dns'
  };
  var cdm_link = {
    hash: '#ujs_letitbit_net_helper_link',
    msgPref: 'ujs_letitbit_net_helper_link',
    frameId: 'ujs_letitbit_net_helper_frame_link'
  };
function getLink(){var b=$("#cap_text").attr("value");$.post("/ajax/check_captcha.php",{code:b},function(a){if("undefined"!=typeof a&&a.length){if(autodownload)document.location.href=a;showLinkInInput&&$("#links").after('<div style="'+style.panel+'"><a href="'+a+'" style="'+style.a+'">Download</a> &nbsp; <input type="text" value="'+a+'" readonly="1" size="48" onfocus="if(this.value){this.select();}"></div>');$("#links").removeClass("hide-block");$("#links a").attr("href",a);$('#captcha').hide();}else a=Math.floor(1E5*Math.random()), $("#captcha_img").attr("src","/captcha_new.php?rand="+a)})};
(function(){function k(a,b,c){var d=document.createElement("iframe");d.src=a+b;d.id=c;d.width=0;d.height=0;d.frameBorder="no";d.scrolling="no";d.setAttribute("ujs_external_unblocked","1",false);document.body.appendChild(d)}function j(a,b,c){var d="";a&&(d='<a href="'+a+'" style="'+style.a+'">Download</a>',showLinkInInput&&(d+=' &nbsp; <input type="text" value="'+a+'" readonly="1" size="48" onfocus="if(this.value){this.select();}">'));b&&(d+='<a href="'+b+'" style="'+style.a+'">Download</a>', showLinkInInput&&(d+=' &nbsp; <input type="text" value="'+b+'" readonly="1" size="48" onfocus="if(this.value){this.select();}">'));c&&(d='<span style="'+style.a+'">'+c+"</span>");if(d)a=document.createElement("div"),a.setAttribute("style",style.panel,false),a.innerHTML=d,document.body.insertBefore(a,document.body.firstChild)}function m(a,b,c,d,e,h,f,i){var g=new XMLHttpRequest;if(g){f=f?f:navigator.userAgent;g.open(c?c:e?"POST":"GET",a,true);g.setRequestHeader("User-Agent",f);d&&g.setRequestHeader("Referer", d);h&&g.setRequestHeader("Cookie",h);e&&(g.setRequestHeader("Content-type","application/x-www-form-urlencoded"),g.setRequestHeader("Content-Length",e.length));if(i)for(a=0;a<i.length;a++)g.setRequestHeader(i[a][0],i[a][1]);g.onreadystatechange=function(){g.readyState==4&&b(g)};g.readyState!=4&&(e?g.send(e):g.send())}}var e="";if(top!=self)if(location.hash.indexOf(cdm_dns.hash)==0)document.addEventListener("DOMContentLoaded",function(){if(document.body){var a="",b;b=location.hostname;if(b.match(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/)){var c= b.split("."),d=c.length;b=d==2?b:c[d-2]+"."+c[d-1]}switch(b){case "dnswatch.info":if((b=document.querySelectorAll(".searchpath"))&&b.length>0)for(c=0;c<b.length;c++)if(d=b[c].innerText?b[c].innerText:b[c].textContent)(d=d.match(/a record found:\s*(\d+\.\d+\.\d+\.\d+)/i))&&d.length>1&&(a=d[1]);break;case "dtools.net":a=(a=document.body.innerHTML.match(/ping\s*[\w\.\-]+\s*\((\d+\.\d+\.\d+\.\d+)\)/i))&&a.length>1?a[1]:""}a=cdm_dns.msgPref+"\n"+encodeURIComponent(a);window.parent.postMessage(a,"*")}}, false);else{if(location.hash.indexOf(cdm_link.hash)==0){var n=location.href.replace(/#.+$/,""),h=0,l=function(){if(!(h<0))if(h>attempts)window.parent.postMessage(cdm_link.msgPref+"\n","*");else{var a=n.replace(/_\%s/,"_"+h),a=a.replace("download","sdownload");h++;m(a,function(b){var c=b.responseText;b.status<400&&c.indexOf("File not found")==-1&&b.getAllResponseHeaders().indexOf('Content-Disposition')!=-1?(h=-100,b=cdm_link.msgPref+"\n"+encodeURIComponent(a),window.parent.postMessage(b,"*")):l()},"HEAD")}};l()}}else window.addEventListener("message",function(a){if(a.data)if(a.data.indexOf(cdm_dns.msgPref)== 0){a=a.data.split("\n");if(a.length==0)return false;if(a[0]==cdm_dns.msgPref){if(a.length>1&&((ip=decodeURIComponent(a[1]))&&e&&(e=e.replace(/^(https?:\/\/)[^\/]+/i,"$1"+ip)),e&&j(null,e),autodownload.ip&&!autodownload.normal))location.href=e;(a=document.getElementById(cdm_dns.frameId))&&a.parentNode.removeChild(a)}}else if(a.data.indexOf(cdm_link.msgPref)==0){a=a.data.split("\n");if(a.length==0)return false;if(a[0]==cdm_link.msgPref){if(a.length>1&&a[1]){var b=decodeURIComponent(a[1]);if(b){j(b); if(autodownload.normal&&!autodownload.ip)location.href=b;if(services&&services.length>0&&(a=b.match(/^http:\/\/([^\/]+)/i))&&a.length>1&&a[1].search(/^\d+\.\d+\.\d+\.\d+/)==-1)e=b,b=Math.random()*(new Date).getTime(),b=Math.round(b)%services.length,k(services[b].replace("{domain}",a[1]),cdm_dns.hash,cdm_dns.frameId)}}else{if(e.search(/^http:\/\/\w+\.letitbit\.net\//i)>-1){e=e.replace(/\.letitbit\.net\//i,".vip-file.com/");k(e,cdm_link.hash,cdm_link.frameId);return}else{e=e.replace(/\w+\.vip-file\.com\//i,"78.140.170.221/");k(e,cdm_link.hash,cdm_link.frameId);return}j(null,null,"Link not found");(a=document.getElementById("dvifree"))||(a=document.getElementById("ifree_form"));a.tagName!="FORM"&&(a=a.querySelector("form"));a.tagName=="FORM"&&a.submit()}(a=document.getElementById(cdm_link.frameId))&&a.parentNode.removeChild(a)}}},false),document.addEventListener("DOMContentLoaded",function(){if(location.href.search(/^http:\/\/(www\.)?letitbit\.net\/download\/.+\.html$/i)!= -1){var a=document.getElementById("ifree_form");a&&(a.tagName!="FORM"&&(a=a.querySelector("form")),a.tagName=="FORM"&&a.submit())}else if(location.href.search(/^http:\/\/(www\.)?(vip-file\.com|letitbit\.net)\/downloadl\//i)!=-1)for(var b=0;b<document.forms.length;b++)a=document.forms[b],a.action&&a.action.search(/\/download4\.php$/i)!=-1&&a.submit();else if(location.href.search(/^http:\/\/(\w+\.)?letitbit\.net\/(?:download4\.php$|download\.php\?.*uid=)/i)!=-1){var c=document.querySelector('form input[name="md5crypt"]'),cc=document.getElementById('d3_form');cc.submit(); if(c&&(c=c.value,!(c.search(/[^\w\+\/\=]/)>-1))){for(var a="",d,h,j,f,i,b=0,c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");b<c.length;)d=keystr.indexOf(c.charAt(b++)),h=keystr.indexOf(c.charAt(b++)),f=keystr.indexOf(c.charAt(b++)),i=keystr.indexOf(c.charAt(b++)),d=d<<2|h>>4,h=(h&15)<<4|f>>2,j=(f&3)<<6|i,a+=String.fromCharCode(d),f!=64&&(a+=String.fromCharCode(h)),i!=64&&(a+=String.fromCharCode(j));c=a.split("|");!(c.length<4)&&c[0].search(/^http:\/\/r\w+\.(letitbit\.net|vip-file\.com)\/download\w+\//i)== -1&&(c[0]=c[0].replace(/^http:\/\/[^\/]+(\/download\w+\/).*$/i,"$1"),asdf=document.getElementById('d3_form').action.replace(/^(http:\/\/[^\/]+)\/download\w+\/.*$/ig,"$1"),a=asdf+c[0]+"let",b=new Date,f=b.getTime(),ti=timecorrect?180:240,f+=(b.getTimezoneOffset()+ti)*6E4,b=new Date(f),f=b.getDate().toString(),f.length==1&&(f="0"+f),b=b.getHours().toString(),b.length==1&&(b="0"+b),e=a+(f+b)+"/"+c[2]+"_%s/"+c[3],k(e,cdm_link.hash,cdm_link.frameId))}}if(location.href.search(/^http:\/\/(\w+\.)?letitbit\.net\/(downloadl.*html)/i)!=-1){document.querySelector('.row form').submit();}if(location.href.search(/^http:\/\/(\w+\.)?letitbit\.net\/(?:download3\.php$|download3\.php\?.*uid=)/i)!=-1){
$.post("/ajax/download3.php",function(){var a=Math.floor(1E5*Math.random());$("#captcha").removeClass("hide-block");$("#captcha").html('<div class="row wrapper-centered" id="captcha_box"><img style="cursor:pointer" onclick="changeCaptcha(this)" id="captcha_img" src="/captcha_new.php?rand='+a+'"/><br/><br/><strong>Picture code</strong>&nbsp;&nbsp;<input type="text" id="cap_text" style="width:60px" value=""/> &nbsp;&nbsp;<input type="button" id="conf" value="Ready" /></div>'); $("#conf").click(function(){getLink()});$("#cap_text").keydown(function(event){if(event.keyCode==13)getLink()});$("#stopwatch").remove()});}},false)})();})();