// ==UserScript==
// @name          Kaskus Enhanced Reply-Post by Eorx Roa With IDX
// @namespace     http://userscripts.org/scripts/show/79879
// @include       http://u.kaskus.co.id/*
// @include       http://www.kaskus.co.id/newreply.php?*
// @include       http://www.kaskus.co.id/editpost.php?*
// @include       http://www.kaskus.co.id/visitormessage.php?*
// @include       http://www.kaskus.co.id/group.php?*
// @include       http://www.kaskus.co.id/blog_post.php?*
// @include       http://www.kaskus.co.id/newthread.php?*
// @version       2.28
// @dtversion     110709227
// @timestamp     1310157910717
// @description   Integrate kaskus uploader; Show Mostly Used Smiley beside your vb_Textarea Editor; Integrate Custom Kaskus Smiley list; Set your fav image/smiley colection; Hover preview++
// @author        idx (http://userscripts.org/users/eorxroa)
// @include       http://imageshack.us/*
// @include       http://*.imageshack.us/*
// @include       http://photoserver.ws/*
// --------------------------------------------------------
// -!--latestupdate
// 
// v 2.28 - 2012-05-27
// : Kaskus Domain Fix *.us to *.co.id 
//
// v 2.27 - 2011-07-09
// : Add new kaskus emoticons (addfriends,berbusas,armys,bookmarks,shutups). Thx=[ketang6,p1nky]
// 
// v 2.26 - 2011-06-05
// : Deprecate KERP in private message (due to disabled bbcode --")
// : Fix Text Counter
// : Add 2 new Kaskusemotes (Hot-News; Games)
// 
// -/!latestupdate---
// ==/UserScript==
/*
//
// v 2.25 - 2011-03-13
// : Fix adapting FF4.0
// : Improve Uploader
//
// v 2.24 - 2011-02-20
// : Fix adapting FF4.0b12 (partial)
// : Fix minor CSS (blog_post.php)
// 
//
// v 0.1 - 2010-06-20
// : Init
// ------------
// By: Idx._ccpb
// ------------
*/// ==/UserScript==
(function () {
// Initialize Global Variables
var gvar=function() {}

gvar.codename   = 'KERP'+HtmlUnicodeDecode('&#8482;');
gvar.sversion   = 'v' + '2.27';
/* timestamp-GENERATOR
javascript:window.alert(new Date().getTime());
javascript:(function(){var d=new Date(); alert(d.getFullYear().toString().substring(2,4) +((d.getMonth()+1).toString().length==1?'0':'')+(d.getMonth()+1) +(d.getDate().toString().length==1?'0':'')+d.getDate()+'');})()
*/
gvar.scriptMeta = {
  timestamp: 1310157910717 // version.timestamp
 ,dtversion : 110709227 // script-Id
 
 ,titlename : gvar.codename
 ,scriptID : 79879 // script-Id
};
const OPTIONS_BOX = {  
  KEY_SAVE_SMILEY_BOX:    ['1'] // default state of show/hide smiley_box 
, KEY_SAVE_TABS:          ['0,1,0,1'] // default state of show/hide tabs (small/big/custom/mysmile)
, KEY_SAVE_LAST_UPLOADER: [''] // last used host-uploader

, KEY_SAVE_MYSMILE_COUNT: ['0'] // count saved image link 
, KEY_SAVE_MYSMILE_DATA:  [''] // raw data image
, KEY_SAVE_S_INFO:        ['0:0'] // script info
, KEY_SAVE_KERP_LastUpdate: ['0'] // lastupdate timestamp

};
const GMSTORAGE_PATH      = 'GM_';
const KS = 'KEY_SAVE_';
var _LOADING = '';


var inArray = Array.prototype.indexOf ?
  function(A,f){var p=A.indexOf(f);return(p!==-1?p:false)} :
  function(A,f){for(var i=-1,j=A.length;++i<j;)if(A[i] === f) return i;return false};
var GM_addGlobalStyle=function(css, id, tobody) { // Redefine GM_addGlobalStyle with a better routine 
  var sel=document.createElement('style'); sel.setAttribute('type','text/css'); 
  if(isDefined(id) && isString(id)) sel.setAttribute('id', id);
  sel.appendChild(createTextEl(css));
  if(isDefined(tobody) && tobody){
    document.body.insertBefore(sel,document.body.firstChild);
  }else{
    var hds = getTag('head');
    if( isDefined(hds[0]) && hds[0].nodeName=='HEAD' )
     window.setTimeout(function() { hds[0].appendChild(sel); }, 100);
    else
     document.body.insertBefore(sel,document.body.firstChild);
  }
  return sel;
};
var vB_textarea = {
  init: function(id) {
    this.Obj = (isUndefined(id) ? $D(gvar.id_textarea) : $D(id));
    this.content = (this.Obj ? this.Obj.value : "");
	this.cursorPos = this.rearmPos(); // [start, end]
	this.last_scrollTop = this.Obj.scrollTop; // last scrolltop pos
  },
  rearmPos: function(){ return [this.getCaretPos(), this.Obj.selectionEnd]; },
  clear: function (){ this.set('');this.focus();},
  focus: function (){ this.Obj.focus(); },
  getWidth: function(){
    return this.Obj.style.width;
  },
  setWidth: function(_width, is_addition){    
	var nwidth;	
	if(isDefined(is_addition) && is_addition){
	  nwidth = (parseInt(this.getWidth()) + parseInt(_width) );
	} else {
	  nwidth = ( parseInt(_width) );	
	}
	this.Obj.style.width=nwidth+'px';
	return nwidth;	
  },
  set: function(value){    
    if(!this.Obj)
      this.Obj = $D(gvar.id_textarea);
    this.Obj.value = this.content = value;
  },
  lastfocus: function (){
    var pos = this.content.length;
    if(this.Obj.setSelectionRange)	{
        this.focus();
        this.Obj.setSelectionRange(pos,pos);
    }
    else if (this.Obj.createTextRange) {
        var range = this.Obj.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
	this.focus();
  },
  add: function(text){ this.Obj.value+=text; this.focus(); },
  subStr: function(start, end){ return this.content.substring(start, end);},
  getSelectedText : function() {    
	return (this.cursorPos[0]==this.cursorPos[1]? '': this.subStr(this.cursorPos[0], this.cursorPos[1]) );
  },
  getCaretPos : function() {
    //this.focus();
    var CaretPos = 0;
    //Mozilla/Firefox/Netscape 7+ support 
    if(this.Obj)
	  if (this.Obj.selectionStart || this.Obj.selectionStart == '0')
        CaretPos = this.Obj.selectionStart;
    return CaretPos;
  },  
  setCaretPos : function (pos,end){
    if(!end) end = pos;
    if(this.Obj.setSelectionRange)	{ // Firefox, Opera and Safari
        this.focus();
        this.Obj.setSelectionRange(pos,end);
    }
  },
  // ptpos stand to puretext position [start, end]
  setValue : function(text, ptpos){
    if(!text) return;
    var start=this.cursorPos[0];
	var end=this.cursorPos[1];
    if(isUndefined(ptpos)) ptpos=[text.length,text.length];
	if(start!=end) {
	  this.replaceSelected(text,ptpos);
	  return;
	}
    var bufValue = this.subStr(0, start) + text + this.subStr(start, this.content.length);
	this.set(bufValue);
	 // fix chrome weird
	this.setCaretPos( (start + ptpos[0]), (start+ptpos[1]) );
	this.Obj.scrollTop = (this.last_scrollTop);
    return bufValue; 
  },
  wrapValue : function(tag, title){
	var start=this.cursorPos[0];
	var end=this.cursorPos[1];
	tag = tag.toUpperCase();
	{
    var bufValue = this.subStr(0, start) + 
	    '['+tag+(title?'='+title:'')+']' + 
		 (start==end ? '' : this.subStr(start, end)) + 
		'[/'+tag+']' + 
		this.subStr(end, this.content.length);
	}
	this.set(bufValue);

	var st2 = (start + ('['+tag+(title?'='+title:'')+']').length);
	this.setCaretPos( st2, st2+this.subStr(start, end).length );
	
	this.Obj.scrollTop = (this.last_scrollTop);
    return bufValue; 
  },
  replaceSelected : function(text, ptpos){
    if(!text) return;
    var start=this.cursorPos[0];
	var end=this.cursorPos[1];
    if(isUndefined(ptpos)) ptpos=[text.length,text.length];
	if(start==end) return;	
    var bufValue = this.subStr(0, start) + text + this.subStr(end, this.content.length);
	this.set(bufValue);
	this.setCaretPos( (start + ptpos[0]), (start+ptpos[1]) );
	this.Obj.scrollTop = (this.last_scrollTop);
  }
  
};
// utk add - remove element
var Dom = {
  get: function(el) {
   if(!el) return false;
   if (typeof el === 'string')
     return document.getElementById(el);
   else
     return el;
  },
  add: function(el, dest) {    
    var el = this.get(el);
    var dest = this.get(dest);
    if(el && dest) dest.appendChild(el);
  },
  remove: function(el) {
    var el = this.get(el);
	if(el && el.parentNode)
      el.parentNode.removeChild(el);
  }
};
var Ev={
  add: function() {
    if (window.addEventListener) {
      return function(el, type, fn) {
        Dom.get(el).addEventListener(type, fn, false);
      };	  
    } else 
	if (window.attachEvent) {
      return function(el, type, fn) {
        var f = function() {
          fn.call(Dom.get(el), window.event);
        };
        Dom.get(el).attachEvent('on' + type, f);
      };
    }
  }()
};
// Get Elements
var $D=function (q, root, single) {
  if (root && typeof root == 'string') {
      root = $D(root, null, true);
      if (!root) { return null; }
  }
  if( !q ) return false;
  if ( typeof q == 'object') return q;
  root = root || document;
  if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
      if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
      return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  }
  else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
  else { return root.getElementById( (q[0]=='#' ? q.substr(1):q.substr(0)) ); }
  return root.getElementsByTagName(q);
};

// Fliper :: wordflip.net
var FlipWordsEngine = {    
    flipTable: {
        a : '\u0250',
        b : 'q',
        c : '\u0254',
        d : 'p',
        e : '\u01DD',
        f : '\u025F',
        g : '\u0183',
        h : '\u0265',
        i : '\u0131',
        j : '\u027E',
        k : '\u029E',
        l : '\u05DF',
        m : '\u026F',
        n : 'u',
        r : '\u0279',
        t : '\u0287',
        v : '\u028C',
        w : '\u028D',
        y : '\u028E',
        '.' : '\u02D9',
        '[' : ']',
        '(' : ')',
        '{' : '}',
        '?' : '\u00BF',
        '!' : '\u00A1',
        "\'" : ',',
        '<' : '>',
        '_' : '\u203E',
        '\\' : '\\',
        ';' : '\u061B',
        '\u203F' : '\u2040',
        '\u2045' : '\u2046',
        '\u2234' : '\u2235'
    },    
    flipText: function(input) {
        var last = input.length - 1;
        var result = new Array(input.length);
        for (var i = last; i >= 0; --i) {
            var c = input.charAt(i);
            var r = this.flipTable[c];
            result[last - i] = r != undefined ? r : c;
        }
        return result.join('');
    },    
    init: function() {
        // setup table data
        for (i in this.flipTable) {
            this.flipTable[this.flipTable[i]] = i;
        }        
    }
};
var GM_XHR = {
  uri:null,
  returned:null,
  cached:null,
  request: function(cdata,met,callback){
    if(!GM_XHR.uri) return;
	met=(isDefined(met) && met ? met:'GET');
	cdata=(isDefined(cdata) && cdata ? cdata:null);
		
	if(typeof(callback)!='function') callback=null;	
	if(cdata) GM_xmlhttpRequest.data=cdata;
	
    GM_xmlhttpRequest( {
		method:met,
		url:GM_XHR.uri + (GM_XHR.cached ? '':(GM_XHR.uri.indexOf('?')==-1?'?':'&rnd=') + Math.random().toString().replace('0.','')),
		//data:cdata,
		onload: function(ret) {
		  if(ret.status==503){
		    console.log('Reach 503, retrying...');
		    setTimeout(GM_XHR.request(cdata,met,callback), 777);
		  }else{
		    var rets=ret;
		    if(callback!=null)
			   callback(rets);
			else
			   GM_XHR.returned = rets;
		  }
		}
	} );
  }
};

// utk cek update (one_day = 1000*60*60*24 = 86400000 ms) // milisecs * seconds * minutes * hours
// customized from FFixer & userscript_updater
var Updater = {
  caller:''
 ,check: function(forced){
    var intval = (1000*60*60*gvar.settings.updates_interval);
    if((forced)||(parseInt( getValue("KEY_SAVE_"+"KERP_LastUpdate") ) + parseInt(intval) <= (new Date().getTime()))) {
	 gvar.updateForced = forced;
	 if(!forced) Updater.caller='';
     // prep xhr request
	 
     GM_XHR.uri = 'http://'+'userscripts.org'+'/scripts/source/'+ gvar.scriptMeta.scriptID + '.meta.js';
     GM_XHR.cached = false;
     GM_XHR.request(null,'GET',Updater.callback);
    }
  }
 ,callback: function(r){
    setValue("KEY_SAVE_"+"KERP_LastUpdate", new Date().getTime() + "");
	if(Dom.get(Updater.caller))
	  Dom.get(Updater.caller).innerHTML = 'check now';
	r = r.responseText || false;
	
	var oltimestamp = r.match(/@timestamp(?:[^\d]+)([\d\.]+)/);
	oltimestamp = (oltimestamp ? oltimestamp[1] : false);
	
	if(r){
      if (oltimestamp && oltimestamp > gvar.scriptMeta.timestamp) {
        Updater.initiatePopup(r); 
      } else {
        Updater.notify_done(false);
        if (gvar.updateForced){
          if(r.match(/title>404\sNot\sFound<\/title>/i))
		    alert(GM_XHR.uri +"\n\n"+ "404 Not Found, server might be busy.");
		  else
		    alert("No update is available for "+gvar.scriptMeta.titlename);
		}
      }
	}else{
	  // nothing, r is failed
	  Updater.notify_done(false);
	  if(gvar.updateForced)
	    alert(GM_XHR.uri +"\n\n"+ "Request failed.");
	}
  }
 ,initiatePopup: function(rt){    
    Updater.meta=Updater.mparser(rt);
	Updater.showDialog(
       '<img id="nfo_version" src="'+gvar.B.news_png+'" class="qbutton" style="float:left; margin:3px 5px 0 2px;padding:3px;"/> '
	  +'<b>New'+' '+gvar.scriptMeta.titlename+'</b> (v'+ Updater.meta.cvv[1]+') is available'
      +'<div style="float:right;margin:9px 0 0 15px;"><a class="qbutton" href="http://'+ 'userscripts.org'
      +'/scripts/show/'+gvar.scriptMeta.scriptID+'" target="_blank" title="Goto KERP Home">Home</a></div>'
      +'<div style="float:right;margin-top:9px;"><a id="do_update" class="qbutton" href="javascript:;"><b>Update</b></a></div>'
      +'<div style="margin-left:22px;">Wanna make an action?</div>'
    );
    Ev.add(Dom.get('upd_close'),'click', function(){
       Dom.remove('upd_cnt');
    });    
    Ev.add(Dom.get('upd_notify_lnk'),'click', function(){
       if(Dom.get('upd_cnt')){
         Dom.remove('upd_cnt');
       }else{
         Updater.notify_progres();
         Updater.check(true);
       }
    });    
    Ev.add(Dom.get('do_update'),'click', function(){  
      GM_openInTab('http://'+'userscripts.org'+'/scripts/source/'+gvar.scriptMeta.scriptID+'.user.js');      
      window.setTimeout(function(){ Dom.remove('upd_cnt'); }, 1000);
    });    
  }
 ,showDialog: function(inner){
    var Attr, el;
    if(Dom.get('upd_cnt')) Dom.remove(Dom.get('upd_cnt'));
    Attr = {id:'upd_cnt','class':'tborder qrdialog',style:'position:fixed;z-index:999999;'};
    el = mycreateElement('div', Attr);
    getTag('body')[0].insertBefore(el, getTag('body')[0].firstChild);
    
    Attr = {'class':'qrdialog-close'};
    el = mycreateElement('div', Attr, false, '<a id="upd_close" class="qbutton" javascript:; title="Close"><img src="'+gvar.domainstatic+'images/misc/menu_open.gif" /></a>');
    Dom.add(el, Dom.get('upd_cnt'));

    Attr = {id:'upd_child','class':'qrdialog-child'};
    el = mycreateElement('div', Attr, false, inner);
    Dom.add(el, Dom.get('upd_cnt'));
	// nfo news
	if( Updater.meta.news ){
	  Dom.get('nfo_version').setAttribute('title', 'What\' New...');
	  Dom.get('nfo_version').style.setProperty('cursor', 'pointer', '');
	  Ev.add(Dom.get('nfo_version'), 'click', function(){ alert( gvar.scriptMeta.titlename+'\n== Last LOG Update ==' + Updater.meta.news );});
	}    
    Updater.notify_done(true);
 }
  
 ,notify_progres: function(caller){
    Dom.get('upd_notify').innerHTML = '<img style="margin-left:10px;" id="fetch_update" src="'+gvar.B.loading_gif+'" border="0"/>';
	if(Dom.get(caller)) {
	  Updater.caller=caller;
	  //Dom.get(caller).innerHTML='checking..'; // OR check now
	  Dom.get(caller).setAttribute('title','checking..'); // OR check now
	}
 }
 ,notify_done: function(anyupd){
    Dom.get('upd_notify').innerHTML = (anyupd ? '<a id="upd_notify_lnk" href="javascript:;" title="Update Available"><img style="position:absolute;margin:-5px 0 0 5px;" src="'+gvar.B.updates_png+'" width="17" border="0"/></a>':'');
    if(Dom.get('upd_notify').innerHTML==''){
	   el = mycreateElement('img',{'src':gvar.B.upd_png,alt:'[Update]',border:'0'});
	   Ev.add(el, 'click', function(){
         Updater.notify_progres('upd_notify');
	     Updater.check(true);
	     return false;
	   });

	   Dom.get('upd_notify').appendChild(el);
    }
 }
 ,mparser: function(rt){
	return {
     tv:rt.match(/@timestamp(?:[^\d]+)([\d]+)/)||[null],
     cvv:rt.match(/@version(?:[^v\d]+)([\d\.\w]+)/)||[null],
     news:(function(x){
	      var wrp=['// -!--latestupdate','// -/!latestupdate---'];
	      var p=[x.indexOf(wrp[0]), x.indexOf(wrp[1])];
		  return (p[0]!=-1 && p[1]!=-1 ? String( x.substring(p[0]+wrp[0].length, p[1]) ).replace(/\/+\s*/gm, function($str,$1){return " ";}) : '');
	    })(rt)
    };	
  }
}; // -end Updater

// =============

// initialize global var
function init(){

  // checking browser
  ApiBrowserCheck();
  
  //gvar.scriptInfo = ['79879','0',gvar.vversion.toString()]; // [scriptId,usoversion,vversion]
  
  gvar.loc = location.href;
  gvar.dmkaskus = 'kaskus.co.id';
  gvar.domainstatic = 'http://'+'static.'+gvar.dmkaskus+'/';
  gvar.dmUploader = 'u.'+gvar.dmkaskus;
  gvar.isUploader = (gvar.loc.match(/^http:\/\/u\.kaskus\.co.id\/.*/));
  
  gvar.id_smilebox = 'vB_Editor_001_smiliebox';
  gvar.id_textarea = 'vB_Editor_001_textarea';
  if(!$D(gvar.id_textarea)) return;
  
  gvar.is_visitormessage = (gvar.loc.indexOf('\/visitormessage\.php\?') !=-1 );
  
  gvar.width_smilebox = '280';
  
  gvar.uso = 'userscripts.org';
  gvar.akronim = 'Kaskus Enhanced Reply-Post';
  
  gvar.INTERVAL = null;
  
  // icon resource
  gvar.B = getSetOf('button');
  _LOADING = '<img src="'+gvar.B.loading_gif+'" border="0"/>&nbsp;<small>loading...</small>';  
  
  // id tab
  gvar.tabTitleId = ['skecil_container', 'sbesar_container', 'scustom_container', 'mysmiley_container']; 
  gvar.tabSmiley = []; // show/hide tab smile
  gvar.smiley_box = 1; // show/hide tab smile
  
  var isPm = (gvar.loc.indexOf('private.php')!=-1);
  gvar.imgTagMode = (isPm ? ['1','1']:['0','0']); // toogle between mode imgtagor bbcode :: 'skecil_container','sbesar_container'
  
  getSettings();
  
  gvar.tabIndex_order = [];
  
  // Offsetnya preview image
  gvar.xOffset = 20;
  gvar.yOffset = 20;
  
  
  // do check whether uploader or editor
  //precheck_location();
  if( !location.href.match(/^http:\/\/w{3}\.kaskus\.co.id\/.*/) ) 
    return outSideForumTreat();
  else{
    getUploaderSetting();
	start_routine();	
  }
}

function getUploaderSetting(){
  // uploader properties
  gvar.upload_sel={
     kaskus:'u.kaskus.co.id'
    ,kodok:'imageshack.us'
    ,ps:'photoserver.ws'
  };
  gvar.uploader={
     kaskus:{
        src:'u.kaskus.co.id'
       ,post:'u.kaskus.co.id/upload/do_upload'
       ,ifile:'userfile'
       ,hids:{
         referer:'http://'+'u.kaskus.co.id'
       }
     }
    ,kodok:{
        src:'imageshack.us'
       ,post:'post.imageshack.us/'
       ,ifile:'fileupload'
       ,hids:{
          refer:'http://'+'imageshack.us/?no_multi=1'
         ,uploadtype:'on'
       }
     }
    ,imgur:{
        src:'imgur.com',noCross:'1' 
	 }

    ,ps:{
        src:'photoserver.ws',noCross:'1' 
	 }
  };
  // set last-used host
  try{
    if( gvar.lastused_uploader )
    gvar.upload_tipe= gvar.lastused_uploader;
	if(isUndefined( gvar.upload_sel[gvar.upload_tipe] )) 
    gvar.upload_tipe='kaskus';
  }catch(e){gvar.upload_tipe='kaskus';}
}
// outside forum like u.kaskus.co.id || imageshack.us
function outSideForumTreat(){
  var whereAmId=function(){
    var ret=false,src;
    getUploaderSetting();
    for(var host in gvar.uploader){
      src=gvar.uploader[host]['src']||null;
      if(src && self.location.href.indexOf(src)!=-1){
        ret= String(host); break;
	  }
    }
    return ret;
  };
  
  var el,par,lb,m=20,loc=whereAmId(),CSS="",i="!important";
  /*
    # do pre-check hostname on location
  */
  try{if(top===self)return;}catch(e){};
  switch(loc){
    case "kodok":
      CSS=''
         +'h1,#top,.reducetop,#panel,#fbcomments,#langForm,.menu-bottom,#done-popup-lightbox,.ad-col{display:none'+i+'}'
         +'.main-title{border-bottom:1px dotted rgb(204, 204, 204);padding:5px 0 2px 0;margin:5px 0 2px 0;}'
         +'.right-col input{padding:0;width:99%;font-family:"Courier New";font-size:8pt;}'
	  ;break;
    case "imgur":
      CSS=''
      +'div#logo,.right .panel{display:none'+i+'}'
      +'#content{margin-top:15px}'
	  ;break;
    case "ps":
      CSS=''
      +'body,.content{margin:0'+i+';margin-top:35px'+i+'}'
      +'body>img,#topbar{top:0'+i+'}'
      +'body{background-color:#fff}'
      +'#loginbar{top:38px'+i+';display:block}'
      +'#footer{padding:0}'
      +'#overlay .content{top:3px'+i+'}'
      +'#overlay{position:absolute'+i+'}'
	  ;break;
  }; // end switch loc
  if(CSS!="") 
    GM_addGlobalStyle(CSS,'inject_host_css', true);

  el=$D('//input[@wrap="off"]',null,true);
  if(loc=='kodok' && el){
    gvar.sITryKill = window.setInterval(function() {
      if ($D('#done-popup-close')) {
        clearInterval(gvar.sITryKill);
        
        SimulateMouse( $D('#done-popup-close'), 'click', true );
        
        // just make sure, kill absolute div layer
        lb=$D('//div[contains(@style,"absolute") and contains(@style,"opacity")]',null, true);
        if(lb) Dom.remove(lb);
        if($D('#ad')) Dom.remove($D('#ad'));
        
        window.setTimeout(function(){
            el.removeAttribute('disabled');            
            var par=el.parentNode.parentNode;
            lb=$D('.tooltip',par);
            if(lb){
             lb[0].innerHTML=lb[1].innerHTML='';
             Dom.add(el,par);
            }
            // right-col manipulator
            var ei,et,rTitle=function(t){
               var e = createEl('div',{'class':'main-title'},t);
               return e;
            }, BBCodeImg=function(A){
               return '[IMG]'+A+'[/IMG]';
            }, BBCodeTh=function(A){
               var b=A.lastIndexOf('.'),c=A.substring(0,b)+'.th'+A.substring(b);
               return '[URL='+A+']'+BBCodeImg(c)+'[/URL]';
            };
            lb=$D('.right-col',null);
            if(lb){
               lb[0].innerHTML='';
               et=rTitle('Direct Link'); Dom.add(et, lb[0]);
               ei = createEl('input',{type:'text',value:el.value,readonly:'readonly'});
               on('focus',ei, function(de){selectAll(de)}); Dom.add(ei, lb[0]);
               try{ei.focus();selectAll(ei)}catch(e){}
               
               et=rTitle('BBCode IMG'); Dom.add(et, lb[0]);
               ei = createEl('input',{type:'text',value:BBCodeImg(el.value),readonly:'readonly'});
               on('focus',ei, function(de){selectAll(de)}); Dom.add(ei, lb[0]);
               et=rTitle('BBCode Thumbnail'); Dom.add(et, lb[0]);
               ei = createEl('input',{type:'text',value:BBCodeTh(el.value),readonly:'readonly'});
               on('focus',ei, function(de){selectAll(de)}); Dom.add(ei, lb[0]);
            }
        }, 500);
      }else{
        if(max>0)
          m=m-1;
        else
          clearInterval(gvar.sITryKill);
      }
    },  50);
  } // end is el
  
  return false;
}

function start_routine(){

  // place global style 
  GM_addGlobalStyle(getCSS());  
  
  // reorder tabIndex & stuff on newreply  
  if( gvar.loc.match(/^https?\:\/\/w{3}\.kaskus\.co.id\/newreply\.php\?.*/i) ){
    reorder_tabIndex();
  }

  // get & Load smilie
  getSmilieSets();  
  getOptions();
  
  //align adjuster
  align_adjuster();
  
  // recreate smilebox container on PM
  if(!$D(gvar.id_smilebox)) recreate_smilebox();

  // recreate editor on VM  
  if( gvar.is_visitormessage ) recreate_editor();
  
  // alocate/build smiliebox DOM and its content
  loadSmilieBox();
  
  // load text counter
  loadCounter();
  
  if( !gvar.is_visitormessage ){
    init_smileyeditor();
  }
  if(false && !gvar.is_visitormessage ){
    // add- remove element
    loadAddRemove();	
	// if ada mysmiley tambahin dah tuh & yap gak berlaku di VM
    if(gvar.mysmile_count > 0) fillwith_MySmile();
  }  
  
  // add customed controller
  spoiler_act();  
  
  var fieldset = getTag('fieldset');
  if(fieldset){
    var fldset_upload = false;
    for (var i=0;i<fieldset.length; i++){
        if(fieldset[i].innerHTML.indexOf('Upload Images') != -1){
    		fldset_upload = fieldset[i];
            break;
        }
    }	
    if(!fldset_upload){
	  show_alert('fieldset Upload "fldset_upload" not found; Failed create uploader...',0);
      //return;  // fieldset legend Upload Images not found
	} else {
	  var legend = getTag('legend', fldset_upload);
	  if(legend){
	    legend = legend[0];
	    var Attr = {id:'legend_subtitle', style:'font-weight:bold;'};
        var el = mycreateElement('span',Attr);
		Dom.add(el, legend);
	  }
	  // create form DOM upload
      Dom.remove(getTag('a', fldset_upload)[0]);      
      // load iframe and upload button
	  UPL.init_uploader(fldset_upload);
	}	
  } else {
    show_alert('tag legend "fieldset" not found; Failed create uploader...',0);
    //return; // tag legend not found
  }
  
  // additional event for some elements
  additional_event();
  
  if(!gvar.noCrossDomain && gvar.settings.autochkUpdates)
    window.setTimeout(function(){ Updater.check(); }, 5000);

} // end start_routine

function init_smileyeditor(){
  // daptarin smwa var dulu ah
  var Div1, Div2, Div3, el, p0, Attr;
  var editorID = 'mysmileyeditor_content';
  
  // parent container
  Attr = {'class':'smallfont',style:'margin-top:10px;'};
  Div1 = mycreateElement('div',Attr);
  
  // 'mysmiley_container'
  Attr = {'class':'smallfont addremove',
   style:'display:'+ (gvar.tabSmiley[3]==1 ? '':'none') +';',
   id:gvar.tabTitleId[3] 
  };
  Div2 = mycreateElement('div',Attr);
  Div1 = judulSmiley(Div1, 'My Smiley', Div2.id);
  
  p0 = mycreateElement('p', {'style':'margin:0;padding:0;'});
  Attr = {'class':'twbtn twbtn-m lilbutton',style:'float:left;margin-top:5px;',id:'manage-smiley'};
  Obj = mycreateElement('small',Attr,false,'Manage MySmiley');
  p0.appendChild(Obj);
  Attr = {'class':'twbtn twbtn-m lilbutton',style:'float:left;margin:5px 0 0 10px;display:none;',id:'manage-cancel'};
  Obj = mycreateElement('small',Attr,false,'Cancel');
  p0.appendChild(Obj);
  
  Attr={id:'help_manage',href:'javascript:;','class':'twbtn twbtn-m lilbutton',style:'float:right;display:none;margin-top:5px;',title:'RTFM'};
  Obj = mycreateElement('small',Attr,false,' ? ');  
  
  p0.appendChild(Obj);

  // append element customsmiley_content
  // 'scustom_container'
  Attr={'class':'smallfont smilebesar',id: gvar.tabTitleId[3]+'_img'};
  Div3= mycreateElement('div',Attr,false,'<span class="no_smile">--no smiley--</span>');
  Div2.appendChild(Div3);
  Div2.appendChild(p0);
  
  // append element smileyeditor_content  
  Attr={id:editorID,style:'display:;clear:left;'};
  Div3= mycreateElement('div',Attr);
  
  // append editor
  Div2.appendChild(Div3);  
  
  Div1.appendChild(Div2);
  $D(gvar.id_smilebox).appendChild(Div1);
  
  reload_mysmiley();
  
  if(Dom.get('help_manage'))
    Ev.add('help_manage', 'click', function(){
     alert(''
     +'Each Smiley separated by newline.\nFormat per line:\n tag|smileylink'
     +'\n eg.\ncheers|http:/'+'/static.kaskus.co.id/images/smilies/sumbangan/smiley_beer.gif'
     );
    });
  if(Dom.get('manage-smiley'))
    Ev.add('manage-smiley', 'click', function(e){manage_smiley(e);});
  if(Dom.get('manage-cancel'))
    Ev.add('manage-cancel', 'click', function(e){manage_smiley(e);}); 
}

function manage_smiley(e){
    e = e.target||e;
	var el, imgtxta, task = e.innerHTML;
	var txtaID = 'textarea_mysmiley';
	var editorID = 'mysmileyeditor_content';
	var par = Dom.get(editorID);
	
	var buff = '';
	switch(task){
	  case "Manage MySmiley":
	   par.innerHTML = '';
       Attr = {id:txtaID,'class':'textarea txta_smileyset',wrap:'off'};
       imgtxta = mycreateElement('textarea',Attr);
	   var img, tag, prefix = 'my__';
	   
	   for (var i in gvar.mysmilies) {
	      // pick image with defined prefix only
          if(i.indexOf(prefix) == -1 || typeof(gvar.mysmilies[i])=='function') 
	         continue;
          img=gvar.mysmilies[i];
		  if( !isString(img) ){
	        buff+= img[2]+'|'+img[0] + '\n';
		  }else{
		    var retEl=validTag(img, false, 'editor');
			buff+= retEl;
		  }
	   }
	   imgtxta.value = buff;
	   par.appendChild(imgtxta);
	  break;	  
	  
	  case "Save":
		buff = { ret:'',count:0 };
		imgtxta = Dom.get(txtaID);
        if(imgtxta) 
		  buff = do_filter_scustom(imgtxta.value);
		  
		setValue( KS + 'MYSMILE_COUNT', buff['count'] );
        setValue( KS + 'MYSMILE_DATA', buff['ret'] );
		getOptions();
		// re attach
        window.setTimeout(function() { reload_mysmiley() }, 200);
		
		Dom.remove(imgtxta);
	  break;
	  
	  case "Cancel":
	    task='Save';
		el = Dom.get(txtaID);
		if(el) el.style.display = (task=='Save' ? 'none':'');
	  break;	
	}
	
	el = Dom.get('manage-cancel');
	if(el) el.style.display = (task=='Save' ? 'none':'');
	el = Dom.get('help_manage');
	if(el) el.style.display = (task=='Save' ? 'none' : '');

	if(e.innerHTML!='Cancel')
	  e.innerHTML = (task=='Save' ? 'Manage MySmiley':'Save');
	else
	  Dom.get('manage-smiley').innerHTML = (task=='Save' ? 'Manage MySmiley':'Save');
}

function reload_mysmiley(tgt){
  var img, span0, title, prefix = 'my__';
  var tosave = [];
  var recount = 0;
  if(isUndefined(tgt)) tgt = gvar.tabTitleId[3]+'_img';
  Div_image = Dom.get(tgt);
  
  Div_image.innerHTML = '';
  for (var i in gvar.mysmilies) {
    // pick image with defined prefix only
    if(i.indexOf(prefix) == -1 || typeof(gvar.mysmilies[i])=='function')
	   continue;    
    img=gvar.mysmilies[i];
	if( !isString(img) ){
      // Unity tag container
      Attr = {id:'tag_'+i};
      spanCon = mycreateElement('span', Attr);
      // start creating element..
      Attr = {rel:HtmlUnicodeDecode('&#8212;')+img[2],'class':'bbc_big',id:i};
      if( img[1] ) 
	    Attr.tag = img[1];
      title = img[2].replace(prefix,'');
	  
      span0 = createSmile(Attr,title);
	  
      spanCon.insertBefore(span0, spanCon.firstChild);
      //spanCon.appendChild(createTextEl(' '));
	  spanCon.appendChild(createTextEl(' '+HtmlUnicodeDecode('&#183;')+' '));
	  Dom.add(spanCon,Div_image);
      
	  tosave.push( i+'::'+img[0].replace(/^http:\/\//,'')+'::'+title );
	  recount++;
    }else {
	   // this is string and do replace to suitable value
       var sep, retEl=validTag(img, true, 'view');
       if(!retEl) continue;
       if(retEl.nodeName=='B'){
         if(Div_image.innerHTML!='') {
            sep = mycreateElement('br', {});
            Dom.add(sep,Div_image);
         }
         Dom.add(retEl,Div_image);
         sep = mycreateElement('br', {});
         Dom.add(sep,Div_image);
       }else{
         Dom.add(retEl,Div_image);
       }
	   tosave.push( 'my__sgtag'+'::'+img );
    }	 
  }

  //
  if( recount == 0 ){
    Div_image.innerHTML = '<span class="no_smile">--no smiley--</span>';
  }

  return String(tosave).replace(/\,/g,'||');
}

function do_filter_scustom(text){
  var buf=text;
  var count=0, retbuf='';
  if(buf!=''){
    var re,sml;
    var tosingle = {
       '\\|{2,}' : '|'
      ,'(\\r\\n){2,}' : '\r\n{sctag:br}\r\n,'
      ,'(\\n){2,}' : '\n{sctag:br}\n'
    };
    // step -1 to strip
    //buf = buf.replace(/[\[\]\,]/g,"");
    buf = buf.replace(/(?:\:\:)|(?:\|\|)|[\,]/g,"");
         //show_alert('step-to single');
    for(var torep in tosingle){
      if(!isString(tosingle[torep])) continue;
      re = new RegExp(torep, "g");
      buf = buf.replace(re, tosingle[torep])
    }
    // step -3 to validate per line    
    buf=(document.all ? buf.split("\r\n") : buf.split("\n")); // IE : FF/Chrome
    
    var fkey, smllink, sml;
    var sepr = '||'; // must be used on extracting from storage	
	
	gvar.mysmilies = {};
    for(var line in buf){
        if(!isString(buf[line])) continue;
        buf[line] = trimStr ( buf[line] ); // trim perline
        sml = /([^|]+)\|(http(?:[s|*])*\:\/\/.+$)/.exec( buf[line] );
		// smiley thingie ?
        if(sml && isDefined(sml[1]) && isDefined(sml[2]) ){
		   	retbuf+='my__'+sml[1]+'::'+sml[2].replace(/^http(?:[s|*])*:\/\//,'')+'::'+sml[1] + sepr; // new separator
            count++;
        }else if(sml=validTag( buf[line], false, 'saving' ) ){ // valid tag ?
            retbuf+='my__sgtag'+'::'+sml+sepr;
        }
    } // end for	
  }
  if(count==0) delete(gvar.mysmilies);
  return {'ret': retbuf, 'count': count};
}
function do_sanitize(text){
  var ret=text;
  var filter = [
     "[\\\"\\\'][\\s]*(javascript\\:+(?:[^\\\'\\\"]+))[\\\"\\\']"
    ,"((?:\\&lt;|<)*script(?:\\&gt;|>)*)"
    ,"((?:\\&lt;|<)*\\/script(?:\\&gt;|>)*)"
    ,"</?(?:[a-z][a-z0-9]*\\b).*(on(?:[^=]+)=[\\\"\\\'](?:[^\\\'\\\"]+)[\\\"\\\'])"
    ,"</?(?:[a-z][a-z0-9]*\\b).+(style=[\\\"\\\'](?:\\w+)\\/\\*[.+]*\\*\\/\\w+\\:[^\\\"]+\\\")"
    ,"<[\s]*>"
   ];
  var re, torep, do_it_again='';
  // need a loop until it's really clean | no match patern
  while( do_it_again=='' || do_it_again.indexOf('1')!=-1 )
  {
    do_it_again = '';
    for(var idx in filter){
     if(!isString(filter[idx])) continue;
     re = new RegExp(filter[idx], "ig");
     if(ret.match(re)){
      do_it_again+='1';
      torep = re.exec(ret);      
          //clog('replacing='+filter[idx]+'; torep='+torep[1]);
      if(torep && isDefined(torep[1]))
        ret=ret.replace(torep[1], '');
     }else{
      do_it_again+='0'; // must diff than (do_it_again=='')
     }
    }
  }
  
  return ret;
}
function validTag(txt, doreplace, mode){
  if(!isString(txt)) return false;
  ret=txt;
  var re,cucok = false;  
  var matches = {
   "{title:(.+)}" : ['b', '$1'],
   "{sctag:(br)}" : ['br','']
  };
  var val;
  for(var torep in matches){
    re = new RegExp(torep, "");
    if(ret.match(re)){
      cucok=true;
         //clog('cur torep='+torep)
      if(isDefined(doreplace) && doreplace){ // must be from view mode
        val=ret.replace(re, matches[torep][1]);
        val = do_sanitize(val);
        ret = mycreateElement(matches[torep][0],{'class':'mytitle'},false,val);
      } else if(isDefined(mode) && mode=='editor') // editor mode and it's a BR
        if(torep=='{sctag:(br)}') {
          ret=txt.replace(re, '\n');
        }else{
          // guess it should be a title
          var title = re.exec(txt);
            //clog('mode='+mode+'; title; title='+title)
          if(re && isDefined(title[1])){
            val = do_sanitize(title[1]).replace(/\:/g,'\\:');
            ret='{title:'+val+'}\n'; 
          }else{
            ret=txt.replace(/\:/g,'\\:')+'\n'; 
          }
        }
      break;
    }
  }
  return (cucok ? ret : false);              
}

// =============
// fetch options from saved state store it on gvar
function getOptions(){

  // getValue will try get from GM_getValue, if not available it will take from const OPTIONS_BOX
  var tabs = getValue(KS+'TABS').toString().split(',');
  
  for(var i in tabs){
      if(typeof(tabs[i])!='function') // ignore inArray element
    /*>>*/ gvar.tabSmiley[i] = tabs[i];
  }
  
  /*>>*/ gvar.smiley_box = getValue(KS+'SMILEY_BOX'); // get visibility smiley_box  
  /*>>*/ gvar.mysmile_count = getValue(KS+'MYSMILE_COUNT'); // get how any imglink
  
  var raw_str, raws, row, dumy;
  gvar.mysmilies = {};
  raw_str = getValue(KS+'MYSMILE_DATA');  
  if(raw_str!=''){
    raws = raw_str.split('||');
	var raws_l = raws.length;
	for(var j=0;j<raws_l; j++){
       /**
       // rawdata will be looks like this
       // image link w/o prefix http://
       // my__artist::www.magazine.ucla.edu/depts/style/artist.jpg::artist||my__asal::www.magazine.ucla.edu/depts/style/asal.jpg::asal
       */
       row = raws[j].split('::');      
       //if( row[0] && row[1] && row[2] ){
       if( row[0] && row[1] ){
	     if( row[0].indexOf('my__')!=-1 ){            
				gvar.mysmilies[row[0]] = ( isDefined(row[2]) ? ['http://'+row[1], '', row[2]] : row[1] );
		 }else{
          /*>>*/ gvar.smiliecustom[row[0]] = ['http://'+row[1], '', row[2]];
		 }
		 //show_alert( gvar.smiliecustom[row[0]] );
       }
	}
  }
  return gvar.mysmile_count;
}

function getSettings(){  
  gvar.settings = {
     autochkUpdates: true // enable update-check ?
    ,updates_interval: 3 // 1 day(s)
  };
  // get last used host
  gvar.lastused_uploader = getValue(KS+'LAST_UPLOADER');
  
  gvar.smiliekecil = gvar.smiliebesar = [];
}

// add some event on element
function additional_event(){
  var form = getByName('vbform', 'form');
  var el = mycreateElement('input', {id:'submit_type',value:'sbutton',type:'hidden'} );
  form.appendChild(el);
  
  // search for every submit type button
  var nodes = getByXPath('.//input[@type="submit"]', form);
  if(nodes)
    for(var i=0; i<nodes.snapshotLength; i++){
	   Ev.add(nodes.snapshotItem(i), 'click', function(e){
	     e=e.target||e;
	     Dom.get('submit_type').value=e.name;
	   });
	}  
  Ev.add(form, 'submit', function(e){
	if(Dom.get('submit_type').value=='preview') return;
    var hi=(Dom.get('hash') ? Dom.get('recaptcha_response_field') : null);
	if(hi.value==''){
      alert('Belum Isi Image Verification'); hi.focus();
      e.preventDefault(); // return false;
      return false;
	}
  });
}

// reorder tabIndex, focus field
function reorder_tabIndex(){
  
  var par=getTag('div', getByClas('panel', 'div') )[0];
  var nodes = getByXPath('.//input[@class="bginput"]', par );  
  var hi = Dom.get('recaptcha_response_field'); // capcay_input
  if(hi){
	hi.setAttribute('tabindex', 1);
  }else{
    hi = nodes.snapshotItem(0); // Reason for Editing
  }

  if(nodes)
    for(var i=0; i<nodes.snapshotLength; i++)
	  nodes.snapshotItem(i).setAttribute('tabindex', 1);

  if($D(gvar.id_textarea))
     $D(gvar.id_textarea).setAttribute('tabindex', 1);
	 
  var isPreviewMode = getByXPath_containing('//td', false, 'Preview');
  isPreviewMode = (isPreviewMode && isPreviewMode.length > 0 && isPreviewMode[0].getAttribute('class')=='tcat' ? true:false);
  
  window.setTimeout(function(){
     try{ hi.focus(); 
	   if(isPreviewMode){var mo=($D('Middleorgna')?getAbsoluteTop($D('Middleorgna')):95);scrollTo(0,mo);} 
	 } catch(e){}; // first load, try focus to element
   }, 200);
}

// in private.php (PM) need to create this node first
function recreate_smilebox(){
 var txa = $D(gvar.id_textarea), parent, fieldset, holder;
 
 if(txa)
    if(txa.parentNode.nodeName=='TD'){
        parent = txa.parentNode.parentNode;
    } else {
        parent = txa.parentNode;
        parent.parentNode.setAttribute('style', 'max-width: 90%;');
        parent.setAttribute('style', 'height:220px !important;');
        txa.setAttribute('style', 'float:left;width:480px;');
    } 
 fieldset = mycreateElement('fieldset', { id:gvar.id_smilebox,style:'max-width:'+gvar.width_smilebox+'px;' } ); 
 holder= document.createElement( (parent.nodeName=='TR' ? 'td' : 'div') );
 if(parent.nodeName=='DIV')
    fieldset.setAttribute('style', 'float:left;');   
 
 holder.appendChild(fieldset);
 parent.appendChild(holder);
}
// in visitor message need to recreate editor container
function recreate_editor(){
  var chld = [$D(gvar.id_textarea).parentNode, $D(gvar.id_smilebox)]; // txtarea, smilebox
  var par = getByClas('panel', 'div'); // style yakin >,<
  par = getTag('div', par);
  var Attr, div0,ctbl,ctr,ctd, tbl,tr,td;
  tbl = mycreateElement('table', {cellpadding:'0',cellspacing:'0',border:'0'});
  tr = mycreateElement('tr',{});  
  td = mycreateElement('td',{id:'vB_Editor_001',colspan:'2','class':'vBulletin_editor',width:par[0].clientWidth});
  div0 = mycreateElement('div',{'class':'controlbar',id:'vB_Editor_001_controls'});
  Attr = {cellpadding:'0',cellspacing:'0',border:'0'};
  ctbl = mycreateElement('table',Attr);
  ctr = mycreateElement('tr',{});
   ctd = mycreateElement('td',{},false,'&nbsp;'); // harus &nbsp; utk xpath
  ctr.appendChild(ctd);
   ctd = mycreateElement('td',{width:'100%'},false,'&nbsp;'); // harus 100% utk xpath
  ctr.appendChild(ctd);
  ctbl.appendChild(ctr);
  div0.appendChild(ctbl);
  td.appendChild(div0);
  
  ctbl = mycreateElement('table',Attr);
  ctr = mycreateElement('tr',{});
   ctd = mycreateElement('td',{});
  ctr.appendChild(ctd);
  ctbl.appendChild(ctr);  
  div0.appendChild(ctbl);
  td.appendChild(div0);
  // end vB_Editor_001_controls
  
  ctbl = mycreateElement('table',Attr);
  ctr = mycreateElement('tr',{});
   ctd = mycreateElement('td',{valign:'top'});
   ctd.appendChild(chld[0]); // appending textarea
  ctr.appendChild(ctd);
   ctd = mycreateElement('td',{valign:'top'});
   ctd.appendChild(chld[1]); // appending smilebox
  ctr.appendChild(ctd);
  ctbl.appendChild(ctr);  
  td.appendChild(ctbl);
  tr.appendChild(td);

  tbl.appendChild(tr);
  par[0].appendChild(tbl);  
}

// add buttons to blue control box
function spoiler_act(){
  //
  var vb_Control = $D('vB_Editor_001_controls');
  if(vb_Control){
    var tbl_cont=getTag('table',vb_Control);
	var Attr = {};
    var div1,el;
	if(tbl_cont){
      // guessing lastchild table is the target
	  tbl_cont = tbl_cont[parseInt(tbl_cont.length)-1];
	  tbl_cont.width='100%';
	  var tr_cont = getTag('tr', tbl_cont);
	  if(!tr_cont) {
	  
	    show_alert('failed create spoiler button');
		
	  } else {
		
		// separator
		var Insert = {
		  separator: function(){
		    var p = mycreateElement('td', {});
		    var g = mycreateElement('img', {src:'http:/'+'/www.'+gvar.dmkaskus+'/images/editor/separator.gif'});
		    p.appendChild(g);
		    return p;
		  },
		  spacer: function(ln){
		    var bufspc='';
			for(i=0;i<=ln;i++)bufspc+='&nbsp;';	
		    return mycreateElement('span',{},false,bufspc);			
		  }
		}
		// tambahin separator
		if( !gvar.is_visitormessage )
		  tr_cont[0].appendChild(Insert.separator().cloneNode(true));		
		
		Attr = {'class':'smilekecil tcat',style:'padding:1px;width:100%;min-width:130px;'};
		td = mycreateElement('td', Attr);
		
		if( !gvar.is_visitormessage ){ // no controler for VM
		  Attr={id:'vB_Editor_001_cmd_wrap0_addcontroller','class':'imagebutton'};		
		  div1 = mycreateElement('div', Attr);		
		  
		  // tombol spoiler
		  Attr={title:'Wrap [SPOILER] tags around selected text',
		        alt:'[SPOILER]',style:'vertical-align:bottom',src:gvar.B.spoiler_png
		       };
		  el = mycreateElement('img', Attr);
		  //Ev.add(el, 'click', function(){ return do_addspoiler(); });
		  Ev.add(el, 'click', function(e){ return do_btncustom(e); });
		  div1.appendChild(el);
		  
		  // tombol transparent
	      Attr={title:'Wrap [COLOR=transparent] tags around selected text',
		        alt:'[Transparent]',style:'vertical-align:bottom',src:gvar.B.transp_png
		       };
		  el = mycreateElement('img', Attr);
		  Ev.add(el, 'click', function(e){ return do_btncustom(e); });
		  div1.appendChild(el);
		  		  
		  // tombol flip word
	      Attr={title:'Flip words around selected text',
		        alt:'[FlipWord]',style:'vertical-align:bottom',src:gvar.B.flipw_png
		       };
		  el = mycreateElement('img', Attr);
		  Ev.add(el, 'click', function(){ return do_fliper(); });		  
		  div1.appendChild(el);
		  
		  // tombol noparse
	      Attr={title:'Wrap noparse tags around selected text',
		        alt:'[noparse]',style:'vertical-align:bottom',src:gvar.B.noparse
		       };
		  el = mycreateElement('img', Attr);
		  Ev.add(el, 'click', function(e){ return do_btncustom(e); });
		  div1.appendChild(el);

		  // tombol youtube
	      Attr={title:'Insert Youtube URL',
		        alt:'[youtube]',style:'vertical-align:bottom',src:gvar.B.youtube_gif
		       };
		  el = mycreateElement('img', Attr);
		  Ev.add(el, 'click', function(e){ return do_btncustom(e); });
		  div1.appendChild(el);

		  // end additional button		  
		  td.appendChild(div1);
		}
		tr_cont[0].appendChild(td);
		
		td = mycreateElement('td', {'class':'tcat','width':'100%'});
		Attr={id:'vB_Editor_001_cmd_wrap0_spoiler','class':'imagebutton'};
		div1 = mycreateElement('div', Attr);
		
		// tombol smiley
		var sp = mycreateElement('span', {'class':'smallfont',style:'margin-top:-40px !important;font-weight:bold;line-height:15px;'});
		Attr = {href:'javascript:;',title:'Toogle Smiley',style:'text-decoration:none;'};
		el = mycreateElement('a',Attr,false,'SMILEY');
		Ev.add(el, 'click', function(){ return toogle_smiley_box();return false; });
		sp.appendChild(el);
		div1.appendChild(sp);		
		
		// tombol update
		if(!gvar.notSafe){ // will not availabe on Opera/Chrome
		  //Attr = {href:'javascript:;',id:'chk_update',title:'Check Update..',style:'text-decoration:none;margin-left:10px;'};
		  Attr = {href:'javascript:;',id:'upd_notify',title:'Check Update..',style:'text-decoration:none;margin-left:10px;'};
		  var span0 = mycreateElement('a',Attr);
		  el = mycreateElement('img',{'src':gvar.B.upd_png,alt:'[Update]',border:'0'});
		  Ev.add(el, 'click', function(){
            Updater.notify_progres('chk_upd_now');
			Updater.check(true);
		    return false;
		  });
		  span0.appendChild(el);
		  div1.appendChild(span0);
		  el = mycreateElement('span',{id:'loading_ajax',style:'display:none;'});
		  div1.appendChild(el);
		}
		
		td.appendChild(div1);		
		tr_cont[0].appendChild(td);
	  }
	} // end tbl_cont
	
	// nyiapin nyari elemen buat return update
    var top_cont = getByXPath('//td[@width="100%"]', vb_Control);
	if(top_cont){
	   i=-1;var nodecont;
	   while(i<top_cont.snapshotLength){
	     i++; nodecont=top_cont.snapshotItem(i); 
	     if( (nodecont.innerHTML==''||nodecont.innerHTML=='&nbsp;') && nodecont.nodeName=='TD') break;		  
       }
	   // assume we always got this node, make div container
	   nodecont.style.textAlign='right';	   
	   var div0 = mycreateElement('div',{id:'upd_container',style:'display:none;'},false,' ');
	   nodecont.appendChild(div0);
	}
  } // end vb_Control
}

function toogle_smiley_box(){
    var tdsmbx = Dom.get(gvar.id_smilebox).parentNode;
    var dsp = (tdsmbx.style.display=='none' ? '':'none');
		
	gvar.smiley_box = (dsp==''?1:0);
	var calibrate = (dsp==''?-28:28);
	var addition_width = (( (dsp==''?-1:1) * parseInt(gvar.width_smilebox) ) + calibrate );
	
	vB_textarea.init();
	vB_textarea.setWidth(addition_width, true); // yes true add the width, not really set w/ that value
	tdsmbx.style.display=dsp;
	
	setValue('KEY_SAVE_' + 'SMILEY_BOX', gvar.smiley_box);
	vB_textarea.focus();
}

function do_fliper(){
  vB_textarea.init();
  FlipWordsEngine.init();
  var selected = vB_textarea.getSelectedText();
  var text = (selected==''? prompt('Please enter the TexT to flip:', 'saya jangan dibalik') : selected);
  if(text===false) 
    return;
  else{
    text = FlipWordsEngine.flipText(text.toLowerCase());
	var prehead = [0, text.length];	 
    vB_textarea.replaceSelected(text, prehead);
  }  
}
function do_transp(){  
  vB_textarea.init();
  var selected = vB_textarea.getSelectedText();
  var text = (selected==''? prompt('Please enter the Text to be transparent:', 'text hantu') : selected);
  if(!text) return;  
  if(selected!='')
    vB_textarea.wrapValue( 'color', 'transparent' );
  else
    vB_textarea.setValue('[COLOR="transparent"]'+text+'[/COLOR]');
}
function do_addspoiler(){  
  var title = prompt('Please enter the TITLE of your Spoiler:', 'judule');
  if(!title) return; 
  vB_textarea.init();  
  vB_textarea.wrapValue( 'spoiler', (title ? title : 'judule') );  
}
function do_btncustom(e){
  e = e.target||e;
  var tag=e.alt;
  var tagprop = '';
  tag = tag.replace(/[\[\]]/g,'').toLowerCase();
  var pTag={	
    'spoiler':'SPOILER', 'transparent':'COLOR',
    'noparse':'NOPARSE', 'youtube':'YOUTUBE',
  };
  if(isUndefined(pTag[tag])) return;
  vB_textarea.init();
  
  if(tag=='spoiler'){
    var title = prompt('Please enter the TITLE of your Spoiler:', 'title');
    if(!title) return;
	vB_textarea.wrapValue( 'spoiler', (title ? title : 'title') );

  }else{
    var text, selected = (tag=='youtube' ? '':vB_textarea.getSelectedText());
	var is_youtube_link = function(tx){
	    tx = tx.replace(/^\s+|\s+$/g,""); //trim
	    if(tx.match(/youtube\.com\/watch\?v=\w+/i)){
	     var rx = /youtube\.com\/watch\?v=([^&]+)/i.exec(tx);
	     tx = ( rx ? rx[1] : '');
	    }else if(!/^[\d\w-]+$/.test(tx))
	     tx = false;
		return tx;
	};

	if(selected==''){
	  switch(tag){
	    case 'transparent':
		  tagprop = tag;
		  text = prompt('Please enter the Text to be transparent:', 'text hantu');
		break;
	    case 'noparse':
		  text = prompt('Please enter Text or/with Tags to be no parsed:', '[code]-CODE-[/code]');	   
		break;
	    case 'youtube':
		  text = prompt('Please enter the Youtube URL or just the ID, \nhttp:/'+'/www.youtube.com/watch?v=########', '');
		  text = (text ? is_youtube_link(text) : false);
		break;
	  }
	  if(!text) 
	    return false;
	  else{
	    var prehead = [('['+pTag[tag]+(tagprop!=''?'='+tagprop:'')+']').length, 0];
		prehead[1] = (prehead[0]+text.length);		
	    vB_textarea.setValue( '['+pTag[tag]+(tagprop!=''?'='+tagprop:'')+']'+text+'[/'+pTag[tag]+']', prehead );
	  }
	  return;
	} // end selected==''
	
	  tagprop = (tag=='transparent' ? 'transparent' : '');
	  vB_textarea.wrapValue( pTag[tag], (tagprop!='' ? tagprop:'') );
  }
}

function align_adjuster(){
  // fix panel alignment; may eat alot of resource so doit later
  window.setTimeout(function() {
	 var w = parseInt($D(gvar.id_textarea).style.width.replace(/px/,''))+60;
	 if(gvar.smiley_box==1)
	   w+=parseInt(gvar.width_smilebox);
	 var tgt=getTag('div', getByClas('panel', 'div') )[0];
     tgt.style.maxWidth=tgt.style.width= w+'px';
  }, 200);
}

function loadCounter(){
   vB_textarea.init();
   var tdTxtA = $D(gvar.id_textarea);
   if(tdTxtA) 
    tdTxtA= tdTxtA.parentNode;
   else return;
   var realLen = String(vB_textarea.content).replace(/[\r\n]/g,'  ').length;
   
   var Attr,el,cont;
   Attr = {id:"counter_container", style:"float:right;text-align:left;"};      
   cont = mycreateElement('div', Attr, false, "<small>Text Counter:<small>&nbsp;");
   Attr = { id:"txta_counter",'class':(realLen >= (gvar.is_visitormessage ? 256 : 10000) ? 'txta_counter_red':'txta_counter'),
     readonly:"readonly",value:realLen};
   el = mycreateElement('input', Attr);
   cont.appendChild(el);
   tdTxtA.appendChild(cont);
   
   // attaching event for textarea
   if(vB_textarea.Obj) {
     Ev.add(vB_textarea.Obj, 'change', function(){updateCounter();});
     Ev.add(vB_textarea.Obj, 'focus', function(){updateCounter();});
   }
   
   // Object clear / reset text
   Attr = { style:'float:left;',title:'Clear Textarea'};
   cont = mycreateElement('small', Attr);
   Attr = { id:"txta_clear",href:'javascript:;'};
   el = mycreateElement('a', Attr,false,'reset');
   Ev.add(el, 'click', function(){vB_textarea.init();vB_textarea.clear();});
   cont.appendChild(el);
   tdTxtA.appendChild(cont);
}

function updateCounter(){
  // Stop any pending updating Counter value
  clearInterval(gvar.INTERVAL);
  gvar.INTERVAL = window.setInterval( function(){
    vB_textarea.init();
    var realLen = String(vB_textarea.content).replace(/[\r\n]/g,'  ').length;    
	if($D('txta_counter')){
	   $D('txta_counter').value = realLen;
	   $D('txta_counter').setAttribute('class', (realLen >= (gvar.is_visitormessage ? 256 : 10000) ? 'txta_counter_red' : 'txta_counter') );	   
	}	
  }, 10);
}

function loadSmilieBox(){
  var smbx = $D(gvar.id_smilebox);
  // bersihiin dulu, coz pake append
  if(smbx)
    smbx.innerHTML = '';
  else 
    return;
  
  // check smiley toogle for toggle smilebox parent container
  smbx.parentNode.style.display = (gvar.smiley_box==1 ? '':'none');
  
  // Fixups adaptation, literaly state width
  smbx.style.width=parseInt(gvar.width_smilebox) +'px'; 
  
  if(gvar.smiley_box!=1){    
    vB_textarea.init();
    var new_width = vB_textarea.getWidth().replace(/px/,'');
    new_width = ( parseInt(new_width) + parseInt(gvar.width_smilebox) ) ;    
    vB_textarea.setWidth(new_width); // definitely set w/ new_width
  }
  var Attr,img, img0;   
  var Leg= document.createElement('legend');
  Attr = {href:'http://'+gvar.uso+'/scripts/show/'+gvar.scriptMeta.scriptID,target:'_blank',title:gvar.akronim+' Home'};
  var a0 = mycreateElement('a', Attr, false, gvar.codename);
  Leg.appendChild(a0);
  Leg.appendChild(createTextEl(' '+'Smilies' +' '+gvar.sversion));

  Attr = {width:gvar.width_smilebox,border:'0',cellspacing:'0',cellpadding:'0'};
  var Obj = mycreateElement('table', Attr);
  
  var Tr1= document.createElement('tr');
  var Td1= document.createElement('td');
  var Div1= document.createElement('div');
  Div1.setAttribute('class', 'smallfont');  

  // load smile kecil
  Attr = {'class':'smallfont smilekecil',style:'display:'+ (gvar.tabSmiley[0]==1 ? '':'none') +';',
          id:gvar.tabTitleId[0] // 'skecil_container'
         };
  var Div2 = mycreateElement('div', Attr);
  if(gvar.tabSmiley[0]==1)
      preload_small_emote(Div2);  
  
  // create judul and event toogle_smile click, and attach it to its parent, Div1
  Div1 = judulSmiley(Div1, '[Smiley Kecil]', Div2.id);
  Div1.appendChild(Div2);
    
  // load smile besar
  Attr ={'class':'smallfont smilebesar',style:'display:'+ (gvar.tabSmiley[1]==1 ? '':'none') +';',
         id:gvar.tabTitleId[1] // 'sbesar_container'
        };
  Div2 = mycreateElement('div', Attr);
  
  var span0,span1,ssmiles=gvar.smiliebesar;
  for (var i=0; i<ssmiles.length; i++) {
    {
       //if( typeof(gvar.smiliebesar)=='function') continue;
	   img=ssmiles[i];
	   Attr = {
	     rel:img[1]+' '+HtmlUnicodeDecode('&#8212;')+img[2],
         alt:img[1],'class':'bbc_big',id:i
       };
	   span0 = createSmile(Attr,img[1]);
	   Div2.appendChild(span0);
	   Div2.appendChild(createTextEl(' '+HtmlUnicodeDecode('&#183;')+' '));
    }
  }

  Div1 = judulSmiley(Div1, '[Smiley Besar]', Div2.id);  
  Div1.appendChild(Div2);
  
  // More smilie
  var atxt = '[ <a href="javascript:;" onclick="vB_Editor[\'vB_Editor_001\'].open_smilie_window(smiliewindow_x, smiliewindow_y); return false" title="Showing all total smilie.">More</a> ]';
  var p0 = mycreateElement('p', {id:'more_smile'}, false, atxt);
  Div1.appendChild(p0);
  
  var ssmiles;
  if( !gvar.is_visitormessage ){
    // load smile custom
	Attr={'class':'smallfont smilebesar',style:'display:'+ (gvar.tabSmiley[2]==1 ? '':'none') +';',
           id:gvar.tabTitleId[2] // 'scustom_container'
         };
    Div2 = mycreateElement('div', Attr);
    
    for (var i in gvar.smiliecustom) {
      {
         if( typeof(gvar.smiliecustom)=='function' ) continue;
         if( i.indexOf('my__') !=-1 ) continue;
	     img=gvar.smiliecustom[i];
	     Attr={rel:HtmlUnicodeDecode('&#8212;')+img[2],'class':'bbc_big',id:i};
	     if(img[1]) Attr.tag = img[1];
		 span0 = createSmile(Attr,img[2]);
	     Div2.appendChild(span0);
	     //Div2.appendChild(createTextEl('  '));
		 Div2.appendChild(createTextEl(' '+HtmlUnicodeDecode('&#183;')+' '));
      }
    }    
    Div1 = judulSmiley(Div1, '[Smiley Custom]', Div2.id);  
    Div1.appendChild(Div2);
  }
  
  // closing td
  Td1.appendChild(Div1);
  Tr1.appendChild(Td1);
  Obj.appendChild(Tr1);
  
  smbx.setAttribute('title', '');
  smbx.appendChild(Leg);
  smbx.appendChild(Obj);

} // end loadSmilieBox

function judulSmiley(parent, title, target){
  var B1 = mycreateElement('b', {style:'cursor:pointer;clear:left;','class':'judul_smiley'}, false, title);
  Ev.add(B1, 'click', function(){toogle_smile(target);});
  
  // prep create checkbox for tag img mode |&| will not available on visitormessage.php
  var besarkecil = ['skecil_container','sbesar_container'];
  var Elm=false;
  if(inArray(besarkecil, target) && !gvar.is_visitormessage ){
    if(target.indexOf('kecil')==-1) parent.appendChild(document.createElement('br'));
	var mix_id = 'imgmode_id_'+target;
	var Attr = {id: mix_id,value:(target.indexOf('kecil')!=-1 ? '1' : '2'),type:'checkbox',name:'imgmode',style:'cursor:pointer'};
	if(target.indexOf('kecil')!=-1) {
	  if(gvar.imgTagMode[0]=='1') Attr.checked = 'checked';
	} else {
	  if(gvar.imgTagMode[1]=='1') Attr.checked = 'checked';
	}	  

	var chk_inp = mycreateElement('input', Attr);
	Ev.add(chk_inp, 'click', function(){set_imgMode(this); return false;});
	
	mix_id = 'imgmode_id_'+target;
	Attr = {'for': mix_id,'class': 'label_imgmode'};
	var Elm = mycreateElement('label', Attr);
	Elm.appendChild(chk_inp);
	Elm.appendChild(createTextEl('use IMG Tag'));
  }

  // add separator if in VM
  if(gvar.is_visitormessage && target.indexOf('kecil')==-1){
    parent.appendChild(document.createElement('br'));
  }
    
  parent.appendChild(createTextEl('::'));
  parent.appendChild(B1);
  parent.appendChild(createTextEl('::'));
    
  if(Elm) parent.appendChild(Elm);
  return parent;
}

// checkbox for tag IMG mode state will send to global var
function set_imgMode(Obj){
  var cval = (parseInt(Obj.value)-1);
  gvar.imgTagMode[cval] = (Obj.checked ? '1' : '0');  
}

function createSmile(Attr, title){
  var smile = mycreateElement('span', Attr, false, title );
  Ev.add(smile, 'click', function(){e_click(this);});
  Ev.add(smile, 'mouseover', function(e){ preview(e, this) });
  Ev.add(smile, 'mouseout', function(){ removeme(); });
  Ev.add(smile, 'mousemove', function(e){ trackme(e); });
  return smile;
}


// callback setelah loading_img preview
function chkDimensi(e, Obj){
//chkDimensi = function(e, Obj){
   var e = (e) ? e : ((window.event) ? window.event : null);
   var rez = (Obj.width > 400 || Obj.height > 400 ? true : '');
   var lDim = [Obj.width,Obj.height]; // width,height
   // should we resize it?
   var is_oversize = (lDim[0] > 400 || lDim[1] > 400);   
   if(lDim[0] > 400){ // over-width
      Obj.setAttribute('style', 'width:400px;');
   }else if(lDim[1] > 400){ // over-height
      Obj.setAttribute('style', 'height:400px;');
   }
   if(lDim[0] > 400 || lDim[1] > 400)
     rez = ' (resized from: '+lDim[0]+'px X '+lDim[1]+'px)';	 
   
   var prev=Obj.parentNode; // $D("preview")
   var Margin = {
     y:(lDim[0] > 400 ? '300': (Obj.height >0 ? Math.floor(parseInt(Obj.height))+10 : '60') )
	,x:(lDim[1] > 400 ? '300': (Obj.width > 0 ? Math.floor(parseInt(Obj.width))/2 : '60') )
   };   
   if($D("loading_img")) Dom.remove($D("loading_img"));
   prev.style.display='none';

   window.setTimeout(function() {
     trackme(e, Margin);
     Obj.style.display = '';
     prev.style.display='';
	 var imgsub = $D('imgsubtitle');
	 if(imgsub && imgsub.innerHTML.indexOf('(resized from')==-1)
	    $D('imgsubtitle').innerHTML+= rez;	 
   }, 100);
   return false;
}

// preview event
function trackme(e, Mrg){
  var e = (isDefined(e) ? e : ((window.event) ? window.event : null) );
  var prev = $D("kerp_preview");
  if(!prev) return;
  var img0 = getTag('img',prev)[0];
  if(isUndefined(Mrg))
    Mrg = {y : (img0 ? img0.height : '300'),x : (img0 ? img0.width  : '300')};  
  var is_oversize = (img0.height > 400 || img0.width > 400);
  prev.setAttribute('style', (isDefined(is_oversize) && is_oversize ? 
    'position:absolute;top:'+ parseInt(getCurrentYPos()+40) +'px; left:15px;z-index:10;' : 
	'top:'+(e.pageY - gvar.yOffset) + 'px; left:'+(e.pageX) + 'px;'
	+'margin:-'+(Mrg.y ? (Math.floor(parseInt(Mrg.y))+10) : gvar.yOffset)+'px 0px 0px -' + (Mrg.x > 400 ? '300' : (Mrg.y > 0 ? Math.floor(parseInt(Mrg.y))/2 : '60') ) + 'px'
	)
  );
//  prev.setAttribute('style', 
//    'top:'+(e.pageY - gvar.yOffset) + 'px; left:'+(e.pageX) + 'px;'
//   +'margin:-'+(Mrg.y ? (Math.floor(parseInt(Mrg.y))+10) : gvar.yOffset)+'px 0px 0px -' + (Mrg.x > 400 ? '300' : (Mrg.y > 0 ? Math.floor(parseInt(Mrg.y))/2 : '60') ) + 'px');
}
function removeme(){
   if($D('kerp_preview')) Dom.remove($D('kerp_preview'));
}
// triggered on mouseover span, big smilie
function preview(e, Obj){   
    var e = (e) ? e : ((window.event) ? window.event : null);
	var Attr = {'class':'prev_cont',id:'kerp_preview'};
	var p0 = mycreateElement('p', Attr);	
	var image_sets = ( Obj.getAttribute('alt') ? gvar.smiliebesar : (Obj.id.indexOf('my__')!=-1 ? gvar.mysmilies : gvar.smiliecustom) );
	Attr = {border:0,src:image_sets[Obj.id][0],style:'display:none;'};
	var img0 = mycreateElement('img', Attr);
	
	Ev.add(img0, 'load', function(){ chkDimensi(e, this);});
	p0.appendChild( mycreateElement('blink', {id:'loading_img',style:'color:#770000;font-size:9px;'},false,' Loading... ') );

	p0.appendChild(img0);
	var innerImg=mycreateElement('div', {'class':'imgtitle'});
	var small=mycreateElement('small', {id:'imgsubtitle'});
	small.appendChild(createTextEl(Obj.getAttribute('rel') ));
	innerImg.appendChild(small);
	p0.appendChild(innerImg);
	var concon = $D(gvar.id_smilebox).parentNode;
    concon.insertBefore(p0,concon.firstChild);    
	
}


// event click smile
function e_click(Obj, nospace){
    var bbcode; 
	var parent = Obj.parentNode;
	
    if(Obj.getAttribute("alt")){
  
	  if(parent.id.indexOf('besar')!=-1 && gvar.imgTagMode[1]==1)
	    bbcode = '[IMG]' + gvar.smiliebesar[Obj.id][0] + '[/IMG]';
	  else if(Obj && Obj.nodeName=='IMG' && gvar.imgTagMode[0]==1)
	    bbcode = '[IMG]' + Obj.src + '[/IMG]';
	  else
	    bbcode = Obj.getAttribute("alt");
		
	}else if(Obj.id.indexOf('my__')!=-1){
	    bbcode = '[IMG]' + gvar.mysmilies[Obj.id][0] + '[/IMG]';	
	  
	}else{
	  bbcode = '[IMG]' + gvar.smiliecustom[Obj.id][0] + '[/IMG]';
	  
	  // find any tags property to add
	  var tag = Obj.getAttribute('tag');
	  if(tag && tag.match(/^\w+$/)) bbcode = '[' + tag.toUpperCase() +  ']' + bbcode + '[/' +tag.toUpperCase() + ']';
	}

	vB_textarea.init();
	vB_textarea.setValue( bbcode + (!nospace ? ' ':'') );
	return false;
}

function preload_small_emote(parent){
    var img, img0, imgDum, Attr, pmain, ssmall=gvar.smiliekecil;

    if(typeof(parent)=='string') parent = Dom.get(parent);
    img0 = getTag('img', parent);
    if(ssmall.length && img0.length == 0){
	   parent.innerHTML = '<div id="preload_smiley">'+_LOADING+'</div>'; // ... loading ...
	   Attr = {id:'main_se_content',style:'display:none;'};
	   pmain = mycreateElement('div', Attr);
       for (var i=0; i<ssmall.length; i++) {
         img=ssmall[i];
  	     Attr = {src:img[0],alt:img[1],title:img[1]+' '+HtmlUnicodeDecode('&#8212;')+img[2]};
         img0 = mycreateElement('img', Attr);
  	     Ev.add(img0, 'click', function(){e_click(this);});
		 Dom.add(img0, pmain);
       }
	   
	   var showContent = function(){
          var pEl, el= Dom.get('preload_smiley');
          if(el) Dom.remove(el);
          el = Dom.get('main_se_content');
          if( el ) el.style.display='';
       };
       Attr = {alt:'dummy_img', style:'visibility:hidden;', src:gvar.domainstatic + 'images/editor/separator.gif' + '?'+String( Math.random() ).replace('0.','')};
       imgDum = mycreateElement('img',Attr);
	   Ev.add(imgDum, 'load', function(){ showContent(); });
       if(imgDum.height) // obj has beed loaded before this line executed
          showContent();
	   Dom.add(imgDum, pmain);
	   Dom.add(pmain, parent);
    }
}

function toogle_smile(target_id, show){
  var idxtab = inArray(gvar.tabTitleId, target_id);
  if(idxtab==-1) return;
  var tgt = $D(target_id);  
  
  // special tret on smiley kecil
  if(target_id == 'skecil_container'){
    preload_small_emote(tgt);
  }
  
  if(isUndefined(show)) show = (tgt.style.display=='' ? true : false);     
  
  tgt.style.display = (show ? 'none' : '');
  gvar.tabSmiley[idxtab] = (show ? 0 : 1);    
  setValue('KEY_SAVE_' + 'TABS', gvar.tabSmiley.join(',').toString() );
}

function getSetOf(type){
  if(isUndefined(type)) return false;
  switch(type){
    case 'button':
	   return {
	    dead_png : ''
		 +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTU'
		 +'UH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQCY6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGq'
		 +'mTx5M5nJY5wpwRiQHPfoL2rG8PVksDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE+AzDwxG3Z2E/oO9b'
		 +'KMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3'
		 +'An1Gr4xkabq70iar9OkOeoWCSqVMAM8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2NsLwMkRHevyVkWQ'
		 +'ib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmRQHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC'
		,spoiler_png : ''
		 +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABnRSTlMA4QDhAOKdNtA9AAAACXBIWXMAAAsTAAALEwEAmpwYAAABg0lEQVR42t'
		 +'VUPUsDQRB9M7dBQi4iypWJhgQsU1lIUtklIgg2tmJhK3b+gLT+AtHaP2AqtUmwslGMTSJcUgaSKEc+bu/DYmGJMR+glVs8HrO8fTOzs0u23cRvF+MP609iodn1Y70SbC8UhL'
		 +'3O1a6vOOmaj6tWds32Xc9gigpDMEUYBvNyVESYIwZiERHaK6+1h8+P2unJ4WTaw6Hs9+WgL0cD6Q6lO/S8kRe4PqRP0mcvMNd7uf0tAC9v79/SBpDaWIUfEkMwM0AEMC0JJqK'
		 +'AMDBYMrHB3U53smYA7tMNMRNzIASBiJmIXabFDQNwfnRWbTm5hFlutAtpS3GNABR5vitNEVdbTj5pAgAsAID5A1FpwpVyyj3nEmal6YQhFN7W2xorTUcFZw5JudHOJ00iACBC'
		 +'MWMBKGYsFdFb08WFtKWPV24AdGSec7Z+r7pChHF/xVUvZjp77iiXMLXnuL/OYl7NynkWahKPxyZnG0Dp4tJx+vMfRjwe28ykDvZ2JsX/5zP4AtVMzoKTk38hAAAAAElFTkSuQmCC'
		,flipw_png : ''
		 +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABnRSTlMA/wD/AP83WBt9AAAArElEQVR42mP8//8/A7mAiYECQAPNHjP4idL9HwO'
		 +'4T+e78GSX+3S+/4QAA1adEERQPxOaazt918C5nb5r8LufCc2fu97MhYtA2B4z+Gt2+dfs8ifsZzRnf4eBlA16BJyNBzx+/mAwJRIWNL4MY+DkLUuf/F/PwMDgbOkJF3e29ISE6'
		 +'I6Mj/gSCTzkvqMCzGhnwJMGkPVjTTAM+NMQRD+upMZAMAHjSaSMQ7MwAACna6I+hLmZ+gAAAABJRU5ErkJggg=='
		,transp_png : ''
		 +'data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKbK8EAgAGAgAIAgAKAgAMAgAOAgAABAACBAAEBAAGBAAIBAAKBAAMBAAOB'
		 +'AAABgACBgAEBgAGBgAIBgAKBgAMBgAOBgAACAACCAAECAAGCAAICAAKCAAMCAAOCAAACgACCgAECgAGCgAICgAKCgAMCgAOCgAADAACDAAEDAAGDAAIDAAKDAAMDAAODAAADg'
		 +'ACDgAEDgAGDgAIDgAKDgAMDgAODgAAAAQCAAQEAAQGAAQIAAQKAAQMAAQOAAQAAgQCAgQEAgQGAgQIAgQKAgQMAgQOAgQABAQCBAQEBAQGBAQIBAQKBAQMBAQOBAQABgQCBgQE'
		 +'BgQGBgQIBgQKBgQMBgQOBgQACAQCCAQECAQGCAQICAQKCAQMCAQOCAQACgQCCgQECgQGCgQICgQKCgQMCgQOCgQADAQCDAQEDAQGDAQIDAQKDAQMDAQODAQADgQCDgQEDgQGDgQ'
		 +'IDgQKDgQMDgQODgQAAAgCAAgEAAgGAAgIAAgKAAgMAAgOAAgAAggCAggEAggGAggIAggKAggMAggOAggABAgCBAgEBAgGBAgIBAgKBAgMBAgOBAgABggCBggEBggGBggIBggKBg'
		 +'gMBggOBggACAgCCAgECAgGCAgICAgKCAgMCAgOCAgACggCCggECggGCggICggKCggMCggOCggADAgCDAgEDAgGDAgIDAgKDAgMDAgODAgADggCDggEDggGDggIDggKDggMDggOD'
		 +'ggAAAwCAAwEAAwGAAwIAAwKAAwMAAwOAAwAAgwCAgwEAgwGAgwIAgwKAgwMAgwOAgwABAwCBAwEBAwGBAwIBAwKBAwMBAwOBAwABgwCBgwEBgwGBgwIBgwKBgwMBgwOBgwACAwCC'
		 +'AwECAwGCAwICAwKCAwMCAwOCAwACgwCCgwECgwGCgwICgwKCgwMCgwOCgwADAwCDAwEDAwGDAwIDAwKDAwP/78KCgpICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAEAAP8ALAAA'
		 +'AAAUABQABwhMAP8JHEiwoMGDCBMqREiq4b+GpB5GhGgw4kKLBDEm1FjQ4cSHGxeC7Djw48eRIkVaNHmSI8qQCj2+JHmxosqKHnNKdJmyp8+fQAUGBAA7'
		,noparse : ''
		 +'data:image/gif;base64,R0lGODlhFAAUAPcBAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXF'
		 +'xgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5O'
		 +'To6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1'
		 +'xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5'
		 +'+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6Cgo'
		 +'KGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsP'
		 +'Dw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5'
		 +'ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAHoAwEALAAAAAAUABQAAAhNAAMIHEi'
		 +'woMGDCBMqXMiwoUIAEBlCBCAwYkOLFiVSDBBxYsaJFTdipNiRpMmQKEtyPLky5UmVLVuqhFnSpE2UMTWG3Pgwo8OfQIMCDQgAOw=='
		,youtube_gif : ''
		 + 'data:image/gif;base64,R0lGODlhFAAUAPcAAAQCBLySRGSKzKTG5PTmrHxKDPzOzPzy7PyytERmrNz6/OweBPyanPxWTPza3Oyq/Pz+/NSubJza7JxyFPzS1Py6vNz+/PwiFKBs'
		 +'yBQM6XeLEgMBADioAOboABISAAAAABZqYND/AEUjAHUCAAAANwAAFh8A7QAA/wBF/wAA/wAA/wAA/6goHxStiHciNgMAdVAAybYAiHMfNgMAdQDgpACv6wAiEgAAAACwAQDoAAASAAAA'
		 +'AABFAAAAAAAAAAAAAAAoAACtAAAiAAAAAAAA5AAA5wAAEgAAAAASAgAAAB8AAAAAAFAc/Lbo6XMSEgMAAABF4wAAYgAAOwAAdXwAiOYAihIfwQAAFggo/gCt/28i/wAA/wccjQDoiAA'
		 +'SNgAAdeouMcdndkVpNnVmdZMARYE0OuPrXGN2AOAhcwKtZVFFcgB1czgAU7YB33MARQMAdQEAbwAAjwAA4wAAY0iMALbnAHMSAAMAAHQnAOY7ABLrAAB2AK8saB87gOvrInZ2AFATALYs'
		 +'gHMcIgNzADEAVB8A6OsAEnYAAAAAEQABAQAAAAAAAEghsLat6HNFEgN1AIBkmufnkxISTAAAdbwRt8IBuEUAtHUAFgBv/gCA/x/j/wBj/wC0UwDn3wASRQAAdVCRSbas2HNFRQN1dQAAa'
		 +'AAAgAAAIgAAAAAAPgEA0gAARgAAdcvYL8K1j0Xn43V2Y8xfAOcsABIcAABzAFB5ALbpAHMSAAMAAAwMAJ6hADtPAHUAAAFkSAAA6QAAEgAAAAIAAX8AAAAAAAAAAGeUkGnn6DUSEjEAAF'
		 +'wMEXShAXJPAGkAAGtgYG/7+20SEnMAAGVNmmzXk1/nTHZ2dTJHp1zBtXPlt3QFFmH+/nT//2n//2P//1zYPmm10m3nRmF2dWdbiGV/gXNIQlx1AADcaPPogBISIgAAACBrAAB/AABIAA'
		 +'B1AACNeQCt6QBFEgB1ANABMfYArYsARQEAdQ4xMwEAjwAw4wAAY0XJMTqIrQA2RQF1dQUuagBncQBpSABmACH5BAEAABIALAAAAAAUABQABwipACUIHEiwoMGDCA1CiFAAQoIBECJKnEg'
		 +'wIoAHACZqjFhxIQCIAQAIgJAxI8eBEQkAUKCSpIKSEjuqtNASgIUJL2OihKBSAYSQIyMASKBT4MajRSU4uMC0qVOnDghekOgUwlOmUqc+tXo1K4QGVr9GrHChwgEDF7yCnboWAoOIFNI'
		 +'OZCqWbdi3TQkuYFshYgMDEBBceItW6oLDiBMrJgjgquMLABJKnkw5IAA7'
		,upd_png : ''
		 +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAIAAACN07NGAAAABnRSTlMA/wD/AP83WBt9AAAAvElEQVR42mP8//8/AxGgMD4QwuhfuJ4Fv9LTsZIQRhSSIA'
		 +'t+DUZhXgzf3zEwMLx5+Oqta/Ps/smmyHrgRsKBcWrm/48PMc1CscfI1wLOZhRUxmU/E5xluvj5uc0niAkPJmQOkdqYGEgHLOgBheQlBgaGc6u2ITiXoqPQ7MHUcHb2dNPFzyFoGZMFd/'
		 +'HSZUwW6PageuaE6eLnBNyGSwV1woBYPZ+17pOgZ8XVFgYGhi+aDy6xHnsevJ+BgQEAPyZCDBBnRMQAAAAASUVORK5CYII='
		,compare_png : ''
		 +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABnRSTlMA/wD/AP83WBt9AAABZ0lEQVR42mP8//8/A7mAiYECQJFmFjT+lWu3jhw7c/7SNQY'
		 +'GBkM9LRsrEx0tNVyaGZH9vHf/se27D5qZ6IcFeTEwMKxat+3UmYuervbOjlbYdf+HgctXbxZXtv3////Xr1+/f//5/fvPr1+/fv78VVzZdvnqzf/YAMLPR46dMTPR//37NxMTEyMjAyMjA'
		 +'xMTExsbq5mJ/pFjZwjYnJZb/f///9+///z58+fXr98/f/5Ck8IE6AHGwsLMwMDAzExiVBnqaa1atw1Txap12wz1tAhotrEyOXXmIqaKU2cu2liZYNXM3NDQAGGJiQozMzFPm73kw8fP2p'
		 +'qEDvnL15z+/5DPj5eQz1NAvGMNZGcPn9l66793m6OLCfaYiefwR7aeMC8JWu73RnObZrS7c6APZ7xpeETbc7ZUxgYGJyzp/R4MJKWMWInn9k7NQfCFlc1xpkxcIGSHf97PBjFVY113BJxB'
		 +'tgQKQwAEBEGm/Ylok4AAAAASUVORK5CYII='
		,plus_png : ''
		 +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABnRSTlMA/wD/AP83WBt9AAAAuUlEQVR42tWUQQrEIAxFfwcv4FpyA69WcNWeoa4KXs0bSHGZ'
		 +'I3QWhSDWQmtnM1klgU98ycdh33f0xgcv4pVYNbve+5SSlEQ0TdNdcUppWRYp53l+MBlAznnbNgDGmB5mZmbmW8wVJwBrreTjOJ751RVnzlnyK3515mTmcubRjzFqrSv+n97ZGNNcb/WWWkx'
		 +'E67pK6ZyTvOwTUUNceujYbYxRZoYQHpgEgNa6x9vC3yOu+EvOMob//Ay+pDJOJ8FoQwQAAAAASUVORK5CYII='
		,fbajax_png : ''
		 +'data:image/gif;base64,R0lGODlhEAALALMMAOXp8a2503CHtOrt9L3G2+Dl7vL0+J6sy4yew1Jvp/T2+e/y9v///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCwAMACwA'
		 +'AAAAEAALAAAEK5DJSau91KxlpObepinKIi2kyaAlq7pnCq9p3NZ0aW/47H4dBjAEwhiPlAgAIfkECQsADAAsAAAAAAQACwAABA9QpCQRmhbflPnu4HdJVAQAIfkECQsADAAsAAAAABAACwA'
		 +'ABDKQySlSEnOGc4JMCJJk0kEQxxeOpImqIsm4KQPG7VnfbEbDvcnPtpINebJNByiTVS6yCAAh+QQJCwAMACwAAAAAEAALAAAEPpDJSaVISVQWzglSgiAJUBSAdBDEEY5JMQyFyrqMSMq03b'
		 +'67WY2x+uVgvGERp4sJfUyYCQUFJjadj3WzuWQiACH5BAkLAAwALAAAAAAQAAsAAAQ9kMlJq73hnGDWMhJQFIB0EMSxKMoiFcNQmKjKugws0+navrEZ49S7AXfDmg+nExIPnU9oVEqmLpXMBo'
		 +'uNAAAh+QQFCwAMACwAAAAAEAALAAAEM5DJSau91KxlpOYSUBTAoiiLZKJSMQzFmjJy+8bnXDMuvO89HIuWs8E+HQYyNAJgntBKBAAh+QQFFAAMACwMAAIABAAHAAAEDNCsJZWaFt+V+ZVUBAA7'
        ,news_png : ''
         +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAIAAAD5fKMWAAAABnRSTlMAAAAAAABupgeRAAAArklEQVR42mNkYGBgYGBob29/9OgRA1'
		 +'4gJyfHAlHHz88/bdo0/KqzsrJYHj16lF/auG/Hmvv37587dw6XUiMjIwYGBhY4X1FRUVFREb/xLMic9knLGRgYKvMiT158jKbOXF+WgYGBiYEUgGJ2ZV4kCarR7B2'
		 +'07ubn52dhYGB4ev+yh4fHhw8fIKLvPn4XFUAxRYif8/79+wwMDIxHjhzZsmXLx48f8buBn5/fw8MDAOiiPC0scvhsAAAAAElFTkSuQmCC'
        ,updates_png : ''
         +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAIAAACNaGH2AAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABg0'
         +'lEQVR42n2SPW4UQRCFX417MXh3JbJ1hIwRxyBCGImjICQHIALOYF+Bi8AduIYdIeT9m5mq9xHMYhLMUwUt9Wu9r6orvv64/Nn/2o61NvvyOnNbtRkzbZepciZVT'
         +'p90j7vduIEgQoGxAgAhIYENAoHX47ob7JQSyjJyTa4ACRQRIaGITkTb2X15MGknpFxQWEIStpBCANA2maM9mgH6cqLRhGQDYGFTxgjaNisVCUN5lIeskcMdJiSQN'
         +'FGpbbKIGOzR9NCDEDaG8p9eNYG1TVnBYKcZjKdQeRrEAYPCKKLtsko2SiOMLXAac18ThqDtXUyIAYXLwgJXyWDbU45ALfd9N2sytiVxSOAAXBaOCEC4HWe3G3fRd'
         +'YojYaZ/G0ZXSaKmd4E9ny3jZn1zu7mV9On7RxBOzNvzi4uX7yYAxTQPnS5P22q+Ws1XklyF3bX24unZ51df9C+1+xNZR0+Oz5fPr95c6wH9dc8WJ2eLZ1evrxePF'
         +'g+5D+sCvP/24a6/47/6DW1k0UQglGH2AAAAAElFTkSuQmCC'
        ,choose_gif : ''
		 +'data:image/gif;base64,R0lGODlhTwAWAOZsAC0tLSYmJisrKyoqKu7u7ubm5unp6fT09CgoKCcnJ+Pj46mpqUNDQ1VVVfb29vLy8vz8/O3t7fj4+OLi4vr6+jU1Nezs7Pv7+'
		 +'2FhYYODg/Hx8cHBwd7e3jQ0NMXFxTw8PP7+/kRERIyMjDIyMmBgYHx8fOvr642NjVFRUYSEhEhISDExMUdHR9TU1PDw8MbGxl5eXo6OjiUlJTY2NnJycqqqqoGBgUJCQiQkJH19fZ'
		 +'CQkE9PT4qKiltbW4mJibe3t1lZWZycnFxcXGlpad/f30tLS0lJST4+PkVFRaurqzAwMJqamlRUVEpKSiMjI4CAgJ2dnX9/f6enp19fX0FBQXBwcEZGRlZWVjg4OD09PcnJyWZmZvX1'
		 +'9Zubm4+Pj1dXV35+foKCglhYWDMzM7i4uHNzcywsLG1tbSkpKeXl5f///y4uLv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
		 +'AACH5BAEAAGwALAAAAABPABYAAAf/gGyCgxcHBAYFaYqLjI2Oj5CRkooFBgQHF4OagxAPBpOgoaKjBg8Qm4ISEWkFlxRqsLGys7S1tre4sSAUhokREpsSJmkWDhsZDRVoy8zNzs/Q0d'
		 +'LTyxUNGRsOFmkmwIIQqwQcKR0zKkJDZ+rr7O3u7/Dx8mdDPSxHPhwEaRGnbA/EONBQsgNIkw8j1ihcyLChw4cQI0pUOOKDkRAliGx7wOYCIgcplKAosmKiyZMoT674cMJBpUJpCGzo'
		 +'sKNIwzAaYCkQoEYFgJQTdcCKUcNMz59A13TYsM9QmgMZZgApuVCMGjABsqJRg2RA0ogKqgRIgIZn169mMhyI+YlCAxVN/xpCWSAjAJoBPD2oaSHgiwI1ChoASAKraBlYT8zYgEXDjEKh'
		 +'aniIWMCTAZO/QcwgnQigAYU0iNKAqCDkQ8MkIgIIWKhGyhg1Ich0CbDEAxMNIRhowFBjwVgsu0m0QPMTwAQYOCZvZfDiRAcNMxyfrACCVaLRWxIynItA+ho1VGSouTEBQwAME3J4GOuh'
		 +'RAgP5VnIUq3weIATCxKoYTAh1hSv01VXSRpu9aDdQleokcNqCo2HwHg/LIFAEC+g4AIDVmhAAlkieICGBjA4gQN9ayhAAgIx5LffDzyIGMAAm0XU2WeWPJUBC6YxBEAULuhU2XIo9DcB'
		 +'CgEsAAtdL8BSQuwCGPSoRncKmYiiigyE0AIsGDyhgGJb2rBljGmtdUlMGxxhhENmIJCVXWgggBcCy6x5VwJZJTAAGlkhIACeAUC5hgBumsEMnAPQ6eYAeAmQ6ADeKcXUUx4V4IAPIVDF'
		 +'kBmK4mWGZgBwqqgAAHSKqGafeooXUp2G2ummoZbK6quaLWRGCi4ZkAlAFnBQQo5f9eormjRwsNE34RBxQhZrxPjrsiZ12kEK+vDjDxvCEOOAFl4kQ8223HYLjTXYaMONN4OowgoBXLySy'
		 +'7rstlvLLr3wQ64mnXwyyr343lvKtKh0ZEho+QYccCWXZLJJIAA7'
        ,twbutton_gif : ""
         +"data:image/gif;base64,R0lGODlhCgBYAsQfAPPz8+vr6/7+/uHh4fn5+eXl5d7e3vv7++jn6Ofo5/j4+Ojo6d/g4Ofn59/g3+Pk5OPj4/f29vv7+vz7/ODf3/"
		 +"Dw8Pb29vv8+/z8/ODf4O/v7+fn5unp6N/f3+Dg4P///yH5BAEAAB8ALAAAAAAKAFgCAAX/oCCOZGmeIqau7OG6UiwdRG3fSqTs/G79wCDAMiwSiYCkUllpOp+aqHQ"
		 +"a0FSvVmtgy+VyvoEvZxFeIBKLRQK93rg3hbf7UaAX6vQHZM/vD/6AgR6DhIUdBgaHHYuLiI6PkJEfk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2"
		 +"t7i5uru8vb6/wMHCw8TFxsfIycrLwijOz9DRLNMYEy8u1jAy2zM33gQ94TkR5OQW5UHpQElH7Evv8O9P8xVT9VL3U/pXW1ld/wABihko5kyDBAgaIFCTYEMDOQ7d3"
		 +"JlIEY+eBxgx9tm4J5DHAR4+hvSQoQMFDwwKzzFgtIiCA0aPDiGSGammJGY4c+rcybOnz59AgwodSrSo0aNIkypdyrRps2hQo0otoUIANRUTLhyYgOHAha4utIa9NkM"
		 +"GjAMxvEnAocBGW3A94O7QMW6ujwg/8ALRq+6HEXd+4wkeXGEJvcOH9SleLAWL44CQIwskGOZLmgVj0mQ+eDDhmYQNHoZ2M/oOHNMVU9/JmBGCRo4b//AZMPujx5CCc"
		 +"IMktLsDgwwOUHro4GAly+OJaM60yfyR0+fQo0ufTr269evYs2vfzr2791IhAAA7"
        ,loading_gif : ""
         +"data:image/gif;base64,R0lGODlhCwALALMIAEdHRyQkJGtra7Kyso+Pj9bW1gAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEA"
		 +"AAAh+QQFAAAIACwAAAAACwALAAAEJBBJaeYMs8pz6bYIVnFgKQEoMBVsYZoCQiADGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJGeYEs0pz6bYIVnFgKQm"
		 +"oMB3sYZoEMiAFGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJCeYUs8pw6bYIVnFgKREoMRmsYZoDUiAHGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAA"
		 +"AEJBBJKeYks0pw6bYIVnFgKQ3oMAVsYJoFciAGGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJSeYcs0px6bYIVnFgKRVoMQEsYJoHYiABGMtSLd14Xs6WCA"
		 +"Ah+QQFAAAIACwAAAAACwALAAAEJBBJOeYss0py6bYIVnFgKR3oMQmsYJoGEiAAGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJWeY8s8px6bYIVnFgKRmoMRE"
		 +"sYZoBAiACGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJeeY0s8py6bYIVnFgKQVoMA3sYJoAIiAEGMtSLd14Xs6WCAA7"		 
	   }
	break; 
  }
}

function getCSS() {
  var css = 
    '#vB_Editor_001 *:focus { outline: 0; }'
    +'#uparent_container{ position: relative;width:680px; }'
    +'label.cabinet{ cursor:default !important;overflow:hidden;display:block;float:left;'
	 +(!gvar.isOpera ? 'width:79px; height:22px;background: url('+gvar.B.choose_gif+') 0 0 no-repeat;' : '')
	+'}'
	+'label.cabinet input.file{position: relative;height:100%;width:auto;z-index:9!important;'
	+(gvar.isOpera ? 'filter:alpha(opacity=70); opacity:0.7;-moz-opacity:0.7; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";' : 'filter:alpha(opacity=0); opacity:0;-moz-opacity:0; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";')
	+'}'
	
	+'input.greenButton{width:auto;margin:0 0 0 15px; padding:2px 4px 2px 4px;color:white; background-color:#589d39; outline:none;border:1px solid #006600; border-radius: 8px; -moz-border-radius: 8px;-khtml-border-radius: 8px;-webkit-border-radius:8px;float:left;}'
	+'input.greenButton:active{background-color:#006600;padding:3px 3px 2px 5px;border:1px solid #007575;}'
	
	+'.judul_smiley:hover{color:#FF4400;}'
	+'#target_upload {width:100%;height:120px;border: 2px outset;clear:left;display:block;}'
	+'#toogler {float:right;z-index:9 !important;}'
	
	+'#skecil_container, #sbesar_container, #scustom_container, #mysmiley_container{white-space:inherit; width:auto;}'
	+'#sbesar_container, #scustom_container, #mysmiley_container{color:#C5C5C5;}'
	+'.mytitle, .no_smile{color:#5F5F5F;}'
	+'#mysmiley_container h1, #mysmiley_container h2,#mysmiley_container p {padding:0;margin:0;}'	
	
	+'.smilekecil, .smilebesar, .addremove {margin:5px 0 10px 0;}'
	+'.smilekecil img, .bbc_big {margin:1px 0.7px;border:1px solid transparent;cursor:default}'
	+'.bbc_big {color:#0B1379;padding:0.8px 3px;white-space:nowrap;}'
	+'.smilekecil img:hover, .smilebesar .bbc_big:hover, .addremove .bbc_big:hover, #nfo_version:hover {color:#000;border:1px solid #2085C1;background-color:#B0DAF2;}'
	+'.smilebesar {text-align:justify;}'
    +'.prev_cont{clear:both;margin:0;padding:.5em 0;}'
    +'#kerp_preview{position:absolute;border:1px solid #2085C1;background-color:#B0DAF2; opacity:0.75; filter:alpha(opacity=75); -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)";padding:5px;color:#fff;}'
	+'#addrem_container p {margin-top:10px !important;}'
	+'.imgtitle {background-color:#000064;color:#fff;}'
	+'.rowcontainer {padding:.3px;clear:left;}'
	+'.rowcontainer input{margin-right:2px;}'
	+'.texts{float:left;width:80px;font-size:12px;}'
	+'.imglink {width:130px;}'
	+'.hapus:hover {text-decoration:none !important;}'
	+'.hapus {cursor:pointer;display:inline-block !important;background: url("'+gvar.B.dead_png+'") no-repeat scroll 100% 50%;padding-right:17px;}'
	+'.hapus_midlenes {margin:3px 0 0 -5px;}'
	+'#vB_Editor_001_cmd_wrap0_spoiler {background:#00006A;border:1px solid #0000A6;border-radius:9px 9px;-moz-border-radius:9px 9px;-khtml-border-radius:9px 9px; -webkit-border-radius:9px 9px; margin:1px 5px;width:100px;height:17px;text-align:center;}'
	+'#vB_Editor_001_cmd_wrap0_addcontroller {background:transparent;padding:0 3px;margin:0 10px;width:100%;}'
	+'#upd_container {border:1px solid #D99509;background:#FCE8BC;width:300px;height:22px;text-align:left;float:right;padding:0 10px 2px 10px;font-size:11px;}'
	
    +'.txta_counter, .txta_counter_red{width:120px;text-align:right;font-weight:bold;padding:1px 5px;border:1px solid #CDCDCD;}'
    +'.txta_counter{background:#DFC;color:#3A3A3A;}'
	+'.txta_counter_red{background:#FB0000;color:#FFF;}'	
    +'.textarea{width:100%;height:100px;font-family:monospace,Courier;font-size:11px;}'

    /* for updates */
    +'.qbutton:hover{background-color:#DDDDDD;}'
    +'.qbutton{padding:1px 3px;border:1px solid #1E67C1;background-color:#C7C7C7;color:#000;text-decoration:none;border-radius:3px;border-radius:3px; -moz-border-radius:3px; -khtml-border-radius:3px; -webkit-border-radius:3px;}'

    +'.qrdialog{border-bottom:1px transparent;width:100%;left:0px;bottom:0px;padding:3px;}'
    +'.qrdialog-close{padding:5px;margin:5px 15px 0 0;cursor:pointer;float:right;}'
    +'.qrdialog-child'
    +'{background:#BFFFBF; border:1px solid #9F9F9F; height:30px;width:400px;margin-left:3px;padding:.2em .5em;font-size:8pt;border-radius:5px;border-radius:5px;-moz-border-radius:5px;-khtml-border-radius:5px;-webkit-border-radius:5px; box-shadow:3px 3px 15px #888;-moz-box-shadow:3px 3px 15px #888;-khtml-box-shadow:3px 3px 15px #888;-webkit-box-shadow:3px 3px 15px #888;}'
	
	  /* for uploader */ 
    +'label.cabinet{display:inline-block;padding-top:3px}'
    +'#uparent_container{position:relative;padding:1px 0 6px 3px;width:99%;}'
    +'#target_upload{margin-top:2px;width:100%;height:318px;border: 2px outset;clear:left;display:block;}'
	+'#sel_host{border:1px solid #BBC7CE;background-color:#C4C4C4;padding:3px;text-decoration:none;border-bottom:0;font-size:8pt;outline:none}'
    +'#sel_host:hover{background-color:#B0DAF2;}'

	
	+'.lilbutton{padding:1px 5px; 2px 5px!important;text-shadow:none;}'
	/* twitter's button */
    +'.twbtn{background:#ddd url("'+gvar.B.twbutton_gif+'") repeat-x 0 0;font:11px/14px "Lucida Grande",sans-serif;width:auto;margin:0;overflow:visible;padding:0;border-width:1px;border-style:solid;border-color:#999;border-bottom-color:#888; border-radius:4px; -moz-border-radius:4px; -khtml-border-radius:4px;-webkit-border-radius:4px;color:#333;text-shadow:1px 1px 0 #B1B1B1;cursor:pointer;} .twbtn::-moz-focus-inner{padding:0;border:0;}.twbtn:hover,.twbtn:focus,button.twbtn:hover,button.twbtn:focus{border-color:#999 #999 #888;background-position:0 -6px;color:#000;text-decoration:none;} .twbtn-m{background-position:0 -200px;font-size:12px;font-weight:bold;line-height:10px!important;padding:5px 8px; border-radius:5px; -moz-border-radius:5px; -khtml-border-radius:5px; -webkit-border-radius:5px; margin:-4px 0 -3px 0;} a.twbtn{text-decoration:none;} .twbtn-primary{border-color:#3B3B3B;font-weight:bold;color:#F0F000;background:#21759B;} .twbtn:active,.twbtn:focus,button.twbtn:active{background-image:none!important;text-shadow:none!important;outline:none!important;}.twbtn-disabled{opacity:.6;filter:alpha(opacity=60);background-image:none;cursor:default!important;}'

	+'';

  return css;
}
// end getCSS


// kaskus uploader Area
// =====================
// global var for uploader
var UPL = {
  uploader:{}
 ,parent:''
 ,init_uploader:function(tgId){
    var tgt=(typeof(fldset_upload)=='string' ? $D('#'+tgId) : tgId);
    UPL.parent=tgId;
	//if(tgt.innerHTML!='') return;
    UPL.prop=gvar.uploader;
    if( isDefined(gvar.iframeLoaded) )
       delete(gvar.iframeLoaded);	   

    // create form DOM upload
    UPL.attach_form();
    
    //tgt.innerHTML = rSRC.getTPL_inerUploader();
    tgt.innerHTML = get_tpl();
    UPL.event_uploader();
  }
 ,panic_stop: function(){
    if(window.stop !== undefined){window.stop();}
    else if(document.execCommand !== undefined){document.execCommand("Stop", false);}
  }
 ,cold_boot: function(){
    var tgt=$D('#'+UPL.parent);
    if($D('#'+UPL.parent)) $D('#'+UPL.parent).innerHTML='';
    if($D('#frmPageAction')) Dom.remove($D('#frmPageAction'));    
    window.setTimeout(function(){UPL.init_uploader(UPL.parent)},50);
  }
 ,cancel_upload: function(){
    UPL.panic_stop();
    window.setTimeout(function(){UPL.reset_onloadIframe()},50);    
  }
 ,reset_onloadIframe: function(){
    var g=function(i){return $D(i)},el=g("btn_upload");
    if(el){el.value="Upload"; el.removeAttribute("disabled")}
    el=g("userfile");if(el)el.style.display="inline";
    
    el=g("fld_title");if(el)el.innerHTML="Upload Images";
    el=g("par_sel_host");if(el)el.style.display="inline-block";
    el=g("cancel_upload");if(el)el.style.display="none";
  }
 ,event_uploader: function(){
    var Attr,el,el2,src,par = $D('#upload_container'), allow_cross=isUndefined(UPL.prop[gvar.upload_tipe]['noCross']);
    if(par){ // create additional nodes
      // select host
      el=UPL.rebuild_selectHost();
      Dom.add(el,par);	  

	  // is this host allow cross-site in submit?
      if( allow_cross ) {

        Attr={id:'label_file','class':'cabinet'}; el=mycreateElement('label',Attr);
        Attr={id:'userfile',name:UPL.prop[gvar.upload_tipe]['ifile'],'class':'file',type:'file'};
        el2=mycreateElement('input',Attr);
        on('change',el2,function(e){
          e=e.target||e;
          if($D("#legend_subtitle")) $D("#legend_subtitle").innerHTML= ' '+HtmlUnicodeDecode('&#8592;') + ' ' + basename(e.value);
        });
        Dom.add(el2,el); Dom.add(el,par);
        Attr={id:'btn_upload',value:'Upload','class':'twbtn twbtn-m',type:'button',title:'Upload now ..',style:'display:inline;margin:1px 0 0 10px;'};
        el=mycreateElement('input',Attr);
        on('click',el,function(){UPL.prep_upload()});
        Dom.add(el,par);
        
        Attr={id:'cancel_upload',value:'Cancel','class':'twbtn twbtn-m',type:'button',style:'margin:1px 0 0 20px;display:none;'}
        el=mycreateElement('input',Attr);
        on('click',el,function(){UPL.cancel_upload()});
        Dom.add(el,par);
      }
      
      Attr={style:'margin-top:5px;font-weight:bold;font-size:10px;'+(allow_cross ? 'float:right;':'display:inline-block')}; el=mycreateElement('div',Attr);
      Attr={href:'javascript:;','class':'twbtn twbtn-m','onclick':'this.blur()',style:''}; el2=mycreateElement('a',Attr,'','Toogle IFrame');
      on('click',el2,function(){return UPL.toogle_iframe()});
      Dom.add(el2,el); Dom.add(el,par);
	  
	  if(!allow_cross){
	    Attr={'class':'g_notice-error qrsmallfont',style:'width:60%; display:inline; position:absolute;margin:-3px 0  0 10px;'};
        el=mycreateElement('div',Attr,'','Sorry, this site is not allowing cross-domain submission, click <b>Toggle IFrame</b> to load it then do things inside the iframe');
        Dom.add(el,par);
	  }
      
      Attr={style:'margin-top:10px;display:none;',src:'about:blank',name:'target_upload',scrolling:'auto',id:'target_upload'};
      el=mycreateElement('iframe',Attr);
      on('load',el,function(){UPL.reset_onloadIframe()});
      Dom.add(el,par);
    }
  }
 ,do_postBack: function(name, url){
    var Attr,el,frmAct=$D('frmPageAction');
    var hdEl=UPL.getNativeId('hid_cont',frmAct,'input'),fn,gg=HtmlUnicodeDecode('&#187;');
    var inputElm=UPL.getNativeId(name,frmAct,'input'),host=UPL.prop[gvar.upload_tipe]['src'];
    if(typeof(inputElm)=='object')
        Dom.remove(inputElm);
    inputElm = $D(name);
    fn=basename(inputElm.value);
    Dom.add(inputElm,frmAct);
    
    if(typeof(hdEl)=='object')
       Dom.remove(hdEl);
    hdEl = UPL.rebuild_hidden();
    Dom.add(hdEl,frmAct);    
    
    // recreate new input file for the original place
    Dom.add(inputElm.cloneNode(true), $D('#label_file'));  
    if(url==null)
       url='http://'+UPL.prop[gvar.upload_tipe]['post'];
    
    frmAct.action = url;
    frmAct.submit();
    
    el=$D('#cancel_upload');
    if(el) el.style.display='inline';
    el=$D('#par_sel_host');
    if(el) el.style.display='none';    
    el=$D('#btn_upload');
    if(el){
        el.disabled='disabled';
      el.value='Uploading ..';
      el.blur();
    }
    el=$D('#fld_title');
    if(el) el.innerHTML='Uploading '+gg+($D("userfile")?' ['+fn+']':'')+' '+gg+' '+host.substring(0,(host.indexOf('/')!=-1 ? host.indexOf('/'):host.length));
    
    Dom.remove(inputElm);
    
    UPL.rebuild_inputfile();
    el=$D('#userfile');
    el.style.display='none';    
  }
 ,check_submitform: function(){
    var file_id='userfile', par=$D('frmPageAction'), inputElm = (par ? UPL.getNativeId(file_id,par,'input') : null);
    if(inputElm && typeof(inputElm)=='object')
       Dom.remove(inputElm);
    else
       inputElm = $D(file_id);    
    var allowed_ext = ['jpg','jpeg','gif','png','zip','rar'], fn=inputElm.value;
    var ext = fn.substr(fn.lastIndexOf('.') + 1).toLowerCase();
    //clog(allowed_ext +'; '+ext);
    var pos=inArray(allowed_ext,ext);
    if( pos !== false ){
       UPL.toogle_iframe( 1 );
    }else{
       alert(fn=='' ? 'Belum memilih file':'forbidden file format');
    }
    return pos;
  }
 ,prep_upload: function(){
   if( UPL.check_submitform()!==false ){
    $D("legend_subtitle").innerHTML='';
    UPL.do_postBack("userfile");
   }
 }
 ,toogle_iframe: function(visb){
    var ifrm=$D("#target_upload"),src=UPL.prop[gvar.upload_tipe]['src'].replace(/\/\?no_multi.+/i,'');
    if(isUndefined(visb)) visb = (ifrm.style.display=="none");
    if(!gvar.iframeLoaded){
        ifrm.src='http://'+src;
        gvar.iframeLoaded=true;
    }
    ifrm.style.display=(visb ? "" : "none");
  }
 ,getNativeId: function(id,par,typEl){
    if(isUndefined(par)) return;
    var node=(isUndefined(typEl) ? '*':typEl),els=getTag(node,par);
    if(els.length==0) return false;
    for(var i=0; i<els.length;i++)
      if(els[i].id==id){return els[i];break}    
  }
 ,rebuild_inputfile: function(){
    var Attr,el,par=$D('#label_file'),tgt=getTag('input',par);
    if(tgt.length>0){
      el=tgt[0]; Dom.remove(tgt[0]);
      Attr={id:'userfile',name:UPL.prop[gvar.upload_tipe]['ifile'],'class':'file',type:'file'};
      el=mycreateElement('input',Attr);
      on('change',el,function(e){
        e=e.target||e;
        if($D("#legend_subtitle")) $D("#legend_subtitle").innerHTML= ' '+HtmlUnicodeDecode('&#8592;') + ' ' + basename(e.value);
      });
      Dom.add(el,par);
    }
  }
 ,rebuild_selectHost: function(els){
    
    var Attr,iner,el,sel=mycreateElement('select',{id:'sel_host',title:'Image Host',style:'font-weight:bold;color:#0000FF'});
    var ret=mycreateElement('div',{id:'par_sel_host',style:'display:inline-block;float:left;margin-right:5px;border:1px solid #BBC7CE;padding-left:3px;',});
    el=mycreateElement('div',{style:'float:left;font-weight:bold;margin-top:4px;color:#0000FF'},'','<a id="host_link" href="http://'+UPL.prop[gvar.upload_tipe]['src'].replace(/\?no_multi.+/i,'')+'">Host</a> :&nbsp;');
    Dom.add(el,ret);
    on('change',sel,function(e){
      e=e.target||e;
      var hl = $D('#host_link'),href=e.options[e.selectedIndex].value;
        if(hl) hl.setAttribute('href','http://'+href);
      var sels = gvar.upload_sel;
      if(sels) for(var tipe in sels){
        if(!isString(sels[tipe])) continue;
        if(href.indexOf(sels[tipe])!=-1){
          gvar.upload_tipe=tipe;
		  setValue(KS+'LAST_UPLOADER', tipe);
          UPL.cold_boot();
          break;
        }
      }
    });
    // build selects node
    if(isUndefined(els)) els = gvar.upload_sel;
    if(els) for(var tipe in els){
      if(!isString(els[tipe])) continue;
      Attr={value:els[tipe],name:tipe};
      if(gvar.upload_tipe==tipe) Attr.selected='selected';
      iner=els[tipe].toString(); 
      iner=iner.substring(0,(iner.indexOf('/')!=-1 ? iner.indexOf('/'):iner.length));
      el=mycreateElement('option',Attr,'',iner);
      Dom.add(el,sel);
    }
    Dom.add(sel,ret);
    return ret;
  }
 ,rebuild_hidden: function(els){
    if(isUndefined(els))
      els = UPL.prop[gvar.upload_tipe]['hids'];
    var Attr,el,ret=mycreateElement('div',{id:'hid_cont'});
    if(els) for(var nm in els){
      if(!isString(els[nm])) continue;
      Attr={type:'hidden',name:nm,value:els[nm]};
      el=mycreateElement('input', Attr);
      Dom.add(el,ret);
    }
    return ret;
  }
 ,attach_form: function(){
    var el,dv,frm,Attr={enctype:'multipart/form-data',action:'',target:'target_upload',method:'post',id:'frmPageAction',name:'frmPageAction'};
    frm = mycreateElement('form', Attr);    
    el = UPL.rebuild_hidden();
    Attr={type:'submit',id:'fake_submit_btn',value:'',style:'border:0;background:transparent;position:absolute;left:-100000;top:-9999;visibility:hidden'};
    el=mycreateElement('input', Attr); Dom.add(el,frm); 
    Dom.add(frm,getTag('body')[0]);    
  }
};
//end UPL
// uploader TPL
function get_tpl(){
return(''
+'<fieldset class="fieldset" style="margin-top:6px;">'
+'<legend><span id="fld_title">Upload Images</span><span style="font-weight:bold;" id="legend_subtitle">&nbsp;</span></legend>'
+'<div id="uparent_container">'
  +'<div id="upload_container"></div>'
+'</div>' // #uparent_container
+'</fieldset>'
);
}
// /End kaskus uploader Area
// =====================


// Smiley Resource
// =======================
function getSmilieSets(){
  var http = 'http://';
  var uks = gvar.dmUploader;
  var H = gvar.domainstatic + 'images/smilies/';
  var s = 'sumbangan/';
  
  gvar.smiliekecil = [
  
 [H+'add-friend-kecil.gif', ':addfriends', 'Add Friends (S)']
,[H+'berbusa-kecil.gif', ':berbusas', 'Berbusa (S)']
,[H+'army-kecil.gif', ':armys', 'Army (S)']
,[H+'bookmark-kecil.gif', ':bookmarks', 'Bookmark (S)']
,[H+'shutup-kecil.gif', ':shutups', 'Shutup (S)']
 
,[H+'ngakaks.gif', ':ngakaks', 'Ngakak (S)']
,[H+'mahos.gif', ':mahos', 'Maho (S)']
,[H+'s_sm_cendol.gif', ':cendolb', 'Blue Guy Cendol (S)']
,[H+'s_sm_batamerah.gif', ':bata', 'Blue Guy Bata (S)']
,[H+'cendols.gif', ':cendols', 'Cendol (S)']
,[H+'takuts.gif', ':takuts', 'Takut (S)']
 
,[H+'batas.gif', ':batas', 'Bata (S)']
,[H+'s_sm_smile.gif', ':)bs', 'Blue Guy Smile (S)']
,[H+'s_sm_peace.gif', ':Yb', 'Blue Guy Peace']
,[H+'iloveindonesias.gif', ':iloveindonesias', 'I Love Indonesia (S)']
,[H+'cekpms.gif', ':cekpms', 'Cek PM (S)']
,[H+'berdukas.gif', ':berdukas', 'Berduka (S)']
,[H+'capedes.gif', ':capedes', 'Cape d... (S)']
,[H+'bingungs.gif', ':bingungs', 'Bingung (S)']
 
,[H+'malus.gif', ':malus', 'Malu (S)']
,[H+'iluvkaskuss.gif', ':ilovekaskuss', 'I Love Kaskus (S)']
,[H+'kisss.gif', ':kisss', 'Kiss (S)']
,[H+'mads.gif', ':mads', 'Mad (S)']
,[H+'sundulgans.gif', ':sundulgans', 'Sundul Gan (S)']
,[H+'najiss.gif', ':najiss', 'Najis (S)']
,[H+'hammers.gif', ':hammers', 'Hammer (S)']
,[H+'reposts.gif', ':reposts', 'Repost (S)']
,[H+s+'004.gif', ':matabelo:', 'Belo']
,[H+s+'q11.gif', ':nohope:', 'Nohope']
,[H+s+'8.gif', ':hammer:', 'Hammer']
,[H+s+'24.gif', ':army:', 'army']
,[H+s+'005.gif', ':Peace:', 'Peace']
,[H+s+'12.gif', ':mad:', 'Mad']
 
,[H+s+'fuck-8.gif', ':fuck3:', 'fuck3']
,[H+s+'fuck-6.gif', ':fuck2:', 'fuck2']
,[H+s+'fuck-4.gif', ':fuck:', 'fuck']
 
,[H+s+'7.gif', ':confused:', 'Confused']
,[H+s+'34.gif', ':rose:', 'rose']
,[H+s+'35.gif', ':norose:', 'norose']
,[H+s+'017.gif', ':angel:', 'angel']
,[H+s+'3.gif', ':kagets:', 'Kagets']
,[H+s+'4.gif', ':eek:', 'EEK!']
,[H+s+'014.gif', ':kissing:', 'kisssing']
,[H+s+'q03.gif', ':genit:', 'Genit']
 
,[H+s+'001.gif', ':wowcantik', 'Wowcantik']
,[H+s+'amazed.gif', ':amazed:', 'Amazed']
,[H+s+'vana-bum-vanaweb-dot-com.gif', ':bikini:', 'Bikini']
,[H+s+'crazy.gif', ':gila:', 'Gila']
,[H+s+'shit-3.gif', ':tai:', 'Tai']
,[H+s+'5.gif', ':shutup:', 'Shutup']
,[H+s+'q20.gif', ':berbusa:', 'Busa']
,[H+s+'49.gif', ':shakehand', 'shakehand']
,[H+s+'48.gif', ':thumbdown', 'thumbdown']
,[H+s+'47.gif', ':thumbup:', 'thumbsup']
,[H+s+'020.gif', ':siul:', 'siul']
,[H+s+'1.gif', ':malu:', 'Malu']
,[H+s+'14.gif', ':D', 'Big Grin']
,[H+s+'15.gif', ':)', 'Smilie']
,[H+s+'06.gif', ':(', 'Frown']
 
,[H+'ngacir.gif', ':ngacir:', 'Ngacir']
,[H+s + '26.gif', ':linux2:', 'linux2']
,[H+'bolakbalik.gif', ':bingung:', 'Bingung']
,[H+'tabrakan.gif', ':tabrakan:', 'Ngacir Tubrukan']
 
,[H+s+'q17.gif', ':metal:', 'Metal']
,[H+s+'05.gif', ':cool:', 'Cool']
,[H+s+'hi.gif', ':hi:', 'Hi']
,[H+s+'6.gif', ':p', 'Stick Out Tongue']
,[H+s+'13.gif', ';)', 'Wink']
 
,[H+s+'01.gif', ':rolleyes:', 'Roll Eyes (Sarcastic)']
,[H+s+'18.gif', ':doctor:', 'doctor']
 
,[H+s+'006.gif', ':think:', 'Thinking']
,[H+s+'07.gif', ':o', 'Embarrassment']
,[H+s+'36.gif', ':kissmouth', 'kiss']
,[H+s+'37.gif', ':heart:', 'heart']
,[H+s+'e03.gif', ':flower:', 'flower']
,[H+s+'e02.gif', ':rainbow:', 'rainbow']
,[H+s+'008.gif', ':sun:', 'Matahari']
,[H+s+'007.gif', ':moon:', 'Moon']
,[H+s+'40.gif', ':present:', 'present']
 
,[H+s+'41.gif', ':Phone:', 'phone']
,[H+s+'42.gif', ':clock:', 'clock']
,[H+s+'44.gif', ':tv:', 'televisi']
,[H+s+'39.gif', ':table:', 'table']
,[H+s+'32.gif', ':ricebowl:', 'ricebowl']
,[H+s+'rice.gif', ':Onigiri:', 'Onigiri']
,[H+s+'31.gif', ':coffee:', 'coffee']
,[H+s+'33.gif', ':medicine:', 'medicine']
,[H+s+'43.gif', ':email:', 'mail']
 
,[H+s+'paw.gif', ':Paws:', 'Paw']
,[H+s+'29.gif', ':anjing:', 'anjing']
,[H+s+'woof.gif', ':buldog:', 'Buldog']
,[H+s+'28.gif', ':kucing:', 'kucing']
,[H+s+'frog.gif', ':frog:', 'frog']
,[H+s+'27.gif', ':babi:', 'babi']
,[H+s+'52.gif', ':exclamati', 'exclamation']
 
,[H+s+'smiley_beer.gif', ':beer:', 'Angkat Beer']
,[H+s+'kribo.gif', ':afro:', 'afro']
,[H+'smileyfm329wj.gif', ':fm:', 'Forum Music']
,[H+s+'kaskuslove.gif', ':ck', 'Kaskus Lovers']

  ];

  gvar.smiliebesar = [
  
 [H+s+'smiley_beer.gif', ':beer:', 'Angkat Beer']
,[H+s+'kribo.gif', ':afro:', 'afro']
,[H+'smileyfm329wj.gif', ':fm:', 'Forum Music']
,[H+s+'kaskuslove.gif', ':ck', 'Kaskus Lovers']
,[H+'s_sm_ilovekaskus.gif', ':ilovekaskus', 'I Love Kaskus']

  /* New Big Smilies */
,[H+'I-Luv-Indonesia.gif', ':iloveindonesia', 'I Love Indonesia']

,[H+'najis.gif', ':najis', 'Najis']
,[H+'s_sm_maho.gif', ':maho', 'Maho']
,[H+'hoax.gif', ':hoax', 'Hoax']
,[H+'marah.gif', ':marah', 'Marah']
,[H+'nosara.gif', ':nosara', 'No Sara Please']
,[H+'berduka.gif', ':berduka', 'Turut Berduka']

,[H+'sorry.gif', ':sorry', 'Sorry']
,[H+'capede.gif', ':cd', 'Cape d...']
,[H+'nohope.gif', ':nohope', 'No Hope']
,[H+'bingung.gif', ':bingung', 'Bingung']
,[H+'malu.gif', ':malu', 'Malu']

,[H+'hammer.gif', ':hammer', 'Hammer2']
,[H+'dp.gif', ':dp', 'DP']
,[H+'takut.gif', ':takut', 'Takut']
,[H+'salah_kamar.gif', ':salahkamar', 'Salah Kamar']

,[H+'s_big_batamerah.gif', ':batabig', 'Blue Guy Bata (L)']
,[H+'s_big_cendol.gif', ':cendolbig', 'Blue Guy Cendol (L)']
,[H+'toastcendol.gif', ':toast', 'Toast']
,[H+'s_sm_repost1.gif', ':repost', 'Blue Repost']

,[H+'s_sm_repost2.gif', ':repost2', 'Purple Repost']
,[H+'matabelo1.gif', ':matabelo', 'Matabelo']
,[H+'shakehand2.gif', ':shakehand2', 'Shakehand2']

,[H+'mewek.gif', ':mewek', 'Mewek']
,[H+'sundul.gif', ':sup2:', 'Sundul']
,[H+'ngakak.gif', ':ngakak', 'Ngakak']

,[H+'recseller.gif', ':recsel', 'Recommended Seller']
,[H+'jempol2.gif', ':2thumbup', '2 Jempol']
,[H+'jempol1.gif', ':thumbup', 'Jempol']
,[H+'selamat.gif', ':selamat', 'Selamat']

,[H+'ultah.gif', ':ultah', 'Ultah']
,[H+'rate5.gif', ':rate5', 'Rate 5 Star']
,[H+'request.gif', ':request', 'Request']
,[H+'cekpm.gif', ':cekpm', 'Cek PM']
,[H+'cystg.gif', ':cystg', 'cystg']

,[H+'ngacir2.gif', ':ngacir2', 'Ngacir2']
,[H+'ngacir3.gif', ':ngacir', 'Ngacir']
,[H+'babyboy.gif', ':babyboy', 'Baby Boy']
,[H+'babyboy1.gif', ':babyboy1', 'Baby Boy 1']
,[H+'babygirl.gif', ':babygirl', 'Baby Girl']
,[H+'kaskus_radio.gif', ':kr', 'Kaskus Radio']
,[H+'hotnews.gif', ':hn', 'Hot News']
,[H+'games.gif', ':games', 'Games']
,[H+'traveller.gif', ':travel', 'Traveller']

,[H+'kimpoi.gif', ':kimpoi', 'Kimpoi']
,[H+'cewek.gif', ':kiss', 'Kiss']
,[H+'peluk.gif', ':peluk', 'Peluk']
,[H+'cool2.gif', ':cool', 'Cool']
,[H+'bola.gif', ':bola', 'Bola']

 // -- OLD ---
,[H+'fd_1.gif', ':jrb:', 'Jangan ribut disini']
,[H+'fd_6.gif', ':kts:', 'Kemana TSnya?']
,[H+'fd_5.gif', ':sup:', 'Sundul Up']
,[H+'fd_4.gif', ':kbgt:', 'Kaskus Banget']
,[H+'fd_8.gif', ':kacau:', 'Thread Kacau']
,[H+'fd_3.gif', ':bigo:', 'Bukan IGO']
,[H+'fd_7.gif', ':repost:', 'Repost']
,[H+'fd_2.gif', ':cd:', 'Cape deeehh']

  ];
  
  gvar.smiliecustom = {
 '11001': [http+'img.kaskus.co.id/images/kaskusmobile_bb.gif', 'right', 'kaskusmobile_bb']
,'11002': [http+'img.kaskus.co.id/images/kaskusmobile_hp.gif', 'right', 'kaskusmobile_hp']
  };
 
}
// end getSmilieSets

// =======================
// my recent use - routine

function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return x.replace(/^\s+|\s+$/g,""); };

function on(m,e,f){Ev.add(e,m,function(e){typeof(f)=='function'?f(e):void(0)});}
function getValue(key) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_getValue(key,data[0]));
}
function setValue(key, value) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_setValue(key,value));
}
function getByClas(clasname, tag, parent){
  if(isUndefined(parent)) parent = document;
  if(isUndefined(tag)) tag = '*';
  if(!clasname) return;  
  var elem = getTag(tag, parent);
  if(elem.length>0){
    for(var j=0; j<elem.length; j++){
	   if(clasname == elem[j].getAttribute('class')){
		  return elem[j]; break;
	   }
	}
  }return false;
};
function getByName(txtName,tag){
  var ret=false; var el=getTag(tag);
  if(el.length>0)
   for(var i=0; i<el.length;i++)
    if(txtName == el[i].getAttribute('name')){
	   ret = el[i]; break;
	}
  return ret;
};
function getTag(name, parent){
    if(isUndefined(parent)) parent = document;
	if(typeof(parent)!='object')
	    parent = document;	
	return parent.getElementsByTagName(name);
}
function getByXPath (xp, par, snapshot) {
  if(isUndefined(par)) par = document;
  if(isUndefined(snapshot)) snapshot = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
  return document.evaluate(xp, par, null, snapshot, null);
}
function getByXPath_containing(xp, par, contain){
  if(!par) par = document;
  if(typeof(contain)!='string') return;
  var rets=[];
  var ev = document.evaluate(xp, par, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if(ev.snapshotLength)
     for(var i=0;i<ev.snapshotLength;i++)
	   if(ev.snapshotItem(i).innerHTML.indexOf(contain)!=-1) rets.push(ev.snapshotItem(i));  
  return rets;  
}
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
function createTextEl(x){
  return document.createTextNode(x);
};
function HtmlUnicodeDecode(a){
 var b="";if(a==null){return(b)}
 var l=a.length;
 for(var i=0;i<l;i++){
  var c=a.charAt(i);
  if(c=='&'){
    var d=a.indexOf(';',i+1);
	if(d>0){
	  var e=a.substring(i+1,d);
	  if(e.length>1&&e.charAt(0)=='#'){
	    e=e.substring(1);
		if(e.charAt(0).toLowerCase()=='x'){c=String.fromCharCode(parseInt('0'+e))}else{c=String.fromCharCode(parseInt(e))}
	  }else{
	    switch(e){case"nbsp":c=String.fromCharCode(160)}
	  }i=d;
	}
  }b+=c;
 }return b;
};
function basename (path, suffix) {
  // Returns the filename component of the path  
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: basename('/www/site/home.htm', '.htm');    // *     returns 1: 'home'
  // *     example 2: basename('ecra.php?p=1');
  var b = path.replace(/^.*[\/\\]/g, '');
  if (typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
      b = b.substr(0, b.length-suffix.length);
  }
  return b;
};
function getAbsoluteTop(element) {
  var AbsTop=0;
  while (element) { AbsTop=AbsTop+element.offsetTop; element=element.offsetParent; }
  return(AbsTop);
}
function getCurrentYPos(){
    if (document.body && document.body.scrollTop)
      return document.body.scrollTop;
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    if (window.pageYOffset)
      return window.pageYOffset;
    return 0;
}
//=== BROWSER DETECTION / ADVANCED SETTING
//=============snipet-authored-by:GI-Joe==//
function ApiBrowserCheck() {
  //delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
  
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; show_alert('Opera detected...',0);
  }
  if(typeof(GM_setValue)!='undefined') {
    var gsv; try { gsv=GM_setValue.toString(); } catch(e) { gsv='.staticArgs.FF4.0b'; }
    if(gsv.indexOf('staticArgs')>0) {
      gvar.isGreaseMonkey=true; gvar.isFF4=false;
     show_alert('GreaseMonkey Api detected'+( (gvar.isFF4=gsv.indexOf('FF4.0b')>0) ?' on FF4.0b':'' )+'...',0); 
    } // test GM_hitch
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; show_alert('Bugged Chrome GM Api detected...',0); }
  } else { needApiUpgrade=true; show_alert('No GM Api detected...',0); }

  gvar.noCrossDomain = (gvar.isOpera || gvar.isBuggedChrome);
  if(needApiUpgrade) {
    GM_isAddon=true; show_alert('Try to recreate needed GM Api...',0);
    //OPTIONS_BOX['FLASH_PLAYER_WMODE'][3]=2; OPTIONS_BOX['FLASH_PLAYER_WMODE_BCHAN'][3]=2; // Change Default wmode if there no greasemonkey installed
    var ws=null; try { ws=typeof(unsafeWindow.localStorage) } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      show_alert('Using localStorage for GM Api.',0);
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; };
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } };
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); };
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      show_alert('Using temporarilyStorage for GM Api.',0); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } };
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } };
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); }; }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); }; } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      show_alert('Using XMLHttpRequest for GM Api.',0);
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  }; } } // end needApiUpgrade
  GM_getIntValue=function(name,defValue) { return parseInt(GM_getValue(name,defValue),10); };
}
// ======================
// my ge-debug
function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
}

// ==========
// initialize & set global variable
init();

})();
/* Code.By Idx */