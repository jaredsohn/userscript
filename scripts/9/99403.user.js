// ==UserScript==
// @name          Oktomi Haries Saputra
// @icon          http://www.facebook.com/note.php?saved&&note_id=153286054732134#!/
// @namespace     http://userscripts.org/scripts/show/80409
// @include       http://*.kaskus.us/showthread.php?*
// @version       3.1.4
// @dtversion     110313314
// @timestamp     1300026283121
// @description   provide a quick reply feature, under circumstances capcay required.
// @author        bimatampan
// @moded         idx (http://userscripts.org/users/idx)
// @license       (CC) by-nc-sa 3.0
// @contributor   s4nji, riza_kasela, p1nky, b3g0, fazar, bagosbanget, eric., bedjho, Piluze, intruder.master, Rh354, gr0, hermawan64, slifer2006, gzt, Duljondul, reongkacun, otnaibef, ketang8keting, farin, drupalorg, .Shana, t0g3, & all-kaskuser@t=3170414
// @include       http://imageshack.us/*
// @include       http://*.imageshack.us/*
// @include       http://imgur.com/*
// @include       http://photoserver.ws/*
//
// -!--latestupdate
//
// v3.1.4 - 2011-03-13
//   Fix minor (setElastic) onkeyup &#13 ;
//   Add & AutoSwitch to LastUsed-Uploader
//   Split Smiley & Uploader Container
//   Fix missing emote besar (repost2,cystg,kiss,peluk)
//   Fix avoid doubled event on textformat,align controllers (Donatur)
//   Add controller button for uploader
//   Fix strict find threadid
//   Fix minor toggle-iframe
//   Fix failed send rating (ajaxPost)
//   Fix post-timer enabled w/o ajaxPost
//   Fix void(increase/decrease-textarea)
//   Add settings ajaxPost/autoredirect
//   Fix failed parse smiley-custom BBCode (ajaxPost)
//   Add 3rd-party additional uploader (imgur.com; photoserver.ws)
//   Fix failed Go Advanced
//   Fix do_an_e() avoid form submit when ajaxPost
//   Fix setElastic, height decreased when add Link/Image tags
//   Improve give icon on editpost
//   Fix lineHeight problem (Chrome)
//   Add strikethrough controller
//   Add post-timer afterSubmit
//   Add posting with ajaxPost (beta-2)
//   Fix adapting FF4.0b12/RC (partial)
//   Improve BBCodeIMG (imageshack.us)
//   Fix avoid banned global object inArray
//
// -/!latestupdate---
// ==/UserScript==
/*
//
// v3.1.3 - 2011-02-19
//   Fix minor CSS cleanUp imageshack
//   Add Inc-Dec Size Editor's Height
//   Add missing kaskus smilie-besar ( Malu )
//   Fix clear disabled field; kill absolute layer, after upload(imageshack.us)
//   Fix parseUrl (spaced prefix b4 {message})
//   Fix toCharRef ignore encoding [\.\,\*]
//   Silent on oExist performed
//   Fix minor CSS imageshack on iframe 
//   Improve reorder uploader nav
//   Add Uploader (beta-4)
//   Fix failed update checker
//   Fix AutoLoad Smiley container
//   Improve autogrow on Edit(Sigi & Layout)
//   Fix minor CSS, word-wrap custom_smiley; reorder navigation;
//
// -more: http://userscripts.org/topics/56051
//
// version 0.1 - 2010-06-29
// Init
// ----
//
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.ms
// --------------------------------------------------------
*/
(function () {

const isQR_PLUS      = 0; // purpose for QR+ pack, disable stated as = 0
if( oExist(isQR_PLUS) ){
  delete gvar; return;
}

// Initialize Global Variables
var gvar=function() {};

gvar.sversion = 'v' + '3.1.4';
gvar.scriptMeta = {
  timestamp: 1300026283121 // version.timestamp

 ,dtversion: 110309314 // version.date
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

const OPTIONS_BOX = {
  KEY_SAVE_SAVED_AVATAR:  ['']
 ,KEY_SAVE_LAST_FONT:     [''] // last used font
 ,KEY_SAVE_LAST_COLOR:    ['Black'] // last used color
 ,KEY_SAVE_LAST_SIZE:     [''] // last used size
 ,KEY_SAVE_LAST_SPTITLE:  ['title'] // last used spoiler-title
 ,KEY_SAVE_LAST_UPLOADER: [''] // last used host-uploader
 
 ,KEY_SAVE_UPDATES:          ['1'] // check update
 ,KEY_SAVE_UPDATES_INTERVAL: ['1'] // update interval, default: 1 day
 ,KEY_SAVE_HIDE_AVATAR:      ['0'] // hide avatar
 ,KEY_SAVE_DYNAMIC_QR:       ['1'] // dynamic QR
 ,KEY_SAVE_AJAXPOST:         ['1'] // ajaxPost
 ,KEY_SAVE_HIDE_CONTROLLER:  ['0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'] // serial hide [controller]
 ,KEY_SAVE_CUSTOM_SMILEY:    [''] // custom smiley, value might be very large; limit is still unknown 
 ,KEY_SAVE_QR_HOTKEY_KEY:    ['1,0,0'] // QR hotkey, Ctrl,Shift,Alt
 ,KEY_SAVE_QR_HOTKEY_CHAR:   ['Q'] // QR hotkey, [A-Z]
 ,KEY_SAVE_TEXTA_EXPANDER:   ['1'] // [flag,minHeight,maxHeight] of textarea_expander
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
 ,KEY_SAVE_QR_LASTPOST:  ['0'] // lastpost timestamp
};
const GMSTORAGE_PATH = 'GM_';
const KS             = 'KEY_SAVE_';

// initialize assign global var
function init(){
  
  if(gvar.__DEBUG__) DOMTimer.start();
  
  if(page_is_notloaded('Page is temporary not available')) show_alert('Page is not available', 0);
  
  //------------
   ApiBrowserCheck();
  //------------  
  
  // initialize gvar..
  gvar.domain= 'http://'+'www.kaskus.us/';  
  gvar.isNotForum = (!location.href.match(/^http:\/\/w{3}\.kaskus\.us\/.*/));
  if(gvar.isNotForum) return outSideForumTreat();
	

  gvar.reCAPTCHA_domain= 'http://'+'api.recaptcha.net';
  gvar.reCAPTCHA_google_domain= 'http://'+'www.google.com/recaptcha/api';
  
  gvar.domainstatic= 'http://'+'static.kaskus.us/';
  gvar.avatarLink= gvar.domainstatic + 'customavatars/';
  gvar.titlename= 'Quick Reply'+(isQR_PLUS!==0?'+':'');
  gvar.fullname= 'Kaskus '+gvar.titlename;
  gvar.scriptId= '80409';

  // min-height postbit assumed with OR w/o quote per singleline, [{adaQuote}, {ga_adaQuote}]
  gvar.offSet_SiGi= [5, 8];
    
  gvar.ck= {bbuserid_currentpage:null, bbuserid:null, hotbb:null};
  gvar.motion_target= document.body;
  gvar.id_textarea= 'vB_Editor_001_textarea';
  gvar.vbul_multiquote= 'vbulletin_multiquote';
  
  gvar.offsetTop= -35; // buat scroll offset
  gvar.idx_mq=0; // counter buat deselect multiquote
  
  gvar.silahken= 'Silahkan post reply';
  gvar.tooshort= 'The message is too short. Your message should be at least 5 characters.';
  gvar.qr_diakses= 'Quick Reply bisa diakses langsung atau dengan mengklik setiap button ';
  
  gvar.B= rSRC.getSetOf('button');
  gvar.coloroptions= rSRC.getSetOf('color');
  gvar.fontoptions= rSRC.getSetOf('font');
  gvar.sizeoptions= rSRC.getSetOf('size');    
  
  // place global style
  GM_addGlobalStyle( rSRC.getCSS() );
  GM_addGlobalStyle('','css_fixups', true); // blank style tag for kaskus fixups, should be on body instead of head
  
  GM_addGlobalScript('http:\/\/www.google.com\/recaptcha\/api\/js\/recaptcha_ajax\.js');
  GM_addGlobalScript( rSRC.getSCRIPT() );
  
  // this is needed for chk avatar
  gvar.user= getUserId(); //will be [gvar.user.id, gvar.user.name, gvar.user.avatar, gvar.user.isDonatur ]
  gvar.ck.bbuserid_currentpage = gvar.ck.bbuserid = gvar.user.id;
  
  gvar.isPosting= gvar.restart= false;
  
  // get saved settings to gvar
  getSettings();

  if(gvar.settings.widethread)
    Dom.add( createTextEl( rSRC.getCSS_fixup() ), $D('#css_fixups') );
    
  //------------
  start_Main();
  //------------
  
  if(!gvar.noCrossDomain && gvar.settings.updates && isQR_PLUS==0)
    window.setTimeout(function(){ Updater.check(); }, 5000);
}

// outside forum like u.kaskus.us || imageshack.us
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

// preprepre-Initialized
function oExist(P){
  // dari sejak awal aj klo ada node #quickreply, assume collision X
  var q=document.getElementById('quickreply');
  if(q) show_alert('QR'+(!P?' userscript':'+')+' load aborted.\n#quickreply already created.\nYou have to disable one of these QR script or QR+');
  return q;
}

// populate settings value
function getSettings(){
  /** 
  eg. gvar.settings.
  */
  var hVal,hdc;
  gvar.settings = {
    lastused : {
       font: getValue(KS+'LAST_FONT'),
       color:getValue(KS+'LAST_COLOR'),
       size: getValue(KS+'LAST_SIZE'),
       sptitle: getValue(KS+'LAST_SPTITLE'),
       uploader: getValue(KS+'LAST_UPLOADER'),
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
    ajaxpost: (getValue(KS+'AJAXPOST')!='0'),
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
  gvar.settings.textareaExpander=(!hVal.match(/^([01]{1})/)?['1']:hVal.split(',') );
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
  gvar.labelControl = ['textformat', 'align', 'font', 'size', 'color', 'link', 'image', 'youtube', 'smile', 'uploader', 'quote', 'code', 'spoiler', 'tranparent', 'noparse', 'strikethrough'];
  if(hdc){
    gvar.settings.hidecontroll = hdc.toString().split(',');
  }else{
    /** banyak controler (14)
    # Ini utk label di Settings
    # [format,align,font,size,color,link,image,youtube,smile,quote,code,spoiler,tranparent,noparse,strikethrough]
    **/
    var nController = gvar.labelControl.length; 
    for(var i=0; i<nController; i++)
       gvar.settings.hidecontroll.push('0');
  }  
  // is there any saved text
  gvar.tmp_text=getValue(KS+'TMP_TEXT');
  if(gvar.tmp_text!='') setValue(KS+'TMP_TEXT', ''); //set blank to nulled it

  getUploaderSetting();
}

function getUploaderSetting(){
  // uploader properties
  gvar.upload_sel={
     kaskus:'u.kaskus.us'
    ,kodok:'imageshack.us'
    ,imgur:'imgur.com'
    ,ps:'photoserver.ws'
  };
  gvar.uploader={
     kaskus:{
        src:'u.kaskus.us'
       ,post:'u.kaskus.us/upload/do_upload'
       ,ifile:'userfile'
       ,hids:{
         referer:'http://'+'u.kaskus.us'
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
    if( gvar.settings.lastused.uploader )
    gvar.upload_tipe= gvar.settings.lastused.uploader;
	if(isUndefined( gvar.upload_sel[gvar.upload_tipe] )) 
    gvar.upload_tipe='kaskus';
  }catch(e){gvar.upload_tipe='kaskus';}
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
       el = createEl('div',{id:'quickreply',style:'visibility:hidden;'},rSRC.getTPL() );
       nodes = getByXPath_containing('//script', false, 'mqlimit')[0];
       nodes.parentNode.insertBefore(el, nodes.nextSibling);       
       // build tpl capcay 
       if(!gvar.user.isDonatur) create_tplcapcay();
    }
    $D('#qr_maincontainer').innerHTML = rSRC.getTPL_main();
    
    // cuma untuk fresh load
    if(!gvar.restart) {
     nodes = getByXPath_containing('//a', false, 'QUOTE');
     for(var i=0; i<nodes.length; i++){
      hr = nodes[i].href.split("&p=");      
      nodes[i].innerHTML = '<img src="'+gvar.domainstatic+'images/buttons/quote.gif" alt="Quote" title="Reply With Quote" border=0 />';      
      // prep bulu pena
      child = '<img src="'+gvar.domainstatic+'images/buttons/quickreply.gif" alt="Quick Reply" title="Quick Reply to this message" border=0 />';
      Attr = {href:'newreply.php?do=newreply&p='+hr[1],rel:'nofollow',id:'qr_'+hr[1],onclick:'return false'};
      el = createEl('a',Attr,child);
      on('click',el,function(e){do_click_qr(e)});
      // we remove existing node first
      if(gvar.user.isDonatur) Dom.remove('qr_'+hr[1]);
      Dom.add(el, nodes[i].parentNode);

      Dom.add(createTextEl(' '), nodes[i].parentNode);
      
     }
     nodes = getByXPath_containing('//a', false, 'EDIT');
     for(var i=0; i<nodes.length; i++){
        hr = nodes[i].href.split("&p=");
        //nodes[i].setAttribute('onclick', 'return false');
        nodes[i].innerHTML = '<img src="'+gvar.domainstatic+'images/buttons/edit.gif" border="0" alt="Edit" title="Edit this Post" />';
	 }

    }
    
    // insert customed controler
    insert_custom_control();    
            
    // chk & append avatar
    check_avatar();
    if(isDefined(gvar.user.id)){
       //show_alert('Attaching Avatar..');
       appendAvatar();
    }else{
       show_alert('Failed attaching Avatar..');
    }
    
    // Do Event Element later, might reduce lag
    window.setTimeout(function() {
       // initialize all nodes with event
       initEventTpl();       
       // property of vbEditors controler
       re_event_vbEditor();

       if(gvar.settings.autoload_smiley[0]=='1')
         create_smile_tab( $D('#vB_Editor_001_cmd_insertsmile') );
       
       if(gvar.tmp_text){
         if(gvar.tmp_text!=gvar.silahken){
           vB_textarea.enabled();
           vB_textarea.focus();
         }else{
           vB_textarea.readonly();
         }
         gvar.tmp_text=null;
         
         if(gvar.settings.textareaExpander[0])
           vB_textarea.setElastic(gvar.id_textarea, gvar.maxH_editor); // retrigger autogrow now
         else if(gvar.lastHeight_textarea){
           $D(gvar.id_textarea).style.height = gvar.lastHeight_textarea;
              delete gvar.lastHeight_textarea;
         }
       }else{ // disable|readonly textarea.
         vB_textarea.readonly();
         Dom.g(gvar.id_textarea).style.height=100+'px';
       }
       gvar.restart = false;
       if(gvar.user.isDonatur) 
         Dom.remove('qrform'); // destroy original QR
    }, 50);
    window.setTimeout(function() {
       if($D('#quickreply')) $D('#quickreply').style.visibility = 'visible';
       controler_resizer();
	   if($D('#qr_delaycontainer')) QRdp.check($D('#qr_delaycontainer'));
    }, 350);

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
    if( par.nodeName=='TABLE' && par.className=='tborder' ){ // this is enough :p
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
  sel = createEl('select', {id:'sel_rating',name:'rating',tabindex:'6'});
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
function create_tplcapcay(){
    $D('#capcay_container').innerHTML = ''    
    +'<fieldset class="fieldset" id="fieldset_capcay" style="display:none;">'
    +'<div id="imgcapcay"><div class="g_notice normal_notice" style="display:block;font-size:9px;text-align:center;">[capcay-space]</div></div>\n'    
    +'<input id="hidrecap_btn" value="reCAPTCHA" type="button" style="display:" onclick="showRecaptcha(\'recaptcha_container\');" />' // fake button create
    +'<input id="hidrecap_reload_btn" value="reload_reCAPTCHA" type="button" style="display:" onclick="Recaptcha.reload();" />' // fake button reload
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
  if(text.indexOf('vbform')==-1) return null;
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
    var spost = gvar.lastPostQuery = buildQuery();
    
    clog(gvar.lastPostQuery);
    
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
    if(rets===null){
      $D('#preview_content').innerHTML = '<div class="g_notice g_notice-error" style="display:block;">Upss, server might be busy. Please <a href="javascript:;" id="upss_preview">Try again</a> or <a href="javascript:;" id="upss_abort_preview">abort preview</a>.</div>';
       on('click',$D('#upss_preview'),function(e){
        if($D('#preview_content'))
          $D('#preview_content').innerHTML='<div id="preview_loading"><img src="'+gvar.B.throbber_gif+'" border="0"/>&nbsp;<small>loading...</small></div>';
         qr_preview();
       });
       on('click',$D('#upss_abort_preview'),function(e){SimulateMouse($D('#imghideshow'),'click',true)});
       return;
    }else{
      $D('#preview_content').innerHTML = rets;
    }
    if(gvar.__DEBUG__) {
        clog('previewResponse elapsed='+DOMTimer.get());
    }
    if($D('#preview_presubmit')){
       $D('#preview_presubmit').removeAttribute('disabled');
       $D('#preview_presubmit').value = (gvar.user.isDonatur ? '':'pre-') + 'Post';
    }
  }
}


function lockFields_forSubmit(flag){
  var toDisb = [
       "recaptcha_submit","preview_presubmit", gvar.id_textarea
      ,"qr_preview_ajx","qr_prepost_submit"
  ], sml_par=$D('#smile_cont'), el=$D('#controller_wraper')
  , rsf=$D('recaptcha_response_field'), rsl=$D('#recaptcha_submit_load');
  
  if(flag) { // locking ..    
      for(var i=0;i<toDisb.length;i++)
        if($D(toDisb[i])) $D(toDisb[i]).setAttribute('disabled','disabled');
      
      if(rsf) rsf.setAttribute('readonly',true);
      
      if(sml_par.style.display!='none')
        window.setTimeout(function() {SimulateMouse($D('#tab_close'), 'click', true)}, 1);
      if(gvar.user.isDonatur){
        var adv=$D('qr_advanced'),par,ec;
        if(adv){
            par=adv.parentNode;
            if($D('#cancel_post')) Dom.remove($D('#cancel_post'));
            ec = createEl('input', {id:'cancel_post',type:'button',value:'Cancel',style:'margin:0 10px',title:'Cancel Posting'});
            on('click',ec,function(){ lockFields_forSubmit(false)});
            par.insertBefore(ec, adv);
        }
      }    
  }else{
    // remove locking
    for(var i=0;i<toDisb.length;i++)
          if($D('#'+toDisb[i])) $D('#'+toDisb[i]).removeAttribute('disabled');
    if(rsf) rsf.removeAttribute('readonly');
    if($D('#recaptcha_submit')) $D('#recaptcha_submit').value='Post';
    if($D('#qr_prepost_submit')) $D('#qr_prepost_submit').value=(gvar.user.isDonatur ? '':'pre-')+'Post Quick Reply';
  }
  if(rsl) rsl.style.setProperty('display',(flag?'':'none'),'');
  if(el) el.style.setProperty('display',(flag?'':'none'),'');
}

function do_posting(e){
  e=e.target||e; e.value='posting...';
  e.setAttribute('disabled','disabled');
  
  if($D('#posting_notify')) $D('#posting_notify').innerHTML = '';
  if( !gvar.settings.ajaxpost ){
    window.setTimeout(function() {SimulateMouse($D('#qr_submit'), 'click', true)}, 200);
  }else{
    qr_ajax_post();    
  }
  return false;
}

function qr_ajax_post(reply_html){
  if(isUndefined(reply_html)){ // is there ret from XHR :: reply_html

    var prep = prep_preview(), spost=buildQuery( true ); // isToPost
    if(!gvar.user.isDonatur){
      // grab 2 captcha field
      var ce,fld = ["recaptcha_challenge_field","recaptcha_response_field"];
      for(var i=0; i<fld.length; i++){
         ce=$D(fld[i]);
         if(ce) spost ='&'+ce.getAttribute('name')+'='+encodeURIComponent(ce.value) + spost;
      }
    }
    //clog(spost); clog(prep);
    lockFields_forSubmit(true);

    GM_XHR.uri = prep[1];
    GM_XHR.cached = true;
    GM_XHR.request(spost.toString(),'post', qr_ajax_post);

  }else{
    if( !reply_html ) return;
    reply_html = reply_html.responseText;
    var parse_ajax_post = function(html){
       
        var r={err:1,msg:' Unknown-Error ',redirect:false},cucok,ErMsg;
        if(html.indexOf('POSTERROR')!=-1){ // there's some error
          cucok = html.match(/<ol><li>([^\n]+)<\/ol/);
          if(cucok) ErMsg = cucok[1];
          if(cucok = ErMsg.match(/Please\s*try\s*again\s*in\s*([^.(]+)/i)){
            r = {err:1, msg:'Posting delayed, please try again in '+cucok[1]};
          }else{
            r = {err:1, msg:(/did\snot\smatch/i.test(ErMsg) ? 'reCapcay not match, please try again..': cucok[1])};
          }
          // grab and update hash
          capcay_parser(html);
        }else if( cucok = html.match(/<meta\s*http\-equiv=[\"\']Refresh[\"\']\s*content=[\"\']\d+;\s*URL=([^\"\']+)/i) ){
          r = {err:0, msg:'', redirect:cucok[1]};
        }
        if(r.err!=0) clog(html);
        
       return r;
    }, ret = parse_ajax_post(reply_html);
    if(ret) {
       var tgt = (ret.err==0 ? $D('#recaptcha_container') : $D('#'+(gvar.user.isDonatur?'posting_notify_donat':'posting_notify') ));
       if(ret.err==0){
         
         // set lastPost timestamp here
         QRdp.updLast(new Date().getTime()+'');
		 

         if(tgt) tgt.innerHTML = '<br/><div class="g_notice" style="display:block!important;">Thank you for posting! redirecting to <a href="'+ret.redirect+'" target="_self">post</a>..</div>';
         if(ret.redirect) location.href = ret.redirect;
       }else{
         if(tgt) {
           tgt.setAttribute('style','height:auto!important');
           tgt.innerHTML = '<div class="g_notice g_notice-error" style="display:block!important;">'+ret.msg+'</div>';
         }
         lockFields_forSubmit( false );
         if($D('#botgreet_text'))
            $D('#botgreet_text').innerHTML = rSRC.getBOT_greet(0, 10);
         // reload capcay
         SimulateMouse($D('#hidrecap_reload_btn'), 'click', true);
       }
    }
    return;
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
      tmsg = tpl.replace(/\{message\}/i, " "+retTx); // spaced preffix to success parseUrl (^https?\:\/\/)
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

function buildQuery(isToPost){
  isToPost = isDefined(isToPost) && isToPost ? true : false; // instead of toPreview
  var hidden = getTag( 'input', $D('#submit_container') );
  var el, q='', hL=hidden.length;
  for(var h=0; h<hL; h++)
    if( typeof(hidden[h].getAttribute)!='undefined' && hidden[h].getAttribute('type')=='hidden' )
      q+='&' + hidden[h].getAttribute('name') + '=' + encodeURIComponent(hidden[h].value);

  q+= (isToPost ? '&sbutton=sbutton' : '&preview=Preview+Post');
  q+= (isToPost && $D('sel_rating') ? '&rating='+$D('sel_rating').selectedIndex : '');
  
  var adtnl = [gvar.id_textarea, 'input_title']; // ids of textarea message and title
  el = Dom.g(adtnl[0]);
  if( el && el.value!='' && el.value!=gvar.silahken ){
    var msg = trimStr(el.value);
    msg = template_wrapper();
    q = '&' + el.getAttribute('name') + '=' + encodeURIComponent(toCharRef(msg) +"\n"+ (isToPost?'':'{[end-of-QR-'+gvar.sversion+'-'+gvar.scriptId+']}')  )  + q;
  }
  el = Dom.g(adtnl[1]);
  if( el && el.value!='' )
    q = '&' + el.getAttribute('name') + '=' + encodeURIComponent(el.value) + q;
  return q;
}

function closeLayerBox(tgt){
    var doLastFocus = false;
    var isPreviewMode = ($D('#preview_presubmit'));
    if(tgt=='hideshow' && $D('#hideshow')) {
     var curv = Dom.g(gvar.id_textarea).value;
     var last2 = curv.substring(curv.length-2, curv.length);
     if( isPreviewMode && last2!="\n\n" && (last2.charCodeAt(0)!=13 && last2.charCodeAt(1)!=13) ){
        vB_textarea.init();
        vB_textarea.add('\n\n');
        doLastFocus = true;
     }
    }
    lockFields_forSubmit(false); // open locked; just incase
    Dom.remove( Dom.g(tgt) );
    try {
      delete gvar.lastPostQuery;
      Dom.g(gvar.id_textarea).focus(); 
      if(isPreviewMode && doLastFocus) vB_textarea.lastfocus(); 
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
        on('keydown',$D('#recaptcha_response_field'),function(e){
            var C = (!e ? window.event : e ), ab=false;
            var A = C.keyCode ? C.keyCode : C.charCode;
            if( A===13 ){ // mijit enter
                SimulateMouse($D('#recaptcha_submit'), 'click', true);
                ab=true;
            }else if( (C.altKey && A===82) || (A===33||A===34) /*Alt+R(82) | Pg-Up(33) | Pg-Down(34)*/ ) {
                SimulateMouse($D('#hidrecap_reload_btn'), 'click', true);
                ab=true;
            }
            if(ab){
             C = do_an_e(C); return false;
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
    el = createEl('div', Attr, rSRC.getTPL_layer_Only() );
    getTag('body')[0].insertBefore(el, getTag('body')[0].firstChild);    
    
    // this container must inside form
    Attr = {id:'hideshow_recaptcha',style:'display:none;'};
    el = createEl('div', Attr, rSRC.getTPL_prompt_reCAPTCHA() );
    Dom.add(el, $D('#vbform') );
    
    // event close button
    on('click',$D("#imghideshow_precap"),function(){closeLayerBox('hideshow');closeLayerBox('hideshow_recaptcha');});
    // cancel
    on('click',$D("#recaptcha_cancel"),function(){ SimulateMouse($D("#imghideshow_precap"), 'click', true); });

    // submit recaptcha
    on('click',$D('#recaptcha_submit'),function(e){
        if( !is_capcay_filled($D('#recaptcha_response_field')) ){
          e.preventDefault;
          return false;
        }
        do_an_e(e);
        return do_posting(e);
    } );
    
    // calibrate width/position container
    $D('#popup_container_precap').style.top = (parseInt( ss.getCurrentYPos() )+ (document.documentElement.clientHeight/2)-200 ) + 'px';
    $D('#popup_container_precap').style.left = parseInt( Math.round((document.documentElement.clientWidth/2)-200) ) + 'px';

    window.setTimeout(function() {
        SimulateMouse($D('#hidrecap_btn'), 'click', true);
    }, 100);


} // end loadLayer_reCaptcha

function loadLayer_preview(){
    loadLayer( rSRC.getTPL_Preview, 'preview' );
    
    //submit from preview
    if($D('#preview_presubmit'))
      on('click',$D('#preview_presubmit'),function(e){
         if( !gvar.user.isDonatur ){
           if($D('#preview_loading')) return;           
           loadLayer_reCaptcha();
           toogleLayerDiv('hideshow');
           toogleLayerDiv('hideshow_recaptcha');
         }else{
           do_an_e(e);
           return do_posting(e);
         }
      });
}

function loadLayer( theTPL, flag ){

    var Attr,el;
    Attr = {id:'hideshow',style:'display:none;'};
    el = createEl('div', Attr, (typeof(theTPL)=='function' ? theTPL( isDefined(flag) ? flag : null ) : '') );
    getTag('body')[0].insertBefore(el, getTag('body')[0].firstChild);
    
    // event close button
    if($D("#imghideshow")) on('click',$D("#imghideshow"),function(){closeLayerBox('hideshow');});
    
    // calibrate width container
    popupLayer_positioning()
          
    // cancel preview
    if($D('#preview_cancel')) on('click',$D('#preview_cancel'),function(){ closeLayerBox('hideshow'); });
    
}

function popupLayer_positioning(){
    // calibrate width & left container
    if($D('#popup_container')){
      $D('#popup_container').style.top = (parseInt( ss.getCurrentYPos() )+25) + 'px';
      if($D('#popup_container').clientWidth){ // only if width is defined; width:100% will return 0
       var cW = Math.floor($D('#popup_container').clientWidth/2);
       $D('#popup_container').style.left = (Math.floor(parseInt( GetWidth() )/2) - cW) + 'px';
      }
    }
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
      controler_resizer();
      dvacs.style.display='';
      on('click',dvacs,function(){
        var etxta = Dom.g(gvar.id_textarea);
        if(etxta.getAttribute('readonly') || etxta.getAttribute('disabled')=='disabled'){
          if(!vB_textarea.Obj) vB_textarea.init();
          if(vB_textarea.content==gvar.silahken)
            vB_textarea.clear();
          vB_textarea.enabled();
          if(capcay_notloaded()) ajax_buildcapcay();
          if(gvar.user.isDonatur && additional_options_notloaded()) 
             ajax_additional_opt();
        }          
      });
    }
    on('keydown',Dom.g(gvar.id_textarea),function(e){return is_keydown_pressed(e)});
    
    on('click',$D('#atitle'),function() {
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
    
      on('click',$D('#qr_setting_btn'),function(){
        ST.init_setting();
      });
      on('click',$D('#atoggle'),function(e){toogle_quickreply(); e.preventDefault();});
      on('keydown',$D('#input_title'),function(e){
        var C = window.event||e, A = C.keyCode ? C.keyCode : C.charCode;
        if(A===13){
          if(C.ctrlKey) SimulateMouse($D('#qr_prepost_submit'), 'click', true);          
          e.preventDefault(); // return false;
          return false;
		}

      });
      
      on('click',$D('#chk_fixups'),function(e) {
        e=e.target||e;
        var chk=e.getAttribute('checked');        
        if(chk){
            $D('#css_fixups').innerHTML='';
            e.removeAttribute('checked');
          } else{
            Dom.add( createTextEl( rSRC.getCSS_fixup() ), $D('#css_fixups') );
            e.setAttribute('checked','checked');
          }
          setValue(KS+'WIDE_THREAD', (chk ? 0:1));
        controler_resizer(); // resize elements width
      });
      
      on('submit',$D('#vbform'),function(e){	    

        if(gvar.settings.ajaxpost && $D('#clicker').value != 'Go Advanced') {
          clog('here and aborted');
          e.preventDefault(); // return false;
          return false;
		}else{		

          if( !gvar.user.isDonatur && $D('#clicker').value != 'Go Advanced' ){
            var hi=($D('#recaptcha_response_field') ? $D('#recaptcha_response_field') : null);
            if(hi && hi.value==''){
              if(hi.getAttribute('disabled')=='disabled') 
                e.preventDefault(); // return false;
              alert('Belum Isi Image Verification'); hi.focus();
              e.preventDefault(); // return false;
              return false;
            }
		  }	  

          var prp = prep_preview(), msg=template_wrapper();
          if(msg != Dom.g(gvar.id_textarea).value) Dom.g(gvar.id_textarea).value=msg;
          $D('#qr_do').setAttribute('value', prp[0]); // nxDo; change default of qr_do (postreply)
          $D('#vbform').setAttribute('action', prp[1]); //uriact		  

          if($D('#clicker').value != 'Go Advanced' && prp[0]=='postreply' ){
            // set lastPost timestamp here
            QRdp.updLast(new Date().getTime()+'');
		  }
		}
      });
      on('click',$D('#qr_advanced'),function(){$D('#clicker').setAttribute('value','Go Advanced');});
      on('click',$D('#qr_prepost_submit'),function(e){
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
           do_an_e(e);
           return do_posting(e);
         }
      });
      // end of vb_Textarea submit Event ------
    
      on('click',$D('#qr_preview_ajx'),function(e){
        if(Dom.g(gvar.id_textarea).value==gvar.silahken || Dom.g(gvar.id_textarea).value=='') return;
        e=e.target||e;
        var msg = trimStr(Dom.g(gvar.id_textarea).value);
        if(!(msg.length>=5)){
          // show warning message is too short
          alert(gvar.tooshort);
          e.preventDefault(); return false;
        }
        if(!$D('#hideshow')){
          loadLayer_preview(); 
          toogleLayerDiv('hideshow');
        }else{
          closeLayerBox('hideshow');
        }
        qr_preview();
      });

      // detect window resize to resize textbox and controler wraper
      on('resize',window,function(){controler_resizer()});
      // activate hotkey?
      if( gvar.settings.hotkeychar && gvar.settings.hotkeykey.toString()!='0,0,0' )
        on('keydown',window.document,function(e){return is_keydown_pressed_ondocument(e)});
      
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
            on('click',node,function(e){
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
   gvar.maxH_editor = parseInt(GetHeight())-170;
   var wtxa=Dom.g(gvar.id_textarea).clientWidth;
   window.setTimeout(function() {
     var el=$D('#input_title'),iwtxa=Dom.g(gvar.id_textarea).clientWidth;;
     if(el){
       el.style.display='none';
       el.style.width=(iwtxa-80)+'px';
       el.style.display='block';
     }
     el = $D('#dv_accessible');
     if(el && $D('#dv_accessible').style.display!='none')
       el.style.width=(iwtxa-80)+'px';
     else
       if(gvar.settings.textareaExpander[0]) vB_textarea.setElastic(gvar.id_textarea, gvar.maxH_editor, 1);       
     popupLayer_positioning(); // if there is a popup, repositioning it
   }, 100);
   var el = $D('#controller_wraper');
   if(el) el.style.width=(wtxa+50)+'px';
   el = $D('#scustom_container');
   if(el) el.style.setProperty('max-width',(wtxa-135)+'px','');
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

  if($D('#hideshow')){
    if(A==27){
     closeLayerBox('hideshow');
     if($D('#hideshow_recaptcha')) closeLayerBox('hideshow_recaptcha');
    }
    return;
  }  
  var CSA_tasks = {
     quickreply: gvar.settings.hotkeykey.toString() // default: Ctrl+Q
    ,fetchpost: (!gvar.isOpera ? '0,0,1' : '1,0,1' ) // Alt+Q [FF|Chrome] --OR-- Ctrl+Alt+Q [Opera]
    ,deselectquote: '1,1,0' // Ctrl+Shift+Q, due to Ctrl+Alt will be used above
  };
  switch(pressedCSA){ // key match in [Ctrl-Shift-Alt Combination]
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
     if($D('#recaptcha_response_field')){
       window.setTimeout(function() { try{$D('#recaptcha_response_field').focus()}catch(e){}; }, 150);
     }else{
       if(!gvar.isOpera) $D('#qr_prepost_submit').focus();
     }
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
      on('click',el,function(e){return do_btncustom(e)});
      Dom.add(el,$D('#vB_Editor_001_cmd_insertyoutube'));
    }
    idx=12;
    // tombol spoiler
    if(gvar.settings.hidecontroll[idx] != '1'){
      Attr={title:'Wrap [SPOILER] tags around selected text',
            alt:'[spoiler]',style:'vertical-align:bottom',src:gvar.B.spoiler_png
           };
      el = createEl('img',Attr);
      on('click',el,function(e){return do_btncustom(e)});
      Dom.add(el,div1);
    }
    idx++;
    // tombol transparent
    if(gvar.settings.hidecontroll[idx] != '1'){
      Attr={title:'Wrap [COLOR=transparent] tags around selected text',
            alt:'[transparent]',style:'vertical-align:bottom',src:gvar.B.transp_gif
           };
      el = createEl('img',Attr);
      on('click',el,function(e){return do_btncustom(e)});
      Dom.add(el,div1);
    }
    idx++;
    // tombol noparse
    if(gvar.settings.hidecontroll[idx] != '1'){
      Attr={title:'Wrap noparse tags around selected text',
            alt:'[noparse]',style:'vertical-align:bottom',src:gvar.B.noparse_gif
           };
      el = createEl('img',Attr);
      on('click',el,function(e){return do_btncustom(e)});
      Dom.add(el,div1);
    }
    idx++;
    // tombol tstrike
    if(gvar.settings.hidecontroll[idx] != '1'){
      Attr={title:'Strikethrough text around selected text',
            alt:'[strike]',style:'vertical-align:bottom',src:gvar.B.tstrike_gif
           };
      el = createEl('img',Attr);
      on('click',el,function(){return do_TextStrike()});
      Dom.add(el,div1);
    }

}

// create event controler on vbEditor & settings
function re_event_vbEditor(){
  // event reset / clear textarrea
  on('click',$D('#textarea_clear'),function(){vB_textarea.clear()});
  
  // event textarea autogrowth  
  if(gvar.settings.textareaExpander[0])
    vB_textarea.setElastic(gvar.id_textarea, gvar.maxH_editor);
  
  var vB01='vB_Editor_001';
  // general event buat more smile
  el=createEl('script',{type:'text/javascript'},"vB_Editor['"+vB01+"'] = new vB_Text_Editor('"+vB01+"', 0, '13', '1', undefined, '');");
  Dom.add(el,document.body);
       
  // event common button controller
  if($D(vB01)) {
   var imgs = $D(vB01).getElementsByTagName('img'), iL=imgs.length;
   for(var i=0;i<iL;i++){
    var el=imgs[i], alt=el.alt;
    switch(alt){
      case 'Align Left': case 'Align Center': case 'Align Right': case 'Bold': case 'Italic': case 'Underline':
        on('click',el,function(e){do_align_BIU(e)});
      break;
      case 'Insert Image': case 'Insert Link':
        on('click',el,function(e){ return do_btncustom(e) });
      break;
      case 'Decrease Size': case 'Increase Size':
        on('click',el,function(e){do_resize_editor(e)});
      break;
      default:
       if(alt && (alt.indexOf('[quote]')!=-1 || alt.indexOf('[code]')!=-1) )
        on('click',el,function(e){return do_btncustom(e)});
      break;
    }
   }
  }
  
  // fungsi click pick
  var clickpick = function(el,id){
    var ve=$D(id);
    ve.style.display=(ve.style.display==''?'none':'');
    if(ve.style.display!='none') try{Dom.g(id+'_dumy').focus();}catch(el){}
  };
  
  // event buat kolor
  var el = create_popup_color();
  var par = $D(vB01+'_popup_forecolor');
  if(par) Dom.add(el,par);
  
  el = $D('#pick_kolor');
  if(el) on('click',el,function(e){clickpick(e, vB01+'_popup_forecolor_menu');});

  el = $D(vB01+'_color_out');
  if(el)
    on('click',el,function(){
     var etitle = gvar.settings.lastused.color;
     if(etitle) {
       do_insertTag('color',etitle);
       return false;
     }
     SimulateMouse($D('#pick_kolor'), 'click', true);
    });  

  // event buat font  
  el = create_popup_font();
  par = $D(vB01+'_popup_fontname');
  if(par) Dom.add(el,par);
  
  el = $D('#pick_font');
  if(el) on('click',el,function(e){clickpick(e,vB01+'_popup_fontname_menu')});
   
  el = $D(vB01+'_font_parentout');
  if(el)
    on('click',el,function(e){
     var etitle = gvar.settings.lastused.font;
     if(etitle) {
       do_insertTag('font',etitle);
       return false;
     }
     SimulateMouse($D('#pick_font'), 'click', true);     
    });  
  
  // event buat size  
  el = create_popup_size();
  par = $D(vB01+'_popup_fontsize');
  if(par && el) Dom.add(el,par);
  
  el = $D('#pick_size');
  if(el) on('click',el,function(e){clickpick(e,vB01+'_popup_size_menu')});
   
  el = $D(vB01+'_size_parentout');
  if(el)
    on('click',el,function(e){
     var etitle = gvar.settings.lastused.size;
     if( etitle && !isNaN(parseFloat(etitle)) ) {
       do_insertTag('size',etitle);
       return false;
     }
     SimulateMouse($D('#pick_size'), 'click', true);     
    });  
  
  var mouseEv = function(par,cmd,evt){
    window.setTimeout(function() {
      if(isUndefined(vB01)) vB01 = 'vB_Editor_001';
	  obj = $D(vB01+cmd);
      if($D('#'+par) && $D('#'+par).style.display!='') {
        obj.style.backgroundColor=(evt=='mouseout' ? 'transparent' : '#B0DAF2');
        obj.style.border='1px solid '+(evt=='mouseout' ? 'transparent' : '#2085C1');
      }
    }, 10);
  };
  // event buat smile  
   par = $D(vB01+'_cmd_insertsmile');   
   if(par) {
     on('click',par,function(e){switch_upl_smiley(e)});
     on('mouseout',par,function(){mouseEv('smile_cont','_cmd_insertsmile_img','mouseout')});
     on('mouseover',par,function(){mouseEv('smile_cont','_cmd_insertsmile_img','mouseover')});
   }
  // event buat button uploader
   par = $D(vB01+'_cmd_uploader');
   if(par) {
     on('click',par,function(e){switch_upl_smiley(e)});
	 on('mouseout',par,function(){mouseEv('upl_cont','_cmd_uploader_img','mouseout')});
     on('mouseover',par,function(){mouseEv('upl_cont','_cmd_uploader_img','mouseover')});   
   }
}
// end re_event_vbEditor

function switch_upl_smiley(e){
   var tohide;
   e=e.target||e;
   var clearActive = function(tohide){
     var cmd=(tohide=='smile_cont' ? '_cmd_insertsmile_img':'_cmd_uploader_img'),obj = $D('vB_Editor_001'+cmd);   
	 if(obj){
	  obj.style.backgroundColor='transparent';
      obj.style.border='1px solid transparent';
	 }
   };
   if(e.id && e.id.indexOf('_cmd_uploader') !=-1 ){     
     tohide = 'smile_cont';
   }else if(e.id && e.id.indexOf('_cmd_insertsmile') !=-1 ){
     tohide = 'upl_cont';
   }
   clearActive(tohide);
   if($D('#'+tohide)) {
     showhide($D('#'+tohide), false);
	 if(tohide == 'smile_cont')
	    create_upoader_tab();
	 else
	    create_smile_tab(e);
   }
}


function create_upoader_tab(){
  var parent = $D('#upl_cont');
  if(parent.innerHTML!='') {
    parent.style.display=(parent.style.display=='none' ? '':'none');
    force_focus(10); return;
  }
  var id,cont,el,el2,Attr,img,imgEl,prop,tgt_id='suploader_container';
  
  // create tabuploader
  cont = createEl('ul',{id:'tab_parent_upl','class':'ul_tabsmile'});
  Dom.add(cont,parent);
  el = createEl('li',{'class':'li_tabsmile'});
  el2 = createEl('a',{href:'javascript:;','class':'',id:'remote_'+tgt_id},'uploader');
  Dom.add(el2,el); Dom.add(el,cont);  
  
  Attr={id:'wrap_'+tgt_id,'class':'smallfont',style:'display:none;'};
  el = createEl('div',Attr,rSRC.getTPL_sUploader());
  Dom.add(el,parent);
  
  // tab close
  el2 = createEl('a',{href:'javascript:;',id:'tab_close_uploader',title:'Close Uploader'},'&nbsp;<b>X</b>&nbsp;');
  on('click',el2,function(){
    $D('#upl_cont').style.display='none';
    force_focus(10); 
    var obj = $D('#vB_Editor_001_cmd_uploader_img');
    if(obj){
      obj.style.backgroundColor='transparent';
      obj.style.border='1px solid transparent';
    }
    return; 
  });
  el = createEl('li',{'class':'li_tabsmile tab_close'});
  Dom.add(el2,el); Dom.add(el,cont);
  
  if($D('wrap_'+tgt_id)) showhide($D('wrap_'+tgt_id), true);
  addClass('current',$D('#remote_'+tgt_id));
  
  UPL.init_uploader(tgt_id);
  parent.style.display='';
}

// ----------------------------------
function create_smile_tab(){
  var parent = $D('#smile_cont');
  if(parent.innerHTML!='') {
    parent.style.display=(parent.style.display=='none' ? '':'none');
    force_focus(10);
    return;
  }
  var id,cont,el,el2,Attr,img,imgEl,prop;
  var scontent = ['skecil_container','sbesar_container','scustom_container'];
  var mtab = {
     'skecil_container'  :'kecil' 
    ,'sbesar_container'  :'besar' 
    ,'scustom_container' :'custom'
  };
  // create tabsmile
  cont = createEl('ul',{id:'tab_parent','class':'ul_tabsmile'});
  Dom.add(cont,parent);
  for(tab in mtab){
    el2 = createEl('a',{href:'javascript:;','class':'',id:'remote_'+tab},mtab[tab]);
    on('click',el2,function(e){
      var tt = (e.target||e).innerHTML, tgt='sTGT_container'.replace(/TGT/,tt),S=null;
      S=(tt=='besar' ? gvar.smiliebesar : (tt=='kecil' ? gvar.smiliekecil : (tt=='custom' ? gvar.smiliecustom : null) ));
      if(tt=='custom' && Dom.g(tgt) && Dom.g(tgt).innerHTML!=''){ // need to make sure about this, really
        rSRC.getSmileySet(true);
        if(S) S=SML_LDR.smlset=gvar.smiliecustom;
        if($D('#manage_cancel') && $D('#manage_cancel').style.display!='none')
          SML_LDR.custom.close_edit();
      }
      SML_LDR.scID=tab;
      toggle_tabsmile(e);
      if(Dom.g(tgt) && Dom.g(tgt).innerHTML=='') insert_smile_content(tgt,S);
    });
    el = createEl('li',{'class':'li_tabsmile'});
    Dom.add(el2,el); Dom.add(el,cont);
    
    //(blank) container for smiley contents
    Attr={id:(tab!='scustom_container' ? '' : 'wrap_')+tab,'class':'smallfont',style:'display:none;'};
    var iner = (tab=='scustom_container'? rSRC.getTPL_sCustom(tab) : '');
    el = createEl('div',Attr,iner);
    Dom.add(el,parent);
  } // end for
  
  // tab close
  el2 = createEl('a',{href:'javascript:;',id:'tab_close',title:'Close Smiley'},'&nbsp;<b>X</b>&nbsp;');
  on('click',el2,function(){
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
  el = createEl('li',{'class':'li_tabsmile tab_close'},'<a href="javascript:;" onclick="vB_Editor[\'vB_Editor_001\'].open_smilie_window(440,'+GetHeight()+');return false" title="Show all smilie">[ More ]</a>');
  Dom.add(el,cont);
  
  // --- end tab creation ---
  // populate smiley set | custom smiley will also loaded from here
  window.setTimeout(function(){rSRC.getSmileySet()},1);  
  
  // autoload thingie
  if(gvar.settings.autoload_smiley[0]=='1'){
    id=('s'+gvar.settings.autoload_smiley[1]+'_container');
    var tS=gvar.settings.autoload_smiley[1], S=(tS=='besar' ? gvar.smiliebesar : (tS=='kecil' ? gvar.smiliekecil : (tS=='custom' ? gvar.smiliecustom : null) ));
    insert_smile_content(id, S);
  }else{ // first tab: uploader no need load smileyset
    id=scontent[0];
  }
  toggle_tabsmile(Dom.g(id));
  parent.style.display='';
  
  window.setTimeout(function() {
    SimulateMouse($D('#remote_'+id), 'click', true); // trigger click tab to first tab
    if(id==scontent[0]) force_focus(10);
  }, 50);
}
// end create_smile_tab

function insert_smile_content(scontent_Id, smileyset){
  
  if(!scontent_Id || !smileyset) return;
  //clog(scontent_Id);
  SML_LDR.init(scontent_Id, smileyset);
}
// end insert_smile_content()

function toggle_tabsmile(e){
        //clog('in toggle_tabsmile');
   e=e.target||e; 
   if(!e) return;
   var elem = getTag('a',$D('#tab_parent')), eL=elem.length, tgt;
   for(var i=0; i<eL;i++){ // hideall tab
     var id = elem[i].id;
     if(id && id.indexOf('remote_')!=-1) {
       showhide(Dom.g(id.replace('remote_','')), false); // hide container
       removeClass('current', elem[i]); // reset tab class
     }
   }
   var cwrap=['scustom'];
   for(var j=0;j<cwrap.length;j++){
     if($D('#wrap_'+cwrap[j]+'_container'))
       showhide($D('#wrap_'+cwrap[j]+'_container'), ( e.id.indexOf(cwrap[j])!=-1 )  ); // hide container wraper
   }
   tgt=e.id.replace('remote_',''); 
   showhide(Dom.g(tgt), true);
   addClass('current',$D('#remote_'+tgt));

   force_focus(10);
}

function create_popup_size(){
  var id = 'vB_Editor_001_popup_size_menu';
  var Attr = {id:id,'class':'vbmenu_popup',
       style:'width:40px;height:215px;overflow:auto;z-index:99;clip:rect(auto,auto,auto,auto);display:none;'
    };
  var el = createEl('div',Attr), sL=gvar.sizeoptions.length;
  var tCont,tFont,size;
  for (var idx=0; idx<sL; idx++) {
    size = gvar.sizeoptions[idx];
    if(!isString(size)) continue; // should do this, coz Opera lil weirdo
    Attr={title:size,'class':'osize',style:'text-align:left;'};
    tCont = createEl('div',Attr);
    tFont = createEl('font',{size:size},size);
    Dom.add(tFont,tCont);
    on('click',tCont,function(e){
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
      setValue(KS+'LAST_SIZE',eTitle);
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
  var el = createEl('div',Attr), oL=gvar.fontoptions.length;
  var tClr,tFont,font;
  for (var idx=0; idx<oL; idx++) {
    font = gvar.fontoptions[idx];
    if(!isString(font)) continue; // should do this, coz Opera lil weirdo
    Attr={'class':'ofont',title:font};
    tClr = createEl('div',Attr);
    tFont = createEl('font',{face:font},font);
    Dom.add(tFont,tClr);
    on('click',tClr,function(e){
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
      setValue(KS+'LAST_FONT',sfont);
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
    var kolor=gvar.coloroptions[hex];
    var div = createEl('div',{style:'border:1px solid #CDA;background-color:'+kolor},'&nbsp;');
    var td = tr.insertCell(-1);   
    td.style.textAlign = "center";
    td.className = "ocolor";
    Dom.add(div,td);
    //td.cmd = obj.cmd;
    td.editorid = this.editorid;
    //td.controlkey = obj.id;
    td.title = td.colorname = kolor;
    td.id = "pick_color_"+td.colorname;
    
    on('click',td,function(e){
      e=e.target||e;
      if(e.nodeName=='DIV') e=e.parentNode;
      var etitle = e.id.replace('pick_color_','');
      do_insertTag('color',etitle);
      Dom.g(id).style.display='none';
      var bar=$D('#vB_Editor_001_color_bar');
      bar.style.backgroundColor=etitle;
      bar.setAttribute('title',etitle);
      gvar.settings.lastused.color = etitle;
      setValue(KS+'LAST_COLOR',etitle);
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
  on('blur',dumyEl,function(ec){
      if(!gvar.stillOnIt) 
      window.setTimeout(function() {
          ec=ec.target||ec;
          if(ec.nodeName=='INPUT') ec=ec.parentNode;
          ec.style.display='none';
        }, 500);
  });  
  on('mousedown',parent,function(ec){
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
  var re, torep, do_it_again='', fL=filter.length;
  // need a loop until it's really clean | no match patern
  while( do_it_again=='' || do_it_again.indexOf('1')!=-1 )
  {
    do_it_again = '';
    for(var idx=0; idx<fL; idx++){
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
    
    var sml,retbuf='', bL=buf.length;
    var sepr = ','; // must be used on extracting from storage
      for(var line=0; line<bL; line++){
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
    if(!buf.match(/\[\[([^\]]+)/gi))  // no containing necessary hash-tag ? -> getout
      return buf;
    var re,re_W, tag,done=false,lTag='',retag=[],maxstep=200; // avoid infinite loop, set for max step
    // prepared paired key and tag of custom image
    var paired=prep_paired_scustom();    
    while(!done && maxstep--){
      tag = /\[\[([^\]]+)/.exec(buf);
      //clog('in while. tag='+tag[1] );
      if( tag ){
        re_W = '\\[\\[' + tag[1].replace(/(\W)/g, '\\$1') + '\\]';
        re = new RegExp( re_W.toString() , "g"); // incase-sensitive and global, save the loop
        if( isDefined(tag[1]) && isDefined(paired['tag_'+tag[1]]) && tag[1]!=lTag ){      
            //clog('parsing['+tag[1]+']...');
          buf = buf.replace(re, '[IMG]'+paired['tag_'+tag[1]]+'[/IMG]');
          lTag = tag[1];
        }else{
          clog('no match tag for:'+tag[1]);
          buf = buf.replace(re, '\\[\\['+tag[1]+'\\]');
          retag.push(tag[1]);
        }
      }else{        
          done=true;
      }
    } // end while

    if(retag.length){
      clog('turing back');
      buf = buf.replace(/\\\[\\\[([^\]]+)\]/gm, function(S,$1){return('[['+$1.replace(/\\/g,'')+']')});
    }
  }
  clog('END='+buf);
  return buf;
}


// here we load and prep paired custom smiley to do parsing purpose
// make it compatible for old structure, which no containing <!!>
function prep_paired_scustom(){
   var grup,sml,idx=0,paired={};
   // preload smiliecustom database
   if(gvar.__DEBUG__) DOMTimer.start();
   if(!gvar.smiliecustom) rSRC.getSmileySet(true);
   for(var grup in gvar.smiliecustom){
     sml = gvar.smiliecustom[grup];
     /** gvar.smiliecustom[idx.toString()] = [parts[1], parts[0], parts[0]];
     # where :
     # idx= integer
     # gvar.smiliecustom[idx.toString()] = [link, tags, tags];
     */
     for(var j in sml){
        if(sml[j].toString().match(/^https?\:\/\//i)) {
           paired['tag_'+sml[j][1].toString()] = sml[j][0].toString();
           idx++;
        }        
     }
   }
   if(gvar.__DEBUG__) clog('End. Elapsed:'+DOMTimer.get());
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
  var endFocus=function(){ vB_textarea.focus(); return};
  if(isUndefined(pTag[tag])) return endFocus();;
  vB_textarea.init();
  
  if(tag=='quote' || tag=='code'){
    vB_textarea.wrapValue( tag );  
  }else if(tag=='spoiler'){
  
    var title = prompt('Please enter the TITLE of your Spoiler:', gvar.settings.lastused.sptitle );
    if(title==null) return endFocus();
    title = (title ? title : ' ');
    gvar.settings.lastused.sptitle = trimStr(title);
    setValue(KS+'LAST_SPTITLE', title);
    vB_textarea.wrapValue( 'spoiler', title );

  }else{
    var text, selected = vB_textarea.getSelectedText();
    var is_youtube_link = function(text){
        text = trimStr ( text ); //trim
        if(text.match(/youtube\.com\/watch\?v=[\w\d-]+/i)){
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
function do_TextStrike(){
  vB_textarea.init();
  var endFocus=function(){ vB_textarea.focus(); return false};
  var strikeEm=function(t){var pr=t.split(''), r='';for(var i=0;i<pr.length;i++) r+=pr[i]+'\u0336'; return String(r)};
  var selected = vB_textarea.getSelectedText(), text, ret='', realLen=0, prehead;  
  text=(selected!= '' ? selected : prompt('Please enter Text to strikethrough:', 'strikethrough') );  
  
  if(text==null) return endFocus();
  ret=strikeEm(text);
  prehead = [0,(text.length*2)];
  if(selected=='')
    vB_textarea.setValue( ret, prehead );
  else
    vB_textarea.replaceSelected( ret, prehead );
}
function do_resize_editor(e){
  e=e.target||e;
  if(isUndefined(vB_textarea.Obj)) vB_textarea.init();
  var o=vB_textarea.Obj, size_change = parseInt(60, 10);
  var change_direction = e.getAttribute('alt') == "Increase Size" ? 1 : -1;
  var newheight = parseInt(o.clientHeight) + (size_change*change_direction);
  o.style.height = (newheight >= 99 ? newheight : 99 ) + "px";
}

function event_ckck(){
       //clog('in event_ckck');
  if($D('#quickreply')) gvar.motion_target=$D('#quickreply');  
  on('mousemove',gvar.motion_target,function(){
      
      QRdp.check($D('#qr_delaycontainer'));
	  

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
    
    var tokill = ['textarea_clear','capcay_container','capcay_header'];
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
      setValue(KS+'TMP_TEXT',value.toString());
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
  var lastCollapse = getValue(KS+'QR_COLLAPSE');
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
     setValue(KS+'QR_COLLAPSE', (state ? 1:0));     
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
       dv=createEl('div',{id:'qravatar_refetch',style:'display:none;position:absolute;'},'&nbsp;<a class="cleanlink" href="./profile.php?do=editavatar" target="_blank">edit</a>&nbsp;-&nbsp;<a id="refetch" class="cleanlink" href="javascript:;">refetch</a>&nbsp;');
       Dom.add(dv,dvCon);
       Dom.add(dvCon,$D('#qravatar_cont'));
       
       on('mouseover',dvCon,function(){dv.style.display=''});
       on('mouseout',dvCon,function(){dv.style.display='none';});
       // change className behaviour when img is loaded
       if(Dom.g(avId))
        on('load',Dom.g(avId),function(){
         var cls;
         if(Dom.g(avId).clientWidth > 0)
            $D('#qravatar_cont').style.minWidth=Dom.g(avId).clientWidth.toString()+'px';
         on('mouseover',dvCon,function(){
           cls = 'qravatar_refetch_hover' + (Dom.g(avId).clientHeight==0 ? '_0':'').toString();
           $D('#qravatar_refetch').setAttribute('class',cls);
         });
         on('mouseout',dvCon,function(){
           cls = 'qravatar_refetch_hover' + (Dom.g(avId).clientHeight==0 ? '_0':'').toString();
           removeClass(cls, $D('#qravatar_refetch'));
         });
         controler_resizer();
        } );
      else
       controler_resizer();
       on('click',$D('#refetch'),function(){
         if($D('#fetching_avatar')) return;
         refetch_avatar();
       });   
         el=createEl('a',{href:'http:/'+'/www.kaskus.us/member.php?u='+gvar.user.id,'class':'cleanlink'},'<b><small>'+gvar.user.name+'</small>'+(gvar.user.isDonatur ? ' <span style="color:red;">[$]</span>':'')+'</b>');
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
  var cleanRet='', tL=temp.childNodes.length;
  for(var i=0; i<tL; i++){
     if(typeof(temp.childNodes[i])!='object') continue;
     cleanRet += temp.childNodes[i].nodeValue;
  }
  try{temp.removeChild(temp.firstChild);}catch(e){}
  return cleanRet;
}

function quote_parser(page){
   var parts;   
   // this regexp failed on symbolize userid : http://bit.ly/9A9GMg
   // match = /<textarea\sname=\"message\"(?:[^>]+.)([^<]+)*</i.exec(page); 
   
   // back to stone-age method :hammer:
   if(page.indexOf(gvar.id_textarea)==-1)
     return null;
   var pos = [ page.indexOf(gvar.id_textarea), page.lastIndexOf('</textarea') ];
   parts = page.substring(pos[0], pos[1]);
   pos[0] = parts.indexOf('>');
   parts = parts.substring( (pos[0]+1), parts.length);
   return (parts ? unescapeHtml(parts) : '');
}
function ajax_chk_newval(reply_html){
  // initialize 
  reply_html=(isDefined(reply_html) && reply_html ? reply_html : null);  
  if(!reply_html){
    if($D('#imgcapcay') && capcay_notloaded())
       $D('#imgcapcay').innerHTML='<div class="g_notice" style="display:block;font-size:9px;">'
        +'<img src="'+gvar.B.throbber_gif+'" border="0"/>&nbsp;Loading&nbsp;capcay<span id="imgcapcay_dots">...</span></div>';
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
    var re_event_btn = false;
    if(vB_textarea.content==gvar.silahken) vB_textarea.set('');
    if(rets===null){
       addClass('g_notice-error', notice);
       notice.innerHTML = 'Fetch failed, server might be busy. <a href="javascript:;" id="quote_now" title="Fetch Quoted Post ['+(!gvar.isOpera?'Alt+Q':'Ctrl+Alt+Q')+']">Try again</a>'
       + (' or <a href="javascript:;" id="deselect_them" title="Deselect Quoted Post [Ctrl+Shift+Q]">deselect them</a>.');
       re_event_btn = true;
       
    }else{
       vB_textarea.add(rets);     
       if(rets===''){
         addClass('g_notice-error', notice);
         notice.innerHTML = 'Nothing to fetch, quote post from another thread is not possible.'
         + (' <a href="javascript:;" id="deselect_them" title="Deselect Quoted Post [Ctrl+Shift+Q]">deselect them</a>.');
         re_event_btn = true;
       }else{
         re_event_btn = false;
         notice.innerHTML='';
         showhide(notice, false); // hide notice
         deselect_it(); // clear selected quotes
         vB_textarea.lastfocus();
         if(gvar.settings.textareaExpander[0])
           vB_textarea.setElastic(gvar.id_textarea, gvar.maxH_editor); // retrigger autogrow now
       }
    }
    if(re_event_btn){
       if($D('#quote_now'))
        on('click',$D('#quote_now'),function(){         
         vB_textarea.readonly();
         removeClass('g_notice-error', notice);
         notice.innerHTML = '<span id="current_fetch_post">Fetching...</span>';
         ajax_chk_newval();
        });
       if($D('#deselect_them'))
        on('click',$D('#deselect_them'),function(){
         removeClass('g_notice-error', notice);
         deselect_it();
        });
    }    
  }
}

// routine for fetching quoted post
function chk_newval(val){
  var tgt, notice = $D('#quoted_notice');
  if(val.length>1){
    removeClass('g_notice-error', notice);
    notice.innerHTML = 'You have selected one or more posts to quote. <a href="javascript:;" id="quote_now" title="Fetch Quoted Post ['+(!gvar.isOpera?'Alt+Q':'Ctrl+Alt+Q')+']">Quote these posts now</a>'
      + (' or <a href="javascript:;" id="deselect_them" title="Deselect Quoted Post [Ctrl+Shift+Q]">deselect them</a>.');
    notice.setAttribute('style','display:block;');
    on('click',$D('#quote_now'),function(){
      vB_textarea.init();
      vB_textarea.readonly();      
      notice.innerHTML = '<span id="current_fetch_post">Fetching...</span>';
      ajax_chk_newval();
    });
    on('click',$D('#deselect_them'),function(){deselect_it();});
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

function fetch_property(){
   var match=null;   
   gvar.page = gvar.newreply = match;
   gvar.securitytoken = $D('//input[@name="securitytoken"]', null, true);
   if(!gvar.securitytoken) return;
   gvar.securitytoken = gvar.securitytoken.value;
   
   gvar.threadid = $D('//a[contains(@href,"showthread.php?t=")]', null, true);
   match= (gvar.threadid ? /\Wt=(\d+)/.exec(gvar.threadid.href) : false);
   gvar.threadid = (match ? match[1] : "");
   
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
    var i, ksg = KS+gmkey;
    var info = getValue(ksg);
    if(!userID) return null;
    if(!info){
        setValue(ksg, userID+"="+value);
        return;
    }
    info = info.split(sp[0]);
    for(i=0; i<info.length; i++){
        if(info[i].split('=')[0]==userID){
            info.splice(i,1,userID+"="+value);
            setValue(ksg, info.join(sp[0]));
            return;
        }
    }
    info.splice(i,0,userID+"="+value);
    setValue(ksg, info.join(sp[0]));
}
//values stored in format "userID=value;..."
// sp = array of records separator
function getValueForId(userID, gmkey, sp){
    sp = [(isDefined(sp) && typeof(sp[0])=='string' ? sp[0] : ';'), (isDefined(sp) && typeof(sp[1])=='string' ? sp[1] : '::')];    
    var info = getValue(KS+gmkey);
    if(!info || !userID)
      return null;
    info = info.split(sp[0]);
    for(var i=0; i<info.length; i++){
        if(!isString(info[i])) continue;
        var recs = info[i].split('=');
        if(recs[0]==userID){
            var rets = [userID];
            var values = recs[1].split(sp[1]), vL=values.length;
            for(var idx=0; idx<vL; idx++){
              if(!isString(values[idx])) continue;
              rets.push(values[idx]);
            }
            return rets;
        }
    }
    return null;
}
function delValueForId(userID, gmkey){
  var ksg = KS+gmkey;
  var info = getValue(ksg);
  info = info.split(';'); var tmp=[];
  for(var i=0; i<info.length; i++){
    if(info[i].split('=')[0]!=userID)
      tmp.push(info[i]);    
  }
  setValue(ksg, tmp.join(';'));
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

// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return (typeof(x)=='string' && x ? x.replace(/^\s+|\s+$/g,"") : '') };
function isLink(x) { return x.match(/((?:http(?:s|)|ftp):\/\/)(?:\w|\W)+(?:\.)(?:\w|\W)+/); }

function on(m,e,f){Dom.Ev(e,m,function(e){typeof(f)=='function'?f(e):void(0)});}
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
function do_an_e(A) {
  if (!A) {
      window.event.returnValue = false;
      window.event.cancelBubble = true;
      return window.event
  } else {
      A.stopPropagation();
      A.preventDefault();
      return A
  }
}
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
function GetWidth(){
  var y = 0;
  if (self.innerWidth){ // FF; Opera; Chrome
     y = self.innerWidth;
  } else if (document.documentElement && document.documentElement.clientWidth){ 
     y = document.documentElement.clientWidth;
  } else if (document.body){
     y = document.body.clientWidth;
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
function selectAll(e){
   e=e.target||e;
   if(typeof(e)!='object') return false;
   var end = e.value.length;
   e.setSelectionRange(0,end);
}
function getValue(key) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_getValue(key,data[0]));
}
function setValue(key, value) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_setValue(key,value));
}
function delValue(key){try{GM_deleteValue(key);}catch(e){}}
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
   catch(e){ clog('Error. elem.dispatchEvent is not function.'+e)}
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
var inArray = Array.prototype.indexOf ?
  function(A,f){var p=A.indexOf(f);return(p!==-1?p:false)} :
  function(A,f){for(var i=-1,j=A.length;++i<j;)if(A[i] === f) return i;return false};
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
var Avatar = {
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
    if(vB_textarea.overflow!='hidden') this.Obj.scrollTop = (this.last_scrollTop+1);
    return bufValue; 
  },
  wrapValue : function(tag, title){
    var start=this.cursorPos[0], end=this.cursorPos[1],bufValue;
    tag = tag.toUpperCase();
    
    bufValue = this.subStr(0, start) + 
       '['+tag+(title?'='+title:'')+']' + 
        (start==end ? '' : this.subStr(start, end)) + 
       '[/'+tag+']' + this.subStr(end, this.content.length);
    
    this.set(bufValue);
    var st2 = (start + ('['+tag+(title?'='+title:'')+']').length);
    this.setCaretPos( st2, st2+this.subStr(start, end).length );    
    if(vB_textarea.overflow!='hidden') this.Obj.scrollTop = (this.last_scrollTop+1);
    return bufValue; 
  },
  replaceSelected : function(text, ptpos){
    var start=this.cursorPos[0];
    var end=this.cursorPos[1];
    if(start==end) return;    
    var bufValue = this.subStr(0, start) + text + this.subStr(end, this.content.length);
    this.set(bufValue);
    this.setCaretPos( (start + ptpos[0]), (start+ptpos[1]) );
    if(vB_textarea.overflow!='hidden') this.Obj.scrollTop = (this.last_scrollTop+1);
  },

  setElastic: function(tid,max,winrez){
    if(isUndefined(tid)) tid=gvar.id_textarea;
    function setCols_Elastic(max){var a=Dom.g(tid);a.setAttribute("cols",Math.floor(a.clientWidth/7));setRows_Elastic(max)}
    function setRows_Elastic(max){var a=Dom.g(tid),c=a.cols,b=a.value.toString(),h;b=b.replace(/(?:\r\n|\r|\n)/g,"\n");for(var d=2,e=0,f=0;f<b.length;f++){var g=b.charAt(f);e++;if(g=="\n"||e==c){d++;e=0}}h=(d*14);a.setAttribute("rows",d);a.style.height=h+"pt";vB_textarea.oflow=(max&&(d*14>max)? 'auto':'hidden');a.style.setProperty('overflow',vB_textarea.oflow,'');}/*134*/
    var a=Dom.g(tid) || this.Obj;
    vB_textarea.oflow='hidden';
    a.setAttribute('style','overflow:'+vB_textarea.oflow+';letter-spacing:0;line-height:14pt;'+(max?'max-height:'+max+'pt;':''));
    if( !winrez ) on('keyup',a,function(){setCols_Elastic(max)});
    window.setTimeout(function(){setCols_Elastic(max)}, 110);
  }
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
// utk delay post (30sec) notify
var QRdp = {
  // QR delay post 
  key: KS+"QR_LASTPOST"
 ,defDelay: 32 // seconds; assumed 32 sec; fact is 30 sec
 ,getLast:function(){return getValue(QRdp.key)}
 ,updLast:function(x){return setValue(QRdp.key, x)}
 ,check:function(tgt,delay){    
    delay=delay || QRdp.defDelay;
    var lastP = parseInt( QRdp.getLast() );    
    if(lastP > 0){
      QRdp.selisih = Math.floor( (new Date().getTime()-(lastP+(delay*1000)) ) / 1000 );
      if( isUndefined(QRdp.countDown) && tgt && tgt.style.display=='none' && QRdp.selisih <= 0 ){
         QRdp.tgt = tgt;
         tgt.style.display = '';
         QRdp.countDown = Math.abs(QRdp.selisih);
         window.setTimeout( function(){QRdp.showCounter()}, 1000);
	  }
	} 


 }
 ,writeTgt:function(tgt,val){
    if(tgt) tgt.innerHTML = '[ <span class="qr-delaypost">'+val+'</span> ]';
  }
 ,showCounter:function(){
    var tgt=QRdp.tgt;
    QRdp.writeTgt(tgt,QRdp.countDown);
    if(QRdp.countDown == 0){
      delete QRdp.countDown;
      delValue(QRdp.key);
      if(tgt){
       tgt.innerHTML = '';
       tgt.style.display = 'none';
	  }	  

    }else{
      QRdp.countDown--;
      window.setTimeout( function(){QRdp.showCounter()}, 1000);
    }
 }
};
// utk cek update (one_day = 1000*60*60*24 = 86400000 ms) // milisecs * seconds * minutes * hours
// customized from FFixer & userscript_updater
var Updater = {
  caller:''
 ,check: function(forced){
    if(isDefined(isQR_PLUS) && isQR_PLUS!==0) return;
    var intval = (1000*60*60*gvar.settings.updates_interval);
    if((forced)||(parseInt(getValue(KS+"QR_LastUpdate", "0")) + parseInt(intval) <= (new Date().getTime()))) {
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
    setValue(KS+"QR_LastUpdate", new Date().getTime() + "");
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
    on('click',$D('#upd_close'),function(){
       Dom.remove('upd_cnt');
    });    
    on('click',$D('#upd_notify_lnk'),function(){
       if($D('#upd_cnt'))
         Dom.remove('upd_cnt');
       else{         
         Updater.notify_progres();
         Updater.check(true);
       }
    });    
    on('click',$D('#do_update'),function(){  
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
      on('click',$D('#nfo_version'),function(){ alert( gvar.titlename+'\n== Last LOG Update ==' + Updater.meta.news );});
    }
    
    Updater.notify_done(true);
 }
  
 ,notify_progres: function(caller){
    if($D('#upd_notify'))
      $D('#upd_notify').innerHTML = '<img style="margin-left:10px;" id="fetch_update" src="'+gvar.B.throbber_gif+'" border="0"/>';
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

// global smiley loader
var SML_LDR = {
  init: function(scID,smlset){
    var dumycont, target=Dom.g(scID);
    target.innerHTML='';
    
    SML_LDR.scID = scID;
    SML_LDR.smlset = smlset;
    
    if(scID=='scustom_container')
      $D('#scustom_container').style.setProperty('max-width',(Dom.g(gvar.id_textarea).clientWidth-135)+'px','');
    SML_LDR.tgt_content='content_'+scID+(scID=='scustom_container' && gvar.smiliegroup ?'_'+gvar.smiliegroup[0]:'');
    SML_LDR.realcont=realcont = createEl('div',{id:SML_LDR.tgt_content,style:'display:none;'});
    
    if( !$D('#loader_'+SML_LDR.scID) ){
     dumycont = createEl('div',{id:'loader_'+scID},'<img src="'+gvar.B.throbber_gif+'" border="0"/>&nbsp;<small>loading...</small>');
     Dom.add(dumycont,target);
    }else{
     $D('#loader_'+SML_LDR.scID).style.display='';
    }
    Dom.add(realcont,target);
    SML_LDR.load(smlset);
  }
 ,load: function(smlset, idx){
    var adclass = (gvar.settings.scustom_alt ? 'ofont qrsmallfont nothumb' : 'scustom-thumb'), RC=SML_LDR.realcont;
    var Attr,img,imgEl2,imgEl=false,countSmiley=0;
    if(isUndefined(idx)) idx=0;
    if( SML_LDR.scID=='scustom_container' && gvar.smiliegroup && isDefined(smlset[gvar.smiliegroup[idx].toString()]) )
       smlset = smlset[gvar.smiliegroup[idx].toString()];

    for(var i in smlset) {
        img=smlset[i];
        if( !isString(img) ){
          if(SML_LDR.scID=='scustom_container'){
            Attr={href:encodeURI(img[0]),title:'[['+img[1]+'] '+HtmlUnicodeDecode('&#8212;')+img[0],
                  src:img[0], alt:'_alt_'+img[1],'class':adclass };
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
          on('click',imgEl,function(e){ 
             var C = e; e=e.target||e; do_smile(e); 
             try{do_an_e(C);return false;}catch(ev){} 
          });
          Dom.add(imgEl,RC);
          countSmiley++;
       
        }else { // this is string and do replace to suitable value
          var sep,retEl=validTag(img, true, 'view');
          if(!retEl) continue;
          if(retEl.nodeName=='B'){
            if(RC.innerHTML!='') {
             sep = createEl('br', {});
             Dom.add(sep,RC);
            }
            Dom.add(retEl,RC);
            sep = createEl('br', {});
            Dom.add(sep,RC);
          }else{
            Dom.add(retEl,RC);
          }
        }
    } // end for
    
    SML_LDR.praload(countSmiley,imgEl);
  }
 ,praload: function(countSmiley, lastEl){
    var RC=SML_LDR.realcont;
    //if(isUndefined(deadEnd)) deadEnd=false;
    // make a dummy last-img that, avoid bad img on last element
    if( SML_LDR.scID=='scustom_container' && !gvar.settings.scustom_alt) {
        imgEl = createEl('a',{href:'javascript:;',style:'display:none;'});
        //Attr = {alt:'dummy_last_img', src:gvar.domainstatic + 'images/editor/separator.gif' + '?'+String( Math.random() ).replace('0.','')};
        Attr = {alt:'dummy_last_img', src:gvar.domainstatic + 'images/editor/separator.gif'};
        imgEl2 = createEl('img',Attr);
        Dom.add(imgEl2,imgEl);
        Dom.add(imgEl,RC);
    }else{
       imgEl=lastEl;
    }
    
    if(countSmiley<=0){
      var el = $D('#loader_'+SML_LDR.scID);
      if(el) el.style.display='none';
      RC.innerHTML = 'No Images found';
      RC.style.display='';
    } else {
      if(imgEl){
       // find last element
       var showContent = function(){
          el=$D('#loader_'+SML_LDR.scID);
          if(el) el.style.display='none';
          var remote = $D('#remote_'+SML_LDR.scID);
          el = $D('#'+SML_LDR.tgt_content);
          if(el) el.style.display='';
          if(remote.className=='current') {
              el = $D('#wrap_'+SML_LDR.scID); // wrapper for scustom smiley
              if(el) el.style.display='';
          }
       };
       if( imgEl.firstChild && imgEl.firstChild.nodeName=='#text' || imgEl.height){
          showContent();
       }else{
          // imgEl will be IMG when scustom_alt=0, and TEXT when scustom_alt=1 
          if(imgEl.nodeName=='A') imgEl=imgEl.firstChild;
          on('load',imgEl,function(){showContent()});
          // obj has beed loaded before this line executed
          if(imgEl.height) showContent();
       }
      } // end of imgEl (lastImg)
    }
    // custom images ?
    if(SML_LDR.scID=='scustom_container' && !$D('#custom_bottom') ) SML_LDR.custom.initCustom();
  }
  
 ,custom:{
    initCustom: function(){
      var par,cL,el,el2,tit,cont=createEl('div',{id:'custom_bottom',style:'margin:5px 0 8px 0;'});
      clog('initCustom');
      SML_LDR.smlset=gvar.smiliecustom;
      el = createEl('input',{id:'current_grup', type:'hidden',value:(gvar.smiliegroup ? gvar.smiliegroup[0]:'')}); Dom.add(el,cont);
      el = createEl('input',{id:'current_order',type:'hidden',value:(gvar.smiliegroup ? '0':'')}); Dom.add(el,cont);
      // ekstrak all group
      SML_LDR.custom.tab_menu_left();
      
      el = createEl('a',{id:'manage_btn',href:'javascript:;','class':'twbtn twbtn-m lilbutton',style:'padding:1px 5px;'+(gvar.smiliegroup ? '':'display:none;')},'Manage');
      Dom.add(el,cont);
      on('click',el,function(e){e=e.target||e;SML_LDR.custom.manage(e)});
	  el = createEl('span',{id:'title_group',style:'margin-left:8px;font-weight:bold'},(gvar.smiliegroup ? gvar.smiliegroup[0]:'') );
      Dom.add(el,cont);
	  
      el = createEl('a',{id:'manage_cancel',href:'javascript:;','class':'twbtn twbtn-m lilbutton',style:'padding:1px 5px;margin-left:5px;display:none;'},'Cancel');
      Dom.add(el,cont);
      on('click',el,function(){
        var mcPar=$D('#manage_container');
        if(mcPar) Dom.remove(mcPar);
        SML_LDR.custom.toggle_manage();
      });
      el = createEl('a',{id:'manage_help',href:'javascript:;','class':'twbtn twbtn-m lilbutton', style:'padding:1px 5px;margin-left:20px;display:none;',title:'RTFM'}, '[ ? ]');
      Dom.add(el,cont);
      on('click',el,function(e){
      alert( ''
        +'Each Smiley separated by newline.\nFormat per line:\n tag|smileylink'
        +'\n eg.\ncheers|http:/'+'/static.kaskus.us/images/smilies/sumbangan/smiley_beer.gif'
        +(!gvar.settings.scustom_noparse ? ''
        +'\n\nUse Custom Smiley BBCODE with this format:'
        +'\n eg.\n[[yourtag]'
        :'') + '')
      });    
      
      // bikin div kosong utk add group
      el = createEl('div',{id:'add_content_'+SML_LDR.scID,style:'display:none;'}); //No Images found
      Dom.add(el,$D('#right_'+SML_LDR.scID));
      if($D('#right_'+SML_LDR.scID))
        $D('#right_'+SML_LDR.scID).insertBefore(cont,$D('#right_'+SML_LDR.scID).firstChild);
	  
	  
    }
   ,tab_menu_left: function(){
      cL=(gvar.smiliegroup ? gvar.smiliegroup.length:0);
      if(par=$D('#ul_group')) {
        clog('refresh group mnu');
       $D('#ul_group').innerHTML = '';
       el = createEl('li',{'class':'qrtab add_group'}); 
       el2 = createEl('a',{href:'javascript:;',title:'Add Group','class':'add_group'},'Add Group');
       on('click',el,function(e){SML_LDR.custom.add_group(e)});
       Dom.add(el2,el); Dom.add(el,par);
       el = createEl('li',{}); el2=createEl('div',{style:'height:2px'}); 
       Dom.add(el2,el); Dom.add(el,par);
       
       for(var i=0; i<cL;i++){
          el = createEl('li',{'class':'qrtab'+(i==0 ? ' current':'')}); 
          el2 = createEl('a',{id:'tbgrup_'+i,href:'javascript:;',title:gvar.smiliegroup[i]}, gvar.smiliegroup[i].substring(0,10)+(gvar.smiliegroup[i].length>10?'..':''));
          on('click',el2,function(e){
            e=e.target||e;
            if(e.nodeName!='A') return;
            try{if(e.parentNode.className.indexOf('current')!=-1)return;}catch(ei){};
            var idx=e.id.replace(/tbgrup_/,''),tgt=$D('#content_scustom_container_'+gvar.smiliegroup[idx]);
            var lis=$D('.qrtab', $D('#ul_group'));
            if(lis.length > 0){
              if($D('#scustom_container'))
                 $D('#scustom_container').style.setProperty('max-width',(Dom.g(gvar.id_textarea).clientWidth-135)+'px','');
              SML_LDR.custom.switch_tab(e.title);
              if($D('#current_grup')) $D('#current_grup').value=e.title;
              if($D('#current_order')) $D('#current_order').value=SML_LDR.custom.find_index(e.title);
              rSRC.getSmileySet(true);
              SML_LDR.smlset = gvar.smiliecustom[e.title.toString()];
              SML_LDR.realcont=tgt;
              window.setTimeout(function() {
                SML_LDR.load(SML_LDR.smlset, $D('#current_order').value);              
              }, 10);
            }
          });
          Dom.add(el2,el); Dom.add(el,par);
          
          if(i>0){ //content_scustom_container
            el = createEl('div',{id:'content_scustom_container'+'_'+gvar.smiliegroup[i],style:'display:none;'});
            Dom.add(el, $D('#scustom_container'));
          }          
       }// end for
       
      }
      if(!gvar.smiliegroup && $D('#manage_btn')) $D('#manage_btn').style.display='none';
    }
   ,close_edit: function(callback){
     // close manage activity || reqrite instead of simulate click on cancel
      var mcPar=$D('#manage_container');
      if(mcPar) Dom.remove(mcPar);
      SML_LDR.custom.toggle_manage();      
      //callback if any
      if(typeof(callback)=='function') callback();
    }
   ,find_index: function(label){
      for(var k=0;k<gvar.smiliegroup.length; k++)
        if(gvar.smiliegroup[k]==label){return k;break;}
    }
   ,switch_tab: function(label){
      var lis=$D('.qrtab', $D('#ul_group')),csc='content_'+SML_LDR.scID;
      if(lis.length > 0){
        for(var j=0; j<lis.length; j++){
          var ch=getTag('a',lis[j])[0], idx=(ch.id ? ch.id.replace(/tbgrup_/,''):'')
          ,dvC=(lis[j].className.indexOf('add_group')!=-1?'add_':'') + csc + (idx && gvar.smiliegroup ? '_'+gvar.smiliegroup[idx]:'');
          dvC=$D('#'+dvC);
          if(label && ch.title && ch.title.indexOf(label)==-1){
            removeClass('current', lis[j]);
            if(dvC) dvC.innerHTML='';
          }else{
            addClass('current', lis[j]);
            if(dvC) dvC.style.display='block';
			if($D('#title_group')) $D('#title_group').innerHTML = ch.title.replace(/_/g,'&nbsp;');
          }
        } // end for
      }
    }
   ,add_group: function(e){
      e=e.target||e;
      if($D('#current_grup')) $D('#current_grup').value='';
      if($D('#current_order')) $D('#current_order').value='';
      // save last position
      var lp = $D('.current', $D('#ul_group')),cucok=(lp.length>0 ? /id=[\'\"]tbgrup_([^\'\"]+)[\'\"]/i.exec(lp[0].innerHTML.toString()) : false);
      gvar.lastpost_grupmnu = (cucok ? cucok[1] : '0');
      SML_LDR.custom.switch_tab(e.innerHTML);
      if($D('manage_btn')) SML_LDR.custom.manage($D('manage_btn'));      
    }
   ,toggle_manage: function(flag){
        if(isUndefined(flag)) flag = ($D('manage_btn') && $D('manage_btn').innerHTML=='Manage');
        if($D('manage_btn')) $D('manage_btn').innerHTML=(flag?'Save':'Manage');
        $D('#manage_btn').style.display = (!gvar.smiliegroup ? (flag ? '':'none') : '');
        /*to show*/
        if($D('#manage_help')) $D('#manage_help').style.display=(flag?'':'none');
        if($D('#manage_cancel')) $D('#manage_cancel').style.display=(flag?'':'none');
        if($D('#dv_menu_disabler')) $D('#dv_menu_disabler').style.display=(flag?'':'none');
        /*to hide*/
        if($D('#scustom_container')) $D('#scustom_container').style.display=(flag?'none':'');
        if($D('#title_group')) $D('#title_group').style.display=(flag?'none':'');		
        if(!flag && $D('#current_grup') && $D('#current_grup').value==''){ // cancel from add grup
           var L = (gvar.lastpost_grupmnu?gvar.lastpost_grupmnu:'0');
           if($D('#tbgrup_'+L)) SimulateMouse($D('#tbgrup_'+L), 'click', true);
        }
    }
   ,delete_group: function(){
      var cGrp=$D('#current_grup').value, yadeh=confirm('You are about to delete this Group.\n'+'Name: '+cGrp+'\n\nAffirmative, proceed delete this group?\n');
      if(yadeh){
        SML_LDR.custom.manage_save(cGrp);
      }
    }
   ,manage: function(e){
     var imgtxta,obj,obj2,buff='',cont_id=SML_LDR.scID,task = e.innerHTML;
     if(task!='Manage'){
        SML_LDR.custom.manage_save();
     }else{
          var smlset=false;
          if($D('#current_order').value!='' && gvar.smiliegroup){
            rSRC.getSmileySet(true);
            smlset = gvar.smiliecustom[gvar.smiliegroup[$D('#current_order').value].toString()];
          }
          var generateGrup = function(){
            if($D('#current_order').value!='' && gvar.smiliegroup) 
              return gvar.smiliegroup[$D('#current_order').value];
            var isAvail = function(g){
                if(!gvar.smiliegroup) return true;
                var ret=false;
                for(var k=0;k<gvar.smiliegroup.length;k++){if(gvar.smiliegroup[k]!=g){ret=true;break;}}
                return ret;
            };            
            var nG = 'new_group_'+Math.floor(Math.random()*100),MX=10,oK=isAvail(nG);
            if(!oK) while(!oK && MX--){
              nG = 'untitled_'+Math.floor(Math.random()*100)
              oK=isAvail(nG);
            }
            return nG;
          }; // end generateGrup
          if(smlset){
            var ret;
            for (var i in smlset) {
             img=smlset[i]; ret='';
             if( !isString(img) )
               buff+=img[1]+'|'+img[0]+'\n';
             else if(ret=validTag(img, false, 'editor') )
               buff+=ret;
            }
            SML_LDR.custom.lastload=buff;
          }
          
          var mcPar = createEl('div',{id:'manage_container'});
          Dom.add(mcPar, $D('#right_'+cont_id));
          Attr = {'class':'smallfont'};
          obj = createEl('div',Attr,'&nbsp;<b>'+($D('#current_grup') && $D('#current_grup').value==''?'Add ':'')+'Group</b>:&nbsp;');
          Attr = {id:'input_grupname','class':'input_title',title:'Group Name',style:'width:200px',value:generateGrup()};
          obj2 = createEl('input',Attr);
          on('keydown',obj2,function(e){var C=(!e?window.event:e);if(C.keyCode==13){C = do_an_e(C);SML_LDR.custom.manage_save();}else{return C;}});
          on('focus',obj2,function(e){selectAll(e)});
          Dom.add(obj2,obj);          
          if($D('#current_order').value!=''){ // not add group?
            Attr = {id:'delete_grupname',href:'javascript:;','class':'smallfont',style:'margin-left:20px;color:red;',title:'Delete this Group'};
            obj2 = createEl('a',Attr,'delete');
            on('click',obj2,function(){SML_LDR.custom.delete_group()});
            Dom.add(obj2,obj);
          }
          Dom.add(obj,mcPar);
          
          Attr = {id:'textarea_'+cont_id,'class':'textarea txta_smileyset'};
          imgtxta = createEl('textarea',Attr,buff);
          Dom.add(imgtxta,mcPar);
          
          Attr = {'for':'scustom_alt',title:'Checked: Use tag instead of thumbnail'};
          obj = createEl('label',Attr,'Don\'t create thumbnail');
          Attr = {id:'scustom_alt',type:'checkbox'};
          if(gvar.settings.scustom_alt) Attr.checked = 'checked';
          obj2 = createEl('input',Attr);
          Dom.add(obj2,obj); Dom.add(obj,mcPar);
          
          Attr = {'for':'scustom_noparse',title:'Checked: custom smiley tag will not parsed'};
          obj = createEl('label',Attr,'&nbsp;&nbsp;&nbsp;Don\'t parse custom tag');
          Attr = {id:'scustom_noparse',type:'checkbox'};
          if(gvar.settings.scustom_noparse) Attr.checked = 'checked';
          obj2 = createEl('input',Attr);
          Dom.add(obj2,obj); Dom.add(obj,mcPar);
          SML_LDR.custom.toggle_manage();
          window.setTimeout(function() {
            try{imgtxta.focus();}catch(e){}
          }, 50);
     }
    }
   ,manage_save: function(todel){
        // task save 
        var mcPar=$D('#manage_container'),buff=false,cont_id=SML_LDR.scID;
        var    lastVal = [getValue(KS+'SCUSTOM_ALT'), getValue(KS+'SCUSTOM_NOPARSE')];
        var remixBuff = function(niubuf, nodel){
           // ['<!>','<!!>']; 
           var ret='',curG=[$D('#current_order').value, $D('#current_grup').value],grup;
           var cleanGrup = function(){
             return trimStr($D('#input_grupname').value.replace(/[^a-z0-9]/gi,'_').replace(/_{2,}/g,'_'));
           };grup=cleanGrup();
           var ch_grup, CS=getValue(KS+'CUSTOM_SMILEY'), CRaw=CS.split('<!>'), CR_OBJ={}, part;
           for(var n=0;n<CRaw.length;n++){
             part=CRaw[n].split('<!!>');
             CR_OBJ[String(part[0])]=String(part[1]);
           }
           ch_grup=(curG[1]!='' && grup!='' && grup!=curG[1]);
           if(curG[0]!='' && curG[1]!='' && gvar.smiliegroup){
             for(var k=0;k<gvar.smiliegroup.length;k++){
                if(gvar.smiliegroup[k]==curG[1]){
                  if(nodel){
                   CR_OBJ[gvar.smiliegroup[k].toString()] = niubuf.toString();
                   grup=trimStr(ch_grup ? cleanGrup() : curG[1]).replace(/\!/g,'\\!');
                  }else{
                   grup=false;
                  }
                }else{
                   grup=gvar.smiliegroup[k];
                }
                ret+=(grup ? grup.toString()+'<!!>'+CR_OBJ[gvar.smiliegroup[k].toString()]+( (k+1)<gvar.smiliegroup.length?'<!>':'') : '');
             }
           }else{
             var joined=false;
             if(gvar.smiliegroup) for(var k=0;k<gvar.smiliegroup.length;k++){
                joined=joined||(gvar.smiliegroup[k]==grup);
                ret+=gvar.smiliegroup[k].toString()+'<!!>'+CR_OBJ[gvar.smiliegroup[k].toString()] +(joined ? niubuf.toString():'') + ( (k+1)<gvar.smiliegroup.length?'<!>':'');
             }
             if(!joined) ret+='<!>'+grup.toString()+'<!!>'+niubuf.toString();
           }
           return ret;
        };
        if(isUndefined(todel)){
          imgtxta = $D('#textarea_'+cont_id);
          if(imgtxta) buff = do_filter_scustom(imgtxta.value).toString();
          gvar.settings.scustom_alt = ($D('#scustom_alt') && $D('#scustom_alt').checked);
          gvar.settings.scustom_noparse = ($D('#scustom_noparse') && $D('#scustom_noparse').checked);
        }else{
          buff='delete-group';
        }
        if(trimStr($D('#input_grupname').value)==''){
           alert('Group Name can not be empty');
        } else
           //clog('lastsave=\n'+lastsave+'\n\ncurrent=\n'+buff+'\n\n\nchanged?\n'+(buff && lastsave!=buff));
          if( (buff && SML_LDR.custom.lastload!=buff) || lastVal[0]!=gvar.settings.scustom_alt || lastVal[1]!=gvar.settings.scustom_noparse ) {
            setValue(KS+'SCUSTOM_ALT', (gvar.settings.scustom_alt ? '1':'0') ); //save custom alt
            setValue(KS+'SCUSTOM_NOPARSE', (gvar.settings.scustom_noparse ? '1':'0') ); //save custom parser            
            setValue(KS+'CUSTOM_SMILEY', remixBuff(buff, (isUndefined(todel)) )); //save custom smiley            
        }
        // cold-boot
        delete(gvar.smiliegroup); // require to refresh left mnu
        rSRC.getSmileySet(true); // load only custom        
        SML_LDR.custom.toggle_manage();
        if($D('#right_scustom_container')) $D('#right_scustom_container').innerHTML='<div id="scustom_container"></div>';
        window.setTimeout(function() {
            SML_LDR.init(cont_id,gvar.smiliecustom);
            SML_LDR.custom.tab_menu_left();
        }, 200);
    } //end manage_save
 } // end custom
};
// end SML_LDR
// global var for settings
var ST = {
  init_setting: function(){
    loadLayer( rSRC.getTPL_Preview, 'settings' );
    toogleLayerDiv('hideshow'); // show the layer
    ST.fill_TPL_Setting();
    popupLayer_positioning(); // recalibrate popup position
    
    ST.event_settings();
    ST.load_rawsetting();
  }
 ,event_settings: function(){
    // main left-tab
    var elSet, par, el = $D('.qrtab');
    for(var i=0; i<el.length; i++)
      if($D(el[i])) on('click',el[i],function(e){ ST.switch_tab(e); });
    if($D('#tab_close')) on('click',$D('#tab_close'),function(){ ST.close_setting(); });
    
    // general & controller
    if($D('#save_settings')) on('click',$D('#save_settings'),function(){ ST.save_setting(); } );
    if($D('#chk_select_all')) on('click',$D('#chk_select_all'),function(e){ ST.chkbox_select_all(e, 'visibility_container'); });
    
    // having child set
    elSet = ['misc_updates','misc_autoshow_smile','misc_hotkey'], cL=elSet.length;
    for(var i=0;i<cL;i++)
       if(Dom.g(elSet[i])) on('click',Dom.g(elSet[i]),function(e){ ST.toggle_childs(e); });
    elSet = ['misc_autolayout_sigi','misc_autolayout_tpl'], cL=elSet.length;
    for(var i=0;i<cL;i++)
       if(Dom.g(elSet[i])) on('click',Dom.g(elSet[i]),function(e){ ST.toggle_autolayout(e); });
    
    elSet = ['edit_sigi','edit_tpl'], cL=elSet.length;
    for(var i=0;i<cL;i++)
       if(Dom.g(elSet[i])) on('click',Dom.g(elSet[i]),function(e){ ST.toggle_editLayout(e); });
    if($D('#misc_hotkey')) on('click',$D('#misc_hotkey'),function(e){
       e=e.target||e;
       if(e && !e.checked){
          var elSet = ['misc_hotkey_ctrl','misc_hotkey_alt','misc_hotkey_shift'], cL=elSet.length;
          for(var i=0; i<cL; i++) if( Dom.g(elSet[i]) ) Dom.g(elSet[i]).checked=false;
          if( Dom.g(elSet[cL-1]) ) Dom.g(elSet[cL-1]).disabled='disabled';
       }
    });
    elSet = ['misc_hotkey_ctrl','misc_hotkey_alt','misc_hotkey_char'], cL=elSet.length;
    for(var i=0;i<cL;i++)
       if(Dom.g(elSet[i])) on('click',Dom.g(elSet[i]),function(e){ ST.precheck_shift(e); });
       try { // check noCrossDomain and/or isOpera
     if(!gvar.noCrossDomain && $D('#chk_upd_now') ) // unavailable on Chrome|Opera still T_T
      on('click',$D('#chk_upd_now'),  function(e){
        if($D('#fetch_update')) return; // there is a fetch update in progress
        if($D('#upd_cnt')) Dom.remove($D('#upd_cnt'));
        Updater.notify_progres('chk_upd_now');
        Updater.check(true);
      });
    }catch(e){ show_alert(e);};
    // event for input nodes inside #general_control
    par = $D('#general_control');
    var alNod = getTag('input', par), aL=alNod.length;
    if(alNod && alNod.length > 0) for(var idx=0; idx<aL; idx++){
        if(typeof(alNod[idx])=='object') on('keydown',alNod[idx],function(e){
          var C = (!e ? window.event : e );
          if(C.keyCode==13){ // mijit enter
            C = do_an_e(C);
            ST.save_setting();
          }else{
            return C;
          }
        });
    }
    
    // customable_btn jmp to #tab_general
    if($D('#customable_btn')) on('click',$D('#customable_btn'),function(){
     var e=$D('#tab_general'), ea=getTag('a',e); if(ea.length>0) ST.switch_tab(ea[0]);
    });
    // ex-imp        
    if($D('#textarea_rawdata')) {
        el = $D('#textarea_rawdata');
        on('focus',el,function(e){selectAll(e)});
        on('dblclick',el,function(e){selectAll(e)});
        on('keyup',el,function(){
          if(isDefined(gvar.raw_data_changed) && gvar.raw_data_changed) return;
          var tgt=$D('#textarea_rawdata');
          if(tgt && gvar.buftxt && tgt.value!=gvar.buftxt){
            if($D('#fsize')) $D('#fsize').innerHTML = ' <b title="Raw Data Changed" style="color:#FFFF00;">*</b>';
              gvar.raw_data_changed = true;
          }
        });
    }
    if($D('#fn_qr_set')) on('focus',$D('#fn_qr_set'),function(e){selectAll(e)});
    if($D('#import_setting')) on('click',$D('#import_setting'), function(){ST.import_setting()});
    if($D('#reset_default')) on('click',$D('#reset_default'),function(){ST.reset_setting()});
    if($D('#exim_select_all')) on('click',$D('#exim_select_all'),function(){ 
      var tgt=$D('#textarea_rawdata'); 
      if(tgt) {
        if(gvar.isBuggedChrome)
          selectAll(tgt);
        else
          tgt.focus();
      }
    });
      
    // m3h
    if(isDefined($D('.nostyle')[0])) on('click',$D('.nostyle')[0],function(){window.open(gvar.domain+'mem'+'ber.ph'+'p?u=3'+'02'+'101');return;});
 } // end event_settings
 
 ,close_setting: function(){
    //  wanna do sumthin before closing.?
    closeLayerBox('hideshow');
 }
 ,cold_boot_qr: function(){
    getSettings(); // redefine gvar
    ST.close_setting()
    
    if(!gvar.settings.textareaExpander[0] && $D(gvar.id_textarea))
       gvar.lastHeight_textarea = $D(gvar.id_textarea).style.height;
    
    // destroy all qr, on !restart
    if(!gvar.restart)
      Dom.remove($D('#quickreply'));
    // -- Restart Main with new settings--
    if($D('#qr_maincontainer'))
       $D('#qr_maincontainer').innerHTML = '';
    start_Main();
    // --
 }
 ,load_rawsetting: function(){
    // collect all settings from storage,. 
    var keys  = [ 'LAST_FONT','LAST_COLOR','LAST_SIZE','LAST_SPTITLE','LAST_UPLOADER','UPDATES','UPDATES_INTERVAL','DYNAMIC_QR','AJAXPOST'
                 ,'SAVED_AVATAR','HIDE_AVATAR','HIDE_CONTROLLER','TEXTA_EXPANDER','SHOW_SMILE'
                 ,'WIDE_THREAD','QR_COLLAPSE'
                 ,'QR_HOTKEY_KEY','QR_HOTKEY_CHAR'
                 ,'LAYOUT_CONFIG','LAYOUT_SIGI','LAYOUT_TPL'
                 ,'SCUSTOM_ALT','CUSTOM_SMILEY','SCUSTOM_NOPARSE'
                ];
    var kL=keys.length;
    var keykomeng = {
      'LAST_FONT':'Last Used Font'
     ,'LAST_COLOR':'Last Used Color'
     ,'LAST_SIZE':'Last Used Size'
     ,'LAST_SPTITLE':'Last Used Spoiler Title'
     ,'LAST_UPLOADER':'Last Used Host Uploader'
     ,'UPDATES':'Check Update enabled? validValue=[1,0]'
     ,'UPDATES_INTERVAL':'Check update Interval (day); validValue=[0< interval < 99]'
     ,'DYNAMIC_QR':'Mode QR Dynamic; validValue=[1,0]'
     ,'AJAXPOST':'Mode AjaxPost; validValue=[1,0]'
     ,'SAVED_AVATAR':'Buffer of logged in user avatar; [userid=username::avatar_filename]'
     ,'HIDE_AVATAR':'Mode Show Avatar. validValue=[1,0]'
     ,'HIDE_CONTROLLER':'Mode Show Controller; validValue=[1,0]'
     ,'TEXTA_EXPANDER':'Textarea Expander preferences; [isEnabled,minHeight,maxHeight]; validValue1=[1,0]; validValue2=>75; validValue3=<2048'
     ,'SHOW_SMILE':'Autoload smiley; [isEnable,smileytype]; validValue1=[1,0]; validValue2=[kecil,besar,custom]'
     ,'WIDE_THREAD':'Expand thread with css_fixup; validValue=[1,0]'
     ,'QR_COLLAPSE':'Mode QR collapsed; validValue=[1,0]'
     ,'QR_HOTKEY_KEY':'Key of QR-Hotkey; [Ctrl,Shift,Alt]; validValue=[1,0]'
     ,'QR_HOTKEY_CHAR':'Char of QR-Hotkey; validValue=[A-Z0-9]'
     ,'LAYOUT_CONFIG':'Layout Config; [userid=isEnable_autoSIGI,isEnable_autoTEMPLATE]; isEnable\'s validValue=[1,0]'
     ,'LAYOUT_SIGI':'Layout Signature; [userid=SIGI];'
     ,'LAYOUT_TPL':'Layout Template; [userid=TEMPLATE]; TEMPLATE\'s validValue must contain escaped string {MESSAGE}'
     ,'SCUSTOM_ALT':'Smiley Custom use Alt instead of thumbnail; validValue=[1,0]'
     ,'CUSTOM_SMILEY':'Smiley Custom\'s Raw-Data; [tagname|smileylink]'
     ,'SCUSTOM_NOPARSE':'Smiley Custom Tags will not be parsed; validValue=[1,0]'
    };
    var getToday = function(){var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];var d=new Date();return(d.getFullYear().toString() +'-'+ ((d.getMonth()+1).toString().length==1?'0':'')+(d.getMonth()+1)+'-'+(d.getDate().toString().length==1?'0':'')+d.getDate()+', '+days[d.getDay()]+'. '+(d.getHours().toString().length==1?'0':'')+d.getHours()+':'+(d.getMinutes().toString().length==1?'0':'')+d.getMinutes()+':'+(d.getSeconds().toString().length==1?'0':'')+d.getSeconds());};
    var parse_UA_Vers = function(){
      return ( window.navigator.userAgent.replace(/\s*\((?:[^\)]+).\s*/g,' ').replace(/\//g,'-') );
    };
    gvar.buftxt = '# QR-Settings Raw-Data'+'\n';
    gvar.buftxt+= '# Version: QR'+(isQR_PLUS!==0?'+':'')+' '+gvar.sversion+'\n';
    gvar.buftxt+= '# Source: http://'+ 'userscripts.org/scripts/show/'+gvar.scriptMeta.scriptID+'\n';
    gvar.buftxt+= '# User-Agent: '+parse_UA_Vers()+'\n';
    gvar.buftxt+= '# Date-Taken: '+getToday()+'\n';
    gvar.buftxt+= '\n';
    for(var i=0; i<kL; i++){
      try { if( isString(keys[i]) && getValue(KS+keys[i]) ){
              if( isDefined(keykomeng[keys[i]]) )
                 gvar.buftxt+= '# '+keykomeng[keys[i]]+'\n';
              gvar.buftxt+='['+keys[i]+']'+'\n'+getValue(KS + keys[i]) + '\n\n';        
            }
      } catch(e){}
    }
    if($D('#fsize')) $D('#fsize').innerHTML = ' <small>(Estimated: '+gvar.buftxt.length+' bytes)</small>';
    if($D('#textarea_rawdata')) $D('#textarea_rawdata').value = gvar.buftxt;    
 }
 ,import_setting: function(){
    
    var raw, tgt = $D('#textarea_rawdata');
    if(!tgt) return;
    $D('#import_setting').setAttribute('disabled','disabled');
    raw = trimStr(tgt.value);
    if( gvar.buftxt && raw==trimStr(gvar.buftxt) ){
       $D('#import_setting').value='Nothing changed. Closing...';
       if(gvar.buftxt) delete(gvar.buftxt);
       window.setTimeout(function() { ST.close_setting() }, 800);
       return;
    }else{
      var msg = ''
        +'Are you sure you want to update these settings?'+'\n'
        +'Your current settings will be lost.'+'\n\n'
        +'Page may need to reload to apply new Settings.'+'\n';
      var yakin = confirm(msg);
      if(!yakin) {
        $D('#import_setting').removeAttribute('disabled');
        return;
      }
      $D('#import_setting').value=' Saving... ';      
    }        
    raw = raw.split('\n'), rL=raw.length;
    var cucok, diff=false, lastkey = false;
    for(var line=0; line<rL; line++){
      var newval = trimStr(raw[line]);
      if( cucok = newval.match(/^\[([^\]]+)]/) ){
        // is this a defined key?
        cucok[1] = trimStr(cucok[1]);
        lastkey = (isDefined(OPTIONS_BOX[KS+cucok[1]]) ? cucok[1] : false); // only allow registered key
      
      }else if(lastkey && newval && !newval.match(/^\#\s(?:\w.+)*/)){
        // is lastkey is defined, newval is not blank and is not a komeng
        try{ setValue(KS+lastkey, newval.toString() ); }catch(e){};
        lastkey = false; // flushed, find next key
      }
    } // end for
    // check & save text on TMP_TEXT before reload-page
    if(value=vB_textarea.Obj.value){
      if(value && value!=gvar.silahken)
        setValue(KS+'TMP_TEXT',value.toString());
    }
    window.setTimeout(function() {
      gvar.restart=true;
      // ==
      window.setTimeout(function() { ST.cold_boot_qr(); }, 350);
      // ==
    }, 300);
 } // end import_setting
 
 ,reset_setting: function(){
    var home=['http:/'+'/www.kaskus.us/showthread.php?t=3170414','http:/'+'/userscripts.org/topics/58227'];
    var space = '';
    for(var i=0;i<20;i++) space+=' ';
    var csmiley = (getValue(KS+'CUSTOM_SMILEY').replace(/^\s+|\n|\s+$/g,"")!='');
    var msg = ''
     +( (getValue(KS+'CUSTOM_SMILEY').replace(/^\s+|\n|\s+$/g,"")!='') ?
         HtmlUnicodeDecode('&#182;') + ' ::Alert::\nCustom Smiley detected. You should consider it.\n\n' 
      : '')
     +'This will delete/reset all saved data.\nThings that might be conflict with your QR.'     
     +'\nPlease report any bug or some bad side effects here:'+space+'\n'+home[1]+'\nor\n'+home[0]+
     '\n\n'+HtmlUnicodeDecode('&#187;')+' Continue with Reset?';
    var yakin = confirm(msg);
    if(yakin) {
      var keys = ['SAVED_AVATAR','LAST_FONT','LAST_COLOR','LAST_SIZE','LAST_SPTITLE','LAST_UPLOADER','HIDE_AVATAR','UPDATES_INTERVAL','UPDATES','DYNAMIC_QR'
	              ,'AJAXPOST','HIDE_CONTROLLER','CUSTOM_SMILEY','TMP_TEXT','SCUSTOM_ALT','SCUSTOM_NOPARSE','TEXTA_EXPANDER'
                  ,'SHOW_SMILE','QR_HOTKEY_KEY','QR_HOTKEY_CHAR'
                  ,'LAYOUT_CONFIG','LAYOUT_SIGI','LAYOUT_TPL'
                  ,'QR_LastUpdate','WIDE_THREAD','QR_COLLAPSE'
                 ];
      var kL=keys.length;
      for(var i=0; i<kL; i++){
        try{ if(isString(keys[i])) GM_deleteValue(KS + keys[i]); }catch(e){}        
      }
      window.setTimeout(function() { location.reload(false); }, 300);
    }
 }
 ,isEditingLayout: function(){
    var elSet = ['edit_sigi','edit_tpl'], cL=elSet.length;
    for(var i=0; i<cL; i++){
      if( Dom.g(elSet[i]) && Dom.g(elSet[i]).innerHTML!='edit' )
        SimulateMouse(Dom.g(elSet[i]), 'click', true);
    }
  }
 ,save_setting: function(){
    var par, value, misc, oL, Chr='';
    
    ST.isEditingLayout();    // auto-SET `em before Saving performed
    gvar.restart=true;
    if($D('#save_settings')) $D('#save_settings').value=' Saving... ';
    misc = ['misc_hotkey_ctrl','misc_hotkey_shift','misc_hotkey_alt'];    
    var reserved_CSA = [(!gvar.isOpera ? '0,0,1' : '1,0,1'), '1,1,0']; /* Alt+Q OR Ctrl+Alt+Q -- Ctrl+Shift+Q */
    
    oL=misc.length;
    value = [];
    for(var id=0; id<oL; id++){
      if(!isString(misc[id])) continue;
      par = Dom.g(misc[id]);
      if(par) value.push( par.checked ? '1' : '0' );  
    }
    value = value.toString();
    par = $D('#misc_hotkey_char');
    if(par) Chr=par.value.toUpperCase();
    if( Chr=='Q' && (reserved_CSA[0]==value || reserved_CSA[1]==value) ){ // bentrok
      var koreksi = confirm('Hotkey is already reserved:\n ['+(!gvar.isOpera ? 'Alt + Q':'Ctrl + Alt +Q')+'] : Fetch Quoted Post\n [Ctrl + Shift + Q] : Deselect Quote\n\nDo you want to make a correction?');
      if(koreksi) return;
    }
    if(isUndefined(koreksi) ) {// save only when ga bentrok reserved
      setValue(KS+'QR_HOTKEY_KEY',value);      
      if( Chr=='' || Chr.match(/[A-Z0-9]{1}/) ){
        gvar.settings.hotkeychar=Chr;
        setValue(KS+'QR_HOTKEY_CHAR',Chr.toString());
      }
    }
    // saving serial controller
    par = getTag('input',$D('#main_controller'));    
    if(par){
      oL=par.length; value = [];
      for(var i=0; i<oL; i++)
        value.push(par[i].checked ? '1' : '0');
      setValue(KS+'HIDE_CONTROLLER',value.toString());
    }
    // saving updates; avatar; dynamic
    misc = {
       'misc_updates':KS+'UPDATES'
      ,'misc_hideavatar':KS+'HIDE_AVATAR'
      ,'misc_dynamic':KS+'DYNAMIC_QR'
      ,'misc_ajaxpost':KS+'AJAXPOST'
    };
    for(var id in misc){
      if(!isString(misc[id])) continue;
      par = Dom.g(id);
      if(par) setValue( misc[id], (par.checked ? '1' : '0').toString() );
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
    setValue(KS+'TEXTA_EXPANDER', value.toString());
    // saving autoshow_smiley
    value = [];
    misc = ['kecil','besar','custom'];
    oL=misc.length;
    par = $D('#misc_autoshow_smile');
    if(par) value.push(par.checked ? '1':'0');
    for(var id=0; id<oL; id++){
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
    oL=misc.length;
    value = [];
    for(var i=0; i<oL; i++){
      if(!isString(misc[i])) continue;
      value.push(Dom.g(misc[i]).checked ? '1' : '0');
    }
    setValueForId(gvar.user.id, value.toString(), 'LAYOUT_CONFIG'); //save layout
    
    // set temporarty text
    value=vB_textarea.Obj.value;
    if(value) setValue(KS+'TMP_TEXT', value );
    window.setTimeout(function() {
      gvar.restart=true;
      // ==
      window.setTimeout(function() { ST.cold_boot_qr(); }, 150);
      // ==
    }, (gvar.isOpera ? 50:300));    
    
 } // end save_setting
 ,toggle_childs: function(e){
  e=e.target||e;
  if(typeof(e)!='object' || (e && !e.id) || (e && e.getAttribute('type')!='checkbox') ) return;
  var disp=e.checked, tgt=e.id+'_child';  
  if(Dom.g(tgt))
    Dom.g(tgt).style.setProperty('display',(disp ? '':'none'),'important');  
 }
 ,precheck_shift: function(e){
  e=e.target||e;
  if(typeof(e)!='object') return;
  var hVal=''; var hChk=true;
  if(e.getAttribute('type')!='text'){
    var tgt = 'misc_hotkey_shift';
    var id = e.id.replace('misc_hotkey_','');
    var sId = 'misc_hotkey_'+(id=='ctrl' ? 'alt' : 'ctrl'); // their sibling Id, tetangga-nya    
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
 ,toggle_autolayout: function(e){
  e=e.target||e;
  if(typeof(e)!='object' || (e && !e.id) || (e && e.getAttribute('type')!='checkbox') ) return;
  var disp=e.checked;
  var tgt='edit_'+e.id.replace(/misc_autolayout_/,'')+'_cancel';
  if(!disp && Dom.g(tgt) && Dom.g(tgt).className.indexOf('cancel_layout-invi')==-1)
    SimulateMouse(Dom.g(tgt), 'click', true);
 }
 ,cancelLayout: function(e){
  e=e.target||e; var tgt = e.id.replace('_cancel','')+'_Editor';
  Dom.g(tgt).innerHTML=''; addClass('cancel_layout-invi', e );
 }
 ,toggle_editLayout: function(e){
  e=e.target||e;
  if(typeof(e)!='object') return;
  var todo=e.innerHTML; // edit | set
  var value, task=e.id; // sigi | tpl
  var el_cancel = Dom.g(task+'_cancel');  
  var genTxta = function(_task, value){
    var tgt = Dom.g(_task+'_Editor'); tgt.innerHTML='';
    var el = createEl('textarea',{id:_task+'_txta'}, value);
    Dom.add(el, tgt); tgt.setAttribute('style','display:;margin-top:3px;');
    vB_textarea.setElastic(_task+'_txta',75);
    window.setTimeout(function(e) { try{Dom.g(_task+'_txta').focus();}catch(e){} }, 100);
  };  
  if(todo=='edit'){    
    var uLayout = gvar.settings.userLayout;
    var tgtID = task.replace(/edit_/,'misc_autolayout_');
    switch(task){
    case "edit_sigi":
      genTxta(task, uLayout.signature);
    break;
    case "edit_tpl":
      genTxta(task, uLayout.template);
    break;
    };    
    removeClass('cancel_layout-invi', el_cancel );
    if(Dom.g(tgtID) && !Dom.g(tgtID).checked) Dom.g(tgtID).checked = true;
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
    on('click',el_cancel,function(ec){ 
     ec=ec.target||ec; var tgt = ec.id.replace('_cancel','')+'_Editor';
     Dom.g(tgt).innerHTML=''; addClass('cancel_layout-invi', ec );
     e.innerHTML='edit';
    });
  }  
 }
 ,chkbox_select_all: function(e, parent){
    var chk, els, par = Dom.g(parent);
    e = e.target||e;
    chk = e.checked;
    els = getTag('input', par);
    if(!els || !par) return;
    if(els.length > 0){
       for(var i=0; i<els.length; i++)
         els[i].checked = (chk ? true : false);
    }
 }
 ,switch_tab: function(e){
    e=e.target||e;
    if(e.nodeName!='A') return;
    var elc, el, par, cnt, cid;
    cid = e.parentNode.id;
    el = $D('.qrtab', $D('#qrset_menu')); elc = $D('.qrset-content');
    if(el && el.length > 0 && elc && elc.length > 0){
        cnt = el.length;
        for(var i=0; i<cnt; i++ ){
          if(!el[i] || !el[i].id) continue;
          ccid = el[i].id.replace(/^tab_/, 'tbcon_');
          elc = $D('#'+ccid);
          if(el[i].id != cid){
            removeClass('current', el[i]);
            if(elc) removeClass('qrset-show', elc);
          }else{
            addClass('current', el[i]);
            if(elc) addClass('qrset-show', elc);
          }
        }       
        if($D('#general_control')) 
          $D('#general_control').style.setProperty('display', (cid!='tab_general' && cid!='tab_control' ? 'none' : ''), 'important');
        if($D('#fsize')) $D('#fsize').style.display = (cid=='tab_eximp' ? '' : 'none');
    }
 }
 ,fill_TPL_Setting: function(){
    if($D('#preview_content')) $D('#preview_content').innerHTML = rSRC.getTPL_Settings();
    if($D('#subtitle')) $D('#subtitle').innerHTML = ''
        +'[&nbsp;<a class="cyellow" href="./member.php?u='+gvar.user.id+'" target="_blank">'
        + gvar.user.name+'</a>'+(gvar.user.isDonatur ? ' <b style="color:red;">[$]</b>':'')+'&nbsp;]';
 }
}; // end ST; Settings
//end ST
// global var for uploader
var UPL = {
  uploader:{}
 ,parent:''
 ,init_uploader:function(tgId){
    var tgt=$D('#'+tgId);
    UPL.parent=tgId;
	if(tgt.innerHTML!='') return;
    UPL.prop=gvar.uploader;
    if( isDefined(gvar.iframeLoaded) )
       delete(gvar.iframeLoaded);	   

    // create form DOM upload
    UPL.attach_form();
    
    tgt.innerHTML = rSRC.getTPL_inerUploader();
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
    var g=function(i){return Dom.g(i)},el=g("btn_upload");
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

        Attr={id:'label_file','class':'cabinet'}; el=createEl('label',Attr);
        Attr={id:'userfile',name:UPL.prop[gvar.upload_tipe]['ifile'],'class':'file',type:'file'};
        el2=createEl('input',Attr);
        on('change',el2,function(e){
          e=e.target||e;
          if($D("#legend_subtitle")) $D("#legend_subtitle").innerHTML= ' '+HtmlUnicodeDecode('&#8592;') + ' ' + basename(e.value);
        });
        Dom.add(el2,el); Dom.add(el,par);
        Attr={id:'btn_upload',value:'Upload','class':'twbtn twbtn-m',type:'button',title:'Upload now ..',style:'display:inline;margin:1px 0 0 10px;'};
        el=createEl('input',Attr);
        on('click',el,function(){UPL.prep_upload()});
        Dom.add(el,par);
        
        Attr={id:'cancel_upload',value:'Cancel','class':'twbtn twbtn-m',type:'button',style:'margin:1px 0 0 20px;display:none;'}
        el=createEl('input',Attr);
        on('click',el,function(){UPL.cancel_upload()});
        Dom.add(el,par);
      }
      
      Attr={style:'margin-top:7px;font-weight:bold;font-size:10px;'+(allow_cross ? 'float:right;':'display:inline')}; el=createEl('div',Attr);
      Attr={href:'javascript:;','class':'twbtn twbtn-m','onclick':'this.blur()'}; el2=createEl('a',Attr,'Toogle IFrame');
      on('click',el2,function(){return UPL.toogle_iframe()});
      Dom.add(el2,el); Dom.add(el,par);
	  
	  if(!allow_cross){
	    Attr={'class':'g_notice-error qrsmallfont',style:'width:60%; display:inline; position:absolute;margin:-3px 0  0 10px;'};
        el=createEl('div',Attr,'Sorry, this site is not allowing cross-domain submission, click <b>Toggle IFrame</b> to load it then do things inside the iframe');
        Dom.add(el,par);
	  }
      
      Attr={style:'display:none;',src:'about:blank',name:'target_upload',scrolling:'auto',id:'target_upload'};
      el=createEl('iframe',Attr);
      on('load',el,function(){UPL.reset_onloadIframe()});
      Dom.add(el,par);
    }
  }
 ,do_postBack: function(name, url){
    var Attr,el,frmAct=Dom.g('frmPageAction');
    var hdEl=UPL.getNativeId('hid_cont',frmAct,'input'),fn,gg=HtmlUnicodeDecode('&#187;');
    var inputElm=UPL.getNativeId(name,frmAct,'input'),host=UPL.prop[gvar.upload_tipe]['src'];
    if(typeof(inputElm)=='object')
        Dom.remove(inputElm);
    inputElm = Dom.g(name);
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
    if(el) el.innerHTML='Uploading '+gg+(Dom.g("userfile")?' ['+fn+']':'')+' '+gg+' '+host.substring(0,(host.indexOf('/')!=-1 ? host.indexOf('/'):host.length));
    
    Dom.remove(inputElm);
    
    UPL.rebuild_inputfile();
    el=$D('#userfile');
    el.style.display='none';    
  }
 ,check_submitform: function(){
    var file_id='userfile', par=Dom.g('frmPageAction'), inputElm = (par ? UPL.getNativeId(file_id,par,'input') : null);
    if(inputElm && typeof(inputElm)=='object')
       Dom.remove(inputElm);
    else
       inputElm = Dom.g(file_id);    
    var allowed_ext = ['jpg','jpeg','gif','png','zip','rar'], fn=inputElm.value;
    var ext = fn.substr(fn.lastIndexOf('.') + 1).toLowerCase();
    clog(allowed_ext +'; '+ext);
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
    Dom.g("legend_subtitle").innerHTML='';
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
      el=createEl('input',Attr);
      on('change',el,function(e){
        e=e.target||e;
        if($D("#legend_subtitle")) $D("#legend_subtitle").innerHTML= ' '+HtmlUnicodeDecode('&#8592;') + ' ' + basename(e.value);
      });
      Dom.add(el,par);
    }
  }
 ,rebuild_selectHost: function(els){
    
    var Attr,iner,el,sel=createEl('select',{id:'sel_host',title:'Image Host',style:'font-weight:bold;color:#0000FF'});
    var ret=createEl('div',{id:'par_sel_host',style:'display:inline-block;margin-right:5px;border:1px solid #BBC7CE;padding-left:3px;',});
    el=createEl('div',{style:'float:left;font-weight:bold;margin-top:4px;color:#0000FF'},'<a id="host_link" href="http://'+UPL.prop[gvar.upload_tipe]['src'].replace(/\?no_multi.+/i,'')+'">Host</a> :&nbsp;');
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
      el=createEl('option',Attr,iner);
      Dom.add(el,sel);
    }
    Dom.add(sel,ret);
    return ret;
  }
 ,rebuild_hidden: function(els){
    if(isUndefined(els))
      els = UPL.prop[gvar.upload_tipe]['hids'];
    var Attr,el,ret=createEl('div',{id:'hid_cont'});
    if(els) for(var nm in els){
      if(!isString(els[nm])) continue;
      Attr={type:'hidden',name:nm,value:els[nm]};
      el=createEl('input', Attr);
      Dom.add(el,ret);
    }
    return ret;
  }
 ,attach_form: function(){
    var el,dv,frm,Attr={enctype:'multipart/form-data',action:'',target:'target_upload',method:'post',id:'frmPageAction',name:'frmPageAction'};
    frm = createEl('form', Attr);    
    el = UPL.rebuild_hidden();
    Attr={type:'submit',id:'fake_submit_btn',value:'',style:'border:0;background:transparent;position:absolute;left:-100000;top:-9999;visibility:hidden'};
    el=createEl('input', Attr); Dom.add(el,frm); 
    Dom.add(frm,getTag('body')[0]);    
  }
};
//end UPL
/* Modified Smooth scroller
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
// utk manipulate kueh
var cK={
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
var DOMTimer={
 start:function(){var dT=new Date();this.dtStart=dT.getTime()},
 get:function(){var nT=new Date();return(nT.getTime()-this.dtStart)}
};

// main resource
var rSRC = {
  getCSS_fixup: function(){
 /* | ------------------------------------------------ | */
 /* |          (Lite) Kaskus Fix-ups by chaox          | */
 /* | ------------------------------------------------ | */
  return (''  
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
  +'');
 }
 ,getCSS: function(){
  // CSS for Quick Reply
  return (''
  +'.qr_container{max-width:100%;width:auto !important;margin:5px;text-align:left;}'
  +'.normal_notice{background:transparent !important;color:#949494;}'
  +'.alt1{border-bottom:1px solid transparent;}'
  +'.quoteselected{background:#DFC;border-bottom:1px solid #CDA;}'
  +'.g_notice{display:none;padding:.4em;margin-bottom:3px;font-size:11px;background:#DFC;border:1px solid #CDA;line-height:16px;}'
  +'.g_notice-error{background:#FFD7FF !important;}'
  +'.avafetch{display:block;margin:0 5px 0 0;padding:0.3px 5px;font-size:9px;line-height:12px;}'
  +'#vbform .tborder{width:100%;}'
  +'#atoggle{float:right;}'
   
  +'.panelsurrounds .panel, .imagebutton{background:#DFDFE0;}'
  +'.controlbar{text-align:left;}'
  +'.popup_pickbutton{border-color:#C1D2EE;width:10px;}'
  +'.ofont:hover, .ocolor:hover, .osize:hover, .cdefault:hover, .popup_pickbutton:hover{cursor:default !important;}'
  +'.imagebutton:hover, .imagebutton_color:hover{cursor:pointer;}'
  +'.imagebutton_color table{border:1px solid #fff;background-color:#DFDFE0;}'
  +'.imagebutton_color:hover table, .ofont:hover, .osize:hover{border:1px solid #2085C1;background-color:#B0DAF2;}'
  +'.imagebutton_color:hover .popup_feedback{border-right:1px solid #316AC5;}'  
  +'#vB_Editor_001_font_out, #vB_Editor_001_size_out{font-size:8pt;padding:2px;}'
   
  +'.MYvBulletin_editor table, #vbform .tborder{min-width:100%;}'
  +'.MYvBulletin_editor table td{vertical-align:top;}'
  +'#qravatar_cont, #capcay_container, .qrsmallfont, .qrsmallfont div, #capcay_header span{font-size:11px;}'
  +'#capcay_container{min-width:131px;width:305px;}'
  +'#qravatar_cont{text-align:center;padding-right:5px;min-width:100px;max-width:120px;}'
  +'.txta_cont{min-width:100%;width:100%;padding-right:5px;}'
  +'#'+ gvar.id_textarea +'{min-width:100%;}'
  +'.textarea{width:100%;min-height:95px;}'
  +'#dv_accessible'
   +'{cursor:default;text-align:center;border:1px solid #949494;position:absolute;padding:10px 50px 10px 10px;background:#FDECC8;width:auto;margin:20px 10px;}'
  +'.icon-accessible{cursor:pointer;position:absolute;margin:-3px 0 0 5px;}'
  +'.txa_enable, .txa_readonly{border:1px solid #949494;}'
  +'.txa_enable{background-color:#FFF;color:#000;}'
  +'.txa_readonly{background-color:#E8E8E8;color:#4F4F4F;}'   
   
  +'.g_notice a, .qrsmallfont a, #capcay_header a{font-size:11px;text-decoration:none;}'
  +'#home_link{text-decoration:underline;}'
  +'.cleanlink{text-decoration:none;}'
  +'.qravatar_refetch_hover_0{margin-top:0;}'
  +'.qravatar_refetch_hover{margin-top:-15px;}'
  +'#qravatar_refetch{background:#DFC;border:1px solid #CDA;font-size:9px;}'
  +'.warn{color:#FF0000;font-size:9px;}'
  +'.input_title, .textarea{border:1px solid #B1B1B1;}'
  +'.input_title:focus, .textarea:focus{border:1px solid #275C7C;}'
  +'#capcay_header{padding:0 2px;vertical-align:bottom;}'
  +'.fieldset{margin:0;padding:0;}'
  +'#fieldset_capcay .bginput, #nfolink{margin:0;padding:0;float:right;}'
  +'#fieldset_capcay .bginput{margin:1px 2px 1px 0;}'
  +'.reado{color:#808080;background:#E5E5E5;border:1px solid #8A8A8A;}'
  +'.sub-bottom{min-width:200px;font-size:10px;color:#40404;}'
  +'.sayapkiri{float:left;text-align:left;}'
  +'.sayapkanan{float:right;text-align:right;}'
  +'.sayapkanan a{text-decoration:none;float:right;margin-top:3px;}'
   
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
  
  +'.spacer{clear:both;height:2px;}'
  
  +'#wrap_suploader_container, #wrap_suploader_container .fieldset, #skecil_container, #sbesar_container, #scustom_container, #wrap_scustom_container'
   +'{border: 1px solid #BBC7CE;padding:2px;}'
  +'#scustom_container{padding:2px 1px!important;word-wrap:break-word}'
  +'#skecil_container img, #sbesar_container img, #scustom_container img'
   +'{margin:0 1px;border:1px solid transparent;max-width:120px; max-height:120px;}'
  +'#skecil_container img:hover, #sbesar_container img:hover, #scustom_container img:hover, #nfo_version:hover'
   +'{cursor:pointer;border:1px solid #2085C1;background-color:#B0DAF2;}'
  +'#content_scustom_container .ofont{text-decoration:none;cursor:pointer}'
  +'#content_scustom_container .nothumb{padding:1px 3px;}'
  +'#content_scustom_container .scustom-thumb{margin-left:2px;}'
  +'.ul_tabsmile'
   +'{list-style:none;padding:0;height:1em;margin:'+(gvar.isOpera||gvar.isBuggedChrome?'5px 0 2px 2px':'2px 0 3px 2px')+';}'
  +'.ul_tabsmile li{display:inline;margin-left:3px;}'
  +'li.tab_close{float:right !important;}'
  +'.ul_tabsmile a, #sel_host'
   +'{border:1px solid #BBC7CE;background-color:#C4C4C4;padding:3px;text-decoration:none;border-bottom:0;font-size:8pt;outline:none}'
  +'.ul_tabsmile a:hover, #sel_host:hover{background-color:#B0DAF2;}'
  +'.ul_tabsmile a.current, .ul_tabsmile a.current:hover, .qbutton:hover{background-color:#DDDDDD;}'
  +'.qbutton'
   +'{padding:1px 3px;border:1px solid #1E67C1;background-color:#C7C7C7; color:#000; text-decoration:none; border-radius:3px; -moz-border-radius:3px; -khtml-border-radius:3px; -webkit-border-radius:3px;}'
  +'#hideshow textarea{width:98%;font-family:"Courier New";font-size:9pt;}'
  +'.cancel_layout {margin-left:10px}'
  +'.cancel_layout-invi {display:none;}'
  /* for delay */
  +'#qr_delaycontainer{padding-right:5px;color:#FFFF00}'
  
  /* for updates */
  +'.qrdialog{border-bottom:1px transparent;width:100%;left:0px;bottom:0px;padding:3px;}'
  +'.qrdialog-close{padding:5px;margin:5px 15px 0 0;cursor:pointer;float:right;}'
  +'.qrdialog-child'
   +'{background:#BFFFBF; border:1px solid #9F9F9F; height:30px;width:400px;margin-left:3px;padding:.2em .5em;font-size:8pt;border-radius:5px;-moz-border-radius:5px;-khtml-border-radius:5px;-webkit-border-radius:5px; box-shadow:3px 3px 15px #888;-moz-box-shadow:3px 3px 15px #888;-khtml-box-shadow:3px 3px 15px #888;-webkit-box-shadow:3px 3px 15px #888;}'
  
  /* for uploader */ 
    +'label.cabinet{display:inline-block;padding-top:3px}'
    +'#uparent_container{position:relative;padding:1px 0 6px 3px;width:99%;}'
    +'#target_upload{margin-top:2px;width:100%;height:318px;border: 2px outset;clear:left;display:block;}'    
    
  /* for popup new settings */ 
      +'.qrset-alt2 {border-right: 1px solid rgb(209, 209, 225); border-left: 1px solid rgb(209, 209, 225); border-width: 0px 2px; border-style: none solid; border-color: -moz-use-text-color rgb(209, 209, 225); width:120px;padding:0!important;}'
      +'qrset-alt1 {border-right: 1px solid rgb(209, 209, 225);}'
    
      +'ul.qrset-menu { margin:0; padding:0;  }'
      +'ul.qrset-menu {width: 150px;}'
      +'ul.qrset-menu li {list-style-type:none; border-top:1px solid #ccc; padding:0; }'
    +'ul.qrset-menu li.current {padding:0;}'
    +'ul.qrset-menu li.current a, ul.qrset-menu li.current a.add_group{background:#3b5998;color:#fff!important;font-weight:bold;}'
    +'ul.qrset-menu li a { background:#eee; display:block; padding:10px 0.5em; text-align:right; text-decoration:none; outline:none; color:#333;}'
    +'ul.qrset-menu li a:hover { background:#0066CC; color:#fff;}'
    +'li.qrset-lasttab { border-bottom:1px solid #ccc; }'
    +'li.qrset-close { position:absolute; bottom:22px; font-size:11px;width:150px;border-bottom:1px solid #ccc;}'
    +'li.qrset-close a{ text-align:center!important;font-weight:bold;}'
    +'.qrtab a, li.qrset-close a{font-size:11px;}'
    +'.qroutline{ border:1px solid #9F9F9F; margin:-3px 5px; padding:5px; height:420px;}'
    +'.qrset-content{ display:none;}'
    +'.qrset-content label{ padding-left:2px;}'
    +'.qrset-content br { margin:4px 0;}'
    +'.qrset-show{display:block!important;}'
    +'a.lilbutton{padding:1px 5px; 2px 5px!important;text-shadow:none;font-size:11px;}'
    +'.opr{color:#D20000;}'
    +'a.cyellow{color:#F0F000!important;}'
    +'a.nostyle, a.nostyle:hover{color:#333;outline:none;}'
    /* scustom container */
    +'#custom_bottom {padding-top:2px;min-height:8px;}'
    +'#content_scustom_container {padding:2px 6px;}'
    +'#ul_group a.add_group{color:#0000E6;font-weight:bold;}'
    +'#ul_group a.add_group:hover{color:#E6E6E6;}'
    +'#ul_group{width:125px;}'
    +'#ul_group li a{text-align:center;padding:3px 0.5em;}'
    
    /* twitter's button */
    +'.twbtn{background:#ddd url("'+gvar.B.twbutton_gif+'") repeat-x 0 0;font:11px/14px "Lucida Grande",sans-serif;width:auto;margin:0;overflow:visible;padding:0;border-width:1px;border-style:solid;border-color:#999;border-bottom-color:#888;-moz-border-radius:4px;-khtml-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;color:#333;cursor:pointer;} .twbtn::-moz-focus-inner{padding:0;border:0;}.twbtn:hover,.twbtn:focus,button.twbtn:hover,button.twbtn:focus{border-color:#999 #999 #888;background-position:0 -6px;color:#000;text-decoration:none;} .twbtn-m{background-position:0 -200px;font-size:12px;font-weight:bold;line-height:10px!important;padding:5px 10px; -moz-border-radius:5px;-khtml-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;margin:-4px 0 -3px 0;} a.twbtn{text-decoration:none;} .twbtn:active,.twbtn:focus,button.twbtn:active{background-image:none!important;text-shadow:none!important;outline:none!important;}.twbtn-disabled{opacity:.6;filter:alpha(opacity=60);background-image:none;cursor:default!important;}'
  
  /* for preview popup */ 
      +'#hideshow, #hideshow_recaptcha{position:absolute; min-width:100%; min-height:100%; top:0; left:0;}'
    +'.trfade, .fade{position:fixed; width:100%; height:100%; left:0;}'
    +'.trfade {background:#000; z-index:99998;'
    +  'filter:alpha(opacity=25); opacity: .25;-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=25)";'
    +'}'
    +'.fade {background: #000; z-index: 99990;'
    +  'filter:alpha(opacity=60); opacity: .60;-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";'
    +'}'
    +'#popup_container, #popup_container_precap{background: #ddd; color:black; padding: 5px; border: 5px solid #fff;'
    +  'float: left; position: absolute; top: 10px;'
    +  'border-radius:5px; -moz-border-radius:5px; -khtml-border-radius:5px; -webkit-border-radius:5px; z-index: 99999;'
    +'}'
    +'#popup_container {width:88%; left:5%}'
    +'#popup_container_precap{width:340px; left:50%}'
    +'.popup_block .popup {float:left; width:100%; background:#D1D4E0; margin:0; padding:0; border:1px solid #bbb;}'
    +'.popup img.cntrl {position:absolute; right:-20px; top:-20px; border:0px;}'
    +'#button_preview {padding:3px;text-align:center;}'
    +'*html .fade {position: absolute;}'
    +'*html #popup_container, *html #popup_container_precap {position:absolute;}'
    +'');
 }
 ,getSCRIPT: function(){
  return (''
    +'function showRecaptcha(element){'
    +  'Recaptcha.create("6Lf8xr4SAAAAAJXAapvPgaisNRSGS5uDJzs73BqU",element,'
    +    '{theme:"red",lang:"en"'
    +     ',custom_translations:{refresh_btn:"Reload reCapcay :: ['+(gvar.isOpera ? 'Ctrl+Alt+R':'Alt+R')+']",instructions_visual:"Masukkan reCapcay:"}'
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

 ,getSetOf: function(type){
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
      ,upld_png : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAAYFBMVEX8/vyFzyR7xieO1xqJ0RusqrBjszRxvSyJvGvw8PDm5Obb29"
        +"r0/uTs+9ik51ma4Eip7Wfh98G0tLSx7Xe55YGQ2CaU2zfU9rC8vryo2IzA8JC04ozM8qDMzsycwoS87oQpvMJ/AAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQ"
        +"BlSsOGwAAAMVJREFUeF4FwIWRHEEMAMCWNLB0DI+288/SBcDpBgAA1+sBAMD3qx4AAG6XqvcHAMC5qup8AgD+VVVVPQDAx7tVVdXrFwDHuVXVq17tcgLg0aK1Fi1a"
        +"uwL4fUdERERExDfgdGkREREREe1yAxyHZ2ZmZh7HAYBnZmZmAgDPzMzMBAB+5pxzzgkA/Mw555wTAPgaY4wxBgDwNcYYYwwAYF+WZVmWvwCf93vvvffee++9936/f"
        +"/6xruu2bdu+7/u+b9u2revqPzsQBuTq26DvAAAAAElFTkSuQmCC"
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
      ,tstrike_gif : ""
        +"data:image/gif;base64,R0lGODlhFAATAPcAACQeJHx+fFRSVDQ2NLSytGxqbJSWlExGTKSipGRiZEQ+RHx6fDQuLDw+PHRydJyenIyKjFxaXDw2PGxudJyWnC"
        +"QmJFRWVJza7GxubExKTKyqrGRmZDQuNIyOjDw6PJyanBbQIND2iGRJdHcBAABF4AAA63EAEgAAAAAYVQCI1QB0mQAAd3gApOYA63VxEgAAAPhY/omT/5Z0/wMA/wB"
        +"oNAANAABJAAABAABFaAAAAAAAagAAAAAYYACIhQB0dAAAAAAAKAAAAgAAAAAAAAAjAgABAAAAAAAAAAAYAADoAHESAAAAAPhFaIkAAJYAAAMAAAAAAAAAAABxAAAA"
        +"AHwYaOaIABJ0AAAAAAgYRADo6W8SEgAAABGFYAA0hQCddAB3AOouaMdnAGRpAHdmAcYARMRHOsQ0XFZ3AOAhcwKtZVFkcgB3c+AAU4kB35YAZAMAdwEAOgAAygAAx"
        +"AAAVvCMAInnAJYSAAMAAHQ3AOY7ABKdAAB3AMc8yB87d52ddHd3APirAIlIcJY0dAN3AEkAVB8A6J0AEncAAAAAEQABAQAAAAAAAPAhsImt6JZkEgN3AIBkmufnkx"
        +"ISawAAd7wA4sIq/WRxsncAIQA6/gDF/3HE/wBW/wC0UwDn3wASZAAAd/iRSYms2JZkZAN3dwAAyAAAdwAAdAAAAAAAPgEA0gAAZQAAd8vgesKzymSZxHd3VsznAOd"
        +"IABI0AAB3APh5AInpAJYSAAMAAAwMAJ6hAHtPAHcAAAEgAAAAAAAAAAAAAwIAAX8AAAAAAAAAAHOUkC3n6G0SEmUAAG4MzXWhq1xPugAA3DxgYAD7+wASEgAAAABV"
        +"mgDVkwCZawB3dwHX8gCl8AG7swAAITb+/iX//8f//1b//zjgPuez0hKZZQB3d5RbiAp/gcVnQnZ3AATcyOfodxISdAAAAA5rAAF/AABnAAB3AAWNeQCt6QBkEgB3A"
        +"BAAMQAArQAAZAAAdwAwZgAAygAAxAAAVkQAMToArQAAZAAAd1QuagxncUlpSAFmACH5BAEAABcALAAAAAAUABMARwhnAC8IHEiwoMGBGCRAuIAhwgEHAgMkQHCwos"
        +"WLGC8YAHAAAAYPDBJA/MChQYCMKA1aoIhxgMuXMGMOSEmzps2bFydouOngAcoOAhNc2LBQAYICBCo6yHChwgUBCy4ooNBAKM6rWAkGBAA7"
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
      ,setting_gif : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABnRSTlMAPwBIAMyhjHolAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEmElE"
        +"QVR42oWUW2hcZRDH51z2nL1kk7O7SdPEJiaxjfRirdaWei+0gmgRH0QoKBZafNGnCmLFFqmC4JO++KZUUqnYCj60qKiILRil8cG46SW9mE3aZDfb7GZ3z55zvsvM+JC"
        +"QttrgvHwwzP/HDN/M33jy6RFYJg7t6QGAYl0DwEDCCWJ0+MjUcsX2HbND765N9cSstGnHTWSDCFCTCvjT+9Ozl+SBTy7/V2L8q6PP3xz0NibcjE0miAlZm1TRrFYazD"
        +"bT7bWTPQ5ZVqOorv8YvP/N5WVBxz9Y17IxoSOqnQ3Kp/36hBQEZsRIUFNaB+B0xbq3pzp2embCKvw0f/izK0taq2/1q0uU7Ia4nsPCUPXGmSCc17yOM3cnalcUM1AX3b"
        +"UjOf1LMPlrMJcPvfuSHeuTG1pTZ/6sLMjNhefo/kFvYyKq4NWhav2cUBp9T2zZ2+V1uFFIQci2a23ZvfKeF1p0pEvD/m8HpuqT2L+zbd9j3beB2jcnOaDCsfn6BckahK"
        +"SB53KpVkdp1gREjNowADa/uKKtLx4Inhpp/nBwIqzoNU9lboK+em9tPGOVR4L6uAQAZjBj4K2IAQAzK4VRqCQpNDjVbsfSlpRMxNeHG6Nfl1u63dd39QCAfWhPT6o7xs"
        +"Q3fvYpIjANEaFOGpZpAkDHw4lNOQ8AEh2O45ooSPoYBAoAGOH8sbnVuzLpAXdxj5w2y59SzStCWqAlMAFXYf5v7BiAXF881xdf+prJkaDwV5MZFAMDXb9UL4010l3xV7b"
        +"mzMFE3HIN/5LQGrQAUkyCVR2vflH1S5ppEcEMfll//+G0X9EIAMxKawYojobMXC6GJkVkWoYoYxgSBqQaJH1Ugqrnou/2T13L1xdAjaI6urdw8XRDg6E1RkqGjJJwviRQc"
        +"7MBJhEAADJQxCriKMQwoLBJwqfS70Hhj9oCKKzi5Nm6QoVKCCUDJgQQQEIoLZCRbGRAzU7ajEJSilCzDBmJlWIhiXlxNDQoACURGUAaLEExAzInM6aKMJ4w7IIpeyJOD"
        +"TphAw3L0AGhhlCzQo40LZGYWbOSpAkgNAiZFYJi8nqTMqBsp2MCgKxob8D1VjmqgaghUKyZlKEU6FvPEoElYGAgMksEAs72Ol6X7d8QX47WzMNHpubPC7CNVc+3SeSmIA"
        +"SSjEqxYuJbQIpAMixkGIBidO8TGcuE5ky4uNkvfTxeK6nuZ1tTm5wQUJCWihSzJuKl0QCQmQlYgyJAxs41Lf1bvWpJn8j7N29t+tu6YdFDb3XmNrihQsUUoRaEt3UEWoE"
        +"WJBFlts95dHenHbfmLvi3He1rxyeKw0FyZWzbO13tD7qRyQK1VDyTjyrTojIjRk4Vg4bWDOQYnevbtu/rSeacmXzj1FR4B2P76OX+7LZ4s6zyp+byJyvFCxItTA/abMK1"
        +"c76MKL3KHXw827/Ns117eqxx8qK/rNUe3NHpPZBw223RxNJYc3pcVGdCKdH17NYu1+tNmgY3K3J2PFrq5c6ghXj7mZy7wrFSFjIHIRKBkhw1MfLRL8kTY83/N/9b441Hs"
        +"rMzohEiErBtZtrNoVF/ueJ/AE95J7K8On4lAAAAAElFTkSuQmCC"
      ,twbutton_gif : ""
        +"data:image/gif;base64,R0lGODlhCgBYAsQfAPPz8+vr6/7+/uHh4fn5+eXl5d7e3vv7++jn6Ofo5/j4+Ojo6d/g4Ofn59/g3+Pk5OPj4/f29vv7+vz7/ODf3/"
        +"Dw8Pb29vv8+/z8/ODf4O/v7+fn5unp6N/f3+Dg4P///yH5BAEAAB8ALAAAAAAKAFgCAAX/oCCOZGmeIqau7OG6UiwdRG3fSqTs/G79wCDAMiwSiYCkUllpOp+aqHQ"
        +"a0FSvVmtgy+VyvoEvZxFeIBKLRQK93rg3hbf7UaAX6vQHZM/vD/6AgR6DhIUdBgaHHYuLiI6PkJEfk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2"
        +"t7i5uru8vb6/wMHCw8TFxsfIycrLwijOz9DRLNMYEy8u1jAy2zM33gQ94TkR5OQW5UHpQElH7Evv8O9P8xVT9VL3U/pXW1ld/wABihko5kyDBAgaIFCTYEMDOQ7d3"
        +"JlIEY+eBxgx9tm4J5DHAR4+hvSQoQMFDwwKzzFgtIiCA0aPDiGSGammJGY4c+rcybOnz59AgwodSrSo0aNIkypdyrRps2hQo0otoUIANRUTLhyYgOHAha4utIa9NkM"
        +"GjAMxvEnAocBGW3A94O7QMW6ujwg/8ALRq+6HEXd+4wkeXGEJvcOH9SleLAWL44CQIwskGOZLmgVj0mQ+eDDhmYQNHoZ2M/oOHNMVU9/JmBGCRo4b//AZMPujx5CCc"
        +"IMktLsDgwwOUHro4GAly+OJaM60yfyR0+fQo0ufTr269evYs2vfzr2791IhAAA7"
      ,throbber_gif : ""
        +"data:image/gif;base64,R0lGODlhEAAQALMPADZmn6XF642oyHCp7V6DsEWE0Pn6/dvk7+Ls95W/8VWa7HKby8DS6ezy+U2V6////yH/C05FVFNDQVBFMi4wAwEAAAAh+"
        +"QQJAAAPACwAAAAAEAAQAAAEPvDJ2Qgg4sw9EShOUQQcxySDoy5GyR2pk7icESP0doBkPi2OgW8iKCiGkuIRSSgIh43PDApQ4JCGBnLL9UUAACH5BAkAAA8ALAAAAAAQABAAA"
        +"AQ+8Mk5mTg0UwCKMFomOOQChhMykAlKNauDuNNROC0tLc6gS4KC4vcIDn+Egk936ORcBgJAphM4fwzlSbclTiIAIfkECQAADwAsAAAAABAAEAAABELwyUmrtYiZawlYGzcth"
        +"ZOIk7E4DoJKR3m+D+EM9CMUSr73NEIB90IACjORwdOihCYIDxJ1ABwHz0sAYMpeDAzXJAIAIfkECQAADwAsAAAAABAAEAAABDvwyUmrvTjrakTYUgAUCHgAygcuzgA+QuG8s"
        +"fIShbudRbIZBICjoTkECyoLQhAcDQyYoywAxQRyAeIkAgAh+QQJAAAPACwAAAAAEAAQAAAEN/DJSau9OOvNuzRB0wnAMhbOmXJEMXAHUCSbQQAOoh33bAkEweImSxgqDVlhi"
        +"QpgAgOHYxA4TiIAIfkECQAADwAsAAAAABAAEAAABDrwyUmrvTjrzbv/luExgNARwMAdQJFsBuogkiEsB3Wg7oS0BcIN1RqIJgKHssAsKAJHSiMwUA4SDUoEACH5BAkAAA8AL"
        +"AAAAAAQABAAAAQ+8MlJq7046827/2CIIYExEotEAItZGWthCoUzHNSxOoFkLA5HYbEQrACFgethSASFhagjsZyQBgrFIICgRAAAIfkECQAADwAsAAAAABAAEAAABDzwyUmrv"
        +"Tjrzbv/2CEgHQEsnVA45Hasg3HJk+A4w0EhZjAZi1uBsBCYAAXfL3FzFJ6rBI1yCAxug0RLEgEAIfkECQAADwAsAAAAABAAEAAABDjwyUmrvTjrzXsVxNEBRTI6Jkc4QycUD"
        +"sId8GBwgsOKmrHoBYJgQSAwLIaEzlFoljCIwEDBSjQoEQAh+QQJAAAPACwAAAAAEAAQAAAEQPDJSau9OFNj9DwA0HkCoDTeQxRD+gBF4gKOnBJOmwqFg6SH3mCkETgcioPHs"
        +"DgWCAtGxpA4KgoFaeaQGORQlQgAIfkECQAADwAsAAAAABAAEAAABDrwyUmrvdUswDAVQNF5zxEOBvmADqI+RDG8TxjQgJPQhDO/AkfrdSj4Uqqg76DSCAuCZkKooB0Co0sEA"
        +"CH5BAkAAA8ALAAAAAAQABAAAARA8MmH2LzYCAAsvgYBFMrxXVsxIOd0jIPRTptjzhKh4tOY8BKAIwB8EByDoqDgYPEOzBhQ4FAkeYZFtWhgNIrgCAAh+QQJAAAPACwAAAAAE"
        +"AAQAAAEPvDJhwQBbGppBABFkWyTcRXOEDSk5BXD0U4HOBjz5DlIPhEw3wQ0Ej4AjqKQkDI+BKieEIHKGAMJlnPL7T4iACH5BAkAAA8ALAAAAAAQABAAAAQ88MnXBAGAhMmfw"
        +"EXhOEX3GAsgDkkyMOZXDIjJNepg2Nzn1LwJYRbkqDZFCcCRSEoITOfjENhJr9isVhsBACH5BAkAAA8ALAAAAAAQABAAAAQ88MmHBAGAiDOnEVhROI4odMY1DkkykE4zgcXAT"
        +"UgSTAdQG52gBORACIWE2hFZYCyDBtlzSq1ar9isdhkBACH5BAkAAA8ALAAAAAAQABAAAAQ88MmHBAGACDSnEVhROI4oGN41DkkykM6CPmAxcBPyOsHTALZZx/BKPAyEW2fIa"
        +"Cyf0Kh0Sq1ar9isdhsBACH5BAkAAA8ALAAAAAAQABAAAAQ98Ml3BAGAiDOnEVhROI4oGB04DkkykM6CSkIxcNPxOkmHdJPG7gcsHka9YnHBUxYbgYZzSq1ar9isdjuJAAAh+"
        +"QQFAAAPACwAAAAAEAAQAAAEPPDJ1wQBgIg2+1tAUTiOKBjeExRDkgykc6beATsJ7TU3oneHUe43ITgGxImgoEhKlk0nYhFwWq/YrPYXAQA7"
     };
    break;
  };
  return false;
 }
 ,getSmileySet: function(custom){
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
  var buff = getValue(KS+'CUSTOM_SMILEY');
  if(buff!=''){
    gvar.smiliegroup=[];
    var grup,ret,extractSmiley=function(partition){
      if(!partition) return false;
      var idx=1,sepr = ',',customs={};
      var smileys = partition.split(sepr);
      if(isDefined(smileys[0]))
       for(var i in smileys){
         if(isString(smileys[i]) && smileys[i]!=''){
           var parts = smileys[i].split('|');
           customs[idx.toString()] = (isDefined(parts[1]) ? [parts[1], parts[0], parts[0]] : smileys[i]);
           idx++;
         }
       }
      return customs;
    };
    if(buff.indexOf('<!!>')==-1){ // old raw-data
      ret = extractSmiley(buff);
      if(ret){
        grup='untitled';
        gvar.smiliecustom[grup.toString()] = ret;      
        gvar.smiliegroup.push(grup);
      }
    }else{
      // spliter: ['<!>','<!!>']; 
      // '<!>' split each group; '<!!>' split group and raw-data
      var parts = buff.split('<!>'),part2;
      for(var i=0; i<parts.length; i++){
        part2=parts[i].split('<!!>');
        part2[0]=part2[0].replace(/\\!/g,'!');
        if(part2.length > 0){
          ret = extractSmiley(part2[1]);
          if(ret){
           gvar.smiliecustom[part2[0].toString()] = ret;
           gvar.smiliegroup.push(part2[0].toString());
          }
        }
      }  // end for
    }
  } // end is buff
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

 /** ==Template area== */
 ,getTPL_main: function(){
  return (''
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
    
    +(!gvar.user.isDonatur ? '<div class="panel"><div>':'')
    
    + rSRC.getTPL_vbEditor()
    
    +(!gvar.user.isDonatur ? '</div></div>':'')
    
    // Setting container will be containing from getTPL_Settings()
    +'<div id="settings_cont"></div>'
    +'</td>'    
    +'</tr></table>');
 }

 ,getTPL: function(){
  return ('' 
    +'\n<br/>'
    /* '!-- start form quick reply' */
    +'<form action="newreply.php?do=postreply&amp;t='+gvar.threadid+'" method="post" name="vbform" id="vbform">'

    +'<table class="tborder" cellpadding="6" cellspacing="1" border="0" align="center">'
    +'<thead><tr><td id="vB_Editor_001_parent" class="MYvBulletin_editor tcat" colspan="2">'
    +'<a href="javascript:;" id="atoggle"><img id="collapseimg_quickreply" src="'+gvar.domainstatic+'images/buttons/collapse_tcat'+(gvar.settings.qrtoggle==1?'':'_collapsed')+'.gif" alt="" border="0" /></a><span id="qr_delaycontainer" style="display:none" title="Posting delay for next post"></span>'+gvar.titlename+' '+(isQR_PLUS==0?HtmlUnicodeDecode('&#8212;'):'&nbsp;&nbsp;')+' <a id="home_link" href="' + (isQR_PLUS==0 ? 'http://'+'userscripts.org/scripts/show/'+gvar.scriptId.toString():'https://'+'addons.mozilla.org/en-US/firefox/addon/kaskus-quick-reply/') + '" target="_blank" title="Home '+gvar.fullname+' - '+gvar.sversion+'">'+gvar.sversion+'</a>'
    +'<span id="upd_notify"></span>'
    +(gvar.__DEBUG__===true ? '<span style="margin-left:20px;color:#FFFF00;">&nbsp;&nbsp;[ [DEBUG Mode] <a href="javascript:;location.reload(false)">reload</a> <span id="dom_created"></span>]</span>':'')
    +'<div style="position:absolute;right:57px;margin:-21px 5px 0 0;vertical-align:top;"><a id="qr_setting_btn" href="javascript:;" style="text-decoration:none;outline:none;" title="Settings '+gvar.fullname+'" ><img src="'+gvar.B.setting_gif+'" alt="S" border="0"/><div style="float:right;margin:0;margin-top:3px;padding:0 2px;">Settings</div></a></div>'
    +'</td></tr></thead>'
    
    +'<tbody id="collapseobj_quickreply" style="display:'+(gvar.settings.qrtoggle==1?'':'none')+';"><tr><td class="panelsurround" align="center">'
    +'<div class="panel">'
    +'<div class="qr_container">'
    // Quoted notice
    +'<div id="quoted_notice" class="g_notice"></div>'
    +'<div id="posting_notify_donat" class="g_notice"></div>'
    
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
     +'<tr><td><div id="capcay_container">'
     +'</div></td></tr>'
    +'</table></td>'
    :'')
    
  +'</tr></table>'
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
     +'<div id="rate_thread" style="display:none;"><img src="'+gvar.B.throbber_gif+'" border="0"/></div>'
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
    /*'!-- / end form quick reply --'*/
    );
 }

 ,getTPL_vbEditor: function(){
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
  return (''
     + '<table cellpadding="0" cellspacing="0" border="0">'
     +'<tr>'
     +'    <td id="vB_Editor_001" class="vBulletin_editor">'
     +'        <div id="vB_Editor_001_controls" class="controlbar" style="width:100%;">'
         
     + konst._tbo
     +'<tr>'
    
     +(gvar.settings.hidecontroll[0] != '1' ? ''
     +' <td><div class="imagebutton" id="vB_Editor_001_qrcmd_bold"><img src="'+gvar.domainstatic+'images/editor/bold.gif" alt="Bold" /></div></td>'
     +' <td><div class="imagebutton" id="vB_Editor_001_qrcmd_italic"><img src="'+gvar.domainstatic+'images/editor/italic.gif" alt="Italic" /></div></td>'
     +' <td><div class="imagebutton" id="vB_Editor_001_qrcmd_underline"><img src="'+gvar.domainstatic+'images/editor/underline.gif" alt="Underline" /></div></td>'
     +konst.__sep__ : '')
     +(gvar.settings.hidecontroll[1] != '1' ? ''
     +'<td><div class="imagebutton" id="vB_Editor_001_qrcmd_justifyleft"><img src="'+gvar.domainstatic+'images/editor/justifyleft.gif" alt="Align Left" /></div></td>'
     +'<td><div class="imagebutton" id="vB_Editor_001_qrcmd_justifycenter"><img src="'+gvar.domainstatic+'images/editor/justifycenter.gif" alt="Align Center" /></div></td>'
     +'<td><div class="imagebutton" id="vB_Editor_001_qrcmd_justifyright"><img src="'+gvar.domainstatic+'images/editor/justifyright.gif" alt="Align Right" /></div></td>'
     +konst.__sep__ : '')
     
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
     +konst.__sep__ : '')
     
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
     +konst.__sep__ : '')
     
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
     +konst.__sep__ : '')
     
     +(gvar.settings.hidecontroll[5] != '1' ? ' <td><div class="imagebutton cdefault" id="vB_Editor_001_qrcmd_createlink"><img src="'+gvar.domainstatic+'images/editor/createlink.gif" alt="Insert Link" title="Insert Link" /></div></td>'
     :'')
     +(gvar.settings.hidecontroll[6] != '1' ?' <td><div class="imagebutton cdefault" id="vB_Editor_001_qrcmd_insertimage"><img src="'+gvar.domainstatic+'images/editor/insertimage.gif" alt="Insert Image" title="Insert Image" /></div></td>'
     :'')
     +(gvar.settings.hidecontroll[7] != '1' ?' <td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_insertyoutube"></div></td>'
     :'')
     +(gvar.settings.hidecontroll[5] == '1' && gvar.settings.hidecontroll[6] == '1' && gvar.settings.hidecontroll[7] == '1' ? '' : konst.__sep__)
     
     +(gvar.settings.hidecontroll[8] != '1' ? ''
     +' <td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_insertsmile"><img id="vB_Editor_001_cmd_insertsmile_img" src="'+gvar.B.smile_gif+'" alt="Smiles" title="Smiles" /></div></td>' :'')
     +(gvar.settings.hidecontroll[9] != '1' ? ''
     +' <td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_uploader"><img id="vB_Editor_001_cmd_uploader_img" src="'+gvar.B.upld_png+'" alt="Uploader" title="Uploader" /></div></td>' :'')
     +(gvar.settings.hidecontroll[8] == '1' && gvar.settings.hidecontroll[9] == '1' ? '' : konst.__sep__)
     
     +(gvar.settings.hidecontroll[10] != '1' ? ' <td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_wrap_qr_quote"><img src="'+gvar.domainstatic+'images/editor/quote.gif" alt="[quote]" title="Wrap [QUOTE] tags around selected text" /></div></td>'
     :'')
     +(gvar.settings.hidecontroll[11] != '1' ? ' <td><div class="imagebutton cdefault" id="vB_Editor_001_cmd_wrap_qr_code"><img src="'+gvar.domainstatic+'images/editor/code.gif" alt="[code]" title="Wrap [CODE] tags around selected text" /></div></td>'
     :'')
     +(gvar.settings.hidecontroll[10] == '1' && gvar.settings.hidecontroll[11] == '1' ? '' : konst.__sep__)     
     
     +                '<td id="customed_control"></td>'
     +                '<td width="100%"></td>'
     +(!gvar.settings.textareaExpander[0] ? ''
       +                '<td width="50px" style="padding-left:10px;">'
       +'<div class="imagebutton cdefault" id="vB_Editor_001_cmd_qr_resize_0" style="padding:0"><img src="'+gvar.domainstatic+'images/editor/resize_0.gif" width="21" height="9" alt="Decrease Size" title="Decrease Size"></div>'
       +'<div class="imagebutton cdefault" id="vB_Editor_001_cmd_qr_resize_1" style="padding:0"><img src="'+gvar.domainstatic+'images/editor/resize_1.gif" width="21" height="9" alt="Increase Size" title="Increase Size"></div>'
       +                '</td>'
     : '')
     +            '</tr>'
     +konst.tbo_
     +        '</div>' // end #vB_Editor_001_controls
     
     +        '<table cellpadding="0" cellspacing="0" border="0" width="100%">'
     +        '<tr valign="top">'
     +            '<td class="controlbar">'
     +'<div id="dv_accessible" style="display:none;">'+gvar.qr_diakses
     +'<img src="'+gvar.domainstatic+'images/buttons/quickreply.gif" alt="Quick Reply" border="0" title="Quick Reply Now" class="icon-accessible" />'
     +(gvar.settings.hotkeychar && gvar.settings.hotkeykey.toString()!='0,0,0' ? ''
     +'<br />QR-Hotkey: <b>'
     +(gvar.settings.hotkeykey[0]=='1'?'Ctrl+':'')+(gvar.settings.hotkeykey[1]=='1'?'Shift+':'')+(gvar.settings.hotkeykey[2]=='1'?'Alt+':'')
     +''+gvar.settings.hotkeychar+'</b>' : '')
     +'</div>'
     +             '<textarea name="message" id="vB_Editor_001_textarea" class="textarea" rows="10" cols="10" tabindex="1" dir="ltr" disabled="disabled"></textarea>'
     +            '</td>'
     +        '</tr>'
     +        '</table>'
     +'<div id="smile_cont" style="display:none;"></div>'
     +'<div id="upl_cont" style="display:none;"></div>'
     +    '</td>'
     +'</tr>'
     +'</table>'
    );
 }

 ,getTPL_layer_Only: function(){
   return ('<div class="trfade"></div><div class="fade"></div>');
 }
 ,getBOT_greet: function(min, max){
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
  }
 ,getTPL_prompt_reCAPTCHA: function(){
  return (''
     +'<div id="popup_container_precap" class="popup_block"> '
     + '<div class="popup">'
     +  '<a tabindex="213" href="javascript:;"><img id="imghideshow_precap" title="Close" class="cntrl" src="'+gvar.B.closepreview_png+'"/></a>'
     +  '<table class="tborder" align="center" border="0" cellpadding="6" cellspacing="1" width="100%">'
     +  '<tbody><tr>'
     +   '<td class="tcat"><a id="nfolink" href="javascript:;" onclick="pop_reCAPTCHA=window.open (\'http:\/\/recaptcha.net\/popuphelp\/\',\'mywindow\',\'status=1,toolbar=0,menubar=0,width=450,height=480\'); var Lw=Math.round((document.documentElement.clientWidth/2)-(400/2)); pop_reCAPTCHA.moveTo(Lw,100)" title="What is this?">reCAPTCHA</a></td>'
     +  '</tr><tr>'
     +  '<td class="alt1">'
     +   '<div id="recaptcha_container_header">'
     +   '<span class="qrsmallfont"><span id="botgreet_text" style="cursor:help;float:left; width:70%;border-right:1px solid #A3A3A3;">'+rSRC.getBOT_greet(0, 10)+'</span>'
     +   '<span style="float:right;padding:auto 0;">'
     +  '<a href="http://'+'kask.us/5957067" target="_blank" title="Info, Tips, Suggestion, Digitalize">RTFM</a>&nbsp;&#8212;'
     +  '<a href="http://'+'kask.us/5954390" target="_blank" title="Nice Info, Tips-Trick">TRICK</a>'
     +  '</span>'
     +   '</div>'
     +   '<div class="spacer" id="posting_notify"></div>'
     +   '<div id="recaptcha_container" style="text-align:center;">'
     +    '<div><img src="'+gvar.B.throbber_gif+'" border="0"/>&nbsp;<small>loading...</small></div>'
     +   '</div>'
     +  '</td></tr>'
     +  '<tbody></table>'
     +   '<div id="button_preview" style="display:none;">'
     +    '<span id="remote_capcay"></span>'
     +    '<img id="recaptcha_submit_load" src="'+gvar.B.throbber_gif+'" border="0" style="display:none"/>&nbsp;<input tabindex="211" id="recaptcha_submit" type="button" class="button" value=" Post " />&nbsp;&nbsp;'
     +    '<a tabindex="212" id="recaptcha_cancel" href="javascript:;" class="qrsmallfont"><b>Cancel</b></a>'
     +   '</div>'
     + '</div>'
     +'</div>'
    );
 }

 ,getTPL_Preview: function(tipe){
  var prop = {
     'settings' : 'Settings '+gvar.titlename+'<span id="fsize" style="display:none;"></span><span id="subtitle" style="float:right;margin-right:5px;"></span>'
    ,'preview' : 'Preview '+gvar.titlename
  };
  if( isUndefined(prop[tipe]) ) return;
  return (''
     +'<div class="trfade"></div> '
     +'<div class="fade"></div>'
     +'<div id="popup_container" class="popup_block" '+(tipe=='preview' ? '' :'style="max-width:700px;"')+'>'
     + '<div class="popup">'
     +  '<a tabindex="109" href="javascript:;"><img id="imghideshow" title="Close" class="cntrl" src="'+gvar.B.closepreview_png+'"/></a>'
     +  '<table class="tborder" align="center" border="0" width="100%" '+(tipe=='preview' ? 'cellpadding="6" cellspacing="1"':'cellpadding="0" cellspacing="0" ')+'>'
     +  '<tbody><tr><td class="tcat" style="padding:6px;">'+prop[tipe]+'</td></tr>'
     +  '<tr><td'+(tipe=='preview' ? ' class="alt1"':'')+'>'
     +   '<div id="preview_content"><div id="preview_loading"><img src="'+gvar.B.throbber_gif+'" border="0"/>&nbsp;<small>loading...</small></div></div>'
     +  '</td></tr>'
     +  '<tbody></table>'
     +   '<div id="button_preview" >'     
     +(tipe=='preview' ? '<input tabindex="102" id="preview_presubmit" type="button" class="button" value=" working... " />&nbsp;&nbsp;'
     +    '<a tabindex="103" id="preview_cancel" href="javascript:;" class="qrsmallfont"><b>Cancel</b></a>'
     : '' )
     +   '</div>'
     + '</div>'
     +'</div>'
    );
 }
 
 ,getTPL_Settings_ExpImp: function(){
    //
    return (''
     +'<div id="exporimpor_container" class="qrsmallfont">'
     +'To export your settings, copy the text below and save it in a file,.<br>'
     +'To import your settings later, overwrite the text below with the text you saved previously and click "<b>Import</b>".'
     +'<textarea id="textarea_rawdata" class="textarea" style="height:335px;width:99%;overflow:auto;white-space:pre;"></textarea>'
     +'<div style="float:left;"><a id="exim_select_all" class="qrsmallfont" style="margin:10px 0 0 5px;text-decoration:none;" href="javascript:;"><b>'+HtmlUnicodeDecode('&#9650;')+' Select All</b></a></div>'
     +'<div style="float:right;"><a id="reset_default" class="qrsmallfont" style="margin:10px 10px 0 0;color:red;" href="javascript:;"><small>reset default</small></a></div>'
     +'<div style="text-align:center;width:100%;margin:10px 0 5px 0;"><input type="button" id="import_setting" class="twbtn twbtn-m" value="Import.." /></div>'
     +'</div>'    
    );
 }
 ,getTPL_Settings_About: function(){
    var E={
       'Quick Reply+':{t:6616714,tt:'Add-ons Kaskus Quick Reply + [QR]',tsl:1323912,ts:'Piluze'}
      ,'Emoticon Corner':{t:6849735,tt:'Emoticon Corner',tsl:572275,ts:'slifer2006'}
    },T={
       'Firefox':{t:3170414,tt:'Add-Ons Firefox Plus Script - [UPDATE]',tsl:601361,ts:'thiaz4rhytem'}
      ,'Opera':{t:6595796,tt:'[Rebuild] '+HtmlUnicodeDecode('&#187;')+' Opera Community',tsl:786407,ts:'ceroberoz'}
      ,'Google-Chrome':{t:3319338,tt:'[Updated] Extensions/ Addons Google Chrome',tsl:449547,ts:'Aerialsky'}
    },spacer = '<div style="height:5px;"></div>',mb='/member.php?u=',st='/showthread.php?t=',bl=' target="_blank" ',QT='<br><b>#QR</b> Topic<br>CCPB <span title="CCPB (#14) UserAgent Fans Club Comunity">UA-FCC</span>:<br>';
    for(var i in T)
      QT+= ' '+HtmlUnicodeDecode('&#167;')+' <a href="'+st+T[i].t+'"'+bl+' title="'+T[i].tt+'">'+i+'</a> <a href="'+mb+T[i].tsl+'"'+bl+' title="TS: '+T[i].ts+'">*</a>';
    QT+='<br>Other:';for(var i in E)
      QT+='<br> - <a href="'+st+E[i].t+'"'+bl+' title="'+E[i].tt+'">'+i+'</a> <a href="'+mb+E[i].tsl+'"'+bl+' title="TS: '+E[i].ts+'">*</a>&nbsp;';
    
    return (''
     +'<div id="about_container" class="qrsmallfont" style="">'
     +'<b>'+gvar.fullname+' '+gvar.sversion+'</b> '+(isQR_PLUS!==0?' &nbsp;&nbsp;<b>(ADDONS)</b>':'')+' '+HtmlUnicodeDecode('&#8212;')+' <small>'+gvar.scriptMeta.dtversion+'</small>'+'<br>'
     +spacer
     +'<a href="http://'+ 'userscripts.org/scripts/show/'+gvar.scriptMeta.scriptID+'">'+gvar.fullname+'</a> UserScript is an improvement of '+HtmlUnicodeDecode('&#733;')+'kaskusquickreply'+HtmlUnicodeDecode('&#733;')+' (FF Addons) initially founded by bimatampan.<br>'
     +'<div style="height:10px;"></div>'
     +'<a href="http://code.google.com/p/dev-kaskus-quick-reply/" target="_blank"><img height="33" src="http://ssl.gstatic.com/codesite/ph/images/defaultlogo.png" border="0" title="dev-kaskus-quick-reply - '+gvar.fullname+' on Google Code"/></a>&nbsp;'+HtmlUnicodeDecode('&#183;')+'&nbsp;<a href="http://creativecommons.org/licenses/by-nc-sa/3.0/deed.ms" target="_blank"><img src="http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png" border="0"/></a><br>'
     +'Licensed under a <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/deed.ms" target="_blank">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License</a><br>'
     +'<div style="height:10px;"></div>'
     +'KASKUS brand is a registered trademark of www.kaskus.us<br>'
     +gvar.fullname+' (QR) is not related to or endorsed by www.kaskus.us in any way.<br>'
     +spacer     
     +'<b>Modified By</b>: <a href="javascript:;" class="nostyle">Idx</a><br>'
     +'<b>Contributors:</b>'
     +'<div style="height:'+(gvar.isBuggedChrome ? '248':'220')+'px;overflow:auto;border:1px solid #E4E4E4;clip:rect(auto,auto,auto,auto);">'
     +'s4nji<br>riza_kasela<br>p1nky<br>b3g0<br>fazar<br>bagosbanget<br>eric.<br>bedjho<br>Piluze<br>intruder.master<br>Rh354<br>gr0<br>hermawan64<br>slifer2006<br>gzt<br>Duljondul<br>reongkacun<br>otnaibef<br>ketang8keting<br>farin<br>drupalorg<br>.Shana<br>t0g3<br>&all-kaskuser@<a href="'+gvar.domain+'showthread.php?t=3170414" target="_blank">t=3170414</a><br>&nbsp;'
     +QT
     +'</div>'
     +'</div>' // #about_container
    );
 }
 ,getTPL_Settings_ShortCuts: function(){
    var spacer= '<div style="height:10px;"></div>';
    return (''
     +'<div id="shotcuts_container" class="qrsmallfont">'
     +'<b>Keyboard Shortucts</b><br>'
     +spacer
     +'<em>Globaly on showthread page</em><br>'
     +'<b>Esc</b> - Close Active-Popup [Preview, Input reCapcay, Settings]<br>'
     +'<b>Ctrl + Q</b> - Focus to '+gvar.titlename+' Editor Now. (<a id="customable_btn" href="javascript:;">customable</a>)<br>'
     +'<b>Alt + Q</b> - Fetch Quoted Post<br>'
     +'<b>Ctrl + Alt + Q</b> - Fetch Quoted Post <span class="opr">(Opera)</span><br>'
     +'<b>Ctrl + Shift + Q</b> - Deselect All Quoted Post<br>'
     +spacer
     +'<em>While focus on Editor / textarea</em><br>'
     +'<b>Ctrl + Enter</b> - Post Reply<br>'
     +'<b>Alt + S</b> - Post  Reply<br>'
     +'<b>Shift + Alt + S</b> - Post Reply <span class="opr">(Opera)</span><br>'
     +'<b>Alt + P</b> -  Preview '+gvar.titlename+'<br>'
     +'<b>Shift + Alt + P</b> -  Preview '+gvar.titlename+' <span class="opr">(Opera)</span><br>'
     +'<b>Alt + X</b> -  Go Advanced<br>'
     +'<b>Shift + Alt + X</b> -  Go Advanced <span class="opr">(Opera)</span><br>'
     +spacer
     +'<em>While focus on Input reCapctha</em><br>'
     +'<b>Pg-Up</b> or <b>Pg-Down</b> - Reload reCaptcha<br>'
     +'<b>Alt + R</b> - Reload reCaptcha<br>'
     +'<b>Ctrl + Alt + R</b> - Reload reCaptcha <span class="opr">(Opera)</span><br>'
     +'</div>' // #shotcuts_container    
    );
 }
 ,getTPL_Settings_Controller: function(){
    var sett = '';
    var spacer = '<div style="height:5px;">&nbsp;</div>';
    sett+='<div id="visibility_container" class="qrsmallfont">';
    sett+='<input id="chk_select_all" type="checkbox"/><label for="chk_select_all"><b>Toggle All</b></label><br>';
    sett+=spacer;
    sett+='<input id="misc_hideavatar" type="checkbox" '+(gvar.settings.hideavatar=='1' ? 'checked':'')+'/><label for="misc_hideavatar">Hide Avatar</label><br>';
    sett+=spacer;
    sett+='<div id="main_controller">';
    var lcL=gvar.labelControl.length;
    for(var i=0; i<lcL; i++)
     if( isString(gvar.labelControl[i]) )
      sett+='<input id="qrset_'+gvar.labelControl[i]+'" type="checkbox" '+(gvar.settings.hidecontroll[i]=='1' ? 'checked':'')+'/><label for="qrset_'+gvar.labelControl[i]+'">Hide ' + gvar.labelControl[i]+'</label><br>';
    sett+='</div></div>'; // #main_controller  #visibility_container
    return sett;
 }
 ,getTPL_Settings_General: function(){
    var spacer = '<div style="height:5px;">&nbsp;</div>';
    return (''
     +'<div id="general_container" class="qrsmallfont">'
     +(!gvar.noCrossDomain && isQR_PLUS==0 ? '<input id="misc_updates" type="checkbox" '+(gvar.settings.updates=='1' ? 'checked':'')+'/><label for="misc_updates" title="Check Userscripts.org for QR latest update">Updates</label>&nbsp;&nbsp;<a id="chk_upd_now" class="twbtn twbtn-m lilbutton" href="javascript:;" title="Check Update Now">check now</a>':'')
     +(!gvar.noCrossDomain && isQR_PLUS==0 ? '<div id="misc_updates_child" class="smallfont" style="margin:2px 0 0 20px;'+(gvar.settings.updates=='1' ? '':'display:none;')+'" title="Interval check update, 0 &lt; interval &lt;= 99"><label for="misc_updates_interval">Interval:<label>&nbsp;<input id="misc_updates_interval" type="text" value="'+gvar.settings.updates_interval+'" maxlength="5" style="width:40px; padding:0pt; margin-top:2px;"/>&nbsp;days</div>':'')
     +spacer
     +'<input id="misc_dynamic" type="checkbox" '+(gvar.settings.dynamic=='1' ? 'checked':'')+'/><label for="misc_dynamic">Dynamic QR'+(isQR_PLUS!==0?'+':'')+'</label>'
     +spacer
     +'<input id="misc_ajaxpost" type="checkbox" '+(gvar.settings.ajaxpost=='1' ? 'checked':'')+'/><label for="misc_ajaxpost">AjaxPost &amp; Auto-Redirect</label>'
     +spacer
     +'<input id="misc_autoexpand_0" type="checkbox" '+(gvar.settings.textareaExpander[0] ? 'checked':'')+'/><label for="misc_autoexpand_0">AutoGrow Textarea</label>'
     +spacer
     +'<input id="misc_autoshow_smile" type="checkbox" '+(gvar.settings.autoload_smiley[0]=='1' ? 'checked':'')+'/><label for="misc_autoshow_smile">AutoLoad Smiley</label>'
     +'<div id="misc_autoshow_smile_child" class="smallfont" style="margin:0 0 0 20px;'+(gvar.settings.autoload_smiley[0]=='1' ? '':'display:none;')+'">'
     +'<input name="cb_autosmiley" id="misc_autoshow_smile_kecil" type="radio" value="kecil" '+(gvar.settings.autoload_smiley[1]=='kecil' ? 'CHECKED':'')+'/><label for="misc_autoshow_smile_kecil">kecil</label>&nbsp;'
     +'<input name="cb_autosmiley" id="misc_autoshow_smile_besar" type="radio" value="besar" '+(gvar.settings.autoload_smiley[1]=='besar' ? 'CHECKED':'')+'/><label for="misc_autoshow_smile_besar">besar</label>&nbsp;'
     +'<input name="cb_autosmiley" id="misc_autoshow_smile_custom" type="radio" value="custom" '+(gvar.settings.autoload_smiley[1]=='custom' ? 'CHECKED':'')+'/><label for="misc_autoshow_smile_custom">custom</label>'
     +'</div>'
     +spacer
     +'<input id="misc_autolayout_sigi" type="checkbox" '+(gvar.settings.userLayout.config[0]=='1' ? 'checked':'')+'/><label for="misc_autolayout_sigi">AutoSignature</label>&nbsp;'
     +'<a id="edit_sigi" class="twbtn twbtn-m lilbutton" href="javascript:;">edit</a>&nbsp;&nbsp;<a id="edit_sigi_cancel" href="javascript:;" class="cancel_layout cancel_layout-invi twbtn twbtn-m lilbutton"> cancel </a>'
     +'<div id="edit_sigi_Editor" style="display:none;"></div>'
     +spacer
     +'<input id="misc_autolayout_tpl" type="checkbox" '+(gvar.settings.userLayout.config[1]=='1' ? 'checked':'')+'/><label for="misc_autolayout_tpl">AutoLayout</label>&nbsp;'
     +'<a id="edit_tpl" class="twbtn twbtn-m lilbutton" href="javascript:;">edit</a>&nbsp;&nbsp;<a id="edit_tpl_cancel" href="javascript:;" class="cancel_layout cancel_layout-invi twbtn twbtn-m lilbutton"> cancel </a>'
     +'<div id="edit_tpl_Editor" style="display:none;"></div>'
     +spacer     
     +'<input id="misc_hotkey" type="checkbox" '+(gvar.settings.hotkeykey.toString()=='0,0,0' || gvar.settings.hotkeychar=='' ? '':'checked')+'/><label for="misc_hotkey">QR-Hotkey</label>'
     +'<div id="misc_hotkey_child" class="smallfont" style="margin:2px 0 0 15px;'+(gvar.settings.hotkeykey.toString()=='0,0,0' || gvar.settings.hotkeychar=='' ? 'display:none;':'')+'">'
     +'&nbsp;<input id="misc_hotkey_ctrl" type="checkbox" '+(gvar.settings.hotkeykey[0]=='1' ? 'checked':'')+'/><label for="misc_hotkey_ctrl">ctrl</label>&nbsp;'
     +'<input id="misc_hotkey_alt" type="checkbox" '+(gvar.settings.hotkeykey[2]=='1' ? 'checked':'')+'/><label for="misc_hotkey_alt">alt</label>&nbsp;'
     +'<input id="misc_hotkey_shift" type="checkbox" '+(gvar.settings.hotkeykey[1]=='1' ? 'checked':'')+(gvar.settings.hotkeykey.toString()=='0,0,0' || gvar.settings.hotkeychar=='' ? ' disabled="disabled"':'')+'/><label for="misc_hotkey_shift">shift</label>'
     +'&nbsp&nbsp;+&nbsp;&nbsp;'
     +'<label for="misc_hotkey_char" title="alphnumeric [A-Z0-9]; blank=disable">Char&nbsp;</label><input id="misc_hotkey_char" type="text" value="'+(gvar.settings.hotkeychar)+'" style="width:20px;padding:0" maxlength="1"/>'
     +'</div>'     
     +'</div>' // #general_container
    );
 }
 ,getTPL_Settings: function(){
    var spacer = '<li><div style="height:5px;"></div></li>';
    return (''
     +'<table class="tborder" align="center" border="0" cellpadding="6" cellspacing="0" width="100%" height="440px;"><tbody>'
     +'<tr valign="top"><td class="alt2 qrset-alt2">'
     +'<div style="">'
     + '<ul class="qrset-menu" id="qrset_menu">'
     +spacer
     +  '<li class="qrtab current" id="tab_general"><a href="javascript:;">General</a></li>'
     +  '<li class="qrtab" id="tab_control"><a href="javascript:;">Visibility</a></li>'
     +spacer
     +  '<li class="qrtab" id="tab_eximp"><a href="javascript:;">Export Import</a></li>'
     +spacer
     +  '<li class="qrtab" id="tab_shortcut"><a href="javascript:;">Keyboard Shortcuts</a></li>'
     +spacer
     +  '<li class="qrtab qrset-lasttab" id="tab_about"><a href="javascript:;">About QR</a></li>'
     +  '<li class="qrset-close" id="tab_close"><a href="javascript:;">Close</a></li>'
     + '</ul>'
     +'</div>'
     +'</td>'
     +'<td class="alt1 qrset-alt1">'
     +'<div id="general_control" class="qroutline">'
     + '<div id="tbcon_general" class="qrset-content qrset-show">'
        // GENERAL_CONTENT
     +  rSRC.getTPL_Settings_General()
     + '</div>'
     + '<div id="tbcon_control" class="qrset-content">'
        // CONTROLER
     +  rSRC.getTPL_Settings_Controller()
     + '</div>'
     + '<div style="clear:both; text-align:center; width:100%; margin-top:5px; position:absolute; bottom:50px; left:11%;">'
     +  '<input type="button" id="save_settings" class="twbtn twbtn-m" value="Save"/>'
     + '</div>'
     +'</div>' // #general_control
     +'<div id="tbcon_eximp" class="qrset-content qroutline">'
       // EXPORT_IMPORT
     + rSRC.getTPL_Settings_ExpImp()
     +'</div>'
     +'<div id="tbcon_shortcut" class="qrset-content qroutline">'
       // KEYBOARD_SHORTCUT
     + rSRC.getTPL_Settings_ShortCuts()
     +'</div>'
     +'<div id="tbcon_about" class="qrset-content qroutline">'
       // ABOUT
     + rSRC.getTPL_Settings_About()
     +'</div>'
     +'</td></tr>'
     +'</tbody></table>'    
    );
 }

 ,getTPL_sCustom: function(tab_id){
return(''
+'<table class="" border="0" cellpadding="0" cellspacing="0" width="100%" style=""><tbody>'
+'<tr><td class="smallfont" style="">'
+'<div id="scustom_group" style="padding:1px 2px 1px 1px;margin:1px;position:relative;">'
+'<div id="dv_menu_disabler" style="position:absolute;padding:2px 0;margin:-4px 0 0 -2px;opacity:.15;filter:alpha(opacity=15);background:#000;width:100%;height:100%;border:0;display:none;"></div>'
+  '<ul id="ul_group" class="qrset-menu" style="">'
+  '<li class="qrtab current"><a href="javascript:;">loading...</a></li>'
+  '</ul>'
+'</div>'
+'</td><td width="100%">'
+'<div id="right_scustom_container" class="smallfont">'
+  '<div id="'+tab_id+'" style="display:none;"></div>' // #scustom_container
+'</div>'
+'</td></tr>'
+'</tbody></table>'
);
  }
 
 ,getTPL_inerUploader: function(){
return(''
+'<fieldset class="fieldset" style="margin-top:6px;">'
+'<legend><span id="fld_title">Upload Images</span><span style="font-weight:bold;" id="legend_subtitle">&nbsp;</span></legend>'
+'<div id="uparent_container">'
  +'<div id="upload_container"></div>'
+'</div>' // #uparent_container
+'</fieldset>'
); 
  }
 ,getTPL_sUploader: function(){
   return('<div id="suploader_container" style=""></div>');
  }
}; // end rSRC

// =============== /END Global Var ===
// ------
init();
// ------

})();
/* Mod By Idx. */