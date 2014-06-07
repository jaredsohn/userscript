// ==UserScript==
// @name	iFolder downloading helper fixed (Nitro-N Edition)
// @author	mgorny and Black_Sun
// @namespace	http://mgorny.jogger.pl/
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version	1.07
// @history	1.07 Added new buttons in menu of greasemonkey
// @history	1.06 Fixed: tab closed if you click cancel 
// @history	1.05 Добавил обработку личных файловых хранилищ
// @history	1.04 Исправил переаддресацию
// @history	1.03 Убрал всю рекламу на странице ожидания, оставил только счетчик, так же обновил систему обновлений.
// @history	1.02 Обновлена система проверки обновлений.
// @history	1.01 Добавлен автоапдейтер и кнопка в меню greasemonkey
// @history	1.00 Оффициальный релиз, содержащий блокировку рекламы, увеличение списка отсчета и авто-переход к нему в случае если нельзя скачать без просмотра рекламы.
// @description	When iFolder download page is opened, automagically navigates browser through adverts directly to CAPTCHA.
// @include	http://ifolder.ru/*
// @include	http://*.ifolder.ru/*
// @include	http://ints.ifolder.ru/ints/*?ints_code=
// @include	http://ints.ifolder.ru/ints/frame/*
// @include	http://ints.ifolder.ru/ints/*
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

if (url.match(/ints\.ifolder\.ru\/ints\/frame/)) {
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

} else if (url.match(/ints\.ifolder\.ru\/ints\/\?.*ifolder\.ru\/\d+\?ints_code=/)) {
	document.location.href = firstMatching(/sponsor/).href;
} else if (url.match(/ifolder\.ru\/\d+/)) {
	var a;
	if ((a = firstMatching(/stg\d+\.ifolder\.ru\/download\//))) {
		document.location.href = a.href;
	//var offer = setTimeout(checkTimer, 2000);

	} else if ((a = firstMatching(/ints\.ifolder\.ru\/ints\/\?(.+\.)?ifolder\.ru\/\d+\?ints_code=/)))
		document.location.href = a.href;
	else if ((a = document.getElementById('action_url')))
		document.location.href = a.value;
	else if ((a = firstMatching(/s\.agava\.ru\/cgi\/g\.cgi\?.*ints\.ifolder\.ru/)))
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