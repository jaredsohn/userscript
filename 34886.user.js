// ==UserScript==
// @name		  ATN.DNFTT
// @namespace	  ant.kharkov.ua
// @description	  Не годуйте тролів - не відповідайте на провокації
// @include		  http://forum.atn.kharkov.ua/viewtopic.php*
// @version		  1.0.2
// @license		  Public domain
// ==/UserScript==

var trolls = getTrolls();
var anonymousGoHome = isAnonymousGoHome();

// Проводимо санитарну обробку сторінки
testLists();
// Додаємо до меню GM пункт редагування списку тролів.
GM_registerMenuCommand("Редагування списку тролів форуму", editTrollList);
// Додаємо до меню GM пункт зміни режиму читання анонімусів.
GM_registerMenuCommand("Перемикач анонімусів", switchAnonymous);

/*
 * Далі йдуть функції, що визиваються під час фільтрації контенту
 */

/*
 * Знаходимо списки повідомлень
 */
function testLists() {
	thread = document.evaluate('id("pagecontent")', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (thread) {
		messages = document.evaluate('child::table[@class="tablebg"]', thread, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < messages.snapshotLength; i++)
			doCatchTrolls(messages.snapshotItem(i));
	}
}

/*
 * Головна функція, що керуе відловом повідомлень тролів
 */
function doCatchTrolls(cell) {
	// Перевірка ніка автора
	nick = document.evaluate('child::tbody/tr/td/b[@class="postauthor"]', cell, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (nick) {
		userdetails = document.evaluate('child::tbody/tr/td[@class="profile"]/span', cell, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		anonymousUser = isAnonymous(userdetails);
		// Перевірив чи не троль це.
		// У випадку, якщо ви ввімкнули фільтрацію анонімусів,
		// також перевіряю - чи це не анонімус часом.
		if (isTroll(nick, anonymousUser) || (anonymousGoHome && anonymousUser))
			markFlame(cell, nick);
		else
			// Якщо це не троль, реєструємо функцію, що дозволяє вам додати його
			// до списку. При бажанні звісно.
			nick.addEventListener("click", addTroll, false);
	}
}

/*
 * Ця функція відновлює список тролів
 */
function getTrolls() {
	trollList = GM_getValue("trollList");
	if (!trollList) {
		GM_setValue("trollList", "Поки що тут нічого немає, додайте нік. Розділяйте ніки знаком \";\".");
		trollList = GM_getValue("trollList");
	}
	return trollList.split(';');
}

/*
 * Перевірка - показувати анонімусів чи ні.
 */
function isAnonymousGoHome() {
	property = GM_getValue("anonymousGoHome");
	if (!property) {
		GM_setValue("anonymousGoHome", false);
		property = GM_getValue("anonymousGoHome");
	}
	return property;
}

/*
 * Ця функція звіряє нік з іменами відомих тролів. Якщо ім'я включає в себе
 * символ ";", такий нік автоматично вважається тролем. Оскільки
 * цей символ розділяє ніки у списку тролів.
 */
function isTroll(nick, anonymousUser) {
	nickname = nick.textContent;

	if (nickname.indexOf(";") >= 0)
		return true; // Спроба обійти скрипт!!
	for (var i = 0; i < trolls.length; i++)
		if (nickname.toLowerCase() == trolls[i].toLowerCase())
			return true;
	if (!anonymousUser)
		return false;

	if (nickname.length < 3 || bzdyschDetected(nickname))
		return true;

	return false;
}

/*
 * Детальная інформація про не зареєстрованих відвідувачів починається зі
 * слова "Гость".
 */
function isAnonymous(userdetails) {
	if (userdetails.textContent.indexOf("Зарегистрирован:") == -1)
		return true;

	return false;
}

/*
 * Зкриваю повідомленя.
 */
function markFlame(cell, nick) {
	nickname = nick.textContent;
	altText = document.createTextNode(nick.textContent + ' шось нацарапав');
	altTD = document.createElement("TD");
	altTR = document.createElement("TR");
	altTD.appendChild(altText);
	altTR.appendChild(altTD);
	cell.parentNode.replaceChild(altTR, cell);
}

/*
 * Ця функція надає вам можливість додати троля до скиску
 * простим кліком миші на його ніку біля повідомлення.
 */
function addTroll(event) {
	nickname = event.target.textContent;
	if (!confirm(nickname + " троль?"))
		return;
	trollList = "";
	for (var i = 0; i <= trolls.length - 1; i++) {
		if (nick == trolls[i])
			return;
		else
			trollList += trolls[i] + ";";
	}
	trolls.push(nickname);
	trollList += nickname;
	GM_setValue("trollList", trollList);
	testLists();
}

/*
 * Ця функція надає можливості редагувати
 * список тролів
 */
function editTrollList() {
	editMessage = "Редагування списку тролів.\nНікі тролів повинні розділятись знаком \";\" (крапка з комою).";
	confirmMessage = "Ви бажаєте зберегти редагування?\n\n";
	trollList = "";
	for (var i = 0; i <= trolls.length - 2; i++) {
		trollList += trolls[i] + ";";
	}
	trollList += trolls[trolls.length - 1];
	trollList = prompt(editMessage, trollList);
	if (trollList && confirm(confirmMessage + trollList)) {
		GM_setValue("trollList", trollList);
		troll = getTrolls();
		window.location.href = window.location.href;
	}
}

/*
 * Гроза усіх анонімусів
 */
function switchAnonymous() {
	property = GM_getValue("anonymousGoHome")
	if (property) {
		message = "Зараз ви не бачите дописів анонімних авторів.\n\nБажаєте вимкнути цей режим?";
	} else {
		message = "Зараз ви маєте змогу читати дописи анонімних авторів.\n\nБажаєте ввімкнути режим \"без анонімусів\"?";
	}
	if (confirm(message)) {
		GM_setValue("anonymousGoHome", !property);
		window.location.href = window.location.href;
	}
}

/*
 * bzdysch detected
 */
function bzdyschDetected(nickname) {
	trollsign = new Array(':', '~', '`', '#', '+', '=', '/', '\\', '$', '%', '^', '*', '&', '{', '}', '[', ']', '|', '<', '>', '?', '!');
	numberPattern = /^[0-9]+$/;
	repeatPattern = /(.)\1{2,}/;
	repeatSignPattern = /(,|\.|-|"|'|@|_|№){2,}/;
	tooManySignPattern = /(,.+|\..+|-.+|".+|'.+|@.+|_.+|№.+|[0-9].+|\s){3,}/;


	if (numberPattern.test(nickname))
		return true;
	if (repeatPattern.test(nickname) || repeatSignPattern.test(nickname))
		return true;
	if (tooManySignPattern.test(nickname))
		return true;
	for (var i = 0; i < trollsign.length; i++)
		if (nickname.indexOf(trollsign[i]) >= 0)
			return true;
}
