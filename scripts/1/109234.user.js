// ==UserScript==
// @name           ClickerPP
// @namespace      paypal.com
// @version        0.0.1.2
// @description    Clicker for paypal.com
// @author         dark-al
// @include        http://paypal.com/*
// @include        https://paypal.com/*
// @include        http://www.paypal.com/*
// @include        https://www.paypal.com/*
// ==/UserScript==

// настройки скрипта
var login = "login"			// Логин
var password = "password"		// Пароль
var card_type = "V"			// Тип карты: V - Visa; M - MasterCard; D - Discover; A - American Express
var number_card = "0000000000000000"	// Номер карты
var month = "1"				// Месяц (1-12)
var year = "2011"			// Год (2011-2030)
var code_sec = "000"			// Код безопасности (CSC, CVV)
var timeout = "8000"			// Пауза (мс) 

// если на главной странице
if(document.getElementsByName('login_form').length){
	signin(); // логинимся
}

/* from last version
// если на странице счета
if(document.getElementsByName('history').length){
	location.href="https://www.paypal.com/ru/cgi-bin/webscr?cmd=_status&amp;req_from=get_verified";
}
*/

// если на странице счета
if(document.getElementsByName('history').length){
	// переходим на страницу добавления карты
	location.href="https://www.paypal.com/ru/cgi-bin/webscr?cmd=_profile-credit-card-new-clickthru&flag_from_account_summary=1&nav=0.3.2";
}

// если на странице со списком карточек
if(document.getElementsByName('add.x').length && !document.getElementsByName('first_name').length){
	// нажимаем кнопку "Добавить карту"	
	clicker();
}

// если на странице привязки
if(document.getElementsByName('first_name').length){
	formfilling(); // заполняем форму
	setTimeout(clicker, timeout); // отправляем форму
}

// если привязалась
if(document.getElementsByName('add.x').length && document.getElementsByName('first_name').length && document.getElementsByName('cc_id').length){
	alert("Поздравляю! Ваша карта успешно привязалась.");	
	// нажимаем кнопку "Продолжить"
	clicker();
}

// возобновляем сессию
if( !document.getElementsByName('add.x').length && !document.getElementsByName('login_form').length && !document.getElementsByName('history').length && !document.getElementsByName('first_name').length){
	location.href="https://www.paypal.com/ru/";
}

// функция входа в аккаунт
function signin(){
	// заполняем поля
	document.getElementById('login_email').value = login;
	document.getElementById('login_password').value = password;
	// входим
	var sumbit = document.getElementsByName('submit.x');
	sumbit[0].click();
}

// функция вставки данных в форму
function formfilling(){
	document.getElementsByName('credit_card_type')[0].value = card_type;
	document.getElementsByName('cc_number')[0].value = number_card;
	document.getElementsByName('expdate_month')[0].value = month;
	document.getElementsByName('expdate_year')[0].value = year;
	document.getElementsByName('cvv2_number')[0].value = code_sec;
}

// кликер
function clicker(){
	add = document.getElementsByName("add.x");
	add[0].click();
}