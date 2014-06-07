// ==UserScript==
// @name           Gmail - Add "Unread" Selector Link
// @namespace      http://userscripts.org/users/86416
// @include        https://mail.google.com/mail/*
// ==/UserScript==
function insertAfter(el,ref) { 
	var container, ns; 
	if ( (container=ref.parentNode) && (ns=ref.nextSibling) ) { 
		container.insertBefore(el,ns);
	} 
	else if (container) { 
		container.appendChild(el);
	}
}
var checkCount = 0
function addUnreadLink() {
	if (document.getElementById('messageselector')!=null) {
		return;
	}
	var anchors = document.querySelectorAll('input[type="checkbox"]');
	if (anchors && anchors.length>0) {
		var anchor = null;
		for (var i=0; i<anchors.length; i++) {
			var pn = anchors[i].parentNode;
			if (pn.getAttribute('role')=="button" && pn.getAttribute('aria-haspopup')=="true") {
				anchor = pn; break;
			}
		}
		if (anchor) {
			var container = anchor.parentNode.parentNode.parentNode.parentNode.parentNode;
			var d = document.createElement('div');
			d.innerHTML = ''+
			'	<div id="messageselector" class="nH">'+
			'	  <div class="nH">'+
			'		<div role="navigation" class="yV" style="padding-left:60px;">'+
			'		  Select: <span class="yU">'+
			'			  <span tabindex="0" role="link" id="select-all">All</span>, '+
			'			  <span tabindex="0" role="link" id="select-none">None</span>, '+
			'			  <span tabindex="0" role="link" id="select-read">Read</span>, '+
			'			  <span tabindex="0" role="link" id="select-unread">Unread</span>, '+
			'			  <span tabindex="0" role="link" id="select-starred">Starred</span>, '+
			'			  <span tabindex="0" role="link" id="select-unstarred">Unstarred</span>'+
			'		  </span>'+
			'		</div>'+
			'	  </div>'+
			'	</div>';
			insertAfter(d,container);
			
			var handler = function(type,e) {
				e.preventDefault();
				e.stopPropagation();

				var e2 = document.createEvent('MouseEvents');
				e2.initEvent('mousedown',true,false); 
				var el = anchor.wrappedJSObject;
				el.dispatchEvent(e2);

				setTimeout(function() {
					var el = document.querySelectorAll('div[selector='+type+'] > div')[0].wrappedJSObject;
					var e2 = document.createEvent('MouseEvents');
					e2.initEvent('mouseup',true,false); 
					el.dispatchEvent(e2);
				},100);
			}
			
			// Attach the click handlers
			document.getElementById('select-all').addEventListener('click',function(e) { handler('all',e); } ,false);
			document.getElementById('select-none').addEventListener('click',function(e) { handler('none',e); } ,false);
			document.getElementById('select-read').addEventListener('click',function(e) { handler('read',e); } ,false);
			document.getElementById('select-unread').addEventListener('click',function(e) { handler('unread',e); } ,false);
			document.getElementById('select-starred').addEventListener('click',function(e) { handler('starred',e); } ,false);
			document.getElementById('select-unstarred').addEventListener('click',function(e) { handler('unstarred',e); } ,false);
		}
	}
	if (checkCount++ < 10) {
		setTimeout(addUnreadLink,200);
	}
}

window.addEventListener('load',function() {
	setTimeout(addUnreadLink,500);
},false);