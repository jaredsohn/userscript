/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-08-09 16:18:45 ADT"
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  GLB Bold, Italics, Underline, Smilies
// @namespace	  
// @description	  Gives buttons to add bold, italics, or underline to textarea.
// @version	  1
// @include	  http://goallineblitz.com/game/forum_thread_list.pl*
// @include	  http://goallineblitz.com/game/forum_thread.pl?*
// @include	  http://goallineblitz.com/game/new_message.pl*
// @author	  chris465, modified by Deathblade
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

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

function addSmiley(txtarea,charac){
	var intEnd = txtarea.selectionEnd;
	var intStart = txtarea.selectionStart;
	
	var Start = (txtarea.value).substring(0,intStart);
	
	var End = (txtarea.value).substring(intEnd);
	
	var text = " "+ charac +" ";
	
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
  var d   = t.ownerDocument;
  var p   = t.parentNode.parentNode.parentNode;
  var n   = t.nextSibling;
  var l   = p.previousSibling;
  var post = getElementsByClassName('medium_head', document)
  var posts = post[0]
	if (post[0].innerHTML == 'New Message') {
	var post = getElementsByClassName('fieldheading', document)
	var posts = post[2]
	}
  var br = d.createElement('br');
  posts.appendChild(br)

//<button type="button" style="font: bold 12px Arial">B</button>
	buttonBold = d.createElement('button');
	buttonBold.setAttribute('type','button');
	buttonBold.setAttribute('style','font: bold 12px Arial');
	buttonBold.appendChild(d.createTextNode("B"));
  	buttonBold.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonBold.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonBold);
	//p.insertBefore(buttonBold, t);
//<button type="button" style="font: 12px Arial;text-decoration: underline;">U</button>
	buttonUnder = d.createElement('button');
	buttonUnder.setAttribute('type','button');
	buttonUnder.setAttribute('style','font: 12px Arial;text-decoration: underline;');
	buttonUnder.appendChild(d.createTextNode("U"));
  	buttonUnder.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonUnder.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonUnder);
//<button type="button" style="font: bold 12px Arial;font-style : italic">I</button>
	buttonItalic = d.createElement('button');
	buttonItalic.setAttribute('type','button');
	buttonItalic.setAttribute('style','font: bold 12px Arial;font-style : italic');
	buttonItalic.appendChild(d.createTextNode("I"));
  	buttonItalic.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonItalic.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonItalic);
//<button type="button" style="font: bold 12px Arial;">:)</button>
	buttonSmile = d.createElement('button');
	buttonSmile.setAttribute('type','button');
	buttonSmile.setAttribute('style','font: bold 12px Arial;');
	buttonSmile.appendChild(d.createTextNode(":)"));
  	buttonSmile.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonSmile.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonSmile);
//<button type="button" style="font: bold 12px Arial;">:D</button>
	buttonTeeth = d.createElement('button');
	buttonTeeth.setAttribute('type','button');
	buttonTeeth.setAttribute('style','font: bold 12px Arial;');
	buttonTeeth.appendChild(d.createTextNode(":D"));
  	buttonTeeth.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonTeeth.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonTeeth);
//<button type="button" style="font: bold 12px Arial;">:(</button>
	buttonSad = d.createElement('button');
	buttonSad.setAttribute('type','button');
	buttonSad.setAttribute('style','font: bold 12px Arial;');
	buttonSad.appendChild(d.createTextNode(":("));
  	buttonSad.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonSad.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonSad);
//<button type="button" style="font: bold 12px Arial;">:P</button>
	buttonTongue = d.createElement('button');
	buttonTongue.setAttribute('type','button');
	buttonTongue.setAttribute('style','font: bold 12px Arial;');
	buttonTongue.appendChild(d.createTextNode(":P"));
  	buttonTongue.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonTongue.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonTongue);
//<button type="button" style="font: bold 12px Arial;">O_o</button>
	buttonEyes = d.createElement('button');
	buttonEyes.setAttribute('type','button');
	buttonEyes.setAttribute('style','font: bold 12px Arial;');
	buttonEyes.appendChild(d.createTextNode("O_o"));
  	buttonEyes.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonEyes.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonEyes);
//<button type="button" style="font: bold 12px Arial;">;)</button>
	buttonWink = d.createElement('button');
	buttonWink.setAttribute('type','button');
	buttonWink.setAttribute('style','font: bold 12px Arial;');
	buttonWink.appendChild(d.createTextNode(";)"));
  	buttonWink.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonWink.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonWink);

  
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
  buttonSmile.addEventListener('click', function(event) {
    	addSmiley ( t,":)" );
    	return;
    	}, true
  );
  buttonSad.addEventListener('click', function(event) {
    	addSmiley ( t,":(" );
    	return;
    	}, true
  );
  buttonTongue.addEventListener('click', function(event) {
    	addSmiley ( t,":P" );
    	return;
    	}, true
  );
  buttonEyes.addEventListener('click', function(event) {
    	addSmiley ( t,"O_o" );
    	return;
    	}, true
  );  
  buttonTeeth.addEventListener('click', function(event) {
    	addSmiley ( t,":D" );
    	return;
    	}, true
  );  
  buttonWink.addEventListener('click', function(event) {
    	addSmiley ( t,";)" );
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