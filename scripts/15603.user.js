// ==UserScript==
// @name           mondofap
// @namespace      http://benow.ca
// @include        http://*imagefap.com/pictures/*
// ==/UserScript==

// imagefap gallery improver.
// author: Andrew Taylor <andy@benow.ca>

// thx to the lovely ladies of imagefap (and elsewhere)
// Dec 31, 2007: spidering not necessary with &view=2.  Modified script accordingly.  
// Feb 22, 2008: adding paging for large galleries, thanks deltantor
// Mar 24, 2008: change bgcolor, added search, rearranged
// Mar 25, 2008: update for cache.imagefap.com
// May 31, 2009: fixed url matching, fixed submitter name/profile link, increased per-page to 200 as ff memory issues seem resolved
// Feb 5, 2010: many upgrades, including zoom and expand, slideshow, load progress, hotkeys
// Mar 23, 2010: fixes to scaling.  click on img now toggles scaling. scaleByDefault and add to favs at bottom, thx to hurriKane, remove scrollbars
// Apr 16, 2010: scrollbar shown again as mouse scroll wheel wasn't working, window.stop() on load of last image.  Don't show profile image.
//               thx to: knallmuffe, internetinternetinternet
// Oct 22, 2010: fixes to scaling, going past end, and support for new picture url
//               thx to lolwuut and TheEqualizer
// Nov 14, 2010: added load scrolling, while loading will scroll across loaded.
// Nov 16, 2010
// - removed broken favourite link and added link to show page without mondofap.
//   All imagefap functions can be accessed when displaying without mondofap
// - remove unused scale to screen.  If required adjust via editing script.  Will anyone miss this?
// - no longer shows 2 trailing user add to favourite images
// Nov 18, 2010
// - added debugging, issues should be much easier to find and fix.  Off by default.
// - added blur pause.  When window not focussed, the slideshows are paused until focus regained
// - fixed hotkey scroll first and last image issues, thx lolwuut
// Nov 24, 2010
// - loading bug fixes
// - added sequential loading, images are loaded and displayed in sequential order with a minimum display between images
//
//alert('mondofap');

// set to false to hide thumbs
var showThumbs=true;
// number of pictures to show per page, 
// set to -1 to disable paging and show everything but big galleries (200+ images) will really eat memory.
var perPage=500;

// change to false to not have images scaled by default
var scaleByDefault=true;
// number of seconds between images during loading
// set to zero to disable slideshow during load
var loadTimeout=4;

// expand (zoom) small images when fit to screen?
var expand=false;

// show debug info
var debug=false;

var title='';
var desc;
var head='';
var discovered=new Array();
var favURL;

// current page (starting from 0)
var currPage;
// number of pages (starting from 1)
var numPages;
// url without &page=X
var baseURL;
// number of images
var num;

// key to move to next image, in caps
var NEXT_KEY='M';
// key to move to prev image, in caps
var PREV_KEY='U';
// start/stop slideshow
var SLIDESHOW_KEY='J';
// delay between images, in ms
var SLIDESHOW_INTERVAL=5000;
// set to true to hide the scrollbar.  Nav can be done with NEXT_KEY and PREV_KEY (M/U)
// hidden scrollbar prevents mouse wheel scrolling, so it's on by default
var hideScrollbar=false;
// continue scrolling in slideshows when blurred
var scrollWhenBlurred=false;
// load images sequentially, good for lower bandwidth situations, and leads to a sequential loading slideshow.
// should be fine set as true, set to have all images loaded at once and see in load order (old behaviour)
var sequentialLoading=true;

function addPage(doc) {
	var pageIdx=document.location.href.indexOf('&pg=');
	if (pageIdx==-1) {
		currPage=0;
		baseURL=document.location.href;
	} else {
		var pgStr=document.location.href.substring(pageIdx+4);
		baseURL=document.location.href.substring(0,pageIdx);
//		alert('pgStr:'+pgStr);
		currPage=eval(pgStr);
	}
	var first=perPage*currPage;
	var last=first+perPage;



//	alert('currPage:'+currPage+' first:'+first+' last:'+last);
  // collect images
	var obj = document.getElementsByTagName('img');
	var url_regex = /(.*\/images\/thumb\/.*)\/(.*)$/i;
	var count=0;
	num=0;
  var skip=true;
  var toSkipImgs=new Array();
  var guf=document.getElementById('galleryUsersFavorites');
var toSkipEs=new Array();
if (guf) {
  toSkipEs=guf.getElementsByTagName('img');
  for (var i=0;i<toSkipEs.length;i++) 
    toSkipImgs[toSkipImgs.length]=toSkipEs[i].src;
  }
  for(var i = 0 ; i < obj.length; i++) {
		if (url_regex.test(obj[i].src)) {
			if (perPage==-1||(count>=first&&count<last)) {
// filter out those in user favs
var deny=false;
for (var j=0;j<toSkipImgs.length&&!deny;j++) {
  if (toSkipImgs[j]==obj[i].src) 
   deny=true;
}
if (deny) 
  continue;
				var temp = url_regex.exec(obj[i].src);

		    var src=temp[0].replace(/thumb/, 'full');
        // skip the first thumb, as it's the profile img (same thumb prefix)
        if (!skip) 
  		    discovered[discovered.length]=escape(src);
        else
          skip=false;
			}
			count++;
			num++;
      //+':'+obj[i].width+'x'+obj[i].height;
//      alert('src: '+src);
		}
	}
	numPages=Math.ceil(num/perPage);
//	alert('num: '+num+' pages: '+numPages);

  // parse gal title
  var fonts=document.getElementsByTagName('font');
  for (i=0;i<fonts.length;i++) {
   var curr=fonts[i];
   if (curr.color == 'white' && curr.size == '4') {
     head=curr.firstChild.firstChild.nodeValue;
     title="<b>"+head+"</b>";
	   break;
   }
  }

var mb=document.getElementById('menubar');
if (mb) {
  var as=mb.getElementsByTagName('a');
  for (var i=0;i<as.length;i++) {
    var href=as[i].getAttribute("href");
    if (href) {
      var pos=href.indexOf('/profile.php?user=');
      if (pos!=-1) {
        var tname=href.substring(pos+18,href.length);
        title=title+"<br/><a href='"+href+"'>"+tname+"</a>";
        break;
      }
    }
  }
}

  // parse poster
var as=document.getElementsByTagName('a');
for (var i=0;i<as.length;i++) {
  var a=as[i];
  var href=a.getAttribute("href");
  if (href) {
    var pos=href.indexOf('addfavorites.php');
    if (pos!=-1) {
      favURL=href;
    }
  }
}

  // parse desc
//  <td width="650" style="border: solid 1px #999999;" bgcolor='#FCFFE0'>
  var tds=document.getElementsByTagName('td');
  for (var i=0;i<tds.length;i++) {
   var td=tds[i];
   if (td.width=='650') {
     desc=td.innerHTML;
     break;
   }
  }
} // add page

function doIt() {
	addPage(document,true);

  var newBody = "<html><head>" +
  "<title>ImageFap: "+head+" (mondofap)</title>"+
  "<style type=\"text/css\"><!--" +
  "body { background: black; color: white }\n"+
  "a { text-decoration: none;" +
    "color: white;" +
    "font-family: \"Courier New\", Courier, monospace;" +
    "font-size: 12px;" +
    "}" +
  "a:hover { color: 5555FF;  }" +	
  "--></style><head><body onkeydown='hotkey(event)'>"+
  "<script language='javascript'> \
var imgURLs=new Array();\n\
var hasFocus=true;\n\
  function debug(msg) { \n\
    var debugDiv=document.getElementById('debug');\n\
    if (!debugDiv) return;\n\
    var prev=debugDiv.innerHTML; \n\
    var numLines=prev.split('<br/>').length-1;\n\
    document.getElementById('debug').innerHTML=numLines+' lines<br/>'+prev; \n\
    if (numLines>10)  \n\
      prev=prev.substring(0,prev.lastIndexOf('<br/>'));\n\
    document.getElementById('debug').innerHTML=msg+'<br/>'+prev; \n\
  }\n "+
"var lastId;\n"+
"function scrollTo(id,toPos) {"+
" if (toPos) currPos=toPos;\n"+
  "var elem=document.getElementById(id);\n"+
  " if (!elem) return; \n"+
" if (lastId!=id) {\n"+
" debug(id);\n"+
" lastId=id;\n"+
" }\n"+
  "var pos=findPos(elem);\n"+
  "//alert(\"pos:[\"+pos[0]+\",\"+pos[1]+\"]\");\n"+
  "//window.scroll(pos[0],pos[1]);}\n\
  pos=pos[1]+20; \
  window.scroll(0,pos);}\n"+
  "function findPos(obj) { \n"+
"	var curleft = curtop = 0; \n"+
"	if (obj.offsetParent) { \n"+
"		curleft = obj.offsetLeft \n"+
"		curtop = obj.offsetTop \n"+
"		while (obj = obj.offsetParent) { \n"+
"			curleft += obj.offsetLeft \n"+
"			curtop += obj.offsetTop \n"+
"		} \n"+
"	} \n"+
"	return [curleft,curtop];\n"+
"	} \n"+
" function fit() {  \n"+
" // get images \n"+
"   var imgs=document.getElementById('full').getElementsByTagName('img'); \n"+
"   for (var i=0;i<imgs.length;i++) { \n"+
"     var imgE=imgs[i]; \n"+
"if (imgE) {"+
"     if (!imgE.getAttribute('toggled')) \n"+
"     fitOne(imgE,scaled());\n"+
"}"+
"   } \n"+
" }\n"+
" var scalerRunning=true;\n"+
" var clientHeight=window.innerHeight;\n"+
" var clientWidth=window.innerWidth;\n"+
" function scaler() {\n"+
"   if (clientHeight!=window.innerHeight||clientWidth!=window.innerWidth) {\n"+
" //alert('new size: '+window.innerHeight+'x'+window.innerWidth);\n"+
"    fit();\n"+
"    clientHeight=window.innerHeight;\n"+
"    clientWidth=window.innerWidth;\n"+
"    scrollTo('aimg'+currPos);\n"+
"   } else if (scalerRunning) { \n"+
" //alert('new size: '+window.innerHeight+'x'+window.innerWidth);\n"+
"     fit();\n"+
"   }\n"+
"   setTimeout(scaler,1000);\n"+
" }\n"+
" function scaled() { return document.getElementById('isScaled').checked; }\n"+
" function toggleScale() {\n"+
"   fit();\n"+
" }\n"+
" var counter=5;\n\
  function eachSecond() {\n\
    var curr;\
    if (loadIdx>-1&&loadIdx<loadOrder.length) \
    curr=loadOrder[loadIdx]; \
 debug('loadOrder[loadIdx]: '+curr+' currPos:'+currPos+' loadIdx: '+loadIdx+' loadOrder.length:'+loadOrder.length+' numImages: '+numImages+' count:'+counter); \
    if (currPos>-1) {\
      debug('stopped lss as img selected'); \
      return; \
    } \
    if (loadIdx+1>=numImages) {\
      debug('lss done, seek 0');\
      loadIdx=-1; \
      next();\n\
      return;\
    } \
\
counter++;\
setTimeout('eachSecond()',1000);\
\
    if (loadIdx==-1)\n\
      return; \
    if (loadIdx+1>=loadOrder.length) return;\
    if (!hasFocus&&!"+scrollWhenBlurred+") { \
     debug('no lss as blurred'); \
     return; \
    } \
    if (curr) \
      scrollTo('a'+curr); \n\
    if (counter>="+loadTimeout+") { \
      counter=0; \
      var id=loadOrder[loadIdx]; \
      if (id) \
        scrollTo('a'+id); \n\
      loadIdx++\n\
    }\
  }\
  if ("+loadTimeout+">0)\
  setTimeout('eachSecond()',1000);\n\
"+
" function fitOne(imgE,scale) { \n"+
" // calc client max \n"+
"   if (imgE.getAttribute('toggled')) return;\n"+
" var clientHeight=window.innerHeight;\n"+
" var clientWidth=window.innerWidth;\n"+
"   var origHeight=imgE.getAttribute('origHeight');\n"+
"   var origWidth=imgE.getAttribute('origWidth');\n"+
"   var maxWidth=clientWidth-30; \n"+
"   var maxHeight=clientHeight-21; \n"+
"   if (origHeight<clientHeight&&origWidth<clientWidth&&!expand) return;\n"+
"   var expand="+expand+";\n"+
"       var newWidth=origWidth, newHeight=origHeight; \n"+
" if (imgE.height==origHeight){ \n"+
"if (origWidth>maxWidth) { \n"+
"	newWidth=maxWidth; \n"+
"	newHeight=origHeight*(maxWidth/origWidth); \n"+
"} else { \n"+
"	newHeight=maxHeight; \n"+
"	newWidth=origWidth*(maxHeight/origHeight); \n"+
"} \n"+
"if (newWidth>maxWidth) { \n"+
"	newWidth=maxWidth; \n"+
"	newHeight=origHeight*(maxWidth/origWidth); \n"+
"} else if (newHeight>maxHeight) { \n"+
"	newHeight=maxHeight; \n"+
"	newWidth=origWidth*(maxHeight/origHeight); \n"+
"} \n"+
"} \n"+
"// if smallest is bigger than max, resize to smallest, otherwise largest\n"+
"//       alert('resize from: '+origWidth+'x'+origHeight+' to '+newWidth+'x'+newHeight+' in client: '+maxWidth+'x'+maxHeight+' origRatio: '+(maxWidth/maxHeight)+' sizedRatio: '+(newWidth/newHeight)); \n"+
"         imgE.height=newHeight; \n"+
"         imgE.width=newWidth; \n"+
"         imgE.style.border='1px solid yellow';\n"+
" }\n"+
" function toggleOne(id) {\n"+
"  var imgE=document.getElementById(id);\n"+
"  var scale=(imgE.style.border.indexOf('0')!=-1);\n"+
"  fitOne(imgE,scale);\n"+
"  scrollTo('a'+id);\n"+
"  imgE.getAttribute('toggled')?imgE.removeAttribute('toggled'):imgE.setAttribute('toggled','true');\n"+
" }\n"+
" function log(msg) { \n"+
"   if (typeof console != 'undefined') console.log(msg);\n"+
" }\n"+
" var currPos=-1;\n"+
" var maxPos=0;\n"+
" function prev() { \n"+
"// alert('currPos: '+currPos+' maxPos:'+maxPos);\n"+
"   if (currPos>-1) { \n"+
"     currPos--; \n"+
"   }\n"+
"   if (currPos==-1) \
      window.scroll(0,0);\
    else \
      scrollTo('aimg'+currPos);\n"+
" }\n"+
" function next() { \n"+
"   if ((currPos+1)<maxPos) { \n"+
"     currPos++; \n"+
"     scrollTo('aimg'+currPos);\n"+
"   } else { \n"+
"     window.scrollTo(0,document.body.scrollHeight);\n"+
"     currPos=maxPos-1;\n"+
"   }\n"+
" }\n"+
" var slideshowActive=false;\n"+
" function toggleSlideshow() { \n"+
"  slideshowActive=!slideshowActive; \n"+
"  var elem=document.getElementById('slideshowbtn'); \n"+
"  elem.value=(slideshowActive?'Stop':'Start')+' Slideshow'; \n"+
"  if (slideshowActive) {\n"+
"    next()\n"+
"    setTimeout('slideshowNext()',"+SLIDESHOW_INTERVAL+");\n"+
"  }\n"+
" }\n"+
" function slideshowNext() { \n"+
"   if (slideshowActive&&(hasFocus||"+scrollWhenBlurred+")) { \n"+
"     if (currPos+1>maxPos) {\n"+
"       toggleSlideshow(); \n"+
"       currPos=-1;\n"+
"     }else { \n"+
"       next();\n"+
"       setTimeout('slideshowNext()',"+SLIDESHOW_INTERVAL+");\n"+
"     }\n"+
"   }\n"+
" }\n";

newBody+="var slideshowPaused=false;\n"+ 
"function hotkey(event) {\n"+
"  if (String.fromCharCode(event.keyCode)=='"+SLIDESHOW_KEY+"') {\n"+
"      toggleSlideshow();\n"+
"  } else if (String.fromCharCode(event.keyCode)=='"+NEXT_KEY+"') { \n"+
"//    slideshowActive=false;\n"+
"    next(); \n"+
"  } else if (String.fromCharCode(event.keyCode)=='"+PREV_KEY+"') {\n"+
"//    slideshowActive=false;\n"+
"    prev(); \n"+
"  }\n"+
" }\n"+
" var numLoaded=0;\n"+

" var loadIdx=-1;\n"+
" var numImages="+discovered.length+";\n"+
" var loadOrder=new Array();\n"+
" function onLoadImage(elem,id) { \n"+
"  debug('loaded: '+id); \n"+
"  elem.style.display='';\n"+
"  document.getElementById('loading'+id).style.display='none';\n"+
"  elem.setAttribute('origHeight',elem.height); \n"+
"  elem.setAttribute('origWidth',elem.width); \n"+
"  if ("+sequentialLoading+") {\n\
     var lastLoadNum=id.substring(3,id.length);\n\
     debug('lastLoaded:'+lastLoadNum);\n\
     startLoading(parseInt(lastLoadNum)+1); \
   }\n"+
"  numLoaded++;\n"+
"  loadOrder[loadOrder.length]=id;\n"+
"  if (loadIdx==-1) loadIdx=0;\n\
   else scrollTo('a'+loadOrder[loadIdx]); \n\
  document.getElementById('loadCurr').innerHTML=numLoaded;\n"+
"  if (numLoaded>=maxPos) {\n"+
"    document.getElementById('loadCounter').style.display='none';\n"+
"//    window.stop();\n"+
"    scalerRunning=false;\n"+
"  }\n"+
"  fitOne(elem,false);\n\
   if (currPos>-1) {\n\
   if (loadIdx>-1) {\
     var cid=loadOrder[loadIdx]; \
     scrollTo('a'+cid,currPos,true); \n\
   } else \n\
    scrollTo('aimg'+currPos);\n\
   } \n\
  }\n"+
" function startLoading(loadNum) {\n\
    if (loadNum>0&&loadNum<=imgURLs.length) { \n\
      var url=imgURLs[loadNum-1];\n\
      var img=document.getElementById('img'+loadNum);\n\
      img.setAttribute('src',url);\
      debug('loading img'+loadNum+': '+url); \n\
    }\n\
  }\n"+
" function searchClick(sel) { sel.value=''; sel.style.color='black'; }\n"+
" function searchBlur(sel) { if (sel.value=='') { sel.value='search'; sel.style.color='black' } };\n"+
" window.onresize=function() { debug('resize, fitting all.'); fit(); \
   if (loadIdx>-1) {\
     var cid=loadOrder[loadIdx]; \
     scrollTo('a'+cid,currPos,true); \n\
   } else \n\
    scrollTo('aimg'+currPos);\n"+
" } \n"+
" window.onblur=function() { hasFocus=false; debug('blur'); }\n\
  window.onfocus=function() { hasFocus=true; debug('focus');}\n\
		</script>";
	var pager='';
	if (perPage!=-1 && numPages>1) {
		pager="<div id='pager'>";
		
		for (var i=0;i<numPages;i++) {
			if (i==currPage) 
				pager+="<b style='margin-left: 5px'>"+(i+1)+"</b>";
			else
				pager+="<a style='margin-left: 5px' href='"+baseURL+"&pg="+i+"'>"+(i+1)+"</a>";
		}
		pager+="</div>"
	}

  var ends="<div id='debug' style='position: absolute; position: fixed; top: 80px; right: 0px; float: left; z-index: 99; text-align: right; color: white; font-size: 20px;"+(debug?'':'display: none;')+"'>Set debug to false to hide.<br/>Debug enabled.</div> \
  <table cellpadding='0' cellspacing='0' width='100%'>"+
  "<form action='/gallery.php' method='POST'>"+
  "<tr><td width='33%' valign='top'>"+
  title+"</td>"+
  "<td width='33%' valign='top' align='center'>";
	if (perPage!=-1 && numPages>1) 
    ends+="<b>"+num+"</b> images across <b>"+numPages+"</b> pages<br/>"+pager;
  ends+="</td>"+
  "<td width='33%' align='right' valign='top' width='300'>"+
  "<input class='input' size=10 type='text' name='search' style='background: darkgrey; color: black' value='search' "+
  "onfocus='searchClick(this)' onblur='searchBlur(this)'>"+
  "[<a onclick='document.location.href=document.location.href+\"&nomondofap\"'>Hide MondoFap</a>]<br/>"+
  "<span id='loadCounter' style='padding-right: 25px'>Loaded <span id='loadCurr'>0</span> of <span id='loadMax'/></span></span>\n"+
  "<input type='button' id='slideshowbtn' onclick='toggleSlideshow()' value='Start Slideshow'/>\n"+
  "<input type='checkbox' checked='"+scaleByDefault+"' class='scale' onclick='toggleScale()' id='isScaled' style='display: none'/> "+
	"</td></tr></form></table>";
//<span style='margin-right: 20px' onclick='toggleScale()'>fit to screen</span>"+	
	newBody+=ends+"<p/>";
  //newBody+="<div id=\"debug\" style=\"position: absolute; float: top; background: blue; height: 150px; width: 150px;\">debug</div>\n";
  newBody+="<center id=\"top\">";
//	"<input class='input' type='submit' name='submit' style='background: darkgrey' value='Search!'>"+

  if (desc) 
    newBody+=desc+"<p/>";
  
  if (showThumbs) {
    newBody+"<div style=\"margin: 30px\">";
    for (var i=0;i<discovered.length;)  {
      var j=0;
      for (;j<6&&i+j<discovered.length;j++) {
        var disc=unescape(discovered[i+j]);
        var src=disc.replace(/full/, 'thumb');
		    newBody+="<a href=\"javascript:scrollTo('aimg"+(i+j)+"',"+(i+j)+")\"><img style=\"border: 1px solid red; margin: 5px\" src=\"" +src+ "\"/></a>";
//			  newBody+="<img style=\"border: 0px; margin: 10px\" src=\"" +src+ "\"/>";
		  }
		  i=i+j;
	  }
	  newBody+="</div><p/><hr/>";
	}
	newBody+="<p/>";

newBody+="<a id='aimg0'></a>";
newBody+="<div id='full'>"
  for (var i=0;i<discovered.length;i++) { 
		newBody+="<a id='aimg"+(i+1)+"' onClick='toggleOne(\"img"+(i+1)+"\")'><img style='display: none; border: 0px' id='img"+i+"' onload=\"onLoadImage(this,'img"+i+"')\"";
    if (sequentialLoading && i>0)
      newBody+="/><script>imgURLs[imgURLs.length]='" +unescape(discovered[i])+ "';</script>";
    else 
      newBody+=" src=\"" +unescape(discovered[i])+ "\"/>";
    newBody+="</a><div onclick='document.getElementById('img"+(i+1)+"').style.display=\'\'' id='loadingimg"+i+"' style='font-size: 12px'>Loading "+(i+1)+" of "+(discovered.length)+"...</div><p />";
//		newBody+="<img style='border: 0px' id='img"+i+"' onload=\"onLoadImage(this,'img"+i+"')\" src=\"" +unescape(discovered[i])+ "\"/><p />";
  newBody+="<script>maxPos="+discovered.length+"; document.getElementById('loadMax').innerHTML=maxPos;</script>";
//    newBody+="<script>var img=document.getElementByID('img"+i+"'); if (img.width>clientWidth) { img.style.width='100%'; img.onClick=restore('img'+i,img.width
}
newBody+="</div>";



  newBody+="<p/>";
  newBody+="</center>";
  newBody+="<table width='100%' border='0'><tr><td><a title='ImageFap.com' href='/profile.php'><img alt='ImageFap.com' src='/img/logo.gif' border=0></a></td>\n"+
"<td align='center'>[<a href='"+favURL+"'>Add To Favorites</a>]</td>\n"+
"<td align='right'>via <a style='font-size: 16px; font-weight: bold' href='http://userscripts.org/scripts/show/15603'>mondofap</a></td></tr></table>";
newBody+="<a name='end'></a><script>scaler();\n";
if (hideScrollbar)
newBody+="setTimeout(function() {document.getElementsByTagName('body')[0].style.overflow='hidden';},500);</script>";
  newBody += "</body></html>";
  document.write(newBody);
}


// if referring to a gallery, not a search, etc.
//if (document.location.href.indexOf('gid=')!=-1)  {
  // if url doesn't have a &view= in it, redirect to url+'&view=2', which shows all thumbs on one page
  // thanks to whitewaterfap
var loc=document.location.href;
if (loc.indexOf('search')!=-1) {
  // ignore new search in gallery.php
} else if (loc.indexOf('view=')==-1) {
 // if url is in format http://imagefap.com/gallery/12345 change to http://imagefap.com/gallery.php?gid=12345
 // full thumb display doesn't work otherwise
 var pos=loc.indexOf('/gallery/');
 if (pos!=-1) 
   loc=loc.substring(0,pos)+'/gallery.php?gid='+loc.substring(pos+9);

 if (loc.indexOf('?')==-1) 
  document.location.replace(loc+'?view=2');
 else
  document.location.replace(loc+'&view=2');


} else {
  if (document.location.href.indexOf('nomondofap')==-1)
    setTimeout(function() { doIt(); },500);
}
//}