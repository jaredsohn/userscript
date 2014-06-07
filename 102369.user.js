/*
	© 2012 SBscripts
	
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
// ==UserScript==
// @name           EnableShack - makes ImageShack Direct Link accessible
// @namespace      scripts.seabreeze.tk
// @description    Imageshack.us blocked the direct link field... And think that you'll sign up now? Time to show this won't work! The script makes the "Direct Link" feel like it used to do, fully accessible! And as a bonus: it hides the "Join Now!" popup. Install and enjoy!
// @version        0.1.10 bèta
// @homepageURL    http://userscripts.org/scripts/show/102369
// @license        LGPL v3 or later versions - http://www.gnu.org/copyleft/lesser.html
// @include        http://imageshack.us/
// @include        https://imageshack.us/
// @include        http://imageshack.us/content_round.php?*
// @include        http://imageshack.us./content_round.php?*
// @include        http://www.imageshack.us/content_round.php?*
// @include        http://www.imageshack.us./content_round.php?*
// @include        https://imageshack.us/content_round.php?*
// @include        https://www.imageshack.us/content_round.php?*
// @include        http://img*.imageshack.us/content_round.php?*
// @include        http://img*.imageshack.us./content_round.php?*
// @include        http://userscripts.org/topics/new?script_id=102369*
// @include        https://userscripts.org/topics/new?script_id=102369*
// @include        http://userscripts.org/scripts/source/102369.meta.js
// @include        http://userscripts.org/scripts/source/102369.meta.js?*
// @include        https://userscripts.org/scripts/source/102369.meta.js
// @include        https://userscripts.org/scripts/source/102369.meta.js?*
// @match          http://imageshack.us/
// @match          https://imageshack.us/
// @match          http://imageshack.us/content_round.php?*
// @match          http://imageshack.us./content_round.php?*
// @match          http://*.imageshack.us/content_round.php?*
// @match          https://imageshack.us/content_round.php?*
// @match          https://*.imageshack.us/content_round.php?*
// @match          http://*.imageshack.us./content_round.php?*
// @match          http://userscripts.org/topics/new?script_id=102369*
// @match          https://userscripts.org/topics/new?script_id=102369*
// @match          http://userscripts.org/scripts/source/102369.meta.js
// @match          http://userscripts.org/scripts/source/102369.meta.js?*
// @match          https://userscripts.org/scripts/source/102369.meta.js
// @match          https://userscripts.org/scripts/source/102369.meta.js?*
// ==/UserScript==
/*
	TODO
	
  * Edit the showMessage function so it uses DOM instead of innerHTML
  * Implement a better way to show version changes

*/
/*
	IMPORTANT THINGS TO REMEMBER WHEN UPDATING
	(For me, as the developer. If you are somebody who wants to install the script, just go ahead and don't worry about all of this :-))
	
  * Edit both the @version in the script metadata and the this.localVersion value in the updater, otherwise OR users won't get informed of the update OR the update message will be shown even tough there is no new version available
  
*/


/********************
                        FUNCTIONS
                                    ********************/
									
//Some might just want IE compatibility
if(!window.addEventListener){Object.prototype.addEventListener=this.attachEvent;}


function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function deleteCookie(name) {
	createCookie(name,"",-1);
}

function getURLparam(){
	var _location_parameters=window.location.href.split('?')[1];
	_location_parameters=_location_parameters.split('&');
	var location_parameters=[];
	
	for(i=0;i<_location_parameters.length;i++){
		location_parameters[(_location_parameters[i].split('=')[0])]=_location_parameters[i].replace(_location_parameters[i].split('=')[0],'').replace('=','');	
	}
	return location_parameters;
}

function showMessage(title,body){

	var closeUniqueStr=Date.now();
	var msg=document.createElement('span');
	msg.innerHTML=unescape('%3Cdiv%20style%3D%22position%3Afixed%20%21important%3Btop%3A50%25%20%21important%3Bleft%3A50%25%20%21important%3Bwidth%3A300px%20%21important%3Bheight%3A120px%20%21important%3Bbackground%3Awhite%20%21important%3Bmargin%3A-60px%20auto%20auto%20-150px%20%21important%3B-moz-border-radius%3A4px%20%21important%3Bborder-radius%3A4px%20%21important%3Bborder%3A1px%20solid%20skyblue%20%21important%3Bz-index%3A10000%20%21important%3Bfont-size%3A16px%20%21important%3Btext-align%3Aleft%20%21important%22%3E%0A%3Cdiv%20style%3D%22background%3Ablack%20%21important%3Bcolor%3Awhite%20%21important%3Bfont-weight%3Abold%20%21important%3Bpadding%3A3px%205px%203px%205px%20%21important%3Bfont-family%3ACalibri%2C%20sans-serif%20%21important%3B-webkit-border-top-left-radius%3A4px%20%21important%3B-webkit-border-top-right-radius%3A4px%20%21important%3B-moz-border-radius-topleft%3A4px%20%21important%3B-moz-border-radius-topright%3A4px%20%21important%3Bborder-top-left-radius%3A4px%20%21important%3Bborder-top-right-radius%3A4px%20%21important%3B%22%3E')+title+unescape('%3Cdiv%20style%3D%22color%3Ared%20%21important%3Bfloat%3Aright%20%21important%3Bdisplay%3Ainline%20%21important%3Bpadding%3A0%202px%200%202px%20%21important%3Bline-height%3A0.623em%20%21important%3Bfont-size%3A1.1em%20%21important%3Bfont-weight%3Abold%20%21important%3Bcursor%3Apointer%20%21important%22%20id%3D%27eShack_dismissMessage_'+closeUniqueStr+'%27%3E%26times%3B%3C%2fdiv%3E%3C%2fdiv%3E%0A%3Cdiv%20style%3D%27padding%3A2px%205px%202px%205px%20%21important%3Bfont-family%3ACalibri%2Csans-serif%20%21important%3Btext-align%3Aleft%20%21important%3B%27%3E')+body+unescape('%0A%3C/div%3E%3Cscript%20type%3D%22text/javascript%22%3E%0Adocument.getElementById%28%27eShack_dismissMessage%27%29.addEventListener%28%27click%27%2Cfunction%28e%29%7Bthis.parentNode.parentNode.parentNode.removeChild%28this.parentNode.parentNode%29%7D%2Cfalse%29%3B%0A%0A%3C/script%3E%0A');
	msg=document.body.appendChild(msg);
	document.getElementById('eShack_dismissMessage_'+closeUniqueStr).addEventListener('click',function(e){this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)},false);
	return msg;
	
}

function inject(func){
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.appendChild(document.createTextNode("(" + func + ")();"));
	document.body.appendChild(script);
}

function insert(jsCode){
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.appendChild(document.createTextNode(jsCode));
	document.body.appendChild(script);
}

function localstorage_supported() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function web_workers_supported() {
  return !!window.Worker;
}

//HTML entities
function ent(str){
	return str.replace(/./g,function(str){
		return '&#'+str.charCodeAt(0)+';';
	});
}


function updater(){
	if(!localstorage_supported()||!web_workers_supported()){
		return null;//Allways break if no localstorage is supported / web workers are not implemented
	};
	
	var t=this;
	
	//Updater conf.
	this.scriptMeta='//userscripts.org/scripts/source/102369.meta.js';
	this.runDomain='imageshack.us';
	this.storageHandler='/main_storage_handler';//Not in use
	this.localVersion='0.1.10 bèta';
	
	if(!localStorage.getItem('updaterInterval')){
		localStorage.setItem('updaterInterval',1000*60*60*24);//milisec * sec * min * hours * days
	};

	if(!localStorage.getItem('updateAvailable')){
		localStorage.setItem('updateAvailable',false);
	};

	
	this.checkNeeded=function(){
		if(localStorage.getItem('updaterInterval')&&(new Date().getTime()-parseInt(localStorage.getItem('updaterLastCheck'),10))>parseInt(localStorage.getItem('updaterInterval'),10)||!localStorage.getItem('updaterLastCheck')){//Yes, we need a check
			return true;
		}else{//No, not enough time passed by.
			return false;
		};
	
	};
	
	this.handleLoadError=function(e){
		//Updating went wrong
	}
	
	this.handleVersionError=function(){
		//Version evaluates to false
	}
	
	this.createUpdater=function(){
		//Opera sometimes fires this script too early. Check for document.body to make sure it actually exists.
		if(!document.body){return setTimeout(this.createUpdater,1);}
	
		var updateFrame=document.createElement('iframe');
		updateFrame.style.display='none';
		updateFrame.src=(t.scriptMeta.indexOf('?')>-1)?t.scriptMeta+'&'+new Date().getTime():t.scriptMeta+'?'+new Date().getTime();

		updateFrame.addEventListener('error',t.handleLoadError,false);//Handle error function. Not implemented yet, might be useful to allow -for example- setting multiple meta.js uri's.
		
		window.addEventListener("message", function(event) {
			if(!event){event=window.event;}//Some might try this in IE

			remoteVersion=event.data;


			/*Origin Check*/
			
			//What should be the valid origin domain
			var validOriginDomainRetrieveRegex=/^(https?:)?\/\/(.+?)\//i;
			var validOriginDomain=t.scriptMeta.match(validOriginDomainRetrieveRegex);
			if(validOriginDomain) validOriginDomain=validOriginDomain[2]; else return;
			
			//Get the actual origin domain
			var originDomainRetrieveRegex=/^https?:\/\/(www\.)??(.+)/i;
			var originDomain=event.origin.match(originDomainRetrieveRegex);
			if(originDomain) originDomain=originDomain[2]; else return;
			
			//Compare the valid and the actual domain
			if(validOriginDomain!==originDomain) return;
			
			if(remoteVersion){
				handleCheck(remoteVersion);
			}else{
				handleVersionError();
			}
		}, false);
		
		updateFrame=document.body.appendChild(updateFrame);
		//GM_log('createUpdater()');
		return updateFrame;
		
	};
	
	this.handleCheck=function(remoteVersion){
		//GM_log('handleCheck');
		
		if(remoteVersion!==t.localVersion){
			showMessage('EnableShack: Update available','A new version of EnableShack is available. Version '+ent(remoteVersion)+' is ready to be installed.<br/><br/><br/><table style="border:0 !important;border-collapse:collapse !important;margin:0 !important;padding:0 !important;width:100% !important"><tr style="border:0 !important;border-collapse:collapse !important;margin:0 !important;padding:0 !important;vertical-align:middle !important;text-align:center !important;font-weight:bold !important;font-family:Arial, sans-serif !important;line-height:1em !important;font-size:26px !important;"><td style="width:50% !important;"><a href="'+'https:'+((t.scriptSrc)?t.scriptSrc:t.scriptMeta.replace(/\.meta\.js$/,'.user.js'))+'" target="_blank"><button style="text-decoration:none !important;color:black !important;font-weight:bold !important;">Install</button></a></td><td style="width:50% !important;"><a href="http://userscripts.org/topics/77016#ref=updater" target="_blank"><button style="text-decoration:none !important;color:black !important;font-weight:400 !important;">Release notes</button></a></td></tr></table>');
		}else{
			//No update. Save the current date to localStorage
			localStorage.setItem('updaterLastCheck',new Date().getTime());//Reset updater: javascript:void(localStorage.setItem('updaterLastCheck',0))
		}
		
	};
	
	this.update=function(){
		if(t.runDomain===window.location.href.replace(/https?:\/\//,'').split('/')[0]&&t.checkNeeded()){
			//alert('Nice to meet you');
			t.createUpdater();
		}else{
			//Won't run here
		}
	}
	
	this.frame=function(){
		
		var f=this;
		this.frameURI=t.scriptMeta;
		
		//this.check=function(){		//Discontinued and not in use. See "Update checking frame" instead.
			//Check for @version
		
		//}
		
		return {
			uri:this.frameURI
		
		}
	
	
	}

	
	return {
		checkNeeded:this.checkNeeded,
		update:this.update,
		frame:this.frame()//Execute function already
	};
};


/********************
                        Bug reporting
                                      ********************/

if(window.location.href.indexOf("https://userscripts.org/topics/new?script_id=102369")===0||window.location.href.indexOf("http://userscripts.org/topics/new?script_id=102369")===0){
	if((getURLparam()['post_bug'])){
		if((getURLparam()['title'])) document.getElementById('topic_title').value=unescape(getURLparam()['title']);
		if((getURLparam()['body'])) document.getElementById('topic_body').value=unescape(getURLparam()['body']);
	}
	
	
	
}else


/***************
                  Update checking frame
                                          ****************/

if(updater()&&self.location.href.replace(/^https?:/,'').indexOf(updater().frame.uri)===0){
	
	if(top!=self){//In meta.js iframe
	
		//Handle version check
		try{//Check if version exists in script metadata
			var scriptVersion = /^\/\/\s*@version\s+(.+)\s*$/m.exec(document.documentElement.textContent)[1];
		}catch(ex){//Set scriptversion to false if not
			var scriptversion=false;
		}
		
		//Post version to parent using web workers
		try{//This way the worker is handled in Firefox, Opera
			window.parent.postMessage(scriptVersion, "*");
		}catch(ex){//Chrome requires this hack to work
			insert("var scriptVersion='"+scriptVersion+"';");
			inject(function(){
				window.parent.postMessage(scriptVersion, "*");
			});
		}
	}
	
}else{


/********************
                        Main Script
                                      ********************/

if(updater()){updater().update();}//Updater might return NULL if some HTML5 techniques are not supported. Check using if first.

//showMessage('test title','Test <b>message</b> <i>body</i>');//To show test message

setCookie("nevershow","y",3650);//Hide "Join Now" popup

var thisLBitem=document.getElementsByClassName('listbox')[1];

if(thisLBitem){
	if(thisLBitem.previousSibling.previousSibling==document.getElementById('safari')){
		if(thisLBitem.childNodes[1].nodeName.toLowerCase()==='label'){
			if(thisLBitem.childNodes[1].firstChild.nodeName.toLowerCase()==='a'){
				if(thisLBitem.childNodes[1].firstChild.getAttribute('class').toLowerCase()==='tt'){
					var directLinkListItem=thisLBitem.childNodes[1].firstChild;
					thisLBitem.childNodes[1].firstChild.removeAttribute('class');
					if(thisLBitem.childNodes[1].firstChild.lastChild.nodeName.toLowerCase()==='span'){
						thisLBitem.childNodes[1].firstChild.removeChild(thisLBitem.childNodes[1].firstChild.lastChild);
					}
					if(thisLBitem.childNodes[1].lastChild.style.cursor.toLowerCase()==='default'){
						thisLBitem.childNodes[1].lastChild.removeAttribute('style');
					}

				}
			}
		}
		if(thisLBitem.childNodes[3].nodeName.toLowerCase()==='a'){
			if(thisLBitem.childNodes[3].firstChild.nodeName.toLowerCase()==='input'){
				var blockedInput=thisLBitem.childNodes[3].firstChild;
				blockedInput.removeAttribute('class');
				blockedInput.removeAttribute('readonly');
				blockedInput.removeAttribute('ondoubleclick');
				blockedInput.removeAttribute('onclick');
				blockedInput.removeAttribute('onselectstart');
				blockedInput.removeAttribute('onmousedown');
				blockedInput.removeAttribute('disabled');
				blockedInput.removeAttribute('disabled');
				blockedInput.setAttribute('onfocus','this.select()');
				directLinkListItem.href=blockedInput.value;
				thisLBitem.replaceChild(blockedInput,thisLBitem.childNodes[3]);				
			}	
		}
	}
	
	//Kill new forced register dialog
	window.addEventListener('load',function(){
		inject(function(){
			$("#register-dialog").dialog("close");
		});
	},false);
	
}
//End main script
}