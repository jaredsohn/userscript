// ==UserScript==
// @name          VKOpt 1.7.x
// @author        [Admin] (http://vkopt.net.ru/) or VkOpt ( /id14782277 ) & KiberInfinity( /id13391307 )
// @namespace     http://vkopt.net.ru/
// @description   Vkontakte Optimizer 1.7.x
// @include       *vkontakte.ru*
// @include       *vkadre.ru*
// @include       *vk.com*
// ==/UserScript==
//
// (c) All Rights Reserved. VkOpt.
//

var vVersion	= 172;
var vBuild = 100403;
var vRelCand=4;
var DefSetBits='yyyyyyyyyyyynyyyynnyynyyyy1y0y0nnnyyy0nnynnyyyyyyyyyyynyyyynn11nynnnyyyyn0-1-1-3-0-15-15-0-0_0-#CCFF99-#666666';
var DefExUserMenuCfg='11111110111111111111';
var vk_DEBUG=true;
const vk_check_page_timeout=2500;
const vk_upd_menu_timeout=20000; //ms
var vk_showinstall=true;
var vkBlockRedirect=true;
var vkLdrImg='<img src="/images/upload.gif">';

function InstallRelease(){
  vksetCookie('vkOVer',String(vVersion));
  vksetCookie('vkplayer','00-0_0');
  if (!vkgetCookie('remixbit')) vksetCookie('remixbit',DefSetBits);
  //backup friend check settings
  if (vkgetCookie('remixbit')){
  var frnote=getSet('-',7);
  var fropt=getSet(21);
  var frday=getSet('-',2);}

  //set default settings
  if (!vkgetCookie('vkOVer') || vkgetCookie('vkOVer')<171){
    vksetCookie('remixbit',DefSetBits);

    //set friend check settings from backup
    if(frnote){setSet('-',frnote,7);}
    if(frday){setSet('-',frday,2);}
    if(fropt){setCfg('21',fropt);}
  }

  setCfg('59','y');
  setCfg('60','y');
  setCfg('61','1');
  setCfg('62','1');
  setCfg('63','n');
  setCfg('64','y');


  vkMsg_Box = new MessageBox({title: IDL('THFI')});
  vkMsg_Box.removeButtons();
  vkMsg_Box.addButton({
    onClick: function(){vkMsg_Box.hide( 200 );},
    style:'button_no',label:'OK'});
  //vkMsgBox.loadContent("friends_ajax.php",{fid: fid, act: 'decline_friend', hash: friendsData.hash}).show();
  var cont=IDL('YIV')+'<b>'+String(vVersion).split('').join('.')+'</b> (build <b>'+vBuild+'</b>)<br><br>'+IDL('INCD')+'<b>'+IDL('FIS')+'</b>';
  vkMsg_Box.content(cont).show();
//  }
}

function showjsurl(){
 var nows=  new  Date(); var datsig=nows.getYear()+"_"+nows.getMonth()+"_"+nows.getDate()+"_";
 datsig+=Math.floor(nows.getHours()/4);
 alert("?"+datsig);
}
function vksetCookie(cookieName,cookieValue,nDays,domain)
{
	var today = new Date();
	var expire = new Date();
	if (nDays==null || nDays==0) nDays=365;
	expire.setTime(today.getTime()+ 3600000*24*nDays);
	document.cookie= cookieName+ "="+ escape(cookieValue)+
	";expires="+ expire.toGMTString()+
	((domain) ? ";domain=" + domain : ";domain="+location.host);

}

function vkgetCookie(name,temp)
{
if (name=='remixmid') { if (temp) return false; else { tmp=remixmid(); return tmp; } }
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1)
	{
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	}
	else
	{
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
	{
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

/*Array.prototype.shuffle = function( b )
{
 var i = this.length, j, t;
 while( i ) 
 {
  j = Math.floor( ( i-- ) * Math.random() );
  t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  this[i] = this[j];
  this[j] = t;
 }

 return this;
};*/


function vkAddScript(jsrc){
  for (var i=0;i<arguments.length;i++){  
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = arguments[i];
    document.getElementsByTagName('head')[0].appendChild(js);
  }
}


function Inject2Func(func,inj_code,to_end){      //inject you code to any functions Example:  Inject2Func("makeFRequest","alert(url);");
  var s=eval(func).toString();
  var re=new RegExp("function.*\\((.*)\\)[\\s\\S]{0,1}{([\\s\\S]+)}$","im");
  s=s.match(re);  // /function.*\((.*)\).*{([\s\S]+)}$/im
  s=(to_end)?func+'=function('+s[1]+'){'+s[2]+' '+inj_code+'}':func+'=function('+s[1]+'){'+inj_code+' '+s[2]+'}';
  eval(s);
}

function Inject2Func_2(func,inj_code,after_str){
  var s=eval(func).toString();
  var re=new RegExp("function.*\\((.*)\\).*{([\\s\\S]+)}$","im");
  var re2=new RegExp("function.*\\((.*)\\)[\\s\\S]{0,1}{([\\s\\S]+)}$","im");
  s=s.match(re2); //  /function.*\((.*)\).*{([\s\S]+)}$/im

  s[2]=s[2].split(after_str).join(after_str+' '+inj_code+' ');
  s=func+'=function('+s[1]+'){'+s[2]+'}';
  eval(s);
}

function RepCodeInFunc(func,inj_code,rep_str){
  var s=eval(func).toString();
  var re=new RegExp("function.*\\((.*)\\)[\\s\\S]{0,1}{([\\s\\S]+)}$","im");
  s=s.match(re);  // /function.*\((.*)\).*{([\s\S]+)}$/im
  s[2]=s[2].split(rep_str).join(inj_code);
  //s[2]=s[2].replace(rep_str,inj_code);
  s=func+'=function('+s[1]+'){'+s[2]+'}';
  eval(s);
}

function vkInject2Ajax(){
var dloc=document.location.href;


  if (ge('content')){  //inj to search query for friendslist
    var exmnu="<a style='font-size:6px;' id='pup\"+res[i][0]+\"' onmouseover='pupShow(\"+res[i][0]+\",\"+res[i][0]+\"); return false;'>&#9660; </a>";
    var injcode=" <div style='float:left; padding: 10px 2px 4px 0px;'>"+exmnu+"</div> ";
    Inject2Func_2("friendFilter",injcode,'str += "');  //end of inj
    RepCodeInFunc('friendFilter',"if (l > 16) {l = 16;}","if (l > 10) {l = 10;}");}    //16 items on FriendsFilter
    
    //alternative profile
    if (getSet(67)=='y'){RepCodeInFunc('friendFilter',"AlternativeProfile(\"+res[i][0]+\"); hide('qfriends'); toggleFlash(true, 20);",'window.location=\'"+base_domain+"id"+res[i][0]+"\'');}



  if(typeof getWallPage!='undefined' && ge('wall')) {//wall
    Inject2Func_2("getWallPage","InitWallExt(); onChangeContent(); VkoptAudio(true); vkDownLinkOnWall();","parseResponse(text);");
    if (typeof postIt!='undefined'){
    Inject2Func_2("postIt","InitWallExt(); onChangeContent(); VkoptAudio(true);  ","parseResponse(text);");}
  }

  if (vkBlockRedirect){//block  redirect from wall to profile when send media
    injcode="  (!location.href.match(/to_id=-/i))?'wall.php?id='+location.href.match(/to_id=(\\\d+)/i)[1]:";
    if (typeof postAudioOnWall!='undefined'){  Inject2Func_2("postAudioOnWall",injcode,"window.location =");}    // (vkBlockRedirect)?((!location.href.match(/to_id=-/i))?'wall.php?id='+location.href.match(/to_id=(\\\d+)/i)[1]:'wall.php?gid='+location.href.match(/to_id=-(\\\d+)/i)[1]):" - with group
    if (typeof postVideoOnWall!='undefined'){  Inject2Func_2("postVideoOnWall",injcode,"window.location =");}
    if (typeof post_on_wall   !='undefined'){  Inject2Func_2("post_on_wall",injcode,"window.location =");} //photo
    injcode="  (true)?'wall.php?id='+ge('header').innerHTML.match(/id(\\\d+)/i)[1]:";     //graffiti
    //'wall.php?id='+ge('header').innerHTML.match(/(gid=\d+)|(id\D*\d+)/i)[1]
    if (typeof post_to_wall   !='undefined'){  Inject2Func_2("post_to_wall",injcode,"window.location =");}
  }

  if (dloc.match('gsearch.php')){     // gsearch.php
   Inject2Func("updatePage","vk_onChangeGSearch();",true);
   var apdef=ge('content').innerHTML;
   var re=new RegExp("ajaxHistory.prepare\\({[\\s\\S]+(def\\:.*})","im");
   apdef=apdef.match(re)[1];
   eval('ajaxHistory.prepare({url: ajaxPath, done: updatePage,'+apdef+' });');
  }

  if(dloc.match('/topic')){ //topics
  Inject2Func("posts_or_topics_page_loaded","SetClickPostIndex(); onChangeContent(); ",true);
  var re=new RegExp("ajaxHistory.prepare\\({[\\s\\S]+def\\:.*}","im");
  var aptop=ge('content').innerHTML.match(re);
  aptop+=",ignoreHash: 'scroll'});";
  //alert(aptop);
  eval(aptop);
  if(typeof post_answer!='undefined'){Inject2Func_2("post_answer","onChangeContent(); SetClickPostIndex();","text + ')'), true);");}
  }


  if(typeof getSixMembers!='undefined') {//getSixMembers(in groups main page)
    Inject2Func_2("getSixMembers","onChangeContent(); ","parseResponse(text);");
  }
  if (dloc.match('mail.php')){ 
   Inject2Func("onMessagesUpdate","onChangeContent(); ",true);
  }
  
  if (dloc.match('friends.php')){    //friends
   Inject2Func_2("onListRender","onChangeContent(); ","results.innerHTML = tmp;");
   Inject2Func_2("onListRender","onChangeContent(); ","(results.innerHTML + buffer);");
  }

  if (dloc.match('/note')){       //notes
  Inject2Func_2("postComment","onChangeContent(); ","responseText;");
  }

  if(dloc.match('newsfeed.php')){  //news
    Inject2Func("onGetResults","onChangeContent(); vkPageNews(); ",true);
    Inject2Func("onAutoUpdate","onChangeContent(); vkPageNews(); ",true);
    ajaxHistory.prepare({
      url: 'newsfeed.php',
      done: onGetResults
    });
  }

  if (dloc.match(/video.+_\d+/i)){
  //Inject2Func_2("removeTag","IDNamesInColsV()","hide('message');");
  //Inject2Func_2("confirmTag","IDNamesInColsV()","hide('message');");
  Inject2Func("finishedTagOp","onChangeContent(); if (getSet(7) == 'y') IDNamesInColsV();",true);//,"hide('message');");
  
  
  }
  
  if (dloc.match("audio.php")){  InjAudio();  } //audio 
  
  if(typeof getPageContent!='undefined') {//comments: video
    var expl=(typeof AddPlayerCtrl!='undefined' && getSet(53) == 'y')?' AddPlayerCtrl();':'';   //For ExPlayer
    Inject2Func("getPageContent","afterFunc=function(){"+expl+"onChangeContent();VkoptAudio(true);};");//+for audio page
    Inject2Func_2("pagination.init","onChangeContent(); ",".afterFunc(params);");
    if (typeof postIt!='undefined'){
    Inject2Func_2("postIt","onChangeContent(); ","= text;");}
  }


  if (dloc.match(/\/photo-{0,1}\d+_\d+.*/i) || dloc.match(/photos.php.act=show/i)){ // for photo  photos.php.act=show&id=xxxxx_yyyy
    vkOnPhotoChange=function(){
        if (getSet(7)  == 'y') IDNamesInColsP();
        if (getSet(14) == 'y') IDPhotoSelect();
        TxtMainFcn();
        }
    Inject2Func("gotComments","onChangeContent();",true);
    Inject2Func("gotPhotoInfo","onChangeContent(); vkOnPhotoChange();",true);
    Inject2Func_2("postComment","onChangeContent(); ","text;");

  	if (typeof switchToFast=='undefined' && typeof start_photo!="undefined"){
     ajaxHistory.prepare("photo", {
		  url:'photos.php',
  		done: gotPhotoInfo,
  		fail: failedPhotoInfo,
	   	before: showPhoto,
  		show: {
	   		to: function(p) { return p.photo },
		  	from: function(p) { return {act: 'photo_info', photo: p, uid: window.watched_uid }}
  		},
	   	def: { act:'photo_info', photo: start_photo, uid: window.watched_uid }
     });


      	ajaxHistory.prepare("pages", {
      		url:'photos.php',
      		done: gotComments,
      		fail: failedComments,
      		before: function(params){
      			return (params.id == cur_photo);
      		},
      		show: {
      			to: function(p) { return p.st; },
      			from: function(p) { return {act: 'a_comments', id:cur_photo, st: p };}
      		},
      		def: {act:'a_comments', id:cur_photo, st: last_page}
      });
	
       ajaxHistory.init();

	  }
  }

  if (typeof doSaveQuestion!='undefined'){ //questions
    Inject2Func_2("makeFRequest"," onChangeContent(); ","responseText;");
    Inject2Func_2("postIt"," onChangeContent(); ","responseText;");
  }

  if (typeof appRequest!='undefined'){  //applicatons
    Inject2Func_2("alertFContents"," onChangeContent(); TxtMainFcn();","PickText;");
    Inject2Func("postCommentSuccess","onChangeContent();",true);
  }


  if (typeof AudioObject!='undefined'){  // inject for save audio volume
    Inject2Func_2("AudioObject.stateChanged","vksetCookie('audio_vol',vkgetCookie('audio_vol'));",'createCookie("audio_vol", this.curVolume);');
  }

  //injection for club adminka in vk_club.js

}   //end of main injections.

function onChangeContent(){
  //BlockProfileLinks();
  //PrepareUserPhotoLinks();
  vkModLink();
  AddExUserMenu();
  vk_LightFriends_init();
  MsgObajaxingLink();
  
}


function vk_onChangeGSearch(){
 if (geByClass('audioRow')[0]){
  //alert('audio');
  RemDuplMain();//audio
  VkoptAudio();
 }
onChangeContent();
}

function getScrH(){ return window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight);}
function getScrollTop(){ return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop)}
function vkRand(){
return Math.round((Math.random() * (100000000 - 1)));
}
//////////////////////////////////////
/////////Captcha for userapi//////////
/////////////////////////////////////

var Globcallback="";
var retCaptBoxCol=Array();
var numCaptBox=-1;

function addCaptBox(addr){
if (typeof vCapBox=='undefined' || vCapBox==""){
        CaptBox(addr);
    }else{
        retCaptBoxCol[retCaptBoxCol.length]=addr;
    }
}

function retCaptBox(){
    if(retCaptBoxCol!="" && (numCaptBox+2)<=retCaptBoxCol.length){
        numCaptBox++;
        CaptBox(retCaptBoxCol[numCaptBox]);
    }else{
        Globcallback="";
        retCaptBoxCol=Array();
        numCaptBox=-1;
    }
}

function CaptBox(callback){
Globcallback=callback;
try{
vCapBox.hide();
}catch(e){}
var cssid=vkRand();
  vCapBox = new MessageBox({title: '<center>Captcha</center>',width: 200});
  vCapBox.content('<center id="testID"><div id="captcha" align="center"><img src="http://userapi.com/data?act=captcha&csid='+cssid+'" OnClick="CaptBox(Globcallback)"/></div><br><input name="textCap" onKeyPress="if (event.keyCode==13 || (event.ctrlKey && event.keyCode==13)) {Globcallback(\'&fcsid='+cssid+'&fccode=\'+ge(\'captcha_text\').value);vCapBox.hide(200);setTimeout(\'retCaptBox();\',400);}" id="captcha_text" value="" /></center>');
  vCapBox.setOptions({onHide: function(){vCapBox.content('');vCapBox="";}});
  vCapBox.removeButtons();
  vCapBox.addButton({
  onClick: function(){
     vCapBox.hide(200);
     setTimeout("retCaptBox();",400);
  },
  style:'button_no',
  label: IDL('Cancel')
  }).addButton({
  onClick: function(){
    callback('&fcsid='+cssid+'&fccode='+ge('captcha_text').value);
    vCapBox.hide(200);
    setTimeout("retCaptBox();",400);
//    alert(ge('captcha_textRand').value);
  },
  label: IDL('Send')
  });
  vCapBox.show();
}

//////////////////////////////////////
///////END Captcha for userapi////////
/////////////////////////////////////
function remixsid() {return vkgetCookie('remixsid');}
function remixmid() {
  if (typeof im!='undefined') return im.id;
  tmp=(document.getElementById('sideBar').innerHTML.match(/mail\.php/)?document.getElementById('sideBar').innerHTML.match(/mail\.php\?id=(\d+)/)[1]:''); 
  return tmp;
}
function ge(q) {return document.getElementById(q);}

function vkMkDate(raw) {
  var result = new Date(raw * 1000), now = new Date();
  if (result.getDay() == now.getDay()) {
    return result.toLocaleTimeString();
  }
  var pad = function(num) {
      return ((num + '').length < 2) ? ('0' + num) : num;
  }
    return pad(result.getDate()) + '.' + pad(result.getMonth()+1) + '.' + (result.getFullYear() + '').substr(2);
}

function getSet(num,type) {
if (!vkgetCookie('remixbit')) return null;
if (!type || type==null) type=0;
if (num=='-') return vkgetCookie('remixbit').split('-')[type];
if (!vkgetCookie('remixbit').split('-')[type].charAt(num)) return 'n';
else return vkgetCookie('remixbit').split('-')[type].charAt(num);
}

function setSet(num,type,setting) {
if (!setting) setting=0;
settings=vkgetCookie('remixbit').split('-');
if (num=='-') settings[setting]=type;
else settings[setting][num]=type;
vksetCookie('remixbit',settings.join('-'));
}

function setCfg(num,type) {
allsett=vkgetCookie('remixbit').split('-');
sett=allsett[0].split('');
sett[num]=type;
allsett[0]=sett.join('');
vksetCookie('remixbit',allsett.join('-'));
}

function delCookie(name, path, domain) {
	if ( vkgetCookie( name ) ) document.cookie = name + '=' +
	( ( path ) ? ';path=' + path : '') +
	( ( domain ) ? ';domain=' + domain : '' ) +
	';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

////////////////
// VkOpt Ajax //
////////////////
function PrepReq() {
  var tran = null;
  try { tran = new XMLHttpRequest(); }
  catch(e) { tran = null; }
  try { if(!tran) tran = new ActiveXObject("Msxml2.XMLHTTP"); }
  catch(e) { tran = null; }
  try { if(!tran) tran = new ActiveXObject("Microsoft.XMLHTTP"); }
  catch(e) { tran = null; }
return tran;}

function urlEncData(data) {
    var query = [];
    if (data instanceof Object) {
        for (var k in data) {
            query.push(encodeURIComponent(k) + "=" +
            		encodeURIComponent(data[k]));
        }
        return query.join('&');
    } else {
        return encodeURIComponent(data);
    }
}

function AjGet(url, callback,unsyn) {
var request = PrepReq();
if(!request) return false;
  request.onreadystatechange = function() {
  if(request.readyState == 4 && callback) callback(request);
};
  //unsyn=!unsyn;
  request.open('GET', url, unsyn);
  request.send(null);
  return true;
}

function AjPost(url, data, callback) {
    var request = PrepReq();
    if(!request) return false;
    request.onreadystatechange  = function() {
            if(request.readyState == 4 && callback) callback(request);
        };
    request.open('POST', url, true);
    if (request.setRequestHeader)
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");//*/
    request.send(urlEncData(data));
    return true;
}
//////////////
// Ajax end //
//////////////
function p_req() {
   var http_request = false;
       http_request = new XMLHttpRequest();
    if (http_request.overrideMimeType)
       {

       }
    if (!http_request) {
       alert('XMLHTTP Error'); return false;
	return http_request;
    }
}

/// begin color functions
function rgb2hex(rgbcolor) {  //rgbcolor=Array(255,15,45)
  var c,s,h='', x='0123456789ABCDEF';
  s=rgbcolor;
    for (var i=0; i < 3; i++){
      n  = parseInt(s[i]);
      h += x.charAt(n>>4) + x.charAt(n&15);
    }
    h='#'+h;
  return h;
}

function hex2rgb(hexcolor) {  //example hexcolor='#34A235' or hexcolor='34A235'
  var h=hexcolor, x='0123456789ABCDEF', c='';
  var rgb=new Array(0,0,0);
  if(h) {
    h=h.toUpperCase();
    if (h.match('#')) h=h.substring(1,7);
    for (var i=0;i<6; i+=2)
      rgb[i/2]=16*x.indexOf(h.charAt(i)) + x.indexOf(h.charAt(i+1));

  }
  return rgb; //rgb[0] = red; rgb[1] =green;  rgb[2] =blue;
}
/// end of color functions
vk_utils = {
	lastLength:0,
	 checkTextLength:function(max_len, val, warn, exceedFunc, remainFunc){
    if(this.lastLength==val.length)return;
		this.lastLength=val.length;
		n_len = this.replaceChars(val).length;
		if (n_len > max_len) {
			var n_plus = n_len - max_len;
			warn.style.display = "";
			warn.innerHTML = langNumeric(n_plus, text_exceeds_symbol_limit);
		} else if (n_len > max_len - 100) {
			var n_rem = max_len - n_len;
			warn.style.display = "";
			warn.innerHTML = langNumeric(n_rem, text_N_symbols_remain);
		} else {
			warn.style.display = "none";
			warn.innerHTML = '';
		}
   },
    replaceChars:function(text){
		var res = "";
		temp = "";
		for(var i =0; i<text.length; i++){
			var c = text.charCodeAt(i);
			temp+=c+",";
			if((c > 0x80 && c < 0xC0) || c>0x500){
				res += "&#"+c+";";
			}else{
				switch(c){
					case 0x26:res+="&amp;";break;
					case 0x3C:res+="&lt;";break;
					case 0x3E:res+="&gt;";break;
					case 0x22:res+="&quot;";break;
					case 0x0D:res+="";break;
					case 0x0A:res+="<br>";break;
					case 0x21:res+="&#33;";break;
					case 0x27:res+="&#39;";break;
					default:res+=text.charAt(i);break;
				}
			}
		}
		return res;
	  }
}

function vkDebugWin(text){
  if (vk_DEBUG){
    A='<plaintext>'+text;
    var B = window.open('about:blank', '_blank');
    var C = B.document;
    C.write(A);
    C.close();
  }
}

function setSett(st,on,n) {
allsett=vkgetCookie('remixbit').split('-');
sett=allsett[0].split('');
for (j=0; j<=n; j++) if (sett[j]==null) {
 if (on.match(/\d/)) sett[j]='0';
 else sett[j]='n';	}
allsett[0]=sett.join('');
vksetCookie('remixbit',allsett.join('-'));
if (st==0) {
	if (on=='on') {
		if (sett[n]=='y') return '<b><a style="color: green;">='+IDL('on')+'=</a></b><br>';
		else	return '<a style="color: red;" onClick="javascript:setSett(\'1\',\'on\',\''+n+'\');">'+IDL('on')+'</a><br>';
		}
	if (on=='of') {
		if (sett[n]=='n') return '<b><a style="color: red;">='+IDL('of')+'=</a></b>';
		else	return '<a style="color: green;" onClick="javascript:setSett(\'1\',\'of\',\''+n+'\');">'+IDL('of')+'</a>';
		}
	if (on=='ru') {
		if (sett[n]=='y') return '<b><a style="color: red;">='+IDL('ru')+'=</a></b>';
		else	return '<a style="color: green;" onClick="javascript:setSett(\'1\',\'ru\',\''+n+'\');">'+IDL('ru')+'</a>';
		}
	if (on=='au') {
		if (sett[n]=='n') return '<b><a style="color: green;">='+IDL('au')+'=</a></b>';
		else	return '<a style="color: red;" onClick="javascript:setSett(\'1\',\'au\',\''+n+'\');">'+IDL('au')+'</a>';
		}
	if (on=='id') {
		if (sett[n]=='0') return '<b><a style="color: green;">='+IDL('byID')+'=</a></b>';
		else	return '<a style="color: red;" onClick="javascript:setSett(\'1\',\'0\',\''+n+'\');">'+IDL('byID')+'</a>';
		}
	if (on=='name') {
		if (sett[n]=='1') return '<b><a style="color: green;">='+IDL('byName')+'=</a></b>';
		else	return '<a style="color: red;" onClick="javascript:setSett(\'1\',\'1\',\''+n+'\');">'+IDL('byName')+'</a>';
		}
	if (on=='last') {
		if (sett[n]=='2') return '<b><a style="color: green;">='+IDL('byFam')+'=</a></b>';
		else	return '<a style="color: red;" onClick="javascript:setSett(\'1\',\'2\',\''+n+'\');">'+IDL('byFam')+'</a>';
		}
	if (on=='none') {
		if (sett[n]=='3') return '<b><a style="color: green;">='+IDL('byNone')+'=</a></b>';
		else	return '<a style="color: red;" onClick="javascript:setSett(\'1\',\'3\',\''+n+'\');">'+IDL('byNone')+'</a>';
		}
	if (on.match(/\d/)) {
		if (sett[n]==on) return '<b><a style="color: green;">='+on+'=</a></b>';
		else	return '<a style="color: red;" onClick="javascript:setSett(\'1\',\''+on+'\',\''+n+'\');">'+on+'</a>';
		}
	}
if (st==1) {
	if ((on=='on') || (on=='ru')) {
		sett[n]='y';
		}
	if ((on=='of') || (on=='au')) {
		sett[n]='n';
		}
	if (on.match(/\d/)) sett[n]=on;
	}
allsett[0]=sett.join('');
vksetCookie('remixbit',allsett.join('-'));
VkoptSettings(0);
}

var vksett_visible=false;
var vk_orign_page_content='';
var vk_orign_page_title='';

function SwichVkoptSettings(){
if (vksett_visible){
  vksett_visible=false;
  document.getElementById('pageLayout').innerHTML=vk_orign_page_content;
  document.title=vk_orign_page_title;
  }else{
  vk_orign_page_content=document.getElementById('pageLayout').innerHTML;
  vk_orign_page_title=document.title;
  vksett_visible=true;
  VkoptSettings();
  }
}
//////////////////////
// for color select //

DrwPalete=function(p,F_over,F_click){String.prototype.dbl
  =function(){return this.replace(/(.)/g,'$1$1').match(/../g)}
s='';j=0;
/*while(j<216){  k=(j-j%6)/6;
  r='c90f63'.dbl()[m=k%3+3*(k>=18)];
  gg=['0369cf'.dbl(),'fc9630'.dbl()][[1,0,1,1,0,1][m]][j%6];
  b='0369cffc9630'.dbl()[(j-j%18)/18];
  s+=(j%18?'':'<tr>')+'<td bgColor='+r+gg+b
  +' style=font-size:4px width=10 height=10></td>'+(++j%18?'':'</tr>');
  }ge('s'+p).innerHTML='<center><table bgColor=black cellpadding=0 '
*/
var html = "";

var total=1657;var X=Y=j=RG=B=0;
var aR=new Array(total);var aG=new Array(total);var aB=new Array(total);
for (var i=0;i<256;i++){
aR[i+510]=aR[i+765]=aG[i+1020]=aG[i+5*255]=aB[i]=aB[i+255]=0;
aR[510-i]=aR[i+1020]=aG[i]=aG[1020-i]=aB[i+510]=aB[1530-i]=i;
aR[i]=aR[1530-i]=aG[i+255]=aG[i+510]=aB[i+765]=aB[i+1020]=255;
if(i<255){aR[i/2+1530]=127;aG[i/2+1530]=127;aB[i/2+1530]=127;}
}

var hexbase=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
var i=0;var jl=new Array();
for(x=0;x<16;x++)for(y=0;y<16;y++)jl[i++]=hexbase[x]+hexbase[y];
//html +='<'+'table border="0" cellspacing="0" cellpadding="0" onMouseover="t(event)" onClick="p()">';
var H=W=90;//63;
for (Y=0;Y<=H;Y++){
s='<'+'tr height=2>';j=Math.round(Y*(510/(H+1))-255)
for (X=0;X<=W;X++){
i=Math.round(X*(total/W))
R=aR[i]-j;if(R<0)R=0;if(R>255||isNaN(R))R=255
G=aG[i]-j;if(G<0)G=0;if(G>255||isNaN(G))G=255
B=aB[i]-j;if(B<0)B=0;if(B>255||isNaN(B))B=255
s=s+'<'+'td width=2 bgcolor=#'+jl[R]+jl[G]+jl[B]+'><'+'/td>'
}
html +=s+'<'+'/tr>';
}
//html +='<'+'/table>';


ge('s'+p).innerHTML=
    //html+
    '<center><table bgColor=black cellpadding=0 '
    +'cellspacing=0 id=t'+p+'>'+html+'</table>'+
    '<table cellpadding=0 cellspacing=0><tr><td width=50 height=50 id="pct'+p+'" bgColor=black></td></tr></table>'
    +'<input id=it'+p+' type="hidden"></center>';
  ge('t'+p).onmouseover=F_over; ge('t'+p).onclick=F_click;
}


MsgCol_over=function(e){  if((t=document.all?event.srcElement:e.target).tagName!='TD') return;
  if(t.style.backgroundColor) ge('i'+t.offsetParent.id).value=t.style.backgroundColor.toUpperCase();
  if(t.bgColor){
      ge('i'+t.offsetParent.id).value=t.bgColor.toUpperCase();
      ge('pc'+t.offsetParent.id).bgColor=t.bgColor;}
}

MsgCol_click=function(e){
  if((t=document.all?event.srcElement:e.target).tagName!='TD'&&t.tagName!='TABLE')return;
  //alert('Ok');
  //ge('pageLayout').style.backgroundColor=(ge('i'+t.offsetParent.id).value);
  var color=ge('i'+t.offsetParent.id).value;
  if (!color.match('#')) color='#'+color;
  setMsgColor(color);
  ge('spc'+t.offsetParent.id).style.backgroundColor=color;
}

function getMsgColor(){
  var cl=vkgetCookie('remixbit').split('-')[9];
  var ret="#E2E9FF";
  if (cl) ret=cl;
  return ret;
}
function setMsgColor(color) {
var prefs=vkgetCookie('remixbit').split('-');
prefs[9]=color;
vksetCookie('remixbit', prefs.join('-'));
//document.getElementById('tekfrdays').innerHTML=getSet('-',2);
}

FrCol_click=function(e){
  if((t=document.all?event.srcElement:e.target).tagName!='TD'&&t.tagName!='TABLE')return;
  //alert('Ok');
  //ge('pageLayout').style.backgroundColor=(ge('i'+t.offsetParent.id).value);
  var color=ge('i'+t.offsetParent.id).value;
  if (!color.match('#')) color='#'+color;
  setFrColor(color);
  ge('spc'+t.offsetParent.id).style.backgroundColor=color;
}

function getFrColor(){
  var cl=vkgetCookie('remixbit').split('-')[10];
  var ret="#34A235";
  if (cl) ret=cl;
  return ret;
}
function setFrColor(color) {
var prefs=vkgetCookie('remixbit').split('-');
prefs[10]=color;
vksetCookie('remixbit', prefs.join('-'));
}

// end of color select func //
//////////////////////////////


function VkoptSettings(vkMode)
/* Formiruet stranitsu s nastroikami
   vkMode = 0 --> pokazat'
   vkMode = 1 --> sohranit' i pokazat'
*/
{
//vkaddcss('td {font-size: 12px; font-family: arial;}');
document.title='[ VkOpt ['+String(vVersion).split('').join('.')+'] settings ]';
var style='style="text-align: center; border-bottom: 1px solid #000000; width: 60px;"';
var style2='style="text-align: left; border-bottom: 1px solid #000000; width: auto;"';
var style3='style="text-align: left;"';
var style4='style="border: 1px solid #888888; text-align: right; vertical-align: bottom; height: 85px;" colspan=2';

//	document.getElementById('content').innerHTML=
var settings_content=
'<style>'+
'span.cltool { position: relative;}'+
'span.cltool span.cltip { display: none; }'+    //position: relative;
'span.cltool:hover span.cltip { display: inline;  width:190px  }'+
'span.cltool:hover span.cltip { color:#585858; text-align:center; padding: 0px; border: 0px; background-color: #FFFFD9;}'+
'</style>'+
'<div id="vkoptsettingspage" align=center>'+
'<table style="margin-left:0px; width: auto; vertical-align: top;" border="0" cellspacing="0">'+
'<tr><td colspan=3 style="text-align: center; width: auto;" id="header"><h4>Vkontakte Optimizer '+String(vVersion).split('').join('.')+' services (build '+vBuild+')</h4></td></tr>'+
'<tr><td style="width: auto;" valign=top>'+

'<table style="margin-left:0px; width: auto; vertical-align: top;" border="0" cellspacing="0">'+
	
  '<tr><td '+style+'>'+setSett('0','on','0')+' '+setSett('0','of','0')+'</td>'+'<td '+style2+'>'+IDL("seLinkAu")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','1')+' '+setSett('0','of','1')+'</td>'+'<td '+style2+'>'+IDL("seLinkVi")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','2')+' '+setSett('0','of','2')+'</td>'+'<td '+style2+'>'+IDL("seLinkAp")+'</td></tr>'+

'<tr><td colspan=2 '+style2+'>&nbsp;</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','3')+' '+setSett('0','of','3')+'</td>'+'<td '+style2+'>'+IDL("seBlCod")+'</td></tr>'+

	'<tr><td '+style+'>&nbsp;</td>'+'<td '+style2+'><a href= "http://dl.filekicker.com/send/file/193122-0O88/FLVPlayerSetup.exe">'+IDL("sePlayer")+'</a><br><br></td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','4')+' '+setSett('0','of','4')+'</td>'+'<td '+style2+'>'+IDL("seSelEG")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','5')+' '+setSett('0','of','5')+'</td>'+'<td '+style2+'>'+IDL("seWallImg")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','6')+' '+setSett('0','of','6')+'</td>'+'<td '+style2+'>'+IDL("seGInCol")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','7')+' '+setSett('0','of','7')+'</td>'+'<td '+style2+'>'+IDL("seNInCol")+'</td></tr>'+

'<tr><td colspan=2 '+style2+'>&nbsp;</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','au','8')+' '+setSett('0','ru','8')+'</td>'+'<td '+style2+'>'+IDL("seLoadOnl")+
		'<br>'+IDL("now")+': <a id=tektime>'+getSet('-',5)+'</a> '+IDL("min")+'<br>'+IDL("set")+': '+
' <a onclick="javascript:settime(\'1\');">1</a> -'+
' <a onclick="javascript:settime(\'2\');">2</a> -'+
' <a onclick="javascript:settime(\'3\');">3</a> -'+
' <a onclick="javascript:settime(\'4\');">4</a> -'+
' <a onclick="javascript:settime(\'5\');">5</a> -'+
' <a onclick="javascript:settime(\'10\');">10</a> -'+
' <a onclick="javascript:settime(\'15\');">15</a>'+
		'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','au','9')+' '+setSett('0','ru','9')+'</td>'+'<td '+style2+'>'+IDL("seLoadCom")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','au','10')+' '+setSett('0','ru','10')+'</td>'+'<td '+style2+'>'+IDL("seLoadApP")+'</td></tr>'+

	//'<tr><td '+style+'>'+setSett('0','au','11')+' '+setSett('0','ru','11')+'</td>'+'<td '+style2+'>'+IDL("seLoadApL")+'</td></tr>'+

'<tr><td colspan=2 '+style2+'>&nbsp;</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','12')+' '+setSett('0','of','12')+'</td>'+
	'<td '+style2+'>'+IDL("seOnActiv")+'</td></tr>'+

//	'<tr><td '+style+'>'+setSett('0','on','13')+' '+setSett('0','of','13')+'</td>'+'<td '+style2+'>'+IDL("seOnVid")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','14')+' '+setSett('0','of','14')+'</td>'+'<td '+style2+'>'+IDL("seOnSelP")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','15')+' '+setSett('0','of','15')+'</td>'+'<td '+style2+'>'+IDL("seOnSelV")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','16')+' '+setSett('0','of','16')+'</td>'+'<td '+style2+'>'+IDL("seOnAway")+'</td></tr>'+

'<tr><td colspan=2 '+style2+'>&nbsp;</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','17')+' '+setSett('0','of','17')+'</td>'+'<td '+style2+'>'+IDL("seFavOn")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','18')+' '+setSett('0','of','18')+'</td>'+'<td '+style2+'>'+IDL("seGrCom")+'</td></tr>'+

'<tr><td colspan=2 '+style2+'>&nbsp;</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','19')+' '+setSett('0','of','19')+'</td>'+'<td '+style2+'>'+IDL('seNewSnd')+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','20')+' '+setSett('0','of','20')+'</td>'+'<td '+style2+'>'+IDL('seVisible')+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','21')+' '+setSett('0','of','21')+'</td>'+'<td '+style2+'>'+IDL('seTestFr')+
		'<br>'+IDL('seRefList')+
		'<br>'+IDL("now")+': <a id=tekfrdays>'+vkgetCookie('remixbit').split('-')[2]+'</a> '+IDL("day")+'<br>'+IDL("set")+': '+
' <a onclick="javascript:setFrRefresh(\'1\');">1</a> -'+
' <a onclick="javascript:setFrRefresh(\'2\');">2</a> -'+
' <a onclick="javascript:setFrRefresh(\'3\');">3</a> -'+
' <a onclick="javascript:setFrRefresh(\'4\');">4</a> -'+
' <a onclick="javascript:setFrRefresh(\'5\');">5</a> -'+
' <a onclick="javascript:setFrRefresh(\'6\');">6</a> -'+
' <a onclick="javascript:setFrRefresh(\'7\');">7</a>'+
'<br><a onClick="javascript:IDFriends_new();" style="cursor: hand;">'+IDL('seCreList')+'</a>'+
		'</td></tr>'+

    //Text Style Menu:  (add 15.10.09)
    '<tr><td '+style+'>'+setSett('0','on','25')+' '+setSett('0','of','25')+'</td>'+'<td '+style2+'>'+IDL("seStyleBtns")+'</td></tr>'+
    //Audio lyr link
    '<tr><td '+style+'>'+setSett('0','on','45')+' '+setSett('0','of','45')+'</td>'+'<td '+style2+'>'+IDL("seAudioLyr")+IDL("seLinkAu")+'</td></tr>'+
    //Calculate Age&Zodiak
    '<tr><td '+style+'>'+setSett('0','on','46')+' '+setSett('0','of','46')+'</td>'+'<td '+style2+'>'+IDL("seCalcAge")+'</td></tr>'+

    '<tr><td '+style+'>'+setSett('0','on','49')+' '+setSett('0','of','49')+'</td>'+'<td '+style2+'>'+IDL("seBigPhotoArrow")+'</td></tr>'+

    '<tr><td '+style+'>'+setSett('0','on','53')+' '+setSett('0','of','53')+'</td>'+'<td '+style2+'>'+IDL("seExPlayer")+'</td></tr>'+

    '<tr><td '+style+'>'+setSett('0','on','55')+' '+setSett('0','of','55')+'</td>'+'<td '+style2+'>'+IDL("seICQico")+'</td></tr>'+

    '<tr><td '+style+'>'+setSett('0','on','57')+' '+setSett('0','of','57')+'</td>'+'<td '+style2+'>'+IDL("seQuickWallPost")+'</td></tr>'+

    '<tr><td '+style+'>'+setSett('0','on','59')+' '+setSett('0','of','59')+'</td>'+'<td '+style2+'>'+IDL("seAutoUpdMenu")+'</td></tr>'+
    '<tr><td '+style+'>'+setSett('0','on','60')+' '+setSett('0','of','60')+'</td>'+'<td '+style2+'>'+IDL("sePopupNewMsg")+'</td></tr>'+
   // '<tr><td '+style+'>'+setSett('0','on','61')+' '+setSett('0','of','61')+'</td>'+'<td '+style2+'>'+IDL("seAutoUpdMenu")+'</td></tr>'+
   	'<tr><td> </td><td '+style3+'>'+IDL("seMsgFavicon")+'</td></tr>'+
  	'<tr><td '+style+'>'+setSett('0','0','61')+'<br>'+setSett('0','1','61')+'<br>'+setSett('0','2','61')+'</td>'+
	  '<td '+style2+'>'+IDL("seMsgFaviconTxt")+'</td></tr>'+
	  
	  '<tr><td '+style+'>'+setSett('0','on','66')+' '+setSett('0','of','66')+'</td>'+'<td '+style2+'>'+IDL("seLoadFrCats")+'</td></tr>'+
    
    '<tr><td '+style+'>'+setSett('0','on','69')+' '+setSett('0','of','69')+'</td>'+'<td '+style2+'>'+IDL("seMasDelPMsg")+'</td></tr>'+
    
    '<tr><td '+style+'>'+setSett('0','on','70')+' '+setSett('0','of','70')+'</td>'+'<td '+style2+'>'+IDL("seFavToTopIm")+'</td></tr>'+
    
    '<tr><td '+style+'>'+setSett('0','on','71')+' '+setSett('0','of','71')+'</td>'+'<td '+style2+'>'+IDL("seQuoteIM")+'</td></tr>'+

'</table></td><td style="width: 10px;"> </td><td style="width: auto; vertical-align: top;">'+

'<table style="margin-left:0px; width: auto; vertical-align: top;" border="0" cellspacing="0" valign=top>'+

	'<tr><td '+style+'>'+setSett('0','on','22')+' '+setSett('0','of','22')+'</td>'+'<td '+style2+'><b>'+iDL("seMenu")+'</b></td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','23')+' '+setSett('0','of','23')+'</td>'+'<td '+style2+'>'+IDL("seNewsAv")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','24')+' '+setSett('0','of','24')+'</td>'+'<td '+style2+'>'+IDL("seADRem")+'</td></tr>'+

  //kill quick search
  //'<tr><td '+style+'>'+setSett('0','on','25')+' '+setSett('0','of','25')+'</td>'+'<td '+style2+'>'+IDL("seQSearch")+'</td></tr>'+
                      //+setSett('0','id','26')+'<br>'
	'<tr><td '+style+'>'+setSett('0','name','26')+'<br>'+setSett('0','last','26')+'<br>'+setSett('0','none','26')+'</td>'+
	'<td '+style2+'>'+IDL("seSortNam")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','27')+' '+setSett('0','of','27')+'</td>'+'<td '+style2+'>'+IDL("seUpdate")+'</td></tr>'+

	'<tr><td> </td><td '+style3+'>'+IDL("seLMenuH")+'</td></tr>'+
	'<tr><td '+style+'>'+setSett('0','0','28')+'<br>'+setSett('0','1','28')+'<br>'+setSett('0','2','28')+'<br>'+setSett('0','3','28')+
	'<td '+style2+'>'+IDL("seLMenuO")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','29')+' '+setSett('0','of','29')+'</td>'+'<td '+style2+'>'+IDL("seVkBlog")+'</td></tr>'+

	'<tr><td> </td><td '+style3+'>'+IDL("seClockH")+'</td></tr>'+
	'<tr><td '+style+'>'+setSett('0','0','30')+'<br>'+setSett('0','1','30')+'<br>'+setSett('0','2','30')+'<br>'+setSett('0','3','30')+'</td>'+
	'<td '+style2+'>'+IDL("seClockO")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','31')+' '+setSett('0','of','31')+'</td>'+'<td '+style2+'>'+IDL("seCalend")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','32')+' '+setSett('0','of','32')+'</td>'+'<td '+style2+'>'+IDL("seAdmins")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','33')+' '+setSett('0','of','33')+'</td>'+'<td '+style2+'>'+IDL("seQAns")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','34')+' '+setSett('0','of','34')+'</td>'+'<td '+style2+'>'+IDL("seClos")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','35')+' '+setSett('0','of','35')+'</td>'+'<td '+style2+'>'+IDL("seFave")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','36')+' '+setSett('0','of','36')+'</td>'+'<td '+style2+'>'+IDL("sePVext")+'</td></tr>'+

	'<tr><td> </td><td '+style3+'>'+IDL("seWallH")+'</td></tr>'+
	'<tr><td '+style+'>'+setSett('0','0','37')+'<br>'+setSett('0','1','37')+'<br>'+setSett('0','2','37')+'<br>'+setSett('0','3','37')+'<br>'+setSett('0','4','37')+
		'<br>'+setSett('0','5','37')+'<br>'+setSett('0','6','37')+'</td>'+'<td '+style2+'>'+IDL("seWallO")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','38')+' '+setSett('0','of','38')+'</td>'+'<td '+style2+'>'+IDL("sePh100")+'</td></tr>'+

	//'<tr><td '+style+'>'+setSett('0','on','39')+' '+setSett('0','of','39')+'</td>'+'<td '+style2+'>'+IDL("seQur")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','40')+' '+setSett('0','of','40')+'</td>'+'<td '+style2+'>'+IDL("seWhoFaved")+'</td></tr>'+

	'<tr><td '+style+'>'+setSett('0','on','41')+' '+setSett('0','of','41')+'</td>'+'<td '+style2+'>'+IDL("seRightBar")+'</td></tr>'+
	//Sett(42)  unavailable!
	'<tr><td '+style+'>'+setSett('0','on','43')+' '+setSett('0','of','43')+'</td>'+'<td '+style2+'>'+IDL("seSelApp")+'</td></tr>'+

  '<tr><td '+style+'>'+setSett('0','on','44')+' '+setSett('0','of','44')+'</td>'+'<td '+style2+'>'+IDL("AppEmulSet")+'</td></tr>'+
  //Sett(45)  unavailable!
  //Sett(46)  unavailable!


  '<tr><td '+style+'>'+setSett('0','on','47')+' '+setSett('0','of','47')+'</td>'+'<td '+style2+'>'+'<table><tr><td> <table><tr><td width=20 height=20 id="spct10" bgcolor='+getMsgColor()+'></td></tr></table> <td>'+
  '<span class="cltool"><a onmouseover=DrwPalete(10,MsgCol_over,MsgCol_click)>'+IDL("seHLMail")+'</a><span class="cltip" id="sdt10"><div id="s10">Generating...</div></span></span>'+
  '</td></tr></table> </td></tr>'+

  '<tr><td '+style+'>'+setSett('0','on','48')+' '+setSett('0','of','48')+'</td>'+'<td '+style2+'>'+IDL("seSwichTextChr")+'</td></tr>'+
  //Sett(49)  unavailable!
  
  '<tr><td '+style+'>'+setSett('0','on','50')+' '+setSett('0','of','50')+'</td>'+'<td '+style2+'>'+IDL("seExUserMenu")+
  '<br><span class="cltool"><a><b>'+IDL("Settings")+'</b></a><span class="cltip">'+GetUserMenuSett()+'</span></span>'+
  '</td></tr>'+
  '<tr><td '+style+'>'+setSett('0','on','56')+' '+setSett('0','of','56')+'</td>'+'<td '+style2+'>'+IDL("seExUMClik")+'</td></tr>'+

  '<tr><td '+style+'>'+setSett('0','on','51')+' '+setSett('0','of','51')+'</td>'+'<td '+style2+'>'+IDL("seHideWIUmsg")+'</td></tr>'+

  '<tr><td '+style+'>'+setSett('0','on','52')+' '+setSett('0','of','52')+'</td>'+'<td '+style2+'>'+IDL("seRemDuplicate")+'</td></tr>'+

  '<tr><td '+style+'>'+setSett('0','on','54')+' '+setSett('0','of','54')+'</td>'+'<td '+style2+'>'+'<table><tr><td> <table><tr><td width=20 height=20 id="spct11" bgcolor='+getFrColor()+'></td></tr></table> <td>'+
  '<span class="cltool"><a onmouseover=DrwPalete(11,MsgCol_over,FrCol_click)>'+IDL("seLightFriends")+'</a><span class="cltip" id="sdt11"><div id="s11">Generating...</div></span></span>'+
  '</td></tr></table> </td></tr>'+
  //Set 55,56,57 unav
  '<tr><td '+style+'>'+setSett('0','on','58')+' '+setSett('0','of','58')+'</td>'+'<td '+style2+'>'+IDL("seDontCutAva")+'</td></tr>'+
  //59,60,61 unav
  '<tr><td> </td><td '+style3+'>'+IDL("seAjaxMsgForm")+'</td></tr>'+
  '<tr><td '+style+'>'+setSett('0','0','62')+'<br>'+setSett('0','1','62')+'<br>'+setSett('0','2','62')+'</td>'+
  '<td '+style2+'>'+IDL("seAjMsgCfg")+'</td></tr>'+

  '<tr><td '+style+'>'+setSett('0','on','63')+' '+setSett('0','of','63')+'</td>'+'<td '+style2+'>'+IDL("sePlCtrlLMnu")+'</td></tr>'+

  '<tr><td '+style+'>'+setSett('0','on','64')+' '+setSett('0','of','64')+'</td>'+'<td '+style2+'>'+IDL("seExHistoryStatus")+'</td></tr>'+
  
  '<tr><td '+style+'>'+setSett('0','on','65')+' '+setSett('0','of','65')+'</td>'+'<td '+style2+'>'+IDL("seAudioDownloadName")+'</td></tr>'+
  //66 unav
  '<tr><td '+style+'>'+setSett('0','on','67')+' '+setSett('0','of','67')+'</td>'+'<td '+style2+'>'+IDL("seAltProfile")+'</td></tr>'+
  //68,69,70, 71 N/A
  '<tr><td '+style+'>'+setSett('0','on','72')+' '+setSett('0','of','72')+'</td>'+'<td '+style2+'>'+IDL("seOnlineStatus")+'</td></tr>'+

  //'<tr><td '+style+'>'+setSett('0','on','73')+' '+setSett('0','of','73')+'</td>'+'<td '+style2+'>'+IDL("seZoomPhoto")+'</td></tr>'+
  
  '<tr><td> </td><td '+style3+'>'+IDL("seZoomPhoto")+'</td></tr>'+
	'<tr><td '+style+'>'+setSett('0','0','73')+'<br>'+setSett('0','1','73')+'<br>'+setSett('0','2','73')+
	'<td '+style2+'>'+IDL("seZoomPhHelp")+'</td></tr>'+
  /*
  '<tr><td colspan=2 '+style2+'>&nbsp;</td></tr>'+
  '<tr><td '+style4+'>'+IDL("rekvizits")+'</td></tr>'+
  '<div '+style4+'>'+IDL("rekvizits")+'</div>'+
  '<div '+style4+'>'+IDL("rekvizits2")+'</div>'+
  */
'</table></td></tr>'+

'<tr><td colspan=1>'+
'<div '+style4+'>'+IDL("rekvizits")+'</div>'+
'</td><td></td><td colspan=1>'+
'<div '+style4+'>'+IDL("rekvizits2")+'</div>'+
'</td></tr>'+

'<tr><td colspan=3>'+
'<br><div colspan=2 '+style2+'>&nbsp;</div>'+


'<br><h2 align="center">'+IDL('addVkopsSets')+'<br><textarea rows=1 style="border: 1px double #999999; overflow: hidden; width: 100%;" type="text" readonly onClick="this.focus();this.select();">IDBit=\''+vkgetCookie('remixbit')+'\';</textarea></h2>'+
'<h2 align="center">'+IDL('seAttent')+'</h2></div><hr>'+
'</td></tr></table>';

document.getElementById('content').innerHTML=settings_content;
IDprofile();
if (!FriendsNid || !vkIsArray(FriendsNid)) vkBox('Please refresh vkops.js');
}
//--- Start Function ---//
function vkStatus(load) {
if (!document.getElementById('vkstatus'))
document.getElementById('sideBar').getElementsByTagName('ol')[0].innerHTML+=
'<div id="vkstatus"></div>';
if (load) document.getElementById('vkstatus').innerHTML=load;
else document.getElementById('vkstatus').innerHTML='';
}

var vk_MsgBox_content='';
var vkMsgBox;
function vk_MsgBox(text) {
  vkMsgBox = new MessageBox({title: ''});
  vkMsgBox.removeButtons();
  vkMsgBox.addButton({
    onClick: function(){ msgret=vkMsgBox.hide(200); vk_MsgBox_content=''},
    style:'button_no',label:'OK'});
  //vkMsgBox.loadContent("friends_ajax.php",{fid: fid, act: 'decline_friend', hash: friendsData.hash}).show();
  vk_MsgBox_content+=text;
  vkMsgBox.content(vk_MsgBox_content).show();
}

/////////////////////////////////////
// Quick Post to wall by ^mIXonIN^ //
/////////////////////////////////////
var vk_to_id;
var vk_wall_hash;
var vk_wname;
var vk_rand;

function vkwind(to_ids){
vk_rand = Math.round((Math.random() * (1000000 - 1)));
box(vk_rand);
var el=document.getElementById("message_text"+vk_rand);
el.focus();

if(getSet(25)=="y"){
vkwintxt(vk_rand);
}

ge('message_text'+vk_rand).focus;
vk_to_id=to_ids;

AjGet("/wall.php?act=write&id="+to_ids,function(req){
response = req.responseText;

var r = /<h4>(.*?)<\/h4>/g;
while (value = r.exec(response)) {
vk_wname=value[1];
}
var r = /name="wall_hash" value="(.*?)"/g;
while (value = r.exec(response)) {
if (response.match(/(decod.+hash)\(ge\('.+'\)/im)){
    var decfunc=response.match(/(decod.+hash)\(ge\('.+'\)/im)[1];
    vk_wall_hash = eval(decfunc+"('"+value[1]+"')");
//vk_wall_hash=decode_hash(value[1]);
}
}

document.getElementById('headmess'+vk_rand).innerHTML=vk_wname;
});
return false;
}


var Box;
function box(){
try {
grMsgBox.hide();
}catch(e){}
  vMsgBox = new MessageBox({title: '<center><div id="headmess'+vk_rand+'"><img src=\'http://vkontakte.ru/images/upload.gif\'></img></div></center>'});  //                                                                                                                                          //unescape(\'%u041F%u0440%u0435%u0432%u044B%u0448%u0435%u043D%20%u043B%u0438%u043C%u0438%u0442%20%u043D%u0430%3A%3Cb%3E%20\')+na+unescape(\'%3C/b%3E%20%u0441%u0438%u043C%u0432%u043E%u043B%u0430%21\')
  //AreaKeyUp='onkeyup="var errmaxlg; na=this.value.length-4096;if(this.value.length>4096){errmaxlg=1;document.getElementById(\'messwarn'+vk_rand+'\').innerHTML=getLang(\'text_exceeds_symbol_limit\',na)}else{if(errmaxlg==1){errmaxlg=0;document.getElementById(\'messwarn'+vk_rand+'\').innerHTML=\'\';}}"';
  AreaKeyUp='onkeyup="vk_utils.checkTextLength( 4096, this.value, ge(\'messwarn'+vk_rand+'\'));"';
  vMsgBox.content('<div id="panelint'+vk_rand+'" align="center" style="width:368px; float:center; padding:3px 12px 0px 120px"></div><br><textarea '+AreaKeyUp+' name="message'+vk_rand+'" onKeyPress="if (event.keyCode==10 || (event.ctrlKey && event.keyCode==13)) {post_wallmess(eval(\'message'+vk_rand+'.value\'));}" style="width:368px; height:80px" id="message_text'+vk_rand+'"></textarea><div id="messwarn'+vk_rand+'" style="width:368px;"></div>');
  vMsgBox.removeButtons();
  vMsgBox.addButton({
  onClick: function(){
  	vMsgBox.hide(200);
  	vk_to_id="";
  	vk_wall_hash="";
	vk_wname="";
  },
  style:'button_no',
  label: unescape("%u041E%u0442%u043C%u0435%u043D%u0430")
  }).addButton({
  onClick: function(){
  post_wallmess(eval("message"+vk_rand+".value"));
//     vMsgBox.hide(200);
  },
  label: unescape("%u041E%u0442%u043F%u0440%u0430%u0432%u0438%u0442%u044C%21")
  });
  vMsgBox.show();
}

function post_wallmess(mess) {
    if (vk_wall_hash!="" && mess!="") {
        document.getElementById('messwarn'+vk_rand).innerHTML="<center><img src=\'http://vkontakte.ru/images/upload.gif\'></img></center>";
 //AjPost("/wall.php",{to_id: vk_to_id, act:"sent", wall_hash:vk_wall_hash, message:mess},
        var callback=function(req){
        response = req.responseText;
        if (response!="") {
            var RE = new RegExp("code=1", "g");
            if (RE.exec(response)) {
                document.getElementById('messwarn'+vk_rand).innerHTML="<center><b>"+unescape('%D0%92%D1%8B%20%D0%BD%D0%B5%20%D0%BC%D0%BE%D0%B6%D0%B5%D1%82%D0%B5%20%D0%BE%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC%D1%83%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8E,%20%D1%82%D0%B0%D0%BA%20%D0%BA%D0%B0%D0%BA%20%D0%BE%D0%BD%20%D0%BE%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B8%D0%B2%D0%B0%D0%B5%D1%82%20%D0%BA%D1%80%D1%83%D0%B3%20%D0%BB%D0%B8%D1%86,%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5%20%D0%BC%D0%BE%D0%B3%D1%83%D1%82%20%D0%BF%D1%80%D0%B8%D1%81%D1%8B%D0%BB%D0%B0%D1%82%D1%8C%20%D0%B5%D0%BC%D1%83%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F.%3Cbr%3E%D0%A1%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%9D%D0%95%20%D0%BF%D0%BE%D1%81%D0%BB%D0%B0%D0%BD%D0%BE!')+"</b></center>";
            } else {
                //document.getElementById('messwarn'+vk_rand).innerHTML=
                vMsgBox.content("<div align='center'><b>"+unescape('%u0421%u043E%u043E%u0431%u0449%u0435%u043D%u0438%u0435%20%u043E%u0442%u043F%u0440%u0430%u0432%u043B%u0435%u043D%u043E%21%3A%29')+"</b></div>");
                vMsgBox.hide(500);
                vMsgBox.removeButtons();
            }
        } else {
            document.getElementById('messwarn'+vk_rand).innerHTML="<center><b>"+unescape('%u041E%u0448%u0438%u0431%u043A%u0430%21%20%u041F%u043E%u0432%u0442%u043E%u0440%u0438%u0442%u0435%20%u0441%u043D%u043E%u0432%u0430%21')+"</b></center>";
        }
        }

        var options = {onSuccess: callback, onFail: function(){alert('Send Error');}, onCaptchaHide: function(){vMsgBox.show();}};
        Ajax.postWithCaptcha("wall.php",{to_id: vk_to_id, act:"sent", wall_hash:vk_wall_hash, message:mess},options);

        //);
    } else {
        if (mess=="") {
            alert(unescape('%u0412%u0432%u0435%u0434%u0438%u0442%u0435%20%u0442%u0435%u043A%u0441%u0442%20%u0441%u043E%u043E%u0431%u0449%u0435%u043D%u0438%u044F%21'));
        }
    }
}
///// end of Quick Post to wall

///////////////////////////////////////////////////////////////////////
/////////////////////////////BY////////////////////////////////////////
///////////////////////////miXOnIN/////////////////////////////////////
///////////////////////////////////////////////////////////////////////

var vk_rand,paramsmess_temp,nummess_temp,idsnt_temp,kmess_temp,posted_speed_message_vk=0;


function checkForNewMessVK(value){
if(value>0){
newmessvk_function('none');
quickmess(value);
}else{
newmessvk_function('none');
vkStatus('');
}
}

function ajax_bm(href,post,method){
http_request = new XMLHttpRequest();
http_request.open(method, href, false);
http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=windows-1251");
http_request.send(post);
response = http_request.responseText;
return response;
}



function quickmess(kmessGlobal) {
    var idsnt = "";
    var kmess = 0;
    //response=ajax_bm("\mail.php","","GET");
    AjPost('mail.php', {
        filter: "new",
        out: "0"
    },
    function(req) {
        var res = eval("(" + req.responseText + ")");
        response = res.content; //req.responseText;
        //alert(response);

        var r = /<tr class='newRow' id="mess(.*?)">/g;
        while (value = r.exec(response)) {
            idsnt += value[1] + ",";
            kmess = kmess + 1;
        }
        if (kmess == 0 && kmessGlobal != 0) {
            //alert("ErroR");
            } else {
            idsntl = idsnt.length - 1;
            idsnt = idsnt.substr(0, idsntl);
            idsnt = idsnt.split(",");

            var NewMessArrarParamsVk = Array();

            //alert(idsnt[Number(idsnt.length-1)]+"; "+kmess+"; "+Number(idsnt.length-1)+"; "+idsnt);

            for (var i = 0; i < kmess; i++) {

                var idsntfordop = idsnt[i];

                var re = new RegExp('<tr class=\'newRow\' id="mess' + idsntfordop + '">([\\s\\S]*?)</tr>', 'g');
                matches = re.exec(response);
                //alert(matches[1]);
                NewMessValueVK = matches[1];

                var re = new RegExp('<a href=".+">(.*?)</a>', 'g');
                matches = re.exec(NewMessValueVK);
                AvtorMessVk = matches[1].substr(0, 42);
                //alert(AvtorMessVk);
                if (AvtorMessVk.length == 42) AvtorMessVk += "...";
                //
                var re = new RegExp('act=show&id=' + idsntfordop + '.*["|\'] class=["|\']new messageSubject["|\']><span.{0,3}>(.*?)</span>', 'ig');
                matches = re.exec(NewMessValueVK);
                matches = (matches) ? matches[1] : IDL('MsgFromChat');
                //alert(idsntfordop+matches);
                TopicMessVk = matches.substr(0, 42);
                if (TopicMessVk.length == 42) TopicMessVk += "...";

                var re = new RegExp('act=show&id=' + idsntfordop + '.*["|\'] class=["|\']new messageBody["|\']>(.*?)</a>', 'g');
                matches = re.exec(NewMessValueVK);
                TextMessVk = matches[1].substr(0, 42);
                if (TextMessVk.length == 42) TextMessVk += "...";

                NewMessArrarParamsVk.push(escape(AvtorMessVk) + ";" + escape(TopicMessVk) + ";" + escape(TextMessVk) + ";" + idsntfordop);
            }


            CreateMessStyle(NewMessArrarParamsVk, idsnt, kmess);

            //alert(idsnt[0]);
            //idsnt=Array("135825624");
            //get_quick_message(idsnt[idsnt.length-1],kmess,idsnt.length-1,idsnt);
        }
    });
}


function get_quick_message(idmess,kmess,nummess,idsnt){
vk_rand = Math.round((Math.random() * (1000000 - 1)));

response=ajax_bm("/mail.php?act=show&id="+idmess,"","GET");
var re=new RegExp("<table.+>([\\s\\S]+)<textarea id=\"reply_field","gmi");
var rs=re.exec(response);

var msgtime=rs[0].split('<div class="topTime">')[1].split('</div>')[0];
rs[0]='<div id="aj_messageFields"'+rs[0].split('<div id="messageFields"')[1];                                                                                                                                                                                                                         // </td></tr></table>
rs=rs[0]+vk_rand+"\" name=\"message"+vk_rand+"\" onKeyPress=\"if (event.keyCode==10 || (event.ctrlKey && event.keyCode==13)) {go_speed_otv(this.value);}\" style=\"width:402px; height:100px; margin: 5px 12px\"></textarea></form></div></div></div></td></tr>";


var re = /name="secure" value="(.*?)"/g;
while (value = re.exec(response)) {
var vk_secure=value[1];
}
var re = /name="chas" value="(.*?)"/g;
while (value = re.exec(response)) {
var vk_chas=value[1];
}
var re = /name="photo" value="(.*?)"/g;
while (value = re.exec(response)) {
var vk_photo=value[1];
}
var re = /name="to_id" value="(.*?)"/g;
while (value = re.exec(response)) {
var vk_to_id=value[1];
}
var re = /name="to_reply" value="(.*?)"/g;
while (value = re.exec(response)) {
var vk_to_reply=value[1];
}
var re = /name="act" value="(.*?)"/g;
while (value = re.exec(response)) {
var vk_act=value[1];
}
var re = /name="misc" value="(.*?)"/g;
while (value = re.exec(response)) {
var vk_misc=value[1];
}
var re = /name="title" value="(.*?)"/g;
while (value = re.exec(response)) {
var vk_title=value[1];
}

if(vk_photo==undefined){
vk_photo="";
}

var paramsmess=Array(vk_secure,vk_chas,vk_photo,vk_to_id,vk_to_reply,vk_act,vk_misc,vk_title);

//rs=rs.split('id="messageFields"').join('id="aj_messageFields"');
rs=rs.split('id="postMessage"').join('id="aj_postMessage"');
var texar='<ul class=\'nNav\' style=\'float: left\'>'+GetStylesBtnCode('aj_messageBody',"")+'</ul>';
rs=rs.split('</ul>').join(GetStylesBtnCode('aj_postMessage',"")+'</ul>');
boxM(rs,kmess,nummess,idsnt,paramsmess,msgtime,"/mail.php?act=show&id="+idmess); //
paramsmess_temp=paramsmess;
nummess_temp=nummess;
idsnt_temp=idsnt;
kmess_temp=kmess;
}


function go_speed_otv(text){
  post_quick_message(eval("message"+vk_rand+".value"),paramsmess_temp,nummess_temp,idsnt_temp,kmess_temp);
}

var BoxM;
function boxM(pagemess,kmess,nummess,idsnt,paramsmess,boxtitle,fullink){
posted_speed_message_vk=1;
  vMsgBoxM = new MessageBox({title: '<table width=90%><tr><td>'+unescape("%u041D%u043E%u0432%u043E%u0435%20%u0441%u043E%u043E%u0431%u0449%u0435%u043D%u0438%u0435")+'</td><td style="text-align: right;">'+boxtitle+'</td></tr></table>',width: 495, closeButton: true,fullPageLink : (fullink)?fullink:false});
  vMsgBoxM.content("<link rel='stylesheet' href='css/dialog2.css' type='text/css' />"+pagemess+'<br><div id="messout'+vk_rand+'" class="vkWarnMessage" style="width:450px;">');
  vMsgBoxM.removeButtons();
  vMsgBoxM.setOptions({onHide: function(){vMsgBoxM.content('');}});
  vMsgBoxM.setOptions({onHide: function(){
posted_speed_message_vk=0;
updateLeftNavMenu();}  });
  vMsgBoxM.addButton({
  onClick: function(){
  	vMsgBoxM.hide(0);
 	  posted_speed_message_vk=0;
  },
  style:'button_no',
  label: unescape("%u0417%u0430%u043A%u0440%u044B%u0442%u044C")
  }).addButton({
  onClick: function(){
  post_quick_message(eval("message"+vk_rand+".value"),paramsmess,nummess,idsnt,kmess);
//     vMsgBoxM.hide(200);
  },
  label: unescape("%u041E%u0442%u043F%u0440%u0430%u0432%u0438%u0442%u044C%21")
  });
  if(kmess>1){
  vMsgBoxM.addButton({
  onClick: function(){
  next_quick_message(nummess,idsnt,kmess);
//     vMsgBoxM.hide(200);
  },
  style:'button_no',
  label: unescape("%u0421%u043B%u0435%u0434%u0443%u0439%u0448%u0438%u0435%20%u0441%u043E%u043E%u0431%u0449%u0435%u043D%u0438%u0435")
  });
  }
  vMsgBoxM.show();
ge('reply_field'+vk_rand).focus();
}


function post_quick_message(text,paramsmess,nummess,idsnt,kmess){
response=ajax_bm("/mail.php","secure="+paramsmess[0]+"&chas="+paramsmess[1]+"&photo="+paramsmess[2]+"&to_id="+paramsmess[3]+"&to_reply="+paramsmess[4]+"&act="+paramsmess[5]+"&misc="+paramsmess[6]+"&title="+encodeURIComponent(paramsmess[7])+"&ajax=1&message="+encodeURIComponent(text),"POST");

//alert("secure="+paramsmess[0]+"&chas="+paramsmess[1]+"&photo="+paramsmess[2]+"&to_id="+paramsmess[3]+"&to_reply="+paramsmess[4]+"&act="+paramsmess[5]+"&misc="+paramsmess[6]+"&title="+encodeURIComponent(paramsmess[7])+"&ajax=1&message="+encodeURIComponent(text)+"\n\n\n"+response);
//alert(response);
var r=new RegExp(unescape("%3C/a%3E%20%u043E%u0442%u043F%u0440%u0430%u0432%u043B%u0435%u043D%u043E"),"g");
if(r.exec(response)){
//
document.getElementById('messout'+vk_rand).innerHTML=unescape("%3Cb%3E%3Ccenter%3E%u0421%u043E%u043E%u0431%u0449%u0435%u043D%u0438%u0435%20%u0443%u0441%u043F%u0435%u0448%u043D%u043E%20%u043E%u0442%u043F%u0440%u0430%u0432%u043B%u0435%u043D%u043E%21%3C/center%3E%3C/b%3E");
//if(kmess>1){
//next_quick_message(nummess,idsnt,kmess);
//}else{
posted_speed_message_vk=0;
setTimeout('vMsgBoxM.hide(200);',100);
updateLeftNavMenu();
//}
}else{
document.getElementById('messout'+vk_rand).innerHTML=unescape("%3Cb%3E%3Ccenter%3E%u0421%u043E%u043E%u0431%u0449%u0435%u043D%u0438%u0435%20%u041D%u0415%20%u043E%u0442%u043F%u0440%u0430%u0432%u043B%u0435%u043D%u043E%21%20%u041F%u043E%u043F%u0440%u043E%u0431%u0443%u0439%u0442%u0435%20%u0435%u0449%u0435%20%u0440%u0430%u0437%21%3C/center%3E%3C/b%3E");
}
}

function next_quick_message(nummess,idsnt,kmess,otpravleno){
vMsgBoxM.hide(200);
nummess=Number(nummess)-1;
kmess=Number(kmess)-1;
//alert("idsnt.length-1: "+Number(idsnt.length-1)+";");
get_quick_message(idsnt[nummess],kmess,nummess,idsnt)
}


///////////////////////////////////////////////////////////////////////
/////////////////////////////END///////////////////////////////////////
//////////////////////////FUNCTION/////////////////////////////////////
/////////////////////////////BY////////////////////////////////////////
///////////////////////////miXOnIN/////////////////////////////////////
///////////////////////////////////////////////////////////////////////

///////////////
//ext wall fnc
function WallMsgObajaxingLink(){
var nodes=document.getElementsByTagName("a");
  for (var i=0;i<nodes.length;i++){                                               // onclick="AjMsgFormTo('+id+'); return false;"
   var node=nodes[i];
   var re=/wall.php\?act=write\&id=(.+)/i;
   if (node.href && node.href.match(re)) {
    var id=node.href.match(re)[1];
    node.onclick='return vkwind(\''+id+'\');';
    //if (document.location.href.match("wall.php")){ node.href='javascript: vkwind(\''+id+'\'); void(0);';}
    }
  }
}


function InitWallExt(){
var dloc=document.location.href;
if (dloc.match("wall.php.gid=") || dloc.match("wall.php.id=")){
 var wid=dloc.match(/id=(\d+)/i)[1];
 wid=dloc.match("gid")?-wid:wid;
 var lnk='<span class=\'divide\'>[</span>'+
   '<a href="/graffiti.php?act=draw&to_id='+wid+'">'+IDL('graffiti')+'</a><span class=\'divide\'>|</span>'+
	 '<a href="/photos.php?to_id='+wid+'">'+IDL('photo')+'</a><span class=\'divide\'>|</span>'+
	 '<a href="/video.php?to_id='+wid+'">'+IDL('video')+'</a><span class=\'divide\'>|</span>'+
	 '<a href="/audio.php?to_id='+wid+'">'+IDL('audio')+'</a><span class=\'divide\'>]</span>';
 ge('wallpage').getElementsByTagName('div')[0].innerHTML+=lnk;

}
if (ge('wall') && !ge('wallfncadded') && (ge('fBox2')|| location.href.match('wall.php')) && !location.href.match('album')) {
WallMsgObajaxingLink();

var ewl=ge('wall_shown');
if (!dloc.match("wall.php") && ewl){  //Manual update wall on click [x-y]
  var dloc=location.href;
  wid=dloc.match(/\d+/);
  wid=(dloc.match("profile") && !wid)?vkgetCookie('remixmid'):wid;
  if (wid){
  wid=(dloc.match("club") || dloc.match("event"))?-wid:wid;
  ewl.innerHTML=ewl.innerHTML.replace(/(\d+-\d+)/,'<a href="javascript: getWallPage('+wid+', 0);">[$1]</a>');
  }
  var wArrow=ge('wall').innerHTML.match(/<div class="dArrow".+/i)
  if (wArrow){
    var elem=geByClass("header");
    elem=elem[elem.length-1];
    elem.innerHTML=wArrow+elem.innerHTML;
  }
}


wpost=getElementsByClass('wallpost');i=0; while(wpost[i]) {y=0;
 while(wpost[i].getElementsByTagName('div')[y]){
if (wpost[i].getElementsByTagName('div')[y].className=='actions'){
	tempid=wpost[i].getElementsByTagName('a')[0].href.split('id')[1];
temp=wpost[i].getElementsByTagName('div')[y].innerHTML;
/*
/////quick post to wall by ^mIXonIN^
if (getSet(57)=='y'){
var r = /\;id=(.*?)"/g;           //"
while (value = r.exec(temp)) {
to_idw=value[1];
}
if (typeof to_idw !='undefined'){
temp=str_replace_("/wall.php?act=write&amp;id="+to_idw,"javascript: vkwind("+to_idw+");",temp);}
}
/////////////////// */
 wpost[i].getElementsByTagName('div')[y].innerHTML=
	'<a href="/mail.php?act=write&to='+tempid+'" onclick="return AjMsgFormTo('+tempid+');"><small>@</small></a>'+
	' <a onClick="walladv(\'id'+tempid+'_'+y+'_'+i+'\');"><small>+</small></a><span class=\'sdivide\'>|</span>'+
	temp.replace(/<small>([^<]+)<\/a>/ig,'<small>$1</small></a>')+'</small>'+
	'<div id="id'+tempid+'_'+y+'_'+i+'" style="display:none !important;"><small><span class=\'sdivide\'>[</span>'+IDL('send2wall')+
	 '<a href="/graffiti.php?act=draw&to_id='+tempid+'">'+IDL('graffiti')+'</a><span class=\'sdivide\'>|</span>'+
	 '<a href="/photos.php?to_id='+tempid+'">'+IDL('photo')+'</a><span class=\'sdivide\'>|</span>'+
	 '<a href="/video.php?to_id='+tempid+'">'+IDL('video')+'</a><span class=\'sdivide\'>|</span>'+
	 '<a href="/audio.php?to_id='+tempid+'">'+IDL('audio')+'</a><span class=\'sdivide\'>]</span></small></div>';
	}
 y++;}
i++;}

WallMsgObajaxingLink();
wall_node=(ge('fBox2'))?ge('fBox2'):ge('content');
walladdfnc=document.createElement('input');
walladdfnc.id='wallfncadded';
walladdfnc.value='true';
walladdfnc.type='hidden';
wall_node.appendChild(walladdfnc);
}
}
////////////////
///update left menu

/*function updateLeftNavMenu() {
  //Ajax.Send                                   // function(ajaxObj, responseText)
  AjPost("/settings.php",{'act':'change_services'}, function(req){
   if(lastmenu_cont!=req.responseText){
    ge('nav').innerHTML = req.responseText;
    new_check();
    lastmenu_cont=req.responseText;
    vkMenu();
   }
  });
}*/

function vkLoadLeftMenu(){
  AjPost('/settings.php',{'act':'change_services', 'ajax':1},function(req){
      ge('nav').innerHTML = req.responseText;
      BlockProfileLinks(ge('sideBar'));
      //new_check();
      lastmenu_cont=req.responseText;
      if (getSet(37)>0) walltest();
      vkMenu();
  });
}
var lastmenu_cont='';
var LMnuAjax;
function GetCheckNavMenu(){LMnuAjax.post('/settings.php',{'act':'change_services'})}
function updateLeftNavMenu(ajax, responseText){
       if((lastmenu_cont!=responseText) && (responseText.length>10) && responseText.match(/<li/i)){
        ge('nav').innerHTML = responseText;
        BlockProfileLinks(ge('sideBar'));
        new_check();
        lastmenu_cont=responseText;
        if (getSet(37)>0) walltest();
        vkMenu();

      }
     setTimeout("GetCheckNavMenu();",vk_upd_menu_timeout);
};


(function() {
//--- Main Variables ---//

var vQuery	= '';
var vHost	= '';
var vPHP	= '';
var vAct	= null;
var vId		= null;
var remixmid	= '';

/**********************************************************************************
POEHALI

Funktsii delyatsya
na VkoptNNN() - sobstvenno kornevye,
i na AvkNNN() - vyzyvaemye iz kornevyh
**********************************************************************************/
//--- Functions. Area: Vkontakte.ru ---//
function VKOpt()
{
/**/
//if (location.href.match('/im.php')) {	SendToEnter(-1); return;}

  if (!IDBit || IDBit=='')
   if ( (!vkgetCookie('vkOVer') || vkgetCookie('vkOVer').split('_')[0]<vVersion) && vk_showinstall)
   { InstallRelease();  return;  }



if (ge('quickLogin') || ge('try_to_login')) return;

if (!vkgetCookie('remixbit')) {
 if (!IDBit || IDBit=='') vksetCookie('remixbit', DefSetBits, 365, location.host);
 else vksetCookie('remixbit', IDBit, 365, location.host);
}
  VKOptStylesInit();
  if (location.href.match('/im.php') || location.href.match('/im_')) { return;}
  //if (ge('content')) VK_CheckPage();
  //vk_checkint=setInterval("VK_CheckPage();",vk_check_page_timeout);

  if (getSet(59)=='y'){
  if (typeof Ajax!='undefined'){  // auto-update left menu
       LMnuAjax = new Ajax();
 		   LMnuAjax.onDone = updateLeftNavMenu;
 		   LMnuAjax.onFail = updateLeftNavMenu;
       lastmenu_cont=ge('nav').innerHTML;
       setTimeout("GetCheckNavMenu();",vk_upd_menu_timeout);
        //setInterval(function(){LMnuAjax.post('/settings.php',{'act':'change_services'})},vk_upd_menu_timeout);

      //setInterval("updateLeftNavMenu();",vk_upd_menu_timeout);
      //if (ge('nav')){lastmenu_cont=ge('nav').innerHTML;}else{lastmenu_cont="";}
    }
  }



	var Splinter =	location.href.split('/');

	// adres Host'a
	var vHost =	Splinter[2].split('.').reverse()[1];

	// stranitsa (vsyo posle "vkontakte.ru/")
	var Page =	Splinter.reverse()[0];

//--- Area: Vkontakte.ru && Vk.com---//
   if (vHost== 'vkontakte' || vHost=='vk')
    {
                //vkontakte.ru
if (location.href.match(/\w+.vkontakte.ru/)) {
    if (ge('mid') && ge('groupType')) {if (ge('mid').value.match(/\d+/i))
        location.href='http://vkontakte.ru/club'+ge('mid').value;
        }
    else if (ge('mid')) {if (ge('mid').value.match(/\d+/i))
        location.href='http://vkontakte.ru/id'+ge('mid').value;
        }
    else if (app_id)
        location.href='http://vkontakte.ru/app'+app_id;
}
                //vk.com
if (location.href.match(/\w+.vk.com/)) {
    if (ge('mid') && ge('groupType')) {if (ge('mid').value.match(/\d+/i))
        location.href='http://vk.com/club'+ge('mid').value;
        }
    else if (ge('mid')) {if (ge('mid').value.match(/\d+/i))
        location.href='http://vk.com/id'+ge('mid').value;
        }
    else if (typeof app_id!='undefined')
        location.href='http://vk.com/app'+app_id;
}

//if (testinger) IDFrAjax();

//if (getSet(39)=='y') { delCookie('remixemail'); delCookie('remixpass'); }

if (vkgetCookie('remixbit').split('-').length == 7) if (vkgetCookie('IDFriendsNid')) {
	vksetCookie('remixbit', vkgetCookie('remixbit')+'-'+vkgetCookie('IDFriendsNid'), 365, location.host);
	delCookie('IDFriendsNid');
	}

if (getSet(8) == 'n') IDFrOnlineTO=setTimeout(null, 99000);
var today = new Date();
		if (Page.split('.')[1]) // pryamoe ukazanie na PHP-fail
			vPHP= Page.split('.')[0];

		if (Page.split('?')[1]) // est' query
		{
			vQuery= Page.split('?')[1];
			if (Page.split('?')[2]) vQuery+= Page.split('?')[2]; // po-moemu, eto na sluchai ./idNNN?MMM
			if (vQuery.split('act=')[1])
			{
				vAct= vQuery.split('act=')[1].split('&')[0];
			}
			else
			{
				vAct= 'really_nothing'; // uzhe ne pomnyu v chem smysl, no tak nado!
			}

			if (vQuery.split('id=')[1])
			{
				vId= vQuery.split('id=')[1].split('&')[0];
			}
		}
		else
		{
			if (Page.split('club')[1])
			{
				vId= Page.split('club')[1];
			}
			if (Page.split('id')[1])
			{
				vId= Page.split('id')[1];
			}
		}

		if (!Page.split('.')[1]) // ne PHP-ssylka ("/club1" vmesto "/groups.php?act=s&id=1")
		{


			vPHP= Page.split('')[0]+ Page.split('')[1];

			if (vPHP== 'id')
				vPHP= 'profile';
			if (vPHP== 'cl')
				vPHP= 'groups';
			if (vPHP== 'vi')
				vPHP= 'video';
			if (vPHP== 'ev')
				vPHP= 'events';
			if (vPHP== 'fe')
				vPHP= 'feed';
			if (vPHP== 'fr')
				vPHP= 'friend';
		}

if (location.href.match('act=vkopt')) {// pokazat' nastroiki
	VkoptSettings();
	//return;
	}

if (location.href.match('/away')) if (getSet(16) == 'y'){
	location.href=unescape(location.href.split('to=')[1]);
  }
if (!ge('pageLayout')) return;

  vkInject2Ajax();  //Ajax hooking
 //  alert('ok');
addcss='';
if (getSet(41)=='y') { addcss+='#pageLayout {width: '+(parseInt(ge('pageLayout').clientWidth)+150)+'px !important;} ';
vkaddcss(addcss);
addcss='';
bars='<div id="rightBar" style="width: 140px !important; margin-top:5px !important;margin-right:5px !important; margin-left:5px !important;float:right !important;padding-top:10px !important;"> </div>';
document.getElementById('sideBar').outerHTML+=bars;
}

bars=document.createElement('div');
bars.id='vkupdate';bars.style='width: 120px !important; text-align: center !important; border: 1px white solid !important; visibility: hidden !important;';
if (getSet(41)=='y') document.getElementById('rightBar').appendChild(bars);
else document.getElementById('sideBar').appendChild(bars);

/*if (ge('myLink') && getSet(26)==0) {
friendsSortedByAdd='test';var heads = document.getElementsByTagName("body");if (heads.length > 0) {
var node = document.createElement("script");node.type = "text/javascript";node.src  = "/friendJS.php?act=sortedByAdd";
node.onload = "tmpfriendsSortedByAddInfo=new Array();for(var key in friendsSortedByAddInfo.list)tmpfriendsSortedByAddInfo.push(key);friendsSortedByAdd=tmpfriendsSortedByAddInfo;";
heads[0].appendChild(node);}}   */

/*if (ge('checkboxFeed')) {temp=ge('checkboxFeed').outerHTML; ge('checkboxFeed').outerHTML=''; ge('rightBar').innerHTML+=temp;
ge('checkboxFeed').style='text-align:left !important; width: 120px !important;display: block !important; margin: 0px !important;position: relative !important; left:0px !important; top: 0px !important;';
}*/

if (document.getElementById('home').getElementsByTagName('a')) document.getElementById('home').getElementsByTagName('a')[0].innerHTML='[ vkOpt+ ]';

document.title=document.title.split(' | ').reverse().join(' | ')+' | [vkOpt]';

if (getSet(24)=='y') vkad();

if (getSet(37)>0) walltest();

if (getSet(30) > 0) vkClock();

//if (getSet('-',3) != today.getDate()) {
// if (getSet(27)=='y') {
if (document.getElementById('myprofile')) {
var tid=document.getElementById('sideBar').innerHTML.split('mail.php')[1].match(/id=(\d+)/)[1];
setTimeout(function(){
 var heads = document.getElementsByTagName("head");
 nows=  new  Date(); var datsig=nows.getYear()+"_"+nows.getMonth()+"_"+nows.getDate()+"_";
 datsig+=Math.floor(nows.getHours()/4); //raz v 4 chasa
 //    http://kiberinfinity.narod.ru/update.js
 var updatejs='http://vkopt.net.ru/update.js';
 if (heads.length > 0) {
  var node = document.createElement("script");
  node.type = "text/javascript";
  node.src = updatejs+"?"+datsig;   //http://vkoptimizer.narod.ru/update.js
  heads[0].appendChild(node);
  }
},5);
}
//}
//}
if (document.getElementById('sideBar')) {
var frOpt = '<div class=\'moreDiv\'><ol id=\'nav\' style=\'margin-bottom:0px;\'><li id=frOpt><a href=# onClick="SwichVkoptSettings()">[VKopt]</a></li></ol></div>';
if (document.getElementById('sideBar').getElementsByTagName('ol')[0]) document.getElementById('sideBar').getElementsByTagName('ol')[0].innerHTML+=frOpt;
else if (location.href.match('/index.')) document.getElementById('sideBar').innerHTML+=frOpt;
if (vkLinks.length > 1) document.getElementById('frOpt').outerHTML+='<li id=frLinks>'+vkLink(0)+'</li>';
vkMenu();
if (!document.getElementById('vkstatus'))
document.getElementById('sideBar').getElementsByTagName('ol')[0].innerHTML+=
'<div id="vkstatus"></div>';
}

if (1==0) {
document.getElementById('quickSearch').innerHTML='';
document.getElementsByTagName('head')[0].innerHTML+='<style>.topNav {padding-right: 40px;}</style>';
getElementsByClass('topNav','ul')[0].getElementsByTagName('li')[0].outerHTML+=
'<li style="width:7.2em"><a onClick="javascript:vktransopcll(\'vkQSearch\');" style="cursor: hand;">[&nbsp;qSearch&nbsp;]</a></li>';
document.getElementById('pageHeader').outerHTML+=
'<div id="vkQSearch" width=750 height=40px style="display: none; background-color: #32608a; color: #dae1e8">'+
'</div>';
}

//tut
		//if (getSet(55)=='y') status_icq();


		whbutton();
		vk_LightFriends_init();

	if (((vPHP== 'events') || (vPHP== 'groups')) && (vAct== 'members') && (getSet(4) == 'y'))
		VkoptEvent();

/**/
  if ((vPHP== 'settings') && (vAct!= 'vkopt'))
		document.getElementById('content').getElementsByTagName('ul')[0].innerHTML+=
		'<LI><A href="settings.php?act=vkopt"><b class=\'tl1\'><b></b></b><b class=\'tl2\'></b>'+
    '<b class=\'tab_word\'>VKOpt</b></A></LI>';
/**/
	if (((vPHP== 'groups') || (vPHP== 'profile') || (vPHP== 'wall')) && (getSet(5) == 'y'))
		VkoptUnwrap();

//--- IvDor scripts ---//

/*
getSet(0) = VkoptAudio
getSet(1) = VkoptVideo
getSet(2) = IDApps
---
getSet(3) = VkoptBlCod

getSet(4) = VkoptEG
getSet(5) = VkoptImage
getSet(6) = VkoptGroupsInCols
getSet(7) = IDNamesInCols
---
getSet(8) = IDFrOnline
getSet(9) = IDFrCommon
getSet(10) = IDAppsProf
getSet(11) = IDAppsList
---
getSet(12) = IDActivity
getSet(13) = IDVideoAlbum
getSet(14) = IDPhotoSelect
getSet(15) = IDVideoSelect
getSet(16) = IDAway
---
getSet(17) = IDFFavor
getSet(18) = IDGCommon
---
getSet(19) = Uvedomlenie o novom
getSet(20) = Upravlenie vidimost'u
getSet(21) = Added/deleted friends
---
getSet(22) = Menu
getSet(23) = News avatars
getSet(24) = AD remove
*/

MsgObajaxingLink();
//BlockProfileLinks();
//PrepareUserPhotoLinks();
PrepareUserPhotoProfile();
vkModLink();

UserOnlineStatus();

		if (document.getElementById('myLink')) {
			if (getSet(20) == 'y') IDprofile();
			var IDProfTime = 15*60000;
			}

		if (vkgetCookie('IDFriendsUpd') && (vkgetCookie('IDFriendsUpd') != '_')) {
			document.getElementById('sideBar').innerHTML+='<div id="remadd" align="center">&nbsp;</div>';
			}

if (location.href.match('/news') && !location.href.match('act=bookmarks'))
	vkPageNews();

if (location.href.match('/video'))
	vkPageVideo();

if (location.href.split('/friend.')[1])
	vkPageFriend();

if (location.href.split('/friends.')[1]){
  friendsFilter = new FriendsFilter(friendsData, ge('friend_lookup'), {pageSize: 50, onDataReady: onListRender});
  check_usfr();
  }

if (location.href.split('/app')[1])
	vkPageApps();

if (location.href.split('/mail.')[1])
	vkPageMail();

if (location.href.match('/club') || location.href.match('/id') || location.href.match('/profile.php'))
	{vkPageProfile();}


if (location.href.split('/photos.')[1] || location.href.match('/album') ||
   (location.href.match('/photo')))// && location.href.match('_')))
   if (!location.href.match('gid='))
	vkPagePhotos();

if (location.href.match('/fave.')) vkReplaceEventsLink();

if (location.href.match('/search.') || location.href.match('/fave.')
	|| ((location.href.match('/id') || location.href.match('/profile.'))
		 && document.getElementById('userProfile')))
	vkClosed();

if (getSet(0) == 'y')
	VkoptAudio(false);
  RemDuplMain(); //wihtout if

if (location.href.match('/club') || location.href.match('/board') || location.href.match('/groups') || location.href.match('gid=')
 || location.href.match('/event') || location.href.match('/topic'))
	vkPageClub();

if (location.href.match('/photos.') || location.href.match('/album'))
 if (document.getElementById('header')) if (document.getElementById('header').getElementsByTagName('a')[0])
 if (document.getElementById('header').getElementsByTagName('a')[0].href.match('club')
     || (document.getElementById('header').getElementsByTagName('a')[0].href.match('gid=')))
	vkPageClub();

//if (location.href.match('/profile.') || location.href.match('/club') || location.href.match('/id') || location.href.match('/videosearch'))
//	if (getSet(13) == 'y')
	//IDVideoAlbum();

		if (vPHP == 'profile') {
			if (getSet(8) == 'y') IDFrOnline();
			if (getSet(8) == 'n') IDFrOnline_get();
			if (getSet(9) == 'y') IDFrCommon();
			if (getSet(9) == 'n') IDFrCommon_get();
if (document.getElementById('notes')) IDNotes();
if (getSet(36)=='y') if (document.getElementById('albums')) if (document.getElementById('albums').getElementsByTagName('h3')[0]) IDAlbums('pr');
if (getSet(36)=='y') if (document.getElementById('videos')) if (document.getElementById('videos').getElementsByTagName('h3')[0]) IDVideos('pr');
		}

		if (vPHP == 'groups') if (getSet(36)=='y') {
if (document.getElementById('albums')) if (document.getElementById('albums').getElementsByTagName('h3')[0]) IDAlbums('gr');
if (document.getElementById('videos')) if (document.getElementById('videos').getElementsByTagName('h3')[0]) IDVideos('gr');
}

		if (getSet(16) == 'y') if (!location.href.match('/news.') && !location.href.match('/newsfeed.')) IDAway();

		if ((getSet(21) == 'y') && (!vkgetCookie('IDFriendsUpd')) && (getSet('-',7)) && (vkgetCookie('remixbit').split('-')[2] != '0')) {
			if (confirm('Refresh friendsList NOW ?')) IDFriends(getSet('-',7));
			else {	if (vkgetCookie('IDFriendsUpd') != null) vksetCookie('IDFriendsUpd', vkgetCookie('IDFriendsUpd'), 1);
				else vksetCookie('IDFriendsUpd', '_', 1);
				}
			}
		else if ((getSet(21) == 'y') && (!getSet('-',7)) && (vkgetCookie('remixbit').split('-')[2] != '0')) IDFriends_new();

		if (getSet(17) == 'y') best('online');
if (vkgetCookie('AdmGr')) if (vkgetCookie('AdmGr').split('-')[1]) IDAdmGrList('profile');

		if (getSet(18)=='y' && (vPHP == 'profile')) groups();
		else if (getSet(18)=='n') if (vkgetCookie('GrList')) delCookie('GrList');

		if (getSet(21) == 'y') IDFriendsUpdList();

		if (location.href.match('wall.php')) {
    WallMsgObajaxingLink();
   if (location.href.match('act=write'))
			document.getElementById('message_text').onkeypress='if((event.ctrlKey) && ((event.keyCode == 0xA)||(event.keyCode == 0xD))){postWall(this)};';
		 if (ge('wall'))
			ge('wall').innerHTML+=getElementsByClass('clearFix summaryBar')[0].outerHTML;
		}

		if ((getSet(19) == 'y' || getSet(33)=='y') && document.getElementById('myprofile')) new_check();

if (document.getElementById('friends') && !location.href.match('settings.php')) {
document.getElementById('friends').getElementsByTagName('a')[1].href='javascript:IDFrAll_get();';
document.getElementById('friends').getElementsByTagName('a')[1].innerHTML='[ '+document.getElementById('friends').getElementsByTagName('a')[1].innerHTML+' ]';
}
/* for wall: */
InitWallExt(); //add vkopt functions and links to wall
if (ge('wall')) {vkDownLinkOnWall()};
// vkSmilizer();

// Video - Delete Me
if (document.getElementById('myprofile'))
	var mid=document.getElementById('sideBar').innerHTML.split('mail.php')[1].match(/id=(\d+)/)[1];
if (document.getElementById('videotags')) {
if (document.getElementById('videotags').getElementsByTagName('span').length) {
var list=document.getElementById('videotags').getElementsByTagName('span');
for (j= 0; j< list.length; j++) {
 if (sid=list[j].getElementsByTagName('a')[0])
 if (sid=(sid.href.split('id')[1])?sid.href.split('id')[1]:sid.href.split('?id=')[1])  //if (sid=sid.href.split('?id=')[1])
 if (sid == mid) {
  document.getElementById("videoactions").innerHTML+=list[j].getElementsByTagName('a')[1].outerHTML.split('>')[0]+'>'+IDL("delme")+'</a>';
  }
 }
}}
// Photo - Delete Me
if (document.getElementById('phototags')) {
if (document.getElementById('phototags').getElementsByTagName('span').length) {
var list=document.getElementById('phototags').getElementsByTagName('span');
for (j= 0; j< list.length; j++) {
 if(sid=list[j].getElementsByTagName('a')[0])
 if (sid=(sid.href.split('id')[1])?sid.href.split('id')[1]:sid.href.split('?id=')[1]) //if(sid=sid.href.split('id')[1]) //if(sid=sid.href.split('?id=')[1])
 if (sid == mid) {
  document.getElementById("photoactions").innerHTML+=list[j].getElementsByTagName('a')[2].outerHTML.split('>')[0]+'>'+IDL("delme")+'</a>';
  }
 }
}}

//setTimeout(vk_bars, 1000);

if (vkgetCookie('remixsid')) if (getSet(31)=='y') setTimeout(addCalendar,2000);

//--- Area: Vkadre.ru---//
	}

if ((vHost== 'vkadre') && (location.href.split('video')[1]))
	VkoptVideoVkadre();

if ((vHost== 'vkadre') && (location.href.split('/search?')[1]))
	VkoptVideoVkadreList();

}     //vkopt function end
if (vkgetCookie('remixbit') != null) window.onLoad=scan();
document.addEventListener('DOMContentLoaded', VKOpt, false);

})();

function VKOptStylesInit(){
if (getSet(47)=='y') SetUnReadColor();
if (getSet(58)=='y') {
  var FullAvaCss='.memImg, .userpic, .image50, .feedFriendImg{ height:auto !important;  } '+
                 '.peopleResults td#results .result div.image {height:auto !important;} ';
  vkaddcss2(FullAvaCss);}
//ajax messages
vkaddcss("#vkWarnMessage, .vkWarnMessage {border: 1px solid #d4bc4c;background-color: #f9f6e7;padding: 8px 11px;font-weight: 700;font-size: 11px;margin: 0px 10px 10px;}");
if (getSet(45)=='y') {vkaddcss(".audioText, .audioTitle{ width:270px;  }")} else {vkaddcss(".audioText, .audioTitle{ width:300px;  } ")}

var vkmnustyle='.vkactionspro { list-style: none; margin: 20px 0 10px 1px; padding: 0;}'+
'.vkactionspro li {border-bottom: 1px solid #ffffff; border-bottom-color: #ffffff; border-bottom-width: 1px;border-bottom-style: solid;font-size: 1em;}'+
'.vkactionspro li a {border: none;border-top: 1px solid #ffffff;background: #ffffff;padding: 3px 3px 3px 6px;}'+
'.vkactionspro li a:hover {background: #dae1e8;border-top: 1px solid #cad1d9;border-top-color: #cad1d9;border-top-width: 1px;border-top-style: solid;}'+
'.VKAudioPages { list-style-type: none; padding-left:0px; height: 20px; margin:0px 0px 5px;  float:right;}'+
'.VKAudioPages li { float: left; margin-right: 1px; padding: 2px 6px;}'+
'.VKAudioPages li.current { border: 1px solid #DAE1E8; background-color:#fff;}';
vkaddcss(vkmnustyle);
if (location.href.match('settings')){vkaddcss("ul.t0 .tab_word { margin: 5px 8px 0px 8px;}");}
}

function scan() {
if (location.href.split('profile.php')[1] || location.href.split('/id')[1]) {
 if ((vkgetCookie('remixbit').split('-')[1] == '2') || getSet(0,4)=='1')
	IDprofile_off();
 }
else if (getSet('-',4)=='1') IDprofile_off();
if (vkgetCookie('remixbit').split('-')[1] == '0') IDprofile_on();
}

function IDprofile_on(m) {
IDProfTime = 10*60000;
if ((vkgetCookie('remixbit').split('-')[1] == '0') || (m==1)) {
if (m==null) IDprofileTO = setTimeout(IDprofile_on, IDProfTime);
//var http_request = false;
//;http_request = new XMLHttpRequest();
//if (http_request.overrideMimeType){} if (!http_request) {alert('XMLHTTP Error'); return false; 	return http_request;}
var date = new Date();
AjGet("/profile.php");
//http_request.open("GET", "/profile.php", false);
//http_request.send("");
}
}

function IDprofile_off() {
/*
if (vkgetCookie('remixemail')) var rmail = vkgetCookie('remixemail');
if (vkgetCookie('remixpass')) var rpass = vkgetCookie('remixpass');
if (vkgetCookie('remixmid'),1) var rmid = vkgetCookie('remixmid');  //
if (vkgetCookie('remixsid')) var rsid = vkgetCookie('remixsid');
   var http_request = false;
       http_request = new XMLHttpRequest();
    if (http_request.overrideMimeType)
       {

       }
    if (!http_request) {
       alert('XMLHTTP Error'); return false;
	return http_request;
    }
http_request.open("GET", "/login.php?op=logout", false);
http_request.send("");
if (getSet(39)=='y') { if (rmail) vksetCookie('remixemail', rmail); if (rpass) vksetCookie('remixpass', rpass); }
if (rmid) vksetCookie('remixmid', rmid);
if (rsid) vksetCookie('remixsid', rsid);
setSet('-',0,4);
rmail='';rpass='';rmid='';rsid='';
*/
}

function AvkFillEvent()
/* Otmechaet vseh druzey galochkami v priglashenii na vstrechu posle nazhatiya sootv. knopki */
{
	var i = 0;
	for(i= 0; i< 10000; i++)
		document.getElementById('inviteFriends').elements[i].checked= true;
}

function VkoptEvent()
/* dobavlyaet knopku "Select All" v priglashenie na vstrechu */
{
getElementsByClass('iPanel')[0].innerHTML='<tr><td><a style= "color: #36638E; cursor: pointer;" href="#selall" onClick= "javascript:IDGroupEventSelect_tag();">[ '+IDL("selall")+' ]</a></td></tr>'+
	getElementsByClass('iPanel')[0].innerHTML;
/*	var Swap = document.getElementById("inviteFriends").getElementsByTagName("table")[0].innerHTML;
	document.getElementById("inviteFriends").getElementsByTagName("table")[0].innerHTML=
	'<tr><td><input type= "checkbox" checked=true"></td><td></td></tr>'+
	Swap;
*/
}

function AvkFillGroup(temp)
/* Otmechaet vseh druzey galochkami v priglashenii v gruppu posle nazhatiya sootv. knopki */
{
if (document.getElementById('toinvite').style.display=='none') {
for (n=0; n<19; n++) {
var divs = document.getElementsByTagName('div');
for (k = 0; k< divs.length; k++) {if (divs[k].className== 'iPanel') break;}
 if (document.getElementsByTagName('div')[k].getElementsByTagName('div')[0]) {
   fr=document.getElementsByTagName('div')[k].getElementsByTagName('div')[0].outerHTML.split('(')[1].split(')')[0];
   addToInvite(fr);
   document.getElementById('friendtr'+fr).outerHTML='';
 }
}
setTimeout("AvkFillGroup('t')", 2000);
if (document.getElementById('toinvitemembers').getElementsByTagName('').length)
	inviteFriends();
}
else for (n=0; n<19; n++) {
var divs = document.getElementsByTagName('div');
for (k = 0; k< divs.length; k++) {if (divs[k].className== 'iPanel') break;}
 if (document.getElementsByTagName('div')[k].getElementsByTagName('div')[0])
	setTimeout("AvkFillGroup('t')", 2000);
}
}

function VkoptGroup()
/* dobavlyaet knopku "Select All" v priglashenie v gruppu */
{
	var j = 0;
	var divs = document.getElementsByTagName('div');

	for (j = 0; j< divs.length; j++)
		if (divs[j].className== 'iPanel')
			break;

	var Qout = divs[j].getElementsByTagName('table')[0];

	var Swap = Qout.innerHTML;
	Qout.innerHTML=
		'<tr><td align="center"><a style="cursor: pointer; border-top: 3px solid white;" onClick="javascript:AvkFillGroup();">'+
		IDL("selall")+
		'</a><img src= "/images/upload.gif" id= "waitBar" style= "visibility: hidden;"></td></tr>'+
		Swap;
}

function VkoptUnwrap()
/* razvorachivaet kartinki na stene v shirinu steny */
{
	var j = 0;
	var m = 0;
	var iAddress = 0;
	var iDiv = null;
	var iNewImg = null;
	var iNewA = null;

	var divs = document.getElementsByTagName('div');

	for (j= 0; j< divs.length; j++)
	{
		if (divs[j].getElementsByTagName('img')[0])
			if (divs[j].getElementsByTagName('img')[0].className== 'iIcon')
			{
				iNewImg= divs[j].getElementsByTagName('img')[1].src;
				iNewA= divs[j].getElementsByTagName('a')[1].href;

				divs[j].innerHTML=
				'<div class= "feedPhotos"><a href= "'+ iNewA+ '"><img src= "'+ iNewImg+ '" style= "width: 95%;"></a></div>';
			}
	}
}

//--- [TerminatoR] aka IvDor scripts ---//

function IDShut() {
if (document.getElementById('friendsCommon')) {
return collapseBox('friendsCommon', (document.getElementById('friendsCommon').getElementsByTagName('div')[1]), 0.6, 0.3);
document.getElementById('friendsCommon').getElementsByTagName('div')[2].getElementsByTagName('h2').innerHTML=
  document.getElementById('friendsCommon').getElementsByTagName('div')[2].getElementsByTagName('h2').innerText;
}
}

function settime(time) {
var timers=vkgetCookie('remixbit').split('-');
timers[5]=time;
vksetCookie('remixbit', timers.join('-'));
document.getElementById('tektime').innerHTML=getSet('-',5);
}

function setfeed(time) {
var timers=vkgetCookie('remixbit').split('-');
timers[6]=time;
vksetCookie('remixbit', timers.join('-'));
document.getElementById('tekfeed').innerHTML=getSet('-',6);
}

function setFrRefresh(day) {
var prefs=vkgetCookie('remixbit').split('-');
prefs[2]=day;
vksetCookie('remixbit', prefs.join('-'));
document.getElementById('tekfrdays').innerHTML=getSet('-',2);
}

function setmode(mode) {
var prefs=vkgetCookie('remixbit').split('-');
prefs[1]=mode;
vksetCookie('remixbit', prefs.join('-'));
IDprofile();
if (mode == '0') IDprofile_on();
if (mode == '2') IDprofile_off();
}

function new_side(response) {
listm='   ';
if (document.getElementById('vknewmail')) listm=document.getElementById('vknewmail').outerHTML;
var sidenew = response.split('<div id="sideBar">')[1].split('<ol id=\"nav\">')[1].split('<!--')[0];
if (getSet(37)>0) {
 n=vkgetCookie('remixbit').split('-')[8].split('_')[WallIDs.length];
 sidenew+='<li><a href="wall.php" id=liwall>'+IDL('wall')+((WallIDs.length>1 && getSet(37)>2) ? '<small>'+n+'</small>' : '')+' <b>!</b></a></li>';
 }
document.getElementById('sideBar').getElementsByTagName('ol')[0].innerHTML=sidenew;
for (i=0;i<document.getElementById('sideBar').getElementsByTagName('li').length; i++) {
li=document.getElementById('sideBar').getElementsByTagName('li')[i];
 if (li.innerHTML.match('mail.php')) if (!li.getElementsByTagName('b')[0]) listm='';
 }
//if (getSet(33) == 'y') if (listm!='' && document.getElementById('vknewmail')) listm=document.getElementById('vknewmail').outerHTML;
vkMenu();
if (getSet(37)>0) walltest();
else new_check();
}

function new_check(wall) {
if (vkgetCookie('IDNew') == null) vksetCookie('IDNew', '0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0');
 this.soundNew = new vkNew();
var cook = new Array();
var a='0';
var len=document.getElementById('sideBar').getElementsByTagName('li').length;
if (document.getElementById('frOpt')) len=len-1;
if (document.getElementById('frLinks')) len=len-1;
if (document.getElementById('liwall')) len=len-1;
var mailreqi=0;
for (i=0;i<len; i++) {
li=document.getElementById('sideBar').getElementsByTagName('li')[i];
 if (li.getElementsByTagName('b')[0]) {
	if (li.innerHTML.match('mail.php')) var mailreqi=i;
//if (!li.innerHTML.match('/wall')) {
  cook[i]=li.getElementsByTagName('b')[0].innerHTML;
  if (cook[i] > vkgetCookie('IDNew').split('-')[i]) a++;
//}
  }
 else cook[i]='0';
 }
if (a == '0') vksetCookie('IDNew', cook.join('-'));
if ((a != '0') || (wall)) {
vksetCookie('IDNew', cook.join('-'));
 if (getSet(19) == 'y') this.soundNew.notification.play();
}
 if (mailreqi>0 && getSet(33)=='y') mailreq(mailreqi);

//if (ge('myLink')) if (testinger==1) testingerfn();
}

function mailreq(x) {
/*if (!x){s=document.createElement('script');
s.id='tempmail';
src="http://userapi.com/data?act=inbox&from=0&to=5&sid="+vkgetCookie('remixsid')+"&back=tempm=eval";
s.src=src;// alert(src);
s.onload='mailreq(tempm)';
document.getElementsByTagName('body')[0].appendChild(s);
s=null;ge('tempmail').outerHTML='';}
*/
var http_request = false;
http_request = new XMLHttpRequest();
if (http_request.overrideMimeType){} if (!http_request) {alert('XMLHTTP Error'); return false; 	return http_request;}
http_request.open("GET", "/feed2.php?mask=m", false);
http_request.send("");
var newData = eval("("+http_request.responseText+")");
if (newData.messages.count > 0) {
var count=newData.messages.count;
if (count>5) count=5;
if (newData.messages.count < count) count=newData.messages.count;
 lista='<div id=vknewmail>';
 for (i in newData.messages.items) {
  lista+='<a align=right border=0 margin=0 href="mail.php?act=show&id='+i+'">'+newData.messages.items[i]+'</a>';
 }

 lista+='</div>';
if (ge('vkmails')) if (!document.getElementById('vknewmail'))
 li=document.getElementById('vkmails').innerHTML+=lista;
}
}

function utf(s) {
function getByte(s,i) {
return s.charCodeAt(i)&255;
}
var r='';
var i=0,n=0;
while(i<s.length) {
n=getByte(s,i);
     if ((n&252)==252) n=((n&1)<<30)+((getByte(s,++i)&63)<<24)+((getByte(s,++i)&63)<<18)+((getByte(s,++i)&63)<<12)+((getByte(s,++i)&63)<<6)+(getByte(s,++i)&63)
else if ((n&248)==248) n=((n&3)<<24)+((getByte(s,++i)&63)<<18)+((getByte(s,++i)&63)<<12)+((getByte(s,++i)&63)<<6)+(getByte(s,++i)&63)
else if ((n&240)==240) n=((n&7)<<18)+((getByte(s,++i)&63)<<12)+((getByte(s,++i)&63)<<6)+(getByte(s,++i)&63)
else if ((n&224)==224) n=((n&15)<<12)+((getByte(s,++i)&63)<<6)+(getByte(s,++i)&63)
else if ((n&192)==192) n=((n&63)<<6)+(getByte(s,++i)&63);
r+=String.fromCharCode(n);
i++;
}
return r;
}

function getElementsByClass(searchClass,tag,node) {
        var classElements = new Array();
        if ( tag == null )
               tag = '*';
        if ( node == null )
                node = document;
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;

        for (i = 0, j = 0; i < elsLen; i++) {
               if (els[i].className == searchClass) {
                    classElements[j] = els[i];
                   j++;
              }
        }
        return classElements;
}

function vkIsFunction(obj) {
	return Object.prototype.toString.call(obj) === "[object Function]";
}

function vkIsArray(obj) {
	return Object.prototype.toString.call(obj) === "[object Array]";
}

function vk_ParseJSON(text, filter)
{
var j;
 function walk(k, v) {
 var i;
  if (v && typeof v === 'object') {
   for (i in v) {
   if (Object.prototype.hasOwnProperty.apply(v, [i])) {
    v[i] = walk(i, v[i]);
    }
  }
 }
return filter(k, v);
}

if (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(text.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, ''))) {
 j = eval('(' + text + ')');
 return typeof filter === 'function' ? walk('', j) : j;
}
throw new SyntaxError('parseJSON');
};
    //"
/*function IDIgnor_set(id) {
if (confirm(IDL("confblack"))) {
var http_request = false;
http_request = new XMLHttpRequest();
if (http_request.overrideMimeType){} if (!http_request) {alert('XMLHTTP Error'); return false; 	return http_request;}
http_request.open("GET", "/settings.php?act=addToBlackList&id="+id, false);
http_request.send("");
var response = http_request.responseText;
if ((response.split('id="message">')[1]) != null) alert (response.split('id="message">')[1].split('</')[0]);
if ((response.split('id="error">')[1]) != null) alert (response.split('id="error">')[1].split('</')[0]);
}
}*/

function IDIgnor_set(id){
  if (confirm(IDL("confblack"))) {
    AjGet("/settings.php?act=blacklist",function(req){
      req=req.responseText;
      var hash=req.match(/"hash".value="(.+)"/i)[1];
      AjPost("/settings.php",{act:"addToBlackList",hash:hash,uid:id},function(req_){
        req_=req_.responseText;
        req_=req_.match(/(<div.class="msg".{0,20}>.+)</i);
        req_=(req_)?req_[1]:"Fail";
        vk_MsgBox(req_);
      });      
    });
  }
}

function IDCommentListen(place,type) {
var http_request = false;
http_request = new XMLHttpRequest();
if (http_request.overrideMimeType){} if (!http_request) {alert('XMLHTTP Error'); return false; 	return http_request;}
http_request.open("POST", "/bookmarks.php", false);
http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//http_request.setRequestHeader("Content-Transfer-Encoding", "binary");
http_request.send("act=add&place_id="+place+"&type="+type);
//photo_type==100
//_type==101
//topic_type==102
//_type==103
}


function AddTopic2Bookmark_(){      //no captcha support
if (ge('vkbookprog')){ge('vkbookprog').innerHTML='<img src="'+base_domain+'images/upload.gif">'; show('vkbookprog');}
var bmurl='board.php?act=a_post_answer&tid='+ge('tid').value+
           '&post=[bookmark]&hash='+ge('hash').value+'&gid='+
           ge('gid').value+'&add_bookmark=1';
AjGet(bmurl,function(req){
req=req.responseText;
var bmid=req.match(/delete_comment\((\d+)[\s\S]{10,100}"\}/);
if (bmid){
  AjGet('board.php?act=a_delete_comment&id='+bmid[1]+'&tid='+ge('tid').value,function(req){
  hide('vkbookprog');
  if (req.responseText.match("restore_comment")){ alert(IDL('topicadded'));}
  });
} else { hide('vkbookprog'); alert(IDL('addtopicerr'))}
});
}


function AddTopic2Bookmark(){   //with captcha and other support
if (ge('vkbookprog')){ge('vkbookprog').innerHTML='<img src="'+base_domain+'images/upload.gif">'; show('vkbookprog');}
  var callback = function(ajaxObj, text) {
    if (text == "flood_control" || text.charAt(0) == 'r') {
      hide('vkbookprog');
      alert(IDL('addtopicerr'));
    } else {
      var bmid=text.match(/delete_comment\((\d+)[\s\S]{10,100}"\}/);
      if (bmid){
        AjGet('board.php?act=a_delete_comment&id='+bmid[1]+'&tid='+ge('tid').value,function(req){
        hide('vkbookprog');
        if (req.responseText.match("restore_comment")){ alert(IDL('topicadded'));}
        });
      } else { hide('vkbookprog'); alert(IDL('addtopicerr'))}
    }
  };
  var params = {'act': 'a_post_answer', 'tid': ge('tid').value, 'post': "[2bookmark]", 'hash': ge('hash').value, 'gid': ge('gid').value, 'add_bookmark': "1"};
  var cancel = function(obj, text) {hide('vkbookprog'); }
  var options = {onSuccess: callback, onFail: cancel, onCaptchaHide: cancel};
  Ajax.postWithCaptcha('/board.php', params, options);
}

function vkBookmark() {
/*
topics
vkontakte.ru/bookmark.php?
act=a_subscribe&
type=20&
owner_id=-1448795&
place_id=1927440&
hash=1f86b8d785daecd9b2

vkontakte.ru/bookmark.php?act=a_subscribe&type=20&owner_id=-1628&place_id=21683686&hash=8eaef69b
*/
/*
photos
vkontakte.ru/bookmark.php?
act=a_subscribe&
type=21,
14782277,
127308539,
8f9fbd2323f29a6636
*/
var type=20;
 ajax = new Ajax();
 ajax.onDone = function() {alert(IDL('topicadded'))};
 ajax.post('/bookmarks.php', {'act': 'a_subscribe', 'type': type, 'owner_id': '-'+document.getElementById('gid').value, 'place_id': document.getElementById('tid').value, 'hash': document.getElementById('hash').value});
}

function IDFrOpt() {
var list='';
if (location.href.split('/video')[1])
	list += vkPageVideo(1);
if (location.href.split('/news.')[1])
	list += vkPageNews(1);
if (location.href.split('/wall.')[1])
	list += vkPageProfile(1);
if (location.href.match('/club') || location.href.match('/board') || location.href.match('/groups') || location.href.match('/topic') || location.href.match('gid='))
	list += vkPageClub(1);
if (location.href.match('/photos.') || location.href.match('/album'))
 if (document.getElementById('header')) if (document.getElementById('header').getElementsByTagName('a')[0])
 if (document.getElementById('header').getElementsByTagName('a')[0].href.match('club') ||
     (document.getElementById('header').getElementsByTagName('a')[0].href.match('gid=')) ||
     (document.getElementById('header').getElementsByTagName('a')[0].href.match('event')))
	list += vkPageClub(1);
if (location.href.split('/mail.')[1])
	list += vkPageMail(1);
if (location.href.split('/friend.')[1] || location.href.split('/friends.')[1])
	list += vkPageFriend(1);
if (location.href.split('/photos.')[1] || location.href.split('/album')[1])
	list += vkPagePhotos(1);
if (location.href.match('/app'))
	list += vkPageApps(1);
if (location.href.split('/friend.')[1])
	list += vkClosed(1);
return list;
}

function vkFrCat2Menu(ret){
  var str='';
  if (typeof vkFrCatList!='undefined'){
  for (var key in vkFrCatList){ str+='<a href="friends.php?usfr'+key+'">-- '+vkFrCatList[key]+'</a>\n';}
  }
  if (ret) {return str;} else {
    if (ge('vkMnuFr'))  ge('vkMnuFr').innerHTML=str; 
    else setTimeout(function(){ge('vkMnuFr').innerHTML=str},1500);
  }
}
  
function vkLoadFiendsGroups(sh){
 AjGet('notes.php?act=new',function(req){
  req=req.responseText;
  var fcs=req.match(/friends_lists = (.+);/i)[1];
  if (sh) {window.prompt("Copy to vkops.js","vkFrCatList="+fcs+";");} else {
  eval("vkFrCatList="+fcs);
  vkFrCat2Menu();}
  });}

mtime=setTimeout(null, 999999);
function vkMenu() {
if (document.getElementById('sideBar')) {
mtime=setTimeout(null, 999999);

var frOpt='';
if (!document.getElementById('frOpt')) {
	frOpt += '<div class=\'moreDiv\'><ol id=\'nav\' style=\'margin-bottom:0px;\'><li id=frOpt><a href=# onClick="VkoptSettings()">[VKopt]</a></li></ol></div>';
}
if (document.getElementById('sideBar').getElementsByTagName('ol')[0])	document.getElementById('sideBar').getElementsByTagName('ol')[0].innerHTML+=frOpt;
else document.getElementById('sideBar').innerHTML+=frOpt;
if (vkLinks.length > 1) if (!document.getElementById('frLinks')) document.getElementById('frOpt').outerHTML+='<li id=frLinks>'+vkLink(0)+'</li>';
}
vkStatus('[Menu Creating]');
var cach=Math.floor(Math.random()*100000);
for (i in document.getElementById('sideBar').getElementsByTagName('a'))
	if (document.getElementById('sideBar').getElementsByTagName('a')[i].href && document.getElementById('sideBar').getElementsByTagName('a')[i].href.match('mail\.php'))
	{vkmid=document.getElementById('sideBar').getElementsByTagName('a')[i].href.match(/id=(\d+)/)[1]; break;}
var len = document.getElementById('sideBar').getElementsByTagName('li').length;
for (z=0; z<len; z++) {
li=document.getElementById('sideBar').getElementsByTagName('li')[z];
if (li.getElementsByTagName('a')[0].outerHTML.match('VkoptSettings'))
	var page= 'vkopt';
else if (li.getElementsByTagName('a')[1])
    var page= 'vkoptid';
else if (li.getElementsByTagName('a')[0].href.split(location.host+'/')[1])
	var page= li.getElementsByTagName('a')[0].href.split(location.host+'/')[1].split('.')[0];
/*else if (li.getElementsByTagName('a')[0].href.split('javascript')[1])
	var page= 'btns';*/
if (li.getElementsByTagName('a')[0].href.match('#frLink'))
	var page= 'frlink';

var x1 = 200;
var x2 = 280;
var s1=' onMouseOver=\"javascript:clearTimeout(mtime);\" onClick=\"javascript:vktransopcl();\" onMouseOut=\"javascript:mtime=setTimeout(vktransopcl,1000);\"'+
	' style=\"display:none; border:1px gray solid; position:absolute; z-index:100; left: '+x1+'px;\" cellspacing=0 cellpadding=0';
var list='';
if (document.getElementsByTagName('body')[0].currentStyle.background) bg=document.getElementsByTagName('body')[0].currentStyle.background;
else bg='#ffffff';
ts='<table id="vk'+page+'s" class="vkmenutable" bgcolor="'+bg+'" '+s1+'><tr><td width=120px cellspacing=0 cellpadding=0 border=0>';
tr='</td></tr></table>';
vkStatus('[Menu Creating]<br>'+page);


if (getSet(28) > 0) if (li.getElementsByTagName('a')[0].innerHTML.split(' ') && li.getElementsByTagName('a')[0].innerHTML.split(' ')[0].length==my_length)
li.getElementsByTagName('a')[0].innerHTML=li.getElementsByTagName('a')[0].innerHTML.split(' ').slice(1).join(' ');


if (page=='vkoptid') {
if (getSet(28) >0 ) li.getElementsByTagName('a')[1].innerHTML=li.getElementsByTagName('a')[1].innerHTML.split(' ').slice(1).join(' ');
if (getSet(28) == 3) li.getElementsByTagName('a')[1].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[1].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[1].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/home.png\">&nbsp;"+li.getElementsByTagName('a')[1].innerHTML;
}



// frOpt
//if (page=='btns') continue;

	if (page=='vkopt')
if(typeof Vk_NoMnuLinks=='undefined'){
list=IDFrOpt()+
'<a href="javascript:vkLoadLeftMenu();">'+IDL('updateLMenu')+'</a>'+
'<b><a href="http://vkopt.net.ru/forum/">- VkOpt Forum</a></b>'+
'<b><a href="/id13391307">- Bkontakte</a></b>';
//'<b><a href="/id14782277">- Bkontakte</a></b>';
}else{
list=IDFrOpt();
}


if (page=='frlink')
list=vkLink();

// friends
	if (page=='friends') {
if (getSet(22) == 'y') {	list=
'<a href="friends.php?'+cach+'">- '+IDL("mFrA")+'</a>'+
'<a href="friends.php?filter=online&'+cach+'">- '+IDL("mFrO")+'</a>'+
'<a href="friends.php?filter=recent">- '+IDL("mFrNew")+'</a>';
if (li.getElementsByTagName('b').length==1) list+='<a href="friends.php?filter=requests&'+cach+'">- '+vk_lang["mFrR"]+'</a>';
list+='<div id="vkMnuFr"></div>';
}
//li.getElementsByTagName('a')[0].href="/friends.php?"+cach;
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/freinds.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// photo
	if (page=='photos') {
if (getSet(22) == 'y') {	list=
'<a href="photos.php?id='+vkmid+'">- '+IDL("mPhM")+'</a>'+
'<a href="photos.php?act=user">- '+IDL("mPhW")+'</a>'+
'<a href="photos.php?act=new">- '+IDL("mPhN")+'</a>'+
'<a href="photos.php?act=comments">- '+IDL("mPhC")+'</a>'+
'<a href="photos.php?act=albums">- '+IDL("mPhA")+'</a>';
}
if (li.getElementsByTagName('b').length==1) list+='<a href="photos.php?act=added&'+cach+'">- '+vk_lang["mTags"]+'</a>';
//li.getElementsByTagName('a')[0].href="/photos.php?id="+vkmid;
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/photo.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// video
	if (page=='video') {
if (getSet(22) == 'y') {	list=
'<a href="video.php">- '+IDL("mViM")+'</a>'+
'<a href="video.php?act=tagview">- '+IDL("mViW")+'</a>'+
'<a href="video.php?act=new">- '+IDL("mViN")+'</a>';
}
if (li.getElementsByTagName('b').length==1) list+='<a href="video.php?act=tagview&'+cach+'">- '+vk_lang["mTags"]+'</a>';
//li.getElementsByTagName('a')[0].href="/video.php?"+cach;
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/videos.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Audio
	if (page=='audio') {
if (getSet(22) == 'y') {	list=
'<a href="audio.php">- '+IDL("mAuM")+'</a>'+
'<a href="audio.php?act=edit">- '+IDL("mAuE")+'</a>'+
'<a href="audio.php?act=new">- '+IDL("mAuN")+'</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/audios.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Mail
	if (page=='mail') {
if (getSet(22) == 'y') {	list=
'<a href="mail.php">- '+IDL("mMaI")+'</a>'+
'<a href="mail.php?out=1">- '+IDL("mMaO")+'</a>'+
'<a href="/im.php?act=a_box&popup=1" target="_blank" onclick="im_popup(); return false;">- '+IDL('mQuickMessages')+'</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/mail.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Notes
	if (page=='notes') {
if (getSet(22) == 'y') {	list=
'<a href="notes.php">- '+IDL("mNoM")+'</a>'+
'<a href="notes.php?act=new">- '+IDL("mNoN")+'</a>'+
'<a href="notes.php?act=comms">- '+IDL("mNoC")+'</a>'+
'<a href="notes.php?act=friends">- '+IDL("mNoF")+'</a>'+
'<a href="notes.php?act=fave">- '+IDL("mNoI")+'</a>';
}
//li.getElementsByTagName('a')[0].href="/notes.php?"+cach;
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/notes.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Groups
	if (page=='groups') {
if (getSet(22) == 'y') {	list=
'<a href="groups.php">- '+IDL("mGrM")+'</a>'+
//'<a href="/club400400">- '+
'<a href="browse.php">- '+IDL("mGrS")+'</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/groups.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Events
	if (page=='events') {
if (getSet(22) == 'y') {	list=
'<a href="events.php?act=list">- '+IDL("mEvF")+'</a>'+
'<a href="events.php?act=list&past=1">- '+IDL("mEvL")+'</a>'+
'<a href="events.php?act=calendar">- '+IDL("mEvC")+'</a>'+
'<a href="events.php?act=create">- '+IDL("mEvN")+'</a>'+
'<a href="ebrowse.php">- '+IDL("mEvS")+'</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/events.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Faves
	if (page=='fave') {
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/fave.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// News
	if (page=='newsfeed') {
if (getSet(22) == 'y') {	list=
'<a href="newsfeed.php?'+cach+'">- '+IDL("mNeF")+'</a>'+
'<a href="newsfeed.php?section=groups&'+cach+'">- '+IDL("mNeG")+'</a>'+
'<a href="newsfeed.php?section=comments&'+cach+'">- '+IDL("mNeB")+'</a>'+
'<a href="photos.php?act=comments&user=1&'+cach+'"> '+IDL("mNeFW")+'</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/news.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Settings
	if (page=='settings') {
if (getSet(22) == 'y') {	list=
'<a href="settings.php">- '+IDL("mSeO")+'</a>'+
'<a href="settings.php?act=privacy">- '+IDL("mSeP")+'</a>'+
'<a href="settings.php?act=notify">- '+IDL("mSeN")+'</a>'+
'<a href="settings.php?act=blacklist">- '+IDL("mSeB")+'</a>'+
'<a href="settings.php?act=updates">- '+IDL("mSeU")+'</a>'+
'<a href="#" onClick="javascript:VkoptSettings();">- VKOpt</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/settings.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Matches
	if (page=='matches') {
if (getSet(22) == 'y') {	list=
'<a href="matches.php">- '+IDL("mMaM")+'</a>'+
'<a href="matches.php?act=search">- '+IDL("mMaS")+'</a>'+
'<a href="matches.php?act=sent">- '+IDL("mMaSe")+'</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/matches.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Opinions
	if (page=='opinions') {
if (getSet(22) == 'y') {	list=
'<a href="opinions.php">- '+IDL("mOpA")+'</a>'+
'<a href="opinions.php?act=outbox">- '+IDL("mOpO")+'</a>'+
'<a href="opinions.php?act=friends">- '+IDL("mOpF")+'</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/opinions.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Apps
	if (page=='apps') {
if (getSet(22) == 'y') {	list=
'<a href="apps.php">- '+IDL("mApM")+'</a>'+
'<a href="gsearch.php?from=apps">- '+IDL("mApA")+'</a>';
}
if (li.getElementsByTagName('b').length==1) list+='<a href="apps.php?act=notifications&'+cach+'">- '+vk_lang["mTags"]+'</a>';
//li.getElementsByTagName('a')[0].href="/apps.php?"+cach;
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/apps.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Questions
	if (page=='questions') {
if (getSet(22) == 'y') {	list=
'<a href="questions.php">- '+IDL("mQuM")+'</a>'+
'<a href="questions.php?act=add_question">- '+IDL("mQuN")+'</a>'+
'<a href="questions.php?act=all">- '+IDL("mQuS")+'</a>'+
'<a href="questions.php?act=friends">- '+IDL("mQuF")+'</a>'+
'<a href="questions.php?act=answered">- '+IDL("mQuA")+'</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/questions.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

// Market
	if (page=='market') {
if (getSet(22) == 'y') {	list=
'<a href="market.php">- '+IDL("mMaA")+'</a>'+
'<a href="market.php?show=my">- '+IDL("mMaN")+'</a>'+
'<a href="market.php?show=fave">- '+IDL("favorites")+'</a>'+
'<a href="market.php?show=friends">- '+IDL("mMaF")+'</a>';
}
if (getSet(28) == 3) li.getElementsByTagName('a')[0].innerHTML="<img src=\""+vkSideImg(page)+"\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
else if (getSet(28) > 1) li.getElementsByTagName('a')[0].innerHTML="<img src=\"http://vkoptimizer.narod.ru/icons/market.png\">&nbsp;"+li.getElementsByTagName('a')[0].innerHTML;
}

if (getSet(22) == 'y' || page=='vkopt') {
// all
//li.getElementsByTagName('a')[0].outerHTML=
lil=li.getElementsByTagName('a')[0].outerHTML.split('>');
var lil2='';

if (li.getElementsByTagName('a')[1])
	lil2=li.getElementsByTagName('a')[1].outerHTML;
	lil[0]+='onMouseOver="javascript:(function(){clearTimeout(mtime); vktransopcl(\'vk'+page+'s\');})()" onMouseOut="javascript:mtime=setTimeout(vktransopcl,1000);"';
	li.innerHTML=lil.join('>')+lil2;
if (list!='') {
//	if (vkUserMenu[page]) list=vkUserMenu[page];
	li.innerHTML+=ts+list+tr;
	}

  if (getSet(66)=='y') {
    if (!vkFrCatList || vkFrCatList=='') {
      list+='<div id="vkMnuFr"></div>'; 
      vkLoadFiendsGroups();
    } else { vkFrCat2Menu();}
  }
  
}
}

if (getSet(29)=='n') { var j=0;
while (x=getElementsByClass('leftAd')[j]) {
if (x.innerHTML.match('blog.')) x.outerHTML=''; j++; }
}
vkStatus('');
//////////////// bY miXOnIN
if (getSet(60)=='y'){
vkStatus('Loading messages...');
setTimeout(function(){
var msgs=ge('sideBar').getElementsByTagName('ol')[0].getElementsByTagName('li')[5].innerHTML.match(/\(<B>(.*?)<\/B>\)/i);//[1]
msgs=(msgs)?msgs[1]:0;
checkForNewMessVK(msgs);
},10);}
////////////////
}


function vktransopcll(page) {
if (page=='vkQSearch') {
vkQSlist='<table><tr>'+
'<td width=150px><b>User Search</b><form method="get" action="search.php" name="qsearch"><input type="text" name="q" size="20"/><input type="hidden" name="act" value="quick" /><input style="display: none;" type="submit" value="Go"/></form></td>'+
'<td width=230px><b>Video Search</b><form method="post" action="videosearch.php" name="vSearch"><input type="hidden" id="add" name="add" value="1"/>'+
	'<input type="hidden" id="to_id" name="to_id" value="0"/><input type="text" name="q" size="30"/><input style="display: none;" type="submit" value="Go" /></form></td>'+
'<td width=230px><b>Audio Search</b><form name="audioSearch" action="audiosearch.php" method="post"><input type="hidden" value="1" name="add"/>'+
'	<input type="hidden" value="0" name="gid"/><input type="hidden" value="0" name="to_id"/><input type="text" value="" size="30" name="q"/><input type="submit" value="Go" style="display: none;"/></form></td>'+
'<td width=230px><b>Apps Search</b><form name="searchApp" method="GET" action="apps.php"><input type="hidden" name="act" value="all">'+
	'<input type="hidden" name="gid" value="0"><input type=hidden name="sort" value="0"><input type="text" size="30" name="s"><input type=submit style="display: none;"></form></td>';
'</tr></table>';
 if (document.getElementById(page)) {
  if (document.getElementById(page).innerHTML.length<=4) {
	document.getElementById(page).innerHTML=vkQSlist;
	document.getElementById(page).style.display='block';
	}
  else  {
	document.getElementById(page).innerHTML='';
	document.getElementById(page).style.display='none';
	}
 }
}
}

function vktransopcl(page) {
if (page != null) {
if (document.getElementById(page))
	if (document.getElementById(page).style.display=='none') {
		document.getElementById(page).style.display='block';
		document.getElementById(page).style.left = document.getElementById(page).parentNode.offsetLeft+60+'px';
	}
}

for (i=0; li = document.getElementById('sideBar').getElementsByTagName('li')[i]; i++) {
	if (li.getElementsByTagName('table')[0] && (li.getElementsByTagName('table')[0].id != page))
		li.getElementsByTagName('table')[0].style.display='none';
}

}

function vkLink(m) {
if (m==0) listl='<a href="#frLink">'+vkLinks[0]+'</a>';
else {
listl='';
for (a=1; a < vkLinks.length; a++) {if(vkLinks[a].length==2)
listl+='<a target="_blank" href="'+vkLinks[a][1]+'">'+vkLinks[a][0]+'</a>'; else
listl+='<a onClick="'+vkLinks[a][1]+'">'+vkLinks[a][0]+'</a>';
}
}
return listl;
}

function walladv(id) {
ge(id).style.display=(ge(id).style.display=='none'?'block':'none');
}
function parseRes(response)
{
response= response.replace(/^[\s\n]+/g, '');
if(response.substr(0,10)=="<noscript>")
{
try{
var arr = response.substr(10).split("</noscript>");
eval(arr[0]);
return arr[1];
}catch(e){return response;}
}else{return response;}
}

function vkaddcss(addcss) {
var styleElement = document.createElement("style");
styleElement.type = "text/css";
styleElement.appendChild(document.createTextNode(addcss));
document.getElementsByTagName("head")[0].appendChild(styleElement);
addcss='';
}

function vkaddcss2(css){
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
	}
}
}


function messagecheck(text) {
reg=/(?:^|\.)\s*(\w)/img;
vkBox('clear');
alert(text.value.search(reg));
if (text.value.match(reg)) text.innerHTML=text.value.replace(reg,'$0');
}

function walltest(nx,wx) {
if (!vkgetCookie('remixbit').split('-')[8]) setSet('-','0_0',8);
if (getSet('-',8).split('_').length != WallIDs.length+1) {
	var sett = vkgetCookie('remixbit').split('-');
	if(getSet('-',8).split('_').length > WallIDs.length+1) sett[8]='0_0';
	podsett=sett[8].split('_');
	podsett[WallIDs.length]=0; sett[8]=podsett.join('_');
	vksetCookie('remixbit', sett.join('-'));
	}
n=vkgetCookie('remixbit').split('-')[8].split('_')[WallIDs.length];
if (getSet(37)>0)
 if (!ge('liwall'))
 ge('sideBar').getElementsByTagName('ol')[0].innerHTML+=
	'<li><a href="wall.php" id=liwall>'+IDL('wall')+((WallIDs.length>1 && getSet(37)>2) ? '<small>'+n+'</small>' : '')+' <b>!</b></a></li>';

s=document.createElement('script');
s.id='temp';wid=((WallIDs[n]=='')?'&id='+remixmid():((WallIDs[n][0]=='g')?'&id=-'+WallIDs[n].split('g')[1]:'&id='+WallIDs[n]));
src="http://userapi.com/data?act=wall"+wid+"&from=0&to=0&sid="+vkgetCookie('remixsid')+"&back=tempw=eval";
s.src=src;
s.onload='walltest2(tempw,'+n+','+wid.split('=')[1]+')';
document.getElementsByTagName('body')[0].appendChild(s);
}
function walltest2(tempw,n,wid) {
num=tempw.n;
var added=0;
var wallname='';
//wallname=text.split('wrapHI')[1].split('href=')[1].split('>')[1].split('<')[0];
		if (!isNaN(num)) {
	var sett = vkgetCookie('remixbit').split('-'); podsett=sett[8].split('_');
	nwas=n;
	was=podsett[n]; podsett[n]=num; if ((was < num) && was!=0) { added=1; newwallmess='+'+(num-was);} else newwallmess='';
	n++; if (n>=WallIDs.length) n=0;
	podsett[WallIDs.length]=n; sett[8]=podsett.join('_');
	vksetCookie('remixbit', sett.join('-'));

		ge('liwall').getElementsByTagName('b')[0].innerHTML=((getSet(37)>4) ? newwallmess : num);
		if (WallIDs[nwas]=='') ge('liwall').href='wall.php';
			else if (WallIDs[nwas][0]=='g') ge('liwall').href='wall.php?gid='+WallIDs[nwas].split('g')[1];
			else ge('liwall').href='wall.php?id='+WallIDs[nwas];
ge('temp').outerHTML='';tempw='';
if (getSet(37)>0 && getSet(37)%2==0) if (added)
 vkStatus('<a href="'+ge('liwall').href+'">wall_'+nwas+' = '+num+' (<b>'+newwallmess+'</b>)</a>'+wallname);
/*var tem='';var show=num-was; if (show > tempw.d.length) show=tempw.d.length;
for (i=0;i<show;i++) {
	tem+=tempw.d[i][2]+'<br><div align=right>'+tempw.d[i][3][1]+'</div><br><br>';
	}
if (tem) vkBox('<br>'+adec(tem));
  vkBox('<form id=wquick name=wquick method=POST action="http://userapi.com/data"><input type=hidden name=act value=add_message><input type=hidden name=id value='+wid+'><input type=hidden name=sid value='+vkgetCookie('remixsid')+'>'+
	'<textarea id=wmessage name=message value=test onkeypress="if((event.ctrlKey) && ((event.keyCode == 0xA)||(event.keyCode == 0xD))){document.wquick.submit();};"></textarea>');
*/
new_check(added);
	}
}




/*
var vk_lasthtml="";
//var vk_checkint=-1;

function VK_CheckPage() {
var newhtml=document.getElementById('content').innerHTML;

if (vk_lasthtml!=newhtml){
 //////////// functons called after page content changed
 onChangeContent();
 SetClickPostIndex();//topic
 if (!ge('wallfncadded')) InitWallExt();
 RemDuplMain();//audio
 /////////////

 vk_lasthtml=newhtml;
}
setTimeout("VK_CheckPage();",vk_check_page_timeout);
}
 */
 