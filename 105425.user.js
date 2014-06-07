// ==UserScript==
// @name           Dot.TK secure login
// @namespace      scripts.seabreeze.tk
// @description    Fixes Dot.TK login to https:// connection
// @include        http://my.dot.tk/cgi-bin/login01.taloha
// @include        http://my.dot.tk/cgi-bin/login01.taloha?
// @include        http://my.dot.tk/cgi-bin/login01.taloha?*
// @include        http://my.dot.tk/cgi-bin/login02.taloha
// @include        http://my.dot.tk/cgi-bin/login02.taloha?
// @include        http://my.dot.tk/cgi-bin/login02.taloha?*
// @include        http://my.dot.tk/cgi-bin/login02.taloha#
// @include        http://my.dot.tk/cgi-bin/login02.taloha#*
// @include        https://secure.dot.tk/cgi-bin/login02.taloha
// @include        https://secure.dot.tk/cgi-bin/login02.taloha?
// @include        https://secure.dot.tk/cgi-bin/login02.taloha?*
// @include        https://secure.dot.tk/cgi-bin/login02.taloha#
// @include        https://secure.dot.tk/cgi-bin/login02.taloha#*
// @include        https://userscripts.org/scripts/source/105425.meta.js
// @include        https://userscripts.org/scripts/source/105425.meta.js?
// @include        https://userscripts.org/scripts/source/105425.meta.js?*
// @include        https://userscripts.org/scripts/source/105425.meta.js#
// @include        https://userscripts.org/scripts/source/105425.meta.js#*
// @match          http://my.dot.tk/cgi-bin/login01.taloha
// @match          http://my.dot.tk/cgi-bin/login01.taloha?
// @match          http://my.dot.tk/cgi-bin/login01.taloha?*
// @match          http://my.dot.tk/cgi-bin/login02.taloha
// @match          http://my.dot.tk/cgi-bin/login02.taloha?
// @match          http://my.dot.tk/cgi-bin/login02.taloha?*
// @match          http://my.dot.tk/cgi-bin/login02.taloha#
// @match          http://my.dot.tk/cgi-bin/login02.taloha#*
// @match          https://secure.dot.tk/cgi-bin/login02.taloha
// @match          https://secure.dot.tk/cgi-bin/login02.taloha?
// @match          https://secure.dot.tk/cgi-bin/login02.taloha?*
// @match          https://secure.dot.tk/cgi-bin/login02.taloha#
// @match          https://secure.dot.tk/cgi-bin/login02.taloha#*
// @match          https://userscripts.org/scripts/source/105425.meta.js
// @match          https://userscripts.org/scripts/source/105425.meta.js?
// @match          https://userscripts.org/scripts/source/105425.meta.js?*
// @match          https://userscripts.org/scripts/source/105425.meta.js#
// @match          https://userscripts.org/scripts/source/105425.meta.js#*
// @updateURL      https://userscripts.org/scripts/source/105425.meta.js
// @license        GNU GPL 3 (https://www.gnu.org/licenses/gpl-3.0.html)
// @version        0.0.4 alpha
// ==/UserScript==
/***
		Updater from EnableShack script, available under LGPLv3+ License
																			***/
//Copied from script v0.1.7+XSS fix
function showMessage(title,body){
	var msg=document.createElement('span');
	msg.innerHTML=unescape('%3Cdiv%20style%3D%22position%3Afixed%20%21important%3Btop%3A50%25%20%21important%3Bleft%3A50%25%20%21important%3Bwidth%3A300px%20%21important%3Bheight%3A120px%20%21important%3Bbackground%3Awhite%20%21important%3Bmargin%3A-60px%20auto%20auto%20-150px%20%21important%3B-moz-border-radius%3A4px%20%21important%3Bborder%3A1px%20solid%20skyblue%20%21important%3Bz-index%3A10000%20%21important%3Bfont-size%3A16px%20%21important%3Btext-align%3Aleft%20%21important%22%3E%0A%3Cdiv%20style%3D%22background%3Ablack%20%21important%3Bcolor%3Awhite%20%21important%3Bfont-weight%3Abold%20%21important%3Bpadding%3A3px%205px%203px%205px%20%21important%3Bfont-family%3ACalibri%2C%20sans-serif%20%21important%3B-moz-border-radius-topleft%3A4px%20%21important%3B-moz-border-radius-topright%3A4px%20%21important%3B%22%3E')+title+unescape('%3Cdiv%20style%3D%22color%3Ared%20%21important%3Bfloat%3Aright%20%21important%3Bdisplay%3Ainline%20%21important%3Bpadding%3A0%202px%200%202px%20%21important%3Bline-height%3A1em%20%21important%3Bfont-size%3A1.1em%20%21important%3Bfont-weight%3Abold%20%21important%3Bcursor%3Apointer%20%21important%22%20id%3D%27eShack_dismissMessage%27%3E%26times%3B%3C%2fdiv%3E%3C%2fdiv%3E%0A%3Cdiv%20style%3D%27padding%3A2px%205px%202px%205px%20%21important%3Bfont-family%3ACalibri%2Csans-serif%20%21important%3Btext-align%3Aleft%20%21important%3B%27%3E')+body+unescape('%0A%3C/div%3E%3Cscript%20type%3D%22text/javascript%22%3E%0Adocument.getElementById%28%27eShack_dismissMessage%27%29.addEventListener%28%27click%27%2Cfunction%28e%29%7Bthis.parentNode.parentNode.parentNode.removeChild%28this.parentNode.parentNode%29%7D%2Cfalse%29%3B%0A%0A%3C/script%3E%0A');
	msg=document.body.appendChild(msg);
	document.getElementById('eShack_dismissMessage').addEventListener('click',function(e){this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)},false);
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

function updater(){
	if(!localstorage_supported()||!web_workers_supported()){
		return null;//Allways break if no localstorage is supported / web workers are not implemented
	};
	
	var t=this;
	
	//Updater conf.
	this.scriptMeta='https://userscripts.org/scripts/source/105425.meta.js';
	this.runDomain='secure.dot.tk';
	this.storageHandler='/main_storage_handler';//Not in use
	this.localVersion='0.0.4 alpha';
	
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
		if((typeof document.body).toLowerCase()!=='object'){return setTimeout(this.createUpdater,100);}
	
		var updateFrame=document.createElement('iframe');
		updateFrame.style.display='none';
		updateFrame.src=(t.scriptMeta.indexOf('?')>-1)?t.scriptMeta+'&'+new Date().getTime():t.scriptMeta+'?'+new Date().getTime();

		updateFrame.addEventListener('error',t.handleLoadError,false);//Handle error function. Not implemented yet, might be useful to allow -for example- setting multiple meta.js uri's.
		
		window.addEventListener("message", function(event) {
			if(!event){event=window.event;}//Some might try this in IE

			remoteVersion=event.data;
			
			//Origin Check
			if(!t.scriptMeta.split('/')[0]+'/'+t.scriptMeta.split('/')[1]+'/'+t.scriptMeta.split('/')[2]===event.origin){return;}
			
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
			//Escape remoteVersion to prevent XSS attacks
			var remoteVersion=remoteVersion.replace(/&/g,'&amp;').replace(/</g,'&lt;');
			
			showMessage('Dot.TK Secure Login: Update available','A new version of <i>Dot.TK Secure Login</i> is available. Version '+remoteVersion+' is ready to be installed.<table style="border:0 !important;border-collapse:collapse !important;margin:0 !important;padding:0 !important;width:100% !important;bottom:0 !important;position:absolute !important;margin-bottom:10px !important"><tr style="border:0 !important;border-collapse:collapse !important;margin:0 !important;padding:0 !important;vertical-align:middle !important;text-align:center !important;font-weight:bold !important;font-family:Arial, sans-serif !important;line-height:1em !important;font-size:26px !important;"><td style="width:50% !important;"><a href="'+((t.scriptSrc)?t.scriptSrc:t.scriptMeta.replace(/\.meta\.js$/,'.user.js'))+'" target="_blank"><button style="text-decoration:none !important;color:black !important;font-weight:bold !important;">Install</button></a></td><td style="width:50% !important;"><a href="http://scripts.seabreeze.tk/release_notes/fromAlpha?scriptVer='+escape(t.localVersion)+'&ref=updater" target="_blank" onclick="return confirm(\'Since this is an alpha release, you might only see an error page (which means no release notes are available yet).\\nContinue?\')"><button style="text-decoration:none !important;color:black !important;font-weight:400 !important;">Release notes</button></a></td></tr></table>');
		}else{
			//No update. Save the current date to localStorage
			localStorage.setItem('updaterLastCheck',new Date().getTime());//Reset updater: javascript:void(localStorage.setItem('updaterLastCheck',0))
		}
		
	};
	
	this.update=function(){
		if(t.runDomain===window.location.href.replace('https://','').split('/')[0]&&t.checkNeeded()){//Ugly code, needs a better (regEx) alternative
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


/***************************
                       THE SCRIPT
                            *********************************/


function supports_history_api() {
  return !!(window.history && history.pushState);
}

if(location.href.match(/^http:\/\/my\.dot\.tk\//)){
	location.replace('https://secure.'+/^http:\/\/my\.(.+)$/.exec(location.href)[1].replace('login01.taloha','login02.taloha')+'#ref=unsafe');
}else if(location.href.match(/^https:\/\/secure\.dot\.tk\/.+?#ref=unsafe/)){

	if(document.getElementById('errorMessage')){
		document.getElementById('errorMessage').parentNode.removeChild(document.getElementById('errorMessage'));
	}
	//	location.replace(location.href.replace('#ref=unsafe',''));
		if(supports_history_api()){
			window.history.replaceState(null, null, location.href.split('#')[0]);
		}else{
			location.hash='';
		}
}

if(location.href.match(/^https:\/\/secure\.dot\.tk\//)){
	if(document.getElementById('fldemail')&&!document.getElementById('fldemail').value.length){
		document.getElementById('fldemail').focus();
	}else if(document.getElementById('fldpassword')&&!document.getElementById('fldpassword').value.length){
		document.getElementById('fldemail').focus();
	}
	
	if(document.getElementById('registration')){
		var frm=document.getElementById('registration');
		frm.action=/^http:\/\//.test(frm.action)?frm.action.replace('http://my.dot.tk/','https://secure.dot.tk/'):frm.action;
	}
	
	//Call updater
	updater().update()
}















/***************
                  Update checking frame
                                          ****************/

if(updater()&&self.location.href.indexOf(updater().frame.uri)===0){
	
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
	
}