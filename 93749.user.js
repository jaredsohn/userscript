// ==UserScript==
// @name          Kaskus Quick Reply
// @namespace     http://userscripts.org/scripts/show/80409
// @include       http://*.kaskus.us/showthread.php?*
// @version       3.0.7
// @dtversion     101225307
// @timestamp     1293235093132
// @description   provide a quick reply feature, under circumstances capcay required.
// @author        bimatampan
// @moded         idx (http://userscripts.org/users/idx)
// @license       (CC) by-nc-sa 3.0
// @contributor   Sanji, riza_kasela, p1nky, b3g0, fazar, bagosbanget, eric., Sanjito, bedjho, Piluze, intruder.master, Rh354, gr0, hermawan64, slifer2006, gzt, Duljondul, reongkacun, otnaibef, ketang8keting, farin, & all-kaskuser@t=3170414
//
// -!--latestupdate
//
// v3.0.7 - 2010-12-25
//   Add Last used Spoiler-Title
//   Fix (Opera) onclose preview keep last char as "\n\n" 
//   Add 5 new Emotes
//   Fix autoGrow, keep currentYPos after overflow auto on keydown (backspace; delete)
//   Fix deprecate trick on keydown keyCode=13
//   Improve onclose preview keep last char as "\n\n" 
//   
// -/!latestupdate---
// ==/UserScript==
/*
//   
// v3.0.6 - 2010-12-04
//   Fix global $ collision with jQuery's (or is it just only a weirdness on Opera?)
//   Improve botgreet; add RTFM link
//   Add :( emote
//   Fix failed load custom-smiley content on bad link last-img
//   Improve string optimized on scustom content
//   
// v3.0.5 - 2010-11-26
//   Fix failed shortcut Ctrl+[B-I-U]
//   Improve Updater nfo last-log-update






//
// -more: http://userscripts.org/topics/56051
// 
// version 0.1 - 2010-06-29
// Init
//------
//
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.ms
// --------------------------------------------------------
*/
(function () {

// Initialize Global Variables
var gvar=function() {};

gvar.sversion = 'v' + '3.0.7';
gvar.scriptMeta = {
  timestamp: 1293235093132 // version.timestamp

 ,scriptID: 80409 // script-Id
};
/*
javascript:window.alert(new Date().getTime());
javascript:(function(){var d=new Date(); alert(d.getFullYear().toString().substring(2,4) +((d.getMonth()+1).toString().length==1?'0':'')+(d.getMonth()+1) +(d.getDate().toString().length==1?'0':'')+d.getDate()+'');})()
*/
//=-=-=-=--=
//========-=-=-=-=--=========
gvar.__DEBUG__ = false; // development debug
//========-=-=-=-=--=========
//=-=-=-=--=

OPTIONS_BOX = {
  KEY_SAVE_SAVED_AVATAR:  ['']
 ,KEY_SAVE_LAST_FONT:     [''] // last used font
 ,KEY_SAVE_LAST_COLOR:    ['Black'] // last used color
 ,KEY_SAVE_LAST_SIZE:     [''] // last used size
 ,KEY_SAVE_LAST_SPTITLE:  ['title'] // last used spoiler-title
 
 ,KEY_SAVE_UPDATES:          ['1'] // settings check update
 ,KEY_SAVE_UPDATES_INTERVAL: ['1'] // settings update interval, default: 1 day
 ,KEY_SAVE_HIDE_AVATAR:      ['0'] // settings hide avatar
 ,KEY_SAVE_DYNAMIC_QR:       ['1'] // settings dynamic QR
 ,KEY_SAVE_HIDE_CONTROLLER:  ['0,0,0,0,0,0,0,0,0,0,0,0,0,0'] // settings serial hide [controller]
 ,KEY_SAVE_CUSTOM_SMILEY:    [''] // custom smiley, value might be very large; limit is still unknown 
 ,KEY_SAVE_QR_HOTKEY_KEY:    ['1,0,0'] // QR hotkey, Ctrl,Shift,Alt
 ,KEY_SAVE_QR_HOTKEY_CHAR:   ['Q'] // QR hotkey, [A-Z]
 ,KEY_SAVE_TEXTA_EXPANDER:   ['1,100,350'] // [flag,minHeight,maxHeight] of textarea_expander
 ,KEY_SAVE_SHOW_SMILE:       ['0,kecil']   // [flag,type] of autoshow_smiley
 ,KEY_SAVE_LAYOUT_CONFIG:    ['']       // flag of [signature_on, template_on], 
 ,KEY_SAVE_LAYOUT_SIGI:      [''] // signature layout, eg. [RIGHT]&#8212;[SIZE=1][b]QR[/b][/SIZE]&#8482;[/RIGHT]
 ,KEY_SAVE_LAYOUT_TPL:       [''] // template layout, must contain: "{message}". eg. [B]{message}[/B]
 
 ,KEY_SAVE_SCUSTOM_ALT:      ['0'] // use alt instead of thumbnail
 ,KEY_SAVE_SCUSTOM_NOPARSE:  ['0'] // dont parse custom smiley tag. eg. tag=babegenit. BBCODE=[[babegenit]
 
 ,KEY_SAVE_QR_COLLAPSE:  ['1'] // initial state of qr
 ,KEY_SAVE_WIDE_THREAD:  ['1'] // initial state of thread, wider by Kaskus Fixups - chaox
 ,KEY_SAVE_TMP_TEXT:     [''] // temporary text before destroy maincontainer
 ,KEY_SAVE_QR_LastUpdate:['0'] // lastupdate timestamp
};
GMSTORAGE_PATH      = 'GM_';

// initialize assign global var
function init(){
  
  if(gvar.__DEBUG__) DOMTimer.start();
  
  if(page_is_notloaded('Page is temporary not available')) show_alert('Page is not available', 0);
  
  //------------
   ApiBrowserCheck();
  //------------  
  
  // initialize gvar..
  gvar.domain= 'http://'+'www.kaskus.us/';
  gvar.reCAPTCHA_domain= 'http://'+'api.recaptcha.net';
  gvar.reCAPTCHA_google_domain= 'http://'+'www.google.com/recaptcha/api';
  
  gvar.domainstatic= 'http://'+'static.kaskus.us/';
  gvar.avatarLink= gvar.domainstatic + 'customavatars/';
  gvar.titlename= 'Quick Reply';
  gvar.scriptId= '80409';

  // min-height postbit assumed with OR w/o quote per singleline, [{adaQuote}, {ga_adaQuote}]
  gvar.offSet_SiGi= [5, 8];
    
  gvar.ck= {bbuserid_currentpage:null, bbuserid:null, hotbb:null};
  gvar.motion_target= document.body;
  gvar.id_textarea= 'vB_Editor_001_textarea';
  gvar.vbul_multiquote= 'vbulletin_multiquote';
  
  gvar.offsetTop= -35; // buat scroll offset
  gvar.idx_mq=0; // counter buat deselect multiquote
  
  gvar.silahken= 'Silahken post reply';
  gvar.tooshort= 'The message is too short. Your message should be at least 5 characters.';
  gvar.qr_diakses= 'Quick Reply bisa diakses langsung atau dengan mengklik setiap button ';
  
  gvar.B= getSetOf('button');
  gvar.coloroptions= getSetOf('color');
  gvar.fontoptions= getSetOf('font');
  gvar.sizeoptions= getSetOf('size');    
  
  // place global style
  GM_addGlobalStyle( getCSS() );
  GM_addGlobalStyle('','css_fixups'); // blank style tag for kaskus fixups
  
  //GM_addGlobalScript(gvar.domain + 'clientscript/vbulletin_ajax_imagereg.js?v=380');
  GM_addGlobalScript('http:\/\/www.google.com\/recaptcha\/api\/js\/recaptcha_ajax\.js');
  GM_addGlobalScript( getSCRIPT() );
  
  // this is needed for chk avatar
  gvar.user= getUserId(); //will be [gvar.user.id, gvar.user.name, gvar.user.avatar, gvar.user.isDonatur ]
  gvar.ck.bbuserid_currentpage = gvar.ck.bbuserid = gvar.user.id;
  
  gvar.restart=false;  
  // get saved settings to gvar
  getSettings();

  if(gvar.settings.widethread)
    Dom.add( createTextEl( getCSS_fixup() ), $D('#css_fixups') );
  
  //------------
  start_Main();
  //------------
  
  if(!gvar.noCrossDomain && gvar.settings.updates)
    window.setTimeout(function(){ Updater.check(); }, 5000);
}

// populate settings value
function getSettings(){
  /** 
  eg. gvar.settings.updates_interval
  */
  var KS = 'KEY_SAVE_';
  var hVal,hdc;
  gvar.settings = {
    lastused : {
       font: getValue(KS+'LAST_FONT'),
       color:getValue(KS+'LAST_COLOR'),
       size: getValue(KS+'LAST_SIZE'),
       sptitle: getValue(KS+'LAST_SPTITLE'),
    },
    userLayout: {
       config: [],
       signature:getValue(KS+'LAYOUT_SIGI'),
       template: getValue(KS+'LAYOUT_TPL'),
    },
    textareaExpander : [],
    qrtoggle: (getValue(KS+'QR_COLLAPSE')=='1'),
    widethread: (getValue(KS+'WIDE_THREAD')=='1'),
    hideavatar: (getValue(KS+'HIDE_AVATAR')=='1'),
    updates: (getValue(KS+'UPDATES')=='1'),
    updates_interval: Math.abs(getValue(KS+'UPDATES_INTERVAL')),
    dynamic: (getValue(KS+'DYNAMIC_QR')!='0'),
    scustom_alt: (getValue(KS+'SCUSTOM_ALT')=='1'),
    scustom_noparse: (getValue(KS+'SCUSTOM_NOPARSE')=='1'), // dont parse?
    hotkeykey: getValue(KS+'QR_HOTKEY_KEY'),
    hotkeychar: getValue(KS+'QR_HOTKEY_CHAR'),
    hidecontroll: []
  };
  
  //get layout config
  hVal=getValueForId(gvar.user.id, 'LAYOUT_CONFIG');
  if(!hVal) hVal = ['', '0,0'];
  gvar.settings.userLayout.config = hVal[1].split(',');
  
  hVal=getValueForId(gvar.user.id, 'LAYOUT_SIGI', ['<!>','::']);
  if(!hVal) hVal = ['', '[RIGHT]&#8212;[SIZE=1][b]QR[/b][/SIZE]&#8482;[/RIGHT]'];
  gvar.settings.userLayout.signature = decodeURIComponent(hVal[1]).replace(/\\([\!\:])/g, "$1");
  
  hVal=getValueForId(gvar.user.id, 'LAYOUT_TPL', ['<!>','::']);
  if(!hVal) hVal = ['', '[B]{message}[/B]'];  
  gvar.settings.userLayout.template = decodeURIComponent(hVal[1]).replace(/\\([\!\:])/g, "$1");

  // recheck updates interval
  hVal=gvar.settings.updates_interval;
  hVal=(isNaN(hVal)||hVal <= 0 ? 1 : (hVal > 99 ? 99 : hVal) );
  gvar.settings.updates_interval=hVal;
  
  // setting textarea expander
  hVal=getValue(KS+'TEXTA_EXPANDER');
  gvar.settings.textareaExpander=(!hVal.match(/^([01]{1}),(\d+),(\d+)/)?['1,100,500']:hVal.split(',') );
  gvar.settings.textareaExpander[0] = (gvar.settings.textareaExpander[0]=='1');
  // hotkey settings, predefine [ctrl,shift,alt]; [01]
  hVal = gvar.settings.hotkeykey; 
  gvar.settings.hotkeykey = (!hVal.match(/^([01]{1}),([01]{1}),([01]{1})/)?['1','0','0'] : hVal.split(',') );
  hVal = gvar.settings.hotkeychar; 
  if(hVal!='') gvar.settings.hotkeychar = (!hVal.match(/^[A-Z0-9]{1}/)?'Q':hVal.toUpperCase() );
  // auto show smile
  //SHOW_SMILE,autoload_smiley
  hVal=getValue(KS+'SHOW_SMILE');
  gvar.settings.autoload_smiley=(!hVal.match(/^([01]{1}),(kecil|besar|custom)+/) ? ['0,kecil'] : hVal.split(',') );  
  
  // controler setting
  hdc = getValue(KS+'HIDE_CONTROLLER');
  gvar.labelControl = ['textformat', 'align', 'font', 'size', 'color', 'link', 'image', 'youtube', 'smile', 'quote', 'code', 'spoiler', 'tranparent', 'noparse'];
  if(hdc){
    gvar.settings.hidecontroll = hdc.toString().split(',');
  }else{
    /** banyak controler (14)
    # [format,align,font,size,color,link,image,youtube,smile,quote,code,spoiler,tranparent,noparse]
    **/
    var nController = gvar.labelControl.length; 
    for(var i=0; i<nController; i++)
       gvar.settings.hidecontroll.push('0');
  }  
  // is there any saved text
  gvar.tmp_text=getValue(KS+'TMP_TEXT');
  if(gvar.tmp_text!='') setValue(KS+'TMP_TEXT', ''); //set blank to nulled it   
}
// end getSettings

// =====
// START
function start_Main(){
    
    if(gvar.__DEBUG__ && !DOMTimer.dtStart) DOMTimer.start();
    
    fetch_property();    
    // keadaan ga nongolin qr_ :: thread closed or server timeout ..
    if(!gvar.newreply) {
      show_alert('Thread is closed or page not loaded.', 0);
      if(gvar.user.isDonatur) 
         Dom.remove('qrform'); // destroy original QR
      return false;
    }
    var Attr,child,el,nodes,par,hr,bufftxt = '';
    
    if( !$D('#quickreply') ){
       el = createEl('div',{id:'quickreply'},getTPL() );
       nodes = getByXPath_containing('//script', false, 'mqlimit')[0];
       nodes.parentNode.insertBefore(el, nodes.nextSibling);       
       // build tpl capcay 
       if(!gvar.user.isDonatur){
               //clog('in init_buildcapcay');
          init_buildcapcay();
       }
    }
    $D('#qr_maincontainer').innerHTML = getTPL_main();
    
    // cuma untuk fresh load
    if(!gvar.restart) {
     nodes = getByXPath_containing('//a', false, 'QUOTE');
     for(var i=0; i<nodes.length; i++){
      hr = nodes[i].href.split("&p=");      
      nodes[i].innerHTML = '<img src="'+gvar.domainstatic+'images/buttons/quote.gif" alt="Quote" border="0" title="Reply With Quote" />';      
      // prep bulu pena
      child = '<img src="'+gvar.domainstatic+'images/buttons/quickreply.gif" alt="Quick Reply" border="0" title="Quick Reply to this message" />';
      Attr = {href:'newreply.php?do=newreply&p='+hr[1],rel:'nofollow',id:'qr_'+hr[1],onclick:'return false'};
      el = createEl('a',Attr,child);
      Dom.Ev(el, 'click', function(e){
        do_click_qr(e);
      });
      
      // we remove existing node first
      if(gvar.user.isDonatur)
         Dom.remove('qr_'+hr[1]);
      Dom.add(el, nodes[i].parentNode);
     }
    }
    
    // insert customed controler
         //clog('in insert_custom_control');
    insert_custom_control();    
            
    check_avatar();
    // append avatar
    if(isDefined(gvar.user.id)){
       show_alert('Attaching Avatar..');
            //clog('in appendAvatar');
       appendAvatar();       
    }else
       show_alert('Failed attaching Avatar..');
    
    // Do Event Element later, might reduce lag
    window.setTimeout(function() {
       // initialize all nodes with event    
            //clog('in initEventTpl');
       initEventTpl();       
       // property of vbEditors controler
            //clog('in re_event_vbEditor');
       re_event_vbEditor();

       if(gvar.settings.autoload_smiley[0]=='1')
         create_smile_tab( $D('#vB_Editor_001_cmd_insertsmile') );
       
       if(gvar.tmp_text){
         if(gvar.tmp_text!=gvar.silahken){
           vB_textarea.enabled();
           vB_textarea.focus();
           //if(gvar.textareaExpander[0]) 
         }else{
           vB_textarea.readonly();
         }
         gvar.tmp_text=null;
         if(gvar.settings.textareaExpander[0])
           vB_textarea.adjustGrow(); // retrigger autogrow now
       }else{ // disable|readonly textarea.
         vB_textarea.readonly();
         if(gvar.settings.textareaExpander[0])
           Dom.g(gvar.id_textarea).style.height=gvar.settings.textareaExpander[1]+'px';
       }
       gvar.restart = false;
       if(gvar.user.isDonatur) 
         Dom.remove('qrform'); // destroy original QR
         
       SimulateMouse( $D('#remote_scustom_container'), 'click', true);

    }, 50);
       
    if(gvar.__DEBUG__){
     $D('#dom_created').innerHTML = ' | DOM Created: '+DOMTimer.get()+' ms; ver='+(function(){var d=new Date(); return(d.getFullYear().toString().substring(2,4)+((d.getMonth()+1).toString().length==1?'0':'')+(d.getMonth()+1)+(d.getDate().toString().length==1 ? '0':'')+d.getDate()+'');})()+gvar.sversion.replace(/v|\.|\]/g,'')+'; timestamp='+(function(){return(new Date().getTime())})();
     DOMTimer.dtStart=null;
    }
}
// end start_Main()


// qr clicked
function do_click_qr(e){
  e = e.target || e;
  if(gvar.settings.dynamic){ // is dynamic QR enabled
    var qr = $D('#quickreply');
    if(!qr) return;
    if(e){
      var parent_postbit = find_parent(e);
      if(parent_postbit)          
          Dom.add(qr,parent_postbit);
    }
  }
  $D('#collapseobj_quickreply').setAttribute('style','display:;');
  var snapTo = function(){
    if( !$D('#qr_submit') ) return; // the state of user is changed? submit_container has been destroyed.              
    if( $D('#quoted_notice').style.display!='none' && $D('#current_fetch_post') ){ // theres a fetching progres
            //clog('theres a fetch progres, txta still readonly')
       vB_textarea.readonly();
       return;
    }
    toogle_quickreply(true); // show it again to save state and load capcay if any    
    vB_textarea.init();
    var elset = $D('#settings_cont');
    if(elset && elset.innerHTML!='')
       toggle_setting();
    if(vB_textarea.content==gvar.silahken)
       vB_textarea.clear();
    vB_textarea.enabled();
  };
  var cSml = gvar.settings.autoload_smiley;
  gvar.offsetTop = -Math.round((parseInt(GetHeight()) * 3.95)/ 61) + (cSml[0]=='1'? (cSml[1]=='kecil'?7:10) : 0);
  ss.STEPS = 10; // scroll speed; smaller is faster          
  ss.smoothScroll( Dom.g(gvar.id_textarea), function(){snapTo()} );
  return false;
}

function find_parent(obj){
  var par = null, dumyobj=obj;
  var found=false;
  while(dumyobj.parentNode && !found){
    par = dumyobj.parentNode;
    if(isDefined(par.id) && par.id.match(/post\d+$/) && par.className=='tborder'){
      par = par.parentNode;
      found=true;
    }else{
      dumyobj = dumyobj.parentNode;
    }
  }
  return par;
}

function buildRate(){
  var el,par,sel;
  var rates = { '5':'5: Excellent', '4':'4: Good', '3':'3: Average', '2':'2: Bad', '1':'1: Terrible' };
  par = createEl('div', {style:'float:left'}, 'Rating:&nbsp;');
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

function additional_opt_parser(text){   
   var pos = [text.indexOf('collapseobj_newpost_options'), text.lastIndexOf('</select')];
   var rets = text.substring(pos[0], pos[1]);
   var par_adt_opt = $D('#additional_options');
   pos[0] = rets.indexOf('<select');
   rets = rets.substring(pos[0], pos[1]);
   var selects = rets.split('</select');
   for(var i in selects){
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
     //clog(par_adt_opt.innerHTML)
};
// this func check wheter the additional func has been loaded or not.
function additional_options_notloaded(){
   var adt_opt = $D('#additional_options');
   if(!adt_opt){
     if( !$D('#submit_container') ) return;
     adt_opt = createEl('div',{id:'additional_options'});
     Dom.add(adt_opt, $D('#submit_container'));
   }
   return (adt_opt && adt_opt.innerHTML=='');
}

// fetch only the hash of humaninput
function capcay_parser(page){
  var match = /id=\"hash\".*value=\"(\w+)/.exec(page);
  if(match)    
    $D('#imgcapcay').innerHTML = '<input id="hash" name="humanverify[hash]" value="'+match[1]+'" type="hidden">\n';
}

function capcay_notloaded(){  
  return ( $D('#imgcapcay') && !Dom.g('hash', $D('#imgcapcay') ) );
}
function init_buildcapcay(){
    create_tplcapcay();
    //ajax_buildcapcay(); 
}
function create_tplcapcay(){
    $D('#capcay_container').innerHTML = ''    
    +'<fieldset class="fieldset" id="fieldset_capcay" style="display:none;">'
    +'<div id="imgcapcay"><div class="g_notice normal_notice" style="display:block;font-size:9px;text-align:center;">[capcay-space]</div></div>\n'    
    +'<input id="hidrecap_btn" value="reCAPTCHA" type="button" style="display:" onclick="showRecaptcha(\'recaptcha_container\');" />' // fake button create
    //+'<input id="hidrecap_reload_btn" value="reload_reCAPTCHA" type="button" style="display:" onclick="Recaptcha.reload();" />' // fake button reload
    +'<input id="docapcayfocus" value="" type="hidden"  />' // flag for callback caller click capcay
    +'</fieldset>'
    ;
}

// this will only fetch additional opt only
function ajax_buildcapcay(reply_html){
  // initialize
  if( $D('#rate_thread')) $D('#rate_thread').style.display='';
  if(isUndefined(reply_html)){ // is there ret from XHR :: reply_html
    // prep xhr request  
    GM_XHR.uri = gvar.newreply;
    GM_XHR.cached = true;    
    GM_XHR.request(null,'GET',ajax_buildcapcay);
  }else{
    if(!reply_html) return;
    reply_html = (typeof(reply_html)=='string' ? reply_html : reply_html.responseText);
    
    if(additional_options_notloaded()) 
        build_additional_opt(reply_html);
        
    // need to parse & store hash humaninput
    capcay_parser(reply_html); 
  }
}

// create rating, and hidden element of additional options
function build_additional_opt(html){
    additional_opt_parser(html);
    var rate = (html.indexOf('a rating')!=-1 ? buildRate() : false);
    if($D('#rate_thread')){
      $D('#rate_thread').innerHTML='';
      Dom.add(rate ? rate : createTextEl('Thread Rated'), $D('#rate_thread'));
    }
}

// make sure this func is called only by donatur, which never do prefetch for capcay
// this will collecting additional opt like rating and/or subscriptions folderid
function ajax_additional_opt(reply_html){
  // not donatur | already do this ? get out
  if(!gvar.user.isDonatur || !additional_options_notloaded() ) return;
  // initialize
  if($D('#rate_thread')) $D('#rate_thread').style.display='';
  if(isUndefined(reply_html)){ // is there ret from XHR :: reply_html
    GM_XHR.uri = gvar.newreply;
    GM_XHR.cached = true;    
    GM_XHR.request(null,'GET',ajax_additional_opt);
  }else{
    if(!reply_html) return;
    reply_html = reply_html.responseText;
    build_additional_opt(reply_html);
  }
}

function parse_preview(text){
  var ret = text.split('vbform');
  ret = ret[0];
  var wraper = ['<td class="alt1">', '{[end-of-QR-'+gvar.sversion+'-'+gvar.scriptId+']}' ];
  var poss = [ret.indexOf(wraper[0]), ret.lastIndexOf(wraper[1])];
  return ret.substring(poss[0]+wraper[0].length, poss[1]);
}

// routine to preview post
function qr_preview(reply_html){
  // initialize
  if(isUndefined(reply_html)){ // is there ret from XHR :: reply_html
    var prep = prep_preview(); // [nxDo, uriact]
    $D('#qr_do').setAttribute('value', prep[0]);
     // prep xhr request
    if(gvar.__DEBUG__) DOMTimer.start();
    var spost = buildQuery();
    if(spost===false) {
      SimulateMouse($D('#imghideshow'), 'click', true);
      return false;
    }
	if(gvar.__DEBUG__) {
	    clog('buildQuery elapsed='+DOMTimer.get());
        DOMTimer.start();
	}
	$D('#preview_presubmit').value = 'working...';
	$D('#preview_presubmit').focus();
    GM_XHR.uri = prep[1];
    GM_XHR.cached = true;
    GM_XHR.request(spost.toString(),'post', qr_preview);    
  } else {
    if( !reply_html || !$D('#preview_content') ) return;
    reply_html = reply_html.responseText;
    var rets = parse_preview(reply_html);
    if($D('#preview_content')) $D('#preview_content').innerHTML = rets;
    if(gvar.__DEBUG__) {
        clog('previewResponse elapsed='+DOMTimer.get());
	}
	if($D('#preview_presubmit')){
	   $D('#preview_presubmit').removeAttribute('disabled');
	   $D('#preview_presubmit').value = (gvar.user.isDonatur ? '':'pre-') + 'Post';
	}
  }
}

// prepare preview post, *used by advanced also
// return [nxDo, uriact];
function prep_preview(){
  // prep-previewing  
  var uriact,nxDo;
  var msg = scustom_parser();  
  // check whether message is changed
  if(msg!=gvar.silahken && msg.length>=5) {
     uriact = gvar.uripreview;
     nxDo='postreply';
     deselect_it();
  }else{
     uriact = gvar.newreply;
     nxDo='newreply';
  }
  return [nxDo, uriact];
};

function template_wrapper(txt){
   var retTx=(isUndefined(txt) ? trimStr ( Dom.g(gvar.id_textarea).value ) : txt);
   var tmsg=retTx;
   var tpl = decodeURIComponent(gvar.settings.userLayout.template);
   if(gvar.settings.userLayout.config[1] == 1 && tpl.match(/\{message\}/i) ) {
      tmsg = tpl.replace(/\{message\}/i, retTx);
   }
   
   if(gvar.settings.userLayout.config[0] == 1){
      var newLines = count_Char('\\n', tmsg);
        //clog('pre sigi, ENTER=' + newLines+'; ' );
      var margin_sigi = (tmsg.indexOf('[QUOTE=')!=-1 ? (gvar.offSet_SiGi[0]-newLines) : (gvar.offSet_SiGi[1]-newLines) );      
      tmsg += gen_Char('\n', margin_sigi, ' ') + gvar.settings.userLayout.signature;
   }
   if(Dom.g(gvar.id_textarea) && tmsg!=retTx)
     if(!$D('#hideshow') || ($D('#hideshow') && $D('#hideshow').style.display=='none') ) vB_textarea.readonly();
   return tmsg;
};

function buildQuery(){
  var hidden = getTag( 'input', $D('#submit_container') );
  var el, q='';
  for(var h in hidden)
    if( typeof(hidden[h].getAttribute)!='undefined' && hidden[h].getAttribute('type')=='hidden' )
      q+='&' + hidden[h].getAttribute('name') + '=' + encodeURIComponent(hidden[h].value);

  q+= '&preview=Preview+Post';
  var adtnl = [gvar.id_textarea, 'input_title']; // ids of textarea message and title
  el = Dom.g(adtnl[0]);
  if( el && el.value!='' && el.value!=gvar.silahken ){
    var msg = trimStr(el.value);
    msg = template_wrapper();
    q = '&' + el.getAttribute('name') + '=' + encodeURIComponent(toCharRef(msg) + '{[end-of-QR-'+gvar.sversion+'-'+gvar.scriptId+']}' )  + q;
  }
  el = Dom.g(adtnl[1]);
  if( el && el.value!='' )
    q = '&' + el.getAttribute('name') + '=' + encodeURIComponent(el.value) + q;
  return q;
}

function closeLayerBox(tgt){
    var doLastFocus = false;
    if(tgt=='hideshow' && $D('#hideshow')) {
	 var curv = Dom.g(gvar.id_textarea).value;
	 if(curv.substring(curv.length-2, curv.length)!='\n\n'){
	    vB_textarea.init();
	    vB_textarea.add('\n\n');
		doLastFocus = true;
	 }
    }
    Dom.remove( Dom.g(tgt) );
    try{ 
     Dom.g(gvar.id_textarea).focus(); 
	 if(doLastFocus) vB_textarea.lastfocus(); 
    }catch(e){}
}

function toogleLayerDiv(tgt) {
  var currentVisible = Dom.g(tgt); //
  Dom.g(tgt).style.display= (currentVisible.style.display == 'none' ? '' : 'none');

}

function loadLayer_reCaptcha(){
    
    gvar.sITryFocusOnLoad = window.setInterval(function() {
      if ($D('#recaptcha_response_field')) {
	    clearInterval(gvar.sITryFocusOnLoad);
		Dom.Ev( $D('#recaptcha_response_field'), 'keydown', function(e){
            var C = (!e ? window.event : e );
            if(C.keyCode==13){ // mijit enter
                C = do_an_e(C);
                SimulateMouse($D('#recaptcha_submit'), 'click', true);
            }
        });
        // order tabindex
		var reCp_field=['recaptcha_response_field','recaptcha_reload_btn','recaptcha_switch_audio_btn','recaptcha_switch_img_btn','recaptcha_whatsthis_btn'];
		for(var i=0; i<reCp_field.length; i++)
		  if( $D('#'+reCp_field[i]) ) $D('#'+reCp_field[i]).setAttribute('tabindex', '20'+(i+1) + '');
		
        $D('#button_preview').style.display = ''; 
	    $D('#recaptcha_response_field').focus();
      }
    }, 200);
    
    var is_capcay_filled = function(tgt){
        if($D('#recaptcha_response_field') && !$D('#recaptcha_response_field').value){
          alert('Belum Isi Image Verification');
          try{if(typeof(tgt)=='object') tgt.focus()}catch(e){}
          return false;
        }else{
          return ($D('#recaptcha_response_field').value);
        }
    };
      
    if($D('#hideshow'))
      closeLayerBox('hideshow');
    
    var Attr,el;
	// require this transparent layer to be attached on body, to make it appear
    Attr = {id:'hideshow',style:'display:none;'};
    el = createEl('div', Attr, getTPL_layer_Only() );
	getTag('body')[0].insertBefore(el, getTag('body')[0].firstChild);    
	
	// this container must inside form
    Attr = {id:'hideshow_recaptcha',style:'display:none;'};
    el = createEl('div', Attr, getTPL_prompt_reCAPTCHA() );
    Dom.add(el, $D('#vbform') );
    
    // event close button
    Dom.Ev($D("#imghideshow_precap"), 'click', function(){closeLayerBox('hideshow');closeLayerBox('hideshow_recaptcha');});
	// cancel
    Dom.Ev($D("#recaptcha_cancel"), 'click', function(){ SimulateMouse($D("#imghideshow_precap"), 'click', true); });

    // submit recaptcha
    Dom.Ev($D('#recaptcha_submit'), 'click', function(e){
        if( !is_capcay_filled($D('#recaptcha_response_field')) ){
          e.preventDefault;
          return false;
        }
        e=e.target||e;
        e.value='posting...';      
        e.setAttribute('disabled','disabled');
        window.setTimeout(function() {
            SimulateMouse($D('#qr_submit'), 'click', true); 
        }, 200);
    } );
    
    // calibrate width/position container
    $D('#popup_container_precap').style.top = (parseInt( ss.getCurrentYPos() )+ (document.documentElement.clientHeight/2)-200 ) + 'px';
    $D('#popup_container_precap').style.left = parseInt( Math.round((document.documentElement.clientWidth/2)-200) ) + 'px';

    window.setTimeout(function() {
        SimulateMouse($D('#hidrecap_btn'), 'click', true);
    }, 100);


} // end loadLayer_reCaptcha

function loadLayer(){
    var Attr,el;
    Attr = {id:'hideshow',style:'display:none;'};
    el = createEl('div', Attr, getTPL_Preview() );
    getTag('body')[0].insertBefore(el, getTag('body')[0].firstChild);
    
    // event close button
    Dom.Ev($D("#imghideshow"), 'click', function(){closeLayerBox('hideshow');});
    
    // calibrate width container
    $D('#popup_container').style.top = (parseInt( ss.getCurrentYPos() )+25) + 'px';
    	  
    // cancel preview
    Dom.Ev($D('#preview_cancel'), 'click', function(){ SimulateMouse($D('#imghideshow'), 'click', true); } );


    //submit from preview
    if($D('#preview_presubmit'))
      Dom.Ev($D('#preview_presubmit'), 'click', function(e){
         if( !gvar.user.isDonatur ){
		   if($D('#preview_loading')) return;		   
           loadLayer_reCaptcha();
           toogleLayerDiv('hideshow');
           toogleLayerDiv('hideshow_recaptcha');
         }else{
           e=e.target||e;
           e.value='posting...';
           e.setAttribute('disabled','disabled');
           window.setTimeout(function() {
             SimulateMouse($D('#qr_submit'), 'click', true); 
           }, 200);
         }
      });
    
}


function scustom_parser(msg){
  var pmsg;
  // trim content and/or parse it
  msg = trimStr(Dom.g(gvar.id_textarea).value);
  if(!gvar.settings.scustom_noparse){
    pmsg = do_parse_scustom(msg);
    Dom.g(gvar.id_textarea).value=pmsg;
    if(vB_textarea.Obj && pmsg!=msg)
      if(!$D('#hideshow') || ($D('#hideshow') && $D('#hideshow').style.display=='none') ) vB_textarea.readonly();
    msg=pmsg;
  }
  return msg;
};


// initialize all event in TPL; 
// eg. submit, preview, some of vb_Textarea element
function initEventTpl(){
    
    if(gvar.tmp_text){
      vB_textarea.init(); // need this coz if disable can not set
      // load capcay
      if(capcay_notloaded()) ajax_buildcapcay();
      if(gvar.user.isDonatur && additional_options_notloaded()) 
        ajax_additional_opt();
    }
    vB_textarea.set(gvar.tmp_text ? gvar.tmp_text : gvar.silahken); // initilaize value with "silahken"    or tmp_text    
    
    var dvacs = $D('#dv_accessible');
    if(dvacs){
      dvacs.style.width=(Dom.g(gvar.id_textarea).clientWidth-80)+'px';
      dvacs.style.display='';
      Dom.Ev(dvacs, 'click', function(){
        var etxta = Dom.g(gvar.id_textarea);
        if(etxta.getAttribute('readonly') || etxta.getAttribute('disabled')=='disabled'){
            var cont=$D('#settings_cont');
          if(!vB_textarea.Obj) vB_textarea.init();
          if(cont&&cont.innerHTML!=''){ // gonna close it
            toggle_setting();
            return;
          }
          if(vB_textarea.content==gvar.silahken)
            vB_textarea.clear();
          vB_textarea.enabled();
          if(capcay_notloaded()) ajax_buildcapcay();
          if(gvar.user.isDonatur && additional_options_notloaded()) 
             ajax_additional_opt();
        }          
      });
    }
    Dom.Ev(Dom.g(gvar.id_textarea), 'keydown', function(e) { return is_keydown_pressed(e);  });    
    
    Dom.Ev($D('#atitle'), 'click', function() {
      $D('#input_title').style.width=(Dom.g(gvar.id_textarea).clientWidth-80)+'px';
      var disp=$D('#titlecont');
      disp.style.display=(disp.style.display=='none' ? 'block':'none');
      $D('#atitle').innerHTML = '['+(disp.style.display=='none'?'+':'-')+']';
      var mt=$D('#controller_wraper').style.marginTop.replace('px','');
      if(disp.style.display!='none')
        window.setTimeout(function() {
          $D('#controller_wraper').style.marginTop=(parseInt(mt)-20)+'px';
          try{$D('#input_title').focus();}catch(e){};
        }, 100);
      else
        window.setTimeout(function() {
          $D('#controller_wraper').style.marginTop=(parseInt(mt)+20)+'px';
          try{Dom.g(gvar.id_textarea).focus();}catch(e){};
          $D('#input_title').value='';
        }, 100);
    });

    
    // do not re-event this when restarted after save setting
    // node destroyed from qr_maincontainer and all nodes inside
    // ====---==No-Repost-Event-Gan==---===
    if(!gvar.restart){
    
      Dom.Ev($D('#atoggle'), 'click', function(e){toogle_quickreply(); e.preventDefault();});      
      
      Dom.Ev($D('#chk_fixups'), 'click', function(e) {
        e=e.target||e;
        var chk=e.getAttribute('checked');        
        if(chk){
            $D('#css_fixups').innerHTML='';
            e.removeAttribute('checked')
          } else{
            Dom.add( createTextEl( getCSS_fixup() ), $D('#css_fixups') );
            e.setAttribute('checked','checked');
          }
          setValue('KEY_SAVE_WIDE_THREAD', (chk ? 0:1));        
        controler_resizer(); // resize elements width
      });
      
      Dom.Ev($D('#vbform'), 'submit', function(e){
        var uriact,nxDo;            
        if($D('#clicker').value!='Go Advanced'){
          // post quickreply
          
          var hi=($D('#recaptcha_response_field') ? $D('#recaptcha_response_field') : null);
          if(hi && hi.value==''){
            if(hi.getAttribute('disabled')=='disabled') 
              e.preventDefault(); // return false;
            alert('Belum Isi Image Verification'); hi.focus();
            e.preventDefault(); // return false;
            return false;
          }
        }
        var prp = prep_preview();
        nxDo = prp[0];
        uriact = prp[1];
        var msg=template_wrapper();
        if(msg != Dom.g(gvar.id_textarea).value) Dom.g(gvar.id_textarea).value=msg;
        $D('#vbform').setAttribute('action', uriact);
        $D('#qr_do').setAttribute('value', nxDo); // change default of qr_do (postreply)
      });
      Dom.Ev($D('#qr_advanced'), 'click', function(){$D('#clicker').setAttribute('value','Go Advanced');});
      Dom.Ev($D('#qr_prepost_submit'), 'click', function(e){
         if( !gvar.user.isDonatur ){
           if(Dom.g(gvar.id_textarea).value==gvar.silahken || Dom.g(gvar.id_textarea).value=='') return;
		   e=e.target||e;
		   var msg = trimStr(Dom.g(gvar.id_textarea).value);
           if(!(msg.length>=5)){
             // show warning message is too short
             alert(gvar.tooshort);
             e.preventDefault(); return false;
           }
		   loadLayer_reCaptcha();
           toogleLayerDiv('hideshow');
           toogleLayerDiv('hideshow_recaptcha');
         }else{
           e=e.target||e;
           e.value='posting...';
           e.setAttribute('disabled','disabled');
           window.setTimeout(function() {
             SimulateMouse($D('#qr_submit'), 'click', true); 
           }, 200);
         }
      });
      // end of vb_Textarea submit Event ------
    
      Dom.Ev($D('#qr_preview_ajx'), 'click', function(e){
        if(Dom.g(gvar.id_textarea).value==gvar.silahken || Dom.g(gvar.id_textarea).value=='') return;
        e=e.target||e;
        var msg = trimStr(Dom.g(gvar.id_textarea).value);
        if(!(msg.length>=5)){
          // show warning message is too short
          alert(gvar.tooshort);
          e.preventDefault(); return false;
        }
        if(!$D('#hideshow')){
          loadLayer(); 
          toogleLayerDiv('hideshow');
        }else{
          closeLayerBox('hideshow');
        }
        qr_preview();
      });

      // detect window resize to resize textbox and controler wraper
      Dom.Ev(window, 'resize', function() { controler_resizer(); });
      // activate hotkey?
      if(!gvar.isOpera && gvar.settings.hotkeychar && gvar.settings.hotkeykey.toString()!='0,0,0')
        Dom.Ev(window.document, 'keydown', function(e) { return is_keydown_pressed_ondocument(e); });
      
      // new version multi-quote (cookie based)
      var ck_mquote = cK.g('vbulletin_multiquote');
      chk_newval(ck_mquote ? ck_mquote:'');
      
      var nodes = $D('//img[contains(@id,"mq_")]');
      if(nodes){
        var colorize_td = function(t,td){
          if( /multiquote_on\..+/.test(basename(t)) )
            addClass('quoteselected', Dom.g(td));
          else
            removeClass('quoteselected', Dom.g(td));
        };        
        for(var i=0;i<nodes.snapshotLength; i++){
            var node = nodes.snapshotItem(i);
            nid=node.id.replace(/mq_(\d+)/, 'td_post_$1');
            colorize_td(node.src, nid);
            Dom.Ev(node, 'click', function(e){
              e=e.target||e;
              var ck_mquote = cK.g('vbulletin_multiquote');
              chk_newval( ck_mquote ? ck_mquote :'' );

              nid=e.id.replace(/mq_(\d+)/, 'td_post_$1');
              colorize_td(e.src, nid);
            });
        }      
      }
    } // end not restart mode
    
    // event monitor cookie change
    event_ckck();
}
// - end initEventTpl()

function controler_resizer(){
   window.setTimeout(function() {
     var obj = $D('#input_title');
     if(obj){
       obj.style.display='none';
       obj.style.width=(Dom.g(gvar.id_textarea).clientWidth-80)+'px';
       obj.style.display='block';
     }
     obj = $D('#dv_accessible');
     if(obj && $D('#dv_accessible').style.display!='none'){
      obj.style.width=(Dom.g(gvar.id_textarea).clientWidth-80)+'px';
     }
   }, 100);
   var obj = $D('#controller_wraper');
   if(obj) obj.style.width=(Dom.g(gvar.id_textarea).clientWidth)+'px';
}

function scrollto_QR(C){
  C = do_an_e(C);
  // temporary disable dynamic
  var D = gvar.settings.dynamic;
  gvar.settings.dynamic = false;      
  
   do_click_qr(C);
  
  // turn dynamic back ?
  if(gvar.settings.dynamic!=D)
    gvar.settings.dynamic = D;
}
// global QR-Hotkey
function is_keydown_pressed_ondocument(e){
  var C = (!e ? window.event : e);
  var pressedCSA = (C.ctrlKey ? '1':'0')+','+(C.shiftKey ? '1':'0')+','+(C.altKey ? '1':'0');
  var A = C.keyCode ? C.keyCode : C.charCode;
  
  // without pressedCSA or just Shift | there's no hideshow layer ? forget it
  if( (pressedCSA=='0,0,0' || pressedCSA=='0,1,0') && !$D('#hideshow') )
    return;

  if($D('#hideshow') && A==27){
    closeLayerBox('hideshow');
	if($D('#hideshow_recaptcha')) closeLayerBox('hideshow_recaptcha');
	return;
  }
  
  var CSA_tasks = {
     quickreply: gvar.settings.hotkeykey.toString() // default: Ctrl+Q
    ,fetchpost: '0,0,1' // Alt+Q
    ,deselectquote: '1,0,1' // Ctrl+Alt+Q    
  };
  
    //clog('pressedCSA='+pressedCSA)  
  switch(pressedCSA){ // key match in [Ctrl-Shift-Alt]
    case CSA_tasks.quickreply:
      var cCode = gvar.settings.hotkeychar.charCodeAt();
      if(A==cCode) {
        scrollto_QR(C);
        return false;
      }
    break;
    case CSA_tasks.fetchpost:
      if(A==81) { // keyCode for Q
        SimulateMouse($D('#quote_now'), 'click', true);
        scrollto_QR(C);
        return false;
      }
    break;
    case CSA_tasks.deselectquote:
      if(A==81) { // keyCode for Q
        window.setTimeout(function() { 
         if($D('#quoted_notice').style.display!='none')
           SimulateMouse($D('#deselect_them'), 'click', true); 
        }, 100);
        return false;
      }
    break;
  }
}

// Ketika keydown tab dari textarea
function is_keydown_pressed(e){
  var C = (!e ? window.event : e);
  if(C) {
   if(C.ctrlKey){ // mijit + Ctrl    
    var B, A = C.keyCode ? C.keyCode : C.charCode;
    switch(A){
      case 66:
        B = 'Bold';
        break;
      case 73:
        B = 'Italic';
        break;
      case 85:
        B = 'Underline';
        break;
      case 13:  // [S] Submit post
        B = 'qr_prepost_submit';
        break;
      default:
        return;
    }
    C = do_an_e(C);
	if(A==13){
	  if(Dom.g(B)) SimulateMouse(Dom.g(B), 'click', true); 
	}else{
      do_align_BIU(B);
	}
   }else
   if(C.altKey){ // mijit + Alt
	var B='', A = C.keyCode ? C.keyCode : C.charCode;
	  //clog('Alt+'+A);
    switch(A){
      case 83: // [S] Submit post
        B = 'qr_prepost_submit';
        break;
      case 80: // [P] Preview
        B = 'qr_preview_ajx';
        break;
      case 88: // [X] Advanced
        B = 'qr_advanced';      
        break;
      default:
        return;
    }
	C = do_an_e(C);
	if(Dom.g(B)) SimulateMouse(Dom.g(B), 'click', true); 

   }else
   if(C.keyCode==9){ // mijit tab
     C = do_an_e(C);
     if($D('#recaptcha_response_field'))
       window.setTimeout(function() { try{$D('#recaptcha_response_field').focus()}catch(e){}; }, 150);
     else
       $D('#qr_prepost_submit').focus();   
   }
   // end keyCode==9 
   
  } // end event C
  return false;
}

function insert_custom_control(){  
  if(!$D('#customed_control')) return;
  
  var Attr,div1,el,idx;
    div1 = createEl('div',{'class':'customed_addcontroller'});    
    Dom.add(div1,$D('#customed_control'));
    idx=7;
    // tombol youtube
    if(gvar.settings.hidecontroll[idx] != '1'){
      Attr={title:'Insert youtube URL',
            alt:'[youtube]',style:'vertical-align:bottom',src:gvar.B.youtube_gif
           };
      el = createEl('img',Attr);
      Dom.Ev(el, 'click', function(e){ return do_btncustom(e); });
      Dom.add(el,$D('#vB_Editor_001_cmd_insertyoutube'));
    }
    idx=11;
    // tombol spoiler
    if(gvar.settings.hidecontroll[idx] != '1'){
      Attr={title:'Wrap [SPOILER] tags around selected text',
            alt:'[spoiler]',style:'vertical-align:bottom',src:gvar.B.spoiler_png
           };
      el = createEl('img',Attr);
      Dom.Ev(el, 'click', function(e){ return do_btncustom(e); });
      Dom.add(el,div1);
    }
    idx++;
    // tombol transparent
    if(gvar.settings.hidecontroll[idx] != '1'){
      Attr={title:'Wrap [COLOR=transparent] tags around selected text',
            alt:'[transparent]',style:'vertical-align:bottom',src:gvar.B.transp_gif
           };
      el = createEl('img',Attr);
      Dom.Ev(el, 'click', function(e){ return do_btncustom(e); });
      Dom.add(el,div1);
    }
    idx++;
    // tombol noparse
    if(gvar.settings.hidecontroll[idx] != '1'){
      Attr={title:'Wrap noparse tags around selected text',
            alt:'[noparse]',style:'vertical-align:bottom',src:gvar.B.noparse_gif
           };
      el = createEl('img',Attr);
      Dom.Ev(el, 'click', function(e){ return do_btncustom(e); });
      Dom.add(el,div1);
    }

}

// create event controler on vbEditor & settings
function re_event_vbEditor(){
  // event reset / clear textarrea
  Dom.Ev($D('#textarea_clear'), 'click', function(){ vB_textarea.clear(); });
  
  // event textarea autogrowth
  if(gvar.settings.textareaExpander[0])
    growIt(Dom.g(gvar.id_textarea), [gvar.settings.textareaExpander[1],gvar.settings.textareaExpander[2]]);
  
  // general event buat more smile
  el=createEl('script',{type:'text/javascript'},"vB_Editor['vB_Editor_001'] = new vB_Text_Editor('vB_Editor_001', 0, '13', '1', undefined, '');");
  Dom.add(el,document.body);
       
  // event common button controller
  if($D('#vB_Editor_001')) {
   var imgs = $D('#vB_Editor_001').getElementsByTagName('img');
   for(var i in imgs){
    var el = imgs[i];
    var  alt = el.alt;
    switch(alt){
      case 'Align Left': case 'Align Center': case 'Align Right':
      case 'Bold': case 'Italic': case 'Underline':
        Dom.Ev(el, 'click', function(e){ do_align_BIU(e); });
      break;
      case 'Insert Image': case 'Insert Link':
        Dom.Ev(el, 'click', function(e){ do_btncustom(e); });
      break;
      default:
       if(alt && (alt.indexOf('[quote]')!=-1 || alt.indexOf('[code]')!=-1) )
        Dom.Ev(el, 'click', function(e){ do_btncustom(e); });
      break;
    }
   }
  }
  
  // fungsi click pick
  var clickpick = function(el,id){
   if(isUndefined(id)) return;
   var ve=Dom.g(id);
   ve.style.display=(ve.style.display==''?'none':'');
   if(ve.style.display!='none') try{Dom.g(id+'_dumy').focus();}catch(el){}
  };
  
  // event buat kolor  
       //clog('in create_popup_color');
  var el = create_popup_color();
  var par = $D('#vB_Editor_001_popup_forecolor');
  if(par) Dom.add(el,par);
  
  el = $D('#pick_kolor');
  if(el)
   Dom.Ev(el, 'click', function(e){
    clickpick(e, 'vB_Editor_001_popup_forecolor_menu');
   });

  el = $D('#vB_Editor_001_color_out');
  if(el)
   Dom.Ev(el, 'click', function(){
     var etitle = gvar.settings.lastused.color;
     if(etitle) {
       do_insertTag('color',etitle);
       return false;
     }
     SimulateMouse($D('#pick_kolor'), 'click', true);
   });
  

  // event buat font  
       //clog('in create_popup_font');
  el = create_popup_font();
  par = $D('#vB_Editor_001_popup_fontname');
  if(par) Dom.add(el,par);
  
  el = $D('#pick_font');
  if(el)
   Dom.Ev(el, 'click', function(e){ 
     clickpick(e,'vB_Editor_001_popup_fontname_menu');
   });
   
  el = $D('#vB_Editor_001_font_parentout');
  if(el)
   Dom.Ev(el, 'click', function(e){
     var etitle = gvar.settings.lastused.font;
     if(etitle) {
       do_insertTag('font',etitle);
       return false;
     }
     SimulateMouse($D('#pick_font'), 'click', true);     
   });  
  
  
  // event buat size  
       //clog('in create_popup_size');
  el = create_popup_size();
  par = $D('#vB_Editor_001_popup_fontsize');
  if(par && el) Dom.add(el,par);
  
  el = $D('#pick_size');
  if(el)
   Dom.Ev(el, 'click', function(e){
     clickpick(e,'vB_Editor_001_popup_size_menu');
   });
   
  el = $D('#vB_Editor_001_size_parentout');
  if(el)
   Dom.Ev(el, 'click', function(e){
     var etitle = gvar.settings.lastused.size;
     if( etitle && !isNaN(parseFloat(etitle)) ) {
       do_insertTag('size',etitle);
       return false;
     }
     SimulateMouse($D('#pick_size'), 'click', true);     
   });  
  
  
  // event buat smile  
        //clog('event smiley');
   par = $D('#vB_Editor_001_cmd_insertsmile');
   
   if(par) {
     Dom.Ev(par, 'click', function(e){ create_smile_tab(e); });
     Dom.Ev(par, 'mouseout', function(e){
        e.target||e;
        window.setTimeout(function() {
          obj = $D('#vB_Editor_001_cmd_insertsmile_img');
          if($D('#smile_cont').style.display!=''){
            obj.style.backgroundColor='transparent';
            obj.style.border='1px solid transparent';
          }
        }, 10);
     });     
     Dom.Ev(par, 'mouseover', function(e){
        e.target||e;
        window.setTimeout(function() {
          obj = $D('#vB_Editor_001_cmd_insertsmile_img');
          if($D('#smile_cont').style.display!=''){
            obj.style.backgroundColor='#B0DAF2';
            obj.style.border='1px solid #2085C1';
          }
        }, 10);
     });     
   }
  
  
  // event buat settings
  Dom.Ev( $D('#settings_btn'), 'click', function(){ toggle_setting() });

}
// end re_event_vbEditor

function reset_setting(){
    var home=['http:/'+'/www.kaskus.us/showthread.php?t=3170414','http:/'+'/userscripts.org/topics/58227'];
    var space = '';
    for(var i=0;i<20;i++) space+=' ';
    var csmiley = (getValue('KEY_SAVE_CUSTOM_SMILEY').replace(/^\s+|\n|\s+$/g,"")!='');
    var msg = ''
     +( (getValue('KEY_SAVE_CUSTOM_SMILEY').replace(/^\s+|\n|\s+$/g,"")!='') ?
         HtmlUnicodeDecode('&#182;') + ' ::Alert::\nCustom Smiley detected. You should consider it.\n\n' 
      : '')
     +'This will delete/reset all saved data.\nThings that might be conflict with your QR.'     
     +'\nPlease report any bug or some bad side effects here:'+space+'\n'+home[1]+'\nor\n'+home[0]+
     '\n\n'+HtmlUnicodeDecode('&#187;')+' Continue with Reset?';
    var yakin = confirm(msg);
    if(yakin) {
      var keys = ['SAVED_AVATAR','LAST_FONT','LAST_COLOR','LAST_SIZE','HIDE_AVATAR','UPDATES_INTERVAL','UPDATES','DYNAMIC_QR',
                  'HIDE_CONTROLLER','CUSTOM_SMILEY','TMP_TEXT','SCUSTOM_ALT','SCUSTOM_NOPARSE','TEXTA_EXPANDER','SHOW_SMILE'
                  ,'QR_HOTKEY_KEY'
                  ,'QR_HOTKEY_CHAR'
                  ,'LAYOUT_CONFIG','LAYOUT_SIGI','LAYOUT_TPL'
                 ];
      for(var i in keys){
        try{ if(isString(keys[i])) GM_deleteValue('KEY_SAVE_'+keys[i]); }catch(e){}        
      }
      window.setTimeout(function() { location.reload(false); }, 300);
    }
}
function save_setting(e){
    var par, value, misc;
    var KS = 'KEY_SAVE_';
    gvar.restart=true;
    
    if(!gvar.isOpera){ // saving hotkey
      misc = ['misc_hotkey_ctrl','misc_hotkey_shift','misc_hotkey_alt'];
      var reserved_CSA = ['0,0,1', '1,0,1']; /* Alt+Q || Ctrl+Alt+Q */
      var Chr='';
      value = [];
      for(var id in misc){
        if(!isString(misc[id])) continue;
        par = Dom.g(misc[id]);
        if(par) value.push( par.checked ? '1' : '0' );  
      }
      value = value.toString();
      par = $D('#misc_hotkey_char');
      if(par) Chr=par.value.toUpperCase();
      if( Chr=='Q' && (reserved_CSA[0]==value || reserved_CSA[1]==value) ){ // bentrok
        var koreksi = confirm('Hotkey is already reserved:\n [Alt + Q] : Fetch Quoted Post\n [Ctrl + Alt + Q] : Deselect Quote\n\nDo you want to make a correction?');
        if(koreksi) return;
      }
      if(isUndefined(koreksi) ) {// save only when ga bentrok reserved
        setValue(KS+'QR_HOTKEY_KEY',value);      
        if( Chr=='' || Chr.match(/[A-Z0-9]{1}/) ){
          gvar.settings.hotkeychar=Chr;
          setValue(KS+'QR_HOTKEY_CHAR',Chr.toString());
        }
      }
    }
    // saving serial controller
    par = getTag('input',$D('#td_setting_control'));
    if(par){
      value = [];
      for(var i in par)     
         value.push(par[i].checked ? '1' : '0');
      setValue(KS+'HIDE_CONTROLLER',value.toString());
    }
    // saving updates; avatar; dynamic
    misc = {
       'misc_updates':KS+'UPDATES'
      ,'misc_hideavatar':KS+'HIDE_AVATAR'
      ,'misc_dynamic':KS+'DYNAMIC_QR'
    };
    for(var id in misc){
      if(!isString(misc[id])) continue;
      par = Dom.g(id);
      if(par){
        value = (par.checked ? '1' : '0');
        setValue(misc[id], value.toString());
      }
    }
    
    // saving update interval
    if( $D('#misc_updates_interval') ){
      value = Math.abs($D('#misc_updates_interval').value);
      value = (isNaN(value)||value <= 0 ? 1 : (value > 99 ? 99 : value) );
      setValue(KS+'UPDATES_INTERVAL', value.toString());
    }
    
    // saving autoexpand
    value = [];
    value.push($D('#misc_autoexpand_0').checked ? '1':'0');
    for(var i=1;i<3;i++){
      par = $D('#misc_autoexpand_'+i);
      if(par){
        var tVal = parseInt( trimStr(par.value) );
        if(isNaN(tVal))
          value.push(gvar.settings.textareaExpander[i]);
        else{
          var rolback=false;
          if(i==1 && (tVal<75 || tVal>2049)) rolback=true;
          if(i==2 && (tVal>2049 || tVal<=value[1])) rolback=true;
          if(rolback) tVal=gvar.settings.textareaExpander[i];          
          value.push(tVal);
        }
      }
    }
    setValue(KS+'TEXTA_EXPANDER', value.toString());

    // saving autoshow_smiley
    value = [];
    misc = ['kecil','besar','custom'];
    par = $D('#misc_autoshow_smile');
    if(par) value.push(par.checked ? '1':'0');
    for(var id in misc){
      if(!isString(misc[id])) continue;
      par = $D('#misc_autoshow_smile'+'_'+misc[id]);
      if(par && par.checked){
        value.push(misc[id]);
        break;
      }
    }
    setValue(KS+'SHOW_SMILE', value.toString());
    
    // saving autolayout
    misc = ['misc_autolayout_sigi','misc_autolayout_tpl'];
    value = [];
    for(var i in misc){
      if(!isString(misc[i])) continue;
      value.push(Dom.g(misc[i]).checked ? '1' : '0');
    }
    setValueForId(gvar.user.id, value.toString(), 'LAYOUT_CONFIG'); //save layout
    
    // set temporarty text
    value=vB_textarea.Obj.value;
    if(value) setValue(KS+'TMP_TEXT', value );
    
    // ==
    getSettings(); // redefine gvar
    toggle_setting(); // close setting
    
    // destroy all qr, on !restart
    if(!gvar.restart)
      Dom.remove($D('#quickreply'));

    // -- Restart Main with new settings--
    if($D('#qr_maincontainer'))
      $D('#qr_maincontainer').innerHTML = '';

    start_Main();
    // --
}; // end save_setting() 
function toggle_setting(){
    var disp, cont = $D('#settings_cont');
    if(!cont) return;
    var updown = function(show){
      var small = $D('#updown_setting');
      small.innerHTML = HtmlUnicodeDecode(show ? '&#9650;' : '&#9660;');
    };
    if(cont && cont.innerHTML!='') {
      disp = false; // gonna hide it
      cont.innerHTML='';
    }else{
      cont.innerHTML=getTPL_Settings();
      disp=true;
      Dom.Ev( $D('#save_settings'), 'click', function(e){ e=e.target||e; save_setting(e)} );
      Dom.Ev( $D('#cancel_settings'), 'click', function(){ toggle_setting()} );
      Dom.Ev( $D('#reset_default'), 'click', function(){ reset_setting() });
      if(!gvar.isOpera){
        Dom.Ev( $D('#misc_hotkey_ctrl'), 'click', function(e){ e=e.target||e; precheck_shift(e); });
        Dom.Ev( $D('#misc_hotkey_alt'), 'click',  function(e){ e=e.target||e; precheck_shift(e); });
        Dom.Ev( $D('#misc_hotkey_char'), 'keyup', function(e){ e=e.target||e; precheck_shift(e); });
      }
      Dom.Ev( $D('#edit_sigi'), 'click', function(e){ e=e.target||e; toggle_editLayout(e); });
      Dom.Ev( $D('#edit_tpl'), 'click',  function(e){ e=e.target||e; toggle_editLayout(e); });
      if(!gvar.noCrossDomain) // unavailable on Chrome|Opera T_T
       Dom.Ev( $D('#chk_upd_now'), 'click',  function(e){
        if($D('#fetch_update')) return; // there is a fetch update in progress		
		if($D('#upd_cnt')) Dom.remove($D('#upd_cnt'));
        Updater.notify_progres('chk_upd_now');
        Updater.check(true);
       });

      // prevent Enter onsubmiting in settings_cont Nodes
      var alNod = getTag('input', cont);      
      for(var idx in alNod){
        Dom.Ev( alNod[idx], 'keydown', function(e){
          var C = (!e ? window.event : e );
          if(C.keyCode==13){ // mijit enter
            C = do_an_e(C);
            save_setting();
          }else if(C.keyCode==27){ // escape?
            toggle_setting();
          }else{
            return;
          }
        });
      }
    }  
    if(disp){ // show setting
        vB_textarea.readonly();
    }else{
        if(vB_textarea.content!=gvar.silahken || vB_textarea.content==''){
          vB_textarea.enabled();
          window.setTimeout(function() { vB_textarea.focus(); }, 50);
        }
    }
    showhide(cont, disp);
    updown(disp);
}; // end toggle_setting()

function cancelLayout(e){
  e=e.target||e; var tgt = e.id.replace('_cancel','')+'_Editor';
  Dom.g(tgt).innerHTML=''; addClass('cancel_layout-invi', e );
};
function toggle_editLayout(e){
  if(typeof(e)!='object') return;
  var todo=e.innerHTML; // edit | set
  var value, task=e.id; // sigi | tpl
  var el_cancel = Dom.g(task+'_cancel');
  var genTxta = function(_task, value){
    var tgt = Dom.g(_task+'_Editor'); tgt.innerHTML='';
    var el = createEl('textarea',{id:_task+'_txta'}, value);
    Dom.add(el, tgt); tgt.style.display='';
    window.setTimeout(function(e) { try{Dom.g(_task+'_txta').focus();}catch(e){} }, 100);
  };
  
  if(todo=='edit'){
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
  }else{ // set
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
    
    setValueForId (gvar.user.id, encodeURIComponent(value), keyName, ['<!>','::']); //save layout
    window.setTimeout(function() { SimulateMouse(Dom.g(task+'_cancel'), 'click', true); }, 50);
    if(task=='edit_sigi')
      gvar.settings.userLayout.signature=value.replace(/\\([\!\:])/g, "$1");
    else
      gvar.settings.userLayout.template=value.replace(/\\([\!\:])/g, "$1");
  }
  e.innerHTML = (todo=='edit' ? 'set' : 'edit');
  
  // using onclick attribute identify that cancel event has been attached
  if(!el_cancel.getAttribute('onclick')){
    el_cancel.setAttribute('onclick','return false;');
    Dom.Ev(el_cancel, 'click', function(ec){ 
     ec=ec.target||ec; var tgt = ec.id.replace('_cancel','')+'_Editor';
     Dom.g(tgt).innerHTML=''; addClass('cancel_layout-invi', ec );
     e.innerHTML='edit';
    });
  }  
}; // end  toggle_editLayout

function precheck_shift(e){
       //clog('in precheck_shift');
  if(typeof(e)!='object') return;
  var hVal=''; var hChk=true;
  if(e.getAttribute('type')!='text'){
    var tgt = 'misc_hotkey_shift';
    var id = e.id.replace('misc_hotkey_','');
    var sId = 'misc_hotkey_'+(id=='ctrl' ? 'alt' : 'ctrl'); // sibling-Id, tetangga-nya    
    Dom.g(tgt).disabled=false;    
    if(!e.checked){
       if(!Dom.g(sId).checked){
         Dom.g(tgt).checked=false;
         Dom.g(tgt).disabled='disabled';
         hChk = false;
       }
    }
    hVal=$D('#misc_hotkey_char').value;
  }else{
    hVal=e.value;
    hChk= !(!$D('#misc_hotkey_ctrl').checked && !$D('#misc_hotkey_alt').checked && !$D('#misc_hotkey_shift').checked);
  }
  $D('#misc_hotkey').checked=(!hChk || hVal=='' ? false : 'checked');
}

function create_smile_tab(caller){
       //clog('in create_smile_tab');
  var parent = $D('#smile_cont');
  if(parent.innerHTML!='') {
    parent.style.display=(parent.style.display=='none' ? '':'none');
    showhide($D('#settings_btn'), (parent.style.display=='none'));
    force_focus(10);
    return;
  }
  var cont,el,el2,Attr,img,imgEl;
  var scontent = ['skecil_container','sbesar_container','scustom_container'];
  
  // create tabsmile
  cont = createEl('ul',{id:'tab_parent','class':'ul_tabsmile'});  
  // tab skecil
  el2 = createEl('a',{href:'javascript:;','class':'current',id:'remote_'+scontent[0]},'kecil');
  Dom.Ev(el2, 'click', function(e){ 
    toggle_tabsmile(e); 
    var tgt = Dom.g(scontent[0]);
    if(tgt.innerHTML=='')
        insert_smile_content(scontent[0],gvar.smiliekecil);
  });
  el = createEl('li',{'class':'li_tabsmile'});
  Dom.add(el2,el); Dom.add(el,cont);
  // tab sbesar
  el2 = createEl('a',{href:'javascript:;','class':'',id:'remote_'+scontent[1]},'besar');
  Dom.Ev(el2, 'click', function(e){
    toggle_tabsmile(e);
    var tgt = Dom.g(scontent[1]);
    if(tgt.innerHTML=='')
        insert_smile_content(scontent[1],gvar.smiliebesar);
  });
  el = createEl('li',{'class':'li_tabsmile'});
  Dom.add(el2,el); Dom.add(el,cont);
  // tab custom
  el2 = createEl('a',{href:'javascript:;','class':'',id:'remote_'+scontent[2]},'[+] ');
  Dom.Ev(el2, 'click', function(e){
    toggle_tabsmile(e);
    var tgt = Dom.g(scontent[2]);
    if(tgt.innerHTML=='')
        insert_smile_content(scontent[2],gvar.smiliecustom);
  });
  el = createEl('li',{'class':'li_tabsmile'});
  Dom.add(el2,el); Dom.add(el,cont);
  // tab close
  el2 = createEl('a',{href:'javascript:;',id:'tab_close',title:'Close Smiley'},'&nbsp;<b>X</b>&nbsp;');
  Dom.Ev(el2, 'click', function(){ 
    $D('#smile_cont').style.display='none';
    var obj = $D('#vB_Editor_001_cmd_insertsmile_img');
    obj.style.backgroundColor='transparent';
    obj.style.border='1px solid transparent';
    showhide($D('#settings_btn'), true);
    force_focus(10); return; 
  });
  el = createEl('li',{'class':'li_tabsmile tab_close'});
  Dom.add(el2,el); Dom.add(el,cont);
  // tab more
  el = createEl('li',{'class':'li_tabsmile tab_close'},'<a href="javascript:;" onclick="vB_Editor[\'vB_Editor_001\'].open_smilie_window(440,'+GetHeight()+');return false" title="Show all smilie">[ More ]</a>');
  Dom.add(el,cont);
  
  Dom.add(cont,parent);
  // --- end tab creation ---
  
  // populate smiley set | custom smiley will also loaded from here
  getSmileySet();  

  // (blank) container for smiley contents
  for(var i=0; i<scontent.length; i++){
    Attr={id:scontent[i], 'class':'smallfont', style:'display:none;' };
    cont = createEl('div',Attr);
    Dom.add(cont,parent);
  }
  
  if(gvar.settings.autoload_smiley[0]=='1'){
    var id= ('s'+gvar.settings.autoload_smiley[1]+'_container');
    insert_smile_content(id, eval('gvar.smilie'+gvar.settings.autoload_smiley[1]));
    window.setTimeout(function() {
      SimulateMouse($D('#remote_'+id), 'click', true);
    }, 50);
  }else{
    toggle_tabsmile(Dom.g(scontent[0]));
    window.setTimeout(function() {
      SimulateMouse($D('#remote_'+scontent[0]), 'click', true); // trigger click tab for smiley kecil
      force_focus(10);
    }, 50);
  }
  parent.style.display='';
  showhide($D('#settings_btn'), false);
  
}
// end create_smile_tab

function insert_smile_content(scontent_Id, smileyset){
       //clog('in insert_smile_content');
  var target,dumycont,Attr,img,imgEl2,imgEl=false;
  var countSmiley=0;
  if(!scontent_Id || !smileyset) return;
  target = Dom.g(scontent_Id);
  target.innerHTML='';
  
  dumycont = createEl('div',{id:'loader_'+scontent_Id},'<img src="'+gvar.domainstatic+'images/misc/11x11progress.gif" border="0"/>&nbsp;<small>loading...</small>');
  realcont = createEl('div',{id:'content_'+scontent_Id,style:'display:none;'});
  Dom.add(dumycont,target);
  Dom.add(realcont,target);
  if(smileyset){
    var adclass = (gvar.settings.scustom_alt ? 'ofont qrsmallfont nothumb' : 'scustom-thumb');
    for (var i in smileyset) {
     img=smileyset[i];
     if( !isString(img) ){
       if(scontent_Id=='scustom_container'){
             //clog('ekstrakting ['+typeof(img)+']='+img);
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
       Dom.Ev(imgEl, 'click', function(e){ 
	      var C = e; e=e.target||e; do_smile(e); 
		  // stop default action
		  try{do_an_e(C);return false;}catch(ev){} 
	   });
       Dom.add(imgEl,realcont);
       countSmiley++;
     }else { // this is string and do replace to suitable value
       var sep,retEl=validTag(img, true, 'view');
       if(!retEl) continue;
          //clog('sep='+retEl.nodeName);
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
       //clog('Inner=\n'+realcont.innerHTML)
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
            Dom.Ev(imgEl, 'load', function(){
             //clog('all smiley has been loaded');
             showContent();
            });
            if(imgEl.height) // obj has beed loaded before this line executed
               showContent();
     }
    }
  }
   
  // custom images ?
  if(scontent_Id=='scustom_container'){
    var el,cont;
    cont = createEl('div',{style:'margin-top:10px;'});
    el = createEl('a',{href:'javascript:;','class':'qrsmallfont',style:'padding:1px 5px;'},'Manage');
    Dom.add(el,cont);
    Dom.Ev(el, 'click', function(e){
      var imgtxta,obj,obj2,task,buff;
      var mcPar=$D('#manage_container');
      var cont_id = 'scustom_container';
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
             else if(ret=validTag(img, false, 'editor') )
               buff+=ret;
            }
          }
          mcPar = createEl('div',{id:'manage_container'});
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
          try{imgtxta.focus();}catch(e){}
        }
      }else{
        // task save 
        var buff=false;
        var KS = 'KEY_SAVE_';
        var lastsave = getValue(KS+'CUSTOM_SMILEY');
        var lastVal = [getValue(KS+'SCUSTOM_ALT'), getValue(KS+'SCUSTOM_NOPARSE')];
        imgtxta = $D('#textarea_'+cont_id);
        if(imgtxta)
           buff = do_filter_scustom(imgtxta.value).toString();
        gvar.settings.scustom_alt = ($D('#scustom_alt').checked);
        gvar.settings.scustom_noparse = ($D('#scustom_noparse').checked);
           //clog('lastsave=\n'+lastsave+'\n\ncurrent=\n'+buff+'\n\n\nchanged?\n'+(buff && lastsave!=buff));
        if( (buff && lastsave!=buff) || lastVal[0]!=gvar.settings.scustom_alt || lastVal[1]!=gvar.settings.scustom_noparse) {
          setValue(KS+'SCUSTOM_ALT', (gvar.settings.scustom_alt ? '1':'0') ); //save custom alt
          setValue(KS+'SCUSTOM_NOPARSE', (gvar.settings.scustom_noparse ? '1':'0') ); //save custom parser
          setValue(KS+'CUSTOM_SMILEY', buff); //save custom smiley
             //clog('sc saved..')
          getSmileySet(true); // load only custom          
          // re attach
          window.setTimeout(function() {
            insert_smile_content(cont_id, gvar.smiliecustom)
          }, 200);
        }
        //mcPar.style.display='none';
        Dom.remove(mcPar);
        if($D('#help_manage')) $D('#help_manage').style.display='none';
      }
      e.innerHTML = (task=='Manage' ? 'Save' : 'Manage');
    }); // end event click Manage-Save
    el = createEl('a',{id:'help_manage',href:'javascript:;','class':'qrsmallfont',style:'padding:1px 5px;margin-left:20px;display:none;',title:'RTFM'},' ? ');
    Dom.add(el,cont);
    Dom.Ev(el, 'click', function(e){
      alert( ''
       +'Each Smiley separated by newline.\nFormat per line:\n tag|smileylink'
       +'\n eg.\ncheers|http:/'+'/static.kaskus.us/images/smilies/sumbangan/smiley_beer.gif'
        +(!gvar.settings.scustom_noparse ? ''
        +'\n\nUse Custom Smiley BBCODE with this format:'
        +'\n eg.\n[[yourtag]'
        :'')
      +'');      
    });
    Dom.add(cont,realcont);
  } // end when it's scustom_container
}
// end insert_smile_content()

function toggle_tabsmile(e){
        //clog('in toggle_tabsmile');
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

function create_popup_size(){
  var id = 'vB_Editor_001_popup_size_menu';
  var Attr = {id:id,'class':'vbmenu_popup',
       style:'width:40px;height:215px;overflow:auto;z-index:99;clip:rect(auto,auto,auto,auto);display:none;'
    };
  var el = createEl('div',Attr);
  var tCont,tFont,size;
  for (var idx in gvar.sizeoptions) {
    size = gvar.sizeoptions[idx];
    if(!isString(size)) continue; // should do this, coz Opera lil weirdo
    Attr={title:size,'class':'osize',style:'text-align:left;'};
    tCont = createEl('div',Attr);
    tFont = createEl('font',{size:size},size);
    Dom.add(tFont,tCont);
    Dom.Ev(tCont, 'click', function(e){
      e=e.target||e;
      if(e.nodeName=='FONT') e=e.parentNode;      
      var cont=Dom.g(id);
      cont.style.display='none';
      var eTitle = e.getAttribute('title');
      var eOut=$D('#vB_Editor_001_size_out');
      eOut.setAttribute('title',eTitle);
      eOut.innerHTML=eTitle;
      do_insertTag('size',eTitle);
      gvar.settings.lastused.size = eTitle;
      setValue('KEY_SAVE_LAST_SIZE',eTitle);
      if(gvar.isOpera) force_focus();
    });
    Dom.add(tCont,el);
  }
  create_dummy_input(el, id+'_dumy');
  return el;
}
function create_popup_font(){
  var id = 'vB_Editor_001_popup_fontname_menu';
  var Attr = {id:id,'class':'vbmenu_popup',
       style:'width:200px;height:250px;overflow:auto;z-index:99;clip:rect(auto,auto,auto,auto);display:none;'
    };
  var el = createEl('div',Attr);
  var tClr,tFont,font;
  for (var idx in gvar.fontoptions) {
    font = gvar.fontoptions[idx];
    if(!isString(font)) continue; // should do this, coz Opera lil weirdo
    Attr={'class':'ofont',title:font};
    tClr = createEl('div',Attr);
    tFont = createEl('font',{face:font},font);
    Dom.add(tFont,tClr);
    Dom.Ev(tClr, 'click', function(e){
      e=e.target||e;
      if(e.nodeName=='FONT') e=e.parentNode;      
      var cont=Dom.g(id);
      cont.style.display='none';
      var sfont = e.getAttribute('title');
      var out=$D('#vB_Editor_001_font_out');
      out.setAttribute('title',sfont);
      out.innerHTML=sfont.substring(0,11)+(sfont.length>11?'..':''); // cut up to 12 char only      
      do_insertTag('font',sfont);
      gvar.settings.lastused.font = sfont;
      setValue('KEY_SAVE_LAST_FONT',sfont);
      if(gvar.isOpera) force_focus();
      // this still not workin (force scrollTop of font_menu), biarin aj aah minor :p
      //Dom.g(id).scrollTop = 0;
    });    
    Dom.add(tClr,el);
  }
  create_dummy_input(el, id+'_dumy');
  return el;
}
function create_popup_color(){
  var id = 'vB_Editor_001_popup_forecolor_menu';
  var Attr = {id:id,'class':'vbmenu_popup',
    style:'width:auto;height:auto;overflow:visible;z-index:99;display:none;'
  };
  var el = createEl('div',Attr);
  Attr = {cellPadding:0,cellSpacing:0,border:0};
  var table = createEl('table', Attr);
  Dom.add(table,el);
  var i = 0;
  for (var hex in gvar.coloroptions) {
    if(!isString(gvar.coloroptions[hex])) continue; // should do this, coz Opera lil weirdo
    if (i % 8 == 0) 
      var tr = table.insertRow(-1);    
    i++;
    var div = createEl('div',{style:'border:1px solid #CDA;background-color:'+gvar.coloroptions[hex]},'&nbsp;');
    var td = tr.insertCell(-1);   
    td.style.textAlign = "center";
    td.className = "ocolor";
    Dom.add(div,td);
    //td.cmd = obj.cmd;
    td.editorid = this.editorid;
    //td.controlkey = obj.id;
    td.colorname = gvar.coloroptions[hex];    
    td.id = "pick_color_"+td.colorname;
    
    Dom.Ev(td, 'click', function(e){
      e=e.target||e;
      if(e.nodeName=='DIV') e=e.parentNode;
      var etitle = e.id.replace('pick_color_','');
      do_insertTag('color',etitle);
      Dom.g(id).style.display='none';
      var bar=$D('#vB_Editor_001_color_bar');
      bar.style.backgroundColor=etitle;
      bar.setAttribute('title',etitle);
      gvar.settings.lastused.color = etitle;
      setValue('KEY_SAVE_LAST_COLOR',etitle);
      if(gvar.isOpera) force_focus();
    });
  }
  create_dummy_input(el, id+'_dumy');
  return el;
}

function create_dummy_input(parent, dumy_id){
       //clog('in create_dummy_input');
  var dumyEl = createEl('input',{id:dumy_id, style:'width:1px;height:0;margin-left:-99999px;',readonly:'readonly'});
  Dom.add(dumyEl,parent);
  Dom.Ev(dumyEl, 'blur', function(ec){
      if(!gvar.stillOnIt) 
      window.setTimeout(function() {
          ec=ec.target||ec;
          if(ec.nodeName=='INPUT') ec=ec.parentNode;
          ec.style.display='none';
        }, 500);
  });  
  Dom.Ev(parent, 'mousedown', function(ec){
    gvar.stillOnIt=true;      
    window.setTimeout(function() {
      gvar.stillOnIt=false;
      try{Dom.g(dumy_id).focus();}catch(e){};
    }, 550);
  });
}

// delayed focus to textarea
function force_focus(delay){
    if(isUndefined(delay)) delay=560;
    if(!vB_textarea.Obj) vB_textarea.init();
    window.setTimeout(function() {
      vB_textarea.Obj.focus();
    }, delay); // rite after dumy created, lost its focus
}

// mode = ['editor', 'saving', 'view']
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
        ret = createEl(matches[torep][0],{},val);
      } else if(isDefined(mode) && mode=='editor') // editor mode and it's a BR
        if(torep=='{sctag:(br)}') 
          ret=txt.replace(re, '\n');
        else{
          // guess it should be a title
          var title = re.exec(txt);
            //clog('mode='+mode+'; title; title='+title)
          if(re && isDefined(title[1])){
            val = do_sanitize(title[1]);            
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

function do_filter_scustom(text){
  var buf=text;
  if(buf!=''){
    var re,sml,done = false;
    var tosingle = {
       '\\|{2,}' : '|'
      ,'(\\r\\n){2,}' : '\r\n{sctag:br}\r\n,'
      ,'(\\n){2,}' : '\n{sctag:br}\n'
    };
    // step -1 to strip
    buf = buf.replace(/[\[\]\,]/g,"");
         //clog('step-to single');
    for(var torep in tosingle){
      if(!isString(tosingle[torep])) continue;
      re = new RegExp(torep, "g");
      buf = buf.replace(re, tosingle[torep])
    }
         //clog('before step-validate='+buf);    
    // step -3 to validate per line    
    buf=(document.all ? buf.split("\r\n") : buf.split("\n")); // IE : FF/Chrome
    
    var sml,retbuf='';
    var sepr = ','; // must be used on extracting from storage
      for(var line in buf){
       if(!isString(buf[line])) continue;
         buf[line] = trimStr ( buf[line] ); // trim perline
          //clog('line='+line+'; val='+buf[line]);
         sml = /([^|]+)\|(http(?:[s|*])*\:\/\/.+$)/.exec( buf[line] );
       if(sml && isDefined(sml[1]) && isDefined(sml[2]) ){ // smiley thingie ?
            //clog('sml[0]='+sml[0]+'; sml[1]='+sml[1]+'; sml[2]='+sml[2]);
         retbuf+=sml[1]+'|'+sml[2]+sepr; // new separator
       }else if(sml=validTag( buf[line], false, 'saving' ) ){ // valid tag ?
            //clog(sml);
         retbuf+=sml+sepr;
       }
       done=true;
      } // end for    
  }
  return retbuf;
}

function do_parse_scustom(msg){
  var buf = msg;
  if(buf!=''){
    if(!buf.match(/\[\[([^\]]+)/gi)) 
      return buf;
    var re,re_W,tag,done = false;
    var lastTag='';
    // prepared paired key and tag of custom image
    var paired = prep_paired_scustom();    
    while(!done){
      tag = /\[\[([^\]]+)/.exec(buf);      
      if( tag && isDefined(tag[1]) && isDefined(paired['tag_'+tag[1]]) && tag[1]!=lastTag ){
               //clog('parsing['+tag[1]+']...');
          re_W = '\\[\\[' + tag[1].replace(/(\W)/g, '\\$1') + '\\]';
          re = new RegExp( re_W.toString() , "g"); // incase-sensitive and global, save the loop
          buf = buf.replace(re, '[IMG]'+paired['tag_'+tag[1]]+'[/IMG]');
          lastTag = tag[1];
      }else{
        done = true;
      }
    } // end while
  }  
  return buf;
}

function prep_paired_scustom(){
   var img,paired={};
   // preload smiliecustom database if needed
   if(!gvar.smiliecustom) getSmileySet(true); 
   for(var i in gvar.smiliecustom){
     img = gvar.smiliecustom[i];
     /** gvar.smiliecustom[idx.toString()] = [parts[1], parts[0], parts[0]];
     # where :
     # idx= integer
     # gvar.smiliecustom[idx.toString()] = [link, tags, tags];
     */
          //clog(img.toString())
     paired['tag_'+img[1].toString()] = img[0].toString();
   }
   return paired;
}

// action to do insert smile
function do_smile(Obj, nospace){
  var bbcode;  
  if($D('#dv_accessible') && $D('#dv_accessible').style.display!='none')
    SimulateMouse($D('#dv_accessible'), 'click', true);
  vB_textarea.init();
  if(Obj.getAttribute("alt"))
    bbcode = Obj.getAttribute("alt");
  // custom mode using IMG tag instead
  if(bbcode.match(/_alt_.+/)) {
    var link=Obj.getAttribute("src");
    var tag = 'IMG';
    var prehead = [('['+tag+']').length, 0];
    prehead[1] = (prehead[0]+link.length);        
    vB_textarea.setValue( '['+tag+']'+link+'[/'+tag+']' + (!nospace ? ' ':''));
  }else{
    vB_textarea.setValue(bbcode + (!nospace ? ' ':'') );
  }
}
// action to do insert font/color/size
function do_insertTag(tag, value){
  vB_textarea.init();
  vB_textarea.wrapValue(tag,'"'+value+'"');
}
// action to do [align,B,I,U]
function do_align_BIU(e){
  var tag=e;
  if(typeof(e)=='object'){
    e = e.target||e;
    tag=e.alt;
  }
  
  var pTag={
    'Bold' :'B',    'Italic' :'I',      'Underline':'U',
    'Left' :'LEFT', 'Center' :'CENTER', 'Right'    :'RIGHT',
  };  
  if(tag.indexOf('Align ')!=-1) tag = tag.replace('Align ','');
  if(isUndefined(pTag[tag])) return;
  vB_textarea.init();
  vB_textarea.wrapValue(pTag[tag],''); 
}
function do_btncustom(e){
  e = e.target||e;
  var tag=e.alt;
  var tagprop = '';
  tag = tag.replace(/[\[\]]/g,'').replace('Insert ','').toLowerCase();
  var pTag={
     'quote':'QUOTE','code' :'CODE'
    ,'link' :'URL',  'image':'IMG'
    ,'spoiler' :'SPOILER','transparent':'COLOR','noparse' :'NOPARSE','youtube' :'YOUTUBE'
  };
  var endFocus=function(){ vB_textarea.focus(); return false; };
  if(isUndefined(pTag[tag])) return endFocus();;
  vB_textarea.init();
  
  if(tag=='quote' || tag=='code'){  
    vB_textarea.wrapValue( tag );  
  }else if(tag=='spoiler'){
  
    var title = prompt('Please enter the TITLE of your Spoiler:', gvar.settings.lastused.sptitle );
	if(title==null) return endFocus();
	title = (title ? title : ' ');
	gvar.settings.lastused.sptitle = trimStr(title);
	setValue('KEY_SAVE_LAST_SPTITLE', title);
    vB_textarea.wrapValue( 'spoiler', title );

  }else{
    var text, selected = vB_textarea.getSelectedText();
    var is_youtube_link = function(text){
        text = trimStr ( text ); //trim
        if(text.match(/youtube\.com\/watch\?v=\w+/i)){
         var rx = /youtube\.com\/watch\?v=([^&]+)/i.exec(text);
         text = ( rx ? rx[1] : '');
        }else if(!/^[\d\w-]+$/.test(text))
         text = false;
        return text;
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
        case 'link':
          text = prompt('Please enter the URL of your link:', 'http://');
          tagprop = text;
        break;
        case 'image':
          text = prompt('Please enter the URL of your image:', 'http://');
        break;
        case 'youtube':
          text = prompt('Please enter the Youtube URL or just the ID, \nhttp:/'+'/www.youtube.com/watch?v=########', '');
        break;
      }
	  if(text==null) return endFocus();
      if(tag=='youtube')
        text = is_youtube_link(text);
      if(tag=='link' || tag=='image')
        text = (isLink(text) ? text : null);
      if(!text) 
        return endFocus();
      else{
        var prehead = [('['+pTag[tag]+(tagprop!=''?'='+tagprop:'')+']').length, 0];
        prehead[1] = (prehead[0]+text.length);        
        vB_textarea.setValue( '['+pTag[tag]+(tagprop!=''?'='+tagprop:'')+']'+text+'[/'+pTag[tag]+']', prehead );
      }
      return endFocus();
    } // end selected==''
    
    tagprop = (tag=='transparent' ? 'transparent' : '');
    if(tag=='link'||tag=='image'||tag=='youtube'){
       var ptitle=(tag=='youtube' ? ['Please enter the Youtube URL or just the ID, \nhttp:/'+'/www.youtube.com/watch?v=########',''] : ['Please enter the URL of your '+tag+':','http://']);
       text = prompt(ptitle[0], ptitle[1]);
	   if(text==null) return endFocus();
       switch(tag){
         case 'link':
          tagprop = text;
          text = selected;           
         break;
         case 'youtube':
           text = is_youtube_link(text);
           if(!text) return endFocus();
         break;
       }       
       var prehead = [('['+pTag[tag]+(tagprop!=''?'='+tagprop:'')+']').length, 0];
       prehead[1] = (prehead[0]+text.length);
       vB_textarea.replaceSelected( '['+pTag[tag]+(tagprop!=''?'='+tagprop:'')+']'+text+'[/'+pTag[tag]+']', prehead );
       return endFocus();
    }
    vB_textarea.wrapValue( pTag[tag], (tagprop!='' ? tagprop:'') );
  }
}

function event_ckck(){
       //clog('in event_ckck');
  if($D('#quickreply')) gvar.motion_target=$D('#quickreply');  
  Dom.Ev(gvar.motion_target, 'mousemove', function(){
      var ck=document.cookie.toString().split(';');
      gvar.ck.hotbb=-1;
      for(var i=0;i<ck.length;i++){
        var cv=ck[i].split('=');
        if(cv[0].indexOf('bb'+'us'+'erid')!=-1) 
           gvar.ck.hotbb=cv[1];
      }
      //show_alert(gvar.ck.hotbb+' - '+gvar.ck.bbuserid);
      /*
       >>if hotbb == -1, decide nothin.
       bbuserid should be untouchable and will only appear after switching w/ cookie-swap  
      */
      if(gvar.ck.hotbb!=-1 && gvar.ck.hotbb!=gvar.ck.bbuserid){
         gvar.ck.bbuserid=gvar.ck.hotbb;
         massive_lock( gvar.ck.bbuserid_currentpage!=gvar.ck.bbuserid );
      }
      return;
  } );  
}

function massive_lock(isChanged){
      //clog('in massive_lock');
 if(isChanged){
    // re-start it .
    if(gvar.ck.bbuserid > 0){
      check_avatar();
       //show_alert('bbuserid changed, re-attach Avatar');
      if(isDefined(gvar.user.id))
        appendAvatar();
      $D('#qravatar_refetch').innerHTML='';
    }
    
    var tokill = ['textarea_clear','capcay_container','capcay_header','settings_btn'];
    for(var i=0; i<tokill.length;i++)
       if(Dom.g(tokill[i])) showhide(Dom.g(tokill[i]), false);
       
    if($D('#vB_Editor_001_controls'))
      $D('#vB_Editor_001_controls').style.display='none';
    if($D('#capcay_container')) 
      $D('#capcay_container').innerHTML = '';
    $D('#submit_container').innerHTML = '<h1>User Changed, please <a href="javascript:location.reload(false);">reload this page</a></h1>';
    addClass('reado', Dom.g(gvar.id_textarea));
    vB_textarea.init();    
    vB_textarea.readonly();
    
    var tokill = [$D('#atitle').parentNode,'settings_cont','smile_cont'];
    for(var i=0; i<tokill.length;i++)
       if(Dom.g(tokill[i])) Dom.remove(Dom.g(tokill[i]));

    // save tmp_text
    if(value=vB_textarea.Obj.value){
      gvar.tmp_text=value;
      setValue('KEY_SAVE_TMP_TEXT',value.toString());
    }
 }else{ // not changed
    if($D('#quickreply').parentNode)
      Dom.remove($D('#quickreply'));
    start_Main();
 }
}

function toogle_quickreply(show, nofocus){
       //clog('in toogle_quickreply');
  var obj = $D('#collapseobj_quickreply');
  var state = (obj.style.display=='none');
  var lastCollapse = getValue('KEY_SAVE_QR_COLLAPSE');
  if(isDefined(show))
    if(show) state = true; // force open toggle, trigered by bulu pena

  $D('#collapseimg_quickreply').src = 'images/buttons/collapse_tcat' + (state ? '':'_collapsed') + '.gif';
  obj.setAttribute('style','display:'+(state ? '':'none')+';');
  
  if(state){ // will open qr ? (from display=none become '')
      if(capcay_notloaded())
       ajax_buildcapcay();

    if(isUndefined(nofocus)){
      window.setTimeout(function() {
        vB_textarea.init();
        if(vB_textarea.content==gvar.silahken) vB_textarea.clear();
        vB_textarea.lastfocus();
      }, 260);
    }
    if(gvar.user.isDonatur && additional_options_notloaded()) 
       ajax_additional_opt();
  }
  if(lastCollapse!=state)
     setValue('KEY_SAVE_QR_COLLAPSE', (state ? 1:0));     
}

function check_avatar(){
  var user = gvar.user;
  var buffer=getValueForId(user.id, 'SAVED_AVATAR');
  var tmp_isDonat = user.isDonatur;
  if(!buffer){
    Avatar.init( user );
    Avatar.cached=false;
    Avatar.request(profile_parser); 
  }else{
    gvar.user = {
       id:buffer[0]
      ,name:buffer[1]
      ,avatar:buffer[2]
      ,isDonatur:tmp_isDonat
    };
  }
}

function profile_parser(page,user){
  var dpage, tmp_avatar='';
  var tmp_isDonat = gvar.user.isDonatur;
  page=page.responseText;
  if(page.indexOf('<td><img src="')!=-1){
    dpage = page.split('<td><img src="')[1].split('</td>')[0];    
    if(ret = dpage.match(/^([^"]+)/)) {
       tmp_avatar = basename(ret[1]); // filename avatar
       gvar.avatarLink = ret[1].replace(tmp_avatar, ''); // make sure if there any change
    }
  }
  gvar.user = {
    id       :user.id
   ,name     :user.name
   ,avatar   :tmp_avatar
   ,isDonatur:tmp_isDonat
  };  
  //save it
  setValueForId(gvar.user.id, gvar.user.name+'::'+gvar.user.avatar, 'SAVED_AVATAR');
  // apend avatar element from gvar
  appendAvatar();
}

function appendAvatar(){
    var dvCon, dv, el, Attr;
    var avId = 'imgAvatar';
    $D('#qravatar_cont').innerHTML='';
    $D('#avatar_header').innerHTML='';   
    if(isDefined(gvar.user.id)){
       dvCon=createEl('div',{style:'border:1px solid red;text-align:center;padding:2px;'});       
       if(isDefined(gvar.user.avatar) &&gvar.user.avatar!='' ){
          Attr={border:0,style:'max-height:100px,max-width:100px',id:avId,src:gvar.avatarLink+gvar.user.avatar};
          el=createEl('img',Attr);
          Dom.add(el,dvCon);
       }else{
          dvCon.style.height='25px';
          dvCon.innerHTML='<small>No Avatar</small>';
       }
       dv=createEl('div',{id:'qravatar_refetch',style:'display:none;position:absolute;'},'<a id="refetch" class="cleanlink" href="javascript:;"><small>refetch</small></a>');
       Dom.add(dv,dvCon);
       Dom.add(dvCon,$D('#qravatar_cont'));
       
       Dom.Ev(dvCon, 'mouseover', function(){dv.style.display='';});
       Dom.Ev(dvCon, 'mouseout', function(){dv.style.display='none';});
       // change className behaviour when img is loaded
       if(Dom.g(avId))
        Dom.Ev(Dom.g(avId), 'load', function(){
         var cls;
         if(Dom.g(avId).clientWidth > 0)
            $D('#qravatar_cont').style.minWidth=Dom.g(avId).clientWidth.toString()+'px';
         Dom.Ev(dvCon, 'mouseover', function(){
           cls = 'qravatar_refetch_hover' + (Dom.g(avId).clientHeight==0 ? '_0':'').toString();
           $D('#qravatar_refetch').setAttribute('class',cls);
         });
         Dom.Ev(dvCon, 'mouseout', function(){
           cls = 'qravatar_refetch_hover' + (Dom.g(avId).clientHeight==0 ? '_0':'').toString();
           removeClass(cls, $D('#qravatar_refetch'));
         });
         if($D('#dv_accessible')) // resize accesible width
           $D('#dv_accessible').style.width=(Dom.g(gvar.id_textarea).clientWidth-80)+'px';
        } );
      else
       if($D('#dv_accessible')) $D('#dv_accessible').style.width=(Dom.g(gvar.id_textarea).clientWidth-80)+'px';
       Dom.Ev($D('#refetch'), 'click', function(){
         if($D('#fetching_avatar')) return;
         refetch_avatar();
       });   
         el=createEl('a',{href:'http:/'+'/www.kaskus.us/member.php?u='+gvar.user.id,'class':'cleanlink'},'<b><small>'+gvar.user.name+'</small>'+(gvar.user.isDonatur ? ' <span style="color:red;">$</span>':'')+'</b>');
         Dom.add(el,$D('#qravatar_cont'));
    }
   
    // hide the avatar ? 
    if(gvar.settings.hideavatar){
     showhide($D('#avatar_header'), false); // hide ava header
     showhide($D('#qravatar_cont'), false); // hide ava container     
    }
}

function refetch_avatar(){
  var el=createEl('div',{id:'fetching_avatar',style:'min-width:auto;'},'<div class="g_notice avafetch">Fetching..</div>');
  Dom.add(el,$D('#avatar_header'));
  delValueForId(gvar.user.id,'SAVED_AVATAR');
  check_avatar();
}
// clean-up fetched post
function unescapeHtml(text){
  if(!text) return '';
  var temp = createEl('div',{},text);
  var cleanRet='';  
  for(var i in temp.childNodes){
    if(typeof(temp.childNodes[i])!='object' || isUndefined(temp.childNodes[i].nodeValue)) continue;
    cleanRet += temp.childNodes[i].nodeValue;
  }
  temp.removeChild(temp.firstChild);
  return cleanRet;
}

function quote_parser(page){
   var parts;   
     //clog(page);
   // this regexp failed on symbolize userid : http://bit.ly/9A9GMg
   //match = /<textarea\sname=\"message\"(?:[^>]+.)([^<]+)*</i.exec(page); 
   
   // back to stone-age method :hammer:
   var pos = [ page.indexOf(gvar.id_textarea), page.lastIndexOf('</textarea') ];
   parts = page.substring(pos[0], pos[1]);
   pos[0] = parts.indexOf('>');
   parts = parts.substring( (pos[0]+1), parts.length);
   return (parts ? unescapeHtml(parts) : null);
}
function ajax_chk_newval(reply_html){
  // initialize 
  reply_html=(isDefined(reply_html) && reply_html ? reply_html : null);
  if(!reply_html){
    if($D('#imgcapcay') && capcay_notloaded())
       $D('#imgcapcay').innerHTML='<div class="g_notice" style="display:block;font-size:9px;">'
        +'<img src="'+gvar.domainstatic+'images/misc/11x11progress.gif" border="0"/>&nbsp;Loading&nbsp;capcay<span id="imgcapcay_dots">...</span></div>';
    // prep xhr request  
    GM_XHR.uri = gvar.newreply;
    GM_XHR.cached = true;
    GM_XHR.request(null,'GET',ajax_chk_newval);
  }else{
    if(!reply_html) return;        
    
    if(capcay_notloaded())
      ajax_buildcapcay(reply_html);

    // bukan maksut repost walau dah ada rutin di ajax_buildcapcay
    // u/ kaskus donatur..:)
    if(gvar.user.isDonatur && additional_options_notloaded()) 
      ajax_additional_opt(reply_html);
    var rets = quote_parser(reply_html.responseText);
    
	vB_textarea.init();
	var notice = $D('#quoted_notice');
	if(vB_textarea.content==gvar.silahken) vB_textarea.set('');
	if(rets==null){
	   addClass('g_notice-error', notice);
	   notice.innerHTML = 'Fetch failed, server might be busy. <a href="javascript:;" id="quote_now" title="Fetch Quoted Post [Alt+Q]">Try again</a>'
        + (' or <a href="javascript:;" id="deselect_them" title="Deselect Quoted Post [Ctrl+Alt+Q]">deselect them</a>.');
       Dom.Ev($D('#quote_now'), 'click', function(){         
         vB_textarea.readonly();
		 removeClass('g_notice-error', notice);
         notice.innerHTML = '<span id="current_fetch_post">Fetching...</span>';
         ajax_chk_newval();
       });
	   Dom.Ev($D('#deselect_them'), 'click', function(){
	    removeClass('g_notice-error', notice);
		deselect_it();
	   });
	}else{
       vB_textarea.add(rets);     
       notice.innerHTML='';
       showhide(notice, false); // hide notice
       deselect_it(); // clear selected quotes	   
       if(gvar.settings.textareaExpander[0]) 
         vB_textarea.adjustGrow(); // retrigger autogrow now
	}
	vB_textarea.lastfocus();
  }
}

// routine for fetching quoted post
function chk_newval(val){
  var tgt, notice = $D('#quoted_notice');
  if(val.length>1){
    notice.innerHTML = 'You have selected one or more posts to quote. <a href="javascript:;" id="quote_now" title="Fetch Quoted Post [Alt+Q]">Quote these posts now</a>'
      + (' or <a href="javascript:;" id="deselect_them" title="Deselect Quoted Post [Ctrl+Alt+Q]">deselect them</a>.');
    notice.setAttribute('style','display:block;');
    Dom.Ev($D('#quote_now'), 'click', function(){
      vB_textarea.init();
      vB_textarea.readonly();      
      notice.innerHTML = '<span id="current_fetch_post">Fetching...</span>';
      ajax_chk_newval();
    });
    Dom.Ev($D('#deselect_them'), 'click', function(){deselect_it();});
  }else{
    showhide(notice, false); // hide notice
    return;
  } 
}

// deselect selected multi quote
function deselect_it(){
   var mqs = cK.g(gvar.vbul_multiquote);
   if(!mqs) return;
   gvar.idx_mq=(mqs ? mqs.split(",").length : 0);
   do_deselect(mqs);
}
function do_deselect(mqs) {
  if(isUndefined(mqs)) mqs = cK.g(gvar.vbul_multiquote);
  ids = mqs.split(',');
  while(gvar.idx_mq > 0) {
    gvar.idx_mq--;
    if($D("#mq_"+ids[parseInt(gvar.idx_mq)])) {
        var mq=(mqs && mqs.indexOf(',')!=-1 ? mqs.split(','):[mqs]);
        SimulateMouse($D("#mq_"+mq[parseInt(gvar.idx_mq)]), 'click', true);
    }
  }
  // delete cookie
  cK.d(gvar.vbul_multiquote);
  chk_newval(0); // trigger showhide notice
}

function growIt(T,minmax){
    gvar.lastTopGrow = null;
    Dom.Ev(T, 'mousemove', function(){ autoGrow(T,minmax);});
    Dom.Ev(T, 'keydown', function(){ gvar.lastTopGrow = ss.getCurrentYPos(); });
    Dom.Ev(T, 'keyup', function(){ autoGrow(T,minmax);});
    //Dom.Ev(T, 'keypress', function(){ autoGrow(T,minmax);});
    Dom.Ev(T, 'focus', function(){ autoGrow(T,minmax);});
}
function autoGrow(f, batas) {
   /* Default max height */
   var min = (isUndefined(batas[0]) ? 100:batas[0]);
   var max = (isUndefined(batas[1]) ? 100:batas[1]);
   //var evt = (e) ? e : ((event)) ? event : null;
   f.style.paddingTop = f.style.paddingBottom = '0px';
   //var hCheck = !($.browser.msie || $.browser.opera);
   var hCheck = true; // assumed browser is not msie nor opera
   var vlen = f.value.length;
   if (vlen != f.valLength ) {
     if (hCheck && (vlen < f.valLength )) f.style.height = "0px";
     var h = Math.max(min, Math.min(f.scrollHeight, max));
      //show_alert('len= '+f.value.length+'; flen= '+f.valLength+'; sH= '+f.scrollHeight+'; h= '+h+'; maxmin= '+(Math.min(f.scrollHeight, max)) + 'f.style.overflow='+f.style.overflow);	  
     f.style.overflow = (f.scrollHeight > h ? "auto" : "hidden");
	 if(f.style.overflow=='auto' && f.style.height==(h+"px") ) 
	   return true;
     f.style.height = h + "px";
     f.valLength = vlen;
	 if(f.style.overflow=='auto' && gvar.lastTopGrow) {
	   window.scrollTo(0,gvar.lastTopGrow);
	   gvar.lastTopGrow = null;
	 }
   }
}

function fetch_property(){
   var match=null;   
   gvar.page = gvar.newreply = match;
   gvar.securitytoken = $D('//input[@name="securitytoken"]', null, true);
   if(!gvar.securitytoken) return;
   gvar.securitytoken = gvar.securitytoken.value;
   
   gvar.threadid = $D('//a[contains(@href,"nextoldest")]', null, true).href;
   match= /\Wt=(\d+)/.exec(gvar.threadid);
   if(match) gvar.threadid = match[1];
   
   // find first element postid
   gvar.newreply = is_opened_thread();
   match = /\Wp=(\d+)/.exec(gvar.newreply);
   if(gvar.newreply && match){
     gvar.page = match[1];
     var tmpuri = gvar.newreply.replace(/\=newreply/,'\=postreply');
     gvar.uripreview=tmpuri.substring(0,tmpuri.indexOf('&')) + '&t=' +gvar.threadid;     
   }
}

function is_opened_thread(){
    // find first href with noquote    
    var anode = $D('.//a[contains(@href,"noquote")]', null, true);
    return (!anode ? false : (anode.innerHTML.indexOf('Closed Thread')==-1 ? anode.href : false) );
}

function setValueForId(userID, value, gmkey, sp){
    sp = [(isDefined(sp) && typeof(sp[0])=='string' ? sp[0] : ';'), (isDefined(sp) && typeof(sp[1])=='string' ? sp[1] : '::')];
    var i, ks = 'KEY_SAVE_'+gmkey;
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
function getValueForId(userID, gmkey, sp){
    sp = [(isDefined(sp) && typeof(sp[0])=='string' ? sp[0] : ';'), (isDefined(sp) && typeof(sp[1])=='string' ? sp[1] : '::')];    
    var info = getValue('KEY_SAVE_'+gmkey);
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
function delValueForId(userID, gmkey){
  var ks = 'KEY_SAVE_'+gmkey;
  var info = getValue(ks);
  info = info.split(';'); var tmp=[];
  for(var i=0; i<info.length; i++){
    if(info[i].split('=')[0]!=userID)
      tmp.push(info[i]);    
  }
  setValue(ks, tmp.join(';'));
}

// if type is not defined, return [id,username,isDonatur]
function getUserId(type){
  var ret=false;
  var logusers = $D("//a[contains(@href, 'member.php')]", null, true);
  if(logusers){
    var cDonat = getByXPath_containing('//a', false, 'QUICK REPLY');    
    var uid = logusers.href.match(/member\.php\?u=(\d+$)/);    
    ret = {id:uid[1], name:logusers.innerHTML, isDonatur:(isUndefined(cDonat[0]) ? false:true)};
  }
  return ret;
}

// set of tpl

function getTPL_main(){
  var tpl = ''
    +'<table cellpadding="0" cellspacing="0"><tr>'
    +'<td id="avatar_header"></td>'
    +'<td><div class="qrsmallfont">'
    +'<div style="float:left;">Title:&nbsp;<a href="javascript:;" id="atitle" title="Optional Title Message">[+]</a>&nbsp;</div><div id="titlecont" style="display:none;"><div id="dtitle" style="float:left;margin-top:-3px;""><input id="input_title" type="text" tabindex="1" name="title" class="input_title" title="Optional"/></div>&nbsp;<div class="spacer">&nbsp;</div></div>'
    +'Message:&nbsp;<a id="textarea_clear" href="javascript:;" title="Clear Editor">reset</a>'
    +'</div></td>'
    +'</tr><tr>'    
    
    // Avatar container
    +'<td id="qravatar_cont" align="left"></td>'    
    // vB_Editor_QR_textarea
    +'<td class="txta_cont panelsurrounds">'    
    +'<div id="controller_wraper" style="border:1px solid transparent;background-color:transparent;position:absolute;margin-top:-20px;line-height:80px;">&nbsp;</div>'
    
    +(!gvar.user.isDonatur ? ''
       +'<div class="panel"><div>'
    :'')
    
    +getTPL_vbEditor()
    
    +(!gvar.user.isDonatur ? ''
       +'</div></div>'
    :'')
    
    // Setting container will be containing from getTPL_Settings()    
    +'<div id="settings_cont"></div>'    
    +'</td>'    
    +'</tr></table>'
    ;
    return tpl;
}
function getTPL(){


  var tpl = 
     '\n<br/>'
    //+'<div id="quickreply">\n'
    // '<!-- start form quick reply -->\n\n'
    +'<form action="newreply.php?do=postreply&amp;t='+gvar.threadid+'" method="post" name="vbform" id="vbform">'
    
    +'<table class="tborder" cellpadding="6" cellspacing="1" border="0" align="center">'
    +'<thead><tr><td id="vB_Editor_001_parent" class="MYvBulletin_editor tcat" colspan="2">'
    +'<a href="javascript:;" id="atoggle"><img id="collapseimg_quickreply" src="'+gvar.domainstatic+'images/buttons/collapse_tcat'+(gvar.settings.qrtoggle==1?'':'_collapsed')+'.gif" alt="" border="0" /></a>'+gvar.titlename+' '+HtmlUnicodeDecode('&#8212;')+' <a id="home_link" href="http:/'+'/userscripts.org/scripts/show/'+gvar.scriptId.toString()+'" target="_blank" title="Home Kaskus Quick Reply - '+gvar.sversion+'">'+gvar.sversion+'</a>'
    +'<span id="upd_notify"></span>'
    +(gvar.__DEBUG__===true ? '<span style="margin-left:20px;color:#FFFF00;">&nbsp;&nbsp;[ [DEBUG Mode] <a href="javascript:;location.reload(false)">reload</a> <span id="dom_created"></span>]</span>':'')
    +'</td></tr></thead>'    
    +'<tbody id="collapseobj_quickreply" style="display:'+(gvar.settings.qrtoggle==1?'':'none')+';"><tr><td class="panelsurround" align="center">'
    +'<div class="panel">'
    +'<div class="qr_container">'
          
    // Quoted notice
    +'<div id="quoted_notice" class="g_notice"></div>'
    
    // header_component
    +'<div class="MYvBulletin_editor">'
  +'<table cellpadding="0" cellspacing="0"><tr>'
    +'<td>'
    +'<div id="qr_maincontainer"></div>' 
    +'</td>'


     // Image Verification container
    +( false && !gvar.user.isDonatur  ? ''
    +'<td width="300"><table cellpadding="0" cellspacing="0">'
     +'<tr><td id="capcay_header" style="width:150px !important;"></td></tr>'
     +'<tr><td><div id="capcay_container">'+
     +'</div></td></tr>'
    +'</table></td>'
    :'')
	
  +'</tr></table>'
     // Multi quote container
     //+'<input id="mq_container" type="text" value="" '+(gvar.__DEBUG__ ? 'readonly="true" class="txa_readonly" style="width:100%;"':'style="display:none;"')+'/>\n'
    +'</div>' // end .MYvBulletin_editor
    // end header_component
    
    +'</div>' // end #qr_container
    +'</div>' // end .panel
    +'<div id="submit_container" style="margin-top:6px;text-align:center;">\n'
    
    /** gonna strip this, coz failed in sending title
     # flag to ignore thread subscription
     # additional options for subscription will be fetched on ajax build capcay
    */
    //+'<input type="hidden" name="fromquickreply" value="1" />'
    
    +'<input type="hidden" name="s" value="" />'
    +'<input type="hidden" name="securitytoken" value="'+gvar.securitytoken+'" />'
     +'<input type="hidden" name="do" value="postreply" id="qr_do" />'
    +'<input type="hidden" name="t" value="'+gvar.threadid+'" id="qr_threadid" />'
    +'<input type="hidden" name="p" value="'+gvar.page+'" id="qr_postid" />'
    +'<input type="hidden" name="specifiedpost" value="0" id="qr_specifiedpost" />'
    +'<input type="hidden" name="parseurl" value="1" />'
    +'<input type="hidden" name="loggedinuser" value="'+gvar.user.id+'" />'
    +'<input type="hidden" name="multiquoteempty" id="multiquote_empty_input" value="only" />'
    +'<input type="hidden" name="wysiwyg" id="vB_Editor_001_mode" value="0" />'
    +'<input type="hidden" name="clicker" id="clicker" value="" />'
    +'<input type="hidden" name="styleid" value="0" />\n\n'
    
    +'<div class="sub-bottom sayapkiri">'
     +'<div id="rate_thread" style="display:none;"><img src="'+gvar.domainstatic+'images/misc/11x11progress.gif" border="0"/></div>'
    +'&nbsp;</div>\n'


    +'<div class="sub-bottom sayapkanan">'
    +'<input id="chk_fixups" tabindex="7" type="checkbox" '+(gvar.settings.widethread ? 'checked="checked"':'')+'/><a href="javascript:;"><label title="Wider Thread with Kaskus Fixups" for="chk_fixups">Expand</label></a>'
    +'</div>'


	// center container for buttons & folks
    +'<div style="text-align:center;width:100%;">'	
	 +'<div style="display:inline;max-width:350px;">'
     // Image Verification container
      +(!gvar.user.isDonatur ? ''
      +'<div id="capcay_container" style="position:relative; display:none;"></div>'
      :'')
     +'<input id="qr_submit" type="submit" style="display:none;" name="sbutton" value="Post Quick Reply" />' // dummy button to trigger submit
     +'<input id="qr_prepost_submit" class="button" type="button" title="(Alt + S)" tabindex="3" value="'+(gvar.user.isDonatur ? '':'pre-')+'Post Quick Reply" />'
     +'&nbsp;&nbsp;'
     +'<input id="qr_preview_ajx" class="button" type="button" title="(Alt + P)" name="sbutton" tabindex="4" value="Preview" />'
     +'<input id="qr_advanced" class="button" type="submit" title="(Alt + X)" name="preview" tabindex="5" value="Go Advanced" onclick="clickedelm(this.value)"/>'
     +'</div>'
	+'</div>' // end center	
	
    +'</div>\n' // end #submit_container
    
    +'</td></tr></tbody></table></form>\n'
    //+'<!-- / end form quick reply -->\n\n'
    //+'\n</div>'
    ;
    return tpl;
}
function getTPL_vbEditor(){
  var konst = { 
    __sep__: '<td style="padding:0 2px;"><img src="'+gvar.domainstatic+'images/editor/separator.gif" width="6" height="20" alt="|"/></td>',
    mnupop : '<img src="'+gvar.domainstatic+'images/editor/menupop.gif" alt="v" height="16" width="11">',
    _tbo   : '<table cellpadding="0" cellspacing="0" border="0">',
    tbo_   : '</table>'    
  };  
  var lUse,lF,lC,lS;
  if(lUse = gvar.settings.lastused){
    lF = [(lUse.font ? lUse.font:''), ''];
     lF[1] = (lF[0] ? lF[0].substring(0,11)+(lF[0].length>11?'..':''):'Fonts');  
    lC = [(lUse.color ? lUse.color:'Black'), ''];
     lC[1] = (lC[0] ? lC[0].toLowerCase() : '');
    lS = (lUse.size ? lUse.size:'Size');
  }
  var vbe =
    '<table cellpadding="0" cellspacing="0" border="0">'
    +'<tr>'
    +'    <td id="vB_Editor_001" class="vBulletin_editor">'
    +'        <div id="vB_Editor_001_controls" class="controlbar" style="width:100%;">'
        
    + konst._tbo
    +'<tr>'
    
    +(gvar.settings.hidecontroll[0] != '1' ? ''
     +' <td><div class="imagebutton" id="vB_Editor_001_cmd_bold"><img src="'+gvar.domainstatic+'images/editor/bold.gif" alt="Bold" /></div></td>'
     +' <td><div class="imagebutton" id="vB_Editor_001_cmd_italic"><img src="'+gvar.domainstatic+'images/editor/italic.gif" alt="Italic" /></div></td>'
     +' <td><div class="imagebutton" id="vB_Editor_001_cmd_underline"><img src="'+gvar.domainstatic+'images/editor/underline.gif" alt="Underline" /></div></td>'
     +konst.__sep__
    :'')


    +(gvar.settings.hidecontroll[1] != '1' ? ''
     +'<td><div class="imagebutton" id="vB_Editor_001_cmd_justifyleft"><img src="'+gvar.domainstatic+'images/editor/justifyleft.gif" alt="Align Left" /></div></td>'
     +'<td><div class="imagebutton" id="vB_Editor_001_cmd_justifycenter"><img src="'+gvar.domainstatic+'images/editor/justifycenter.gif" alt="Align Center" /></div></td>'
     +'<td><div class="imagebutton" id="vB_Editor_001_cmd_justifyright"><img src="'+gvar.domainstatic+'images/editor/justifyright.gif" alt="Align Right" /></div></td>'
     +konst.__sep__
    :'')
    
    // --Font 
    +(gvar.settings.hidecontroll[2] != '1' ? ''
     +'<td><div class="imagebutton_color" id="vB_Editor_001_popup_fontname">'
     +konst._tbo
     +'<tbody><tr>'
     +'<td id="vB_Editor_001_font_parentout" class="popup_feedback">'
     +'<div id="vB_Editor_001_font_out" style="width:91px;" title="'+lF[0]+'">'+lF[1]+'</div>'    
     +'</td>'
     +'<td id="pick_font" class="popup_pickbutton">'+konst.mnupop+'</td>'
     +'</tr></tbody>'
     +konst.tbo_
     +'</div></td>'
     +konst.__sep__
    :'')
    
    // --Size 
    +(gvar.settings.hidecontroll[3] != '1' ? ''
     +'<td><div class="imagebutton_color" id="vB_Editor_001_popup_fontsize">'
     +konst._tbo
     +'<tbody><tr>'
     +'<td id="vB_Editor_001_size_parentout" class="popup_feedback">'
     +'<div id="vB_Editor_001_size_out" style="width:25px;" title="'+lS+'">'+lS+'</div>'    
     +'</td>'
     +'<td id="pick_size" class="popup_pickbutton">'+konst.mnupop+'</td>'
     +'</tr></tbody>'
     +konst.tbo_
     +'</div></td>'
     +konst.__sep__
    :'')
    
    // --Color 
    +(gvar.settings.hidecontroll[4] != '1' ? ''
     +'<td><div class="imagebutton_color" id="vB_Editor_001_popup_forecolor">'
     +konst._tbo
     +'<tr>'
     +'<td id="vB_Editor_001_color_out" style="background-color:transparent;" class="popup_feedback"><img src="'+gvar.domainstatic+'images/editor/color.gif" width="21" height="16" alt="" /><br /><img src="clear.gif" id="vB_Editor_001_color_bar" title="'+lC[0]+'" style="background-color:'+lC[1]+'" width="21" height="4" /></td>'
     +'<td id="pick_kolor" class="popup_pickbutton">'+konst.mnupop+'</td>'
     +'</tr>'
     +konst.tbo_
     +'</div></td>'
     +konst.__sep__
    :'')    
    
    +(gvar.settings.hidecontroll[5] != '1' ? ' <td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_createlink"><img src="'+gvar.domainstatic+'images/editor/createlink.gif" alt="Insert Link" /></div></td>'
    :'')
    +(gvar.settings.hidecontroll[6] != '1' ?' <td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_insertimage"><img src="'+gvar.domainstatic+'images/editor/insertimage.gif" alt="Insert Image" /></div></td>'
    :'')
    +(gvar.settings.hidecontroll[7] != '1' ?' <td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_insertyoutube"></div></td>'
    :'')
    +(gvar.settings.hidecontroll[5] == '1' && gvar.settings.hidecontroll[6] == '1' && gvar.settings.hidecontroll[7] == '1' ? '':konst.__sep__)
    
    +(gvar.settings.hidecontroll[8] != '1' ? ''
     +' <td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_insertsmile"><img id="vB_Editor_001_cmd_insertsmile_img" src="'+gvar.B.smile_gif+'" alt="Insert Smile" /></div></td>'
     +konst.__sep__
    :'')    
    
    +(gvar.settings.hidecontroll[9] != '1' ? ' <td><div class="imagebutton" id="vB_Editor_001_cmd_wrap0_quote"><img src="'+gvar.domainstatic+'images/editor/quote.gif" alt="[quote]" title="Wrap [QUOTE] tags around selected text" /></div></td>'
    :'')
    +(gvar.settings.hidecontroll[10] != '1' ? ' <td><div class="imagebutton" id="vB_Editor_001_cmd_wrap0_code"><img src="'+gvar.domainstatic+'images/editor/code.gif" alt="[code]" title="Wrap [CODE] tags around selected text" /></div></td>'
    :'')
    +(gvar.settings.hidecontroll[10] == '1' && gvar.settings.hidecontroll[9] == '1' ? '':konst.__sep__)
    
    
    +                '<td id="customed_control"></td>'
    +(   gvar.settings.hidecontroll[11] == '1' && gvar.settings.hidecontroll[13] == '1' 
      && gvar.settings.hidecontroll[12] == '1' ? '' : '')
    +                '<td width="100%"></td>'
    +            '</tr>'
    +konst.tbo_
    +        '</div>' // end #vB_Editor_001_controls
    
    +        '<table cellpadding="0" cellspacing="0" border="0" width="100%">'
    +        '<tr valign="top">'
    +            '<td class="controlbar">'    
    +'<div id="dv_accessible" style="display:none;">'+gvar.qr_diakses
    +'<img src="'+gvar.domainstatic+'images/buttons/quickreply.gif" alt="Quick Reply" border="0" title="Quick Reply Now" class="icon-accessible" />'
    +(!gvar.isOpera && gvar.settings.hotkeychar && gvar.settings.hotkeykey.toString()!='0,0,0' ? ''
      +'<br />QR-Hotkey: <b>'
      +(gvar.settings.hotkeykey[0]=='1'?'Ctrl+':'')+(gvar.settings.hotkeykey[1]=='1'?'Shift+':'')+(gvar.settings.hotkeykey[2]=='1'?'Alt+':'')
      +''+gvar.settings.hotkeychar+'</b>'
    :'')
    +'</div>'
    +             '<textarea name="message" id="vB_Editor_001_textarea" class="textarea" rows="10" tabindex="1" dir="ltr" disabled="disabled"></textarea>'
    +'            </td>'
    +'        </tr>'
    +'        </table>'
    
    +'<div id="smile_cont" style="display:none;"></div>'
    
    // setting toggle link
    +'<div class="qrsmallfont" style="float:right;margin:0 0 -6px 0;"><a href="javascript:;" style="text-decoration:none;" id="settings_btn"><u style="font-size:8pt;">settings</u><small id="updown_setting">'+HtmlUnicodeDecode('&#9660;')+'</small></a></div>'


    +'    </td>'
    +'</tr>'
    +'</table>'
    +'';
    return vbe;
}
function getTPL_Settings(){
  var _tbo = ''
   +'<div style="float:right;min-width:350px;border:2px outset;border-top:0;">'
   +'<table id="tb_setting" cellpadding="0" cellspacing="0" border="0">';
  var tbo_ = '</table></div>';
  var spacer = '<div class="spacer">&nbsp;</div>';
  
  // ####
  gvar.settings.autolayout = [1, 1]; // layout signature; layout template; 
  var sett = ''
   +_tbo
   +'<tr><td colspan="2" align="center">'
   +'<div class="g_notice" style="display:block;padding:0;height:20px;">'
   +'<div style="float:left;margin-left:20px;"><strong>Quick Reply Settings</strong></div>'
   +'<div style="float:right;margin-right:10px;"><a id="save_settings" href="javascript:;" class="qbutton">save</a>&nbsp;&nbsp;<a id="cancel_settings" href="javascript:;">cancel</a></div>'
   +'</div></td></tr> <tr>'
   +'<td id="td_setting_control" width="150">';
   for(var i in gvar.labelControl){
    if( isString(gvar.labelControl[i]) )
     sett+= '<input id="qrset_'+gvar.labelControl[i]+'" type="checkbox" '+(gvar.settings.hidecontroll[i]=='1' ? 'checked':'')+'/> Hide ' + gvar.labelControl[i]+'<br />';
   }
   sett+=''
   +'</td><td id="td_setting_misc">'
   +(!gvar.noCrossDomain ? '<label for="misc_updates" title="Check Userscripts.org for QR latest update"><input id="misc_updates" type="checkbox" '+(gvar.settings.updates=='1' ? 'checked':'')+'/> Updates</label>&nbsp;&nbsp;<small><a id="chk_upd_now" class="qbutton" href="javascript:;" title="Check Update Now">check now</a></small><br />':'')
   +(!gvar.noCrossDomain ? '<small style="margin-left:10px;" title="Interval check update, 0 &lt; interval &lt;= 99">Interval:&nbsp;<input id="misc_updates_interval" type="text" value="'+gvar.settings.updates_interval+'" maxlength="5" style="width:40px; padding:0pt; margin-top:2px;"/>&nbsp;days</small><br />':'')
   
   
   +'<input id="misc_hideavatar" type="checkbox" '+(gvar.settings.hideavatar=='1' ? 'checked':'')+'/> Hide Avatar<br />'
   +'<input id="misc_dynamic" type="checkbox" '+(gvar.settings.dynamic=='1' ? 'checked':'')+'/> Dynamic QR'
   +spacer
   +'<input id="misc_autoexpand_0" type="checkbox" '+(gvar.settings.textareaExpander[0]=='1' ? 'checked':'')+'/> AutoExpand<br />'
   +'<small style="margin-left:10px;">'
   +'min:<input id="misc_autoexpand_1" type="text" title="MINIMUM Height &gt= 75" value="'+(gvar.settings.textareaExpander[1])+'" style="width:35px;padding:0" maxlength="4"/>'
   +'&nbsp;max:<input id="misc_autoexpand_2" type="text" title="MAXIMUM Height &lt;= 2048" value="'+(gvar.settings.textareaExpander[2])+'" style="width:35px;padding:0" maxlength="4"/>'
   +'</small>'
   +spacer
   +'<input id="misc_autoshow_smile" type="checkbox" '+(gvar.settings.autoload_smiley[0]=='1' ? 'checked':'')+'/> AutoLoad Smiley<br />'
   +'<small>'
   +'<input name="cb_autosmiley" id="misc_autoshow_smile_kecil" type="radio" value="kecil" '+(gvar.settings.autoload_smiley[1]=='kecil' ? 'CHECKED':'')+'/>kecil&nbsp;'
   +'<input name="cb_autosmiley" id="misc_autoshow_smile_besar" type="radio" value="besar" '+(gvar.settings.autoload_smiley[1]=='besar' ? 'CHECKED':'')+'/>besar&nbsp;'
   +'<input name="cb_autosmiley" id="misc_autoshow_smile_custom" type="radio" value="custom" '+(gvar.settings.autoload_smiley[1]=='custom' ? 'CHECKED':'')+'/>[+]'
   +'</small>'
   +spacer
   +'<input id="misc_autolayout_sigi" type="checkbox" '+(gvar.settings.userLayout.config[0]=='1' ? 'checked':'')+'/> AutoSignature&nbsp;'
   +'<small><a id="edit_sigi" class="qbutton" href="javascript:;">edit</a>&nbsp;&nbsp;<a id="edit_sigi_cancel" href="javascript:;" class="cancel_layout cancel_layout-invi">X</a></small><br />'
   +'<div id="edit_sigi_Editor" style="display:none;"></div>'
   +spacer
   +'<input id="misc_autolayout_tpl" type="checkbox" '+(gvar.settings.userLayout.config[1]=='1' ? 'checked':'')+'/> AutoLayout&nbsp;'
   +'<small><a id="edit_tpl" class="qbutton" href="javascript:;">edit</a>&nbsp;&nbsp;<a id="edit_tpl_cancel" href="javascript:;" class="cancel_layout cancel_layout-invi">X</a></small><br />'
   +'<div id="edit_tpl_Editor" style="display:none;"></div>'
   +spacer
   
   + (!gvar.isOpera ? ''
   +'<input id="misc_hotkey" type="checkbox" disabled="disabled" '+(gvar.settings.hotkeykey.toString()=='0,0,0' || gvar.settings.hotkeychar=='' ? '':'checked')+'/> QR-Hotkey<br />'
   +'<small>'
   +'&nbsp;<input id="misc_hotkey_ctrl" type="checkbox" '+(gvar.settings.hotkeykey[0]=='1' ? 'checked':'')+'/>ctrl&nbsp;'
   +'<input id="misc_hotkey_alt" type="checkbox" '+(gvar.settings.hotkeykey[2]=='1' ? 'checked':'')+'/>alt&nbsp;'
   +'<input id="misc_hotkey_shift" type="checkbox" '+(gvar.settings.hotkeykey[1]=='1' ? 'checked':'')+'/>shift&nbsp;'
   +'<br/>&nbsp;'
   +'&nbsp;<input id="misc_hotkey_char" type="text" title="alphnumeric [A-Z0-9]" value="'+(gvar.settings.hotkeychar)+'" style="width:20px;padding:0" maxlength="1" />&nbsp;blank=disable'
   +'<br/></small>'
    : '')
   +'<div style="height:5px;">&nbsp;</div>'
    
   +'<a id="reset_default" href="javascript:;"><small>reset default</small></a>'
   
   +'</td></tr>'
   +tbo_
   ;
   return sett;
    
}


function getTPL_layer_Only(){
  return ('\
   <div class="trfade"></div> \
   <div class="fade"></div>\
  ');
}

function getTPL_prompt_reCAPTCHA(){

  var get_botgreet = function(min, max){
    var c = [
	  'Are you a robot? :o'
	 ,'It is really a fact this captcha is annoying. :nohope:'
	 ,'We hate spammer just as much as you do, :)'	 
	 ,'Get pain in the <s>arse</s>? Then you might be 50% legitimate human for feel the pain. :D'
	 ,'About 200 million CAPTCHAs are solved by humans around the world every day.'
	 ,'Fight Spam and Save Shakespeare.'
	];
	if( max>=(c.length-1) ) max = parseInt(c.length-1);
	
	var lastgreet = cK.g('last_greet');
	if(!lastgreet || isNaN(lastgreet)){
	  lastgreet = Math.floor(Math.random() * (max - min + 1) + min);
	}else{
	  var dice, done = false;
	  while(!done){
	    dice = Math.floor(Math.random() * (max - min + 1) + min);
		done=(dice != lastgreet);
	  }
	  lastgreet = dice;
	}
	// avoid repetitive greet, store last index greet .
	cK.s('last_greet', String(lastgreet), '/', 'www.kaskus.us');
	return c[lastgreet];
  };
  var divInner = ''
 +'<div id="popup_container_precap" class="popup_block"> '
 + '<div class="popup">'
 +  '<a tabindex="213" href="javascript:;"><img id="imghideshow_precap" title="Close" class="cntrl" src="'+gvar.B.closepreview_png+'"/></a>'
 +  '<table class="tborder" align="center" border="0" cellpadding="6" cellspacing="1" width="100%">'
 +  '<tbody><tr>'
 +   '<td class="tcat"><a id="nfolink" href="javascript:;" onclick="pop_reCAPTCHA=window.open (\'http:\/\/recaptcha.net\/popuphelp\/\',\'mywindow\',\'status=1,toolbar=0,menubar=0,width=450,height=480\'); var Lw=Math.round((document.documentElement.clientWidth/2)-(400/2)); pop_reCAPTCHA.moveTo(Lw,100)" title="What is this?">reCAPTCHA</a></td>'
 +  '</tr><tr>'
 +  '<td class="alt1">'
 +   '<div id="recaptcha_container_header">'
 +   '<span class="qrsmallfont"><span style="cursor:help;float:left; width:70%;border-right:1px solid #A3A3A3;">'+get_botgreet(0, 10)+'</span>'
 +   '<span style="float:right;padding:auto 0;">'
 +  '<a href="http://'+'kask.us/5957067" target="_blank" title="Info, Tips, Suggestion, Digitalize">RTFM</a>&nbsp;&#8212;'
 +  '<a href="http://'+'kask.us/5954390" target="_blank" title="Nice Info, Tips-Trick">TRICK</a>'
 +  '</span>'

 +   '</div>'
 +   '<div class="spacer"></div>'
 +   '<div id="recaptcha_container" style="text-align:center;">'
 +    '<div><img src="'+gvar.domainstatic+'images/misc/11x11progress.gif" border="0"/>&nbsp;<small>loading...</small></div>'

 +   '</div>'
 +  '</td></tr>'
 +  '<tbody></table>'
 +   '<div id="button_preview" style="display:none;">'
 +    '<span id="remote_capcay"></span>'
 +    '<input tabindex="211" id="recaptcha_submit" type="button" class="button" value=" Post " />&nbsp;&nbsp;'
 +    '<a tabindex="212" id="recaptcha_cancel" href="javascript:;" class="qrsmallfont"><b>Cancel</b></a>'


 +   '</div>'
 + '</div>'
 +'</div>';

  return divInner;
}
function getTPL_Preview(){
  var divInner = ''
 +'<div class="trfade"></div> '
 +'<div class="fade"></div> '
 +'<div id="popup_container" class="popup_block"> '
 + '<div class="popup">'
 +  '<a tabindex="109" href="javascript:;"><img id="imghideshow" title="Close" class="cntrl" src="'+gvar.B.closepreview_png+'"/></a>'
 +  '<table class="tborder" align="center" border="0" cellpadding="6" cellspacing="1" width="100%">'
 +  '<tbody><tr>'
 +   '<td class="tcat">Preview Quick Reply</td>'
 +  '</tr><tr>'
 +  '<td class="alt1">'
 +   '<div id="preview_content"><div id="preview_loading"><img src="'+gvar.domainstatic+'images/misc/11x11progress.gif" border="0"/>&nbsp;<small>loading...</small></div></div>'
 +  '</td></tr>'
 +  '<tbody></table>'
 +   '<div id="button_preview" >'
 +    '<input tabindex="102" id="preview_presubmit" type="button" class="button" value=" '+(gvar.user.isDonatur ? '':'pre-')+'Post " />&nbsp;&nbsp;'
 +    '<a tabindex="103" id="preview_cancel" href="javascript:;" class="qrsmallfont"><b>Cancel</b></a>'


 +   '</div>'
 + '</div>'
 +'</div>';

  return divInner;  
}
// end tpl



function getSmileySet(custom){

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
  var buff = getValue('KEY_SAVE_CUSTOM_SMILEY');
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
,'31': [H+s+'fuck-4.gif', ':fuck:', 'fuck']

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
,'44': [H+s+'shit-3.gif', ':tai:', 'Tai']
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
,'501': [H+'ngakak.gif', ':ngakak', 'Ngakak']
,'502': [H+'najis.gif', ':najis', 'Najis']
,'503': [H+'s_sm_maho.gif', ':maho', 'Maho']
,'504': [H+'hoax.gif', ':hoax', 'Hoax']
,'505': [H+'marah.gif', ':marah', 'Marah']
,'506': [H+'nosara.gif', ':nosara', 'No Sara Please']
,'507': [H+'berduka.gif', ':berduka', 'Turut Berduka']
,'508': [H+'sorry.gif', ':sorry', 'Sorry']
,'509': [H+'sundul.gif', ':sup2:', 'Sundul']
,'510': [H+'capede.gif', ':cd', 'Cape d...']
,'511': [H+'s_sm_repost1.gif', ':repost', 'Blue Repost']
,'512': [H+'hammer.gif', ':hammer', 'Hammer2']
,'513': [H+'s_big_batamerah.gif', ':batabig', 'Blue Guy Bata (L)']
,'514': [H+'s_big_cendol.gif', ':cendolbig', 'Blue Guy Cendol (L)']
,'515': [H+'toastcendol.gif', ':toast', 'Toast']

,'516': [H+'recseller.gif', ':recsel', 'Recommended Seller']
,'517': [H+'jempol2.gif', ':2thumbup', '2 Jempol']
,'518': [H+'jempol1.gif', ':thumbup', 'Jempol']
,'519': [H+'shakehand2.gif', ':shakehand2', 'Shakehand2']
,'520': [H+'ngacir2.gif', ':ngacir2', 'Ngacir2']
,'521': [H+'matabelo1.gif', ':matabelo', 'Matabelo']
,'522': [H+'takut.gif', ':takut', 'Takut']
,'523': [H+'mewek.gif', ':mewek', 'Mewek']
,'524': [H+'selamat.gif', ':selamat', 'Selamat']
,'525': [H+'dp.gif', ':dp', 'DP']
,'526': [H+'cekpm.gif', ':cekpm', 'Cek PM']
,'527': [H+'request.gif', ':request', 'Request']
,'528': [H+'babyboy.gif', ':babyboy', 'Baby Boy']
,'529': [H+'babyboy1.gif', ':babyboy1', 'Baby Boy 1']
,'530': [H+'babygirl.gif', ':babygirl', 'Baby Girl']
,'531': [H+'kaskus_radio.gif', ':kr', 'Kaskus Radio']
,'532': [H+'traveller.gif', ':travel', 'Traveller']
,'533': [H+'nohope.gif', ':nohope', 'No Hope']
/* new-emote Dec-2010 */
,'534': [H+'kimpoi.gif', ':kimpoi', 'Kimpoi']
,'535': [H+'ngacir3.gif', ':ngacir', 'Ngacir']
,'536': [H+'salah_kamar.gif', ':salahkamar', 'Salah Kamar']
,'537': [H+'ultah.gif', ':ultah', 'Ultah']
,'538': [H+'rate5.gif', ':rate5', 'Rate 5 Star']

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

};
// end getSmileySet


function getSetOf(type){
  if(isUndefined(type)) return false;
  switch(type){
    case "color":
     return {
     "#000000": "Black",
     "#A0522D": "Sienna",
     "#556B2F": "DarkOliveGreen",
     "#006400": "DarkGreen",
     "#483D8B": "DarkSlateBlue",
     "#000080": "Navy",
     "#4B0082": "Indigo",
     "#2F4F4F": "DarkSlateGray",
     "#8B0000": "DarkRed",
     "#FF8C00": "DarkOrange",
     "#808000": "Olive",
     "#008000": "Green",
     "#008080": "Teal",
     "#0000FF": "Blue",
     "#708090": "SlateGray",
     "#696969": "DimGray",
     "#FF0000": "Red",
     "#F4A460": "SandyBrown",
     "#9ACD32": "YellowGreen",
     "#2E8B57": "SeaGreen",
     "#48D1CC": "MediumTurquoise",
     "#4169E1": "RoyalBlue",
     "#800080": "Purple",
     "#808080": "Gray",
     "#FF00FF": "Magenta",
     "#FFA500": "Orange",
     "#FFFF00": "Yellow",
     "#00FF00": "Lime",
     "#00FFFF": "Cyan",
     "#00BFFF": "DeepSkyBlue",
     "#9932CC": "DarkOrchid",
     "#C0C0C0": "Silver",
     "#FFC0CB": "Pink",
     "#F5DEB3": "Wheat",
     "#FFFACD": "LemonChiffon",
     "#98FB98": "PaleGreen",
     "#AFEEEE": "PaleTurquoise",
     "#ADD8E6": "LightBlue",
     "#DDA0DD": "Plum",
     "#FFFFFF": "White"
     };
    break;
    case "font":
     return ["Arial","Arial Black","Arial Narrow","Book Antiqua","Century Gothic","Comic Sans MS","Courier New","Fixedsys","Franklin Gothic Medium","Garamond","Georgia","Impact","Lucida Console","Lucida Sans Unicode","Microsoft Sans Serif","Palatino Linotype","System","Tahoma","Times New Roman","Trebuchet MS","Verdana"];
    break;
    case "size":
     return ["1","2","3","4","5","6","7"];

    break;
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
      ,spoiler_png : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABnRSTlMA4QDhAOKdNtA9AAAACXBIWXMAAAsTAAALEwEAmpwYAAABg"
        +"0lEQVR42tVUPUsDQRB9M7dBQi4iypWJhgQsU1lIUtklIgg2tmJhK3b+gLT+AtHaP2AqtUmwslGMTSJcUgaSKEc+bu/DYmGJMR+glVs8HrO8fTOzs0u23cRvF+MP"
        +"609iodn1Y70SbC8UhL3O1a6vOOmaj6tWds32Xc9gigpDMEUYBvNyVESYIwZiERHaK6+1h8+P2unJ4WTaw6Hs9+WgL0cD6Q6lO/S8kRe4PqRP0mcvMNd7uf0tAC9"
        +"v79/SBpDaWIUfEkMwM0AEMC0JJqKAMDBYMrHB3U53smYA7tMNMRNzIASBiJmIXabFDQNwfnRWbTm5hFlutAtpS3GNABR5vitNEVdbTj5pAgAsAID5A1FpwpVyyj"
        +"3nEmal6YQhFN7W2xorTUcFZw5JudHOJ00iACBCMWMBKGYsFdFb08WFtKWPV24AdGSec7Z+r7pChHF/xVUvZjp77iiXMLXnuL/OYl7NynkWahKPxyZnG0Dp4tJx+"
        +"vMfRjwe28ykDvZ2JsX/5zP4AtVMzoKTk38hAAAAAElFTkSuQmCC"
      ,transp_gif : ""
        +"data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKbK8EAgAGAgAIAgAKAgAMAgAOAgAABAACBAAEBAAGBAAIBAA"
        +"KBAAMBAAOBAAABgACBgAEBgAGBgAIBgAKBgAMBgAOBgAACAACCAAECAAGCAAICAAKCAAMCAAOCAAACgACCgAECgAGCgAICgAKCgAMCgAOCgAADAACDAAEDAAGDA"
        +"AIDAAKDAAMDAAODAAADgACDgAEDgAGDgAIDgAKDgAMDgAODgAAAAQCAAQEAAQGAAQIAAQKAAQMAAQOAAQAAgQCAgQEAgQGAgQIAgQKAgQMAgQOAgQABAQCBAQEB"
        +"AQGBAQIBAQKBAQMBAQOBAQABgQCBgQEBgQGBgQIBgQKBgQMBgQOBgQACAQCCAQECAQGCAQICAQKCAQMCAQOCAQACgQCCgQECgQGCgQICgQKCgQMCgQOCgQADAQC"
        +"DAQEDAQGDAQIDAQKDAQMDAQODAQADgQCDgQEDgQGDgQIDgQKDgQMDgQODgQAAAgCAAgEAAgGAAgIAAgKAAgMAAgOAAgAAggCAggEAggGAggIAggKAggMAggOAgg"
        +"ABAgCBAgEBAgGBAgIBAgKBAgMBAgOBAgABggCBggEBggGBggIBggKBggMBggOBggACAgCCAgECAgGCAgICAgKCAgMCAgOCAgACggCCggECggGCggICggKCggMCg"
        +"gOCggADAgCDAgEDAgGDAgIDAgKDAgMDAgODAgADggCDggEDggGDggIDggKDggMDggODggAAAwCAAwEAAwGAAwIAAwKAAwMAAwOAAwAAgwCAgwEAgwGAgwIAgwKA"
        +"gwMAgwOAgwABAwCBAwEBAwGBAwIBAwKBAwMBAwOBAwABgwCBgwEBgwGBgwIBgwKBgwMBgwOBgwACAwCCAwECAwGCAwICAwKCAwMCAwOCAwACgwCCgwECgwGCgwI"
        +"CgwKCgwMCgwOCgwADAwCDAwEDAwGDAwIDAwKDAwP/78KCgpICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAEAAP8ALAAAAAAUABQABwhMAP8JHEiwoMGDCBMqR"
        +"Eiq4b+GpB5GhGgw4kKLBDEm1FjQ4cSHGxeC7Djw48eRIkVaNHmSI8qQCj2+JHmxosqKHnNKdJmyp8+fQAUGBAA7"
      ,noparse_gif : ""
        +"data:image/gif;base64,R0lGODlhFAAUAPcBAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUF"
        +"BUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMz"
        +"MzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJ"
        +"SUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3Bwc"
        +"HFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+P"
        +"j5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6"
        +"urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM"
        +"3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6"
        +"+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAHoAwEALAAAAAAUABQAAAhNAAMIHEiwoMGDCBMq"
        +"XMiwoUIAEBlCBCAwYkOLFiVSDBBxYsaJFTdipNiRpMmQKEtyPLky5UmVLVuqhFnSpE2UMTWG3Pgwo8OfQIMCDQgAOw=="
      ,youtube_gif : ""
        +"data:image/gif;base64,R0lGODlhFAAUAPcAAAQCBLySRGSKzKTG5PTmrHxKDPzOzPzy7PyytERmrNz6/OweBPyanPxWTPza3Oyq/Pz+/NSubJza7JxyFPzS1"
        +"Py6vNz+/PwiFKBsyBQM6XeLEgMBADioAOboABISAAAAABZqYND/AEUjAHUCAAAANwAAFh8A7QAA/wBF/wAA/wAA/wAA/6goHxStiHciNgMAdVAAybYAiHMfNgMA"
        +"dQDgpACv6wAiEgAAAACwAQDoAAASAAAAAABFAAAAAAAAAAAAAAAoAACtAAAiAAAAAAAA5AAA5wAAEgAAAAASAgAAAB8AAAAAAFAc/Lbo6XMSEgMAAABF4wAAYgA"
        +"AOwAAdXwAiOYAihIfwQAAFggo/gCt/28i/wAA/wccjQDoiAASNgAAdeouMcdndkVpNnVmdZMARYE0OuPrXGN2AOAhcwKtZVFFcgB1czgAU7YB33MARQMAdQEAbw"
        +"AAjwAA4wAAY0iMALbnAHMSAAMAAHQnAOY7ABLrAAB2AK8saB87gOvrInZ2AFATALYsgHMcIgNzADEAVB8A6OsAEnYAAAAAEQABAQAAAAAAAEghsLat6HNFEgN1"
        +"AIBkmufnkxISTAAAdbwRt8IBuEUAtHUAFgBv/gCA/x/j/wBj/wC0UwDn3wASRQAAdVCRSbas2HNFRQN1dQAAaAAAgAAAIgAAAAAAPgEA0gAARgAAdcvYL8K1j0X"
        +"n43V2Y8xfAOcsABIcAABzAFB5ALbpAHMSAAMAAAwMAJ6hADtPAHUAAAFkSAAA6QAAEgAAAAIAAX8AAAAAAAAAAGeUkGnn6DUSEjEAAFwMEXShAXJPAGkAAGtgYG"
        +"/7+20SEnMAAGVNmmzXk1/nTHZ2dTJHp1zBtXPlt3QFFmH+/nT//2n//2P//1zYPmm10m3nRmF2dWdbiGV/gXNIQlx1AADcaPPogBISIgAAACBrAAB/AABIAAB1A"
        +"ACNeQCt6QBFEgB1ANABMfYArYsARQEAdQ4xMwEAjwAw4wAAY0XJMTqIrQA2RQF1dQUuagBncQBpSABmACH5BAEAABIALAAAAAAUABQABwipACUIHEiwoMGDCA1"
        +"CiFAAQoIBECJKnEgwIoAHACZqjFhxIQCIAQAIgJAxI8eBEQkAUKCSpIKSEjuqtNASgIUJL2OihKBSAYSQIyMASKBT4MajRSU4uMC0qVOnDghekOgUwlOmUqc+tX"
        +"o1K4QGVr9GrHChwgEDF7yCnboWAoOIFNIOZCqWbdi3TQkuYFshYgMDEBBceItW6oLDiBMrJgjgquMLABJKnkw5IAA7"
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
function getSCRIPT() {
  return (''
    +'function showRecaptcha(element){'
    +  'Recaptcha.create("6Lf8xr4SAAAAAJXAapvPgaisNRSGS5uDJzs73BqU",element,'
    +    '{theme:"red",lang:"en"'
    +     ',custom_translations:{refresh_btn:"reload reCAPCAY..",instructions_visual:"Masukkan reCapcay:"}'
    +    '}'
    +  ');'
    +'};'
    
    +'function clickedelm(val){ document.getElementById("clicker").value=val; };'
    +'function vB_Text_Editor(editorid,mode,parsetype,parsesmilies,initial_text,ajax_extra){'
    + 'this.open_smilie_window=function(width,height){'
    +  'smilie_window=openWindow("misc.php?do=getsmilies&editorid=vB_Editor_001",width,height,"smilie_window");'
    + '};'
    +'};'
    +''
  );
  
}
// Global CSS


function getCSS_fixup() {
/* | ------------------------------------------------ | */
/* |          (Lite) Kaskus Fix-ups by chaox          | */
/* | ------------------------------------------------ | */
  var lite_fixup = ''  
  +'div.page > div { padding-left: 20px !important; padding-right: 20px !important; }' // main snippet for wide-thread  
  +'#Textatas, #Middlehome021, #exp, #MiddleBanner, #Middle_blue, #MiddleBanner03, #MidGaris,'
  +'#advertisement, #MidGaris03, #RightNya, #MiddleBanner1, #JB_Middlehome021, #JB_Middlenahome1, #MidGaris1'
  +'#TextInfo > div > div.TextInterest'
   +'{ display: none !important; }'
  +'table[id^="post"] td.alt2 { max-width: 175px !important; min-width: 175px !important; overflow: hidden !important; }'
  +'td.alt2 div.smallfont+div.smallfont div { overflow: hidden !important; }' 
  +'form > table.tborder > tbody > tr > td.panelsurround > div.panel > div { width: auto !important; margin: auto !important; }'
  +'td[id^="td_post"] { width: auto !important; }'   
  +'#Middlenahome, #InfoFoLeft, #InfoFoMid, #InfoFoRight, #Middlenahome1, .MenuBawahna, .LingBottom, #LingBawah, #navbawah ul li'
   +'{ width: auto !important; }'
  +'#Middlenahome { height: 210px !important; }'  
  +'#dfFooter { padding-left: 0px !important; }' 
  +'div#LingBawah > table { width: 100% !important; }'
  +'' 
  ;
  return lite_fixup;
}
function getCSS() {  
  // CSS for Quick Reply
  var css = ''
  +'.qr_container'
   +'{max-width:100%;width:auto !important;margin:5px;text-align:left;}'
  +'.normal_notice'
   +'{background:transparent !important;color:#949494;}'
  +'.alt1'
   +'{border-bottom:1px solid transparent;}'
  +'.quoteselected'
   +'{background:#DFC;border-bottom:1px solid #CDA;}'
  +'.g_notice'
   +'{display:none;padding:.4em;margin-bottom:3px;font-size:11px;background:#DFC;border:1px solid #CDA;line-height:16px;}'
  +'.g_notice-error'
   +'{background:#FFD7FF !important;}'
  +'.avafetch'
   +'{display:block;margin:0 5px 0 0;padding:0.3px 5px;font-size:9px;line-height:12px;}'
  +'#vbform .tborder'
   +'{width:100%;}'
  +'#atoggle'
   +'{float:right;}'
   
  +'.panelsurrounds .panel, .imagebutton'
   +'{background:#DFDFE0;}'
  +'.controlbar'
   +'{text-align:left;}'
  +'.popup_pickbutton'
   +'{border-color:#C1D2EE;width:10px;}'
  +'.ofont:hover, .ocolor:hover, .osize:hover, .cdefault:hover, .popup_pickbutton:hover'
   +'{cursor:default !important;}'
  +'.imagebutton:hover, .imagebutton_color:hover'
   +'{cursor:pointer;}'
  +'.imagebutton_color table'
   +'{border:1px solid #fff;background-color:#DFDFE0;}'
  +'.imagebutton_color:hover table, .ofont:hover, .osize:hover'
   +'{border:1px solid #2085C1;background-color:#B0DAF2;}'
  +'.imagebutton_color:hover .popup_feedback'
   +'{border-right:1px solid #316AC5;}'  
  +'#vB_Editor_001_font_out, #vB_Editor_001_size_out'
   +'{font-size:8pt;padding:2px;}'
   
  +'.MYvBulletin_editor table, #vbform .tborder'
   +'{min-width:100%;}'
  +'.MYvBulletin_editor table td'
   +'{vertical-align:top;}'
  +'#qravatar_cont, #capcay_container, .qrsmallfont, .qrsmallfont div, #capcay_header span'
   +'{font-size:11px;}'
  +'#capcay_container'
   +'{min-width:131px;width:305px;}'
  +'#qravatar_cont'
   +'{text-align:center;padding-right:5px;min-width:100px;max-width:120px;}'
  +'.txta_cont'
   +'{min-width:100%;width:100%;padding-right:5px;}'
  +'#'+gvar.id_textarea
   +'{min-width:100%;}'
  +'.textarea'
   +'{clear:both;width:100%;height:100px;}'
  +'#dv_accessible'
   +'{cursor:default;text-align:center;border:1px solid #949494;position:absolute;padding:10px 50px 10px 10px;background:#FDECC8;width:auto;margin:20px 10px;}'
  +'.icon-accessible'
   +'{cursor:pointer;position:absolute;margin:-3px 0 0 5px;}'
  +'.txa_enable, .txa_readonly'
   +'{border:1px solid #949494;}'
  +'.txa_enable'
   +'{background-color:#FFF;color:#000;}'
  +'.txa_readonly'
   +'{background-color:#E8E8E8;color:#4F4F4F;}'   
   
  +'.g_notice a, .qrsmallfont a, #capcay_header a'
   +'{font-size:11px;text-decoration:none;}'
  +'#home_link'
   +'{text-decoration:underline;}'
  +'.cleanlink'
   +'{text-decoration:none;}'
  +'.qravatar_refetch_hover_0'
   +'{margin-top:0;}'
  +'.qravatar_refetch_hover'
   +'{margin-top:-15px;}'
  +'#qravatar_refetch'
   +'{background:#DFC;border:1px solid #CDA;}'
  +'.warn'
   +'{color:#FF0000;font-size:9px;}'
  +'.idleinput, .activeField'
   +'{font-size:22px;border:1px solid #B1B1B1;text-align:center;padding:2px;}'
  +'.idleinput'
   +'{color:blue;background:#FEEB9E;}'
  +'.activeField'
   +'{background:#FFF;}'
  +'.input_title, .textarea'
   +'{border:1px solid #B1B1B1;}'
  +'.input_title:focus, .textarea:focus, .activeField:focus'
   +'{border:1px solid #275C7C;}'
  +'#capcay_header'
   +'{padding:0 2px;vertical-align:bottom;}'
  +'.fieldset'
   +'{margin:0;padding:0;}'
  +'#fieldset_capcay .bginput, #nfolink'
   +'{margin:0;padding:0;float:right;}'
  +'#fieldset_capcay .bginput'
   +'{margin:1px 2px 1px 0;}'
  +'.reado'
   +'{color:#808080;background:#E5E5E5;border:1px solid #8A8A8A;}'
  +'.sub-bottom'
   +'{min-width:200px;font-size:10px;color:#40404;}'
  +'.sayapkiri'
   +'{float:left;text-align:left;}'
  +'.sayapkanan'
   +'{float:right;text-align:right;}'
  +'.sayapkanan a'
   +'{text-decoration:none;float:right;margin-top:3px;}'
   
  +'.popup_feedback{background-color:#fff;border-right:1px solid #fff;}'
  +'.vbmenu_popup {position:absolute;padding:3px;}'
  +'.vbmenu_popup table td {line-height:10px;width:10px;border:1px solid transparent;}'
  +'.vbmenu_popup table td:hover {cursor:pointer;border:1px solid #2085C1;background-color:#B0DAF2;}'
  +'.ocolor {color:#000;background:#FFF;padding:2px;}'
  +'.customed_addcontroller {background:transparent;width:100%;white-space: nowrap;}'
  +'.ofont{text-align:left;}'
  +'.customed_addcontroller img, .imagebutton img, .ofont, .osize'
   +'{color:#000;border:1px solid transparent;background-color:transparent;}'
  +'.customed_addcontroller img:hover, .imagebutton img:hover '
   +'{color:#000;border:1px solid #2085C1;background-color:#B0DAF2;}'
  +'.spacer'
   +'{clear:both;height:2px;}'
  +'#skecil_container, #sbesar_container, #scustom_container'
   +'{border: 1px solid #BBC7CE;padding:2px;}'
  +'#scustom_container'
   +'{padding-top:10px !important;}'
  +'#skecil_container img, #sbesar_container img, #scustom_container img'
   +'{margin:0 1px;border:1px solid transparent;max-width:120px; max-height:120px;}'
  +'#skecil_container img:hover, #sbesar_container img:hover, #scustom_container img:hover, #nfo_version:hover'
   +'{cursor:pointer;border:1px solid #2085C1;background-color:#B0DAF2;}'
  +'#content_scustom_container .ofont'
   +'{text-decoration:none;cursor:pointer;}'
  +'#content_scustom_container .nothumb'
   +'{padding:1px 3px;}'
  +'#content_scustom_container .scustom-thumb'
   +'{margin-left:2px;}'
  +'.ul_tabsmile'
   +'{list-style:none;padding:0;height:1em;margin:'+(gvar.isOpera||gvar.isBuggedChrome?'5px 0 2px 2px':'2px 0 3px 2px')+';}'
  +'.ul_tabsmile li'
   +'{display:inline;margin-left:3px;}'
  +'li.tab_close'
   +'{float:right !important;}'
  +'.ul_tabsmile a'
   +'{border:1px solid #BBC7CE;background-color:#C4C4C4;padding:3px;text-decoration:none;border-bottom:0;font-size:8pt;}'
  +'.ul_tabsmile a:hover'
   +'{background-color:#B0DAF2;}'
  +'.ul_tabsmile a.current, .ul_tabsmile a.current:hover, .qbutton:hover'
   +'{background-color:#DDDDDD;}'
  +'.qbutton'
   +'{padding:1px 3px;border:1px solid #1E67C1;background-color:#C7C7C7;color:#000;text-decoration:none;border-radius:3px;-moz-border-radius:3px;-khtml-border-radius:3px;-webkit-border-radius:3px;}'
  +'#tb_setting td{padding:1px 5px;}'
  +'#tb_setting textarea{width:98%;font-family:"Courier New";font-size:9pt;}'
  +'.cancel_layout {float:right;margin:6px 3px 0 0;}'
  +'.cancel_layout-invi {display:none;}'
  /* for updates */
  +'.qrdialog{border-bottom:1px transparent;width:100%;left:0px;bottom:0px;padding:3px;}'
  +'.qrdialog-close{padding:5px;margin:5px 15px 0 0;cursor:pointer;float:right;}'
  +'.qrdialog-child'
   +'{background:#BFFFBF; border:1px solid #9F9F9F; height:30px;width:400px;margin-left:3px;padding:.2em .5em;font-size:8pt;border-radius:5px;-moz-border-radius:5px;-khtml-border-radius:5px;-webkit-border-radius:5px; box-shadow:3px 3px 15px #888;-moz-box-shadow:3px 3px 15px #888;-khtml-box-shadow:3px 3px 15px #888;-webkit-box-shadow:3px 3px 15px #888;}'
  
  /* for preview popup */ 
  	+'#hideshow, #hideshow_recaptcha {'
    +  'position: absolute; min-width: 100%; min-height: 100%; top: 0; left: 0;'

    +'}'
    +'.trfade, .fade {'
    +  'position: fixed; width: 100%; height: 100%; left: 0;'

    +'}'
    +'.trfade {'
    +  'background: #000; z-index: 99998;'
    +  'filter:alpha(opacity=25); opacity: .25;'
    +  '-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=25)";'


    +'}'
    +'.fade {'
    +  'background: #000; z-index: 99990;'
    +  'filter:alpha(opacity=60); opacity: .60;'
    +  '-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";'

    +'}'
    +'#popup_container, #popup_container_precap  {'
    +  'background: #ddd; color:black; padding: 5px; border: 5px solid #fff;'
    +  'float: left; position: absolute; top: 10px;'
    +  'border-radius:5px; -moz-border-radius:5px; -khtml-border-radius:5px; -webkit-border-radius:5px; z-index: 99999;'

    +'}'
    +'#popup_container {'
    +  'width: 88%; left: 5%;'

    +'}'
    +'#popup_container_precap  {'
    +  'width: 340px; left: 50%;'

    +'}'
    +'.popup_block .popup {'
    +  'float: left; width: 100%; background: #D1D4E0; margin: 0;'
    +  'padding: 0; border: 1px solid #bbb;'

    +'}'
    +'.popup img.cntrl {'
    +  'position: absolute; right: -20px; top: -20px; border: 0px;'

    +'}'
    +'#button_preview {'
    +  'padding:3px;text-align:center;'

    +'}'
    +'*html .fade {'
    +  'position: absolute;'
    +  'top:expression(eval(document.compatMode && document.compatMode==\'CSS1Compat\') ? documentElement.scrollTop : document.body.scrollTop);'

    +'}'
    +'*html #popup_container, *html #popup_container_precap {'
    +  'position: absolute;'
    +  'top:expression(eval(document.compatMode && document.compatMode==\'CSS1Compat\') ? documentElement.scrollTop'
    +  '+((documentElement.clientHeight-this.clientHeight)/2) : document.body.scrollTop'
    +  '+((document.body.clientHeight-this.clientHeight)/2));'
    +  'left:expression(eval(document.compatMode && document.compatMode==\'CSS1Compat\') ? documentElement.scrollLeft'
    +  '+(document.body.clientWidth /2 ) : document.body.scrollLeft + (document.body.offsetWidth/2));'

    +'}'
  +'';
  return css;
}


// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return x.replace(/^\s+|\s+$/g,""); };
function isLink(x) { return x.match(/((?:http(?:s|)|ftp):\/\/)(?:\w|\W)+(?:\.)(?:\w|\W)+/); }




function basename(path, suffix) {
  // Returns the filename component of the path  
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: basename('/www/site/home.htm', '.htm');    // *     returns 1: 'home'
  // *     example 2: basename('ecra.php?p=1');
  var b = path.replace(/^.*[\/\\]/g, '');
  if(typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix)
    b = b.substr(0, b.length-suffix.length);
  return b;
};
function toCharRef(text){
    var charRefs = [], codePoint, i;
    for(i = 0; i < text.length; ++i) {
        codePoint = text.charCodeAt(i);
        if(!text[i].match(/[\w\[\]\<\>\s\?\'\"\;\:\=\+\-\_\)\(\&\^\%\$\#\@\!\~\}\{\|\/\r\n]/)){
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
function do_an_e(A) {
  A.stopPropagation();
  A.preventDefault();
  return A;
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
function page_is_notloaded(t){
   var tg = getTag('title');
   return (tg && isDefined(tg[0]) && tg[0].innerHTML.indexOf(typeof(t)=='string' ? t : 'Page is temporary not available')!=-1);
}
function getTag(name, parent){
  var ret = (typeof(parent)!='object' ? document.getElementsByTagName(name) : parent.getElementsByTagName(name) );



  return (isDefined(ret[0]) ? ret : false);
}
function getByXPath_containing(xp, par, contain){
  if(!par) par = document;
  if(typeof(contain)!='string') return;
  var rets=[];
  var ev = document.evaluate(xp, par, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if(ev.snapshotLength)
     for(var i=0;i<ev.snapshotLength;i++)
       if(ev.snapshotItem(i).innerHTML.indexOf(contain)!=-1) 
          rets.push(ev.snapshotItem(i));
  return rets;  
}
function SimulateMouse(elem,event,preventDef) {
  if(typeof(elem)!='object') return;
  var evObj = document.createEvent('MouseEvents');
  preventDef=(isDefined(preventDef) && preventDef ? true : false);
  evObj.initEvent(event, preventDef, true);
  try{elem.dispatchEvent(evObj);}
   catch(e){
         //clog('Error. elem.dispatchEvent is not function.')
   }
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
function togelshow(obj, show){
  if(typeof(obj)!='object') return;
  if(isUndefined(show)) show = (obj.style.display!='none');
  if(isDefined(show))
    obj.setAttribute('style', 'display:'+(show?'block':'none')+';' );
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
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; show_alert('GreaseMonkey Api detected...',0); } // test GM_hitch
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
GM_addGlobalScript=function(script, id) { // Redefine GM_addGlobalScript with a better routine
  var sel=createEl('script',{type:'text/javascript'});
  if(isDefined(id) && isString(id)) sel.setAttribute('id', id);
  if(script.match(/^https?:\/\/.+/))
    sel.setAttribute('src', script);
  else
    sel.appendChild(createTextEl(script));    
  var hds = getTag('head');
  if(hds)
   window.setTimeout(function() { hds[0].appendChild(sel);}, 100);
  else
   document.body.insertBefore(sel, document.body.firstChild);
  return sel;
};
GM_addGlobalStyle=function(css, id) { // Redefine GM_addGlobalStyle with a better routine 
  var sel=createEl('style',{type:'text/css'});
  if(isDefined(id) && isString(id)) sel.setAttribute('id', id);
  sel.appendChild(createTextEl(css));    
  var hds = getTag('head');
  if(hds && hds.nodeName=='HEAD')
   window.setTimeout(function() { hds[0].appendChild(sel); }, 100);
  else
   document.body.insertBefore(sel,document.body.firstChild);    
  return sel;
};
Avatar = {
  uri:null,
  cached:null,
  result:null,
  user:null,
  init:function(user){
    Avatar.user = user;
    Avatar.uri='http:/'+'/www.kaskus.us/member.php?u='+Avatar.user.id;
  },
  request:function(callback){    
    GM_xmlhttpRequest( {
      method:'GET',
      url: Avatar.uri + (Avatar.cached ? '':'#' + Math.random().toString().replace('0.','')),
      onload: function(html) {
        var rets = html;
        Avatar.result = (callback!=null ? callback(rets,Avatar.user) : rets);          
      }
    } );
  }
};
vB_textarea = {
  init: function(id) {
    this.Obj = (isUndefined(id) ? Dom.g(gvar.id_textarea) : Dom.g(id));
    this.content = (this.Obj ? this.Obj.value : "");
    this.cursorPos = this.rearmPos(); // [start, end]
    this.last_scrollTop = this.Obj.scrollTop; // last scrolltop pos
  },
  rearmPos: function(){ return [this.getCaretPos(), this.Obj.selectionEnd]; },
  adjustGrow: function(){ autoGrow(this.Obj, [gvar.settings.textareaExpander[1],gvar.settings.textareaExpander[2]]); },
  clear: function (id){ 
    if(!this.Obj) this.Obj = (isUndefined(id) ? Dom.g(gvar.id_textarea) : Dom.g(id));
    this.set('');
    this.enabled();
    if(gvar.settings.textareaExpander[0]) this.adjustGrow();
    this.focus();
  },
  disabled: function(){ 
    this.Obj.setAttribute('disabled','disabled');
  },
  readonly: function(id){
         //clog('txta readonly');
    this.Obj = (isUndefined(id) ? Dom.g(gvar.id_textarea) : Dom.g(id));
    removeClass('txa_enable', this.Obj);
    addClass('txa_readonly', this.Obj);
    this.Obj.setAttribute('readonly',true);
    var cw=$D('#controller_wraper');
    if(cw){ // this is transparent layer to disable the controlers
      cw.style.width=(Dom.g(gvar.id_textarea).clientWidth)+'px';
      cw.style.display='';
    }
  },
  enabled: function(id){
         //clog('txta enabled');
    if(!this.Obj) this.Obj = (isUndefined(id) ? Dom.g(gvar.id_textarea) : Dom.g(id));
    this.Obj.removeAttribute('disabled');

    this.Obj.removeAttribute('readonly');

    if($D('#recaptcha_response_field')) $D('#recaptcha_response_field').removeAttribute('disabled');
    removeClass('txa_readonly', this.Obj);
    addClass('txa_enable', this.Obj);
    $D('#controller_wraper').style.display='none';
    $D('#dv_accessible').style.display='none';
  },
  focus: function(){
         //clog('txta focused');
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
   // fix chrome weird
   var lastpos=(this.cursorPos[0] + text.length);
   this.setCaretPos( lastpos, lastpos );
  },
  subStr: function(start, end){ return this.content.substring(start, end);},
  getSelectedText : function() {    
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
    var start=this.cursorPos[0];
    var end=this.cursorPos[1];
    tag = tag.toUpperCase();
    {
      var bufValue = this.subStr(0, start) + 
       '['+tag+(title?'='+title:'')+']' + 
        (start==end ? '' : this.subStr(start, end)) + 
       '[/'+tag+']' + this.subStr(end, this.content.length);
    }
    this.set(bufValue);
    var st2 = (start + ('['+tag+(title?'='+title:'')+']').length);
    this.setCaretPos( st2, st2+this.subStr(start, end).length );    
    this.Obj.scrollTop = (this.last_scrollTop+1);
    return bufValue; 
  },
  replaceSelected : function(text, ptpos){
    var start=this.cursorPos[0];
    var end=this.cursorPos[1];
    if(start==end) return;    
    var bufValue = this.subStr(0, start) + text + this.subStr(end, this.content.length);
    this.set(bufValue);
    this.setCaretPos( (start + ptpos[0]), (start+ptpos[1]) );
    this.Obj.scrollTop = (this.last_scrollTop+1);
  }  
};
// Get Elements
$D=function (q, root, single) {
  if (root && typeof root == 'string') {
      root = $D(root, null, true);
      if (!root) { return null; }
  }
  if( !q ) return false;
  if ( typeof q == 'object') return q;
  root = root || document;
  if (q[0]=='#') { return root.getElementById(q.substr(1)); }
  else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
      if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
      return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  }
  else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
  return root.getElementsByTagName(q);
};
// utk add - remove element
Dom = {
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
GM_XHR = {
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
Updater = {
  caller:''
 ,check: function(forced){
    var intval = (1000*60*60*gvar.settings.updates_interval);
    if((forced)||(parseInt(getValue("KEY_SAVE_"+"QR_LastUpdate", "0")) + parseInt(intval) <= (new Date().getTime()))) {
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
    setValue("KEY_SAVE_"+"QR_LastUpdate", new Date().getTime() + "");
	if(Dom.g(Updater.caller)) 
	  Dom.g(Updater.caller).innerHTML = 'check now';
    if (r&&r.responseText.match(/@timestamp(?:[^\d]+)([\d\.]+)/)[1] > gvar.scriptMeta.timestamp) { 
      Updater.initiatePopup(r.responseText); 
    } else {
      Updater.notify_done(false);
      if (gvar.updateForced)
        alert("No update is available for QR.");	  
    }
  }
 ,initiatePopup: function(rt){    
    Updater.meta=Updater.mparser(rt);
	Updater.showDialog(
       '<img id="nfo_version" src="'+gvar.B.news_png+'" class="qbutton" style="float:left; margin:3px 5px 0 2px;padding:3px;"/> '
	  +'<b>New'+' '+gvar.titlename+'</b> (v'+ Updater.meta.cvv[1]+') is available'
      +'<div style="float:right;margin:9px 0 0 15px;"><a class="qbutton" href="http://'+ 'userscripts.org'
      +'/scripts/show/'+gvar.scriptMeta.scriptID+'" target="_blank" title="Goto QR Home">Home</a></div>'
      +'<div style="float:right;margin-top:9px;"><a id="do_update" class="qbutton" href="javascript:;"><b>Update</b></a></div>'
      +'<div style="margin-left:22px;">Wanna make an action?</div>'
    );
    Dom.Ev($D('#upd_close'),'click', function(){
       Dom.remove('upd_cnt');
    });    
    Dom.Ev($D('#upd_notify_lnk'),'click', function(){
       if($D('#upd_cnt'))
         Dom.remove('upd_cnt');
       else{         
         Updater.notify_progres();
         Updater.check(true);
       }
    });    
    Dom.Ev($D('#do_update'),'click', function(){  
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
	  Dom.Ev($D('#nfo_version'), 'click', function(){ alert( gvar.titlename+'\n== Last LOG Update ==' + Updater.meta.news );});
	}
    
    Updater.notify_done(true);
 }
  
 ,notify_progres: function(caller){
    $D('#upd_notify').innerHTML = '<img style="margin-left:10px;" id="fetch_update" src="'+gvar.domainstatic+'images/misc/11x11progress.gif" border="0"/>';
	if(Dom.g(caller)) {
	  Updater.caller=caller;
	  Dom.g(caller).innerHTML='checking..'; // OR check now
	}
 }
 ,notify_done: function(anyupd){
    $D('#upd_notify').innerHTML = (anyupd ? '<a id="upd_notify_lnk" href="javascript:;" title="Update Available"><img style="position:absolute;margin:-5px 0 0 5px;" src="'+gvar.B.updates_png+'" width="17" border="0"/></a>':'');
    if($D('#upd_notify').innerHTML==''){
       $D('#upd_notify').innerHTML=' <small class="normal_notice">No Update Available</small>';
       window.setTimeout(function(){ $D('#upd_notify').innerHTML=''; }, 4000);
    }
 }
 ,mparser: function(rt){
	return {
     tv:rt.match(/@timestamp(?:[^\d]+)([\d]+)/)||[null],
     cvv:rt.match(/@version(?:[^v\d]+)([\d\.\w]+)/)||[null],
     news:(function(x){
	      var wrp=['// -!--latestupdate','// -/!latestupdate---'];
	      var p=[x.indexOf(wrp[0]), x.indexOf(wrp[1])];
		  return (p[0]!=-1 && p[1]!=-1 ? String( x.substring(p[0]+wrp[0].length, p[1]) ).replace(/\/\/\s/gm, function($str,$1){return '';}) : '');
	    })(rt)
    };	
  }
}; // -end Updater
/* Modified Smooth scrolling
   Todd Anglin  14 October 2006, sil, http://www.kryogenix.org/
   v1.1 2005-06-16 wrap it up in an object
*/
ss = {
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
// utk manipulate kueh
cK={
  g:function(n){
    var D=document.cookie; var A=n+"=";
    var p=[D.indexOf("; "+A),0];
    if(p[0]==-1){
       p[0]=D.indexOf(A);
       if(p[0]!=0) return null;
    }else{
      p[0]+=2;
    }
    p[1]=D.indexOf(";",p[0]);
    if (p[1]==-1)p[1]=D.length;
    return unescape(D.substring(p[0]+A.length,p[1]));
  }
 ,d:function(n){
    if(cK.g(n)) document.cookie=n+"=; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
 ,s:function(n,v,B,C){
    document.cookie=n+"="+v+(isDefined(B)?"; path="+B:"")+(isDefined(C)?"; host="+C:"");
 }
 ,a:function(n,v,B,C){
    document.cookie=n+"="+(cK.g(n)||'')+v
       +(isDefined(B)?"; path="+B:"")
       +(isDefined(C)?"; host="+C:"");
  }
};
DOMTimer={
 start:function(){var dT=new Date();this.dtStart=dT.getTime()},
 get:function(){var nT=new Date();return(nT.getTime()-this.dtStart)}
};
// =============== /END Global Var ===

// ------
init();
// ------

})();
/* Mod By Idx. */