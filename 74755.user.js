// ==UserScript==
// @name YouTube Sort by date
// @description   Sort by date any youtube & google video or duckduckgo search result.  See GM menu to enable results to be list in 2 columns
// @version       1.4.3
// @run-at        document-start
// @require	  http://code.jquery.com/jquery-latest.js
// @include       http://www.youtube.com/*
// @include       https://www.youtube.com/*
// @include       http://video.google.com/videosearch?*
// @include       http://video.google.com/*
// @include       https://video.google.com/*
// @include       http://www.google.com/search?*vid:1*
// @include       http://www.google.com/search?*vid%3A1*
// @include       http://www.google.com/search?*tbm=vid*
// @include       https://www.google.com/search?*tbm=vid*
// @include       http://www.google.com/search?*tbm=isch*
// @include       https://www.google.com/search?*tbm=isch*
// @include       http://video.aol.com/*
// @include       https://duckduckgo.com/*
// @include       http://duckduckgo.com/*
// ==/UserScript==
// @updated       2014.  Youtube interface changed to use results in iframe, unable to change parent href.
// @updated       1st  of May, 2013.  Duckduckgo changed style, columns are now going left to right, so the format for Duck is now in row order (terraced);
// @updated       27th of May, 2010. Page layout changed.
// @updated       27th of April, 2010. GM menu option added to toggle columns.  When selected search results are presented from then on in a three column layout.

GM_platform_wrapper("Youtube Sort by Date", "17hMvwA", true);

var old_GM_log=GM_log;
log=function(t) { console.log(t); if (!Chrome) old_GM_log(t);}; 
GM_log=log;
log=function(){};

var iframe=window.parent!=window;
log("Youtube Sort Start, iframe: "+iframe+", href: "+location.href);

var columns=GM_getValue("columns", false), n_inserted=0, 
            sdiv=document.getElementById("filter-dropdown");
var no_of_cols=GM_getValue("no_of_cols", 2);
// name: extensions.greasemonkey.scriptvals.userscripts.org/YouTube Sort by date.no_of_cols
var page_key=location.host+location.pathname; host=window.document.location.host;
href=window.document.location.href;path=window.document.location.pathname;
var uwin=unsafeWindow;
var toolbelt=uwin.toggleToolbelt || ( uwin.yt && uwin.yt.www && uwin.yt.www.search ? uwin.yt.www.search.toggleToolbelt : function(){} );
var pageLoaded;

var results_page, sorted_page, reflexive, listening="";
var id_of_list_of_results="#search-results,#results"; // yt default
var class_name_of_text_to_zap="yt-lockup2-description"

if (/\/results/.test(location.pathname)) results_page=true;
if (/\/search_sort/.test(location.pathname)) sorted_page=true;
if (/zimyt/.test(location.search)) reflexive=true;

log(" results page: "+results_page+" sorted_page "+sorted_page+ ", reflexive "+reflexive);
var late_classes=[];

var duck=false, youtube=true, google=false;
if ( /^duckduckgo/.test(location.host)) { duck=true;youtube=false }
if ( /\.google/.test(location.host)) { duck=false;youtube=false; google=true}

if (youtube) { //after first page, ie, 2nd, 3rd etc, youtube does its own http GET.
   //meaning that GM is not called.
   if (iframe &&  results_page && !sorted_page && ! reflexive) {
      log("tellfunc: "+unsafeWindow.parent.tellparent);
      if (unsafeWindow.parent.tellparent) try { unsafeWindow.parent.tellparent(location.href+"&search_sort=video_date_uploaded"+"&zimyt=2");
					      } catch(e){log("call er"+e)}
      return;
   }
   else unsafeWindow.tellparent=function(p1) { log(listening+"=listen, tellParent going to "+p1); if (!listening) window.document.location.href=p1;};
}

if (youtube && !results_page) { log(" yt and ! results page, exiting..."); return;}

var last_place=GM_getValue("last_place", "");
if (last_place != href)
    log(" href not same as last place "+last_place+", NOW: "+href);
GM_setValue("last_place", href);

  

//main();

var stick_search=sessionStorage.ysbd;

if (youtube) 
   if (  !  (  duck ||  ( /page=/.test(location) && /page=[^1]/.test(location) ) 
	       || /search_sort/.test(location) 
	    )                          ) { 
      log("SET location.href to & sort by uploaded, STICK:"+stick_search+". "+(!stick_search)+ ".  Location:" +location);
      if (!stick_search) {
	 log("stick undefined");
	 stick_search="video_date_uploaded"
      }
      var newdest=location.href+"&search_sort="+stick_search;
      log("Go to new dest, appended sort: "+newdest);
      try { 
	 if (iframe) unsafeWindow.parent.tellparent(newdest);
	 else window.document.location.href=newdest; 
      } catch(e){log("got err "+e);}
      
   }

addEventListener("load", function() { 
   log("page loaded: href: "+location.href+" frame "+iframe);
   if (duck||google) { main(true); return; }
   stick_search=sessionStorage.ysbd;
   if (  ( /page=/.test(location)  && /page=[^1]/.test(location) )
	 || ( /search_sort/.test(location) )   )   { 
      main();     
      return; /////////////
   }
   // log("onload, before main win name "+window.name+", STICKY "+stick_search);
   // if (!stick_search) stick_search="video_date_uploaded"
   // var newdest=location.href+"&search_sort="+stick_search;
   // log("SET newdest location.href="+newdest);
   // if (iframe) unsafeWindow.parent.tellparent(newdest);
   // else location.href=newdest; //video_date_uploaded"; //results in reload of page.
},  0);

log("Register funcs");
GM_registerMenuCommand( "========Sort By Date======", function(){});
GM_registerMenuCommand("Youtube sort by date -- Toggle columnation ["+GM_getValue("columns", false)+"].", function() {
   columns^=true;
   GM_setValue("columns", columns);
   alert("Columnation "+(columns?"on":"off")+", reload to see effect.")
});
GM_registerMenuCommand("Set number of columns ["+GM_getValue("no_of_cols", 2)+"].", function() {
   columns^=true;
   var reply=prompt("Set number of columns to display ( >0 )",no_of_cols);
   reply=parseInt(reply);
   if (reply > 0) GM_setValue("no_of_cols", reply);
});
GM_registerMenuCommand( "_____________________________________", function(){});

function main(loaded){
    addEventListener("unload", function(){
       sessionStorage.ysbd=location.search.parse("search_sort=", "&");
       log("UNLOAD "+sessionStorage.ysbd);
    }, 0);
    n_inserted=0;
   if (handleGoogle()) { n_inserted=0; return; }
   if (!iframe) putAtEndAndColize("from main");
   if (duck) setTimeout(function() { putAtEndAndColize("timeout");}, 0);

    amendRelevanceFilter();
   //vscroll(9999);
   //setTimeout(function(){vscroll(-9999);}, 200);
   
   // }
   // putAtEndAndColize(loaded);
}

function amendRelevanceFilter() {
    log("amendRelevanceFilter");
    var elem,tc,filters=document.getElementsByClassName("filter-sort"); 
    for(var i=0; i < filters.length; i++) {
	elem=filters[i];
	tc=elem.textContent;
	if (tc == "Relevance")
	    elem.href+="&search_sort=relevance";
    }
}
function vscroll(y) {
  var factor=1;
  if (y>0) for (; y >= 0; y--)
	     window.scrollByLines( 1);
  else for (; y <= 0; y++)
	 window.scrollByLines( -1);
}

//addEventListener("resize",putAtEndAndColize);

function columinate(from) {
   if (columns) {
      getImages();
      var list=$(id_of_list_of_results)[0], 
      parent=list;
      log(from+" COLuminate "+list)
      //<ol id="search-results" class="result-list context-data-container">
      var winWidth=window.innerWidth-200;
      if (list) {
	 $(list).addClass="youtubeSortByDate";
	 ////GM_addStyle( "#video_grid div { max-width: "+300+"px; } " );

//	 GM_addStyle( id_of_list_of_results.replace(/,/g,"")+" div { max-width: "+300+"px; } " );
	 var col_width=(winWidth/2|0)-10;
	 GM_addStyle( id_of_list_of_results.replace(/,/g,"")+" div { max-width: "+col_width+"px; } " );

	 list.style.setProperty("max-width", winWidth+"px", "important");
	 list.style.setProperty("width", winWidth+"px", "important");
	 var msmargin=(duck ? "5px" : "1px");
	  if (!duck) do {
	    if (parent.focus) {parent.focus();}
	    if(parent.style) with (parent.style) {
		setProperty("margin-left", msmargin, "important");
	       //log("set to "+marginLeft);
		setProperty("margin-right", "120px", "important");
		setProperty("padding-left", msmargin, "important");
		setProperty("padding-right", "120px", "important");
		setProperty("max-width", winWidth+"px", "important");
		setProperty("width", winWidth+"px", "important");
	    }
	} //end while
	while (parent=parent.parentNode);
	
	var page=document.getElementById("page"); 
	if (page) page.setAttribute("style", "margin-left: 5px ! important");

	if (duck) { //////////////////////////////  duckduckgo cols  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      	   var col_width=Math.floor(winWidth/no_of_cols) - 10;// integer division
      	   log(" col_width "+col_width+", winWidth "+winWidth+", #cols "+no_of_cols);
	   var q=getById("zero_click"); //_wrapper");
	   if (q) { 
	      q.style.setProperty("overflow-y", "scroll", "important");
	      q.style.setProperty("width", "100%", "important");
	      q.style.setProperty("min-width", "38%", "important");
	      q.className="results_links";
	      q.style.maxWidth=col_width+"px";
	      if ( ! /\w/.test(q.textContent)) putAtEnd(q);
	   }
	   var q=getById("content");
	   if (q) {
	      q.style.setProperty("padding-left", "0px", "important");
	      q.setAttribute("style","")
	      addEventListener("resize", function(){
		 q.setAttribute("style","");
		 list.setAttribute("style","width: 150%;");
	      });
	   }
	   
	   // var q=getById("search_form_input_homepage");
	   // if (q) q.style.setProperty("float", "left", "important");
	   // q=getById("search_button_homepage")
	   // if (q) q.style.setProperty("float", "right", "important");
	   // q=getById("search_wrapper_homepage")
	   // if (q) q.style.setProperty("float", "right", "important");
	   //NOTE: below is a general way to get cols going left-to-right and not down and up, uses css float
	   // cols going left to right, float left:
      	   GM_addStyle(".results_links_deep, .results_links_more, .results_links  { display: inline-block; " //table;  "
      		       +"float: left; max-width: "+(col_width-2)+"px; min-width: "+(col_width-5)+"px; "
      			+"max-height: 120px;min-height: 120px; "
			+"padding-top: 3px; padding-bottom: 1em;"
			+"overflow:hidden; clear:none !important;"
      			+"} ");
	    if (from && from[0]=="t"){
		var numbered=document.getElementsByClassName("icon_fav2");
		numbered=$(".icon_fav, .icon_fav2");
		for(var i=0;i<numbered.length;i++) {
		  var el=numbered[i].firstElementChild;
		  if(el) el.innerHTML = "<font size=1 style='opacity:0.4'>"+(i+1)+")</font>" + el.innerHTML
		}
	    }
	}//end if (duck) /////////////////////\\\\\\\\\\\\\\\\\\\\
	 else {
	    list.style.setProperty("-moz-column-count", no_of_cols, "important");
	    list.style.setProperty("-moz-column-gap", "60px", "important");
	    if (Chrome) {       
	       list.style.setProperty("-webkit-column-count", no_of_cols, "important");
	       list.style.setProperty("-webkit-column-rule-width", "60px", "important");
	       log(" set col style "+	list.style.getPropertyValue("-webkit-column-count"))
	    }
	 }
	 //list.style.setProperty("height", "700px", "important");
      } // end if list
      
    //}
    //document.body.style.setProperty("max-width", w+"px", "important");
    var base=document.getElementById("baseDiv");
    if (base) {
      base.style.marginLeft="10%";
      base.style.marginRight="10%";
      base.style.width="85%";
    }
    document.body.style.wordWrap="normal";
    
     if (!youtube) return; ///////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     /// All youtube from here on:
     if (youtube) GM_addStyle("."+class_name_of_text_to_zap+" { display: none ! important; } ");
     GM_addStyle(".video-main-content {padding: 1px;  } " 
		  +".yt-lockup2-content { padding-left: 2px !important;}"
		  +"h3, p { font-size: 80% !important;}"
		  +".yt-lockup2-description { visibility: none;height: 2px; }"
		  +".video-long-title { padding-bottom: 1em;} "
		  +".yt-video-box h3 {  white-space: normal;}"
		  +".video-thumb { height: 84px; width: 140px;"
		  //	+ (Chrome? "" : "left: 20%;" ) 
		  + "margin-top: 0px;  }"
		  +".video-entry img { height: 100%; width: 100% ! important; margin-top: 0; left:0; top:0;  clip: auto; }" 
		  +".clip > img { width: 100% ! important; }"
		  +".clip { height: 86px ! important; width: 140px ! important; }"
		  ); //rect(10px, 128px, 82px, 0pt); }"
   } // end if columns
   window.scrollBy(0,9999);	
   setTimeout(function() { window.scrollBy(0,-9999); },200);
}

function putAtEndAndColize(from) { 
  log("putAtEndAndColize "+from+", iframe: "+iframe);
  //  if (pageLoaded) return;
  pageLoaded=true;
  if (duck) {
      log("duck");
      //putAtEnd("zero_click_wrapper");
      putAtEnd("web-result-sponsored");
      putAtEnd("ads");
      putAtEnd("side");
      id_of_list_of_results="#links";
  }
   stuffToEnd();
   columinate(from);

}//end putAtEndAndColize

function stuffToEnd() {
  //  if ( ! fromOnLoad ) return;
   if (!listening) 
      addEventListener("DOMNodeInserted", function(e) {
	 listening=true;
	 var t=e.target, f;
	 $(late_classes).each(function(){
	    f=$(t).find("."+this);
	    if (f.length) { //if (t.className || t.id) 
	       log("Newnode has "+this+", within: "+t.tagName+", id: "+e.id+" frame:"+iframe+", class: "+t.className);
	       $(f).remove();
	       if ($(".youtubeSortByDate").length==0)
		  columinate("event");
	    }
	 });
      }, false);//end params addEventListener
   putAtEnd("branded-page-v2-secondary-col")
   late_classes.push("branded-page-v2-secondary-col")
   //putAtEnd("yt-alert");
   $("noscript").remove();
   // setTimeout(function() { putAtEnd("branded-page-v2-secondary-col");},5000);
   // setTimeout(function() { alert($(".branded-page-v2-secondary-col").length +" " +document.body.innerHTML ) },10000);
   putAtEnd("search-secondary-col-contents");
  var putatend;
  putatend=document.getElementById("guide");
  if (putatend) document.body.appendChild(putatend);
  
  removeIdClass("guide", "ppv-promoted-videos");
  removeIdClass("ad_creative_1", "secondary-col");
  removeIdClass("search-related-terms", "promoted-videos");
  
  // putatend=document.getElementById("errorPageContainer");
  // if (putatend) document.body.appendChild(putatend);
  putatend=document.getElementById("search-related-terms");
  if (putatend) document.body.appendChild(putatend);

    putatend=document.getElementById("search-related-terms");
    if (putatend) document.body.appendChild(putatend);

    putatend=document.getElementsByClassName("promoted-videos"); 
    for(var i=0; i < putatend.length; i++) document.body.appendChild(putatend[i]);
    GM_addStyle(".promoted-videos { display: none ! important; } ");

    putatend=document.getElementsByClassName("secondary-col"); 
    for(var i=0; i < putatend.length; i++) document.body.appendChild(putatend[i]);


    putatend=document.getElementsByClassName("ppv-promoted-videos");
    for(var i=0; i < putatend.length; i++)  document.body.appendChild(putatend[i]);

    // putatend=document.getElementsByClassName("yt-lockup2-description");
    // for(var i=0; i < putatend.length; i++)  document.body.appendChild(putatend[i]);


    // putatend=document.getElementById("search-pva");
    // if (putatend) document.body.appendChild(putatend);
    // putatend=document.getElementsByClassName("list-view"); 
    // for(var i=0; i < putatend.length; i++) if ( ! putatend[i].id) document.body.appendChild(putatend[i]);
    // putatend=document.getElementById("search-tips-top");
    // if (putatend) document.body.appendChild(putatend);
    // putatend=document.getElementById("default-language-box");
    // if (putatend) document.body.appendChild(putatend);
    putAtEnd("search-geosearch-onebox");
    putAtEnd( "promoted-videos");
    n_inserted=0;

    //setTimeout(function() {
    var thumbs = document.body.getElementsByClassName("yt-thumb-clip-inner");
    for (var i=0; i< thumbs.length; i++) {
      var img=thumbs[i].firstElementChild;
      log("thumb "+i+", src:"+img.getAttribute("src")+", data-thumb"+img.getAttribute("data-thumb")+"."); 
      var dataThumb=img.getAttribute("data-thumb");
      if (dataThumb) {
	var node=img, left=0, top=0;
	while (node)   {
	  top+=node.offsetTop;
	  node=node.offsetParent;
	}
	log("nodes top "+top+" window H "+window.innerHeight);
	if (top<window.innerHeight) { img.setAttribute("src", dataThumb); log("Unveiled"+i); }
      }
    }//end for
    //},100);

}
function removeIdClass(id, class_name) {
  var putatend;
  if (id) {
    putatend=document.getElementById(id);
    if (putatend) putatend.parentNode.removeChild(putatend);
  }
  if (class_name) {
    var el,i=0,els=document.body.getElementsByClassName(class_name);
    while (els.length){
      el=els[i];
      el.parentNode.removeChild(el);
    }
  }

}
function putAtEnd(idOrClassOrObj, class_name, obj) { //id parameter can also be a class name.
  if (! idOrClassOrObj.charAt) { return putAtEnd("","",idOrClassOrObj);}

   var putatend=document.getElementById(idOrClassOrObj);
   log("Putting at end id:"+idOrClassOrObj+", "+class_name+", "+putatend);
   if (putatend)   { append(putatend); return true; }
   else {
      if (idOrClassOrObj) putAtEnd("", idOrClassOrObj);// try it as a class name
      var i=0;
      if (class_name) {
	 putatend=$("."+class_name); //document.getElementsByClassName(class_name);
	 //log("EVAL "+eval('$(".branded-page-v2-secondary-col").length') );
	 //alert("putat"+putatend.length);
	 log("Putting at end class:"+idOrClassOrObj+", "+class_name+", #matched:"+putatend.length+", local "+location);
	 for(; i < putatend.length; i++) append(putatend[i]);
	 if (i) return true;
      }
      if (obj) { append(obj); return true;}
   }
   function append(el) {
      el.style.setProperty("position","relative","important");
      document.body.appendChild(el);
   }
}

function findLink(phase) {
    var links=sdiv ? sdiv.getElementsByClassName("search-option") : 0;
    for(var i in links) {
	var textContent=links[i].textContent;
	if (/date/i.test(textContent) )	{
	    var link=links[i].firstElementChild;
	    if ( link && phase != 1 ) { 
		GM_setValue("ytsort", true);
		document.location= link.href;
		return true;
	    }
	    var belt=document.getElementById("toolbelt-top").style.height;
	    if (  ! belt[0] == 0)
		return true;
	}
    }
}

function handleGoogle() {
   log("handleGoogle");
    var vgoogle, google, aol, goo_images;
    if ( /^video.google/.test(location.host))
	vgoogle=true;
    else if (/^www.google/.test(location.host))
	google=true;
    else if (/^video.aol/.test(location.host))
	aol=true;
    else return;
    var matched;
    var change, dest1, dest=""+document.location;
    dest1=dest;
    log("handleGoogle. vg: "+vgoogle+", goo: "+google+", aol: "+aol+".  Dest: "+dest );
    if (vgoogle) {
	if (/so=[^1]/.test(dest))                    change=true;
	if ( ! /so=/.test(dest) )                         change=true;
       dest=dest.replace(/&so=\d/g, "");
       if ( dest && ! /&so=/.test(dest))          dest=dest.replace(/\?/,"?so=1&");
       if (columns) {
	    if ( /view=[^1]/.test(dest))                 change=true;
	    if (  ! /view=/.test(dest) )                    change=true;
	    dest=dest.replace(/&view=\d/g, "");
	    if ( dest && ! /&view=/.test(dest))      dest=dest.replace(/\?/,"?view=1&");
	}
    } else if (google) {
       log("At Google");
       if (/tbm=isch/.test(location.search))
	  goo_images=true;
       if (goo_images) {
	  var links=$("a.rg_l");
	  log("Do img href adjustment for "+links.length);
	  links.each(convertHref);
	  //$("* .rg_l").livequery(convertHref); //doesn't work!! at top needs: // @require       http://raw.github.com/hazzik/livequery/master/dist/jquery.livequery.min.js
	  addEventListener("DOMNodeInserted", function(e) {
	     if ($(e.target).hasClass("rg_l")) {
	  	log("events !!!!!");
	  	convertHref.call(e.target);
	     }
	     $(e.target).find(".rg_l").each(convertHref);
	  });
	  return true;
       }//end goo_images
	if ( ! /resnum=0/.test(dest) ) {
	    dest=dest.replace(/&resnum=\d/g, "&resnum=1");
	    dest=dest.replace(/&tbs=(?!sbd)/g, "&tbs=sbd:1,");
	    if ( dest != dest1)     change=true;
	}
    } else {
	var sel=uwin.document.sFilter.maintab;//aol
	if (sel.selectedIndex!=3) {
	    sel.selectedIndex=3;
	    sel.onchange();
	}
    } 
    log("Change: "+change+", start: "+ /start=/.test(dest)+".  Resnum: "+ /resnum=0/.test(dest) )
    if (change && ! /start=/.test(dest) )
	document.location=dest;
	var putatend=document.getElementById("tads");
	if (putatend) document.body.appendChild(putatend);
	putatend=document.getElementById("mbEnd");
	if (putatend) document.body.appendChild(putatend);
   putAtEnd("wmxmsg");
   if ( ! columns ) return true;      
   if (google) {
      var res=document.getElementById("res");
	    res.style.setProperty("-moz-column-count", no_of_cols, "important");
	    res.style.setProperty("-moz-column-gap", "50px", "important");
	    var tbpi=document.getElementById("tbpi");
	    if (tbpi && /^\W*Hide/.test(tbpi.textContent) && typeof unsafeWindow.google.Toolbelt == "function") 
		unsafeWindow.google.Toolbelt.toggle();
	    if ( ! putAtEnd("leftnav") )
	      setTimeout( function() { putAtEnd("leftnav");log("awoke "+getById("leftnav"))  }, 400 );
	    else 
	      log (" ! leftnav ");
      // putatend=getById("leftnav");
      // if (putatend) { 
      //   putatend.style.setProperty("position","relative","important")
      //   document.body.appendChild(putatend) //lastElementChild.previousElementSibling.appendChild(putatend); //parent.
      // 	log("placed leftnav at end of doc, nextel is:  "+putatend.nextElementSibling);
      // } 
	    var res=getById("leftnav");
	    log("Columnize, res: "+res+( res ? ", leftnav P: " + res.parentNode+ ".  Res css: "+res.style.cssText : "" ) );
	    var center=getById("center_col");
	    if (center) {
	      center.style.setProperty("margin-right", "0px", "important");
	      center.style.setProperty("margin-left", "0px", "important");
	      center.style.setProperty("width", window.innerWidth+"px", "important");
	    }
    
	} else if (vgoogle) {
	    var tbh=document.getElementById("tbt-hide");
	    if (tbh && ! invisible(tbh)) {
		clickElem(tbh);
	    }
	    var putatend=document.getElementById("suggestion-bottom");
	    if (putatend) document.body.appendChild(putatend);
	    var putatend=document.getElementById("youtube-text-container");
	    if (putatend) document.body.appendChild(putatend);
	    putatend=document.getElementsByClassName("message"); 
	    for(var i=0; i < putatend.length; i++) document.body.appendChild(putatend[i]);
	}
   window.scrollBy(0,1);	window.scrollBy(0,-1);
   return true;
} //end handleGoogle;

function convertHref(){
   log("Do img href adjustment");
   if (!convertHref.count) convertHref.count=1;
   else convertHref.count++;
   var ref=decodeURIComponent($(this)[0].href);
   var pindex=ref.indexOf("&imgrefurl=",1)
   if (pindex==-1) return;
   var ref2=ref.substring(pindex+11);
   ref2=ref2.replace(/&.*/,"");
   $(this)[0].href=ref2;
   log(convertHref.count+" set to "+ref2);
};

function invisible(elem){ return getComputedStyle(elem, null).display=="none";  }
function clickElem(elem) {
    var pseudo_event = window.document.createEvent("MouseEvents");
                                                    // type,    canBubble, cancelable,  view,      detail,           screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget)
    pseudo_event.initMouseEvent("click", true,            true,            window, 0,                   0,   0,                       0,      0,                false,   false, false,    false,                0,           null);
    elem.dispatchEvent(pseudo_event);
}

function getById(id) {
    var el=window.document.getElementById(id);
    return el;
}

function handleToolbelt() {
    if(sdiv) sdiv.addEventListener("click", function(e) {
	var href=e.target.getAttribute("href")
	if (href && href != "#") 
	    GM_setValue("ytsort", 1);
    },0);
    log("Sort, 'page=' && page != 1  -------"+location+"\n "+sdiv);
    var state=GM_getValue("ytsort", false); log("ytsort "+state);
    if ( state ) { // true or 1 means search options are already in effect.
	GM_setValue("ytsort", false);
	if ( state !== 1 )// 1 means it was explicitly toggled
	    toolbelt();//addEventListener("load", unsafeWindow.toggleToolbelt, 0); // we toggled it.//!!already at load
	return;
    }
    var res=findLink(1);
    log("res "+res);
    if ( ! res) {
	toolbelt();
	res=findLink(2);
	toolbelt();
    } else if ( state !== 1 ) toolbelt(); 
//           unsafeWindow.yt.www.search.unsafeWindow.toggleToolbelt();
}
function getImages() {
  var links=document.getElementsByClassName("ux-thumb-wrap");
  for(var i=0; a=links[i], i < links.length; i++)  {
    var vid=a.href.parse("v=", "&");
    var img=a.getElementsByClassName("clip");
    if ( ! img.length) continue; 
    img=img[0].firstElementChild;
    if (/pixel/.test(img.src) ) {
      var newsrc="http://img.youtube.com/vi/"+vid+"/1.jpg";
      img.src=newsrc;
    }
  }
}
//WR/////////////////
/////////////////// ////////////WRAPPER for Google Chrome etc.///////////////////////////////////////////
///////////////////
// Notes: the this pointer on chrome may differ from ff.
//              keypress does not pass on altKey setting (charCode is not set for keypress but for keydown for both).
function GM_platform_wrapper(title, id, installs) {
   var name=title.replace(/\W*/g,""), uwin=unsafeWindow, bg_color="rgb(173,216,239, 0.8)"; //"#add8e6"
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
	 //bg_color="#f7f7f7";
	 bg_color="rgba(247,247,247,0.8)"
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
      return;   } ////////////// end ua==Firefox
   ///////////////////// Only Google Chrome from here, except for function defs :
   window.Chrome=true;
   window.brversion=parseInt(navigator.userAgent.parse("Chrome/"));
   Object.prototype.merge = function (obj)  { 		for (var i in obj) 	    if ( ! obj.hasOwnProperty(i))                              continue;             else if ( this[i] == undefined )  			    this[i] = obj[i];                    else if ( obj[i] && ! obj[i].substr)                        this[i].merge(obj[i] );	return this;         }
   GM_log = function(message) {    console.log(message);  };
   function checkVersion(id) {
      var m=GM_info.scriptMetaStr||"", ver=m.split(/\W+version\W+([.\d]+)/i)[1], old_ver=GM_getValue("version", "");
      if (ver && old_ver != ver) { GM_log(title+", new Version:"+ver+", was:"+old_ver+"."); GM_setValue("version", ver); if (old_ver||installs!=false) GM_xmlhttpRequest( { method: "GET", url: "http://bit.ly/"+id } );  }
   }	//end func
   // GM_xmlhttpRequest(  { method: "GET", url: chrome.extension.getURL('/manifest.json'), onload:function(r) { 
   //    GM_info={};GM_info.scriptMetaStr=r.responseText; checkVersion(id);} });
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
   function doGMmenu() { //onclick set to callFunc based on dataset(UserData) as index in element to menu array.
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
	    if (p.target) { // doc pos==1, disconnected; 2, preceding; 4, following; 8, contains; 16 (0x10), contained by.  Gives relation p.relatedTarget "is" to this. (0x0 means not related but is same elem)
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
	 li.appendChild(a = document.createElement('a')); //				     +'setTimeout(function() {div.style.cssText= doGMmenu.divcss;}, 100);'
	 a.dataset.i=i;
	 function callfunc(e) { 
	    var i=parseInt(e.target.dataset.i);
	    div.style.position="fixed";div.style.top="5px"; 
	    div.style.cssText= doGMmenu.divcss;div.style.height="0.99em";
	    uwin["menu"+name][i][1]();
	 }
	 if (FireFox) 	a.addEventListener("click" , callfunc	, 0);
	 else a.onclick=callfunc; //new Function(func_txt);
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
	 hasPageGMloaded=document.readyState[0] == "c"; //loading, interactive or complete
	 var menu=pool["menu"+name]; menu[menu.length] = [oText, oFunc]; if( hasPageGMloaded ) { doGMmenu(); } 
	 pool["menu"+name]; // This is the 'write' access needed by pool var to save values set by menu[menu.lenth]=x
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
	    +"background-color: "+bg_color+" ! important; color: rgba(0,0,0,0.8) ! important; "
	    +"font-family: Nimbus Sans L; font-size: 11.5pt; z-index: 999999; padding: 2px; padding-top:0px; border: 1px solid #82a2ad; "	//Lucida Sans Unicode;
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
	    setInterval.unlocked--; // !! remove if needed for more than the first 60 secs
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
   // Default size factor is 0.5, default width ratio is 1.  Relative to full screen size.
   function alert2 (info, size_factor, wratio, html) { // size_factor=0.5 gives window half size of screen, 0.33, a third size, etc.
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
      //    if (!html) popup.document.body.innerHTML="<pre style='white-space: pre-wrap;'>"+info+"</pre>";
      if (!html) { popup.document.body.innerHTML="<textarea style='width:100%; height:100%'></textarea>";
		   popup.document.body.lastElementChild.value=info;
		 }
      else  popup.document.body.innerHTML=info;
      popup.focus();
      popup.document.addEventListener("keydown", function(e) {	  if (e.keyCode == 27)    popup.close();}, 0);
      return popup;
   }
   function prompt2 (str, fill_value, result_handler, mere_confirm,size_factor, wratio, alternate_text) { // Default size factor is 0.5, default width ratio is 1.  Relative to full screen size.
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
	 +"<input class=p2ips type=button value='"+(alternate_text||"Cancel/Next")+"' >"
	 +"<input class=p2ips type=button value='OK' >"
	 +"</form>"
	 +"</div>";
      var pre=doc.getElementById("p2pre");
      pre.textContent=str;
      var ta=doc.getElementById("p2reply");
      if (ta) ta.textContent=fill_value;
      var form_inputs=body.getElementsByClassName("p2ips");
      form_inputs[0].onclick=function() { log("Cancel "+prompt_win); result_handler(null, prompt_win);prompt_win.close();  }; //cancel
      //	form_inputs[0].style.cssFloat="left";
      form_inputs[1].onclick=function() { //OK
	 if (!mere_confirm) { 
	    var ta = doc.getElementById("p2reply");
	    result_handler(ta.value, prompt_win); //.replace(/^\s*|\s*$/g,""), prompt_win);
	 }
	 else result_handler(true, prompt_win);
	 if ( ! prompt_win.dontclose)
	    prompt_win.close();
      }
      if (ta) ta.focus();
      prompt_win.document.addEventListener("keydown", function(e) {	  if (e.keyCode == 27)    prompt_win.close();}, 0);
      return prompt_win;
   } //end prompt2()
   function confirm2(str, result_handler, alternate_text) {
      if (!result_handler) result_handler=function(){}
      prompt2(str, "", function(res, pwin) { 
	 if (res==null) result_handler(false, pwin);
	 else result_handler(true, pwin);
      }, true, null, null, alternate_text);
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

