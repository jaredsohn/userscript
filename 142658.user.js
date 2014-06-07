// ==UserScript==
// @name           Tumblr - Upload Photo for all posts asanusta
// @namespace      http://asanusta.tumblr.com/
// @description    Adds the "+ Upload Photo" option to all types asanusta of posts. 
// @include        http://www.tumblr.com/new/photo
// @include        http://www.tumblr.com/new/quote
// @include        http://www.tumblr.com/new/link
// @include        http://www.tumblr.com/new/audio
// @include        http://www.tumblr.com/new/video
// @include        http://www.tumblr.com/reblog/*
// @include        http://www.tumblr.com/edit/*
// @exclude        http://www.tumblr.com/messages
// @exclude        http://www.tumblr.com/inbox
// @include        http://www.tumblr.com/blog/*/new/*
// @include        http://www.tumblr.com/blog/*/new/text
// @exclude        http://www.tumblr.com/blog/*/messages
// @exclude        http://www.tumblr.com/new/text
// @version        2.4.7
// ==/UserScript==



var pathname = window.location.pathname;
var textarea;
if(pathname.indexOf("/messages") == -1 && pathname.indexOf("/inbox") == -1){
	if(pathname.indexOf("/new/photo") >= 0 || pathname.indexOf("/new/quote") >= 0 || pathname.indexOf("/new/audio") >= 0 || pathname.indexOf("/new/video") >= 0){
		textarea = document.getElementById('post_two');
	}
	else if(pathname.indexOf("/new/link") >= 0){
		textarea = document.getElementById('post_three');
	}
	else if(pathname.indexOf("reblog") != -1){
		h1Search = document.getElementsByTagName('h1');
		if(h1Search.length > 0){
			title = h1Search[0].innerHTML;
			title = title.toLowerCase();
			if(title.indexOf("reblog photo") != -1 || title.indexOf("reblog quote") != -1 || title.indexOf("reblog audio") != -1 || title.indexOf("reblog video") != -1){
				textarea = document.getElementById('post_two');
			}
			else if(title.indexOf("reblog link") != -1){
				textarea = document.getElementById('post_three');
			}
			else{
			}
		}
		else{
			
		}
	}
	else if(pathname.indexOf("edit") != -1){
		h1Search = document.getElementsByTagName('h1');
		if(h1Search.length > 0){
			title = h1Search[0].innerHTML;
			title = title.toLowerCase();
			if(title.indexOf("edit photo") != -1 || title.indexOf("edit quote") != -1 || title.indexOf("edit audio") != -1 || title.indexOf("edit video") != -1 || title.indexOf("edit answer") != -1){
				textarea = document.getElementById('post_two');
			}
			else if(title.indexOf("edit link") != -1){
				textarea = document.getElementById('post_three');
			}
			else{
			}
		}
		else{
			
		}
	}
	else{
		//
	}
	if(textarea){
		if(pathname.indexOf("/new/link") >= 0 || document.getElementsByTagName('h1')[0].innerHTML.toLowerCase().indexOf("reblog link") != -1 || document.getElementsByTagName('h1')[0].innerHTML.toLowerCase().indexOf("edit link") != -1){
			var headID = document.getElementsByTagName("head")[0];         
			var newScript = document.createElement('script');
			newScript.type = 'text/javascript';
			newScript.text = 'function catch_uploaded_photo(src) {' + 
				'	if (tinyMCE && (ed = tinyMCE.get(\'post_three\'))) {' + 
				'		ed.execCommand(\'mceInsertContent\', false, \'<img src="\' + src + \'" />\');' + 		
				'	} else {' + 
				'		insertTag(\'post_three\', \'<img src="\' + src + \'" />\');' + 
				'	}' + 
				'}';
			headID.appendChild(newScript);
		}
		else{
			var headID = document.getElementsByTagName("head")[0];         
			var newScript = document.createElement('script');
			newScript.type = 'text/javascript';
			newScript.text = 'function catch_uploaded_photo(src) {' + 
				'	if (tinyMCE && (ed = tinyMCE.get(\'post_two\'))) {' + 
				'		ed.execCommand(\'mceInsertContent\', false, \'<img src="\' + src + \'" />\');' + 		
				'	} else {' + 
				'		insertTag(\'post_two\', \'<img src="\' + src + \'" />\');' + 
				'	}' + 
				'}';
			headID.appendChild(newScript);
		}
		/*  Some of the following code has been taken from,
			or has been writen using reference from,
			Cutlerish's Missing-e extenion. 
			
			I swear I tried these methods myself, but it didn't
			work until I tried it again using his. Either way, 
			I hod to do a bunch of tweaking to get it to actually 
			function at all. 
			
			The main thing I got from his was the "/upload" src,
			and the code for the second level iframe, but that's just
			copied from the "/upload/image", as far as I can tell, 
			and that's what I would have done (and had done in previous
			attempts) anyway. 
			*/
		var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		
		/*if(!is_chrome){
			//alert("test");
			newDiv = document.createElement('div');
			//newDiv.style = "float:right;padding-top:3px;";
			newDiv.style.cssFloat = "right";
			newDiv.style.paddingTop = "3px";
			//newDiv.innerHTML = '<iframe src="/upload/image" id="regular_form_inline_image_iframe" width="130" height="16" border="0" scrolling="no" allowtransparency="true" frameborder="0" style="background-color:transparent; overflow:hidden;"></iframe>';
			newDiv.innerHTML = '<iframe src="/upload/image" id="regular_form_inline_image_iframe" width="130" height="16" border="0" scrolling="no" allowtransparency="true" frameborder="0" style="background-color:transparent; overflow:hidden;" onload="uploadFrame = document.getElementById(\'regular_form_inline_image_iframe\'); var content = uploadFrame.contentWindow.document; content.open(); content.write(\'<html><head><style type=\\\'text/css\\\'>* { margin:0;padding:0; }</style> <script type=\\\'text/javascript\\\'> function catch_uploaded_photo(src) { parent.catch_uploaded_photo(src);}</script></head><body><iframe src=\\\'http://www.tumblr.com/upload/image?from_assets\\\' width=\\\'130\\\' height=\\\'16\\\' border=\\\'0\\\' scrolling=\\\'no\\\' allowtransparency=\\\'true\\\' frameborder=\\\'0\\\' style=\\\'background-color:transparent;overflow:hidden;\\\'></iframe></body></html>\'); content.close();"></iframe>';

			textarea.parentNode.insertBefore(newDiv,textarea);

			uploadFrame = document.getElementById('regular_form_inline_image_iframe');
			
			newDiv2 = document.createElement('div');
			newDiv2.style.clear = "both";
			textarea.parentNode.insertBefore(newDiv2,textarea);
			//uploadFrame.addEventListener('onLoad', theFunction, true); 
		}
		else{*/
		
		
			/*var upload = document.createElement("div");
			upload.innerHTML = '<div style="float:right; padding-top:3px; padding-bottom: 5px;">' + 
				'	<iframe src="/upload/image?from_assets" id="regular_form_inline_image_iframe"' + 
				'	width="111" height="16" border="0" scrolling="no" allowTransparency="true"' + 
				'	frameborder="0" style="background-color:transparent; overflow:hidden;"></iframe>' + 
				'</div>' + 
				'<div class="clear"></div>';
			textarea.parentNode.insertBefore(upload,textarea);*/
			
			var upload = document.createElement("div");
			upload.innerHTML = '<div style="float:right; padding-top:3px; padding-bottom: 5px;">' + 
				'	<iframe src="http://tumblrupload.pseudofailure.com/" id="regular_form_inline_image_iframe"' + 
				'	width="111" height="16" border="0" scrolling="no" allowTransparency="true"' + 
				'	frameborder="0" style="background-color:transparent; overflow:hidden;"></iframe>' + 
				'</div>' + 
				'<div class="clear"></div>';
			textarea.parentNode.insertBefore(upload,textarea);
		//}
	}
}
/*else if(pathname.indexOf("/messages") != -1 || pathname.indexOf("/inbox") != -1){
	allTextareas = document.evaluate("//textarea[@class='text_field']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.text = 'function catch_uploaded_photo(src) {' + 
				'	editorID = null;' +
				'	allTextareas = document.evaluate("//textarea[@class=\'text_field\']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);' +
				'	for (var i = 0; i < allTextareas.snapshotLength; i++) {' + 
				'		thisTextarea = allTextareas.snapshotItem(i); ' +
				'		textaID = thisTextarea.id; ' + 
				'		frameContents = document.getElementById("regular_form_inline_image_iframe_\"+textaID+\"").contentWindow.document.getElementsByTagName("html")[0].innerHTML; ' +
				'		if(frameContents.indexOf(src) != -1){ ' +
				'			editorID = textaID; ' + 
				'			break; ' +
				'		} ' +
				'	}'+
				'	if (tinyMCE && (ed'+i+' = tinyMCE.get(editorID))) {' +
				'		ed'+i+'.execCommand(\'mceInsertContent\', false, \'<img src="\' + src + \'" />\');' + 		
				'	} else {' + 
				'		insertTag(editorID, \'<img src="\' + src + \'" />\');' + 
				'	}' + 
				'}';
	headID.appendChild(newScript);
	for (var i = 0; i < allTextareas.snapshotLength; i++) {
		thisTextarea = allTextareas.snapshotItem(i);
		taID = thisTextarea.id;
		var upload = document.createElement("div");
		upload.innerHTML = '<div style="float:right; padding-top:3px; padding-bottom: 5px;">' + 
			'	<iframe src="/upload/image?from_assets" id="regular_form_inline_image_iframe_'+taID+'"' + 
			'	width="111" height="16" border="0" scrolling="no" allowTransparency="true"' + 
			'	frameborder="0" style="background-color:transparent; overflow:hidden;"></iframe>' + 
			'</div>' + 
			'<div class="clear"></div>';
		thisTextarea.parentNode.insertBefore(upload,thisTextarea);
	}
}*/