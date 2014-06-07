// ==UserScript==
// @name           Google Images direct link
// @namespace      http://userscripts.org/users/lorentz
// @description    Add direct link to images and pages in google image search
// @include        http*://images.google.*/images*
// @include        http*://www.google.*/images*
// @include        http*://www.google.*/webhp*
// @include        http*://www.google.*/search?*
// @include        http*://www.google.*/imgres*
// @include        http*://images.google.*/search?*
// @include        https://encrypted.google.com/search?*
// @version        4.1
// @grant          none
// ==/UserScript==


var doubleDecodeURIComponent = function (component){
  var tmp = decodeURIComponent(component);
  tmp = decodeURIComponent(tmp);
  return tmp;
}

var parseUrl = function (url) {
  var qstr = url.split('?')[1];
  var rawparams = qstr.split('&');
  var par = new Array();
  var i;
  for (i=0 ; i<rawparams.length ; i++){
    var p = rawparams[i].split("=");
    par[p[0]] = p[1];
  }
  return par;
}

var getImageLinks = function (url){
  var param = parseUrl(url);
  var links = new Object();
  links.toImgHref = decodeURIComponent(param["imgurl"]);
  links.toPageHref = decodeURIComponent(param["imgrefurl"]);
  return links;  
}

var getNewImageLinks = function (url){
  var param = parseUrl(url);
  var links = new Object();
  links.toImgHref = doubleDecodeURIComponent(param["imgurl"]);
  links.toPageHref = decodeURIComponent(param["imgrefurl"]);
  return links;  
}


HTMLCollection.prototype.firstOrNull = function (){
  return (this.length > 0 ) ? this[0] : null;
}

var imgTable = document.getElementsByClassName('images_table').firstOrNull();

if (imgTable) { // for basic version
  var imgCell = imgTable.getElementsByTagName('td');
  for( j=0 ; j<imgCell.length ; j++ ) {
    var imageAnchor = imgCell[j].getElementsByTagName('a')[0];
    var domainText =  imgCell[j].getElementsByTagName('cite')[0];
    
    var links = getImageLinks(imageAnchor.href);

    domainText.innerHTML = '<a href="' + links.toPageHref + '">' + domainText.innerHTML + '/&hellip;<\a>';
    imageAnchor.href = links.toImgHref;
  }
}
else { // standard version

  var stopEvent = function(event){
	  event.stopPropagation()
  }
  
  var nodeHandler = function (event){
	var a = event.target;
	if (a.className != 'rg_l' || a.getElementsByTagName('span').length == 0) return;
	a.className = a.className+ ' gidl'; 
	links = getNewImageLinks(a.href);
	
	a.href = links.toImgHref;
    
	var img = a.getElementsByTagName('img')[0];
	img.addEventListener("click", stopEvent, false);
	
	var span = a.getElementsByTagName('span')[0];
	span.innerHTML ='<a style="color:#fff" href="' + links.toPageHref + '">' + span.innerHTML + '<\a>' ;
  }
  
  if(navigator.userAgent.indexOf('Firefox')!=-1) {//if firefox
    document.addEventListener('DOMSubtreeModified', nodeHandler, false);
  }
  else{//opera or chrome
    document.addEventListener( 'DOMNodeInserted', nodeHandler, false );
    document.addEventListener( 'DOMNodeRemoved',  nodeHandler, false );
  }
}