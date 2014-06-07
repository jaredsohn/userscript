// ==UserScript==
// @name        Autosrunka
// @namespace   1chan
// @include     http://1chan.ru/*
// @include     http://1chan.inach.org/*
// @version     1.3
// ==/UserScript==

//Подключение
var $ = unsafeWindow.jQuery;

//Стандартные вводные
var def_title = '­­­­­­­­';
var def_link = 'http://GHHHHHHHH.com';
var srunka = '53357330'; //Актуальная срунька
var rghost = '54311510'; //Любой свежий номер на рыгхосте
var rghost_add = rghost - 900000;

var title;
var link;
var text;
var prrcomment;
var timer;
var quote;


//Блок под кнопки
$(".b-blog-form h1").append("<div id='prr_div'></div>");

//Блок 2
$(".b-comment-form").append("<div id='prr_comment' style='text-align: right;'></div>");

//Срунька
var prrs = document.createElement("input");
prrs.type = "button";
prrs.value = "Срунька";
prrs.setAttribute("style", "margin-right: 5px;");
$('#prr_div').append(prrs);
prrs.onclick = prrs_f;
function prrs_f() {
	title = genT(0, 1, 1, 1, 4);
	link = "";
	text = "\"[:"+srunka+":]\":http://rghost.ru/"+srunka+"/image.png\n";
	nbsp(300);
	posrat();
}

//Насрать в комментах, старт
var prr = document.createElement("input");
prr.type = "button";
prr.value = "Автоколчок";
$('#prr_comment').append(prr);
prr.onclick = prr_f_auto;
function prr_f_auto(opt) {
	if (timer) {window.clearInterval(timer);}
	timer = window.setInterval(function() {prr_f();}, 350);
}
function prr_f() {
	title = genT(0, 1, 1, 1, 4);
	link = '';
	var llink = $(".b-comment_b-info:last .js-paste-link").text();
	if (llink.length > 0) {llink = ">>"+llink+"\n";} else {llink = ""}
		var chance = getRandomInt(0, 9);
		if (chance == 0) {
			text = "[:"+srunka+":]\n";
		} else if (chance == 1) {
			text = "[:"+getRandomInt(rghost_add, rghost)+":]\n";
		} else {
			text = llink;
		}
	
	text = text +genT(1, 1, 5, 1, 10);
	posrat();
	var icon = ['anonymous.png', '2ch.so.png', '0chan.ru.png', 'iichan.ru.png', 'iichan.ru_b.png', 'dobrochan.ru.png', 'samechan.ru.png', '2--ch.ru.png', '4chan.org.png', 'krautchan.net.png', 'hivemind.me.png', 'olanet.ru.png', '1chan.ru.png', 'xmpp.org.png'];

	$("img.b-homeboard-form_icon[src=\"http://1chan.inach.org/ico/homeboards/"+icon[getRandomInt(0, icon.length)]+"\"]").click();
	$(".b-comment-form input[type=\"submit\"]").click();
}

//Насрать в комментах, стоп
var prr_stop = document.createElement("input");
prr_stop.type = "button";
prr_stop.value = "Стоп";
$('#prr_comment').append(prr_stop);
prr_stop.onclick = prr_f_stop;
function prr_f_stop() {
	if (timer) {
       window.clearInterval(timer);
       timer = null;
	} else {
		$("textarea[name=\"text\"]").val('');
		$("img.b-homeboard-form_icon[src=\"http://1chan.inach.org/ico/homeboards/anonymous.png\"]").click();
	}
}

//Один среньк
var srenk = document.createElement("input");
var srenk_add = document.createElement("input");
srenk.type = "button";
srenk_add.type = "button";
srenk.value = "Среньк";
srenk_add.value = "Автоколчок";
srenk.onclick = prr_f;
srenk_add.onclick = prr_f;
$('#prr_div').append(srenk_add);
$('#prr_comment').append(srenk);

//Свой пресет
var own = document.createElement("input");
own.type = "button";
own.value = "Свой шаблон";
own.setAttribute("style", "margin-left: 5px;");
$('#prr_div').append(own);
own.onclick = own_f;
function own_f() {
	title = "Свой заголовок";
	link = "Своя ссылка";
	text = "Свой текст";
	posrat();
}

//Пустые строки
function nbsp(num) {
	for (var i = 1; i < num; i++) {
		text = text + "&nbsp;\n";
	}
}

//Случайное число
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Автоколчок
function genT(mode, pmin, pmax, min, max) { //Режим (0 - Минимум, 1 - Обычный), Количество предложений, Количество слов
	var finalT = "";	
	for (var ii = 1; ii <= getRandomInt(pmin, pmax); ++ii) { //Количество предложений
		var znak = ['.', '?', '...', '))'];
		var retVal = "";
		var length = getRandomInt(min, max);
		
		//var charset = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'];
		//var charset = ['псс', 'прр', 'псссссс', 'прррррр', 'пс', 'пр'];
		var charset = ['я', 'ты', 'он', 'шизик', 'бачок', 'тебе', 'рустер', 'опущ', 'без', 'когда', 'мимо', 'сам', 'нет', 'действительно', 'понятно', 'да', 'почему', 'же', 'конфо', 'там', 'вчера', 'лох', 'дебил', 'пошел', 'моча', 'щека', 'маня', 'срать', 'ух', 'правильно', 'только', 'на', 'возвращайтесь', 'пидорнух', 'стульч', 'чмо', 'ясно', 'жопа', 'хуита', 'го', 'хикка', 'пидор', 'хочу', 'говно', 'чух', 'лол', 'прр', 'псс', 'а', 'с', 'к', 'где', 'что', 'тот', 'ещё', 'ни', 'если', 'сам', 'пока', 'прет', 'хотя', 'ну', 'пидораха', 'ботух', 'домой', 'петух', 'азаз', 'клубасик', 'бля', 'колч', 'и', 'не', 'очко', 'у', 'проклятый', 'хуя', 'пизда', 'дружок', 'охуел', 'кто', 'опять', 'сука', 'кароч', 'охуеть', 'двач', 'пинус', 'сосак', 'заебца', 'даун', 'гнидс', 'новости', 'вава', 'няшка', 'болик', 'пиздец', 'ебать', 'жилби', 'хуй', 'кун', 'тян', 'параша', 'потом', 'хуя', 'знает', 'за', 'виликий', 'это', 'так', 'ньюфаг', 'хуёво', 'лоля', 'проиграл', 'набух', 'нагрелась', 'порвался', 'нахуя', 'мы', 'щас', 'посрал', 'быдло'];
		if (mode != '0') {
			if (getRandomInt(0, 100) <= 20) {retVal += "\n>"+genT(0, 1, 2, 1, 4)+"\n";} //Шанс на случайную цитату
		}
		for (var i = 0; i < length; ++i) {
			if (mode != '0') {
				if (getRandomInt(0, 450) == 0) {retVal += "\n>>"+getRandomInt(1, 80000)+"\n";} //Шанс на случайную ссылку
			}
			if (i > 0) {
				if (getRandomInt(1, 100) <= 65) {retVal += " ";} //Шанс на пробел
				else if (getRandomInt(1, 100) <= 97) {retVal += ", ";} //Шанс на запятую, если не пробел
			}
			retVal += charset[getRandomInt(0, charset.length)];
		}
		
		retVal = ucFirst(retVal);
		znak = znak[getRandomInt(0, znak.length)];
		if (mode == '0') {znak = '';}
		finalT = finalT + retVal + znak + " ";
	}
    return finalT;
}

//Заглавная буква
function ucFirst(str) {
	var newStr = str.charAt(0).toUpperCase();
	for (var i=1; i<str.length; i++) {
		newStr += str.charAt(i).toLowerCase();
	}
  return newStr;
}

//Процесс сранья
function posrat() {
	$("input[name=\"title\"]").val(title);
	$("input[name=\"link\"]").val(link); 
	$("textarea[name=\"text\"]").val(text);
	$("input[name=\"captcha\"]").focus();
}