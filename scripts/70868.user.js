// По вопросам и предложениям сюда: shaitan_mashine@mail.ru
//
// ==UserScript==
// @name          Издеваемся над контактом, так как он заеб уже
// @namespace     http://vkontakte.ru/*
// @description   Этот скрипт позволит вам потешить свое самолюбие
// @include       http://vkontakte.ru/*

// ==/UserScript==
	
/// массив замены фигни на чушь
var Arr=[];
Arr[Arr.length] = ['Мои Фотографии'		,'Зеркало души'];
Arr[Arr.length] = ['Моя Страница'		,'Унылое говно'];
Arr[Arr.length] = ['Друзья'				,'Камрады'];
Arr[Arr.length] = ['Мои Видеозаписи'	,'Порнушка'];
Arr[Arr.length] = ['Аудиозапис'			,'Песенк'];
Arr[Arr.length] = ['аудиозапис'			,'песенк'];
Arr[Arr.length] = ['Мои Сообщения'		,'Асько'];

Arr[Arr.length] = ['это Вы'				,'ебануццо, это ж ты'];
Arr[Arr.length] = ['главная'			,'Я!'];
Arr[Arr.length] = ['быстрые сообщения'	,'чат'];
Arr[Arr.length] = ['люди'				,'человеки'];
Arr[Arr.length] = ['Приложения'			,'ГовноПрограммы'];
Arr[Arr.length] = ['приложения'			,'ГовноПрограммы'];

Arr[Arr.length] = ['мужской'			,'мужик'];
Arr[Arr.length] = ['женский'			,'с сиськами'];
Arr[Arr.length] = ['День рождения'		,'Днюха'];
Arr[Arr.length] = ['Родной город'		,'С хутора'];
Arr[Arr.length] = ['Полит. взгляды'		,'Долбанутость'];
Arr[Arr.length] = ['Религ. взгляды'		,'Бог'];
Arr[Arr.length] = ['Семейное положение'	,'Свобода'];
Arr[Arr.length] = ['Павел Дуров'		,'Повелитель всея Руси'];

Arr[Arr.length] = ['Комментарии'		,'Комменты'];
Arr[Arr.length] = ['комментарий'		,'коммент'];
Arr[Arr.length] = ['фотографий'			,'фоток'];
Arr[Arr.length] = ['пользовател'		,'звер'];
Arr[Arr.length] = ['Редактирова'		,'Подпорти'];
Arr[Arr.length] = ['редактирова'		,'подшаманить'];
Arr[Arr.length] = ['Создан'				,'Дебют'];
Arr[Arr.length] = ['Все'				,'Фсе'];
Arr[Arr.length] = ['Группа'				,'Сброд'];
Arr[Arr.length] = ['Групп'				,'Сброд'];
Arr[Arr.length] = ['групп'				,'сброд'];
Arr[Arr.length] = ['открыта'			,'высосана из пальца'];
Arr[Arr.length] = ['писал'				,'калякал'];
Arr[Arr.length] = ['выйти'				,'съебать'];
Arr[Arr.length] = ['Online'				,'Застрял здесь навека'];

Arr[Arr.length] = ['Информация'			,'Ненужное'];
Arr[Arr.length] = ['Стена'				,'Доска позора'];
Arr[Arr.length] = ['обнов'				,'говноеб'];

Arr[Arr.length] = ['обнов'				,'говноеб'];

var inner = document.body.innerHTML;
for (var i=0;i<Arr.length;i++)
{
	inner = inner.replace(new RegExp(Arr[i][0],'g'),Arr[i][1]);
}

document.title = document.title.replace(new RegExp('Друзья','g'),'Камрады')
//document.title+= " Мудак";
document.body.innerHTML = inner;

