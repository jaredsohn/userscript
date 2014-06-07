// ==UserScript==
// @name           CheckSmarter
// @namespace      http://vidzbigger.com
// @description    Allows one to click and drag across multiple checkmarks to select or deselect them all.
// @include        http://mail.google.com/mail/*
// @include        http://*mail.yahoo.tld/*
// @include        https://*
// @include        http://*
// @exclude        http://vidzbigger.com/checksmarter/*
// @exclude        https://vidzbigger.com/checksmarter/*
// ==/UserScript==

////*****************************************************************************///
///                                                                               //
//  IF YOU A READING THIS - YOU FORGOT TO ENABLE GreaseMonkey!  Click the monkey! //
//                                                                                //
//   ( the monkey is located in the bottom right corner of your firefox window )  //
//   ( in the status bar, which you can show using view status bar if you need )  //
//                                                                                //
//    Once the monkey is Lit Up (not grey) click your back button and try again!  //
//                                                                                //
//               SORRY IE USERS - NO SUPPORT for GreaseMonkey Yet.                //
//                 Download Firefox and/or visit VidzBigger.com                   //
//                                                                                //
//********************************************************************************//
//********************************************************************************//
//*******************************************************************************//
//******************************************************************************//
var checksmartener_Version=0.004;
var unwin = unsafeWindow;
var progName='CheckSmarter';
function aboutCheckSmarter(){alert(progName+' Version '+checksmartener_Version+'\n\n'+'Created By VidzBigger.com'+'\n\n');}
GM_registerMenuCommand( "About "+progName+"!", aboutCheckSmarter, "", "", "a" );
//....................................................................
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
//VidzBigger LIBRARY OF POINTLESSLY IE COMPATABLE FUNCTIONS
unwin.fireEvent=function(element,event){
    if (document.createEventObject){
        // dispatch for IE (NEVER happens this is a greasemonkey script! lol)
        var evt=document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }
    else{
        // dispatch for firefox + others
        var evt=document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true ); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}
unwin.fireUIEvent=function(element,event){
    if (document.createEventObject){
        // dispatch for IE (NEVER happens this is a greasemonkey script! lol)
        var evt=document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }
    else{
        // dispatch for firefox + others
        var evt=document.createEvent("UIEvents");
        evt.initUIEvent(event, true, true, window, 1 ); // event type,bubbling,cancelable, view, detail) 
        return !element.dispatchEvent(evt);
    }
}
unwin.fireMouseEvent=function(element,event){
	
    if (document.createEventObject){
        // dispatch for IE (NEVER happens this is a greasemonkey script! lol)
        var evt=document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }
    else{
        // dispatch for firefox + others
        var evt=document.createEvent("MouseEvents");
        evt.initMouseEvent(event, true, true,null, 1, 1, 1, 1, 1, false, false, false, false, 0, element);
        return !element.dispatchEvent(evt);
    }
}
//END VidzBigger LIBRARY OF POINTlESSLY IE COMPATIBLE FUNCTIONS
unwin.csElmNodeName='INPUT';//lol
unwin.csElmType='checkbox';

String.prototype.trim=function(){
	return this.replace(/^\s+|\s+$|^\r+|\r+$|^\n+|\n+$|^\r\n+|\r\n+$/g,"");
};
var allChecks = new Array();
function vidzb_getEventTarget(evt) {
    var targ = (evt.target) ? evt.target : evt.srcElement;
    if(targ != null) {
        if(targ.nodeType == 3)
            targ = targ.parentNode;
    }
    return targ;
}
function reupchecks(){
	if( unwin.senab == false ){
		allChecks = new Array();
		var allLinks=document.getElementsByTagName(unwin.csElmNodeName);
		for( var x=0; x<allLinks.length; x++ ){
			if( allLinks[x].type == unwin.csElmType  ){
				allChecks.push(allLinks[x]);
			}
		}
	}
	return;
}
var LastSetOfChecks=new Array();
function cs_uncheckAllChecks(){
	var nsoc = new Array();
	for( var x=0; x<allChecks.length; x++  ){
		if( allChecks[x].checked ){
			nsoc.push(allChecks[x]);
			checkTheElement(allChecks[x],false);
		}
	}
	if( nsoc.length > 0 ){
		LastSetOfChecks=new Array();
		LastSetOfChecks=nsoc;
	}
}
unwin.cs_reuncheckAllChecks=function(){
	var tf = !LastSetOfChecks[0].checked;
	for( x in LastSetOfChecks ){
		checkTheElement(LastSetOfChecks[x],tf);
	}
}

function LookupSelf(checkmarkelem){
	for( var x=0; x<allChecks.length; x++  ){
		if(checkmarkelem == allChecks[x]){
			return x;
		}
	}return -1;
}
function checkTheElement(theElem, checkValue){
	if(theElem.checked == true){//next howt to determine if starred already???
		if( checkValue == false ){
			unwin.fireMouseEvent(theElem,'click');
		}
	}else{
		if( checkValue == true ){
			unwin.fireMouseEvent(theElem,'click');
		}
	}
}
function selectCheckRange(a,b){
	var l,h;
	if( a > b ){ l = b; h = a; }
	else{ l = a; h = b; }
	for( var i=l; i<=h; i++ ){
		if( allChecks[i] ){
			checkTheElement(allChecks[i], unwin.smode);
		}
	}
}
unwin.lookUpStarterCheck=function(){
	unwin.startCheck=LookupSelf(unwin.startCheckNode);
	if( unwin.startCheck<0){
		window.setTimeout(function(){
				unwin.lookUpStarterCheck();//keep looking until we can find it since the lookup comparison is not initially available...???
			},550)
	}
}

window.mouseoverelem=function(evt){
	clearTimeout(unwin.preferencesTimeoutId);
	var theElem = vidzb_getEventTarget(evt);
	if( theElem.nodeName == unwin.csElmNodeName ){
		if( theElem.type == unwin.csElmType){
			var wasCancel = unwin.maybeCancelChkSmPrefs();
			if( unwin.senab ){
				unwin.endCheckNode=theElem;
				unwin.endCheck = LookupSelf(unwin.endCheckNode);
				if(unwin.startCheck>=0)selectCheckRange(unwin.endCheck, unwin.startCheck);
				checkTheElement(theElem, unwin.smode);
			}else{
				//OK set a timeout to show preference screen
				
				if( isNumber(unwin.prefShowAfter) && unwin.prefShowAfter>0 && unwin.prefShowAfter<5){
					//okay..
				}else{
					unwin.prefShowAfter=3;
				}
				if( !wasCancel )unwin.preferencesTimeoutId=window.setTimeout(showpreferencescreen,unwin.prefShowAfter*1000);
				unwin.preferencesCheck=theElem;
			}
		}
	}
}
window.mouseoutelem=function(evt){
	clearTimeout(unwin.preferencesTimeoutId);
	var theElem = vidzb_getEventTarget(evt);
	if( theElem.nodeName == unwin.csElmNodeName ){
		if( theElem.type == unwin.csElmType){
			if( unwin.senab ){
				checkTheElement(theElem, unwin.smode);
			}
		}
	}
}
window.checkmarkwasreleased=function(evt){
	var theElem = vidzb_getEventTarget(evt);
	unwin.senab = false;
}
window.checkmarkwaspressed=function(evt){
	
	if (evt.which) rightclick = (evt.which == 3);
	//else if (evt.button) rightclick = (evt.button == 2);
	//alert('Rightclick: ' + rightclick );
	//alert( evt.which );
	
	var allowDesel=false;
	if(rightclick && unwin.wasRightClick==false){
		unwin.wasRightClick=true;
		//unwin.fireMouseEvent(theElem,'click');
		return false; // the next click whill trigger:
	}else if(unwin.wasRightClick){
		unwin.wasRightClick=false;
		if(unwin.invertCsClicks){
				//deselect!
				allowDesel = true;
			}else{
				return;//skips deselect 
			}
	}

	clearTimeout(unwin.preferencesTimeoutId);
	var theElem = vidzb_getEventTarget(evt);
	if( theElem.nodeName == unwin.csElmNodeName ){
		if( theElem.type == unwin.csElmType){
			reupchecks();
			/*if(evt.shiftKey){//breaks gmail since that already supports shift key range selection
				var myIdx = LookupSelf(theElem);
				unwin.smode = allChecks[unwin.startCheck].checked;
				selectCheckRange(myIdx, unwin.startCheck);
				unwin.fireMouseEvent(theElem,'click');
				return;
			}*/
			unwin.senab = true;
			unwin.startCheckNode = theElem;
			unwin.lookUpStarterCheck();
			if(theElem.checked == true){
				unwin.smode = false;
			}else{
				unwin.smode = true;
			}
		}
	}	
	if( !unwin.senab && (!unwin.invertCsClicks||allowDesel) )unwin.checkForDeselectChecks(evt,theElem);
	return false;
}

unwin.document.captureEvents(Event.MOUSEDOWN);


unwin.wasRightClick=false;
unwin.checkForDeselectChecks=function(evt,theElem){
	
var uncheckAfter = unwin.checkSmarterUncheckStr.split(',');
	//alert(uncheckAfter.length);//evil
	var tcmp = theElem.innerHTML.toLowerCase();
	if( tcmp.length < 1 && (theElem.type=='button' || theElem.type=='submit') && theElem.value ) tcmp = theElem.value.toLowerCase();
	if( tcmp.length < 1 ) return;
	for( i in uncheckAfter){
		var tcc = uncheckAfter[i].trim().toLowerCase();
		if( tcmp == tcc ){
			window.setTimeout(cs_uncheckAllChecks,250);//10 too small!
		}
	}
}
function findPos(obj) {
	var curleft = curtop = 0;
	if(obj.offsetParent){
		do{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
		}while (obj = obj.offsetParent);
		return [curleft,curtop];
	}
}
function $g(id){
	return document.getElementById(id);
}
function $(id){// i like this saves so much time
	if(document.getElementById(id))//i hope thats not an expensive test
		return document.getElementById(id);
	else
		return false;
}
window.showpreferencescreen=function(){
	if( !document.getElementById('checksmarter_prefs') ){
		unwin.checksmarter_prefs = document.createElement('DIV');
		unwin.checksmarter_prefs.setAttribute('id','checksmarter_prefs');
		opacity=100;
		unwin.checksmarter_prefs.setAttribute('style','width:355px;1px soild white;opacity:'+(opacity/100)+';filter: alpha(opacity='+(opacity)+');-moz-opacity: '+(opacity/100)+';');
		document.body.appendChild(unwin.checksmarter_prefs);
	}
	var xy=findPos(unwin.preferencesCheck);
	$g('checksmarter_prefs').style.display="block";
	$g('checksmarter_prefs').style.position='absolute';
	$g('checksmarter_prefs').style.top=''+(xy[1]+0)+'px';
	$g('checksmarter_prefs').style.left=''+(xy[0]+17)+'px';
	$g('checksmarter_prefs').style.backgroundColor='#000';
	$g('checksmarter_prefs').style.color='#FFF';
	$g('checksmarter_prefs').style.padding='6px';
	$g('checksmarter_prefs').style.fontSize='11pt';
	var csp='';
	csp+='<span style="float:left;font-size:8px;"><input style="float:left;font-size:8px;" type="button" onclick="canclChkSmPrefs()" value="X" />';
	if( LastSetOfChecks.length > 0 )csp+=' <input type="button" onclick="cs_reuncheckAllChecks();canclChkSmPrefs();" value="Undo" />';
	csp+='</span>';
	csp+='<small style="float:right;width:60px;margin-right:15px;margin-left:15px;" ><a target="_blank" onmouseover="document.getElementById(\'showhide\').style.display=\'block\';" href="http://www.vidzbigger.com/contact.php?BugReportInfo=1&browserinfo=CheckSmarter_version_'+checksmartener_Version+':::" style="color: rgb(82, 163, 238);">Submit Bugs and Suggest Features</a><span id="showhide" style="display:none;"> How about an "unread paintbrush" for example :) or donate!<span></small>';
	csp+='<b>CheckSmarter Preferences</b><br/>';
	csp+='Uncheck 0.25 seconds After Clicking:<br><small>(comma seperated)</small><br/>';
	csp+='<textarea id="csp_uncheckafter">'+unwin.checkSmarterUncheckStr+'</textarea><br/>';
	csp+='<small><small>Hover any check for <input type="text" value="'+unwin.prefShowAfter+'" id="csp_showtimeout" style="font-size:10px;width:30px;" /> seconds to show<br/>these preferences and <span style="color:red;">touch any check to hide</span></small></small><br/>';	
	csp+='<small><small><input type="button" onclick="cs_reuncheckAllChecks()" value="Undo Last Audo-Deselect" /></small></small>';
	csp+='<br/>Trigger Auto Uncheck<br/><label><input type="radio" name="invertCsClicks" value="0" '+(unwin.invertCsClicks=='0'?'checked':'')+' />On</label><label> <input type="radio" id="invertCsClicks1" name="invertCsClicks" value="1" '+(unwin.invertCsClicks?'checked':'')+' />Flipped (Right->Left click to uncheck)</label>';
	csp+='<br/><small><small>{On: Left click while hodling right mouse button <br/>to <b>skip</b> auto-uncheck and left click to uncheck}</small></small><br/>';
	csp+='<input type="button" onclick="saveChkSmPrefs()" value="Save" />';
	csp+='<input type="button" onclick="canclChkSmPrefs()" value="Close" />';
	
	csp+='<br/><a target="_blank" href="http://userscripts.org/scripts/show/43572" style="float:right;font-size:8px;" style="color: rgb(82, 163, 238);">version '+checksmartener_Version+'</a>';
	
	//test cases
	//csp+='<div>mark as read</div>';
	//csp+='<a href="javascript:void(0)">mark as read</a>';
	//csp+='<input type="button" value="mark as unread" />';
	$g('checksmarter_prefs').innerHTML=csp;
}
window.reallySaveChkSmPrefs=function(){
	GM_setValue('checkSmarterUncheckStr',unwin.checkSmarterUncheckStr)
	GM_setValue('prefShowAfter',unwin.prefShowAfter)
	GM_setValue('invertCsClicks',unwin.invertCsClicks)
}
unwin.saveChkSmPrefs=function(){
	unwin.checkSmarterUncheckStr=$g('csp_uncheckafter').value;
	unwin.prefShowAfter=$g('csp_showtimeout').value;
	unwin.invertCsClicks=$g('invertCsClicks1').checked;
	window.setTimeout(reallySaveChkSmPrefs,10);
	unwin.canclChkSmPrefs();
}
unwin.canclChkSmPrefs=function(){
	$g('checksmarter_prefs').innerHTML='';
	$g('checksmarter_prefs').style.display="none";
}
unwin.maybeCancelChkSmPrefs=function(){
	if($('checksmarter_prefs') && $('checksmarter_prefs').style.display=="block"){
		if( unwin.checkSmarterUncheckStr==$g('csp_uncheckafter').value ){
			unwin.canclChkSmPrefs();
			return true;
		}
	}return false;
}
	
function isNumber( value ){return isFinite( (value * 1.0) );}

unwin.prefShowAfter=3;
unwin.invertCsClicks=0;
unwin.checkSmarterUncheckStr='mark as read,\nmark as unread'
unwin.checkSmarterUncheckStr=GM_getValue('checkSmarterUncheckStr',unwin.checkSmarterUncheckStr);
unwin.prefShowAfter=GM_getValue('prefShowAfter',unwin.prefShowAfter);
unwin.invertCsClicks=GM_getValue('invertCsClicks',unwin.invertCsClicks);
unwin.prefShowAfter=new Number(unwin.prefShowAfter);
if(unwin.checkSmarterUncheckStr.indexOf(',') < 1 && unwin.checkSmarterUncheckStr.length > 0 ){
	unwin.checkSmarterUncheckStr='Mark as Read,\nMark as Unread,\nAdd Star'
}

unwin.preferencesTimeoutId=0;
unwin.preferencesCheck=0;
unwin.smode = true;
unwin.senab = false;
unwin.startCheck = 0;
unwin.startCheckNode = 0;
unwin.endCheck = 0;
unwin.endCheckNode = 0;

//perhaps we affix these events to individual check boxes next time?: less testing would be required...
cevents.register(document.body, 'mousedown' ,checkmarkwaspressed);
cevents.register(document.body, 'mouseover' ,mouseoverelem);
cevents.register(document.body, 'mouseout' ,mouseoutelem);
cevents.register(document.body, 'mouseup' ,checkmarkwasreleased);