// ==UserScript==
// @name Non-Modal Alert
// @version 1.0
// @namespace http://www.asmor.com
// @author Ian Toltz
// @description Makes alerts non-modal
// @run-at document-start
// @include *
// ==/UserScript==

//Use window for "normal" use, unsafeWindow as a userscript
//var win = window;
var win = unsafeWindow;


win.alert = (function(oldAlert, undefined){
	_alert = function(_text, passThrough) {
		if (passThrough===true)
			oldAlert(_text);
		else {
			if (!alertDiv)
				createAlertDiv();
			alertDiv.alert(_text);
		}
	}
	
	_alert.dispose = function() {
		if (!alertDiv)
			return;
		document.body.removeChild(alertDiv);
		alertDiv = undefined;
	}

	var alertDiv;
	var createAlertDiv=function(){
		if (alertDiv)
			alert.dispose();
		
		alertDiv=document.createElement("div");
		alertDiv.style.position="absolute";
		alertDiv.style.left="5px";
		alertDiv.style.top="5px";
		alertDiv.style.width = "20%";
		alertDiv.style.border = "3px groove maroon";
		alertDiv.style.padding = "5px";
		alertDiv.style.color = "black";
		alertDiv.style.backgroundColor = "white";
		alertDiv.style.zIndex = "5000";
		alertDiv.style.MozBorderRadius = "10px"
		
		var closeDiv = document.createElement("div");
		closeDiv.innerHTML = "<div style='float:left'><strong>Alerts (newest on top)</strong></div> <div style='float:right'><a href='javascript:alert.dispose()'>X</a></div><div style='clear:both'></div><hr>";
		alertDiv.appendChild(closeDiv);
		
		var contentDiv = document.createElement("div");
		alertDiv.appendChild(contentDiv);
		
		alertDiv.alert = function(_text) {
			var old = contentDiv.innerHTML;
			contentDiv.innerHTML = _text + "<hr>" + contentDiv.innerHTML;
		}
		
		document.body.appendChild(alertDiv);
	}
	
	return _alert;
}(win.alert));