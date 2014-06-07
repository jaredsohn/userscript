// ==UserScript==
// @name Make site visible
// @description   Allows user to mark sites as having unclear text and permanaently sets the text on the chosen site to have more visible colors. Useful for websites whose text is coloured grey on grey.
// @include         *
// @version 1.0.2
// ==/UserScript==

// Object shape:
//obj.f : foreground color
//obj.b : background color
//obj.s : font size
//obj.u : regexp word matching pages it applies to, empty means applies to all.
//obj.off : If set site is not to be marked but its settings (f,b,s) are stored.
//obj.t : state from makeTempVisible() when made permament.

(function() {
  GM_platform_wrapper("Make Site Visible", "16aPDKJ", true);; 
  var frame;
  if (window.parent != window)  {
    return;
    frame=window.parent;
  }
var hotkey=GM_getValue("markedSitesHotkey", 109);// 109 is m
var hotkeyChar = String.fromCharCode(hotkey);
var hashHostList = new Object();
var state=0, all_frame_delete_needed;
var div_styles=[], for_setting=[], elems_set=[], color_tab={};
log=function(){};
//log=GM_log;

//
// Mainline
//
page=getPage();
getData();
var site=getSite();
var mark  = hashHostList[site];
if ( ! mark ) {
    var old_site=oldGetSite();
    var old_obj=hashHostList[old_site];
    if (old_obj !== undefined) {
	if (typeof old_obj == "object")
	    hashHostList[site]=old_obj;
	else {
	    hashHostList[site]={};
	    hashHostList[site].u=old_obj;
	}
	delete hashHostList[old_site];
	mark=hashHostList[site];
	GM_setValue('markedSites', uneval(hashHostList));
    }
}
if (hashHostList.ver != 0.5) 
    GM_setValue('markedSites', uneval(hashHostList));
GM_registerMenuCommand( "======= Make site visible =======", function(){});
if ( mark && (mark.u == ""  || page.match(mark)  )  && ! mark.off  ) {
    var was_set=setStyle(mark, "onload");
     GM_registerMenuCommand( "Toggle visibility marking for site", toggleVisibility, "", "", "m");
    GM_registerMenuCommand( "Set custom colour for text color of this site...", setcustomcolor  );
    GM_registerMenuCommand( "Set own colour for background for this site...", setcustombackcolor);
    GM_registerMenuCommand( "Set you own font size for this site...", setcustomsize);
    GM_registerMenuCommand( "Make permanent the temporary site setting-- toggle-ratchet "+(mark && mark.t?"["+mark.t+"]":"") , setTempAsPerm);
    if ( was_set) {
	var str= (mark.t ? "Level:"+mark.t+" ": "" ) 
	    + (mark.f ? "Color: "+mark.f+".  " : "")
	    +(mark.b ? "Background: "+mark.b +".  " : "")
	    +(mark.s? "Size: "+mark.s+".  " : "")
	    +(mark.u? "Pattern: '"+mark.u +"'.": "")
	window.status="Made site visible " + (str ? "[ "+ str + " ] " : "")
    }
} // end if mark
else {     
    mark={};
    deleteRule(); // May have been removed by another page.
    if (site == GM_getValue("markedSitesTmp", "" ))  {
      var state=Number(GM_getValue("markedSitesTmpState", 0))
	if (state)  { 
	  window.addEventListener("load",function(){ 
	      simulate(state)
		}, false);
	  window.status="Made site temporarily visible [ Level: "+state+" ]";
	}
    }
    GM_registerMenuCommand( "Mark/unmark site (control-"+hotkeyChar+"), select pages "
			    +"within site, for extra visibility...", toggleVisibility, "", "", "m");
    GM_registerMenuCommand( "Set colour for the text color of all marked sites...",
			    function() {    
				var color = prompt("Set text color, eg, black (default is DarkSlateGray) ", GM_getValue("markedSitesTextColor", "DarkSlateGray" ) );
				if (color)
				    color = color.match(/\w+/).toString();
				if (color) {
				    GM_setValue("markedSitesTextColor", color);
				    getData();
				    var isMarked = hashHostList[getSite()];
				    if ( isMarked !== undefined)
					markSite();
				}
			    });
    GM_registerMenuCommand( "Set background color for all marked sites...",
			    function() {
				var color = prompt("Set background default color for  marked sites, eg, white, it is"
						   +" not set by default, use an empty value to reset", GM_getValue("markedSitesBackgroundColor","") );
				if (color != null) {
				    color = color.match(/\w+/);
				    if (color == null) 
					color = "";
				    GM_setValue("markedSitesBackgroundColor", color.toString());
				    getData();
				    var isMarked = hashHostList[getSite()];
				    if ( isMarked !== undefined)
					markSite();
				}
			    }
			  );
    GM_registerMenuCommand("Temporarily make site more visible for now (alt-"+hotkeyChar
			   +"), toggle-cycle level", makeTempVisible, "", "", "T");
    GM_registerMenuCommand( "Make permanent the temporary site setting-- toggle-ratchet ", setTempAsPerm);
    
} // end else
GM_registerMenuCommand("Set hotkey["+hotkeyChar+"]...", 
		       function () {
			   s=prompt("Enter a single letter for the shortcut key.\n\nWith control key + shortcut, this invokes.  "
				    +"With, alt key + control key + shortcut,  it toggles-cycles  for site visibility but "
				    +"is set only temporarily\n\n","m");
			   if (s != null) {
			       hotkey=s.charCodeAt(0);
			       GM_setValue("markedSitesHotkey", hotkey);
			   }
		       });
GM_registerMenuCommand( "_______________________ ",function(){});
try{    
	window.document.addEventListener("keyup", function(e) {
	    if ((e.keyCode|32) != hotkey ||  ! (e.ctrlKey || e.altKey ) ) //| 32 for case shift
		return true;
	    e.preventDefault();
	    e.stopPropagation();
	    if (e.ctrlKey) {
		toggleVisibility(true);
		return;
	    }
	    if  (e.altKey)
		makeTempVisible(null, e.shiftKey);
	}, 0);}catch(e){alert(e);}
///
/// Functions:
///
function getData() {
    var data=GM_getValue('markedSites'); 
    if (data) 
	hashHostList = eval(data);
}

function toggleVisibility(fromHotkey) {
    getData();
    var obj=hashHostList[getSite()]
    if (obj !== undefined && ! obj.off) {
	window.status="Removing visibility from site "+getSite();
	GM_log("Removing visibility from site "+getSite());
	removeVisibility(); // sets .off=true;
	GM_registerMenuCommand( "Mark site, or pages within site, for extra visibility...", toggleVisibility, "", "", "m");
    }
    else     {
	window.status="Adding visibility for site "+getSite();
	GM_log("Adding visibility for site "+getSite());
	GM_registerMenuCommand( "================ Make site Visible contd.=======", function(){});
	GM_registerMenuCommand( "Remove extra visibility mark from site", toggleVisibility, "", "", "m");
	GM_registerMenuCommand( "Set custom colour for text color of this site...", setcustomcolor  );
	GM_registerMenuCommand( "Set own colour for background for this site...", setcustombackcolor);
	GM_registerMenuCommand( "Set you own font size for this site...", setcustomsize);
	GM_registerMenuCommand( "Make permanent the temporary site setting-- toggle/ratchet "+(obj && obj.t ? "[" + obj.t + "]" : "" ) , setTempAsPerm);
	var urlWord=null;
	if ( ! fromHotkey)
	    urlWord = prompt("Mark site for better visibility, use an empty value to mark entire site or specify a word that is part of a url within this site (regexp)","" );
	if (urlWord != null) {
	    getData();
	    markSite(urlWord.toString()); 
	}
	else markSite();
    }
}
function markSite(urlWord, forecolor, backcolor, size) {  
    var site = getSite();
    var obj= hashHostList[site];
    //log("markSite "+site+", obj "+obj+", typeof "+typeof obj+",  urlWord "+urlWord+" forecolor "+forecolor+" undefined: "+(obj===undefined));
    if(typeof obj == "string" && urlWord === undefined)
	urlWord=obj;
    if (urlWord === undefined)
	urlWord="";
    if (forecolor !== undefined || backcolor !== undefined || size !== undefined ) {
	if(typeof obj != "object")
	    hashHostList[site]= new Object();
	if (forecolor !== undefined && forecolor !=null) 
	    hashHostList[site].f=forecolor;
	if (backcolor !== undefined && backcolor != null)
	    hashHostList[site].b=backcolor;
	if (size !== undefined && size != null)
	    hashHostList[site].s=size;
	hashHostList[site].u=urlWord;
	if (hashHostList[site].off)
	    hashHostList[site].off=false;
    }
    else {
	if (obj && obj.off) { obj.off=false; obj.u=urlWord; }
	else if (obj === undefined ) 
	    hashHostList[site]={ u : urlWord };
    }
    var obj=hashHostList[site];
    page=getPage();
    setStyle(obj);
    GM_setValue('markedSites', uneval(hashHostList));  
}
function style(elem_style) {
    var textColor = GM_getValue("markedSitesTextColor", "DarkSlateGray");
    var backgroundColor = GM_getValue("markedSitesBackgroundColor", false);
    var size="";
    var siteColors = hashHostList[getSite()];
    if (siteColors.f !== undefined ) 
	textColor = siteColors.f;
    if (siteColors.b !== undefined)
	backgroundColor = siteColors.b;
    if (siteColors.s !== undefined )
	size = siteColors.s;
    if (backgroundColor == "")
	backgroundColor = false;
    var stystr= "" 
	+ (siteColors.f ? "color: " + textColor + "  ! important; " : "")  
	+ (siteColors.b ? " background: "   + backgroundColor + " ! important; " : "" ) 
	+ ( siteColors.s ? " font-size : "+size+" ! important;" :"" )
    if (elem_style)
	return  stystr;
    if ( ! stystr) stystr = "color: "+textColor +" ! important; ";
//    return " { *  { " 
    return "  *  { " 
	+ stystr 
	+ " } ";
//	+ " } } ";
}

function setStyle(obj, onload) {
    var url_pattern=obj.u||"";
    var result;
    if (url_pattern == "" || page.match(url_pattern) ) { 
	if (obj.t)  { 
	    if (onload)  window.addEventListener("load",function(){ simulate(obj.t) }, false);
	    else  simulate(obj.t)
	    result=true;
	}
//	else {
	    //	var cssRule = "@-moz-document "+"domain(\""+(site=="localfile" ? "" : site)+"\")" + style();
	var cssRule = style();
	if (onload)  window.addEventListener("load",function(){ addRule(cssRule); }, false);
	else addRule(cssRule);
	if ( ! obj.t ) {
	    if (onload)  window.addEventListener("load",function(){ setDivs() }, false);
	    else setDivs();
	}
	result=true;
	//GM_log("Site " + site + " marked for visibility; uneval: "+ uneval(hashHostList));
	//	}
    }
    return result;
}
function removeVisibility() {
    deleteRule();
    var   divs    =    window . document . getElementsByTagName   (  "div"   )
    for  (  var i  =  divs.length-1;   i   >= 0 ;   i--  ) {
	var old_style  = divs[i].dataset.oldStyle;   //=div_styles.pop();
	if (divs[i].getAttribute("style")) 
	    if (old_style) 
		divs[i].setAttribute("style", old_style);
	     else 
		divs[i].setAttribute("style", "");
    }
    if(typeof hashHostList[site] == "object")
	hashHostList[site].off=true;
    else
	delete hashHostList[getSite()];
    GM_setValue('markedSites', uneval(hashHostList));  
    //window.status="Remove visibility from site"
    //GM_log("Site "+ getSite()+ " removed from being marked for visibility");
}
function addRule(cssRule, all_frames, doc) {
    deleteRule(doc);
    var styleNode;
    if ( ! doc ) doc = window.document;
    styleNode = doc.createElement("style");
    styleNode.id="makeSiteVisible";
    //styleNode.setAttribute("class", "makeSiteVisible");
    styleNode.textContent = cssRule;
    styleNode.type = "text/css";
    try {  var headNode=doc.getElementsByTagName("head")[0];
	   headNode.appendChild(styleNode);      } catch(e){}
    if (all_frames) {
	var flen=window.frames.length;
	while(flen--)
	    try { addRule(cssRule, null, window.frames[flen].document); } catch(e) { setOnFrameElems(flen ) }
	all_frame_delete_needed=true;
    }
}
function deleteRule(doc) {
    if ( ! doc ) doc = window.document;
    var styleNode = doc.getElementById("makeSiteVisible");
    if (styleNode) {
	styleNode.parentNode.removeChild(styleNode);
	delete styleNode;
    }
    if (all_frame_delete_needed) {
	all_frame_delete_needed=false;
	var flen=window.frames.length;
	while(flen--)
	    try{ deleteRule( window.frames[flen].document); } catch(e){};
    }
}
function simulate(in_state) {
    var zero_state=1;
    while (in_state--)
	makeTempVisible(zero_state++);
}
function setDivs() {
    var   divs    =    window . document . getElementsByTagName   (  "div"   )
    for  (  var i  =  0;   i   <   divs . length;   i++  )  {
	if ( divs[i].getElementsByTagName("img").length ) continue;
	div_styles.push(divs[i].getAttribute("style"))
	var old_style=divs[i].getAttribute("style");
	var sty=style(true);
	if (sty)  { 
	    divs[i].setAttribute("style", div_styles[div_styles.length-1]+";"+sty);
	    if (old_style) divs[i].dataset.oldStyle=old_style;
	}
	else break;
    }
}
function setcustomcolor() {
    var color = prompt("Site: \n"+getSite()+"______________________________________________\nSet text color, , eg, White, WhiteSmoke, HoneyDew, Snow, MintCream.  Or clear its setting with an empty value (default, ie, general settng prevails) ", hashHostList[site].f||"" );
    if (color != null) {
	color = color.match(/\w+/) || ""
	getData();
	markSite(undefined, color, null);
    }
    if (color=="") window.document.location.reload(false); 
}
function setcustombackcolor() {
    var color = prompt("Set background color.  It is not set by default, use an empty value to unset it (default, ie, general setting prevails), or 'none' to remove background completely", hashHostList[site].b||""  );
    if (color != null) {
	color = color.match(/\w+/) || "";
	getData();
	markSite(undefined, null, color.toString());
    }
    if (color=="") 	    window.document.location.reload(false); 
}
function setcustomsize() {
    var size = prompt("Set font size in pt, % or em,  eg, 100% (not set by default, 14pt is default when setting) ", hashHostList[site].s||"14pt" );
    if (size != null) {
	size = size.match(/[\w%]+/) || ""
	getData();
	markSite(undefined, null, null, size);
    }
}
function getPage() {
    var p;
    try { p=window.document.location.pathname;} catch(e){}
    if ( ! p)
	p=getSite()+window.document.title.substring(0,20);
    return p;
}
function getSite() {
    var domain_regexp = /((\.[\w-]+\.|^)[\w-]+.[\w-]*$)/;
    var url_regexp="^.+///?([^/]*)"
    var site, host;
    try{ host=""+unsafeWindow.location;//window.document.location.host;
    if (host && host != "about:blank") {
	site=host.match(url_regexp)[1].match(domain_regexp)[0]
    } }
    catch(e){
	// GM_log("No host for: "+host); 
	// GM_log("Unsafe host is "+unsafeWindow.location);
	// GM_log(e);
    }
    if (host=="")
	site="localfile";
    else if ( ! site)
	try { site=window.document.title.substring(0,30); } catch(e){ site="";}
    return site;
}
function oldGetSite() {
    var n, site, host;
    try{ host=window.document.location.host;}catch(e){}
    if (host && host != "") {
	host=host.split(".");
	n=host.length;
	site = host[n-2] + "." + host[n-1];
	if (host[n-1] == "uk")
	site=host[n-3] + "." + site;
    }
    else if (host=="")
	site="localfile";
    else
	try { site=window.document.title.substring(0,30); } catch(e){ site="";}
    return site;
}
function setTempAsPerm() {
    state=Number(GM_getValue("markedSitesTmpState", 0))
    var temp_site=GM_getValue("markedSitesTmp", "")
    if  (  (  getSite() == temp_site   )  
	   && (  ( mark.t && mark.t != state ) || ! mark.t ) )
	{ hashHostList[site]={ t : state }; window.status="Made permanent" }
    else { delete hashHostList[site]; 	GM_setValue("markedSitesTmp","no site"); window.status="Cleared"; }
    GM_setValue('markedSites', uneval(hashHostList));  
}
function makeTempVisible(in_state, shift) { //try {
    var astyle="", style_for_all_frames, boxi;
    var dis=makeTempVisible;
    if  (  ! dis . colorsms  )   {
	// var   divs    =    window . document . getElementsByTagName   (  "div"   )	// if ( divs.length==0)  
	dis.colorsms = [] ;
	function pushDivs(divs) {
	    for  (  var i  =  0;   i   <   divs . length;   i++  )  dis . colorsms . push  (  {  
		div : divs [ i ] ,   
		color : divs [ i ]  . style  .   getPropertyValue (  "color"  ) , 
		bcolor : divs [ i ]  . style  .   getPropertyValue (  "background_color"  ),
		fsize : divs [ i ]  . style  .   getPropertyValue (  "font-size"  ) ,
		fg_set : false
	    }  )
	}
	pushDivs( unsafeWindow . document . getElementsByTagName("body") [0] . children) 
	var flen=window.frames.length;
	while(flen--) try{
	    pushDivs( window.frames[flen].document . getElementsByTagName("body") [0] . children) ;}catch(e){};
	dis.boxen=window.document.evaluate("//*[@color]", window.document,null,6,null);
    } // end if ! colorsms
    function font_size(x) { x ? null : x="100%"  ; return "font-size: "+x+" ! important;"}
    if ( ! in_state) {
	// var old_state=state;
	// state=Number(GM_getValue("markedSitesTmpState", 0))
	var temp_site=GM_getValue("markedSitesTmp", "")
	if (getSite() != temp_site) 
	    if ( mark.t && temp_site != "perm" ) state=mark.t;
            else state=0;
	if (state < 2 && shift)  {
	    state=2;
	}
    }
    else state=in_state-1; 
    deleteRule();
    switch(state) {
    case 0: 
	state=1;
	astyle=" *  { color: DarkSlateGray ! important;  } "
	for(var i=0; boxi=dis.boxen.snapshotItem(i), i < dis.boxen.snapshotLength;  i++ ) 
	    boxi.style.setProperty("color", boxi.getAttribute("color"), "important");
	break;
    case 1:
	state=2;
	astyle=" *  { color: -moz-FieldText  ! important; background-color: -moz-Field ! important; }  body { background-color: black ! important; color: white ! important; }"
	//astyle=" *  { background-color: black ! important;  }"
	for(var i=0; boxi=dis.boxen.snapshotItem(i), i < dis.boxen.snapshotLength;  i++ ) 
	    boxi.style.removeProperty("color");
	break;
    case 2:
	state=3;
	astyle=" *  { color: DarkSlateGray  ! important;  } input, textarea, select { color: #222222 ! important; background-color: #dddddd ! important;} "
	addRule("input, select, textarea {color: #222222 ! important; background-color: #dddddd ! important;} "); 
	style_for_all_frames=true;
	var styleNode = window.document.getElementById("makeSiteVisible");
	if ( ! styleNode) GM_addStyle(astyle);
	var rgb, div;
	for (var i in dis.colorsms)  {
	    //startTime=(new Date).getTime();
	    if (  ! div || div.compareDocumentPosition(dis.colorsms[i].div) !=  20 )  {
		div=dis.colorsms[i].div;
		rgb=getInheritedRGB(div);
		dis.colorsms[i].fg_set=parseRGBnodes(div, rgb.a, rgb.b);
		var elem, old_color;
		while(elem=for_setting.shift()) {
		    old_color=elem.style.color;
		    elem.style.setProperty("color", for_setting.shift(), "important"); //"#cccccc"
		    if (old_color) elem.dataset.old_color=old_color;
		    elems_set.push(elem);
		}
		//log("Msecs for TOTAL action was "+((new Date).getTime()-startTime)+ " milliseconds.");
	    }
	} //end for in dis.colorsms
	if ( ! shift)
	    break;
    case 3:
	state=4;
	style_for_all_frames=true;
	astyle=font_size()+" overflow: visible ! important; } input, select { background-color: #dddddd ! important;"
	addRule("input, select { background-color: #dddddd ! important;} "); 
	style_for_all_frames=true;
	var styleNode = window.document.getElementById("makeSiteVisible");
	if ( ! styleNode) 
	    for (var i in dis.colorsms)  {
		var elems=dis.colorsms[i].div.getElementsByTagName("*");
		for (var j=0; j < elems.length; j++ ) {
		    elems[j].setAttribute("style", elems[j].getAttribute("style")+astyle)
		}
	    }
	astyle=" *  {  color: DarkSlateGray  ! important; "+astyle+"} "
	if ( ! shift)
	    break;
    case 4:
	state=5;
	astyle=" * { color: #cccccc !important; background: none ! important;"+font_size()+"}";
	var elem;
	while(elem=elems_set.pop()) {
	    var old_color = elem.dataset.old_color;
	    if ( ! old_color) old_color="";
	    elem.style.setProperty("color", old_color, "");
	}
	if ( ! shift)
	    break;
    case 5:
	state=6;
	astyle=" * { color: #cccccc !important; background: none ! important;"+font_size("101%")+"}";
	break;
    case 6:
	state=7;
	astyle=" * { color: #cccccc !important; background: #333333! important; "+font_size()+ "}";
	for (var i in dis.colorsms) {
	    dis.colorsms[i].div.style.setProperty("background","none", "important");
	    dis.colorsms[i].div.style.setProperty("font-size", "103%", "important");
	}
	break;
    case 7:
	state=8;
	//astyle="div, body {color: purple;background: #d8da3d }"
	astyle=" *, a { color: black !important; background: none ! important; background-color:white ! important;"+font_size()+" }";
	for (var i in dis.colorsms) {
	    dis.colorsms[i].div.style.setProperty("color","black", "important");
	    dis.colorsms[i].div.style.setProperty("background-color","white", "important");
	}
	break;
    default:
	for  (  var i in dis.colorsms) {
	    dis . colorsms [ i ] . div .  style  .  setProperty  (   "color" ,   dis  .  colorsms  [ i ]  . color , ""  )
	    dis . colorsms [ i ] . div .  style  .  setProperty  (   "background-color" ,   dis  .  colorsms  [ i ]  . bcolor , ""  )
	    dis . colorsms [ i ] . div .  style  .  setProperty  (   "font-size" ,   dis  .  colorsms  [ i ]  . fsize , ""  )
	}
	state=0;
	deleteRule();
	astyle=false;
	GM_setValue("markedSitesTmp", (mark.t ? "perm" : "no site"  ) );
	GM_setValue("markedSitesTmpStyle", "");
	GM_setValue("markedSitesTmpState", 0);
    }
    if ( ! in_state) window.status="Temporary Visibility level:"+ state;
    if (astyle) {
	addRule(astyle, style_for_all_frames);
	if ( in_state ) return;
	GM_setValue("markedSitesTmp", getSite());
	GM_setValue("markedSitesTmpState", state);
	GM_setValue("markedSitesTmpStyle", astyle);
    }
//	}
// catch(e) { 
//     var   elems    =    window . document . getElementsByTagName   (  "*"   )
//     for(var i =0; i < elems.length; i++) 
// 	if (elems[i].style)
// 	    elems[i].style.cssText="color: -moz-FieldText  ! important; background-color: -moz-Field ! important;"
//     window.status="Page blocks access to make visible";
//     GM_log(e+" "+e.lineNumber);throw(e);
// }
}
function getInheritedRGB(climbing_child) {
    var rgb, bg_image, computed, result;
    do {
	computed=window.document.defaultView.getComputedStyle(climbing_child, null);
	rgb=computed.backgroundColor;
	if (computed.backgroundImage != "none") {
	    bg_image=computed.backgroundImage
	}
	climbing_child=climbing_child.parentNode;
    }  while ( rgb == "transparent" && climbing_child.parentNode && ! bg_image )  
    if (rgb=="transparent" ) rgb="rgb(1,1,1)";//assumption
    else bg_image=null;
    result=rgb;
    if (bg_image) result= false;
    return  { a:result, b:computed.borderBottomColor }
}
function parseRGBnodes(node, rgb_in, bdcolor, fg_set_recur) {
    var rgb, elem, total, total_fg, fg_set, color, border_color, border_width, color_to_set;
    for (var j=0; j < node.children.length; j++) {
	elem=node.children[j];
	//log("Elem: "+elem.tagName+", ^:"+elem.parentNode.tagName+".  "+elem.className+" "+elem.id+" "+elem.textContent.substring(0,30));
	if (elem.childNodes.length==0 || /SCRIPT$|^OBJECT|^IMG/.test(elem.tagName)) continue;
	var computed=window.document.defaultView.getComputedStyle(elem, null);
	color=computed.color;
	if (  computed.backgroundImage[0] != "n" && /^transp/.test(computed.backgroundColor) && ! /^transp/.test(computed.borderBottomColor)  )  {
	    bdcolor=computed.borderBottomColor;
	    rgb=false;
	}
	else
	    rgb=computed.backgroundColor;
	//elem.setAttribute("debug", "Rgb: "+rgb+".  Rgb_in: "+rgb_in+" bdcolor:"+bdcolor+", bord_col: "+border_color+ ".  Color: "+color )
	if ( /^trans/.test(rgb) )
	    rgb=rgb_in;
	if (rgb.match) {
	    rgb=lightness(rgb);
	}
	if ( ! /[ <]/.test( elem.textContent[0] ) ) {
	    if ( rgb === false )  {
		color_to_set = bdcolor ?  bdcolor : computed.borderBottomColor;
		if ( lightness(color_to_set) > lightness(color)) // /transp/.test(color_to_set) ||
		    color_to_set=color;
		border_color=null;
	    }
	    else { 
		if ( rgb < 589 )  // else DarkSlateGray==rgb(47,79,79), tot:205.
		    color_to_set=color; 		
		if (color) {
		    var color_hash=parseInt(color.substr(4).replace(/[ ,]/g,"") );
		    total_fg=color_tab[color_hash];
		    if ( total_fg === undefined) {
			total_fg=lightness(color) 
			color_tab[color_hash]=total_fg;
		    }
		    if ( Math.abs ( total_fg - rgb )  <  256 ) {
			var diff= 765 - rgb;
			if (diff >= 192 && diff <= 574) if (rgb <= total_fg) diff += 191; else diff -= 192;
			var hex= ( (   0xffffff/765  )   *  (  diff  ) ).toString(16)
			hex="00000"+hex;
			hex=hex.substring(hex.length-6)
			color_to_set="#"+hex;
		    }
		}
	    }
	    if (color_to_set) {
		for_setting.push(elem, color_to_set);
		color_to_set=null;
		fg_set=true;
	    }
	}
	if (elem.children.length && ! /^SELECT/.test(elem.tagName) )
	    fg_set=parseRGBnodes(elem, rgb, bdcolor, fg_set) || fg_set;
    }// end for
    return fg_set || fg_set_recur;
}
function lightness(color) {
    color=color.match(/\d+/g);
    if (color) return Number(color[0])+Number(color[1])+Number(color[2])
}
function setOnFrameElems(index) {
    function insertCode(code) {
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.textContent = code; 
	window.document.body.appendChild(script)
	return;
    }//window.frames["+index+"]"
}
function log(str, roll) {
    //return;//GM_log(str); return;
    if (roll) { 
	if ( ! log.rolling) { log.rolling="Rolled { "; return; }
	else { str=log.rolling+" } "; log.rolling=false } 
    }
    if (log.rolling) { log.rolling+=str+"\n"; return }
    if ( typeof dcount == "undefined" ) { dcount=1; }
    if ( ! log.win) {
	log.win=window.open(""); // need to allow site in noscript for this.
	log.doc=log.win.document; 
    }
    str=str.replace(/\n/g, "<p id=newnline;>");
    var style="style='margin-left : 100px; border-bottom: solid 1px; font-size: 14pt;line-height: 2em ' ondblclick='document.body.innerHTML=null'";
    try{  log.doc.writeln("<div "+style+">"+dcount+":   "+str+"</div>"); dcount++; log.doc.title=dcount;}
    catch(e){ window.setTimeout(function() {log(str)}, 0);	}
}
 })(); 

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

