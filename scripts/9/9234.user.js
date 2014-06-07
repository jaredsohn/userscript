// -----------------------------------------------------------------------
// rot13 v 0.0.1
// 
// Written by Devadutta Ghat
//
// Last updated on May 13, 2007
//
// Tested on Greasemonkey 0.6.9
//
// What it does: Encrypts the contents of a text box using rot13 cipher
// when you click on the "e13" button next to the textbox.
// 
// Why was this created?
// Many a times, I have encoded contents of some textbox
// on sites like orkut.com just to attain some privacy
// and some fun. I used to do this using a C program.
// So, this Greasemonkey script makes life easier for those 
// who want to use the cipher frequently by allowing easy access within the 
// browser.
//
// Why rot13?
// rot 13 is symmetric, which means that 
// encryption and decryption can be done by the same algorithm!
//
// Does it work?
// Tested on many sites and works well!
//
// Acknowledgments
// Sean M. Burke, Dive into Greasemonkey and Mozdev
// Uses Sean M. Burke's code to add the little image next to the textbox.
// ------------------------------------------------------------------------
//
// ==UserScript==
// @name           rot13
// @namespace      http://devadutta.net
// @description    Encrypts the contents of a text box using the rot13 cipher at the click of a button!!
// @version        0.0.1
// @include        *
// @author         devadutta.net
// ==/UserScript==


var imSrc='data:image/gif;base64,'+ 
'iVBORw0KGgoAAAANSUhEUgAAADYAAAAbCAQAAACdfrS+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA'+
'BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG'+
'AAABYUlEQVR42uyWXZWDMBBGL3WAhSABC7GABSykEqgEKoFKqAVWAiuBSsg+MCRAExbabs/Zc0re'+
'+Jmbb+abCYnlfdeBD+y/wXjAIApDg4k+L6ixsmr0yLE7YYbKhTGRjbTuDQ/cDdOLEGFYd4eyWKoB'+
'tr1m+aYEKwDOZCQkZFwkI+m+mil6LBUGs6LsiqWc3RnSqpdpLGlEdo9ZUbIGiyV2BssD2W5E/OMw'+
'JdvvST1MB8tqaYO432HpwpPGu3GoxuCaVDqlndp2N6yMW3/snSJQWCv+ek5Z6WFdUIOK9tP2mhmX'+
'MzX2mQpIt3QvmIUnMr4F+4ZBfOPoR8IBuAFwJAmu05O4L6miwMaRkv+JNi0KBXZyDjKurzRGDoo9'+
'W6ix1JMvciox3sXPxjLS1FPXaees5dKTwzG8uvkRU0RCdW6fdTSUb5oqMofU/XlmuM4Uzau4RdmQ'+
'/m4WpfCik89/4yuunwEA7S9IhzC92ksAAAAASUVORK5CYII=';


function setCharAt(str, index, ch) {
   return str.substr(0, index) + ch + str.substr(index + 1);
}

var allTextareas, thisTextarea;
allTextareas = document.getElementsByTagName('textarea');
for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    mark_textarea(allTextareas[i]);
}


function mark_textarea (t) {
  var d	  = t.ownerDocument;

  var s	 = getComputedStyle(t, "" );
  var
    oh = num(s.height),
    ow = num(s.width ),
    td2 = make_table(d,t),
    button = d.createElement('img');

  button.setAttribute('src',imSrc);
  button.setAttribute('height',20);
  button.setAttribute('width' ,20);
  button.setAttribute('alt','grabby');

  td2.appendChild(button);
  td2.style.verticalAlign = "bottom";

  button.title = "Click on me to encode contents!";

 button.addEventListener('mousedown', function(event) {
      // Yes, I think we really do need this as a closure here-- otherwise
      // there's no (easy) way to work back from the event target to the textarea.
		 if(t.value.length==0)
		 {
		 	//alert("Enter some text to encode");
			return;
		}

	//alert(t.value.length);
	var toEnc=t.value;
	var count=0;
	for(count=0;count<t.value.length;count++)
	{
		if(toEnc.charAt(count)==' ')
		{
			//Space No need to encode
		}
		else
		{
			if(toEnc.charCodeAt(count)>=65 && toEnc.charCodeAt(count)<=90)
			{
				var newChar=(((toEnc.charCodeAt(count)-65)+13)%26)+65;
				toEnc=setCharAt(toEnc, count, String.fromCharCode(newChar));
			}
			else if(toEnc.charCodeAt(count)>=97 && toEnc.charCodeAt(count)<=122)
			{
				var newChar=(((toEnc.charCodeAt(count)-97)+13)%26)+97;
				toEnc=setCharAt(toEnc, count, String.fromCharCode(newChar));
			}

		}
	}
	t.value=toEnc;
      event.preventDefault();
      return;
    },
    true
  );


  if(ow && oh) {
    t.style.height = oh.toString() + "px";
    t.style.width  = ow.toString() + "px";
  }

  return;
}

function make_table (doc,textarea) {
  var
   table = doc.createElement( 'table' ),
   tbody = doc.createElement( 'tbody' ),
   tr	 = doc.createElement( 'tr'    ),
   
   td1	 = doc.createElement( 'td'    ),
   td2	 = doc.createElement( 'td'    );

  tr.appendChild(td1);
  tr.appendChild(td2);
  tbody.appendChild(tr);
  table.appendChild(tbody);

  textarea.parentNode.replaceChild( table, textarea );
  td1.appendChild(textarea);
  td1.style.verticalAlign = "bottom";

  table.style.borderSpacing = "0px";

  return td2;
}

function num (i) {
  var m;
  if(typeof(i) == "string") {
    m = i.match( /(\d+)(\.\d+)*px/ );
    // nota bene: yes, the computed style can be fractional, like "123.56px"!!
    if(m) {
      i = parseInt(m[1], 10);
    } else {
      //trace(1, "Weird pseudonumerical value: \"" + i + "\"!");
    }
  } else if(typeof(i) == "number") {
    // just fall thru
  } else {
    //trace(1, "Weird nonnumerical value: \"" + i + "\"!");
  }
  //trace( typeof(i) + ": " + i.toString() );
  return i;
}

