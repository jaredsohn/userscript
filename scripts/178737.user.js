// ==UserScript==
// @name         MapMaker - Auto confirm edit 0.2
// @namespace    samosfator
// @version      0.2
// @include      http://www.google.com.ua/mapmaker*
// @include      https://www.google.com.ua/mapmaker*
// @include      http://www.google.com/mapmaker*
// @include      https://www.google.com/mapmaker*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @description  Automatically confirm an edit after keypress on "+"
// @copyright  2013, samosfator
// ==/UserScript==

$("#gbqfq").blur();		//Забирає курсор з поля пошуку

$(document).ready(function () {		//Чекає поки сторінка до кінця завантажиться
    $(document).keypress(keypress);		//Ловить всі натискання клавіш

    function keypress(e) {
        //console.log(e.charCode);
        var exit = false;
        document.getElementsByClassName('stat-pending')[0].focus();
        if (e.charCode == 43) {		//Якщо ця клавіша Плюсик(+)
            if ($(".stat-pending").length == 1) {
                if (exit) {		//Потрібно аби шукало кнопку "Переглянути" лише один раз
                    return false;
                }
                exit = true;
                document.getElementsByClassName("gw-plink")[0].click();		//Клацає на кнопку "Переглянути"
            }
            else {
                console.log("stat-pending NOT EXIST");
            }
            if ($(".gw-review-question").length == 1) {		//Якщо на сторінці є поле для схвалення
                $('#mod-radio-2_0').click();		//Клацати по зеленому пальцю
                //console.log("Зелений палець поставлено");
                if ($(".gw-review-question").length == 1) {		//Потрібно аби була якась затримка у виконанні
                    document.getElementById("saveModeration_0").click();		//Надсилає схвалення
                    //console.log("Надіслати клацнуто");
                } else {
                    console.log(".gw-review-question NOT FOUND!");
                }
            } else {
                console.log(".gw-review-question NOT FOUND!");
            }
        } else {
            console.log("Error keypress!");
        }
    }
});