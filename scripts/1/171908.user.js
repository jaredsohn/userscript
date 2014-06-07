// ==UserScript==
// @name        webkitNotifications for Firefox 22+
// @namespace   tag:philyoon@gmail.com,2013:gmail
// @description webkitNotifications for gmail notifications to work, for now
// @include     https://mail.google.com/*
// @version     1.0
// @grant       none
// @author      Sangpil Yoon
// ==/UserScript==

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

function MyNotification(iconUrl, title, body){
	Dispatcher.call(this);
	
	this._iconUrl = iconUrl;
	this._title = title;
	this._body = body;
}
MyNotification.prototype = new Dispatcher();
MyNotification.prototype._handleClick = function(e){
	GM_log('click', e);
	
	this.dispatch('close');
}

// display methods
MyNotification.prototype.show = function(){
	var that = this;
	var n = new Notification(this._title, {
	   body: this._body,
	   iconUrl: this._iconUrl
	});
	n.addEventListener('show', function(e) { that.dispatch('display'); });
	n.addEventListener('close', function(e) { that.dispatch('close'); });
	n.addEventListener('click', function(e) { that._handleClick.call(that, e); that.dispatch('click'); });
	n.addEventListener('error', function(e) { that.dispatch('error'); });
}
MyNotification.prototype.cancel = function(){}

// event handler attributes
MyNotification.prototype.ondisplay = null;
MyNotification.prototype.onerror = null;
MyNotification.prototype.onclose = null;
MyNotification.prototype.onclick = null;

unsafeWindow.webkitNotifications = {
    createNotification: function (iconUrl, title, body) {
        return new MyNotification(iconUrl, title, body);
    },
    PERMISSION_ALLOWED: 0,
    PERMISSION_NOT_ALLOWED: 1,
    PERMISSION_DENIED: 2,
    checkPermission: function() {
        var p = Notification.permission;
        if (p == 'granted') {
            return 0;
        } else if (p == 'default') {
            return 1;
        } else {
            return 2;
        }
    },
    requestPermission: function(callback) {
        Notification.requestPermission(function (perm) {
            if (perm == 'granted') {
                callback(0);
            } else {
                callback(2);
            }
        });
    }
};
