// ==UserScript==
// @name          OTN Forum Posting Page
// @namespace     http://carlback.blogspot.com/
// @description   Puts some missing features into OTN Forum Posting Page
// @include       http://forums.oracle.com/forums/post*
// ==/UserScript==

function $x(pNd){
	try{
    var node;
    switch(typeof (pNd)){
      case 'string':node = document.getElementById(pNd);break;
      case 'object':node = pNd;break;
      default:node = false;break;
    }
	if(node.nodeType == 1){return node;}else{return false;}
  }catch(e){return false;}
}

function styleTag2(tag, ta,esc) {
	var tagOpen = (tag)?'[' + tag.toLowerCase() + ']':'';
	var tagClose = (tag)?'[/' + tag.toLowerCase() + ']':'';
	var selLength = ta.textLength;
	var selStart = ta.selectionStart;
	var selEnd = ta.selectionEnd;
	if (selEnd == 1 || selEnd == 2) {selEnd = selLength;}
	var s1 = (ta.value).substring(0, selStart);
	var s2 = (ta.value).substring(selStart, selEnd)
	var s3 = (ta.value).substring(selEnd, selLength);
	if(tag){ta.value ='\n'}
	ta.value += s1 + tagOpen;
	ta.value += (esc)?s2.replace(/</g, "&lt;"):s2;
	ta.value += tagClose + s3;
	if(tag){ta.value +='\n'}
	ta.focus();
	return;
}


function insertbutton(pThis,pId,pValue,pClick){
	var newElement = document.createElement('input');
	newElement.type="button";
	newElement.id=pId;
	newElement.value=pValue;
	newElement.addEventListener("click", pClick, false); 
	pThis.appendChild(newElement)
	return newElement;
}

var lText = $x('jive-post-bodybox');
var lTextarea = $x('body01');



if (lTextarea) {
    newElement = document.createElement('div');
    lTextarea.parentNode.insertBefore(newElement, lTextarea);
	insertbutton(newElement,'pre','[pre]',function(){styleTag2('pre',lTextarea);return false;})
	insertbutton(newElement,'code','[code]',function(){styleTag2('code',lTextarea);return false;})
	insertbutton(newElement,'code','[code] escape html',function(){styleTag2('code',lTextarea,true);return false;})
	insertbutton(newElement,'code','escape html',function(){styleTag2(false,lTextarea,true);return false;})
}

var lValue = lTextarea.value;

/* start edit */
/* edit for message prefix */
var lPrefix = 'Hello,\n\n';

/* edit for message sig */
var lSig = 'Regards,\nYour Name\n\n';
lSig += 'link1 : http://otn.oracle.com/ \n';
lSig += 'link2 : http://otn.oracle.com/ \n';
/* end edit */

lTextarea.value = lPrefix + lValue +  lSig;

