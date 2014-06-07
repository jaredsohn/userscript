// ==UserScript==
// @name Coubidu - watch coub videos without login and muting in background
// @description There are two things I hate in coub.com - popup with login form and muting when window loses focus, this script corrects both
// @author Mk_V
// @license MIT
// @version 1.0
// @include http://coub.com/view/*
// @icon http://hypnotoad.tk/coubidu/coubidu.png
// ==/UserScript==
(function (window, undefined) {
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    if (w.self != w.top) {
        return;
    }
    function escapeFromSandbox(func, exec) {
        var script = document.createElement("script");
        script.textContent = "-" + func + (exec ? "()" : "");
        document.body.appendChild(script);
    }
	// plugin main function executed out of sandbox
	function coubPluginMain() {
		window.addEventListener("load", function(){
			var authPopupContainer = document.getElementById("authPopupContainer");
			if (authPopupContainer) {
				authPopupContainer.style.display="none";
			}
			FlashCommander.prototype.origExecCommand=FlashCommander.prototype.execCommand;
			FlashCommander.prototype.execCommand=function(b){
				if (b=="windowBlur")
					return;
				return this.origExecCommand(b);
			}
		});
	}
	// one more test
	if (/coub.com/.test(w.location.href)) {
		escapeFromSandbox(coubPluginMain, true);
	}
})();
