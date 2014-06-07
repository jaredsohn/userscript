// ==UserScript==
// @name           Yahoo! Koprol-Fixer
// @namespace      http://userscripts.org/scripts/show/89654
// @include        http://koprol.com/*
// @include        http://*.koprol.com/*
// @vversion       v0.01
// @version        101004001
// @description    YKF, Enhance your surfing in Yahoo! Koprol
// @moded          idx (http://userscripts.org/users/idx)
// @license        (CC) by-nc-sa 3.0
//
// -!!latestupdate
// v0.01 - 2010-11-04
//  Init
// ==/UserScript==
//

/* - Copyright a/o Credit

All credits and copyright section in the script must be included in modifications or redistributions of this script.

Yahoo! Koprol-Fixer is customized from FFixer, by Vaughan Chandler.
Yahoo! Koprol-Fixer is mod By Idx.
 License: Creative Commons Attribution-Share Alike 3.0 Unported License
 http://creativecommons.org/licenses/by-sa/3.0/

Yahoo! Koprol is Copyright (c) 2010 Yahoo! Southeast Asia Pte. Ltd. or PT Yahoo! Indonesia.
Koprol-Fixer is not related to or endorsed by Yahoo Inc. in any way.

#-=-#

FFixer is Copyright (c) 2010, Vaughan Chandler
FFixer is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://creativecommons.org/licenses/by-sa/3.0/

Facebook is a registered trademark of Facebook, Inc.
FFixer is not related to or endorsed by Facebook, Inc. in any way.
*/
 
(function() {
// Initialize Global Variables
var gvar=function() {}
 
gvar.sversion = 'v' + '0.01';
 
//========-=-=-=-=--=========
gvar.__DEBUG__ = true; // gedebug
//========-=-=-=-=--=========
 
function init(){
  // gvar initialized - 
  gvar.hidePopupPicTimeout;
  gvar.showPopupPicTimeout;
  
  gvar.prefs = {
     'PopupPosition' : 'auto'
    ,'DelayPopupPics' : '1'
    ,'DelayPopupPicsTimeout' : '500'
    ,'sidebarFixed' : '1'
    ,'menubarFixed' : '1'
  }; 
  
  // let's roll
  start_Main();
}
 
function start_Main(){
  
  // init load div layer for popup
  loadStyle();
  loadPopup();
  
  Dom.Ev($('#kf-popup-pic-div'), 'mouseover', function(e) { 
    window.clearTimeout(gvar.hidePopupPicTimeout); 
  });
  Dom.Ev($('#kf-popup-pic-div'), 'mouseout', function(e) {
  	var r = e.relatedTarget;
  	if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
  		while (r.parentNode && r.id!='kf-popup-pic-div') { r = r.parentNode; }
  		if (r.id!='kf-popup-pic-div') { $('#kf-popup-pic-div').style.display = 'none'; }
  	}
  });
	
  Dom.Ev(window, 'mouseover', function(e) {
    if (!e.shiftKey && !e.ctrlKey && !e.altKey) { showPopupPic(e); } 
  });
  
}
 
 
 
function showPopupPic(e){
   var picRegex = /(https?:\/\/((koprol\.zenfs\.com\/system\/(?:mugshots|pictures)).*?(\/[\d\/]+(?:[^\.]+)))\.(?:[^\"\?]+))/i; 
   var t=e.target||e;
   if(t.tagName!='IMG') { return; }
   
   var oldSrc, newSrc, profileLink;
   if (t.tagName == 'IMG' && picRegex.test(t.src)) { oldSrc = t.src + '#1'; }
   
   // mouseover on popup it self
   if( oldSrc && oldSrc.indexOf('#1#1')!=-1 ) { return; }
   
   if (oldSrc || newSrc) {
        if (!newSrc) {		   
           newSrc = oldSrc.replace(/_thumb\./, ".");
        }
         // need some condition ? later...
        
        window.clearTimeout(gvar.hidePopupPicTimeout);
        Dom.remEv(t, 'mouseout', function(e){hidePopupPic(e)});
        Dom.Ev(t, 'mouseout', function(e){hidePopupPic(e)});
        if (t.parentNode.href) { profileLink = t.parentNode.href; }
                  
        gvar.showPopupPicTimeout = window.setTimeout(function(){
          $('#kf-popup-pic-image').innerHTML = '<a href="' + profileLink + '"><img id="" src="' + newSrc + '" alt="KFixer - Loading Pic" style="max-height:' + (window.innerHeight-35) + 'px;"/></a>';
          $('#kf-popup-pic-div').style.display = 'block';
          $('#kf-popup-pic-div').className = 'kpfPopup kf-popup-pic-div-' + (gvar.prefs['PopupPosition'] == 'auto' ? (e.pageX>document.body.clientWidth/2 ? 'left' : 'right') : gvar.prefs['PopupPosition']);
        }, gvar.prefs['DelayPopupPics'] ? gvar.prefs['DelayPopupPicsTimeout'] : 0);

   }
}
 
function hidePopupPic(e) {
    if (gvar.prefs['DelayPopupPics']) { window.clearTimeout(gvar.showPopupPicTimeout); }
    if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
        gvar.hidePopupPicTimeout = window.setTimeout(function() { document.getElementById('kf-popup-pic-div').style.display = 'none'; }, 300);
    }
}
 
function loadPopup(){
  var el = createEl('div', {id:'kf-popup-pic-div', 'class':'kpfPopup kf-popup-pic-div-'}, '<div id="kf-popup-pic-close" title="close">x</div><div id="kf-popup-pic-image"><span></span></div>');
  try{
    Dom.add(el, document.body);
    Dom.Ev($('#kf-popup-pic-close'), 'click',  function(){ $('#kf-popup-pic-div').style.display='none'; });
  }catch(x){
    var kpDivAdder = setInterval(function() {
        try {
            Dom.add(el, document.body.lastChild.nextSibling);
            Dom.Ev($('#kf-popup-pic-close'), 'click',  function(){ $('#kf-popup-pic-div').style.display='none'; });
            if ($('#kf-popup-pic-div')) { clearInterval(kpDivAdder); }
        } catch(x2) { clog('CSS', x);  }
    }, 100);
  }
}
 
function loadStyle(){
  var whoFixed = (gvar.prefs['sidebarFixed'] ? '#sidebar':'');
  whoFixed += (whoFixed!=''?',':'') + (gvar.prefs['menubarFixed'] ? '#menubar':'#kf-foo-bar-null-element');  
   
  if(gvar.prefs['menubarFixed']){
  
    var el = createEl('div',{id:"kf_dummy_menubar",style:'height:25px;'},'');
	$('#menubar').parentNode.insertBefore(el, $('#menubar').nextSibling);
	addStyle(
	  '\n\n'
	 +'#menubar {width:960px;border-bottom:0;}'
	 +'#navutil {margin:0;padding:0;background:url(http://'+'i55.tinypic.com/11vto1t.png) repeat-x; '
	  +'-moz-border-radius:1px 1px 10px 10px ; -webkit-border-radius:1px 1px 10px 10px; '
	  +'-khtml-border-radius:1px 1px 10px 10px; border-radius:1px 1px 10px 10px; '
	  +'-moz-box-shadow: 1px 1px 3px #292929; -webkit-box-shadow: 1px 1px 3px #292929; box-shadow: 1px 1px 3px #292929;}'
	 +'#sidebar {background:transparent;}'
	 +'#header {height: 75px; background: url(http://'+'l.yimg.com/on/images/maintop.png) no-repeat center bottom;'
	  +'clear:both; background-position:-180px bottom;margin-left:180px;}'
	);  
  }
  
  addStyle(
     '\n\n'
    + whoFixed + '{ position:fixed; }'
    +'.kpfPopup { padding:10px; background:#f6f6f6; border:3px double #666666; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px; }'
    +'.kpfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'
    +'#kf-popup-pic-div { display:none; background:white; border:1px solid #333; position:fixed !important; top:3px !important; padding:4px; min-width:130px; z-index:99999 !important; -moz-border-radius:3px; -webkit-border-radius:3px; -khtml-border-radius:3px; border-radius:3px; }'
    +'.kf-popup-pic-div-left { left:3px !important; right:auto !important; -moz-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:5px 5px 5px rgba(0,0,0,0.6); box-shadow:5px 5px 5px rgba(0,0,0,0.6); }'
    +'.kf-popup-pic-div-right { right:3px !important; left:auto !important; -moz-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); box-shadow:-5px 5px 5px rgba(0,0,0,0.6); }'
    +'#kf-popup-pic-div img { max-height: ' + (window.innerHeight-35) + 'px; }'
    +'#kf-popup-pic-close { display:none; position:absolute; top:4px; right:10px; color:#ff9999; cursor:pointer; font-weight:bold; font-size:14px; }'
    +'#kf-popup-pic-div:hover #kf-popup-pic-close { display:block; }'
    +'#kf-popup-pic-close:hover { color:#aa6666; }'
    +'#kf-popup-pic-image { text-align:center; }'
    +'#kf-popup-pic-image img { color:#999999; display:block; }'
  );
}  // end loadStyle
 
// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function getTag(name, parent){
  var ret = (typeof(parent)!='object' ? document.getElementsByTagName(name) : parent.getElementsByTagName(name) );
  return (isDefined(ret[0]) ? ret : false);
}
function createEl(type, attrArray, html){
 var node = document.createElement(type);
 for (var attr in attrArray) 
   if (attrArray.hasOwnProperty(attr))
    node.setAttribute(attr, attrArray[attr]);
 if(html) node.innerHTML = html;
   return node;
}
function addStyle(css) {
    if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
    else if (heads = document.getElementsByTagName('head')) {
        var style = document.createElement('style');
        try { style.innerHTML = css; }
        catch(x) { style.innerText = css; }
        style.type = 'text/css';
        heads[0].appendChild(style);
    }
}
// ----my ge-debug--------
function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
}
function clog(t,m) {
  if(!gvar.__DEBUG__) return;
  show_alert('::'+t+'::\n'+m);
}
 
/*
# Global VAR
*/
// Get Elements
$=function (q, root, single) {
  if (root && typeof root == 'string') {
      root = $(root, null, true);
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
// utk add - remove - event element
Dom = {
  g: function(el) {
   if(!el) return false;
   return ( isString(el) ? document.getElementById(el) : el );
  }
 ,add: function(el, dest, pos) {    
    var el = this.g(el);
    var dest = this.g(dest);
    if(el && dest) {
	  if(isDefined(pos) && typeof(pos)=='string' && pos[0]=='before')
	    dest.insertBefore(el, dest, pos[1]);
	  else
	    dest.appendChild(el);
	}
  }
 ,remove: function(el) {
    var el = this.g(el);
    if(el && el.parentNode)
      el.parentNode.removeChild(el);
  }
 ,Ev: function() {
    if (window.addEventListener) {
      return function(el, type, fn) {
        if(typeof(el)=='object')
         this.g(el).addEventListener(type, function(e){fn(e);}, false);
      };      
    }else if (window.attachEvent) {
      return function(el, type, fn) {
        var f = function() { fn.call(this.g(el), window.event); };
        this.g(el).attachEvent('on' + type, f);
      };
    }
  }()
 ,remEv: function() {
    if (window.removeEventListener) {
      return function(el, type, fn) {
        if(typeof(el)=='object')
         this.g(el).removeEventListener(type, function(e){fn(e);}, false);
      };      
    }
  }()
};
 
 
// ------
init();
// ------
 
})();
/* Mod By Idx. */
