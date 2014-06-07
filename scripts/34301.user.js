// ==UserScript==
// @name        beautify alert
// @author      c311ming
// @description To replace the default alert, beautify it. support close all alert window;
// @namespace   http://userscript.org/
// @version     1.1
// @published 2008-09-23
// @modified 2009-04-13
// @include     *
// ==/UserScript==

function dialogBox() {
    dialogBox.count++;
    this.boxIndex = dialogBox.count;
    dialogBox.boxs[this.boxIndex] = this;
    
	this.init();
	
	if (dialogBox.count > 1) {
        this.addButton(dialogBox.closeAllText, dialogBox.closeAll);
    }
}

dialogBox.isLangCN = navigator.language == 'zh-CN';
dialogBox.closeText = dialogBox.isLangCN ? '\u5173\u95ED' : 'Close';
dialogBox.closeAllText = dialogBox.isLangCN ? '\u5173\u95ED\u6240\u6709' : 'Close All';
dialogBox.count = 0;
dialogBox.boxs = {};
dialogBox.closeAll = function() {
    for (var bk in dialogBox.boxs) {
        if (dialogBox.boxs[bk]) {
            dialogBox.boxs[bk].close();
            delete dialogBox.boxs[bk];
        }
    }
    dialogBox.count = 0;
}

dialogBox.options = {
	position: 'absolute',
	zIndex: '999',
	textAlign: 'center',
	border: 'solid 3px #aaaaaa',
	color: '#000000',
	backgroundColor: '#ffffff',
	width: '30%',
	left: '30%',
    cursor: 'move'
};	

dialogBox.prototype = {
	init: function() {
		var dialogArea = document.createElement('div');
		for (var opk in dialogBox.options)
			dialogArea.style[opk] = dialogBox.options[opk];
				
		var txtMsg = document.createElement('h2');
		dialogArea.appendChild(txtMsg);
					
		this.dialog = dialogArea;
		this.msg = txtMsg;
		this.addCloseButton(dialogBox.closeText);
		new SimpleDrag(dialogArea);//drag
	},
	setMessage: function(msg) {
		msg = msg.toString ? msg.toString() : typeof(msg);
		/*if (msg.length > 54)
				msg = msg.slice(0, 54);*/
		this.msg.textContent = msg;
		
		document.body.appendChild(this.dialog);
		this.dialog.style.top = ((window.scrollY || window.pageYOffset || document.body.scrollTop) + (document.body.clientHeight > window.innerHeight ? window.innerHeight : document.body.clientHeight) / 2 - this.dialog.offsetHeight / 2) + 'px';
		this.dialog.lastChild.focus();
	},
	addButton: function(buttonText, fn) {
		var closeMsg = document.createElement('input');
		closeMsg.style.color = 'blue';
		closeMsg.type = 'button';
		closeMsg.value = buttonText;
		var me = this;
		closeMsg.addEventListener('click', fn, false);
		this.dialog.appendChild(closeMsg);
	},
	addCloseButton: function(buttonText) {
        var me = this;
        this.addButton(buttonText, function() {
            me.close();
            return false;
		});
	},
	close: function() {
        this.dialog.parentNode.removeChild(this.dialog);
        delete dialogBox.boxs[this.boxIndex];
        dialogBox.count--;
	}
};

/*drag*/
var document = unsafeWindow.document;

var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
}

var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}

var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
}

var BindAsEventListener = function(object, fun) {
	return function(event) {
		return fun.call(object, event);
	}
}

//Drag
var SimpleDrag = Class.create();
SimpleDrag.prototype = {
  initialize: function(drag) {
	this.Drag = drag;
	this._x = this._y = 0;
	this._fM = BindAsEventListener(this, this.Move);
	this._fS = Bind(this, this.Stop);
	this.Drag.style.position = "absolute";
	this.Drag.addEventListener("mousedown", BindAsEventListener(this, this.Start), false);
  },
  Start: function(oEvent) {
	this._x = oEvent.clientX - this.Drag.offsetLeft;
	this._y = oEvent.clientY - this.Drag.offsetTop;
	document.addEventListener("mousemove", this._fM, false);
	document.addEventListener("mouseup", this._fS, false);
  },
  Move: function(oEvent) {
	this.Drag.style.left = oEvent.clientX - this._x + "px";
	this.Drag.style.top = oEvent.clientY - this._y + "px";
  },
  Stop: function() {
	document.removeEventListener("mousemove", this._fM, false);
	document.removeEventListener("mouseup", this._fS, false);
  }
};
/*drag*/
unsafeWindow.__alert__ = unsafeWindow.alert;
unsafeWindow.alert = function () {
    if (arguments.length == 0) return;	
    unsafeWindow.console && unsafeWindow.console.info.apply(null, arguments);
    var alertBox = new dialogBox();
	alertBox.setMessage(arguments[0]);
};