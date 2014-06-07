// ==UserScript==
// @name           statadm option selector
// @namespace      http://userscripts.org/
// @description    selects specific option in select menu on internal site
// @include        https://statadm.alkar.net/Clients/search.php3
// ==/UserScript==

/*
	<option value="statname__statname">Учетное имя
	<option value="ppp__login">PPP-логин
	<option value="POP3__login">POP3-логин
	<option value="client__num">Номер договора
	<option value="client__origin_dog">Старый номер договора
	<option value="client__name">Организация
	<option value="subacct__id">Порядковый номер лицевого счета
	<option value="client__tel">Телефон по договору
	<option value="client__fio">ФИО (в договоре)
	<option value="client__pasport">Номер паспорта
	<option value="client__rschet">Рассчетный счет
	<option value="client__okpo">ОКПО
	<option value="subacct__fio_cl">ФИО (в лицевом счете)
	<option value="domain__domain">Домен
	<option value="dns_zone__zona">DNS зона
	<option value="mforward__src_domain">Форвардинг с емейла/домена
	<option value="mforward__dst_domain">Форвардинг на емейл
	<option value="ll__name">Выделенная линия
	<option value="ll__port">Выделенная линия (поле "порт")
	<option value="ll__comment">Выделенная линия (поле "комментарий")
	<option value="mile__transit">Выделенная линия (транзит)
	<option value="mile__addr">Точка подключения (клиент)
	<option value="hosting__login">Хостинг (логин)
	<option value="site__vhost">Сайт (домен)
	<option value="DB__db">БД (имя)
	<option value="DB_user__login">БД (логин)
	<option value="net__net">IP адрес
	<option value="service__pid">Сервис, по родительскому id
*/

/* make custom option selection */
var options = document.getElementsByTagName('option'); 
for (i = 0; i < options.length; i++) {
    if (options[i].getAttribute('value') === 'domain__domain') {
        options[i].setAttribute('selected', '');
        break;
    }
}

/* focus custom field */
var options = document.getElementsByTagName("input");
for (i = 0; i < options.length; i++) {
    if (options[i].getAttribute('name') === 'search__choice\[0\]\[val\]') {
        options[i].setAttribute('autofocus', '');
        options[i].focus();
        options[i].select();
        break;
    }
}
