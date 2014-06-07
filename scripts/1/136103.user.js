// ==UserScript==
// @name        FoE Timer
// @namespace   de
// @description Nie wieder die Produktion vergessen!
// @include     http*://*
// @exclude 	http://www.facebook.com/plugins/like.php*
// @version     1.0
// ==/UserScript==

function onPageLoad() {
	var box = createTimerBox();
	var sel = createSelection();
	box.firstChild.appendChild(sel);
	var btn = createButton();	
	btn.addEventListener('click', toggleTimer, false);
	box.firstChild.appendChild(btn);
	document.body.appendChild(box);
	
	checkTime();
}

function checkTime() {
	var timestr = GM_getValue('foe-timer-time', '');
	
	if (timestr) {
		var time = toDate(timestr);
		var diff = timeDiff(time);
		var buttonStatus = GM_getValue('foe-timer-status', '');
		
		
		if (diff >= 0) {
			if (buttonStatus == "started") {
				document.getElementById("foe-timer-button").innerHTML = "Stop";
			}
			displayTime(diff);
		}
			
		if (diff <= 0 && (buttonStatus == "started" || buttonStatus == "expired")) {
			flashRed();
			if (buttonStatus == "started") {
				playSound();
				GM_setValue('foe-timer-status', 'expired');
			}
		} else if (diff <= 0 && buttonStatus == "cancelled") {
			resetTimer();
			setTimeout(function() { GM_setValue('foe-timer-status', 'stopped'); }, 2000);
		}
	}		
	setTimeout(checkTime, 1000);
}

function flashRed(i) {
	document.getElementById('foe-timer-content').style.backgroundColor = '#FF0000';
	document.getElementById('foe-timer-collapse').style.backgroundColor = '#FF0000';
	document.getElementById('foe-timer-collapse').style.borderBottom = '2px solid #FF0000';
	
	setTimeout(function(){
		document.getElementById('foe-timer-content').style.backgroundColor = '#331100';
		document.getElementById('foe-timer-collapse').style.backgroundColor = '#331100';
		document.getElementById('foe-timer-collapse').style.borderBottom = '2px solid #331100';
	}, 500);
}

function displayTime(time) {
	var hours = parseInt(time / 3600) % 24;
	var mins = parseInt(time / 60) % 60;
	var secs = time % 60; 
	if (hours < 10) {
		hours = "0"+hours;
	}
	if (mins < 10) {
		mins = "0"+mins;
	}
	if (secs < 10) {
		secs = "0"+secs;
	}
	document.getElementById('foe-timer-wrapper').innerHTML = hours + ":" + mins + ":" + secs;
}

function timeDiff(time) {
	var now = new Date();
    return parseInt((time.getTime() - now.getTime()) / 1000);
}


function toggleTimer() {
	var d = new Date();
	if (document.getElementById("foe-timer-button").innerHTML == "Start") {
		document.getElementById("foe-timer-button").innerHTML = "Stop";
		var sel = document.getElementById("foe-timer-select");
		var time = sel.options[sel.selectedIndex].value;
		GM_setValue('foe-timer-selection', time);
		document.getElementById('foe-timer-content').style.backgroundColor = '#331100';
		document.getElementById('foe-timer-collapse').style.backgroundColor = '#331100';
		document.getElementById('foe-timer-collapse').style.borderBottom = '2px solid #331100';
		d.adjust(0, 0, 0, 0, 0, time); 
		GM_setValue('foe-timer-time', d.toString());
		GM_setValue('foe-timer-status', 'started');
	} else {
		GM_setValue('foe-timer-status', 'cancelled');
		GM_setValue('foe-timer-time', d.toString());
		resetTimer();
	}
}

function resetTimer() {
	document.getElementById("foe-timer-button").innerHTML = "Start";
	var sel = createSelection();
	var content = document.getElementById('foe-timer-content');
	var oldSel = document.getElementById('foe-timer-wrapper');
	content.replaceChild(sel, oldSel);
}

function toggleCollapse() {
	if (document.getElementById("foe-timer").style.bottom == "0px") {
		GM_setValue('foe-timer-collapsed', 1);
		document.getElementById("foe-timer").style.bottom = "-26px";
		document.getElementById("foe-timer-collapse-img").src = "http://forum.de.forgeofempires.com/images_foe/buttons/collapse_40b.png";
	} else {
		GM_setValue('foe-timer-collapsed', 0);
		document.getElementById("foe-timer").style.bottom = "0px";
		document.getElementById("foe-timer-collapse-img").src = "http://forum.de.forgeofempires.com/images_foe/buttons/collapse_40b_collapsed.png";
	}
}

function playSound() {
	var snd = document.createElement('embed'); 
	snd.setAttribute('src', 'http://www.foe-wiki.de/hint.wav');
	snd.setAttribute('autostart', 'true');
	snd.setAttribute('width', 1);
	snd.setAttribute('height', 1);
	snd.setAttribute('id', 'foe-timer-sound');
	snd.setAttribute('name', 'foe-timer-sound-file');
	snd.setAttribute('enablejavascript', 'true');
	
	document.getElementById('foe-timer-content').appendChild(snd);
}

function createSelection() {
	var wrapper = document.createElement("div");
	wrapper.setAttribute("id", "foe-timer-wrapper");
	wrapper.setAttribute("style", "display: inline; margin-right: 10px; color: #FFCE6C !important; font: bold 11px Tahoma,Calibri,Verdana,Geneva,sans-serif !important;");
	
	var selector = document.createElement("select");
	selector.id = 'foe-timer-select';
	selector.name = 'foe-timer-select';
	
	var style = document.createAttribute("style");
	style.nodeValue = "height: auto; padding: 0; margin: 0;";
	selector.setAttributeNode(style);

	var option = document.createElement('option');
	option.value = '300';
	if (GM_getValue('foe-timer-selection', '') == 300) {
		option.setAttribute('selected', 'selected');
	}
	option.appendChild(document.createTextNode('5 min'));
	selector.appendChild(option);
	
	option = document.createElement('option');
	option.value = '900';
	if (GM_getValue('foe-timer-selection', '') == 900) {
		option.setAttribute('selected', 'selected');
	}
	option.appendChild(document.createTextNode('15 min'));
	selector.appendChild(option);
	
	option = document.createElement('option');
	option.value = '3600';
	if (GM_getValue('foe-timer-selection', '') == 3600) {
		option.setAttribute('selected', 'selected');
	}
	option.appendChild(document.createTextNode('1 h'));
	selector.appendChild(option);

	option = document.createElement('option');
	option.value = '14400';
	if (GM_getValue('foe-timer-selection', '') == 14400) {
		option.setAttribute('selected', 'selected');
	}
	option.appendChild(document.createTextNode('4 h'));
	selector.appendChild(option);
	
	option = document.createElement('option');
	option.value = '28800';
	if (GM_getValue('foe-timer-selection', '') == 28800) {
		option.setAttribute('selected', 'selected');
	}
	option.appendChild(document.createTextNode('8 h'));
	selector.appendChild(option);

	wrapper.appendChild(selector);

	return wrapper;
}

function createButton() {
	var button = document.createElement("button");
	var id = document.createAttribute("id");
	var style = document.createAttribute("style");
	id.nodeValue = 'foe-timer-button';
	style.nodeValue = "font: bold 11px Tahoma,Calibri,Verdana,Geneva,sans-serif; background-color: #334455; background-image: url('http://testforum3.innogames.de/images_foe/gradients/generic_button.png'); background-position: left top; background-repeat: repeat-x; border: 1px solid #000000; border-radius: 4px 4px 4px 4px; color: #ADB4C5; font-weight: bold; text-shadow: 1px 1px 0 #202530; height: auto;";
	addCss("#foe-timer-button:hover { background-color: #556677 !important; color: #DDE4F5 !important; }");
	button.setAttributeNode(id);
	button.setAttributeNode(style);
	button.appendChild(document.createTextNode("Start"));
	return button;
}

function addCss(css) {
	var styleElement = document.createElement("style");
 	styleElement.type = "text/css";
  	if (styleElement.styleSheet) {
    	styleElement.styleSheet.cssText = css;
  	} else {
    	styleElement.appendChild(document.createTextNode(css));
  	}
  	document.getElementsByTagName("head")[0].appendChild(styleElement);
}

function createTimerBox() {
	var collapsed = GM_getValue('foe-timer-collapsed', '');
	var bottom = 0;
	var collapse_img = 'http://forum.de.forgeofempires.com/images_foe/buttons/collapse_40b_collapsed.png';
	if (collapsed == 1) { bottom = -26; collapse_img = 'http://forum.de.forgeofempires.com/images_foe/buttons/collapse_40b.png'; };
	var layer = document.createElement("div");
	layer.setAttribute("id", "foe-timer");
	layer.setAttribute("style", "-moz-border-radius:5px;width:150px;position: fixed;right: 60px;bottom: "+bottom+"px; z-index: 10001; height: 26px; line-height: 12px;");
	var title = document.createElement("div");
	title.setAttribute("style", "color:#b03937;text-align:right;font-size:9px;");
	var content = document.createElement("div");
	content.setAttribute("id", "foe-timer-content");
	content.setAttribute("style", "color:#542c0f;text-align:center;-moz-border-radius:2px;padding:3px 2px 2px 2px;border:2px solid #693718 !important; border-bottom: 0 !important;background: none repeat scroll 0 0 #331100 !important; height: 24px !important;");
	content.appendChild(title);
	layer.appendChild(content);
	var collapse = document.createElement("div");
	collapse.setAttribute("id", "foe-timer-collapse");
	collapse.setAttribute("style", "line-height: 12px; position: absolute; text-align: center; bottom: 23px; padding: 3px 2px 0 1px; left: 10px; width: 15px; height: 15px; border:2px solid #693718 !important; border-bottom: 2px solid #331100 !important;background: none repeat scroll 0 0 #331100;");
	var a = document.createElement("a");
	a.addEventListener('click', toggleCollapse, false);
	var img = document.createElement("img");
	img.setAttribute("id", "foe-timer-collapse-img");
	img.setAttribute("src", collapse_img);
	img.setAttribute("style", "background: none; padding: 0; margin: 0; border: none;");
	a.appendChild(img);
	collapse.appendChild(a); 
	layer.appendChild(collapse);
	return layer;
}

Date.prototype.adjust = function (yr,mn,dy,hr,mi,se) {
	var m,t;
	this.setYear(this.getFullYear() + yr);
	m = this.getMonth() + mn;
	if(m != 0) this.setYear(this.getFullYear() + Math.floor(m/12));
	if(m < 0) {
this.setMonth(12 + (m%12));
} else if(m > 0) {
this.setMonth(m%12);
}
t = this.getTime();
t += (dy * 86400000);
t += (hr * 3600000);
t += (mi * 60000);
t += (se * 1000);
this.setTime(t);
}

function toDate(dateString) {
	var reggie = /(\w+) (\d{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2})/g;
	var dateArray = reggie.exec(dateString); 
	var months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
	
	var dateObject = new Date(
	    (+dateArray[3]),
	    (+months[dateArray[1]]),
	    (+dateArray[2]),
	    (+dateArray[4]),
	    (+dateArray[5]),
	    (+dateArray[6])
	);
	return dateObject;
}

window.addEventListener('load', onPageLoad, true);