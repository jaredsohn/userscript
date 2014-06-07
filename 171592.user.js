// ==UserScript==
// @name        change-bkcolor
// @namespace   http://userscripts.org/users/521209
// @description 修改背景颜色为柔和，增加快捷键为｀，拖拽时根据鼠标位置改变背景颜色 ＝＝
// @include     *
// @version     2.3
// ==/UserScript==



var isIE = (document.all) ? true : false;

function Hex(i) {
    if (i < 0) return "00";
    else if (i > 255) return "ff";
    else { var str = "0" + i.toString(16); return str.substring(str.length - 2); }
}


function console_info(info) {
  window.console && window.console.info(info);
}

var $ = function (id) {
	return "string" == typeof id ? document.getElementById(id) : id;
};

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
		return fun.call(object, (event || window.event));
	}
}

function addEventHandler(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
};

function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else { 
        oTarget["on" + sEventType] = null;
    }
};

//拖放程序
var SimpleDrag = Class.create();
SimpleDrag.prototype = {
  //拖放对象,触发对象
  initialize: function(drag,on_mouse_move_callback) {
  	this.OnMouseMove = on_mouse_move_callback;
	this.Drag = $(drag);
	this._x = this._y = 0;
	this._fM = BindAsEventListener(this, this.Move);
	this._fS = Bind(this, this.Stop);
	this.Drag.style.position = "absolute";
	addEventHandler(this.Drag, "mousedown", BindAsEventListener(this, this.Start));
  },
  //准备拖动
  Start: function(oEvent) {
	this._x = oEvent.clientX - this.Drag.offsetLeft;
	this._y = oEvent.clientY - this.Drag.offsetTop;
	addEventHandler(document, "mousemove", this._fM);
	addEventHandler(document, "mouseup", this._fS);
  },
  //拖动
  Move: function(oEvent) {
	this.Drag.style.left = oEvent.clientX - this._x + "px";
	this.Drag.style.top = oEvent.clientY - this._y + "px";
	if (this.OnMouseMove) {
		this.OnMouseMove(oEvent);
	};
  },
  //停止拖动
  Stop: function() {
	removeEventHandler(document, "mousemove", this._fM);
	removeEventHandler(document, "mouseup", this._fS);
  }
};

function change_bkcolor (event) {
    var nx=event.clientX;
    var ny=event.clientY;
    var bk="#".concat(Hex(nx), Hex(ny), 98)
    document.body.style.background=bk;
    $("vavava").innerHTML=bk;
}

function vavava_init() {
  var bt = document.body.appendChild(document.createElement('div'));
    bt.setAttribute('style', 'width: 20px; height: 20px; top: 208px; left: 232; z-index: 60000; position: fixed; color: black; background: #E8D098; border: 1px solid black; text-align: center; vertical-align: middle; font-size: 9pt; cursor: pointer;');
  bt.innerHTML = document.body.style.background;
  bt.id = "vavava";
  var vaObj = new SimpleDrag("vavava", change_bkcolor);
  vaObj.Drag.style.position = "fixed";
}

function vavava_hotkey (event) {
  if (event.keyCode == 192) {
    var vavava = $('vavava');
    if (vavava == null) {
      vavava_init();
    }else{
      if (vavava.style.visibility && vavava.style.visibility == 'visible') {
        vavava.style.visibility = 'hidden';
      } else{
        vavava.style.visibility = 'visible';
      };
    };
  };
}

document.addEventListener("keydown", vavava_hotkey, false);
