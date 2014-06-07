// ==UserScript==
// @name           RPG PostHelper
// @namespace      http://pregamble.web-rpg.org/
// @include        http://pregamble.web-rpg.org/post*
// ==/UserScript==
/**
* @author Muerta
* @see http://pregamble.web-rpg.org/js_55/notutf8-de.js
* @base http://pregamble.web-rpg.org/js_55/notutf8-de.js
* @base http://labs.mozilla.com/projects/ubiquity/
**/

//content infrmatio 
var addin;
var helpbox;
var txtbox;
var display;
var wordcounter;

var button;
var img;
var keyrecognition;
var autooff;

// Define the bbCode tags
bbcode = new Array();
bbtags = new Array();
helptext = new Array();
index = new Array();
buttons = new Array();
i = 62;

//
//hier könnt ihr das Skript anpassen:
//
init();
var speeko 	 = "[color=#207CD8][b]\"";//anfangs tag fürs sprechen ""
var speekc 	 = "\"[/color][/b]";//end tag fürs sprechen ""
var thinko 	 = "[color=#81CFFF]°";//anfangs tag fürs denken °°
var thinkc 	 = "°[/color]";//end tag fürs sprechen °°
var doo		 = "[color=#FFFFFF][i]*";//anfangs tag fürs handeln **
var doe		 = "*[/color][/i]";//end tag fürs handeln **
var offo         = "[size=9][color=#CBCBCB][off:"; //anfangs tag fürs off-topic[]
var offc         = "][/color][/size]";//end tag fürs off-topic[]

//Die Icons zu den Button
var speeki	 = "http://img89.imageshack.us/img89/3883/speek.png";
var thinki	 = "http://img100.imageshack.us/img100/6804/think.png";
var doi		 = "http://img7.imageshack.us/img7/6715/24738435.png";
var offi	 = "http://img100.imageshack.us/img100/9775/offj.png";

//hier werden die Button eingefügt
addButton("speek",speeki,speeko,speekc);
addButton("think",thinki,thinko,thinkc);
addButton("do",doi,doo,doe);
addButton("off",offi,offo,offc);



//Tastenerkennung jeweils vor das gewünschte die // wegnehmen und bei dem anderen dann setzen
//  keyrecognition = true; //an
    keyrecognition = false //aus

//Tastenerkennung bei einem Off-Tag (kann zu Fehlern bei der manuellen Eingabe von BBTags führen!
//autooff = true; //an
autooff = false ; //aus

if(keyrecognition)
  txtbox.addEventListener("keyup", fatch, false);

initdisplay();
  txtbox.addEventListener("keyup", words, false);

words(txtbox);
//
//
//
function init(){
if(addin == null)
 addin = document.getElementById("text_edit");
if(helpbox == null)
 helpbox = document.getElementById("helpbox");
if(txtbox == null)
 txtbox = document.getElementById("text_editor_textarea");
if(display == null)
 display = $x("/html/body/table/tbody/tr/td/div[2]/div/table/tbody/tr/td[2]/form/table[2]/tbody/tr[2]/td[2]",XPathResult.ANY_TYPE)[0]; 
}


function initdisplay(){
    
	wordcounter = document.createElement("span");
	wordcounter.setAttribute("class","gen");
	display.appendChild(wordcounter);
}

function addButton(title,src,open,close){
  //regiser Buttonparam
  helptext[i] = title+": "+open+"Text"+close;
  bbtags[i] = open;
  bbtags[i+1] = close;
  index[title] = i;
  button = document.createElement("button");
  img = document.createElement("img");
  
  button.setAttribute("id","add_"+title);
  button.setAttribute("class","button2");
  button.setAttribute("type","button");
  button.setAttribute("title",title);
  
  img.setAttribute("title","add_"+title);
  img.setAttribute("src",src);
  img.setAttribute("alt",title);
  
  button.addEventListener("click", style, false);
  button.addEventListener("mousemove", helpline, false);
  button.addEventListener("mouseout", dehelpline, false);
  
  button.appendChild(img);
  addin.appendChild(button);
  
  buttons[i] = button;
  i+=2;
}

function style(evt){
try{
   target = evt.target;
   title = target.getAttribute("title");
   if(title != null && title != "")
     bbstyle(index[title]);
   
 } catch(evt) {
  dump("style:\n"+evt);
 }  
}

function helpline(evt){
 try{
  
   target = evt.target;
   title = target.getAttribute("title");
   if(title != null && title != ""){ 
    dehelpline(evt);
    helpbox.appendChild(document.createTextNode(helptext[index[title]]));
   }
 } catch(evt) {
  dump("helpline:\n"+evt);
 }
}


function dehelpline(evt){
 try{
   if(helpbox.firstChild != null){
     helpbox.removeChild(helpbox.firstChild);
   }
  } catch(evt){
    dump("dehelpline:\n"+evt);
  }
}
function bbstyle(bbnumber) {
	var txtarea = document.getElementById("text_editor_textarea");
	var button = buttons[bbnumber];
	

	donotinsert = false;
	theSelection = false;
	bblast = 0;
	if (bbnumber == -1) { // Close all open tags & default button names
		while (bbcode[0]) {
			butnumber = arraypop(bbcode) - 1;
			txtarea.value += bbtags[butnumber + 1];
			var tag = button.tagName;
			if ( tag == 'INPUT' ) {
				buttext = button.value;
				button.value = buttext.substr(0,(buttext.length - 1));
			}
			else if ( tag == 'BUTTON' && button){
				button.className = 'button2';
			}
		}
		txtarea.focus();
		return;
	}

	if (txtarea.selectionEnd && (txtarea.selectionEnd - txtarea.selectionStart > 0))
	{
		mozWrap(txtarea, bbtags[bbnumber], bbtags[bbnumber+1]);
		return;
	}
	// Find last occurance of an open tag the same as the one just clicked
	for (i = 0; i < bbcode.length; i++) {
		if (bbcode[i] == bbnumber+1) {
			bblast = i;
			donotinsert = true;
		}
	}
	if (donotinsert) {		// Close all open tags up to the one just clicked & default button names
		while (bbcode[bblast]) {
			butnumber = arraypop(bbcode) - 1;
			txtarea.value += bbtags[butnumber + 1];
			if ( tag == 'INPUT' ) {
				buttext = button.value;
				button.value =buttext.substr(0,(buttext.length - 1));
			}
			else if (tag == 'BUTTON' && button){
				button.className = 'button2';
			}
		}
		txtarea.focus();
		return;
	} else {
		// Open tag
		txtarea.value += bbtags[bbnumber];
		arraypush(bbcode,bbnumber+1);
		if ( tag == 'INPUT' ) {
			eval('document.post.addbbcode'+bbnumber+'.value += "*"');
		}
		else if (tag == 'BUTTON' && document.getElementById('addbbcode'+bbnumber)){
			button.className = 'button2 bbcode';
		}
		txtarea.focus();
		return;
	}

}

function storeCaret(textEl) {
	if (textEl.createTextRange) textEl.caretPos = document.selection.createRange().duplicate();
}

function mozWrap(txtarea, open, close)
{
	var selLength = txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	if (selEnd == 1 || selEnd == 2)
	selEnd = selLength;
	var s1 = (txtarea.value).substring(0,selStart);
	var s2 = (txtarea.value).substring(selStart, selEnd)
	var s3 = (txtarea.value).substring(selEnd, selLength);
	txtarea.value = s1 + open + s2 + close + s3;
	return;
}

function arraypush(thearray,value) {
	thearray[ getarraysize(thearray) ] = value;
}

function getarraysize(thearray) {
	for (i = 0; i < thearray.length; i++) {
		if ((thearray[i] == "undefined") || (thearray[i] == "") || (thearray[i] == null))
		return i;
	}
	return thearray.length;
}

// Replacement for arrayname.pop() not implemented in IE until version 5.5
// Removes and returns the last element of an array
function arraypop(thearray) {
	thearraysize = getarraysize(thearray);
	retval = thearray[thearraysize - 1];
	delete thearray[thearraysize - 1];
	return retval;
}

function fatch(evt){
try{
 var target = evt.target;
 var keycode;
  if(target != null){
	keycode = evt.keyCode; 
	if(evt.shiftKey){
	 switch(keycode){
	  case 107:
	    retype();
	    bbstyle(index["do"]);
	  break;
	  case 50:
	    retype();
	    bbstyle(index["speek"]);
	  break;
	  case 220:
	    retype();
	    bbstyle(index["think"]);
	  break;
	 }
	} else if(evt.altKey){
         if(autooff){
	  if(keycode >= 56 && keycode <= 57){
	    retype();
		bbstyle(index["off"]);
	  }
         }
	}
  }
 } catch(evt) {
  dump("keyrecognition:\n"+evt);
 }
}

function retype(){
 var text = txtbox.value;
 var text = text.substring(0,text.length-1);
 txtbox.value = text; 
}

function $x() {
	var x='',          // default values
	node=document,
	type=0,
	fix=true,
	i=0,
	toAr=function(xp){      // XPathResult to array
		var final=[], next;
		while(next=xp.iterateNext())
			final.push(next);
		return final
	},
	cur;
	while (cur=arguments[i++])      // argument handler
		switch(typeof cur) {
			case "string":x+=(x=='') ? cur : " | " + cur;continue;
			case "number":type=cur;continue;
			case "object":node=cur;continue;
			case "boolean":fix=cur;continue;
		}
	if (fix) {      // array conversion logic
		if (type==6) type=4;
		if (type==7) type=5;
	}
	if (!/^\//.test(x)) x="//"+x;         	 // selection mistake helper
	if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
	var temp=document.evaluate(x,node,null,type,null); //evaluate!
if (fix)
	switch(type) {                              // automatically return special type
		case 1:return temp.numberValue;
		case 2:return temp.stringValue;
		case 3:return temp.booleanValue;
		case 8:return temp.singleNodeValue;
		case 9:return temp.singleNodeValue;
	}
	return fix ? toAr(temp) : temp;
}

function words(evt){
 try 
 {
   var target = evt.target;
   if(target != null){
    if(wordcounter.firstChild != null){
      wordcounter.removeChild(wordcounter.firstChild);
    }
	var i = wordCount(document.getElementById("text_editor_textarea").value);
	if(i < 65){
	  wordcounter.setAttribute("style","color:#FF0000;");
	} else {
	  wordcounter.setAttribute("style","color:#FFFFFF;");
	}
	wordcounter.appendChild(document.createTextNode(" Wörter: "+i));

  }
 } catch(evt) {
  dump("words:\n"+evt);
 }
}


function wordCount(text){
  var words = text.split(" ");
  var wordCount = 0;

  for(i=0; i<words.length; i++){
    if (words[i].length > 0)
      wordCount++;
  }

  return wordCount;
}