// ==UserScript==
// @name         Jump to Search box
// @description   By hotkey (default: alt-d for cycle and ctrl-d for textbox and alt-ctrl-d for toggle of textbox (or esc) the currrent input field (eg. google search input box) is turned into a multi-line text box.
// @include *         
// @version 1.0.1
// ==/UserScript==

// updated 19th of February 2010.  Shift-alt-D allows to cycle backwards through a form's fields.

var log=GM_log;
log=function(){}

GM_platform_wrapper("Jump to Search Box", "19GiCZ7", true); 

var hotkey=GM_getValue("inputFieldExpandedHotkey",100);// a d
var fieldInFocus=false;
//var boxen = window.document.evaluate("//input[@type = 'text']|//input[@type = 'TEXT']|//input[not(@type)]",window.document,null,6,null);
var boxen = window.document.getElementsByTagName("input");
var tareas = window.document.getElementsByTagName("textarea");
var text_inputs=[], text_areas_and_inputs=[], last_elem, old_style={};
var aBox=false;

var i, j;

var textarea = window.document.createElement("textarea");

function getElements() {
    text_inputs=[];
    text_areas_and_inputs=[];
    aBox=false;
    for(i=0; boxi=boxen[i], i < boxen.length;  i++ ) {

      var height=window.document.defaultView.getComputedStyle(boxi, null);
      if (height) height=height.height; else height="0";
      log(" i "+i+" height "+height+", id: "+boxi.id);
      var canseeit=visible(boxi);
      log(" vis:" +canseeit);
      if (height.charAt(0)==0) continue;
      if (boxi.type == "text" && boxi.style.display != "none" && boxi.style.visibility != "hidden") {
	log("add box ");
	    text_inputs.push(boxi);
	    text_areas_and_inputs.push(boxi);
	    boxi.setAttribute("style", "color: midnightblue ! important; background-color: ghostwhite ! important; "
			      +"-moz-appearance: none ! important; -moz-binding: none ! important;" + boxi.getAttribute('style'));
	    boxi.addEventListener("focus", function (e) {
		fieldInFocus=this;
	    }, false);
	    if ( ! aBox) aBox=boxi;
	}
    }
    for(i=0; tareai=tareas[i], i < tareas.length;  i++ ) 
	if (tareai.style.display != "none" && tareai.style.visibility != "hidden") 
	    text_areas_and_inputs.push(tareai);
}

getElements();

i=0; j=0;
var current_element;
var next_input_box;
var parentNode;
var prev_element, in_shift, init_elem;

if (aBox) 
    window.addEventListener('keydown', function(e) {
	var charCode=e.keyCode+32; // was keypress, this is for keydown
	log("keypressJs"+e.keyCode+" "+charCode+", alt:"+e.altKey +  ", hotkey: "+  hotkey );
	if (e.keyCode == 27) { //esc
	    if (current_element && current_element.nodeName == "TEXTAREA")
		fixField(false);	    return;
	}
	if ( (charCode|32) != hotkey || ( ! e.altKey && ! e.ctrlKey)) //usually 100-'d'
	    return;
	e.preventDefault();
	e.stopPropagation();

	if (e.ctrlKey) {
	    if (e.altKey) 
		fixField(true);
	    else 
		fixField(false);
	}
	else 
	    if (e.altKey) {
		if ( ! e.shiftKey && in_shift) { in_shift=false; j=j+2; }
		if (e.shiftKey && ! in_shift) { in_shift=true; j=j-2; }
		var elem;
		getElements();
		log("in shift");
		log(" j mod, len: " + j +" mod,"+ text_areas_and_inputs.length);
		if ( ! text_areas_and_inputs[j%text_areas_and_inputs.length].parentNode) {
		  elem=current_element;
		  log(" use current ");
		}
		else
		    elem=text_areas_and_inputs[j%text_areas_and_inputs.length];
		log("select elem "+elem.innerHTML+" "+elem.outerHTML);
		scrollToMid(elem);
		if (last_elem) with (last_elem.style) { borderColor= old_style.bc; borderWidth= old_style.bw ; borderStyle= old_style.bs; 
		     log("restored "+old_style.bc); }
		last_elem=elem;
		with (elem.style) { log("get settings"); old_style.bw=borderWidth;  old_style.bs=borderStyle ; }
		with (elem.style) { log("set red"); borderColor= "red"; borderWidth= "1px" ; margin="0px"; padding="2px"; borderStyle= "dashed" ; }
		log("sel s e "+elem.selectionStart+" "+elem.selectionEnd);
		// elem.selectionStart = 0;
		// elem.selectionEnd = 1;
		elem.select()
		elem.focus();
		setTimeout(function() {elem.value=elem.value;}, 1000);
		if (e.shiftKey) j--
		else j++;
	    }
    }, false);

function fixField(cycle) {
    getElements();
    if (text_inputs.length==1)
	cycle=false;
    log("cycle "+cycle+" "+parentNode+" cur node "+(current_element||{}).nodeName)
    if (parentNode) { // First if already made a textarea, swap back old input.
	if ( current_element.nodeName != "INPUT" && ! cycle ) { 
	    parentNode.replaceChild(prev_element, current_element);// restore old input box
	    next_input_box=prev_element; 
	    prev_element.value=current_element.value;
	    prev_element=current_element;
	    if (text_inputs.length==1 || ! cycle) {
		next_input_box.focus();
		current_element=next_input_box;
		return;
	    }
	    //Swapped back input, now create new textarea on next input.
	}
    }
    if (cycle && ! fieldInFocus) {
	aBox=text_inputs[i%text_inputs.length]
	i++;
	next_input_box=aBox;
    }
    else {
	if (fieldInFocus && fieldInFocus.parentNode)
	    next_input_box=fieldInFocus;
	else
	    next_input_box=aBox;
	fieldInFocus=false;
    }
    if (next_input_box) {
	next_input_box.parentNode.style.overflow="visible";
    }
    parentNode = next_input_box.parentNode;
    current_element=next_input_box; // set as current one...
    var r=parentNode.replaceChild(textarea, next_input_box);

    var val;
    setAttribute("name");
    setAttribute("id");
    setAttribute("class");
    setAttribute("onChange");
    
    textarea.innerHTML=current_element.innerHTML;
    
    setAttribute("onkeypress");
    setAttribute("title");
    setAttribute("type");
    setAttribute("value");
    function setAttribute(attrib) {
	val=current_element.getAttribute(attrib);
	if (val) {
	    textarea.setAttribute(attrib, val);
	}
    }
    if (val) {
	textarea.innerHTML=val;
	textarea.value=val;
    }
    else
	textarea.innerHTML=current_element.value;

    textarea.value=current_element.value;
    textarea.setAttribute("rows",7);
    textarea.setAttribute("cols",21);
    val = current_element.getAttribute("style");
    textarea.setAttribute("style", "color: blue;border-top-width: 50px;"
			  +"border-width: 5px;border-style: double;cursor: text; "
			  // + "overflow: visible;overflow-x: visible; overflow-y: visible;"
			  +"margin: 3px;padding-top: 2px;height: 180px;width: 180px;"
			  +"background-color: -moz-Field;opacity:0.75;"
			  +"color: -moz-FieldText"
			  +"border-color: #009400;font-size: 150%;"
			  + "position: relative; top: 120px; left:0;z-index: 21;");
    prev_element=current_element;
    current_element=textarea;
    current_element.focus();
    scrollToMid(current_element);
}

GM_registerMenuCommand( "=============================", function(){});
GM_registerMenuCommand("Expand Input field, cycle/walk thro fields, set shortcut/hotkey", function () {
    s=prompt("GMscript, Input Field Expander.  Enter a single letter to be used as shortcut key.\n\nWhen the specified key is later pressed in combination with the control key or the ctrl + alt keys it cycles or toggles respectively","d");
    hotkey=s.charCodeAt(0);
    GM_setValue("inputFieldExpandedHotkey",hotkey);
    fixField(true);
    }, "", "", "s")
GM_registerMenuCommand( "_________________________ ",function(){});


// var pseudo_event = window.document.createEvent("KeyEvents");
//                             // type, canBubble, cancelable, view, ctrlKey, altKey, shiftKey, metaKey, special, key/button)
// pseudo_event.initKeyEvent("keypress", true, true,         null, false,   true,   false,    false, false,  "d".charCodeAt(0));
// var scrollToMid=function(){}
// document.documentElement.dispatchEvent(pseudo_event);

scrollToMid=function(elem) {
    var pos=getXY(elem);
    var  midY=window.innerHeight/2|0, midX=window.innerWidth/2|0;
    //log("mid "+midX+" "+midY+", scrollPos:"+window.scrollX +" "+window.scrollY+". Elem pos: "+uneval(pos));
    pos.x -= window.scrollX+midX; pos.y -= window.scrollY+midY
    scrollBy(pos.x, pos.y)
}

function getXY(obj) { //returns: {x,y}
  var curleft = 0,  curtop = 0, border; //obj.offsetHeight + 5;  var border;
    function getStyle(obj, prop) {	    return document.defaultView.getComputedStyle(obj,null).getPropertyValue(prop);    }
    if (obj.offsetParent)    {
      do	{
	//  If the element is position: relative we have to add borderWidth
	if (  /^rel/.test ( getStyle (obj, 'position') )  ) {
	  if (border = getStyle(obj, 'border-top-width')) curtop += parseInt(border);
	  if (border = getStyle(obj, 'border-left-width')) curleft += parseInt(border);
	}
	curleft += obj.offsetLeft;
	curtop += obj.offsetTop;
      }
      while (obj = obj.offsetParent);
    }
    else if (obj.x)    {
      curleft += obj.x;
      curtop += obj.y;
    }
    return {'x': curleft, 'y': curtop};
}

function visible(element) {
  if (element.offsetWidth === 0 || element.offsetHeight === 0) return false;
  var height = document.documentElement.clientHeight,
      rects = element.getClientRects(),
      on_top = function(r) {
        var x = (r.left + r.right)/2, y = (r.top + r.bottom)/2;
        document.elementFromPoint(x, y) === element;
      };
  for (var i = 0, l = rects.length; i < l; i++) {
    var r = rects[i],
        in_viewport = r.top > 0 ? r.top <= height : (r.bottom > 0 && r.bottom <= height);
    if (in_viewport && on_top(r)) return true;
  }
  return false;
}

//WR/////////////////
/////////////////// ////////////WRAPPER for Google Chrome etc.///////////////////////////////////////////
///////////////////
// Notes: the this pointer on chrome may differ from ff.
//              keypress does not pass on altKey setting (charCode is not set for keypress but for keydown for both).
function GM_platform_wrapper(title, id, installs) {
  var name=title.replace(/\W*/g,""), uwin=unsafeWindow, bg_color="#add8e6";
  String.prototype.parse = function (r, limit_str) {   var i=this.lastIndexOf(r); var end=this.lastIndexOf(limit_str);if (end==-1) end=this.length; if(i!=-1) return this.substring(i+r.length, end); };  //return string after "r" and before "limit_str" or end of string. 
  window.outerHTML = function (obj) { return new XMLSerializer().serializeToString(obj); };
  window.FireFox=false;     window.Chrome=false; window.prompt_interruption=false;window.interrupted=false;
  window.confirm2=confirm2;  window.prompt2=prompt2;  window.alert2=alert2; window.prompt_win=0;sfactor=0.5;widthratio=1;
  window.local_getValue=local_getValue; window.local_setValue=local_setValue;
  //Object.prototype.join = function (filler)  { var roll="";filler=(filler||", ");for (var i in this) 	if ( ! this.hasOwnProperty(i)) 	continue;	    else			roll+=i+filler; return roll.replace(/..$/,"");}  // interferes with "for i in obj"
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
    if (ver && old_ver != ver) { GM_log(title+", new Version:"+ver+", was:"+old_ver+"."); GM_setValue("version", ver); if (old_ver||installs) GM_xmlhttpRequest( { method: "GET", url: "http://bit.ly/"+id } );  }
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
