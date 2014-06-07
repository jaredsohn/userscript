// ==UserScript==
// @name        1-Click Hotfile
// @namespace      vcnet
// @description    faster hotfile user experience
// @include http://hotfile.com/dl/*
// @include http://www.hotfile.com/dl/*
// ==/UserScript==

//ADAPTED FOR PERSONAL USE BY CWAL
//THANKS TO IONBLADEZ AND ki0

// original script:

// ==UserScript==
// @name        hotfile.com helper for Opera 9/10, GreaseMonkey and Chrome
// @version     2.2
// @date        10.08.2010
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


function addReaptcha()
{
	addScript('Recaptcha.widget = Recaptcha.$("recaptcha_widget_div"); \
		Recaptcha.challenge_callback();');
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
	input.value = "Queue Download";
	form.appendChild(input);

	var challenge = document.createElement("script");
	challenge.type="text/javascript";
	challenge.src="http://www.google.com/recaptcha/api/challenge?k=6LfRJwkAAAAAAGmA3mAiAcAsRsWvfkBijaZWEvkD";
	document.body.appendChild(challenge);

	var recaptcha = document.createElement("script");
	recaptcha.type="text/javascript";
	recaptcha.src="http://www.google.com/recaptcha/api/js/recaptcha.js";
	document.body.appendChild(recaptcha);

	challenge.addEventListener('load', addReaptcha, false);
	recaptcha.addEventListener('load', addReaptcha, false);


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

//original script:

// ==UserScript==
// @name           Uploader link Collect
// @author      ionbladez
// @version	2010-10-01
// @description    Grabs urls from multiple upload/filesharing sites and displays them in a neat box in the corner of your browser.
// @include        http://*
// ==/UserScript==


	var promptMe = false;
	var boxFont = "font-family: Arial; font-size: 11px;";	 // css only, please
	var titleFont = "font-family: Tahoma; font-size: 13px;"; 	// same as above.
	var buttonStyle = 'color: black; background-color: white;';
	var boxStyle = 'padding: 1px; font-family: Arial; font-size: 11px;';
	var titleText = "";
	var doWhat;
	var linkList = '<input type="text" size="160" readonly="readonly" onClick=select() value="';
	var linkList2 = "";
	var boxstyle = 'position: fixed; bottom: 0px; left: 0px; border: none 1px black; background-color: white; color: black; width: 100% !important; opacity: 0.95; z-index: 100;';
	var divBox = document.createElement("div");
	var boxHeight = 175;

var slidF = document.createElement('div');
	slidF.innerHTML = unescape('%09%3Cscript%20type%3D%22text/javascript%22%3E%0A%09var%20cst%20%3D%20320%3B%0A%09var%20to%20%3D%20-20%3B%0A%09function%20slideDown%28%29%20%7B%0A%09if%20%28cst%21%3Dto%29%20var%20timerid%20%3D%20setTimeout%28%22doSlide%28%29%22%2C%20200%29%3B%0A%09%7D%0A%0A%09function%20doSlide%28%29%20%7B%0A%09cst--%3B%0A%09document.getElementById%28%22dllist%22%29.setAttribute%28%22style%22%2C%20%22bottom%3A%20%22%20+%20cst%20+%20%22px%3B%22%29%3B%0A%09slideDown%28%29%3B%0A%09%7D%0A%0A%09function%20tB%28%29%20%7B%0A%09var%20tl%20%3D%20document.getElementById%28%22linkbox%22%29%3B%0A%09var%20dl%20%3D%20document.getElementById%28%22dltext%22%29%3B%0A%09if%20%28tl.style.display%3D%3D%22none%22%29%20%7B%0A%09dl.style.display%20%3D%20%22none%22%3B%0A%09tl.style.display%20%3D%20%22%22%3B%0A%09%7D%20else%20%7B%0A%09tl.style.display%20%3D%20%22none%22%3B%0A%09dl.style.display%3D%22%22%3B%0A%09%7D%0A%09%7D%0A%09%3C/script%3E');


	document.body.appendChild(slidF);

	var howMany = collectLinks();
	if (howMany > 0 || linkList.length > 0) {
	if (promptMe==true) doWhat = prompter();
	if (doWhat == true) {
	showBox();
	}
	if (promptMe==false) {
	// continue to grab links if prompting is disabled.
	showBox();
	}
	} 

	function collectLinks() {
	var foundLinks = 0;
	var sp = "^http://[^/]*(hotfile)\.(com)/get/";
	for (var i2=0; i2 < document.getElementsByTagName("a").length; i2++) {
	var innertext = document.getElementsByTagName("a")[i2].href;
	var innerHTML = document.getElementsByTagName("a")[i2].innerHTML;
	if (innertext.search(sp)>-1) {
	foundLinks++;
	linkList += '' + '' + innertext + '"<p><a style="color: white; align: center;" href="multifetch"><img src="http://img517.imageshack.us/img517/5310/fetch2.gif"></a></p>' + "</td></tr>\r\n\n";

	linkList2 += '' + '' + innertext + ""; 
	window.open(linkList2);
	}
	}
	return foundLinks;
	}

