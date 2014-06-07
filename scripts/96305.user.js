// ==UserScript==
// @name           GT forum enhancer
// @namespace      Psi
// @description    Fixes some annoying stuff
// @include        http://forums.gametrailers.com/*
// ==/UserScript==

function mainFunc() {

	$j('#message').keyup( function(){
		FitToContent(this, document.documentElement.clientHeight);
	});

	if (document.reply_form) {
		document.reply_form.submit_but.onmousedown = checkText;
	} else {
		document.quick_reply.quick_reply.onmousedown = checkText;
	}
}

// + < > pound euro etc.
function checkText(){
	var text = document.getElementById('message').value;
	
	for (var i = 0; i < text.length; i++){
		var c = text.charCodeAt(i);
		if (c == 43 || c == 60 || c == 62 || c > 127){
			var txtBefore = text.substring(0, i);
			var txtAfter = text.substring(i+1, text.length);
			text = txtBefore + toHtmlCode(c) + txtAfter;
		}
	}
	document.getElementById('message').value = text;
}

function toHtmlCode(c){
	return '&#'+c+';';
}

function FitToContent(id, maxHeight) {
   var text = id && id.style ? id : document.getElementById(id);
   if ( !text )
      return;

   var adjustedHeight = text.clientHeight;
   if ( !maxHeight || maxHeight > adjustedHeight ) {
      adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
      if ( maxHeight )
         adjustedHeight = Math.min(maxHeight, adjustedHeight);
      if ( adjustedHeight > text.clientHeight )
         text.style.height = adjustedHeight + "px";
   }
}

/** Entry point **/
window.addEventListener("load", mainFunc, false);