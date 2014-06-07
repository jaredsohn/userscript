// ==UserScript==
// @name          Kampring VBulletin Rep-Giver
// @namespace     http://userscripts.org/scripts/show/65502
// @include       http://*.kampring.com/usercp.php
// @include       http://kampring.com/usercp.php
// @version       10081108
// @description   (Kampring Forum) automatically get (a|some) reputation(s) giver's link 
// @author        idx (http://userscripts.org/users/idx)
//
// Kampring VBulletin Rep-Giver
// Mod :: Idx
// Improved from bimatampan code
// Released under the GPL license; http://www.gnu.org/copyleft/gpl.html
//
// ----CHANGE LOG-----
/*
// mod.R.8 : 2010-08-15
// Due to "Kampring Kepenuhan", remove annoying alert("Err. status 200 failed")
// 
// mod.R.7 : 2010-05-11
// Fix undefined user/post reputation
// 
// mod.R.6 : 2010-02-17
// set userdata expiration interval (default: 12hours)
// fix freezed fetching user detail
//
// mod.R.5 : 2010-02-09
// support opera
// use bufferData if identity sender is still the same (FF Only)
//
// mod.R.4 : 2010-02-06
// Fetch user detail w/o php file
// 
// mod.R.3 : 2010-02-05
// Fix failed get set ar_table in FF 2.X
//
// mod.R.2 : 2010-01-08
*/
/*
 :: About this script ::
  ~ .foobar.
*/
// ==/UserScript==

(function () {

// Global Variables
var gvar=function() {}

const OPTIONS_BOX = {
  // Color Loader
  LIGHT_COLOR_DL_OPTIONS_TEXT:       ['00CC00']

  // Color Loader
, DARK_COLOR_DL_OPTIONS_TEXT:        ['B6B6B6']

, KEY_SAVE_IDENTITY:        'IDENTITY'
, KEY_SAVE_USER_COUNT:      'USER_COUNT'
, KEY_SAVE_DATA:            'bufferDATA'

  // Userdata expired in hour(s)
, INTERVAL_FORCE_RELOAD_USERDATA:	12
};
const GMSTORAGE_PATH      = 'GM_';

//--



// it's needed  for cross-browser work properly
ApiBrowserCheck();  // snippet code - By GI-Joe

// -- -- -- -- 
init();



// initialize global var & const
function init(){
  
  gvar.uri = {
      'avatar' : 'http://img.kampring.com/customavatars/avatar',
      'user_link' : 'http://www.kampring.com/member.php?u=',
      'rep_link' : 'http://www.kampring.com/reputation.php?p=',
      'cendol_img' : 'http://www.kampring.com/images/reputation/',
      'rep_img' : 'reputation_pos.gif',
      'rep_img2' : 'reputation_highpos.gif',
     };
     
  gvar.f =  
['uid','kampring_id','tag_id','location','join_date','total_post','avatar_url','rep_msg','rep_img','rep_img2','re 
p_count'];
  
  gvar.rep_id_tbody = 'collapseobj_usercp_reputation';
  
  gvar.userID=[];
  
  
  // let's roll
  start_Main();
}



// == ==== ==
// == MAIN ==
// =====Page manipulation====
function start_Main() {

    var tdTable; var i; 
    var tbcontainer = getContainer();
    if(!tbcontainer) return;
    
    // replacement head column
    var trTable = tbcontainer.getElementsByTagName("tr")[0];
    if(trTable){
      Attr = {'class':'thead','width':'10%', id:'psby'};
      var td = mycreateElement('td', Attr);
      Attr = {'style':'float:left'};
      var div = mycreateElement('div', Attr, false, 'Posted By');
	  mass_append(trTable, [td,div]);
      
      Attr = {'class':'thead'};
      td = mycreateElement('td', Attr, false, 'Reputation');
      trTable.appendChild(td);  
    }
    
    // add colspan for 2 additional td
    tdTable = eval_XPath("//td[contains(@colspan, 4)]");
    if(tdTable) tdTable.snapshotItem(0).colSpan = '6';
    
    // resize Thread column to 25%
    tdTable = eval_XPath("//td[@class='alt1Active' and contains(@width, '50%')]", tbcontainer);
    for(i=0;i<tdTable.snapshotLength;i++){    
        tdTable.snapshotItem(i).width="25%";	
    }       
    
    // fetch repID and postID
    var repID=[]; //var userID=[];
    var dstr = tbcontainer.innerHTML.replace(/\n|\r|\r\n/g, '').split('"time"');
    for(i=0;i<dstr.length;i++) {
      if(cucok = dstr[i].match(/alt1Active"\sid="p(\d{9})(\d+)"\swidth/i)){ 
        gvar.userID[i] = cucok[2];
        repID[i] = cucok[1];	
      }
    }
    
    // replace comment; add additional field for new column
    if( tdTable = eval_XPath("//td[@class='alt1' and contains(@width, '50%')]", tbcontainer) ) {
      for(var i=0; i<tdTable.snapshotLength; i++){
        var elem = tdTable.snapshotItem(i);
        elem.width = "65%";
    	
    	Attr = {'class':'alt1',width:'13%'};
        var td = mycreateElement('td', Attr);// posted by
    		
    	Attr = {id:'_ucnd' + i};
        var span = mycreateElement('span', Attr);
    	
    	Attr = {'class':'smallfont',
    	        href:gvar.uri['user_link']+gvar.userID[i]
    		   };
        var a1 = mycreateElement('a', Attr, false, 'u=' + gvar.userID[i]);
		mass_append(elem.parentNode, [td,span,a1]);
    	// -- 
    	Attr = {'class':'alt1',width:'13%'};
    	td = mycreateElement('td', Attr); // reputation
        
    	Attr = {id:'_pcnd' + i};
        span = mycreateElement('span', Attr);
    	
    	Attr = {'class':'smallfont',
    	        href:gvar.uri['rep_link']+repID[i]
    		   };
        a1 = mycreateElement('a', Attr, false, 'p='+repID[i]);
		mass_append(elem.parentNode, [td,span,a1]);
      } // end for
    } // end tdTable	
	
	
	// chk is re-fetch  user detail needed
	if( noneed_upd() ) {
        loadstorage(); // load from availabe storage
     }else{
        startDetail(gvar.userID, 0); // reload detail again
    }
	

}
// end retransform_table


// get container
function getContainer(){    
	var tbret = null;
    // find table reputation container
    var ar_Table = eval_XPath("//tbody[contains(@id, '"+gvar.rep_id_tbody+"')]");
    if(!ar_Table) {
      show_alert('reputation container ['+gvar.rep_id_tbody+'] not found! halted()');      
    } else {
	  tbret = ar_Table.snapshotItem(0);
	}    
	return tbret;
}


// ==chk fetch detail
function noneed_upd(){
  var Identity = GM_getValue(OPTIONS_BOX["KEY_SAVE_IDENTITY"], null);
  var is_noneed = (gvar.userID.toString() == Identity && notExpired() );
  drawLoaderImg(is_noneed);
  return is_noneed;
};


function loadstorage(){
  var prefix = OPTIONS_BOX["KEY_SAVE_DATA"] + "_";
  var cnt = parseInt(GM_getValue(OPTIONS_BOX["KEY_SAVE_USER_COUNT"], null));
  var ddata;var Obj_Data = {};
  if(!isNaN(cnt)){
    for(var i=0; i<cnt; i++){
       ddata = GM_getValue(prefix+i).split(';;');
	   for(var j in gvar.f){
	       Obj_Data[gvar.f[j]] = ddata[j];
	   } // end loop j
       if(ddata) createSender(Obj_Data, i);
    } // end loop i
	hideLoader();
  }else{    
    startDetail(gvar.userID, 0);
  }
}

/* draw loader button */
function drawLoaderImg(noneed){

  if(noneed) return;
  var parentpostby = window.document.getElementById('psby');
  
  Attr = {id:'fetcher',
          style:'height:19px;text-align:right;cursor:pointer;margin:-2px;',
		  title:'Fetch user detail'
         };
  var newElement2td1Div = mycreateElement('div', Attr);  
  var buttonCtx=addTransparentCanvas(newElement2td1Div,19,19).getContext('2d');
  draw_Button(0,buttonCtx);
  parentpostby.appendChild(newElement2td1Div);
  option_turn(true);
}

function hideLoader(){
	option_turn(false);
    try{document.getElementById('fetcher').style.display = 'none';}catch(e){}
}
// --


function startDetail(userSets, x){
 GM_xmlhttpRequest({
  	method: "get",
  	url: gvar.uri['user_link'] + userSets[x] + '?'+Math.random().toString().replace('0.',''),
	onerror: function(result) { this.onload(result); },
  	onload: function(result) {
	  if(result.status!=200) { 
	    hideLoader();
		show_alert('Err. status 200 failed', 0); 
	  }
  	  res = result.responseText.replace(/\r|\n|\t|\r\n/g, '');
	  if(res!=""){
         var dat = parseIt(res);
		 createSender(dat, x); x++;
		 if(x<userSets.length) {
		    startDetail(userSets, x);
		 }else{		  
		    hideLoader();
		    if(!gvar.isOpera) doSaveIdentity(userSets);
		 }
  	   }
	}
  });
}; 
// end func startDetail();

function parseIt(page){
  var dpage; var result = {};

  dpage = page.split('finduser')[1];
  if(ret = getBetween(dpage, 'u=(\\d+)\\"')) result[gvar.f[0]] = ret; // uid
  
  dpage = page.split('View Profile')[1];
  if(ret = getBetween(dpage, '^\\:\\s(.+)<\\/title')) result[gvar.f[1]] = ret; // kampring_id
  
  dpage = page.split('<h2>')[1];
  if(ret = getBetween(dpage, '^(.+)<\\/h2>')) result[gvar.f[2]] = ret; // tag_id
  
  if(page.indexOf('Location')!=-1){
    dpage = page.split('Location</dt>')[1].split('</dd>')[0]; //location
    if(ret = getBetween(dpage, '<dd>(.+)')) result[gvar.f[3]] = ret; 
  }else{
    result[gvar.f[3]] = 'N/A';
  }
  
  dpage = page.split('Join Date:')[1].split('</li>')[0];
  if(ret = getBetween(dpage, '>\\s(.+)')) result[gvar.f[4]] = ret; // join_date
  
  dpage = page.split('Total Posts:')[1].split('</li>')[0];
  if(ret = getBetween(dpage, '>\\s(.+)')) result[gvar.f[5]] = ret; // total_post
  
  if(page.indexOf('<td><img src="' + gvar.uri['avatar'])!=-1){
    dpage = page.split('<td><img src="' + gvar.uri['avatar'])[1].split('</td>')[0];
    if(ret = getBetween(dpage, '^(.+)\\"\\salt')) result[gvar.f[6]] = (gvar.uri['avatar'] + ret); // avatar_url
  }

  dpage = page.split('alt="'+result[gvar.f[1]])[1];
  if(ret = getBetween(dpage, '^(.*)\\"\\sborder')) result[gvar.f[7]] = result[gvar.f[1]] + ret; // rep_msg
  result[gvar.f[8]] = gvar.uri['rep_img']; // rep_img
  result[gvar.f[9]] = gvar.uri['rep_img2']; // rep_img2
  dpage = page.split('<div id="reputation">')[1].split('images/reputation/');
  result[gvar.f[10]] = parseInt(dpage.length-1); // rep_count
  
  return result;
}
// end parseIt


function createSender(data, x){
  var ucendol = function(rep_point){
     var halftag = '<img src="'+gvar.uri['cendol_img'] ;
     var bufcen = ''; var upto = (rep_point<5 ? rep_point : 5);
     for(j=0;j<upto;j++){ bufcen+= halftag + data["rep_img"] + '"/>';}
     if((j-1) < rep_point) {
  	    for(k=j;k<rep_point;k++){ bufcen+= halftag + data["rep_img2"] + '"/>';	}
     }
     return bufcen;
  }
  var inner = '<div id="_ucnddiv'+x+'" style="float:right; position:absolute; width:100px; overflow:wrap;  
text-align:center; border:1px solid #000; background-color:#F1EFBC; padding:3px; margin:5px 0 0 -110px;  
font-size:9px; display:none;"><img src="'+data["avatar_url"]+'" alt="['+data["kampring_id"]+'`s  
avatar]"/><br>'+data["tag_id"]+'<br>'+data["location"]+'<br>'+data["join_date"]+'<br>Post:  
'+data["total_post"]+'</div>';
  
  // last act, i think it's ok using innerHTML :p
  document.getElementById("_ucnd"+x).innerHTML = '<a class="smallfont" href="' +  
gvar.uri['user_link'] + data["uid"] 
    + '" onmouseout="document.getElementById(\'_ucnddiv'+x+'\').style.display=\'none\';" '
	+ 'onmouseover="document.getElementById(\'_ucnddiv'+x+'\').style.display=\'\';"  
style="float:right;"><b>'
	+ data["kampring_id"]+'</b></a><div style="float:right;clear:both;padding-top:3px;" title="'+  
data["rep_msg"]+'">'
	+ ucendol(data["rep_count"]) +'</div>' + inner;
 if(!gvar.isOpera) doSaveDat(data, x);
}
// end createSender()

function getBetween(text, regx){
  re = new RegExp(regx, "i");
  var cocokah = re.exec(text)
  return (cocokah ? cocokah[1] : "");
}

// save serial userID as an identity
function doSaveIdentity(uid){
  GM_setValue(OPTIONS_BOX["KEY_SAVE_IDENTITY"], uid.toString());
  GM_setValue(OPTIONS_BOX["KEY_SAVE_USER_COUNT"], uid.length);

  var Date_Now=new Date(); 
  Date_Now.setHours(Date_Now.getHours() +  
Math.floor(Math.abs(OPTIONS_BOX["INTERVAL_FORCE_RELOAD_USERDATA"])) );
  GM_setValue("KEY_SAVE_EXPIRED", Date_Now.getTime().toString() );
}
// save each data user as a buffer
function doSaveDat(userdata, x){
  var arDum = [];
  for(var i in gvar.f){
    arDum.push(userdata[gvar.f[i]]);
  }
  GM_setValue(OPTIONS_BOX["KEY_SAVE_DATA"] + '_' + x, arDum.join(';;'));
}

function notExpired(){
  var lastSave = GM_getValue("KEY_SAVE_EXPIRED");
  var Date_Now=new Date();
  if( lastSave ){
	return (Date_Now.getTime() > lastSave ? false : true);
  }else{
    return false;
  }  
}

// --- needed tool
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null;    }
function mycreateElement(type, attrArray, evtListener, html){
	var node = document.createElement(type);
	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}
	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	}  
	if(html) node.innerHTML = html;
	
	return node;
}
function eval_XPath (xp, par) {
    if(isUndefined(par)) par = document;
    return document.evaluate(xp, par, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function mass_append(parent, chnodes, serial){
  serial = (isUndefined(serial) ? true : false);
  var n=chnodes.length;
  if(typeof(parent)=='object' && typeof(chnodes)=='object' && n>0){
    if(serial){
      for(i=n-1;i>0;i--) chnodes[i-1].appendChild(chnodes[i]);
	  parent.appendChild(chnodes[0]);
	}else{
	  for(i=0;i<n;i++) parent.appendChild(chnodes[i]);
	}
  }
}
// end mass_append


function color(name,dark) {
  if(isDefined(dark)) { arguments.callee.dk=dark; return; }
  return color_change(arguments.callee.dk,name);
}
function color_change(dark,name) {
  return '#' + (!dark ? getValue('LIGHT_COLOR_'+name) : getValue('DARK_COLOR_'+name) );
}
function setValue(key, value, idx) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_setValue(key,value));
}
function getValue(key, idx) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_getValue(key,data[0]));
}
function option_turn(state) {
  if(isDefined(state)) {
    arguments.callee.laststate=state;
    if(isUndefined(arguments.callee.idInterval)) { arguments.callee.idInterval=0; }
    if(state && (arguments.callee.idInterval<=0)) { arguments.callee.idInterval=window.setInterval(  
function() { option_turn(); }, 100); }
  }
  else {
    var angle=draw_Button();
    if((angle%90==0) && !arguments.callee.laststate) {  
arguments.callee.idInterval=clearInterval(arguments.callee.idInterval); }
  }
}
function addTransparentCanvas(ParentEl,widthEl,heightEl) {
  var canvasEl=document.createElement('canvas');
  canvasEl.setAttribute('height',heightEl+'px');
  canvasEl.setAttribute('width' ,widthEl +'px');
  ParentEl.appendChild(canvasEl);
  return(canvasEl);
}
function draw_Button(angle,buttonCtx) {
  if(isDefined(buttonCtx)) { arguments.callee.mCtx=buttonCtx; }
  if(isDefined(angle)) { arguments.callee.mAngle=angle; } else {  
arguments.callee.mAngle=(arguments.callee.mAngle+10) % 360; }
  buttonCtx=arguments.callee.mCtx; angle=arguments.callee.mAngle;
  buttonCtx.fillStyle=color('DL_OPTIONS_TEXT');
  buttonCtx.clearRect(0,0,19,19);
  buttonCtx.save(); buttonCtx.translate(9.5,9.5); buttonCtx.rotate(Math.PI*angle/180);  
buttonCtx.translate(-9.5,-9.5);
  buttonCtx.beginPath(); buttonCtx.arc(9.5, 5,2.8,0,Math.PI*2,true); buttonCtx.fill();
  buttonCtx.beginPath(); buttonCtx.arc(9.5,14,2.8,0,Math.PI*2,true); buttonCtx.fill();
  buttonCtx.save(); buttonCtx.translate( 5,9.5); buttonCtx.rotate(Math.PI*45/180);  
buttonCtx.fillRect(-2.4,-2.4,4.8,4.8); buttonCtx.restore();
  buttonCtx.save(); buttonCtx.translate(14,9.5); buttonCtx.rotate(Math.PI*45/180);  
buttonCtx.fillRect(-2.4,-2.4,4.8,4.8); buttonCtx.restore();
  buttonCtx.restore();
  return(angle);
}

function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
}

//=========================== BROWSER DETECTION / ADVANCED SETTING  
===========================================//
function ApiBrowserCheck() {
  //delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete  
GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log:  
'+msg); } catch(e) {} }; }
  
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; show_alert('Opera  
detected...',0);
  }
  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; show_alert('GreaseMonkey Api  
detected...',0); } // test GM_hitch
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true;  
show_alert('Bugged Chrome GM Api detected...',0); }
  } else { needApiUpgrade=true; show_alert('No GM Api detected...',0); }

  if(needApiUpgrade) {
    GM_isAddon=true; show_alert('Try to recreate needed GM Api...',0);
    var ws=null; try { ws=typeof(unsafeWindow.localStorage) } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      show_alert('Using localStorage for GM Api.',0);
      GM_getValue=function(name,defValue) { var  
value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return  
defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return  
parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string':  
unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number':  
if(value.toString().indexOf('.')<0) {  
unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean':  
unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
      GM_deleteValue=function(name) {  
unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      show_alert('Using temporarilyStorage for GM Api.',0); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) {  
if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else {  
return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case  
"number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) {  
unsafeWindow.open(url,""); } }
    if(typeof(GM_registerMenuCommand)=='undefined') {
	  GM_registerMenuCommand=function(name,cmd) { GM_log("Notice:  
GM_registerMenuCommand is not supported."); 
	} } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      show_alert('Using XMLHttpRequest for GM Api.',0);
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) {  
obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror(  
{readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); };  
return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); }  
}
        request.send(obj.data); return request;
  } } } // end needApiUpgrade
  GM_getIntValue=function(name,defValue) { return parseInt(GM_getValue(name,defValue),10); }
};
// end ApiBrowserCheck

})();
/* Mod By Idx. */
