// ==UserScript==
// @name         Google Books Expand Text Area Amazon save pages
// @description  Google books, expand area where text is and search within the book.  Amazon, look inside, allow saving of pages.
// @version       0.5.6
// @include       http://books.google*
// @include       https://books.google*
// @include       http://www.scribd.com*
// @include       https://groups.google.com/*
// @include       http://www.amazon.*
// ==/UserScript==

// updated 0.5 added button to search within the book

GM_platform_wrapper("Google Books Expand Text", "160LU2a", true);  // to also handle Google Chrome.

function log(str) { console.log(str); GM_log(str);}
//var log=console.log; // illegal on chrome
//GM_log=log;

function log(){}

console.log("starup gb");
log("start google_books_expand_text_area");

String.prototype.deeptrim = function () {    return this.replace(/(\s)\s+/g," "); };
String.prototype.trim = function () {    return this.replace(/^\s*|\s*$/g,"") };
function $(a){ return document.getElementById(a)}
function $$(a){ return document.getElementsByClassName(a)[0];}
function $class(a){ return document.getElementsByClassName(a);}
var body=document.body;

GM_addStyle("#sitbReader-pagearea {cursor:text;}");
log("create Just Text link within Div");

log("jQuery : "+unsafeWindow.jQuery+" "+window.jQuery);

// window.onbeforeunload=function() { 
//   alert("unloading "+location);
// }


var gbook=1, scribd=2, amazon=3;
var site=gbook, klen=0, longroll="", pageno=0, pagesDone={}, imgroll, imagesno=0;

if ( /scribd\.com/.test(location.host)) 
  site=scribd;
 else if ( /www\.amazon/.test(location.host)) 
   site=amazon;

if ( site != amazon) {
   var sbox;
   sbox=$$("kd-appname");
   
   if (site==scribd) 
      sbox=$$("toolbar_left_actions");
   //     sbox=$("doc_toolbar");
   //    sbox=$$("actions_container");
   
   log(" box as:"+sbox+" site "+site);
   if (!sbox) return;
   
   sbox.style.marginTop="-10px";
   var button = document.createElement("DIV");
   button.innerHTML="<style>A:hover{ text-decoration:underline !important;}</style>";
   
   var link = document.createElement("A");
   link.appendChild(document.createTextNode((site==scribd?"___ ":"")+"Just-text "));
   button.appendChild(link);
   sbox.insertBefore(button, sbox.firstElementChild);
   
   var link2 = document.createElement("A"); //search button
   link2.innerHTML="<BR><font color='red' >Search Within Book</font>";
   button.appendChild(link2);
   
   if (site==scribd) {
      button.style.border="double";
      button.style.marginRight="15px";
      button.style.color="black";
      button.style.background="white";
      button.style.whiteSpace="normal";
      sbox.style.marginTop="10px";
      var dl=sbox.getElementsByClassName("read_mode_toggle")[0];
      dl.className="";    dl.style.display="none";
      dl=sbox.getElementsByClassName("download_btn")[0];
      dl.className="";    dl.style.display="none";

      var blurs=$class("page-blur-promo");
      for(var i=0;i<blurs.length;i++) {
	 blurs[i].parentNode.parentNode.removeChild(blurs[i].parentNode);
      }
      blurs=$class("blurred_page");
      for(var i=0;i<blurs.length;i++) {
	 blurs[i].className=blurs[i].className.replace(/blurred_page/,"");
      }
      var layers=$class("text_layer");
      for(var i=0;i<layers.length;i++) {
	 removeAttributes(layers[i], "class");
      }
      var unsels=document.querySelectorAll('[unselectable="on"]');
      log("unsels "+unsels.length);
      for(var i=0;i<unsels.length;i++) {
	 unsels[i].setAttribute("unselectable", "off");
	 //	   unsels[i].removeAttributeNode(unsels[i].getAttributeNode("unselectable"));
      }
      
     document.addEventListener("DOMNodeInserted", function(e){
	var imgs=e.target.getElementsByTagName&&e.target.getElementsByTagName("img")
	, parent=e.target.parentNode;
	if (e.target.tagName) {
	   if(e.target.className) log("NEW node "+e.target.className);
	   blurs=$class("blurred_page");
	   for(var i=0;i<blurs.length;i++) {
	      removeClasses(blurs[i], "blurred_page");
	      //blurs[i].className=blurs[i].className.replace(/blurred_page/,"");
	   }

	   //removeAttributes(e.target, "class", "text_layer");
	   var layers=$class("text_layer");
	   for(var i=0;i<layers.length;i++) {
	      removeAttributes(layers[i], "class");
	   }

	}
	if (/outer_page/.test(parent.className)) {
	   pageno=parent.id.replace(/\D+/,"");
	   if (e.target.tagName=="DIV" || e.length)
	      log("new scribd node, pclass " +parent.className+", tag"+ e.target.tagName+", imgs: "+imgs.length)
//	   if (!longroll && imgs.length) {
	   if (imgs.length) {
	      if (!imgroll) imgroll=getPages(true);
	      copyImgtoSB(imgs[0]);
	      //	   } else {
	   }
	   if (longroll=="") { 
	      longroll=getPages();
	      log("init longroll with chars:"+longroll.length);
	   }
	   log("PAGE "+pageno +" tag "+e.target.tagName+", id: "+parent.id+", chars:"+e.target.textContent.length)
	   if (!pagesDone[parent.id]) {
	      var txt=getPageText(e.target).trim();
	      pagesDone[parent.id]=txt.length;
	      var pno=parent.id.replace(/\D+/,"");
	      log("Got NEW page txt "+txt.length+", pnum: "+pno);
	      longroll+=txt.deeptrim()+" ";
	      if (txt.length) link.textContent+=", "+pno;
	      //if (imgs.length) copyImgtoSB(
	   }
	}
     }, false);
     
   }//end if site==scribd
   
   var justText_func = function() {
      if (site==gbook) {
	 $("gb").style.display="none"; 
	 $("gb-top-search-box").style.display="none"; 
	 $$("viewport-top-linkbar").style.display="none";
	 //setTimeout(function () { $$("viewport-top-linkbar").style.display="inline";},1000);
	 if ($("gbdButtonDiv")) //google book download script is present, so leave left menu.
	    $("menu_container").style.display="none";
	 else
	    $("menu_td").style.display="none"; 
	 $$("kd-appbar").style.display="none";
	 var menutr=$("menu_td").parentNode;
	 link2.style.cssText='left: 0; top: 30px; position: absolute;text-decoration: underline;';
	 menutr.appendChild(link2);
	 // may or may not be present:
	 try { $("fbusx").style.display="none"; setAttribute("style", "display:none");} catch(e){}
      
      // problem of gap at bottom, unsolvable except by manually opening & closing sidebar:
    }
    else if (site==scribd) { 
       var sticky_bar=$$("sticky_bar");
       var sidebar=$("sidebar");
       remove(sticky_bar, sidebar);
       log("Got leader "+$("leaderboard_ad_main"));
       remove($("global_header"), $("leaderboard_ad_main"))
       if (longroll) {
	  GM_log("Accumulations: "+longroll);
	  longroll=longroll
	     .replace(/\.\uffee(\w)/g,".\n\n$1").replace(/\uffee/g," ")
	     .replace(/\ue000\s+/g,"").replace(/\ue000/g,"")
	     .replace(/[\ua000\ufff0\u00a0]/g,"")
	     .replace(/(\d+)\s{0,2}(\d+)/g,"$1$2").replace(/\s(\d+)\s\s/g,"\n\n$1\n\n");
	  alert2(longroll);
	  //.replace(/\.(\w)/g,".\n\n$1")
	  //alert2(getPages());
       }
       if (imgroll) {
	  var copy=button.cloneNode(true);
	  var elp=copy.firstElementChild;
	  elp.nextElementSibling.textContent="";
	  elp.nextElementSibling.nextElementSibling.textContent="";
	  popup(copy, longroll);
       }
       else alert2(longroll);
    }
    
   };//end justText func
  //Search within Google book
   var searchText_func = function() { //eg, http://books.google.ie/books/about/Greek_Philosophical_Terms.html?id=JepR6Mj9Hy8C&redir_esc=y&q=hypothesis#v=snippet&q=hypothesis&f=false
     if (site==scribd) { alert("See magnifying glass icon on right to search within book."); return; }
    var href=""+location.href;
    log(" href "+href);
    var reply=prompt("Enter Search word below");
    reply.replace(/ +/g,"+");
    if (/q=/.test(href))
      href=href.replace(/q=\w*/g,"q="+reply);
    else 
      href+="q="+reply;
    log("href is "+href);
    location.href=href;
    log("set loc "+location.href);
    } //end function
  
  if (unsafeWindow) unsafeWindow.justText=justText_func;  else  window.justText=justText_func;
  link.href="javascript:justText();";

   link.title=(site!=scribd?"After clicking here, open and close sidebar to see full length":"See what page numbers have been accumulated here.  Scroll to add more, then click here to view them.");

  if (unsafeWindow) unsafeWindow.searchText=searchText_func;  else  window.justText=searchText_func;
  link2.href="javascript:searchText();";
  link2.title="Search within Google book";
  
}// end if !=amazon
function removeClasses(el, classList, recur){
   if (!el.className) return;
   var subels;
   var classes=classList.split(" ");
   if (!recur) {
      subels=el.getElementsByClassName(classList) 
      for (var i=0; i< subels.length; i++)
	 removeClasses(subels[i], classList, true);
   }
   for (var i=0; i< classes.length; i++)
      el.className=el.className.replace(classes[i],"");
}
function removeAttributes(el, except, classn) {
   if (classn) { 
      subels=el.getElementsByClassName(classn) 
      for (var i=0; i< subels.length; i++)
	 removeAttributes(subels[i], except);
      if (el.className.match(classn)) removeAttributes(el, except);
   }
   var i=el.attributes.length
   while(i--) {
      var attr=el.getAttributeNode(el.attributes[i].name);
      if (el.attributes[i].name!=except) {
	 el.removeAttributeNode(attr);
      }
   }
}//removeAttributeNode()

function getPages(img) {
   var roll="", pages=document.getElementsByClassName("outer_page");
   log(pages.length+" BACKpages w/i doc");
   for(var i=0;i<pages.length;i++) {
      if (img) {
	 roll="true";
	 var imgs=pages[i].getElementsByClassName("img");
	 log("init gather from outer_pages #imgs:"+imgs.length+", id:"+pages[i].id);
	 var gpageno=pages[i].id.replace(/\D+/,"");
	 for(var j=0; j<imgs.length;j++)
	    copyImgtoSB(imgs[j], "", gpageno);
      }
      else {
	 var txt=getPageText( pages[i] ).trim();
	 pagesDone[pages[i].id]=txt.length;
	 if(txt.length==42) log("42 "+txt);
	 var pno=pages[i].id.replace(/\D+/g,"");
	 log("getPages, page:"+pages[i].id+", len "+txt.length+", pnum: "+pno);
	 roll+=txt+" ";
	 if (txt.length) link.textContent+=", "+pno;
      }
   }//end for
   roll=roll.deeptrim();
   return roll;
}

function getPageText(page){
   page=pageTextMod1(page, "w", " ");
   page=pageTextMod1(page, "a", "\uffee");
   return page.textContent;
}
function pageTextMod1(page, cl, repl) {
   var page=page.cloneNode(true);
   var gaplessClass=page.getElementsByClassName(cl);
   for (var j=0;j<gaplessClass.length;j++) {
      if (gaplessClass[j].tagName!="SPAN") log(" non spa "+gaplessClass[j].tagName)
      gaplessClass[j].textContent=repl+gaplessClass[j].textContent;
   }
   return page;
   // var roll="";
   // if (!page.cloneNode) return roll;
   // var page=page.cloneNode(true);
   // //roll+=pages[i].textContent+" ";
   //return page.textContent;
}

var gathered_pages={};

if (site != amazon) return;


var lookInsidePage=$("sitbReaderPageContainer");
if ( lookInsidePage ) main();
 else   
   setTimeout( function(){
       lookInsidePage=$("sitbReaderPageContainer");
       if (lookInsidePage) main();
       else {
	 setTimeout(main, 1800);
	 log("wait");
       }
     }, 900);

var stackpos=20, lstackpos=30, rsidebar, sidebar_div, first_page, stale;

//GM_registerMenuCommand("Amazon Look Inside, allow FlashGot on selected pages", main);

GM_registerMenuCommand("=============GB===========", function(){})
GM_registerMenuCommand("Open in order", bigWindow_func)

function main() {
  log("main "+lookInsidePage);
  allowContextMenu();
  setTimeout(allowContextMenu, 400);
  var vertical=$('sitbReaderPageContainerVerticalScroller');
  if (vertical) vertical.style.left=0;
  log("m vertical "+vertical);
  remove($("sitbReaderSB-history"), $("sitbReaderSB-recs"));
  var gbeta=$("gbeta");
  if (gbeta) { stale=true; remove(gbeta); }
  rsidebar=$("sitbReaderSB");
  if (!rsidebar ) { GM_log("Not inside book"); return;}
  //rsidebar.id="gbetaSB";//amazon disallows links under this and must retain its id.
  var div=document.createElement("DIV");
  div.id="gbeta";
  rsidebar.appendChild(div);
  sidebar_div=div;
  // below tags get swallowd up in setting innerHTML at amazon.
  div.innerHTML="<u>Pages are iconized below as you scroll.  Click anwhere on this text area here for "
    +"large popup window with all the pages so far scrolled.</u></p><p>  Scroll pages in book to gather more,"
    +"<br/>\n\nPages so far:</p><p id=kplaceholder style='overflow:scroll;height:300px'></p>";
  var underline=document.createElement("U"); // no go at amaz.co
  //underline.textContent="this text heretofore";
  //div.appendChild(underline);
  div.addEventListener("click", function(e) {
      log("click");
      if (klen==0)
	  bigWindow_func();
    }, false);
  //+'<a href="javascript:bigWindow();">click here for big window)</a>';
  //var link = document.createElement("A");
  //div.appendChild(link);
  //unsafeWindow.bigWindow=bigWindow_func;
  //link.href="javascript:bigWindow();";
  //div.innerHTML+= 
  log("jq un: "+unsafeWindow.jQuery+", win: "+window.jQuery);
  
  vertical=$('sitbReaderPageContainerVerticalScroller');
  log("vert "+vertical);
  if (vertical) { 
    vertical.style.setProperty("left", "0", "important");
    vertical.setAttribute("gbeta","yes");
  }
   gatherPages();
   //document.addEventListener("DOMNodeInserted", newNode, false);
   nodeInsertedObserver(newNode, false);
   var sidebaropener=$("sitbReaderSBOpener");
   var sidebar=$("sitbReaderSB"); //#sitbReaderSB
   if ( sidebar && ( ! sidebar.style.width || sidebar.style.width=="0px") )
      fakeClick(sidebaropener);
} //end main()

//
// Functions:
//
function nodeInsertedObserver(callback) {
  var observer = new MutationObserver(function(mutations) {
      for (var j=0; j < mutations.length; j++)
	for (var i=0; i < mutations[j].addedNodes.length; i++)
	  callback({target: mutations[j].addedNodes[i]});
    });
  observer.observe(document, { childList: true, subtree: true });
  //observer.disconnect(); to remove event handler
  
}
function newNode(e) {
    var el=e.target;
    log("newNode "+el.tagName+", id: "+el.id+", clone? "+el.cloned+" tc len "+el.textContent.length);
    log("TEXTCONTETNT "+el.textContent);
    var k=$("sitbReaderKindleSample");
    if (k && el.tagName &&el.textContent.length>5) { 
	//alert("add "+k.textContent.length+"   newNode "+el.tagName+", id: "+el.id+", clone? "+el.cloned+" tc len "+el.textContent.length);
	if (klen != k.textContent.length) {
	    var text=k.textContent;
	    var start=text.lastIndexOf("px; }")+5;
	    $("kplaceholder").innerHTML="Triple click below to copy text if it is not scrolling<BR><BR>"+text.substring(start);
	}
	klen=k.textContent.length;
    }
    if (el.className=="cloned") return;
    if ( /^(IMG)$/.test(el.tagName))  {
    log("Page, "+el.parentNode.id);
    copyImgtoSB(el);
  }
  return true;
}


function fakeClick(target) {
  var e = window.document.createEvent("MouseEvents");// create event
  var pseudo_event_md = window.document.createEvent("MouseEvents");// create event
  var pseudo_event_mu = window.document.createEvent("MouseEvents");// create event
  var pseudo_event_click = window.document.createEvent("MouseEvents");// create event
  //type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget
  pseudo_event_md.initMouseEvent("mousedown", true, e.cancelable, e.view, e.detail, 
				 e.screenX, e.screenY, e.clientX, e.clientY, 
				 e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
				 0, target.relatedTarget);
  pseudo_event_mu.initMouseEvent("mouseup", true, e.cancelable, e.view, e.detail, 
				 e.screenX, e.screenY, e.clientX, e.clientY, 
				 e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
				 0, target.relatedTarget);
    
  pseudo_event_click.initMouseEvent("click", true, e.cancelable, e.view, 318153143, 
				    e.screenX, e.screenY, e.clientX, e.clientY, 
				    e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
				    0, target.relatedTarget);
    
  pseudo_event_click.ragbag=true;
  target.dispatchEvent(pseudo_event_md); 
  target.dispatchEvent(pseudo_event_mu); 
  target.dispatchEvent(pseudo_event_click);
  log("Dispatched fake click on: "+target.tagName+" "+target.id+" "+target.className)
}


function popup(copy, txt){ 
   if (copy.firstElementChild) copy.removeChild(copy.firstElementChild);
   log("open order");
   var popup=alert2("hello");
   popup.document.body.innerHTML="<p>All images below can be saved by dragging and dropping to a document editor, select all first; or with any of three firefox extensions: Flashgot or 'Save Images' or 'Image Picker'</p>";
   var images=copy.getElementsByTagName("img");
   log("got #images: "+images.length)
   for (var i=0; i < images.length; i++) {
      var im=images[i];
      log("copy, img, cloned? "+im.cloned);
      im.cloned=true;
      im.height=900;
      im.width=600;
      im.style.borderStyle="none";
      var src=im.getAttribute("orig");
      if (src)  im.src=src;
   }
   popup.document.body.appendChild(copy);
   if (txt) {
      var p=document.createElement("p");
      p.textContent=txt;
      popup.document.body.appendChild(p);
   }
}

function bigWindow_func() {
   log("open order");
   document.removeEventListener("DOMNodeInserted", newNode, false);
   log("open order");
   var copy=rsidebar.cloneNode(true);
   popup(copy);
  var sib=sidebar_div.nextSibling, s2;
  sidebar_div.innerHTML="<u>Pages are iconized below as you scroll.  Click anwhere on this text area here for "
    +"large popup window with all the pages so far scrolled.</u></p><p>  Scroll pages in book to gather more,"
    +"<br/>\n\nPages so far:</p>";
  while (sib) {
    s2=sib;
    sib=sib.nextSibling;
    s2.parentNode.removeChild(s2);
  }
  document.addEventListener("DOMNodeInserted", newNode, false);
}

function gatherPages() {
  var allpages=$("sitbReaderPageContainer");
  log("got allpages "+allpages.tagName);
  if (!allpages) return;
  //allpages.id="myPageContainer";// cant defeat scripts on page!
  var imgs=allpages.getElementsByTagName("img");
  log("images # "+imgs.length);
  for (var i=0; i < imgs.length; i++)
    copyImgtoSB(imgs[i]);
  allowContextMenu();
}

function copyImgtoSB(img, txt, gathered) {
   var cpageno=pageno;
   if (gathered) cpageno=gathered;
   if(site!=scribd) cpageno=img.parentNode.id.replace(/.*-/,"");
   GM_log("Copy image to right side bar, cpageno: "+cpageno);
   if (gathered_pages[cpageno] || ! img) {
      log("already gathered or none "+gathered_pages[cpageno]);
      return;
  }
   gathered_pages[cpageno]=true;
   var clone=img.cloneNode(true);
   clone.cloned=true;
   clone.width=11;
   clone.height=17;
   clone.id="cloned"+cpageno;
   clone.name="Page-"+cpageno;
   clone.className="cloned";
   with (clone.style) {
      //position="relative";//"absolute";
      margin="2px";
      if (!first_page) marginLeft="20px";
      borderColor="red";
      borderWidth="1px";
      borderStyle="solid";
      //clone.style.zIndex=99999999;
      //   left=lstackpos+"px";
      //   top=stackpos+"px";
   }
   // lstackpos+=14;
   // if (stackpos > 300) {
   //   lstackpos+=40;
   //   stackpos=20;
   //  }
   //log("lstackpos "+lstackpos);
   if (site==scribd) {
      link.textContent+="' "+cpageno;
      button.appendChild(clone);
      imagesno++;
   }
   else {
      sidebar_div.textContent+=cpageno+" ";
      rsidebar.appendChild(clone);
   }
   if (!first_page) first_page=true;
}

function allowContextMenu() {
  var jq=unsafeWindow.jQuery||window.jQuery;
  log("allowContextMenu "+jq);
  if (jq) {
    jgo();
    return;
  }
  function jgo() {
    unsafeWindow.jQuery('#sitbReaderPageScroll').unbind('contextmenu');
    unsafeWindow.jQuery('div#scrollElm-0.pageHtml').unbind('mouseover');
    unsafeWindow.jQuery('div#sitbReaderPageScroll').unbind('mouseover');
    unsafeWindow.jQuery('div#sitbReaderPageScroll').unbind('mousedown');
    unsafeWindow.jQuery('head').append('<style type="text/css">#sitbReaderPageScroll img {z-index: 10000;}</style>');
  }
  var sitb=$('sitbReaderPageScroll');
  if (!sitb) return;
  
  log("unbinding menu");
    //sitb.unbind('contextmenu');
    unbind(sitb,"contextmenu");
    //  $('scrollElm-0.pageHtml').unbind('mouseover');
    unbind($('scrollElm-0'),'mouseover');
    unbind(sitb,'mouseover');
    unbind(sitb,'mousedown');
    //un.JQuery('head').append('<style type="text/css">#sitbReaderPageScroll img {z-index: 10000;}</style>');
    sitb.style.zIndex=10000;
}

function unbind(el, ev) {
  if (!el) return;
  var jq=unsafeWindow.jQuery||window.jQuery;
  if (jq)
    el.unbind(ev);
  else {
    el.removeEventListener(ev, arguments.callee, false);
    el.removeEventListener(ev, arguments.callee, true);
  }
}

  
function remove(el, el2) {
  if (!el) return;
  var p=el.parentNode;
  if (p) p.removeChild(el);
  if (el2) remove(el2);
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
