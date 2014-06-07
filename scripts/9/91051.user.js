// ==UserScript==
// @name           Kaskus Mobile Quick Reply
// @namespace      http://userscripts.org/scripts/show/91051
// @description    Provide Quick Reply on Kaskus Mobile
// @author         idx (http://userscripts.org/users/idx)
// @version        1.0.4
// @dtversion      140208104
// @timestamp      1391881722727
// @include        http://m.kaskus.co.id/post/*
// @include        http://m.kaskus.co.id/thread/*
// @include        http://m.kaskus.co.id/lastpost/*
// @license        (CC) by-nc-sa 3.0
//
// -!--latestupdate
//
// v1.0.4 - 2014-02-08 . 1391881722727
//  fix css nighmode, Thx[Prothire]
//  fix elastic height editor, on window resize
//
// -/!latestupdate---
// ==/UserScript==
/*
//
// v1.0.3 - 2014-02-01 . 1391220996742
//  fix statics-cdn, css;
//  +include /lastpost/*
//
// v1.0.2 - 2014-01-31 . 1391108629548
//  fix submit failure, (invalid token)
//
// v1.0.1 - 2013-06-08 . 1370706033417
//  fix xhr (webkit) Thx=[paipo,FlurryBerry]
//
//
// more...
//
// v0.1.1 - 2010-11-23
// Init
//------
// ###@@###
// *dependency            https://addons.mozilla.org/en-US/firefox/addon/59/
// *XML of User Agent     http://techpatterns.com/downloads/firefox/useragentswitcher.xml
//
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.ms
// --------------------------------------------------------
*/
(function(){

  var gvar = function(){};
  gvar.sversion = 'v' + '1.0.4';
  gvar.scriptMeta = {
    timestamp: 1391881722727 // version.timestamp

   ,scriptID: 91051 // script-Id
  };
  /*
  window.alert(new Date().getTime());
  */
  //========-=-=-=-=--=========
  gvar.__DEBUG__ = !1; // development debug
  //========-=-=-=-=--=========

  const GMSTORAGE_PATH = 'GM_';
  const KS       = 'KEY_SAVE_';

  // predefined registered key_save
  var OPTIONS_BOX = {
     KEY_SAVE_AUTHORIZED_USERS: ['']
    ,KEY_SAVE_AVATARS_USERS: ['']
    ,KEY_SAVE_WIDE_THREAD: ['0']
    ,KEY_SAVE_TMP_TEXT: [''] // temporary text
    ,KEY_SAVE_TMP_TITLE: [''] // temporary text-title
    ,KEY_SAVE_TOGGLE_MENUS: ['0']
    ,KEY_SAVE_TOGGLE_PLUGINS: ['0']
  };

  //========= Global Var Init ====
  
  var GM_XHR = function(){
    this.uri = null;
    this.pid = null;
    this.returned= null;
    this.cached= false;
    var _gmxhr = this;
    this.request= function(cdata,met,callback){
      if( !_gmxhr.uri ) return;
      met=(isDefined(met) && met ? met:'GET');
      cdata=(isDefined(cdata) && cdata ? cdata:null);
      if(typeof(callback)!='function') callback=null;
      var pReq_xhr = {
        method: met,
        url: _gmxhr.uri + (_gmxhr.cached ? '':(_gmxhr.uri.indexOf('?')==-1?'?':'&rnd=') + Math.random().toString().replace('0.','')),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: (isString(cdata) ? cdata : ''),
        onload: function(ret) {
          if(callback!=null)
            callback(ret, _gmxhr);
          else
            _gmxhr.returned = ret;
        }
      };
      //return NAT_xmlhttpRequest(pReq_xhr); // somehow this is not work in webkit
      return GM_xmlhttpRequest(pReq_xhr);
    }
    return this;
  };
  var Dom= {
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
        return function(el, type, fn, phase) {
          phase=(phase ? phase : false);
          if('object' === typeof el && el)
            this.g(el).addEventListener(type, function(e){fn(e);}, phase);
        };
      }else if (window.attachEvent) {
        return function(el, type, fn) {
          var f = function() { fn.call(this.g(el), window.event); };
          this.g(el).attachEvent('on' + type, f);
        };
      }
    }(),
    Evs: function(node, types, f){
      var parts = types.split(' ');
      for(var i=0; i<parts.length; ++i)
        Dom.Ev(node, parts[i], f);
    },
    remEv: function() {
      if (window.removeEventListener) {
        return function(el, type, fn, phase) {
          phase=(phase ? phase : false);
          if(typeof(el)=='object')
            this.g(el).removeEventListener(type, function(e){fn(e);}, phase);
        };      
      }
    }()
  };
  var $D=function (q, root, single) {
    var el;
    if (root && typeof root == 'string') {
        root = $D(root, null, true);
        if (!root) { return null; }
    }
    if( !q ) return false;
    if ( typeof q == 'object') return q;
    root = root || document;
    if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
        if (single) {
          return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }
        return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    else if (q[0]=='.') {
      el = root.getElementsByClassName(q.substr(1));
      return single ? el[0] : el;
    }
    else {
      return root.getElementById( (q[0]=='#' ? q.substr(1):q.substr(0)) );
    }
    return root.getElementsByTagName(q);
  };
  // native/generic XHR needed for Multifox, failed using GM_xmlhttpRequest.
  var NAT_xmlhttpRequest = function (obj) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (obj.onreadystatechange) {
        obj.onreadystatechange(request);
      };
      if (request.readyState == 4 && obj.onload) {
        obj.onload(request);
      }
    }
    request.onerror = function () {
      if (obj.onerror) {
        obj.onerror(request);
      }
    }
    try {
      request.open(obj.method, obj.url, true);
      if (obj.headers) {
        for (name in obj.headers) {
          request.setRequestHeader(name, obj.headers[name]);
        }
      }
      request.send(obj.data);
      return request;
    } catch (e) {
      if (obj.onerror) {
        obj.onerror({
            readyState: 4,
            responseHeaders: '',
            responseText: '',
            responseXML: '',
            status: 403,
            statusText: 'Forbidden'
          });
      };
      return;
    }
  };

  // Redefine GM_addGlobalStyle/GM_addGlobalScript with a better routine
  var GM_addGlobalScript = function (a, b, c) {
    var d = createEl("script", { type: "text/javascript"});
    if (isDefined(b) && isString(b)) d.setAttribute("id", b);
    if (a.match(/^https?:\/\/.+/)) d.setAttribute("src", a);
    else d.appendChild(createTextEl(a));
    if (isDefined(c) && c) {
      document.body.insertBefore(d, document.body.firstChild)
    } else {
      var e = document.getElementsByTagName("head");
      if (isDefined(e[0]) && e[0].nodeName == "HEAD") window.setTimeout(function () {
        e[0].appendChild(d)
      }, 100);
      else document.body.insertBefore(d, document.body.firstChild)
    }
    return d
  };
  var GM_addGlobalStyle=function(css, id) {
    var sel=createEl('style',{type:'text/css'});
    if(isDefined(id) && isString(id)) sel.setAttribute('id', id);
    sel.appendChild(createTextEl(css));
    var hds = document.getElementsByTagName('head');
    if(hds && hds.nodeName=='HEAD')
      window.setTimeout(function() { hds[0].appendChild(sel); }, 100);
    else
      document.body.insertBefore(sel,document.body.firstChild);
    return sel;
  };
  var _TEXTCOUNT = {
    init: function( target ){
      var cUL, _tc = _TEXTCOUNT;

      _tc.limitchar = (gvar.thread_type == 'group' ? 1000 : 10000);
      _tc.$editor = $D('#'+gvar.tID);
      _tc.$target = ("string" == typeof target ? $D(target,null,1) : target);

      if( _tc.$target ){
        addClass('ffc', _tc.$target);
        _tc.$target.value = _tc.count_it(_tc);
      }
      _tc.do_watch(_tc);
    },
    count_it: function(_tc){
      return (_tc.limitchar - _tc.$editor.value.length);
    },
    do_watch: function(_tc){
      gvar.sTryTCount = window.setInterval(function() {
        _tc.$target.value = _tc.count_it(_tc);
      }, 600);
    },
    dismiss: function(){
      var _tc = _TEXTCOUNT;
      gvar.sTryTCount && clearInterval( gvar.sTryTCount );
      _tc.$target && removeClass('ffc', _tc.$target);
    }
  };
  var _TEXT = {
    e : null, eNat : null,
    content: "",
    cursorPos: [],
    last_scrollTop: 0,
    insert: {
      tagBIU: function(title){
        var pTag={
          'bold' :'B',    'italic' :'I',      'underline':'U',
          'left' :'LEFT', 'center' :'CENTER', 'right'    :'RIGHT'
        };
        if(title.indexOf('align ')!=-1) title = title.replace('align ','');
        if( isUndefined( pTag[title]) ) return;

        _TEXT.init();
        _TEXT.wrapValue( pTag[title], '' );
      },
      // action insert font/color/size/list
      tagHibrid: function(tag, value, $caleer){
        _TEXT.init();
        if(value)
          _TEXT.wrapValue(tag, value);
        else
          _TEXT.wrapValue(tag);

        if( (["FONT","COLOR","SIZE"].indexOf(tag) != -1) && $caleer ){
          showhide( closest($caleer, {'tag':'ul'}), false);
        }
        _TEXT.pracheck();
      },
      tagCustom: function(tag){
        _TEXT.init();
        
        var text, prehead, tagprop, ptitle, selected, ret;
        var pTag={
           'quote':'QUOTE','code' :'CODE','html' :'HTML','php' :'PHP'
          ,'link' :'URL',  'picture':'IMG'
          ,'spoiler' :'SPOILER','transparent':'COLOR','noparse' :'NOPARSE', 'youtube' :'YOUTUBE'
          ,'strike' :''
        };  
        var endFocus = function(){ _TEXT.focus(); return};
        if( isUndefined(pTag[tag]) ) return endFocus();
        selected = _TEXT.getSelectedText();
        tagprop = '';
        
        if(tag=='quote' || tag=='code' || tag=='html' || tag=='php'){
          _TEXT.wrapValue( tag );

        }else if(tag=='spoiler'){

          var title = prompt('Please enter the TITLE of your Spoiler:', '' );
          if(title==null) return endFocus();
          title = (title ? title : ' ');
          _TEXT.wrapValue( 'spoiler', title );  
          
        }else if(tag=='strike'){
          
          var strikeEm = function(t){
            var pr = t.split(''), r='';
            for(var i=0;i<pr.length;i++) r+=pr[i]+'\u0336';
            return String(r)
          };
          text = (selected!= '' ? selected :
            prompt('Please enter Text to strikethrough:', 'strikethrough') 
          );    
          if(text==null) return endFocus();
          ret = strikeEm(text);
          prehead = [0,(text.length*2)];
          if(selected=='')
            _TEXT.setValue( ret, prehead );
          else
            _TEXT.replaceSelected( ret, prehead );
        
          return endFocus();
        }else{

          var is_youtube_link = function(text){
            text = trimStr( text );
            var rx;
            if( rx = text.match(/\byoutube\.com\/(?:watch\?v=)?(?:v\/)?([^&]+)/i) ){
              text = ( rx ? rx[1] : '');
            }else if( !/^[\d\w-]+$/.test(text) )
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
            case 'picture':
              text = prompt('Please enter the URL of your image:', 'http://');
            break;
            case 'youtube':
              text = prompt('Please enter the Youtube URL or just the ID, \nhttp:/'+'/www.youtube.com/watch?v=########', '');
            break;
            }
            if(text==null) return endFocus();
            if(tag=='youtube')
              text = is_youtube_link(text);
            if(tag=='link' || tag=='picture')
              text = (isLink(text) ? text : null);
            if( !text ){
              return endFocus();
            }else{
              prehead = [('['+pTag[tag] + (tagprop!=''?'='+tagprop:'')+']').length, 0];
              prehead[1] = (prehead[0]+text.length);
              _TEXT.setValue( '['+pTag[tag] + (tagprop!=''?'='+tagprop:'')+']'+text+'[/'+pTag[tag]+']', prehead );
            }
            return endFocus();
          } // end selected==''
          
          tagprop = (tag=='transparent' ? 'transparent' : '');
          if(tag=='link'||tag=='image'||tag=='youtube'){
          
            ptitle=(tag=='youtube' ? ['Please enter the Youtube URL or just the ID, \nhttp:/'+'/www.youtube.com/watch?v=########',''] : ['Please enter the URL of your '+tag+':','http://']);
            text = prompt( ptitle[0], ptitle[1] );
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
            prehead = [('['+ pTag[tag] + (tagprop!=''?'='+tagprop:'')+']').length, 0];
            prehead[1] = (prehead[0]+text.length);
            _TEXT.replaceSelected( '['+pTag[tag] + (tagprop!=''?'='+tagprop:'')+']'+text+'[/'+pTag[tag]+']', prehead );
            return endFocus();
          }
          _TEXT.wrapValue( pTag[tag], (tagprop!='' ? tagprop:'') );
        }
      }
    },
    init: function() {
      this.e = $D('#'+gvar.tID);
      this.content = this.e.value;
      this.cursorPos = this.rearmPos(); // [start, end]
    },
    rearmPos: function(){
      return this.getCaretPos();
    },
    subStr: function(start, end){ return this.content.substring(start, end);},
    set_title: function(text){
      var tgt = $D('//div[@id="wrp_title"]/input[@name="title"]',null,1);
      tgt && (tgt.value = text);
    },
    set_reason: function(text){
      var tgt = $D('//div[@id="wrp_reason"]/input[@name="reason"]',null,1);
      if( tgt ){
        tgt.value = text;
        showhide(tgt.parentNode, 1, 'block');
      }
    },
    set: function(value){
      this.content = value;
      // track latest scrollTop, doing val() might reset it to 0
      this.last_scrollTop = Dom.g(gvar.tID).scrollTop;
      $D('#'+gvar.tID).value = this.content;
      this.init();

      this.pracheck();
    },
    wrapValue : function(tag, title){
      var bufValue, st2, start = this.cursorPos[0], end = this.cursorPos[1];

      tag = tag.toUpperCase();    
      bufValue = this.subStr(0, start) + 
        '['+tag+(title?'='+title:'')+']' + 
        (start==end ? '' : this.subStr(start, end)) + 
        '[/'+tag+']' + this.subStr(end, this.content.length);
      
      this.set(bufValue);
      st2 = (start + ('['+tag+(title?'='+title:'')+']').length);

      clog('s,e=' + start + ','+end);
      clog(st2 + ';' + (st2+this.subStr(start, end).length));

      this.caretChk( st2, (st2+this.subStr(start, end).length) );
      return bufValue; 
    },
    add: function(text){ // used on fetch post only
      var newline = '\n\n';
      if( $D('#'+gvar.tID).value != "" )
        this.content+= newline;
      $D('#'+gvar.tID).value = ( this.content + text );
      this.pracheck(false);
      
      window.setTimeout(function(){
        _TEXT.lastfocus();
      }, 200);
    },
    // ptpos stand to puretext position [start, end]
    setValue : function(text, ptpos){
      var bufValue, start = this.cursorPos[0], end=this.cursorPos[1];
      if(isUndefined(ptpos)) ptpos=[text.length,text.length];
      if(start!=end) {
        this.replaceSelected(text,ptpos);
        return;
      }
      bufValue = this.subStr(0, start) + text + this.subStr(start, this.content.length);
      this.set( bufValue );
      this.caretChk( (start+ptpos[0]), (start+ptpos[1]) );
      return bufValue; 
    },
    replaceSelected : function(text, ptpos){
      var bufValue, start=this.cursorPos[0], end=this.cursorPos[1];
      if(start==end) return;    
      bufValue = this.subStr(0, start) + text + this.subStr(end, this.content.length);
      this.set(bufValue);
      this.caretChk( (start+ptpos[0]), (start+ptpos[1]) );
    },
    pracheck: function(foc){
      if( isUndefined(foc) )
        foc = true;

      _TEXT.setElastic(gvar.maxH_editor);
      el = $D('.QxM',null,1);
      if( $D('#'+gvar.tID).value !="" )
        showhide(el, true);
      else
        showhide(el, false);

      foc && _TEXT.focus();
    },
    focus: function(){ 
      window.setTimeout(function(){ $D('#'+gvar.tID).focus() }, 10);
    },
    clear: function(dofocus){
      _TEXT.set('');
      dofocus && _TEXT.focus();
    },
    lastsroll: function (){
      // scroll to bottom editor line
      !_TEXT.e && (_TEXT.e = $D('#'+gvar.tID));
      try{
        _TEXT.e &&_TEXT.e.scrollTop(_TEXT.e.scrollHeight);
      } catch(e){}
    },
    lastfocus: function (){
      var eText, nl, pos, txt = String($D('#'+gvar.tID).value); // use the actual content
      pos = txt.length;
      nl = (txt.split('\n')).length;
      pos+= (nl * 2);
      eText = Dom.g(gvar.tID);
      try{
        if( eText.setSelectionRange ) {
          _TEXT.focus();
          eText.setSelectionRange(pos,pos);
        }
      }catch(e){}

      _TEXT.oflow && (_TEXT.oflow == 'auto') &&
        window.setTimeout(function(){ _TEXT.focus(); _TEXT.lastsroll() } , 310);
    },
    getSelectedText : function() {
      return (this.cursorPos[0]==this.cursorPos[1]? '': this.subStr(this.cursorPos[0], this.cursorPos[1]) );
    },
    getCaretPos : function() {  
      var ret=[0,0], el = Dom.g(gvar.tID);
      if(el && ('selectionStart' in el) && ('selectionEnd' in el) ){
        if(el.value.length > 0)
          ret = [el.selectionStart, el.selectionEnd];
      }
      return ret;
    },
    setCaretPos : function (pos,end){
      if(isUndefined(end)) end = pos;
      if(Dom.g(gvar.tID).setSelectionRange)    { // Firefox, Opera and Safari
        this.focus();
        Dom.g(gvar.tID).setSelectionRange(pos,end);
      }
    },
    setElastic: function(max,winrez){
      var a, tid=gvar.tID;

      function setCols_Elastic(el, max){
        el && el.setAttribute("cols", Math.floor(el.clientWidth/7));
        _TEXT.setRows_Elastic(max)
      }
      a = Dom.g(tid);
      _TEXT.oflow='hidden';
      a.setAttribute('style', 'visibility:hidden; overflow:'+_TEXT.oflow+';letter-spacing:0;line-height:14pt;'
        +(max?'max-height:'+(max-130)+'pt;':'')
      );

      gvar.wtrackY={};
      if( !winrez ){
        // doesnt work w/ opera?
        Dom.Ev(a, 'paste', function(e){
          var el = e.target||e;
          gvar.wtrackY['before'] = window.scrollY
          gvar.wtrackY['editor_overflow'] = (_TEXT.oflow != 'hidden');

          window.setTimeout(function(){
            setCols_Elastic(el, max);

            gvar.wtrackY['after'] = window.scrollY;
            if(gvar.wtrackY['after'] != gvar.wtrackY['before']){
              window.scrollTo(0, gvar.wtrackY['before']);

              if(!gvar.wtrackY['editor_overflow']){
                _TEXT.init();
                window.setTimeout(function(){ _TEXT.lastfocus() }, 222);
              }
            }
          }, 10);
          return true;
        }, false);

        Dom.Ev(a, 'keyup', function(e){ setCols_Elastic((e.target||e), max) });
      }
      setCols_Elastic(a, max); //110
    },
    setRows_Elastic: function(max){
      var a = Dom.g(gvar.tID), c=a.cols, b=a.value.toString(), h;
      b=b.replace(/(?:\r\n|\r|\n)/g,"\n");
      for(var d=2,e=0,f=0;f<b.length;f++){
        var g=b.charAt(f);e++;if(g=="\n"||e==c){d++;e=0}
      }
      h=(d*14); a.setAttribute("rows",d); a.style.height=h+"pt";
      _TEXT.oflow = (max && (d*14>(max-130)) ? 'auto':'hidden');
      a.style.setProperty('overflow', _TEXT.oflow, 'important');
      a.style.setProperty('visibility', 'visible');
    }, /*134*/
    caretChk: function(s,e){
      s && e && _TEXT.setCaretPos(s, e);
      // restore scrollTop on overflow mode:scroll
      if(_TEXT.last_scrollTop && _TEXT.overflow!='hidden'){
        Dom.g(gvar.tID).scrollTop = (_TEXT.last_scrollTop+1);
      }
    }
  };
  // _TOGGLER.capcay [clear_editor,auth_noneed_cpcy,whattheheck,response_field,capcay]
  var _TOGGLER = {
    clear_editor: function(flag){
      if("undefined" == typeof flag)
        flag = true;

      showhide($D('.QxM',null,1), flag);
    },
    auth_noneed_cpcy: function(flag){
      var el, chkauth = $D('#chk-auth');
      if("undefined" == typeof flag)
        flag = isChecked(chkauth);

      el = $D('#recaptcha_response_field');
      chkauth.checked = flag;
      if( flag ){
        el.value = (function(c){
          var ret = '';
          for(var i=0; i<27; ++i)
            ret+=c;
          return ret;
        })('#');
        //setAttr('disabled', 'disabled', el);
        setAttr('readonly', 'readonly', el);
        _TOGGLER.gnotice(false, '', $D('.g_notice', $D('#wrp_cpcy'), 1));
      }
      else{
        el.value = '';
        //el.removeAttribute('disabled');
        el.removeAttribute('readonly');
        el.focus();
      }
      showhide($D('#recaptcha_image'), !flag);
      showhide($D('#recaptcha_instructions_image'), !flag);
      return flag;
    },
    whattheheck: function(){
      showhide($D('.recaptcha-auth',null,1));
      $D('#recaptcha_response_field').focus();
    },
    response_field: function(isGood, dofocus){
      var thr, rrf = $D('#recaptcha_response_field'), p = (rrf ? rrf.parentNode : null);
      thr = $D('.btn-thr',null,1);
      if( isGood ){
        thr && addClass('bling', thr);
        p && removeClass('error', p);
        _TOGGLER.gnotice(false, '', $D('.g_notice', $D('#wrp_cpcy'), 1));
      }
      else{
        thr && removeClass('bling', thr);
        p && addClass('error', p);
        $D('#hidrecap_reload_btn').click();
      }
      showhide($D('.stts',null,1), isGood);
      
      dofocus &&
        window.setTimeout(function(){ rrf && rrf.focus() }, 123);
    },
    gnotice: function(flag, text, el){
      if("undefined" == typeof el)
        el = $D('.g_notice',null,1);
      text && (el.innerHTML = entity_encode(text));
      showhide(el, flag, (flag ? 'block' : ''));
    },
    isolate_editor: function(flag){
      var el, iel, tgt, par = $D('.form-input',null,1);
      if(flag){
        if( tgt = $D('.liner', par) )
        for(var i=0; i<tgt.length; ++i){
          el = createEl('div', {'class':'layerin'});
          prepend(tgt[i], el);
          addClass('layered', tgt[i]);
        }
      }
      else{
          while( tgt = $D('.layerin', par, 1) ){
            removeClass('layered', tgt.parentNode);
            Dom.remove(tgt);
          }
      }
    },
    baloon_set: function(text, iserror){
      var tgt = $D('.box-cnt', $D('#wrp_act'), 1);
      tgt && (tgt.innerHTML = text);
      if( !iserror )
        addClass('sip', tgt);
      else
        addClass('ups', tgt);
    },
    baloon_save: function(flag){
      var tgt = $D('#wrp_act');
      if("undefined" == typeof flag)
        flag = !isVisible(tgt);

      showhide(tgt, flag);
      _TOGGLER.isolate_editor( flag );
      removeClass('sip ups', tgt);
      if( !flag ){
        if(gvar.reqPID && "undefined" != typeof gvar.reqPID['_editpost_'])
          delete gvar.reqPID['_editpost_'];
      }
    },
    showhide_capcay: function(flag){
      var el, par, tgt = $D('#wrp_cpcy');
      if("undefined" == typeof flag)
        flag = !isVisible(tgt);

      showhide(tgt, flag);
      removeClass('bling', $D('.btn-thr',null,1));
      _TOGGLER.isolate_editor( isVisible($D('#wrp_cpcy')) );

      if( !gvar.user.isDonatur ){
        if( !isVisible(tgt) ){
          // baloon-closed
          if( !isChecked($D('#chk-auth')) ){
            el = $D('#sbutton');
            removeClass('blue', el);
            addClass('btn-red', el);
          }
          //_TOGGLER.response_field(true);
          _TOGGLER.gnotice(false, '', $D('.g_notice', $D('#wrp_cpcy'), 1));

          _TEXT.lastfocus();
        }
        else{
          // baloon-opened.
        }
      } // isdonat
    }
  };

  //=== rSRC
  var rSRC = {
    mCls: ['mBT','mDM','<li class="mSP">---------------</li>'],
    getTPL: function(){
      return ''
      +'<div class="form-input reply-input">'
      +'<hr class="sxln"/>'
      +'<div class="legend qrtitle">'
      + '<span>mQuick <em id="qrtitle_mode">Reply</em> <a target="_blank" href="http://userscripts.org/scripts/show/'+gvar.scriptMeta.scriptID.toString()+'" class="mqrlink">'+gvar.sversion+'</a></span>'
      +'</div>'
      +'<hr class="sxln"/>'
      +'<form action="" name="postreply" id="mqrform" method="post">'
      +'<fieldset>'
      +'<div class="in-txt liner" id="wrp_title">'
      + '<input type="text" name="title" maxlength="85" placeholder="Title" />'
      + '<span class="Qxc tgctr" style="display:none;" title="Clear Title">&times;</span>'
      + '<span class="Qct tgctr btn_stg'+(gvar.settings.toggle_menus ? ' active':'')+'" title="Toggle Menus"></span>'
      +'</div>'
      +'<div class="in-txt liner" id="wrp_control" '+(gvar.settings.toggle_menus ? '' : 'style="display:none;"')+'>'
      + rSRC.getControlers()
      +'</div>'

      +'<div class="in-txt liner" id="wrp_msg">'
      + '<textarea name="message" id="'+gvar.tID+'" placeholder="Body"></textarea>'
      + '<span class="QxM tgctr" style="display:none;" title="Clear Editor">&times;</span>'
      + '<div class="chr">'
      + '<span class="stts btn bling" style="display:none;"><i class="throb"></i> submitting..</span>'
      + '<input readonly="readonly" disabled="disabled" size="3" value="10000" id="txtLen" />'
      + '</div>'
      +'</div>'
      +'<div class="in-txt liner" id="wrp_reason">'
      + '<input type="text" name="reason" placeholder="Reason" title="Reason" />'
      +'</div>'

      +'<div class="in_balonbox" id="wrp_cpcy" style="display:none;">'
      + rSRC.getBtBaloon()

      + '<label class="cpcy-title">Verification</label>'
      + '<span class="tgctr btn btn-thr"><i class="throb"></i> </span>'
      + '<span class="Qcp tgctr" title="Close">&times;</span>'
      + '<div class="mqr-cpcy">' + rSRC.getCUSTOM_ReCapcay() + '</div>'
      +'</div>' // in_cpcy_boxed

      +'<div class="in_balonbox" id="wrp_act" style="display:none;">'
      + rSRC.getBtBaloon()
      + '<label class="box-title">Saving</label>'
      + '<span class="Qsv tgctr" title="Close">&times;</span>'
      + '<div class="box-cnt"><i class="throb-bl"></i>Loading...</div>'
      +'</div>'

      +'<div class="r">'
        // fake capcay.controller [create,reload]
      + '<input id="hidrecap_btn" value="reCAPTCHA" type="button" onclick="showRecaptcha();" class="ninja" />' 
      + '<input id="hidrecap_reload_btn" value="reload_reCAPTCHA" type="button" onclick="Recaptcha.reload();" class="ninja" />'
      + '<input type="hidden" name="securitytoken" id="mqr_securitytoken" value="" />'
      + '<input type="hidden" name="preview" value="Preview post" />'

      + '<div class="in-btn action">' // [btn-red,blue]
      +  '<input type="submit" id="sbutton" class="btn '+(gvar.user.isDonatur ? 'blue' : 'btn-red')+'" value="Post Reply" name="sbutton" />'
      +  '<input type="button" id="cbutton" class="btn btn-grey" value="Cancel" />'
      +  '<div class="sayapkanan liner">'
      +   '<input id="chk_fixups" type="checkbox" '+(gvar.settings.widethread ? 'checked="checked"':'')+' />'
      +   '<label title="Wider Thread" for="chk_fixups">Expand</label>'
      +  '</div>'
      + '</div>'
      +'</div>' // r
      +'</fieldset>'
      +'</form>'
      +'</div>' // form-input
      ;
    },
    getBtBaloon: function(){
      return ''
        + '<div class="center" style="position:absolute; bottom:0; left:46%; margin-bottom:-16px; font-size:20px; color:#ddd;">&#9660;</div>'
      ;
    },
    getCUSTOM_ReCapcay: function(){
      return ''
      +'<div class="g_notice qrerror"></div>'
      +'<div id="recaptcha_image" style="width:300px; height: 57px;min-height:57px; display:block;"><img style="height:57px; width:300px;"/></div>'
      +'<div class="recaptcha-main">'
      +'<label for="recaptcha_response_field" style="width:100%!important; float:none!important;">'
      + '<span class="recaptcha_only_if_image" id="recaptcha_instructions_image"><strong>Please Insert Capcay</strong></span>'
      
      + '<span id="recaptcha_challenge_field_holder" style="display: none;"></span>'
      + '<div class="in-txt">'
      +  '<input id="recaptcha_response_field" name="recaptcha_response_field" autocomplete="off" type="text" />'

      +  '<div class="recaptcha-buttons">'
      +   '<a title="Get a new challenge" href="javascript:Recaptcha.reload()" id="recaptcha_reload_btn"><span>Reload reCapcay</span></a>'
      +   '<a title="Help" href="javascript:Recaptcha.showhelp()" id="recaptcha_whatsthis_btn"><span>Help</span></a>'
      +   '<a title="What the heck.." href="javascript:" id="recaptcha_stg"><span>Wth</span></a>'
      +  '</div>' // recaptcha-buttons
      + '</div>'
      +'</label>'
      +'<div class="recaptcha-auth" style="display:none;">'
      + '<input type="checkbox" id="chk-auth" value="1" />'
      + '<label for="chk-auth">I dont need captcha to post, remember this!</label>'
      +'</div>'
      +'</div>' //recaptcha-main
      +'';
    },

    _menuFont: function(id){
      var li_cls = rSRC.mCls, item = ['Arial','Arial Black','Arial Narrow','Book Antiqua','Century Gothic','Comic Sans MS','Courier New','Georgia','Impact','Lucida Console','Times New Roman','Trebucher','Verdana'], buff, lf=item.length;
      buff='<li class="'+li_cls[0]+' '+li_cls[0] + id + ' fonts '+li_cls[1]+'"><a title="Fonts" href="javascript:;">Fonts</a><ul>';
      for(var i=0; i<lf; i++)
        buff+= ''
          +'<li class="'+li_cls[0]+' '+li_cls[0] +id+ ' font-'+item[i].toLowerCase().replace(/\s/gi,'')+'">'
          +'<a title="'+item[i]+'" class="ev_font" href="javascript:;">'+item[i]+'</a></li>'
        ;
      buff+='</ul></li>';
      return buff;
    },
    _menuSize: function(id){
      var li_cls = rSRC.mCls, buff;
      buff='<li class="'+li_cls[0]+' '+li_cls[0] + id + ' size '+li_cls[1]+'"><a title="Size" href="javascript:;">Size</a><ul>';
      for(var i=1; i<=7; i++)
        buff+='<li class="'+li_cls[0]+' '+li_cls[0] + id + '-1 size-'+i+'"><a title="'+i+'" class="ev_size" href="javascript:;">'+i+'</a></li>';
      buff+='</ul></li>';
      return buff;
    },
    _menuColor: function(id){
      var li_cls = rSRC.mCls, buff, capt, kolors = rSRC.getSetOf('color');
      buff='<li class="'+li_cls[0] + ' ' + li_cls[0] + id + ' ' + li_cls[1]+'"><a title="Colors" href="javascript:;">Colors</a>';
      buff+='<ul class="mBT'+id+'-wrapper">';
      for(hex in kolors){
        capt = kolors[hex];
        buff+='<li class="'+li_cls[0] +'"><a title="'+capt+'" class="ev_color"  style="width:0; background-color:'+hex+'" href="javascript:;">'+capt+'</a></li>';
      }
      buff+='</ul></li>';
      return buff;
    },

    _menuBIU: function(start){
      var li_cls = rSRC.mCls, item = ['Bold','Italic','Underline'], buff='', lf=item.length;
      for(var i=0; i<lf; i++)
        buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(i+start)+'"><a title="'+item[i]+'" class="ev_biu" href="javascript:;">'+item[i]+'</a></li>';
      return buff;
    },
    _menuAlign: function(start){
      var li_cls = rSRC.mCls, item = ['Align Left','Align Center','Align Right'], buff='', lf=item.length;
      for(var i=0; i<lf; i++)
        buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(start+i)+'"><a title="'+item[i]+'" class="ev_align" href="javascript:;">'+item[i]+'</a></li>';
      return buff;
    },
    _menuList: function(ids){
      var li_cls = rSRC.mCls, item = ['Numeric list','Bulleted list'], buff='', lf=item.length;
      for(var i=0; i<lf; i++)
        buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(ids[i])+'"><a title="'+item[i]+'" class="ev_list"  href="javascript:;">'+item[i]+'</a></li>';
      return buff;
    },
    _menuMedia: function(ids){
      var bbcode, li_cls = rSRC.mCls, item = ['Insert Link','Insert Picture','Embedding Youtube'], buff='', lf=item.length;
      bbcode = ['link','picture','youtube'];
      for(var i=0; i<lf; i++)
        buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(ids[i])+'"><a title="'+item[i]+'" class="ev_media" data-bbcode="'+bbcode[i]+'" href="javascript:;">'+item[i]+'</a></li>';
      return buff;
    },
    _menuCode: function(ids){
      var bbcode, li_cls = rSRC.mCls, item = ['CODE','HTML','PHP'], buff='', lf=item.length;
      bbcode = ['code','html','php'];
      for(var i=0; i<lf; i++)
        buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(ids[i])+'"><a title="Wrap ['+item[i]+'] around text" class="ev_codes" data-bbcode="'+bbcode[i]+'" href="javascript:;">Wrap ['+item[i]+'] around text</a></li>';
      return buff;
    },
    _menuQuote: function(ids){
      var bbcode, li_cls = rSRC.mCls, item = ['QUOTE','SPOILER'], buff='', lf=item.length;
      bbcode = ['quote','spoiler','transparent','noparse'];
      for(var i=0; i<lf; i++)
        buff+='<li class="'+li_cls[0]+' '+li_cls[0] +(ids[i])+'"><a title="Wrap ['+item[i]+'] around text" class="ev_quotes" data-bbcode="'+bbcode[i]+'" href="javascript:;">Wrap ['+item[i]+'] around text</a></li>';
      return buff;
    },
    getControlers: function(){
      var _sp = rSRC.mCls[2], lc=rSRC.mCls[0], BTN = rSRC.getSetOf('button');
      return ''
      + '<div class="mktH">' 
      + "<ul>"
      + rSRC._menuBIU(1) 
      + _sp + rSRC._menuAlign(4) 
      + _sp + rSRC._menuList([8,7]) 
      + _sp
      + rSRC._menuFont(19) 
      + rSRC._menuSize(20) 
      + rSRC._menuColor(95) 
      + _sp + rSRC._menuMedia([11, 14, 22]) 
      + _sp + rSRC._menuCode([16, 50, 51]) 
      + _sp + rSRC._menuQuote([15, 21, 97, 52]) 

      + _sp + '<li class="'+lc+ ' qplugin-togler"><span class="Qct tgctr btn_qplugin'+(gvar.settings.widethread || gvar.settings.toggle_plugins ? ' active' : '')+'" title="Toggle Plugin Menus"></span></li>'
      + '</ul>'
      + '<div id="qr_plugins_container" class="qplugin" style="'+(gvar.settings.widethread || gvar.settings.toggle_plugins ? '':'display:none;')+'">'
      + '<img class="ev_strike" title="Strikethrough text" data-bbcode="strike" src="'+BTN.strikethrough+'" />'
      + '</div>'
      + "</div>" // mktH
      ;
    },

    getCSS: function(){
      var imgcdn1,imgcdn2,imgcdn3, BTN;
      imgcdn1 = gvar.kkcdn + 'images/editor/';
      imgcdn2 = gvar.kkcdn + 'img/editor/';
      imgcdn3 = gvar.kkcdn + 'themes_2.0/img/editor/';
      BTN = rSRC.getSetOf('button');

      return ''
      +'.btn.qq{margin-left:5px;}'
      +'.btn.qf{margin-right:-1px;}'
      +'.btn .throb, .c-avt .throb{display:none;background:url('+BTN.throb_fetch+') no-repeat;width:10px;height:8px;margin-right:2px;}'
      +'.bling{color:#999;}'
      +'.bling .throb{display:inline-block;}'
      +'.btn.btn-thr{width:10px!important;height:10px!important; cursor:default!important;float:right;margin-right:15px;border:0;background:transparent;}'
      +'#site-header.fx, .mQR fieldset, .mQR #wrp_title, .mQR #wrp_msg, .mqr-cpcy .in-txt{position:relative;}'
      +'#site-header.fx #site-nav, .fx hr.sxln{width:620px;position:fixed;top:0;z-index:99999;}'
      +'#site-header.fx hr.sxln{top:29px;height:2px;}'
      +'#site-header.fx .main-h.r{margin-top:30px}'
      +'#site-header #donatflag{color:#F00000!important;margin-left:2px;}'
      +'.c-avt{padding:0; margin:0; margin-right:5px;display:inline-block; height:18px; cursor:pointer;}'
      +'.c-avt img{max-width:18px; margin-bottom:-5px;}'
      +'.c-avt.bling img{display:none;}'
      +'.hide{display:none!important;}'

      +'.mQR .throb-bl{background:url('+BTN.throbber_gif+') no-repeat;display:inline-block;width:16px; height:16px;margin-right:5px;}'
      +'.mQR .legend, .mQR .form-input{margin-bottom:0;border-bottom:0;}'
      +'.mQR .qrtitle{text-shadow:1px 1px #666;background:#f93;color:#fff;font-size:1.05em;}'
      +'.mQR .qrtitle.editmode{background:#1484CE;border-top:solid 1px #2b9eea;}'
      +'.mQR .qrtitle a{color:#fff;}'
      +'.mQR .qrtitle a:hover{text-decoration:underline;}'
      +'.mQR .qrtitle em{font-style:normal!important;}'
      +'.mQR .form-input{padding-bottom:0; border-bottom:0;}'
      +'.mQR .form-input .action.in-btn{border:0!important; background:none;text-align:center;position:relative;}'
      +'.mQR .in-btn.action .btn{width:130px; float:none!important;display:inline;clear:none; margin:0 auto;text-transform:uppercase;text-shadow:0 1px rgba(0,0,0,0.1);}'
      +'.mQR .in-btn.action .btn-grey{margin-left:4px; color:#333;border:1px solid #c6c6c6;background-color:#f8f8f8;background-image:linear-gradient(top,#f8f8f8,#f1f1f1);}'
      +'.mQR .in-btn.action .btn-red{border:1px solid transparent!important;text-transform:uppercase;color:#fff; background-color:#d14836; background-image:linear-gradient(top,#dd4b39,#d14836);}'
      // 
      +'.mQR .layerin{position:absolute;width:100%;height:100%; background:#ddd;opacity:.25;z-index:99; margin:-5px;}'
      +'.mQR .in-txt{padding:4px 5px;margin-top:-1px;border-radius:0;}'
      +'.mQR .in-txt .chr{margin: 2px -5px -4px;}'
      +'.mQR .in-txt.layered{position:relative;}'
      +'.mQR .in-txt #'+gvar.tID+'{height:90px; min-height:50px; min-width:590px; max-width:590px; font-size:14px;}'
      +'.mQR .chr{min-height:16px;}'
      +'.mQR .stts{float:left;border:0;padding:0;margin-top:-1px; background:none;}'
      +'.mQR #txtLen{float:right;max-width:65px;display:block;}'
      +'.mQR #txtLen.ffc{color:#666!important;}'
      +'.mQR #wrp_control {padding-bottom:1px;}'
      +'.mQR li.mBT a{outline:none}'
      +'.mQR li.mBT {border:1px solid transparent;}'
      +'.mQR li.mBT:hover{border:1px solid #ddd;background:#f0f0f0;}'
      +'.mQR #wrp_title input[type="text"]{width:94%;}'
      +'.mQR .in-txt input[type="text"], .mQR .in-txt #'+gvar.tID+'{color:#333;}'
      +'.mQR .tgctr{position:absolute;top:2px; right:3px;padding:5px 3px; font-size:1.2em; line-height:0.7em; cursor:pointer;}'
      +'.mQR .tgctr:hover{color:#333;}'
      +'.mQR .tgctr.Qct {background:url('+BTN.contr_stg+') no-repeat;opacity:.25;width:12px;height:12px;}'
      +'.mQR .tgctr.Qct:hover, .mQR .Qct.active{opacity:.8;}'
      +'.mQR .tgctr.Qxc, .mQR .tgctr.QxM{color:#666;right:25px;border:0;}'
      +'.mQR .tgctr.QxM, .mQR .tgctr.Qxc{padding:5px;}'
      +'.mQR .tgctr.Qcp{border:0;}'
      +'.mQR .ninja{position:absolute!important;z-index:99; left:-999999; visibility:hidden;}'
      +'.mQR .error{border-color:#FF0A0A;}'
      +'.mQR .g_notice {display:none;font-size:11px;background:#DFC;border:1px solid #FFA8BF;line-height:16px;min-height:16px;padding:.4em 0;cursor:default;}'
      +'.mQR .qrerror{background:#ffd7ff!important;}'
      +'.mQR #cbutton, .mQR #wrp_reason{display:none;}'
      

      +'.in_balonbox {width:310px;position:absolute; z-index:999; bottom:53px; background:#e3e3e3;-moz-border-radius:10px;-webkit-border-radius:10px; border-radius:10px;border-top:solid 1px #ccc;border-right:solid 1px #ddd;border-bottom:solid 1px #ddd;border-left:solid 1px #ccc;margin:20px -20px 0; padding:10px; padding-bottom:5px;}'
      +'.in_balonbox .cpcy-title{font-size:1.1em; color:#666; margin:4px 0;}'
      +'.in_balonbox .recaptcha_only_if_image, .in_balonbox .cpcy-title, .in_balonbox .g_notice{padding-left:.4em;}'
      +'.in_balonbox .g_notice{color:#333;}'
      +'.in_balonbox .g_notice.qrerror{color:red;}'
      +'.mqr-cpcy, .box-cnt {width:310px;min-height:25px;background:#fff;border:1px solid #e5e5e5;}'
      +'.box-cnt {padding:8px 0; text-align:center; line-height:1.1em; font-size:1.2em;}'
      +'.box-cnt.sip {background:#DFC;border:1px solid #47FF0A;}'
      +'.box-cnt.ups {background:#ffd7ff;border-color:#FF0A0A;}'
      +'.mqr-cpcy #recaptcha_image {margin-top:5px;text-align:center;}'
      +'.mqr-cpcy #recaptcha_stg {background:url('+BTN.goog_stg+') no-repeat;}'
      +'.mqr-cpcy #recaptcha_reload_btn {background:url(http://ssl.gstatic.com/accounts/recaptcha-sprite.png) -63px;}'
      +'.mqr-cpcy #recaptcha_whatsthis_btn {background:url(http://ssl.gstatic.com/accounts/recaptcha-sprite.png);}'
      +'.mqr-cpcy .in-txt {margin-top:2px;}'
      +'.mqr-cpcy .in-txt input[type="text"]{padding-right:75px!important; max-width:222px;}'
      +'.mqr-cpcy .recaptcha-buttons {position:absolute;bottom:4px;right:10px;}'
      +'.mqr-cpcy .recaptcha-buttons span{text-indent:-9999px;display:block;}'
      +'.mqr-cpcy .recaptcha-buttons a {display:inline-block; height:21px;width:21px;margin-left:2px;background:#fff;background-position:center center;background-repeat:no-repeat; line-height:0; opacity:.55;outline:none;}'
      +'.mqr-cpcy .recaptcha-buttons a:hover {opacity:.8;}'
      +'.mqr-cpcy .recaptcha-auth {margin-top:4px; padding:5px 0;}'
      +'.mqr-cpcy .recaptcha-auth input[type="checkbox"] + label{display:inline-block;vertical-align:middle;height:14px;}'
      +'.mqr-cpcy .recaptcha-auth label{margin:1px 0 0 5px;}'
      +'.mqr-cpcy #recaptcha_response_field[readonly="readonly"]{color:#ccc;}'

      +'.qplugin-togler{float:right!important;margin:-1px -5px 0 0;border:0!important;}'
      +'.qplugin{margin-right:20px;float:right; text-align:right!important; width:100px;min-width:20px;min-height:10px;}'
      +'.mQR .qplugin img{border:1px solid transparent!important;cursor:pointer;vertical-align:bottom;margin-left:2px;}'
      +'.mQR .qplugin img:hover, .mQR .qplugin a:hover{border:1px solid #ccc!important;background-color:#f5f5f5;}'
      +'.mQR .qplugin .vbmenu_popup{position: absolute;margin-top:-1px;z-index: 9999;background: #eee;border: 1px solid #999;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;font-size: 12px;padding:4px 0;}'
      +'.mQR .qplugin .vbmenu_popup .osize{padding:2px;}'
      +'.mQR .qplugin .vbmenu_popup .osize:hover{background: #ccc;cursor: pointer;}'

      +'.mQR .sayapkanan{position:absolute; right:0;text-align:right;margin:0;margin-top:-5px;padding:5px;display:inline-block;}'
      +'.mQR .sayapkanan input[type="checkbox"]{height:14px;width:14px;display:inline;color:#333;padding:1px;-webkit-appearance:checkbox;}'
      +'.mQR .sayapkanan label{margin-left:2px;}'

      +'.sxln{margin:0;padding:0;border:0;height:1px;background:-webkit-gradient(linear,left top,right top,color-stop(0%,hsla(0,0%,0%,.04)),color-stop(50%,hsla(0,0%,0%,.35)),color-stop(100%,hsla(0,0%,0%,.04)));background:-webkit-linear-gradient(left,hsla(0,0%,0%,.04) 0,hsla(0,0%,0%,.35) 50%,hsla(0,0%,0%,.04) 100%);background:-moz-linear-gradient(left,hsla(0,0%,0%,.04) 0,hsla(0,0%,0%,.35) 50%,hsla(0,0%,0%,.04) 100%);background:-ms-linear-gradient(left,hsla(0,0%,0%,.04) 0,hsla(0,0%,0%,.35) 50%,hsla(0,0%,0%,.04) 100%);background:-o-linear-gradient(left,hsla(0,0%,0%,.04) 0,hsla(0,0%,0%,.35) 50%,hsla(0,0%,0%,.04) 100%);background:linear-gradient(left,hsla(0,0%,0%,.04) 0,hsla(0,0%,0%,.35) 50%,hsla(0,0%,0%,.04) 100%)}​'
      
      +'.mktH{background-color:#f9f9f9;zoom:1;filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr="#FFF9F9F9",endColorstr="#FFF0F0F0");background-image:linear-gradient(top,#f9f9f90%,#f0f0f0100%)}.mktH:after{content:"";display:block;clear:both;height:0;visibility:hidden}.mktH ul li{list-style:none;float:left;position:relative;height:20px}.mktH ul .mDM{margin-right:5px;background:transparent url('+imgcdn2+'menu.png) no-repeat right center}.mktH ul .mDM li{margin-right:0}.mktH ul .mSP{width:1px;height:16px;background-color:#ddd;overflow:hidden;text-indent:-999px;margin:0 2px}.mktH ul ul{display:none;position:absolute;top:18px;left:0;background:#f5f5f5;height:inherit;z-index:10}.mktH ul ul li{float:none;border-bottom:1px solid #d6d6d6}.mktH ul li:hover>ul{display:block}.mktH ul a{display:block;width:16px;height:16px;text-indent:-10000px;background-repeat:no-repeat;margin:0;padding:3px}.mktH ul ul a{display:block;text-indent:0;width:120px;padding:5px 5px 5px 25px}.mktH ul ul a:hover{background-color:#ddd}.mQR .mBT1 a{background-image:url('+imgcdn1+'bold.gif)}.mQR .mBT2 a{background-image:url('+imgcdn1+'italic.gif)}.mQR .mBT3 a{background-image:url('+imgcdn1+'underline.gif)}.mQR .mBT4 a{background-image:url('+imgcdn1+'justifyleft.gif)}.mQR .mBT5 a{background-image:url('+imgcdn1+'justifycenter.gif)}.mQR .mBT6 a{background-image:url('+imgcdn1+'justifyright.gif)}.mQR .mBT7 a{background-image:url('+imgcdn1+'insertunorderedlist.gif)}.mQR .mBT8 a{background-image:url('+imgcdn1+'insertorderedlist.gif)}.mQR .mBT9 a{background-image:url('+imgcdn1+'indent.gif)}.mQR .mBT10 a{background-image:url('+imgcdn1+'outdent.gif)}.mQR .mBT11 a{background-image:url('+imgcdn1+'createlink.gif)}.mQR .mBT12 a{background-image:url('+imgcdn1+'unlink.gif)}.mQR .mBT13 a{background-image:url('+imgcdn1+'email.gif)}.mQR .mBT14 a{background-image:url('+imgcdn1+'insertimage.gif)}.mQR .mBT15 a{background-image:url('+imgcdn1+'quote.gif)}.mQR .mBT16 a{background-image:url('+imgcdn1+'code.gif)}.mQR .mBT17 a{background-image:url('+imgcdn1+'removeformat.gif)}.mQR .mBT18{width:25px}.mQR .mBT18 a{background-image:url('+imgcdn1+'color.gif)}.mQR .mBT18 ul{width:81px;padding:1px}.mQR .mBT18 li{width:24px;height:24px;overflow:hidden;float:left;border:0;margin:1px 2px;padding:0}.mQR .mBT18 ul a{width:22px;height:22px;overflow:hidden;text-indent:-9999px;display:block;border-radius:3px;opacity:.68;border:solid 1px #ddd;margin:0;padding:0}.mQR .mBT18 ul a:hover{opacity:1;border-color:#ccc}.mQR .mBT18 .col1-1 a{background:#FF0}.mQR .mBT18 .col1-2 a{background:orange}.mQR .mBT18 .col1-3 a{background:red}.mQR .mBT18 .col2-1 a{background:blue}.mQR .mBT18 .col2-2 a{background:purple}.mQR .mBT18 .col2-3 a{background:green}.mQR .mBT18 .col3-1 a{background:#FFF}.mQR .mBT19 a{width:45px;text-indent:0;text-align:center;line-height:14px;background:#fff;padding:1px}.mQR .mBT19 li a{padding:4px 5px}.mQR .mBT19 ul a{width:120px;line-height:16px;height:16px;font-weight:500;text-indent:0!important;text-align:left}.mQR .mBT19 .font-arial a{font-family:Arial,"DejaVu Sans","Liberation Sans",Freesans,sans-serif}.mQR .mBT19 .font-arialblack a{font-family:"Arial Black",Gadget,sans-serif}.mQR .mBT19 .font-arialnarrow a{font-family:"Arial Narrow","Nimbus Sans L",sans-serif}.mQR .mBT19 .font-bookantiqua a{font-family:Times New Roman,Times,serif}.mQR .mBT19 .font-centurygothic a{font-family:"Century Gothic",futura,"URW Gothic L",Verdana,sans-serif}.mQR .mBT19 .font-comicsansms a{font-family:"Comic Sans MS",cursive}.mQR .mBT19 .font-couriernew a{font-family:"Courier New",Courier,"Nimbus Mono L",monospace}.mQR .mBT19 .font-georgia a{font-family:Constantina,Georgia,"Nimbus Roman No9 L",serif}.mQR .mBT19 .font-impact a{font-family:Impact,Haettenschweiler,"Arial Narrow Bold",sans-serif}.mQR .mBT19 .font-lucidaconsole a{font-family:"Lucida Sans Unicode","Lucida Grande","Lucida Sans","DejaVu Sans Condensed",sans-serif}.mQR .mBT19 .font-timesnewroman a{font-family:Cambria,"Times New Roman","Nimbus Roman No9 L",Freeserif,Times,serif}.mQR .mBT19 .font-Trebucher a{font-family:"Trebuchet MS",sans-serif}.mQR .mBT19 .font-Verdana a{font-family:Verdana,Geneva,"DejaVu Sans",sans-serif}.mQR .mBT20 a{background-image:url('+imgcdn3+'fonts.png);width:20px}.mQR .mBT20 li{height:auto}.mQR .mBT20 ul a{height:auto;text-align:center;padding:5px;display:block;line-height:16px;background-image:none}.mQR .mBT20 .size-1 a{font-size:10px;line-height:10px}.mQR .mBT20 .size-2 a{font-size:12px;line-height:12px}.mQR .mBT20 .size-5 a{font-size:20px;line-height:20px}.mQR .mBT20 .size-6 a{font-size:24px;line-height:24px}.mQR .mBT20 .size-7 a{font-size:28px;line-height:28px}.mQR .mBT22 a{width:25px;background:url('+imgcdn3+'youtube.gif) center top no-repeat}.mQR .mBT23 a{background:url('+imgcdn3+'vimeo.gif) center top no-repeat;width:25px}.mQR .mBT95{width:25px}.mQR .mBT95-wrapper{width:180px!important;padding:5px 2px}.mQR .mBT95 li{float:left!important;border:0!important;padding:0 3px 3px;height:15px!important}.mQR .mBT95 li a{overflow:hidden;text-indent:-9999px!important;display:block;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;opacity:.78;height:10px!important;width:10px!important;border:solid 1px #ddd;padding:0}.mQR .mBT95 li a:hover{opacity:1;border-color:#333!important;background:#fff}.mQR .mBT95>a{background-image:url('+imgcdn1+'color.gif)}.mQR .mBT50 a{background-image:url('+imgcdn1+'html.gif)}.mQR .mBT51 a{background-image:url('+imgcdn1+'php.gif)}.mQR .mBT95,.mQR .mBT20,.mQR .mBT19{height:auto}.mQR .mBT95 li a,.mQR .mBT20 li a,.mQR .mBT19 li a{background:#f5f5f5}'

      +'.mktH .mBT21 a {background-image:url('+BTN.spoiler+');}'
      +'::-webkit-input-placeholder{color:#999!important;}:-moz-placeholder{color:#999!important;}:-ms-input-placeholder{color:#999!important;}'

      +'#content-wrapper .entry-content a{text-decoration:none;}'
      +'#content-wrapper .entry-content a:hover{text-decoration:underline;}'

      /*hacky2-sharp-color*/
      +'#content-wrapper .entry-content{color:#222!important;}'
      +'#content-wrapper .entry-content .post-quote span:last-child{color:#333!important;}'

      /* night-mode */
      +'body.nightmode .mQR .qrtitle{background:#444;text-shadow:1px 1px #222;}'
      +'body.nightmode .mQR .qrtitle.editmode{background:#093858;}'
      +'body.nightmode .mQR .in-txt input[type="text"], body.nightmode .mQR .in-txt #'+gvar.tID+'{color:#f0f0f0;}'
      +'body.nightmode .mQR .Qcp.tgctr{color:#333!important;}'
      +'body.nightmode .mQR .QxM.tgctr:hover, body.nightmode .mQR .Qcp.tgctr:hover{color:#fff!important;}'
      +'body.nightmode .mQR #txtLen{color:#333;}'
      +'body.nightmode .mQR #txtLen.ffc{color:#999!important;}'
      +'body.nightmode .mQR #wrp_control {background:#666;}'
      +'body.nightmode .mktH ul ul li:hover{background:none;}'
      +'body.nightmode .mktH ul ul, body.nightmode .mktH ul ul a{background:#333;}'
      +'body.nightmode .in_balonbox{background:#ccc;}'
      +'body.nightmode .mqr-cpcy{background:#333;}'
      +'body.nightmode .mqr-cpcy #recaptcha_challenge_image{opacity:.8;}'

      +'body.nightmode #content-wrapper .entry-content{color:#ddd!important;}'
      +'body.nightmode #content-wrapper .entry-content .post-quote span:last-child{color:#999!important;}'
      +'body.nightmode #content-wrapper .entry-content .post-quote span:last-child b:first-child{color:#ccc;}'
      ;
    },
    getCSSWideFix: function(){
      var i='!important';
      return ''
      // wide to grid-12 as in default of full-web
      +'#wrapper, #site-header.fx #site-nav, .fx hr.sxln{max-width:940px'+i+';width:940px'+i+';}'
      +'.mQR .in-txt #'+gvar.tID+'{max-width:910px'+i+';width:910px'+i+';}'
    },
    getSCRIPT: function(){
      return ''
      +'function showRecaptcha(element){'
      + 'if( "object" != typeof(Recaptcha) ){'
      +   'window.setTimeout(function () { showRecaptcha() }, 200);'
      +   'return;'
      + '}else{'
      +   'try{ Recaptcha.create("6Lc7C9gSAAAAAMAoh4_tF_uGHXnvyNJ6tf9j9ndI", '
      +   'element, {theme:"custom", lang:"en", custom_theme_widget:"mqr-cpcy"}); }catch(e){};'
      + '}'
      +'}'
      ;
    },
    getSetOf: function(type){
      switch(type){
        case "color" :
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

        case "button" :
        return {
          news_png : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAIAAAD5fKMWAAAABnRSTlMAAAAAAABupgeRAAAArklEQVR42mNkYGBgYGBob29/9OgRA14gJyfHAlHHz88/bdo0/KqzsrJYHj16lF/auG/Hmvv37587dw6XUiMjIwYGBhY4X1FRUVFREb/xLMic9knLGRgYKvMiT158jKbOXF+WgYGBiYEUgGJ2ZV4kCarR7B207ubn52dhYGB4ev+yh4fHhw8fIKLvPn4XFUAxRYif8/79+wwMDIxHjhzZsmXLx48f8buBn5/fw8MDAOiiPC0scvhsAAAAAElFTkSuQmCC",
          spoiler : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABnRSTlMA4QDhAOKdNtA9AAAACXBIWXMAAAsTAAALEwEAmpwYAAABg0lEQVR42tVUPUsDQRB9M7dBQi4iypWJhgQsU1lIUtklIgg2tmJhK3b+gLT+AtHaP2AqtUmwslGMTSJcUgaSKEc+bu/DYmGJMR+glVs8HrO8fTOzs0u23cRvF+MP609iodn1Y70SbC8UhL3O1a6vOOmaj6tWds32Xc9gigpDMEUYBvNyVESYIwZiERHaK6+1h8+P2unJ4WTaw6Hs9+WgL0cD6Q6lO/S8kRe4PqRP0mcvMNd7uf0tAC9v79/SBpDaWIUfEkMwM0AEMC0JJqKAMDBYMrHB3U53smYA7tMNMRNzIASBiJmIXabFDQNwfnRWbTm5hFlutAtpS3GNABR5vitNEVdbTj5pAgAsAID5A1FpwpVyyj3nEmal6YQhFN7W2xorTUcFZw5JudHOJ00iACBCMWMBKGYsFdFb08WFtKWPV24AdGSec7Z+r7pChHF/xVUvZjp77iiXMLXnuL/OYl7NynkWahKPxyZnG0Dp4tJx+vMfRjwe28ykDvZ2JsX/5zP4AtVMzoKTk38hAAAAAElFTkSuQmCC",
          contr_stg : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMFxAYA6YinkAAAAE7SURBVDjLrZRBS8NAEIW/SRM1UDGgB0H6Bzz5X/SHe/IslKIHe4hQra3JeHkbh2Urgi68w5t9mczOvF0bxxEz4y/L3TF3x8xmwBUwhH0T1uLngAtpzYCVuw+4O8BCgk3ATrE7wRWLGgcW7k6tzJ/AEuhTtUADnABPij0CW2CvSgHO9O2UyCXahrJHfZBiH8I+aI7TUetCT3JeZTzXEBOZjtIEUeIW+JANbNqPiVqVHkVtqKgNkyLEDJjGfwTcpMZpVcKD+LX6NgZNDdy7+y5WdJo1MiWai88Lib6PnvnoVeiBd8VuBVesD7qij1bBRxR8tAw+4icfvQnRkEMYwKZgyOaQj6qQqAog43bIR4QEv7rweaAOf+sKZmuDbzo1O/aoSxUnH1XAZTbadB1exC8Kz0gFPLv7aP/1sH0BL4CCxuBHWEkAAAAASUVORK5CYII=",
          goog_stg : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMFwwCGmdYlk8AAAHzSURBVDjLrdVLS5ZRFAXg53gJ00pJVKyMIqhBF0fdCCKiUT+gX9L/adQvaFCNAiEogmgUDSolKyNN0NLP2+dpsj56/aqZBw7n8u6z9tp7r3PeUmu1n63HPre+7o1SCtzGKSzgcePznv1/Rdf3DyfDuIuTWMYZzGU8iyG8wlgpZbF5sNb6B7CUIh5bObCLo7iKazH7hl+ZH4/NYQxiCd9Lh3YppRdtDOASbmIUB9EfRysBGcr4HucxhUe11ofNkC/GU39Y9QRgLfM2NlBiM4LrmcNkdw7vhd1G1isJ73OYrIXtueSzLyxrUvS8G3Ay3teSj3bAXtda5xu5bqE3vYWfeFZrfdcNOBPQAzHcxdcmWCo5V0oZjwq2o4SVTlF7GoYP8CQeN+JsJ7rs1mk739shcQETe25KDBcCuJuQRjDQAc04mP1OdL24g/vdIY82Kr2NHVzGIcyUUlaiyxsR+E4cb+f8YDfgFUwnjK0cGI+EJlLxIzgRVktJzQfMptp7AKcwho+RzHAqPoZbKdYmfmAx83m8iPPSDfgmzGbxKWz7Y9hqAK6nr4Xdam28Es2rV7LezbqTr9MB7kmYA3Gyk7v9tNa6+ddrEy/N96jdSPo6XuJLijedx+FYg/l/n69ma8V4AW9rrW0sRz6rEfXWHp3u9y/gN28Pu01Pz4YXAAAAAElFTkSuQmCC",
          strikethrough : "data:image/gif;base64,R0lGODlhFAATAPcAACQeJHx+fFRSVDQ2NLSytGxqbJSWlExGTKSipGRiZEQ+RHx6fDQuLDw+PHRydJyenIyKjFxaXDw2PGxudJyWnCQmJFRWVJza7GxubExKTKyqrGRmZDQuNIyOjDw6PJyanBbQIND2iGRJdHcBAABF4AAA63EAEgAAAAAYVQCI1QB0mQAAd3gApOYA63VxEgAAAPhY/omT/5Z0/wMA/wBoNAANAABJAAABAABFaAAAAAAAagAAAAAYYACIhQB0dAAAAAAAKAAAAgAAAAAAAAAjAgABAAAAAAAAAAAYAADoAHESAAAAAPhFaIkAAJYAAAMAAAAAAAAAAABxAAAAAHwYaOaIABJ0AAAAAAgYRADo6W8SEgAAABGFYAA0hQCddAB3AOouaMdnAGRpAHdmAcYARMRHOsQ0XFZ3AOAhcwKtZVFkcgB3c+AAU4kB35YAZAMAdwEAOgAAygAAxAAAVvCMAInnAJYSAAMAAHQ3AOY7ABKdAAB3AMc8yB87d52ddHd3APirAIlIcJY0dAN3AEkAVB8A6J0AEncAAAAAEQABAQAAAAAAAPAhsImt6JZkEgN3AIBkmufnkxISawAAd7wA4sIq/WRxsncAIQA6/gDF/3HE/wBW/wC0UwDn3wASZAAAd/iRSYms2JZkZAN3dwAAyAAAdwAAdAAAAAAAPgEA0gAAZQAAd8vgesKzymSZxHd3VsznAOdIABI0AAB3APh5AInpAJYSAAMAAAwMAJ6hAHtPAHcAAAEgAAAAAAAAAAAAAwIAAX8AAAAAAAAAAHOUkC3n6G0SEmUAAG4MzXWhq1xPugAA3DxgYAD7+wASEgAAAABVmgDVkwCZawB3dwHX8gCl8AG7swAAITb+/iX//8f//1b//zjgPuez0hKZZQB3d5RbiAp/gcVnQnZ3AATcyOfodxISdAAAAA5rAAF/AABnAAB3AAWNeQCt6QBkEgB3ABAAMQAArQAAZAAAdwAwZgAAygAAxAAAVkQAMToArQAAZAAAd1QuagxncUlpSAFmACH5BAEAABcALAAAAAAUABMARwhnAC8IHEiwoMGBGCRAuIAhwgEHAgMkQHCwosWLGC8YAHAAAAYPDBJA/MChQYCMKA1aoIhxgMuXMGMOSEmzps2bFydouOngAcoOAhNc2LBQAYICBCo6yHChwgUBCy4ooNBAKM6rWAkGBAA7",
          throb_fetch : "data:image/gif;base64,R0lGODlhCgAKAMYAAP///4qOkjWU6CqC6DiW5g1Rwunp6Qg9ihxu0ESe+Fqx+HDK+G7D+I+vzmrF9Ge991Os9y+I2tTU1BlqzkGa9mar5Cl53MTExJGbpDuJtkaZ6puirTCJ7T6X9mfD9i6G65vX9hJdyO7u7o2RlUN9oZKVl83NzVVgbWbC733N+DON7jeV53eUv0uZ3j+Z5l+l4oKjy4nA7QQxh/Hx8bKxsQAAAMnJyQEaS5OTk3NycyB05wQtgRho3mOo5HDK9TOM7ojN7wszbDOO6AtIqTSO6BtZkYXL7hRIc6WkpLy7vFel66bD1QUoYRdo3o/N+2K67Clxswc7ionV+Blgq4mKiwg7lqje90RRYpOSkrbj+MrJyZubm/Ly8oqOkZWUlAEZRoqPkgEUPMnIyAIeVGFhYQEaSpSTk8zLywEWRAIbTbKysgMeSbCytD2T6jOB6juO6k6s4HCw50qP5lWZ7a2trh92xRNb0TFlmHDC62Ws7Qg5fnu9+Vy26UKf0v///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgD/ACwAAAAACgAKAAAHR4AXG4MNGxgwGBiChIaIGBtSKVILcAIuBBCQkpSWmEsLHg8dHyocHQ+foaOlpzAWCAWxsQg6rrCyBbQmJCe8d729u8C/vCSBACH5BAUKAH8ALAAAAAAKAAoAAAdHgBgsLA0wGw2DLIKEhoiDPRAOKT4pKAQuBJCSlJaYLxAPDx4JH6Ucn6GjpR8cciETISEFQ7MFrrCytLQbJyd3vb++vL7AwIEAIfkEBQoAfwAsAAAAAAoACgAAB0eAGCyDLDANGw0wgoSGiDAVCQQEcCk+Cz5wkJKUlphzHwMJCg8eCh0Dn6GjpadQBQUTsSEFQwWusLK0BUh3J769v7y+J8DEgQAh+QQBCgB/ACwAAAAACgAKAAAHR4AbDTAshSwwDRuChIaIGyA+fQSTcD4+C5CSlJYLMSoDHAMdCg+lnqCipKVQBQVDBSETEyEFrK6wsrQbJ3cnvL68u72/vneBADs=",
          throbber_gif : "data:image/gif;base64,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%3D"
        };
        break;
        default: return false; break;
      }
    }
  };

  function init(){
    var kdomain = domainParse();
    gvar.domain = kdomain.prot + '//' + kdomain.host +'/';
    gvar.kkcdn = kdomain.prot + '//'+ kdomain.statics + '/';
    gvar.uavatar = gvar.kkcdn + 'user/avatar/';
    
    gvar.qID = 'mqr-content-wrapper';
    gvar.tID = 'reply-messsage';
    gvar.edit_mode = !1;
    gvar.offsetEditorHeight = 160; // margin top Layer
    gvar.settings = gvar.reqPID = gvar.tkset = {};

    ApiBrowserCheck();

    gvar.user = currentUser();

    getSettings();

    // -- let's roll --
    start_Main();
  } // end-init


  function start_Main(){
    // first assume
    gvar.thread_type = 'forum'; // [forum,group]
    gvar.act_uri = '';
    gvar.sec_tok = '';
    

    design();
  }

  function getSettings(stg){
    /**
    eg. gvar.settings.toggle_menus
    */
    var hVal, settings = {};
    
    hVal = getValueForId(gvar.user.id, 'AUTHORIZED_USERS');
    if( !hVal ) hVal = ['', '0'];
    gvar.user.isDonatur = (hVal[1] == '1');

    hVal = getValueForId(gvar.user.id, 'AVATARS_USERS');
    if( !hVal ) hVal = ['', 'male.jpg'];
    gvar.user.avatar = gvar.uavatar + hVal[1];

    settings.widethread = (getValue(KS+'WIDE_THREAD') == '1');
    settings.tmp_text = getValue(KS+'TMP_TEXT');
    settings.tmp_title = getValue(KS+'TMP_TITLE');

    settings.toggle_menus = (getValue(KS+'TOGGLE_MENUS') == '1');
    settings.toggle_plugins = (getValue(KS+'TOGGLE_PLUGINS') == '1');

    // -=|
    gvar.settings = settings;
  }

  // return {isLogedin: (boolean), isDonatur: (boolean), name: (string)}
  function currentUser(){
    var user = {
      isLogedin: !$D('#loginform') ? true : false,

      // is later be set after submission is performed and there is no capcay for sure
      isDonatur: null,

      avatar: null,
      name: null,
      id: null
    }, node, cucok, el;

    if(user.isLogedin){
      node = $D('.//a[contains(@href,"profile/")]', $D('#site-nav'), 1);
      node && (user.name = entity_encode(node.innerHTML));

      if( cucok = /\bprofile\/([\d]+)/i.exec(getAttr('href', node)) )
        user.id = cucok[1];
    }
    return user;
  }

  function design(){
    // [design]

    // inject CSS
    GM_addGlobalStyle(rSRC.getCSS());

    if(!gvar.user.isLogedin){
      clog('notlogin; qr-exiting');
      return (function(){
        var formfocus = function(){
          var tgt = $D('.//input[@name="username"]', null, 1);
          tgt && window.setTimeout(function(){ tgt.focus() }, 51)
        }, node, cval, urs = window.location.search;
        if(window.location.hash == '#login' && /\bkqr\b/.test(urs)){
          cval = $D('#url').value;
          $D('#url').value = cval.replace(/\??\bkqr\b/i,'');
          formfocus();
        }
        node = $D('.//a[contains(@href,"#login")]', $D('#site-nav'), 1);
        node && Dom.Ev(node, 'click', formfocus);
        return 0;
      })()
    }

    // inject SCRIPT
    if( !gvar.user.isDonatur ) {
      GM_addGlobalScript(location.protocol+ '\/\/www.google.com\/recaptcha\/api\/js\/recaptcha_ajax.js', 'recap', true);
      GM_addGlobalScript(rSRC.getSCRIPT());
    }

    var par, node, lg, el, nodes, imgStr, profile_uri;
    // scan all quote
    nodes = $D('//a[contains(@class, "btn s") and contains(@href,"post_reply/")]')
    if(nodes.snapshotLength > 0){
      var pid, href, cucok;
      for(var i=0, lg = nodes.snapshotLength; i<lg; i++) {
        node = nodes.snapshotItem(i);
        href = getAttr('href', node);
        if( cucok = /\bpost=([\w]+)/i.exec(href) )
          pid = cucok[1];

        if(par = node.parentNode){
          el = createEl('a', {'href':'javascript:;', 'class':'qq btn s'}, 'Quick Reply');
          append(par, el);
          el = createEl('a', {'href':'javascript:;', 'class':'qf btn s'}, '<i class="throb"></i>Fetch');
          prepend(par, el, node);
          el = $D('.//a[contains(@href,"edit_post/")]', par, 1);
          el && (el.innerHTML = '<i class="throb"></i>Edit');

          setAttr('data-pid', '_'+pid, par);
        }
      }
    }

    // templating :: find entry:last
    nodes = $D('//div[@class="entry"][last()]');
    if( (par = nodes ? nodes.snapshotItem(0) : null) ){
      el = createEl('div',{'id':gvar.qID, 'class':'mQR'}, rSRC.getTPL());
      append(par, el);

      // bottom controls
      if( par = $D('.controls', null, 1) ){
        el = $D('.//a[contains(@href,"/post_reply/")]', par, 1);
        gvar.act_uri = getAttr('href', el);
        if( gvar.act_uri.indexOf('http:')==-1 )
          gvar.act_uri = gvar.domain + gvar.act_uri.substr(1);
      }

      if( el = $D('.//a[contains(@href,"/logout/")]', Dom.g('site-footer'), 1) ){
        update_token( getAttr('href', el) );
      }
    }

    // fixed topnav
    if( par = $D('#site-header') ){
      el = createEl('hr', {'class':'sxln'});
      append(par, el);
    }

    if( gvar.settings.widethread )
      GM_addGlobalStyle(rSRC.getCSSWideFix(), 'css_inject_widefix', 1);

    if( gvar.settings.tmp_text ){
      _TEXT.set( gvar.settings.tmp_text );
      delete gvar.settings.tmp_text;
      node = KS+'TMP_TEXT';
      setValue(node, '');
      delValue(node);

      if( gvar.settings.tmp_title ){
        _TEXT.set_title( gvar.settings.tmp_title );
        delete gvar.settings.tmp_title;
        node = KS+'TMP_TITLE';
        setValue(node, '');
        delValue(node);
      }
    }

    /*
    node = $D('#donatflag');
    if( gvar.user.isDonatur ){
      node.innerHTML = '[$]';
    }
    else{
      //Dom.remove(node);
      node && addClass('hide', node);
    }
    */

    var profile_check = function(e){
      var _el = (e.target||e);
      (_el.nodeName == 'IMG') && (_el = _el.parentNode);
      var _par = _el.parentNode
      _el_dnt = $D('#donatflag', null, 1);
      addClass('hide', _el_dnt);
      addClass('bling', _el);

      // xhr
      var _xhr, _xhr_cb = function(ret, xhr){
        var imguri, cucok, isDonatur;
        ret && (ret = ret.responseText);

        if( ret ){
          cucok = ret.match(/<figure>\s*<img\s*(?:(?:alt|class|border|width|height)=['"](?:[^'"]+)?.\s*)*src=['"]([^\'\"]+)/i);

          imguri = (cucok && cucok.length ? cucok[1] : '/male.jpg');
          setValueForId(gvar.user.id, String(imguri), 'AVATARS_USERS');

          setAttr('src', (/^https?\:/.test(imguri) ? '' : gvar.uavatar) + imguri, $D('//img[@class="c-avtr"]', null, 1));
          removeClass('bling', _el);

          if( (isDonatur = /class=[\'\"]fn[\'\"]\s*>.+><b>\[\$\]<\//i.test(ret)) ){
            removeClass('hide', _el_dnt);
          }
          setValueForId(gvar.user.id, String(isDonatur ? '1':'0'), 'AUTHORIZED_USERS');
        }
        if(gvar.reqPID && xhr.pid && "undefined" != typeof gvar.reqPID[xhr.pid])
          delete gvar.reqPID[xhr.pid];
      };

      (function(){
        var profile_uri = String(gvar.domain);
        profile_uri = profile_uri.substring(0, profile_uri.length-1);
        profile_uri+= String(getAttr('href', node)).replace(gvar.domain, '');
        profile_uri = profile_uri.replace('/profile/', '/profile/aboutme/');

        var xhr = new GM_XHR();
        xhr.uri = profile_uri;
        xhr.cached = true;
        xhr.pid = 'profile-' + String(gvar.user.id);
        clog('GET profile detail...: ' + xhr.uri);
        gvar.reqPID[xhr.pid] = xhr.request(null, 'GET', _xhr_cb);
      })();
    };

    par = $D('//div[contains(@class, "c c-2 x")]', null, 1);
    node = $D('.//a[contains(@href, "/profile/")]', par, 1);
    el = createEl('span', {id:'donatflag', 'class':'hide'}, '[$]');
    append(node, el);

    imgStr = '<i class="throb"></i><img class="c-avtr" src="'+gvar.uavatar+'male.jpg" />';
    el = createEl('div', {'class':'c-avt'}, imgStr);
    prepend(par, el);
    Dom.Ev(el, 'click', function(e){ profile_check(e) });
    profile_check(el);


    


    clog('endof-design');
    // attach event
    events_tpl();
  }

  function events_tpl(){
    var nodes, node, el;
    // [events]
    nodes = $D('//a[contains(@class, "qq btn s") or contains(@class, "qf btn s") or contains(@href,"edit_post/")]');
    if(nodes.snapshotLength > 0){
      for(var i=0, lg = nodes.snapshotLength; i<lg; i++) {
        node = nodes.snapshotItem(i);
        Dom.Ev(node, 'click', function(e){
          do_an_e(e);
          attach_qr_form(e);
        })
      }
    }

    // toggle wrp_control
    Dom.Ev($D('.btn_stg',null,1), 'click', function(e){
      var tgt = $D('#wrp_control');
      showhide( tgt );
      e = e.target||e;
      gvar.settings.toggle_plugins = isVisible(tgt);
      if( gvar.settings.toggle_plugins )
        addClass('active', e);
      else
        removeClass('active', e);

      setValue(KS+'TOGGLE_MENUS', gvar.settings.toggle_plugins ? '1' : '0');
      _TEXT.focus();
    });
    // toggle qplugin
    Dom.Ev($D('.btn_qplugin',null,1), 'click', function(e){
      var tgt = $D('#qr_plugins_container');
      showhide( tgt );
      e = e.target||e;
      if( isVisible(tgt) )
        addClass('active', e);
      else
        removeClass('active', e);

      setValue(KS+'TOGGLE_PLUGINS', isVisible(tgt) ? '1' : '0');
      _TEXT.focus();
    });
    // clear editor
    Dom.Ev($D('.QxM',null,1), 'click', function(e){
      e = e.target||e;
      _TEXT.clear(true);
      
      showhide(e, false);
    });
    // clear title
    Dom.Ev($D('.Qxc',null,1), 'click', function(e){
      e = e.target||e;
      var tgt = $D('.//div[@id="wrp_title"]/input[@type="text"]',null,1);
      if( tgt ){
        tgt.value=''; tgt.focus();
      }
      showhide(e, false);
    });

    Dom.Ev($D('.//div[@id="wrp_title"]/input[@type="text"]',null,1), 'keyup', function(e){
      e=e.target||e;
      var tgt = $D('.Qxc',null,1);
      if( e.value.length )
        showhide(tgt, 1);
      else
        showhide(tgt, false);
    });

    // editor
    node = $D('//div[@id="wrp_msg"]/textarea',null,1);
    Dom.Ev(node, 'focus', function(){ _TEXTCOUNT.init('#txtLen') });
    Dom.Ev(node, 'blur', function(){ _TEXTCOUNT.dismiss() });
    Dom.Evs(node, 'paste', function(e){
      window.setTimeout(function(){ _TOGGLER.clear_editor( (e.target||e).value.length > 0 ) }, 100);
    });
    Dom.Evs(node, 'keyup', function(e){ _TOGGLER.clear_editor( (e.target||e).value.length > 0 ) });

    Dom.Ev(node, 'keydown', function(ev){
      var asocKey, A = ev.keyCode||ev.keyChar;
      asocKey={
         '83':'sbutton'   // [S] Submit post

        ,'66' : 'bold' // B
        ,'73' : 'italic' // I
        ,'85' : 'underline' // U

        ,'69' : 'center' // E
        ,'76' : 'left' // L
        ,'82' : 'right' // R
      };
      if(ev.ctrlKey){
        if( [13, 66,73,85, 69,76,82].indexOf(A) != -1 ){
          do_an_e(ev);
          if(A===13)
            SimulateMouse($D('#sbutton'), 'click', true);
          else
            _TEXT.insert.tagBIU( asocKey[A] );
        }
      }
    });
    gvar.maxH_editor = ( parseInt( getHeight() ) - gvar.offsetEditorHeight );
    _TEXT.setElastic(gvar.maxH_editor);

    // btn-cancel edit
    Dom.Ev($D('#cbutton'), 'click', function(e){
      gvar.edit_mode = null;
      toggle_qrmode(false);
    });

    // close in_balonbox of saving /updating (editmode)
    Dom.Ev($D('.Qsv',null,1), 'click', function(e){
      _TOGGLER.baloon_save()
    });
    
    !gvar.user.isDonatur && 
    window.setTimeout(function(){
      (node = $D('#hidrecap_btn'))
        && SimulateMouse(node, 'click', true);

      Dom.Ev($D('#recaptcha_reload_btn'), 'click', function(){
        _TOGGLER.auth_noneed_cpcy(false);
      });
      Dom.Ev($D('#recaptcha_stg'), 'click', function(){
        _TOGGLER.whattheheck();
      });
      // close capcay
      Dom.Ev($D('.Qcp',null,1), 'click', function(){
        _TOGGLER.showhide_capcay();
      });

      Dom.Ev($D('#chk-auth'), 'change', function(e){
        var ischecked = _TOGGLER.auth_noneed_cpcy();
        setValueForId(gvar.user.id, String(ischecked ? '1':'0'), 'AUTHORIZED_USERS');
        gvar.user.isPreAuthorized = ischecked;
      });

      var handleKey = function(ev){
        var el, A = ev.keyCode||ev.keyChar;
        el = ev.target||ev;
        if( [9,27, 33,34].indexOf(A) != -1 ){
          switch(A){
            case 9: $D('#sbutton').focus(); break;
            case 27: _TOGGLER.showhide_capcay(false); break;
            case 33: case 34:
              if(getAttr('id', el) == 'recaptcha_response_field')
                SimulateMouse($D('#recaptcha_reload_btn'), 'click', true);
              else
                return !1;
            break;
          }
          return 1;
        }
        return !1;
      };
      Dom.Ev($D('#chk-auth'), 'keydown', function(ev){
        if( handleKey(ev) )
          do_an_e(ev);
      });
      Dom.Ev($D('#recaptcha_response_field'), 'keydown', function(ev){
        if( handleKey(ev) )
          do_an_e(ev);
      });

      baloon_positioning();
    }, 1500);

    Dom.Ev($D('#chk_fixups'), 'click', function(e){
      e = e.target||e;
      var isbaloonup, el_btn, el_plugin, chk, tgt, cssid = 'css_inject_widefix';
      tgt = $D('#'+cssid);
      tgt && Dom.remove(tgt);
      el_btn = $D('.btn_qplugin',null,1);
      el_plugin = $D('#qr_plugins_container');

      if( chk = isChecked(e) ){
        GM_addGlobalStyle(rSRC.getCSSWideFix(), cssid, 1);

        !isVisible(el_plugin) && showhide(el_plugin, true);
        addClass('active', el_btn);
      }
      else{
        if( !gvar.settings.toggle_plugins && isVisible(el_plugin))
          SimulateMouse(el_btn, 'click', true);
      }

      setValue(KS+'WIDE_THREAD', (chk ? '1' : '0'));
      baloon_positioning();
      _TEXT.lastfocus();
    });

    // form-submit
    if( node = $D('#mqrform') ){
      setAttr('action', gvar.act_uri, node);
      Dom.Ev(node, 'submit', function(e){
        var rrf, rrfvalue, elcpcy, tgt, el;
        do_an_e(e);

        el = $D('#'+gvar.tID);
        if( !el.value || (el.value && el.value.length < 5) ){
          // blank-msg
          addClass('error', el.parentNode);
          window.setTimeout(function(){
            removeClass('error', $D('#'+gvar.tID).parentNode);
          }, 3000);
          _TEXT.focus();
          return;
        }

        if(gvar.edit_mode){
          _TOGGLER.baloon_save(true);
          window.setTimeout(function(){ xhrpost() }, 212);
          return !1;
        }

        var gogo = function(){
          _TOGGLER.response_field(true);
          window.setTimeout(function(){ xhrpost() }, 212);
          return !1;
        };

        if( !gvar.user.isDonatur ){
          if(isChecked( $D('#chk-auth') ))
            return gogo();

          rrf = $D('#recaptcha_response_field');
          if( !isVisible($D('#wrp_cpcy')) ){
            _TOGGLER.showhide_capcay(true);
            tgt = $D('#sbutton');
            removeClass('btn-red', tgt);
            addClass('blue', tgt);
          }
          else{
            rrfvalue = (rrf ? trimStr(rrf.value) : !1);
            if( !rrfvalue ){
              _TOGGLER.response_field(false, true);
            }
            else{
              return gogo();
            }
          }
          window.setTimeout(function(){ rrf && rrf.focus() }, 123);
        }
        else{
          return gogo();
        }
        return false;
      }); // end-submit-ev
    }


    Dom.Ev(window, 'scroll', function(){
      var el, nVScroll = document.documentElement.scrollTop || document.body.scrollTop;
      el = $D('#site-header');
      if( nVScroll > 0 ){
        !hasClass('fx', el) && addClass('fx', el);
      }
      else{
        removeClass('fx', el);
      }
    });
    Dom.Ev(window, 'resize', function(){
      gvar.maxH_editor = ( parseInt( getHeight() ) - gvar.offsetEditorHeight );
      _TEXT.setElastic(gvar.maxH_editor, 1);
    });

    // initialize editor
    _TEXT.init();
    eventsController();
    clog('all-events-done; qr-inited');
  } // end-events_tpl

  function eventsController(){
    var ch, node, nodes, par;
    if( par = $D('.mktH',null,1) ){
      var tag, title, pTag;
      nodes = $D('.//a[starts-with(@class,"ev_")]', par);
      if( nodes.snapshotLength ){
        for(var i=0; i<nodes.snapshotLength; ++i){
          node = nodes.snapshotItem(i);
          switch( String(getAttr('class', node)).replace(/^ev_/,'') ){
            case "biu": case "align":
              Dom.Ev(node, 'click', function(e){
                e = e.target||e;
                title = getAttr('title', e).toLowerCase();
                _TEXT.insert.tagBIU(title);
              });
            break;
            case "font": case "size": case "color":
              Dom.Ev(node, 'click', function(e){
                var _cls, el = e.target||e;
                _cls = String(getAttr('class', el)).replace(/^ev_/,'');
                tag = _cls.toUpperCase();

                _TEXT.insert.tagHibrid(tag, getAttr('title', el), el);
                _TEXT.pracheck();
                do_an_e(e);
              });
            break;
            case "list":
              Dom.Ev(node, 'click', function(e){
                e = e.target||e;
                _TEXT.init();
                var selected, mode, title;
                title = getAttr('title', e).toLowerCase().replace(' list', '')
                mode = (title=='numeric' ? 'number':'dot');
                selected = _TEXT.getSelectedText();

                if(selected=='') {
                  var reInsert = function(pass){
                    var ins=prompt("Enter a list item.\nLeave the box empty or press 'Cancel' to complete the list:");
                    _TEXT.init();
                    if( ins ){
                      _TEXT.setValue( '\n' + '[*]' + ins + '');
                      reInsert(true);
                    }else{
                      return; 
                    }
                  };  
                  _TEXT.insert.tagHibrid('LIST', (mode=='number' ? 1:false) );
                  window.setTimeout(function(){ reInsert(); }, 10);
                }
                else{
                  var ret = '', parts = selected.split('\n');
                  for(var i=0; i< parts.length; i++)
                    if(trimStr(parts[i])) ret+= '\n' + '[*]' + parts[i] + '';
                  ret = '[LIST'+(mode=='number' ? '="1"' : '')+']' + ret + '\n[/LIST]';
                  _TEXT.replaceSelected( ret, [0, ret.length] );
                }
                _TEXT.pracheck();
              });
            break;
            case "media": case "codes": case "quotes":
              Dom.Ev(node, 'click', function(e){
                e = e.target||e;
                tag = getAttr('data-bbcode', e);
                _TEXT.insert.tagCustom(tag);
                _TEXT.pracheck();
              });
            break;
          }
          // end switch
        }
      }

      // qplugin inside
      node = $D('.ev_strike', par, 1);
      Dom.Ev(node, 'click', function(e){
        e = e.target||e;
        tag = getAttr('data-bbcode', e);
        _TEXT.insert.tagCustom(tag);
        _TEXT.pracheck();
      });

      // dropdown
      if( nodes = $D('.mDM', par) ){
        for(var i=0;i<nodes.length; ++i){
          Dom.Ev(nodes[i], 'mouseover', function(e){
            var tgt = $D('.//ul', (e.target||e), 1);
            tgt && tgt.style.removeProperty('display');
          })
        }
      }

      // in the end add the class to flaging
      addClass('events', par);
    } // mktH

    // shortcut

  } // end -eventsController

  function build_fetch_url(e, pattern){
    if(!e || (!e.parentNode)) return '';
    var furl, el = $D('.//a[contains(@href,"'+pattern+'")]', e.parentNode, 1);
    furl = getAttr('href', el);
    if( furl.indexOf('http:') == -1 )
      furl = gvar.domain + furl.substr(1);
    return furl;
  }
  function getPID(e){
    if(!e || (e && !e.parentNode)) return;
    return getAttr('data-pid', e.parentNode);
  }

  function toggle_qrmode(flag, respon){
    var formuri, mpar, sbtn, tgt = $D('#qrtitle_mode');
    tgt && (tgt.innerHTML = (flag ? 'Edit' : 'Reply'));
    sbtn = $D('#sbutton');
    sbtn && (sbtn.value = (flag ? 'Save Changes' : 'Post Reply'));

    if( mpar = $D('#'+gvar.qID) ){
      setAttr('action', formuri, tgt);
      setAttr('name', (flag ? 'edit_postreply':'postreply'), tgt);
    }
    
    removeClass('btn-red blue', sbtn);

    if( flag ){ // editmode
      respon && update_token(respon);
      formuri = gvar.act_uri_edit;
      addClass('blue', sbtn);
      mpar && addClass('editmode', $D('.legend', mpar, 1));

      showhide($D('#cbutton'), flag, 'inline-block');
    }
    else{
      restore_token();
      formuri = gvar.act_uri;
      addClass('btn-red', sbtn);

      _TEXT.clear();
      if( tgt = $D('//div[@id="wrp_title"]/input[@name="title"]',null,1) )
        tgt.value = '';
      
      if( tgt = $D('//div[@id="wrp_reason"]/input[@name="reason"]',null,1) ){
        tgt.value = '';
        showhide(tgt.parentNode, !flag);
      }

      showhide($D('#cbutton'), !flag);
      mpar && removeClass('editmode', $D('.legend', mpar, 1));
    }
  }

  // fallback localstorage value and isDonatur
  function failover_authorization(){
    setValueForId(gvar.user.id, '0', 'AUTHORIZED_USERS');
    if(gvar.user.isDonatur){
      alert('You need to insert capcay to post!\nPage will be reloaded now.');

      setValue(KS+'TMP_TEXT', String($D('#'+gvar.tID).value));
      setValue(KS+'TMP_TITLE', String($D('//div[@id="wrp_title"]/input[@name="title"]',null,1).value));
      location.reload(false);
      return !1;
    }
    gvar.user.isPreAuthorized = gvar.user.isDonatur = false;
    return 1;
  }

  function xhrfetch_cb_post(ret, xhr){
    ret && (ret = ret.responseText);
    clog('cb_post:\n' + ret);

    if(!ret) return;
    if(gvar.reqPID && xhr.pid && "undefined" != typeof gvar.reqPID[xhr.pid])
      delete gvar.reqPID[xhr.pid];

    // error-pattern
    if( ret.match(/[\'\"]err-msg[\'\"]/i) ){
      pat = 'not have permission';
      var re, pat, cucok, msg, el, tgt = $D('#mqrform'); 
      if( ret.indexOf(pat)!=-1 ){
        re = new RegExp('>([\\w\\s]+'+pat+'[^<]+)', "i");
        cucok = re.exec(ret);
        msg = cucok[1] + ' <a href="?kqr#login">reload page</a>';
        el = createEl('div', {'class':'err-msg'}, msg);
        append(tgt.parentNode, el);
        showhide($D('#mqrform'), false);
      }
    }
    else{

      var tgt, subret, pos={};
      pos['start'] = ret.indexOf('<textarea');
      pos['end'] = ret.indexOf('</textarea');

      subret = ret.substr(pos['start'], (pos['end'] - pos['start']));
      subret = subret.replace(/<textarea[^>]+./i, '');
      _TEXT.init();
      _TEXT.add( entity_decode( unescapeHtml( subret.replace(/\\n|\\r\\n|\\r/g, '\n') ) ) );
      _TEXT.pracheck();

      (tgt = $D('.bling',null,1)) && removeClass('bling', tgt);
    }
  }
  function xhrfetch_cb_edit(ret, xhr){
    ret && (ret = ret.responseText);
    clog('cb_edit:\n' + ret);

    if(!ret) return;
    if(gvar.reqPID && xhr && xhr.pid && "undefined" != typeof gvar.reqPID[xhr.pid])
      delete gvar.reqPID[xhr.pid];

    var tgt, subret, cucok, pos={};
    pos['start'] = ret.indexOf('<textarea');
    pos['end'] = ret.indexOf('</textarea');

    subret = ret.substr(pos['start'], (pos['end'] - pos['start']));
    subret = subret.replace(/<textarea[^>]+./i, '');
    subret = entity_decode( unescapeHtml( subret.replace(/\\n|\\r\\n|\\r/g, '\n') ) );

    // check title
    if( cucok = /<input\s((?:[\w]+=[\'\"][^\'\"]+.)\s+)+name=[\'\"]title[\'\"][^\>]+/i.exec(ret) ){
      cucok = /value=[\'\"]([^\'\"]+)/i.exec(cucok[0]);
      cucok && _TEXT.set_title(cucok[1]);
    }
    // check reason
    if( cucok = /<input\s((?:[\w]+=[\'\"][^\'\"]+.)\s+)+name=[\'\"]reason[\'\"][^\>]+/i.exec(ret) ){
      cucok = /value=[\'\"]([^\'\"]+)/i.exec(cucok[0]);
      cucok && _TEXT.set_reason(cucok[1]);
    }

    // identify as an edit_mode
    gvar.edit_mode = 1;
    toggle_qrmode(gvar.edit_mode, ret);

    _TEXT.init();
    if( gvar.edit_mode ){
      _TEXT.set(trimStr(subret));
    }
    _TEXT.pracheck();
    (tgt = $D('.bling',null,1)) && removeClass('bling', tgt);
  }
  function xhrfetch(e, mode){
    if(!e) return;
    // prep xhr
    window.setTimeout(function(){
      var xhr = new GM_XHR();
      xhr.uri = build_fetch_url(e, (mode =='edit' ? 'edit_post/' : 'post_reply/'));
      xhr.cached = true;
      xhr.pid = (mode =='edit' ? 'e' : 'q') + String(getPID(e));
      clog('GET '+(mode =='edit' ? 'edit':'')+'post...: ' + xhr.uri);
      gvar.reqPID[xhr.pid] = xhr.request(null, 'GET', (mode == 'edit' ? xhrfetch_cb_edit : xhrfetch_cb_post));
    }, 123);
  }

  function attach_qr_form(caleer){
    var e, mode, par, pid;
    e = caleer.target||caleer;

    if(gvar.edit_mode){
      if( confirm('You are currently editing a post.\n\nDiscard anyway?') ){
        gvar.edit_mode = null;
        toggle_qrmode(false);
      }
      else{
        _TEXT.focus();
        return;
      }
    }
    
    par = closest(e, {'class':'entry'})
    par && append(par, $D('#'+gvar.qID));
    mode = String(getAttr('class', e)).indexOf('qf') != -1 ? 'fetch' : null;
    !mode && (mode = String(getAttr('href', e)).indexOf('edit_post/') != -1 ? 'edit' : '');
    if( mode ){
      pid = (mode == 'edit' ? 'e' : 'q') + String(getPID(e));
      if("undefined" != typeof gvar.reqPID[pid]){
        clog('same request exist, exiting ..');
        removeClass('bling', e);
        gvar.reqPID[pid].abort();
        delete gvar.reqPID[pid];
      }
      else{
        addClass('bling', e);
        if(mode == 'edit'){
          gvar.act_uri_edit = getAttr('href', e);
          if( gvar.act_uri_edit.indexOf('http:')==-1 )
            gvar.act_uri_edit = gvar.domain + gvar.act_uri_edit.substr(1);
        }
        xhrfetch(e, (mode == 'edit' ? 'edit' : 'quote') );
      }
    }

    _TEXT.caretChk();
    _TEXT.focus();
  }

  function restore_token(){
    var tok = gvar.tkset[(gvar.edit_mode ? 'edit':'post')];
    tok && (gvar.sec_tok = tok);
    $D('#mqr_securitytoken').value = gvar.sec_tok;
  }
  function update_token(text){
    var cucok = /\bhash=([\w-]+)/gi.exec(String(text));
    if( cucok ){
      gvar.sec_tok = cucok[1]
      $D('#mqr_securitytoken').value = gvar.sec_tok;
    }
    gvar.tkset[(gvar.edit_mode ? 'edit':'post')] = gvar.sec_tok;
  }

  function xhrpost_cb_new(ret, xhr){
    ret && (ret = ret.responseText);
    clog('cb_new:\n' + ret);

    if(!ret) return;
    if(gvar.reqPID && xhr && xhr.pid && "undefined" != typeof gvar.reqPID[xhr.pid])
      delete gvar.reqPID[xhr.pid];

    var cucok, prevchecked;
    // error-pattern
    if( ret.match(/[\'\"]err-msg[\'\"]/i) ){

      prevchecked = gvar.user.isPreAuthorized;
      if(gvar.user.isDonatur || gvar.user.isPreAuthorized){
        if( failover_authorization() == !1 )
          return;
      }

      if( ret.indexOf('image verification did not match')!=-1 ){
        _TOGGLER.showhide_capcay(true);
        _TOGGLER.gnotice(true, (prevchecked ? 'Capcay is required. \n':'')+'The text you entered did not match. Please try again.');
        _TOGGLER.response_field(false, true);
        _TOGGLER.auth_noneed_cpcy(false);
      }
    }
    // submit-pattern
    else if( ret.match(/[\'\"]s-msg[\'\"]/i) ){
      if( cucok = /\bpost\/([\d\w]+)\#post([\d\w]+)\b[^\>]+.Click\shere/i.exec(ret) ){
        var next = gvar.domain + 'post/' + cucok[1] + '#' + cucok[2];
        top.location.href = next;
      }
      else if( ret.indexOf('security token was invalid.<')!=-1 ){
        alert('Invalid securitytoken');
      }
      else{
        alert('Unknown Error');
        clog(ret);
      }
    }
    update_token(ret);
  }
  function xhrpost_cb_update(ret, xhr){
    ret && (ret = ret.responseText);
    clog('cb_update:\n' + ret);

    if(!ret) return;
    if(gvar.reqPID && xhr && xhr.pid && "undefined" != typeof gvar.reqPID[xhr.pid])
      delete gvar.reqPID[xhr.pid];

    if( /[\\\"]+s-msg[\\\"]+>/i.test(ret) ){
      if( cucok = /\bpost\/([^"\']+)[^>]+.Click\shere\b/i.exec(ret) ){
        _TOGGLER.baloon_set('#Okesip');
        var next = gvar.domain + 'post/' + cucok[1];
        window.setTimeout(function(){
          if(location.href == next)
            location.reload(true);
          else
            top.location.href = next; return;
        }, 450);
      }
      else if( ret.indexOf('security token was invalid.<')!=-1 ){
        alert('Invalid securitytoken');
      }
      else{
        alert('Unknown Error');
        clog(ret);
      }
    }

    update_token(ret);
  }
  function xhrpost(){
    var xhr = new GM_XHR();
    xhr.cached = true;
    xhr.uri = (gvar.edit_mode ? gvar.act_uri_edit : gvar.act_uri);
    xhr.pid = (gvar.edit_mode ? '_editpost_' : '_newpost_');

    clog('POST '+(gvar.edit_mode ? 'edit':'')+'post...: ' + xhr.uri);
    var sdata = build_data_form(true);
    gvar.reqPID[xhr.pid] = xhr.request(sdata, 'POST', (gvar.edit_mode ? xhrpost_cb_update : xhrpost_cb_new));
  }

  function build_data_form(toString){
    var data, node, nodes, par, field, fields;
    if( par = $D('#mqrform') ){
      data = (toString ? '' : {});
      nodes = $D('.//*[@name]', par);
      fields = ['title','message','securitytoken','sbutton']; // previews
      if(gvar.edit_mode)
        fields = fields.concat(['reason']);
      else
        fields = fields.concat(['recaptcha_challenge_field','recaptcha_response_field']);
      
      if( nodes.snapshotLength ){
        for(var i=0; i<nodes.snapshotLength; ++i){
          node = nodes.snapshotItem(i);
          field = trimStr( String(getAttr('name', node)) );
          if( fields.indexOf(field) == -1) continue;
          if(toString)
            data+='&' + field + '=' + trimStr(node.value);
          else
            data[field] = trimStr(node.value);
        }

        // keep send this field
        if(!gvar.edit_mode && gvar.user.isDonatur){
          if(toString)
            data+='&recaptcha_challenge_field=1&recaptcha_response_field=1';
          else
            data['recaptcha_challenge_field'] = data['recaptcha_response_field'] = '';
        }
      }
    }

    return data;
  }

  // baloon positioning;
  function baloon_positioning(){
    var lOffset, lpos, cppos, mQRpos, tgt, nodes;
    nodes = $D('.in_balonbox',null);
    if( nodes.length )
    for(var i=0; i<nodes.length; ++i){
      tgt = nodes[i];
      tgt.style.removeProperty('visibility');
      tgt.style.setProperty('display', '', '');

      cppos = getPosDim(tgt)
      mQRpos = getPosDim($D('.mQR',null,1))
      lpos = (Math.floor(mQRpos['w']/2) - Math.floor(cppos['w']/2) );
      lOffset = 15;
      tgt.style.setProperty('left', parseInt(lpos+lOffset)+'px', '');
      tgt.style.setProperty('display', 'none', '');
    }
  }

  // domain guest
  function domainParse(){
    var l = location.hostname;
    return {"prot": location.protocol, "host": l, "statics" : 'cdn.kaskus.com'};
  }

  function getPosDim(el) {
    var r = {x:0,y:0, w:el.offsetWidth, h:el.offsetHeight};
    for (var lx=0, ly=0; el != null;
      lx+= el.offsetLeft, ly+= el.offsetTop, el = el.offsetParent);
    r['x'] = lx; r['y']=ly;
    return r;
  }
  // static routine
  function dump(x) { return x && JSON ? JSON.stringify(x) : x}
  function isDefined(x) { return !(x == null && x !== null); }
  function isUndefined(x) { return x == null && x !== null; }
  function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
  function trimStr(x) { return (typeof(x)=='string' && x ? x.replace(/^\s+|\s+$/g,"") : '') };
  function isLink(x) { return x.match(/((?:http(?:s|)|ftp):\/\/)(?:\w|\W)+(?:\.)(?:\w|\W)+/); }
  function getAbsoluteTop(element) {
    var AbsTop=0;
    while (element) { AbsTop=AbsTop+element.offsetTop; element=element.offsetParent; }
    return(AbsTop);
  }
  function getHeight(){
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
  function isVisible(el){
    return el.offsetWidth > 0 || el.offsetHeight > 0;
  }
  function isChecked(el){
    return el.checked;
  }
  function entity_decode(S){
    return S.replace(/\&gt;/gm,'>').replace(/\&lt;/gm,'<').replace(/\&amp;/gm,'&');
  }
  function entity_encode(S){
    return !S ? '' : String(S).replace(/>/gm,'&gt;').replace(/</gm,'&lt;').replace(/\"/g,'&quot;');
  }
  // clean-up fetched post
  function unescapeHtml(text){
    if(!text) return '';
    var cleanRet = '', temp = createEl('div',{},text);
    for(var i in temp.childNodes){
      if(typeof(temp.childNodes[i])!='object' || isUndefined(temp.childNodes[i].nodeValue)) continue;
      cleanRet += temp.childNodes[i].nodeValue;
    }
    temp.removeChild(temp.firstChild);
    return cleanRet;
  }
  function showhide(obj, show, isImportant){
    if(isUndefined(obj) || "object" != typeof obj || (obj && !obj.style)) return;
    if(isUndefined(show)) show = (obj.style.display=='none'); // toggle mode
    if(!show){
      obj.style.setProperty('display', 'none', isImportant===true ? 'important' : ''); // important
    }else{
      if( isImportant )
        obj.style.setProperty('display', isImportant, 'important'); 
      else
        obj.style.removeProperty('display');
    }
  };
  function closest(obj, params){
    if(!obj || (obj && !obj.parentNode))
      return;
    var criteria, gotit, par, ijump, threshold;
    gotit = null; threshold = 20; ijump = 0;
    for(crt in params){
      if("string" == typeof crt)
        criteria = crt;
    }
    par = obj;
    while(!gotit){
      par = par.parentNode;
      switch(criteria){
        case "class":
          gotit = getAttr('class', par);
          gotit = gotit && (gotit.indexOf(params[criteria]) != -1);
        break;
        case "id":
          gotit = getAttr('id', par);
          gotit = gotit && (gotit == params[criteria]);
        break;
        case "tag":
          gotit = par.nodeName.toLowerCase();
          gotit = gotit && (gotit == params[criteria].toLowerCase());
        break;
        default:
          gotit = getAttr(criteria, par);
          gotit = gotit && (gotit == params[criteria]);
        break;
      }
      ++ijump;
      if(ijump > threshold)
        break;
    }
    return gotit ? par : null;
  }
  function prepend(parent, child, before){
    if(!parent || ("object"!=typeof child)) return;
    if("undefined" == typeof before)
        before = parent.firstChild;
    parent.insertBefore(child, before);
  }
  function append(parent, childs){
    if(!parent || ("object"!=typeof childs)) return;
    if("string" == typeof childs.innerHTML){
      parent.appendChild(childs);
    }
    else{
      for(var i=0; i<childs.length; ++i){
        parent.appendChild(childs[i]);
      }
    }
  }
  function addClass(cName, Obj){
    if(cName=="") return;
    var neocls = (Obj.className ? Obj.className : '');
    if(neocls.indexOf(cName)!=-1) return;
    neocls+=(neocls!=''?' ':'')+cName;
    setAttr('class', neocls, Obj);
  }
  function removeClass(cName, Obj){
    if(!cName || !Obj) return;
    var neocls, rmvclss = getAttr('class', Obj);
    neocls = getAttr('class', Obj);
    rmvclss = cName.split(' ');
    for(var i=0; i<rmvclss.length; ++i)
      neocls = neocls.replace(rmvclss[i], '');
    neocls = trimStr(neocls);
    setAttr('class', neocls, Obj);
  }
  function hasClass(cName, Obj){
    if(!cName || !Obj) return;
    var clss = getAttr('class', Obj).split(' ');
    return (clss.indexOf(cName) != -1);
  }
  function getAttr(name, Obj){
    if("string" === typeof name && "object" === typeof Obj && Obj)
      return Obj.getAttribute(name)||'';
    else
      return;
  }
  function setAttr(name, value, Obj){
    if("string" === typeof name && "object" === typeof Obj)
      return Obj.setAttribute(name, value);
  }
  function getValue(key) {
    var data=OPTIONS_BOX[key];
    return (!data ? '': GM_getValue(key,data[0]));
  }
  function setValue(key, value) {
    var data=OPTIONS_BOX[key];
    return (!data ? '': GM_setValue(key,value));
  }
  function setValueForId(userID, value, gmkey, sp){
    if( !userID ) return null;
    
    sp = [(isDefined(sp) && typeof(sp[0])=='string' ? sp[0] : ';'), (isDefined(sp) && typeof(sp[1])=='string' ? sp[1] : '::')];
    var i, ksg = KS+gmkey, info;
    return (function(val){
      info = val;
      if( !info ){
        setValue(ksg, userID+"="+value);
        return;
      }
      info = info.split( sp[0] );
      for(i=0; i<info.length; i++){
        if(info[i].split('=')[0]==userID){
          info.splice(i,1,userID+"="+value);
          setValue(ksg, info.join(sp[0]));
          return;
        }
      }
      
      info.splice(i, 0, userID+"="+value);
      return setValue(ksg, info.join(sp[0]));
    })( getValue(ksg) );
  }

  // values stored in format "userID=value;..."
  // sp = array of records separator
  // gvar.user.id, 'LAYOUT_TPL', ['<!>','::'], function
  function getValueForId(userID, gmkey, sp){
    if( !userID ) return null;
    clog(gmkey + ' inside');
    
    sp = [(isDefined(sp) && typeof(sp[0])=='string' ? sp[0] : ';'), (isDefined(sp) && typeof(sp[1])=='string' ? sp[1] : '::')];    
    var val, info, retValue=null;

    return (function(val){
      if( !val ) {

        clog(gmkey + ' blank; halted');
        retValue = null;
        return;
      }
      info = val.split( sp[0] );
      clog(gmkey + ' info=' + info);
      
      for(var i=0; i<info.length; i++){
        if( !isString(info[i]) ) continue;
        var recs = info[i].split('=');
        if( recs[0]==userID ){
          var rets = [userID], values = recs[1].split(sp[1]), vL=values.length;
          for(var idx=0; idx<vL; idx++){
            if( !isString(values[idx]) ) continue;
            rets.push(values[idx]);
          }
          retValue = rets;
          break;
        }
      }

      return retValue;
    })( getValue(KS + gmkey) );
  }
  function delValueForId(userID, gmkey){
    var ksg = KS+gmkey, tmp=[], info = getValue(ksg);
    info = info.split(';');
    for(var i=0; i<info.length; i++){
      if(info[i].split('=')[0]!=userID)
        tmp.push(info[i]);    
    }
    setValue(ksg, tmp.join(';'));
  }
  function delValue(key){
    var data=OPTIONS_BOX[key];
    try{
      return (!data ? null : GM_deleteValue(key));
    }catch(e){}
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
  // play safe with Opera;
  //=== BROWSER DETECTION / ADVANCED SETTING
  //=============snipet-authored-by:GI-Joe==//
  function ApiBrowserCheck() {
    //delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;
    if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
    if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
    
    var needApiUpgrade=false;
    if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
      needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; clog('Opera detected...',0);
    }
    if(typeof(GM_setValue)!='undefined') {
      var gsv; try { gsv=GM_setValue.toString(); } catch(e) { gsv='.staticArgs.FF4.0'; }
      if(gsv.indexOf('staticArgs')>0) {
        gvar.isGreaseMonkey=true; gvar.isFF4=false;
        clog('GreaseMonkey Api detected'+( (gvar.isFF4=gsv.indexOf('FF4.0')>0) ?' >= FF4':'' )+'...',0); 
      } // test GM_hitch
      else if(gsv.match(/not\s+supported/)) {
        needApiUpgrade=true; gvar.isBuggedChrome=true; clog('Bugged Chrome GM Api detected...',0);
      }
    } else { needApiUpgrade=true; clog('No GM Api detected...',0); }
    
    gvar.noCrossDomain = (gvar.isOpera || gvar.isBuggedChrome);
    if(needApiUpgrade) {
      //gvar.noCrossDomain = gvar.isBuggedChrome = 1;
      clog('Try to recreate needed GM Api...',0);
      //OPTIONS_BOX['FLASH_PLAYER_WMODE'][3]=2; OPTIONS_BOX['FLASH_PLAYER_WMODE_BCHAN'][3]=2; // Change Default wmode if there no greasemonkey installed
      var ws=null; try { ws=typeof(unsafeWindow.localStorage) } catch(e) { ws=null; } // Catch Security error
      if(ws=='object') {
        clog('Using localStorage for GM Api.',0);
        GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; };
        GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } };
        GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); };
      } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
        clog('Using temporarilyStorage for GM Api.',0); gvar.temporarilyStorage=new Array();
        GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } };
        GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } };
        GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
      }
      if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); }; }
      if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); }; } // Dummy
      if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
        clog('Using XMLHttpRequest for GM Api.',0);
        GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
      }; }
    } // end needApiUpgrade
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

  //----
  init()
})();
/* Mod By Idx. */ 