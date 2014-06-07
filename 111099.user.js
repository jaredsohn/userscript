// ==UserScript==
// @name          QR-Plugins.TextMechanic
// @namespace     http://userscripts.org/users/315214
// @include        *.kaskus.co.id/thread/*
// @include        *.kaskus.co.id/lastpost/*
// @include        *.kaskus.co.id/post/*
// @include        *.kaskus.co.id/group/discussion/*
// @include        *.kaskus.co.id/show_post/*
// @version       0.4
// @dtversion     1210300004
// @timestamp     1351547543977
// @qrversion     4.0.9
// @description   plugins for Kaskus-QR TextMechanic generator
// @author        tuxie.forte;
// @license       (CC) by-nc-sa 3.0
//
// -!--latestupdate
//
// v0.4 - 2012-10-30
//  include new-kaskus (co.id)
//
// v0.3 - 2011-08-27
//  Fix deprecate relative position
//
// v0.2 - 2011-08-24
//  + Encryption from crypo.com
//
// v0.1 - 2011-08-23
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
gvar.__DEBUG__ = false; // development
//========-=-=-=-=--=========


// this is where we re-initialize before we trigger start_Main()
// any huge global var or loading any saved value may start in here too
function init_start(){   
    
    gvar.B = rSRC.getSetOf('button');
    gvar.tID = "reply-messsage";
    
    
    start_Main();
}
// =====
// START
function start_Main(){

  var par = gID(gvar.qr_identity);
  var el, inp, divs, span;
  var text_mecs = {
    'b64Enc' : 'Text &gt; Base64'
    ,'b64Dec' : '&nbsp;decrypt(Base64)'

    ,'binEnc' : 'Text &gt; Binary'
    ,'binDec' : '&nbsp;decrypt(Binary)'

    ,'esabEnc' : 'Text &gt; ESAB-46'
    ,'esabDec' : '&nbsp;decrypt(ESAB-46)'

    ,'_3fxEnc' : 'Text &gt; TIGO-3FX'
    ,'_3fxDec' : '&nbsp;decrypt(TIGO-3FX)'

    ,'gila7Enc' : 'Text &gt; GILA7'
    ,'gila7Dec' : '&nbsp;decrypt(GILA7)'

    ,'atom128Enc' : 'Text &gt; ATOM-128'
    ,'atom128Dec' : '&nbsp;decrypt(ATOM-128)'

  };    
  if( par ){        
    // this span container needed if we have to wrap popup menu with absolute position
    span = createEl('span', {style:'display:inline-block'});
    Dom.add(span, par);
    
    inp = createEl('img', {id:'btn_txtmec', 'src':gvar.B.txtmec_gif, style:'vertical-align:bottom;', alt:'[txtmec]', title:'Text Mechanic Generator'});
    _o('click', inp, function(e){return toggle_txtmec_menu(e)} );
    Dom.add(inp, span);
    
    // fake input for lost focus (blured)
    inp = createEl('input', {id:'txtmec_fake_focus', 'value':'', style:'border:0; width:0; position:absolute; margin:-99px 0 0 -99999px;'});
    _o('blur', inp, function(e){ var c=gID('popup_txtmec_menu'); if(c) window.setTimeout(function() { gID('popup_txtmec_menu').style.display='none' }, 500); });
    Dom.add(inp, span);
    
    divs = createEl('div', {id:'popup_txtmec_menu', 'class':'vbmenu_popup', 'style':'width:auto; overflow:hidden; display:none;'});
    for(var tipe in text_mecs){
      el = createEl('div', {style:'text-align:left;', 'class':'osize', rel:tipe, title:text_mecs[tipe]}, text_mecs[tipe]);
      _o('click', el, function(e){ return handleClick(e) });
      Dom.add(el, divs);
    }
    Dom.add(divs, span);
  }
}
function handleClick(e){
  var vBText = _TEXT.init();
  if(!vBText) return;
  e=e.target||e;

  var endFocus=function(){ _TEXT.focus(); return false}, suffix='';
  var selected = _TEXT.getSelectedText(), todo = e.getAttribute('rel'), ret='', prehead, text;

  text=(selected!= '' ? selected : prompt('Please enter Text to become rainbow:', 'text mechanic') );
  if(text==null) return endFocus();

  ret = textMechanic(text, todo);

  if( /Enc$/.test(todo) ){
    var tit = e.title, cucok = /;\s(.+)/.exec(tit);
    suffix = (cucok ? "\r\n" + '[size=1]' + cucok[1] + '[/size]' : '');
    ret+=suffix;
  }
  prehead = [0, ret.length];
  if(selected=='')
    _TEXT.setValue( ret, prehead );
  else
    _TEXT.replaceSelected( ret, prehead );
}

function toggle_txtmec_menu(e){
  e=e.target||e;
  var tgt = gID('popup_txtmec_menu'), showed=(tgt.style.display!='none');
  tgt.style.display=(showed ? 'none' : '');

  if(!showed && gID('txtmec_fake_focus')) 
    window.setTimeout(function() { gID('txtmec_fake_focus').focus() }, 200);
}


/*=========
# main functions
# >Binary Code Translator
# >Base64 Converter
# Copyright 2011 TextMechanic.com All Rights Reserved
# sources: 
#  + http://textmechanic.com
#  + http://crypo.com
# ========= 
*/
function textMechanic(text, todo){
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var B64={
        Enc:function(a){var b,c,d;var e,f,g,h;var i=0,j="";while(i<a.length){b=a.charCodeAt(i++);c=a.charCodeAt(i++);d=a.charCodeAt(i++);e=b>>2;f=(b&3)<<4|c>>4;g=(c&15)<<2|d>>6;h=d&63;if(isNaN(c)){g=h=64}else if(isNaN(d)){h=64}j+=keyStr.charAt(e)+keyStr.charAt(f)+keyStr.charAt(g)+keyStr.charAt(h)}return j},
        Dec:function(a){var b,c,d;var e,f,g,h;var i=0,j="";a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<a.length){e=keyStr.indexOf(a.charAt(i++));f=keyStr.indexOf(a.charAt(i++));g=keyStr.indexOf(a.charAt(i++));h=keyStr.indexOf(a.charAt(i++));b=e<<2|f>>4;c=(f&15)<<4|g>>2;d=(g&3)<<6|h;j+=String.fromCharCode(b);if(g!=64){j+=String.fromCharCode(c)}if(h!=64){j+=String.fromCharCode(d)}}j=j.toString();return j}
    };
    // end B64
    
    var BIN={
        spaces:true,
        Enc:function(a){var b=[],c,d;a=a.replace(/\r/g,"");a=a.split("\n");c=a.length;for(var e=0;e<c;e++)b[e]=BIN.bincvt(a[e]).trim();d=BIN.spaces?" 00001010 ":"00001010";b=b.join(d);return b.trim()},
        Dec:function(a){a=a.trim().replace(/\r/g,"");if(a.length<8){alert("Invalid Binary");return a}a=a.split("\n");var b=[],c=[],d;for(var e=0;e<a.length;e++){b[e]=BIN.cleantxt(a[e])}a=BIN.revemplin(b,"").join("\n");a=a.split(" ").join("");a=a.split("\n");d=a.length;for(var e=0;e<d;e++){c[e]=BIN.asccvt(a[e])}c=c.join("\n");return c},
        bincvt:function(a){var b=a,c=[],d,e,f,g=" ";b=b.split("");d=b.length;e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()-_+={}[]|:;<>?,.\"/\\' ";f=["01000001","01000010","01000011","01000100","01000101","01000110","01000111","01001000","01001001","01001010","01001011","01001100","01001101","01001110","01001111","01010000","01010001","01010010","01010011","01010100","01010101","01010110","01010111","01011000","01011001","01011010","01100001","01100010","01100011","01100100","01100101","01100110","01100111","01101000","01101001","01101010","01101011","01101100","01101101","01101110","01101111","01110000","01110001","01110010","01110011","01110100","01110101","01110110","01110111","01111000","01111001","01111010","00110000","00110001","00110010","00110011","00110100","00110101","00110110","00110111","00111000","00111001","00100001","01000000","00100011","00100100","00100101","00100110","00101010","00101000","00101001","00101101","01011111","00101011","00111101","01111011","01111101","01011011","01011101","01111100","00111010","00111011","00111100","00111110","00111111","00101100","00101110","00100010","00101111","01011100","00100111","00100000"];for(var h=0;h<d;h++){var i=f[e.indexOf(b[h])];if(i==undefined)c[h]="";else c[h]=i+g}c=c.join("");return c},
        asccvt:function(a){var b=a,c,d,e=[],f;b=BIN.chunk(b,8).join(",||");b="||"+b;b=b.split(",");f=b.length;c="          ||01000001||01000010||01000011||01000100||01000101||01000110||01000111||01001000||01001001||01001010||01001011||01001100||01001101||01001110||01001111||01010000||01010001||01010010||01010011||01010100||01010101||01010110||01010111||01011000||01011001||01011010||01100001||01100010||01100011||01100100||01100101||01100110||01100111||01101000||01101001||01101010||01101011||01101100||01101101||01101110||01101111||01110000||01110001||01110010||01110011||01110100||01110101||01110110||01110111||01111000||01111001||01111010||00110000||00110001||00110010||00110011||00110100||00110101||00110110||00110111||00111000||00111001||00100001||01000000||00100011||00100100||00100101||00100110||00101010||00101000||00101001||00101101||01011111||00101011||00111101||01111011||01111101||01011011||01011101||01111100||00111010||00111011||00111100||00111110||00111111||00101100||00101110||00100010||00101111||01011100||00100111||00100000||00001010";d=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","&","*","(",")","-","_","+","=","{","}","[","]","|",":",";","<",">","?",",",".",'"',"/","\\","'"," ","\n"];for(var g=0;g<f;g++){e[g]=d[c.indexOf(b[g])/10-1]}e=e.join("");return e},
        chunk:function(a,b){if(typeof b=="undefined")b=2;return a.match(RegExp(".{1,"+b+"}","g"))},
        cleantxt:function(a){var b=a,c=[],d,e;b=b.split("");d="abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()-_+={}[]|:;<>?,.\"/\\' ";e=["","","","","","","","","","","","","","","","","","","","","","","","","","","0","1","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];for(var f=0;f<b.length;f++)c[f]=e[d.indexOf(b[f])];cleaned=c.join("");if(cleaned.length==0)cleaned="00100000";return cleaned},
        revemplin:function(a,b){var c;for(c=0;c<a.length;c++){if(a[c]==b){a.splice(c,1);c--}}return a}
    };
    // end BIN
    
    var ES46={
        Enc: function(a){a=escape(a);var b="",c,d,e="";var f,g,h,i="",j=0;do{c=a.charCodeAt(j++);d=a.charCodeAt(j++);e=a.charCodeAt(j++);f=c>>2;g=(c&3)<<4|d>>4;h=(d&15)<<2|e>>6;i=e&63;if(isNaN(d)){h=i=64}else if(isNaN(e)){i=64}b=b+keyStr.charAt(f)+keyStr.charAt(g)+keyStr.charAt(h)+keyStr.charAt(i);c=d=e="";f=g=h=i=""}while(j<a.length);return b        },
        Dec: function(a){a=a.replace(/\s+/g,"");var b="",c,d,e="";var f,g,h,i="",j=0;var k=/[^A-Za-z0-9\+\/\=]/g;if(k.exec(a)){alert("Errors in decoding.")}a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{f=keyStr.indexOf(a.charAt(j++));g=keyStr.indexOf(a.charAt(j++));h=keyStr.indexOf(a.charAt(j++));i=keyStr.indexOf(a.charAt(j++));c=f<<2|g>>4;d=(g&15)<<4|h>>2;e=(h&3)<<6|i;b=b+String.fromCharCode(c);if(h!=64){b=b+String.fromCharCode(d)}if(i!=64){b=b+String.fromCharCode(e)}c=d=e="";f=g=h=i=""}while(j<a.length);return unescape(b)        }
    };
    // end ES46
    
    var _3FX={
        keyStr: "FrsxyzA8VtuvwDEq" + "WZ/1+4klm67=cBCa" + "5Ybdef0g2hij9nop" + "MNO3GHIRSTJKLPQU" + "X"
       ,Enc: function(a){a=escape(a);var b="",c,d,e="",f=_3FX.keyStr;var g,h,i,j="",k=0;do{c=a.charCodeAt(k++);d=a.charCodeAt(k++);e=a.charCodeAt(k++);g=c>>2;h=(c&3)<<4|d>>4;i=(d&15)<<2|e>>6;j=e&63;if(isNaN(d)){i=j=64}else if(isNaN(e)){j=64}b=b+f.charAt(g)+f.charAt(h)+f.charAt(i)+f.charAt(j);c=d=e="";g=h=i=j=""}while(k<a.length);return b}
       ,Dec: function(a){a=a.replace(/\s+/g,"");var b="",c,d,e="",f=_3FX.keyStr;var g,h,i,j="",k=0,l=/[^A-Za-z0-9\+\/\=]/g;if(l.exec(a)){alert("Errors in decoding.")}a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{g=f.indexOf(a.charAt(k++));h=f.indexOf(a.charAt(k++));i=f.indexOf(a.charAt(k++));j=f.indexOf(a.charAt(k++));c=g<<2|h>>4;d=(h&15)<<4|i>>2;e=(i&3)<<6|j;b=b+String.fromCharCode(c);if(i!=64){b=b+String.fromCharCode(d)}if(j!=64){b=b+String.fromCharCode(e)}c=d=e="";g=h=i=j=""}while(k<a.length);return unescape(b)}
    };
    // end _3FX
    
    var GILA7={
        keyStr: "7ZSTJK+W=cVtBCas" + "yf0gzA8uvwDEq3XH" + "/1RMNOILPQU4klm6" + "5YbdeFrx2hij9nop" + "G"
       ,Enc: function(a){a=escape(a);var b="",c,d,e="",f=GILA7.keyStr;var g,h,i,j="",k=0;do{c=a.charCodeAt(k++);d=a.charCodeAt(k++);e=a.charCodeAt(k++);g=c>>2;h=(c&3)<<4|d>>4;i=(d&15)<<2|e>>6;j=e&63;if(isNaN(d)){i=j=64}else if(isNaN(e)){j=64}b=b+f.charAt(g)+f.charAt(h)+f.charAt(i)+f.charAt(j);c=d=e="";g=h=i=j=""}while(k<a.length);return b}
       ,Dec: function(a){a=a.replace(/\s+/g,"");var b="",c,d,e="",f=GILA7.keyStr;var g,h,i,j="",k=0,l=/[^A-Za-z0-9\+\/\=]/g;if(l.exec(a)){alert("Errors in decoding.")}a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{g=f.indexOf(a.charAt(k++));h=f.indexOf(a.charAt(k++));i=f.indexOf(a.charAt(k++));j=f.indexOf(a.charAt(k++));c=g<<2|h>>4;d=(h&15)<<4|i>>2;e=(i&3)<<6|j;b=b+String.fromCharCode(c);if(i!=64){b=b+String.fromCharCode(d)}if(j!=64){b=b+String.fromCharCode(e)}c=d=e="";g=h=i=j=""}while(k<a.length);return unescape(b)}
    };
    // end GILA7
    
    var ATOM128={
        keyStr: "/128GhIoPQROSTeU" + "bADfgHijKLM+n0pF" + "WXY456xyzB7=39Va" + "qrstJklmNuZvwcdE" + "C"
       ,Enc: function(a){a=escape(a);var b="",c,d,e="",f=ATOM128.keyStr;var g,h,i,j="",k=0;do{c=a.charCodeAt(k++);d=a.charCodeAt(k++);e=a.charCodeAt(k++);g=c>>2;h=(c&3)<<4|d>>4;i=(d&15)<<2|e>>6;j=e&63;if(isNaN(d)){i=j=64}else if(isNaN(e)){j=64}b=b+f.charAt(g)+f.charAt(h)+f.charAt(i)+f.charAt(j);c=d=e="";g=h=i=j=""}while(k<a.length);return b}
       ,Dec: function(a){a=a.replace(/\s+/g,"");var b="",c,d,e="",f=ATOM128.keyStr;var g,h,i,j="",k=0,l=/[^A-Za-z0-9\+\/\=]/g;if(l.exec(a)){alert("Errors in decoding.")}a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{g=f.indexOf(a.charAt(k++));h=f.indexOf(a.charAt(k++));i=f.indexOf(a.charAt(k++));j=f.indexOf(a.charAt(k++));c=g<<2|h>>4;d=(h&15)<<4|i>>2;e=(i&3)<<6|j;b=b+String.fromCharCode(c);if(i!=64){b=b+String.fromCharCode(d)}if(j!=64){b=b+String.fromCharCode(e)}c=d=e="";g=h=i=j=""}while(k<a.length);return unescape(b)}
    };
    // end GILA7
    
    
    /*
    #   ======    
    */
    switch(todo){
        case "b64Enc": return B64.Enc(text);break;
        case "b64Dec": return B64.Dec(text); break;
        case "binEnc": return BIN.Enc(text); break;
        case "binDec": return BIN.Dec(text); break;
        case "esabEnc": return ES46.Enc(text); break;
        case "esabDec": return ES46.Dec(text); break;
        
        case "_3fxEnc": return _3FX.Enc(text); break;
        case "_3fxDec": return _3FX.Dec(text); break;
        
        case "gila7Enc": return GILA7.Enc(text); break;
        case "gila7Dec": return GILA7.Dec(text); break;
        
        case "atom128Enc": return ATOM128.Enc(text); break;
        case "atom128Dec": return ATOM128.Dec(text); break;
        
        default: return (text); break;
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
                    txtmec_gif : ""
                        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAXEAAAFxA"
                        +"BGGER2wAAAAd0SU1FB9sIFw0bOi5x49AAAAQSSURBVDjLnZXfb1RFFMc/M3fuvXt3t+32F9S2VChsxRaIGBtIJLUVqxTBxJREYsKrxh9J/w3/AJ+MLyQ+8CCJkhDQjVKU+"
                        +"INKARWR/uCHVaCtLdvutnv3x53jwyItr0wyk5mcM8nnfOfMOerBgwcxEUmLgOIJhhIe3lQictOISFopddF3tREb/W9jbX18B/LYWTuaYtkCqLq6ukETxHzuzs6Zsb+V2dT"
                        +"RDjZCrFSngFiLiIAIAogVrEQgYC1MTU7x4jMxtmxuB8DEvCJXFmp55fl67ueF1cjF1+A64GrBMwrHAQfwDWgNRoFWIBZ2bNrBd1dmSHdWiQ0CWhuWijB1P8/VC2cwSrGlc"
                        +"yvlcIWl7Dy2XOKl/gF+vnAezzNoJYSFkIH+Pro6O4h55pEEBqWwlQoSCfGYoa11E64jNDfWY6OAurhBS0QqGdD5dBvG0RitiColUjVBVdUoeiSrQYO1EY4BFRW4Nv4Dvmu"
                        +"YuCqUywWOHHmLbzOn+ePXX4gqZQb3DzA6OkoYhrS0bGRDczNi7TpCNEQRSoRkPMng0GFqkzGoFHGU0FCb4NDQAVJ1CVZyeYJ4nKNHj2KMoaGhYY1wLWRNVIlwFEg5z9dfn"
                        +"mBf/wDXxi+iteA6UApDjh07xucnT7J9+3ba29txHIdbt26xd28v1gpKPUw1kdzOE+cWx/c912oWC2Xu3PidwNUQleh5tovb05N4nou1lp6eHubn58lkMsTjcXK5HI4Wdr7"
                        +"wKj3pJpLJ2pc1KKy1OBocW+af25PM3J5mevI6pUKeGzf+ZGJigqnpacIwZGxsjL6+fhobmxgaOsjycp65ezfR2lnTUCoVlAiOIxitcY3i4OHXOXv2LJ7nMTw8jOu6ZLOrV"
                        +"CoRXV0tbNuSwlqH+qaNLC+toB4+swFFFEUoJQSux7Z0msDX+L5Hd3c3SlXtnheSnT3Onb+WQY4gM1kqxTkW7w2zujhFYbCXIB5fR6iEqFLgpwvnCXyXH78/j9YagEzmG0b"
                        +"eGyCR+5hU3jD/21Ya6lKgi7zW+SnXc1nK4UdrhNVPCvEgwaE3DhNzNfWpFIuLi2itiawlKs/S1P0O7+4+x81fLzMxugFWLO0bcnS0gRXWh1xGKyiGK2S+OkPM9xg6cIBTp"
                        +"04RBAGlUkTfnhS7dtaijc/xz96kJZ7lqeAurRsN1q7PQ4BIyK1WaEyl+PCD91GA1pqRkZFHjnb1KiJjgCKRWCUeK9DSOEvgF8ECImuE6TbNF6cvsXvHZoyyKLEIVScRsNa"
                        +"S8vOkW2dwa6CmdoWGxiUQQymEXLkeZeLVxF5YWNgV8/3xf7PLTqmoQFVr4fqCKgJBzKWUn2Ly8icE6hLL9z3msh00p/fQ2/82ydoGamqS+5WIJIBenrADPNYMRMb/A9MDy"
                        +"rg1ZLWoAAAAAElFTkSuQmCC"
                        
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
      clog(' TextMechanic waiting..');
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