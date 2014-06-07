/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-08-09 16:18:45 ADT"
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  GLB Bold, Italics, Underline
// @namespace	  
// @description	  Gives buttons to add bold, italics, or underline to textarea.
// @version	  0.0.4
// @include	  http://goallineblitz.com/game/forum_thread_list.pl*
// @include	  http://goallineblitz.com/game/forum_thread.pl*
// @include	  http://goallineblitz.com/game/new_message.pl*
// @include	  http://goallineblitz.com/game/forum_edit_post.pl*
// @author	  chris465
// ==/UserScript==


if (
 document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body    // Basic sanity
) {
  run();
}

function addChar(txtarea,charac){
	var intEnd = txtarea.selectionEnd;
	var intStart = txtarea.selectionStart;
	
	var Start = (txtarea.value).substring(0,intStart);
	
	var End = (txtarea.value).substring(intEnd);
	
	var text = "["+ charac +"]";
	text += (txtarea.value).substring(intStart,intEnd);
	text += "[/"+ charac +"]";
	
	txtarea.value = Start + text + End;
	txtarea.selectionStart = intStart;
	txtarea.selectionEnd = intEnd + 7;
} 



function run () {	
  var them = document.getElementsByTagName("textarea");
  for(var i = them.length - 1; i >= 0; i--) {
    tweak_textarea(them[i]);
  }
  return;
}


function tweak_textarea (t) {
  var d	  = t.ownerDocument;
  var p   = t.parentNode;
  var n   = t.nextSibling;

//<button type="button" style="font: bold 12px Arial">B</button>
	buttonBold = d.createElement('button');
	buttonBold.setAttribute('type','button');
	buttonBold.setAttribute('style','font: bold 12px Arial');
	buttonBold.appendChild(d.createTextNode("B"));
  	buttonBold.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonBold.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	p.appendChild(buttonBold);
	//p.insertBefore(buttonBold, t);
//<button type="button" style="font: 12px Arial;text-decoration: underline;">U</button>
	buttonUnder = d.createElement('button');
	buttonUnder.setAttribute('type','button');
	buttonUnder.setAttribute('style','font: 12px Arial;text-decoration: underline;');
	buttonUnder.appendChild(d.createTextNode("U"));
  	buttonUnder.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonUnder.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	p.appendChild(buttonUnder);
//<button type="button" style="font: bold 12px Arial;font-style : italic">I</button>
	buttonItalic = d.createElement('button');
	buttonItalic.setAttribute('type','button');
	buttonItalic.setAttribute('style','font: bold 12px Arial;font-style : italic');
	buttonItalic.appendChild(d.createTextNode("I"));
  	buttonItalic.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonItalic.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	p.appendChild(buttonItalic);

  
  buttonBold.addEventListener('click', function(event) {
  	addChar ( t,"b" );
  	return;
  	}, true
  );
  buttonUnder.addEventListener('click', function(event) {
    	addChar ( t,"u" );
    	return;
    	}, true
  );
  buttonItalic.addEventListener('click', function(event) {
    	addChar ( t,"i" );
    	return;
    	}, true
  );
  
  var textareaKeydown = function(e) {
  	if (e.ctrlKey && e.altKey && e.keyCode == 66) {
  		// ctrl + alt + B
  		addChar(t,"b");
  	}
  	else if (e.ctrlKey && e.altKey && e.keyCode == 85) {
  		// ctrl + alt + U
  		addChar(t,"u");
  	}
	else if (e.ctrlKey && e.altKey && e.keyCode == 73) {
  		//ctrl + alt + I
  		addChar(t,"i");
  	}
  }
  	
  t.addEventListener("keydown",textareaKeydown,0);

  return;
}


// End