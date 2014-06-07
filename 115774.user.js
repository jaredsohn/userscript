// ==UserScript==
// @id             mail.google.com-fb8a7ee0-1f0c-4dfd-90e9-f35b428d174f@scriptish
// @name           Gmail Notification
// @version        1.0
// @namespace      
// @author         pedro_sland
// @description    
// @include        https://mail.google.com/mail/?*
// @run-at         document-start
// ==/UserScript==

/**
* @author Erik Karlsson, www.nonobtrusive.com
*/
function Dispatcher(){
	this.events=[];
}
Dispatcher.prototype.addEventlistener=function(event,callback){
	this.events[event] = this.events[event] || [];
	if ( this.events[event] ) {
		this.events[event].push(callback);
	}
}
Dispatcher.prototype.removeEventlistener=function(event,callback){
	if ( this.events[event] ) {
		var listeners = this.events[event];
		for ( var i = listeners.length-1; i>=0; --i ){
			if ( listeners[i] === callback ) {
				listeners.splice( i, 1 );
				return true;
			}
		}
	}
	return false;
}
Dispatcher.prototype.dispatch=function(event){
	if ( this.events[event] ) {
		var listeners = this.events[event], len = listeners.length;
		while ( len-- ) {
			listeners[len](this);	//callback with self
		}		
	}
	
	if(this['on'+event]){
		this['on'+event](this);
	}
}








function Notification(iconUrl, title, body){
	Dispatcher.call(this);
	
	this._iconUrl = iconUrl;
	this._title = title;
	this._body = body;
}
Notification.prototype = new Dispatcher();
Notification.prototype._handleClick = function(e){
	GM_log('click', e);
	
	this.dispatch('close');
}

// display methods
Notification.prototype.show = function(){
	var that = this;
	window.setTimeout(function(){
		GM_notification(that._body, that._title, that._iconUrl, function(e){
			that._handleClick.call(that, e);
		});
		
		that.dispatch('display');
	}, 1);
}
Notification.prototype.cancel = function(){
	// GM doesn't have any method for this
}

// event handler attributes
Notification.prototype.ondisplay = null;
Notification.prototype.onerror = null;
Notification.prototype.onclose = null;




unsafeWindow.webkitNotifications = {
	// Notification factory methods.
	createNotification: function(iconUrl, title, body){
		return new Notification(iconUrl, title, body);
	},

	// Permission values
	PERMISSION_ALLOWED: 0,
	PERMISSION_NOT_ALLOWED: 1,
	PERMISSION_DENIED: 2,

	// Permission methods
	checkPermission: function(){
		return this.PERMISSION_ALLOWED;
	},
	requestPermission: function(callback){
		callback();
	}
};