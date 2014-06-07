// ==UserScript==
// @name           FDZone PreviewImagick
// @namespace      http://userscripts.org/people/26505
// @description    Preivew Topic Images
// @include        http://pro.tw.fdzone.org/forumdisplay.php?fid=66*
// @include        http://pro.tw.fdzone.org/forumdisplay.php?fid=56*
// @include        http://pro.tw.fdzone.org/forumdisplay.php?fid=87*
// @include        http://pro.tw.fdzone.org/forumdisplay.php?fid=68*
// @include        http://pro.tw.fdzone.org/forumdisplay.php?fid=75*
// @include        http://pro.tw.fdzone.org/forumdisplay.php?fid=35*
// @include        http://pro.tw.fdzone.org/forumdisplay.php?fid=117*
// @include        http://pro.tw.fdzone.org/forumdisplay.php?fid=12*
// @include        http://pro.tw.fdzone.org/forumdisplay.php?fid=102*
// ==/UserScript==		

if(unsafeWindow) w = unsafeWindow;
else w = window;
function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

function lightBox(url) {
    var box = _ce('div');
    box.id = boxId;
    box.style.position = 'fixed';
    box.style.zIndex = 10001;
    box.style.top = '55px';
    box.style.background = '#ffffff';
    box.style.height = '70%';
    box.style.left = '50px';
    var w = document.body.clientWidth -100;
    var h = document.body.clientHeight-200;
    box.innerHTML += '<iframe src="'+url+'" width="'+w+'" height="100%" frameborder="1"></iframe>';
    document.body.appendChild(box);
}

var boxId = "previewBox";																	 
function previewImageBox(e){		 	 	 
	var srcAnch = e.srcElement?e.srcElement:e.target;	
	if(!e || !srcAnch || !srcAnch.getAttribute("srcHref"))	return;		
	 
	lightBox("./" + srcAnch.getAttribute("srcHref") + "&PreviewImagick=99");
}
			 
function keyPressEvenHandler(e){	
	var kC = (window.event) ? event.keyCode : e.keyCode;
	var Esc = (window.event) ? 27 : e.DOM_VK_ESCAPE;
  if(kC==Esc) closeImageBox();
}

function closeImageBox(){			
	delete document.body.removeChild(_gi(boxId));
}									

window.addEventListener("keypress", keyPressEvenHandler, true);
var topicTds = document.evaluate( "//TD[@class='f_title']", document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(topicTds.snapshotLength == 0) return;

for(var i = topicTds.snapshotLength - 1 ; i >= 0 ; i--){
	var topicTd = topicTds.snapshotItem(i);
	var anchorTopic = topicTd.getElementsByTagName('a')[0];		
	if(anchorTopic){																								 			
		var previewAnch = _ce('a');
		previewAnch.addEventListener("click", previewImageBox, true);	
		previewAnch.innerHTML = "<@@>";
		previewAnch.setAttribute("srcHref", anchorTopic.getAttribute("href"));
		previewAnch.setAttribute("href", "javascript: void(0);");
		anchorTopic.parentNode.insertBefore(previewAnch, anchorTopic);
	}
}