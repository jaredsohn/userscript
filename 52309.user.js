// ==UserScript==
// @name           VidzBigger Site Submission Tool
// @namespace      vidzbigger.com
// @description    This script allows one to browse through a website and submit its layout for inclusion in VidzBigger
// @include        http://*
// @include        https://*
// ==/UserScript==

var version = 0.001;

unwin=unsafeWindow;
//....................................................................
// Events Factory
// Copyright (c) 2005 Tim Taylor Consulting
//....................................................................
window.cevents = {
	register : function(element, type, func) {
		if (element.addEventListener) {
			element.addEventListener(type, func, false)
		} else if (element.attachEvent) {
			if (!element._listeners) element._listeners = new Array()
			if (!element._listeners[type]) element._listeners[type] = new Array()
			var workaroundFunc = function() {
				func.apply(element, new Array())
			}
			element._listeners[type][func] = workaroundFunc
			element.attachEvent('on' + type, workaroundFunc)
		}
	},
}
//END EVENTS FACTORY *****************************************************
function vidzb_getEventTarget(evt) {
    var targ = (evt.target) ? evt.target : evt.srcElement;
    if(targ != null) {
        if(targ.nodeType == 3)
            targ = targ.parentNode;
    }
    return targ;
}
unwin.getScroll=function(){
    if(document.all){
        return document.body.scrollTop;
    }else{
        return window.pageYOffset;
    }
}
function $(id) {
	if(document.getElementById(id))
		return document.getElementById(id);
	else
		return false;
}
function $g(id) {
	return document.getElementById(id);
}
unwin.$elm=function(id){
	return $(id);
}


///BEGIN UNIQUE CDE

var selectedElement='';
function selectElement(elm){
	if(!elm||!elm.style)return false;
	if(selectedElement&&selectedElement.style){
		selectedElement.style.border='none';
	}
	selectedElement=elm;
	elm.style.border="3px dotted red";
	return true;
}
window.updateDatshLengh=function(){
	var clr=selectedElement.id&&selectedElement.id.length>0?'green':'red'
	if( clr != 'green' ) clr=selectedElement.className&&selectedElement.className.length>0?'blue':'red'
	if(selectedElement&&selectedElement.style){
		if(selectedElement.style.border=="3px dotted "+clr)
		selectedElement.style.border="4px dotted "+clr;
		else
		selectedElement.style.border="3px dotted "+clr;
	}
}
window.setInterval(updateDatshLengh,969);
window.vbelemClickdForSelction=function(evt){
	if (evt.which) rightclick = (evt.which == 3);
	if(rightclick || evt.target.nodeName=='TEXTAREA' || evt.target.nodeName=='INPUT' ){
		//allow typing in these fields
	}else{
		var theElem = vidzb_getEventTarget(evt);
		selectElement(theElem);
	}
}
cevents.register(document.body, 'mouseup' ,vbelemClickdForSelction);
function selectElementNextSibling(){
	selectElement(selectedElement.nextSibling)?true:selectElement(selectedElement.nextSibling.nextSibling);
	resetScroll();
}
function selectElementPrevSibling(){
	selectElement(selectedElement.previousSibling)?true:selectElement(selectedElement.previousSibling.previousSibling);
	resetScroll();
}
function selectElementParentNode(){
	selectElement(selectedElement.parentNode)?true:selectElement(selectedElement.parentNode.parentNode);
	resetScroll();
}
function selectElementChildNode(){
	selectElement(selectedElement.childNodes[0])?true:selectElement(selectedElement.childNodes[1])?true:selectElement(selectedElement.childNodes[2])?true:selectElement(selectedElement.childNodes[3]);
	resetScroll();
}
unwin.sayTheElementInfo=function(where){
	resetScroll();
	if(selectedElement.id)
	return selectedElement.id;//alert(selectedElement.id)
	else{
		return '.'+selectedElement.className;
	}
}
function resetScroll(){
	var thisScr=unwin.getScroll();
	window.setTimeout(function(){
		window.scroll(0,thisScr);
	},5);
}
function keywaspressedddd(e){
  if(e.target.nodeName=='TEXTAREA' || e.target.nodeName=='INPUT' ) return;//allow typing in these fields
//	alert(e.keyCode);
	switch(e.keyCode){ 
  	case 32://space
  	//sayTheElementInfo();
  	break;
  	case 38://up (out)
  	selectElementParentNode();
  	break;
  	case 40://dn (in)
  	selectElementChildNode();
  	break;
  	case 37://left pre
  	selectElementPrevSibling();
  	break;
  	case 39://right nxt
  	selectElementNextSibling();
  	break;
  	default:
  	break;
  } 
	return false;
}
window.addEventListener('keydown',keywaspressedddd,true);

var ndv=document.createElement('DIV');
ndv.setAttribute('id','vb_submission_tool');
ndv.setAttribute('style','position:fixed;top:0px;right:0px;background-color:black;color:white;text-align:left;z-index:10000;');
document.body.appendChild(ndv);
var dhtm='<input type="button" value="^" onclick="document.getElementById(\'vbsubmbox\').style.display==\'none\'?document.getElementById(\'vbsubmbox\').style.display=\'block\':document.getElementById(\'vbsubmbox\').style.display=\'none\';"> VidzBigger Site Submission Tool <input type="button" value="Close" onclick="$elm(\'vb_submission_tool\').innerHTML=\'\'"> <input type="button" value="?" onclick="this.nextSibling.style.display==\'none\'?this.nextSibling.style.display=\'block\':this.nextSibling.style.display=\'none\'"><div style="display:none;padding:5px;"><b>Instructions</b><br/>&bull; Click an Element to Begin.<br/>&bull; Use the Arrow Keys.<br/>&bull; &uarr; and &darr; step in and out of elements.<br/>&bull; &larr; and &rarr; selects siblings at<br/>a given level within the containing element (press alot).<br/>&bull; <span style="color:green;">Green=Good(id)</span> <span style="color:blue;">Blue=Ok(class)</span> <span style="color:red;">Red=Bad</span><br/>&bull; When you have the correct Element hilighted<br/>click the arrow next to the box<br/>(header 4 ex) to copy the ID or classname there.<br/>&bull; IDs are usually unique and easier to use. <br/>&bull; You must fill out all the * fields or it won\'t work!<br/><input type="button" onclick="javascript:this.parentNode.style.display=\'none\'" value="Hide" /></div><br/><form action="http://vidzbigger.com/savesite.php" method="POST" ><br/>';
configIds=new Array();
configIds['ids_header0']='Header A*';//gbar,guser
configIds['ids_header']='Header B';
configIds['ids_header2']='Header C';
configIds['ids_title']='Video Title Bar ^';
configIds['ids_video_holder']='Video Holder*';
//configIds['ids_video_positioner']='';
configIds['ids_left_column']='Left Col A*';
configIds['ids_left_column2']='Left Col B';
configIds['ids_right_column']='Right Col A*';
configIds['ids_right_column2']='Right Col B';
//configIds['ids_texttitle']='titlebar-title';
configIds['ids_footer']='Footer A*';
configIds['ids_footer2']='Footer B';
configIds['watchStrings']='Url Must Contain*<br/> On Video Pages Only (/watch 4 ex)';
configIds['tag']='Tag It (optional)';
dhtm+='<div id="vbsubmbox">';
for(i in configIds){
dhtm+='<input type="button" value="&gt;" onclick="$elm(\'val_'+i+'\').value=sayTheElementInfo()" /><input id="val_'+i+'" name="'+i+'" type="text" value="" /> '+configIds[i]+'<br/>';
}
dhtm+='</div>';
dhtm+='<input type="submit" value="Save" name="savestuff"><input type="hidden" value="'+window.location.host+'" name="siteurl"></form><small><small>when you are done simply right click the greasemonkey and dissable this userscript</small></small>';
$('vb_submission_tool').innerHTML=dhtm;