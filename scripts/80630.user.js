// ==UserScript==
// @name          Kaskus VBulletin Reputasi Giver
// @include       http://*.kaskus.us/usercp.php
// @include       http://kaskus.us/usercp.php
// @description   (Kaskus Forum) automatically get (a|some) reputation(s) giver's link 
// @author        idx (http://userscripts.org/users/idx)
// ==/UserScript==
//
// Kaskus VBulletin Rep-Giver
// Mod :: mHc@DAL.net
// Released under the GPL license; http://www.gnu.org/copyleft/gpl.html
//
// ----CHANGE LOG-----
//
// --------------------------------------------------------------------
/*
 :: About this script ::
  ~ .mHc@DAL.net.
*/

(function () {

var _const = {
    'avatar' : 'http://img.kaskus.us/customavatars/avatar',
    'user_link' : 'http://www.kaskus.us/member.php?u=',
    'rep_link' : 'http://www.kaskus.us/reputation.php?p=',
    'cendol_img' : 'http://www.kaskus.us/images/reputation/',
    'rep_img' : 'reputation_pos.gif',
    'rep_img2' : 'reputation_highpos.gif',
   };
   
var field = ['uid','kaskus_id','tag_id','location','join_date','total_post','avatar_url','rep_msg','rep_img','rep_img2','rep_count'];

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

// Global Variables
var gvar=function() {}

//=========================== BROWSER DETECTION / ADVANCED SETTING ===========================================//
function ApiBrowserCheck() {
  //delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }

  
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; show_alert('Opera detected...',0);
  }
  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; show_alert('GreaseMonkey Api detected...',0); } // test GM_hitch
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; show_alert('Bugged Chrome GM Api detected...',0); }
  } else { needApiUpgrade=true; show_alert('No GM Api detected...',0); }

  if(needApiUpgrade) {
    GM_isAddon=true; show_alert('Try to recreate needed GM Api...',0);
    //OPTIONS_BOX['FLASH_PLAYER_WMODE'][3]=2; OPTIONS_BOX['FLASH_PLAYER_WMODE_BCHAN'][3]=2; // Change Default wmode if there no greasemonkey installed
    var ws=null; try { ws=typeof(unsafeWindow.localStorage) } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      show_alert('Using localStorage for GM Api.',0);
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      show_alert('Using temporarilyStorage for GM Api.',0); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      show_alert('Using XMLHttpRequest for GM Api.',0);
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  } } } // end needApiUpgrade
  GM_getIntValue=function(name,defValue) { return parseInt(GM_getValue(name,defValue),10); }
}
ApiBrowserCheck();


// =====Page manipulation
var rep_id_tbody = 'collapseobj_usercp_reputation';

// find table reputation container
var ar_Table = document.evaluate( "//tbody[contains(@id, '"+rep_id_tbody+"')]" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
var tbcontainer = (ar_Table ? ar_Table.snapshotItem(0) : null);
if(!ar_Table) {
 alert('reputation container ['+rep_id_tbody+'] not found!'); 
 return;
}

// replacement head column
var tdTable = document.evaluate( "//td[contains(@colspan, 4)]" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
if(tdTable) tdTable.snapshotItem(0).colSpan = '6';
var trTable = tbcontainer.getElementsByTagName("tr")[0];
if(trTable){
  var td = document.createElement("td");
  td.id = "psby";
  td.setAttribute("width", "10%");
  td.setAttribute("class", "thead");
  var div = document.createElement('div');  
  div.textContent = 'Posted By';
  div.setAttribute('style','float:left');
  td.appendChild(div);  
  trTable.appendChild(td);
  td = document.createElement("td");
  td.setAttribute("class", "thead");
  td.textContent = 'Reputation';  
  trTable.appendChild(td);  
}
// resize Thread column to 25%
var tdTable = document.evaluate( "//td[@class='alt1Active' and contains(@width, '50%')]" , tbcontainer , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
if(tdTable){
  for(var i=0; i<tdTable.snapshotLength; i++){
    tdTable.snapshotItem(i).width = "25%";
  }
}


// fetch repID and postID
i = 0;
var repID=[]; var userID=[];
var dumstr = tbcontainer.innerHTML.replace(/\n|\r|\r\n/g, '').split('"time"');
for(var i=0; i<dumstr.length; i++) {
  if(cucok = dumstr[i].match(/alt1Active"\sid="p(\d{9})(\d+)"\swidth/i)){ 
    userID[i] = cucok[2];
    repID[i] = cucok[1];	
  }
}

// replace comment; add additional field for new column
var tdTable = document.evaluate( "//td[@class='alt1' and contains(@width, '50%')]" , tbcontainer , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
if(tdTable) {
  for(var i=0; i<tdTable.snapshotLength; i++){
    var elem = tdTable.snapshotItem(i);
    elem.width = "65%";
	var td = document.createElement("td"); // posted by
	td.setAttribute("class", "alt1");
	td.setAttribute("width", "13%");
	var span = document.createElement("span");
	span.id = '_ucnd' + i;
	var a1 = document.createElement("a");
	td.setAttribute("href", _const['user_link'] + userID[i]);
	a1.href = _const['user_link'] + userID[i];
	a1.setAttribute("class", "smallfont");
	a1.appendChild(document.createTextNode('u=' + userID[i]));
	span.appendChild(a1);
	td.appendChild(span);
    elem.parentNode.appendChild(td);
	// -- 
	td = document.createElement("td"); // reputation
	td.setAttribute("class", "alt1");
	td.setAttribute("width", "13%");
    span = document.createElement("span");
	span.id = '_pcnd' + i;
	a1 = document.createElement("a");
	a1.setAttribute("href", _const['rep_link'] + repID[i]);
	a1.setAttribute("class", "smallfont");
	a1.appendChild(document.createTextNode('p=' + repID[i]));
	span.appendChild(a1);
	td.appendChild(span);	
    elem.parentNode.appendChild(td);
  }
}

// ====Initiate fetch detail
var Identity = GM_getValue(OPTIONS_BOX["KEY_SAVE_IDENTITY"], null);
var noneed_upd = (userID.toString() == Identity && notExpired() );
drawLoaderImg(noneed_upd);

if(noneed_upd) {
    loadstorage(); // load from availabe storage
 }else{
    startDetail(userID, 0); // reload detail again
}

function loadstorage(){
  var prefix = OPTIONS_BOX["KEY_SAVE_DATA"] + "_";
  var cnt = parseInt(GM_getValue(OPTIONS_BOX["KEY_SAVE_USER_COUNT"], null));
  var ddata;var Obj_Data = {};
  if(!isNaN(cnt)){
    for(var i=0; i<cnt; i++){
       ddata = GM_getValue(prefix+i).split(';;');
	   for(var j in field){
	       Obj_Data[field[j]] = ddata[j];
	   } // end loop j
       if(ddata) createSender(Obj_Data, i);
    } // end loop i
	hideLoader();
  }else{    
    startDetail(userID, 0);
  }
}

/* draw loader button */
function drawLoaderImg(noneed){
  //if(parentpostby) parentpostby.innerHTML = '<div style="float:left;">Posted By</div>';
  if(noneed) return;
  var parentpostby = window.document.getElementById('psby');
  
  var newElement2td1Div = document.createElement('div');  
  newElement2td1Div.setAttribute('id','fetcher');
  newElement2td1Div.setAttribute('style','height:19px; text-align:right; cursor:pointer; !important; margin:-2px;');
  newElement2td1Div.setAttribute('title','Fetch user detail');
  
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
  	url: _const['user_link'] + userSets[x] + '?'+Math.random().toString().replace('0.',''),
  	headers: {'Accept': 'text/*' },
	onerror: function(result) { this.onload(result); },
  	onload: function(result) {
	  if(result.status!=200) { alert('Err. status 200 failed'); }
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
  if(ret = getBetween(dpage, 'u=(\\d+)\\"')) result[field[0]] = ret; // uid
  
  dpage = page.split('View Profile')[1];
  if(ret = getBetween(dpage, '^\\:\\s(.+)<\\/title')) result[field[1]] = ret; // kaskus_id
  
  dpage = page.split('<h2>')[1];
  if(ret = getBetween(dpage, '^(.+)<\\/h2>')) result[field[2]] = ret; // tag_id
  
  if(page.indexOf('Location')!=-1){
    dpage = page.split('Location</dt>')[1].split('</dd>')[0]; //location
    if(ret = getBetween(dpage, '<dd>(.+)')) result[field[3]] = ret; 
  }else{
    result[field[3]] = 'N/A';
  }
  
  dpage = page.split('Join Date:')[1].split('</li>')[0];
  if(ret = getBetween(dpage, '>\\s(.+)')) result[field[4]] = ret; // join_date
  
  dpage = page.split('Total Posts:')[1].split('</li>')[0];
  if(ret = getBetween(dpage, '>\\s(.+)')) result[field[5]] = ret; // total_post
  
  if(page.indexOf('<td><img src="' + _const['avatar'])!=-1){
    dpage = page.split('<td><img src="' + _const['avatar'])[1].split('</td>')[0];
    if(ret = getBetween(dpage, '^(.+)\\"\\salt')) result[field[6]] = (_const['avatar'] + ret); // avatar_url
  }

  dpage = page.split('alt="'+result[field[1]])[1];
  if(ret = getBetween(dpage, '^(.*)\\"\\sborder')) result[field[7]] = result[field[1]] + ret; // rep_msg
  result[field[8]] = _const['rep_img']; // rep_img
  result[field[9]] = _const['rep_img2']; // rep_img2
  dpage = page.split('<div id="reputation">')[1].split('images/reputation/');
  result[field[10]] = parseInt(dpage.length-1); // rep_count
  
  return result;
}
// end parseIt


function createSender(data, x){
  var ucendol = function(rep_point){
     var halftag = '<img src="'+_const['cendol_img'] ;
     var bufcen = ''; upto = (rep_point<5 ? rep_point : 5);
     for(var j=0; j<upto; j++){ bufcen+= halftag + data["rep_img"] + '"/>';	}
     if((j-1) < rep_point) {
  	 for(var k=j; k < rep_point; k++){ bufcen+= halftag + data["rep_img2"] + '"/>';	}
     }
     return bufcen;
  }
  var inner = '<div id="_ucnddiv'+x+'" style="float:right; position:absolute; width:100px; overflow:wrap; text-align:center; border:1px solid #000; background-color:#F1EFBC; padding:3px; margin:5px 0 0 -110px; font-size:9px; display:none;"><img src="'+data["avatar_url"]+'" alt="['+data["kaskus_id"]+'`s avatar]"/><br>'+data["tag_id"]+'<br>'+data["location"]+'<br>'+data["join_date"]+'<br>Post: '+data["total_post"]+'</div>';
  
  // last act, i think it's ok using innerHTML :p
  document.getElementById("_ucnd"+x).innerHTML = '<a class="smallfont" href="' + _const['user_link'] + data["uid"] 
    + '" onmouseout="document.getElementById(\'_ucnddiv'+x+'\').style.display=\'none\';" '
	+ 'onmouseover="document.getElementById(\'_ucnddiv'+x+'\').style.display=\'\';" style="float:right;"><b>'
	+ data["kaskus_id"]+'</b></a><div style="float:right;clear:both;padding-top:3px;" title="'+ data["rep_msg"]+'">'
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
function doSaveIdentity(userid){
  GM_setValue(OPTIONS_BOX["KEY_SAVE_IDENTITY"], userid.toString());
  GM_setValue(OPTIONS_BOX["KEY_SAVE_USER_COUNT"], userid.length);

  var Date_Now=new Date(); 
  Date_Now.setHours(Date_Now.getHours() + Math.floor(Math.abs(OPTIONS_BOX["INTERVAL_FORCE_RELOAD_USERDATA"])) );
  GM_setValue("KEY_SAVE_EXPIRED", Date_Now.getTime().toString() );
}
// save each data user as a buffer
function doSaveDat(userdata, x){
  var arDum = [];
  for(var i in field){
    arDum.push(userdata[field[i]]);
  }
  GM_setValue(OPTIONS_BOX["KEY_SAVE_DATA"] + '_' + x, arDum.join(';;'));
}

function notExpired(){
  var key = "KEY_SAVE_EXPIRED";
  var lastSave = GM_getValue(key); 
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
    if(state && (arguments.callee.idInterval<=0)) { arguments.callee.idInterval=window.setInterval( function() { option_turn(); }, 100); }
  }
  else {
    var angle=draw_Button();
    if((angle%90==0) && !arguments.callee.laststate) { arguments.callee.idInterval=clearInterval(arguments.callee.idInterval); }
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
  if(isDefined(angle)) { arguments.callee.mAngle=angle; } else { arguments.callee.mAngle=(arguments.callee.mAngle+10) % 360; }
  buttonCtx=arguments.callee.mCtx; angle=arguments.callee.mAngle;
  buttonCtx.fillStyle=color('DL_OPTIONS_TEXT');
  buttonCtx.clearRect(0,0,19,19);
  buttonCtx.save(); buttonCtx.translate(9.5,9.5); buttonCtx.rotate(Math.PI*angle/180); buttonCtx.translate(-9.5,-9.5);
  buttonCtx.beginPath(); buttonCtx.arc(9.5, 5,2.8,0,Math.PI*2,true); buttonCtx.fill();
  buttonCtx.beginPath(); buttonCtx.arc(9.5,14,2.8,0,Math.PI*2,true); buttonCtx.fill();
  buttonCtx.save(); buttonCtx.translate( 5,9.5); buttonCtx.rotate(Math.PI*45/180); buttonCtx.fillRect(-2.4,-2.4,4.8,4.8); buttonCtx.restore();
  buttonCtx.save(); buttonCtx.translate(14,9.5); buttonCtx.rotate(Math.PI*45/180); buttonCtx.fillRect(-2.4,-2.4,4.8,4.8); buttonCtx.restore();
  buttonCtx.restore();
  return(angle);
}

function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
  // Show a HTML alert box (only for watch pages or if forced)
  if(force==1 || check_on_youtubewatchpage()) {
    warningelem=document.createElement('div');
    warningelem.setAttribute("style","color:#FFFFFF; background:#FF8000; width:auto; text-align:center; font-size:24px; border: 3px solid #CC0088; margin:2px;");
    warningelem.textContent=msg;
    document.body.insertBefore(warningelem, document.body.firstChild);
  }
}

// additional debug tool
function dump(a,b){var c="";if(!b){b=0}var d="";for(var j=0;j<b+1;j++)d+="    ";if(typeof(a)=='object'){for(var e in a){var f=a[e];if(typeof(f)=='object'){c+=d+"'"+e+"' ...\n";c+=dump(f,b+1)}else{c+=d+"'"+e+"' => \""+f+"\"\n"}}}else{c="===>"+a+"<===("+typeof(a)+")"}return c};

})();
/* Mod By mHc@DAL.net. */