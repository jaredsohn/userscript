// ==UserScript==
// @name Juick: "in reply to" as popup
// @author uouipopufy
// @namespace juick-in-reply-preview
// @version 0.1.6
// @description Juick: "in reply to" as popup
// @ujs:category browser: enhancements
// @include http://juick.com/*
// @match http://juick.com/*
// ==/UserScript==

var juickpreview__initialized = false;

function juickpreview__init() {
	if( juickpreview__initialized )
		return;
	juickpreview__initialized = true;
	window.removeEventListener("mousemove", juickpreview__init, true);

	function getAbsPosition(obj) { 
		  var x = y = 0; 
		  while(obj) { 
				x += obj.offsetLeft; 
				y += obj.offsetTop; 
				obj = obj.offsetParent; 
		  } 
		  return {x:x, y:y}; 
	}
	function getPageInfo(){
		var pageWidth = document.body.scrollWidth;
		var pageHeight = window.innerHeight + window.scrollMaxY;
		var windowWidth = self.innerWidth;
		var windowHeight = self.innerHeight;
		var yScroll = self.pageYOffset;
		
		return {pageWidth: pageWidth < windowWidth ? windowWidth : pageWidth,
		        pageHeight: pageHeight < windowHeight ? windowHeight : pageHeight,
		        windowWidth: windowWidth,
		        windowHeight: windowHeight,
		        vertScroll: yScroll};
	}
	function appendSeparator(objItem, topDown)
	{
		var objSep = document.createElement("div");
		objSep.className = "juickpreviewsep";
		objSep.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAU0lEQVQ4T2NgoBJoB5rzHwmD+ATBf2QA1TyqCV9AoAQzltCDRQFK8KMEMy4Ouq1gm/ABqAaMiMapEZcGWIxjaCSkAUMjsRpQNAI5RCVWggkTpAAAvI3ei1abzMQAAAAASUVORK5CYII=">';
		if( !topDown )
			objSep.className = "juickpreviewsep reversed";
		return objItem.appendChild(objSep);
	}
	function appendReplies(objOvr, topDown, num, count, zorder)
	{
		var objItem = document.createElement("div");
		objItem.setAttribute('class','ppp');
		objItem.style.position = "relative";
		
		if( topDown )
			appendSeparator(objItem, topDown);

		var objLI = document.getElementById(num);

		var objAvatar = document.createElement("div");
		objAvatar.className = "previewAvatar";
		objAvatar.style.backgroundImage = objLI.style.backgroundImage;
		objItem.appendChild(objAvatar);

		var objMsg = objLI.getElementsByTagName('div')[0];
		var newMsg = objMsg.cloneNode(true);
		var newMsgImg = newMsg.querySelector('.msginfo a + img');
		if( newMsgImg )
			newMsgImg.parentNode.removeChild(newMsgImg);

		objItem.appendChild(newMsg);

		var newNode = newMsg.querySelector('.msgnum img');
		if( newNode ) {
			newNode.juick_node = newMsg.querySelector('.msgnum');
			newNode.addEventListener("mouseover", function() {showForwardPreview(this, zorder+20)}, false);
		}

		if( topDown )
			objOvr.appendChild(objItem);
		else
			objOvr.insertBefore(objItem, objOvr.firstChild);

		if( !topDown )
			appendSeparator(objItem, topDown);

		if( count == 1 )
			return;
		
		var objReplyLink = objMsg.querySelector('.msginfo a');
		if( objReplyLink == null )
			return;

//		if( topDown )
//			newMsg.style.borderBottom = "dashed 1px white";
//		else
//			newMsg.style.borderTop = "dashed 1px white";

		appendReplies(objOvr, topDown, objReplyLink.href.split('#')[1], count-1, zorder);
	}
	function removeJuickPreview(objOvr, toHide)
	{
		objOvr.parentNode.removeChild(objOvr);
		toHide.parentNode.removeChild(toHide);
	}
	function createPreviewBlock(zorder,pclass)
	{
		var objBody = document.getElementsByTagName("body")[0];
		var objOvr = document.createElement("div");
		objOvr.setAttribute('class',pclass);
		objOvr.appendChild(document.createElement('li'));
		objOvr = objBody.insertBefore(objOvr, objBody.firstChild);
		objOvr.style.zIndex = zorder;
		
		return objOvr;
	}
	function createHidingLayer(zorder, tohide)
	{
		var objBody = document.getElementsByTagName("body")[0];
		var objOvr = document.createElement("div");
		objOvr.setAttribute('id','juickpreviewbkgr');
		objOvr = objBody.insertBefore(objOvr, objBody.firstChild);
		objOvr.addEventListener("mouseover",  function() { removeJuickPreview(objOvr, tohide); }, false);
		objOvr.style.zIndex = zorder;
		
		return objOvr;
	}
	function showRewindPreview(pelem, zorder)
	{
		var elem = pelem.juick_node;
		var num = elem.href.split('#')[1];
		var repliesRewindLimit = 5;
		
		var objOvr = createPreviewBlock(zorder+1,'juickpreviewrew');
		var objHiding = createHidingLayer(zorder, objOvr);
		objHiding.style.opacity = 0;
		zorder += 2;

		var elemPos = getAbsPosition(elem);
		var newPos = elemPos.y + 0;
		objOvr.style.top = newPos + "px";
		objOvr.style.left = getAbsPosition(elem.parentNode.parentNode.parentNode.parentNode).x + 40 + "px";
		objOvr.style.display = 'block';

		objOvr.innerHTML = "";
		appendReplies(objOvr, true, num, repliesRewindLimit, zorder);
		
		var pageInfo = getPageInfo();
		var bottomLine = newPos - pageInfo.vertScroll + objOvr.offsetHeight;
		if( bottomLine > pageInfo.windowHeight ) {
			objOvr.innerHTML = "";
			appendReplies( objOvr, false, num, repliesRewindLimit);
			objOvr.style.top = (elemPos.y + 16 - objOvr.offsetHeight) + 'px';
		}
	}
	function showForwardPreview(pelem, zorder)
	{
		var elem = pelem.juick_node;
		var num = elem.innerHTML.split('/')[1].split('<')[0];//elem.innerText.split('/')[1];
		var repliesRewindLimit = 5;

		var objOvr = createPreviewBlock(zorder+1,'juickpreviewfwd');
		var objHider = createHidingLayer(zorder, objOvr);

		var elemPos = getAbsPosition(elem);
		var newPos = elemPos.y + 0;
		objOvr.style.top = newPos + "px";
		objOvr.style.left = getAbsPosition(elem.parentNode.parentNode.parentNode.parentNode).x + 40 + "px";
		objOvr.style.display = 'block';

		objOvr.innerHTML = "";
		
		var replies = document.querySelectorAll('#replies .msginfo a');
		var newMsg = null;

		if(false)
		{
			var objItem = document.createElement("div");
			objItem.style.position = "relative";
			objItem.style.height = "20px";
			objOvr.appendChild(objItem);
		}
		var added = 0;
		for(var i = 0, count = replies.length; i < count; ++i) {
			var aaa = replies[i];
			if( aaa.href.split('#')[1] == num ) {
				if( newMsg != null )
					newMsg.style.borderBottom = "solid 1px white";

				var objItem = document.createElement("div");
				objItem.setAttribute('class','ppp');
				objItem.style.position = "relative";

				var objLI = aaa.parentNode.parentNode.parentNode.parentNode;

				var objAvatar = document.createElement("div");
				objAvatar.className = "previewAvatar";
				objAvatar.style.backgroundImage = objLI.style.backgroundImage;
				objItem.appendChild(objAvatar);

				var objMsg = objLI.getElementsByTagName('div')[0];
				newMsg = objMsg.cloneNode(true);
				var newMsgImg = newMsg.querySelector('.msginfo a + img');
				newMsgImg.parentNode.removeChild(newMsgImg);
				objItem.appendChild(newMsg);

				var newNode = newMsg.querySelector('.msgnum img');
				if( newNode ) {
					newNode.juick_node = newMsg.querySelector('.msgnum');
					newNode.addEventListener("mouseover", function() {showForwardPreview(this, zorder+20)}, false);
					//newNode.addEventListener("mouseover",  function() { showForwardPreview(this, zorder); }, false);
				}
				objOvr.appendChild(objItem);
				added++;
			}
		}
		if( added == 0 ) {
			removeJuickPreview(objOvr, objHider);
			return;
		}
		
		var pageInfo = getPageInfo();
		var bottomLine = newPos - pageInfo.vertScroll + objOvr.offsetHeight;
		if( bottomLine > pageInfo.windowHeight ) {
			objOvr.style.top = (elemPos.y + 16 - objOvr.offsetHeight) + 'px';
		}
	}

	var css = 
	          " .reversed { -moz-transform: scaleY(-1); -webkit-transform: scaleY(-1); -o-transform: scaleY(-1); transform: scaleY(-1); filter: flipv; }"+
	          " div.juickpreviewsep { text-align: right; background-color: rgb(187, 187, 140); height: 2px; display: relative; vertical-align: middle; }"+
	          " div.juickpreviewrew a { color: #de8e33; }"+
	          " div.juickpreviewrew div.msg { padding: 7px; padding-left: 44px; }"+
	          " div.juickpreviewrew .previewAvatar { background-repeat: no-repeat; position: absolute; left: 5px; top: 10px; width: 42px; height: 42px; }"+
	          " div.juickpreviewrew { position: absolute; color: white; width: 625px; z-index: 90; display: none; background-color: #4c4c3b; }"+

	          " div.juickpreviewfwd div.ppp { background-color: #4c4c3b; }"+
	          " div.juickpreviewfwd a { color: #de8e33; }"+
	          " div.juickpreviewfwd div.msg { padding: 7px; padding-left: 44px; }"+
	          " div.juickpreviewfwd .previewAvatar { background-repeat: no-repeat; position: absolute; left: 5px; top: 10px; width: 42px; height: 42px; }"+
	          " div.juickpreviewfwd { "+
	          	"border-width: 1px; border-style: solid; border-color: white; "+
	          	"position: absolute; color: white; width: 625px; z-index: 90; display: none; }"+
	          
	          " div#juickpreviewbkgr { opacity: 0.2; background-color: black; position: fixed; left: 0px; top: 0px; right: 0px; bottom: 0px; }"

	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
	var mark_img = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEAAACxABrSO9dQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuODc7gF0AAACNSURBVChTlVG5DcAgDKSiokeioWASGtaAzTIKq7AJ4fiCUHAUS5Yl+85nnRkrwTkPJTORAbgZIGitc0rpmJgDt5Im2DlHqWF2VSJOgoq1Nn8pGmMacZBGpc7EDLhX0r5oXVhJ/UT/S2k4UkheSkm6qJR6zFiJ41f7gt5v7p0CLgkhqjIqCd4eH7tCXPs34Fb79vR4tzUAAAAASUVORK5CYII=";
/*
	var elems = document.querySelectorAll('#replies .msginfo a');
	for(var i = elems.length-1; i >= 0; --i) {
		var aaa = elems[i];

		var mark = document.createElement("img");
		mark.src = mark_img;
		mark.style.paddingLeft = "5px";
		aaa.parentNode.appendChild(mark);
		mark.juick_node = aaa;
		mark.addEventListener("mouseover", function() {showRewindPreview(this, 1000)}, false);
	}
*/
	var elems = document.querySelectorAll('a');
	for(var i = elems.length-1; i >= 0; --i) {
		var aaa = elems[i];
		var aaa_arr = aaa.href.split('#');
		if( aaa_arr.length == 1 || aaa_arr[1].length == 0 )
			continue;

		var mark = document.createElement("img");
		mark.src = mark_img;
		mark.style.paddingLeft = "5px";
		aaa.parentNode.appendChild(mark);
		mark.juick_node = aaa;
		mark.addEventListener("mouseover", function() {showRewindPreview(this, 1000)}, false);
	}

	elems = document.querySelectorAll('#replies .msgnum');
	for(var i = elems.length-1; i >= 0; --i) {
		var aaa = elems[i];
		var aaa_num = aaa.innerHTML.split('/')[1];
		
		var replies = document.querySelectorAll('#replies .msginfo a');
		var rcc = 0;
		for(var ii = 0, cc = replies.length; ii < cc; ++ii) {
			var bbb = replies[ii];
			if( bbb.href.split('#')[1] == aaa_num )
				rcc++;
		}
		if( rcc > 0 ) {
			var mark = document.createElement("img");
			mark.src = mark_img;
			mark.style.paddingLeft = "5px";
			mark.juick_node = aaa;
			mark.addEventListener("mouseover", function() {showForwardPreview(this, 1000)}, false);
			aaa.appendChild(mark);
			var markcc = document.createElement("span");
			markcc.innerHTML = " " + rcc;
			aaa.appendChild(markcc);
		}
	}
}

if( window.addEventListener ) {
	window.addEventListener('load',juickpreview__init,false);
	window.addEventListener("mousemove",juickpreview__init, true);
} else if( document.addEventListener )
	document.addEventListener('load',juickpreview__init,false);
else if( window.attachEvent )
	window.attachEvent('onload',juickpreview__init);
