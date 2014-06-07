// ==UserScript==
// @id             www.lostfilm.tv-70ed950b-9601-431d-9196-6c644f644b3f@script
// @name           lostfilm_second_HD_column
// @version        1.2
// @history        1.2 Фикс расположения правой колонки
// @history        1.1 фикс адреса
// @history        1.0 Release
// @namespace      script
// @author         Black_Sun
// @description    Скрипт обрамляет поле с информацией о Вас с выбранным в настройках цветом, так же добавляет рядом вторую колонку с HD контентом и по выбору меняет(визуально) аватар на ваш собственный.
// @include        http://www.lostfilm.tv/*
// @include        http://lostfilm.tv/*
// @run-at         document-end
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//			БЛОК НАСТРОЕК, ИЗМЕНЯТЬ ТОЛЬКО ЕГО
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ocolor='lightgray'; 
/*Цвет обрамляющего поля. [Можно любые цвета, коды цветов, или rgba систему] всё в кавычках*/

var avatar={

	on:false, 
/*Настройки аватара, если true - включить отображение собственного аватара, false - выключить. [Параметры true или false] запятую не трогать*/
        
	src:'Прямая_ссылка_на_ваш_аватар', 
/*Прямая ссылка на Вам собственный аватар, действует если on:true [указывать в кавычках]*/
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//			ДАЛЬШЕ НИЧЕГО НЕ ТРОГАТЬ
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded",function(){var a=document.getElementsByClassName("prof")[0];stylesheet=document.createElement("style");stylesheet.setAttribute("type","text/css");stylesheet.innerHTML=".prof{position:relative;}.prof2{position: absolute;top: 0;left: 0;width: 100%;height: 100%;background:"+ocolor+";border: 0px solid black;opacity: 0.75;}.user_menu_link{color:black;}";document.getElementsByTagName("head")[0].appendChild(stylesheet);test=document.createElement("div");test.setAttribute("class", "prof");test.innerHTML='<div class="prof2"></div>';if(avatar.on){document.getElementsByClassName('user_avatar')[0].innerHTML="<img src='"+avatar.src+"'/>";}a.parentNode.insertBefore(test,a);test.appendChild(a);document.getElementsByTagName("body")[0].getElementsByTagName("div")[0].setAttribute("style","width:1248px;margin:0 auto;padding:0;");var a=document.getElementById("new_sd_list").offsetTop-37,c=document.getElementsByClassName("right")[0].getElementsByClassName("block")[0].innerHTML,d=document.getElementById("new_hd_list").innerHTML,b=document.createElement("div");b.setAttribute("style","width:240px;position:absolute;top:"+ a+"px;left:"+Math.ceil(document.getElementById("new_sd_list").offsetLeft+document.getElementById("new_sd_list").offsetWidth+10)+"px");b.setAttribute("id","HD");b.innerHTML="<div class='block'>"+c+"</div><div class='bb'>"+d+"</div>";document.getElementsByClassName("right")[0].parentNode.insertBefore(b,document.getElementsByClassName("right")[0].nextSibling);document.getElementsByClassName("right")[0].getElementsByClassName("block")[0].getElementsByTagName("div")[0].innerHTML="<div style='font-weight:bold'>SD</div>";document.getElementById("HD").getElementsByClassName("block")[0].getElementsByTagName("div")[0].innerHTML= "<div style='font-weight:bold'>HD</div>"},false);