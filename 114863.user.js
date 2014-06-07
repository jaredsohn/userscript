// ==UserScript==
// @name          500pxbook
// @namespace     http://userscripts.org/scripts/show/114863
// @version       0.1
// @dtversion     111002001
// @timestamp     1317675839731
// @description   theater foto effects for 500px.com
// @author        idx(302101);
// @license       (CC) by-nc-sa 3.0
// @include       http://www.500px.com/*
// @include       http://500px.com/*
//
// -!--latestupdate
//
// v0.1.beta - 2011-10-06 . 1317325598136
// init
//
// -/!latestupdate---
// ==/UserScript==

(function(){

// Initialize Global Variables
var gvar=function() {};

/*
window.alert(new Date().getTime());
*/
//=-=-=-=--=
//========-=-=-=-=--=========
gvar.__DEBUG__ = false; // development debug
//========-=-=-=-=--=========
//=-=-=-=--=


// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return (typeof(x)=='string' && x ? x.replace(/^\s+|\s+$/g,"") : '') };
function isLink(x) { return x.match(/((?:http(?:s|)|ftp):\/\/)(?:\w|\W)+(?:\.)(?:\w|\W)+/); }

function _o(m,e,f){Dom.Ev(e,m,function(e){typeof(f)=='function'?f(e):void(0)});}
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
  var neocls = (Obj.className ? Obj.className : " ");
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
function showhide(obj, show){
  if(isUndefined(obj)) return;
  if(isUndefined(show)) show = (obj.style.display=='none'); // toggle mode
  obj.setAttribute('style','display:'+ (show ? '':'none') );
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
function cariParent(el, ndName, upto){
	if(typeof(el) != 'object') return false;
	for(var i=0; i<upto; i++){
		var el = el.parentNode;
		if(el.nodeName == ndName) break;
	}
	return el;
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
            clog('Reach 503, retrying...');
            window.setTimeout(GM_XHR.request(cdata,met,callback), 777);
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

//=== LITE BROWSER DETECTION / ADVANCED SETTING
//=============snipet-authored-by:GI-Joe==//
function ApiBrowserCheck() {
  var UA = window.navigator.userAgent;
  if(UA.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)){
	gvar.isMobile= true;
  }else{
	if(/(Opera)[\/\s](\d+\.\d+)/i.test(UA) && typeof(window.opera)!='undefined') {
		gvar.isOpera=true; gvar.infinite_scroll = false;
	}else if(/(Firefox)[\/\s](\d+\.\d+)/i.test(UA)){
		gvar.isFF=true;
	}else if(/(Chrome)[\/\s](\d+\.\d+)/i.test(UA)){
		gvar.isChrome=true;
	}  
  }  
  gvar.uaStr = RegExp.$1 + (!gvar.isMobile ? new Number( RegExp.$2 )  : '' );
  gvar.html5 = (history.pushState && history.replaceState);
  if (gvar.isChrome || gvar.isSafari || gvar.isOpera) {
        createHTMLDocumentByString = function(str) {
            if (document.documentElement.nodeName != 'HTML') {
                return new DOMParser().parseFromString(str, 'application/xhtml+xml')
            }
            // FIXME
            var html = str.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>|<\/?(?:i?frame|html|script|object)(?:[ \t\r\n][^<>]*)?>/gi, ' ')
            var htmlDoc = document.implementation.createHTMLDocument ?
                document.implementation.createHTMLDocument('apfc') :
                document.implementation.createDocument(null, 'html', null)
            var range = document.createRange()
            range.selectNodeContents(document.documentElement)
            htmlDoc.documentElement.appendChild(range.createContextualFragment(html))
            return htmlDoc
        }
    }
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

var rSRC = {
  getCSS: function(){
	return (''
	+'body.kfSnowBoxs{overflow:hidden;margin-right:16px;}'
	
	
	// twitter's button
    +'.twbtn{background:#ddd url("data:image/gif;base64,R0lGODlhCgBYAsQfAPPz8+vr6/7+/uHh4fn5+eXl5d7e3vv7++jn6Ofo5/j4+Ojo6d/g4Ofn59/g3+Pk5OPj4/f29vv7+vz7/ODf3/Dw8Pb29vv8+/z8/ODf4O/v7+fn5unp6N/f3+Dg4P///yH5BAEAAB8ALAAAAAAKAFgCAAX/oCCOZGmeIqau7OG6UiwdRG3fSqTs/G79wCDAMiwSiYCkUllpOp+aqHQa0FSvVmtgy+VyvoEvZxFeIBKLRQK93rg3hbf7UaAX6vQHZM/vD/6AgR6DhIUdBgaHHYuLiI6PkJEfk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLwijOz9DRLNMYEy8u1jAy2zM33gQ94TkR5OQW5UHpQElH7Evv8O9P8xVT9VL3U/pXW1ld/wABihko5kyDBAgaIFCTYEMDOQ7d3JlIEY+eBxgx9tm4J5DHAR4+hvSQoQMFDwwKzzFgtIiCA0aPDiGSGammJGY4c+rcybOnz59AgwodSrSo0aNIkypdyrRps2hQo0otoUIANRUTLhyYgOHAha4utIa9NkMGjAMxvEnAocBGW3A94O7QMW6ujwg/8ALRq+6HEXd+4wkeXGEJvcOH9SleLAWL44CQIwskGOZLmgVj0mQ+eDDhmYQNHoZ2M/oOHNMVU9/JmBGCRo4b//AZMPujx5CCcIMktLsDgwwOUHro4GAly+OJaM60yfyR0+fQo0ufTr269evYs2vfzr2791IhAAA7") repeat-x 0 -200px; '
	+'font:12px/15px Helvetica Neue,Arial,Sans-serif; width:auto; overflow:visible; padding:0; border-width:1px; border-style:solid; border-color:#999; border-bottom-color:#888; -moz-border-radius:5px; -khtml-border-radius:5px;-webkit-border-radius:5px;border-radius:5px; color:#333; cursor:pointer;line-height:10px!important;padding:5px 10px;font-size:16px;text-shadow:0 1px #F0F0F0;} .twbtn::-moz-focus-inner{padding:0;border:0} .twbtn:hover,.twbtn:focus, button.twbtn:hover, button.twbtn:focus{border-color:#999 #999 #888; background-position:0 -6px;color:#000; text-decoration:none} a.twbtn{text-decoration:none;color:#000080} .twbtn:active,.twbtn:focus, button.twbtn:active{background-image:none!important; outline:none} .twbtn-disabled{opacity:.6; filter:alpha(opacity=60); background-image:none; cursor:default!important}'
	// infinite scroller
	+'.photo_paginate{display:none!important}'
	
	+'.hidPaging{display:none!important}'
	+'.stream-loading {padding-top:0;height:50px;text-align:center;margin-top:5px}'
	+'.stream-loading .spinner{display:block;height:32px;width:32px;background-image:url(https://twimg0-a.akamaihd.net/a/1317419607/phoenix/img/loader.gif);margin:20px auto 0 auto}'
	+'.btnmore {width:80%!important; margin-top:10px}'
	+''
	
	/* for facebook popup */ 
	// fbPhotoSnowbox replaced to kfSnowBox
	+'.kfSnowBox{background-color:rgba(252, 252, 252, .75);bottom:0;left:0;overflow:scroll;overflow-x:hidden;position:fixed;right:0;top:0;z-index:101}'
	
	+'.kfSnowBox .container{background-color:#fff;box-shadow:0 0 1px rgba(0, 0, 0, .25), 0 1px 5px 3px rgba(0, 0, 0, .15), 0 5px 4px -3px rgba(0, 0, 0, .16);margin:9px auto 40px auto;max-width:960px;min-width:720px;padding:12px;width:920px}'
	+'.kfSnowBox .stageWrapper,.kfSnowBox .stagePagers{text-align:center;width:100%}'
	+'.kfSnowBox .stageWrapper{max-height:1024px;min-height:402px;height:100%;cursor:default;position:relative}'
	+'.kfSnowBox .stagePagers{height:51.1%;max-height:480px;min-height:201px}'	
	+'.kfSnowBox .stagePagers,.kfSnowBox .stage .stageWrapper img{user-select:none;-moz-user-select:-moz-none}'
	+'.kfSnowBox .stagePagers{cursor:pointer;left:0;position:absolute;top:0}'
	+'.kfSnowBox .stage{background:#f6f6f6;cursor:pointer;display:block;font-size:0;height:100%;max-height:1024px;min-height:402px;position:relative;text-align:center;width:100%}'
	+'.kfSnowBox .stage img{display:inline-block;height:auto;image-rendering:optimizeQuality;max-height:100%;max-width:100%;vertical-align:middle;width:auto}'
	
	+'.kfSnowBox .closeTheater{position:absolute;right:6px;top:6px;z-index:2}'
	+'.kfSnowBox .photoInfoWrapper{display:none}'
	
	+'.uiCloseButton{cursor:pointer;display:-moz-inline-box;display:inline-block;margin:0;padding:0;zoom:1}'
	+'label.uiCloseButton{overflow:hidden}'
	+'.uiCloseButton input{cursor:pointer;opacity:0;outline:none;padding:18px}'
	+'.uiCloseButton{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/yA/r/4WSewcWboV8.png);background-repeat:no-repeat;height:15px;width:15px}'
	+'.uiCloseButton:hover,.uiCloseButton:focus{background-position:left -32px}'
	+'.uiCloseButton:active{background-position:left -48px}'
	+'.uiCloseButtonHuge{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/yj/r/ubIGOTIgUYc.png)}'
	
	+'.uiTooltip{position:relative}'
	+'.uiTooltipActive,.uiTooltip:active,.uiTooltip:focus,.uiTooltip:hover{outline:none;text-decoration:none;z-index:5}'
	+'.uiTooltipActive .uiTooltipWrap,.uiTooltip:active .uiTooltipWrap,.uiTooltip:focus .uiTooltipWrap,.uiTooltip:hover .uiTooltipWrap{background:url(http://static.ak.fbcdn.net/rsrc.php/v1/y1/r/uVR6w3wRHEJ.gif) left bottom no-repeat;bottom:100%;display:block;left:0;padding:0 0 4px;position:absolute}'
	+'.uiTooltipWrap{display:none}'
	+'.uiTooltipWrap:hover{visibility:hidden}'
	+'.uiTooltipActive .bottom,.uiTooltip:active .bottom,.uiTooltip:focus .bottom,.uiTooltip:hover .bottom{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/yX/r/k2R_CZuPy2I.png);background-position:left top;bottom:auto;padding:4px 0 0;top:100%}'
	+'.uiTooltipActive .right,.uiTooltip:active .right,.uiTooltip:focus .right,.uiTooltip:hover .right{background-position:right bottom;left:auto;right:0}'
	+'.uiTooltipText{background-color:#282828;color:#fff !important;display:block;font-size: 11px;line-height:14px;padding:4px 8px;text-align:left}'
	+'.uiTooltipNoWrap{white-space:nowrap}'
	+'.uiTooltipActive .rightbottom,.uiTooltip:active .rightbottom,.uiTooltip:focus .rightbottom,.uiTooltip:hover .rightbottom{background-position:right top}'
	+''
	+'.uiButton{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/yn/r/zHNGLEeoCs0.png);background-repeat:no-repeat;background-position:0 -343px;background-color:#eee;border:1px solid #999;border-bottom-color:#888;box-shadow:0 1px 0 rgba(0, 0, 0, .1);cursor:pointer;display:-moz-inline-box;display:inline-block;font-size: 11px;font-weight:bold;line-height:normal !important;padding:2px 6px;text-align:center;text-decoration:none;vertical-align:top;white-space:nowrap}'
	+'.uiButton + .uiButton{margin-left:4px}'	
	+'.uiButton + .uiButton{margin-left:4px}'
	+'.uiButton:hover{text-decoration:none}'
	+'.uiButton:active{background:#ddd;border-bottom-color:#999;box-shadow:0 1px 0 rgba(0, 0, 0, .05)}'
	+'.uiButton .img{margin-top:2px;vertical-align:top}'
	+'.uiButton .uiButtonText,.uiButton input{background:none;border:0;color:#333;cursor:pointer;display:-moz-inline-box;display:inline-block;font-family:\'Lucida Grande\', Tahoma, Verdana, Arial, sans-serif;font-size: 11px;font-weight:bold;margin:0;outline:none;padding:1px 0 2px;white-space:nowrap}'
	+'.ff4.mac .uiButton .uiButtonText,.ff4.mac .uiButton input{margin-bottom:-1px}'
	+'.uiButton input::-moz-focus-inner{border:0;padding:0}'
	+''
	+''
	+'.kfSnowBox .uiButtonOverlay:active{box-shadow:0 0 1px rgba(0, 0, 0, .05), 0 0 2px rgba(0, 0, 0, .1), inset 0 1px 0 rgba(0, 0, 0, .08)}'
	+'.uiButtonOverlay,.uiButtonOverlay:hover{background-clip:padding-box;background-color:#fff;background-color:rgba(255, 255, 255, .8);background-image:none;border-color:#a5a5a5;border-color:rgba(0, 0, 0, .35);border-radius:2px}'
	+'.uiButtonOverlay:focus,.uiButtonOverlay:active{background-color:#f9fafc;background-color:rgba(249, 250, 252, .9);border-color:#3b5998;border-color:rgba(59, 89, 152, .5)}'
	+'.uiButtonNoText .img{margin-left:-1px;margin-right:-1px}'
	+'.kfSnowBox .arrowLeft a,.kfSnowBox .arrowRight a{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/yn/r/77uboGPzRks.png);background-position:10px 9px;background-repeat:no-repeat;cursor:pointer;height:30px;padding:0;width:31px}'
	+'.kfSnowBox .prev,.kfSnowBox .next{bottom:-40px;padding:30px;position:absolute}'
	+'.kfSnowBox .prev{left:-100px;}'
	+'.kfSnowBox .next{right:-100px;}'
	+'.kfSnowBox .arrowLeft a:hover,.kfSnowBox .arrowRight a:hover{border-color:#7489b6;border-color:rgba(59, 89, 152, .55)}'
	+'.kfSnowBox .arrowRight a{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/yi/r/KsODvVMV-0n.png)}'
	+'.kfSnowBox .arrowLeft a:hover{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/yC/r/B_qduFj1etl.png)}'
	+'.kfSnowBox .arrowRight a:hover{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/y-/r/lWUUm37r11D.png)}'
	+'.kfSnowBox .arrowLeft a:active{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/yL/r/U1-etAWzQ4t.png)}'
	+'.kfSnowBox .arrowRight a:active{background-image:url(http://static.ak.fbcdn.net/rsrc.php/v1/yj/r/wU__r0m45JU.png)}'
	+''
	+''
	
	
	// detailpoto ==
	+''
	+'.uiGrid{border:0;border-collapse:collapse;border-spacing:0}'
	+'.uiGrid .vTop{vertical-align:top}'
	+'.uiGrid .vMid{vertical-align:middle}'
	+'.uiGrid .vBot{vertical-align:bottom}'
	+'.uiGrid .hLeft{text-align:left}'
	+'.uiGrid .hCent{text-align:center}'
	+'.uiGrid .hRght{text-align:right}'
	
	+'.dataLoaded .photoInfoWrapper{display:block;padding:10px}'
	+'.fbxPhoto .fbPhotoContributorName{font-weight:bold;padding-top:1px;padding-bottom:3px;display:inline}'
	+'.fbxPhoto .fbPhotoDate{font-size:10px}'
	+'.fbxPhoto .fbPhotoDataCol{vertical-align:top;width:262px}'
	+'.fbxPhoto .fbPhotosPhotoActions{border-top:1px solid #e5e5e5}'
	+'.fbxPhoto .fbPhotoRemoveFromProfile,.fbxPhoto .fbPhotosMediaInfo,.fbxPhoto .fbPhotosPhotoActions a{padding-left:5px;padding-right:5px}'
	+'.fbPhotosMediaInfo{margin-top:5px}'
	+''
	+'.kfSnowBox .fbPhotoSnowboxInfo{background:#fff;height:75px;padding:20px 0;width:100%}'
	+'.dataLoading .fbPhotoSnowboxInfo{display:none}'
	+'.fbPhotoSnowboxInfo .fbPhotoUfiCol,.fbPhotoSnowboxInfo .fbPhotoDataCol,.fbPhotoSnowboxInfo .fbPhotoAdsCol{padding:0 0 10px}'
	+'.fbPhotoSnowboxInfo .fbPhotoUfiCol{width:60%;text-align:left}'
	+'.fbPhotoSnowboxInfo .fbPhotoDataCol{max-width:280px;width:33%}'
	+'.adsOnSide .fbPhotoSnowboxInfo .fbPhotoDataCol{max-width:170px;width:20%}'
	+'.fbPhotoSnowboxInfo .fbPhotosPhotoUfi{width:auto}'
	+'.kfSnowBox .fbPhotoSnowboxInfo .fbPhotoContributor{width:95%;max-width:515px;min-width:390px}'
	+'.fbPhotoSnowboxInfo .photoDetailsContainer{width:100%;max-width:280px;float:right}'
	+'.fbPhotoSnowboxInfo .ego_section{margin-bottom:0}'
	+'.fbPhotoSnowboxInfo .ego_section .uiHeader{display:none}'
	+'.fbPhotoSnowboxInfo .fbPhotoAdsCol .fbPhotoSnowboxAdsSide{display:none;float:right;width:170px}'

	+'.UIImageBlock_Content{display:table-cell;vertical-align:top;width:10000px}'
	+'.UIImageBlock_Image{float:left;margin-right:5px}'
	+'.UIImageBlock_Image .img,img.UIImageBlock_Image,i.UIImageBlock_Image{display:block}'
	+'.UIImageBlock_SMALL_Image{margin-right:8px}'
	+'.UIImageBlock_Entity .UIImageBlock_Content{height:50px;vertical-align:middle}'
	+'.UIImageBlock_Entity img.UIImageBlock_Image,.UIImageBlock_Entity i.UIImageBlock_Image,.UIImageBlock_Entity .UIImageBlock_Image .img{height:50px;width:50px}'
	+''
	+'.dataLoading .fbPhotoSnowboxInfo .fbPhotoUfiCol,.dataLoading .fbPhotoSnowboxInfo .fbPhotoDataCol{display:none}'
	+''
	+''
	+'.mtm{margin-top:5px}'
	+'.ptm{padding:5px}'
	+''
	+''
	);
  }
 ,getTPL_layer_FB: function(){
   return (''
   +'<a class="uiTooltip closeTheater" onmouseout="this.blur();" href="javascript:;"><label class="uiCloseButton uiCloseButtonHuge" for="u247351_53"><input title="" id="u247351_53" type="button"></label><span class="uiTooltipWrap bottom right rightbottom"><span class="uiTooltipText uiTooltipNoWrap">Press ESC to close</span></span></a>'
   +'<div id="tmp_next_img" style="display:none!important"></div>'
   
   +'<div style="width: 960px;" class="container" id="mcontainer"><div style="height: 100%;" class="stageWrapper">'
   
   +'<div style="height: 229px; position:absolute;" class="stagePagers " id="fbPhotoStagePagers">'
   +'<div class="prev arrowLeft"><a class="uiButton uiButtonOverlay uiButtonNoText" role="button" href="javascript:;" title="Previous"><span class="uiButtonText"></span></a></div><div class="next arrowRight"><a class="uiButton uiButtonOverlay uiButtonNoText" role="button" href="javascript:;" title="Next"><span class="uiButtonText"></span></a></div>'
   +'</div>' // #fbPhotoStagePagers
   
   +'<div style="" class="stage"></div>' // main image container
   +'</div>' // .stageWrapper 
   
   +'<div aria-busy="false" class="photoInfoWrapper">'
   +'<table class="uiGrid fbPhotoSnowboxInfo" cellpadding="0" cellspacing="0">'
   +'<tbody><tr>'
   +'<td class="vTop fbPhotoUfiCol">'
   +'<div class="photoUfiContainer">'
   + '<div class="UIImageBlock clearfix fbPhotoContributor">'
   + '<div class="UIImageBlock_Image UIImageBlock_SMALL_Image" id="fbPhotoSnowboxAuthorPic" tabindex="-1" aria-hidden="true"></div>'
   + '<div class="UIImageBlock_Content UIImageBlock_SMALL_Content" id="komeng">'
   +  '<div class="fbPhotoContributorName" id="fbPhotoSnowboxAuthorName"></div>'
   +  '<div class="fbPhotoTitle" id="fbPhotoSnowboxTitle"></div>'
   
   +  '<div class="fbPhotoNavi" id="fbPhotoSnowboxNavi">'
   +    '<span class="fbPhotoDate" id="fbPhotoSnowboxDate"></span>'
   +  '</div>'
   //+  'komeng'
   + '</div>' // .UIImageBlock_Content
   + '</div>' // .UIImageBlock
   +'</div>' // .photoUfiContainer
   +'</td>'
   +'<td class="vTop fbPhotoDataCol">'
   +'<div class="photoDetailsContainer">'
   + '<div class="fbPhotosMediaInfo" id="fbPhotoSnowboxMediaInfo">'
   +''
   //+'MediaInfo'
   +''
   + '</div>' // #fbPhotoSnowboxMediaInfo
   + '<div class="mtm ptm fbPhotosPhotoActions" id="fbPhotoSnowboxActions">'
   //+' -actions- '
   + '</div>' // #fbPhotoSnowboxActions
   +'</div>'
   +'</td>'
   +''
   +'</tr></tbody>'
   +'</table>'
   +'</div>' // .photoInfoWrapper
   +''
   +'</div>' // .container
   +''
   +''
   );
 }
  
}; // end rSRC

var HLP = {
	parselink: function(lnk, mode) {
		var ret='', part={};
		//var cucok = /https?\:\/\/s3\.amazonaws\.com\/photos\.500px\.net\/([^\/]+).([^\/]+).([^\?]+)/.exec(lnk);
		var cucok = /https?\:\/\/\w+\.cloudfront\.net\/((?:[\w]+\/){2})(\d)\.(.+)/i.exec(lnk);
		//if(!cucok) cucok = /https?\:\/\/s3\.amazonaws\.com\/photos\.500px\.net\/([^\/]+).([^\/]+).([^\?]+)/.exec(lnk);
		if(!cucok) cucok = /https?\:\/\/s3\.amazonaws\.com\/photos\.500px\.net\/((?:[^\/]+\/){2})(\d+)\.([^\W]+)/.exec(lnk);
		if(cucok){
			part["path"] = cucok[1]; part["pid"] = cucok[2]; part["ext"] = cucok[3];
			if(!mode) mode = 'max';
			switch(mode){
				case "ssmall": 	part["num"] = '1'; break;
				case "small": 	part["num"] = '2'; break;
				case "max": 	part["num"] = '4'; break;
			}
			//ret = gvar.cloud_domain + part["path"] + '\/' + part["pid"] + '\/' + part["nam"];
			ret = gvar.cloud_domain + part["path"] + part["num"] + '.' + part["ext"];
		}
		return ret;
	}
	,isImgLink: function(link){
		return (false
			|| /https?\:\/\/\w+\.cloudfront\.net\/([\w]+\/){2}(\d)\.(.+)/i.test(link)
			|| /https?\:\/\/s3\.amazonaws\.com\/photos\.500px\.net\/((?:[^\/]+\/){2})(\d+)\.([^\W]+)/.test(link)
		);
	}
	,findHref: function(e){
		if(e.nodeName=='A') return e.href;
		var mx = 5, i=0, nemu=false, par=e;
		while(!nemu && i<mx){
			par = par.parentNode;
			nemu = (par.nodeName=='A');
			i++;
		}
		return par.href;
	}
};

function init(){
	gvar.domain = location.host;
	gvar.cloud_domain= 'http\:\/\/djlhggipcyllo\.cloudfront\.net\/';
	
	//if( is_denied_url() ) return;		
	//--
	ApiBrowserCheck();
	//--	
	// place global style
	GM_addGlobalStyle( rSRC.getCSS() );
  
	gvar.clearLayer = false;
	
	gvar.infinite_scroll = true;
	gvar.max_stream_page = 10;
	
	startMain();
}

function click_photo(e){
	var tgt, els, parts, kufotolink=false;
	tgt=e.target||e;
	
	gvar.posColl = null;
	gvar.collections = [];
	
	if(tgt.className.indexOf('uiButton')!=-1){
		
		var par = tgt.parentNode, adt=0;
		adt = (par.className.indexOf('next')!=-1 ? 1 : -1);
		gvar.posColl = gvar.posColl + adt;		
		
		parts = par.getAttribute('rel');
		if(!parts) return;
		parts = parts.split(',');
		imgsrc = HLP.parselink(parts[1]);
		tgt = null;
		kika = 1;
	}else{
		els = getTag('img', tgt);
		imgsrc = HLP.parselink( tgt.src );
	}

	
	if(tgt){
		if( typeof(tgt.parentNode)=='string' )
			kufotolink = tgt.parentNode;
		else
			kufotolink = HLP.findHref( tgt );
	}else{
		kufotolink = parts[0];
	}

	if(!gvar.clearLayer && !$D('#kfSnowBox'))
		gvar.loc = { url: location.href, title:document.title };
		
	if(gvar.html5 && !gvar.isChrome){
		window.history.pushState(gvar.loc.url, gvar.loc.title,  gvar.loc.url);
		window.history.pushState(kufotolink, "new title", kufotolink);
		_o("popstate", window, function(e){
			Dom.remove($D('#kfSnowBox'));
			removeClass('kfSnowBoxs', document.body);
		});
	}
		
	// href, src, caller
	if(kufotolink)
		Layer.init( kufotolink, imgsrc, tgt );
	
	return do_an_e(e);
}

function startMain(){
	var leng, node, atr, para, obj={}, gotit=false
		,imgs = getTag('img');
	leng=imgs.length;
	if( leng ) for(var i=0; i<leng; i++){
		node = imgs[i];
		para = node.parentNode;		
		//if(!/s3\.amazonaws\.com\//i.test( node.src )) continue;
		//if( !/\w+\.cloudfront\.net\//i.test( node.src ) || !node.getAttribute('alt') ) continue;
		clog(node.src + ' : ' + HLP.isImgLink( node.src ) + '; alt='+node.getAttribute('alt') );
		if( !HLP.isImgLink( node.src ) || node.getAttribute('alt') ) continue;
		
		_o("click", para, function(e){ return click_photo(e) });
	}
	
	if(gvar.infinite_scroll)
		AutoLo.init();
}




// ==============infinite scroll============
function getElementPosition(elem) {
    var offsetTrail = elem
    var offsetLeft  = 0
    var offsetTop   = 0
    while (offsetTrail) {
        offsetLeft += offsetTrail.offsetLeft
        offsetTop  += offsetTrail.offsetTop
        offsetTrail = offsetTrail.offsetParent
    }
    offsetTop = offsetTop || null
    offsetLeft = offsetLeft || null
    return {left: offsetLeft, top: offsetTop}
}
function getElementBottom(elem) {
    var c_style = document.defaultView.getComputedStyle(elem, '')
    var height  = 0
    var prop    = ['height', 'borderTopWidth', 'borderBottomWidth',
                   'paddingTop', 'paddingBottom',
                   'marginTop', 'marginBottom']
    prop.forEach(function(i) {
        var h = parseInt(c_style[i])
        if (typeof h == 'number') {
            height += h
        }
    })
    var top = getElementPosition(elem).top
    return top ? (top + height) : null
}
function getScrollHeight() {
    return Math.max(document.documentElement.scrollHeight,
                                document.body.scrollHeight)
}

// utility functions.
function createHTMLDocumentByString(str) {
	if (document.documentElement.nodeName != 'HTML') {
        return new DOMParser().parseFromString(str, 'application/xhtml+xml');
    }
    var html = strip_html_tag(str);
	
    var htmlDoc;
    try {
        // We have to handle exceptions since Opera 9.6 throws
        // a NOT_SUPPORTED_ERR exception for |document.cloneNode(false)|
        // against the DOM 3 Core spec.
        htmlDoc = document.cloneNode(false);
        htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false));
    } catch(e) {
        htmlDoc = document.implementation.createDocument(null, 'html', null);
    }
    var fragment = createDocumentFragmentByString(html);	
	//t.insertBefore(htmlDoc, t.firstChild);
	/*
    try {
        fragment = htmlDoc.adoptNode(fragment);
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true);
    }
    htmlDoc.documentElement.appendChild(fragment);
	*/
	htmlDoc=fragment;
    return htmlDoc;
}
function filter_tags(str) {
	return str.replace(/<\/?script[\s\W]+[^>]+./gi, '').replace(/<\/?meta[^>]+./gi,'')
		.replace(/<\/?style[^>]+./gi,'').replace(/<\/?link[^>]+./gi,'')
		.replace(/<\/?title[^>]+./gi,'');
}
function strip_html_tag(str) {
    str = filter_tags(str);
	var chunks = str.split(/(<html(?:[ \t\r\n][^>]*)?>)/);
    if (chunks.length >= 3) {
        chunks.splice(0, 2);
    }
    str = chunks.join('');
    chunks = str.split(/(<\/html[ \t\r\n]*>)/);
    if (chunks.length >= 3) {
        chunks.splice(chunks.length - 2);
    }
    return chunks.join('');
}
function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}

// == ~ == //
var Layer = {
	 init: function(link, img_link, caller){
		var el, Attr = {id:'kfSnowBox', 'class':'kfSnowBox fbxPhoto', 'aria-busy':'true', style:'display:none;'};
		this.caller = caller;
		this.link = link;
		this.img_link = img_link;
		this.lastImg_count = 0;
		
		if($D('#kfSnowBox')){
			gvar.clearLayer = true;
			Layer.close('kfSnowBox');
		}
		el = createEl('div', Attr, rSRC.getTPL_layer_FB() );
		getTag('body')[0].insertBefore(el, getTag('body')[0].firstChild);
		
		this.tgt = $D('kfSnowBox');		
		
		this.buildCollections();
		this.events();
		this.ajax();
		
		Layer.toggleShow();
		Box.fill(this.img_link);
	}
	,buildCollections: function(caller){
	   var par, colls, oCall = (!caller ? this.caller : caller);
	   
	   par=(oCall ? oCall.parentNode : false);
	   par = cariParent(par, 'UL', 5);
	   if( par ){
		var tA, href, j=0;
		colls = getTag('img', par);
		if(colls.length!=0 && (this.lastImg_count != colls.length) )
		  for(i in colls){
			if( !colls[i].src ) continue;
			clog( colls[i].src );
			
			tA = colls[i].parentNode;
			if(tA && tA.nodeName!='A') tA = tA.parentNode;
			href = (tA && tA.nodeName=='A' ? tA.href : '');
			gvar.collections.push( { 'href' : href, 'src' : colls[i].src } );
			
			if(gvar.posColl==null && href==this.link)
				gvar.posColl = j;
			j++;			
		  }
		//clog( JSON.stringify(gvar.collections) );
		clog( 'ncol = ' + gvar.collections.length)
	   }
	}
	,events: function(tplname){
		var cl=$D('.uiTooltip'), els, el;
		if(cl.length > 0){
			_o("click", cl[0], function(){
				if(gvar.clearLayer) gvar.clearLayer=false;
				Layer.close('kfSnowBox');
			});
		}
		if($D('#kfSnowBox')) _o("click", $D('#kfSnowBox'), function(e){  
				e=e.target||e;
				if(e.className.indexOf('fbxPhoto') != -1){
					if(gvar.clearLayer) gvar.clearLayer=false;
					Layer.close('kfSnowBox');
				}
					
		});
		
		els=$D('.arrowLeft');
		if(gvar.posColl==0){
			if(els.length>0) els[0].style.display = 'none';
		}else if(gvar.posColl>0){
			if(gvar.collections[gvar.posColl-1])
				els[0].setAttribute('rel', (gvar.collections[gvar.posColl-1].href+','+gvar.collections[gvar.posColl-1].src ).replace(/\"/g,''));
		}
		//clog('left atr='+els[0].getAttribute('rel'));
		
		
		els=$D('.arrowRight');
		if(gvar.posColl==(gvar.collections.length-1) ){
			if(els.length>0) els[0].style.display = 'none';
		}else if(gvar.posColl< (gvar.collections.length-1) ){
			if(gvar.collections[gvar.posColl+1])
				els[0].setAttribute('rel', (gvar.collections[gvar.posColl+1].href+','+gvar.collections[gvar.posColl+1].src ).replace(/\"/g,''));
		}
		clog(JSON.stringify(gvar.collections) );
		
		els = $D('.uiButton');
		if(els) for(var i=0; i<els.length; i++)
			_o("click", els[i], function(e){ return click_photo(e) });
		
	}
	,parseSubStr: function(startStr, endStr){
		var sub, text=this.html, pos=[];
		pos[0]= text.indexOf(startStr);
		pos[1]= text.substr(pos[0]).indexOf(endStr);
		return text.substr(pos[0],pos[1]);
	}
	,parseDet: function(){		
		var text=this.html, sub, foo, cucok, det={}, tmp=[];
		// parse title
		cucok = /\"breadcrumb\">([^<]+)/i.exec(text);
		if( cucok ){
			sub = createEl('div',{style:'display:none'}, cucok[1] );
			cucok = trimStr( sub.childNodes[0].nodeValue );
			try{Dom.remove(sub)}catch(e){};
		}else{
			cucok = 'Untitled';
		}
		det["poto_title"]  = cucok;
		
		
		
		// parse komentar
		cucok = /#komentar[^>]+.([^<]+)/i.exec(text);
		if(cucok) {
			det["koment_hash"]  = '#komentar';
			det["koment_num"]  = cucok[1];
		}
		
		// parse album
		cucok = /an>Album<[^>]+[>\s\t]+<a\s*href=[\'\"]([^\'\"]+).>([^<]+)/i.exec(text);
		if(cucok) {
			det["album_url"]  = cucok[1];
			det["album_name"] = cucok[2];
		}
		// parse category / tag
		cucok = /Tag\:<[^>]+[>\s\t]+(<a\s*href=[\'\"](?:[^\'\"]+).>(?:[^<]+).\/a>[\,\s]+)+/i.exec(text);
		if(cucok) {
			sub = cucok[0];
			foo = sub.replace(/<a\s*href=[\'\"]([^\'\"]+).>([^<]+).\/a>[\,\s]+/gi, function(S,$1,$2){ tmp.push([$1,$2]) });
		}
		det["tags"] = tmp;
		
		// parse description
		sub = this.parseSubStr('"description">', '</div>');
		cucok = /p>(https?\:\/\/[^<]+)/i.exec(sub);
		if(cucok) det["ext_link"] = cucok[1];
		
		// parse pagging
		sub = this.parseSubStr('"pagging">', '</div>');
		tmp=[];
		foo = sub.replace(/<a\s*(?:(?:title|class)=[\'\"][^\'\"]+.\s*)*href=[\'\"]([^\'\"]+)/gi, function(S,$1){
			var re = new RegExp('\\/\\/' +gvar.domain + '\\/', "gi");
			if(re.test($1)) tmp.push($1);
		});
		if(cucok) det["pagging"] = tmp;
		
		// keyvalue to return [poto_title, koment_hash, koment_num, album_url, album_name, tags, ext_link, pagging]
		return det;
	}
	,parseHtml: function(text){
		this.html = text;
		var ret={}, sub, cucok;
		sub = this.parseSubStr('class="metapost"', '</div>');
		
		cucok = /<img\s(?:(?:alt|class|align|width|height)=[\'\"][^\'\"]+.\s*)*src=[\'\"]([^'\"]+)/i.exec(sub);
		if(cucok) ret["uri_foto"] = cucok[1];
		
		cucok = /nbsp;([^<\t]+)/i.exec(sub);
		if(cucok) ret["taken"] = cucok[1];
		
		cucok = /<a\shref=[\'\"]http\:\/\/[^\/]+.user\/([^\'\"]+).>([^<]+)/i.exec(sub);
		if(cucok) {
			ret["uri_user"] = location.protocol + '//' +gvar.domain + '/user/' + cucok[1];
			ret["name"] = cucok[2];
		}		
		clog(JSON.stringify(ret) );
		// result key we got
		// [uri_foto, taken, uri_user, name]
		
		var detail = Layer.parseDet();
		clog(JSON.stringify(detail) );
		// result key we got should be
		// [poto_title, album_url, album_name, tags, ext_link, pagging]
		
		for(anu in detail) ret[anu] = detail[anu];
		return ret;
	}
	,ajax_cb: function(html){
		var content = Layer.parseHtml(html.responseText);
		Box.fill_detail(content);
	}
	,ajax: function(){
		GM_XHR.uri = this.link;
		GM_XHR.cached = true;
		GM_XHR.request(null,'GET', Layer.ajax_cb);
		this.afterAjax();
	}
	,afterAjax: function(){
		if($D('mcontainer')) {
			window.setTimeout(function() {
				var kufotolink = Layer.link;
				if(gvar.html5) window.history.replaceState(kufotolink, "new title", kufotolink);
			}, 200);
		}		
		// preload before-after image
		var el, dest = $D('#tmp_next_img'), pos=[gvar.posColl-1, gvar.posColl+1];
		if(dest){
			dest.innerHTML = '';
			pos.forEach(function(no){
				if(isDefined( gvar.collections[no] )){
					el = createEl('img', { src: HLP.parselink( gvar.collections[no].src ) });
					Dom.add(el, dest);
				}
			});
		}
		addClass('kfSnowBoxs', document.body);
	}
	,nav_goto: function(gto){
		var navs = $D('.uiButton'), idx;
		if(navs.length > 0) {
			idx = (gto == 'next' ? 1 : 0);
			SimulateMouse( navs[idx], 'click', true );
		}
	}
	,toggleShow: function(){
		var obj = this.tgt; //
		obj.style.display= (obj.style.display == 'none' ? '' : 'none');
	}
	,close: function(id){
		if($D('#'+id)) Dom.remove($D('#'+id));
		removeClass('kfSnowBoxs', document.body);
		
		if(!gvar.clearLayer || gvar.isChrome)
			window.history.replaceState(gvar.loc.url, gvar.loc.title, gvar.loc.url);
		else
			window.history.back(-1);

		if(gvar.isOpera && gvar.loc.url != location.href)
			window.setTimeout(function() {var L=Layer; Layer.init( L.link, L.img_link, L.caller )}, 100);
	}
};

var Box = {
	 fill_detail: function(content){
		if($D('kfSnowBox')) addClass('dataLoaded', $D('kfSnowBox'));
		var el, el2, Attr, cucok, tgt;		
		tgt = $D('#fbPhotoSnowboxAuthorPic');
		if(tgt && tgt.innerHTML!='') return; // breaker for weirdoz Opera
		Attr = {href:content["uri_user"]};
		el = createEl('a', Attr);
		Attr = {src:content["uri_foto"],'class':'uiProfilePhoto uiProfilePhotoMedium img',style:'display: block; top: 70px'}
		el2 = createEl('img', Attr);
		Dom.add(el2, el); Dom.add(el, tgt);
		
		// name, poto_title, date taken
		tgt = $D('#fbPhotoSnowboxAuthorName');
		Attr = {href:content["uri_user"]};
		el = createEl('a', Attr, content["name"]);
		Dom.add(el, tgt);
		
		tgt = $D('#fbPhotoSnowboxTitle');
		Dom.add(createTextEl(content["poto_title"]), tgt);
		
		tgt = $D('#fbPhotoSnowboxNavi');
		Attr = {href:'javascript:;', rel:Layer.link + content["koment_hash"]};
		el = createEl('a', Attr, content["koment_num"]);
		_o("click", el, function(e){e=e.target||e;var rel; if(rel=e.getAttribute('rel')){window.open(rel)} });
		if(tgt) tgt.insertBefore(el, tgt.firstChild);
		
		tgt = $D('#fbPhotoSnowboxDate');
		cucok = /([^\']+)/.exec(content["taken"]);
		Attr={title: (cucok ? cucok[1] : content["taken"])};
		el = createEl('span', {title : content["taken"]}, (cucok ? cucok[1] :content["taken"]) );
		Dom.add(createTextEl(' · '), tgt);
		Dom.add(el, tgt);
		
		//--		
		// album & tags
		tgt = $D('#fbPhotoSnowboxMediaInfo');
		Dom.add(createTextEl('Album: '), tgt);
		Attr = {href:content["album_url"]};
		el = createEl('a', Attr, content["album_name"]);
		Dom.add(el, tgt);
		
		if(content["tags"].length > 0){
			el = createEl('br',{}); Dom.add(el, tgt);
			Dom.add(createTextEl('Tags: '), tgt);
			for(var i=0; i<content["tags"].length; i++){
				Attr = { href : content["tags"][i][0] };
				el = createEl('a', Attr, content["tags"][i][1]);
				Dom.add(el, tgt);
				Dom.add(createTextEl(','), tgt);
			}
		}
		
		// ext_link
		if(content["ext_link"]){
			tgt = $D('#fbPhotoSnowboxActions');
			Dom.add(createTextEl('Transloaded from: '), tgt);
			el = createEl('div', {});
			Attr = {href:content["ext_link"], target:'_blank'};
			el2 = createEl('a', Attr, content["ext_link"]);
			Dom.add(el2, el); Dom.add(el, tgt);
		}
		
	}
	,fill: function(lnk){
		var el, el0, Attr, tgt=$D('.stage');
		if(tgt.length > 0){
			//Attr = {id:'main_link_poto', href:};
			Attr = {id:'main_link_poto', href:(Layer.link ? Layer.link : 'javascript:;'), 'onclick':'return false'};
			el0 = createEl('a', Attr);
			Attr = {src:lnk, 'class':'spotlight'};
			el = createEl('img', Attr);
			Dom.add(el, el0); Dom.add(el0, tgt[0]);
			
			if(gvar.posColl==(gvar.collections.length-1) ){
			
				//if(els.length>0) els[0].style.display = 'none';
				
			}else if(gvar.posColl< (gvar.collections.length-1) ){
			
				tgt[0].setAttribute('rel', (gvar.collections[gvar.posColl+1].href+','+gvar.collections[gvar.posColl+1].src ).replace(/\"/g,''));
				_o("click", $D('#main_link_poto'), function(){ Layer.nav_goto('next') });
				
			}
		}
	}
};

var AutoLo = {
	 init: function(){
		var els, bottom, sH, BASE_REMAIN_HEIGHT = 370;
		els = $D('.photo_paginate');
		this.pagingEl = els[0];
		this.scrollHeight =sH= getScrollHeight();
		bottom = getElementPosition(this.pagingEl).top ||
			(Math.round(sH * 0.8))
		this.remainHeight = sH - bottom + BASE_REMAIN_HEIGHT;
		
		//this.xPathNext = '//div[@class="photo_paginate"]/a[@class="next_page"]';
		this.xPathNext = '//a[@class="next_page"]';
		this.state = 'enable';
		
		this.stream_i 	= 0;
		this.stream_max = gvar.max_stream_page;
		this.requestURL = this.getNextpage();
		this.didScroll  = this.didXHR = false;
		
		if( !this.requestURL ) return;
		
		// start it
		this.ignitor();
		this.preMockUp();
		
		// test-drive
		if(gvar.__DEBUG__){
			var el, Attr;
			Attr = {id:'logpost',style:'border:1px solid #000; position: fixed; left:0; top:0; bottom:0;'};
			el = createEl('div', Attr, "test");
			Dom.add(el, document.body);
		}
		
		//AutoLo.debug_monitor();
		clog('boottom='+bottom + '; scrollHeight='+sH + '; this.remainHeight='+this.remainHeight);
	}
	,ignitor: function(){		
		
		_o("scroll", window, function(){ AutoLo.didScroll = true && !AutoLo.didXHR && (AutoLo.stream_i < AutoLo.stream_max) });
		this.toggleIntervalScroll( true ); // start scrolling interval
	}
	,toggleIntervalScroll: function( start ){
		if( !start ){
			clearInterval(gvar.sIMonScroll);
		}else{
			gvar.sIMonScroll= window.setInterval(function() { if(AutoLo.didScroll){
				AutoLo.whenScrolled();
			} }, 500);
		}
	}
	,whenScrolled: function(){
		AutoLo.didScroll = false; // lock other scroll event until it finished
		var remain = this.getLiveRemain();
		if (AutoLo.state == 'enable' && remain < AutoLo.remainHeight )  {
			if(gvar.__DEBUG__){
				var Attr, nn, t = $D('#logpost'), nn=createEl('br');
				el = createEl('span' ,{style:'color:red'}, 'reach@remain='+remain);
				t.insertBefore(nn, t.firstChild);
				t.insertBefore(el, t.firstChild);
			}			
			this.request();
		}
	}
	,getLiveRemain: function(){
		var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
		return scrollHeight - window.innerHeight - window.scrollY;
	}
	,request: function(){
		AutoLo.didXHR = true;		
		var ldr, uri = AutoLo.requestURL;
		ldr = $D('#elspinner');
		if(ldr) showhide(ldr, 1);
		if( uri ){
			GM_XHR.uri = uri.href;
			GM_XHR.cached = true;
			GM_XHR.request(null,'GET', AutoLo.request_cb);
		}else{
			AutoLo.didXHR = false;
		}
	}
	,request_cb: function(res){
		//clog(res.responseText);
		
		var dest, div, htmlDoc = createHTMLDocumentByString(res.responseText);
		
		if(!gvar.isChrome){
			div = createEl('div', {});
			div.insertBefore(htmlDoc, div.firstChild);
		}else{
			div = htmlDoc;
		}
		dest = $D('.//div[contains(@class,"photos")]', null, 1);
		
		var el, els, atr, para, leng, ldr;		
		els = $D('//img', div);
		leng = els.snapshotLength;
		
		if(leng) {
			ldr = $D('#elspinner');
			if(ldr) showhide(ldr, 0);
			for(var i=0; i<leng; i++){
				el = els.snapshotItem(i);
				para = el.parentNode;
				
				if(!/s3\.amazonaws\.com\//i.test( el.src )) continue;				
				_o("click", para, function(e){ return click_photo(e) });
				
				para = cariParent(el, 'DIV', 3);
				if( para ){
					if( para ) Dom.add(para, dest);
				}
			}
			AutoLo.stream_i++;
			AutoLo.requestURL = AutoLo.getNextpage(div);
		}
		
		Dom.remove(div);
		AutoLo.didXHR = false;
		clog('stream_i='+AutoLo.stream_i + '; stream_max='+AutoLo.stream_max)
		if(AutoLo.stream_i >= AutoLo.stream_max)
			AutoLo.btnMore();
	}
	,btnMore: function(){
		var el, Attr, obj = $D('#infloader'), mid='more_stream'
		, btn=$D('#'+mid), sp = $D('#elspinner');;
		if(!obj) return;
		if( btn ) {
			showhide(sp, 0);
			showhide(btn, 1);
		}else{			
			showhide(sp, 0);
			Attr={id:mid,'class':'twbtn btnmore',type:'button',value:'More Result'};
			el=createEl('input', Attr);
			_o('click', el, function(){
				AutoLo.stream_i = 0;
				AutoLo.didScroll = true;
				AutoLo.toggleIntervalScroll( true );
				$D('#'+mid).blur();
				showhide($D('#'+mid), 0);
				showhide($D('#elspinner'), 1);
			});
			Dom.add(el, obj);
		}
		AutoLo.toggleIntervalScroll( false );
	}
	,preMockUp: function(){
		var el, el2, Attr, obj = AutoLo.pagingEl;
		if(!obj) return;
		addClass('hidPaging', obj);
		Attr={id:'infloader','class':'stream-loading'};
		el=createEl('div', Attr);
		Attr={id:'elspinner',title:'Loading...','class':'spinner'};
		el2=createEl('span', Attr);
		Dom.add(el2, el);
		obj.parentNode.insertBefore(el, obj); // cumi
	}
	,getNextpage: function(obj){
		if(!obj) obj = null;
		return $D(this.xPathNext, obj, 1);
	}
	
	,debug_monitor: function(){
		var el, Attr;
		Attr = {id:'logpost',style:'border:1px solid #000; position: fixed; left:0; top:0; bottom:0;'};
		el = createEl('div', Attr, "test");
		Dom.add(el, document.body);
		var t=$D('#logpost');
		
		Dom.add(createTextEl(this.scrollHeight), t);
		t.innerHTML = 'Height: ' + this.scrollHeight + "<br>"
		_o("scroll", window, function(){
			var el, val, t=$D('#logpost'), nn=createEl('br', {});
			
			var sH = Math.max(document.documentElement.scrollHeight,
                                document.body.scrollHeight)
			var remain = sH - window.innerHeight - window.scrollY;			
			t.insertBefore(nn, t.firstChild);
			t.insertBefore(createTextEl(remain+'; '+AutoLo.remainHeight+'; '), t.firstChild);
			
			if (AutoLo.state == 'enable' && remain < AutoLo.remainHeight )  {
				el = createEl('span' ,{style:'color:red'}, 'reached @remain='+remain);
				t.insertBefore(nn, t.firstChild);
				t.insertBefore(el, t.firstChild);
			}
		});
	}	
}; //-- end AutoLo




//=====
init();
//=====


})()
// By Idx.
