// ==UserScript==
// @name           MondoMotherless
// @namespace      benow.ca
// @description    Motherless.com gallery viewer
// @include        http://motherless.com/*
// ==/UserScript==

//alert('mondomotherless');
var imgInfos=new Array();
var loadImagePos=0;
var bodyE=document.getElementsByTagName('body')[0];
var thumbDiv;
var mainImg;
var serializer=new XMLSerializer();
var mediaSpace;
// toggle slideshow
var SLIDESHOW_KEY=' ';
// millis between image flip
var slideshowTimeout=4000;
// start slideshow automatically after this many images have loaded
// set to -1 to disable slideshow autostart
var slideshowAutoAfter=-1;

function GalleryInfo(url,thumb) {
  this.url=url;
  this.thumb=thumb;
}

function ImageInfo(imgPage,thumb,title) {
  this.idx=imgInfos.length;
  this.imgPage=imgPage;
  this.thumb=thumb;
  this.title=title;
  this.containing=new Array();
}

ImageInfo.prototype.addContaining = function(url,thumb) {
  this.containing[this.containing.length]=new GalleryInfo(url,thumb);
}

function addPage(currPage) {
  var divs=currPage.getElementsByTagName('div');
  for (var i=0;i<divs.length;i++) {
    var curr=divs[i];
    var divClass=curr.getAttribute('class');
    if (divClass&&divClass.indexOf('thumbnail ')>=0) {
      addThumb(curr);
    } else if (divClass=='pagination_link') {
      doPagination(curr);
    }
  }
  ajaxGetNextGalleryImage();
}

function doPagination(elem) {
  var as=elem.getElementsByTagName('a');
  if (as.length>1 && as.length-2) {
    var spans=elem.getElementsByTagName('span');
    var currPage=1;
    for (var i=0;i<spans.length;i++) {
      var curr=spans[i];
      var currClass=curr.getAttribute('class');
      if (currClass&&currClass=='current') {
        currPage=parseInt(curr.firstChild.data);
        break;
      }
    }
    var lastPageA=as[as.length-2];
    var lastPageS=lastPageA.firstChild.data;
    if (lastPageS) {  
      var lastPage=parseInt(lastPageS);
      var sel=document.createElement('select');
      thumbDiv.appendChild(sel);
      thumbDiv.insertBefore(sel,thumbDiv.firstChild);
      sel.setAttribute('id','pageSel');
      sel.setAttribute('onchange','document.location.href=this.options[this.selectedIndex].value');
      sel.setAttribute('style','width: 100%; margin-top: 5px; margin-bottom: 5px; text-align: center');
      var query='';
      var prefix=lastPageA.getAttribute('href');
      var pp=prefix.indexOf('?');
      if (pp>-1) 
        prefix=prefix.substring(0,pp);
//alert('prefix: '+prefix);
      var pos=document.location.href.indexOf('?');
      if (pos>-1) {
        var p=document.location.href.substring(pos+1);
        pos=p.indexOf('q=');
        if (pos>-1) {
          p=p.substring(pos);
          pos=p.indexOf('&');
          if (pos>-1)
            p=p.substring(0,pos);
          query='&'+p;
        }
      }
      for (var i=0;i<lastPage;i++) {
	var selURL=prefix+'?page='+(i+1)+query;
      var opt=document.createElement('option');
      opt.appendChild(document.createTextNode(''+(i+1)));
      opt.setAttribute('value',selURL);
      sel.appendChild(opt);
      }
      sel.selectedIndex=currPage-1;
    }
  }
}

function addThumb(aDiv) {
  var thumbURL;
  var imgPage;
  var isVid=false;
  var title;
  var imgs=aDiv.getElementsByTagName('img');
  if (imgs.length>0) {
    var tURL=imgs[0].getAttribute('src');
    if (tURL.indexOf('thumbs.motherless')>-1) {
      thumbURL=tURL;
      imgPage=imgs[0].parentNode.getAttribute('href');
    }
//    alert('thumbDiv: '+new XMLSerializer().serializeToString(thumbDiv));
//    document.write('<img src="'+thumbURL+'"/><br/>');

  } else { // try video div
    var divs=aDiv.getElementsByTagName('div');
    for (var i=0;i<divs.length;i++) {
      var curr=divs[i];
      var currClass=curr.getAttribute('class');
      if (currClass&&currClass.indexOf('video_strip ')>-1) {
        var bg=curr.style.backgroundImage;
        var pos=bg.indexOf('")');
        thumbURL=bg.substring(5,pos);
        imgPage=curr.parentNode.getAttribute('href');
        isVid=true;
        var tt=curr.parentNode.getAttribute('title');
        if (tt&&tt!=null)
	  title=tt;
        break;
      }
    }
  }

  if (thumbURL) {
    var info=new ImageInfo(imgPage,thumbURL,title);
    imgInfos[imgInfos.length]=info;
    var imgDiv=document.createElement('div');
    thumbDiv.appendChild(imgDiv);
    var imgE=document.createElement('img');
    imgDiv.appendChild(imgE);
    imgE.setAttribute('id','thumb'+info.idx);
    imgE.setAttribute('src',thumbURL);
    imgE.setAttribute('src-url',imgPage);
    if (title)
    imgE.setAttribute('title',title);
    if (isVid) {
      imgDiv.setAttribute('style','width: 80px; overflow-x: hidden ! important');
      imgE.setAttribute('style','height: 66px;');
      imgE.setAttribute('is-video','true');
      imgE.style.opacity='0.5'; 
    } else {
      imgE.setAttribute('style','display: block; width: 80px;');
      imgE.style.opacity='0.2'; 
    }

    imgE.setAttribute('onclick','showImage('+info.idx+')');
  }
  //else alert('no img in: '+new XMLSerializer().serializeToString(thumbDiv));
}

function parseGalleryImageText(text,imgInfo) {
          var thumbE=document.getElementById('thumb'+imgInfo.idx);
  var pos=text.lastIndexOf('?full');
  if (pos==-1)
    pos=text.indexOf('Back To Gallery');
  if (pos==-1) 
    pos=text.indexOf('Group Home');
  if (pos==-1) 
    pos=text.indexOf('clear: left;');
  if (pos>-1) {
    text=text.substring(pos);
    pos=text.indexOf('src="');
    if (pos>-1) {
      text=text.substring(pos+5);
      pos=text.indexOf('"');
      var src=text.substring(0,pos);
      doLog('found image: '+src);
      imgInfo.img=new Image();
      imgInfo.img.src=src;
      imgInfo.img.setAttribute('onload','onLoadFull('+imgInfo.idx+')');
      thumbE.setAttribute('full',src);
//        imgInfo.img.onload='onLoadFull('+imgInfo.idx+',\''+src+'\')';
    } else {
      thumbE.style.border='1px solid red';
      doLog('not found: img src=" in '+thumbE.getAttribute('src-url'));
    }
  } else { 
    thumbE.style.border='1px solid red';
    doLog('not image block found in '+thumbE.getAttribute('src-url'));
  }

  var script='';
  if (imgInfo.idx==0) 
    script+='showImage('+imgInfo.idx+');';
  if (slideshowAutoAfter!=-1 && imgInfo.idx==slideshowAutoAfter) 
    script+='toggleSlideshow();';
  if (script!='') {
    var scriptE=document.createElement('script');
    scriptE.appendChild(document.createTextNode(script));
    bodyE.appendChild(scriptE);
  }


}

function doLog(msg) {
  if (typeof window.console != 'undefined')
    console.log(msg);
}

function ajaxGetNextGalleryImage() {
  if (loadImagePos>=imgInfos.length) {
//    alert('finished loading, '+loadImagePos+'>='+imgInfos.length);
    return;
  }
  var imgInfo=imgInfos[loadImagePos];
  var thumbE=document.getElementById('thumb'+loadImagePos);
  if (thumbE.hasAttribute('is-video'))  {
    if (imgInfo.idx==0) { 
      var scriptE=document.createElement('script');
      scriptE.appendChild(document.createTextNode('showImage('+imgInfo.idx+')'));
      bodyE.appendChild(scriptE);
    }
    loadImagePos++;
      if (loadImagePos<3)
    ajaxGetNextGalleryImage();     
    return;
  }
    
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {  
      if (xmlhttp.status==200) {
//      alert('ajax: '+xmlhttp.responseText);
        parseGalleryImageText(xmlhttp.responseText,imgInfos[loadImagePos]);
      }
      loadImagePos++;
//      if (loadImagePos<5)
      ajaxGetNextGalleryImage();     
    }
  }
  xmlhttp.open("GET",imgInfo.imgPage,true);
  xmlhttp.send();
}

function replaceBody() {
  var bodyE=document.getElementsByTagName('body')[0];
  var cn=bodyE.childNodes;
  for (var i=0;i<cn.length;i++) {
    var curr=cn[i];
    if (curr.style)
      curr.style.display='none';
  }
  thumbDiv=document.createElement('div');
  bodyE.appendChild(thumbDiv);
  thumbDiv.setAttribute('id','thumbs');
  thumbDiv.setAttribute('style','position: fixed; bottom: 0px; top: 0px; width: 80px; overflow-x: hidden ! important; overflow-y: hidden ! important; white-space: nowrap; background: black; text-align: center; border-right: 2px solid #522');
  var imgDiv=document.createElement('div');
  bodyE.appendChild(imgDiv);
  imgDiv.setAttribute('style','position: fixed; left: 100px; text-align: center; vertical-align: middle; bottom: 0px;  top: 0px; right: 0px;');

//  bodyE.setAttribute('onkeypress','keyDown(event)')
  var mainImgA=document.createElement('a');
  imgDiv.appendChild(mainImgA);
  mainImgA.setAttribute('target','_blank');

  mainImg=document.createElement('img');
  mainImg.setAttribute('id','mainImg');
  mainImg.setAttribute('style','position: absolute; margin: 10px; max-height: '+(window.innerHeight-20)+'px; max-width: '+(window.innerWidth-120)+'px; vertical-align: middle; align: center; border: 1px solid black; display: none');
  mainImg.setAttribute('onload','onLoadMainImage(this)');
  mainImgA.appendChild(mainImg);

  mediaSpace=document.createElement('iframe');
  mediaSpace.setAttribute('name','mediaspace');
  mediaSpace.setAttribute('id','mediaspace');
  mediaSpace.setAttribute('style','position: absolute; display: none; top: 100px; left: 100px; border: 0px; width: 710px; height: 600px;');
  imgDiv.appendChild(mediaSpace);

  var vpsDiv=document.createElement('div');
  vpsDiv.setAttribute('style','position: absolute; top: 100px; left: 100px; width: 340px; height: 280px; vertical-align: middle; align: center; border: 1px solid black; display: none; overflow-x: hidden ! important');
  imgDiv.appendChild(vpsDiv);
  var vidPreviewSpace=document.createElement('img');
  vidPreviewSpace.setAttribute('id','vidPreviewSpace');
  vidPreviewSpace.setAttribute('style','height: 280px; cursor: pointer');
  vpsDiv.appendChild(vidPreviewSpace);
  vidPreviewSpace.setAttribute('onclick',"\
      var mediaSpace=document.getElementById('mediaspace'); \
      mediaSpace.setAttribute('src',this.getAttribute('src-url')+'?hide'); \
      this.parentNode.style.display='none'; \
      mediaSpace.style.display=''; \
      mediaSpace.style.top=(((window.innerHeight-569)/2)-10)+'px'; \
      mediaSpace.style.left=(((window.innerWidth-694)/2)-50)+'px'; \
  ");
  var vidPreviewTitle=document.createElement('div');
  vidPreviewTitle.setAttribute('id','vidPreviewTitle');
  imgDiv.appendChild(vidPreviewTitle);
  
  var info=document.createElement('span');
  bodyE.appendChild(info);
  info.setAttribute('id','info');
  info.setAttribute('style','position: absolute; top: 5px; left: 90px; color: grey; display: none; z-order: 95');

  var tabTable=document.createElement('table');
  bodyE.appendChild(tabTable);
  tabTable.setAttribute('cellpadding','0px');
  tabTable.setAttribute('cellspacing','0px');
  tabTable.setAttribute('style','position: fixed; top: 5px; right: 0px; border: 0px');
  var tr=tabTable.insertRow(0);
  var td=tr.insertCell(0);
  td.setAttribute('id','mmMenu');
  td.setAttribute('style','height: 20px; background: #222; border: 1px solid #522; color: red; padding 5px; vertical-align: top; cursor: pointer');
  td.setAttribute('onclick','tabClick()');
  td.innerHTML='<<';
  td=tr.insertCell(1);
  td.setAttribute('style','height: 20px; background: #444; border: 1px solid #522; color: black; padding: 5px; vertical-align: top; text-align: left; display: none; text-align: center');
  td.setAttribute('rowspan','2');
  td.setAttribute('id','tabBody');

  var iframe=document.createElement('iframe');
  td.appendChild(iframe);
  iframe.setAttribute('style','display: none');
  iframe.setAttribute('id','hiddenIframe');


  var aE=document.createElement('div');
  td.appendChild(aE);
  aE.setAttribute('onclick','window.open("http://userscripts.org/scripts/show/98351")');
  aE.setAttribute('style','color: white; cursor: pointer; text-decoration: none; border: 1px solid black; background: #222; padding: 5px');
  aE.appendChild(document.createTextNode('MondoMotherless'));

  var form=document.createElement('div');
  td.appendChild(form);
/*
  form.setAttribute('onsubmit','');
  form.setAttribute('method','get');
  form.setAttribute('name','q');
*/
  form.setAttribute('style','width: 40px; margin-right: 5px;');
  var inp=document.createElement('input');
  inp.setAttribute('onchange','document.location.href="/search/?q="+this.value');
  form.appendChild(inp);
  if (document.location.href.indexOf('search/')>-1) {
    var title=parseTitle(document);
    if (title)
      inp.setAttribute('value',title);
  }

  td.appendChild(document.createElement('br'));

  aE=document.createElement('a');
  td.appendChild(aE);
  aE.setAttribute('onclick','document.getElementById("hiddenIframe").src="http://motherless.com/favorites/add?codename="+currId+"#favorite"; this.innerHTML="added favorite"; this.style.cursor="default"; this.style.color="grey"');
  aE.setAttribute('style','cursor: pointer');
  aE.appendChild(document.createTextNode('add favorite'));

  td.appendChild(document.createElement('br'));
  
  aE=document.createElement('a');
  td.appendChild(aE);
  aE.setAttribute('onclick',"\
  var src=document.getElementById('media-link-group'); \
  var evObj = document.createEvent('MouseEvents'); \
  evObj.initEvent( 'click', true, false ); \
  src.dispatchEvent(evObj); \
  ");
  aE.setAttribute('style','cursor: pointer');
  aE.appendChild(document.createTextNode('add to group'));

/*
  td.appendChild(document.createElement('br'));
  var urlDiv=document.createElement('div');
  td.appendChild(urlDiv);
  urlDiv.setAttribute('id','urlDiv');
  urlDiv.style.border='1px solid black';
  urlDiv.style.background='lightgrey';
  urlDiv.style.display='none';
*/

  td.appendChild(document.createElement('br'));
  var urlInput=document.createElement('textarea');
  td.appendChild(urlInput);
  urlInput.style.display='none';
  urlInput.setAttribute('id','urlInput');
  urlInput.setAttribute('rows','10');
  urlInput.setAttribute('cols','30');
  urlInput.setAttribute('onkeyup','urlInputChange(this)');
  urlInput.setAttribute('onfocus','this.select()');
  
/*
  aE=document.createElement('a');
  td.appendChild(aE);
  aE.setAttribute('onclick',"\
  var src=document.getElementById('media-link-gallery'); \
  var evObj = document.createEvent('MouseEvents'); \
  evObj.initEvent( 'click', true, false ); \
  src.dispatchEvent(evObj); \
  ");
  aE.setAttribute('style','cursor: pointer');
  aE.appendChild(document.createTextNode('add to gallery'));
*/

  tr=tabTable.insertRow(1);
  td=tr.insertCell(0);
  td.setAttribute('style','height: 99%');
  

  var iframe=document.createElement('iframe');
  iframe.setAttribute('id','mdlIframe');
  iframe.setAttribute('style','display: none');
  bodyE.appendChild(iframe);
    

  var scriptBody="\
var currIdx=0; \
var currId; \
var currURL; \
var currIsImage=false; \
var vidPreviewCount=0; \
var slideshowActive=false; \
var slideshowIdx=0; \
function showImage(pos) { \
  var old=document.getElementById('thumb'+currIdx); \
  var curr=document.getElementById('thumb'+pos); \
  if (!curr) \
    return; \
  currIdx=pos; \
  var mainImg=document.getElementById('mainImg'); \
  var mediaSpace=document.getElementById('mediaspace'); \
  var vidPreviewSpace=document.getElementById('vidPreviewSpace'); \
  var vidPreviewTitle=document.getElementById('vidPreviewTitle'); \
  var src; \
  if (curr.hasAttribute('full')) { \
    mainImg.setAttribute('src',curr.getAttribute('full')); \
    src=curr.getAttribute('src-url'); \
    mainImg.parentNode.setAttribute('href',src); \
    mainImg.style.display=''; \
    if (src.indexOf('motherless')==-1) \
      src='http://motherless.com'+src; \
    currURL=src; \
    currIsImage=true; \
    mediaSpace.style.display='none'; \
    vidPreviewSpace.parentNode.style.display='none'; \
    vidPreviewTitle.style.display='none'; \
  } else if (curr.hasAttribute('is-video')) { \
    mediaSpace.style.display='none'; \
    vidPreviewSpace.setAttribute('src',curr.getAttribute('src')); \
    src=curr.getAttribute('src-url'); \
    if (src.indexOf('motherless')==-1) \
      src='http://motherless.com'+src; \
    currURL=src; \
    currIsImage=false; \
    vidPreviewSpace.setAttribute('src-url',src); \
    vidPreviewSpace.parentNode.style.display=''; \
    vidPreviewSpace.parentNode.style.top=(((window.innerHeight-vidPreviewSpace.height)/2)-10)+'px'; \
    vidPreviewSpace.parentNode.style.left=(((window.innerWidth-(vidPreviewSpace.width/5))/2)-50)+'px'; \
    var title=curr.getAttribute('title'); \
    var c=vidPreviewTitle.firstChild; \
    if (c) \
      vidPreviewTitle.removeChild(c); \
    if (title) { \
      vidPreviewTitle.appendChild(document.createTextNode(title)); \
      vidPreviewTitle.style.display=''; \
      vidPreviewSpace.setAttribute('title',title); \
    } else {\
      vidPreviewTitle.style.display='none'; \
      vidPreviewSpace.setAttribute('title',''); \
    } \
    mainImg.style.display='none'; \
  } \
  var pos=src.lastIndexOf('/'); \
  currId=src.substring(pos+1); \
  vidPreviewCount=0; \
  curr.parentNode.parentNode.scrollTop=curr.parentNode.offsetTop-250; \
  old.parentNode.style.border='0px'; \
  old.style.opacity='0.5'; \
  curr.parentNode.style.borderTop='4px solid red'; \
  curr.parentNode.style.borderBottom='4px solid red'; \
  curr.style.verticalAlign='middle'; \
  curr.parentNode.style.opacity='1.0'; \
} \
function onLoadMainImage(img) { \
  doLog('onLoadMainImage img.height: '+img.height+' window.innerHeight: '+window.innerHeight+' img.width: '+img.width+' window.innerHeight: '+window.innerHeight); \
  if (img.height>window.innerHeight) { \
    img.style.top='0px'; \
    img.height=(window.innerHeight-40)+'px'; \
  } else { \
    img.style.top=(((window.innerHeight-img.height)/2)-10)+'px'; \
  } \
  if (img.width>(window.innerWidth-100)) { \
    img.style.left='110px'; \
    img.width=(window.innerWidth-150)+'px'; \
  } else \
    img.style.left=(((window.innerWidth-img.width)/2)-50)+'px'; \
  doLog('top: '+img.style.top+' left: '+img.style.left+' img.height: '+img.height+' img.width: '+img.width); \
} \
function queueCurrent() { \
  var inp=document.getElementById('urlInput'); \
  if (inp.value.indexOf(currURL)==-1) { \
    inp.style.display=''; \
    inp.value+=currURL+'\\n'; \
    var numLines=1; \
    for (var i=0;i<inp.value.length;i++) if (inp.value.charAt(i)=='\\n') numLines++; \
    document.getElementById('mmMenu').style.background='yellow'; \
    setTimeout(\"document.getElementById('mmMenu').style.background='#222';\",500); \
    doLog('queued url: '+numLines+': '+currURL); \
  } \
  var mdlURL='http://localhost:1069/'+currURL; \
  document.getElementById('mdlIframe').src=mdlURL; \
  doLog('hit: '+mdlURL); \
}\
function urlInputChange(inp) { \
  if (inp.value.length==0) \
    inp.style.display='none'; \
} \
function keyDown(event) { \
  if (event.keyCode==1234)  \
    toggleSlideshow(); \
  else if (event.keyCode==40)  \
    next(); \
  else if (event.keyCode==38) \
    prev(); \
  else if (event.keyCode==37)  \
    prevPage(); \
  else if (event.keyCode==39) \
    nextPage(); \
  else if (event.keyCode==36) { \
    stopSlideshow(); \
    showImage(0); \
  } else if (event.keyCode==68) { \
    queueCurrent(); \
  } else if (event.keyCode==27) { \
    tabClick(); \
  } else if (event.keyCode==35) \
    last(); \
  else if (String.fromCharCode(event.charCode)=='"+SLIDESHOW_KEY+"') \
    toggleSlideshow(); \
  else doLog('unknown keycode: '+event.keyCode+'('+String.fromCharCode(event.charCode)+')'); \
} \
window.addEventListener('keydown', keyDown, true); \
function toggleSlideshow() { \
  slideshowActive=!slideshowActive; \
  if (slideshowActive) \
    onSlideshowTimeout(); \
  showInfo('Slideshow '+(slideshowActive?'Started':'Stopped')); \
} \
function stopSlideshow() { \
  if (slideshowActive) { \
    slideshowActive=false; \
    showInfo('Slideshow Stopped'); \
  } \
} \
function tabClick() { \
  var tb=document.getElementById('tabBody'); \
  tb.style.display=tb.style.display=='none'?'':'none'; \
  if (tb.style.display=='') { \
    var inp=document.getElementById('urlInput'); \
    if (inp.value.length>0) { \
      inp.focus(); \
      inp.select(); \
    } \
  } \
} \
function onSlideshowTimeout() { \
  if (slideshowActive) { \
    var thumbE=document.getElementById('thumb'+(currIdx+1)); \
    if (thumbE) { \
    if (!thumbE.hasAttribute('full')) \
      setTimeout('onSlideshowTimeout()',1000); \
    else { \
      showImage(currIdx+1); \
      setTimeout('onSlideshowTimeout()',"+slideshowTimeout+"); \
    } \
    } \
  } \
} \
function onLoadFull(idx) { \
  var thumbE=document.getElementById('thumb'+idx); \
  thumbE.style.opacity='0.5'; \
} \
function showInfo(msg) { \
  var info=document.getElementById('info'); \
  info.innerHTML=msg; \
  info.style.display=''; \
  setTimeout('hideInfo()',1000); \
}\
function hideInfo() { \
  document.getElementById('info').style.display='none'; \
} \
function prevPage() { \
  var sel=document.getElementById('pageSel'); \
  if (sel&&sel.selectedIndex>0) { \
    showInfo('Loading previous gallery page: '+sel.selectedIndex+' of '+sel.options.length); \
    document.location.href=sel.options[sel.selectedIndex-1].value; \
  } \
} \
function nextPage() { \
  var sel=document.getElementById('pageSel'); \
  if (sel&&(sel.selectedIndex+1)<sel.options.length) { \
    showInfo('Loading next gallery page: '+(sel.selectedIndex+2)+' of '+sel.options.length); \
    document.location.href=sel.options[sel.selectedIndex+1].value; \
  } \
} \
function last() { \
  var idx=0; \
  while (true) { \
    var thumbNext=document.getElementById('thumb'+(idx+1)); \
    if (!thumbNext||!thumbNext.hasAttribute('full')) { \
      stopSlideshow(); \
      showImage(idx); \
      break; \
    } \
    idx++; \
  } \
} \
function next() { \
  var thumbE=document.getElementById('thumb'+(currIdx+1)); \
  if (thumbE) { \
    stopSlideshow(); \
    eval(thumbE.getAttribute('onclick')); \
  } \
} \
function prev() { \
  var thumbE=document.getElementById('thumb'+(currIdx-1)); \
  if (thumbE) { \
    stopSlideshow(); \
    eval(thumbE.getAttribute('onclick')); \
  } \
} \
function doLog(msg) { \
  if (typeof window.console != 'undefined') \
    console.log(msg); \
}\
var hideCount=0; \
function vidThumbScroll() { \
  var thumbDiv=document.getElementById('thumbs'); \
  var thumbs=thumbDiv.getElementsByTagName('img'); \
  var hasVids=false; \
  for (var i=0;i<thumbs.length;i++) { \
    var img=thumbs[i]; \
    if (img.hasAttribute('is-video')) { \
      hasVids=true; \
      var width=img.width; \
      var newLeft=width/5+img.parentNode.scrollLeft; \
      if ((newLeft+10)>width) \
        newLeft=0; \
      img.parentNode.scrollLeft=newLeft; \
    } \
  } \
  var img=document.getElementById('vidPreviewSpace'); \
  var mediaSpace=document.getElementById('mediaspace'); \
  if (img.parentNode.style.display=='') { \
    doLog('vidPreviewCount: '+vidPreviewCount); \
    if (vidPreviewCount==5) { \
      mediaSpace.setAttribute('src',img.getAttribute('src-url')+'?hide'); \
    } else if (vidPreviewCount==10) { \
      img.parentNode.style.display='none'; \
      mediaSpace.style.display=''; \
      mediaSpace.style.top=(((window.innerHeight-569)/2)-10)+'px'; \
      mediaSpace.style.left=(((window.innerWidth-694)/2)-50)+'px'; \
    } else { \
      var width=img.width; \
      var newLeft=width/5+img.parentNode.scrollLeft; \
      if ((newLeft+10)>width) \
        newLeft=0; \
      img.parentNode.scrollLeft=newLeft; \
    } \
    vidPreviewCount++; \
  } \
  if (hasVids) \
    setTimeout('vidThumbScroll()',1000); \
} \
setTimeout('vidThumbScroll()',1000); \
";

  var scriptE=document.createElement('script');
  scriptE.appendChild(document.createTextNode(scriptBody));
  bodyE.appendChild(scriptE);

  return bodyE;
}

function normVidPage() {
  var bodyE=document.getElementsByTagName('body')[0];
	var vlnk=parseVidLink(document);
	
	var as=document.getElementsByTagName('a');
	for (var i=0;i<as.length;i++) {
	  var a=as[i];
	  if (a.getAttribute('href')=='/premium') 
	    a.setAttribute('href',vlnk);
	}
}

function processVidPage() {
  var bodyE=document.getElementsByTagName('body')[0];
  var cn=bodyE.childNodes;
  for (var i=0;i<cn.length;i++) {
    var curr=cn[i];
    if (curr.style)
      curr.style.display='none';
  }
  bodyE.appendChild(ms);
  var divE=document.createElement('div');
  divE.setAttribute('style','margin-top: 10px;');
  bodyE.appendChild(divE);
  
  var aE=document.createElement('a');
  divE.appendChild(aE);
  var src=document.location.href.substring(0,document.location.href.indexOf("?"));
  aE.setAttribute('href',src);
  aE.setAttribute('style','color: darkgrey; text-decoration: none; font-size: 10px; padding-right: 10px;');
  aE.setAttribute('target','_blank');
  var title=parseTitle(document);
  if (!title)
    title='open video page';
  aE.appendChild(document.createTextNode(title));

  var vlnk=parseVidLink(document);
  aE=document.createElement('a');
  divE.appendChild(aE);
  aE.setAttribute('href',vlnk);
  aE.setAttribute('style','color: darkgrey; text-decoration: none; font-size: 10px; padding-left: 10px; border-left: 1px solid black;');
  aE.setAttribute('target','_blank');
  aE.appendChild(document.createTextNode('download'));
}

function parseTitle(document) {
  var title=document.getElementsByTagName('title')[0].firstChild.data;
  var pos=title.lastIndexOf(':');
  if (pos>-1) 
    return title.substring(pos+1);
  return null;
}

function parseVidLink(document) {
  var scripts=document.getElementsByTagName('script');
  for (var i=0;i<scripts.length;i++) {
    if (scripts[i].firstChild) {
    var script=scripts[i].firstChild.data;
    if (script.indexOf('mediaspace')>0) {
      var pos=script.indexOf("file: '");
      if (pos>-1) {
        script=script.substring(pos+7);
        var dlURL=script.substring(0,script.indexOf("'"));
        return dlURL+'?start=0';
      }
      
    }
    }
  }
  return null;
}

function barHider() {
var hideScript="\
var hideCount=0; \
function hideBar() { \
var stupidBar=document.getElementById('ss_bar'); \
if (stupidBar) \
  stupidBar.style.display='none'; \
hideCount++; \
if (hideCount<15) \
  setTimeout('hideBar()',200); \
} \
";
var scriptE=document.createElement('script');
scriptE.appendChild(document.createTextNode(hideScript));
var bodyE=document.getElementsByTagName('body')[0];
bodyE.appendChild(scriptE);


// hide the stupid bar
setTimeout("hideBar()",500);
}


// only modify if is directly a gallery overview page,  
// not something in a gallery (pic, etc)
var url=document.location.href;
var pos=url.indexOf('com/');
if (pos>-1) {
  url=url.substring(pos+4);
  var ms=document.getElementById('mediaspace');
  if (ms) {
    if (document.location.href.indexOf('?hide')>0) 
      processVidPage();
    else
    	normVidPage();

  } else if (url.indexOf('u/')==0&&(url.indexOf('?t=')>-1||url.indexOf('page=')>0)) {
doLog('url: '+url);
      var oldBody=replaceBody();
      addPage(oldBody);
  } else if (url.indexOf('G')==0) {
    var pos=url.indexOf('/');
    if (pos==-1) {
      var oldBody=replaceBody();
      addPage(oldBody);
    } 
  } else if (url.indexOf('gi/')==0||url.indexOf('gv/')==0||url.indexOf('search/videos')==0||url.indexOf('search/images')==0) {
    var oldBody=replaceBody();
    addPage(oldBody);
  } else doLog('unknown url suffix: '+url);
} 

barHider();

