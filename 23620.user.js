// ==UserScript==
// @name         smooth_checkbox
// @namespace    http://d.hatena.ne.jp/cheesepie
// @description  this is a script make checkbox smooth-checking
// @include      *
// ==/UserScript==

var UI = {};
UI.SMOOTH = {};
UI.SMOOTH.mouseEvent = {
	isMousedown: false,
	isChecked: false,
	clicked: undefined,
	mousedown: function(e) {
		var e = e || window.event;
		var target = e.target;
		this.clicked = target;
		if(target.type == "checkbox") {
			target.click();
			this.isMousedown = true;
			this.isChecked = target.checked;
		}
	},
	mouseup: function(e) {
		var e = e || window.event;
		var target = e.target;
		if(target == this.clicked && target.type == "checkbox") {
			target.click();
		}
    this.isMousedown = false;
	},
  mouseover: function(e) {
    e = e || window.event;
    var target = e.target;
    if(this.isMousedown && target.type == "checkbox") {
      if((this.isChecked && !target.checked) || (!this.isChecked && target.checked)) {
        target.click();
      }
    }
  }
};
UI.SMOOTH.init = function() {
    var smooth = UI.SMOOTH.mouseEvent;
    document.addEventListener("mousedown", smooth.mousedown, false);
    document.addEventListener("mouseup", smooth.mouseup, false);
    document.addEventListener("mouseover", smooth.mouseover, false);
};
UI.SMOOTH.init();
