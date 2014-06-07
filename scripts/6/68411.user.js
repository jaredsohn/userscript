// ==UserScript==
// @name        hotfile.com helper for Opera 9/10, GreaseMonkey and Chrome
// @version     2.3
// @date        22.03.2011
// @author      ki0 <ki0@ua.fm>
// @download    http://userscripts.org/scripts/source/68411.user.js
// @include http://hotfile.com/dl/*
// @include http://www.hotfile.com/dl/*
// ==/UserScript==

// NOTICE! Autostart is recomended! No parallel downloads detecting without autostart!
// Autostart gives you a posibility to open several links, provide capcha,
// and just wait for their downloading in turns! 

var autostart_download = /*@Enable automatic downloading start@bool@*/true/*@*/;
var autostart_timer = /*@Enable automatic timer countdown start@bool@*/true/*@*/;

// WARNING! This variables should not be modified!
var link;
var runonce = 1;
var req = null;
var wait = 0;
var title = null;
var waitStep = 2000;// the bigger value, the smaller possibility of simultaneous request(which is not permited)
var repeatTimeout = 5000;
var anotherDownload = 7200000;


function addScript(text)
{
	var start = document.createElement("script");
	start.type="text/javascript";
	start.innerHTML = text;
	document.body.appendChild(start);
}


function addRecaptcha()
{
	addScript('Recaptcha.create("6LfRJwkAAAAAAGmA3mAiAcAsRsWvfkBijaZWEvkD",\
		"recaptcha_widget_div", { callback: Recaptcha.focus_response_field } ); ');
}

function submitForm(){
	addScript('document.write = function(a){};');

	var main_div = document.createElement("div");
	main_div.id = "main_div";
	main_div.style.position = "absolute";
	main_div.style.overflow = "auto";
	main_div.style.width = "auto";
	main_div.style.height = "auto";
	main_div.style.left = "0%";
	main_div.style.top = "0%";
	main_div.style.backgroundColor = "white";
        document.body.appendChild(main_div);
	
	var form = document.createElement("form");
	form.method = "POST";
	main_div.appendChild(form);

	var input = document.createElement("input");
	input.name = "action";
	input.value = "checkcaptcha";
	input.type = "hidden";
	form.appendChild(input);

	var div = document.createElement("div");
	div.id="recaptcha_widget_div";
	div.style.display = "none";
	form.appendChild(div);

	var input = document.createElement("input");
	input.type = "submit";
	input.value = "Download the file";
	form.appendChild(input);

	var recaptcha = document.createElement("script");
	recaptcha.type="text/javascript";
	recaptcha.src="http://www.google.com/recaptcha/api/js/recaptcha_ajax.js";
        document.body.appendChild(recaptcha);

	recaptcha.addEventListener('load', addRecaptcha, false);

	if (autostart_timer)
	{
		var freebut = document.getElementById('freebut'); // hour limit
		if (freebut)
		{
			addScript('var old = showhtimer; \
				showhtimer = function () \
				{ \
					old(); \
					var freebut = document.getElementById("freebut"); \
					if (freebut.children[0].getAttribute("onclick")) \
						starttimer(); \
				}');
		}
		else
			addScript('starttimer();');
	}
}

function getLink(){
	var arr = document.getElementsByTagName("a");
	for (i = 0; i < arr.length; i++) {
		if (arr[i].href.indexOf("/get/") > -1) 
			break;
	}
	if (!arr[i]) 
		return;
	return arr[i];
}

function stateChanged(){
	if (req.readyState == 4) {
		if (req.status == 200) {
			var res = req.responseText.match(/timerend=d\.getTime\(\)\+[\d]+/g);
			var htm = res[1].match(/\+([\d]+)/);
			return htm[1];
		}
		else 
			document.title = "XMLHttpRequest Error! " + title;
	}
	return anotherDownload;//error - simulate "abother download in progress" for repeat request
}

function GetTimeout(){
	req = new XMLHttpRequest();
	req.open("GET", location.href, false);
	req.send(null);
	return stateChanged();
}

function checkTimer(){
	if (wait > 0) {
		if (wait != anotherDownload) {
			var mins = wait / 60000;
			alert("Wait for " + mins.toFixed(2) + " minutes to start downloading!");
		}
		else 
			alert("Another download in progress! Script is waiting for completion!");
		return false;
	}
	if (autostart_download) {
		setTimeout(start_Timer, (Math.random() * waitStep));//dosn't another download already started?(recheck timer)
	}
	return true;
}

function timer(){
	if (wait > 0) {
		var mins = wait / 60000;
		document.title = "Wait " + mins.toFixed(2) + " mins! " + title;
		wait -= waitStep;
		setTimeout(timer, waitStep);
	}
	else {
		document.title = "Ready! " + title;
		checkTimer();
	}
}

function start_Timer(){
	wait = GetTimeout();
	if (wait == anotherDownload) {
		document.title = "Parallel download! " + title;
		setTimeout(start_Timer, repeatTimeout);
	}
	else {
		if (wait > 0) 
			timer();
		else 
			document.location.href = link.href;
	}
}


function OnLoad()
{
	if (!document.forms.length) //run when DOM is ready
		return;
	if (!runonce) // run only once
		return;
	runonce = 0;
	if (document.forms.namedItem("f")) //main page
		submitForm();
	else {
		if (!document.forms[1])//download: autostart_download!!!
		{
			title = document.title;
			link = getLink();
			link.addEventListener('click', function(e){
				checkTimer();
				e.preventDefault();
			}, true);
			start_Timer();
		}
	}
}

if (document.readyState == "complete")
	OnLoad();
else
	window.addEventListener('load', OnLoad, false);
