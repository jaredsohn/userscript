// ==UserScript==
// @name           Fixed Scroller Anywhere
// @namespace      http://userscripts.org/users/315214
// @description    fixedscrollanywhere
// @version        0.1
// @dtversion      110815001
// @timestamp      1313348055082
// @author         tuxie.forte (http://userscripts.org/users/tuxieforte);
// @license        (CC) by-nc-sa 3.0
// @include        http://*
// @include        https://*
//
// ==/UserScript==
//
// This script contain adapted snippet from: google plus reply+,
// Full credit left to original author: Mesak (http://userscripts.org/users/mesak)
//   uso:   http://userscripts.org/scripts/show/106503
//   web:   http://mesak.wablog.info
// =================================
//
(function(){

// Initialize Global Variables
var gvar=function() {};
    
var IMG = {
'BT_ARROW_BOTTOM':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAB3klEQVRYR+1XSy8DURidRS0bEo/Eb7C2YCXxO4hO25mhOxaIBGui9fwNHlGPRkM8qu20RESInSAhNqhHSKyP75QmmtA2XOlmFif35n7n3O98370z7WgAtHKirMlZuGPA6YDTAacDRTugaZrLNM01n88H3eOBpwjIIdeyrAvRVggK5ijFgNswDLy8vuE+84i7+4eCIIdcaiR3pQoDNX6//2ksOIGr6xvMzocFi5hbCOeBa4yRQ65oniV5rQoDVbJJo7Q+Mzg0jLPzCyytRBBeXs0D1xgjh1xqBNT++Qh4jvWCZl3XM729fTg+OUVkbR0rkWgWnHONMXLI/dQouQMsImeiyevVM93dPUjaaWxux7JI2ClwjTHhNn1NrqID3CPPhFR52xUIILq+kUWnZbHy2++SqzSQZ6K9re3Sq+sgOP8puQoDrpHRYDQ4PoWx0KRgCqGJaYQmZ2T8wPjnPMdhnBpJ7lJhwN0/MIiDwyOk9w9g7+0jmd5DIpVGPJnCbiKFWNzGdiyBrZ243Ind7EiNJHerMFDd4fHZhtkFv9FZEIbEyTOtAKiR5NUqDLCKBkGLoLVEkEuNkg7wHLkR32p1JYJcapTcgdxj+Oux0N/+oj9G//3N4BhwOuB0oOwdeAf11IjEeWJphQAAAABJRU5ErkJggg==',
'BT_ARROW_TOP':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAB/UlEQVRYR+1XzU4TURidpLhsYgK48BVc+QZGE16grFudf2DV7gyBRZdiW7WvoQN0hCC09GcopCEmhLiAlKTtXuvCBzh+Z5yaiYYW0iFspsnJnTvfOff75sz9bqYKAOU+ca/J+eBxAbEDsQOxAxMdUBRl5s1Gcaf4roxC6cNfvC2+x3UolMqghlrB2Bw3KSD5enUdB7UG9qt1f6weNlGrt3DYaKHe8tD02mgdHcNrn6B90kHn9CuokdzJKAqYfflK9yx7Baa1DNNchuFjCbphB1jy5yOQR40kn42iAD7FE8EzwYsAC4uLKVfTVGiqilQq5cr9hVCcXGoicYDvkQvNCx4JHmcymYppmvgx/InvwyHW19aQTqcrjAUccqmJZA/QxdEvoWmak83l0Ov10Wh6qMs+GPQH4D3GhJgIC6J4BaHkqpPN5nDZvcK2u4OtymdsCnh90e2CMXkt/xUx7nvjJl3AAhKqqjr5fB5n59/gbLn4tOn6Y/iaMXLIDTsxbQEzuq67hWIJ7eOOn/ijsx2gIiPxZ84YOeRSE9UeSNq2JX3vYW+/ht0v1bEgh1xqouqCOdu2f1mWBcMwBPoEGCCXGilgLopN+FAWeSp4Hurz0Xlw3UguNdROfRQ/CBbiGXAbMDm1Uxfwb1vfej5VF9z1f4aJ50BcQOxA7MBdO/AbgVKBjSV0zikAAAAASUVORK5CYII=',
'BT_ARROW_DN':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAABcklEQVRYR+1Wy0rDQBQNqEvBRb/DRX/A38hrEwkJoa7soq7UH1DwK3xgtAZLRURMq2vFneii4sqqoILr45yQFCIxEZJSFzNwYLhzzr13Tm5gFADKJDHR4ry4bEA6IB2QDvx/BxRFmfE87922bSxaFqwCkEMuNdQK5F6y0AGhn3McBx+fXxi+vOF5+JoLcsilhtoqGqiZpnmxsbmFweMTtnd9gX3s7PkpMMYzcsilRhSvVdHArEgyr6pquLq2jrv7Bxy0A/iHRykwxjNyyKVGgNrSn2A6vkmdiVutFVzf3CI47qIddCJwzxjP4uL1WENt6QaYYyppQtO0sLncRK9/hdOz8whh/xKM8UzwkuLURCvvvfGXIUzyjJrQdS1sLDXQ6Z5EEBMPXdczi1fZQMoJwzB6ruuC4D7r5lU78NMJDtlCDO458SPbE3LVDiR5OVyccBYluI8GLmtVNQO/5S+Ml2pg3C/mwr9ANiAdkA5IB8btwDctkKsYa5cf8AAAAABJRU5ErkJggg==',
'BT_ARROW_UP':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAABX0lEQVRYR+1Wy0rDQBQNpC4LLor/4S/on+S9Tfd1kb36IWr6iIqKJdWi4E7EhVKh7V7rwg843hMrSEmblmmpiwkcZjJz7twzJzeTGACMdWKtyblxLUA7oB3QDvx/B4z8y/Q878hxHDiODdd1U6GVpnBnbrLQgZxFTdu2YxGAj9En3gV7tRosy4qFa+aJmPWtWVRAljysVtHvD9C56SLt3GI4GIJjnMsTsSwBktyKw7CK194bmskZGq1T1AXsv/R64Bw5kyKWIcCkxVEU4fHpGXEjwUk9ydq/fc6RM/k4VAWUpNiS/YND3N0/ZImP4+YYLWmJn3vOkUMuY34LU1VAOQh8tNMuLq7aOL+8nglyyGWMCCizKFUFVIIg+PJ9n6+bwCmAC3IZI7kryxCwKYtsC3YEu3OCXMYwVtmBjfFCW9IuAiZnrLKAaQfc3ONKNbDqP+bCk1AL0A5oB7QDq3bgG8rFqAcNi1mfAAAAAElFTkSuQmCC',
'BT_ARROW_BLACK':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAACQklEQVRYR+2XXWsTQRSGEyq9NCCk1/4BLwJCvLKCvyAfKLHJbnaTko9NrGlNTbUKSUgJbRNrrRJtruoPKAGvKtYPeuuFv+g4z5hIKm1qyZaCZOFlDue8Z867Z3ZmEo+IeC4Tl1qcF58ImHRg0oEzO+A5/njn5h7cMk3zSzKZlGHgI6bo3r9yRtY4j4Ap0zR2Hacg3W5XDg4+yddv3zWw8RGDowRMDYsYddD9q4ArauJeaXFRDj8fyrv3Xck7Rbl3P6aBjY8YHMXtDosYV4A3FArNFosF/abl5RUxTEssOy12al4DGx8xOHDD4fDtwXKMK2A6kUgc7e19kGqtIen5jGSyecnlC8eAjxgcuIZhHCkB0yzFuAJ8lmXJ/n5PFywUF+ThQulEEIMDlxxV2+eGAL9t27LztiOPSkuy9LissHwKypoDlxxV3O+GgJlUKiXrGy15UnkmlZXVkYADlxxVfMYVAel0Sp6/qCrU+iP2afjNIcctAf54PP6j8nRV6o2mVOtrIwEHLjluLYEvGAwmstmMNNc3FVqy1tw4EcTgwCXHrY+QrXQ9Go32HMeR9sttaW+9lpYaN9uvNLDxEYMDlxy3tiFn+1WFG5FI5GM2m5NavSHbOx1509nVwMZHDA7cfo6+F8Y9B5iDs/0aEwcCgVwsFvvJNrPVXtdQNj5i/eJw/9wHbggYiKATtPamwh2Fu31g4yMGx/XLCAE8tJRvghOOQ4Z9DrDxEbuw63gg4tzjWEtw0X9azvw9MBEw6cB/34Ff40MrIZhsiFAAAAAASUVORK5CYII=',
'BT_ARROW_TORIGHT':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAYxJREFUWIXt1r1Kw2AUxvH/Sa2LpeqibtYOft6AuLuJtKK4ODVQimBvQ138GhRp7eSgFKxIL0AcxEvQResXqItaBLGmOQ4VB6cmpemSZwu8b84vJOe8EVWllTFaWt0H+AAfALTVu1BEAIJAx+++L+ATsP6vdTJb6gb8pgMYSKVSZ6Ahy6oWs9lsDKg6vM9fnL6CdqBbVUNz8wuMjI5NJRKJPBDwCgAgtm3z/V1hfHyCSCQSN033CJcfoWKr8vT8wnRshnC4K26apitEQ12ganN9fUNqcZFwZ6crRMNtqAqXl1ekl9IEAoF4Mpk88BAgiNTa7vbunuWVVWzbnvUQUItSQ+jflWcARRUMEaKRfrbW1xAxTj0EgAgMDQ+ysbXJw+NjIZPJTDrZ73QS/ituEI0OsLu9Q7n8XsjlcnM4nIouAYIhQl9vDyfHR5TLb4W9PefF3QLUMAyCwXYuLs4plUquntwtoAK8ishH/nA/ZFnVYiPFAaTeo7NZx7FTQF1pCqBZafkvmQ/wAS0H/ACra5W813uV0AAAAABJRU5ErkJggg==',
'BT_ARROW_TOLEFT':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAaxJREFUWIXtlr9LHFEQxz+zexoEOU0Tz8J42mj0H5AU4h8gwRMOU1jt3iFJEdAmyb9hQI6DvSqNrLgS0tnLlYImdndnpzb+QBvP3ZfiQiqVfW+VS7FTz/vOh5l5MyNKKbppVlejpwApwP8AkNFxFpHYvnG/txbAIxp9wAvgDrgB2jqPk5hdKpWCTMaeB7muVCqzQBO4iCuQpAdsx3H8N1PT88WlZZRS/cBLoFdHxBTAdl3Hz+fzhZmZt7Tbt0RRBBC/SRIA2K7r+tnsYOHdwiInp2dESgFmO0UXIOM4jp8dGCisfPxAo9FEqcgo8D9BHedyubw7nMvNuW6J/YNDnmKRamVAqWju0+oajdYxkVJ0xoJ22c0BQBA6AylZWEMAy7K2vn75zOjrEUTkbwmS1UELoFqtvg/DMFj/ts7k5AQak/lpAIDQ87zi1eVlUNnYYHx8DJFk+8zkdQfi6iL4sbNNbugVlgimzWiKH3perdhqtYJ6fY+enl4sywKDhkiSv7BWqxWPfv/66W9+R0SugXPgVkdEdM7yB+6Be9dxXF0tgOewrp9kKUAKkAL8ARL2hevB3d/UAAAAAElFTkSuQmCC',
};
/*
window.alert(new Date().getTime());
*/
//========-=-=-=-=--=========
gvar.__DEBUG__ = false; // development debug
//========-=-=-=-=--=========
if(window.top !== window.self) return;


function init(){

    // check for browser type
    ApiBrowserCheck();    
    GM_addGlobalStyle( rSRC.css() );
    
    if(!ss) ss = {};
    ss.STEPS = 20; // scroll speed; smaller is faster
    gvar.LAST = 0;
    gvar.sITry_Over = null;
    gvar.isMoving = 0;
    
    // roll
    start_Main();
    
}

function start_Main(){
    var par = document.body || getTag('body')[0];
    var el, els, pEl, highest;
    if(par){
        el = createEl('div', {}, rSRC.tpl() );
        Dom.add(el, par);
        
        els = $D('//div[@id="gpr_gotools"]//div', el);
        if(pEl = els.snapshotLength){
            for(var i=0; i<pEl; i++){
                el = els.snapshotItem(i);
                _o('click', el, function(e){
                    e = e.target||e;
                    if(e.nodeName!='DIV') e = e.parentNode;
                    var op = e.id.replace('gpr_goto_','');
                    pageMove(op);
                });
            }
        }
        
        // prep display container
        if(el = $D('#gpr_gotools')){
            _o('mouseout', el, function(){
                gvar.sITry_Over = window.setTimeout(function() { 
                    if($D('#gpr_gotools')) addClass('trsp', $D('#gpr_gotools')) 
                    if($D('#gpr_goto_hide')) addClass('invi', $D('#gpr_goto_hide'));
                }, 800);
            });
            _o('mousemove', el, function(){
                clearTimeout(gvar.sITry_Over);
                if($D('#gpr_gotools')) removeClass('trsp', $D('#gpr_gotools')) 
                if($D('#gpr_goto_hide')) removeClass('invi', $D('#gpr_goto_hide'));
            });
            
            window.setTimeout(function() { removeClass('invi', $D('#gpr_gotools')) }, 500);
            highest = findHighestZIndex('*');
            if(highest > 1)
                el.style.setProperty('z-index', (highest+1) ,'');
        }
        //addClass
    }
}

// handler of scroll seeker
function pageMove(to){
    var move_scroll = 0, cs = ss.getCurrentYPos();
    gvar.isMoving = (gvar.isMoving < 1 ? gvar.isMoving+1 : 0);    
    if(gvar.isMoving==0) return;    
    
    switch(to){
        case "top": move_scroll = 0; break;
        case "up": move_scroll= cs-GetHeight();break;
        case "black": 
            move_scroll= gvar.LAST;
        break;
        case "dn":move_scroll= cs+GetHeight();break;
        case "bottom": move_scroll = getDocumentHeight(); break;
        
        case "hide": move_scroll = false; break;
        case "show": move_scroll = true; break;
    }
    if(move_scroll===false){
        addClass('hide', $D('#gpr_main'));
        removeClass('hide', $D('#gpr_toggler'));
        return;
    }else if(move_scroll===true){
        removeClass('hide', $D('#gpr_main'));
        addClass('hide', $D('#gpr_toggler'));
        return;
    }

    ss.smoothScroll( move_scroll, null );
    gvar.LAST = cs;
}



function findHighestZIndex(elem){
  var ret=0, zindex, elems = document.getElementsByTagName(elem);
  for (var i = 0; i < elems.length; i++) {
    zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
    if ((zindex > ret) && (zindex != 'auto')) 
      ret = zindex;    
  }
  return ret;
}





// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return (typeof(x)=='string' && x ? x.replace(/^\s+|\s+$/g,"") : '') };

function _o(m,e,f){Dom.Ev(e,m,function(e){typeof(f)=='function'?f(e):void(0)});}
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
}
function getDocumentHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

function createEl(type, attrArray, html){
 var node = document.createElement(type);
 for (var attr in attrArray) 
   if (attrArray.hasOwnProperty(attr))
    node.setAttribute(attr, attrArray[attr]); 
 if(html) Dom.setHTML(node, html);
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
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; clog('Bugged Chrome GM Api detected...',0); }
  } else { needApiUpgrade=true; clog('No GM Api detected...',0); }

  gvar.noCrossDomain = (gvar.isOpera || gvar.isBuggedChrome);
  if(needApiUpgrade) {
    GM_isAddon=true; clog('Try to recreate needed GM Api...',0);
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
  clearHTML: function(o){
    if(o) while(o.firstChild) o.removeChild(o.firstChild);
  },
  setHTML: function(o, html){
    if(!o || !html) return;
    var doc = Dom.stringToDOM(html);
    Dom.clearHTML(o);
    o.appendChild(doc);
  },
  getIner: function(o){ return Dom.DOMtoString(o) },
  stringToDOM: function(q){

    var r = function (a) {
            a = a.replace(/\r/g, " ");
            a = a.replace(/\n/g, " ");
            return a
        };
    var s = function (a) {
            a = a.replace(/&amp;/g, "&");
            a = a.replace(/&gt;/g, ">");
            a = a.replace(/&lt;/g, "<");
            a = a.replace(/&nbsp;/g, " ");
            a = a.replace(/&quot;/g, '"');
            return a
        };
    var t = function (a) {
            a = a.replace(/ /g, "");
            return a
        };
    var r = function (a) {
        a = a.toString();
        clog('R\n'+a);
        a = a.replace(/<br>/gi, "<br/>");
        a = a.replace(/<hr>/gi, "<hr/>");
        a = a.replace(/&amp;\#(\d{3,});/gi, "&#$1;");
        a = a.replace(/<img\s([^>]+)./gi, function (a, b) {
            return b.substring(b.length - 1) == "/" ? a : "<img " + b + "/>"
        });
        a = a.replace(/<input\s([^>]+)./gi, function (a, b) {
            return b.substring(b.length - 1) == "/" ? a : "<input " + b + "/>"
        });
        a = a.replace(/<hr\s([^>]+)./gi, function (a, b) {
            return b.substring(b.length - 1) == "/" ? a : "<hr " + b + "/>"
        });
        return a
    };
    var u = function (a) {
            var b = document.createDocumentFragment();
            var c = a.indexOf(' ');
            if (c === -1) {
                var d = a.toLowerCase();
                b.appendChild(document.createElement(d))
            } else {
                d = t(a.substring(0, c)).toLowerCase();
                if (document.all && d === 'input') {
                    b.appendChild(document.createElement('<' + a + '/>'));
                    return b
                }
                a = a.substring(c + 1);
                b.appendChild(document.createElement(d));
                while (a.length > 0) {
                    var e = a.indexOf('=');
                    if (e >= 0) {
                        var f = t(a.substring(0, e)).toLowerCase();
                        var g = a.indexOf('"');
                        a = a.substring(g + 1);
                        g = a.indexOf('"');
                        var h = s(a.substring(0, g));
                        a = a.substring(g + 2);
                        if (document.all && f === 'style') {
                            b.lastChild.style.cssText = h
                        } else {
                            b.lastChild.setAttribute(f, h)
                        }
                    } else {
                        break
                    }
                }
            }
            return b
        };
    var v = function (a, b, c) {
            var d = a;
            var e = b;
            c = c.toLowerCase();
            var f = e.indexOf('</' + c + '>');
            d = d.concat(e.substring(0, f));
            e = e.substring(f);
            while (d.indexOf('<' + c) != -1) {
                d = d.substring(d.indexOf('<' + c));
                d = d.substring(d.indexOf('>') + 1);
                e = e.substring(e.indexOf('>') + 1);
                f = e.indexOf('</' + c + '>');
                d = d.concat(e.substring(0, f));
                e = e.substring(f)
            }
            return b.length - e.length
        };
    var w = function (a) {
            var b = document.createDocumentFragment();
            
            clog('auoo' + a);
            if(a) a = r(a);
            while (a && a.length > 0) {
                var c = a.indexOf("<");
                if (c === -1) {
                    a = s(a);
                    clog('createTextNode -1='+a)
                    b.appendChild(document.createTextNode(a));
                    a = null
                }
                if (c > 0) {
                    var d = s(a.substring(0, c));
                    clog('createTextNode > 0='+a)
                    b.appendChild(document.createTextNode(d));
                    a = a.substring(c)
                }
                if (c === 0) {
                    var e = a.indexOf('<!--');
                    if (e === 0) {
                        var f = a.indexOf('-->');
                        var g = a.substring(4, f);
                        g = s(g);
                        b.appendChild(document.createComment(g));
                        a = a.substring(f + 3)
                    } else {
                        var h = a.indexOf('>');
                        if (a.substring(h - 1, h) === '/') {
                            var i = a.indexOf('/>');
                            var j = a.substring(1, i);
                            b.appendChild(u(j));
                            a = a.substring(i + 2)
                        } else {
                            var k = a.indexOf('>');
                            var l = a.substring(1, k);
                            var m = document.createDocumentFragment();
                            m.appendChild(u(l));
                            a = a.substring(k + 1);
                            var n = a.substring(0, a.indexOf('</'));
                            a = a.substring(a.indexOf('</'));
                            if (n.indexOf('<') != -1) {
                                var o = m.lastChild.nodeName;
                                var p = v(n, a, o);
                                n = n.concat(a.substring(0, p));
                                a = a.substring(p)
                            }
                            a = a.substring(a.indexOf('>') + 1);
                            m.lastChild.appendChild(w(n));
                            b.appendChild(m)
                        }
                    }
                }
            }
            return b
        };
    var x = w(q);
    return x

    
  },
  DOMtoString: function(h){
    //a=a.replace(/&/g,"&amp;");
    var j=function(a){a=a.replace(/>/g,"&gt;");a=a.replace(/</g,"&lt;");a=a.replace(/\"/g,'&quot;');return a};var k=function(a){var b=a.childNodes;var c='';for(var i=0;i<b.length;i++){var d=b[i].nodeType;switch(d){case 1:var e=b[i].nodeName.toLowerCase();var f=b[i].attributes;c=c.concat('<'+e);if(f.length>0){for(var g=0;g<f.length;g++){if(document.all){if(f[g].nodeName&&f[g].nodeValue!==null&&f[g].nodeValue!=''&&(f[g].nodeName!='contentEditable'&&f[g].nodeValue!='inherit')&&(f[g].nodeName!='shape'&&f[g].nodeValue!='rect')){c=c.concat(' '+f[g].nodeName.toLowerCase()+'="'+j(f[g].nodeValue)+'"')}if(f[g].nodeName==='style'&&b[i].style.cssText!==null&&b[i].style.cssText.length!==0){c=c.concat(' style="'+b[i].style.cssText.toLowerCase()+';"')}}else{c=c.concat(' '+f[g].nodeName.toLowerCase()+'="'+j(f[g].nodeValue)+'"')}}}if(e==='meta'||e==='img'||e==='br'||e==='input'||e==='link'||e==='hr'){c=c.concat(' />')}else{c=c.concat('>'+k(b[i])+'</'+e+'>')}break;case 3:c=c.concat(j(b[i].nodeValue));break;case 8:c=c.concat('<!--'+j(b[i].nodeValue)+'-->');break}}return c};var l=k(h);return l
  },
  clearIner: function(o){
    if(o) while(o.firstChild) o.removeChild(o.firstChild);
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
/* Modified Smooth scroller
   Todd Anglin  14 October 2006, sil, http://www.kryogenix.org/
   v1.1 2005-06-16 wrap it up in an object
*/
var ss = {
  smoothScroll: function(anchor, cb) {
    var desty=0;;
    if(typeof(anchor)=='number'){
        desty = anchor;
    }else{
        var destinationLink = anchor;
        // If we didn't find a destination, give up and let the browser do its thing
        if (!destinationLink) return true;
        // Find the destination's position
        desty = destinationLink.offsetTop;
        var thisNode = destinationLink;
        while (thisNode.offsetParent && (thisNode.offsetParent != document.body)) {
            thisNode = thisNode.offsetParent;
            desty += thisNode.offsetTop + gvar.offsetTop;
        }
    }
    // Stop any current scrolling
    clearInterval(ss.INTERVAL);
    
    // check is there any callback
    ss.callback = (typeof(cb)=='function' ? cb:null);
    var cypos = ss.getCurrentYPos();
    var ss_stepsize = parseInt((desty-cypos)/ss.STEPS);
    
    ss.initPos = (cypos < desty);
    ss.INTERVAL = setInterval( function(){
        ss.scrollWindow(ss_stepsize,desty,anchor)
    }, 8);
    
  },
  scrollWindow: function(scramount,dest,anchor) {
    var wascypos = ss.getCurrentYPos();
    var isAbove = (wascypos < dest);
    window.scrollTo(0,wascypos + scramount);
    var iscypos = ss.getCurrentYPos();
    var isAboveNow = (iscypos < dest);
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
      //if(isString(anchor)) location.hash = anchor;
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


// main resource
var rSRC = {
    css: function(){
        return(''
+'#gpr_gotools {right:0;top:200px;position:fixed;z-index:1;}'
+'#gpr_main {cursor:pointer; height:160px; width:32px;}'
+'#gpr_toggler {cursor:pointer; height:32px; margin:64px -10px 0 0;}'
+'.trsp {filter:alpha(opacity=55); opacity:.55;}'
+'.invi {visibility:hidden;}'
+'.hide {display:none;}'
+'.abs {position:absolute;}'
+'.inline {right:10px; margin:-2px 8px 0 0;}'
        );
    }
   ,tpl: function(){
        return(''
+'<div id="gpr_gotools" class="invi trsp">'
+'<div id="gpr_toggler" class="hide">'
 +'<div id="gpr_goto_show"><img src="'+IMG['BT_ARROW_TOLEFT']+'" /></div>'
+'</div>'
+'<div id="gpr_main">'
+'<div id="gpr_goto_top"><img src="'+IMG['BT_ARROW_TOP']+'" /></div>'
+'<div id="gpr_goto_up"><img src="'+IMG['BT_ARROW_UP']+'" /></div>'

+'<div id="gpr_goto_hide" class="abs inline invi"><img src="'+IMG['BT_ARROW_TORIGHT']+'" /></div>'
+'<div id="gpr_goto_black" class="abs" style="height:32px; "><img src="'+IMG['BT_ARROW_BLACK']+'" /></div>'
+'<div style="height:32px;">&nbsp;</div>'

+'<div id="gpr_goto_dn"><img src="'+IMG['BT_ARROW_DN']+'" /></div>'
+'<div id="gpr_goto_bottom"><img src="'+IMG['BT_ARROW_BOTTOM']+'" /></div>'
+'</div>' // #gpr_main
+'</div>'
        );
    }

};

// =============== /END Global Var ===

init();
//----

})()
/* ~tuxie.forte. */
