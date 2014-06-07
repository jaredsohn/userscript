// ==UserScript==
// @name   KoC Monitor v1.93
// @namespace   http://kocmon.com/
// @description  This is a set of tools provided by kocmon.com
// @include   http://*.kingdomsofcamelot.com/fb/e2/src/main_src.php*
// @include   http://kocmon.com/*
// @require   json.js
// ==/UserScript==

var VERSION=193;
var WEBSITEURL='http://kocmon.com/';
var SCRIPTNAME='Kocmonitor';
var SENDINFODELAY=600000;
var UPDATEDELAY=604800000;
function custom_setValue(k,v){
 GM_setValue(k,v);
}
function custom_getValue(k,dv){
 return(GM_getValue(k,dv));
}
function custom_deleteValue(k){
 GM_deleteValue(k);
}
function getSavedInfo(){
 return(custom_getValue('ajaxparams',null));
}
function getSavedServerId(){
 return(custom_getValue('sid'));
}
function getSavedCityId(sid){
 var k=sid+'_cities';
 var saved=custom_getValue(k,null);
 return(saved.split(','));
}
function putSavedCityId(sid,v){
 var k=sid+'_cities';
 var saved=custom_getValue(k,null);
 if(!saved || saved==''){
  custom_setValue(k,v);
 }else{
  var found=false;
  saved=saved.split(',');
  for(var i=0;i<saved.length;i++){
   if(saved[i]==v){
    found=true;
    break;
   }
  }
  if(found==false){
   custom_setValue(k,saved+','+v);
  }
 }
}
function update(){
 var n=SCRIPTNAME.toLowerCase();
 GM_xmlhttpRequest({
  method: "GET",
  url: WEBSITEURL+'ajax/version.php?script='+n,
  onload: function(r) {
   var s=parseInt(r.responseText)*1;
   //alert(s+"\n"+VERSION);
      if(s && s>VERSION){
       GM_log('KoC Monitor out of date');
       //if(confirm('There is an update available.\nWould you like to go to the install page now?')){
        GM_openInTab(WEBSITEURL+'files/greasemonkey/'+n+'/app.user.js');        
       //}
      }else{
       GM_log('KoC Monitor up to date');
      }
  }
 });  
}
if (document.location.toString().match('src/main_src.php')) {
 var LASTCOMMAND=custom_getValue('command',null);

 //update
 var date=new Date();
 var now=''+date.getTime();
 var delay=UPDATEDELAY;//1 week
 var lastupdate=custom_getValue('lastupdate',0)*1;
 if(now-lastupdate>=delay){
  custom_setValue('lastupdate',now+'');
  update();
 }
 function getCurrentCityId(){
  return(''+unsafeWindow.currentcityid);
 }
 function getServerId(){
  return(1*unsafeWindow.g_server); 
 }
 function getServerName(){
  return;
 }
 function getUserId(){
  return(unsafeWindow.g_ajaxparams['tvuid']);
 }
 function send(str, url, callback, method) {
  //debug('SEND->'+"\n"+url+"\n"+str);
  GM_xmlhttpRequest( {
   method : 'POST',
   url : url,
   headers : {
    "Content-type" : "application/x-www-form-urlencoded"
   },
   data : str,
   onreadystatechange : function(r) {
   },
   onload : function(r) {
    if(r && r.status!=200){
     var s='';
     if(r.status){s=s+'\n'+'status:'+r.status;}
     if(r.statusText){s=s+'\n'+'statusText'+r.statusText;}
     if(r.responseHeaders){s=s+'\n'+'responseHeaders'+r.responseHeaders;}
     if(r.responseText){s=s+'\n'+'responseText'+r.responseText;}
     if(r.readyState){s=s+'\n'+'readyState'+r.readyState;}
     debug('SERVER ERROR->'+"\n"+s);
     return;
    }else{
     //GM_log('RECIEVED '+"\n"+r.responseText);     
    }
    if (callback) {
     callback(r);
    }
   }
  });
 }
 function debug(msg,type){
  switch(type){
   default:
    GM_log(msg);
    break;
  }
 }
 function addScript(source) {
  if ('function' == typeof source) {
   source = '(' + source + ')();';
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
 }
 function addListeners() {
  setInterval(function(){
   sendInfo();
  }, SENDINFODELAY);
  setInterval(function(){
   if (unsafeWindow.koc_monitor){
    if(unsafeWindow.koc_monitor.data){
    }
    sendInfo();
   }
  }, 1000*60*10);
  setInterval(function(){
   website();
  }, 1000); 
 }
 function getCurrentInfo(){
  if(unsafeWindow.g_ajaxparams){
   //GM_log(JSON.stringify(unsafeWindow.g_ajaxparams));
   return(JSON.parse(JSON.stringify(unsafeWindow.g_ajaxparams)));
  }
 }
 function getCityInfo(){
  var cities = new Array();
  if(unsafeWindow.seed && unsafeWindow.seed.cities){ 
   var cid, n, x, y, tid, city, i;
   for(i in unsafeWindow.seed.cities) {
    if(unsafeWindow.seed.cities[i].hasOwnProperty(i)){
     city = new Object();
     city.cid = unsafeWindow.seed.cities[i][0];
     city.n = unsafeWindow.seed.cities[i][1];
     city.x = unsafeWindow.seed.cities[i][2];
     city.y = unsafeWindow.seed.cities[i][3];
     //city.pid = seed.cities[i][4];
     //city.tid = seed.cities[i][5];
     cities.push(city);
     //this.debug('found '+city.cid);
    }
   }
  }
  return cities;  
 }
 function saveInfo(){
  var info=JSON.stringify(getCurrentInfo());
  if(info){
   var sid=getServerId();
   custom_setValue('ajaxparams',info);
   custom_setValue('sid',sid); 
  }
 }
 function sendInfo(){
  if (unsafeWindow.g_ajaxparams && unsafeWindow.g_server) {
   GM_log('kocmon.com - updated info');
   var info=JSON.stringify(getCurrentInfo());
   //GM_log(info);
   custom_setValue('ajaxparams',info);
   send('send=info&s='+getServerId()+'&u='+getUserId()+'&data='+encodeURIComponent(info),WEBSITEURL+'ajax/kocmonitor.php');
  }  
 }
 function sendCity(force){
  if (unsafeWindow.seed && unsafeWindow.g_server) {
   GM_log('kocmon.com - updated cities');
   var sid=getServerId();
   var k=sid+'_cities';
   var cities=getCityInfo();
   var info=JSON.stringify(cities);
   if(force){
    custom_setValue(k,info);
    send('send=cities&s='+getServerId()+'&u='+getUserId()+'&data='+encodeURIComponent(info),WEBSITEURL+'ajax/kocmonitor.php');
   }else{
    var v=custom_getValue(k);
    if(v!=info){
     custom_setValue(k,info);
     send('send=cities&s='+getServerId()+'&u='+getUserId()+'&data='+encodeURIComponent(info),WEBSITEURL+'ajax/kocmonitor.php');     
    }
   }
  }
 }
 function sanatizeAndReturnInt(str){return 1*str;}
 function sanatizeAndReturnText(str){return ''+str;}
 function website(){
  var command=custom_getValue('command',null);
  if(command !='' && command!=LASTCOMMAND){
   LASTCOMMAND=''+command;
   GM_log('new command='+command);
   var js='';
   var cmd=command.split('|');  
   var tmp=cmd.shift();
   var sid=cmd.shift();
   var type=cmd.shift();
   switch(type){
    case 'script'://koc.dannywilkerson.com only for security reasons
     js=''+cmd[0];
    break;
    case 'location':
     var x=sanatizeAndReturnInt(cmd[0]);
     var y=sanatizeAndReturnInt(cmd[1]);
     js='setBookmarkCoord('+x+','+y+');';
    break;
    case 'bookmark':
     var tid=sanatizeAndReturnInt(cmd[0]);
     var n=sanatizeAndReturnText(cmd[1]);
     js='setBookmarkLocation('+tid+','+n+');';
    break;
    default:
    break;
   }
   GM_log('js='+js+' sid='+sid+' type='+type);
   if(js!=''){
    if(sid!='' && sid!='all'){
     js="if(g_server=='"+sid+"'){"+js+"}";
    }   
    addScript(js);
   }
  }
 }
 //*********************************************************************
 function init(){
  addListeners();
  saveInfo();
  var now=1*(new Date().getTime());
  var lastsend = custom_getValue('lastsend',0); lastsend=1*lastsend; //pointless redundency for fun
  if(now-lastsend>600000){//(2 hours)
   custom_setValue('lastsend', ''+now+'');
   sendInfo();
   sendCity();
  }
 }
 setTimeout(function(){
  init();
 },10000);
} else if(document.location.toString().match('http://kocmon.com/') || document.location.toString().match('http://www.kocmon.com/')) {
 //website
 var obj=document.getElementById('kocmonitor');
 if(obj){
  var sid=getSavedServerId();
  var info=encodeURIComponent(getSavedInfo());
  var path = document.location.pathname;
  path.substring(path.indexOf('/', 1)+1, path.lastIndexOf('/'));
  path=window.location.protocol+'//'+window.location.host+path;
  //document.writeln(unescape(URL.substring(0,(URL.lastIndexOf("/")) + 1)));
  var type=obj.getAttribute('rel');
  switch(type){
   case 'login':
    if(info && info!='null' && info!='undefined'){
     obj.innerHTML='<form method="post" action="'+path+'"><input type="hidden" name="sid" value="'+sid+'" /><input type="hidden" name="ajaxparams" value="'+info+'" /><input type="hidden" name="kocmonitor" value="1" /><input type="submit" value="KoC Login" title="" /></form>';    
    }else{
     obj.innerHTML='Please run the <a href="http://apps.facebook.com/kingdomsofcamelot/">game</a> then refresh this page so <a href="'+path+'kocmonitor.user.js">'+SCRIPTNAME+' ver '+VERSION+'</a> can log you in';      
    }
   break;
   case 'logout':
    obj.innerHTML='<form method="post" action="'+path+'"><input type="hidden" name="cmd" value="logout" /><input type="submit" value="KoC Logout" /></form>';
   break;
   default:

   break;
  }
 }
 obj=document.getElementById('content');
 if(obj){
  var allContainedElements = obj.getElementsByTagName("*");
  var sid=0;
  var node=null;
  for (var i = 0; i < allContainedElements.length; i++) {
   var elem = allContainedElements[i];
   var rel=elem.getAttribute('rel');
   if(rel && rel !=''){
    if(rel.indexOf('koc')==0){
     var node=document.createElement('a');
     node.setAttribute('href','#');
     node.setAttribute('onclick','return false');
     node.innerHTML=elem.innerHTML;
     elem.innerHTML='';
     elem.appendChild(node);
     elem.addEventListener('click', function(rel){
      custom_setValue('command',this.getAttribute('rel')+'|'+new Date().getTime());
      custom_setValue('sendNextMap','1');
     }, true);    
    }
   }
  }
 }
}else{
 
}