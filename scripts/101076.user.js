// ==UserScript==
// @name           cendoldarkbb-qrfixer
// @namespace      http://userscripts.org/scripts/show/101076
// @description    darkbb-fixer (phpBB) 
// @author         idx (http://userscripts.org/users/idx)
// @license        (CC) by-nc-sa 3.0
// @include        http://*.darkbb.com/*
// @match          http://*.darkbb.com/*
// @version        0.7
// @timestamp      1309373780487
// ==/UserScript==
// -!--latestupdate
//
// v0.7 - 2011-06-30
//   Improve PM send-to like kaskus forum (vBulletin)
//
// v0.6 - 2011-04-26
//   Fix failed shortcut
//
// -/!latestupdate---
(function(){
// Initialize Global Variables
var gvar=function(){};

gvar.__DEBUG__ = false;
/*
javascript:window.alert(new Date().getTime());
*/

function init(){
  
  gvar.img_path= "http://illiweb.com/fa/wysiwyg/";
  gvar.id_textarea= "text_editor_textarea";
  
  gvar.domain = location.protocol+'//'+location.host+'/';
  gvar.pathloc = location.pathname||'';
  
  gvar.search_path = '';
  
  gvar.pasangan= rSRC.getSetOf('pasangan');
  gvar.coloroptions= rSRC.getSetOf('color');
  gvar.fontoptions= rSRC.getSetOf('font');
  gvar.sizeoptions= rSRC.getSetOf('size'); 
  
  getAuth();
  // --------
  
  // let's roll
  if(gvar.auth) 
    start_Main();  
  
  if(gvar.pathloc=='/privmsg') 
    event_txta();  
}

function start_Main(){
  var par,el, vB01='vB_Editor_001';
  
  // relayout current editor
  relayout_tpl();
  
  // place global style
  GM_addGlobalStyle( rSRC.getCSS(), 'css_darkbb', true );

  if($D('#text_editor_controls'))
    $D('#text_editor_controls').innerHTML = rSRC.getTPL_qr_control();

  if(Dom.g(gvar.id_textarea))
    on('keydown',Dom.g(gvar.id_textarea),function(e){return is_keypress_pressed(e)});  
  
  // event for each element
  for(var id in gvar.pasangan){
    if(!isString(gvar.pasangan[id])) continue;

	if(el=$D(id)) switch(gvar.pasangan[id]){
	  case "Bold":case "Ital.":case "Underl.":case "Strike":case "Left":case "Center":case "Right":case "Justified":
		on('click',el,function(e){do_align_BIU(e)});
	  break;
	  
	  case "Quote":case "Code":case "Image":case "Link":case "Video":
	   on('click',el,function(e){do_btncustom(e)});
	  break;
	  case "line_break":
	   on('click',el,function(e){do_btncustom_single(e)});
	  break;
	  case "dotlist":case "numberlist":
	   on('click',el,function(e){do_btncustom_list(e)});
	  break;
	  
	  default:
	  break;
	}    
  } // end for  
  
  // event buat Other
  el = create_popup_other();  
  par = $D('popup_btn_other');
  if(par) Dom.add(el,par);
  el = $D('#btn_other');
  if(el) on('click',el,function(e){clickpick(e,'popup_btn_other_menu')});

  
  // fungsi click pick
  var clickpick = function(el,id){
    var ve=$D(id);
    ve.style.display=(ve.style.display==''?'none':'');
    if(ve.style.display!='none') try{Dom.g(id+'_dumy').focus();}catch(el){}
  };
  // event buat kolor
  par = $D(vB01+'_popup_forecolor'), el = create_popup_color();  
  if(par) Dom.add(el,par);
  el = $D('#pick_kolor');
  if(el) on('click',el,function(e){clickpick(e, vB01+'_popup_forecolor_menu');});
  
  // event buat size  
  el = create_popup_size();
  par = $D(vB01+'_popup_fontsize');
  if(par && el) Dom.add(el,par);
  el = $D('#pick_size');
  if(el) on('click',el,function(e){clickpick(e,vB01+'_popup_size_menu')});
  
  // event buat font  
  el = create_popup_font();  
  par = $D(vB01+'_popup_fontname');
  if(par) Dom.add(el,par);  
  el = $D('#pick_font');
  if(el) on('click',el,function(e){clickpick(e,vB01+'_popup_fontname_menu')});
  
  // event buat clear 
  el = $D('btn_clear');
  if(el) on('click',el,function(){vB_textarea.set('')});  
  
} // end start_main


// event multiple send PM like kaskus.us (vBulletin)
function event_txta(){
    var els = $D('//input[contains(@name,"username")]'), el, txta, leng, inp, par, Attr, tmpTxt;
    gvar.search_path = gvar.domain + 'search?mode=searchuser';
    
    // take one element & mae event for em
    if(leng = els.snapshotLength){
        inp = els.snapshotItem(0);
        par = inp.parentNode;

        // get all value of username
        tmpTxt = '';
        for(var j=0; j<leng; j++){
            inp = els.snapshotItem(j);
            if(inp.value) tmpTxt+=inp.value + ' ; ';
        }
        // recreate with textarea
        Attr={id:'send_to','tabindex':'100',dir:'ltr',name:'send_to_username','style':'width:450px!important; height:50px!important;float:left;'};
        txta = createEl('textarea',Attr, tmpTxt);        
        par.innerHTML = '';
        Dom.add(txta, par);        
        
        //  == POPUP username ==
        // create container of hidden username_list
        el = createEl('div',{id:'hidden_username_list', style:'position:absolute; left:-10000;'}, '');
        Dom.add(el, par);
        // create container popup_cont
        el = createEl('div',{style:'position:relative;'});
        par.insertBefore(el, par.firstChild);
         par = el;
        el = createEl('div',{id:'popup_cont', 'class':'vbmenu_popup',style:'overflow:hidden; margin-top:50px!important; display:none;'});
        Dom.add(el, par);
        
        // do event
        vB_dbb_AJAX_NameSuggest('username', 'send_to');
        
        // event for preview & send buttons
        els = ['btn_preview', 'btn_post'];
        for(var i=0; i<els.length; i++){
            el = $D('#'+els[i]);
            if(el)
                on('click', el, function(e){
                    e= e.target||e;
                    var vals, par = $D('#hidden_username_list'), txta=$D('#send_to'), el, Attr;
                    if(txta && par){
                        vals = txta.value.split(';');
                        for(var i=0; i<vals.length; i++){
                            Attr = {'name':'username[]', 'type':'hidden', 'value':vals[i].trim()};
                            el = createEl('input', Attr);
                            Dom.add(el, par);
                        }
                    }
                });
        }
        
    }
}


/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 3.8.0
|| # ---------------------------------------------------------------- # ||
|| # Copyright ©2000-2009 Jelsoft Enterprises Ltd. All Rights Reserved. ||
|| # ---------------------------------------------------------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
|| #################################################################### ||
\*======================================================================*/
function vB_dbb_AJAX_NameSuggest(varname, txta_id){
    this.textobj = $D('#'+txta_id);
    this.varname = varname;
    this.fragment = "";
    this.donenames = "";
    this.selected = 0;
    this.menuopen = false;
    this.timeout = null;
    this.names = new Array();
    this.active = false;
    this.allow_multiple = true;
    this.min_chars = 2;
    
    this.popupname = 'popup_cont';
    var that = this;
    
    this.get_text = function () {
        if (this.allow_multiple) {
            var E = this.textobj.value.lastIndexOf(";");
            if (E == -1) {
                this.donenames = new String("");
                this.fragment = new String(this.textobj.value);
            } else {
                this.donenames = new String(this.textobj.value.substring(0, E + 1));
                this.fragment = new String(this.textobj.value.substring(E + 1));
            }
        } else {
            this.fragment = new String(this.textobj.value);
        }        
        this.fragment = this.fragment.trim();
    };    
    this.set_text = function (E) {
        if (this.allow_multiple) {
            this.textobj.value = (this.donenames + " " + (this.names[E]).trim() + " ; ");
        } else {
            this.textobj.value = (this.names[E]).trim();
        }
        this.textobj.focus();
        this.menu_hide();
        return false;
    };    
    this.move_row_selection = function (E) {
        var F = parseInt(this.selected, 10) + parseInt(E, 10);
        if (F < 0) {
            F = this.names.length - 1;
        } else {
            if (F >= this.names.length) {
                F = 0;
            }
        }
        this.set_row_selection(F);
        return false;
    };    
    this.set_row_selection = function (E) {
        var P=$D('#'+this.popupname), F = getTag('div',P);
        
        F[this.selected].className = "vbmenu_option";
        this.selected = E;
        F[this.selected].className = "vbmenu_hilite";
    };        
    this.key_event_handler = function (E) {
        E = E ? E : window.event;
        if (this.menuopen) {
            do_an_e(E);
            switch (E.keyCode) {
            case 38:
                this.move_row_selection(-1);
                return false;
            case 40:
                this.move_row_selection(1);
                return false;
            case 27:
                this.menu_hide();
                return false;
            case 13:
                this.set_text(this.selected);
                return false;
            }
        }        
        this.get_text();
            
        if (this.fragment.length >= this.min_chars) {
            clearTimeout(this.timeout);
            
            if( this.fragment.indexOf('*')==-1 ) this.fragment+= '*';
            var that = this;
            this.timeout = window.setTimeout(function() { that.name_search(that.fragment); }, 500);
        } else {
            this.menu_hide();
        }        
    };    
    this.menu_build = function(){
        var el, that, upto=15, tgt=$D('#'+this.popupname), that=this;
        if(tgt){            
            tgt.innerHTML = '';
            for(var i=0; i<this.names.length; i++){
                upto++;
                el = createEl('div', {'id':'mnu_el_'+i,'class':''+(i==0 ? 'vbmenu_hilite':'vbmenu_option'),'style':'text-align: left; font-size: 12px;'}, this.names[i]);
                on('click', el, function(e){
                    e=e.target||e;
                    var F=e.id.replace('mnu_el_', '');
                    that.set_text(F);
                });
                Dom.add(el, tgt);
                if(i > upto) break;
            }
            this.active = true;
            this.menu_show();
        }    
    };
    this.menu_show = function(){
        if (this.active) {
            $D('#'+this.popupname).style.display = '';
            this.menuopen = true;
        }
    };
    this.menu_hide = function(){
        var tgt=$D('#'+this.popupname);
        if(tgt){
            tgt.innerHTML = '';
            tgt.style.display = 'none';
            this.menuopen = false;
            this.selected = 0;
        }
    };
    this.name_search = function(q){
        var that = this, spost = '&search_username='+q + '&search=Search';
        GM_XHR.uri = gvar.search_path;
        GM_XHR.cached = true;
        GM_XHR.request(spost.toString(),'post', that.handle_ajax_request);
    };
    this.handle_ajax_request = function(reply_html){
        if( isUndefined(reply_html) ) return false;
        reply_html = reply_html.responseText;
       
        this.names = [];
        var ret, that=this, parser = function(S, $1){that.names.push($1)}
        ret = reply_html.replace(/>([^>]+)<\/option/gi, parser );
        this.menu_build();
    };    
    
    on('click', this.textobj, function(){
        that.menu_hide();
        that.active=true;
    });
    on('blur', this.textobj, function(){
        that.active=false; var T=this;
        window.setTimeout(function() { T.menu_hide(); }, 300);
    });
    on('focus', this.textobj, function(){that.active=true});
    on('keyup', this.textobj, function(E){that.key_event_handler(E)});
    on('keypress', this.textobj, function(E){
        E = E ? E : window.event;
        if (E.keyCode == 13) {
            return (that.menuopen ? false : true)
        }    
    });
}

// relayout, prep everything before making change
function relayout_tpl(){
  var tgt=Dom.g(gvar.id_textarea), par = tgt.parentNode, el, Attr, onc, cucok;
  var delAttr=function(o,at){
    if(isUndefined(at)) at='tabindex';
    o.removeAttribute(at);
	return o;
  };
  
  // recreate textarea to remove default event
  if(tgt) {
	gvar.isQR = $D('#quick_reply');
	var tmpTxt = tgt.value, lW=tgt.clientWidth;
	if( Dom.g(gvar.id_textarea) ) Dom.remove( Dom.g(gvar.id_textarea) );
	Attr={id:gvar.id_textarea,'tabindex':'102',dir:'ltr',name:'message',
	   'style':'width:'+(gvar.isQR?'575px':(lW-5)+'px')+'!important;'+(gvar.isQR?'height:125px!important;':'')};
	el=createEl('textarea',Attr,tmpTxt);
	par.insertBefore(el, par.firstChild);
	
    //resize textarea
    par.style.setProperty('height', '125px', 'important');
    if(gvar.isQR) par.style.setProperty('width', '580px', 'important');	
  }
  // reorder tabindex [title,txtarea,preview,post]
  el=$D('.//input[@name="subject"]',null,true);
  if(el){
	el=delAttr(el);
    el.setAttribute('tabindex','101');
  }
  
  // redesign preview and post
  el=$D('.//input[@name="preview"]',null,true);
  if(el) {
    el.title="Preview (Alt+P)";
	el.id = "btn_preview";
	el=delAttr(el);
	el.setAttribute('tabindex','103');
  }
  el=$D('.//input[@name="post"]',null,true);
  if(el) {
    el.title="Post (Ctrl+Enter or Alt+X)";
	el.id = "btn_post";
	el=delAttr(el);
	el.setAttribute('tabindex','104');
  }  
  
  // hide helpbox is available
  if(el=$D('helpbox'))
    el.style.display='none';
}

// uploader auth
function getAuth(){
  // collect uploader auth
  var el = $D('servimg'), onc=el.getAttribute('onclick').toString(), cucok;
  if(cucok=/([^\(]+).([^,]+).\s*['"]([^'"]+).,\s*['"]([^'"]+).,\s*['"]([^'"]+)/.exec(onc)){
    gvar.auth= {};
	gvar.auth.func = cucok[1];
	gvar.auth.obj = cucok[2];
	gvar.auth.email = cucok[3];
	gvar.auth.hash = cucok[4];
	gvar.auth.tid = cucok[5];
  }else{
    gvar.auth = false;
  }
}

// event for every button
function do_insertTag(tag, value){
  vB_textarea.init();
  vB_textarea.wrapValue(tag, (value ? value :null) ); // phpBB no need this: (isNaN(value)?'"':'')
}

function tTagFromAlt(e){
  var tag=e;
  if(typeof(e)=='object'){
	el=e.target||e;
    e=el;
	if(el.nodeName!='IMG'){
	  e = getTag('img',el);
	  if(e.length) e=e[0];
	}
	return e.alt;
  }else if(typeof(e)=='string'){
    return e;
  }else{
    return false;
  }
}
function do_align_BIU(e){
  var el, tag=tTagFromAlt(e);
  var pTag={
    'Bold' :'B',    'Ital.' :'I',      'Underl.':'U','Strike':'STRIKE',
    'Left' :'LEFT', 'Center' :'CENTER', 'Right'    :'RIGHT', 'Justified'    :'JUSTIFIED',
  };
  if(tag && tag.indexOf('Align ')!=-1) tag = tag.replace('Align ','');
  if(isUndefined(pTag[tag])) return;
  vB_textarea.init();
  vB_textarea.wrapValue(pTag[tag],''); 
}
function do_btncustom_list(e, nospace){
  var tag=tTagFromAlt(e), mode=(tag=='numberlist' ? 'number':'dot'), ins='1';
  //case "-List":case "Ordered List":
  // [LIST]  
  do_insertTag('LIST', (mode=='number' ? 1:null) );
  //gvar.firstRec = 1;
  vB_textarea.focus();
  reInsert();  
}
function reInsert(pass){
   var ins=prompt("Enter a list item.\nLeave the box empty or press 'Cancel' to complete the list:");
   vB_textarea.init();
   if(isUndefined(pass)) vB_textarea.setValue( '\n' );
   if(ins){    
	vB_textarea.setValue( '\n' + '[*]' + ins + '');
	reInsert(true);
   }else{
    return;	
   }
}

function do_btncustom_single(e, nospace){
  var tag=tTagFromAlt(e);
  var pTag={
    'line_break' :'HR'
  };
  vB_textarea.init();
  vB_textarea.setValue( '['+pTag[tag]+']' + (!nospace ? ' ':'') );
}
function do_btncustom(e){
  var tag=tTagFromAlt(e);  
  var tagprop = '';
  if(tag) tag=tag.replace(/[\[\]]/g,'').replace('Insert ','').toLowerCase();
 
  var pTag={
     'quote':'QUOTE','code' :'CODE'
    ,'link' :'URL',  'image':'IMG'
    ,'spoiler' :'SPOILER'
	//,'transparent':'COLOR','noparse' :'NOPARSE','youtube' :'YOUTUBE'
    ,'video' :'YOUTUBE'
  };
  var endFocus=function(){ vB_textarea.focus(); return};
  if(!tag || isUndefined(pTag[tag])) return endFocus();;
  vB_textarea.init();
  
  if(tag=='quote' || tag=='code'){
    vB_textarea.wrapValue( tag );  
  }else if(tag=='spoiler'){
  
    var title = prompt('Please enter the TITLE of your Spoiler:', gvar.settings.lastused.sptitle );
    if(title==null) return endFocus();
    title = (title ? title : ' ');
    gvar.settings.lastused.sptitle = trimStr(title);
    //setValue(KS+'LAST_SPTITLE', title);
    vB_textarea.wrapValue( 'spoiler', title );

  }else{
    var text, selected = vB_textarea.getSelectedText();
    var is_video_link = function(text){
        text = trimStr ( text ); //trim
        if( text.match(/youtube\.com\/watch\?v=[\w\d-]+/i) ){
          var rx = /youtube\.com\/watch\?v=([^&]+)/i.exec(text);
          text = ( rx ? rx[1] : '');
		  pTag['video'] = 'YOUTUBE';
        }else if( /https?:\/\/(?:w{3}\.)?dailymotion\.com\/video\/.+/.test(text) ){		  
		  pTag['video'] = 'DAILYMOTION';
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
        case 'video':
          text = prompt('Please enter the Youtube or dailymotion URL', '');
        break;
      }
      if(text==null) return endFocus();
      if(tag=='video')
        text = is_video_link(text);
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
    if(tag=='link'||tag=='image'||tag=='video'){
       var ptitle=(tag=='video' ? ['Please enter the Youtube or dailymotion URL','']:['Please enter the URL of your '+tag+':','http://']);
       text = prompt(ptitle[0], ptitle[1]);
       if(text==null) return endFocus();
       switch(tag){
         case 'link':
          tagprop = text;
          text = selected;           
         break;
         case 'video':
           text = is_video_link(text);
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

function create_popup_other(){
  var el, id = 'popup_btn_other_menu', Attr, tCont;
  Attr = {id:id,'class':'vbmenu_popup',
    style:'width:130px;overflow:hidden;display:none;'
  };
  el = createEl('div',Attr);
  var pasOther= {
     'sub'    : 'Index'
    ,'sup'    : 'Exponent'
    ,'spoiler': 'Spoiler'
    ,'hide'   : 'Hidden'
    ,'scroll' : 'Horizontal scrolling'
    ,'updown' : 'Vertical scrolling'
    ,'rand'   : 'Random'
    ,'wow'    : 'Wow'
  };
  for (var tag in pasOther) {
    Attr={title:pasOther[tag],rel:tag,'class':'osize',style:'text-align:left;font-size:12px;'};
    tCont = createEl('div',Attr,pasOther[tag]);
	on('click',tCont,function(e){
	  e=e.target||e;
	  var eTag=e.getAttribute('rel');
	  var cont=Dom.g(id);
      cont.style.display='none';
	  do_insertTag(eTag);
	});
	Dom.add(tCont,el);
  }
  create_dummy_input(el, id+'_dumy');
  return el;
  
}
function create_popup_size(){
  var id = 'vB_Editor_001_popup_size_menu';
  var Attr = {id:id,'class':'vbmenu_popup',
       style:'overflow:hidden;display:none;'
    };
  var el = createEl('div',Attr);
  var tCont,prop, tFont;
  for (var tipe in gvar.sizeoptions) {
    prop = gvar.sizeoptions[tipe]; // ['', ''] = [inner, value]
    Attr={title:prop[1],'class':'osize',style:'text-align:left;'};
    tCont = createEl('div',Attr);
    tFont = createEl('font',{size:prop[0]+'pt'},tipe);
    Dom.add(tFont,tCont);
    on('click',tCont,function(e){
      e=e.target||e;
      if(e.nodeName=='FONT') e=e.parentNode;      
      var cont=Dom.g(id);
      cont.style.display='none';
      var eTitle = e.getAttribute('title');
      do_insertTag('size',eTitle);
    });
    Dom.add(tCont,el);
  }
  create_dummy_input(el, id+'_dumy');
  return el;
}
function create_popup_font(){
  var id = 'vB_Editor_001_popup_fontname_menu';
  var Attr = {id:id,'class':'vbmenu_popup',
       style:'width:200px;height:250px;overflow:auto;display:none;'
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
      do_insertTag('font',sfont);
    });    
    Dom.add(tClr,el);
  }
  create_dummy_input(el, id+'_dumy');
  return el;
}
function create_popup_color(){
  var id = 'vB_Editor_001_popup_forecolor_menu';
  var Attr = {id:id,'class':'vbmenu_popup',
    style:'overflow:hidden;display:none;'
  };
  var el = createEl('div',Attr);
  Attr = {cellPadding:0,cellSpacing:0,border:0};
  var table = createEl('table', Attr);
  Dom.add(table,el);
  var i=0,tr,kolor,div,td;
  var pickColor = function(e){
    e=e.target||e;
    if(e.nodeName=='DIV') e=e.parentNode;
    var etitle = e.id.replace('pick_color_','');
    do_insertTag('color',etitle);
    Dom.g(id).style.display='none';
  };
  for (var hex in gvar.coloroptions) {
    if(!isString(gvar.coloroptions[hex])) continue; // should do this, coz Opera lil weirdo
    if (i % 8 == 0) 
      tr = table.insertRow(-1);
    i++;
    kolor=gvar.coloroptions[hex];
    div = createEl('div',{style:'background-color:'+kolor},'&nbsp;');
    td = tr.insertCell(-1);
    td.className = "ocolor";
    Dom.add(div,td);
    td.title = td.colorname = kolor;
    td.id = "pick_color_"+td.colorname;
    
    on('click',td,function(e){ pickColor(e) });
  }
  // last row for transparent
  tr = table.insertRow(-1);
  kolor='transparent';
  div = createEl('div',{style:'background-color:'+kolor+';width:100%;','class':'gensmall'},'transparent');
  td = tr.insertCell(-1);
  td.setAttribute("colspan",8);
  Dom.add(div,td);
  td.title = td.colorname = kolor;
  td.id = "pick_color_"+td.colorname;    
  on('click',td,function(e){ pickColor(e) });
  
  create_dummy_input(el, id+'_dumy');
  return el;
}
function create_dummy_input(parent, dumy_id){
  var dumyEl = createEl('input',{id:dumy_id,style:'width:0px;height:0px;line-height:0px;border:0px;margin-left:-999999px;',value:''});
  on('blur',dumyEl,function(ec){
	if( gvar.stillOnIt ){
        ec = ec.target||ec;
        if(ec && ec.nodeName=='INPUT') ec=ec.parentNode;
		window.setTimeout(function(){
		  delete( gvar.stillOnIt );
		  if( !gvar.stillOnIt && ec ) ec.style.setProperty('display', 'none', '');
		}, 200);
	}
  });
  on('focus',dumyEl,function(ec){gvar.stillOnIt=true});
  Dom.add(dumyEl,parent);
}

// keydown on textarea
// Ketika keydown tab dari textarea
function is_keypress_pressed(C){
  var C = (!C ? window.event : C), asocKey={};
  if(C) {
   if(C.ctrlKey){ // mijit + Ctrl
    var B, A = C.keyCode ? C.keyCode : C.charCode;
    asocKey={
	  '13':'btn_post' // Enter
	 ,'66':'Bold' // B
	 ,'73':'Ital.' // I
	 ,'85':'Underl.' // U
	 
	 ,'69':'Center' // E
	 ,'76':'Left' // L
	 ,'82':'Right' // R
	 ,'74':'Justified' // U
	};
	B = (isDefined(asocKey[A])? asocKey[A] : false);
	//alert('al;'+C + ' - ' + C.ctrlKey + ' - '+B);
	if(B===false) return false;
    if(A==13){
      if(C.shiftKey) B = 'btn_preview'; // preview
	  if(Dom.g(B)) SimulateMouse(Dom.g(B), 'click', true); 
    }else{
      do_align_BIU(B);
	}
	C = do_an_e(C);

   }else
   if(C.altKey){ // mijit + Alt
    var B='', A = C.keyCode ? C.keyCode : C.charCode;
	asocKey={
	   '83':'btn_post' // [S] Submit post
	  ,'80':'btn_preview' // [P] Preview
	};
	B = (isDefined(asocKey[A])? asocKey[A] : false);
	if(B===false) return false;
    if(Dom.g(B)) SimulateMouse(Dom.g(B), 'click', true); 
	C = do_an_e(C);
	
   }else
   if(C.keyCode==9){ // mijit tab
     C = do_an_e(C);
     if($D('#btn_preview')) $D('#btn_post').focus();
   } // end keyCode==9
   return false;
  } // end event C
}


// end event for every buttons


function isThisThread(){ return $D('#text_editor_textarea') }

//=====
// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return (typeof(x)=='string' && x ? x.replace(/^\s+|\s+$/g,"") : '') };
function isLink(x) { return x.match(/((?:http(?:s|)|ftp):\/\/)(?:\w|\W)+(?:\.)(?:\w|\W)+/); }

function on(m,e,f,p){Dom.Ev(e,m,function(e){typeof(f)=='function'?f(e):void(0)},!p?false:true)}
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
function getTag(name, parent){
  var ret = (typeof(parent)!='object' ? document.getElementsByTagName(name) : parent.getElementsByTagName(name) );
  return (isDefined(ret[0]) ? ret : false);
}
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
   catch(e){ clog('Error. elem.dispatchEvent is not function.'+e)}
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


//========= Global Var Init ====
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
  forceGM:false, // force with GM-XHR & avoid using Native-XHR when with multifox
  cached:false,
  events:false,
  request: function(cdata,met,callback){
    if(!GM_XHR.uri) return;
    met=(isDefined(met) && met ? met:'GET');
    cdata=(isDefined(cdata) && cdata ? cdata:null);
    if(typeof(callback)!='function') callback=null;
	var pReq_xhr = {
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
    };	
    if( !GM_XHR.forceGM ) // always use this native; except update checker
      NAT_xmlhttpRequest( pReq_xhr );
    else
	  GM_xmlhttpRequest( pReq_xhr );
  }
};

// native/generic XHR needed for Multifox, failed using GM_xmlhttpRequest.
var NAT_xmlhttpRequest=function(obj) {
  var request=new XMLHttpRequest();
  request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
  request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
  try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
  if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
  request.send(obj.data); return request;
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
    removeClass('txa_readonly', this.Obj);
    addClass('txa_enable', this.Obj);
  },
  focus: function(){
    if(!this.Obj)
      this.Obj = Dom.g(gvar.id_textarea);
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
};

var rSRC = {
  getSetOf: function(type){
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
	 // name : [inner, value]
     return {
	   'tiny'   : ["1","7"]
	  ,'small'  : ["2","9"]
	  ,'normal' : ["3","12"]
	  ,'large'  : ["5","18"]
	  ,'huge'   : ["7","24"]
	 };
    break;
    case "pasangan":
     return {
       'addbbcode0' : 'Bold'
      ,'addbbcode2' : 'Ital.'
      ,'addbbcode4' : 'Underl.'
      ,'addbbcode34': 'Strike'
      ,'addbbcode52': 'Left'
      ,'addbbcode30': 'Center'
      ,'addbbcode32': 'Right'
      ,'addbbcode46': 'Justified'
      
      ,'addbbcode6' : 'Quote'
      ,'addbbcode8' : 'Code'
      ,'addbbcode14': 'Image'
      ,'addbbcode16': 'Link'
      ,'btn_video'  : 'Video'
   
      ,'addbbcode10':'dotlist'
      ,'addbbcode12':'numberlist'
      ,'addbbcode99':'line_break'
     };
    break;
   };
   return false;
 }

 ,getCSS: function(){
    return (''
  +'#'+gvar.id_textarea+'{min-height:'+(gvar.isQR?'125':'250')+'px}'
  +'.ofont:hover, .ocolor:hover, .osize:hover, .cdefault:hover {cursor:default!important;}'
  +'.ofont:hover, .osize:hover{border:1px solid #2085C1!important;background-color:#B0DAF2!important;}'
  +'.ofont, .osize, .ocolor {color:#000!important;background:#FFF!important;padding:1px!important;}'
  +'.ofont, .osize{border:1px solid transparent}'
  +'.ofont{text-align:left;}'
  +'div.vbmenu_popup table td {line-height:10px;width:13px!important;border:1px solid transparent;}'
  +'div.vbmenu_popup table td:hover {cursor:pointer!important;border:1px solid #2085C1;background-color:#B0DAF2;}'
  +'div.vbmenu_popup table td div {width:10px}'
  +'div.vbmenu_popup {z-index:99;position:absolute; background:#FFF; left:0; top:0; padding:3px; width:auto; height:auto; margin-top:21px!important;border:1px solid #DADADA;}'
  
  +'#text_edit button.button2{margin:0 1.5px!important}'
  +'.sepr{margin-left:1px;}'
  +'.vbmenu_option, .vbmenu_hilite{padding:1px 3px;}'
  +'.vbmenu_option:hover, .vbmenu_hilite:hover{background-color:#B0DAF2!important;color:blue;}'
  
  +'.vbmenu_option{background: #BBC7CE;color: #000000;font: 11px verdana, arial;white-space: nowrap;cursor: pointer;}'
  +'.vbmenu_hilite{background: #8A949E;color: #FFFFFF;font: 11px verdana, arial;white-space: nowrap;cursor: pointer;}'
  +''
	);
 }
 ,getTPL_qr_control: function(){
  return (''
    +'<table align="center" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="left"><span id="text_edit" style=""><button class="button2" type="button" id="addbbcode0" accesskey="b" title="Bold"><img title="Bold" src="'+gvar.img_path+'text_bold.png" alt="Bold"></button><button class="button2" type="button" id="addbbcode2" accesskey="i" title="Ital."><img title="Italic" src="'+gvar.img_path+'text_italic.png" alt="Ital."></button><button class="button2" type="button" id="addbbcode4" accesskey="u" title="Underline"><img title="Underl." src="'+gvar.img_path+'text_underline.png" alt="Underl."></button><button class="button2" type="button" id="addbbcode34" accesskey="x" title="Strike"><img title="Strike" src="'+gvar.img_path+'text_strikethrough.png" alt="Strike"></button>'	
	
	// [left,center,right,justified]
	+'<img src="'+gvar.img_path+'separator.png" style="vertical-align: middle;" alt="" class="sepr">'
    +'<button class="button2" type="button" id="addbbcode52" accesskey="m" title="Left"><img title="Left" src="'+gvar.img_path+'text_align_left.png" alt="Left"></button><button class="button2" type="button" id="addbbcode30" accesskey="t" title="Center"><img title="Center" src="'+gvar.img_path+'text_align_center.png" alt="Center"></button><button class="button2" type="button" id="addbbcode32" accesskey="g" title="Right"><img title="Right" src="'+gvar.img_path+'text_align_right.png" alt="Right"></button><button class="button2" type="button" id="addbbcode46" accesskey="jt" title="Justified"><img title="Justified" src="'+gvar.img_path+'text_align_justify.png" alt="Justified"></button>'
	
	
	// [list,numberlist,hr]
	+( !gvar.isQR ? ''
	 +'<img src="'+gvar.img_path+'separator.png" style="vertical-align: middle;" alt="" class="sepr">'
	 +'<button class="button2" type="button" id="addbbcode10" accesskey="l" title="dotlist"><img title="-List" src="'+gvar.img_path+'text_list_bullets.png" alt="-List"></button><button class="button2" type="button" id="addbbcode12" accesskey="o" title="Ordered List"><img title="Ordered List" src="'+gvar.img_path+'text_list_numbers.png" alt="numberlist"></button><button class="button2" type="button" id="addbbcode99" title="Insert a line break"><img title="Insert a line break" src="'+gvar.img_path+'text_horizontalrule.png" alt="line_break"></button>'
	: '')
    
	// [quote,code,table]
	+'<img src="'+gvar.img_path+'separator.png" style="vertical-align: middle;" alt="" class="sepr">'
    +'<button class="button2" type="button" id="addbbcode6" accesskey="q" title="Quote"><img title="Quote" src="'+gvar.img_path+'comments.png" alt="Quote"></button><button class="button2" type="button" id="addbbcode8" accesskey="c" title="Code"><img title="Code" src="'+gvar.img_path+'page_white_code.png" alt="Code"></button>'
	// table
	+( !gvar.isQR ? ''
	+'<button class="button2" onclick="selectWysiwyg(this,\'table_gui\')" onmouseover="helpline(\'tab\')" type="button" id="addbbcodetable" accesskey="" title="Insert a table"><img title="Insert a table" src="'+gvar.img_path+'table.png" alt="insert_table"></button>'
	:'')
    
	// [upload,image,link, flash,video]
	+'<img src="'+gvar.img_path+'separator.png" style="vertical-align: middle;" alt="" class="sepr">'
	+'<button class="button2" type="button" id="servimg" accesskey="y" title="Host an image" onclick="'+gvar.auth.func+'('+gvar.auth.obj+',\''+gvar.auth.email+'\',\''+gvar.auth.hash+'\',\''+gvar.auth.tid+'\')"><img title="Host an image" src="'+gvar.img_path+'picture_save.png" alt="hostupload"></button><button class="button2" type="button" id="addbbcode14" accesskey="p" title="Image"><img title="Image" src="'+gvar.img_path+'picture.png" alt="Image"></button><button class="button2" type="button" id="addbbcode16" accesskey="w" title="Link"><img title="Link" src="'+gvar.img_path+'link.png" alt="Link"></button>'
	+( !gvar.isQR ? ''
	 +'<button class="button2" onclick="selectWysiwyg(this,\'flash\')" onmouseover="helpline(\'fl\')" type="button" title="Flash"><img title="Flash" src="'+gvar.img_path+'page_white_flash.png" alt="Flash"></button><button id="btn_video" class="button2" type="button" title="Video"><img title="Video" src="'+gvar.img_path+'film.png" alt="Video"></button>'
	 :'')
	
    
	// [size,color,font]
	+'<img src="'+gvar.img_path+'separator.png" style="vertical-align: middle;" alt="" class="sepr">'
    +'<div class="imagebutton_color" id="vB_Editor_001_popup_fontsize" style="display:inline-block;position:relative">'
     +'<button id="pick_size" class="button2" type="button" title="Font size"><img title="Font size" src="'+gvar.img_path+'style.png" alt="Font size"></button>'
    +'</div>' // #vB_Editor_001_popup_fontsize
    +'<div class="imagebutton_color" id="vB_Editor_001_popup_forecolor" style="display:inline-block;position:relative">'
     +'<button id="pick_kolor" class="button2" type="button" title="Font color"><img src="'+gvar.img_path+'color_swatch.png" alt="Font color"></button>'
    +'</div>' // #vB_Editor_001_popup_forecolor	
    +'<div class="imagebutton_color" id="vB_Editor_001_popup_fontname" style="display:inline-block;position:relative">'
     +'<button id="pick_font" class="button2" type="button" title="Font"><img title="Font" src="'+gvar.img_path+'font.png" alt="Font"></button>'
    +'</div>' // #vB_Editor_001_popup_fontname
    
	+'<img src="'+gvar.img_path+'separator.png" style="vertical-align: middle;" alt="" class="sepr">'
    +'<div class="imagebutton_color" id="popup_btn_other" style="display:inline-block;position:relative">'
	 +'<input id="btn_other" class="button2" value="Others" style="height: 22px;" type="button">'
    +'</div>' // #btn_other
	
	+(gvar.isQR ? ''
	 +'<img src="'+gvar.img_path+'separator.png" style="vertical-align: middle;" alt="" class="sepr">'
     +'<button class="button2" style="width: 20px;" type="button" onclick="selectWysiwyg(this, \'sel_smilies\')"><img src="http://illiweb.com/fa/i/smiles/icon_smile.gif" alt=""></button>'
	 :'')
    
	+'</td>'
	+'<td align="right"><span class="gensmall"><a id="btn_clear" href="javascript:;">reset</a></span></td></tr></tbody></table>'
   +''
   );
 }
};

// -----------
if( isThisThread() ) init();
// -----------

})();
// script by ~Idx