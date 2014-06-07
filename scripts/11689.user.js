// ==UserScript==
// @name           FDZone PreviewImagickBox
// @namespace      http://userscripts.org/people/26505
// @description    Preview Image Box with PreviewImagick
// @include        http://pro.tw.fdzone.org/viewthread.php*&PreviewImagick=99*
// ==/UserScript==
												
if(unsafeWindow) w = unsafeWindow;
else w = window;
function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

isAvatarSingChild = function(node){
	if(!node || !node.parentNode) return false;
	var parentNode = node.parentNode;
	if(parentNode.getAttribute("class") == "avatar" || parentNode.getAttribute("class") == "t_signature"){
		return true;
	}
	return false;
}

showImageOnly = function(){	 		 
	var imgsAry = new Array();
	var imgs = _gt("img");
	if(imgs.length == 0){
		document.body.innerHTML = "";
		return;
	}									 														 
	var regExp = new RegExp("^(http://)(.)*");
	for(var i = 0 ; i < imgs.length ; i++){
		var img = imgs[i];									 
		var imgSrc = img.getAttribute("src");
		if(imgSrc.match(regExp) && !isAvatarSingChild(img)){
			imgsAry.push(imgSrc);
		}		
	}	 
	document.body.innerHTML = "";
	for(var i = 0 ; i < imgsAry.length ; i++){
		var imgSrc = imgsAry[i];
		var imgElm = _ce("img");
		imgElm.setAttribute("src", imgSrc);
		imgElm.setAttribute("border", 0);
		document.body.appendChild(imgElm);
		var newLine = _ce("br");
		document.body.appendChild(newLine);
	}
	
	
}															 

showImageOnly();