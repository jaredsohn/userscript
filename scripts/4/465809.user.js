// ==UserScript==
// @name          QR-Plugins.IMG.WrapBBCode
// @namespace     http://userscripts.org/scripts/show/QR-Plugins.IMG.AutoBBCode
// @include        *.kaskus.co.id/thread/*
// @include        *.kaskus.co.id/lastpost/*
// @include        *.kaskus.co.id/post/*
// @include        *.kaskus.co.id/group/discussion/*
// @include        *.kaskus.co.id/show_post/*
// @version       0.1
// @dtversion     1404140001
// @timestamp     1351547543977
// @qrversion     4.0
// @description   plugins for Kaskus-QR, wrap all image link with img bbcode
// @author        tuxie.forte;
// @license       (CC) by-nc-sa 3.0
//
// -!--latestupdate
//
//
// v0.1 - 2014-04-14
//  init
//
// -/!latestupdate---
// ==/UserScript==
//

(function(){
// Initialize Global Variables
var gvar=function() {};

/*
window.alert(new Date().getTime());
*/
//========-=-=-=-=--=========
gvar.__DEBUG__ = !1; // development
//========-=-=-=-=--=========


// this is where we re-initialize before we trigger start_Main()
// any huge global var or loading any saved value may start in here too
function init_start(){
    gvar.B = rSRC.getSetOf('button');
    gvar.tID = "reply-messsage";

    // gvar.supportExt = '*';
    gvar.supportExt = 'gif,jpg,jpeg,png,pneg';
    
    
    start_Main();
}

function handleClick(){
  var vBText = _TEXT.init();
  var re, isImg, ucok, textcontent = vBText.content;
  var extpat = ( gvar.supportExt == '*' ? "[\\w]+" : gvar.supportExt.split(",").join("|") );
  var imgStrRgx = "\\b(https?:\\/\\/(?:[a-z\\-]+\\.)+[a-z]{2,6}(?:\\/[^/#?\\n]+)+\\.(?:"+extpat+"))\\b";

  isImg = new RegExp(imgStrRgx, "gi");
  re = new RegExp("(.[^\\n\\]\\[]+|^\\W|^)"+imgStrRgx+"([\\]\\[]+)?", "gim");
  clog( re );

  if( re.test( textcontent ) ){
    // let parse..
    var parser = function parser(S, $1, $imglink, $3){
      var sbf='', prefix = (isDefined($1) && $1 ? $1.toUpperCase() : '');
      if( isUndefined($3) )
        $3 = '';
      if( isUndefined($1) )
        $1 = '';

      clog("\nS="+S+';prefix='+prefix+';imglink='+$imglink+';$3='+$3+"\n");

      if( $3 && (!prefix || (prefix == '[URL=' && $3 == ']')) ){

        return S; // ignored

      }
      else{
        if( isImg.test(trimStr(S)) )
          return S.replace(isImg, function(S, $$1){
            return '[IMG]'+$$1+'[/IMG]';
          });
        else
          return $1+'[IMG]'+($imglink ? $imglink : S)+'[/IMG]'+$3;
      }
    };

    var tmp = textcontent.replace(re, parser);
    if( tmp != textcontent ) 
      vBText.set( tmp );
  }
}


// =====
// START
function start_Main(){
  var par = gID(gvar.qr_identity);
  var inp, span;

  if( par ){
    // this span container needed if we have to wrap popup menu with absolute position
    span = createEl('span', {style:'display:inline-block'});
    Dom.add(span, par);

    inp = createEl('img', {id:'btn_autoimgbbcode', 'src':gvar.B.txtflip_gif, style:'vertical-align:bottom;', alt:'[imgautobbcode]', title:'IMG.AutoBBCode'});
    _o('click', inp, function(e){return handleClick(e)} );
    Dom.add(inp, span);
  }
}



// -
// -
// -
// -
//========= 
// code below should adapting current QR Engine for this plugins works
// leave code below as wot it is, as long you know what todo
//========= Common Functions && Global Var Init ====
// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return x.replace(/^\s+|\s+$/g,""); };

function _o(m,e,f){Dom.Ev(e,m,function(e){typeof(f)=='function'?f(e):void(0)});}
function gID(x) { return document.getElementById(x) }
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

var _TEXT = {
  e : null, eNat : null,
  content   : "",
  cursorPos   : [],
  last_scrollTop: 0,
  init: function() {
    this.eNat = gID(gvar.tID);
    this.content = this.eNat.value;
    this.cursorPos = _TEXT.rearmPos(); // [start, end]
    
    this.last_scrollTop = gID(gvar.tID).scrollTop; // last scrolltop pos  
    return this;
  },
  rearmPos: function(){ return [this.getCaretPos(), gID(gvar.tID).selectionEnd]; },
  subStr: function(start, end){ return this.content.substring(start, end);},
  set: function(value){
    
    gID(gvar.tID).value = this.content = value; 
    _TEXT.setRows_Elastic();
    _TEXT.init();

  },
  wrapValue : function(tag, title){
    var st2, start=this.cursorPos[0], end=this.cursorPos[1],bufValue;
    tag = tag.toUpperCase();    
    bufValue = this.subStr(0, start) + 
      '['+tag+(title?'='+title:'')+']' + 
      (start==end ? '' : this.subStr(start, end)) + 
      '[/'+tag+']' + this.subStr(end, this.content.length);
    
    this.set(bufValue);
    st2 = (start + ('['+tag+(title?'='+title:'')+']').length);
    this.setCaretPos( st2, st2 + this.subStr(start, end).length );    
    if(this.overflow!='hidden') gID(gvar.tID).scrollTop = (this.last_scrollTop+1);
    return bufValue; 
  },
  add: function(text){ // used on fetch post only
    var newline = '\n\n';
    if( gID(gvar.tID).value != "" )
      this.content+= newline;
    gID(gvar.tID).value = ( this.content + text );
    
    setTimeout(function(){
      _TEXT.lastfocus();
    }, 200);
  },
  // ptpos stand to puretext position [start, end]
  setValue : function(text, ptpos){
    var start=this.cursorPos[0], end=this.cursorPos[1];
    if(isUndefined(ptpos)) ptpos=[text.length,text.length];
    if(start!=end) {
      this.replaceSelected(text,ptpos);
      return;
    }
    var bufValue = this.subStr(0, start) + text + this.subStr(start, this.content.length);
    this.set(bufValue);
    // fix chrome weird
    this.setCaretPos( (start + ptpos[0]), (start+ptpos[1]) );
    if(_TEXT.overflow!='hidden') gID(gvar.tID).scrollTop = (this.last_scrollTop+1);
    return bufValue; 
  },
  replaceSelected : function(text, ptpos){
    var start=this.cursorPos[0], end=this.cursorPos[1];
    if(start==end) return;    
    var bufValue = this.subStr(0, start) + text + this.subStr(end, this.content.length);
    this.set(bufValue);
    this.setCaretPos( (start + ptpos[0]), (start+ptpos[1]) );
    if( _TEXT.overflow!='hidden') gID(gvar.tID).scrollTop = (this.last_scrollTop+1);
  },
  pracheck: function(foc){
    if( isUndefined(foc) )
      foc = true;
    
    _TEXT.setElastic(gvar.maxH_editor);
    if( gID(gvar.tID).value !="" )
      gID('clear_text').style.setProperty('display', 'block');
    else
      gID('clear_text').style.setProperty('display', 'none');
    if(foc) setTimeout(function(){
      _TEXT.focus();
    }, 200);
  },
  focus: function(){ 
    gID(gvar.tID).focus() 
  },
  lastfocus: function (){
    var eText, nl, pos, txt = String(gID(gvar.tID).value); // use the actual content
    pos = txt.length;   
    nl = txt.split('\n');
    nl = nl.length;
    pos+= (nl * 2);   
    eText = gID(gvar.tID);
    if( eText.setSelectionRange ) {
      _TEXT.focus();
      eText.setSelectionRange(pos,pos);
    }
    setTimeout(function(){ _TEXT.focus() } , 310);
  },
  getSelectedText : function() {
    return (this.cursorPos[0]==this.cursorPos[1]? '': this.subStr(this.cursorPos[0], this.cursorPos[1]) );
  },
  getCaretPos : function() {  
    var CaretPos = 0;
    //Mozilla/Firefox/Netscape 7+ support   
    if(gID(gvar.tID))
      if (gID(gvar.tID).selectionStart || gID(gvar.tID).selectionStart == '0')
      CaretPos = gID(gvar.tID).selectionStart;
    return CaretPos;
  },  
  setCaretPos : function (pos,end){
    if(isUndefined(end)) end = pos;
    if(gID(gvar.tID).setSelectionRange)    { // Firefox, Opera and Safari
      this.focus();
      gID(gvar.tID).setSelectionRange(pos,end);
    }
  },
  setElastic: function(max,winrez){
    var a, tid=gvar.tID;
  
    function setCols_Elastic(max){
      var a=gID(tid); a.setAttribute("cols", Math.floor(a.clientWidth/7));
      var w = Math.floor(a.clientWidth/7);
      _TEXT.setRows_Elastic(max)
    }
    a= gID(tid) || gID(gvar.tID);
    _TEXT.oflow='hidden';
    a.setAttribute('style','visibility:hidden; overflow:'+_TEXT.oflow+';letter-spacing:0;line-height:14pt;'+(max?'max-height:'+(max-130)+'pt;':''));
    if( !winrez ) gID(gvar.tID).keyup(function(){ setCols_Elastic(max) });
    setCols_Elastic(max);
  },
  setRows_Elastic: function(max){
    var a = gID(gvar.tID), c=a.cols, b=a.value.toString(), h;
    b=b.replace(/(?:\r\n|\r|\n)/g,"\n");
    for(var d=2,e=0,f=0;f<b.length;f++){
      var g=b.charAt(f);e++;if(g=="\n"||e==c){d++;e=0}
    }
    h=(d*14); a.setAttribute("rows",d); a.style.height=h+"pt";
    _TEXT.oflow = (max && (d*14>(max-130)) ? 'auto':'hidden');
    a.style.setProperty('overflow', _TEXT.oflow, 'important');
    gID(gvar.tID).style.setProperty('visibility', 'visible');
  }
};


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



// main resource
var rSRC = {
  getSetOf: function(type){
    if(isUndefined(type)) return false;        
    switch(type){
      case "button":
      return {
        txtflip_gif : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAAAAAB+u6HMAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94EEBANFPIrL+AAAABNSURBVBjTY/zPgAmYsIgxsDBUX0YT0m1lQeZuYrjMoFvFwMDCwCDmDBNczsDAcOWVOAMLA4NYJIruyzgsGiqCLAwMV/zQAoSBkejwBACJzwu9lnUAQAAAAABJRU5ErkJggg=="

      };
      break;
    }
  }

};
// -end static
//========= 

function init(){
    gvar.qr_identity= 'qr_plugins_container';
    gvar.try_wait = 0;
    gvar.try_max = 20;
    gvar.sITry_wait= null;

    wait_for_qr();
}

// make sure QR DOM is finished loaded
function wait_for_qr(){
  if( gvar.try_wait<gvar.try_max ){
    if( !gID(gvar.qr_identity) ){
      clog('IMG.AutoBBCode waiting.. ');
      gvar.try_wait++;
      gvar.sITry_wait = window.setTimeout(function() { wait_for_qr() }, 500);
    }else{
      clearTimeout( gvar.sITry_wait ); 
      init_start();
    }
  }
}

// ------
init();
// ------

})()
/* tF. */
