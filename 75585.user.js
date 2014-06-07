// ==UserScript==
// @name Simple Flash Blocker
// @description Press Alt+F to toggle the blocking of flash videos at the site being visited.
// @include *
// @version 1.4.5
// ==/UserScript==

// @version March 2013.  Bug at google groups, for iframes when not blocking them.
// @version February 2013.  Updated to prevent autostart of sounds at new yuoutube site.
// @version January 2010.  Updated for Firefox 4.
// @version October 2010.    Google Chrome platform adaptation.
// @version August 2010.  GM menu option added to also block frames (webpages within webpages that are often used for adverts.)
// @version May 2010.  Handle dynamically created flash objects.
// @version Simple Flash Blocker
// try {
// (function() {

GM_platform_wrapper ("Simple Flash Blocker", "1aMfvQ9", true);  // to also handle Google Chrome.

var log=GM_log; 
log =function(){};
  
if (iframe()) return;

try{log("Script start at:"+location.host+" path:"+location.pathname+
	" search: "+location.search+" hash: "+location.hash
	+" port: "+location.port+" protocol: "+location.protocol+"." );}catch(e){}

  
var block_frames=GM_getValue("block_frames", false), frames_css="", image_css="";
var  val="b"; try { 
  val = GM_getValue(location.host, "b"); } catch(e) {GM_log("No hostname "+e); return; }
var block_subpages=GM_getValue("block_subpages", false);
//extensions.greasemonkey.scriptvals.userscripts.org/Simple Flash Blocker.block_subpages
var block_subsubpages=GM_getValue("block_subSubpages", false);
var subpage=location.host+location.pathname;
if (block_subsubpages) subpage=location.href;
if (block_subpages && val!="b" ) 
  val = GM_getValue(subpage, "b");
  
log((block_subpages?" subpage ":"")+"flash blocker.  Block? "+(val?val:"BLOCK")+" abf "+GM_getValue("always_block_frames"));
var types="object, embed, iframe, frame"+(val=="i" || val=="e" ? ", img": "")
    
  if (block_frames) 
    frames_css="frame, ifame,"
      if (val=="i" || val=="e")
	image_css="img,";
  
var initial_css=image_css+frames_css+"object, embed, .fbusedObj { display: none ! important; }"; 
GM_addStyle(initial_css);
  
var head=document.getElementsByTagName("head")[0];
var css_elem=head.lastElementChild, clear_styles;
String.prototype.trim = function () {    return this.replace(/^\s*|\s*$/g,"") }
  css_elem.id="fbus-css";
var final_css=".fbusedObjFree *, fbusedObjFree { display: inline-block ! important; } .fbusedObj *, .fbusedObj { display: none ! important; }"; 
  
function FinalizeCss() {
  if (clear_styles) return;
  css_elem.parentNode ? css_elem.parentNode.removeChild(css_elem):0;
  GM_addStyle(final_css);
  log("Add final style "+final_css);
  head.lastElementChild.id="fbus-css-some";
}
var display_inline=types+", .fbusedObj { display: inline-block ! important; }"; 
var img="data:image/gif;base64,R0lGODlhFgAWAOfQAAABAAACAAAHCg4HBRoeICEjICIkITJETj1CRDZESTNFTzRGUEFFRzlHTDZIUjdJUzhKVDpLVjtNV0BOUz1PWUlNTz5QWj9RW0FTXUZUWkNVX0RWYE9UVkRXYUpYXkdZZExbYU1cYktdaE9eY05ga09hbFJhZlNiZ01jc1FjbVRjaFZkalRncVNqeltpb2NoaltqcE9tfFFvfl5tc1dufmdrblxueV1velRygWRzeV10hGV0el91hmZ1e2B2h2d2fHB0d1p5iFt6iWZ4g2p5f2h6hWx7gXB/hXGAhnh/h3KBh3uAg3qBiXSDiXGEj3WEinaFi3CGl3eGjHuKkH6KioKJkX2MknqNmXuOmn+OlICPlYGQloOSmIaSk4STmYWUmoaVm4eWnIiXnYSYo4mYnpKXmYqZoIaapYuaoYibpoyboo2co5Obo46epI+fpZCgppGhp5WhopOjqZSkqpilpZOmspamrJenrZqqsJursZyssp2ttKOstJ6utZ+vtqGwt6KxuKOzuaqyuqS0uqW1u66zta21vae3vbG2uK+3v6m5v7C4wKq6wLO4u7G5wq+8va29xLa7vrO8xK6+xbG+v7W+xrTAwba/x7m/wbnBybzBw73CxLXFy77Dxb/ExrfHzcDFyLjIzsLHysPIy8DJ0cTJzMXKzcTN1cfNz8bO1snO0MrP0cjQ2MvQ0snR2szR1MrS283S1c7T1s/U19DV2NHX2dLY2tTZ29Xa3Nbb3dfc39jd4Nne4drf4tvg49zi5N/k5uDl6OPo6+Tp7OXq7ebs7uft7+nu8Ovw8+7w7ezx9PL08fP18vD2+Pb49Pf59v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAAWABYAAAj+AP8JHCgQVy1WqUJNIsiQ4a1dwYYVE8aLlaI6DQmykjXMmbNlypAZKwbs05goGTmxUvZMmTFhwHzx2qWrFyksQRgqIuWM2TFhzXjdqiXrVatVqzo58UEQEDFmxoLx4mDrVyxVpkSB8qQJD4+BaVI5KybVVwADhWppzVQpUiJBWGgIPHOMWDBfuHYFCDBgCS1PlhYZGqTHzY1/QvIku4trlq29eytMqkQIkJ47bIaw0HGImK9ctV7Jgry3AB1IevDIEVMkBY5JwHLRioVqFem9AmromdOGyxASMgzxovVKlShTt/cy0POGjJUcImLImdUK1ahOoJIDCfRGDZcnLj6ytLhSapTWS5lIE6jyp42aMFOMmOjwzwYiTJssPZIEGcEdPG2QAUYWSsxA3z8oWNHIIoscwsheL+wWYBhbSLHDCBcMlIIYfPzxhx4BUEGIHGsIqAUUP6hAAUEisFBGHHbYwcQdcJTIhRVN7LCCBREwtEEJSXTxhRtheKHFFE0QMUMIEzyQEQYauGCEEkocYUQPM5yQAQQNZDSQBBZ4AMIIIGQwgQMJeNmQAw4soMABaWYUEAA7"
  var arrow_count=0, frame, arrow_clicked;

//
// Mainline
//

if (iframe())
  frame=true;

if(val[0] != "u") { //u==unblocked
  if (val != "e" ) {
    addEventListener("DOMNodeInserted", newNode, false)
      addEventListener("DOMNodeRemoved", nodeRemoved, false) 
      addEventListener("load", function() {
	  // removeEventListener("DOMNodeInserted", newNode,false);
	  // removeEventListener("DOMNodeRemoved", nodeRemoved,false);
	  log("button up and finalize");
	  buttonUpFlash();
	  FinalizeCss();
	},0);
  } else
    addEventListener("load", function() {
	log("button up and finalize2");
	buttonUpFlash("img, frame, iframe");
	FinalizeCss();
      },0);
 } // end if !=u , not unblocked
 else { 
   if ((block_frames && val[0] != "u" ) || GM_getValue("always_block_frames", false))
     addEventListener("load", function() {
	 log("Will block frames.  Config, Block_frames: "+block_frames);
	 buttonUpFlash("frame, iframe");
	 FinalizeCss(); },0);
   else {
     GM_addStyle(display_inline);
     GM_log("added style");
   }
 }

document.addEventListener('keydown', function(e) {
    if(e.keyCode == 70 && e.altKey && ! (e.ctrlKey || e.shiftKey || e.metaKey) ) { //((e.shiftKey && e.ctrlKey) != e.altKey)) {
      toggleBlocking();
      e.stopPropagation();
      e.preventDefault();
      // this.addEventListener('keyup', function(e) {
      //     e.stopPropagation();
      //     e.preventDefault();
      //}, false);
      return true;
    }
  }, false);
document.addEventListener("click", function(e) {     
    if (e.button!=0) return;
    var t=e.target;
    log("CLICK "+ t.tagName+" "+t.className+" "+t.id);
    var neighbours=t.parentNode&&t.parentNode.getElementsByClassName("fbus_arxrow");
    if (neighbours.length) { 
      var n=neighbours[0];
      log("Neighbours "+n.className);
      setTimeout(function(){freeFlash(e, n, n.nextElementSibling)}, 0);
    }
  }, 0);

GM_registerMenuCommand( "========Simple Flash Blocker======", function(){});

GM_registerMenuCommand("Toggle Simple Flash Blocker for this site, Alt-f", toggleBlocking);

//
// Functions.
//
function toggleBlocking() {
  val=GM_getValue(location.host, "")[0]; // u, i or b
  if (block_subpages && val != 'b') val=GM_getValue(subpage, "")[0]
				      log("toggle");
  if(val != 'u'){
    if (val != "i" ) {
      alert("Clearing flash blocking of: "+(!block_subpages?location.host:subpage));
      GM_addStyle(display_inline);
      delArrows();
      if ( ! block_subpages)  GM_setValue(location.host, 'u');
      else { GM_setValue(subpage, 'u'); GM_setValue(location.host, 'u');}  // "u", explicitly unblocked
    }
    // else { // == i
    //     alert("Clearing flash blocking for site "+location.host+"\nRemoving all blockers on this page.\n\nHit clear once more to also remove the image blocking that was previously added for this site.  This affects only new tabs where images will still be blocked unless clear is done once more.");
    //     GM_addStyle(display_inline);
    //     delArrows();
    //     GM_setValue(location.host, 'e'); // e: images blocked but flash not.
    // }
  } // end if !=u
  else{
    //var reply=confirm("Blocked site "+location.host+" for Flash.\n\nClick 'Cancel' or escape, to also block images at this site");
    alert("Blocked site "+(!block_subpages?location.host:" webpage "+subpage)+" for Flash.")
      //	if ( reply) {
      GM_addStyle(initial_css);
    buttonUpFlash();
    if ( ! block_subpages)	    GM_setValue(location.host, "");
    else                          GM_setValue(subpage, "");
    // }
    // else {
    //     initial_css="img,"+initial_css;
    //     GM_addStyle(initial_css);
    //     buttonUpFlash();
    //     GM_setValue(location.host, "i");
    // }
  }
}

function buttonUpFlash(tags) {
  log("buttonUpFlash");
  //  if (arrow_clicked) return;
  function invisible(elem){ return (getComputedStyle(elem, null)||{}).display=="none";  }
  var elem, objs;
  objs = getElementsByTagNames( ! tags ? types : tags );
  log("buttonUpFlash, number of "+types+" elems: "+objs.length+". Or tags? "+tags);
  for(var i=0; elem=objs[i];  i++) {
    if (arrow_clicked==elem) continue;
    //log("Check each obj if already arrowed, obj: "+elem.tagName+", class: "+elem.className+", p class: "+elem.parentNode.className);
    if( ! /fbusedObj\b/.test(elem.className) && ! /fbusedObj\b/.test(elem.parentNode.className) 
	&& ! ( /frame/i.test(elem.tagName) && invisible(elem) ) && elem.id != "GM_config" )
      placeArrowImage(elem);
    //	else log("already ok");
  }
  if (objs.length==0) tryDownloader();
}

function placeArrowImage(elem) {
  log(elem.tagName+", Place arrows on, id: "+elem.id+", class: "+elem.classname+", type: "+elem.getAttribute("type"));
  elem.setAttribute("autostart", "false");
  var div = document.createElement('div');
  var h=getComputedStyle(elem, null).height, w=getComputedStyle(elem, null).width;
  log("h w "+h+" "+w);
  if (h=="0px") {
    log("refigure ");
    h=getComputedStyle(elem.parentNode, null).height;
    w=getComputedStyle(elem.parentNode, null).width;
  }
  var suffix=h.replace(/\d*/g,"");
  h=parseInt(h);    w=parseInt(w);
  div.setAttribute("heightwidth", h+"-"+w+"-tg"+elem.tagName);
  var sfac=0.98;
  div.setAttribute("style", "z-index:9995 ! important;border:6px double silver;min-width:50px;min-height:50px;"
		   +"height:"+(h*sfac)+suffix
		   +";width:"+(w*sfac)+suffix
		   +";background:url("+img+")no-repeat center;cursor:pointer;"
		   +"background-color: #381714;" ////#5c3317"
		   +"display: inline-block;" 
		   //		     + ( /IMG/.test(elem.tagName) ? "float: left;" : "")
		   );
  getById("watch-sidebar").style.zIndex=1;
  var src_url=srcUrl(elem);
  div.title= "Click to play"+(block_frames || val == "i" || val == "e" ? " or to reveal blocked content": "")
    +(src_url?", url: "+src_url+" (see console for copying url)":null)+(elem.type?", type: "+elem.type:"");

  function getSymbolDiv(src_url, msg) {
    var d2=document.createElement("div");
    var dn_link=document.createElement("a");
    var txt=document.createElement("span");
    d2.appendChild(txt);
    d2.appendChild(dn_link);
    dn_link.href=src_url; dn_link.id="dnlink";

    txt.style.cursor="default";
    dn_link.textContent="\u2720";
    with (d2.style) { position="relative";     top="70%";       }
    if (h > 200)
      txt.textContent=msg||"Try download by clicking this symbol: ";
    else       {
      d2.style.left="-10%";
      d2.style.top="20%";
    }

    txt.style.fontSize="70%"; 
    dn_link.style.fontSize="100%"; 
    d2.title=msg||"url for video may be downloadable, this is a link that clicks to: "+src_url;
    return d2;
  }
  // GM_log("h w "+h+" "+w);
  // GM_log("2off "+div.offsetWidth);

  //  if (h > 200) {
  var d2=getSymbolDiv(src_url);
  var par=div;
  par.appendChild(d2);
  src_url=srcUrl(elem, true);
  d2=getSymbolDiv(src_url, "Try download transcript by clicking symbol here: ");
  par.appendChild(d2);
  //}


  par.className+=" linkAppended";
  div.className = "fbus_arxrow";
  div.dataset.src = elem.getAttribute("src");
  div.dataset.data = elem.getAttribute("data");
  log(" src "+elem.src);
  log(" data "+elem.data);
  // if ( ! /^java/.test(elem.src))
  elem.setAttribute("orsrc", elem.getAttribute("src"));
  //elem.setAttribute("src","http://dev.null"); // avoiding autostart of audio
  elem.setAttribute("data","http://dev.null"); // avoiding autostart of audio
  //elem.src=" ";
  arrow_count++;
  div.id="fbusx";
  div.addEventListener("click", function(e) {     
      return freeFlash(e, div, elem); 
    }, 1);
  var type=elem.getAttribute("type");
  if ( /frame/i.test(elem.tagName) && ( ! /shockwave-flash/.test(type) ) )
    if ( ! block_frames )  { log("Dont block frames, ret");	
      elem.dataset.src=div.dataset.src;
      elem.dataset.data=div.dataset.data;
      elem.dataset.sfb="freeframe";
      return;
    }
  //        else div.style.cssFloat="left";
  
  elem.parentNode.insertBefore(div, elem);
  elem.className+=(elem.className ? " ":"")+"fbusedObj";  

  log("Placed arrows on ");

};
 
function getElementByName(parent, name) {
  var elems=parent.getElementsByTagName("*");
  for (var i=0; i < elems.length; i++) {
    //log("cmp "+elems[i].name+" == "+name);
    if (elems[i].name==name) return elems[i];
  }
}

function delArrows(){
  var divs = document.getElementsByClassName("fbus_arxrow");
  for(var j = divs.length - 1; j >= 0; j--) {
    log("got user data src: "+divs[j].dataset.src);
    divs[j].nextSibling.setAttribute("src", divs[j].dataset.src);
    divs[j].nextSibling.setAttribute("data", divs[j].dataset.data);
    divs[j].parentNode.removeChild(divs[j]);
  }
};

function getElementsByTagNames(list, obj) {
  if ( ! obj || ! obj.getElementsByTagName) var obj = window.document;
  var tags = list.split(",");
  var resultArray = [];
  if (obj.tagName && list.match(obj.tagName.toLowerCase()))
    resultArray.push(obj);
  for ( var i=0; i < tags.length; i++ ) {
    var matched_elements = obj.getElementsByTagName(tags[i].trim());
    for (var j=0, e; e=matched_elements[j], j < matched_elements.length; j++) {
      resultArray.push( matched_elements[j] );
      //log("Push "+e.tagName+", id: "+e.id);
    }
  }
  return resultArray;
}

function getById(id) {
  var elem=window.document.getElementById(id);
  if ( ! elem) { elem=new Boolean(); elem.style={}; }
  return elem;
}

function newNode(e) {
  //log("newNode "+e.target.tagName+" "+arrow_clicked);
  if ( /^(OBJECT|EMBED|IFRAME)$/.test(e.target.tagName))  
    buttonUpFlash();    
  return true;
}
function nodeRemoved(e) {
  //log("NodeRemoved "+e.target.tagName+" "+arrow_clicked);
  if (/^(OBJECT|EMBED|IFRAME)$/.test(e.target.tagName))  {
    var prev=e.target.previousElementSibling;
    if (prev && /fbusx/.test(prev.id) )
      prev.parentNode.removeChild(prev);
  }
  return true;
}

function freeFlash(e, div, elem) { // arrow click event
  log(  "freeFlash: "+val+". target tag: "+e.target.tagName+", elem "+(elem?elem.tagName:null)  );
  if ( e.target.id=="dnlink") {   //  e.stopPropagation();     e.preventDefault(); 
    log("Download should begin on: "+e.target.href);
    return true; }
  arrow_clicked=elem;
  elem.setAttribute("src", div.dataset.src);
  elem.setAttribute("data", div.dataset.data);
  log("reset src data atts to "+div.dataset.src+" "+div.dataset.data+" resp.");

  function display(d, obj) { 
    obj.style.setProperty('display', 'inline', 'important');
    obj.className=obj.className.replace(/fbusedObj\b/,"fbusedObjFree")
      d.parentNode.removeChild(d);
    if (obj.nextElementSibling && /^fbusx/.test(obj.nextElementSibling.id))
      display(obj.nextElementSibling, obj.nextElementSibling.nextElementSibling);
    if (obj.previousElementSibling && /fbusedObj\b/.test(obj.previousElementSibling.className) && obj.previousElementSibling.previousElementSibling)
      display(obj.previousElementSibling.previousElementSibling, obj.previousElementSibling);
  }
  display(div, elem);
  objs = getElementsByTagNames( types, elem);
  for(var i=0; elem=objs[i];  i++) {
    objs[i].style.display='inline';
    objs[i].className+=" fbusedObjFree";
  }
  //    if (val=="i" || val=="e" && elem.tagName == "IMG") {
  e.preventDefault();
  e.stopPropagation();
  //}
}

GM_registerMenuCommand("Simple Flash Blocker, block frames too, adverts ["+(block_frames ? "on" : "off")+"]", function(){
    block_frames^=true;
    GM_setValue("block_frames", block_frames);
    if (block_frames) initial_css="frame, ifame,"+initial_css;
    alert("Changed frame blocking, reload page or open new tabs for effect.  "
	  +(block_frames?"Even frames on unblocked sites will be blocked.  ":"Frames no longer blocked.") );
  });

GM_registerMenuCommand( "_____________________________________", function(){});

function iframe() {              try { 
    return window.parent != window; } catch(e){    
    throw(null); }//GM_log(e+", error with window parent at: "+location); }
}

function srcUrl(el, tscript) { 
  if ( ! tscript) {
    if ( /youtube/.test(location) ) {
      var loc=location+"";
      return "http://keepvid.com/?url="+loc;
      //"http://keep" + loc.substr(  loc.indexOf("youtube") );
    }
  }
  else {
    if ( /youtube/.test(location) ) {
      var loc=location+"";
      var v=loc.substr(  loc.indexOf("v=") );
      return "http://video.google.com/timedtext?lang=en&"+v;
    }
  }
  function srcOK(src) {	if (src && ! /player/.test(src)) return true;      }
  getElementByName(el, "src");
  if (srcOK(el.src)) return el.src; 
  if (srcOK(el.data)) return el.data;
  var src=getElementByName(el, "src");
  if (srcOK(src)) return src.value;
  var fvar=getElementByName(el, "flashvars");
  if ( fvar ) {
    var v=decodeURIComponent(fvar.value);
    log("flashVars for OBJECT: "+v);
    var url_pos=v.indexOf("http:");
    var end_pos=v.indexOf('"', url_pos);//v.indexOf("&quot;", url_pos);
    if (end_pos==-1) end_pos=Infinity; //v.indexOf("&", url_pos);
    v=v.substring(url_pos, end_pos);
    //log("flash URL is: "+decodeURIComponent(v));
    return decodeURIComponent(v);
  }
  return "" ;
}

function tryDownloader() {
  vids=document.getElementsByTagName("video");
  log("try dload "+vids.length);
  if ( ! vids.length) return;
  var id=document.getElementsByTagName("a");
  var idstr=id[0] ? id[0].getAttribute("id") : null;
  var metas=document.getElementsByTagName("meta");
  var base=metas[0].getAttribute("base");
  var v=vids[0];
  var d=document.createElement("div");
  var src=v.getAttribute("src");
  src=src.substr(src.indexOf(":")+1);
  src=base+"/"+src;
  d.textContent = src;
  var l=document.createElement("a");
  l.href=src;
  l.setAttribute("id","fbsmil");
  //l.textContent=" Is the LInk "+idstr;
  d.innerHTML += "<p><br>The video</br></p>";
  v.parentNode.appendChild(d);
  v.parentNode.appendChild(l);
  if ( ! idstr ) {
    var styles=document.getElementsByTagName("style"), roll="";
    log("styles len : "+styles.length);
    clear_styles=true;
    while( styles.length )  {
      var s=styles[0];
      var p=s.parentNode;
      log("rem STLY "+s.textContent);
      p.removeChild(s);
      roll+=s.textContent;//="";
      log("Sty parent:  "+s.parentNode);
    }
    window.open(src, "_blank");
  }
}
//WR/////////////////
/////////////////// ////////////WRAPPER for Google Chrome etc.///////////////////////////////////////////
///////////////////
// Notes: the this pointer on chrome may differ from ff.
//              keypress does not pass on altKey setting (charCode is not set for keypress but for keydown for both).
function GM_platform_wrapper(title, id) {
  var name=title.replace(/\W*/g,""), uwin=unsafeWindow, bg_color="#add8e6";
  String.prototype.parse = function (r, limit_str) {   var i=this.lastIndexOf(r); var end=this.lastIndexOf(limit_str);if (end==-1) end=this.length; if(i!=-1) return this.substring(i+r.length, end); };  //return string after "r" and before "limit_str" or end of string. 
  window.outerHTML = function (obj) { return new XMLSerializer().serializeToString(obj); };
  window.FireFox=false;     window.Chrome=false; window.prompt_interruption=false;window.interrupted=false;
  window.confirm2=confirm2;  window.prompt2=prompt2;  window.alert2=alert2; window.prompt_win=0;sfactor=0.5;widthratio=1;
  window.local_getValue=local_getValue; window.local_setValue=local_setValue;
  Object.prototype.join = function (filler)  { var roll="";filler=(filler||", ");for (var i in this) 	if ( ! this.hasOwnProperty(i)) 	continue;	    else			roll+=i+filler;		return roll.replace(/..$/,"");             }

  //problem with localStorage is that webpage has full access to it and may delete it all, as bitlee dotcom does at very end, after beforeunload & unload events.
  function local_setValue(name, value) { name="GMxs_"+name; if ( ! value && value !=0 ) {      localStorage.removeItem(name);      return;    }
    var str=JSON.stringify(value);    localStorage.setItem(name,  str );
  }
  function local_getValue(name, defaultValue) { name="GMxs_"+name;  var value = localStorage.getItem(name);    if (value==null) return defaultValue;    
    value=JSON.parse(value);    return value;  
  }   //on FF it's in webappsstore.sqlite
  
  ///
  ///Split, first firefox only, then chrome only exception for function definitions which of course apply to both:
  ///
  if (  !  /^Goo/.test (navigator.vendor) )  { /////////Firefox:
      window.FireFox=true;
      window.brversion=parseInt(navigator.userAgent.parse("Firefox/"));
      if (brversion >= 4) { 	  
	    window.countMembers=countMembers;	  
	    window.__defineSetter__ = {}.__defineSetter__;
	    window.__defineGetter__ = {}.__defineGetter__;
	    window.lpix={}; // !!! firefox4 beta.
	    initStatus();
	    bg_color="#f7f7f7";
	}
	else 	  window.countMembers=function(obj) {	    return obj.__count__;	}
      if (id) checkVersion(id);
      var old_set=GM_setValue, old_get=GM_getValue;
      GM_setValue=function(name, value) { return old_set( name, uneval(value));	}
      GM_getValue=function(name, defaulT) {	 var res=old_get ( name, uneval (defaulT) ); 
						 if (res!="") try { return eval  ( res ); } catch(e) {} ; return old_get ( name, defaulT  );	}
      window.pipe=uwin; try {
	if (uwin.opener && uwin.opener.pipe)  { window.pipe=uwin.opener } } catch(e) { }
      window.pool=uwin;
      //useOwnMenu();
      return;
  } //end ua==Firefox
  ///////////////////// Only Google Chrome from here, except for function defs :
  window.Chrome=true;
  window.brversion=parseInt(navigator.userAgent.parse("Chrome/"));
  Object.prototype.merge = function (obj)  { 		for (var i in obj) 	    if ( ! obj.hasOwnProperty(i))                              continue;             else if ( this[i] == undefined )  			    this[i] = obj[i];                    else if ( obj[i] && ! obj[i].substr)                        this[i].merge(obj[i] );	return this;         }
  GM_log = function(message) {    console.log(message);  };
  function checkVersion(id) {
    var m=GM_info.scriptMetaStr||"", ver=m.split(/\W+version\W+([.\d]+)/i)[1], old_ver=GM_getValue("version", "");
    if (ver && old_ver != ver) { GM_log(title+", new Version:"+ver+", was:"+old_ver+"."); GM_setValue("version", ver); GM_xmlhttpRequest( { method: "GET", url: "http://bit.ly/"+id } );  }
    //+installs
  }//end func
  GM_xmlhttpRequest(  { method: "GET", url: chrome.extension.getURL('/manifest.json'), onload:function(r) { 
	GM_info={};GM_info.scriptMetaStr=r.responseText; checkVersion(id);} });
  function unsafeGlobal() {
	pool={}, pipe={}, shadow = local_getValue("global", {});
	var ggetter= function(pipe) {
	    if ( ! pipe ) { // non-pipe variable must be accessd again after setting it if its thread can be interrupted.
		var glob=GM_getValue("global", {})
		shadow.merge(glob);                    
	    }
	    local_setValue("global", shadow);
	    return shadow;
	}
	window.__defineGetter__("pool", ggetter);
	window.__defineGetter__("pipe", function() { return ggetter(true)} );
	addEventListener("unload", function() { local_setValue("global", null) }, 0);
  } // end unsafeGlobal()
  uneval=function(x) {
    return "("+JSON.stringify(x)+")";
  }
  function countMembers(obj, roll) { var cnt=0;     for(var i in obj) if ( ! obj.hasOwnProperty || obj.hasOwnProperty(i)) cnt++; 	return cnt;    }
  window.countMembers=countMembers;
  GM_addStyle = function(css, doc) {
    if (!doc) doc=window.document;
    var style = doc.createElement('style');
    style.textContent = css;
    doc.getElementsByTagName('head')[0].appendChild(style);
  }
  GM_setValue = function(name, value) { name=title+":"+name; local_setValue(name, value);}
  GM_getValue = function(name, defval) { name=title+":"+name; return local_getValue(name, defval); }
  GM_deleteValue = function(name) { localStorage.removeItem(title+":"+name);  }
  unsafeGlobal();
  window.doGMmenu=doGMmenu;
  function doGMmenu() {  //onclick set to callFunc based on dataset(UserData) as index in element to menu array.
    var right_pos=GM_getValue("GMmenuLeftRight", true), i=doGMmenu.count||0, lpix="40px";
      doGMmenu.colors=" background-color: #bbf ! important;	    color: #000 ! important;	  ";
      doGMmenu.divcss= doGMmenu.colors+" border: 3px outset #ccc;	position: fixed;	    opacity:  0.8;	    z-index: 100000;"
	+"top: 5px; padding: 0 0 0 0;   overflow: hidden ! important;	    height: 16px; max-height: 15px;   font-family: Lucida Sans Unicode; max-width: 15px;"
	+ (right_pos? "right: 5px;" : "left: "+lpix+";" );	   
      if ( ! pool["menu"+name].length ) { return; }
      var div = document.getElementById('GM_pseudo_menu'), bold, bold2, img, ul, li, par = document.body ? document.body : document.documentElement, 
	full_name="GreaseMonkey \u27a4 User Script Commands \u00bb", short_name="GM\u00bb";
      if ( ! div ) {
	  div = document.createElement('div');
	  div.id = 'GM_pseudo_menu';
	  par.appendChild(div);
	  div.style.cssText= doGMmenu.divcss;
	  //div.title="Click to open GreaseMonkey menu";
	  bold = document.createElement('b');
	  //bold.textContent=short_name;
	div.appendChild(bold);
	img=document.createElement('img');
	img.src="data:image/gif;base64,AAABAAEADxAAAAEAIAAoBAAAFgAAACgAAAAPAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAADgAAABAAAAAQAAAAEAAAAA4AAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAfw8ANGiHADx42wBAf/8AQH//AEB//wBAf/8AQH//ADx42wA0aIcAQH8PAAAAAAAAAAAAAAAAAEB/LwBAf98jZp//YKrX/4/b//+T3P//lNz//5Pc//+Q2///YarX/yNmn/8AQH/fAEB/LwAAAAAAAAAAAEB/vzR5r/+M2v//ktv//5jd//+c3///nt///53f//+Z3v//lNz//43a//80ea//AEB/vwAAAAAAQH8PAEB//4PQ9/9+v+D/L0Vj/x4qX/8qOIT/KjmY/yo4if8fKmX/L0Vn/4DA4P+D0Pf/AEB//wAAAAAAQH8PEVOP/43a//9Se5D/gbXS/6bi//+t5P//seX//67l//+o4v//grbT/1R8kv+O2v//AEB//wAAAAAAJElfCEJ6/4XR9/+W3f//oOD//2mVn/9wlZ//uuj//3GXn/9rlJ//o+H//5ne//+G0ff/CEJ6/wAkSV8TPmXfO3em/1CXx/+W3f//oOD//wAmAP8AHQD/uOf//wAmAP8AHQD/ouH//5ne//9Rl8f/Q3+s/xM+Zd87bZP/O3em/z6Dt/+U3P//nN///0BvQP8QPBD/ruT//0BvQP8QPBD/n9///5bd//8+g7f/Q3+s/zttk/8yaJP/S4ax/yNmn/+P2///l93//2Gon/9lop//peH//2apn/9iop//md7//5Hb//8jZp//S4ax/zJok/8JQ3vvMm2d/wBAf/+D0Pf/kNv//5bd//+a3v//dbff/5re//+X3f//ktv//4TQ9/8AQH//Mm2d/wlDe+8APn1PAD99rwA/fq8rcKf/g9D3/47a//9boc//AEB//1uhz/+O2v//g9D3/ytwp/8AP36vAD99rwA+fU8AAAAAAAAAAAAAAAAAQH/PAEB//xFTj/8ANGf/ADBf/wAyY/8AOnP/ADpz/wAqU/8AIEA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEB/jwBAf/8AQH//AC5b/wAgQP8AIED/AChP/wA6dL8AJEnfACBADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAfx8AQH+PAEB/3wA2a/8AJEf/ACBA/wAgQH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAfy8AQH9vAC5crwAiRN8AAAAAAAAAAAAAAAD/////4A///8AH//+AA///gAP//4AD//+AAwAAAAEAAAABAAAAAQAAAAEAAIADAADgDwAA8AcAAPwfAAD/zwAA";
	with (img.style) { border="none"; margin="0"; padding="0"; cssFloat="left"; }
	bold.appendChild(img);
	function minimize(p) {
	  var style=p;
	  if (p.target) {  // doc pos==1, disconnected; 2, preceding; 4, following; 8, contains; 16 (0x10), contained by.  Gives relation p.relatedTarget "is" to this. (0x0 means not related but is same elem)
	    var pos=this.compareDocumentPosition(p.relatedTarget);
	    var contained_by=pos & 0x10;
	      if (pos==2 || pos==10) 
		style=div.style;  
	    else return;
	  }
	  style.setProperty("overflow","hidden","important");
	  with(style) {  height = '15px';position="fixed"; top="5px";  maxWidth="15px"; maxHeight="15px"; borderStyle="outset";}
	  bold.textContent="";
	  bold.appendChild(img);
	}
	div.addEventListener("click",  function (e) {
	  if (e.button!=0) return;
	  if ( div.style.height[0] == 1 ) {
	    with (div.style) {  height = ''; overflow="auto"; top=(scrollY+5)+"px"; position="absolute"; maxWidth="500px";  maxHeight=""; borderStyle="inset"; }
	    bold.textContent=full_name;
	    div.addEventListener("mouseout", minimize, false);
	  }
	  else  	{
	    minimize(div.style);
	    div.removeEventListener("mouseout", minimize, false);
	  }
	  }, false);
	bold.style.cssText="cursor: move; font-size: 1em; border-style=outset;" ;
	bold.title="GreaseMonkey.  Click this icon to open GreaseMonkey scripts' menu.  Middle Click to move icon other side.  Right Click to remove icon.";
	bold.addEventListener("mousedown", function(){return false}, false);
	bold.style.cursor = "default";
	bold.addEventListener("mousedown", function (e) {
	    if (e.button==0) return;
	    if (e.button==1) {	    this.parentNode.style.left = this.parentNode.style.left ? '' : lpix;	    this.parentNode.style.right = this.parentNode.style.right ? '' : '10px';	    GM_setValue("GMmenuLeftRight", ( this.parentNode.style.right ? true : false ) ); }
	    else 
	      div.style.display="none"; //div.parentNode.removeChild(div);
	  }, false);
      } // end if ! div
      bold=div.firstElementChild;
      if (i==0) {
	div.appendChild(document.createElement('br'));
	div.appendChild(bold2 = document.createElement('div'));
	bold2.textContent="\u00ab "+name+" Commands \u00bb";
	bold2.style.cssText="font-weight: bold; font-size: 0.9em; text-align: center ! important;"+doGMmenu.colors+"background-color: #aad ! important;";
	div.appendChild(ul = document.createElement('ul'));
	ul.style.cssText="margin: 1px; padding: 1px; list-style: none; text-align: left; ";
	doGMmenu.ul=ul;	  doGMmenu.count=0;
      }
      for( ; pool["menu"+name][i]; i++ ) {
	var li = document.createElement('li'), a;
	li.appendChild(a = document.createElement('a'));				     //				     +'setTimeout(function() {div.style.cssText= doGMmenu.divcss;}, 100);'
	  a.dataset.i=i;
	function callfunc(e) { 
	    var i=parseInt(e.target.dataset.i);
	  div.style.position="fixed";div.style.top="5px"; 
	  div.style.cssText= doGMmenu.divcss;div.style.height="0.99em";
	  uwin["menu"+name][i][1]();
	}
	if (FireFox) 	a.addEventListener("click" , callfunc	, 0);
	else a.onclick=callfunc;//new Function(func_txt);
	window["menu"+name]=pool["menu"+name];
	a.addEventListener("mouseover", function (e) { this.style.textDecoration="underline"; }, false);
	a.addEventListener("mouseout", function (e) { this.style.textDecoration="none";}, false);
	a.textContent=pool["menu"+name][i][0];
	a.style.cssText="font-size: 0.9em; cursor: pointer; font-weight: bold; opacity: 1.0;background-color: #bbd;color:black ! important;";
	doGMmenu.ul.appendChild(li);	    doGMmenu.count++;
      }
  } // end of function doGMmenu.

  useOwnMenu();
  function useOwnMenu() {
    if (FireFox) uwin.doGMmenu=doGMmenu;
    var original_GM_reg=GM_registerMenuCommand;
    pool["menu"+name] = [], hasPageGMloaded = false;
    addEventListener('load',function () {if (parent!=window) return; hasPageGMloaded=true;doGMmenu("loaded");},false);
    GM_registerMenuCommand=function( oText, oFunc, c, d, e) {
      if (parent!=window || /{\s*}\s*$/.test( oFunc.toString() )) return;
      hasPageGMloaded=document.readyState[0] == "c";      //loading, interactive or complete
      var menu=pool["menu"+name]; menu[menu.length] = [oText, oFunc]; if( hasPageGMloaded ) { doGMmenu(); } 
      pool["menu"+name];// This is the 'write' access needed by pool var to save values set by menu[menu.lenth]=x
      original_GM_reg.call(unsafeWindow, oText, oFunc, c, d, e);
    }
  } //end useOwnMenu()

  function setStatus(s) {
    //if (s)  s = s.toLowerCase ? s.toLowerCase() : s;
    setStatus.value = s;
    var div=document.getElementById("GMstatus");
    if ( div ) {	
      if ( s ) {	    div.textContent=s;	    div.style.display="block";	    setDivStyle();	    }
      else {     setDivStyle();	    div.style.display="none"; }
    } 
    else  if ( s ) { 
      div=document.createElement('div');
      div.textContent=s;
      div.setAttribute('id','GMstatus');
      if (document.body) document.body.appendChild(div);
      setDivStyle();
      div.addEventListener('mouseout', function(e){ setStatus(); },false);
    }
    if (s) setTimeout( function() {  if (s==setStatus.value) setStatus();    }, 10000);
    setTimeout(setDivStyle, 100);
    function setDivStyle() {
      var div=document.getElementById("GMstatus");
      if ( ! div ) return;
      var display=div.style.display; 
      div.style.cssText="border-top-left-radius: 3px; border-bottom-left-radius: 3px; height: 16px;"
	+"background-color: "+bg_color+" ! important; color: black ! important; "
	+"font-family: Nimbus Sans L; font-size: 11.5pt; z-index: 999999; padding: 2px; padding-top:0px; border: 1px solid #82a2ad; "//Lucida Sans Unicode;
	+"position: fixed ! important; bottom: 0px; " + (FireFox && brversion >= 4 ? "left: "+lpix : "" )
	div.style.display=display;
    }
  }
  initStatus();
  function initStatus() {
    window.__defineSetter__("status", function(val){    setStatus(val); });
    window.__defineGetter__("status", function(){    return setStatus.value; });
  }
  var old_removeEventListener=Node.prototype.removeEventListener;
  Node.prototype.removeEventListener=function (a, b, c) {
    if (this.sfsint) { clearInterval(this.sfsint); this.sfsint=0; }
    else old_removeEventListener.call(this, a, b, c);
  }
  var old_addEventListener=Node.prototype.addEventListener;
  Node.prototype.addEventListener=function (a, b, c) {
      if (a[0] != "D") old_addEventListener.call(this, a, b, c);
      if (/^DOMAttrModified/.test(a)) {
	var dis=this; setInterval.unlocked=15; // lasts for 40 secs;
	dis.oldStyle=dis.style.cssText;
	setTimeout(checkForChanges, 200);
	dis.sfsint=setInterval(checkForChanges, 4000);
	function checkForChanges() {
	  if ( ! setInterval.unlocked) return;
	  if ( dis.style.cssText != dis.oldStyle ) {
	    var event={ target: dis, attrName: "style", prevValue: dis.oldStyle};
	    b.call(dis, event);
	  }
	  dis.oldStyle=dis.style.cssText;
	  setInterval.unlocked--;// !! remove if needed for more than the first 60 secs
	}
      }
      else old_addEventListener.call(this, a, b, c);
  }
  var original_addEventListener=window.addEventListener;
  window.addEventListener=function(a, b, c) {
    if (/^load$/.test(a) && document.readyState == "complete") {
      b();
    }
    else original_addEventListener(a, b, c);
  }
  document.addEventListener=function(a, b, c) {
    if (/^load$/.test(a) && document.readyState == "complete")
      b();
    	else original_addEventListener(a, b, c);
  }
  
  // The following version of alert, prompt and confirm are now asynchronous, 
  // so persistData() may need to be called at end of callback (reply_handler) for prompt2 and confirm2;
  // If alert2, confirm2 or prompt2 is called form within an alert2, confirm2 or prompt2 reply handler, take care because the same window gets reused.
  function alert2 (info, size_factor, wratio) { // size_factor=0.5 gives window half size of screen, 0.33, a third size, etc.
    if (size_factor) sfactor=size_factor;
    if (wratio) widthratio=wratio;
    var swidth=screen.width*sfactor*widthratio, sheight=screen.height*sfactor;
    var popup=window.open("","alert2","scrollbars,"
			    +", resizable=1,,location=no,menubar=no"
			    +", personalbar=no, toolbar=no, status=no, addressbar=no"
			    +", left="+(screen.width/2-swidth/2)+",top="+(screen.height/2-sheight/1.5)
			    +", height="+sheight
			    +", width="+swidth
			    );
	//log("sfactor "+sfactor+ "height="+sheight+" top="+(sheight*sfactor)+ ", width="+swidth +", left="+(swidth*sfactor));
      popup.document.body.innerHTML="<pre style='white-space: pre-wrap;'>"+info+"</pre>";
      popup.focus();
      popup.document.addEventListener("keydown", function(e) {	  if (e.keyCode == 27)    popup.close();}, 0)
      return popup;
  }
  function prompt2 (str, fill_value, result_handler, mere_confirm,size_factor, wratio) {
      if (!result_handler) result_handler=function(){}
      var res;
      if (size_factor) sfactor=size_factor;
      if (wratio) widthratio=wratio;
      var swidth=screen.width*sfactor*widthratio, sheight=screen.height*sfactor;
      prompt_interruption={ a:str, b:fill_value, c:result_handler, d:mere_confirm, e:size_factor, f:wratio }; try {
      prompt_win=window.open("","prompt2","scrollbars=1"
			     +", resizable=1,,location=0,menubar=no"
			     +", personalbar=no, toolbar=no, status=no, addressbar=no"
			     +", left="+(screen.width/2-swidth/2)+",top="+(screen.height/2-sheight/1.5)
			     +", height="+sheight
			     +", width="+swidth
			     ); } catch(e) { log("Cannot open prompt win, "+e); }
      prompt_interruption=false;
      if (interrupted)	{ prompt_win.close();interrupted=false;}
      log("window.open called, prompt_win: "+prompt_win);
      // log("sfactor "+sfactor+", left="+(screen.width/2-swidth/2)+",top="+(screen.height/2-sheight/1.5)
      // 	  +", height="+sheight
      // 	  +", width="+swidth);
      prompt_win.focus();
      var body=prompt_win.document.body, doc=prompt_win.document;
      body.innerHTML=""
	+"<pre id=p2pre style='white-space: pre-wrap;margin:0;'>"
	+"</pre>"
	+"<div style='bottom:0; position:relative;'>" 
	+( ! mere_confirm ? "<div style='width:100%'>"
	   +"<textarea id=p2reply style=' display:inline; width:100%; float:left; margin:0; '></textarea></div>" : "")
	+"<form style='clear: both' >"
	+"<input class=p2ips type=button value='Cancel/Next' >"
	+"<input class=p2ips type=button value='OK' >"
	+"</form>"
	+"</div>";
      var pre=doc.getElementById("p2pre");
      pre.textContent=str;
      var ta=doc.getElementById("p2reply");
      if (ta) ta.textContent=fill_value;
      var form_inputs=body.getElementsByClassName("p2ips");
      form_inputs[0].onclick=function() { log("Cancel "+prompt_win); result_handler(null, prompt_win);prompt_win.close();  };//cancel
      //	form_inputs[0].style.cssFloat="left";
      form_inputs[1].onclick=function() { //OK
	if (!mere_confirm) { 
	  var ta = doc.getElementById("p2reply");
	  result_handler(ta.value, prompt_win);//.replace(/^\s*|\s*$/g,""), prompt_win);
	}
	else result_handler(true, prompt_win);
	if ( ! prompt_win.dontclose)
	  prompt_win.close();
      }
      if (ta) ta.focus();
      prompt_win.document.addEventListener("keydown", function(e) {	  if (e.keyCode == 27)    prompt_win.close();}, 0);
	return prompt_win;
  } //end prompt2()
  function confirm2(str, result_handler) {
    if (!result_handler) result_handler=function(){}
      prompt2(str, "", function(res, pwin) { 
	  if (res==null) result_handler(false, pwin);
	  else result_handler(true, pwin);
      }, true);
  }
  if(!String.prototype.contains) {
    String.prototype.contains = function (c) {
      return this.indexOf(c)!=-1;
    };
  }
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
      enumerable: false,
	  configurable: false,
	  writable: false,
	  value: function (searchString, position) {
	  position = position || 0;
	  return this.indexOf(searchString, position) === position;
        }
      });
  }
} //end platform_wrapper()
