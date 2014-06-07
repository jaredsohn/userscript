// ==UserScript==
// @name                Oron Helper
// @author      Silvio Klaic <sklaic [at] sklaic [dot] info>
// @namespace   http://www.sklaic.info/
// @version	20110912
// @description Removes wait timer, starts download automatically, reload page when timer runs out.
// @include       http://oron.com/*
// ==/UserScript==

// -- User configuration --
// Value 0 disable option and 1 enable
var ShowCaptchaAlert = 1;
var ShowPageReloadCountdown = 1;
var AutoClickFreeDownload = 1;
var AutoDownloadLink = 1;

// -- Begining of script --
form=document.forms.namedItem('F1');
if (form) {//form exist do search
 captc=document.getElementById("captcha1");
 if (captc) {//remove wait timeout
  captc.style.display='block';
  cnt=document.getElementById("countdown_str");
  if (cnt) cnt.style.display='none';
  dow=document.getElementById("btn_download");
  if (dow) dow.style.display='block';
  if(ShowCaptchaAlert) alert('Captcha ready!');
 }else{//wait next timeout
  var text = form.getElementsByTagName('p')[0].innerHTML;
  var checkreg = new RegExp("You have to wait");
  var check = text.match(checkreg);
  if (check!=null) {
   var hour = new RegExp("[0-9]+? hour");
   var min = new RegExp("[0-9]+? minute");
   var sec = new RegExp("[0-9]+? second");
   var num = new RegExp("[0-9]+? ");
   var h2 = text.match(hour);
   var m2 = text.match(min);
   var s2 = text.match(sec);
 
   if (h2!=null){ var h=parseInt(h2.toString().match(num)); }else{ var h = 0; }
   if (m2!=null){ var m=parseInt(m2.toString().match(num)); }else{ var m = 0; }
   if (s2!=null){ var s=parseInt(s2.toString().match(num)); }else{ var s = 0; }
   time = ((h*3600)+(m*60)+s)*1000;
   if (parseInt(time)>0) {//set current time + random few miliseconds
    time = (time+ Math.floor(Math.random()*3000));
    //create timeout countdown script
    if(ShowPageReloadCountdown){
     var rs=Math.floor(time/1000);
     var elmt = document.createElement("script");
     elmt.textContent = "v=new Date();function tbx666(){n=new Date();s="+rs+"-Math.round((n.getTime()-v.getTime())/1000.);m=0;h=0;if(s>59){m=Math.floor(s/60); s=s-m*60}if(m>59){h=Math.floor(m/60);m=m-h*60} if(s<10){s='0'+s}if(m<10){m='0'+m}document.title=h+':'+m+':'+s+' to download';window.setTimeout('tbx666();',999);}tbx666();";
     document.getElementsByTagName('head')[0].appendChild(elmt);
    }//end if ShowPageReloadCountdown
    location.href = "javascript:void(setTimeout('location.href=\""+location.href+"\";',"+time+"));";
   }//end if time
  }//end if check
 }//end else if captc
}else{//no form, hit free download button
 var lastform = parseInt(document.forms.length)-1;
 if (lastform>=0) form=document.forms[lastform];
 if(form){//form exists, do action with button
  //remove oron cookie
  document.cookie = "aff_file=;path=/;domain=.oron.com";
  document.cookie = "ref_url=;path=/;domain=.oron.com";
  document.cookie = "aff=;path=/;domain=.oron.com";
  document.cookie = "xip=;path=/;domain=.oron.com";
  document.cookie = "oron_cook=;path=/;domain=.oron.com";
  if (AutoClickFreeDownload) form.elements.namedItem('method_free').click();
 }else{//click on Download link
  if (AutoDownloadLink){//do download
   tabl=document.getElementsByTagName('table')[2];
   if(tabl) location.href=tabl.getElementsByTagName('a')[0].href;
  }//end if AutoDownloadLink
 }//end else if form
}//end else if form
// -- End of script --
