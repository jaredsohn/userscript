// ==UserScript==
// @name           Gmail Growl for Windows
// @description    Displays Growl for Windows notification for new mail and new chats
// @version        1.0.2
// @date           2009-07-07
// @author	   Justin Anderson
// @namespace      http://userscripts.org/users/86439
// @include        https://mail.google.com/mail*
// @include        http://mail.google.com/mail*
// @include        https://mail.google.com/mail*
// @include        http://mail.google.com/a*
// @include        https://mail.google.com/a*
// ==/UserScript==

if(typeof GM_getValue == 'undefined') {
  function GM_getValue(name, fallback) {
    return fallback;
  }
}

var gfia_instance;
var gfia_chat = GM_getValue('chatEnabled', true);

// Wait for the window to load to try and initialize,
// then check for Gmail's API, which is only loaded several <iframe>s in;
// finally call the method that creates the instance
window.addEventListener('load', function() {
  uWindow = typeof unsafeWindow == 'undefined' && window.gmonkey ? window : unsafeWindow;

  if (uWindow.gmonkey) { // Version 2 Method, using Google's API
    uWindow.gmonkey.load('1.0', function(gmail) {
      gfia(gmail);
    });
  }
}, true);

function gfia(gmail) {
  if(!gfia_instance) {
    window.gmail = gmail;
    setTimeout( function() { gfia_instance = new GmailGrowlAlerts(window.gmail); }, 0);	
  }
}

function GmailGrowlAlerts(gmail) {
  var self = this;
  var chatCount = 0;
  var mailCount = 0;
  var user = null;
	
  this.construct = function() {
    this.chat = this.getChat();
    this.chatting = false;
    this.head = top.document.getElementsByTagName("head")[0];
    this.chatText = [
		      {value:'\u2026', chars: 1},
		      {value:'...', chars: 3}
		    ];
    this.timer;
    this.timer = setInterval(this.poll, 500);
    this.poll();
		
    return true;
  }
	
  this.getChat = function() { return false || GM_getValue('chatEnabled', true); }
  this.getDebugging = function() { return false || GM_getValue('debuggingEnabled', false); }
  this.getSearchElement = function() {
    var element;

    var frame = top.document.getElementById('canvas_frame');
    if(frame) {
      var nav = frame.contentWindow.document.getElementsByClassName('n0');
    }
    if(nav) {
      var potential = nav[0];
			
      if(potential.className.indexOf('n0') !== -1) {
	element = potential;
      }
    }
		
    return element ? element: null;
  }
  this.newChat = function() {
    var title = top.document.title;
    for(var index in self.chatText) {
      var location = title.indexOf(self.chatText[index].value);
      if(self.chatText[index].chars + location == title.length) {
	user = title.replace(/ says.*/gi, "");
	return true;
      }
    }
    return false;
  }
  this.newMail = function() { return self.searchElement.textContent.match(/\((\d*)\)/); }
  this.getUnreadCountDisplay = function() { return GM_getValue('unreadCountDisplay', true); }
  this.getUnreadCount = function() {
    if(this.newMail()) {
      matches = self.searchElement.textContent.match(/\((\d*)\)/);
      return matches ? matches[1] : false;
    }
  }
	
  this.poll = function() {
    if(!self.searchElement)
      return self.searchElement = self.getSearchElement();
			
    if(self.getChat() && self.newChat()) {
      if(chatCount == 0) {
	chatCount = 10;
	return GmailGrowl.chatReceived(user);
      }
				
      if(chatCount > 0)
	chatCount--;
    }
				
    if(self.newMail()) {
      mailCountNew = self.getUnreadCount();
      if(mailCountNew > mailCountOld) {
	GmailGrowl.mailReceived(mailCountNew - mailCountOld);
	mailCountOld = mailCountNew;
      } else if(mailCountNew < mailCountOld) {
	mailCountOld = mailCountNew;
      }
    } else {
      mailCountNew = 0;
      mailCountOld = 0;
    }
  }
	
  return this.construct();
}

var GmailGrowl = function() {
  return {
    appname : "Gmail",

    init : function() {
      GmailGrowl.register();
    },

    register :  function() {
      var ntChatReceived = {};
      ntChatReceived.name = "chatreceived";
      ntChatReceived.displayName = "Chat Recieved";
      ntChatReceived.enabled = true;

      var ntMailReceived = {};
      ntMailReceived.name = "mailreceived";
      ntMailReceived.displayName = "Mail Received";
      ntMailReceived.enabled = true;

      var types = [ ntChatReceived, ntMailReceived ];

      GrowlMonkey.register(GmailGrowl.appname, "http://growlforwindows.com/gfw/images/plugins/gmailgrowl.png", types);
    },
        
    chatReceived : function(message) {
      GrowlMonkey.notify(GmailGrowl.appname, "chatreceived", "Gmail Chat Received", message + " says...\n", "\n");
    },
	
    mailReceived : function(message) {
      GrowlMonkey.notify(GmailGrowl.appname, "mailreceived", "Gmail Mail Received", "You have received " + message + " new mail!\n", "\n");
    }
  }
}();

// -- GrowlMonkey stuff below here - do not edit
GrowlMonkey = function() {
  function fireGrowlEvent(type, data) {
    var element = document.createElement("GrowlEventElement");
    element.setAttribute("data", JSON.stringify(data));
    document.documentElement.appendChild(element);

    var evt = document.createEvent("Events");
    evt.initEvent(type, true, false);
    element.dispatchEvent(evt);
  }
    
  return {
    register : function(appName, icon, notificationTypes) {
      var r = {};
      r.appName = appName;
      r.icon = icon;
      r.notificationTypes = notificationTypes;
      fireGrowlEvent("GrowlRegister", r);
    },
        
    notify : function(appName, notificationType, title, text, icon) {
      var n = {};
      n.appName = appName;
      n.type = notificationType;
      n.title = title;
      n.text = text;
      n.icon = icon;
      fireGrowlEvent("GrowlNotify", n);
    }
  }
}();

/* json2.js 
 * 2008-01-17
 * Public Domain
 * No warranty expressed or implied. Use at your own risk.
 * See http://www.JSON.org/js.html
*/
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case'string':return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+value+'"';case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
if(typeof value.toJSON==='function'){return stringify(value.toJSON());}
a=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||'null');}
return'['+a.join(',')+']';}
if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}else{for(k in value){if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}
return'{'+a.join(',')+'}';}}
return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}
return filter(k,v);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof filter==='function'?walk('',j):j;}
throw new SyntaxError('parseJSON');}};}();}

// initialize the whole works
GmailGrowl.init();
