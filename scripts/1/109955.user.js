// ==UserScript==
// @name          QR-Plugins.RainbowText
// @namespace     http://userscripts.org/users/315214
// @include        *.kaskus.co.id/thread/*
// @include        *.kaskus.co.id/lastpost/*
// @include        *.kaskus.co.id/post/*
// @include        *.kaskus.co.id/group/discussion/*
// @include        *.kaskus.co.id/show_post/*
// @version       0.6
// @dtversion     1210300006
// @timestamp     1351547543977
// @qrversion     4.0.9
// @description   plugins for Kaskus-QR rainbowtext generator
// @author        tuxie.forte;
// @license       (CC) by-nc-sa 3.0
//
// -!--latestupdate
// v0.6 - 2012-10-30
//  include new-kaskus (co.id)
//
// v0.5 - 2011-09-03
//  improve literaly whitespaces
//
// v0.4 - 2011-08-23
//  fix adapting QR container
//
// v0.3 - 2011-08-19
//  fix whitespaces with transparent (dirty but safe)
//
// v0.2 - 2011-08-14
//  fix char with whitespaces
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
  var el, Attr, par = gID(gvar.qr_identity);

  if( par ){
    Attr = {'src':gvar.B.rainbow_gif, style:'vertical-align:bottom;', alt:'[rainbow]', title:'Wrap [Rainbow-COLOR] tags around selected text'};
    el = createEl('img',Attr);
    _o('click', el, function(e){return handleClick(e)} );

    Dom.add(el, par);
  }        
}
function handleClick(e){
  var vBText = _TEXT.init();
  if(!vBText) return;

  var endFocus = function(){ _TEXT.focus(); return false},
  selected = _TEXT.getSelectedText(), ret = '',
  text, prehead;

  text=(selected!= '' ? selected : prompt('Please enter Text to become rainbow:', 'pelangi pelangi') );
  if(text==null) return endFocus();

  ret = MakeSFX(text);
  prehead = [0, ret.length];
  if(selected=='')
    _TEXT.setValue( ret, prehead );
  else
    _TEXT.replaceSelected( ret, prehead );
}

/*=========
# rainbow functionality
# base code by umop ap!sdn
# sources: http://www.tektek.org/color
# ========= 
*/

function getSFXColor(a,g_cstyle){var b,c,d,e,f,g;if(g_cstyle==0){e=a;b=127+127*Math.cos(e-.5);c=127+127*Math.cos(e-2.5);d=127+127*Math.cos(e-4.5);f=b;if(c<f)f=c;if(d<f)f=d;b-=f;c-=f;d-=f;g=b;if(c>g)g=c;if(d>g)g=d;g=255/g;b*=g;c*=g;d*=g;var h=200;var i=255;g=h/255*(i/255);f=(255-i)*(h/255);b=b*g+f;c=c*g+f;d=d*g+f;if(b<0)b=0;if(c<0)c=0;if(d<0)d=0;if(b>255)b=255;if(c>255)c=255;if(d>255)d=255}if(g_cstyle==1){a-=Math.floor(a);b=r1+a*dr;c=g1+a*dg;d=b1+a*db}if(g_cstyle==2){a-=2*Math.floor(a/2);if(a<1){b=r1+a*dr;c=g1+a*dg;d=b1+a*db}if(a>=1){a-=2;b=r1-a*dr;c=g1-a*dg;d=b1-a*db}}if(g_cstyle==3){a-=3*Math.floor(a/3);if(a<1){b=r1+a*dr;c=g1+a*dg;d=b1+a*db}if(a>=1&&a<2){a-=1;b=r2+a*dr1;c=g2+a*dg1;d=b2+a*db1}if(a>=2){a-=2;b=r3+a*dr2;c=g3+a*dg2;d=b3+a*db2}}return {r:b,g:c,b:d}}
function tohex(a){var b,c;var d="";b=Math.floor(a%16);c=Math.floor(a/16);if(c<10){d=""+c}if(c>9){switch(c){case 10:d="A";break;case 11:d="B";break;case 12:d="C";break;case 13:d="D";break;case 14:d="E";break;case 15:d="F";break;default:d="X";break}}if(b<10){d=d+""+b}if(b>9){switch(b){case 10:d+="A";break;case 11:d+="B";break;case 12:d+="C";break;case 13:d+="D";break;case 14:d+="E";break;case 15:d+="F";break;default:d+="X";break}}return d}

function MakeSFX(inputString){
  var i, j, k, l, c;
  var x, scale, res=1;
  var oignumi = 0;
  var gradientType = "rainbow";

  var temp = new String("");
  var numreps = 1;

    // Initialize string variables
    var instr = trimStr(inputString);
    var outstr = new String("");
    var tempstr = new String("");    

    // Get the length and scale. For rainbows, the scale must be such that one cycle comes out to almost 2pi.
    j = instr.length;
    
    if (gradientType == "rainbow"){
      scale = Math.PI * (2 * eval(numreps) - .21) / j;
      g_cstyle = 0;
    }

    // Start the loop
    for (i=0; i<j; i++){

        // Determine the RGB values
        k = scale * i;

        c = getSFXColor(k,g_cstyle);
        // Convert to hexadecimal
        tempstr = tohex(c.r) + tohex(c.g) + tohex(c.b); 

        // Get the character to colorize
        temp = instr.charAt(i);

        // Is it a &; code?
        if (temp == "&"){

            // Search forward until either a semicolon, tag, or space is found
            for (l=i+1; l<j; l++){
              if (instr.charAt(l) == " ") break;
              if (instr.charAt(l) == "<") break;
              if (instr.charAt(l) == ">") break;
              if (instr.charAt(l) == ";") break;
            }   // for l

            // If it's a semicolon, then we have ourselves a character.
            if (instr.charAt(l) == ";")
            temp = instr.substr(i, l-i+1);
          }

        // perform BBCode output
        if (i % res == 0) { 
            // Is it a whitespace?
            outstr = outstr + (temp!= " " ? '[color=' + '#' + tempstr + ']' : temp);
            oignumi = 1; 
          }
          outstr = outstr + temp;

          if ((i+1) % res == 0) {
            outstr = outstr + (temp!=" " ? '[/color]' : ""); 
            oignumi = 0; 
          }
        // out_format = BBCode

        if (temp.length > 1) i += (temp.length - 1);
      }
      if (oignumi > 0)
        outstr = outstr + '[/color]';

      return outstr;
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
        rainbow_gif : ""
        +"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACx"
        +"MBAJqcGAAAAAd0SU1FB9sICxUyJwHLCg0AAALJSURBVDjL7ZRLa5x1HIWf/+WdeeeamaTjaNJKMl5DI1p6QWu76EaqQlFQqEgW4gUXbnTryg8gfgAF+wXciyAUC11oSE"
        +"K0iNpLyCSZTseZziTv5J339v+5cSMEcVvwLA+HZ3HgHPhfD54EdBsK25D/L3l1mLmuqDmhlcEjDo4K1IBMw58K7gK7RcXt40Lwr8ArBvtsxmMOLgic10XmpERLeTRwJB"
        +"LTIaQtIVsKrir4YQzt85AdClyFU6L4CM1lXUH5Z9j0T1MyTeqSEKVt+vEGTFaZzfYRMq4o+HINNt4D+QdwFV7L4BMzxcnyy+zPLGN5CEmK2iRGFRWkNpHQHjjULrr3Nc"
        +"H4expuzDULX5yAbwHs3509ngjv5lucrL9BWrqE6jZsekNp19MxByBaIQWr02Y+ny1VM9P8OLXDeZLRN7wY77C9An+cgltmFfIpfGoqXKy9jvGX9d6dWU9fj03xt7gedO"
        +"4/H/WHZ3KDvaV4ENdHfT2S+zqtFRsmbSy4MR0KyRYPuwh5x+OaeR8Wgc/L5yhOLbO/84QxV0dF9Xs0p9zgorPdN5XpX8jb0Wmno1Y2wea7ZqiDLJK5ZkbVd2F6m6PJNt"
        +"Oe4zvzAbxlyrw08zbx5Jx2a2JKG2HD+d3L99j6sBGOquW9YWQnY6wOFyre+Kw12m31K79Ml1TsNY9Imrsr3uQGGTG3LPCCV8d4TxLfrEi0OSxgxieM9F49FgTDbH395+"
        +"7Ozm4OlFtYeDRZeubpqfLgladUdaV3U/9oj83E8ew8oa0zFQWctQJHVJE7apooyomEScnqsKV10tSbmyuD3r2+yjK5DlLudLrHy5Vy+7npxWYaLAbj0pqX5CUzDTVSBf"
        +"GBhgW+Uhat8so5I8qJVaRVFD6D/uAgjhOdy/m/An4YTuYHg5HTyiuT1jKH1mIQ5Su0J0ZBwE+g5bPDJ3j4NKvqwX6nvwCqwTnwEVQ78QAAAABJRU5ErkJggg=="

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
      clog('waiting..');
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
/* Mod By Idx. */