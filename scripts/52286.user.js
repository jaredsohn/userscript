// ==UserScript==

// @name           UsernameRightClickMenu

// @namespace      http://www.kongregate.com/games/*

// @include        http://www.kongregate.com/games/*

// ==/UserScript==

var _holodeck;

function addGlobalStyle(link) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = link;
    head.appendChild(style);
}

dv = document.createElement('div');
dv.setAttribute('id',"RCmenu");
dv.setAttribute('style', 'position:fixed; display:none;');

addGlobalStyle('http://www.freewebs.com/jonathanasdf/tempstyle.css');

var _menu_items = [], loaded = false, showing = false, _hideTimer;

unsafeWindow.SimpleContextMenu = {

	_show : function (e) {

		showing = true;
 
		e = e ? e : window.event;
		var position = {
			'x' : e.clientX,
			'y' : e.clientY
		}

		var attr = e.target.attributes;

		dv.innerHTML = '<h2>' + attr.getNamedItem("username").value + '</h2>';

		for (var i in _menu_items) {
			if (_menu_items[i].isStatic) {
			
				try {
					dv.innerHTML += _menu_items[i](attr);
				} catch (e) {
					dv.innerHTML += "this item, " + i + " , has an error<br>";
				}
			}
		}

		if (document.getElementById("RCmenuItems")) {
			dv.removeChild(document.getElementById("RCmenuItems"));
		}

		var ml = document.createElement('ul');
		ml.setAttribute('id', "RCmenuItems");

		for (var i in _menu_items) {
			if (_menu_items[i].isStatic) {
				continue;
			}

			var mli = document.createElement('li');
			var link = document.createElement('a');
			link.innerHTML = _menu_items[i][0];
			mli.appendChild(link);
			for (var j=0; j<attr.length; j++) {
				mli.setAttribute(attr[j].name, attr[j].value);
			}
			mli.setAttribute('id', i);
			mli.addEventListener("click", function() { unsafeWindow.SimpleContextMenu.fireCallbacks(mli, i); }, false);
			ml.appendChild(mli);
		}

		dv.appendChild(ml);
 
		dv.style.left = position.x + 'px';
		dv.style.top = position.y +'px';
		dv.style.display = 'block';

		return false;
	},
 
	_hide : function () {
		showing = false;
		dv.style.display = 'none';
	},
		
	addItem: function(id, text, callback) {
		if (!callback) {
			return;
		}
   		if (!_menu_items[id]) {
    			_menu_items[id] = [text];
   		} else if (_menu_items[id].isStatic) {
			return "this id already exists";
		}
   		_menu_items[id].push(callback);
  	},

	addStaticItem: function (id, callback) {
		if (_menu_items[id])
			return "this id already exists";
		_menu_items[id] = callback;
		_menu_items[id].isStatic = true;
	},

	hasItem: function (id) {
		return _menu_items[id]?true:false;
	},
	
	removeItem: function (id) {
		if (this.hasItem(id)) {
			_menu_items[id] = null;
		}
	},
	
	fireCallbacks: function (e, id) {

		var item = _menu_items[id];

		if (!item) return false;

		for (var i = 1; i<item.length; i++) {
			item[i](e.attributes);
		}
		return false;
	}
}

////////////////////////////////////////////////////////////////////////////////////

function init(){	
	if(this.holodeck && this.ChatWindow){
		loaded = true;
		_holodeck = this.holodeck;

		document.body.appendChild(dv);	
		unsafeWindow.Event.observe(window, 'click', function(event) {
			unsafeWindow.SimpleContextMenu._hide();
		});
                unsafeWindow.Event.observe(window, 'contextmenu', function(event) { 
			if (event.target) {
				var username = event.target.getAttribute('username'); 
				if(username) {
                                	event.stop();
					_holodeck.chatWindow()._user_rollover_manager.hide();
					unsafeWindow.SimpleContextMenu._show(event);
				} 
			}
    		});
		unsafeWindow.Event.observe("RCmenu", 'mouseout', function(event) {	
			if (_hideTimer) { clearTimeout(_hideTimer); }
			_hideTimer = setTimeout(function() { unsafeWindow.SimpleContextMenu._hide(); }, 500);
			event.stop();	
		});
		unsafeWindow.Event.observe("RCmenu", 'mouseover', function(event) {	
			if (_hideTimer) { clearTimeout(_hideTimer); }
			event.stop();	
		});
	
		
		this.ChatWindow.prototype.oldShowUserRolloverRCM = this.ChatWindow.prototype.showUserRollover;
		this.ChatWindow.prototype.showUserRollover = function(user) {
			if (showing) return;
			this.oldShowUserRolloverRCM(user);
		}
	}
};

if (!loaded) {
  setTimeout(init, 10);
};
