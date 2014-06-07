// ==UserScript==
// @name							Facebook - Mousehunt Auto clicker
// @namespace					GlitchPaw
// @include						http://apps.facebook.com/mousehunt/*
// ==/UserScript==
(function() {
	var simulateClick = function(o) {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var canceled = !o.dispatchEvent(evt);
	}

	var SoundTheHorn = function() {
		var anchors = document.getElementsByTagName("a");
		for (i = 0; i < anchors.length; i++) {
			if (anchors[i].id.indexOf("hornLink") != -1) {
				var a = anchors[i];
				simulateClick(a);
				break;
			}
		}
		anchors = null;
	}
	
	var formatTitle = function(timeAmount){
		timeAmount = timeAmount / 1000;
		var minutes = "0" + parseInt(timeAmount / 60);
		var seconds = "0" + parseInt(timeAmount % 60)  ;
		minutes = minutes.match(new RegExp("..$", "g"))
		seconds = seconds.match(new RegExp("..$", "g"))
		return minutes + ":" + seconds;
	}
	
	var intervalChangeTitle = null;
	var changeTitle = function(timeAmount){
		document.title = formatTitle(timeAmount);
		timeAmount = timeAmount - 1000;
		if (timeAmount>0) 
			setTimeout(changeTitle, 1000, timeAmount);
		else
			if(intervalChangeTitle) 
				clearTimeout(intervalChangeTitle);
	}

	var inputs = document.getElementsByTagName("input");
	var timervalue = -1;

	if (inputs) {
		for (i = 0; i < inputs.length; i++) {
			if (inputs[i].id.indexOf("hornWaitValue") != -1) {
				timervalue = inputs[i].value;
				break;
			}
		}
		inputs = null;
	}

	if (timervalue >= 0) {
		var extratimetodelay = Math.floor(Math.random() * 333333);
		var timeoutvalue = (parseInt(timervalue) * 1000) + extratimetodelay;
		intervalChangeTitle = setTimeout(changeTitle, 1000, timeoutvalue);
		setTimeout(SoundTheHorn, timeoutvalue);
	}
})()