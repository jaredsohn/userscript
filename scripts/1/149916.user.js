// ==UserScript==
// @name			html5 desktop notification
// @namespace		com.jhdxr.userscript
// @id				com.jhdxr.userscript.html5_desktop_notification
// @description		implement the desktop notification in firefox.
// @include			http://*
// @include			https://*
// @include			file:///*
// @require			http://lib.sinaapp.com/js/jquery/1.8/jquery.min.js
// @run-at			document-idle
// @copyright		jhdxr
// @version			0.1.121010
// @updateURL		https://userscripts.org/scripts/source/149916.meta.js
// ==/UserScript==

(function(){
	var PERMISSION_ALLOWED = 0; //indicates that the user has granted permission to scripts with this origin to show notifications.
	var PERMISSION_NOT_ALLOWED = 1; //indicates that the user has not taken an action regarding notifications for scripts from this origin.
	var PERMISSION_DENIED = 2; //indicates that the user has explicitly blocked scripts with this origin from showing notifications.

	if(unsafeWindow.webkitNotifications != undefined){
		GM_log('webkitNotifications is already supported!');
		return;
	}
	if(!GM_notification){
		alert('you need the latest scriptish to run this script!');
		return;
	}

	var util = new function(){
		var _option = JSON.parse(GM_getValue('option', '{}'));
		var _this = this;
		
		var _option_save = function(){
			setTimeout(function(){
				GM_setValue('option', JSON.stringify(_option));
			}, 0);
		}
		this.option = function(){}
		this.option.get = function(name, default_value){
			if(_option.hasOwnProperty(name)){
				return _option[name];
			}else{
				return default_value;
			}
		}
		this.option.set = function(name, value){
			if(value === undefined){
				return _this.option.remove(name);
			}
			_option[name] = value;
			_option_save();
			return true;
		}
		this.option.remove = function(name){
			delete _option[name];
			_option_save();
			return true;
		}
		this.option.clear = function(){
			_option = {};
			_option_save();
			return true;
		}
	}

	var permission = new function(){
		this.get = function(domain){
			return util.option.get('domain_' + domain, PERMISSION_NOT_ALLOWED);
		}
		this.set = function(domain, value){
			GM_log('permission for '+ domain + ' is set to ' + value);
			if(value !== PERMISSION_NOT_ALLOWED){
				util.option.set('domain_' + domain, value);
			}else{
				util.option.remove('domain_' + domain);
			}
		}
		this.requrest = function(domain){
			$('body').append(
				'<div id="com_jhdxr_html5_desktop_notification_permission_request" style="position: fixed; top: 0; width: 100%; background: #FC0;">' + 
					'The website undefined is asking for permission to show desktop notifications. Do you want to allow the website? ' + 
					'<button>yes</button>' + 
					'<button>no</button>' + 
					'<button>ask me later</button>' + 
				'</div>'
			);
		}
	}




	var notification = function(icon, title, content){
		var content = content || '';
		var title = title || '';
		var icon = icon || null;
		var _this = this;
		this.ondisplay = function(){};
		this.onerror = function(e){
			GM_log('error msg:' + e.description);
		};
		this.onclose = function(){}; //todo
		this.onclick = function(){};
		
		//this.replaceId = GM_generateUUID();
		this.show = function(){
			GM_log('a message has been shown');
			try{
				setTimeout(function(){
					GM_notification(content, title, icon, function(){_this.onclick();} );
				}, 0)
				_this.ondisplay();
			}catch(e){
				_this.onerror(e);
			}
		}
	}



	unsafeWindow.webkitNotifications = new function(){
		var _domain = window.location.host;
		var _permission = permission.get(_domain);
		
		this.checkPermission = function(){
			return _permission;
		}
		this.requestPermission = function() {
			GM_log(_domain + ':permission requested');
			if(_permission === PERMISSION_NOT_ALLOWED){
				if(confirm('The website ' + _domain + ' is asking for permission to show desktop notifications. Do you want to allow the website ?')){
					permission.set(_domain, PERMISSION_ALLOWED);
					_permission = PERMISSION_ALLOWED;
				}else{
				//	permission.set(_domain, PERMISSION_DENIED);
					_permission = PERMISSION_DENIED;
				}
			}
			return _permission;
		}
		this.createNotification = function(icon, title, content){
			if(_permission === PERMISSION_NOT_ALLOWED){
				if(this.requestPermission() !== PERMISSION_ALLOWED){
					return false;
				}
			}else if(_permission === PERMISSION_DENIED){
				GM_log(_domain + ':permission denied');
				return false;
			}
			var n = new notification(icon, title, content);
			return n;
		}
		this.createHTMLNotification = function(html){
			throw new Exception('unsupported method');
		}
	}
})();
