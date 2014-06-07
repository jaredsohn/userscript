// ==UserScript==
// @name	rusfolder.com downloading helper
// @author	mgorny and Black_Sun
// @namespace	http://mgorny.jogger.pl/
// @require     http://userscripts.org/scripts/source/74144.user.js
// @description	When rusfolder download page is opened, automagically navigates browser through adverts directly to CAPTCHA.
// @include	http://rusfolder.com/*
// @include	http://*.rusfolder.com/*
// @include	http://ints.rusfolder.com/ints/*?ints_code=
// @include	http://ints.rusfolder.com/ints/frame/*
// @include	http://ints.rusfolder.com/ints/*
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {return}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style)
}
function checkTimer() {
	if (inter) clearTimeout(inter);
	if (offer) clearTimeout(offer);
	this.close();
}

function firstMatching(rx) {
	var links = document.getElementsByTagName('a');
	var a, i;

	for (i = 0; a = links[i]; i++) {
		if (a.href.match(rx)) {
			return a;
		}
	}
}
var captchaCounter;

function reloadCAPTCHA(ev) {
	ev.target.src = ev.target.src + '&' + captchaCounter++;
}

var url = document.location.href;

if (url.match(/ints\.rusfolder\.com\/ints\/frame/)) {
	var f, i;
        updt();
	if (window != top)
		top.location.href = document.location.href;
	else if (document.getElementById('theTimer')) {
		var inter = setTimeout(checkTimer, 35000);

	stimer=document.createElement("div");
	stimer.setAttribute("style","color:red; margin: 0pt auto; width: 800px; text-align: center;",false);
	stimer.innerHTML='<h3 id="theTimer"></h3>';
document.body.insertBefore(stimer,document.body.firstChild);
addGlobalStyle('#theDescrp, #Div1 {display: none !important}')
	s1=document.getElementsByTagName("div")[3];
	s1.setAttribute("style","display:none !important;",false);
	s1.innerHTML='<div></div>';
document.body.insertAfter(s1,document.body.firstChild);

	} else if ((f = document.getElementById('Form1')) && (i = f.getElementsByTagName('img')[0])) {
		i.addEventListener('click', reloadCAPTCHA, false);
	}

} else if (url.match(/ints\.rusfolder\.com\/ints\/\?.*rusfolder\.com\/\d+\?ints_code=/)) {
	document.location.href = firstMatching(/sponsor/).href;
} else if (url.match(/rusfolder\.com\/\d+/)) {
	var a;
	if ((a = firstMatching(/stg\d+\.rusfolder\.com\/download\//))) {
		document.location.href = a.href;
	//var offer = setTimeout(checkTimer, 2000);

	} else if ((a = firstMatching(/ints\.rusfolder\.com\/ints\/\?(.+\.)?rusfolder\.com\/\d+\?ints_code=/)))
		document.location.href = a.href;
	else if ((a = document.getElementById('action_url')))
		document.location.href = a.value;
	else if ((a = firstMatching(/s\.agava\.com\/cgi\/g\.cgi\?.*ints\.rusfolder\.com/)))
		document.location.href = a.href;
}
//-----------------------------------------------------------------------------
//	AutoUpdater
//-----------------------------------------------------------------------------
function updt()
{
   try {
      ScriptUpdater.forceCheck(70653);
   }
   catch(e) {
   }
   ;
}
function ntc()
{
  try {
	ScriptUpdater.forceNotice(70653);
       }
  catch(e) { };
}
GM_registerMenuCommand("Check NOW", updt);
GM_registerMenuCommand("Show script updates history", ntc);
//-----------------------------------------------------------------------------
//	End AutoUpdater
//-----------------------------------------------------------------------------