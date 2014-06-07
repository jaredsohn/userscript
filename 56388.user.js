// ==UserScript==
// @name          AstroEmpiresTools
// @namespace     OJD
// @description   Interface enhancements and additional tools for the Astro Empires MMOG (www.astroempires.com)
// @version       4.3.3
// @author        Outsource Justified Design - ojd.websites@gmail.com
// @include       http://*.astroempires.com/*
// @exclude       http://forum.astroempires.com/*
// @exclude       http://wiki.astroempires.com/*
// @exclude       *.astroempires.com/home.aspx*
// @exclude       *.astroempires.com/login.aspx*
// @change        Fixed the recall display/timer and auto-recall function. <br><br>If you are experiencing trouble with any timers, try disabling all 3 of the timer options provided in the Account/Display options of the game.<br><br>enjoy... Dave
// ==/UserScript==

/**** Common Functions ****/
var wlh=window.location.href;

if(getSetting('redirect','')!=''){
 var l=getSetting('redirect','');
 setSetting('redirect','');
 window.location=wlh.split('.')[0]+'.astroempires.com/'+l;
 return;
}

if(getSetting('config_scrollTopBot',true)){
 var d=document.createElement('div');
 d.setAttribute('style','z-index:10;position:fixed;top:0;right:0;border-top:8px solid #888;border-right:14px solid transparent;border-bottom:0;border-left:14px solid transparent;cursor:pointer;');
 document.body.insertBefore(d,document.body.firstChild);
 d.addEventListener('click',function(){scrollTo(0,(document.body.parentNode.scrollHeight)?document.body.parentNode.scrollHeight:(document.documentElement.clientHeight)?document.documentElement.clientHeight:document.body.clientHeight);},false);
 d=document.createElement('div');
 d.setAttribute('style','z-index:10;position:fixed;right:0;bottom:0;border-top:0;border-right:14px solid transparent;border-bottom:8px solid #888;border-left:14px solid transparent;cursor:pointer;');
 document.body.insertBefore(d,document.body.firstChild);
 d.addEventListener('click',function(){scrollTo(0,0);},false);
}

function fixServerTime(){
 var t=document.getElementById('server-time');
 var d = /(\d+)\/(\d+)\/(\d+)\W([\d:]+)/.exec(t.title);
 t.parentNode.innerHTML=t.parentNode.innerHTML.replace(/:.*/,': '+d[3]+'-'+d[2]+'-'+d[1]+' '+d[4]);
}
fixServerTime();

function getPlayerName(n){
 var r = /(\[.*?\])(.*)/.exec(n);
 if(r!=null) return r[2].substring(1);
 else return n;
}
function getGuild(n){
 var r = /\[.*?\]/.exec(n);
 if(r) return r[0];
 else return n;
}

function getView(){
 var v = wlh.split("view=",2);
 if(v.length<=1) return "";
 v = v[1].split("&")[0];
 if(v=='move_start') return '';
 v = v.substring(0,1).toUpperCase() + v.substring(1);
 return v;
}

function aetLight(){
 if(!getSetting('config_aetLight',true)) return;
 var r=document.evaluate("//table[contains(@class,'listing')]",document,null,7,null),i=0;
 if(wlh.indexOf('empire.aspx?view=units')!=-1) i=(getSetting('config_fleetSummary',true))?2:1;
 else if(wlh.indexOf('empire.aspx?view=structures')!=-1) return;
 for(i;i<r.snapshotLength;i++){
  r.snapshotItem(i).className=r.snapshotItem(i).className+' aetLight';
  r.snapshotItem(i).onmouseover='';
  r.snapshotItem(i).onmouseout='';
  if((i==r.snapshotLength-2 && wlh.indexOf('empire.aspx?view=economy')!=-1) || wlh.indexOf('credits.aspx')!=-1) break;
 }
}

function getSetting(k,v){return GM_getValue(wlh.split('.')[0].split('/')[2]+"_"+k,v)}
function setSetting(k,v){try{if(typeof v=='string' && v=='') return GM_deleteValue(wlh.split('.')[0].split('/')[2]+"_"+k); else return GM_setValue(wlh.split('.')[0].split('/')[2]+"_"+k,v)}catch(e){return GM_setValue(wlh.split('.')[0].split('/')[2]+"_"+k,v)}}

function cleanNumbers(n,f){
 n=''+n;
 var c;
 if(n.match(/\.\d\d$/)!=null){
   c=/\.\d\d$/.exec(n);
   n=n.split(/\.\d\d$/)[0];
 }else if(n.match(/\.\d$/)!=null){
   c=/\.\d$/.exec(n);
   n=n.split(/\.\d$/)[0];
 }else if(n.match(/\,\d\d$/)!=null){
   c=/\,\d\d$/.exec(n);
   n=n.split(/\,\d\d$/)[0];
 }else if(n.match(/\,\d$/)!=null){
   c=/\,\d$/.exec(n);
   n=n.split(/\,\d$/)[0];
 }
 else c='';
 if(c!='') c=((f)?'.':unescape(getSetting('config_numberDecimal',".")))+c.toString().substr(1);
 n=n.replace(/[^\d-]/g,'')+c;
 return n;
}

function zeroPad(n){
 if(n<=9) return "0"+n;
 return n;
}

function getDateObject(s){ //31-05-2009 4:37:00
 if(!s)  s=getCurrentServerTime();
 var r = /(\d+)-(\d+)-(\d{4})+\W(\d+):(\d+):(\d+)/.exec(s);
 if(r) return new Date(r[3],(r[2]-1),r[1],r[4],r[5],r[6]); //year,month,day,hr,min,sec
 else throw "Invalid arrival input. Ensure arrival time is in the following format. MM-DD-YYYY HH:MM:SS";
}

function getCurrentServerTime(){
 var a = /<small>[^:]+: (\d+-\d+-\d+ \d+:\d+:\d+)<\/small>/.exec(document.body.innerHTML);
 if(a) return a[1];
 else return /<small>[^:]+:<\/small> (\d+-\d+-\d+ \d+:\d+:\d+)/.exec(document.body.innerHTML)[1];
}

function getDateString(d){ //15-05-2008 4:37:00
 return d.getDate()+"-"+zeroPad((d.getMonth()+1))+"-"+d.getFullYear()+" "+zeroPad(d.getHours())+":"+zeroPad(d.getMinutes())+":"+zeroPad(d.getSeconds());
}

function getTimeDisplay(t){
 var h=Math.floor(t/3600);
 var m=Math.floor((t % 3600)/60);
 var s=Math.floor((t % 3600) % 60);
 var a=s+"s";
 if(m>0 || h>0)	a=m+"m "+a;
 if(h>0) a=h+"h "+a;
 return a;
}

function notify(m,c){
 var d=2000,e=0,b=document.createElement('div'),o=100;
 if(c=="notifierError"){
   b.style.cssText='background-color:#004;border:2px solid red;color:red;padding:10px;position:absolute;white-space:nowrap;z-index:99;';
   d=4000;
   e=50;
 }
 else b.style.cssText='background-color:#004;border:1px solid #205680;padding:10px;position:absolute;white-space:nowrap;z-index:99;';
 b=document.body.insertBefore(b,document.body.firstChild);
 b.innerHTML=m;
 b.style.top = document.body.clientHeight/2 + document.body.scrollTop - b.offsetHeight/2;
 b.style.left = document.body.clientWidth/2 + document.body.scrollLeft - b.offsetWidth/2;
 var t=setInterval(function(){o=o>e?o-1.5>e?o-1.5:e:o<e?o+1.5<e?o+1.5:e:o;b.style.opacity=o/100;if(o<=e){if(t){clearInterval(t);t=null;}if(b) document.body.removeChild(b);}},d/50);
}

function insertNotification(m){
 GM_addStyle('#gm_update_alert_buttons {position:relative;top:-5px;margin:7px;}'
   +'#gm_update_alert_button_close {position:absolute;right:0px;top:0px;padding:3px 5px 3px 5px;border-style:outset;border-width:thin;z-index:inherit;background-color:#FF0000;color:#FFFFFF;cursor:pointer;}'
   +'#gm_update_alert_buttons span, #gm_update_alert_buttons span a {text-decoration:underline;color:#003399;font-weight:bold;cursor:pointer;}'
   +'#gm_update_alert_buttons span a:hover {color:#990033;}');
 var c = document.createElement("div");
 c.setAttribute('style', 'position:relative;z-index:99;top:0px;left:0px;width:100%;background-color:#000;text-align:center;font:11px verdana,arial,sans-serif;border:1px solid #886;margin:0 auto 10px auto;padding:4px;');
 c.innerHTML = '<div style="font-weight:bold;color:orange;margin-bottom:6px;">Astro Empires Tools Notification</div>'+m;
 document.body.insertBefore(c, document.body.firstChild);
 if(document.getElementById('quickJump')) document.getElementById('quickJump').parentNode.parentNode.removeChild(document.getElementById('quickJump').parentNode);
}

/************************
 Shorten Page Titles
************************/
function adjustTitles(){
 var v=getView();
 if(v!="") document.title=wlh.split('.')[0].split('/')[2]+" - "+v;
 else document.title=document.title.replace("Astro Empires - ",wlh.split('.')[0].split('/')[2]+" - ");
}

/************************
 Add Local Times and time offset
************************/
function addLocalTime(){
 var L = new Date();
 var S = getDateObject();
 var s = document.evaluate("//small",document,null,9,null).singleNodeValue;
 var t = (/^([^:]+)/.exec(s.innerHTML))[1];
 var a=0,min=0;
 var sec = parseInt((L.getTime()-S.getTime())/1000) - (Math.round((L.getTime()-S.getTime())/3600000) * 3600) -1;
 if(sec>0) a='+';
 else if(sec<0) a='-';
 sec = Math.abs(sec);
 if(a!=0){
   while(sec>59){
     min++;
     sec-=60;
   }
   a='<small>Clock Offset:</small> <span style="font:900 14px arial,sans-serif;">'+a+'</span>';
   if(min!=0) min='<b> '+min+'</b> <small>min</small> :'; else min='';
   if(sec!=0) sec='<b> '+sec+'</b> <small>sec</small>'; else sec='';
 }
 GM_addStyle('#localTimeTable{background-color:#000;background-position:36px -1px;border:1px solid '+unescape(getSetting('config_overrideBorder','#205680'))+';text-align:center;width:80%;min-width:760px;position:relative;top:3px;color:'+unescape(getSetting('config_overrideLinksHover','#0CD'))+';white-space:nowrap;}#localTimeTable TD{border:0;padding:0;}#localTimeTable TD.times{color:'+unescape(getSetting('config_highlightTimeColor','#88CCAA'))+';font-weight:900;}#localTimeTable TD.times SMALL{color:'+unescape(getSetting('config_overrideLinksHover','#0CD'))+';}');
 var c = document.createElement('table');
 c.setAttribute('id','localTimeTable');
 c.appendChild(document.createElement('tr'));
 var e = document.createElement('td');
 e.setAttribute('width','1');
 e.setAttribute('style','padding:0 4px;background:#000 none;border-right:1px solid #205680;');
 e.innerHTML="<a href='javascript:void(1);' style='font-size:10px;' id='timeToggle'>"+((getSetting('showActualTime',false))?'Active':'Static')+"</a><span id='pageLoadTime' style='display:none;'>"+new Date().getTime()+"</span>";
 c.firstChild.appendChild(e);
 e.firstChild.addEventListener('click',function(){
   if(document.getElementById('timeToggle').innerHTML=='Static'){
     document.getElementById('timeToggle').innerHTML='Active';
     document.getElementById('actualTimeL').style.display='table-cell';
     document.getElementById('loadTimeL').style.display='none';
     document.getElementById('actualTime').style.display='table-cell';
     document.getElementById('loadTime').style.display='none';
     setSetting('showActualTime',true);
     actualTimeCounter(S,t);
   }else{
     document.getElementById('timeToggle').innerHTML='Static';
     document.getElementById('actualTimeL').style.display='none';
     document.getElementById('loadTimeL').style.display='table-cell';
     document.getElementById('actualTime').style.display='none';
     document.getElementById('loadTime').style.display='table-cell';
     setSetting('showActualTime',false);
   }
 },false);
 e = document.createElement('td');
 e.setAttribute('id','loadTime');
 e.setAttribute('class','times');
 e.setAttribute('style','display:'+(getSetting('showActualTime',false)?'none':'table-cell')+';');
 e.innerHTML = s.innerHTML.replace(t+':','<small>'+t+':</small>');
 c.firstChild.appendChild(e);
 e = document.createElement('td');
 e.setAttribute('id','actualTime');
 e.setAttribute('class','times');
 e.setAttribute('style','display:'+(getSetting('showActualTime',false)?'table-cell':'none')+';');
 c.firstChild.appendChild(e);
 if(getSetting('config_timezoneOffset',true) && Math.round((L.getTime()-S.getTime())/3600000)!=0){
   e = document.createElement('td');
   e.innerHTML="<small>TZ:</small><b> "+Math.round((L.getTime()-S.getTime())/3600000)+"</b> <small>hrs</small>";
   c.firstChild.appendChild(e);
 }
 if(getSetting('config_clockOffset',true) && a!=0){
   e = document.createElement('td');
   e.innerHTML = a+min+sec;
   c.firstChild.appendChild(e);
 }
 e = document.createElement('td');
 e.setAttribute('id','loadTimeL');
 e.setAttribute('style','display:'+(getSetting('showActualTime',false)?'none':'table-cell')+';');
 e.innerHTML="<small>Local time:</small> "+getDateString(L);
 c.firstChild.appendChild(e);
 e = document.createElement('td');
 e.setAttribute('id','actualTimeL');
 e.setAttribute('style','display:'+(getSetting('showActualTime',false)?'table-cell':'none')+';');
 c.firstChild.appendChild(e);
 s.parentNode.appendChild(c);
 s.parentNode.removeChild(s);
 actualTimeCounter(S,t);
}

function actualTimeCounter(S,k){
 if(!document.getElementById('actualTime') || document.getElementById('actualTime').style.display!='table-cell') return;
 var L=new Date();
 var t=new Date();
 t.setTime(S.getTime()+L.getTime()-parseInt(document.getElementById('pageLoadTime').innerHTML));
 document.getElementById('actualTime').innerHTML="<small>"+k+":</small> "+getDateString(t);
 document.getElementById('actualTimeL').innerHTML="<small>Local time:</small> "+getDateString(L);
 setTimeout(function(){actualTimeCounter(S,k);},1000);
}

function deletePageMessages(){
 var c = document.evaluate("//input[contains(@value,'Delete Selected')]",document,null,9,null).singleNodeValue;
 if(c==null) return;
 var b = c.parentNode.insertBefore(document.createElement('input'),c);
 b.type='button';
 b.value='Select All (on this page)';
 b.style.marginRight='2em';
 b.addEventListener('click',function(){var i=document.evaluate("//input[contains(@type,'checkbox') and not(contains(@name,'confirm'))]",document,null,7,null);for(var x=0;x<i.snapshotLength;x++){i.snapshotItem(x).checked=true;}},false);
}

/**************************
 Quick: Jump,Links,Notes
**************************/
function quickJumpLinks(){
 if(!document.getElementById('account')) return;
 var d=document.createElement('div'),c=0,l='',p=document.getElementsByTagName('img')[0].parentNode;
 if(wlh.indexOf('map.aspx')!=-1 && wlh.indexOf('loc=')!=-1) l=wlh.split('loc=')[1].split('&')[0];
 document.getElementById('account').parentNode.parentNode.style.whiteSpace='nowrap';
 var t=document.createElement('tr');
 t.setAttribute('style','text-align:center;border:0;');
 var c=t.insertCell(0);
 c.innerHTML=p.innerHTML;
 c.setAttribute('style','border:0;');
 c=t.insertCell(1);
 d.setAttribute('id','qlStart');
 d.setAttribute('style','z-index:7;width:124px;position:relative;top:-2px;');
 d.innerHTML="<input type='text' size='12' maxlength='12' id='quickJump' value='"+l+"'><input type='button' value='GO' id='quickJumpGo' style='margin-left:4px;cursor:pointer;padding:0;'><br><span style='font:500 11px verdana,tahoma,arial,sans-serif;' id='qlText'><a href='javascript:void(1);' id='quicklinks'>QuickLinks</a> - <a href='javascript:void(1);' id='qlSave' title='Save a QuickLink to this page'>Save QL</a></span>";
 c.appendChild(d);
 c.setAttribute('style','border:0;');
 c=t.insertCell(2);
 c.innerHTML=document.getElementById('account').parentNode.parentNode.parentNode.parentNode.innerHTML;
 c.setAttribute('style','border:0;');
 document.getElementById('account').parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(document.getElementById('account').parentNode.parentNode.parentNode.parentNode);
 p.setAttribute('colspan','8');
 p.innerHTML='';
 p.appendChild(document.createElement('table'));
 p.firstChild.setAttribute('style','min-width:756px;width:100%;white-space:nowrap;border:0;background:transparent none;');
 p.firstChild.appendChild(t);
 document.getElementById('quicklinks').addEventListener('click',function(){showQuickLinks();},false);
 document.getElementById('qlSave').addEventListener('click',function(){saveQuickLinks(false);},false);
 document.getElementById('quickJumpGo').addEventListener('click',function(){
   var a=/^([A-G]\d\d:\d\d:\d\d:\d\d)?/i.exec(document.getElementById('quickJump').value)[1],s='';
   if(!a){a=/^([A-G]\d\d:\d\d:\d\d)?/i.exec(document.getElementById('quickJump').value)[1];}
   if(!a){a=/^([A-G]\d\d:\d\d)?/i.exec(document.getElementById('quickJump').value)[1];}
   if(!a) a=/^([A-G]\d\d)?/i.exec(document.getElementById('quickJump').value)[1];
   if(!a){alert('You need to enter proper location coordinates.\n\nExample: A00:11:22:33 or A00:11, etc.\n\nThis can be any server and upper and lower case letters may be used.');return;}
   a=a.toUpperCase();
   switch(a.substr(0,1)){
     case "A":{s='alpha';break;}
     case "B":{s='beta';break;}
     case "C":{s='ceti';break;}
     case "D":{s='delta';break;}
     case "E":{s='epsilon';break;}
     case "F":{s='fenix';break;}
     case "G":{s='gamma';break;}
     case "H":{s='helion';break;}
     case "I":{s='ixion';break;}
   }
   window.location='http://'+s+'.astroempires.com/map.aspx?loc='+a;
 },false);
}

function showQuickLinks(){
 if(document.getElementById('quicklinksC')) return;
 scrollTo(0,0);
 document.getElementById('qlStart').style.position='fixed';
 document.getElementById('qlStart').style.top='6px';
 document.getElementById('qlText').style.display='none';
 var c=document.createElement('div'),i=0;
 c.setAttribute('id','quicklinksC');
 c.setAttribute('style','z-index:5;background:#000 none;opacity:.7;position:fixed;top:0;width:100%;height:138px;');
 document.body.insertBefore(c,document.evaluate("//table[@class='top']",document,null,9,null).singleNodeValue);
 c=document.createElement('div');
 c.setAttribute('id','quicklinksD');
 c.setAttribute('style','min-width:760px;z-index:6;position:fixed;top:0;border-bottom:2px solid #FF6464;width:100%;height:138px;');
 document.body.insertBefore(c,document.evaluate("//table[@class='top']",document,null,9,null).singleNodeValue);
 var h="<table style='border:0;border-bottom:2px solid "+unescape(getSetting('config_overrideBorder','#205680'))+";margin:0;height:30px;width:100%;background:"+unescape(getSetting('config_overrideFormBack','#004'))+" none;'><tr style='text-align:center;'>"+
   "<td style='width:2%;'><a href='' style='background:#000 none;border:1px solid #205680;display:inline-block;padding:2px 4px;position:relative;top:-1px;' target='_blank' title='Help and Instructions'>?</a></td>"+
   "<td style='width:17%;' id='qlTitle1'><a href='contacts.aspx'>Edit Contacts</a></td>"+
   "<td style='width:17%;' id='qlTitle2'><a href='bookmarks.aspx'>Edit Bookmarks</a></td>"+
   "<td style='width:13%;font:italic 900 18px vardana,tahoma,arial,sans-serif;'>QuickLinks</td>"+
   "<td style='visibility:hidden;width:126px;'>&nbsp;</td>"+
   "<td style=''><a href='javascript:void(1);' id='qlSave2' title='Save a QuickLink to this page'>Save QuickLink</a></td>"+
   "<td style=''><a href='javascript:void(1);' id='qlSave3' title='Save a long term link'>Save Custom Link</a></td>"+
   "<td style='width:1px;'><input type='button' class='AETbut' style='background:#000 none;border:1px solid "+unescape(getSetting('config_overrideBorder','#205680'))+";display:inline-block;padding-bottom:1px;margin:0 28px 0 10px;float:right;font-size:11px;position:relative;top:-1px;left:-4px;' onclick='document.body.removeChild(document.getElementById(\"quicklinksC\"));document.body.removeChild(document.getElementById(\"quicklinksD\"));document.getElementById(\"qlStart\").style.position=\"relative\";document.getElementById(\"qlStart\").style.top=\"-2px\";document.getElementById(\"qlText\").style.display=\"\";' value='Close'></td>"+
   "</tr></table><table style='border:0;background:transparent none;margin:0;width:100%;'><tr style='vertical-align:top;'>"+
   "<td style='width:2%;'></td>"+
   "<td style='width:17%;text-align:center;font:10px arial;'><div id='qlContacts' style='text-align:left;width:150px;height:78px;overflow:auto;margin:0 auto;padding:0 5px 10px 5px;border:2px solid "+unescape(getSetting('config_overrideBorder','#205680'))+";border-top-color:"+unescape(getSetting('config_overrideFormBack','#004'))+";background:"+unescape(getSetting('config_overrideFormBack','#004'))+" none;color:"+unescape(getSetting('config_overrideText','#FFE'))+";position:relative;top:-3px;'>";
 var a=getSetting('data_contacts','').split('|:|');
 if(a=='') h+="No contacts have been saved. Visit the <a href='contacts.aspx'>contacts</a> page to save the data to use here.";
 else{
   for(i;i<a.length;i++){
     h+="<a href='javascript:void(1);' id='contact_"+i+"'>"+unescape(a[i].split('|')[1])+"</a><br>";
   }
 }
 h+="</div><div id='qlBases' style='display:none;text-align:left;width:150px;height:78px;overflow:auto;margin:0 auto;padding:0 5px 10px 5px;border:2px solid "+unescape(getSetting('config_overrideBorder','#205680'))+";border-top-color:"+unescape(getSetting('config_overrideFormBack','#004'))+";background:"+unescape(getSetting('config_overrideFormBack','#004'))+" none;color:"+unescape(getSetting('config_overrideText','#FFE'))+";position:relative;top:-3px;'>";
 a=getSetting('empireBaseData','').split('|:|');
 if(a=='') h+="No bases have been saved. Visit the <a href='empire.aspx?view=economy'>economy</a> page to save the data to use here.";
 else{
   for(i=0;i<a.length;i++){
     h+="<a href='javascript:void(1);' id='base_"+i+"'>"+unescape(a[i].split('|')[1])+"</a><br>";
   }
 }
 h+="</div><a href='javascript:void(1);' id='qlToggle1' style='background:#000 none;'>&nbsp;Show Bases&nbsp;</a></td><td style='width:17%;text-align:center;font:10px arial;'><div id='qlBookmarks' style='text-align:left;width:150px;height:78px;overflow:auto;margin:0 auto;padding:0 5px 10px 5px;border:2px solid "+unescape(getSetting('config_overrideBorder','#205680'))+";border-top-color:"+unescape(getSetting('config_overrideFormBack','#004'))+";background:"+unescape(getSetting('config_overrideFormBack','#004'))+" none;color:"+unescape(getSetting('config_overrideText','#FFE'))+";position:relative;top:-3px;'>";
 a=getSetting('data_bookmarks','').split('|:|')
 if(a=='') h+="No bookmarks have been saved. Visit the <a href='bookmarks.aspx'>bookmarks</a> page to save the data to use here.";
 else{
   for(i=0;i<a.length;i++){
     h+="<a href='javascript:void(1);' id='bookmark_"+i+"' style='font-size:11px;display:block;text-align:center;' title='Click to Open'>"+unescape(a[i].split('|')[0])+"</a>"+unescape(a[i].split('|')[1])+"<br><br>";
   }
 }
 h+="</div><div id='qlOccupations' style='display:none;text-align:left;width:150px;height:78px;overflow:auto;margin:0 auto;padding:0 5px 10px 5px;border:2px solid "+unescape(getSetting('config_overrideBorder','#205680'))+";border-top-color:"+unescape(getSetting('config_overrideFormBack','#004'))+";background:"+unescape(getSetting('config_overrideFormBack','#004'))+" none;color:"+unescape(getSetting('config_overrideText','#FFE'))+";position:relative;top:-3px;'>";
 a=getSetting('data_occupations','').split('|:|');
 if(a=='') h+="No occupations have been saved. Visit the <a href='empire.aspx?view=economy'>economy</a> page to save the data to use here.";
 else{
   for(i=0;i<a.length;i++){
     h+="<a href='javascript:void(1);' id='occupation_"+i+"'>"+unescape(a[i].split('|')[1])+"</a><br>";
   }
 }
 h+="</div><a href='javascript:void(1);' id='qlToggle2' style='background:#000 none;'>&nbsp;Show Occupations&nbsp;</a></td>"+
   "<td style='width:26%;vertical-align:middle;'><div style='display:none;width:250px;height:106px;overflow:auto;margin:0 auto;padding:0 5px;border:2px solid "+unescape(getSetting('config_overrideBorder','#205680'))+";border-top-color:"+unescape(getSetting('config_overrideFormBack','#004'))+";background:"+unescape(getSetting('config_overrideFormBack','#004'))+" none;color:"+unescape(getSetting('config_overrideText','#FFE'))+";position:relative;top:-3px;' id='qLData'></div><div id='qlDiv' style='text-align:center;font-size:13px;background:#000 none;max-height:106px;overflow:auto;padding:1px;'></div></td>"+
   "<td colspan=2 style=''><div id='qlDiv2' style='font-size:13px;max-height:106px;overflow:auto;margin:0 auto;padding:0 5px;border:2px solid "+unescape(getSetting('config_overrideBorder','#205680'))+";border-top-color:"+unescape(getSetting('config_overrideFormBack','#004'))+";background:"+unescape(getSetting('config_overrideFormBack','#004'))+" none;position:relative;top:-3px;'></div></td>"+
   "<td style='width:4%;'></td>"+
   "</tr></table>";

 c.innerHTML=h;
 for(var x in {'qlContacts':0,'qlBases':0,'qlBookmarks':0,'qlOccupations':0}){
   a=document.evaluate(".//a",document.getElementById(x),null,7,null);
   for(i=0;i<a.snapshotLength;i++){
     a.snapshotItem(i).addEventListener('click',function(){showQLData(this.id);},false);
   }
 }
 document.getElementById('qlToggle1').addEventListener('click',function(){if(document.getElementById('qlBases').style.display=='none'){document.getElementById('qlBases').style.display='block';document.getElementById('qlContacts').style.display='none';document.getElementById('qlTitle1').innerHTML="<a href='empire.aspx'>View Bases</a>";document.getElementById('qlToggle1').innerHTML='&nbsp;Show Contacts&nbsp;';}else{document.getElementById('qlBases').style.display='none';document.getElementById('qlContacts').style.display='block';document.getElementById('qlTitle1').innerHTML="<a href='contacts.aspx'>Edit Contacts</a>";document.getElementById('qlToggle1').innerHTML='&nbsp;Show Bases&nbsp;';}},false);
 document.getElementById('qlToggle2').addEventListener('click',function(){if(document.getElementById('qlOccupations').style.display=='none'){document.getElementById('qlOccupations').style.display='block';document.getElementById('qlBookmarks').style.display='none';document.getElementById('qlTitle2').innerHTML="<a href='empire.aspx?view=economy'>View Occupations</a>";document.getElementById('qlToggle2').innerHTML='&nbsp;Show Bookmarks&nbsp;';}else{document.getElementById('qlOccupations').style.display='none';document.getElementById('qlBookmarks').style.display='block';document.getElementById('qlTitle2').innerHTML="<a href='bookmarks.aspx'>Edit Bookmarks</a>";document.getElementById('qlToggle2').innerHTML='&nbsp;Show Occupations&nbsp;';}},false);
 document.getElementById('qlSave2').addEventListener('click',function(){saveQuickLinks(false);},false);
 document.getElementById('qlSave3').addEventListener('click',function(){saveQuickLinks(true);},false);
 showQL(false);
 showQL(true);
}

function showQL(m){
 var c=(m)?document.getElementById('qlDiv2'):document.getElementById('qlDiv');
 if(!c) return;
 GM_addStyle("A.qlHL:hover{background-color:#006;}");
 c.innerHTML='';
 if(m){
   if(getSetting('quickLinksCust','')!=''){
     var q=getSetting('quickLinksCust').split('|:|');
     for(var i=0;i<q.length;i++){
       c.innerHTML+="<a href='javascript:void(1);' id='qlcDelete_"+i+"' style='float:right;margin-right:10px;font-size:10px;'>Delete</a><a href='javascript:void(1);' id='qlcNote_"+i+"' style='float:right;margin-right:12px;font-size:11px;'>Notes</a><a id='qlcT"+i+"' style='display:block;margin-right:94px;' class='qlHL' href='"+unescape(q[i].split('|')[1])+"'>"+unescape(q[i].split('|')[0])+"</a>";
     }
     for(i=0;i<q.length;i++){
       document.getElementById('qlcDelete_'+i).addEventListener('click',function(){deleteQuickLinks(this.id.split('_')[1],true);},false);
       document.getElementById('qlcNote_'+i).addEventListener('click',viewNotesId('note_custom_'+escape(document.getElementById('qlcT'+i).href),document.getElementById('qlcT'+i).innerHTML,false),false);
     }
   }else c.innerHTML='No Custom Links Defined';
 }else{
   if(getSetting('quickLinksTemp','')!=''){
     var q=getSetting('quickLinksTemp').split('|:|');
     for(var i=0;i<q.length;i++){
       c.innerHTML+="<a href='javascript:void(1);' id='qlDelete_"+i+"' style='float:right;margin-right:10px;font-size:10px;'>Delete</a><a style='display:block;margin-right:50px;' class='qlHL' href='"+unescape(q[i].split('|')[1])+"'>"+unescape(q[i].split('|')[0])+"</a>";
     }
     for(i=0;i<q.length;i++){
       document.getElementById('qlDelete_'+i).addEventListener('click',function(){deleteQuickLinks(this.id.split('_')[1],false);},false);
     }
   }else c.innerHTML='No QuickLinks Defined';
 }
}

function viewNotesId(n,t,e){
 function f(){viewNotes(n,t,e)}
 return f;
}

function saveQuickLinks(m){
 if(m){
   var x=prompt('Enter a title for this link.','');
   if(x==null || x=='') return;
   var u=prompt('Enter a URL for this link.',wlh);
   if(u==null || u=='') return;
   if(getSetting('quickLinksCust','')!='') setSetting('quickLinksCust',getSetting('quickLinksCust')+'|:|'+escape(x)+'|'+escape(u));
   else setSetting('quickLinksCust',escape(x)+'|'+escape(u));
   notify('Custom Link has been Saved');
 }else{
   var x=prompt('Enter a title for this link.\n\nEnter blank to use the coordinates on locations.','');
   if(x==null) return;
   if(x=='' && wlh.indexOf('map.aspx?loc=')!=-1 && wlh.match(/\w\d\d:\d\d:\d\d:\d\d/)!=null) x=/(\w\d\d:\d\d:\d\d:\d\d)/.exec(wlh)[1];
   if(x=='') return;
   if(getSetting('quickLinksTemp','')!='') setSetting('quickLinksTemp',getSetting('quickLinksTemp')+'|:|'+escape(x)+'|'+escape(wlh));
   else setSetting('quickLinksTemp',escape(x)+'|'+escape(wlh));
   notify('QuickLink has been Saved');
 }
 showQL(m);
}

function deleteQuickLinks(l,m){
 if(m){
   if(!confirm('Are you sure you want to delete this Custom Link?')) return;
   var q=getSetting('quickLinksCust').split('|:|');
   q.splice(l,1);
   setSetting('quickLinksCust',q.join('|:|'));
   notify('Custom Link has been Deleted');
 }else{
   if(!confirm('Are you sure you want to delete this QuickLink?')) return;
   var q=getSetting('quickLinksTemp').split('|:|');
   q.splice(l,1);
   setSetting('quickLinksTemp',q.join('|:|'));
   notify('QuickLink has been Deleted');
 }
 showQL(m);
}

function showQLData(a){
 document.getElementById('qlDiv').style.display='none';
 var t=a.split('_')[0],x,h,d,m;
 if(t=='base') x=getSetting('empireBaseData','').split('|:|')[a.split('_')[1]];
 else x=getSetting('data_'+t+'s','').split('|:|')[a.split('_')[1]];
 switch(t){
   case 'contact':{d="<a style='float:right;margin-right:12px;' href='/messages.aspx'>Inbox</a><a style='margin-left:20px;' href='/messages.aspx?msg="+x.split('|')[0]+"'>Send a Message</a>";m=unescape(x.split('|')[2]);h="/profile.aspx?player="+x.split('|')[0];break;}
   case 'base':{d="<div style='text-align:center;'><a href='/map.aspx?loc="+x.split('|')[2].split(':')[0]+"'>Galaxy</a> / <a href='/map.aspx?loc="+x.split('|')[2].split(':')[0]+':'+x.split('|')[2].split(':')[1]+"'>Region</a> / <a href='/map.aspx?loc="+x.split('|')[2].split(':')[0]+':'+x.split('|')[2].split(':')[1]+':'+x.split('|')[2].split(':')[2]+"'>System</a></div>";m="<a href='/map.aspx?loc="+x.split('|')[2]+"'>"+x.split('|')[2]+"</a>";h="/base.aspx?base="+x.split('|')[0];break;}
   case 'bookmark':{d="<div style='text-align:center;'><a href='/map.aspx?loc="+x.split('|')[0].split(':')[0]+"'>Galaxy</a> / <a href='/map.aspx?loc="+x.split('|')[0].split(':')[0]+':'+x.split('|')[0].split(':')[1]+"'>Region</a> / <a href='/map.aspx?loc="+x.split('|')[0].split(':')[0]+':'+x.split('|')[0].split(':')[1]+':'+x.split('|')[0].split(':')[2]+"'>System</a></div>";m=x.split('|')[0];h="/map.aspx?loc="+x.split('|')[0];break;}
   case 'occupation':{d="<div style='text-align:center;'><a href='/map.aspx?loc="+x.split('|')[2].split(':')[0]+"'>Galaxy</a> / <a href='/map.aspx?loc="+x.split('|')[2].split(':')[0]+':'+x.split('|')[2].split(':')[1]+"'>Region</a> / <a href='/map.aspx?loc="+x.split('|')[2].split(':')[0]+':'+x.split('|')[2].split(':')[1]+':'+x.split('|')[2].split(':')[2]+"'>System</a></div>";m="<a href='/map.aspx?loc="+x.split('|')[2]+"'>"+x.split('|')[2]+"</a>";h="/base.aspx?base="+x.split('|')[0];break;}
 }
 if(m=='') m='&nbsp;';
 var c=document.getElementById('qLData');
 c.style.display='block';
 c.innerHTML="<div style='text-align:center;margin:4px 0 6px 0;'><a href='"+h+"'>"+unescape(x.split('|')[1])+"</a><br>"+m+"</div><div>"+d+"</div><div style='margin-top:8px;' id='qlNotes'></div><div style='text-align:center;position:absolute;bottom:2px;left:0;width:100%;height:16px;'><a href='javascript:void(1);' onmousedown='document.getElementById(\"qLData\").style.display=\"none\";document.getElementById(\"qlDiv\").style.display=\"block\";' style='background:#000 none;border-top:1px solid #205680;display:block;padding:2px 4px;font-weight:500;font-size:11px;text-transform:capitalize;'>Close "+t+"</a></div>";
 var l=document.createElement('a');
 l.href='http://'+wlh.split('/')[2]+'/notes.aspx';
 l.setAttribute('style','padding:2px 3px 1px;border:0;font-size:12px;float:right;margin-right:12px;background:#081438 none;display:inline-block;');
 l.className='AETbut';
 l.innerHTML='View All Notes';
 document.getElementById('qlNotes').appendChild(l);
 l=document.createElement('input');
 l.type='button';
 l.setAttribute('style','font-size:12px;margin-left:30px;background:#000 none;display:inline-block;');
 l.className='AETbut';
 if(getSetting('note_'+t+'_'+x.split('|')[0],false)) l.value='View Notes';
 else l.value='Add Notes';
 l.addEventListener('click',function(){viewNotes('note_'+t+'_'+x.split('|')[0],unescape(x.split('|')[1]));},false);
 document.getElementById('qlNotes').appendChild(l);
}

function viewNotes(n,t,e){
 if(t=='') t=n.split('_')[2];
 var c=(document.getElementById('notePadDiv'))?document.getElementById('notePadDiv'):document.createElement('div');
 c.setAttribute('id','notePadDiv');
 c.setAttribute('style',"z-index:10;position:fixed;top:139px;left:"+((document.body.offsetWidth/2)-301)+";border:1px solid #FF6464;background:rgba(0,0,0,.7) none;width:600px;margin:0 auto;");
 c.innerHTML="<input type='button' class='AETbut' style='display:inline-block;padding-bottom:1px;margin:10px;float:right;font-size:11px;' onclick='document.getElementById(\"notePadDiv\").parentNode.removeChild(document.getElementById(\"notePadDiv\"));' value='Close'><div style='margin-top:10px;text-align:center;font:italic 900 16px verdana,tahoma,arial,sans-serif;'><span style='background:#000 none;'>"+t+"</span></div><textarea id='notePad' style='width:550px;margin:0 24px;padding:6px;'></textarea><div id='notePadSave' style='text-align:center;margin:8px 100px 12px 0;'></div>";
 if(!document.getElementById('notePadDiv')){
   if(document.getElementById('quicklinksD')) document.getElementById('quicklinksD').insertBefore(c,document.getElementById('quicklinksD').firstChild);
   else document.body.insertBefore(c,document.evaluate("//table[@class='top']",document,null,9,null).singleNodeValue);
 }
 if(n) document.getElementById('notePad').value=unescape(getSetting(n,'').split('|')[0]);
 else document.getElementById('notePad').value=doCopyBaseData(t);
 var a=document.createElement('input');
 a.type='button';
 a.setAttribute('style','font-size:12px;font-weight:900;padding-bottom:1px;display:inline-block;margin-right:30px;');
 a.className='AETbut';
 document.getElementById('notePadSave').appendChild(a);
 if(getSetting(n,false)){
  if(e){
   a.value='Save Note';
   a.addEventListener('click',function(){if(document.getElementById('notePad').value==''){if(!confirm('Are you sure you want to delete this note?')) return;setSetting(n,'');notify('Note has been Deleted');}else{setSetting(n,escape(document.getElementById('notePad').value)+'|'+escape(t));notify('Note has been Saved');}quickNotes();if(document.getElementById('notePadDiv')) viewNotes(n,t,false);},false);
   document.getElementById('notePad').style.borderWidth='1px';
   document.getElementById('notePad').style.backgroundColor='#006';
   a=document.createElement('input');
   a.type='button';
   a.setAttribute('style','display:inline-block;padding:2px 4px;margin-left:30px;font-size:11px;');
   a.className='AETbut';
   a.value='Delete';
   document.getElementById('notePadSave').appendChild(a);
   a.addEventListener('click',function(){if(!confirm('Are you sure you want to delete this note?')) return;document.getElementById('notePad').value='';setSetting(n,'');notify('Note has been Deleted');quickNotes();if(document.getElementById('notePadDiv')) viewNotes(n,t,false);},false);
  }else{
   a.value='Edit Note';
   a.addEventListener('click',function(){viewNotes(n,t,true);},false);
   document.getElementById('notePad').style.borderWidth='0 0 1px 0';
   document.getElementById('notePad').style.backgroundColor='#000';
   document.getElementById('notePad').setAttribute('readOnly',true);
  }
  document.getElementById('notePad').style.height=(document.getElementById('notePad').scrollHeight+30)+'px';
 }else if(n){
  a.value='Add Note';
  a.addEventListener('click',function(){if(document.getElementById('notePad').value==''){notify('Note has not been saved');}else{setSetting(n,escape(document.getElementById('notePad').value)+'|'+escape(t));notify('Note has been Saved');}quickNotes();if(document.getElementById('notePadDiv')) viewNotes(n,t,false);},false);
  document.getElementById('notePad').style.height='250px';
 }else{
  a.value='Select All';
  a.addEventListener('click',function(){document.getElementById('notePad').select();},false);
  a=document.createElement('input');
  a.type='button';
  a.id=t;
  a.value='Save as Note';
  a.addEventListener('click',function(){setSetting('note_'+((wlh.split('base=')[1])?('base_'+wlh.split('base=')[1].split('&')[0]):('location_'+wlh.split('loc=')[1].split('&')[0])),escape(document.getElementById('notePad').value)+'|'+escape(this.id));notify('Note has been Saved');quickNotes();},false);
  a.setAttribute('style','font-size:12px;font-weight:900;padding-bottom:1px;display:inline-block;margin-right:30px;');
  a.className='AETbut';
  document.getElementById('notePadSave').appendChild(a);
  document.getElementById('notePad').style.height='300px';
 }
 document.getElementById('notePad').focus();
}

function quickNotes(){
 if(!document.getElementById('notes_list')) return;
 var c;
 if(document.getElementById('allNotes')) c=document.getElementById('allNotes');
 else{
   document.getElementById('notes_list').firstChild.childNodes[1].firstChild.appendChild(document.createElement('div'));
   c=document.getElementById('notes_list').firstChild.childNodes[1].firstChild.lastChild;
 }
 GM_addStyle('.hidePre DIV.pc {margin:0 0 12px 20px;display:none;vertical-align:top;}.showPre DIV.pc {margin:0 0 12px 20px;display:inline-block;vertical-align:top;}#qnContainer PRE {font:11px verdana,tahoma,arial,sans-serif;}');
 c.setAttribute('style','text-align:center;border-top:1px solid #99F;margin:20px 10%;');
 c.setAttribute('id','allNotes');
 var n=GM_listValues(),l='',b='',o='',p='',g='',m='',k='',i=0,x='';
 for(i;i<n.length;i++){
   if(n[i].split('_')[0]!=wlh.split('.')[0].split('/')[2] || n[i].split('_')[1]!='note') continue;
   x=GM_getValue(n[i]);
   switch(n[i].split('_')[2]){
     case 'location':{l+="<div><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:30px;' id='qns"+i+"'>Show</a><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:10px;' id='qne"+i+"'>Edit</a><a href='/map.aspx?loc="+n[i].split('_')[3]+"'>"+unescape(x.split('|')[1])+"</a><div class='pc' id='qnc"+i+"'><pre style='max-width:620px;;margin:0;padding:0;white-space:pre-wrap;word-wrap:break-word;'>"+unescape(x.split('|')[0])+'</pre></div></div>';break;}
     case 'base':{b+="<div><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:30px;' id='qns"+i+"'>Show</a><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:10px;' id='qne"+i+"'>Edit</a><a href='/base.aspx?base="+n[i].split('_')[3]+"'>"+unescape(x.split('|')[1])+"</a><div class='pc' id='qnc"+i+"'><pre style='max-width:620px;;margin:0;padding:0;white-space:pre-wrap;word-wrap:break-word;'>"+unescape(x.split('|')[0])+'</pre></div></div>';break;}
     case 'occupation':{o+="<div><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:30px;' id='qns"+i+"'>Show</a><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:10px;' id='qne"+i+"'>Edit</a><a href='/base.aspx?base="+n[i].split('_')[3]+"'>"+unescape(x.split('|')[1])+"</a><div class='pc' id='qnc"+i+"'><pre style='max-width:620px;;margin:0;padding:0;white-space:pre-wrap;word-wrap:break-word;'>"+unescape(x.split('|')[0])+'</pre></div></div>';break;}
     case 'contact':{p+="<div><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:30px;' id='qns"+i+"'>Show</a><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:10px;' id='qne"+i+"'>Edit</a><a href='/profile.aspx?player="+n[i].split('_')[3]+"'>"+unescape(x.split('|')[1])+"</a><div class='pc' id='qnc"+i+"'><pre style='max-width:620px;;margin:0;padding:0;white-space:pre-wrap;word-wrap:break-word;'>"+unescape(x.split('|')[0])+'</pre></div></div>';break;}
     case 'guild':{g+="<div><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:30px;' id='qns"+i+"'>Show</a><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:10px;' id='qne"+i+"'>Edit</a><a href='/guild.aspx?guild="+n[i].split('_')[3]+"'>"+unescape(x.split('|')[1])+"</a><div class='pc' id='qnc"+i+"'><pre style='max-width:620px;;margin:0;padding:0;white-space:pre-wrap;word-wrap:break-word;'>"+unescape(x.split('|')[0])+'</pre></div></div>';break;}
     case 'bookmark':{m+="<div><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:30px;' id='qns"+i+"'>Show</a><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:10px;' id='qne"+i+"'>Edit</a><a href='/map.aspx?loc="+n[i].split('_')[3]+"'>"+unescape(x.split('|')[1])+"</a><div class='pc' id='qnc"+i+"'><pre style='max-width:620px;;margin:0;padding:0;white-space:pre-wrap;word-wrap:break-word;'>"+unescape(x.split('|')[0])+'</pre></div></div>';break;}
     case 'custom':{k+="<div><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:30px;' id='qns"+i+"'>Show</a><a href='javascript:void(1);' style='float:left;position:relative;left:-30px;font-size:11px;margin-right:10px;' id='qne"+i+"'>Edit</a><a href='"+unescape(n[i].split('_')[3])+"'>"+unescape(x.split('|')[1])+"</a><div class='pc' id='qnc"+i+"'><pre style='max-width:620px;;margin:0;padding:0;white-space:pre-wrap;word-wrap:break-word;'>"+unescape(x.split('|')[0])+'</pre></div></div>';break;}
   }
 }
 var h="<div class='th_header2 dropcap'>AE Tools QuickNotes</div><div style='text-align:left;' id='qnContainer'>";
 if(l!='') h+="<div style='border-bottom:1px solid #004;' class='th_header2 dropcap'>Locations - <span style='cursor:pointer;color:gold;padding:0 2px;' onclick='document.getElementById(\"preLoc\").className=(document.getElementById(\"preLoc\").className==\"showPre\")?\"hidePre\":\"showPre\";'>Â±</span></div><div id='preLoc' class='hidePre' style='margin:0 40px;'>"+l+'</div>';
 if(b!='') h+="<div style='border-bottom:1px solid #004;' class='th_header2 dropcap'>Bases - <span style='cursor:pointer;color:gold;padding:0 2px;' onclick='document.getElementById(\"preBas\").className=(document.getElementById(\"preBas\").className==\"showPre\")?\"hidePre\":\"showPre\";'>Â±</span></div><div id='preBas' class='hidePre' style='margin:0 40px;'>"+b+'</div>';
 if(o!='') h+="<div style='border-bottom:1px solid #004;' class='th_header2 dropcap'>Occupations - <span style='cursor:pointer;color:gold;padding:0 2px;' onclick='document.getElementById(\"preOcc\").className=(document.getElementById(\"preOcc\").className==\"showPre\")?\"hidePre\":\"showPre\";'>Â±</span></div><div id='preOcc' class='hidePre' style='margin:0 40px;'>"+o+'</div>';
 if(p!='') h+="<div style='border-bottom:1px solid #004;' class='th_header2 dropcap'>Players - <span style='cursor:pointer;color:gold;padding:0 2px;' onclick='document.getElementById(\"preCon\").className=(document.getElementById(\"preCon\").className==\"showPre\")?\"hidePre\":\"showPre\";'>Â±</span></div><div id='preCon' class='hidePre' style='margin:0 40px;'>"+p+'</div>';
 if(g!='') h+="<div style='border-bottom:1px solid #004;' class='th_header2 dropcap'>Guilds - <span style='cursor:pointer;color:gold;padding:0 2px;' onclick='document.getElementById(\"preGui\").className=(document.getElementById(\"preGui\").className==\"showPre\")?\"hidePre\":\"showPre\";'>Â±</span></div><div id='preGui' class='hidePre' style='margin:0 40px;'>"+g+'</div>';
 if(m!='') h+="<div style='border-bottom:1px solid #004;' class='th_header2 dropcap'>Bookmarks - <span style='cursor:pointer;color:gold;padding:0 2px;' onclick='document.getElementById(\"preBoo\").className=(document.getElementById(\"preBoo\").className==\"showPre\")?\"hidePre\":\"showPre\";'>Â±</span></div><div id='preBoo' class='hidePre' style='margin:0 40px;'>"+m+'</div>';
 if(k!='') h+="<div style='border-bottom:1px solid #004;' class='th_header2 dropcap'>Custom Links - <span style='cursor:pointer;color:gold;padding:0 2px;' onclick='document.getElementById(\"preCus\").className=(document.getElementById(\"preCus\").className==\"showPre\")?\"hidePre\":\"showPre\";'>Â±</span></div><div id='preCus' class='hidePre' style='margin:0 40px;'>"+k+'</div>';
 if(x=='') h+='0 QuickNotes to display.';
 h+="</div>";
 c.innerHTML=h;
 for(i=0;i<n.length;i++){
   if(n[i].split('_')[0]!=wlh.split('.')[0].split('/')[2] || n[i].split('_')[1]!='note') continue;
   x=unescape(GM_getValue(n[i]).split('|')[1]);
   document.getElementById('qns'+i).addEventListener('click',function(){var a=this.id.split('qns')[1];if(document.getElementById('qnc'+a).style.display=='inline-block'){document.getElementById('qnc'+a).style.display='';this.textContent='Show';}else{document.getElementById('qnc'+a).style.display='inline-block';this.textContent='Hide';}},false);
   document.getElementById('qne'+i).addEventListener('click',viewNotesId(n[i].substr(n[i].indexOf('_')+1),x,true),false);
 }
}

function saveContacts(){
 if(!document.getElementById('contacts-table')) return;
 var c=document.getElementById('contacts-table').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[1].childNodes;
 var a='',l;
 for(var i=0;i<c.length;i++){
   if(c[i].childNodes[1].firstChild.href){
     a+="|:|"+c[i].childNodes[1].firstChild.href.split('=')[1]+"|"+escape(c[i].childNodes[1].firstChild.innerHTML)+"|"+escape(c[i].childNodes[3].firstChild.value);
     l=document.createElement('a');
     l.href='javascript:void(1)';
     l.innerHTML='Notes';
     l.style.fontSize='11px';
     l.id='note_contact_'+c[i].childNodes[0].innerHTML+'|'+escape(c[i].childNodes[1].firstChild.innerHTML);
     c[i].childNodes[2].style.whiteSpace='nowrap';
     c[i].childNodes[2].innerHTML+=" - ";
     c[i].childNodes[2].appendChild(l);
     if(getSetting('note_contact_'+c[i].childNodes[0].innerHTML,false)) c[i].childNodes[2].appendChild(document.createTextNode("*"));
     l.addEventListener('click',function(){viewNotes(this.id.split('|')[0],unescape(this.id.split('|')[1]),false);},false);
   }
 }
 if(a!='') a=a.substr(3);
 setSetting('data_contacts',a);
}

function saveBookmarks(){
 if(!document.getElementById('bookmarks-table')) return;
 var c=(document.getElementById('bookmarks-table').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[1])?document.getElementById('bookmarks-table').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[1].childNodes:[];
 var a='',l;
 for(var i=0;i<c.length;i++){
   if(c[i].childNodes[0].firstChild.href){
     a+="|:|"+c[i].childNodes[0].firstChild.innerHTML+"|"+escape(c[i].childNodes[1].firstChild.value);
     l=document.createElement('a');
     l.href='javascript:void(1)';
     l.innerHTML='Notes';
     l.style.fontSize='11px';
     l.id='note_bookmark_'+c[i].childNodes[0].textContent+'|'+((c[i].childNodes[1].firstChild.value!='')?escape(c[i].childNodes[1].firstChild.value):c[i].childNodes[0].textContent);
     c[i].childNodes[0].style.whiteSpace='nowrap';
     c[i].childNodes[0].innerHTML+=" - ";
     c[i].childNodes[0].appendChild(l);
     if(getSetting('note_bookmark_'+c[i].childNodes[0].firstChild.textContent,false)) c[i].childNodes[0].appendChild(document.createTextNode("*"));
     l.addEventListener('click',function(){viewNotes(this.id.split('|')[0],unescape(this.id.split('|')[1]),false);},false);
   }
 }
 if(a!='') a=a.substr(3);
 setSetting('data_bookmarks',a);
}

function saveOccupations(){
 if(!document.getElementById('empire_economy_occupied')) return;
 var c=(document.getElementById('empire_economy_occupied').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[1])?document.getElementById('empire_economy_occupied').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[1].childNodes:[];
 var a='',l;
 for(var i=0;i<c.length;i++){
   if(c[i].childNodes[0].firstChild && c[i].childNodes[0].firstChild.href){
     a+="|:|"+c[i].childNodes[0].firstChild.href.split('=')[1]+"|"+escape(c[i].childNodes[0].firstChild.innerHTML)+"|"+c[i].childNodes[1].firstChild.innerHTML;
     l=document.createElement('a');
     l.href='javascript:void(1)';
     l.innerHTML='Notes';
     l.style.fontSize='11px';
     l.id='note_occupation_'+c[i].childNodes[0].firstChild.href.split('=')[1]+'|'+escape(c[i].childNodes[0].textContent);
     c[i].childNodes[1].style.whiteSpace='nowrap';
     c[i].childNodes[1].insertBefore(document.createTextNode(" - "),c[i].childNodes[1].firstChild);
     c[i].childNodes[1].insertBefore(l,c[i].childNodes[1].firstChild);
     if(getSetting('note_occupation_'+c[i].childNodes[0].firstChild.href.split('=')[1],false)) c[i].childNodes[1].insertBefore(document.createTextNode("*"),c[i].childNodes[1].firstChild);
     l.addEventListener('click',function(){viewNotes(this.id.split('|')[0],unescape(this.id.split('|')[1]),false);},false);
   }
 }
 if(a!='') a=a.substr(3);
 setSetting('data_occupations',a);
}

function addNoteLinks(){
 var c,i=1,l,x=1;
 if(document.getElementById('empire_events')){c=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;}
 else if(document.getElementById('bases_list')){c=document.getElementById('bases_list').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;i=0;}
 else if(document.getElementById('guild_members')){
   c=document.getElementById('guild_members').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
   for(i=0;i<c.length;i++){
     l=document.createElement('a');
     l.href='javascript:void(1)';
     l.innerHTML='Notes';
     l.style.fontSize='11px';
     l.id='note_contact_'+c[i].childNodes[0].innerHTML+'|'+escape(c[i].childNodes[2].textContent);
     c[i].childNodes[0].style.whiteSpace='nowrap';
     c[i].childNodes[0].insertBefore(document.createTextNode(" - "),c[i].childNodes[0].firstChild);
     c[i].childNodes[0].insertBefore(l,c[i].childNodes[0].firstChild);
     if(getSetting('note_contact_'+c[i].childNodes[2].firstChild.href.split('=')[1],false)) c[i].childNodes[0].insertBefore(document.createTextNode("*"),c[i].childNodes[0].firstChild);
     l.addEventListener('click',function(){viewNotes(this.id.split('|')[0],unescape(this.id.split('|')[1]),false);},false);
   }
   if(document.getElementById('profile_show')){
     var g=/<br><b>Tag:<\/b> ([^<]+) <br><br><b>Guild/.exec(document.getElementById('profile_show').innerHTML);
     var d=/guilds\/(\d+)_\d+\.[gjp]/.exec(document.getElementById('profile_show').innerHTML);
     if(!g || !d) return;
     x=document.getElementById('profile_show').firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[1];
     l=document.createElement('a');
     l.href='javascript:void(1)';
     l.innerHTML='Notes';
     l.style.fontSize='11px';
     l.id='note_guild_'+d[1]+'|'+escape(g[1]+' '+x.innerHTML);
     x.insertBefore(document.createTextNode(" - "),x.firstChild);
     x.insertBefore(l,x.firstChild);
     if(getSetting('note_guild_'+d[1],false)) x.insertBefore(document.createTextNode("*"),x.firstChild);
     l.addEventListener('click',function(){viewNotes(this.id.split('|')[0],unescape(this.id.split('|')[1]),false);},false);
   }
   return;
 }else if(document.getElementById('profile_show')){
     var g=/<br><b>Player:<\/b> (\d+)<br><br><b>/.exec(document.getElementById('profile_show').innerHTML);
     if(!g || !g[1]) return;
     var x=document.getElementById('profile_show').firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[1];
     l=document.createElement('a');
     l.href='javascript:void(1)';
     l.innerHTML='Notes';
     l.style.fontSize='11px';
     l.id='note_contact_'+g[1]+'|'+escape(x.innerHTML);
     x.insertBefore(document.createTextNode(" - "),x.firstChild);
     x.insertBefore(l,x.firstChild);
     if(getSetting('note_contact_'+g[1],false)) x.insertBefore(document.createTextNode("*"),x.firstChild);
     l.addEventListener('click',function(){viewNotes(this.id.split('|')[0],unescape(this.id.split('|')[1]),false);},false);
     return;
 } else return;
 for(i;i<c.length;i=i+x){
   if(c[i].childNodes[0].firstChild==null) continue;
   l=document.createElement('a');
   l.href='javascript:void(1)';
   l.innerHTML='Notes';
   l.style.fontSize='11px';
   l.id='note_base_'+c[i].childNodes[0].firstChild.href.split('=')[1]+'|'+escape(c[i].childNodes[0].textContent);
   c[i].childNodes[1].style.whiteSpace='nowrap';
   c[i].childNodes[1].insertBefore(document.createTextNode(" - "),c[i].childNodes[1].firstChild);
   c[i].childNodes[1].insertBefore(l,c[i].childNodes[1].firstChild);
   if(getSetting('note_base_'+c[i].childNodes[0].firstChild.href.split('=')[1],false)) c[i].childNodes[1].insertBefore(document.createTextNode("*"),c[i].childNodes[1].firstChild);
   l.addEventListener('click',function(){viewNotes(this.id.split('|')[0],unescape(this.id.split('|')[1]),false);},false);
 }
}

function addNoteLoc(){
 if(wlh.indexOf('?')==-1 || (wlh.split('?')[1].split(':')[1]==undefined && wlh.indexOf('map.aspx?')!=-1)) return;
 var a=document.evaluate("//a[contains(@href,'bookmarks.aspx?action=add')]",document,null,9,null).singleNodeValue;
 var l=document.createElement('a');
 if(a){
   a=a.parentNode.parentNode;
   if(getSetting('config_insertMoveDefault',true)) l.setAttribute('style','position:relative;top:7px;margin-left:16px;');
   else a.appendChild(document.createTextNode(' - '));
   l.id='note_location_'+wlh.split('=')[1]+'|';
   a.appendChild(l);
   if(getSetting('note_location_'+wlh.split('=')[1],false)){
     var s=document.createElement('span');
     s.innerHTML='*';
     s.setAttribute('style','position:relative;top:7px;');
     a.appendChild(s);
   }
 }else{
   a=document.evaluate("//table[@class='base']",document,null,9,null).singleNodeValue;
   if(a){
     a=a.firstChild.firstChild.childNodes[1];
     l.id='note_base_'+wlh.split('=')[1]+'|'+escape(a.firstChild.textContent);
     a.insertBefore(document.createTextNode(' - '),a.childNodes[1]);
     a.insertBefore(l,a.childNodes[2]);
     if(getSetting('note_base_'+wlh.split('=')[1],false)) a.insertBefore(document.createTextNode('*'),a.childNodes[3]);
   }else return;
 }
 l.href='javascript:void(1);';
 l.innerHTML='Notes';
 l.style.fontSize='11px';
 l.addEventListener('click',function(){viewNotes(this.id.split('|')[0],unescape(this.id.split('|')[1]),false);},false);
}

/**** Max Width ****/
function adjustMaxWidth(){
 var t = document.getElementsByTagName('table');
 for(var i=0;i<t.length;i++){
   if(t[i].width=='1000') t[i].width='100%';
 }
 document.body.style.padding=getSetting('config_paddingTop','10')+"px "+getSetting('config_paddingRight','10')+"px "+getSetting('config_paddingBottom','10')+"px "+getSetting('config_paddingLeft','10')+"px";
 document.body.style.margin=0;
}

/**** Empire menu ****/
function insertEmpireMenu(){
 var t = document.evaluate("//table[@class='top']",document,null,9,null).singleNodeValue;
 if(!t) return;
 var c = document.createElement('table');
 c.setAttribute('id','empire_menu');
 c.setAttribute('style','margin:0 auto;width:'+t.getAttribute("width")+';height:25px;');
 c.setAttribute('class','header');
 c.innerHTML = '<tr><th id="bases_production"><a href="empire.aspx?view=bases_production">Production</a></th><th id="bases_capacities"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th id="economy"><a href="empire.aspx?view=economy">Economy</a></th><th id="trade"><a href="empire.aspx?view=trade">Trade</a></th><th id="structures"><a href="empire.aspx?view=structures">Structures</a></th><th id="fleets"><a href="empire.aspx?view=fleets">Fleets</a></th><th id="units"><a href="empire.aspx?view=units">Units</a></th><th id="technologies"><a href="empire.aspx?view=technologies">Technologies</a></th><th id="scanners"><a href="empire.aspx?ch=1&view=scanners">Scanners</a></th></tr>';
 t.parentNode.insertBefore(c,t.nextSibling);
 t.parentNode.insertBefore(document.createElement('br'),c);
 if(wlh.indexOf('empire.aspx')!=-1){
  t.parentNode.removeChild(c.nextSibling);
  t.parentNode.removeChild(c.nextSibling);
  t.parentNode.removeChild(c.nextSibling);
 }
}

/**** count down timers ****/
function addFinishTimes(){
 var y,c,h,d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],f=new Date(),s=getSetting('config_finishTimesSingleLine',false);
 if(getSetting('config_finishTimesServer',false)) var now=getDateObject();
 else var now=new Date();
 if(wlh.indexOf("empire.aspx")!=-1) c = document.getElementsByTagName('span');
 else c=document.getElementsByTagName('td');
 for(var i=0;i<c.length;i++){
   if(c[i].id.indexOf('time')==-1 || !parseInt(c[i].title)>0 || !c[i].title) continue;
   f.setTime(now.getTime() + (c[i].title * 1000));
   if(f.getTime()-now.getTime()<3600000){
     h='';
     y='color:'+unescape(getSetting('config_highlightNowColor','#F99'))+';';
   }else if(f.getTime()-now.getTime()<86400000){
     h='';
     y='color:'+unescape(getSetting('config_highlightTodayColor','#7896DE'))+';';
   }else if(f.getDate()-now.getDate()==1 && !s){
     h='Tomorrow @ ';
     y='';
   }else if(getSetting('config_timesServerFormat',false)){
     h=getDateString(f).split(' ')[0]+' ';
     y='';
   }else{
     h = d[f.getDay()]+' '+f.getDate()+' @ ';
     y='';
   }
   if(getSetting('config_24hourDisplay',false)) h+=f.getHours()+':'+zeroPad(f.getMinutes())+':'+zeroPad(f.getSeconds());
   else{
     if(f.getHours()>=12){
       if(f.getHours()>12) f.setHours(f.getHours()-12);
       h+=f.getHours()+':'+zeroPad(f.getMinutes())+':'+zeroPad(f.getSeconds())+' pm';
     }else{
       if(f.getHours()==0) f.setHours(12);
       h+=f.getHours()+':'+zeroPad(f.getMinutes())+':'+zeroPad(f.getSeconds())+' am';
     }
   }
   c[i].innerHTML='<div id="'+c[i].id+'" style="display:inline;color:'+unescape(getSetting('config_highlightTimeColor','#88CCAA'))+';" title="'+c[i].title+'">-</div>'+((s)?' ':'<br>')+'<div style="display:inline;color:'+unescape(getSetting('config_highlightFinishColor','#DDDDBF'))+';white-space:nowrap;'+y+'">'+h+'</div>';
   c[i].id = "checked";
   if(s) c[i].style.whiteSpace='nowrap';
   if(wlh.indexOf("empire.aspx")!=-1) c[i].parentNode.style.padding='2px';
   if(c[i].parentNode.tagName.toUpperCase()=='TR') c[i].parentNode.firstChild.style.whiteSpace='nowrap';
 }
}

/****************
 Numbers Format
****************/
function formatScanners(){
 if(!document.getElementById('empire_scanners')) return;
 var c = document.getElementById('empire_scanners').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 var t=0,i=0;
 for(i;i<c.length;i++){
  t += parseInt(cleanNumbers(c[i].childNodes[4].firstChild.innerHTML));
  c[i].childNodes[4].firstChild.innerHTML = commaFormat(c[i].childNodes[4].firstChild.innerHTML);
 }
 if(getSetting('config_scannerHighlight',true)){
  checkEmpireDataAge();
  if(getSetting('empireBaseData',null)!=null){
   var a=getSetting('empireBaseData');
   for(i=0;i<c.length;i++){
    if(a.indexOf(c[i].childNodes[2].firstChild.href.split('=')[1])!=-1) c[i].style.backgroundColor='#600';
    else if(a.indexOf(c[i].childNodes[2].firstChild.href.split('=')[1].split(':')[0]+':'+c[i].childNodes[2].firstChild.href.split('=')[1].split(':')[1]+':'+c[i].childNodes[2].firstChild.href.split('=')[1].split(':')[2])!=-1) c[i].style.backgroundColor='#740';
   }
  }
 }
 if(!getSetting('config_scannerTotals',true)) return;
 var r = document.createElement('tr');
 var d = document.createElement('td');
 d.setAttribute("colspan","4");
 d.setAttribute("align","right");
 d.innerHTML = "<br>Total fleet moving in your base regions:";
 r.appendChild(d);
 d = document.createElement('td');
 d.setAttribute("align","center");
 d.innerHTML = "<br>"+commaFormat(t);
 r.appendChild(d);
 c[0].parentNode.appendChild(r);
}

function commaFormat(s){
 if(getSetting('config_formatNumbers',true)){
   s=cleanNumbers(s);
   s = ""+s;
   var a = s.split(unescape(getSetting('config_numberDecimal','.')),2)
   var d = a[1];
   var i = parseInt(a[0]);
   if(isNaN(i)) return '';
   var minus = '';
   if(i<0) minus = '-';
   i=Math.abs(i);
   var n=new String(i);
   var a=[];
   while(n.length>3){
     var nn = n.substr(n.length-3);
     a.unshift(nn);
     n=n.substr(0,n.length-3);
   }
   if(n.length>0){a.unshift(n);}
   n=a.join(unescape(getSetting('config_numberDelimeter',",")));
   if(d==undefined || d.length<1){s=n;}
   else {s=n+'.'+d;}
   s=minus+s;
 }
 return s;
}

/**** Depart Time & reminders ****/
function insertArriveTimeTextBox(){
 var c = document.evaluate("//input[@value='Move']",document,null,9,null).singleNodeValue;
 if(c==null) return;
 else c=c.parentNode.parentNode.nextSibling.firstChild;
 var a = document.createElement('span');
 a.setAttribute("style","font:500 13px tahoma,arial,sans-serif;color:"+unescape(getSetting('config_highlightFinishColor',"#DDDDBF"))+";");
 a.innerHTML="Arrival Time -&raquo;";
 c.appendChild(a);
 a = document.createElement("input");
 a.setAttribute("class","quant");
 a.setAttribute("type","text");
 a.setAttribute("style","width:160px;margin-top:5px;margin-bottom:5px;");
 a.setAttribute("id","arrivalTime");
 a.value=getCurrentServerTime();
 c.appendChild(a);
 a = document.createElement("input");
 a.setAttribute("value","Calculate Depart Time");
 a.setAttribute("type","button");
 a.setAttribute("id","calculateButton");
 a.setAttribute("style","margin-left:5px;margin-top:5px;margin-bottom:5px;");
 c.appendChild(a);
 a.addEventListener("click",function(){getLaunchTime();},false);
 a = document.createElement("span");
 a.setAttribute("id","departDateSpan");
 c.appendChild(a);
}

function getLaunchTime(){
 try{
   var d = document.getElementById('duration').textContent;
   if(d =="") throw "No duration. Set fleet and destination.";
   var l = new Date();
   l.setTime(getDateObject(document.getElementById('arrivalTime').value).getTime()-(getSeconds(d)*1000));
   d = (zeroPad(l.getDate()) +"-"+ zeroPad(l.getMonth()+1) +"-"+ l.getFullYear() +" "+ zeroPad(l.getHours()) +":"+ zeroPad(l.getMinutes()) +":"+ zeroPad(l.getSeconds()));
   document.getElementById("departDateSpan").innerHTML = "<br><span style='font:500 13px vardana,tahoma,arial,sans-serif;'>Depart Time -&raquo; </span><span>"+d+'</span>';
   if(getSetting('config_fleetReminders',true)){
     if(document.getElementById("setReminder")) document.getElementById("setReminder").parentNode.removeChild(document.getElementById("setReminder"));
     var b = document.createElement("input");
     b.setAttribute("id","setReminder");
     b.setAttribute("type","button");
     b.setAttribute("value","Set Reminder");	
     b.setAttribute("style","margin-left:8px;");
     document.getElementById("departDateSpan").parentNode.appendChild(b);
     b.addEventListener("click",function(){if(getSetting('mv_p_'+wlh.split('=')[1].split('&')[0],'')!='' && confirm("You have a move preset for this fleet.\nDo you want to launch the fleet automatically?\n\nClick 'OK' to launch the preset fleet when the launch reminder reaches 0.\n\nClick 'Cancel' to just set a reminder.")){setSetting("FleetReminders",l.getTime().toString()+'|'+wlh.split('=')[1].split('&')[0]);notify("Auto Launch is set");}else{setSetting("FleetReminders",l.getTime().toString());notify("Launch reminder set");}window.location.reload();return;},false);
   }
 }catch(e){notify(e,"notifierError");return;}
}

function insertFleetReminderCountdowns(){
 var a=document.body.firstChild;
 if(getSetting('config_scrollTopBot',true)) a=document.body.childNodes[2];
 var t = new Date();
 t.setTime(parseInt(getSetting("FleetReminders").split('|')[0]));
 var r=(parseInt(getSetting("FleetReminders").split('|')[0])-getDateObject().getTime())/1000;
 if(r>0){
   a.style.whiteSpace='nowrap';
   var c = (document.getElementById('fleetReminderDiv'))?document.getElementById('fleetReminderDiv'):document.createElement("div");
   c.setAttribute('id','fleetReminderDiv');
   c.setAttribute('style','padding:0 6px;background:#000 none;border:1px solid #205680;border-top-color:#000;position:absolute;top:'+((getSetting('config_addLocalTime',true))?37:30)+'px;left:'+((document.body.clientWidth/2)-200)+';font:500 11px verdana,tahoma,arial,sans-serif;color:'+unescape(getSetting('config_highlightFinishColor',"#DDDDBF"))+';');
   c.innerHTML = "<blink style='color:"+unescape(getSetting('config_highlightNowColor',"#F99"))+";'>"+((getSetting("FleetReminders").split('|')[1]!=null)?'AutoLaunch':'Launch Reminder')+"</blink>: "+getDateString(t)+" in <span style='font-weight:900;' title='Time Remaining' id='timeFleetReminder'>-</span> &raquo;<a href='javascript:void(1);'>Cancel</a>";
   a.appendChild(c);
   c.lastChild.addEventListener('click',function(){setSetting("FleetReminders","-");a.removeChild(a.lastChild);},false);
   fleetReminderCountdown(r);
 }else launchAlert();
}

function fleetReminderCountdown(r){
 if(!document.getElementById('timeFleetReminder')) return;
 var s=parseInt(r)-((new Date().getTime()-parseInt(document.getElementById('pageLoadTime').innerHTML))/1000);
 if(s<1){
   document.getElementById('timeFleetReminder').innerHTML="Launch";
   launchAlert();
   return;
 }
 if(s<60) document.getElementById('timeFleetReminder').style.color=unescape(getSetting('config_highlightNowColor',"#F99"));
 else if(s<3600) document.getElementById('timeFleetReminder').style.color=unescape(getSetting('config_highlightTodayColor',"#7896DE"));
 document.getElementById('timeFleetReminder').innerHTML=getTimeDisplay(s);
 setTimeout(function(){fleetReminderCountdown(r);},1000);
}

function launchAlert(){
 var f=getSetting('FleetReminders','-');
 if(f=='-') return;
 if(f.indexOf('|')!=-1){
  f=f.split('|')[1];
  if(f && getSetting('mv_p_'+f,'')!='') setSetting('auto_'+f,true);
  if(wlh.split('/')[3]=='fleet.aspx?fleet='+f+'&view=move') window.location.reload();
  else window.location.href='http://'+wlh.split('.')[0].split('/')[2]+'.astroempires.com/fleet.aspx?fleet='+f+'&view=move';
 }else alert('Fleet Reminder\n\n    LAUNCH\n\n');
 setSetting("FleetReminders","-");
}

function enablePresetData(){
 if(!document.getElementById('fleets-list')) return;
 var c=document.getElementById('fleets-list').firstChild.firstChild.firstChild;
 var a=document.createElement('a');
 a.setAttribute('style','font-weight:500;font-size:11px;float:right;position:relative;top:4px;left:-12px;');
 a.href='javascript:void(1);';
 a.id='viewPD';
 a.innerHTML='View Preset Data';
 c.appendChild(a);
 a.addEventListener('click',function(){showPresetData();},false);
}

function showPresetData(){
 if(!document.getElementById('fleets-list')) return;
 if(document.getElementById('presetData')){
   document.body.removeChild(document.getElementById('presetData'));
   document.getElementById('viewPD').innerHTML='View Preset Data';
 }else{
   var c=document.createElement('table'),d=[],x=1,y=true,h="<tr><th style='border:0;' colspan=5>Preset Data</th></tr><tr><th style='border:0;' width='20%'>X</th><th style='border:0;' width='20%'>Fleet</th><th style='border:0;' width='20%'>Destination</th><th style='border:0;' width='20%'>Fleet Selected</th><th style='border:0;'>Auto Move Time</th></tr>",r='';
   c.width='90%';
   c.id='presetData';
   c.setAttribute('style','margin:0 auto -'+unescape(getSetting('config_overrideBorderSize','2'))+'px auto;background-color:rgba(0,0,0,.4);border-spacing:6px;border-bottom-color:transparent;border-collapse:separate;');
   if(getSetting('FleetReminders','-')!='-' && getSetting('FleetReminders').split('|')[1]!=null){
     var t = new Date();
     t.setTime(parseInt(getSetting("FleetReminders").split('|')[0]));
     h="<tr><th style='border:0;' colspan=5>Auto Launch</th></tr><tr><th align='right'>Fleet: </th><td><a href='fleet.aspx?fleet="+getSetting('FleetReminders').split('|')[1]+"'>"+getSetting('FleetReminders').split('|')[1]+"</a></td><td></td><th align='right'>Launch Time: </th><td>"+getDateString(t)+"</td></tr>"+h;
   }
   var v=GM_listValues();
   for(var i=0;i<v.length;i++){
     if(v[i].split('_')[0]!=wlh.split('.')[0].split('/')[2]) continue;
     if(v[i].split('_')[1]!='mv' && v[i].split('_')[1]!='ar') continue;
     h+="<tr style='text-align:center;vertical-align:top;border-top:0;'>";
     if(v[i].split('_')[2]=='p'){
       h+="<td><a href='javascript:void(1);' id='dpd"+v[i].split('_')[3]+"' style='font-size:10px;font-weight:500;'>Delete</a></td><td><a href='fleet.aspx?fleet="+v[i].split('_')[3]+"&view=move'>"+v[i].split('_')[3]+"</a></td><td><a href='map.aspx?loc="+GM_getValue(v[i]).split('|')[0]+"'>"+GM_getValue(v[i]).split('|')[0]+'</a></td><td>';
       d=GM_getValue(v[i]).split('|')[1].split('&');
       for(x=1;x<d.length;x++){
         if(d[x].split('=')[1]=='') continue;
         h+="<div style='float:right;clear:right;'>"+d[x].split('=')[1]+"</div><div style='float:left;clear:left;'>"+d[x].split('=')[0]+'</div>';
       }
       h+='</td>';
       if(getSetting('mv_a_'+v[i].split('_')[3],'')!='') h+="<td style='white-space:nowrap;'>"+getSetting('mv_a_'+v[i].split('_')[3])+"</td>";
       else h+="<td>&nbsp;</td>";
       y=false;
     }else if(v[i].split('_')[1]=='ar'){
       r+="<td><a href='javascript:void(1);' id='ar"+v[i].split('_')[2]+"' style='font-size:10px;font-weight:500;'>Delete</a></td><td><a href='fleet.aspx?fleet="+v[i].split('_')[2]+"'>"+v[i].split('_')[2]+"</a></td><td style='text-align:right;'>no preset -</td><td style='text-align:left;'>- only recall</td><td style='white-space:nowrap;'>"+getSetting('ar_'+v[i].split('_')[2])+"</td>";
       y=false;
     }else{
       if(getSetting('mv_p_'+v[i].split('_')[3],'')!='') continue;
       h+="<td><a href='javascript:void(1);' id='dpd"+v[i].split('_')[3]+"' style='font-size:10px;font-weight:500;'>Delete</a></td><td><a href='fleet.aspx?fleet="+v[i].split('_')[3]+"&view=move'>"+v[i].split('_')[3]+"</a></td><td style='text-align:right;'>no preset -</td><td style='text-align:left;'>- only move</td><td style='white-space:nowrap;'>"+getSetting('mv_a_'+v[i].split('_')[3])+"</td>";
       y=false;
     }
     h+='</tr>';
     if(r!='') h+="<th style='border:0;' colspan=5>Auto Recall</th></tr><tr style='text-align:center;vertical-align:top;border-top:0;'>"+r+"</tr>";
   }
   if(y) h+="<tr><td colspan=5 style='text-align:center;font-size:11px;font-weight:500;color:#888;'>-- No Data Saved --</td></tr>";
   c.innerHTML=h;
   document.body.insertBefore(c,document.getElementById('fleets-list'));
   for(var i=0;i<v.length;i++){
     if(v[i].split('_')[0]!=wlh.split('.')[0].split('/')[2]) continue;
     if(v[i].split('_')[1]=='ar') document.getElementById('ar'+v[i].split('_')[2]).addEventListener('click',function(){if(confirm('Are you sure you want to delete this data?')){setSetting('ar_'+this.id.split('ar')[1],'');document.body.removeChild(document.getElementById('presetData'));showPresetData();}},false);
     if(v[i].split('_')[1]!='mv') continue;
     if(v[i].split('_')[2]=='p') document.getElementById('dpd'+v[i].split('_')[3]).addEventListener('click',function(){if(confirm('Are you sure you want to delete this data?')){setSetting('mv_p_'+this.id.split('dpd')[1],'');setSetting('mv_a_'+this.id.split('dpd')[1],'');document.body.removeChild(document.getElementById('presetData'));showPresetData();}},false);
     else{
       if(getSetting('mv_p_'+v[i].split('_')[3],'')!='') continue;
       document.getElementById('dpd'+v[i].split('_')[3]).addEventListener('click',function(){if(confirm('Are you sure you want to delete this data?')){setSetting('mv_p_'+this.id.split('dpd')[1],'');setSetting('mv_a_'+this.id.split('dpd')[1],'');document.body.removeChild(document.getElementById('presetData'));showPresetData();}},false);
     }
   }
   document.getElementById('viewPD').innerHTML='Hide Preset Data';
 }
}

function autoResult(){
 if(!document.getElementById('fleet_move_confirmation') || getSetting('autoMoveResult','')=='') return;
 var h=document.createElement('h3');
 h.setAttribute('style','text-align:center;font:900 24px system;margin:12px auto;');
 h.innerHTML='-- AutoMove Result for Fleet: '+getSetting('autoMoveResult')+' --';
 document.body.insertBefore(h,document.getElementById('fleet_move_confirmation'));
 setSetting('autoMoveResult','');
}

function addServertimeCounter(){
 if(!document.getElementById('logistics')) return;
 var c=document.getElementById('logistics').parentNode.nextSibling.firstChild;
 c.setAttribute('colspan','4');
 c.parentNode.removeChild(c.nextSibling);
 c.parentNode.removeChild(c.nextSibling);
 c.parentNode.removeChild(c.nextSibling);
 c.innerHTML=((document.getElementById('pageLoadTime'))?'':("<span id='pageLoadTime' style='display:none;'>"+new Date().getTime()+"</span>"))+"Server Time: <span id='servertimeCounter'>"+getCurrentServerTime()+"</span>";
 servertimeCountdown(getCurrentServerTime());
}

function servertimeCountdown(s){
 var t = new Date();
 t.setTime(getDateObject(s).getTime()+(new Date().getTime()-parseInt(document.getElementById('pageLoadTime').innerHTML)));
 document.getElementById('servertimeCounter').innerHTML=getDateString(t);
 setTimeout(function(){servertimeCountdown(s);},1000);
}

function bigMoveButton(){
 var b=document.getElementsByClassName('input-button')[0];
 if(b==undefined) return;
 if(getSetting('config_bigMoveButton',true)) b.style.padding='10px 26px';
 else b.style.margin='10px 26px';
 b.style.position='relative';
 b.style.top='-8px';
 b.style.cursor='pointer';
}

function showBaseLink(){
 var c=document.evaluate("//a[contains(@href,'map.aspx?')]",document,null,9,null).singleNodeValue;
 if(c==null) return;
 var d=[];
 d[0]=getSetting('empireBaseData','');
 var l=c.href.split('=')[1];
 if(!l || d[0]=='' || d[0].indexOf(l)==-1) return;
 d=d[0].split('|:|'),b=[];
 for(var i=0;i<d.length;i++){
  b=d[i].split('|');
  if(b[2]==l){
   c=c.parentNode.insertBefore(document.createElement('a'),c);
   c.href='base.aspx?base='+b[0];
   c.appendChild(c.nextSibling.removeChild(c.nextSibling.firstChild));
   break;
  }
 }
}

function showLandingTime(){
 var b=document.getElementsByClassName('input-button')[0];
 if(b==undefined) return;
 b.parentNode.setAttribute('colspan','1');
 var c=document.createElement('td');
 c.setAttribute('colspan','3');
 if(document.getElementById('pageLoadTime')) c.innerHTML="&nbsp;";
 else c.innerHTML="<span id='pageLoadTime' style='display:none;'>"+new Date().getTime()+"</span>";
 b.parentNode.parentNode.insertBefore(c,b.parentNode);
 c=document.createElement('th');
 c.setAttribute('colspan','1');
 c.style.color=unescape(getSetting('config_highlightFinishColor',"#DDDDBF"));
 if(getSetting('config_showLandingTime',true)) c.innerHTML="Lands at:";
 b.parentNode.parentNode.appendChild(c);
 c=document.createElement('td');
 c.setAttribute('colspan','2');
 c.setAttribute('id','landingTime');
 c.style.color=unescape(getSetting('config_highlightFinishColor',"#DDDDBF"));
 b.parentNode.parentNode.appendChild(c);
 if(getSetting('config_showLandingTime',true)) calcLandingTime(getCurrentServerTime());
}

function calcLandingTime(s){
 var d=document.getElementById('duration').textContent;
 if(d=="") document.getElementById('landingTime').innerHTML='';
 else{
   var l=new Date();
   l.setTime(getDateObject(s).getTime()+(getSeconds(d)*1000)+new Date().getTime()-parseInt(document.getElementById('pageLoadTime').innerHTML));
   document.getElementById('landingTime').innerHTML=getDateString(l);
 }
 setTimeout(function(){calcLandingTime(s);},1000); 
}

function showRecallTime(){
 if(!document.getElementById('timer1') || document.getElementsByTagName('form').length<2 || wlh.indexOf('&')!=-1) return;
 var c=(document.getElementById('recallTime'))?document.getElementById('recallTime'):document.createElement('center');
 c.setAttribute('id','recallTime');
 c.innerHTML=((document.getElementById('pageLoadTime'))?'':("<span id='pageLoadTime' style='display:none;'>"+new Date().getTime()+"</span>"))+"<fieldset style='display:inline;line-height:1.6;border-width:1px;background:#000 none;'><legend style='font-weight:500;'>If Recall</legend>Recall Travel Duration: <span id='recallTimeCount' style='color:"+unescape(getSetting('config_highlightTimeColor',"#88CCAA"))+";'></span><br>Recall Landing: <span id='recallLandingTime' style='color:"+unescape(getSetting('config_highlightTimeColor',"#88CCAA"))+";'></span></fieldset>";
 document.body.appendChild(c);
 c=document.body.appendChild(document.createElement('div'));
 c.setAttribute('style','margin:8px auto;padding:4ps 8px;text-align:center;font:500 13px tahoma,arial,sans-serif;color:'+unescape(getSetting('config_highlightFinishColor',"#DDDDBF"))+';');
 c.innerHTML="Auto Recall Landing Time: <input class='quant' style='width:160px;' id='arTime' value=''><br><input style='margin-top:8px;' type='button' value=' --  Set Auto Recall  -- '>";
 c.lastChild.addEventListener('click',function(){setSetting('ar_'+wlh.split('?fleet=')[1].split('&')[0],this.previousSibling.previousSibling.value);autoRecall();},false);
 document.getElementsByTagName('center')[0].style.color=unescape(getSetting('config_highlightFinishColor',"#DDDDBF"));
 calcRecallTime(getCurrentServerTime(),document.getElementsByTagName('center')[0].innerHTML.split(':')[1],true);
}

function calcRecallTime(a,d,r){
 var l = document.getElementById('timer1').innerHTML.split(':');
 if(l[0]=='-'){
   document.getElementById('recallTimeCount').innerHTML="Fleet has Landed.";
   document.getElementById('recallLandingTime').innerHTML="Never";
   return;
 }
 var h=((d.indexOf('h')!=-1)?parseInt(d.split('h')[0]):0)-l[0];
 var m=((d.indexOf('m')!=-1)?((d.indexOf('h')!=-1)?parseInt(d.split('h')[1].split('m')[0]):d.split('m')[0]):0)-l[1];
 var s=((d.indexOf('m')!=-1)?parseInt(d.split('m')[1].split('s')[0]):d.split('s')[0])-l[2];
 if(m<0){m+=60;h-=1;}
 if(s<0){s+=60;m-=1;}
 if(h>0) h=h+'h ';
 else h='';
 if(m>0 || (m==0 && h>0)){
   if(m<=9) m='0'+m;
   m=m+'m ';
 }
 else m='';
 if(s>=0){
   if(s<=9) s='0'+s;
   s=s+'s';
 }
 document.getElementById('recallTimeCount').innerHTML=h+m+s;
 var t=new Date();
 t.setTime(getDateObject(a).getTime()+(getSeconds(h+m+s)*1000)+(new Date().getTime()-parseInt(document.getElementById('pageLoadTime').innerHTML)));
 document.getElementById('recallLandingTime').innerHTML=getDateString(t);
 if(r){
  if(getSetting('ar_'+wlh.split('?fleet=')[1].split('&')[0],false)) document.getElementById('arTime').value=getSetting('ar_'+wlh.split('?fleet=')[1].split('&')[0],'');
  else document.getElementById('arTime').value=getDateString(t);
  autoRecall();
 }
 setTimeout(function(){calcRecallTime(a,d);},1000);
}

function autoRecall(){
 if(!getSetting('ar_'+wlh.split('?fleet=')[1].split('&')[0],false)){document.evaluate("//input[@name='confirm_cb']",document,null,9,null).singleNodeValue.checked=false;return;}
 document.evaluate("//input[@name='confirm_cb']",document,null,9,null).singleNodeValue.checked=true;
 var t=getSetting('ar_'+wlh.split('?fleet=')[1].split('&')[0],false);
 var d=parseInt((getDateObject(t).getTime()-getDateObject(document.getElementById('recallLandingTime').innerHTML).getTime())/2000);
 if(d<-2){
   setSetting('ar_'+wlh.split('?fleet=')[1].split('&')[0],'');
   document.evaluate("//input[@name='confirm_cb']",document,null,9,null).singleNodeValue.checked=false;
   alert("Fleet Did Not Recall\n\nRecall time has already past.");
   return;
 }
 var l = document.getElementById('timer1').innerHTML.split(':');
 l=getSeconds(l[0]+'h '+l[1]+'m '+l[2]+'s');
 if(d>l){
   setSetting('ar_'+wlh.split('?fleet=')[1].split('&')[0],'');
   document.evaluate("//input[@name='confirm_cb']",document,null,9,null).singleNodeValue.checked=false;
   alert("Fleet Will Not Recall\n\nRecall time is past the landing time.");
   return;
 }
 if(document.getElementById('arCont')){
  var c=document.getElementById('arCont');
 }else{
  var c=document.body.appendChild(document.createElement('div'));
  c.setAttribute('style',"margin:0 auto;color:#FFE;font:500 14px arial;padding:10px 20px;text-align:center;z-index:10;position:relative;top:-158px;border:1px solid #FF6464;background:rgba(0,0,0,.7) none;width:600px;height:140px;");
  c.id='arCont';
  c.innerHTML="<div style='font:900 20px system;background:#000 none;padding:1px;'>-- AutoRecall is Set for this Fleet --</div>"+
  "<h3 style='background:#000 none;margin:4px 160px 2px 160px;padding:6px 0 0 0;'>Recal Landing Time<br>"+t+"</h3><div id='autoCounter' style='font-size:18px;font-weight:900;padding:0 6px;margin:-2px 160px -4px 160px;background:#000 none;color:"+unescape(getSetting('config_highlightFinishColor',"#DDDDBF"))+";'>-</div><div style='text-align:center;width:500px;font:500 11px arial;background:#000 none;position:absolute;bottom:2px;'>**This page must be displayed for the Auto Recall to work.<br> - You may leave at any time and return and your settings will be remembered - </div><input type='button' class='AETbut' style='font-size:12px;padding:2px 4px;display:inline-block;position:absolute;right:40px;' value='Cancel'>";
  c.lastChild.addEventListener('click',function(){setSetting('ar_'+wlh.split('?fleet=')[1].split('&')[0],'');document.getElementById('arCont').parentNode.removeChild(document.getElementById('arCont'));},false);
 }
 if(d<60) document.getElementById('autoCounter').style.color=unescape(getSetting('config_highlightNowColor',"#F99"));
 else if(d<3600) document.getElementById('autoCounter').style.color=unescape(getSetting('config_highlightTodayColor',"#7896DE"));
 if(d<.1){
  document.getElementById('autoCounter').innerHTML='Recall';
  setSetting('ar_'+wlh.split('?fleet=')[1].split('&')[0],'');
  document.forms[1].submit();
  return;
 }
 var h=parseInt(d/3600);
 var m=parseInt((d-h*3600)/60);
 var s=parseInt(d-h*3600-m*60);
 h=(h>0)?h+'h ':'';
 m=(m>0)?m+'m ':(d<3600)?'':'0m';
 s=(s>0)?s+'s':'0s';
 document.getElementById('autoCounter').innerHTML=h+m+s;
 setTimeout(function(){autoRecall()},1000);
}

/**** Player Highlights ****/
function getHighlightColorForGuild(x){
 var i=0,c = getSetting('config_myGuildcolor',"#9999FF");
 var g = getSetting('config_myGuild',null);
 if(g!=null && c!=null && unescape(g)==x) return unescape(c);
 g = getSetting('config_alliedGuilds',null);
 c = getSetting('config_alliedGuildcolor',null);
 if(g!=null && c!=null){
   g = unescape(g);
   if(g.indexOf(x)!=-1){
     for(i=0;i<g.split(",").length;i++){
       if(g.split(",")[i] == x) return unescape(c);
     }
   }
 }
 g = getSetting('config_enemyGuilds',null);
 c = getSetting('config_enemyGuildcolor',null);
 if(g != null && c != null){
   g = unescape(g);
   if(g.indexOf(x)!=-1){
     for(i=0;i<g.split(",").length;i++){
       if(g.split(",")[i] == x) return unescape(c);
     }
   }
 }
 return null;
}

function getHighlightColorForPlayer(p){
 if(getSetting('config_playerColors') == null) return;
 var a = unescape(getSetting('config_playerColors',"Drekons=#FF82AB,United Colonies=#B88652")).split(",");
 for(var i = 0; i < a.length;i++){
   if(a[i].split("=")[0] == p) return a[i].split("=")[1];
 }
 return null;
}

/**** Swap Location Names ****/
function replaceLocationNames(){
 var a = document.evaluate("//a[contains(@href,'loc=') and (count(img) = 0)]",document,null,7,null);
 if(a.snapshotLength==0) return;
 var i,x,names = unescape(getSetting('config_locationNames',"A12:12:12:12=my home base,A13:13:13:13=main jumpgate"));
 for(i=0;i<a.snapshotLength;i++){
   for(x=0;x<names.split(",").length;x++){
     if(names.split(",")[x].split("=")[0] == a.snapshotItem(i).textContent) a.snapshotItem(i).textContent = names.split(",")[x].split("=")[1]
   }
 }
}

/*********************
  Map Enhancements
*********************/
function copyBaseLinks(){
  var cV = document.getElementById('myCanvas');
  if(!cV) return;
  cV=cV.parentNode.parentNode.parentNode.parentNode;
  var bL = document.evaluate("//a[@onmouseout][contains(@href,'base')]",document,null,7,null);
  if(bL.snapshotLength==0) return;
  var dE = document.createElement("div");
  dE.setAttribute("style","position:absolute;left:2%;border:1px ridge "+unescape(getSetting('config_overrideBorder','#9999FF'))+";font:700 12px verdana,arial,sans-serif;text-align:right;padding:5px;display:inline-block;background-color:#000000;z-index:500;");
  dE.setAttribute("id","linksClones");
  var tE = document.createElement("div");
  tE.textContent = "Bases";
  tE.setAttribute("style","font:900 16px arial,sans-serif;text-align:center;");
  dE.appendChild(tE);
  dE.firstChild.appendChild(document.createElement('br'));
  tE = document.createElement('span');
  tE.setAttribute('style','font:500 12px arial,sans-serif;position:relative;top:-2px;');
  tE.textContent='(in this galaxy)';
  dE.firstChild.appendChild(tE);
  for(var i=0;i<bL.snapshotLength;i++){
    var c = bL.snapshotItem(i).cloneNode(true);
    dE.appendChild(c);
    dE.appendChild(document.createElement("br"));
  }
  cV.parentNode.insertBefore(dE,cV);
}

function copyFleetLinks(){
  var cV = document.getElementById('myCanvas');
  if(!cV) return;
  cV=cV.parentNode.parentNode.parentNode.parentNode;
  var fL = document.evaluate("//a[@onmouseout][contains(@href,'fleet')][not(contains(@href,'edit'))]",document,null,7,null);
  if(fL.snapshotLength==0) return;
  var dE = document.createElement("div");
  dE.setAttribute("style","position:absolute;left:2%;border:1px ridge "+unescape(getSetting('config_overrideBorder','#9999FF'))+";font:700 12px verdana,arial,sans-serif;text-align:right;padding:5px;display:inline-block;background-color:#000000;z-index:500;");
  dE.setAttribute("id","linksClones");
  var tE = document.createElement("div");
  tE.textContent = "Fleets";
  tE.setAttribute("style","font:900 16px arial,sans-serif;text-align:center;");
  dE.appendChild(tE);
  dE.firstChild.appendChild(document.createElement('br'));
  tE = document.createElement('span');
  tE.setAttribute('style','font:500 12px arial,sans-serif;position:relative;top:-2px;');
  tE.textContent='(in this galaxy)';
  dE.firstChild.appendChild(tE);
  var sM;
  for(var i=0;i<fL.snapshotLength;i++){
    var c = fL.snapshotItem(i).cloneNode(true);
    sM = document.createElement('a');
    sM.setAttribute("href","/map.aspx?loc="+/.\d\d:\d\d:\d\d:\d\d/.exec(fL.snapshotItem(i).parentNode.nextSibling.firstChild.innerHTML)[0]);
    sM.textContent = " - loc";
    sM.title=fL.snapshotItem(i).parentNode.nextSibling.firstChild.innerHTML;
    sM.style.fontSize="11px";
    sM.style.fontWeight="500";
    dE.appendChild(c);
    dE.appendChild(sM);
    dE.appendChild(document.createElement("br"));
  }
  cV.parentNode.insertBefore(dE,cV);
}

function baseLocationLinks(){
 var i,l=document.evaluate("//center",document,null,7,null);
 if((!l.snapshotItem(0).firstChild.childNodes[2] || l.snapshotItem(0).firstChild.childNodes[2].tagName.toUpperCase() != 'A') && (l.snapshotItem(1)==null || !l.snapshotItem(1).firstChild.childNodes[2] || l.snapshotItem(1).firstChild.childNodes[2].tagName.toUpperCase() != 'A')) return;
 l = document.evaluate("//a[contains(@href,'base.aspx')]",document,null,7,null);
 var u,d,a;
 for(i=1;i<l.snapshotLength;i++){
   u = l.snapshotItem(i).firstChild.title;
   u = u.substring(u.indexOf('(')+1);
   u = u.substring(0,u.indexOf(')'));
   d = document.createElement('div');
   d.setAttribute('style',l.snapshotItem(i).firstChild.getAttribute('style'));
   a = document.createElement('a');
   d.appendChild(a);
   l.snapshotItem(i).parentNode.appendChild(d);
   a.href = "/base.aspx?base="+l.snapshotItem(i).href.split('=')[1];
   a.setAttribute('onClick','window.location.href=this.href;return false;');
   l.snapshotItem(i).href = "/map.aspx?loc="+u
   a.innerHTML = "Base";
   a.setAttribute('style','top:-14px;left:-18px;position:absolute;font-size:.8em;text-decoration:underline;');
 }
 l = document.evaluate("//span[@class='gray comment']",document,null,7,null);
 for(i=0;i<l.snapshotLength;i++){
   l.snapshotItem(i).setAttribute('class','');
   l.snapshotItem(i).setAttribute('style','white-space:nowrap;position:absolute;top:-'+(l.snapshotItem(i).parentNode.offsetHeight+4)+'px;left:'+((l.snapshotItem(i).parentNode.offsetWidth/2)+18)+'px;');
   l.snapshotItem(i).innerHTML=l.snapshotItem(i).title;
 }
}

function systemRemoveBorder(){
 var l = document.evaluate("//center",document,null,7,null);
 if(l.snapshotItem(0).firstChild.childNodes[2] && l.snapshotItem(0).firstChild.childNodes[2].tagName.toUpperCase() == 'A') l=l.snapshotItem(0);
 else if(l.snapshotItem(1)!=null && l.snapshotItem(1).firstChild.childNodes[2] && l.snapshotItem(1).firstChild.childNodes[2].tagName.toUpperCase() == 'A') l=l.snapshotItem(1);
 else return;
 l.nextSibling.nextSibling.style.border='0';
 l.nextSibling.nextSibling.style.background='transparent none';
 l.nextSibling.nextSibling.firstChild.firstChild.firstChild.style.border='0';
}

/*****************
   Trade
*****************/
function checkTechDataAge(){
return; // ** disabled **
 if(getSetting('techData') == null){	
  insertNotification('Technology data has not been set.<br>Visit the <a href="/empire.aspx?view=technologies">technologies page</a> to set the information.<br><br><br>');
  return;
 }	
 if (Math.round(new Date().getTime()/1000)>(parseInt(getSetting('lastTechCheck',0))+(86400*3))) insertNotification('Technology data has not been updated in over three days.<br>Visit the <a href="/empire.aspx?view=technologies">technologies page</a> to refresh the information.<br><br><br>');
}

function highlightPlayers(){
 var a = document.evaluate("//a[contains(@href,'profile.aspx')]",document,null,7,null);
 for (var i=0;i<a.snapshotLength;i++){
  if(getSetting('config_highlightTradePartners',true)){
   if(isTradePartner(a.snapshotItem(i).innerHTML)){
    a.snapshotItem(i).style.color = unescape(getSetting('config_highlightPlayerColor',"green"));
    if(wlh.indexOf('messages.aspx')!=-1 && a.snapshotItem(i).parentNode.lastChild.previousSibling && a.snapshotItem(i).parentNode.lastChild.previousSibling.tagName && a.snapshotItem(i).parentNode.lastChild.previousSibling.tagName.toLowerCase()=='a' && a.snapshotItem(i).parentNode.lastChild.previousSibling.href.indexOf('view=trade')!=-1){
     a.snapshotItem(i).parentNode.insertBefore(document.createElement('span'),a.snapshotItem(i).nextSibling);
     a.snapshotItem(i).nextSibling.setAttribute('style','vertical-align:super;color:#F00;background-color:#BB0;line-height:.5em;font-size:10px;margin:0 6px;');
     a.snapshotItem(i).nextSibling.innerHTML=" -DUPLICATE- ";
     continue;
    }
   }else if(wlh.indexOf('board.aspx')!=-1){
    var p=a.snapshotItem(i).innerHTML.split(' ');
    var b='',h='';
    for(var x=1;x<=p.length;x++){
     b=p[p.length-x]+b;
     if(isTradePartner(b)){
      a.snapshotItem(i).style.color = unescape(getSetting('config_highlightPlayerColor',"green"));
      break;
     }
     b=' '+b;
    }
    if(a.snapshotItem(i).parentNode.tagName.toLowerCase()=='td'){
     b=a.snapshotItem(i).parentNode.parentNode.nextSibling.firstChild.innerHTML;
     h=b;
     do{
      p=/\[[^\]]+\]\s+([^-<]+)\s+-/g.exec(b);
      if(p && p[1]){
       p[1]=p[1].replace(/\s+/g,' ');
       p[1]=p[1].replace(/\s+[^\s]+\s*$/,'');
       p[0]=p[0].replace(/\s+[^\s]+\s+\-$/,'');
       if(isTradePartner(p[1])){
        h=h.replace(p[0],"<span style='color:"+unescape(getSetting('config_highlightPlayerColor',"green"))+";'>"+p[0]+"</span>");
       }
      }
     } while(p);
     a.snapshotItem(i).parentNode.parentNode.nextSibling.firstChild.innerHTML=h;
    }
   }
  }
  if(getSetting('config_highlightPlayers',true)){
   if(getHighlightColorForGuild(getGuild(a.snapshotItem(i).innerHTML))!=null) a.snapshotItem(i).style.color = getHighlightColorForGuild(getGuild(a.snapshotItem(i).innerHTML));
   if(getHighlightColorForPlayer(getPlayerName(a.snapshotItem(i).innerHTML))!=null) a.snapshotItem(i).style.color = getHighlightColorForPlayer(getPlayerName(a.snapshotItem(i).innerHTML));
  }
 }
}

function isTradePartner(n){
 var t;
 if(getSetting('tradePartners',null)!=null){
   t = unescape(getSetting('tradePartners',null)).split(";");
   for(var i=0;i<t.length;i++){
     if(getPlayerName(n)==getPlayerName(t[i])) return true;
   }
 }
 return false;
}

function insertToggleLink(){
 var a = document.createElement("a");
 a.href = "javascript:void(0)";
 a.setAttribute("id","hideTradesLink");
 a.textContent = "Hide full trades";
 a.addEventListener('click',function(event){toggleBasesWithFullTrades(true)},true);
 document.getElementById('empire_trade_bases').firstChild.firstChild.firstChild.style.padding='8px';
 document.getElementById('empire_trade_bases').firstChild.firstChild.firstChild.innerHTML='Total players involved in trading = '+document.getElementById('empire_trade_formula').firstChild.lastChild.innerHTML.split('=')[5].split('<')[0]+' &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp; ';
 document.getElementById('empire_trade_bases').firstChild.firstChild.firstChild.appendChild(a);
 document.getElementById('empire_trade_bases').firstChild.lastChild.firstChild.firstChild.lastChild.firstChild.lastChild.previousSibling.style.padding='8px';
 document.getElementById('empire_trade_bases').firstChild.lastChild.firstChild.firstChild.lastChild.firstChild.lastChild.previousSibling.lastChild.innerHTML+=' Routes';
 document.getElementById('empire_trade_bases').firstChild.lastChild.firstChild.firstChild.lastChild.lastChild.lastChild.innerHTML='';
 document.getElementById('empire_trade_formula').parentNode.removeChild(document.getElementById('empire_trade_formula'));
 document.getElementById('empire_trade_bases').firstChild.insertBefore(document.createElement('tr'),document.getElementById('empire_trade_bases').firstChild.lastChild);
 document.getElementById('empire_trade_bases').firstChild.childNodes[1].id='tradesFullMsg';
 document.getElementById('empire_trade_bases').firstChild.childNodes[1].style.display='none';
 document.getElementById('empire_trade_bases').firstChild.childNodes[1].innerHTML='<td style="color:'+unescape(getSetting('config_highlightPlayerColor',"green"))+';text-align:center;">* All Trade Routes Full *</td>';
 toggleBasesWithFullTrades();
}

function toggleBasesWithFullTrades(s){
 var h = getSetting('hide_Trade_Rows',false),x=0;
 var rows = document.getElementById('empire_trade_bases').firstChild.lastChild.firstChild.firstChild.childNodes[1].childNodes;
 if(s) h=!h;
 for(var i=0;i<rows.length;i++){
   if(parseInt(rows[i].childNodes[3].firstChild.textContent.split(" / ")[0]) == parseInt(rows[i].childNodes[3].firstChild.textContent.split(" / ")[1])){
     rows[i].style.display=h?"none":"table-row";
     x++;
   }
 }
 rows[0].parentNode.previousSibling.firstChild.style.display=h?"none":"table-row";
 if(x==rows.length && h){
   rows[0].style.display='none';
   document.getElementById('tradesFullMsg').style.display='table-row';
 }else{
   rows[0].style.display='table-row';
   document.getElementById('tradesFullMsg').style.display='none';
 }
 document.getElementById("hideTradesLink").textContent=h?"Show all":"Hide full trades";
 setSetting('hide_Trade_Rows',h);
}

function convertTradeLinks(){
 var a = document.evaluate("//small[contains(@class,'gray')]",document,null,7,null);
 if(a.snapshotLength==0) return;
 var b = a.snapshotItem(0).innerHTML;
 for(var i=0;i<a.snapshotLength;i++){
  if(a.snapshotItem(i).innerHTML!=b) continue;
  a.snapshotItem(i).previousSibling.previousSibling.firstChild.href+='&view=trade';
 }
}

function checkTradePage(){
 var i,x,t=[],n=[];
 var a = document.evaluate("//small[contains(@class,'gray')]",document,null,7,null);
 for(i=0;i<a.snapshotLength;i++){
  if(t[a.snapshotItem(i).innerHTML]) t[a.snapshotItem(i).innerHTML]+=1;
  else t[a.snapshotItem(i).innerHTML]=1;
  n.push(a.snapshotItem(i));
  if(i>0) i++;
 }
 if(a.snapshotLength==0) a=';;';
 else a='';
 for(i in t){
  a+=";"+i;
  for(x=1;x<n.length;x++){
   if(n[x].innerHTML == i && t[i]>1){
    n[x].style.color = 'red';
    if(n[x].parentNode.previousSibling.lastChild.innerHTML==i) n[x].innerHTML += ' (SelfTrade)';
    else n[x].innerHTML += ' (Duplicate)';
   }
  }
 }
 a=a.substring(1);
 setSetting('tradePartners',escape(a));
 setSetting('lastTradeCheck',Math.round(new Date().getTime()/1000));
}

function checkTradeDataAge(){
 if(getSetting('tradePartners',null) == null) insertNotification('Trade partner data has not been set.<br>Visit the <a href="/empire.aspx?view=trade">trade page</a> to set the information.<br><br><br>');
 else if(Math.round(new Date().getTime()/1000) > (parseInt(getSetting('lastTradeCheck',0))+(86400*3))) insertNotification('Trade partner data has not been updated in over three days.<br>Visit the empire <a href="/empire.aspx?view=trade">trade page</a> to refresh the information.<br><br><br>');
}

function findPoorTrades(){
 if(!document.getElementById('empire_trade_trade-routes').firstChild.lastChild.firstChild.firstChild.childNodes[1]) return;
 var rows = document.getElementById('empire_trade_trade-routes').firstChild.lastChild.firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<rows.length;i++){
  if(parseInt(rows[i].childNodes[3].innerHTML) - parseInt(rows[i].childNodes[2].innerHTML) > getSetting('config_poorTradeUpperThreshold',10)) rows[i].childNodes[3].style.color = "orange";
  if(parseInt(rows[i].childNodes[2].innerHTML) - parseInt(rows[i].childNodes[3].innerHTML) > getSetting('config_poorTradeLowerThreshold',15)) rows[i].childNodes[3].style.color = "red";
 }
}

function showTradeSummary(){
 if(!document.getElementById('empire_trade_trade-routes')) return;
 var c,x,s,p;
 GM_addStyle('#tradeSummary{margin:0 auto;}#tradeSummary TD{text-align:center;}');
 var t = document.createElement('table');
 t.setAttribute('id','tradeSummary');
 t.setAttribute('cellpadding','6');
 t.innerHTML='<tr><th align="center" colspan=5>Trade Summary<div id="inactiveTrade" style="position:relative;top:4px;color:'+unescape(getSetting('config_enemyGuildcolor','#FF9999'))+';">&nbsp;</div></th></tr><tr><th>&nbsp;</th><th>#&nbsp;of<br>Routes</th><th>Avg.&nbsp;Econ<br>Difference</th><th>Avg.<br>Distance</th><th>Avg.<br>Income</th></tr>';
 if(getSetting('config_highlightDuplicateTradePartners',true)){
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('d')},true);
   c.firstChild.firstChild.innerHTML='Duplicate Routes';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeDups');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeDupsDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeDupsDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeDupsInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('s')},true);
   c.firstChild.firstChild.innerHTML='Self Trades';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeSelf');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeSelfDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeSelfDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeSelfInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
 }
 if(getSetting('config_highlightPoorTrades',true)){
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('red')},true);
   c.firstChild.firstChild.innerHTML='Low Threshold';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeLow');
   c.lastChild.setAttribute('style','color:red;');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeLowDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeLowDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeLowInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('orange')},true);
   c.firstChild.firstChild.innerHTML='High Threshold';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeHigh');
   c.lastChild.setAttribute('style','color:orange;');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeHighDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeHighDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeHighInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
 }
 if(getSetting('config_highlightDuplicateTradePartners',true) || getSetting('config_highlightPoorTrades',true)){
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('b')},true);
   c.firstChild.firstChild.innerHTML='Balanced Trade';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeBal');
   c.lastChild.setAttribute('style','color:'+unescape(getSetting('config_highlightPlayerColor',"green"))+';');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeBalDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeBalDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeBalInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
 }
 c=document.createElement('tr');
 c.appendChild(document.createElement('th'));
 c.firstChild.appendChild(document.createElement('a'));
 c.firstChild.firstChild.href='javascript:void(0);';
 c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('a')},true);
 c.firstChild.firstChild.innerHTML='All Routes';
 c.appendChild(document.createElement('td'));
 c.lastChild.setAttribute('id','tradeAll');
 c.lastChild.innerHTML=0;
 c.appendChild(document.createElement('td'));
 c.lastChild.setAttribute('id','tradeAllDiff');
 c.lastChild.innerHTML=0;
 c.appendChild(document.createElement('td'));
 c.lastChild.setAttribute('id','tradeAllDist');
 c.lastChild.innerHTML=0;
 c.appendChild(document.createElement('td'));
 c.lastChild.setAttribute('id','tradeAllInc');
 c.lastChild.innerHTML=0;
 t.firstChild.appendChild(c);
 document.getElementById('empire_trade_trade-routes').parentNode.insertBefore(t,document.getElementById('empire_trade_trade-routes'));
 document.getElementById('empire_trade_trade-routes').parentNode.insertBefore(document.createElement("br"),document.getElementById('empire_trade_trade-routes'));
 var a = document.evaluate("//small[@class='gray']",document,null,7,null),n=0;
 document.getElementById('tradeAll').innerHTML=a.snapshotLength;
 for(i=0;i<a.snapshotLength;i++){
   p=0;
   if(a.snapshotItem(i).innerHTML.indexOf(' (Duplicate)')!=-1 && document.getElementById('tradeDups')){document.getElementById('tradeDups').innerHTML=parseInt(document.getElementById('tradeDups').innerHTML)+1;p=1;}
   if(a.snapshotItem(i).innerHTML.indexOf(' (SelfTrade)')!=-1 && document.getElementById('tradeSelf')){document.getElementById('tradeSelf').innerHTML=parseInt(document.getElementById('tradeSelf').innerHTML)+1;p=2;}
   s=a.snapshotItem(i).parentNode.parentNode.childNodes[3].style.color;
   if(s=='red') document.getElementById('tradeLow').innerHTML=parseInt(document.getElementById('tradeLow').innerHTML)+1;
   else if(s=='orange') document.getElementById('tradeHigh').innerHTML=parseInt(document.getElementById('tradeHigh').innerHTML)+1;
   else if(p==0 && document.getElementById('tradeBal')) document.getElementById('tradeBal').innerHTML=parseInt(document.getElementById('tradeBal').innerHTML)+1;
   if(a.snapshotItem(i).parentNode.parentNode.childNodes[6].innerHTML.indexOf('(')!=-1) n++;
   for(x=3;x<7;x++){
     if(x==5) continue;
     if(x==4) c=parseInt(cleanNumbers(a.snapshotItem(i).parentNode.parentNode.childNodes[x].innerHTML));
     else c=parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x].innerHTML);
     if(c==NaN) return;
     if(x==3){
       document.getElementById('tradeAllDiff').innerHTML=parseInt(document.getElementById('tradeAllDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       if(p==1) document.getElementById('tradeDupsDiff').innerHTML=parseInt(document.getElementById('tradeDupsDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       else if(p==2) document.getElementById('tradeSelfDiff').innerHTML=parseInt(document.getElementById('tradeSelfDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       if(s=='red') document.getElementById('tradeLowDiff').innerHTML=parseInt(document.getElementById('tradeLowDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       else if(s=='orange') document.getElementById('tradeHighDiff').innerHTML=parseInt(document.getElementById('tradeHighDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       else if(p==0 && document.getElementById('tradeBalDiff')) document.getElementById('tradeBalDiff').innerHTML=parseInt(document.getElementById('tradeBalDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
     }
     else if(x==4){
       document.getElementById('tradeAllDist').innerHTML=parseInt(document.getElementById('tradeAllDist').innerHTML)+c;
       if(p==1) document.getElementById('tradeDupsDist').innerHTML=parseInt(document.getElementById('tradeDupsDist').innerHTML)+c;
       else if(p==2) document.getElementById('tradeSelfDist').innerHTML=parseInt(document.getElementById('tradeSelfDist').innerHTML)+c;
       if(s=='red') document.getElementById('tradeLowDist').innerHTML=parseInt(document.getElementById('tradeLowDist').innerHTML)+c;
       else if(s=='orange') document.getElementById('tradeHighDist').innerHTML=parseInt(document.getElementById('tradeHighDist').innerHTML)+c;
       else if(p==0 && document.getElementById('tradeBalDist')) document.getElementById('tradeBalDist').innerHTML=parseInt(document.getElementById('tradeBalDist').innerHTML)+c;
     }
     else if(x==6){
       document.getElementById('tradeAllInc').innerHTML=parseInt(document.getElementById('tradeAllInc').innerHTML)+c;
       if(p==1) document.getElementById('tradeDupsInc').innerHTML=parseInt(document.getElementById('tradeDupsInc').innerHTML)+c;
       else if(p==2) document.getElementById('tradeSelfInc').innerHTML=parseInt(document.getElementById('tradeSelfInc').innerHTML)+c;
       if(s=='red') document.getElementById('tradeLowInc').innerHTML=parseInt(document.getElementById('tradeLowInc').innerHTML)+c;
       else if(s=='orange') document.getElementById('tradeHighInc').innerHTML=parseInt(document.getElementById('tradeHighInc').innerHTML)+c;
       else if(p==0 && document.getElementById('tradeBalInc')) document.getElementById('tradeBalInc').innerHTML=parseInt(document.getElementById('tradeBalInc').innerHTML)+c;
     }
   }
 }
 if(document.getElementById('tradeDupsDiff') && document.getElementById('tradeDupsDiff').innerHTML!=0) document.getElementById('tradeDupsDiff').innerHTML=(parseInt(document.getElementById('tradeDupsDiff').innerHTML)/parseInt(document.getElementById('tradeDups').innerHTML)).toFixed(2);
 if(document.getElementById('tradeDupsDist') && document.getElementById('tradeDupsDist').innerHTML!=0) document.getElementById('tradeDupsDist').innerHTML=(parseInt(document.getElementById('tradeDupsDist').innerHTML)/parseInt(document.getElementById('tradeDups').innerHTML)).toFixed(2);
 if(document.getElementById('tradeDupsInc') && document.getElementById('tradeDupsInc').innerHTML!=0) document.getElementById('tradeDupsInc').innerHTML=(parseInt(document.getElementById('tradeDupsInc').innerHTML)/parseInt(document.getElementById('tradeDups').innerHTML)).toFixed(2);
 if(document.getElementById('tradeSelfDiff') && document.getElementById('tradeSelfDiff').innerHTML!=0) document.getElementById('tradeSelfDiff').innerHTML=(parseInt(document.getElementById('tradeSelfDiff').innerHTML)/parseInt(document.getElementById('tradeSelf').innerHTML)).toFixed(2);
 if(document.getElementById('tradeSelfDist') && document.getElementById('tradeSelfDist').innerHTML!=0) document.getElementById('tradeSelfDist').innerHTML=(parseInt(document.getElementById('tradeSelfDist').innerHTML)/parseInt(document.getElementById('tradeSelf').innerHTML)).toFixed(2);
 if(document.getElementById('tradeSelfInc') && document.getElementById('tradeSelfInc').innerHTML!=0) document.getElementById('tradeSelfInc').innerHTML=(parseInt(document.getElementById('tradeSelfInc').innerHTML)/parseInt(document.getElementById('tradeSelf').innerHTML)).toFixed(2);
 if(document.getElementById('tradeLowDiff') && document.getElementById('tradeLowDiff').innerHTML!=0) document.getElementById('tradeLowDiff').innerHTML=(parseInt(document.getElementById('tradeLowDiff').innerHTML)/parseInt(document.getElementById('tradeLow').innerHTML)).toFixed(2);
 if(document.getElementById('tradeLowDist') && document.getElementById('tradeLowDist').innerHTML!=0) document.getElementById('tradeLowDist').innerHTML=(parseInt(document.getElementById('tradeLowDist').innerHTML)/parseInt(document.getElementById('tradeLow').innerHTML)).toFixed(2);
 if(document.getElementById('tradeLowInc') && document.getElementById('tradeLowInc').innerHTML!=0) document.getElementById('tradeLowInc').innerHTML=(parseInt(document.getElementById('tradeLowInc').innerHTML)/parseInt(document.getElementById('tradeLow').innerHTML)).toFixed(2);
 if(document.getElementById('tradeHighDiff') && document.getElementById('tradeHighDiff').innerHTML!=0) document.getElementById('tradeHighDiff').innerHTML=(parseInt(document.getElementById('tradeHighDiff').innerHTML)/parseInt(document.getElementById('tradeHigh').innerHTML)).toFixed(2);
 if(document.getElementById('tradeHighDist') && document.getElementById('tradeHighDist').innerHTML!=0) document.getElementById('tradeHighDist').innerHTML=(parseInt(document.getElementById('tradeHighDist').innerHTML)/parseInt(document.getElementById('tradeHigh').innerHTML)).toFixed(2);
 if(document.getElementById('tradeHighInc') && document.getElementById('tradeHighInc').innerHTML!=0) document.getElementById('tradeHighInc').innerHTML=(parseInt(document.getElementById('tradeHighInc').innerHTML)/parseInt(document.getElementById('tradeHigh').innerHTML)).toFixed(2);
 if(document.getElementById('tradeBalDiff') && document.getElementById('tradeBalDiff').innerHTML!=0) document.getElementById('tradeBalDiff').innerHTML=(parseInt(document.getElementById('tradeBalDiff').innerHTML)/parseInt(document.getElementById('tradeBal').innerHTML)).toFixed(2);
 if(document.getElementById('tradeBalDist') && document.getElementById('tradeBalDist').innerHTML!=0) document.getElementById('tradeBalDist').innerHTML=(parseInt(document.getElementById('tradeBalDist').innerHTML)/parseInt(document.getElementById('tradeBal').innerHTML)).toFixed(2);
 if(document.getElementById('tradeBalInc') && document.getElementById('tradeBalInc').innerHTML!=0) document.getElementById('tradeBalInc').innerHTML=(parseInt(document.getElementById('tradeBalInc').innerHTML)/parseInt(document.getElementById('tradeBal').innerHTML)).toFixed(2);
 document.getElementById('tradeAllDiff').innerHTML=(parseInt(document.getElementById('tradeAllDiff').innerHTML)/a.snapshotLength).toFixed(2);
 document.getElementById('tradeAllDist').innerHTML=(parseInt(document.getElementById('tradeAllDist').innerHTML)/a.snapshotLength).toFixed(2);
 document.getElementById('tradeAllInc').innerHTML=(parseInt(document.getElementById('tradeAllInc').innerHTML)/a.snapshotLength).toFixed(2);
 if(n!=0) document.getElementById('inactiveTrade').innerHTML='Inactive Routes: '+n;
}

function toggleTradeRows(r){
 var a = document.evaluate("//small[@class='gray']",document,null,7,null);
 for(var i=0;i<a.snapshotLength;i++){
   if((a.snapshotItem(i).parentNode.parentNode.childNodes[3].style.color==r)||(a.snapshotItem(i).parentNode.parentNode.childNodes[3].style.color=='' && r=='b' && a.snapshotItem(i).innerHTML.indexOf(' (SelfTrade)')==-1 && a.snapshotItem(i).innerHTML.indexOf(' (Duplicate)')==-1)||(a.snapshotItem(i).innerHTML.indexOf(' (SelfTrade)')!=-1 && r=='s')||(a.snapshotItem(i).innerHTML.indexOf(' (Duplicate)')!=-1 && r=='d')||r=='a') a.snapshotItem(i).parentNode.parentNode.style.display='table-row';
   else a.snapshotItem(i).parentNode.parentNode.style.display='none';
 }
}

/***********************
 Structures / Bases
***********************/
function insertBaseSettingLinks(){
 var a = document.evaluate("//a[contains(@href,'base.aspx?base=')]",document,null,7,null);
 if(!a.snapshotItem(0)) return;
 var l,d,j,r = a.snapshotItem(0).parentNode.parentNode.previousSibling,t = unescape(getSetting("newBaseTypes",null)).split(","),b=document.getElementById('empire_structures').firstChild.firstChild.firstChild.innerHTML;
 GM_addStyle('#empire_structures TH{color:#fff;}.settingsLink {font-weight:bold;font-size:x-small;background-color:#333399;border:solid 1px transparent;padding-left:2px;padding-right:2px;margin-left:2px;margin-right:2px;}.settingsLinkSelected {font-weight:bold;font-size:x-small;background-color:#000000;border:solid 1px transparent;padding-left:2px;padding-right:2px;margin-left:2px;margin-right:2px;}');
 document.getElementById('empire_structures').firstChild.removeChild(document.getElementById('empire_structures').firstChild.firstChild);
 d = document.createElement("th");
 d.setAttribute("width",25);
 d.setAttribute("align","left");
 d.setAttribute("style","font-size:8px;padding-bottom:12px;font-weight:500;");
 d.innerHTML = "<span style='color:red;font-size:large;'>&#x25CF;</span><br><br>N<br>O<br>T<br><br>S<br>T<br>A<br>R<br>T<br>E<br>D<br>";
 r.replaceChild(d,r.firstChild);
 d = document.createElement("th");
 d.setAttribute("width",25);
 d.setAttribute("style","font-size:8px;padding-bottom:12px;font-weight:500;");
 d.innerHTML = "<span style='color:blue;font-size:large;'>&#x25CF;</span><br><br>P<br>R<br>O<br>G<br>R<br>E<br>S<br>S<br>I<br>N<br>G";
 r.insertBefore(d,r.firstChild);
 r.insertBefore(document.createElement("th"),r.firstChild);
 d = document.createElement("th");
 d.className='th_header2 dropcap';
 d.innerHTML = b+"<br><br><a href='"+wlh+"&mode=edit' id='editLink'>Edit Goals</a>";
 r.insertBefore(d,r.firstChild);
 for(var i=0;i<a.snapshotLength;i++){
   l = a.snapshotItem(i);
   l.parentNode.parentNode.firstChild.setAttribute("colspan","3");
   b = l.href.substring(l.href.indexOf("=")+1);
   d = document.createElement("td");
   d.innerHTML = "<a class='settingsLink' href='#"+b+"' id='1-"+b+"'>E</a><a class='settingsLink' href='#"+b+"' id='2-"+b+"'>P</a><a class='settingsLink' href='#"+b+"' id='3-"+b+"'>R</a><a class='settingsLink' href='#"+b+"' id='4-"+b+"'>JG</a><a class='settingsLink' href='#"+b+"' id='5-"+b+"'>C</a>";
   l.parentNode.parentNode.insertBefore(d,l.parentNode.parentNode.firstChild);
   for(j=0;j<t.length;j++){
     if(t[j].split("=")[0]==b) onBaseTypeSet(b,t[j].split("=")[1]);
    }
   l.href = l.href + "&view=structures";
   document.getElementById("1-"+b).addEventListener('click', getSetBaseClosure(b,"1"),true);
   document.getElementById("2-"+b).addEventListener('click', getSetBaseClosure(b,"2"),true);
   document.getElementById("3-"+b).addEventListener('click', getSetBaseClosure(b,"3"),true);
   document.getElementById("4-"+b).addEventListener('click', getSetBaseClosure(b,"4"),true);
   document.getElementById("5-"+b).addEventListener('click', getSetBaseClosure(b,"5"),true);
 }
}

function getSetBaseClosure(b,t){
 function func(){setBase(b,t)};
 return func;
}

function setBase(b,t){
  onBaseTypeSet(b,t);
  saveBaseTypes();
}

function onBaseTypeSet(b,t){
 if(document.getElementById(t+"-"+b).className=="settingsLinkSelected"){
   document.getElementById(t+"-"+b).className="settingsLink";
   fillCells(b,"clear");
 }else{
   document.getElementById(t+"-"+b).setAttribute("class","settingsLinkSelected");
   switch(t){
     case "1":{document.getElementById("2-"+b).className="settingsLink";document.getElementById("3-"+b).className="settingsLink";document.getElementById("4-"+b).className="settingsLink";document.getElementById("5-"+b).className="settingsLink";break;}
     case "2":{document.getElementById("1-"+b).className="settingsLink";document.getElementById("3-"+b).className="settingsLink";document.getElementById("4-"+b).className="settingsLink";document.getElementById("5-"+b).className="settingsLink";break;}
     case "3":{document.getElementById("1-"+b).className="settingsLink";document.getElementById("2-"+b).className="settingsLink";document.getElementById("4-"+b).className="settingsLink";document.getElementById("5-"+b).className="settingsLink";break;}
     case "4":{document.getElementById("1-"+b).className="settingsLink";document.getElementById("2-"+b).className="settingsLink";document.getElementById("3-"+b).className="settingsLink";document.getElementById("5-"+b).className="settingsLink";break;}
     case "5":{document.getElementById("1-"+b).className="settingsLink";document.getElementById("2-"+b).className="settingsLink";document.getElementById("3-"+b).className="settingsLink";document.getElementById("4-"+b).className="settingsLink";break;}
   }
   fillCells(b,t);
 }
}

function saveBaseTypes(){
 var a = document.evaluate("//a[contains(@href,'base.aspx?base=')]",document,null,7,null);
 if(!a.snapshotItem(0)) return;
 var x,b='';
 for(var i=0;i<a.snapshotLength;i++){
   for(x=0;x<a.snapshotItem(i).parentNode.previousSibling.childNodes.length;x++){
     if(a.snapshotItem(i).parentNode.previousSibling.childNodes[x].className=="settingsLinkSelected") b+=a.snapshotItem(i).href.split('=')[1].split('&')[0]+'='+(x+1)+',';
   }
 }
 if(b.length>0) b=b.substring(0,b.length-1);
 setSetting("newBaseTypes",escape(b));
}

function getBaseTypeValues(t){
 var a;
 switch(t){
   case "1":{a=getSetting("BASE_PRESET_1_VALUE","0,0,0,0,0,0,20,10,15,20,5,20,0,10,5,10,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,2,3");break;}
   case "2":{a=getSetting("BASE_PRESET_2_VALUE","0,0,0,0,0,0,26,0,20,26,6,20,0,10,5,5,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,2,3");break;}
   case "3":{a=getSetting("BASE_PRESET_3_VALUE","0,0,0,0,0,27,20,0,15,20,4,20,0,10,5,5,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,2,3");break;}
   case "4":{a=getSetting("BASE_PRESET_4_VALUE","0,0,0,0,0,0,20,0,15,20,4,20,10,10,5,5,0,0,0,10,0,0,-1,0,0,0,0,0,0,0,0,2,5");break;}
   case "5":{a=getSetting("BASE_PRESET_5_VALUE","0,0,0,0,0,0,22,0,17,22,5,20,10,10,5,5,0,0,0,0,0,6,-1,0,0,0,0,0,0,0,0,2,5");break;}
   default:{return null;}
 }
 return a.split(",");
}

function saveBaseTypeValues(a,t){
 switch(t){
   case "1":{setSetting("BASE_PRESET_1_VALUE",a.join(","));break;}
   case "2":{setSetting("BASE_PRESET_2_VALUE",a.join(","));break;}
   case "3":{setSetting("BASE_PRESET_3_VALUE",a.join(","));break;}
   case "4":{setSetting("BASE_PRESET_4_VALUE",a.join(","));break;}
   case "5":{setSetting("BASE_PRESET_5_VALUE",a.join(","));break;}
 }
}

function fillCells(b,t){
 var c,v = getBaseTypeValues(t);
 var a = document.evaluate("//a[contains(@href,'base.aspx?base="+b+"')]",document,null,9,null).singleNodeValue;
 for(var i=2;i<a.parentNode.parentNode.childNodes.length;i++){
   if(a.parentNode.parentNode.childNodes[i].childNodes.length==1){
     if(a.parentNode.parentNode.childNodes[i].childNodes[0].style.color=="blue") a.parentNode.parentNode.childNodes[i].childNodes[0].style.color="white";
     if(a.parentNode.parentNode.childNodes[i].childNodes[0].style.color == "red") a.parentNode.parentNode.childNodes[i].removeChild(a.parentNode.parentNode.childNodes[i].childNodes[0]);
   }
   if(t=="clear") continue;
   if(v[i-2]=="-1") continue;
   if(a.parentNode.parentNode.childNodes[i].childNodes.length==1){
     if(parseInt(a.parentNode.parentNode.childNodes[i].childNodes[0].textContent)<v[i-2])
     a.parentNode.parentNode.childNodes[i].childNodes[0].style.color="blue";
   }else if(v[i-2]>0){
     c = document.createElement("small");
     c.style.color = "red";
     c.textContent = v[i-2];
     a.parentNode.parentNode.childNodes[i].appendChild(c);
   }
 }
}

function insertEditRows(){
 var t = ["1","2","3","4","5"];
 var n = ["Economy","Production","Research","JumpGate","Capitol"];
 var i,r,d,v;
 GM_addStyle('#empire_structures TH{color:#fff;}');
 for(var j=0;j<t.length;j++){
   r = document.createElement("tr");
   r.setAttribute("align","center");
   r.setAttribute("id",t[j]);
   d = document.createElement("td");
   d.setAttribute("align","right");
   d.setAttribute("style","padding-right:5px");
   d.colspan = 2;
   d.innerHTML = "<b>"+n[j]+"</b>";
   r.appendChild(d);
   v = getBaseTypeValues(t[j]);
   for(i=0;i<=32;i++){
     d = document.createElement("td");
     if(i!=22) d.innerHTML ="<input type='text' size='1.5' value='"+v[i]+"'>";
     r.appendChild(d);
   }
   document.getElementsByTagName('table')[6].firstChild.appendChild(r);
 }
 document.getElementById('empire_structures').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.firstChild.innerHTML=document.getElementById('empire_structures').firstChild.firstChild.firstChild.innerHTML;
 document.getElementById('empire_structures').firstChild.removeChild(document.getElementById('empire_structures').firstChild.firstChild);
 r = document.createElement("center");
 r.setAttribute("style","padding-left:0px;margin-top:-4px;");
 d = document.createElement("input");
 d.setAttribute("type","button");
 d.setAttribute("value","Cancel");
 d.setAttribute("id","Cancel");
 d.setAttribute("style","margin-right:12px;");
 r.appendChild(d);
 d.addEventListener('click',function(event){window.location=wlh.replace("&mode=edit","");},true);
 d = document.createElement("input");
 d.setAttribute("type","button");
 d.setAttribute("value","Save");
 d.setAttribute("id","save");
 r.appendChild(d);
 d.addEventListener('click',function(event){saveNewBaseTypeValues();window.location=wlh.replace("&mode=edit","");},true);
 document.body.appendChild(r);
}

function saveNewBaseTypeValues(){
 var i,a;
 var r = document.evaluate("//tr[@id='1' or @id='2' or @id='3' or @id='4' or @id='5']",document,null,7,null);
 for(var j=0;j<r.snapshotLength;j++){
   a = [];
   for(i=1;i<r.snapshotItem(j).childNodes.length;i++){
     if(i!=23) a[i-1]=r.snapshotItem(j).childNodes[i].firstChild.value;
     else a[i-1]="-1";
   }
   saveBaseTypeValues(a,r.snapshotItem(j).getAttribute("id"));
 }
}

/**** Credits History ****/
function sumCreditsPage(){
 var r,d=0,i=0,o=0,p=0,l=0,a=0,c=0,b=0;t=0,u=0,g=0,h=0,x=1;
 var cont = document.getElementById('credits_table').firstChild.childNodes[1].firstChild;
 var rows = cont.firstChild.firstChild.childNodes;
 do{
   r = /<tr[^>]+><td[^<]+\d<\/td><td>(.+?)<\/td><td>([^<]+)<\/td><td>[^<]+<\/td><\/tr>/ig.exec(document.body.innerHTML);
   if(r){
     if(r[1].indexOf('Pillage of') !== -1){p += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_p');}
     else if(r[1].indexOf('Empire Income') !== -1){i += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_i');}
     else if(r[1].indexOf('Debris collect') !== -1){d += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_d');}
     else if(r[1].indexOf('Production') !== -1 || r[1].indexOf('production') !== -1){a += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_a');}
     else if(r[1].indexOf('Construction') !== -1 || r[1].indexOf('construction') !== -1){c += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_c');}
     else if(r[1].indexOf('Research of') !== -1 || r[1].indexOf('research of') !== -1){b += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_b');}
     else if(r[1].indexOf('New trade route') !== -1 || r[1].indexOf('inactive trade') != -1){t += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_t');}
     else if(r[1].indexOf('Plunder of trade route') !== -1){u += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_u');}
     else if(r[1].indexOf('Sale of') !== -1){g += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_g');}
     else if(r[1].indexOf('Repair of') !== -1){h += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_h');}
     else if(parseInt(cleanNumbers(r[2])) > 0){o += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_o');}
     else {l += parseInt(cleanNumbers(r[2]));rows[x].setAttribute('class','cr_l');}
   } x++;
 } while(r);
 var html = "<table style='margin:0 auto;' cellpadding=3><tr><th align='center' colspan=5>Credit Summary<br>&nbsp;</th></tr>"+
   "<tr><td><a href='javascript:void(1);' id='cr_i'>Income</a>:</td><td align='right'>"+commaFormat(i)+"</td><td>&nbsp;</td><td><a href='javascript:void(1);' id='cr_a'>Production</a>:</td><td align='right'>"+commaFormat(a)+"</td></tr>"+
   "<tr><td><a href='javascript:void(1);' id='cr_d'>Debris Collect</a>:</td><td align='right'>"+commaFormat(d)+"</td><td>&nbsp;</td><td><a href='javascript:void(1);' id='cr_c'>Construction</a>:</td><td align='right'>"+commaFormat(c)+"</td></tr>"+
   "<tr><td><a href='javascript:void(1);' id='cr_p'>Pillage</a>:</td><td align='right'>"+commaFormat(p)+"</td><td>&nbsp;</td><td><a href='javascript:void(1);' id='cr_b'>Research</a>:</td><td align='right'>"+commaFormat(b)+"</td></tr>"+
   "<tr><td><a href='javascript:void(1);' id='cr_u'>Plundered Trade Routes</a>:</td><td align='right'>"+commaFormat(u)+"</td><td>&nbsp;</td><td><a href='javascript:void(1);' id='cr_t'>New Trade Routes</a>:</td><td align='right'>"+commaFormat(t)+"</td></tr>"+
   "<tr><td><a href='javascript:void(1);' id='cr_g'>Sale of goods</a>:</td><td align='right'>"+commaFormat(g)+"</td><td>&nbsp;</td><td><a href='javascript:void(1);' id='cr_h'>Ship Repair</a>:</td><td align='right'>"+commaFormat(h)+"</td></tr>"+
   "<tr><td><a href='javascript:void(1);' id='cr_o'>Other Income</a>:</td><td align='right'>"+commaFormat(o)+"</td><td>&nbsp;</td><td><a href='javascript:void(1);' id='cr_l'>Other Expenses</a>:</td><td align='right'>"+commaFormat(l)+"</td></tr>"+
   "<tr><td colspan=2 align='right'><br><a href='javascript:void(1);' id='cr_all'>Total In/Out</a>:</td><td style='font-weight:700;'><br>"+commaFormat((i+d+p+g+a+c+b+t+u+h+o+l))+"</td><td colspan=2>&nbsp;</td></tr>"+
   "</table>&nbsp;";
 cont.innerHTML = html + cont.innerHTML;
 rows = document.evaluate("//a[contains(@id,'cr_')]",document,null,7, null);
 for(x=0;x<rows.snapshotLength;x++){
  rows.snapshotItem(x).addEventListener('click',function(){toggleCreditRows(this.id);},false);
 }
}

function toggleCreditRows(d){
 var r = document.getElementById('credits_table').firstChild.childNodes[1].firstChild.childNodes[2].firstChild.childNodes;
 for(var x=1;x<r.length;x++){
  if(d=='cr_all' || r[x].className == d) r[x].style.display='';
  else r[x].style.display='none';
 }
}

/**** Fleet ****/
function moveRedirect(){
 if(document.getElementById('time1')) return;
 var l=document.createElement('span');
 l.style.fontWeight='500';
 l.innerHTML="<span style='margin-right:20px;font-weight:900;'>Redirect:</span><label style='display:inline-block;text-align:center;font-size:11px;cursor:pointer;' for='moveRedir'>Return<br>here</label><input type='checkbox' id='moveRedir' style='margin:0 20px 0 6px;'><label style='display:inline-block;text-align:center;font-size:11px;cursor:pointer;' for='moveFlt'>Empire<br>Fleets</label><input type='checkbox' id='moveFlt' style='margin:0 20px 0 6px;'><label style='display:inline-block;text-align:center;font-size:11px;cursor:pointer;' for='moveSyst'>Current<br>System</label><input type='checkbox' id='moveSyst' style='margin:0 40px 0 6px;'>";
 document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue.parentNode.previousSibling.appendChild(l);
 document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue.parentNode.parentNode.firstChild.style.textAlign='right';
 document.forms[1].addEventListener('submit',function(){if(document.getElementById('moveFlt').checked) setSetting('redirect','empire.aspx?view=fleets');else if(document.getElementById('moveSyst').checked) setSetting('redirect','map.aspx?loc='+document.getElementById('start').innerHTML.substr(0,9));else if(document.getElementById('moveRedir').checked) setSetting('redirect',wlh.split('/')[3]);},true);
 document.getElementById('moveSyst').addEventListener('click',function(){if(this.checked){document.getElementById('moveRedir').checked=false;document.getElementById('moveFlt').checked=false;}},false);
 document.getElementById('moveRedir').addEventListener('click',function(){if(this.checked){document.getElementById('moveSyst').checked=false;document.getElementById('moveFlt').checked=false;}},false);
 document.getElementById('moveFlt').addEventListener('click',function(){if(this.checked){document.getElementById('moveSyst').checked=false;document.getElementById('moveRedir').checked=false;}},false);
}

function createMoveFleetLinks(nf,ss,as,t){
 var s = document.evaluate("//td/b",document,null,7, null),st={},i=0,h="javascript:",u=["Recycler","Scout Ship","Outpost Ship","Carrier","Fleet Carrier"],a=["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Destroyer","Frigate","Ion Frigate","Cruiser","Heavy Cruiser","Battleship","Dreadnought","Titan","Leviathan","Death Star"];
 while(i<s.snapshotLength){st[s.snapshotItem(i).textContent]=true;i++;}
 for(i=0;i<u.length;i++){if(st[u[i]]==true) h=h+ss+"('"+u[i]+"');";}
 if(nf && st[a[0]]==true){h=h+"zero('Fighters');";i=1;}
 else i=0;
 for(i;i<a.length;i++){if(st[a[i]]==true) h=h+as+"('"+a[i]+"');";}
 if(h=='javascript:') h=h+"void(1);";
 return '<a href="'+h+'">'+t+'</a> - ';
}

function fleetSummary(){
 if(!document.getElementById('empire_units_summary')) return;
 document.getElementById('empire_units_summary').width='350px';
 var t=document.getElementById('empire_units_summary').parentNode.insertBefore(document.createElement('table'),document.getElementById('empire_units_summary'));
 t.setAttribute('style','width:'+document.getElementById('empire_units_units').width+';border:0;background:transparent none;');
 t=t.insertRow(0);
 t.insertCell(0);
 t.insertCell(1);
 t.firstChild.appendChild(document.getElementById('empire_units_summary'));
 t.firstChild.firstChild.setAttribute('style','position:relative;left:4%;');
 t=t.lastChild.appendChild(document.getElementById('empire_units_summary').cloneNode(true));
 t.setAttribute('style','position:relative;right:4%;');
 t.id='aetEUS';
 var d=document.evaluate("//table[@id='empire_units_units']//table//tr",document,null,7,null);
 var r=document.evaluate("//table[@id='aetEUS']//table//td",document,null,7,null);
 r.snapshotItem(0).innerHTML="<b>Available Fleets</b>";
 r.snapshotItem(1).innerHTML=parseInt(document.getElementById('empire_units_summary').firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[5].lastChild.textContent)-parseInt(r.snapshotItem(1).innerHTML);
 r.snapshotItem(2).innerHTML="<b>Empty Hanger Space</b>";
 r.snapshotItem(3).innerHTML=0;
 r.snapshotItem(4).innerHTML="<b>Hanger Capacity</b>";
 r.snapshotItem(5).innerHTML=0;
 r.snapshotItem(6).innerHTML="<b>Recycling Capacity</b>";
 r.snapshotItem(7).innerHTML=0;
 r.snapshotItem(8).innerHTML="<b>Fighting Fleet</b>";
 r.snapshotItem(9).innerHTML=0;
 r.snapshotItem(10).innerHTML="<b>Utility Fleet</b>";
 r.snapshotItem(11).innerHTML=0;
 var h={5:1,10:1,30:2,60:2},c={80:4,120:4,200:4,400:60,500:8,2000:40,2500:400,10000:200,50000:1000,200000:4000,500000:10000},a=0;
 for(var i=1;i<d.snapshotLength;i++){
  a=cleanNumbers(d.snapshotItem(i).childNodes[2].textContent);
  if(h[a] && (a==5 || d.snapshotItem(i).lastChild.textContent!=d.snapshotItem(1).lastChild.textContent)) r.snapshotItem(3).innerHTML=parseInt(cleanNumbers(r.snapshotItem(3).innerHTML))-(parseInt(cleanNumbers(d.snapshotItem(i).childNodes[1].textContent))*h[a]);
  else if(a==30){
   r.snapshotItem(7).innerHTML=commaFormat(parseInt(cleanNumbers(d.snapshotItem(i).childNodes[1].textContent))*10)+' /hr';
   r.snapshotItem(11).innerHTML=parseInt(cleanNumbers(d.snapshotItem(i).childNodes[3].textContent));
   continue;
  }
  if(c[a]) r.snapshotItem(5).innerHTML=parseInt(cleanNumbers(r.snapshotItem(5).innerHTML))+(parseInt(cleanNumbers(d.snapshotItem(i).childNodes[1].textContent))*c[a]);
  if(a==100 || a==400 || a==2500) r.snapshotItem(11).innerHTML=parseInt(r.snapshotItem(11).innerHTML)+parseInt(cleanNumbers(d.snapshotItem(i).childNodes[3].textContent));
  else if(a==40 && d.snapshotItem(i).lastChild.textContent.split('/')[1]==d.snapshotItem(1).lastChild.textContent.split('/')[1]) r.snapshotItem(11).innerHTML=parseInt(r.snapshotItem(11).innerHTML)+parseInt(cleanNumbers(d.snapshotItem(i).childNodes[3].textContent));
  else r.snapshotItem(9).innerHTML=parseInt(r.snapshotItem(9).innerHTML)+parseInt(cleanNumbers(d.snapshotItem(i).childNodes[3].textContent));
 } 
 r.snapshotItem(3).innerHTML=commaFormat(parseInt(r.snapshotItem(5).innerHTML)+(r.snapshotItem(3).innerHTML*1));
 r.snapshotItem(5).innerHTML=commaFormat(r.snapshotItem(5).innerHTML);
 r.snapshotItem(9).innerHTML=commaFormat(r.snapshotItem(9).innerHTML);
 r.snapshotItem(11).innerHTML=commaFormat(r.snapshotItem(11).innerHTML);
}

function insertMoveFleetLinks(){
 if(document.getElementById('time1')) return;
 var a=document.evaluate("//a[text()='All']",document,null,9,null).singleNodeValue;
 if(a==null) return;
 a.setAttribute('accesskey','A');
 a.setAttribute('title','Alt-shift-A');
 a=a.parentNode;
 var n=a.childNodes[2];
 a.removeChild(n);
 a.innerHTML = a.innerHTML+createMoveFleetLinks(true,'maxquant','maxquant','all(no FT)')+createMoveFleetLinks(false,'maxquant','zero','support')+createMoveFleetLinks(false,'zero','maxquant','attack')+createMoveFleetLinks(true,'zero','maxquant','attack(no FT)');
 a.setAttribute("colspan","3");
 a.parentNode.removeChild(a.nextSibling);
 a.parentNode.removeChild(a.previousSibling);
 n.setAttribute('accesskey','X');
 n.setAttribute('title','Alt-shift-X');
 a.appendChild(n);
}

function insertMoveIncrements(){
 if(document.getElementById('time1')) return;
 var a = document.evaluate("//input[@type='text']",document,null,7,null),b;
 var i=(document.getElementById('quickJump'))?2:1;
 if(wlh.indexOf('use=wormhole')!=-1) i--;
 for(i;i<a.snapshotLength;i++){
   a.snapshotItem(i).parentNode.style.whiteSpace='nowrap';
   b=document.createElement('input');
   b.type='button';
   b.setAttribute('style','margin-right:3px;');
   b.className='AETbut';
   b.id='decrement-'+a.snapshotItem(i).name;
   b.value='-';
   a.snapshotItem(i).parentNode.insertBefore(b,a.snapshotItem(i));
   b.addEventListener('click',function(){incrementMove(this.id);unsafeWindow.update(this.id.split('-')[1]);},false);
   b=document.createElement('input');
   b.type='button';
   b.setAttribute('style','margin-right:3px;');
   b.className='AETbut';
   b.id='zero-'+a.snapshotItem(i).name;
   b.value='0';
   a.snapshotItem(i).parentNode.insertBefore(b,a.snapshotItem(i));
   b.addEventListener('click',function(){incrementMove(this.id);unsafeWindow.update(this.id.split('-')[1]);},false);
   b=document.createElement('input');
   b.type='button';
   b.setAttribute('style','margin-right:3px;');
   b.className='AETbut';
   b.id='increment-'+a.snapshotItem(i).name;
   b.value='+';
   a.snapshotItem(i).parentNode.insertBefore(b,a.snapshotItem(i));
   b.addEventListener('click',function(){incrementMove(this.id);unsafeWindow.update(this.id.split('-')[1]);},false);
 }
}

function incrementMove(s){
 if(s.split('-')[0]=='increment') document.getElementById('quant'+s.split('-')[1]).value=Math.min(parseInt(document.getElementById('avail'+s.split('-')[1]).innerHTML),((isNaN(parseInt(document.getElementById('quant'+s.split('-')[1]).value))?0:parseInt(document.getElementById('quant'+s.split('-')[1]).value))+1));
 else if(s.split('-')[0]=='zero') document.getElementById('quant'+s.split('-')[1]).value='';
 else if(parseInt(document.getElementById('quant'+s.split('-')[1]).value)>0) document.getElementById('quant'+s.split('-')[1]).value=parseInt(document.getElementById('quant'+s.split('-')[1]).value)-1;
 document.getElementById('quant'+s.split('-')[1]).focus();
}

function insertMoveDefault(){
 if(document.getElementById('time1')) return;
 var a = document.evaluate("//input[@type='text']",document,null,7,null);
 a=(document.getElementById('quickJump'))?a.snapshotItem(1):a.snapshotItem(0);
 if(a==null) return;
 var c = document.createElement('a');
 c.href='javascript:calc_distance();';
 c.setAttribute('style','margin-right:6px;font-size:11px;');
 c.innerHTML='Start';
 a.parentNode.insertBefore(c,a);
 c.addEventListener('click',function(){a.value=document.getElementById('start').innerHTML;a.setAttribute('style','');},true);
 c = document.createElement('a');
 c.href='javascript:calc_distance();';
 c.setAttribute('style','margin-left:6px;font-size:11px;');
 if(getSetting('defaultMoveDestination','')=='') c.innerHTML='Set&nbsp;Default';
 else{
   c.innerHTML='Clear&nbsp;Default';
   a.value=getSetting('defaultMoveDestination','');
   a.setAttribute('style','border-color:red;');
 }
 a.parentNode.appendChild(c);
 c.addEventListener('click',function(){
   if(c.innerHTML=='Set&nbsp;Default'){
     setSetting('defaultMoveDestination',a.value);
     c.innerHTML='Clear&nbsp;Default';
     a.setAttribute('style','border-color:red;');
   }else{
     setSetting('defaultMoveDestination','');
     c.innerHTML='Set&nbsp;Default';
     a.setAttribute('style','');
   }
 },true);
 window.setTimeout('calc_distance()',0);
}

function insertSetAsDefaultDest(){
 var a = document.evaluate("//a[contains(@href,'bookmarks.aspx?action=add')]",document,null,9,null).singleNodeValue;
 if(!a) return;
 var b = document.createElement('input');
 b.type='button';
 b.classNmae='AETbut';
 b.setAttribute('style','padding:1px 2px;font-weight:900;font-size:11px;position:relative;top:7px;');
 b.value='Set as Default Destination';
 a.parentNode.appendChild(document.createElement('br'));
 a.parentNode.appendChild(b);
 b.addEventListener('click',function(){setSetting('defaultMoveDestination',a.href.split('=')[2]);},false);
}

function checkMoveLocations(){
 if(!document.getElementById('fleet_move')) return;
 var c=document.getElementById('fleet_move').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.firstChild.childNodes;
 c[0].parentNode.style.verticalAlign='bottom';
 var i=/\w\d\d:\d\d:\d\d:\d\d/.exec(document.getElementsByName('destination')[0].value);
 c[0].innerHTML="<div style='position:relative;left:6px;display:none;' id='"+document.getElementById('start').innerHTML+"_b'></div>";
 c[2].innerHTML="<div style='position:relative;left:6px;display:none;' id='"+i+"d_b'></div>";
 var a=document.createElement('a');
 a.href='javascript:void(1);';
 a.id='checkStart';
 a.style.fontSize='11px';
 a.innerHTML='Check It';
 c[0].insertBefore(a,c[0].firstChild);
 a.addEventListener('click',function(){if(document.getElementById(document.getElementById('start').innerHTML+'_b').style.display=='none'){document.getElementById(document.getElementById('start').innerHTML+'_b').style.display='block';document.getElementById('checkStart').innerHTML='Hide It';getSystemId('http://'+wlh.split('.')[0].split('/')[2]+'.astroempires.com/map.aspx?loc='+document.getElementById('start').innerHTML,false,0);}else{document.getElementById(document.getElementById('start').innerHTML+'_b').style.display='none';document.getElementById(document.getElementById('start').innerHTML+'_b').innerHTML='';document.getElementById('checkStart').innerHTML='Check It';}document.getElementById('quickJump').value=document.getElementById('start').innerHTML;},false);
 a=document.createElement('a');
 a.href='javascript:void(1);';
 a.id='checkDest';
 a.style.fontSize='11px';
 a.innerHTML='Check It';
 c[2].insertBefore(a,c[2].firstChild);
 a.addEventListener('click',function(){if(document.getElementById(i+'d_b').style.display=='none'){document.getElementById(i+'d_b').style.display='block';document.getElementById('checkDest').innerHTML='Hide It';getSystemId('http://'+wlh.split('.')[0].split('/')[2]+'.astroempires.com/map.aspx?loc='+/\w\d\d:\d\d:\d\d:\d\d/.exec(document.getElementsByName('destination')[0].value),false,0,i);}else{document.getElementById(i+'d_b').style.display='none';document.getElementById(i+'d_b').innerHTML='';document.getElementById('checkDest').innerHTML='Check It';}document.getElementById('quickJump').value=/\w\d\d:\d\d:\d\d:\d\d/.exec(document.getElementsByName('destination')[0].value);},false);
}

function showMoveQL(){
 if(!document.getElementById('fleet_move') && !document.getElementById('base_new-trade')) return;
 if(document.getElementById('base_new-trade')) var c=document.getElementById('base_new-trade').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.lastChild.firstChild;
 else var c=document.getElementById('fleet_move').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.lastChild.firstChild;
 c.parentNode.style.verticalAlign='top';
 if(getSetting('quickLinksTemp','')=='') return;
 var l=getSetting('quickLinksTemp','').split('|:|'),u;
 var h="<span style='font-size:14px;position:relative;top:-24px;'>QuickLinks</span><br><span style='font-size:10px;font-weight:500;position:relative;top:-18px;'>";
 for(var i=0;i<l.length;i++){
   u=/^(\w\d\d:\d\d:\d\d:\d\d)$/.exec(unescape(l[i].split('|')[1]).split('=')[1]);
   if(!u || !u[1]) continue;
   if(unescape(l[i].split('|')[0]) == u[1]) h+="<a style='margin-bottom:3px;display:inline-block;' href='javascript:fastloc(\""+u[1]+"\");'>"+unescape(l[i].split('|')[0])+'</a><br>';
   else h+="<a style='margin-bottom:3px;display:inline-block;' href='javascript:fastloc(\""+u[1]+"\");'>"+unescape(l[i].split('|')[0])+' ('+u[1]+')</a><br>';
 } h+="</span>";
 c.innerHTML=h;
}

function useWormhole(){
 var a=document.evaluate("//th[contains(@colspan,'7')]",document.getElementById('fleet_move'),null,9,null).singleNodeValue;
 if(a==null) return;
 var c=document.getElementById('fleet_move').firstChild.firstChild.firstChild.insertBefore(document.createElement('div'),document.getElementById('fleet_move').firstChild.firstChild.firstChild.firstChild);
 c.setAttribute('style',"float:right;");
 c.innerHTML=a.innerHTML;
 a.parentNode.parentNode.removeChild(a.parentNode);
}

function enableMovePresets(){
 if(!document.getElementById('fleet_move')) return;
 var c=(document.getElementById('mvp'))?document.getElementById('mvp'):document.getElementById('fleet_move').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[4];
 var f=wlh.split('=')[1].split('&')[0];
 if(document.getElementById('sat')) document.getElementById('sat').innerHTML='';
 if(document.getElementById('mvp')) c.innerHTML='';
 else{
   c.setAttribute('colspan','3');
   c.setAttribute('width','40%');
   c.parentNode.removeChild(c.nextSibling);
   c.parentNode.removeChild(c.nextSibling);
 }
 c.innerHTML="<div style='display:none;' id='moveTime'>"+getCurrentServerTime()+"</div>";
 var a=document.createElement('a');
 c.id='mvp';
 c.appendChild(a);
 if(getSetting('mv_p_'+f,'')==''){
   a.href='javascript:void(1);';
   a.innerHTML='Set Move Preset';
   a.setAttribute('style','position:relative;top:-10px;');
   a.addEventListener('click',function(){setMovePreset(f);},false);
 }else{
   a.href='javascript:calc_distance();';
   a.innerHTML='Use Preset';
   a.setAttribute('style','position:relative;top:-10px;');
   a.addEventListener('click',function(){getMovePreset(f);},false);
   a=document.createElement('span');
   a.setAttribute('style','margin:0 10px;position:relative;top:-10px;');
   a.innerHTML='-';
   c.appendChild(a);
   a=document.createElement('a');
   a.href='javascript:void(1);';
   a.setAttribute('style','font-size:10px;font-weight:500;position:relative;top:-10px;');
   a.innerHTML='Delete';
   c.appendChild(a);
   a.addEventListener('click',function(){if(!confirm('Are you sure you want to delete this move preset?')) return;setSetting('mv_p_'+f,'');enableMovePresets();},false);
 }
 if(getSetting('config_autoLaunch',true)){
   a=document.createElement('div');
   a.innerHTML="<a href='javascript:void(1);' style='margin:-34px 0 0 -4%;font-size:10px;font-weight:500;position:absolute;'>SET AUTO MOVE</a>";
   c=document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue.parentNode;
   a.id='sat';
   c.insertBefore(a,c.firstChild);
   a.addEventListener('click',function(){setAutoLaunch(f);},false);
   if(getSetting('mv_a_'+f,'')!='' && !getSetting('auto_'+f,false)) setAutoLaunch(f);
 }
 if(getSetting('auto_'+f,false)){
   setSetting('auto_'+f,'');
   getMovePreset(f);
   setSetting('mv_p_'+f,'');
   setSetting('FleetReminders','-');
   setSetting('autoMoveResult',f);
   document.forms[1].submit();
 }
}

function setAutoLaunch(f){
 var c=(document.getElementById('sal'))?document.getElementById('sal'):document.createElement('div');
 c.setAttribute('style',"color:#FFE;font:500 14px arial;padding:10px;text-align:center;z-index:1;position:fixed;top:"+(document.getElementById('fleet_move').offsetTop-9)+"px;left:"+((document.body.offsetWidth/2)-381)+";border:1px solid #FF6464;background:rgba(0,0,0,.7) none;width:510px;background:#000 none;");
 c.id='sal'
 if(getSetting('mv_a_'+f,'')!=''){
   getMovePreset(f);
   unsafeWindow.calc_distance();
   if(document.getElementById('moveRedir')) document.getElementById('moveRedir').checked=false;
   if(document.getElementById('moveSyst')) document.getElementById('moveSyst').checked=false;
   if(document.getElementById('moveFlt')) document.getElementById('moveFlt').checked=false;
   var h="<a id='toglAN' href='javascript:void(1);' style='position:absolute;left:8px;top:64px;font-size:10px;'>[ "+(getSetting('hideAutoNotes',false)?"SHOW":"HIDE")+" HELP ]</a>";
   if(document.getElementById('sat')) document.getElementById('sat').style.visibility='hidden';
   c.style.position='absolute';
   c.style.top=(parseInt(c.style.top)+document.getElementById('detect').offsetTop+12)+'px';
   c.innerHTML="<span style='font:900 20px system;background:#000 none;margin-left:80px;'>-- AutoMove is Set for this Fleet --</span>"+
   "<h3 style='margin:6px 0 0 66px;padding:6px 0 0 0;'>Move Time: "+getSetting('mv_a_'+f)+"</h3><div id='autoCounter' style='font-size:18px;font-weight:900;padding:0 6px;margin:-1px 0 -4px 80px;color:"+unescape(getSetting('config_highlightFinishColor',"#DDDDBF"))+";'>-</div><input type='button' class='AETbut' style='font-size:12px;padding:2px 4px;position:absolute;left:16px;top:30px;' value='Cancel'>"+
   h+"<p id='autoNotes' style='padding:6px;text-align:left;background:#000 none;'><b>This page must be open during the launch time.<br>If you don't see the count down timer above, the fleet will not launch.</b><br><br>You may leave this page and return at any time before the launch time. If you return 3 seconds after the launch time, it will be ignored. Though, presets will still be entered in case you wish to launch manually right away.<br><br>Preset values are entered when the page loads if a launch time is set. Preset values may be changed at any time before launch time. Presets can even be deleted. Presets are cleared if the fleet launches so you don't have a bunch of old settings in memory. To view or clear preset data, see the <a href='/fleets.aspx'>fleets</a> page and click 'View Preset Data' at the top-right.<br><br><span style='font-weight:900;'>Only the actual values currently entered at launch time will be used.</span><br><br>Desination and ship quantities may be changed at anytime before launch.<br><br>Redirects are disabled so you can see your move results.<br><br>To change the launch time, cancel the current AutoMove and click 'Set AutoMove'. Your previous entry is remembered for easy edits.<br><br>If a 'Launch Reminder' is set, it will be disabled on this page if an AutoMove is set. This is so it will not disable this AutoMove. You want make sure to have another window/tab with the 'Launch Reminder' running so it is not missed. If a 'Launch Reminder' opens this page for auto launching, but you have an AutoMove set on this page, the 'Launch Reminder' will take over to complete its task.</p>";
   c.lastChild.previousSibling.previousSibling.addEventListener('click',function(){document.getElementById('moveTime').innerHTML=getSetting('mv_a_'+f);setSetting('mv_a_'+f,'');document.body.removeChild(document.getElementById('sal'));if(document.getElementById('sat')) document.getElementById('sat').style.visibility='visible';},false);
   document.body.appendChild(c);
   document.getElementById('toglAN').addEventListener('click',function(){if(document.getElementById('autoNotes').style.display=='none'){document.getElementById('autoNotes').style.display='block';document.getElementById('toglAN').textContent='[ HIDE HELP ]';setSetting('hideAutoNotes','')}else{document.getElementById('autoNotes').style.display='none';document.getElementById('toglAN').textContent='[ SHOW HELP ]';setSetting('hideAutoNotes',true)}},false);
   if(getSetting('hideAutoNotes',false)) document.getElementById('autoNotes').style.display='none';
   if(document.getElementById('fleetReminderDiv')) document.getElementById('fleetReminderDiv').parentNode.removeChild(document.getElementById('fleetReminderDiv'));
   autoLaunchCounter(f);
 }else{
   if(document.getElementById('moveTime').innerHTML=='undefined') var h=getCurrentServerTime();
   else var h=document.getElementById('moveTime').innerHTML;
   c.innerHTML="<span style='font:900 22px system;background:#000 none;'>-- Set AutoMove for this Fleet --</span><br><br><span style='background:#000 none;'>Enter the server time for the fleet to move.</span><br><input style='width:160px;text-align:center;' id='autoTime' value='"+h+"'><br>";
   if(document.getElementById('departDateSpan') && document.getElementById('departDateSpan').innerHTML!='') c.innerHTML+="<a href='javascript:void(1);' style='font-size:10px;font-weight:500;' id='useCalced'>Use Calculated Time</a><br>";
   c.innerHTML+="<a href='javascript:void(1);' style='font-weight:900;border:1px solid rgb(32,86,128);padding:2px 4px;background:rgb(0,0,68) none; display:inline-block;margin:20px;' id=''>Start AutoMove</a><a href='javascript:void(1);' style='border:1px solid rgb(32,86,128);padding:2px 4px;background:rgb(0,0,68) none;display:inline-block;margin:20px;' onclick='document.body.removeChild(document.getElementById(\"sal\"));'>Cancel</a>";
   c.lastChild.previousSibling.addEventListener('click',function(){setSetting('mv_a_'+f,document.getElementById('autoTime').value);setAutoLaunch(f);},false);
   document.body.appendChild(c);
   if(document.getElementById('useCalced')) document.getElementById('useCalced').addEventListener('click',function(){document.getElementById('useCalced').previousSibling.previousSibling.value=document.getElementById('departDateSpan').childNodes[2].innerHTML;},false);
 }
}

function autoLaunchCounter(f){
 if(!document.getElementById('autoCounter')) return;
 try{var s=parseInt((getDateObject(getSetting('mv_a_'+f)).getTime() - getDateObject().getTime() - new Date().getTime() + parseInt(document.getElementById('pageLoadTime').innerHTML))/1000);}catch(e){notify(e,"notifierError");return;}
 if(s<60) document.getElementById('autoCounter').style.color=unescape(getSetting('config_highlightNowColor',"#F99"));
 else if(s<3600) document.getElementById('autoCounter').style.color=unescape(getSetting('config_highlightTodayColor',"#7896DE"));
 if(s<-2){
   document.getElementById('autoCounter').innerHTML="Fleet Did Not Launch";
   setSetting('mv_a_'+f,'');
   return;
 }
 if(s<1){
   document.getElementById('autoCounter').innerHTML="Launching";
   setSetting('mv_a_'+f,'');
   setSetting('mv_p_'+f,'');
   setSetting('autoMoveResult',f);
   document.forms[1].submit();
   return;
 }
 document.getElementById('autoCounter').innerHTML="<span style='font-size:11px;font-weight:500;color:"+unescape(getSetting('config_overrideText','#FFE'))+"'>Move in</span> "+getTimeDisplay(s);
 setTimeout(function(){autoLaunchCounter(f);},1000);
}

function setMovePreset(f){
 if(confirm('This will preset the destination and ship quantities that you currently have entered for this fleet.')){
   var u=document.getElementById('units').value.split(','),s=/\w\d\d:\d\d:\d\d:\d\d/.exec(document.getElementsByName('destination')[0].value);
   if(document.getElementById('duration').innerHTML==''){
     alert('Destination or fleet is not set.');
     return;
   }
   else if(s!=null) s+='|';
   else{
     alert('Destination is not a valid location.');
     return;
   }
   for(var i=0;i<u.length;i++){
     s+='&'+u[i]+'='+document.getElementById('quant'+u[i]).value;
   }
   setSetting('mv_p_'+f,s);
   notify('Move Preset is Stored.');
   enableMovePresets();
 }else return;
}

function getMovePreset(f){
 if(getSetting('mv_p_'+f,'')=='') return;
 var a=getSetting('mv_p_'+f,'').split('|'),i=0;
 if(document.getElementById('destination')) document.getElementById('destination').value=a[0];
 else{
   var d=document.getElementsByName('destination')[0].childNodes;
   for(i;i<d.length;i++){
     if(d[i].value==a[0]){
       document.getElementsByName('destination')[0].selectedIndex=i;
       break;
     }
   }
 }
 var b=a[1].split('&');
 for(i=1;i<b.length;i++){
   document.getElementById('quant'+b[i].split('=')[0]).value=b[i].split('=')[1];
   unsafeWindow.update(b[i].split('=')[0]);
 }
}

function systemFleetScan(){
 var l = document.evaluate("//center",document,null,7,null);
 if(l.snapshotItem(0).firstChild.childNodes[2] && l.snapshotItem(0).firstChild.childNodes[2].tagName.toUpperCase() == 'A') l=l.snapshotItem(0);
 else if(l.snapshotItem(1)!=null && l.snapshotItem(1).firstChild.childNodes[4] && l.snapshotItem(1).firstChild.childNodes[2].tagName.toUpperCase() == 'A') l=l.snapshotItem(1);
 else return;
 l.appendChild(document.createElement('br'));
 var b = document.createElement('label');
 b.innerHTML="<input type='checkbox' id='autoSystemScanB'>Bases";
 b.setAttribute('style','font-weight:500;font-size:11px;position:relative;top:7px;margin-right:8px;');
 l.appendChild(b);
 b = document.createElement('label');
 b.innerHTML="<input type='checkbox' id='autoSystemScanE'>Empty";
 b.setAttribute('style','font-weight:500;font-size:11px;position:relative;top:7px;margin-right:8px;');
 l.appendChild(b);
 b = document.createElement('input');
 b.type='button';
 b.setAttribute('style','padding:1px 2px;font-weight:900;font-size:11px;position:relative;top:5px;');
 b.className='AETbut';
 b.value='Scan for Fleets';
 l.appendChild(b);
 b.addEventListener('click',function(){doSystemFleetScan(l.nextSibling.nextSibling);},false);
 b = document.createElement('label');
 b.innerHTML="<input type='checkbox' id='autoSystemScan'>Auto";
 b.setAttribute('style','font-weight:500;font-size:11px;position:relative;top:7px;margin-left:4px;');
 l.appendChild(b);
 document.getElementById('autoSystemScan').checked=getSetting('autoSystemScan',false);
 document.getElementById('autoSystemScan').addEventListener('change',function(){setSetting('autoSystemScan',this.checked);},false);
 document.getElementById('autoSystemScanB').checked=getSetting('autoSystemScanB',true);
 document.getElementById('autoSystemScanB').addEventListener('change',function(){setSetting('autoSystemScanB',this.checked);},false);
 document.getElementById('autoSystemScanE').checked=getSetting('autoSystemScanE',true);
 document.getElementById('autoSystemScanE').addEventListener('change',function(){setSetting('autoSystemScanE',this.checked);},false);
 if(getSetting('autoSystemScan',false)) doSystemFleetScan(l.nextSibling.nextSibling);
}

function doSystemFleetScan(l){
 var a=document.evaluate("//div[contains(@style,'display: none')]",l,null,7,null),i=0,p=0;
 for(i;i<a.snapshotLength;i++){a.snapshotItem(i).parentNode.removeChild(a.snapshotItem(i));}
 if(getSetting('autoSystemScanE',true)){
  a=document.evaluate("//span/span",l,null,7,null);
  for(i=0;i<a.snapshotLength;i++){
    getSystemId('http://'+wlh.split('.')[0].split('/')[2]+'.astroempires.com/map.aspx?loc='+a.snapshotItem(i).id.split('_')[0],false,p);
    if(getSetting('systemScanThrottle','30')!='0') p+=parseInt(60000/parseInt(getSetting('systemScanThrottle','30')));
  }
 }
 if(getSetting('autoSystemScanB',true)){
  a=document.evaluate("//a[contains(@href,'profile.aspx?player=') and @id and not(contains(@id,'_c'))]",l,null,7,null);
  for(i=0;i<a.snapshotLength;i++){
    getSystemId('http://'+wlh.split('.')[0].split('/')[2]+'.astroempires.com/map.aspx?loc='+a.snapshotItem(i).id.split('_')[0],true,p);
    if(getSetting('systemScanThrottle','30')!='0') p+=parseInt(60000/parseInt(getSetting('systemScanThrottle','30')));
  }
 }
}

function getSystemId(a,u,p,i){
 setTimeout(function(){getSystemData(a,u,i);},p);
}

function getSystemData(a,u,i){
 var r = new XMLHttpRequest();
 var g,h=false;
 if(!i) i=a.split('=')[1];
 else h=true;
 r.open("GET",a,true);
 r.onreadystatechange=function(){
   if(r.readyState==4){
     var e=(u)?document.createElement('div'):((h)?document.getElementById(i+'d_b'):document.getElementById(i+'_b'));
     if(r.responseText.indexOf("<table id='map_fleets'")!=-1){
       var b=[],c=0,d=0,g=[],f=[],t={},x=0;
       while(b=/<td[^>]*><a href='fleet.aspx\?fleet=\d+'>([^<]+)<\/a><\/td><\/tr>/g.exec(r.responseText)){
         c++;
         d+=parseInt(b[1].replace(/[^\d]/g,''));
         f.push(b[1]);
       }
       while(b=/<tr[^>]*><td[^>]*><a href='fleet[^>]*>[^<]*<\/a><\/td><td[^>]*><a[^>]*>([^<]+)/g.exec(r.responseText)){
         g.push(b[1]);
       }
       for(x;x<g.length;x++){
         t[getGuild(g[x])]=(t[getGuild(g[x])])?parseInt(cleanNumbers(t[getGuild(g[x])]))+parseInt(cleanNumbers(f[x])):cleanNumbers(f[x]);
       }
       if(u) e.setAttribute('style','position:absolute;top:-39px;left:'+((document.getElementById(i+'_b').parentNode.offsetWidth/2)+(document.getElementById(i+'_b').parentNode.previousSibling.firstChild.width/2)+8)+'px;white-space:nowrap;color:'+unescape(getSetting('config_highlightNowColor','#F99'))+';padding:2px;z-index:2;');
       else{ e.style.color=unescape(getSetting('config_highlightNowColor','#F99'));e.style.padding='2px';}
       e.setAttribute('title',g.join(', '));
       e.innerHTML='<span><b>'+c+'</b> Fleet'+((c>1)?'s':'')+'<br>Total: <b>'+d+'</b></span>';
       if(getSetting('config_systemScanDetail',true)){
         e.firstChild.style.cursor='pointer';
         if(h) e.firstChild.addEventListener('click',function(){document.getElementById('ddetail_'+i).style.display='table';},false);
         else e.firstChild.addEventListener('click',function(){document.getElementById('detail_'+i).style.display='table';},false);
         var j=document.createElement('table');
         if(h) j.setAttribute('id','ddetail_'+i);
         else j.setAttribute('id','detail_'+i);
         j.setAttribute('style','z-index:1;position:relative;display:none;background:'+unescape(getSetting('config_overrideFormBack','#004'))+' none;color:'+unescape(getSetting('config_overrideText','#FFE'))+';cursor:pointer;margin:0 auto;');
         for(x in t){j.innerHTML+="<tr><td style='padding:3px;'>"+x+" </td><td> - </td><td style='padding:3px;'> "+commaFormat(t[x])+"</td></tr>"}
         if(h) j.addEventListener('click',function(){document.getElementById('ddetail_'+i).style.display='none';},false);
         else j.addEventListener('click',function(){document.getElementById('detail_'+i).style.display='none';},false);
         e.appendChild(j);
       }
     }else{
       if(u) e.innerHTML='no fleet';
       else e.innerHTML='- no fleet -';
     }
     if(u) document.getElementById(i+'_b').parentNode.appendChild(e);
   }
 }
 r.send(null);
}

function addFleetMoveShortcut(){
 if(!document.getElementById('fleets-list') || !document.getElementById('fleets-list').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild) return;
 var rows = document.getElementById('fleets-list').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes,i=0;
 for(i;i<rows.length;i++){
  rows[i].removeAttribute('width');
 }
 rows = document.getElementById('fleets-list').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 for(i=0;i<rows.length;i++){
  if(rows[i].childNodes[2] && rows[i].childNodes[2].innerHTML=='') rows[i].childNodes[2].innerHTML="<a style='font-size:8pt;' href='"+rows[i].firstChild.firstChild.href+"&view=move'>Move</a>";
  if(rows[i].childNodes[3] && rows[i].childNodes[3].innerHTML=='') rows[i].childNodes[3].innerHTML="<a style='font-size:8pt;' href='"+rows[i].firstChild.firstChild.href+"&view=attack'>Attack</a>";
  if(rows[i].childNodes[4]) rows[i].childNodes[4].innerHTML = commaFormat(rows[i].childNodes[4].innerHTML);
 }
 rows[0].parentNode.parentNode.nextSibling.align='center';
 rows[0].parentNode.parentNode.nextSibling.style.paddingTop='6px';
}

function getShipIndex(s){
 switch(s){
   case "Fighters":{return 0;}
   case "Bombers":{return 1;}
   case "Heavy Bombers":{return 2;}
   case "Ion Bombers":{return 3;}
   case "Corvette":{return 4;}
   case "Recycler":{return 5;}
   case "Destroyer":{return 6;}
   case "Frigate":{return 7;}
   case "Ion Frigate":{return 8;}
   case "Scout Ship":{return 9;}
   case "Outpost Ship":{return 10;}
   case "Cruiser":{return 11;}
   case "Carrier":{return 12;}
   case "Heavy Cruiser":{return 13;}
   case "Battleship":{return 14;}
   case "Fleet Carrier":{return 15;}
   case "Dreadnought":{return 16;}
   case "Titan":{return 17;}
   case "Leviathan":{return 18;}
   case "Death Star":{return 19;}
   case "Barracks":{return 20;}
   case "Laser Turrets":{return 21;}
   case "Missle Turrets":{return 22;}
   case "Plasma Turrets":{return 23;}
   case "Ion Turrets":{return 24;}
   case "Photon Turrets":{return 25;}
   case "Disruptor Turrets":{return 26;}
   case "Deflection Shields":{return 27;}
   case "Planetary Shield":{return 28;}
   case "Planetary Ring":{return 29;}
 }
}

function sumShips(rows){
 if(Math.round(new Date().getTime()/1000)>(parseInt(getSetting('lastBaseCheck',0))+(864000*3))) insertNotification('Base data has not been updated in over three days.<br>View the empire <a href="/empire.aspx?view=structures">structures page</a> and the program will refresh the data.<br><br>');
 var tables = document.evaluate("//table",document,null,7,null);
 if(tables.snapshotLength<7) return;
 var rows = document.evaluate(".//tr",tables.snapshotItem(6),null,7,null);
 if(rows.snapshotLength<=2) return;
 var s = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
 var ms = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
 var nm = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
 var v = [5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000];
 var ga=[];
 rows.snapshotItem(0).innerHTML=rows.snapshotItem(0).innerHTML;
 rows.snapshotItem(0).className='';
 rows.snapshotItem(0).firstChild.className='';
 rows.snapshotItem(0).childNodes[1].className='';
 rows.snapshotItem(0).lastChild.className='';
 rows.snapshotItem(0).firstChild.innerHTML=rows.snapshotItem(0).firstChild.firstChild.innerHTML;
 rows.snapshotItem(0).firstChild.firstChild.href="empire.aspx?view=fleets&order=fleet";
 rows.snapshotItem(0).childNodes[1].innerHTML=rows.snapshotItem(0).childNodes[1].firstChild.innerHTML;
 rows.snapshotItem(0).childNodes[1].firstChild.href="empire.aspx?view=fleets&order=location";
 rows.snapshotItem(0).lastChild.innerHTML="<div style='font:500 10px verdana;position:absolute;margin:-17px 4% 0;white-space:nowrap'>ATTACK / MOVE</div><a href='empire.aspx?view=fleets&order=size'>Attack Size / Size</a>";
 if(rows.snapshotLength>2){
  rows.snapshotItem(0).parentNode.nextSibling.appendChild(document.createElement('tr'));
  rows.snapshotItem(0).parentNode.nextSibling.lastChild.innerHTML="<td colspan=23 style='font-size:3px;'>&nbsp;</td>";
  rows.snapshotItem(0).parentNode.nextSibling.appendChild(rows.snapshotItem(0).cloneNode(true));
  rows.snapshotItem(0).parentNode.nextSibling.lastChild.lastChild.innerHTML="<div style='font:500 10px verdana;white-space:nowrap'>ATTACK / MOVE</div>";
  rows.snapshotItem(0).parentNode.nextSibling.lastChild.firstChild.innerHTML='&nbsp;';
  rows.snapshotItem(0).parentNode.nextSibling.lastChild.childNodes[1].innerHTML='&nbsp;';
 }
 var d,st,mc=0,ct=0,t=0,f=0,mt=0,mf=0,nt=0,nf=0,nc=0,g,n;
 for (var i=1;i<rows.snapshotLength;i++){
   ct=0;
   rows.snapshotItem(i).childNodes[1].firstChild.firstChild.title=rows.snapshotItem(i).childNodes[1].firstChild.firstChild.href.split('=')[1];
   if(rows.snapshotItem(i).childNodes[1].textContent.substr(-1)=='*') rows.snapshotItem(i).style.backgroundColor='#282814';
   t+=parseInt(cleanNumbers(rows.snapshotItem(i).lastChild.textContent));
   d=document.evaluate(".//td[@style]",rows.snapshotItem(i),null,7,null);
   g=rows.snapshotItem(i).childNodes[1].firstChild.firstChild.href.split("=")[1].match(/(A|B|C|D|E|F|G|H|I|J)(\d\d)/)[2];
   if(ga[g]==undefined){n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];ga[g]=[g,0,n,0,0];}
   for (var j=0;j<d.snapshotLength;j++){
     if(d.snapshotItem(j).textContent.length>0){
       st=parseInt(cleanNumbers(d.snapshotItem(j).textContent));
       if(getSetting('stripNumFormatFleet',true)) d.snapshotItem(j).innerHTML='<small>'+st+'</small>';
       s[j]=s[j]+st;
       if(isFightingShip(j)) ct+=v[j]*st;
       if(!isBase(rows.snapshotItem(i).childNodes[1].textContent)){
         ga[g][2][j]=ga[g][2][j]+st;
         ms[j]=ms[j]+st;
       }
       else nm[j]=nm[j]+st;
     }
   }
   f+=ct;
   if(!isBase(rows.snapshotItem(i).childNodes[1].textContent)){
     ga[g][4]+=parseInt(cleanNumbers(rows.snapshotItem(i).lastChild.textContent));
     ga[g][3]+=ct;
     ga[g][1]+=1;
     mt+=parseInt(cleanNumbers(rows.snapshotItem(i).lastChild.textContent));
     mf+=ct;
     mc+=1;
   }
   else{
     nt+=parseInt(cleanNumbers(rows.snapshotItem(i).lastChild.textContent));
     nf+=ct;
     nc+=1;
   }
   if(rows.snapshotItem(i).childNodes[1].textContent.substr(-1)=='*') rows.snapshotItem(i).lastChild.innerHTML=commaFormat(ct)+' / '+commaFormat(rows.snapshotItem(i).lastChild.textContent);
   else rows.snapshotItem(i).lastChild.innerHTML="<a href='fleet.aspx?fleet="+rows.snapshotItem(i).firstChild.firstChild.firstChild.href.split('=')[1]+"&view=attack'>"+commaFormat(ct)+"</a> / <a href='fleet.aspx?fleet="+rows.snapshotItem(i).firstChild.firstChild.firstChild.href.split('=')[1]+"&view=move'>"+commaFormat(rows.snapshotItem(i).lastChild.textContent)+'</a>';
 }
 insertTotalsRow(rows.snapshotItem(1).parentNode,s,ms,rows.snapshotLength - 1,mc,t,f,mt,mf,ga,nm,nf,nt,nc);
}

function saveBases(){
 var l = document.evaluate("//a[contains(@href,'base.aspx?base=')]",document,null,7,null);
 var b=[];
 for(var i=0;i<l.snapshotLength;i++){
   b[i]=l.snapshotItem(i).textContent+"="+l.snapshotItem(i).href.split("=")[1];
 }
 setSetting("bases",escape(b.join(",")));
 setSetting('lastBaseCheck', Math.round(new Date().getTime() / 1000));
}

function isBase(l){
 if(getSetting("bases",null)==null) return false;
 var b = unescape(getSetting("bases",null));
 for(var i=0;i<b.split(',').length;i++){
   if(l == b.split(',')[i].split("=")[0]) return true;
 }
 return false;
}

function isFightingShip(s){
 var a="11111011100101101111";
 return a.charAt(s)=="1";
}

function insertTotalsRow(n,s,ms,fc,mc,t,f,mt,mf,ga,nm,nf,nt,nc){
 var k,r=document.createElement("tr");
 var d=r.insertCell(0);
 d.setAttribute('style','font-size:3px;');
 d.setAttribute('colspan','23');
 d.innerHTML="&nbsp;";
 n.insertBefore(r,null);
 for(var i=0;i<ga.length;i++){
   if(i<10) i="0"+i;
   if(ga[i]==undefined || ga[i][1]==0) continue;
   r=document.createElement("tr");
   r.setAttribute('align','center');
   d=r.insertCell(0);
   d.innerHTML="Mobile Fleets (<a href='fleet.aspx?gal="+document.evaluate("//a[contains(@href,'?loc=')]",document,null,9,null).singleNodeValue.href.split('?loc=')[1].split('&')[0].split(/\d/)[0]+i+"'>"+i+"</a>)";
   d=r.insertCell(1);
   d.textContent=ga[i][1];
   for(k=0;k<20;k++){
     d=document.createElement("td");
     d.setAttribute("style","border:1px solid #000066;");
     if(ga[i][2][k]>0) d.innerHTML="<small>"+ga[i][2][k]+"</small>";
     r.insertBefore(d,null);
   }
   d=document.createElement("td");
   d.innerHTML=commaFormat(ga[i][3])+" / "+commaFormat(ga[i][4]);
   r.insertBefore(d,null);
   n.insertBefore(r,null);
 }
 r=document.createElement("tr");
 r.setAttribute('align','center');
 d=r.insertCell(0);
 d.textContent="Total Mobile Fleets";
 d=r.insertCell(1);
 d.textContent=mc;
 for(k=0;k<20;k++){
   d=document.createElement("td");
   d.setAttribute("style","border:1px solid #000066;");
   if(ms[k]>0) d.innerHTML="<small>"+ms[k]+"</small>";
   r.insertBefore(d,null);
 }
 d=document.createElement("td");
 d.innerHTML=commaFormat(mf)+" / "+commaFormat(mt);
 r.insertBefore(d,null);
 n.insertBefore(r,null);
 r=document.createElement("tr");
 r.setAttribute('align','center');
 d=r.insertCell(0);
 d.textContent="Base Fleets";
 d=r.insertCell(1);
 d.textContent=nc;
 for(k=0;k<20;k++){
   d=document.createElement("td");
   d.setAttribute("style","border:1px solid #000066;");
   if(nm[k]>0) d.innerHTML="<small>"+nm[k]+"</small>";
   r.insertBefore(d,null);
 }
 d=document.createElement("td");
 d.innerHTML=commaFormat(nf)+" / "+commaFormat(nt);
 r.insertBefore(d,null);
 n.insertBefore(r,null);
 r=document.createElement("tr");
 r.setAttribute('align','center');
 d=r.insertCell(0);
 d.textContent="Total Fleets";
 d=r.insertCell(1);
 d.textContent=fc;
 for(k=0;k<20;k++){
   d=document.createElement("td");
   d.setAttribute("style","border:1px solid #000066;");
   if(s[k]>0) d.innerHTML="<small>"+s[k]+"</small>";
   r.insertBefore(d,null);
 }
 d=document.createElement("td");
 d.innerHTML=commaFormat(f)+" / "+commaFormat(t);
 r.insertBefore(d,null);
 n.insertBefore(r,null);
}

/**************
 Sum Fleets
**************/
function sumSingleFleet(){
 if(!document.getElementById('fleet_overview')) return;
 var r,f=0,t=0;
 var v = [5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000];
 document.getElementById('fleet_overview').firstChild.childNodes[1].firstChild.firstChild.style.whiteSpace='nowrap';
 do{
   r = /<td><b>(.*?)<\/b><\/td><td align=.*?>([^<]*?)<\/td>/ig.exec(document.body.innerHTML);
   if(r){
     t+=v[getShipIndex(r[1])]*parseFloat(cleanNumbers(r[2],true));
     if(isFightingShip(getShipIndex(r[1]))) f+=v[getShipIndex(r[1])]*parseFloat(cleanNumbers(r[2],true));
   }
 }
 while(r)
 document.getElementById('fleet_overview').firstChild.lastChild.firstChild.innerHTML+="<table style='border-width:2px 0 0 0;background-image:none;width:100%;'><tr><td style='padding:6px 12px 4px;'><b>Fighting Size</b></td><td style='padding:6px 12px 4px;' align='right'>"+commaFormat(parseInt(f))+"</td></tr><tr><td style='padding:4px 12px;'><b>Total Size</b></td><td style='padding:4px 12px;' align='right'>"+commaFormat(parseInt(t))+"</td></tr></table>";
 document.getElementById('fleet_overview').firstChild.lastChild.firstChild.firstChild.cellPadding='1';
 document.getElementById('fleet_overview').firstChild.lastChild.firstChild.firstChild.firstChild.firstChild.childNodes[1].innerHTML='&nbsp;';
 document.getElementById('fleet_overview').firstChild.lastChild.firstChild.style.padding='4px 12px';
}

function sumFleets(){
 if(!document.getElementById('base_fleets') && !document.getElementById('map_fleets')) return;
 var rows=(wlh.indexOf('base.aspx?base=')!=-1)?document.getElementById('base_fleets').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes:document.getElementById('map_fleets').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 var z,s,t,c=false,g=false,d=[],n=new Date(),f=new Date();
 for(var i=0;i<rows.length;i++){
   z=parseInt(cleanNumbers(rows[i].childNodes[3].firstChild.textContent));
   if(getSetting('config_formatNumbers',true)) rows[i].childNodes[3].firstChild.textContent = commaFormat(rows[i].childNodes[3].firstChild.textContent);
   if(getSetting('config_sumFleets',true)){
     g=false;
     c=false;
     rows[i].setAttribute("guild",getGuild(rows[i].childNodes[1].firstChild.textContent));
     if((rows[i].childNodes[2].id.indexOf('time')!=-1 || rows[i].childNodes[2].id.indexOf('checked')!=-1) && parseInt(rows[i].childNodes[2].title)>=0){
       f.setTime(n.getTime()+(rows[i].childNodes[2].title*1000));
       c=(f.getDate()-n.getDate()==0);
     }
     s=(rows[i].childNodes[2].childNodes.length>0)?z:0;
     t=(c)?z:0;
     for(var x=0;x<d.length;x++){
       if(d[x][0]==getGuild(rows[i].childNodes[1].firstChild.textContent)){
         if(s==0) d[x][1]=(d[x][1]+z);
         d[x][2]=(d[x][2]+s);
         d[x][3]=(d[x][3]+t);
         g=true;
         break;
       }
     }
     if(g) continue;
     if(s==0) d[d.length]=[getGuild(rows[i].childNodes[1].firstChild.textContent),z,0,0];
     else d[d.length]=[getGuild(rows[i].childNodes[1].firstChild.textContent),0,s,t];
   }
 }
 if(getSetting('config_sumFleets',true) && rows.length>2) insertFleetSummary(d);
}

function insertFleetSummary(d){
 var c,s,h = "<tr><th colspan=5>Fleet Summary</th></tr><tr><th style='color:gold'>Guild</th><th style='color:gold'>Incoming (Today)</th><th style='color:gold'>Landed</th><th style='color:gold'>Total Fleet Size</th><th></th></tr>"
 for(var i=0;i<d.length;i++){
   if(getSetting('config_highlightPlayers',true)){
     c=getHighlightColorForPlayer(getPlayerName(d[i][0]));
     if(c==null) c=getHighlightColorForGuild(d[i][0]);
     if(c!=null) s=" style='color:"+c+"'";
     else s='';
   }
   h = h+"<tr align='center'"+s+"><td>"+d[i][0]+"</td><td>"+((getSetting('config_formatNumbers',true))?commaFormat(d[i][2]):d[i][2])+" ("+((getSetting('config_formatNumbers',true))?commaFormat(d[i][3]):d[i][3])+")</td><td>"+((getSetting('config_formatNumbers',true))?commaFormat(d[i][1]):d[i][1])+"</td><td>"+((getSetting('config_formatNumbers',true))?commaFormat(d[i][1]+d[i][2]):d[i][1]+d[i][2])+"</td><td><a id='showHide"+d[i][0]+"' href='javascript:void(1)'>Hide</a></td></tr>";
 }
 var t = document.createElement("table");
 t.setAttribute("width","600");
 t.setAttribute("align","center");
 t.innerHTML = h;
 document.body.insertBefore(t,(wlh.indexOf('base.aspx?base=')!=-1)?document.getElementById('base_fleets'):document.getElementById('map_fleets'));
 document.body.insertBefore(document.createElement("br"),(wlh.indexOf('base.aspx?base=')!=-1)?document.getElementById('base_fleets'):document.getElementById('map_fleets'));
 for(var i=0;i<d.length;i++){
 document.getElementById("showHide"+d[i][0]).addEventListener('click',getShowHideFleetClosure(d[i][0]),true);
 }
}

function getShowHideFleetClosure(g){
 function func(){toggleFleetVisibility(g);}
 return func;
}

function toggleFleetVisibility(g){
 var r = document.evaluate("//tr[@guild='"+g+"']",document,null,7,null);
 for (var i=0;i<r.snapshotLength;i++){
   r.snapshotItem(i).style.display = (r.snapshotItem(i).style.display=="none")? "":"none";
   r.snapshotItem(i).style.visibility = (r.snapshotItem(i).style.visibility=="hidden")? "":"hidden";
 }
 document.getElementById("showHide"+g).textContent=(document.getElementById("showHide"+g).textContent=="Show")? "Hide":"Show";
}

function scrolltoMove(){
 if(!document.getElementById('fleet_move')) return;
 var c=document.createElement('label');
 c.innerHTML="<input type='checkbox' id='scrlToMove' style='margin:0 3px 0 0;border-color:#000;position:relative;top:4px;'"+((getSetting('scrolltoMove',false))?' checked':'')+">Scroll to here on page load.";
 c.setAttribute('style',"font-size:10px;position:absolute;left:"+getSetting('config_paddingLeft','10')+"px;top:"+(document.getElementById('fleet_move').previousSibling.previousSibling.offsetTop-16)+"px;");
 c.className='help';
 document.getElementById('fleet_move').parentNode.insertBefore(c,document.getElementById('fleet_move').previousSibling.previousSibling);
 document.getElementById('scrlToMove').addEventListener('click',function(){setSetting('scrolltoMove',this.checked);},false);
}

function showFleetId(){
 if(!document.getElementById('fleet_move')) return;
 document.getElementById('fleet_move').firstChild.firstChild.firstChild.innerHTML=document.getElementById('fleet_move').firstChild.firstChild.firstChild.innerHTML+': '+document.evaluate("//select[@name='fleet']",document,null,9,null).singleNodeValue.options[document.evaluate("//select[@name='fleet']",document,null,9,null).singleNodeValue.options.selectedIndex].textContent;
}

/***************************
 Construction / Production
***************************/
function insertProductionPresetsButtons(){
 var i,t=document.getElementById('row1').parentNode.parentNode;
 if(!t) return;
 t.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild.innerHTML='';
 t.lastChild.firstChild.childNodes[5].innerHTML='<a id="presetButton0" href="javascript:void(0);" style="position:relative;top:2px;border:0;font:500 10px verdana,arial;">CLEAR&nbsp;ALL</a><br><a id="fillHangars" href="javascript:void(0)" style="position:relative;top:16px;border:0;font:500 10px verdana,arial;">Fill&nbsp;hangar&nbsp;space</a>';
 var p = ["Fighters","Light Fleet","Heavy Fleet","Double Heavy Fleet",'','','',''];
 var b = document.createElement("div");
 b.setAttribute('style','text-align:center;margin:10px;');
 for(i=1;i<9;i++){
  b.innerHTML+="<input type='button' id='presetButton"+i+"' class='AETbut' style='font-size:11px;margin-right:12px;' value='"+getSetting('PRESET_'+i+'_NAME',(getSetting('PRESET_'+i+'_VALUE','')!='')?'':p[i-1])+"'>";
 }
 b.innerHTML+="<input type='button' id='presetButtonS' style='position:absolute;right:38px;padding:2px 6px;font-size:11px;font-weight:900;' value='Submit'>";
 t.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild.appendChild(b);
 for(i=1;i<9;i++){
   if(document.getElementById('presetButton'+i).value=='') document.getElementById('presetButton'+i).style.display='none';
 }
 document.getElementById('presetButton1').addEventListener('click',function(){applyProductionPreset(1)},true);
 document.getElementById('presetButton2').addEventListener('click',function(){applyProductionPreset(2)},true);
 document.getElementById('presetButton3').addEventListener('click',function(){applyProductionPreset(3)},true);
 document.getElementById('presetButton4').addEventListener('click',function(){applyProductionPreset(4)},true);
 document.getElementById('presetButton5').addEventListener('click',function(){applyProductionPreset(5)},true);
 document.getElementById('presetButton6').addEventListener('click',function(){applyProductionPreset(6)},true);
 document.getElementById('presetButton7').addEventListener('click',function(){applyProductionPreset(7)},true);
 document.getElementById('presetButton8').addEventListener('click',function(){applyProductionPreset(8)},true);
 document.getElementById('presetButtonS').addEventListener('click',function(){document.forms[1].submit();},true);
 document.getElementById('presetButton0').addEventListener('click',function(){document.forms[1].reset();onProductionTextBoxReset();},true);
 document.getElementById('fillHangars').addEventListener('click',function(){queueFullHangarSpace()},true);
 if(getSetting('config_cloneProductionPresets',true)){
   b = document.getElementById('base_prod');
   b.setAttribute('style','text-align:center;padding:6px 10px 0 10px;');
   b.parentNode.removeChild(b.parentNode.firstChild);
   b.parentNode.removeChild(b.parentNode.firstChild);
   for(i=1;i<9;i++){
    b.innerHTML+="<input type='button' id='presetButton1"+i+"' class='AETbut' style='font-size:11px;margin-right:12px;' value='"+getSetting('PRESET_'+i+'_NAME',p[i-1])+"'>";
   }
   for(i=1;i<9;i++){
     if(document.getElementById('presetButton'+i).value=='') document.getElementById('presetButton1'+i).style.display='none';
   }
   b.setAttribute('colspan','6');
   document.getElementById('presetButton11').addEventListener('click',function(){applyProductionPreset(1,true)},true);
   document.getElementById('presetButton12').addEventListener('click',function(){applyProductionPreset(2,true)},true);
   document.getElementById('presetButton13').addEventListener('click',function(){applyProductionPreset(3,true)},true);
   document.getElementById('presetButton14').addEventListener('click',function(){applyProductionPreset(4,true)},true);
   document.getElementById('presetButton15').addEventListener('click',function(){applyProductionPreset(5,true)},true);
   document.getElementById('presetButton16').addEventListener('click',function(){applyProductionPreset(6,true)},true);
   document.getElementById('presetButton17').addEventListener('click',function(){applyProductionPreset(7,true)},true);
   document.getElementById('presetButton18').addEventListener('click',function(){applyProductionPreset(8,true)},true);
   if(getSetting('config_enableSimpleProduction',true)) enableSimpleProduction();
 }
 b = document.createElement("td");
 b.innerHTML = "<div style='text-align:center;margin:10px;'><input class='AETbut' id='setButton1' type='button' value='Set Preset 1'>&nbsp;&nbsp;<input class='AETbut' id='setButton2' type='button' value='Set Preset 2'>&nbsp;&nbsp;<input class='AETbut' id='setButton3' type='button' value='Set Preset 3'>&nbsp;&nbsp;<input class='AETbut' id='setButton4' type='button' value='Set Preset 4'>&nbsp;&nbsp;<input class='AETbut' id='setButton5' type='button' value='Set Preset 5'>&nbsp;&nbsp;<input class='AETbut' id='setButton6' type='button' value='Set Preset 6'>&nbsp;&nbsp;<input class='AETbut' id='setButton7' type='button' value='Set Preset 7'>&nbsp;&nbsp;<input class='AETbut' id='setButton8' type='button' value='Set Preset 8'><div class='help' style='margin-top:6px;'>Enter ship preset quantities before you set the preset name.<br>Clear the name to remove a preset button.</div></div>";
 t.parentNode.parentNode.parentNode.parentNode.appendChild(document.createElement('tr'));
 t.parentNode.parentNode.parentNode.parentNode.lastChild.appendChild(b);
 document.getElementById('setButton1').addEventListener('click',function(){saveProductionPreset(1)},true);
 document.getElementById('setButton2').addEventListener('click',function(){saveProductionPreset(2)},true);
 document.getElementById('setButton3').addEventListener('click',function(){saveProductionPreset(3)},true);
 document.getElementById('setButton4').addEventListener('click',function(){saveProductionPreset(4)},true);
 document.getElementById('setButton5').addEventListener('click',function(){saveProductionPreset(5)},true);
 document.getElementById('setButton6').addEventListener('click',function(){saveProductionPreset(6)},true);
 document.getElementById('setButton7').addEventListener('click',function(){saveProductionPreset(7)},true);
 document.getElementById('setButton8').addEventListener('click',function(){saveProductionPreset(8)},true);
}

function enableProductionCaps(){
 var b=document.getElementById('base_production').firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild.childNodes;
 if(!b[b.length-5].firstChild) return;
 b[b.length-5].firstChild.style.fontSize='11px';
 var a=document.createElement('span');
 a.setAttribute('style','float:right;position:relative;right:5%;top:4px;font:900 italic 16px verdana,tahoma,arial,sans-serif;');
 a.innerHTML=document.evaluate("//select[@name='base']",document,null,9,null).singleNodeValue.options[document.evaluate("//select[@name='base']",document,null,9,null).singleNodeValue.options.selectedIndex].textContent;
 b[b.length-5].firstChild.insertBefore(a,b[b.length-5].firstChild.firstChild);
 a.parentNode.style.textAlign='center';
 a=document.createElement("span");
 a.innerHTML="Total Production Capacity: "+document.getElementById('base_prod').title+" / hr";
 a.setAttribute('style',"position:absolute;right:14px;font-weight:500;");
 b=(wlh.indexOf('&action=cancel')==-1)?document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue:document.evaluate("//input[@type='submit']",document,null,7,null).snapshotItem(1);
 b.parentNode.appendChild(a);
}

function applyProductionPreset(p,b,pg){
 var a=[],k=["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods"],i=0;
 switch(p){
   case 1:{a = getSetting("PRESET_1_VALUE","500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,false").split(",");break;}
   case 2:{a = getSetting("PRESET_2_VALUE","50,0,0,0,20,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,false").split(",");break;}
   case 3:{a = getSetting("PRESET_3_VALUE","60,0,0,0,0,0,0,0,0,0,0,8,0,4,0,0,0,0,0,0,0,false").split(",");break;}
   case 4:{a = getSetting("PRESET_4_VALUE","120,0,0,0,0,0,0,0,0,0,0,16,0,8,0,0,0,0,0,0,0,false").split(",");break;}
   case 5:{a = getSetting("PRESET_5_VALUE","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,false").split(",");break;}
   case 6:{a = getSetting("PRESET_6_VALUE","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,false").split(",");break;}
   case 7:{a = getSetting("PRESET_7_VALUE","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,false").split(",");break;}
   case 8:{a = getSetting("PRESET_8_VALUE","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,false").split(",");break;}
 }
 if(document.getElementById('fast')){
   for(i;i<k.length;i++){
     if(document.getElementById('quant'+k[i])) document.getElementById('quant'+k[i]).value = (parseInt(a[i])>0)?parseInt(a[i]):null;
   }
   if(a[i]=='true') document.getElementById('fast').checked=true;
   else document.getElementById('fast').checked=false;
   if(b){scrollTo(0,document.body.offsetHeight);var c=(wlh.indexOf('&action=cancel')==-1)?document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue:document.evaluate("//input[@type='submit']",document,null,7,null).snapshotItem(1);c.focus();}
   else if(document.getElementById('quantFighters')) document.getElementById('quantFighters').focus();
   else document.getElementById('quantGoods').focus();
   onProductionTextBoxKeyUp();
 }else{
   var c,r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
   for(i=0;i<r.length;i++){
     if((getSetting('config_toAllRows',true) || r[i].firstChild.firstChild.checked) && r[i].style.display!='none'){
       for(var x=0;x<k.length;x++){
         if(parseInt(a[x])<1) continue;
         c=document.getElementById('data_'+r[i].childNodes[1].firstChild.href.split('=')[1]).lastChild.lastChild.appendChild(document.createElement('div'));
         c.innerHTML=a[x]+','+x+',';
         c.innerHTML+=(document.getElementById('fast_'+r[i].childNodes[1].firstChild.href.split('=')[1]).checked)?'1':'0';
         allProductionParse('',r[i].childNodes[1].firstChild.href.split('=')[1],pg);
       }
     }
   }
   allProductionWidth('',pg);
 }
}

function saveProductionPreset(p){
 var a=[],b=prompt("Enter preset "+p+" name."),i=0;
 if(b==null) return;
 if(b!=''){
   var k=["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods"];
   for(i;i<k.length;i++){
     if(document.getElementById('quant'+k[i]) && parseInt(document.getElementById('quant'+k[i]).value)>0) a[i]=parseInt(document.getElementById('quant'+k[i]).value);
     else a[i]=0;
   }
   a[i]=document.getElementById('fast').checked;
 }else a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,false]
 switch(p){
   case 1:{setSetting("PRESET_1_VALUE",a.join());setSetting("PRESET_1_NAME",b);document.getElementById('presetButton1').value = b;document.getElementById('presetButton1').style.display=(b!='')?'inline':'none';document.getElementById('presetButton11').value = b;document.getElementById('presetButton11').style.display=(b!='')?'inline':'none';break;}
   case 2:{setSetting("PRESET_2_VALUE",a.join());setSetting("PRESET_2_NAME",b);document.getElementById('presetButton2').value = b;document.getElementById('presetButton2').style.display=(b!='')?'inline':'none';document.getElementById('presetButton12').value = b;document.getElementById('presetButton12').style.display=(b!='')?'inline':'none';break;}
   case 3:{setSetting("PRESET_3_VALUE",a.join());setSetting("PRESET_3_NAME",b);document.getElementById('presetButton3').value = b;document.getElementById('presetButton3').style.display=(b!='')?'inline':'none';document.getElementById('presetButton13').value = b;document.getElementById('presetButton13').style.display=(b!='')?'inline':'none';break;}
   case 4:{setSetting("PRESET_4_VALUE",a.join());setSetting("PRESET_4_NAME",b);document.getElementById('presetButton4').value = b;document.getElementById('presetButton4').style.display=(b!='')?'inline':'none';document.getElementById('presetButton14').value = b;document.getElementById('presetButton14').style.display=(b!='')?'inline':'none';break;}
   case 5:{setSetting("PRESET_5_VALUE",a.join());setSetting("PRESET_5_NAME",b);document.getElementById('presetButton5').value = b;document.getElementById('presetButton5').style.display=(b!='')?'inline':'none';document.getElementById('presetButton15').value = b;document.getElementById('presetButton15').style.display=(b!='')?'inline':'none';break;}
   case 6:{setSetting("PRESET_6_VALUE",a.join());setSetting("PRESET_6_NAME",b);document.getElementById('presetButton6').value = b;document.getElementById('presetButton6').style.display=(b!='')?'inline':'none';document.getElementById('presetButton16').value = b;document.getElementById('presetButton16').style.display=(b!='')?'inline':'none';break;}
   case 7:{setSetting("PRESET_7_VALUE",a.join());setSetting("PRESET_7_NAME",b);document.getElementById('presetButton7').value = b;document.getElementById('presetButton7').style.display=(b!='')?'inline':'none';document.getElementById('presetButton17').value = b;document.getElementById('presetButton17').style.display=(b!='')?'inline':'none';break;}
   case 8:{setSetting("PRESET_8_VALUE",a.join());setSetting("PRESET_8_NAME",b);document.getElementById('presetButton8').value = b;document.getElementById('presetButton8').style.display=(b!='')?'inline':'none';document.getElementById('presetButton18').value = b;document.getElementById('presetButton18').style.display=(b!='')?'inline':'none';break;}
 }
 notify(b+" preset "+p+" saved.");
}

function queueFullHangarSpace(){
 if(!document.getElementById('quantFighters')) return;
 var a=0,b=[0,0,0,0,0,0,0,4,4,0,0,4,60,8,40,400,200,1000,4000,10000,0],p=["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods"];
 for(var i=7;i<p.length;i++){
   if(document.getElementById('quant'+p[i]) && parseInt(document.getElementById('quant'+p[i]).value)>0) a+=parseInt(document.getElementById('quant'+p[i]).value)*b[i];
 }
 if(document.getElementById('quantBombers') && parseInt(document.getElementById('quantBombers').value)>0) a-=parseInt(document.getElementById('quantBombers').value);
 if(document.getElementById('quantHeavy Bombers') && parseInt(document.getElementById('quantHeavy Bombers').value)>0) a-=parseInt(document.getElementById('quantHeavy Bombers').value)*2;
 if(document.getElementById('quantIon Bombers') && parseInt(document.getElementById('quantIon Bombers').value)>0) a-=parseInt(document.getElementById('quantIon Bombers').value)*2;
 if(a<0){alert('Not enough hanger space with bombers included.');return;}
 document.getElementById('quantFighters').value = a;
 onProductionTextBoxKeyUp();
}

function bases_production(){
 var c=document.getElementById('empire_ production');
 if(!c) return;
 var b=document.createElement('input');
 b.type='button'
 b.value='All = Row';
 b.setAttribute('class','AETbut');
 b.setAttribute('style','margin-left:30px;');
 b.addEventListener('click',function(){
  var r=document.getElementById('empire_ production').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[1].childNodes,x=0,t=[],k=false;
  var s=document.getElementById('empire_ production').firstChild.firstChild.firstChild.lastChild.value;
  var u=document.getElementById('select_'+s).value;
  var q=document.getElementById('quant_'+s).value;
  for(var i=0;i<r.length;i=i+2){
   t=r[i].childNodes[3].firstChild.childNodes;
   k=false;
   for(x=0;x<t.length;x++){
    if(t[x].value==u){
     r[i].childNodes[3].firstChild.selectedIndex=x;
     k=true;
     break;
    }
   }
   if(k) r[i].childNodes[4].firstChild.value=q;
   else{
    r[i].childNodes[3].firstChild.selectedIndex=0;
    r[i].childNodes[4].firstChild.value='';
   }
   unsafeWindow.update_row(r[i].childNodes[4].firstChild.id.split('_')[1]);
  }
 },false);
 c.firstChild.firstChild.firstChild.appendChild(b);
 b=document.createElement('select');
 for(i=1;i<=c.firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[1].childNodes.length/2;i++){
  b.innerHTML+="<option value='"+i+"'>"+i;
 }
 b.setAttribute('style','position:relative;top:-1px;left:-2px;border-left-color:#006;');
 c.firstChild.firstChild.firstChild.appendChild(b);
 b.style.height=b.previousSibling.offsetHeight+'px';
 b=document.createElement('input');
 b.type='reset';
 b.setAttribute('style','margin-right:40px;');
 c=document.evaluate("//input[@value='Submit']",document,null,9,null).singleNodeValue;
 c.parentNode.insertBefore(b,c);
}

function enableProductionPage(b){
 var a,c=document.createElement('div');
 if(b){
   a = document.createElement('a');
   a.title='Your Astro Empire page';
   a.href='javascript:void(1);';
   a.setAttribute('style','display:inline-block;margin:0 4px;position:relative;top:-1px;');
   a.innerHTML='&#198;';
   c.appendChild(a);
   a.addEventListener('click',function(){allEmpirePage();},true);
 }else{
   if(!document.getElementById('tempEvents')){
     document.body.appendChild(document.createElement('div'));
     document.body.lastChild.id='tempEvents';
     document.body.lastChild.style.visibility='hidden';
     document.body.lastChild.appendChild(document.getElementById('empire_events').cloneNode(true));
   }
 }
 if(b!='c'){
   a = document.createElement('a');
   a.title='Construction page for ALL bases';
   a.href='javascript:void(1);';
   a.setAttribute('style','display:inline-block;margin:0 4px;position:relative;top:-1px;');
   a.innerHTML='&#199;';
   c.appendChild(a);
   a.addEventListener('click',function(){baseEventsPage('c');},true);
 }
 if(b!='p'){
   a = document.createElement('a');
   a.title='Production page for ALL bases';
   a.href='javascript:void(1);';
   a.setAttribute('style','display:inline-block;margin:0 4px;position:relative;top:-1px;');
   a.innerHTML='&#8719;';
   c.appendChild(a);
   a.addEventListener('click',function(){baseEventsPage('p');},true);
 }
 if(b!='r'){
   a = document.createElement('a');
   a.title='Research page for ALL bases';
   a.href='javascript:void(1);';
   a.setAttribute('style','display:inline-block;margin: 0 4px;');
   a.innerHTML='&#197;';
   c.appendChild(a);
   a.addEventListener('click',function(){baseEventsPage('r');},true);
 }
 c.setAttribute('style','display:inline-block;margin:0 18px;padding:2px 2px 1px;background-color:#281020;border:1px solid #432;');
 document.getElementById('empire_events').firstChild.firstChild.firstChild.appendChild(c);
}

function allEmpirePage(){
 document.getElementById('empire_events').innerHTML=document.getElementById('tempEvents').firstChild.innerHTML;
 enableProductionPage();
}

function baseEventsPage(pg){
 document.body.innerHTML=document.body.innerHTML.replace('aetLight','');
 var ee=document.getElementById('empire_events').firstChild;a=ee.firstChild.firstChild,b=[[-1,'-1'],['x','0'],[1,'1'],[10,'10'],[100,'100'],[1000,'1k']],i=0;
 if(pg=='p') a.innerHTML="<font size='+1'>A</font>LL PRODUCTION PAGE";
 else if(pg=='c') a.innerHTML="<font size='+1'>A</font>LL CONSTRUCTION PAGE";
 else if(pg=='r') a.innerHTML="<font size='+1'>A</font>LL RESEARCH PAGE";
 else a.innerHTML="<font size='+1'>B</font>ASES EVENTS";
 a.innerHTML+="<div style='display:none;' id='allConstName'>"+document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes[5].textContent+"</div><div style='display:none;' id='allProdName'>"+document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes[6].textContent+"</div><div style='display:none;' id='allRsrchName'>"+document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes[7].textContent+"</div>";
 a.style.padding='3px 0 12px';
 enableProductionPage(pg);
 GM_addStyle("A.selLink{color:#FFE;background-color:#281020;border:1px solid #432;}A.selLink:focus{outline-style:none;}#empire_events TABLE TD{padding-top:3px;}");
 if(pg=='p' && getSetting('config_enableProductionPresets',true)){
  var p = ["Fighters","Light Fleet","Heavy Fleet","Double Heavy Fleet",'','','',''];
  var c = document.createElement("div");
  c.setAttribute('style','white-space:nowrap;text-align:center;display:inline-block;');
  for(i=1;i<9;i++){
   c.innerHTML+="<input type='button' id='presetButton"+i+"' class='AETbut' style='font-size:11px;margin-right:16px;' value='"+getSetting('PRESET_'+i+'_NAME',(getSetting('PRESET_'+i+'_VALUE')!='')?'':p[i-1])+"'>";
  }
  c.innerHTML+="<span style='font:18px/.75 tahoma,arial;' id='toAllRows'><a style='font-size:17px;margin-right:3px;display:inline-block;padding:0 3px 3px;' href='javascript:this.blur();' title='Post Presets to All Rows'>&#8801;</a><a style='display:inline-block;padding:0 3px 3px;' href='javascript:this.blur();' title='Post Presets to Selected Rows'>&#8773;</a></span>";
  a.appendChild(c);
  for(i=1;i<9;i++){
   if(document.getElementById('presetButton'+i).value=='') document.getElementById('presetButton'+i).style.display='none';
  }
  document.getElementById('toAllRows').firstChild.className=(getSetting('config_toAllRows',true))?'selLink':'';
  document.getElementById('toAllRows').lastChild.className=(getSetting('config_toAllRows',true))?'':'selLink';
  document.getElementById('presetButton1').addEventListener('click',function(){applyProductionPreset(1,'',pg)},true);
  document.getElementById('presetButton2').addEventListener('click',function(){applyProductionPreset(2,'',pg)},true);
  document.getElementById('presetButton3').addEventListener('click',function(){applyProductionPreset(3,'',pg)},true);
  document.getElementById('presetButton4').addEventListener('click',function(){applyProductionPreset(4,'',pg)},true);
  document.getElementById('presetButton5').addEventListener('click',function(){applyProductionPreset(5,'',pg)},true);
  document.getElementById('presetButton6').addEventListener('click',function(){applyProductionPreset(6,'',pg)},true);
  document.getElementById('presetButton7').addEventListener('click',function(){applyProductionPreset(7,'',pg)},true);
  document.getElementById('presetButton8').addEventListener('click',function(){applyProductionPreset(8,'',pg)},true);
  document.getElementById('toAllRows').addEventListener('click',function(){if(document.getElementById('toAllRows').firstChild.className==''){setSetting('config_toAllRows',true)}else{setSetting('config_toAllRows',false)}document.getElementById('toAllRows').firstChild.className=(getSetting('config_toAllRows',true))?'selLink':'';document.getElementById('toAllRows').lastChild.className=(getSetting('config_toAllRows',true))?'':'selLink';window.focus();},false);
 }
 var r = ee.childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes;
 var h='';
 for(i=0;i<13;i++){h+="<th></th>";}
 r[0].parentNode.innerHTML=h;
 r[0].parentNode.className='';
 r[0].innerHTML='Select'
 r[1].innerHTML='Base';
 r[2].innerHTML='Current Queue';
 r[3].innerHTML='Unit Type';
 r[4].innerHTML='Quantity';
 r[5].innerHTML='Temp Q';
 r[6].innerHTML='Fast';
 r[7].innerHTML='Copy';
 r[8].innerHTML="Structures";
 r[9].innerHTML="Defenses";
 r[10].innerHTML="Technology";
 r[12].setAttribute('style','font:20px/.75 arial;');
 r[12].innerHTML="<a href='javascript:void(1);' title='Swap Locked and Unlocked Rows'>&#8660;</a>";
 r[12].firstChild.addEventListener('click',function(){var r = document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;for(var i in r){r[i].style.display=(r[i].style.display=='none')?'':'none'}allProductionWidth();},false);
 eeMenu(r,pg);
 r[0].parentNode.style.backgroundColor='rgba(68,34,102,.5)';
 a = (r[0].parentNode.parentNode.childNodes.length>2)?r[0].parentNode.parentNode.childNodes[1]:r[0].parentNode.parentNode.appendChild(document.createElement('tr'));
 a.style.backgroundColor='#281020';
 a.innerHTML="<td style='font:18px/.75 tahoma,arial;text-align:center;'><a style='font-size:16px;' href='javascript:void(1);' title='Check All'>&#8730;</a><a href='javascript:void(1);' title='Swap All'>&#8596;</a><a href='javascript:void(1);' title='Uncheck All'>&#215;</a></td><td style='font:18px/.75 tahoma,arial;text-align:center;'><a style='font-size:17px;' href='javascript:void(1);' title='Show Data for All Rows'>&#8801;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='Show Data for Selected Rows'>&#8773;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='Swap All'>&#8596;</a>&nbsp;&nbsp;<a style='font-size:15px;' href='javascript:void(1);' title='Swap Selected'>&#8838;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='Hide All Data'>&#215;</a></td><td style='font:18px/.75 tahoma,arial;text-align:center;'><a style='font-size:17px;' href='javascript:void(1);' title='Update Data for All Rows'>&#8801;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='Update Data for Selected Rows'>&#8773;</a></td><td style='font:18px/.75 tahoma,arial;text-align:center;'><a style='font-size:17px;' href='javascript:void(1);' title='All Rows == Top Row'>&#8801;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='All Selected Rows == Top Row'>&#8773;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='Reset All'>&#215;</a></td><td style='font:18px/.75 tahoma,arial;text-align:center;'><a href='javascript:void(0)' style='float:left;font:500 10px verdana,arial;' title='Fill the empty hanger space of items in the temp. Q for selected rows.'>Fill&nbsp;hangars</a><a style='font-size:17px;' href='javascript:void(1);' title='All Rows == Top Row'>&#8801;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='All Selected Rows == Top Row'>&#8773;</a>&nbsp;&nbsp;<a style='font-size:17px;' href='javascript:void(1);' title='Distribute Remaining Credits to Selected Rows'>&#8734;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='Reset All'>&#215;</a></td><td style='font:18px/.75 tahoma,arial;text-align:center;'><a style='font-size:17px;' href='javascript:void(1);' title='Add to Q for All Rows'>&#8801;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='Add to Q for Selected Rows'>&#8773;</a>&nbsp;&nbsp;<a href='javascript:void(1);' title='Clear and Close All Qs'>&#215;</a></td><td style='font:18px/.75 tahoma,arial;text-align:center;'><a style='font-size:16px;' href='javascript:void(1);' title='Check All'>&#8730;</a><a href='javascript:void(1);' title='Swap All'>&#8596;</a><a href='javascript:void(1);' title='Uncheck All'>&#215;</a></td><td style='font:18px/.75 tahoma,arial;text-align:center;'><a style='font-size:17px;' href='javascript:void(1);' title='Copy Top Row to All Rows'>&#8801;</a>&nbsp;<a href='javascript:void(1);' title='Copy Top Row to Selected Rows'>&#8773;</a></td><td></td><td></td><td></td><td></td><td style='font:18px/.75 tahoma,arial;text-align:center;'><a href='javascript:void(1);' title='Lock and Hide Not-Selected Rows'>&#8800;</a></td>";
 a.firstChild.firstChild.addEventListener('click',function(){allProductionSelect(1);allProductionTotal();},false);
 a.firstChild.childNodes[1].addEventListener('click',function(){allProductionSelect(2);allProductionTotal();},false);
 a.firstChild.lastChild.addEventListener('click',function(){allProductionSelect(0);allProductionTotal();},false);
 a.childNodes[1].firstChild.addEventListener('click',function(){allProductionsData('a','',pg);},true);
 a.childNodes[1].childNodes[2].addEventListener('click',function(){allProductionsData('s','',pg);},true);
 a.childNodes[1].childNodes[4].addEventListener('click',function(){allProductionsData('','',pg);},true);
 a.childNodes[1].childNodes[6].addEventListener('click',function(){allProductionsData('t','',pg);},true);
 a.childNodes[1].lastChild.addEventListener('click',function(){allProductionsData('x');},true);
 a.childNodes[2].firstChild.addEventListener('click',function(){var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes,x='';for(var i=0;i<r.length;i++){if(r[i].style.display=='none') continue;x+=','+r[i].firstChild.firstChild.id.split('_')[1];}postAllProductions(x.substring(1));},false);
 a.childNodes[2].lastChild.addEventListener('click',function(){var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes,x='';for(var i=0;i<r.length;i++){if(r[i].style.display=='none' || !r[i].firstChild.firstChild.checked) continue;x+=','+r[i].firstChild.firstChild.id.split('_')[1];}postAllProductions(x.substring(1));},false);
 a.childNodes[3].firstChild.addEventListener('click',function(){setAllProductions('3');},true);
 a.childNodes[3].childNodes[2].addEventListener('click',function(){setAllProductions('4');},true);
 a.childNodes[3].lastChild.addEventListener('click',function(){allProductionTotal('2');},true);
 a.childNodes[4].firstChild.addEventListener('click',function(){allProdHangers();},true);
 a.childNodes[4].childNodes[1].addEventListener('click',function(){setAllProductions('1');},true);
 a.childNodes[4].childNodes[3].addEventListener('click',function(){setAllProductions('2');},true);
 a.childNodes[4].childNodes[5].addEventListener('click',function(){allProdRemaining();},true);
 a.childNodes[4].lastChild.addEventListener('click',function(){allProductionTotal('3');allProductionTotal();},true);
 a.childNodes[5].firstChild.addEventListener('click',function(){allProductionQueueAll();},true);
 a.childNodes[5].childNodes[2].addEventListener('click',function(){allProductionQueueAll(true);},true);
 a.childNodes[5].lastChild.addEventListener('click',function(){var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;for(var i=0;i<r.length;i++){if(r[i].style.display=='none') continue;r[i].childNodes[1].lastChild.lastChild.lastChild.innerHTML='';allProductionParse('',r[i].childNodes[1].firstChild.href.split('=')[1],pg);}allProductionsData('x');},true);
 a.childNodes[6].firstChild.addEventListener('click',function(){allProductionSelect(1,1);},false);
 a.childNodes[6].childNodes[1].addEventListener('click',function(){allProductionSelect(2,1);},false);
 a.childNodes[6].lastChild.addEventListener('click',function(){allProductionSelect(0,1);},false);
 a.childNodes[7].firstChild.addEventListener('click',function(){setAllProductions();},true);
 a.childNodes[7].lastChild.addEventListener('click',function(){setAllProductions('0');},true);
 a.childNodes[12].firstChild.addEventListener('click',function(){var r = document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;for(var i in r){if(r[i].firstChild.firstChild.checked) continue;r[i].style.display='none'}allProductionWidth();},false);
 eeMenu(a.childNodes,pg);
 a = (r[0].parentNode.parentNode.childNodes.length>2)?r[0].parentNode.parentNode.childNodes[2]:r[0].parentNode.parentNode.appendChild(document.createElement('tr'));
 a.style.backgroundColor='#020318';
 a.innerHTML="<td style='line-height:10px;border:0;' colspan=13>&nbsp;</td>";
 r = ee.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 if(r[0].childNodes[0].firstChild.href){
  for(i=0;i<r.length;i++){
   h = r[i].childNodes[0].firstChild.href.split('=')[1];
   r[i].setAttribute('style','background-color:#020318;vertical-align:top;white-space:nowrap;');
   r[i].childNodes[1].innerHTML=r[i].childNodes[0].innerHTML+"<br><a style='font-size:13px;' href='javascript:void(1);' title='Toggle Base Data' id='dat_"+h+"'><span>&#8659;</span></a>&nbsp;-&nbsp;<small>(<a href='"+r[i].childNodes[1].lastChild.href+"'>"+r[i].childNodes[1].lastChild.innerHTML+"</a>)</small><div style='position:absolute;left:"+(document.getElementById('empire_events').offsetLeft+parseInt(unescape(getSetting('config_overrideBorderSize',"2"))))+"px;background-color:rgba(128,128,128,.2);visibility:hidden;' id='data_"+h+"'><div style='margin:2px 2px 4px 2px;border:3px inset rgba(02,03,24,.35);'><div style='display:table-cell;vertical-align:top;text-align:center;font-size:11px;'></div><div style='display:table-cell;vertical-align:top;text-align:center;'><div></div><div></div><div></div></div><div style='display:table-cell;vertical-align:top;'></div></div><div style='display:none;'><div></div><div><div></div><div></div><div></div></div><div></div></div></div>";
   r[i].childNodes[0].innerHTML="<input id='sel_"+h+"' type='checkbox'>";
   r[i].childNodes[0].style.cursor="pointer";
   r[i].childNodes[1].setAttribute('style','text-align:left;padding-left:8px;');
   r[i].childNodes[2].innerHTML="<div style='display:"+(pg=='c'?'block':'none')+";'>"+r[i].childNodes[5].innerHTML+"</div><div style='display:"+(pg=='p'?'block':'none')+";'>"+r[i].childNodes[6].innerHTML+"</div><div style='display:"+(pg=='r'?'block':'none')+";'>"+r[i].childNodes[7].innerHTML+"</div>";
   r[i].childNodes[3].innerHTML = "<select name='unit' id='unit_"+h+"'><option value='Fighters'>Fighters<option value='Bombers'>Bombers<option value='Heavy Bombers'>Heavy Bombers<option value='Ion Bombers'>Ion Bombers<option value='Corvette'>Corvette<option value='Recycler'>Recycler<option value='Destroyer'>Destroyer<option value='Frigate'>Frigate<option value='Ion Frigate'>Ion Frigate<option value='Scout Ship'>Scout Ship<option value='Outpost Ship'>Outpost Ship<option value='Cruiser'>Cruiser<option value='Carrier'>Carrier<option value='Heavy Cruiser'>Heavy Cruiser<option value='Battleship'>Battleship<option value='Fleet Carrier'>Fleet Carrier<option value='Dreadnought'>Dreadnought<option value='Titan'>Titan<option value='Leviathan'>Leviathan<option value='Death Star'>Death Star<option value='Goods'>Goods</select><div style='font-size:11px;color:"+unescape(getSetting('config_highlightTimeColor','#88CCAA'))+";'>0 &#164;</div>";
   r[i].childNodes[4].innerHTML = "<div style='width:200px;'><input type='text' name='quant' class='quant' id='quant_"+h+"' size='5' maxlength='5' value='0'></div>";
   r[i].childNodes[4].firstChild.style.marginRight='3px';
   r[i].childNodes[5].innerHTML ="<a href='javascript:void(1);' id='q_"+h+"'>(0)</a>  / <a href='javascript:void(1);' id='aq_"+h+"'>add</a>";
   r[i].childNodes[6].innerHTML = "<input type='checkbox' name='fast' class='check' id='fast_"+h+"'>";
   r[i].childNodes[6].style.padding='';
   r[i].childNodes[7].innerHTML="<a id='ca_"+h+"' style='font:17px tahoma,arial;' href='javascript:void(1);' title='Copy to All Rows'>&#8801;</a>&nbsp;&nbsp;<a id='cs_"+h+"' style='font:18px tahoma,arial;' href='javascript:void(1);' title='Copy to Selected Rows'>&#8773;</a>";
   r[i].appendChild(document.createElement('td'));
   r[i].childNodes[8].innerHTML="<select id='struc_"+h+"'><option value=''>Select<option value='Urban Structures'>Urban Structures<option value='Solar Plants'>Solar Plants<option value='Gas Plants'>Gas Plants<option value='Fusion Plants'>Fusion Plants<option value='Antimatter Plants'>Antimatter Plants<option value='Research Labs'>Research Labs<option value='Metal Refineries'>Metal Refineries<option value='Robotic Factories'>Robotic Factories<option value='Shipyards'>Shipyards<option value='Orbital Shipyards'>Orbital Shipyards<option value='Spaceports'>Spaceports<option value='Command Centers'>Command Centers<option value='Nanite Factories'>Nanite Factories<option value='Android Factories'>Android Factories<option value='Economic Centers'>Economic Centers<option value='Terraform'>Terraform<option value='Multi-Level Platforms'>Multi-Level Platforms<option value='Orbital Base'>Orbital Base<option value='Jump Gate'>Jump Gate<option value='Biosphere Modification'>Biosphere Modification<option value='Capital'>Capital</select>";
   r[i].appendChild(document.createElement('td'));
   r[i].childNodes[9].innerHTML="<select id='def_"+h+"'><option value=''>Select<option value='Barracks'>Barracks<option value='Laser Turrets'>Laser Turrets<option value='Missile Turrets'>Missile Turrets<option value='Plasma Turrets'>Plasma Turrets<option value='Ion Turrets'>Ion Turrets<option value='Photon Turrets'>Photon Turrets<option value='Disruptor Turrets'>Disruptor Turrets<option value='Deflection Shields'>Deflection Shields<option value='Planetary Shield'>Planetary Shield<option value='Planetary Ring'>Planetary Ring</select>";
   r[i].appendChild(document.createElement('td'));
   r[i].childNodes[10].innerHTML="<select id='tech_"+h+"'><option value=''>Select<option value='Energy'>Energy<option value='Computer'>Computer<option value='Armour'>Armour<option value='Laser'>Laser<option value='Missiles'>Missiles<option value='Stellar Drive'>Stellar Drive<option value='Plasma'>Plasma<option value='Warp Drive'>Warp Drive<option value='Shielding'>Shielding<option value='Ion'>Ion<option value='Photon'>Photon<option value='Artificial Intelligence'>Artificial Intelligence<option value='Disruptor'>Disruptor<option value='Cybernetics'>Cybernetics<option value='Tachyon Communications'>Tachyon Communications</select>";
   r[i].appendChild(document.createElement('td'));
   r[i].childNodes[11].innerHTML="<input type='button' name='"+h+"' value='Add to Queue'>";
   r[i].childNodes[11].firstChild.addEventListener('click',function(){var pg=(this.parentNode.parentNode.childNodes[8].style.display=='')?'c':(this.parentNode.parentNode.childNodes[10].style.display=='')?'r':'p';postAllProductions(pg+','+this.name)},false);
   r[i].appendChild(document.createElement('td'));
   r[i].childNodes[12].innerHTML="<a href='javascript:void(1);' title='Lock and Hide Row' style='background-color:#000;'>[x]</a>";
   r[i].childNodes[12].firstChild.addEventListener('click',function(){this.parentNode.parentNode.style.display='none';allProductionWidth();},false);
   document.getElementById("sel_"+h).addEventListener('change',function(){this.checked=!this.checked;this.parentNode.parentNode.style.backgroundColor=(this.checked)?'#223258':'#020318';allProductionTotal();},false);
   document.getElementById("sel_"+h).parentNode.addEventListener('click',function(){this.firstChild.checked=!this.firstChild.checked;this.parentNode.style.backgroundColor=(this.firstChild.checked)?'#223258':'#020318';allProductionTotal();},false);
   document.getElementById("dat_"+h).addEventListener('click',function(){var pg='';if(this.parentNode.parentNode.childNodes[3].style.display=='') pg='p';else if(this.parentNode.parentNode.childNodes[8].style.display=='') pg='c';else if(this.parentNode.parentNode.childNodes[10].style.display=='') pg='r';if(this.parentNode.lastChild.style.visibility=='hidden'){allProductionParse('',this.id.split('_')[1],pg);}else{this.parentNode.lastChild.style.visibility='hidden';this.parentNode.parentNode.style.height='';this.firstChild.innerHTML="&#8659;";}allProductionWidth('',pg);},true);
   document.getElementById("unit_"+h).addEventListener('change',function(){allProductionTotal();},true);
   document.getElementById("quant_"+h).addEventListener('change',function(){allProductionTotal();setProductionTimes(this.id);},true);
   document.getElementById("quant_"+h).addEventListener('keyup',function(){allProductionTotal();setProductionTimes(this.id);},true);
   document.getElementById("q_"+h).addEventListener('click',function(){var pg='';if(this.parentNode.parentNode.childNodes[3].style.display=='') pg='p';else if(this.parentNode.parentNode.childNodes[8].style.display=='') pg='c';else if(this.parentNode.parentNode.childNodes[10].style.display=='') pg='r';allProductionParse('',this.id.split('_')[1],pg);allProductionWidth('',pg);},true);
   document.getElementById("aq_"+h).addEventListener('click',function(){var pg='';if(this.parentNode.parentNode.childNodes[3].style.display=='') pg='p';else if(this.parentNode.parentNode.childNodes[8].style.display=='') pg='c';else if(this.parentNode.parentNode.childNodes[10].style.display=='') pg='r';allProductionQueueAdd(this.id.split('_')[1]);allProductionWidth('',pg);},true);
   document.getElementById("ca_"+h).addEventListener('click',function(){allProductionCopy(this.id);},true);
   document.getElementById("cs_"+h).addEventListener('click',function(){allProductionCopy(this.id);},true);
   document.getElementById("fast_"+h).addEventListener('change',function(){allProductionTotal();},true);
   for(var c=0; c<6; c++) {
    a=document.createElement('input');
    a.type='button';
    a.style.marginLeft='3px';
    a.style.padding='0';
    a.style.fontSize='.9em';
    a.style.fontFamily='tahoma,arial';
    a.className='AETbut';
    a.id=i+'_'+b[c][0];
    a.value=b[c][1];
    r[i].childNodes[4].firstChild.appendChild(a);
    a.addEventListener('click',function(){if(isNaN(this.id.split('_')[1]) || isNaN(this.parentNode.firstChild.value) || this.parentNode.firstChild.value=='') this.parentNode.firstChild.value=0;else this.parentNode.firstChild.value=parseInt(this.parentNode.firstChild.value)+parseInt(this.id.split('_')[1]);if(parseInt(this.parentNode.firstChild.value)<0) this.parentNode.firstChild.value=0;allProductionTotal();},true);
   }
   allProductionParse(1,h,pg);
   a=document.createElement('div');
   r[i].childNodes[4].firstChild.appendChild(a);
   a.setAttribute('style',"font:12px tahoma;color:"+unescape(getSetting('config_highlightTimeColor','#88CCAA'))+";");
   a.innerHTML="<span id='hr"+h+"'>0</span> hr <a href='javascript:void(1);' id='h_a_"+h+"' title='Add Hours'>&#8593;</a> <a href='javascript:void(1);' id='h_s_"+h+"' title='Subtract Hours'>&#8595;</a> &nbsp;&nbsp; <span id='min"+h+"'>0</span> min <a href='javascript:void(1);' id='m_a_"+h+"' title='Add Minutes'>&#8593;</a> <a href='javascript:void(1);' id='m_s_"+h+"' title='Subtract Minutes'>&#8595;</a> &nbsp;&nbsp; <span id='sec"+h+"'>0</span> sec <a href='javascript:void(1);' id='s_a_"+h+"' title='Add Substract'>&#8593;</a> <a href='javascript:void(1);' id='s_s_"+h+"' title='Subtract Seconds'>&#8595;</a><div style='display:none;'>0</div>";
   document.getElementById('h_a_'+h).addEventListener('click',function(){this.parentNode.lastChild.innerHTML=parseInt(this.parentNode.lastChild.innerHTML)+3600;allProductionTimes(this.id);setProductionTimes(this.id,1);},true);
   document.getElementById('h_s_'+h).addEventListener('click',function(){this.parentNode.lastChild.innerHTML=parseInt(this.parentNode.lastChild.innerHTML)-3600;if(parseInt(this.parentNode.lastChild.innerHTML)<1)this.parentNode.lastChild.innerHTML=0;allProductionTimes(this.id);setProductionTimes(this.id,1);},true);
   document.getElementById('m_a_'+h).addEventListener('click',function(){this.parentNode.lastChild.innerHTML=parseInt(this.parentNode.lastChild.innerHTML)+60;allProductionTimes(this.id);setProductionTimes(this.id,1);},true);
   document.getElementById('m_s_'+h).addEventListener('click',function(){this.parentNode.lastChild.innerHTML=parseInt(this.parentNode.lastChild.innerHTML)-60;if(parseInt(this.parentNode.lastChild.innerHTML)<1)this.parentNode.lastChild.innerHTML=0;allProductionTimes(this.id);setProductionTimes(this.id,1);},true);
   document.getElementById('s_a_'+h).addEventListener('click',function(){this.parentNode.lastChild.innerHTML=parseInt(this.parentNode.lastChild.innerHTML)+1;allProductionTimes(this.id);setProductionTimes(this.id,1);},true);
   document.getElementById('s_s_'+h).addEventListener('click',function(){this.parentNode.lastChild.innerHTML=parseInt(this.parentNode.lastChild.innerHTML)-1;if(parseInt(this.parentNode.lastChild.innerHTML)<1)this.parentNode.lastChild.innerHTML=0;allProductionTimes(this.id);setProductionTimes(this.id,1);},true);
   eeMenu(r[i].childNodes,pg);
  }
 }else{
  eeMenu(ee.childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes,pg);
  for(i=0;i<r.length;i++){
   r[i].childNodes[2].firstChild.style.display=(pg=='c')?'block':'none';
   r[i].childNodes[2].childNodes[1].style.display=(pg=='p')?'block':'none';
   r[i].childNodes[2].lastChild.style.display=(pg=='r')?'block':'none';
   eeMenu(r[i].childNodes,pg);
  }
  for(i=0;i<r.length;i++){
   if(document.getElementById('data_'+r[i].firstChild.firstChild.id.split('_')[1]).style.visibility!='hidden'){
    allProductionParse('',r[i].firstChild.firstChild.id.split('_')[1],pg);
   }
  }
  allProductionWidth('',pg);
 }
 if(ee.lastChild.firstChild.firstChild.tagName.toLowerCase()=='input'){
  ee.removeChild(ee.lastChild);
  ee.removeChild(ee.lastChild);
 }
 ee.lastChild.firstChild.innerHTML="<a style='float:right;margin:.5em 30px;"+(pg=='p'?'':"position:relative;top:-.5em;")+"' href='javascript:void(1);' title='Unlock and Show All Rows'><div style='position:absolute;'>[+]</div></a><span"+(pg=='p'?'':" style='display:none;'")+">Total of Form: <span style='font:900 1.1em tahoma,arial;' id='shipFmCrd' name=''>0</span> Credits <span style='font:.9em tahoma,arial;' id='shipFmTtls'></span></span>";
 ee.lastChild.firstChild.firstChild.addEventListener('click',function(){var pg='';if(this.parentNode.parentNode.parentNode.childNodes[3].style.display=='') pg='p';else if(this.parentNode.parentNode.parentNode.childNodes[8].style.display=='') pg='c';else if(this.parentNode.parentNode.parentNode.childNodes[10].style.display=='') pg='r';var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;for(var x=0;x<r.length;x++){r[x].style.display='';}allProductionWidth('',pg);},false);
 ee.lastChild.firstChild.setAttribute('style','font-size:11px;background-color:#281020;padding-left:5%;');
 ee.lastChild.firstChild.removeAttribute('align');
 ee.appendChild(document.createElement("tr"));
 ee.lastChild.innerHTML="<td style='font-size:11px;background-color:#213;padding-left:5%;'><span"+(pg=='p'?'':" style='display:none;'")+">Total in Temp Q: <span style='font:900 1.1em tahoma,arial;' id='shipQCrd'>0</span> Credits <span style='font:.9em tahoma,arial;' id='shipQTtls'></span></span></td>";
 ee.appendChild(document.createElement("tr"));
 ee.lastChild.appendChild(document.createElement("td"));
 ee.lastChild.firstChild.setAttribute('style','text-align:center;padding:8px;');
 a=document.createElement("input");
 a.type="reset";
 a.setAttribute('style','float:right;font-weight:500;');
 a.value='Reset All';
 ee.lastChild.firstChild.appendChild(a);
 a.addEventListener('click',function(){allProductionTotal('1');},false);
 a=document.createElement("input");
 a.type="reset";
 a.setAttribute('style','float:left;font-weight:500;');
 a.value='Reset Selected';
 ee.lastChild.firstChild.appendChild(a);
 a.addEventListener('click',function(){allProductionTotal('s');},false);
 a=document.createElement("div");
 a.setAttribute('style','float:left;font-weight:500;margin:0 1em;');
 a.innerHTML="<span"+(pg=='p'?'':" style='display:none;'")+">Avail: <span id='availCrd' style='font:900 1.1em tahoma,arial;'>0</span> credits</span>";
 ee.lastChild.firstChild.appendChild(a);
 a=document.createElement("span");
 a.setAttribute('style','font:18px/.75 tahoma,arial;margin-right:2em;');
 a.id='submitAllProd';
 a.innerHTML="<a style='display:inline-block;margin-right:3px;padding:0 3px 3px;' href='javascript:this.blur();' title='Send Only Selected Rows'>&#8773;</a><a style='font-size:17px;display:inline-block;padding:0 3px 3px;' href='javascript:this.blur();' title='Send All Rows'>&#8801;</a>";
 a.style.display=(pg=='p')?'':'none';
 ee.lastChild.firstChild.appendChild(a);
 a.firstChild.className=(getSetting('config_submitAllProd',true))?'':'selLink';
 a.lastChild.className=(getSetting('config_submitAllProd',true))?'selLink':'';
 a.addEventListener('click',function(){if(document.getElementById('submitAllProd').lastChild.className==''){setSetting('config_submitAllProd',true)}else{setSetting('config_submitAllProd',false)}document.getElementById('submitAllProd').firstChild.className=(getSetting('config_submitAllProd',true))?'':'selLink';document.getElementById('submitAllProd').lastChild.className=(getSetting('config_submitAllProd',true))?'selLink':'';allProductionTotal();document.body.focus();},true);
 a=document.createElement("input");
 a.type="submit";
 a.value='Send Form'
 a.style.display=(pg=='p')?'':'none';
 ee.lastChild.firstChild.appendChild(a);
 a.addEventListener('click',function(){postAllProductions('f');},true);
 a=document.createElement("input");
 a.type="submit";
 a.value='Send Temp Q'
 a.style.marginLeft='6px';
 a.style.display=(pg=='p')?'':'none';
 ee.lastChild.firstChild.appendChild(a);
 a.addEventListener('click',function(){postAllProductions('q');},true);
 a=document.createElement("input");
 a.type="submit";
 a.value='-- Send Both --'
 a.style.marginLeft='26px';
 a.style.display=(pg=='p')?'':'none';
 ee.lastChild.firstChild.appendChild(a);
 a.addEventListener('click',function(){postAllProductions();},true);
 a=document.createElement("span");
 a.setAttribute('style','font-weight:500;margin:0 1em;');
 a.innerHTML="<span"+(pg=='p'?'':" style='display:none;'")+">Total: <span id='totalCrd' style='font:900 1.1em tahoma,arial;'>0</span> credits.</span>";
 ee.lastChild.firstChild.appendChild(a);
 if(pg=='p') allProductionTotal();
}

function eeMenu(r,pg){
 r[3].style.display=(pg=='p')?'':'none';
 r[4].style.display=(pg=='p')?'':'none';
 r[5].style.display=(pg=='p')?'':'none';
 r[6].style.display=(pg=='p')?'':'none';
 r[7].style.display=(pg=='p')?'':'none';
 r[8].style.display=(pg=='c')?'':'none';
 r[9].style.display=(pg=='c')?'':'none';
 r[10].style.display=(pg=='r')?'':'none';
 r[11].style.display=(pg=='c')?'':(pg=='r')?'':'none';
}

function allProdHangers(){
 var h=[-1,-1,-2,-2,0,0,0,4,4,0,0,4,60,8,40,400,200,1000,4000,10000,0],q=[],x=0,f=0;
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<r.length;i++){
  if(r[i].style.display=='none' || !r[i].firstChild.firstChild.checked) continue;
  q=r[i].childNodes[1].lastChild.lastChild.lastChild.childNodes;
  if(q.length<1) continue;
  f=0;
  for(x=0;x<q.length;x++){
   f+=h[q[x].innerHTML.split(',')[1]]*q[x].innerHTML.split(',')[0];
  }
  if(f<0){
   alert(Math.abs(f)+" more hanger spaces are required to carry all units in Temp Q at "+r[i].childNodes[1].firstChild.innerHTML);
  }else{
   if(r[i].childNodes[3].firstChild.selectedIndex>3) r[i].childNodes[3].firstChild.selectedIndex=0;
   if(r[i].childNodes[3].firstChild.selectedIndex==2 || r[i].childNodes[3].firstChild.selectedIndex==3) f/=2;
   r[i].childNodes[4].firstChild.firstChild.value=f;
  }
 }
 allProductionTotal();
}

function allProductionSelect(x,f){
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<r.length;i++){
  if(r[i].style.display=='none') continue;
  if(f){
   if(x==1 || (x==2 && !r[i].childNodes[6].firstChild.checked)) r[i].childNodes[6].firstChild.checked=true;
   else r[i].childNodes[6].firstChild.checked=false;
  }else{
   if(x==1 || (x==2 && !r[i].firstChild.firstChild.checked)) r[i].firstChild.firstChild.checked=true;
   else r[i].firstChild.firstChild.checked=false;
   r[i].style.backgroundColor=(r[i].firstChild.firstChild.checked)?'#124':'#020318';
  }
 }
 if(f) allProductionTotal();
}

function allProductionTimes(h){
 h=h.split('_')[2];
 if(document.getElementById('hr'+h).parentNode.lastChild.innerHTML>3599){
  var t = /(\d+)h (\d+)m (\d+)s/.exec(getTimeDisplay(document.getElementById('hr'+h).parentNode.lastChild.innerHTML));
  document.getElementById('hr'+h).innerHTML=t[1];
  document.getElementById('min'+h).innerHTML=t[2];
  document.getElementById('sec'+h).innerHTML=t[3];
 }else if(document.getElementById('hr'+h).parentNode.lastChild.innerHTML>59){
   var t = /(\d+)m (\d+)s/.exec(getTimeDisplay(document.getElementById('hr'+h).parentNode.lastChild.innerHTML));
  document.getElementById('hr'+h).innerHTML=0;
  document.getElementById('min'+h).innerHTML=t[1];
  document.getElementById('sec'+h).innerHTML=t[2];
 }else{
  var t = /(\d+)s/.exec(getTimeDisplay(document.getElementById('hr'+h).parentNode.lastChild.innerHTML));
  document.getElementById('hr'+h).innerHTML=0;
  document.getElementById('min'+h).innerHTML=0;
  document.getElementById('sec'+h).innerHTML=t[1];
 }
}

function setProductionTimes(h,a){
 var p=[5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000,20];
 if(a){
  h=h.split('_')[2];
  document.getElementById('quant_'+h).value=(document.getElementById('prod'+h))?(Math.floor(document.getElementById('prod'+h).innerHTML/p[document.getElementById('unit_'+h).selectedIndex]/3600*(parseInt(document.getElementById('hr'+h).parentNode.lastChild.innerHTML)+1)*(document.getElementById('fast_'+h).checked?2:1))):0;
  allProductionTotal('x');
 }else{
  h=h.split('_')[1];
  document.getElementById('hr'+h).parentNode.lastChild.innerHTML=(document.getElementById('prod'+h))?(Math.floor(document.getElementById('quant_'+h).value*p[document.getElementById('unit_'+h).selectedIndex]/document.getElementById('prod'+h).innerHTML*3600/(document.getElementById('fast_'+h).checked?2:1))):0;
  allProductionTimes('__'+h);
 }
}

function allProductionQueueAll(a){
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<r.length;i++){
  if(r[i].style.display=='none' || (a && !r[i].firstChild.firstChild.checked)) continue;
  allProductionQueueAdd(r[i].childNodes[1].firstChild.href.split('=')[1]);
 }
 allProductionWidth('','p');
}

function allProductionQueueAdd(h){
 if(parseInt(document.getElementById('quant_'+h).value)<1) return;
 var c = document.getElementById('data_'+h).lastChild.lastChild.appendChild(document.createElement('div'));
 c.innerHTML = document.getElementById('quant_'+h).value+","+document.getElementById('unit_'+h).selectedIndex+',';
 if(document.getElementById('fast_'+h).checked) c.innerHTML += '1';
 else c.innerHTML += '0';
 allProductionParse('',h,'p');
}

function allProductionCopy(d){
 var a = d.split('_')[1];
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<r.length;i++){
  if(a && a==r[i].childNodes[0].firstChild.id.split('_')[1]){setAllProductions(d.split('_')[0],i);break;}
 }
}

function allProductionQueueCopy(h,a){
 var d=document.getElementById('data_'+h).lastChild.lastChild.innerHTML;
 if(d=='') return;
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<r.length;i++){
  if(r[i].style.display=='none' || (a && !r[i].firstChild.firstChild.checked)) continue;
  r[i].childNodes[1].lastChild.lastChild.lastChild.innerHTML=d;
  allProductionParse('',r[i].childNodes[1].firstChild.href.split('=')[1],'p');
 }
}

function allProductionsData(a,n,pg){
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<r.length;i++){
  if((a && a!='a' && a!='x' && !r[i].firstChild.firstChild.checked) || r[i].style.display=='none') continue;
  if(a!=i && a!='x' && r[i].childNodes[1].lastChild.style.visibility=='hidden'){
   allProductionParse('',r[i].childNodes[1].firstChild.href.split('=')[1],pg);
  }else if(a!='a' && a!='s'){
   r[i].childNodes[1].lastChild.style.visibility='hidden';
   r[i].style.height='';
   document.getElementById('dat_'+r[i].childNodes[1].firstChild.href.split('=')[1]).firstChild.innerHTML="&#8659;";
  }
 }
 allProductionWidth(n,pg);
}

function setAllProductions(a,w){
 var x=(w)?w:-1;
 var h='',r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<r.length;i++){
  if(r[i].style.display=='none') continue;
  if(x==-1) x=i;
  if(a && a!='1' && a!='3' && a!='ca' && !r[i].firstChild.firstChild.checked) continue;
  h = r[i].childNodes[1].firstChild.href.split('=')[1];
  if(a=='1' || a=='2'){
   document.getElementById('quant_'+h).value=document.getElementById('quant_'+r[x].childNodes[1].firstChild.href.split('=')[1]).value;
  }else if(a=='3' || a=='4'){
   document.getElementById("unit_"+h).selectedIndex=document.getElementById("unit_"+r[x].childNodes[1].firstChild.href.split('=')[1]).selectedIndex;
  }else{
   document.getElementById("unit_"+h).selectedIndex=document.getElementById("unit_"+r[x].childNodes[1].firstChild.href.split('=')[1]).selectedIndex;
   document.getElementById('quant_'+h).value=document.getElementById('quant_'+r[x].childNodes[1].firstChild.href.split('=')[1]).value;
   document.getElementById("fast_"+h).checked=document.getElementById("fast_"+r[x].childNodes[1].firstChild.href.split('=')[1]).checked;
  }
 }
 allProductionTotal();
}

function allProdRemaining(){
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 var p=[5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000,20],w=[],w2=[],t=0,b=500001;
 for(var i=0;i<r.length;i++){
  if(r[i].style.display=='none' || !r[i].firstChild.firstChild.checked) continue;
  r[i].childNodes[4].firstChild.firstChild.value=0;
  w.push(p[r[i].childNodes[3].firstChild.selectedIndex]);
  w2.push(p[r[i].childNodes[3].firstChild.selectedIndex]);
  t+=parseInt(p[r[i].childNodes[3].firstChild.selectedIndex]);
  if(b>p[r[i].childNodes[3].firstChild.selectedIndex]) b=p[r[i].childNodes[3].firstChild.selectedIndex];
 }
 allProductionTotal();
 var c=cleanNumbers(document.getElementById('credits').nextSibling.innerHTML)-cleanNumbers(document.getElementById('shipFmCrd').innerHTML)-cleanNumbers(document.getElementById('shipQCrd').innerHTML);
 if(c<5){alert('Not enough credits to build any more.');return;}
 if(c<t){alert('Not enough credits to build at least 1 of each selected units.');return;}
 var l=w.length;
 var a=c;
 for(i=0;i<r.length;i++){
  if(r[i].style.display=='none' || !r[i].firstChild.firstChild.checked) continue;
  a-=parseInt(c/(l*w[0]))*w[0];
  r[i].childNodes[4].firstChild.firstChild.value=parseInt(c/(l*w.shift()));
 }
 allProdNibble(w2,a,r,b);
 allProductionTotal();
}

function allProdNibble(w2,a,r,b){
 if(a<b) return;
 var w=[];
 for(var v in w2){w.push(w2[v]);}
 for(var i=0;i<r.length;i++){
  if(r[i].style.display=='none' || !r[i].firstChild.firstChild.checked) continue;
  t=parseInt(a/w[0]);
  if(t>=1){
   r[i].childNodes[4].firstChild.firstChild.value=parseInt(r[i].childNodes[4].firstChild.firstChild.value)+1;
   a-=parseInt(w[0]);
  }
  w.shift();
 }
 allProdNibble(w2,a,r,b)
}

function allProductionTotal(a){
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 var p=[5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000,20],z;
 var k=["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods"],s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],u=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
 var c=0,q=0,d,h='',i=0,x=0,fs=0,qs=0;
 for (i=0;i<r.length;i++){
  h=r[i].childNodes[1].firstChild.href.split('=')[1];
  if(a=='1'){
   r[i].style.display='';
   r[i].style.backgroundColor='#020318';
   document.getElementById("sel_"+h).checked=false;
   document.getElementById("unit_"+h).selectedIndex=0;
   document.getElementById("fast_"+h).checked=false;
   document.getElementById("quant_"+h).value=0;
   document.getElementById("quant_"+h).style.backgroundColor=unescape(getSetting('config_overrideFormBack','#006'));
   document.getElementById('data_'+h).lastChild.lastChild.innerHTML='';
   document.getElementById('q_'+h).firstChild.nodeValue='(0)';
   document.getElementById('unit_'+h).nextSibling.innerHTML="0 &#164;";
   document.getElementById('hr'+h).innerHTML=0;
   document.getElementById('min'+h).innerHTML=0;
   document.getElementById('sec'+h).innerHTML=0;
   document.getElementById('hr'+h).parentNode.lastChild.innerHTML=0;
  }else if(r[i].style.display=='none'){
   continue;
  }else if(a=='s' && r[i].firstChild.firstChild.checked){
   r[i].childNodes[1].lastChild.style.visibility='hidden';
   r[i].style.height='';
   document.getElementById('dat_'+h).firstChild.innerHTML="&#8659;";
   document.getElementById("unit_"+h).selectedIndex=0;
   document.getElementById("fast_"+h).checked=false;
   document.getElementById("quant_"+h).value=0;
   document.getElementById("quant_"+h).style.backgroundColor=unescape(getSetting('config_overrideFormBack','#006'));
   document.getElementById('data_'+h).lastChild.lastChild.innerHTML='';
   document.getElementById('q_'+h).firstChild.nodeValue='(0)';
   document.getElementById('unit_'+h).nextSibling.innerHTML="0 &#164;";
   document.getElementById('hr'+h).innerHTML=0;
   document.getElementById('min'+h).innerHTML=0;
   document.getElementById('sec'+h).innerHTML=0;
   document.getElementById('hr'+h).parentNode.lastChild.innerHTML=0;
  }else if(a=='3'){
   document.getElementById("quant_"+h).value=0;
   document.getElementById('unit_'+h).nextSibling.innerHTML="0 &#164;";
   document.getElementById('hr'+h).innerHTML=0;
   document.getElementById('min'+h).innerHTML=0;
   document.getElementById('sec'+h).innerHTML=0;
   document.getElementById('hr'+h).parentNode.lastChild.innerHTML=0;
  }else{
   if(a=='2'){
    document.getElementById("unit_"+h).selectedIndex=0;
    setProductionTimes('_'+h);
   }
   d=document.getElementById("quant_"+h);
   d.value=parseInt(d.value.replace(/[^\d]/g,''));
   if(isNaN(d.value) || d.value=='' || parseInt(d.value)<1) document.getElementById("quant_"+h).value=0;
   document.getElementById("quant_"+h).style.backgroundColor='';
   document.getElementById('unit_'+h).nextSibling.innerHTML=commaFormat(p[document.getElementById("unit_"+h).selectedIndex] * document.getElementById("quant_"+h).value * ((document.getElementById("fast_"+h).checked)?2:1))+" &#164;";
   if(a!='x') setProductionTimes('_'+h);
   if(getSetting('config_submitAllProd',true) || r[i].firstChild.firstChild.checked){
    c+=p[document.getElementById("unit_"+h).selectedIndex]*d.value*(document.getElementById("fast_"+h).checked?2:1);
    if(parseInt(d.value)>0) fs++;
    s[document.getElementById("unit_"+h).selectedIndex]+=parseInt(d.value);
    z=document.getElementById("data_"+h).lastChild.lastChild.childNodes;
    for(x=0;x<z.length;x++){
     u[z[x].innerHTML.split(',')[1]]+=parseInt(z[x].innerHTML.split(',')[0]);
     q+=p[z[x].innerHTML.split(',')[1]]*z[x].innerHTML.split(',')[0]*(z[x].innerHTML.split(',')[2]=='1'?2:1);
     if(parseInt(z[x].innerHTML.split(',')[0])>0) qs++;
    }
   }
  }
 }
 if(a=='1') allProductionsData('x',true);
 h='';
 for(i in s){
  if(s[i]>0){
   h+=' &nbsp; '+s[i]+' '+k[i];
  }
 }
 if(h!='') h='= '+h;
 document.getElementById('shipFmTtls').innerHTML=h;
 document.getElementById('shipFmCrd').innerHTML=commaFormat(c);
 document.getElementById('shipFmCrd').setAttribute('name',fs);
 document.getElementById('shipFmCrd').style.color=((parseInt(document.getElementById('credits').nextSibling.innerHTML.replace(/(,| |\.)/g,""))-c)<0)?'red':unescape(getSetting('config_overrideHeading','#FFF'));
 h='';
 for(i in u){
  if(u[i]>0){
   h+=' &nbsp; '+u[i]+' '+k[i];
  }
 }
 if(h!='') h='= '+h;
 document.getElementById('shipQTtls').innerHTML=h;
 document.getElementById('shipQCrd').innerHTML=commaFormat(q);
 document.getElementById('shipQCrd').setAttribute('name',qs);
 document.getElementById('shipQCrd').style.color=((parseInt(document.getElementById('credits').nextSibling.innerHTML.replace(/(,| |\.)/g,""))-q)<0)?'red':unescape(getSetting('config_overrideHeading','#FFF'));

 document.getElementById('availCrd').innerHTML=commaFormat(parseInt(cleanNumbers(document.getElementById('credits').nextSibling.innerHTML))-parseInt(cleanNumbers(document.getElementById('shipFmCrd').innerHTML))-parseInt(cleanNumbers(document.getElementById('shipQCrd').innerHTML)));
 document.getElementById('totalCrd').innerHTML=commaFormat(parseInt(cleanNumbers(document.getElementById('shipFmCrd').innerHTML))+parseInt(cleanNumbers(document.getElementById('shipQCrd').innerHTML)));
}

function allProductionParse(s,i,pg){
 if(pg=='c') pg=0;
 else if(pg=='p') pg=1;
 else if(pg=='r') pg=2;
 var a=[],c=document.getElementById('data_'+i).firstChild.childNodes[2],d=document.getElementById('data_'+i).lastChild.childNodes[2].childNodes,x=0,h='';
 var q=document.getElementById('data_'+i).lastChild.childNodes[1].childNodes[pg].childNodes;
 var k=["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods"];
 var p=[5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000,20];
 document.getElementById('data_'+i).parentNode.parentNode.style.height='';
 if(parseInt(document.getElementById('data_'+i).parentNode.nextSibling.lastChild.offsetTop)+parseInt(document.getElementById('data_'+i).parentNode.nextSibling.lastChild.offsetHeight)>parseInt(document.getElementById('data_'+i).previousSibling.offsetTop)+parseInt(document.getElementById('data_'+i).previousSibling.offsetHeight)) document.getElementById('data_'+i).style.marginTop='11px';
 else document.getElementById('data_'+i).style.marginTop='3px';
 if(s=='1'){
  h="<div style='"+(pg==0?'':'display:none;')+"'><div style='width:100%;padding:1px;border:1px solid "+getSetting('config_overrideBorderRow','#1C1C1C')+";'>Construction Capacity</div>";
  if(getSetting('baseData'+i,null)!=null){
   var b = getSetting('baseData'+i).split('|');
   h+="<table style='width:100%;margin:0 auto;border:1px solid "+getSetting('config_overrideBorderRow','#1C1C1C')+";border-top:0;background:transparent none;'><tr style='text-align:center;'><td style='width:5%;'>&nbsp;</td><td style='padding:3px;border:0;font-size:10px;'>Base<br><b>"+b[2]+"</b></td><td style='padding:3px;border:0;font-size:10px;'>Cmdr<br><b>"+(b[5].indexOf(document.getElementById('allConstName').innerHTML)!=-1?(/(\d+)\)/.exec(b[5])[1]):'-')+"</b></td><td style='padding:3px;border:0;font-size:10px;'>Total<br><b id='const"+i+"'>"+(b[5].indexOf(document.getElementById('allConstName').innerHTML)!=-1?Math.round(b[2]/(1-/(\d+)\)/.exec(b[5])[1]/100)*100)/100:b[2])+"</b></td><td style='width:5%;'>&nbsp;</td></tr></table></div>";
  }else{
   h+="<br><a href='"+document.getElementById('data_'+i).parentNode.firstChild.href+"' target='b5l5a5n5k2'>Update</a></div>";
  }
  h+="<div style='"+(pg==1?'':'display:none;')+"'><div style='width:100%;padding:1px;border:1px solid "+getSetting('config_overrideBorderRow','#1C1C1C')+";'>Production Capacity</div>";
  if(getSetting('baseData'+i,null)!=null){
   var b = getSetting('baseData'+i).split('|');
   h+="<table style='width:100%;margin:0 auto;border:1px solid "+getSetting('config_overrideBorderRow','#1C1C1C')+";border-top:0;background:transparent none;'><tr style='text-align:center;'><td style='width:5%;'>&nbsp;</td><td style='padding:3px;border:0;font-size:10px;'>Base<br><b>"+b[3]+"</b></td><td style='padding:3px;border:0;font-size:10px;'>Cmdr<br><b>"+(b[5].indexOf(document.getElementById('allProdName').innerHTML)!=-1?(/(\d+)\)/.exec(b[5])[1]):'-')+"</b></td><td style='padding:3px;border:0;font-size:10px;'>Total<br><b id='prod"+i+"'>"+(b[5].indexOf(document.getElementById('allProdName').innerHTML)!=-1?Math.round(b[3]/(1-/(\d+)\)/.exec(b[5])[1]/100)*100)/100:b[3])+"</b></td><td style='width:5%;'>&nbsp;</td></tr></table></div>";
  }else{
   h+="<br><a href='"+document.getElementById('data_'+i).parentNode.firstChild.href+"' target='b5l5a5n5k2'>Update</a></div>";
  }
  h+="<div style='"+(pg==2?'':'display:none;')+"'><div style='width:100%;padding:1px;border:1px solid "+getSetting('config_overrideBorderRow','#1C1C1C')+";'>Research Capacity</div>";
  if(getSetting('baseData'+i,null)!=null){
   var b = getSetting('baseData'+i).split('|');
   h+="<table style='width:100%;margin:0 auto;border:1px solid "+getSetting('config_overrideBorderRow','#1C1C1C')+";border-top:0;background:transparent none;'><tr style='text-align:center;'><td style='width:5%;'>&nbsp;</td><td style='padding:3px;border:0;font-size:10px;'>Base<br><b>"+b[4]+"</b></td><td style='padding:3px;border:0;font-size:10px;'>Cmdr<br><b>"+(b[5].indexOf(document.getElementById('allRsrchName').innerHTML)!=-1?(/(\d+)\)/.exec(b[5])[1]):'-')+"</b></td><td style='padding:3px;border:0;font-size:10px;'>Total<br><b id='rsrch"+i+"'>"+(b[5].indexOf(document.getElementById('allRsrchName').innerHTML)!=-1?Math.round(b[4]/(1-/(\d+)\)/.exec(b[5])[1]/100)*100)/100:b[4])+"</b></td><td style='width:5%;'>&nbsp;</td></tr></table></div>";
  }else{
   h+="<br><a href='"+document.getElementById('data_'+i).parentNode.firstChild.href+"' target='b5l5a5n5k2'>Update</a></div>";
  }
  c.parentNode.firstChild.innerHTML=h;
  return;
 }else{
  c.parentNode.firstChild.firstChild.style.display=(pg==0)?'':'none';
  c.parentNode.firstChild.childNodes[1].style.display=(pg==1)?'':'none';
  c.parentNode.firstChild.lastChild.style.display=(pg==2)?'':'none';
 }
 for(x=0;x<3;x++){c.previousSibling.childNodes[x].style.display=(x==pg)?'':'none';}
 if(c.previousSibling.childNodes[pg].childNodes.length>0 && c.previousSibling.childNodes[pg].firstChild.tagName.toLowerCase()=='div') unsafeWindow.q-=c.previousSibling.childNodes[pg].childNodes.length;
 c.previousSibling.childNodes[pg].innerHTML='';
 if(q.length>0){
  var y=0;
  for(x=0;x<q.length;x++){
   y=0;
   for(var z=1;z<=unsafeWindow.q;z++){
    if(!document.getElementById('time'+z)){
     y=z;
     break;
    }
   }
   unsafeWindow.q++;
   if(y==0) y=unsafeWindow.q;
   c.previousSibling.childNodes[pg].innerHTML+="<div><a title='Cancel Production of this Q item.' style='font:18px/.75 tahoma,arial;float:left;margin-left:10px;width:0;' href='"+unescape(q[x].innerHTML.split('|')[2])+"' target='_blank'>&#215;</a><a href='base.aspx?base="+i+"&view=production'>"+q[x].innerHTML.split('|')[1]+"</a><br><span class='help comment' title='"+q[x].innerHTML.split('|')[0]+"' id='time"+y+"'></span></div>";
  }
 }else if(pg!=2 || (document.getElementById('data_'+i).parentNode.parentNode.childNodes[2].lastChild.firstChild && /^([^\{]+)/.exec(document.getElementById('data_'+i).parentNode.parentNode.childNodes[2].lastChild.firstChild.innerHTML))){
  c.previousSibling.childNodes[pg].innerHTML="<a href='javascript:void(1);'>Update Queue</a>";
  c.previousSibling.childNodes[pg].firstChild.addEventListener('click',function(){postAllProductions(i);},false);
 }

 h="<table style='white-space:nowrap;width:100%;border:1px solid "+getSetting('config_overrideBorderRow','#1C1C1C')+";background:transparent none;'><tr>";
 if(pg==1) h+="<td width=1>&nbsp;</td><td width=1>&nbsp;</td><th style='font-size:11px;padding:1px;'>Quantity</th><th style='text-align:left;font-size:11px;padding:1px;'>&nbsp;Ship&nbsp;Type</th><th style='text-align:right;font-size:11px;padding:1px;'>Cost</th><th style='text-align:left;font-size:11px;padding:1px;'>&nbsp;-&nbsp;Time</th><th style='font-size:11px;padding:1px;'>Cancel</th>";
 else if(pg==0) h+="";
 else if(pg==2) h+="";
 else h+="";

 h+="<td style='vertical-align:top;width:"+(document.getElementById('data_'+i).parentNode.parentNode.childNodes[6].clientWidth-8)+"px;'><div id='qp_"+i+"' style='float:right;position:relative;left:5px;width:0;height:0;overflow:visible;'><div style='"+(pg==1?'':'display:none;')+"float:left;width:"+document.getElementById('data_'+i).parentNode.parentNode.childNodes[7].clientWidth+"px;text-align:center;vertical-align:center;font:18px/.75 tahoma,arial;'><a style='font-size:17px;' href='javascript:void(1);' title='Copy Q to All Rows'>&#8801;</a>&nbsp;<a href='javascript:void(1);' title='Copy Q to Selected Rows'>&#8773;</a></div><div style='"+(pg==1?'':'display:none;')+"width:"+document.getElementById('data_'+i).parentNode.parentNode.lastChild.clientWidth+"px;text-align:center;vertical-align:center;margin-left:"+document.getElementById('data_'+i).parentNode.parentNode.childNodes[7].clientWidth+"px;font:18px/.75 tahoma,arial;'><a href='javascript:void(1);' title='Clear This Q'>&#215;</a></div><div style='text-align:center;clear:both;width:"+(document.getElementById('data_'+i).parentNode.parentNode.childNodes[7].clientWidth+document.getElementById('data_'+i).parentNode.parentNode.lastChild.clientWidth)+"px;margin-top:1em;'><a href='javascript:void(1);' title='Hide This Q'>Close</a></div></div></td></tr>";
 if(pg==1){
  for(x=0;x<d.length;x++){
   a=d[x].innerHTML.split(',');
   h+="<tr><td style='padding:0;text-align:center;font:900 15px tahoma,arial;'><a href='javascript:void(1);' row='"+x+"' title='Set this row first.'>&#8593;</a></td><td style='padding:0;text-align:center;font:900 15px tahoma,arial;'><a href='javascript:void(1);' row='"+x+"' title='Set this row last.'>&#8595;</a></td><td style='padding:1px;text-align:center;'>"+commaFormat(a[0])+"</td><td style='padding:1px;'>&nbsp;"+k[a[1]]+"</td><td style='padding:1px;text-align:right;'>"+commaFormat(a[0]*p[a[1]]*(parseInt(a[2])+1))+" &#164;</td><td style='padding:1px;'>&nbsp;-&nbsp;"+getTimeDisplay((a[0]*p[a[1]]/(parseInt(a[2])+1))/document.getElementById('prod'+i).innerHTML*3600)+"</td><td style='padding:0;text-align:center;font:18px/.75 tahoma,arial'><a href='javascript:void(1);' row='"+x+"'>&#215;</a></td><td style='padding:0;text-align:center;'><input row='"+x+"' type='checkbox'";
   if(a[2]==1) h+=" checked";
   h+="></td></tr>";
  }
 }
 h+="</table>";
 c.innerHTML=h;
 h=document.getElementById('qp_'+i);
 h.firstChild.firstChild.addEventListener('click',function(){allProductionQueueCopy(i);},false);
 h.firstChild.lastChild.addEventListener('click',function(){allProductionQueueCopy(i,true);},false);
 h.childNodes[1].firstChild.addEventListener('click',function(){var pg='',d=document.getElementById('data_'+this.parentNode.parentNode.id.split('_')[1]);if(d.parentNode.parentNode.childNodes[3].style.display=='') pg='p';else if(d.parentNode.parentNode.childNodes[8].style.display=='') pg='c';else if(d.parentNode.parentNode.childNodes[10].style.display=='') pg='r';d.lastChild.lastChild.innerHTML='';allProductionParse('',i,pg);allProductionTotal();},false);
 h.lastChild.firstChild.addEventListener('click',function(){var c=document.getElementById('data_'+this.parentNode.parentNode.id.split('_')[1]);c.style.visibility='hidden';c.parentNode.parentNode.style.height='';c.parentNode.childNodes[2].firstChild.innerHTML='&#8659;';},false);
 document.getElementById('q_'+i).firstChild.nodeValue='('+d.length+')';
 d=c.firstChild.firstChild.childNodes;
 for(x=1;x<d.length;x++){
  d[x].childNodes[0].firstChild.addEventListener('click',function(){var pg='';if(this.parentNode.parentNode.childNodes[3].style.display=='') pg='p';else if(this.parentNode.parentNode.childNodes[8].style.display=='') pg='c';else if(this.parentNode.parentNode.childNodes[10].style.display=='') pg='r';document.getElementById('data_'+i).lastChild.childNodes[2].insertBefore(document.getElementById('data_'+i).lastChild.childNodes[2].removeChild(document.getElementById('data_'+i).lastChild.childNodes[2].childNodes[this.getAttribute('row')]),document.getElementById('data_'+i).lastChild.childNodes[2].firstChild);allProductionParse('',i,pg);},false);
  d[x].childNodes[1].firstChild.addEventListener('click',function(){var pg='';if(this.parentNode.parentNode.childNodes[3].style.display=='') pg='p';else if(this.parentNode.parentNode.childNodes[8].style.display=='') pg='c';else if(this.parentNode.parentNode.childNodes[10].style.display=='') pg='r';document.getElementById('data_'+i).lastChild.childNodes[2].appendChild(document.getElementById('data_'+i).lastChild.childNodes[2].removeChild(document.getElementById('data_'+i).lastChild.childNodes[2].childNodes[this.getAttribute('row')]));allProductionParse('',i,pg);},false);
  d[x].childNodes[6].firstChild.addEventListener('click',function(){var pg='';if(this.parentNode.parentNode.childNodes[3].style.display=='') pg='p';else if(this.parentNode.parentNode.childNodes[8].style.display=='') pg='c';else if(this.parentNode.parentNode.childNodes[10].style.display=='') pg='r';document.getElementById('data_'+i).lastChild.childNodes[2].removeChild(document.getElementById('data_'+i).lastChild.childNodes[2].childNodes[this.getAttribute('row')]);allProductionParse('',i,pg);allProductionWidth('',pg);},false);
  d[x].childNodes[7].firstChild.addEventListener('change',function(){var pg='';if(this.parentNode.parentNode.childNodes[3].style.display=='') pg='p';else if(this.parentNode.parentNode.childNodes[8].style.display=='') pg='c';else if(this.parentNode.parentNode.childNodes[10].style.display=='') pg='r';document.getElementById('data_'+i).lastChild.childNodes[2].childNodes[this.getAttribute('row')].innerHTML=document.getElementById('data_'+i).lastChild.childNodes[2].childNodes[this.getAttribute('row')].innerHTML.replace(/\d$/,(this.checked)?1:0);allProductionParse('',i,pg);allProductionTotal();},false);
 }
 h=document.getElementById('dat_'+i);
 addFinishTimes();
 h.parentNode.lastChild.style.visibility='';
 h.parentNode.parentNode.style.height=h.parentNode.parentNode.clientHeight+parseInt(h.parentNode.lastChild.clientHeight)+'px';
 h.firstChild.innerHTML="&#8657";
}

function allProductionWidth(n,pg){
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes,i;
 for(var x=0;x<r.length;x++){
  i=r[x].childNodes[0].firstChild.id.split('_')[1]
  document.getElementById('data_'+i).style.width=document.getElementById('empire_events').clientWidth-parseInt(unescape(getSetting('config_overrideBorderSize',"2")));
  document.getElementById('data_'+i).firstChild.style.marginRight=parseInt(document.getElementById('data_'+i).parentNode.parentNode.lastChild.clientWidth)+(pg=='p'?parseInt(document.getElementById('data_'+i).parentNode.parentNode.childNodes[7].clientWidth):0)+'px'
  document.getElementById('data_'+i).firstChild.firstChild.style.width=parseInt(document.getElementById('data_'+i).parentNode.previousSibling.clientWidth)+parseInt(document.getElementById('data_'+i).parentNode.clientWidth)-40+'px';
  document.getElementById('data_'+i).firstChild.childNodes[1].style.width=document.getElementById('data_'+i).parentNode.nextSibling.clientWidth+60+'px';
  document.getElementById('data_'+i).firstChild.lastChild.style.width=document.getElementById('data_'+i).firstChild.clientWidth-document.getElementById('data_'+i).firstChild.firstChild.clientWidth-document.getElementById('data_'+i).firstChild.childNodes[1].clientWidth+'px';
 }
 if(!n) allProductionTotal();
}

function postAllProductions(q){
 allProductionsData('x');
 var h="<div style='position:absolute;bottom:0;right:4px;height:300px;text-align:center;'><div style='text-align:center;display:inline-block;background:rgb(0,0,0) none;padding:20px;border:1px solid #333;font-weight:500;'><h3>";
 if(q=='f'){if(parseInt(document.getElementById('shipFmCrd').innerHTML)<1) return;h+="Production Submission</h3>You are submittong the <b>FORM</b> only.<br><br><b>"+document.getElementById('shipFmCrd').getAttribute('name')+"</b> entries<br>Total: "+document.getElementById('shipFmCrd').innerHTML+' credits.';}
 else if(q=='q'){if(parseInt(document.getElementById('shipQCrd').innerHTML)<1) return;h+="Production Submission</h3>You are submitting the <b>Temp Q</b> only.<br><br><b>"+document.getElementById('shipQCrd').getAttribute('name')+"</b> entries<br>Total: "+document.getElementById('shipQCrd').innerHTML+' credits.';}
 else if(q && q.match(/\d/)!=null){var b=q.split(',');if(b[0]=='c'){b[0]=b.pop();if(document.getElementById('struc_'+b[0]).value=='' && document.getElementById('def_'+b[0]).value=='') return;if(document.getElementById('struc_'+b[0]).value!='' && document.getElementById('def_'+b[0]).value!=''){alert('You need to choose either a structure or defense to build, but not both.');return;}h+="Construction</h3>"+document.getElementById('data_'+b[0]).parentNode.firstChild.innerHTML+'<br><br>'+(document.getElementById('struc_'+b[0]).value!=''?document.getElementById('struc_'+b[0]).value:document.getElementById('def_'+b[0]).value)+'<br>';}else if(b[0]=='r'){b[0]=b.pop();if(document.getElementById('tech_'+b[0]).value=='') return;h+="Research</h3>"+document.getElementById('data_'+b[0]).parentNode.firstChild.innerHTML+'<br><br>'+document.getElementById('tech_'+b[0]).value+'<br>';}else{h+="Queue Data Update</h3>Base List<br><br>";for(var i=0;i<b.length;i++){h+=document.getElementById('data_'+b[i]).parentNode.firstChild.innerHTML+'<br>';}}}
 else{if(parseInt(document.getElementById('shipFmCrd').innerHTML)<1 && parseInt(document.getElementById('shipQCrd').innerHTML)<1) return;h+="Production Submission</h3>You are submitting <b>BOTH</b> the Form and the Temp Q.<br><br><b>"+(parseInt(document.getElementById('shipFmCrd').getAttribute('name'))+parseInt(document.getElementById('shipQCrd').getAttribute('name')))+"</b> entries<br>Total: "+(commaFormat(parseInt(cleanNumbers(document.getElementById('shipQCrd').innerHTML))+parseInt(cleanNumbers(document.getElementById('shipFmCrd').innerHTML))))+' credits.';}
 var c=document.body.appendChild(document.createElement('div'));
 c.setAttribute('style',"background:rgba(0,0,0,.35) none;border:3px double #FF6464;top:"+document.getElementById('empire_events').offsetTop+"px;left:"+document.getElementById('empire_events').offsetLeft+"px;position:absolute;width:"+(document.getElementById('empire_events').offsetWidth-6)+"px;height:"+(document.getElementById('empire_events').offsetHeight-6)+"px;");
 h+="<div style='margin:2em;'><label style='position:relative;top:-.5em;'>Show Log: <input type='checkbox' id='showProdLog'"+((getSetting('showProdLog',true))?' checked':'')+" ></label><h4 style='margin:2px;'>Throttle</h4># of Entries / Min: <input size=4 maxlength=4 id='STD' value='"+getSetting('allProdSTD',30)+"'></div>";
 h+="<div style='margin:2em;'><input onclick='document.body.removeChild(document.body.lastChild);' class='AETbut' type='button' value='Cancel'><input style='margin-left:35px;padding:4px;' type='submit' value='Start'></div>";
 h+="</div></div>";
 c.innerHTML=h;
 c.firstChild.firstChild.lastChild.lastChild.addEventListener('click',function(){if(parseInt(document.getElementById('STD').value)>0){setSetting('allProdSTD',document.getElementById('STD').value);doAllProductions(q,document.getElementById('showProdLog').checked);}},false);
 c.firstChild.firstChild.lastChild.lastChild.focus();
 document.getElementById('showProdLog').addEventListener('change',function(){setSetting('showProdLog',this.checked);},false);
}

function doAllProductions(q,l){
 var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 var c = document.body.lastChild.firstChild.firstChild;
 var v,u,p,x=0;
 var k=["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods"];
 var post = function(l,o){setTimeout(function(){
  if(!document.getElementById('submitData').firstChild){
   if(l) document.getElementById('APlog').innerHTML+="<br>Server Posting Finished<br>";
   document.getElementById('readOut').innerHTML="Server Posting Finished";
   return;
  }
  var d=document.getElementById('submitData').removeChild(document.getElementById('submitData').firstChild);
  var z=(document.getElementById('submitData').firstChild)?false:true;
  var dt='',mt='POST';
  if(q && q.match(/\d/)!=null){
   if(q.split(',')[0]=='c' || q.split(',')[0]=='r'){
    dt=unescape(d.innerHTML);
   }else{
    mt='GET';
   }
   document.getElementById('readOut').innerHTML="Updating Queue at "+d.getAttribute('name')+'<br>';
   if(l) document.getElementById('APlog').innerHTML+="Requesting Queue at "+d.getAttribute('name')+'<br>';
  }else{
   document.getElementById('readOut').innerHTML="Building "+unescape(d.innerHTML).split('&')[0].split('=')[1]+" "+unescape(unescape(d.innerHTML).split('=')[0])+" at "+d.getAttribute('name')+'<br>';
   if(l) document.getElementById('APlog').innerHTML+="Building "+unescape(d.innerHTML).split('&')[0].split('=')[1]+" "+unescape(unescape(d.innerHTML).split('=')[0])+" at "+d.getAttribute('name')+'<br>';
   dt=unescape(d.innerHTML);
  }
  GM_xmlhttpRequest({
   method: mt,
   url: d.getAttribute('url'),
   data: dt,
   headers:{'Content-type':'application/x-www-form-urlencoded'},
   onload: function(responseDetails){
    var f=document.createElement('div'),pg=1;
    var id=d.getAttribute('url').split('=')[1].split('&')[0];
    if(!q || q.match(/\d/)==null){
     f.setAttribute('type',unescape(unescape(d.innerHTML).split('=')[0]));
     f.setAttribute('num',unescape(d.innerHTML).split('&')[0].split('=')[1]);
    }else f.setAttribute('num',1);
    f.setAttribute('style',"height:200px;margin:20px 20px 0;border:3px inset rgba(40,50,60,.6);background-color:#004;overflow:auto;display:none;");
    f.innerHTML=responseDetails.responseText.split('<body>')[1].split('</body>')[0];
    f.removeChild(f.firstChild);
    f.removeChild(f.firstChild);
    f.removeChild(f.firstChild);
    f.removeChild(f.firstChild);
    f.removeChild(f.firstChild);
    if(!q || (q.split(',')[0]!='c' && q.split(',')[0]!='r')){
     var j=document.evaluate("//.[contains(@id,'time1')]",f,null,9,null).singleNodeValue;
     if(j) j=j.title;
     f.removeChild(f.lastChild);
     f.innerHTML=f.innerHTML.replace(/time\d+/g,'');
    }else{
     if(q.match(/\d/)!=null) f.removeChild(f.lastChild);
     f.style.display=='';
     q=q.split(',')[1];
    }
    document.getElementById('APlog').appendChild(f);
    document.getElementById('APlog').innerHTML+='';
    if(l) document.getElementById('APlog').innerHTML+="Data Retrieved for "+d.getAttribute('name')+"<br>";
    if(l) document.getElementById('APlog').innerHTML+="Parsing "+d.getAttribute('name')+"<br>";
    var r=document.getElementById('sel_'+id).parentNode.parentNode,e='';
    if(r.childNodes[2].firstChild.style.display!='none') pg=0;
    else if(r.childNodes[2].lastChild.style.display!='none') pg=2;
    if(pg==0 || pg==2) var qs=document.evaluate("//table[contains(@id,'base_queue')]",f,null,9,null).singleNodeValue;
    else var qs=document.evaluate("//table[contains(@id,'base_events-production')]",f,null,9,null).singleNodeValue;
    if(qs && qs!=undefined){
     var c,i=0;
     qs=qs.firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;
     r.childNodes[1].lastChild.lastChild.childNodes[1].childNodes[pg].innerHTML='';
     for(i=(pg==2)?0:pg;i<qs.length;i++){
      if(pg!=1 && qs[i].firstChild.firstChild.tagName) continue;
      c=r.childNodes[1].lastChild.lastChild.childNodes[1].childNodes[pg].appendChild(document.createElement('div'));
      if(pg==0 || pg==2) c.innerHTML="0|"+qs[i].firstChild.innerHTML+'|'+escape(qs[i].lastChild.firstChild.href);
      else c.innerHTML=qs[i].firstChild.title+'|'+(/(\d+.*)$/.exec(qs[i].childNodes[1].innerHTML)[1])+'|'+escape(qs[i].lastChild.firstChild.href);
     }
     if(!r.childNodes[2].childNodes[pg].childNodes[2]){
      r.childNodes[2].childNodes[pg].appendChild(document.createElement('br'));
      r.childNodes[2].childNodes[pg].appendChild(document.createElement('span'));
      r.childNodes[2].childNodes[pg].lastChild.className='help comment';
      r.childNodes[2].childNodes[pg].lastChild.style.whiteSpace='nowrap';
      r.childNodes[2].childNodes[pg].lastChild.appendChild(document.createElement('div'));
      unsafeWindow.q++;
      r.childNodes[2].childNodes[pg].lastChild.firstChild.setAttribute('id','time'+unsafeWindow.q);
     }
     if(pg==0 || pg==2){
      r.childNodes[2].childNodes[pg].firstChild.innerHTML="<a href='"+d.getAttribute('url')+"'>"+qs[i].firstChild.innerHTML+"</a> ("+(qs.length-1)+")";
      r.childNodes[2].childNodes[pg].childNodes[2].title=j;
     }else{
      r.childNodes[2].childNodes[pg].firstChild.innerHTML=(/(\d+.*)$/.exec(qs[0].childNodes[1].innerHTML)[1])+' ('+(qs.length-1)+')';
      r.childNodes[2].childNodes[pg].childNodes[2].title=parseInt(qs[0].firstChild.title)+parseInt((parseInt((new Date()).getTime())-parseInt(unsafeWindow.start_date))/1000);
     }
     r.childNodes[2].childNodes[pg].childNodes[2].id=r.childNodes[2].childNodes[pg].childNodes[2].firstChild.id;
     r.childNodes[2].childNodes[pg].childNodes[2].innerHTML='';
     addFinishTimes(getSetting('config_finishTimesSingleLine',false));
     if(l) document.getElementById('APlog').innerHTML+="Current Queue updated at "+d.getAttribute('name')+"<br>";
     if(pg==1){
      qs[qs.length-1].childNodes[1].innerHTML=qs[qs.length-1].childNodes[1].innerHTML.replace(/\d+.*\d+/,cleanNumbers(/(\d+.*)$/.exec(qs[qs.length-1].childNodes[1].innerHTML)[1].split(/ [^\d]/)[0]));
      if((/(\d+.*)$/.exec(qs[qs.length-1].childNodes[1].innerHTML)[1])!=(f.getAttribute('num')+' '+f.getAttribute('type')) && (!q || q.match(/\d/)==null)) e+="Last production queue item at "+d.getAttribute('name')+" does not match.<br>&nbsp; ---  Ships possibly not purchased.<br>";
     }
    }else if(q && q.match(/\d/)!=null){
     if(l) document.getElementById('APlog').innerHTML+="Current Queue empty at "+d.getAttribute('name')+"<br>";
     r.childNodes[2].childNodes[pg].firstChild.innerHTML='(0)';
     r.childNodes[1].lastChild.lastChild.childNodes[1].childNodes[pg].innerHTML='';
    }else e+="Unable to find production queue at "+d.getAttribute('name')+".<br>&nbsp; ---  Ships possibly not purchased.<br>";
    qs=document.evaluate("//th[contains(@id,'base_prod')]",f,null,9,null).singleNodeValue;
    if(!document.getElementById('prod'+id) || (qs && qs.getAttribute('title')!=Math.round(document.getElementById('prod'+id).innerHTML))) e+="Production capacity at "+d.getAttribute('name')+" does not match.<br>&nbsp; --- <a href='base.aspx?base="+id+"' target='b5l5a5n5k'>View the base</a> to update the base data.<br>_1";
    qs=document.evaluate("//center[contains(@class,'error')]",f,null,9,null).singleNodeValue;
    if(qs!=null){
     document.getElementById('APlog').appendChild(qs.cloneNode(true));
     document.getElementById('APlog').insertBefore(qs.cloneNode(true),document.getElementById('APlog').childNodes[1]);
     e+="Fatal Error returned from server.<br>&nbsp; ---  Ships possibly not purchased.<br>";
    }
    if((e=='' || e.split('_')[1]==1) && (!q || q.match(/\d/)==null)){
     var sv={"Fighters":5,"Bombers":10,"Heavy Bombers":30,"Ion Bombers":60,"Corvette":20,"Recycler":30,"Destroyer":40,"Frigate":80,"Ion Frigate":120,"Scout Ship":40, "Outpost Ship":100,"Cruiser":200,"Carrier":400,"Heavy Cruiser":500,"Battleship":2000,"Fleet Carrier":2500,"Dreadnought":10000,"Titan":50000,"Leviathan":200000,"Death Star":500000,"Goods":20}
     document.getElementById('credits').nextSibling.innerHTML=commaFormat(cleanNumbers(document.getElementById('credits').nextSibling.innerHTML)-parseInt(f.getAttribute('num')*sv[f.getAttribute('type')]*(d.innerHTML.indexOf('&fast=on')!=-1?2:1)))
    }
    if(e!='') submitAllProductions(id,q+'_'+e,z,d.getAttribute('name'),0,l);
    else if(q && q.match(/\d/)!=null) submitAllProductions(id,undefined,z,d.getAttribute('name'),0,l,q);
    else submitAllProductions(id,q,z,d.getAttribute('name'),0,l);
   },
   onerror: function(responseDetails){
     submitAllProductions(id,q+'_t',z,d.getAttribute('name'),0,l);
   }
  });post(l,60/getSetting('allProdSTD',30));},o*1000);
 }
 c.innerHTML="<h3>"+((q && q.match(/\d/)!=null)?"Queue Data Update":"Production Submission")+" In Progress ...</h3>Submitting <b>";
 if(q=='f') c.innerHTML+=document.getElementById('shipFmCrd').getAttribute('name');
 else if(q=='q') c.innerHTML+=document.getElementById('shipQCrd').getAttribute('name');
 else if(q && q.match(/\d/)!=null) c.innerHTML+=(q.split(',')[0]=='c')?1:(q.split(',')[0]=='r')?1:q.split(',').length;
 else c.innerHTML+=parseInt(document.getElementById('shipFmCrd').getAttribute('name'))+parseInt(document.getElementById('shipQCrd').getAttribute('name'));
 c.innerHTML+="</b> request(s).<br clear=all><div id='readOut' style='margin:8px;background-color:#334;padding:3px;'></div><div style='margin:8px auto;width:100px;background-color:#334;padding:3px;'><span id='countr'>0</span> completed.</div><div id='submitData' style='display:none;'></div><div style='min-width:340px;margin-top:1em;text-align:left;font:300 11px/1.4 tahoma,arial;' id='APlog'><h3 style='text-align:center;'>"+((q && q.match(/\d/)!=null)?"Queue Update":"Production Submit")+" Log</h3></div>";
 c.innerHTML+="<div style='position:absolute;top:4px;'>Wait until 'Completed'.<input style='margin:0 20px;' class='AETbut' type='button' value='Reset & Cancel'><input class='AETbut' type='button' value='Cancel'></div>";
 c.lastChild.lastChild.previousSibling.addEventListener('click',function(){document.body.removeChild(document.body.lastChild);allProductionTotal('x');},false);
 c.lastChild.lastChild.addEventListener('click',function(){document.body.removeChild(document.body.lastChild);},false);
 for(var i=0;i<r.length;i++){
  if(r[i].style.display=='none' || (!getSetting('config_submitAllProd',true) && !r[i].firstChild.firstChild.checked) || (q && q.match(/\d/)!=null && q.indexOf(r[i].firstChild.firstChild.id.split('_')[1])==-1)) continue;
  u=r[i].childNodes[1].firstChild.href.split('=')[1];
  v=document.getElementById("quant_"+u);
  if((q==undefined || q=='f') && !isNaN(v.value) && v.value!='' && parseInt(v.value)>0){
   c=document.getElementById('submitData').appendChild(document.createElement('div'));
   c.setAttribute('url',r[i].childNodes[1].firstChild.href+'&view=production');
   c.setAttribute('name',r[i].childNodes[1].firstChild.innerHTML);
   c.innerHTML=escape(escape(document.getElementById("unit_"+u).value)+"="+document.getElementById("quant_"+u).value+"&post_back=true"+(document.getElementById("fast_"+u).checked?'&fast=on':''));
   document.getElementById('quant_'+u).value='SENT';
   document.getElementById('quant_'+u).style.backgroundColor='green';
  }else if(q && q.match(/\d/)!=null){
   c=document.getElementById('submitData').appendChild(document.createElement('div'));
   c.setAttribute('url',(r[i].childNodes[2].firstChild.style.display!='none')?((document.getElementById('struc_'+u).value!='')?r[i].childNodes[2].firstChild.firstChild.href:r[i].childNodes[2].firstChild.firstChild.href.replace('structures','defenses')):(r[i].childNodes[2].childNodes[1].style.display!='none')?r[i].childNodes[2].childNodes[1].firstChild.href:r[i].childNodes[2].lastChild.firstChild.href);
   c.setAttribute('name',r[i].childNodes[1].firstChild.innerHTML);
   c.innerHTML=(r[i].childNodes[2].firstChild.style.display!='none')?("add_stack="+escape((document.getElementById('struc_'+u).value!='')?document.getElementById('struc_'+u).value:document.getElementById('def_'+u).value)):(r[i].childNodes[2].lastChild.style.display!='none')?("add_stack="+escape(document.getElementById('tech_'+u).value)):"";
   document.getElementById('quant_'+u).value='SENT';
   document.getElementById('quant_'+u).style.backgroundColor='green';
  }else{
   document.getElementById('quant_'+u).value='-';
   document.getElementById('quant_'+u).style.backgroundColor='#004';
  }
  if((q==undefined || q=='q') && document.getElementById('data_'+u).lastChild.childNodes[2].firstChild){
   p=document.getElementById('data_'+u).lastChild.childNodes[2].childNodes;
   for(x=0;x<p.length;x++){
    c=document.getElementById('submitData').appendChild(document.createElement('div'));
    c.setAttribute('url',r[i].childNodes[1].firstChild.href+'&view=production');
    c.setAttribute('name',r[i].childNodes[1].firstChild.innerHTML);
    c.innerHTML=escape(escape(k[p[x].innerHTML.split(',')[1]])+"="+p[x].innerHTML.split(',')[0]+"&post_back=true"+((p[x].innerHTML.split(',')[2]=='1')?'&fast=on':''));
   }
   document.getElementById('data_'+u).lastChild.childNodes[2].innerHTML='';
   document.getElementById('q_'+u).innerHTML='(0)';
   document.getElementById('quant_'+u).value='SENT';
   document.getElementById('quant_'+u).style.backgroundColor='green';
  }
 }
 if(l) document.getElementById('APlog').innerHTML+="<h4>Server Communication Started</h4>";
 post(l,0);
}

function submitAllProductions(h,q,z,n,y,l,p){
 document.getElementById('countr').innerHTML=parseInt(document.getElementById('countr').innerHTML)+1;
 if(q==undefined || q=='f' || q=='q'){
  if(document.getElementById('quant_'+h).value=='SENT') document.getElementById('quant_'+h).value='OK';
 }else if(q!='p'){
  var e = q.split('_')[1];
  var w = q.split('_')[2];
  q=q.split('_')[0];
  if(e=='t') e="<h4>Unknown Error:</h4>A request was sent to "+n+", but no data was received.<br>&nbsp; ---  Ships possibly not purchased and/or queue not updated.<br>";
  if(w=='1'){
   if(document.getElementById('quant_'+h).value!='ERROR'){
    document.getElementById('quant_'+h).value='WARN';
    document.getElementById('quant_'+h).style.backgroundColor='#A90';
   }
  }else{
   document.getElementById('quant_'+h).value='ERROR';
   document.getElementById('quant_'+h).style.backgroundColor='red';
  }
  var c=document.getElementById('APlog').insertBefore(document.createElement('div'),document.getElementById('APlog').childNodes[1]);
  c.setAttribute('style',"color:red;text-align:center;");
  c.innerHTML=e;
  if(l) document.getElementById('APlog').appendChild(c.cloneNode(true));
 }
 if(z){
  y++;
  var r=document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes,i;
  for(var x=0;x<r.length;x++){
   if(r[x].style.display=='none' || (p && p.indexOf(r[x].childNodes[0].firstChild.id.split('_')[1])==-1)) continue;
   i=document.getElementById('quant_'+r[x].childNodes[0].firstChild.id.split('_')[1]).value;
   if(i!='OK' && i!='-' && i!='WARN' && i!='ERROR'){
    if(y<20){
     setTimeout(function(){submitAllProductions('','p',true,n,y,l,p)},3000);
     if(l) document.getElementById('APlog').innerHTML+="&nbsp; - waiting for data to return.<br>";
     document.getElementById('readOut').innerHTML="&nbsp; - waiting for data to return.";
    }else{
     var c=document.getElementById('APlog').insertBefore(document.createElement('div'),document.getElementById('APlog').childNodes[1]);
     c.setAttribute('style',"color:red;text-align:center;");
     c.innerHTML+="After waiting for 1 minute, some data for "+n+" has not returned from the server.<br>&nbsp; ---  Ships possibly not purchased and/or queue not updated.<br>";
     allProdFinish(l);
    }
    return;
   }
  }
   allProdFinish(l);
 }
}

function allProdFinish(l){
 document.getElementById('submitData').parentNode.firstChild.innerHTML="Submission Completed";
 document.getElementById('submitData').parentNode.lastChild.lastChild.previousSibling.value='Reset & Close';
 document.getElementById('submitData').parentNode.lastChild.lastChild.value='Close';
 document.getElementById('readOut').style.display='none';
 if(!l) document.getElementById('APlog').firstChild.innerHTML='Submit Result';
 if((l && document.getElementById('APlog').childNodes[1].tagName.toLowerCase()!='div') || (!l && parseInt(document.getElementById('APlog').childNodes[1].getAttribute('num'))>0)) document.getElementById('APlog').innerHTML+="<br>Success<br><small>(No Errors Found)</small>";
}

function onProductionTextBoxKeyUp(){
 var c=0,t=0,p=["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods"];
 for(var i=0;i<p.length;i++){
  if(document.getElementById('quant'+p[i]) && parseInt(document.getElementById('quant'+p[i]).value)>0){
   t+=getSeconds(document.getElementById('quant'+p[i]).parentNode.parentNode.childNodes[4].textContent)*parseInt(document.getElementById('quant'+p[i]).value);
   c+=(parseInt(cleanNumbers(document.getElementById('quant'+p[i]).parentNode.parentNode.childNodes[2].textContent))*parseInt(document.getElementById('quant'+p[i]).value));
  }
 }
 if(document.getElementById('fast').checked){c*=2;t/=2}
 var b=(wlh.indexOf('&action=cancel')==-1)?document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue:document.evaluate("//input[@type='submit']",document,null,7,null).snapshotItem(1);
 if(c>0) b.value = "Submit ("+c+") - "+getTimeDisplay(t);
 else b.value = "Submit";
 b.style.color=((parseInt(document.getElementById('credits').nextSibling.innerHTML.replace(/[^\d]/g,""))-c)<0)?'red':'';
}

function onProductionTextBoxReset(){
 var t=document.evaluate("//input[@type='text']",document,null,7,null);
 if(!t) return;
 for(var i=(getSetting('config_QuickJump',true))?1:0;i<t.snapshotLength;i++){
  t.snapshotItem(i).value='';
 }
 var b=(wlh.indexOf('&action=cancel')==-1)?document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue:document.evaluate("//input[@type='submit']",document,null,7,null).snapshotItem(1);
 b.value="Submit";
 b.style.color=((parseInt(document.getElementById('credits').nextSibling.innerHTML.replace(/[^\d]/g,"")))<1)?'red':'';
}

function registerTextBoxEventListeners(){
 var a,p=["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods"];
 for(var i=0;i<p.length;i++){
  if(document.getElementById('quant'+p[i])){
   if(getSetting('config_addProductionIncrements',true)){
    document.getElementById('quant'+p[i]).parentNode.style.whiteSpace='nowrap';
    a=document.createElement('input');
    a.type='button';
    a.setAttribute('style','margin-right:3px;padding-left:0;padding-right:0;');
    a.className='AETbut';
    a.id='decrement-'+p[i];
    a.value='-';
    document.getElementById('quant'+p[i]).parentNode.insertBefore(a,document.getElementById('quant'+p[i]));
    a.addEventListener('click',function(){incrementFleet(this.id)},true);
    a=document.createElement('input');
    a.type='button';
    a.setAttribute('style','margin-right:3px;padding-left:0;padding-right:0;');
    a.className='AETbut';
    a.id='zero-'+p[i];
    a.value='0';
    document.getElementById('quant'+p[i]).parentNode.insertBefore(a,document.getElementById('quant'+p[i]));
    a.addEventListener('click',function(){incrementFleet(this.id)},true);
    a=document.createElement('input');
    a.type='button';
    a.setAttribute('style','margin-right:3px;padding-left:0;padding-right:0;');
    a.className='AETbut';
    a.id='increment-'+p[i];
    a.value='+';
    document.getElementById('quant'+p[i]).parentNode.insertBefore(a,document.getElementById('quant'+p[i]));
    a.addEventListener('click',function(){incrementFleet(this.id)},true);
   }
   document.getElementById('quant'+p[i]).addEventListener('change',onProductionTextBoxKeyUp,false);
   document.getElementById('quant'+p[i]).addEventListener('keyup',onProductionTextBoxKeyUp,true);
   document.getElementById('quant'+p[i]).parentNode.previousSibling.innerHTML=document.getElementById('quant'+p[i]).parentNode.previousSibling.innerHTML.replace(/^0/,'');
  }
 }
 document.getElementById('row1').parentNode.insertBefore(document.createElement('tr'),document.getElementById('row1'));
 document.getElementById('row1').previousSibling.innerHTML='<td colspan=6>&nbsp;</td>';
 document.getElementById('fast').addEventListener('change',onProductionTextBoxKeyUp,false);
 document.evaluate("//input[@type='reset']",document,null,9,null).singleNodeValue.parentNode.parentNode.previousSibling.innerHTML="<td colspan=6>&nbsp;</td>";
 document.evaluate("//input[@type='reset']",document,null,9,null).singleNodeValue.addEventListener('click',onProductionTextBoxReset,false);
 var b=(wlh.indexOf('&action=cancel')==-1)?document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue:document.evaluate("//input[@type='submit']",document,null,7,null).snapshotItem(1);
 b.style.padding='2px 4px';
}

function incrementFleet(s){
 if(s.split('-')[0]=='increment') document.getElementById('quant'+s.split('-')[1]).value=(isNaN(parseInt(document.getElementById('quant'+s.split('-')[1]).value))?0:parseInt(document.getElementById('quant'+s.split('-')[1]).value))+1;
 else if(s.split('-')[0]=='zero') document.getElementById('quant'+s.split('-')[1]).value='';
 else if(parseInt(document.getElementById('quant'+s.split('-')[1]).value)>0) document.getElementById('quant'+s.split('-')[1]).value=parseInt(document.getElementById('quant'+s.split('-')[1]).value)-1;
 document.getElementById('quant'+s.split('-')[1]).focus();
 onProductionTextBoxKeyUp();
}

function insertTimeTextBoxes(){
 var a = document.evaluate("//input[@class='input-numeric quant']",document,null,7,null);
 var b,i;
 for(i=0;i<a.snapshotLength;i++){
  b = document.createElement("td");
  b.setAttribute("align","center");
  b.innerHTML = '<input type="text" value="" maxlength="5" size="5" name="'+a.snapshotItem(i).name+' - Time" class="input-numeric quant">';
  a.snapshotItem(i).parentNode.parentNode.appendChild(b);
  b.addEventListener('click',function(event){event.stopPropagation();},false);
  b.addEventListener('keyup',getConvertTimeToQuantityClosure(a.snapshotItem(i).parentNode.parentNode),true);
  b.addEventListener('change',getConvertTimeToQuantityClosure(a.snapshotItem(i).parentNode.parentNode),true);
 }
 b = document.getElementById('base_production').firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild;
 b.childNodes[1].firstChild.setAttribute("colspan",7);
 b.firstChild.appendChild(document.createElement("th"));
 b.firstChild.lastChild.setAttribute("width","10%");
 b.firstChild.lastChild.textContent = "Time (h)"
 b.firstChild.lastChild.previousSibling.setAttribute("width","10%");
 a = document.evaluate("//td[@class='help comment']",document,null,7,null);
 for(i=0;i<a.snapshotLength;i++){a.snapshotItem(i).setAttribute("colspan",6)}
 a = document.evaluate("//td[@class='red important']",document,null,7,null);
 for(i=0;i<a.snapshotLength;i++){a.snapshotItem(i).setAttribute("colspan",2)}
 document.getElementById('fast').parentNode.setAttribute("colspan",7);
 b.childNodes[b.childNodes.length-3].firstChild.setAttribute("colspan",7);
 b.childNodes[b.childNodes.length-2].innerHTML="<td colspan=7>&nbsp;</td>";
 b.childNodes[b.childNodes.length-1].firstChild.setAttribute("colspan",7);
 document.evaluate("//input[@type='reset']",document,null,9,null).singleNodeValue.addEventListener('click',onProductionTextBoxReset,false);
}

function getConvertTimeToQuantityClosure(r){function func(){convertTimeToQuantity(r)}return func}

function convertTimeToQuantity(r){
 var t = parseFloat(r.childNodes[6].firstChild.value);
 if(isNaN(t)) t=0;
 r.childNodes[5].lastChild.value = ((t*60*60)<getSeconds(r.childNodes[4].textContent))?"":Math.round((t*60*60)/getSeconds(r.childNodes[4].textContent));
 onProductionTextBoxKeyUp();
}

function getSeconds(t){
 var r = /(\d*h)?\W?(\d*m)?\W?(\d*s)?/.exec(t);
 if(r){
   var h=0,m=0,s=0;
   if(r[1]!=null) h=r[1].substring(0,r[1].indexOf("h"));
   if(r[2]!=null) m=r[2].substring(0,r[2].indexOf("m"));
   if(r[3]!=null) s=r[3].substring(0,r[3].indexOf("s"));
   return h*60*60 + m*60 + s*1;
 }
 return -1;
}

function productionRedirect(){
 var l=document.createElement('label');
 var b=(wlh.indexOf('&action=cancel')==-1)?document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue:document.evaluate("//input[@type='submit']",document,null,7,null).snapshotItem(1);
 l.style.fontWeight='500';
 l.innerHTML="Redirect to Empire on Submit.<input type='checkbox' id='prodRedir' style='margin:0 40px 0 6px;'"+((getSetting('redirectProd',false))?' checked':'')+">";
 b.parentNode.insertBefore(l,b.parentNode.firstChild);
 l.addEventListener('click',function(e){e.stopPropagation();setSetting('redirectProd',document.getElementById('prodRedir').checked);},true);
 document.forms[1].addEventListener('submit',function(){if(document.getElementById('prodRedir').checked) setSetting('redirect','empire.aspx');},true);
}

function clearProductionComments(){
 if(!getSetting('config_clearProductionCommentsB',true)) return;
 var x,t,z=1;
 if(getView()=='Structures') x='base_structures';
 else if(getView()=='Defenses') x='base_defenses';
 else if(getView()=='Production') x='base_production';
 else if(getView()=='Research'){
  x='base_reseach';
  if(document.getElementById(x).firstChild.firstChild.firstChild.innerHTML.indexOf('-')==-1) document.getElementById(x).firstChild.firstChild.firstChild.appendChild(document.createTextNode(" - Labs: "+/tables.aspx\?view=technologies&amp;level=(\d+)/.exec(document.body.innerHTML)[1]));
 }else if(getView()=='Technologies'){
  x='empire_technologies';
  z=0;
 }
 if(!document.getElementById('showHideComments')){
   var a=document.createElement('a');
   a.setAttribute('id','showHideComments');
   a.setAttribute('href','javascript:void(1);');
   a.setAttribute('style','float:left;font:500 11px verdana,arial,sans-serif;position:relative;left:5%;background-color:#000000;padding:2px;');
   a.innerHTML=((getSetting('config_clearProductionComments',true))?'Show':'Hide')+" Comments";
   document.getElementById(x).firstChild.firstChild.firstChild.insertBefore(a,document.getElementById(x).firstChild.firstChild.firstChild.firstChild);
   document.getElementById('showHideComments').addEventListener('click',function(){if(this.innerHTML=='Show Comments'){this.innerHTML='Hide Comments';setSetting('config_clearProductionComments',false);}else{this.innerHTML='Show Comments';setSetting('config_clearProductionComments',true);}clearProductionComments();},false);
 }
 if(x=='base_production') t=document.getElementById(x).firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild.childNodes;
 else if(x=='empire_technologies') t=document.getElementById(x).firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;
 else t=document.getElementById(x).firstChild.childNodes[1].firstChild.childNodes[2].firstChild.childNodes;
 for(var i=0;i<t.length;i++){
   if(t[i].childNodes[z] && t[i].childNodes[z].className=='help comment') t[i].style.display=(getSetting('config_clearProductionComments',true))?'none':'table-row';
 }
}

function scrolltoProduction(){
 if(!document.getElementById('base_production')) return;
 var c=document.createElement('label');
 c.innerHTML="<input type='checkbox' id='scrlToProd' style='margin:0 3px 0 0;position:relative;top:4px;'"+((getSetting('scrolltoProduction','')=='form')?' checked':'')+">Scroll to here on page load.";
 c.setAttribute('style',"font-size:10px;position:absolute;left:"+getSetting('config_paddingLeft','10')+"px;top:"+(document.getElementById('base_production').offsetTop-16)+"px;");
 c.className='help';
 document.getElementById('base_production').parentNode.insertBefore(c,document.getElementById('base_production'));
 document.getElementById('scrlToProd').addEventListener('click',function(){if(this.checked) setSetting('scrolltoProduction','form'); else if(document.getElementById('scrlToProd2').checked){setSetting('scrolltoProduction','bottom');} else  setSetting('scrolltoProduction','');},false);
 c=document.createElement('label');
 c.innerHTML="<input type='checkbox' id='scrlToProd2' style='margin:0 3px 0 0;position:relative;top:4px;'"+((getSetting('scrolltoProduction','')=='bottom')?' checked':'')+">Scroll to here on page load.";
 c.setAttribute('style',"font-size:10px;float:left;position:relative;top:-18px;");
 c.className='help';
 document.getElementById('base_production').parentNode.insertBefore(c,document.getElementById('base_production').nextSibling);
 document.getElementById('scrlToProd2').addEventListener('click',function(){if(this.checked) setSetting('scrolltoProduction','bottom'); else if(document.getElementById('scrlToProd').checked) setSetting('scrolltoProduction','form'); else  setSetting('scrolltoProduction','');},false);
}

function enableSimpleProduction(){
 if(!document.getElementById('base_production')) return;
 var b=document.getElementById('base_production').firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild.childNodes;
 if(b.length<10) return;
 var c=document.createElement('label');
 c.innerHTML="Simple Production.<input type='checkbox' id='smplProd' style='margin:0 0 0 3px;position:relative;top:4px;'"+((getSetting('simpleProduction',false))?' checked':'')+">";
 c.className='help';
 c.setAttribute('style',"float:right;position:relative;top:-18px;right:1px;");
 document.getElementById('base_production').parentNode.insertBefore(c,document.getElementById('base_production').nextSibling);
 document.getElementById('smplProd').addEventListener('click',function(){setSetting('simpleProduction',this.checked);simpleProduction(this.checked,true);},false);
 simpleProduction(document.getElementById('smplProd').checked);
}

function simpleProduction(y,z){
 if(!document.getElementById('base_production')) return;
 var b=document.getElementById('base_production').firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild.childNodes;
 GM_addStyle('.hideMe{position:absolute;top:-10000;}');
 document.getElementById('base_production').firstChild.firstChild.className=(y)?'hideMe':'';
 for(var i=0;i<b.length-5;i++){
   b[i].className=(y)?'hideMe':'';
 }
 b[b.length-5].firstChild.style.fontSize=(y)?'11px':'';
 if(z) scrollTo(0,document.body.offsetHeight);
}

/*************************
 Enhanced Queue Display
*************************/
function fixQueues(){
 if(document.evaluate('//a[text()="Cancel Production"]',document,null,7,null).snapshotLength > getSetting('config_maxQueues',7)) return;
 var t = getView();
 if(t == "Structures" || t == "Defenses") t = "CONSTRUCTION QUEUE";
 if(t == "Research") t = "RESEARCH QUEUE";
 if(t == "Production") t = "PRODUCTION";
 GM_addStyle('#queueFooter{position:fixed;clear:both;width:100%;bottom:0px;left:0;}#queueFooter TD{border:0;}');
 var q,d;
 if(t=="PRODUCTION") q=document.getElementById('base_events-production');
 else{
  q=document.getElementById('base-queue');
  d=document.createElement('label');
  d.setAttribute('style','font-weight:500;font-size:10px;margin-left:20px;');
  d.innerHTML="<input type='checkbox' id='useOldQ'>Use Old Style Q";
  q.firstChild.firstChild.firstChild.appendChild(d);
  if(getSetting('config_fixQueuesOld',false)){
    q.innerHTML=q.innerHTML;
    document.getElementById('useOldQ').checked=true;
  }
  document.getElementById('useOldQ').addEventListener('change',function(){
   setSetting('config_fixQueuesOld',this.checked);
   if(this.checked){
    document.getElementById('base-queue').innerHTML=document.getElementById('base-queue').innerHTML;
    document.getElementById('useOldQ').checked=true;
   }else{
    if(wlh.indexOf('&action=')!=-1) window.location.href=wlh.split('&action=')[0];
    else window.location.reload();
   }
  },false);
 }
 if(q){
  q.style.width="100%";
  q.style.borderWidth='2px 0 0 0';
  d = document.createElement("div");
  d.setAttribute("id","queueFooter");
  d.appendChild(q);
  document.body.appendChild(d);
  var s = document.createElement('div');
  s.style.position="absolute";
  s.style.height = d.offsetHeight;
  s.innerHTML = "&nbsp;";
  document.body.appendChild(s);
 }
}

/************************
 Hide Empty Occupations
************************/
function hideNoOccs(){
 var c=document.getElementById('empire_economy_occupied');
 if(!c) return;
 if(c.firstChild.childNodes[1].firstChild.firstChild.tagName.toLowerCase()=='center') c.style.display='none';
}

/************************
 Hide Bases Economy
************************/
function hideBasesEconomy(){
 if(!getSetting('config_toggleBaseEconomy',true)) return;
 document.getElementById('empire_economy_bases').firstChild.firstChild.firstChild.appendChild(document.createElement('span'));
 document.getElementById('empire_economy_bases').firstChild.firstChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleBaseEconomy">'+((getSetting('HIDE_BASES_ECONOMY',false))?'Show':'Hide')+'</a>';
 document.getElementById('empire_economy_bases').firstChild.lastChild.style.display=(document.getElementById('toggleBaseEconomy').innerHTML=='Hide')?'table-row':'none';
 document.getElementById('toggleBaseEconomy').addEventListener('click',function(){
   document.getElementById('toggleBaseEconomy').innerHTML=(document.getElementById('toggleBaseEconomy').innerHTML=='Hide')?'Show':'Hide';
   document.getElementById('empire_economy_bases').firstChild.lastChild.style.display=(document.getElementById('toggleBaseEconomy').innerHTML=='Hide')?'table-row':'none';
   setSetting('HIDE_BASES_ECONOMY',(document.getElementById('toggleBaseEconomy').innerHTML=='Hide')?false:true);
 },true);
}

/************************
 Hide Fleets List
************************/
function hideFleetsList(){
 if(!getSetting('config_toggleFleetsList',true)) return;
 document.getElementById('fleets-list').firstChild.firstChild.firstChild.appendChild(document.createElement('span'));
 document.getElementById('fleets-list').firstChild.firstChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleFleetsList">'+((getSetting('HIDE_FLEETS_LIST',false))?'Show':'Hide')+'</a>';
 document.getElementById('fleets-list').firstChild.lastChild.style.display=(document.getElementById('toggleFleetsList').innerHTML=='Hide')?'table-row':'none';
 document.getElementById('toggleFleetsList').addEventListener('click',function(){
   document.getElementById('toggleFleetsList').innerHTML=(document.getElementById('toggleFleetsList').innerHTML=='Hide')?'Show':'Hide';
   document.getElementById('fleets-list').firstChild.lastChild.style.display=(document.getElementById('toggleFleetsList').innerHTML=='Hide')?'table-row':'none';
   setSetting('HIDE_FLEETS_LIST',(document.getElementById('toggleFleetsList').innerHTML=='Hide')?false:true);
 },true);
}

/************************
 Hide Bases List
************************/
function hideBasesList(){
 if(!getSetting('config_toggleBasesList',true)) return;
 document.getElementById('bases_list').firstChild.firstChild.firstChild.appendChild(document.createElement('span'));
 document.getElementById('bases_list').firstChild.firstChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleBasesList">'+((getSetting('HIDE_BASES_LIST',false))?'Show':'Hide')+'</a>';
 document.getElementById('bases_list').firstChild.lastChild.style.display=(document.getElementById('toggleBasesList').innerHTML=='Hide')?'table-row':'none';
 document.getElementById('toggleBasesList').addEventListener('click',function(){
   document.getElementById('toggleBasesList').innerHTML=(document.getElementById('toggleBasesList').innerHTML=='Hide')?'Show':'Hide';
   document.getElementById('bases_list').firstChild.lastChild.style.display=(document.getElementById('toggleBasesList').innerHTML=='Hide')?'table-row':'none';
   setSetting('HIDE_BASES_LIST',(document.getElementById('toggleBasesList').innerHTML=='Hide')?false:true);
 },true);
}

/************************
 Hide Empire Technologies
************************/
function hideEmpireTechnologies(){
 if(!getSetting('config_toggleEmpireTechnologies',true)) return;
 document.getElementById('empire_technologies').firstChild.firstChild.firstChild.appendChild(document.createElement('span'));
 document.getElementById('empire_technologies').firstChild.firstChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleEmpireTechnologies">'+((getSetting('HIDE_EMPIRE_TECHNOLOGIES',false))?'Show':'Hide')+'</a>';
 document.getElementById('empire_technologies').firstChild.lastChild.style.display=(document.getElementById('toggleEmpireTechnologies').innerHTML=='Hide')?'table-row':'none';
 document.getElementById('toggleEmpireTechnologies').addEventListener('click',function(){
   document.getElementById('toggleEmpireTechnologies').innerHTML=(document.getElementById('toggleEmpireTechnologies').innerHTML=='Hide')?'Show':'Hide';
   document.getElementById('empire_technologies').firstChild.lastChild.style.display=(document.getElementById('toggleEmpireTechnologies').innerHTML=='Hide')?'table-row':'none';
   setSetting('HIDE_EMPIRE_TECHNOLOGIES',(document.getElementById('toggleEmpireTechnologies').innerHTML=='Hide')?false:true);
 },true);
}

/************************
 Hide Guild Internal
************************/
function hideGuildInternal(){
 var c=document.getElementById('guild-internal');
 if(!c || !getSetting('config_toggleGuildInternal',true)) return;
 if(document.getElementById('guild-internal_container')){
  document.getElementById('guild-internal_container').parentNode.insertBefore(c,document.getElementById('guild-internal_container'));
  document.getElementById('guild-internal_container').parentNode.removeChild(document.getElementById('guild-internal_container'));
  document.getElementById('guild-internal').innerHTML=document.getElementById('guild-internal').innerHTML;
 }
 c.previousSibling.previousSibling.firstChild.lastChild.firstChild.appendChild(document.createElement('span'));
 c.previousSibling.previousSibling.firstChild.lastChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleGuildInternal">'+((getSetting('HIDE_GUILD_INTERNAL',false))?'Show':'Hide')+' Internal</a>';
 c.firstChild.firstChild.style.display=(document.getElementById('toggleGuildInternal').innerHTML=='Hide Internal')?'table-row':'none';
 if(document.getElementById('toggleGuildInternal').innerHTML!='Hide Internal'){
   c.firstChild.appendChild(document.createElement('tr'));
   c.firstChild.lastChild.appendChild(document.createElement('td'));
   c.firstChild.lastChild.firstChild.appendChild(document.getElementById('guild_internal-menu').cloneNode(true));
 }
 document.getElementById('toggleGuildInternal').addEventListener('click',function(){
   document.getElementById('toggleGuildInternal').innerHTML=(document.getElementById('toggleGuildInternal').innerHTML=='Hide Internal')?'Show Internal':'Hide Internal';
   c.firstChild.firstChild.style.display=(document.getElementById('toggleGuildInternal').innerHTML=='Hide Internal')?'table-row':'none';
   if(document.getElementById('toggleGuildInternal').innerHTML!='Hide Internal'){
     c.firstChild.appendChild(document.createElement('tr'));
     c.firstChild.lastChild.appendChild(document.createElement('td'));
     c.firstChild.lastChild.firstChild.appendChild(document.getElementById('guild_internal-menu').cloneNode(true));
   }else{
     c.firstChild.removeChild(c.firstChild.lastChild)
   }
   setSetting('HIDE_GUILD_INTERNAL',(document.getElementById('toggleGuildInternal').innerHTML=='Hide Internal')?false:true);
 },true);
}

/**** Attack ****/
function hideAttackButtons(){
 if(!document.getElementById('fleets_attack-list')) return;
 document.getElementById('fleets_attack-list').firstChild.firstChild.firstChild.innerHTML+="&nbsp;&nbsp;-&nbsp;<span style='font-size:12px;font-weight:500;'>Hide/Show-&gt;&nbsp;<input type='button' class='AETbut' style='margin-left:3px;position:relative;top:-1px;' id='hideAGuild' value='Allies'><input type='checkbox' id='setHideAGuild'"+((getSetting('config_hideAttackAFleets',true))?" checked":"")+">&nbsp;|&nbsp;<input type='button' class='AETbut' style='margin-left:3px;position:relative;top:-1px;' id='hideEGuild' value='Enemies'><input type='checkbox' id='setHideEGuild'"+((getSetting('config_hideAttackEFleets',false))?" checked":"")+">&nbsp;|&nbsp;<input type='button' class='AETbut' style='margin-left:3px;position:relative;top:-1px;' id='hideOGuild' value='Other'><input type='checkbox' id='setHideOGuild'"+((getSetting('config_hideAttackOFleets',false))?" checked":"")+">&nbsp;|&nbsp;<input type='button' class='AETbut' style='margin-left:3px;position:relative;top:-1px;' id='hideUGuild' value='Unguilded'><input type='checkbox' id='setHideUGuild'"+((getSetting('config_hideAttackUFleets',false))?" checked":"")+"></span>";
 document.getElementById('hideAGuild').addEventListener('click',function(){hideAttackFleets();},false);
 document.getElementById('setHideAGuild').addEventListener('change',function(){setSetting('config_hideAttackAFleets',this.checked)},false);
 document.getElementById('hideEGuild').addEventListener('click',function(){hideAttackFleets();},false);
 document.getElementById('setHideEGuild').addEventListener('change',function(){setSetting('config_hideAttackEFleets',this.checked)},false);
 document.getElementById('hideOGuild').addEventListener('click',function(){hideAttackFleets();},false);
 document.getElementById('setHideOGuild').addEventListener('change',function(){setSetting('config_hideAttackOFleets',this.checked)},false);
 document.getElementById('hideUGuild').addEventListener('click',function(){hideAttackFleets();},false);
 document.getElementById('setHideUGuild').addEventListener('change',function(){setSetting('config_hideAttackUFleets',this.checked)},false);
}

function hideAttackFleets(){
 if(!document.getElementById('fleets_attack-list')) return;
 var a=document.getElementById('fleets_attack-list').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;
 for(var i=1;i<a.length;i++){
  if(a[i].childNodes[1]==undefined || a[i].childNodes[1].firstChild.href==undefined) continue;
  b=/^(\[[^\]]+\])/.exec(a[i].childNodes[1].firstChild.innerHTML);
  if(!b){
    if(getSetting('config_hideAttackUFleets',false)) a[i].style.display='none';
    else a[i].style.display='table-row';
    continue;
  } else b=b[1];
  if(getSetting('config_hideAttackAFleets',true) && unescape(getSetting('config_alliedGuilds','')).indexOf(b)!=-1) a[i].style.display='none';
  else if(getSetting('config_hideAttackEFleets',false) && unescape(getSetting('config_enemyGuilds','')).indexOf(b)!=-1) a[i].style.display='none';
  else if(getSetting('config_hideAttackOFleets',false) && b!=unescape(getSetting('config_myGuild','')) && unescape(getSetting('config_alliedGuilds','')).indexOf(b)==-1 && unescape(getSetting('config_enemyGuilds','')).indexOf(b)==-1) a[i].style.display='none';
  else a[i].style.display='table-row';
 }
}

function quickMoveAttack(){
 if(!document.getElementById('time1') || document.getElementsByTagName('form').length==0) return;
 var c=document.createElement('div');
 c.setAttribute('style','text-align:center;');
 c.innerHTML="<input type='button' class='AETbut' style='font-size:12px;' onclick='window.location.href=window.location.href.split(\"&\")[0]+\"&view=move\";' value='Move'>&nbsp;&nbsp;-&nbsp;&nbsp;<input type='button' class='AETbut' style='font-size:12px;' onclick='window.location.href=window.location.href.split(\"&\")[0]+\"&view=attack\";' value='Attack'>";
 if(document.getElementById('fleet_overview')){
   document.getElementById('fleet_overview').parentNode.insertBefore(c,document.getElementById('fleet_overview'));
   document.getElementById('fleet_overview').parentNode.insertBefore(document.createElement('br'),document.getElementById('fleet_overview'));
 }else if(document.getElementById('fleets_attack-list')){
   document.getElementById('fleets_attack-list').parentNode.insertBefore(c,document.getElementById('fleets_attack-list'));
   document.getElementById('fleets_attack-list').parentNode.insertBefore(document.createElement('br'),document.getElementById('fleets_attack-list'));
 }else document.body.appendChild(c);
}

function locationMoveAttack(){
 if(!document.getElementById('base_fleets') && !document.getElementById('map_fleets')) return;
 var r=(wlh.indexOf('base.aspx?base=')!=-1)?document.getElementById('base_fleets').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes:document.getElementById('map_fleets').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<r.length;i++){
   if(r[i].childNodes[1].firstChild.href.split('=')[1]==document.getElementById('account').nextSibling.innerHTML.split('.')[1] && r[i].childNodes[2].innerHTML==''){r[i].childNodes[2].innerHTML="<a href='"+r[i].firstChild.firstChild.href+"&view=move'>Move</a> - <a href='"+r[i].firstChild.firstChild.href+"&view=attack'>Attack</a>";return;}
 }
}

function bigAttackButton(){
 var a=document.evaluate("//input[@type='submit']",document,null,9,null).singleNodeValue;
 if(!a) return;
 a.style.padding='15px 50px';
 a.focus()
}

/**** Remove Adds ****/
function removeAdds(){
 document.getElementById('advertising').previousSibling.style.marginBottom='-14px';
 document.getElementById('advertising').parentNode.removeChild(document.getElementById('advertising'));
 if(wlh.indexOf('board.aspx')!=-1 && document.getElementsByTagName('iframe')[0]) document.getElementsByTagName('iframe')[0].parentNode.removeChild(document.getElementsByTagName('iframe')[0]);
}

/**** Free Capacities Page ****/
function advCapacitiesPage(){
 checkEmpireDataAge();
 var a='',b=[],c=0,e1=0,e2=0,p=0,r=0,d = getSetting('empireBaseData','').split('|:|');
 if(d==null) return;
 for(var i=0;i<d.length;i++){
   d[i]=unescape(d[i]);
   if(getSetting('baseData'+d[i].split('|')[0],null)!=null) b = getSetting('baseData'+d[i].split('|')[0],null).split('|');
   else b=['unknown','',0,0,0,'unknown'];
   if(b[1]=='Asteroid') b[1]='';
   a+='<tr align="center"><td><a href="base.aspx?base='+d[i].split('|')[0]+'">'+d[i].split('|')[1]+'</a></td><td><a href="map.aspx?loc='+d[i].split('|')[2]+'">'+d[i].split('|')[2]+'</a></td><td>'+b[0]+' <small>'+b[1]+'</small>'+'</td><td>'+d[i].split('|')[3]+'<td>'+b[2]+'</td><td>'+b[3]+'</td><td>'+b[4]+'</td></tr><td colspan="7" class="help comment">'+b[5]+'</td></tr>';
   e1+=parseInt(d[i].split('|')[3].split('/')[0]);
   e2+=parseInt(d[i].split('|')[3].split('/')[1]);
   c+=parseInt(b[2]);
   p+=parseInt(b[3]);
   r+=parseInt(b[4]);
 }
 document.getElementById('empire_upgraded-only').firstChild.innerHTML='<tr><th class="th_header2" style="border: 0px none ;"><font size="+1">B</font>ASES PROCESSING CAPACITIES</th></tr><tr><td class="content" style="padding: 0px;"><table class="layout listing"><tbody><tr class="listing-header"><th>Name</th><th>Location</th><th>Type</th><th>Economy</th><th>Construction</th><th>Production <small>(Shipyards)</small></th><th>Research <small>(Labs)</small></th></tr>'
 +a+'<tr align="center"><td></td><th>Sum</th><td></td><td><b>'+commaFormat(e1)+' / '+commaFormat(e2)+'</b></td><td><b>'+commaFormat(c)+'</b></td><td><b>'+commaFormat(p)+'</b></td><td><b>'+commaFormat(r)+'</b></td></tr></tbody></table></td></tr><tr><td style="text-align:center;padding:6px 0;" class="help comment">To update the base name, location, and economy, visit the <a href="/empire.aspx?view=economy">economy</a> page.<br>To update all other data, you need to view each base.</td></tr>';
}

function commanderTotals(){
 
}

function checkEmpireDataAge(){
 if(getSetting('empireBaseData',null) == null) insertNotification('Empire base data has not been set.<br>Visit the <a href="/empire.aspx?view=economy">economy page</a> to set the information.<br><br><br>');
 else if(Math.round(new Date().getTime()/1000) > (parseInt(getSetting('lastEmpireCheck',0))+(86400*3))) insertNotification('Empire base data has not been updated in over three days.<br>Visit the <a href="/empire.aspx?view=economy">economy page</a> to refresh the information.<br><br><br>');
}

function saveEmpireBases(){
 var d='',l,t = document.getElementById('empire_economy_bases').firstChild.lastChild.firstChild.firstChild.childNodes[1].childNodes;
 for(var i=0;i<t.length;i++){
  d+='|:|'+t[i].childNodes[0].firstChild.href.split('=')[1]+'|'+escape(t[i].childNodes[0].firstChild.innerHTML)+'|'+t[i].childNodes[1].firstChild.innerHTML+'|'+t[i].childNodes[2].innerHTML;
  l=document.createElement('a');
  l.href='javascript:void(1)';
  l.innerHTML='Notes';
  l.style.fontSize='11px';
  l.id='note_base_'+t[i].childNodes[0].firstChild.href.split('=')[1]+'|'+escape(t[i].childNodes[0].textContent);
  t[i].childNodes[1].style.whiteSpace='nowrap';
  t[i].childNodes[1].insertBefore(document.createTextNode(" - "),t[i].childNodes[1].firstChild);
  t[i].childNodes[1].insertBefore(l,t[i].childNodes[1].firstChild);
  if(getSetting('note_base_'+t[i].childNodes[0].firstChild.href.split('=')[1],false)) t[i].childNodes[1].insertBefore(document.createTextNode("*"),t[i].childNodes[1].firstChild);
  l.addEventListener('click',function(){viewNotes(this.id.split('|')[0],unescape(this.id.split('|')[1]),false);},false);
 }
 setSetting('empireBaseData',d.substring(3));
 setSetting('lastEmpireCheck',Math.round(new Date().getTime()/1000));
}

function storeBaseData(b){
 if(!b || getSetting('empireBaseData',null) == null || getSetting('empireBaseData').indexOf(b)==-1) return;
 var a = /Terrain:<\/b> ([^<]+)/.exec(document.getElementById('base_processing-capacities').parentNode.parentNode.firstChild.innerHTML)[1];
 a += '|'+/Astro Type:<\/b> ([^<]+)/.exec(document.getElementById('base_processing-capacities').parentNode.parentNode.firstChild.innerHTML)[1];
 var t = document.getElementById('base_processing-capacities').firstChild.lastChild.firstChild.firstChild.firstChild.childNodes;
 for(var i=0;i<3;i++){
   a+='|'+cleanNumbers(t[i].childNodes[1].innerHTML);
 }
 if(document.getElementById('base_processing-capacities').parentNode.parentNode.parentNode.lastChild.firstChild.innerHTML.indexOf('Astro Type:')==-1) a+='|'+document.getElementById('base_processing-capacities').parentNode.parentNode.parentNode.lastChild.firstChild.innerHTML;
 else a+='|no commander';
 a=a.replace('<small>','');
 a=a.replace('</small>','');
 setSetting('baseData'+b,a);
}

function copyBaseData(){
 if(!document.getElementById('base_processing-capacities')) return;
 var l=document.createElement('a');
 var c=document.evaluate("//table[@class='base']",document,null,9,null).singleNodeValue.firstChild.firstChild.childNodes[1];
 l.id=escape(c.firstChild.textContent);
 c.insertBefore(l,c.childNodes[2]);
 l.href='javascript:void(1)';
 l.innerHTML='Copy Base Data';
 l.setAttribute('style','font-size:11px;position:absolute;right:15%;white-space:nowrap;margin-top:1em;');
 l.addEventListener('click',function(){viewNotes(false,unescape(this.id),'e');},false);
}

function copyLocData(){
 if(!document.getElementById('base_resources')) return;
 var c=document.evaluate("//table[@class='astro']",document,null,9,null).singleNodeValue.firstChild.firstChild.firstChild.firstChild;
 var l=c.parentNode.parentNode.childNodes[1].insertBefore(document.createElement('a'),c.parentNode.parentNode.childNodes[1].firstChild);
 l.href='javascript:void(1)';
 l.innerHTML='Copy Astro Data';
 l.setAttribute('style','font-size:11px;font-weight:900;position:absolute;right:30%;white-space:nowrap;margin-top:0;');
 l.addEventListener('click',function(){viewNotes(false,wlh.split('=')[1].split('&')[0],'e');},false);
}

function doCopyBaseData(t){
 if(document.getElementById('base_processing-capacities')){
  var d=document.evaluate("//a[contains(@href,'?loc=')]",document,null,9,null).singleNodeValue.innerHTML+" - "+t+"\n\n";
  var r=document.getElementById('base_processing-capacities').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;
  var p=r[7].childNodes[1].firstChild.href.split('=')[1],f='',i=0,s=[],v=[];
  d+=r[7].firstChild.innerHTML+': '+p+' - '+r[7].childNodes[1].firstChild.innerHTML+"\n";
  if(r[8].childNodes[1].firstChild) d+=r[8].firstChild.innerHTML+': '+r[8].childNodes[1].firstChild.href.split('=')[1].split('&')[0]+' - '+r[8].childNodes[1].textContent+'\n';
  d+=r[4].firstChild.innerHTML+': '+r[5].childNodes[1].innerHTML+' / '+r[4].childNodes[1].innerHTML+' - TR: '+document.evaluate("//a[contains(@href,'?loc=')]",document,null,9,null).singleNodeValue.parentNode.parentNode.lastChild.innerHTML+"\n\n";
  if(document.getElementById('base_fleets')){
   r=document.getElementById('base_fleets').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
   d+=r[0].parentNode.previousSibling.firstChild.firstChild.firstChild.firstChild.innerHTML+" (base owner listed first)\n----------------------------------------------\n";
  }else r=[];
 }else if(document.getElementById('base_resources')){
  var c=document.evaluate("//table[@class='astro']",document,null,9,null).singleNodeValue.firstChild.firstChild.firstChild.firstChild;
  var d=t+' - '+c.childNodes[6].textContent+((c.childNodes[6].textContent==c.childNodes[2].textContent)?'':(' '+c.childNodes[2].textContent))+'\n\n';
  d+=c.childNodes[9].textContent+' '+c.childNodes[10].textContent+'\n'+c.childNodes[13].textContent+' '+c.childNodes[14].textContent+'\n'+c.childNodes[17].textContent+' '+c.childNodes[18].textContent+'\n';
  var a=document.evaluate("//table[@id='base_resources']//table//td",document,null,7,null);
  for(var i=0;i<a.snapshotLength;i=i+2){
   d+=a.snapshotItem(i).textContent+' '+a.snapshotItem(i+1).textContent+'\n';
  }
  d+='\n';
  if(document.getElementById('map_base')){
   var a=document.evaluate("//table[@id='map_base']//table//td",document,null,7,null);
   d+='BASE: '+a.snapshotItem(0).firstChild.href.split('=')[1]+' - '+a.snapshotItem(0).textContent+'\nowner: '+a.snapshotItem(1).firstChild.href.split('=')[1]+' - '+a.snapshotItem(1).textContent+'\n';
   if(a.snapshotItem(2).firstChild) d+='Occupied by: '+a.snapshotItem(2).firstChild.href.split('=')[1]+' - '+a.snapshotItem(2).textContent+'\n';
   d+='Economy: '+a.snapshotItem(3).textContent+'\n\n';
  }
  if(document.getElementById('map_fleets')){
   var r=document.getElementById('map_fleets').firstChild.childNodes[1].firstChild.firstChild.childNodes[1].childNodes;
   d+=r[0].parentNode.previousSibling.firstChild.firstChild.firstChild.firstChild.innerHTML+"\n----------------------------------------------\n";
  }else var r=[];
  var p='',i=0;
 }
 for(i;i<r.length;i++){
  if((r[i].childNodes[1].firstChild.href.split('=')[1])==p || p==''){
   d+=r[i].childNodes[1].firstChild.innerHTML+' | '+r[i].childNodes[0].firstChild.innerHTML+' | ';
   if(r[i].childNodes[2].firstChild && r[i].childNodes[2].firstChild.tagName.toLowerCase()!='a') d+=r[i].childNodes[2].firstChild.innerHTML+' | ';
   d+=r[i].childNodes[3].firstChild.innerHTML+'\n';
  }else{
   f+=r[i].childNodes[1].firstChild.innerHTML+' | '+r[i].childNodes[0].firstChild.innerHTML+' | ';
   if(r[i].childNodes[2].firstChild && r[i].childNodes[2].firstChild.tagName.toLowerCase()!='a') f+=r[i].childNodes[2].firstChild.innerHTML+' | ';
   f+=r[i].childNodes[3].firstChild.innerHTML+'\n';
  }
 }
 if(p!=''){
  if(f!='') d+='\n'+f;
  d+='\n\n';
  r=document.getElementById('base_resume-structures').firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[1].childNodes;
  s=r[2].innerHTML.split('<br>');
  v=r[3].innerHTML.split('<br>');
  for(i=0;i<s.length-1;i++){
   d+=s[i]+': '+v[i]+'\n';
  }
  s=r[4].innerHTML.split('<br>');
  v=r[5].innerHTML.split('<br>');
  for(i=0;i<s.length-1;i++){
   d+=s[i]+': '+v[i]+'\n';
  }
 }
 var b=document.body.innerHTML.match(/<br><center>(\d[^<]+)<\/center><br>/);
 if(b && b[1]) d+="\n"+b[1];
 return d;
}

/**** Fleet Scanner ****/
function autoScanFleet(o,s,l){
 var s = s;
 if(document.getElementById('scan'+o+'Auto').checked){
   if(parseInt(document.getElementById('scan'+o+'Num').innerHTML)<1 && parseInt(document.getElementById('scan'+o+'Num').innerHTML)!=-1){
     document.getElementById('scan'+o+'Auto').checked=false;
     autoScanFleet(o,false,l);
     return;
   }
   var t = /(\d+):(\d\d):(\d\d)/.exec(document.getElementsByTagName('small')[0].parentNode.innerHTML);
   t[1]=Math.abs(t[1]);t[2]=Math.abs(t[2]);t[3]=Math.abs(t[3]);
   if(parseInt(document.getElementById('scan'+o+'Min').innerHTML) < t[2] && parseInt(document.getElementById('scan'+o+'Hrs').innerHTML)==t[1]){t[1]=t[1]+1;t[2]=t[2]-60}
   t[2]=((isNaN(parseInt(document.getElementById('scan'+o+'Min').innerHTML)))?0:parseInt(document.getElementById('scan'+o+'Min').innerHTML))-t[2];
   t[3]=((isNaN(parseInt(document.getElementById('scan'+o+'Sec').innerHTML)))?0:parseInt(document.getElementById('scan'+o+'Sec').innerHTML))-t[3];
   t[1]=(isNaN(parseInt(document.getElementById('scan'+o+'Hrs').innerHTML)))?t[1]:(parseInt(document.getElementById('scan'+o+'Hrs').innerHTML)-t[1]);
   if(t[1]<0) t[1]=24+t[1];
   t[2]=(isNaN(parseInt(document.getElementById('scan'+o+'Hrs').innerHTML)))?t[2]:((t[1]*60)+t[2]);
   if(t[3]==60) t[2]=1+t[2];
   if(t[2]<0) t[2]=60+t[2];
   var d=parseInt(new Date().getTime()/1000)-parseInt(document.getElementById('scan'+o+'TimeStamp').innerHTML);
   t[3]=(t[2]*60)+t[3]-d;
   t[2]=parseInt(t[3]/60);
   t[3]=t[3]-(t[2]*60);
   if(s && t[2]<=0 && t[3]<=parseInt(document.getElementById('scan'+o+'Ref').innerHTML)){s=false;window.location.reload();return;}
   document.getElementById('scan'+o+'Increment').style.visibility='visible';
   document.getElementById('scan'+o+'Time').lastChild.innerHTML=o.toUpperCase()+' Auto Scan in '+t[2]+'m '+((parseInt(t[3])<=9)?('0'+t[3]):t[3])+'s';
   if((t[2]<=0 && t[3]<=0) || document.getElementById('scan'+o+'Sec').innerHTML=='now'){
     if(document.getElementById('scan'+o+'Sec').innerHTML=='now'){
      document.getElementById('scan'+o+'Sec').innerHTML=(parseInt(new Date().getSeconds())<=9)?'0'+new Date().getSeconds():new Date().getSeconds();
      document.getElementById('scan'+o+'Min').innerHTML=new Date().getMinutes();
      document.getElementById('scan'+o+'Hrs').innerHTML=t[1];
     }
     document.getElementById('scan'+o+'Min').innerHTML=(document.getElementById('scan'+o+'Inc').innerHTML=='-1')?(1440+parseInt(document.getElementById('scan'+o+'Min').innerHTML)):(parseInt(document.getElementById('scan'+o+'Inc').innerHTML)+parseInt(document.getElementById('scan'+o+'Min').innerHTML));
     while(parseInt(document.getElementById('scan'+o+'Min').innerHTML)>59){
      document.getElementById('scan'+o+'Min').innerHTML=parseInt(document.getElementById('scan'+o+'Min').innerHTML)-60;
      if(!isNaN(parseInt(document.getElementById('scan'+o+'Hrs').innerHTML))) document.getElementById('scan'+o+'Hrs').innerHTML=parseInt(document.getElementById('scan'+o+'Hrs').innerHTML)+1;
     }
     if(parseInt(document.getElementById('scan'+o+'Num').innerHTML)!=-1) document.getElementById('scan'+o+'Num').innerHTML=parseInt(document.getElementById('scan'+o+'Num').innerHTML)-1;
     if(document.getElementById('scan'+o+'Min').innerHTML.length<2) document.getElementById('scan'+o+'Min').innerHTML='0'+document.getElementById('scan'+o+'Min').innerHTML;
     if(document.getElementById('scan'+o+'Sec').innerHTML.length<2) document.getElementById('scan'+o+'Sec').innerHTML='0'+document.getElementById('scan'+o+'Sec').innerHTML;
     GM_setValue(l+'_scan'+o+'Auto',document.getElementById('scan'+o+'Num').innerHTML+'|'+document.getElementById('scan'+o+'Hrs').innerHTML+'|'+document.getElementById('scan'+o+'Min').innerHTML+'|'+document.getElementById('scan'+o+'Sec').innerHTML+'|'+document.getElementById('scan'+o+'Inc').innerHTML+'|'+document.getElementById('scan'+o+'Ref').innerHTML);
     s=true;
     document.getElementById('scan'+o).click();
   }
   else t = setTimeout(function(){autoScanFleet(o,s,l);},1000);
 }else{
   GM_deleteValue(l+'_scan'+o+'Auto');
   clearTimeout(t);
   document.getElementById('scan'+o+'Increment').style.visibility='hidden';
   document.getElementById('scan'+o+'Time').lastChild.innerHTML=o+': manual';
 }
 document.getElementById('scan'+o+'Auto').parentNode.style.color=(document.getElementById('scan'+o+'Auto').checked)?'white':'grey';
 document.getElementById('scan'+o+'Time').style.color=(document.getElementById('scan'+o+'Auto').checked)?'white':'grey';
}

function setIncremental(o,l){
 if(document.getElementById('scanSettings').style.display=='table'){
   document.getElementById('scanSettings').innerHTML="";
   document.getElementById('scanSettings').style.display='none';
   return;
 }else{
   GM_addStyle("#scanSettings TD{padding:3px 12px;font:500 11px verdana,tahoma,arial,sans-serif;text-align:center;}#scanSettings INPUT{background:transparent url('http://cdn.astroempires.com/skins/AE_Original/images/grad2.jpg');font:500 11px verdana,tahoma,arial,sans-serif;margin:0;padding:0;border:0;text-align:right;}#scanSettings LABEL,#scanSettings BUTTON{margin:0 6px;padding:1px 1px 1px 2px;border:1px solid grey;background-color:#242424;color:#FFFFFF;}#scanSettings BUTTON{font:900 11px verdana,tahoma,arial,sans-serif;}");
   document.getElementById('scanSettings').innerHTML="<tr><th rowspan=2 align=center style='padding:10px;'>"+o+"<br>Scan Settings...</th><td><label># of Scans:<input size=4 maxlength=4 id='numberScans' value='"+document.getElementById('scan'+o+'Num').innerHTML+"'></label></td><td><label>Hrs:<input size=4 maxlength=4 id='numberScanHrs' value='"+((isNaN(parseInt(document.getElementById('scan'+o+'Hrs').innerHTML)))?'-1':document.getElementById('scan'+o+'Hrs').innerHTML)+"'></label><label>Min:<input size=2 maxlength=2 id='numberScanMin' value='"+((isNaN(parseInt(document.getElementById('scan'+o+'Min').innerHTML)))?0:document.getElementById('scan'+o+'Min').innerHTML)+"'></label><label>Sec:<input size=2 maxlength=2 id='numberScanSec' value='"+((document.getElementById('scan'+o+'Sec').innerHTML=='Now')?'-1':document.getElementById('scan'+o+'Sec').innerHTML)+"'></label></td><td><label>Every<input size=4 maxlength=4 id='numberScanInc' value='"+document.getElementById('scan'+o+'Inc').innerHTML+"'> minutes.</label></td><td><label>Refresh Buffer:<input size=2 maxlength=2 id='numberScanRef' value='"+document.getElementById('scan'+o+'Ref').innerHTML+"'></label></td><td><button id='applyScanSetting'>Apply</button></td></tr><tr><td>(-1) = Unlimited</td><td>Start @ Server Time entered above.<br>(-1) Hrs = 'Any Hour'<br>(-1) Sec = 'Start Now'<br>25 Hrs = 1 am next day etc...</td><td>Until # of Scans = 0<br>(-1) = 1/Day @ Time</td><td># Sec before scan<br>++ for slow network</td><td><button onClick='this.parentNode.parentNode.parentNode.parentNode.style.display=\"none\";this.parentNode.parentNode.parentNode.parentNode.innerHTML=\"\";'>Cancel</button></td></tr>";
   document.getElementById('scanSettings').style.display='table';
   document.getElementById('applyScanSetting').addEventListener('click',function(){doSetIncremental(o,l);},false);
 }
}

function doSetIncremental(o,l){
 if(isNaN(parseInt(document.getElementById('numberScans').value)) || parseInt(document.getElementById('numberScans').value)<-1 || parseInt(document.getElementById('numberScans').value)==0){alert('INPUT ERROR\n\n# of Scans must be a number greater than 0 or -1');return;}
 if(isNaN(parseInt(document.getElementById('numberScanHrs').value)) || parseInt(document.getElementById('numberScanHrs').value)<-1){alert('INPUT ERROR\n\nHours must be a number greater than -2');return;}
 if(isNaN(parseInt(document.getElementById('numberScanMin').value)) || parseInt(document.getElementById('numberScanMin').value)<0 || parseInt(document.getElementById('numberScanMin').value)>59){alert('INPUT ERROR\n\nMinutes must be a number between 0 and 59');return;}
 if(isNaN(parseInt(document.getElementById('numberScanSec').value)) || parseInt(document.getElementById('numberScanSec').value)<-1 || parseInt(document.getElementById('numberScanSec').value)>59){alert('INPUT ERROR\n\nSeconds must be a number between -1 and 59');return;}
 if(isNaN(parseInt(document.getElementById('numberScanInc').value)) || parseInt(document.getElementById('numberScanInc').value)<-1 || parseInt(document.getElementById('numberScanInc').value)==0){alert('INPUT ERROR\n\nIncrement must be a number greater than 0 or -1');return;}
 if(isNaN(parseInt(document.getElementById('numberScanRef').value)) || parseInt(document.getElementById('numberScanRef').value)<1 || parseInt(document.getElementById('numberScanRef').value)>59){alert('INPUT ERROR\n\nRefresh must be a number between 1 and 59');return;}
 document.getElementById('scan'+o+'Num').innerHTML=(document.getElementById('numberScans').value=='-1')?'-1':Math.abs(document.getElementById('numberScans').value);
 if(document.getElementById('numberScanSec').value=='-1') document.getElementById('scan'+o+'Hrs').innerHTML='';
 else if(document.getElementById('numberScanHrs').value=='-1')  document.getElementById('scan'+o+'Hrs').innerHTML='xx';
 else document.getElementById('scan'+o+'Hrs').innerHTML=Math.abs(document.getElementById('numberScanHrs').value);
 document.getElementById('scan'+o+'Min').innerHTML=(document.getElementById('numberScanSec').value=='-1')?'':(Math.abs(document.getElementById('numberScanMin').value)<=9)?'0'+Math.abs(document.getElementById('numberScanMin').value):Math.abs(document.getElementById('numberScanMin').value);
 document.getElementById('scan'+o+'Sec').innerHTML=(document.getElementById('numberScanSec').value=='-1')?'now':(Math.abs(document.getElementById('numberScanSec').value)<=9)?'0'+Math.abs(document.getElementById('numberScanSec').value):Math.abs(document.getElementById('numberScanSec').value);
 document.getElementById('scan'+o+'Inc').innerHTML=(document.getElementById('numberScanInc').value=='-1')?1440:Math.abs(document.getElementById('numberScanInc').value);
 document.getElementById('scan'+o+'Ref').innerHTML=Math.abs(document.getElementById('numberScanRef').value);
 GM_setValue(l+'_scan'+o+'Auto',document.getElementById('scan'+o+'Num').innerHTML+'|'+document.getElementById('scan'+o+'Hrs').innerHTML+'|'+document.getElementById('scan'+o+'Min').innerHTML+'|'+document.getElementById('scan'+o+'Sec').innerHTML+'|'+document.getElementById('scan'+o+'Inc').innerHTML+'|'+document.getElementById('scan'+o+'Ref').innerHTML);
 document.getElementById('scan'+o+'Auto').checked=true;
 document.getElementById('scanSettings').innerHTML="";
 document.getElementById('scanSettings').style.display='none';
 autoScanFleet(o,true,l);
}

function scanFleet(a){
 if(document.getElementById('scanHelpTable')) document.body.removeChild(document.getElementById('scanHelpTable'));
 if(document.getElementById('idList')) document.getElementById('idList').style.display='none';
 if(document.getElementById('listList')) document.getElementById('listList').style.display='none';
 if(document.getElementById('rcList')) document.getElementById('rcList').style.display='none';
 if(document.getElementById('historyList')) document.body.removeChild(document.getElementById('historyList'));
 if(document.getElementById('alertList')) document.body.removeChild(document.getElementById('alertList'));
 if(document.getElementById('fleetList') && !document.getElementById('scanAgain').checked && !document.getElementById('scanFleetAuto').checked){document.getElementById('fleetList').style.display='table';filterFleets(a);return;}
 else if(document.getElementById('fleetList')) document.body.removeChild(document.getElementById('fleetList'));
 var x,r,c,i,v=0;
 var plr=[];
 var t=['FT','BO','HB','IB','CV','RC','DE','FR','IF','SS','OS','CR','CA','HC','BS','FC','DN','TI','LV','DS'];
 c=document.createElement("table");
 c.setAttribute('id','fleetList');
 c.setAttribute("style","margin:10px auto;min-width:75%;");
 c.appendChild(document.createElement('tr'));
 c.firstChild.appendChild(document.createElement('th'));
 c.firstChild.firstChild.setAttribute('style','padding:20px 4px 4px;border:1px solid #006;min-width:100px;');
 c.firstChild.firstChild.innerHTML="Player - Fleet<br><br><a href='javascript:void(1);' id='saveFleetScanLink' style='font-weight:500;font-size:11px;'>Save</a><span id='scanFleetCounter' style='display:none;'>"+a.snapshotLength/2+"</span>";
 for(x in t){
   c.firstChild.appendChild(document.createElement('th'));
   c.firstChild.lastChild.setAttribute('style','padding:8px 3px;border:1px solid #006;vertical-align:bottom;text-align:center;');
   c.firstChild.lastChild.innerHTML=t[x];
 }
 for(x=0;x<a.snapshotLength;x=x+2){
   c.appendChild(document.createElement('tr'));
   c.lastChild.setAttribute('id','f'+a.snapshotItem(x).href.split('=')[1]);
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;');
   c.lastChild.firstChild.innerHTML=a.snapshotItem(x).parentNode.parentNode.childNodes[1].innerHTML+' - '+a.snapshotItem(x).parentNode.parentNode.childNodes[3].innerHTML;
   v+=parseInt(cleanNumbers(a.snapshotItem(x).parentNode.parentNode.childNodes[3].firstChild.innerHTML))
   c.lastChild.firstChild.lastChild.className='scanFleet';
   for(r in t){
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('style','padding:3px;border:1px solid #006;font-size:.65em;text-align:right;');
     c.lastChild.lastChild.innerHTML='';
   }
 }
 if(a.snapshotLength>2){
   c.appendChild(document.createElement('tr'));
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.setAttribute('style','line-height:8px;font-size:6px;');
   c.lastChild.firstChild.setAttribute('colspan','21');
   c.lastChild.firstChild.innerHTML='&nbsp;';
   c.appendChild(document.createElement('tr'));
   c.lastChild.setAttribute('id','fFiltered');
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;text-align:right;');
   c.lastChild.firstChild.innerHTML='Filtered Totals:';
   for(x in t){
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('style','padding:3px;border:1px solid #006;font-size:.65em;text-align:right;');
   }
   c.appendChild(document.createElement('tr'));
   c.lastChild.setAttribute('id','fFilterAverage');
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;text-align:right;');
   c.lastChild.firstChild.innerHTML='<span id="scanNumberF"></span> filtered fleets -- avg. / fleet:';
   for(x in t){
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('style','padding:3px;border:1px solid #006;font-size:.65em;text-align:right;');
   }
   c.appendChild(document.createElement('tr'));
   c.lastChild.setAttribute('id','fPFilterAverage');
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;text-align:right;');
   c.lastChild.firstChild.innerHTML='<span id="plrNumberF"></span> filtered players -- avg. / player:';
   for(x in t){
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('style','padding:3px;border:1px solid #006;font-size:.65em;text-align:right;');
   }
   c.appendChild(document.createElement('tr'));
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.setAttribute('style','line-height:8px;font-size:6px;');
   c.lastChild.firstChild.setAttribute('colspan','21');
   c.lastChild.firstChild.innerHTML='&nbsp;';
   c.appendChild(document.createElement('tr'));
   c.lastChild.setAttribute('id','fTotals');
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;text-align:right;');
   c.lastChild.firstChild.innerHTML='Totals:';
   for(x in t){
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('style','padding:3px;border:1px solid #006;font-size:.65em;text-align:right;');
   }
   c.appendChild(document.createElement('tr'));
   c.lastChild.setAttribute('id','fAverage');
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;text-align:right;');
   c.lastChild.firstChild.innerHTML='<span id="scanNumber">'+a.snapshotLength/2+'</span> fleets -- avg. / fleet:';
   for(x in t){
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('style','padding:3px;border:1px solid #006;font-size:.65em;text-align:right;');
   }
   for(x=0;x<a.snapshotLength;x++){if(a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.href.split("?")[1].split("=")[0]=="player") plr[a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.href.split("?")[1].split("=")[1]]=true;x++;}
   r=0;
   for(x in plr){r++;}
   if(r>1){
     c.appendChild(document.createElement('tr'));
     c.lastChild.setAttribute('id','fPAverage');
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;text-align:right;');
     c.lastChild.firstChild.innerHTML='<span id="plrNumber">'+r+'</span> players -- avg. / player:';
     for(x in t){
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.setAttribute('style','padding:3px;border:1px solid #006;font-size:.65em;text-align:right;');
     }
   }
   c.appendChild(document.createElement('tr'));
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.setAttribute('style','white-space:nowrap;padding:8px 3px;');
   c.lastChild.firstChild.innerHTML="<span style='font-size:.75em;'>Total Fleet Value: </span><span style='color:"+getSetting('config_overrideLinks','#DDC040')+";'>"+commaFormat(v)+'</span>';
   if(a.snapshotLength>20){
     for(x in t){
       c.lastChild.appendChild(document.createElement('th'));
       c.lastChild.lastChild.setAttribute('style','padding:8px 3px;border:1px solid #006;vertical-align:top;text-align:center;');
       c.lastChild.lastChild.innerHTML=t[x];
     }
   }else{
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('colspan',t.length);
     c.lastChild.lastChild.innerHTML='&nbsp;';
   }
 }
 document.body.appendChild(c);
 if(document.getElementById('scanFleetAuto').checked){
   document.getElementById('saveFleetScanLink').innerHTML='Saving';
   document.getElementById('saveFleetScanLink').setAttribute('style','color:#FFFFFF;text-decoration:none;cursor:default;font-weight:500;font-size:11px;');
 }else{
   document.getElementById('saveFleetScanLink').addEventListener('click',function(){saveFleetScan('Fleet');},false)
 }
 r=0;
 for(x=0;x<a.snapshotLength;x=x+2){
   if(getSetting('fleetScannerThrottle','30')!='0') r=parseInt((60000/parseInt(getSetting('fleetScannerThrottle','30')))*(x/2));
   getFleetId(a.snapshotItem(x).href,r,{'Fighters':1,'Bombers':2,'Heavy Bombers':3,'Ion Bombers':4,'Corvette':5,'Recycler':6,'Destroyer':7,'Frigate':8,'Ion Frigate':9,'Scout Ship':10,'Outpost Ship':11,'Cruiser':12,'Carrier':13,'Heavy Cruiser':14,'Battleship':15,'Fleet Carrier':16,'Dreadnought':17,'Titan':18,'Leviathan':19,'Death Star':20})
 }
}

function getFleetId(a,p,t){
 setTimeout(function(){getFleetData(a,t);},p);
}

function getFleetData(a,t){
 var r = new XMLHttpRequest();
 var g;
 r.open("GET",a,true);
 r.onreadystatechange=function(){
   if(r.readyState==4){
     while(g=/([^>]+)<\/b><\/td><td align='center'>([^<]+)</g.exec(r.responseText)){
       document.getElementById('f'+a.split('=')[1]).childNodes[t[g[1]]].innerHTML=cleanNumbers(g[2],true);
       if(document.getElementById('fTotals')) document.getElementById('fTotals').childNodes[t[g[1]]].innerHTML=Math.round((isNaN(parseFloat(document.getElementById('fTotals').childNodes[t[g[1]]].innerHTML))?cleanNumbers(g[2],true):parseFloat(document.getElementById('fTotals').childNodes[t[g[1]]].innerHTML)+parseFloat(cleanNumbers(g[2],true)))*100)/100;
       if(document.getElementById('fAverage')) document.getElementById('fAverage').childNodes[t[g[1]]].innerHTML=Math.round(parseFloat(document.getElementById('fTotals').childNodes[t[g[1]]].innerHTML)/parseInt(document.getElementById('scanNumber').innerHTML));
       if(document.getElementById('fPAverage')) document.getElementById('fPAverage').childNodes[t[g[1]]].innerHTML=Math.round(parseFloat(document.getElementById('fTotals').childNodes[t[g[1]]].innerHTML)/parseInt(document.getElementById('plrNumber').innerHTML));
     }
     if(document.getElementById('scanFleetCounter')){
       document.getElementById('scanFleetCounter').innerHTML=parseInt(document.getElementById('scanFleetCounter').innerHTML)-1;
       if(parseInt(document.getElementById('scanFleetCounter').innerHTML)==0){
         document.getElementById('scanFleetCounter').innerHTML='';
         filterFleets(a);
         if(document.getElementById('scanFleetAuto').checked) saveFleetScan('Fleet');
       }
     }else if(document.getElementById('scanFleetAuto').checked){
       filterFleets(a);
       saveFleetScan('Fleet');
     }else filterFleets(a);
   }
 }
 r.send(null);
}

function filterFleets(a){
 var f,c=[],p=[];
 if(a.snapshotLength>2 && (document.getElementById('scanLanded').options[document.getElementById('scanLanded').options.selectedIndex].value!='all' || document.getElementById('scanPlayer').options[document.getElementById('scanPlayer').options.selectedIndex].value!='all' || document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value!='all' || document.getElementById('scanGuild').options[document.getElementById('scanGuild').options.selectedIndex].value!='all')){
   f=true;
   document.getElementById('fFiltered').style.display='';
   document.getElementById('fFiltered').previousSibling.style.display='';
   document.getElementById('fFilterAverage').style.display='';
   document.getElementById('scanNumberF').innerHTML='0';
   document.getElementById('plrNumberF').innerHTML='0';
   c=document.getElementById('fFiltered').childNodes;
   for(var i=1;i<c.length;i++){c[i].innerHTML=''}
   c=document.getElementById('fFilterAverage').childNodes;
   for(var i=1;i<c.length;i++){c[i].innerHTML=''}
   c=document.getElementById('fPFilterAverage').childNodes;
   for(var i=1;i<c.length;i++){c[i].innerHTML=''}
 }else{
   f=false;
   if(document.getElementById('fFiltered')) document.getElementById('fFiltered').style.display='none';
   if(document.getElementById('fFiltered')) document.getElementById('fFiltered').previousSibling.style.display='none';
   if(document.getElementById('fFilterAverage')) document.getElementById('fFilterAverage').style.display='none';
   if(document.getElementById('fPFilterAverage')) document.getElementById('fPFilterAverage').style.display='none';
 }
 for(var x=0;x<a.snapshotLength;x=x+2){
   document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).style.display="none";
   if(a.snapshotItem(x).parentNode.parentNode.childNodes[2].innerHTML=='' || a.snapshotItem(x).parentNode.parentNode.childNodes[2].innerHTML.indexOf('<a href=')!=-1){
     if(document.getElementById('scanLanded').options[document.getElementById('scanLanded').options.selectedIndex].value=='fly') continue;
   }else{
     if(document.getElementById('scanLanded').options[document.getElementById('scanLanded').options.selectedIndex].value=='land') continue;
   }
   if(document.getElementById('scanPlayer').options[document.getElementById('scanPlayer').options.selectedIndex].value!=escape(a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.innerHTML) && document.getElementById('scanPlayer').options[document.getElementById('scanPlayer').options.selectedIndex].value!='all') continue;
   if(a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.innerHTML.indexOf('[')==0 && document.getElementById('scanGuild').options[document.getElementById('scanGuild').options.selectedIndex].value=='' && document.getElementById('scanPlayer').options[document.getElementById('scanPlayer').options.selectedIndex].value=='all') continue;
   if(document.getElementById('scanGuild').options[document.getElementById('scanGuild').options.selectedIndex].value!=escape(a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.innerHTML.substring(a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.innerHTML.indexOf('[')+1,a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.innerHTML.indexOf(']'))) && document.getElementById('scanGuild').options[document.getElementById('scanGuild').options.selectedIndex].value!='all' && document.getElementById('scanPlayer').options[document.getElementById('scanPlayer').options.selectedIndex].value=='all') continue;
   if(document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value!='all' && document.getElementById('scanPlayer').options[document.getElementById('scanPlayer').options.selectedIndex].value=='all'){
     if(document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value=='rc' && document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[6].innerHTML=='') continue;
     if(document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value=='ft' && (1000000>parseInt(document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[1].innerHTML) || isNaN(parseInt(document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[1].innerHTML)))) continue;
     if(document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value=='cap' && document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[17].innerHTML=='' && document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[18].innerHTML=='' && document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[19].innerHTML=='' && document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[20].innerHTML=='') continue;
     if(document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value=='crhcbs' && document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[12].innerHTML=='' && document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[14].innerHTML=='' && document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes[15].innerHTML=='') continue;
     if(document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value=='mil' && 1000000>parseInt(a.snapshotItem(x).parentNode.parentNode.childNodes[3].firstChild.innerHTML.replace(/[^\d]/g,''))) continue;
     if(document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value=='10mil' && 10000000>parseInt(a.snapshotItem(x).parentNode.parentNode.childNodes[3].firstChild.innerHTML.replace(/[^\d]/g,''))) continue;
     if(document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value=='20mil' && 20000000>parseInt(a.snapshotItem(x).parentNode.parentNode.childNodes[3].firstChild.innerHTML.replace(/[^\d]/g,''))) continue;
     if(document.getElementById('scanShips').options[document.getElementById('scanShips').options.selectedIndex].value=='30mil' && 30000000>parseInt(a.snapshotItem(x).parentNode.parentNode.childNodes[3].firstChild.innerHTML.replace(/[^\d]/g,''))) continue;
   }
   document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).style.display="table-row";
   if(f){
     if(!p[a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.href.split("?")[1].split("=")[1]]){
       document.getElementById('plrNumberF').innerHTML=parseInt(document.getElementById('plrNumberF').innerHTML)+1;
       p[a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.href.split("?")[1].split("=")[1]]=true;
     }
     if(parseInt(document.getElementById('plrNumberF').innerHTML)>1) document.getElementById('fPFilterAverage').style.display='';
     else document.getElementById('fPFilterAverage').style.display='none';
     document.getElementById('scanNumberF').innerHTML=parseInt(document.getElementById('scanNumberF').innerHTML)+1;
     c=document.getElementById('f'+a.snapshotItem(x).href.split('=')[1]).childNodes;
     for(var i=1;i<c.length;i++){
       if(c[i].innerHTML!='') document.getElementById('fFiltered').childNodes[i].innerHTML=Math.round((isNaN(parseFloat(document.getElementById('fFiltered').childNodes[i].innerHTML))?c[i].innerHTML:parseFloat(document.getElementById('fFiltered').childNodes[i].innerHTML)+parseFloat(c[i].innerHTML))*100)/100;
       if(document.getElementById('fFiltered').childNodes[i].innerHTML!='') document.getElementById('fFilterAverage').childNodes[i].innerHTML=Math.round(parseFloat(document.getElementById('fFiltered').childNodes[i].innerHTML)/parseInt(document.getElementById('scanNumberF').innerHTML));
       if(document.getElementById('fFiltered').childNodes[i].innerHTML!='') document.getElementById('fPFilterAverage').childNodes[i].innerHTML=Math.round(parseFloat(document.getElementById('fFiltered').childNodes[i].innerHTML)/parseInt(document.getElementById('plrNumberF').innerHTML));
     }
   }
 }
 document.getElementById('scanAgain').checked = false;
 document.getElementById('scanAgain').parentNode.style.color='grey';
}

function scanId(a){
 if(document.getElementById('scanHelpTable')) document.body.removeChild(document.getElementById('scanHelpTable'));
 if(document.getElementById('listList')) document.getElementById('listList').style.display='none';
 if(document.getElementById('fleetList')) document.getElementById('fleetList').style.display='none';
 if(document.getElementById('rcList')) document.getElementById('rcList').style.display='none';
 if(document.getElementById('historyList')) document.body.removeChild(document.getElementById('historyList'));
 if(document.getElementById('alertList')) document.body.removeChild(document.getElementById('alertList'));
 if(document.getElementById('idList')){
   if(document.getElementById('scanAgain').checked || document.getElementById('scanIdAuto').checked) document.body.removeChild(document.getElementById('idList'));
   else{document.getElementById('idList').style.display='table';return;}
 }
 var h=0,x,t,r,d,c;
 var player=[];
 c=document.createElement("table");
 c.setAttribute('id','idList');
 c.setAttribute("style","margin:10px 0;float:left;");
 c.cellSpacing="1";
 c.cellPadding="5";
 r=document.createElement('tr');
 d=document.createElement('th');
 d.setAttribute("style","text-align:center;padding:6px;");
 d.colSpan="3";
 d.innerHTML="Players List - <span id='playerCount'>0</span> - <a href='javascript:void(1);' id='saveIdScanLink' style='font-weight:500;font-size:11px;'>Save</a>";
 r.appendChild(d);
 c.appendChild(r);
 document.body.appendChild(c);
 r=(document.getElementById('scanIdCounter'))?document.getElementById('scanIdCounter'):document.createElement('span');
 r.setAttribute('id','scanIdCounter');
 r.setAttribute('style','display:none;');
 r.innerHTML=1;
 document.body.appendChild(r);
 if(document.getElementById('scanIdAuto').checked){
   document.getElementById('saveIdScanLink').innerHTML='Saving';
   document.getElementById('saveIdScanLink').setAttribute('style','color:#FFFFFF;text-decoration:none;cursor:default;font-weight:500;font-size:11px;');
 }else{
   document.getElementById('saveIdScanLink').addEventListener('click',function(){saveFleetScan('Id');},false)
 }
 for(x=0;x<a.snapshotLength;x++){if(a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.href.split("?")[1].split("=")[0]=="player") player[a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.href.split("?")[1].split("=")[1]]=a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.innerHTML;x++;}
 for(x in player){
   r=document.createElement('tr');
   d=document.createElement('td');
   d.innerHTML="<a href='messages.aspx?msg="+x+"'>"+x+"</a>";
   r.appendChild(d);
   d=document.createElement('td');
   d.innerHTML="&bull;";
   r.appendChild(d);
   d=document.createElement('td');
   d.innerHTML="<a href='profile.aspx?player="+x+"'>"+player[x]+"</a>";
   r.appendChild(d);
   c.appendChild(r);
   h++;
 }
 document.getElementById('playerCount').innerHTML=h;
 document.getElementById('scanIdCounter').innerHTML=0;
 document.getElementById('scanAgain').checked = false;
 document.getElementById('scanAgain').parentNode.style.color='grey';
 if(document.getElementById('scanIdAuto').checked) saveFleetScan('Id');
}

function scanList(a){
 if(document.getElementById('scanHelpTable')) document.body.removeChild(document.getElementById('scanHelpTable'));
 if(document.getElementById('idList')) document.getElementById('idList').style.display='none';
 if(document.getElementById('fleetList')) document.getElementById('fleetList').style.display='none';
 if(document.getElementById('rcList')) document.getElementById('rcList').style.display='none';
 if(document.getElementById('historyList')) document.body.removeChild(document.getElementById('historyList'));
 if(document.getElementById('alertList')) document.body.removeChild(document.getElementById('alertList'));
 if(document.getElementById('listList')){
   if(document.getElementById('scanAgain').checked || document.getElementById('scanListAuto').checked) document.body.removeChild(document.getElementById('listList'));
   else{document.getElementById('listList').style.display='table';return;}
 }
 var b,c,d=0;
 c=document.createElement("table");
 c.setAttribute('id','listList');
 c.setAttribute("style","margin:10px 0;float:left;");
 c.cellSpacing="1";
 c.cellPadding="5";
 b="<tr><th colspan=5 style='text-align:center;padding:6px;'>Fleets List - <span id='fleetCount'>0</span> - <a href='javascript:void(1);' id='saveListScanLink' style='font-weight:500;font-size:11px;'>Save</a><span id='scanListCounter' style='display:none;'>0</span></th></tr><tr><th>Fleet ID</th><th>Fleet Name</th><th>Player</th><th>Arrival</th><th>Size</th></tr>";
 for(var x=0;x<a.snapshotLength;x=x+2){
   b+="<tr><td><a href='"+a.snapshotItem(x).parentNode.parentNode.childNodes[0].firstChild.href+"'>"+a.snapshotItem(x).parentNode.parentNode.childNodes[0].firstChild.href.split("?")[1].split("=")[1]+"</a></td><td align=center>"+a.snapshotItem(x).parentNode.parentNode.childNodes[0].innerHTML+"</td><td align=center>"+a.snapshotItem(x).parentNode.parentNode.childNodes[1].innerHTML+"</td><td align=center>";
   if(a.snapshotItem(x).parentNode.parentNode.childNodes[2].innerHTML!='' && a.snapshotItem(x).parentNode.parentNode.childNodes[2].innerHTML.indexOf('<a href=')==-1){
     if(a.snapshotItem(x).parentNode.parentNode.childNodes[2].firstChild.innerHTML!=undefined) b+=a.snapshotItem(x).parentNode.parentNode.childNodes[2].firstChild.innerHTML;
     else b+=a.snapshotItem(x).parentNode.parentNode.childNodes[2].innerHTML
   }
   else b+='';
   b+="</td><td align=right><a href='"+a.snapshotItem(x).parentNode.parentNode.childNodes[3].firstChild.href+"'>"+cleanNumbers(a.snapshotItem(x).parentNode.parentNode.childNodes[3].firstChild.innerHTML,true)+"</a></td></tr>";
   d++;
 }
 document.body.appendChild(c);
 c.innerHTML=b;
 if(document.getElementById('scanListAuto').checked){
   document.getElementById('saveListScanLink').innerHTML='Saving';
   document.getElementById('saveListScanLink').setAttribute('style','color:#FFFFFF;text-decoration:none;cursor:default;font-weight:500;font-size:11px;');
 }else{
   document.getElementById('saveListScanLink').addEventListener('click',function(){saveFleetScan('List');},false)
 }
 document.getElementById('fleetCount').innerHTML=d;
 document.getElementById('scanAgain').checked = false;
 document.getElementById('scanAgain').parentNode.style.color='grey';
 if(document.getElementById('scanListAuto').checked) saveFleetScan('List');
}

function scanRc(a){
 if(document.getElementById('scanHelpTable')) document.body.removeChild(document.getElementById('scanHelpTable'));
 if(document.getElementById('idList')) document.getElementById('idList').style.display='none';
 if(document.getElementById('listList')) document.getElementById('listList').style.display='none';
 if(document.getElementById('fleetList')) document.getElementById('fleetList').style.display='none';
 if(document.getElementById('historyList')) document.body.removeChild(document.getElementById('historyList'));
 if(document.getElementById('alertList')) document.body.removeChild(document.getElementById('alertList'));
 if(document.getElementById('rcList')){
   if(document.getElementById('scanAgain').checked || document.getElementById('scanRcAuto').checked) document.body.removeChild(document.getElementById('rcList'));
   else{document.getElementById('rcList').style.display='table';return;}
 }
 var r,d,c,p=0,u=false;
 c=document.createElement("table");
 c.setAttribute('id','rcList');
 c.setAttribute("style","margin:10px 0;float:left;");
 c.cellSpacing="1";
 c.cellPadding="5";
 r=document.createElement('tr');
 d=document.createElement('th');
 d.setAttribute("style","text-align:center;padding:6px;");
 d.colSpan="2";
 d.innerHTML="Recylers List - <a href='javascript:void(1);' id='saveRcScanLink' style='font-weight:500;font-size:11px;'>Save</a>";
 r.appendChild(d);
 c.appendChild(r);
 r=document.createElement('tr');
 d=document.createElement('td');
 d.innerHTML=0;
 d.id="totalRCs";
 r.appendChild(d);
 d=document.createElement('td');
 d.innerHTML="Total RCs Counted";
 r.appendChild(d);
 c.appendChild(r);
 r=document.createElement('tr');
 r.id="fleetUCrow";
 r.style.display="none";
 d=document.createElement('td');
 d.innerHTML=0;
 switch (wlh.split('.')[0].split('/')[2]){
   case 'alpha': d.id='r2066';break;
   case 'beta': d.id='r12116';break;
   case 'ceti': d.id='r24692';break;
   case 'delta': d.id='r48944';break;
   case 'epsilon': d.id='r64668';break;
   case 'fenix': d.id='r46590';break;
   case 'gamma': d.id='r46321';break;
   case 'helion': d.id='r50468';break;
//   case 'ixion': d.id='r';break;
 }
 var uc=d.id.substr(1);
 r.appendChild(d);
 d=document.createElement('td');
 d.innerHTML="United Colonies";
 r.appendChild(d);
 c.appendChild(r);
 document.body.appendChild(c);
 r=(document.getElementById('scanRcCounter'))?document.getElementById('scanRcCounter'):document.createElement('span');
 r.setAttribute('id','scanRcCounter');
 r.setAttribute('style','display:none;');
 r.innerHTML='0';
 document.body.appendChild(r);
 if(document.getElementById('scanRcAuto').checked){
   document.getElementById('saveRcScanLink').innerHTML='Saving';
   document.getElementById('saveRcScanLink').setAttribute('style','color:#FFFFFF;text-decoration:none;cursor:default;font-weight:500;font-size:11px;');
 }
 else document.getElementById('saveRcScanLink').addEventListener('click',function(){saveFleetScan('Rc');},false)
 for(var x=0;x<a.snapshotLength;x=x+2){
   if(a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.href.split('=')[1]==uc){document.getElementById('fleetUCrow').style.display="table-row";u=uc;}
   else if(a.snapshotItem(x).parentNode.parentNode.childNodes[2].innerHTML!='' && a.snapshotItem(x).parentNode.parentNode.childNodes[2].innerHTML.indexOf('<a href=')==-1){continue;}
   else{
     u=false;
     r=document.createElement('tr');
     d=document.createElement('td');
     d.innerHTML="<a id='r"+a.snapshotItem(x).href.split('=')[1]+"' title='recyclers' href='"+a.snapshotItem(x).href+"'>?</a>";
     r.appendChild(d);
     d=document.createElement('td');
     d.innerHTML="<a href='profile.aspx?player="+a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.href.split('=')[1]+"'>"+a.snapshotItem(x).parentNode.parentNode.childNodes[1].firstChild.innerHTML+"</a>";
     r.appendChild(d);
     c.appendChild(r);
   }
   document.getElementById('scanRcCounter').innerHTML=parseInt(document.getElementById('scanRcCounter').innerHTML)+1;
   if(getSetting('fleetScannerThrottle','30')!='0') p=parseInt((60000/parseInt(getSetting('fleetScannerThrottle','30')))*(x/2));
   getRcId(a.snapshotItem(x).href,p,u)
 }
 document.getElementById('scanAgain').checked = false;
 document.getElementById('scanAgain').parentNode.style.color='grey';
}

function getRcId(a,p,u){
 setTimeout(function(){getRcData(a,u);},p);
}

function getRcData(a,u){
 var r = new XMLHttpRequest();
 var g;
 var i=a.split('=')[1];
 if(u) i=u;
 r.open("GET",a,true);
 r.onreadystatechange=function(){
   if(r.readyState==4){
     var g=/Recycler<\/b><\/td><td align='center'>([^<]+)</.exec(r.responseText)||[0,0];
     document.getElementById('r'+i).innerHTML=(isNaN(document.getElementById('r'+i).innerHTML))?parseInt(cleanNumbers(g[1],true)):parseInt(document.getElementById('r'+i).innerHTML)+parseInt(cleanNumbers(g[1],true));
     document.getElementById('totalRCs').innerHTML=parseInt(document.getElementById('totalRCs').innerHTML)+parseInt(cleanNumbers(g[1],true));
     document.getElementById('scanRcCounter').innerHTML=parseInt(document.getElementById('scanRcCounter').innerHTML)-1;
     if(parseInt(document.getElementById('scanRcCounter').innerHTML)==0 && (document.getElementById('scanRcAuto').checked)) saveFleetScan('Rc');
   }
 }
 r.send(null);
}

function saveFleetScan(t){
 if(document.getElementById('save'+t+'ScanLink').innerHTML=='Stored') return;
 if((document.getElementById('scanFleetCounter') && document.getElementById('scanFleetCounter').innerHTML!='') || (t!='Fleet' && parseInt(document.getElementById('scan'+t+'Counter').innerHTML)!=0)){alert('Not finished counting fleets.\nTry again in 5 seconds.');return;}
 var a=document.getElementById(t.toLowerCase()+'List').childNodes,b='',c='',d='',e='',i,x=new Date().getTime();
 if(a.length==1) a=document.getElementById(t.toLowerCase()+'List').firstChild.childNodes
 if(document.getElementById('scan'+t+'Auto').checked) e='Auto%20Save';
 else e=escape(prompt('Enter a Name for this Scan',''));
 if(!e || e=='null') return;
 if(wlh.indexOf('map.aspx?loc=')==-1){
   b = wlh.split('=')[1].split('&')[0];
   c = /^(.*)<br><br><img/.exec(document.getElementById('base_resources').parentNode.parentNode.nextSibling.innerHTML)[1];
   d = document.evaluate("//a[contains(@href,'map.aspx?loc=')]",document,null,9,null).singleNodeValue.href.split('=')[1];
 }else{
   b = (document.evaluate("//a[contains(@href,'base.aspx?base=')]",document,null,9,null).singleNodeValue)?document.evaluate("//a[contains(@href,'base.aspx?base=')]",document,null,9,null).singleNodeValue.href.split('=')[1]:'';
   c = (document.evaluate("//a[contains(@href,'base.aspx?base=')]",document,null,9,null).singleNodeValue)?document.evaluate("//a[contains(@href,'base.aspx?base=')]",document,null,9,null).singleNodeValue.innerHTML:'no base';
   d = wlh.split('=')[1].split('&')[0];
 }
 if(t=='Rc'){i=3;e+='||'+document.getElementById('fleetUCrow').firstChild.id.substring(1)+'='+document.getElementById('fleetUCrow').firstChild.innerHTML;}
 else if(t=='List') i=2;
 else i=1;
 for(i;i<a.length;i++){
   if(t=='Fleet' && a.length>2 && i>a.length-10) continue;
   e+='||';
   if(t=='Rc') e+=a[i].firstChild.firstChild.href.split('=')[1]+'='+a[i].firstChild.firstChild.innerHTML+'='+a[i].lastChild.firstChild.href.split('=')[1]+'='+escape(a[i].lastChild.firstChild.innerHTML);
   else if(t=='Id') e+=a[i].lastChild.firstChild.href.split('=')[1]+'='+escape(a[i].lastChild.firstChild.innerHTML);
   else if(t=='Fleet'){
     e+=a[i].firstChild.firstChild.href.split('=')[1]+'='+escape(a[i].firstChild.firstChild.innerHTML)+'='+a[i].firstChild.lastChild.href.split('=')[1]+'='+a[i].firstChild.lastChild.innerHTML+'=';
     for(var r=1;r<a[i].childNodes.length;r++){
       e+=a[i].childNodes[r].innerHTML;
       if(r!=a[i].childNodes.length-1) e+=',';
     }
   }
   else if(t=='List'){
    e+=a[i].childNodes[1].firstChild.href.split('=')[1]+'='+escape(a[i].childNodes[1].firstChild.innerHTML)+'='+a[i].childNodes[2].firstChild.href.split('=')[1]+'='+escape(a[i].childNodes[2].firstChild.innerHTML)+'='+a[i].childNodes[3].innerHTML+'='+a[i].childNodes[4].firstChild.innerHTML;
   }
 }
 if(t!='List' || GM_getValue('alert-'+d,'|true').split('|')[1]=='true'){
   if(GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY",'')!='') GM_setValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY",GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY",'')+'||'+t+'-'+d+'-'+x);
   else GM_setValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY",t+'-'+d+'-'+x)
   GM_setValue(t+'-'+d+'-'+x,b+'||'+escape(c)+'||'+e);
   document.getElementById('save'+t+'ScanLink').innerHTML='Stored';
 }else document.getElementById('save'+t+'ScanLink').innerHTML='Not saved by Alert';
 document.getElementById('save'+t+'ScanLink').setAttribute('style','color:#FFFFFF;text-decoration:none;cursor:default;font-weight:500;font-size:11px;');
 if(t=='List' && GM_getValue('alert-'+d,'')!=''){
   a=(b+'||'+escape(c)+'||'+e).split('||');
   b=GM_getValue(GM_getValue('alert-'+d).split('|')[0]).split('||');
   a[2]=b[2];
   var a1=[],b1=[];
   for(i=3;i<a.length;i++){
     c=a[i].split('=');
     if(GM_getValue('alert-'+d).split('|')[2]!='All' && ((GM_getValue('alert-'+d).split('|')[2]=='Ignore My Fleet' && c[2]==document.getElementById('account').nextSibling.innerHTML.split('.')[1]) || unescape(GM_getValue('alert-'+d).split('|')[2]).split(' ')[1].split(']')[0]==unescape(c[3]).split(']')[0])) continue;
     if(c[4]!='') c[4]='t';
     if(c[5]!=undefined) c[5]=c[5].replace(/[^\d]/g,'');
     a[i]=c.join('=');
     a1.push(a[i]);
   }
   for(i=3;i<b.length;i++){
     c=b[i].split('=');
     if(GM_getValue('alert-'+d).split('|')[2]!='All' && ((GM_getValue('alert-'+d).split('|')[2]=='Ignore My Fleet' && c[2]==document.getElementById('account').nextSibling.innerHTML.split('.')[1]) || unescape(GM_getValue('alert-'+d).split('|')[2]).split(' ')[1].split(']')[0]==unescape(c[3]).split(']')[0])) continue;
     if(c[4]!='') c[4]='t';
     if(c[5]!=undefined) c[5]=c[5].replace(/[^\d]/g,'');
     b[i]=c.join('=');
     b1.push(b[i]);
   }
   if(a1.join('||')!=b1.join('||')) alert('FLEET SCANNER ALERT\n\nFleets have changed @ '+d);
 }
 if(document.getElementById('scan'+t+'Auto').checked) autoScanFleet(t,true,d);
}

function showHistory(o){
 var s = (o)?o.split('_')[1]:undefined;
 if(s) o=undefined;
 if(o && GM_getValue('alert-'+o.split('-')[1],'').split('|')[0]==o){alert('An alert is tied to this scan. You must remove the alert before deleting this scan.');return;}
 if(o && !confirm('Are you sure?\nDo you want to delete scan at '+'\non\n'+new Date(parseInt(o.split('-')[2])).toLocaleString())) return;
 if(document.getElementById('idList')) document.getElementById('idList').style.display='none';
 if(document.getElementById('listList')) document.getElementById('listList').style.display='none';
 if(document.getElementById('fleetList')) document.getElementById('fleetList').style.display='none';
 if(document.getElementById('rcList')) document.getElementById('rcList').style.display='none';
 if(document.getElementById('scanHelpTable')) document.body.removeChild(document.getElementById('scanHelpTable'));
 if(document.getElementById('alertList')) document.body.removeChild(document.getElementById('alertList'));
 if(document.getElementById('historyList')) document.body.removeChild(document.getElementById('historyList'));
 GM_addStyle('#historyList TH,#historyList TD {text-align:center;}');
 var c = document.createElement('table');
 document.body.appendChild(c);
 c.setAttribute('id','historyList');
 c.setAttribute('style','font:500 12px arial;margin:10px 0;display:table;clear:both;');
 c.setAttribute('cellpadding','8');
 c.appendChild(document.createElement('tr'));
 c.firstChild.appendChild(document.createElement('th'));
 c.firstChild.firstChild.setAttribute('colspan','8');
 c.firstChild.firstChild.innerHTML='<h3><a href="javascript:void(1);" style="float:right;font-weight:500;font-size:11px;" onClick="document.body.removeChild(this.parentNode.parentNode.parentNode.parentNode)">&nbsp;Close</a>Astro empires \'Fleet Scanner\' - <span style="color:#8099FF;">Saved Scans</span></h3>';
 if(GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY",'')!=''){
   var a = GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY",'').split('||'),b=[],h='';
   c.appendChild(document.createElement('tr'));
   c.lastChild.innerHTML='<th>Name</th><th>Type</th><th>Date &amp; Time</th><th>Location</th><th>Base</th><th># Fleets /<br>Players</th><th>Review</th><th>Erase</th>';
   for(var x in a){
     if(o && a[x]==o) GM_deleteValue(o);
     else if((s && a[x]!=s) || GM_getValue(a[x],'')=='') continue;
     else{
       b=GM_getValue(a[x],'').split('||');
       c.appendChild(document.createElement('tr'));
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.firstChild.innerHTML=unescape(b[2]);
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.innerHTML=a[x].split('-')[0];
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.innerHTML=new Date(parseInt(a[x].split('-')[2])).toLocaleString();
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.innerHTML='<a href="map.aspx?loc='+a[x].split('-')[1]+'">'+a[x].split('-')[1]+'</a>';
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.innerHTML=(b[0]=='')?unescape(b[1]):'<a href="base.aspx?base='+b[0]+'">'+unescape(b[1])+'</a>';
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.innerHTML=(a[x].split('-')[0]=='Rc' && b[3].split('=')[1]=='0')?b.length-4:b.length-3;
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.innerHTML='<a href="javascript:void(1);" id="s_'+a[x]+'">SHOW</a>';
       if(!s) c.lastChild.lastChild.firstChild.addEventListener('click',function(){showHistory(this.id);},false);
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.innerHTML='<a href="javascript:void(1);" id="'+a[x]+'">delete</a>';
       c.lastChild.lastChild.firstChild.addEventListener('click',function(){showHistory(this.id);},false);
       if(o){
         if(h=='') h=a[x];
         else h+='||'+a[x];
       }
     }
   }
   if(s) reviewHistory(s);
   if(o){
     if(document.getElementById(o.split('-')[2]+'historyReview')) document.body.removeChild(document.getElementById(o.split('-')[2]+'historyReview'));
     if(h==''){
       GM_deleteValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY");
       showHistory();
     }
     else GM_setValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY",h)
   }
 }else{
   c.appendChild(document.createElement('tr'));
   c.lastChild.appendChild(document.createElement('th'));
   c.lastChild.firstChild.setAttribute('colspan','8');
   c.lastChild.firstChild.innerHTML='<span style="color:#FF9980;">No Saved Scans</span>';
 }
}

function reviewHistory(o){
 if(document.getElementById(o.split('-')[2]+'historyReview')) document.body.removeChild(document.getElementById(o.split('-')[2]+'historyReview'));
 var a = GM_getValue(o,'').split('||');

/**** ADD NAME & TIME to TABLE ****/

 var c = document.createElement('table'),x;
 c.setAttribute('id',o.split('-')[2]+'historyReview');
 c.setAttribute("style","margin:10px 0;float:left;");
 c.appendChild(document.createElement('tr'));
 c.firstChild.appendChild(document.createElement('th'));
 if(o.split('-')[0]=='Rc' || o.split('-')[0]=='Id' || o.split('-')[0]=='List'){
   c.cellSpacing="1";
   c.cellPadding="5";
   if(o.split('-')[0]=='List') c.firstChild.firstChild.setAttribute('colspan','5');
   if(o.split('-')[0]=='Rc') c.firstChild.firstChild.setAttribute('colspan','2');
   else c.firstChild.firstChild.setAttribute('colspan','3');
   if(o.split('-')[0]=='Rc') c.firstChild.firstChild.innerHTML='Recylers List';
   else if(o.split('-')[0]=='Id') c.firstChild.firstChild.innerHTML='Players List - <span id="'+o.split('-')[2]+'playerCount">0</span>';
   else if(o.split('-')[0]=='List'){
     c.firstChild.firstChild.setAttribute('style','text-align:center;padding:6px;');
     c.firstChild.firstChild.innerHTML="Fleets List - <span id='"+o.split('-')[2]+"fleetCount'>0</span>";
   }
 }else if(o.split('-')[0]=='Fleet'){
   c.setAttribute('style','margin:10px 0;min-width:75%;clear:both;');
   c.firstChild.firstChild.setAttribute('style','padding:20px 4px 4px;border:1px solid #006;min-width:100px;');
   c.firstChild.firstChild.innerHTML="Player - Fleet<br><br>";
   for(x in {'Fighters':1,'Bombers':2,'Heavy Bombers':3,'Ion Bombers':4,'Corvette':5,'Recycler':6,'Destroyer':7,'Frigate':8,'Ion Frigate':9,'Scout Ship':10,'Outpost Ship':11,'Cruiser':12,'Carrier':13,'Heavy Cruiser':14,'Battleship':15,'Fleet Carrier':16,'Dreadnought':17,'Titan':18,'Leviathan':19,'Death Star':20}){
     c.firstChild.appendChild(document.createElement('th'));
     c.firstChild.lastChild.setAttribute('style','font:500 10px arial;line-height:10px;text-transform:uppercase;padding:4px;border:1px solid #006;vertical-align:bottom;');
     for(var i=0;i<x.split('').length;i++){c.firstChild.lastChild.innerHTML+=x.split('')[i]+'<br>'}
   }
 }
 c.firstChild.firstChild.innerHTML+=' - <a href="javascript:void(1);" id="'+o.split('-')[2]+'historyListClose" style="font-weight:500;font-size:11px;">Close</a>';
 document.body.appendChild(c);
 if(o.split('-')[0]=='Rc'){
   c.appendChild(document.createElement('tr'));
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.firstChild.innerHTML=a[3].split('=')[1];
   c.lastChild.firstChild.id=o.split('-')[2]+"totalRc";
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.lastChild.innerHTML="Total RCs Counted";
   if(a[3].split('=')[1]!='0'){
     c.appendChild(document.createElement('tr'));
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.firstChild.innerHTML=a[3].split('=')[1];
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML="<a href='profile.aspx?player="+a[3].split('=')[0]+"'>United Colonies</a>";
   }
   for(x=4;x<a.length;x++){
     c.appendChild(document.createElement('tr'));
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.firstChild.innerHTML="<a href='fleet.aspx?fleet="+a[x].split('=')[0]+"'>"+a[x].split('=')[1]+"</a>";
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML="<a href='profile.aspx?player="+a[x].split('=')[2]+"'>"+unescape(a[x].split('=')[3])+"</a>";
     document.getElementById(o.split('-')[2]+'totalRc').innerHTML=parseInt(document.getElementById(o.split('-')[2]+'totalRc').innerHTML)+parseInt(a[x].split('=')[1]);
   }
 }
 else if(o.split('-')[0]=='Id'){
   for(x=3;x<a.length;x++){
     c.appendChild(document.createElement('tr'));
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.firstChild.innerHTML="<a href='messages.aspx?msg="+a[x].split('=')[0]+"'>"+a[x].split('=')[0]+"</a>";
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML="&bull;";
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML="<a href='profile.aspx?player="+a[x].split('=')[0]+"'>"+unescape(a[x].split('=')[1])+"</a>";
     document.getElementById(o.split('-')[2]+'playerCount').innerHTML=parseInt(document.getElementById(o.split('-')[2]+'playerCount').innerHTML)+1;
   }
 }
 else if(o.split('-')[0]=='Fleet'){
   for(x=3;x<a.length;x++){
     c.appendChild(document.createElement('tr'));
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;');
     c.lastChild.firstChild.innerHTML="<a href='profile.aspx?player="+a[x].split('=')[0]+"'>"+unescape(a[x].split('=')[1])+"</a> - <a href='fleet.aspx?fleet="+a[x].split('=')[2]+"'>"+a[x].split('=')[3]+"</a>";
     for(var r=0;r<20;r++){
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;');
       c.lastChild.lastChild.innerHTML=a[x].split('=')[4].split(',')[r];
     }
   }
   if(a.length>4){
     c.appendChild(document.createElement('tr'));
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.firstChild.setAttribute('style','line-height:2px;font-size:1px;');
     c.lastChild.firstChild.setAttribute('colspan','21');
     c.lastChild.firstChild.innerHTML='&nbsp;';
     c.appendChild(document.createElement('tr'));
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;text-align:right;');
     c.lastChild.firstChild.innerHTML='Totals:';
     for(x=1;x<21;x++){
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;');
     }
     for(x=3;x<a.length;x++){
       for(var r=0;r<20;r++){
         c.lastChild.childNodes[r+1].innerHTML=Math.round((isNaN(parseFloat(c.lastChild.childNodes[r+1].innerHTML))?(isNaN(parseFloat(a[x].split('=')[4].split(',')[r]))?'':parseFloat(a[x].split('=')[4].split(',')[r])):parseFloat(c.lastChild.childNodes[r+1].innerHTML)+(isNaN(parseFloat(a[x].split('=')[4].split(',')[r]))?0:parseFloat(a[x].split('=')[4].split(',')[r])))*100)/100;
         if(c.lastChild.childNodes[r+1].innerHTML=='0') c.lastChild.childNodes[r+1].innerHTML='';
       }
     }
     c.appendChild(document.createElement('tr'));
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.firstChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;text-align:right;');
     c.lastChild.firstChild.innerHTML='<span id="scanNumberH">'+(a.length-3)+'</span> fleets -- avg. / fleet:';
     for(x=1;x<21;x++){
       c.lastChild.appendChild(document.createElement('td'));
       c.lastChild.lastChild.setAttribute('style','padding:4px;border:1px solid #006;font-size:.65em;');
       c.lastChild.lastChild.innerHTML=isNaN(parseFloat(c.lastChild.previousSibling.childNodes[x].innerHTML))?'':Math.round(parseFloat(c.lastChild.previousSibling.childNodes[x].innerHTML)/(a.length-3));
     }
   }
 }
 else if(o.split('-')[0]=='List'){
   c.appendChild(document.createElement('tr'));
   c.lastChild.appendChild(document.createElement('th'));
   c.lastChild.lastChild.innerHTML='Fleet ID';
   c.lastChild.appendChild(document.createElement('th'));
   c.lastChild.lastChild.innerHTML='Fleet Name';
   c.lastChild.appendChild(document.createElement('th'));
   c.lastChild.lastChild.innerHTML='Player';
   c.lastChild.appendChild(document.createElement('th'));
   c.lastChild.lastChild.innerHTML='Arrival';
   c.lastChild.appendChild(document.createElement('th'));
   c.lastChild.lastChild.innerHTML='Size';
   for(x=3;x<a.length;x++){
     c.appendChild(document.createElement('tr'));
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML="<a href='fleet.aspx?fleet="+a[x].split('=')[0]+"'>"+a[x].split('=')[0]+"</a>";
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('align','center');;
     c.lastChild.lastChild.innerHTML="<a href='fleet.aspx?fleet="+a[x].split('=')[0]+"'>"+unescape(a[x].split('=')[1])+"</a>";
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('align','center');;
     c.lastChild.lastChild.innerHTML="<a href='profile.aspx?player="+a[x].split('=')[2]+"'>"+unescape(a[x].split('=')[3])+"</a>";
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('align','center');;
     c.lastChild.lastChild.innerHTML=a[x].split('=')[4];
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.setAttribute('align','right');;
     c.lastChild.lastChild.innerHTML="<a href='fleet.aspx?fleet="+a[x].split('=')[0]+"'>"+a[x].split('=')[5]+"</a>";
   }
 }
 document.getElementById(o.split('-')[2]+'historyListClose').addEventListener('click',function(){document.body.removeChild(this.parentNode.parentNode.parentNode);showHistory();},false);
}

function fleetAlerts(o){
 if(o && !confirm('Are you sure you want to delete this alert?\n\nName: '+unescape(GM_getValue(GM_getValue('alert-'+o).split('|')[0]).split('||')[2])+'\n@: '+o)) return;
 if(document.getElementById('idList')) document.getElementById('idList').style.display='none';
 if(document.getElementById('listList')) document.getElementById('listList').style.display='none';
 if(document.getElementById('fleetList')) document.getElementById('fleetList').style.display='none';
 if(document.getElementById('rcList')) document.getElementById('rcList').style.display='none';
 if(document.getElementById('scanHelpTable')) document.body.removeChild(document.getElementById('scanHelpTable'));
 if(document.getElementById('historyList')) document.body.removeChild(document.getElementById('historyList'));
 if(document.getElementById('alertList')) document.body.removeChild(document.getElementById('alertList'));
 GM_addStyle('#alertList TH,#alertList TD {text-align:center;}');
 var c = document.createElement('table');
 document.body.appendChild(c);
 c.setAttribute('id','alertList');
 c.setAttribute('style','font:500 12px arial;margin:10px 0;clear:both;min-width:450px;');
 c.setAttribute('cellpadding','8');
 c.appendChild(document.createElement('tr'));
 c.firstChild.appendChild(document.createElement('th'));
 c.firstChild.firstChild.setAttribute('colspan','6');
 c.firstChild.firstChild.innerHTML='<h3><a href="javascript:void(1);" style="float:right;font-weight:500;font-size:11px;" onClick="document.body.removeChild(this.parentNode.parentNode.parentNode.parentNode)">&nbsp;Close</a>Astro empires \'Fleet Scanner\' - <span style="color:#8099FF;">Alerts</span></h3>';
 c.appendChild(document.createElement('tr'));
 c.lastChild.appendChild(document.createElement('td'));
 c.lastChild.firstChild.setAttribute('colspan','6');
 c.lastChild.firstChild.innerHTML='<div align=center><a href="javascript:void(1);" id="createFleetAlert">Create New Alert</a></div>';
 if(GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_ALERT_LIST",'')!=''){
   c.appendChild(document.createElement('tr'));
   c.lastChild.innerHTML="<th>Name</th><th>Location</th><th>Base</th><th>Save</th><th>Type</th><th>Erase</th>";
   var a=GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_ALERT_LIST").split('|'),h='';
   for(var i=0;i<a.length;i++){
     if(o && a[i]==o){GM_deleteValue('alert-'+o);continue;}
     c.appendChild(document.createElement('tr'));
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.firstChild.innerHTML=unescape(GM_getValue(GM_getValue('alert-'+a[i]).split('|')[0]).split('||')[2]);
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML="<a href='map.aspx?loc="+a[i]+"'>"+a[i]+"</a>";
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML=(GM_getValue(GM_getValue('alert-'+a[i]).split('|')[0]).split('||')[0]=='')?"no base":"<a href='base.aspx?base="+GM_getValue(GM_getValue('alert-'+a[i]).split('|')[0]).split('||')[0]+"'>"+unescape(GM_getValue(GM_getValue('alert-'+a[i]).split('|')[0]).split('||')[1])+"</a>";
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML=GM_getValue('alert-'+a[i]).split('|')[1];
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML=unescape(GM_getValue('alert-'+a[i]).split('|')[2]);
     c.lastChild.appendChild(document.createElement('td'));
     c.lastChild.lastChild.innerHTML="<a href='javascript:void(1);' id='"+a[i]+"'>Delete</a>";
     c.lastChild.lastChild.firstChild.addEventListener('click',function(){fleetAlerts(this.id);},false);
     if(o){
       if(h=='') h=a[i];
       else h+='|'+a[i];
     }
   }
   if(o){
     if(h==''){
       GM_deleteValue(wlh.split('.')[0].split('/')[2]+"_FLEET_ALERT_LIST");
       fleetAlerts();
       return;
     }
     else GM_setValue(wlh.split('.')[0].split('/')[2]+"_FLEET_ALERT_LIST",h)
   }
 }
 document.getElementById('createFleetAlert').addEventListener('click',function(){createFleetAlert();},false);
}

function createFleetAlert(){
 var c = document.createElement('div');
 document.body.insertBefore(c,document.getElementById('alertList'));
 c.setAttribute('id','createFleetAlertDiv');
 c.setAttribute('style','font:500 12px arial;margin:10px 2%;clear:both;');
 c.innerHTML="Choose which 'List' scan to use as a reference.<br><br>";
 if(GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY",'')!=''){
   var a = GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_SCANNER_HISTORY",'').split('||'),b=[],i;
   for(i=0;i<a.length;i++){if(a[i].split('-')[0]=='List' && GM_getValue(a[i]).split('||')[2]!='Auto%20Save') b.push(a[i]);}
   if(b.length==0) c.innerHTML+="None available, you need to make one. <a href='javascript:void(1);' onClick='document.body.removeChild(this.parentNode)'>Close</a>";
   else{
     for(i=0;i<b.length;i++){
       c.innerHTML+="<input onchange='if(this.checked)document.getElementById(\"saveFleetAlert\").name=this.value' type='radio' name='createAlert' value='"+b[i]+"'>"+unescape(GM_getValue(b[i]).split('||')[2])+" @ "+unescape(GM_getValue(b[i]).split('||')[1])+" <a href='map.aspx?loc="+b[i].split('-')[1]+"'>"+b[i].split('-')[1]+"</a><br>";
     }
     c.innerHTML+="<br><input type='checkbox' id='saveAlertScans'>Save Each Scan&nbsp;&nbsp;<select id='typeAlertScans'><option value='All'>All Fleets<option value='Ignore My Fleet'>Ignore My Fleet<option value='Ignore a Guild'>Ignore a Guild</select>&nbsp;&nbsp;<input type='button' id='saveFleetAlert' value='- OK -'> <input type='button' id='cancelFleetAlert' style='' value='Cancel'><span id='myGuildTag' style='display:none;'></span>";
   }
 }else c.innerHTML+="None available, you need to make one. <a href='javascript:void(1);' onClick='document.body.removeChild(this.parentNode)'>Close</a>";
 document.getElementById('cancelFleetAlert').addEventListener('click',function(){document.body.removeChild(document.getElementById("createFleetAlertDiv"));},false);
 document.getElementById('saveFleetAlert').addEventListener('click',function(){saveFleetAlert(this.name);},false);
 getMyGuild();
}

function saveFleetAlert(o){
 if(o==''){alert('You must choose a scan as a reference.');return;}
 else if(GM_getValue('alert-'+o.split('-')[1],'')!=''){alert('An alert already exists for this location. To create another you must first delete the old one.');return;}
 else{
   if(document.getElementById('typeAlertScans').options[document.getElementById('typeAlertScans').selectedIndex].value=='Ignore a Guild') a=escape('Not '+prompt('Enter the guild to ignore.\n\nBrackets required, ex: [myGuild]',document.getElementById('myGuildTag').innerHTML));
   else a=document.getElementById('typeAlertScans').options[document.getElementById('typeAlertScans').selectedIndex].value;
   GM_setValue('alert-'+o.split('-')[1],o+'|'+document.getElementById('saveAlertScans').checked+'|'+a);
   if(GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_ALERT_LIST",'')!='') GM_setValue(wlh.split('.')[0].split('/')[2]+"_FLEET_ALERT_LIST",GM_getValue(wlh.split('.')[0].split('/')[2]+"_FLEET_ALERT_LIST")+'|'+o.split('-')[1]);
   else GM_setValue(wlh.split('.')[0].split('/')[2]+"_FLEET_ALERT_LIST",o.split('-')[1]);
 }
 document.body.removeChild(document.getElementById("createFleetAlertDiv"));
 fleetAlerts();
}

function getMyGuild(){
 GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://'+wlh.split('/')[2]+'/profile.aspx',
   onload: function(responseDetails){
     var g=/<big>&nbsp;<\/big><\/th><th width='34%' class='th_header2'>(\[[^\]]+\]) [^<]+<\/th>/.exec(responseDetails.responseText);
     if(g && g[1]) document.getElementById('myGuildTag').innerHTML=g[1];
   },
   headers: {'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'}
 });
}

function memoryManager(){
 if(document.getElementById('idList')) document.getElementById('idList').style.display='none';
 if(document.getElementById('listList')) document.getElementById('listList').style.display='none';
 if(document.getElementById('fleetList')) document.getElementById('fleetList').style.display='none';
 if(document.getElementById('rcList')) document.getElementById('rcList').style.display='none';
 if(document.getElementById('historyList')) document.body.removeChild(document.getElementById('historyList'));
 if(document.getElementById('alertList')) document.body.removeChild(document.getElementById('alertList'));
 if(document.getElementById('scanHelpTable')) document.body.removeChild(document.getElementById('scanHelpTable'));
 var c=document.createElement('table');
 c.setAttribute('id','scanHelpTable');
 c.setAttribute('style','font:500 12px arial;margin:10px 0;');
 c.setAttribute('cellpadding','5');
 c.appendChild(document.createElement('tr'));
 c.firstChild.appendChild(document.createElement('th'));
 c.firstChild.firstChild.setAttribute('colspan','2');
 c.firstChild.firstChild.innerHTML='<h3>Astro empires \'Fleet Scanner\' - <span style="color:#8099FF;">Memory Manager</span></h3><small style="position:relative;top:-6px;">Developed for <a href="http://astroempirestools.blogspot.com/">AET</a> by <a href="http://www.blogger.com/profile/03189692220620566557">OJD</a></small>';
 c.appendChild(document.createElement('tr'));
 c.lastChild.appendChild(document.createElement('th'));
 c.lastChild.firstChild.setAttribute('style','text-align:right;vertical-align:top;color:red;');
 c.lastChild.firstChild.innerHTML="WARNING:";
 c.lastChild.appendChild(document.createElement('td'));
 c.lastChild.lastChild.setAttribute('style','padding:5px 50px 10px 2px;');
 c.lastChild.lastChild.innerHTML="If you use the remove links on this page to delete memory items, it is possible to loose some data you may want to keep. It is recommended you use the 'Show History' and 'Alerts' sections to remove data. The remove links are provided in case of data corruption or if you want to remove everything. Although, this is a good place to remove forgotten auto scans.";
 document.body.appendChild(c);
 var a=GM_listValues(),l;
 for(var i=0;i<a.length;i++){
   if(a[i].split('-')[1]!=undefined){
     if(a[i].split('-')[1].substring(0,1)!=wlh.split('/')[2].substring(0,1).toUpperCase()) continue;
   }else if(a[i].split('_scan')[1]==undefined){
     if(a[i].split('_')[0]!=wlh.split('/')[2].split('.')[0]) continue;
     if(a[i].split('_')[1]!='FLEET') continue;
   }else{
     if(a[i].substring(0,1)!=wlh.split('/')[2].substring(0,1).toUpperCase()) continue;
   }
   l=/\w\d\d:\d\d:\d\d:\d\d/.exec(a[i]);
   c.appendChild(document.createElement('tr'));
   c.lastChild.appendChild(document.createElement('th'));
   c.lastChild.lastChild.setAttribute('style','vertical-align:top;white-space:nowrap;');
   c.lastChild.lastChild.innerHTML=((l!=null)?(a[i].split(l)[0]+"<a href='/map.aspx?loc="+l+"'>"+l+"</a>"+a[i].split(l)[1]):a[i])+"<br><a href='javascript:void(1);' id='"+a[i]+"' style='font:500 10px verdana,arial,sans-serif;'>REMOVE</a>";
   c.lastChild.lastChild.lastChild.addEventListener('click',function(){if(confirm('Are you sure?\n\nRemove memory item:\n'+this.id)){GM_deleteValue(this.id);memoryManager();}},false);
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.lastChild.innerHTML=unescape(GM_getValue(a[i]));
 }
}

function scanHelp(){
 if(document.getElementById('idList')) document.getElementById('idList').style.display='none';
 if(document.getElementById('listList')) document.getElementById('listList').style.display='none';
 if(document.getElementById('fleetList')) document.getElementById('fleetList').style.display='none';
 if(document.getElementById('rcList')) document.getElementById('rcList').style.display='none';
 if(document.getElementById('historyList')) document.body.removeChild(document.getElementById('historyList'));
 if(document.getElementById('alertList')) document.body.removeChild(document.getElementById('alertList'));
 if(document.getElementById('scanHelpTable')){document.body.removeChild(document.getElementById('scanHelpTable'));return;}
 GM_addStyle('#scanSettingsNotes{background:#000000 url("http://cdn.astroempires.com/skins/AE_Original/images/grad2.jpg") no-repeat;margin:12px 50px;border:0;}#scanSettingsNotes TH{padding-right:20px;vertical-align:top;white-space:nowrap;}');
 var c = document.createElement('table');
 c.setAttribute('id','scanHelpTable');
 c.setAttribute('style','font:500 12px arial;margin:10px 0;');
 c.setAttribute('cellpadding','5');
 c.appendChild(document.createElement('tr'));
 c.firstChild.appendChild(document.createElement('th'));
 c.firstChild.firstChild.setAttribute('colspan','2');
 c.firstChild.firstChild.innerHTML='<h3>Astro empires \'Fleet Scanner\' - <span style="color:#8099FF;">Help Section</span></h3><small style="position:relative;top:-6px;">Developed for <a href="http://astroempirestools.blogspot.com/">AET</a> by <a href="http://www.blogger.com/profile/03189692220620566557">OJD</a></small>';
 document.body.appendChild(c);
 var a = {
   'Usage':'This utility allows you to scan fleet(s) over any astro to quickly view its ship type and quantity of each. All 4 scan types, ID, RC, List and Fleet, are updated and stored seperately. This means you can update 1 data set without effecting the other. One thing to remember is that if fleets land or leave after the page loads, these changes do not take effect until you reload the page. A good practice would be to keep the page as current as possible for the scanning. When in \'Auto\' mode, the page will reload prior to each scan.<br><br>The \'?\' button will display this help section or close it if it is open.<br><br>',
   'FPM:xx button':'Fleets per Minute throttle. This controls the number of fleets scanned per minute for RC and FLEET scanning only. The ID and LIST scans make no calls to the server and they run at 100% speed. Default setting is 30 which is 1 fleet every 2 seconds. To disable the throttle, set to 0. For locations with many fleets, lower throttle numbers will keep the number of requests to the server at a less noticeable level to the server admins. For locations with few fleets, such as 1 or 2, the throttle is not needed.',
   'IDs button':'The IDs button will display a list of player IDs along with their guild and name. This can be useful in building a contact list of everyone on a location. <br><br>Note: This will not make any requests to the server.<br><br>',
   'RCs button':'The RCs button will display a list of players with fleet landed and display the number of recyclers in their fleet, if any. <br><br>Note: This will make 1 request to the server for each landed fleet during an update.<br><br>',
   'List button':'The List button will display a list of all fleets, inbound and landed, on the location. In addition, the fleet ID is shown for each fleet. The fleet ID may be passed to other players to track their movements. <br><br>Note: This will not make any requests to the server.<br><br>',
   'Fleet button':'The Fleet button will display a table of all ships for all fleets, inbound and landed, on the location. Use the filters to modify which fleet(s) are displayed. On locations with many players, you can select a single player to view their fleet against the adverages. The totals row can show you totals fleet numbers for all guilds on a location. <br><br>Note: This will make 1 request to the server for all fleet during an update.<br><br>',
   'Fleet Filters':'Fleet filters only apply to Fleet scans. They are used to filter which fleets are displayed from the scan. You may change filters and click \'Fleet\' to re-display the data as much as you want without making any more requests to the server as long as \'Re-Scan\' in NOT checked. <br><br>Note: On initial scan or ReScan, all fleets, landed or inbound, on a location will be scanned regardless of filters used. Filters only affect what is displayed, not what is scanned.<br><br>',
   'Re-Scan':'When any of the 4 scanning methods are used, in manual or auto mode, the data set is created and will not be updated by clicking the button again unless \'Re-Scan\' is checked. This will allow you to switch between scan types or filters without making calls to the server everytime while \'Re-Scan\' is NOT checked. It will un-check itself after the scan. This will allow you to do a manual scan if an auto scan of the same type is currently running. Using Re-Scan will not affect any updating or saving data of scans in auto mode.<br><br>',
   'Saving Data':'When any of the 4 scanning methods are used in manual mode, they may be saved manually by clicking the \'Save\' link on the displayed table. If you want the scan auto saved while in manual scan mode, check the auto checkbox under the button of the scan type used. Any scan in auto mode will be saved. Manual saving will ask for a name for reference. Auto saves will be named "Auto Save".<br><br>',
   'Auto mode':'For auto mode to work, the tab/window must be on the astro/base during the actual scan process. You may browser away from the page and return and the scan will resume without loosing time. If you are not on the page when the scan takes place, it will run immediately upon your return. Auto mode for any scan type is started by clicking the \'SET\' link to the left of the scan type\'s timing area. This will open the settings for that scan type. Once you have the settings as you want them, clicking the \'Apply\' button will start the auto scan. When an auto scan is started, the countdown clock will be displayed along with settings and the \'Auto\' checkbox will be checked. To cancel an auto scan, just uncheck the \'Auto\' checkbox. Once an auto scan has completed its cycle, it will turn itself off, delete the settings in memory, and return to manual mode. <br><br>Note: Best used when a location is opened in a new tab/window and only 1 auto scan type is active on that tab/window. Then just leave this tab/window alone until the scan has completed its cycle. Then you are free to do as you please in other tabs/windows and the scan will do its thing without being monitored. To use multiple scan types on the same location, they should be in the same tab/window or you will double things up as both tabs/windows will do everything on that astro/base. BUT, only 1 refresh of the page will occur if multiple scan types are runningwithin 1 minute of each other, so data may be missed if fleets change. This will ensure a page reload from one scan type will not clobber another scan type in the middle of the scanning process before it has time to save its data.<br><br>** You may run scans on different locations at the same time without affecting each other. <br><br><b>Important:</b> When an auto scan is active, you may browse away from the location and return. The scan will pick up where it left off. If a scan time has expired and you return to the page, it will scan immediately. If you set a scan and it does not complete and you have closed the tab/window or browsed away from the location, the settings will remain for that location until you return and cancel it or let it finish. This can use up memory if scans are set and forgotten about.<br><br>',
   'Auto Settings':'When first opened, default settings are set in place. Once they have been changed and while an auto scan is in progress, these will be updated automatically. If a scan is not active, default settings are returned during page reloads. <br><br>For all time settings, if the time has passed when set, it will rollover to the next minute, hour, or day as needed.<table cellpadding=4 cellspacing=0 id="scanSettingsNotes"><tr><th># of Scans:</th><td>Enter whole numbers from 1 to 9999. When 0 is reached, auto mode is cancelled. Entering -1 will allow the scan to run until it is turned off.</td></tr><tr><th>Hrs:</th><td>Server time hours. Enter whole numbers from 0 to 9999. Entering -1 will match any hour. For hours greater than 23 this can be confusing at first. 25 hours will be 1 am server time tomorrow. 24 and 0 are the same. 96 is midnight server time in 3 days plus the number of hours left today.</td></tr><tr><th>Min:</th><td>Server time minutes. Enter whole numbers from 0 to 59.</td></tr><tr><th>Sec:</th><td>Server time seconds. Enter whole numbers from 0 to 59. Entering -1 will start the scan immediately.</td></tr><tr><th>Every xx minutes.</th><td>This is the number of minutes between scans for # of scans greater than 1. Enter whole numbers from 1 to 9999. Entering -1 will run a scan once a day at the start time. (Same as entering 1440) </td></tr><tr><th>Refresh Buffer:</th><td>This sets the number of seconds before a scan to reload the page. Enter whole numbers from 1 to 59. The page needs to be reloaded in case fleet data has changed. For slow Internet connections or locations with many fleets, you may want to increase this to allow the page more time to load before the scan.</td></tr><tr><th>Apply</th><td>This will apply the settings to a new scan or a scan currently in progress. If a scan is not running, the scan will be started.</td></tr><tr><th>Cancel</th><td>This will simply close the settings. It will not start or stop a scan.</td></tr></table>Note: Settings may be changed in the middle of the scan.<br><br>',
   'Alerts':'The Alert feature will notify you when any fleet changes occur on a astro/base. This can help protect your recyclers on your pile if anything starts coming after you. Also, these can tell you when a fleet lands or leaves. May also be used on a group of fleets of the same guild, if you choose to ignore that guild, and that guild can come and go as needed without throwing the alert.<br><br>To start an alert, go to the location and create a \'List\' scan. Save this scan with a name you want for your alert. Then start a \'List\' auto scan. Now click the alerts button. Create a new alert and choose the name of the list scan you just manually saved. Now, for as long as this auto scan is running in a tab/window, it will check for any fleet changes that occur on that astro/base on each scan. If any changes are found, the alert will throw up an alert dialog box. If you are using the scan on a different tab or window than the one you are currently using when and alert is thrown, it will change focus to that tab/window.<br><br>You may start and stop alerts without affecting a scan. Also, you may start and stop a scan without affecting an alert. Just remember if fleets change and you want to resume a scan, you need to manually save a new scan and re-create an alert.<br><br>By default, scans will not be saved on a base with an alert as this could use up a lot of memory. If you want alert scans to be saved, you need to check the box marked \'Save Each Scan\' when creating the alert.<br><br>Also, you have 3 filter options when creating the alert. \'All fleets\' will check for any fleet changes. \'Ignore My Fleets\' will ignore all of your fleets but check all others. \'Ignore a Guild\' will ask you to enter a guild tag upon saving the alert. (defaults to your guild) *Brackets are required. ex: [myGuild]. This setting will ignore all fleets from the guild you entered and look at all other fleets. Any single guild may be chosen.<br><br>Note: Only works with \'List\' type scans.<br><br><b>Important:</b> If an alert is thrown, scanning is paused until the alert is cleared. So, don\'t leave an alert running if you need to be away from your computer.<br><br>',
   'Notes':'This tool can not be 100% accurate due to fleets changing status. If a fleet leaves the location, lands on the location, or starts towards the location, it is impossible for this tool to know. If a fleet leaves, you may not be able to see it and the data will be blank. Though, if a fleet leaves and the fleet number does not change and it is still visible, it will show up as landed or inbound. Depends upon the status of the fleet when the page loaded. If a fleet lands and merges with another, this will leave the landed fleet blank and add the numbers to the fleet it merged with. New fleets will not show at all. These are all things to consider while in manual mode as auto mode will reload the page before each scan. <br><br>Caution: This utility will get your account suspended from AE if used improperly. Scanning a location with 1 or 2 fleets will appear to the server as normal. 3 to 6 fleets your probably still ok, but don\'t over do it. 6 - 12 fleets you need to use caution by using sparingly. Over 25 and you should not use this more than once an hour on that location. (successfull tests on 200+ fleets)<br><br>',
   'Memory Cleanup':'All Greasmonkey scripts that save data, and/or settings, save this data in the configuration memory of the browser. Over time, this memory usage may grow beyond what was originally intended and possibly slow the browser down on all web sites. ALL Greasemonkey scripts can be prone to this challenge. Settings and/or data can get lost from bad programming or browser/system errors or updates which use different variable names. These are just some of the common causes for this memory leakage. If you are using a script which does not have a memory manager, you should encourage the author to put one in. To check what Fleet Scanner has saved or do some cleanup, view the Fleet Scanner <a href="javascript:void(1);" id="mMLink">Memory Manager</a>.<br><br>'},d,x;
 for(x in a){
   c.appendChild(document.createElement('tr'));
   c.lastChild.appendChild(document.createElement('th'));
   c.lastChild.lastChild.setAttribute('style','vertical-align:top;white-space:nowrap;');
   c.lastChild.lastChild.innerHTML=x;
   c.lastChild.appendChild(document.createElement('td'));
   c.lastChild.lastChild.innerHTML=a[x];
 }
 document.getElementById('mMLink').addEventListener('click',function(){memoryManager();},false);
}

function fleetScanner(){
 if(wlh.indexOf('?')==-1 || (wlh.split('?')[1].split(':')[1]==undefined && wlh.indexOf('map.aspx?')!=-1)) return;
 if(!getSetting('config_locationFleetScan',true)){
   var a=document.createElement('a');
   a.innerHTML="Enable Fleet Scanner";
   a.setAttribute('href','javascript:void(1);');
   a.setAttribute('id','enableLFS');
   a.setAttribute('style','margin:4px;font-size:10px;');
   document.body.appendChild(document.createElement('center'));
   document.body.lastChild.appendChild(a);
   document.body.lastChild.firstChild.addEventListener('click',function(){setSetting('config_locationFleetScan',true);document.body.removeChild(document.body.lastChild);window.setTimeout(function(){fleetScanner();},300);},false);
   return;
 }
 var a=document.evaluate("//a[contains(@href,'fleet.aspx?fleet=') and not(contains(@href,'view='))]",document,null,7,null);
 if(!a.snapshotLength) return;
 var g=[],p=[],i,l;
 for(i=0;i<a.snapshotLength;i++){
  if(a.snapshotItem(i).parentNode.parentNode.childNodes[1].firstChild.innerHTML.indexOf('[')==0) g[a.snapshotItem(i).parentNode.parentNode.childNodes[1].firstChild.innerHTML.substring(a.snapshotItem(i).parentNode.parentNode.childNodes[1].firstChild.innerHTML.indexOf('[')+1,a.snapshotItem(i).parentNode.parentNode.childNodes[1].firstChild.innerHTML.indexOf(']'))]=1;
  p[a.snapshotItem(i).parentNode.parentNode.childNodes[1].firstChild.innerHTML]=1;
 }
 if(wlh.indexOf('map.aspx?loc=')==-1) l = document.evaluate("//a[contains(@href,'map.aspx?loc=')]",document,null,9,null).singleNodeValue.href.split('=')[1];
 else l = wlh.split('=')[1].split('&')[0];
 GM_addStyle("#fleetScanner{margin:0;display:block;min-width:908px;}#fleetScanner TH{padding:5px;font:900 12px verdana,tahoma,arial,sans-serif;white-space:nowrap;}#fleetScanner TD{padding:5px;font:500 11px verdana,tahoma,arial,sans-serif;white-space:nowrap;text-align:center;color:grey;}");
 document.body.appendChild(document.createElement('table'));
 document.body.lastChild.setAttribute('id','fleetScanner');
 var b="<tr><th rowspan=2><h3>Astro empires 'Fleet Scanner'</h3><small style='position:relative;top:-6px;'>Developed for <a href='http://astroempirestools.blogspot.com/'>AET</a> by <a href='http://www.blogger.com/profile/03189692220620566557'>OJD</a></small></th>"+
   "<td style='text-align:right;'><label for='scanAgain'>Re-Scan:<input style='margin:0;' type='checkbox' id='scanAgain' onChange=\"this.parentNode.style.color=(this.checked)?'white':'grey';\"></label></td><td style='text-align:center;'><input type='button' id='scanId' value='IDs' style='cursor:pointer;'></td><td style='text-align:center;'><input type='button' id='scanRc' value='RCs' style='cursor:pointer;'></td><td style='text-align:center;'><input type='button' id='scanList' value='List' style='cursor:pointer;'></td><td style='text-align:center;'><input type='button' id='scanFleet' value='Fleet' style='cursor:pointer;'></td><td rowspan=2 style='padding-right:0;text-align:right;'>Fleet&nbsp;|<br>Scan&nbsp;|<br>Filters|</td><td style='text-align:left;vertical-align:bottom;padding-left:3px;padding-bottom:2px;'><select id='scanShips'><option value='all'>All Ships<option value='rc'>RC only<option value='ft'>1 mil+ FTs<option value='cap'>Capitols<option value='crhcbs'>CR + HC + BS<option value='mil'>1 mil +<option value='10mil'>10 mil +<option value='20mil'>20 mil +<option value='30mil'>30 mil +</select><select id='scanGuild' style='margin-left:5px;'><option value='all'>All Guilds";
 for(i in g){b+="<option value='"+escape(i)+"'>["+i+"]";}
   b+="<option value=''>no guild</select></td><td><input type='button' id='showHistory' value='Show History' style='cursor:pointer;'></td></tr>"+
   "<tr><td><input type='button' style='cursor:pointer;' id='fleetScannerThrottle' value='FPM:"+getSetting('fleetScannerThrottle','30')+"'></td><td><label for='scanIdAuto'>Auto:<input style='margin:0;' type='checkbox' id='scanIdAuto'></label></td><td><label for='scanRcAuto'>Auto:<input style='margin:0;' type='checkbox' id='scanRcAuto'></label></td><td><label for='scanListAuto'>Auto:<input style='margin:0;' type='checkbox' id='scanListAuto'></label></td><td><label for='scanFleetAuto'>Auto:<input style='margin:0;' type='checkbox' id='scanFleetAuto'></label></td><td style='text-align:left;vertical-align:top;padding-left:3px;padding-top:2px;'><select id='scanLanded'><option value='all'>All<option value='land'>Landed<option value='fly'>Inbound</select><select id='scanPlayer' style='margin-left:5px;'><option value='all'>All Players";
 for(i in p){b+="<option value='"+escape(i)+"'>"+i;}
   b+="</select></td><td><input style='cursor:pointer;' type='button' id='fleetAlerts' value='Alerts'><input type='button' value='?' id='scanHelp' style='cursor:pointer;margin-left:12px;'></td></tr>";
 document.body.lastChild.innerHTML=b;
 document.getElementById('scanHelp').addEventListener('click',function(){scanHelp();},true);
 document.getElementById('scanId').addEventListener('click',function(){scanId(a);},true);
 document.getElementById('scanRc').addEventListener('click',function(){scanRc(a);},true);
 document.getElementById('scanList').addEventListener('click',function(){scanList(a);},true);
 document.getElementById('scanFleet').addEventListener('click',function(){scanFleet(a);},true);
 document.getElementById('showHistory').addEventListener('click',function(){showHistory();},false);
 document.getElementById('fleetAlerts').addEventListener('click',function(){fleetAlerts();},false);
 document.getElementById('fleetScannerThrottle').addEventListener('click',function(){var t=prompt('Scanner Throttle for fleet and rc scans.\n\nEnter the number of fleets per minute to scan.\n0 = no throttle\n1 = 1 per minute\n60 = 1 per second',this.value.split('FPM:')[1]);if(!t) return;t=parseInt(cleanNumbers(t));if(isNaN(t) || t=='' || t<1) t=0;this.value='FPM:'+t;setSetting('fleetScannerThrottle',t)},false);
 document.body.appendChild(document.createElement('div'));
 document.body.lastChild.setAttribute('id','scanIdTimeStamp');
 document.body.lastChild.setAttribute('style','font-size:1px;line-height:1px;visibility:hidden;float:left;');
 document.body.lastChild.innerHTML=parseInt(new Date().getTime()/1000);
 document.body.appendChild(document.createElement('div'));
 document.body.lastChild.setAttribute('id','scanRcTimeStamp');
 document.body.lastChild.setAttribute('style','font-size:1px;line-height:1px;visibility:hidden;float:left;');
 document.body.lastChild.innerHTML=parseInt(new Date().getTime()/1000);
 document.body.appendChild(document.createElement('div'));
 document.body.lastChild.setAttribute('id','scanListTimeStamp');
 document.body.lastChild.setAttribute('style','font-size:1px;line-height:1px;visibility:hidden;float:left;');
 document.body.lastChild.innerHTML=parseInt(new Date().getTime()/1000);
 document.body.appendChild(document.createElement('div'));
 document.body.lastChild.setAttribute('id','scanFleetTimeStamp');
 document.body.lastChild.setAttribute('style','font-size:1px;line-height:1px;visibility:hidden;float:left;');
 document.body.lastChild.innerHTML=parseInt(new Date().getTime()/1000);
 document.body.appendChild(document.createElement('div'));
 document.body.lastChild.setAttribute('style','border:1px dotted grey;border-top:0;color:grey;background:#000000 none;font:500 11px verdana,tahoma,arial,sans-serif;margin:-1 2%;min-width:878px;');
 document.body.lastChild.innerHTML="<div id='scanIdTime' style='width:24%;padding:1px;text-align:center;display:inline-block;'><a href='javascript:void(1);' style='float:left;background-image:url(\"http://cdn.astroempires.com/skins/AE_Original/images/grad2.jpg\");padding:1px 3px;font:900 10px verdana,tahoma,arial,sans-serif;position:relative;left:8%;' name='Id'>SET &raquo;</a><span>Id: manual</span></div><div id='scanRcTime' style='width:24%;padding:1px;text-align:center;display:inline-block;'><a href='javascript:void(1);' style='float:left;background-image:url(\"http://cdn.astroempires.com/skins/AE_Original/images/grad2.jpg\");padding:1px 3px;font:900 10px verdana,tahoma,arial,sans-serif;position:relative;left:8%;margin-left:2px;' name='Rc'>SET &raquo;</a><span>Rc: manual</span></div><div id='scanListTime' style='width:24%;padding:1px;text-align:center;display:inline-block;'><a href='javascript:void(1);' style='float:left;background-image:url(\"http://cdn.astroempires.com/skins/AE_Original/images/grad2.jpg\");padding:1px 3px;font:900 10px verdana,tahoma,arial,sans-serif;position:relative;left:8%;margin-left:5px;' name='List'>SET &raquo;</a><span>List: manual</span></div><div id='scanFleetTime' style='width:24%;padding:1px;text-align:center;display:inline-block;'><a href='javascript:void(1);' style='float:left;background-image:url(\"http://cdn.astroempires.com/skins/AE_Original/images/grad2.jpg\");padding:1px 3px;font:900 10px verdana,tahoma,arial,sans-serif;position:relative;left:8%;margin-left:7px;' name='Fleet'>SET &raquo;</a><span>Fleet: manual</span></div>";
 document.body.appendChild(document.createElement('div'));
 document.body.lastChild.setAttribute('style','color:grey;font:500 11px verdana,tahoma,arial,sans-serif;margin:-1 2%;min-width:878px;');
 document.body.lastChild.innerHTML="<div id='scanIdIncrement' style='width:22%;padding:1px;text-align:center;display:inline-block;visibility:hidden;margin:0 1%;border:1px dotted grey;border-top:0;background:#000000 none;'><span style='float:left;'>To Go:<span id='scanIdNum'>1</span></span> <span style='float:right;'>I:<span id='scanIdInc'>60</span>, R:<span id='scanIdRef'>6</span></span><span id='scanIdHrs'>xx</span>:<span id='scanIdMin'>00</span>:<span id='scanIdSec'>00</span> </div><div id='scanRcIncrement' style='width:22%;padding:1px;text-align:center;display:inline-block;visibility:hidden;margin:0 1%;border:1px dotted grey;border-top:0;background:#000000 none;'><span style='float:left;'>To Go:<span id='scanRcNum'>1</span></span> <span style='float:right;'>I:<span id='scanRcInc'>60</span>, R:<span id='scanRcRef'>6</span></span><span id='scanRcHrs'>xx</span>:<span id='scanRcMin'>29</span>:<span id='scanRcSec'>57</span> </div><div id='scanListIncrement' style='width:22%;padding:1px;text-align:center;display:inline-block;visibility:hidden;margin:0 1%;border:1px dotted grey;border-top:0;background:#000000 none;'><span style='float:left;'>To Go:<span id='scanListNum'>6</span></span> <span style='float:right;'>I:<span id='scanListInc'>10</span>, R:<span id='scanListRef'>6</span></span><span id='scanListHrs'></span>:<span id='scanListMin'></span>:<span id='scanListSec'>Now</span> </div><div id='scanFleetIncrement' style='width:22%;padding:1px;text-align:center;display:inline-block;visibility:hidden;margin:0 1%;border:1px dotted grey;border-top:0;background:#000000 none;'><span style='float:left;'>To Go:<span id='scanFleetNum'>1</span></span> <span style='float:right;'>I:<span id='scanFleetInc'>60</span>, R:<span id='scanFleetRef'>6</span></span><span id='scanFleetHrs'>xx</span>:<span id='scanFleetMin'>00</span>:<span id='scanFleetSec'>00</span> </div>";
 document.body.appendChild(document.createElement('table'));
 document.body.lastChild.setAttribute('style','margin:8px auto;min-width:878px;border:0;display:none;');
 document.body.lastChild.setAttribute('id','scanSettings');
 document.body.style.paddingBottom='50px';
 for(o in {'Id':0,'Rc':0,'List':0,'Fleet':0}){
  document.getElementById('scan'+o+'Time').firstChild.addEventListener('click',function(){setIncremental(this.name,l)},false);
  if(GM_getValue(l+'_scan'+o+'Auto',false)!=false){
   document.getElementById('scan'+o+'Auto').checked=(parseInt(document.getElementById('scan'+o+'Num').innerHTML)==0)?false:true;
   g=GM_getValue(l+'_scan'+o+'Auto').split('|');
   document.getElementById('scan'+o+'Num').innerHTML=g[0];
   document.getElementById('scan'+o+'Hrs').innerHTML=g[1];
   document.getElementById('scan'+o+'Min').innerHTML=g[2];
   document.getElementById('scan'+o+'Sec').innerHTML=g[3];
   document.getElementById('scan'+o+'Inc').innerHTML=g[4];
   document.getElementById('scan'+o+'Ref').innerHTML=g[5];
  }
  autoScanFleet(o,false,l);
 }
}

/**********************
 Configuration Page
**********************/
function insertConfigLink(){
 var l = document.evaluate("//a[contains(@href,'session=logout')]",document,null,9,null).singleNodeValue;
 if(!l) return;
 var a = document.createElement("a");
 a.setAttribute("href",'javascript:void(1);');
 a.innerHTML = "AE Tools";
 a.setAttribute('id','aetConfig');
 l.parentNode.insertBefore(a,l);
 a=document.createTextNode(' - ');
 l.parentNode.insertBefore(a,l);
 if(document.getElementById('aetConfig')) document.getElementById('aetConfig').addEventListener('click',function(){showAETConfig();},false);
 window.setTimeout(function(){if(document.getElementById('aetConfig')) document.getElementById('aetConfig').addEventListener('click',function(){showAETConfig();},false)},2000);
 window.setTimeout(function(){if(document.getElementById('aetConfig')) document.getElementById('aetConfig').addEventListener('click',function(){showAETConfig();},false)},4000);
}

function showAETConfig(){
 if(document.getElementById('newAdditions')) return;
 if(unsafeWindow.q) unsafeWindow.q=0;
 var s='OCT-09-2010 / v:4.3.3';
 var b=['none','hidden','dotted','dashed','solid','double','groove','ridge','inset','outset'];
 GM_addStyle('TD.tabs{width:20%;padding:0 3px;}TD.tabs DIV{padding:0 3px;text-align:center;border:1px solid #888;padding:2px 0 4px 0;position:relative;top:3px;white-space:nowrap;color:gold;font-weight:900;}TD.act DIV{color:#FFE;border-width:2px;border-bottom:0;background-color:#339;}TD.tabs DIV:hover{text-decoration:underline;cursor:pointer;}TD.act DIV:hover{text-decoration:none;cursor:default;}.configTable{border:0;background:transparent none;}.configTable TD{vertical-align:top;}.configHeading {color:gold;font-weight:bold;}.featureName{color:#EEDC82;white-space:nowrap;}.subFeatureName{color:#8B814C;padding-left:20px;white-space:nowrap;}.footnote{color:gold;font-weight:bold;}#saveButton{padding:8px 12px;cursor:pointer;}#saveButton2{padding:3px 5px;cursor:pointer;}');
 var newBody="<div align='center' style='margin:0 6%;'><h1>Astro Empires Tools</h1><small style='position:relative;top:-7px;'>Script Version: "+s+"<a href='javascript:void(1);' style='position:relative;left:20px;' id='newAdditions'>Whats New</a></small>"+
   "<br>Listed on <a href='http://userscripts.org/scripts/show/56388' target='_blank'>Userscripts</a> -- <a href='javascript:void(1);' id='updateAET'>Check for Updates</a> -- <a href='javascript:window.location.reload();'>Return to AE</a><p><a href='#author'>Questions, comments and requests.</a><br>Supported 100% by donations. Help keep AET going ... <a href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7880871&page_style=AET'><img border='0' align='absmiddle' src='https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif'></a></p><div style='background:#000000 none;border:1px dotted #FF6464;padding:6px;font:500 11px verdana,tahoma,arial,sans-serif;margin:2px 0 14px 0;display:inline-block;'>For all functions to work properly, you need to make sure your <a href='/account.aspx?view=display#account_display'>AE display settings</a> are as follows...<br><b>Display Width</b> set to '1000' for max width -- <b>Skin</b> must be set to 'AE Original'</div>"+
   "<fieldset style='margin:0 50px 0 50px;padding:3px 12px 6px 12px;border:1px solid #686868;border-bottom:0;'><legend style='color:#FFFFDF;font-size:14px;margin:0 0 0 5px;padding:0 5px;'>Settings - <a href='http://astroempirestools.blogspot.com/2009/08/options.html' style='font-size:10px;position:relative;top:-2px;' target='help'>HELP</a></legend>"+
   "<table style='z-index:1;position:relative;border:0;border-bottom:2px solid #000;background-image:none;margin:0;width:100%;'><tr><td class='tabs act' id='0_tab'><div>General</div></td><td class='tabs' id='1_tab'><div>Players / Trade</div></td><td class='tabs' id='2_tab'><div>Fleet / Movement</div></td><td class='tabs' id='3_tab'><div>Construction / Production</div></td><td class='tabs' id='4_tab'><div>Map / Attack / Misc.</div></td></tr></table>"+
   "</fieldset><table style='margin-top:-8px;'>"+
   "<tr height='40'><th width='200' style='border:0;'>Feature</th><th style='border:0;'>Description</th><th style='border:0;'>Applied to page(s)</th></tr>"+
   "<tr><td colspan=3><table id='0_table' cellpadding=3 class='configTable'>"+
   "<tr><td colspan=5 class='configHeading'>General -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancgeneral' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_adjustTitles'></td><td class='featureName'>Adjust Page Titles</td><td>Shortens page titles for better viewing with multiple tabs. Prefixes page titles with server.</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td><input type='checkbox' id='config_addLocalTime'></td><td class='featureName'>Add Local Time</td><td>Places your local time next to Server Time. Adds a link to switch between original static load times or active clocks.</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_timezoneOffset'> Timezone Offset</td><td>Displays local to server time offset in hour(s).</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_clockOffset'> Clock Offset</td><td>Displays local to server clock offset in minute(s) and/or second(s).</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td><input type='checkbox' id='config_addEmpireSubmenu'></td><td class='featureName'>Add empire sub-menu</td><td>Inserts the empire sub menu on all pages.</td><td style='padding-left:20'>All except fleet movement</td></tr>"+
   "<tr><td><input type='checkbox' id='config_hideNoOccs'></td><td class='featureName'>Hide Empty Occupations</td><td>Hide Occupations list if you don't have any Occupations.</td><td style='padding-left:20'>Economy</td></tr>"+
   "<tr><td><input type='checkbox' id='config_formatNumbers'></td><td class='featureName'>Format numbers</td><td>Formats fleet size numbers for better readability. If numbers don't add up correctly, set AE display 'Numbers Format' to '1000.01' and alert us.</td><td style='padding-left:20'>most pages</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'>Delimeter: <select id='config_numberDelimeter'><option value=','>,<option value=' '>(space)<option value='.'>.<option value=''>not used</select></td><td rowspan=2>These two settings should be set to the same values as the AE Display Settings so all numbers format the same.</td><td></td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'>Decimal: <select id='config_numberDecimal'><option value='.'>.<option value=','>,</select></td><td></td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'>Clean Empire Fleets: <input type='checkbox' id='stripNumFormatFleet'></td><td>Strips all number formatting on ship type columns.</td><td>Empire fleet</td></tr>"+
   "<tr><td><input type='checkbox' id='config_copyBaseData'></td><td class='featureName'>Copy Base Data</td><td>Allows easy copying of all astro data from a location or targeting data from bases.</td><td style='padding-left:20'>Bases / Astros</td></tr>"+
   "<tr><td><input type='checkbox' id='config_maxWidth'></td><td class='featureName'>Increase Maximum Width</td><td>Increases the width of page to 100% of screen if AE's 'Display Width' is set to 1000.</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=2  class='subFeatureName'>Specific Width: <input id='config_setWidth' size=3></td><td rowspan=5></td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input id='config_paddingLeft' size=3> Margin left</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input id='config_paddingRight' size=3> Margin right</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input id='config_paddingTop' size=3> Margin top</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input id='config_paddingBottom' size=3> Margin bottom</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=2 style='padding-left:10' class='featureName'>Show / Hide Links</td><td>Place links on several pages to toggle the view of certain page content.</td><td>&nbsp;</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_toggleBasesList'> Bases List</td><td>Provides a link to toggle the view of the bases list.</td><td style='padding-left:20'>Bases</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_toggleFleetsList'> Fleets List</td><td>Provides a link to toggle the view of the fleets list.</td><td style='padding-left:20'>Fleets</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_toggleBaseEconomy'> Economy List</td><td>Provides a link to toggle the view of the bases list.</td><td style='padding-left:20'>Economy</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_toggleEmpireTechnologies'> Technology List</td><td>Provides a link to toggle the view of the technology's list.</td><td style='padding-left:20'>Technology</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_toggleGuildInternal'> Guild Internal</td><td>Places a link at the lower left of the guild header to toggle the view of the guild internal info. Only when an info page is not viewed.</td><td style='padding-left:20'>Guild</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_clearProductionCommentsB'> Production Comments</td><td>Provides a link to toggle the view of the production/construction/research comments below each title to compact the pages.</td><td style='padding-left:20'>Constr,Prod,Rsrch</td></tr>"+
   "<tr><td colspan=2 style='padding-left:10' class='featureName'>Enhanced count down timers.</td><td>Shows dates and times for completion of work in progress. Highlights work to be completed today.</td><td style='padding-left:20'></td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_addFinishTimesEmpire'> Empire Page</td><td>Enable this feature for empire events pages.</td><td style='padding-left:20'>Empire events</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_addFinishTimes'> Other Pages</td><td>Enable this feature for fleets, construction, production and other pages.</td><td style='padding-left:20'>All pages except empire</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_finishTimesSingleLine'> Single line</td><td>Display times on a single line.</td><td style='padding-left:20'>Empire</td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_24hourDisplay'> 24 Hour Clock</td><td>Display times in 24 hour format.</td><td></td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_finishTimesServer'> Use Server Time</td><td>Display times in server time instead of local time.</td><td></td></tr>"+
   "<tr><td colspan=2 class='subFeatureName'><input type='checkbox' id='config_timesServerFormat'> Server Time Format</td><td>Display times in server time format. DD-MM-YYYY HH:MM:SS</td><td></td></tr>"+
   "<tr><td colspan=2 style='padding-left:10' class='featureName'>Colors.</td><td>Erase them to reset.</td><td style='padding-left:20'></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Times &amp; Counter color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTimeColor' style='width:100px;'> Colors the time counters and the server times.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Finish Time color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightFinishColor' style='width:100px;'> Colors the finish / arrival times.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Under One Hour color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightNowColor' style='width:100px;'> Highlights finish / arrival times if under one hr. AutoMove counters under 1 min.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Under 24 Hour color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTodayColor' style='width:100px;'> Highlights finish / arrival times if under 24 hr. AutoMove counters under 1 hr.</td><td></td></tr>"+
   "<tr><td colspan=2 style='padding-left:10' class='featureName'>System Override Colors.</td><td>Erase them to reset. - <label>AET Colors<input type='radio' name='colors' id='config_overrideAET'></label> <label>Override Colors below<input type='radio' name='colors' id='config_overrideColors'></label> <label>System Default<input type='radio' name='colors' checked=true></label></td><td style='padding-left:20'></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Links color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_overrideLinks' style='width:100px;'> This overrides the system color on links.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Links Hover color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_overrideLinksHover' style='width:100px;'> This overrides the system color on links when the mouse is over it.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Text color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_overrideText' style='width:100px;'> This overrides the system color on text.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Heading color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_overrideHeading' style='width:100px;'> This overrides the system color on headings.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Comment color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_overrideComment' style='width:100px;'> This overrides the system color on help comments.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Main Border color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_overrideBorder' style='width:100px;'> This overrides the system color on the main borders.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Main Border size: <input type='text' id='config_overrideBorderSize' style='width:20px;'> This overrides the system size on main borders.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Main Border style: <select id='config_overrideBorderStyle'>";for(var i=0;i<b.length;i++){newBody+="<option value='"+b[i]+"'>"+b[i];}newBody+="</select> This overrides the system style on main borders.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Row Seperator color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_overrideBorderRow' style='width:100px;'> This overrides the system color on the table row seperator.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Form Border color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_overrideFormBorder' style='width:100px;'> This overrides the system border color on buttons, input and textareas.</td><td></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Form Background color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_overrideFormBack' style='width:100px;'> This overrides the system background color on buttons, input and textareas.</td><td></td></tr>"+
   "</table><table id='1_table' cellpadding=3 class='configTable'>"+
   "<tr><td colspan=5 class='configHeading'>Player Highlights -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#anchglhgt' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_highlightPlayers'></td><td class='featureName'>Highlight players</td><td>Highlights players according to guild.<br><b>Note:</b>This overrides color from the player highlight feature.</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>My Guild Tag<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_myGuild' style='width:100px;'></td><td class='subFeatureName' width='200'>Highlight color<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_myGuildcolor' style='width:100px;'></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Allied/Pact Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>:<br><input type='text' id='config_alliedGuilds' style='width:90%;'></td><td class='subFeatureName' width='200'>Highlight color<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_alliedGuildcolor' style='width:100px;'></td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Enemy Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>:<br><input type='text' id='config_enemyGuilds' style='width:90%;'></td><td class='subFeatureName' width='200'>Highlight color<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_enemyGuildcolor' style='width:100px;'></td></tr>"+
   "<tr><td colspan=4 class='subfeatureName'>Individual Player color Overrides<a href='#foot2'><sup class='footnote'>3</sup></a>:<br><input type='text' id='config_playerColors' style='width:90%;'></td></tr>"+
   "<tr><td><input type='checkbox' id='config_nameLocations'></td><td class='featureName'>Name Locations</td><td>Replaces location link text with location names.</td><td style='padding-left:20'>All Except bookmarks</td></tr>"+
   "<tr><td colspan=4 class='subfeatureName'>Base Names<a href='#foot2'><sup class='footnote'>4</sup></a>:<br><input type='text' id='config_locationNames' style='width:90%;'></td></td></tr>"+
   "<tr><td colspan=5 class='configHeading'>Trade -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#anctrade' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_highlightTradePartners'></td><td class='featureName'>Highlight trade partners</td><td>Highights all links to trade partners in the color you set below.</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'>Highlight color<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightPlayerColor' style='width:100px;'></td><td></td></tr>"+
   "<tr><td><input type='checkbox' id='config_highlightDuplicateTradePartners'></td><td class='featureName'>Highlight duplicate partners</td><td>Highlights duplicate trade partners and self trades.</td><td style='padding-left:20'>Empire trade</td></tr>"+
   "<tr><td><input type='checkbox' id='config_convertTradeLinks'></td><td class='featureName'>Convert Trade Links</td><td>Trade partner links to your bases now go to the trade page of that base.</td><td style='padding-left:20'>Empire trade</td></tr>"+
   "<tr><td><input type='checkbox' id='config_highlightPoorTrades'></td><td class='featureName'>Highlight unbalanced trades</td><td>Highlights eco values that are outside of the set thresholds.</td><td style='padding-left:20'>Empire trade</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'>Upper threshold: <input type='text' id='config_poorTradeUpperThreshold'style='width:25;'></td><td>Trades with eco bases greater than this amount above your own are highlighted in orange.</td><td></td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'>Lower threshold: <input type='text' id='config_poorTradeLowerThreshold' style='width:25;'></td><td>Trades with eco bases lower than this amount below your own are highlighted in red.</td><td></td></tr>"+
   "<tr><td><input type='checkbox' id='config_hideFullTrades'></td><td class='featureName'>Hide Full Trades</td><td>Inserts a link to toggle the display of bases with all routes filled.</td><td style='padding-left:20'>Empire trade</td></tr>"+
   "<tr><td><input type='checkbox' id='config_showTradeSummary'></td><td class='featureName'>Display Trade Summary</td><td>Displays a summary of trade efficiency.</td><td style='padding-left:20'>Empire trade</td></tr>"+
   "</table><table id='2_table' cellpadding=3 class='configTable'>"+
   "<tr><td colspan=5 class='configHeading'>Fleet -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancfleet' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_systemFleetScan'></td><td class='featureName'>System Fleet Scanner</td><td>Adds a button on system view to check astros without bases for fleet. If fleets are found, number of fleets and total size is displayed.</td><td style='padding-left:20'>System view</td></tr>"+
   "<tr><td><input type='checkbox' id='config_locationFleetScan'></td><td class='featureName'>Location Fleet Scanner</td><td>Adds a feature to scan fleets manually or automatically at a location or base.</td><td style='padding-left:20'>Astro / Base</td></tr>"+
   "<tr><td>&nbsp;&nbsp;&raquo;</td><td colspan=3 style='padding:4px 36px 12px 12px;'><div style='border:1px solid red;border-width:1px 0;'><span style='color:red;'>Warning</span>: Excessive use of the fleet scanners may lead to warnings from the game administrators for too many page views. On locations with many fleets or if used often, set the throttle to a lower number. To diable throttling and run as fast as possible, set throttle to 0 . Read the help file on the location fleet scanner for more details.</div></td><td>&nbsp;</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'><input type='checkbox' id='config_systemScanDetail'> Sytem Scan Detail</td><td colspan=2>Shows a pop up of fleet totals by guild if system scan output is clicked. Click the pop up to close.</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'>System Throttle: <input type='text' id='systemScanThrottle' style='width:25;'></td><td colspan=2>Set the number of locations per minute to scan.<br> 30 = 1 every 2 seconds. 120 = 2 every second.</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'>Location Throttle: <input type='text' id='fleetScannerThrottle' style='width:25;'></td><td colspan=2>Set the number of fleets per minute to scan.<br> 30 = 1 every 2 seconds. 120 = 2 every second.</td></tr>"+
   "<tr><td><input type='checkbox' id='config_advEmpireFleets'></td><td class='featureName'>Advanced Empire Fleets</td><td>Adds a row totalling quantities of each ship per galaxy, mobile fleets, and totals. Provides extra links to galaxies and locations. Fleet sizes are split into attack size and total fleet size linking to attack and move pages respectively. Attack fleet size exludes carriers,fleet carriers,recyclers,outpost ships, and scout ships. Fleet lists longer than 20 will show extra ship types row at the bottom.</td><td style='padding-left:20'>Empire fleet</td></tr>"+
   "<tr><td><input type='checkbox' id='config_addFleetMoveShortcut'></td><td class='featureName'>Move link on Fleets page</td><td>Inserts a move link in destination column if not moving.</td><td style='padding-left:20'>Fleets</td></tr>"+
   "<tr><td><input type='checkbox' id='config_sumFleets'></td><td class='featureName'>Sum guild fleets</td><td>Inserts a table with fleet totals by guild.</td><td style='padding-left:20'>Base pages</td></tr>"+
   "<tr><td><input type='checkbox' id='config_showRecallTime'></td><td class='featureName'>Show Recall Time</td><td>Displayes the est. recall return time of fleet on fleet view while in movement.<br> **Also displays auto recall option.</td><td style='padding-left:20'>Fleet view</td></tr>"+
   "<tr><td><input type='checkbox' id='config_fleetSummary'></td><td class='featureName'>Fleet Summary</td><td>Shows additional information with the fleet summary on the units page.</td><td style='padding-left:20'>Empire Units</td></tr>"+
   "<tr><td colspan=5></td></tr>"+
   "<tr><td colspan=5 class='configHeading'>Movement -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancmove' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_showFleetId'></td><td class='featureName'>Display Fleet Id</td><td>Adds the fleet name and location to the heading of the move page.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td><input type='checkbox' id='config_moveRedirect'></td><td class='featureName'>Move redirect</td><td>Includes an option to return to the same page after move.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td><input type='checkbox' id='config_scrolltoMove'></td><td class='featureName'>Scroll to form</td><td>Automatically scrolls the page upon loading to the movement entry form.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td><input type='checkbox' id='config_insertMovePresets'></td><td class='featureName'>Extra movement presets</td><td>Adds extra presets to existing 'all' and 'none'.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td><input type='checkbox' id='config_insertMoveIncrements'></td><td class='featureName'>Fleet Move Increments</td><td>This will add increment/decrement buttons next to quantity boxes for fleet movements.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td><input type='checkbox' id='config_insertMoveDefault'></td><td class='featureName'>Default Destination</td><td>Adds buttons to use a default destination.</td><td style='padding-left:20'>Location view</td></tr>"+
   "<tr><td><input type='checkbox' id='config_checkMoveLocations'></td><td class='featureName'>Check Move Locations</td><td>Places links on the move page to check start and destination for fleets.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td><input type='checkbox' id='config_timeHelper'></td><td class='featureName'>Time Helper</td><td>Enter time you want to arrive at a location to be informed of the right time to leave.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'><input type='checkbox' id='config_fleetReminders'>Launch Reminder</td><td>Shows countdown until launch time beneath server time.</td><td style='padding-left:20'>All pages</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'><input type='checkbox' id='config_movePresets'>Move Presets</td><td>Option to record the destination and ship quantities to easily re-enter at a later time. Also offers an option to turn the 'Launch Reminder' into a 'Auto Launch' during the setting of an 'Launch Reminder'.</td><td style='padding-left:20'>All pages</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'><input type='checkbox' id='config_autoLaunch'>Auto Move</td><td>Places a link above the move button once a preset is entered. This link allows you to set a time to move automatically.</td><td style='padding-left:20'>All pages</td></tr>"+
   "<tr><td><input type='checkbox' id='config_addServertimeCounter'></td><td class='featureName'>Show Server Time</td><td>Displays server time counter next to move button.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td><input type='checkbox' id='config_showLandingTime'></td><td class='featureName'>Show Landing Time</td><td>Displayes the est. landing time of fleets on movement page.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td><input type='checkbox' id='config_bigMoveButton'></td><td class='featureName'>Big Move Button</td><td>Increases the size of the move button.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "<tr><td><input type='checkbox' id='config_showBaseLink'></td><td class='featureName'>Show Base Link</td><td>Converts the location link to a link to the base and location.</td><td style='padding-left:20'>Fleet move</td></tr>"+
   "</table><table id='3_table' cellpadding=3 class='configTable'>"+
   "<tr><td colspan=5 class='configHeading'>Construction / Production -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancprod' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_productionRedirect'></td><td class='featureName'>Production redirect</td><td>Includes an option to land on the Empire page after submit.</td><td style='padding-left:20'>Production</td></tr>"+
   "<tr><td><input type='checkbox' id='config_scrolltoProduction'></td><td class='featureName'>Scroll to form</td><td>Automatically scrolls the page upon loading to the production entry form.</td><td style='padding-left:20'>Production</td></tr>"+
   "<tr><td><input type='checkbox' id='config_enableProductionPresets'></td><td class='featureName'>Production presets</td><td>This feature allows production values to be filled with customizable preset values. Time values override quantity values.</td><td style='padding-left:20'>Production</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'><input type='checkbox' id='config_cloneProductionPresets'>Clone to Bottom</td><td colspan=2>Clones production presets to the bottom  of production screen.</td></tr>"+
   "<tr><td><input type='checkbox' id='config_enableProductionCaps'></td><td class='featureName'>Show Capacity</td><td>Displays production capacity and base name near submit button.</td><td style='padding-left:20'>Production</td></tr>"+
   "<tr><td><input type='checkbox' id='config_enableProductionPage'></td><td class='featureName'>AllinOne pages</td><td>This adds 4 small links on the empire page next to the heading. These links open pages to add construction, defenses, production, or research to all bases from 1 page.</td><td style='padding-left:20'>Empire</td></tr>"+
   "<tr><td><input type='checkbox' id='config_bases_production'></td><td class='featureName'>Empire Production Features</td><td>This adds a button to copy the selected row to all the other rows on the empire production page. Also adds a reset button to the form.</td><td style='padding-left:20'>Empire Production</td></tr>"+
   "<tr><td><input type='checkbox' id='config_addProductionIncrements'></td><td class='featureName'>Production increments</td><td>This will add increment/decrement buttons next to quantity boxes for production.</td><td style='padding-left:20'>Production</td></tr>"+
   "<tr><td><input type='checkbox' id='config_enterProductionTime'></td><td class='featureName'>Enter production times</td><td>Allows entry of production time in hours. Quantities are then calculated and filled in.</td><td style='padding-left:20'>Production</td></tr>"+
   "<tr><td><input type='checkbox' id='config_fixQueues'></td><td class='featureName'>Enhanced queue display</td><td>Changes the queue at the bottom of the page to a fixed queue at the bottom of the screen which is always visible.</td><td style='padding-left:20'>Structures, Defenses, Production, and Research</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'>Max queue size: <input type='text' id='config_maxQueues' style='width:25;'></td><td>Queue list will not be fixed when queues size is greater than this number.</td><td></td></tr>"+
   "<tr><td><input type='checkbox' id='config_enableSimpleProduction'></td><td class='featureName'>Simple Production</td><td>Enables a checkbox on the production page at the bottom which simplifies the production page to use presets only. Production Presets and Clone to Bottom must be enabled.</td><td style='padding-left:20'>Production</td></tr>"+
   "<tr><td colspan=5></td></tr>"+
   "<tr><td colspan=5 class='configHeading'>Structures / Bases -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancstruct' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_structuresGoals'></td><td class='featureName'>Advanced structures page</td><td>color codes structure values based on progress.</td><td style='padding-left:20'>Empire structures</td></tr>"+
   "</table><table id='4_table' cellpadding=3 class='configTable'>"+
   "<tr><td colspan=5 class='configHeading'>Map Enhancements -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancmap' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_cloneBaseLinks'></td><td class='featureName'>Insert base links by map</td><td>Displays base links next to galaxy map so both are visible simultaneously.</td><td style='padding-left:20'>Bases</td></tr>"+
   "<tr><td><input type='checkbox' id='config_cloneFleetLinks'></td><td class='featureName'>Insert fleet links by map</td><td>Displays fleet links next to galaxy map so both are visible simultaneously.</td><td style='padding-left:20'>Fleets</td></tr>"+
   "<tr><td><input type='checkbox' id='config_baseLocationLinks'></td><td class='featureName'>Base Location Links</td><td>Changes the base links to location links on astros. Places base link next to astro. Changes the debris '*' into readable text.</td><td style='padding-left:20'>Map</td></tr>"+
   "<tr><td><input type='checkbox' id='config_systemRemoveBorder'></td><td class='featureName'>Hide System Border</td><td>Hides the border and background on system views.</td><td style='padding-left:20'>System view</td></tr>"+
   "<tr><td colspan=5></td></tr>"+
   "<tr><td colspan=5 class='configHeading'>Advanced Scanners -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancscanner' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_scannerTotals'></td><td class='featureName'>Show Total Fleet</td><td>Adds a total row showing the total fleet on scanners.</td><td style='padding-left:20'>Scanner</td></tr>"+
   "<tr><td><input type='checkbox' id='config_scannerHighlight'></td><td class='featureName'>Row Lighting</td><td>Adds row highlighting if the fleet is landing next to or on your base. Orange = same system as your base, Red = on your base.</td><td style='padding-left:20'>Scanner</td></tr>"+
   "<tr><td colspan=5></td></tr>"+
   "<tr><td colspan=5 class='configHeading'>Credits History -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#anccredit' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_sumCredits'></td><td class='featureName'>Credits Summary</td><td>Displays a summary of credits.</td><td style='padding-left:20'>Credits History</td></tr>"+
   "<tr><td colspan=5></td></tr>"+
   "<tr><td colspan=5 class='configHeading'>Attack -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancattack' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_bigAttackButton'></td><td class='featureName'>Big Attack Button</td><td>Increases the size of the attack button and places focus on the button to use the enter key on page load for quickest attack.</td><td style='padding-left:20'>Attack</td></tr>"+
   "<tr><td><input type='checkbox' id='config_hideAttackFleets'></td><td class='featureName'>Hide Attack Fleet Buttons</td><td></td><td style='padding-left:20'>Attack</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'><input type='checkbox' id='config_hideAttackAFleets'>Hide Ally Guilds</td><td colspan=2>Guilds listed under 'Highlight Players'-'Allied/Pact Guild Tags' will be hidden on attack page.</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'><input type='checkbox' id='config_hideAttackEFleets'>Hide Enemy Guilds</td><td colspan=2>Guilds listed under 'Highlight Players'-'Enemy Guild Tags' will be hidden on attack page.</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'><input type='checkbox' id='config_hideAttackOFleets'>Hide Other Guilds</td><td colspan=2>Guilds not listed under 'Highlight Players' will be hidden on attack page.</td></tr>"+
   "<tr><td colspan=2 class='subfeatureName'><input type='checkbox' id='config_hideAttackUFleets'>Hide Unguilded</td><td colspan=2>Players not in a guild will be hidden on attack page.</td></tr>"+
   "<tr><td><input type='checkbox' id='config_quickMoveAttack'></td><td class='featureName'>Quick Move / Attack</td><td>Adds move and attack buttons to the fleet overview if the fleet is in route.</td><td style='padding-left:20'>Attack</td></tr>"+
   "<tr><td><input type='checkbox' id='config_locationMoveAttack'></td><td class='featureName'>Location Move / Attack</td><td>Adds move and attack buttons to the astro and base view if the fleet has landed.</td><td style='padding-left:20'>Map and Base</td></tr>"+
   "<tr><td colspan=5></td></tr>"+
   "<tr><td colspan=5 class='configHeading'>Misc. Tools -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancfree' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_aetLight'></td><td class='featureName'>Row Lighting</td><td>Changes background color of table rows under the mouse for easy reading.</td><td rowspan=2 style='padding-left:20'>Base, Fleets, Empire, Guild, Scanners, Credits, Bookmarks</td></tr>"+
   "<tr><td colspan=3 class='subfeatureName'><input id='config_aetLightC' style='width:100px;'> Background Lighting Color</td></tr>"+
   "<tr><td><input type='checkbox' id='config_deletePageMessages'></td><td class='featureName'>Messages Select All</td><td>Adds a button to the messages page to select all messages for quick deleting.</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td><input type='checkbox' id='config_scrollTopBot'></td><td class='featureName'>Top &amp; Bottom buttons</td><td>Places 'Top of Page' button at the bottom-right and a 'Bottom of Page' at the upper-right.</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td><input type='checkbox' id='config_QuickJump'></td><td class='featureName'>Quick: Jump,Links,Notes</td><td>QuickJump places a box near the top to enter a location to jump to. Works on locations for any server. QuickLinks places a link under the QuickJump box to open a display for all your empire links and offers the ability to create quick temp. links and add custom links to any url. QuickNotes adds untilities to QuickLinks to place notes on links, players, bases, locations, etc. Also places all notes display on your current Notes page..</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td colspan=5></td></tr>"+
   "<tr><td colspan=5 class='configHeading'>Free Account Tools -- <a href='http://astroempirestools.blogspot.com/2009/08/options.html#ancfree' style='font-size:10px;' target='help'>HELP</a></td></tr>"+
   "<tr><td><input type='checkbox' id='config_removeAdds'></td><td class='featureName'>Remove Banner Adds</td><td>Removes the banner add from the middle of the page on free accounts.</td><td style='padding-left:20'>All</td></tr>"+
   "<tr><td><input type='checkbox' id='config_advCapacitiesPage'></td><td class='featureName'>Capacities</td><td>Display a capacities page similar to upgraded accounts.</td><td style='padding-left:20'>Capacities</td></tr>"+
//   "<tr><td><input type='checkbox' id='config_commanderTotals'></td><td class='featureName'>Commander Totals</td><td>Works on free and upgraded accounts. Adds capacities with commander's affect next to regular capacities.</td><td style='padding-left:20'>Capacities</td></tr>"+
   "</table></td></tr><tr height='25'><td colspan=3></tr>"+
   "<tr><td colspan=3 align='center'><input type='button' id='resetButton' value='Reset to Last Save' style='font-size:10px;margin-right:30px;'><input type='button' id='saveButton' value='Save'><input type='button' id='saveButton2' value='Save' style='z-index:10;position:fixed;top:4px;right:7px;'><a href='javascript:window.location.reload();' style='z-index:10;position:fixed;top:38px;right:10px;'>Return</a></td></tr>"+
   "</table><br><input style='cursor:pointer;margin-right:20px;' type='button' onClick='window.location.reload();' value='Return to Astro Empires'><a style='font:italic 11px arial,sans-serif;' href='javascript:scrollTo(0,0);'>Top of Page</a>"+
   "<table cellspacing=3 cellpadding=8 style='background:#000000 none;border:1px dotted #FF6464;font:500 11px verdana,tahoma,arial,sans-serif;margin:14px;'><tbody>"+
   "<tr><td style='border:0;'><a name='foot1'>1.</a> Csscolor definitions must be in valid css color formats. See CSS color help below.<br>&nbsp;&nbsp;&nbsp;** Hex values must be preceded by a #, such as #000000 for black.<br>&nbsp;&nbsp;&nbsp;** Color names may be used, such as red or green.</td></tr>"+
   "<tr><td style='border:0;'><a name='foot2'>2.</a> Guild definitions must be in the following format: <b>[Guild1],[Guild2],...</b><br>&nbsp;&nbsp;&nbsp;** Include the square brackets</td></tr>"+
   "<tr><td style='border:0;'><a name='foot2'>3.</a> Player color definitions must be in the following format: <b>player1=csscolor,player2=csscolor2,...</b><br>&nbsp;&nbsp;&nbsp;** Do NOT include player's guild tag.<br>&nbsp;&nbsp;&nbsp;** Example: Mr Debris=green,player1=#FF0099</td></tr>"+
   "<tr><td style='border:0;'><a name='foot2'>4.</a> Location name definitions must be in the following format: <b>location=name,location2=name2</b><br>&nbsp;&nbsp;&nbsp;** Example: A11:22:33:44=has death star,A00:22:10:31=Secret Jump Gate</td></tr>"+
   "</tbody></table>"+
   "<table cellpadding=20 style='border:0;background:#000000 none;'><tr><th colspan=3 style='padding:8px;border:0;border-bottom:1px dotted #FF6464;'>Css Color Picker</th></tr><tr><td style='border:0;border-left:1px dotted #FF6464;'>Red:<select id='red'>"+colorPickerOpts()+"</select></td><td style='border:0;'>Green:<select id='green'>"+colorPickerOpts()+"</select></td><td style='border:0;border-right:1px dotted #FF6464;'>Blue:<select id='blue'>"+colorPickerOpts()+"</select></td></tr><tr><td colspan=3 align=center style='border:1px dotted #FF6464;border-width:0 1px;'><input size=8 maxlength=7 style='text-align:center;' id='colorInput' value='#000000' onFocus='this.select();'></td></tr>"+
   "<tr><td colspan=3 align=center style='border:1px dotted #FF6464;border-width:0 1px 1px;'>or by color name:<select id='colorname'>"+colorPickerNames()+"</select></td></tr></table>"+
   "<br><input style='cursor:pointer;margin-right:20px;' type='button' onClick='window.location.reload();' value='Return to Astro Empires'><a style='font:italic 11px arial,sans-serif;' href='javascript:scrollTo(0,0);'>Top of Page</a>"+
   "<a name='author'>&nbsp;</a><div style='color:#DCE8DA;background:#000000 none;border:1px dotted #FF6464;font:500 12px verdana,tahoma,arial,sans-serif;margin:14px;'><h2 style='text-align:center;'>Credits</h2><br>* <span style='font-style:italic;'>Astro Empires Tools was inspired by the original AE Extras and input from various AE Players.</span><br><span style='font:11px arial;'>The purpose for this tool is not to give any advantage to players, but to just make it more fun to play AE.</span><br><br>Code written by: <a href='javascript:void(1);' style='font:700 13px georgia,\"times new roman\",serif;' id='toggleOJD'>Outsource Justified Design.</a><div style='position:relative;top:12px;display:none;width:500px;' id='ojddiv'><fieldset style='margin:0;padding:0 12px;border:1px solid #686868;'><legend style='color:#FFF8DF;margin:0 0 0 5px;padding:0 5px;'>Internet Programming &amp; Web design Services</legend><ul style='text-align:left;'><li>Contract a Professional Website Design Company<li>12+ years experience, large and small projects.<li>DHTML, CSS, Javascript, Perl, SQL, SEO, CMS<li>Email: <a href='mailto:ojd.websites@gmail.com'>ojd.websites@gmail.com</a></ul></fieldset></div><br><br>To report a bug, or make suggestions, questions, comments and requests: <br><span style='line-height:1.3;'>Read our <a href='http://astroempirestools.blogspot.com/' target='help'>Tips &amp; Tricks</a> or send email to <a href='mailto:ojd.websites@gmail.com?subject=AET%20Support-"+new Date().getTime()+"'>AET Support</a><br>OR</span>"+
   "<fieldset style='margin:0;padding:3px 12px 0 12px;border:1px solid #686868;border-bottom:0;width:400px;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>Add your comment</legend></fieldset><iframe style='width:500px;height:230px;border:0;display:block;padding:0;position:relative;top:-4px;' src='http://www.blogger.com/comment-iframe.g?blogID=3115667692314209720&postID=3638586494852457028'></iframe><div style='position:relative;width:70px;text-align:center;'><div style='position:absolute;left:-90px;top:-47px;width:70px;height:22px;background-color:#000;'></div></div>"+
   "<br>Listed on <a href='http://userscripts.org/scripts/show/56388' target='_blank'>Userscripts</a> - <a href='javascript:void(1);' id='updateAET2'>Check for Updates</a><br>Supported 100% by donations. Help keep AET going ... <a href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7880871&page_style=AET'><img border='0' src='https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif'></a><br><br></div></div>";
 document.body.innerHTML = newBody;
 loadConfig();
 document.getElementById('config_autoLaunch').addEventListener('change',function(){if(document.getElementById('config_autoLaunch').checked) document.getElementById('config_movePresets').checked=true;},false);
 document.getElementById('config_movePresets').addEventListener('change',function(){if(!document.getElementById('config_movePresets').checked) document.getElementById('config_autoLaunch').checked=false;},false);
 document.getElementById('colorInput').addEventListener('change',function(){this.parentNode.style.backgroundColor=this.value;document.getElementById('red').selectedIndex=parseInt(this.value.substring(1,3),16);document.getElementById('green').selectedIndex=parseInt(this.value.substring(3,5),16);document.getElementById('blue').selectedIndex=parseInt(this.value.substring(5,7),16);},false);
 document.getElementById('red').addEventListener('change',function(){document.getElementById('colorInput').value="#"+this.options[this.selectedIndex].value+document.getElementById('colorInput').value.substring(3,7);document.getElementById('colorInput').parentNode.style.backgroundColor=document.getElementById('colorInput').value;document.getElementById('red').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(1,3),16);document.getElementById('green').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(3,5),16);document.getElementById('blue').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(5,7),16);},false);
 document.getElementById('green').addEventListener('change',function(){document.getElementById('colorInput').value=document.getElementById('colorInput').value.substring(0,3)+this.options[this.selectedIndex].value+document.getElementById('colorInput').value.substring(5,7);document.getElementById('colorInput').parentNode.style.backgroundColor=document.getElementById('colorInput').value;document.getElementById('red').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(1,3),16);document.getElementById('green').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(3,5),16);document.getElementById('blue').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(5,7),16);},false);
 document.getElementById('blue').addEventListener('change',function(){document.getElementById('colorInput').value=document.getElementById('colorInput').value.substring(0,5)+this.options[this.selectedIndex].value;document.getElementById('colorInput').parentNode.style.backgroundColor=document.getElementById('colorInput').value;document.getElementById('red').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(1,3),16);document.getElementById('green').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(3,5),16);document.getElementById('blue').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(5,7),16);},false);
 document.getElementById('colorname').addEventListener('change',function(){document.getElementById('colorInput').value="#"+this.options[this.selectedIndex].value;document.getElementById('colorInput').parentNode.style.backgroundColor=document.getElementById('colorInput').value;document.getElementById('red').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(1,3),16);document.getElementById('green').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(3,5),16);document.getElementById('blue').selectedIndex=parseInt(document.getElementById('colorInput').value.substring(5,7),16);},false);
 document.getElementById('saveButton').addEventListener('click',function(){saveConfig();},false);
 document.getElementById('saveButton2').addEventListener('click',function(){saveConfig();},false);
 document.getElementById('resetButton').addEventListener('click',function(){loadConfig();},false);
 document.getElementById('config_highlightPoorTrades').addEventListener('change',function(){var a=document.getElementById('config_highlightPoorTrades').checked;document.getElementById('config_poorTradeUpperThreshold').disabled=!a;document.getElementById('config_poorTradeLowerThreshold').disabled=!a;},true);
 document.getElementById('config_fleetReminders').addEventListener('click',function(){if(document.getElementById('config_fleetReminders').checked) document.getElementById('config_timeHelper').checked = true;},true);
 document.getElementById('config_timeHelper').addEventListener('click',function(){if(!document.getElementById('config_timeHelper').checked) document.getElementById('config_fleetReminders').checked = false;},true);
 document.getElementById('toggleOJD').addEventListener('click',function(){if(document.getElementById('ojddiv').style.display=='none'){document.getElementById('ojddiv').style.display='block';}else{document.getElementById('ojddiv').style.display='none';}scrollTo(0,document.body.offsetHeight);},false);
 document.getElementById('updateAET').addEventListener('click',function(){checkAET(s);},false);
 document.getElementById('updateAET2').addEventListener('click',function(){checkAET(s);},false);
 document.getElementById('newAdditions').addEventListener('click',function(){newAdditions(s);},false);
 document.getElementById('0_tab').addEventListener('click',function(){toggleTabs(0);},false);
 document.getElementById('1_tab').addEventListener('click',function(){toggleTabs(1);},false);
 document.getElementById('2_tab').addEventListener('click',function(){toggleTabs(2);},false);
 document.getElementById('3_tab').addEventListener('click',function(){toggleTabs(3);},false);
 document.getElementById('4_tab').addEventListener('click',function(){toggleTabs(4);},false);
 toggleTabs();
}

function toggleTabs(t){
 if(!t) t=0;
 for(var i=0;i<5;i++){
  if(i==t){
   document.getElementById(i+'_tab').className='tabs act';
   document.getElementById(i+'_table').style.display='table';
  }else{
   document.getElementById(i+'_tab').className='tabs';
   document.getElementById(i+'_table').style.display='none';
  }
 }
}

function colorPickerOpts(){
 var c='',x;
 for(var i=0;i<256;i++){
  x=i.toString(16);
  if(x.length<2) x='0'+x;
  c+="<option value='"+x.toUpperCase()+"'>"+x.toUpperCase();
 }
 return c;
}

function colorPickerNames(){
 var a='',c={'black':'000000','antiquewhite':'FAEBD7','aquamarine':'7FFFD4','azure':'F0FFFF','beige':'F5F5DC','bisque':'FFE4C4','blue':'0000FF','blueviolet':'8A2BE2','brown':'A52A2A','cadetblue':'5F9EA0','chartreuse':'7FFF00','chocolate':'D2691E','coral':'FF7F50','cornflowerblue':'6495ED','crimson':'DC143C','cyan':'00FFFF','darkblue':'00008B','darkcyan':'008B8B','darkgoldenrod':'B8860B','darkgray':'A9A9A9','darkgreen':'006400','darkmagenta':'8B008B','darkolivegreen':'556B2F','darkorange':'FF8C00','darkorchid':'9932CC','darkred':'8B0000','darksalmon':'E9967A','darkseagreen':'8FBC8F','darkslateblue':'483D8B','darkslategray':'2F4F4F','darkturquoise':'00CED1','darkviolet':'9400D3','deeppink':'FF1493','deepskyblue':'00BFFF','dimgrey':'696969','dodgerblue':'1E90FF','firebrick':'B22222','gold':'FFD700','greenyellow':'ADFF2F','hotpink':'FF69B4','indianred':'CD5C5C','indigo':'4B0082','khaki':'F0E68C','lightslateblue':'8470FF','limegreen':'32CD32','mediumorchid4':'7A378B','mediumvioletred':'C71585','orangered':'FF4500','orchid':'DA70D6','palegoldenrod':'EEE8AA','peru':'CD853F','powderblue':'B0E0E6','purple':'A020F0','rosybrown':'BC8F8F','royalblue':'4169E1','saddlebrown':'8B4513','salmon':'FA8072','sandybrown':'F4A460','seagreen':'2E8B57','sienna':'A0522D','skyblue':'87CEEB','springgreen':'00FF7F','steelblue':'4682B4','tan':'D2B48C','thistle':'D8BFD8','tomato':'FF6347','turquoise':'40E0D0','violet':'EE82EE','wheat':'F5DEB3','yellowgreen':'9ACD32','whitesmoke':'F5F5F5','white':'FFFFFF'};
 for(var x in c){
  a+="<option value='"+c[x]+"'>"+x;
 }
 return a;
}

function checkAET(s){
 if(document.getElementById('updateCAET')) document.getElementById('updateCAET').parentNode.removeChild(document.getElementById('updateCAET'));
 var u="http://userscripts.org/scripts/review/56388.txt?tds="+new Date().getTime();
 GM_xmlhttpRequest({
  method:  "GET",
  url:     u,
  headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
  onload: function(r){
   var m = {name:/@name\s+(.*)[\r\n]/,version:/@version\s+(.*)[\r\n]/,change:/@change\s+(.*)[\r\n]/,depreciated:/@depreciated\s+(.*)[\r\n]/};
   for(x in m){m[x]=(m[x].exec(r.responseText)?m[x].exec(r.responseText)[1]:null);}
   if(m.version){
    var y='Current',t='';
    var RE = /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(m.version+"|"+s.split('v:')[1]);
    if(parseInt(RE[6]||"0")<parseInt(RE[3]||"0")) y='Fixes';
    if(parseInt(RE[5]||"0")<parseInt(RE[2]||"0")) y='Minor';
    if(parseInt(RE[4]||"0")<parseInt(RE[1]||"0")) y='Major';
    var c = document.createElement("div");
    c.setAttribute('id','updateCAET');
    c.setAttribute('style','z-index:10;position:absolute;left:'+((document.body.clientWidth/2)-263)+'px;text-align:center;color:#DCE8DA;background:#000 none;border:3px double #FF6464;font:500 12px verdana,tahoma,arial,sans-serif;margin:0 auto;padding:10px;');
    var a=document.createElement('a');
    a.setAttribute('style','float:right;font-size:11px;');
    a.setAttribute('href','javascript:void(1);');
    a.innerHTML='Close';
    c.appendChild(a);
    a.addEventListener("click",function(){this.parentNode.parentNode.removeChild(this.parentNode);},false);
    a=document.createElement('h2');
    a.innerHTML=(y!='Current')?"AE Tools "+y+" Update Notification!":"Astro Empires Tools <br>You have the "+y+" version";
    c.appendChild(a);
    a=document.createElement('p');
    a.setAttribute('style','width:500px;');
    if(y!='Current'){
     t="An update is available for Astro Empires Tools. <a href='http://userscripts.org/scripts/source/56388.user.js'>CLICK to UPDATE</a><br><br>";
     t+=(m.name!='AstroEmpiresTools')?"Name has Changed. new name: <span style='font-weight:900;'>"+m.name+"</span><br><br>":'';
     t+=(m.change!=null)?"<fieldset style='margin:0 50px 12px;padding:3px 12px 0 12px;border:1px solid #686868;border-bottom:0;text-align:left;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>Changes</legend>"+m.change+'</fieldset>':'';
     t+=(m.depreciated!=null)?"<fieldset style='margin:0 50px 12px;padding:3px 12px 0 12px;border:1px solid #686868;border-bottom:0;text-align:left;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>Depreciated</legend>"+m.depreciated+'</fieldset>':'';
    }
    t+="<br>You are currently running version <span style='font-weight:900;'>"+s.split('v:')[1]+"</span>, the newest version is <span style='font-weight:900;'>"+m.version+"</span>.<div style='font-size:10px;color:#888;position:relative;top:4px;'>If the update check sees an old version, clear your cache.</div>";
    a.innerHTML = t;
    c.appendChild(a);
    document.body.appendChild(c);
   }
   c.style.top=document.body.offsetHeight-((getSetting('config_maxWidth',true))?parseInt(getSetting('config_paddingBottom','10')):0)-100;
   scrollTo(0,document.body.offsetHeight);
  }
 });
}

function newAdditions(s){
 var c=document.createElement('div');
 c.setAttribute('style','position:absolute;top:142px;left:'+((document.body.clientWidth/2)-313)+'px;color:#DCE8DA;background:#000 none;border:3px double #FF6464;font:500 12px verdana,tahoma,arial,sans-serif;margin:0 auto;padding:10px;width:600px;z-index:2;');
 c.setAttribute('id','newAddCont');
 c.innerHTML="<a href='javascript:void(1);' onClick='document.getElementById(\"newAddCont\").parentNode.removeChild(document.getElementById(\"newAddCont\"));' style='float:right;font-size:11px;'>Close</a><h3 style='text-align:center;'>History of Changes</h3><div style='text-align:center;margin-bottom:12px;'>Current Version: "+s+"</div>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>Current</legend>Fixed the recall display/timer and auto-recall function. <br><br>If you are experiencing trouble with any timers, try disabling all 3 of the timer options provided in the Account/Display options of the game.<br><br></fieldset>"+
   "<fieldset style='margin:30px 10px -10px;padding:0;border:1px solid #686868;border-bottom:0;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>Previous</legend></fieldset>"+

   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>SEP-11-2010 / v:4.3.2</legend>Fixed the server time changes.<br><br>AE has removed the 'cmp=2' on region and system location links so I went through the program to remove any use of those links to keep them from tracking the script.<br><br>Fixed the system tools such as the fleet scanning, system border, and base links.<br><br>Fixed the row lighting, preset data link, and fleet order link on the fleets page.<br><br>The notes links on some pages, such as the empire page, were not working so they are now fixed.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>JUN-18-2010 / v:4.3.1</legend>Added 'Hide Comments' to Empire Technologies page.<br><br>Fixed system page so the system is not removed.<br><br>Fixed 'Copy Fleet Links' so the fleets list is not over the galaxy.<br><br>Fixed 'Copy Base Links' so the base list is not over the galaxy.<br><br>Added a couple features to AE's empire production page. A button near the heading to copy the selected row to all other rows. A row selector was added because row 1 may not be able to build all the ship types. If a row is not capable of producing the type of ship on the selected row, then it is changed to fighters and the quantity is erased. Also a reset button was added next to the submit button at the bottom.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>MAY-31-2010 / v:4.2.5</legend>Added to Hightlight Trade Partners. On board pages, if the poster is a trade partners, the will be colored the trade partner color. This allows for a quick notice if you already have a route with the player. Also, if a trade request was sent to someone's messages and the message was copied to the boards, the original sender is also checked and highlighted if they are trade partners. The copied message must be in the format starting with '[guild] player_name Reply - Block Player - Report - Copy Savebox' or it will not be checked. (works on any language)  One small bug with the trade partner test is if the 'same' player is included more than once in a post, only the first occurence will be highlighted. Multiple players in the same post seem to be highlighted properly. (processor overhead vs functionality does not warrent fixing this bug)<br><br>Anyway, I've tried to highlight trade partners on the boards so we know who we are already trading with when looking for trades. It's not fully tested but I don't see any more bugs in it except the one listed above.<br><br>Change made to 'Copy Base Data' feature. Base owner fleet previously was listed first in the fleet list and the player name was excluded since this was redundant information. But, a request was made to add the name back to the base owners fleets.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>MAY-30-2010 / v:4.2.4</legend>*** AE Tools is now 1 year old today. ***<br><br>Made some changes to Row Lighting so you have more control of the color used. Looks like AE has followed suit and added something similar to change the background color on rows. AE is using javascript while AETools Row Lighting is accomplished with only CSS which is more efficient and faster. So if AETools Row Lighting is enabled, AE's scripting is disabled because it is taking over on some pages and this will not allow you to control the color used.<br><br>Fixed a bunch of errors generated by AE's changes.<br><br>Added the number of labs to the base research pages. If the 'Hide Production Comments' feature is enabled, then 'Labs: XX' is added to the research heading. XX being the number of labs currently on the base.<br><br>Added debris, if any, to the 'Copy Base Data' feature.<br><br>AE has added 'cmp=2&' to location links on the boards and messages for some 'unknown' reason. This had broken many features on those pages but has been fixed.<br><br>New feature added to 'Player Highlighting'. If a player starts a trade route with you, the automated message sent to your inbox will now be flagged with a 'Duplicate' warning next to the player's name if you already have a trade route with the player.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>MAY-26-2010 / v:4.2.3</legend>Upgraded the empire fleets page to include row lighting if the fleet is moving and cleaned up the lower menu and totals row. Also changed the fleet numbers on the right from a single move link to an attack link on the attack fleet value and a move link on the total value.<br><br>Fixed a bug on the credits summary which would not add items to 'Other Expenses' if the item value was over 1000 and used a number seperator.<br><br>Added Fleet Summary which is an addition to the units page to include some usefull numbers.<br><br>Additions to Row Lighting to include a few other areas, such the main fleets page after a fleet is moved and on locations when viewing an astro with many fleets.<br><br>Fixed a bug on the All Production page that would cause an error when using goods on preset buttons.<br><br>I changed the Row Lighting color a bit. If you want to use the new color, just erase the old color and hit save. It will revert back to the 'new' default color.<br><br>Changes to the Auto Move display so you can read the landing time and detection range.<br><br>The Auto Move is changed and no longer requires presets. You may set an Auto Move without presets and the 'Set Auto Move' is not hidden if no presets are set.<br><br>AE tried to be sneaky and break the scanners page again... fixed.<br>Opps, they changed the scanners again...fixed.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>MAY-24-2010 / v:4.2.1</legend>Added to the Copy Base Data feature to copy astro data when viewing a location. I figured this would help out when scouting.<br><br>Fixed couple bugs on the trade page so the summary may be a bit more accurate.<br><br>Various bug fixes on different things. Also, I just made some fixes to the changes AE made on the production/construction pages right before this update.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>MAY-22-2010 / v:4.2.0</legend>On the Empire Fleets page, if you use the totals row feature, the galaxy numbers are now linked to the fleets page showing that galaxy. Also, the fleet links with your base titles now have a tool-tip showing the location when you hover over the link with the mouse.<br><br>Added to the Empire Fleets page is a second row of ship types placed at the bottom of the fleets list if the number of fleets is greater than 15. Also removed the new sort headings and replaced them with the old style links. The new sort was adding the totals rows into the sort.<br><br>Added Row Lighting. Colors the background of table rows when the mouse is over that row. Works on specific pages with list that can be long for easier reading. On by default, but may de disabled in settings as well as choosing the color used.<br><br>Scanners page has been fixed and totals correctly. Row Lighting was added if the inbound fleets are landing in your system or on your base.<br><br>The Auto Move result display is now working again. This is the large display after an auto move so you remember what happened when you get back to your computer.<br><br>No more excuses...lol<br>Added: Auto Recall<br><br>Auto recall works just like the Auto Move. Enter a time for the fleet to land after recall and hit go. The Auto Recall will calculate the time to recall so it lands at the time you enter. You may navigate away from the page and return later. Just remember your fleet will not recall if you return after the recall time. Also, the recall landing time is remembered in the entry box when you return to the page so you can cancel and make quick changes. If there is no auto recall set then the current recall landing time is used. **The page must be open during the recall time or the counter can not do the recall.<br><br>NOTE: Some features, such as the Auto Recall or Move Presets, are stored in memory and tied to the fleet. If the fleet merges with another or destroyed or any reason that fleet number no longer exists, then this data is left taking up memory. To view all this data, click on the main fleets page and you will see a link at the top right. You can then choose which data you no longer need and delete it so you can free up that memory space.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>MAY-21-2010 / v:4.1.0</legend>Fixed bugs on the fleets and trade pages which showed up when not populated, such as for new accounts.<br><br>Set the trade notification to go away if no trades but still checked.<br><br>Stopped the click event propogation on the production time entry boxes so AE's scripting will stop moving focus to the quantity boxes.<br><br>Simple production and production capacity are not displayed until you have some. They were breaking if only goods were available.<br><br>Fixed the offset and other bugs on the structures page.<br><br>Fixed the floating Queues.<br><br>Added a setting to convert the new style javascript/ajax queues to the old style submission queue.<br><br>Added a setting to hide the occupations list on the economy page if you have no occupations. This is on by default but may be disabled in settings.<br><br>Fixed a bug on the Credits Summary which added the first row to production on some occations even if it was not a production item.<br><br>Fixed some bugs on the empire fleets page.<br><br>Reworked the production preset buttons so they are removed properly and update as expected when changed. Also set the production preset buttons to hide properly on the All Production page.<br><br>Added a link next to the base title when viewing any base. This link copies base data for targeting purposes so its easy to copy and paste to the boards or into a PM.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>MAY-18-2010 / v:4.0.3</legend>Fixed a bug in the All Production page that would report an error if the number of ships submitted was greater than 1000 and number seperators are used, such as commas.<br><br>Added: On the fleet move page, pressing Alt-shift-A on the keyboard will trigger all fleet to be filled in. Also, Alt-shift-X will remove all fleet.<br><br>Added options to the System Fleet Scanner to scan just bases, just empty astros or both.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>MAY-15-2010 / v:4.0.2</legend>Removed the 'Hide MY Guild' feature from the attack selection screen since AE got smart and descided not to clutter that page with fleets you can't attack.<br><br>Fixed the timer size on the ships in the production queue on the All Production page.<br><br>Centered the Fleet Scanner output on 'fleet' scans. Also adjusted the cell padding and row spacing.<br><br>Added average per player numbers to the fleet scan if more than 1 player has fleet at that location or the filters used show more than 1 player.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>MAY-13-2010 / v:4.0.1</legend>Removed the 'Move Galaxy Links' feature. AE's change is a better solution than moving them.<br><br>Changes AE made to links on the map pages caused some issues, but they are fixed.<br><br>Added to fleet move pages: If that fleet is over one of your bases, the base title next to the location is converted to a link to the base while leaving the coordinates portion of the link pointing to the location. Sorry, not possible for bases you do not own as only your 'base ids' are available.<br><br>Fixed the production capacity check on the All Production Page when updating queues or submitting production quantities.<br><br>Added a counter to the All Production display so you know how many submissions are remaining.<br><br>Fixed a few bugs with the production queues display and times on the All Production page. Still a few issues with the construction and research pages to get the data parsed properly, but its getting close to working right.<br><br>** The construction and research submissions on the All in One pages do submit properly so you can use them but they just don't report back properly yet.<br><br>Changes to the Fleet Scanner so it is easier to read and copy to a spreadsheet. Removed the vertical text labels and went to abbreviations. I liked the vertical text, but Firefox is not yet able to do vertical text without line breaks. The line breaks made a mess when copying. Also, the ship numbers are now right aligned in the column so the numbers line up the way numbers should. Changed the cut-off for the display of the ship labels at the bottom from 20 fleets to 10 and added total fleet value. And, the extra '0' next to the save link when copied is now hidden after the scan finishes so that clutter is gone too. Tested copying to Google Docs and Open Office Calc spreadsheets and all looks good.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>APR-21-2010 / v:4.0.0</legend>Added: Now the credits page will sort like the trades page. Click on an item in the credits summary to toggle their display. To show all, click on the total.<br><br>Added 'Goods' to production page.<br>Fixed production capacity formula on production pages.<br><br>Added - Convert Trade Links: Links to your own bases on the empire trade page now go directly to the trade page of that base. This setting is on by default but can be disabled in settings.<br><br>Fixed some bugs on the main fleets page due to AE adding 'view=move_start' after you move a fleet. This serves no purpose but to break scripts... lol. It baffles me to see AE putting so much effort into breaking game improvements instead of improving the game...<br><br>Added - Button at the bottom of the messages to select all messages on that page for deleting. On by default but may be disabled in settings.<br><br>Fixed - Wormhole Bug. Before if you tried to use a wormhole with 'Move Presets' enabled, it would overwrite the wormhole link. The solution was to just move the wormhole link up to the top left corner and out of the form. My first try was to put the wormhole image over the sunshine as it is a 'blackhole'... lol. But then I came to my senses and put it back to the top right corner. The number 1 rule of building a user interface is you don't move or change things to places users are not used to.<br><br>Oh yea, All the tools on the move page are disabled on the 'use=wormhole' page, so it works good also.<br><br>Just found a bug in the select all messages button... ha ha Threw an error when it couldn't find the delete button on the sentbox...Fixed.<br><br>Fixed a bug in the Player Highlighting. It didn't like the equal sign(=) in guild tags. **Thanks to some user feedback I received. While working on it, I found a way to optimize the Player Highlighting so we get a little performance boost out of it.<br><br>"+
     "Fixed the production page displayed when you are asked to confirm cancel production.<br><br>Fixed all the bugs on the move page when a wormhole is present. All tools are now working when using the wormhole.<br><br>After fixing the production formula on the individual production pages, they changed the code so only total production is now displayed.<br><br>Fixed the 'Show/Hide Comments' on construction, production and research pages.<br><br>Fixed all the new bugs on the prodution pages.<br><br>Enhanced the All-in-One Production page and added a 'Add to Queue' feature for construction, defense, and technology. Also the ability to return to the unmodified empire page. Too many features to list... just play with it! (this is in beta, feedback on userscripts.org appreciated)<br><br>Changed the empire menu to include a link to the new AE production page. The 'Events' link was removed to make room since this was redundant with the 'Empire' link on the page. The new 2 row empire menu is converted back to single line since way too much 'real estate' is wasted above the fold and scrolling is a real problem with this design.<br><br><div style='margin:6px 20px;font:14px \"Times New Roman\";'>The real reason for lack of recent updates.<br>I have had the production page running for a while but have had reservations about releasing it. This will drop page impressions substantially thus cuttin into AE's revenue. This is not my intent but I feared a result none the less. I spent some time watching my own habits and have realized this may not be the case. The time I spend online has not changed by this tool but I spend more time doing other things and the daily tast of keeping credits into production is left to the production tool when I walk away from the computer. So I feel this will not lessen the page views but may actually increase them... so have fun.</div><br>**Know Issues: 'Add to Queue' tool for contrsuction/research sends request properly but does not parse the returned page acurately and displays corrupt data.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>JAN-19-2010 / v:3.1.1</legend>Made some more changes to the dates and how many of the functions find their way around the page. I think I have it working on all languages, time formats and number formats. I tested most of the functions on different display settings and I think its working. But, I want you all to let me know whats not working so we can all use this thing. Post anything you find not working on the <a href='http://userscripts.org/scripts/discuss/56388'>Userscripts discussion for AE Tools</a>.<br><br>Current know issues include all of the upgrades pages so do not include those bugs. I hate to even say this, but if anyone feels like upgrading one of my accounts, I can get those fixed as well. I can be reached at <a href='mailto:ojd.websites@gmail.com'>ojd.websites@gmail.com</a>.<br><br>Also, this is still only tested on the original skin. The new skins put massive overhead on the system and its a joke to use so I will not support it.<br><br>So go let all your buddies that have been using different languages know that it looks to be working for them now.<br><br> Have fun on the battlefield...<br><i>Dave</i></fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>JAN-18-2010 / v:2.3.1</legend>Fixed the QuickLinks on the 'Start New Trade'page.<br><br>Fixed the QuickLinks from showing duplicate locations on the 'Move' & 'Start New Trade' pages if the location has no title. Also added parenthesis to the location on links that do have a title so they are more like the existing links from AE. I think it is easier to read this way.<br><br>With the changes to QuickLinks, it makes it really easy to find trades from your guild trade page now. First open the 'Start New Trade' page of the base you have an open trade route. Then in another tab/window, open your guild trade page. Click a link on the trade page to view the location of a potential trade route. It does not matter if you can see it the astro or not. Now click 'SaveQL' at the top of the page and immediately hit enter without adding anything in the title entry box. Now hit your back button and do this again for the next potential route... and repeat as needed. Now go to the tab/window showing the 'Start New Trade' page and refresh. All those locations and now on the left column below the 'NEW TRADE ROUTE' entry form. Just click them to enter them into the form and click Calculate Profit to see if it is available and meets your needs. To remove them, just click 'QuickLinks' near the top of the page and 'Delete' the links you no longer need. I hope this was helpful...<br><br>One more little edition: On the fleet move page, if you click on the 'Check It' links above the Start or Destination, this will place that location in the 'GO' box at the top of the page so you can visit the page. Sometimes I would like to go see the surrounding area before I move and this made it a bit easier to do.<br><br>Tip: In the 'GO' box, just remove the last digit to view the system instead of the location... works for region and galaxy also. (it is forgiving on errors this way)</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>JAN-12-2010 / v:2.2.2</legend>*** Sever Time Fixed *** <br><br>Made changes to the main fleets page if 'Move/Attack' links are used. The column width's are freed up to adjust automatically so the fleet names are not as confined. Additionally, the last row with the 'Change fleets order' link is converted to a single cell and centered. This also will allow the table to adjust better and it's just in a functionally better position.<br><br>Additional bug fixes for the changes AE has made.<br><br>On the production page, AE padds the minutes on the build time column and I thought this was just screen clutter so I removed the leading '0' from the time.<br><br>Fixed the bug of the 'All Prod' link always displayed.<br><br>Added 'All Construction', 'All Defense', and 'All Research' pages. These work a bit differently than the All Production page as they only modify the queue.<br><br>Slight change to QuickLinks. If you set a QuickLink on a location and do not enter a title, the location coordinates will be used for the name. This makes it a bit quicker to add location links during battle as you can click the 'Save QL' link and hit enter to add a QuickLink to a location.<br><br>Fixed a bug in the Auto Launch/Fleet Reminder. It was being confused with a production time counter and was being corrupted on empire pages.<br><br>Added - If you use the 'Time Helper' to calculate a depart time, you now have the option to copy it into the 'Auto Move' time entry when setting an auto move. You will see a link below the time entry box on the set 'Auto Move' dialog if a depart time has been calculated.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>DEC-11-2009 / v:2.1.4</legend>Additional bug fixes for the changes AE has made. <br><br>Below is from the last update but kept here since it was just yesterday and some may have missed it--><br>First of all, thanks to those who have made donations to keep this project going. Please keep the help coming so I can afford to spend the time to make this game more fun for us all.<br><br><br>A few minor changes and fixes I came across while playing.<br><br>Added - QuickLinks on the page you start a trade route from. Easily check several possible routes. Go to the trade page on your guild board to visit several possible trade locations. Add them to QuickLinks. Now go to the 'Set a new Trade Route' page and use the QuickLinks to easily check them all.<br><br>Added - On the main fleets page, 'Attack' links are now in the 'Arrival' column for fleets not in movement.<br><br>Many bug fixes for the updates AE has made. I know there are still some bugs to fix and will have another update soon for those.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>OCT-09-2009 / v:2.1.3</legend>A few minor changes and fixes I came across while playing.<br><br>Added - Move Presets which places a link on the move page to record the current destination and ships for use at a later time. Good to use for the ship quantities you build regularly on each base. This feature also turns the launch reminder into a AutoLaunch feature. If you enable the launch reminder, upon setting a reminder it will ask if you want to auto launch your fleet if presets are used. If you select yes, then when the reminder goes off, it will change to tha launch page, fill in your presets, and then launch the fleet.<br><br>Added - AutoMove which is different than AutoLaunch but still moves the fleet automatically. As AutoLaunch only works on 1 fleet, AutoMove works on any number of the fleets you have at the same time.<br><br><b>Differences in AutoLaunch and AutoMove.</b><br> AutoLaunch is an add-on to the Fleet Reminder and only works on 1 fleet but will launch from any page with AE Tools running. AutoMove, on the other hand, will work on any number of fleets you have at the same time, but must be on the move page to move. Both must be set from the fleet move page of the fleet you want to auto launch/move.<br><br>This may sound strange to have 2 different auto tools, but concerns with system overhead for users with 'not so new' computers and the need to have more that 1 fleet auto set, led me to this point. For example, the constant hashing of what fleet to move, which has priority to move, and which window/tab you have open does the move, etc. This would put a lot of processor time on every page you view. So this is why we have only one AutoLaunch. The AutoMove can run on many pages as its basically just a timer counting down to zero, then launch. AutoLaunch and AutoMove can both be run on the same fleet as there are safeguards in place to allow this to happen. Just make sure they are in seperate windows/tabs and you can see both clocks running.<br><br>"+
     "<b>Tips on use of automatic movement.</b><br><br>AutoLaunch has one great purpose.<br><br> <b>- A coordinated landing time for your guild -</b><br><ul><li>The leader posts an arrival time.<li>Everyone enter the arrival time into the time helper below the move button.<li>Enter the ships and destination and save the preset.<li>Click calculate depart time, then click set reminder.<li>Select 'OK' when asked to turn the launch reminder into AutoLaunch and walk away.</ul>Now... All guild fleets will land on the location at the arrival time regardless of starting location or fleet speed. If the launch time has past when you enter an AutoLaunch, you will launch immediately but looks like you'll be a little late. Also, if you were not logged on or did not have AE Tools running during an AutoLaunch, it will launch immediately upon login or AE Tools start.<br><br> ... <a href='http://astroempirestools.blogspot.com/2009/10/automatic-movement.html' target='help'>continued</a><hr><br>Added - Tabbed interface for the setting section. It was getting long... ;)<br><br>Changed - Stopped the Advanced Countdown Timers from wrapping.<br><br>Fixed - The old Fleet Reminder was not acurate enough so it was re-written.<br><br>Changed - Countdown Times 'Single Line' option now effects all Countdown Times and much more strict on forcing single line.<br><br>Added - Server time and format to Finish Times.<br><br>Added - Color overrides for links, text, headings, borders, times, etc.<br><br>Added - Big attack button so you can click it faster and focus is placed on the button at page load if you want to use the enter key while the page is loading for the fastest possible attack.<br><br>Added - An AE Tools style sheet. You have an option to switch between the AET styles, your own custom colors or use the default game colors.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>OCT-01-2009 / v:2.0.0</legend>Changed - System fleet scanner now checks all astros that could have fleet. The scanner always ignored the hidden astros, but now they are removed before the scan just in case they change something. You can now also mouseover the output to see the owners of those fleets. There is no real room to put a list of players or guilds on the page so we used the mouseover.<br><br>Changed - Production page submit button turns red if you don't have enough credits to purchase.<br><br>Added - Redirect to Empire page from production submit instead of same page option.<br><br>Added - Redirect to same page after move instead of Fleets page option.<br><br>Added - Redirect to current system after move instead of Fleets page option. This one is great during battle.<br><br>Change - QuickJump entry box now accepts locations from any server and is no longer case sensative.<br><br>Changed - Moved the position of check for updates display and changed from a floating box to a box attached to the page. With too much text, it was possible to get too tall and the close or update button could be hidden from view.<br><br>Added - automatic scrolling to the production entry form or bottom of page on production pages.<br><br>Added - A zero button to each quatity input on the All Productions Page.<br><br>Added - automatic scrolling to the movement entry form on fleet move pages. Scrolls to the table above the entry form so you can use the links in that row."+
     "<br><br>Added - Simple Production Page option. Hides all items on production pages except for the bottom rows. This allows the use of presets only and very compact production pages.<br><br>Added - Production capacity and base name on production pages near submit button.<br><br>Added - Fleet name and current location to fleet move page.<br><br>Added - Throttle to System Fleet Scanner.<br><br>Added - System Scanner Details. If you click on the output of the system fleet scanner, a pop up will show fleet totals sorted by guild.<br><br>Added - Return to AE link fixed to upper right of settings page.<br><br>Changed - Better memory usage and cleanup for better performance but still backwards compatable.<br><br>Added - QuickNotes and QuickLinks bundled with QuickJump. QuickLinks places links you create in a very handy location for convenience and speed during battle. When you click the link to open the QuickLinks display, the links are right under your mouse. In addition, these links are added to the fast destination links at the bottom of the move page. If a QuickLink is not a location, they are not shown on the move page. All fast destinations on the move page are also moved to the top of the row. This allows you to record all the links in a system and easily jump around a system. Plus it combines all your empire links in one location and you can add custom links to any url. QuickNotes lets you attach notes to all those QuickLinks, players, bases, locations, guilds, etc. Note links are placed on relevant pages and locations.<br><br>Added - If any trade routes are inactive, the trade summary will display the number of routes inactive.<br><br>Added - On the move page you have links above the start and destination to display fleet data on those locations just like the system fleet scanner. Easily check your current location and your destination for danger. Used with the QuickLinks displayed on the move page, you can easily check all astros in a system, or anywhere, without leaving the move page.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>SEP-15-2009 / v:1.3.11</legend>Changed the All Production page to treat empty quantity boxes, numbers less than 1, or entries which are not numbers as zero. Decimal points are stripped out too so 1.5 becomes 15.<br><br>Fixed - Bug on fleets page hiding the 'sort by Size' link.<br><br>Added - Active and static time bar switch to see page load times and actual clock times. Also added settings to hide timezone offset and clock offset.<br><br>Added - The throttle on the fleet scanner that everyone wanted.<br><br>Fixed - Fleet scanner bugs... the RC scan was not seeing UC fleets properly and not parsing numbers with commas.<br><br>Added - time stamp on update check so update not reading from browser cache.<br><br>Change - reworked launch reminder to work with new clock and changed position to center;<br><br>Added - setting to control totals on scanner page.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>SEP-12-2009 / v:1.2.2</legend>Additional error checking added.<br><br>Changed - Reworked the recall time calculations to account for time lapse.<br><br>Added - This history of changes log.<br><br>Added - Remove number formatting on empire fleet table.<br><br>Changed - Reworked numbers formatting to work better with other AE numbers format.<br><br>Added - Top and bottom of page fixed links.<br><br>Added - Decimal place charactor choice.<br><br>Added - Top, right, bottom, and left page margin control.<br><br>Added - Floating save button on settings page.<br><br>Added - Sum single fleet in flight just like landed fleets.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>SEP-08-2009 / v:1.2.1</legend>Added - Actual fleet landing time next to move button.<br><br>Added - Recall return flight duration and landing time.<br><br>Added - Base fleets to totals row on empire fleets page.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>SEP-05-2009 / v:1.1.2</legend>Added settings to control the Show / Hide links on various pages. <br><br>Fixed a bug on launch time calculator. <br><br>Stopped 'Move Galaxy Links' from hiding movement errors.<br><br>Removed 'Hide Production Comments' from the settings page.</fieldset>"+
   "<fieldset style='margin:30px;padding:10px 20px;border:1px solid #686868;'><legend style='color:#FFFFDF;font-size:11px;margin:0 0 0 5px;padding:0 5px;'>SEP-02-2009 / v:1.1.1</legend>Published on <a href='http://userscripts.org/scripts/show/56388' target='_blank'>Userscripts</a><br><br><a href='http://astroempirestools.blogspot.com/' target='help'>Help and support</a> blog started.<br><br>Added - 'Check for Updates' feature.<br><br>Fleet Scanner and AET combined.</fieldset>"+
   "<div style='font-size:11px;color:#888;text-align:center;'>AET first published SEP-02-2009, previous history not available.</div>";
 document.body.appendChild(c);
}

function saveConfig(){
 setSetting('config_adjustTitles',document.getElementById('config_adjustTitles').checked);
 setSetting('config_addLocalTime',document.getElementById('config_addLocalTime').checked);
 setSetting('config_timezoneOffset',document.getElementById('config_timezoneOffset').checked);
 setSetting('config_clockOffset',document.getElementById('config_clockOffset').checked);
 setSetting('config_addEmpireSubmenu',document.getElementById('config_addEmpireSubmenu').checked);
 setSetting('config_hideNoOccs',document.getElementById('config_hideNoOccs').checked);
 setSetting('config_formatNumbers',document.getElementById('config_formatNumbers').checked);
 setSetting('config_numberDelimeter',escape(document.getElementById('config_numberDelimeter').options[document.getElementById('config_numberDelimeter').options.selectedIndex].value));
 setSetting('config_numberDecimal',escape(document.getElementById('config_numberDecimal').options[document.getElementById('config_numberDecimal').options.selectedIndex].value));
 setSetting('stripNumFormatFleet',document.getElementById('stripNumFormatFleet').checked);
 setSetting('config_copyBaseData',document.getElementById('config_copyBaseData').checked);
 setSetting('config_maxWidth',document.getElementById('config_maxWidth').checked);
 var a=parseInt(cleanNumbers(document.getElementById('config_paddingTop').value));
 if(!a || a<1 || isNaN(a)) a=0;
 setSetting('config_paddingTop',a);
 a=parseInt(cleanNumbers(document.getElementById('config_paddingRight').value));
 if(!a || a<1 || isNaN(a)) a=0;
 setSetting('config_paddingRight',a);
 a=parseInt(cleanNumbers(document.getElementById('config_paddingBottom').value));
 if(!a || a<1 || isNaN(a)) a=0;
 setSetting('config_paddingBottom',a);
 a=parseInt(cleanNumbers(document.getElementById('config_paddingLeft').value));
 if(!a || a<1 || isNaN(a)) a=0;
 setSetting('config_paddingLeft',a);
 setSetting('config_toggleBasesList',document.getElementById('config_toggleBasesList').checked);
 setSetting('config_toggleFleetsList',document.getElementById('config_toggleFleetsList').checked);
 setSetting('config_toggleBaseEconomy',document.getElementById('config_toggleBaseEconomy').checked);
 setSetting('config_toggleEmpireTechnologies',document.getElementById('config_toggleEmpireTechnologies').checked);
 setSetting('config_toggleGuildInternal',document.getElementById('config_toggleGuildInternal').checked);
 setSetting('config_clearProductionCommentsB',document.getElementById('config_clearProductionCommentsB').checked);
 setSetting('config_addFinishTimesEmpire',document.getElementById('config_addFinishTimesEmpire').checked);
 setSetting('config_addFinishTimes',document.getElementById('config_addFinishTimes').checked);
 setSetting('config_finishTimesSingleLine',document.getElementById('config_finishTimesSingleLine').checked);
 setSetting('config_24hourDisplay',document.getElementById('config_24hourDisplay').checked);
 setSetting('config_finishTimesServer',document.getElementById('config_finishTimesServer').checked);
 setSetting('config_timesServerFormat',document.getElementById('config_timesServerFormat').checked);
 setSetting('config_highlightTimeColor',escape(document.getElementById('config_highlightTimeColor').value));
 setSetting('config_highlightFinishColor',escape(document.getElementById('config_highlightFinishColor').value));
 setSetting('config_highlightNowColor',escape(document.getElementById('config_highlightNowColor').value));
 setSetting('config_highlightTodayColor',escape(document.getElementById('config_highlightTodayColor').value));
 setSetting('config_overrideAET',document.getElementById('config_overrideAET').checked);
 setSetting('config_overrideColors',document.getElementById('config_overrideColors').checked);
 if(document.getElementById('config_overrideAET').checked){
  setSetting('config_overrideLinks','#DDC040');
  setSetting('config_overrideLinksHover','#00CCDD');
  setSetting('config_overrideText','#FFFFC0');
  setSetting('config_overrideHeading','#B0E0F0');
  setSetting('config_overrideComment','#8B814C');
  setSetting('config_overrideBorder','#205680');
  setSetting('config_overrideBorderSize','3');
  setSetting('config_overrideBorderStyle','double');
  setSetting('config_overrideBorderRow','#1C1C1C');
  setSetting('config_overrideFormBorder','#8B81AC');
  setSetting('config_overrideFormBack','#125');
 }else if(document.getElementById('config_overrideColors').checked){
  setSetting('config_overrideLinks',escape(document.getElementById('config_overrideLinks').value));
  setSetting('config_overrideLinksHover',escape(document.getElementById('config_overrideLinksHover').value));
  setSetting('config_overrideText',escape(document.getElementById('config_overrideText').value));
  setSetting('config_overrideHeading',escape(document.getElementById('config_overrideHeading').value));
  setSetting('config_overrideComment',escape(document.getElementById('config_overrideComment').value));
  setSetting('config_overrideBorder',escape(document.getElementById('config_overrideBorder').value));
  setSetting('config_overrideBorderSize',escape(document.getElementById('config_overrideBorderSize').value));
  setSetting('config_overrideBorderStyle',escape(document.getElementById('config_overrideBorderStyle').value));
  setSetting('config_overrideBorderRow',escape(document.getElementById('config_overrideBorderRow').value));
  setSetting('config_overrideFormBorder',escape(document.getElementById('config_overrideFormBorder').value));
  setSetting('config_overrideFormBack',escape(document.getElementById('config_overrideFormBack').value));
 }else{
  setSetting('config_overrideLinks','');
  setSetting('config_overrideLinksHover','');
  setSetting('config_overrideText','');
  setSetting('config_overrideHeading','');
  setSetting('config_overrideComment','');
  setSetting('config_overrideBorder','');
  setSetting('config_overrideBorderSize','');
  setSetting('config_overrideBorderStyle','');
  setSetting('config_overrideBorderRow','');
  setSetting('config_overrideFormBorder','');
  setSetting('config_overrideFormBack','');
 }
 setSetting('config_highlightPlayers',document.getElementById('config_highlightPlayers').checked);
 setSetting('config_myGuild',escape(document.getElementById('config_myGuild').value));
 setSetting('config_myGuildcolor',escape(document.getElementById('config_myGuildcolor').value));
 setSetting('config_alliedGuilds',escape(document.getElementById('config_alliedGuilds').value));
 setSetting('config_alliedGuildcolor',escape(document.getElementById('config_alliedGuildcolor').value));
 setSetting('config_enemyGuilds',escape(document.getElementById('config_enemyGuilds').value));
 setSetting('config_enemyGuildcolor',escape(document.getElementById('config_enemyGuildcolor').value));
 setSetting('config_playerColors',escape(document.getElementById('config_playerColors').value));
 setSetting('config_nameLocations',document.getElementById('config_nameLocations').checked);
 setSetting('config_locationNames',escape(document.getElementById('config_locationNames').value));

 setSetting('config_cloneBaseLinks',document.getElementById('config_cloneBaseLinks').checked);
 setSetting('config_cloneFleetLinks',document.getElementById('config_cloneFleetLinks').checked);
 setSetting('config_baseLocationLinks',document.getElementById('config_baseLocationLinks').checked);
 setSetting('config_systemRemoveBorder',document.getElementById('config_systemRemoveBorder').checked);

 setSetting('config_highlightTradePartners',document.getElementById('config_highlightTradePartners').checked);
 setSetting('config_highlightPlayerColor',escape(document.getElementById('config_highlightPlayerColor').value));
 setSetting('config_highlightDuplicateTradePartners',document.getElementById('config_highlightDuplicateTradePartners').checked);
 setSetting('config_convertTradeLinks',document.getElementById('config_convertTradeLinks').checked);
 setSetting('config_highlightPoorTrades',document.getElementById('config_highlightPoorTrades').checked);
 setSetting('config_poorTradeUpperThreshold',document.getElementById('config_poorTradeUpperThreshold').value);
 setSetting('config_poorTradeLowerThreshold',document.getElementById('config_poorTradeLowerThreshold').value);
 setSetting('config_hideFullTrades',document.getElementById('config_hideFullTrades').checked);
 setSetting('config_showTradeSummary',document.getElementById('config_showTradeSummary').checked);

 setSetting('config_scannerTotals',document.getElementById('config_scannerTotals').checked);
 setSetting('config_scannerHighlight',document.getElementById('config_scannerHighlight').checked);

 setSetting('config_structuresGoals',document.getElementById('config_structuresGoals').checked);

 setSetting('config_sumCredits',document.getElementById('config_sumCredits').checked);

 setSetting('config_systemFleetScan',document.getElementById('config_systemFleetScan').checked);
 setSetting('config_locationFleetScan',document.getElementById('config_locationFleetScan').checked);
 setSetting('config_systemScanDetail',document.getElementById('config_systemScanDetail').checked);
 setSetting('systemScanThrottle',document.getElementById('systemScanThrottle').value);
 setSetting('fleetScannerThrottle',document.getElementById('fleetScannerThrottle').value);
 setSetting('config_advEmpireFleets',document.getElementById('config_advEmpireFleets').checked);
 setSetting('config_addFleetMoveShortcut',document.getElementById('config_addFleetMoveShortcut').checked);
 setSetting('config_sumFleets',document.getElementById('config_sumFleets').checked);
 setSetting('config_showRecallTime',document.getElementById('config_showRecallTime').checked);
 setSetting('config_fleetSummary',document.getElementById('config_fleetSummary').checked);

 setSetting('config_showFleetId',document.getElementById('config_showFleetId').checked);
 setSetting('config_moveRedirect',document.getElementById('config_moveRedirect').checked);
 setSetting('config_scrolltoMove',document.getElementById('config_scrolltoMove').checked);
 setSetting('config_insertMovePresets',document.getElementById('config_insertMovePresets').checked);
 setSetting('config_insertMoveIncrements',document.getElementById('config_insertMoveIncrements').checked);
 setSetting('config_insertMoveDefault',document.getElementById('config_insertMoveDefault').checked);
 setSetting('config_checkMoveLocations',document.getElementById('config_checkMoveLocations').checked);
 setSetting('config_timeHelper',document.getElementById('config_timeHelper').checked);
 setSetting('config_fleetReminders',document.getElementById('config_fleetReminders').checked);
 setSetting('config_movePresets',document.getElementById('config_movePresets').checked);
 setSetting('config_autoLaunch',document.getElementById('config_autoLaunch').checked);
 setSetting('config_addServertimeCounter',document.getElementById('config_addServertimeCounter').checked);
 setSetting('config_bigMoveButton',document.getElementById('config_bigMoveButton').checked);
 setSetting('config_showBaseLink',document.getElementById('config_showBaseLink').checked);
 setSetting('config_showLandingTime',document.getElementById('config_showLandingTime').checked);

 setSetting('config_productionRedirect',document.getElementById('config_productionRedirect').checked);
 setSetting('config_scrolltoProduction',document.getElementById('config_scrolltoProduction').checked);
 setSetting('config_enableProductionPresets',document.getElementById('config_enableProductionPresets').checked);
 setSetting('config_cloneProductionPresets',document.getElementById('config_cloneProductionPresets').checked);
 setSetting('config_enableProductionCaps',document.getElementById('config_enableProductionCaps').checked);
 setSetting('config_enableProductionPage',document.getElementById('config_enableProductionPage').checked);
 setSetting('config_bases_production',document.getElementById('config_bases_production').checked);
 setSetting('config_addProductionIncrements',document.getElementById('config_addProductionIncrements').checked);
 setSetting('config_enterProductionTime',document.getElementById('config_enterProductionTime').checked);
 setSetting('config_fixQueues',document.getElementById('config_fixQueues').checked);
 setSetting('config_maxQueues',document.getElementById('config_maxQueues').value);
 setSetting('config_enableSimpleProduction',document.getElementById('config_enableSimpleProduction').checked);

 setSetting('config_bigAttackButton',document.getElementById('config_bigAttackButton').checked);
 setSetting('config_hideAttackFleets',document.getElementById('config_hideAttackFleets').checked);
 setSetting('config_hideAttackAFleets',document.getElementById('config_hideAttackAFleets').checked);
 setSetting('config_hideAttackEFleets',document.getElementById('config_hideAttackEFleets').checked);
 setSetting('config_hideAttackOFleets',document.getElementById('config_hideAttackOFleets').checked);
 setSetting('config_hideAttackUFleets',document.getElementById('config_hideAttackUFleets').checked);
 setSetting('config_quickMoveAttack',document.getElementById('config_quickMoveAttack').checked);
 setSetting('config_locationMoveAttack',document.getElementById('config_locationMoveAttack').checked);

 setSetting('config_aetLight',document.getElementById('config_aetLight').checked);
 setSetting('config_aetLightC',document.getElementById('config_aetLightC').value);
 setSetting('config_deletePageMessages',document.getElementById('config_deletePageMessages').checked);
 setSetting('config_scrollTopBot',document.getElementById('config_scrollTopBot').checked);
 setSetting('config_QuickJump',document.getElementById('config_QuickJump').checked);

 setSetting('config_removeAdds',document.getElementById('config_removeAdds').checked);
 setSetting('config_advCapacitiesPage',document.getElementById('config_advCapacitiesPage').checked);
//  setSetting('config_commanderTotals',document.getElementById('config_commanderTotals').checked);

 notify("Settings successfully saved.");
}

function loadConfig(){
 var b={'none':0,'hidden':1,'dotted':2,'dashed':3,'solid':4,'double':5,'groove':6,'ridge':7,'inset':8,'outset':9};
 document.getElementById('config_adjustTitles').checked = getSetting('config_adjustTitles',true);
 document.getElementById('config_addLocalTime').checked = getSetting('config_addLocalTime',true);
 document.getElementById('config_timezoneOffset').checked = getSetting('config_timezoneOffset',true);
 document.getElementById('config_clockOffset').checked = getSetting('config_clockOffset',true);
 document.getElementById('config_addEmpireSubmenu').checked = getSetting('config_addEmpireSubmenu',true);
 document.getElementById('config_hideNoOccs').checked = getSetting('config_hideNoOccs',true);
 document.getElementById('config_formatNumbers').checked = getSetting('config_formatNumbers',true);
 var d = unescape(getSetting('config_numberDelimeter',","));
 if(d==' ') document.getElementById('config_numberDelimeter').options.selectedIndex=1;
 else if(d=='.') document.getElementById('config_numberDelimeter').options.selectedIndex=2;
 else if(d=='') document.getElementById('config_numberDelimeter').options.selectedIndex=3;
 else document.getElementById('config_numberDelimeter').options.selectedIndex=0;
 d = unescape(getSetting('config_numberDecimal',"."));
 if(d==',') document.getElementById('config_numberDecimal').options.selectedIndex=1;
 else document.getElementById('config_numberDecimal').options.selectedIndex=0;
 document.getElementById('stripNumFormatFleet').checked = getSetting('stripNumFormatFleet',true);
 document.getElementById('config_copyBaseData').checked = getSetting('config_copyBaseData',true);
 document.getElementById('config_maxWidth').checked = getSetting('config_maxWidth',true);
 document.getElementById('config_paddingTop').value = getSetting('config_paddingTop','4');
 document.getElementById('config_paddingRight').value = getSetting('config_paddingRight','4');
 document.getElementById('config_paddingBottom').value = getSetting('config_paddingBottom','100');
 document.getElementById('config_paddingLeft').value = getSetting('config_paddingLeft','4');
 document.getElementById('config_toggleBasesList').checked = getSetting('config_toggleBasesList',true);
 document.getElementById('config_toggleFleetsList').checked = getSetting('config_toggleFleetsList',true);
 document.getElementById('config_toggleBaseEconomy').checked = getSetting('config_toggleBaseEconomy',true);
 document.getElementById('config_toggleEmpireTechnologies').checked = getSetting('config_toggleEmpireTechnologies',true);
 document.getElementById('config_toggleGuildInternal').checked = getSetting('config_toggleGuildInternal',true);
 document.getElementById('config_clearProductionCommentsB').checked = getSetting('config_clearProductionCommentsB',true);
 document.getElementById('config_addFinishTimesEmpire').checked = getSetting('config_addFinishTimesEmpire',true);
 document.getElementById('config_addFinishTimes').checked = getSetting('config_addFinishTimes',true);
 document.getElementById('config_finishTimesSingleLine').checked = getSetting('config_finishTimesSingleLine',false);
 document.getElementById('config_24hourDisplay').checked = getSetting('config_24hourDisplay',false);
 document.getElementById('config_finishTimesServer').checked = getSetting('config_finishTimesServer',false);
 document.getElementById('config_timesServerFormat').checked = getSetting('config_timesServerFormat',false);
 document.getElementById('config_highlightTimeColor').value = unescape(getSetting('config_highlightTimeColor',"#88CCAA"));
 document.getElementById('config_highlightFinishColor').value = unescape(getSetting('config_highlightFinishColor',"#DDDDBF"));
 document.getElementById('config_highlightNowColor').value = unescape(getSetting('config_highlightNowColor',"#FF9999"));
 document.getElementById('config_highlightTodayColor').value = unescape(getSetting('config_highlightTodayColor',"#7896DE"));
 document.getElementById('config_overrideAET').checked = getSetting('config_overrideAET',true);
 document.getElementById('config_overrideColors').checked = getSetting('config_overrideColors',false);
 document.getElementById('config_overrideLinks').value = unescape(getSetting('config_overrideLinks',"#DDC040"));
 document.getElementById('config_overrideLinksHover').value = unescape(getSetting('config_overrideLinksHover',"#00CCDD"));
 document.getElementById('config_overrideText').value = unescape(getSetting('config_overrideText',"#FFFFC0"));
 document.getElementById('config_overrideHeading').value = unescape(getSetting('config_overrideHeading',"#B0E0F0"));
 document.getElementById('config_overrideComment').value = unescape(getSetting('config_overrideComment',"#8B814C"));
 document.getElementById('config_overrideBorder').value = unescape(getSetting('config_overrideBorder',"#205680"));
 document.getElementById('config_overrideBorderSize').value = unescape(getSetting('config_overrideBorderSize',"3"));
 document.getElementById('config_overrideBorderStyle').selectedIndex=b[unescape(getSetting('config_overrideBorderStyle',"double"))];
 document.getElementById('config_overrideBorderRow').value = unescape(getSetting('config_overrideBorderRow',"#1C1C1C"));
 document.getElementById('config_overrideFormBorder').value = unescape(getSetting('config_overrideFormBorder',"#8B81AC"));
 document.getElementById('config_overrideFormBack').value = unescape(getSetting('config_overrideFormBack',"#125"));
// Player Highlights
 document.getElementById('config_highlightPlayers').checked = getSetting('config_highlightPlayers',true);
 document.getElementById('config_myGuild').value = unescape(getSetting('config_myGuild',"[myGuild]"));
 document.getElementById('config_myGuildcolor').value = unescape(getSetting('config_myGuildcolor',"#9999FF"));
 document.getElementById('config_alliedGuilds').value = unescape(getSetting('config_alliedGuilds',"[allied],[ABC],[USC],[NAPS],[PACTS]"));
 document.getElementById('config_alliedGuildcolor').value = unescape(getSetting('config_alliedGuildcolor',"#99FF99"));
 document.getElementById('config_enemyGuilds').value = unescape(getSetting('config_enemyGuilds',"[badguys],[14th]"));
 document.getElementById('config_enemyGuildcolor').value = unescape(getSetting('config_enemyGuildcolor',"#FF9999"));
 document.getElementById('config_playerColors').value = unescape(getSetting('config_playerColors',"Drekons=#FF82AB,United Colonies=#B88652"));
 document.getElementById('config_nameLocations').checked = getSetting('config_nameLocations',false);
 document.getElementById('config_locationNames').value = unescape(getSetting('config_locationNames',"A12:12:12:12=my home base,A13:13:13:13=main jumpgate"));
// Map Enhancements
 document.getElementById('config_cloneBaseLinks').checked = getSetting('config_cloneBaseLinks',true);
 document.getElementById('config_cloneFleetLinks').checked = getSetting('config_cloneFleetLinks',true);
 document.getElementById('config_baseLocationLinks').checked = getSetting('config_baseLocationLinks',true);
 document.getElementById('config_systemRemoveBorder').checked = getSetting('config_systemRemoveBorder',true);
// Trade
 document.getElementById('config_highlightTradePartners').checked = getSetting('config_highlightTradePartners',true);
 document.getElementById('config_highlightPlayerColor').value = unescape(getSetting('config_highlightPlayerColor',"green"));
 document.getElementById('config_highlightDuplicateTradePartners').checked = getSetting('config_highlightDuplicateTradePartners',true);
 document.getElementById('config_convertTradeLinks').checked = getSetting('config_convertTradeLinks',true);
 document.getElementById('config_highlightPoorTrades').checked = getSetting('config_highlightPoorTrades',true);
 document.getElementById('config_poorTradeUpperThreshold').value = getSetting('config_poorTradeUpperThreshold',10);
 document.getElementById('config_poorTradeLowerThreshold').value = getSetting('config_poorTradeLowerThreshold',15);
 document.getElementById('config_hideFullTrades').checked = getSetting('config_hideFullTrades',true);
 document.getElementById('config_showTradeSummary').checked = getSetting('config_showTradeSummary',true);
// Scanners
 document.getElementById('config_scannerTotals').checked = getSetting('config_scannerTotals',true);
 document.getElementById('config_scannerHighlight').checked = getSetting('config_scannerHighlight',true);
// Structures
 document.getElementById('config_structuresGoals').checked = getSetting('config_structuresGoals',true);
// Credits
 document.getElementById('config_sumCredits').checked = getSetting('config_sumCredits',true);
// Fleet
 document.getElementById('config_systemFleetScan').checked = getSetting('config_systemFleetScan',true);
 document.getElementById('config_locationFleetScan').checked = getSetting('config_locationFleetScan',true);
 document.getElementById('config_systemScanDetail').checked = getSetting('config_systemScanDetail',true);
 document.getElementById('systemScanThrottle').value = getSetting('systemScanThrottle',30);
 document.getElementById('fleetScannerThrottle').value = getSetting('fleetScannerThrottle',30);
 document.getElementById('config_advEmpireFleets').checked = getSetting('config_advEmpireFleets',true);
 document.getElementById('config_addFleetMoveShortcut').checked = getSetting('config_addFleetMoveShortcut',true);
 document.getElementById('config_sumFleets').checked = getSetting('config_sumFleets',true);
 document.getElementById('config_showRecallTime').checked = getSetting('config_showRecallTime',true);
 document.getElementById('config_fleetSummary').checked = getSetting('config_fleetSummary',true);
// Movement
 document.getElementById('config_showFleetId').checked = getSetting('config_showFleetId',true);
 document.getElementById('config_moveRedirect').checked = getSetting('config_moveRedirect',true);
 document.getElementById('config_scrolltoMove').checked = getSetting('config_scrolltoMove',true);
 document.getElementById('config_insertMovePresets').checked = getSetting('config_insertMovePresets',true);
 document.getElementById('config_insertMoveIncrements').checked = getSetting('config_insertMoveIncrements',true);
 document.getElementById('config_insertMoveDefault').checked = getSetting('config_insertMoveDefault',true);
 document.getElementById('config_checkMoveLocations').checked = getSetting('config_checkMoveLocations',true);
 document.getElementById('config_timeHelper').checked = getSetting('config_timeHelper',true);
 document.getElementById('config_fleetReminders').checked = getSetting('config_fleetReminders',true);
 document.getElementById('config_movePresets').checked = getSetting('config_movePresets',true);
 document.getElementById('config_autoLaunch').checked = getSetting('config_autoLaunch',true);
 document.getElementById('config_addServertimeCounter').checked = getSetting('config_addServertimeCounter',true);
 document.getElementById('config_bigMoveButton').checked = getSetting('config_bigMoveButton',true);
 document.getElementById('config_showBaseLink').checked = getSetting('config_showBaseLink',true);
 document.getElementById('config_showLandingTime').checked = getSetting('config_showLandingTime',true);
// Construction / Production
 document.getElementById('config_productionRedirect').checked = getSetting('config_productionRedirect',true);
 document.getElementById('config_scrolltoProduction').checked = getSetting('config_scrolltoProduction',true);
 document.getElementById('config_enableProductionPresets').checked = getSetting('config_enableProductionPresets',true);
 document.getElementById('config_cloneProductionPresets').checked = getSetting('config_cloneProductionPresets',true);
 document.getElementById('config_enableProductionCaps').checked = getSetting('config_enableProductionCaps',true);
 document.getElementById('config_enableProductionPage').checked = getSetting('config_enableProductionPage',true);
 document.getElementById('config_bases_production').checked = getSetting('config_bases_production',true);
 document.getElementById('config_addProductionIncrements').checked = getSetting('config_addProductionIncrements',true);
 document.getElementById('config_enterProductionTime').checked = getSetting('config_enterProductionTime',true);
 document.getElementById('config_fixQueues').checked = getSetting('config_fixQueues',true);
 document.getElementById('config_maxQueues').value = getSetting('config_maxQueues',7);
 document.getElementById('config_enableSimpleProduction').checked = getSetting('config_enableSimpleProduction',true);
// Attack
 document.getElementById('config_bigAttackButton').checked = getSetting('config_bigAttackButton',true);
 document.getElementById('config_hideAttackFleets').checked = getSetting('config_hideAttackFleets',true);
 document.getElementById('config_hideAttackAFleets').checked = getSetting('config_hideAttackAFleets',true);
 document.getElementById('config_hideAttackEFleets').checked = getSetting('config_hideAttackEFleets',false);
 document.getElementById('config_hideAttackOFleets').checked = getSetting('config_hideAttackOFleets',false);
 document.getElementById('config_hideAttackUFleets').checked = getSetting('config_hideAttackUFleets',false);
 document.getElementById('config_quickMoveAttack').checked = getSetting('config_quickMoveAttack',true);
 document.getElementById('config_locationMoveAttack').checked = getSetting('config_locationMoveAttack',true);
// Misc
 document.getElementById('config_aetLight').checked = getSetting('config_aetLight',true);
 document.getElementById('config_aetLightC').value = getSetting('config_aetLightC','#111625');
 document.getElementById('config_deletePageMessages').checked = getSetting('config_deletePageMessages',true);
 document.getElementById('config_scrollTopBot').checked = getSetting('config_scrollTopBot',true);
 document.getElementById('config_QuickJump').checked = getSetting('config_QuickJump',true);
// Free Upgrade Pages
 document.getElementById('config_removeAdds').checked = getSetting('config_removeAdds',true);
 document.getElementById('config_advCapacitiesPage').checked = getSetting('config_advCapacitiesPage',true);
//  document.getElementById('config_commanderTotals').checked = getSetting('config_commanderTotals',true);
}


/****************
  Main Script
****************/
if(wlh.indexOf('combat.aspx?fleet=')!=-1 && getSetting('bigAttackButton',true)) bigAttackButton();
insertConfigLink();

if(getSetting('config_overrideColors',false) || getSetting('config_overrideAET',true)){
 document.styleSheets[1].cssRules[0].style.backgroundColor=unescape(getSetting('config_overrideFormBack','#339'));
 GM_addStyle('BODY{background-attachment:fixed;}INPUT[type="submit"]:hover,INPUT[type="reset"]:hover,INPUT[type="button"]:hover{color:'+unescape(getSetting('config_overrideLinks','gold'))+';}INPUT[type="submit"],INPUT[type="reset"],INPUT[type="button"]{cursor:pointer;}MARQUEE{color:'+unescape(getSetting('config_overrideText','#FFF'))+';}A:link,A:visited{color:'+unescape(getSetting('config_overrideLinks','gold'))+';}A:hover{color:'+unescape(getSetting('config_overrideLinksHover','silver'))+';}BODY{color:'+unescape(getSetting('config_overrideText','#FFF'))+';}TH{color:'+unescape(getSetting('config_overrideHeading','#FFF'))+';border-color:'+unescape(getSetting('config_overrideBorderRow','#003'))+';}INPUT,SELECT,TEXTAREA{color:'+unescape(getSetting('config_overrideText'),'#FFF')+';border-color:'+unescape(getSetting('config_overrideFormBorder','#99F'))+';background-color:'+unescape(getSetting('config_overrideFormBack','#006'))+';}TABLE{border:'+unescape(getSetting('config_overrideBorderSize','2'))+'px '+unescape(getSetting('config_overrideBorderStyle','ridge'))+' '+unescape(getSetting('config_overrideBorder','#99F'))+';}TD{border-color:'+unescape(getSetting('config_overrideBorderRow','#003'))+';}.help{color:'+unescape(getSetting('config_overrideComment','#999'))+';}');
}
if(getSetting('config_aetLight',true)){
 GM_addStyle('.aetLight TBODY TR:hover{background-color:'+unescape(getSetting('config_aetLightC','#111625'))+' !important;}.row_over td,.row_active td{background:#141418;}.row_over th,.row_active th{background:transparent none;}');
 unsafeWindow.getIEVersion=function(){return false;}
 unsafeWindow.rowOver=function(){return false;}
 unsafeWindow.rowOut=function(){return false;}
}
GM_addStyle('.AETbut{padding:1px 1px 0 1px;font-size:10px;font-weight:500;}');

/**** Adjust Page Titles ****/
if(getSetting('config_adjustTitles',true)) adjustTitles();

/****Remove Adds ****/
if(document.getElementById('advertising') && getSetting('config_removeAdds',true)) removeAdds();
if(wlh.indexOf('messages.aspx')!=-1){
 if(getSetting('config_removeAdds',true) && document.getElementsByTagName('iframe')[0]) document.getElementsByTagName('iframe')[0].parentNode.removeChild(document.getElementsByTagName('iframe')[0]);
 if(getSetting('config_deletePageMessages',true)) deletePageMessages();
}

/**** Add Local Time ****/
if(getSetting('config_addLocalTime',true)) addLocalTime();

if(getSetting('config_fleetReminders',true) && (getSetting("FleetReminders","-") != "-")) insertFleetReminderCountdowns();

/**** Quick Jump Links ****            *not needed but return if this    if(wlh.indexOf('ranks.aspx')==-1 && wlh.indexOf('tables.aspx')==-1 && wlh.indexOf('tutorial.aspx')==-1 && wlh.indexOf('contact.aspx')==-1 && wlh.indexOf('links.aspx')==-1) return; */
if(getSetting('config_QuickJump',true)){
 quickJumpLinks();
 if(wlh.indexOf('contacts.aspx')!=-1) saveContacts();
 if(wlh.indexOf('bookmarks.aspx')!=-1) saveBookmarks();
}
if(wlh.indexOf('fleet.aspx?fleet=')!=-1){
 if(getSetting('config_quickMoveAttack',true)) quickMoveAttack();
 if(getSetting('config_showRecallTime',true)) showRecallTime();
}

/**** Adjust Max Width ****/
if(getSetting('config_maxWidth',true)) adjustMaxWidth();

/**** Insert Empire Menu ****/
if((wlh.indexOf('view=move')==-1 || wlh.indexOf('=move_start')!=-1) && getSetting('config_addEmpireSubmenu',true)) insertEmpireMenu();

/**** Advanced Fleet Page ****/
if(wlh.indexOf('empire.aspx?view=fleets')!=-1 && getSetting('config_advEmpireFleets',true)) sumShips();

/**** Advanced Trade Page ****/
if(wlh.indexOf('empire.aspx?view=trade')!=-1){
 if(getSetting('config_convertTradeLinks',true)) convertTradeLinks();
 if(getSetting('config_highlightDuplicateTradePartners',true)) checkTradePage();
 if(getSetting('config_highlightPoorTrades',true)) findPoorTrades();
 if(getSetting('config_hideFullTrades',true)) insertToggleLink();
 if(getSetting('config_showTradeSummary',true)) showTradeSummary();
}

/**** Finish Times ****/
if(wlh.indexOf("empire.aspx")==-1){
 if(getSetting('config_addFinishTimes',true)) addFinishTimes();
}
else {
 if(getSetting('config_addFinishTimesEmpire',true)) addFinishTimes();
 if(getSetting('config_QuickJump',true)) addNoteLinks();
}

/**** Advanced Production ****/
if(wlh.indexOf("base.aspx")!=-1 && (getView()=="Production" || getView()=="Structures" || getView()=="Defenses" || getView()=="Research") && wlh.indexOf('&info=')==-1){
 if(getSetting('config_fixQueues',true)) fixQueues();
 if(getView()=="Production"){
   registerTextBoxEventListeners();
   if(getSetting('config_enableProductionPresets',true)) insertProductionPresetsButtons();
   if(getSetting('config_enableProductionCaps',true)) enableProductionCaps();
   if(getSetting('config_enterProductionTime',true)) insertTimeTextBoxes();
   if(getSetting('config_productionRedirect',true)) productionRedirect();
 }
 clearProductionComments();
 if(getView()=="Production" && getSetting('config_scrolltoProduction',true) && !(document.getElementById('smplProd') && document.getElementById('smplProd').checked)){
   if(getSetting('scrolltoProduction','')!='' && wlh.indexOf('&action=cancel')==-1) scrollTo(0,(getSetting('scrolltoProduction','')=='bottom')?document.body.offsetHeight:document.getElementById('base_production').offsetTop);
   scrolltoProduction();
 }
}
if(((wlh.indexOf('empire.aspx')!=-1 && wlh.indexOf('?')==-1) || wlh.indexOf('empire.aspx?view=bases_events')!=-1) && getSetting('config_enableProductionPage',true)) enableProductionPage();
if(wlh.indexOf('empire.aspx?view=bases_production')!=-1 && getSetting('config_bases_production',true)) bases_production(true);

/**** Fleet Summary ****/
if(wlh.indexOf("base.aspx?base=")!=-1 || wlh.indexOf("map.aspx?loc=")!=-1){
 if(getSetting('config_sumFleets',true)) sumFleets();
 if(getSetting('config_locationMoveAttack',true)) locationMoveAttack();
 if(wlh.indexOf("view=trade&action=new")!=-1 && getSetting('config_QuickJump',true)) showMoveQL();
}

if(wlh.indexOf("fleet.aspx?fleet=")!=-1 && wlh.indexOf('view=')==-1 && getSetting('config_sumFleets',true)) sumSingleFleet();

/**** Fleet/Base Page Features ****/
if(wlh.indexOf("base.aspx")!=-1 && getView()=="" && getSetting('config_cloneBaseLinks',true)){
  copyBaseLinks();
}
if(wlh.indexOf("fleet.aspx")!=-1 && (getView()=="" || wlh.indexOf('gal=') != -1) && getSetting('config_cloneFleetLinks',true)){
  copyFleetLinks();
}
if(wlh.indexOf("map.aspx?loc=")!=-1 && wlh.match(/\d\d:\d\d:\d\d:\d\d/)==null){
 if(getSetting('config_baseLocationLinks',true)) baseLocationLinks();
 if(getSetting('config_systemFleetScan',true)) systemFleetScan();
 if(getSetting('config_systemRemoveBorder',true)) systemRemoveBorder();
}

if(wlh.indexOf("fleet.aspx")!=-1 && (wlh.indexOf("?")==-1 || wlh.indexOf('gal=') != -1 || wlh.indexOf('=move_start')!=-1) && getSetting('config_addFleetMoveShortcut',"true")){
 addFleetMoveShortcut();
}

/**** Advanced Scanners ****/
if(wlh.indexOf('empire.aspx')!=-1 && getView()=='Scanners'){
 formatScanners();
}

/**** Advanced Structures Page ****/
if(wlh.indexOf('empire.aspx?view=structures')!=-1){
 saveBases();
 if(getSetting('config_structuresGoals',true)){
   if(wlh.indexOf("mode=edit")!=-1) insertEditRows();
   else insertBaseSettingLinks();
 }
}

/**** Sum Credits ****/
if(wlh.indexOf('credits.aspx')!=-1 && getSetting('config_sumCredits',true)) sumCreditsPage();

/**** Site-wide & Movement ****/
if(wlh.indexOf('view=move')==-1 || wlh.indexOf('=move_start')!=-1){
 if(getSetting('config_highlightTradePartners',true) || getSetting('config_highlightPlayers',true)){
   if(getSetting('config_highlightTradePartners',true)) checkTradeDataAge();
   highlightPlayers();
 }
// checkTechDataAge();
 if(getSetting('config_nameLocations',false) && getSetting('config_locationNames',"A12:12:12:12=my home base,A13:13:13:13=main jumpgate")!='') replaceLocationNames();
 if(wlh.indexOf('map.aspx?loc=')!=-1 && wlh.split('?')[1].split(':')[1]!=undefined){
  if(getSetting('config_insertMoveDefault',true)) insertSetAsDefaultDest();
  if(getSetting('config_copyBaseData',true)) copyLocData();
 }
}else{
 useWormhole();
 if(getSetting('config_insertMovePresets',true)) insertMoveFleetLinks();
 if(getSetting('config_insertMoveIncrements',true)) insertMoveIncrements();
 if(getSetting('config_insertMoveDefault',true) && wlh.indexOf('use=wormhole')==-1) insertMoveDefault();
 if(getSetting('config_addServertimeCounter',true)) addServertimeCounter();
 bigMoveButton();
 showLandingTime();
 if(getSetting('config_moveRedirect',true)) moveRedirect();
 if(getSetting('scrolltoMove',false) && !document.getElementById('time1') && getSetting('config_scrolltoMove',true)) scrollTo(0,document.getElementById('fleet_move').previousSibling.previousSibling.offsetTop);
 if(getSetting('config_scrolltoMove',true)) scrolltoMove();
 if(getSetting('config_showFleetId',true)) showFleetId();
 if(getSetting('config_checkMoveLocations',true)) checkMoveLocations();
 if(getSetting('config_QuickJump',true)) showMoveQL();
 if(getSetting('config_timeHelper',true)) insertArriveTimeTextBox();
 if(getSetting('config_movePresets',true)) enableMovePresets();
 document.getElementById('detect').previousSibling.style.color=unescape(getSetting('config_overrideText','#FFF'));
 if(getSetting('config_showBaseLink',true)) showBaseLink();
}

/**** Fleet Scanner ****/
if(wlh.indexOf('map.aspx?')!=-1 || wlh.indexOf('base.aspx?base=')!=-1){
 fleetScanner();
 if(getSetting('config_QuickJump',true)) addNoteLoc();
 if(wlh.indexOf('?loc=')!=-1) aetLight();
}

/**** Show / Hide Links ****/
if(wlh.indexOf('empire.aspx?view=economy')!=-1){
 saveEmpireBases();
 hideBasesEconomy();
 if(getSetting('config_hideNoOccs',true)) hideNoOccs();
 if(getSetting('config_QuickJump',true)) saveOccupations();
}
if(wlh.indexOf('fleet.aspx')!=-1 && (wlh.indexOf('?')==-1 || wlh.indexOf('?gal=')!=-1)){
 hideFleetsList();
 if(getSetting('config_movePresets',true)) enablePresetData();
 aetLight();
}
if(wlh.indexOf('move_start')!=-1){
 autoResult();
 aetLight();
}
if(wlh.indexOf('base.aspx')!=-1 && (wlh.indexOf('?')==-1 || wlh.indexOf('?gal=')!=-1)){
 hideBasesList();
 if(getSetting('config_QuickJump',true)) addNoteLinks();
}
if(wlh.indexOf('empire.aspx?view=technologies')!=-1){
 clearProductionComments();
 hideEmpireTechnologies();
}
if(wlh.indexOf('guild.aspx')!=-1){
 if(wlh.indexOf('?info=')==-1){
  hideGuildInternal();
  if(getSetting('config_QuickJump',true)) addNoteLinks();
 }
 aetLight();
}
// Attack
if(wlh.indexOf('fleet.aspx?')!=-1 && wlh.indexOf('&view=attack')!=-1){
 if(getSetting('config_hideAttackFleets',true)) hideAttackButtons();
 if(getSetting('config_hideAttackAFleets',true) || getSetting('config_hideAttackEFleets',false) || getSetting('config_hideAttackOFleets',false) || getSetting('config_hideAttackUFleets',false)) hideAttackFleets();
}

if(wlh.indexOf('notes.aspx')!=-1 && wlh.indexOf('?')==-1 && getSetting('config_QuickJump',true)) quickNotes();
if(wlh.indexOf('profile.aspx?player=')!=-1 && getSetting('config_QuickJump',true)) addNoteLinks();
if(wlh.indexOf('empire.aspx?view=units')!=-1 && getSetting('config_fleetSummary',true)) fleetSummary();

/**** Free Capacities Page ****/
if(wlh.indexOf('empire.aspx?view=bases_capacities')!=-1 && document.getElementById('empire_upgraded-only') && getSetting('config_advCapacitiesPage',true)) advCapacitiesPage();
// if(wlh.indexOf('empire.aspx?view=bases_capacities')!=-1 && getSetting('config_commanderTotals',true)) commanderTotals();

if(wlh.indexOf('base.aspx')!=-1 || wlh.indexOf('empire.aspx')!=-1 || wlh.indexOf('credits.aspx')!=-1 || wlh.indexOf('bookmarks.aspx')!=-1 || wlh.indexOf('notes.aspx')!=-1 || (wlh.indexOf('commander.aspx')!=-1 && wlh.indexOf('?')==-1)) aetLight();
if(wlh.indexOf("base.aspx?base=")!=-1 && wlh.indexOf('&')==-1){
 storeBaseData(wlh.split('=')[1]);
 if(getSetting('config_copyBaseData',true)) copyBaseData();
}
