// 2ch.ru Interface Tweaks script
// 2006-11-16
// Released under the Forced-Anon license
//
/*
	FORCED ANONYMITY LICENSE v1.0
	=============================
	This program is free software. Redistribution and use, with or without
	modification, are permitted provided that the following conditions are met:

		* Any redistributions must retain this notice.
		* The author and all contributors of this program must remain anonymous.

	As an exception, non-anonymous code modifications (contributions) to this
	program are allowed if the modification:

		* Fixes some secirity threat, the program poses (security fixes).
		* Fixes some misbehavior which is generally considered extremly annoying.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/


// ==UserScript==
// @name           2ch.ru Interface Tweaks
// @namespace      http://2ch.ru/b/
// @description    Sum useless interface tweaks for 2ch.ru, v0.7.2
// @include        http://2ch.ru/*
// @include        http://*.2ch.ru/*
// ==/UserScript==



function fixStyle(css) {

	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);

}

function fixScript(js) {

	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = js;
	head.appendChild(script);

}

	var reg = window.location.pathname.match(/\/(.+)\//);
	var thisBoard = RegExp.$1;
	//alert(thisBoard);

var cssUpdate = '#postform textarea { width: 100%; } '+
		'#navbar0, #postform, .controlbtn { padding: 5px; font-size: 70%; border: 1px solid #999; border-bottom: 3px solid #666; background: #ccc; }' +
		'#navbar0 { position: fixed; right: 25px; font-size: 65%; }' +
		'#postform { position: fixed; right: 25px; width: 37em; top: 40px; }' +
		'.theader, .rules, .hidden, #navbar1, #trname, #tremail, #trgetback, #trpassword, #trrules, .postblock { display: none; } ' +
		'.controlbtn { position: fixed; right: 0px; cursor: pointer; font-weight: bold; }' +
		'.quickreplyform, .quickreplyform form { display: inline; } ' +
		'.quickreplyform input { font-size: 70%; border: 1px solid #999; padding: 1px; color: #555; width: 200px; }' +
		'.loadingimg { position: relative; top: 15px; left: 25px; }' +
		'.thumb { width: 50px; }';
	fixStyle(cssUpdate);
	// adding sum decent css

var jsUpdate = "function hide(what) { document.getElementById(what).style.display='none';document.getElementById('hide'+what).style.display='none';document.getElementById('show'+what).style.display='inline';}" +
	"function show(what) { document.getElementById(what).style.display='block';document.getElementById('hide'+what).style.display='inline';document.getElementById('show'+what).style.display='none';}" +
	"function quickreply(anchor,thread) { if (!document.getElementById('qr'+thread)) { var qRDiv = document.createElement('div'); qRDiv.className='quickreplyform'; qRDiv.id='qr'+thread; qRForm=document.createElement('form');qRForm.action='/cgi-bin/wakaba.pl/"+thisBoard+"'; qRForm.method='POST'; qRShampoo=document.createElement('input'); qRShampoo.type='text'; qRShampoo.id='qrinput'+thread; qRShampoo.name='shampoo'; qRForm.appendChild(qRShampoo); qRTask=document.createElement('input'); qRTask.type='hidden'; qRTask.name='task'; qRTask.value='post'; qRForm.appendChild(qRTask); qRParent=document.createElement('input'); qRParent.type='hidden'; qRParent.name='parent'; qRParent.value=thread; qRForm.appendChild(qRParent); qRGetback=document.createElement('input'); qRGetback.type='hidden'; qRGetback.name='gb2'; qRGetback.value='board'; qRForm.appendChild(qRGetback); qRDiv.appendChild(qRForm); anchor.parentNode.insertBefore(qRDiv, anchor); qRShampoo.focus(); anchor.style.display='none'; } else { return false; }}" +
	"function imgshow(image,thumbI,bigI) { if (image.src == thumbI && image.previousSibling.tagName != 'IMG') { lolwut = document.createElement('img'); lolwut.className='loadingimg'; lolwut.src='data:image/gif;base64,R0lGODlhCQAFAJECAP9mAP/Mmf///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAACQAFAAACCISOaJnL3hgqACH5BAUKAAIALAMAAAADAAUAAAIFhG4olgUAIfkECQoAAgAsAAAAAAkABQAAAgyMfoCGoseQiklQdwoAIfkECQoAAgAsAAAAAAkABQAAAgyUY2ArKMpaYg6eKQoAIfkECQoAAgAsAAAAAAkABQAAAgmUH6eWiy7aagUAIfkEBQoAAgAsAAAAAAkABQAAAgWUj6nLXQA7'; image.parentNode.insertBefore(lolwut, image); image.setAttribute('onLoad','lolwut.parentNode.removeChild(lolwut);'); image.src=bigI; image.className='notthumb'} else { if (image.previousSibling.tagName == 'IMG') { lolwut = image.previousSibling; lolwut.parentNode.removeChild(lolwut); } image.removeAttribute('onLoad'); image.src=thumbI; image.className='thumb'} }";
	fixScript(jsUpdate);
	// adding sum decent js

	var controlButton2 = document.createElement("div");
	controlButton2.className = 'controlbtn';
	controlButton2.innerHTML = '<span id="hidenavbar0" onClick="hide(\'navbar0\');">&rArr;</span><span id="shownavbar0" style="display:none" onClick="show(\'navbar0\');">&lArr;</span>';
	var navBar = document.getElementById('navbar0');
	navBar.parentNode.insertBefore(controlButton2, navBar);
	// adding control button to navbar


	if (thisBoard != 'beta/o' && thisBoard != 'beta/o/res') {
	// oekaki is different

		document.getElementsByTagName('hr')[1].className = 'hidden';
		// removing the <hr>

		var controlButton1 = document.createElement("div");
		controlButton1.className = 'controlbtn';
		controlButton1.innerHTML = '<span id="hidepostform" onClick="hide(\'postform\');">&rArr;</span><span id="showpostform" style="display:none" onClick="show(\'postform\');">&lArr;</span>';
		var postForm = document.getElementById('postform');
		if (postForm) postForm.parentNode.insertBefore(controlButton1, postForm);
		// adding control button to postform

		if (window.location.pathname.match(/\/res\/\d+\.html$/)) {
		// we're in sum thread
			var sagebox = document.createElement("span");
			sagebox.innerHTML = '<input type="checkbox" onclick="if (this.checked) document.getElementsByName(\'nabiki\')[0].value=\'sage\'; else document.getElementsByName(\'nabiki\')[0].value=\'\'" />';
			document.getElementsByName('kasumi')[0].nextSibling.parentNode.insertBefore(sagebox, document.getElementsByName('kasumi')[0].nextSibling);
			// adding the sagebox

		} else {
		// we're on the board page
			fixScript("hide('postform')");
			var allSpans = document.getElementsByTagName("span");
			for (var i = 0; i < allSpans.length; i++) {
				var thisSpan = allSpans.item(i);
				if (thisSpan.className == "replytothread") {
					var aHref = thisSpan.childNodes[1];
					var reg = aHref.href.match(/\/res\/(\d+)\.html$/);
					var thisThread = RegExp.$1;
					var quickReply = document.createElement("span");
					quickReply.innerHTML = '[<a style="cursor: pointer;" onclick="quickreply(this,\''+thisThread+'\')">&rarr;</a>]';
					thisSpan.appendChild(quickReply);
				}
			}
			// 'quickreply' feature
		}

	} else {
	// oekaki is different


	}


	var allImgs = document.getElementsByTagName("img");
	for (var i = 0; i < allImgs.length; i++) {
		var thisImg = allImgs.item(i);
		if (thisImg.className == "thumb") {
			var thumbImg = thisImg.src;
			var aHref = thisImg.parentNode;
			var bigImg = aHref.href;
			var validExtension = new RegExp("\.jpg$|\.png$|\.gif$");
			if (validExtension.test(aHref.href)) {
				aHref.removeAttribute("href");
				aHref.removeAttribute("target");
				aHref.setAttribute("style","cursor: pointer");
				thisImg.removeAttribute('height');
				thisImg.removeAttribute('width');
				thisImg.setAttribute("onClick","imgshow(this,'"+thumbImg+"','"+bigImg+"')");
			}
		}
	}
	// 'open/close in thread' feature