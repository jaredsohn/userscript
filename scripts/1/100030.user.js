// ==UserScript==
// @name           tes
// @namespace      http://www.cmonhackns.net
// @description    An advanced quick reply, quote and edit function that should
//                 work for all phpBB forums.
// @include        */viewtopic.php*
// @include       */forumdisplay.php?*
// @include       */usercp.php*
// @include       */subscription.php?*
// @include       */member.php?*
// @include       */search.php?do=finduser&u=*&starteronly=1
// @include       */search_result.php?*
// @include       http://www.cmonhackns.net/
// @include       http://www.cmonhackns.net/index.php
// @include       http://www.cmonhackns.net/come_inside.php
// ==/UserScript==
//
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "phpBB Advanced Quick Reply Quote Edit user script", and click
// Uninstall.
//
// --------------------------------------------------------------------
//
// Based on the phpBB Quick Reply and the phpBB Quick Edit user script of xamm
// http://userscripts.org/scripts/show/1667
// http://userscripts.org/scripts/show/3528
//
// --------------------------------------------------------------------
// If you have problems with the script or questions to it, feel free to contact
// me per email: juergenbinder@quantentunnel.de
// --------------------------------------------------------------------
//




function () {
// Initialize Global Variables
var gvar=function() {};

gvar.sversion = 'v' + '1.0.6';
gvar.scriptMeta = {
  timestamp: 1300301286949 // version.timestamp

 ,scriptID: 94448 // script-Id
};
/*
javascript:window.alert(new Date().getTime());
javascript:(function(){var d=new Date(); alert(d.getFullYear().toString().substring(2,4) +((d.getMonth()+1).toString().length==1?'0':'')+(d.getMonth()+1) +(d.getDate().toString().length==1?'0':'')+d.getDate()+'');})()
*/
//=-=-=-=--= 
//========-=-=-=-=--=========
gvar.__DEBUG__ = false; // development debug| 
//========-=-=-=-=--=========
//=-=-=-=--=
//
OPTIONS_BOX = {
  // free set
  KEY_KTP_FIXED_PREVIEW:   ['1'] // fixed position or absolute
 ,KEY_KTP_THEN_GOTHREAD:   ['0'] // goto-thread after submit post
 
 ,KEY_KTP_UPDATES:         ['1'] // settings check update
 ,KEY_KTP_UPDATES_INTERVAL:['1'] // settings update interval, default: 1 day
 
 ,KEY_KTP_NODE_STATE:      ['#FF0000,#6B6BB6,#999999'] // node state coloring [ready, readed, invalid-thread]
 ,KEY_KTP_SCROLL_THREAD:   ['0'] // scroll to last opened-thread
 ,KEY_KTP_IMGLOAD:         ['2'] // 0:no-load, 1:load-smilies-only, 2:load-all
 ,KEY_KTP_RELOAD_AFTERSENT:['1'] // fresh reload after send reply
 
 ,KEY_KTP_SHOW_SMILE:      ['0,kecil']   // [flag,type] of autoshow_smiley
 ,KEY_KTP_LAYOUT_CONFIG:   ['']  // flag of [signature_on, template_on], 
 ,KEY_KTP_LAYOUT_SIGI:     [''] // signature layout, eg. [RIGHT]&#8212;[SIZE=1][b]QR[/b][/SIZE]&#8482;[/RIGHT]
 ,KEY_KTP_LAYOUT_TPL:      [''] // template layout, must contain: "{message}". eg. [B]{message}[/B]

 ,KEY_KTP_SCUSTOM_ALT:     ['0'] // use alt instead of thumbnail
 ,KEY_KTP_SCUSTOM_NOPARSE: ['0'] // dont parse custom smiley tag. eg. tag=babegenit. BBCODE=[[babegenit]
 ,KEY_KTP_CUSTOM_SMILEY:   [''] // custom smiley, value might be very large; limit is still unknown 

 ,KEY_KTP_LAST_UPDATE:     ['0'] // last update timestamp
};
GMSTORAGE_PATH      = 'GM_';
KEY_KTP = 'KEY_KTP_';
var _LOADING = '';


function init(){

  if(page_is_notloaded('Page is temporary not available')) show_alert('Page is not available', 0);
  
  //------------
    ApiBrowserCheck();
  //------------
  gvar.domain= 'http://'+'www.kaskus.us/';
  gvar.domainstatic= 'http://'+'static.kaskus.us/';
  gvar.ktpKaskus = 'http://'+'www.idkaskus.com/'
  
  gvar.codename= 'Kaskus Thread Preview';
  gvar.id_textarea= 'vB_Editor_001_textarea';
  _LOADING = '<div class="ktp-loading" style="display:inline-block;padding-left:15px;">loading...</div>';
  
  gvar.zIndex = 99997; // one level above KFTI
  gvar.offsetTop= -35; // buat scroll offset
  gvar.offsetMaxHeight= 160; // buat maxHeight adjust
   // min-height postbit assumed with OR w/o quote per singleline, [{adaQuote}, {ga_adaQuote}]
  gvar.offSet_SiGi= [5, 8];
  gvar.LastScrollTop = 0;
  
  gvar.meta_refresh = null;
  gvar.fixed_ktfi = false;
  gvar.isVBul4 = false;
  gvar.isKaskus = (location.href.indexOf(gvar.domain)!=-1 ? 1:null);
  
  gvar.user= tTRIT.getUserId(); // all about logged is user: {id:'',name:'',isDonat:[1,0]}
  gvar.settings = {};
  getSettings();
  gvar.offsetLayer= (gvar.fixed_ktfi ? 38 : 20); // buat margin top Layer
  
  gvar.B= rSRC.getSetOf('button');
  gvar.TS= {}; // all about TS: {id:'',name:'',tid:'',pid:'',urifetch:''}
  gvar.LPOST= {}; // all about LASTPOST: {id:'',name:'',pid:'',urifetch:''}  
  gvar.current= {}; // {cImg:'',cEmote:'',cSPL:'',content:'',isLastPost:'',QR_isLoaded:'',TRIT_isClosed:''}
  gvar.loc= location.href;

  GM_addGlobalStyle( rSRC.getCSS() );
  GM_addGlobalStyle( rSRC.getCSS_fixed(gvar.settings.fixed_preview), 'css_position', 1 ); // to body for css-fixed
  
  GM_addGlobalScript('http:\/\/www.google.com\/recaptcha\/api\/js\/recaptcha_ajax\.js');
  GM_addGlobalScript( rSRC.getSCRIPT() );

  //-----Let's Roll-------
    start_Main();
  //----------------------
  if(!gvar.noCrossDomain && gvar.settings.updates)
    window.setTimeout(function(){ Updater.check(); }, 5000);
  
} // end-init
// populate settings value
function getSettings(){
  /** 
  eg. gvar.settings.fixed_preview
  */  
//  var hVal,hdc;
  gvar.settings = {
     fixed_preview:    (getValue(KEY_KTP+'FIXED_PREVIEW')=='1') // boolean
    ,then_goto_thread: (getValue(KEY_KTP+'THEN_GOTHREAD')=='1') // boolean
	
	//UPDATES UPDATES_INTERVAL
    ,updates: (getValue(KEY_KTP+'UPDATES')=='1') // boolean
    ,updates_interval: (getValue(KEY_KTP+'UPDATES_INTERVAL')) // int
    ,imgload: ( getValue(KEY_KTP + 'IMGLOAD') ) // [0,1,2]
    ,thread_lastscroll:(getValue(KEY_KTP+'SCROLL_THREAD')=='1') // boolean
    ,reload_aftersent: ( getValue(KEY_KTP + 'RELOAD_AFTERSENT')=='1' ) // boolean
	
	// QR
    ,scustom_alt: ( getValue(KEY_KTP + 'SCUSTOM_ALT')=='1' ) // boolean
    ,scustom_noparse: ( getValue(KEY_KTP + 'SCUSTOM_NOPARSE')=='1' ) // boolean
	,userLayout: {
       config: [], //[[1,0], [1,0]] [signature_on, template_on]
       signature:getValue(KEY_KTP+'LAYOUT_SIGI'),
       template: getValue(KEY_KTP+'LAYOUT_TPL'),
    },
  };
  
  //get layout config
  hVal=tSTORAGE.getValueForId(gvar.user.id, 'LAYOUT_CONFIG');
  if(!hVal) hVal = ['', '0,0'];
  gvar.settings.userLayout.config = hVal[1].split(',');
  
  hVal=tSTORAGE.getValueForId(gvar.user.id, 'LAYOUT_SIGI', ['<!>','::']);
  if(!hVal) hVal = ['', '[RIGHT]&#8212;[SIZE=1][b]QR[/b][/SIZE]&#8482;[/RIGHT]'];
  gvar.settings.userLayout.signature = decodeURIComponent(hVal[1]).replace(/\\([\!\:])/g, "$1");
  
  hVal=tSTORAGE.getValueForId(gvar.user.id, 'LAYOUT_TPL', ['<!>','::']);
  if(!hVal) hVal = ['', '[B]{message}[/B]'];  
  gvar.settings.userLayout.template = decodeURIComponent(hVal[1]).replace(/\\([\!\:])/g, "$1");

  // recheck updates interval
  hVal=gvar.settings.updates_interval;
  hVal=(isNaN(hVal)||hVal <= 0 ? 1 : (hVal > 99 ? 99 : hVal) );

  //SHOW_SMILE, autoload_smiley
  hVal=getValue(KEY_KTP+'SHOW_SMILE');
  gvar.settings.autoload_smiley=(!hVal.match(/^([01]{1}),(kecil|besar|custom)+/) ? ['0','kecil'] : hVal.split(',') );  

  //NODE_STATE gvar.color_state 
  hVal=getValue(KEY_KTP+'NODE_STATE');
  gvar.settings.color_state=(!hVal.match(/^(?:\#[0-9A-F]+|\w+)\,*/i) ? ['#FF0000','#6B6BB6','#999999'] : hVal.split(',') );  

  
  
  // check if kfti do sumthin like fixed itself	
  chk_kfti_pos();
}
// end getSettings

// main starter
function start_Main(){
  // prep recreate clone meta-refresh | it will be killed/re-add when popup showed up
  var head = getTag('head');
  if( isDefined(head[0]) ) {
    nodes = $D("//meta[@http-equiv='refresh']", null, true);
	if(nodes) Dom.remove(nodes);
    gvar.meta_refresh = createEl('meta', {id:'meta_refresh',content:'600','http-equiv':'refresh'});
	head[0].appendChild( gvar.meta_refresh.cloneNode(true) );
	//Dom.add(gvar.meta_refresh, head[0]);
  }
  
  tTRIT.init();
  
} // end start_Main


// main Object

var LINK = {
  getTID: function(link){
    var cucok = link.match(/\.php\?t=(\d+)/im);
    return (cucok ? cucok[1] : false);
  }
 ,getPID: function(link){
    //showthread.php?p=340941629#post340941629   >>=become=>>   showpost.php?p=340941629
    var cucok = link.match(/\.php\?p=(\d+)/im);
    return (cucok ? cucok[1] : false);
  }
 ,fixDomain: function(link){
    if(link.match(/http\:\/\/kaskus\.us\/.+/))
	  return link.replace(/\:\/\//,'://www.');
  }
};

var tTRIT = {
  init: function(){
	var nodes, lnodes, node, href, tid, pid, par, Attr, el;
	
	var shiftedLeft = 'vertical-align:top;margin:0 5px 0 -18px;position:relative;';
	var styles = ['font-size:10px;'+shiftedLeft, 'font-size:10px;', 'font-size:12px;'+shiftedLeft];
	// we're givin properties at every places which has diff behaviour depend on its parent
	var areas_home = {
	     'navforumisi': {style:styles[0],pos:'first',parentLevel:2} // HT
	    ,'LingBawah': {style:styles[0],pos:'first',parentLevel:1} // Terkini / FJB | forumdisplay.php
	    ,'Conhomemidd': {style:styles[1],pos:'last',parentLevel:1} // LKL ; Lounge
	    ,'tabcontentcontainer': {style:styles[1],pos:'last',parentLevel:1} // FJB
	    ,'navigation': {style:styles[1],pos:'last',parentLevel:1} // beside hot-threads
		
	};
	var areas_forum = {
	     'tblForumBits': {style:'',pos:2,parentLevel:1} // @ forumdisplay.php
		,'LingBawah': {style:styles[0],pos:'first',parentLevel:1} // Terkini / FJB | forumdisplay.php
	};
	var areas_search = {
	   'searchResult': {style:styles[2],pos:'first',parentLevel:1} // search_result
	};
	var even_node = function(areas, field){
		var par, node, nodes, tid; // local var
		par = (field==='searchResult' ? document.body : $D('#'+field) );
		if( !par || isUndefined(areas[field]) ) return;
		
	    nodes = $D(".//a[contains(@href,'showthread.php?')]", par);
	    if(par && nodes.snapshotLength > 0){
	     for(var i=0, lg=nodes.snapshotLength; i<lg; i++) {
	      node = nodes.snapshotItem(i);
		  //fixDomain| add missing www.
		  if(field=='navigation')
		    node.href = LINK.fixDomain(node.href)
		  tid = LINK.getTID(node.href);
		  
	      Attr = {id:'remoteTID_'+tid,'class':'thread_preview',style:areas[field].style, rel:node.href,title:'Preview First Post'};
	      el = createEl('span',Attr,'[+]');
	      par = node.parentNode; // parenting level
		  if(areas[field].parentLevel==2)
		    par = par.parentNode;
	      
		  if(par.nodeName=='LI')
		    par.style.setProperty('list-style-type','none','');
		  
		  if(areas[field].pos=='first'){
		    par.insertBefore(el, par.firstChild);
		  }else if(!isNaN(areas[field].pos) ){
			par.insertBefore(el, par.childNodes[areas[field].pos] );
		  }else{
		    Dom.add(el, par);
		  }
		  // attach event-click
	      on('click',el,function(e){ tTRIT.clickNode(e); }); // end click event
	     }
	    }
	}; // end even_node

	var curpage = '/' + basename(gvar.loc, null, "\\?");
	clog('curpage='+curpage);
	switch(curpage){
	  case "/": case "/index.php": case "/come_inside.php":
	    clog('home');		
	     // Kaskus Home --
	    for(var field in areas_home)
	       even_node(areas_home, field);
	    
	    // menubwhjb | retrigger even_node after ajax done fetch links
	    par = $D('#menubwhjb');
	    nodes = $D(".//div[contains(@onclick,'getJBData')]", par);
	    if(par && nodes.snapshotLength > 0){
	      for(var i=0, lg=nodes.snapshotLength; i<lg; i++) {
	        node = nodes.snapshotItem(i);
	   	    // attach event-click
	        on('click', node, function(e){ 
	   	      gvar.sTryWaitLoader = window.setInterval(function() {
	   	        var loader = $D('#loaderani');
	   	    	if(loader && loader.style.display=='none'){
	   	    	  clearInterval(gvar.sTryWaitLoader);
	   	    	  even_node(areas_home, 'tabcontentcontainer');
	   	    	}
	   	      }, 100);
	   	    }); // end click event
	      }
	    }
	  break;
	  
	  case "/member.php":
	    clog('member');
	    par = $D('#collapseobj_stats');
	    lnodes = $D(".//a[contains(@href,'showthread.php?')]", par, 1);
	    if(lnodes){
	      pid = LINK.getPID(lnodes.href);
		  Attr = {id:'remotePID_'+pid,'class':'thread_preview lastpost',style:'',rel:'showpost.php?p='+pid,title:'Preview Last Post'};
	    	el = createEl('span',Attr,'[+]');
	    	Dom.add(el, lnodes.parentNode);
		  // attach event-click
	      on('click', el, function(e){ tTRIT.clickNode(e); }); // end click event
	    }
	  break;
	  
	  case "/search_result.php":
	    clog('search_result');
	    even_node(areas_search, 'searchResult');
	  break;
	  
	  default:
	    // common location eg. forumdisplay; usercp
	    clog('default');
		
        // append icon [+] on all thread & lastpost link
        nodes = $D("//a[starts-with(@id,'thread_title')]");
        if(nodes.snapshotLength > 0){
         for(var i=0, lg=nodes.snapshotLength; i<lg; i++) {
          node = nodes.snapshotItem(i);
	      tid = LINK.getTID(node.href);
	      Attr = {id:'remoteTID_'+tid,'class':'thread_preview',style:'',rel:node.href,title:'Preview First Post'};
	      el = createEl('span',Attr,'[+]');
	      par = node.parentNode; // parent of cont (DIV)
	      par.insertBefore(el, par.firstChild);
	      // attach event-click
	      on('click', el, function(e){ tTRIT.clickNode(e); }); // end click event
	      
	      // lastpost nodes (single node)
	      lnodes = $D(".//a[contains(@href,'#p') and contains(@href,'?p=')]", nodes.snapshotItem(i).parentNode.parentNode.parentNode, true);
	      if(lnodes){
	          pid = LINK.getPID(lnodes.href);
	    	  Attr = {id:'remotePID_'+pid,'class':'thread_preview lastpost',style:'display:inline-block;',rel:'showpost.php?p='+pid,title:'Preview Last Post'};
	    	  el = createEl('span',Attr,'[+]');
	    	  Dom.add(el, lnodes.parentNode);
	        // attach event-click
	        on('click', el, function(e){ tTRIT.clickNode(e); }); // end click event
	      }
	     } // end-for
	    } // end-if
		
	    if( curpage== "/forumdisplay.php" ){
		  clog(curpage);
	       even_node(areas_forum, 'LingBawah');
	       even_node(areas_forum, 'tblForumBits');
	    }
	  break;
	} // end switch
	

	// event buat window
	on('keydown', window.document, function(e) { return tTRIT.is_keydown_ondocument(e); });
	
	
  } // end tTRIT.init()
 ,collectRowInfo: function(e){
    var task = (e.getAttribute('class') && e.getAttribute('class').indexOf('lastpost')!=-1 ? 'lastpost' : 'firstpost');
	var trInner, inner, ret, cucok, isLast; 
	gvar.current.TRIT_isClosed = false;
	isLast = gvar.current.isLastPost = (task=='lastpost');
    trInner = gvar.current.cRow = tTRIT.findCurrentRow(e);
	if(!gvar.current.cRow) gvar.current.cRow = e.id;
	if(!trInner) trInner = e.parentNode;
	if(trInner.innerHTML.indexOf('member.php')==-1) trInner=trInner.parentNode;
	trInner = trInner.innerHTML;

    if(isLast){ // find its parent (TR)

      gvar.TS.tid = LINK.getTID(trInner);
      inner = e.parentNode.innerHTML;
    }else{
      gvar.TS.tid = LINK.getTID( e.getAttribute('rel') );
      inner = trInner;
    }
	// buat action form
	gvar.current.action = 'newreply.php?do=postreply&t='+gvar.TS.tid;
	gvar.current.tofetch = e.getAttribute('rel');
	
	// nyari TS.id & TS.name
	cucok = trInner.match(/member\.php\?u=(\d+)[^>]+.([^<]+).\//im);
	gvar.TS.id = (cucok ? cucok[1]:null); gvar.TS.name = (cucok ? cucok[2]:null);
	gvar.TS.pid = null; // ntar aj nyarinya.. abis fetch
	
	// nyari LPOST, actualy needed only on lastpost
	cucok = inner.match(/by\s*<[^>]+.([^<]+).\/a>/im);	
	gvar.LPOST = (cucok ? {id:'#', name:cucok[1]} : {id:null,name:null} ); // # dulu id-nya
	cucok = inner.match(/id=[\'\"]remotePID_(\d+)/m);
	gvar.LPOST.pid = (cucok ? cucok[1] : null);
	
	clog('TS.id:'+gvar.TS.id+'; TS.name:'+gvar.TS.name+'; TS.tid:'+gvar.TS.tid+'; TS.pid:'+gvar.TS.pid+'; ');
	clog('LPOST.id:'+gvar.LPOST.id+'; LPOST.name:'+gvar.LPOST.name+'; LPOST.pid:'+gvar.LPOST.pid+'; ');
	
 }
 ,findCurrentRow: function(e){
    var par = null;
	if(typeof(e)=='object'){
	  var maxJump= 5, i= 0, blinkArea=['forumdisplay','usercp','subscription'];
	  var isBlinkArea = function(L){
	    var r=false;
		for(var i=0;i<blinkArea.length;i++){
		  if(L.indexOf('/'+blinkArea[i]+'.php') != -1){ r=true; break;}
		}
		return r;
	  };
	  par = e.parentNode;	  
	  // abort find curent row object on several conditions
	  if( !isBlinkArea(gvar.loc) || par.nodeName=='LI' )
		return null;	  
	  while(i < maxJump && par.nodeName!='TR'){
		par = par.parentNode; i++;
	  }
	  par = (par.nodeName!='TR' ? null : par);
	}
	clog('findCurrentRow='+par)
	return par;
  }
 ,is_keydown_ondocument: function(e){
    var C = (!e ? window.event : e);
    var pressedCSA = (C.ctrlKey ? '1':'0')+','+(C.shiftKey ? '1':'0')+','+(C.altKey ? '1':'0');
    var A = C.keyCode ? C.keyCode : C.charCode;
    
    // without pressedCSA or just Shift | there's no hideshow layer ? forget it
    if( (pressedCSA=='0,0,0' || pressedCSA=='0,1,0') && !$D('#hideshow') )
      return;
    
    if(A===27){
	  if( !tQR.isLoaded() || (Dom.g(gvar.id_textarea) && Dom.g(gvar.id_textarea).value == '') ){
        tPOP.closeLayerBox('hideshow');
	  }else{
	    var yakin = confirm('Discard content text on Quick-Reply?');
		if(yakin)
		  tPOP.closeLayerBox('hideshow');
	  }
    }
  }
 ,is_closed_thread: function(text){ // text-mode
    // find first href with noquote    
	return (text.match(/[\'\"]\s*alt=[\'\"]Closed\s*Thread[\'\"]/i));
  }
 ,clickNode: function(e){
    e = e.target||e;	
	if($D('#hideshow')) {
	  gvar.LastScrollTop = getCurrentYPos();	  
	  if( typeof(gvar.current.cRow)!='string' ) removeClass('selected_row', gvar.current.cRow);
	  gvar.current = {};
	  tPOP.closeLayerBox('hideshow');
	  if($D('#prev_loader')) $D('#prev_loader').parentNode.innerHTML = '[+]';
	}
	if(gvar.sITryBlinkRow && typeof(gvar.current.cRow)==='string' ){
	    clearTimeout(gvar.sITryBlinkRow);
		if($D(gvar.current.cRow)) $D(gvar.current.cRow).innerHTML = '[+]';
	}
	tPOP.imediateStop(); // make sure blinking is stop at all
	
	// reset this current
	gvar.current= {};
	
	if( isUndefined(e.getAttribute('rel')) ) return;
	// kill the meta
	if($D('#meta_refresh')) Dom.remove($D('#meta_refresh'));
	
	tTRIT.collectRowInfo(e);

	e.innerHTML = '<div id="prev_loader" class="ktp-loading" style="border:0px solid #000;display:inline-block;'+(gvar.current.isLastPost ? (gvar.isOpera ? 'margin:-8px 2px 0 4px;':'margin:1px 2px 0 4px;'):'margin:1px 1px '+(gvar.current.isLastPost?'2px':'4px')+' 4px!important;')+'"></div>';
	
	
	// re-syncroning from storage avoid changed value when qr-click
	gvar.settings.fixed_preview = (getValue(KEY_KTP+'FIXED_PREVIEW')=='1');
	Dom.g('css_position').innerHTML = rSRC.getCSS_fixed( gvar.settings.fixed_preview );
	
	// pre-check kfti position, walau udah di setting, this one is per-click.
	// user might resize / change the state of kfti
	chk_kfti_pos();
	
	// fetching thread
	tTRIT.fetch();
  }
 
 ,fetch: function(){
    getFetch(gvar.current.tofetch, tTRIT.fetch_cb);
  }  
 ,is_fetch_expire: function(){
	var caller_id = (gvar.current.isLastPost ? 'remotePID_'+gvar.LPOST.pid : 'remoteTID_'+gvar.TS.tid);
    return ( !$D('#' + caller_id) );
  }
 ,fetch_cb: function(reply_html){
    // callback of fetch progress
	var caller = ($D('#prev_loader') ? $D('#prev_loader').parentNode : null);
	// tahap-1 yg bikin failed
	if( !reply_html || !caller ) tTRIT.fetch_failed('t1');
	
	reply_html = reply_html.responseText;
    var rets = tTRIT.parse_preview(reply_html);

	clog(gvar.current.tofetch);
	
	if(rets===null){
	  if(caller) {
	    caller.innerHTML = '<blink title="">[X]</blink>';
		caller.setAttribute('title', 'Page not Loaded');
	    window.setTimeout(function() { caller.innerHTML='[+]';}, 3500);
	  }
	  tTRIT.fetch_failed('t2, ' + 'Thread Not Loaded, might be `kepenuhan`'); // end of story
	  return;
	}else if(!rets){
	  if(caller) {
	    caller.innerHTML = '[-]';
		caller.setAttribute('title', 'Invalid Thread');
		removeClass('thread_preview', caller);
	    addClass('thread_preview-invalid', caller);
	  }
	  tTRIT.fetch_failed('invalid-thread'); // end of story
	  return;
	}
	
	// tahap-3 yg bikin failed
	if( tTRIT.is_fetch_expire() ) tTRIT.fetch_failed('t3');	
	
	// done let's restore loader
	if( caller ) tTRIT.fetch_done(caller);	
	
	// ready to next step
	gvar.current.newreply = rets.newreply;
    gvar.current.content= rets.content;
	
	// now tPOP object is starting..
	tPOP.init(rets);
	
  }
 ,fetch_failed: function(msg){
	clog('Fetch Failed::' + msg);	  
	return false;
  }
 ,fetch_done: function(caller){
	if(caller){
	 caller.innerHTML = '[+]';
	 addClass('thread_preview-readed', caller);
	 if(!isString(gvar.current.cRow)) addClass('selected_row', gvar.current.cRow);
	}
  }

 ,scanBetmen: function(text){
  if(!text) return '';
  var temp = createEl('div',{}, text), cleanRet=text;
  var el, buff, aL, isClean, aTag = getTag('a', temp);
  if(!aTag) return text;  
  var newHref = function(inner, href){
    var isKaskus = ( /^http\:\/\/\w+\.kaskus\.us\//i.test(href) );
	var nel = createEl('div', {}, (href ? '<div class="btman-suspect"><a href="'+href+'" target="_blank" '+(isKaskus?'':'title="BEWARE! This link is a trick for you, it may contain harmfull or annoying contents."')+'>[ <span>BETMEN-DETECTED</span> ]</a><span class="btman-href'+(isKaskus?'':' btman-strike')+'">'+href+'</span></div>':'') + inner );
	return nel;
  }
  aL=aTag.length; isClean='';
  while(isClean=='' || isClean.indexOf('0')!=-1 ){
   isClean= '1';
   for(var i=0; i<aL; i++){
     if(isUndefined(aTag[i])) continue;
     buff = aTag[i].innerHTML;
	 
	 if(buff.match(/<input\s*(?:(?:type|value|style)=[\'\"][^\'\"]+[\'\"]\s*)*onclick=[\'\"]/i)){
		el = newHref(buff, aTag[i].href);
	 	temp.insertBefore(el, aTag[i].nextSibling);
	 	temp.removeChild(aTag[i]);
		isClean+= '0';
	 }
	 isClean+= '1';
   }
  }
  cleanRet = temp.innerHTML;
  return cleanRet;
 }
 ,parse_preview: function(text){
   var isVBul4 = function(itext){
       return (itext.indexOf('postbody')!=-1);
   };
   
   // sumthin like kepenuhan
   if(text.indexOf('td_post_')==-1) {
     if(text.indexOf('>Invalid Thread')!=-1){
	   return false; // thread is deleted or invalid
	 }else{
	   if(!isVBul4) return null; // page not loaded and it's not vBul4, maybe..
	   gvar.isVBul4 = true;
	 }
   }
   if( gvar.isVBul4 ) gvar.codename=gvar.codename.replace(/Kaskus/i,'vBulletin');
   
   var dSpliter = (gvar.isVBul4 ? 'postbody':'td_post_');
   var cucok, wraper, poss, _ret, _tit, _nr;
   /*content*/
   _ret = text.split(dSpliter);
   _ret = _ret[1];
   
   wraper = (gvar.isVBul4 ? ['<div class="postrow','<div class="cleardiv"></div>'] : ['>', '<!-- / message -->']);
   poss = [_ret.indexOf(wraper[0]), _ret.indexOf(wraper[1])];
   if(!gvar.isVBul4) poss[0]=poss[0]+wraper[0].length;
   _ret = _ret.substring(poss[0], poss[1]);
   
   // a lil hack to strip this.innerText = '', which bring error on GC.
   _ret = _ret.replace(/<input(?:.*)onclick=\"(?:(?:[^;]+).\s*(this\.innerText\s*=\s*'';\s*)(?:[^;]+).(?:[^;]+).\s*(this\.innerText\s*=\s*'';\s*))[^\>]+./gim, function(str,$1,$2){ return( str.replace($1,'').replace($2,'') ) });
   
   // simple anti-batman-trap
   _ret = tTRIT.scanBetmen(_ret);   
   _ret = tTRIT.parse_image(_ret);
   
   /*title*/
   cucok = text.match(/<title>(.+)<\/title>/);
   if(cucok) {
     _tit = cucok[1].replace(/\s*\-\s*Kaskus\s*\-\s*The Largest Indonesian Community/,"").trim();
     // step-two if it's single post
	 if(gvar.current.isLastPost){
	    _tit = _tit.replace(/^[^(?:P)]+.ost\s*\-\s*/,"").trim();
		cucok = text.match(/name[\'\"]\s*href=[\'\"][^\?]+.u=(\d+)[^\>]+.([^\<]+).\/a>/im);
		if(cucok){
		   gvar.LPOST.id = cucok[1];
		   gvar.LPOST.name = cucok[2];
		}
	 }else{
	    // store pid of TS
		cucok = text.match(/newreply\.php\?do=newreply([^\"\']+)/im);
		if(cucok) {
		  cucok = cucok[1].replace(/\&amp;/gi,'&').replace(/\&noquote=1/gi,'').replace(/\&/,'.php?');
		  gvar.TS.pid = (cucok ? LINK.getPID( cucok ) : false);
		}
		// updating user.is & user.name
		cucok = text.match(/ass=[\"\']bigusername[\'\"]\s*[^\?]+.u=(\d+).>(.+)<\/a>/i);
		if(cucok){
		   gvar.TS.id = cucok[1];
		   // for pejabat kaskus|strip coloring username
           var cl_Name=cucok[2];
           // clean TS.name if it's contain tag
           if(cl_Name && cl_Name.indexOf('"')!=-1){
             cucok = cl_Name.match(/<[^\>]+>([^<]+)<\//);
             if(cucok) cl_Name = cucok[1];
           }
		   gvar.TS.name = cl_Name;
		}
	 }
	 gvar.current.TRIT_isClosed = tTRIT.is_closed_thread(text);
	 
	 clog('(after) TS.id:'+gvar.TS.id+'; TS.name:'+gvar.TS.name+'; TS.tid:'+gvar.TS.tid+'; TS.pid:'+gvar.TS.pid+'; ');
	 clog('LPOST.id:'+gvar.LPOST.id+'; LPOST.name:'+gvar.LPOST.name+'; LPOST.pid:'+gvar.LPOST.pid+'; ');
   }
   /*newreply*/
   return {content:_ret, title:_tit, newreply:(gvar.current.isLastPost ? gvar.LPOST.pid : gvar.TS.pid) };
  }
  // param can be manualy supplied. mode=[0:hideall,1:emote,2:showall]; flag:[link, img];
 ,parse_image: function(text, flag, mode){
   if(isUndefined(flag)) flag = 'link';
   if(isUndefined(mode)) mode= gvar.settings.imgload;
   if(flag=='link'){
     var ori = text;
     if(mode=='0'){
       // no-load all 
	   text = text.replace(/<img\s*src=[\"\']([^\"|\']+).(?:\sborder=.0.)*(?:\salt=..)*\s*title=[\"\']([^\"|\']+)[^>]+./gim, function(str, $1, $2) { return('<a class="imgthumb" href="'+$1+'" title="'+$2+'">'+basename($1)+'</a> '); });
	   gvar.current.cEMOTE = (ori!=text);
     }
     if(mode != '2'){
	  ori = text
      text = text.replace(/<img\s*src=[\"\']([^\"|\']+).(?:\s*border=.0.)(?:\s*alt=..)(?:[\s*\/]+)>/gim, function(str, $1) { return('<a class="imgthumb" href="'+$1+'">'+$1+'</a> '); });
	  gvar.current.cIMG = (ori!=text);
     }
   }
   else if(flag=='img'){
     // reverse turn back to images
	 //emotes
	 if(mode=='1')
	  text = text.replace(/<a\s*class=\"imgthumb\"\s*href=[\"\']([^"|\']+).\s*title=[\"\']([^\"\']+).>(?:[^>]+).(?:\s|)/gim, function(str, $1, $2){ return('<img src="'+$1+'" border="0" alt="'+$2+'" title="'+$2+'" />'); });
	 // common-images
	 if(mode=='2')
	  text = text.replace(/<a\s*class=\"imgthumb\"\s*href=[\"\']([^"|\']+).>(?:[^>]+).(?:\s|)/gim, function(str, $1){ return('<img src="'+$1+'" border="0" alt="" />'); });
   }
   return text;
  }
 ,getUserId: function(){
    var uid,logusers = $D("//li[@class='welcomelink']", null, true),ret=false;	
    if(logusers){
	  // isVBul4=1
      uid = logusers.innerHTML.match(/member\.php\?u=([^\"\']+)[^>]+.([^<]+)/i);
	  ret = {id:(uid ? uid[1] : null), name:(uid ? uid[2] : null)};
    }else{
	  logusers = $D("//a[contains(@href, 'member.php')]", null, true);
	  if(logusers){
	    uid = logusers.href.match(/member\.php\?u=([^\"\']+)/i);
        ret = {id:(uid ? uid[1] : null), name:(logusers ? logusers.innerHTML : null) };
	  }
	}
    return ret;
  }

}; // end tTRIT

var tPOP = {
  init: function(rets){
    gvar.LastScrollTop = getCurrentYPos();
	gvar.isExpanded = true;
	
	tPOP.loadLayer();
	showhide($D('#hideshow'), true);	
	if(!$D('#hideshow')) return;	
	tPOP.fillLayer(rets);
  } 
 ,loadLayer: function(){
    var Attr = {id:'hideshow',style:'display:none;'};
	//alert(gvar.current.TRIT_isClosed);
    var el = createEl('div', Attr, rSRC.getTPL_preview() );
    getTag('body')[0].insertBefore(el, getTag('body')[0].firstChild);
	tPOP.event_Static();
 }
 ,fillLayer: function(rets){
	$D('#preview_content').innerHTML = rets.content;
	if($D('#btn_quote_reply')){
	  $D('#btn_quote_reply').setAttribute('href', 'newreply.php?do=newreply&p='+rets.newreply );
	  on('click', $D('#btn_quote_reply'), function(){
		tPOP.toggleQuoting(true);
		var uri = gvar.current.newreply;
		if( gvar.current.QR_isLoaded ){
		  tQR.fetch(uri);
		}else{
		  tPOP.openQR();
		  tQR.init(uri);
		}
	  });
	}
	$D('#prev_title').innerHTML = '<a href="showthread.php?t='+gvar.TS.tid+'" target="_blank" title="Goto Thread - '+(rets.title)+'">'+rets.title+'</a>';
	
	// recalibrate top position only if not in fixed_preview
    $D('#popup_container').style.setProperty('top', (gvar.settings.fixed_preview ? gvar.offsetLayer : ss.getCurrentYPos()+gvar.offsetLayer ) +'px','');
	
	//gvar.LPOST.id poster_userlink
	if($D('#poster_userlink')) {
	  $D('#poster_userlink').innerHTML = '<a onclick="return '+(!gvar.isKaskus ? 'true':'false')+'" target="_blank" href="./member.php?u='+gvar.LPOST.id+'" class="ktp-user_link cyellow"><b>'+gvar.LPOST.name+'</b></a>';
	}	
	//ts_userlink poster_userlink
	if(gvar.isKaskus)
	  tPOP.event_Userlink();
	
	// event_Additional
	tPOP.event_Additional();
	
	
 }
 ,settings: {
    init: function(){
	  if($D('#setting_container')) {
       $D('#setting_container').innerHTML = rSRC.getTPL_setting();
       $D('#setting_container').style.display='';
      }
	  tPOP.settings.event_set();
   }
   ,toggle_partial: function(){
	  show = ($D('#row_content').style.display!='none');	  
	  var el = $D('#setting_container');
	  if(isUndefined(el)) return;
	  if(el.style.display!='none'){
		if(gvar.current.row_content_last_isShow)
		  tPOP.toggleCollapse();
		else
		  tPOP.toggleCollapse(true); // partial collapse
	  }else{
	    tPOP.settings.init();
		gvar.current.row_content_last_isShow = show;
	    if(show) tPOP.toggleCollapse();
	  }
   }
   ,event_set: function(){
    // #save_settings #cancel_settings
	if($D('#cancel_settings')) on('click', $D('#cancel_settings'), function(){ tPOP.settings.toggle_partial(); });
	if($D('#save_settings')) on('click', $D('#save_settings'), function(){ tPOP.settings.save(); });
	if($D('#reset_default')) on('click', $D('#reset_default'), function(){ tPOP.settings.reset(); });
      
	if($D('#edit_sigi')) on('click', $D('#edit_sigi'), function(e){ tPOP.settings.toggle_editLayout(e); });
    if($D('#edit_tpl')) on('click',  $D('#edit_tpl'), function(e){ tPOP.settings.toggle_editLayout(e); });
	
    // better do this instead of check noCrossDomain and/or isOpera
      try {
       if(!gvar.noCrossDomain && $D('#chk_upd_now') ) // unavailable on Chrome|Opera T_T
        on('click', $D('#chk_upd_now'), function(e){
          if($D('#fetch_update')) return; // there is a fetch update in progress        
          if($D('#upd_cnt')) Dom.remove($D('#upd_cnt'));
          Updater.notify_progres('chk_upd_now');
          Updater.check(true);
        });
      }catch(e){ show_alert(e);};
   }
   ,layout_Edit: function(e, task){
      if(isUndefined(e) || isUndefined(task)) return;
	  var el_cancel = Dom.g(task+'_cancel');
      var genTxta = function(_task, value){
        var tgt = Dom.g(_task+'_Editor'); tgt.innerHTML='';
        var el = createEl('textarea',{id:_task+'_txta'}, value);
        Dom.add(el, tgt); tgt.style.display='';
        window.setTimeout(function(e) { try{Dom.g(_task+'_txta').focus();}catch(e){} }, 100);
      };
      var uLayout = gvar.settings.userLayout;
      switch(task){
      case "edit_sigi":
        genTxta(task, uLayout.signature);
      break;
      case "edit_tpl":
        genTxta(task, uLayout.template);
      break;
      };
      removeClass('cancel_layout-invi', el_cancel );
   }
   ,layout_Set: function(e, task){
      if(isUndefined(e) || isUndefined(task)) return;
      value = Dom.g(task+'_txta').value;
      if(task=='edit_tpl'){
        if(!value.match(/\{message\}/i)) {
          alert('Invalid Layout format.\nCan\'t find "{message}" in template.\n\neg. [B]{message}[/B]');
          return false;
        }else{
          value = value.replace(/\{message\}/i, '{MESSAGE}');
          Dom.g(task+'_txta').value = value;
        }
      }
      value = value.replace(/([\!\:])/g, "\\$1");
      var keyName=(task=='edit_sigi' ? 'LAYOUT_SIGI' :'LAYOUT_TPL');
      
      tSTORAGE.setValueForId (gvar.user.id, encodeURIComponent(value), keyName, ['<!>','::']); //save layout
      window.setTimeout(function() { SimulateMouse(Dom.g(task+'_cancel'), 'click', true); }, 50);
      if(task=='edit_sigi')
        gvar.settings.userLayout.signature=value.replace(/\\([\!\:])/g, "$1");
      else
        gvar.settings.userLayout.template=value.replace(/\\([\!\:])/g, "$1");
   }
   ,toggle_editLayout: function(e){
    e=e.target||e;
    if(typeof(e)!='object') return;
    var todo=e.innerHTML; // edit | set
    var value, task=e.id; // sigi | tpl
    var el_cancel = Dom.g(task+'_cancel');
    if(todo=='edit'){
      tPOP.settings.layout_Edit(e, task);
    }else{ // set
      tPOP.settings.layout_Set(e, task);
    }    
    e.innerHTML = (todo=='edit' ? 'set' : 'edit');
    // using onclick attribute identify that cancel event has been attached
    if(!el_cancel.getAttribute('onclick')){
      el_cancel.setAttribute('onclick','return false;');
      on('click', el_cancel, function(ec){ 
       ec=ec.target||ec; var tgt = ec.id.replace('_cancel','')+'_Editor';
       Dom.g(tgt).innerHTML=''; addClass('cancel_layout-invi', ec );
       e.innerHTML='edit';
      });
    }
   }
   ,save: function(){
    //UPDATES UPDATES_INTERVAL IMGLOAD THEN_GOTHREAD RELOAD_AFTERSENT
    // single chkbox 
	// , 'stg_autolayout_sigi', 'stg_autolayout_tpl', 'stg_autoshow_smile'
	// stg_state_color_ready stg_state_color_readed  stg_state_color_invalid
	var cnt, value, sets, cucok;
	sets ={
	  'stg_reload_afterpost': 'RELOAD_AFTERSENT'
	 ,'stg_scrollto_lastrow': 'SCROLL_THREAD'
	 ,'stg_updates': 'UPDATES'	 
	};
	for(var field in sets){
	  if( isString(sets[field]) && $D('#'+field) ){
	    setValue(KEY_KTP+sets[field], ($D('#'+field).checked ? '1':'0') );
	  }
	}
	// saving autoshow_smiley
    value = [];
    misc = ['kecil','besar','custom'];
    par = $D('#stg_autoshow_smile');
    if(par) value.push(par.checked ? '1':'0');
    for(var id in misc){
      if(!isString(misc[id])) continue;
      par = $D('#stg_autoshow_smile'+'_'+misc[id]);
      if(par && par.checked){
        value.push(misc[id]);
        break;
      }
    }
    setValue(KEY_KTP+'SHOW_SMILE', value.toString());
	
	// saving autolayout
    misc = ['stg_autolayout_sigi','stg_autolayout_tpl'];
    value = [];
    for(var i in misc){
      if(!isString(misc[i])) continue;
      value.push(Dom.g(misc[i]).checked ? '1' : '0');
    }
    tSTORAGE.setValueForId(gvar.user.id, value.toString(), 'LAYOUT_CONFIG'); //save layout
	
	// saving update interval
    if( $D('#stg_updates_interval') ){
      value = Math.abs($D('#stg_updates_interval').value);
      value = (isNaN(value)||value <= 0 ? 1 : (value > 99 ? 99 : value) );
      setValue(KEY_KTP+'UPDATES_INTERVAL', value.toString());
    }		
	
    // images policy 
    sets = ['stg_showimages_none', 'stg_showimages_emot', 'stg_showimages_alll'];
	cnt = sets.length;
	value = 0;
	//for(var i in sets){
	for(var i=0; i<cnt; i++){
	  if( isString(sets[i]) && $D('#'+sets[i]) && $D('#'+sets[i]).checked ){	    
		  value=$D('#'+sets[i]).value;
		  break;		
	  }
	}
	setValue(KEY_KTP+'IMGLOAD', value.toString());
	
    // node state color
    sets = ['stg_state_color_ready', 'stg_state_color_readed', 'stg_state_color_invalid'];
	cnt = sets.length;
	value = '';
	for(var i=0; i<cnt; i++){
	  if( isString(sets[i]) ){
		  var tmpVal= trimStr($D('#'+sets[i]).value);
		  cucok=tmpVal.match(/^(?:\#[0-9A-F]|\w)+$/i);
		  value+=(cucok ? cucok[0] : gvar.settings.color_state[i]) + ',';
	  }
	}
	value = value.substring(0, value.length-1);
	setValue(KEY_KTP+'NODE_STATE', value.toString());
	
	// reload settings for gvar
	getSettings();
	
	// reload css to body
	GM_addGlobalStyle( rSRC.getCSS_fixed(gvar.settings.fixed_preview), 'css_position', 1 );
	
    // done save then close layer
	tPOP.closeLayerBox('hideshow');
   }
   
   ,reset: function(){
    var home=['http:/'+'/www.kaskus.us/showthread.php?t=3170414','http:/'+'/userscripts.org/topics/???'];
	var space='';for(var i=0;i<20;i++)space+=' ';
	var msg = ''
     +'This will delete/reset all saved data.\nThings that might be conflict with your Kaskus Thread Preview.'     
     +'\nPlease report any bug or some bad side effects here:'+space+'\n'+home[1]+'\nor\n'+home[0]+
     '\n\n'+HtmlUnicodeDecode('&#187;')+' Continue with Reset?';

    if( confirm(msg) ) {
	    var keys = ['IMGLOAD','FIXED_PREVIEW','SCROLL_THREAD','THEN_GOTHREAD'
	              ,'UPDATES','UPDATES_INTERVAL','RELOAD_AFTERSENT'
				  ];
        for(var i in keys)
          try{ if(isString(keys[i])) GM_deleteValue(KEY_KTP + keys[i]); }catch(e){};		
        window.setTimeout(function() { location.reload(false); }, 300);
	}
   }
 }
 ,event_Static: function(){

    // sticky toggle
    on('click', $D("#imgsticky"), function(){ tPOP.toggleSticky(); });

	// close button
    on('click', $D("#imghideshow"), function(){ tPOP.closeLayerBox('hideshow'); });	
    // cancel preview
    on('click', $D('#preview_cancel'), function(){ SimulateMouse($D('#imghideshow'), 'click', true); } );
	
	// #head_layer; #atoggle
    if($D('#head_layer')) on('dblclick',$D('#head_layer'),function(){ tPOP.toggleCollapse(); $D('#atoggle').focus(); });
    if($D('#atoggle')) on('click',$D('#atoggle'),function(){ tPOP.toggleCollapse(); });

	// detect window resize to resize textbox and controler wraper
    on('resize', window, function() { controler_resizer() });	
	
	// qr_button
	if(gvar.user.id && $D('#qr_button'))
     on('click', $D('#qr_button'), function(){
      tPOP.openQR();	  
	  tQR.init(gvar.current.newreply+'&noquote=1');
	 });
    
	// #preview_setting
    if($D('#preview_setting')) on('click', $D('#preview_setting'), function(e){ tPOP.settings.toggle_partial() });
  }
 ,event_Userlink: function(){
    var nodes = $D('//a[contains(@class,"ktp-user_link")]');
    if(nodes.snapshotLength > 0){
     for(var i=0, lg=nodes.snapshotLength; i<lg; i++) {
	    node = nodes.snapshotItem(i);
	    on('click', node, function(e){
		  var cucok, uid, prev;		  
		  var par, el_img, el, Attr, sp_1, sp_par, dumy_el_img;
	      e=e.target||e;
		  if(e.nodeName!='A') e = e.parentNode;
		  if(e.href){
		    cucok = e.href.match(/\?u=(\d+)/);
			uid = (cucok ? cucok[1]:false);
			if($D('#img_ngaskuser')){
		      prev = $D('#img_ngaskuser').getAttribute('rel');
		 	  if(prev == uid) {
			    if($D('#post_detail')){
			     $D('#post_detail').innerHTML = '';
				 $D('#post_detail').style.setProperty('display','none','');
				 return;
				}
			  }
		    }
			var loaduser = function(uid){
			   
			   par = createEl('div', {});
			   Attr = {id:'dumy_img_ngaskuser',border:'0',src:gvar.ktpKaskus+'kaskus.php?u='+uid,style:"display:none;"};
			   dumy_el_img = createEl('img', Attr);			   
			   
			   Attr = {id:'img_ngaskuser',border:'0', style:"display:none;",rel:uid,title:'Powered by '+gvar.ktpKaskus.replace(/(?:http|www\.|[\:\/])/g,'')};
			   el_img = createEl('div', Attr);
			   sp_par = createEl('span', {id:'powby','class':'powby',style:'visibility:hidden;'}, '&#8471; &#183; ');
			   sp_1 = createEl('span', {'class':'b'}, 'kaskus'); Dom.add(sp_1, sp_par);
			   sp_1 = createEl('span', {'class':'or'}, 'badge'); Dom.add(sp_1, sp_par);
			   //sp_1 = createTextEl('.us'); Dom.add(sp_1, sp_par);
			   Dom.add(sp_par, el_img);
			   Dom.add(el_img, par);			   
			   
			   if($D('#post_detail')){
			     $D('#post_detail').innerHTML = '';
				 Dom.add(par, $D('#post_detail'));
				 $D('#post_detail').innerHTML+=''
				  +"\n\n"+'<style type="text/css">'
				  +'#img_ngaskuser{background:transparent url("'+gvar.ktpKaskus+'kaskus.php?u='+uid+'") no-repeat 0 0;}'
				  +'</style>';
			   }
			};
		    loaduser(uid);
			if($D('#post_detail')) {
			  $D('#post_detail').style.setProperty('display','block','');
			  $D('#post_detail').innerHTML+= '<div id="wait_userlink">'+_LOADING+'</div>';
			}
	        gvar.sITryLoadCard = window.setInterval(function() {
              var img = dumy_el_img;
		      if(img && img.height || img.width){
	            clearInterval(gvar.sITryLoadCard);
		        if($D('#img_ngaskuser')) $D('#img_ngaskuser').style.display = 'block';
		        if($D('#powby')) $D('#powby').style.visibility = 'visible';
				if($D('#wait_userlink')) Dom.remove($D('#wait_userlink'));
				dumy_el_img = null;
	        	return;
	          }
            }, 150);
			
		  }
	    });
	 }
    }

  }
 ,event_Additional: function(){
    // additional events 
    // #show_images #show_emotes #open_spoilers
    if(gvar.current.cEMOTE && $D('#show_emotes')){
      on('click', $D('#show_emotes'), function(e){
        e=e.target||e;
    	var _ret = tTRIT.parse_image(gvar.current.content, 'img', 1);
    	$D('#preview_content').innerHTML = gvar.current.content = _ret;
    	Dom.remove(e);
      });
      $D('#show_emotes').style.setProperty('display','inline','important');
    }
    if(gvar.current.cIMG && $D('#show_images')){
        on('click', $D('#show_images'), function(e){
           e=e.target||e;
           var _ret = tTRIT.parse_image(gvar.current.content, 'img', 2);
           $D('#preview_content').innerHTML = gvar.current.content = _ret;
    	   Dom.remove(e);
        });
        $D('#show_images').style.setProperty('display','inline','important');
    }
    // re-evaluate for spoiler button 
    var nodes = $D('//input[@type="button" and @value and @onclick]', $D('#preview_content'));
    gvar.current.cSPL = (nodes.snapshotLength > 0);
    if( gvar.current.cSPL ){
       if($D('#open_spoilers')){
        on('click', $D('#open_spoilers'), function(e){
    	  e = e.target||e;
    	  var inode, show = (e.value.indexOf("Show")!=-1);
    	  inode = getTag('input');
    	  if(inode.length > 0)
    	    for(var i=0; i<inode.length; i++){
    	      if(show && inode[i].value=="Show") {
    			  inode[i].click();
    			  inode[i].value = "Hide";					
    		  }else if(inode[i].value=="Hide") {
    			  inode[i].click();
    			  inode[i].value = "Show";
    		  }				  
    	    }
    	  e.blur();
    	  e.value = (show ? 'Hide':'Show')+' Spoilers';
    	  inode = $D('//div[@id="preview_content"]', null, true);
    	  if(inode)
    	    gvar.current.content= inode.innerHTML;
    	  else
    	    gvar.current.content= $D('#preview_content').innerHTML;
    	});
       }
       $D('#open_spoilers').style.setProperty('display','inline','important');
    }

	var kasi_jarak = (gvar.current.cEMOTE || gvar.current.cIMG || gvar.current.cSPL || gvar.LPOST.pid);
	$D('#thread_separator').style.setProperty('display',(kasi_jarak  ? '':'none'), '');
    if( !gvar.current.isLastPost ) {	  
	  if( $D('#last_post') && $D('#remotePID_'+gvar.LPOST.pid) )
        on('click', $D('#last_post'), function(){ SimulateMouse($D('#remotePID_'+gvar.LPOST.pid), 'click', true); });		
	}
 
  } // end addition events
 
 ,openQR: function(){
    $D('#qr_container_head').style.display='';
	$D('#collapseobj_quickreply').style.display='';
	
	// change from fixed to absolute is a must..!!
	tPOP.toggleSticky(false, 'quickreply');
	Dom.remove($D("#imgsticky"));
	
	// moving link to #button_preview
	if( $D('#button_preview') && $D('#preview_cancel') ){
		$D('#button_preview').insertBefore($D('#preview_cancel'), $D('#button_preview').firstChild);
		$D('#preview_cancel').style.setProperty('float','left','important');
		removeClass('cyellow', $D('#preview_cancel')); 
	}
	
	if($D('#tr_qr_button')) Dom.remove('tr_qr_button');
	if($D('#qr_container'))
	   $D('#qr_container').innerHTML = '<div id="preview_loading">'+_LOADING+'</div>';
  }
 ,toggleQuoting: function(isFetching){
    if(isUndefined(isFetching)) isFetching = false;
     if($D('#quote_loading')) $D('#quote_loading').style.display=(isFetching ? '' : 'none');
	 if($D('#btn_quote_reply')) $D('#btn_quote_reply').style.display=(isFetching ? 'none' : '');

 }
 ,toggleSticky: function(flag, caller){
    var obj= $D('#popup_container');
    // flag ? doFixed :doAbs
    if(isUndefined(flag))
      flag = (gvar.settings.fixed_preview === false);
    Dom.g('css_position').innerHTML = rSRC.getCSS_fixed(flag);
    var yNow = parseInt(ss.getCurrentYPos());
    
    var newOfset = (yNow==0 ? gvar.offsetLayer : yNow+( ($D('#preview_content').clientHeight+$D('#qr_container').clientHeight) > (parseInt(getScreenHeight())-gvar.offsetMaxHeight-gvar.offsetLayer) ? 0 : gvar.offsetLayer) );
    var vnewtop = (flag ? gvar.offsetLayer : newOfset);
    obj.style.setProperty('top', vnewtop+'px', '');
    if($D("#imgsticky"))
      $D("#imgsticky").src = (flag ? gvar.B.sticky1_png : gvar.B.sticky2_png );
    
    if( isUndefined(caller) ){  // dont save the state when caller is define | asumed from quickreply
      setValue(KEY_KTP+'FIXED_PREVIEW', (flag ? '1' : '0') );
    }
    gvar.settings.fixed_preview = (flag);
  }
 ,toggleCollapse: function(partial){
    var el, show, tohide = ['vbform','thread_tools','threadpost_navi','thread_separator','tbl_separator'];
    show = ($D('#row_content').style.display!='none');
	gvar.isExpanded = !show;
	if(isUndefined(partial)){
	    $D('#row_content').style.display = (show ? 'none' : '');
        for(var i=0; i<tohide.length; i++){
           if(!isString(tohide[i])) continue;
           el = Dom.g( tohide[i] );
           if(el) el.style.display = (show ? 'none' : '');
        }
	    if( gvar.current.isLastPost && !gvar.current.cEMOTE && !gvar.current.cIMG && !gvar.current.cSPL )
	      if($D('#thread_separator')) $D('#thread_separator').style.display='none';
        if($D('#qr_container_head').style.display!='none') Dom.g('button_preview').style.display = (show ? 'none' : '');
	    var img = $D('#collapseimg_quickreply');
	    if(img){
	      var src = img.getAttribute('src');
	      img.setAttribute('src', (src && show ? src.replace('.gif','_collapsed') : src.replace('_collapsed.gif','') ) + '.gif' );
	    }
	}
	if(!show && $D('#setting_container') && $D('#setting_container').style.display!='none'){
	  $D('#setting_container').innerHTML = '';
	  $D('#setting_container').style.display='none';
	}
  }

 ,imediateStop: function(){
    if(gvar.sITryBlinkRow) clearInterval(gvar.sITryBlinkRow);
	if(!isString(gvar.current.cRow)) removeClass('selected_row', gvar.current.cRow);
 }
 ,closeLayerBox: function(tgt){
	if(window.stop !== undefined){window.stop();}
	else if(document.execCommand !== undefined){document.execCommand("Stop", false);}

	gvar.blinkRow=0;
	if(!isString(gvar.current.cRow)) {
	  var lastRow = gvar.current.cRow;
	  if(gvar.settings.thread_lastscroll && gvar.settings.fixed_preview){
	    ss.STEPS = 21;
	    ss.smoothScroll( lastRow, null );
	  }	  
	  gvar.sITryBlinkRow = window.setInterval(function() {
	    var iLastRow = gvar.current.cRow;
        if(gvar.blinkRow >= 5){
	      clearInterval(gvar.sITryBlinkRow);
	  	  removeClass('selected_row', iLastRow);
		  gvar.current = {};
	  	  return;
	    }
	    gvar.blinkRow++;
		if(typeof(iLastRow.getAttribute('class'))=='string' && iLastRow.getAttribute('class').trim()!=""){
	      if(iLastRow.getAttribute('class').indexOf('selected_row')!=-1)
	        removeClass('selected_row', iLastRow);
	      else
			addClass('selected_row', iLastRow);
		}else{
		  iLastRow.setAttribute('class', 'selected_row');
		}
      }, 300);
	  
	}else{
	  // blink|after-load the node
	  var cNode = $D(gvar.current.cRow);
	  if(cNode){
	    cNode.innerHTML = '<div class="ktp-loading" style="display:inline-block;padding:0 0 2px 5px;"></div>';
		gvar.sITryBlinkRow = window.setTimeout(function() {
		  clearTimeout(gvar.sITryBlinkRow);
		  cNode.innerHTML = '[+]';
		}, 900);
	  }
	}
	//restore the meta refresh
	var head = getTag('head');
	if( isDefined(head[0]) && gvar.meta_refresh ){
	  //Dom.add(gvar.meta_refresh, head[0]);
	  head[0].appendChild( gvar.meta_refresh.cloneNode(true) );
	}
	Dom.remove( Dom.g(tgt) );	
	if( gvar.isExpanded && !gvar.settings.thread_lastscroll ) 
	  window.scrollTo(0,(isDefined(gvar.LastScrollTop) ? gvar.LastScrollTop:0) );
  }
}; // end tPOP

var tQR = {
  init: function(fetch_uri){
	if(!gvar.user.isDonatur && gvar.isKaskus) gvar.sITryFocusOnLoad = window.setInterval(function() {
      if ($D('#recaptcha_response_field')) {
	    clearInterval(gvar.sITryFocusOnLoad);
		on('keydown', $D('#recaptcha_response_field'), function(e){
            var C = (!e ? window.event : e );
			var A = C.keyCode ? C.keyCode : C.charCode;
            if( A===13 ){ // mijit enter
                SimulateMouse($D('#preview_submit'), 'click', true);
                C = do_an_e(C);
            }else if( A===9 ){ // mijit tab
				$D('#preview_submit').focus();
                C = do_an_e(C);
            }else if( (C.altKey && A===82) || (A===33||A===34) /*Alt+R(82) | Pg-Up(33) | Pg-Down(34)*/ ) {
                SimulateMouse($D('#hidrecap_reload_btn'), 'click', true);
				C = do_an_e(C);
			}
        });
        // reorder tabindex //'recaptcha_response_field',
		Dom.g('recaptcha_response_field').setAttribute('tabindex', '202');
		var reCp_field=['recaptcha_reload_btn','recaptcha_switch_audio_btn','recaptcha_switch_img_btn','recaptcha_whatsthis_btn'];
		for(var i=0; i<reCp_field.length; i++)
		  if( $D('#'+reCp_field[i]) ) $D('#'+reCp_field[i]).setAttribute('tabindex', '21'+(i+1) + '');		
		
		Dom.g(gvar.id_textarea).removeAttribute('disabled');
      } // end #recaptcha_response_field
    }, 200); // end sITryFocusOnLoad
    
    tQR.fetch(fetch_uri);
  }

 ,isLoaded: function(){
    return ($D('#loggedin_as') && $D('#loggedin_as').innerHTML!='');
  }
 ,event_TPL_vB: function(){
	on('click', $D('#textarea_clear'), function(){ vB_textarea.clear(); });	
	//#preview_submit
    if($D('#preview_submit'))
      on('click', $D('#preview_submit'), function(){
        var validate= ( !gvar.user.isDonatur && gvar.isKaskus ? tQR.prepost_QR() : true );
		if(validate) tQR.post();
      });
	//#then_gotothread
	if($D('#then_gotothread'))
	  on('click',$D('#then_gotothread'),function(e){
	    e = e.target||e;
		setValue(KEY_KTP+'THEN_GOTHREAD', (e.checked ? '1':'0'));
		gvar.settings.then_goto_thread = ( e.checked );
	  });		
	if($D('#vbform')) on('submit',$D('#vbform'),function(e){
	  var C = (!e ? window.event : e ); C = do_an_e(C);
	});
		
	// #atitle
	if($D('#atitle'))
	 on('click', $D('#atitle'), function() {
      $D('#input_title').style.width=(Dom.g(gvar.id_textarea).clientWidth-80)+'px';
      var disp=$D('#titlecont');
      disp.style.display=(disp.style.display=='none' ? 'block':'none');
      $D('#atitle').innerHTML = '['+(disp.style.display=='none'?'+':'-')+']';
	  if(disp.style.display!='none')
        window.setTimeout(function() { try{$D('#input_title').focus();}catch(e){}; }, 100);
      else
        window.setTimeout(function() { try{Dom.g(gvar.id_textarea).focus();}catch(e){}; $D('#input_title').value=''; }, 100);
     }); // #atitle
	// #gvar.id_textarea textarea
	if(Dom.g(gvar.id_textarea))
	 on('keydown', Dom.g(gvar.id_textarea), function(e){
	    var C = (!e ? window.event : e );
		var CSA = (C.ctrlKey ? '1':'0')+','+(C.shiftKey ? '1':'0')+','+(C.altKey ? '1':'0');
		var A = C.keyCode ? C.keyCode : C.charCode;
		if( A===9 ){ // mijit tab
			if($D('#recaptcha_response_field')) $D('#recaptcha_response_field').focus();
            C = do_an_e(C);
        }else if(CSA=='1,0,0' && A===13){ // Ctrl + Enter
		    SimulateMouse($D('#preview_submit'), 'click', true);		
            C = do_an_e(C);
		}
	 });

	// smile event
    par = $D('#vB_Editor_001_cmd_insertsmile');   
    if(par) {
      on('click', par, function(e){ tQR.create_smile_tab(e); });
      on('mouseout', par, function(e){
        e.target||e;
        window.setTimeout(function() {
          obj = $D('#vB_Editor_001_cmd_insertsmile_img');
          if(obj && $D('#smile_cont').style.display!=''){
			obj.style.backgroundColor='transparent';
            obj.style.border='1px solid transparent';
          }
        }, 10);
      });     
      on('mouseover', par, function(e){
        e.target||e;
        window.setTimeout(function() {
          obj = $D('#vB_Editor_001_cmd_insertsmile_img');
          if(obj && $D('#smile_cont').style.display!=''){
			obj.style.backgroundColor='#B0DAF2';
            obj.style.border='1px solid #2085C1';
          }
        }, 10);
      });     
    } // end #vB_Editor_001_cmd_insertsmile

  }
 ,fetch: function(pid){
    // colecting necessary hidden value
	// no need supply domain for multi-site support
	//tQR.uri_lastFetch = gvar.domain+'newreply.php?do=newreply&p='+pid;
	tQR.uri_lastFetch = './newreply.php?do=newreply&p='+pid;
    getFetch(tQR.uri_lastFetch, tQR.fetch_cb, true);
  }
 ,fetch_cb: function(reply_html){
	if( !reply_html ) return;
	reply_html = reply_html.responseText;
	tPOP.toggleQuoting(false);
	// parse response then fill hidden values
	gvar.current.qr_fetch = tQR.parse_fetch(reply_html);
	

	if(gvar.current.qr_fetch === null){
	   tQR.fetch_error();
	}else if(gvar.current.qr_fetch[0]==false){	   
	   
	   tQR.fetch_error(false, gvar.current.qr_fetch[1]);
	   
	}else{
	   var snapTo = function(){
	    if(gvar.current.qr_fetch === null)
		  tQR.fetch_error(true);
	    vB_textarea.focus();
		if(gvar.settings.autoload_smiley[0]=='1')
         tQR.create_smile_tab( $D('#vB_Editor_001_cmd_insertsmile') );
		vB_textarea.setElastic(gvar.id_textarea, gvar.maxH_editor);
	  };
	
	  if( !gvar.current.QR_isLoaded ){
	    $D('#qr_container').innerHTML = rSRC.getTPL_qr();	
	    tQR.event_TPL_vB();
	    $D('#loggedin_as').innerHTML = '&nbsp;'
	     +HtmlUnicodeDecode('&#8592;')+'[<small>Logged in as</small>&nbsp;<a class="cyellow" href="./member.php?u='+gvar.user.id+'">'
	     +gvar.user.name+'</a>'+(gvar.user.isDonatur ? ' <b class="cred">$</b>':'')+']';
	    $D('#button_preview').style.display = '';
	    gvar.current.QR_isLoaded = 1;
	  }
	  vB_textarea.init();
	  vB_textarea.Obj.style.height='100px';
	  if( gvar.current.qr_fetch!=vB_textarea.content )
	    vB_textarea.add(gvar.current.qr_fetch);
		
	  if(gvar.user.isDonatur || !gvar.isKaskus){
	      // kill capcay container
	      Dom.remove('recapctha_header');
	      Dom.remove('recaptcha_cont');
		  
	  }else if( !$D('#recaptcha_response_field') ){
	  
		// click to build recapctha & keep click to reload
        SimulateMouse($D('#hidrecap_btn'), 'click', true);
	  }
	  ss.STEPS = 10; // scroll speed; smaller is faster
      ss.smoothScroll( Dom.g(gvar.id_textarea), function(){ snapTo() } );
	}
  }

 ,fetch_error: function(isQuote, msg){
    var notice, msg = (!msg ? 'Fetch failed, server might be busy. <a href="javascript:;" id="try_again_now">Try again</a>' : msg);
	isQuote = (isUndefined(isQuote) ? false : isQuote);
	if( !isQuote ){
      notice = $D('#qr_container');	
	  notice.innerHTML = '<div class="g_notice-error g_notice" style="display:block;">'+msg+'</div>';
	}else{
      notice = $D('#quoted_notice');
	  addClass('g_notice-error', notice);
	  notice.innerHTML = msg;
	  notice.setAttribute('style','display:block;');	  
	}
	if($D('#try_again_now')) on('click', $D('#try_again_now'), function(){
	  if(notice) notice.innerHTML = '<div>'+_LOADING+'</div>';
	  tQR.fetch(tQR.uri_lastFetch);
	});
  }
 ,unescapeHtml: function(text){
    if(!text) return '';
    var temp = createEl('div',{},text);
    var cleanRet='', tL=temp.childNodes.length;
    for(var i=0; i<tL; i++){
       if(typeof(temp.childNodes[i])!='object') continue;
       cleanRet += temp.childNodes[i].nodeValue;
    }
    try{temp.removeChild(temp.firstChild);}catch(e){}
    return cleanRet;
  }
 ,parse_fetch: function(text){
    var cucok, re, ret={};
	if(text.indexOf('vbform')==-1) {
	   if(cucok = text.match(/<div\s*style=[\'\"]margin\:\s*10px[\'\"]>([^<]+)/im)){
	     return [false, cucok[1].replace(/\n|\r/,' ')];
	   }else{
	     return null;
	   }
	}
    var hidden_name = {
      "qr_hash": "humanverify\\\[hash\\\]"
     ,"qr_securitytoken": "securitytoken"
     ,"qr_do":"do","qr_t":"t","qr_p":"p"
     ,"qr_specifiedpost": "specifiedpost"
     ,"qr_loggedinuser": "loggedinuser"
    };
    
    for(var hid in hidden_name){
      if(!isString(hidden_name[hid])) continue;
	  
	  re = new RegExp('name=\\\"'+hidden_name[hid]+'\\\"\\\svalue=\\\"([^\\\"]+)', "i");
	  if( cucok = text.match(re) )
	     if( Dom.g(hid) ) Dom.g(hid).value = cucok[1];
    } // end for   
    // isDonatur check
    gvar.user.isDonatur = (gvar.isKaskus && text.indexOf('recaptcha_response_field')==-1);
    
	// additional opt
	tQR.build_additional_opt(text);
	
	// get textarea
    // this regexp failed on symbolize userid : http://bit.ly/9A9GMg
    //match = /<textarea\sname=\"message\"(?:[^>]+.)([^<]+)*</i.exec(text);    
    var parts, pos;   
    // back to stone-age method :hammer:
    if(text.indexOf(gvar.id_textarea)==-1) return null;
    pos = [ text.indexOf(gvar.id_textarea), text.lastIndexOf('</textarea') ];
    parts = text.substring(pos[0], pos[1]);
    pos[0] = parts.indexOf('>');
    parts = parts.substring( (pos[0]+1), parts.length);
	
	
	
    return (parts ? tQR.unescapeHtml(parts) : '');   
  }
 ,additional_opt_parser: function(html){   
   var pos = [html.indexOf('collapseobj_newpost_options'), html.lastIndexOf('</select')];
   var rets = html.substring(pos[0], pos[1]);
   var par_adt_opt = $D('#button_preview');
   pos[0] = rets.indexOf('<select');
   rets = rets.substring(pos[0], pos[1]);
   var selects = rets.split('</select'), sL=selects.length;
   for(var i=0;i<sL;i++){
     if(!isString(selects[i]) || !selects[i].match(/<select\sname\=/)  ) continue;
     var fdname, el, cucok = /<select\sname\=\"([^\"]+)/.exec(selects[i]);
     if(cucok && cucok[1]!='rating'){ // rating will be showed-up on qr-optional dropdown
       fdname = cucok[1];
       cucok = /<option\svalue\=\"([^\"]+)\"\sselected\=/.exec(selects[i]);
       opt_val = (cucok ? cucok[1] : '0');
       el = createEl('input', {name:fdname, value:opt_val, type:'hidden'});
       Dom.add(el, par_adt_opt);
     }
   }
  }
 ,buildRate: function(){
   var el,par,sel;
   var rates = { '5':'5: Excellent', '4':'4: Good', '3':'3: Average', '2':'2: Bad', '1':'1: Terrible' };
   par = createEl('div', {style:'float:left'}, ' '+HtmlUnicodeDecode('&#8212;') + ' Rating:&nbsp;');
   sel = createEl('select', {name:'rating',tabindex:'6'});
    Dom.add(sel, par);
   el=createEl('option', {value:0},'Choose a rating');
    Dom.add(el, sel);
   el=createEl('optgroup', {label:' '});
    Dom.add(el, sel);
   sel=el;
   for(var i in rates){
     if(!isString(rates[i])) continue;
     el=createEl('option', {value:i},rates[i]);
     Dom.add(el, sel);
   }
   return par;
  }
 ,build_additional_opt: function(html){
	// create rating, and hidden element of additional options
    tQR.additional_opt_parser(html);
    var rate = (html.indexOf('Rate Thread')!=-1 ? tQR.buildRate() : false);
    if($D('#rate_thread')){
      $D('#rate_thread').innerHTML= '';
      Dom.add(rate ? rate : createTextEl('Thread Rated'), $D('#rate_thread'));
	  $D('#rate_thread').style.display='';
    }
  }
 ,prepost_QR: function(){
    var ret;
	var rrf = $D('#recaptcha_response_field');
    if(!rrf) return;
    ret = (!rrf || (rrf && rrf.value.trim()=='') ? false : true );
    if( !ret ){
      alert('Belum mengisi reCapcay, coy!');
      window.setTimeout(function() { $D('#recaptcha_response_field').focus();}, 200)	 
    }
    return ret;
  }
 ,lockInput: function(flaglock){
    var el;
    if(isUndefined(flaglock)) flaglock = true; // do lock is default
    if(flaglock){
        vB_textarea.readonly();
        el = $D('#recaptcha_response_field');
        if(el) {
          el.setAttribute('readonly',true);
          addClass('txa_readonly', el);
        }
        el = $D('#preview_submit');
        if(el) {
          el.setAttribute('disabled','disabled');
          addClass('twbtn-disabled', el);
          el.value='Posting...';
        }
        el = $D('#then_gotothread');
        if(el) {
          el.setAttribute('disabled','disabled');
          //addClass('twbtn-disabled', el);
        }
    } else {
        vB_textarea.enabled();
        el = $D('#recaptcha_response_field');
        if(el) {
          el.removeAttribute('readonly');
          removeClass('txa_readonly', el);
        }
        el = $D('#preview_submit');
        if(el) {
          el.removeAttribute('disabled');
          removeClass('twbtn-disabled', el);
          el.value=' Post ';
        }
        el = $D('#then_gotothread');
        if(el) {
          el.removeAttribute('disabled');
          //addClass('twbtn-disabled', el);
        }
		if(gvar.current.oriText) {
		  Dom.g(gvar.id_textarea).value=gvar.current.oriText + "\n\n";
		  gvar.current.oriText = null;
		}
    }
	if($D('#tab_close')) SimulateMouse($D('#tab_close'), 'click', true);
  }
 ,buildQuery: function(){
    var hidden = getTag( 'input', $D('#vbform') );
    var el, q='';
	if(!gvar.isKaskus && $D('#qr_do'))
	   $D('#qr_do').value = 'postreply';
	   
    for(var h in hidden)
      if( typeof(hidden[h].getAttribute)!='undefined' && hidden[h].getAttribute('type')=='hidden' )
        q+='&' + hidden[h].getAttribute('name') + '=' + encodeURIComponent(hidden[h].value);
    q+= '&sbutton='+(!gvar.isKaskus?'Submit+Reply':'Reply+Post');
  
    el = $D('#recaptcha_response_field');
    if(el) q+= '&recaptcha_response_field='+$D('#recaptcha_response_field').value;
    
    var adtnl = [gvar.id_textarea, 'input_title']; // ids of textarea message and title and recaptcha
    el = Dom.g(adtnl[0]);
    if( el && el.value!='' && el.value!=gvar.silahken ){
      var msg = trimStr(el.value);
      msg = tQR.sCustom.parser(msg); // smiley parser...
      msg = tQR.template_wrapper(msg); // template & SiGi ntar ajah...
      q = '&' + el.getAttribute('name') + '=' + encodeURIComponent( toCharRef(msg) )  + q;
    }
    el = Dom.g(adtnl[1]);
    if( el && el.value!='' )
      q = '&' + el.getAttribute('name') + '=' + encodeURIComponent(el.value) + q;
    return q;
  }
 ,post: function(){
    var spost = tQR.buildQuery();
	tQR.lockInput(true);

	if(spost===false) {
	  show_alert('Upss, halted..::..e.3278', 0);
      return false;
    }
	GM_XHR.uri = gvar.current.action;
    GM_XHR.cached = true;
    GM_XHR.request(spost.toString(), 'POST', tQR.post_cb);
 }
 ,post_cb: function(reply_html){
    if( !reply_html ) return;
	reply_html = reply_html.responseText;
	
	var retpost = tQR.parse_post(reply_html);
	
	var notice = $D('#quoted_notice');
	if(retpost.error != 0){
	   addClass('g_notice-error', notice);
	   notice.innerHTML = retpost.msg.replace(/The\s*string/,'The reCapcay');
	   notice.setAttribute('style','display:block;');
	   
	   tQR.parse_fetch(reply_html); // updating hidden value
	   tQR.lockInput(false); // reopen the hive :D
	   // reload capcay
	   SimulateMouse($D('#hidrecap_reload_btn'), 'click', true);
       return;
    }else{
	   var msg = 'Thank you for posting!';
	   Dom.remove( $D('#preview_submit') );
	   if(gvar.settings.then_goto_thread && isDefined(retpost.redirect) ){
	     msg+= ' Redirecting...';
		 tQR.after_post('redirect', function(){ location.href=retpost.redirect; });
	   }else{
	     msg+= ' Closing...';
		 tQR.after_post('close', function(){ 
		   tPOP.closeLayerBox('hideshow');
		   if(gvar.settings.reload_aftersent) window.setTimeout(function() { location.href = (location.href.replace(/\&page=\d+/,'')); }, 50);
		 });
	   }
	   $D('#qr_container').innerHTML = '<div id="quoted_notice" class="g_notice" style="display:block;">'+msg+'</div>';
	}

  }
 ,parse_post: function(text){
   var cucok, ret={error:0,msg:''};
   if(text.indexOf('POSTERROR')!=-1){
    // there's some error
	cucok = text.match(/<ol><li>([^\<]+)<\/li><\/ol>/i);
	if(cucok) ret = {error: 1, msg:cucok[1] };
   }else if( cucok = text.match(/<meta\s*http\-equiv=[\"\']Refresh[\"\']\s*content=[\"\']\d+;\s*URL=([^\"\']+)/i) ){
     // success
	 ret = {error: 0, redirect:cucok[1] };
   }
   return ret;
  }
 ,after_post: function(mode, fn){
    if(isUndefined(mode)) mode = 'close';
    gvar.blinkRow=5;
    var myvar = "";
    var mcallback = (typeof(fn)=='function' ? fn : null);
	window.status = (mode=='close' ? "Closing..." : "Redirecting...");
    gvar.sITryDonePost = window.setInterval(function() {
      myvar+= " .";
      window.status+= myvar;
      if(gvar.blinkRow > 0){
        gvar.blinkRow -= 1;
      }else{
   	    clearInterval(gvar.sITryDonePost);
        if(mcallback) mcallback();
      }
    }, 150); 
  }

// smilies
 ,create_smile_tab: function(caller){
  var parent = $D('#smile_cont');
  if(parent.innerHTML!='') {
    parent.style.display=(parent.style.display=='none' ? '':'none');
    force_focus(10);
    return;
  }
  var cont,el,el2,Attr,img,imgEl;
  var scontent = ['skecil_container','sbesar_container','scustom_container'];
  
  // create tabsmile
  cont = createEl('ul',{id:'tab_parent','class':'ul_tabsmile'});  
  // tab skecil
  el2 = createEl('a',{href:'javascript:;','class':'current',id:'remote_'+scontent[0]},'kecil');
  on('click', el2, function(e){ 
    tQR.toggle_tabsmile(e); 
    var tgt = Dom.g(scontent[0]);
    if(tgt && tgt.innerHTML=='')
        tQR.insert_smile_content(scontent[0],gvar.smiliekecil);
  });
  el = createEl('li',{'class':'li_tabsmile'});
  Dom.add(el2,el); Dom.add(el,cont);
  // tab sbesar
  el2 = createEl('a',{href:'javascript:;','class':'',id:'remote_'+scontent[1]},'besar');
  on('click', el2, function(e){
    tQR.toggle_tabsmile(e);
    var tgt = Dom.g(scontent[1]);
    if(tgt && tgt.innerHTML=='')
        tQR.insert_smile_content(scontent[1],gvar.smiliebesar);
  });
  el = createEl('li',{'class':'li_tabsmile'});
  Dom.add(el2,el); Dom.add(el,cont);
  // tab custom
  el2 = createEl('a',{href:'javascript:;','class':'',id:'remote_'+scontent[2]},'[+] ');
  on('click', el2, function(e){
    tQR.toggle_tabsmile(e);
    var tgt = Dom.g(scontent[2]);
    if(tgt && tgt.innerHTML=='')
        tQR.insert_smile_content(scontent[2],gvar.smiliecustom);
  });
  el = createEl('li',{'class':'li_tabsmile'});
  Dom.add(el2,el); Dom.add(el,cont);
  // tab close
  el2 = createEl('a',{href:'javascript:;',id:'tab_close',title:'Close Smiley'},'&nbsp;<b>X</b>&nbsp;');
  on('click', el2, function(){
    $D('#smile_cont').style.display='none';
	force_focus(10); 
    var obj = $D('#vB_Editor_001_cmd_insertsmile_img');
	if(obj){
      obj.style.backgroundColor='transparent';
      obj.style.border='1px solid transparent';
	}
    return; 
  });
  el = createEl('li',{'class':'li_tabsmile tab_close'});
  Dom.add(el2,el); Dom.add(el,cont);
  // tab more
  el = createEl('li',{'class':'li_tabsmile tab_close'},'<a href="javascript:;" onclick="open_win_smiley();" title="Show all smilie">[ More ]</a>');
  Dom.add(el,cont);
  
  Dom.add(cont,parent);
  // --- end tab creation ---
  
  // populate smiley set | custom smiley will also loaded from here
  rSRC.getSmileySet();  

  // (blank) container for smiley contents
  for(var i=0; i<scontent.length; i++){
    Attr={id:scontent[i], 'class':'smallfont', style:'display:none;' };
    cont = createEl('div',Attr);
    Dom.add(cont,parent);
  }
  
  if(gvar.settings.autoload_smiley[0]=='1'){
    var id= ('s'+gvar.settings.autoload_smiley[1]+'_container');
    tQR.insert_smile_content(id, eval('gvar.smilie'+gvar.settings.autoload_smiley[1]));
    window.setTimeout(function() { SimulateMouse($D('#remote_'+id), 'click', true); }, 50);
  }else{
    tQR.toggle_tabsmile(Dom.g(scontent[0]));
    window.setTimeout(function(){
      SimulateMouse($D('#remote_'+scontent[0]), 'click', true); // trigger click tab for smiley kecil
      force_focus(10);
    }, 50);
  }
  parent.style.display='';
  
 }
 ,insert_smile_content: function(scontent_Id, smileyset){
  var target,dumycont,Attr,img,imgEl2,imgEl=false;
  var countSmiley=0;
  if(!scontent_Id || !smileyset) return;
  target = Dom.g(scontent_Id);
  target.innerHTML='';
  
  dumycont = createEl('div',{id:'loader_'+scontent_Id}, _LOADING);
  realcont = createEl('div',{id:'content_'+scontent_Id,style:'display:none;'});
  Dom.add(dumycont,target);
  Dom.add(realcont,target);
  if(smileyset){
    var adclass = (gvar.settings.scustom_alt ? 'ofont qrsmallfont nothumb' : 'scustom-thumb');
    for (var i in smileyset) {
     img=smileyset[i];
     if( !isString(img) ){
       if(scontent_Id=='scustom_container'){
          Attr={href:encodeURI(img[0]),title:'[['+img[1]+'] '+HtmlUnicodeDecode('&#8212;')+img[0],
		        src:img[0], alt:'_alt_'+img[1],'class':adclass };
          // gak pake thumbnail ?
          if(gvar.settings.scustom_alt) {
            imgEl = createEl('a',Attr,'[['+img[1]+']');
          }else{
            imgEl = createEl('a',Attr);
            Attr = {src:img[0], alt:'_alt_'+img[1]};
            imgEl2 = createEl('img',Attr);
            Dom.add(imgEl2,imgEl);
          }
       }else{
          Attr = {title:img[1]+' '+HtmlUnicodeDecode('&#8212;')+img[2],src:img[0],alt:img[1]};
          imgEl = createEl('img',Attr);
       }
       on('click', imgEl, function(e){ 
	      var C = e; e=e.target||e; tQR.do_smile(e); 
		  // stop default action
		  try{do_an_e(C);return false;}catch(ev){} 
	   });
       Dom.add(imgEl,realcont);
       countSmiley++;
     }else { // this is string and do replace to suitable value
       var sep, retEl= tQR.sCustom.validTag(img, true, 'view');
       if(!retEl) continue;
       if(retEl.nodeName=='B'){
         if(realcont.innerHTML!='') {
          sep = createEl('br', {});
          Dom.add(sep,realcont);
         }
         Dom.add(retEl,realcont);
         sep = createEl('br', {});
         Dom.add(sep,realcont);
       }else{
         Dom.add(retEl,realcont);
       }
     }
    }
	// make a dummy last-img that, avoid bad img on last element
	if( scontent_Id=='scustom_container' && !gvar.settings.scustom_alt) {
	    imgEl = createEl('a',{href:'javascript:;',style:'display:none;'});
        Attr = {alt:'dummy_last_img', src:gvar.domainstatic + 'images/editor/separator.gif' + '?'+String( Math.random() ).replace('0.','')};
        imgEl2 = createEl('img',Attr);
        Dom.add(imgEl2,imgEl);
		Dom.add(imgEl,realcont);
	}
  }

  if(countSmiley<=0){
    var el = $D('#loader_'+scontent_Id);
    if(el) try{ Dom.remove(el); } catch(e){el.style.display='none';};
    realcont.innerHTML = 'No Images found ';
    realcont.style.display='';
  } else {
    if(imgEl){
     // find last element
     var showContent = function(){
        el=$D('#loader_'+scontent_Id);
        if(el) el.style.display='none';
        el = $D('#content_'+scontent_Id);
        if(el) el.style.display='';
     };
     if( imgEl.firstChild && imgEl.firstChild.nodeName=='#text' || imgEl.height){
        showContent();
     }else{
        // imgEl will be IMG when scustom_alt=0, and TEXT when scustom_alt=1 
        if(imgEl.nodeName=='A') imgEl=imgEl.firstChild;
        on('load', imgEl, function(){ showContent() });
        // obj has beed loaded before this line executed
		if(imgEl.height) showContent();
     }
    }
  }
   
  // custom images ?
  if(scontent_Id=='scustom_container'){
    var el,cont;
    cont = createEl('div',{style:'margin-top:10px;padding:8px 0;border-top:1px solid #BBC7CE;'});
    el = createEl('a',{href:'javascript:;','class':'twbtn twbtn-m lilbutton',style:'padding:1px 5px;'},'Manage');
    Dom.add(el,cont);
    on('click', el, function(e){
      var imgtxta,obj,obj2,task,buff,cont_id = 'scustom_container';
      var mcPar=$D('#manage_container');
      e=e.target||e;
      task = e.innerHTML;	  
      if(task=='Manage'){
        if($D('#help_manage')) $D('#help_manage').style.display='';
        if(mcPar){
          mcPar.style.display=(mcPar.style.display=='none' ? '':'none');          
        }else{
          buff='';
          if(smileyset){
            var ret;
            for (var i in smileyset) {
             img=smileyset[i]; ret='';
             if( !isString(img) )
               buff+=img[1]+'|'+img[0]+'\n';
             else if(ret= tQR.sCustom.validTag(img, false, 'editor') )
               buff+=ret;
            }
          }
          mcPar = createEl('div',{id:'manage_container',style:'margin:0 3px 0 1px;'});
          Attr = {id:'textarea_'+cont_id,'class':'textarea txta_smileyset'};
          imgtxta = createEl('textarea',Attr,buff);
          Dom.add(imgtxta,mcPar);
          
          Attr = {'for':'scustom_alt',title:'Checked: Use tag instead of thumbnail'};
          obj = createEl('label',Attr,'Don\'t create thumbnail');
          Attr = {id:'scustom_alt',type:'checkbox'};
          if(gvar.settings.scustom_alt) Attr.checked = 'checked';
          obj2 = createEl('input',Attr);
          Dom.add(obj2,obj);
          Dom.add(obj,mcPar);
          
          Attr = {'for':'scustom_noparse',title:'Checked: custom smiley tag will not parsed'};
          obj = createEl('label',Attr,'&nbsp;&nbsp;&nbsp;Don\'t parse custom tag');
          Attr = {id:'scustom_noparse',type:'checkbox'};
          if(gvar.settings.scustom_noparse) Attr.checked = 'checked';
          obj2 = createEl('input',Attr);
          Dom.add(obj2,obj);
          Dom.add(obj,mcPar);
          
          Dom.add(mcPar, $D('#content_'+cont_id));
          try{ window.setTimeout(function() {imgtxta.focus(); imgtxta.scrollTop=imgtxta.value.length;}, 100); }catch(e){}
        }
      }else{
        // task save 
        var buff=false;
        var lastsave = getValue(KEY_KTP+'CUSTOM_SMILEY');
        var lastVal = [getValue(KEY_KTP+'SCUSTOM_ALT'), getValue(KEY_KTP+'SCUSTOM_NOPARSE')];
        imgtxta = $D('#textarea_'+cont_id);
        if(imgtxta)
           buff = tQR.sCustom.filter(imgtxta.value).toString();
        gvar.settings.scustom_alt = ($D('#scustom_alt').checked);
        gvar.settings.scustom_noparse = ($D('#scustom_noparse').checked);
        if( (buff && lastsave!=buff) || lastVal[0]!=gvar.settings.scustom_alt || lastVal[1]!=gvar.settings.scustom_noparse) {
          setValue(KEY_KTP+'SCUSTOM_ALT', (gvar.settings.scustom_alt ? '1':'0') ); //save custom alt
          setValue(KEY_KTP+'SCUSTOM_NOPARSE', (gvar.settings.scustom_noparse ? '1':'0') ); //save custom parser
          setValue(KEY_KTP+'CUSTOM_SMILEY', buff); //save custom smiley
          rSRC.getSmileySet(true); // load only custom          
          // re attach
          window.setTimeout(function() {
            tQR.insert_smile_content(cont_id, gvar.smiliecustom)
          }, 200);
        }
        //mcPar.style.display='none';
        Dom.remove(mcPar);
        if($D('#help_manage')) $D('#help_manage').style.display='none';
      }
      e.innerHTML = (task=='Manage' ? 'Save' : 'Manage');	  
    }); // end event click Manage-Save
    el = createEl('a',{id:'help_manage',href:'javascript:;','class':'twbtn twbtn-m lilbutton',style:'padding:1px 10px;margin-left:20px;display:none;',title:'RTFM'},'?');
    Dom.add(el,cont);
    on('click', el, function(){
	  alert( ''
       +'Each Smiley separated by newline.\nFormat per line:\n tag|smileylink'
       +'\n eg.\ncheers|http:/'+'/static.kaskus.us/images/smilies/sumbangan/smiley_beer.gif'
       +(!gvar.settings.scustom_noparse ? ''
       +'\n\nUse Custom Smiley BBCODE with this format:'
       +'\n eg.\n[[yourtag]' :'')
       +'');
	   try{
	    window.setTimeout(function() { $D('#textarea_scustom_container').focus(); }, 100);
	   }catch(e){}
    });
    Dom.add(cont,realcont);
  } // end when it's scustom_container
 }
 ,toggle_tabsmile: function(e){
   e=e.target||e; 
   if(!e) return;
   var elem = getTag('a',$D('#tab_parent'));
   for(var i in elem){ // hideall tab
     var id = elem[i].id;
     if(id && id.indexOf('remote_')!=-1) {
       showhide(Dom.g(id.replace('remote_','')), false); // hide container
       removeClass('current', elem[i]); // reset tab class
     }
   }
   var tgt=e.id.replace('remote_',''); 
   showhide(Dom.g(tgt), true);
   addClass('current',$D('#remote_'+tgt));
   force_focus(10);
 }
 ,do_smile: function(Obj, nospace){
  // action to do insert smile
  if(isUndefined(Obj)) return;
  var bbcode, link, tag, prehead;  
  //if(isUndefined(vB_textarea.Obj)) 
  vB_textarea.init(); // always to reupdate this.content
  if( Obj.getAttribute("alt") ) bbcode = Obj.getAttribute("alt");
  
  // custom mode using IMG tag instead
  if(bbcode.match(/_alt_.+/) || !gvar.isKaskus) {
    link=Obj.getAttribute("src");
    tag = 'IMG';
    prehead = [('['+tag+']').length, 0];
    prehead[1] = (prehead[0]+link.length);        
    vB_textarea.setValue( '['+tag+']'+link+'[/'+tag+']' + (!nospace ? ' ':''));
  }else{
    vB_textarea.setValue(bbcode + (!nospace ? ' ':'') );
  }
 }
// smilies-custom
 ,sCustom:{
    filter: function(text){
      var buf=text;
	  var sml,retbuf='',done = false;
	  var sepr = ','; // must be used on extracting from storage
      if(buf!=''){
        var tosingle = {
           '\\|{2,}' : '|'
          ,'(\\r\\n){2,}' : '\r\n{sctag:br}\r\n,'
          ,'(\\n){2,}' : '\n{sctag:br}\n'
        };
        // step -1 to strip
        buf = buf.replace(/[\[\]\,]/g,"");
        for(var torep in tosingle){
          if(!isString(tosingle[torep])) continue;
          re = new RegExp(torep, "g");
          buf = buf.replace(re, tosingle[torep])
        }
        // step -3 to validate per line    
        buf=(document.all ? buf.split("\r\n") : buf.split("\n")); // IE : FF/Chrome
        
        for(var line in buf){
           if(!isString(buf[line])) continue;
             buf[line] = trimStr ( buf[line] ); // trim perline
             sml = /([^|]+)\|(http(?:[s|*])*\:\/\/.+$)/.exec( buf[line] );
           if(sml && isDefined(sml[1]) && isDefined(sml[2]) ){ // smiley thingie ?
             retbuf+=sml[1]+'|'+sml[2]+sepr; // new separator
           }else if(sml= tQR.sCustom.validTag( buf[line], false, 'saving' ) ){ // valid tag ?
             retbuf+=sml+sepr;
           }
           done=true;
        } // end for    
      }
      return retbuf;
	}
   ,sanitize: function(text){
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
      while( do_it_again=='' || do_it_again.indexOf('1')!=-1 ){
        do_it_again = '';
        for(var idx in filter){
         if(!isString(filter[idx])) continue;
         re = new RegExp(filter[idx], "ig");
         if(ret.match(re)){
          do_it_again+='1';
          torep = re.exec(ret);      
          if(torep && isDefined(torep[1]))
            ret=ret.replace(torep[1], '');
         }else{
          do_it_again+='0'; // must diff than (do_it_again=='')
         }
        }
      }      
      return ret;   
   }
   // mode = ['editor', 'saving', 'view']
   ,validTag: function(txt, doreplace, mode){
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
          if(isDefined(doreplace) && doreplace){ // must be from view mode
            val=ret.replace(re, matches[torep][1]);
            val = tQR.sCustom.sanitize(val);
            ret = createEl(matches[torep][0],{},val);
          } else if(isDefined(mode) && mode=='editor') // editor mode and it's a BR
            if(torep=='{sctag:(br)}') {
              ret=txt.replace(re, '\n');
            }else{
              // guess it should be a title
              var title = re.exec(txt);
              if(re && isDefined(title[1])){
                val = tQR.sCustom.sanitize(title[1]);            
                ret='{title:'+val+'}\n'; 
              }else{
                ret=txt+'\n'; 
              }
            }
          break;
        }
      }
      return (cucok ? ret : false);              

   }
   ,parser: function(msg){
     // trim content and/or parse it
     msg = trimStr(Dom.g(gvar.id_textarea).value);
     if(!gvar.settings.scustom_noparse){
       //pmsg = do_parse_scustom(msg);
	   var pmsg = msg;
	   if(pmsg.length==0) return '';
       if(!pmsg.match(/\[\[([^\]]+)/gi)) return pmsg;
       var re,re_W,tag,done = false;
       var lastTag='';
       // prepared paired key and tag of custom image
       var paired = tQR.sCustom.prep_paired();    
       while(!done){
         tag = /\[\[([^\]]+)/.exec(pmsg);      
         if( tag && isDefined(tag[1]) && isDefined(paired['tag_'+tag[1]]) && tag[1]!=lastTag ){
             re_W = '\\[\\[' + tag[1].replace(/(\W)/g, '\\$1') + '\\]';
             re = new RegExp( re_W.toString() , "g"); // incase-sensitive and global, save the loop
             pmsg = pmsg.replace(re, '[IMG]'+paired['tag_'+tag[1]]+'[/IMG]');
             lastTag = tag[1];
         }else{
           done = true;
         }
       } // end while	   
       if(vB_textarea.Obj && pmsg!=msg){
	      Dom.g(gvar.id_textarea).value=pmsg;
		  msg=pmsg
	   }
     }
     return msg;
   }
   ,prep_paired: function(){
     var img,paired={};
     // preload smiliecustom database if needed
     if(!gvar.smiliecustom) getSmileySet(true); 
     for(var i in gvar.smiliecustom){
        img = gvar.smiliecustom[i];
        /** gvar.smiliecustom[idx.toString()] = [parts[1], parts[0], parts[0]];
        # where :
        # idx= integer
        # gvar.smiliecustom[idx.toString()] = [link, tags, tags];       */
        paired['tag_'+img[1].toString()] = img[0].toString();
     }
     return paired;
   }
 }
// template
 ,template_wrapper:function(txt){
   var oriTxt = gvar.current.oriText = (isUndefined(txt) ? trimStr ( Dom.g(gvar.id_textarea).value ) : txt);
   var tmsg=oriTxt;
   var tpl = decodeURIComponent(gvar.settings.userLayout.template);
   if(gvar.settings.userLayout.config[1] == 1 && tpl.match(/\{message\}/i) ) 
      tmsg = tpl.replace(/\{message\}/i, oriTxt);
   
   if(gvar.settings.userLayout.config[0] == 1){
      var newLines = count_Char('\\n', tmsg);
      var margin_sigi = (tmsg.indexOf('[QUOTE=')!=-1 ? (gvar.offSet_SiGi[0]-newLines) : (gvar.offSet_SiGi[1]-newLines) );      
      tmsg += gen_Char('\n', margin_sigi, ' ') + gvar.settings.userLayout.signature;
   }
   if(Dom.g(gvar.id_textarea) && tmsg!=oriTxt)
     Dom.g(gvar.id_textarea).value=tmsg;
   return tmsg; 
 }
}; // end tQR

var tSTORAGE = {
 setValueForId: function (userID, value, gmkey, sp){
    sp = [(isDefined(sp) && typeof(sp[0])=='string' ? sp[0] : ';'), (isDefined(sp) && typeof(sp[1])=='string' ? sp[1] : '::')];
    var i, ks = KEY_KTP+gmkey;
    var info = getValue(ks);
    if(!userID) return null;
    if(!info){
        setValue(ks, userID+"="+value);
        return;
    }
    info = info.split(sp[0]);
    for(i=0; i<info.length; i++){
        if(info[i].split('=')[0]==userID){
            info.splice(i,1,userID+"="+value);
            setValue(ks, info.join(sp[0]));
            return;
        }
    }
    info.splice(i,0,userID+"="+value);
    setValue(ks, info.join(sp[0]));
 }
 
 //values stored in format "userID=value;..."
 // sp = array of records separator
 ,getValueForId: function (userID, gmkey, sp){
    sp = [(isDefined(sp) && typeof(sp[0])=='string' ? sp[0] : ';'), (isDefined(sp) && typeof(sp[1])=='string' ? sp[1] : '::')];    
    var info = getValue(KEY_KTP+gmkey);
    if(!info || !userID)
      return null;
    info = info.split(sp[0]);
    for(var i=0; i<info.length; i++){
        if(!isString(info[i])) continue;
        var recs = info[i].split('=');
        if(recs[0]==userID){
            var rets = [userID];
            var values = recs[1].split(sp[1]);            
            for(var idx in values){
              if(!isString(values[idx])) continue;
              rets.push(values[idx]);
            }
            return rets;
        }
    }
    return null;
 }
 ,delValueForId: function (userID, gmkey){
  var ks = KEY_KTP+gmkey;
  var info = getValue(ks);
  info = info.split(';'); var tmp=[];
  for(var i=0; i<info.length; i++){
    if(info[i].split('=')[0]!=userID)
      tmp.push(info[i]);    
  }
  setValue(ks, tmp.join(';'));
 }
};



// ========
// common function
function controler_resizer(){
  gvar.maxH_editor = parseInt(GetHeight())-170;
  Dom.g('css_position').innerHTML = rSRC.getCSS_fixed( gvar.settings.fixed_preview );
}
function getFetch(u, cb, cache){
  if(isUndefined(u)) return;
  cache = (isUndefined(cache) ? true : cache);
  // prep xhr request
  GM_XHR.uri = u; GM_XHR.cached = cache;
  GM_XHR.request(null, 'GET', cb);
}
function chk_kfti_pos(){
  // try check KTFI, if it's fixed
  try{
   if($D('#TextInfo')){
     var tbL = getTag('table', $D('#TextInfo'));
	 if(tbL.length > 0) tbL = tbL[0];
	 gvar.fixed_ktfi = ( tbL.style.getPropertyValue('position') == 'fixed' );	
   }
  }catch(e){gvar.fixed_ktfi=false;}
  gvar.offsetLayer= (gvar.fixed_ktfi ? 38 : 20); // buat margin top Layer
}
// delayed focus to textarea
function force_focus(delay){
	if(isDefined(vB_textarea)) return;
    if(isUndefined(delay)) delay=560;
    if(!vB_textarea.Obj) vB_textarea.init();
    window.setTimeout(function() {
      vB_textarea.Obj.focus();
    }, delay); // rite after dumy created, lost its focus
}
// end-common function

// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return x.replace(/^\s+|\s+$/g,""); };

function on(m,e,f){Dom.Ev(e,m,function(e){typeof(f)=='function'?f(e):void(0)});}
function basename(path, suffix, tailcut) {
  // Returns the filename component of the path  
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: basename('/www/site/home.htm', '.htm');    // *     returns 1: 'home'
  // *     example 2: basename('ecra.php?p=1');
  var b = path.replace(/^.*[\/\\]/g, '');
  if(typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix)
    b = b.substr(0, b.length-suffix.length);
  if(typeof(tailcut) == 'string')
    b = b.replace(new RegExp(tailcut+".*$", "g"), '');
  return b;
};
function toCharRef(text){
    var charRefs = [], codePoint, i;
    for(i = 0; i < text.length; ++i) {
        codePoint = text.charCodeAt(i);
        if(!text[i].match(/[\w\[\]\<\>\s\?\'\"\;\:\=\+\-\_\)\(\&\^\%\$\#\@\*\.\,\!\~\}\{\|\/\r\n]/)){
         if(0xD800 <= codePoint && codePoint <= 0xDBFF) {
            i++;
            codePoint = 0x2400 + ((codePoint - 0xD800) << 10) + text.charCodeAt(i);
         }
         charRefs.push('&#' + codePoint + ';');
        }else
          charRefs.push(text[i]);
    }
    return charRefs.join('');
};
function GetHeight(){
  var y = 0;
  if (self.innerHeight){ // FF; Opera; Chrome
     y = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight){ 
     y = document.documentElement.clientHeight;
  } else if (document.body){
     y = document.body.clientHeight;
  }
  return y;
};
function do_an_e(A) {
  A.stopPropagation();
  A.preventDefault();
  return A;
};
function count_Char(chr, dstr) {
 var tFind = new RegExp(chr,"g");
 var ret = (dstr.length - parseInt(dstr.replace(tFind,'').length) );
 return ret;
};
function gen_Char(chr, len, pngotor) {
 var ret = '';
 if(isUndefined(pngotor)) pngotor = '';
 if(len<=0) return chr;
 for(var i=0; i<len; i++) ret+=pngotor+chr;
 return ret;
};
function addClass(cName, Obj){
  if(cName=="") return;
  var neocls = (Obj.className ? Obj.className : '');
  if(neocls.indexOf(cName)!=-1) return;
  neocls+=(neocls!=''?' ':'')+cName;
  Obj.setAttribute('class', neocls);
}
function removeClass(cName, Obj){
  if(cName=="") return;
  var neocls = (Obj.className ? Obj.className : '');
  neocls = trimStr ( neocls.replace(cName,"") ); // replace and trim
  Obj.setAttribute('class', neocls);
}
function SimulateMouse(elem,event,preventDef) {
  if(typeof(elem)!='object') return;
  var evObj = document.createEvent('MouseEvents');
  preventDef=(isDefined(preventDef) && preventDef ? true : false);
  evObj.initEvent(event, preventDef, true);
  try{elem.dispatchEvent(evObj);}
  catch(e){}
}
function createEl(type, attrArray, html){
 var node = document.createElement(type);
 for (var attr in attrArray) 
   if (attrArray.hasOwnProperty(attr))
    node.setAttribute(attr, attrArray[attr]);
 if(html) node.innerHTML = html;
   return node;
}
function createTextEl(txt){
  return document.createTextNode(txt);
}
function getValue(key) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_getValue(key,data[0]));
}
function setValue(key, value) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_setValue(key,value));
}
function showhide(obj, show){
  if(isUndefined(obj)) return;
  if(isUndefined(show)) show = (obj.style.display=='none'); // toggle mode
  obj.setAttribute('style','display:'+ (show ? '':'none') );
}
function getTag(name, parent){
  var ret = (typeof(parent)!='object' ? document.getElementsByTagName(name) : parent.getElementsByTagName(name) );
  return (isDefined(ret[0]) ? ret : false);
}
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
function page_is_notloaded(t){
   var tg = getTag('title');
   return (tg && isDefined(tg[0]) && tg[0].innerHTML.indexOf(typeof(t)=='string' ? t : 'Page is temporary not available')!=-1);
}
function getScreenHeight(){
  var y = 0;
  if (self.innerHeight){ // FF; Opera; Chrome
     y = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight){ 
     y = document.documentElement.clientHeight;
  } else if (document.body){
     y = document.body.clientHeight;
  }
  return y;
}
function getCurrentYPos() {
  if (document.body && document.body.scrollTop)
    return document.body.scrollTop;
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  if (window.pageYOffset)
    return window.pageYOffset;
  return 0;
}

// end static routine
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
    var gsv; try { gsv=GM_setValue.toString(); } catch(e) { gsv='.staticArgs.FF4.0'; }
    if(gsv.indexOf('staticArgs')>0) {
 	 gvar.isGreaseMonkey=true; gvar.isFF4=false;
	 show_alert('GreaseMonkey Api detected'+( (gvar.isFF4=gsv.indexOf('FF4.0')>0) ?' on FF4.0':'' )+'...',0); 
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
// ----my ge-debug--------
function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
}
function clog(msg) {
  if(!gvar.__DEBUG__) return;
  show_alert(msg);
}
// -end static
// -----------

//========= Global Var Init ====
var GM_addGlobalScript=function(script, id, tobody) { // Redefine GM_addGlobalScript with a better routine
  var sel=createEl('script',{type:'text/javascript'});
  if(isDefined(id) && isString(id)) sel.setAttribute('id', id);
  if(script.match(/^https?:\/\/.+/))
    sel.setAttribute('src', script);
  else
    sel.appendChild(createTextEl(script));
  if(isDefined(tobody) && tobody){
    document.body.insertBefore(sel,document.body.firstChild);
  }else{
    var hds = getTag('head');
    if( isDefined(hds[0]) && hds[0].nodeName=='HEAD' )
     window.setTimeout(function() { hds[0].appendChild(sel);}, 100);
    else
     document.body.insertBefore(sel, document.body.firstChild);
  }
  return sel;
};
var GM_addGlobalStyle=function(css, id, tobody) { // Redefine GM_addGlobalStyle with a better routine 
  var sel=createEl('style',{type:'text/css'});
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
// utk add - remove element
var Dom = {
  g: function(el) {
   if(!el) return false;
   return ( isString(el) ? document.getElementById(el) : el );
  },
  add: function(el, dest) {    
    var el = this.g(el);
    var dest = this.g(dest);
    if(el && dest) dest.appendChild(el);
  },
  remove: function(el) {
    var el = this.g(el);
    if(el && el.parentNode)
      el.parentNode.removeChild(el);
  },
  Ev: function() {
    if (window.addEventListener) {
      return function(el, type, fn, ph) {
        if(typeof(el)=='object')
         this.g(el).addEventListener(type, function(e){fn(e);}, (isUndefined(ph) ? false : ph));
      };      
    }else if (window.attachEvent) {
      return function(el, type, fn) {
        var f = function() { fn.call(this.g(el), window.event); };
        this.g(el).attachEvent('on' + type, f);
      };
    }
  }()
};
var GM_XHR = {
  uri:null,
  returned:null,
  cached:false,
  events:false,
  request: function(cdata,met,callback){
    if(!GM_XHR.uri) return;
    met=(isDefined(met) && met ? met:'GET');
    cdata=(isDefined(cdata) && cdata ? cdata:null);
    if(typeof(callback)!='function') callback=null;    
    GM_xmlhttpRequest( {
        method:met,
        url:GM_XHR.uri + (GM_XHR.cached ? '':(GM_XHR.uri.indexOf('?')==-1?'?':'&rnd=') + Math.random().toString().replace('0.','')),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:(isString(cdata) ? cdata : ''),
        onload: function(ret) {
          if(ret.status==503){
            show_alert('Reach 503, retrying...');
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
    if((forced)||(parseInt(getValue(KEY_KTP+"LAST_UPDATE", "0")) + parseInt(intval) <= (new Date().getTime()))) {
     gvar.updateForced = forced;
	 if(!forced) Updater.caller='';
     // prep xhr request
     GM_XHR.uri = 'http://'+'userscripts.org'+'/scripts/source/'
       + gvar.scriptMeta.scriptID + '.meta.js';
     GM_XHR.cached = false;
     GM_XHR.request(null,'GET',Updater.callback);
    }
  }
 ,callback: function(r){
    if(r===null) return;
    setValue(KEY_KTP+"LAST_UPDATE", new Date().getTime() + "");
	if(Dom.g(Updater.caller)) 
	  Dom.g(Updater.caller).innerHTML = 'check now';
    if (r&&r.responseText.match(/@timestamp(?:[^\d]+)([\d\.]+)/)[1] > gvar.scriptMeta.timestamp) { 
      Updater.initiatePopup(r.responseText); 
    } else {
      Updater.notify_done(false);
      if (gvar.updateForced)
        alert("No update is available for Thread-Preview.");	  
    }
  }
 ,initiatePopup: function(rt){    
    Updater.meta=Updater.mparser(rt);
	Updater.showDialog(
       '<img id="nfo_version" src="'+gvar.B.news_png+'" class="qbutton" style="float:left; margin:3px 5px 0 2px;padding:3px;"/> '
	  +'<b>New'+' '+gvar.codename+'</b> (v'+ Updater.meta.cvv[1]+') is available'
      +'<div style="float:right;margin:9px 0 0 15px;"><a class="qbutton twbtn twbtn-m lilbutton" href="http://'+ 'userscripts.org'
      +'/scripts/show/'+gvar.scriptMeta.scriptID+'" target="_blank" title="Goto '+gvar.codename+' Home">Home</a></div>'
      +'<div style="float:right;margin-top:9px;"><a id="do_update" class="qbutton twbtn twbtn-m lilbutton" href="javascript:;"><b>Update</b></a></div>'
      +'<div style="margin-left:22px;">Wanna make an action?</div>'
    );
    on('click', $D('#upd_close'), function(){ Dom.remove('upd_cnt') });    
    on('click', $D('#upd_notify_lnk'), function(){
       if($D('#upd_cnt'))
         Dom.remove('upd_cnt');
       else{         
         Updater.notify_progres();
         Updater.check(true);
       }
    });    
    on('click', $D('#do_update'), function(){  
      GM_openInTab('http://'+'userscripts.org'+'/scripts/source/'+gvar.scriptMeta.scriptID+'.user.js');      
      window.setTimeout(function(){ Dom.remove('upd_cnt'); }, 1000);
    });    
  }
 ,showDialog: function(inner){
    var Attr, el;
    if($D('#upd_cnt')) Dom.remove($D('#upd_cnt'));
    Attr = {id:'upd_cnt','class':'tborder qrdialog',style:'position:fixed;z-index:999999;'};
    el = createEl('div', Attr);
    getTag('body')[0].insertBefore(el, getTag('body')[0].firstChild);
    
    Attr = {'class':'qrdialog-close'};
    el = createEl('div', Attr, '<a id="upd_close" class="qbutton" javascript:; title="Close"><img src="'+gvar.domainstatic+'images/misc/menu_open.gif" /></a>');
    Dom.add(el, $D('#upd_cnt'));

    Attr = {id:'upd_child','class':'qrdialog-child'};
    el = createEl('div', Attr, inner);
    Dom.add(el, $D('#upd_cnt'));
	// nfo news
	if( Updater.meta.news ){
	  $D('#nfo_version').setAttribute('title', 'What\' New...');
	  $D('#nfo_version').style.setProperty('cursor', 'pointer', '');
	  on('click', $D('#nfo_version'), function(){ alert( gvar.codename+'\n\n== Last LOG Update ==' + Updater.meta.news );});
	}
    
    Updater.notify_done(true);
 }
  
 ,notify_progres: function(caller){
    if($D('#upd_notify'))
	  $D('#upd_notify').innerHTML = '<div id="fetch_update" class="ktp-loading" style="margin-left:10px;"></div>';
	if(Dom.g(caller)) {
	  Updater.caller=caller;
	  Dom.g(caller).innerHTML='checking..'; // OR check now
	}
 }
 ,notify_done: function(anyupd){
    if($D('#upd_notify')){
	  $D('#upd_notify').innerHTML = (anyupd ? '<a id="upd_notify_lnk" href="javascript:;" title="Update Available"><img style="position:absolute;margin:-5px 0 0 5px;" src="'+gvar.B.updates_png+'" width="17" border="0"/></a>':'');
      if($D('#upd_notify').innerHTML==''){
        $D('#upd_notify').innerHTML=' <small class="normal_notice">No Update Available</small>';
        window.setTimeout(function(){ $D('#upd_notify').innerHTML=''; }, 4000);
      }
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

/* Modified Smooth scrolling
   Todd Anglin  14 October 2006, sil, http://www.kryogenix.org/
   v1.1 2005-06-16 wrap it up in an object
*/
var ss = {
  smoothScroll: function(anchor, cb) {
    var destinationLink = anchor;

    // If we didn't find a destination, give up and let the browser do its thing
    if (!destinationLink) return true;

    // Find the destination's position
    var desty = destinationLink.offsetTop;
    var thisNode = destinationLink;
    while (thisNode.offsetParent && 
          (thisNode.offsetParent != document.body)) {
      thisNode = thisNode.offsetParent;
      desty += thisNode.offsetTop + gvar.offsetTop;
    }

    // Stop any current scrolling
    clearInterval(ss.INTERVAL);
    
    // check is there any callback
    ss.callback = (typeof(cb)=='function' ? cb:null);

    cypos = ss.getCurrentYPos();
    ss_stepsize = parseInt((desty-cypos)/ss.STEPS);
    
    ss.initPos = (cypos < desty);
    ss.INTERVAL = setInterval( function(){
        ss.scrollWindow(ss_stepsize,desty,anchor)
    }, 8);
    
  },

  scrollWindow: function(scramount,dest,anchor) {
    wascypos = ss.getCurrentYPos();
    isAbove = (wascypos < dest);
    window.scrollTo(0,wascypos + scramount);
    iscypos = ss.getCurrentYPos();
    isAboveNow = (iscypos < dest);
    //show_alert('wascypos:'+wascypos+'; '+'isAbove:'+isAbove+'; '+'iscypos:'+iscypos+'; '+'isAboveNow:'+isAboveNow);
    if ((isAbove != isAboveNow) || (wascypos == iscypos) || (isAbove == isAboveNow && (ss.initPos!=isAbove || ss.initPos!=isAboveNow)) ) {
      // if we've just scrolled past the destination, or
      // we haven't moved from the last scroll (i.e., we're at the
      // bottom of the page) then scroll exactly to the link
      //  additional conditional if user scrolling will prevent of dead end scrollpage
      window.scrollTo(0,dest);
      // cancel the repeating timer
      clearInterval(ss.INTERVAL);
      // and jump to the link directly so the URL's right
      if(isString(anchor)) location.hash = anchor;
      if(ss.callback) ss.callback();
      return;
    }
  },

  getCurrentYPos: function() {
    if (document.body && document.body.scrollTop)
      return document.body.scrollTop;
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    if (window.pageYOffset)
      return window.pageYOffset;
    return 0;
  }
};
var vB_textarea = {
  init: function(id) {
    this.Obj = (isUndefined(id) ? Dom.g(gvar.id_textarea) : Dom.g(id));
    this.content = (this.Obj ? this.Obj.value : "");
    this.cursorPos = this.rearmPos(); // [start, end]
    this.last_scrollTop = this.Obj.scrollTop; // last scrolltop pos
  },
  rearmPos: function(){ return [this.getCaretPos(), this.Obj.selectionEnd]; },
  clear: function (id){
    if(!this.Obj) this.Obj = (isUndefined(id) ? Dom.g(gvar.id_textarea) : Dom.g(id));
    this.set('');
	this.Obj.style.height='1px'; // min-height should be set before
    this.enabled();
    this.focus();
  },
  disabled: function(){ 
    this.Obj.setAttribute('disabled','disabled');
  },
  readonly: function(id){
    this.Obj = (isUndefined(id) ? Dom.g(gvar.id_textarea) : Dom.g(id));
    removeClass('txa_enable', this.Obj);
    addClass('txa_readonly', this.Obj);
    this.Obj.setAttribute('readonly',true);
  },
  enabled: function(id){
    if(!this.Obj) this.Obj = (isUndefined(id) ? Dom.g(gvar.id_textarea) : Dom.g(id));
    this.Obj.removeAttribute('disabled');

    this.Obj.removeAttribute('readonly');

    if($D('#recaptcha_response_field')) $D('#recaptcha_response_field').removeAttribute('disabled');
    removeClass('txa_readonly', this.Obj);
    addClass('txa_enable', this.Obj);
  },
  focus: function(){
    this.Obj.focus(); 
  },
  set: function(value){
    if(!this.Obj)
      this.Obj = Dom.g(gvar.id_textarea);
    this.Obj.value = this.content = value;
  },
  lastfocus: function (){
    var pos = Dom.g(gvar.id_textarea).value.length; // use the actual content
    if(this.Obj.setSelectionRange)    {
        this.focus();
        this.Obj.setSelectionRange(pos,pos);
    }
    this.focus();
  },

  add: function(text){ // used on fetch post only
   this.Obj.value+=text; this.enabled(); this.focus();
   if(isUndefined(this.cursorPos[0])) this.rearmPos();
   // fix chrome weird
   var lastpos=(this.cursorPos[0] + text.length);
   this.setCaretPos( lastpos, lastpos );
  },
  subStr: function(start, end){ return this.content.substring(start, end);},
  getSelectedText : function() {
    if(isUndefined(this.cursorPos[0])) this.rearmPos();
    return (this.cursorPos[0]==this.cursorPos[1]? '': this.subStr(this.cursorPos[0], this.cursorPos[1]) );
  },
  getCaretPos : function() {
    this.enabled(); /* this.focus();*/
    var CaretPos = 0;
    //Mozilla/Firefox/Netscape 7+ support 
    if(this.Obj)
      if (this.Obj.selectionStart || this.Obj.selectionStart == '0')
        CaretPos = this.Obj.selectionStart;
    return CaretPos;
  },  
  setCaretPos : function (pos,end){
    if(isUndefined(end)) end = pos;
    if(this.Obj.setSelectionRange)    { // Firefox, Opera and Safari
        this.focus();
        this.Obj.setSelectionRange(pos,end);
    }
  },
  // ptpos stand to puretext position [start, end]
  setValue : function(text, ptpos){
    if(isUndefined(this.cursorPos[0])) this.rearmPos();
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
    this.Obj.scrollTop = (this.last_scrollTop+1);
    return bufValue; 
  },
  wrapValue : function(tag, title){
    if(isUndefined(this.cursorPos[0])) this.rearmPos();
	var start=this.cursorPos[0];
    var end=this.cursorPos[1];
    tag = tag.toUpperCase();    
    var bufValue = this.subStr(0, start) + 
       '['+tag+(title?'='+title:'')+']' + 
        (start==end ? '' : this.subStr(start, end)) + 
       '[/'+tag+']' + this.subStr(end, this.content.length);    
    this.set(bufValue);
    var st2 = (start + ('['+tag+(title?'='+title:'')+']').length);
    this.setCaretPos( st2, st2+this.subStr(start, end).length );    
    this.Obj.scrollTop = (this.last_scrollTop+1);
    return bufValue; 
  },
  replaceSelected : function(text, ptpos){
    if(isUndefined(this.cursorPos[0])) this.rearmPos();
	var start=this.cursorPos[0];
    var end=this.cursorPos[1];
    if(start==end) return;    
    var bufValue = this.subStr(0, start) + text + this.subStr(end, this.content.length);
    this.set(bufValue);
    this.setCaretPos( (start + ptpos[0]), (start+ptpos[1]) );
    this.Obj.scrollTop = (this.last_scrollTop+1);
  },
  
  setElastic: function(tid,max,winrez){
    if(isUndefined(tid)) tid=gvar.id_textarea;
    function setCols_Elastic(max){var a=Dom.g(tid);a.setAttribute("cols",Math.floor(a.clientWidth/7));setRows_Elastic(max)}
    function setRows_Elastic(max){var a=Dom.g(tid),c=a.cols,b=a.value.toString(),h;b=b.replace(/(?:\r\n|\r|\n)/g,"\n");for(var d=2,e=0,f=0;f<b.length;f++){var g=b.charAt(f);e++;if(g=="\n"||e==c){d++;e=0}}h=(d*14);a.setAttribute("rows",d);a.style.height=h+"pt";vB_textarea.oflow=(max&&(d*14>(max-130))? 'auto':'hidden');a.style.setProperty('overflow',vB_textarea.oflow,'');}/*134*/
    var a=Dom.g(tid) || this.Obj;
    vB_textarea.oflow='hidden';
    a.setAttribute('style','overflow:'+vB_textarea.oflow+';letter-spacing:0;line-height:14pt;'+(max?'max-height:'+(max-130)+'pt;':''));
    if( !winrez ) on('keyup',a,function(){setCols_Elastic(max)});
    window.setTimeout(function(){setCols_Elastic(max)}, 110);
  }  
};
//== end Global Var ==


var rSRC = {
 getSetOf: function(type){
  if(isUndefined(type)) return false;
  switch(type){
    case "button":
     return {
      smile_gif : ""
        +"data:image/gif;base64,R0lGODlhEwATAOYAAAAAAP///z5ivnKY26bP+f3tTPzlTPznTPviWfveTPvbXfvVTPvXTPnOTPvde5x7IfvUX829kP3qt6GZgaig"
        +"iPnGTPnITPrNXfvWe/zhm6+nksO7p8ajV/ven7Wmha+hg6+ihq+jiLyxl/3uzdDIt/i+TPi/TfjFXPrSf/3nu8m7n8O2ncq9pP3u0XpQB/vcpfznv9DCqP7u0u"
        +"TYwve6Vfi8V/jAYd28huPFlePLov7kuP7t0f7v1v3u1evgzvi9aPrPkePPsP3mxf7w2/7x3v7y4P7y4fi5Yfe6ZP3myP7v2/7x3/Lm1v7y4v7z5P705v726/i9"
        +"c/e8dsSWX/rFh/nKkvznzP7u2v716v7w4P7y5fnHksWWbsWfgMWfg8Whh0gRBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        +"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGEALAAAAAATABMAAAfZgGGCg4SFhoeEPiohIB8eiIMzExQsQTk"
        +"4N5BhKxpMS0RFRjs6kCIkTk9QT0ZDPDKCLi6EMRtKTVhaWVc9LSNhsbGwsUlgxVZCMCkSvyVbsrE0LmBeX11gLx0ZYMzOvzTRXFtVQFMoGA4c3M80zlRSPzYn"
        +"FxAKCOq/W85RSDUmFg0MEhxQFyufiyM0SlRosCCBgQK/XLBzYdDFg4sYMcJiV/HBgAABCIAUGSCixIouCAgIORIksG/5nMVSKaCmTYnQKjp7wLKnxGjAKMq82D"
        +"LAT6AxZYaJkPFBIAA7"
     ,loading_gif : ""
        +"data:image/gif;base64,R0lGODlhCwALALMIAEdHRyQkJGtra7Kyso+Pj9bW1gAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wA"
		+"wEAAAAh+QQFAAAIACwAAAAACwALAAAEJBBJaeYMs8pz6bYIVnFgKQEoMBVsYZoCQiADGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJGeYEs0pz6bYIV"
		+"nFgKQmoMB3sYZoEMiAFGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJCeYUs8pw6bYIVnFgKREoMRmsYZoDUiAHGMtSLd14Xs6WCAAh+QQFAAAIACwAA"
		+"AAACwALAAAEJBBJKeYks0pw6bYIVnFgKQ3oMAVsYJoFciAGGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJSeYcs0px6bYIVnFgKRVoMQEsYJoHYiABG"
		+"MtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJOeYss0py6bYIVnFgKR3oMQmsYJoGEiAAGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJWeY8s"
		+"8px6bYIVnFgKRmoMREsYZoBAiACGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJeeY0s8py6bYIVnFgKQVoMA3sYJoAIiAEGMtSLd14Xs6WCAA7"
     ,setting_gif : ""
        +"data:image/gif;base64,R0lGODlhGQAYAPcAABweHISKjMTCxFRWVASi7KSmpNze3HRydDw6PJyanLS2tMzS1Hx+fKyurIySlGRmZExKTCwuLOzu7NTa3MzKz"
		+"KSmrJyipISGjFxeXOTm5Hx6fERCRLy+vNTW3ISGhJSWnCQmJIyOjNze5HR2fJyepLS2vNTW1Hx+hKyutJSWlGxubFRSVDQ2NMzO1KSqrIyKjMTGxFxaXKSqpHR2d"
		+"Dw+PJyenNTS1JSSlGxqbExOTDQyNPTy9Nza3MzOzKSipGRiZERGRCwqLOTi5Ly6vISChLSytKyqrAAAAP93CP8AAgAAAAEAAAAAWAAACgAALwAAAJhFCAMA7AAAE"
		+"gAAAHxQXeYK1wEvJgEAd3QAYuUADxIq4gAABtDwzLgM6y8vEgAAAGAuaPtnABJpagBmAF0ARNcAOiYAXHcAAAIhcw+tZeKHcgZ2c/4AU/8B3/8Ah/8Adt8ArDEAYi"
		+"oABXcA09iMAC3nACoSAHcAAACXAAA7AAAqAAB3ANCciLg7Yi8qLQB3ANCmALjhYC/aLQBxAKEAVB8A6CoAEncAAAAAEQABAQAAAAAAAMghsLit6C+HEgB2AIBkmuf"
		+"nkxISjgAAdrwAdMIAVYcAkHYApQCs/gBt/yoF/wDT/wC0UwDn3wAShwAAdtCRSbis2C+HhwB2dgAAiAAAYgAALQAAAAAAPgEA0gAAiAAAdsvo7MK1YocmBXZ308zq"
		+"AOfhABLaAABxANB5ALjpAC8SAAAAAAwMAJ6hAEFPAHcAAAFBAAAAAAAAAAAAAwIAAX8AAAAAAAAAAC6UkG/n6HISEmcAAFwMzWmhq21PumEA3GdgYGX7+3MSElwAA"
		+"ABdmubXkxImjgB3drBiZG8NWJLin3YGpQL+/gD//wD//4D//5joPkG10pMmiHZ3dgBbiAB/gQCKQgB2ABnciADoYgISLQAAANhrAOZ/ABKKAAB2AByNeW+t6ZKHEn"
		+"Z2AEABMc0ArYgAh3YAdgAx8AAAYgAABQAC00RIMTq2rQA5hwAAdlIuamVncXBpSGxmACH5BAEAAAQALAAAAAAZABgARwj/AAkQ8JGiho8CBSoUMJKwgAyFBQymECiQ"
		+"x4gZKhRQUGDjxQMcM3D8EECEQY8hNXowUKEBxYIVNGJAoLEBwYAYMX780IABJwsELDZgWLFhBIwaDYwkbdBAQREZNoxsNFKE6VIjNUiImDFDw4sICGbceJEiQdkUHh"
		+"DQYMHCgwqcAVaqmPGhBw8FGlZEiAAiSAQgGhSY6FFDw9wbFkjAoACj8eLHjhszdkxhYscUIW6EoNDAhwQbEkL3yECBSA/MKV6EKGEgxoMhDTi8WDEAw4ABKzz4WBF"
		+"jBQYFN2q8yJFgAgYaBwbQWHug648cODTMOLDhJ5ADQTUUGSLEQAMiLzYA/xG/gXz1DSE8NMhgQMEMgVwZ8DTiHkSEICAA4FBg5EdXBj7AIJAPUtnQgw0GDoYggj2"
		+"Y0AKDLRgh0BA+cDDEhRdaOISGG3aYIQc+eNBCWT7UUIMRCXCUwg4NSGCEETaYSIKJPoRQxAQvaOBBAhoYkQEPJhgRAhFEwPAjkBoQ6YF2E4SEAwY9cDCATk/+oEIP"
		+"D0w5RAs3xIDDAwWIsIIODxhxQA03DAAEET40UEQIEAABBAI/FHADCxA4wMMKOHjwA1ssqPCCBx4MOugDP7GAwQsMPHBCByE9AAQNCGyAw5c5ePCACpeqoMIBl345g"
		+"gArFAAnBgggAMQKOazwwwCtAlDxEwYb3JDACjMkwF0GPyoQAhAg/AQUCzoA8UIDPGQghBBDeEDADAzI90ARFNQQAxA63IdADAlsBFK0PjBAEQMvIMWBAOgKcC4H62"
		+"K4kUABAQA7"
     ,closepreview_png : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1h"
        +"Z2VSZWFkeXHJZTwAAAY1SURBVHjapFZbbFRVFN0zd6Yz08dMoUNf9EGxUItJK62I4AOJEYiQoqE+0OgHCiqG+PgQozH6ofyIJiYEMRqNJpggHySlrRM+hCAtaj"
        +"AUaGgEi9BBSilMO0PnfWeOa597bjt9AEVvsubOPWefs/br7H0sQgj6P4/FYrk9+WkSuoAHgCrgLvV9DLgMdID02rQZmfAmaAJaxS2edDr9s67rL7EB/9XCUuAL"
        +"oEl+pZJEvTAo8A9s6iVKxojKYWheAWxuIMr2GGKp1KHh4eF3vF4vW59me6ZD2Ajsle6LXify7SI68iNROIgtIKtpBvQEB5DI7iC6Zw3Rmi1EM0vlBsFg8OX8/P"
        +"xvWQdFKm5E2KhiQ9R9iOjL17E6QFRUhAGQpFNjklYrhhT6YbndTtT8LtGjG+T0lStXNhcVFTGpnkE8jpAT4hdgNvm+Ivr+AyIHtM+Fu3Ss0RUZO8pqqos/NiDL"
        +"blgcQO48/CzRpk/l9KlTp56oq6s7gL8JkzST0AespN9/Itq2Hu7xQnsbRFOcWSBKT50FVpMUHrBD/iKsXb+V6KmtFI/H/3Q6nZzdEZPU1PVFSXbtEoltz0Nzm2"
        +"HRqleIvjsLa/9CoiSnBs99cwaym4lCYSRSHr4/REg64SBHTX9//2fqGNmVevJ5jn/0Xe+Rhd2SBVdGkInr3hizZI8fOibGg8fM5/EthgIJwxPJ7a/Jd05Ozn14"
        +"uQEHGRGXsVtOIwHS2nbDlTOIYlHoMoUL9w0Q/GSA/0/KeXglFmEWsp/uIjp9FAbnzWttbV3H3ECWFWdnubTuSBulQ9AwDs2jcSPGby6evGn7sIGJzwuzDUViMe"
        +"kdAZ0jrXvlVGVl5RK8ctlKq6ZpHFSKdBzCwSVjQRILAzh3508TPe29dbl6ZibiB/lrQeWBGFmykGe/dcjpwsLCeuVWpw1ZWskFWO/rM45ZNGWkPXt0ZIR/iJbi"
        +"gHfeoOYuU9UsbmbtWI2x+i+acWSt8yShCiaJVFwq50zeZrsYmapAgz/KFCmzo2gqhk7WJ8SDCY+bomF2qdI2E3/cpKPwXKYs1qdAlozwnjlSJBaLcbVxyqRBlT"
        +"8rB+fUkJuzGotEXB1TRvc02hfLKHk9btT6BCyPzJ0rpwcGBoLqHGpWVIMjsmLVPkTZhXgbMacUW3pGTB2z+4HA5fHjkE3EDELeYyaSJjx/qZzq6uq6pKJrsR4/"
        +"flwSeh98mIbmVpET7khBU20qw+4GEbda1ndZyaTpLDLWOtnSchdZVj4pxw8fPuzPLOD2SCSylxvpr9u3C1GDylkClAM73xrrsnfiu4JErMCAqAIW0Nj8DsiWkt"
        +"BnGXJdr24QiURCTuXm5n4MnmZWmQm1EydOPMITg4ODom/VEiHKsGgOyQ14sSQvJhF2j8eoYhXGvPzGmqF7K0V3d7ckQ5XhHHkbeAyoNU9ODpqmvEp0dHSIQEOV"
        +"sRhWjGSTuOq4OQJOMpQEWXS+RxzYs0cgGSUhCvgO7L+Jg6DKqLyHOGpra0tYgAV9Pp/oX1wnBLunXlnrgVXYfEAzEMzCmFsRLSIpG6opFa27d4twOCzJWlpa2L"
        +"r3lTsXAiUmIRcAN1z6Awuy7zs7O8WxjRtFvDDH2JhJG4ClCo1AtUGq59tEz9q1UlGTrK2t7QL2/ATYKJsDUTUwQzZgVAKrSrI89K+dxcXFzbiJUR/K3cmTJ2nW"
        +"wYNUcfQoeS+cJcdwQGZeIjuHAmV30KWGBjq/YgUtWLiQqquryWazUXt7u3/16tX7IIYbF50D+vjWwUXGJLQYlxZZDdx+v//zsrKyZtnX0ONwcAnWUygUQhtMSE"
        +"LeGK2HCgoKqKSkhNDZ5fj+/fvPNTU1teDvBQW/IuMWEx29g6rkYSv5zlfu8Xgae3p6fGKaD1z4N0i/xtqPALR/WgssAuawK1XNto7eaZSVVhVPl6ruM9Baiuvr"
        +"6+fBzRUul2sWxPKQWA5Yqg0NDekIwfXe3t4h3EfZ10PAVWXRIMBj16VlRvFLj7smTiB1qArPxPnKcrdqpE5VG0lVEC6EYdUIgsp9ITXGc0mzaU26CGeQampTp7"
        +"I4W8GlXK/R2MUxoTaOZMAk0jNv4VNe9RXpRGK7IrIrD2QS6mrzpCKfSDRK8q8AAwCF/L1ktjcKFAAAAABJRU5ErkJggg%3D%3D"
      ,twbutton_gif : ""
        +"data:image/gif;base64,R0lGODlhCgBYAsQfAPPz8+vr6/7+/uHh4fn5+eXl5d7e3vv7++jn6Ofo5/j4+Ojo6d/g4Ofn59/g3+Pk5OPj4/f29vv7+vz7/ODf3/"
		+"Dw8Pb29vv8+/z8/ODf4O/v7+fn5unp6N/f3+Dg4P///yH5BAEAAB8ALAAAAAAKAFgCAAX/oCCOZGmeIqau7OG6UiwdRG3fSqTs/G79wCDAMiwSiYCkUllpOp+aqHQ"
		+"a0FSvVmtgy+VyvoEvZxFeIBKLRQK93rg3hbf7UaAX6vQHZM/vD/6AgR6DhIUdBgaHHYuLiI6PkJEfk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2"
		+"t7i5uru8vb6/wMHCw8TFxsfIycrLwijOz9DRLNMYEy8u1jAy2zM33gQ94TkR5OQW5UHpQElH7Evv8O9P8xVT9VL3U/pXW1ld/wABihko5kyDBAgaIFCTYEMDOQ7d3"
		+"JlIEY+eBxgx9tm4J5DHAR4+hvSQoQMFDwwKzzFgtIiCA0aPDiGSGammJGY4c+rcybOnz59AgwodSrSo0aNIkypdyrRps2hQo0otoUIANRUTLhyYgOHAha4utIa9NkM"
		+"GjAMxvEnAocBGW3A94O7QMW6ujwg/8ALRq+6HEXd+4wkeXGEJvcOH9SleLAWL44CQIwskGOZLmgVj0mQ+eDDhmYQNHoZ2M/oOHNMVU9/JmBGCRo4b//AZMPujx5CCc"
		+"IMktLsDgwwOUHro4GAly+OJaM60yfyR0+fQo0ufTr269evYs2vfzr2791IhAAA7"
      ,sticky1_png : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAIAAADgN5EjAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABS0l"
		+"EQVR42mNgoD9gROPPmDoHU5HEx90MDAy6vA+Uc09i1zlj6pz0rOSZ0+Ym232EC97dPIWVV4xXXPbzy8e/P79i5RWD6GdB08bAwPCHEWHcowOrhFSMBWS0GRgYBGS0P"
		+"zy5+u7OWYgUE5o2NPDhyXWINgiAsO9ONkexc+a0uci2QQA3vzCaCCuvGISB0InsNzj4+vHtz4+v2Pmhqn9+fPXhyXXjzk8I12IF53577P9t+/T8jg9PrjIwMHx4cvXV"
		+"nXMCMprodmJqm7lkKQODvqGSHevLdY/P7mJgYBCQ0YRHDAsebSJCQrXGdzlkhBkYwuQYGOYe4s/IToGrYcGlzdvJxU/+PAODCi5HsWBqW7tte3pMtBHrDvypjwVN2+k"
		+"TJ2qN73IQ0oai88eTO0/+vky3/YDHhdh1csio+DGcJyevYM0lyAA5YIccAAA3ZH1T/MtQvwAAAABJRU5ErkJggg=="
      ,sticky2_png : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUBAMAAACdextHAAAAMFBMVEUEAgSkoqT8+vx8fnzEwsT8/vy6APHcAHYAADoAADUAAPEAAHZ"
		+"AgtgMAAROAAABAAD3wbpfAAAAEHRSTlMA////////////////////wFCLQwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGtJREFUeNqNzssNgDAMA9B2A1LIAqW5g9IFg"
		+"ExQyfuvQj9wRMKnp8iy4txHPBHp1smMNXd7cNnNGkNltmWuJOKymDWyAHkUGEhqx8NLVfuWJAWmxhCv8yGnjJeHyFsIMaIMSoGMa3uMyP3IDRceE8PdUxi6AAAAAEl"
		+"FTkSuQmCC"
      ,updates_png : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAIAAACNaGH2AAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABg0"
        +"lEQVR42n2SPW4UQRCFX417MXh3JbJ1hIwRxyBCGImjICQHIALOYF+Bi8AduIYdIeT9m5mq9xHMYhLMUwUt9Wu9r6orvv64/Nn/2o61NvvyOnNbtRkzbZepciZVT"
        +"p90j7vduIEgQoGxAgAhIYENAoHX47ob7JQSyjJyTa4ACRQRIaGITkTb2X15MGknpFxQWEIStpBCANA2maM9mgH6cqLRhGQDYGFTxgjaNisVCUN5lIeskcMdJiSQN"
        +"FGpbbKIGOzR9NCDEDaG8p9eNYG1TVnBYKcZjKdQeRrEAYPCKKLtsko2SiOMLXAac18ThqDtXUyIAYXLwgJXyWDbU45ALfd9N2sytiVxSOAAXBaOCEC4HWe3G3fRd"
        +"YojYaZ/G0ZXSaKmd4E9ny3jZn1zu7mV9On7RxBOzNvzi4uX7yYAxTQPnS5P22q+Ws1XklyF3bX24unZ51df9C+1+xNZR0+Oz5fPr95c6wH9dc8WJ2eLZ1evrxePF"
        +"g+5D+sCvP/24a6/47/6DW1k0UQglGH2AAAAAElFTkSuQmCC"
      ,news_png : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAIAAAD5fKMWAAAABnRSTlMAAAAAAABupgeRAAAArklEQVR42mNkYGBgYGBob29/9OgRA1"
		+"4gJyfHAlHHz88/bdo0/KqzsrJYHj16lF/auG/Hmvv37587dw6XUiMjIwYGBhY4X1FRUVFREb/xLMic9knLGRgYKvMiT158jKbOXF+WgYGBiYEUgGJ2ZV4kCarR7B2"
		+"07ubn52dhYGB4ev+yh4fHhw8fIKLvPn4XFUAxRYif8/79+wwMDIxHjhzZsmXLx48f8buBn5/fw8MDAOiiPC0scvhsAAAAAElFTkSuQmCC"
     };
    break;
  };
  return false;
 }
,getSmileySet: function getSmileySet(custom){

  var H = gvar.domainstatic + 'images/smilies/';
  var s = 'sumbangan/';
  
/**
Format will be valid like this:
 'keyname1|link1,keyname2|link2'
 eg. 
 ':yoyocici|http://foo'
*/
  //var sample = 'lopeh|http://static.kaskus.us/images/smilies/sumbangan/001.gif,nangis|http://static.kaskus.us/images/smilies/sumbangan/06.gif';
  gvar.smiliecustom = {};
  var buff = getValue(KEY_KTP+'CUSTOM_SMILEY');
  if(buff!=''){
    var idx=1;
    var sepr = ',';
    var customs={};
    var smileys = buff.split(sepr);
    if(isDefined(smileys[0]))
     for(var i in smileys){
       if(isString(smileys[i]) && smileys[i]!=''){
         var parts = smileys[i].split('|');
         customs[idx.toString()] = (isDefined(parts[1]) ? [parts[1], parts[0], parts[0]] : smileys[i]);
         idx++;
       }
     }
    gvar.smiliecustom = customs;
  }
  if(isDefined(custom) && custom) return;

  
  gvar.smiliekecil = {
 '1' : [H+'ngakaks.gif', ':ngakaks', 'Ngakak (S)']
,'2' : [H+'mahos.gif', ':mahos', 'Maho (S)']
,'3' : [H+'s_sm_cendol.gif', ':cendolb', 'Blue Guy Cendol (S)']
,'4' : [H+'s_sm_batamerah.gif', ':bata', 'Blue Guy Bata (S)']
,'5' : [H+'cendols.gif', ':cendols', 'Cendol (S)']
,'6' : [H+'takuts.gif', ':takuts', 'Takut (S)']

,'7' : [H+'batas.gif', ':batas', 'Bata (S)']
,'8' : [H+'s_sm_smile.gif', ':)bs', 'Blue Guy Smile (S)']
,'9' : [H+'s_sm_peace.gif', ':Yb', 'Blue Guy Peace']
,'10': [H+'iloveindonesias.gif', ':iloveindonesias', 'I Love Indonesia (S)']
,'11': [H+'cekpms.gif', ':cekpms', 'Cek PM (S)']
,'12': [H+'berdukas.gif', ':berdukas', 'Berduka (S)']
,'13': [H+'capedes.gif', ':capedes', 'Cape d... (S)']
,'14': [H+'bingungs.gif', ':bingungs', 'Bingung (S)']

,'15': [H+'malus.gif', ':malus', 'Malu (S)']
,'16': [H+'iluvkaskuss.gif', ':ilovekaskuss', 'I Love Kaskus (S)']
,'17': [H+'kisss.gif', ':kisss', 'Kiss (S)']
,'18': [H+'mads.gif', ':mads', 'Mad (S)']
,'19': [H+'sundulgans.gif', ':sundulgans', 'Sundul Gan (S)']
,'20': [H+'najiss.gif', ':najiss', 'Najis (S)']
,'21': [H+'hammers.gif', ':hammers', 'Hammer (S)']
,'22': [H+'reposts.gif', ':reposts', 'Repost (S)']
,'23': [H+s+'004.gif', ':matabelo:', 'Belo']
,'24': [H+s+'q11.gif', ':nohope:', 'Nohope']
,'25': [H+s+'8.gif', ':hammer:', 'Hammer']
,'26': [H+s+'24.gif', ':army:', 'army']
,'27': [H+s+'005.gif', ':Peace:', 'Peace']
,'28': [H+s+'12.gif', ':mad:', 'Mad']

,'29': [H+s+'fuck-8.gif', ':fuck3:', 'fuck3']
,'30': [H+s+'fuck-6.gif', ':fuck2:', 'fuck2']
//,'31': [H+s+'fuck-4.gif', ':fuck:', 'fuck']

,'32': [H+s+'7.gif', ':confused:', 'Confused']
,'33': [H+s+'34.gif', ':rose:', 'rose']
,'34': [H+s+'35.gif', ':norose:', 'norose']
,'35': [H+s+'017.gif', ':angel:', 'angel']
,'36': [H+s+'3.gif', ':kagets:', 'Kagets']
,'37': [H+s+'4.gif', ':eek:', 'EEK!']
,'38': [H+s+'014.gif', ':kissing:', 'kisssing']
,'39': [H+s+'q03.gif', ':genit:', 'Genit']

,'40': [H+s+'001.gif', ':wowcantik', 'Wowcantik']
,'41': [H+s+'amazed.gif', ':amazed:', 'Amazed']
,'42': [H+s+'vana-bum-vanaweb-dot-com.gif', ':bikini:', 'Bikini']
,'43': [H+s+'crazy.gif', ':gila:', 'Gila']
//,'44': [H+s+'shit-3.gif', ':tai:', 'Tai']
,'45': [H+s+'5.gif', ':shutup:', 'Shutup']
,'46': [H+s+'q20.gif', ':berbusa:', 'Busa']
,'47': [H+s+'49.gif', ':shakehand', 'shakehand']
,'48': [H+s+'48.gif', ':thumbdown', 'thumbdown']
,'49': [H+s+'47.gif', ':thumbup:', 'thumbsup']
,'50': [H+s+'020.gif', ':siul:', 'siul']
,'51': [H+s+'1.gif', ':malu:', 'Malu']
,'52': [H+s+'14.gif', ':D', 'Big Grin']
,'91': [H+s+'15.gif', ':)', 'Smilie']
,'92': [H+s+'06.gif', ':(', 'Frown']

,'53': [H+'ngacir.gif', ':ngacir:', 'Ngacir']
,'54': [H+s + '26.gif', ':linux2:', 'linux2']
,'55': [H+'bolakbalik.gif', ':bingung:', 'Bingung']
,'56': [H+'tabrakan.gif', ':tabrakan:', 'Ngacir Tubrukan']

,'57': [H+s+'q17.gif', ':metal:', 'Metal']
,'58': [H+s+'05.gif', ':cool:', 'Cool']
,'59': [H+s+'hi.gif', ':hi:', 'Hi']
,'60': [H+s+'6.gif', ':p', 'Stick Out Tongue']
,'61': [H+s+'13.gif', ';)', 'Wink']

,'64': [H+s+'01.gif', ':rolleyes:', 'Roll Eyes (Sarcastic)']
,'65': [H+s+'18.gif', ':doctor:', 'doctor']

,'66': [H+s+'006.gif', ':think:', 'Thinking']
,'67': [H+s+'07.gif', ':o', 'Embarrassment']
,'68': [H+s+'36.gif', ':kissmouth', 'kiss']
,'69': [H+s+'37.gif', ':heart:', 'heart']
,'70': [H+s+'e03.gif', ':flower:', 'flower']
,'71': [H+s+'e02.gif', ':rainbow:', 'rainbow']
,'72': [H+s+'008.gif', ':sun:', 'Matahari']
,'73': [H+s+'007.gif', ':moon:', 'Moon']
,'74': [H+s+'40.gif', ':present:', 'present']

,'75': [H+s+'41.gif', ':Phone:', 'phone']
,'76': [H+s+'42.gif', ':clock:', 'clock']
,'77': [H+s+'44.gif', ':tv:', 'televisi']
,'78': [H+s+'39.gif', ':table:', 'table']
,'79': [H+s+'32.gif', ':ricebowl:', 'ricebowl']
,'80': [H+s+'rice.gif', ':Onigiri:', 'Onigiri']
,'81': [H+s+'31.gif', ':coffee:', 'coffee']
,'82': [H+s+'33.gif', ':medicine:', 'medicine']
,'83': [H+s+'43.gif', ':email:', 'mail']

,'84': [H+s+'paw.gif', ':Paws:', 'Paw']
,'85': [H+s+'29.gif', ':anjing:', 'anjing']
,'86': [H+s+'woof.gif', ':buldog:', 'Buldog']
,'87': [H+s+'28.gif', ':kucing:', 'kucing']
,'88': [H+s+'frog.gif', ':frog:', 'frog']
,'89': [H+s+'27.gif', ':babi:', 'babi']
,'90': [H+s+'52.gif', ':exclamati', 'exclamation']

  };
  gvar.smiliebesar = {
 '291': [H+s+'smiley_beer.gif', ':beer:', 'Angkat Beer']
,'292': [H+s+'kribo.gif', ':afro:', 'afro']
,'293': [H+'smileyfm329wj.gif', ':fm:', 'Forum Music']
,'294': [H+s+'kaskuslove.gif', ':ck', 'Kaskus Lovers']
,'295': [H+'s_sm_ilovekaskus.gif', ':ilovekaskus', 'I Love Kaskus']

/* New Big Smilies */
,'500': [H+'I-Luv-Indonesia.gif', ':iloveindonesia', 'I Love Indonesia']

,'501': [H+'najis.gif', ':najis', 'Najis']
,'502': [H+'s_sm_maho.gif', ':maho', 'Maho']
,'503': [H+'hoax.gif', ':hoax', 'Hoax']
,'504': [H+'marah.gif', ':marah', 'Marah']
,'505': [H+'nosara.gif', ':nosara', 'No Sara Please']
,'506': [H+'berduka.gif', ':berduka', 'Turut Berduka']

,'507': [H+'sorry.gif', ':sorry', 'Sorry']
,'508': [H+'capede.gif', ':cd', 'Cape d...']
,'509': [H+'nohope.gif', ':nohope', 'No Hope']
,'510': [H+'bingung.gif', ':bingung', 'Bingung']
,'511': [H+'malu.gif', ':malu', 'Malu']

,'512': [H+'hammer.gif', ':hammer', 'Hammer2']
,'513': [H+'dp.gif', ':dp', 'DP']
,'514': [H+'takut.gif', ':takut', 'Takut']
,'515': [H+'salah_kamar.gif', ':salahkamar', 'Salah Kamar']

,'516': [H+'s_big_batamerah.gif', ':batabig', 'Blue Guy Bata (L)']
,'517': [H+'s_big_cendol.gif', ':cendolbig', 'Blue Guy Cendol (L)']
,'518': [H+'toastcendol.gif', ':toast', 'Toast']
,'519': [H+'s_sm_repost1.gif', ':repost', 'Blue Repost']

,'520': [H+'s_sm_repost2.gif', ':repost2', 'Purple Repost']
,'521': [H+'matabelo1.gif', ':matabelo', 'Matabelo']
,'522': [H+'shakehand2.gif', ':shakehand2', 'Shakehand2']

,'523': [H+'mewek.gif', ':mewek', 'Mewek']
,'524': [H+'sundul.gif', ':sup2:', 'Sundul']
,'525': [H+'ngakak.gif', ':ngakak', 'Ngakak']

,'526': [H+'recseller.gif', ':recsel', 'Recommended Seller']
,'527': [H+'jempol2.gif', ':2thumbup', '2 Jempol']
,'528': [H+'jempol1.gif', ':thumbup', 'Jempol']
,'529': [H+'selamat.gif', ':selamat', 'Selamat']

,'530': [H+'ultah.gif', ':ultah', 'Ultah']
,'531': [H+'rate5.gif', ':rate5', 'Rate 5 Star']
,'532': [H+'request.gif', ':request', 'Request']
,'533': [H+'cekpm.gif', ':cekpm', 'Cek PM']
,'534': [H+'cystg.gif', ':cystg', 'cystg']

,'535': [H+'ngacir2.gif', ':ngacir2', 'Ngacir2']
,'536': [H+'ngacir3.gif', ':ngacir', 'Ngacir']
,'537': [H+'babyboy.gif', ':babyboy', 'Baby Boy']
,'538': [H+'babyboy1.gif', ':babyboy1', 'Baby Boy 1']
,'539': [H+'babygirl.gif', ':babygirl', 'Baby Girl']
,'540': [H+'kaskus_radio.gif', ':kr', 'Kaskus Radio']
,'541': [H+'traveller.gif', ':travel', 'Traveller']

,'542': [H+'kimpoi.gif', ':kimpoi', 'Kimpoi']
,'543': [H+'cewek.gif', ':kiss', 'Kiss']
,'544': [H+'peluk.gif', ':peluk', 'Peluk']
,'545': [H+'cool2.gif', ':cool', 'Cool']
,'546': [H+'bola.gif', ':bola', 'Bola']

// -- OLD ---
,'901': [H+'fd_1.gif', ':jrb:', 'Jangan ribut disini']
,'901': [H+'fd_6.gif', ':kts:', 'Kemana TSnya?']
,'902': [H+'fd_5.gif', ':sup:', 'Sundul Up']
,'903': [H+'fd_4.gif', ':kbgt:', 'Kaskus Banget']
,'904': [H+'fd_8.gif', ':kacau:', 'Thread Kacau']
,'905': [H+'fd_3.gif', ':bigo:', 'Bukan IGO']
,'906': [H+'fd_7.gif', ':repost:', 'Repost']
,'907': [H+'fd_2.gif', ':cd:', 'Cape deeehh']
  };

}
,getCSS: function(){
  return (''
    +'.ktp-loading{background:transparent url("'+gvar.B.loading_gif+'") no-repeat 0 0;height:11px;min-width:11px;font-size:9px;vertical-align:bottom;}'
    +'.thread_preview, .thread_preview-readed, .thread_preview-invalid{cursor:pointer;font:normal 12px/14px "Comic Sans MS";margin-right:1px;}'
    +'.thread_preview{color:#FF0000;}'
    +'.thread_preview-readed{color:#6B6BB6;}'
    +'.thread_preview-invalid{color:#999999;}'
    
    +'.input_title, .textarea{border:1px solid #B1B1B1;}'
    +'.input_title:focus, .textarea:focus, .activeField:focus{border:1px solid #275C7C;}'
    +'#recapctha_header{min-width:320px;text-align:right;font-weight:bold;}'
    +'.txa_enable, .txa_readonly{border:1px solid #949494;}'
    +'.txa_enable{background-color:#FFF;color:#000;}'
    +'.txa_readonly{background-color:#E8E8E8;color:#4F4F4F;}'
    +'#button_preview{margin:2px 0;padding:3px 8px 3px 3px;text-align:center;}'
    +'.spacer{height:5px;}'
    +'.spc1{height:1px;}'
    +'a.cyellow{color:#F0F000!important;}'
    +'.cblue{color:#000080!important;}'
    +'.cred{color:#FF0000!important;}'
    +'.qrsmallfont, .qrsmallfont div, .g_notice{font-size:11px;}'
    +'div.qrsmallfont a, .nodeco{text-decoration:none}'
    +'.selected_row td{background-color:#D5FFD5!important;}'
    +'#thread_tools input{margin-left:5px;display:none;}'
    +'#post_detail{border:0; border-bottom:1px solid #8B8B8B;padding-bottom:5px;margin-bottom:5px;display:none;}'
    +'.g_notice{display:none;padding:.4em;margin-bottom:3px;background:#DFC;border:1px solid #CDA;line-height:16px;}'
    +'.g_notice-error{background:#FFD7FF!important;}'
    +'.hd_layer-right{float:right; margin-right:5px;}'
    +'.hd_layer-left{float:left; margin-left:5px;}'
	+'.qr_button_cont{width:100%; text-align:center;}'
	+'#qr_button{margin-right:-40px;}'
	+'#preview_cancel,#preview_setting{margin:2px 0 0 5px;font-size:13px;outline:none;}'
    +'#collapseimg_quickreply{border:0;}'
    +'#atoggle{outline:none;}'
    +'.btman-suspect{font-size:11px;margin-bottom:-5px;font-weight:bold;}'
    +'.btman-suspect a, .btman-suspect:hover .btman-href{text-decoration:none}'
    +'.btman-suspect a span{color:red;text-decoration:blink}'
    +'.btman-suspect:hover a span{color:red;text-decoration:underline}'
    +'.btman-href{margin-left:20px;background:#FFD7FF;font:11px/12px \'Courier New\',sans-serif!important;font-size:11px}'
    +'.btman-strike{text-decoration:line-through}'

/* ==settings== */ 
    +'a.lilbutton{padding:1px 5px; 2px 5px!important;text-shadow:none;}'
    +'a.lilbutton.twbtn-primary{color:#F0F000;}a.lilbutton.twbtn-primary:hover{color:#fff;}'
    +'.setting_subtitle{padding:0 0 3px 25px;}'
	+'#tbl_setting textarea{font-family:"Courier New";font-size:9pt;width:95%;margin-top:3px;}'
    +'.cancel_layout {margin:6px 3px 0 0;}'
    +'.cancel_layout-invi {display:none;}'
	
/* ==Updater== */ 
  +'.qrdialog{border-bottom:1px transparent;width:100%;left:0px;bottom:0px;padding:3px;}'
  +'.qrdialog-close{padding:5px;margin:5px 15px 0 0;cursor:pointer;float:right;}'
  +'.qrdialog-child{background:#BFFFBF; border:1px solid #9F9F9F; height:30px;width:450px;margin-left:3px;padding:.2em .5em; font-size:8pt; border-radius:5px; -moz-border-radius:5px; -khtml-border-radius:5px; -webkit-border-radius:5px; box-shadow:3px 3px 15px #888; -moz-box-shadow:3px 3px 15px #888; -khtml-box-shadow:3px 3px 15px #888; -webkit-box-shadow:3px 3px 15px #888;}'
	
/* ==QR-&-controler== */ 
    +'.controlbar{text-align:left;}'
    +'.txta_cont{min-width:100%;width:100%;padding-right:5px;}'
	+'#controller_wraper{border:1px solid transparent;background-color:transparent;margin-top:-20px;line-height:80px;}'
	+'.textarea{/* clear:both; */width:100%;min-height:95px;}'
    +'.panelsurrounds .panel, .imagebutton{background:#DFDFE0;}'
    +'.imagebutton:hover, .imagebutton_color:hover{cursor:pointer;}'
    +'.customed_addcontroller img, .imagebutton img, .ofont, .osize{color:#000;border:1px solid transparent;background-color:transparent;}'
    +'.customed_addcontroller img:hover, .imagebutton img:hover{color:#000;border:1px solid #2085C1;background-color:#B0DAF2;}'
/* ==QR-smiley-tab== */ 
    +'#skecil_container, #sbesar_container, #scustom_container{border: 1px solid #BBC7CE;padding:2px;}'
    +'#scustom_container{padding-top:10px !important;}'
    +'#skecil_container img, #sbesar_container img, #scustom_container img{margin:0 1px;border:1px solid transparent;max-width:120px; max-height:120px;}'
    +'#skecil_container img:hover, #sbesar_container img:hover, #scustom_container img:hover, #nfo_version:hover{cursor:pointer;border:1px solid #2085C1;background-color:#B0DAF2;}'
    +'#content_scustom_container .ofont{text-decoration:none;cursor:pointer;}'
    +'#content_scustom_container .nothumb{padding:1px 3px;}'
    +'#content_scustom_container .scustom-thumb{margin-left:2px;}'
    +'.ul_tabsmile{list-style:none;padding:0;height:1em;margin:'+(gvar.isOpera||gvar.isBuggedChrome?'5px 0 2px 2px':'2px 0 3px 2px')+';}'
    +'.ul_tabsmile li{display:inline;margin-left:3px;}'
    +'li.tab_close{float:right !important;}'
    +'.ul_tabsmile a{border:1px solid #BBC7CE;background-color:#C4C4C4;padding:3px;text-decoration:none;border-bottom:0;font-size:8pt;}'
    +'.ul_tabsmile a:hover{background-color:#B0DAF2;}'
    +'.ul_tabsmile a.current, .ul_tabsmile a.current:hover, .qbutton:hover{background-color:#DDDDDD;}'
    +'.qbutton{padding:1px 3px;border:1px solid #1E67C1; background-color:#C7C7C7; color:#000; text-decoration:none; border-radius:3px; -moz-border-radius:3px; -khtml-border-radius:3px; -webkit-border-radius:3px;}'

/* ==ktp popup== */ 
    +'#img_ngaskuser{height:120px;}'
    +'#post_detail .powby{color:#363636;position:absolute;cursor:default;margin:88px 0 0 333px;font-size:10px;-moz-user-select:none;-webkit-user-select:none;}'
    +'#post_detail .powby .b,#post_detail .powby .or{font-weight:bold;}'
    +'#post_detail .powby .b{color:#0000CE;}#post_detail .powby .or{color:#DD6F00;}'

/* ==preview popup== */ 
  	+'#hideshow {position:absolute;min-width:100%;top:0;left:0;}'
  	+'#preview_content {overflow:auto;height:auto;padding-right:5px;}'
    +'#popup_container {'
    +  'z-index:'+gvar.zIndex+';'
    +  'background: #ddd; color:black; padding: 5px; border: 5px solid #fff;'
    +  'border-radius:5px; -moz-border-radius:5px; -khtml-border-radius:5px; -webkit-border-radius:5px;'
    +'}'
    +'#popup_container {width:95%;left:1%;}'
    +'.popup_block .popup {'
    +  'float: left; width: 100%; background: #D1D4E0; margin: 0;'
    +  'padding: 0; border: 1px solid #bbb;'
    +'}'
    +'.popup img.cntrl, .popup img.sticky {position:absolute;border:0px;}'
    +'.popup img.cntrl {right:-20px;top:-20px;}'
    +'.popup img.sticky {left:0;top:-3px;}'
    +'*html #popup_container{'
    +  'position: absolute;'
    +  'top:expression(eval(document.compatMode && document.compatMode==\'CSS1Compat\') ? documentElement.scrollTop'
    +  '+((documentElement.clientHeight-this.clientHeight)/2) : document.body.scrollTop'
    +  '+((document.body.clientHeight-this.clientHeight)/2));'
    +  'left:expression(eval(document.compatMode && document.compatMode==\'CSS1Compat\') ? documentElement.scrollLeft'
    +  '+(document.body.clientWidth /2 ) : document.body.scrollLeft + (document.body.offsetWidth/2));'
    +'}'
    
	/* twitter's button */
    +'.twbtn{background:#ddd url("'+gvar.B.twbutton_gif+'") repeat-x 0 0;font:11px/14px "Lucida Grande",sans-serif;width:auto;margin:0;overflow:visible;padding:0;'
	+'border-width:1px;border-style:solid;border-color:#999;border-bottom-color:#888;-moz-border-radius:4px;-khtml-border-radius:4px;-webkit-border-radius:4px;'
	+'border-radius:4px;color:#333;text-shadow:1px 1px 0 #B1B1B1;cursor:pointer;} '
	+'.twbtn::-moz-focus-inner{padding:0;border:0;}'
	+'.twbtn:hover,.twbtn:focus,button.twbtn:hover,button.twbtn:focus{border-color:#999 #999 #888;background-position:0 -6px;color:#000;text-decoration:none;}'
	+'.twbtn-m{background-position:0 -200px;font-size:12px;font-weight:bold;line-height:10px!important;padding:5px 8px;-moz-border-radius:5px;'
	+'-khtml-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;margin:-4px 0 -3px 0;}a.twbtn{text-decoration:none;}'
	+'.twbtn-primary{border-color:#3B3B3B;font-weight:bold;color:#F0F000;background:#21759B;}'
	+'.twbtn:active,.twbtn:focus,button.twbtn:active{background-image:none!important;text-shadow:none!important;outline:none!important;}'
	+'.twbtn-disabled{opacity:.6;filter:alpha(opacity=60);background-image:none;cursor:default!important;}'
	
	/* thumb image */
	+'.imgthumb:hover {background-color:#80FF80 !important;}'
	+'.imgthumb {line-height:20px;font-size:11px;padding:2px;padding-left:28px;background:#DDFFDD url(data:image/png;base64,'
	+'iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAIAAAD3FQHqAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAAsTAAALEwEAmpwYAAADHUlEQVR42qWUW28bVRDH/'
	+'7M+Xu+uL3VcJzGlkYAWmVZKZKkS5fLQJ5CQ+gnyGSueIvFAJSoI9KFKWglQSFpCoMjxJb6u1157d2Z4WKd2kpdWnPNw5vzn6HdmRnMOPfr20dbWFv732NnZMbVarbJWUdWr7qvisvLGVlVjTLVa'
	+'NQCY+fsnvwz9MVHig6qqqojI+SLJ0HNjSbn9wfvffPUAgEnYx6/bJ/41iyiVUicTsegosKLYYhYWi0ViJpZkS8wLIxYh/JtA5ixjUoWsk0nrZjXYvO2xyN7B6MUf2VkEYWURFmUWFmURXlJENG'
	+'X5F1mWlXXSldXxl7X19ZX70Djv7Xb7QbPjJZkwK4uKzHEii23KCi6wLAuunS7k4GUKBAMynpMr5ifB2BZRUT0vkLLI4PVeprCRyl2PWZgV0AVLVS1C1kmHYe60c2IbVxCfnjWiqJj3FixVFdFu'
	+'/dCQtA8fv7f5MOsWAFhKRLQUF5Hn2oD9+0ur1TlURatTNpaXc1VUVZGwJsGwfvR07cN7k8DvnzyrfvoQgBlZl1iadWwQSEtnnRUFCMi5UMz7QxUx8/6T7/xh/+7q2p/AxG+XCi6AcHKJBXiOud'
	+'iXi6mKKOLjg71W/S8ABjGAGxsfFbIZAFGKLMta1Kt51vu78xtAy12dhDOdRWEYxdHEb/6aya4BePbzY2Pn+mH+hx+fA7i1OiUiIprHEoZhN+zjTeMDzDKL4uksTt6KcDyaOZPAB9QYN2YzabXz'
	+'RSIiub6Uo6oGQdDszpLCMAuzyNUXagqWa48G7TgY5ovrzdN/Op3WSvkmywoRQXXOGg79eiN6m/+A7DzEOmvVb94oG2LXIyeTbjQbjUZjnuMsigaDwTt8MZT5+kHts3t3p9PpYDDY3f3p6OilAU'
	+'BEpLGDd2IhDEfhJOz3+91u1806dz65Q6+OX5VL5aHvC0tSQiICgUBLRqJe8D1/sTceTTrdjkmnPr//xf7+vhmPx/G12PPc8/soWS7HQZelXq/X7/XXK5Xqx9VSqbS9vT0/cXB4YKdtFn7LFEVk'
	+'HAQrxZLjOHEcb2xsAPgPkT44D3rdTkkAAAAASUVORK5CYII=) no-repeat !important; color:#000 !important;}'
  );
 } 
,getCSS_fixed: function(fixed){
  return (''
   +'#popup_container{' + (fixed ? 'position:fixed;top:'+gvar.offsetLayer+'px;':'position:absolute;') + '}'
   +'#preview_content {overflow:auto;height:auto; max-height:'+(parseInt(getScreenHeight()) - gvar.offsetMaxHeight - gvar.offsetLayer)+'px; }'
   +'#preview_content div table{max-width:95%;overflow:auto;}'
   +'.thread_preview{color:'+gvar.settings.color_state[0]+'}'
   +'.thread_preview-readed{color:'+gvar.settings.color_state[1]+'}'
   +'.thread_preview-invalid{color:'+gvar.settings.color_state[2]+'}'
  );
 }
,getSCRIPT: function(){
  return (''
   +'function showRecaptcha(element){'
   + 'if(undefined==Recaptcha){document.getElementById(element).innerHTML="Upps, Recaptcha load failed,."; return;}'
   + 'Recaptcha.create("6Lf8xr4SAAAAAJXAapvPgaisNRSGS5uDJzs73BqU",element,'
   +  '{theme:"red",lang:"en"'
   +    ',custom_translations:{refresh_btn:"Reload reCapcay :: [Alt+R]",instructions_visual:"Masukkan reCapcay:"}'
   +  '}'
   + ');'
   +'};'
   +'function loadCapcay(e){window.addEventListener("load", showRecaptcha(e), false)};'
   +'function open_win_smiley(){'
   +  'window.open("misc.php?do=getsmilies&editorid=vB_Editor_001","smilie_window", "left=20,top=10,width=520,height='+getScreenHeight()+'");return false;'
   +'};'
  );  
 }
// tPL
,getTPL_preview: function(){

  return (''
 +'<div id="popup_container" class="popup_block"> '
 + '<div class="popup" id="popup_child">'
 +  '<a tabindex="209" href="javascript:;"><img id="imghideshow" title="Close" class="cntrl" src="'+gvar.B.closepreview_png+'"/></a>'
 +  '<a tabindex="208" href="javascript:;"><img id="imgsticky" title="Toggle Fixed View" class="sticky" src="'+(gvar.settings.fixed_preview ? gvar.B.sticky1_png : gvar.B.sticky2_png)+'"/></a>'
 +  '<table class="tborder" align="center" border="0" cellpadding="6" cellspacing="1" width="100%">'
 +  '<tbody><tr>'
 +   '<td class="tcat" id="head_layer" style="cursor:s-resize;">'
 
 +     '<div class="hd_layer blockhead"><span id="prev_title"></span>&nbsp;' +HtmlUnicodeDecode('&#8592;')
 + (gvar.TS.id ? '[<small>TS :: </small><a id="ts_userlink" onclick="return '+(!gvar.isKaskus ? 'true':'false')+'" target="_blank" href="member.php?u='+gvar.TS.id+'" title="Thread starter by '+gvar.TS.name+'" class="ktp-user_link cyellow"><b>'+gvar.TS.name+'</b></a>]' : '')
 // 
 + (gvar.current.isLastPost ? (gvar.TS.id ? ' - ' : '' )+'[<small><a href="showthread.php?p='+gvar.LPOST.pid+'#post'+gvar.LPOST.pid+'" target="_blank" title="View Single Post">Post By</a> :: </small><span id="poster_userlink" class="cyellow"><b>'+gvar.LPOST.name+'</b></span>]' : '')
 + ' <span id="upd_notify"></span>'
 
 +     '<a id="atoggle" href="javascript:;" class="hd_layer-right"><img id="collapseimg_quickreply" src="'+gvar.domainstatic+'images/buttons/collapse_tcat.gif" alt="" /></a>'
 +     '<a id="preview_setting" href="javascript:;" style="right:45px;position:absolute;margin-top:-4px;"><img src="'+gvar.B.setting_gif+'" alt="setting" title="Settings" border="0" /></a>'
 +    '</div>' // .hd_layer | .blockhead

 +   '</td>' // #head_layer
 +  '</tr><tr id="row_content">'
 +  '<td class="alt1">'

 +   '<div id="post_detail"></div>' // kaskus badge | user detail
 +   '<div id="preview_content" class="blockbody formcontrols"></div>' // main post-content
 + (gvar.user.id && !gvar.current.TRIT_isClosed ? ''
 +   '<div id="container_reply" style="text-align:right;padding:3px 15px 0 0;margin:5px 0 -6px 0;border-top:1px solid #DBDBDB;">'
 +    '<a id="btn_quote_reply" onclick="return false" href="javascript:;" >'
 +     '<img src="'+gvar.domainstatic+'images/buttons/quote.gif" alt="Quote" title="Quote & Quick Reply this Message" border="0"/></a>'
 +     '<div id="quote_loading" style="margin-right:5px;float:right;display:none;"><div class="ktp-loading" style="display:inline-block;padding:3px 0 2px 15px;">loading...</div></div>'
 +   '</div>' : '') // #container_reply

 +  '</td></tr>'
 +  '<tbody></table>'

 +  '<div id="tbl_separator" class="spacer"></div>'

 +( !gvar.current.isLastPost && gvar.LPOST.pid ? ''
 +  '<div id="threadpost_navi" style="float:right;">'
 +    '<input type="button" id="last_post" class="twbtn twbtn-m" value="Show Last Post" style="margin-right:5px;" />' 
 +  '</div>' 
 : '')
 +  '<div id="thread_tools" style="float:left;">'
 +    '<input type="button" id="open_spoilers" class="twbtn twbtn-m" value="Show Spoilers" style="margin-right:10px;" />' 
 +    '<input type="button" id="show_emotes" class="twbtn twbtn-m" value="Show Emotes" style="" />'
 +    '<input type="button" id="show_images" class="twbtn twbtn-m" value="Show All Images" style="" />'
 +  '</div>'
 +  '<div id="thread_separator" style="height:25px; display:'+(gvar.current.isLastPost?'none':'')+';"></div>'

 // quick-reply form
 +(gvar.user.id && !gvar.current.TRIT_isClosed ? '<form action="'+gvar.current.action+'" method="post" name="vbform" id="vbform" style="display:;">' : '')
 +   '<div style="display:none;">'
 +    '<input type="submit" name="real_submit" value="Submit Post"/>'
 +   '</div>'
 +  '<table id="qr_container_table" class="tborder" align="center" border="0" cellpadding="6" cellspacing="1" width="100%">'
 +  '<thead id="qr_container_head" style="display:none;"><tr>'
 +   '<td class="tcat blockhead" style="border:0;">'
 +(!gvar.current.TRIT_isClosed ? 'Quick Reply' : '')
 +     '<span id="loggedin_as"></span>'
 +     '<span id="ktp_version" class="hd_layer-right" style="">'+gvar.codename+' '+HtmlUnicodeDecode('&#8212;')+' '+'<a href="http://userscripts.org/scripts/show/94448" target="_blank" title="Home '+gvar.codename+' - '+gvar.sversion+'">'+gvar.sversion+'</a></span>'
 +   '</td>'
 +  '</tr></thead>'
 +  '<tbody id="collapseobj_quickreply" style="display:none;">'
 +   '<tr><td class="panelsurround">'
 +    '<div class="panel">'
 +    '<div id="qr_container" class="blockbody formcontrols">'

 +      '<div>'+_LOADING+'</div>' // this will be injected w/ getTPL_QuickReply()

 +    '</div>' // #qr_container 
 +    '</div>' // .panel 
 +  '</td></tr><tbody>'
 
 +  '<tfoot id="tr_qr_button">' // this node will killed once qr pressed 
 +  '<tr><td class="tcat blockhead" style="border:0;">' 
 +    '<a tabindex="206" id="preview_cancel" href="javascript:;" class="'+(!gvar.isVBul4?'cyellow ':'')+'hd_layer-left" style=""><b>Cancel</b></a>'
 +    '<span id="ktp_version" class="hd_layer-right" style="">'+(!gvar.isVBul4 ? gvar.codename:'vBulletin Thread Preview')+' '+HtmlUnicodeDecode('&#8212;')+' '+'<a href="http://userscripts.org/scripts/show/94448" target="_blank" title="Home '+(!gvar.isVBul4 ? gvar.codename:'vBulletin Thread Preview')+' - '+gvar.sversion+'">'+gvar.sversion+'</a></span>'
 + (gvar.user.id && !gvar.current.TRIT_isClosed ? ''
 +    '<div id="qr_button_cont" class="qr_button_cont">'
 +     '<input type="button" id="qr_button" class="twbtn twbtn-m" value="Quick Reply" style="width:300px;" />'
 +    '</div>' : '')
 +  '</td></tr>'
 +  '</tfoot>' 
 +'</table>'

 +(!gvar.current.TRIT_isClosed ? ''
 +   '<div id="button_preview" style="display:none;">'
 +'<input type="hidden" name="humanverify[hash]" value="" id="qr_hash" />'
 +'<input type="hidden" name="s" value="" />'
 +'<input type="hidden" name="securitytoken" value="" id="qr_securitytoken" />'
 +'<input type="hidden" name="do" value="postreply" id="qr_do" />'
 +'<input type="hidden" name="t" value="" id="qr_t" />'
 +'<input type="hidden" name="p" value="" id="qr_p" />'
 +'<input type="hidden" name="specifiedpost" value="0" id="qr_specifiedpost" />'
 +'<input type="hidden" name="loggedinuser" value="" id="qr_loggedinuser" />'
 +'<input type="hidden" name="multiquoteempty" id="multiquote_empty_input" value="" />'
 +'<input type="hidden" name="parseurl" value="1" />'
 +'<input type="hidden" name="wysiwyg" value="0" />'
 +'<input type="hidden" name="styleid" value="0" />' + "\n\n"
 +'<div id="rate_thread" class="smallfont" style="position:absolute;left:80px;margin-top:1px;display:none;"></div>'
 +'<span>'
 +  '<input tabindex="205" id="preview_submit" type="button" class="twbtn twbtn-m twbtn-primary" value=" Post " />&nbsp;'
 +  '<label for="then_gotothread"><input type="checkbox" id="then_gotothread" value="1"'+(gvar.settings.then_goto_thread ? ' checked="checked"':'')+' /><small style="font-weight:bold;" class="cblue">Then Goto Thread</small></label>'
 +'</span>'
 +   '</div>' // #button_preview
 : '')
 
 +(gvar.user.id && !gvar.current.TRIT_isClosed ? '</form>' : '')
 
 + '<div id="setting_container" style="position:absolute;right:1%;min-width:450px;border:2px outset;background:#F5F5FF;margin-top:1px;display:none;">'
 //+ rSRC.getTPL_setting()
 + '</div>' // #setting_container 
 
 + '</div>' // #popup_child
 +'</div>' // #popup_container
 );
}
,getTPL_setting: function(){
 var spacer = '<div class="spc1" style=""></div>';
 return (''
 + '<table id="tbl_setting" cellpadding="0" cellspacing="0" border="0">'
 + '<tr><td colspan="2" align="center">'
 + '<div class="g_notice" style="display:inline-block;margin-bottom:0;padding-top:8px;height:20px;width:450px;">'
 +   '<div style="float:left;margin-left:10px;"><strong>'+gvar.codename+' Settings</strong></div>'
 +   '<div style="float:right;margin-right:10px;">'
 +     '<a id="save_settings" href="javascript:;" class="twbtn twbtn-m twbtn-primary lilbutton" style="">save</a>&nbsp;&nbsp;'
 +     '<a id="cancel_settings" href="javascript:;">cancel</a>'
 +   '</div>'
 + '</div>'
 + '</td></tr><tr>'

 + '<td class="alt2" valign="top" style="padding-left:5px;">'
 +  '<div class="setting_subtitle"><b>::QR::</b></div>'
 +  '<input id="stg_autolayout_sigi" type="checkbox" '+(gvar.settings.userLayout.config[0]=='1' ? 'checked':'')+'/> AutoSignature&nbsp;'
 +  '<small><a id="edit_sigi" class="twbtn twbtn-m lilbutton" href="javascript:;">edit</a>&nbsp;&nbsp;<a id="edit_sigi_cancel" href="javascript:;" class="cancel_layout cancel_layout-invi">X</a></small><br />'
 +  '<div id="edit_sigi_Editor" style="display:none;"></div>'
 +spacer
 +  '<input id="stg_autolayout_tpl" type="checkbox" '+(gvar.settings.userLayout.config[1]=='1' ? 'checked':'')+'/> AutoLayout&nbsp;'
 +  '<small><a id="edit_tpl" class="twbtn twbtn-m lilbutton" href="javascript:;">edit</a>&nbsp;&nbsp;<a id="edit_tpl_cancel" href="javascript:;" class="cancel_layout cancel_layout-invi">X</a></small><br />'
 +  '<div id="edit_tpl_Editor" style="display:none;"></div>'
 +spacer
 +  '<input id="stg_autoshow_smile" type="checkbox" '+(gvar.settings.autoload_smiley[0]=='1' ? 'checked':'')+'/> AutoLoad Smiley<br />'
 +  '<small style="margin-left:20px;">'
 +   '<label for="stg_autoshow_smile_kecil"><input name="rd_sml" id="stg_autoshow_smile_kecil" type="radio" value="kecil" '+(gvar.settings.autoload_smiley[1]=='kecil' ? 'CHECKED':'')+'/>kecil</label>&nbsp;'
 +   '<label for="stg_autoshow_smile_besar"><input name="rd_sml" id="stg_autoshow_smile_besar" type="radio" value="besar" '+(gvar.settings.autoload_smiley[1]=='besar' ? 'CHECKED':'')+'/>besar</label>&nbsp;'
 +   '<label for="stg_autoshow_smile_custm"><input name="rd_sml" id="stg_autoshow_smile_custm" type="radio" value="custom" '+(gvar.settings.autoload_smiley[1]=='custom' ? 'CHECKED':'')+'/>[+]</label>'
 +  '</small>'
 +spacer   
 + '</td>' 
 + '<td class="alt2" valign="top" style="padding:0 5px 10px 5px; border-left:1px solid #BBC7CE; width:200px;">'
 +  '<div class="setting_subtitle"><b>::General::</b></div>'
 
 +(!gvar.noCrossDomain ? ''
 +  '<label for="stg_updates" title="Check Userscripts.org for QR latest update"><input id="stg_updates" type="checkbox" '+(gvar.settings.updates==1 ? 'checked':'')+'/> Updates</label>&nbsp;&nbsp;<small><a id="chk_upd_now" class="twbtn twbtn-m lilbutton" href="javascript:;" title="Check Update Now">check now</a></small>'
 +spacer
 +  '<small style="margin-left:20px;" title="Interval check update, 0 &lt; interval &lt;= 99">Interval&nbsp;<input id="stg_updates_interval" type="text" value="'+gvar.settings.updates_interval+'" maxlength="5" style="width:40px; padding:0pt; margin-top:2px;"/>&nbsp;days</small>'
 +spacer : '') 
 
 //+  '<input id="stg_autoload_qr" type="checkbox" /> AutoLoad QR<br />'
 //+  '<input id="stg_autoshow_spoiler" type="checkbox" /> AutoShow Spoiler<br />'
 // 
 +'&nbsp;*<span style="margin-left:8px;">Images Policy</span><br />'
 +'<div id="image_policy" style="margin-left:20px;font-size:10px;">'
 +   '<label for="stg_showimages_none"><input name="rd_img" id="stg_showimages_none" type="radio" value="0" '+(gvar.settings.imgload==0?'checked':'')+'/>No-Image</label>' + '<br/>'
 +   '<label for="stg_showimages_emot"><input name="rd_img" id="stg_showimages_emot" type="radio" value="1" '+(gvar.settings.imgload==1?'checked':'')+'/>Emotes-Only</label>' + '&nbsp;'
 +   '<label for="stg_showimages_alll"><input name="rd_img" id="stg_showimages_alll" type="radio" value="2" '+(gvar.settings.imgload==2?'checked':'')+'/>Show All</label>'
 +'</div>'
 +spacer
 //stg_state_color_ready stg_state_color_readed  stg_state_color_invalid
 +'&nbsp;*<span style="margin-left:8px;">Node State Color</span><br />'
 +'<div id="node_state_colors" style="margin-left:20px;font-size:10px;">'
 +   '<label for="stg_state_color_ready">Ready:</label><input id="stg_state_color_ready" class="qrsmallfont" type="text" size="10" value="'+gvar.settings.color_state[0]+'"/>' + '<br>'
 +   '<label for="stg_state_color_readed">Readed:</label><input id="stg_state_color_readed" class="qrsmallfont" type="text" size="10" value="'+gvar.settings.color_state[1]+'"/>' + '<br>'
 +   '<label for="stg_state_color_invalid">Invalid:</label><input id="stg_state_color_invalid" class="qrsmallfont" type="text" size="10" value="'+gvar.settings.color_state[2]+'"/>'
 +'</div>'
 +spacer
 +  '<input id="stg_scrollto_lastrow" type="checkbox" '+(gvar.settings.thread_lastscroll==1 ? 'checked':'')+'> Scroll to Last Position<br />'
 +  '<input id="stg_reload_afterpost" type="checkbox" '+(gvar.settings.reload_aftersent==1 ? 'checked':'')+'/> Reload after Posting<br />'

 +'<div style="height:6px;"></div>'
 +'<a id="reset_default" class="nodeco" href="javascript:;"><small>reset default</small></a>'
 //+'<div style="height:6px;"></div>'
 +spacer
 + '' 
 + '</td></tr><tr>'
 + '<td colspan="2" align="center">'
 + '<div class="g_notice" style="display:inline-block;margin-bottom:0;padding:2px 0;height:13px;width:460px;">'
 +   '<div style="clear:both;text-align:center;font-size:9px;">'
 +   'Save-Setting <b>WILL CLOSE</b> Pop-Up Preview and may require reload page.'
 +   '</div>'
 + '</div>'
 + '</td></tr>'
 + '</table>'
 //+ '<div class="spacer"></div>'
 );
}
,getTPL_qr: function(){
 return (''
 +'<div id="quoted_notice" class="g_notice"></div>' // Quoted notice
 +'<table cellpadding="0" cellspacing="0" border="0"><tr>'
 + '<td><div class="qrsmallfont">'
 + '<div style="float:left;">Title:&nbsp;<a href="javascript:;" id="atitle" title="Optional Title Message">[+]</a>&nbsp;</div><div id="titlecont" style="display:none;"><div id="dtitle" style="float:left;margin-top:-3px;""><input id="input_title" type="text" tabindex="1" name="title" class="input_title" title="Optional"/></div>&nbsp;<div class="spacer">&nbsp;</div></div>'
 +'Message:&nbsp;<a id="textarea_clear" href="javascript:;" title="Clear Editor">reset</a>'
 + '</div></td>'
 + '<td>&nbsp;</td>'
 + '</tr><tr>' 
 // vB_Editor_QR_textarea
 +  '<td class="txta_cont panelsurrounds">'
 
 +   '<div class="panel"><div>'
 +   rSRC.getTPL_vbEditor()
 +   '</div></div>'
 
 +  '</td>' 
 +   '<td id="recaptcha_cont" valign="bottom">'
 +    '<div id="recapctha_header" style="float:right;margin-top:-15px;">reCAPTCHA&nbsp;</div>'
 +    '<div id="recaptcha_container" style="text-align:center;">'
 +      '<div>'+_LOADING+'</div>'
 +    '</div>'
 +   '</td>'
 + '</tr></table>'
 +'<div id="smile_cont" style="display:none;"></div>'

 /* -remote-capctha- */
 +'<fieldset class="fieldset" id="fieldset_capcay" style="display:none;">'    
 +  '<input id="hidrecap_btn" value="reCAPTCHA" type="button" style="display:;" onclick="loadCapcay(\'recaptcha_container\');" />' // remote create
 +  '<input id="hidrecap_reload_btn" value="reload_reCAPTCHA" type="button" style="display:;" onclick="Recaptcha.reload();" />' // remote reload
 +'</fieldset>'
 );
}
,getTPL_vbEditor: function(){
  return (''
  +'<table cellpadding="0" cellspacing="0" border="0" width="100%">'
  +'<tr><td id="vB_Editor_001" class="vBulletin_editor">'
  +  '<div id="vB_Editor_001_controls" class="controlbar" style="width:100%;">'
  // controller filled here..
  + '<table cellpadding="0" cellspacing="0" border="0">'
  + '<tr>'
  +  '<td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_insertsmile"><img id="vB_Editor_001_cmd_insertsmile_img" src="'+gvar.B.smile_gif+'" alt="Smiles" title="Smiles" /></div></td>'
  + '</tr>'
  +  '</table>'
  +  '</div>' // end #vB_Editor_001_controls
  +  '<table cellpadding="0" cellspacing="0" border="0" width="100%">'
  +   '<tr><td class="controlbar">'
  +     '<textarea name="message" id="'+gvar.id_textarea+'" class="textarea" rows="5" tabindex="201" dir="ltr" disabled="disabled" style=""></textarea>'
  +   '</td></tr>'
  +  '</table>'
  +'</td></tr>'
  +'</table>'
  +''
  +''
  );
}

}; // end rSRC

// end- main Object
// ------
init();
// ------

})();
/* Mod By Idx. */

