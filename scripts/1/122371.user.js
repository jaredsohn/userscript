// ==UserScript==
// @id             letitbit.net-9270d403-1609-4775-9b53-f76860da5d0c@script
// @name           letitbit helper mini
// @version        4.0
// @history        4.0 Попытка сделать скрипт cross-coutry, за идею в России спасибо ReklatsMasters, но теперь нужно указывать в самом верху скрипта, в России вы или нет, по умолчанию стоит Россия true
// @history        3.7 Фикс под новый дизайн
// @history        3.6.1 Include fix
// @history        3.6 Вернул старую версию и добавил иконку.
// @history        3.5 Введены новые опции.
// @history        3.4 Последний фикс, если перестало работать просто обновляйте страницу, если нет, то качайте предыдущие версии скрипта.
// @history        3.3 Не понятно что творится, вроде и нет фикса, а вроде и есть
// @history        3.2 Небольшой фикс.
// @history        3.1 Исправлена ошибка с одной ссылкой
// @history        3.0 Тотальная реконструкция кода.
// @history        2.4 Добавлены несколько ссылок, плюс input'ы к ним
// @history        2.3 Фикс блока ссылок
// @history        2.2 Новый фикс ссылок
// @history        2.1 Добавлена совместимость с Greasemonkey, но увидеть включено ли автоскачивание или нет в нём нельзя. 
// @history        2.0 Добавлена настройка включения/выключения автоскачивания, добавлена через GM_setValue, владельцы Хрома включите иммитацию. По умолчанию выключено. Меню "Команды скрипта".
// @history        1.0 Переделка большого скрипта в мини-версию, в дальнейшем будет дорабатываться эта версия.
// @namespace      http://userscripts.org/scripts/show/122371
// @author         Black_Sun
// @icon           http://lib.wm-panel.com/images/bg_logo_small.gif
// @description    Мини-версия скрипта для летитбит
// @include        http://*letitbit.net/*
// @run-at         document-end
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var Russia=true; //True - вы в России, false - не в России.
var autodownload=true; //true - включить автоскачивание. false - выключить. 

//Для России нижеследующие настроки НЕ действуют.
var autoreload=true; //true - включить автоперезагрузку получения. 
var lim=10;         //Максимальный диапазон.

(function(){function f(a){$("#page-hack-header").html(a)}window.addEventListener("DOMContentLoaded",function(){if(!Russia)$.ajax({type:"GET",url:"/ajax/skymonk/proxy.php",data:{action:"LINK_GET_DIRECT",is_skymonk:1,link:location.href,free_link:1,appid:Math.floor(Math.random()*(lim-0+1))+0,version:"2.0"},success:function(b){autoreload&&(-1!=b.search(/limit|activation/ig)&&location.reload(),-1!=b.search(/error/ig)&&location.reload());for(var b=b.match(/^http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/d\/.{1,}st=.{1,}$/igm), a=0;a<b.length;++a)$("#liks").append('<br><center style="position:relative;"><span class="btnround"><a href="'+b[a]+'">\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0441\u043a\u0430\u0447\u0438\u0432\u0430\u043d\u0438\u0435 \u2116 '+a+'</a></span><br><br><input type="text" value="'+b[a]+'" readonly="1" size="'+Math.floor(b[a].length+25)+'" onfocus="if(this.value){this.select();}" style="position:absolute;left:-50%"></center><br>');autodownload&&(location.href=b[0])}});else if($(".page-header").html('<center><b><h2 id=page-hack-header style="color:white">Loading...</h2></b></center>').css("height", "35px"),$("body").css("background","none"),$("form").is("#ifree_form")){for(var a=$("#ifree_form input[type=hidden]"),e=0,d=0;d<a.length;d++)e="is_skymonk"==a.eq(d).attr("name")?e+("&"+a.eq(d).attr("name")+"=1"):e+("&"+a.eq(d).attr("name")+"="+a.eq(d).attr("value"));var a=(a=e+"&d4_replacement=1")||"",c=new XMLHttpRequest;c.open("POST","/download3.php",!0);c.onreadystatechange=function(){if(4==c.readyState)if(200==c.status){var a=$(".lid-download3",c.responseText).attr("href");$("#page-hack-header").html("<a style='color:red;' href='"+ a+"'>DOWNLOAD</a>");autodownload&&(location.href=a)}else f("Loading error. Sorry :( ")};c.setRequestHeader("Content-Type","application/x-www-form-urlencoded");c.send(a)}else f("Free form not found :(")},!1)})();