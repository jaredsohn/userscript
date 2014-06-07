// ==UserScript==
// @name          QR-Plugins.TextFliper
// @namespace     http://userscripts.org/scripts/show/111440
// @include        *.kaskus.co.id/thread/*
// @include        *.kaskus.co.id/lastpost/*
// @include        *.kaskus.co.id/post/*
// @include        *.kaskus.co.id/group/discussion/*
// @include        *.kaskus.co.id/show_post/*
// @version       0.2
// @dtversion     1210300002
// @timestamp     1351547543977
// @qrversion     4.0.9
// @description   plugins for Kaskus-QR TextFliper generator
// @author        tuxie.forte;
// @license       (CC) by-nc-sa 3.0
//
// -!--latestupdate
//
// v0.2 - 2012-10-30
//  include new-kaskus (co.id)
//
// v0.1 - 2011-08-27
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
        'UpDown' : 'Flip Upside Down'
       ,'FlipWord' : 'Flip Wording'
       ,'FlipText' : 'Flip Text'
       ,'RevWord' : 'Reverse Ea(Word)'
    };    
    if( par ){
        // this span container needed if we have to wrap popup menu with absolute position
        span = createEl('span', {style:'display:inline-block'});
        Dom.add(span, par);
        
        inp = createEl('img', {id:'btn_txtflip', 'src':gvar.B.txtflip_gif, style:'vertical-align:bottom;', alt:'[txtflip]', title:'Text Flip Generator'});
        _o('click', inp, function(e){return toggle_txtflip_menu(e)} );
        Dom.add(inp, span);        
        
        // fake input for lost focus (blured)
        inp = createEl('input', {id:'txtflip_fake_focus', 'value':'', style:'border:0; width:0; position:absolute; margin:-99px 0 0 -99999px;'});
        _o('blur', inp, function(e){ var c=gID('popup_txtflip_menu'); if(c) window.setTimeout(function() { gID('popup_txtflip_menu').style.display='none' }, 500); });
        Dom.add(inp, span);
        
        divs = createEl('div', {id:'popup_txtflip_menu', 'class':'vbmenu_popup', 'style':'width:110px; overflow:hidden; display:none;'});
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
    
    var endFocus=function(){ _TEXT.focus(); return false};
    var selected = _TEXT.getSelectedText(), todo = e.getAttribute('rel'), ret='', prehead, text;
    
    text=(selected!= '' ? selected : prompt('Please enter Text to Flip:', 'text flipper') );
    if(text==null) return endFocus();
    
    ret = textFlip(text, todo);
    if(!ret) return endFocus();
    prehead = [0, ret.length];
    if(selected=='')
        _TEXT.setValue( ret, prehead );
    else
        _TEXT.replaceSelected( ret, prehead );
}

function toggle_txtflip_menu(e){
    e=e.target||e;
    var tgt = gID('popup_txtflip_menu'), showed=(tgt.style.display!='none');
    tgt.style.display=(showed ? 'none' : '');
    
    if(!showed && gID('txtflip_fake_focus')) 
        window.setTimeout(function() { gID('txtflip_fake_focus').focus() }, 200);
}


/*=========
# Both main functionality
# >Reverse Text Generator
# Copyright 2011 TextMechanic.com All Rights Reserved
# sources: http://textmechanic.com
# ========= 
*/
function textFlip(text, todo){
    
    var MISC={
        getTable: function(){var fT = {a: '\u0250',b: 'q',c: '\u0254',d: 'p',e: '\u01DD',f: '\u025F',g: '\u0183',h: '\u0265',i: '\u0131',j: '\u027E',k: '\u029E',l: '\u05DF',m: '\u026F',n: 'u',r: '\u0279',t:'\u0287',v: '\u028C',w: '\u028D',y: '\u028E','.': '\u02D9','[': ']','(': ')','{': '}','?': '\u00BF','!': '\u00A1',"\'": ',','<': '>','_': '\u203E','"': '\u201E','\\': '\\',';':'\u061B','\u203F': '\u2040','\u2045': '\u2046','\u2234': '\u2235'};for(i in fT)fT[ fT[i] ]=i;return fT}
       
       ,_swapcase: function(a){var b=a.length,c,d,e,f,g;var h,i="ABCDEFGHIJKLMNOPQRSTUVWXYZ",j="abcdefghijklmnopqrstuvwxyz";e=a.split("");h=e.length;c=e[0];d=e[h-1];f=i.indexOf(c)==-1?0:1;g=j.indexOf(d)==-1?0:1;if(f+g==2){a=a.split("");a=a.slice(1,b-1);a.unshift(c.toLowerCase());a.push(d.toUpperCase());a=a.join("")}return a}
    };
    
    var PROC={
        do_UpDown: function(text){
            var result=text, overload;
            text = text.replace(/\r\n/gi, '\n');
            var len = text.split('').length;
            if (len > 50001){ 
                overload = confirm("WARNING: You have entered over 50,000 characters of text which could slow down or even lock-up your computer! Please click \"Cancel\" to stop flip text upside down or click \"OK\" to proceed with flip text upside down at your own risk.");
                if(!overload)  return false;
            } else result = PROC.flipString(text.toLowerCase());
            return result;
        }
       ,flipString: function(a){var b=a.length-1,c=new Array(a.length),d,e;var f=MISC.getTable();for(var g=b;g>=0;--g){d=a.charAt(g);e=f[d];c[b-g]=e!=undefined?e:d}return c.join("")}
       
       
       ,do_FlipWord: function(text){ return PROC.flipwords(text) }
       ,flipwords: function(a){a=a.replace(/\r\n/g,"\n");a=a.replace(/\./g,"  .  ");a=a.replace(/\,/g,"  ,  ");a=a.replace(/\?/g,"  ?  ");a=a.replace(/\!/g,"  !  ");a=a.replace(/\:/g,"  :  ");a=a.replace(/\;/g,"  ;  ");a=a.replace(/\(/g,"  (  ");a=a.replace(/\)/g,"  )  ");a=a.replace(/\[/g,"  [  ");a=a.replace(/\]/g,"  ]  ");a=a.replace(/\{/g,"  {  ");a=a.replace(/\}/g,"  }  ");a=a.replace(/\</g,"  <  ");a=a.replace(/\>/g,"  >  ");a=a.replace(/\"/g,' " ');a=a.replace(/\|/g," | ");a=a.split("\n").reverse().join("\n");a=a.replace(/\n/g," \n ").split(" ").reverse().join(" ").replace(/ \n /g,"\n");a=a.replace(/  \.  /g,".");a=a.replace(/  \,  /g,",");a=a.replace(/  \?  /g,"?");a=a.replace(/  \!  /g,"!");a=a.replace(/  \:  /g,":");a=a.replace(/  \;  /g,";");a=a.replace(/  \(  /g,")");a=a.replace(/  \)  /g,"(");a=a.replace(/  \[  /g,"]");a=a.replace(/  \]  /g,"[");a=a.replace(/  \{  /g,"}");a=a.replace(/  \}  /g,"{");a=a.replace(/  \<  /g,">");a=a.replace(/  \>  /g,"<");a=a.replace(/ \" /g,'"');a=a.replace(/ \| /g,"|");return a}
       
       
       ,do_FlipText: function(text){ return PROC.fliptext(text) }
       ,fliptext: function(a){a=a.replace(/\r\n/g,"\n");a=a.replace(/\(/g,"  (  ");a=a.replace(/\)/g,"  )  ");a=a.replace(/\[/g,"  [  ");a=a.replace(/\]/g,"  ]  ");a=a.replace(/\{/g,"  {  ");a=a.replace(/\}/g,"  }  ");a=a.replace(/\</g,"  <  ");a=a.replace(/\>/g,"  >  ");a=a.split("\n").reverse().join("\n");a=a.split("").reverse().join("");a=a.replace(/  \(  /g,")");a=a.replace(/  \)  /g,"(");a=a.replace(/  \[  /g,"]");a=a.replace(/  \]  /g,"[");a=a.replace(/  \{  /g,"}");a=a.replace(/  \}  /g,"{");a=a.replace(/  \<  /g,">");a=a.replace(/  \>  /g,"<");return a}
      
      
       ,do_RevWord: function(text){ return PROC.reversewordletters(text) }
       ,reversewordletters: function(a){a=a.replace(/\r\n/g,"\n");a=a.replace(/\./g," . ");a=a.replace(/\,/g," , ");a=a.replace(/\?/g," ? ");a=a.replace(/\!/g," ! ");a=a.replace(/\:/g," : ");a=a.replace(/\;/g," ; ");a=a.replace(/\(/g," ( ");a=a.replace(/\)/g," ) ");a=a.replace(/\[/g," [ ");a=a.replace(/\]/g," ] ");a=a.replace(/\{/g," { ");a=a.replace(/\}/g," } ");a=a.replace(/\</g," < ");a=a.replace(/\>/g," > ");a=a.replace(/\'/g," ' ");a=a.replace(/\"/g,' " ');a=a.replace(/\%/g," % ");a=a.replace(/\$/g," $ ");a=a.replace(/\#/g," # ");a=a.replace(/\@/g," @ ");a=a.replace(/\*/g," * ");a=a.replace(/\+/g," + ");a=a.replace(/\-/g," - ");a=a.replace(/\=/g," = ");a=a.replace(/\_/g," _ ");a=a.replace(/\|/g," | ");a=a.replace(/\&/g," & ");a=a.replace(/\//g," / ");a=a.replace(/\\/g," \\ ");a=a.replace(/\n/g," \n ");a=a.split(" ");var b=a.length,c=[],d;for(var e=0;e<b;e++){d=MISC._swapcase(a[e]);d=d.split("").reverse().join("");c[e]=d}a=c.join(" ");a=a.replace(/ \n /g,"\n");a=a.replace(/ \. /g,".");a=a.replace(/ \, /g,",");a=a.replace(/ \? /g,"?");a=a.replace(/ \! /g,"!");a=a.replace(/ \: /g,":");a=a.replace(/ \; /g,";");a=a.replace(/ \( /g,"(");a=a.replace(/ \) /g,")");a=a.replace(/ \[ /g,"[");a=a.replace(/ \] /g,"]");a=a.replace(/ \{ /g,"{");a=a.replace(/ \} /g,"}");a=a.replace(/ \< /g,"<");a=a.replace(/ \> /g,">");a=a.replace(/ \' /g,"'");a=a.replace(/ \" /g,'"');a=a.replace(/ \% /g,"%");a=a.replace(/ \$ /g,"$");a=a.replace(/ \# /g,"#");a=a.replace(/ \@ /g,"@");a=a.replace(/ \* /g,"*");a=a.replace(/ \+ /g,"+");a=a.replace(/ \- /g,"-");a=a.replace(/ \= /g,"=");a=a.replace(/ \_ /g,"_");a=a.replace(/ \| /g,"|");a=a.replace(/ \& /g,"&");a=a.replace(/ \/ /g,"/");a=a.replace(/ \\ /g,"\\");return a}
    }
    // end PROC
    
    /*
        'UpDown' : 'Flip Upside Down'
       ,'FlipWord' : 'Flip Wording'
       ,'FlipText' : 'Flip Text'
       ,'RevWord' : 'Reverse Each Word'
    */
    switch(todo){
        case "UpDown":
            return PROC.do_UpDown(text);
        break;
        case "FlipWord":
            return PROC.do_FlipWord(text);
        break;
        case "FlipText":
            return PROC.do_FlipText(text);
        break;
        case "RevWord":
            return PROC.do_RevWord(text);
        break;
        default: 
            return text;
        break;
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
                        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIGhQ4Bccj+a4AAAIOSURBVDjL1ZTNTuswEIVPGhcSmiqw4QVZ8xY8BmLLgh0rXgSWbKqqCNEfQpPYidPvrmzRm8vdcyRL47/jmTMzln4TODs7QxJpmiIpjul0iiQuLi7i2mw2QxLn5+dhbUwI0DQNzjkA9vs9AO/v7wBYa6nr+mjv+fkZYExYliXDMNB1HUAkXSwW/I3dbhcfDxgRGmNo25bT09MYVlmWSGK73UaPJDGfz48kaZrm3yE75zgcDgAYY6InAW9vbwzDAMBkMjnaCySTYOR5LmOMkiRR0zTy3qsoCt3d3enl5UXee7Vtq4eHB1lrdTgc5L2XtfbnLAcMw0CY933P1dUVy+WS6+trhmHg8/OTy8vLIz1HbCcnJ7RtG0nyPGe73QLw+vqKJBaLRUyEpBh+VVWR0ASj6zplWSZAxhilaaokSSRJ6/VakmStVZ7nUY6u6yRJ8/lcIw2LopD3XkmSaLVaablcqixLSdLt7a1Wq5Xu7++12+202Wz09fWlLMuUZZnattU/y8Z7z8fHR9Syqipubm5iLT49PfH4+BiL3Hv/cx2GJDjncM4dHe77Ptqha/q+p67r2DkjtiRJYlIAptMpVVUBsNlscM6xXq9jIoqiAMB7j/f+Zw/Dhe/dkmUZaZoym82OuiSgrusxYZ7nsSRCGCHE8Mh+v8dai7U26vhfDcPHEDQL84Cg63dNgyy/55f+A7hO02wbgND6AAAAAElFTkSuQmCC"
                        
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
